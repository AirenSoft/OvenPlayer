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
            `${playerState === STATE_PLAYING ?`<i class="ovp-con pause-big"></i>` :`` }`+
            `${playerState === STATE_PAUSED ?`<i class="ovp-bigbutton ovp-con play-big"></i>` :`` }`+
            `${playerState === STATE_COMPLETE ?`<i class="ovp-bigbutton ovp-con replay-big"></i>` :`` }`+
        `</div>`);
};