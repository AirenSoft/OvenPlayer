/**
 * Created by hoho on 2018. 7. 24..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import PanelManager from "view/global/PanelManager";
import {naturalHms} from "utils/strings"
import LA$ from "utils/likeA$";
import {
    CONTENT_TIME,
    CONTENT_BUFFER
} from "api/constants";

const ProgressBar = function($container, api){
    const $root = LA$("#"+api.getContainerId());
    let currentPlayingPosition = 0;
    let currentPlayingPercentage = 0;
    let currentLoadedPercentage = 0;

    let mouseInside = false, mouseDown = false;
    let panelManager = PanelManager();

    let $progressBar = "",
        $progressLoad = "",
        $progressPlay = "",
        $progressHover = "",
        $knobContainer = "",
        $knob = "",
        knobWidth = 0,
        $time = "";


    let positionElements = function (percentage) {
        const progressBarWidth = $progressBar.width();
        const position = progressBarWidth * percentage;

        $progressPlay.css("width", position+ "px");
        $progressHover.css("left", position+ "px");

        const knobPostion = (progressBarWidth - knobWidth) * percentage;
        $knobContainer.css("left", knobPostion+ "px");

        currentPlayingPosition = position;
        currentPlayingPercentage = percentage;
    };

    let drawHoverProgress = function (percentage) {
        const progressBarWidth = $progressBar.width();
        const hoverPosition = progressBarWidth * percentage;

        $progressHover.css("width", percentage == 0? percentage : (hoverPosition - currentPlayingPosition)+ "px");
    };

    let drawLoadProgress = function(percentage) {
        const progressBarWidth = $progressBar.width();
        const loadPosition = progressBarWidth * percentage;

        $progressLoad.css("width", loadPosition+ "px");
        currentLoadedPercentage = percentage;
    };

    let calculatePercentage = function (event) {
        const progressBarWidth = $progressBar.width();
        const progressBarOffsetX = $progressBar.offset().left;
        const pointerOffsetX = event.pageX;

        const percentage = (pointerOffsetX - progressBarOffsetX) / progressBarWidth;

        if (percentage < 0) {
            return 0;
        }

        if (percentage > 1) {
            return 1;
        }

        return percentage;
    };

    let drawTimeIndicator = function (percentage, event) {
       if(panelManager.size() > 0){
           $time.hide();
           return ;
       }

        const duration = api.getDuration();
        const second = duration * percentage;

        if(api.isTimecodeMode()){
            $time.text(naturalHms(second));
        }else{
            $time.text(Math.round (second * api.getFramerate()));
        }



        const timeElemWidth = $time.width();
        const progressBarWidth = $progressBar.width();
        const position = progressBarWidth * percentage;
        const positionOfPixel = event.pageX - $progressBar.offset().left;


        const calculateMagnetic = function(){
            if(positionOfPixel < timeElemWidth / 2){
                return 0;
            }else if(progressBarWidth-positionOfPixel  < timeElemWidth / 2){
                return progressBarWidth - timeElemWidth;
            }else{
                return position - timeElemWidth / 2;
            }
        };
        let magneticPosition = calculateMagnetic();
        $time.css("left", magneticPosition+ "px");
    };

    let seek = function (percentage) {
        api.seek( (api.getDuration()||0) * percentage);
    };
    const onRendered = function($current, template){
        $progressBar = $current;
        $progressLoad = $current.find(".ovp-load-progress");
        $progressPlay = $current.find(".ovp-play-progress");
        $progressHover = $current.find(".ovp-hover-progress");
        $knobContainer = $current.find(".ovp-progressbar-knob-container");
        $knob = $current.find(".ovp-progressbar-knob");
        knobWidth = $knob.width();
        $time = $current.find(".ovp-progressbar-time");

        api.on(CONTENT_TIME, function(data) {
            if(data && data.duration && data.position){
                positionElements(data.position / data.duration);
            }
        },template);

        api.on(CONTENT_BUFFER, function(data) {
            if(data && data.bufferPercent){
                drawLoadProgress(data.bufferPercent / 100);
            }
        },template);

    };
    const onDestroyed = function(template){
        api.off(CONTENT_TIME, null, template);
        api.off(CONTENT_BUFFER, null, template);
    };
    const events = {
        "resize body" : function(event, $current, template){
            event.preventDefault();

            positionElements(currentPlayingPercentage);
            drawLoadProgress(currentLoadedPercentage);
        },
        "mouseenter .ovp-progressbar" : function(event, $current, template){
            event.preventDefault();

            mouseInside = true;
            $time.show();
            $root.addClass("ovp-progressbar-hover");

        },
        "mouseleave .ovp-progressbar" : function(event, $current, template){
            event.preventDefault();

            mouseInside = false;
            if (!mouseInside) {
                $root.removeClass("ovp-progressbar-hover");
                $time.hide();
            }
            drawHoverProgress(0);
        },
        "mousedown .ovp-progressbar" : function(event, $current, template){
            event.preventDefault();
            mouseDown = true;
            const percentage = calculatePercentage(event);
            positionElements(percentage);
            drawHoverProgress(0);
            seek(percentage);
        },
        "mousemove .ovp-progressbar" : function(event, $current, template){
            event.preventDefault();

            if (!mouseDown) {
                const percentage = calculatePercentage(event);
                drawHoverProgress(percentage);
                drawTimeIndicator(percentage, event);
            }
        },
        "mousemove document" : function(event, $current, template){
            event.preventDefault();
            if (mouseDown) {
                const percentage = calculatePercentage(event);
                positionElements(percentage);
                drawHoverProgress(0);
                seek(percentage);
                drawTimeIndicator(percentage, event);
            }
        },
        "mouseup document" : function(event, $current, template){
            event.preventDefault();

            if(mouseDown){
                mouseDown = false;
                $root.removeClass("ovp-progressbar-hover");
            }

        }
    };

    return OvenTemplate($container, "ProgressBar", null, events, onRendered, onDestroyed );
};

export default ProgressBar;
