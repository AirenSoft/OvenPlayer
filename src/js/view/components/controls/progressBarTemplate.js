export default (uiText) => {
    return (
        `<div class="op-progressbar" tabindex="0">` +
            `<div class="op-progressbar-padding"></div>` +
            `<div class="op-progress-list">` +
                `<div class="op-load-progress"></div>` +
                `<div class="op-play-progress op-play-background-color"></div>` +
                `<div class="op-hover-progress"></div>` +
            `</div>` +
            `<div class="op-progressbar-knob-container">` +
                `<div class="op-progressbar-knob op-play-background-color"></div>` +
            `</div>` +
            `<span class="op-progressbar-time">00:00</span>` +
        `</div>`
    );
};
