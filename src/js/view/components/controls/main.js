/**
 * Created by hoho on 2018. 7. 20..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import PlayButton from "view/components/controls/playButton";
import FrameButtons from "view/components/controls/frameButtons";
import VolumeButton from "view/components/controls/volumeButton";
import ProgressBar from "view/components/controls/progressBar";
import LA$ from 'utils/likeA$';
import TimeDisplay from "view/components/controls/timeDisplay";
import FullScreenButton from "view/components/controls/fullScreenButton";
import Panels, {generateMainData} from "view/components/controls/settingPanel/main";
import PanelManager from "view/global/PanelManager";
import {
    READY,
    CONTENT_META, CONTENT_LEVEL_CHANGED, CONTENT_TIME_MODE_CHANGED,
    PROVIDER_RTMP,
    ERROR
} from "api/constants";

const Controls = function($container, api){
    let volumeButton = "", playButton= "", progressBar = "", timeDisplay = "", fullScreenButton = "", frameButtons = "";
    let panelManager = PanelManager();
    const $root = LA$("#"+api.getContainerId());
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
        let initProgressBar = function(){
            if(progressBar){
                progressBar.destroy();
            }
            progressBar = ProgressBar($current.find(".ovp-progressbar-container"), api);
        };
        let initFrameJumpButtons = function(){
            if(frameButtons){
                frameButtons.destroy();
            }
            frameButtons = FrameButtons($current.find(".ovp-controls"), api);
        };

        playButton = PlayButton($current.find(".ovp-left-controls"), api);
        volumeButton = VolumeButton($current.find(".ovp-left-controls"), api);
        fullScreenButton = FullScreenButton($current.find(".ovp-right-controls"), api);

        api.on(CONTENT_META, function(data){
            initTimeDisplay(data);

            if(api.getFramerate() > 0){
                //initFrameJumpButtons();
            }else{
                if(frameButtons){
                    frameButtons.destroy();
                }
            }

            if(data.duration === Infinity){
                //live
                if(progressBar){
                    progressBar.destroy();
                }
            }else{
                //vod
                initProgressBar();
            }
        }, template);

    };
    const onDestroyed = function(template){
        api.off(CONTENT_META, null, template);
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
        "mouseleave .ovp-controls" : function(event, $current, template){
            event.preventDefault();
            volumeButton.setMouseDown(false);
            $current.find(".ovp-volume-slider-container").removeClass("active");
        },
        "click .ovp-setting-button" : function(event, $current, template){
            event.preventDefault();
            if(panelManager.size() > 0){
                panelManager.clear();
            }else{
                let panelData = generateMainData(api);
                panelManager.add(Panels($current, api, panelData));
            }
        },
        "resize body" : function(event, $current, template){
            event.preventDefault();
            setPanelMaxHeight();
        }
    };

    return OvenTemplate($container, "Controls",  null , events, onRendered, onDestroyed);
};

export default Controls;
