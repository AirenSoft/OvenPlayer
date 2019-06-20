/**
 * Created by hoho on 2018. 7. 20..
 */
export default () => {
    return (
        `<div class="ovp-navigators ovp-volume-controller">`+
            `<button class="ovp-button ovp-volume-button">` +
                `<i class="ovp-con op-volume-max"></i>` +
                `<i class="ovp-con op-volume-small"></i>` +
                `<i class="ovp-con op-volume-mute"></i>` +
            `</button>` +
            `<div class="ovp-volume-slider-container">` +
                `<div class="ovp-volume-silder">` +
                    `<div class="ovp-volume-slider-bg"></div>` +
                    `<div class="ovp-volume-slider-value"></div>` +
                    `<div class="ovp-volume-slider-handle"></div>` +
                `</div>`+
            `</div>` +
        `</div>`
    );
};
