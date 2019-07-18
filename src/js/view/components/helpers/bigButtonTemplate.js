import {
    STATE_IDLE,
    STATE_PLAYING,
    STATE_STALLED,
    STATE_LOADING,
    STATE_COMPLETE,
    STATE_PAUSED,
    STATE_ERROR
} from "api/constants";


export default (uiText, playerState) => {
    return (`<div class="op-bigbutton-container ">` +
            `${playerState === STATE_PLAYING ?`<i class="op-con op-pause-big"></i>` :`` }`+
            `${playerState === STATE_PAUSED ?`<i class="op-bigbutton op-con op-play-big"></i>` :`` }`+
            `${playerState === STATE_COMPLETE ?`<i class="op-bigbutton op-con op-replay-big"></i>` :`` }`+
        `</div>`);
};