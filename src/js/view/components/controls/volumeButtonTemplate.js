/**
 * Created by hoho on 2018. 7. 20..
 */
export default (uiText) => {
    return (
        `<div class="op-navigators op-volume-controller">`+
            `<button class="op-button op-volume-button">` +
                `<i class="op-con op-volume-max"></i>` +
                `<i class="op-con op-volume-small"></i>` +
                `<i class="op-con op-volume-mute"></i>` +
            `</button>` +
            `<div class="op-volume-slider-container">` +
                `<div class="op-volume-silder">` +
                    `<div class="op-volume-slider-bg"></div>` +
                    `<div class="op-volume-slider-value"></div>` +
                    `<div class="op-volume-slider-handle"></div>` +
                `</div>`+
            `</div>` +
        `</div>`
    );
};
