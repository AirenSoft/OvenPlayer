/**
 * Created by hoho on 2018. 8. 23..
 */
import {STATE_IDLE, PROVIDER_RTMP} from "api/constants";
import Provider from "api/provider/flash/Provider";
/**
 * @brief   rtmp provider
 * @param   element video element.
 * @param   playerConfig    config.
 * */


const Rtmp = function(element, playerConfig, adTagUrl){
    let that = {};
    let superDestroy_func = null;

    let spec = {
        name : PROVIDER_RTMP,
        element : element,
        mse : null,
        listener : null,
        isLoaded : false,
        canSeek : false,
        isLive : false,
        seeking : false,
        state : STATE_IDLE,
        buffer : 0,
        framerate : 0,
        currentQuality : -1,
        currentSource : -1,
        qualityLevels : [],
        sources : [],
        adTagUrl : adTagUrl
    };

    that = Provider(spec, playerConfig, null);
    superDestroy_func  = that.super('destroy');

    OvenPlayerConsole.log("RTMP PROVIDER LOADED.");

    that.destroy = () =>{
        OvenPlayerConsole.log("RTMP : PROVIDER DESTROYED.");
        superDestroy_func();
    };

    return that;
};


export default Rtmp;