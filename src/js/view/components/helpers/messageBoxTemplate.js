export default (uiText, data) => {
    return (
        `<div class="op-message-box op-clear">` +
            `<div class="op-message-container ">` +
                `<div class="op-message-text">${data.message}` +
                 `${data.description ? `<div class="op-message-description">${data.description}</div>` : `` }`+
                `</div>` +
                `${data.iconClass ? `<div class="op-message-icon"><i class="op-con ${data.iconClass}"></i></div>` : `` }`+
            `</div>` +
        `</div>`
    );
};