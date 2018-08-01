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
    return (
        '<div class="ovp-bigbutton-container ">' +      //animated bounceIn
            (playerState === STATE_PLAYING ? '<i class="ovp-bigbutton ovp-bigbutton-pause"></i>' : '') +
            (playerState === STATE_PAUSED  ? '<i class="ovp-bigbutton ovp-bigbutton-play"></i>' : '') +
            (playerState === STATE_COMPLETE ? '<i class="ovp-bigbutton ovp-bigbutton-replay"></i>' : '') +
        '</div>'
    );
};