export default () => {
    return (
        `<div class="ovp-context-panel">` +
        `</div>`
    );
};

export const contextItemTemplate = (text) => {
    return (
        `<div class="ovp-context-item" tabindex="0">` +
            `<span class="ovp-context-item-text">${text}</span>` +
        `</div>`
    );
};