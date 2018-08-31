/**
 * Created by hoho on 2018. 7. 26..
 */
import OvenTemplate from 'view/engine/OvenTemplate';
import LA$ from 'utils/likeA$';

const FullScreenButton = function($container, api){
    const $root = LA$("#"+api.getContainerId());
    let $iconExpand = "", $iconCompress = "", isFullScreen = false;

    let fullScreenEventTypes = {
        onfullscreenchange : "fullscreenchange",
        onmozfullscreenchange : "mozfullscreenchange",
        onwebkitfullscreenchange : "webkitfullscreenchange",
        MSFullscreenChange : "MSFullscreenChange"
    };

    let fullScreenChangedCallback = function(event){
        let checkFullScreen = function(){
            return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        };

        if (checkFullScreen()) {
            $root.addClass("ovp-fullscreen");
            isFullScreen = true;
            $iconExpand.hide();
            $iconCompress.show();
        } else {
            $root.removeClass("ovp-fullscreen");
            isFullScreen = false;
            $iconExpand.show();
            $iconCompress.hide();
        }
    };

    let requestFullScreen = function () {
        if ($root.get().requestFullscreen) {
            $root.get().requestFullscreen();
        } else if ($root.get().webkitRequestFullscreen) {
            $root.get().webkitRequestFullscreen();
        } else if ($root.get().mozRequestFullScreen) {
            $root.get().mozRequestFullScreen();
        } else if ($root.get().msRequestFullscreen) {
            $root.get().msRequestFullscreen();
        } else {
            // TODO(rock): warn not supported
        }
    };
    let exitFullScreen = function () {

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else {
            // TODO(rock): warn not supported
        }
    }
    let toggleFullScreen = function () {
        if (!isFullScreen) {
            requestFullScreen();
        } else {
            exitFullScreen();
        }
    };

    const onRendered = function($current, template){
        $iconExpand = $current.find('.ovp-fullscreen-button-expandicon');
        $iconCompress = $current.find('.ovp-fullscreen-button-compressicon');

        //Bind Global(document) Event
        Object.keys(fullScreenEventTypes).forEach(eventName => {
            //Difference between undefined and null.
            //undefined is not support. null is support but not inited.
            if(document[eventName] === null){
                document.addEventListener(fullScreenEventTypes[eventName], fullScreenChangedCallback);
            }

        });

    };
    const onDestroyed = function(){
        //Unbind Global(document) Event
        Object.keys(fullScreenEventTypes).forEach(eventName => {
            if(document[eventName] === null){
                document.removeEventListener(fullScreenEventTypes[eventName], fullScreenChangedCallback);
            }

        });
    };
    const events = {
        "click .ovp-fullscreen-button" : function(event, $current, template){
            event.preventDefault();
            toggleFullScreen();
        }
    };

    return OvenTemplate($container, "FullScreenButton", null, events, onRendered, onDestroyed );

};

export default FullScreenButton;
