/**
 * Created by hoho on 2018. 6. 14..
 */
import MediaManager from "api/media/Manager";
import Provider from "api/provider/html5/Provider";
import {PROVIDER_DASH, CONTENT_META} from "api/constants";

/**
 * @brief   dashjs provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */


const Dash = function(container, playerConfig){

    let mediaManager = MediaManager(container, PROVIDER_DASH);
    let element = mediaManager.create();

    let dashObject = "";
    let that = {};
    let super_destroy = "", super_play = "";
    let seekPosition_sec = 0;



    try {

        dashObject = dashjs.MediaPlayer().create();
        dashObject.getDebug().setLogToBrowserConsole(false);
        dashObject.initialize(element, null, false);

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