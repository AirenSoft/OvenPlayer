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
import {STATE_ERROR} from "../../../api/constants";

const BigButton = function($container, api, playerState){

    const onRendered = function($container, $current, template){
        //Do nothing!
    };
    const onDestroyed = function(){
        //Do nothing!
    };
    const events = {
        "click .op-bigbutton-container" : function(event){
            event.preventDefault();
            event.stopPropagation();

            const currentState = api.getState();
            let playlist = api.getPlaylist();
            let currentPlaylistIndex = api.getCurrentPlaylist();

            if (currentState === STATE_IDLE || currentState === STATE_PAUSED) {
                api.play();
            } else if (currentState === STATE_ERROR) {
                api.setCurrentSource(api.getCurrentSource());
            } else if(currentState === STATE_COMPLETE){
                if(playlist.length === (currentPlaylistIndex+1)){
                    api.seek(0);
                    api.play();
                }
            }
        }
    };

    return OvenTemplate($container, "BigButton", api.getConfig(), playerState, events, onRendered, onDestroyed );
};

export default BigButton;