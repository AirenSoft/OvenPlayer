/**
 * Created by hoho on 2018. 6. 11..
 */
import MediaManager from "api/media/Manager";
import Provider from "api/provider/html5/Provider";
import WebRTCLoader from "api/provider/html5/providers/WebRTCLoader";
import {isWebRTC} from "utils/validator";
import {errorTrigger} from "api/provider/utils";
import {PROVIDER_WEBRTC, STATE_IDLE} from "api/constants";

/**
 * @brief   webrtc provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

const WebRTC = function(container, playerConfig){
    let that = {};
    let webrtcLoader = null;
    let superDestroy_func  = null;

    let mediaManager = MediaManager(container, PROVIDER_WEBRTC);
    let element = mediaManager.create();

    let spec = {
        name : PROVIDER_WEBRTC,
        extendedElement : element,
        listener : null,
        canSeek : false,
        isLive : false,
        seeking : false,
        state : STATE_IDLE,
        buffer : 0,
        currentQuality : -1,
        currentSource : -1,
        qualityLevels : [],
        sources : []
    };

    that = Provider(spec, playerConfig, function(source){
        if(isWebRTC(source.file, source.type)){
            OvenPlayerConsole.log("WEBRTC : onBeforeLoad : ", source);
            if(webrtcLoader){
                webrtcLoader.destroy();
                webrtcLoader = null;
            }
            webrtcLoader = WebRTCLoader(that, source.file, errorTrigger);
            webrtcLoader.connect().then(function(stream){
                element.srcObject = stream;
                that.play();
            });
        }
    });
    superDestroy_func = that.super('destroy');

    OvenPlayerConsole.log("WEBRTC PROVIDER LOADED.");


    that.destroy = () =>{
        if(webrtcLoader){
            webrtcLoader.destroy();
            webrtcLoader = null;
        }
        mediaManager.destroy();
        mediaManager = null;
        element = null;
        OvenPlayerConsole.log("WEBRTC :  PROVIDER DESTROYED.");

        superDestroy_func();

    };
    return that;
};


export default WebRTC;
