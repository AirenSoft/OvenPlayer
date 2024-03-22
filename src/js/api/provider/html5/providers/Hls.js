/**
 * Created by hoho on 2018. 6. 7..
 */
import Provider from "api/provider/html5/Provider";
import { errorTrigger } from "api/provider/utils";
import {
    PROVIDER_HLS,
    PLAYER_STATE, STATE_IDLE, STATE_LOADING,
    ERRORS,
    INIT_HLSJS_FAIL,
    HLS_PREPARED,
    HLS_DESTROYED,
    PLAYER_UNKNWON_NETWORK_ERROR,
    PLAYER_BAD_REQUEST_ERROR,
    PLAYER_AUTH_FAILED_ERROR,
    PLAYER_NOT_ACCEPTABLE_ERROR, STATE_PLAYING, CONTENT_LEVEL_CHANGED, AUDIO_TRACK_CHANGED
} from "api/constants";

import sizeHumanizer from "utils/sizeHumanizer";

/**
 * @brief   hlsjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */


const HlsProvider = function (element, playerConfig, adTagUrl) {
    let that = {};
    let hls = null;
    let superStop_func = null;
    let superDestroy_func = null;
    let loadRetryer = null;
    let isManifestLoaded = false;
    let firstLoaded = false;

    try {

        let hlsConfig = {
            debug: false
        };

        let hlsConfigFromPlayerConfig = playerConfig.getConfig().hlsConfig;

        if (hlsConfigFromPlayerConfig) {

            for (let key in hlsConfigFromPlayerConfig) {
                hlsConfig[key] = hlsConfigFromPlayerConfig[key];
            }
        }

        if (playerConfig.getConfig().licenseCustomHeader) {

            const licenseXhrSetup = function (xhr, url, keyContext, licenseChallenge) {
                xhr.setRequestHeader(playerConfig.getConfig().licenseCustomHeader.key, playerConfig.getConfig().licenseCustomHeader.value);
            };

            hlsConfig.licenseXhrSetup = licenseXhrSetup;
        }

        hls = new Hls(hlsConfig);

        window.op_hls = hls;

        hls.attachMedia(element);

        let spec = {
            name: PROVIDER_HLS,
            element: element,
            mse: hls,
            listener: null,
            isLoaded: false,
            canSeek: false,
            isLive: false,
            seeking: false,
            state: STATE_IDLE,
            buffer: 0,
            dvrWindow: 0,
            framerate: 0,
            currentQuality: -1,
            qualityLevels: [],
            currentAudioTrack: -1,
            audioTracks: [],
            currentSource: -1,
            sources: [],
            adTagUrl: adTagUrl
        };

        that = Provider(spec, playerConfig, function (source, lastPlayPosition) {

            OvenPlayerConsole.log("HLS : onExtendedLoad : ", source, "lastPlayPosition : " + lastPlayPosition);

            that.trigger(HLS_PREPARED, hls);

            hls.loadSource(source.file);

            hls.once(Hls.Events.MANIFEST_LOADED, function (event, data) {

                isManifestLoaded = true;

                for (let i = 0; i < hls.levels.length; i++) {

                    let qualityLevel = hls.levels[i];

                    spec.qualityLevels.push({
                        bitrate: qualityLevel.bitrate,
                        height: qualityLevel.height,
                        width: qualityLevel.width,
                        index: i,
                        label: qualityLevel.width + "x" + qualityLevel.height + ", " + sizeHumanizer(qualityLevel.bitrate, true, "bps")
                    });
                }

                spec.currentQuality = hls.firstLevel;

                for (let i = 0; i < hls.audioTracks.length; i++) {

                    let audioTrack = hls.audioTracks[i];

                    spec.audioTracks.push({
                        index: audioTrack.id,
                        label: audioTrack.name
                    });

                    if (audioTrack.default === true) {
                        spec.currentAudioTrack = audioTrack.id;
                    }
                }
            });

            hls.once(Hls.Events.LEVEL_LOADED, function (event, data) {

                firstLoaded = true;

                if (loadRetryer) {
                    clearTimeout(loadRetryer);
                    loadRetryer = null;
                }

                if (data.details.live) {
                    spec.isLive = true;
                } else {

                    if (lastPlayPosition && lastPlayPosition >= 0) {
                        that.seek(lastPlayPosition);
                    }
                }
            });

            hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {

                spec.currentQuality = data.level;

                that.trigger(CONTENT_LEVEL_CHANGED, {
                    isAuto: hls.autoLevelEnabled,
                    currentQuality: spec.currentQuality,
                    type: "render"
                });
            });

            hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, function (event, data) {

                spec.currentAudioTrack = data.id;
                that.trigger(AUDIO_TRACK_CHANGED, {
                    currentAudioTrack: spec.currentAudioTrack
                });
            });

            hls.on(Hls.Events.LEVEL_UPDATED, function (event, data) {
                if (data && data.details) {
                    spec.dvrWindow = data.details.totalduration;
                }

            });

            hls.on(Hls.Events.ERROR, function (event, data) {

                if (data && data.networkDetails && data.networkDetails.status === 202) {

                    if (loadRetryer) {
                        clearTimeout(loadRetryer);
                        loadRetryer = null;
                    }

                    that.setState(STATE_LOADING);

                    loadRetryer = setTimeout(function () {

                        if (hls) {

                            that.stop();
                            hls.stopLoad();
                            hls.loadSource(source.file);
                        }

                    }, 1000);

                    return;
                }

                if (!data.fatal) {
                    // do nothing when non fatal error. hlsjs will recover it automatically.
                    return;
                }

                let errorType = PLAYER_UNKNWON_NETWORK_ERROR;

                if (data && data.networkDetails && data.networkDetails.status === 400) {
                    errorType = PLAYER_BAD_REQUEST_ERROR;
                } else if (data && data.networkDetails && data.networkDetails.status === 403) {
                    errorType = PLAYER_AUTH_FAILED_ERROR;
                } else if (data && data.networkDetails && data.networkDetails.status === 406) {
                    errorType = PLAYER_NOT_ACCEPTABLE_ERROR;
                }

                let tempError = ERRORS.codes[errorType];
                tempError.error = data;
                errorTrigger(tempError, that);
            });

            that.on(PLAYER_STATE, function (data) {

                if (!firstLoaded && data.prevstate === STATE_LOADING && data.newstate === STATE_IDLE) {

                    if (loadRetryer) {
                        clearTimeout(loadRetryer);
                        loadRetryer = null;
                    }

                    if (hls) {

                        hls.stopLoad();
                    }
                }
            });
        });

        that.setCurrentQuality = (qualityIndex) => {

            hls.currentLevel = qualityIndex;
            spec.currentQuality = qualityIndex;

            return spec.currentQuality;
        };

        that.isAutoQuality = () => {
            return hls.autoLevelEnabled;
        };

        that.setAutoQuality = (isAuto) => {
            if (isAuto) {
                hls.currentLevel = -1;
            } else {
                hls.currentLevel = hls.currentLevel;
            }
        };

        that.setCurrentAudioTrack = (audioTrackIndex) => {
            hls.audioTrack = audioTrackIndex;
            spec.currentAudioTrack = audioTrackIndex;

            return spec.currentAudioTrack;
        };

        that.getDuration = () => {
            return element.duration;
        }

        superStop_func = that.super('stop');
        that.stop = () => {

            if (loadRetryer) {

                clearTimeout(loadRetryer);
                loadRetryer = null;
            }

            if (hls) {
                hls.stopLoad();
            }

            superStop_func();
        };

        superDestroy_func = that.super('destroy');
        that.destroy = () => {

            if (loadRetryer) {

                clearTimeout(loadRetryer);
                loadRetryer = null;
            }

            if (hls) {

                hls.destroy();
                that.trigger(HLS_DESTROYED);
            }

            hls = null;
            OvenPlayerConsole.log("HLS : PROVIDER DESTROYED.");
            superDestroy_func();
        };

        OvenPlayerConsole.log("HLS PROVIDER LOADED.");
    } catch (error) {
        let tempError = ERRORS.codes[INIT_HLSJS_FAIL];
        tempError.error = error;
        throw tempError;
    }

    return that;
};


export default HlsProvider;