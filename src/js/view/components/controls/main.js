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
    let isAndroid = api.getConfig().browser.os === "Android";
    let checkAfterPlay = false;

    const $root = LA$("#"+api.getContainerId());
    let lastContentMeta = {};

    let hidePlaylistIcon = api.getConfig().hidePlaylistIcon;
    hasPlaylist = api.getPlaylist().length > 1 ? (!hidePlaylistIcon ? true : false) : false;

    let playlistPanel = "";
    let setPanelMaxHeight = function(){
        if($root.find(".ovp-setting-panel")){
            $root.find(".ovp-setting-panel").css("max-height",  $root.height() - $root.find(".ovp-bottom-panel").height() + "px");
        }
    };

    const onRendered = function($current, template){

        let initTimeDisplay = function(data){
            if(timeDisplay){
                timeDisplay.destroy();
            }
            timeDisplay = TimeDisplay($current.find(".ovp-left-controls"), api, data);
        };
        let initProgressBar = function(isAd){
            if(progressBar){
                progressBar.destroy();
            }
            progressBar = ProgressBar($current.find(".ovp-progressbar-container"), api, isAd);
        };
        let initFrameJumpButtons = function(){
            if(frameButtons){
                frameButtons.destroy();
            }
            frameButtons = FrameButtons($current.find(".ovp-controls"), api);
        };

        let initSettingButton = function(){
            if(settingButton){
                settingButton.destroy();
            }
            settingButton = SettingButton($current.find(".setting-holder"), api);
        };

        let initFullscreenButton = function(){
            if(fullScreenButton){
                fullScreenButton.destroy();
            }
            fullScreenButton = FullScreenButton($current.find(".fullscreen-holder"), api);
        };

        playButton = PlayButton($current.find(".ovp-left-controls"), api);
        volumeButton = VolumeButton($current.find(".ovp-left-controls"), api);

        initFullscreenButton();

        let playlist = api.getPlaylist();
        let currentPlaylistIndex = api.getCurrentPlaylist();


        //ToDo : Sometimes ad init failed.
        if(playlist && playlist[currentPlaylistIndex] && playlist[currentPlaylistIndex].adTagUrl){

        }else{
            initSettingButton();
        }

        let initControlUI = function(metadata){
            initTimeDisplay(metadata);
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

        api.on(CONTENT_META, function(data){
            initialDuration = data.duration;
            lastContentMeta = data;
            data.isP2P = webrtc_is_p2p_mode;

            initControlUI(data);
        }, template);


        /*
        * I think do not nessessary this code anymore. Because muted play solves everything. 2019-06-04

        */
        api.on(CONTENT_TIME, function(metadata_for_when_after_playing){

            //Android HLS native doesn't give duration on CONTENT_META. why?
            //Fortunately I have CONTENT_TIME.

            //RTMP too.
            if( isAndroid  || (api && api.getProviderName && api.getProviderName() === "rtmp") ){
                /*if(!checkAfterPlay){
                    checkAfterPlay = true;
                    lastContentMeta = metadata_for_when_after_playing;
                    initControlUI(metadata_for_when_after_playing);
                }*/

                if(!initialDuration || (initialDuration && (initialDuration !== metadata_for_when_after_playing.duration))){
                    lastContentMeta = metadata_for_when_after_playing;
                    initControlUI(metadata_for_when_after_playing);
                }
            }

        }, template);

        api.on("resize", function(size){
            setPanelMaxHeight();
        },template);

        api.on(OME_P2P_MODE, function(isP2P){
            webrtc_is_p2p_mode = isP2P;
        }, template);

        api.on(PLAYER_PLAY, function(data){
            $current.css("display", "block");
        }, template);

        api.on(AD_CHANGED, function(ad){

            if(ad.isLinear){
                if(progressBar){
                    progressBar.destroy();
                }
                initProgressBar(true);
                if(timeDisplay){
                    timeDisplay.destroy();
                }
                $root.addClass("linear-ad");
                if(settingButton){
                    settingButton.destroy();
                }
            }else{
                $root.removeClass("linear-ad");
            }
        }, template);

        //ToDo : Same Code refactor
        api.on(STATE_AD_COMPLETE, function(){
            initTimeDisplay(lastContentMeta);
            if(progressBar){
                progressBar.destroy();
            }
            $root.removeClass("linear-ad");
            initSettingButton();
            if(isLiveMode){

            }else{
                initProgressBar(false);
            }

        }, template);

        api.on(STATE_AD_ERROR , function(){
            initTimeDisplay(lastContentMeta);
            if(progressBar){
                progressBar.destroy();
            }
            $root.removeClass("linear-ad");
            initSettingButton();
            if(isLiveMode){

            }else{
                initProgressBar(false);
            }
        },template);

    };
    const onDestroyed = function(template){
        api.off(CONTENT_META, null, template);
        api.off(CONTENT_TIME, null, template);
        api.off(STATE_AD_COMPLETE, null, template);
        api.off(AD_CHANGED, null, template);
        api.off(OME_P2P_MODE, null, template);
        api.off(STATE_AD_ERROR, null, template);
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

        api.off("resize", null, template);

    };
    const events = {
        "mouseleave .ovp-controls" : function(event, $current, template){
            event.preventDefault();
            volumeButton.setMouseDown(false);
            $current.find(".ovp-volume-slider-container").removeClass("active");
        },

        "click .ovp-playlist-button" : function(event, $current, template){
            event.preventDefault();
            playlistPanel = PlaylistPanel($current, api);
        }
    };

    return OvenTemplate($container, "Controls",  hasPlaylist , events, onRendered, onDestroyed);
};

export default Controls;
