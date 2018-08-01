/**
 * Created by hoho on 2018. 6. 14..
 */
import CoreProvider from "api/provider/Core";
import {PROVIDER_DASH, CONTENT_META} from "api/constants";

/**
 * @brief   dashjs provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */


const DashProvider = function(element, playerConfig){
    let dashObject = "";
    let that = {};
    let super_destroy = "", super_play = "";

    let seekPosition_sec = 0;
    try {

        dashObject = dashjs.MediaPlayer().create();
        dashObject.getDebug().setLogToBrowserConsole(false);
        dashObject.initialize(element, null, false);

        const sourceLoaded = (source, lastPlayPosition) => {
            OvenPlayerConsole.log("DASH : source loaded : ", source, "lastPlayPosition : "+ lastPlayPosition);
            dashObject.attachSource(source.file);
            seekPosition_sec = lastPlayPosition;
        };

        that = CoreProvider(PROVIDER_DASH, dashObject, playerConfig, sourceLoaded);
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

            OvenPlayerConsole.log("DASH : PROVIDER DESTROYED.");

            super_destroy();
        };
    }catch(error){
        throw new Error(error);
    }

    return that;
};


export default DashProvider;
