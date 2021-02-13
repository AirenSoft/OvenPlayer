/*! OvenPlayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        google.ima.settings.setLocale(playerConfig.getLanguage());
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
        var remainingTime = adsManager.getRemainingTime();
        var ad = adEvent.getAd();
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
        isVideoEnded: false,
        lang: playerConfig.getLanguage()
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
            if (adsSpec.lang === "ko") {
                $textView.html("광고 건너뛰기<i class='op-con op-arrow-right btn-right'></i>");
            } else {
                $textView.html("Ad Skip<i class='op-con op-arrow-right btn-right'></i>");
            }
            $textView.addClass("videoAdUiAction");
        } else {
            if (adsSpec.lang === "ko") {
                $textView.html(parseInt(data) + 1 + "초 후에 이 광고를 건너뛸 수 있습니다.");
            } else {
                $textView.html("You can skip this ad in " + (parseInt(data) + 1));
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2Fkcy9pbWEvQWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9hZHMvaW1hL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvYWRzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvYWRzL3Zhc3QvQWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9hZHMvdmFzdC9MaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdmFzdC1jbGllbnQuanMiXSwibmFtZXMiOlsiQWQiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsImVycm9yQ2FsbGJhY2siLCJBVVRPUExBWV9OT1RfQUxMT1dFRCIsIkFETUFOR0VSX0xPQURJTkdfRVJST1IiLCJBRFNfTUFOQUdFUl9MT0FERUQiLCJBRF9FUlJPUiIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwiYWRzRXJyb3JPY2N1cnJlZCIsInNwZWMiLCJzdGFydGVkIiwiYWN0aXZlIiwiaXNWaWRlb0VuZGVkIiwiT25NYW5hZ2VyTG9hZGVkIiwiT25BZEVycm9yIiwiYWREaXNwbGF5Q29udGFpbmVyIiwiYWRzTG9hZGVyIiwiYWRzTWFuYWdlciIsImxpc3RlbmVyIiwiYWRzUmVxdWVzdCIsImF1dG9wbGF5QWxsb3dlZCIsImF1dG9wbGF5UmVxdWlyZXNNdXRlZCIsImJyb3dzZXIiLCJnZXRCcm93c2VyIiwiaXNNb2JpbGUiLCJvcyIsImFkRGlzcGxheUNvbnRhaW5lckluaXRpYWxpemVkIiwic2VuZFdhcm5pbmdNZXNzYWdlRm9yTXV0ZWRQbGF5IiwidHJpZ2dlciIsIlBMQVlFUl9XQVJOSU5HIiwibWVzc2FnZSIsIldBUk5fTVNHX01VVEVEUExBWSIsInRpbWVyIiwiaWNvbkNsYXNzIiwiVUlfSUNPTlMiLCJ2b2x1bWVfbXV0ZSIsIm9uQ2xpY2tDYWxsYmFjayIsInNldE11dGUiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImdvb2dsZSIsImltYSIsIkFkc01hbmFnZXJMb2FkZWRFdmVudCIsIlR5cGUiLCJBZEVycm9yRXZlbnQiLCJzZXR0aW5ncyIsInNldExvY2FsZSIsImdldExhbmd1YWdlIiwic2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzIiwiY3JlYXRlQWRDb250YWluZXIiLCJhZENvbnRhaW5lciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImdldENvbnRhaW5lciIsImFwcGVuZCIsImFkRXJyb3JFdmVudCIsImNvbnNvbGUiLCJnZXRFcnJvciIsImdldFZhc3RFcnJvckNvZGUiLCJnZXRNZXNzYWdlIiwiaW5uZXJFcnJvciIsImdldElubmVyRXJyb3IiLCJnZXRFcnJvckNvZGUiLCJTVEFURV9BRF9FUlJPUiIsImNvZGUiLCJwbGF5IiwiYWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiYWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJBZHNSZW5kZXJpbmdTZXR0aW5ncyIsInJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUiLCJkZXN0cm95IiwiZ2V0QWRzTWFuYWdlciIsImFkQ29uYXRpbmVyRWxtZW50IiwiQWREaXNwbGF5Q29udGFpbmVyIiwiQWRzTG9hZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uIiwiQ09OVEVOVF9WT0xVTUUiLCJkYXRhIiwibXV0ZSIsInNldFZvbHVtZSIsInZvbHVtZSIsInNldEF1dG9QbGF5VG9BZHNSZXF1ZXN0Iiwic2V0QWRXaWxsQXV0b1BsYXkiLCJzZXRBZFdpbGxQbGF5TXV0ZWQiLCJpbml0UmVxdWVzdCIsIkFkc1JlcXVlc3QiLCJmb3JjZU5vbkxpbmVhckZ1bGxTbG90IiwicmVxdWVzdEFkcyIsImNoZWNrQXV0b3BsYXlTdXBwb3J0IiwidGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8iLCJzcmMiLCJURU1QX1ZJREVPX1VSTCIsImxvYWQiLCJnZXROYW1lIiwiUFJPVklERVJfREFTSCIsImNsZWFyQW5kUmVwb3J0IiwiX2F1dG9wbGF5QWxsb3dlZCIsIl9hdXRvcGxheVJlcXVpcmVzTXV0ZWQiLCJwYXVzZSIsInJlbW92ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicGxheVByb21pc2UiLCJ1bmRlZmluZWQiLCJ0aGVuIiwiZXJyb3IiLCJpc0FjdGl2ZSIsInJlc3VtZSIsImluaXRpYWxpemUiLCJyZXRyeUNvdW50IiwiY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSIsImluaXQiLCJWaWV3TW9kZSIsIk5PUk1BTCIsInN0YXJ0IiwiRXJyb3IiLCJzZXRUaW1lb3V0IiwiaXNBdXRvU3RhcnQiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJjb21wbGV0ZUNvbnRlbnRDYWxsYmFjayIsImlzQWxsQWRDb21wbGV0ZSIsImlzTGluZWFyQWQiLCJjb250ZW50Q29tcGxldGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiJGFkcyIsImZpbmQiLCJvZmYiLCJMaXN0ZW5lciIsImFkc1NwZWMiLCJsb3dMZXZlbEV2ZW50cyIsImludGVydmFsVGltZXIiLCJBRF9CVUZGRVJJTkciLCJBZEV2ZW50IiwiQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQiLCJDT05URU5UX1JFU1VNRV9SRVFVRVNURUQiLCJBTExfQURTX0NPTVBMRVRFRCIsIkNMSUNLIiwiU0tJUFBFRCIsIkNPTVBMRVRFIiwiRklSU1RfUVVBUlRJTEUiLCJMT0FERUQiLCJNSURQT0lOVCIsIlBBVVNFRCIsIlJFU1VNRUQiLCJTVEFSVEVEIiwiVVNFUl9DTE9TRSIsIlRISVJEX1FVQVJUSUxFIiwiaXNBbGxBZENvbXBlbGV0ZSIsImFkQ29tcGxldGVDYWxsYmFjayIsImN1cnJlbnRBZCIsImFkRXZlbnQiLCJ0eXBlIiwiZ2V0UG9zaXRpb24iLCJzZXRTdGF0ZSIsIlNUQVRFX0NPTVBMRVRFIiwiUExBWUVSX0NMSUNLRUQiLCJQTEFZRVJfQURfQ0xJQ0siLCJyZW1haW5pbmdUaW1lIiwiZ2V0UmVtYWluaW5nVGltZSIsImFkIiwiZ2V0QWQiLCJTVEFURV9BRF9MT0FERUQiLCJyZW1haW5pbmciLCJpc0xpbmVhciIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX1BMQVlJTkciLCJhZE9iamVjdCIsImR1cmF0aW9uIiwiZ2V0RHVyYXRpb24iLCJza2lwVGltZU9mZnNldCIsImdldFNraXBUaW1lT2Zmc2V0IiwiQURfQ0hBTkdFRCIsInNldEludGVydmFsIiwiQURfVElNRSIsInBvc2l0aW9uIiwic2tpcHBhYmxlIiwiZ2V0QWRTa2lwcGFibGVTdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJTVEFURV9BRF9DT01QTEVURSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwic2V0QWRDb21wbGV0ZUNhbGxiYWNrIiwiX2FkQ29tcGxldGVDYWxsYmFjayIsImxhbmciLCJjb250YWluZXIiLCJlbEFkVmlkZW8iLCJ0ZXh0VmlldyIsImFkQnV0dG9uIiwidmFzdENsaWVudCIsIlZBU1RDbGllbnQiLCJ2YXN0VHJhY2tlciIsInN0eWxlIiwiZGlzcGxheSIsImdldCIsInJlcyIsImFkcyIsIlZBU1RUcmFja2VyIiwiY3JlYXRpdmVzIiwidmlkZW9VUkwiLCJsZW5ndGgiLCJtZWRpYUZpbGVzIiwiZmlsZVVSTCIsIm11dGVkIiwiY2hlY2tNYWluQ29udGVudExvYWRlZCIsIm1ldGFMb2FkZWQiLCJNRURJQUZJTEVfUExBWUJBQ0tfRVJST1IiLCIkdGV4dFZpZXciLCIkYWRCdXR0b24iLCIkZWxBZFZpZGVvIiwicHJvY2Vzc0VuZE9mQWQiLCJoaWRlIiwicHJvY2Vzc1N0YXJ0T2ZBZCIsInNob3ciLCJza2lwQnV0dG9uQ2xpY2tlZCIsImV2ZW50IiwiaGFzQ2xhc3MiLCJza2lwIiwiZXJyb3JXaXRoQ29kZSIsImNhbnBsYXkiLCJlbmRlZCIsImNvbXBsZXRlIiwiY2xpY2siLCJzZXRQYXVzZWQiLCJ0aW1ldXBkYXRlIiwic2V0UHJvZ3Jlc3MiLCJ0YXJnZXQiLCJjdXJyZW50VGltZSIsInZvbHVtZWNoYW5nZSIsInNldE11dGVkIiwibG9hZGVkbWV0YWRhdGEiLCJTVEFURV9QTEFZSU5HIiwiZ2V0U3RhdGUiLCJ0cmFja0ltcHJlc3Npb24iLCJ1cmwiLCJ3aW5kb3ciLCJvcGVuIiwiaHRtbCIsImFkZENsYXNzIiwicGFyc2VJbnQiLCJpZCIsInNlcXVlbmNlIiwic3lzdGVtIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImFkdmVydGlzZXIiLCJwcmljaW5nIiwic3VydmV5IiwiZXJyb3JVUkxUZW1wbGF0ZXMiLCJpbXByZXNzaW9uVVJMVGVtcGxhdGVzIiwiZXh0ZW5zaW9ucyIsIkFkRXh0ZW5zaW9uIiwiYXR0cmlidXRlcyIsImNoaWxkcmVuIiwiQWRFeHRlbnNpb25DaGlsZCIsIm5hbWUiLCJ2YWx1ZSIsIkNvbXBhbmlvbkFkIiwid2lkdGgiLCJoZWlnaHQiLCJzdGF0aWNSZXNvdXJjZSIsImh0bWxSZXNvdXJjZSIsImlmcmFtZVJlc291cmNlIiwiYWx0VGV4dCIsImNvbXBhbmlvbkNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlIiwiY29tcGFuaW9uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyIsInRyYWNraW5nRXZlbnRzIiwiQ3JlYXRpdmUiLCJlIiwiYWRJZCIsImFwaUZyYW1ld29yayIsIkNyZWF0aXZlQ29tcGFuaW9uIiwidmFyaWF0aW9ucyIsInRyYWNrIiwidCIsInJlc29sdmVVUkxUZW1wbGF0ZXMiLCJJbWFnZSIsInIiLCJBU1NFVFVSSSIsImVuY29kZVVSSUNvbXBvbmVudFJGQzM5ODYiLCJDT05URU5UUExBWUhFQUQiLCJFUlJPUkNPREUiLCJ0ZXN0IiwiQ0FDSEVCVVNUSU5HIiwibGVmdHBhZCIsIk1hdGgiLCJyb3VuZCIsInJhbmRvbSIsInRvU3RyaW5nIiwiVElNRVNUQU1QIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiUkFORE9NIiwiaSIsInMiLCJuIiwicmVwbGFjZSIsInB1c2giLCJlbmNvZGVVUklDb21wb25lbnQiLCJjaGFyQ29kZUF0IiwicmFuZ2UiLCJtYXAiLCJqb2luIiwiaXNOdW1lcmljIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwiaXNGaW5pdGUiLCJmbGF0dGVuIiwicmVkdWNlIiwiY29uY2F0IiwiQXJyYXkiLCJpc0FycmF5IiwidXRpbCIsImNoaWxkQnlOYW1lIiwiY2hpbGROb2RlcyIsIm5vZGVOYW1lIiwiY2hpbGRyZW5CeU5hbWUiLCJyZXNvbHZlVmFzdEFkVGFnVVJJIiwiaW5kZXhPZiIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJzbGljZSIsImxhc3RJbmRleE9mIiwicGFyc2VCb29sZWFuIiwicGFyc2VOb2RlVGV4dCIsInRleHRDb250ZW50IiwidGV4dCIsInRyaW0iLCJjb3B5Tm9kZUF0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZSIsInBhcnNlRHVyYXRpb24iLCJzcGxpdCIsInNwbGl0VkFTVCIsIm1lcmdlV3JhcHBlckFkRGF0YSIsInZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyIsInZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMiLCJ2aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlIiwicGFyc2VyVXRpbHMiLCJwYXJzZUNyZWF0aXZlQ29tcGFuaW9uIiwiY29tcGFuaW9uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlIiwiQ3JlYXRpdmVMaW5lYXIiLCJza2lwRGVsYXkiLCJhZFBhcmFtZXRlcnMiLCJpY29ucyIsIkljb24iLCJwcm9ncmFtIiwieFBvc2l0aW9uIiwieVBvc2l0aW9uIiwib2Zmc2V0IiwiaWNvbkNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlIiwiaWNvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMiLCJpY29uVmlld1RyYWNraW5nVVJMVGVtcGxhdGUiLCJNZWRpYUZpbGUiLCJkZWxpdmVyeVR5cGUiLCJtaW1lVHlwZSIsImNvZGVjIiwiYml0cmF0ZSIsIm1pbkJpdHJhdGUiLCJtYXhCaXRyYXRlIiwic2NhbGFibGUiLCJtYWludGFpbkFzcGVjdFJhdGlvIiwicGFyc2VDcmVhdGl2ZUxpbmVhciIsImNoYXJBdCIsImEiLCJ0b0xvd2VyQ2FzZSIsIm8iLCJwYXJzZVhQb3NpdGlvbiIsInBhcnNlWVBvc2l0aW9uIiwiQ3JlYXRpdmVOb25MaW5lYXIiLCJOb25MaW5lYXJBZCIsImV4cGFuZGVkV2lkdGgiLCJleHBhbmRlZEhlaWdodCIsIm1pblN1Z2dlc3RlZER1cmF0aW9uIiwibm9ubGluZWFyQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUiLCJub25saW5lYXJDbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzIiwicGFyc2VDcmVhdGl2ZU5vbkxpbmVhciIsInBhcnNlQWQiLCJwYXJzZVdyYXBwZXIiLCJwYXJzZUluTGluZSIsInBhcnNlQ3JlYXRpdmVBZElkQXR0cmlidXRlIiwicGFyc2VFeHRlbnNpb25zIiwidmVyc2lvbiIsIm1vZGVsIiwiY3VycmVuY3kiLCJuZXh0V3JhcHBlclVSTCIsIm5vZGVWYWx1ZSIsImRvbWFpbiIsIkV2ZW50SGFuZGxlcnMiLCJFdmVudEVtaXR0ZXIiLCJjYWxsIiwiJGdldE1heExpc3RlbmVycyIsIl9tYXhMaXN0ZW5lcnMiLCJkZWZhdWx0TWF4TGlzdGVuZXJzIiwiZW1pdE5vbmUiLCJhcnJheUNsb25lIiwiZW1pdE9uZSIsImVtaXRUd28iLCJlbWl0VGhyZWUiLCJsIiwiZW1pdE1hbnkiLCJhcHBseSIsIl9hZGRMaXN0ZW5lciIsIlR5cGVFcnJvciIsIl9ldmVudHMiLCJuZXdMaXN0ZW5lciIsImVtaXQiLCJfZXZlbnRzQ291bnQiLCJ1bnNoaWZ0Iiwid2FybmVkIiwiZW1pdHRlciIsImNvdW50IiwiZW1pdFdhcm5pbmciLCJ3YXJuIiwiX29uY2VXcmFwIiwicmVtb3ZlTGlzdGVuZXIiLCJhcmd1bWVudHMiLCJsaXN0ZW5lckNvdW50Iiwic3BsaWNlT25lIiwicG9wIiwidW53cmFwTGlzdGVuZXJzIiwieGRyIiwiWERvbWFpblJlcXVlc3QiLCJzdXBwb3J0ZWQiLCJBY3RpdmVYT2JqZWN0IiwiYXN5bmMiLCJyZXF1ZXN0IiwidGltZW91dCIsIndpdGhDcmVkZW50aWFscyIsInNlbmQiLCJvbnByb2dyZXNzIiwib25sb2FkIiwibG9hZFhNTCIsInJlc3BvbnNlVGV4dCIsInByb3RvdHlwZSIsImNyZWF0ZSIsInVzaW5nRG9tYWlucyIsIkRvbWFpbiIsImdldFByb3RvdHlwZU9mIiwic2V0TWF4TGlzdGVuZXJzIiwiZ2V0TWF4TGlzdGVuZXJzIiwiYyIsImNvbnRleHQiLCJkb21haW5FbWl0dGVyIiwiZG9tYWluVGhyb3duIiwicCIsImFkZExpc3RlbmVyIiwicHJlcGVuZExpc3RlbmVyIiwib25jZSIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJsaXN0ZW5lcnMiLCJldmVudE5hbWVzIiwiUmVmbGVjdCIsIm93bktleXMiLCJmbGFzaFVSTEhhbmRsZXIiLCJnZXQkMSIsIm5vZGVVUkxIYW5kbGVyIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJzdXBwb3J0ZWQkMSIsImdldCQyIiwib3ZlcnJpZGVNaW1lVHlwZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVhNTCIsInN0YXR1c1RleHQiLCJYSFJVUkxIYW5kbGVyIiwiZ2V0JDMiLCJ1cmxIYW5kbGVyIiwiVkFTVFJlc3BvbnNlIiwiREVGQVVMVF9NQVhfV1JBUFBFUl9ERVBUSCIsIkRFRkFVTFRfRVZFTlRfREFUQSIsIlZBU1RQYXJzZXIiLCJyZW1haW5pbmdBZHMiLCJwYXJlbnRVUkxzIiwicm9vdEVycm9yVVJMVGVtcGxhdGVzIiwibWF4V3JhcHBlckRlcHRoIiwiVVJMVGVtcGxhdGVGaWx0ZXJzIiwiZmV0Y2hpbmdPcHRpb25zIiwid3JhcHBlckRlcHRoIiwib3JpZ2luYWxVcmwiLCJyb290VVJMIiwid3JhcHBlckxpbWl0IiwidXJsaGFuZGxlciIsInNoaWZ0IiwicmVzb2x2ZUFkcyIsImJ1aWxkVkFTVFJlc3BvbnNlIiwiaW5pdFBhcnNpbmdTdGF0dXMiLCJmZXRjaFZBU1QiLCJpc1Jvb3RWQVNUIiwicGFyc2UiLCJnZXRFcnJvclVSTFRlbXBsYXRlcyIsImNvbXBsZXRlV3JhcHBlclJlc29sdmluZyIsInJlc29sdmVBbGwiLCJ3cmFwcGVyU2VxdWVuY2UiLCJkb2N1bWVudEVsZW1lbnQiLCJ0cmFja1Zhc3RFcnJvciIsInJlc29sdmVXcmFwcGVycyIsImFsbCIsImVycm9yQ29kZSIsImVycm9yTWVzc2FnZSIsIkVSUk9STUVTU0FHRSIsInNwbGljZSIsInN0b3JhZ2UiLCJERUZBVUxUX1NUT1JBR0UiLCJnZXRJdGVtIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJjbGVhciIsIlN0b3JhZ2UiLCJpbml0U3RvcmFnZSIsImxvY2FsU3RvcmFnZSIsInNlc3Npb25TdG9yYWdlIiwiaXNTdG9yYWdlRGlzYWJsZWQiLCJjYXBwaW5nRnJlZUx1bmNoIiwiY2FwcGluZ01pbmltdW1UaW1lSW50ZXJ2YWwiLCJkZWZhdWx0T3B0aW9ucyIsInZhc3RQYXJzZXIiLCJsYXN0U3VjY2Vzc2Z1bEFkIiwidG90YWxDYWxscyIsInRvdGFsQ2FsbHNUaW1lb3V0IiwiZ2V0UmVtYWluaW5nQWRzIiwibm93IiwiaGFzT3duUHJvcGVydHkiLCJnZXRBbmRQYXJzZVZBU1QiLCJERUZBVUxUX1NLSVBfREVMQVkiLCJjcmVhdGl2ZSIsInZhcmlhdGlvbiIsImltcHJlc3NlZCIsIl9hbHJlYWR5VHJpZ2dlcmVkUXVhcnRpbGVzIiwiZW1pdEFsd2F5c0V2ZW50cyIsIl9pbml0TGluZWFyVHJhY2tpbmciLCJfaW5pdFZhcmlhdGlvblRyYWNraW5nIiwibGluZWFyIiwic2V0RHVyYXRpb24iLCJjbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSIsImNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMiLCJhc3NldER1cmF0aW9uIiwicXVhcnRpbGVzIiwiZmlyc3RRdWFydGlsZSIsIm1pZHBvaW50IiwidGhpcmRRdWFydGlsZSIsImlzUXVhcnRpbGVSZWFjaGVkIiwicHJvZ3Jlc3MiLCJwYXVzZWQiLCJmdWxsc2NyZWVuIiwiZXhwYW5kZWQiLCJ0cmFja1VSTHMiLCJwcm9ncmVzc0Zvcm1hdHRlZCIsImNsb3NlIl0sIm1hcHBpbmdz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QWMsS0FBS1AsUUFBTCxJQUFlLEtBQUtBLFFBQUwsQ0FBY3RVLFVBQTdCLElBQXlDLEtBQUtzVSxRQUFMLENBQWN0VSxVQUFkLENBQXlCLENBQXpCLENBQXpDLElBQXNFLEtBQUtzVSxRQUFMLENBQWN0VSxVQUFkLENBQXlCLENBQXpCLEVBQTRCQyxPQUFsRyxLQUE0R3dFLEVBQUVJLFFBQUYsR0FBVyxLQUFLeVAsUUFBTCxDQUFjdFUsVUFBZCxDQUF5QixDQUF6QixFQUE0QkMsT0FBbkosR0FBNEp3RSxFQUFFTSxlQUFGLEdBQWtCLEtBQUs2USxpQkFBTCxFQUE1TCxHQUFzTjdPLEtBQUt2QyxLQUFMLENBQVdMLENBQVgsRUFBYU0sQ0FBYixDQUF0TjtBQUFzTzs7O3dDQUFtQjtBQUFDLFVBQU1OLElBQUU3QixTQUFTLEtBQUtpVCxRQUFkLENBQVIsQ0FBZ0MsSUFBSTlRLElBQUVOLElBQUUsSUFBUixDQUFhTSxFQUFFMUUsTUFBRixHQUFTLENBQVQsS0FBYTBFLFVBQU1BLENBQW5CLEVBQXdCLElBQUlHLElBQUVULElBQUUsRUFBRixHQUFLLEVBQVgsQ0FBY1MsRUFBRTdFLE1BQUYsR0FBUyxDQUFULEtBQWE2RSxVQUFNQSxDQUFuQixFQUF3QixJQUFJZ0IsSUFBRXpCLElBQUUsRUFBUixDQUFXLE9BQU95QixFQUFFN0YsTUFBRixHQUFTLENBQVQsS0FBYTZGLFVBQU1oQixDQUFuQixHQUEyQkgsQ0FBM0IsU0FBZ0NHLENBQWhDLFNBQXFDZ0IsQ0FBckMsU0FBMEN0RCxTQUFTLE9BQUssS0FBS2lULFFBQUwsR0FBY3BSLENBQW5CLENBQVQsQ0FBakQ7QUFBbUY7Ozs7RUFBeHRJd0gsWTs7UUFBZ3VJdE0sVSxHQUFBQSxVO1FBQVcyUixVLEdBQUFBLFU7UUFBV3BSLFcsR0FBQUEsVyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAwOC8wNC8yMDE5LlxyXG4gKi9cclxuaW1wb3J0IEFkc0V2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvYWRzL2ltYS9MaXN0ZW5lclwiO1xyXG5pbXBvcnQge1RFTVBfVklERU9fVVJMfSBmcm9tIFwiYXBpL2Fkcy91dGlsc1wiO1xyXG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcclxuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuaW1wb3J0IHtcclxuICAgIEVSUk9SLFxyXG4gICAgQ09OVEVOVF9WT0xVTUUsXHJcbiAgICBTVEFURV9MT0FESU5HLFxyXG4gICAgSU5JVF9BRFNfRVJST1IsXHJcbiAgICBTVEFURV9BRF9FUlJPUixcclxuICAgIFBMQVlFUl9XQVJOSU5HLFxyXG4gICAgQ09OVEVOVF9NRVRBLFxyXG4gICAgV0FSTl9NU0dfTVVURURQTEFZLFxyXG4gICAgU1RBVEVfQURfTE9BRElORyxcclxuICAgIFBST1ZJREVSX0RBU0gsXHJcbiAgICBVSV9JQ09OU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCBBZCA9IGZ1bmN0aW9uKGVsVmlkZW8sIHByb3ZpZGVyLCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsLCBlcnJvckNhbGxiYWNrKXtcclxuICAgIC8vVG9kbyA6IG1vdmUgY3JlYXRlQWRDb250YWluZXIgdG8gTWVkaWFNYW5hZ2VyXHJcbiAgICBjb25zdCBBVVRPUExBWV9OT1RfQUxMT1dFRCA9IFwiYXV0b3BsYXlOb3RBbGxvd2VkXCI7XHJcbiAgICBjb25zdCBBRE1BTkdFUl9MT0FESU5HX0VSUk9SID0gXCJhZG1hbmFnZXJMb2FkaW5nVGltZW91dFwiO1xyXG4gICAgbGV0IEFEU19NQU5BR0VSX0xPQURFRCA9IFwiXCI7XHJcbiAgICBsZXQgQURfRVJST1IgPSBcIlwiO1xyXG5cclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgYWRzTWFuYWdlckxvYWRlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGFkc0Vycm9yT2NjdXJyZWQgPSBmYWxzZTtcclxuICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgIHN0YXJ0ZWQ6IGZhbHNlLCAvL3BsYXllciBzdGFydGVkXHJcbiAgICAgICAgYWN0aXZlIDogZmFsc2UsIC8vb24gQWRcclxuICAgICAgICBpc1ZpZGVvRW5kZWQgOiBmYWxzZVxyXG4gICAgfTtcclxuICAgIGxldCBPbk1hbmFnZXJMb2FkZWQgPSBudWxsO1xyXG4gICAgbGV0IE9uQWRFcnJvciA9IG51bGw7XHJcblxyXG4gICAgbGV0IGFkRGlzcGxheUNvbnRhaW5lciA9IG51bGw7XHJcbiAgICBsZXQgYWRzTG9hZGVyID0gbnVsbDtcclxuICAgIGxldCBhZHNNYW5hZ2VyID0gbnVsbDtcclxuICAgIGxldCBsaXN0ZW5lciA9IG51bGw7XHJcbiAgICBsZXQgYWRzUmVxdWVzdCA9IG51bGw7XHJcbiAgICBsZXQgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2UsIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGJyb3dzZXIgPSBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpO1xyXG4gICAgbGV0IGlzTW9iaWxlID0gYnJvd3Nlci5vcyA9PT0gXCJBbmRyb2lkXCIgfHwgYnJvd3Nlci5vcyA9PT0gXCJpT1NcIjtcclxuXHJcbiAgICBsZXQgYWREaXNwbGF5Q29udGFpbmVySW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBnb29nbGUuaW1hLnNldHRpbmdzLnNldEF1dG9QbGF5QWRCcmVha3MoZmFsc2UpO1xyXG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldFZwYWlkTW9kZShnb29nbGUuaW1hLkltYVNka1NldHRpbmdzLlZwYWlkTW9kZS5FTkFCTEVEKTtcclxuXHJcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xyXG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyh0cnVlKTtcclxuICAgIGNvbnN0IHNlbmRXYXJuaW5nTWVzc2FnZUZvck11dGVkUGxheSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZRVJfV0FSTklORywge1xyXG4gICAgICAgICAgICBtZXNzYWdlIDogV0FSTl9NU0dfTVVURURQTEFZLFxyXG4gICAgICAgICAgICB0aW1lciA6IDEwICogMTAwMCxcclxuICAgICAgICAgICAgaWNvbkNsYXNzIDogVUlfSUNPTlMudm9sdW1lX211dGUsXHJcbiAgICAgICAgICAgIG9uQ2xpY2tDYWxsYmFjayA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRNdXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IHN0YXJ0ZWQgXCIsIFwiaXNNb2JpbGUgOiBcIiwgaXNNb2JpbGUsIGFkVGFnVXJsKTtcclxuXHJcbiAgICB0cnl7XHJcbiAgICAgICAgQURTX01BTkFHRVJfTE9BREVEID0gZ29vZ2xlLmltYS5BZHNNYW5hZ2VyTG9hZGVkRXZlbnQuVHlwZS5BRFNfTUFOQUdFUl9MT0FERUQ7XHJcbiAgICAgICAgQURfRVJST1IgPSBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SO1xyXG4gICAgICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0TG9jYWxlKHBsYXllckNvbmZpZy5nZXRMYW5ndWFnZSgpKTtcclxuICAgICAgICBnb29nbGUuaW1hLnNldHRpbmdzLnNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyh0cnVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ29wLWFkcycpO1xyXG4gICAgICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ29wLWFkcycpO1xyXG4gICAgICAgICAgICBwbGF5ZXJDb25maWcuZ2V0Q29udGFpbmVyKCkuYXBwZW5kKGFkQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE9uQWRFcnJvciA9IGZ1bmN0aW9uKGFkRXJyb3JFdmVudCl7XHJcbiAgICAgICAgICAgIC8vbm90ZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldElubmVyRXJyb3IoKS5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSAmIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSA9PT0gNDAwIGlzIEJyb3dzZXIgVXNlciBJbnRlcmFjdGl2ZSBlcnJvci5cclxuXHJcbiAgICAgICAgICAgIC8vRG8gbm90IHRyaWdnZXJpbmcgRVJST1IuIGJlY3Vhc2UgSXQganVzdCBBRCFcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSwgYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0TWVzc2FnZSgpKTtcclxuICAgICAgICAgICAgYWRzRXJyb3JPY2N1cnJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBpbm5lckVycm9yID0gYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpO1xyXG4gICAgICAgICAgICBpZihpbm5lckVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlubmVyRXJyb3IuZ2V0RXJyb3JDb2RlKCksIGlubmVyRXJyb3IuZ2V0TWVzc2FnZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKmlmIChhZHNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfRVJST1IsIHtjb2RlIDogYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpICwgbWVzc2FnZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldE1lc3NhZ2UoKX0pO1xyXG4gICAgICAgICAgICBzcGVjLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XHJcblxyXG4gICAgICAgICAgICAvKmlmKGlubmVyRXJyb3IgJiYgaW5uZXJFcnJvci5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSl7XHJcbiAgICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICB9Ki9cclxuXHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgT25NYW5hZ2VyTG9hZGVkID0gZnVuY3Rpb24oYWRzTWFuYWdlckxvYWRlZEV2ZW50KXtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IE9uTWFuYWdlckxvYWRlZCBcIik7XHJcbiAgICAgICAgICAgIGxldCBhZHNSZW5kZXJpbmdTZXR0aW5ncyA9IG5ldyBnb29nbGUuaW1hLkFkc1JlbmRlcmluZ1NldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIGFkc1JlbmRlcmluZ1NldHRpbmdzLnJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvL2Fkc1JlbmRlcmluZ1NldHRpbmdzLnVzZVN0eWxlZE5vbkxpbmVhckFkcyA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmKGFkc01hbmFnZXIpe1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogZGVzdHJveSBhZHNNYW5hZ2VyLS0tLVwiKTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgYWRzTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKGVsVmlkZW8sIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcclxuXHJcbiAgICAgICAgICAgIGxpc3RlbmVyID0gQWRzRXZlbnRzTGlzdGVuZXIoYWRzTWFuYWdlciwgcHJvdmlkZXIsIHNwZWMsIE9uQWRFcnJvcik7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBjcmVhdGVkIGFkbWFuYWdlciBhbmQgbGlzdG5lciBcIik7XHJcblxyXG4gICAgICAgICAgICBhZHNNYW5hZ2VyTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBhZENvbmF0aW5lckVsbWVudCA9IGNyZWF0ZUFkQ29udGFpbmVyKCk7XHJcbiAgICAgICAgYWREaXNwbGF5Q29udGFpbmVyID0gbmV3IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyKGFkQ29uYXRpbmVyRWxtZW50LCBlbFZpZGVvKTtcclxuICAgICAgICBhZHNMb2FkZXIgPSBuZXcgZ29vZ2xlLmltYS5BZHNMb2FkZXIoYWREaXNwbGF5Q29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQURTX01BTkFHRVJfTE9BREVELCBPbk1hbmFnZXJMb2FkZWQsIGZhbHNlKTtcclxuICAgICAgICBhZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBRF9FUlJPUiwgT25BZEVycm9yLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGFkRGlzcGxheUNvbnRhaW5lciBpbml0aWFsaXplZFwiKTtcclxuICAgICAgICBwcm92aWRlci5vbihDT05URU5UX1ZPTFVNRSwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZihhZHNNYW5hZ2VyKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEubXV0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zZXRWb2x1bWUoMCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnNldFZvbHVtZShkYXRhLnZvbHVtZS8xMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhhdCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNldEF1dG9QbGF5VG9BZHNSZXF1ZXN0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIGlmKGFkc1JlcXVlc3Qpe1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogc2V0QURXaWxsQXV0b1BsYXkgXCIsIFwiYXV0b3BsYXlBbGxvd2VkXCIsYXV0b3BsYXlBbGxvd2VkLCBcImF1dG9wbGF5UmVxdWlyZXNNdXRlZFwiLGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxBdXRvUGxheShhdXRvcGxheUFsbG93ZWQpO1xyXG4gICAgICAgICAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxQbGF5TXV0ZWQoYXV0b3BsYXlSZXF1aXJlc011dGVkKTtcclxuICAgICAgICAgICAgICAgIGlmKGF1dG9wbGF5UmVxdWlyZXNNdXRlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZFdhcm5pbmdNZXNzYWdlRm9yTXV0ZWRQbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBpbml0UmVxdWVzdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGFkc01hbmFnZXJMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogaW5pdFJlcXVlc3QoKSBBdXRvUGxheSBTdXBwb3J0IDogXCIsIFwiYXV0b3BsYXlBbGxvd2VkXCIsYXV0b3BsYXlBbGxvd2VkLCBcImF1dG9wbGF5UmVxdWlyZXNNdXRlZFwiLGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XHJcbiAgICAgICAgICAgIC8qaWYoYWRzUmVxdWVzdCl7XHJcbiAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgYWRzUmVxdWVzdCA9IG5ldyBnb29nbGUuaW1hLkFkc1JlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgICAgIGFkc1JlcXVlc3QuZm9yY2VOb25MaW5lYXJGdWxsU2xvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvKmlmKHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkuYnJvd3NlciA9PT0gXCJTYWZhcmlcIiAmJiBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zID09PSBcImlPU1wiICl7XHJcbiAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgfSovXHJcblxyXG4gICAgICAgICAgICBzZXRBdXRvUGxheVRvQWRzUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICBhZHNSZXF1ZXN0LmFkVGFnVXJsID0gYWRUYWdVcmw7XHJcblxyXG4gICAgICAgICAgICBhZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogcmVxdWVzdEFkcyBDb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgLy90d28gd2F5IHdoYXQgYWQgc3RhcnRzLlxyXG4gICAgICAgICAgICAvL2Fkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpOyBvciAgYWRzTWFuYWdlci5zdGFydCgpO1xyXG4gICAgICAgICAgICAvL3doYXQ/IHdoeT8/IHd0aD8/XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IGNoZWNrQXV0b3BsYXlTdXBwb3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBjaGVja0F1dG9wbGF5U3VwcG9ydCgpIFwiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpO1xyXG4gICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5zcmMgPSBURU1QX1ZJREVPX1VSTDtcclxuICAgICAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ubG9hZCgpO1xyXG5cclxuICAgICAgICAgICAgLy9EYXNoIGhhcyBhbHJlYWR5IGxvYWRlZCB3aGVuIHRyaWdnZXJlZCBwcm92aWRlci5wbGF5KCkgYWx3YXlzLlxyXG4gICAgICAgICAgICBpZihpc01vYmlsZSAmJiBwcm92aWRlci5nZXROYW1lKCkgIT09IFBST1ZJREVSX0RBU0ggKXtcclxuICAgICAgICAgICAgICAgIC8vTWFpbiB2aWRlbyBzZXRzIHVzZXIgZ2VzdHVyZSB3aGVuIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvIHRyaWdnZXJlZCBjaGVja2luZy5cclxuICAgICAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qIERpZmZlcmVudCBicm93c2VyLXNwZWNpZmljIHdheXMgdG8gZGVsaXZlcnkgVUkgdG8gb3RoZXIgZWxlbWVudHMuICBNeSBHdWVzcy4gMjAxOS0wNi0xOVxyXG4gICAgICAgICAgICAqICAgKHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvJ3MgVXNlciBJbnRlcmFjdGlvbiBkZWxpdmVyeSB0byBlbFZpZGVvLilcclxuICAgICAgICAgICAgKiAgIE1vYmlsZSBDaHJvbWUgV2ViVmlldyA6XHJcbiAgICAgICAgICAgICogICBZb3UgaGF2ZSB0byBydW4gZWxWaWRlby5sb2FkKCkgd2hlbiB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlbyBpc3N1ZXMgd2l0aGluIDUgc2Vjb25kcyBvZiB1c2VyIGludGVyYWN0aW9uLlxyXG4gICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICogICBNb2JpbGUgaW9zIHNhZmFyaSA6XHJcbiAgICAgICAgICAgICogICBZb3UgaGF2ZSB0byBydW4gZWxWaWRlby5sb2FkKCkgYmVmb3JlIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvIHJ1biBwbGF5KCkuXHJcbiAgICAgICAgICAgICogKi9cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNsZWFyQW5kUmVwb3J0ID0gZnVuY3Rpb24oX2F1dG9wbGF5QWxsb3dlZCwgX2F1dG9wbGF5UmVxdWlyZXNNdXRlZCl7XHJcbiAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBfYXV0b3BsYXlBbGxvd2VkO1xyXG4gICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gX2F1dG9wbGF5UmVxdWlyZXNNdXRlZDtcclxuICAgICAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRBdXRvUGxheVRvQWRzUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XHJcbiAgICAgICAgICAgICAgICBpZighdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucGxheSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9JIGNhbid0IHJlbWVtYmVyIHRoaXMgY2FzZS4uLlxyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6ICF0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheVByb21pc2UgPSB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXlQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogYXV0byBwbGF5IGFsbG93ZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCB1bm11dGVkIGF1dG9wbGF5IHdvcmtzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGF1dG8gcGxheSBmYWlsZWRcIiwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydChmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0Rpc2FibGUgTXV0ZWQgUGxheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyp0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby52b2x1bWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheVByb21pc2UgPSB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCBtdXRlZCBhdXRvcGxheSB3b3JrcyBidXQgdW5tdXRlZCBhdXRvcGxheSBkb2VzIG5vdC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogbXV0ZWQgYXV0byBwbGF5IHN1Y2Nlc3MuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldE11dGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IG11dGVkIGF1dG8gcGxheSBmYWlsZWRcIiwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogcHJvbWlzZSBub3Qgc3VwcG9ydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9NYXliZSB0aGlzIGlzIElFMTEuLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGF0LmlzQWN0aXZlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc3BlYy5hY3RpdmU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LnN0YXJ0ZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnN0YXJ0ZWQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHNwZWMuc3RhcnRlZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5yZXN1bWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQWRzTWFuYWdlcklzUmVhZHkgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhZHNNYW5hZ2VyTG9hZGVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGFkIHN0YXJ0IVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuaW5pdChcIjEwMCVcIiwgXCIxMDAlXCIsIGdvb2dsZS5pbWEuVmlld01vZGUuTk9STUFMKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMuc3RhcnRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFkc0Vycm9yT2NjdXJyZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoQURNQU5HRVJfTE9BRElOR19FUlJPUikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDE1MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihBRE1BTkdFUl9MT0FESU5HX0VSUk9SKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCAocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkgJiYgIWF1dG9wbGF5QWxsb3dlZCkgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGF1dG9wbGF5QWxsb3dlZCA6IGZhbHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKEFVVE9QTEFZX05PVF9BTExPV0VEKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQWRzTWFuYWdlcklzUmVhZHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgYWRzTWFuYWdlci5wYXVzZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhhdC52aWRlb0VuZGVkQ2FsbGJhY2sgPSAoY29tcGxldGVDb250ZW50Q2FsbGJhY2spID0+IHtcclxuICAgICAgICAgICAgLy9saXN0ZW5lci5pc0xpbmVhckFkIDogZ2V0IGN1cnJlbnQgYWQncyBzdGF0dXMgd2hldGhlciBsaW5lYXIgYWQgb3Igbm90LlxyXG4gICAgICAgICAgICBpZihsaXN0ZW5lciAmJiAobGlzdGVuZXIuaXNBbGxBZENvbXBsZXRlKCkgfHwgIWxpc3RlbmVyLmlzTGluZWFyQWQoKSkpe1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGVDb250ZW50Q2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoYWRzRXJyb3JPY2N1cnJlZCl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vSWYgeW91IG5lZWQgcGxheSB0aGUgcG9zdC1yb2xsLCB5b3UgaGF2ZSB0byBjYWxsIHRvIGFkc0xvYWRlciB3aGVuIGNvbnRlbnRzIHdhcyBjb21wbGV0ZWQuXHJcbiAgICAgICAgICAgICAgICBzcGVjLmlzVmlkZW9FbmRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIuY29udGVudENvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZihhZHNMb2FkZXIpe1xyXG4gICAgICAgICAgICAgICAgYWRzTG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQURTX01BTkFHRVJfTE9BREVELCBPbk1hbmFnZXJMb2FkZWQpO1xyXG4gICAgICAgICAgICAgICAgYWRzTG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQURfRVJST1IsIE9uQWRFcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGFkc01hbmFnZXIpe1xyXG4gICAgICAgICAgICAgICAgYWRzTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGFkRGlzcGxheUNvbnRhaW5lcil7XHJcbiAgICAgICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihsaXN0ZW5lcil7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCAkYWRzID0gTEEkKHBsYXllckNvbmZpZy5nZXRDb250YWluZXIoKSkuZmluZChcIi5vcC1hZHNcIik7XHJcbiAgICAgICAgICAgIGlmKCRhZHMpe1xyXG4gICAgICAgICAgICAgICAgJGFkcy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJvdmlkZXIub2ZmKENPTlRFTlRfVk9MVU1FLCBudWxsLCB0aGF0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhhdDtcclxuICAgIH1jYXRjaCAoZXJyb3Ipe1xyXG4gICAgICAgIC8vbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tJTklUX0FEU19FUlJPUl07XHJcbiAgICAgICAgLy90ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAvL2Vycm9yQ2FsbGJhY2sodGVtcEVycm9yKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFkO1xyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAxMC8wNC8yMDE5LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgICBFUlJPUixcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX0FEX0xPQURFRCxcclxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXHJcbiAgICBTVEFURV9BRF9QQVVTRUQsXHJcbiAgICBTVEFURV9BRF9DT01QTEVURSxcclxuICAgIEFEX0NIQU5HRUQsXHJcbiAgICBBRF9USU1FLFxyXG4gICAgU1RBVEVfUEFVU0VELFxyXG4gICAgU1RBVEVfRVJST1IsXHJcbiAgICBDT05URU5UX0NPTVBMRVRFLFxyXG4gICAgQ09OVEVOVF9TRUVLLFxyXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcclxuICAgIENPTlRFTlRfU0VFS0VELFxyXG4gICAgQ09OVEVOVF9CVUZGRVIsXHJcbiAgICBDT05URU5UX1RJTUUsXHJcbiAgICBDT05URU5UX1ZPTFVNRSxcclxuICAgIENPTlRFTlRfTUVUQSxcclxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcclxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxyXG4gICAgUExBWUVSX1NUQVRFLFxyXG4gICAgUExBWUVSX0NMSUNLRUQsXHJcbiAgICBQTEFZRVJfQURfQ0xJQ0ssXHJcbiAgICBQUk9WSURFUl9IVE1MNSxcclxuICAgIFBST1ZJREVSX1dFQlJUQyxcclxuICAgIFBST1ZJREVSX0RBU0gsXHJcbiAgICBQUk9WSURFUl9ITFNcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihhZHNNYW5hZ2VyLCBwcm92aWRlciwgYWRzU3BlYywgT25BZEVycm9yKXtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgbG93TGV2ZWxFdmVudHMgPSB7fTtcclxuXHJcbiAgICBsZXQgaW50ZXJ2YWxUaW1lciA9IG51bGw7XHJcblxyXG4gICAgY29uc3QgQURfQlVGRkVSSU5HID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQURfQlVGRkVSSU5HO1xyXG4gICAgY29uc3QgQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRDtcclxuICAgIGNvbnN0IENPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRDtcclxuICAgIGNvbnN0IEFEX0VSUk9SID0gZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUjtcclxuICAgIGNvbnN0IEFMTF9BRFNfQ09NUExFVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQ7XHJcbiAgICBjb25zdCBDTElDSyA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNMSUNLO1xyXG4gICAgY29uc3QgU0tJUFBFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNLSVBQRUQ7XHJcbiAgICBjb25zdCBDT01QTEVURSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFO1xyXG4gICAgY29uc3QgRklSU1RfUVVBUlRJTEU9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkZJUlNUX1FVQVJUSUxFO1xyXG4gICAgY29uc3QgTE9BREVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVEO1xyXG4gICAgY29uc3QgTUlEUE9JTlQ9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLk1JRFBPSU5UO1xyXG4gICAgY29uc3QgUEFVU0VEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUEFVU0VEO1xyXG4gICAgY29uc3QgUkVTVU1FRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlJFU1VNRUQ7XHJcbiAgICBjb25zdCBTVEFSVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU1RBUlRFRDtcclxuICAgIGNvbnN0IFVTRVJfQ0xPU0UgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5VU0VSX0NMT1NFO1xyXG4gICAgY29uc3QgVEhJUkRfUVVBUlRJTEUgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5USElSRF9RVUFSVElMRTtcclxuXHJcbiAgICBsZXQgaXNBbGxBZENvbXBlbGV0ZSA9IGZhbHNlOyAgIC8vUG9zdCByb2xs7J2EIOychO2VtFxyXG4gICAgbGV0IGFkQ29tcGxldGVDYWxsYmFjayA9IG51bGw7XHJcbiAgICBsZXQgY3VycmVudEFkID0gbnVsbDtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IExpc3RlbmVyIENyZWF0ZWRcIik7XHJcbiAgICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9QQVVTRV9SRVFVRVNURURdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIExJU1RFTkVSIDogXCIsIGFkRXZlbnQudHlwZSk7XHJcblxyXG4gICAgICAgICAvL1RoaXMgY2FsbGxzIHdoZW4gcGxheWVyIGlzIHBsYXlpbmcgY29udGVudHMgZm9yIGFkLlxyXG4gICAgICAgICBpZihhZHNTcGVjLnN0YXJ0ZWQpe1xyXG4gICAgICAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEXSA9IChhZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIExJU1RFTkVSIDogXCIsIGFkRXZlbnQudHlwZSk7XHJcbiAgICAgICAgLy9UaGlzIGNhbGxzIHdoZW4gb25lIGFkIGVuZGVkLlxyXG4gICAgICAgIC8vQW5kIHRoaXMgaXMgc2lnbmFsIHdoYXQgcGxheSB0aGUgY29udGVudHMuXHJcbiAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkICYmIChwcm92aWRlci5nZXRQb3NpdGlvbigpID09PSAwIHx8ICFhZHNTcGVjLmlzVmlkZW9FbmRlZCkgICl7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzW0FEX0VSUk9SXSA9IChhZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgaXNBbGxBZENvbXBlbGV0ZSA9IHRydWU7XHJcbiAgICAgICAgT25BZEVycm9yKGFkRXZlbnQpO1xyXG4gICAgfSA7XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHNbQUxMX0FEU19DT01QTEVURURdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgTElTVEVORVIgOiBcIiwgYWRFdmVudC50eXBlKTtcclxuXHJcbiAgICAgICAgaXNBbGxBZENvbXBlbGV0ZSA9IHRydWU7XHJcbiAgICAgICAgaWYoYWRzU3BlYy5pc1ZpZGVvRW5kZWQpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzW0NMSUNLXSA9IChhZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZRVJfQ0xJQ0tFRCwge3R5cGUgOiBQTEFZRVJfQURfQ0xJQ0t9KTtcclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50c1tGSVJTVF9RVUFSVElMRV0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgfTtcclxuICAgIC8vXHJcbiAgICBsb3dMZXZlbEV2ZW50c1tBRF9CVUZGRVJJTkddID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRF9CVUZGRVJJTkdcIixhZEV2ZW50LnR5cGUpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzW0xPQURFRF0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgICAgIGxldCByZW1haW5pbmdUaW1lID0gYWRzTWFuYWdlci5nZXRSZW1haW5pbmdUaW1lKCk7XHJcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfTE9BREVELCB7cmVtYWluaW5nIDogcmVtYWluaW5nVGltZSwgaXNMaW5lYXIgOiBhZC5pc0xpbmVhcigpIH0pO1xyXG5cclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50c1tNSURQT0lOVF0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzW1BBVVNFRF0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BBVVNFRCk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHNbUkVTVU1FRF0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHNbU1RBUlRFRF0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcclxuICAgICAgICBjdXJyZW50QWQgPSBhZDtcclxuXHJcbiAgICAgICAgbGV0IGFkT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgLFxyXG4gICAgICAgICAgICBkdXJhdGlvbiA6IGFkLmdldER1cmF0aW9uKCksXHJcbiAgICAgICAgICAgIHNraXBUaW1lT2Zmc2V0IDogYWQuZ2V0U2tpcFRpbWVPZmZzZXQoKSAgICAgLy9UaGUgbnVtYmVyIG9mIHNlY29uZHMgb2YgcGxheWJhY2sgYmVmb3JlIHRoZSBhZCBiZWNvbWVzIHNraXBwYWJsZS5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfQ0hBTkdFRCwgYWRPYmplY3QpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcclxuXHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xyXG4gICAgICAgICAgICBhZHNTcGVjLnN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBGb3IgYSBsaW5lYXIgYWQsIGEgdGltZXIgY2FuIGJlIHN0YXJ0ZWQgdG8gcG9sbCBmb3JcclxuICAgICAgICAgICAgLy8gdGhlIHJlbWFpbmluZyB0aW1lLlxyXG4gICAgICAgICAgICBpbnRlcnZhbFRpbWVyID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGFkLmdldER1cmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfVElNRSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiA6IGR1cmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBza2lwVGltZU9mZnNldCA6IGFkLmdldFNraXBUaW1lT2Zmc2V0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZyA6IHJlbWFpbmluZ1RpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogZHVyYXRpb24gLSByZW1haW5pbmdUaW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBza2lwcGFibGUgOiBhZHNNYW5hZ2VyLmdldEFkU2tpcHBhYmxlU3RhdGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMCk7IC8vIGV2ZXJ5IDMwMG1zXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHNbQ09NUExFVEVdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcclxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XHJcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XHJcbiAgICB9O1xyXG4gICAgLy9Vc2VyIHNraXBwZWQgYWQuIHNhbWUgcHJvY2VzcyBvbiBjb21wbGV0ZS5cclxuICAgIGxvd0xldmVsRXZlbnRzW1NLSVBQRURdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcclxuXHJcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xyXG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzW1VTRVJfQ0xPU0VdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcclxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XHJcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHNbVEhJUkRfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XHJcbiAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICAgICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICB9KTtcclxuICAgIHRoYXQuc2V0QWRDb21wbGV0ZUNhbGxiYWNrID0gKF9hZENvbXBsZXRlQ2FsbGJhY2spID0+IHtcclxuICAgICAgICBhZENvbXBsZXRlQ2FsbGJhY2sgPSBfYWRDb21wbGV0ZUNhbGxiYWNrO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNBbGxBZENvbXBsZXRlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBpc0FsbEFkQ29tcGVsZXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNMaW5lYXJBZCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gY3VycmVudEFkICA/IGN1cnJlbnRBZC5pc0xpbmVhcigpIDogdHJ1ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUFFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xyXG4gICAgICAgIC8vcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XHJcbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyNy8wNi8yMDE5LlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFRFTVBfVklERU9fVVJMID0gXCJkYXRhOnZpZGVvL21wNDtiYXNlNjQsIEFBQUFIR1owZVhCTk5GWWdBQUFDQUdsemIyMXBjMjh5WVhaak1RQUFBQWhtY21WbEFBQUdGMjFrWVhUZUJBQUFiR2xpWm1GaFl5QXhMakk0QUFCQ0FKTWdCRElBUndBQUFyRUdCZi8vcmR4RjZiM20yVWkzbGl6WUlOa2o3dTk0TWpZMElDMGdZMjl5WlNBeE5ESWdjaklnT1RVMll6aGtPQ0F0SUVndU1qWTBMMDFRUlVjdE5DQkJWa01nWTI5a1pXTWdMU0JEYjNCNWJHVm1kQ0F5TURBekxUSXdNVFFnTFNCb2RIUndPaTh2ZDNkM0xuWnBaR1Z2YkdGdUxtOXlaeTk0TWpZMExtaDBiV3dnTFNCdmNIUnBiMjV6T2lCallXSmhZejB3SUhKbFpqMHpJR1JsWW14dlkyczlNVG93T2pBZ1lXNWhiSGx6WlQwd2VERTZNSGd4TVRFZ2JXVTlhR1Y0SUhOMVltMWxQVGNnY0hONVBURWdjSE41WDNKa1BURXVNREE2TUM0d01DQnRhWGhsWkY5eVpXWTlNU0J0WlY5eVlXNW5aVDB4TmlCamFISnZiV0ZmYldVOU1TQjBjbVZzYkdselBURWdPSGc0WkdOMFBUQWdZM0Z0UFRBZ1pHVmhaSHB2Ym1VOU1qRXNNVEVnWm1GemRGOXdjMnRwY0QweElHTm9jbTl0WVY5eGNGOXZabVp6WlhROUxUSWdkR2h5WldGa2N6MDJJR3h2YjJ0aGFHVmhaRjkwYUhKbFlXUnpQVEVnYzJ4cFkyVmtYM1JvY21WaFpITTlNQ0J1Y2owd0lHUmxZMmx0WVhSbFBURWdhVzUwWlhKc1lXTmxaRDB3SUdKc2RYSmhlVjlqYjIxd1lYUTlNQ0JqYjI1emRISmhhVzVsWkY5cGJuUnlZVDB3SUdKbWNtRnRaWE05TUNCM1pXbG5hSFJ3UFRBZ2EyVjVhVzUwUFRJMU1DQnJaWGxwYm5SZmJXbHVQVEkxSUhOalpXNWxZM1YwUFRRd0lHbHVkSEpoWDNKbFpuSmxjMmc5TUNCeVkxOXNiMjlyWVdobFlXUTlOREFnY21NOVkzSm1JRzFpZEhKbFpUMHhJR055WmoweU15NHdJSEZqYjIxd1BUQXVOakFnY1hCdGFXNDlNQ0J4Y0cxaGVEMDJPU0J4Y0hOMFpYQTlOQ0IyWW5aZmJXRjRjbUYwWlQwM05qZ2dkbUoyWDJKMVpuTnBlbVU5TXpBd01DQmpjbVpmYldGNFBUQXVNQ0J1WVd4ZmFISmtQVzV2Ym1VZ1ptbHNiR1Z5UFRBZ2FYQmZjbUYwYVc4OU1TNDBNQ0JoY1QweE9qRXVNREFBZ0FBQUFGWmxpSVFMOG1LQUFLdk1uSnljbkp5Y25KeWNuWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWGlFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBZEJtamdYNEdTQUlRQkprQUlaQUNPQUFBQUFCMEdhVkFYNEdTQWhBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QUFBQUFHUVpwZ0w4REpJUUJKa0FJWkFDT0FJUUJKa0FJWkFDT0FBQUFBQmtHYWdDL0F5U0VBU1pBQ0dRQWpnQUFBQUFaQm1xQXZ3TWtoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFBR1FackFMOERKSVFCSmtBSVpBQ09BQUFBQUJrR2E0Qy9BeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtd0F2d01raEFFbVFBaGtBSTRBQUFBQUdRWnNnTDhESklRQkprQUlaQUNPQUlRQkprQUlaQUNPQUFBQUFCa0diUUMvQXlTRUFTWkFDR1FBamdDRUFTWkFDR1FBamdBQUFBQVpCbTJBdndNa2hBRW1RQWhrQUk0QUFBQUFHUVp1QUw4REpJUUJKa0FJWkFDT0FJUUJKa0FJWkFDT0FBQUFBQmtHYm9DL0F5U0VBU1pBQ0dRQWpnQUFBQUFaQm04QXZ3TWtoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFBR1FadmdMOERKSVFCSmtBSVpBQ09BQUFBQUJrR2FBQy9BeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtaUF2d01raEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBQUFBQUdRWnBBTDhESklRQkprQUlaQUNPQUFBQUFCa0dhWUMvQXlTRUFTWkFDR1FBamdDRUFTWkFDR1FBamdBQUFBQVpCbW9BdndNa2hBRW1RQWhrQUk0QUFBQUFHUVpxZ0w4REpJUUJKa0FJWkFDT0FJUUJKa0FJWkFDT0FBQUFBQmtHYXdDL0F5U0VBU1pBQ0dRQWpnQUFBQUFaQm11QXZ3TWtoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFBR1Fac0FMOERKSVFCSmtBSVpBQ09BQUFBQUJrR2JJQy9BeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtMEF2d01raEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBQUFBQUdRWnRnTDhESklRQkprQUlaQUNPQUFBQUFCa0diZ0N2QXlTRUFTWkFDR1FBamdDRUFTWkFDR1FBamdBQUFBQVpCbTZBbndNa2hBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QUFBQWh1Ylc5dmRnQUFBR3h0ZG1oa0FBQUFBQUFBQUFBQUFBQUFBQUFENkFBQUJEY0FBUUFBQVFBQUFBQUFBQUFBQUFBQUFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUF3QUFBekIwY21GckFBQUFYSFJyYUdRQUFBQURBQUFBQUFBQUFBQUFBQUFCQUFBQUFBQUFBK2tBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUVBQUFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFCQUFBQUFBTEFBQUFDUUFBQUFBQUFrWldSMGN3QUFBQnhsYkhOMEFBQUFBQUFBQUFFQUFBUHBBQUFBQUFBQkFBQUFBQUtvYldScFlRQUFBQ0J0Wkdoa0FBQUFBQUFBQUFBQUFBQUFBQUIxTUFBQWRVNVZ4QUFBQUFBQUxXaGtiSElBQUFBQUFBQUFBSFpwWkdVQUFBQUFBQUFBQUFBQUFBQldhV1JsYjBoaGJtUnNaWElBQUFBQ1UyMXBibVlBQUFBVWRtMW9aQUFBQUFFQUFBQUFBQUFBQUFBQUFDUmthVzVtQUFBQUhHUnlaV1lBQUFBQUFBQUFBUUFBQUF4MWNtd2dBQUFBQVFBQUFoTnpkR0pzQUFBQXIzTjBjMlFBQUFBQUFBQUFBUUFBQUo5aGRtTXhBQUFBQUFBQUFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFMQUFrQUJJQUFBQVNBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBR1AvL0FBQUFMV0YyWTBNQlFzQU4vK0VBRldkQ3dBM1pBc1RzQkVBQUFQcEFBRHFZQThVS2tnRUFCV2pMZzhzZ0FBQUFISFYxYVdScmFFRHlYeVJQeGJvNXBSdlBBeVB6QUFBQUFBQUFBQmh6ZEhSekFBQUFBQUFBQUFFQUFBQWVBQUFENlFBQUFCUnpkSE56QUFBQUFBQUFBQUVBQUFBQkFBQUFISE4wYzJNQUFBQUFBQUFBQVFBQUFBRUFBQUFCQUFBQUFRQUFBSXh6ZEhONkFBQUFBQUFBQUFBQUFBQWVBQUFERHdBQUFBc0FBQUFMQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQWlITjBZMjhBQUFBQUFBQUFIZ0FBQUVZQUFBTm5BQUFEZXdBQUE1Z0FBQU8wQUFBRHh3QUFBK01BQUFQMkFBQUVFZ0FBQkNVQUFBUkJBQUFFWFFBQUJIQUFBQVNNQUFBRW53QUFCTHNBQUFUT0FBQUU2Z0FBQlFZQUFBVVpBQUFGTlFBQUJVZ0FBQVZrQUFBRmR3QUFCWk1BQUFXbUFBQUZ3Z0FBQmQ0QUFBWHhBQUFHRFFBQUJHaDBjbUZyQUFBQVhIUnJhR1FBQUFBREFBQUFBQUFBQUFBQUFBQUNBQUFBQUFBQUJEY0FBQUFBQUFBQUFBQUFBQUVCQUFBQUFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQWtaV1IwY3dBQUFCeGxiSE4wQUFBQUFBQUFBQUVBQUFRa0FBQURjQUFCQUFBQUFBUGdiV1JwWVFBQUFDQnRaR2hrQUFBQUFBQUFBQUFBQUFBQUFBQzdnQUFBeWtCVnhBQUFBQUFBTFdoa2JISUFBQUFBQUFBQUFITnZkVzRBQUFBQUFBQUFBQUFBQUFCVGIzVnVaRWhoYm1Sc1pYSUFBQUFEaTIxcGJtWUFBQUFRYzIxb1pBQUFBQUFBQUFBQUFBQUFKR1JwYm1ZQUFBQWNaSEpsWmdBQUFBQUFBQUFCQUFBQURIVnliQ0FBQUFBQkFBQURUM04wWW13QUFBQm5jM1J6WkFBQUFBQUFBQUFCQUFBQVYyMXdOR0VBQUFBQUFBQUFBUUFBQUFBQUFBQUFBQUlBRUFBQUFBQzdnQUFBQUFBQU0yVnpaSE1BQUFBQUE0Q0FnQ0lBQWdBRWdJQ0FGRUFWQmJqWUFBdTRBQUFBRGNvRmdJQ0FBaEdRQm9DQWdBRUNBQUFBSUhOMGRITUFBQUFBQUFBQUFnQUFBRElBQUFRQUFBQUFBUUFBQWtBQUFBRlVjM1J6WXdBQUFBQUFBQUFiQUFBQUFRQUFBQUVBQUFBQkFBQUFBZ0FBQUFJQUFBQUJBQUFBQXdBQUFBRUFBQUFCQUFBQUJBQUFBQUlBQUFBQkFBQUFCZ0FBQUFFQUFBQUJBQUFBQndBQUFBSUFBQUFCQUFBQUNBQUFBQUVBQUFBQkFBQUFDUUFBQUFJQUFBQUJBQUFBQ2dBQUFBRUFBQUFCQUFBQUN3QUFBQUlBQUFBQkFBQUFEUUFBQUFFQUFBQUJBQUFBRGdBQUFBSUFBQUFCQUFBQUR3QUFBQUVBQUFBQkFBQUFFQUFBQUFJQUFBQUJBQUFBRVFBQUFBRUFBQUFCQUFBQUVnQUFBQUlBQUFBQkFBQUFGQUFBQUFFQUFBQUJBQUFBRlFBQUFBSUFBQUFCQUFBQUZnQUFBQUVBQUFBQkFBQUFGd0FBQUFJQUFBQUJBQUFBR0FBQUFBRUFBQUFCQUFBQUdRQUFBQUlBQUFBQkFBQUFHZ0FBQUFFQUFBQUJBQUFBR3dBQUFBSUFBQUFCQUFBQUhRQUFBQUVBQUFBQkFBQUFIZ0FBQUFJQUFBQUJBQUFBSHdBQUFBUUFBQUFCQUFBQTRITjBjM29BQUFBQUFBQUFBQUFBQURNQUFBQWFBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFDTWMzUmpid0FBQUFBQUFBQWZBQUFBTEFBQUExVUFBQU55QUFBRGhnQUFBNklBQUFPK0FBQUQwUUFBQSswQUFBUUFBQUFFSEFBQUJDOEFBQVJMQUFBRVp3QUFCSG9BQUFTV0FBQUVxUUFBQk1VQUFBVFlBQUFFOUFBQUJSQUFBQVVqQUFBRlB3QUFCVklBQUFWdUFBQUZnUUFBQlowQUFBV3dBQUFGekFBQUJlZ0FBQVg3QUFBR0Z3QUFBR0oxWkhSaEFBQUFXbTFsZEdFQUFBQUFBQUFBSVdoa2JISUFBQUFBQUFBQUFHMWthWEpoY0hCc0FBQUFBQUFBQUFBQUFBQUFMV2xzYzNRQUFBQWxxWFJ2YndBQUFCMWtZWFJoQUFBQUFRQUFBQUJNWVhabU5UVXVNek11TVRBd1wiO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDI1LzA2LzIwMTkuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgVkFTVENsaWVudCwgVkFTVFRyYWNrZXIgfSBmcm9tICd1dGlscy92YXN0LWNsaWVudCc7XHJcbmltcG9ydCBBZHNFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL2Fkcy92YXN0L0xpc3RlbmVyXCI7XHJcbmltcG9ydCB7VEVNUF9WSURFT19VUkx9IGZyb20gXCJhcGkvYWRzL3V0aWxzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBFUlJPUixcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX0FEX0xPQURFRCxcclxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXHJcbiAgICBTVEFURV9BRF9QQVVTRUQsXHJcbiAgICBTVEFURV9BRF9DT01QTEVURSxcclxuICAgIFNUQVRFX0FEX0VSUk9SLFxyXG4gICAgQ09OVEVOVF9NRVRBLFxyXG4gICAgUFJPVklERVJfREFTSFxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCBBZCA9IGZ1bmN0aW9uKGVsVmlkZW8sIHByb3ZpZGVyLCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcclxuICAgIGNvbnN0IEFVVE9QTEFZX05PVF9BTExPV0VEID0gXCJhdXRvcGxheU5vdEFsbG93ZWRcIjtcclxuXHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IHNwZWMgPSB7XHJcbiAgICAgICAgc3RhcnRlZDogZmFsc2UsIC8vcGxheWVyIHN0YXJ0ZWRcclxuICAgICAgICBhY3RpdmUgOiBmYWxzZSwgLy9vbiBBZFxyXG4gICAgICAgIGlzVmlkZW9FbmRlZCA6IGZhbHNlLFxyXG4gICAgICAgIGxhbmcgOiBwbGF5ZXJDb25maWcuZ2V0TGFuZ3VhZ2UoKVxyXG4gICAgfTtcclxuICAgIGxldCBhZHNFcnJvck9jY3VycmVkID0gZmFsc2U7XHJcbiAgICBsZXQgbGlzdGVuZXIgPSBudWxsO1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBcIlwiO1xyXG4gICAgbGV0IGVsQWRWaWRlbyA9IG51bGw7XHJcbiAgICBsZXQgdGV4dFZpZXcgPSBcIlwiO1xyXG4gICAgbGV0IGFkQnV0dG9uID0gXCJcIjtcclxuXHJcbiAgICBsZXQgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2UsIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGJyb3dzZXIgPSBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpO1xyXG4gICAgbGV0IGlzTW9iaWxlID0gYnJvd3Nlci5vcyA9PT0gXCJBbmRyb2lkXCIgfHwgYnJvd3Nlci5vcyA9PT0gXCJpT1NcIjtcclxuXHJcbiAgICBjb25zdCBjcmVhdGVBZENvbnRhaW5lciA9ICgpID0+IHtcclxuICAgICAgICBsZXQgYWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ29wLWFkcycpO1xyXG4gICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnb3AtYWRzJyk7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpLmFwcGVuZChhZENvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIGVsQWRWaWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgZWxBZFZpZGVvLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpO1xyXG4gICAgICAgIGVsQWRWaWRlby5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ0FkdmVydGlzZW1lbnQnKTtcclxuICAgICAgICBlbEFkVmlkZW8uc2V0QXR0cmlidXRlKCdjbGFzcycsICdvcC1hZHMtdmFzdC12aWRlbycpO1xyXG5cclxuICAgICAgICBhZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGFkQnV0dG9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3AtYWRzLWJ1dHRvbicpO1xyXG5cclxuICAgICAgICB0ZXh0VmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRleHRWaWV3LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3AtYWRzLXRleHR2aWV3Jyk7XHJcblxyXG4gICAgICAgIGFkQnV0dG9uLmFwcGVuZCh0ZXh0Vmlldyk7XHJcbiAgICAgICAgYWRDb250YWluZXIuYXBwZW5kKGVsQWRWaWRlbyk7XHJcbiAgICAgICAgYWRDb250YWluZXIuYXBwZW5kKGFkQnV0dG9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFkQ29udGFpbmVyO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb250YWluZXIgPSBjcmVhdGVBZENvbnRhaW5lcigpO1xyXG5cclxuICAgIGxldCB2YXN0Q2xpZW50ID0gbmV3IFZBU1RDbGllbnQoKTtcclxuICAgIGxldCB2YXN0VHJhY2tlciA9IG51bGw7XHJcbiAgICBsZXQgYWQgPSBudWxsO1xyXG5cclxuXHJcbiAgICBjb25zdCBPbkFkRXJyb3IgPSBmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIGFkc0Vycm9yT2NjdXJyZWQgPSB0cnVlO1xyXG4gICAgICAgIGVsQWRWaWRlby5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9FUlJPUiwge2NvZGUgOiBlcnJvci5jb2RlLCBtZXNzYWdlIDogZXJyb3IubWVzc2FnZX0pO1xyXG4gICAgICAgIHNwZWMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc3BlYy5zdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICBwcm92aWRlci5wbGF5KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGluaXRSZXF1ZXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhc3RDbGllbnQuZ2V0KGFkVGFnVXJsKSAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCB0aGUgcGFyc2VkIFZBU1QgcmVzcG9uc2VcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGluaXRSZXF1ZXN0KClcIik7XHJcbiAgICAgICAgICAgIGFkID0gcmVzLmFkc1swXTtcclxuICAgICAgICAgICAgaWYoIWFkKXtcclxuICAgICAgICAgICAgICAgIHRocm93IHtjb2RlIDogNDAxLCBtZXNzYWdlIDogXCJGaWxlIG5vdCBmb3VuZC4gVW5hYmxlIHRvIGZpbmQgTGluZWFyL01lZGlhRmlsZSBmcm9tIFVSSS5cIn07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFzdFRyYWNrZXIgPSBuZXcgVkFTVFRyYWNrZXIodmFzdENsaWVudCwgYWQsIGFkLmNyZWF0aXZlc1swXSk7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogY3JlYXRlZCBhZCB0cmFja2VyLlwiKTtcclxuXHJcbiAgICAgICAgICAgIGxpc3RlbmVyID0gQWRzRXZlbnRzTGlzdGVuZXIoZWxBZFZpZGVvLCB2YXN0VHJhY2tlciwgcHJvdmlkZXIsIHNwZWMsIGFkQnV0dG9uLCB0ZXh0VmlldywgT25BZEVycm9yKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2aWRlb1VSTCA9ICBcIlwiO1xyXG4gICAgICAgICAgICBpZihhZC5jcmVhdGl2ZXMgJiYgYWQuY3JlYXRpdmVzLmxlbmd0aCA+IDAgJiYgYWQuY3JlYXRpdmVzWzBdLm1lZGlhRmlsZXMgJiYgYWQuY3JlYXRpdmVzWzBdLm1lZGlhRmlsZXMubGVuZ3RoID4gMCAmJiBhZC5jcmVhdGl2ZXNbMF0ubWVkaWFGaWxlc1swXS5maWxlVVJMKXtcclxuICAgICAgICAgICAgICAgIHZpZGVvVVJMID0gYWQuY3JlYXRpdmVzWzBdLm1lZGlhRmlsZXNbMF0uZmlsZVVSTDtcclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBtZWRpYSB1cmwgOiBcIiwgdmlkZW9VUkwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsQWRWaWRlby5zcmMgPSB2aWRlb1VSTDtcclxuXHJcbiAgICAgICAgICAgIC8va2VlcCB2b2x1bWUgZXZlbiBpZiBwbGF5bGlzdCBpdGVtIGNoYW5nZXMuXHJcbiAgICAgICAgICAgIGVsQWRWaWRlby52b2x1bWUgPSBlbFZpZGVvLnZvbHVtZTtcclxuICAgICAgICAgICAgZWxBZFZpZGVvLm11dGVkID0gZWxWaWRlby5tdXRlZDtcclxuXHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICBPbkFkRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBjb25zdCBjaGVja0F1dG9wbGF5U3VwcG9ydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogY2hlY2tBdXRvcGxheVN1cHBvcnQoKSBcIik7XHJcblxyXG4gICAgICAgIGxldCB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8uc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XHJcbiAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8uc3JjID0gVEVNUF9WSURFT19VUkw7XHJcbiAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ubG9hZCgpO1xyXG5cclxuXHJcbiAgICAgICAgZWxBZFZpZGVvLmxvYWQoKTsgICAvL2ZvciBpb3MgVXNlciBJbnRlcmFjdGlvbiBwcm9ibGVtXHJcbiAgICAgICAgLy9EYXNoIGhhcyBhbHJlYWR5IGxvYWRlZCB3aGVuIHRyaWdnZXJlZCBwcm92aWRlci5wbGF5KCkgYWx3YXlzLlxyXG4gICAgICAgIGlmKGlzTW9iaWxlICYmIHByb3ZpZGVyLmdldE5hbWUoKSAhPT0gUFJPVklERVJfREFTSCApe1xyXG4gICAgICAgICAgICAvL01haW4gdmlkZW8gc2V0cyB1c2VyIGdlc3R1cmUgd2hlbiB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlbyB0cmlnZ2VyZWQgY2hlY2tpbmcuXHJcbiAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbGVhckFuZFJlcG9ydCA9IGZ1bmN0aW9uKF9hdXRvcGxheUFsbG93ZWQsIF9hdXRvcGxheVJlcXVpcmVzTXV0ZWQpe1xyXG4gICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBfYXV0b3BsYXlBbGxvd2VkO1xyXG4gICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBfYXV0b3BsYXlSZXF1aXJlc011dGVkO1xyXG4gICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5yZW1vdmUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICAgICAgaWYoIXRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBsYXkpe1xyXG4gICAgICAgICAgICAgICAgLy9JIGNhbid0IHJlbWVtYmVyIHRoaXMgY2FzZS4uLlxyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6ICF0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5XCIpO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBwbGF5UHJvbWlzZSA9IHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5UHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogYXV0byBwbGF5IGFsbG93ZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBtYWtlIGl0IGhlcmUsIHVubXV0ZWQgYXV0b3BsYXkgd29ya3MuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGF1dG8gcGxheSBmYWlsZWRcIiwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBwcm9taXNlIG5vdCBzdXBwb3J0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vTWF5YmUgdGhpcyBpcyBJRTExLi4uLlxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoYXQuaXNBY3RpdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuYWN0aXZlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc3RhcnRlZCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5zdGFydGVkO1xyXG4gICAgfTtcclxuICAgIHRoYXQucGxheSA9ICgpID0+IHtcclxuICAgICAgICBpZihzcGVjLnN0YXJ0ZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gZWxBZFZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja01haW5Db250ZW50TG9hZGVkID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy93YWl0IGZvciBtYWluIGNvbnRlbnRzIG1ldGEgbG9hZGVkLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vaGF2ZSB0byB0cmlnZ2VyIENPTlRFTlRfTUVUQSBmaXJzdC4gbmV4dCB0cmlnZ2VyIEFEX0NIQU5HRUQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pbml0Q29udHJvbFVJIGZpcnN0IC0+ICBpbml0IGFkIFVJXHJcbiAgICAgICAgICAgICAgICAgICAgLy9NYXliZSBnb29nbGUgaW1hIHdhaXRzIGNvbnRlbnQgbG9hZGVkIGludGVybmFsLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHByb3ZpZGVyLm1ldGFMb2FkZWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBtYWluIGNvbnRlbnRzIG1ldGEgbG9hZGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBdXRvcGxheVN1cHBvcnQoKS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpICYmICFhdXRvcGxheUFsbG93ZWQpICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGF1dG9wbGF5QWxsb3dlZCA6IGZhbHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMuc3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoQVVUT1BMQVlfTk9UX0FMTE9XRUQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrTWFpbkNvbnRlbnRMb2FkZWQsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBjaGVja01haW5Db250ZW50TG9hZGVkKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcclxuICAgICAgICBlbEFkVmlkZW8ucGF1c2UoKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9FbmQgT2YgTWFpbiBDb250ZW50cy5cclxuICAgIHRoYXQudmlkZW9FbmRlZENhbGxiYWNrID0gKGNvbXBsZXRlQ29udGVudENhbGxiYWNrKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbXBsZXRlQ29udGVudENhbGxiYWNrKCk7XHJcbiAgICAgICAgLy9jaGVjayB0cnVlIHdoZW4gbWFpbiBjb250ZW50cyBlbmRlZC5cclxuICAgICAgICBzcGVjLmlzVmlkZW9FbmRlZCA9IHRydWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKGxpc3RlbmVyKXtcclxuICAgICAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBsaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhc3RUcmFja2VyID0gbnVsbDtcclxuICAgICAgICB2YXN0Q2xpZW50ID0gbnVsbDtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xyXG5cclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFkOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjYvMDYvMjAxOS5cclxuICovXHJcbmltcG9ydCB7XHJcbiAgICBFUlJPUixcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX0FEX0xPQURFRCxcclxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXHJcbiAgICBTVEFURV9BRF9QQVVTRUQsXHJcbiAgICBTVEFURV9BRF9DT01QTEVURSxcclxuICAgIEFEX0NIQU5HRUQsXHJcbiAgICBBRF9USU1FLFxyXG4gICAgU1RBVEVfUEFVU0VELFxyXG4gICAgU1RBVEVfRVJST1IsXHJcbiAgICBDT05URU5UX0NPTVBMRVRFLFxyXG4gICAgQ09OVEVOVF9TRUVLLFxyXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcclxuICAgIENPTlRFTlRfU0VFS0VELFxyXG4gICAgQ09OVEVOVF9CVUZGRVIsXHJcbiAgICBDT05URU5UX1RJTUUsXHJcbiAgICBDT05URU5UX1ZPTFVNRSxcclxuICAgIENPTlRFTlRfTUVUQSxcclxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcclxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxyXG4gICAgUExBWUVSX1NUQVRFLFxyXG4gICAgUExBWUVSX0NMSUNLRUQsXHJcbiAgICBQTEFZRVJfQURfQ0xJQ0ssXHJcbiAgICBQUk9WSURFUl9IVE1MNSxcclxuICAgIFBST1ZJREVSX1dFQlJUQyxcclxuICAgIFBST1ZJREVSX0RBU0gsXHJcbiAgICBQUk9WSURFUl9ITFNcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcclxuXHJcbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxBZFZpZGVvLCB2YXN0VHJhY2tlciwgcHJvdmlkZXIsIGFkc1NwZWMsIGFkQnV0dG9uLCB0ZXh0VmlldywgT25BZEVycm9yKXtcclxuICAgIGNvbnN0IGxvd0xldmVsRXZlbnRzID0ge307XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgY29uc3QgTUVESUFGSUxFX1BMQVlCQUNLX0VSUk9SID0gJzQwNSc7XHJcblxyXG4gICAgbGV0ICR0ZXh0VmlldyA9IExBJCh0ZXh0Vmlldyk7XHJcbiAgICBsZXQgJGFkQnV0dG9uID0gTEEkKGFkQnV0dG9uKTtcclxuICAgIGxldCAkZWxBZFZpZGVvID0gTEEkKGVsQWRWaWRlbyk7XHJcblxyXG4gICAgcHJvdmlkZXIub24oQ09OVEVOVF9WT0xVTUUsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZihkYXRhLm11dGUpe1xyXG4gICAgICAgICAgICBlbEFkVmlkZW8ubXV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBlbEFkVmlkZW8ubXV0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxBZFZpZGVvLnZvbHVtZSA9IGRhdGEudm9sdW1lLzEwMDtcclxuICAgICAgICB9XHJcbiAgICB9LCB0aGF0KTtcclxuXHJcbiAgICAvL0xpa2UgYSBDT05URU5UX1JFU1VNRV9SRVFVRVNURURcclxuICAgIGNvbnN0IHByb2Nlc3NFbmRPZkFkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBhZHNTcGVjLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAkYWRCdXR0b24uaGlkZSgpO1xyXG5cclxuICAgICAgICBpZihhZHNTcGVjLnN0YXJ0ZWQgJiYgKHByb3ZpZGVyLmdldFBvc2l0aW9uKCkgPT09IDAgfHwgIWFkc1NwZWMuaXNWaWRlb0VuZGVkKSAgKXtcclxuICAgICAgICAgICAgJGVsQWRWaWRlby5oaWRlKCk7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XHJcbiAgICB9O1xyXG4gICAgLy9MaWtlIGEgQ09OVEVOVF9QQVVTRV9SRVFVRVNURURcclxuICAgIGNvbnN0IHByb2Nlc3NTdGFydE9mQWQgPSBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAkZWxBZFZpZGVvLnNob3coKTtcclxuICAgICAgICAkYWRCdXR0b24uc2hvdygpO1xyXG5cclxuICAgIH07XHJcbiAgICBjb25zdCBza2lwQnV0dG9uQ2xpY2tlZCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBpZigkdGV4dFZpZXcuaGFzQ2xhc3MoXCJ2aWRlb0FkVWlBY3Rpb25cIikpe1xyXG4gICAgICAgICAgICB2YXN0VHJhY2tlci5za2lwKCk7XHJcbiAgICAgICAgICAgIGVsQWRWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgICAgICBwcm9jZXNzRW5kT2ZBZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGV4dFZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNraXBCdXR0b25DbGlja2VkLCBmYWxzZSk7XHJcblxyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBlcnJvci5cIiwgZWxBZFZpZGVvLmVycm9yKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZBU1QgOiBsaXN0ZW5lciA6IGVycm9yLlwiLCBlbEFkVmlkZW8uZXJyb3IpO1xyXG4gICAgICAgIGxldCBlcnJvciA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxBZFZpZGVvLmVycm9yICYmIGVsQWRWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xyXG5cclxuICAgICAgICBpZihjb2RlID09PSAyKSB7XHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPSA0MDI7XHJcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBcIlRpbWVvdXQgb2YgTWVkaWFGaWxlIFVSSS5cIjtcclxuICAgICAgICB9ZWxzZSBpZihjb2RlID09PSAzKXtcclxuICAgICAgICAgICAgZXJyb3IuY29kZSA9IDQwNTtcclxuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IFwiUHJvYmxlbSBkaXNwbGF5aW5nIE1lZGlhRmlsZS4gVmlkZW8gcGxheWVyIGZvdW5kIGEgTWVkaWFGaWxlIHdpdGggc3VwcG9ydGVkIHR5cGUgYnV0IGNvdWxkbuKAmXQgZGlzcGxheSBpdC4gTWVkaWFGaWxlIG1heSBpbmNsdWRlOiB1bnN1cHBvcnRlZCBjb2RlY3MsIGRpZmZlcmVudCBNSU1FIHR5cGUgdGhhbiBNZWRpYUZpbGVAdHlwZSwgdW5zdXBwb3J0ZWQgZGVsaXZlcnkgbWV0aG9kLCBldGMuXCI7XHJcbiAgICAgICAgfWVsc2UgaWYoY29kZSA9PT0gNCl7XHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPSA0MDM7XHJcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBcIkNvdWxkbuKAmXQgZmluZCBNZWRpYUZpbGUgdGhhdCBpcyBzdXBwb3J0ZWQgYnkgdGhpcyB2aWRlbyBwbGF5ZXIsIGJhc2VkIG9uIHRoZSBhdHRyaWJ1dGVzIG9mIHRoZSBNZWRpYUZpbGUgZWxlbWVudC5cIjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZXJyb3IuY29kZSA9IDQwMDtcclxuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IFwiR2VuZXJhbCBMaW5lYXIgZXJyb3IuIFZpZGVvIHBsYXllciBpcyB1bmFibGUgdG8gZGlzcGxheSB0aGUgTGluZWFyIEFkLlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXN0VHJhY2tlci5lcnJvcldpdGhDb2RlKGVycm9yLmNvZGUpO1xyXG4gICAgICAgIE9uQWRFcnJvcihNRURJQUZJTEVfUExBWUJBQ0tfRVJST1IpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5jYW5wbGF5ID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHMuZW5kZWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhc3RUcmFja2VyLmNvbXBsZXRlKCk7XHJcblxyXG4gICAgICAgIHByb2Nlc3NFbmRPZkFkKCk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHMuY2xpY2sgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgdmFzdFRyYWNrZXIuY2xpY2soKTtcclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXN0VHJhY2tlci5zZXRQYXVzZWQoZmFsc2UpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXN0VHJhY2tlci5zZXRQYXVzZWQodHJ1ZSk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB2YXN0VHJhY2tlci5zZXRQcm9ncmVzcyhldmVudC50YXJnZXQuY3VycmVudFRpbWUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfVElNRSwge1xyXG4gICAgICAgICAgICBkdXJhdGlvbiA6IGVsQWRWaWRlby5kdXJhdGlvbixcclxuICAgICAgICAgICAgcG9zaXRpb24gOiBlbEFkVmlkZW8uY3VycmVudFRpbWVcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50cy52b2x1bWVjaGFuZ2UgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogQWQgVmlkZW8gVm9sdW1lY2hhbmdlLlwiKTtcclxuICAgICAgICB2YXN0VHJhY2tlci5zZXRNdXRlZChldmVudC50YXJnZXQubXV0ZWQpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBBZCBDT05URU5UIExPQURFRCAuXCIpO1xyXG5cclxuICAgICAgICAvL0ZsYXNoIHBsYXkgaXMgdmVyeSBmYXN0Li4uXHJcbiAgICAgICAgaWYoU1RBVEVfUExBWUlORyA9PT0gcHJvdmlkZXIuZ2V0U3RhdGUoKSl7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXN0VHJhY2tlci50cmFja0ltcHJlc3Npb24oKTtcclxuXHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9MT0FERUQsIHtyZW1haW5pbmcgOiBlbEFkVmlkZW8uZHVyYXRpb24sIGlzTGluZWFyIDogdHJ1ZX0pO1xyXG4gICAgICAgIGVsQWRWaWRlby5wbGF5KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhc3RUcmFja2VyLm9uKCdza2lwJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIHNraXAgdHJhY2tpbmcgVVJMcyBoYXZlIGJlZW4gY2FsbGVkXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogc2tpcHBlZFwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhc3RUcmFja2VyLm9uKCdtdXRlJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIG11dGUgdHJhY2tpbmcgVVJMcyBoYXZlIGJlZW4gY2FsbGVkXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogbXV0ZWRcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXN0VHJhY2tlci5vbigndW5tdXRlJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIHVubXV0ZSB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiB1bm11dGVkXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFzdFRyYWNrZXIub24oJ3Jlc3VtZScsICgpID0+IHtcclxuICAgICAgICAvLyByZXN1bWUgdHJhY2tpbmcgVVJMcyBoYXZlIGJlZW4gY2FsbGVkXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogdmFzdFRyYWNrZXIgcmVzdW1lZC5cIik7XHJcblxyXG4gICAgICAgIC8vcHJldmVudCB0byBzZXQgU1RBVEVfQURfUExBWUlORyB3aGVuIGZpcnN0IHBsYXkuXHJcbiAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkKXtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG4gICAgdmFzdFRyYWNrZXIub24oJ3BhdXNlJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIHBhdXNlIHRyYWNraW5nIFVSTHMgaGF2ZSBiZWVuIGNhbGxlZFxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBsaXN0ZW5lciA6IHZhc3RUcmFja2VyIHBhdXNlZC5cIik7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUEFVU0VEKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhc3RUcmFja2VyLm9uKCdjbGlja3Rocm91Z2gnLCB1cmwgPT4ge1xyXG4gICAgICAgIC8vIE9wZW4gdGhlIHJlc29sdmVkIGNsaWNrVGhyb3VnaCB1cmxcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBjbGlja3Rocm91Z2ggOlwiLCB1cmwpO1xyXG4gICAgICAgIC8vZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcclxuICAgICAgICB3aW5kb3cub3Blbih1cmwsICdfYmxhbmsnKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXN0VHJhY2tlci5vbignc2tpcC1jb3VudGRvd24nLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGlmKGRhdGEgPT09IDApe1xyXG4gICAgICAgICAgICBpZihhZHNTcGVjLmxhbmcgPT09IFwia29cIil7XHJcbiAgICAgICAgICAgICAgICAkdGV4dFZpZXcuaHRtbChcIuq0keqzoCDqsbTrhIjrm7DquLA8aSBjbGFzcz0nb3AtY29uIG9wLWFycm93LXJpZ2h0IGJ0bi1yaWdodCc+PC9pPlwiKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkdGV4dFZpZXcuaHRtbChcIkFkIFNraXA8aSBjbGFzcz0nb3AtY29uIG9wLWFycm93LXJpZ2h0IGJ0bi1yaWdodCc+PC9pPlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkdGV4dFZpZXcuYWRkQ2xhc3MoXCJ2aWRlb0FkVWlBY3Rpb25cIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKGFkc1NwZWMubGFuZyA9PT0gXCJrb1wiKXtcclxuICAgICAgICAgICAgICAgICR0ZXh0Vmlldy5odG1sKChwYXJzZUludChkYXRhKSsxKStcIuy0iCDtm4Tsl5Ag7J20IOq0keqzoOulvCDqsbTrhIjrm7gg7IiYIOyeiOyKteuLiOuLpC5cIik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJHRleHRWaWV3Lmh0bWwoXCJZb3UgY2FuIHNraXAgdGhpcyBhZCBpbiBcIisocGFyc2VJbnQoZGF0YSkrMSkpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdmFzdFRyYWNrZXIub24oJ3Jld2luZCcsICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiByZXdpbmRcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXN0VHJhY2tlci5vbignc3RhcnQnLCAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogc3RhcnRlZFwiKTtcclxuXHJcbiAgICAgICAgYWRzU3BlYy5zdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICBhZHNTcGVjLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgcHJvY2Vzc1N0YXJ0T2ZBZCgpO1xyXG5cclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEFEX0NIQU5HRUQsIHtpc0xpbmVhciA6IHRydWV9KTtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QTEFZSU5HKTtcclxuICAgIH0pO1xyXG4gICAgdmFzdFRyYWNrZXIub24oJ2ZpcnN0UXVhcnRpbGUnLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gZmlyc3RRdWFydGlsZSB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBmaXJzdFF1YXJ0aWxlXCIpO1xyXG4gICAgfSk7XHJcbiAgICB2YXN0VHJhY2tlci5vbignbWlkcG9pbnQnLCAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogbWlkcG9pbnRcIik7XHJcbiAgICB9KTtcclxuICAgIHZhc3RUcmFja2VyLm9uKCd0aGlyZFF1YXJ0aWxlJywgKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBsaXN0ZW5lciA6IHRoaXJkUXVhcnRpbGVcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXN0VHJhY2tlci5vbignY3JlYXRpdmVWaWV3JywgKCkgPT4ge1xyXG4gICAgICAgIC8vIGltcHJlc3Npb24gdHJhY2tpbmcgVVJMcyBoYXZlIGJlZW4gY2FsbGVkXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogY3JlYXRpdmVWaWV3XCIpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XHJcbiAgICAgICAgZWxBZFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgICAgICBlbEFkVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcclxuICAgICAgICB0ZXh0Vmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2tpcEJ1dHRvbkNsaWNrZWQsIGZhbHNlKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xyXG4gICAgICAgICAgICBlbEFkVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLypDb3B5cmlnaHQgKGMpIDIwMTMgT2xpdmllciBQb2l0cmV5IDxyc0BkYWlseW1vdGlvbi5jb20+XHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZFxyXG4gdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS4qL1xyXG5jbGFzcyBBZHtjb25zdHJ1Y3Rvcigpe3RoaXMuaWQ9bnVsbCx0aGlzLnNlcXVlbmNlPW51bGwsdGhpcy5zeXN0ZW09bnVsbCx0aGlzLnRpdGxlPW51bGwsdGhpcy5kZXNjcmlwdGlvbj1udWxsLHRoaXMuYWR2ZXJ0aXNlcj1udWxsLHRoaXMucHJpY2luZz1udWxsLHRoaXMuc3VydmV5PW51bGwsdGhpcy5lcnJvclVSTFRlbXBsYXRlcz1bXSx0aGlzLmltcHJlc3Npb25VUkxUZW1wbGF0ZXM9W10sdGhpcy5jcmVhdGl2ZXM9W10sdGhpcy5leHRlbnNpb25zPVtdfX1jbGFzcyBBZEV4dGVuc2lvbntjb25zdHJ1Y3Rvcigpe3RoaXMuYXR0cmlidXRlcz17fSx0aGlzLmNoaWxkcmVuPVtdfX1jbGFzcyBBZEV4dGVuc2lvbkNoaWxke2NvbnN0cnVjdG9yKCl7dGhpcy5uYW1lPW51bGwsdGhpcy52YWx1ZT1udWxsLHRoaXMuYXR0cmlidXRlcz17fX19Y2xhc3MgQ29tcGFuaW9uQWR7Y29uc3RydWN0b3IoKXt0aGlzLmlkPW51bGwsdGhpcy53aWR0aD0wLHRoaXMuaGVpZ2h0PTAsdGhpcy50eXBlPW51bGwsdGhpcy5zdGF0aWNSZXNvdXJjZT1udWxsLHRoaXMuaHRtbFJlc291cmNlPW51bGwsdGhpcy5pZnJhbWVSZXNvdXJjZT1udWxsLHRoaXMuYWx0VGV4dD1udWxsLHRoaXMuY29tcGFuaW9uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9bnVsbCx0aGlzLmNvbXBhbmlvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9W10sdGhpcy50cmFja2luZ0V2ZW50cz17fX19Y2xhc3MgQ3JlYXRpdmV7Y29uc3RydWN0b3IoZT17fSl7dGhpcy5pZD1lLmlkfHxudWxsLHRoaXMuYWRJZD1lLmFkSWR8fG51bGwsdGhpcy5zZXF1ZW5jZT1lLnNlcXVlbmNlfHxudWxsLHRoaXMuYXBpRnJhbWV3b3JrPWUuYXBpRnJhbWV3b3JrfHxudWxsLHRoaXMudHJhY2tpbmdFdmVudHM9e319fWNsYXNzIENyZWF0aXZlQ29tcGFuaW9uIGV4dGVuZHMgQ3JlYXRpdmV7Y29uc3RydWN0b3IoZT17fSl7c3VwZXIoZSksdGhpcy50eXBlPVwiY29tcGFuaW9uXCIsdGhpcy52YXJpYXRpb25zPVtdfX1mdW5jdGlvbiB0cmFjayhlLHQpe3Jlc29sdmVVUkxUZW1wbGF0ZXMoZSx0KS5mb3JFYWNoKGU9PntpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZudWxsIT09d2luZG93KXsobmV3IEltYWdlKS5zcmM9ZX19KX1mdW5jdGlvbiByZXNvbHZlVVJMVGVtcGxhdGVzKGUsdD17fSl7Y29uc3Qgcj1bXTt0LkFTU0VUVVJJJiYodC5BU1NFVFVSST1lbmNvZGVVUklDb21wb25lbnRSRkMzOTg2KHQuQVNTRVRVUkkpKSx0LkNPTlRFTlRQTEFZSEVBRCYmKHQuQ09OVEVOVFBMQVlIRUFEPWVuY29kZVVSSUNvbXBvbmVudFJGQzM5ODYodC5DT05URU5UUExBWUhFQUQpKSx0LkVSUk9SQ09ERSYmIS9eWzAtOV17M30kLy50ZXN0KHQuRVJST1JDT0RFKSYmKHQuRVJST1JDT0RFPTkwMCksdC5DQUNIRUJVU1RJTkc9bGVmdHBhZChNYXRoLnJvdW5kKDFlOCpNYXRoLnJhbmRvbSgpKS50b1N0cmluZygpKSx0LlRJTUVTVEFNUD1lbmNvZGVVUklDb21wb25lbnRSRkMzOTg2KChuZXcgRGF0ZSkudG9JU09TdHJpbmcoKSksdC5SQU5ET009dC5yYW5kb209dC5DQUNIRUJVU1RJTkc7Zm9yKGxldCBpIGluIGUpe2xldCBzPWVbaV07aWYoXCJzdHJpbmdcIj09dHlwZW9mIHMpe2ZvcihsZXQgZSBpbiB0KXtjb25zdCByPXRbZV0saT1gWyR7ZX1dYCxuPWAlJSR7ZX0lJWA7cz0ocz1zLnJlcGxhY2UoaSxyKSkucmVwbGFjZShuLHIpfXIucHVzaChzKX19cmV0dXJuIHJ9ZnVuY3Rpb24gZW5jb2RlVVJJQ29tcG9uZW50UkZDMzk4NihlKXtyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGUpLnJlcGxhY2UoL1shJygpKl0vZyxlPT5gJSR7ZS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KX1gKX1mdW5jdGlvbiBsZWZ0cGFkKGUpe3JldHVybiBlLmxlbmd0aDw4P3JhbmdlKDAsOC1lLmxlbmd0aCwhMSkubWFwKGU9PlwiMFwiKS5qb2luKFwiXCIpK2U6ZX1mdW5jdGlvbiByYW5nZShlLHQscil7bGV0IGk9W10scz1lPHQsbj1yP3M/dCsxOnQtMTp0O2ZvcihsZXQgdD1lO3M/dDxuOnQ+bjtzP3QrKzp0LS0paS5wdXNoKHQpO3JldHVybiBpfWZ1bmN0aW9uIGlzTnVtZXJpYyhlKXtyZXR1cm4haXNOYU4ocGFyc2VGbG9hdChlKSkmJmlzRmluaXRlKGUpfWZ1bmN0aW9uIGZsYXR0ZW4oZSl7cmV0dXJuIGUucmVkdWNlKChlLHQpPT5lLmNvbmNhdChBcnJheS5pc0FycmF5KHQpP2ZsYXR0ZW4odCk6dCksW10pfWNvbnN0IHV0aWw9e3RyYWNrOnRyYWNrLHJlc29sdmVVUkxUZW1wbGF0ZXM6cmVzb2x2ZVVSTFRlbXBsYXRlcyxlbmNvZGVVUklDb21wb25lbnRSRkMzOTg2OmVuY29kZVVSSUNvbXBvbmVudFJGQzM5ODYsbGVmdHBhZDpsZWZ0cGFkLHJhbmdlOnJhbmdlLGlzTnVtZXJpYzppc051bWVyaWMsZmxhdHRlbjpmbGF0dGVufTtmdW5jdGlvbiBjaGlsZEJ5TmFtZShlLHQpe2NvbnN0IHI9ZS5jaGlsZE5vZGVzO2ZvcihsZXQgZSBpbiByKXtjb25zdCBpPXJbZV07aWYoaS5ub2RlTmFtZT09PXQpcmV0dXJuIGl9fWZ1bmN0aW9uIGNoaWxkcmVuQnlOYW1lKGUsdCl7Y29uc3Qgcj1bXSxpPWUuY2hpbGROb2Rlcztmb3IobGV0IGUgaW4gaSl7Y29uc3Qgcz1pW2VdO3Mubm9kZU5hbWU9PT10JiZyLnB1c2gocyl9cmV0dXJuIHJ9ZnVuY3Rpb24gcmVzb2x2ZVZhc3RBZFRhZ1VSSShlLHQpe2lmKCF0KXJldHVybiBlO2lmKDA9PT1lLmluZGV4T2YoXCIvL1wiKSl7Y29uc3R7cHJvdG9jb2w6dH09bG9jYXRpb247cmV0dXJuYCR7dH0ke2V9YH1pZigtMT09PWUuaW5kZXhPZihcIjovL1wiKSl7cmV0dXJuYCR7dC5zbGljZSgwLHQubGFzdEluZGV4T2YoXCIvXCIpKX0vJHtlfWB9cmV0dXJuIGV9ZnVuY3Rpb24gcGFyc2VCb29sZWFuKGUpe3JldHVybi0xIT09W1widHJ1ZVwiLFwiVFJVRVwiLFwiMVwiXS5pbmRleE9mKGUpfWZ1bmN0aW9uIHBhcnNlTm9kZVRleHQoZSl7cmV0dXJuIGUmJihlLnRleHRDb250ZW50fHxlLnRleHR8fFwiXCIpLnRyaW0oKX1mdW5jdGlvbiBjb3B5Tm9kZUF0dHJpYnV0ZShlLHQscil7Y29uc3QgaT10LmdldEF0dHJpYnV0ZShlKTtpJiZyLnNldEF0dHJpYnV0ZShlLGkpfWZ1bmN0aW9uIHBhcnNlRHVyYXRpb24oZSl7aWYobnVsbD09ZSlyZXR1cm4tMTtpZih1dGlsLmlzTnVtZXJpYyhlKSlyZXR1cm4gcGFyc2VJbnQoZSk7Y29uc3QgdD1lLnNwbGl0KFwiOlwiKTtpZigzIT09dC5sZW5ndGgpcmV0dXJuLTE7Y29uc3Qgcj10WzJdLnNwbGl0KFwiLlwiKTtsZXQgaT1wYXJzZUludChyWzBdKTsyPT09ci5sZW5ndGgmJihpKz1wYXJzZUZsb2F0KGAwLiR7clsxXX1gKSk7Y29uc3Qgcz1wYXJzZUludCg2MCp0WzFdKSxuPXBhcnNlSW50KDYwKnRbMF0qNjApO3JldHVybiBpc05hTihuKXx8aXNOYU4ocyl8fGlzTmFOKGkpfHxzPjM2MDB8fGk+NjA/LTE6bitzK2l9ZnVuY3Rpb24gc3BsaXRWQVNUKGUpe2NvbnN0IHQ9W107bGV0IHI9bnVsbDtyZXR1cm4gZS5mb3JFYWNoKChpLHMpPT57aWYoaS5zZXF1ZW5jZSYmKGkuc2VxdWVuY2U9cGFyc2VJbnQoaS5zZXF1ZW5jZSwxMCkpLGkuc2VxdWVuY2U+MSl7Y29uc3QgdD1lW3MtMV07aWYodCYmdC5zZXF1ZW5jZT09PWkuc2VxdWVuY2UtMSlyZXR1cm4gdm9pZChyJiZyLnB1c2goaSkpO2RlbGV0ZSBpLnNlcXVlbmNlfXI9W2ldLHQucHVzaChyKX0pLHR9ZnVuY3Rpb24gbWVyZ2VXcmFwcGVyQWREYXRhKGUsdCl7ZS5lcnJvclVSTFRlbXBsYXRlcz10LmVycm9yVVJMVGVtcGxhdGVzLmNvbmNhdChlLmVycm9yVVJMVGVtcGxhdGVzKSxlLmltcHJlc3Npb25VUkxUZW1wbGF0ZXM9dC5pbXByZXNzaW9uVVJMVGVtcGxhdGVzLmNvbmNhdChlLmltcHJlc3Npb25VUkxUZW1wbGF0ZXMpLGUuZXh0ZW5zaW9ucz10LmV4dGVuc2lvbnMuY29uY2F0KGUuZXh0ZW5zaW9ucyksZS5jcmVhdGl2ZXMuZm9yRWFjaChlPT57aWYodC50cmFja2luZ0V2ZW50cyYmdC50cmFja2luZ0V2ZW50c1tlLnR5cGVdKWZvcihsZXQgciBpbiB0LnRyYWNraW5nRXZlbnRzW2UudHlwZV0pe2NvbnN0IGk9dC50cmFja2luZ0V2ZW50c1tlLnR5cGVdW3JdO2UudHJhY2tpbmdFdmVudHNbcl18fChlLnRyYWNraW5nRXZlbnRzW3JdPVtdKSxlLnRyYWNraW5nRXZlbnRzW3JdPWUudHJhY2tpbmdFdmVudHNbcl0uY29uY2F0KGkpfX0pLHQudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzJiZ0LnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5sZW5ndGgmJmUuY3JlYXRpdmVzLmZvckVhY2goZT0+e1wibGluZWFyXCI9PT1lLnR5cGUmJihlLnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz1lLnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5jb25jYXQodC52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMpKX0pLHQudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcyYmdC52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzLmxlbmd0aCYmZS5jcmVhdGl2ZXMuZm9yRWFjaChlPT57XCJsaW5lYXJcIj09PWUudHlwZSYmKGUudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcz1lLnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMuY29uY2F0KHQudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcykpfSksdC52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlJiZlLmNyZWF0aXZlcy5mb3JFYWNoKGU9PntcImxpbmVhclwiPT09ZS50eXBlJiZudWxsPT1lLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUmJihlLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9dC52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlKX0pfWNvbnN0IHBhcnNlclV0aWxzPXtjaGlsZEJ5TmFtZTpjaGlsZEJ5TmFtZSxjaGlsZHJlbkJ5TmFtZTpjaGlsZHJlbkJ5TmFtZSxyZXNvbHZlVmFzdEFkVGFnVVJJOnJlc29sdmVWYXN0QWRUYWdVUkkscGFyc2VCb29sZWFuOnBhcnNlQm9vbGVhbixwYXJzZU5vZGVUZXh0OnBhcnNlTm9kZVRleHQsY29weU5vZGVBdHRyaWJ1dGU6Y29weU5vZGVBdHRyaWJ1dGUscGFyc2VEdXJhdGlvbjpwYXJzZUR1cmF0aW9uLHNwbGl0VkFTVDpzcGxpdFZBU1QsbWVyZ2VXcmFwcGVyQWREYXRhOm1lcmdlV3JhcHBlckFkRGF0YX07ZnVuY3Rpb24gcGFyc2VDcmVhdGl2ZUNvbXBhbmlvbihlLHQpe2NvbnN0IHI9bmV3IENyZWF0aXZlQ29tcGFuaW9uKHQpO3JldHVybiBwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiQ29tcGFuaW9uXCIpLmZvckVhY2goZT0+e2NvbnN0IHQ9bmV3IENvbXBhbmlvbkFkO3QuaWQ9ZS5nZXRBdHRyaWJ1dGUoXCJpZFwiKXx8bnVsbCx0LndpZHRoPWUuZ2V0QXR0cmlidXRlKFwid2lkdGhcIiksdC5oZWlnaHQ9ZS5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiksdC5jb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPVtdLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJIVE1MUmVzb3VyY2VcIikuZm9yRWFjaChlPT57dC50eXBlPWUuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHxcInRleHQvaHRtbFwiLHQuaHRtbFJlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiSUZyYW1lUmVzb3VyY2VcIikuZm9yRWFjaChlPT57dC50eXBlPWUuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHwwLHQuaWZyYW1lUmVzb3VyY2U9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJTdGF0aWNSZXNvdXJjZVwiKS5mb3JFYWNoKHI9Pnt0LnR5cGU9ci5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fDAscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIkFsdFRleHRcIikuZm9yRWFjaChlPT57dC5hbHRUZXh0PXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KSx0LnN0YXRpY1Jlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocil9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiVHJhY2tpbmdFdmVudHNcIikuZm9yRWFjaChlPT57cGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlRyYWNraW5nXCIpLmZvckVhY2goZT0+e2NvbnN0IHI9ZS5nZXRBdHRyaWJ1dGUoXCJldmVudFwiKSxpPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSk7ciYmaSYmKG51bGw9PXQudHJhY2tpbmdFdmVudHNbcl0mJih0LnRyYWNraW5nRXZlbnRzW3JdPVtdKSx0LnRyYWNraW5nRXZlbnRzW3JdLnB1c2goaSkpfSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiQ29tcGFuaW9uQ2xpY2tUcmFja2luZ1wiKS5mb3JFYWNoKGU9Pnt0LmNvbXBhbmlvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMucHVzaChwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpKX0pLHQuY29tcGFuaW9uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiQ29tcGFuaW9uQ2xpY2tUaHJvdWdoXCIpKSx0LmNvbXBhbmlvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJDb21wYW5pb25DbGlja1RyYWNraW5nXCIpKSxyLnZhcmlhdGlvbnMucHVzaCh0KX0pLHJ9Y2xhc3MgQ3JlYXRpdmVMaW5lYXIgZXh0ZW5kcyBDcmVhdGl2ZXtjb25zdHJ1Y3RvcihlPXt9KXtzdXBlcihlKSx0aGlzLnR5cGU9XCJsaW5lYXJcIix0aGlzLmR1cmF0aW9uPTAsdGhpcy5za2lwRGVsYXk9bnVsbCx0aGlzLm1lZGlhRmlsZXM9W10sdGhpcy52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPW51bGwsdGhpcy52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9W10sdGhpcy52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzPVtdLHRoaXMuYWRQYXJhbWV0ZXJzPW51bGwsdGhpcy5pY29ucz1bXX19Y2xhc3MgSWNvbntjb25zdHJ1Y3Rvcigpe3RoaXMucHJvZ3JhbT1udWxsLHRoaXMuaGVpZ2h0PTAsdGhpcy53aWR0aD0wLHRoaXMueFBvc2l0aW9uPTAsdGhpcy55UG9zaXRpb249MCx0aGlzLmFwaUZyYW1ld29yaz1udWxsLHRoaXMub2Zmc2V0PW51bGwsdGhpcy5kdXJhdGlvbj0wLHRoaXMudHlwZT1udWxsLHRoaXMuc3RhdGljUmVzb3VyY2U9bnVsbCx0aGlzLmh0bWxSZXNvdXJjZT1udWxsLHRoaXMuaWZyYW1lUmVzb3VyY2U9bnVsbCx0aGlzLmljb25DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT1udWxsLHRoaXMuaWNvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9W10sdGhpcy5pY29uVmlld1RyYWNraW5nVVJMVGVtcGxhdGU9bnVsbH19Y2xhc3MgTWVkaWFGaWxle2NvbnN0cnVjdG9yKCl7dGhpcy5pZD1udWxsLHRoaXMuZmlsZVVSTD1udWxsLHRoaXMuZGVsaXZlcnlUeXBlPVwicHJvZ3Jlc3NpdmVcIix0aGlzLm1pbWVUeXBlPW51bGwsdGhpcy5jb2RlYz1udWxsLHRoaXMuYml0cmF0ZT0wLHRoaXMubWluQml0cmF0ZT0wLHRoaXMubWF4Qml0cmF0ZT0wLHRoaXMud2lkdGg9MCx0aGlzLmhlaWdodD0wLHRoaXMuYXBpRnJhbWV3b3JrPW51bGwsdGhpcy5zY2FsYWJsZT1udWxsLHRoaXMubWFpbnRhaW5Bc3BlY3RSYXRpbz1udWxsfX1mdW5jdGlvbiBwYXJzZUNyZWF0aXZlTGluZWFyKGUsdCl7bGV0IHI7Y29uc3QgaT1uZXcgQ3JlYXRpdmVMaW5lYXIodCk7aS5kdXJhdGlvbj1wYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIkR1cmF0aW9uXCIpKSk7Y29uc3Qgcz1lLmdldEF0dHJpYnV0ZShcInNraXBvZmZzZXRcIik7aWYobnVsbD09cylpLnNraXBEZWxheT1udWxsO2Vsc2UgaWYoXCIlXCI9PT1zLmNoYXJBdChzLmxlbmd0aC0xKSYmLTEhPT1pLmR1cmF0aW9uKXtjb25zdCBlPXBhcnNlSW50KHMsMTApO2kuc2tpcERlbGF5PWkuZHVyYXRpb24qKGUvMTAwKX1lbHNlIGkuc2tpcERlbGF5PXBhcnNlclV0aWxzLnBhcnNlRHVyYXRpb24ocyk7Y29uc3Qgbj1wYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiVmlkZW9DbGlja3NcIik7biYmKGkudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKG4sXCJDbGlja1Rocm91Z2hcIikpLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKG4sXCJDbGlja1RyYWNraW5nXCIpLmZvckVhY2goZT0+e2kudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLnB1c2gocGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShuLFwiQ3VzdG9tQ2xpY2tcIikuZm9yRWFjaChlPT57aS52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzLnB1c2gocGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKSl9KSk7Y29uc3QgYT1wYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiQWRQYXJhbWV0ZXJzXCIpO2EmJihpLmFkUGFyYW1ldGVycz1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGEpKSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiVHJhY2tpbmdFdmVudHNcIikuZm9yRWFjaChlPT57cGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlRyYWNraW5nXCIpLmZvckVhY2goZT0+e2xldCB0PWUuZ2V0QXR0cmlidXRlKFwiZXZlbnRcIik7Y29uc3Qgcz1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpO2lmKHQmJnMpe2lmKFwicHJvZ3Jlc3NcIj09PXQpe2lmKCEocj1lLmdldEF0dHJpYnV0ZShcIm9mZnNldFwiKSkpcmV0dXJuO3Q9XCIlXCI9PT1yLmNoYXJBdChyLmxlbmd0aC0xKT9gcHJvZ3Jlc3MtJHtyfWA6YHByb2dyZXNzLSR7TWF0aC5yb3VuZChwYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKHIpKX1gfW51bGw9PWkudHJhY2tpbmdFdmVudHNbdF0mJihpLnRyYWNraW5nRXZlbnRzW3RdPVtdKSxpLnRyYWNraW5nRXZlbnRzW3RdLnB1c2gocyl9fSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiTWVkaWFGaWxlc1wiKS5mb3JFYWNoKGU9PntwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiTWVkaWFGaWxlXCIpLmZvckVhY2goZT0+e2NvbnN0IHQ9bmV3IE1lZGlhRmlsZTt0LmlkPWUuZ2V0QXR0cmlidXRlKFwiaWRcIiksdC5maWxlVVJMPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSksdC5kZWxpdmVyeVR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJkZWxpdmVyeVwiKSx0LmNvZGVjPWUuZ2V0QXR0cmlidXRlKFwiY29kZWNcIiksdC5taW1lVHlwZT1lLmdldEF0dHJpYnV0ZShcInR5cGVcIiksdC5hcGlGcmFtZXdvcms9ZS5nZXRBdHRyaWJ1dGUoXCJhcGlGcmFtZXdvcmtcIiksdC5iaXRyYXRlPXBhcnNlSW50KGUuZ2V0QXR0cmlidXRlKFwiYml0cmF0ZVwiKXx8MCksdC5taW5CaXRyYXRlPXBhcnNlSW50KGUuZ2V0QXR0cmlidXRlKFwibWluQml0cmF0ZVwiKXx8MCksdC5tYXhCaXRyYXRlPXBhcnNlSW50KGUuZ2V0QXR0cmlidXRlKFwibWF4Qml0cmF0ZVwiKXx8MCksdC53aWR0aD1wYXJzZUludChlLmdldEF0dHJpYnV0ZShcIndpZHRoXCIpfHwwKSx0LmhlaWdodD1wYXJzZUludChlLmdldEF0dHJpYnV0ZShcImhlaWdodFwiKXx8MCk7bGV0IHI9ZS5nZXRBdHRyaWJ1dGUoXCJzY2FsYWJsZVwiKTtyJiZcInN0cmluZ1wiPT10eXBlb2YgciYmKFwidHJ1ZVwiPT09KHI9ci50b0xvd2VyQ2FzZSgpKT90LnNjYWxhYmxlPSEwOlwiZmFsc2VcIj09PXImJih0LnNjYWxhYmxlPSExKSk7bGV0IHM9ZS5nZXRBdHRyaWJ1dGUoXCJtYWludGFpbkFzcGVjdFJhdGlvXCIpO3MmJlwic3RyaW5nXCI9PXR5cGVvZiBzJiYoXCJ0cnVlXCI9PT0ocz1zLnRvTG93ZXJDYXNlKCkpP3QubWFpbnRhaW5Bc3BlY3RSYXRpbz0hMDpcImZhbHNlXCI9PT1zJiYodC5tYWludGFpbkFzcGVjdFJhdGlvPSExKSksaS5tZWRpYUZpbGVzLnB1c2godCl9KX0pO2NvbnN0IG89cGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIkljb25zXCIpO3JldHVybiBvJiZwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShvLFwiSWNvblwiKS5mb3JFYWNoKGU9Pntjb25zdCB0PW5ldyBJY29uO3QucHJvZ3JhbT1lLmdldEF0dHJpYnV0ZShcInByb2dyYW1cIiksdC5oZWlnaHQ9cGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIil8fDApLHQud2lkdGg9cGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKXx8MCksdC54UG9zaXRpb249cGFyc2VYUG9zaXRpb24oZS5nZXRBdHRyaWJ1dGUoXCJ4UG9zaXRpb25cIikpLHQueVBvc2l0aW9uPXBhcnNlWVBvc2l0aW9uKGUuZ2V0QXR0cmlidXRlKFwieVBvc2l0aW9uXCIpKSx0LmFwaUZyYW1ld29yaz1lLmdldEF0dHJpYnV0ZShcImFwaUZyYW1ld29ya1wiKSx0Lm9mZnNldD1wYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKGUuZ2V0QXR0cmlidXRlKFwib2Zmc2V0XCIpKSx0LmR1cmF0aW9uPXBhcnNlclV0aWxzLnBhcnNlRHVyYXRpb24oZS5nZXRBdHRyaWJ1dGUoXCJkdXJhdGlvblwiKSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIkhUTUxSZXNvdXJjZVwiKS5mb3JFYWNoKGU9Pnt0LnR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fFwidGV4dC9odG1sXCIsdC5odG1sUmVzb3VyY2U9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJJRnJhbWVSZXNvdXJjZVwiKS5mb3JFYWNoKGU9Pnt0LnR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fDAsdC5pZnJhbWVSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlN0YXRpY1Jlc291cmNlXCIpLmZvckVhY2goZT0+e3QudHlwZT1lLmdldEF0dHJpYnV0ZShcImNyZWF0aXZlVHlwZVwiKXx8MCx0LnN0YXRpY1Jlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KTtjb25zdCByPXBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJJY29uQ2xpY2tzXCIpO3ImJih0Lmljb25DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKHIsXCJJY29uQ2xpY2tUaHJvdWdoXCIpKSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShyLFwiSWNvbkNsaWNrVHJhY2tpbmdcIikuZm9yRWFjaChlPT57dC5pY29uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5wdXNoKHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSkpfSkpLHQuaWNvblZpZXdUcmFja2luZ1VSTFRlbXBsYXRlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIkljb25WaWV3VHJhY2tpbmdcIikpLGkuaWNvbnMucHVzaCh0KX0pLGl9ZnVuY3Rpb24gcGFyc2VYUG9zaXRpb24oZSl7cmV0dXJuLTEhPT1bXCJsZWZ0XCIsXCJyaWdodFwiXS5pbmRleE9mKGUpP2U6cGFyc2VJbnQoZXx8MCl9ZnVuY3Rpb24gcGFyc2VZUG9zaXRpb24oZSl7cmV0dXJuLTEhPT1bXCJ0b3BcIixcImJvdHRvbVwiXS5pbmRleE9mKGUpP2U6cGFyc2VJbnQoZXx8MCl9Y2xhc3MgQ3JlYXRpdmVOb25MaW5lYXIgZXh0ZW5kcyBDcmVhdGl2ZXtjb25zdHJ1Y3RvcihlPXt9KXtzdXBlcihlKSx0aGlzLnR5cGU9XCJub25saW5lYXJcIix0aGlzLnZhcmlhdGlvbnM9W119fWNsYXNzIE5vbkxpbmVhckFke2NvbnN0cnVjdG9yKCl7dGhpcy5pZD1udWxsLHRoaXMud2lkdGg9MCx0aGlzLmhlaWdodD0wLHRoaXMuZXhwYW5kZWRXaWR0aD0wLHRoaXMuZXhwYW5kZWRIZWlnaHQ9MCx0aGlzLnNjYWxhYmxlPSEwLHRoaXMubWFpbnRhaW5Bc3BlY3RSYXRpbz0hMCx0aGlzLm1pblN1Z2dlc3RlZER1cmF0aW9uPTAsdGhpcy5hcGlGcmFtZXdvcms9XCJzdGF0aWNcIix0aGlzLnR5cGU9bnVsbCx0aGlzLnN0YXRpY1Jlc291cmNlPW51bGwsdGhpcy5odG1sUmVzb3VyY2U9bnVsbCx0aGlzLmlmcmFtZVJlc291cmNlPW51bGwsdGhpcy5ub25saW5lYXJDbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT1udWxsLHRoaXMubm9ubGluZWFyQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz1bXSx0aGlzLmFkUGFyYW1ldGVycz1udWxsfX1mdW5jdGlvbiBwYXJzZUNyZWF0aXZlTm9uTGluZWFyKGUsdCl7Y29uc3Qgcj1uZXcgQ3JlYXRpdmVOb25MaW5lYXIodCk7cmV0dXJuIHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJUcmFja2luZ0V2ZW50c1wiKS5mb3JFYWNoKGU9PntsZXQgdCxpO3BhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJUcmFja2luZ1wiKS5mb3JFYWNoKGU9Pnt0PWUuZ2V0QXR0cmlidXRlKFwiZXZlbnRcIiksaT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpLHQmJmkmJihudWxsPT1yLnRyYWNraW5nRXZlbnRzW3RdJiYoci50cmFja2luZ0V2ZW50c1t0XT1bXSksci50cmFja2luZ0V2ZW50c1t0XS5wdXNoKGkpKX0pfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIk5vbkxpbmVhclwiKS5mb3JFYWNoKGU9Pntjb25zdCB0PW5ldyBOb25MaW5lYXJBZDt0LmlkPWUuZ2V0QXR0cmlidXRlKFwiaWRcIil8fG51bGwsdC53aWR0aD1lLmdldEF0dHJpYnV0ZShcIndpZHRoXCIpLHQuaGVpZ2h0PWUuZ2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIpLHQuZXhwYW5kZWRXaWR0aD1lLmdldEF0dHJpYnV0ZShcImV4cGFuZGVkV2lkdGhcIiksdC5leHBhbmRlZEhlaWdodD1lLmdldEF0dHJpYnV0ZShcImV4cGFuZGVkSGVpZ2h0XCIpLHQuc2NhbGFibGU9cGFyc2VyVXRpbHMucGFyc2VCb29sZWFuKGUuZ2V0QXR0cmlidXRlKFwic2NhbGFibGVcIikpLHQubWFpbnRhaW5Bc3BlY3RSYXRpbz1wYXJzZXJVdGlscy5wYXJzZUJvb2xlYW4oZS5nZXRBdHRyaWJ1dGUoXCJtYWludGFpbkFzcGVjdFJhdGlvXCIpKSx0Lm1pblN1Z2dlc3RlZER1cmF0aW9uPXBhcnNlclV0aWxzLnBhcnNlRHVyYXRpb24oZS5nZXRBdHRyaWJ1dGUoXCJtaW5TdWdnZXN0ZWREdXJhdGlvblwiKSksdC5hcGlGcmFtZXdvcms9ZS5nZXRBdHRyaWJ1dGUoXCJhcGlGcmFtZXdvcmtcIikscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIkhUTUxSZXNvdXJjZVwiKS5mb3JFYWNoKGU9Pnt0LnR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fFwidGV4dC9odG1sXCIsdC5odG1sUmVzb3VyY2U9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJJRnJhbWVSZXNvdXJjZVwiKS5mb3JFYWNoKGU9Pnt0LnR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fDAsdC5pZnJhbWVSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlN0YXRpY1Jlc291cmNlXCIpLmZvckVhY2goZT0+e3QudHlwZT1lLmdldEF0dHJpYnV0ZShcImNyZWF0aXZlVHlwZVwiKXx8MCx0LnN0YXRpY1Jlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KTtjb25zdCBpPXBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJBZFBhcmFtZXRlcnNcIik7aSYmKHQuYWRQYXJhbWV0ZXJzPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaSkpLHQubm9ubGluZWFyQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiTm9uTGluZWFyQ2xpY2tUaHJvdWdoXCIpKSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiTm9uTGluZWFyQ2xpY2tUcmFja2luZ1wiKS5mb3JFYWNoKGU9Pnt0Lm5vbmxpbmVhckNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMucHVzaChwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpKX0pLHIudmFyaWF0aW9ucy5wdXNoKHQpfSkscn1mdW5jdGlvbiBwYXJzZUFkKGUpe2NvbnN0IHQ9ZS5jaGlsZE5vZGVzO2ZvcihsZXQgciBpbiB0KXtjb25zdCBpPXRbcl07aWYoLTEhPT1bXCJXcmFwcGVyXCIsXCJJbkxpbmVcIl0uaW5kZXhPZihpLm5vZGVOYW1lKSl7aWYocGFyc2VyVXRpbHMuY29weU5vZGVBdHRyaWJ1dGUoXCJpZFwiLGUsaSkscGFyc2VyVXRpbHMuY29weU5vZGVBdHRyaWJ1dGUoXCJzZXF1ZW5jZVwiLGUsaSksXCJXcmFwcGVyXCI9PT1pLm5vZGVOYW1lKXJldHVybiBwYXJzZVdyYXBwZXIoaSk7aWYoXCJJbkxpbmVcIj09PWkubm9kZU5hbWUpcmV0dXJuIHBhcnNlSW5MaW5lKGkpfX19ZnVuY3Rpb24gcGFyc2VJbkxpbmUoZSl7Y29uc3QgdD1lLmNoaWxkTm9kZXMscj1uZXcgQWQ7ci5pZD1lLmdldEF0dHJpYnV0ZShcImlkXCIpfHxudWxsLHIuc2VxdWVuY2U9ZS5nZXRBdHRyaWJ1dGUoXCJzZXF1ZW5jZVwiKXx8bnVsbDtmb3IobGV0IGUgaW4gdCl7Y29uc3QgaT10W2VdO3N3aXRjaChpLm5vZGVOYW1lKXtjYXNlXCJFcnJvclwiOnIuZXJyb3JVUkxUZW1wbGF0ZXMucHVzaChwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpKTticmVhaztjYXNlXCJJbXByZXNzaW9uXCI6ci5pbXByZXNzaW9uVVJMVGVtcGxhdGVzLnB1c2gocGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKSk7YnJlYWs7Y2FzZVwiQ3JlYXRpdmVzXCI6cGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoaSxcIkNyZWF0aXZlXCIpLmZvckVhY2goZT0+e2NvbnN0IHQ9e2lkOmUuZ2V0QXR0cmlidXRlKFwiaWRcIil8fG51bGwsYWRJZDpwYXJzZUNyZWF0aXZlQWRJZEF0dHJpYnV0ZShlKSxzZXF1ZW5jZTplLmdldEF0dHJpYnV0ZShcInNlcXVlbmNlXCIpfHxudWxsLGFwaUZyYW1ld29yazplLmdldEF0dHJpYnV0ZShcImFwaUZyYW1ld29ya1wiKXx8bnVsbH07Zm9yKGxldCBpIGluIGUuY2hpbGROb2Rlcyl7Y29uc3Qgcz1lLmNoaWxkTm9kZXNbaV07c3dpdGNoKHMubm9kZU5hbWUpe2Nhc2VcIkxpbmVhclwiOmxldCBlPXBhcnNlQ3JlYXRpdmVMaW5lYXIocyx0KTtlJiZyLmNyZWF0aXZlcy5wdXNoKGUpO2JyZWFrO2Nhc2VcIk5vbkxpbmVhckFkc1wiOmxldCBpPXBhcnNlQ3JlYXRpdmVOb25MaW5lYXIocyx0KTtpJiZyLmNyZWF0aXZlcy5wdXNoKGkpO2JyZWFrO2Nhc2VcIkNvbXBhbmlvbkFkc1wiOmxldCBuPXBhcnNlQ3JlYXRpdmVDb21wYW5pb24ocyx0KTtuJiZyLmNyZWF0aXZlcy5wdXNoKG4pfX19KTticmVhaztjYXNlXCJFeHRlbnNpb25zXCI6cGFyc2VFeHRlbnNpb25zKHIuZXh0ZW5zaW9ucyxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShpLFwiRXh0ZW5zaW9uXCIpKTticmVhaztjYXNlXCJBZFN5c3RlbVwiOnIuc3lzdGVtPXt2YWx1ZTpwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpLHZlcnNpb246aS5nZXRBdHRyaWJ1dGUoXCJ2ZXJzaW9uXCIpfHxudWxsfTticmVhaztjYXNlXCJBZFRpdGxlXCI6ci50aXRsZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpO2JyZWFrO2Nhc2VcIkRlc2NyaXB0aW9uXCI6ci5kZXNjcmlwdGlvbj1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpO2JyZWFrO2Nhc2VcIkFkdmVydGlzZXJcIjpyLmFkdmVydGlzZXI9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKTticmVhaztjYXNlXCJQcmljaW5nXCI6ci5wcmljaW5nPXt2YWx1ZTpwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpLG1vZGVsOmkuZ2V0QXR0cmlidXRlKFwibW9kZWxcIil8fG51bGwsY3VycmVuY3k6aS5nZXRBdHRyaWJ1dGUoXCJjdXJyZW5jeVwiKXx8bnVsbH07YnJlYWs7Y2FzZVwiU3VydmV5XCI6ci5zdXJ2ZXk9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKX19cmV0dXJuIHJ9ZnVuY3Rpb24gcGFyc2VXcmFwcGVyKGUpe2NvbnN0IHQ9cGFyc2VJbkxpbmUoZSk7bGV0IHI9cGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIlZBU1RBZFRhZ1VSSVwiKTtpZihyP3QubmV4dFdyYXBwZXJVUkw9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChyKToocj1wYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiVkFTVEFkVGFnVVJMXCIpKSYmKHQubmV4dFdyYXBwZXJVUkw9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShyLFwiVVJMXCIpKSksdC5jcmVhdGl2ZXMuZm9yRWFjaChlPT57aWYoLTEhPT1bXCJsaW5lYXJcIixcIm5vbmxpbmVhclwiXS5pbmRleE9mKGUudHlwZSkpe2lmKGUudHJhY2tpbmdFdmVudHMpe3QudHJhY2tpbmdFdmVudHN8fCh0LnRyYWNraW5nRXZlbnRzPXt9KSx0LnRyYWNraW5nRXZlbnRzW2UudHlwZV18fCh0LnRyYWNraW5nRXZlbnRzW2UudHlwZV09e30pO2ZvcihsZXQgciBpbiBlLnRyYWNraW5nRXZlbnRzKXtjb25zdCBpPWUudHJhY2tpbmdFdmVudHNbcl07dC50cmFja2luZ0V2ZW50c1tlLnR5cGVdW3JdfHwodC50cmFja2luZ0V2ZW50c1tlLnR5cGVdW3JdPVtdKSxpLmZvckVhY2goaT0+e3QudHJhY2tpbmdFdmVudHNbZS50eXBlXVtyXS5wdXNoKGkpfSl9fWUudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzJiYodC52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXN8fCh0LnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz1bXSksZS52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMuZm9yRWFjaChlPT57dC52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMucHVzaChlKX0pKSxlLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUmJih0LnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9ZS52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlKSxlLnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMmJih0LnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXN8fCh0LnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXM9W10pLGUudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcy5mb3JFYWNoKGU9Pnt0LnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMucHVzaChlKX0pKX19KSx0Lm5leHRXcmFwcGVyVVJMKXJldHVybiB0fWZ1bmN0aW9uIHBhcnNlRXh0ZW5zaW9ucyhlLHQpe3QuZm9yRWFjaCh0PT57Y29uc3Qgcj1uZXcgQWRFeHRlbnNpb24saT10LmF0dHJpYnV0ZXMscz10LmNoaWxkTm9kZXM7aWYodC5hdHRyaWJ1dGVzKWZvcihsZXQgZSBpbiBpKXtjb25zdCB0PWlbZV07dC5ub2RlTmFtZSYmdC5ub2RlVmFsdWUmJihyLmF0dHJpYnV0ZXNbdC5ub2RlTmFtZV09dC5ub2RlVmFsdWUpfWZvcihsZXQgZSBpbiBzKXtjb25zdCB0PXNbZV0saT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHQpO2lmKFwiI2NvbW1lbnRcIiE9PXQubm9kZU5hbWUmJlwiXCIhPT1pKXtjb25zdCBlPW5ldyBBZEV4dGVuc2lvbkNoaWxkO2lmKGUubmFtZT10Lm5vZGVOYW1lLGUudmFsdWU9aSx0LmF0dHJpYnV0ZXMpe2NvbnN0IHI9dC5hdHRyaWJ1dGVzO2ZvcihsZXQgdCBpbiByKXtjb25zdCBpPXJbdF07ZS5hdHRyaWJ1dGVzW2kubm9kZU5hbWVdPWkubm9kZVZhbHVlfX1yLmNoaWxkcmVuLnB1c2goZSl9fWUucHVzaChyKX0pfWZ1bmN0aW9uIHBhcnNlQ3JlYXRpdmVBZElkQXR0cmlidXRlKGUpe3JldHVybiBlLmdldEF0dHJpYnV0ZShcIkFkSURcIil8fGUuZ2V0QXR0cmlidXRlKFwiYWRJRFwiKXx8ZS5nZXRBdHRyaWJ1dGUoXCJhZElkXCIpfHxudWxsfXZhciBkb21haW47ZnVuY3Rpb24gRXZlbnRIYW5kbGVycygpe31mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKXtFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpfWZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnMoZSl7cmV0dXJuIHZvaWQgMD09PWUuX21heExpc3RlbmVycz9FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVyczplLl9tYXhMaXN0ZW5lcnN9ZnVuY3Rpb24gZW1pdE5vbmUoZSx0LHIpe2lmKHQpZS5jYWxsKHIpO2Vsc2UgZm9yKHZhciBpPWUubGVuZ3RoLHM9YXJyYXlDbG9uZShlLGkpLG49MDtuPGk7KytuKXNbbl0uY2FsbChyKX1mdW5jdGlvbiBlbWl0T25lKGUsdCxyLGkpe2lmKHQpZS5jYWxsKHIsaSk7ZWxzZSBmb3IodmFyIHM9ZS5sZW5ndGgsbj1hcnJheUNsb25lKGUscyksYT0wO2E8czsrK2EpblthXS5jYWxsKHIsaSl9ZnVuY3Rpb24gZW1pdFR3byhlLHQscixpLHMpe2lmKHQpZS5jYWxsKHIsaSxzKTtlbHNlIGZvcih2YXIgbj1lLmxlbmd0aCxhPWFycmF5Q2xvbmUoZSxuKSxvPTA7bzxuOysrbylhW29dLmNhbGwocixpLHMpfWZ1bmN0aW9uIGVtaXRUaHJlZShlLHQscixpLHMsbil7aWYodCllLmNhbGwocixpLHMsbik7ZWxzZSBmb3IodmFyIGE9ZS5sZW5ndGgsbz1hcnJheUNsb25lKGUsYSksbD0wO2w8YTsrK2wpb1tsXS5jYWxsKHIsaSxzLG4pfWZ1bmN0aW9uIGVtaXRNYW55KGUsdCxyLGkpe2lmKHQpZS5hcHBseShyLGkpO2Vsc2UgZm9yKHZhciBzPWUubGVuZ3RoLG49YXJyYXlDbG9uZShlLHMpLGE9MDthPHM7KythKW5bYV0uYXBwbHkocixpKX1mdW5jdGlvbiBfYWRkTGlzdGVuZXIoZSx0LHIsaSl7dmFyIHMsbixhO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHIpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO2lmKChuPWUuX2V2ZW50cyk/KG4ubmV3TGlzdGVuZXImJihlLmVtaXQoXCJuZXdMaXN0ZW5lclwiLHQsci5saXN0ZW5lcj9yLmxpc3RlbmVyOnIpLG49ZS5fZXZlbnRzKSxhPW5bdF0pOihuPWUuX2V2ZW50cz1uZXcgRXZlbnRIYW5kbGVycyxlLl9ldmVudHNDb3VudD0wKSxhKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBhP2E9blt0XT1pP1tyLGFdOlthLHJdOmk/YS51bnNoaWZ0KHIpOmEucHVzaChyKSwhYS53YXJuZWQmJihzPSRnZXRNYXhMaXN0ZW5lcnMoZSkpJiZzPjAmJmEubGVuZ3RoPnMpe2Eud2FybmVkPSEwO3ZhciBvPW5ldyBFcnJvcihcIlBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gXCIrYS5sZW5ndGgrXCIgXCIrdCtcIiBsaXN0ZW5lcnMgYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0XCIpO28ubmFtZT1cIk1heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZ1wiLG8uZW1pdHRlcj1lLG8udHlwZT10LG8uY291bnQ9YS5sZW5ndGgsZW1pdFdhcm5pbmcobyl9fWVsc2UgYT1uW3RdPXIsKytlLl9ldmVudHNDb3VudDtyZXR1cm4gZX1mdW5jdGlvbiBlbWl0V2FybmluZyhlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBjb25zb2xlLndhcm4/Y29uc29sZS53YXJuKGUpOmNvbnNvbGUubG9nKGUpfWZ1bmN0aW9uIF9vbmNlV3JhcChlLHQscil7dmFyIGk9ITE7ZnVuY3Rpb24gcygpe2UucmVtb3ZlTGlzdGVuZXIodCxzKSxpfHwoaT0hMCxyLmFwcGx5KGUsYXJndW1lbnRzKSl9cmV0dXJuIHMubGlzdGVuZXI9cixzfWZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZSl7dmFyIHQ9dGhpcy5fZXZlbnRzO2lmKHQpe3ZhciByPXRbZV07aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgcilyZXR1cm4gMTtpZihyKXJldHVybiByLmxlbmd0aH1yZXR1cm4gMH1mdW5jdGlvbiBzcGxpY2VPbmUoZSx0KXtmb3IodmFyIHI9dCxpPXIrMSxzPWUubGVuZ3RoO2k8cztyKz0xLGkrPTEpZVtyXT1lW2ldO2UucG9wKCl9ZnVuY3Rpb24gYXJyYXlDbG9uZShlLHQpe2Zvcih2YXIgcj1uZXcgQXJyYXkodCk7dC0tOylyW3RdPWVbdF07cmV0dXJuIHJ9ZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGUpe2Zvcih2YXIgdD1uZXcgQXJyYXkoZS5sZW5ndGgpLHI9MDtyPHQubGVuZ3RoOysrcil0W3JdPWVbcl0ubGlzdGVuZXJ8fGVbcl07cmV0dXJuIHR9ZnVuY3Rpb24geGRyKCl7bGV0IGU7cmV0dXJuIHdpbmRvdy5YRG9tYWluUmVxdWVzdCYmKGU9bmV3IFhEb21haW5SZXF1ZXN0KSxlfWZ1bmN0aW9uIHN1cHBvcnRlZCgpe3JldHVybiEheGRyKCl9ZnVuY3Rpb24gZ2V0KGUsdCxyKXtsZXQgaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiB3aW5kb3cuQWN0aXZlWE9iamVjdD9uZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MRE9NXCIpOnZvaWQgMDtpZighaSlyZXR1cm4gcihuZXcgRXJyb3IoXCJGbGFzaFVSTEhhbmRsZXI6IE1pY3Jvc29mdC5YTUxET00gZm9ybWF0IG5vdCBzdXBwb3J0ZWRcIikpO2kuYXN5bmM9ITEscmVxdWVzdC5vcGVuKFwiR0VUXCIsZSkscmVxdWVzdC50aW1lb3V0PXQudGltZW91dHx8MCxyZXF1ZXN0LndpdGhDcmVkZW50aWFscz10LndpdGhDcmVkZW50aWFsc3x8ITEscmVxdWVzdC5zZW5kKCkscmVxdWVzdC5vbnByb2dyZXNzPWZ1bmN0aW9uKCl7fSxyZXF1ZXN0Lm9ubG9hZD1mdW5jdGlvbigpe2kubG9hZFhNTChyZXF1ZXN0LnJlc3BvbnNlVGV4dCkscihudWxsLGkpfX1FdmVudEhhbmRsZXJzLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKG51bGwpLEV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXI9RXZlbnRFbWl0dGVyLEV2ZW50RW1pdHRlci51c2luZ0RvbWFpbnM9ITEsRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5kb21haW49dm9pZCAwLEV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cz12b2lkIDAsRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzPXZvaWQgMCxFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycz0xMCxFdmVudEVtaXR0ZXIuaW5pdD1mdW5jdGlvbigpe3RoaXMuZG9tYWluPW51bGwsRXZlbnRFbWl0dGVyLnVzaW5nRG9tYWlucyYmKCFkb21haW4uYWN0aXZlfHx0aGlzIGluc3RhbmNlb2YgZG9tYWluLkRvbWFpbnx8KHRoaXMuZG9tYWluPWRvbWFpbi5hY3RpdmUpKSx0aGlzLl9ldmVudHMmJnRoaXMuX2V2ZW50cyE9PU9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzfHwodGhpcy5fZXZlbnRzPW5ldyBFdmVudEhhbmRsZXJzLHRoaXMuX2V2ZW50c0NvdW50PTApLHRoaXMuX21heExpc3RlbmVycz10aGlzLl9tYXhMaXN0ZW5lcnN8fHZvaWQgMH0sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24oZSl7aWYoXCJudW1iZXJcIiE9dHlwZW9mIGV8fGU8MHx8aXNOYU4oZSkpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJuXCIgYXJndW1lbnQgbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO3JldHVybiB0aGlzLl9tYXhMaXN0ZW5lcnM9ZSx0aGlzfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycz1mdW5jdGlvbigpe3JldHVybiAkZ2V0TWF4TGlzdGVuZXJzKHRoaXMpfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oZSl7dmFyIHQscixpLHMsbixhLG8sbD1cImVycm9yXCI9PT1lO2lmKGE9dGhpcy5fZXZlbnRzKWw9bCYmbnVsbD09YS5lcnJvcjtlbHNlIGlmKCFsKXJldHVybiExO2lmKG89dGhpcy5kb21haW4sbCl7aWYodD1hcmd1bWVudHNbMV0sIW8pe2lmKHQgaW5zdGFuY2VvZiBFcnJvcil0aHJvdyB0O3ZhciBjPW5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcrdCtcIilcIik7dGhyb3cgYy5jb250ZXh0PXQsY31yZXR1cm4gdHx8KHQ9bmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50JykpLHQuZG9tYWluRW1pdHRlcj10aGlzLHQuZG9tYWluPW8sdC5kb21haW5UaHJvd249ITEsby5lbWl0KFwiZXJyb3JcIix0KSwhMX1pZighKHI9YVtlXSkpcmV0dXJuITE7dmFyIHA9XCJmdW5jdGlvblwiPT10eXBlb2Ygcjtzd2l0Y2goaT1hcmd1bWVudHMubGVuZ3RoKXtjYXNlIDE6ZW1pdE5vbmUocixwLHRoaXMpO2JyZWFrO2Nhc2UgMjplbWl0T25lKHIscCx0aGlzLGFyZ3VtZW50c1sxXSk7YnJlYWs7Y2FzZSAzOmVtaXRUd28ocixwLHRoaXMsYXJndW1lbnRzWzFdLGFyZ3VtZW50c1syXSk7YnJlYWs7Y2FzZSA0OmVtaXRUaHJlZShyLHAsdGhpcyxhcmd1bWVudHNbMV0sYXJndW1lbnRzWzJdLGFyZ3VtZW50c1szXSk7YnJlYWs7ZGVmYXVsdDpmb3Iocz1uZXcgQXJyYXkoaS0xKSxuPTE7bjxpO24rKylzW24tMV09YXJndW1lbnRzW25dO2VtaXRNYW55KHIscCx0aGlzLHMpfXJldHVybiEwfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLGUsdCwhMSl9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUub249RXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcixFdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3JldHVybiBfYWRkTGlzdGVuZXIodGhpcyxlLHQsITApfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2U9ZnVuY3Rpb24oZSx0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtyZXR1cm4gdGhpcy5vbihlLF9vbmNlV3JhcCh0aGlzLGUsdCkpLHRoaXN9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO3JldHVybiB0aGlzLnByZXBlbmRMaXN0ZW5lcihlLF9vbmNlV3JhcCh0aGlzLGUsdCkpLHRoaXN9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXt2YXIgcixpLHMsbixhO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO2lmKCEoaT10aGlzLl9ldmVudHMpKXJldHVybiB0aGlzO2lmKCEocj1pW2VdKSlyZXR1cm4gdGhpcztpZihyPT09dHx8ci5saXN0ZW5lciYmci5saXN0ZW5lcj09PXQpMD09LS10aGlzLl9ldmVudHNDb3VudD90aGlzLl9ldmVudHM9bmV3IEV2ZW50SGFuZGxlcnM6KGRlbGV0ZSBpW2VdLGkucmVtb3ZlTGlzdGVuZXImJnRoaXMuZW1pdChcInJlbW92ZUxpc3RlbmVyXCIsZSxyLmxpc3RlbmVyfHx0KSk7ZWxzZSBpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiByKXtmb3Iocz0tMSxuPXIubGVuZ3RoO24tLSA+MDspaWYocltuXT09PXR8fHJbbl0ubGlzdGVuZXImJnJbbl0ubGlzdGVuZXI9PT10KXthPXJbbl0ubGlzdGVuZXIscz1uO2JyZWFrfWlmKHM8MClyZXR1cm4gdGhpcztpZigxPT09ci5sZW5ndGgpe2lmKHJbMF09dm9pZCAwLDA9PS0tdGhpcy5fZXZlbnRzQ291bnQpcmV0dXJuIHRoaXMuX2V2ZW50cz1uZXcgRXZlbnRIYW5kbGVycyx0aGlzO2RlbGV0ZSBpW2VdfWVsc2Ugc3BsaWNlT25lKHIscyk7aS5yZW1vdmVMaXN0ZW5lciYmdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIixlLGF8fHQpfXJldHVybiB0aGlzfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycz1mdW5jdGlvbihlKXt2YXIgdCxyO2lmKCEocj10aGlzLl9ldmVudHMpKXJldHVybiB0aGlzO2lmKCFyLnJlbW92ZUxpc3RlbmVyKXJldHVybiAwPT09YXJndW1lbnRzLmxlbmd0aD8odGhpcy5fZXZlbnRzPW5ldyBFdmVudEhhbmRsZXJzLHRoaXMuX2V2ZW50c0NvdW50PTApOnJbZV0mJigwPT0tLXRoaXMuX2V2ZW50c0NvdW50P3RoaXMuX2V2ZW50cz1uZXcgRXZlbnRIYW5kbGVyczpkZWxldGUgcltlXSksdGhpcztpZigwPT09YXJndW1lbnRzLmxlbmd0aCl7Zm9yKHZhciBpLHM9T2JqZWN0LmtleXMociksbj0wO248cy5sZW5ndGg7KytuKVwicmVtb3ZlTGlzdGVuZXJcIiE9PShpPXNbbl0pJiZ0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhpKTtyZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJyZW1vdmVMaXN0ZW5lclwiKSx0aGlzLl9ldmVudHM9bmV3IEV2ZW50SGFuZGxlcnMsdGhpcy5fZXZlbnRzQ291bnQ9MCx0aGlzfWlmKFwiZnVuY3Rpb25cIj09dHlwZW9mKHQ9cltlXSkpdGhpcy5yZW1vdmVMaXN0ZW5lcihlLHQpO2Vsc2UgaWYodClkb3t0aGlzLnJlbW92ZUxpc3RlbmVyKGUsdFt0Lmxlbmd0aC0xXSl9d2hpbGUodFswXSk7cmV0dXJuIHRoaXN9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3ZhciB0LHI9dGhpcy5fZXZlbnRzO3JldHVybiByJiYodD1yW2VdKT9cImZ1bmN0aW9uXCI9PXR5cGVvZiB0P1t0Lmxpc3RlbmVyfHx0XTp1bndyYXBMaXN0ZW5lcnModCk6W119LEV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50PWZ1bmN0aW9uKGUsdCl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZS5saXN0ZW5lckNvdW50P2UubGlzdGVuZXJDb3VudCh0KTpsaXN0ZW5lckNvdW50LmNhbGwoZSx0KX0sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50PWxpc3RlbmVyQ291bnQsRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50PjA/UmVmbGVjdC5vd25LZXlzKHRoaXMuX2V2ZW50cyk6W119O2NvbnN0IGZsYXNoVVJMSGFuZGxlcj17Z2V0OmdldCxzdXBwb3J0ZWQ6c3VwcG9ydGVkfTtmdW5jdGlvbiBnZXQkMShlLHQscil7cihuZXcgRXJyb3IoXCJQbGVhc2UgYnVuZGxlIHRoZSBsaWJyYXJ5IGZvciBub2RlIHRvIHVzZSB0aGUgbm9kZSB1cmxIYW5kbGVyXCIpKX1jb25zdCBub2RlVVJMSGFuZGxlcj17Z2V0OmdldCQxfTtmdW5jdGlvbiB4aHIoKXt0cnl7Y29uc3QgZT1uZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0O3JldHVyblwid2l0aENyZWRlbnRpYWxzXCJpbiBlP2U6bnVsbH1jYXRjaChlKXtyZXR1cm4gY29uc29sZS5sb2coXCJFcnJvciBpbiBYSFJVUkxIYW5kbGVyIHN1cHBvcnQgY2hlY2s6XCIsZSksbnVsbH19ZnVuY3Rpb24gc3VwcG9ydGVkJDEoKXtyZXR1cm4hIXhocigpfWZ1bmN0aW9uIGdldCQyKGUsdCxyKXtpZihcImh0dHBzOlwiPT09d2luZG93LmxvY2F0aW9uLnByb3RvY29sJiYwPT09ZS5pbmRleE9mKFwiaHR0cDovL1wiKSlyZXR1cm4gcihuZXcgRXJyb3IoXCJYSFJVUkxIYW5kbGVyOiBDYW5ub3QgZ28gZnJvbSBIVFRQUyB0byBIVFRQLlwiKSk7dHJ5e2NvbnN0IGk9eGhyKCk7aS5vcGVuKFwiR0VUXCIsZSksaS50aW1lb3V0PXQudGltZW91dHx8MCxpLndpdGhDcmVkZW50aWFscz10LndpdGhDcmVkZW50aWFsc3x8ITEsaS5vdmVycmlkZU1pbWVUeXBlJiZpLm92ZXJyaWRlTWltZVR5cGUoXCJ0ZXh0L3htbFwiKSxpLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpezQ9PT1pLnJlYWR5U3RhdGUmJigyMDA9PT1pLnN0YXR1cz9yKG51bGwsaS5yZXNwb25zZVhNTCk6cihuZXcgRXJyb3IoYFhIUlVSTEhhbmRsZXI6ICR7aS5zdGF0dXNUZXh0fWApKSl9LGkuc2VuZCgpfWNhdGNoKGUpe3IobmV3IEVycm9yKFwiWEhSVVJMSGFuZGxlcjogVW5leHBlY3RlZCBlcnJvclwiKSl9fWNvbnN0IFhIUlVSTEhhbmRsZXI9e2dldDpnZXQkMixzdXBwb3J0ZWQ6c3VwcG9ydGVkJDF9O2Z1bmN0aW9uIGdldCQzKGUsdCxyKXtyZXR1cm4gcnx8KFwiZnVuY3Rpb25cIj09dHlwZW9mIHQmJihyPXQpLHQ9e30pLFwidW5kZWZpbmVkXCI9PXR5cGVvZiB3aW5kb3d8fG51bGw9PT13aW5kb3c/bm9kZVVSTEhhbmRsZXIuZ2V0KGUsdCxyKTpYSFJVUkxIYW5kbGVyLnN1cHBvcnRlZCgpP1hIUlVSTEhhbmRsZXIuZ2V0KGUsdCxyKTpmbGFzaFVSTEhhbmRsZXIuc3VwcG9ydGVkKCk/Zmxhc2hVUkxIYW5kbGVyLmdldChlLHQscik6cihuZXcgRXJyb3IoXCJDdXJyZW50IGNvbnRleHQgaXMgbm90IHN1cHBvcnRlZCBieSBhbnkgb2YgdGhlIGRlZmF1bHQgVVJMSGFuZGxlcnMuIFBsZWFzZSBwcm92aWRlIGEgY3VzdG9tIFVSTEhhbmRsZXJcIikpfWNvbnN0IHVybEhhbmRsZXI9e2dldDpnZXQkM307Y2xhc3MgVkFTVFJlc3BvbnNle2NvbnN0cnVjdG9yKCl7dGhpcy5hZHM9W10sdGhpcy5lcnJvclVSTFRlbXBsYXRlcz1bXX19Y29uc3QgREVGQVVMVF9NQVhfV1JBUFBFUl9ERVBUSD0xMCxERUZBVUxUX0VWRU5UX0RBVEE9e0VSUk9SQ09ERTo5MDAsZXh0ZW5zaW9uczpbXX07Y2xhc3MgVkFTVFBhcnNlciBleHRlbmRzIEV2ZW50RW1pdHRlcntjb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5yZW1haW5pbmdBZHM9W10sdGhpcy5wYXJlbnRVUkxzPVtdLHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXM9W10sdGhpcy5yb290RXJyb3JVUkxUZW1wbGF0ZXM9W10sdGhpcy5tYXhXcmFwcGVyRGVwdGg9bnVsbCx0aGlzLlVSTFRlbXBsYXRlRmlsdGVycz1bXSx0aGlzLmZldGNoaW5nT3B0aW9ucz17fX1hZGRVUkxUZW1wbGF0ZUZpbHRlcihlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiZ0aGlzLlVSTFRlbXBsYXRlRmlsdGVycy5wdXNoKGUpfXJlbW92ZVVSTFRlbXBsYXRlRmlsdGVyKCl7dGhpcy5VUkxUZW1wbGF0ZUZpbHRlcnMucG9wKCl9Y291bnRVUkxUZW1wbGF0ZUZpbHRlcnMoKXtyZXR1cm4gdGhpcy5VUkxUZW1wbGF0ZUZpbHRlcnMubGVuZ3RofWNsZWFyVVJMVGVtcGxhdGVGaWx0ZXJzKCl7dGhpcy5VUkxUZW1wbGF0ZUZpbHRlcnM9W119dHJhY2tWYXN0RXJyb3IoZSx0LC4uLnIpe3RoaXMuZW1pdChcIlZBU1QtZXJyb3JcIixPYmplY3QuYXNzaWduKERFRkFVTFRfRVZFTlRfREFUQSx0LC4uLnIpKSx1dGlsLnRyYWNrKGUsdCl9Z2V0RXJyb3JVUkxUZW1wbGF0ZXMoKXtyZXR1cm4gdGhpcy5yb290RXJyb3JVUkxUZW1wbGF0ZXMuY29uY2F0KHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXMpfWZldGNoVkFTVChlLHQscil7cmV0dXJuIG5ldyBQcm9taXNlKChpLHMpPT57dGhpcy5VUkxUZW1wbGF0ZUZpbHRlcnMuZm9yRWFjaCh0PT57ZT10KGUpfSksdGhpcy5wYXJlbnRVUkxzLnB1c2goZSksdGhpcy5lbWl0KFwiVkFTVC1yZXNvbHZpbmdcIix7dXJsOmUsd3JhcHBlckRlcHRoOnQsb3JpZ2luYWxVcmw6cn0pLHRoaXMudXJsSGFuZGxlci5nZXQoZSx0aGlzLmZldGNoaW5nT3B0aW9ucywodCxyKT0+e3RoaXMuZW1pdChcIlZBU1QtcmVzb2x2ZWRcIix7dXJsOmUsZXJyb3I6dH0pLHQ/cyh0KTppKHIpfSl9KX1pbml0UGFyc2luZ1N0YXR1cyhlPXt9KXt0aGlzLnJvb3RVUkw9XCJcIix0aGlzLnJlbWFpbmluZ0Fkcz1bXSx0aGlzLnBhcmVudFVSTHM9W10sdGhpcy5lcnJvclVSTFRlbXBsYXRlcz1bXSx0aGlzLnJvb3RFcnJvclVSTFRlbXBsYXRlcz1bXSx0aGlzLm1heFdyYXBwZXJEZXB0aD1lLndyYXBwZXJMaW1pdHx8REVGQVVMVF9NQVhfV1JBUFBFUl9ERVBUSCx0aGlzLmZldGNoaW5nT3B0aW9ucz17dGltZW91dDplLnRpbWVvdXQsd2l0aENyZWRlbnRpYWxzOmUud2l0aENyZWRlbnRpYWxzfSx0aGlzLnVybEhhbmRsZXI9ZS51cmxoYW5kbGVyfHx1cmxIYW5kbGVyfWdldFJlbWFpbmluZ0FkcyhlKXtpZigwPT09dGhpcy5yZW1haW5pbmdBZHMubGVuZ3RoKXJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBtb3JlIGFkcyBhcmUgYXZhaWxhYmxlIGZvciB0aGUgZ2l2ZW4gVkFTVFwiKSk7Y29uc3QgdD1lP3V0aWwuZmxhdHRlbih0aGlzLnJlbWFpbmluZ0Fkcyk6dGhpcy5yZW1haW5pbmdBZHMuc2hpZnQoKTtyZXR1cm4gdGhpcy5lcnJvclVSTFRlbXBsYXRlcz1bXSx0aGlzLnBhcmVudFVSTHM9W10sdGhpcy5yZXNvbHZlQWRzKHQse3dyYXBwZXJEZXB0aDowLG9yaWdpbmFsVXJsOnRoaXMucm9vdFVSTH0pLnRoZW4oZT0+dGhpcy5idWlsZFZBU1RSZXNwb25zZShlKSl9Z2V0QW5kUGFyc2VWQVNUKGUsdD17fSl7cmV0dXJuIHRoaXMuaW5pdFBhcnNpbmdTdGF0dXModCksdGhpcy5yb290VVJMPWUsdGhpcy5mZXRjaFZBU1QoZSkudGhlbihyPT4odC5vcmlnaW5hbFVybD1lLHQuaXNSb290VkFTVD0hMCx0aGlzLnBhcnNlKHIsdCkudGhlbihlPT50aGlzLmJ1aWxkVkFTVFJlc3BvbnNlKGUpKSkpfXBhcnNlVkFTVChlLHQ9e30pe3JldHVybiB0aGlzLmluaXRQYXJzaW5nU3RhdHVzKHQpLHQuaXNSb290VkFTVD0hMCx0aGlzLnBhcnNlKGUsdCkudGhlbihlPT50aGlzLmJ1aWxkVkFTVFJlc3BvbnNlKGUpKX1idWlsZFZBU1RSZXNwb25zZShlKXtjb25zdCB0PW5ldyBWQVNUUmVzcG9uc2U7cmV0dXJuIHQuYWRzPWUsdC5lcnJvclVSTFRlbXBsYXRlcz10aGlzLmdldEVycm9yVVJMVGVtcGxhdGVzKCksdGhpcy5jb21wbGV0ZVdyYXBwZXJSZXNvbHZpbmcodCksdH1wYXJzZShlLHtyZXNvbHZlQWxsOnQ9ITAsd3JhcHBlclNlcXVlbmNlOnI9bnVsbCxvcmlnaW5hbFVybDppPW51bGwsd3JhcHBlckRlcHRoOnM9MCxpc1Jvb3RWQVNUOm49ITF9KXtpZighZXx8IWUuZG9jdW1lbnRFbGVtZW50fHxcIlZBU1RcIiE9PWUuZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lKXJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJJbnZhbGlkIFZBU1QgWE1MRG9jdW1lbnRcIikpO2xldCBhPVtdO2NvbnN0IG89ZS5kb2N1bWVudEVsZW1lbnQuY2hpbGROb2Rlcztmb3IobGV0IGUgaW4gbyl7Y29uc3QgdD1vW2VdO2lmKFwiRXJyb3JcIj09PXQubm9kZU5hbWUpe2NvbnN0IGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dCh0KTtuP3RoaXMucm9vdEVycm9yVVJMVGVtcGxhdGVzLnB1c2goZSk6dGhpcy5lcnJvclVSTFRlbXBsYXRlcy5wdXNoKGUpfWlmKFwiQWRcIj09PXQubm9kZU5hbWUpe2NvbnN0IGU9cGFyc2VBZCh0KTtlP2EucHVzaChlKTp0aGlzLnRyYWNrVmFzdEVycm9yKHRoaXMuZ2V0RXJyb3JVUkxUZW1wbGF0ZXMoKSx7RVJST1JDT0RFOjEwMX0pfX1jb25zdCBsPWEubGVuZ3RoLGM9YVtsLTFdO3JldHVybiAxPT09bCYmdm9pZCAwIT09ciYmbnVsbCE9PXImJmMmJiFjLnNlcXVlbmNlJiYoYy5zZXF1ZW5jZT1yKSwhMT09PXQmJih0aGlzLnJlbWFpbmluZ0Fkcz1wYXJzZXJVdGlscy5zcGxpdFZBU1QoYSksYT10aGlzLnJlbWFpbmluZ0Fkcy5zaGlmdCgpKSx0aGlzLnJlc29sdmVBZHMoYSx7d3JhcHBlckRlcHRoOnMsb3JpZ2luYWxVcmw6aX0pfXJlc29sdmVBZHMoZT1bXSx7d3JhcHBlckRlcHRoOnQsb3JpZ2luYWxVcmw6cn0pe2NvbnN0IGk9W107cmV0dXJuIGUuZm9yRWFjaChlPT57Y29uc3Qgcz10aGlzLnJlc29sdmVXcmFwcGVycyhlLHQscik7aS5wdXNoKHMpfSksUHJvbWlzZS5hbGwoaSkudGhlbihlPT57Y29uc3QgaT11dGlsLmZsYXR0ZW4oZSk7aWYoIWkmJnRoaXMucmVtYWluaW5nQWRzLmxlbmd0aD4wKXtjb25zdCBlPXRoaXMucmVtYWluaW5nQWRzLnNoaWZ0KCk7cmV0dXJuIHRoaXMucmVzb2x2ZUFkcyhlLHt3cmFwcGVyRGVwdGg6dCxvcmlnaW5hbFVybDpyfSl9cmV0dXJuIGl9KX1yZXNvbHZlV3JhcHBlcnMoZSx0LHIpe3JldHVybiBuZXcgUHJvbWlzZSgoaSxzKT0+e2lmKHQrKywhZS5uZXh0V3JhcHBlclVSTClyZXR1cm4gZGVsZXRlIGUubmV4dFdyYXBwZXJVUkwsaShlKTtpZih0Pj10aGlzLm1heFdyYXBwZXJEZXB0aHx8LTEhPT10aGlzLnBhcmVudFVSTHMuaW5kZXhPZihlLm5leHRXcmFwcGVyVVJMKSlyZXR1cm4gZS5lcnJvckNvZGU9MzAyLGRlbGV0ZSBlLm5leHRXcmFwcGVyVVJMLGkoZSk7ZS5uZXh0V3JhcHBlclVSTD1wYXJzZXJVdGlscy5yZXNvbHZlVmFzdEFkVGFnVVJJKGUubmV4dFdyYXBwZXJVUkwscik7Y29uc3Qgbj1lLnNlcXVlbmNlO3I9ZS5uZXh0V3JhcHBlclVSTCx0aGlzLmZldGNoVkFTVChlLm5leHRXcmFwcGVyVVJMLHQscikudGhlbihzPT50aGlzLnBhcnNlKHMse29yaWdpbmFsVXJsOnIsd3JhcHBlclNlcXVlbmNlOm4sd3JhcHBlckRlcHRoOnR9KS50aGVuKHQ9PntpZihkZWxldGUgZS5uZXh0V3JhcHBlclVSTCwwPT09dC5sZW5ndGgpcmV0dXJuIGUuY3JlYXRpdmVzPVtdLGkoZSk7dC5mb3JFYWNoKHQ9Pnt0JiZwYXJzZXJVdGlscy5tZXJnZVdyYXBwZXJBZERhdGEodCxlKX0pLGkodCl9KSkuY2F0Y2godD0+e2UuZXJyb3JDb2RlPTMwMSxlLmVycm9yTWVzc2FnZT10Lm1lc3NhZ2UsaShlKX0pfSl9Y29tcGxldGVXcmFwcGVyUmVzb2x2aW5nKGUpe2lmKDA9PT1lLmFkcy5sZW5ndGgpdGhpcy50cmFja1Zhc3RFcnJvcihlLmVycm9yVVJMVGVtcGxhdGVzLHtFUlJPUkNPREU6MzAzfSk7ZWxzZSBmb3IobGV0IHQ9ZS5hZHMubGVuZ3RoLTE7dD49MDt0LS0pe2xldCByPWUuYWRzW3RdOyhyLmVycm9yQ29kZXx8MD09PXIuY3JlYXRpdmVzLmxlbmd0aCkmJih0aGlzLnRyYWNrVmFzdEVycm9yKHIuZXJyb3JVUkxUZW1wbGF0ZXMuY29uY2F0KGUuZXJyb3JVUkxUZW1wbGF0ZXMpLHtFUlJPUkNPREU6ci5lcnJvckNvZGV8fDMwM30se0VSUk9STUVTU0FHRTpyLmVycm9yTWVzc2FnZXx8XCJcIn0se2V4dGVuc2lvbnM6ci5leHRlbnNpb25zfSx7c3lzdGVtOnIuc3lzdGVtfSksZS5hZHMuc3BsaWNlKHQsMSkpfX19bGV0IHN0b3JhZ2U9bnVsbDtjb25zdCBERUZBVUxUX1NUT1JBR0U9e2RhdGE6e30sbGVuZ3RoOjAsZ2V0SXRlbShlKXtyZXR1cm4gdGhpcy5kYXRhW2VdfSxzZXRJdGVtKGUsdCl7dGhpcy5kYXRhW2VdPXQsdGhpcy5sZW5ndGg9T2JqZWN0LmtleXModGhpcy5kYXRhKS5sZW5ndGh9LHJlbW92ZUl0ZW0oZSl7ZGVsZXRlIGRhdGFbZV0sdGhpcy5sZW5ndGg9T2JqZWN0LmtleXModGhpcy5kYXRhKS5sZW5ndGh9LGNsZWFyKCl7dGhpcy5kYXRhPXt9LHRoaXMubGVuZ3RoPTB9fTtjbGFzcyBTdG9yYWdle2NvbnN0cnVjdG9yKCl7dGhpcy5zdG9yYWdlPXRoaXMuaW5pdFN0b3JhZ2UoKX1pbml0U3RvcmFnZSgpe2lmKHN0b3JhZ2UpcmV0dXJuIHN0b3JhZ2U7dHJ5e3N0b3JhZ2U9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmbnVsbCE9PXdpbmRvdz93aW5kb3cubG9jYWxTdG9yYWdlfHx3aW5kb3cuc2Vzc2lvblN0b3JhZ2U6bnVsbH1jYXRjaChlKXtzdG9yYWdlPW51bGx9cmV0dXJuIHN0b3JhZ2UmJiF0aGlzLmlzU3RvcmFnZURpc2FibGVkKHN0b3JhZ2UpfHwoc3RvcmFnZT1ERUZBVUxUX1NUT1JBR0UpLmNsZWFyKCksc3RvcmFnZX1pc1N0b3JhZ2VEaXNhYmxlZChlKXtjb25zdCB0PVwiX19WQVNUU3RvcmFnZV9fXCI7dHJ5e2lmKGUuc2V0SXRlbSh0LHQpLGUuZ2V0SXRlbSh0KSE9PXQpcmV0dXJuIGUucmVtb3ZlSXRlbSh0KSwhMH1jYXRjaChlKXtyZXR1cm4hMH1yZXR1cm4gZS5yZW1vdmVJdGVtKHQpLCExfWdldEl0ZW0oZSl7cmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKGUpfXNldEl0ZW0oZSx0KXtyZXR1cm4gdGhpcy5zdG9yYWdlLnNldEl0ZW0oZSx0KX1yZW1vdmVJdGVtKGUpe3JldHVybiB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShlKX1jbGVhcigpe3JldHVybiB0aGlzLnN0b3JhZ2UuY2xlYXIoKX19Y2xhc3MgVkFTVENsaWVudHtjb25zdHJ1Y3RvcihlLHQscil7dGhpcy5jYXBwaW5nRnJlZUx1bmNoPWV8fDAsdGhpcy5jYXBwaW5nTWluaW11bVRpbWVJbnRlcnZhbD10fHwwLHRoaXMuZGVmYXVsdE9wdGlvbnM9e3dpdGhDcmVkZW50aWFsczohMSx0aW1lb3V0OjB9LHRoaXMudmFzdFBhcnNlcj1uZXcgVkFTVFBhcnNlcix0aGlzLnN0b3JhZ2U9cnx8bmV3IFN0b3JhZ2Usdm9pZCAwPT09dGhpcy5sYXN0U3VjY2Vzc2Z1bEFkJiYodGhpcy5sYXN0U3VjY2Vzc2Z1bEFkPTApLHZvaWQgMD09PXRoaXMudG90YWxDYWxscyYmKHRoaXMudG90YWxDYWxscz0wKSx2b2lkIDA9PT10aGlzLnRvdGFsQ2FsbHNUaW1lb3V0JiYodGhpcy50b3RhbENhbGxzVGltZW91dD0wKX1nZXRQYXJzZXIoKXtyZXR1cm4gdGhpcy52YXN0UGFyc2VyfWdldCBsYXN0U3VjY2Vzc2Z1bEFkKCl7cmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKFwidmFzdC1jbGllbnQtbGFzdC1zdWNjZXNzZnVsLWFkXCIpfXNldCBsYXN0U3VjY2Vzc2Z1bEFkKGUpe3RoaXMuc3RvcmFnZS5zZXRJdGVtKFwidmFzdC1jbGllbnQtbGFzdC1zdWNjZXNzZnVsLWFkXCIsZSl9Z2V0IHRvdGFsQ2FsbHMoKXtyZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oXCJ2YXN0LWNsaWVudC10b3RhbC1jYWxsc1wiKX1zZXQgdG90YWxDYWxscyhlKXt0aGlzLnN0b3JhZ2Uuc2V0SXRlbShcInZhc3QtY2xpZW50LXRvdGFsLWNhbGxzXCIsZSl9Z2V0IHRvdGFsQ2FsbHNUaW1lb3V0KCl7cmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKFwidmFzdC1jbGllbnQtdG90YWwtY2FsbHMtdGltZW91dFwiKX1zZXQgdG90YWxDYWxsc1RpbWVvdXQoZSl7dGhpcy5zdG9yYWdlLnNldEl0ZW0oXCJ2YXN0LWNsaWVudC10b3RhbC1jYWxscy10aW1lb3V0XCIsZSl9aGFzUmVtYWluaW5nQWRzKCl7cmV0dXJuIHRoaXMudmFzdFBhcnNlci5yZW1haW5pbmdBZHMubGVuZ3RoPjB9Z2V0TmV4dEFkcyhlKXtyZXR1cm4gdGhpcy52YXN0UGFyc2VyLmdldFJlbWFpbmluZ0FkcyhlKX1nZXQoZSx0PXt9KXtjb25zdCByPURhdGUubm93KCk7cmV0dXJuKHQ9T2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRPcHRpb25zLHQpKS5oYXNPd25Qcm9wZXJ0eShcInJlc29sdmVBbGxcIil8fCh0LnJlc29sdmVBbGw9ITEpLHRoaXMudG90YWxDYWxsc1RpbWVvdXQ8cj8odGhpcy50b3RhbENhbGxzPTEsdGhpcy50b3RhbENhbGxzVGltZW91dD1yKzM2ZTUpOnRoaXMudG90YWxDYWxscysrLG5ldyBQcm9taXNlKChpLHMpPT57aWYodGhpcy5jYXBwaW5nRnJlZUx1bmNoPj10aGlzLnRvdGFsQ2FsbHMpcmV0dXJuIHMobmV3IEVycm9yKGBWQVNUIGNhbGwgY2FuY2VsZWQg4oCTIEZyZWVMdW5jaCBjYXBwaW5nIG5vdCByZWFjaGVkIHlldCAke3RoaXMudG90YWxDYWxsc30vJHt0aGlzLmNhcHBpbmdGcmVlTHVuY2h9YCkpO2NvbnN0IG49ci10aGlzLmxhc3RTdWNjZXNzZnVsQWQ7aWYobjwwKXRoaXMubGFzdFN1Y2Nlc3NmdWxBZD0wO2Vsc2UgaWYobjx0aGlzLmNhcHBpbmdNaW5pbXVtVGltZUludGVydmFsKXJldHVybiBzKG5ldyBFcnJvcihgVkFTVCBjYWxsIGNhbmNlbGVkIOKAkyAoJHt0aGlzLmNhcHBpbmdNaW5pbXVtVGltZUludGVydmFsfSltcyBtaW5pbXVtIGludGVydmFsIHJlYWNoZWRgKSk7dGhpcy52YXN0UGFyc2VyLmdldEFuZFBhcnNlVkFTVChlLHQpLnRoZW4oZT0+aShlKSkuY2F0Y2goZT0+cyhlKSl9KX19Y29uc3QgREVGQVVMVF9TS0lQX0RFTEFZPS0xO2NsYXNzIFZBU1RUcmFja2VyIGV4dGVuZHMgRXZlbnRFbWl0dGVye2NvbnN0cnVjdG9yKGUsdCxyLGk9bnVsbCl7c3VwZXIoKSx0aGlzLmFkPXQsdGhpcy5jcmVhdGl2ZT1yLHRoaXMudmFyaWF0aW9uPWksdGhpcy5tdXRlZD0hMSx0aGlzLmltcHJlc3NlZD0hMSx0aGlzLnNraXBwYWJsZT0hMSx0aGlzLnRyYWNraW5nRXZlbnRzPXt9LHRoaXMuX2FscmVhZHlUcmlnZ2VyZWRRdWFydGlsZXM9e30sdGhpcy5lbWl0QWx3YXlzRXZlbnRzPVtcImNyZWF0aXZlVmlld1wiLFwic3RhcnRcIixcImZpcnN0UXVhcnRpbGVcIixcIm1pZHBvaW50XCIsXCJ0aGlyZFF1YXJ0aWxlXCIsXCJjb21wbGV0ZVwiLFwicmVzdW1lXCIsXCJwYXVzZVwiLFwicmV3aW5kXCIsXCJza2lwXCIsXCJjbG9zZUxpbmVhclwiLFwiY2xvc2VcIl07Zm9yKGxldCBlIGluIHRoaXMuY3JlYXRpdmUudHJhY2tpbmdFdmVudHMpe2NvbnN0IHQ9dGhpcy5jcmVhdGl2ZS50cmFja2luZ0V2ZW50c1tlXTt0aGlzLnRyYWNraW5nRXZlbnRzW2VdPXQuc2xpY2UoMCl9dGhpcy5jcmVhdGl2ZSBpbnN0YW5jZW9mIENyZWF0aXZlTGluZWFyP3RoaXMuX2luaXRMaW5lYXJUcmFja2luZygpOnRoaXMuX2luaXRWYXJpYXRpb25UcmFja2luZygpLGUmJnRoaXMub24oXCJzdGFydFwiLCgpPT57ZS5sYXN0U3VjY2Vzc2Z1bEFkPURhdGUubm93KCl9KX1faW5pdExpbmVhclRyYWNraW5nKCl7dGhpcy5saW5lYXI9ITAsdGhpcy5za2lwRGVsYXk9dGhpcy5jcmVhdGl2ZS5za2lwRGVsYXksdGhpcy5zZXREdXJhdGlvbih0aGlzLmNyZWF0aXZlLmR1cmF0aW9uKSx0aGlzLmNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPXRoaXMuY3JlYXRpdmUudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSx0aGlzLmNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9dGhpcy5jcmVhdGl2ZS52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXN9X2luaXRWYXJpYXRpb25UcmFja2luZygpe2lmKHRoaXMubGluZWFyPSExLHRoaXMuc2tpcERlbGF5PURFRkFVTFRfU0tJUF9ERUxBWSx0aGlzLnZhcmlhdGlvbil7Zm9yKGxldCBlIGluIHRoaXMudmFyaWF0aW9uLnRyYWNraW5nRXZlbnRzKXtjb25zdCB0PXRoaXMudmFyaWF0aW9uLnRyYWNraW5nRXZlbnRzW2VdO3RoaXMudHJhY2tpbmdFdmVudHNbZV0/dGhpcy50cmFja2luZ0V2ZW50c1tlXT10aGlzLnRyYWNraW5nRXZlbnRzW2VdLmNvbmNhdCh0LnNsaWNlKDApKTp0aGlzLnRyYWNraW5nRXZlbnRzW2VdPXQuc2xpY2UoMCl9dGhpcy52YXJpYXRpb24gaW5zdGFuY2VvZiBOb25MaW5lYXJBZD8odGhpcy5jbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT10aGlzLnZhcmlhdGlvbi5ub25saW5lYXJDbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSx0aGlzLmNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9dGhpcy52YXJpYXRpb24ubm9ubGluZWFyQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyx0aGlzLnNldER1cmF0aW9uKHRoaXMudmFyaWF0aW9uLm1pblN1Z2dlc3RlZER1cmF0aW9uKSk6dGhpcy52YXJpYXRpb24gaW5zdGFuY2VvZiBDb21wYW5pb25BZCYmKHRoaXMuY2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9dGhpcy52YXJpYXRpb24uY29tcGFuaW9uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUsdGhpcy5jbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPXRoaXMudmFyaWF0aW9uLmNvbXBhbmlvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMpfX1zZXREdXJhdGlvbihlKXt0aGlzLmFzc2V0RHVyYXRpb249ZSx0aGlzLnF1YXJ0aWxlcz17Zmlyc3RRdWFydGlsZTpNYXRoLnJvdW5kKDI1KnRoaXMuYXNzZXREdXJhdGlvbikvMTAwLG1pZHBvaW50Ok1hdGgucm91bmQoNTAqdGhpcy5hc3NldER1cmF0aW9uKS8xMDAsdGhpcmRRdWFydGlsZTpNYXRoLnJvdW5kKDc1KnRoaXMuYXNzZXREdXJhdGlvbikvMTAwfX1zZXRQcm9ncmVzcyhlKXtjb25zdCB0PXRoaXMuc2tpcERlbGF5fHxERUZBVUxUX1NLSVBfREVMQVk7aWYoLTE9PT10fHx0aGlzLnNraXBwYWJsZXx8KHQ+ZT90aGlzLmVtaXQoXCJza2lwLWNvdW50ZG93blwiLHQtZSk6KHRoaXMuc2tpcHBhYmxlPSEwLHRoaXMuZW1pdChcInNraXAtY291bnRkb3duXCIsMCkpKSx0aGlzLmFzc2V0RHVyYXRpb24+MCl7Y29uc3QgdD1bXTtpZihlPjApe2NvbnN0IHI9TWF0aC5yb3VuZChlL3RoaXMuYXNzZXREdXJhdGlvbioxMDApO3QucHVzaChcInN0YXJ0XCIpLHQucHVzaChgcHJvZ3Jlc3MtJHtyfSVgKSx0LnB1c2goYHByb2dyZXNzLSR7TWF0aC5yb3VuZChlKX1gKTtmb3IobGV0IHIgaW4gdGhpcy5xdWFydGlsZXMpdGhpcy5pc1F1YXJ0aWxlUmVhY2hlZChyLHRoaXMucXVhcnRpbGVzW3JdLGUpJiYodC5wdXNoKHIpLHRoaXMuX2FscmVhZHlUcmlnZ2VyZWRRdWFydGlsZXNbcl09ITApfXQuZm9yRWFjaChlPT57dGhpcy50cmFjayhlLCEwKX0pLGU8dGhpcy5wcm9ncmVzcyYmdGhpcy50cmFjayhcInJld2luZFwiKX10aGlzLnByb2dyZXNzPWV9aXNRdWFydGlsZVJlYWNoZWQoZSx0LHIpe2xldCBpPSExO3JldHVybiB0PD1yJiYhdGhpcy5fYWxyZWFkeVRyaWdnZXJlZFF1YXJ0aWxlc1tlXSYmKGk9ITApLGl9c2V0TXV0ZWQoZSl7dGhpcy5tdXRlZCE9PWUmJnRoaXMudHJhY2soZT9cIm11dGVcIjpcInVubXV0ZVwiKSx0aGlzLm11dGVkPWV9c2V0UGF1c2VkKGUpe3RoaXMucGF1c2VkIT09ZSYmdGhpcy50cmFjayhlP1wicGF1c2VcIjpcInJlc3VtZVwiKSx0aGlzLnBhdXNlZD1lfXNldEZ1bGxzY3JlZW4oZSl7dGhpcy5mdWxsc2NyZWVuIT09ZSYmdGhpcy50cmFjayhlP1wiZnVsbHNjcmVlblwiOlwiZXhpdEZ1bGxzY3JlZW5cIiksdGhpcy5mdWxsc2NyZWVuPWV9c2V0RXhwYW5kKGUpe3RoaXMuZXhwYW5kZWQhPT1lJiZ0aGlzLnRyYWNrKGU/XCJleHBhbmRcIjpcImNvbGxhcHNlXCIpLHRoaXMuZXhwYW5kZWQ9ZX1zZXRTa2lwRGVsYXkoZSl7XCJudW1iZXJcIj09dHlwZW9mIGUmJih0aGlzLnNraXBEZWxheT1lKX10cmFja0ltcHJlc3Npb24oKXt0aGlzLmltcHJlc3NlZHx8KHRoaXMuaW1wcmVzc2VkPSEwLHRoaXMudHJhY2tVUkxzKHRoaXMuYWQuaW1wcmVzc2lvblVSTFRlbXBsYXRlcyksdGhpcy50cmFjayhcImNyZWF0aXZlVmlld1wiKSl9ZXJyb3JXaXRoQ29kZShlKXt0aGlzLnRyYWNrVVJMcyh0aGlzLmFkLmVycm9yVVJMVGVtcGxhdGVzLHtFUlJPUkNPREU6ZX0pfWNvbXBsZXRlKCl7dGhpcy50cmFjayhcImNvbXBsZXRlXCIpfWNsb3NlKCl7dGhpcy50cmFjayh0aGlzLmxpbmVhcj9cImNsb3NlTGluZWFyXCI6XCJjbG9zZVwiKX1za2lwKCl7dGhpcy50cmFjayhcInNraXBcIiksdGhpcy50cmFja2luZ0V2ZW50cz1bXX1jbGljayhlPW51bGwpe3RoaXMuY2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyYmdGhpcy5jbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLmxlbmd0aCYmdGhpcy50cmFja1VSTHModGhpcy5jbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzKTtjb25zdCB0PXRoaXMuY2xpY2tUaHJvdWdoVVJMVGVtcGxhdGV8fGU7aWYodCl7Y29uc3QgZT10aGlzLmxpbmVhcj97Q09OVEVOVFBMQVlIRUFEOnRoaXMucHJvZ3Jlc3NGb3JtYXR0ZWQoKX06e30scj11dGlsLnJlc29sdmVVUkxUZW1wbGF0ZXMoW3RdLGUpWzBdO3RoaXMuZW1pdChcImNsaWNrdGhyb3VnaFwiLHIpfX10cmFjayhlLHQ9ITEpe1wiY2xvc2VMaW5lYXJcIj09PWUmJiF0aGlzLnRyYWNraW5nRXZlbnRzW2VdJiZ0aGlzLnRyYWNraW5nRXZlbnRzLmNsb3NlJiYoZT1cImNsb3NlXCIpO2NvbnN0IHI9dGhpcy50cmFja2luZ0V2ZW50c1tlXSxpPXRoaXMuZW1pdEFsd2F5c0V2ZW50cy5pbmRleE9mKGUpPi0xO3I/KHRoaXMuZW1pdChlLFwiXCIpLHRoaXMudHJhY2tVUkxzKHIpKTppJiZ0aGlzLmVtaXQoZSxcIlwiKSx0JiYoZGVsZXRlIHRoaXMudHJhY2tpbmdFdmVudHNbZV0saSYmdGhpcy5lbWl0QWx3YXlzRXZlbnRzLnNwbGljZSh0aGlzLmVtaXRBbHdheXNFdmVudHMuaW5kZXhPZihlKSwxKSl9dHJhY2tVUkxzKGUsdD17fSl7dGhpcy5saW5lYXImJih0aGlzLmNyZWF0aXZlJiZ0aGlzLmNyZWF0aXZlLm1lZGlhRmlsZXMmJnRoaXMuY3JlYXRpdmUubWVkaWFGaWxlc1swXSYmdGhpcy5jcmVhdGl2ZS5tZWRpYUZpbGVzWzBdLmZpbGVVUkwmJih0LkFTU0VUVVJJPXRoaXMuY3JlYXRpdmUubWVkaWFGaWxlc1swXS5maWxlVVJMKSx0LkNPTlRFTlRQTEFZSEVBRD10aGlzLnByb2dyZXNzRm9ybWF0dGVkKCkpLHV0aWwudHJhY2soZSx0KX1wcm9ncmVzc0Zvcm1hdHRlZCgpe2NvbnN0IGU9cGFyc2VJbnQodGhpcy5wcm9ncmVzcyk7bGV0IHQ9ZS8zNjAwO3QubGVuZ3RoPDImJih0PWAwJHt0fWApO2xldCByPWUvNjAlNjA7ci5sZW5ndGg8MiYmKHI9YDAke3J9YCk7bGV0IGk9ZSU2MDtyZXR1cm4gaS5sZW5ndGg8MiYmKGk9YDAke3J9YCksYCR7dH06JHtyfToke2l9LiR7cGFyc2VJbnQoMTAwKih0aGlzLnByb2dyZXNzLWUpKX1gfX1leHBvcnR7VkFTVENsaWVudCxWQVNUUGFyc2VyLFZBU1RUcmFja2VyfTsiXSwic291cmNlUm9vdCI6IiJ9