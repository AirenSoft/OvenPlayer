/*! OvenPlayerv0.9.6255 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

            //keep volume even if playlist item changes.
            elAdVideo.volume = elVideo.volume;
            elAdVideo.muted = elVideo.muted;
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

        //Flash play is very fast...
        if (_constants.STATE_PLAYING === provider.getState()) {
            provider.pause();
        }

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

        adsSpec.started = true;
        adsSpec.active = true;
        processStartOfAd();

        provider.trigger(_constants.AD_CHANGED, { isLinear: true });
        provider.setState(_constants.STATE_AD_PLAYING);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2Fkcy9pbWEvQWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9hZHMvaW1hL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvYWRzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvYWRzL3Zhc3QvQWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9hZHMvdmFzdC9MaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy92YXN0LWNsaWVudC5qcyJdLCJuYW1lcyI6WyJBZCIsImVsVmlkZW8iLCJwcm92aWRlciIsInBsYXllckNvbmZpZyIsImFkVGFnVXJsIiwiZXJyb3JDYWxsYmFjayIsIkFVVE9QTEFZX05PVF9BTExPV0VEIiwiQURNQU5HRVJfTE9BRElOR19FUlJPUiIsIkFEU19NQU5BR0VSX0xPQURFRCIsIkFEX0VSUk9SIiwidGhhdCIsImFkc01hbmFnZXJMb2FkZWQiLCJhZHNFcnJvck9jY3VycmVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJPbk1hbmFnZXJMb2FkZWQiLCJPbkFkRXJyb3IiLCJhZERpc3BsYXlDb250YWluZXIiLCJhZHNMb2FkZXIiLCJhZHNNYW5hZ2VyIiwibGlzdGVuZXIiLCJhZHNSZXF1ZXN0IiwiYXV0b3BsYXlBbGxvd2VkIiwiYXV0b3BsYXlSZXF1aXJlc011dGVkIiwiYnJvd3NlciIsImdldEJyb3dzZXIiLCJpc01vYmlsZSIsIm9zIiwiYWREaXNwbGF5Q29udGFpbmVySW5pdGlhbGl6ZWQiLCJzZW5kV2FybmluZ01lc3NhZ2VGb3JNdXRlZFBsYXkiLCJ0cmlnZ2VyIiwiUExBWUVSX1dBUk5JTkciLCJtZXNzYWdlIiwiV0FSTl9NU0dfTVVURURQTEFZIiwidGltZXIiLCJpY29uQ2xhc3MiLCJVSV9JQ09OUyIsInZvbHVtZV9tdXRlIiwib25DbGlja0NhbGxiYWNrIiwic2V0TXV0ZSIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZ29vZ2xlIiwiaW1hIiwiQWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiVHlwZSIsIkFkRXJyb3JFdmVudCIsInNldHRpbmdzIiwic2V0TG9jYWxlIiwic2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzIiwiY3JlYXRlQWRDb250YWluZXIiLCJhZENvbnRhaW5lciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImdldENvbnRhaW5lciIsImFwcGVuZCIsImFkRXJyb3JFdmVudCIsImNvbnNvbGUiLCJnZXRFcnJvciIsImdldFZhc3RFcnJvckNvZGUiLCJnZXRNZXNzYWdlIiwiaW5uZXJFcnJvciIsImdldElubmVyRXJyb3IiLCJnZXRFcnJvckNvZGUiLCJTVEFURV9BRF9FUlJPUiIsImNvZGUiLCJwbGF5IiwiYWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiYWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJBZHNSZW5kZXJpbmdTZXR0aW5ncyIsInJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUiLCJkZXN0cm95IiwiZ2V0QWRzTWFuYWdlciIsImFkQ29uYXRpbmVyRWxtZW50IiwiQWREaXNwbGF5Q29udGFpbmVyIiwiQWRzTG9hZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uIiwiQ09OVEVOVF9WT0xVTUUiLCJkYXRhIiwibXV0ZSIsInNldFZvbHVtZSIsInZvbHVtZSIsInNldEF1dG9QbGF5VG9BZHNSZXF1ZXN0Iiwic2V0QWRXaWxsQXV0b1BsYXkiLCJzZXRBZFdpbGxQbGF5TXV0ZWQiLCJpbml0UmVxdWVzdCIsIkFkc1JlcXVlc3QiLCJmb3JjZU5vbkxpbmVhckZ1bGxTbG90IiwicmVxdWVzdEFkcyIsImNoZWNrQXV0b3BsYXlTdXBwb3J0IiwidGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8iLCJzcmMiLCJURU1QX1ZJREVPX1VSTCIsImxvYWQiLCJnZXROYW1lIiwiUFJPVklERVJfREFTSCIsImNsZWFyQW5kUmVwb3J0IiwiX2F1dG9wbGF5QWxsb3dlZCIsIl9hdXRvcGxheVJlcXVpcmVzTXV0ZWQiLCJwYXVzZSIsInJlbW92ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicGxheVByb21pc2UiLCJ1bmRlZmluZWQiLCJ0aGVuIiwiZXJyb3IiLCJpc0FjdGl2ZSIsInJlc3VtZSIsImluaXRpYWxpemUiLCJyZXRyeUNvdW50IiwiY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSIsImluaXQiLCJWaWV3TW9kZSIsIk5PUk1BTCIsInN0YXJ0IiwiRXJyb3IiLCJzZXRUaW1lb3V0IiwiaXNBdXRvU3RhcnQiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJjb21wbGV0ZUNvbnRlbnRDYWxsYmFjayIsImlzQWxsQWRDb21wbGV0ZSIsImlzTGluZWFyQWQiLCJjb250ZW50Q29tcGxldGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiJGFkcyIsImZpbmQiLCJvZmYiLCJMaXN0ZW5lciIsImFkc1NwZWMiLCJsb3dMZXZlbEV2ZW50cyIsImludGVydmFsVGltZXIiLCJBRF9CVUZGRVJJTkciLCJBZEV2ZW50IiwiQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQiLCJDT05URU5UX1JFU1VNRV9SRVFVRVNURUQiLCJBTExfQURTX0NPTVBMRVRFRCIsIkNMSUNLIiwiU0tJUFBFRCIsIkNPTVBMRVRFIiwiRklSU1RfUVVBUlRJTEUiLCJMT0FERUQiLCJNSURQT0lOVCIsIlBBVVNFRCIsIlJFU1VNRUQiLCJTVEFSVEVEIiwiVVNFUl9DTE9TRSIsIlRISVJEX1FVQVJUSUxFIiwiaXNBbGxBZENvbXBlbGV0ZSIsImFkQ29tcGxldGVDYWxsYmFjayIsImN1cnJlbnRBZCIsImFkRXZlbnQiLCJ0eXBlIiwiZ2V0UG9zaXRpb24iLCJzZXRTdGF0ZSIsIlNUQVRFX0NPTVBMRVRFIiwiUExBWUVSX0NMSUNLRUQiLCJQTEFZRVJfQURfQ0xJQ0siLCJnZXRBZCIsImdldEFkRGF0YSIsInJlbWFpbmluZ1RpbWUiLCJnZXRSZW1haW5pbmdUaW1lIiwiYWQiLCJTVEFURV9BRF9MT0FERUQiLCJyZW1haW5pbmciLCJpc0xpbmVhciIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX1BMQVlJTkciLCJhZE9iamVjdCIsImR1cmF0aW9uIiwiZ2V0RHVyYXRpb24iLCJza2lwVGltZU9mZnNldCIsImdldFNraXBUaW1lT2Zmc2V0IiwiQURfQ0hBTkdFRCIsInNldEludGVydmFsIiwiQURfVElNRSIsInBvc2l0aW9uIiwic2tpcHBhYmxlIiwiZ2V0QWRTa2lwcGFibGVTdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJTVEFURV9BRF9DT01QTEVURSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwic2V0QWRDb21wbGV0ZUNhbGxiYWNrIiwiX2FkQ29tcGxldGVDYWxsYmFjayIsImNvbnRhaW5lciIsImVsQWRWaWRlbyIsInRleHRWaWV3IiwiYWRCdXR0b24iLCJ2YXN0Q2xpZW50IiwiVkFTVENsaWVudCIsInZhc3RUcmFja2VyIiwic3R5bGUiLCJkaXNwbGF5IiwiZ2V0IiwicmVzIiwiYWRzIiwiVkFTVFRyYWNrZXIiLCJjcmVhdGl2ZXMiLCJ2aWRlb1VSTCIsImxlbmd0aCIsIm1lZGlhRmlsZXMiLCJmaWxlVVJMIiwibXV0ZWQiLCJjaGVja01haW5Db250ZW50TG9hZGVkIiwibWV0YUxvYWRlZCIsIk1FRElBRklMRV9QTEFZQkFDS19FUlJPUiIsIiR0ZXh0VmlldyIsIiRhZEJ1dHRvbiIsIiRlbEFkVmlkZW8iLCJwcm9jZXNzRW5kT2ZBZCIsImhpZGUiLCJwcm9jZXNzU3RhcnRPZkFkIiwic2hvdyIsInNraXBCdXR0b25DbGlja2VkIiwiZXZlbnQiLCJoYXNDbGFzcyIsInNraXAiLCJlcnJvcldpdGhDb2RlIiwiY2FucGxheSIsImVuZGVkIiwiY29tcGxldGUiLCJjbGljayIsInNldFBhdXNlZCIsInRpbWV1cGRhdGUiLCJzZXRQcm9ncmVzcyIsInRhcmdldCIsImN1cnJlbnRUaW1lIiwidm9sdW1lY2hhbmdlIiwic2V0TXV0ZWQiLCJsb2FkZWRtZXRhZGF0YSIsIlNUQVRFX1BMQVlJTkciLCJnZXRTdGF0ZSIsInRyYWNrSW1wcmVzc2lvbiIsInVybCIsIndpbmRvdyIsIm9wZW4iLCJodG1sIiwiYWRkQ2xhc3MiLCJwYXJzZUludCIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJlbGVtZW50T3JNc2UiLCJfIiwiaXNFbGVtZW50IiwiZ2V0VmlkZW9FbGVtZW50IiwibWVkaWEiLCJzZXBhcmF0ZUxpdmUiLCJtc2UiLCJpc0R5bmFtaWMiLCJlcnJvclRyaWdnZXIiLCJTVEFURV9FUlJPUiIsIkVSUk9SIiwicGlja0N1cnJlbnRTb3VyY2UiLCJzb3VyY2VzIiwiY3VycmVudFNvdXJjZSIsInNvdXJjZUluZGV4IiwiTWF0aCIsIm1heCIsImxhYmVsIiwiaSIsImdldFNvdXJjZUluZGV4IiwiaWQiLCJzZXF1ZW5jZSIsInN5c3RlbSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJhZHZlcnRpc2VyIiwicHJpY2luZyIsInN1cnZleSIsImVycm9yVVJMVGVtcGxhdGVzIiwiaW1wcmVzc2lvblVSTFRlbXBsYXRlcyIsImV4dGVuc2lvbnMiLCJBZEV4dGVuc2lvbiIsImF0dHJpYnV0ZXMiLCJjaGlsZHJlbiIsIkFkRXh0ZW5zaW9uQ2hpbGQiLCJuYW1lIiwidmFsdWUiLCJDb21wYW5pb25BZCIsIndpZHRoIiwiaGVpZ2h0Iiwic3RhdGljUmVzb3VyY2UiLCJodG1sUmVzb3VyY2UiLCJpZnJhbWVSZXNvdXJjZSIsImFsdFRleHQiLCJjb21wYW5pb25DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSIsImNvbXBhbmlvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMiLCJ0cmFja2luZ0V2ZW50cyIsIkNyZWF0aXZlIiwiZSIsImFkSWQiLCJhcGlGcmFtZXdvcmsiLCJDcmVhdGl2ZUNvbXBhbmlvbiIsInZhcmlhdGlvbnMiLCJ0cmFjayIsInQiLCJyZXNvbHZlVVJMVGVtcGxhdGVzIiwiSW1hZ2UiLCJyIiwiQVNTRVRVUkkiLCJlbmNvZGVVUklDb21wb25lbnRSRkMzOTg2IiwiQ09OVEVOVFBMQVlIRUFEIiwiRVJST1JDT0RFIiwidGVzdCIsIkNBQ0hFQlVTVElORyIsImxlZnRwYWQiLCJyb3VuZCIsInJhbmRvbSIsInRvU3RyaW5nIiwiVElNRVNUQU1QIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiUkFORE9NIiwicyIsIm4iLCJyZXBsYWNlIiwicHVzaCIsImVuY29kZVVSSUNvbXBvbmVudCIsImNoYXJDb2RlQXQiLCJyYW5nZSIsIm1hcCIsImpvaW4iLCJpc051bWVyaWMiLCJpc05hTiIsInBhcnNlRmxvYXQiLCJpc0Zpbml0ZSIsImZsYXR0ZW4iLCJyZWR1Y2UiLCJjb25jYXQiLCJBcnJheSIsImlzQXJyYXkiLCJ1dGlsIiwiY2hpbGRCeU5hbWUiLCJjaGlsZE5vZGVzIiwibm9kZU5hbWUiLCJjaGlsZHJlbkJ5TmFtZSIsInJlc29sdmVWYXN0QWRUYWdVUkkiLCJpbmRleE9mIiwibG9jYXRpb24iLCJwcm90b2NvbCIsInNsaWNlIiwibGFzdEluZGV4T2YiLCJwYXJzZUJvb2xlYW4iLCJwYXJzZU5vZGVUZXh0IiwidGV4dENvbnRlbnQiLCJ0ZXh0IiwidHJpbSIsImNvcHlOb2RlQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwicGFyc2VEdXJhdGlvbiIsInNwbGl0Iiwic3BsaXRWQVNUIiwibWVyZ2VXcmFwcGVyQWREYXRhIiwidmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzIiwidmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcyIsInZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUiLCJwYXJzZXJVdGlscyIsInBhcnNlQ3JlYXRpdmVDb21wYW5pb24iLCJjb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGUiLCJDcmVhdGl2ZUxpbmVhciIsInNraXBEZWxheSIsImFkUGFyYW1ldGVycyIsImljb25zIiwiSWNvbiIsInByb2dyYW0iLCJ4UG9zaXRpb24iLCJ5UG9zaXRpb24iLCJvZmZzZXQiLCJpY29uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUiLCJpY29uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyIsImljb25WaWV3VHJhY2tpbmdVUkxUZW1wbGF0ZSIsIk1lZGlhRmlsZSIsImRlbGl2ZXJ5VHlwZSIsIm1pbWVUeXBlIiwiY29kZWMiLCJiaXRyYXRlIiwibWluQml0cmF0ZSIsIm1heEJpdHJhdGUiLCJzY2FsYWJsZSIsIm1haW50YWluQXNwZWN0UmF0aW8iLCJwYXJzZUNyZWF0aXZlTGluZWFyIiwiY2hhckF0IiwiYSIsInRvTG93ZXJDYXNlIiwibyIsInBhcnNlWFBvc2l0aW9uIiwicGFyc2VZUG9zaXRpb24iLCJDcmVhdGl2ZU5vbkxpbmVhciIsIk5vbkxpbmVhckFkIiwiZXhwYW5kZWRXaWR0aCIsImV4cGFuZGVkSGVpZ2h0IiwibWluU3VnZ2VzdGVkRHVyYXRpb24iLCJub25saW5lYXJDbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSIsIm5vbmxpbmVhckNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMiLCJwYXJzZUNyZWF0aXZlTm9uTGluZWFyIiwicGFyc2VBZCIsInBhcnNlV3JhcHBlciIsInBhcnNlSW5MaW5lIiwicGFyc2VDcmVhdGl2ZUFkSWRBdHRyaWJ1dGUiLCJwYXJzZUV4dGVuc2lvbnMiLCJ2ZXJzaW9uIiwibW9kZWwiLCJjdXJyZW5jeSIsIm5leHRXcmFwcGVyVVJMIiwibm9kZVZhbHVlIiwiZG9tYWluIiwiRXZlbnRIYW5kbGVycyIsIkV2ZW50RW1pdHRlciIsImNhbGwiLCIkZ2V0TWF4TGlzdGVuZXJzIiwiX21heExpc3RlbmVycyIsImRlZmF1bHRNYXhMaXN0ZW5lcnMiLCJlbWl0Tm9uZSIsImFycmF5Q2xvbmUiLCJlbWl0T25lIiwiZW1pdFR3byIsImVtaXRUaHJlZSIsImwiLCJlbWl0TWFueSIsImFwcGx5IiwiX2FkZExpc3RlbmVyIiwiVHlwZUVycm9yIiwiX2V2ZW50cyIsIm5ld0xpc3RlbmVyIiwiZW1pdCIsIl9ldmVudHNDb3VudCIsInVuc2hpZnQiLCJ3YXJuZWQiLCJlbWl0dGVyIiwiY291bnQiLCJlbWl0V2FybmluZyIsIndhcm4iLCJfb25jZVdyYXAiLCJyZW1vdmVMaXN0ZW5lciIsImFyZ3VtZW50cyIsImxpc3RlbmVyQ291bnQiLCJzcGxpY2VPbmUiLCJwb3AiLCJ1bndyYXBMaXN0ZW5lcnMiLCJ4ZHIiLCJYRG9tYWluUmVxdWVzdCIsInN1cHBvcnRlZCIsIkFjdGl2ZVhPYmplY3QiLCJhc3luYyIsInJlcXVlc3QiLCJ0aW1lb3V0Iiwid2l0aENyZWRlbnRpYWxzIiwic2VuZCIsIm9ucHJvZ3Jlc3MiLCJvbmxvYWQiLCJsb2FkWE1MIiwicmVzcG9uc2VUZXh0IiwicHJvdG90eXBlIiwiY3JlYXRlIiwidXNpbmdEb21haW5zIiwiRG9tYWluIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRNYXhMaXN0ZW5lcnMiLCJnZXRNYXhMaXN0ZW5lcnMiLCJjIiwiY29udGV4dCIsImRvbWFpbkVtaXR0ZXIiLCJkb21haW5UaHJvd24iLCJwIiwiYWRkTGlzdGVuZXIiLCJwcmVwZW5kTGlzdGVuZXIiLCJvbmNlIiwicHJlcGVuZE9uY2VMaXN0ZW5lciIsInJlbW92ZUFsbExpc3RlbmVycyIsImxpc3RlbmVycyIsImV2ZW50TmFtZXMiLCJSZWZsZWN0Iiwib3duS2V5cyIsImZsYXNoVVJMSGFuZGxlciIsImdldCQxIiwibm9kZVVSTEhhbmRsZXIiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsInN1cHBvcnRlZCQxIiwiZ2V0JDIiLCJvdmVycmlkZU1pbWVUeXBlIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlWE1MIiwic3RhdHVzVGV4dCIsIlhIUlVSTEhhbmRsZXIiLCJnZXQkMyIsInVybEhhbmRsZXIiLCJWQVNUUmVzcG9uc2UiLCJERUZBVUxUX01BWF9XUkFQUEVSX0RFUFRIIiwiREVGQVVMVF9FVkVOVF9EQVRBIiwiVkFTVFBhcnNlciIsInJlbWFpbmluZ0FkcyIsInBhcmVudFVSTHMiLCJyb290RXJyb3JVUkxUZW1wbGF0ZXMiLCJtYXhXcmFwcGVyRGVwdGgiLCJVUkxUZW1wbGF0ZUZpbHRlcnMiLCJmZXRjaGluZ09wdGlvbnMiLCJ3cmFwcGVyRGVwdGgiLCJvcmlnaW5hbFVybCIsInJvb3RVUkwiLCJ3cmFwcGVyTGltaXQiLCJ1cmxoYW5kbGVyIiwic2hpZnQiLCJyZXNvbHZlQWRzIiwiYnVpbGRWQVNUUmVzcG9uc2UiLCJpbml0UGFyc2luZ1N0YXR1cyIsImZldGNoVkFTVCIsImlzUm9vdFZBU1QiLCJwYXJzZSIsImdldEVycm9yVVJMVGVtcGxhdGVzIiwiY29tcGxldGVXcmFwcGVyUmVzb2x2aW5nIiwicmVzb2x2ZUFsbCIsIndyYXBwZXJTZXF1ZW5jZSIsImRvY3VtZW50RWxlbWVudCIsInRyYWNrVmFzdEVycm9yIiwicmVzb2x2ZVdyYXBwZXJzIiwiYWxsIiwiZXJyb3JDb2RlIiwiZXJyb3JNZXNzYWdlIiwiRVJST1JNRVNTQUdFIiwic3BsaWNlIiwic3RvcmFnZSIsIkRFRkFVTFRfU1RPUkFHRSIsImdldEl0ZW0iLCJzZXRJdGVtIiwicmVtb3ZlSXRlbSIsImNsZWFyIiwiU3RvcmFnZSIsImluaXRTdG9yYWdlIiwibG9jYWxTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJpc1N0b3JhZ2VEaXNhYmxlZCIsImNhcHBpbmdGcmVlTHVuY2giLCJjYXBwaW5nTWluaW11bVRpbWVJbnRlcnZhbCIsImRlZmF1bHRPcHRpb25zIiwidmFzdFBhcnNlciIsImxhc3RTdWNjZXNzZnVsQWQiLCJ0b3RhbENhbGxzIiwidG90YWxDYWxsc1RpbWVvdXQiLCJnZXRSZW1haW5pbmdBZHMiLCJub3ciLCJoYXNPd25Qcm9wZXJ0eSIsImdldEFuZFBhcnNlVkFTVCIsIkRFRkFVTFRfU0tJUF9ERUxBWSIsImNyZWF0aXZlIiwidmFyaWF0aW9uIiwiaW1wcmVzc2VkIiwiX2FscmVhZHlUcmlnZ2VyZWRRdWFydGlsZXMiLCJlbWl0QWx3YXlzRXZlbnRzIiwiX2luaXRMaW5lYXJUcmFja2luZyIsIl9pbml0VmFyaWF0aW9uVHJhY2tpbmciLCJsaW5lYXIiLCJzZXREdXJhdGlvbiIsImNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlIiwiY2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyIsImFzc2V0RHVyYXRpb24iLCJxdWFydGlsZXMiLCJmaXJzdFF1YXJ0aWxlIiwibWlkcG9pbnQiLCJ0aGlyZFF1YXJ0aWxlIiwiaXNRdWFydGlsZVJlYWNoZWQiLCJwcm9ncmVzcyIsInBhdXNlZCIsImZ1bGxzY3JlZW4iLCJleHBhbmRlZCIsInRyYWNrVVJMcyIsInByb2dyZXNzRm9ybWF0dGVkIiwiY2xvc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBY0EsSUFBTUEsS0FBSyxTQUFMQSxFQUFLLENBQVNDLE9BQVQsRUFBa0JDLFFBQWxCLEVBQTRCQyxZQUE1QixFQUEwQ0MsUUFBMUMsRUFBb0RDLGFBQXBELEVBQWtFO0FBQ3pFO0FBQ0EsUUFBTUMsdUJBQXVCLG9CQUE3QjtBQUNBLFFBQU1DLHlCQUF5Qix5QkFBL0I7QUFDQSxRQUFJQyxxQkFBcUIsRUFBekI7QUFDQSxRQUFJQyxXQUFXLEVBQWY7O0FBRUEsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsT0FBTztBQUNQQyxpQkFBUyxLQURGLEVBQ1M7QUFDaEJDLGdCQUFTLEtBRkYsRUFFUztBQUNoQkMsc0JBQWU7QUFIUixLQUFYO0FBS0EsUUFBSUMsa0JBQWtCLElBQXRCO0FBQ0EsUUFBSUMsWUFBWSxJQUFoQjs7QUFFQSxRQUFJQyxxQkFBcUIsSUFBekI7QUFDQSxRQUFJQyxZQUFZLElBQWhCO0FBQ0EsUUFBSUMsYUFBYSxJQUFqQjtBQUNBLFFBQUlDLFdBQVcsSUFBZjtBQUNBLFFBQUlDLGFBQWEsSUFBakI7QUFDQSxRQUFJQyxrQkFBa0IsS0FBdEI7QUFBQSxRQUE2QkMsd0JBQXdCLEtBQXJEO0FBQ0EsUUFBSUMs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VyxPQUFPOUIsRUFBRTNELE1BQUYsR0FBUyxDQUFULEtBQWEyRCxVQUFNdUMsQ0FBbkIsR0FBMkJILENBQTNCLFNBQWdDRyxDQUFoQyxTQUFxQ3ZDLENBQXJDLFNBQTBDcEIsU0FBUyxPQUFLLEtBQUtvVSxRQUFMLEdBQWNsUixDQUFuQixDQUFULENBQWpEO0FBQW1GOzs7O0VBQXh0SXNILFk7O1FBQWd1SXpOLFUsR0FBQUEsVTtRQUFXOFMsVSxHQUFBQSxVO1FBQVd2UyxXLEdBQUFBLFciLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX4yZWMxOTNhYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDA4LzA0LzIwMTkuXG4gKi9cbmltcG9ydCBBZHNFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL2Fkcy9pbWEvTGlzdGVuZXJcIjtcbmltcG9ydCB7VEVNUF9WSURFT19VUkx9IGZyb20gXCJhcGkvYWRzL3V0aWxzXCI7XG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIEVSUk9SLCBFUlJPUlMsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBJTklUX0FEU19FUlJPUixcbiAgICBTVEFURV9BRF9FUlJPUixcbiAgICBQTEFZRVJfV0FSTklORyxcbiAgICBDT05URU5UX01FVEEsXG4gICAgV0FSTl9NU0dfTVVURURQTEFZLFxuICAgIFNUQVRFX0FEX0xPQURJTkcsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBVSV9JQ09OU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBBZCA9IGZ1bmN0aW9uKGVsVmlkZW8sIHByb3ZpZGVyLCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsLCBlcnJvckNhbGxiYWNrKXtcbiAgICAvL1RvZG8gOiBtb3ZlIGNyZWF0ZUFkQ29udGFpbmVyIHRvIE1lZGlhTWFuYWdlclxuICAgIGNvbnN0IEFVVE9QTEFZX05PVF9BTExPV0VEID0gXCJhdXRvcGxheU5vdEFsbG93ZWRcIjtcbiAgICBjb25zdCBBRE1BTkdFUl9MT0FESU5HX0VSUk9SID0gXCJhZG1hbmFnZXJMb2FkaW5nVGltZW91dFwiO1xuICAgIGxldCBBRFNfTUFOQUdFUl9MT0FERUQgPSBcIlwiO1xuICAgIGxldCBBRF9FUlJPUiA9IFwiXCI7XG5cbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBhZHNNYW5hZ2VyTG9hZGVkID0gZmFsc2U7XG4gICAgbGV0IGFkc0Vycm9yT2NjdXJyZWQgPSBmYWxzZTtcbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgc3RhcnRlZDogZmFsc2UsIC8vcGxheWVyIHN0YXJ0ZWRcbiAgICAgICAgYWN0aXZlIDogZmFsc2UsIC8vb24gQWRcbiAgICAgICAgaXNWaWRlb0VuZGVkIDogZmFsc2VcbiAgICB9O1xuICAgIGxldCBPbk1hbmFnZXJMb2FkZWQgPSBudWxsO1xuICAgIGxldCBPbkFkRXJyb3IgPSBudWxsO1xuXG4gICAgbGV0IGFkRGlzcGxheUNvbnRhaW5lciA9IG51bGw7XG4gICAgbGV0IGFkc0xvYWRlciA9IG51bGw7XG4gICAgbGV0IGFkc01hbmFnZXIgPSBudWxsO1xuICAgIGxldCBsaXN0ZW5lciA9IG51bGw7XG4gICAgbGV0IGFkc1JlcXVlc3QgPSBudWxsO1xuICAgIGxldCBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZSwgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgbGV0IGJyb3dzZXIgPSBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpO1xuICAgIGxldCBpc01vYmlsZSA9IGJyb3dzZXIub3MgPT09IFwiQW5kcm9pZFwiIHx8IGJyb3dzZXIub3MgPT09IFwiaU9TXCI7XG5cbiAgICBsZXQgYWREaXNwbGF5Q29udGFpbmVySW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgIC8vIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0QXV0b1BsYXlBZEJyZWFrcyhmYWxzZSk7XG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldFZwYWlkTW9kZShnb29nbGUuaW1hLkltYVNka1NldHRpbmdzLlZwYWlkTW9kZS5FTkFCTEVEKTtcblxuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUoJ2tvJyk7XG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldFZwYWlkTW9kZShnb29nbGUuaW1hLkltYVNka1NldHRpbmdzLlZwYWlkTW9kZS5FTkFCTEVEKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xuICAgIGNvbnN0IHNlbmRXYXJuaW5nTWVzc2FnZUZvck11dGVkUGxheSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoUExBWUVSX1dBUk5JTkcsIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgOiBXQVJOX01TR19NVVRFRFBMQVksXG4gICAgICAgICAgICB0aW1lciA6IDEwICogMTAwMCxcbiAgICAgICAgICAgIGljb25DbGFzcyA6IFVJX0lDT05TLnZvbHVtZV9tdXRlLFxuICAgICAgICAgICAgb25DbGlja0NhbGxiYWNrIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRNdXRlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBzdGFydGVkIFwiLCBcImlzTW9iaWxlIDogXCIsIGlzTW9iaWxlLCBhZFRhZ1VybCk7XG5cbiAgICB0cnl7XG4gICAgICAgIEFEU19NQU5BR0VSX0xPQURFRCA9IGdvb2dsZS5pbWEuQWRzTWFuYWdlckxvYWRlZEV2ZW50LlR5cGUuQURTX01BTkFHRVJfTE9BREVEO1xuICAgICAgICBBRF9FUlJPUiA9IGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1I7XG4gICAgICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0TG9jYWxlKFwia29cIik7XG4gICAgICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xuXG4gICAgICAgIGNvbnN0IGNyZWF0ZUFkQ29udGFpbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ29wLWFkcycpO1xuICAgICAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdvcC1hZHMnKTtcbiAgICAgICAgICAgIHBsYXllckNvbmZpZy5nZXRDb250YWluZXIoKS5hcHBlbmQoYWRDb250YWluZXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gYWRDb250YWluZXI7XG4gICAgICAgIH07XG4gICAgICAgIE9uQWRFcnJvciA9IGZ1bmN0aW9uKGFkRXJyb3JFdmVudCl7XG4gICAgICAgICAgICAvL25vdGUgOiBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRJbm5lckVycm9yKCkuZ2V0RXJyb3JDb2RlKCkgPT09IDEyMDUgJiBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRWYXN0RXJyb3JDb2RlKCkgPT09IDQwMCBpcyBCcm93c2VyIFVzZXIgSW50ZXJhY3RpdmUgZXJyb3IuXG5cbiAgICAgICAgICAgIC8vRG8gbm90IHRyaWdnZXJpbmcgRVJST1IuIGJlY3Vhc2UgSXQganVzdCBBRCFcblxuICAgICAgICAgICAgY29uc29sZS5sb2coYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpLCBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRNZXNzYWdlKCkpO1xuICAgICAgICAgICAgYWRzRXJyb3JPY2N1cnJlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgaW5uZXJFcnJvciA9IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldElubmVyRXJyb3IoKTtcbiAgICAgICAgICAgIGlmKGlubmVyRXJyb3Ipe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlubmVyRXJyb3IuZ2V0RXJyb3JDb2RlKCksIGlubmVyRXJyb3IuZ2V0TWVzc2FnZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qaWYgKGFkc01hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9FUlJPUiwge2NvZGUgOiBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRWYXN0RXJyb3JDb2RlKCkgLCBtZXNzYWdlIDogYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0TWVzc2FnZSgpfSk7XG4gICAgICAgICAgICBzcGVjLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcblxuICAgICAgICAgICAgLyppZihpbm5lckVycm9yICYmIGlubmVyRXJyb3IuZ2V0RXJyb3JDb2RlKCkgPT09IDEyMDUpe1xuICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgfSovXG5cblxuICAgICAgICB9O1xuICAgICAgICBPbk1hbmFnZXJMb2FkZWQgPSBmdW5jdGlvbihhZHNNYW5hZ2VyTG9hZGVkRXZlbnQpe1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBPbk1hbmFnZXJMb2FkZWQgXCIpO1xuICAgICAgICAgICAgbGV0IGFkc1JlbmRlcmluZ1NldHRpbmdzID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVuZGVyaW5nU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIGFkc1JlbmRlcmluZ1NldHRpbmdzLnJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgLy9hZHNSZW5kZXJpbmdTZXR0aW5ncy51c2VTdHlsZWROb25MaW5lYXJBZHMgPSB0cnVlO1xuICAgICAgICAgICAgaWYoYWRzTWFuYWdlcil7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogZGVzdHJveSBhZHNNYW5hZ2VyLS0tLVwiKTtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGFkc01hbmFnZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKGVsVmlkZW8sIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcblxuICAgICAgICAgICAgbGlzdGVuZXIgPSBBZHNFdmVudHNMaXN0ZW5lcihhZHNNYW5hZ2VyLCBwcm92aWRlciwgc3BlYywgT25BZEVycm9yKTtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogY3JlYXRlZCBhZG1hbmFnZXIgYW5kIGxpc3RuZXIgXCIpO1xuXG4gICAgICAgICAgICBhZHNNYW5hZ2VyTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGFkQ29uYXRpbmVyRWxtZW50ID0gY3JlYXRlQWRDb250YWluZXIoKTtcbiAgICAgICAgYWREaXNwbGF5Q29udGFpbmVyID0gbmV3IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyKGFkQ29uYXRpbmVyRWxtZW50LCBlbFZpZGVvKTtcbiAgICAgICAgYWRzTG9hZGVyID0gbmV3IGdvb2dsZS5pbWEuQWRzTG9hZGVyKGFkRGlzcGxheUNvbnRhaW5lcik7XG5cbiAgICAgICAgYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQURTX01BTkFHRVJfTE9BREVELCBPbk1hbmFnZXJMb2FkZWQsIGZhbHNlKTtcbiAgICAgICAgYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQURfRVJST1IsIE9uQWRFcnJvciwgZmFsc2UpO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGFkRGlzcGxheUNvbnRhaW5lciBpbml0aWFsaXplZFwiKTtcbiAgICAgICAgcHJvdmlkZXIub24oQ09OVEVOVF9WT0xVTUUsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGlmKGFkc01hbmFnZXIpe1xuICAgICAgICAgICAgICAgIGlmKGRhdGEubXV0ZSl7XG4gICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc2V0Vm9sdW1lKDApO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnNldFZvbHVtZShkYXRhLnZvbHVtZS8xMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhhdCk7XG5cbiAgICAgICAgY29uc3Qgc2V0QXV0b1BsYXlUb0Fkc1JlcXVlc3QgPSBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIGlmKGFkc1JlcXVlc3Qpe1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IHNldEFEV2lsbEF1dG9QbGF5IFwiLCBcImF1dG9wbGF5QWxsb3dlZFwiLGF1dG9wbGF5QWxsb3dlZCwgXCJhdXRvcGxheVJlcXVpcmVzTXV0ZWRcIixhdXRvcGxheVJlcXVpcmVzTXV0ZWQpO1xuXG4gICAgICAgICAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxBdXRvUGxheShhdXRvcGxheUFsbG93ZWQpO1xuICAgICAgICAgICAgICAgIGFkc1JlcXVlc3Quc2V0QWRXaWxsUGxheU11dGVkKGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XG4gICAgICAgICAgICAgICAgaWYoYXV0b3BsYXlSZXF1aXJlc011dGVkKXtcbiAgICAgICAgICAgICAgICAgICAgc2VuZFdhcm5pbmdNZXNzYWdlRm9yTXV0ZWRQbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGluaXRSZXF1ZXN0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGFkc01hbmFnZXJMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGluaXRSZXF1ZXN0KCkgQXV0b1BsYXkgU3VwcG9ydCA6IFwiLCBcImF1dG9wbGF5QWxsb3dlZFwiLGF1dG9wbGF5QWxsb3dlZCwgXCJhdXRvcGxheVJlcXVpcmVzTXV0ZWRcIixhdXRvcGxheVJlcXVpcmVzTXV0ZWQpO1xuICAgICAgICAgICAgLyppZihhZHNSZXF1ZXN0KXtcbiAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgfSovXG4gICAgICAgICAgICBhZHNSZXF1ZXN0ID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVxdWVzdCgpO1xuXG4gICAgICAgICAgICBhZHNSZXF1ZXN0LmZvcmNlTm9uTGluZWFyRnVsbFNsb3QgPSBmYWxzZTtcbiAgICAgICAgICAgIC8qaWYocGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5icm93c2VyID09PSBcIlNhZmFyaVwiICYmIHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgPT09IFwiaU9TXCIgKXtcbiAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgc2V0QXV0b1BsYXlUb0Fkc1JlcXVlc3QoKTtcbiAgICAgICAgICAgIGFkc1JlcXVlc3QuYWRUYWdVcmwgPSBhZFRhZ1VybDtcblxuICAgICAgICAgICAgYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiByZXF1ZXN0QWRzIENvbXBsZXRlXCIpO1xuICAgICAgICAgICAgLy90d28gd2F5IHdoYXQgYWQgc3RhcnRzLlxuICAgICAgICAgICAgLy9hZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTsgb3IgIGFkc01hbmFnZXIuc3RhcnQoKTtcbiAgICAgICAgICAgIC8vd2hhdD8gd2h5Pz8gd3RoPz9cbiAgICAgICAgfTtcblxuXG4gICAgICAgIGNvbnN0IGNoZWNrQXV0b3BsYXlTdXBwb3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogY2hlY2tBdXRvcGxheVN1cHBvcnQoKSBcIik7XG5cbiAgICAgICAgICAgIGxldCB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJ3RydWUnKTtcbiAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnNyYyA9IFRFTVBfVklERU9fVVJMO1xuICAgICAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ubG9hZCgpO1xuXG4gICAgICAgICAgICAvL0Rhc2ggaGFzIGFscmVhZHkgbG9hZGVkIHdoZW4gdHJpZ2dlcmVkIHByb3ZpZGVyLnBsYXkoKSBhbHdheXMuXG4gICAgICAgICAgICBpZihpc01vYmlsZSAmJiBwcm92aWRlci5nZXROYW1lKCkgIT09IFBST1ZJREVSX0RBU0ggKXtcbiAgICAgICAgICAgICAgICAvL01haW4gdmlkZW8gc2V0cyB1c2VyIGdlc3R1cmUgd2hlbiB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlbyB0cmlnZ2VyZWQgY2hlY2tpbmcuXG4gICAgICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiBEaWZmZXJlbnQgYnJvd3Nlci1zcGVjaWZpYyB3YXlzIHRvIGRlbGl2ZXJ5IFVJIHRvIG90aGVyIGVsZW1lbnRzLiAgTXkgR3Vlc3MuIDIwMTktMDYtMTlcbiAgICAgICAgICAgICogICAodGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ncyBVc2VyIEludGVyYWN0aW9uIGRlbGl2ZXJ5IHRvIGVsVmlkZW8uKVxuICAgICAgICAgICAgKiAgIE1vYmlsZSBDaHJvbWUgV2ViVmlldyA6XG4gICAgICAgICAgICAqICAgWW91IGhhdmUgdG8gcnVuIGVsVmlkZW8ubG9hZCgpIHdoZW4gdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8gaXNzdWVzIHdpdGhpbiA1IHNlY29uZHMgb2YgdXNlciBpbnRlcmFjdGlvbi5cbiAgICAgICAgICAgICpcbiAgICAgICAgICAgICogICBNb2JpbGUgaW9zIHNhZmFyaSA6XG4gICAgICAgICAgICAqICAgWW91IGhhdmUgdG8gcnVuIGVsVmlkZW8ubG9hZCgpIGJlZm9yZSB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlbyBydW4gcGxheSgpLlxuICAgICAgICAgICAgKiAqL1xuXG4gICAgICAgICAgICBjb25zdCBjbGVhckFuZFJlcG9ydCA9IGZ1bmN0aW9uKF9hdXRvcGxheUFsbG93ZWQsIF9hdXRvcGxheVJlcXVpcmVzTXV0ZWQpe1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IF9hdXRvcGxheUFsbG93ZWQ7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gX2F1dG9wbGF5UmVxdWlyZXNNdXRlZDtcbiAgICAgICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgc2V0QXV0b1BsYXlUb0Fkc1JlcXVlc3QoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgICAgICAgICAgIGlmKCF0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgLy9JIGNhbid0IHJlbWVtYmVyIHRoaXMgY2FzZS4uLlxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiAhdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucGxheVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwbGF5UHJvbWlzZSA9IHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXlQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBhdXRvIHBsYXkgYWxsb3dlZC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCB1bm11dGVkIGF1dG9wbGF5IHdvcmtzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGF1dG8gcGxheSBmYWlsZWRcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRGlzYWJsZSBNdXRlZCBQbGF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyp0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5tdXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8udm9sdW1lID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5UHJvbWlzZSA9IHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBsYXkoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBtYWtlIGl0IGhlcmUsIG11dGVkIGF1dG9wbGF5IHdvcmtzIGJ1dCB1bm11dGVkIGF1dG9wbGF5IGRvZXMgbm90LlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IG11dGVkIGF1dG8gcGxheSBzdWNjZXNzLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0TXV0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRFMgOiBtdXRlZCBhdXRvIHBsYXkgZmFpbGVkXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydChmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7Ki9cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IHByb21pc2Ugbm90IHN1cHBvcnRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL01heWJlIHRoaXMgaXMgSUUxMS4uLi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhhdC5pc0FjdGl2ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmFjdGl2ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5zdGFydGVkID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMuc3RhcnRlZDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYoc3BlYy5zdGFydGVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnJlc3VtZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja0Fkc01hbmFnZXJJc1JlYWR5ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhZHNNYW5hZ2VyTG9hZGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBhZCBzdGFydCFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5pbml0KFwiMTAwJVwiLCBcIjEwMCVcIiwgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYWRzRXJyb3JPY2N1cnJlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoQURNQU5HRVJfTE9BRElOR19FUlJPUikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMTUwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKEFETUFOR0VSX0xPQURJTkdfRVJST1IpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpICYmICFhdXRvcGxheUFsbG93ZWQpICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogYXV0b3BsYXlBbGxvd2VkIDogZmFsc2VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihBVVRPUExBWV9OT1RfQUxMT1dFRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0Fkc01hbmFnZXJJc1JlYWR5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGFkc01hbmFnZXIucGF1c2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC52aWRlb0VuZGVkQ2FsbGJhY2sgPSAoY29tcGxldGVDb250ZW50Q2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIC8vbGlzdGVuZXIuaXNMaW5lYXJBZCA6IGdldCBjdXJyZW50IGFkJ3Mgc3RhdHVzIHdoZXRoZXIgbGluZWFyIGFkIG9yIG5vdC5cbiAgICAgICAgICAgIGlmKGxpc3RlbmVyICYmIChsaXN0ZW5lci5pc0FsbEFkQ29tcGxldGUoKSB8fCAhbGlzdGVuZXIuaXNMaW5lYXJBZCgpKSl7XG4gICAgICAgICAgICAgICAgY29tcGxldGVDb250ZW50Q2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1lbHNlIGlmKGFkc0Vycm9yT2NjdXJyZWQpe1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlQ29udGVudENhbGxiYWNrKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL0lmIHlvdSBuZWVkIHBsYXkgdGhlIHBvc3Qtcm9sbCwgeW91IGhhdmUgdG8gY2FsbCB0byBhZHNMb2FkZXIgd2hlbiBjb250ZW50cyB3YXMgY29tcGxldGVkLlxuICAgICAgICAgICAgICAgIHNwZWMuaXNWaWRlb0VuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIuY29udGVudENvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xuXG4gICAgICAgICAgICBpZihhZHNMb2FkZXIpe1xuICAgICAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEU19NQU5BR0VSX0xPQURFRCwgT25NYW5hZ2VyTG9hZGVkKTtcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBRF9FUlJPUiwgT25BZEVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoYWRzTWFuYWdlcil7XG4gICAgICAgICAgICAgICAgYWRzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGFkRGlzcGxheUNvbnRhaW5lcil7XG4gICAgICAgICAgICAgICAgYWREaXNwbGF5Q29udGFpbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYobGlzdGVuZXIpe1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0ICRhZHMgPSBMQSQocGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpKS5maW5kKFwiLm9wLWFkc1wiKTtcbiAgICAgICAgICAgIGlmKCRhZHMpe1xuICAgICAgICAgICAgICAgICRhZHMucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByb3ZpZGVyLm9mZihDT05URU5UX1ZPTFVNRSwgbnVsbCwgdGhhdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgfWNhdGNoIChlcnJvcil7XG4gICAgICAgIC8vbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tJTklUX0FEU19FUlJPUl07XG4gICAgICAgIC8vdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgIC8vZXJyb3JDYWxsYmFjayh0ZW1wRXJyb3IpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBBZDtcblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMTAvMDQvMjAxOS5cbiAqL1xuXG5pbXBvcnQge1xuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfQURfTE9BREVELFxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXG4gICAgU1RBVEVfQURfUEFVU0VELFxuICAgIFNUQVRFX0FEX0NPTVBMRVRFLFxuICAgIEFEX0NIQU5HRUQsXG4gICAgQURfVElNRSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsXG4gICAgUExBWUVSX0NMSUNLRUQsXG4gICAgUExBWUVSX0FEX0NMSUNLLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGFkc01hbmFnZXIsIHByb3ZpZGVyLCBhZHNTcGVjLCBPbkFkRXJyb3Ipe1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGxvd0xldmVsRXZlbnRzID0ge307XG5cbiAgICBsZXQgaW50ZXJ2YWxUaW1lciA9IG51bGw7XG5cbiAgICBjb25zdCBBRF9CVUZGRVJJTkcgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BRF9CVUZGRVJJTkc7XG4gICAgY29uc3QgQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRDtcbiAgICBjb25zdCBDT05URU5UX1JFU1VNRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQ7XG4gICAgY29uc3QgQURfRVJST1IgPSBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SO1xuICAgIGNvbnN0IEFMTF9BRFNfQ09NUExFVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQ7XG4gICAgY29uc3QgQ0xJQ0sgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DTElDSztcbiAgICBjb25zdCBTS0lQUEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU0tJUFBFRDtcbiAgICBjb25zdCBDT01QTEVURSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFO1xuICAgIGNvbnN0IEZJUlNUX1FVQVJUSUxFPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5GSVJTVF9RVUFSVElMRTtcbiAgICBjb25zdCBMT0FERUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQ7XG4gICAgY29uc3QgTUlEUE9JTlQ9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLk1JRFBPSU5UO1xuICAgIGNvbnN0IFBBVVNFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlBBVVNFRDtcbiAgICBjb25zdCBSRVNVTUVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUkVTVU1FRDtcbiAgICBjb25zdCBTVEFSVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU1RBUlRFRDtcbiAgICBjb25zdCBVU0VSX0NMT1NFID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuVVNFUl9DTE9TRTtcbiAgICBjb25zdCBUSElSRF9RVUFSVElMRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlRISVJEX1FVQVJUSUxFO1xuXG4gICAgbGV0IGlzQWxsQWRDb21wZWxldGUgPSBmYWxzZTsgICAvL1Bvc3Qgcm9sbOydhCDsnITtlbRcbiAgICBsZXQgYWRDb21wbGV0ZUNhbGxiYWNrID0gbnVsbDtcbiAgICBsZXQgY3VycmVudEFkID0gbnVsbDtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBMaXN0ZW5lciBDcmVhdGVkXCIpO1xuICAgICBsb3dMZXZlbEV2ZW50c1tDT05URU5UX1BBVVNFX1JFUVVFU1RFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIExJU1RFTkVSIDogXCIsIGFkRXZlbnQudHlwZSk7XG5cbiAgICAgICAgIC8vVGhpcyBjYWxsbHMgd2hlbiBwbGF5ZXIgaXMgcGxheWluZyBjb250ZW50cyBmb3IgYWQuXG4gICAgICAgICBpZihhZHNTcGVjLnN0YXJ0ZWQpe1xuICAgICAgICAgICAgIGFkc1NwZWMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzW0NPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgTElTVEVORVIgOiBcIiwgYWRFdmVudC50eXBlKTtcbiAgICAgICAgLy9UaGlzIGNhbGxzIHdoZW4gb25lIGFkIGVuZGVkLlxuICAgICAgICAvL0FuZCB0aGlzIGlzIHNpZ25hbCB3aGF0IHBsYXkgdGhlIGNvbnRlbnRzLlxuICAgICAgICBhZHNTcGVjLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmKGFkc1NwZWMuc3RhcnRlZCAmJiAocHJvdmlkZXIuZ2V0UG9zaXRpb24oKSA9PT0gMCB8fCAhYWRzU3BlYy5pc1ZpZGVvRW5kZWQpICApe1xuICAgICAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0FEX0VSUk9SXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIGlzQWxsQWRDb21wZWxldGUgPSB0cnVlO1xuICAgICAgICBPbkFkRXJyb3IoYWRFdmVudCk7XG4gICAgfSA7XG5cbiAgICBsb3dMZXZlbEV2ZW50c1tBTExfQURTX0NPTVBMRVRFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgTElTVEVORVIgOiBcIiwgYWRFdmVudC50eXBlKTtcblxuICAgICAgICBpc0FsbEFkQ29tcGVsZXRlID0gdHJ1ZTtcbiAgICAgICAgaWYoYWRzU3BlYy5pc1ZpZGVvRW5kZWQpe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tDTElDS10gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZRVJfQ0xJQ0tFRCwge3R5cGUgOiBQTEFZRVJfQURfQ0xJQ0t9KTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0ZJUlNUX1FVQVJUSUxFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgLy9cbiAgICBsb3dMZXZlbEV2ZW50c1tBRF9CVUZGRVJJTkddID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURfQlVGRkVSSU5HXCIsYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0xPQURFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgY29uc29sZS5sb2coYWRFdmVudC5nZXRBZCgpKTtcbiAgICAgICAgY29uc29sZS5sb2coYWRFdmVudC5nZXRBZERhdGEoKSk7XG4gICAgICAgIGxldCByZW1haW5pbmdUaW1lID0gYWRzTWFuYWdlci5nZXRSZW1haW5pbmdUaW1lKCk7XG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgLyp2YXIgbWV0YWRhdGEgPSB7XG4gICAgICAgICAgICBkdXJhdGlvbjogcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgIHR5cGUgOlwiYWRcIlxuICAgICAgICB9OyovXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfTE9BREVELCB7cmVtYWluaW5nIDogcmVtYWluaW5nVGltZSwgaXNMaW5lYXIgOiBhZC5pc0xpbmVhcigpIH0pO1xuXG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tNSURQT0lOVF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW1BBVVNFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUEFVU0VEKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW1JFU1VNRURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xuICAgIH07XG5cblxuICAgIGxvd0xldmVsRXZlbnRzW1NUQVJURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgY3VycmVudEFkID0gYWQ7XG5cbiAgICAgICAgbGV0IGFkT2JqZWN0ID0ge1xuICAgICAgICAgICAgaXNMaW5lYXIgOiBhZC5pc0xpbmVhcigpICxcbiAgICAgICAgICAgIGR1cmF0aW9uIDogYWQuZ2V0RHVyYXRpb24oKSxcbiAgICAgICAgICAgIHNraXBUaW1lT2Zmc2V0IDogYWQuZ2V0U2tpcFRpbWVPZmZzZXQoKSAgICAgLy9UaGUgbnVtYmVyIG9mIHNlY29uZHMgb2YgcGxheWJhY2sgYmVmb3JlIHRoZSBhZCBiZWNvbWVzIHNraXBwYWJsZS5cbiAgICAgICAgfTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9DSEFOR0VELCBhZE9iamVjdCk7XG5cblxuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QTEFZSU5HKTtcbiAgICAgICAgICAgIGFkc1NwZWMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAvLyBGb3IgYSBsaW5lYXIgYWQsIGEgdGltZXIgY2FuIGJlIHN0YXJ0ZWQgdG8gcG9sbCBmb3JcbiAgICAgICAgICAgIC8vIHRoZSByZW1haW5pbmcgdGltZS5cbiAgICAgICAgICAgIGludGVydmFsVGltZXIgPSBzZXRJbnRlcnZhbChcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbWFpbmluZ1RpbWUgPSBhZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gYWQuZ2V0RHVyYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKEFEX1RJTUUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uIDogZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBza2lwVGltZU9mZnNldCA6IGFkLmdldFNraXBUaW1lT2Zmc2V0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1haW5pbmcgOiByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gOiBkdXJhdGlvbiAtIHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBza2lwcGFibGUgOiBhZHNNYW5hZ2VyLmdldEFkU2tpcHBhYmxlU3RhdGUoKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDMwMCk7IC8vIGV2ZXJ5IDMwMG1zXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tDT01QTEVURV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICB9O1xuICAgIC8vVXNlciBza2lwcGVkIGFkLiBzYW1lIHByb2Nlc3Mgb24gY29tcGxldGUuXG4gICAgbG93TGV2ZWxFdmVudHNbU0tJUFBFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcblxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbVVNFUl9DTE9TRV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW1RISVJEX1FVQVJUSUxFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG5cblxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgIGFkc01hbmFnZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICB9KTtcbiAgICB0aGF0LnNldEFkQ29tcGxldGVDYWxsYmFjayA9IChfYWRDb21wbGV0ZUNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGFkQ29tcGxldGVDYWxsYmFjayA9IF9hZENvbXBsZXRlQ2FsbGJhY2s7XG4gICAgfTtcbiAgICB0aGF0LmlzQWxsQWRDb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGlzQWxsQWRDb21wZWxldGU7XG4gICAgfTtcbiAgICB0aGF0LmlzTGluZWFyQWQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBjdXJyZW50QWQgID8gY3VycmVudEFkLmlzTGluZWFyKCkgOiB0cnVlO1xuICAgIH07XG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQUV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XG4gICAgICAgIC8vcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjcvMDYvMjAxOS5cbiAqL1xuZXhwb3J0IGNvbnN0IFRFTVBfVklERU9fVVJMID0gXCJkYXRhOnZpZGVvL21wNDtiYXNlNjQsIEFBQUFIR1owZVhCTk5GWWdBQUFDQUdsemIyMXBjMjh5WVhaak1RQUFBQWhtY21WbEFBQUdGMjFrWVhUZUJBQUFiR2xpWm1GaFl5QXhMakk0QUFCQ0FKTWdCRElBUndBQUFyRUdCZi8vcmR4RjZiM20yVWkzbGl6WUlOa2o3dTk0TWpZMElDMGdZMjl5WlNBeE5ESWdjaklnT1RVMll6aGtPQ0F0SUVndU1qWTBMMDFRUlVjdE5DQkJWa01nWTI5a1pXTWdMU0JEYjNCNWJHVm1kQ0F5TURBekxUSXdNVFFnTFNCb2RIUndPaTh2ZDNkM0xuWnBaR1Z2YkdGdUxtOXlaeTk0TWpZMExtaDBiV3dnTFNCdmNIUnBiMjV6T2lCallXSmhZejB3SUhKbFpqMHpJR1JsWW14dlkyczlNVG93T2pBZ1lXNWhiSGx6WlQwd2VERTZNSGd4TVRFZ2JXVTlhR1Y0SUhOMVltMWxQVGNnY0hONVBURWdjSE41WDNKa1BURXVNREE2TUM0d01DQnRhWGhsWkY5eVpXWTlNU0J0WlY5eVlXNW5aVDB4TmlCamFISnZiV0ZmYldVOU1TQjBjbVZzYkdselBURWdPSGc0WkdOMFBUQWdZM0Z0UFRBZ1pHVmhaSHB2Ym1VOU1qRXNNVEVnWm1GemRGOXdjMnRwY0QweElHTm9jbTl0WVY5eGNGOXZabVp6WlhROUxUSWdkR2h5WldGa2N6MDJJR3h2YjJ0aGFHVmhaRjkwYUhKbFlXUnpQVEVnYzJ4cFkyVmtYM1JvY21WaFpITTlNQ0J1Y2owd0lHUmxZMmx0WVhSbFBURWdhVzUwWlhKc1lXTmxaRDB3SUdKc2RYSmhlVjlqYjIxd1lYUTlNQ0JqYjI1emRISmhhVzVsWkY5cGJuUnlZVDB3SUdKbWNtRnRaWE05TUNCM1pXbG5hSFJ3UFRBZ2EyVjVhVzUwUFRJMU1DQnJaWGxwYm5SZmJXbHVQVEkxSUhOalpXNWxZM1YwUFRRd0lHbHVkSEpoWDNKbFpuSmxjMmc5TUNCeVkxOXNiMjlyWVdobFlXUTlOREFnY21NOVkzSm1JRzFpZEhKbFpUMHhJR055WmoweU15NHdJSEZqYjIxd1BUQXVOakFnY1hCdGFXNDlNQ0J4Y0cxaGVEMDJPU0J4Y0hOMFpYQTlOQ0IyWW5aZmJXRjRjbUYwWlQwM05qZ2dkbUoyWDJKMVpuTnBlbVU5TXpBd01DQmpjbVpmYldGNFBUQXVNQ0J1WVd4ZmFISmtQVzV2Ym1VZ1ptbHNiR1Z5UFRBZ2FYQmZjbUYwYVc4OU1TNDBNQ0JoY1QweE9qRXVNREFBZ0FBQUFGWmxpSVFMOG1LQUFLdk1uSnljbkp5Y25KeWNuWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWGlFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBZEJtamdYNEdTQUlRQkprQUlaQUNPQUFBQUFCMEdhVkFYNEdTQWhBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QUFBQUFHUVpwZ0w4REpJUUJKa0FJWkFDT0FJUUJKa0FJWkFDT0FBQUFBQmtHYWdDL0F5U0VBU1pBQ0dRQWpnQUFBQUFaQm1xQXZ3TWtoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFBR1FackFMOERKSVFCSmtBSVpBQ09BQUFBQUJrR2E0Qy9BeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtd0F2d01raEFFbVFBaGtBSTRBQUFBQUdRWnNnTDhESklRQkprQUlaQUNPQUlRQkprQUlaQUNPQUFBQUFCa0diUUMvQXlTRUFTWkFDR1FBamdDRUFTWkFDR1FBamdBQUFBQVpCbTJBdndNa2hBRW1RQWhrQUk0QUFBQUFHUVp1QUw4REpJUUJKa0FJWkFDT0FJUUJKa0FJWkFDT0FBQUFBQmtHYm9DL0F5U0VBU1pBQ0dRQWpnQUFBQUFaQm04QXZ3TWtoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFBR1FadmdMOERKSVFCSmtBSVpBQ09BQUFBQUJrR2FBQy9BeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtaUF2d01raEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBQUFBQUdRWnBBTDhESklRQkprQUlaQUNPQUFBQUFCa0dhWUMvQXlTRUFTWkFDR1FBamdDRUFTWkFDR1FBamdBQUFBQVpCbW9BdndNa2hBRW1RQWhrQUk0QUFBQUFHUVpxZ0w4REpJUUJKa0FJWkFDT0FJUUJKa0FJWkFDT0FBQUFBQmtHYXdDL0F5U0VBU1pBQ0dRQWpnQUFBQUFaQm11QXZ3TWtoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFBR1Fac0FMOERKSVFCSmtBSVpBQ09BQUFBQUJrR2JJQy9BeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtMEF2d01raEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBQUFBQUdRWnRnTDhESklRQkprQUlaQUNPQUFBQUFCa0diZ0N2QXlTRUFTWkFDR1FBamdDRUFTWkFDR1FBamdBQUFBQVpCbTZBbndNa2hBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QUFBQWh1Ylc5dmRnQUFBR3h0ZG1oa0FBQUFBQUFBQUFBQUFBQUFBQUFENkFBQUJEY0FBUUFBQVFBQUFBQUFBQUFBQUFBQUFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUF3QUFBekIwY21GckFBQUFYSFJyYUdRQUFBQURBQUFBQUFBQUFBQUFBQUFCQUFBQUFBQUFBK2tBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUVBQUFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFCQUFBQUFBTEFBQUFDUUFBQUFBQUFrWldSMGN3QUFBQnhsYkhOMEFBQUFBQUFBQUFFQUFBUHBBQUFBQUFBQkFBQUFBQUtvYldScFlRQUFBQ0J0Wkdoa0FBQUFBQUFBQUFBQUFBQUFBQUIxTUFBQWRVNVZ4QUFBQUFBQUxXaGtiSElBQUFBQUFBQUFBSFpwWkdVQUFBQUFBQUFBQUFBQUFBQldhV1JsYjBoaGJtUnNaWElBQUFBQ1UyMXBibVlBQUFBVWRtMW9aQUFBQUFFQUFBQUFBQUFBQUFBQUFDUmthVzVtQUFBQUhHUnlaV1lBQUFBQUFBQUFBUUFBQUF4MWNtd2dBQUFBQVFBQUFoTnpkR0pzQUFBQXIzTjBjMlFBQUFBQUFBQUFBUUFBQUo5aGRtTXhBQUFBQUFBQUFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFMQUFrQUJJQUFBQVNBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBR1AvL0FBQUFMV0YyWTBNQlFzQU4vK0VBRldkQ3dBM1pBc1RzQkVBQUFQcEFBRHFZQThVS2tnRUFCV2pMZzhzZ0FBQUFISFYxYVdScmFFRHlYeVJQeGJvNXBSdlBBeVB6QUFBQUFBQUFBQmh6ZEhSekFBQUFBQUFBQUFFQUFBQWVBQUFENlFBQUFCUnpkSE56QUFBQUFBQUFBQUVBQUFBQkFBQUFISE4wYzJNQUFBQUFBQUFBQVFBQUFBRUFBQUFCQUFBQUFRQUFBSXh6ZEhONkFBQUFBQUFBQUFBQUFBQWVBQUFERHdBQUFBc0FBQUFMQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQWlITjBZMjhBQUFBQUFBQUFIZ0FBQUVZQUFBTm5BQUFEZXdBQUE1Z0FBQU8wQUFBRHh3QUFBK01BQUFQMkFBQUVFZ0FBQkNVQUFBUkJBQUFFWFFBQUJIQUFBQVNNQUFBRW53QUFCTHNBQUFUT0FBQUU2Z0FBQlFZQUFBVVpBQUFGTlFBQUJVZ0FBQVZrQUFBRmR3QUFCWk1BQUFXbUFBQUZ3Z0FBQmQ0QUFBWHhBQUFHRFFBQUJHaDBjbUZyQUFBQVhIUnJhR1FBQUFBREFBQUFBQUFBQUFBQUFBQUNBQUFBQUFBQUJEY0FBQUFBQUFBQUFBQUFBQUVCQUFBQUFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQWtaV1IwY3dBQUFCeGxiSE4wQUFBQUFBQUFBQUVBQUFRa0FBQURjQUFCQUFBQUFBUGdiV1JwWVFBQUFDQnRaR2hrQUFBQUFBQUFBQUFBQUFBQUFBQzdnQUFBeWtCVnhBQUFBQUFBTFdoa2JISUFBQUFBQUFBQUFITnZkVzRBQUFBQUFBQUFBQUFBQUFCVGIzVnVaRWhoYm1Sc1pYSUFBQUFEaTIxcGJtWUFBQUFRYzIxb1pBQUFBQUFBQUFBQUFBQUFKR1JwYm1ZQUFBQWNaSEpsWmdBQUFBQUFBQUFCQUFBQURIVnliQ0FBQUFBQkFBQURUM04wWW13QUFBQm5jM1J6WkFBQUFBQUFBQUFCQUFBQVYyMXdOR0VBQUFBQUFBQUFBUUFBQUFBQUFBQUFBQUlBRUFBQUFBQzdnQUFBQUFBQU0yVnpaSE1BQUFBQUE0Q0FnQ0lBQWdBRWdJQ0FGRUFWQmJqWUFBdTRBQUFBRGNvRmdJQ0FBaEdRQm9DQWdBRUNBQUFBSUhOMGRITUFBQUFBQUFBQUFnQUFBRElBQUFRQUFBQUFBUUFBQWtBQUFBRlVjM1J6WXdBQUFBQUFBQUFiQUFBQUFRQUFBQUVBQUFBQkFBQUFBZ0FBQUFJQUFBQUJBQUFBQXdBQUFBRUFBQUFCQUFBQUJBQUFBQUlBQUFBQkFBQUFCZ0FBQUFFQUFBQUJBQUFBQndBQUFBSUFBQUFCQUFBQUNBQUFBQUVBQUFBQkFBQUFDUUFBQUFJQUFBQUJBQUFBQ2dBQUFBRUFBQUFCQUFBQUN3QUFBQUlBQUFBQkFBQUFEUUFBQUFFQUFBQUJBQUFBRGdBQUFBSUFBQUFCQUFBQUR3QUFBQUVBQUFBQkFBQUFFQUFBQUFJQUFBQUJBQUFBRVFBQUFBRUFBQUFCQUFBQUVnQUFBQUlBQUFBQkFBQUFGQUFBQUFFQUFBQUJBQUFBRlFBQUFBSUFBQUFCQUFBQUZnQUFBQUVBQUFBQkFBQUFGd0FBQUFJQUFBQUJBQUFBR0FBQUFBRUFBQUFCQUFBQUdRQUFBQUlBQUFBQkFBQUFHZ0FBQUFFQUFBQUJBQUFBR3dBQUFBSUFBQUFCQUFBQUhRQUFBQUVBQUFBQkFBQUFIZ0FBQUFJQUFBQUJBQUFBSHdBQUFBUUFBQUFCQUFBQTRITjBjM29BQUFBQUFBQUFBQUFBQURNQUFBQWFBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFDTWMzUmpid0FBQUFBQUFBQWZBQUFBTEFBQUExVUFBQU55QUFBRGhnQUFBNklBQUFPK0FBQUQwUUFBQSswQUFBUUFBQUFFSEFBQUJDOEFBQVJMQUFBRVp3QUFCSG9BQUFTV0FBQUVxUUFBQk1VQUFBVFlBQUFFOUFBQUJSQUFBQVVqQUFBRlB3QUFCVklBQUFWdUFBQUZnUUFBQlowQUFBV3dBQUFGekFBQUJlZ0FBQVg3QUFBR0Z3QUFBR0oxWkhSaEFBQUFXbTFsZEdFQUFBQUFBQUFBSVdoa2JISUFBQUFBQUFBQUFHMWthWEpoY0hCc0FBQUFBQUFBQUFBQUFBQUFMV2xzYzNRQUFBQWxxWFJ2YndBQUFCMWtZWFJoQUFBQUFRQUFBQUJNWVhabU5UVXVNek11TVRBd1wiO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjUvMDYvMjAxOS5cbiAqL1xuXG5pbXBvcnQgeyBWQVNUQ2xpZW50LCBWQVNUVHJhY2tlciB9IGZyb20gJ3V0aWxzL3Zhc3QtY2xpZW50JztcbmltcG9ydCBBZHNFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL2Fkcy92YXN0L0xpc3RlbmVyXCI7XG5pbXBvcnQge1RFTVBfVklERU9fVVJMfSBmcm9tIFwiYXBpL2Fkcy91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX0FEX0xPQURFRCxcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBTVEFURV9BRF9DT01QTEVURSxcbiAgICBTVEFURV9BRF9FUlJPUixcbiAgICBDT05URU5UX01FVEEsXG4gICAgUFJPVklERVJfREFTSFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBBZCA9IGZ1bmN0aW9uKGVsVmlkZW8sIHByb3ZpZGVyLCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcbiAgICBjb25zdCBBVVRPUExBWV9OT1RfQUxMT1dFRCA9IFwiYXV0b3BsYXlOb3RBbGxvd2VkXCI7XG5cbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBzcGVjID0ge1xuICAgICAgICBzdGFydGVkOiBmYWxzZSwgLy9wbGF5ZXIgc3RhcnRlZFxuICAgICAgICBhY3RpdmUgOiBmYWxzZSwgLy9vbiBBZFxuICAgICAgICBpc1ZpZGVvRW5kZWQgOiBmYWxzZVxuICAgIH07XG4gICAgbGV0IGFkc0Vycm9yT2NjdXJyZWQgPSBmYWxzZTtcbiAgICBsZXQgbGlzdGVuZXIgPSBudWxsO1xuXG4gICAgbGV0IGNvbnRhaW5lciA9IFwiXCI7XG4gICAgbGV0IGVsQWRWaWRlbyA9IG51bGw7XG4gICAgbGV0IHRleHRWaWV3ID0gXCJcIjtcbiAgICBsZXQgYWRCdXR0b24gPSBcIlwiO1xuXG4gICAgbGV0IGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlLCBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICBsZXQgYnJvd3NlciA9IHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCk7XG4gICAgbGV0IGlzTW9iaWxlID0gYnJvd3Nlci5vcyA9PT0gXCJBbmRyb2lkXCIgfHwgYnJvd3Nlci5vcyA9PT0gXCJpT1NcIjtcblxuICAgIGNvbnN0IGNyZWF0ZUFkQ29udGFpbmVyID0gKCkgPT4ge1xuICAgICAgICBsZXQgYWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdvcC1hZHMnKTtcbiAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdvcC1hZHMnKTtcbiAgICAgICAgcGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpLmFwcGVuZChhZENvbnRhaW5lcik7XG5cbiAgICAgICAgZWxBZFZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgZWxBZFZpZGVvLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpO1xuICAgICAgICBlbEFkVmlkZW8uc2V0QXR0cmlidXRlKCd0aXRsZScsICdBZHZlcnRpc2VtZW50Jyk7XG4gICAgICAgIGVsQWRWaWRlby5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ29wLWFkcy12YXN0LXZpZGVvJyk7XG5cbiAgICAgICAgYWRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRCdXR0b24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdvcC1hZHMtYnV0dG9uJyk7XG5cbiAgICAgICAgdGV4dFZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGV4dFZpZXcuc2V0QXR0cmlidXRlKCdjbGFzcycsICdvcC1hZHMtdGV4dHZpZXcnKTtcblxuICAgICAgICBhZEJ1dHRvbi5hcHBlbmQodGV4dFZpZXcpO1xuICAgICAgICBhZENvbnRhaW5lci5hcHBlbmQoZWxBZFZpZGVvKTtcbiAgICAgICAgYWRDb250YWluZXIuYXBwZW5kKGFkQnV0dG9uKTtcblxuICAgICAgICByZXR1cm4gYWRDb250YWluZXI7XG4gICAgfTtcblxuICAgIGNvbnRhaW5lciA9IGNyZWF0ZUFkQ29udGFpbmVyKCk7XG5cbiAgICBsZXQgdmFzdENsaWVudCA9IG5ldyBWQVNUQ2xpZW50KCk7XG4gICAgbGV0IHZhc3RUcmFja2VyID0gbnVsbDtcbiAgICBsZXQgYWQgPSBudWxsO1xuXG5cbiAgICBjb25zdCBPbkFkRXJyb3IgPSBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgYWRzRXJyb3JPY2N1cnJlZCA9IHRydWU7XG4gICAgICAgIGVsQWRWaWRlby5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfRVJST1IsIHtjb2RlIDogZXJyb3IuY29kZSwgbWVzc2FnZSA6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgICAgc3BlYy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgc3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBpbml0UmVxdWVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFzdENsaWVudC5nZXQoYWRUYWdVcmwpIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCB0aGUgcGFyc2VkIFZBU1QgcmVzcG9uc2VcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBpbml0UmVxdWVzdCgpXCIpO1xuICAgICAgICAgICAgYWQgPSByZXMuYWRzWzBdO1xuICAgICAgICAgICAgaWYoIWFkKXtcbiAgICAgICAgICAgICAgICB0aHJvdyB7Y29kZSA6IDQwMSwgbWVzc2FnZSA6IFwiRmlsZSBub3QgZm91bmQuIFVuYWJsZSB0byBmaW5kIExpbmVhci9NZWRpYUZpbGUgZnJvbSBVUkkuXCJ9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFzdFRyYWNrZXIgPSBuZXcgVkFTVFRyYWNrZXIodmFzdENsaWVudCwgYWQsIGFkLmNyZWF0aXZlc1swXSk7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBjcmVhdGVkIGFkIHRyYWNrZXIuXCIpO1xuXG4gICAgICAgICAgICBsaXN0ZW5lciA9IEFkc0V2ZW50c0xpc3RlbmVyKGVsQWRWaWRlbywgdmFzdFRyYWNrZXIsIHByb3ZpZGVyLCBzcGVjLCBhZEJ1dHRvbiwgdGV4dFZpZXcsIE9uQWRFcnJvcik7XG5cbiAgICAgICAgICAgIGxldCB2aWRlb1VSTCA9ICBcIlwiO1xuICAgICAgICAgICAgaWYoYWQuY3JlYXRpdmVzICYmIGFkLmNyZWF0aXZlcy5sZW5ndGggPiAwICYmIGFkLmNyZWF0aXZlc1swXS5tZWRpYUZpbGVzICYmIGFkLmNyZWF0aXZlc1swXS5tZWRpYUZpbGVzLmxlbmd0aCA+IDAgJiYgYWQuY3JlYXRpdmVzWzBdLm1lZGlhRmlsZXNbMF0uZmlsZVVSTCl7XG4gICAgICAgICAgICAgICAgdmlkZW9VUkwgPSBhZC5jcmVhdGl2ZXNbMF0ubWVkaWFGaWxlc1swXS5maWxlVVJMO1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBtZWRpYSB1cmwgOiBcIiwgdmlkZW9VUkwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxBZFZpZGVvLnNyYyA9IHZpZGVvVVJMO1xuXG4gICAgICAgICAgICAvL2tlZXAgdm9sdW1lIGV2ZW4gaWYgcGxheWxpc3QgaXRlbSBjaGFuZ2VzLlxuICAgICAgICAgICAgZWxBZFZpZGVvLnZvbHVtZSA9IGVsVmlkZW8udm9sdW1lO1xuICAgICAgICAgICAgZWxBZFZpZGVvLm11dGVkID0gZWxWaWRlby5tdXRlZDtcblxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICBPbkFkRXJyb3IoZXJyb3IpO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cblxuXG4gICAgY29uc3QgY2hlY2tBdXRvcGxheVN1cHBvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBjaGVja0F1dG9wbGF5U3VwcG9ydCgpIFwiKTtcblxuICAgICAgICBsZXQgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJ3RydWUnKTtcbiAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8uc3JjID0gVEVNUF9WSURFT19VUkw7XG4gICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLmxvYWQoKTtcblxuXG4gICAgICAgIGVsQWRWaWRlby5sb2FkKCk7ICAgLy9mb3IgaW9zIFVzZXIgSW50ZXJhY3Rpb24gcHJvYmxlbVxuICAgICAgICAvL0Rhc2ggaGFzIGFscmVhZHkgbG9hZGVkIHdoZW4gdHJpZ2dlcmVkIHByb3ZpZGVyLnBsYXkoKSBhbHdheXMuXG4gICAgICAgIGlmKGlzTW9iaWxlICYmIHByb3ZpZGVyLmdldE5hbWUoKSAhPT0gUFJPVklERVJfREFTSCApe1xuICAgICAgICAgICAgLy9NYWluIHZpZGVvIHNldHMgdXNlciBnZXN0dXJlIHdoZW4gdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8gdHJpZ2dlcmVkIGNoZWNraW5nLlxuICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xlYXJBbmRSZXBvcnQgPSBmdW5jdGlvbihfYXV0b3BsYXlBbGxvd2VkLCBfYXV0b3BsYXlSZXF1aXJlc011dGVkKXtcbiAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IF9hdXRvcGxheUFsbG93ZWQ7XG4gICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBfYXV0b3BsYXlSZXF1aXJlc011dGVkO1xuICAgICAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnJlbW92ZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgICAgICAgaWYoIXRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBsYXkpe1xuICAgICAgICAgICAgICAgIC8vSSBjYW4ndCByZW1lbWJlciB0aGlzIGNhc2UuLi5cbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogIXRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBsYXlcIik7XG4gICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGxldCBwbGF5UHJvbWlzZSA9IHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBpZiAocGxheVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBwbGF5UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogYXV0byBwbGF5IGFsbG93ZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCB1bm11dGVkIGF1dG9wbGF5IHdvcmtzLlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogYXV0byBwbGF5IGZhaWxlZFwiLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogcHJvbWlzZSBub3Qgc3VwcG9ydFwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy9NYXliZSB0aGlzIGlzIElFMTEuLi4uXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHRoYXQuaXNBY3RpdmUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmFjdGl2ZTtcbiAgICB9O1xuICAgIHRoYXQuc3RhcnRlZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhcnRlZDtcbiAgICB9O1xuICAgIHRoYXQucGxheSA9ICgpID0+IHtcbiAgICAgICAgaWYoc3BlYy5zdGFydGVkKXtcbiAgICAgICAgICAgIHJldHVybiBlbEFkVmlkZW8ucGxheSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja01haW5Db250ZW50TG9hZGVkID0gZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgICAgICAvL3dhaXQgZm9yIG1haW4gY29udGVudHMgbWV0YSBsb2FkZWQuXG4gICAgICAgICAgICAgICAgICAgIC8vaGF2ZSB0byB0cmlnZ2VyIENPTlRFTlRfTUVUQSBmaXJzdC4gbmV4dCB0cmlnZ2VyIEFEX0NIQU5HRUQuXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdENvbnRyb2xVSSBmaXJzdCAtPiAgaW5pdCBhZCBVSVxuICAgICAgICAgICAgICAgICAgICAvL01heWJlIGdvb2dsZSBpbWEgd2FpdHMgY29udGVudCBsb2FkZWQgaW50ZXJuYWwuXG4gICAgICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLm1ldGFMb2FkZWQoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbWFpbiBjb250ZW50cyBtZXRhIGxvYWRlZC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0F1dG9wbGF5U3VwcG9ydCgpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpICYmICFhdXRvcGxheUFsbG93ZWQpICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBhdXRvcGxheUFsbG93ZWQgOiBmYWxzZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoQVVUT1BMQVlfTk9UX0FMTE9XRUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrTWFpbkNvbnRlbnRMb2FkZWQsIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY2hlY2tNYWluQ29udGVudExvYWRlZCgpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgZWxBZFZpZGVvLnBhdXNlKCk7XG4gICAgfTtcblxuICAgIC8vRW5kIE9mIE1haW4gQ29udGVudHMuXG4gICAgdGhhdC52aWRlb0VuZGVkQ2FsbGJhY2sgPSAoY29tcGxldGVDb250ZW50Q2FsbGJhY2spID0+IHtcblxuICAgICAgICBjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaygpO1xuICAgICAgICAvL2NoZWNrIHRydWUgd2hlbiBtYWluIGNvbnRlbnRzIGVuZGVkLlxuICAgICAgICBzcGVjLmlzVmlkZW9FbmRlZCA9IHRydWU7XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgIGlmKGxpc3RlbmVyKXtcbiAgICAgICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXN0VHJhY2tlciA9IG51bGw7XG4gICAgICAgIHZhc3RDbGllbnQgPSBudWxsO1xuXG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmUoKTtcblxuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBZDsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyNi8wNi8yMDE5LlxuICovXG5pbXBvcnQge1xuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfQURfTE9BREVELFxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXG4gICAgU1RBVEVfQURfUEFVU0VELFxuICAgIFNUQVRFX0FEX0NPTVBMRVRFLFxuICAgIEFEX0NIQU5HRUQsXG4gICAgQURfVElNRSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsXG4gICAgUExBWUVSX0NMSUNLRUQsXG4gICAgUExBWUVSX0FEX0NMSUNLLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxBZFZpZGVvLCB2YXN0VHJhY2tlciwgcHJvdmlkZXIsIGFkc1NwZWMsIGFkQnV0dG9uLCB0ZXh0VmlldywgT25BZEVycm9yKXtcbiAgICBjb25zdCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgY29uc3QgTUVESUFGSUxFX1BMQVlCQUNLX0VSUk9SID0gJzQwNSc7XG5cbiAgICBsZXQgJHRleHRWaWV3ID0gTEEkKHRleHRWaWV3KTtcbiAgICBsZXQgJGFkQnV0dG9uID0gTEEkKGFkQnV0dG9uKTtcbiAgICBsZXQgJGVsQWRWaWRlbyA9IExBJChlbEFkVmlkZW8pO1xuXG5cbiAgICBwcm92aWRlci5vbihDT05URU5UX1ZPTFVNRSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBpZihkYXRhLm11dGUpe1xuICAgICAgICAgICAgZWxBZFZpZGVvLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBlbEFkVmlkZW8ubXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGVsQWRWaWRlby52b2x1bWUgPSBkYXRhLnZvbHVtZS8xMDA7XG4gICAgICAgIH1cbiAgICB9LCB0aGF0KTtcblxuICAgIC8vTGlrZSBhIENPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRFxuICAgIGNvbnN0IHByb2Nlc3NFbmRPZkFkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAkYWRCdXR0b24uaGlkZSgpO1xuXG4gICAgICAgIGlmKGFkc1NwZWMuc3RhcnRlZCAmJiAocHJvdmlkZXIuZ2V0UG9zaXRpb24oKSA9PT0gMCB8fCAhYWRzU3BlYy5pc1ZpZGVvRW5kZWQpICApe1xuICAgICAgICAgICAgJGVsQWRWaWRlby5oaWRlKCk7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICAvL0xpa2UgYSBDT05URU5UX1BBVVNFX1JFUVVFU1RFRFxuICAgIGNvbnN0IHByb2Nlc3NTdGFydE9mQWQgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgICRlbEFkVmlkZW8uc2hvdygpO1xuICAgICAgICAkYWRCdXR0b24uc2hvdygpO1xuXG4gICAgfTtcbiAgICBjb25zdCBza2lwQnV0dG9uQ2xpY2tlZCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgaWYoJHRleHRWaWV3Lmhhc0NsYXNzKFwidmlkZW9BZFVpQWN0aW9uXCIpKXtcbiAgICAgICAgICAgIHZhc3RUcmFja2VyLnNraXAoKTtcbiAgICAgICAgICAgIGVsQWRWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgcHJvY2Vzc0VuZE9mQWQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0ZXh0Vmlldy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2tpcEJ1dHRvbkNsaWNrZWQsIGZhbHNlKTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHMuZXJyb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBlcnJvci5cIiwgZWxBZFZpZGVvLmVycm9yKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBlcnJvci5cIiwgZWxBZFZpZGVvLmVycm9yKTtcbiAgICAgICAgbGV0IGVycm9yID0ge307XG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxBZFZpZGVvLmVycm9yICYmIGVsQWRWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xuXG4gICAgICAgIGlmKGNvZGUgPT09IDIpIHtcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPSA0MDI7XG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gXCJUaW1lb3V0IG9mIE1lZGlhRmlsZSBVUkkuXCI7XG4gICAgICAgIH1lbHNlIGlmKGNvZGUgPT09IDMpe1xuICAgICAgICAgICAgZXJyb3IuY29kZSA9IDQwNTtcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBcIlByb2JsZW0gZGlzcGxheWluZyBNZWRpYUZpbGUuIFZpZGVvIHBsYXllciBmb3VuZCBhIE1lZGlhRmlsZSB3aXRoIHN1cHBvcnRlZCB0eXBlIGJ1dCBjb3VsZG7igJl0IGRpc3BsYXkgaXQuIE1lZGlhRmlsZSBtYXkgaW5jbHVkZTogdW5zdXBwb3J0ZWQgY29kZWNzLCBkaWZmZXJlbnQgTUlNRSB0eXBlIHRoYW4gTWVkaWFGaWxlQHR5cGUsIHVuc3VwcG9ydGVkIGRlbGl2ZXJ5IG1ldGhvZCwgZXRjLlwiO1xuICAgICAgICB9ZWxzZSBpZihjb2RlID09PSA0KXtcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPSA0MDM7XG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gXCJDb3VsZG7igJl0IGZpbmQgTWVkaWFGaWxlIHRoYXQgaXMgc3VwcG9ydGVkIGJ5IHRoaXMgdmlkZW8gcGxheWVyLCBiYXNlZCBvbiB0aGUgYXR0cmlidXRlcyBvZiB0aGUgTWVkaWFGaWxlIGVsZW1lbnQuXCI7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZXJyb3IuY29kZSA9IDQwMDtcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBcIkdlbmVyYWwgTGluZWFyIGVycm9yLiBWaWRlbyBwbGF5ZXIgaXMgdW5hYmxlIHRvIGRpc3BsYXkgdGhlIExpbmVhciBBZC5cIjtcbiAgICAgICAgfVxuICAgICAgICB2YXN0VHJhY2tlci5lcnJvcldpdGhDb2RlKGVycm9yLmNvZGUpO1xuICAgICAgICBPbkFkRXJyb3IoTUVESUFGSUxFX1BMQVlCQUNLX0VSUk9SKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuY2FucGxheSA9IGZ1bmN0aW9uKCl7XG5cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFzdFRyYWNrZXIuY29tcGxldGUoKTtcblxuICAgICAgICBwcm9jZXNzRW5kT2ZBZCgpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMuY2xpY2sgPSBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIHZhc3RUcmFja2VyLmNsaWNrKCk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFzdFRyYWNrZXIuc2V0UGF1c2VkKGZhbHNlKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFzdFRyYWNrZXIuc2V0UGF1c2VkKHRydWUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgdmFzdFRyYWNrZXIuc2V0UHJvZ3Jlc3MoZXZlbnQudGFyZ2V0LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9USU1FLCB7XG4gICAgICAgICAgICBkdXJhdGlvbiA6IGVsQWRWaWRlby5kdXJhdGlvbixcbiAgICAgICAgICAgIHBvc2l0aW9uIDogZWxBZFZpZGVvLmN1cnJlbnRUaW1lXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMudm9sdW1lY2hhbmdlID0gZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBBZCBWaWRlbyBWb2x1bWVjaGFuZ2UuXCIpO1xuICAgICAgICB2YXN0VHJhY2tlci5zZXRNdXRlZChldmVudC50YXJnZXQubXV0ZWQpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkbWV0YWRhdGEgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBBZCBDT05URU5UIExPQURFRCAuXCIpO1xuXG4gICAgICAgIC8vRmxhc2ggcGxheSBpcyB2ZXJ5IGZhc3QuLi5cbiAgICAgICAgaWYoU1RBVEVfUExBWUlORyA9PT0gcHJvdmlkZXIuZ2V0U3RhdGUoKSl7XG4gICAgICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFzdFRyYWNrZXIudHJhY2tJbXByZXNzaW9uKCk7XG5cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9MT0FERUQsIHtyZW1haW5pbmcgOiBlbEFkVmlkZW8uZHVyYXRpb24sIGlzTGluZWFyIDogdHJ1ZX0pO1xuICAgICAgICBlbEFkVmlkZW8ucGxheSgpO1xuICAgIH07XG5cbiAgICB2YXN0VHJhY2tlci5vbignc2tpcCcsICgpID0+IHtcbiAgICAgICAgLy8gc2tpcCB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogc2tpcHBlZFwiKTtcbiAgICB9KTtcblxuICAgIHZhc3RUcmFja2VyLm9uKCdtdXRlJywgKCkgPT4ge1xuICAgICAgICAvLyBtdXRlIHRyYWNraW5nIFVSTHMgaGF2ZSBiZWVuIGNhbGxlZFxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBtdXRlZFwiKTtcbiAgICB9KTtcblxuICAgIHZhc3RUcmFja2VyLm9uKCd1bm11dGUnLCAoKSA9PiB7XG4gICAgICAgIC8vIHVubXV0ZSB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogdW5tdXRlZFwiKTtcbiAgICB9KTtcblxuICAgIHZhc3RUcmFja2VyLm9uKCdyZXN1bWUnLCAoKSA9PiB7XG4gICAgICAgIC8vIHJlc3VtZSB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogdmFzdFRyYWNrZXIgcmVzdW1lZC5cIik7XG5cbiAgICAgICAgLy9wcmV2ZW50IHRvIHNldCBTVEFURV9BRF9QTEFZSU5HIHdoZW4gZmlyc3QgcGxheS5cbiAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbiAgICB2YXN0VHJhY2tlci5vbigncGF1c2UnLCAoKSA9PiB7XG4gICAgICAgIC8vIHBhdXNlIHRyYWNraW5nIFVSTHMgaGF2ZSBiZWVuIGNhbGxlZFxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiB2YXN0VHJhY2tlciBwYXVzZWQuXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QQVVTRUQpO1xuICAgIH0pO1xuXG4gICAgdmFzdFRyYWNrZXIub24oJ2NsaWNrdGhyb3VnaCcsIHVybCA9PiB7XG4gICAgICAgIC8vIE9wZW4gdGhlIHJlc29sdmVkIGNsaWNrVGhyb3VnaCB1cmxcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogY2xpY2t0aHJvdWdoIDpcIiwgdXJsKTtcbiAgICAgICAgLy9kb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICB3aW5kb3cub3Blbih1cmwsICdfYmxhbmsnKTtcblxuICAgIH0pO1xuXG4gICAgdmFzdFRyYWNrZXIub24oJ3NraXAtY291bnRkb3duJywgKGRhdGEpID0+IHtcbiAgICAgICAgaWYoZGF0YSA9PT0gMCl7XG4gICAgICAgICAgICAkdGV4dFZpZXcuaHRtbChcIuq0keqzoCDqsbTrhIjrm7DquLA8aSBjbGFzcz0nb3AtY29uIG9wLWFycm93LXJpZ2h0IGJ0bi1yaWdodCc+PC9pPlwiKTtcbiAgICAgICAgICAgICR0ZXh0Vmlldy5hZGRDbGFzcyhcInZpZGVvQWRVaUFjdGlvblwiKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkdGV4dFZpZXcuaHRtbCgocGFyc2VJbnQoZGF0YSkrMSkrXCLstIgg7ZuE7JeQIOydtCDqtJHqs6Drpbwg6rG064SI65u4IOyImCDsnojsirXri4jri6QuXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdmFzdFRyYWNrZXIub24oJ3Jld2luZCcsICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogcmV3aW5kXCIpO1xuICAgIH0pO1xuXG4gICAgdmFzdFRyYWNrZXIub24oJ3N0YXJ0JywgKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBzdGFydGVkXCIpO1xuXG4gICAgICAgIGFkc1NwZWMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgcHJvY2Vzc1N0YXJ0T2ZBZCgpO1xuXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfQ0hBTkdFRCwge2lzTGluZWFyIDogdHJ1ZX0pO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QTEFZSU5HKTtcbiAgICB9KTtcbiAgICB2YXN0VHJhY2tlci5vbignZmlyc3RRdWFydGlsZScsICgpID0+IHtcbiAgICAgICAgLy8gZmlyc3RRdWFydGlsZSB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogZmlyc3RRdWFydGlsZVwiKTtcbiAgICB9KTtcbiAgICB2YXN0VHJhY2tlci5vbignbWlkcG9pbnQnLCAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBsaXN0ZW5lciA6IG1pZHBvaW50XCIpO1xuICAgIH0pO1xuICAgIHZhc3RUcmFja2VyLm9uKCd0aGlyZFF1YXJ0aWxlJywgKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiB0aGlyZFF1YXJ0aWxlXCIpO1xuICAgIH0pO1xuXG4gICAgdmFzdFRyYWNrZXIub24oJ2NyZWF0aXZlVmlldycsICgpID0+IHtcbiAgICAgICAgLy8gaW1wcmVzc2lvbiB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogY3JlYXRpdmVWaWV3XCIpO1xuXG4gICAgfSk7XG5cbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICBlbEFkVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICBlbEFkVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XG4gICAgICAgIHRleHRWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBza2lwQnV0dG9uQ2xpY2tlZCwgZmFsc2UpO1xuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgZWxBZFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxMi4uXG4gKi9cbmltcG9ydCB7RVJST1IsIFNUQVRFX0VSUk9SfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RWaWRlb0VsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50T3JNc2UpIHtcbiAgICBpZihfLmlzRWxlbWVudChlbGVtZW50T3JNc2UpKXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZTtcbiAgICB9XG4gICAgaWYoZWxlbWVudE9yTXNlLmdldFZpZGVvRWxlbWVudCl7XG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KCk7XG4gICAgfWVsc2UgaWYoZWxlbWVudE9yTXNlLm1lZGlhKXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5tZWRpYTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VwYXJhdGVMaXZlID0gZnVuY3Rpb24obXNlKSB7XG4gICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXG5cbiAgICBpZihtc2UgJiYgbXNlLmlzRHluYW1pYyl7XG4gICAgICAgIHJldHVybiBtc2UuaXNEeW5hbWljKCk7XG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXJyb3JUcmlnZ2VyID0gZnVuY3Rpb24oZXJyb3IsIHByb3ZpZGVyKXtcbiAgICBpZihwcm92aWRlcil7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IgKTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCBjb25zdCBwaWNrQ3VycmVudFNvdXJjZSA9IChzb3VyY2VzLCBjdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpID0+IHtcbiAgICBsZXQgc291cmNlSW5kZXggPSBNYXRoLm1heCgwLCBjdXJyZW50U291cmNlKTtcbiAgICBjb25zdCBsYWJlbCA9XCJcIjtcbiAgICBpZiAoc291cmNlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VJbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkgPT09IGkgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKmlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2VJbmRleDtcbn07IiwiLypDb3B5cmlnaHQgKGMpIDIwMTMgT2xpdmllciBQb2l0cmV5IDxyc0BkYWlseW1vdGlvbi5jb20+XG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZFxuIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS4qL1xuY2xhc3MgQWR7Y29uc3RydWN0b3IoKXt0aGlzLmlkPW51bGwsdGhpcy5zZXF1ZW5jZT1udWxsLHRoaXMuc3lzdGVtPW51bGwsdGhpcy50aXRsZT1udWxsLHRoaXMuZGVzY3JpcHRpb249bnVsbCx0aGlzLmFkdmVydGlzZXI9bnVsbCx0aGlzLnByaWNpbmc9bnVsbCx0aGlzLnN1cnZleT1udWxsLHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXM9W10sdGhpcy5pbXByZXNzaW9uVVJMVGVtcGxhdGVzPVtdLHRoaXMuY3JlYXRpdmVzPVtdLHRoaXMuZXh0ZW5zaW9ucz1bXX19Y2xhc3MgQWRFeHRlbnNpb257Y29uc3RydWN0b3IoKXt0aGlzLmF0dHJpYnV0ZXM9e30sdGhpcy5jaGlsZHJlbj1bXX19Y2xhc3MgQWRFeHRlbnNpb25DaGlsZHtjb25zdHJ1Y3Rvcigpe3RoaXMubmFtZT1udWxsLHRoaXMudmFsdWU9bnVsbCx0aGlzLmF0dHJpYnV0ZXM9e319fWNsYXNzIENvbXBhbmlvbkFke2NvbnN0cnVjdG9yKCl7dGhpcy5pZD1udWxsLHRoaXMud2lkdGg9MCx0aGlzLmhlaWdodD0wLHRoaXMudHlwZT1udWxsLHRoaXMuc3RhdGljUmVzb3VyY2U9bnVsbCx0aGlzLmh0bWxSZXNvdXJjZT1udWxsLHRoaXMuaWZyYW1lUmVzb3VyY2U9bnVsbCx0aGlzLmFsdFRleHQ9bnVsbCx0aGlzLmNvbXBhbmlvbkNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPW51bGwsdGhpcy5jb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPVtdLHRoaXMudHJhY2tpbmdFdmVudHM9e319fWNsYXNzIENyZWF0aXZle2NvbnN0cnVjdG9yKGU9e30pe3RoaXMuaWQ9ZS5pZHx8bnVsbCx0aGlzLmFkSWQ9ZS5hZElkfHxudWxsLHRoaXMuc2VxdWVuY2U9ZS5zZXF1ZW5jZXx8bnVsbCx0aGlzLmFwaUZyYW1ld29yaz1lLmFwaUZyYW1ld29ya3x8bnVsbCx0aGlzLnRyYWNraW5nRXZlbnRzPXt9fX1jbGFzcyBDcmVhdGl2ZUNvbXBhbmlvbiBleHRlbmRzIENyZWF0aXZle2NvbnN0cnVjdG9yKGU9e30pe3N1cGVyKGUpLHRoaXMudHlwZT1cImNvbXBhbmlvblwiLHRoaXMudmFyaWF0aW9ucz1bXX19ZnVuY3Rpb24gdHJhY2soZSx0KXtyZXNvbHZlVVJMVGVtcGxhdGVzKGUsdCkuZm9yRWFjaChlPT57aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmbnVsbCE9PXdpbmRvdyl7KG5ldyBJbWFnZSkuc3JjPWV9fSl9ZnVuY3Rpb24gcmVzb2x2ZVVSTFRlbXBsYXRlcyhlLHQ9e30pe2NvbnN0IHI9W107dC5BU1NFVFVSSSYmKHQuQVNTRVRVUkk9ZW5jb2RlVVJJQ29tcG9uZW50UkZDMzk4Nih0LkFTU0VUVVJJKSksdC5DT05URU5UUExBWUhFQUQmJih0LkNPTlRFTlRQTEFZSEVBRD1lbmNvZGVVUklDb21wb25lbnRSRkMzOTg2KHQuQ09OVEVOVFBMQVlIRUFEKSksdC5FUlJPUkNPREUmJiEvXlswLTldezN9JC8udGVzdCh0LkVSUk9SQ09ERSkmJih0LkVSUk9SQ09ERT05MDApLHQuQ0FDSEVCVVNUSU5HPWxlZnRwYWQoTWF0aC5yb3VuZCgxZTgqTWF0aC5yYW5kb20oKSkudG9TdHJpbmcoKSksdC5USU1FU1RBTVA9ZW5jb2RlVVJJQ29tcG9uZW50UkZDMzk4NigobmV3IERhdGUpLnRvSVNPU3RyaW5nKCkpLHQuUkFORE9NPXQucmFuZG9tPXQuQ0FDSEVCVVNUSU5HO2ZvcihsZXQgaSBpbiBlKXtsZXQgcz1lW2ldO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBzKXtmb3IobGV0IGUgaW4gdCl7Y29uc3Qgcj10W2VdLGk9YFske2V9XWAsbj1gJSUke2V9JSVgO3M9KHM9cy5yZXBsYWNlKGkscikpLnJlcGxhY2UobixyKX1yLnB1c2gocyl9fXJldHVybiByfWZ1bmN0aW9uIGVuY29kZVVSSUNvbXBvbmVudFJGQzM5ODYoZSl7cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChlKS5yZXBsYWNlKC9bIScoKSpdL2csZT0+YCUke2UuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNil9YCl9ZnVuY3Rpb24gbGVmdHBhZChlKXtyZXR1cm4gZS5sZW5ndGg8OD9yYW5nZSgwLDgtZS5sZW5ndGgsITEpLm1hcChlPT5cIjBcIikuam9pbihcIlwiKStlOmV9ZnVuY3Rpb24gcmFuZ2UoZSx0LHIpe2xldCBpPVtdLHM9ZTx0LG49cj9zP3QrMTp0LTE6dDtmb3IobGV0IHQ9ZTtzP3Q8bjp0Pm47cz90Kys6dC0tKWkucHVzaCh0KTtyZXR1cm4gaX1mdW5jdGlvbiBpc051bWVyaWMoZSl7cmV0dXJuIWlzTmFOKHBhcnNlRmxvYXQoZSkpJiZpc0Zpbml0ZShlKX1mdW5jdGlvbiBmbGF0dGVuKGUpe3JldHVybiBlLnJlZHVjZSgoZSx0KT0+ZS5jb25jYXQoQXJyYXkuaXNBcnJheSh0KT9mbGF0dGVuKHQpOnQpLFtdKX1jb25zdCB1dGlsPXt0cmFjazp0cmFjayxyZXNvbHZlVVJMVGVtcGxhdGVzOnJlc29sdmVVUkxUZW1wbGF0ZXMsZW5jb2RlVVJJQ29tcG9uZW50UkZDMzk4NjplbmNvZGVVUklDb21wb25lbnRSRkMzOTg2LGxlZnRwYWQ6bGVmdHBhZCxyYW5nZTpyYW5nZSxpc051bWVyaWM6aXNOdW1lcmljLGZsYXR0ZW46ZmxhdHRlbn07ZnVuY3Rpb24gY2hpbGRCeU5hbWUoZSx0KXtjb25zdCByPWUuY2hpbGROb2Rlcztmb3IobGV0IGUgaW4gcil7Y29uc3QgaT1yW2VdO2lmKGkubm9kZU5hbWU9PT10KXJldHVybiBpfX1mdW5jdGlvbiBjaGlsZHJlbkJ5TmFtZShlLHQpe2NvbnN0IHI9W10saT1lLmNoaWxkTm9kZXM7Zm9yKGxldCBlIGluIGkpe2NvbnN0IHM9aVtlXTtzLm5vZGVOYW1lPT09dCYmci5wdXNoKHMpfXJldHVybiByfWZ1bmN0aW9uIHJlc29sdmVWYXN0QWRUYWdVUkkoZSx0KXtpZighdClyZXR1cm4gZTtpZigwPT09ZS5pbmRleE9mKFwiLy9cIikpe2NvbnN0e3Byb3RvY29sOnR9PWxvY2F0aW9uO3JldHVybmAke3R9JHtlfWB9aWYoLTE9PT1lLmluZGV4T2YoXCI6Ly9cIikpe3JldHVybmAke3Quc2xpY2UoMCx0Lmxhc3RJbmRleE9mKFwiL1wiKSl9LyR7ZX1gfXJldHVybiBlfWZ1bmN0aW9uIHBhcnNlQm9vbGVhbihlKXtyZXR1cm4tMSE9PVtcInRydWVcIixcIlRSVUVcIixcIjFcIl0uaW5kZXhPZihlKX1mdW5jdGlvbiBwYXJzZU5vZGVUZXh0KGUpe3JldHVybiBlJiYoZS50ZXh0Q29udGVudHx8ZS50ZXh0fHxcIlwiKS50cmltKCl9ZnVuY3Rpb24gY29weU5vZGVBdHRyaWJ1dGUoZSx0LHIpe2NvbnN0IGk9dC5nZXRBdHRyaWJ1dGUoZSk7aSYmci5zZXRBdHRyaWJ1dGUoZSxpKX1mdW5jdGlvbiBwYXJzZUR1cmF0aW9uKGUpe2lmKG51bGw9PWUpcmV0dXJuLTE7aWYodXRpbC5pc051bWVyaWMoZSkpcmV0dXJuIHBhcnNlSW50KGUpO2NvbnN0IHQ9ZS5zcGxpdChcIjpcIik7aWYoMyE9PXQubGVuZ3RoKXJldHVybi0xO2NvbnN0IHI9dFsyXS5zcGxpdChcIi5cIik7bGV0IGk9cGFyc2VJbnQoclswXSk7Mj09PXIubGVuZ3RoJiYoaSs9cGFyc2VGbG9hdChgMC4ke3JbMV19YCkpO2NvbnN0IHM9cGFyc2VJbnQoNjAqdFsxXSksbj1wYXJzZUludCg2MCp0WzBdKjYwKTtyZXR1cm4gaXNOYU4obil8fGlzTmFOKHMpfHxpc05hTihpKXx8cz4zNjAwfHxpPjYwPy0xOm4rcytpfWZ1bmN0aW9uIHNwbGl0VkFTVChlKXtjb25zdCB0PVtdO2xldCByPW51bGw7cmV0dXJuIGUuZm9yRWFjaCgoaSxzKT0+e2lmKGkuc2VxdWVuY2UmJihpLnNlcXVlbmNlPXBhcnNlSW50KGkuc2VxdWVuY2UsMTApKSxpLnNlcXVlbmNlPjEpe2NvbnN0IHQ9ZVtzLTFdO2lmKHQmJnQuc2VxdWVuY2U9PT1pLnNlcXVlbmNlLTEpcmV0dXJuIHZvaWQociYmci5wdXNoKGkpKTtkZWxldGUgaS5zZXF1ZW5jZX1yPVtpXSx0LnB1c2gocil9KSx0fWZ1bmN0aW9uIG1lcmdlV3JhcHBlckFkRGF0YShlLHQpe2UuZXJyb3JVUkxUZW1wbGF0ZXM9dC5lcnJvclVSTFRlbXBsYXRlcy5jb25jYXQoZS5lcnJvclVSTFRlbXBsYXRlcyksZS5pbXByZXNzaW9uVVJMVGVtcGxhdGVzPXQuaW1wcmVzc2lvblVSTFRlbXBsYXRlcy5jb25jYXQoZS5pbXByZXNzaW9uVVJMVGVtcGxhdGVzKSxlLmV4dGVuc2lvbnM9dC5leHRlbnNpb25zLmNvbmNhdChlLmV4dGVuc2lvbnMpLGUuY3JlYXRpdmVzLmZvckVhY2goZT0+e2lmKHQudHJhY2tpbmdFdmVudHMmJnQudHJhY2tpbmdFdmVudHNbZS50eXBlXSlmb3IobGV0IHIgaW4gdC50cmFja2luZ0V2ZW50c1tlLnR5cGVdKXtjb25zdCBpPXQudHJhY2tpbmdFdmVudHNbZS50eXBlXVtyXTtlLnRyYWNraW5nRXZlbnRzW3JdfHwoZS50cmFja2luZ0V2ZW50c1tyXT1bXSksZS50cmFja2luZ0V2ZW50c1tyXT1lLnRyYWNraW5nRXZlbnRzW3JdLmNvbmNhdChpKX19KSx0LnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyYmdC52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMubGVuZ3RoJiZlLmNyZWF0aXZlcy5mb3JFYWNoKGU9PntcImxpbmVhclwiPT09ZS50eXBlJiYoZS52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9ZS52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMuY29uY2F0KHQudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzKSl9KSx0LnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMmJnQudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcy5sZW5ndGgmJmUuY3JlYXRpdmVzLmZvckVhY2goZT0+e1wibGluZWFyXCI9PT1lLnR5cGUmJihlLnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXM9ZS52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzLmNvbmNhdCh0LnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMpKX0pLHQudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSYmZS5jcmVhdGl2ZXMuZm9yRWFjaChlPT57XCJsaW5lYXJcIj09PWUudHlwZSYmbnVsbD09ZS52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlJiYoZS52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPXQudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSl9KX1jb25zdCBwYXJzZXJVdGlscz17Y2hpbGRCeU5hbWU6Y2hpbGRCeU5hbWUsY2hpbGRyZW5CeU5hbWU6Y2hpbGRyZW5CeU5hbWUscmVzb2x2ZVZhc3RBZFRhZ1VSSTpyZXNvbHZlVmFzdEFkVGFnVVJJLHBhcnNlQm9vbGVhbjpwYXJzZUJvb2xlYW4scGFyc2VOb2RlVGV4dDpwYXJzZU5vZGVUZXh0LGNvcHlOb2RlQXR0cmlidXRlOmNvcHlOb2RlQXR0cmlidXRlLHBhcnNlRHVyYXRpb246cGFyc2VEdXJhdGlvbixzcGxpdFZBU1Q6c3BsaXRWQVNULG1lcmdlV3JhcHBlckFkRGF0YTptZXJnZVdyYXBwZXJBZERhdGF9O2Z1bmN0aW9uIHBhcnNlQ3JlYXRpdmVDb21wYW5pb24oZSx0KXtjb25zdCByPW5ldyBDcmVhdGl2ZUNvbXBhbmlvbih0KTtyZXR1cm4gcGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIkNvbXBhbmlvblwiKS5mb3JFYWNoKGU9Pntjb25zdCB0PW5ldyBDb21wYW5pb25BZDt0LmlkPWUuZ2V0QXR0cmlidXRlKFwiaWRcIil8fG51bGwsdC53aWR0aD1lLmdldEF0dHJpYnV0ZShcIndpZHRoXCIpLHQuaGVpZ2h0PWUuZ2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIpLHQuY29tcGFuaW9uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz1bXSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiSFRNTFJlc291cmNlXCIpLmZvckVhY2goZT0+e3QudHlwZT1lLmdldEF0dHJpYnV0ZShcImNyZWF0aXZlVHlwZVwiKXx8XCJ0ZXh0L2h0bWxcIix0Lmh0bWxSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIklGcmFtZVJlc291cmNlXCIpLmZvckVhY2goZT0+e3QudHlwZT1lLmdldEF0dHJpYnV0ZShcImNyZWF0aXZlVHlwZVwiKXx8MCx0LmlmcmFtZVJlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiU3RhdGljUmVzb3VyY2VcIikuZm9yRWFjaChyPT57dC50eXBlPXIuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHwwLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJBbHRUZXh0XCIpLmZvckVhY2goZT0+e3QuYWx0VGV4dD1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSksdC5zdGF0aWNSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHIpfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlRyYWNraW5nRXZlbnRzXCIpLmZvckVhY2goZT0+e3BhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJUcmFja2luZ1wiKS5mb3JFYWNoKGU9Pntjb25zdCByPWUuZ2V0QXR0cmlidXRlKFwiZXZlbnRcIiksaT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpO3ImJmkmJihudWxsPT10LnRyYWNraW5nRXZlbnRzW3JdJiYodC50cmFja2luZ0V2ZW50c1tyXT1bXSksdC50cmFja2luZ0V2ZW50c1tyXS5wdXNoKGkpKX0pfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIkNvbXBhbmlvbkNsaWNrVHJhY2tpbmdcIikuZm9yRWFjaChlPT57dC5jb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLnB1c2gocGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKSl9KSx0LmNvbXBhbmlvbkNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIkNvbXBhbmlvbkNsaWNrVGhyb3VnaFwiKSksdC5jb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiQ29tcGFuaW9uQ2xpY2tUcmFja2luZ1wiKSksci52YXJpYXRpb25zLnB1c2godCl9KSxyfWNsYXNzIENyZWF0aXZlTGluZWFyIGV4dGVuZHMgQ3JlYXRpdmV7Y29uc3RydWN0b3IoZT17fSl7c3VwZXIoZSksdGhpcy50eXBlPVwibGluZWFyXCIsdGhpcy5kdXJhdGlvbj0wLHRoaXMuc2tpcERlbGF5PW51bGwsdGhpcy5tZWRpYUZpbGVzPVtdLHRoaXMudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT1udWxsLHRoaXMudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPVtdLHRoaXMudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcz1bXSx0aGlzLmFkUGFyYW1ldGVycz1udWxsLHRoaXMuaWNvbnM9W119fWNsYXNzIEljb257Y29uc3RydWN0b3IoKXt0aGlzLnByb2dyYW09bnVsbCx0aGlzLmhlaWdodD0wLHRoaXMud2lkdGg9MCx0aGlzLnhQb3NpdGlvbj0wLHRoaXMueVBvc2l0aW9uPTAsdGhpcy5hcGlGcmFtZXdvcms9bnVsbCx0aGlzLm9mZnNldD1udWxsLHRoaXMuZHVyYXRpb249MCx0aGlzLnR5cGU9bnVsbCx0aGlzLnN0YXRpY1Jlc291cmNlPW51bGwsdGhpcy5odG1sUmVzb3VyY2U9bnVsbCx0aGlzLmlmcmFtZVJlc291cmNlPW51bGwsdGhpcy5pY29uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9bnVsbCx0aGlzLmljb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPVtdLHRoaXMuaWNvblZpZXdUcmFja2luZ1VSTFRlbXBsYXRlPW51bGx9fWNsYXNzIE1lZGlhRmlsZXtjb25zdHJ1Y3Rvcigpe3RoaXMuaWQ9bnVsbCx0aGlzLmZpbGVVUkw9bnVsbCx0aGlzLmRlbGl2ZXJ5VHlwZT1cInByb2dyZXNzaXZlXCIsdGhpcy5taW1lVHlwZT1udWxsLHRoaXMuY29kZWM9bnVsbCx0aGlzLmJpdHJhdGU9MCx0aGlzLm1pbkJpdHJhdGU9MCx0aGlzLm1heEJpdHJhdGU9MCx0aGlzLndpZHRoPTAsdGhpcy5oZWlnaHQ9MCx0aGlzLmFwaUZyYW1ld29yaz1udWxsLHRoaXMuc2NhbGFibGU9bnVsbCx0aGlzLm1haW50YWluQXNwZWN0UmF0aW89bnVsbH19ZnVuY3Rpb24gcGFyc2VDcmVhdGl2ZUxpbmVhcihlLHQpe2xldCByO2NvbnN0IGk9bmV3IENyZWF0aXZlTGluZWFyKHQpO2kuZHVyYXRpb249cGFyc2VyVXRpbHMucGFyc2VEdXJhdGlvbihwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJEdXJhdGlvblwiKSkpO2NvbnN0IHM9ZS5nZXRBdHRyaWJ1dGUoXCJza2lwb2Zmc2V0XCIpO2lmKG51bGw9PXMpaS5za2lwRGVsYXk9bnVsbDtlbHNlIGlmKFwiJVwiPT09cy5jaGFyQXQocy5sZW5ndGgtMSkmJi0xIT09aS5kdXJhdGlvbil7Y29uc3QgZT1wYXJzZUludChzLDEwKTtpLnNraXBEZWxheT1pLmR1cmF0aW9uKihlLzEwMCl9ZWxzZSBpLnNraXBEZWxheT1wYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKHMpO2NvbnN0IG49cGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIlZpZGVvQ2xpY2tzXCIpO24mJihpLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShuLFwiQ2xpY2tUaHJvdWdoXCIpKSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShuLFwiQ2xpY2tUcmFja2luZ1wiKS5mb3JFYWNoKGU9PntpLnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5wdXNoKHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSkpfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUobixcIkN1c3RvbUNsaWNrXCIpLmZvckVhY2goZT0+e2kudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcy5wdXNoKHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSkpfSkpO2NvbnN0IGE9cGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIkFkUGFyYW1ldGVyc1wiKTthJiYoaS5hZFBhcmFtZXRlcnM9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChhKSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlRyYWNraW5nRXZlbnRzXCIpLmZvckVhY2goZT0+e3BhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJUcmFja2luZ1wiKS5mb3JFYWNoKGU9PntsZXQgdD1lLmdldEF0dHJpYnV0ZShcImV2ZW50XCIpO2NvbnN0IHM9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKTtpZih0JiZzKXtpZihcInByb2dyZXNzXCI9PT10KXtpZighKHI9ZS5nZXRBdHRyaWJ1dGUoXCJvZmZzZXRcIikpKXJldHVybjt0PVwiJVwiPT09ci5jaGFyQXQoci5sZW5ndGgtMSk/YHByb2dyZXNzLSR7cn1gOmBwcm9ncmVzcy0ke01hdGgucm91bmQocGFyc2VyVXRpbHMucGFyc2VEdXJhdGlvbihyKSl9YH1udWxsPT1pLnRyYWNraW5nRXZlbnRzW3RdJiYoaS50cmFja2luZ0V2ZW50c1t0XT1bXSksaS50cmFja2luZ0V2ZW50c1t0XS5wdXNoKHMpfX0pfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIk1lZGlhRmlsZXNcIikuZm9yRWFjaChlPT57cGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIk1lZGlhRmlsZVwiKS5mb3JFYWNoKGU9Pntjb25zdCB0PW5ldyBNZWRpYUZpbGU7dC5pZD1lLmdldEF0dHJpYnV0ZShcImlkXCIpLHQuZmlsZVVSTD1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpLHQuZGVsaXZlcnlUeXBlPWUuZ2V0QXR0cmlidXRlKFwiZGVsaXZlcnlcIiksdC5jb2RlYz1lLmdldEF0dHJpYnV0ZShcImNvZGVjXCIpLHQubWltZVR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpLHQuYXBpRnJhbWV3b3JrPWUuZ2V0QXR0cmlidXRlKFwiYXBpRnJhbWV3b3JrXCIpLHQuYml0cmF0ZT1wYXJzZUludChlLmdldEF0dHJpYnV0ZShcImJpdHJhdGVcIil8fDApLHQubWluQml0cmF0ZT1wYXJzZUludChlLmdldEF0dHJpYnV0ZShcIm1pbkJpdHJhdGVcIil8fDApLHQubWF4Qml0cmF0ZT1wYXJzZUludChlLmdldEF0dHJpYnV0ZShcIm1heEJpdHJhdGVcIil8fDApLHQud2lkdGg9cGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKXx8MCksdC5oZWlnaHQ9cGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIil8fDApO2xldCByPWUuZ2V0QXR0cmlidXRlKFwic2NhbGFibGVcIik7ciYmXCJzdHJpbmdcIj09dHlwZW9mIHImJihcInRydWVcIj09PShyPXIudG9Mb3dlckNhc2UoKSk/dC5zY2FsYWJsZT0hMDpcImZhbHNlXCI9PT1yJiYodC5zY2FsYWJsZT0hMSkpO2xldCBzPWUuZ2V0QXR0cmlidXRlKFwibWFpbnRhaW5Bc3BlY3RSYXRpb1wiKTtzJiZcInN0cmluZ1wiPT10eXBlb2YgcyYmKFwidHJ1ZVwiPT09KHM9cy50b0xvd2VyQ2FzZSgpKT90Lm1haW50YWluQXNwZWN0UmF0aW89ITA6XCJmYWxzZVwiPT09cyYmKHQubWFpbnRhaW5Bc3BlY3RSYXRpbz0hMSkpLGkubWVkaWFGaWxlcy5wdXNoKHQpfSl9KTtjb25zdCBvPXBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJJY29uc1wiKTtyZXR1cm4gbyYmcGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUobyxcIkljb25cIikuZm9yRWFjaChlPT57Y29uc3QgdD1uZXcgSWNvbjt0LnByb2dyYW09ZS5nZXRBdHRyaWJ1dGUoXCJwcm9ncmFtXCIpLHQuaGVpZ2h0PXBhcnNlSW50KGUuZ2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIpfHwwKSx0LndpZHRoPXBhcnNlSW50KGUuZ2V0QXR0cmlidXRlKFwid2lkdGhcIil8fDApLHQueFBvc2l0aW9uPXBhcnNlWFBvc2l0aW9uKGUuZ2V0QXR0cmlidXRlKFwieFBvc2l0aW9uXCIpKSx0LnlQb3NpdGlvbj1wYXJzZVlQb3NpdGlvbihlLmdldEF0dHJpYnV0ZShcInlQb3NpdGlvblwiKSksdC5hcGlGcmFtZXdvcms9ZS5nZXRBdHRyaWJ1dGUoXCJhcGlGcmFtZXdvcmtcIiksdC5vZmZzZXQ9cGFyc2VyVXRpbHMucGFyc2VEdXJhdGlvbihlLmdldEF0dHJpYnV0ZShcIm9mZnNldFwiKSksdC5kdXJhdGlvbj1wYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKGUuZ2V0QXR0cmlidXRlKFwiZHVyYXRpb25cIikpLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJIVE1MUmVzb3VyY2VcIikuZm9yRWFjaChlPT57dC50eXBlPWUuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHxcInRleHQvaHRtbFwiLHQuaHRtbFJlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiSUZyYW1lUmVzb3VyY2VcIikuZm9yRWFjaChlPT57dC50eXBlPWUuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHwwLHQuaWZyYW1lUmVzb3VyY2U9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJTdGF0aWNSZXNvdXJjZVwiKS5mb3JFYWNoKGU9Pnt0LnR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fDAsdC5zdGF0aWNSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSk7Y29uc3Qgcj1wYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiSWNvbkNsaWNrc1wiKTtyJiYodC5pY29uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShyLFwiSWNvbkNsaWNrVGhyb3VnaFwiKSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUocixcIkljb25DbGlja1RyYWNraW5nXCIpLmZvckVhY2goZT0+e3QuaWNvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMucHVzaChwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpKX0pKSx0Lmljb25WaWV3VHJhY2tpbmdVUkxUZW1wbGF0ZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJJY29uVmlld1RyYWNraW5nXCIpKSxpLmljb25zLnB1c2godCl9KSxpfWZ1bmN0aW9uIHBhcnNlWFBvc2l0aW9uKGUpe3JldHVybi0xIT09W1wibGVmdFwiLFwicmlnaHRcIl0uaW5kZXhPZihlKT9lOnBhcnNlSW50KGV8fDApfWZ1bmN0aW9uIHBhcnNlWVBvc2l0aW9uKGUpe3JldHVybi0xIT09W1widG9wXCIsXCJib3R0b21cIl0uaW5kZXhPZihlKT9lOnBhcnNlSW50KGV8fDApfWNsYXNzIENyZWF0aXZlTm9uTGluZWFyIGV4dGVuZHMgQ3JlYXRpdmV7Y29uc3RydWN0b3IoZT17fSl7c3VwZXIoZSksdGhpcy50eXBlPVwibm9ubGluZWFyXCIsdGhpcy52YXJpYXRpb25zPVtdfX1jbGFzcyBOb25MaW5lYXJBZHtjb25zdHJ1Y3Rvcigpe3RoaXMuaWQ9bnVsbCx0aGlzLndpZHRoPTAsdGhpcy5oZWlnaHQ9MCx0aGlzLmV4cGFuZGVkV2lkdGg9MCx0aGlzLmV4cGFuZGVkSGVpZ2h0PTAsdGhpcy5zY2FsYWJsZT0hMCx0aGlzLm1haW50YWluQXNwZWN0UmF0aW89ITAsdGhpcy5taW5TdWdnZXN0ZWREdXJhdGlvbj0wLHRoaXMuYXBpRnJhbWV3b3JrPVwic3RhdGljXCIsdGhpcy50eXBlPW51bGwsdGhpcy5zdGF0aWNSZXNvdXJjZT1udWxsLHRoaXMuaHRtbFJlc291cmNlPW51bGwsdGhpcy5pZnJhbWVSZXNvdXJjZT1udWxsLHRoaXMubm9ubGluZWFyQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9bnVsbCx0aGlzLm5vbmxpbmVhckNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9W10sdGhpcy5hZFBhcmFtZXRlcnM9bnVsbH19ZnVuY3Rpb24gcGFyc2VDcmVhdGl2ZU5vbkxpbmVhcihlLHQpe2NvbnN0IHI9bmV3IENyZWF0aXZlTm9uTGluZWFyKHQpO3JldHVybiBwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiVHJhY2tpbmdFdmVudHNcIikuZm9yRWFjaChlPT57bGV0IHQsaTtwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiVHJhY2tpbmdcIikuZm9yRWFjaChlPT57dD1lLmdldEF0dHJpYnV0ZShcImV2ZW50XCIpLGk9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKSx0JiZpJiYobnVsbD09ci50cmFja2luZ0V2ZW50c1t0XSYmKHIudHJhY2tpbmdFdmVudHNbdF09W10pLHIudHJhY2tpbmdFdmVudHNbdF0ucHVzaChpKSl9KX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJOb25MaW5lYXJcIikuZm9yRWFjaChlPT57Y29uc3QgdD1uZXcgTm9uTGluZWFyQWQ7dC5pZD1lLmdldEF0dHJpYnV0ZShcImlkXCIpfHxudWxsLHQud2lkdGg9ZS5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKSx0LmhlaWdodD1lLmdldEF0dHJpYnV0ZShcImhlaWdodFwiKSx0LmV4cGFuZGVkV2lkdGg9ZS5nZXRBdHRyaWJ1dGUoXCJleHBhbmRlZFdpZHRoXCIpLHQuZXhwYW5kZWRIZWlnaHQ9ZS5nZXRBdHRyaWJ1dGUoXCJleHBhbmRlZEhlaWdodFwiKSx0LnNjYWxhYmxlPXBhcnNlclV0aWxzLnBhcnNlQm9vbGVhbihlLmdldEF0dHJpYnV0ZShcInNjYWxhYmxlXCIpKSx0Lm1haW50YWluQXNwZWN0UmF0aW89cGFyc2VyVXRpbHMucGFyc2VCb29sZWFuKGUuZ2V0QXR0cmlidXRlKFwibWFpbnRhaW5Bc3BlY3RSYXRpb1wiKSksdC5taW5TdWdnZXN0ZWREdXJhdGlvbj1wYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKGUuZ2V0QXR0cmlidXRlKFwibWluU3VnZ2VzdGVkRHVyYXRpb25cIikpLHQuYXBpRnJhbWV3b3JrPWUuZ2V0QXR0cmlidXRlKFwiYXBpRnJhbWV3b3JrXCIpLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJIVE1MUmVzb3VyY2VcIikuZm9yRWFjaChlPT57dC50eXBlPWUuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHxcInRleHQvaHRtbFwiLHQuaHRtbFJlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiSUZyYW1lUmVzb3VyY2VcIikuZm9yRWFjaChlPT57dC50eXBlPWUuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHwwLHQuaWZyYW1lUmVzb3VyY2U9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJTdGF0aWNSZXNvdXJjZVwiKS5mb3JFYWNoKGU9Pnt0LnR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fDAsdC5zdGF0aWNSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSk7Y29uc3QgaT1wYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiQWRQYXJhbWV0ZXJzXCIpO2kmJih0LmFkUGFyYW1ldGVycz1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpKSx0Lm5vbmxpbmVhckNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIk5vbkxpbmVhckNsaWNrVGhyb3VnaFwiKSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIk5vbkxpbmVhckNsaWNrVHJhY2tpbmdcIikuZm9yRWFjaChlPT57dC5ub25saW5lYXJDbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLnB1c2gocGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKSl9KSxyLnZhcmlhdGlvbnMucHVzaCh0KX0pLHJ9ZnVuY3Rpb24gcGFyc2VBZChlKXtjb25zdCB0PWUuY2hpbGROb2Rlcztmb3IobGV0IHIgaW4gdCl7Y29uc3QgaT10W3JdO2lmKC0xIT09W1wiV3JhcHBlclwiLFwiSW5MaW5lXCJdLmluZGV4T2YoaS5ub2RlTmFtZSkpe2lmKHBhcnNlclV0aWxzLmNvcHlOb2RlQXR0cmlidXRlKFwiaWRcIixlLGkpLHBhcnNlclV0aWxzLmNvcHlOb2RlQXR0cmlidXRlKFwic2VxdWVuY2VcIixlLGkpLFwiV3JhcHBlclwiPT09aS5ub2RlTmFtZSlyZXR1cm4gcGFyc2VXcmFwcGVyKGkpO2lmKFwiSW5MaW5lXCI9PT1pLm5vZGVOYW1lKXJldHVybiBwYXJzZUluTGluZShpKX19fWZ1bmN0aW9uIHBhcnNlSW5MaW5lKGUpe2NvbnN0IHQ9ZS5jaGlsZE5vZGVzLHI9bmV3IEFkO3IuaWQ9ZS5nZXRBdHRyaWJ1dGUoXCJpZFwiKXx8bnVsbCxyLnNlcXVlbmNlPWUuZ2V0QXR0cmlidXRlKFwic2VxdWVuY2VcIil8fG51bGw7Zm9yKGxldCBlIGluIHQpe2NvbnN0IGk9dFtlXTtzd2l0Y2goaS5ub2RlTmFtZSl7Y2FzZVwiRXJyb3JcIjpyLmVycm9yVVJMVGVtcGxhdGVzLnB1c2gocGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKSk7YnJlYWs7Y2FzZVwiSW1wcmVzc2lvblwiOnIuaW1wcmVzc2lvblVSTFRlbXBsYXRlcy5wdXNoKHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaSkpO2JyZWFrO2Nhc2VcIkNyZWF0aXZlc1wiOnBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGksXCJDcmVhdGl2ZVwiKS5mb3JFYWNoKGU9Pntjb25zdCB0PXtpZDplLmdldEF0dHJpYnV0ZShcImlkXCIpfHxudWxsLGFkSWQ6cGFyc2VDcmVhdGl2ZUFkSWRBdHRyaWJ1dGUoZSksc2VxdWVuY2U6ZS5nZXRBdHRyaWJ1dGUoXCJzZXF1ZW5jZVwiKXx8bnVsbCxhcGlGcmFtZXdvcms6ZS5nZXRBdHRyaWJ1dGUoXCJhcGlGcmFtZXdvcmtcIil8fG51bGx9O2ZvcihsZXQgaSBpbiBlLmNoaWxkTm9kZXMpe2NvbnN0IHM9ZS5jaGlsZE5vZGVzW2ldO3N3aXRjaChzLm5vZGVOYW1lKXtjYXNlXCJMaW5lYXJcIjpsZXQgZT1wYXJzZUNyZWF0aXZlTGluZWFyKHMsdCk7ZSYmci5jcmVhdGl2ZXMucHVzaChlKTticmVhaztjYXNlXCJOb25MaW5lYXJBZHNcIjpsZXQgaT1wYXJzZUNyZWF0aXZlTm9uTGluZWFyKHMsdCk7aSYmci5jcmVhdGl2ZXMucHVzaChpKTticmVhaztjYXNlXCJDb21wYW5pb25BZHNcIjpsZXQgbj1wYXJzZUNyZWF0aXZlQ29tcGFuaW9uKHMsdCk7biYmci5jcmVhdGl2ZXMucHVzaChuKX19fSk7YnJlYWs7Y2FzZVwiRXh0ZW5zaW9uc1wiOnBhcnNlRXh0ZW5zaW9ucyhyLmV4dGVuc2lvbnMscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoaSxcIkV4dGVuc2lvblwiKSk7YnJlYWs7Y2FzZVwiQWRTeXN0ZW1cIjpyLnN5c3RlbT17dmFsdWU6cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKSx2ZXJzaW9uOmkuZ2V0QXR0cmlidXRlKFwidmVyc2lvblwiKXx8bnVsbH07YnJlYWs7Y2FzZVwiQWRUaXRsZVwiOnIudGl0bGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKTticmVhaztjYXNlXCJEZXNjcmlwdGlvblwiOnIuZGVzY3JpcHRpb249cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKTticmVhaztjYXNlXCJBZHZlcnRpc2VyXCI6ci5hZHZlcnRpc2VyPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaSk7YnJlYWs7Y2FzZVwiUHJpY2luZ1wiOnIucHJpY2luZz17dmFsdWU6cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKSxtb2RlbDppLmdldEF0dHJpYnV0ZShcIm1vZGVsXCIpfHxudWxsLGN1cnJlbmN5OmkuZ2V0QXR0cmlidXRlKFwiY3VycmVuY3lcIil8fG51bGx9O2JyZWFrO2Nhc2VcIlN1cnZleVwiOnIuc3VydmV5PXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaSl9fXJldHVybiByfWZ1bmN0aW9uIHBhcnNlV3JhcHBlcihlKXtjb25zdCB0PXBhcnNlSW5MaW5lKGUpO2xldCByPXBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJWQVNUQWRUYWdVUklcIik7aWYocj90Lm5leHRXcmFwcGVyVVJMPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocik6KHI9cGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIlZBU1RBZFRhZ1VSTFwiKSkmJih0Lm5leHRXcmFwcGVyVVJMPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUocixcIlVSTFwiKSkpLHQuY3JlYXRpdmVzLmZvckVhY2goZT0+e2lmKC0xIT09W1wibGluZWFyXCIsXCJub25saW5lYXJcIl0uaW5kZXhPZihlLnR5cGUpKXtpZihlLnRyYWNraW5nRXZlbnRzKXt0LnRyYWNraW5nRXZlbnRzfHwodC50cmFja2luZ0V2ZW50cz17fSksdC50cmFja2luZ0V2ZW50c1tlLnR5cGVdfHwodC50cmFja2luZ0V2ZW50c1tlLnR5cGVdPXt9KTtmb3IobGV0IHIgaW4gZS50cmFja2luZ0V2ZW50cyl7Y29uc3QgaT1lLnRyYWNraW5nRXZlbnRzW3JdO3QudHJhY2tpbmdFdmVudHNbZS50eXBlXVtyXXx8KHQudHJhY2tpbmdFdmVudHNbZS50eXBlXVtyXT1bXSksaS5mb3JFYWNoKGk9Pnt0LnRyYWNraW5nRXZlbnRzW2UudHlwZV1bcl0ucHVzaChpKX0pfX1lLnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyYmKHQudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzfHwodC52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9W10pLGUudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLmZvckVhY2goZT0+e3QudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLnB1c2goZSl9KSksZS52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlJiYodC52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPWUudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSksZS52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzJiYodC52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzfHwodC52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzPVtdKSxlLnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMuZm9yRWFjaChlPT57dC52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzLnB1c2goZSl9KSl9fSksdC5uZXh0V3JhcHBlclVSTClyZXR1cm4gdH1mdW5jdGlvbiBwYXJzZUV4dGVuc2lvbnMoZSx0KXt0LmZvckVhY2godD0+e2NvbnN0IHI9bmV3IEFkRXh0ZW5zaW9uLGk9dC5hdHRyaWJ1dGVzLHM9dC5jaGlsZE5vZGVzO2lmKHQuYXR0cmlidXRlcylmb3IobGV0IGUgaW4gaSl7Y29uc3QgdD1pW2VdO3Qubm9kZU5hbWUmJnQubm9kZVZhbHVlJiYoci5hdHRyaWJ1dGVzW3Qubm9kZU5hbWVdPXQubm9kZVZhbHVlKX1mb3IobGV0IGUgaW4gcyl7Y29uc3QgdD1zW2VdLGk9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dCh0KTtpZihcIiNjb21tZW50XCIhPT10Lm5vZGVOYW1lJiZcIlwiIT09aSl7Y29uc3QgZT1uZXcgQWRFeHRlbnNpb25DaGlsZDtpZihlLm5hbWU9dC5ub2RlTmFtZSxlLnZhbHVlPWksdC5hdHRyaWJ1dGVzKXtjb25zdCByPXQuYXR0cmlidXRlcztmb3IobGV0IHQgaW4gcil7Y29uc3QgaT1yW3RdO2UuYXR0cmlidXRlc1tpLm5vZGVOYW1lXT1pLm5vZGVWYWx1ZX19ci5jaGlsZHJlbi5wdXNoKGUpfX1lLnB1c2gocil9KX1mdW5jdGlvbiBwYXJzZUNyZWF0aXZlQWRJZEF0dHJpYnV0ZShlKXtyZXR1cm4gZS5nZXRBdHRyaWJ1dGUoXCJBZElEXCIpfHxlLmdldEF0dHJpYnV0ZShcImFkSURcIil8fGUuZ2V0QXR0cmlidXRlKFwiYWRJZFwiKXx8bnVsbH12YXIgZG9tYWluO2Z1bmN0aW9uIEV2ZW50SGFuZGxlcnMoKXt9ZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCl7RXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKX1mdW5jdGlvbiAkZ2V0TWF4TGlzdGVuZXJzKGUpe3JldHVybiB2b2lkIDA9PT1lLl9tYXhMaXN0ZW5lcnM/RXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM6ZS5fbWF4TGlzdGVuZXJzfWZ1bmN0aW9uIGVtaXROb25lKGUsdCxyKXtpZih0KWUuY2FsbChyKTtlbHNlIGZvcih2YXIgaT1lLmxlbmd0aCxzPWFycmF5Q2xvbmUoZSxpKSxuPTA7bjxpOysrbilzW25dLmNhbGwocil9ZnVuY3Rpb24gZW1pdE9uZShlLHQscixpKXtpZih0KWUuY2FsbChyLGkpO2Vsc2UgZm9yKHZhciBzPWUubGVuZ3RoLG49YXJyYXlDbG9uZShlLHMpLGE9MDthPHM7KythKW5bYV0uY2FsbChyLGkpfWZ1bmN0aW9uIGVtaXRUd28oZSx0LHIsaSxzKXtpZih0KWUuY2FsbChyLGkscyk7ZWxzZSBmb3IodmFyIG49ZS5sZW5ndGgsYT1hcnJheUNsb25lKGUsbiksbz0wO288bjsrK28pYVtvXS5jYWxsKHIsaSxzKX1mdW5jdGlvbiBlbWl0VGhyZWUoZSx0LHIsaSxzLG4pe2lmKHQpZS5jYWxsKHIsaSxzLG4pO2Vsc2UgZm9yKHZhciBhPWUubGVuZ3RoLG89YXJyYXlDbG9uZShlLGEpLGw9MDtsPGE7KytsKW9bbF0uY2FsbChyLGkscyxuKX1mdW5jdGlvbiBlbWl0TWFueShlLHQscixpKXtpZih0KWUuYXBwbHkocixpKTtlbHNlIGZvcih2YXIgcz1lLmxlbmd0aCxuPWFycmF5Q2xvbmUoZSxzKSxhPTA7YTxzOysrYSluW2FdLmFwcGx5KHIsaSl9ZnVuY3Rpb24gX2FkZExpc3RlbmVyKGUsdCxyLGkpe3ZhciBzLG4sYTtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiByKXRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtpZigobj1lLl9ldmVudHMpPyhuLm5ld0xpc3RlbmVyJiYoZS5lbWl0KFwibmV3TGlzdGVuZXJcIix0LHIubGlzdGVuZXI/ci5saXN0ZW5lcjpyKSxuPWUuX2V2ZW50cyksYT1uW3RdKToobj1lLl9ldmVudHM9bmV3IEV2ZW50SGFuZGxlcnMsZS5fZXZlbnRzQ291bnQ9MCksYSl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgYT9hPW5bdF09aT9bcixhXTpbYSxyXTppP2EudW5zaGlmdChyKTphLnB1c2gociksIWEud2FybmVkJiYocz0kZ2V0TWF4TGlzdGVuZXJzKGUpKSYmcz4wJiZhLmxlbmd0aD5zKXthLndhcm5lZD0hMDt2YXIgbz1uZXcgRXJyb3IoXCJQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuIFwiK2EubGVuZ3RoK1wiIFwiK3QrXCIgbGlzdGVuZXJzIGFkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdFwiKTtvLm5hbWU9XCJNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmdcIixvLmVtaXR0ZXI9ZSxvLnR5cGU9dCxvLmNvdW50PWEubGVuZ3RoLGVtaXRXYXJuaW5nKG8pfX1lbHNlIGE9blt0XT1yLCsrZS5fZXZlbnRzQ291bnQ7cmV0dXJuIGV9ZnVuY3Rpb24gZW1pdFdhcm5pbmcoZSl7XCJmdW5jdGlvblwiPT10eXBlb2YgY29uc29sZS53YXJuP2NvbnNvbGUud2FybihlKTpjb25zb2xlLmxvZyhlKX1mdW5jdGlvbiBfb25jZVdyYXAoZSx0LHIpe3ZhciBpPSExO2Z1bmN0aW9uIHMoKXtlLnJlbW92ZUxpc3RlbmVyKHQscyksaXx8KGk9ITAsci5hcHBseShlLGFyZ3VtZW50cykpfXJldHVybiBzLmxpc3RlbmVyPXIsc31mdW5jdGlvbiBsaXN0ZW5lckNvdW50KGUpe3ZhciB0PXRoaXMuX2V2ZW50cztpZih0KXt2YXIgcj10W2VdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHIpcmV0dXJuIDE7aWYocilyZXR1cm4gci5sZW5ndGh9cmV0dXJuIDB9ZnVuY3Rpb24gc3BsaWNlT25lKGUsdCl7Zm9yKHZhciByPXQsaT1yKzEscz1lLmxlbmd0aDtpPHM7cis9MSxpKz0xKWVbcl09ZVtpXTtlLnBvcCgpfWZ1bmN0aW9uIGFycmF5Q2xvbmUoZSx0KXtmb3IodmFyIHI9bmV3IEFycmF5KHQpO3QtLTspclt0XT1lW3RdO3JldHVybiByfWZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhlKXtmb3IodmFyIHQ9bmV3IEFycmF5KGUubGVuZ3RoKSxyPTA7cjx0Lmxlbmd0aDsrK3IpdFtyXT1lW3JdLmxpc3RlbmVyfHxlW3JdO3JldHVybiB0fWZ1bmN0aW9uIHhkcigpe2xldCBlO3JldHVybiB3aW5kb3cuWERvbWFpblJlcXVlc3QmJihlPW5ldyBYRG9tYWluUmVxdWVzdCksZX1mdW5jdGlvbiBzdXBwb3J0ZWQoKXtyZXR1cm4hIXhkcigpfWZ1bmN0aW9uIGdldChlLHQscil7bGV0IGk9XCJmdW5jdGlvblwiPT10eXBlb2Ygd2luZG93LkFjdGl2ZVhPYmplY3Q/bmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTERPTVwiKTp2b2lkIDA7aWYoIWkpcmV0dXJuIHIobmV3IEVycm9yKFwiRmxhc2hVUkxIYW5kbGVyOiBNaWNyb3NvZnQuWE1MRE9NIGZvcm1hdCBub3Qgc3VwcG9ydGVkXCIpKTtpLmFzeW5jPSExLHJlcXVlc3Qub3BlbihcIkdFVFwiLGUpLHJlcXVlc3QudGltZW91dD10LnRpbWVvdXR8fDAscmVxdWVzdC53aXRoQ3JlZGVudGlhbHM9dC53aXRoQ3JlZGVudGlhbHN8fCExLHJlcXVlc3Quc2VuZCgpLHJlcXVlc3Qub25wcm9ncmVzcz1mdW5jdGlvbigpe30scmVxdWVzdC5vbmxvYWQ9ZnVuY3Rpb24oKXtpLmxvYWRYTUwocmVxdWVzdC5yZXNwb25zZVRleHQpLHIobnVsbCxpKX19RXZlbnRIYW5kbGVycy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShudWxsKSxFdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyPUV2ZW50RW1pdHRlcixFdmVudEVtaXR0ZXIudXNpbmdEb21haW5zPSExLEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZG9tYWluPXZvaWQgMCxFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHM9dm9pZCAwLEV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycz12b2lkIDAsRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM9MTAsRXZlbnRFbWl0dGVyLmluaXQ9ZnVuY3Rpb24oKXt0aGlzLmRvbWFpbj1udWxsLEV2ZW50RW1pdHRlci51c2luZ0RvbWFpbnMmJighZG9tYWluLmFjdGl2ZXx8dGhpcyBpbnN0YW5jZW9mIGRvbWFpbi5Eb21haW58fCh0aGlzLmRvbWFpbj1kb21haW4uYWN0aXZlKSksdGhpcy5fZXZlbnRzJiZ0aGlzLl9ldmVudHMhPT1PYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50c3x8KHRoaXMuX2V2ZW50cz1uZXcgRXZlbnRIYW5kbGVycyx0aGlzLl9ldmVudHNDb3VudD0wKSx0aGlzLl9tYXhMaXN0ZW5lcnM9dGhpcy5fbWF4TGlzdGVuZXJzfHx2b2lkIDB9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzPWZ1bmN0aW9uKGUpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlfHxlPDB8fGlzTmFOKGUpKXRocm93IG5ldyBUeXBlRXJyb3IoJ1wiblwiIGFyZ3VtZW50IG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtyZXR1cm4gdGhpcy5fbWF4TGlzdGVuZXJzPWUsdGhpc30sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24oKXtyZXR1cm4gJGdldE1heExpc3RlbmVycyh0aGlzKX0sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKGUpe3ZhciB0LHIsaSxzLG4sYSxvLGw9XCJlcnJvclwiPT09ZTtpZihhPXRoaXMuX2V2ZW50cylsPWwmJm51bGw9PWEuZXJyb3I7ZWxzZSBpZighbClyZXR1cm4hMTtpZihvPXRoaXMuZG9tYWluLGwpe2lmKHQ9YXJndW1lbnRzWzFdLCFvKXtpZih0IGluc3RhbmNlb2YgRXJyb3IpdGhyb3cgdDt2YXIgYz1uZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnK3QrXCIpXCIpO3Rocm93IGMuY29udGV4dD10LGN9cmV0dXJuIHR8fCh0PW5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudCcpKSx0LmRvbWFpbkVtaXR0ZXI9dGhpcyx0LmRvbWFpbj1vLHQuZG9tYWluVGhyb3duPSExLG8uZW1pdChcImVycm9yXCIsdCksITF9aWYoIShyPWFbZV0pKXJldHVybiExO3ZhciBwPVwiZnVuY3Rpb25cIj09dHlwZW9mIHI7c3dpdGNoKGk9YXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAxOmVtaXROb25lKHIscCx0aGlzKTticmVhaztjYXNlIDI6ZW1pdE9uZShyLHAsdGhpcyxhcmd1bWVudHNbMV0pO2JyZWFrO2Nhc2UgMzplbWl0VHdvKHIscCx0aGlzLGFyZ3VtZW50c1sxXSxhcmd1bWVudHNbMl0pO2JyZWFrO2Nhc2UgNDplbWl0VGhyZWUocixwLHRoaXMsYXJndW1lbnRzWzFdLGFyZ3VtZW50c1syXSxhcmd1bWVudHNbM10pO2JyZWFrO2RlZmF1bHQ6Zm9yKHM9bmV3IEFycmF5KGktMSksbj0xO248aTtuKyspc1tuLTFdPWFyZ3VtZW50c1tuXTtlbWl0TWFueShyLHAsdGhpcyxzKX1yZXR1cm4hMH0sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3JldHVybiBfYWRkTGlzdGVuZXIodGhpcyxlLHQsITEpfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uPUV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIsRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsZSx0LCEwKX0sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlPWZ1bmN0aW9uKGUsdCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCl0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7cmV0dXJuIHRoaXMub24oZSxfb25jZVdyYXAodGhpcyxlLHQpKSx0aGlzfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtyZXR1cm4gdGhpcy5wcmVwZW5kTGlzdGVuZXIoZSxfb25jZVdyYXAodGhpcyxlLHQpKSx0aGlzfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7dmFyIHIsaSxzLG4sYTtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtpZighKGk9dGhpcy5fZXZlbnRzKSlyZXR1cm4gdGhpcztpZighKHI9aVtlXSkpcmV0dXJuIHRoaXM7aWYocj09PXR8fHIubGlzdGVuZXImJnIubGlzdGVuZXI9PT10KTA9PS0tdGhpcy5fZXZlbnRzQ291bnQ/dGhpcy5fZXZlbnRzPW5ldyBFdmVudEhhbmRsZXJzOihkZWxldGUgaVtlXSxpLnJlbW92ZUxpc3RlbmVyJiZ0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLGUsci5saXN0ZW5lcnx8dCkpO2Vsc2UgaWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygcil7Zm9yKHM9LTEsbj1yLmxlbmd0aDtuLS0gPjA7KWlmKHJbbl09PT10fHxyW25dLmxpc3RlbmVyJiZyW25dLmxpc3RlbmVyPT09dCl7YT1yW25dLmxpc3RlbmVyLHM9bjticmVha31pZihzPDApcmV0dXJuIHRoaXM7aWYoMT09PXIubGVuZ3RoKXtpZihyWzBdPXZvaWQgMCwwPT0tLXRoaXMuX2V2ZW50c0NvdW50KXJldHVybiB0aGlzLl9ldmVudHM9bmV3IEV2ZW50SGFuZGxlcnMsdGhpcztkZWxldGUgaVtlXX1lbHNlIHNwbGljZU9uZShyLHMpO2kucmVtb3ZlTGlzdGVuZXImJnRoaXMuZW1pdChcInJlbW92ZUxpc3RlbmVyXCIsZSxhfHx0KX1yZXR1cm4gdGhpc30sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnM9ZnVuY3Rpb24oZSl7dmFyIHQscjtpZighKHI9dGhpcy5fZXZlbnRzKSlyZXR1cm4gdGhpcztpZighci5yZW1vdmVMaXN0ZW5lcilyZXR1cm4gMD09PWFyZ3VtZW50cy5sZW5ndGg/KHRoaXMuX2V2ZW50cz1uZXcgRXZlbnRIYW5kbGVycyx0aGlzLl9ldmVudHNDb3VudD0wKTpyW2VdJiYoMD09LS10aGlzLl9ldmVudHNDb3VudD90aGlzLl9ldmVudHM9bmV3IEV2ZW50SGFuZGxlcnM6ZGVsZXRlIHJbZV0pLHRoaXM7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpe2Zvcih2YXIgaSxzPU9iamVjdC5rZXlzKHIpLG49MDtuPHMubGVuZ3RoOysrbilcInJlbW92ZUxpc3RlbmVyXCIhPT0oaT1zW25dKSYmdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoaSk7cmV0dXJuIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKFwicmVtb3ZlTGlzdGVuZXJcIiksdGhpcy5fZXZlbnRzPW5ldyBFdmVudEhhbmRsZXJzLHRoaXMuX2V2ZW50c0NvdW50PTAsdGhpc31pZihcImZ1bmN0aW9uXCI9PXR5cGVvZih0PXJbZV0pKXRoaXMucmVtb3ZlTGlzdGVuZXIoZSx0KTtlbHNlIGlmKHQpZG97dGhpcy5yZW1vdmVMaXN0ZW5lcihlLHRbdC5sZW5ndGgtMV0pfXdoaWxlKHRbMF0pO3JldHVybiB0aGlzfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycz1mdW5jdGlvbihlKXt2YXIgdCxyPXRoaXMuX2V2ZW50cztyZXR1cm4gciYmKHQ9cltlXSk/XCJmdW5jdGlvblwiPT10eXBlb2YgdD9bdC5saXN0ZW5lcnx8dF06dW53cmFwTGlzdGVuZXJzKHQpOltdfSxFdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudD1mdW5jdGlvbihlLHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGUubGlzdGVuZXJDb3VudD9lLmxpc3RlbmVyQ291bnQodCk6bGlzdGVuZXJDb3VudC5jYWxsKGUsdCl9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudD1saXN0ZW5lckNvdW50LEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcz1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9ldmVudHNDb3VudD4wP1JlZmxlY3Qub3duS2V5cyh0aGlzLl9ldmVudHMpOltdfTtjb25zdCBmbGFzaFVSTEhhbmRsZXI9e2dldDpnZXQsc3VwcG9ydGVkOnN1cHBvcnRlZH07ZnVuY3Rpb24gZ2V0JDEoZSx0LHIpe3IobmV3IEVycm9yKFwiUGxlYXNlIGJ1bmRsZSB0aGUgbGlicmFyeSBmb3Igbm9kZSB0byB1c2UgdGhlIG5vZGUgdXJsSGFuZGxlclwiKSl9Y29uc3Qgbm9kZVVSTEhhbmRsZXI9e2dldDpnZXQkMX07ZnVuY3Rpb24geGhyKCl7dHJ5e2NvbnN0IGU9bmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdDtyZXR1cm5cIndpdGhDcmVkZW50aWFsc1wiaW4gZT9lOm51bGx9Y2F0Y2goZSl7cmV0dXJuIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gWEhSVVJMSGFuZGxlciBzdXBwb3J0IGNoZWNrOlwiLGUpLG51bGx9fWZ1bmN0aW9uIHN1cHBvcnRlZCQxKCl7cmV0dXJuISF4aHIoKX1mdW5jdGlvbiBnZXQkMihlLHQscil7aWYoXCJodHRwczpcIj09PXdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCYmMD09PWUuaW5kZXhPZihcImh0dHA6Ly9cIikpcmV0dXJuIHIobmV3IEVycm9yKFwiWEhSVVJMSGFuZGxlcjogQ2Fubm90IGdvIGZyb20gSFRUUFMgdG8gSFRUUC5cIikpO3RyeXtjb25zdCBpPXhocigpO2kub3BlbihcIkdFVFwiLGUpLGkudGltZW91dD10LnRpbWVvdXR8fDAsaS53aXRoQ3JlZGVudGlhbHM9dC53aXRoQ3JlZGVudGlhbHN8fCExLGkub3ZlcnJpZGVNaW1lVHlwZSYmaS5vdmVycmlkZU1pbWVUeXBlKFwidGV4dC94bWxcIiksaS5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXs0PT09aS5yZWFkeVN0YXRlJiYoMjAwPT09aS5zdGF0dXM/cihudWxsLGkucmVzcG9uc2VYTUwpOnIobmV3IEVycm9yKGBYSFJVUkxIYW5kbGVyOiAke2kuc3RhdHVzVGV4dH1gKSkpfSxpLnNlbmQoKX1jYXRjaChlKXtyKG5ldyBFcnJvcihcIlhIUlVSTEhhbmRsZXI6IFVuZXhwZWN0ZWQgZXJyb3JcIikpfX1jb25zdCBYSFJVUkxIYW5kbGVyPXtnZXQ6Z2V0JDIsc3VwcG9ydGVkOnN1cHBvcnRlZCQxfTtmdW5jdGlvbiBnZXQkMyhlLHQscil7cmV0dXJuIHJ8fChcImZ1bmN0aW9uXCI9PXR5cGVvZiB0JiYocj10KSx0PXt9KSxcInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93fHxudWxsPT09d2luZG93P25vZGVVUkxIYW5kbGVyLmdldChlLHQscik6WEhSVVJMSGFuZGxlci5zdXBwb3J0ZWQoKT9YSFJVUkxIYW5kbGVyLmdldChlLHQscik6Zmxhc2hVUkxIYW5kbGVyLnN1cHBvcnRlZCgpP2ZsYXNoVVJMSGFuZGxlci5nZXQoZSx0LHIpOnIobmV3IEVycm9yKFwiQ3VycmVudCBjb250ZXh0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgYW55IG9mIHRoZSBkZWZhdWx0IFVSTEhhbmRsZXJzLiBQbGVhc2UgcHJvdmlkZSBhIGN1c3RvbSBVUkxIYW5kbGVyXCIpKX1jb25zdCB1cmxIYW5kbGVyPXtnZXQ6Z2V0JDN9O2NsYXNzIFZBU1RSZXNwb25zZXtjb25zdHJ1Y3Rvcigpe3RoaXMuYWRzPVtdLHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXM9W119fWNvbnN0IERFRkFVTFRfTUFYX1dSQVBQRVJfREVQVEg9MTAsREVGQVVMVF9FVkVOVF9EQVRBPXtFUlJPUkNPREU6OTAwLGV4dGVuc2lvbnM6W119O2NsYXNzIFZBU1RQYXJzZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXJ7Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMucmVtYWluaW5nQWRzPVtdLHRoaXMucGFyZW50VVJMcz1bXSx0aGlzLmVycm9yVVJMVGVtcGxhdGVzPVtdLHRoaXMucm9vdEVycm9yVVJMVGVtcGxhdGVzPVtdLHRoaXMubWF4V3JhcHBlckRlcHRoPW51bGwsdGhpcy5VUkxUZW1wbGF0ZUZpbHRlcnM9W10sdGhpcy5mZXRjaGluZ09wdGlvbnM9e319YWRkVVJMVGVtcGxhdGVGaWx0ZXIoZSl7XCJmdW5jdGlvblwiPT10eXBlb2YgZSYmdGhpcy5VUkxUZW1wbGF0ZUZpbHRlcnMucHVzaChlKX1yZW1vdmVVUkxUZW1wbGF0ZUZpbHRlcigpe3RoaXMuVVJMVGVtcGxhdGVGaWx0ZXJzLnBvcCgpfWNvdW50VVJMVGVtcGxhdGVGaWx0ZXJzKCl7cmV0dXJuIHRoaXMuVVJMVGVtcGxhdGVGaWx0ZXJzLmxlbmd0aH1jbGVhclVSTFRlbXBsYXRlRmlsdGVycygpe3RoaXMuVVJMVGVtcGxhdGVGaWx0ZXJzPVtdfXRyYWNrVmFzdEVycm9yKGUsdCwuLi5yKXt0aGlzLmVtaXQoXCJWQVNULWVycm9yXCIsT2JqZWN0LmFzc2lnbihERUZBVUxUX0VWRU5UX0RBVEEsdCwuLi5yKSksdXRpbC50cmFjayhlLHQpfWdldEVycm9yVVJMVGVtcGxhdGVzKCl7cmV0dXJuIHRoaXMucm9vdEVycm9yVVJMVGVtcGxhdGVzLmNvbmNhdCh0aGlzLmVycm9yVVJMVGVtcGxhdGVzKX1mZXRjaFZBU1QoZSx0LHIpe3JldHVybiBuZXcgUHJvbWlzZSgoaSxzKT0+e3RoaXMuVVJMVGVtcGxhdGVGaWx0ZXJzLmZvckVhY2godD0+e2U9dChlKX0pLHRoaXMucGFyZW50VVJMcy5wdXNoKGUpLHRoaXMuZW1pdChcIlZBU1QtcmVzb2x2aW5nXCIse3VybDplLHdyYXBwZXJEZXB0aDp0LG9yaWdpbmFsVXJsOnJ9KSx0aGlzLnVybEhhbmRsZXIuZ2V0KGUsdGhpcy5mZXRjaGluZ09wdGlvbnMsKHQscik9Pnt0aGlzLmVtaXQoXCJWQVNULXJlc29sdmVkXCIse3VybDplLGVycm9yOnR9KSx0P3ModCk6aShyKX0pfSl9aW5pdFBhcnNpbmdTdGF0dXMoZT17fSl7dGhpcy5yb290VVJMPVwiXCIsdGhpcy5yZW1haW5pbmdBZHM9W10sdGhpcy5wYXJlbnRVUkxzPVtdLHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXM9W10sdGhpcy5yb290RXJyb3JVUkxUZW1wbGF0ZXM9W10sdGhpcy5tYXhXcmFwcGVyRGVwdGg9ZS53cmFwcGVyTGltaXR8fERFRkFVTFRfTUFYX1dSQVBQRVJfREVQVEgsdGhpcy5mZXRjaGluZ09wdGlvbnM9e3RpbWVvdXQ6ZS50aW1lb3V0LHdpdGhDcmVkZW50aWFsczplLndpdGhDcmVkZW50aWFsc30sdGhpcy51cmxIYW5kbGVyPWUudXJsaGFuZGxlcnx8dXJsSGFuZGxlcn1nZXRSZW1haW5pbmdBZHMoZSl7aWYoMD09PXRoaXMucmVtYWluaW5nQWRzLmxlbmd0aClyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gbW9yZSBhZHMgYXJlIGF2YWlsYWJsZSBmb3IgdGhlIGdpdmVuIFZBU1RcIikpO2NvbnN0IHQ9ZT91dGlsLmZsYXR0ZW4odGhpcy5yZW1haW5pbmdBZHMpOnRoaXMucmVtYWluaW5nQWRzLnNoaWZ0KCk7cmV0dXJuIHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXM9W10sdGhpcy5wYXJlbnRVUkxzPVtdLHRoaXMucmVzb2x2ZUFkcyh0LHt3cmFwcGVyRGVwdGg6MCxvcmlnaW5hbFVybDp0aGlzLnJvb3RVUkx9KS50aGVuKGU9PnRoaXMuYnVpbGRWQVNUUmVzcG9uc2UoZSkpfWdldEFuZFBhcnNlVkFTVChlLHQ9e30pe3JldHVybiB0aGlzLmluaXRQYXJzaW5nU3RhdHVzKHQpLHRoaXMucm9vdFVSTD1lLHRoaXMuZmV0Y2hWQVNUKGUpLnRoZW4ocj0+KHQub3JpZ2luYWxVcmw9ZSx0LmlzUm9vdFZBU1Q9ITAsdGhpcy5wYXJzZShyLHQpLnRoZW4oZT0+dGhpcy5idWlsZFZBU1RSZXNwb25zZShlKSkpKX1wYXJzZVZBU1QoZSx0PXt9KXtyZXR1cm4gdGhpcy5pbml0UGFyc2luZ1N0YXR1cyh0KSx0LmlzUm9vdFZBU1Q9ITAsdGhpcy5wYXJzZShlLHQpLnRoZW4oZT0+dGhpcy5idWlsZFZBU1RSZXNwb25zZShlKSl9YnVpbGRWQVNUUmVzcG9uc2UoZSl7Y29uc3QgdD1uZXcgVkFTVFJlc3BvbnNlO3JldHVybiB0LmFkcz1lLHQuZXJyb3JVUkxUZW1wbGF0ZXM9dGhpcy5nZXRFcnJvclVSTFRlbXBsYXRlcygpLHRoaXMuY29tcGxldGVXcmFwcGVyUmVzb2x2aW5nKHQpLHR9cGFyc2UoZSx7cmVzb2x2ZUFsbDp0PSEwLHdyYXBwZXJTZXF1ZW5jZTpyPW51bGwsb3JpZ2luYWxVcmw6aT1udWxsLHdyYXBwZXJEZXB0aDpzPTAsaXNSb290VkFTVDpuPSExfSl7aWYoIWV8fCFlLmRvY3VtZW50RWxlbWVudHx8XCJWQVNUXCIhPT1lLmRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSlyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBWQVNUIFhNTERvY3VtZW50XCIpKTtsZXQgYT1bXTtjb25zdCBvPWUuZG9jdW1lbnRFbGVtZW50LmNoaWxkTm9kZXM7Zm9yKGxldCBlIGluIG8pe2NvbnN0IHQ9b1tlXTtpZihcIkVycm9yXCI9PT10Lm5vZGVOYW1lKXtjb25zdCBlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQodCk7bj90aGlzLnJvb3RFcnJvclVSTFRlbXBsYXRlcy5wdXNoKGUpOnRoaXMuZXJyb3JVUkxUZW1wbGF0ZXMucHVzaChlKX1pZihcIkFkXCI9PT10Lm5vZGVOYW1lKXtjb25zdCBlPXBhcnNlQWQodCk7ZT9hLnB1c2goZSk6dGhpcy50cmFja1Zhc3RFcnJvcih0aGlzLmdldEVycm9yVVJMVGVtcGxhdGVzKCkse0VSUk9SQ09ERToxMDF9KX19Y29uc3QgbD1hLmxlbmd0aCxjPWFbbC0xXTtyZXR1cm4gMT09PWwmJnZvaWQgMCE9PXImJm51bGwhPT1yJiZjJiYhYy5zZXF1ZW5jZSYmKGMuc2VxdWVuY2U9ciksITE9PT10JiYodGhpcy5yZW1haW5pbmdBZHM9cGFyc2VyVXRpbHMuc3BsaXRWQVNUKGEpLGE9dGhpcy5yZW1haW5pbmdBZHMuc2hpZnQoKSksdGhpcy5yZXNvbHZlQWRzKGEse3dyYXBwZXJEZXB0aDpzLG9yaWdpbmFsVXJsOml9KX1yZXNvbHZlQWRzKGU9W10se3dyYXBwZXJEZXB0aDp0LG9yaWdpbmFsVXJsOnJ9KXtjb25zdCBpPVtdO3JldHVybiBlLmZvckVhY2goZT0+e2NvbnN0IHM9dGhpcy5yZXNvbHZlV3JhcHBlcnMoZSx0LHIpO2kucHVzaChzKX0pLFByb21pc2UuYWxsKGkpLnRoZW4oZT0+e2NvbnN0IGk9dXRpbC5mbGF0dGVuKGUpO2lmKCFpJiZ0aGlzLnJlbWFpbmluZ0Fkcy5sZW5ndGg+MCl7Y29uc3QgZT10aGlzLnJlbWFpbmluZ0Fkcy5zaGlmdCgpO3JldHVybiB0aGlzLnJlc29sdmVBZHMoZSx7d3JhcHBlckRlcHRoOnQsb3JpZ2luYWxVcmw6cn0pfXJldHVybiBpfSl9cmVzb2x2ZVdyYXBwZXJzKGUsdCxyKXtyZXR1cm4gbmV3IFByb21pc2UoKGkscyk9PntpZih0KyssIWUubmV4dFdyYXBwZXJVUkwpcmV0dXJuIGRlbGV0ZSBlLm5leHRXcmFwcGVyVVJMLGkoZSk7aWYodD49dGhpcy5tYXhXcmFwcGVyRGVwdGh8fC0xIT09dGhpcy5wYXJlbnRVUkxzLmluZGV4T2YoZS5uZXh0V3JhcHBlclVSTCkpcmV0dXJuIGUuZXJyb3JDb2RlPTMwMixkZWxldGUgZS5uZXh0V3JhcHBlclVSTCxpKGUpO2UubmV4dFdyYXBwZXJVUkw9cGFyc2VyVXRpbHMucmVzb2x2ZVZhc3RBZFRhZ1VSSShlLm5leHRXcmFwcGVyVVJMLHIpO2NvbnN0IG49ZS5zZXF1ZW5jZTtyPWUubmV4dFdyYXBwZXJVUkwsdGhpcy5mZXRjaFZBU1QoZS5uZXh0V3JhcHBlclVSTCx0LHIpLnRoZW4ocz0+dGhpcy5wYXJzZShzLHtvcmlnaW5hbFVybDpyLHdyYXBwZXJTZXF1ZW5jZTpuLHdyYXBwZXJEZXB0aDp0fSkudGhlbih0PT57aWYoZGVsZXRlIGUubmV4dFdyYXBwZXJVUkwsMD09PXQubGVuZ3RoKXJldHVybiBlLmNyZWF0aXZlcz1bXSxpKGUpO3QuZm9yRWFjaCh0PT57dCYmcGFyc2VyVXRpbHMubWVyZ2VXcmFwcGVyQWREYXRhKHQsZSl9KSxpKHQpfSkpLmNhdGNoKHQ9PntlLmVycm9yQ29kZT0zMDEsZS5lcnJvck1lc3NhZ2U9dC5tZXNzYWdlLGkoZSl9KX0pfWNvbXBsZXRlV3JhcHBlclJlc29sdmluZyhlKXtpZigwPT09ZS5hZHMubGVuZ3RoKXRoaXMudHJhY2tWYXN0RXJyb3IoZS5lcnJvclVSTFRlbXBsYXRlcyx7RVJST1JDT0RFOjMwM30pO2Vsc2UgZm9yKGxldCB0PWUuYWRzLmxlbmd0aC0xO3Q+PTA7dC0tKXtsZXQgcj1lLmFkc1t0XTsoci5lcnJvckNvZGV8fDA9PT1yLmNyZWF0aXZlcy5sZW5ndGgpJiYodGhpcy50cmFja1Zhc3RFcnJvcihyLmVycm9yVVJMVGVtcGxhdGVzLmNvbmNhdChlLmVycm9yVVJMVGVtcGxhdGVzKSx7RVJST1JDT0RFOnIuZXJyb3JDb2RlfHwzMDN9LHtFUlJPUk1FU1NBR0U6ci5lcnJvck1lc3NhZ2V8fFwiXCJ9LHtleHRlbnNpb25zOnIuZXh0ZW5zaW9uc30se3N5c3RlbTpyLnN5c3RlbX0pLGUuYWRzLnNwbGljZSh0LDEpKX19fWxldCBzdG9yYWdlPW51bGw7Y29uc3QgREVGQVVMVF9TVE9SQUdFPXtkYXRhOnt9LGxlbmd0aDowLGdldEl0ZW0oZSl7cmV0dXJuIHRoaXMuZGF0YVtlXX0sc2V0SXRlbShlLHQpe3RoaXMuZGF0YVtlXT10LHRoaXMubGVuZ3RoPU9iamVjdC5rZXlzKHRoaXMuZGF0YSkubGVuZ3RofSxyZW1vdmVJdGVtKGUpe2RlbGV0ZSBkYXRhW2VdLHRoaXMubGVuZ3RoPU9iamVjdC5rZXlzKHRoaXMuZGF0YSkubGVuZ3RofSxjbGVhcigpe3RoaXMuZGF0YT17fSx0aGlzLmxlbmd0aD0wfX07Y2xhc3MgU3RvcmFnZXtjb25zdHJ1Y3Rvcigpe3RoaXMuc3RvcmFnZT10aGlzLmluaXRTdG9yYWdlKCl9aW5pdFN0b3JhZ2UoKXtpZihzdG9yYWdlKXJldHVybiBzdG9yYWdlO3RyeXtzdG9yYWdlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJm51bGwhPT13aW5kb3c/d2luZG93LmxvY2FsU3RvcmFnZXx8d2luZG93LnNlc3Npb25TdG9yYWdlOm51bGx9Y2F0Y2goZSl7c3RvcmFnZT1udWxsfXJldHVybiBzdG9yYWdlJiYhdGhpcy5pc1N0b3JhZ2VEaXNhYmxlZChzdG9yYWdlKXx8KHN0b3JhZ2U9REVGQVVMVF9TVE9SQUdFKS5jbGVhcigpLHN0b3JhZ2V9aXNTdG9yYWdlRGlzYWJsZWQoZSl7Y29uc3QgdD1cIl9fVkFTVFN0b3JhZ2VfX1wiO3RyeXtpZihlLnNldEl0ZW0odCx0KSxlLmdldEl0ZW0odCkhPT10KXJldHVybiBlLnJlbW92ZUl0ZW0odCksITB9Y2F0Y2goZSl7cmV0dXJuITB9cmV0dXJuIGUucmVtb3ZlSXRlbSh0KSwhMX1nZXRJdGVtKGUpe3JldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShlKX1zZXRJdGVtKGUsdCl7cmV0dXJuIHRoaXMuc3RvcmFnZS5zZXRJdGVtKGUsdCl9cmVtb3ZlSXRlbShlKXtyZXR1cm4gdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0oZSl9Y2xlYXIoKXtyZXR1cm4gdGhpcy5zdG9yYWdlLmNsZWFyKCl9fWNsYXNzIFZBU1RDbGllbnR7Y29uc3RydWN0b3IoZSx0LHIpe3RoaXMuY2FwcGluZ0ZyZWVMdW5jaD1lfHwwLHRoaXMuY2FwcGluZ01pbmltdW1UaW1lSW50ZXJ2YWw9dHx8MCx0aGlzLmRlZmF1bHRPcHRpb25zPXt3aXRoQ3JlZGVudGlhbHM6ITEsdGltZW91dDowfSx0aGlzLnZhc3RQYXJzZXI9bmV3IFZBU1RQYXJzZXIsdGhpcy5zdG9yYWdlPXJ8fG5ldyBTdG9yYWdlLHZvaWQgMD09PXRoaXMubGFzdFN1Y2Nlc3NmdWxBZCYmKHRoaXMubGFzdFN1Y2Nlc3NmdWxBZD0wKSx2b2lkIDA9PT10aGlzLnRvdGFsQ2FsbHMmJih0aGlzLnRvdGFsQ2FsbHM9MCksdm9pZCAwPT09dGhpcy50b3RhbENhbGxzVGltZW91dCYmKHRoaXMudG90YWxDYWxsc1RpbWVvdXQ9MCl9Z2V0UGFyc2VyKCl7cmV0dXJuIHRoaXMudmFzdFBhcnNlcn1nZXQgbGFzdFN1Y2Nlc3NmdWxBZCgpe3JldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShcInZhc3QtY2xpZW50LWxhc3Qtc3VjY2Vzc2Z1bC1hZFwiKX1zZXQgbGFzdFN1Y2Nlc3NmdWxBZChlKXt0aGlzLnN0b3JhZ2Uuc2V0SXRlbShcInZhc3QtY2xpZW50LWxhc3Qtc3VjY2Vzc2Z1bC1hZFwiLGUpfWdldCB0b3RhbENhbGxzKCl7cmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKFwidmFzdC1jbGllbnQtdG90YWwtY2FsbHNcIil9c2V0IHRvdGFsQ2FsbHMoZSl7dGhpcy5zdG9yYWdlLnNldEl0ZW0oXCJ2YXN0LWNsaWVudC10b3RhbC1jYWxsc1wiLGUpfWdldCB0b3RhbENhbGxzVGltZW91dCgpe3JldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShcInZhc3QtY2xpZW50LXRvdGFsLWNhbGxzLXRpbWVvdXRcIil9c2V0IHRvdGFsQ2FsbHNUaW1lb3V0KGUpe3RoaXMuc3RvcmFnZS5zZXRJdGVtKFwidmFzdC1jbGllbnQtdG90YWwtY2FsbHMtdGltZW91dFwiLGUpfWhhc1JlbWFpbmluZ0Fkcygpe3JldHVybiB0aGlzLnZhc3RQYXJzZXIucmVtYWluaW5nQWRzLmxlbmd0aD4wfWdldE5leHRBZHMoZSl7cmV0dXJuIHRoaXMudmFzdFBhcnNlci5nZXRSZW1haW5pbmdBZHMoZSl9Z2V0KGUsdD17fSl7Y29uc3Qgcj1EYXRlLm5vdygpO3JldHVybih0PU9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0T3B0aW9ucyx0KSkuaGFzT3duUHJvcGVydHkoXCJyZXNvbHZlQWxsXCIpfHwodC5yZXNvbHZlQWxsPSExKSx0aGlzLnRvdGFsQ2FsbHNUaW1lb3V0PHI/KHRoaXMudG90YWxDYWxscz0xLHRoaXMudG90YWxDYWxsc1RpbWVvdXQ9ciszNmU1KTp0aGlzLnRvdGFsQ2FsbHMrKyxuZXcgUHJvbWlzZSgoaSxzKT0+e2lmKHRoaXMuY2FwcGluZ0ZyZWVMdW5jaD49dGhpcy50b3RhbENhbGxzKXJldHVybiBzKG5ldyBFcnJvcihgVkFTVCBjYWxsIGNhbmNlbGVkIOKAkyBGcmVlTHVuY2ggY2FwcGluZyBub3QgcmVhY2hlZCB5ZXQgJHt0aGlzLnRvdGFsQ2FsbHN9LyR7dGhpcy5jYXBwaW5nRnJlZUx1bmNofWApKTtjb25zdCBuPXItdGhpcy5sYXN0U3VjY2Vzc2Z1bEFkO2lmKG48MCl0aGlzLmxhc3RTdWNjZXNzZnVsQWQ9MDtlbHNlIGlmKG48dGhpcy5jYXBwaW5nTWluaW11bVRpbWVJbnRlcnZhbClyZXR1cm4gcyhuZXcgRXJyb3IoYFZBU1QgY2FsbCBjYW5jZWxlZCDigJMgKCR7dGhpcy5jYXBwaW5nTWluaW11bVRpbWVJbnRlcnZhbH0pbXMgbWluaW11bSBpbnRlcnZhbCByZWFjaGVkYCkpO3RoaXMudmFzdFBhcnNlci5nZXRBbmRQYXJzZVZBU1QoZSx0KS50aGVuKGU9PmkoZSkpLmNhdGNoKGU9PnMoZSkpfSl9fWNvbnN0IERFRkFVTFRfU0tJUF9ERUxBWT0tMTtjbGFzcyBWQVNUVHJhY2tlciBleHRlbmRzIEV2ZW50RW1pdHRlcntjb25zdHJ1Y3RvcihlLHQscixpPW51bGwpe3N1cGVyKCksdGhpcy5hZD10LHRoaXMuY3JlYXRpdmU9cix0aGlzLnZhcmlhdGlvbj1pLHRoaXMubXV0ZWQ9ITEsdGhpcy5pbXByZXNzZWQ9ITEsdGhpcy5za2lwcGFibGU9ITEsdGhpcy50cmFja2luZ0V2ZW50cz17fSx0aGlzLl9hbHJlYWR5VHJpZ2dlcmVkUXVhcnRpbGVzPXt9LHRoaXMuZW1pdEFsd2F5c0V2ZW50cz1bXCJjcmVhdGl2ZVZpZXdcIixcInN0YXJ0XCIsXCJmaXJzdFF1YXJ0aWxlXCIsXCJtaWRwb2ludFwiLFwidGhpcmRRdWFydGlsZVwiLFwiY29tcGxldGVcIixcInJlc3VtZVwiLFwicGF1c2VcIixcInJld2luZFwiLFwic2tpcFwiLFwiY2xvc2VMaW5lYXJcIixcImNsb3NlXCJdO2ZvcihsZXQgZSBpbiB0aGlzLmNyZWF0aXZlLnRyYWNraW5nRXZlbnRzKXtjb25zdCB0PXRoaXMuY3JlYXRpdmUudHJhY2tpbmdFdmVudHNbZV07dGhpcy50cmFja2luZ0V2ZW50c1tlXT10LnNsaWNlKDApfXRoaXMuY3JlYXRpdmUgaW5zdGFuY2VvZiBDcmVhdGl2ZUxpbmVhcj90aGlzLl9pbml0TGluZWFyVHJhY2tpbmcoKTp0aGlzLl9pbml0VmFyaWF0aW9uVHJhY2tpbmcoKSxlJiZ0aGlzLm9uKFwic3RhcnRcIiwoKT0+e2UubGFzdFN1Y2Nlc3NmdWxBZD1EYXRlLm5vdygpfSl9X2luaXRMaW5lYXJUcmFja2luZygpe3RoaXMubGluZWFyPSEwLHRoaXMuc2tpcERlbGF5PXRoaXMuY3JlYXRpdmUuc2tpcERlbGF5LHRoaXMuc2V0RHVyYXRpb24odGhpcy5jcmVhdGl2ZS5kdXJhdGlvbiksdGhpcy5jbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT10aGlzLmNyZWF0aXZlLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUsdGhpcy5jbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPXRoaXMuY3JlYXRpdmUudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzfV9pbml0VmFyaWF0aW9uVHJhY2tpbmcoKXtpZih0aGlzLmxpbmVhcj0hMSx0aGlzLnNraXBEZWxheT1ERUZBVUxUX1NLSVBfREVMQVksdGhpcy52YXJpYXRpb24pe2ZvcihsZXQgZSBpbiB0aGlzLnZhcmlhdGlvbi50cmFja2luZ0V2ZW50cyl7Y29uc3QgdD10aGlzLnZhcmlhdGlvbi50cmFja2luZ0V2ZW50c1tlXTt0aGlzLnRyYWNraW5nRXZlbnRzW2VdP3RoaXMudHJhY2tpbmdFdmVudHNbZV09dGhpcy50cmFja2luZ0V2ZW50c1tlXS5jb25jYXQodC5zbGljZSgwKSk6dGhpcy50cmFja2luZ0V2ZW50c1tlXT10LnNsaWNlKDApfXRoaXMudmFyaWF0aW9uIGluc3RhbmNlb2YgTm9uTGluZWFyQWQ/KHRoaXMuY2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9dGhpcy52YXJpYXRpb24ubm9ubGluZWFyQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUsdGhpcy5jbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPXRoaXMudmFyaWF0aW9uLm5vbmxpbmVhckNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMsdGhpcy5zZXREdXJhdGlvbih0aGlzLnZhcmlhdGlvbi5taW5TdWdnZXN0ZWREdXJhdGlvbikpOnRoaXMudmFyaWF0aW9uIGluc3RhbmNlb2YgQ29tcGFuaW9uQWQmJih0aGlzLmNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPXRoaXMudmFyaWF0aW9uLmNvbXBhbmlvbkNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlLHRoaXMuY2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz10aGlzLnZhcmlhdGlvbi5jb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzKX19c2V0RHVyYXRpb24oZSl7dGhpcy5hc3NldER1cmF0aW9uPWUsdGhpcy5xdWFydGlsZXM9e2ZpcnN0UXVhcnRpbGU6TWF0aC5yb3VuZCgyNSp0aGlzLmFzc2V0RHVyYXRpb24pLzEwMCxtaWRwb2ludDpNYXRoLnJvdW5kKDUwKnRoaXMuYXNzZXREdXJhdGlvbikvMTAwLHRoaXJkUXVhcnRpbGU6TWF0aC5yb3VuZCg3NSp0aGlzLmFzc2V0RHVyYXRpb24pLzEwMH19c2V0UHJvZ3Jlc3MoZSl7Y29uc3QgdD10aGlzLnNraXBEZWxheXx8REVGQVVMVF9TS0lQX0RFTEFZO2lmKC0xPT09dHx8dGhpcy5za2lwcGFibGV8fCh0PmU/dGhpcy5lbWl0KFwic2tpcC1jb3VudGRvd25cIix0LWUpOih0aGlzLnNraXBwYWJsZT0hMCx0aGlzLmVtaXQoXCJza2lwLWNvdW50ZG93blwiLDApKSksdGhpcy5hc3NldER1cmF0aW9uPjApe2NvbnN0IHQ9W107aWYoZT4wKXtjb25zdCByPU1hdGgucm91bmQoZS90aGlzLmFzc2V0RHVyYXRpb24qMTAwKTt0LnB1c2goXCJzdGFydFwiKSx0LnB1c2goYHByb2dyZXNzLSR7cn0lYCksdC5wdXNoKGBwcm9ncmVzcy0ke01hdGgucm91bmQoZSl9YCk7Zm9yKGxldCByIGluIHRoaXMucXVhcnRpbGVzKXRoaXMuaXNRdWFydGlsZVJlYWNoZWQocix0aGlzLnF1YXJ0aWxlc1tyXSxlKSYmKHQucHVzaChyKSx0aGlzLl9hbHJlYWR5VHJpZ2dlcmVkUXVhcnRpbGVzW3JdPSEwKX10LmZvckVhY2goZT0+e3RoaXMudHJhY2soZSwhMCl9KSxlPHRoaXMucHJvZ3Jlc3MmJnRoaXMudHJhY2soXCJyZXdpbmRcIil9dGhpcy5wcm9ncmVzcz1lfWlzUXVhcnRpbGVSZWFjaGVkKGUsdCxyKXtsZXQgaT0hMTtyZXR1cm4gdDw9ciYmIXRoaXMuX2FscmVhZHlUcmlnZ2VyZWRRdWFydGlsZXNbZV0mJihpPSEwKSxpfXNldE11dGVkKGUpe3RoaXMubXV0ZWQhPT1lJiZ0aGlzLnRyYWNrKGU/XCJtdXRlXCI6XCJ1bm11dGVcIiksdGhpcy5tdXRlZD1lfXNldFBhdXNlZChlKXt0aGlzLnBhdXNlZCE9PWUmJnRoaXMudHJhY2soZT9cInBhdXNlXCI6XCJyZXN1bWVcIiksdGhpcy5wYXVzZWQ9ZX1zZXRGdWxsc2NyZWVuKGUpe3RoaXMuZnVsbHNjcmVlbiE9PWUmJnRoaXMudHJhY2soZT9cImZ1bGxzY3JlZW5cIjpcImV4aXRGdWxsc2NyZWVuXCIpLHRoaXMuZnVsbHNjcmVlbj1lfXNldEV4cGFuZChlKXt0aGlzLmV4cGFuZGVkIT09ZSYmdGhpcy50cmFjayhlP1wiZXhwYW5kXCI6XCJjb2xsYXBzZVwiKSx0aGlzLmV4cGFuZGVkPWV9c2V0U2tpcERlbGF5KGUpe1wibnVtYmVyXCI9PXR5cGVvZiBlJiYodGhpcy5za2lwRGVsYXk9ZSl9dHJhY2tJbXByZXNzaW9uKCl7dGhpcy5pbXByZXNzZWR8fCh0aGlzLmltcHJlc3NlZD0hMCx0aGlzLnRyYWNrVVJMcyh0aGlzLmFkLmltcHJlc3Npb25VUkxUZW1wbGF0ZXMpLHRoaXMudHJhY2soXCJjcmVhdGl2ZVZpZXdcIikpfWVycm9yV2l0aENvZGUoZSl7dGhpcy50cmFja1VSTHModGhpcy5hZC5lcnJvclVSTFRlbXBsYXRlcyx7RVJST1JDT0RFOmV9KX1jb21wbGV0ZSgpe3RoaXMudHJhY2soXCJjb21wbGV0ZVwiKX1jbG9zZSgpe3RoaXMudHJhY2sodGhpcy5saW5lYXI/XCJjbG9zZUxpbmVhclwiOlwiY2xvc2VcIil9c2tpcCgpe3RoaXMudHJhY2soXCJza2lwXCIpLHRoaXMudHJhY2tpbmdFdmVudHM9W119Y2xpY2soZT1udWxsKXt0aGlzLmNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMmJnRoaXMuY2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5sZW5ndGgmJnRoaXMudHJhY2tVUkxzKHRoaXMuY2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyk7Y29uc3QgdD10aGlzLmNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlfHxlO2lmKHQpe2NvbnN0IGU9dGhpcy5saW5lYXI/e0NPTlRFTlRQTEFZSEVBRDp0aGlzLnByb2dyZXNzRm9ybWF0dGVkKCl9Ont9LHI9dXRpbC5yZXNvbHZlVVJMVGVtcGxhdGVzKFt0XSxlKVswXTt0aGlzLmVtaXQoXCJjbGlja3Rocm91Z2hcIixyKX19dHJhY2soZSx0PSExKXtcImNsb3NlTGluZWFyXCI9PT1lJiYhdGhpcy50cmFja2luZ0V2ZW50c1tlXSYmdGhpcy50cmFja2luZ0V2ZW50cy5jbG9zZSYmKGU9XCJjbG9zZVwiKTtjb25zdCByPXRoaXMudHJhY2tpbmdFdmVudHNbZV0saT10aGlzLmVtaXRBbHdheXNFdmVudHMuaW5kZXhPZihlKT4tMTtyPyh0aGlzLmVtaXQoZSxcIlwiKSx0aGlzLnRyYWNrVVJMcyhyKSk6aSYmdGhpcy5lbWl0KGUsXCJcIiksdCYmKGRlbGV0ZSB0aGlzLnRyYWNraW5nRXZlbnRzW2VdLGkmJnRoaXMuZW1pdEFsd2F5c0V2ZW50cy5zcGxpY2UodGhpcy5lbWl0QWx3YXlzRXZlbnRzLmluZGV4T2YoZSksMSkpfXRyYWNrVVJMcyhlLHQ9e30pe3RoaXMubGluZWFyJiYodGhpcy5jcmVhdGl2ZSYmdGhpcy5jcmVhdGl2ZS5tZWRpYUZpbGVzJiZ0aGlzLmNyZWF0aXZlLm1lZGlhRmlsZXNbMF0mJnRoaXMuY3JlYXRpdmUubWVkaWFGaWxlc1swXS5maWxlVVJMJiYodC5BU1NFVFVSST10aGlzLmNyZWF0aXZlLm1lZGlhRmlsZXNbMF0uZmlsZVVSTCksdC5DT05URU5UUExBWUhFQUQ9dGhpcy5wcm9ncmVzc0Zvcm1hdHRlZCgpKSx1dGlsLnRyYWNrKGUsdCl9cHJvZ3Jlc3NGb3JtYXR0ZWQoKXtjb25zdCBlPXBhcnNlSW50KHRoaXMucHJvZ3Jlc3MpO2xldCB0PWUvMzYwMDt0Lmxlbmd0aDwyJiYodD1gMCR7dH1gKTtsZXQgcj1lLzYwJTYwO3IubGVuZ3RoPDImJihyPWAwJHtyfWApO2xldCBpPWUlNjA7cmV0dXJuIGkubGVuZ3RoPDImJihpPWAwJHtyfWApLGAke3R9OiR7cn06JHtpfS4ke3BhcnNlSW50KDEwMCoodGhpcy5wcm9ncmVzcy1lKSl9YH19ZXhwb3J0e1ZBU1RDbGllbnQsVkFTVFBhcnNlcixWQVNUVHJhY2tlcn07Il0sInNvdXJjZVJvb3QiOiIifQ==