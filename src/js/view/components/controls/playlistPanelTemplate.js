import {naturalHms} from "utils/strings"

export default (uiText, playlist) => {
    return (`<div class="op-playlist" tabindex="0">` +
                `<div class="op-playlist-header">${uiText.playlist} <i class="op-con op-close-icon btn-close"></i></div>` +
                `<div class="op-playlist-body">` +
                    `<div class="op-playlist-body-container">` +
                        `<div class="op-playlist-body-center"><div class="op-playlist-body-row"></div></div>`+
                    `</div>`+
                    `<div class="op-playlist-body-arrows">` +
                        `<i class="op-con op-arrow-left btn-left"></i><i class="op-con op-arrow-right btn-right"></i>` +
                    `</div>`+
                `</div>`+
            `</div>`);
};

export const playlistItemTemplate = (data, isActive) => {
    return (
        `<div class="op-playlist-card ${isActive? `active`:``}" data-index="${data.index}">` +
            `<div class="op-playlist-card-thumbnail ${data.image ? ``:`empty`}">${data.image ? `<img src=${data.image}>`:`<i class="op-con op-empty-video"></i>`} ${data.duration ? `<span class="op-badge">${naturalHms(data.duration)}</span>`: ``} </div>`+
            `<div class="op-playlist-card-title">${data.title}</div>`+
        `</div>`
    );
};