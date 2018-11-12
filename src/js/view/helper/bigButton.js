/**
 * Created by hoho on 2018. 7. 24..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import {
    STATE_IDLE,
    STATE_PLAYING,
    STATE_COMPLETE,
    STATE_PAUSED
} from "api/constants";

const BigButton = function($container, api, playerState){

    const onRendered = function($container, $current, template){
        //Do nothing!
    };
    const onDestroyed = function(){
        //Do nothing!
    };
    const events = {
        "click .ovp-bigbutton-container" : function(event){
            event.preventDefault();

            const currentState = api.getState();
            if (currentState === STATE_IDLE || currentState === STATE_PAUSED || currentState === STATE_COMPLETE) {
                api.play();
            }
        }
    };

    return OvenTemplate($container, "BigButton", playerState, events, onRendered, onDestroyed );
};

export default BigButton;