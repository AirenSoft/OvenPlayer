/**
 * Created by hoho on 2018. 7. 20..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import PlayButton from "view/components/controls/playButton";
import SettingButton from "view/components/controls/settingButton";
import FrameButtons from "view/components/controls/frameButtons";
import VolumeButton from "view/components/controls/volumeButton";
import ProgressBar from "view/components/controls/progressBar";
import PlaylistPanel from "view/components/controls/playlistPanel";
import LA$ from 'utils/likeA$';
import TimeDisplay from "view/components/controls/timeDisplay";
import FullScreenButton from "view/components/controls/fullScreenButton";
import {
    READY,
    CONTENT_META, CONTENT_LEVEL_CHANGED, CONTENT_TIME_MODE_CHANGED, CONTENT_TIME, PLAYER_PLAY,
    STATE_AD_LOADED,
    PLAYER_RESIZED,
    AD_CHANGED,
    STATE_AD_ERROR,
    STATE_AD_PLAYING,
    STATE_AD_PAUSED,
    STATE_AD_COMPLETE,
    CONTENT_SOURCE_CHANGED,
    OME_P2P_MODE,
    ERROR,
    PROVIDER_HLS,
    PLAYER_WEBRTC_WS_ERROR
} from "api/constants";

const Controls = function ($container, api) {

    let volumeButton = "", playButton = "", settingButton = "", progressBar = "", timeDisplay = "",
        fullScreenButton = "", frameButtons = "", hasPlaylist = false, initialDuration;
    let uiInited = false;
    let webrtc_is_p2p_mode = false;
    let isLiveMode = false;

    let browser = api.getConfig().browser;
    let isAndroid = browser.os === "Android";
    let isIOS = browser.os === "iOS";

    const $root = LA$(api.getContainerElement());
    let lastContentMeta = {};

    hasPlaylist = api.getPlaylist().length > 1;

    if (api.getConfig().hidePlaylistIcon === true) {
        hasPlaylist = false;
    }

    if (api.getConfig().legacyUI === true) {
        hasPlaylist = true;
    }

    let playlistPanel = "";

    const onRendered = function ($current, template) {

        function setPanelMaxHeight() {
            if ($root.find(".op-setting-panel")) {
                $root.find(".op-setting-panel").css("max-height", $root.height() - $root.find(".op-bottom-panel").height() + "px");
            }
        }

        function initTimeDisplay(data) {
            if (timeDisplay) {
                timeDisplay.destroy();
            }
            timeDisplay = TimeDisplay($current.find(".op-left-controls"), api, data);
        }

        function initProgressBar(isAd, meta) {
            if (progressBar) {
                progressBar.destroy();
            }
            progressBar = ProgressBar($current.find(".op-progressbar-container"), api, isAd, meta);
        }

        function initFrameJumpButtons() {
            if (frameButtons) {
                frameButtons.destroy();
            }
            frameButtons = FrameButtons($current.find(".op-controls"), api);
        }

        function initSettingButton() {
            if (settingButton) {
                settingButton.destroy();
            }
            settingButton = SettingButton($current.find(".setting-holder"), api);
        }

        function initFullscreenButton() {
            if (fullScreenButton) {
                // Don't need to destroy.
                return;
                // fullScreenButton.destroy();
            }
            fullScreenButton = FullScreenButton($current.find(".fullscreen-holder"), api);
        }

        function makeControlUI(metadata) {

            if (metadata.duration > 9000000000000000) {

                metadata.duration = Infinity;
            }

            let sectionStart = api.getSources()[api.getCurrentSource()].sectionStart;
            let sectionEnd = api.getSources()[api.getCurrentSource()].sectionEnd;

            if (sectionEnd) {
                metadata.duration = sectionEnd;
            }

            if (sectionStart) {
                metadata.duration = metadata.duration - sectionStart;
            }

            initTimeDisplay(metadata);
            initFullscreenButton();

            if (api.getFramerate && api.getFramerate() > 0) {
                // initFrameJumpButtons();
            } else {
                if (frameButtons) {
                    frameButtons.destroy();
                }
            }

            if (metadata.duration === Infinity) {

                //live
                OvenPlayerConsole.log("[[[[LIVE MODE]]]]");
                isLiveMode = true;

                if (metadata.type === PROVIDER_HLS) {
                    // show progress bar when hls
                    initProgressBar(false, metadata);
                } else {
                    if (progressBar) {
                        progressBar.destroy();
                    }
                }
            } else {
                //vod
                initProgressBar(false);
            }

            uiInited = true;
        }

        function resetControlUI() {

            // if (timeDisplay) {
            //     timeDisplay.destroy();
            // }

            if (progressBar) {
                progressBar.destroy();
            }

            initSettingButton();
            initFullscreenButton();

            $root.removeClass("linear-ad");

            initProgressBar(false);
        }

        playButton = PlayButton($current.find(".op-left-controls"), api);
        volumeButton = VolumeButton($current.find(".op-left-controls"), api);

        let playlist = api.getPlaylist();
        let currentPlaylistIndex = api.getCurrentPlaylist();

        if (playlist && playlist[currentPlaylistIndex] && playlist[currentPlaylistIndex].adTagUrl) {
            //does not show setting button when ads plays.
        } else {
            initSettingButton();
        }
        initFullscreenButton();

        api.on(READY, function () {
            $current.show();
        }, template);


        api.on(CONTENT_META, function (data) {
            initialDuration = data.duration;
            lastContentMeta = data;
            data.isP2P = webrtc_is_p2p_mode;
            makeControlUI(data);
        }, template);

        /*
        * I think do not nessessary this code anymore. Because muted play solves everything. 2019-06-04
        *
        *  -> muted play canceled. 2019-06-20(?)
        */
        api.on(CONTENT_TIME, function (metadata_for_when_after_playing) {

            //Android HLS native doesn't give duration on CONTENT_META. why?
            //Fortunately I have CONTENT_TIME.
            //RTMP too.
            if (isAndroid || (api && api.getProviderName && api.getProviderName() === "rtmp")) {
                if (!initialDuration && (lastContentMeta && (lastContentMeta.duration !== metadata_for_when_after_playing.duration))) {
                    lastContentMeta = metadata_for_when_after_playing;
                    makeControlUI(metadata_for_when_after_playing);
                }
            }

        }, template);

        api.on(PLAYER_RESIZED, function (size) {
            setPanelMaxHeight();
        }, template);

        api.on(OME_P2P_MODE, function (isP2P) {
            webrtc_is_p2p_mode = isP2P;
        }, template);

        api.on(PLAYER_PLAY, function () {
            if (!uiInited) {

                let type = '';

                if (api.getSources().length > 0) {

                    if (api.getSources()[api.getCurrentSource()]) {

                        if (api.getSources()[api.getCurrentSource()].type) {
                            type = api.getSources()[api.getCurrentSource()].type;
                        }
                    }
                }

                makeControlUI({
                    isP2P: webrtc_is_p2p_mode,
                    duration: api.getDuration(),
                    type: type
                });
            }
            $current.show();
        }, template);

        api.on(ERROR, function (error) {
            $current.show();
        }, template);

        api.on(AD_CHANGED, function (ad) {
            if (ad.isLinear) {
                $root.addClass("linear-ad");

                initProgressBar(true);
                // if (timeDisplay) {
                //     timeDisplay.destroy();
                // }
                if (settingButton) {
                    settingButton.destroy();
                }

                //Fullscreen button. Not required on iOS.
                if (isIOS && fullScreenButton) {
                    fullScreenButton.destroy();
                }
            } else {
                $root.removeClass("linear-ad");
            }
        }, template);


        api.on(STATE_AD_COMPLETE, function () {
            resetControlUI();
        }, template);

        api.on(STATE_AD_ERROR, function () {
            resetControlUI();
        }, template);

        api.on(CONTENT_SOURCE_CHANGED, function () {
            resetControlUI();
        }, template);
    };

    const onDestroyed = function (template) {
        api.off(CONTENT_META, null, template);
        api.off(CONTENT_TIME, null, template);
        api.off(STATE_AD_COMPLETE, null, template);
        api.off(AD_CHANGED, null, template);
        api.off(OME_P2P_MODE, null, template);
        api.off(STATE_AD_ERROR, null, template);
        api.off(PLAYER_RESIZED, null, template);
        api.off(CONTENT_SOURCE_CHANGED, null, template);
        if (timeDisplay) {
            timeDisplay.destroy();
        }
        if (playButton) {
            playButton.destroy();
        }
        if (progressBar) {
            progressBar.destroy();
        }
        if (fullScreenButton) {
            fullScreenButton.destroy();
        }
        if (volumeButton) {
            volumeButton.destroy();
        }

    };

    const events = {
        "mouseleave .op-controls": function (event, $current, template) {
            event.preventDefault();
            volumeButton.setMouseDown(false);
            $current.find(".op-volume-slider-container").removeClass("active");
        },

        "click .op-playlist-button": function (event, $current, template) {
            event.preventDefault();
            playlistPanel = PlaylistPanel($current, api);
        }
    };

    return OvenTemplate($container, "Controls", api.getConfig(), hasPlaylist, events, onRendered, onDestroyed);
};

export default Controls;
