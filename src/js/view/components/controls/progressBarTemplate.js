export default () => {
    return (
        `<div class="ovp-progressbar" tabindex="0">` +
            `<div class="ovp-progressbar-padding"></div>` +
            `<div class="ovp-progress-list">` +
                `<div class="ovp-load-progress"></div>` +
                `<div class="ovp-play-progress ovp-play-background-color"></div>` +
                `<div class="ovp-hover-progress"></div>` +
            `</div>` +
            `<div class="ovp-progressbar-knob-container">` +
                `<div class="ovp-progressbar-knob ovp-play-background-color"></div>` +
            `</div>` +
            `<span class="ovp-progressbar-time">0:00</span>` +
        `</div>`
    );
};
