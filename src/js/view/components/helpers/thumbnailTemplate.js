export default (uiText, data) => {
    return (`<div class="op-thumbnail-container"><div class="op-thumbnail-wrapper">`+
        `${data.title ? `<div class="op-thumbnail-header">${data.title}</div>`:``}` +
    `</div></div>`);
};