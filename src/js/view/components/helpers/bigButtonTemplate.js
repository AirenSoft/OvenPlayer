import {
    STATE_IDLE,
    STATE_PLAYING,
    STATE_STALLED,
    STATE_LOADING,
    STATE_COMPLETE,
    STATE_PAUSED,
    STATE_ERROR
} from "api/constants";


export default (playerState) => {
    return (`<div class="ovp-bigbutton-container ">` +
            `${playerState === STATE_PLAYING ?`<i class="ovp-con op-pause-big"></i>` :`` }`+
            `${playerState === STATE_PAUSED ?`<i class="ovp-bigbutton ovp-con op-play-big"></i>` :`` }`+
            `${playerState === STATE_COMPLETE ?`<i class="ovp-bigbutton ovp-con op-replay-big"></i>` :`` }`+
        `</div>`);
};