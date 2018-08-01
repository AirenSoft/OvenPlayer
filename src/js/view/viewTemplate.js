/**
 * Created by hoho on 2018. 7. 20..
 */

const ViewTemplate = function(id){
    return '<div class="ovenplayer ovp-wrapper" tabindex="-1" aria-label="" id="'+id+'">' +
                '<div class="ovp-ratio"></div>' +
                '<div class="ovp-player">' +
                    '<div class="ovp-media-element-container">' +
                    '</div>' +
                    '<div class="ovp-ui">' +
                    '</div>' +
                '</div>' +
            '</div>'
};
export default ViewTemplate;