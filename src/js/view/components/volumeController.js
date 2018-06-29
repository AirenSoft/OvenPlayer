import $ from 'utils/jquery';
import VolumeControllerTemplate from './volumeControllerTemplate'

function VolumeController(container, player, ui) {

    const volumeControllerElem = $(VolumeControllerTemplate());
    container.append(volumeControllerElem);

    const volumeButton = volumeControllerElem.find('.ovp-volume-button');
    const bigIcon = volumeControllerElem.find('.ovp-volume-button-bigicon');
    const smallIcon = volumeControllerElem.find('.ovp-volume-button-smallicon');
    const muteIcon = volumeControllerElem.find('.ovp-volume-button-muteicon');

    const sliderContainer = volumeControllerElem.find('.ovp-volume-slider-container');
    const slider = volumeControllerElem.find('.ovp-volume-silder');
    const sliderHandle = volumeControllerElem.find('.ovp-volume-slider-handle');

    const sliderValueElem = volumeControllerElem.find('.ovp-volume-slider-value');

    let sliderWidth = 70;
    let handleWidth = sliderHandle.width();

    let minRange = 0;
    let maxRange = sliderWidth - handleWidth;
    let mouseDown = false;

    bigIcon.show();

    volumeButton.on('click', function(e) {

        e.preventDefault();
        
        if (player.getVolume() == 0) {

            player.setMute(false);
            player.setVolume(100);
        } else {

            player.setMute();
        }
    });

    volumeButton.on('mouseenter', function(e) {
        
        sliderContainer.addClass('ovp-volume-slider-container-active');
        const currentVolume = player.getVolume();
        setVolumeUI(currentVolume);
    });

    container.on('mouseleave', function(e) {
        
        if (!mouseDown) {
            sliderContainer.removeClass('ovp-volume-slider-container-active');
        }
    });

    slider.on('mousedown', function(e) {
        mouseDown = true;
        const percentage = calculatePercentage(e);
        
        player.setMute(false);
        player.setVolume(percentage);
    });

    $(document).on('mousemove.OvpVolumeSlider', function(e) {
        
        if (!mouseDown) {
            return;
        }

        const percentage = calculatePercentage(e);
        player.setVolume(percentage);
    });

    $(document).on('mouseup.OvpVolumeSlider', function(e) {
        mouseDown = false;
    });

    function calculatePercentage(e) {

        const relativeX = e.pageX - slider.offset().left;
        let percentage = relativeX / sliderWidth * 100;

        if (percentage < 0) {
            percentage = 0;
        }

        if (percentage > 100) {
            percentage = 100;
        }

        return percentage;
    }

    function setVolumeIcon(percentage) {
        
        bigIcon.hide();
        smallIcon.hide();
        muteIcon.hide();

        if (percentage >= 30) {
            bigIcon.show();
        } else if (percentage < 30 && percentage > 0) {
            smallIcon.show();
        } else if (percentage == 0) {
            muteIcon.show();
        }
    }

    function setVolumeUI(percentage) {

        if (player.getMute()) {
            percentage = 0;
        }

        setVolumeIcon(percentage);
        const handlePosition = maxRange * percentage / 100;
        sliderHandle.css('left', handlePosition);

        sliderValueElem.css('width', percentage + '%');
    }

    player.on('mute', function(e) {

        if (e.mute) {
            setVolumeUI(0);
        } else {
            setVolumeUI(player.getVolume());
        }
    });

    player.on('volumeChanged', function(e) {
        
        setVolumeUI(e.volume);
    });

    player.on('ready', function(e) {

        setVolumeUI(player.getVolume());
    });
    
}

export default VolumeController;