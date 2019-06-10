export default (data) => {
    return (
        `<div class="ovp-message-box">` +
            `<div class="ovp-message-container">` +
                `<div class="ovp-message-text">${data.message}` +
                 `${data.description ? `<div class="ovp-message-description">${data.description}</div>` : `` }`+
                `</div>` +
                `${data.iconClass ? `<div class="ovp-message-icon"><i class="ovp-con ${data.iconClass}"></i></div>` : `` }`+
            `</div>` +
        `</div>`
    );
};