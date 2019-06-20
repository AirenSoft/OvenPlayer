import {naturalHms} from "utils/strings"

export default (playlist) => {
    return (`<div class="ovp-playlist" tabindex="0">` +
                `<div class="ovp-playlist-header">Playlist <i class="ovp-con op-close-icon btn-close"></i></div>` +
                `<div class="ovp-playlist-body">` +
                    `<div class="ovp-playlist-body-container">` +
                        `<div class="ovp-playlist-body-center"><div class="ovp-playlist-body-row"></div></div>`+
                    `</div>`+
                    `<div class="ovp-playlist-body-arrows">` +
                        `<i class="ovp-con op-arrow-left btn-left"></i><i class="ovp-con op-arrow-right btn-right"></i>` +
                    `</div>`+
                `</div>`+
            `</div>`);
};

export const playlistItemTemplate = (data, isActive) => {
    return (
        `<div class="ovp-playlist-card ${isActive? `active`:``}" data-index="${data.index}">` +
            `<div class="ovp-playlist-card-thumbnail ${data.image ? ``:`empty`}">${data.image ? `<img src=${data.image}>`:`<i class="ovp-con op-empty-video"></i>`} ${data.duration ? `<span class="ovp-badge">${naturalHms(data.duration)}</span>`: ``} </div>`+
            `<div class="ovp-playlist-card-title">${data.title}</div>`+
        `</div>`
    );
};