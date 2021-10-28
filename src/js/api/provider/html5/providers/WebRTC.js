/**
 * Created by hoho on 2018. 6. 11..
 */
import Provider from "api/provider/html5/Provider";
import WebRTCLoader from "api/provider/html5/providers/WebRTCLoader";
import {isWebRTC} from "utils/validator";
import {errorTrigger} from "api/provider/utils";
import {PROVIDER_WEBRTC, STATE_IDLE, CONTENT_META, STATE_PLAYING} from "api/constants";

/**
 * @brief   webrtc provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

const WebRTC = function(element, playerConfig, adTagUrl){
    let that = {};
    let webrtcLoader = null;
    let superDestroy_func  = null;

    let audioCtx = null;

    let spec = {
        name : PROVIDER_WEBRTC,
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

    const device = () => {
        return {
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
            iOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
        }
    };

    const unlockAudio = (audioCtx) => {
        let currentDevice = device();
        let called = false;
        if (currentDevice.isMobile && audioCtx.state === 'suspended') {

            document.addEventListener('touchend', () => {
                if (!called && audioCtx.state !== 'running') {
                    audioCtx.resume();
                    called = true
                }
            })
        }
    };

    that = Provider(spec, playerConfig, function(source){
        if(isWebRTC(source.file, source.type)){
            OvenPlayerConsole.log("WEBRTC : onBeforeLoad : ", source);
            if(webrtcLoader){
                webrtcLoader.destroy();
                webrtcLoader = null;
            }

            let loadCallback = function(stream){

                if (element.srcObject) {
                    element.srcObject = null;
                }

                if (audioCtx) {
                    audioCtx.close();
                    audioCtx = null;
                }

                element.srcObject = stream;

                if (stream.getAudioTracks().length > 0) {

                    // Add some weird code to avoid the audio delay bug in Safari.
                    // We don't even know why this code solves the audio delay.
                    const AudioContext = window.AudioContext || window.webkitAudioContext;

                    // This code resolves audio delay in MacOS not IOS.
                    audioCtx = new AudioContext();
                    unlockAudio(audioCtx);


                    // This code resolves audio delay in IOS.
                    audioCtx.createMediaStreamSource(stream);
                }

            };

            webrtcLoader = WebRTCLoader(that, source.file, loadCallback, errorTrigger, playerConfig);

            webrtcLoader.connect(function(){
                //ToDo : resolve not workring
            }).catch(function(error){
                //that.destroy();
                //Do nothing
            });
        }
    });
    superDestroy_func = that.super('destroy');

    OvenPlayerConsole.log("WEBRTC PROVIDER LOADED.");


    that.destroy = () =>{
        if(webrtcLoader){
            webrtcLoader.destroy();
            element.srcObject = null;
            webrtcLoader = null;
        }

        OvenPlayerConsole.log("WEBRTC :  PROVIDER DESTROYED.");

        superDestroy_func();

    };
    return that;
};


export default WebRTC;
