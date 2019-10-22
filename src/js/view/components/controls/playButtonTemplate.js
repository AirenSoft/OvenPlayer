export default (uiText) => {
    return (
        `<div class="op-navigators"><button class="op-button op-play-button" type="button">` +
            `<i class="op-con op-play"></i>` +
            `<i class="op-con op-pause" style="display: none;"></i>` +
            `<i class="op-con op-replay" style="display: none;"></i>` +
        `</button></div>`
    );
};
