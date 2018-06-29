export default () => {
    return (
        `<div class="ovp-setting-panel">` +
            `<div class="ovp-setting-title-container">` +
                
            `</div>` +
            `<div class="ovp-setting-item-container">` +
                
            `</div>` +
        `</div>`
    );
};

export const settingTitleTemplate = (title) => {
    return (
        `<div class="ovp-setting-title" tabindex="0">` +
            `<span class="ovp-setting-title-previcon">&lt;</span>` +
            `<span class="ovp-setting-title-title">${title}</span>` +
        `</div>`
    );
};

export const settingItemTemplate = (title, value) => {
    return (
        `<div class="ovp-setting-item" tabindex="0">` +
            `<span class="ovp-setting-item-title">${title}</span>` +
            `<span class="ovp-setting-item-nexticon">&gt;</span>` +
            `<span class="ovp-setting-item-value">${value}</span>` +
        `</div>`
    );
};

export const settingValueTemplate = (title) => {
    return (
        `<div class="ovp-setting-item ovp-setting-item-value" tabindex="0">` +
            `<span class="ovp-setting-item-checked">&#x2713;</span>` +
            `<span class="ovp-setting-item-title">${title}</span>` +
        `</div>`
    );
};
