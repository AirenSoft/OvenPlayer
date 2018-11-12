/**
 * Created by hoho on 2018. 8. 23..
 */
import MediaManager from "api/media/Manager";
import {STATE_IDLE, PROVIDER_RTMP} from "api/constants";
import Provider from "api/provider/flash/Provider";
/**
 * @brief   rtmp provider
 * @param   element video element.
 * @param   playerConfig    config.
 * */


const Rtmp = function(container, playerConfig){
    let that = {};
    let superDestroy_func = null;
    let mediaManager = MediaManager(container, PROVIDER_RTMP);
    let element = mediaManager.create();

    let spec = {
        name : PROVIDER_RTMP,
        extendedElement : element,
        listener : null,
        canSeek : false,
        isLive : false,
        seeking : false,
        state : STATE_IDLE,
        buffer : 0,
        currentQuality : -1,
        sources : []
    };

    that = Provider(spec, playerConfig, null);
    superDestroy_func  = that.super('destroy');

    OvenPlayerConsole.log("RTMP PROVIDER LOADED.");

    that.destroy = () =>{
        mediaManager.destroy();
        mediaManager = null;
        element = null;

        OvenPlayerConsole.log("RTMP : PROVIDER DESTROYED.");
        superDestroy_func();
    };

    return that;
};


export default Rtmp;