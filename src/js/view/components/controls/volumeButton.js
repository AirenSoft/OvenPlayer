/**
 * Created by hoho on 2018. 7. 20..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import {
    READY,
    CONTENT_VOLUME,
    CONTENT_MUTE
} from "api/constants";

const VolumeButton = function($container, api){

    let $sliderContainer = "",
        $slider = "",
        $sliderHandle = "",
        $sliderValue = "",
        $volumeIconBig = "",
        $volumeIconSmall = "",
        $volumeIconMute = "";
    let mouseDown = false;
    let sliderWidth = 70,  handleWidth = 12, minRange = 0, maxRange = 0;

    let isMobile = api.getBrowser().os === "iOS" || api.getBrowser().os === "Android";


    function setVolumeIcon(percentage) {
        $volumeIconBig.hide();
        $volumeIconSmall.hide();
        $volumeIconMute.hide();

        if (percentage >= 70) {
            $volumeIconBig.show();
        } else if (percentage < 70 && percentage > 0) {
            $volumeIconSmall.show();
        } else if (percentage == 0) {
            $volumeIconMute.show();
        }else{
            $volumeIconBig.show();
        }
    }

    function setVolumeUI(percentage) {
        if (api.getMute()) {
            percentage = 0;
        }

        setVolumeIcon(percentage);

        const handlePosition = maxRange * percentage / 100;


        $sliderHandle.css("left", handlePosition+ "px");
        $sliderValue.css("width", handlePosition+ "px");
    }

    function calculatePercentage(event) {
        const relativeX = (event.pageX || event.touches[0].clientX) - $slider.offset().left;
        let percentage = relativeX / sliderWidth * 100;

        if (percentage < 0) {
            percentage = 0;
        }

        if (percentage > 100) {
            percentage = 100;
        }
        return percentage;
    }


    const onRendered = function($current, template){
        $sliderContainer = $current.find(".op-volume-slider-container");
        $slider = $current.find(".op-volume-silder");
        $sliderHandle = $current.find(".op-volume-slider-handle");
        $sliderValue = $current.find(".op-volume-slider-value");

        $volumeIconBig = $current.find( ".op-volume-max");
        $volumeIconSmall = $current.find(".op-volume-small");
        $volumeIconMute = $current.find(".op-volume-mute");

        //ToDo : Can't read width.
        //sliderWidth = $sliderContainer.width();
        //handleWidth = $sliderHandle.width();

        maxRange = sliderWidth - (handleWidth/2);

        $sliderHandle.css("left", maxRange+ "px");

        api.on(READY, function() {
            setVolumeUI(api.getVolume());
        }, template);
        api.on(CONTENT_VOLUME, function(data) {

            setVolumeUI(data.volume);

        }, template);
        api.on(CONTENT_MUTE, function(data) {
            if (data.mute) {
                setVolumeUI(0);
            } else {
                setVolumeUI(api.getVolume());
            }
        }, template);

    };
    const onDestroyed = function(template){
        api.off(READY, null, template);
        api.off(CONTENT_VOLUME, null, template);
        api.off(CONTENT_MUTE, null, template);
    };
    const events = {
        "click .op-volume-button" : function(event, $current, template){
            event.preventDefault();
            if(isMobile){

            }else{
                if (api.getVolume() === 0) {
                    api.setMute(false);
                    api.setVolume(100);
                } else {
                    api.setMute();
                }
            }

        },
        "touchstart .op-volume-slider-handle" : function(event){
            mouseDown = true;

        },
        "touchmove .op-volume-slider-handle" : function(event){
            if(mouseDown){

                api.setMute(false);
                api.setVolume(calculatePercentage(event));
            }
        },
        "touchend .op-volume-slider-handle" : function(event){

            if(mouseDown){
                mouseDown = false;
            }
        },
        "touchstart .op-volume-button" : function(event){
            if(isMobile && $sliderContainer.hasClass("active")){
                if (api.getVolume() === 0) {
                    api.setMute(false);
                    api.setVolume(100);
                } else {
                    api.setMute();
                }
            }else{
                $sliderContainer.addClass("active");
            }
        },
        "mouseenter .op-volume-button" : function(event, $current, template){
            event.preventDefault();

            if(!isMobile){
                $sliderContainer.addClass("active");
            }
        },
        "mouseleave .op-volume-silder" : function(event, $current, template){
            event.preventDefault();

            mouseDown = false;
        },
        "mousedown .op-volume-silder" : function(event, $current, template){
            event.preventDefault();
            mouseDown = true;
            api.setMute(false);
            api.setVolume(calculatePercentage(event));
        },
        "mouseup .op-volume-silder" : function(event, $current, template){
            event.preventDefault();
            mouseDown = false;
        },
        "mousemove .op-volume-silder" : function(event, $current, template){
            event.preventDefault();
            if (!mouseDown) {
                return false;
            }

            api.setVolume(calculatePercentage(event));
        }
    };
    let that = OvenTemplate($container, "VolumeButton", api.getConfig(), null, events, onRendered, onDestroyed);
    that.setMouseDown = (state) => {
        mouseDown = state;
    };
    return that;

    /*or

    return Object.assign(OvenTemplate($container, "VolumeButton", api.getConfig(), null, events, onRendered, onDestroyed), {
        setMouseDown: function (state) {
            mouseDown = state;
        }
    });*/
};

export default VolumeButton;
