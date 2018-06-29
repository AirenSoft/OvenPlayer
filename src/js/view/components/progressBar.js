import $ from 'utils/jquery';
import {naturalHms} from 'utils/strings'
import ProgressBarTemplate from './progressBarTemplate'

function ProgressBar(container, player, ui) {

    let disabled = false;

    /**
     * Current playback position px value
     *
     * @type       {number} px
     */
    let currentPlayingPosition = 0;

    /**
     * % value of current play position 
     *
     * @type       {number} 
     */
    let currentPlayingPercentage = 0;

    /**
     * Current node position% value
     *
     * @type       {number} 
     */
    let currentLoadedPercentage = 0;

    /**
     * Whether the mouse is down
     *
     * @type       {boolean}
     */
    let mouseDown = false;

    /**
     * Make sure your mouse is within the progress bar area
     *
     * @type       {boolean}
     */
    let mouseInside = false;

    const progressBarElem = $(ProgressBarTemplate());
    container.append(progressBarElem);

    const loadProgressElem = progressBarElem.find('.ovp-load-progress');
    const playProgressElem = progressBarElem.find('.ovp-play-progress');
    const hoverProgressElem = progressBarElem.find('.ovp-hover-progress');

    const knobContainerElem = progressBarElem.find('.ovp-progressbar-knob-container');
    const knobElem = progressBarElem.find('.ovp-progressbar-knob');
    const knobElemWidth = knobElem.width();

    const timeElem = progressBarElem.find('.ovp-progressbar-time');

    progressBarElem.on('mouseenter', function(e) {

        mouseInside = true;
        
        ui.data('ovpElement').addClass('ovp-progressbar-hover');
    });

    progressBarElem.on('mouseleave', function(e) {

        mouseInside = false;
        
        if (!mouseDown) {
            ui.data('ovpElement').removeClass('ovp-progressbar-hover');
        }

        drawHoverProgress(0);
    });

    progressBarElem.on('mousedown', function(e) {

        mouseDown = true;
        const percentage = calculatePercentage(e);
        positionElements(percentage);
        drawHoverProgress(0);
        seek(percentage);
    });

    progressBarElem.on('mousemove', function(e) {

        const percentage = calculatePercentage(e);
        drawHoverProgress(percentage);
        drawTimeIndicator(percentage);
    });

    $(document).on('mousemove.OvpProgressBar', function(e) {

        if (!mouseDown) {
            return;
        }

        const percentage = calculatePercentage(e);
        positionElements(percentage);
        drawHoverProgress(0);
        drawTimeIndicator(percentage);
        seek(percentage);
    });

    $(document).on('mouseup.OvpProgressBar', function(e) {
        
        mouseDown = false;

        if (!mouseInside) {
            ui.data('ovpElement').removeClass('ovp-progressbar-hover');
        }
    });

    $(window).on('resize.OvpProgressBar', function(e) {
        positionElements(currentPlayingPercentage);
        drawLoadProgress(currentLoadedPercentage);
    });

    function calculatePercentage(e) {

        const progressBarWidth = progressBarElem.width();
        const progressBarOffsetX = progressBarElem.offset().left;
        const pointerOffsetX = e.pageX;

        const percentage = (pointerOffsetX - progressBarOffsetX) / progressBarWidth;

        if (percentage < 0) {
            return 0;
        }

        if (percentage > 1) {
            return 1;
        }

        return percentage;
    }

    function positionElements(percentage) {

        const progressBarWidth = progressBarElem.width();

        const position = progressBarWidth * percentage;

        playProgressElem.width(position);
        hoverProgressElem.css('left', position);

        const knobPostion = (progressBarWidth - knobElemWidth) * percentage;
        knobContainerElem.css('left', knobPostion);

        currentPlayingPosition = position;
        currentPlayingPercentage = percentage;
    }

    function drawHoverProgress(percentage) {

        const progressBarWidth = progressBarElem.width();
        const hoverPosition = progressBarWidth * percentage;

        hoverProgressElem.width(hoverPosition - currentPlayingPosition);
    }

    function drawLoadProgress(percentage) {

        const progressBarWidth = progressBarElem.width();
        const loadPosition = progressBarWidth * percentage;

        loadProgressElem.width(loadPosition);

        currentLoadedPercentage = percentage;
    }

    function drawTimeIndicator(percentage) {

        if (disabled) {
            return;
        }

        // TODO(rock): Let's think about whether we can make this part neat.
        if (ui.settingsShown) {
            timeElem.hide();
            return;
        } else {
            timeElem.show();
        }

        const duration = player.getDuration();
        const second = duration * percentage;

        const hms = naturalHms(second);

        timeElem.text(hms);

        const timeElemWidth = timeElem.outerWidth();
        const progressBarWidth = progressBarElem.width();
        const position = progressBarWidth * percentage;

        timeElem.css('left', position - timeElemWidth / 2);
    }

    function seek(percentage) {

        const duration = player.getDuration();
        const position = duration * percentage;

        player.seek(position);
    }

    function disableProgressBar() {

        disabled = true;
    }

    player.on('time', function(e) {

        const duration = e.duration;
        const position = e.position;
        const percentage = position / duration;

        positionElements(percentage);

    });

    player.on('bufferChanged', function(e) {

        const percentage = e.bufferPercent / 100;
        drawLoadProgress(percentage);
    });

    player.on('error', function(e) {

        disableProgressBar();
    });
}

export default ProgressBar;



