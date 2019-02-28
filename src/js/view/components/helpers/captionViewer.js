/**
 * Created by hoho on 2018. 7. 24..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import {
    STATE_IDLE,
    STATE_PLAYING,
    STATE_COMPLETE,
    STATE_PAUSED,
    CONTENT_CAPTION_CHANGED,
    CONTENT_CAPTION_CUE_CHANGED
} from "api/constants";
import LA$ from 'utils/likeA$';
import ResizeSensor from "resize-sensor";

const CaptionViewer = function($container, api, playerState){
    const $root = LA$("#"+api.getContainerId());
    let resizeSensor = "";
    const resizeCaption = function(){
        if($root.width() > 1200){
            $root.find(".ovp-caption-text").css("font-size", "2rem");
            $root.find(".ovp-caption-text").css("line-height", "2.4rem");
        }else if($root.width() > 768){
            $root.find(".ovp-caption-text").css("font-size", "1.4rem");
            $root.find(".ovp-caption-text").css("line-height", "1.6rem");
        }else if($root.width() > 300) {
            $root.find(".ovp-caption-text").css("font-size", "1rem");
            $root.find(".ovp-caption-text").css("line-height", "1.2rem");
        }else {
            $root.find(".ovp-caption-text").css("font-size", "0.8rem");
            $root.find(".ovp-caption-text").css("line-height", "1rem");
        }
    };

    const onRendered = function($container, $current, template){
        let isDisable = false;
        let deleteTimer = 0;

        new ResizeSensor($root.get(), function() {
            resizeCaption();
        });

        api.on(CONTENT_CAPTION_CHANGED, function(index) {
            if(index > -1){
                isDisable = false;
            }else{
                isDisable  = true;
                $container.find(".ovp-caption-text").text("");
            }
        }, template);
        api.on(CONTENT_CAPTION_CUE_CHANGED, function(data) {
            if(!isDisable && data && data.text){
                let hideGap = data.endTime - data.startTime;

                if(deleteTimer){
                    clearTimeout(deleteTimer);
                }

                $container.find(".ovp-caption-text").html(data.text);

                if(hideGap){
                    deleteTimer = setTimeout(function(){
                        $container.find(".ovp-caption-text").text("");
                    },hideGap * 1000);
                }

            }

        }, template);


    };
    const onDestroyed = function(template){
        $container.find(".ovp-caption-text").text("");
        api.off(CONTENT_CAPTION_CHANGED, null, template);
        api.off(CONTENT_CAPTION_CUE_CHANGED, null, template);
    };
    const events = {
    };

    return OvenTemplate($container, "CaptionViewer", playerState, events, onRendered, onDestroyed );
};

export default CaptionViewer;