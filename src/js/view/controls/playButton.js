/**
 * Created by hoho on 2018. 7. 24..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import {
    ERROR,
    STATE_IDLE,
    STATE_PLAYING,
    STATE_STALLED,
    STATE_LOADING,
    STATE_COMPLETE,
    STATE_PAUSED,
    STATE_ERROR,
    PLAYER_STATE
} from "api/constants";

const PlayButton = function ($container, api) {
    let $iconPlay = "",
        $iconPause = "",
        $iconReplay = "";


    let setButtonState = function(state){
        $iconPlay.hide();
        $iconPause.hide();
        $iconReplay.hide();

        if(state === STATE_PLAYING){
            $iconPause.show();
        }else if(state === STATE_PAUSED){
            $iconPlay.show();
        }else if(state === STATE_COMPLETE){
            $iconPlay.show();
        }else{
            $iconPlay.show();
        }

    };



    const onRendered = function($current, template){
        $iconPlay = $current.find( ".ovp-play-button-playicon");
        $iconPause = $current.find(".ovp-play-button-pauseicon");
        $iconReplay = $current.find(".ovp-play-button-replayicon");

        api.on(PLAYER_STATE, function(data){
            if(data && data.newstate){
                setButtonState(data.newstate);
            }
        }, template);
    };
    const onDestroyed = function(template){
        api.off(PLAYER_STATE, null, template);
    };
    const events = {
        "click .ovp-play-button" : function(event, $current, template){
            event.preventDefault();
            const currentState = api.getState();
            if (currentState === STATE_IDLE) {
                api.play();
            } else if (currentState === STATE_PLAYING) {
                api.pause();
            } else if (currentState === STATE_PAUSED) {
                api.play();
            } else if (currentState === STATE_COMPLETE) {
                api.play();
            }
        }
    };

    return OvenTemplate($container, "PlayButton", null, events, onRendered, onDestroyed );
};

export default PlayButton;
