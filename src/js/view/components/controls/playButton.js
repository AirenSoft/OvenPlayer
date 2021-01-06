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
        $iconReplay = "",
        $buttonBack = "",
        $buttonForward = "",
        $textBack = "",
        $textForward = "";



    function setButtonState(state){
        $iconPlay.hide();
        $iconPause.hide();
        $iconReplay.hide();
        if(state === STATE_PLAYING || state === STATE_AD_PLAYING || state === STATE_LOADING || state === STATE_STALLED){
            $iconPause.show();
        }else if(state === STATE_PAUSED || state === STATE_AD_PAUSED){
            $iconPlay.show();
        }else if(state === STATE_COMPLETE){
            $iconReplay.show();
        }else{
            $iconPlay.show();
        }
    };



    const onRendered = function($current, template){
        $iconPlay = $current.find(".op-play-button .op-play");
        $iconPause = $current.find(".op-play-button .op-pause");
        $iconReplay = $current.find(".op-play-button .op-replay");
        $buttonBack = $current.find('.op-seek-button-back');
        $buttonForward = $current.find('.op-seek-button-forward');
        $textBack = $current.find('.op-seek-back-text');
        $textForward = $current.find('.op-seek-forward-text');

        api.on(PLAYER_STATE, function(data){
            if(data && data.newstate){
                setButtonState(data.newstate);
            }
        }, template);

        if (!api.getConfig().showSeekControl) {
            $buttonBack.hide();
            $buttonForward.hide();
        }

        let seekInterval = api.getConfig().seekControlInterval;

        if (seekInterval) {

            $textBack.text(seekInterval);
            $textForward.text(seekInterval);
        } else {

            $textBack.text(10);
            $textForward.text(10);
        }
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
            } else if (currentState === STATE_LOADING || currentState === STATE_STALLED) {
                api.stop();
            } else if (currentState === STATE_PAUSED || currentState === STATE_AD_PAUSED) {
                api.play();
            } else if (currentState === STATE_ERROR) {
                api.setCurrentSource(api.getCurrentSource());
            } else if (currentState === STATE_COMPLETE) {
                if(playlist.length === (currentPlaylistIndex+1)){
                    api.seek(0);
                    api.play();
                }
            }
        },
        "click .op-seek-button-back" : function(event, $current, template) {

            let seekInterval = api.getConfig().seekControlInterval;

            if (!seekInterval) {
                seekInterval = 10;
            }

            let time = api.getPosition() - seekInterval;

            if (time < 0) {
                time = 0;
            }

            api.seek(time);
        },
        "click .op-seek-button-forward" : function(event, $current, template) {

            let seekInterval = api.getConfig().seekControlInterval;

            if (!seekInterval) {
                seekInterval = 10;
            }

            let time = api.getPosition() + seekInterval;

            if (time > api.getDuration()) {
                time = api.getDuration();
            }

            api.seek(time);
        }
    };

    return OvenTemplate($container, "PlayButton", api.getConfig(), null, events, onRendered, onDestroyed );
};

export default PlayButton;
