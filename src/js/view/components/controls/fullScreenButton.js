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
    PLAYER_FULLSCREEN_CHANGED,
    PLAYER_FULLSCREEN_REQUEST
} from "api/constants";



const FullScreenButton = function($container, api){
    const $root = LA$("#"+api.getContainerId());
    let $iconExpand = "", $iconCompress = "", isFullScreen = false;
    let browserInfo = api.getBrowser();
    let isIos = browserInfo.os === "iOS"; // && browserInfo.browser === "Safari";
    let isAndroid = browserInfo.os === "Android";
    let fullscreenChagedEventName = "";

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

    let findFullScreenChangedEventName = function(){
        let rootElement =  $root.get();
        let eventName = "";

        if (rootElement.requestFullscreen) {
            eventName = fullScreenEventTypes.onfullscreenchange;
        } else if (rootElement.webkitRequestFullScreen) {
            eventName = fullScreenEventTypes.onwebkitfullscreenchange;
        } else if (rootElement.mozRequestFullScreen) {
            eventName = fullScreenEventTypes.onmozfullscreenchange;
        } else if (rootElement.msRequestFullscreen) {
            eventName = fullScreenEventTypes.MSFullscreenChange;
        }else{
            Object.keys(fullScreenEventTypes).forEach(event => {
                if(document[event]){
                    eventName = event;
                }
            });
        }
        return eventName;

        //This is original Code. IE11 doesn't follow rules. go to hell. IE11 returns "fullscreenchange". :(
        /*
         Object.keys(fullScreenEventTypes).forEach(eventName => {
         if(document[eventName]){
         console.log(eventName);
         document.addEventListener(fullScreenEventTypes[eventName], fullScreenChangedCallback, false);
         }
         });
         */
    };

    let requestFullScreen = function () {
        let promise = "";
        let rootElement =  $root.get();
        let videoElement = $root.find("video") ? $root.find("video").get() : rootElement;

        if(isIos && videoElement.length > 1){
            //IOS ad makes two video elements. one is original video other is ad.
            if(OvenPlayer.getPlayerByIndex(0).getState() === STATE_AD_LOADED || OvenPlayer.getPlayerByIndex(0).getState() === STATE_AD_PLAYING || OvenPlayer.getPlayerByIndex(0).getState() === STATE_AD_PAUSED){
                if (videoElement[1].webkitEnterFullScreen){
                    promise = videoElement[1].webkitEnterFullScreen();
                    isFullScreen = true;
                }
            }else{
                if (videoElement[0].webkitEnterFullScreen){
                    promise = videoElement[0].webkitEnterFullScreen();
                    isFullScreen = true;
                }
            }
        }else{

            //ToDo : Why occured this error?
            //TypeError: Failed to execute 'requestFullscreen' on 'Element': Illegal invocation
            /*
            let sumOfRequestFullscreen = rootElement.requestFullscreen || rootElement.webkitRequestFullScreen ||
                rootElement.mozRequestFullScreen || rootElement.msRequestFullscreen || videoElement.webkitEnterFullScreen;
            if(sumOfRequestFullscreen){
                promise = sumOfRequestFullscreen();
            }
            */

            if (rootElement.requestFullscreen) {
                promise = rootElement.requestFullscreen();
            } else if (rootElement.webkitRequestFullScreen) {
                promise = rootElement.webkitRequestFullScreen();
            }  else if (rootElement.mozRequestFullScreen) {
                promise = rootElement.mozRequestFullScreen();
            } else if (rootElement.msRequestFullscreen) {
                promise = rootElement.msRequestFullscreen();
            }  else if (videoElement.webkitEnterFullScreen){
                promise = videoElement.webkitEnterFullScreen();
            } else if (videoElement.length > 1 && videoElement[0].webkitEnterFullScreen){
                promise = videoElement[0].webkitEnterFullScreen();
            } else {
                // TODO(rock): warn not supported
            }
        }

        if(promise){
            promise.then().catch(function(error){

                //wait for User Interaction. It runs Chrome only.
                //Because "fullscreen error" occures Chrome.
                //Firefox can't runs this routine because "Element.requestFullscreen()이 짧게 실행되는 사용자 생성 이벤트 핸들러의 내부로부터 호출되지 않았기 때문에 전체화면 요청이 거부되었습니다.".

                if(error.message === "fullscreen error"){
                    setTimeout(function(){
                        requestFullScreen();
                    },500);
                }
            });
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

        fullscreenChagedEventName = findFullScreenChangedEventName();

        api.on(AD_CHANGED, function(ad){
            //force close for ios midroll
            if(ad.isLinear && isIos && isFullScreen && $root.find("video").get()[0] && $root.find("video").get()[0].webkitExitFullscreen){
                $root.find("video").get()[0].webkitExitFullscreen();
                isFullScreen = false;
            }
        }, template);
        document.addEventListener(fullscreenChagedEventName, fullScreenChangedCallback, false);
    };
    const onDestroyed = function(template){
        document.removeEventListener(fullscreenChagedEventName, fullScreenChangedCallback);
        api.off(AD_CHANGED, null, template);
    };
    const events = {
        "click .ovp-fullscreen-button" : function(event, $current, template){
            event.preventDefault();
                api.trigger(PLAYER_FULLSCREEN_REQUEST, null);
                toggleFullScreen();


        }
    };

    return OvenTemplate($container, "FullScreenButton", null, events, onRendered, onDestroyed );

};

export default FullScreenButton;
