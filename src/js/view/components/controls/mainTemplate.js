
const Controls = function(uiText, hasPlaylist){
    return (
        `<div class="op-controls-container op-clear">`+
            `<div class="op-bottom-panel op-clear">` +
                `<div class="op-gradient-bottom op-clear"></div>` +
                `<div class="op-progressbar-container op-clear"></div>` +
                `<div class="op-controls op-clear">` +
                    `<div class="op-left-controls op-clear"></div>` +
                    `<div class="op-right-controls op-clear">`+
                        `<div class="playlist-holder op-navigators op-clear">${hasPlaylist?`<button class="op-button op-playlist-button"><i class="op-con op-playlist-icon"></i></button>`:``}</div>`+
                        `<div class="setting-holder op-navigators op-clear"></div>`+
                        `<div class="fullscreen-holder op-navigators op-clear"></div>`+
                    `</div>` +
                `</div>` +
            `</div>` +
        `</div>`);

};


export default Controls;







