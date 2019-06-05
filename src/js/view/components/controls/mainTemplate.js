
const Controls = function(hasPlaylist){
    return (
        `<div class="ovp-controls-container">`+
            `<div class="ovp-bottom-panel">` +
                `<div class="ovp-gradient-bottom"></div>` +
                `<div class="ovp-progressbar-container"></div>` +
                `<div class="ovp-controls">` +
                    `<div class="ovp-left-controls"></div>` +
                    `<div class="ovp-right-controls">`+
                        `<div class="playlist-holder ovp-navigators">${hasPlaylist?`<button class="ovp-button ovp-playlist-button"><i class="ovp-con playlist"></i></button>`:``}</div>`+
                        `<div class="setting-holder ovp-navigators"></div>`+
                        `<div class="fullscreen-holder ovp-navigators"></div>`+
                    `</div>` +
                `</div>` +
            `</div>` +
        `</div>`);

};


export default Controls;







