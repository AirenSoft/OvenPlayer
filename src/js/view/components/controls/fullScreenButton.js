/**
 * Created by hoho on 2018. 7. 26..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import LA$ from "utils/likeA$";
import {
    AD_CHANGED,
    STATE_AD_LOADED,
    STATE_AD_PLAYING,
    STATE_AD_PAUSED,
    PLAYER_FULLSCREEN_CHANGED
} from "api/constants";



const FullScreenButton = function($container, api){
    const $root = LA$("#"+api.getContainerId());
    let $iconExpand = "", $iconCompress = "", isFullScreen = false;
    let browserInfo = api.getBrowser();
    let isIos = browserInfo.os === "iOS"; // && browserInfo.browser === "Safari";

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


        api.trigger(PLAYER_FULLSCREEN_CHANGED, isFullScreen);
    };

    let requestFullScreen = function () {
        if(isIos && $root.find("video").get().length > 1){
            //광고 중인 상태에서 전체 화면 -> 광고 video fullscreen
            if(OvenPlayer.getPlayerByIndex(0).getState() === STATE_AD_LOADED || OvenPlayer.getPlayerByIndex(0).getState() === STATE_AD_PLAYING || OvenPlayer.getPlayerByIndex(0).getState() === STATE_AD_PAUSED){
                if ($root.find("video").get()[1].webkitEnterFullScreen){
                    $root.find("video").get()[1].webkitEnterFullScreen();
                    isFullScreen = true;
                }
            }else{
                if ($root.find("video").get()[0].webkitEnterFullScreen){
                    $root.find("video").get()[0].webkitEnterFullScreen();
                    isFullScreen = true;
                }
            }
        }else{
            if ($root.get().requestFullscreen) {
                $root.get().requestFullscreen();
            } else if ($root.get().webkitRequestFullScreen) {
                $root.get().webkitRequestFullScreen();
            }  else if ($root.get().mozRequestFullScreen) {
                $root.get().mozRequestFullScreen();
            } else if ($root.get().msRequestFullscreen) {
                $root.get().msRequestFullscreen();
            }  else if ($root.find("video").get().webkitEnterFullScreen){
                $root.find("video").get().webkitEnterFullScreen();
            } else if ($root.find("video").get().length > 1 && $root.find("video").get()[0].webkitEnterFullScreen){
                $root.find("video").get()[0].webkitEnterFullScreen();
                //getState
            } else {
                // TODO(rock): warn not supported
            }
        }


    };
    let exitFullScreen = function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.webkitExitFullScreen) {
            document.webkitExitFullScreen();
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
        $iconExpand = $current.find(".ovp-fullscreen-button-expandicon");
        $iconCompress = $current.find(".ovp-fullscreen-button-compressicon");

        api.on(AD_CHANGED, function(ad){
            //force close for ios midroll
            if(ad.isLinear && isIos && isFullScreen && $root.find("video").get()[0] && $root.find("video").get()[0].webkitExitFullscreen){
                $root.find("video").get()[0].webkitExitFullscreen();
                isFullScreen = false;
            }
        }, template);

        //Bind Global(document) Event
        Object.keys(fullScreenEventTypes).forEach(eventName => {
            //Difference between undefined and null.
            //undefined is not support. null is support but not inited.
            if(document[eventName] === null){
                document.addEventListener(fullScreenEventTypes[eventName], fullScreenChangedCallback);
            }

        });

    };
    const onDestroyed = function(template){
        //Unbind Global(document) Event
        Object.keys(fullScreenEventTypes).forEach(eventName => {
            if(document[eventName] === null){
                document.removeEventListener(fullScreenEventTypes[eventName], fullScreenChangedCallback);
            }

        });
        api.off(AD_CHANGED, null, template);
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
