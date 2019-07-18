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
        "click .op-bigbutton-container" : function(event){
            event.preventDefault();

            const currentState = api.getState();
            let playlist = api.getPlaylist();
            let currentPlaylistIndex = api.getCurrentPlaylist();

            if (currentState === STATE_IDLE || currentState === STATE_PAUSED) {
                api.play();
            }else if(currentState === STATE_COMPLETE){
                if(playlist.length === (currentPlaylistIndex+1)){
                    api.setCurrentPlaylist(0);
                }
            }
        }
    };

    return OvenTemplate($container, "BigButton", api.getConfig(), playerState, events, onRendered, onDestroyed );
};

export default BigButton;