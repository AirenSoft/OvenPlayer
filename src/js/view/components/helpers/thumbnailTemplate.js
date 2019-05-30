export default (data) => {
    return (`<div class="ovp-thumbnail-container"><div class="ovp-thumbnail-wrapper">`+
        `${data.image ? `<img src="${data.image}">`:``}` +
        `${data.title ? `<div class="ovp-thumbnail-header">${data.title}</div>`:``}` +
    `</div></div>`);
};