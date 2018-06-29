import $ from 'utils/jquery';
import FullScreenButtonTemplate from './fullScreenButtonTemplate';

function FullScreenButton(container, player, ui) {

    const self = this;

    let fullScreen = false;

    const ovpElement = ui.data('ovpElement');

    const fullScreenButtonElem = $(FullScreenButtonTemplate());
    container.append(fullScreenButtonElem);

    const expandIcon = fullScreenButtonElem.find('.ovp-fullscreen-button-expandicon');
    const compressIcon = fullScreenButtonElem.find('.ovp-fullscreen-button-compressicon');

    fullScreenButtonElem.on('click', function(e) {
        
        toggleFullScreen();
    });

    function toggleFullScreen() {

        if (!fullScreen) {

            requestFullScreen();
        } else {

            exitFullScreen();
        }
    }

    ui.toggleFullScreen = toggleFullScreen;

    function requestFullScreen() {

        const elem = ovpElement[0];

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else {
            // TODO(rock): warn not supported
        }
    }

    function exitFullScreen() {

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else {
            // TODO(rock): warn not supported
        }
    }

    function bindFullscreenchange(callback) {

        if (document.onfullscreenchange === null) {
            
            $(document).on('fullscreenchange', function(e) {
                callback();
            });
        } else if (document.onmozfullscreenchange === null) {
            
            $(document).on('mozfullscreenchange', function(e) {
                callback();
            });
        } else if (document.onwebkitfullscreenchange === null) {
            
            $(document).on('webkitfullscreenchange', function(e) {
                callback();
            });
        } else if (document.MSFullscreenChange === null) {
            
            $(document).on('MSFullscreenChange', function(e) {
                callback();
            });
        } else {
            // TODO(rock): warn not supported
        }
    }

    function checkFullScreen() {

        if (document.fullscreenElement) {
            return true;
        } else if (document.webkitFullscreenElement) {
            return true;
        } else if (document.mozFullScreenElement) {
            return true;
        } else if (document.msFullscreenElement) {
            return true;
        } else {
            return false;
        }
    }

    function drawFullScreenUI() {
        ovpElement.addClass('ovp-fullscreen');
    }

    function removeFullScreenUI() {
        ovpElement.removeClass('ovp-fullscreen');
    }

    bindFullscreenchange(function(e) {
        
        if (checkFullScreen()) {

            drawFullScreenUI();
            fullScreen = true;
        } else {

            removeFullScreenUI();
            fullScreen = false;
        }
    });
}

export default FullScreenButton;