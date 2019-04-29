export default (message) => {
    return (
        `<div class="ovp-message-box animated shake">` +
            `<div class="ovp-message-container">` +
                `<div class="ovp-message-text">${message}</div>` +
                `<div class="ovp-message-button">X</div>` +
            `</div>` +
        `</div>`
    );
};