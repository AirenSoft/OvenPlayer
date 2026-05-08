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


const CaptionViewer = function($container, api, playerState){
    const $root = LA$(api.getContainerElement());

    const onRendered = function($container, $current, template){
        let isDisable = false;
        let deleteTimer = 0;

        // Convert VTTCue settings to inline style string for .op-caption-cue wrapper
        function cueToStyleStr(cue) {
            const parts = [];

            // Writing mode (vertical subtitles)
            if (cue.vertical === 'rl') { parts.push('writing-mode:vertical-rl'); }
            else if (cue.vertical === 'lr') { parts.push('writing-mode:vertical-lr'); }

            // Width from size (0–100, default 100)
            const size = (typeof cue.size === 'number') ? cue.size : 100;
            parts.push('width:' + size + '%');

            // Text alignment
            let textAlign = 'center';
            if (cue.align === 'start' || cue.align === 'left') { textAlign = 'left'; }
            else if (cue.align === 'end' || cue.align === 'right') { textAlign = 'right'; }
            parts.push('text-align:' + textAlign);

            // Horizontal position (left + translateX)
            // VTT spec: position:auto resolves based on align
            //   left/start → 0%, right/end → 100%, center → 50%
            let posLeft;
            if (cue.position !== 'auto' && typeof cue.position === 'number') {
                posLeft = cue.position;
            } else {
                posLeft = textAlign === 'left' ? 0 : textAlign === 'right' ? 100 : 50;
            }
            parts.push('left:' + posLeft + '%');
            const xOff = textAlign === 'left' ? '0%' : textAlign === 'right' ? '-100%' : '-50%';
            parts.push('transform:translateX(' + xOff + ')');

            // Vertical position — must explicitly set both top and bottom to override CSS bottom:60px
            if (cue.line !== 'auto' && typeof cue.line === 'number') {
                if (!cue.snapToLines) {
                    // Percentage mode: line% = top edge of cue from top of player (VTT spec)
                    // Text grows downward from this point.
                    parts.push('top:' + cue.line + '%');
                    parts.push('bottom:auto');
                } else {
                    // Integer line number mode (e.g. line:-1)
                    if (cue.line < 0) {
                        parts.push('top:auto');
                        parts.push('bottom:' + (Math.abs(cue.line + 1) * 8) + '%');
                    } else {
                        parts.push('top:' + (cue.line * 8) + '%');
                        parts.push('bottom:auto');
                    }
                }
            }

            return parts.join(';');
        }

        function renderCues(cues) {
            let html = '';
            cues.forEach(function(cue) {
                // A cue is "positioned" when line, position, or size is explicitly set
                // (non-default values). Positioned cues skip the default padding/bottom CSS.
                const hasLine = cue.line !== 'auto' && typeof cue.line === 'number';
                const hasPosition = cue.position !== 'auto' && typeof cue.position === 'number';
                const hasSize = typeof cue.size === 'number' && cue.size !== 100;
                const isPositioned = hasLine || hasPosition || hasSize;
                const cls = 'op-caption-cue' + (isPositioned ? ' op-caption-cue-positioned' : '');
                html += '<div class="' + cls + '" style="' + cueToStyleStr(cue) + '">' +
                        '<div class="op-caption-text">' + cue.text + '</div>' +
                        '</div>';
            });
            $container.find(".op-caption-text-container").html(html);
        }

        function clearCues() {
            $container.find(".op-caption-text-container").html('');
        }

        api.on(CONTENT_CAPTION_CHANGED, function(index) {
            if(index > -1){
                isDisable = false;
            }else{
                isDisable = true;
                clearCues();
            }
        }, template);

        api.on(CONTENT_CAPTION_CUE_CHANGED, function(data) {
            if(!isDisable && data && (data.text || (data.cues && data.cues.length))){
                let hideGap = data.endTime - data.startTime;

                if(deleteTimer){
                    clearTimeout(deleteTimer);
                }

                // Normalize: legacy data.text → single default-positioned cue
                const cues = data.cues || [{
                    text: data.text,
                    line: 'auto',
                    snapToLines: true,
                    position: 'auto',
                    size: 100,
                    align: 'center',
                    vertical: ''
                }];

                renderCues(cues);

                if(hideGap){
                    deleteTimer = setTimeout(function(){
                        clearCues();
                    }, hideGap * 1000);
                }
            }
        }, template);
    };

    const onDestroyed = function(template){
        $container.find(".op-caption-text-container").html('');
        api.off(CONTENT_CAPTION_CHANGED, null, template);
        api.off(CONTENT_CAPTION_CUE_CHANGED, null, template);
    };

    const events = {};

    return OvenTemplate($container, "CaptionViewer", api.getConfig(), playerState, events, onRendered, onDestroyed);
};

export default CaptionViewer;
