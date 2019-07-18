import {version} from "version";
export default (uiText) => {
    return (
        `<div class="op-context-panel animated fadeIn">` +
            `<div class="op-context-item" tabindex="0">` +
                `<span class="op-context-item-text">Help</span>` +
            `</div>`+
            `<div class="op-context-item" tabindex="1">` +
                `<span class="op-context-item-text">${uiText.context} ${version}</span>` +
            `</div>`+
        `</div>`
    );
};