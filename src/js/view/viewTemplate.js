/**
 * Created by hoho on 2018. 7. 20..
 */

const ViewTemplate = function(id){
    return `<div class="ovenplayer ovp-wrapper" tabindex="-1" aria-label="" id="${id}">` +
        `<div class="ovp-ratio"></div>` +
        `<div class="ovp-player op-clear">`+
            `<div class="ovp-core-ui-wrapper op-clear">` +
                `<div class="ovp-media-element-container op-clear" data-parent-id="${id}"></div>` +
                `<div class="ovp-ui op-clear"></div>`+
            `</div>` +
        `</div>` +
        `</div>`
};
export default ViewTemplate;
