/**
 * Created by hoho on 2018. 8. 24..
 */
import Provider from "api/provider/html5/Provider";
import {errorTrigger} from "api/provider/utils";
import {PROVIDER_HTML5, STATE_IDLE} from "api/constants";

/**
 * @brief   html5 provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

const Html5 = function(element, playerConfig, adTagUrl){

    let spec = {
        name : PROVIDER_HTML5,
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

    let that = Provider(spec, playerConfig, null);
    let superDestroy_func  = that.super('destroy');

    OvenPlayerConsole.log("HTML5 PROVIDER LOADED.");

    that.destroy = () =>{
        OvenPlayerConsole.log("HTML5 : PROVIDER DESTROYED.");

        superDestroy_func();
    };

    return that;

};

export default Html5;
