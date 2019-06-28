
const Controls = function(hasPlaylist){
    return (
        `<div class="ovp-controls-container op-clear">`+
            `<div class="ovp-bottom-panel op-clear">` +
                `<div class="ovp-gradient-bottom op-clear"></div>` +
                `<div class="ovp-progressbar-container op-clear"></div>` +
                `<div class="ovp-controls op-clear">` +
                    `<div class="ovp-left-controls op-clear"></div>` +
                    `<div class="ovp-right-controls op-clear">`+
                        `<div class="playlist-holder ovp-navigators op-clear">${hasPlaylist?`<button class="ovp-button ovp-playlist-button"><i class="ovp-con op-playlist"></i></button>`:``}</div>`+
                        `<div class="setting-holder ovp-navigators op-clear"></div>`+
                        `<div class="fullscreen-holder ovp-navigators op-clear"></div>`+
                    `</div>` +
                `</div>` +
            `</div>` +
        `</div>`);

};


export default Controls;







