import $ from 'utils/jquery';
import CaptionViewerTemplate from './captionViewerTemplate';

function CaptionViewer(container, player, ui) {

    const captionViewerElem = $(CaptionViewerTemplate());
    container.append(captionViewerElem);

    const captionTextElem = captionViewerElem.find('.ovp-caption-text');

    function resetCaptionText() {

        captionTextElem.empty();
        captionTextElem.hide();
    }

    player.on('cueChanged', function(e) {

        resetCaptionText();

        if (e && e.text) {
            captionTextElem.html(e.text);
            captionTextElem.show();
        }
    });

    player.on('captionChanged', function(e) {

        resetCaptionText();
    });

    
}

export default CaptionViewer;
