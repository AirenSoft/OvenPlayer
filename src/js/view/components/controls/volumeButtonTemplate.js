/**
 * Created by hoho on 2018. 7. 20..
 */
export default () => {
    return (
        `<div class="ovp-volume-controller">`+
            `<button class="ovp-button ovp-volume-button">` +
                `<i class="ovp-volume-button-bigicon"></i>` +
                `<i class="ovp-volume-button-smallicon"></i>` +
                `<i class="ovp-volume-button-muteicon"></i>` +
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
