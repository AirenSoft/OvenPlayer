/**
 * Created by hoho on 2018. 7. 24..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import BigButton from "view/helper/bigButton";
import MessageBox from "view/helper/messageBox";
import Spinner from "view/helper/spinner";

import {
    READY,
    ERROR,
    STATE_IDLE,
    STATE_PLAYING,
    STATE_STALLED,
    STATE_LOADING,
    STATE_COMPLETE,
    STATE_PAUSED,
    STATE_ERROR,
    PLAYER_STATE,
    CONTENT_LEVEL_CHANGED,
    NETWORK_UNSTABLED
} from "api/constants";

const Helper = function($container, api){
    let bigButton = "", messageBox = "", spinner = "";



    const onRendered = function($current, template){
        let qualityLevelChanging = false, newQualityLevel = -1;
        let createBigButton = function(state){
            if(bigButton){
                bigButton.destroy();
            }
            bigButton = BigButton($current, api, state);
        };
        let createMessage = function(message, withTimer){
            if(messageBox){
                messageBox.destroy();
            }
            messageBox = MessageBox($current, api, message, withTimer);
        };
        spinner = Spinner($current, api);

        api.on(READY, function() {
            createBigButton(STATE_PAUSED);
        }, template);
        api.on(PLAYER_STATE, function(data){
            if(data && data.newstate){
                if(data.newstate === STATE_PLAYING){
                    bigButton.destroy();
                    if(!qualityLevelChanging){
                        spinner.show(false);
                    }
                }else{
                    createBigButton(data.newstate);
                    if(data.newstate === STATE_STALLED || data.newstate === STATE_LOADING ){
                        spinner.show(true);
                    }else{
                        if(!qualityLevelChanging){
                            spinner.show(false);
                        }
                    }
                }
            }
        }, template);

        //show spinner cuz dashjs spends long time for level change.
        api.on(CONTENT_LEVEL_CHANGED, function(data){
            if(data.currentQuality < 0 ){
                return false;
            }
            if(data.isAuto){
                qualityLevelChanging = false;
                spinner.show(false);
            }else{
                if(data.type === "request"){
                    newQualityLevel = data.currentQuality;
                    qualityLevelChanging = true;
                    spinner.show(true);
                }else if(data.type === "render" && newQualityLevel === data.currentQuality){
                    qualityLevelChanging = false;
                    spinner.show(false);
                    //createMessage("quality changed.", 3000);
                }
            }

         }, template);
        api.on(ERROR, function(error) {
            let message = "";
            if(bigButton){
                bigButton.destroy();
            }
            if (error.code === 100) {
                message = "Initialization failed.";
            } else if (error.code === 301) {
                message = "Media playback was canceled.";
            } else if (error.code === 302) {
                message = "Some of the media could not be downloaded due to a network error.";
            } else if (error.code === 303) {
                message = "Unable to load media. This may be due to a server or network error, or due to an unsupported format.";
            } else if (error.code === 304) {
                message = "Media playback has been canceled. It looks like your media is corrupted or your browser does not support the features your media uses.";
            } else if (parseInt(error.code/100) === 5) {
                message = "Connection with low-latency server failed.";
            } else {
                message = "Can not play due to unknown reasons.";
            }

            createMessage(message);
        }, template);

        api.on(NETWORK_UNSTABLED, function(event){
            let message = "Because the network connection is unstable, the following media source will be played.";

            if(api.getCurrentSource()+1 ===  api.getQualityLevels().length){
                message = "Network connection is unstable. Check the network connection.";
            }

            createMessage(message, 5000);
        }, template);

    };
    const onDestroyed = function(template){
        api.off(READY, null, template);
        api.off(PLAYER_STATE, null, template);
        api.off(ERROR, null, template);
        api.off(NETWORK_UNSTABLED, null, template);
    };
    const events = {

    };

    return OvenTemplate($container, "Helper", null, events, onRendered, onDestroyed );
};

export default Helper;
