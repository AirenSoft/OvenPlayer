
const Controls = function(hasPlaylist){
    return (
        `<div class="ovp-controls-container">`+
            `<div class="ovp-bottom-panel">` +
                `<div class="ovp-gradient-bottom"></div>` +
                `<div class="ovp-progressbar-container"></div>` +
                `<div class="ovp-controls">` +
                    `<div class="ovp-left-controls"></div>` +
                    `<div class="ovp-right-controls">`+
                        `<span class="playlist">`+
                                `${hasPlaylist?`<button class="ovp-button ovp-playlist-button"><i class="ovp-setting-button-icon"></i></button>`:``}`+
                        `</span>`+
                        `<span class="setting"></span>`+
                        `<span class="fullscreen"></span>`+
                    `</div>` +
                `</div>` +
            `</div>` +
        `</div>`);

};


export default Controls;







