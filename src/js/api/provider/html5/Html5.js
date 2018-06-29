import CoreProvider from "api/provider/Core";

import {PROVIDER_HTML5, STATE_ERROR, ERROR} from "api/constants";

/**
 * @brief   html5 provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

const Html5 = function(element, playerConfig){

    let that = CoreProvider(PROVIDER_HTML5, element, playerConfig);

    let super_destroy  = that.super('destroy');
    OvenPlayerConsole.log("HTML5 PROVIDER LOADED.");

    that.destroy = () =>{
        super_destroy();

        OvenPlayerConsole.log("HTML5 : PROVIDER DESTROYED.");
    };

    return that;

};

export default Html5;