import {naturalHms} from "utils/strings"

export default (playlist) => {
    return (`<div class="ovp-playlist" tabindex="0">` +
                `<div class="ovp-playlist-header">Playlist <i class="ovp-icon-button btn-close">&#xe800;</i></div>` +
                `<div class="ovp-playlist-body">` +
                    `<div class="ovp-playlist-body-container">` +
                        `<div class="ovp-playlist-body-center"><div class="ovp-playlist-body-row"></div></div>`+
                    `</div>`+
                    `<div class="ovp-playlist-body-arrows">` +
                        `<i class="ovp-icon-button btn-left">&#xe801;</i><i class="ovp-icon-button btn-right">&#xe802;</i>` +
                    `</div>`+
                `</div>`+
            `</div>`);
};

export const playlistItemTemplate = (data, isActive) => {
    return (
        `<div class="ovp-playlist-card ${isActive? `active`:``}" data-index="${data.index}">` +
            `<div class="ovp-playlist-card-thumbnail ${data.image ? ``:`empty`}">${data.image ? `<img src=${data.image}>`:`<i class="ovp-icon-button">&#xe804;</i>`} ${data.duration ? `<span class="ovp-badge">${naturalHms(data.duration)}</span>`: ``} </div>`+
            `<div class="ovp-playlist-card-title">${data.title}</div>`+
        `</div>`
    );
};