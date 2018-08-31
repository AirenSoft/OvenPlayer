/**
 * Created by hoho on 2018. 7. 20..
 */
import OvenTemplate from 'view/engine/OvenTemplate';

const VolumeButton = function($container, api){

    let $sliderContainer = "",
        $slider = "",
        $sliderHandle = "",
        $sliderValue = "",
        $volumeIconBig = "",
        $volumeIconSmall = "",
        $volumeIconMute = "";
    let mouseDown = false;
    let sliderWidth = 70,  handleWidth = 0, minRange = 0, maxRange = 0;


    /*private functions*/
    let setVolumeIcon = function(percentage) {
        $volumeIconBig.hide();
        $volumeIconSmall.hide();
        $volumeIconMute.hide();

        if (percentage >= 70) {
            $volumeIconBig.show();
        } else if (percentage < 70 && percentage > 0) {
            $volumeIconSmall.show();
        } else if (percentage == 0) {
            $volumeIconMute.show();
        }
    }

    let setVolumeUI = function(percentage) {
        if (api.getMute()) {
            percentage = 0;
        }

        setVolumeIcon(percentage);

        const handlePosition = maxRange * percentage / 100;

        $sliderHandle.css('left', handlePosition+ 'px');
        $sliderValue.css('width', handlePosition+ 'px');
    }

    let calculatePercentage = function (event) {
        const relativeX = event.pageX - $slider.offset().left;
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
        $sliderContainer = $current.find(".ovp-volume-slider-container");
        $slider = $current.find(".ovp-volume-silder");
        $sliderHandle = $current.find(".ovp-volume-slider-handle");
        $sliderValue = $current.find(".ovp-volume-slider-value");

        $volumeIconBig = $current.find( ".ovp-volume-button-bigicon");
        $volumeIconSmall = $current.find(".ovp-volume-button-smallicon");
        $volumeIconMute = $current.find(".ovp-volume-button-muteicon");

        handleWidth = $sliderHandle.width();
        maxRange = sliderWidth - handleWidth;

        api.on('ready', function() {
            setVolumeUI(api.getVolume());
        });
        api.on('volumeChanged', function(data) {
            setVolumeUI(data.volume);
        });
        api.on('mute', function(data) {
            if (data.mute) {
                setVolumeUI(0);
            } else {
                setVolumeUI(api.getVolume());
            }
        });

    };
    const onDestroyed = function(){

    };
    const events = {
        "click .ovp-volume-button" : function(event, $current, template){
            event.preventDefault();

            if (api.getVolume() === 0) {
                api.setMute(false);
                api.setVolume(100);
            } else {
                api.setMute();
            }
        },
        "mouseenter .ovp-volume-button" : function(event, $current, template){
            event.preventDefault();
            $sliderContainer.addClass("active");
        },
        "mouseleave .ovp-volume-silder" : function(event, $current, template){
            event.preventDefault();

            mouseDown = false;
        },
        "mousedown .ovp-volume-silder" : function(event, $current, template){
            event.preventDefault();
            mouseDown = true;
            api.setMute(false);
            api.setVolume(calculatePercentage(event));
        },
        "mouseup .ovp-volume-silder" : function(event, $current, template){
            event.preventDefault();
            mouseDown = false;
        },
        "mousemove .ovp-volume-silder" : function(event, $current, template){
            event.preventDefault();
            if (!mouseDown) {
                return false;
            }

            api.setVolume(calculatePercentage(event));
        }
    };

    return Object.assign(OvenTemplate($container, "VolumeButton", null, events, onRendered, onDestroyed), {
        setMouseDown: function (state) {
            mouseDown = state;
        }
    });
};

export default VolumeButton;
