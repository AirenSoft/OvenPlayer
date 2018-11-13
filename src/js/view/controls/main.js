/**
 * Created by hoho on 2018. 7. 20..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import PlayButton from "view/controls/playButton";
import VolumeButton from "view/controls/volumeButton";
import ProgressBar from "view/controls/progressBar";
import TimeDisplay from "view/controls/timeDisplay";
import FullScreenButton from "view/controls/fullScreenButton";
import SettingPanel from "view/controls/settingPanel";
import PanelManager,{extractMainPanelData} from "view/global/PanelManager";
import {
    READY,
    CONTENT_META, CONTENT_LEVEL_CHANGED,
    PROVIDER_RTMP,
    ERROR
} from "api/constants";

const Controls = function($container, api){
    let volumeButton = "", playButton= "", progressBar = "", timeDisplay = "", fullScreenButton = "";
    let panelManager = PanelManager();



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

        playButton = PlayButton($current.find(".ovp-left-controls"), api);
        volumeButton = VolumeButton($current.find(".ovp-left-controls"), api);
        fullScreenButton = FullScreenButton($current.find(".ovp-right-controls"), api);

        api.on(CONTENT_META, function(data){
            initTimeDisplay(data);
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
        /*api.on(CONTENT_LEVEL_CHANGED, function(data){
            //console.log("LEVEL CHANGED !@@", data);
        }, template);*/
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
                let panelData = extractMainPanelData(api);
                panelManager.add(SettingPanel($current, api, panelData));
            }
        }
    };

    return OvenTemplate($container, "Controls",  null , events, onRendered, onDestroyed);
};

export default Controls;
