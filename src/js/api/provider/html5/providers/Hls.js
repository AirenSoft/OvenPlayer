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
    PLAYER_NOT_ACCEPTABLE_ERROR,
    CONTENT_LEVEL_CHANGED,
    AUDIO_TRACK_CHANGED,
    SUBTITLE_TRACK_CHANGED,
    CONTENT_CAPTION_CHANGED,
    CONTENT_CAPTION_CUE_CHANGED,
    CONTENT_TIME,
    CONTENT_SEEKED
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
    let subtitleCuesMap = {};   // { [trackId: number]: VTTCue[] }
    let activeSubtitleTrackId = -1;
    let _lastActiveCue = null;
    let _subtitleDebugTimer = 0;
    const SUBTITLE_CUES_MAX = 200; // sliding window limit per track (live stream guard)

    try {

        let hlsConfig = {
            debug: false,
            renderTextTracksNatively: false // Disable native TextTrack rendering so subtitles are drawn via DOM
        };

        let hlsConfigFromPlayerConfig = playerConfig.getConfig().hlsConfig;

        if (hlsConfigFromPlayerConfig) {

            for (let key in hlsConfigFromPlayerConfig) {
                hlsConfig[key] = hlsConfigFromPlayerConfig[key];
            }
        }

        if (hlsConfig.drmSystems) {

            // Custom license headers must never be shared between key systems.
            // hls.js only reads a single top-level licenseXhrSetup, so we collect
            // each key system's headers and route them by keyContext.keySystem.
            const drmSystems = {};
            const licenseHeadersByKeySystem = {};

            for (let keySystem in hlsConfig.drmSystems) {

                const drmSystemConfig = Object.assign({}, hlsConfig.drmSystems[keySystem]);

                if (drmSystemConfig.licenseHeaders) {

                    // licenseHeaders is not a valid hls.js drmSystems field; strip it out.
                    licenseHeadersByKeySystem[keySystem] = drmSystemConfig.licenseHeaders;
                    delete drmSystemConfig.licenseHeaders;
                }

                drmSystems[keySystem] = drmSystemConfig;
            }

            hlsConfig.drmSystems = drmSystems;

            if (Object.keys(licenseHeadersByKeySystem).length > 0) {

                hlsConfig.licenseXhrSetup = function (xhr, url, keyContext, licenseChallenge) {
                    const licenseHeaders = licenseHeadersByKeySystem[keyContext.keySystem];
                    if (licenseHeaders) {
                        xhr.setRequestHeader(licenseHeaders.key, licenseHeaders.value);
                    }
                };
            }
        }

        hls = new Hls(hlsConfig);

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
            adTagUrl: adTagUrl,
            subtitleTracks: [],
            currentSubtitleTrack: -1
        };

        that = Provider(spec, playerConfig, function (source, lastPlayPosition) {

            OvenPlayerConsole.log("HLS : onExtendedLoad : ", source, "lastPlayPosition : " + lastPlayPosition);

            that.trigger(HLS_PREPARED, hls);

            hls.loadSource(source.file);

            hls.once(Hls.Events.MANIFEST_LOADED, function (event, data) {

                isManifestLoaded = true;

                for (let i = 0; i < hls.levels.length; i++) {

                    let qualityLevel = hls.levels[i];

                    let label = qualityLevel.width + "x" + qualityLevel.height + ", " + sizeHumanizer(qualityLevel.bitrate, true, "bps");
                    let level = {
                        bitrate: qualityLevel.bitrate,
                        height: qualityLevel.height,
                        width: qualityLevel.width,
                        index: i,
                        label: label
                    };

                    if (qualityLevel.codecSet) {
                        level.codecs = qualityLevel.codecSet;
                        level.label = label + " (" + qualityLevel.codecSet + ")";
                    }

                    spec.qualityLevels.push(level);
                }

                spec.currentQuality = hls.firstLevel;

                if (hls.audioTracks && hls.audioTracks.length > 0) {
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
                }

                if (hls.subtitleTracks && hls.subtitleTracks.length > 0) {
                    for (let i = 0; i < hls.subtitleTracks.length; i++) {
                        let subtitle = hls.subtitleTracks[i];
                        spec.subtitleTracks.push({
                            index: subtitle.id,
                            label: !!subtitle.name ? subtitle.name :
                                !!subtitle.lang ? subtitle.lang : subtitle.id
                        });
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

            hls.on(Hls.Events.SUBTITLE_TRACK_SWITCH, function (event, data) {
                activeSubtitleTrackId = data.id;
                spec.currentSubtitleTrack = data.id;
                _lastActiveCue = null; // reset so the new track's cue fires immediately
                // Discard cues from tracks no longer in use to free memory
                var keepId = data.id;
                Object.keys(subtitleCuesMap).forEach(function (key) {
                    if (Number(key) !== keepId) {
                        delete subtitleCuesMap[key];
                    }
                });
                that.trigger(SUBTITLE_TRACK_CHANGED, {
                    currentSubtitleTrack: spec.currentSubtitleTrack
                });
                // Enable or clear the DOM caption viewer based on track selection
                that.trigger(CONTENT_CAPTION_CHANGED, data.id >= 0 ? 0 : -1);
            });

            hls.on(Hls.Events.CUES_PARSED, function (event, data) {
                // Use the numeric index from hls.subtitleTrack as the key,
                // because data.track can be a string like "default" while
                // hls.subtitleTrack is always the numeric index (e.g. 0).
                var trackId = hls ? hls.subtitleTrack : data.track;
                if (!subtitleCuesMap[trackId]) {
                    subtitleCuesMap[trackId] = [];
                }
                data.cues.forEach(function (cue) {
                    var exists = subtitleCuesMap[trackId].some(function (c) {
                        return c.startTime === cue.startTime && c.text === cue.text;
                    });
                    if (!exists) {
                        subtitleCuesMap[trackId].push(cue);
                    }
                });
                // Sliding window: drop oldest cues beyond limit to prevent
                // unbounded growth during long live streams.
                if (subtitleCuesMap[trackId].length > SUBTITLE_CUES_MAX) {
                    subtitleCuesMap[trackId].splice(0,
                        subtitleCuesMap[trackId].length - SUBTITLE_CUES_MAX);
                }
            });

            // Reset on seek so that:
            // (a) the same cue re-fires after seeking back into its range, and
            // (b) deleteTimer is recalculated from the new position.
            that.on(CONTENT_SEEKED, function () {
                _lastActiveCue = null;
            });

            that.on(CONTENT_TIME, function (data) {
                // Read the active track directly from hls.js (more reliable than event-based tracking)
                var currentTrackId = hls ? hls.subtitleTrack : -1;
                
                if (currentTrackId < 0) {
                    return;
                }

                var cues = subtitleCuesMap[currentTrackId] || [];
                
                if (!cues.length) { return; }
                // Use raw video element time to match against hls.js cue timestamps.
                // data.position may be offset by sectionStart, causing a mismatch.
                var position = element.currentTime;

                // Collect ALL cues active at this position (handles simultaneous & overlapping cues)
                var activeCueObjects = [];
                var maxEndTime = 0;
                for (var i = 0; i < cues.length; i++) {
                    if (position >= cues[i].startTime && position < cues[i].endTime) {
                        activeCueObjects.push({
                            text: cues[i].text,
                            line: cues[i].line,
                            snapToLines: cues[i].snapToLines,
                            position: cues[i].position,
                            size: cues[i].size,
                            align: cues[i].align,
                            vertical: cues[i].vertical
                        });
                        if (cues[i].endTime > maxEndTime) {
                            maxEndTime = cues[i].endTime;
                        }
                    }
                }

                if (activeCueObjects.length === 0) {
                    _lastActiveCue = null;
                    return;
                }

                var combinedText = activeCueObjects.map(function(c) { return c.text; }).join('\n');
                if (_lastActiveCue !== combinedText) {
                    _lastActiveCue = combinedText;
                    that.trigger(CONTENT_CAPTION_CUE_CHANGED, {
                        text: combinedText,
                        cues: activeCueObjects,
                        startTime: position,
                        endTime: maxEndTime
                    });
                }
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
            }
        };

        that.setCurrentAudioTrack = (audioTrackIndex) => {
            hls.audioTrack = audioTrackIndex;
            spec.currentAudioTrack = audioTrackIndex;

            return spec.currentAudioTrack;
        };

        that.setCurrentSubtitleTrack = (subtitleTrackIndex) => {
            hls.subtitleTrack = subtitleTrackIndex;
            spec.currentSubtitleTrack = subtitleTrackIndex;

            return spec.currentSubtitleTrack;
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

            subtitleCuesMap = {};
            activeSubtitleTrackId = -1;
            _lastActiveCue = null;

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