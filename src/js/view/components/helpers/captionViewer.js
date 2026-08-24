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
        let renderedHtml = '';

        // WebVTT cue text markup: tag name -> element, plus the tags that carry an
        // annotation ("<v Fred>", "<lang en>") and the character entities VTT defines.
        const CUE_TAGS = {c: 'span', i: 'i', b: 'b', u: 'u', ruby: 'ruby', rt: 'rt', v: 'span', lang: 'span'};
        const CUE_ANNOTATIONS = {v: 'title', lang: 'lang'};
        const CUE_ENTITIES = {amp: '&', lt: '<', gt: '>', lrm: '\u200e', rlm: '\u200f', nbsp: '\u00a0'};
        const CUE_TAG_RE = /^([a-zA-Z]+)((?:\.[^\s.]+)+)?(?:\s+([\s\S]*))?$/;
        const CUE_TIMESTAMP_RE = /^\d+:\d{2}(:\d{2})?\.\d{3}$/;

        function escapeHtml(text) {
            return text.replace(/[&<>"]/g, function(ch) {
                return ch === '&' ? '&amp;' : ch === '<' ? '&lt;' : ch === '>' ? '&gt;' : '&quot;';
            });
        }

        // Decode the entities WebVTT defines, then escape for HTML so cue text can
        // never inject markup of its own.
        function escapeCueText(text) {
            return escapeHtml(text.replace(/&(amp|lt|gt|lrm|rlm|nbsp);/g, function(match, name) {
                return CUE_ENTITIES[name];
            }));
        }

        // Turn WebVTT cue text markup into HTML. Known tags become elements and keep
        // their class list so they can be styled (<c.yellow>, <b.loud>, …), timestamp
        // tags are dropped, and anything that is not a tag we understand is left as
        // literal text rather than silently swallowed.
        function cueTextToHtml(text) {
            const tokenizer = /<([^>]*)>/g;
            const openTags = [];
            let html = '';
            let last = 0;
            let match;

            while ((match = tokenizer.exec(text)) !== null) {
                html += escapeCueText(text.slice(last, match.index));
                last = tokenizer.lastIndex;

                const body = match[1];

                if (body.charAt(0) === '/') {
                    const closing = body.slice(1);
                    if (openTags.length && openTags[openTags.length - 1].name === closing) {
                        html += '</' + openTags.pop().tag + '>';
                    } else {
                        html += escapeCueText(match[0]);
                    }
                    continue;
                }

                if (CUE_TIMESTAMP_RE.test(body)) {
                    continue;
                }

                const parsed = CUE_TAG_RE.exec(body);
                const tag = parsed ? CUE_TAGS[parsed[1]] : null;
                if (!tag) {
                    html += escapeCueText(match[0]);
                    continue;
                }

                let attrs = '';
                if (parsed[2]) {
                    attrs += ' class="' + escapeHtml(parsed[2].slice(1).split('.').join(' ')) + '"';
                }
                const annotation = CUE_ANNOTATIONS[parsed[1]];
                if (annotation && parsed[3]) {
                    attrs += ' ' + annotation + '="' + escapeHtml(parsed[3].trim()) + '"';
                }

                openTags.push({name: parsed[1], tag: tag});
                html += '<' + tag + attrs + '>';
            }

            html += escapeCueText(text.slice(last));
            while (openTags.length) {
                html += '</' + openTags.pop().tag + '>';
            }
            return html;
        }

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
            parts.push('align-items:' + (textAlign === 'left' ? 'flex-start' :
                textAlign === 'right' ? 'flex-end' : 'center'));

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

            // Vertical position — the cue box always spans the full player height and
            // the spacers described by these variables place the text inside it. The top
            // spacer can shrink, so a cue whose text wraps onto more lines than fit below
            // the line offset is pushed back into view instead of being clipped.
            if (cue.line !== 'auto' && typeof cue.line === 'number') {
                if (!cue.snapToLines) {
                    // Percentage mode: line% = top edge of cue from top of player (VTT spec)
                    // Text grows downward from this point.
                    parts.push('--op-cue-space-top:' + cue.line + '%');
                } else if (cue.line < 0) {
                    // Integer line number counted from the bottom (e.g. line:-1)
                    parts.push('--op-cue-space-top:100%');
                    parts.push('--op-cue-space-bottom:' + (Math.abs(cue.line + 1) * 8) + '%');
                } else {
                    parts.push('--op-cue-space-top:' + (cue.line * 8) + '%');
                }
            }

            return parts.join(';');
        }

        function renderCues(cues) {
            // Cues that resolve to the same box would be drawn on top of each other,
            // so collect them into a single box and stack their texts in cue order,
            // the way WebVTT lays out simultaneous cues.
            const boxes = [];

            cues.forEach(function(cue) {
                const style = cueToStyleStr(cue);

                let box = boxes.find(function(b) { return b.style === style; });
                if (!box) {
                    box = { style: style, texts: [] };
                    boxes.push(box);
                }
                box.texts.push(cueTextToHtml(cue.text));
            });

            const html = boxes.map(function(box) {
                return '<div class="op-caption-cue" style="' + box.style + '">' +
                    box.texts.map(function(text) {
                        return '<div class="op-caption-text">' + text + '</div>';
                    }).join('') +
                    '</div>';
            }).join('');

            setCueHtml(html);
        }

        function clearCues() {
            setCueHtml('');
        }

        // Rewriting the container with markup it already holds makes the captions
        // flash, and the cue set is re-checked far more often than it changes.
        function setCueHtml(html) {
            if (html === renderedHtml) {
                return;
            }
            renderedHtml = html;
            $container.find(".op-caption-text-container").html(html);
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
            if(isDisable || !data){
                return;
            }

            if(deleteTimer){
                clearTimeout(deleteTimer);
                deleteTimer = 0;
            }

            // A provider that sends a cue list tracks the active set itself and sends
            // an empty list once nothing should be on screen. No hide timer is wanted
            // there: it would cut a short cue off before its end time.
            if(data.cues){
                if(data.cues.length){
                    renderCues(data.cues);
                }else{
                    clearCues();
                }
                return;
            }

            if(!data.text){
                return;
            }

            // Legacy payload: a single cue with no positioning, hidden on a timer.
            renderCues([{
                text: data.text,
                line: 'auto',
                snapToLines: true,
                position: 'auto',
                size: 100,
                align: 'center',
                vertical: ''
            }]);

            const hideGap = data.endTime - data.startTime;
            if(hideGap){
                deleteTimer = setTimeout(function(){
                    clearCues();
                }, hideGap * 1000);
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
