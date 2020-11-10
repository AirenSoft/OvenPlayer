export default (uiText, data) => {
    return (`<div class="op-watermark-container">` +
                `<div class="op-watermark">`+
                    `<img src="${data.waterMark.image}">` +
                `</div>` +
            `</div>`);
};