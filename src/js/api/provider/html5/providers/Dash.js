/**
 * Created by hoho on 2018. 6. 14..
 */
import Provider from "api/provider/html5/Provider";
import {errorTrigger} from "api/provider/utils";
import sizeHumanizer from "utils/sizeHumanizer";
import {
    STATE_IDLE,
    STATE_PLAYING,
    STATE_AD_PLAYING,
    STATE_AD_PAUSED,
    INIT_DASH_UNSUPPORT,
    INIT_DASH_NOTFOUND,
    ERRORS,
    PLAYER_UNKNWON_NETWORK_ERROR,
    CONTENT_LEVEL_CHANGED,
    PROVIDER_DASH,
    DASH_PREPARED,
    DASH_DESTROYED
} from "api/constants";
import _ from "utils/underscore";
import {STATE_LOADING} from "../../../constants";

/**
 * @brief   dashjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */
const DASHERROR = {
    DOWNLOAD: "download",
    MANIFESTERROR: "manifestError"
};
const Dash = function (element, playerConfig, adTagUrl) {

    let that = {};
    let dash = null;
    let superPlay_func = null;
    let superDestroy_func = null;
    let seekPosition_sec = 0;
    let prevLLLiveDuration = null;
    let loadRetryer = null;
    let sourceOfFile = "";

    try {

        if (dashjs.Version < "3.0.0") {
            throw ERRORS.codes[INIT_DASH_UNSUPPORT];
        }

        const coveredSetAutoSwitchQualityFor = function (isAuto) {

            dash.updateSettings({
                streaming: {
                    abr: {
                        autoSwitchBitrate: {
                            video: isAuto
                        }
                    }
                }
            });
        };

        const coveredGetAutoSwitchQualityFor = function () {

            return dash.getSettings().streaming.abr.autoSwitchBitrate.video;
        };

        const liveDelayReducingCallback = function () {

            if (dash.duration() !== prevLLLiveDuration) {
                prevLLLiveDuration = dash.duration();

                let dvrInfo = dash.getDashMetrics().getCurrentDVRInfo();
                let liveDelay = playerConfig.getConfig().lowLatencyMpdLiveDelay;

                if (!liveDelay) {
                    liveDelay = 3;
                }

                dash.seek(dvrInfo.range.end - dvrInfo.range.start - liveDelay)
            }

        };

        dash = dashjs.MediaPlayer().create();
        dash.initialize(element, null, false);

        window.op_dash = dash;

        let spec = {
            name: PROVIDER_DASH,
            element: element,
            mse: dash,
            listener: null,
            isLoaded: false,
            canSeek: false,
            isLive: false,
            seeking: false,
            state: STATE_IDLE,
            buffer: 0,
            framerate: 0,
            currentQuality: -1,
            currentSource: -1,
            qualityLevels: [],
            sources: [],
            adTagUrl: adTagUrl
        };

        that = Provider(spec, playerConfig, function (source, lastPlayPosition) {

            OvenPlayerConsole.log("DASH : Attach File : ", source, "lastPlayPosition : " + lastPlayPosition);

            coveredSetAutoSwitchQualityFor(true);
            sourceOfFile = source.file;

            // dash.off(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, liveDelayReducingCallback);

            if (source.lowLatency === true) {

                prevLLLiveDuration = null;

                dash.updateSettings({
                    streaming: {
                        lowLatencyEnabled: source.lowLatency
                    }
                });

                if (playerConfig.getConfig().lowLatencyMpdLiveDelay && typeof(playerConfig.getConfig().lowLatencyMpdLiveDelay) === 'number') {

                    dash.updateSettings({
                        streaming: {
                            liveDelay: playerConfig.getConfig().lowLatencyMpdLiveDelay
                        }
                    });
                }

                // dash.on(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, liveDelayReducingCallback);

            } else {

                dash.updateSettings({
                    streaming: {
                        lowLatencyEnabled: false,
                        liveDelay: undefined
                    }
                });

            }

            dash.updateSettings({
                debug: {
                    logLevel: dashjs.Debug.LOG_LEVEL_NONE
                }
            });

            let dashConfigFromPlayerConfig = playerConfig.getConfig().dashConfig;

            if (dashConfigFromPlayerConfig) {
                dash.updateSettings(dashConfigFromPlayerConfig);
            }

            that.trigger(DASH_PREPARED, dash);

            dash.attachSource(sourceOfFile);

            seekPosition_sec = lastPlayPosition;
        });

        superPlay_func = that.super('play');
        superDestroy_func = that.super('destroy');
        OvenPlayerConsole.log("DASH PROVIDER LOADED.");

        dash.on(dashjs.MediaPlayer.events.ERROR, function (error) {

            let tempError = ERRORS.codes[PLAYER_UNKNWON_NETWORK_ERROR];
            tempError.error = error;
            errorTrigger(tempError, that);
        });

        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, function (event) {
            if (event && event.mediaType && event.mediaType === "video") {
                that.trigger(CONTENT_LEVEL_CHANGED, {
                    isAuto: coveredGetAutoSwitchQualityFor(),
                    currentQuality: spec.currentQuality,
                    type: "request"
                });
            }
        });
        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function (event) {
            if (event && event.mediaType && event.mediaType === "video") {
                spec.currentQuality = event.newQuality;
                that.trigger(CONTENT_LEVEL_CHANGED, {
                    isAuto: coveredGetAutoSwitchQualityFor(),
                    currentQuality: event.newQuality,
                    type: "render"
                });
            }
        });

        dash.on(dashjs.MediaPlayer.events.PLAYBACK_METADATA_LOADED, function (event) {

            OvenPlayerConsole.log("DASH : PLAYBACK_METADATA_LOADED  : ", dash.getQualityFor("video"), dash.getBitrateInfoListFor('video'), dash.getBitrateInfoListFor('video')[dash.getQualityFor("video")]);

            let subQualityList = dash.getBitrateInfoListFor('video');
            spec.currentQuality = dash.getQualityFor("video");
            for (let i = 0; i < subQualityList.length; i++) {
                if (!_.findWhere(spec.qualityLevels, {bitrate: subQualityList[i].bitrate, height: subQualityList[i].height, width: subQualityList[i].width})) {
                    spec.qualityLevels.push({
                        bitrate: subQualityList[i].bitrate,
                        height: subQualityList[i].height,
                        width: subQualityList[i].width,
                        index: subQualityList[i].qualityIndex,
                        label: subQualityList[i].width + "x" + subQualityList[i].height + ", " + sizeHumanizer(subQualityList[i].bitrate, true, "bps")
                    });
                }
            }

            if (dash.isDynamic()) {
                spec.isLive = true;
            }

            if (seekPosition_sec && !spec.isLive) {
                dash.seek(seekPosition_sec);
            }

        });

        that.play = (mutedPlay) => {

            if (that.getState() === STATE_AD_PLAYING || that.getState() === STATE_AD_PAUSED) {

            } else {

                superPlay_func(mutedPlay);
            }

        };

        that.setCurrentQuality = (qualityIndex) => {
            if (that.getState() !== STATE_PLAYING) {
                that.play();
            }
            spec.currentQuality = qualityIndex;
            if (coveredGetAutoSwitchQualityFor()) {
                coveredSetAutoSwitchQualityFor(false);
            }
            dash.setQualityFor("video", qualityIndex);
            return spec.currentQuality;
        };
        that.isAutoQuality = () => {
            return coveredGetAutoSwitchQualityFor();
        };
        that.setAutoQuality = (isAuto) => {
            coveredSetAutoSwitchQualityFor(isAuto);
        };
        that.destroy = () => {

            if (dash.destroy) {

                dash.destroy();
            } else {

                dash.reset();
            }

            dash = null;
            that.trigger(DASH_DESTROYED);
            OvenPlayerConsole.log("DASH : PROVIDER DESTROYED.");
            superDestroy_func();
        };
    } catch (error) {

        if (error && error.code && error.code === INIT_DASH_UNSUPPORT) {
            throw error;
        } else {
            let tempError = ERRORS.codes[INIT_DASH_NOTFOUND];
            tempError.error = error;
            throw tempError;
        }
    }

    return that;
};


export default Dash;
