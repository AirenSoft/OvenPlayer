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
    OME_P2P_MODE,
    PROVIDER_RTMP,
    ERROR
} from "api/constants";
const Controls = function($container, api){

    let volumeButton = "", playButton = "", settingButton = "", progressBar = "", timeDisplay = "", fullScreenButton = "", frameButtons = "", hasPlaylist = false, initialDuration;

    let webrtc_is_p2p_mode = false;
    let isLiveMode = false;

    let browser = api.getConfig().browser;
    let isAndroid = browser.os === "Android";
    let isIOS = browser.os === "iOS";
    let checkAfterPlay = false;

    const $root = LA$("#"+api.getContainerId());
    let lastContentMeta = {};

    let hidePlaylistIcon = api.getConfig().hidePlaylistIcon;
    hasPlaylist = api.getPlaylist().length > 1 ? (!hidePlaylistIcon ? true : false) : false;

    let playlistPanel = "";


    const onRendered = function($current, template){
        const setPanelMaxHeight = function(){
            if($root.find(".op-setting-panel")){
                $root.find(".op-setting-panel").css("max-height",  $root.height() - $root.find(".op-bottom-panel").height() + "px");
            }
        };

        const initTimeDisplay = function(data){
            if(timeDisplay){
                timeDisplay.destroy();
            }
            timeDisplay = TimeDisplay($current.find(".op-left-controls"), api, data);
        };
        const initProgressBar = function(isAd){
            if(progressBar){
                progressBar.destroy();
            }
            progressBar = ProgressBar($current.find(".op-progressbar-container"), api, isAd);
        };
        const initFrameJumpButtons = function(){
            if(frameButtons){
                frameButtons.destroy();
            }
            frameButtons = FrameButtons($current.find(".op-controls"), api);
        };

        const initSettingButton = function(){
            if(settingButton){
                settingButton.destroy();
            }
            settingButton = SettingButton($current.find(".setting-holder"), api);
        };

        const initFullscreenButton = function(){
            if(fullScreenButton){
                fullScreenButton.destroy();
            }
            fullScreenButton = FullScreenButton($current.find(".fullscreen-holder"), api);
        };

        const makeControlUI = function(metadata){

            initTimeDisplay(metadata);
            initFullscreenButton();

            if(api.getFramerate && api.getFramerate() > 0){
                //initFrameJumpButtons();
            }else{
                if(frameButtons){
                    frameButtons.destroy();
                }
            }

            if(metadata.duration === Infinity){
                OvenPlayerConsole.log("[[[[LIVE MODE]]]]");
                isLiveMode = true;
                //live
                if(progressBar){
                    progressBar.destroy();
                }
            }else{
                //vod
                initProgressBar(false);
            }
        };
        const resetControlUI = function(){
            initTimeDisplay(lastContentMeta);
            initSettingButton();
            initFullscreenButton();

            if(!isLiveMode){
                initProgressBar(false);
            }else{
                if(progressBar){
                    progressBar.destroy();
                }
            }
            $root.removeClass("linear-ad");
        };


        playButton = PlayButton($current.find(".op-left-controls"), api);
        volumeButton = VolumeButton($current.find(".op-left-controls"), api);

        let playlist = api.getPlaylist();
        let currentPlaylistIndex = api.getCurrentPlaylist();

        if(playlist && playlist[currentPlaylistIndex] && playlist[currentPlaylistIndex].adTagUrl){
            //does not show setting button when ads plays.
        }else{
            initSettingButton();
        }
        initFullscreenButton();

        api.on(CONTENT_META, function(data){
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
        api.on(CONTENT_TIME, function(metadata_for_when_after_playing){

            //Android HLS native doesn't give duration on CONTENT_META. why?
            //Fortunately I have CONTENT_TIME.
            //RTMP too.
            if( isAndroid  || (api && api.getProviderName && api.getProviderName() === "rtmp") ){
                if(!initialDuration && (lastContentMeta && (lastContentMeta.duration !== metadata_for_when_after_playing.duration))){
                    lastContentMeta = metadata_for_when_after_playing;
                    makeControlUI(metadata_for_when_after_playing);
                }
            }

        }, template);

        api.on(PLAYER_RESIZED, function(size){
            setPanelMaxHeight();
        },template);

        api.on(OME_P2P_MODE, function(isP2P){
            webrtc_is_p2p_mode = isP2P;
        }, template);

        api.on(PLAYER_PLAY, function(data){
            $current.show();
        }, template);

        api.on(AD_CHANGED, function(ad){
            if(ad.isLinear){
                $root.addClass("linear-ad");

                initProgressBar(true);
                if(timeDisplay){
                    timeDisplay.destroy();
                }
                if(settingButton){
                    settingButton.destroy();
                }

                //Fullscreen button. Not required on iOS.
                if(isIOS && fullScreenButton){
                    fullScreenButton.destroy();
                }
            }else{
                $root.removeClass("linear-ad");
            }
        }, template);


        api.on(STATE_AD_COMPLETE, function(){
            resetControlUI();
        }, template);

        api.on(STATE_AD_ERROR , function(){
            resetControlUI();
        },template);

    };
    const onDestroyed = function(template){
        api.off(CONTENT_META, null, template);
        api.off(CONTENT_TIME, null, template);
        api.off(STATE_AD_COMPLETE, null, template);
        api.off(AD_CHANGED, null, template);
        api.off(OME_P2P_MODE, null, template);
        api.off(STATE_AD_ERROR, null, template);
        api.off(PLAYER_RESIZED, null, template);
        if(timeDisplay){
            timeDisplay.destroy();
        }
        if(playButton){
            playButton.destroy();
        }
        if(progressBar){
            progressBar.destroy();
        }
        if(fullScreenButton){
            fullScreenButton.destroy();
        }
        if(volumeButton){
            volumeButton.destroy();
        }
    };
    const events = {
        "mouseleave .op-controls" : function(event, $current, template){
            event.preventDefault();
            volumeButton.setMouseDown(false);
            $current.find(".op-volume-slider-container").removeClass("active");
        },

        "click .op-playlist-button" : function(event, $current, template){
            event.preventDefault();
            playlistPanel = PlaylistPanel($current, api);
        }
    };

    return OvenTemplate($container, "Controls",  hasPlaylist , events, onRendered, onDestroyed);
};

export default Controls;
