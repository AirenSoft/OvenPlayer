/*! OvenPlayerv0.9.624 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac"],{

/***/ "./src/js/api/ads/ima/Ad.js":
/*!**********************************!*\
  !*** ./src/js/api/ads/ima/Ad.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Listener = __webpack_require__(/*! api/ads/ima/Listener */ "./src/js/api/ads/ima/Listener.js");

var _Listener2 = _interopRequireDefault(_Listener);

var _utils = __webpack_require__(/*! api/ads/utils */ "./src/js/api/ads/utils.js");

var _likeA$ = __webpack_require__(/*! utils/likeA$.js */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _utils2 = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Ad = function Ad(elVideo, provider, playerConfig, adTagUrl, errorCallback) {
    //Todo : move createAdContainer to MediaManager
    var AUTOPLAY_NOT_ALLOWED = "autoplayNotAllowed";
    var ADMANGER_LOADING_ERROR = "admanagerLoadingTimeout";
    var ADS_MANAGER_LOADED = "";
    var AD_ERROR = "";

    var that = {};
    var adsManagerLoaded = false;
    var adsErrorOccurred = false;
    var spec = {
        started: false, //player started
        active: false, //on Ad
        isVideoEnded: false
    };
    var OnManagerLoaded = null;
    var OnAdError = null;

    var adDisplayContainer = null;
    var adsLoader = null;
    var adsManager = null;
    var listener = null;
    var adsRequest = null;
    var autoplayAllowed = false,
        autoplayRequiresMuted = false;
    var browser = playerConfig.getBrowser();
    var isMobile = browser.os === "Android" || browser.os === "iOS";

    var adDisplayContainerInitialized = false;

    // google.ima.settings.setAutoPlayAdBreaks(false);
    //google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);

    //google.ima.settings.setLocale('ko');
    //google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
    //google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
    var sendWarningMessageForMutedPlay = function sendWarningMessageForMutedPlay() {
        provider.trigger(_constants.PLAYER_WARNING, {
            message: _constants.WARN_MSG_MUTEDPLAY,
            timer: 10 * 1000,
            iconClass: _constants.UI_ICONS.volume_mute,
            onClickCallback: function onClickCallback() {
                provider.setMute(false);
            }
        });
    };
    OvenPlayerConsole.log("IMA : started ", "isMobile : ", isMobile, adTagUrl);

    try {
        ADS_MANAGER_LOADED = google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED;
        AD_ERROR = google.ima.AdErrorEvent.Type.AD_ERROR;
        google.ima.settings.setLocale("ko");
        google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);

        var createAdContainer = function createAdContainer() {
            var adContainer = document.createElement('div');
            adContainer.setAttribute('class', 'op-ads');
            adContainer.setAttribute('id', 'op-ads');
            playerConfig.getContainer().append(adContainer);

            return adContainer;
        };
        OnAdError = function OnAdError(adErrorEvent) {
            //note : adErrorEvent.getError().getInnerError().getErrorCode() === 1205 & adErrorEvent.getError().getVastErrorCode() === 400 is Browser User Interactive error.

            //Do not triggering ERROR. becuase It just AD!

            console.log(adErrorEvent.getError().getVastErrorCode(), adErrorEvent.getError().getMessage());
            adsErrorOccurred = true;
            var innerError = adErrorEvent.getError().getInnerError();
            if (innerError) {
                console.log(innerError.getErrorCode(), innerError.getMessage());
            }
            /*if (adsManager) {
                adsManager.destroy();
            }*/
            provider.trigger(_constants.STATE_AD_ERROR, { code: adErrorEvent.getError().getVastErrorCode(), message: adErrorEvent.getError().getMessage() });
            spec.active = false;
            spec.started = true;
            provider.play();

            /*if(innerError && innerError.getErrorCode() === 1205){
             }else{
              }*/
        };
        OnManagerLoaded = function OnManagerLoaded(adsManagerLoadedEvent) {

            OvenPlayerConsole.log("IMA : OnManagerLoaded ");
            var adsRenderingSettings = new google.ima.AdsRenderingSettings();
            adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
            //adsRenderingSettings.useStyledNonLinearAds = true;
            if (adsManager) {
                OvenPlayerConsole.log("IMA : destroy adsManager----");
                listener.destroy();
                listener = null;
                adsManager.destroy();
                adsManager = null;
            }
            adsManager = adsManagerLoadedEvent.getAdsManager(elVideo, adsRenderingSettings);

            listener = (0, _Listener2["default"])(adsManager, provider, spec, OnAdError);

            OvenPlayerConsole.log("IMA : created admanager and listner ");

            adsManagerLoaded = true;
        };
        var adConatinerElment = createAdContainer();
        adDisplayContainer = new google.ima.AdDisplayContainer(adConatinerElment, elVideo);
        adsLoader = new google.ima.AdsLoader(adDisplayContainer);

        adsLoader.addEventListener(ADS_MANAGER_LOADED, OnManagerLoaded, false);
        adsLoader.addEventListener(AD_ERROR, OnAdError, false);

        OvenPlayerConsole.log("IMA : adDisplayContainer initialized");
        provider.on(_constants.CONTENT_VOLUME, function (data) {
            if (adsManager) {
                if (data.mute) {
                    adsManager.setVolume(0);
                } else {
                    adsManager.setVolume(data.volume / 100);
                }
            }
        }, that);

        var setAutoPlayToAdsRequest = function setAutoPlayToAdsRequest() {
            if (adsRequest) {
                OvenPlayerConsole.log("IMA : setADWillAutoPlay ", "autoplayAllowed", autoplayAllowed, "autoplayRequiresMuted", autoplayRequiresMuted);

                adsRequest.setAdWillAutoPlay(autoplayAllowed);
                adsRequest.setAdWillPlayMuted(autoplayRequiresMuted);
                if (autoplayRequiresMuted) {
                    sendWarningMessageForMutedPlay();
                }
            }
        };

        var initRequest = function initRequest() {
            adsManagerLoaded = false;
            OvenPlayerConsole.log("IMA : initRequest() AutoPlay Support : ", "autoplayAllowed", autoplayAllowed, "autoplayRequiresMuted", autoplayRequiresMuted);
            /*if(adsRequest){
             return false;
             }*/
            adsRequest = new google.ima.AdsRequest();

            adsRequest.forceNonLinearFullSlot = false;
            /*if(playerConfig.getBrowser().browser === "Safari" && playerConfig.getBrowser().os === "iOS" ){
             autoplayAllowed = false;
             autoplayRequiresMuted = false;
             }*/

            setAutoPlayToAdsRequest();
            adsRequest.adTagUrl = adTagUrl;

            adsLoader.requestAds(adsRequest);
            OvenPlayerConsole.log("IMA : requestAds Complete");
            //two way what ad starts.
            //adsLoader.requestAds(adsRequest); or  adsManager.start();
            //what? why?? wth??
        };

        var checkAutoplaySupport = function checkAutoplaySupport() {
            OvenPlayerConsole.log("IMA : checkAutoplaySupport() ");

            var temporarySupportCheckVideo = document.createElement('video');
            temporarySupportCheckVideo.setAttribute('playsinline', 'true');
            temporarySupportCheckVideo.src = _utils.TEMP_VIDEO_URL;
            temporarySupportCheckVideo.load();

            //Dash has already loaded when triggered provider.play() always.
            if (isMobile && provider.getName() !== _constants.PROVIDER_DASH) {
                //Main video sets user gesture when temporarySupportCheckVideo triggered checking.
                elVideo.load();
            }
            /* Different browser-specific ways to delivery UI to other elements.  My Guess. 2019-06-19
            *   (temporarySupportCheckVideo's User Interaction delivery to elVideo.)
            *   Mobile Chrome WebView :
            *   You have to run elVideo.load() when temporarySupportCheckVideo issues within 5 seconds of user interaction.
            *
            *   Mobile ios safari :
            *   You have to run elVideo.load() before temporarySupportCheckVideo run play().
            * */

            var clearAndReport = function clearAndReport(_autoplayAllowed, _autoplayRequiresMuted) {
                autoplayAllowed = _autoplayAllowed;
                autoplayRequiresMuted = _autoplayRequiresMuted;
                temporarySupportCheckVideo.pause();
                temporarySupportCheckVideo.remove();

                setAutoPlayToAdsRequest();
            };

            return new Promise(function (resolve, reject) {
                if (!temporarySupportCheckVideo.play) {
                    //I can't remember this case...
                    OvenPlayerConsole.log("IMA : !temporarySupportCheckVideo.play");
                    clearAndReport(true, false);
                    resolve();
                } else {
                    var playPromise = temporarySupportCheckVideo.play();
                    if (playPromise !== undefined) {
                        playPromise.then(function () {
                            OvenPlayerConsole.log("IMA : auto play allowed.");
                            // If we make it here, unmuted autoplay works.
                            clearAndReport(true, false);
                            resolve();
                        })["catch"](function (error) {

                            OvenPlayerConsole.log("IMA : auto play failed", error.message);
                            clearAndReport(false, false);
                            resolve();

                            //Disable Muted Play
                            /*temporarySupportCheckVideo.muted = true;
                            temporarySupportCheckVideo.volume = 0;
                            playPromise = temporarySupportCheckVideo.play();
                             playPromise.then(function () {
                                // If we make it here, muted autoplay works but unmuted autoplay does not.
                                 OvenPlayerConsole.log("ADS : muted auto play success.");
                                provider.setMute(true);
                                clearAndReport(true, true);
                                resolve();
                             }).catch(function (error) {
                                OvenPlayerConsole.log("ADS : muted auto play failed", error.message);
                                clearAndReport(false, false);
                                resolve();
                            });*/
                        });
                    } else {
                        OvenPlayerConsole.log("IMA : promise not support");
                        //Maybe this is IE11....
                        clearAndReport(true, false);
                        resolve();
                    }
                }
            });
        };

        that.isActive = function () {
            return spec.active;
        };
        that.started = function () {
            return spec.started;
        };
        that.play = function () {
            if (spec.started) {
                return new Promise(function (resolve, reject) {
                    try {
                        adsManager.resume();
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                });
            } else {
                adDisplayContainer.initialize();

                return new Promise(function (resolve, reject) {
                    var retryCount = 0;
                    var checkAdsManagerIsReady = function checkAdsManagerIsReady() {
                        retryCount++;
                        if (adsManagerLoaded) {
                            OvenPlayerConsole.log("IMA : ad start!");
                            adsManager.init("100%", "100%", google.ima.ViewMode.NORMAL);
                            adsManager.start();
                            spec.started = true;

                            resolve();
                        } else {
                            if (adsErrorOccurred) {
                                reject(new Error(ADMANGER_LOADING_ERROR));
                            } else {
                                if (retryCount < 150) {
                                    setTimeout(checkAdsManagerIsReady, 100);
                                } else {
                                    reject(new Error(ADMANGER_LOADING_ERROR));
                                }
                            }
                        }
                    };
                    checkAutoplaySupport().then(function () {
                        if (playerConfig.isAutoStart() && !autoplayAllowed) {
                            OvenPlayerConsole.log("IMA : autoplayAllowed : false");
                            spec.started = false;
                            reject(new Error(AUTOPLAY_NOT_ALLOWED));
                        } else {
                            initRequest();
                            checkAdsManagerIsReady();
                        }
                    });
                });
            }
        };
        that.pause = function () {
            adsManager.pause();
        };
        that.videoEndedCallback = function (completeContentCallback) {
            //listener.isLinearAd : get current ad's status whether linear ad or not.
            if (listener && (listener.isAllAdComplete() || !listener.isLinearAd())) {
                completeContentCallback();
            } else if (adsErrorOccurred) {
                completeContentCallback();
            } else {
                //If you need play the post-roll, you have to call to adsLoader when contents was completed.
                spec.isVideoEnded = true;
                adsLoader.contentComplete();
            }
        };

        that.destroy = function () {

            if (adsLoader) {
                adsLoader.removeEventListener(ADS_MANAGER_LOADED, OnManagerLoaded);
                adsLoader.removeEventListener(AD_ERROR, OnAdError);
            }

            if (adsManager) {
                adsManager.destroy();
            }

            if (adDisplayContainer) {
                adDisplayContainer.destroy();
            }

            if (listener) {
                listener.destroy();
            }

            var $ads = (0, _likeA$2["default"])(playerConfig.getContainer()).find(".op-ads");
            if ($ads) {
                $ads.remove();
            }

            provider.off(_constants.CONTENT_VOLUME, null, that);
        };

        return that;
    } catch (error) {
        //let tempError = ERRORS[INIT_ADS_ERROR];
        //tempError.error = error;
        //errorCallback(tempError);
        return null;
    }
}; /**
    * Created by hoho on 08/04/2019.
    */
exports["default"] = Ad;

/***/ }),

/***/ "./src/js/api/ads/ima/Listener.js":
/*!****************************************!*\
  !*** ./src/js/api/ads/ima/Listener.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var Listener = function Listener(adsManager, provider, adsSpec, OnAdError) {
    var that = {};
    var lowLevelEvents = {};

    var intervalTimer = null;

    var AD_BUFFERING = google.ima.AdEvent.Type.AD_BUFFERING;
    var CONTENT_PAUSE_REQUESTED = google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED;
    var CONTENT_RESUME_REQUESTED = google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED;
    var AD_ERROR = google.ima.AdErrorEvent.Type.AD_ERROR;
    var ALL_ADS_COMPLETED = google.ima.AdEvent.Type.ALL_ADS_COMPLETED;
    var CLICK = google.ima.AdEvent.Type.CLICK;
    var SKIPPED = google.ima.AdEvent.Type.SKIPPED;
    var COMPLETE = google.ima.AdEvent.Type.COMPLETE;
    var FIRST_QUARTILE = google.ima.AdEvent.Type.FIRST_QUARTILE;
    var LOADED = google.ima.AdEvent.Type.LOADED;
    var MIDPOINT = google.ima.AdEvent.Type.MIDPOINT;
    var PAUSED = google.ima.AdEvent.Type.PAUSED;
    var RESUMED = google.ima.AdEvent.Type.RESUMED;
    var STARTED = google.ima.AdEvent.Type.STARTED;
    var USER_CLOSE = google.ima.AdEvent.Type.USER_CLOSE;
    var THIRD_QUARTILE = google.ima.AdEvent.Type.THIRD_QUARTILE;

    var isAllAdCompelete = false; //Post roll을 위해
    var adCompleteCallback = null;
    var currentAd = null;
    OvenPlayerConsole.log("IMA : Listener Created");
    lowLevelEvents[CONTENT_PAUSE_REQUESTED] = function (adEvent) {
        OvenPlayerConsole.log("IMA LISTENER : ", adEvent.type);

        //This callls when player is playing contents for ad.
        if (adsSpec.started) {
            adsSpec.active = true;
            provider.pause();
        }
    };

    lowLevelEvents[CONTENT_RESUME_REQUESTED] = function (adEvent) {
        OvenPlayerConsole.log("IMA LISTENER : ", adEvent.type);
        //This calls when one ad ended.
        //And this is signal what play the contents.
        adsSpec.active = false;

        if (adsSpec.started && (provider.getPosition() === 0 || !adsSpec.isVideoEnded)) {
            provider.play();
        }
    };
    lowLevelEvents[AD_ERROR] = function (adEvent) {
        isAllAdCompelete = true;
        OnAdError(adEvent);
    };

    lowLevelEvents[ALL_ADS_COMPLETED] = function (adEvent) {
        OvenPlayerConsole.log("IMA LISTENER : ", adEvent.type);

        isAllAdCompelete = true;
        if (adsSpec.isVideoEnded) {
            provider.setState(_constants.STATE_COMPLETE);
        }
    };
    lowLevelEvents[CLICK] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        provider.trigger(_constants.PLAYER_CLICKED, { type: _constants.PLAYER_AD_CLICK });
    };
    lowLevelEvents[FIRST_QUARTILE] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
    };
    //
    lowLevelEvents[AD_BUFFERING] = function (adEvent) {
        OvenPlayerConsole.log("AD_BUFFERING", adEvent.type);
    };
    lowLevelEvents[LOADED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        console.log(adEvent.getAd());
        console.log(adEvent.getAdData());
        var remainingTime = adsManager.getRemainingTime();
        var ad = adEvent.getAd();
        /*var metadata = {
            duration: remainingTime,
            type :"ad"
        };*/
        provider.trigger(_constants.STATE_AD_LOADED, { remaining: remainingTime, isLinear: ad.isLinear() });
    };
    lowLevelEvents[MIDPOINT] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
    };
    lowLevelEvents[PAUSED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        provider.setState(_constants.STATE_AD_PAUSED);
    };
    lowLevelEvents[RESUMED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        provider.setState(_constants.STATE_AD_PLAYING);
    };

    lowLevelEvents[STARTED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        var ad = adEvent.getAd();
        currentAd = ad;

        var adObject = {
            isLinear: ad.isLinear(),
            duration: ad.getDuration(),
            skipTimeOffset: ad.getSkipTimeOffset() //The number of seconds of playback before the ad becomes skippable.
        };
        provider.trigger(_constants.AD_CHANGED, adObject);

        if (ad.isLinear()) {

            provider.setState(_constants.STATE_AD_PLAYING);
            adsSpec.started = true;
            // For a linear ad, a timer can be started to poll for
            // the remaining time.
            intervalTimer = setInterval(function () {
                var remainingTime = adsManager.getRemainingTime();
                var duration = ad.getDuration();

                provider.trigger(_constants.AD_TIME, {
                    duration: duration,
                    skipTimeOffset: ad.getSkipTimeOffset(),
                    remaining: remainingTime,
                    position: duration - remainingTime,
                    skippable: adsManager.getAdSkippableState()
                });
            }, 300); // every 300ms
        } else {
            provider.play();
        }
    };
    lowLevelEvents[COMPLETE] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        var ad = adEvent.getAd();
        if (ad.isLinear()) {
            clearInterval(intervalTimer);
        }
        provider.trigger(_constants.STATE_AD_COMPLETE);
    };
    //User skipped ad. same process on complete.
    lowLevelEvents[SKIPPED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);

        var ad = adEvent.getAd();
        if (ad.isLinear()) {
            clearInterval(intervalTimer);
        }
        provider.trigger(_constants.STATE_AD_COMPLETE);
    };
    lowLevelEvents[USER_CLOSE] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        var ad = adEvent.getAd();
        if (ad.isLinear()) {
            clearInterval(intervalTimer);
        }
        provider.trigger(_constants.STATE_AD_COMPLETE);
    };
    lowLevelEvents[THIRD_QUARTILE] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
    };

    Object.keys(lowLevelEvents).forEach(function (eventName) {
        adsManager.removeEventListener(eventName, lowLevelEvents[eventName]);
        adsManager.addEventListener(eventName, lowLevelEvents[eventName]);
    });
    that.setAdCompleteCallback = function (_adCompleteCallback) {
        adCompleteCallback = _adCompleteCallback;
    };
    that.isAllAdComplete = function () {
        return isAllAdCompelete;
    };
    that.isLinearAd = function () {
        return currentAd ? currentAd.isLinear() : true;
    };
    that.destroy = function () {
        OvenPlayerConsole.log("IMAEventListener : destroy()");
        //provider.trigger(STATE_AD_COMPLETE);
        Object.keys(lowLevelEvents).forEach(function (eventName) {
            adsManager.removeEventListener(eventName, lowLevelEvents[eventName]);
        });
    };
    return that;
}; /**
    * Created by hoho on 10/04/2019.
    */

exports["default"] = Listener;

/***/ }),

/***/ "./src/js/api/ads/utils.js":
/*!*********************************!*\
  !*** ./src/js/api/ads/utils.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by hoho on 27/06/2019.
 */
var TEMP_VIDEO_URL = exports.TEMP_VIDEO_URL = "data:video/mp4;base64, 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";

/***/ }),

/***/ "./src/js/api/ads/vast/Ad.js":
/*!***********************************!*\
  !*** ./src/js/api/ads/vast/Ad.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vastClient = __webpack_require__(/*! utils/vast-client */ "./src/js/utils/vast-client.js");

var _Listener = __webpack_require__(/*! api/ads/vast/Listener */ "./src/js/api/ads/vast/Listener.js");

var _Listener2 = _interopRequireDefault(_Listener);

var _utils = __webpack_require__(/*! api/ads/utils */ "./src/js/api/ads/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hoho on 25/06/2019.
 */

var Ad = function Ad(elVideo, provider, playerConfig, adTagUrl) {
    var AUTOPLAY_NOT_ALLOWED = "autoplayNotAllowed";

    var that = {};
    var spec = {
        started: false, //player started
        active: false, //on Ad
        isVideoEnded: false
    };
    var adsErrorOccurred = false;
    var listener = null;

    var container = "";
    var elAdVideo = null;
    var textView = "";
    var adButton = "";

    var autoplayAllowed = false,
        autoplayRequiresMuted = false;
    var browser = playerConfig.getBrowser();
    var isMobile = browser.os === "Android" || browser.os === "iOS";

    var createAdContainer = function createAdContainer() {
        var adContainer = document.createElement('div');
        adContainer.setAttribute('class', 'op-ads');
        adContainer.setAttribute('id', 'op-ads');
        playerConfig.getContainer().append(adContainer);

        elAdVideo = document.createElement('video');
        elAdVideo.setAttribute('playsinline', 'true');
        elAdVideo.setAttribute('title', 'Advertisement');
        elAdVideo.setAttribute('class', 'op-ads-vast-video');

        adButton = document.createElement('div');
        adButton.setAttribute('class', 'op-ads-button');

        textView = document.createElement('div');
        textView.setAttribute('class', 'op-ads-textview');

        adButton.append(textView);
        adContainer.append(elAdVideo);
        adContainer.append(adButton);

        return adContainer;
    };

    container = createAdContainer();

    var vastClient = new _vastClient.VASTClient();
    var vastTracker = null;
    var ad = null;

    var OnAdError = function OnAdError(error) {
        console.log(error);
        adsErrorOccurred = true;
        elAdVideo.style.display = "none";
        provider.trigger(_constants.STATE_AD_ERROR, { code: error.code, message: error.message });
        spec.active = false;
        spec.started = true;
        provider.play();
    };

    var initRequest = function initRequest() {
        vastClient.get(adTagUrl).then(function (res) {
            // Do something with the parsed VAST response
            OvenPlayerConsole.log("VAST : initRequest()");
            ad = res.ads[0];
            if (!ad) {
                throw { code: 401, message: "File not found. Unable to find Linear/MediaFile from URI." };
            }
            vastTracker = new _vastClient.VASTTracker(vastClient, ad, ad.creatives[0]);

            OvenPlayerConsole.log("VAST : created ad tracker.");

            listener = (0, _Listener2["default"])(elAdVideo, vastTracker, provider, spec, adButton, textView, OnAdError);

            var videoURL = "";
            if (ad.creatives && ad.creatives.length > 0 && ad.creatives[0].mediaFiles && ad.creatives[0].mediaFiles.length > 0 && ad.creatives[0].mediaFiles[0].fileURL) {
                videoURL = ad.creatives[0].mediaFiles[0].fileURL;
                OvenPlayerConsole.log("VAST : media url : ", videoURL);
            }
            elAdVideo.src = videoURL;
        })["catch"](function (error) {
            OnAdError(error);
        });
    };

    var checkAutoplaySupport = function checkAutoplaySupport() {
        OvenPlayerConsole.log("VAST : checkAutoplaySupport() ");

        var temporarySupportCheckVideo = document.createElement('video');
        temporarySupportCheckVideo.setAttribute('playsinline', 'true');
        temporarySupportCheckVideo.src = _utils.TEMP_VIDEO_URL;
        temporarySupportCheckVideo.load();

        elAdVideo.load(); //for ios User Interaction problem
        //Dash has already loaded when triggered provider.play() always.
        if (isMobile && provider.getName() !== _constants.PROVIDER_DASH) {
            //Main video sets user gesture when temporarySupportCheckVideo triggered checking.
            elVideo.load();
        }
        var clearAndReport = function clearAndReport(_autoplayAllowed, _autoplayRequiresMuted) {
            autoplayAllowed = _autoplayAllowed;
            autoplayRequiresMuted = _autoplayRequiresMuted;
            temporarySupportCheckVideo.pause();
            temporarySupportCheckVideo.remove();
        };

        return new Promise(function (resolve, reject) {
            if (!temporarySupportCheckVideo.play) {
                //I can't remember this case...
                OvenPlayerConsole.log("VAST : !temporarySupportCheckVideo.play");
                clearAndReport(true, false);
                resolve();
            } else {
                var playPromise = temporarySupportCheckVideo.play();
                if (playPromise !== undefined) {
                    playPromise.then(function () {
                        OvenPlayerConsole.log("VAST : auto play allowed.");
                        // If we make it here, unmuted autoplay works.
                        clearAndReport(true, false);
                        resolve();
                    })["catch"](function (error) {
                        OvenPlayerConsole.log("VAST : auto play failed", error.message);
                        clearAndReport(false, false);
                        resolve();
                    });
                } else {
                    OvenPlayerConsole.log("VAST : promise not support");
                    //Maybe this is IE11....
                    clearAndReport(true, false);
                    resolve();
                }
            }
        });
    };
    that.isActive = function () {
        return spec.active;
    };
    that.started = function () {
        return spec.started;
    };
    that.play = function () {
        if (spec.started) {
            return elAdVideo.play();
        } else {
            return new Promise(function (resolve, reject) {

                var checkMainContentLoaded = function checkMainContentLoaded() {

                    //wait for main contents meta loaded.
                    //have to trigger CONTENT_META first. next trigger AD_CHANGED.
                    //initControlUI first ->  init ad UI
                    //Maybe google ima waits content loaded internal.
                    if (provider.metaLoaded()) {
                        OvenPlayerConsole.log("VAST : main contents meta loaded.");
                        checkAutoplaySupport().then(function () {
                            if (playerConfig.isAutoStart() && !autoplayAllowed) {
                                OvenPlayerConsole.log("VAST : autoplayAllowed : false");
                                spec.started = false;
                                reject(new Error(AUTOPLAY_NOT_ALLOWED));
                            } else {
                                initRequest();

                                resolve();
                            }
                        });
                    } else {
                        setTimeout(checkMainContentLoaded, 100);
                    }
                };
                checkMainContentLoaded();
            });
        }
    };
    that.pause = function () {
        elAdVideo.pause();
    };

    //End Of Main Contents.
    that.videoEndedCallback = function (completeContentCallback) {

        completeContentCallback();
        //check true when main contents ended.
        spec.isVideoEnded = true;
    };
    that.destroy = function () {
        if (listener) {
            listener.destroy();
            listener = null;
        }
        vastTracker = null;
        vastClient = null;

        container.remove();
    };
    return that;
};

exports["default"] = Ad;

/***/ }),

/***/ "./src/js/api/ads/vast/Listener.js":
/*!*****************************************!*\
  !*** ./src/js/api/ads/vast/Listener.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _likeA$ = __webpack_require__(/*! utils/likeA$.js */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hoho on 26/06/2019.
 */
var Listener = function Listener(elAdVideo, vastTracker, provider, adsSpec, adButton, textView, OnAdError) {
    var lowLevelEvents = {};
    var that = {};
    var MEDIAFILE_PLAYBACK_ERROR = '405';

    var $textView = (0, _likeA$2["default"])(textView);
    var $adButton = (0, _likeA$2["default"])(adButton);
    var $elAdVideo = (0, _likeA$2["default"])(elAdVideo);

    provider.on(_constants.CONTENT_VOLUME, function (data) {
        if (data.mute) {
            elAdVideo.muted = true;
        } else {
            elAdVideo.muted = false;
            elAdVideo.volume = data.volume / 100;
        }
    }, that);

    //Like a CONTENT_RESUME_REQUESTED
    var processEndOfAd = function processEndOfAd() {
        adsSpec.active = false;

        $adButton.hide();

        if (adsSpec.started && (provider.getPosition() === 0 || !adsSpec.isVideoEnded)) {
            $elAdVideo.hide();
            provider.play();
        }
        provider.trigger(_constants.STATE_AD_COMPLETE);
    };
    //Like a CONTENT_PAUSE_REQUESTED
    var processStartOfAd = function processStartOfAd() {
        $elAdVideo.show();
        $adButton.show();
        adsSpec.active = true;
        /*if(adsSpec.started){
          provider.pause();
         }*/
    };
    var skipButtonClicked = function skipButtonClicked(event) {
        if ($textView.hasClass("videoAdUiAction")) {
            vastTracker.skip();
            elAdVideo.pause();
            processEndOfAd();
        }
    };

    textView.addEventListener("click", skipButtonClicked, false);

    lowLevelEvents.error = function () {
        OvenPlayerConsole.log("VAST : listener : error.", elAdVideo.error);
        console.log("VAST : listener : error.", elAdVideo.error);
        var error = {};
        var code = elAdVideo.error && elAdVideo.error.code || 0;

        if (code === 2) {
            error.code = 402;
            error.message = "Timeout of MediaFile URI.";
        } else if (code === 3) {
            error.code = 405;
            error.message = "Problem displaying MediaFile. Video player found a MediaFile with supported type but couldn’t display it. MediaFile may include: unsupported codecs, different MIME type than MediaFile@type, unsupported delivery method, etc.";
        } else if (code === 4) {
            error.code = 403;
            error.message = "Couldn’t find MediaFile that is supported by this video player, based on the attributes of the MediaFile element.";
        } else {
            error.code = 400;
            error.message = "General Linear error. Video player is unable to display the Linear Ad.";
        }
        vastTracker.errorWithCode(error.code);
        OnAdError(MEDIAFILE_PLAYBACK_ERROR);
    };

    lowLevelEvents.canplay = function () {};
    lowLevelEvents.ended = function () {
        vastTracker.complete();

        processEndOfAd();
    };
    lowLevelEvents.click = function (event) {
        vastTracker.click();
    };
    lowLevelEvents.play = function () {
        vastTracker.setPaused(false);
    };
    lowLevelEvents.pause = function () {
        vastTracker.setPaused(true);
    };
    lowLevelEvents.timeupdate = function (event) {
        vastTracker.setProgress(event.target.currentTime);
        provider.trigger(_constants.AD_TIME, {
            duration: elAdVideo.duration,
            position: elAdVideo.currentTime
        });
    };
    lowLevelEvents.volumechange = function (event) {
        OvenPlayerConsole.log("VAST : listener : Ad Video Volumechange.");
        vastTracker.setMuted(event.target.muted);
    };
    lowLevelEvents.loadedmetadata = function () {
        OvenPlayerConsole.log("VAST : listener : Ad CONTENT LOADED .");
        vastTracker.trackImpression();
        provider.trigger(_constants.STATE_AD_LOADED, { remaining: elAdVideo.duration, isLinear: true });
        elAdVideo.play();
    };

    vastTracker.on('skip', function () {
        // skip tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : skipped");
    });

    vastTracker.on('mute', function () {
        // mute tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : muted");
    });

    vastTracker.on('unmute', function () {
        // unmute tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : unmuted");
    });

    vastTracker.on('resume', function () {
        // resume tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : vastTracker resumed.");

        //prevent to set STATE_AD_PLAYING when first play.
        if (adsSpec.started) {
            provider.setState(_constants.STATE_AD_PLAYING);
        }
    });
    vastTracker.on('pause', function () {
        // pause tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : vastTracker paused.");
        provider.setState(_constants.STATE_AD_PAUSED);
    });

    vastTracker.on('clickthrough', function (url) {
        // Open the resolved clickThrough url
        OvenPlayerConsole.log("VAST : listener : clickthrough :", url);
        //document.location.href = url;
        window.open(url, '_blank');
    });

    vastTracker.on('skip-countdown', function (data) {
        if (data === 0) {
            $textView.html("광고 건너뛰기<i class='op-con op-arrow-right btn-right'></i>");
            $textView.addClass("videoAdUiAction");
        } else {
            $textView.html(parseInt(data) + 1 + "초 후에 이 광고를 건너뛸 수 있습니다.");
        }
    });
    vastTracker.on('rewind', function () {
        OvenPlayerConsole.log("VAST : listener : rewind");
    });

    vastTracker.on('start', function () {
        OvenPlayerConsole.log("VAST : listener : started");
        provider.trigger(_constants.AD_CHANGED, { isLinear: true });
        provider.setState(_constants.STATE_AD_PLAYING);
        adsSpec.started = true;

        processStartOfAd();
    });
    vastTracker.on('firstQuartile', function () {
        // firstQuartile tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : firstQuartile");
    });
    vastTracker.on('midpoint', function () {
        OvenPlayerConsole.log("VAST : listener : midpoint");
    });
    vastTracker.on('thirdQuartile', function () {
        OvenPlayerConsole.log("VAST : listener : thirdQuartile");
    });

    vastTracker.on('creativeView', function () {
        // impression tracking URLs have been called
        OvenPlayerConsole.log("VAST : listener : creativeView");
    });

    Object.keys(lowLevelEvents).forEach(function (eventName) {
        elAdVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        elAdVideo.addEventListener(eventName, lowLevelEvents[eventName]);
    });

    that.destroy = function () {
        OvenPlayerConsole.log("EventListener : destroy()");
        textView.removeEventListener("click", skipButtonClicked, false);
        Object.keys(lowLevelEvents).forEach(function (eventName) {
            elAdVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        });
    };
    return that;
};

exports["default"] = Listener;

/***/ }),

/***/ "./src/js/api/provider/utils.js":
/*!**************************************!*\
  !*** ./src/js/api/provider/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pickCurrentSource = exports.errorTrigger = exports.separateLive = exports.extractVideoElement = undefined;

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hoho on 2018. 11. 12..
 */
var extractVideoElement = exports.extractVideoElement = function extractVideoElement(elementOrMse) {
    if (_underscore2["default"].isElement(elementOrMse)) {
        return elementOrMse;
    }
    if (elementOrMse.getVideoElement) {
        return elementOrMse.getVideoElement();
    } else if (elementOrMse.media) {
        return elementOrMse.media;
    }
    return null;
};

var separateLive = exports.separateLive = function separateLive(mse) {
    //ToDo : You consider hlsjs. But not now because we don't support hlsjs.

    if (mse && mse.isDynamic) {
        return mse.isDynamic();
    } else {
        return false;
    }
};

var errorTrigger = exports.errorTrigger = function errorTrigger(error, provider) {
    if (provider) {
        provider.setState(_constants.STATE_ERROR);
        provider.pause();
        provider.trigger(_constants.ERROR, error);
    }
};

var pickCurrentSource = exports.pickCurrentSource = function pickCurrentSource(sources, currentSource, playerConfig) {
    var sourceIndex = Math.max(0, currentSource);
    var label = "";
    if (sources) {
        for (var i = 0; i < sources.length; i++) {
            if (sources[i]["default"]) {
                sourceIndex = i;
            }
            if (playerConfig.getSourceIndex() === i) {
                return i;
            }
            /*if (playerConfig.getSourceLabel() && sources[i].label === playerConfig.getSourceLabel() ) {
                return i;
            }*/
        }
    }
    return sourceIndex;
};

/***/ }),

/***/ "./src/js/utils/vast-client.js":
/*!*************************************!*\
  !*** ./src/js/utils/vast-client.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*Copyright (c) 2013 Olivier Poitrey <rs@dailymotion.com>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is furnished
 to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.*/
var Ad = function Ad() {
  _classCallCheck(this, Ad);

  this.id = null, this.sequence = null, this.system = null, this.title = null, this.description = null, this.advertiser = null, this.pricing = null, this.survey = null, this.errorURLTemplates = [], this.impressionURLTemplates = [], this.creatives = [], this.extensions = [];
};

var AdExtension = function AdExtension() {
  _classCallCheck(this, AdExtension);

  this.attributes = {}, this.children = [];
};

var AdExtensionChild = function AdExtensionChild() {
  _classCallCheck(this, AdExtensionChild);

  this.name = null, this.value = null, this.attributes = {};
};

var CompanionAd = function CompanionAd() {
  _classCallCheck(this, CompanionAd);

  this.id = null, this.width = 0, this.height = 0, this.type = null, this.staticResource = null, this.htmlResource = null, this.iframeResource = null, this.altText = null, this.companionClickThroughURLTemplate = null, this.companionClickTrackingURLTemplates = [], this.trackingEvents = {};
};

var Creative = function Creative() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Creative);

  this.id = e.id || null, this.adId = e.adId || null, this.sequence = e.sequence || null, this.apiFramework = e.apiFramework || null, this.trackingEvents = {};
};

var CreativeCompanion = function (_Creative) {
  _inherits(CreativeCompanion, _Creative);

  function CreativeCompanion() {
    var _this;

    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CreativeCompanion);

    (_this = _possibleConstructorReturn(this, (CreativeCompanion.__proto__ || Object.getPrototypeOf(CreativeCompanion)).call(this, e)), _this), _this.type = "companion", _this.variations = [];return _this;
  }

  return CreativeCompanion;
}(Creative);

function track(e, t) {
  resolveURLTemplates(e, t).forEach(function (e) {
    if ("undefined" != typeof window && null !== window) {
      new Image().src = e;
    }
  });
}function resolveURLTemplates(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var r = [];t.ASSETURI && (t.ASSETURI = encodeURIComponentRFC3986(t.ASSETURI)), t.CONTENTPLAYHEAD && (t.CONTENTPLAYHEAD = encodeURIComponentRFC3986(t.CONTENTPLAYHEAD)), t.ERRORCODE && !/^[0-9]{3}$/.test(t.ERRORCODE) && (t.ERRORCODE = 900), t.CACHEBUSTING = leftpad(Math.round(1e8 * Math.random()).toString()), t.TIMESTAMP = encodeURIComponentRFC3986(new Date().toISOString()), t.RANDOM = t.random = t.CACHEBUSTING;for (var i in e) {
    var s = e[i];if ("string" == typeof s) {
      for (var _e in t) {
        var _r = t[_e],
            _i = "[" + _e + "]",
            n = "%%" + _e + "%%";s = (s = s.replace(_i, _r)).replace(n, _r);
      }r.push(s);
    }
  }return r;
}function encodeURIComponentRFC3986(e) {
  return encodeURIComponent(e).replace(/[!'()*]/g, function (e) {
    return "%" + e.charCodeAt(0).toString(16);
  });
}function leftpad(e) {
  return e.length < 8 ? range(0, 8 - e.length, !1).map(function (e) {
    return "0";
  }).join("") + e : e;
}function range(e, t, r) {
  var i = [],
      s = e < t,
      n = r ? s ? t + 1 : t - 1 : t;for (var _t = e; s ? _t < n : _t > n; s ? _t++ : _t--) {
    i.push(_t);
  }return i;
}function isNumeric(e) {
  return !isNaN(parseFloat(e)) && isFinite(e);
}function flatten(e) {
  return e.reduce(function (e, t) {
    return e.concat(Array.isArray(t) ? flatten(t) : t);
  }, []);
}var util = { track: track, resolveURLTemplates: resolveURLTemplates, encodeURIComponentRFC3986: encodeURIComponentRFC3986, leftpad: leftpad, range: range, isNumeric: isNumeric, flatten: flatten };function childByName(e, t) {
  var r = e.childNodes;for (var _e2 in r) {
    var i = r[_e2];if (i.nodeName === t) return i;
  }
}function childrenByName(e, t) {
  var r = [],
      i = e.childNodes;for (var _e3 in i) {
    var s = i[_e3];s.nodeName === t && r.push(s);
  }return r;
}function resolveVastAdTagURI(e, t) {
  if (!t) return e;if (0 === e.indexOf("//")) {
    var _location = location,
        _t2 = _location.protocol;
    return "" + _t2 + e;
  }if (-1 === e.indexOf("://")) {
    return t.slice(0, t.lastIndexOf("/")) + "/" + e;
  }return e;
}function parseBoolean(e) {
  return -1 !== ["true", "TRUE", "1"].indexOf(e);
}function parseNodeText(e) {
  return e && (e.textContent || e.text || "").trim();
}function copyNodeAttribute(e, t, r) {
  var i = t.getAttribute(e);i && r.setAttribute(e, i);
}function parseDuration(e) {
  if (null == e) return -1;if (util.isNumeric(e)) return parseInt(e);var t = e.split(":");if (3 !== t.length) return -1;var r = t[2].split(".");var i = parseInt(r[0]);2 === r.length && (i += parseFloat("0." + r[1]));var s = parseInt(60 * t[1]),
      n = parseInt(60 * t[0] * 60);return isNaN(n) || isNaN(s) || isNaN(i) || s > 3600 || i > 60 ? -1 : n + s + i;
}function splitVAST(e) {
  var t = [];var r = null;return e.forEach(function (i, s) {
    if (i.sequence && (i.sequence = parseInt(i.sequence, 10)), i.sequence > 1) {
      var _t3 = e[s - 1];if (_t3 && _t3.sequence === i.sequence - 1) return void (r && r.push(i));delete i.sequence;
    }r = [i], t.push(r);
  }), t;
}function mergeWrapperAdData(e, t) {
  e.errorURLTemplates = t.errorURLTemplates.concat(e.errorURLTemplates), e.impressionURLTemplates = t.impressionURLTemplates.concat(e.impressionURLTemplates), e.extensions = t.extensions.concat(e.extensions), e.creatives.forEach(function (e) {
    if (t.trackingEvents && t.trackingEvents[e.type]) for (var r in t.trackingEvents[e.type]) {
      var i = t.trackingEvents[e.type][r];e.trackingEvents[r] || (e.trackingEvents[r] = []), e.trackingEvents[r] = e.trackingEvents[r].concat(i);
    }
  }), t.videoClickTrackingURLTemplates && t.videoClickTrackingURLTemplates.length && e.creatives.forEach(function (e) {
    "linear" === e.type && (e.videoClickTrackingURLTemplates = e.videoClickTrackingURLTemplates.concat(t.videoClickTrackingURLTemplates));
  }), t.videoCustomClickURLTemplates && t.videoCustomClickURLTemplates.length && e.creatives.forEach(function (e) {
    "linear" === e.type && (e.videoCustomClickURLTemplates = e.videoCustomClickURLTemplates.concat(t.videoCustomClickURLTemplates));
  }), t.videoClickThroughURLTemplate && e.creatives.forEach(function (e) {
    "linear" === e.type && null == e.videoClickThroughURLTemplate && (e.videoClickThroughURLTemplate = t.videoClickThroughURLTemplate);
  });
}var parserUtils = { childByName: childByName, childrenByName: childrenByName, resolveVastAdTagURI: resolveVastAdTagURI, parseBoolean: parseBoolean, parseNodeText: parseNodeText, copyNodeAttribute: copyNodeAttribute, parseDuration: parseDuration, splitVAST: splitVAST, mergeWrapperAdData: mergeWrapperAdData };function parseCreativeCompanion(e, t) {
  var r = new CreativeCompanion(t);return parserUtils.childrenByName(e, "Companion").forEach(function (e) {
    var t = new CompanionAd();t.id = e.getAttribute("id") || null, t.width = e.getAttribute("width"), t.height = e.getAttribute("height"), t.companionClickTrackingURLTemplates = [], parserUtils.childrenByName(e, "HTMLResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || "text/html", t.htmlResource = parserUtils.parseNodeText(e);
    }), parserUtils.childrenByName(e, "IFrameResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || 0, t.iframeResource = parserUtils.parseNodeText(e);
    }), parserUtils.childrenByName(e, "StaticResource").forEach(function (r) {
      t.type = r.getAttribute("creativeType") || 0, parserUtils.childrenByName(e, "AltText").forEach(function (e) {
        t.altText = parserUtils.parseNodeText(e);
      }), t.staticResource = parserUtils.parseNodeText(r);
    }), parserUtils.childrenByName(e, "TrackingEvents").forEach(function (e) {
      parserUtils.childrenByName(e, "Tracking").forEach(function (e) {
        var r = e.getAttribute("event"),
            i = parserUtils.parseNodeText(e);r && i && (null == t.trackingEvents[r] && (t.trackingEvents[r] = []), t.trackingEvents[r].push(i));
      });
    }), parserUtils.childrenByName(e, "CompanionClickTracking").forEach(function (e) {
      t.companionClickTrackingURLTemplates.push(parserUtils.parseNodeText(e));
    }), t.companionClickThroughURLTemplate = parserUtils.parseNodeText(parserUtils.childByName(e, "CompanionClickThrough")), t.companionClickTrackingURLTemplate = parserUtils.parseNodeText(parserUtils.childByName(e, "CompanionClickTracking")), r.variations.push(t);
  }), r;
}
var CreativeLinear = function (_Creative2) {
  _inherits(CreativeLinear, _Creative2);

  function CreativeLinear() {
    var _this2;

    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CreativeLinear);

    (_this2 = _possibleConstructorReturn(this, (CreativeLinear.__proto__ || Object.getPrototypeOf(CreativeLinear)).call(this, e)), _this2), _this2.type = "linear", _this2.duration = 0, _this2.skipDelay = null, _this2.mediaFiles = [], _this2.videoClickThroughURLTemplate = null, _this2.videoClickTrackingURLTemplates = [], _this2.videoCustomClickURLTemplates = [], _this2.adParameters = null, _this2.icons = [];return _this2;
  }

  return CreativeLinear;
}(Creative);

var Icon = function Icon() {
  _classCallCheck(this, Icon);

  this.program = null, this.height = 0, this.width = 0, this.xPosition = 0, this.yPosition = 0, this.apiFramework = null, this.offset = null, this.duration = 0, this.type = null, this.staticResource = null, this.htmlResource = null, this.iframeResource = null, this.iconClickThroughURLTemplate = null, this.iconClickTrackingURLTemplates = [], this.iconViewTrackingURLTemplate = null;
};

var MediaFile = function MediaFile() {
  _classCallCheck(this, MediaFile);

  this.id = null, this.fileURL = null, this.deliveryType = "progressive", this.mimeType = null, this.codec = null, this.bitrate = 0, this.minBitrate = 0, this.maxBitrate = 0, this.width = 0, this.height = 0, this.apiFramework = null, this.scalable = null, this.maintainAspectRatio = null;
};

function parseCreativeLinear(e, t) {
  var r = void 0;var i = new CreativeLinear(t);i.duration = parserUtils.parseDuration(parserUtils.parseNodeText(parserUtils.childByName(e, "Duration")));var s = e.getAttribute("skipoffset");if (null == s) i.skipDelay = null;else if ("%" === s.charAt(s.length - 1) && -1 !== i.duration) {
    var _e4 = parseInt(s, 10);i.skipDelay = i.duration * (_e4 / 100);
  } else i.skipDelay = parserUtils.parseDuration(s);var n = parserUtils.childByName(e, "VideoClicks");n && (i.videoClickThroughURLTemplate = parserUtils.parseNodeText(parserUtils.childByName(n, "ClickThrough")), parserUtils.childrenByName(n, "ClickTracking").forEach(function (e) {
    i.videoClickTrackingURLTemplates.push(parserUtils.parseNodeText(e));
  }), parserUtils.childrenByName(n, "CustomClick").forEach(function (e) {
    i.videoCustomClickURLTemplates.push(parserUtils.parseNodeText(e));
  }));var a = parserUtils.childByName(e, "AdParameters");a && (i.adParameters = parserUtils.parseNodeText(a)), parserUtils.childrenByName(e, "TrackingEvents").forEach(function (e) {
    parserUtils.childrenByName(e, "Tracking").forEach(function (e) {
      var t = e.getAttribute("event");var s = parserUtils.parseNodeText(e);if (t && s) {
        if ("progress" === t) {
          if (!(r = e.getAttribute("offset"))) return;t = "%" === r.charAt(r.length - 1) ? "progress-" + r : "progress-" + Math.round(parserUtils.parseDuration(r));
        }null == i.trackingEvents[t] && (i.trackingEvents[t] = []), i.trackingEvents[t].push(s);
      }
    });
  }), parserUtils.childrenByName(e, "MediaFiles").forEach(function (e) {
    parserUtils.childrenByName(e, "MediaFile").forEach(function (e) {
      var t = new MediaFile();t.id = e.getAttribute("id"), t.fileURL = parserUtils.parseNodeText(e), t.deliveryType = e.getAttribute("delivery"), t.codec = e.getAttribute("codec"), t.mimeType = e.getAttribute("type"), t.apiFramework = e.getAttribute("apiFramework"), t.bitrate = parseInt(e.getAttribute("bitrate") || 0), t.minBitrate = parseInt(e.getAttribute("minBitrate") || 0), t.maxBitrate = parseInt(e.getAttribute("maxBitrate") || 0), t.width = parseInt(e.getAttribute("width") || 0), t.height = parseInt(e.getAttribute("height") || 0);var r = e.getAttribute("scalable");r && "string" == typeof r && ("true" === (r = r.toLowerCase()) ? t.scalable = !0 : "false" === r && (t.scalable = !1));var s = e.getAttribute("maintainAspectRatio");s && "string" == typeof s && ("true" === (s = s.toLowerCase()) ? t.maintainAspectRatio = !0 : "false" === s && (t.maintainAspectRatio = !1)), i.mediaFiles.push(t);
    });
  });var o = parserUtils.childByName(e, "Icons");return o && parserUtils.childrenByName(o, "Icon").forEach(function (e) {
    var t = new Icon();t.program = e.getAttribute("program"), t.height = parseInt(e.getAttribute("height") || 0), t.width = parseInt(e.getAttribute("width") || 0), t.xPosition = parseXPosition(e.getAttribute("xPosition")), t.yPosition = parseYPosition(e.getAttribute("yPosition")), t.apiFramework = e.getAttribute("apiFramework"), t.offset = parserUtils.parseDuration(e.getAttribute("offset")), t.duration = parserUtils.parseDuration(e.getAttribute("duration")), parserUtils.childrenByName(e, "HTMLResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || "text/html", t.htmlResource = parserUtils.parseNodeText(e);
    }), parserUtils.childrenByName(e, "IFrameResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || 0, t.iframeResource = parserUtils.parseNodeText(e);
    }), parserUtils.childrenByName(e, "StaticResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || 0, t.staticResource = parserUtils.parseNodeText(e);
    });var r = parserUtils.childByName(e, "IconClicks");r && (t.iconClickThroughURLTemplate = parserUtils.parseNodeText(parserUtils.childByName(r, "IconClickThrough")), parserUtils.childrenByName(r, "IconClickTracking").forEach(function (e) {
      t.iconClickTrackingURLTemplates.push(parserUtils.parseNodeText(e));
    })), t.iconViewTrackingURLTemplate = parserUtils.parseNodeText(parserUtils.childByName(e, "IconViewTracking")), i.icons.push(t);
  }), i;
}function parseXPosition(e) {
  return -1 !== ["left", "right"].indexOf(e) ? e : parseInt(e || 0);
}function parseYPosition(e) {
  return -1 !== ["top", "bottom"].indexOf(e) ? e : parseInt(e || 0);
}
var CreativeNonLinear = function (_Creative3) {
  _inherits(CreativeNonLinear, _Creative3);

  function CreativeNonLinear() {
    var _this3;

    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CreativeNonLinear);

    (_this3 = _possibleConstructorReturn(this, (CreativeNonLinear.__proto__ || Object.getPrototypeOf(CreativeNonLinear)).call(this, e)), _this3), _this3.type = "nonlinear", _this3.variations = [];return _this3;
  }

  return CreativeNonLinear;
}(Creative);

var NonLinearAd = function NonLinearAd() {
  _classCallCheck(this, NonLinearAd);

  this.id = null, this.width = 0, this.height = 0, this.expandedWidth = 0, this.expandedHeight = 0, this.scalable = !0, this.maintainAspectRatio = !0, this.minSuggestedDuration = 0, this.apiFramework = "static", this.type = null, this.staticResource = null, this.htmlResource = null, this.iframeResource = null, this.nonlinearClickThroughURLTemplate = null, this.nonlinearClickTrackingURLTemplates = [], this.adParameters = null;
};

function parseCreativeNonLinear(e, t) {
  var r = new CreativeNonLinear(t);return parserUtils.childrenByName(e, "TrackingEvents").forEach(function (e) {
    var t = void 0,
        i = void 0;parserUtils.childrenByName(e, "Tracking").forEach(function (e) {
      t = e.getAttribute("event"), i = parserUtils.parseNodeText(e), t && i && (null == r.trackingEvents[t] && (r.trackingEvents[t] = []), r.trackingEvents[t].push(i));
    });
  }), parserUtils.childrenByName(e, "NonLinear").forEach(function (e) {
    var t = new NonLinearAd();t.id = e.getAttribute("id") || null, t.width = e.getAttribute("width"), t.height = e.getAttribute("height"), t.expandedWidth = e.getAttribute("expandedWidth"), t.expandedHeight = e.getAttribute("expandedHeight"), t.scalable = parserUtils.parseBoolean(e.getAttribute("scalable")), t.maintainAspectRatio = parserUtils.parseBoolean(e.getAttribute("maintainAspectRatio")), t.minSuggestedDuration = parserUtils.parseDuration(e.getAttribute("minSuggestedDuration")), t.apiFramework = e.getAttribute("apiFramework"), parserUtils.childrenByName(e, "HTMLResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || "text/html", t.htmlResource = parserUtils.parseNodeText(e);
    }), parserUtils.childrenByName(e, "IFrameResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || 0, t.iframeResource = parserUtils.parseNodeText(e);
    }), parserUtils.childrenByName(e, "StaticResource").forEach(function (e) {
      t.type = e.getAttribute("creativeType") || 0, t.staticResource = parserUtils.parseNodeText(e);
    });var i = parserUtils.childByName(e, "AdParameters");i && (t.adParameters = parserUtils.parseNodeText(i)), t.nonlinearClickThroughURLTemplate = parserUtils.parseNodeText(parserUtils.childByName(e, "NonLinearClickThrough")), parserUtils.childrenByName(e, "NonLinearClickTracking").forEach(function (e) {
      t.nonlinearClickTrackingURLTemplates.push(parserUtils.parseNodeText(e));
    }), r.variations.push(t);
  }), r;
}function parseAd(e) {
  var t = e.childNodes;for (var r in t) {
    var i = t[r];if (-1 !== ["Wrapper", "InLine"].indexOf(i.nodeName)) {
      if (parserUtils.copyNodeAttribute("id", e, i), parserUtils.copyNodeAttribute("sequence", e, i), "Wrapper" === i.nodeName) return parseWrapper(i);if ("InLine" === i.nodeName) return parseInLine(i);
    }
  }
}function parseInLine(e) {
  var t = e.childNodes,
      r = new Ad();r.id = e.getAttribute("id") || null, r.sequence = e.getAttribute("sequence") || null;for (var _e5 in t) {
    var i = t[_e5];switch (i.nodeName) {case "Error":
        r.errorURLTemplates.push(parserUtils.parseNodeText(i));break;case "Impression":
        r.impressionURLTemplates.push(parserUtils.parseNodeText(i));break;case "Creatives":
        parserUtils.childrenByName(i, "Creative").forEach(function (e) {
          var t = { id: e.getAttribute("id") || null, adId: parseCreativeAdIdAttribute(e), sequence: e.getAttribute("sequence") || null, apiFramework: e.getAttribute("apiFramework") || null };for (var _i2 in e.childNodes) {
            var s = e.childNodes[_i2];switch (s.nodeName) {case "Linear":
                var _e6 = parseCreativeLinear(s, t);_e6 && r.creatives.push(_e6);break;case "NonLinearAds":
                var _i3 = parseCreativeNonLinear(s, t);_i3 && r.creatives.push(_i3);break;case "CompanionAds":
                var n = parseCreativeCompanion(s, t);n && r.creatives.push(n);}
          }
        });break;case "Extensions":
        parseExtensions(r.extensions, parserUtils.childrenByName(i, "Extension"));break;case "AdSystem":
        r.system = { value: parserUtils.parseNodeText(i), version: i.getAttribute("version") || null };break;case "AdTitle":
        r.title = parserUtils.parseNodeText(i);break;case "Description":
        r.description = parserUtils.parseNodeText(i);break;case "Advertiser":
        r.advertiser = parserUtils.parseNodeText(i);break;case "Pricing":
        r.pricing = { value: parserUtils.parseNodeText(i), model: i.getAttribute("model") || null, currency: i.getAttribute("currency") || null };break;case "Survey":
        r.survey = parserUtils.parseNodeText(i);}
  }return r;
}function parseWrapper(e) {
  var t = parseInLine(e);var r = parserUtils.childByName(e, "VASTAdTagURI");if (r ? t.nextWrapperURL = parserUtils.parseNodeText(r) : (r = parserUtils.childByName(e, "VASTAdTagURL")) && (t.nextWrapperURL = parserUtils.parseNodeText(parserUtils.childByName(r, "URL"))), t.creatives.forEach(function (e) {
    if (-1 !== ["linear", "nonlinear"].indexOf(e.type)) {
      if (e.trackingEvents) {
        t.trackingEvents || (t.trackingEvents = {}), t.trackingEvents[e.type] || (t.trackingEvents[e.type] = {});
        var _loop = function _loop(_r2) {
          var i = e.trackingEvents[_r2];t.trackingEvents[e.type][_r2] || (t.trackingEvents[e.type][_r2] = []), i.forEach(function (i) {
            t.trackingEvents[e.type][_r2].push(i);
          });
        };

        for (var _r2 in e.trackingEvents) {
          _loop(_r2);
        }
      }e.videoClickTrackingURLTemplates && (t.videoClickTrackingURLTemplates || (t.videoClickTrackingURLTemplates = []), e.videoClickTrackingURLTemplates.forEach(function (e) {
        t.videoClickTrackingURLTemplates.push(e);
      })), e.videoClickThroughURLTemplate && (t.videoClickThroughURLTemplate = e.videoClickThroughURLTemplate), e.videoCustomClickURLTemplates && (t.videoCustomClickURLTemplates || (t.videoCustomClickURLTemplates = []), e.videoCustomClickURLTemplates.forEach(function (e) {
        t.videoCustomClickURLTemplates.push(e);
      }));
    }
  }), t.nextWrapperURL) return t;
}function parseExtensions(e, t) {
  t.forEach(function (t) {
    var r = new AdExtension(),
        i = t.attributes,
        s = t.childNodes;if (t.attributes) for (var _e7 in i) {
      var _t4 = i[_e7];_t4.nodeName && _t4.nodeValue && (r.attributes[_t4.nodeName] = _t4.nodeValue);
    }for (var _e8 in s) {
      var _t5 = s[_e8],
          _i4 = parserUtils.parseNodeText(_t5);if ("#comment" !== _t5.nodeName && "" !== _i4) {
        var _e9 = new AdExtensionChild();if (_e9.name = _t5.nodeName, _e9.value = _i4, _t5.attributes) {
          var _r3 = _t5.attributes;for (var _t6 in _r3) {
            var _i5 = _r3[_t6];_e9.attributes[_i5.nodeName] = _i5.nodeValue;
          }
        }r.children.push(_e9);
      }
    }e.push(r);
  });
}function parseCreativeAdIdAttribute(e) {
  return e.getAttribute("AdID") || e.getAttribute("adID") || e.getAttribute("adId") || null;
}var domain;function EventHandlers() {}function EventEmitter() {
  EventEmitter.init.call(this);
}function $getMaxListeners(e) {
  return void 0 === e._maxListeners ? EventEmitter.defaultMaxListeners : e._maxListeners;
}function emitNone(e, t, r) {
  if (t) e.call(r);else for (var i = e.length, s = arrayClone(e, i), n = 0; n < i; ++n) {
    s[n].call(r);
  }
}function emitOne(e, t, r, i) {
  if (t) e.call(r, i);else for (var s = e.length, n = arrayClone(e, s), a = 0; a < s; ++a) {
    n[a].call(r, i);
  }
}function emitTwo(e, t, r, i, s) {
  if (t) e.call(r, i, s);else for (var n = e.length, a = arrayClone(e, n), o = 0; o < n; ++o) {
    a[o].call(r, i, s);
  }
}function emitThree(e, t, r, i, s, n) {
  if (t) e.call(r, i, s, n);else for (var a = e.length, o = arrayClone(e, a), l = 0; l < a; ++l) {
    o[l].call(r, i, s, n);
  }
}function emitMany(e, t, r, i) {
  if (t) e.apply(r, i);else for (var s = e.length, n = arrayClone(e, s), a = 0; a < s; ++a) {
    n[a].apply(r, i);
  }
}function _addListener(e, t, r, i) {
  var s, n, a;if ("function" != typeof r) throw new TypeError('"listener" argument must be a function');if ((n = e._events) ? (n.newListener && (e.emit("newListener", t, r.listener ? r.listener : r), n = e._events), a = n[t]) : (n = e._events = new EventHandlers(), e._eventsCount = 0), a) {
    if ("function" == typeof a ? a = n[t] = i ? [r, a] : [a, r] : i ? a.unshift(r) : a.push(r), !a.warned && (s = $getMaxListeners(e)) && s > 0 && a.length > s) {
      a.warned = !0;var o = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + t + " listeners added. Use emitter.setMaxListeners() to increase limit");o.name = "MaxListenersExceededWarning", o.emitter = e, o.type = t, o.count = a.length, emitWarning(o);
    }
  } else a = n[t] = r, ++e._eventsCount;return e;
}function emitWarning(e) {
  "function" == typeof console.warn ? console.warn(e) : console.log(e);
}function _onceWrap(e, t, r) {
  var i = !1;function s() {
    e.removeListener(t, s), i || (i = !0, r.apply(e, arguments));
  }return s.listener = r, s;
}function listenerCount(e) {
  var t = this._events;if (t) {
    var r = t[e];if ("function" == typeof r) return 1;if (r) return r.length;
  }return 0;
}function spliceOne(e, t) {
  for (var r = t, i = r + 1, s = e.length; i < s; r += 1, i += 1) {
    e[r] = e[i];
  }e.pop();
}function arrayClone(e, t) {
  for (var r = new Array(t); t--;) {
    r[t] = e[t];
  }return r;
}function unwrapListeners(e) {
  for (var t = new Array(e.length), r = 0; r < t.length; ++r) {
    t[r] = e[r].listener || e[r];
  }return t;
}function xdr() {
  var e = void 0;return window.XDomainRequest && (e = new XDomainRequest()), e;
}function supported() {
  return !!xdr();
}function get(e, t, r) {
  var i = "function" == typeof window.ActiveXObject ? new window.ActiveXObject("Microsoft.XMLDOM") : void 0;if (!i) return r(new Error("FlashURLHandler: Microsoft.XMLDOM format not supported"));i.async = !1, request.open("GET", e), request.timeout = t.timeout || 0, request.withCredentials = t.withCredentials || !1, request.send(), request.onprogress = function () {}, request.onload = function () {
    i.loadXML(request.responseText), r(null, i);
  };
}EventHandlers.prototype = Object.create(null), EventEmitter.EventEmitter = EventEmitter, EventEmitter.usingDomains = !1, EventEmitter.prototype.domain = void 0, EventEmitter.prototype._events = void 0, EventEmitter.prototype._maxListeners = void 0, EventEmitter.defaultMaxListeners = 10, EventEmitter.init = function () {
  this.domain = null, EventEmitter.usingDomains && (!domain.active || this instanceof domain.Domain || (this.domain = domain.active)), this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = new EventHandlers(), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
}, EventEmitter.prototype.setMaxListeners = function (e) {
  if ("number" != typeof e || e < 0 || isNaN(e)) throw new TypeError('"n" argument must be a positive number');return this._maxListeners = e, this;
}, EventEmitter.prototype.getMaxListeners = function () {
  return $getMaxListeners(this);
}, EventEmitter.prototype.emit = function (e) {
  var t,
      r,
      i,
      s,
      n,
      a,
      o,
      l = "error" === e;if (a = this._events) l = l && null == a.error;else if (!l) return !1;if (o = this.domain, l) {
    if (t = arguments[1], !o) {
      if (t instanceof Error) throw t;var c = new Error('Uncaught, unspecified "error" event. (' + t + ")");throw c.context = t, c;
    }return t || (t = new Error('Uncaught, unspecified "error" event')), t.domainEmitter = this, t.domain = o, t.domainThrown = !1, o.emit("error", t), !1;
  }if (!(r = a[e])) return !1;var p = "function" == typeof r;switch (i = arguments.length) {case 1:
      emitNone(r, p, this);break;case 2:
      emitOne(r, p, this, arguments[1]);break;case 3:
      emitTwo(r, p, this, arguments[1], arguments[2]);break;case 4:
      emitThree(r, p, this, arguments[1], arguments[2], arguments[3]);break;default:
      for (s = new Array(i - 1), n = 1; n < i; n++) {
        s[n - 1] = arguments[n];
      }emitMany(r, p, this, s);}return !0;
}, EventEmitter.prototype.addListener = function (e, t) {
  return _addListener(this, e, t, !1);
}, EventEmitter.prototype.on = EventEmitter.prototype.addListener, EventEmitter.prototype.prependListener = function (e, t) {
  return _addListener(this, e, t, !0);
}, EventEmitter.prototype.once = function (e, t) {
  if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');return this.on(e, _onceWrap(this, e, t)), this;
}, EventEmitter.prototype.prependOnceListener = function (e, t) {
  if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');return this.prependListener(e, _onceWrap(this, e, t)), this;
}, EventEmitter.prototype.removeListener = function (e, t) {
  var r, i, s, n, a;if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');if (!(i = this._events)) return this;if (!(r = i[e])) return this;if (r === t || r.listener && r.listener === t) 0 == --this._eventsCount ? this._events = new EventHandlers() : (delete i[e], i.removeListener && this.emit("removeListener", e, r.listener || t));else if ("function" != typeof r) {
    for (s = -1, n = r.length; n-- > 0;) {
      if (r[n] === t || r[n].listener && r[n].listener === t) {
        a = r[n].listener, s = n;break;
      }
    }if (s < 0) return this;if (1 === r.length) {
      if (r[0] = void 0, 0 == --this._eventsCount) return this._events = new EventHandlers(), this;delete i[e];
    } else spliceOne(r, s);i.removeListener && this.emit("removeListener", e, a || t);
  }return this;
}, EventEmitter.prototype.removeAllListeners = function (e) {
  var t, r;if (!(r = this._events)) return this;if (!r.removeListener) return 0 === arguments.length ? (this._events = new EventHandlers(), this._eventsCount = 0) : r[e] && (0 == --this._eventsCount ? this._events = new EventHandlers() : delete r[e]), this;if (0 === arguments.length) {
    for (var i, s = Object.keys(r), n = 0; n < s.length; ++n) {
      "removeListener" !== (i = s[n]) && this.removeAllListeners(i);
    }return this.removeAllListeners("removeListener"), this._events = new EventHandlers(), this._eventsCount = 0, this;
  }if ("function" == typeof (t = r[e])) this.removeListener(e, t);else if (t) do {
    this.removeListener(e, t[t.length - 1]);
  } while (t[0]);return this;
}, EventEmitter.prototype.listeners = function (e) {
  var t,
      r = this._events;return r && (t = r[e]) ? "function" == typeof t ? [t.listener || t] : unwrapListeners(t) : [];
}, EventEmitter.listenerCount = function (e, t) {
  return "function" == typeof e.listenerCount ? e.listenerCount(t) : listenerCount.call(e, t);
}, EventEmitter.prototype.listenerCount = listenerCount, EventEmitter.prototype.eventNames = function () {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};var flashURLHandler = { get: get, supported: supported };function get$1(e, t, r) {
  r(new Error("Please bundle the library for node to use the node urlHandler"));
}var nodeURLHandler = { get: get$1 };function xhr() {
  try {
    var e = new window.XMLHttpRequest();return "withCredentials" in e ? e : null;
  } catch (e) {
    return console.log("Error in XHRURLHandler support check:", e), null;
  }
}function supported$1() {
  return !!xhr();
}function get$2(e, t, r) {
  if ("https:" === window.location.protocol && 0 === e.indexOf("http://")) return r(new Error("XHRURLHandler: Cannot go from HTTPS to HTTP."));try {
    var i = xhr();i.open("GET", e), i.timeout = t.timeout || 0, i.withCredentials = t.withCredentials || !1, i.overrideMimeType && i.overrideMimeType("text/xml"), i.onreadystatechange = function () {
      4 === i.readyState && (200 === i.status ? r(null, i.responseXML) : r(new Error("XHRURLHandler: " + i.statusText)));
    }, i.send();
  } catch (e) {
    r(new Error("XHRURLHandler: Unexpected error"));
  }
}var XHRURLHandler = { get: get$2, supported: supported$1 };function get$3(e, t, r) {
  return r || ("function" == typeof t && (r = t), t = {}), "undefined" == typeof window || null === window ? nodeURLHandler.get(e, t, r) : XHRURLHandler.supported() ? XHRURLHandler.get(e, t, r) : flashURLHandler.supported() ? flashURLHandler.get(e, t, r) : r(new Error("Current context is not supported by any of the default URLHandlers. Please provide a custom URLHandler"));
}var urlHandler = { get: get$3 };
var VASTResponse = function VASTResponse() {
  _classCallCheck(this, VASTResponse);

  this.ads = [], this.errorURLTemplates = [];
};

var DEFAULT_MAX_WRAPPER_DEPTH = 10,
    DEFAULT_EVENT_DATA = { ERRORCODE: 900, extensions: [] };
var VASTParser = function (_EventEmitter) {
  _inherits(VASTParser, _EventEmitter);

  function VASTParser() {
    var _this4;

    _classCallCheck(this, VASTParser);

    (_this4 = _possibleConstructorReturn(this, (VASTParser.__proto__ || Object.getPrototypeOf(VASTParser)).call(this)), _this4), _this4.remainingAds = [], _this4.parentURLs = [], _this4.errorURLTemplates = [], _this4.rootErrorURLTemplates = [], _this4.maxWrapperDepth = null, _this4.URLTemplateFilters = [], _this4.fetchingOptions = {};return _this4;
  }

  _createClass(VASTParser, [{
    key: "addURLTemplateFilter",
    value: function addURLTemplateFilter(e) {
      "function" == typeof e && this.URLTemplateFilters.push(e);
    }
  }, {
    key: "removeURLTemplateFilter",
    value: function removeURLTemplateFilter() {
      this.URLTemplateFilters.pop();
    }
  }, {
    key: "countURLTemplateFilters",
    value: function countURLTemplateFilters() {
      return this.URLTemplateFilters.length;
    }
  }, {
    key: "clearURLTemplateFilters",
    value: function clearURLTemplateFilters() {
      this.URLTemplateFilters = [];
    }
  }, {
    key: "trackVastError",
    value: function trackVastError(e, t) {
      for (var _len = arguments.length, r = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        r[_key - 2] = arguments[_key];
      }

      this.emit("VAST-error", _extends.apply(undefined, [DEFAULT_EVENT_DATA, t].concat(r))), util.track(e, t);
    }
  }, {
    key: "getErrorURLTemplates",
    value: function getErrorURLTemplates() {
      return this.rootErrorURLTemplates.concat(this.errorURLTemplates);
    }
  }, {
    key: "fetchVAST",
    value: function fetchVAST(e, t, r) {
      var _this5 = this;

      return new Promise(function (i, s) {
        _this5.URLTemplateFilters.forEach(function (t) {
          e = t(e);
        }), _this5.parentURLs.push(e), _this5.emit("VAST-resolving", { url: e, wrapperDepth: t, originalUrl: r }), _this5.urlHandler.get(e, _this5.fetchingOptions, function (t, r) {
          _this5.emit("VAST-resolved", { url: e, error: t }), t ? s(t) : i(r);
        });
      });
    }
  }, {
    key: "initParsingStatus",
    value: function initParsingStatus() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.rootURL = "", this.remainingAds = [], this.parentURLs = [], this.errorURLTemplates = [], this.rootErrorURLTemplates = [], this.maxWrapperDepth = e.wrapperLimit || DEFAULT_MAX_WRAPPER_DEPTH, this.fetchingOptions = { timeout: e.timeout, withCredentials: e.withCredentials }, this.urlHandler = e.urlhandler || urlHandler;
    }
  }, {
    key: "getRemainingAds",
    value: function getRemainingAds(e) {
      var _this6 = this;

      if (0 === this.remainingAds.length) return Promise.reject(new Error("No more ads are available for the given VAST"));var t = e ? util.flatten(this.remainingAds) : this.remainingAds.shift();return this.errorURLTemplates = [], this.parentURLs = [], this.resolveAds(t, { wrapperDepth: 0, originalUrl: this.rootURL }).then(function (e) {
        return _this6.buildVASTResponse(e);
      });
    }
  }, {
    key: "getAndParseVAST",
    value: function getAndParseVAST(e) {
      var _this7 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.initParsingStatus(t), this.rootURL = e, this.fetchVAST(e).then(function (r) {
        return t.originalUrl = e, t.isRootVAST = !0, _this7.parse(r, t).then(function (e) {
          return _this7.buildVASTResponse(e);
        });
      });
    }
  }, {
    key: "parseVAST",
    value: function parseVAST(e) {
      var _this8 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.initParsingStatus(t), t.isRootVAST = !0, this.parse(e, t).then(function (e) {
        return _this8.buildVASTResponse(e);
      });
    }
  }, {
    key: "buildVASTResponse",
    value: function buildVASTResponse(e) {
      var t = new VASTResponse();return t.ads = e, t.errorURLTemplates = this.getErrorURLTemplates(), this.completeWrapperResolving(t), t;
    }
  }, {
    key: "parse",
    value: function parse(e, _ref) {
      var _ref$resolveAll = _ref.resolveAll,
          t = _ref$resolveAll === undefined ? !0 : _ref$resolveAll,
          _ref$wrapperSequence = _ref.wrapperSequence,
          r = _ref$wrapperSequence === undefined ? null : _ref$wrapperSequence,
          _ref$originalUrl = _ref.originalUrl,
          i = _ref$originalUrl === undefined ? null : _ref$originalUrl,
          _ref$wrapperDepth = _ref.wrapperDepth,
          s = _ref$wrapperDepth === undefined ? 0 : _ref$wrapperDepth,
          _ref$isRootVAST = _ref.isRootVAST,
          n = _ref$isRootVAST === undefined ? !1 : _ref$isRootVAST;
      if (!e || !e.documentElement || "VAST" !== e.documentElement.nodeName) return Promise.reject(new Error("Invalid VAST XMLDocument"));var a = [];var o = e.documentElement.childNodes;for (var _e10 in o) {
        var _t7 = o[_e10];if ("Error" === _t7.nodeName) {
          var _e11 = parserUtils.parseNodeText(_t7);n ? this.rootErrorURLTemplates.push(_e11) : this.errorURLTemplates.push(_e11);
        }if ("Ad" === _t7.nodeName) {
          var _e12 = parseAd(_t7);_e12 ? a.push(_e12) : this.trackVastError(this.getErrorURLTemplates(), { ERRORCODE: 101 });
        }
      }var l = a.length,
          c = a[l - 1];return 1 === l && void 0 !== r && null !== r && c && !c.sequence && (c.sequence = r), !1 === t && (this.remainingAds = parserUtils.splitVAST(a), a = this.remainingAds.shift()), this.resolveAds(a, { wrapperDepth: s, originalUrl: i });
    }
  }, {
    key: "resolveAds",
    value: function resolveAds() {
      var _this9 = this;

      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _ref2 = arguments[1];
      var t = _ref2.wrapperDepth,
          r = _ref2.originalUrl;
      var i = [];return e.forEach(function (e) {
        var s = _this9.resolveWrappers(e, t, r);i.push(s);
      }), Promise.all(i).then(function (e) {
        var i = util.flatten(e);if (!i && _this9.remainingAds.length > 0) {
          var _e13 = _this9.remainingAds.shift();return _this9.resolveAds(_e13, { wrapperDepth: t, originalUrl: r });
        }return i;
      });
    }
  }, {
    key: "resolveWrappers",
    value: function resolveWrappers(e, t, r) {
      var _this10 = this;

      return new Promise(function (i, s) {
        if (t++, !e.nextWrapperURL) return delete e.nextWrapperURL, i(e);if (t >= _this10.maxWrapperDepth || -1 !== _this10.parentURLs.indexOf(e.nextWrapperURL)) return e.errorCode = 302, delete e.nextWrapperURL, i(e);e.nextWrapperURL = parserUtils.resolveVastAdTagURI(e.nextWrapperURL, r);var n = e.sequence;r = e.nextWrapperURL, _this10.fetchVAST(e.nextWrapperURL, t, r).then(function (s) {
          return _this10.parse(s, { originalUrl: r, wrapperSequence: n, wrapperDepth: t }).then(function (t) {
            if (delete e.nextWrapperURL, 0 === t.length) return e.creatives = [], i(e);t.forEach(function (t) {
              t && parserUtils.mergeWrapperAdData(t, e);
            }), i(t);
          });
        })["catch"](function (t) {
          e.errorCode = 301, e.errorMessage = t.message, i(e);
        });
      });
    }
  }, {
    key: "completeWrapperResolving",
    value: function completeWrapperResolving(e) {
      if (0 === e.ads.length) this.trackVastError(e.errorURLTemplates, { ERRORCODE: 303 });else for (var t = e.ads.length - 1; t >= 0; t--) {
        var _r4 = e.ads[t];(_r4.errorCode || 0 === _r4.creatives.length) && (this.trackVastError(_r4.errorURLTemplates.concat(e.errorURLTemplates), { ERRORCODE: _r4.errorCode || 303 }, { ERRORMESSAGE: _r4.errorMessage || "" }, { extensions: _r4.extensions }, { system: _r4.system }), e.ads.splice(t, 1));
      }
    }
  }]);

  return VASTParser;
}(EventEmitter);

var storage = null;var DEFAULT_STORAGE = { data: {}, length: 0, getItem: function getItem(e) {
    return this.data[e];
  },
  setItem: function setItem(e, t) {
    this.data[e] = t, this.length = Object.keys(this.data).length;
  },
  removeItem: function removeItem(e) {
    delete data[e], this.length = Object.keys(this.data).length;
  },
  clear: function clear() {
    this.data = {}, this.length = 0;
  }
};
var Storage = function () {
  function Storage() {
    _classCallCheck(this, Storage);

    this.storage = this.initStorage();
  }

  _createClass(Storage, [{
    key: "initStorage",
    value: function initStorage() {
      if (storage) return storage;try {
        storage = "undefined" != typeof window && null !== window ? window.localStorage || window.sessionStorage : null;
      } catch (e) {
        storage = null;
      }return storage && !this.isStorageDisabled(storage) || (storage = DEFAULT_STORAGE).clear(), storage;
    }
  }, {
    key: "isStorageDisabled",
    value: function isStorageDisabled(e) {
      var t = "__VASTStorage__";try {
        if (e.setItem(t, t), e.getItem(t) !== t) return e.removeItem(t), !0;
      } catch (e) {
        return !0;
      }return e.removeItem(t), !1;
    }
  }, {
    key: "getItem",
    value: function getItem(e) {
      return this.storage.getItem(e);
    }
  }, {
    key: "setItem",
    value: function setItem(e, t) {
      return this.storage.setItem(e, t);
    }
  }, {
    key: "removeItem",
    value: function removeItem(e) {
      return this.storage.removeItem(e);
    }
  }, {
    key: "clear",
    value: function clear() {
      return this.storage.clear();
    }
  }]);

  return Storage;
}();

var VASTClient = function () {
  function VASTClient(e, t, r) {
    _classCallCheck(this, VASTClient);

    this.cappingFreeLunch = e || 0, this.cappingMinimumTimeInterval = t || 0, this.defaultOptions = { withCredentials: !1, timeout: 0 }, this.vastParser = new VASTParser(), this.storage = r || new Storage(), void 0 === this.lastSuccessfulAd && (this.lastSuccessfulAd = 0), void 0 === this.totalCalls && (this.totalCalls = 0), void 0 === this.totalCallsTimeout && (this.totalCallsTimeout = 0);
  }

  _createClass(VASTClient, [{
    key: "getParser",
    value: function getParser() {
      return this.vastParser;
    }
  }, {
    key: "hasRemainingAds",
    value: function hasRemainingAds() {
      return this.vastParser.remainingAds.length > 0;
    }
  }, {
    key: "getNextAds",
    value: function getNextAds(e) {
      return this.vastParser.getRemainingAds(e);
    }
  }, {
    key: "get",
    value: function get(e) {
      var _this11 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var r = Date.now();return (t = _extends(this.defaultOptions, t)).hasOwnProperty("resolveAll") || (t.resolveAll = !1), this.totalCallsTimeout < r ? (this.totalCalls = 1, this.totalCallsTimeout = r + 36e5) : this.totalCalls++, new Promise(function (i, s) {
        if (_this11.cappingFreeLunch >= _this11.totalCalls) return s(new Error("VAST call canceled \u2013 FreeLunch capping not reached yet " + _this11.totalCalls + "/" + _this11.cappingFreeLunch));var n = r - _this11.lastSuccessfulAd;if (n < 0) _this11.lastSuccessfulAd = 0;else if (n < _this11.cappingMinimumTimeInterval) return s(new Error("VAST call canceled \u2013 (" + _this11.cappingMinimumTimeInterval + ")ms minimum interval reached"));_this11.vastParser.getAndParseVAST(e, t).then(function (e) {
          return i(e);
        })["catch"](function (e) {
          return s(e);
        });
      });
    }
  }, {
    key: "lastSuccessfulAd",
    get: function get() {
      return this.storage.getItem("vast-client-last-successful-ad");
    },
    set: function set(e) {
      this.storage.setItem("vast-client-last-successful-ad", e);
    }
  }, {
    key: "totalCalls",
    get: function get() {
      return this.storage.getItem("vast-client-total-calls");
    },
    set: function set(e) {
      this.storage.setItem("vast-client-total-calls", e);
    }
  }, {
    key: "totalCallsTimeout",
    get: function get() {
      return this.storage.getItem("vast-client-total-calls-timeout");
    },
    set: function set(e) {
      this.storage.setItem("vast-client-total-calls-timeout", e);
    }
  }]);

  return VASTClient;
}();

var DEFAULT_SKIP_DELAY = -1;
var VASTTracker = function (_EventEmitter2) {
  _inherits(VASTTracker, _EventEmitter2);

  function VASTTracker(e, t, r) {
    var _this12;

    var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, VASTTracker);

    (_this12 = _possibleConstructorReturn(this, (VASTTracker.__proto__ || Object.getPrototypeOf(VASTTracker)).call(this)), _this12), _this12.ad = t, _this12.creative = r, _this12.variation = i, _this12.muted = !1, _this12.impressed = !1, _this12.skippable = !1, _this12.trackingEvents = {}, _this12._alreadyTriggeredQuartiles = {}, _this12.emitAlwaysEvents = ["creativeView", "start", "firstQuartile", "midpoint", "thirdQuartile", "complete", "resume", "pause", "rewind", "skip", "closeLinear", "close"];for (var _e14 in _this12.creative.trackingEvents) {
      var _t8 = _this12.creative.trackingEvents[_e14];_this12.trackingEvents[_e14] = _t8.slice(0);
    }_this12.creative instanceof CreativeLinear ? _this12._initLinearTracking() : _this12._initVariationTracking(), e && _this12.on("start", function () {
      e.lastSuccessfulAd = Date.now();
    });return _this12;
  }

  _createClass(VASTTracker, [{
    key: "_initLinearTracking",
    value: function _initLinearTracking() {
      this.linear = !0, this.skipDelay = this.creative.skipDelay, this.setDuration(this.creative.duration), this.clickThroughURLTemplate = this.creative.videoClickThroughURLTemplate, this.clickTrackingURLTemplates = this.creative.videoClickTrackingURLTemplates;
    }
  }, {
    key: "_initVariationTracking",
    value: function _initVariationTracking() {
      if (this.linear = !1, this.skipDelay = DEFAULT_SKIP_DELAY, this.variation) {
        for (var e in this.variation.trackingEvents) {
          var t = this.variation.trackingEvents[e];this.trackingEvents[e] ? this.trackingEvents[e] = this.trackingEvents[e].concat(t.slice(0)) : this.trackingEvents[e] = t.slice(0);
        }this.variation instanceof NonLinearAd ? (this.clickThroughURLTemplate = this.variation.nonlinearClickThroughURLTemplate, this.clickTrackingURLTemplates = this.variation.nonlinearClickTrackingURLTemplates, this.setDuration(this.variation.minSuggestedDuration)) : this.variation instanceof CompanionAd && (this.clickThroughURLTemplate = this.variation.companionClickThroughURLTemplate, this.clickTrackingURLTemplates = this.variation.companionClickTrackingURLTemplates);
      }
    }
  }, {
    key: "setDuration",
    value: function setDuration(e) {
      this.assetDuration = e, this.quartiles = { firstQuartile: Math.round(25 * this.assetDuration) / 100, midpoint: Math.round(50 * this.assetDuration) / 100, thirdQuartile: Math.round(75 * this.assetDuration) / 100 };
    }
  }, {
    key: "setProgress",
    value: function setProgress(e) {
      var _this13 = this;

      var t = this.skipDelay || DEFAULT_SKIP_DELAY;if (-1 === t || this.skippable || (t > e ? this.emit("skip-countdown", t - e) : (this.skippable = !0, this.emit("skip-countdown", 0))), this.assetDuration > 0) {
        var _t9 = [];if (e > 0) {
          var r = Math.round(e / this.assetDuration * 100);_t9.push("start"), _t9.push("progress-" + r + "%"), _t9.push("progress-" + Math.round(e));for (var _r5 in this.quartiles) {
            this.isQuartileReached(_r5, this.quartiles[_r5], e) && (_t9.push(_r5), this._alreadyTriggeredQuartiles[_r5] = !0);
          }
        }_t9.forEach(function (e) {
          _this13.track(e, !0);
        }), e < this.progress && this.track("rewind");
      }this.progress = e;
    }
  }, {
    key: "isQuartileReached",
    value: function isQuartileReached(e, t, r) {
      var i = !1;return t <= r && !this._alreadyTriggeredQuartiles[e] && (i = !0), i;
    }
  }, {
    key: "setMuted",
    value: function setMuted(e) {
      this.muted !== e && this.track(e ? "mute" : "unmute"), this.muted = e;
    }
  }, {
    key: "setPaused",
    value: function setPaused(e) {
      this.paused !== e && this.track(e ? "pause" : "resume"), this.paused = e;
    }
  }, {
    key: "setFullscreen",
    value: function setFullscreen(e) {
      this.fullscreen !== e && this.track(e ? "fullscreen" : "exitFullscreen"), this.fullscreen = e;
    }
  }, {
    key: "setExpand",
    value: function setExpand(e) {
      this.expanded !== e && this.track(e ? "expand" : "collapse"), this.expanded = e;
    }
  }, {
    key: "setSkipDelay",
    value: function setSkipDelay(e) {
      "number" == typeof e && (this.skipDelay = e);
    }
  }, {
    key: "trackImpression",
    value: function trackImpression() {
      this.impressed || (this.impressed = !0, this.trackURLs(this.ad.impressionURLTemplates), this.track("creativeView"));
    }
  }, {
    key: "errorWithCode",
    value: function errorWithCode(e) {
      this.trackURLs(this.ad.errorURLTemplates, { ERRORCODE: e });
    }
  }, {
    key: "complete",
    value: function complete() {
      this.track("complete");
    }
  }, {
    key: "close",
    value: function close() {
      this.track(this.linear ? "closeLinear" : "close");
    }
  }, {
    key: "skip",
    value: function skip() {
      this.track("skip"), this.trackingEvents = [];
    }
  }, {
    key: "click",
    value: function click() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.clickTrackingURLTemplates && this.clickTrackingURLTemplates.length && this.trackURLs(this.clickTrackingURLTemplates);var t = this.clickThroughURLTemplate || e;if (t) {
        var _e15 = this.linear ? { CONTENTPLAYHEAD: this.progressFormatted() } : {},
            r = util.resolveURLTemplates([t], _e15)[0];this.emit("clickthrough", r);
      }
    }
  }, {
    key: "track",
    value: function track(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      "closeLinear" === e && !this.trackingEvents[e] && this.trackingEvents.close && (e = "close");var r = this.trackingEvents[e],
          i = this.emitAlwaysEvents.indexOf(e) > -1;r ? (this.emit(e, ""), this.trackURLs(r)) : i && this.emit(e, ""), t && (delete this.trackingEvents[e], i && this.emitAlwaysEvents.splice(this.emitAlwaysEvents.indexOf(e), 1));
    }
  }, {
    key: "trackURLs",
    value: function trackURLs(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.linear && (this.creative && this.creative.mediaFiles && this.creative.mediaFiles[0] && this.creative.mediaFiles[0].fileURL && (t.ASSETURI = this.creative.mediaFiles[0].fileURL), t.CONTENTPLAYHEAD = this.progressFormatted()), util.track(e, t);
    }
  }, {
    key: "progressFormatted",
    value: function progressFormatted() {
      var e = parseInt(this.progress);var t = e / 3600;t.length < 2 && (t = "0" + t);var r = e / 60 % 60;r.length < 2 && (r = "0" + r);var i = e % 60;return i.length < 2 && (i = "0" + r), t + ":" + r + ":" + i + "." + parseInt(100 * (this.progress - e));
    }
  }]);

  return VASTTracker;
}(EventEmitter);

exports.VASTClient = VASTClient;
exports.VASTParser = VASTParser;
exports.VASTTracker = VASTTracker;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2Fkcy9pbWEvQWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9hZHMvaW1hL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvYWRzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvYWRzL3Zhc3QvQWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9hZHMvdmFzdC9MaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy92YXN0LWNsaWVudC5qcyJdLCJuYW1lcyI6WyJBZCIsImVsVmlkZW8iLCJwcm92aWRlciIsInBsYXllckNvbmZpZyIsImFkVGFnVXJsIiwiZXJyb3JDYWxsYmFjayIsIkFVVE9QTEFZX05PVF9BTExPV0VEIiwiQURNQU5HRVJfTE9BRElOR19FUlJPUiIsIkFEU19NQU5BR0VSX0xPQURFRCIsIkFEX0VSUk9SIiwidGhhdCIsImFkc01hbmFnZXJMb2FkZWQiLCJhZHNFcnJvck9jY3VycmVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJPbk1hbmFnZXJMb2FkZWQiLCJPbkFkRXJyb3IiLCJhZERpc3BsYXlDb250YWluZXIiLCJhZHNMb2FkZXIiLCJhZHNNYW5hZ2VyIiwibGlzdGVuZXIiLCJhZHNSZXF1ZXN0IiwiYXV0b3BsYXlBbGxvd2VkIiwiYXV0b3BsYXlSZXF1aXJlc011dGVkIiwiYnJvd3NlciIsImdldEJyb3dzZXIiLCJpc01vYmlsZSIsIm9zIiwiYWREaXNwbGF5Q29udGFpbmVySW5pdGlhbGl6ZWQiLCJzZW5kV2FybmluZ01lc3NhZ2VGb3JNdXRlZFBsYXkiLCJ0cmlnZ2VyIiwiUExBWUVSX1dBUk5JTkciLCJtZXNzYWdlIiwiV0FSTl9NU0dfTVVURURQTEFZIiwidGltZXIiLCJpY29uQ2xhc3MiLCJVSV9JQ09OUyIsInZvbHVtZV9tdXRlIiwib25DbGlja0NhbGxiYWNrIiwic2V0TXV0ZSIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZ29vZ2xlIiwiaW1hIiwiQWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiVHlwZSIsIkFkRXJyb3JFdmVudCIsInNldHRpbmdzIiwic2V0TG9jYWxlIiwic2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzIiwiY3JlYXRlQWRDb250YWluZXIiLCJhZENvbnRhaW5lciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImdldENvbnRhaW5lciIsImFwcGVuZCIsImFkRXJyb3JFdmVudCIsImNvbnNvbGUiLCJnZXRFcnJvciIsImdldFZhc3RFcnJvckNvZGUiLCJnZXRNZXNzYWdlIiwiaW5uZXJFcnJvciIsImdldElubmVyRXJyb3IiLCJnZXRFcnJvckNvZGUiLCJTVEFURV9BRF9FUlJPUiIsImNvZGUiLCJwbGF5IiwiYWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiYWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJBZHNSZW5kZXJpbmdTZXR0aW5ncyIsInJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUiLCJkZXN0cm95IiwiZ2V0QWRzTWFuYWdlciIsImFkQ29uYXRpbmVyRWxtZW50IiwiQWREaXNwbGF5Q29udGFpbmVyIiwiQWRzTG9hZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uIiwiQ09OVEVOVF9WT0xVTUUiLCJkYXRhIiwibXV0ZSIsInNldFZvbHVtZSIsInZvbHVtZSIsInNldEF1dG9QbGF5VG9BZHNSZXF1ZXN0Iiwic2V0QWRXaWxsQXV0b1BsYXkiLCJzZXRBZFdpbGxQbGF5TXV0ZWQiLCJpbml0UmVxdWVzdCIsIkFkc1JlcXVlc3QiLCJmb3JjZU5vbkxpbmVhckZ1bGxTbG90IiwicmVxdWVzdEFkcyIsImNoZWNrQXV0b3BsYXlTdXBwb3J0IiwidGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8iLCJzcmMiLCJURU1QX1ZJREVPX1VSTCIsImxvYWQiLCJnZXROYW1lIiwiUFJPVklERVJfREFTSCIsImNsZWFyQW5kUmVwb3J0IiwiX2F1dG9wbGF5QWxsb3dlZCIsIl9hdXRvcGxheVJlcXVpcmVzTXV0ZWQiLCJwYXVzZSIsInJlbW92ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicGxheVByb21pc2UiLCJ1bmRlZmluZWQiLCJ0aGVuIiwiZXJyb3IiLCJpc0FjdGl2ZSIsInJlc3VtZSIsImluaXRpYWxpemUiLCJyZXRyeUNvdW50IiwiY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSIsImluaXQiLCJWaWV3TW9kZSIsIk5PUk1BTCIsInN0YXJ0IiwiRXJyb3IiLCJzZXRUaW1lb3V0IiwiaXNBdXRvU3RhcnQiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJjb21wbGV0ZUNvbnRlbnRDYWxsYmFjayIsImlzQWxsQWRDb21wbGV0ZSIsImlzTGluZWFyQWQiLCJjb250ZW50Q29tcGxldGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiJGFkcyIsImZpbmQiLCJvZmYiLCJMaXN0ZW5lciIsImFkc1NwZWMiLCJsb3dMZXZlbEV2ZW50cyIsImludGVydmFsVGltZXIiLCJBRF9CVUZGRVJJTkciLCJBZEV2ZW50IiwiQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQiLCJDT05URU5UX1JFU1VNRV9SRVFVRVNURUQiLCJBTExfQURTX0NPTVBMRVRFRCIsIkNMSUNLIiwiU0tJUFBFRCIsIkNPTVBMRVRFIiwiRklSU1RfUVVBUlRJTEUiLCJMT0FERUQiLCJNSURQT0lOVCIsIlBBVVNFRCIsIlJFU1VNRUQiLCJTVEFSVEVEIiwiVVNFUl9DTE9TRSIsIlRISVJEX1FVQVJUSUxFIiwiaXNBbGxBZENvbXBlbGV0ZSIsImFkQ29tcGxldGVDYWxsYmFjayIsImN1cnJlbnRBZCIsImFkRXZlbnQiLCJ0eXBlIiwiZ2V0UG9zaXRpb24iLCJzZXRTdGF0ZSIsIlNUQVRFX0NPTVBMRVRFIiwiUExBWUVSX0NMSUNLRUQiLCJQTEFZRVJfQURfQ0xJQ0siLCJnZXRBZCIsImdldEFkRGF0YSIsInJlbWFpbmluZ1RpbWUiLCJnZXRSZW1haW5pbmdUaW1lIiwiYWQiLCJTVEFURV9BRF9MT0FERUQiLCJyZW1haW5pbmciLCJpc0xpbmVhciIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX1BMQVlJTkciLCJhZE9iamVjdCIsImR1cmF0aW9uIiwiZ2V0RHVyYXRpb24iLCJza2lwVGltZU9mZnNldCIsImdldFNraXBUaW1lT2Zmc2V0IiwiQURfQ0hBTkdFRCIsInNldEludGVydmFsIiwiQURfVElNRSIsInBvc2l0aW9uIiwic2tpcHBhYmxlIiwiZ2V0QWRTa2lwcGFibGVTdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJTVEFURV9BRF9DT01QTEVURSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwic2V0QWRDb21wbGV0ZUNhbGxiYWNrIiwiX2FkQ29tcGxldGVDYWxsYmFjayIsImNvbnRhaW5lciIsImVsQWRWaWRlbyIsInRleHRWaWV3IiwiYWRCdXR0b24iLCJ2YXN0Q2xpZW50IiwiVkFTVENsaWVudCIsInZhc3RUcmFja2VyIiwic3R5bGUiLCJkaXNwbGF5IiwiZ2V0IiwicmVzIiwiYWRzIiwiVkFTVFRyYWNrZXIiLCJjcmVhdGl2ZXMiLCJ2aWRlb1VSTCIsImxlbmd0aCIsIm1lZGlhRmlsZXMiLCJmaWxlVVJMIiwiY2hlY2tNYWluQ29udGVudExvYWRlZCIsIm1ldGFMb2FkZWQiLCJNRURJQUZJTEVfUExBWUJBQ0tfRVJST1IiLCIkdGV4dFZpZXciLCIkYWRCdXR0b24iLCIkZWxBZFZpZGVvIiwibXV0ZWQiLCJwcm9jZXNzRW5kT2ZBZCIsImhpZGUiLCJwcm9jZXNzU3RhcnRPZkFkIiwic2hvdyIsInNraXBCdXR0b25DbGlja2VkIiwiZXZlbnQiLCJoYXNDbGFzcyIsInNraXAiLCJlcnJvcldpdGhDb2RlIiwiY2FucGxheSIsImVuZGVkIiwiY29tcGxldGUiLCJjbGljayIsInNldFBhdXNlZCIsInRpbWV1cGRhdGUiLCJzZXRQcm9ncmVzcyIsInRhcmdldCIsImN1cnJlbnRUaW1lIiwidm9sdW1lY2hhbmdlIiwic2V0TXV0ZWQiLCJsb2FkZWRtZXRhZGF0YSIsInRyYWNrSW1wcmVzc2lvbiIsInVybCIsIndpbmRvdyIsIm9wZW4iLCJodG1sIiwiYWRkQ2xhc3MiLCJwYXJzZUludCIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJlbGVtZW50T3JNc2UiLCJfIiwiaXNFbGVtZW50IiwiZ2V0VmlkZW9FbGVtZW50IiwibWVkaWEiLCJzZXBhcmF0ZUxpdmUiLCJtc2UiLCJpc0R5bmFtaWMiLCJlcnJvclRyaWdnZXIiLCJTVEFURV9FUlJPUiIsIkVSUk9SIiwicGlja0N1cnJlbnRTb3VyY2UiLCJzb3VyY2VzIiwiY3VycmVudFNvdXJjZSIsInNvdXJjZUluZGV4IiwiTWF0aCIsIm1heCIsImxhYmVsIiwiaSIsImdldFNvdXJjZUluZGV4IiwiaWQiLCJzZXF1ZW5jZSIsInN5c3RlbSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJhZHZlcnRpc2VyIiwicHJpY2luZyIsInN1cnZleSIsImVycm9yVVJMVGVtcGxhdGVzIiwiaW1wcmVzc2lvblVSTFRlbXBsYXRlcyIsImV4dGVuc2lvbnMiLCJBZEV4dGVuc2lvbiIsImF0dHJpYnV0ZXMiLCJjaGlsZHJlbiIsIkFkRXh0ZW5zaW9uQ2hpbGQiLCJuYW1lIiwidmFsdWUiLCJDb21wYW5pb25BZCIsIndpZHRoIiwiaGVpZ2h0Iiwic3RhdGljUmVzb3VyY2UiLCJodG1sUmVzb3VyY2UiLCJpZnJhbWVSZXNvdXJjZSIsImFsdFRleHQiLCJjb21wYW5pb25DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSIsImNvbXBhbmlvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMiLCJ0cmFja2luZ0V2ZW50cyIsIkNyZWF0aXZlIiwiZSIsImFkSWQiLCJhcGlGcmFtZXdvcmsiLCJDcmVhdGl2ZUNvbXBhbmlvbiIsInZhcmlhdGlvbnMiLCJ0cmFjayIsInQiLCJyZXNvbHZlVVJMVGVtcGxhdGVzIiwiSW1hZ2UiLCJyIiwiQVNTRVRVUkkiLCJlbmNvZGVVUklDb21wb25lbnRSRkMzOTg2IiwiQ09OVEVOVFBMQVlIRUFEIiwiRVJST1JDT0RFIiwidGVzdCIsIkNBQ0hFQlVTVElORyIsImxlZnRwYWQiLCJyb3VuZCIsInJhbmRvbSIsInRvU3RyaW5nIiwiVElNRVNUQU1QIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiUkFORE9NIiwicyIsIm4iLCJyZXBsYWNlIiwicHVzaCIsImVuY29kZVVSSUNvbXBvbmVudCIsImNoYXJDb2RlQXQiLCJyYW5nZSIsIm1hcCIsImpvaW4iLCJpc051bWVyaWMiLCJpc05hTiIsInBhcnNlRmxvYXQiLCJpc0Zpbml0ZSIsImZsYXR0ZW4iLCJyZWR1Y2UiLCJjb25jYXQiLCJBcnJheSIsImlzQXJyYXkiLCJ1dGlsIiwiY2hpbGRCeU5hbWUiLCJjaGlsZE5vZGVzIiwibm9kZU5hbWUiLCJjaGlsZHJlbkJ5TmFtZSIsInJlc29sdmVWYXN0QWRUYWdVUkkiLCJpbmRleE9mIiwibG9jYXRpb24iLCJwcm90b2NvbCIsInNsaWNlIiwibGFzdEluZGV4T2YiLCJwYXJzZUJvb2xlYW4iLCJwYXJzZU5vZGVUZXh0IiwidGV4dENvbnRlbnQiLCJ0ZXh0IiwidHJpbSIsImNvcHlOb2RlQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwicGFyc2VEdXJhdGlvbiIsInNwbGl0Iiwic3BsaXRWQVNUIiwibWVyZ2VXcmFwcGVyQWREYXRhIiwidmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzIiwidmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcyIsInZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUiLCJwYXJzZXJVdGlscyIsInBhcnNlQ3JlYXRpdmVDb21wYW5pb24iLCJjb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGUiLCJDcmVhdGl2ZUxpbmVhciIsInNraXBEZWxheSIsImFkUGFyYW1ldGVycyIsImljb25zIiwiSWNvbiIsInByb2dyYW0iLCJ4UG9zaXRpb24iLCJ5UG9zaXRpb24iLCJvZmZzZXQiLCJpY29uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUiLCJpY29uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyIsImljb25WaWV3VHJhY2tpbmdVUkxUZW1wbGF0ZSIsIk1lZGlhRmlsZSIsImRlbGl2ZXJ5VHlwZSIsIm1pbWVUeXBlIiwiY29kZWMiLCJiaXRyYXRlIiwibWluQml0cmF0ZSIsIm1heEJpdHJhdGUiLCJzY2FsYWJsZSIsIm1haW50YWluQXNwZWN0UmF0aW8iLCJwYXJzZUNyZWF0aXZlTGluZWFyIiwiY2hhckF0IiwiYSIsInRvTG93ZXJDYXNlIiwibyIsInBhcnNlWFBvc2l0aW9uIiwicGFyc2VZUG9zaXRpb24iLCJDcmVhdGl2ZU5vbkxpbmVhciIsIk5vbkxpbmVhckFkIiwiZXhwYW5kZWRXaWR0aCIsImV4cGFuZGVkSGVpZ2h0IiwibWluU3VnZ2VzdGVkRHVyYXRpb24iLCJub25saW5lYXJDbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSIsIm5vbmxpbmVhckNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMiLCJwYXJzZUNyZWF0aXZlTm9uTGluZWFyIiwicGFyc2VBZCIsInBhcnNlV3JhcHBlciIsInBhcnNlSW5MaW5lIiwicGFyc2VDcmVhdGl2ZUFkSWRBdHRyaWJ1dGUiLCJwYXJzZUV4dGVuc2lvbnMiLCJ2ZXJzaW9uIiwibW9kZWwiLCJjdXJyZW5jeSIsIm5leHRXcmFwcGVyVVJMIiwibm9kZVZhbHVlIiwiZG9tYWluIiwiRXZlbnRIYW5kbGVycyIsIkV2ZW50RW1pdHRlciIsImNhbGwiLCIkZ2V0TWF4TGlzdGVuZXJzIiwiX21heExpc3RlbmVycyIsImRlZmF1bHRNYXhMaXN0ZW5lcnMiLCJlbWl0Tm9uZSIsImFycmF5Q2xvbmUiLCJlbWl0T25lIiwiZW1pdFR3byIsImVtaXRUaHJlZSIsImwiLCJlbWl0TWFueSIsImFwcGx5IiwiX2FkZExpc3RlbmVyIiwiVHlwZUVycm9yIiwiX2V2ZW50cyIsIm5ld0xpc3RlbmVyIiwiZW1pdCIsIl9ldmVudHNDb3VudCIsInVuc2hpZnQiLCJ3YXJuZWQiLCJlbWl0dGVyIiwiY291bnQiLCJlbWl0V2FybmluZyIsIndhcm4iLCJfb25jZVdyYXAiLCJyZW1vdmVMaXN0ZW5lciIsImFyZ3VtZW50cyIsImxpc3RlbmVyQ291bnQiLCJzcGxpY2VPbmUiLCJwb3AiLCJ1bndyYXBMaXN0ZW5lcnMiLCJ4ZHIiLCJYRG9tYWluUmVxdWVzdCIsInN1cHBvcnRlZCIsIkFjdGl2ZVhPYmplY3QiLCJhc3luYyIsInJlcXVlc3QiLCJ0aW1lb3V0Iiwid2l0aENyZWRlbnRpYWxzIiwic2VuZCIsIm9ucHJvZ3Jlc3MiLCJvbmxvYWQiLCJsb2FkWE1MIiwicmVzcG9uc2VUZXh0IiwicHJvdG90eXBlIiwiY3JlYXRlIiwidXNpbmdEb21haW5zIiwiRG9tYWluIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRNYXhMaXN0ZW5lcnMiLCJnZXRNYXhMaXN0ZW5lcnMiLCJjIiwiY29udGV4dCIsImRvbWFpbkVtaXR0ZXIiLCJkb21haW5UaHJvd24iLCJwIiwiYWRkTGlzdGVuZXIiLCJwcmVwZW5kTGlzdGVuZXIiLCJvbmNlIiwicHJlcGVuZE9uY2VMaXN0ZW5lciIsInJlbW92ZUFsbExpc3RlbmVycyIsImxpc3RlbmVycyIsImV2ZW50TmFtZXMiLCJSZWZsZWN0Iiwib3duS2V5cyIsImZsYXNoVVJMSGFuZGxlciIsImdldCQxIiwibm9kZVVSTEhhbmRsZXIiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsInN1cHBvcnRlZCQxIiwiZ2V0JDIiLCJvdmVycmlkZU1pbWVUeXBlIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlWE1MIiwic3RhdHVzVGV4dCIsIlhIUlVSTEhhbmRsZXIiLCJnZXQkMyIsInVybEhhbmRsZXIiLCJWQVNUUmVzcG9uc2UiLCJERUZBVUxUX01BWF9XUkFQUEVSX0RFUFRIIiwiREVGQVVMVF9FVkVOVF9EQVRBIiwiVkFTVFBhcnNlciIsInJlbWFpbmluZ0FkcyIsInBhcmVudFVSTHMiLCJyb290RXJyb3JVUkxUZW1wbGF0ZXMiLCJtYXhXcmFwcGVyRGVwdGgiLCJVUkxUZW1wbGF0ZUZpbHRlcnMiLCJmZXRjaGluZ09wdGlvbnMiLCJ3cmFwcGVyRGVwdGgiLCJvcmlnaW5hbFVybCIsInJvb3RVUkwiLCJ3cmFwcGVyTGltaXQiLCJ1cmxoYW5kbGVyIiwic2hpZnQiLCJyZXNvbHZlQWRzIiwiYnVpbGRWQVNUUmVzcG9uc2UiLCJpbml0UGFyc2luZ1N0YXR1cyIsImZldGNoVkFTVCIsImlzUm9vdFZBU1QiLCJwYXJzZSIsImdldEVycm9yVVJMVGVtcGxhdGVzIiwiY29tcGxldGVXcmFwcGVyUmVzb2x2aW5nIiwicmVzb2x2ZUFsbCIsIndyYXBwZXJTZXF1ZW5jZSIsImRvY3VtZW50RWxlbWVudCIsInRyYWNrVmFzdEVycm9yIiwicmVzb2x2ZVdyYXBwZXJzIiwiYWxsIiwiZXJyb3JDb2RlIiwiZXJyb3JNZXNzYWdlIiwiRVJST1JNRVNTQUdFIiwic3BsaWNlIiwic3RvcmFnZSIsIkRFRkFVTFRfU1RPUkFHRSIsImdldEl0ZW0iLCJzZXRJdGVtIiwicmVtb3ZlSXRlbSIsImNsZWFyIiwiU3RvcmFnZSIsImluaXRTdG9yYWdlIiwibG9jYWxTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJpc1N0b3JhZ2VEaXNhYmxlZCIsImNhcHBpbmdGcmVlTHVuY2giLCJjYXBwaW5nTWluaW11bVRpbWVJbnRlcnZhbCIsImRlZmF1bHRPcHRpb25zIiwidmFzdFBhcnNlciIsImxhc3RTdWNjZXNzZnVsQWQiLCJ0b3RhbENhbGxzIiwidG90YWxDYWxsc1RpbWVvdXQiLCJnZXRSZW1haW5pbmdBZHMiLCJub3ciLCJoYXNPd25Qcm9wZXJ0eSIsImdldEFuZFBhcnNlVkFTVCIsIkRFRkFVTFRfU0tJUF9ERUxBWSIsImNyZWF0aXZlIiwidmFyaWF0aW9uIiwiaW1wcmVzc2VkIiwiX2FscmVhZHlUcmlnZ2VyZWRRdWFydGlsZXMiLCJlbWl0QWx3YXlzRXZlbnRzIiwiX2luaXRMaW5lYXJUcmFja2luZyIsIl9pbml0VmFyaWF0aW9uVHJhY2tpbmciLCJsaW5lYXIiLCJzZXREdXJhdGlvbiIsImNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlIiwiY2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyIsImFzc2V0RHVyYXRpb24iLCJxdWFydGlsZXMiLCJmaXJzdFF1YXJ0aWxlIiwibWlkcG9pbnQiLCJ0aGlyZFF1YXJ0aWxlIiwiaXNRdWFydGlsZVJlYWNoZWQiLCJwcm9ncmVzcyIsInBhdXNlZCIsImZ1bGxzY3JlZW4iLCJleHBhbmRlZCIsInRyYWNrVVJMcyIsInByb2dyZXNzRm9ybWF0dGVkIiwiY2xvc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBY0EsSUFBTUEsS0FBSyxTQUFMQSxFQUFLLENBQVNDLE9BQVQsRUFBa0JDLFFBQWxCLEVBQTRCQyxZQUE1QixFQUEwQ0MsUUFBMUMsRUFBb0RDLGFBQXBELEVBQWtFO0FBQ3pFO0FBQ0EsUUFBTUMsdUJBQXVCLG9CQUE3QjtBQUNBLFFBQU1DLHlCQUF5Qix5QkFBL0I7QUFDQSxRQUFJQyxxQkFBcUIsRUFBekI7QUFDQSxRQUFJQyxXQUFXLEVBQWY7O0FBRUEsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsT0FBTztBQUNQQyxpQkFBUyxLQURGLEVBQ1M7QUFDaEJDLGdCQUFTLEtBRkYsRUFFUztBQUNoQkMsc0JBQWU7QUFIUixLQUFYO0FBS0EsUUFBSUMsa0JBQWtCLElBQXRCO0FBQ0EsUUFBSUMsWUFBWSxJQUFoQjs7QUFFQSxRQUFJQyxxQkFBcUIsSUFBekI7QUFDQSxRQUFJQyxZQUFZLElBQWhCO0FBQ0EsUUFBSUMsYUFBYSxJQUFqQjtBQUNBLFFBQUlDLFdBQVcsSUFBZjtBQUNBLFFBQUlDLGFBQWEsSUFBakI7QUFDQSxRQUFJQyxrQkFBa0IsS0FBdEI7QUFBQSxRQUE2QkMsd0JBQXdCLEtBQXJEO0FBQ0EsUUFBSUMsVUFBVXZCLGFBQWF3QixVQUFiLEVBQWQ7QUFD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QVc0UyxVLEdBQUFBLFU7UUFBV3JTLFcsR0FBQUEsVyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMDgvMDQvMjAxOS5cbiAqL1xuaW1wb3J0IEFkc0V2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvYWRzL2ltYS9MaXN0ZW5lclwiO1xuaW1wb3J0IHtURU1QX1ZJREVPX1VSTH0gZnJvbSBcImFwaS9hZHMvdXRpbHNcIjtcbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgRVJST1IsIEVSUk9SUyxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIElOSVRfQURTX0VSUk9SLFxuICAgIFNUQVRFX0FEX0VSUk9SLFxuICAgIFBMQVlFUl9XQVJOSU5HLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBXQVJOX01TR19NVVRFRFBMQVksXG4gICAgU1RBVEVfQURfTE9BRElORyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFVJX0lDT05TXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IEFkID0gZnVuY3Rpb24oZWxWaWRlbywgcHJvdmlkZXIsIHBsYXllckNvbmZpZywgYWRUYWdVcmwsIGVycm9yQ2FsbGJhY2spe1xuICAgIC8vVG9kbyA6IG1vdmUgY3JlYXRlQWRDb250YWluZXIgdG8gTWVkaWFNYW5hZ2VyXG4gICAgY29uc3QgQVVUT1BMQVlfTk9UX0FMTE9XRUQgPSBcImF1dG9wbGF5Tm90QWxsb3dlZFwiO1xuICAgIGNvbnN0IEFETUFOR0VSX0xPQURJTkdfRVJST1IgPSBcImFkbWFuYWdlckxvYWRpbmdUaW1lb3V0XCI7XG4gICAgbGV0IEFEU19NQU5BR0VSX0xPQURFRCA9IFwiXCI7XG4gICAgbGV0IEFEX0VSUk9SID0gXCJcIjtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGFkc01hbmFnZXJMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgYWRzRXJyb3JPY2N1cnJlZCA9IGZhbHNlO1xuICAgIGxldCBzcGVjID0ge1xuICAgICAgICBzdGFydGVkOiBmYWxzZSwgLy9wbGF5ZXIgc3RhcnRlZFxuICAgICAgICBhY3RpdmUgOiBmYWxzZSwgLy9vbiBBZFxuICAgICAgICBpc1ZpZGVvRW5kZWQgOiBmYWxzZVxuICAgIH07XG4gICAgbGV0IE9uTWFuYWdlckxvYWRlZCA9IG51bGw7XG4gICAgbGV0IE9uQWRFcnJvciA9IG51bGw7XG5cbiAgICBsZXQgYWREaXNwbGF5Q29udGFpbmVyID0gbnVsbDtcbiAgICBsZXQgYWRzTG9hZGVyID0gbnVsbDtcbiAgICBsZXQgYWRzTWFuYWdlciA9IG51bGw7XG4gICAgbGV0IGxpc3RlbmVyID0gbnVsbDtcbiAgICBsZXQgYWRzUmVxdWVzdCA9IG51bGw7XG4gICAgbGV0IGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlLCBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICBsZXQgYnJvd3NlciA9IHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCk7XG4gICAgbGV0IGlzTW9iaWxlID0gYnJvd3Nlci5vcyA9PT0gXCJBbmRyb2lkXCIgfHwgYnJvd3Nlci5vcyA9PT0gXCJpT1NcIjtcblxuICAgIGxldCBhZERpc3BsYXlDb250YWluZXJJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgLy8gZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRBdXRvUGxheUFkQnJlYWtzKGZhbHNlKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuXG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldExvY2FsZSgna28nKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXModHJ1ZSk7XG4gICAgY29uc3Qgc2VuZFdhcm5pbmdNZXNzYWdlRm9yTXV0ZWRQbGF5ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZRVJfV0FSTklORywge1xuICAgICAgICAgICAgbWVzc2FnZSA6IFdBUk5fTVNHX01VVEVEUExBWSxcbiAgICAgICAgICAgIHRpbWVyIDogMTAgKiAxMDAwLFxuICAgICAgICAgICAgaWNvbkNsYXNzIDogVUlfSUNPTlMudm9sdW1lX211dGUsXG4gICAgICAgICAgICBvbkNsaWNrQ2FsbGJhY2sgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldE11dGUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IHN0YXJ0ZWQgXCIsIFwiaXNNb2JpbGUgOiBcIiwgaXNNb2JpbGUsIGFkVGFnVXJsKTtcblxuICAgIHRyeXtcbiAgICAgICAgQURTX01BTkFHRVJfTE9BREVEID0gZ29vZ2xlLmltYS5BZHNNYW5hZ2VyTG9hZGVkRXZlbnQuVHlwZS5BRFNfTUFOQUdFUl9MT0FERUQ7XG4gICAgICAgIEFEX0VSUk9SID0gZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUjtcbiAgICAgICAgZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUoXCJrb1wiKTtcbiAgICAgICAgZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXModHJ1ZSk7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3AtYWRzJyk7XG4gICAgICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ29wLWFkcycpO1xuICAgICAgICAgICAgcGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpLmFwcGVuZChhZENvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcbiAgICAgICAgfTtcbiAgICAgICAgT25BZEVycm9yID0gZnVuY3Rpb24oYWRFcnJvckV2ZW50KXtcbiAgICAgICAgICAgIC8vbm90ZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldElubmVyRXJyb3IoKS5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSAmIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSA9PT0gNDAwIGlzIEJyb3dzZXIgVXNlciBJbnRlcmFjdGl2ZSBlcnJvci5cblxuICAgICAgICAgICAgLy9EbyBub3QgdHJpZ2dlcmluZyBFUlJPUi4gYmVjdWFzZSBJdCBqdXN0IEFEIVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRWYXN0RXJyb3JDb2RlKCksIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldE1lc3NhZ2UoKSk7XG4gICAgICAgICAgICBhZHNFcnJvck9jY3VycmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBpbm5lckVycm9yID0gYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpO1xuICAgICAgICAgICAgaWYoaW5uZXJFcnJvcil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5uZXJFcnJvci5nZXRFcnJvckNvZGUoKSwgaW5uZXJFcnJvci5nZXRNZXNzYWdlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyppZiAoYWRzTWFuYWdlcikge1xuICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfSovXG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0VSUk9SLCB7Y29kZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSAsIG1lc3NhZ2UgOiBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRNZXNzYWdlKCl9KTtcbiAgICAgICAgICAgIHNwZWMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuXG4gICAgICAgICAgICAvKmlmKGlubmVyRXJyb3IgJiYgaW5uZXJFcnJvci5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSl7XG4gICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICB9Ki9cblxuXG4gICAgICAgIH07XG4gICAgICAgIE9uTWFuYWdlckxvYWRlZCA9IGZ1bmN0aW9uKGFkc01hbmFnZXJMb2FkZWRFdmVudCl7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IE9uTWFuYWdlckxvYWRlZCBcIik7XG4gICAgICAgICAgICBsZXQgYWRzUmVuZGVyaW5nU2V0dGluZ3MgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZW5kZXJpbmdTZXR0aW5ncygpO1xuICAgICAgICAgICAgYWRzUmVuZGVyaW5nU2V0dGluZ3MucmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICAvL2Fkc1JlbmRlcmluZ1NldHRpbmdzLnVzZVN0eWxlZE5vbkxpbmVhckFkcyA9IHRydWU7XG4gICAgICAgICAgICBpZihhZHNNYW5hZ2VyKXtcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBkZXN0cm95IGFkc01hbmFnZXItLS0tXCIpO1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgYWRzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgYWRzTWFuYWdlciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZHNNYW5hZ2VyID0gYWRzTWFuYWdlckxvYWRlZEV2ZW50LmdldEFkc01hbmFnZXIoZWxWaWRlbywgYWRzUmVuZGVyaW5nU2V0dGluZ3MpO1xuXG4gICAgICAgICAgICBsaXN0ZW5lciA9IEFkc0V2ZW50c0xpc3RlbmVyKGFkc01hbmFnZXIsIHByb3ZpZGVyLCBzcGVjLCBPbkFkRXJyb3IpO1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBjcmVhdGVkIGFkbWFuYWdlciBhbmQgbGlzdG5lciBcIik7XG5cbiAgICAgICAgICAgIGFkc01hbmFnZXJMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBsZXQgYWRDb25hdGluZXJFbG1lbnQgPSBjcmVhdGVBZENvbnRhaW5lcigpO1xuICAgICAgICBhZERpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIoYWRDb25hdGluZXJFbG1lbnQsIGVsVmlkZW8pO1xuICAgICAgICBhZHNMb2FkZXIgPSBuZXcgZ29vZ2xlLmltYS5BZHNMb2FkZXIoYWREaXNwbGF5Q29udGFpbmVyKTtcblxuICAgICAgICBhZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBRFNfTUFOQUdFUl9MT0FERUQsIE9uTWFuYWdlckxvYWRlZCwgZmFsc2UpO1xuICAgICAgICBhZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBRF9FUlJPUiwgT25BZEVycm9yLCBmYWxzZSk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogYWREaXNwbGF5Q29udGFpbmVyIGluaXRpYWxpemVkXCIpO1xuICAgICAgICBwcm92aWRlci5vbihDT05URU5UX1ZPTFVNRSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYoYWRzTWFuYWdlcil7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5tdXRlKXtcbiAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zZXRWb2x1bWUoMCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc2V0Vm9sdW1lKGRhdGEudm9sdW1lLzEwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGF0KTtcblxuICAgICAgICBjb25zdCBzZXRBdXRvUGxheVRvQWRzUmVxdWVzdCA9IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgaWYoYWRzUmVxdWVzdCl7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogc2V0QURXaWxsQXV0b1BsYXkgXCIsIFwiYXV0b3BsYXlBbGxvd2VkXCIsYXV0b3BsYXlBbGxvd2VkLCBcImF1dG9wbGF5UmVxdWlyZXNNdXRlZFwiLGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XG5cbiAgICAgICAgICAgICAgICBhZHNSZXF1ZXN0LnNldEFkV2lsbEF1dG9QbGF5KGF1dG9wbGF5QWxsb3dlZCk7XG4gICAgICAgICAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxQbGF5TXV0ZWQoYXV0b3BsYXlSZXF1aXJlc011dGVkKTtcbiAgICAgICAgICAgICAgICBpZihhdXRvcGxheVJlcXVpcmVzTXV0ZWQpe1xuICAgICAgICAgICAgICAgICAgICBzZW5kV2FybmluZ01lc3NhZ2VGb3JNdXRlZFBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgaW5pdFJlcXVlc3QgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgYWRzTWFuYWdlckxvYWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogaW5pdFJlcXVlc3QoKSBBdXRvUGxheSBTdXBwb3J0IDogXCIsIFwiYXV0b3BsYXlBbGxvd2VkXCIsYXV0b3BsYXlBbGxvd2VkLCBcImF1dG9wbGF5UmVxdWlyZXNNdXRlZFwiLGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XG4gICAgICAgICAgICAvKmlmKGFkc1JlcXVlc3Qpe1xuICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIGFkc1JlcXVlc3QgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgIGFkc1JlcXVlc3QuZm9yY2VOb25MaW5lYXJGdWxsU2xvdCA9IGZhbHNlO1xuICAgICAgICAgICAgLyppZihwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLmJyb3dzZXIgPT09IFwiU2FmYXJpXCIgJiYgcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyA9PT0gXCJpT1NcIiApe1xuICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICBzZXRBdXRvUGxheVRvQWRzUmVxdWVzdCgpO1xuICAgICAgICAgICAgYWRzUmVxdWVzdC5hZFRhZ1VybCA9IGFkVGFnVXJsO1xuXG4gICAgICAgICAgICBhZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IHJlcXVlc3RBZHMgQ29tcGxldGVcIik7XG4gICAgICAgICAgICAvL3R3byB3YXkgd2hhdCBhZCBzdGFydHMuXG4gICAgICAgICAgICAvL2Fkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpOyBvciAgYWRzTWFuYWdlci5zdGFydCgpO1xuICAgICAgICAgICAgLy93aGF0PyB3aHk/PyB3dGg/P1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgY29uc3QgY2hlY2tBdXRvcGxheVN1cHBvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBjaGVja0F1dG9wbGF5U3VwcG9ydCgpIFwiKTtcblxuICAgICAgICAgICAgbGV0IHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpO1xuICAgICAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8uc3JjID0gVEVNUF9WSURFT19VUkw7XG4gICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5sb2FkKCk7XG5cbiAgICAgICAgICAgIC8vRGFzaCBoYXMgYWxyZWFkeSBsb2FkZWQgd2hlbiB0cmlnZ2VyZWQgcHJvdmlkZXIucGxheSgpIGFsd2F5cy5cbiAgICAgICAgICAgIGlmKGlzTW9iaWxlICYmIHByb3ZpZGVyLmdldE5hbWUoKSAhPT0gUFJPVklERVJfREFTSCApe1xuICAgICAgICAgICAgICAgIC8vTWFpbiB2aWRlbyBzZXRzIHVzZXIgZ2VzdHVyZSB3aGVuIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvIHRyaWdnZXJlZCBjaGVja2luZy5cbiAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIERpZmZlcmVudCBicm93c2VyLXNwZWNpZmljIHdheXMgdG8gZGVsaXZlcnkgVUkgdG8gb3RoZXIgZWxlbWVudHMuICBNeSBHdWVzcy4gMjAxOS0wNi0xOVxuICAgICAgICAgICAgKiAgICh0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlbydzIFVzZXIgSW50ZXJhY3Rpb24gZGVsaXZlcnkgdG8gZWxWaWRlby4pXG4gICAgICAgICAgICAqICAgTW9iaWxlIENocm9tZSBXZWJWaWV3IDpcbiAgICAgICAgICAgICogICBZb3UgaGF2ZSB0byBydW4gZWxWaWRlby5sb2FkKCkgd2hlbiB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlbyBpc3N1ZXMgd2l0aGluIDUgc2Vjb25kcyBvZiB1c2VyIGludGVyYWN0aW9uLlxuICAgICAgICAgICAgKlxuICAgICAgICAgICAgKiAgIE1vYmlsZSBpb3Mgc2FmYXJpIDpcbiAgICAgICAgICAgICogICBZb3UgaGF2ZSB0byBydW4gZWxWaWRlby5sb2FkKCkgYmVmb3JlIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvIHJ1biBwbGF5KCkuXG4gICAgICAgICAgICAqICovXG5cbiAgICAgICAgICAgIGNvbnN0IGNsZWFyQW5kUmVwb3J0ID0gZnVuY3Rpb24oX2F1dG9wbGF5QWxsb3dlZCwgX2F1dG9wbGF5UmVxdWlyZXNNdXRlZCl7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gX2F1dG9wbGF5QWxsb3dlZDtcbiAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBfYXV0b3BsYXlSZXF1aXJlc011dGVkO1xuICAgICAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICBzZXRBdXRvUGxheVRvQWRzUmVxdWVzdCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICAgICAgICAgICAgaWYoIXRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBsYXkpe1xuICAgICAgICAgICAgICAgICAgICAvL0kgY2FuJ3QgcmVtZW1iZXIgdGhpcyBjYXNlLi4uXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6ICF0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5XCIpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydCh0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBsYXlQcm9taXNlID0gdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGF1dG8gcGxheSBhbGxvd2VkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBtYWtlIGl0IGhlcmUsIHVubXV0ZWQgYXV0b3BsYXkgd29ya3MuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogYXV0byBwbGF5IGZhaWxlZFwiLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydChmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9EaXNhYmxlIE11dGVkIFBsYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKnRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby52b2x1bWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlQcm9taXNlID0gdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucGxheSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIG1ha2UgaXQgaGVyZSwgbXV0ZWQgYXV0b3BsYXkgd29ya3MgYnV0IHVubXV0ZWQgYXV0b3BsYXkgZG9lcyBub3QuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogbXV0ZWQgYXV0byBwbGF5IHN1Y2Nlc3MuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRNdXRlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydCh0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IG11dGVkIGF1dG8gcGxheSBmYWlsZWRcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsqL1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogcHJvbWlzZSBub3Qgc3VwcG9ydFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vTWF5YmUgdGhpcyBpcyBJRTExLi4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGF0LmlzQWN0aXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMuYWN0aXZlO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LnN0YXJ0ZWQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5zdGFydGVkO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZihzcGVjLnN0YXJ0ZWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIucmVzdW1lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGFkRGlzcGxheUNvbnRhaW5lci5pbml0aWFsaXplKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQWRzTWFuYWdlcklzUmVhZHkgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFkc01hbmFnZXJMb2FkZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGFkIHN0YXJ0IVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmluaXQoXCIxMDAlXCIsIFwiMTAwJVwiLCBnb29nbGUuaW1hLlZpZXdNb2RlLk5PUk1BTCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMuc3RhcnRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhZHNFcnJvck9jY3VycmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihBRE1BTkdFUl9MT0FESU5HX0VSUk9SKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAxNTApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0Fkc01hbmFnZXJJc1JlYWR5LCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoQURNQU5HRVJfTE9BRElOR19FUlJPUikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBdXRvcGxheVN1cHBvcnQoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCAocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkgJiYgIWF1dG9wbGF5QWxsb3dlZCkgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBhdXRvcGxheUFsbG93ZWQgOiBmYWxzZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKEFVVE9QTEFZX05PVF9BTExPV0VEKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQWRzTWFuYWdlcklzUmVhZHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xuICAgICAgICAgICAgYWRzTWFuYWdlci5wYXVzZSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LnZpZGVvRW5kZWRDYWxsYmFjayA9IChjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgLy9saXN0ZW5lci5pc0xpbmVhckFkIDogZ2V0IGN1cnJlbnQgYWQncyBzdGF0dXMgd2hldGhlciBsaW5lYXIgYWQgb3Igbm90LlxuICAgICAgICAgICAgaWYobGlzdGVuZXIgJiYgKGxpc3RlbmVyLmlzQWxsQWRDb21wbGV0ZSgpIHx8ICFsaXN0ZW5lci5pc0xpbmVhckFkKCkpKXtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaygpO1xuICAgICAgICAgICAgfWVsc2UgaWYoYWRzRXJyb3JPY2N1cnJlZCl7XG4gICAgICAgICAgICAgICAgY29tcGxldGVDb250ZW50Q2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vSWYgeW91IG5lZWQgcGxheSB0aGUgcG9zdC1yb2xsLCB5b3UgaGF2ZSB0byBjYWxsIHRvIGFkc0xvYWRlciB3aGVuIGNvbnRlbnRzIHdhcyBjb21wbGV0ZWQuXG4gICAgICAgICAgICAgICAgc3BlYy5pc1ZpZGVvRW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGFkc0xvYWRlci5jb250ZW50Q29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKGFkc0xvYWRlcil7XG4gICAgICAgICAgICAgICAgYWRzTG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQURTX01BTkFHRVJfTE9BREVELCBPbk1hbmFnZXJMb2FkZWQpO1xuICAgICAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEX0VSUk9SLCBPbkFkRXJyb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihhZHNNYW5hZ2VyKXtcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoYWREaXNwbGF5Q29udGFpbmVyKXtcbiAgICAgICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihsaXN0ZW5lcil7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgJGFkcyA9IExBJChwbGF5ZXJDb25maWcuZ2V0Q29udGFpbmVyKCkpLmZpbmQoXCIub3AtYWRzXCIpO1xuICAgICAgICAgICAgaWYoJGFkcyl7XG4gICAgICAgICAgICAgICAgJGFkcy5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvdmlkZXIub2ZmKENPTlRFTlRfVk9MVU1FLCBudWxsLCB0aGF0KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9Y2F0Y2ggKGVycm9yKXtcbiAgICAgICAgLy9sZXQgdGVtcEVycm9yID0gRVJST1JTW0lOSVRfQURTX0VSUk9SXTtcbiAgICAgICAgLy90ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgLy9lcnJvckNhbGxiYWNrKHRlbXBFcnJvcik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IEFkO1xuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAxMC8wNC8yMDE5LlxuICovXG5cbmltcG9ydCB7XG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9BRF9MT0FERUQsXG4gICAgU1RBVEVfQURfUExBWUlORyxcbiAgICBTVEFURV9BRF9QQVVTRUQsXG4gICAgU1RBVEVfQURfQ09NUExFVEUsXG4gICAgQURfQ0hBTkdFRCxcbiAgICBBRF9USU1FLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBQTEFZRVJfQ0xJQ0tFRCxcbiAgICBQTEFZRVJfQURfQ0xJQ0ssXG4gICAgUFJPVklERVJfSFRNTDUsXG4gICAgUFJPVklERVJfV0VCUlRDLFxuICAgIFBST1ZJREVSX0RBU0gsXG4gICAgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oYWRzTWFuYWdlciwgcHJvdmlkZXIsIGFkc1NwZWMsIE9uQWRFcnJvcil7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgbG93TGV2ZWxFdmVudHMgPSB7fTtcblxuICAgIGxldCBpbnRlcnZhbFRpbWVyID0gbnVsbDtcblxuICAgIGNvbnN0IEFEX0JVRkZFUklORyA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFEX0JVRkZFUklORztcbiAgICBjb25zdCBDT05URU5UX1BBVVNFX1JFUVVFU1RFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVEO1xuICAgIGNvbnN0IENPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRDtcbiAgICBjb25zdCBBRF9FUlJPUiA9IGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1I7XG4gICAgY29uc3QgQUxMX0FEU19DT01QTEVURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BTExfQURTX0NPTVBMRVRFRDtcbiAgICBjb25zdCBDTElDSyA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNMSUNLO1xuICAgIGNvbnN0IFNLSVBQRUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TS0lQUEVEO1xuICAgIGNvbnN0IENPTVBMRVRFID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09NUExFVEU7XG4gICAgY29uc3QgRklSU1RfUVVBUlRJTEU9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkZJUlNUX1FVQVJUSUxFO1xuICAgIGNvbnN0IExPQURFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkxPQURFRDtcbiAgICBjb25zdCBNSURQT0lOVD0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTUlEUE9JTlQ7XG4gICAgY29uc3QgUEFVU0VEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUEFVU0VEO1xuICAgIGNvbnN0IFJFU1VNRUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5SRVNVTUVEO1xuICAgIGNvbnN0IFNUQVJURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TVEFSVEVEO1xuICAgIGNvbnN0IFVTRVJfQ0xPU0UgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5VU0VSX0NMT1NFO1xuICAgIGNvbnN0IFRISVJEX1FVQVJUSUxFID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuVEhJUkRfUVVBUlRJTEU7XG5cbiAgICBsZXQgaXNBbGxBZENvbXBlbGV0ZSA9IGZhbHNlOyAgIC8vUG9zdCByb2xs7J2EIOychO2VtFxuICAgIGxldCBhZENvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xuICAgIGxldCBjdXJyZW50QWQgPSBudWxsO1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IExpc3RlbmVyIENyZWF0ZWRcIik7XG4gICAgIGxvd0xldmVsRXZlbnRzW0NPTlRFTlRfUEFVU0VfUkVRVUVTVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgTElTVEVORVIgOiBcIiwgYWRFdmVudC50eXBlKTtcblxuICAgICAgICAgLy9UaGlzIGNhbGxscyB3aGVuIHBsYXllciBpcyBwbGF5aW5nIGNvbnRlbnRzIGZvciBhZC5cbiAgICAgICAgIGlmKGFkc1NwZWMuc3RhcnRlZCl7XG4gICAgICAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG4gICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSBMSVNURU5FUiA6IFwiLCBhZEV2ZW50LnR5cGUpO1xuICAgICAgICAvL1RoaXMgY2FsbHMgd2hlbiBvbmUgYWQgZW5kZWQuXG4gICAgICAgIC8vQW5kIHRoaXMgaXMgc2lnbmFsIHdoYXQgcGxheSB0aGUgY29udGVudHMuXG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkICYmIChwcm92aWRlci5nZXRQb3NpdGlvbigpID09PSAwIHx8ICFhZHNTcGVjLmlzVmlkZW9FbmRlZCkgICl7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQURfRVJST1JdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgaXNBbGxBZENvbXBlbGV0ZSA9IHRydWU7XG4gICAgICAgIE9uQWRFcnJvcihhZEV2ZW50KTtcbiAgICB9IDtcblxuICAgIGxvd0xldmVsRXZlbnRzW0FMTF9BRFNfQ09NUExFVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSBMSVNURU5FUiA6IFwiLCBhZEV2ZW50LnR5cGUpO1xuXG4gICAgICAgIGlzQWxsQWRDb21wZWxldGUgPSB0cnVlO1xuICAgICAgICBpZihhZHNTcGVjLmlzVmlkZW9FbmRlZCl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0NMSUNLXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFBMQVlFUl9DTElDS0VELCB7dHlwZSA6IFBMQVlFUl9BRF9DTElDS30pO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbRklSU1RfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICAvL1xuICAgIGxvd0xldmVsRXZlbnRzW0FEX0JVRkZFUklOR10gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRF9CVUZGRVJJTkdcIixhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbTE9BREVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhhZEV2ZW50LmdldEFkKCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhhZEV2ZW50LmdldEFkRGF0YSgpKTtcbiAgICAgICAgbGV0IHJlbWFpbmluZ1RpbWUgPSBhZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICAvKnZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgdHlwZSA6XCJhZFwiXG4gICAgICAgIH07Ki9cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9MT0FERUQsIHtyZW1haW5pbmcgOiByZW1haW5pbmdUaW1lLCBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgfSk7XG5cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW01JRFBPSU5UXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbUEFVU0VEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QQVVTRUQpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbUkVTVU1FRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHNbU1RBUlRFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBjdXJyZW50QWQgPSBhZDtcblxuICAgICAgICBsZXQgYWRPYmplY3QgPSB7XG4gICAgICAgICAgICBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgLFxuICAgICAgICAgICAgZHVyYXRpb24gOiBhZC5nZXREdXJhdGlvbigpLFxuICAgICAgICAgICAgc2tpcFRpbWVPZmZzZXQgOiBhZC5nZXRTa2lwVGltZU9mZnNldCgpICAgICAvL1RoZSBudW1iZXIgb2Ygc2Vjb25kcyBvZiBwbGF5YmFjayBiZWZvcmUgdGhlIGFkIGJlY29tZXMgc2tpcHBhYmxlLlxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEFEX0NIQU5HRUQsIGFkT2JqZWN0KTtcblxuXG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG5cbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xuICAgICAgICAgICAgYWRzU3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIEZvciBhIGxpbmVhciBhZCwgYSB0aW1lciBjYW4gYmUgc3RhcnRlZCB0byBwb2xsIGZvclxuICAgICAgICAgICAgLy8gdGhlIHJlbWFpbmluZyB0aW1lLlxuICAgICAgICAgICAgaW50ZXJ2YWxUaW1lciA9IHNldEludGVydmFsKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZHVyYXRpb24gPSBhZC5nZXREdXJhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfVElNRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24gOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBUaW1lT2Zmc2V0IDogYWQuZ2V0U2tpcFRpbWVPZmZzZXQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZyA6IHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA6IGR1cmF0aW9uIC0gcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBwYWJsZSA6IGFkc01hbmFnZXIuZ2V0QWRTa2lwcGFibGVTdGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMzAwKTsgLy8gZXZlcnkgMzAwbXNcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0NPTVBMRVRFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgLy9Vc2VyIHNraXBwZWQgYWQuIHNhbWUgcHJvY2VzcyBvbiBjb21wbGV0ZS5cbiAgICBsb3dMZXZlbEV2ZW50c1tTS0lQUEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuXG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tVU0VSX0NMT1NFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbVEhJUkRfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcblxuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuICAgIHRoYXQuc2V0QWRDb21wbGV0ZUNhbGxiYWNrID0gKF9hZENvbXBsZXRlQ2FsbGJhY2spID0+IHtcbiAgICAgICAgYWRDb21wbGV0ZUNhbGxiYWNrID0gX2FkQ29tcGxldGVDYWxsYmFjaztcbiAgICB9O1xuICAgIHRoYXQuaXNBbGxBZENvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaXNBbGxBZENvbXBlbGV0ZTtcbiAgICB9O1xuICAgIHRoYXQuaXNMaW5lYXJBZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRBZCAgPyBjdXJyZW50QWQuaXNMaW5lYXIoKSA6IHRydWU7XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgLy9wcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGFkc01hbmFnZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyNy8wNi8yMDE5LlxuICovXG5leHBvcnQgY29uc3QgVEVNUF9WSURFT19VUkwgPSBcImRhdGE6dmlkZW8vbXA0O2Jhc2U2NCwgQUFBQUhHWjBlWEJOTkZZZ0FBQUNBR2x6YjIxcGMyOHlZWFpqTVFBQUFBaG1jbVZsQUFBR0YyMWtZWFRlQkFBQWJHbGlabUZoWXlBeExqSTRBQUJDQUpNZ0JESUFSd0FBQXJFR0JmLy9yZHhGNmIzbTJVaTNsaXpZSU5rajd1OTRNalkwSUMwZ1kyOXlaU0F4TkRJZ2NqSWdPVFUyWXpoa09DQXRJRWd1TWpZMEwwMVFSVWN0TkNCQlZrTWdZMjlrWldNZ0xTQkRiM0I1YkdWbWRDQXlNREF6TFRJd01UUWdMU0JvZEhSd09pOHZkM2QzTG5acFpHVnZiR0Z1TG05eVp5OTRNalkwTG1oMGJXd2dMU0J2Y0hScGIyNXpPaUJqWVdKaFl6MHdJSEpsWmoweklHUmxZbXh2WTJzOU1Ub3dPakFnWVc1aGJIbHpaVDB3ZURFNk1IZ3hNVEVnYldVOWFHVjRJSE4xWW0xbFBUY2djSE41UFRFZ2NITjVYM0prUFRFdU1EQTZNQzR3TUNCdGFYaGxaRjl5WldZOU1TQnRaVjl5WVc1blpUMHhOaUJqYUhKdmJXRmZiV1U5TVNCMGNtVnNiR2x6UFRFZ09IZzRaR04wUFRBZ1kzRnRQVEFnWkdWaFpIcHZibVU5TWpFc01URWdabUZ6ZEY5d2MydHBjRDB4SUdOb2NtOXRZVjl4Y0Y5dlptWnpaWFE5TFRJZ2RHaHlaV0ZrY3owMklHeHZiMnRoYUdWaFpGOTBhSEpsWVdSelBURWdjMnhwWTJWa1gzUm9jbVZoWkhNOU1DQnVjajB3SUdSbFkybHRZWFJsUFRFZ2FXNTBaWEpzWVdObFpEMHdJR0pzZFhKaGVWOWpiMjF3WVhROU1DQmpiMjV6ZEhKaGFXNWxaRjlwYm5SeVlUMHdJR0ptY21GdFpYTTlNQ0IzWldsbmFIUndQVEFnYTJWNWFXNTBQVEkxTUNCclpYbHBiblJmYldsdVBUSTFJSE5qWlc1bFkzVjBQVFF3SUdsdWRISmhYM0psWm5KbGMyZzlNQ0J5WTE5c2IyOXJZV2hsWVdROU5EQWdjbU05WTNKbUlHMWlkSEpsWlQweElHTnlaajB5TXk0d0lIRmpiMjF3UFRBdU5qQWdjWEJ0YVc0OU1DQnhjRzFoZUQwMk9TQnhjSE4wWlhBOU5DQjJZblpmYldGNGNtRjBaVDAzTmpnZ2RtSjJYMkoxWm5OcGVtVTlNekF3TUNCamNtWmZiV0Y0UFRBdU1DQnVZV3hmYUhKa1BXNXZibVVnWm1sc2JHVnlQVEFnYVhCZmNtRjBhVzg5TVM0ME1DQmhjVDB4T2pFdU1EQUFnQUFBQUZabGlJUUw4bUtBQUt2TW5KeWNuSnljbkp5Y25YWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYaUVBU1pBQ0dRQWpnQ0VBU1pBQ0dRQWpnQUFBQUFkQm1qZ1g0R1NBSVFCSmtBSVpBQ09BQUFBQUIwR2FWQVg0R1NBaEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBQUFBQUdRWnBnTDhESklRQkprQUlaQUNPQUlRQkprQUlaQUNPQUFBQUFCa0dhZ0MvQXlTRUFTWkFDR1FBamdBQUFBQVpCbXFBdndNa2hBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QUFBQUFHUVpyQUw4REpJUUJKa0FJWkFDT0FBQUFBQmtHYTRDL0F5U0VBU1pBQ0dRQWpnQ0VBU1pBQ0dRQWpnQUFBQUFaQm13QXZ3TWtoQUVtUUFoa0FJNEFBQUFBR1Fac2dMOERKSVFCSmtBSVpBQ09BSVFCSmtBSVpBQ09BQUFBQUJrR2JRQy9BeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtMkF2d01raEFFbVFBaGtBSTRBQUFBQUdRWnVBTDhESklRQkprQUlaQUNPQUlRQkprQUlaQUNPQUFBQUFCa0dib0MvQXlTRUFTWkFDR1FBamdBQUFBQVpCbThBdndNa2hBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QUFBQUFHUVp2Z0w4REpJUUJKa0FJWkFDT0FBQUFBQmtHYUFDL0F5U0VBU1pBQ0dRQWpnQ0VBU1pBQ0dRQWpnQUFBQUFaQm1pQXZ3TWtoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFBR1FacEFMOERKSVFCSmtBSVpBQ09BQUFBQUJrR2FZQy9BeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtb0F2d01raEFFbVFBaGtBSTRBQUFBQUdRWnFnTDhESklRQkprQUlaQUNPQUlRQkprQUlaQUNPQUFBQUFCa0dhd0MvQXlTRUFTWkFDR1FBamdBQUFBQVpCbXVBdndNa2hBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QUFBQUFHUVpzQUw4REpJUUJKa0FJWkFDT0FBQUFBQmtHYklDL0F5U0VBU1pBQ0dRQWpnQ0VBU1pBQ0dRQWpnQUFBQUFaQm0wQXZ3TWtoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFBR1FadGdMOERKSVFCSmtBSVpBQ09BQUFBQUJrR2JnQ3ZBeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtNkFud01raEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBQUFBaHViVzl2ZGdBQUFHeHRkbWhrQUFBQUFBQUFBQUFBQUFBQUFBQUQ2QUFBQkRjQUFRQUFBUUFBQUFBQUFBQUFBQUFBQUFFQUFBQUFBQUFBQUFBQUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQXdBQUF6QjBjbUZyQUFBQVhIUnJhR1FBQUFBREFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUEra0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFMQUFBQUNRQUFBQUFBQWtaV1IwY3dBQUFCeGxiSE4wQUFBQUFBQUFBQUVBQUFQcEFBQUFBQUFCQUFBQUFBS29iV1JwWVFBQUFDQnRaR2hrQUFBQUFBQUFBQUFBQUFBQUFBQjFNQUFBZFU1VnhBQUFBQUFBTFdoa2JISUFBQUFBQUFBQUFIWnBaR1VBQUFBQUFBQUFBQUFBQUFCV2FXUmxiMGhoYm1Sc1pYSUFBQUFDVTIxcGJtWUFBQUFVZG0xb1pBQUFBQUVBQUFBQUFBQUFBQUFBQUNSa2FXNW1BQUFBSEdSeVpXWUFBQUFBQUFBQUFRQUFBQXgxY213Z0FBQUFBUUFBQWhOemRHSnNBQUFBcjNOMGMyUUFBQUFBQUFBQUFRQUFBSjloZG1NeEFBQUFBQUFBQUFFQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUxBQWtBQklBQUFBU0FBQUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFHUC8vQUFBQUxXRjJZME1CUXNBTi8rRUFGV2RDd0EzWkFzVHNCRUFBQVBwQUFEcVlBOFVLa2dFQUJXakxnOHNnQUFBQUhIVjFhV1JyYUVEeVh5UlB4Ym81cFJ2UEF5UHpBQUFBQUFBQUFCaHpkSFJ6QUFBQUFBQUFBQUVBQUFBZUFBQUQ2UUFBQUJSemRITnpBQUFBQUFBQUFBRUFBQUFCQUFBQUhITjBjMk1BQUFBQUFBQUFBUUFBQUFFQUFBQUJBQUFBQVFBQUFJeHpkSE42QUFBQUFBQUFBQUFBQUFBZUFBQUREd0FBQUFzQUFBQUxBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBaUhOMFkyOEFBQUFBQUFBQUhnQUFBRVlBQUFObkFBQURld0FBQTVnQUFBTzBBQUFEeHdBQUErTUFBQVAyQUFBRUVnQUFCQ1VBQUFSQkFBQUVYUUFBQkhBQUFBU01BQUFFbndBQUJMc0FBQVRPQUFBRTZnQUFCUVlBQUFVWkFBQUZOUUFBQlVnQUFBVmtBQUFGZHdBQUJaTUFBQVdtQUFBRndnQUFCZDRBQUFYeEFBQUdEUUFBQkdoMGNtRnJBQUFBWEhScmFHUUFBQUFEQUFBQUFBQUFBQUFBQUFBQ0FBQUFBQUFBQkRjQUFBQUFBQUFBQUFBQUFBRUJBQUFBQUFFQUFBQUFBQUFBQUFBQUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUFBa1pXUjBjd0FBQUJ4bGJITjBBQUFBQUFBQUFBRUFBQVFrQUFBRGNBQUJBQUFBQUFQZ2JXUnBZUUFBQUNCdFpHaGtBQUFBQUFBQUFBQUFBQUFBQUFDN2dBQUF5a0JWeEFBQUFBQUFMV2hrYkhJQUFBQUFBQUFBQUhOdmRXNEFBQUFBQUFBQUFBQUFBQUJUYjNWdVpFaGhibVJzWlhJQUFBQURpMjFwYm1ZQUFBQVFjMjFvWkFBQUFBQUFBQUFBQUFBQUpHUnBibVlBQUFBY1pISmxaZ0FBQUFBQUFBQUJBQUFBREhWeWJDQUFBQUFCQUFBRFQzTjBZbXdBQUFCbmMzUnpaQUFBQUFBQUFBQUJBQUFBVjIxd05HRUFBQUFBQUFBQUFRQUFBQUFBQUFBQUFBSUFFQUFBQUFDN2dBQUFBQUFBTTJWelpITUFBQUFBQTRDQWdDSUFBZ0FFZ0lDQUZFQVZCYmpZQUF1NEFBQUFEY29GZ0lDQUFoR1FCb0NBZ0FFQ0FBQUFJSE4wZEhNQUFBQUFBQUFBQWdBQUFESUFBQVFBQUFBQUFRQUFBa0FBQUFGVWMzUnpZd0FBQUFBQUFBQWJBQUFBQVFBQUFBRUFBQUFCQUFBQUFnQUFBQUlBQUFBQkFBQUFBd0FBQUFFQUFBQUJBQUFBQkFBQUFBSUFBQUFCQUFBQUJnQUFBQUVBQUFBQkFBQUFCd0FBQUFJQUFBQUJBQUFBQ0FBQUFBRUFBQUFCQUFBQUNRQUFBQUlBQUFBQkFBQUFDZ0FBQUFFQUFBQUJBQUFBQ3dBQUFBSUFBQUFCQUFBQURRQUFBQUVBQUFBQkFBQUFEZ0FBQUFJQUFBQUJBQUFBRHdBQUFBRUFBQUFCQUFBQUVBQUFBQUlBQUFBQkFBQUFFUUFBQUFFQUFBQUJBQUFBRWdBQUFBSUFBQUFCQUFBQUZBQUFBQUVBQUFBQkFBQUFGUUFBQUFJQUFBQUJBQUFBRmdBQUFBRUFBQUFCQUFBQUZ3QUFBQUlBQUFBQkFBQUFHQUFBQUFFQUFBQUJBQUFBR1FBQUFBSUFBQUFCQUFBQUdnQUFBQUVBQUFBQkFBQUFHd0FBQUFJQUFBQUJBQUFBSFFBQUFBRUFBQUFCQUFBQUhnQUFBQUlBQUFBQkFBQUFId0FBQUFRQUFBQUJBQUFBNEhOMGMzb0FBQUFBQUFBQUFBQUFBRE1BQUFBYUFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUNNYzNSamJ3QUFBQUFBQUFBZkFBQUFMQUFBQTFVQUFBTnlBQUFEaGdBQUE2SUFBQU8rQUFBRDBRQUFBKzBBQUFRQUFBQUVIQUFBQkM4QUFBUkxBQUFFWndBQUJIb0FBQVNXQUFBRXFRQUFCTVVBQUFUWUFBQUU5QUFBQlJBQUFBVWpBQUFGUHdBQUJWSUFBQVZ1QUFBRmdRQUFCWjBBQUFXd0FBQUZ6QUFBQmVnQUFBWDdBQUFHRndBQUFHSjFaSFJoQUFBQVdtMWxkR0VBQUFBQUFBQUFJV2hrYkhJQUFBQUFBQUFBQUcxa2FYSmhjSEJzQUFBQUFBQUFBQUFBQUFBQUxXbHNjM1FBQUFBbHFYUnZid0FBQUIxa1lYUmhBQUFBQVFBQUFBQk1ZWFptTlRVdU16TXVNVEF3XCI7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyNS8wNi8yMDE5LlxuICovXG5cbmltcG9ydCB7IFZBU1RDbGllbnQsIFZBU1RUcmFja2VyIH0gZnJvbSAndXRpbHMvdmFzdC1jbGllbnQnO1xuaW1wb3J0IEFkc0V2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvYWRzL3Zhc3QvTGlzdGVuZXJcIjtcbmltcG9ydCB7VEVNUF9WSURFT19VUkx9IGZyb20gXCJhcGkvYWRzL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfQURfTE9BREVELFxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXG4gICAgU1RBVEVfQURfUEFVU0VELFxuICAgIFNUQVRFX0FEX0NPTVBMRVRFLFxuICAgIFNUQVRFX0FEX0VSUk9SLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQUk9WSURFUl9EQVNIXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IEFkID0gZnVuY3Rpb24oZWxWaWRlbywgcHJvdmlkZXIsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpe1xuICAgIGNvbnN0IEFVVE9QTEFZX05PVF9BTExPV0VEID0gXCJhdXRvcGxheU5vdEFsbG93ZWRcIjtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IHNwZWMgPSB7XG4gICAgICAgIHN0YXJ0ZWQ6IGZhbHNlLCAvL3BsYXllciBzdGFydGVkXG4gICAgICAgIGFjdGl2ZSA6IGZhbHNlLCAvL29uIEFkXG4gICAgICAgIGlzVmlkZW9FbmRlZCA6IGZhbHNlXG4gICAgfTtcbiAgICBsZXQgYWRzRXJyb3JPY2N1cnJlZCA9IGZhbHNlO1xuICAgIGxldCBsaXN0ZW5lciA9IG51bGw7XG5cbiAgICBsZXQgY29udGFpbmVyID0gXCJcIjtcbiAgICBsZXQgZWxBZFZpZGVvID0gbnVsbDtcbiAgICBsZXQgdGV4dFZpZXcgPSBcIlwiO1xuICAgIGxldCBhZEJ1dHRvbiA9IFwiXCI7XG5cbiAgICBsZXQgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2UsIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgIGxldCBicm93c2VyID0gcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKTtcbiAgICBsZXQgaXNNb2JpbGUgPSBicm93c2VyLm9zID09PSBcIkFuZHJvaWRcIiB8fCBicm93c2VyLm9zID09PSBcImlPU1wiO1xuXG4gICAgY29uc3QgY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ29wLWFkcycpO1xuICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ29wLWFkcycpO1xuICAgICAgICBwbGF5ZXJDb25maWcuZ2V0Q29udGFpbmVyKCkuYXBwZW5kKGFkQ29udGFpbmVyKTtcblxuICAgICAgICBlbEFkVmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICBlbEFkVmlkZW8uc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XG4gICAgICAgIGVsQWRWaWRlby5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ0FkdmVydGlzZW1lbnQnKTtcbiAgICAgICAgZWxBZFZpZGVvLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3AtYWRzLXZhc3QtdmlkZW8nKTtcblxuICAgICAgICBhZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ29wLWFkcy1idXR0b24nKTtcblxuICAgICAgICB0ZXh0VmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0ZXh0Vmlldy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ29wLWFkcy10ZXh0dmlldycpO1xuXG4gICAgICAgIGFkQnV0dG9uLmFwcGVuZCh0ZXh0Vmlldyk7XG4gICAgICAgIGFkQ29udGFpbmVyLmFwcGVuZChlbEFkVmlkZW8pO1xuICAgICAgICBhZENvbnRhaW5lci5hcHBlbmQoYWRCdXR0b24pO1xuXG4gICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcbiAgICB9O1xuXG4gICAgY29udGFpbmVyID0gY3JlYXRlQWRDb250YWluZXIoKTtcblxuICAgIGxldCB2YXN0Q2xpZW50ID0gbmV3IFZBU1RDbGllbnQoKTtcbiAgICBsZXQgdmFzdFRyYWNrZXIgPSBudWxsO1xuICAgIGxldCBhZCA9IG51bGw7XG5cblxuICAgIGNvbnN0IE9uQWRFcnJvciA9IGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICBhZHNFcnJvck9jY3VycmVkID0gdHJ1ZTtcbiAgICAgICAgZWxBZFZpZGVvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9FUlJPUiwge2NvZGUgOiBlcnJvci5jb2RlLCBtZXNzYWdlIDogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgICBzcGVjLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGluaXRSZXF1ZXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXN0Q2xpZW50LmdldChhZFRhZ1VybCkgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHRoZSBwYXJzZWQgVkFTVCByZXNwb25zZVxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGluaXRSZXF1ZXN0KClcIik7XG4gICAgICAgICAgICBhZCA9IHJlcy5hZHNbMF07XG4gICAgICAgICAgICBpZighYWQpe1xuICAgICAgICAgICAgICAgIHRocm93IHtjb2RlIDogNDAxLCBtZXNzYWdlIDogXCJGaWxlIG5vdCBmb3VuZC4gVW5hYmxlIHRvIGZpbmQgTGluZWFyL01lZGlhRmlsZSBmcm9tIFVSSS5cIn07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXN0VHJhY2tlciA9IG5ldyBWQVNUVHJhY2tlcih2YXN0Q2xpZW50LCBhZCwgYWQuY3JlYXRpdmVzWzBdKTtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGNyZWF0ZWQgYWQgdHJhY2tlci5cIik7XG5cbiAgICAgICAgICAgIGxpc3RlbmVyID0gQWRzRXZlbnRzTGlzdGVuZXIoZWxBZFZpZGVvLCB2YXN0VHJhY2tlciwgcHJvdmlkZXIsIHNwZWMsIGFkQnV0dG9uLCB0ZXh0VmlldywgT25BZEVycm9yKTtcblxuICAgICAgICAgICAgbGV0IHZpZGVvVVJMID0gIFwiXCI7XG4gICAgICAgICAgICBpZihhZC5jcmVhdGl2ZXMgJiYgYWQuY3JlYXRpdmVzLmxlbmd0aCA+IDAgJiYgYWQuY3JlYXRpdmVzWzBdLm1lZGlhRmlsZXMgJiYgYWQuY3JlYXRpdmVzWzBdLm1lZGlhRmlsZXMubGVuZ3RoID4gMCAmJiBhZC5jcmVhdGl2ZXNbMF0ubWVkaWFGaWxlc1swXS5maWxlVVJMKXtcbiAgICAgICAgICAgICAgICB2aWRlb1VSTCA9IGFkLmNyZWF0aXZlc1swXS5tZWRpYUZpbGVzWzBdLmZpbGVVUkw7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IG1lZGlhIHVybCA6IFwiLCB2aWRlb1VSTCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbEFkVmlkZW8uc3JjID0gdmlkZW9VUkw7XG5cbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgT25BZEVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG5cblxuICAgIGNvbnN0IGNoZWNrQXV0b3BsYXlTdXBwb3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogY2hlY2tBdXRvcGxheVN1cHBvcnQoKSBcIik7XG5cbiAgICAgICAgbGV0IHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8uc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XG4gICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnNyYyA9IFRFTVBfVklERU9fVVJMO1xuICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5sb2FkKCk7XG5cblxuICAgICAgICBlbEFkVmlkZW8ubG9hZCgpOyAgIC8vZm9yIGlvcyBVc2VyIEludGVyYWN0aW9uIHByb2JsZW1cbiAgICAgICAgLy9EYXNoIGhhcyBhbHJlYWR5IGxvYWRlZCB3aGVuIHRyaWdnZXJlZCBwcm92aWRlci5wbGF5KCkgYWx3YXlzLlxuICAgICAgICBpZihpc01vYmlsZSAmJiBwcm92aWRlci5nZXROYW1lKCkgIT09IFBST1ZJREVSX0RBU0ggKXtcbiAgICAgICAgICAgIC8vTWFpbiB2aWRlbyBzZXRzIHVzZXIgZ2VzdHVyZSB3aGVuIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvIHRyaWdnZXJlZCBjaGVja2luZy5cbiAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNsZWFyQW5kUmVwb3J0ID0gZnVuY3Rpb24oX2F1dG9wbGF5QWxsb3dlZCwgX2F1dG9wbGF5UmVxdWlyZXNNdXRlZCl7XG4gICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBfYXV0b3BsYXlBbGxvd2VkO1xuICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gX2F1dG9wbGF5UmVxdWlyZXNNdXRlZDtcbiAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5yZW1vdmUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgICAgIGlmKCF0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5KXtcbiAgICAgICAgICAgICAgICAvL0kgY2FuJ3QgcmVtZW1iZXIgdGhpcyBjYXNlLi4uXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6ICF0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5XCIpO1xuICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgcGxheVByb21pc2UgPSB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXlQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGF1dG8gcGxheSBhbGxvd2VkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIG1ha2UgaXQgaGVyZSwgdW5tdXRlZCBhdXRvcGxheSB3b3Jrcy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGF1dG8gcGxheSBmYWlsZWRcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydChmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IHByb21pc2Ugbm90IHN1cHBvcnRcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vTWF5YmUgdGhpcyBpcyBJRTExLi4uLlxuICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydCh0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB0aGF0LmlzQWN0aXZlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5hY3RpdmU7XG4gICAgfTtcbiAgICB0aGF0LnN0YXJ0ZWQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnN0YXJ0ZWQ7XG4gICAgfTtcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XG4gICAgICAgIGlmKHNwZWMuc3RhcnRlZCl7XG4gICAgICAgICAgICByZXR1cm4gZWxBZFZpZGVvLnBsYXkoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tNYWluQ29udGVudExvYWRlZCA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgICAgICAgICAgLy93YWl0IGZvciBtYWluIGNvbnRlbnRzIG1ldGEgbG9hZGVkLlxuICAgICAgICAgICAgICAgICAgICAvL2hhdmUgdG8gdHJpZ2dlciBDT05URU5UX01FVEEgZmlyc3QuIG5leHQgdHJpZ2dlciBBRF9DSEFOR0VELlxuICAgICAgICAgICAgICAgICAgICAvL2luaXRDb250cm9sVUkgZmlyc3QgLT4gIGluaXQgYWQgVUlcbiAgICAgICAgICAgICAgICAgICAgLy9NYXliZSBnb29nbGUgaW1hIHdhaXRzIGNvbnRlbnQgbG9hZGVkIGludGVybmFsLlxuICAgICAgICAgICAgICAgICAgICBpZihwcm92aWRlci5tZXRhTG9hZGVkKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IG1haW4gY29udGVudHMgbWV0YSBsb2FkZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBdXRvcGxheVN1cHBvcnQoKS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIChwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSAmJiAhYXV0b3BsYXlBbGxvd2VkKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogYXV0b3BsYXlBbGxvd2VkIDogZmFsc2VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKEFVVE9QTEFZX05PVF9BTExPV0VEKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja01haW5Db250ZW50TG9hZGVkLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNoZWNrTWFpbkNvbnRlbnRMb2FkZWQoKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIGVsQWRWaWRlby5wYXVzZSgpO1xuICAgIH07XG5cbiAgICAvL0VuZCBPZiBNYWluIENvbnRlbnRzLlxuICAgIHRoYXQudmlkZW9FbmRlZENhbGxiYWNrID0gKGNvbXBsZXRlQ29udGVudENhbGxiYWNrKSA9PiB7XG5cbiAgICAgICAgY29tcGxldGVDb250ZW50Q2FsbGJhY2soKTtcbiAgICAgICAgLy9jaGVjayB0cnVlIHdoZW4gbWFpbiBjb250ZW50cyBlbmRlZC5cbiAgICAgICAgc3BlYy5pc1ZpZGVvRW5kZWQgPSB0cnVlO1xuICAgIH07XG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICBpZihsaXN0ZW5lcil7XG4gICAgICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XG4gICAgICAgICAgICBsaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFzdFRyYWNrZXIgPSBudWxsO1xuICAgICAgICB2YXN0Q2xpZW50ID0gbnVsbDtcblxuICAgICAgICBjb250YWluZXIucmVtb3ZlKCk7XG5cbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQWQ7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjYvMDYvMjAxOS5cbiAqL1xuaW1wb3J0IHtcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX0FEX0xPQURFRCxcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBTVEFURV9BRF9DT01QTEVURSxcbiAgICBBRF9DSEFOR0VELFxuICAgIEFEX1RJTUUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUExBWUVSX1NUQVRFLFxuICAgIFBMQVlFUl9DTElDS0VELFxuICAgIFBMQVlFUl9BRF9DTElDSyxcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGVsQWRWaWRlbywgdmFzdFRyYWNrZXIsIHByb3ZpZGVyLCBhZHNTcGVjLCBhZEJ1dHRvbiwgdGV4dFZpZXcsIE9uQWRFcnJvcil7XG4gICAgY29uc3QgbG93TGV2ZWxFdmVudHMgPSB7fTtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGNvbnN0IE1FRElBRklMRV9QTEFZQkFDS19FUlJPUiA9ICc0MDUnO1xuXG4gICAgbGV0ICR0ZXh0VmlldyA9IExBJCh0ZXh0Vmlldyk7XG4gICAgbGV0ICRhZEJ1dHRvbiA9IExBJChhZEJ1dHRvbik7XG4gICAgbGV0ICRlbEFkVmlkZW8gPSBMQSQoZWxBZFZpZGVvKTtcblxuXG4gICAgcHJvdmlkZXIub24oQ09OVEVOVF9WT0xVTUUsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgaWYoZGF0YS5tdXRlKXtcbiAgICAgICAgICAgIGVsQWRWaWRlby5tdXRlZCA9IHRydWU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZWxBZFZpZGVvLm11dGVkID0gZmFsc2U7XG4gICAgICAgICAgICBlbEFkVmlkZW8udm9sdW1lID0gZGF0YS52b2x1bWUvMTAwO1xuICAgICAgICB9XG4gICAgfSwgdGhhdCk7XG5cbiAgICAvL0xpa2UgYSBDT05URU5UX1JFU1VNRV9SRVFVRVNURURcbiAgICBjb25zdCBwcm9jZXNzRW5kT2ZBZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgJGFkQnV0dG9uLmhpZGUoKTtcblxuICAgICAgICBpZihhZHNTcGVjLnN0YXJ0ZWQgJiYgKHByb3ZpZGVyLmdldFBvc2l0aW9uKCkgPT09IDAgfHwgIWFkc1NwZWMuaXNWaWRlb0VuZGVkKSAgKXtcbiAgICAgICAgICAgICRlbEFkVmlkZW8uaGlkZSgpO1xuICAgICAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgLy9MaWtlIGEgQ09OVEVOVF9QQVVTRV9SRVFVRVNURURcbiAgICBjb25zdCBwcm9jZXNzU3RhcnRPZkFkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJGVsQWRWaWRlby5zaG93KCk7XG4gICAgICAgICRhZEJ1dHRvbi5zaG93KCk7XG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgLyppZihhZHNTcGVjLnN0YXJ0ZWQpe1xuXG4gICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICAgfSovXG4gICAgfTtcbiAgICBjb25zdCBza2lwQnV0dG9uQ2xpY2tlZCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgaWYoJHRleHRWaWV3Lmhhc0NsYXNzKFwidmlkZW9BZFVpQWN0aW9uXCIpKXtcbiAgICAgICAgICAgIHZhc3RUcmFja2VyLnNraXAoKTtcbiAgICAgICAgICAgIGVsQWRWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgcHJvY2Vzc0VuZE9mQWQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0ZXh0Vmlldy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2tpcEJ1dHRvbkNsaWNrZWQsIGZhbHNlKTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHMuZXJyb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBlcnJvci5cIiwgZWxBZFZpZGVvLmVycm9yKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBlcnJvci5cIiwgZWxBZFZpZGVvLmVycm9yKTtcbiAgICAgICAgbGV0IGVycm9yID0ge307XG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxBZFZpZGVvLmVycm9yICYmIGVsQWRWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xuXG4gICAgICAgIGlmKGNvZGUgPT09IDIpIHtcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPSA0MDI7XG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gXCJUaW1lb3V0IG9mIE1lZGlhRmlsZSBVUkkuXCI7XG4gICAgICAgIH1lbHNlIGlmKGNvZGUgPT09IDMpe1xuICAgICAgICAgICAgZXJyb3IuY29kZSA9IDQwNTtcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBcIlByb2JsZW0gZGlzcGxheWluZyBNZWRpYUZpbGUuIFZpZGVvIHBsYXllciBmb3VuZCBhIE1lZGlhRmlsZSB3aXRoIHN1cHBvcnRlZCB0eXBlIGJ1dCBjb3VsZG7igJl0IGRpc3BsYXkgaXQuIE1lZGlhRmlsZSBtYXkgaW5jbHVkZTogdW5zdXBwb3J0ZWQgY29kZWNzLCBkaWZmZXJlbnQgTUlNRSB0eXBlIHRoYW4gTWVkaWFGaWxlQHR5cGUsIHVuc3VwcG9ydGVkIGRlbGl2ZXJ5IG1ldGhvZCwgZXRjLlwiO1xuICAgICAgICB9ZWxzZSBpZihjb2RlID09PSA0KXtcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPSA0MDM7XG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gXCJDb3VsZG7igJl0IGZpbmQgTWVkaWFGaWxlIHRoYXQgaXMgc3VwcG9ydGVkIGJ5IHRoaXMgdmlkZW8gcGxheWVyLCBiYXNlZCBvbiB0aGUgYXR0cmlidXRlcyBvZiB0aGUgTWVkaWFGaWxlIGVsZW1lbnQuXCI7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZXJyb3IuY29kZSA9IDQwMDtcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBcIkdlbmVyYWwgTGluZWFyIGVycm9yLiBWaWRlbyBwbGF5ZXIgaXMgdW5hYmxlIHRvIGRpc3BsYXkgdGhlIExpbmVhciBBZC5cIjtcbiAgICAgICAgfVxuICAgICAgICB2YXN0VHJhY2tlci5lcnJvcldpdGhDb2RlKGVycm9yLmNvZGUpO1xuICAgICAgICBPbkFkRXJyb3IoTUVESUFGSUxFX1BMQVlCQUNLX0VSUk9SKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuY2FucGxheSA9IGZ1bmN0aW9uKCl7XG5cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFzdFRyYWNrZXIuY29tcGxldGUoKTtcblxuICAgICAgICBwcm9jZXNzRW5kT2ZBZCgpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMuY2xpY2sgPSBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIHZhc3RUcmFja2VyLmNsaWNrKCk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFzdFRyYWNrZXIuc2V0UGF1c2VkKGZhbHNlKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFzdFRyYWNrZXIuc2V0UGF1c2VkKHRydWUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgdmFzdFRyYWNrZXIuc2V0UHJvZ3Jlc3MoZXZlbnQudGFyZ2V0LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9USU1FLCB7XG4gICAgICAgICAgICBkdXJhdGlvbiA6IGVsQWRWaWRlby5kdXJhdGlvbixcbiAgICAgICAgICAgIHBvc2l0aW9uIDogZWxBZFZpZGVvLmN1cnJlbnRUaW1lXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMudm9sdW1lY2hhbmdlID0gZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBBZCBWaWRlbyBWb2x1bWVjaGFuZ2UuXCIpO1xuICAgICAgICB2YXN0VHJhY2tlci5zZXRNdXRlZChldmVudC50YXJnZXQubXV0ZWQpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkbWV0YWRhdGEgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBBZCBDT05URU5UIExPQURFRCAuXCIpO1xuICAgICAgICB2YXN0VHJhY2tlci50cmFja0ltcHJlc3Npb24oKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9MT0FERUQsIHtyZW1haW5pbmcgOiBlbEFkVmlkZW8uZHVyYXRpb24sIGlzTGluZWFyIDogdHJ1ZX0pO1xuICAgICAgICBlbEFkVmlkZW8ucGxheSgpO1xuICAgIH07XG5cbiAgICB2YXN0VHJhY2tlci5vbignc2tpcCcsICgpID0+IHtcbiAgICAgICAgLy8gc2tpcCB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogc2tpcHBlZFwiKTtcbiAgICB9KTtcblxuICAgIHZhc3RUcmFja2VyLm9uKCdtdXRlJywgKCkgPT4ge1xuICAgICAgICAvLyBtdXRlIHRyYWNraW5nIFVSTHMgaGF2ZSBiZWVuIGNhbGxlZFxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBtdXRlZFwiKTtcbiAgICB9KTtcblxuICAgIHZhc3RUcmFja2VyLm9uKCd1bm11dGUnLCAoKSA9PiB7XG4gICAgICAgIC8vIHVubXV0ZSB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogdW5tdXRlZFwiKTtcbiAgICB9KTtcblxuICAgIHZhc3RUcmFja2VyLm9uKCdyZXN1bWUnLCAoKSA9PiB7XG4gICAgICAgIC8vIHJlc3VtZSB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogdmFzdFRyYWNrZXIgcmVzdW1lZC5cIik7XG5cbiAgICAgICAgLy9wcmV2ZW50IHRvIHNldCBTVEFURV9BRF9QTEFZSU5HIHdoZW4gZmlyc3QgcGxheS5cbiAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbiAgICB2YXN0VHJhY2tlci5vbigncGF1c2UnLCAoKSA9PiB7XG4gICAgICAgIC8vIHBhdXNlIHRyYWNraW5nIFVSTHMgaGF2ZSBiZWVuIGNhbGxlZFxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiB2YXN0VHJhY2tlciBwYXVzZWQuXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QQVVTRUQpO1xuICAgIH0pO1xuXG4gICAgdmFzdFRyYWNrZXIub24oJ2NsaWNrdGhyb3VnaCcsIHVybCA9PiB7XG4gICAgICAgIC8vIE9wZW4gdGhlIHJlc29sdmVkIGNsaWNrVGhyb3VnaCB1cmxcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogY2xpY2t0aHJvdWdoIDpcIiwgdXJsKTtcbiAgICAgICAgLy9kb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICB3aW5kb3cub3Blbih1cmwsICdfYmxhbmsnKTtcblxuICAgIH0pO1xuXG4gICAgdmFzdFRyYWNrZXIub24oJ3NraXAtY291bnRkb3duJywgKGRhdGEpID0+IHtcbiAgICAgICAgaWYoZGF0YSA9PT0gMCl7XG4gICAgICAgICAgICAkdGV4dFZpZXcuaHRtbChcIuq0keqzoCDqsbTrhIjrm7DquLA8aSBjbGFzcz0nb3AtY29uIG9wLWFycm93LXJpZ2h0IGJ0bi1yaWdodCc+PC9pPlwiKTtcbiAgICAgICAgICAgICR0ZXh0Vmlldy5hZGRDbGFzcyhcInZpZGVvQWRVaUFjdGlvblwiKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkdGV4dFZpZXcuaHRtbCgocGFyc2VJbnQoZGF0YSkrMSkrXCLstIgg7ZuE7JeQIOydtCDqtJHqs6Drpbwg6rG064SI65u4IOyImCDsnojsirXri4jri6QuXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdmFzdFRyYWNrZXIub24oJ3Jld2luZCcsICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogcmV3aW5kXCIpO1xuICAgIH0pO1xuXG4gICAgdmFzdFRyYWNrZXIub24oJ3N0YXJ0JywgKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBzdGFydGVkXCIpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEFEX0NIQU5HRUQsIHtpc0xpbmVhciA6IHRydWV9KTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgICAgIGFkc1NwZWMuc3RhcnRlZCA9IHRydWU7XG5cbiAgICAgICAgcHJvY2Vzc1N0YXJ0T2ZBZCgpO1xuICAgIH0pO1xuICAgIHZhc3RUcmFja2VyLm9uKCdmaXJzdFF1YXJ0aWxlJywgKCkgPT4ge1xuICAgICAgICAvLyBmaXJzdFF1YXJ0aWxlIHRyYWNraW5nIFVSTHMgaGF2ZSBiZWVuIGNhbGxlZFxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBmaXJzdFF1YXJ0aWxlXCIpO1xuICAgIH0pO1xuICAgIHZhc3RUcmFja2VyLm9uKCdtaWRwb2ludCcsICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogbWlkcG9pbnRcIik7XG4gICAgfSk7XG4gICAgdmFzdFRyYWNrZXIub24oJ3RoaXJkUXVhcnRpbGUnLCAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBsaXN0ZW5lciA6IHRoaXJkUXVhcnRpbGVcIik7XG4gICAgfSk7XG5cbiAgICB2YXN0VHJhY2tlci5vbignY3JlYXRpdmVWaWV3JywgKCkgPT4ge1xuICAgICAgICAvLyBpbXByZXNzaW9uIHRyYWNraW5nIFVSTHMgaGF2ZSBiZWVuIGNhbGxlZFxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBjcmVhdGl2ZVZpZXdcIik7XG5cbiAgICB9KTtcblxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgIGVsQWRWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGVsQWRWaWRlby5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgfSk7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgdGV4dFZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNraXBCdXR0b25DbGlja2VkLCBmYWxzZSk7XG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBlbEFkVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDEyLi5cbiAqL1xuaW1wb3J0IHtFUlJPUiwgU1RBVEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnRPck1zZSkge1xuICAgIGlmKF8uaXNFbGVtZW50KGVsZW1lbnRPck1zZSkpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlO1xuICAgIH1cbiAgICBpZihlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQoKTtcbiAgICB9ZWxzZSBpZihlbGVtZW50T3JNc2UubWVkaWEpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLm1lZGlhO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUxpdmUgPSBmdW5jdGlvbihtc2UpIHtcbiAgICAvL1RvRG8gOiBZb3UgY29uc2lkZXIgaGxzanMuIEJ1dCBub3Qgbm93IGJlY2F1c2Ugd2UgZG9uJ3Qgc3VwcG9ydCBobHNqcy5cblxuICAgIGlmKG1zZSAmJiBtc2UuaXNEeW5hbWljKXtcbiAgICAgICAgcmV0dXJuIG1zZS5pc0R5bmFtaWMoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBlcnJvclRyaWdnZXIgPSBmdW5jdGlvbihlcnJvciwgcHJvdmlkZXIpe1xuICAgIGlmKHByb3ZpZGVyKXtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xuICAgIH1cblxufTtcblxuZXhwb3J0IGNvbnN0IHBpY2tDdXJyZW50U291cmNlID0gKHNvdXJjZXMsIGN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZykgPT4ge1xuICAgIGxldCBzb3VyY2VJbmRleCA9IE1hdGgubWF4KDAsIGN1cnJlbnRTb3VyY2UpO1xuICAgIGNvbnN0IGxhYmVsID1cIlwiO1xuICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSA9PT0gaSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSovXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZUluZGV4O1xufTsiLCIvKkNvcHlyaWdodCAoYykgMjAxMyBPbGl2aWVyIFBvaXRyZXkgPHJzQGRhaWx5bW90aW9uLmNvbT5cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkXG4gdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLiovXG5jbGFzcyBBZHtjb25zdHJ1Y3Rvcigpe3RoaXMuaWQ9bnVsbCx0aGlzLnNlcXVlbmNlPW51bGwsdGhpcy5zeXN0ZW09bnVsbCx0aGlzLnRpdGxlPW51bGwsdGhpcy5kZXNjcmlwdGlvbj1udWxsLHRoaXMuYWR2ZXJ0aXNlcj1udWxsLHRoaXMucHJpY2luZz1udWxsLHRoaXMuc3VydmV5PW51bGwsdGhpcy5lcnJvclVSTFRlbXBsYXRlcz1bXSx0aGlzLmltcHJlc3Npb25VUkxUZW1wbGF0ZXM9W10sdGhpcy5jcmVhdGl2ZXM9W10sdGhpcy5leHRlbnNpb25zPVtdfX1jbGFzcyBBZEV4dGVuc2lvbntjb25zdHJ1Y3Rvcigpe3RoaXMuYXR0cmlidXRlcz17fSx0aGlzLmNoaWxkcmVuPVtdfX1jbGFzcyBBZEV4dGVuc2lvbkNoaWxke2NvbnN0cnVjdG9yKCl7dGhpcy5uYW1lPW51bGwsdGhpcy52YWx1ZT1udWxsLHRoaXMuYXR0cmlidXRlcz17fX19Y2xhc3MgQ29tcGFuaW9uQWR7Y29uc3RydWN0b3IoKXt0aGlzLmlkPW51bGwsdGhpcy53aWR0aD0wLHRoaXMuaGVpZ2h0PTAsdGhpcy50eXBlPW51bGwsdGhpcy5zdGF0aWNSZXNvdXJjZT1udWxsLHRoaXMuaHRtbFJlc291cmNlPW51bGwsdGhpcy5pZnJhbWVSZXNvdXJjZT1udWxsLHRoaXMuYWx0VGV4dD1udWxsLHRoaXMuY29tcGFuaW9uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9bnVsbCx0aGlzLmNvbXBhbmlvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9W10sdGhpcy50cmFja2luZ0V2ZW50cz17fX19Y2xhc3MgQ3JlYXRpdmV7Y29uc3RydWN0b3IoZT17fSl7dGhpcy5pZD1lLmlkfHxudWxsLHRoaXMuYWRJZD1lLmFkSWR8fG51bGwsdGhpcy5zZXF1ZW5jZT1lLnNlcXVlbmNlfHxudWxsLHRoaXMuYXBpRnJhbWV3b3JrPWUuYXBpRnJhbWV3b3JrfHxudWxsLHRoaXMudHJhY2tpbmdFdmVudHM9e319fWNsYXNzIENyZWF0aXZlQ29tcGFuaW9uIGV4dGVuZHMgQ3JlYXRpdmV7Y29uc3RydWN0b3IoZT17fSl7c3VwZXIoZSksdGhpcy50eXBlPVwiY29tcGFuaW9uXCIsdGhpcy52YXJpYXRpb25zPVtdfX1mdW5jdGlvbiB0cmFjayhlLHQpe3Jlc29sdmVVUkxUZW1wbGF0ZXMoZSx0KS5mb3JFYWNoKGU9PntpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZudWxsIT09d2luZG93KXsobmV3IEltYWdlKS5zcmM9ZX19KX1mdW5jdGlvbiByZXNvbHZlVVJMVGVtcGxhdGVzKGUsdD17fSl7Y29uc3Qgcj1bXTt0LkFTU0VUVVJJJiYodC5BU1NFVFVSST1lbmNvZGVVUklDb21wb25lbnRSRkMzOTg2KHQuQVNTRVRVUkkpKSx0LkNPTlRFTlRQTEFZSEVBRCYmKHQuQ09OVEVOVFBMQVlIRUFEPWVuY29kZVVSSUNvbXBvbmVudFJGQzM5ODYodC5DT05URU5UUExBWUhFQUQpKSx0LkVSUk9SQ09ERSYmIS9eWzAtOV17M30kLy50ZXN0KHQuRVJST1JDT0RFKSYmKHQuRVJST1JDT0RFPTkwMCksdC5DQUNIRUJVU1RJTkc9bGVmdHBhZChNYXRoLnJvdW5kKDFlOCpNYXRoLnJhbmRvbSgpKS50b1N0cmluZygpKSx0LlRJTUVTVEFNUD1lbmNvZGVVUklDb21wb25lbnRSRkMzOTg2KChuZXcgRGF0ZSkudG9JU09TdHJpbmcoKSksdC5SQU5ET009dC5yYW5kb209dC5DQUNIRUJVU1RJTkc7Zm9yKGxldCBpIGluIGUpe2xldCBzPWVbaV07aWYoXCJzdHJpbmdcIj09dHlwZW9mIHMpe2ZvcihsZXQgZSBpbiB0KXtjb25zdCByPXRbZV0saT1gWyR7ZX1dYCxuPWAlJSR7ZX0lJWA7cz0ocz1zLnJlcGxhY2UoaSxyKSkucmVwbGFjZShuLHIpfXIucHVzaChzKX19cmV0dXJuIHJ9ZnVuY3Rpb24gZW5jb2RlVVJJQ29tcG9uZW50UkZDMzk4NihlKXtyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGUpLnJlcGxhY2UoL1shJygpKl0vZyxlPT5gJSR7ZS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KX1gKX1mdW5jdGlvbiBsZWZ0cGFkKGUpe3JldHVybiBlLmxlbmd0aDw4P3JhbmdlKDAsOC1lLmxlbmd0aCwhMSkubWFwKGU9PlwiMFwiKS5qb2luKFwiXCIpK2U6ZX1mdW5jdGlvbiByYW5nZShlLHQscil7bGV0IGk9W10scz1lPHQsbj1yP3M/dCsxOnQtMTp0O2ZvcihsZXQgdD1lO3M/dDxuOnQ+bjtzP3QrKzp0LS0paS5wdXNoKHQpO3JldHVybiBpfWZ1bmN0aW9uIGlzTnVtZXJpYyhlKXtyZXR1cm4haXNOYU4ocGFyc2VGbG9hdChlKSkmJmlzRmluaXRlKGUpfWZ1bmN0aW9uIGZsYXR0ZW4oZSl7cmV0dXJuIGUucmVkdWNlKChlLHQpPT5lLmNvbmNhdChBcnJheS5pc0FycmF5KHQpP2ZsYXR0ZW4odCk6dCksW10pfWNvbnN0IHV0aWw9e3RyYWNrOnRyYWNrLHJlc29sdmVVUkxUZW1wbGF0ZXM6cmVzb2x2ZVVSTFRlbXBsYXRlcyxlbmNvZGVVUklDb21wb25lbnRSRkMzOTg2OmVuY29kZVVSSUNvbXBvbmVudFJGQzM5ODYsbGVmdHBhZDpsZWZ0cGFkLHJhbmdlOnJhbmdlLGlzTnVtZXJpYzppc051bWVyaWMsZmxhdHRlbjpmbGF0dGVufTtmdW5jdGlvbiBjaGlsZEJ5TmFtZShlLHQpe2NvbnN0IHI9ZS5jaGlsZE5vZGVzO2ZvcihsZXQgZSBpbiByKXtjb25zdCBpPXJbZV07aWYoaS5ub2RlTmFtZT09PXQpcmV0dXJuIGl9fWZ1bmN0aW9uIGNoaWxkcmVuQnlOYW1lKGUsdCl7Y29uc3Qgcj1bXSxpPWUuY2hpbGROb2Rlcztmb3IobGV0IGUgaW4gaSl7Y29uc3Qgcz1pW2VdO3Mubm9kZU5hbWU9PT10JiZyLnB1c2gocyl9cmV0dXJuIHJ9ZnVuY3Rpb24gcmVzb2x2ZVZhc3RBZFRhZ1VSSShlLHQpe2lmKCF0KXJldHVybiBlO2lmKDA9PT1lLmluZGV4T2YoXCIvL1wiKSl7Y29uc3R7cHJvdG9jb2w6dH09bG9jYXRpb247cmV0dXJuYCR7dH0ke2V9YH1pZigtMT09PWUuaW5kZXhPZihcIjovL1wiKSl7cmV0dXJuYCR7dC5zbGljZSgwLHQubGFzdEluZGV4T2YoXCIvXCIpKX0vJHtlfWB9cmV0dXJuIGV9ZnVuY3Rpb24gcGFyc2VCb29sZWFuKGUpe3JldHVybi0xIT09W1widHJ1ZVwiLFwiVFJVRVwiLFwiMVwiXS5pbmRleE9mKGUpfWZ1bmN0aW9uIHBhcnNlTm9kZVRleHQoZSl7cmV0dXJuIGUmJihlLnRleHRDb250ZW50fHxlLnRleHR8fFwiXCIpLnRyaW0oKX1mdW5jdGlvbiBjb3B5Tm9kZUF0dHJpYnV0ZShlLHQscil7Y29uc3QgaT10LmdldEF0dHJpYnV0ZShlKTtpJiZyLnNldEF0dHJpYnV0ZShlLGkpfWZ1bmN0aW9uIHBhcnNlRHVyYXRpb24oZSl7aWYobnVsbD09ZSlyZXR1cm4tMTtpZih1dGlsLmlzTnVtZXJpYyhlKSlyZXR1cm4gcGFyc2VJbnQoZSk7Y29uc3QgdD1lLnNwbGl0KFwiOlwiKTtpZigzIT09dC5sZW5ndGgpcmV0dXJuLTE7Y29uc3Qgcj10WzJdLnNwbGl0KFwiLlwiKTtsZXQgaT1wYXJzZUludChyWzBdKTsyPT09ci5sZW5ndGgmJihpKz1wYXJzZUZsb2F0KGAwLiR7clsxXX1gKSk7Y29uc3Qgcz1wYXJzZUludCg2MCp0WzFdKSxuPXBhcnNlSW50KDYwKnRbMF0qNjApO3JldHVybiBpc05hTihuKXx8aXNOYU4ocyl8fGlzTmFOKGkpfHxzPjM2MDB8fGk+NjA/LTE6bitzK2l9ZnVuY3Rpb24gc3BsaXRWQVNUKGUpe2NvbnN0IHQ9W107bGV0IHI9bnVsbDtyZXR1cm4gZS5mb3JFYWNoKChpLHMpPT57aWYoaS5zZXF1ZW5jZSYmKGkuc2VxdWVuY2U9cGFyc2VJbnQoaS5zZXF1ZW5jZSwxMCkpLGkuc2VxdWVuY2U+MSl7Y29uc3QgdD1lW3MtMV07aWYodCYmdC5zZXF1ZW5jZT09PWkuc2VxdWVuY2UtMSlyZXR1cm4gdm9pZChyJiZyLnB1c2goaSkpO2RlbGV0ZSBpLnNlcXVlbmNlfXI9W2ldLHQucHVzaChyKX0pLHR9ZnVuY3Rpb24gbWVyZ2VXcmFwcGVyQWREYXRhKGUsdCl7ZS5lcnJvclVSTFRlbXBsYXRlcz10LmVycm9yVVJMVGVtcGxhdGVzLmNvbmNhdChlLmVycm9yVVJMVGVtcGxhdGVzKSxlLmltcHJlc3Npb25VUkxUZW1wbGF0ZXM9dC5pbXByZXNzaW9uVVJMVGVtcGxhdGVzLmNvbmNhdChlLmltcHJlc3Npb25VUkxUZW1wbGF0ZXMpLGUuZXh0ZW5zaW9ucz10LmV4dGVuc2lvbnMuY29uY2F0KGUuZXh0ZW5zaW9ucyksZS5jcmVhdGl2ZXMuZm9yRWFjaChlPT57aWYodC50cmFja2luZ0V2ZW50cyYmdC50cmFja2luZ0V2ZW50c1tlLnR5cGVdKWZvcihsZXQgciBpbiB0LnRyYWNraW5nRXZlbnRzW2UudHlwZV0pe2NvbnN0IGk9dC50cmFja2luZ0V2ZW50c1tlLnR5cGVdW3JdO2UudHJhY2tpbmdFdmVudHNbcl18fChlLnRyYWNraW5nRXZlbnRzW3JdPVtdKSxlLnRyYWNraW5nRXZlbnRzW3JdPWUudHJhY2tpbmdFdmVudHNbcl0uY29uY2F0KGkpfX0pLHQudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzJiZ0LnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5sZW5ndGgmJmUuY3JlYXRpdmVzLmZvckVhY2goZT0+e1wibGluZWFyXCI9PT1lLnR5cGUmJihlLnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz1lLnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5jb25jYXQodC52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMpKX0pLHQudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcyYmdC52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzLmxlbmd0aCYmZS5jcmVhdGl2ZXMuZm9yRWFjaChlPT57XCJsaW5lYXJcIj09PWUudHlwZSYmKGUudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcz1lLnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMuY29uY2F0KHQudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcykpfSksdC52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlJiZlLmNyZWF0aXZlcy5mb3JFYWNoKGU9PntcImxpbmVhclwiPT09ZS50eXBlJiZudWxsPT1lLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUmJihlLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9dC52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlKX0pfWNvbnN0IHBhcnNlclV0aWxzPXtjaGlsZEJ5TmFtZTpjaGlsZEJ5TmFtZSxjaGlsZHJlbkJ5TmFtZTpjaGlsZHJlbkJ5TmFtZSxyZXNvbHZlVmFzdEFkVGFnVVJJOnJlc29sdmVWYXN0QWRUYWdVUkkscGFyc2VCb29sZWFuOnBhcnNlQm9vbGVhbixwYXJzZU5vZGVUZXh0OnBhcnNlTm9kZVRleHQsY29weU5vZGVBdHRyaWJ1dGU6Y29weU5vZGVBdHRyaWJ1dGUscGFyc2VEdXJhdGlvbjpwYXJzZUR1cmF0aW9uLHNwbGl0VkFTVDpzcGxpdFZBU1QsbWVyZ2VXcmFwcGVyQWREYXRhOm1lcmdlV3JhcHBlckFkRGF0YX07ZnVuY3Rpb24gcGFyc2VDcmVhdGl2ZUNvbXBhbmlvbihlLHQpe2NvbnN0IHI9bmV3IENyZWF0aXZlQ29tcGFuaW9uKHQpO3JldHVybiBwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiQ29tcGFuaW9uXCIpLmZvckVhY2goZT0+e2NvbnN0IHQ9bmV3IENvbXBhbmlvbkFkO3QuaWQ9ZS5nZXRBdHRyaWJ1dGUoXCJpZFwiKXx8bnVsbCx0LndpZHRoPWUuZ2V0QXR0cmlidXRlKFwid2lkdGhcIiksdC5oZWlnaHQ9ZS5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiksdC5jb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPVtdLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJIVE1MUmVzb3VyY2VcIikuZm9yRWFjaChlPT57dC50eXBlPWUuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHxcInRleHQvaHRtbFwiLHQuaHRtbFJlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiSUZyYW1lUmVzb3VyY2VcIikuZm9yRWFjaChlPT57dC50eXBlPWUuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHwwLHQuaWZyYW1lUmVzb3VyY2U9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJTdGF0aWNSZXNvdXJjZVwiKS5mb3JFYWNoKHI9Pnt0LnR5cGU9ci5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fDAscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIkFsdFRleHRcIikuZm9yRWFjaChlPT57dC5hbHRUZXh0PXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KSx0LnN0YXRpY1Jlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocil9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiVHJhY2tpbmdFdmVudHNcIikuZm9yRWFjaChlPT57cGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlRyYWNraW5nXCIpLmZvckVhY2goZT0+e2NvbnN0IHI9ZS5nZXRBdHRyaWJ1dGUoXCJldmVudFwiKSxpPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSk7ciYmaSYmKG51bGw9PXQudHJhY2tpbmdFdmVudHNbcl0mJih0LnRyYWNraW5nRXZlbnRzW3JdPVtdKSx0LnRyYWNraW5nRXZlbnRzW3JdLnB1c2goaSkpfSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiQ29tcGFuaW9uQ2xpY2tUcmFja2luZ1wiKS5mb3JFYWNoKGU9Pnt0LmNvbXBhbmlvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMucHVzaChwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpKX0pLHQuY29tcGFuaW9uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiQ29tcGFuaW9uQ2xpY2tUaHJvdWdoXCIpKSx0LmNvbXBhbmlvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJDb21wYW5pb25DbGlja1RyYWNraW5nXCIpKSxyLnZhcmlhdGlvbnMucHVzaCh0KX0pLHJ9Y2xhc3MgQ3JlYXRpdmVMaW5lYXIgZXh0ZW5kcyBDcmVhdGl2ZXtjb25zdHJ1Y3RvcihlPXt9KXtzdXBlcihlKSx0aGlzLnR5cGU9XCJsaW5lYXJcIix0aGlzLmR1cmF0aW9uPTAsdGhpcy5za2lwRGVsYXk9bnVsbCx0aGlzLm1lZGlhRmlsZXM9W10sdGhpcy52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPW51bGwsdGhpcy52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9W10sdGhpcy52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzPVtdLHRoaXMuYWRQYXJhbWV0ZXJzPW51bGwsdGhpcy5pY29ucz1bXX19Y2xhc3MgSWNvbntjb25zdHJ1Y3Rvcigpe3RoaXMucHJvZ3JhbT1udWxsLHRoaXMuaGVpZ2h0PTAsdGhpcy53aWR0aD0wLHRoaXMueFBvc2l0aW9uPTAsdGhpcy55UG9zaXRpb249MCx0aGlzLmFwaUZyYW1ld29yaz1udWxsLHRoaXMub2Zmc2V0PW51bGwsdGhpcy5kdXJhdGlvbj0wLHRoaXMudHlwZT1udWxsLHRoaXMuc3RhdGljUmVzb3VyY2U9bnVsbCx0aGlzLmh0bWxSZXNvdXJjZT1udWxsLHRoaXMuaWZyYW1lUmVzb3VyY2U9bnVsbCx0aGlzLmljb25DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT1udWxsLHRoaXMuaWNvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9W10sdGhpcy5pY29uVmlld1RyYWNraW5nVVJMVGVtcGxhdGU9bnVsbH19Y2xhc3MgTWVkaWFGaWxle2NvbnN0cnVjdG9yKCl7dGhpcy5pZD1udWxsLHRoaXMuZmlsZVVSTD1udWxsLHRoaXMuZGVsaXZlcnlUeXBlPVwicHJvZ3Jlc3NpdmVcIix0aGlzLm1pbWVUeXBlPW51bGwsdGhpcy5jb2RlYz1udWxsLHRoaXMuYml0cmF0ZT0wLHRoaXMubWluQml0cmF0ZT0wLHRoaXMubWF4Qml0cmF0ZT0wLHRoaXMud2lkdGg9MCx0aGlzLmhlaWdodD0wLHRoaXMuYXBpRnJhbWV3b3JrPW51bGwsdGhpcy5zY2FsYWJsZT1udWxsLHRoaXMubWFpbnRhaW5Bc3BlY3RSYXRpbz1udWxsfX1mdW5jdGlvbiBwYXJzZUNyZWF0aXZlTGluZWFyKGUsdCl7bGV0IHI7Y29uc3QgaT1uZXcgQ3JlYXRpdmVMaW5lYXIodCk7aS5kdXJhdGlvbj1wYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIkR1cmF0aW9uXCIpKSk7Y29uc3Qgcz1lLmdldEF0dHJpYnV0ZShcInNraXBvZmZzZXRcIik7aWYobnVsbD09cylpLnNraXBEZWxheT1udWxsO2Vsc2UgaWYoXCIlXCI9PT1zLmNoYXJBdChzLmxlbmd0aC0xKSYmLTEhPT1pLmR1cmF0aW9uKXtjb25zdCBlPXBhcnNlSW50KHMsMTApO2kuc2tpcERlbGF5PWkuZHVyYXRpb24qKGUvMTAwKX1lbHNlIGkuc2tpcERlbGF5PXBhcnNlclV0aWxzLnBhcnNlRHVyYXRpb24ocyk7Y29uc3Qgbj1wYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiVmlkZW9DbGlja3NcIik7biYmKGkudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKG4sXCJDbGlja1Rocm91Z2hcIikpLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKG4sXCJDbGlja1RyYWNraW5nXCIpLmZvckVhY2goZT0+e2kudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLnB1c2gocGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShuLFwiQ3VzdG9tQ2xpY2tcIikuZm9yRWFjaChlPT57aS52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzLnB1c2gocGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKSl9KSk7Y29uc3QgYT1wYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiQWRQYXJhbWV0ZXJzXCIpO2EmJihpLmFkUGFyYW1ldGVycz1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGEpKSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiVHJhY2tpbmdFdmVudHNcIikuZm9yRWFjaChlPT57cGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlRyYWNraW5nXCIpLmZvckVhY2goZT0+e2xldCB0PWUuZ2V0QXR0cmlidXRlKFwiZXZlbnRcIik7Y29uc3Qgcz1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpO2lmKHQmJnMpe2lmKFwicHJvZ3Jlc3NcIj09PXQpe2lmKCEocj1lLmdldEF0dHJpYnV0ZShcIm9mZnNldFwiKSkpcmV0dXJuO3Q9XCIlXCI9PT1yLmNoYXJBdChyLmxlbmd0aC0xKT9gcHJvZ3Jlc3MtJHtyfWA6YHByb2dyZXNzLSR7TWF0aC5yb3VuZChwYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKHIpKX1gfW51bGw9PWkudHJhY2tpbmdFdmVudHNbdF0mJihpLnRyYWNraW5nRXZlbnRzW3RdPVtdKSxpLnRyYWNraW5nRXZlbnRzW3RdLnB1c2gocyl9fSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiTWVkaWFGaWxlc1wiKS5mb3JFYWNoKGU9PntwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiTWVkaWFGaWxlXCIpLmZvckVhY2goZT0+e2NvbnN0IHQ9bmV3IE1lZGlhRmlsZTt0LmlkPWUuZ2V0QXR0cmlidXRlKFwiaWRcIiksdC5maWxlVVJMPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSksdC5kZWxpdmVyeVR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJkZWxpdmVyeVwiKSx0LmNvZGVjPWUuZ2V0QXR0cmlidXRlKFwiY29kZWNcIiksdC5taW1lVHlwZT1lLmdldEF0dHJpYnV0ZShcInR5cGVcIiksdC5hcGlGcmFtZXdvcms9ZS5nZXRBdHRyaWJ1dGUoXCJhcGlGcmFtZXdvcmtcIiksdC5iaXRyYXRlPXBhcnNlSW50KGUuZ2V0QXR0cmlidXRlKFwiYml0cmF0ZVwiKXx8MCksdC5taW5CaXRyYXRlPXBhcnNlSW50KGUuZ2V0QXR0cmlidXRlKFwibWluQml0cmF0ZVwiKXx8MCksdC5tYXhCaXRyYXRlPXBhcnNlSW50KGUuZ2V0QXR0cmlidXRlKFwibWF4Qml0cmF0ZVwiKXx8MCksdC53aWR0aD1wYXJzZUludChlLmdldEF0dHJpYnV0ZShcIndpZHRoXCIpfHwwKSx0LmhlaWdodD1wYXJzZUludChlLmdldEF0dHJpYnV0ZShcImhlaWdodFwiKXx8MCk7bGV0IHI9ZS5nZXRBdHRyaWJ1dGUoXCJzY2FsYWJsZVwiKTtyJiZcInN0cmluZ1wiPT10eXBlb2YgciYmKFwidHJ1ZVwiPT09KHI9ci50b0xvd2VyQ2FzZSgpKT90LnNjYWxhYmxlPSEwOlwiZmFsc2VcIj09PXImJih0LnNjYWxhYmxlPSExKSk7bGV0IHM9ZS5nZXRBdHRyaWJ1dGUoXCJtYWludGFpbkFzcGVjdFJhdGlvXCIpO3MmJlwic3RyaW5nXCI9PXR5cGVvZiBzJiYoXCJ0cnVlXCI9PT0ocz1zLnRvTG93ZXJDYXNlKCkpP3QubWFpbnRhaW5Bc3BlY3RSYXRpbz0hMDpcImZhbHNlXCI9PT1zJiYodC5tYWludGFpbkFzcGVjdFJhdGlvPSExKSksaS5tZWRpYUZpbGVzLnB1c2godCl9KX0pO2NvbnN0IG89cGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIkljb25zXCIpO3JldHVybiBvJiZwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShvLFwiSWNvblwiKS5mb3JFYWNoKGU9Pntjb25zdCB0PW5ldyBJY29uO3QucHJvZ3JhbT1lLmdldEF0dHJpYnV0ZShcInByb2dyYW1cIiksdC5oZWlnaHQ9cGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIil8fDApLHQud2lkdGg9cGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKXx8MCksdC54UG9zaXRpb249cGFyc2VYUG9zaXRpb24oZS5nZXRBdHRyaWJ1dGUoXCJ4UG9zaXRpb25cIikpLHQueVBvc2l0aW9uPXBhcnNlWVBvc2l0aW9uKGUuZ2V0QXR0cmlidXRlKFwieVBvc2l0aW9uXCIpKSx0LmFwaUZyYW1ld29yaz1lLmdldEF0dHJpYnV0ZShcImFwaUZyYW1ld29ya1wiKSx0Lm9mZnNldD1wYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKGUuZ2V0QXR0cmlidXRlKFwib2Zmc2V0XCIpKSx0LmR1cmF0aW9uPXBhcnNlclV0aWxzLnBhcnNlRHVyYXRpb24oZS5nZXRBdHRyaWJ1dGUoXCJkdXJhdGlvblwiKSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIkhUTUxSZXNvdXJjZVwiKS5mb3JFYWNoKGU9Pnt0LnR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fFwidGV4dC9odG1sXCIsdC5odG1sUmVzb3VyY2U9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJJRnJhbWVSZXNvdXJjZVwiKS5mb3JFYWNoKGU9Pnt0LnR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fDAsdC5pZnJhbWVSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlN0YXRpY1Jlc291cmNlXCIpLmZvckVhY2goZT0+e3QudHlwZT1lLmdldEF0dHJpYnV0ZShcImNyZWF0aXZlVHlwZVwiKXx8MCx0LnN0YXRpY1Jlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KTtjb25zdCByPXBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJJY29uQ2xpY2tzXCIpO3ImJih0Lmljb25DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKHIsXCJJY29uQ2xpY2tUaHJvdWdoXCIpKSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShyLFwiSWNvbkNsaWNrVHJhY2tpbmdcIikuZm9yRWFjaChlPT57dC5pY29uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5wdXNoKHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSkpfSkpLHQuaWNvblZpZXdUcmFja2luZ1VSTFRlbXBsYXRlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIkljb25WaWV3VHJhY2tpbmdcIikpLGkuaWNvbnMucHVzaCh0KX0pLGl9ZnVuY3Rpb24gcGFyc2VYUG9zaXRpb24oZSl7cmV0dXJuLTEhPT1bXCJsZWZ0XCIsXCJyaWdodFwiXS5pbmRleE9mKGUpP2U6cGFyc2VJbnQoZXx8MCl9ZnVuY3Rpb24gcGFyc2VZUG9zaXRpb24oZSl7cmV0dXJuLTEhPT1bXCJ0b3BcIixcImJvdHRvbVwiXS5pbmRleE9mKGUpP2U6cGFyc2VJbnQoZXx8MCl9Y2xhc3MgQ3JlYXRpdmVOb25MaW5lYXIgZXh0ZW5kcyBDcmVhdGl2ZXtjb25zdHJ1Y3RvcihlPXt9KXtzdXBlcihlKSx0aGlzLnR5cGU9XCJub25saW5lYXJcIix0aGlzLnZhcmlhdGlvbnM9W119fWNsYXNzIE5vbkxpbmVhckFke2NvbnN0cnVjdG9yKCl7dGhpcy5pZD1udWxsLHRoaXMud2lkdGg9MCx0aGlzLmhlaWdodD0wLHRoaXMuZXhwYW5kZWRXaWR0aD0wLHRoaXMuZXhwYW5kZWRIZWlnaHQ9MCx0aGlzLnNjYWxhYmxlPSEwLHRoaXMubWFpbnRhaW5Bc3BlY3RSYXRpbz0hMCx0aGlzLm1pblN1Z2dlc3RlZER1cmF0aW9uPTAsdGhpcy5hcGlGcmFtZXdvcms9XCJzdGF0aWNcIix0aGlzLnR5cGU9bnVsbCx0aGlzLnN0YXRpY1Jlc291cmNlPW51bGwsdGhpcy5odG1sUmVzb3VyY2U9bnVsbCx0aGlzLmlmcmFtZVJlc291cmNlPW51bGwsdGhpcy5ub25saW5lYXJDbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT1udWxsLHRoaXMubm9ubGluZWFyQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz1bXSx0aGlzLmFkUGFyYW1ldGVycz1udWxsfX1mdW5jdGlvbiBwYXJzZUNyZWF0aXZlTm9uTGluZWFyKGUsdCl7Y29uc3Qgcj1uZXcgQ3JlYXRpdmVOb25MaW5lYXIodCk7cmV0dXJuIHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJUcmFja2luZ0V2ZW50c1wiKS5mb3JFYWNoKGU9PntsZXQgdCxpO3BhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJUcmFja2luZ1wiKS5mb3JFYWNoKGU9Pnt0PWUuZ2V0QXR0cmlidXRlKFwiZXZlbnRcIiksaT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpLHQmJmkmJihudWxsPT1yLnRyYWNraW5nRXZlbnRzW3RdJiYoci50cmFja2luZ0V2ZW50c1t0XT1bXSksci50cmFja2luZ0V2ZW50c1t0XS5wdXNoKGkpKX0pfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIk5vbkxpbmVhclwiKS5mb3JFYWNoKGU9Pntjb25zdCB0PW5ldyBOb25MaW5lYXJBZDt0LmlkPWUuZ2V0QXR0cmlidXRlKFwiaWRcIil8fG51bGwsdC53aWR0aD1lLmdldEF0dHJpYnV0ZShcIndpZHRoXCIpLHQuaGVpZ2h0PWUuZ2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIpLHQuZXhwYW5kZWRXaWR0aD1lLmdldEF0dHJpYnV0ZShcImV4cGFuZGVkV2lkdGhcIiksdC5leHBhbmRlZEhlaWdodD1lLmdldEF0dHJpYnV0ZShcImV4cGFuZGVkSGVpZ2h0XCIpLHQuc2NhbGFibGU9cGFyc2VyVXRpbHMucGFyc2VCb29sZWFuKGUuZ2V0QXR0cmlidXRlKFwic2NhbGFibGVcIikpLHQubWFpbnRhaW5Bc3BlY3RSYXRpbz1wYXJzZXJVdGlscy5wYXJzZUJvb2xlYW4oZS5nZXRBdHRyaWJ1dGUoXCJtYWludGFpbkFzcGVjdFJhdGlvXCIpKSx0Lm1pblN1Z2dlc3RlZER1cmF0aW9uPXBhcnNlclV0aWxzLnBhcnNlRHVyYXRpb24oZS5nZXRBdHRyaWJ1dGUoXCJtaW5TdWdnZXN0ZWREdXJhdGlvblwiKSksdC5hcGlGcmFtZXdvcms9ZS5nZXRBdHRyaWJ1dGUoXCJhcGlGcmFtZXdvcmtcIikscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIkhUTUxSZXNvdXJjZVwiKS5mb3JFYWNoKGU9Pnt0LnR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fFwidGV4dC9odG1sXCIsdC5odG1sUmVzb3VyY2U9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJJRnJhbWVSZXNvdXJjZVwiKS5mb3JFYWNoKGU9Pnt0LnR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fDAsdC5pZnJhbWVSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlN0YXRpY1Jlc291cmNlXCIpLmZvckVhY2goZT0+e3QudHlwZT1lLmdldEF0dHJpYnV0ZShcImNyZWF0aXZlVHlwZVwiKXx8MCx0LnN0YXRpY1Jlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KTtjb25zdCBpPXBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJBZFBhcmFtZXRlcnNcIik7aSYmKHQuYWRQYXJhbWV0ZXJzPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaSkpLHQubm9ubGluZWFyQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiTm9uTGluZWFyQ2xpY2tUaHJvdWdoXCIpKSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiTm9uTGluZWFyQ2xpY2tUcmFja2luZ1wiKS5mb3JFYWNoKGU9Pnt0Lm5vbmxpbmVhckNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMucHVzaChwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpKX0pLHIudmFyaWF0aW9ucy5wdXNoKHQpfSkscn1mdW5jdGlvbiBwYXJzZUFkKGUpe2NvbnN0IHQ9ZS5jaGlsZE5vZGVzO2ZvcihsZXQgciBpbiB0KXtjb25zdCBpPXRbcl07aWYoLTEhPT1bXCJXcmFwcGVyXCIsXCJJbkxpbmVcIl0uaW5kZXhPZihpLm5vZGVOYW1lKSl7aWYocGFyc2VyVXRpbHMuY29weU5vZGVBdHRyaWJ1dGUoXCJpZFwiLGUsaSkscGFyc2VyVXRpbHMuY29weU5vZGVBdHRyaWJ1dGUoXCJzZXF1ZW5jZVwiLGUsaSksXCJXcmFwcGVyXCI9PT1pLm5vZGVOYW1lKXJldHVybiBwYXJzZVdyYXBwZXIoaSk7aWYoXCJJbkxpbmVcIj09PWkubm9kZU5hbWUpcmV0dXJuIHBhcnNlSW5MaW5lKGkpfX19ZnVuY3Rpb24gcGFyc2VJbkxpbmUoZSl7Y29uc3QgdD1lLmNoaWxkTm9kZXMscj1uZXcgQWQ7ci5pZD1lLmdldEF0dHJpYnV0ZShcImlkXCIpfHxudWxsLHIuc2VxdWVuY2U9ZS5nZXRBdHRyaWJ1dGUoXCJzZXF1ZW5jZVwiKXx8bnVsbDtmb3IobGV0IGUgaW4gdCl7Y29uc3QgaT10W2VdO3N3aXRjaChpLm5vZGVOYW1lKXtjYXNlXCJFcnJvclwiOnIuZXJyb3JVUkxUZW1wbGF0ZXMucHVzaChwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpKTticmVhaztjYXNlXCJJbXByZXNzaW9uXCI6ci5pbXByZXNzaW9uVVJMVGVtcGxhdGVzLnB1c2gocGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKSk7YnJlYWs7Y2FzZVwiQ3JlYXRpdmVzXCI6cGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoaSxcIkNyZWF0aXZlXCIpLmZvckVhY2goZT0+e2NvbnN0IHQ9e2lkOmUuZ2V0QXR0cmlidXRlKFwiaWRcIil8fG51bGwsYWRJZDpwYXJzZUNyZWF0aXZlQWRJZEF0dHJpYnV0ZShlKSxzZXF1ZW5jZTplLmdldEF0dHJpYnV0ZShcInNlcXVlbmNlXCIpfHxudWxsLGFwaUZyYW1ld29yazplLmdldEF0dHJpYnV0ZShcImFwaUZyYW1ld29ya1wiKXx8bnVsbH07Zm9yKGxldCBpIGluIGUuY2hpbGROb2Rlcyl7Y29uc3Qgcz1lLmNoaWxkTm9kZXNbaV07c3dpdGNoKHMubm9kZU5hbWUpe2Nhc2VcIkxpbmVhclwiOmxldCBlPXBhcnNlQ3JlYXRpdmVMaW5lYXIocyx0KTtlJiZyLmNyZWF0aXZlcy5wdXNoKGUpO2JyZWFrO2Nhc2VcIk5vbkxpbmVhckFkc1wiOmxldCBpPXBhcnNlQ3JlYXRpdmVOb25MaW5lYXIocyx0KTtpJiZyLmNyZWF0aXZlcy5wdXNoKGkpO2JyZWFrO2Nhc2VcIkNvbXBhbmlvbkFkc1wiOmxldCBuPXBhcnNlQ3JlYXRpdmVDb21wYW5pb24ocyx0KTtuJiZyLmNyZWF0aXZlcy5wdXNoKG4pfX19KTticmVhaztjYXNlXCJFeHRlbnNpb25zXCI6cGFyc2VFeHRlbnNpb25zKHIuZXh0ZW5zaW9ucyxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShpLFwiRXh0ZW5zaW9uXCIpKTticmVhaztjYXNlXCJBZFN5c3RlbVwiOnIuc3lzdGVtPXt2YWx1ZTpwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpLHZlcnNpb246aS5nZXRBdHRyaWJ1dGUoXCJ2ZXJzaW9uXCIpfHxudWxsfTticmVhaztjYXNlXCJBZFRpdGxlXCI6ci50aXRsZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpO2JyZWFrO2Nhc2VcIkRlc2NyaXB0aW9uXCI6ci5kZXNjcmlwdGlvbj1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpO2JyZWFrO2Nhc2VcIkFkdmVydGlzZXJcIjpyLmFkdmVydGlzZXI9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKTticmVhaztjYXNlXCJQcmljaW5nXCI6ci5wcmljaW5nPXt2YWx1ZTpwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpLG1vZGVsOmkuZ2V0QXR0cmlidXRlKFwibW9kZWxcIil8fG51bGwsY3VycmVuY3k6aS5nZXRBdHRyaWJ1dGUoXCJjdXJyZW5jeVwiKXx8bnVsbH07YnJlYWs7Y2FzZVwiU3VydmV5XCI6ci5zdXJ2ZXk9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKX19cmV0dXJuIHJ9ZnVuY3Rpb24gcGFyc2VXcmFwcGVyKGUpe2NvbnN0IHQ9cGFyc2VJbkxpbmUoZSk7bGV0IHI9cGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIlZBU1RBZFRhZ1VSSVwiKTtpZihyP3QubmV4dFdyYXBwZXJVUkw9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChyKToocj1wYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiVkFTVEFkVGFnVVJMXCIpKSYmKHQubmV4dFdyYXBwZXJVUkw9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShyLFwiVVJMXCIpKSksdC5jcmVhdGl2ZXMuZm9yRWFjaChlPT57aWYoLTEhPT1bXCJsaW5lYXJcIixcIm5vbmxpbmVhclwiXS5pbmRleE9mKGUudHlwZSkpe2lmKGUudHJhY2tpbmdFdmVudHMpe3QudHJhY2tpbmdFdmVudHN8fCh0LnRyYWNraW5nRXZlbnRzPXt9KSx0LnRyYWNraW5nRXZlbnRzW2UudHlwZV18fCh0LnRyYWNraW5nRXZlbnRzW2UudHlwZV09e30pO2ZvcihsZXQgciBpbiBlLnRyYWNraW5nRXZlbnRzKXtjb25zdCBpPWUudHJhY2tpbmdFdmVudHNbcl07dC50cmFja2luZ0V2ZW50c1tlLnR5cGVdW3JdfHwodC50cmFja2luZ0V2ZW50c1tlLnR5cGVdW3JdPVtdKSxpLmZvckVhY2goaT0+e3QudHJhY2tpbmdFdmVudHNbZS50eXBlXVtyXS5wdXNoKGkpfSl9fWUudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzJiYodC52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXN8fCh0LnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz1bXSksZS52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMuZm9yRWFjaChlPT57dC52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMucHVzaChlKX0pKSxlLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUmJih0LnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9ZS52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlKSxlLnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMmJih0LnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXN8fCh0LnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXM9W10pLGUudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcy5mb3JFYWNoKGU9Pnt0LnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMucHVzaChlKX0pKX19KSx0Lm5leHRXcmFwcGVyVVJMKXJldHVybiB0fWZ1bmN0aW9uIHBhcnNlRXh0ZW5zaW9ucyhlLHQpe3QuZm9yRWFjaCh0PT57Y29uc3Qgcj1uZXcgQWRFeHRlbnNpb24saT10LmF0dHJpYnV0ZXMscz10LmNoaWxkTm9kZXM7aWYodC5hdHRyaWJ1dGVzKWZvcihsZXQgZSBpbiBpKXtjb25zdCB0PWlbZV07dC5ub2RlTmFtZSYmdC5ub2RlVmFsdWUmJihyLmF0dHJpYnV0ZXNbdC5ub2RlTmFtZV09dC5ub2RlVmFsdWUpfWZvcihsZXQgZSBpbiBzKXtjb25zdCB0PXNbZV0saT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHQpO2lmKFwiI2NvbW1lbnRcIiE9PXQubm9kZU5hbWUmJlwiXCIhPT1pKXtjb25zdCBlPW5ldyBBZEV4dGVuc2lvbkNoaWxkO2lmKGUubmFtZT10Lm5vZGVOYW1lLGUudmFsdWU9aSx0LmF0dHJpYnV0ZXMpe2NvbnN0IHI9dC5hdHRyaWJ1dGVzO2ZvcihsZXQgdCBpbiByKXtjb25zdCBpPXJbdF07ZS5hdHRyaWJ1dGVzW2kubm9kZU5hbWVdPWkubm9kZVZhbHVlfX1yLmNoaWxkcmVuLnB1c2goZSl9fWUucHVzaChyKX0pfWZ1bmN0aW9uIHBhcnNlQ3JlYXRpdmVBZElkQXR0cmlidXRlKGUpe3JldHVybiBlLmdldEF0dHJpYnV0ZShcIkFkSURcIil8fGUuZ2V0QXR0cmlidXRlKFwiYWRJRFwiKXx8ZS5nZXRBdHRyaWJ1dGUoXCJhZElkXCIpfHxudWxsfXZhciBkb21haW47ZnVuY3Rpb24gRXZlbnRIYW5kbGVycygpe31mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKXtFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpfWZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnMoZSl7cmV0dXJuIHZvaWQgMD09PWUuX21heExpc3RlbmVycz9FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVyczplLl9tYXhMaXN0ZW5lcnN9ZnVuY3Rpb24gZW1pdE5vbmUoZSx0LHIpe2lmKHQpZS5jYWxsKHIpO2Vsc2UgZm9yKHZhciBpPWUubGVuZ3RoLHM9YXJyYXlDbG9uZShlLGkpLG49MDtuPGk7KytuKXNbbl0uY2FsbChyKX1mdW5jdGlvbiBlbWl0T25lKGUsdCxyLGkpe2lmKHQpZS5jYWxsKHIsaSk7ZWxzZSBmb3IodmFyIHM9ZS5sZW5ndGgsbj1hcnJheUNsb25lKGUscyksYT0wO2E8czsrK2EpblthXS5jYWxsKHIsaSl9ZnVuY3Rpb24gZW1pdFR3byhlLHQscixpLHMpe2lmKHQpZS5jYWxsKHIsaSxzKTtlbHNlIGZvcih2YXIgbj1lLmxlbmd0aCxhPWFycmF5Q2xvbmUoZSxuKSxvPTA7bzxuOysrbylhW29dLmNhbGwocixpLHMpfWZ1bmN0aW9uIGVtaXRUaHJlZShlLHQscixpLHMsbil7aWYodCllLmNhbGwocixpLHMsbik7ZWxzZSBmb3IodmFyIGE9ZS5sZW5ndGgsbz1hcnJheUNsb25lKGUsYSksbD0wO2w8YTsrK2wpb1tsXS5jYWxsKHIsaSxzLG4pfWZ1bmN0aW9uIGVtaXRNYW55KGUsdCxyLGkpe2lmKHQpZS5hcHBseShyLGkpO2Vsc2UgZm9yKHZhciBzPWUubGVuZ3RoLG49YXJyYXlDbG9uZShlLHMpLGE9MDthPHM7KythKW5bYV0uYXBwbHkocixpKX1mdW5jdGlvbiBfYWRkTGlzdGVuZXIoZSx0LHIsaSl7dmFyIHMsbixhO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHIpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO2lmKChuPWUuX2V2ZW50cyk/KG4ubmV3TGlzdGVuZXImJihlLmVtaXQoXCJuZXdMaXN0ZW5lclwiLHQsci5saXN0ZW5lcj9yLmxpc3RlbmVyOnIpLG49ZS5fZXZlbnRzKSxhPW5bdF0pOihuPWUuX2V2ZW50cz1uZXcgRXZlbnRIYW5kbGVycyxlLl9ldmVudHNDb3VudD0wKSxhKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBhP2E9blt0XT1pP1tyLGFdOlthLHJdOmk/YS51bnNoaWZ0KHIpOmEucHVzaChyKSwhYS53YXJuZWQmJihzPSRnZXRNYXhMaXN0ZW5lcnMoZSkpJiZzPjAmJmEubGVuZ3RoPnMpe2Eud2FybmVkPSEwO3ZhciBvPW5ldyBFcnJvcihcIlBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gXCIrYS5sZW5ndGgrXCIgXCIrdCtcIiBsaXN0ZW5lcnMgYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0XCIpO28ubmFtZT1cIk1heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZ1wiLG8uZW1pdHRlcj1lLG8udHlwZT10LG8uY291bnQ9YS5sZW5ndGgsZW1pdFdhcm5pbmcobyl9fWVsc2UgYT1uW3RdPXIsKytlLl9ldmVudHNDb3VudDtyZXR1cm4gZX1mdW5jdGlvbiBlbWl0V2FybmluZyhlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBjb25zb2xlLndhcm4/Y29uc29sZS53YXJuKGUpOmNvbnNvbGUubG9nKGUpfWZ1bmN0aW9uIF9vbmNlV3JhcChlLHQscil7dmFyIGk9ITE7ZnVuY3Rpb24gcygpe2UucmVtb3ZlTGlzdGVuZXIodCxzKSxpfHwoaT0hMCxyLmFwcGx5KGUsYXJndW1lbnRzKSl9cmV0dXJuIHMubGlzdGVuZXI9cixzfWZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZSl7dmFyIHQ9dGhpcy5fZXZlbnRzO2lmKHQpe3ZhciByPXRbZV07aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgcilyZXR1cm4gMTtpZihyKXJldHVybiByLmxlbmd0aH1yZXR1cm4gMH1mdW5jdGlvbiBzcGxpY2VPbmUoZSx0KXtmb3IodmFyIHI9dCxpPXIrMSxzPWUubGVuZ3RoO2k8cztyKz0xLGkrPTEpZVtyXT1lW2ldO2UucG9wKCl9ZnVuY3Rpb24gYXJyYXlDbG9uZShlLHQpe2Zvcih2YXIgcj1uZXcgQXJyYXkodCk7dC0tOylyW3RdPWVbdF07cmV0dXJuIHJ9ZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGUpe2Zvcih2YXIgdD1uZXcgQXJyYXkoZS5sZW5ndGgpLHI9MDtyPHQubGVuZ3RoOysrcil0W3JdPWVbcl0ubGlzdGVuZXJ8fGVbcl07cmV0dXJuIHR9ZnVuY3Rpb24geGRyKCl7bGV0IGU7cmV0dXJuIHdpbmRvdy5YRG9tYWluUmVxdWVzdCYmKGU9bmV3IFhEb21haW5SZXF1ZXN0KSxlfWZ1bmN0aW9uIHN1cHBvcnRlZCgpe3JldHVybiEheGRyKCl9ZnVuY3Rpb24gZ2V0KGUsdCxyKXtsZXQgaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiB3aW5kb3cuQWN0aXZlWE9iamVjdD9uZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MRE9NXCIpOnZvaWQgMDtpZighaSlyZXR1cm4gcihuZXcgRXJyb3IoXCJGbGFzaFVSTEhhbmRsZXI6IE1pY3Jvc29mdC5YTUxET00gZm9ybWF0IG5vdCBzdXBwb3J0ZWRcIikpO2kuYXN5bmM9ITEscmVxdWVzdC5vcGVuKFwiR0VUXCIsZSkscmVxdWVzdC50aW1lb3V0PXQudGltZW91dHx8MCxyZXF1ZXN0LndpdGhDcmVkZW50aWFscz10LndpdGhDcmVkZW50aWFsc3x8ITEscmVxdWVzdC5zZW5kKCkscmVxdWVzdC5vbnByb2dyZXNzPWZ1bmN0aW9uKCl7fSxyZXF1ZXN0Lm9ubG9hZD1mdW5jdGlvbigpe2kubG9hZFhNTChyZXF1ZXN0LnJlc3BvbnNlVGV4dCkscihudWxsLGkpfX1FdmVudEhhbmRsZXJzLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKG51bGwpLEV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXI9RXZlbnRFbWl0dGVyLEV2ZW50RW1pdHRlci51c2luZ0RvbWFpbnM9ITEsRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5kb21haW49dm9pZCAwLEV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cz12b2lkIDAsRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzPXZvaWQgMCxFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycz0xMCxFdmVudEVtaXR0ZXIuaW5pdD1mdW5jdGlvbigpe3RoaXMuZG9tYWluPW51bGwsRXZlbnRFbWl0dGVyLnVzaW5nRG9tYWlucyYmKCFkb21haW4uYWN0aXZlfHx0aGlzIGluc3RhbmNlb2YgZG9tYWluLkRvbWFpbnx8KHRoaXMuZG9tYWluPWRvbWFpbi5hY3RpdmUpKSx0aGlzLl9ldmVudHMmJnRoaXMuX2V2ZW50cyE9PU9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzfHwodGhpcy5fZXZlbnRzPW5ldyBFdmVudEhhbmRsZXJzLHRoaXMuX2V2ZW50c0NvdW50PTApLHRoaXMuX21heExpc3RlbmVycz10aGlzLl9tYXhMaXN0ZW5lcnN8fHZvaWQgMH0sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24oZSl7aWYoXCJudW1iZXJcIiE9dHlwZW9mIGV8fGU8MHx8aXNOYU4oZSkpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJuXCIgYXJndW1lbnQgbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO3JldHVybiB0aGlzLl9tYXhMaXN0ZW5lcnM9ZSx0aGlzfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycz1mdW5jdGlvbigpe3JldHVybiAkZ2V0TWF4TGlzdGVuZXJzKHRoaXMpfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oZSl7dmFyIHQscixpLHMsbixhLG8sbD1cImVycm9yXCI9PT1lO2lmKGE9dGhpcy5fZXZlbnRzKWw9bCYmbnVsbD09YS5lcnJvcjtlbHNlIGlmKCFsKXJldHVybiExO2lmKG89dGhpcy5kb21haW4sbCl7aWYodD1hcmd1bWVudHNbMV0sIW8pe2lmKHQgaW5zdGFuY2VvZiBFcnJvcil0aHJvdyB0O3ZhciBjPW5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcrdCtcIilcIik7dGhyb3cgYy5jb250ZXh0PXQsY31yZXR1cm4gdHx8KHQ9bmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50JykpLHQuZG9tYWluRW1pdHRlcj10aGlzLHQuZG9tYWluPW8sdC5kb21haW5UaHJvd249ITEsby5lbWl0KFwiZXJyb3JcIix0KSwhMX1pZighKHI9YVtlXSkpcmV0dXJuITE7dmFyIHA9XCJmdW5jdGlvblwiPT10eXBlb2Ygcjtzd2l0Y2goaT1hcmd1bWVudHMubGVuZ3RoKXtjYXNlIDE6ZW1pdE5vbmUocixwLHRoaXMpO2JyZWFrO2Nhc2UgMjplbWl0T25lKHIscCx0aGlzLGFyZ3VtZW50c1sxXSk7YnJlYWs7Y2FzZSAzOmVtaXRUd28ocixwLHRoaXMsYXJndW1lbnRzWzFdLGFyZ3VtZW50c1syXSk7YnJlYWs7Y2FzZSA0OmVtaXRUaHJlZShyLHAsdGhpcyxhcmd1bWVudHNbMV0sYXJndW1lbnRzWzJdLGFyZ3VtZW50c1szXSk7YnJlYWs7ZGVmYXVsdDpmb3Iocz1uZXcgQXJyYXkoaS0xKSxuPTE7bjxpO24rKylzW24tMV09YXJndW1lbnRzW25dO2VtaXRNYW55KHIscCx0aGlzLHMpfXJldHVybiEwfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLGUsdCwhMSl9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUub249RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcixFdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3JldHVybiBfYWRkTGlzdGVuZXIodGhpcyxlLHQsITApfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2U9ZnVuY3Rpb24oZSx0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtyZXR1cm4gdGhpcy5vbihlLF9vbmNlV3JhcCh0aGlzLGUsdCkpLHRoaXN9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO3JldHVybiB0aGlzLnByZXBlbmRMaXN0ZW5lcihlLF9vbmNlV3JhcCh0aGlzLGUsdCkpLHRoaXN9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXt2YXIgcixpLHMsbixhO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO2lmKCEoaT10aGlzLl9ldmVudHMpKXJldHVybiB0aGlzO2lmKCEocj1pW2VdKSlyZXR1cm4gdGhpcztpZihyPT09dHx8ci5saXN0ZW5lciYmci5saXN0ZW5lcj09PXQpMD09LS10aGlzLl9ldmVudHNDb3VudD90aGlzLl9ldmVudHM9bmV3IEV2ZW50SGFuZGxlcnM6KGRlbGV0ZSBpW2VdLGkucmVtb3ZlTGlzdGVuZXImJnRoaXMuZW1pdChcInJlbW92ZUxpc3RlbmVyXCIsZSxyLmxpc3RlbmVyfHx0KSk7ZWxzZSBpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiByKXtmb3Iocz0tMSxuPXIubGVuZ3RoO24tLSA+MDspaWYocltuXT09PXR8fHJbbl0ubGlzdGVuZXImJnJbbl0ubGlzdGVuZXI9PT10KXthPXJbbl0ubGlzdGVuZXIscz1uO2JyZWFrfWlmKHM8MClyZXR1cm4gdGhpcztpZigxPT09ci5sZW5ndGgpe2lmKHJbMF09dm9pZCAwLDA9PS0tdGhpcy5fZXZlbnRzQ291bnQpcmV0dXJuIHRoaXMuX2V2ZW50cz1uZXcgRXZlbnRIYW5kbGVycyx0aGlzO2RlbGV0ZSBpW2VdfWVsc2Ugc3BsaWNlT25lKHIscyk7aS5yZW1vdmVMaXN0ZW5lciYmdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIixlLGF8fHQpfXJldHVybiB0aGlzfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycz1mdW5jdGlvbihlKXt2YXIgdCxyO2lmKCEocj10aGlzLl9ldmVudHMpKXJldHVybiB0aGlzO2lmKCFyLnJlbW92ZUxpc3RlbmVyKXJldHVybiAwPT09YXJndW1lbnRzLmxlbmd0aD8odGhpcy5fZXZlbnRzPW5ldyBFdmVudEhhbmRsZXJzLHRoaXMuX2V2ZW50c0NvdW50PTApOnJbZV0mJigwPT0tLXRoaXMuX2V2ZW50c0NvdW50P3RoaXMuX2V2ZW50cz1uZXcgRXZlbnRIYW5kbGVyczpkZWxldGUgcltlXSksdGhpcztpZigwPT09YXJndW1lbnRzLmxlbmd0aCl7Zm9yKHZhciBpLHM9T2JqZWN0LmtleXMociksbj0wO248cy5sZW5ndGg7KytuKVwicmVtb3ZlTGlzdGVuZXJcIiE9PShpPXNbbl0pJiZ0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhpKTtyZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJyZW1vdmVMaXN0ZW5lclwiKSx0aGlzLl9ldmVudHM9bmV3IEV2ZW50SGFuZGxlcnMsdGhpcy5fZXZlbnRzQ291bnQ9MCx0aGlzfWlmKFwiZnVuY3Rpb25cIj09dHlwZW9mKHQ9cltlXSkpdGhpcy5yZW1vdmVMaXN0ZW5lcihlLHQpO2Vsc2UgaWYodClkb3t0aGlzLnJlbW92ZUxpc3RlbmVyKGUsdFt0Lmxlbmd0aC0xXSl9d2hpbGUodFswXSk7cmV0dXJuIHRoaXN9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3ZhciB0LHI9dGhpcy5fZXZlbnRzO3JldHVybiByJiYodD1yW2VdKT9cImZ1bmN0aW9uXCI9PXR5cGVvZiB0P1t0Lmxpc3RlbmVyfHx0XTp1bndyYXBMaXN0ZW5lcnModCk6W119LEV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50PWZ1bmN0aW9uKGUsdCl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZS5saXN0ZW5lckNvdW50P2UubGlzdGVuZXJDb3VudCh0KTpsaXN0ZW5lckNvdW50LmNhbGwoZSx0KX0sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50PWxpc3RlbmVyQ291bnQsRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50PjA/UmVmbGVjdC5vd25LZXlzKHRoaXMuX2V2ZW50cyk6W119O2NvbnN0IGZsYXNoVVJMSGFuZGxlcj17Z2V0OmdldCxzdXBwb3J0ZWQ6c3VwcG9ydGVkfTtmdW5jdGlvbiBnZXQkMShlLHQscil7cihuZXcgRXJyb3IoXCJQbGVhc2UgYnVuZGxlIHRoZSBsaWJyYXJ5IGZvciBub2RlIHRvIHVzZSB0aGUgbm9kZSB1cmxIYW5kbGVyXCIpKX1jb25zdCBub2RlVVJMSGFuZGxlcj17Z2V0OmdldCQxfTtmdW5jdGlvbiB4aHIoKXt0cnl7Y29uc3QgZT1uZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0O3JldHVyblwid2l0aENyZWRlbnRpYWxzXCJpbiBlP2U6bnVsbH1jYXRjaChlKXtyZXR1cm4gY29uc29sZS5sb2coXCJFcnJvciBpbiBYSFJVUkxIYW5kbGVyIHN1cHBvcnQgY2hlY2s6XCIsZSksbnVsbH19ZnVuY3Rpb24gc3VwcG9ydGVkJDEoKXtyZXR1cm4hIXhocigpfWZ1bmN0aW9uIGdldCQyKGUsdCxyKXtpZihcImh0dHBzOlwiPT09d2luZG93LmxvY2F0aW9uLnByb3RvY29sJiYwPT09ZS5pbmRleE9mKFwiaHR0cDovL1wiKSlyZXR1cm4gcihuZXcgRXJyb3IoXCJYSFJVUkxIYW5kbGVyOiBDYW5ub3QgZ28gZnJvbSBIVFRQUyB0byBIVFRQLlwiKSk7dHJ5e2NvbnN0IGk9eGhyKCk7aS5vcGVuKFwiR0VUXCIsZSksaS50aW1lb3V0PXQudGltZW91dHx8MCxpLndpdGhDcmVkZW50aWFscz10LndpdGhDcmVkZW50aWFsc3x8ITEsaS5vdmVycmlkZU1pbWVUeXBlJiZpLm92ZXJyaWRlTWltZVR5cGUoXCJ0ZXh0L3htbFwiKSxpLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpezQ9PT1pLnJlYWR5U3RhdGUmJigyMDA9PT1pLnN0YXR1cz9yKG51bGwsaS5yZXNwb25zZVhNTCk6cihuZXcgRXJyb3IoYFhIUlVSTEhhbmRsZXI6ICR7aS5zdGF0dXNUZXh0fWApKSl9LGkuc2VuZCgpfWNhdGNoKGUpe3IobmV3IEVycm9yKFwiWEhSVVJMSGFuZGxlcjogVW5leHBlY3RlZCBlcnJvclwiKSl9fWNvbnN0IFhIUlVSTEhhbmRsZXI9e2dldDpnZXQkMixzdXBwb3J0ZWQ6c3VwcG9ydGVkJDF9O2Z1bmN0aW9uIGdldCQzKGUsdCxyKXtyZXR1cm4gcnx8KFwiZnVuY3Rpb25cIj09dHlwZW9mIHQmJihyPXQpLHQ9e30pLFwidW5kZWZpbmVkXCI9PXR5cGVvZiB3aW5kb3d8fG51bGw9PT13aW5kb3c/bm9kZVVSTEhhbmRsZXIuZ2V0KGUsdCxyKTpYSFJVUkxIYW5kbGVyLnN1cHBvcnRlZCgpP1hIUlVSTEhhbmRsZXIuZ2V0KGUsdCxyKTpmbGFzaFVSTEhhbmRsZXIuc3VwcG9ydGVkKCk/Zmxhc2hVUkxIYW5kbGVyLmdldChlLHQscik6cihuZXcgRXJyb3IoXCJDdXJyZW50IGNvbnRleHQgaXMgbm90IHN1cHBvcnRlZCBieSBhbnkgb2YgdGhlIGRlZmF1bHQgVVJMSGFuZGxlcnMuIFBsZWFzZSBwcm92aWRlIGEgY3VzdG9tIFVSTEhhbmRsZXJcIikpfWNvbnN0IHVybEhhbmRsZXI9e2dldDpnZXQkM307Y2xhc3MgVkFTVFJlc3BvbnNle2NvbnN0cnVjdG9yKCl7dGhpcy5hZHM9W10sdGhpcy5lcnJvclVSTFRlbXBsYXRlcz1bXX19Y29uc3QgREVGQVVMVF9NQVhfV1JBUFBFUl9ERVBUSD0xMCxERUZBVUxUX0VWRU5UX0RBVEE9e0VSUk9SQ09ERTo5MDAsZXh0ZW5zaW9uczpbXX07Y2xhc3MgVkFTVFBhcnNlciBleHRlbmRzIEV2ZW50RW1pdHRlcntjb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5yZW1haW5pbmdBZHM9W10sdGhpcy5wYXJlbnRVUkxzPVtdLHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXM9W10sdGhpcy5yb290RXJyb3JVUkxUZW1wbGF0ZXM9W10sdGhpcy5tYXhXcmFwcGVyRGVwdGg9bnVsbCx0aGlzLlVSTFRlbXBsYXRlRmlsdGVycz1bXSx0aGlzLmZldGNoaW5nT3B0aW9ucz17fX1hZGRVUkxUZW1wbGF0ZUZpbHRlcihlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiZ0aGlzLlVSTFRlbXBsYXRlRmlsdGVycy5wdXNoKGUpfXJlbW92ZVVSTFRlbXBsYXRlRmlsdGVyKCl7dGhpcy5VUkxUZW1wbGF0ZUZpbHRlcnMucG9wKCl9Y291bnRVUkxUZW1wbGF0ZUZpbHRlcnMoKXtyZXR1cm4gdGhpcy5VUkxUZW1wbGF0ZUZpbHRlcnMubGVuZ3RofWNsZWFyVVJMVGVtcGxhdGVGaWx0ZXJzKCl7dGhpcy5VUkxUZW1wbGF0ZUZpbHRlcnM9W119dHJhY2tWYXN0RXJyb3IoZSx0LC4uLnIpe3RoaXMuZW1pdChcIlZBU1QtZXJyb3JcIixPYmplY3QuYXNzaWduKERFRkFVTFRfRVZFTlRfREFUQSx0LC4uLnIpKSx1dGlsLnRyYWNrKGUsdCl9Z2V0RXJyb3JVUkxUZW1wbGF0ZXMoKXtyZXR1cm4gdGhpcy5yb290RXJyb3JVUkxUZW1wbGF0ZXMuY29uY2F0KHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXMpfWZldGNoVkFTVChlLHQscil7cmV0dXJuIG5ldyBQcm9taXNlKChpLHMpPT57dGhpcy5VUkxUZW1wbGF0ZUZpbHRlcnMuZm9yRWFjaCh0PT57ZT10KGUpfSksdGhpcy5wYXJlbnRVUkxzLnB1c2goZSksdGhpcy5lbWl0KFwiVkFTVC1yZXNvbHZpbmdcIix7dXJsOmUsd3JhcHBlckRlcHRoOnQsb3JpZ2luYWxVcmw6cn0pLHRoaXMudXJsSGFuZGxlci5nZXQoZSx0aGlzLmZldGNoaW5nT3B0aW9ucywodCxyKT0+e3RoaXMuZW1pdChcIlZBU1QtcmVzb2x2ZWRcIix7dXJsOmUsZXJyb3I6dH0pLHQ/cyh0KTppKHIpfSl9KX1pbml0UGFyc2luZ1N0YXR1cyhlPXt9KXt0aGlzLnJvb3RVUkw9XCJcIix0aGlzLnJlbWFpbmluZ0Fkcz1bXSx0aGlzLnBhcmVudFVSTHM9W10sdGhpcy5lcnJvclVSTFRlbXBsYXRlcz1bXSx0aGlzLnJvb3RFcnJvclVSTFRlbXBsYXRlcz1bXSx0aGlzLm1heFdyYXBwZXJEZXB0aD1lLndyYXBwZXJMaW1pdHx8REVGQVVMVF9NQVhfV1JBUFBFUl9ERVBUSCx0aGlzLmZldGNoaW5nT3B0aW9ucz17dGltZW91dDplLnRpbWVvdXQsd2l0aENyZWRlbnRpYWxzOmUud2l0aENyZWRlbnRpYWxzfSx0aGlzLnVybEhhbmRsZXI9ZS51cmxoYW5kbGVyfHx1cmxIYW5kbGVyfWdldFJlbWFpbmluZ0FkcyhlKXtpZigwPT09dGhpcy5yZW1haW5pbmdBZHMubGVuZ3RoKXJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBtb3JlIGFkcyBhcmUgYXZhaWxhYmxlIGZvciB0aGUgZ2l2ZW4gVkFTVFwiKSk7Y29uc3QgdD1lP3V0aWwuZmxhdHRlbih0aGlzLnJlbWFpbmluZ0Fkcyk6dGhpcy5yZW1haW5pbmdBZHMuc2hpZnQoKTtyZXR1cm4gdGhpcy5lcnJvclVSTFRlbXBsYXRlcz1bXSx0aGlzLnBhcmVudFVSTHM9W10sdGhpcy5yZXNvbHZlQWRzKHQse3dyYXBwZXJEZXB0aDowLG9yaWdpbmFsVXJsOnRoaXMucm9vdFVSTH0pLnRoZW4oZT0+dGhpcy5idWlsZFZBU1RSZXNwb25zZShlKSl9Z2V0QW5kUGFyc2VWQVNUKGUsdD17fSl7cmV0dXJuIHRoaXMuaW5pdFBhcnNpbmdTdGF0dXModCksdGhpcy5yb290VVJMPWUsdGhpcy5mZXRjaFZBU1QoZSkudGhlbihyPT4odC5vcmlnaW5hbFVybD1lLHQuaXNSb290VkFTVD0hMCx0aGlzLnBhcnNlKHIsdCkudGhlbihlPT50aGlzLmJ1aWxkVkFTVFJlc3BvbnNlKGUpKSkpfXBhcnNlVkFTVChlLHQ9e30pe3JldHVybiB0aGlzLmluaXRQYXJzaW5nU3RhdHVzKHQpLHQuaXNSb290VkFTVD0hMCx0aGlzLnBhcnNlKGUsdCkudGhlbihlPT50aGlzLmJ1aWxkVkFTVFJlc3BvbnNlKGUpKX1idWlsZFZBU1RSZXNwb25zZShlKXtjb25zdCB0PW5ldyBWQVNUUmVzcG9uc2U7cmV0dXJuIHQuYWRzPWUsdC5lcnJvclVSTFRlbXBsYXRlcz10aGlzLmdldEVycm9yVVJMVGVtcGxhdGVzKCksdGhpcy5jb21wbGV0ZVdyYXBwZXJSZXNvbHZpbmcodCksdH1wYXJzZShlLHtyZXNvbHZlQWxsOnQ9ITAsd3JhcHBlclNlcXVlbmNlOnI9bnVsbCxvcmlnaW5hbFVybDppPW51bGwsd3JhcHBlckRlcHRoOnM9MCxpc1Jvb3RWQVNUOm49ITF9KXtpZighZXx8IWUuZG9jdW1lbnRFbGVtZW50fHxcIlZBU1RcIiE9PWUuZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lKXJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJJbnZhbGlkIFZBU1QgWE1MRG9jdW1lbnRcIikpO2xldCBhPVtdO2NvbnN0IG89ZS5kb2N1bWVudEVsZW1lbnQuY2hpbGROb2Rlcztmb3IobGV0IGUgaW4gbyl7Y29uc3QgdD1vW2VdO2lmKFwiRXJyb3JcIj09PXQubm9kZU5hbWUpe2NvbnN0IGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dCh0KTtuP3RoaXMucm9vdEVycm9yVVJMVGVtcGxhdGVzLnB1c2goZSk6dGhpcy5lcnJvclVSTFRlbXBsYXRlcy5wdXNoKGUpfWlmKFwiQWRcIj09PXQubm9kZU5hbWUpe2NvbnN0IGU9cGFyc2VBZCh0KTtlP2EucHVzaChlKTp0aGlzLnRyYWNrVmFzdEVycm9yKHRoaXMuZ2V0RXJyb3JVUkxUZW1wbGF0ZXMoKSx7RVJST1JDT0RFOjEwMX0pfX1jb25zdCBsPWEubGVuZ3RoLGM9YVtsLTFdO3JldHVybiAxPT09bCYmdm9pZCAwIT09ciYmbnVsbCE9PXImJmMmJiFjLnNlcXVlbmNlJiYoYy5zZXF1ZW5jZT1yKSwhMT09PXQmJih0aGlzLnJlbWFpbmluZ0Fkcz1wYXJzZXJVdGlscy5zcGxpdFZBU1QoYSksYT10aGlzLnJlbWFpbmluZ0Fkcy5zaGlmdCgpKSx0aGlzLnJlc29sdmVBZHMoYSx7d3JhcHBlckRlcHRoOnMsb3JpZ2luYWxVcmw6aX0pfXJlc29sdmVBZHMoZT1bXSx7d3JhcHBlckRlcHRoOnQsb3JpZ2luYWxVcmw6cn0pe2NvbnN0IGk9W107cmV0dXJuIGUuZm9yRWFjaChlPT57Y29uc3Qgcz10aGlzLnJlc29sdmVXcmFwcGVycyhlLHQscik7aS5wdXNoKHMpfSksUHJvbWlzZS5hbGwoaSkudGhlbihlPT57Y29uc3QgaT11dGlsLmZsYXR0ZW4oZSk7aWYoIWkmJnRoaXMucmVtYWluaW5nQWRzLmxlbmd0aD4wKXtjb25zdCBlPXRoaXMucmVtYWluaW5nQWRzLnNoaWZ0KCk7cmV0dXJuIHRoaXMucmVzb2x2ZUFkcyhlLHt3cmFwcGVyRGVwdGg6dCxvcmlnaW5hbFVybDpyfSl9cmV0dXJuIGl9KX1yZXNvbHZlV3JhcHBlcnMoZSx0LHIpe3JldHVybiBuZXcgUHJvbWlzZSgoaSxzKT0+e2lmKHQrKywhZS5uZXh0V3JhcHBlclVSTClyZXR1cm4gZGVsZXRlIGUubmV4dFdyYXBwZXJVUkwsaShlKTtpZih0Pj10aGlzLm1heFdyYXBwZXJEZXB0aHx8LTEhPT10aGlzLnBhcmVudFVSTHMuaW5kZXhPZihlLm5leHRXcmFwcGVyVVJMKSlyZXR1cm4gZS5lcnJvckNvZGU9MzAyLGRlbGV0ZSBlLm5leHRXcmFwcGVyVVJMLGkoZSk7ZS5uZXh0V3JhcHBlclVSTD1wYXJzZXJVdGlscy5yZXNvbHZlVmFzdEFkVGFnVVJJKGUubmV4dFdyYXBwZXJVUkwscik7Y29uc3Qgbj1lLnNlcXVlbmNlO3I9ZS5uZXh0V3JhcHBlclVSTCx0aGlzLmZldGNoVkFTVChlLm5leHRXcmFwcGVyVVJMLHQscikudGhlbihzPT50aGlzLnBhcnNlKHMse29yaWdpbmFsVXJsOnIsd3JhcHBlclNlcXVlbmNlOm4sd3JhcHBlckRlcHRoOnR9KS50aGVuKHQ9PntpZihkZWxldGUgZS5uZXh0V3JhcHBlclVSTCwwPT09dC5sZW5ndGgpcmV0dXJuIGUuY3JlYXRpdmVzPVtdLGkoZSk7dC5mb3JFYWNoKHQ9Pnt0JiZwYXJzZXJVdGlscy5tZXJnZVdyYXBwZXJBZERhdGEodCxlKX0pLGkodCl9KSkuY2F0Y2godD0+e2UuZXJyb3JDb2RlPTMwMSxlLmVycm9yTWVzc2FnZT10Lm1lc3NhZ2UsaShlKX0pfSl9Y29tcGxldGVXcmFwcGVyUmVzb2x2aW5nKGUpe2lmKDA9PT1lLmFkcy5sZW5ndGgpdGhpcy50cmFja1Zhc3RFcnJvcihlLmVycm9yVVJMVGVtcGxhdGVzLHtFUlJPUkNPREU6MzAzfSk7ZWxzZSBmb3IobGV0IHQ9ZS5hZHMubGVuZ3RoLTE7dD49MDt0LS0pe2xldCByPWUuYWRzW3RdOyhyLmVycm9yQ29kZXx8MD09PXIuY3JlYXRpdmVzLmxlbmd0aCkmJih0aGlzLnRyYWNrVmFzdEVycm9yKHIuZXJyb3JVUkxUZW1wbGF0ZXMuY29uY2F0KGUuZXJyb3JVUkxUZW1wbGF0ZXMpLHtFUlJPUkNPREU6ci5lcnJvckNvZGV8fDMwM30se0VSUk9STUVTU0FHRTpyLmVycm9yTWVzc2FnZXx8XCJcIn0se2V4dGVuc2lvbnM6ci5leHRlbnNpb25zfSx7c3lzdGVtOnIuc3lzdGVtfSksZS5hZHMuc3BsaWNlKHQsMSkpfX19bGV0IHN0b3JhZ2U9bnVsbDtjb25zdCBERUZBVUxUX1NUT1JBR0U9e2RhdGE6e30sbGVuZ3RoOjAsZ2V0SXRlbShlKXtyZXR1cm4gdGhpcy5kYXRhW2VdfSxzZXRJdGVtKGUsdCl7dGhpcy5kYXRhW2VdPXQsdGhpcy5sZW5ndGg9T2JqZWN0LmtleXModGhpcy5kYXRhKS5sZW5ndGh9LHJlbW92ZUl0ZW0oZSl7ZGVsZXRlIGRhdGFbZV0sdGhpcy5sZW5ndGg9T2JqZWN0LmtleXModGhpcy5kYXRhKS5sZW5ndGh9LGNsZWFyKCl7dGhpcy5kYXRhPXt9LHRoaXMubGVuZ3RoPTB9fTtjbGFzcyBTdG9yYWdle2NvbnN0cnVjdG9yKCl7dGhpcy5zdG9yYWdlPXRoaXMuaW5pdFN0b3JhZ2UoKX1pbml0U3RvcmFnZSgpe2lmKHN0b3JhZ2UpcmV0dXJuIHN0b3JhZ2U7dHJ5e3N0b3JhZ2U9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmbnVsbCE9PXdpbmRvdz93aW5kb3cubG9jYWxTdG9yYWdlfHx3aW5kb3cuc2Vzc2lvblN0b3JhZ2U6bnVsbH1jYXRjaChlKXtzdG9yYWdlPW51bGx9cmV0dXJuIHN0b3JhZ2UmJiF0aGlzLmlzU3RvcmFnZURpc2FibGVkKHN0b3JhZ2UpfHwoc3RvcmFnZT1ERUZBVUxUX1NUT1JBR0UpLmNsZWFyKCksc3RvcmFnZX1pc1N0b3JhZ2VEaXNhYmxlZChlKXtjb25zdCB0PVwiX19WQVNUU3RvcmFnZV9fXCI7dHJ5e2lmKGUuc2V0SXRlbSh0LHQpLGUuZ2V0SXRlbSh0KSE9PXQpcmV0dXJuIGUucmVtb3ZlSXRlbSh0KSwhMH1jYXRjaChlKXtyZXR1cm4hMH1yZXR1cm4gZS5yZW1vdmVJdGVtKHQpLCExfWdldEl0ZW0oZSl7cmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKGUpfXNldEl0ZW0oZSx0KXtyZXR1cm4gdGhpcy5zdG9yYWdlLnNldEl0ZW0oZSx0KX1yZW1vdmVJdGVtKGUpe3JldHVybiB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShlKX1jbGVhcigpe3JldHVybiB0aGlzLnN0b3JhZ2UuY2xlYXIoKX19Y2xhc3MgVkFTVENsaWVudHtjb25zdHJ1Y3RvcihlLHQscil7dGhpcy5jYXBwaW5nRnJlZUx1bmNoPWV8fDAsdGhpcy5jYXBwaW5nTWluaW11bVRpbWVJbnRlcnZhbD10fHwwLHRoaXMuZGVmYXVsdE9wdGlvbnM9e3dpdGhDcmVkZW50aWFsczohMSx0aW1lb3V0OjB9LHRoaXMudmFzdFBhcnNlcj1uZXcgVkFTVFBhcnNlcix0aGlzLnN0b3JhZ2U9cnx8bmV3IFN0b3JhZ2Usdm9pZCAwPT09dGhpcy5sYXN0U3VjY2Vzc2Z1bEFkJiYodGhpcy5sYXN0U3VjY2Vzc2Z1bEFkPTApLHZvaWQgMD09PXRoaXMudG90YWxDYWxscyYmKHRoaXMudG90YWxDYWxscz0wKSx2b2lkIDA9PT10aGlzLnRvdGFsQ2FsbHNUaW1lb3V0JiYodGhpcy50b3RhbENhbGxzVGltZW91dD0wKX1nZXRQYXJzZXIoKXtyZXR1cm4gdGhpcy52YXN0UGFyc2VyfWdldCBsYXN0U3VjY2Vzc2Z1bEFkKCl7cmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKFwidmFzdC1jbGllbnQtbGFzdC1zdWNjZXNzZnVsLWFkXCIpfXNldCBsYXN0U3VjY2Vzc2Z1bEFkKGUpe3RoaXMuc3RvcmFnZS5zZXRJdGVtKFwidmFzdC1jbGllbnQtbGFzdC1zdWNjZXNzZnVsLWFkXCIsZSl9Z2V0IHRvdGFsQ2FsbHMoKXtyZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oXCJ2YXN0LWNsaWVudC10b3RhbC1jYWxsc1wiKX1zZXQgdG90YWxDYWxscyhlKXt0aGlzLnN0b3JhZ2Uuc2V0SXRlbShcInZhc3QtY2xpZW50LXRvdGFsLWNhbGxzXCIsZSl9Z2V0IHRvdGFsQ2FsbHNUaW1lb3V0KCl7cmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKFwidmFzdC1jbGllbnQtdG90YWwtY2FsbHMtdGltZW91dFwiKX1zZXQgdG90YWxDYWxsc1RpbWVvdXQoZSl7dGhpcy5zdG9yYWdlLnNldEl0ZW0oXCJ2YXN0LWNsaWVudC10b3RhbC1jYWxscy10aW1lb3V0XCIsZSl9aGFzUmVtYWluaW5nQWRzKCl7cmV0dXJuIHRoaXMudmFzdFBhcnNlci5yZW1haW5pbmdBZHMubGVuZ3RoPjB9Z2V0TmV4dEFkcyhlKXtyZXR1cm4gdGhpcy52YXN0UGFyc2VyLmdldFJlbWFpbmluZ0FkcyhlKX1nZXQoZSx0PXt9KXtjb25zdCByPURhdGUubm93KCk7cmV0dXJuKHQ9T2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRPcHRpb25zLHQpKS5oYXNPd25Qcm9wZXJ0eShcInJlc29sdmVBbGxcIil8fCh0LnJlc29sdmVBbGw9ITEpLHRoaXMudG90YWxDYWxsc1RpbWVvdXQ8cj8odGhpcy50b3RhbENhbGxzPTEsdGhpcy50b3RhbENhbGxzVGltZW91dD1yKzM2ZTUpOnRoaXMudG90YWxDYWxscysrLG5ldyBQcm9taXNlKChpLHMpPT57aWYodGhpcy5jYXBwaW5nRnJlZUx1bmNoPj10aGlzLnRvdGFsQ2FsbHMpcmV0dXJuIHMobmV3IEVycm9yKGBWQVNUIGNhbGwgY2FuY2VsZWQg4oCTIEZyZWVMdW5jaCBjYXBwaW5nIG5vdCByZWFjaGVkIHlldCAke3RoaXMudG90YWxDYWxsc30vJHt0aGlzLmNhcHBpbmdGcmVlTHVuY2h9YCkpO2NvbnN0IG49ci10aGlzLmxhc3RTdWNjZXNzZnVsQWQ7aWYobjwwKXRoaXMubGFzdFN1Y2Nlc3NmdWxBZD0wO2Vsc2UgaWYobjx0aGlzLmNhcHBpbmdNaW5pbXVtVGltZUludGVydmFsKXJldHVybiBzKG5ldyBFcnJvcihgVkFTVCBjYWxsIGNhbmNlbGVkIOKAkyAoJHt0aGlzLmNhcHBpbmdNaW5pbXVtVGltZUludGVydmFsfSltcyBtaW5pbXVtIGludGVydmFsIHJlYWNoZWRgKSk7dGhpcy52YXN0UGFyc2VyLmdldEFuZFBhcnNlVkFTVChlLHQpLnRoZW4oZT0+aShlKSkuY2F0Y2goZT0+cyhlKSl9KX19Y29uc3QgREVGQVVMVF9TS0lQX0RFTEFZPS0xO2NsYXNzIFZBU1RUcmFja2VyIGV4dGVuZHMgRXZlbnRFbWl0dGVye2NvbnN0cnVjdG9yKGUsdCxyLGk9bnVsbCl7c3VwZXIoKSx0aGlzLmFkPXQsdGhpcy5jcmVhdGl2ZT1yLHRoaXMudmFyaWF0aW9uPWksdGhpcy5tdXRlZD0hMSx0aGlzLmltcHJlc3NlZD0hMSx0aGlzLnNraXBwYWJsZT0hMSx0aGlzLnRyYWNraW5nRXZlbnRzPXt9LHRoaXMuX2FscmVhZHlUcmlnZ2VyZWRRdWFydGlsZXM9e30sdGhpcy5lbWl0QWx3YXlzRXZlbnRzPVtcImNyZWF0aXZlVmlld1wiLFwic3RhcnRcIixcImZpcnN0UXVhcnRpbGVcIixcIm1pZHBvaW50XCIsXCJ0aGlyZFF1YXJ0aWxlXCIsXCJjb21wbGV0ZVwiLFwicmVzdW1lXCIsXCJwYXVzZVwiLFwicmV3aW5kXCIsXCJza2lwXCIsXCJjbG9zZUxpbmVhclwiLFwiY2xvc2VcIl07Zm9yKGxldCBlIGluIHRoaXMuY3JlYXRpdmUudHJhY2tpbmdFdmVudHMpe2NvbnN0IHQ9dGhpcy5jcmVhdGl2ZS50cmFja2luZ0V2ZW50c1tlXTt0aGlzLnRyYWNraW5nRXZlbnRzW2VdPXQuc2xpY2UoMCl9dGhpcy5jcmVhdGl2ZSBpbnN0YW5jZW9mIENyZWF0aXZlTGluZWFyP3RoaXMuX2luaXRMaW5lYXJUcmFja2luZygpOnRoaXMuX2luaXRWYXJpYXRpb25UcmFja2luZygpLGUmJnRoaXMub24oXCJzdGFydFwiLCgpPT57ZS5sYXN0U3VjY2Vzc2Z1bEFkPURhdGUubm93KCl9KX1faW5pdExpbmVhclRyYWNraW5nKCl7dGhpcy5saW5lYXI9ITAsdGhpcy5za2lwRGVsYXk9dGhpcy5jcmVhdGl2ZS5za2lwRGVsYXksdGhpcy5zZXREdXJhdGlvbih0aGlzLmNyZWF0aXZlLmR1cmF0aW9uKSx0aGlzLmNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPXRoaXMuY3JlYXRpdmUudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSx0aGlzLmNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9dGhpcy5jcmVhdGl2ZS52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXN9X2luaXRWYXJpYXRpb25UcmFja2luZygpe2lmKHRoaXMubGluZWFyPSExLHRoaXMuc2tpcERlbGF5PURFRkFVTFRfU0tJUF9ERUxBWSx0aGlzLnZhcmlhdGlvbil7Zm9yKGxldCBlIGluIHRoaXMudmFyaWF0aW9uLnRyYWNraW5nRXZlbnRzKXtjb25zdCB0PXRoaXMudmFyaWF0aW9uLnRyYWNraW5nRXZlbnRzW2VdO3RoaXMudHJhY2tpbmdFdmVudHNbZV0/dGhpcy50cmFja2luZ0V2ZW50c1tlXT10aGlzLnRyYWNraW5nRXZlbnRzW2VdLmNvbmNhdCh0LnNsaWNlKDApKTp0aGlzLnRyYWNraW5nRXZlbnRzW2VdPXQuc2xpY2UoMCl9dGhpcy52YXJpYXRpb24gaW5zdGFuY2VvZiBOb25MaW5lYXJBZD8odGhpcy5jbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT10aGlzLnZhcmlhdGlvbi5ub25saW5lYXJDbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSx0aGlzLmNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9dGhpcy52YXJpYXRpb24ubm9ubGluZWFyQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyx0aGlzLnNldER1cmF0aW9uKHRoaXMudmFyaWF0aW9uLm1pblN1Z2dlc3RlZER1cmF0aW9uKSk6dGhpcy52YXJpYXRpb24gaW5zdGFuY2VvZiBDb21wYW5pb25BZCYmKHRoaXMuY2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9dGhpcy52YXJpYXRpb24uY29tcGFuaW9uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUsdGhpcy5jbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPXRoaXMudmFyaWF0aW9uLmNvbXBhbmlvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMpfX1zZXREdXJhdGlvbihlKXt0aGlzLmFzc2V0RHVyYXRpb249ZSx0aGlzLnF1YXJ0aWxlcz17Zmlyc3RRdWFydGlsZTpNYXRoLnJvdW5kKDI1KnRoaXMuYXNzZXREdXJhdGlvbikvMTAwLG1pZHBvaW50Ok1hdGgucm91bmQoNTAqdGhpcy5hc3NldER1cmF0aW9uKS8xMDAsdGhpcmRRdWFydGlsZTpNYXRoLnJvdW5kKDc1KnRoaXMuYXNzZXREdXJhdGlvbikvMTAwfX1zZXRQcm9ncmVzcyhlKXtjb25zdCB0PXRoaXMuc2tpcERlbGF5fHxERUZBVUxUX1NLSVBfREVMQVk7aWYoLTE9PT10fHx0aGlzLnNraXBwYWJsZXx8KHQ+ZT90aGlzLmVtaXQoXCJza2lwLWNvdW50ZG93blwiLHQtZSk6KHRoaXMuc2tpcHBhYmxlPSEwLHRoaXMuZW1pdChcInNraXAtY291bnRkb3duXCIsMCkpKSx0aGlzLmFzc2V0RHVyYXRpb24+MCl7Y29uc3QgdD1bXTtpZihlPjApe2NvbnN0IHI9TWF0aC5yb3VuZChlL3RoaXMuYXNzZXREdXJhdGlvbioxMDApO3QucHVzaChcInN0YXJ0XCIpLHQucHVzaChgcHJvZ3Jlc3MtJHtyfSVgKSx0LnB1c2goYHByb2dyZXNzLSR7TWF0aC5yb3VuZChlKX1gKTtmb3IobGV0IHIgaW4gdGhpcy5xdWFydGlsZXMpdGhpcy5pc1F1YXJ0aWxlUmVhY2hlZChyLHRoaXMucXVhcnRpbGVzW3JdLGUpJiYodC5wdXNoKHIpLHRoaXMuX2FscmVhZHlUcmlnZ2VyZWRRdWFydGlsZXNbcl09ITApfXQuZm9yRWFjaChlPT57dGhpcy50cmFjayhlLCEwKX0pLGU8dGhpcy5wcm9ncmVzcyYmdGhpcy50cmFjayhcInJld2luZFwiKX10aGlzLnByb2dyZXNzPWV9aXNRdWFydGlsZVJlYWNoZWQoZSx0LHIpe2xldCBpPSExO3JldHVybiB0PD1yJiYhdGhpcy5fYWxyZWFkeVRyaWdnZXJlZFF1YXJ0aWxlc1tlXSYmKGk9ITApLGl9c2V0TXV0ZWQoZSl7dGhpcy5tdXRlZCE9PWUmJnRoaXMudHJhY2soZT9cIm11dGVcIjpcInVubXV0ZVwiKSx0aGlzLm11dGVkPWV9c2V0UGF1c2VkKGUpe3RoaXMucGF1c2VkIT09ZSYmdGhpcy50cmFjayhlP1wicGF1c2VcIjpcInJlc3VtZVwiKSx0aGlzLnBhdXNlZD1lfXNldEZ1bGxzY3JlZW4oZSl7dGhpcy5mdWxsc2NyZWVuIT09ZSYmdGhpcy50cmFjayhlP1wiZnVsbHNjcmVlblwiOlwiZXhpdEZ1bGxzY3JlZW5cIiksdGhpcy5mdWxsc2NyZWVuPWV9c2V0RXhwYW5kKGUpe3RoaXMuZXhwYW5kZWQhPT1lJiZ0aGlzLnRyYWNrKGU/XCJleHBhbmRcIjpcImNvbGxhcHNlXCIpLHRoaXMuZXhwYW5kZWQ9ZX1zZXRTa2lwRGVsYXkoZSl7XCJudW1iZXJcIj09dHlwZW9mIGUmJih0aGlzLnNraXBEZWxheT1lKX10cmFja0ltcHJlc3Npb24oKXt0aGlzLmltcHJlc3NlZHx8KHRoaXMuaW1wcmVzc2VkPSEwLHRoaXMudHJhY2tVUkxzKHRoaXMuYWQuaW1wcmVzc2lvblVSTFRlbXBsYXRlcyksdGhpcy50cmFjayhcImNyZWF0aXZlVmlld1wiKSl9ZXJyb3JXaXRoQ29kZShlKXt0aGlzLnRyYWNrVVJMcyh0aGlzLmFkLmVycm9yVVJMVGVtcGxhdGVzLHtFUlJPUkNPREU6ZX0pfWNvbXBsZXRlKCl7dGhpcy50cmFjayhcImNvbXBsZXRlXCIpfWNsb3NlKCl7dGhpcy50cmFjayh0aGlzLmxpbmVhcj9cImNsb3NlTGluZWFyXCI6XCJjbG9zZVwiKX1za2lwKCl7dGhpcy50cmFjayhcInNraXBcIiksdGhpcy50cmFja2luZ0V2ZW50cz1bXX1jbGljayhlPW51bGwpe3RoaXMuY2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyYmdGhpcy5jbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLmxlbmd0aCYmdGhpcy50cmFja1VSTHModGhpcy5jbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzKTtjb25zdCB0PXRoaXMuY2xpY2tUaHJvdWdoVVJMVGVtcGxhdGV8fGU7aWYodCl7Y29uc3QgZT10aGlzLmxpbmVhcj97Q09OVEVOVFBMQVlIRUFEOnRoaXMucHJvZ3Jlc3NGb3JtYXR0ZWQoKX06e30scj11dGlsLnJlc29sdmVVUkxUZW1wbGF0ZXMoW3RdLGUpWzBdO3RoaXMuZW1pdChcImNsaWNrdGhyb3VnaFwiLHIpfX10cmFjayhlLHQ9ITEpe1wiY2xvc2VMaW5lYXJcIj09PWUmJiF0aGlzLnRyYWNraW5nRXZlbnRzW2VdJiZ0aGlzLnRyYWNraW5nRXZlbnRzLmNsb3NlJiYoZT1cImNsb3NlXCIpO2NvbnN0IHI9dGhpcy50cmFja2luZ0V2ZW50c1tlXSxpPXRoaXMuZW1pdEFsd2F5c0V2ZW50cy5pbmRleE9mKGUpPi0xO3I/KHRoaXMuZW1pdChlLFwiXCIpLHRoaXMudHJhY2tVUkxzKHIpKTppJiZ0aGlzLmVtaXQoZSxcIlwiKSx0JiYoZGVsZXRlIHRoaXMudHJhY2tpbmdFdmVudHNbZV0saSYmdGhpcy5lbWl0QWx3YXlzRXZlbnRzLnNwbGljZSh0aGlzLmVtaXRBbHdheXNFdmVudHMuaW5kZXhPZihlKSwxKSl9dHJhY2tVUkxzKGUsdD17fSl7dGhpcy5saW5lYXImJih0aGlzLmNyZWF0aXZlJiZ0aGlzLmNyZWF0aXZlLm1lZGlhRmlsZXMmJnRoaXMuY3JlYXRpdmUubWVkaWFGaWxlc1swXSYmdGhpcy5jcmVhdGl2ZS5tZWRpYUZpbGVzWzBdLmZpbGVVUkwmJih0LkFTU0VUVVJJPXRoaXMuY3JlYXRpdmUubWVkaWFGaWxlc1swXS5maWxlVVJMKSx0LkNPTlRFTlRQTEFZSEVBRD10aGlzLnByb2dyZXNzRm9ybWF0dGVkKCkpLHV0aWwudHJhY2soZSx0KX1wcm9ncmVzc0Zvcm1hdHRlZCgpe2NvbnN0IGU9cGFyc2VJbnQodGhpcy5wcm9ncmVzcyk7bGV0IHQ9ZS8zNjAwO3QubGVuZ3RoPDImJih0PWAwJHt0fWApO2xldCByPWUvNjAlNjA7ci5sZW5ndGg8MiYmKHI9YDAke3J9YCk7bGV0IGk9ZSU2MDtyZXR1cm4gaS5sZW5ndGg8MiYmKGk9YDAke3J9YCksYCR7dH06JHtyfToke2l9LiR7cGFyc2VJbnQoMTAwKih0aGlzLnByb2dyZXNzLWUpKX1gfX1leHBvcnR7VkFTVENsaWVudCxWQVNUUGFyc2VyLFZBU1RUcmFja2VyfTsiXSwic291cmNlUm9vdCI6IiJ9