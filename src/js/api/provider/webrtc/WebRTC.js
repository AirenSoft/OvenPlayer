/**
 * Created by hoho on 2018. 6. 11..
 */
import CoreProvider from "api/provider/Core";
import {isWebRTC} from "utils/validator";
import WebRTCLoader from "api/provider/webrtc/WebRTCLoader";
import {PROVIDER_WEBRTC, ERROR, STATE_ERROR} from "api/constants";
import Promise, {resolved} from "api/shims/promise";

/**
 * @brief   webrtc provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

const WebRTC = function(element, playerConfig){
    let webrtcLoader = null;
    let that = {}, super_destroy  = "", listener = "";

    let errorHandler = function(error){
        that.setState(STATE_ERROR);
        that.pause();
        that.trigger(ERROR, error );
    };
    const sourceLoaded = (source) => {
        if(isWebRTC(source.file, source.type)){
            OvenPlayerConsole.log("WEBRTC : source loaded : ", source);
            if(webrtcLoader){
                webrtcLoader.destroy();
                webrtcLoader = null;
            }
            webrtcLoader = WebRTCLoader(source.file, errorHandler);
            webrtcLoader.connect().then(function(stream){
                element.srcObject = stream;
                element.play();
            });
        }
    };

    that = CoreProvider(PROVIDER_WEBRTC, element, playerConfig, sourceLoaded);
    OvenPlayerConsole.log("WEBRTC PROVIDER LOADED.");
    super_destroy = that.super('destroy');



    that.destroy = () =>{

        if(webrtcLoader){
            webrtcLoader.destroy();
            webrtcLoader = null;
        }

        super_destroy();
        OvenPlayerConsole.log("WEBRTC :  PROVIDER DESTROYED.");

    };
    return that;
};


export default WebRTC;