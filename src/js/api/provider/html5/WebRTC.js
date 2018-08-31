/**
 * Created by hoho on 2018. 6. 11..
 */
import MediaManager from "api/media/Manager";
import Provider from "api/provider/html5/Provider";
import WebRTCLoader from "api/provider/html5/WebRTCLoader";
import Promise, {resolved} from "api/shims/promise";
import {isWebRTC} from "utils/validator";
import {ERROR, STATE_ERROR, PROVIDER_WEBRTC} from "api/constants";

/**
 * @brief   webrtc provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

const WebRTC = function(container, playerConfig){

    let mediaManager = MediaManager(container, PROVIDER_WEBRTC);
    let element = mediaManager.create();

    let webrtcLoader = null;
    let that = {}, super_destroy  = "", listener = "";

    let errorHandler = function(error){
        that.setState(STATE_ERROR);
        that.pause();
        that.trigger(ERROR, error );
    };
    const onBeforeLoad = (source) => {
        if(isWebRTC(source.file, source.type)){
            OvenPlayerConsole.log("WEBRTC : onBeforeLoad : ", source);
            if(webrtcLoader){
                webrtcLoader.destroy();
                webrtcLoader = null;
            }
            webrtcLoader = WebRTCLoader(that, source.file, errorHandler);
            webrtcLoader.connect().then(function(stream){
                element.srcObject = stream;
                element.play();
            });
        }
    };

    that = Provider(PROVIDER_WEBRTC, element, playerConfig, onBeforeLoad);
    OvenPlayerConsole.log("WEBRTC PROVIDER LOADED.");
    super_destroy = that.super('destroy');

    that.destroy = () =>{
        if(webrtcLoader){
            webrtcLoader.destroy();
            webrtcLoader = null;
        }
        mediaManager.destroy();

        super_destroy();
        OvenPlayerConsole.log("WEBRTC :  PROVIDER DESTROYED.");

    };
    return that;
};


export default WebRTC;