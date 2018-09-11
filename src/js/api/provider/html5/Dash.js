/**
 * Created by hoho on 2018. 6. 14..
 */
import MediaManager from "api/media/Manager";
import Provider from "api/provider/html5/Provider";
import {PLAYER_UNKNWON_NEWWORK_ERROR, PROVIDER_DASH, CONTENT_META, ERROR, STATE_ERROR} from "api/constants";

/**
 * @brief   dashjs provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */


const Dash = function(container, playerConfig){
    const DASHERROR = {
        DOWNLOAD : "download",
        MANIFESTERROR : "manifestError"
    };
    let mediaManager = MediaManager(container, PROVIDER_DASH);
    let element = mediaManager.create();

    let dashObject = "";
    let that = {};
    let super_destroy = "", super_play = "";
    let seekPosition_sec = 0;
    let isFirstError = false;

    let errorHandler = function(error){
        that.setState(STATE_ERROR);
        that.pause();
        that.trigger(ERROR, error );
    };

    try {

        dashObject = dashjs.MediaPlayer().create();
        dashObject.getDebug().setLogToBrowserConsole(false);
        dashObject.initialize(element, null, false);
        dashObject.on(dashjs.MediaPlayer.events.ERROR, function(error){
            if(error && !isFirstError && ( error.error === DASHERROR.DOWNLOAD || error.error === DASHERROR.MANIFESTERROR )){
                isFirstError = true;
                errorHandler({code : PLAYER_UNKNWON_NEWWORK_ERROR, reason : "Unknown network error", message : "Unknown network error"});
            }
        });

        const onBeforeLoad = (source, lastPlayPosition) => {
            OvenPlayerConsole.log("DASH : onBeforeLoad : ", source, "lastPlayPosition : "+ lastPlayPosition);
            dashObject.attachSource(source.file);
            seekPosition_sec = lastPlayPosition;
        };

        that = Provider(PROVIDER_DASH, dashObject, playerConfig, onBeforeLoad);
        OvenPlayerConsole.log("DASH PROVIDER LOADED.");
        super_play = that.super('play');
        super_destroy = that.super('destroy');

        that.on(CONTENT_META, function(meta){
            if(dashObject.isDynamic()){
                super_play();
            }else{
                if(seekPosition_sec){
                    dashObject.seek(seekPosition_sec);
                    super_play();
                }
            }
        }, that);

        that.destroy = () =>{
            dashObject.reset();
            mediaManager.destroy();
            OvenPlayerConsole.log("DASH : PROVIDER DESTROYED.");

            super_destroy();
        };
    }catch(error){
        throw new Error(error);
    }

    return that;
};


export default Dash;
