/**
 * Created by hoho on 2018. 7. 20..
 */

const ViewTemplate = function(uiText, id){
    return `<div class="ovenplayer op-wrapper" tabindex="-1" aria-label="" id="${id}">` +
        `<div class="op-ratio"></div>` +
        `<div class="op-player op-clear">`+
            `<div class="op-core-ui-wrapper op-clear">` +
                `<div class="op-media-element-container op-clear" data-parent-id="${id}"></div>` +
                `<div class="op-ui op-clear"></div>`+
            `</div>` +
        `</div>` +
        `</div>`
};
export default ViewTemplate;
