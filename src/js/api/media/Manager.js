/**
 * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
 * @param   {element}   container   dom element
 *
 * */
import {getBrowser} from "utils/browser";
import {PROVIDER_RTMP} from "api/constants";
import SWFpath from '../../../assets/OvenPlayerFlash.swf';

const Manager = function(container, providerType, loop){
    const that = {};
    let rootId = container.getAttribute("data-parent-id");
    let mediaElement = "";
    let browserType = getBrowser();

    OvenPlayerConsole.log("MediaManager loaded. browserType : "+ browserType);
    const createMediaElement = function(){
        if(providerType !== PROVIDER_RTMP){
            mediaElement = document.createElement('video');
            mediaElement.setAttribute('disableRemotePlayback', '');
            mediaElement.setAttribute('webkit-playsinline', 'true');
            mediaElement.setAttribute('playsinline', 'true');
            if(loop){
                mediaElement.setAttribute('loop', '');
            }
            container.appendChild(mediaElement);

        }else{
            let movie, flashvars, allowscriptaccess, allowfullscreen, quality, name, menu, qual, bgcolor, loop;
            movie = document.createElement('param');
            movie.setAttribute('name', 'movie');
            movie.setAttribute('value', SWFpath);

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

            if(loop){
                loop = document.createElement('param');
                loop.setAttribute('name', 'loop');
                loop.setAttribute('value', 'true');
            }

            mediaElement = document.createElement('object');
            mediaElement.setAttribute('id', rootId+"-flash");
            mediaElement.setAttribute('name', rootId+"-flash");
            mediaElement.setAttribute('width', '100%');
            mediaElement.setAttribute('height', '100%');
            mediaElement.setAttribute('scale', 'default');

            if(browserType !== "oldIE"){
                mediaElement.setAttribute('data', SWFpath);
                mediaElement.setAttribute('type', 'application/x-shockwave-flash');
            }else{
                mediaElement.setAttribute('classid', 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000');

                mediaElement.appendChild(movie);
            }
            if(loop){
                mediaElement.appendChild(loop);
            }
            mediaElement.appendChild(bgcolor);
            mediaElement.appendChild(qual);
            mediaElement.appendChild(allowfullscreen);
            mediaElement.appendChild(allowscriptaccess);
            mediaElement.appendChild(flashvars);

            container.appendChild(mediaElement);
        }
        return mediaElement;
    };

    that.create = () =>{
        OvenPlayerConsole.log("MediaManager createElement()");
        if(mediaElement){
            that.destroy();
        }
        return createMediaElement();
    };

    that.destroy = () =>{
        OvenPlayerConsole.log("MediaManager removeElement()");
        container.removeChild(mediaElement);
        mediaElement = null;
    };

    return that;
};

export default Manager;
