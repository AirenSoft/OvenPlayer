import {version} from "version";
export default () => {
    return (
        `<div class="ovp-context-panel animated fadeIn">` +
            `<div class="ovp-context-item" tabindex="0">` +
                `<span class="ovp-context-item-text">Help</span>` +
            `</div>`+
            `<div class="ovp-context-item" tabindex="1">` +
                `<span class="ovp-context-item-text">About OvenPlayer ${version}</span>` +
            `</div>`+
        `</div>`
    );
};