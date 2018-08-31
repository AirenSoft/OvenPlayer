/**
 * Created by hoho on 2018. 8. 24..
 */
import MediaManager from "api/media/Manager";
import Provider from "api/provider/html5/Provider";
import {PROVIDER_HTML5, STATE_ERROR, ERROR} from "api/constants";

/**
 * @brief   html5 provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

const Html5 = function(container, playerConfig){

    let mediaManager = MediaManager(container, PROVIDER_HTML5);
    let element = mediaManager.create();

    let that = Provider(PROVIDER_HTML5, element, playerConfig);
    let super_destroy  = that.super('destroy');

    OvenPlayerConsole.log("HTML5 PROVIDER LOADED.");

    that.destroy = () =>{
        mediaManager.destroy();
        OvenPlayerConsole.log("HTML5 : PROVIDER DESTROYED.");
        super_destroy();
    };

    return that;

};

export default Html5;
