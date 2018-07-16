import $ from 'utils/jquery';
import MessageBoxTemplate from './messageBoxTemplate';

function MessageBox(container, player, ui) {

    const messageBoxElem = $(MessageBoxTemplate());
    container.append(messageBoxElem);

    const textElem = messageBoxElem.find('.ovp-message-text');

    let autoHideTimer = null;

    function reset() {

        if (autoHideTimer != null) {

            clearTimeout(autoHideTimer);
            autoHideTimer = null;
        }

        messageBoxElem.removeClass('ovp-message-box-active');
        textElem.empty();
    }

    function showMessage(message, withTimer, time) {

        reset();
        messageBoxElem.addClass('ovp-message-box-active');
        textElem.html(message);

        let untilTime = 5000;

        if (time) {

            untilTime = time;
        }

        if (withTimer) {

            autoHideTimer = setTimeout(function() {
                
                reset();
            }, untilTime);
        }
    }

    ui.showMessage = showMessage;

    function hideMessage(untilTime) {

        if(untilTime){
            setTimeout(function(){
                reset();
            }, untilTime);
        }else{
            reset();
        }

    }

    ui.hideMessage = hideMessage;

    player.on('ready', function(e) {
        
        hideMessage();
    });

    player.on('error', function(e) {

        let message = '';

        if (e.code === 100) {

            message = 'Initialization failed.';
        } else if (e.code === 301) {

            message = 'Media playback was canceled.';
        } else if (e.code === 302) {

            message = 'Some of the media could not be downloaded due to a network error.';
        } else if (e.code === 303) {
            
            message = 'Unable to load media. This may be due to a server or network error, or due to an unsupported format.';
        } else if (e.code === 304) {
            
            message = 'Media playback has been canceled. It looks like your media is corrupted or your browser does not support the features your media uses.';
        } else if (parseInt(e.code/100) === 5) {
            
            message = 'Connection with low-latency server failed.';
        } else {

            message = 'Can not play due to unknown reasons.';
        }
        
        showMessage(message);

        player.once("metaChanged", function(){
            hideMessage(5000);
        })
    });

}

export default MessageBox;
