/**
 * Created by hoho on 2018. 7. 26..
 */
import OvenTemplate from "view/engine/OvenTemplate";
import LA$ from "utils/likeA$";
import {
    AD_CHANGED,
    STATE_AD_COMPLETE,
    STATE_AD_LOADED,
    STATE_AD_PLAYING,
    STATE_AD_PAUSED,
    PLAYER_FULLSCREEN_CHANGED,
    PLAYER_FULLSCREEN_REQUEST
} from "api/constants";



const FullScreenButton = function ($container, api) {
    const $root = LA$(api.getContainerElement());

    let $iconExpand = "", $iconCompress = "", isFullScreen = false;

    //ToDo : Template have to access Player Config.
    let config = api.getConfig();

    let browserInfo = api.getBrowser();
    let isIos = browserInfo.os === "iOS"; // && browserInfo.browser === "Safari";
    let isAndroid = browserInfo.os === "Android";
    let fullscreenChangedEventName = ""; //For IE11
    let isForceMode = false;    //This means to look like for fullscreen.

    let fullScreenEventTypes = {
        onfullscreenchange: "fullscreenchange",
        onmozfullscreenchange: "mozfullscreenchange",
        onwebkitfullscreenchange: "webkitfullscreenchange",
        MSFullscreenChange: "MSFullscreenChange"
    };


    api.toggleFullScreen = toggleFullScreen;

    function checkFullScreen() {

        let fullScreen = false;

        const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;

        if (fullScreenElement) {

            if ($root.get() === fullScreenElement) {
                fullScreen = true;
            }
        }

        return fullScreen;

    };

    function resetFullscreenButtonState() {
        OvenPlayerConsole.log("FULLSCREEN STATE : ", checkFullScreen());
        if (checkFullScreen()) {
            $root.addClass("op-fullscreen");
            isFullScreen = true;
            $iconExpand.hide();
            $iconCompress.show();

        } else {
            $root.removeClass("op-fullscreen");
            isFullScreen = false;
            $iconExpand.show();
            $iconCompress.hide();
        }
    };

    function afterFullScreenChangedCallback() {
        OvenPlayerConsole.log("afterFullScreenChangedCallback () ");
        resetFullscreenButtonState();
        api.trigger(PLAYER_FULLSCREEN_CHANGED, isFullScreen);
    };

    function forcedFakeFullscreenToggle() {
        if (!isFullScreen) {
            $root.addClass("op-fullscreen");
            isFullScreen = true;
            $iconExpand.hide();
            $iconCompress.show();
        } else {
            $root.removeClass("op-fullscreen");
            isFullScreen = false;
            $iconExpand.show();
            $iconCompress.hide();
        }
        api.trigger(PLAYER_FULLSCREEN_CHANGED, isFullScreen);
    };

    function findFullScreenChangedEventName() {
        let rootElement = $root.get();
        let eventName = "";
        //ios don;t have a fullscreenchange event. go to hell.
        //ios will checkFullScreen();

        if (rootElement.requestFullscreen) {
            eventName = fullScreenEventTypes.onfullscreenchange;
        } else if (rootElement.webkitRequestFullScreen) {
            eventName = fullScreenEventTypes.onwebkitfullscreenchange;
        } else if (rootElement.mozRequestFullScreen) {
            eventName = fullScreenEventTypes.onmozfullscreenchange;
        } else if (rootElement.msRequestFullscreen) {
            eventName = fullScreenEventTypes.MSFullscreenChange;
        } else {
            Object.keys(fullScreenEventTypes).forEach(event => {
                if (document[event]) {
                    eventName = fullScreenEventTypes[event];
                }
            });
        }
        return eventName;

        //This is original Code. IE11 doesn't follow rules. go to hell. IE11 returns "fullscreenchange". :(
        /*
         Object.keys(fullScreenEventTypes).forEach(eventName => {
            if(document[eventName]){
                console.log(eventName);
                document.addEventListener(fullScreenEventTypes[eventName], afterFullScreenChangedCallback, false);
            }
         });
         */
    };

    function requestFullScreen() {

        let promise = "";
        let rootElement = $root.get();
        let videoElements = $root.find("video") ? $root.find("video").get() : rootElement;
        let videoElement, adVideoElement = null;
        if (isIos) {
            //IOS ad makes two video elements. one is original video other is ad. i need kick ass to ios.
            if (videoElements.length > 1) {
                for (let i = 0; i < videoElements.length; i++) {
                    let videoTitle = videoElements[i].getAttribute("title");
                    if (videoTitle && videoTitle === "Advertisement") {
                        adVideoElement = videoElements[i];
                    } else {
                        videoElement = videoElements[i];
                    }
                }
            } else {
                videoElement = videoElements;
            }
            if (adVideoElement && api.getState() === STATE_AD_LOADED || api.getState() === STATE_AD_PLAYING || api.getState() === STATE_AD_PAUSED) {
                if (adVideoElement.webkitEnterFullScreen) {
                    promise = adVideoElement.webkitEnterFullScreen();
                    isFullScreen = true;
                }
            } else {
                if (videoElement.webkitEnterFullScreen) {
                    promise = videoElement.webkitEnterFullScreen();
                    isFullScreen = true;
                }
            }
        } else {
            if (rootElement.requestFullscreen) {
                var fullScreenOption = api.getConfig().fullscreenOption;
                promise = rootElement.requestFullscreen(fullScreenOption);
            } else if (rootElement.webkitRequestFullScreen) {
                promise = rootElement.webkitRequestFullScreen();
            } else if (rootElement.mozRequestFullScreen) {
                promise = rootElement.mozRequestFullScreen();
            } else if (rootElement.msRequestFullscreen) {
                promise = rootElement.msRequestFullscreen();
            } else {
                // TODO(rock): warn not supported
            }
        }

        if (promise) {

            promise.then(function () {

                isFullScreen = true;
                isForceMode = false;
                //config.setFullscreen(true);

            }).catch(function (error) {
                //This means to look like for fullscreen.
                isForceMode = true;
                forcedFakeFullscreenToggle();
            });
        }
    };
    function exitFullScreen() {

        let promise = "";

        if (document.exitFullscreen) {
            promise = document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            promise = document.webkitExitFullscreen();
        } else if (document.webkitExitFullScreen) {
            promise = document.webkitExitFullScreen();
        } else if (document.mozCancelFullScreen) {
            promise = document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            promise = document.msExitFullscreen();
        } else {
            // TODO(rock): warn not supported
        }

        if (promise) {

            promise.then(function () {

                isFullScreen = false;

            }).catch(function (error) {

            });
        }

    }
    function toggleFullScreen() {

        if (!isFullScreen || (isIos && !checkFullScreen())) {

            if (isIos && api.getConfig().iOSFakeFullScreen) {
                isForceMode = true;
                forcedFakeFullscreenToggle();
            } else {
                requestFullScreen();
            }
        } else {
            if (isForceMode) {
                forcedFakeFullscreenToggle();
            } else {
                exitFullScreen();
            }
        }
    };

    const onRendered = function ($current, template) {
        $iconExpand = $current.find(".op-fullscreen-expand");
        $iconCompress = $current.find(".op-fullscreen-compress");

        resetFullscreenButtonState();

        fullscreenChangedEventName = findFullScreenChangedEventName();
        if (fullscreenChangedEventName) {
            document.addEventListener(fullscreenChangedEventName, afterFullScreenChangedCallback, false);
        }

        api.on(AD_CHANGED, function (ad) {
            //force close for ios midroll
            let videoElements = $root.find("video") ? $root.find("video").get() : $root.get();
            let videoElement, adVideoElement = null;

            if (ad.isLinear && isIos && isFullScreen) {
                if (videoElements.length > 1) {
                    for (let i = 0; i < videoElements.length; i++) {
                        let videoTitle = videoElements[i].getAttribute("title");
                        if (videoTitle && videoTitle === "Advertisement") {
                            adVideoElement = videoElements[i];
                        } else {
                            videoElement = videoElements[i];
                        }
                    }
                } else {
                    videoElement = videoElements;
                }
                if (videoElement && videoElement.webkitExitFullscreen) {
                    videoElement.webkitExitFullscreen();
                    isFullScreen = false;
                }
            }
        }, template);
    };


    const onDestroyed = function (template) {
        if (fullscreenChangedEventName) {
            document.removeEventListener(fullscreenChangedEventName, afterFullScreenChangedCallback);
        }

        api.off(AD_CHANGED, null, template);
    };
    const events = {
        "click .op-fullscreen-button": function (event, $current, template) {
            event.preventDefault();
            api.trigger(PLAYER_FULLSCREEN_REQUEST, null);
            toggleFullScreen();
        }
    };
    return OvenTemplate($container, "FullScreenButton", api.getConfig(), null, events, onRendered, onDestroyed);

};

export default FullScreenButton;
