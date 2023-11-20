/**
 * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
 * @param   {element}   container   dom element
 *
 * */
import {getBrowser} from "utils/browser";
import {PROVIDER_DASH, PROVIDER_HLS, PROVIDER_WEBRTC, PROVIDER_HTML5, PROVIDER_RTMP} from "api/constants";
import LA$ from "utils/likeA$.js";
import {version} from 'version';

const Manager = function(container, browserInfo){
    const that = {};
    let $container = LA$(container);
    let videoElement = "";

    OvenPlayerConsole.log("MediaManager loaded. browser : ", browserInfo );

    const createHtmlVideo = function(isLoop, isAutoStart){

        videoElement = document.createElement('video');
        videoElement.setAttribute('preload', 'auto');
        videoElement.setAttribute('disableremoteplayback', '');
        videoElement.setAttribute('webkit-playsinline', 'true');
        videoElement.setAttribute('playsinline', 'true');
        if(isLoop){
            videoElement.setAttribute('loop', '');
        }
        if(isAutoStart) {
            videoElement.setAttribute('autoplay', '');
        }
        $container.append(videoElement);

        return videoElement;
    };

    that.createMedia = (providerName , playerConfig)  => {
        // if(videoElement){
        //     // that.empty();
        //     //reuse video element.
        //     //because playlist is auto next playing.
        //     //Only same video element does not require User Interaction Error.
        //     return videoElement;
        // }else{
        //     return createHtmlVideo(playerConfig.isLoop(), playerConfig.isAutoStart());
        // }
        that.empty();
        return createHtmlVideo(playerConfig.isLoop(), playerConfig.isAutoStart());
    }

    that.createAdContainer = () => {
        let adContainer = document.createElement('div');
        adContainer.setAttribute('class', 'op-ads');
        $container.append(adContainer);

        return adContainer;
    };


    that.empty = () =>{
        OvenPlayerConsole.log("MediaManager removeElement()");
        $container.removeChild(videoElement);
        videoElement = null;
    };

    that.destroy = () =>{
        $container.removeChild();
        $container = null;
        if(videoElement!=null && videoElement!=='') {
            videoElement.srcObject = null;
        }
        videoElement = null;
    };

    return that;
};

export default Manager;
