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
    PLAYER_STATE,
    STATE_AD_LOADED,
    STATE_AD_PLAYING,
    STATE_AD_PAUSED,
    STATE_AD_COMPLETE,
} from "api/constants";

const PlayButton = function ($container, api) {
    let $iconPlay = "",
        $iconPause = "",
        $iconReplay = "";


    function setButtonState(state){
        $iconPlay.hide();
        $iconPause.hide();
        $iconReplay.hide();
        if(state === STATE_PLAYING || state === STATE_AD_PLAYING){
            $iconPause.show();
        }else if(state === STATE_PAUSED || state === STATE_AD_PAUSED){
            $iconPlay.show();
        }else if(state === STATE_COMPLETE){
            $iconPlay.show();
        }else{
            $iconPlay.show();
        }

    };



    const onRendered = function($current, template){
        $iconPlay = $current.find( ".op-play");
        $iconPause = $current.find(".op-pause");
        $iconReplay = $current.find(".op-replay");

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
        "click .op-play-button" : function(event, $current, template){
            event.preventDefault();
            let currentState = api.getState();
            let playlist = api.getPlaylist();
            let currentPlaylistIndex = api.getCurrentPlaylist();

            if (currentState === STATE_IDLE) {
                api.play();
            } else if (currentState === STATE_PLAYING || currentState === STATE_AD_PLAYING) {
                api.pause();
            } else if (currentState === STATE_PAUSED || currentState === STATE_AD_PAUSED) {
                api.play();
            } else if (currentState === STATE_COMPLETE) {
                if(playlist.length === (currentPlaylistIndex+1)){
                    api.setCurrentPlaylist(0);
                }
            }
        }
    };

    return OvenTemplate($container, "PlayButton", api.getConfig(), null, events, onRendered, onDestroyed );
};

export default PlayButton;
