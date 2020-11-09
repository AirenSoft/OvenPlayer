export default (uiText) => {
    return (
        `<div class="op-navigators op-play-controller">` +
            `<button class="op-button op-play-button" type="button">` +
                `<i class="op-con op-play"></i>` +
                `<i class="op-con op-pause" style="display: none;"></i>` +
                `<i class="op-con op-replay" style="display: none;"></i>` +
            `</button>` +
            `<button class="op-button op-seek-button op-seek-button-back" type="button">` +
                `<i class="op-con op-seek-back"></i>` +
                `<span class="op-seek-back-text">10</span>` +
            `</button>` +
            `<button class="op-button op-seek-button op-seek-button-forward" type="button">` +
                `<i class="op-con op-seek-forward"></i>` +
                `<span class="op-seek-forward-text">10</span>` +
            `</button>` +
        `</div>`
    );
};
