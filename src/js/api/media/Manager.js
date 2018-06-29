/**
 * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
 * @param   {element}   container   dom element
 *
 * */

const Manager = function(container){
    const that = {};
    let mediaElement = "";
    OvenPlayerConsole.log("MediaManager loaded.");
    const createMediaElement = function(){

        mediaElement = document.createElement('video');
        mediaElement.setAttribute('disableRemotePlayback', '');
        mediaElement.setAttribute('webkit-playsinline', '');
        mediaElement.setAttribute('playsinline', '');
        container.appendChild(mediaElement);

        return mediaElement;
    };

    that.createElement = () =>{
        OvenPlayerConsole.log("MediaManager createElement()");
        if(!mediaElement){
            return createMediaElement();
        }else{
            container.removeChild(mediaElement);
            return createMediaElement();
        }
    };

    return that;
};

export default Manager;