/**
 * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
 * @param   {element}   container   dom element
 *
 * */
import {getBrowser} from "utils/browser";
import {PROVIDER_DASH, PROVIDER_HLS, PROVIDER_WEBRTC, PROVIDER_HTML5, PROVIDER_RTMP} from "api/constants";
import LA$ from "utils/likeA$.js";
import {getScriptPath} from 'utils/webpack';

//ToDo : Restructuring

const Manager = function(container, browserInfo){
    const that = {};
    const SWFPath = getScriptPath('ovenplayer.js')+"OvenPlayerFlash.swf";
    let rootId = container.getAttribute("data-parent-id");
    let $container = LA$(container);
    let videoElement = "";

    OvenPlayerConsole.log("MediaManager loaded. browser : ", browserInfo );

    const createHtmlVideo = function(isLoop){
        videoElement = document.createElement('video');
        videoElement.setAttribute('disableremoteplayback', '');
        videoElement.setAttribute('webkit-playsinline', 'true');
        videoElement.setAttribute('playsinline', 'true');
        if(isLoop){
            videoElement.setAttribute('loop', '');
        }
        $container.append(videoElement);

        return videoElement;
    };
    const createFlashVideo = function(isLoop){
        let movie, flashvars, allowscriptaccess, allowfullscreen, quality, name, menu, qual, bgcolor, loop;

        movie = document.createElement('param');
        movie.setAttribute('name', 'movie');
        movie.setAttribute('value', SWFPath);

        flashvars = document.createElement('param');
        flashvars.setAttribute('name', 'flashvars');
        //playerId is to use SWF for ExternalInterface.call().
        flashvars.setAttribute('value', 'playerId='+rootId);

        allowscriptaccess = document.createElement('param');
        allowscriptaccess.setAttribute('name', 'allowscriptaccess');
        allowscriptaccess.setAttribute('value', 'always');

        allowfullscreen = document.createElement('param');
        allowfullscreen.setAttribute('name', 'allowfullscreen');
        allowfullscreen.setAttribute('value', 'true');

        quality = document.createElement('param');
        quality.setAttribute('name', 'quality');
        quality.setAttribute('value', 'height');

        name = document.createElement('param');
        name.setAttribute('name', 'name');
        name.setAttribute('value', rootId+"-flash");

        menu = document.createElement('param');
        menu.setAttribute('name', 'menu');
        menu.setAttribute('value', 'false');

        qual = document.createElement('param');
        qual.setAttribute('name', 'quality');
        qual.setAttribute('value', 'high');

        bgcolor = document.createElement('param');
        bgcolor.setAttribute('name', 'bgcolor');
        bgcolor.setAttribute('value', '#000000');

        if(isLoop){
            loop = document.createElement('param');
            loop.setAttribute('name', 'loop');
            loop.setAttribute('value', 'true');
        }

        videoElement = document.createElement('object');
        videoElement.setAttribute('id', rootId+"-flash");
        videoElement.setAttribute('name', rootId+"-flash");
        videoElement.setAttribute('width', '100%');
        videoElement.setAttribute('height', '100%');
        videoElement.setAttribute('scale', 'default');

        if(browserInfo.browser === "Microsoft Internet Explorer" && browserInfo.browserMajorVersion <= 9 ){
            videoElement.setAttribute('classid', 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000');
            videoElement.appendChild(movie);
        }else{
            videoElement.setAttribute('data', SWFPath);
            videoElement.setAttribute('type', 'application/x-shockwave-flash');
        }
        if(isLoop){
            videoElement.appendChild(loop);
        }
        videoElement.appendChild(bgcolor);
        videoElement.appendChild(qual);
        videoElement.appendChild(allowfullscreen);
        videoElement.appendChild(allowscriptaccess);
        videoElement.appendChild(flashvars);

        $container.append(videoElement);

        return videoElement;
    };

    that.createMedia = (providerName , isLoop)  => {
        if(videoElement){
            that.empty();
        }

        return providerName === PROVIDER_RTMP ? createFlashVideo(isLoop) : createHtmlVideo(isLoop);
    }

    that.createAdContainer = () => {
        let adContainer = document.createElement('div');
        adContainer.setAttribute('class', 'ovp-ads');
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
        videoElement = null;
        rootId = null;
    };

    return that;
};

export default Manager;
