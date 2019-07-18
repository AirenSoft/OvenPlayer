/**
 * Created by hoho on 2018. 7. 24..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import BigButton from "view/components/helpers/bigButton";
import MessageBox from "view/components/helpers/messageBox";
import CaptionViewer from "view/components/helpers/captionViewer";
import Thumbnail from "view/components/helpers/thumbnail";
import Spinner from "view/components/helpers/spinner";
import {
    READY,
    ERROR,
    STATE_IDLE,
    STATE_PLAYING,
    STATE_STALLED,
    STATE_LOADING,
    STATE_COMPLETE,
    STATE_PAUSED,
    STATE_AD_LOADED,
    STATE_AD_PLAYING,
    STATE_AD_PAUSED,
    STATE_AD_COMPLETE,
    STATE_AD_LOADING,
    PLAYLIST_CHANGED,
    PLAYER_WARNING,
    CONTENT_MUTE,
    STATE_ERROR,
    PLAYER_STATE,
    ALL_PLAYLIST_ENDED,
    CONTENT_LEVEL_CHANGED,
    NETWORK_UNSTABLED,
    UI_ICONS
} from "api/constants";

const Helpers = function($container, api){
    let bigButton = "", messageBox = "",  captionViewer = "", spinner = "", thumbnail;
    let mutedMessage = null;
    let hasThumbnail = api.getConfig().image || api.getConfig().title;

    const onRendered = function($current, template){
        let qualityLevelChanging = false, newQualityLevel = -1;
        function createBigButton(state){
            if(bigButton){
                bigButton.destroy();
            }
            bigButton = BigButton($current, api, state);
        };
        function createMessage(message, description ,withTimer, iconClass){
            if(messageBox){
                messageBox.destroy();
            }
            messageBox = MessageBox($current, api, message, description, withTimer, iconClass);
        };
        function createThumbnail(){
            if(thumbnail){
                thumbnail.destroy();
            }
            thumbnail = Thumbnail($current, api, api.getConfig());
        };

        spinner = Spinner($current, api);

        /*if(api.getCaptionList() && api.getCaptionList().length > 0){
            captionViewer = CaptionViewer($current, api);
        }*/

        captionViewer = CaptionViewer($current, api);

        api.on(READY, function() {
            if(hasThumbnail){
                createThumbnail();  //shows when playlist changed.
            }
            createBigButton(STATE_PAUSED);
        }, template);

        //So far warning muted play is all!!
        api.on(PLAYER_WARNING, function(data) {
            if(data.message){

                if(bigButton){
                    bigButton.destroy();
                }

                if(messageBox){
                    messageBox.destroy();
                }
                mutedMessage = MessageBox($current, api, data.message, null, data.timer, data.iconClass, data.onClickCallback);

                //When the volume is turned on by an external something.
                api.once(CONTENT_MUTE, function(data){
                    if(!data.mute && mutedMessage){
                        mutedMessage.destroy();
                    }
                }, template);
            }
        }, template);

        api.on(PLAYER_STATE, function(data){
            if(data && data.newstate){

                if(data.newstate === STATE_PLAYING ||  data.newstate === STATE_AD_PLAYING){
                    bigButton.destroy();
                    if(thumbnail){
                        thumbnail.destroy();
                    }

                    if(!qualityLevelChanging){
                        spinner.show(false);
                    }
                }else{
                    createBigButton(data.newstate);
                    if(data.newstate === STATE_STALLED || data.newstate === STATE_LOADING || data.newstate === STATE_AD_LOADING){
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
            let message = "", description = "";
            if(bigButton){
                bigButton.destroy();
            }
            if (error && error.code && error.code >= 100 && error.code < 1000) {
                message = error.message;
                if(error.code === 100){
                    description = error.error.toString();
                }
            }  else {
                message = "Can not play due to unknown reasons.";
            }
            OvenPlayerConsole.log("error occured : ", error);
            createMessage(message, description, null, UI_ICONS.op_warning);
        }, template);

        api.on(NETWORK_UNSTABLED, function(event){
            let message = "Because the network connection is unstable, the following media source will be played.";

            if(api.getCurrentSource()+1 ===  api.getQualityLevels().length){
                message = "Network connection is unstable. Check the network connection.";
            }
            OvenPlayerConsole.log(message);
            //createMessage(message, null,5000);
        }, template);

        api.on(ALL_PLAYLIST_ENDED, function(){
            if(hasThumbnail){
                createThumbnail();
            }
        }, template);
    };
    const onDestroyed = function(template){
        api.off(READY, null, template);
        api.off(PLAYER_STATE, null, template);
        api.off(PLAYER_WARNING, null, template);
        api.off(ERROR, null, template);
        api.off(NETWORK_UNSTABLED, null, template);
        api.off(ALL_PLAYLIST_ENDED, null, template);
        api.off(PLAYLIST_CHANGED, null, template);
    };
    const events = {

    };

    return OvenTemplate($container, "Helpers", api.getConfig(), null, events, onRendered, onDestroyed );
};

export default Helpers;
