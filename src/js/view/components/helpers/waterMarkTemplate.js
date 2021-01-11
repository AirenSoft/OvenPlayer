export default (uiText, data) => {
    return (`<div class="op-watermark-container">` +
                `<div class="op-watermark">`+
                    `${data.waterMark.image ? `<img src="${data.waterMark.image}">`:``}` +
                    `${data.waterMark.text ? `<span class="op-watermark-text">${data.waterMark.text}</span>`:``}` +
                `</div>` +
            `</div>`);
};