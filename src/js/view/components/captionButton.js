import $ from 'utils/jquery';
import CaptionButtonTemplate from './captionButtonTemplate';

function CaptionButton(container, player, ui) {

    const captionButtonElem = $(CaptionButtonTemplate());
    container.append(captionButtonElem);

    const ovpElement = ui.data('ovpElement');

    captionButtonElem.on('click', function(e) {
        player.toggleCaption();
    });

    function showCaptionButton() {

        captionButtonElem.css('display', 'inline-block');
    }

    function hideCaptionButton() {

        captionButtonElem.hide();
    }

    player.on('captionsList', function(e) {

        if (player.getCaptionsList().length > 0) {

            showCaptionButton();
        } else {

            hideCaptionButton();
        }
    });

    hideCaptionButton();
}

export default CaptionButton;