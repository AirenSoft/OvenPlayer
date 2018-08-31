/**
 * Created by hoho on 2018. 8. 23..
 */
import MediaManager from "api/media/Manager";
import {PROVIDER_RTMP} from "api/constants";
import Provider from "api/provider/flash/Provider";

/**
 * @brief   rtmp provider
 * @param   element video element.
 * @param   playerConfig    config.
 * */


const Rtmp = function(container, playerConfig){

    let mediaManager = MediaManager(container, PROVIDER_RTMP);
    let element = mediaManager.create();

    let that = Provider(PROVIDER_RTMP, element, playerConfig);
    let super_destroy  = that.super('destroy');

    OvenPlayerConsole.log("RTMP PROVIDER LOADED.");

    that.destroy = () =>{
        mediaManager.destroy();
        OvenPlayerConsole.log("RTMP : PROVIDER DESTROYED.");
        super_destroy();
    };

    return that;
};


export default Rtmp;