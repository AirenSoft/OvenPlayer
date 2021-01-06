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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2Fkcy9pbWEvQWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9hZHMvaW1hL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvYWRzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvYWRzL3Zhc3QvQWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9hZHMvdmFzdC9MaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy92YXN0LWNsaWVudC5qcyJdLCJuYW1lcyI6WyJBZCIsImVsVmlkZW8iLCJwcm92aWRlciIsInBsYXllckNvbmZpZyIsImFkVGFnVXJsIiwiZXJyb3JDYWxsYmFjayIsIkFVVE9QTEFZX05PVF9BTExPV0VEIiwiQURNQU5HRVJfTE9BRElOR19FUlJPUiIsIkFEU19NQU5BR0VSX0xPQURFRCIsIkFEX0VSUk9SIiwidGhhdCIsImFkc01hbmFnZXJMb2FkZWQiLCJhZHNFcnJvck9jY3VycmVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJPbk1hbmFnZXJMb2FkZWQiLCJPbkFkRXJyb3IiLCJhZERpc3BsYXlDb250YWluZXIiLCJhZHNMb2FkZXIiLCJhZHNNYW5hZ2VyIiwibGlzdGVuZXIiLCJhZHNSZXF1ZXN0IiwiYXV0b3BsYXlBbGxvd2VkIiwiYXV0b3BsYXlSZXF1aXJlc011dGVkIiwiYnJvd3NlciIsImdldEJyb3dzZXIiLCJpc01vYmlsZSIsIm9zIiwiYWREaXNwbGF5Q29udGFpbmVySW5pdGlhbGl6ZWQiLCJzZW5kV2FybmluZ01lc3NhZ2VGb3JNdXRlZFBsYXkiLCJ0cmlnZ2VyIiwiUExBWUVSX1dBUk5JTkciLCJtZXNzYWdlIiwiV0FSTl9NU0dfTVVURURQTEFZIiwidGltZXIiLCJpY29uQ2xhc3MiLCJVSV9JQ09OUyIsInZvbHVtZV9tdXRlIiwib25DbGlja0NhbGxiYWNrIiwic2V0TXV0ZSIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZ29vZ2xlIiwiaW1hIiwiQWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiVHlwZSIsIkFkRXJyb3JFdmVudCIsInNldHRpbmdzIiwic2V0TG9jYWxlIiwiZ2V0TGFuZ3VhZ2UiLCJzZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXMiLCJjcmVhdGVBZENvbnRhaW5lciIsImFkQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiZ2V0Q29udGFpbmVyIiwiYXBwZW5kIiwiYWRFcnJvckV2ZW50IiwiY29uc29sZSIsImdldEVycm9yIiwiZ2V0VmFzdEVycm9yQ29kZSIsImdldE1lc3NhZ2UiLCJpbm5lckVycm9yIiwiZ2V0SW5uZXJFcnJvciIsImdldEVycm9yQ29kZSIsIlNUQVRFX0FEX0VSUk9SIiwiY29kZSIsInBsYXkiLCJhZHNNYW5hZ2VyTG9hZGVkRXZlbnQiLCJhZHNSZW5kZXJpbmdTZXR0aW5ncyIsIkFkc1JlbmRlcmluZ1NldHRpbmdzIiwicmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSIsImRlc3Ryb3kiLCJnZXRBZHNNYW5hZ2VyIiwiYWRDb25hdGluZXJFbG1lbnQiLCJBZERpc3BsYXlDb250YWluZXIiLCJBZHNMb2FkZXIiLCJhZGRFdmVudExpc3RlbmVyIiwib24iLCJDT05URU5UX1ZPTFVNRSIsImRhdGEiLCJtdXRlIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwic2V0QXV0b1BsYXlUb0Fkc1JlcXVlc3QiLCJzZXRBZFdpbGxBdXRvUGxheSIsInNldEFkV2lsbFBsYXlNdXRlZCIsImluaXRSZXF1ZXN0IiwiQWRzUmVxdWVzdCIsImZvcmNlTm9uTGluZWFyRnVsbFNsb3QiLCJyZXF1ZXN0QWRzIiwiY2hlY2tBdXRvcGxheVN1cHBvcnQiLCJ0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlbyIsInNyYyIsIlRFTVBfVklERU9fVVJMIiwibG9hZCIsImdldE5hbWUiLCJQUk9WSURFUl9EQVNIIiwiY2xlYXJBbmRSZXBvcnQiLCJfYXV0b3BsYXlBbGxvd2VkIiwiX2F1dG9wbGF5UmVxdWlyZXNNdXRlZCIsInBhdXNlIiwicmVtb3ZlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwbGF5UHJvbWlzZSIsInVuZGVmaW5lZCIsInRoZW4iLCJlcnJvciIsImlzQWN0aXZlIiwicmVzdW1lIiwiaW5pdGlhbGl6ZSIsInJldHJ5Q291bnQiLCJjaGVja0Fkc01hbmFnZXJJc1JlYWR5IiwiaW5pdCIsIlZpZXdNb2RlIiwiTk9STUFMIiwic3RhcnQiLCJFcnJvciIsInNldFRpbWVvdXQiLCJpc0F1dG9TdGFydCIsInZpZGVvRW5kZWRDYWxsYmFjayIsImNvbXBsZXRlQ29udGVudENhbGxiYWNrIiwiaXNBbGxBZENvbXBsZXRlIiwiaXNMaW5lYXJBZCIsImNvbnRlbnRDb21wbGV0ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCIkYWRzIiwiZmluZCIsIm9mZiIsIkxpc3RlbmVyIiwiYWRzU3BlYyIsImxvd0xldmVsRXZlbnRzIiwiaW50ZXJ2YWxUaW1lciIsIkFEX0JVRkZFUklORyIsIkFkRXZlbnQiLCJDT05URU5UX1BBVVNFX1JFUVVFU1RFRCIsIkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCIsIkFMTF9BRFNfQ09NUExFVEVEIiwiQ0xJQ0siLCJTS0lQUEVEIiwiQ09NUExFVEUiLCJGSVJTVF9RVUFSVElMRSIsIkxPQURFRCIsIk1JRFBPSU5UIiwiUEFVU0VEIiwiUkVTVU1FRCIsIlNUQVJURUQiLCJVU0VSX0NMT1NFIiwiVEhJUkRfUVVBUlRJTEUiLCJpc0FsbEFkQ29tcGVsZXRlIiwiYWRDb21wbGV0ZUNhbGxiYWNrIiwiY3VycmVudEFkIiwiYWRFdmVudCIsInR5cGUiLCJnZXRQb3NpdGlvbiIsInNldFN0YXRlIiwiU1RBVEVfQ09NUExFVEUiLCJQTEFZRVJfQ0xJQ0tFRCIsIlBMQVlFUl9BRF9DTElDSyIsInJlbWFpbmluZ1RpbWUiLCJnZXRSZW1haW5pbmdUaW1lIiwiYWQiLCJnZXRBZCIsIlNUQVRFX0FEX0xPQURFRCIsInJlbWFpbmluZyIsImlzTGluZWFyIiwiU1RBVEVfQURfUEFVU0VEIiwiU1RBVEVfQURfUExBWUlORyIsImFkT2JqZWN0IiwiZHVyYXRpb24iLCJnZXREdXJhdGlvbiIsInNraXBUaW1lT2Zmc2V0IiwiZ2V0U2tpcFRpbWVPZmZzZXQiLCJBRF9DSEFOR0VEIiwic2V0SW50ZXJ2YWwiLCJBRF9USU1FIiwicG9zaXRpb24iLCJza2lwcGFibGUiLCJnZXRBZFNraXBwYWJsZVN0YXRlIiwiY2xlYXJJbnRlcnZhbCIsIlNUQVRFX0FEX0NPTVBMRVRFIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJldmVudE5hbWUiLCJzZXRBZENvbXBsZXRlQ2FsbGJhY2siLCJfYWRDb21wbGV0ZUNhbGxiYWNrIiwibGFuZyIsImNvbnRhaW5lciIsImVsQWRWaWRlbyIsInRleHRWaWV3IiwiYWRCdXR0b24iLCJ2YXN0Q2xpZW50IiwiVkFTVENsaWVudCIsInZhc3RUcmFja2VyIiwic3R5bGUiLCJkaXNwbGF5IiwiZ2V0IiwicmVzIiwiYWRzIiwiVkFTVFRyYWNrZXIiLCJjcmVhdGl2ZXMiLCJ2aWRlb1VSTCIsImxlbmd0aCIsIm1lZGlhRmlsZXMiLCJmaWxlVVJMIiwibXV0ZWQiLCJjaGVja01haW5Db250ZW50TG9hZGVkIiwibWV0YUxvYWRlZCIsIk1FRElBRklMRV9QTEFZQkFDS19FUlJPUiIsIiR0ZXh0VmlldyIsIiRhZEJ1dHRvbiIsIiRlbEFkVmlkZW8iLCJwcm9jZXNzRW5kT2ZBZCIsImhpZGUiLCJwcm9jZXNzU3RhcnRPZkFkIiwic2hvdyIsInNraXBCdXR0b25DbGlja2VkIiwiZXZlbnQiLCJoYXNDbGFzcyIsInNraXAiLCJlcnJvcldpdGhDb2RlIiwiY2FucGxheSIsImVuZGVkIiwiY29tcGxldGUiLCJjbGljayIsInNldFBhdXNlZCIsInRpbWV1cGRhdGUiLCJzZXRQcm9ncmVzcyIsInRhcmdldCIsImN1cnJlbnRUaW1lIiwidm9sdW1lY2hhbmdlIiwic2V0TXV0ZWQiLCJsb2FkZWRtZXRhZGF0YSIsIlNUQVRFX1BMQVlJTkciLCJnZXRTdGF0ZSIsInRyYWNrSW1wcmVzc2lvbiIsInVybCIsIndpbmRvdyIsIm9wZW4iLCJodG1sIiwiYWRkQ2xhc3MiLCJwYXJzZUludCIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJlbGVtZW50T3JNc2UiLCJfIiwiaXNFbGVtZW50IiwiZ2V0VmlkZW9FbGVtZW50IiwibWVkaWEiLCJzZXBhcmF0ZUxpdmUiLCJtc2UiLCJpc0R5bmFtaWMiLCJlcnJvclRyaWdnZXIiLCJTVEFURV9FUlJPUiIsIkVSUk9SIiwicGlja0N1cnJlbnRTb3VyY2UiLCJzb3VyY2VzIiwiY3VycmVudFNvdXJjZSIsInNvdXJjZUluZGV4IiwiTWF0aCIsIm1heCIsImxhYmVsIiwiaSIsImdldFNvdXJjZUluZGV4IiwiaWQiLCJzZXF1ZW5jZSIsInN5c3RlbSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJhZHZlcnRpc2VyIiwicHJpY2luZyIsInN1cnZleSIsImVycm9yVVJMVGVtcGxhdGVzIiwiaW1wcmVzc2lvblVSTFRlbXBsYXRlcyIsImV4dGVuc2lvbnMiLCJBZEV4dGVuc2lvbiIsImF0dHJpYnV0ZXMiLCJjaGlsZHJlbiIsIkFkRXh0ZW5zaW9uQ2hpbGQiLCJuYW1lIiwidmFsdWUiLCJDb21wYW5pb25BZCIsIndpZHRoIiwiaGVpZ2h0Iiwic3RhdGljUmVzb3VyY2UiLCJodG1sUmVzb3VyY2UiLCJpZnJhbWVSZXNvdXJjZSIsImFsdFRleHQiLCJjb21wYW5pb25DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSIsImNvbXBhbmlvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMiLCJ0cmFja2luZ0V2ZW50cyIsIkNyZWF0aXZlIiwiZSIsImFkSWQiLCJhcGlGcmFtZXdvcmsiLCJDcmVhdGl2ZUNvbXBhbmlvbiIsInZhcmlhdGlvbnMiLCJ0cmFjayIsInQiLCJyZXNvbHZlVVJMVGVtcGxhdGVzIiwiSW1hZ2UiLCJyIiwiQVNTRVRVUkkiLCJlbmNvZGVVUklDb21wb25lbnRSRkMzOTg2IiwiQ09OVEVOVFBMQVlIRUFEIiwiRVJST1JDT0RFIiwidGVzdCIsIkNBQ0hFQlVTVElORyIsImxlZnRwYWQiLCJyb3VuZCIsInJhbmRvbSIsInRvU3RyaW5nIiwiVElNRVNUQU1QIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiUkFORE9NIiwicyIsIm4iLCJyZXBsYWNlIiwicHVzaCIsImVuY29kZVVSSUNvbXBvbmVudCIsImNoYXJDb2RlQXQiLCJyYW5nZSIsIm1hcCIsImpvaW4iLCJpc051bWVyaWMiLCJpc05hTiIsInBhcnNlRmxvYXQiLCJpc0Zpbml0ZSIsImZsYXR0ZW4iLCJyZWR1Y2UiLCJjb25jYXQiLCJBcnJheSIsImlzQXJyYXkiLCJ1dGlsIiwiY2hpbGRCeU5hbWUiLCJjaGlsZE5vZGVzIiwibm9kZU5hbWUiLCJjaGlsZHJlbkJ5TmFtZSIsInJlc29sdmVWYXN0QWRUYWdVUkkiLCJpbmRleE9mIiwibG9jYXRpb24iLCJwcm90b2NvbCIsInNsaWNlIiwibGFzdEluZGV4T2YiLCJwYXJzZUJvb2xlYW4iLCJwYXJzZU5vZGVUZXh0IiwidGV4dENvbnRlbnQiLCJ0ZXh0IiwidHJpbSIsImNvcHlOb2RlQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwicGFyc2VEdXJhdGlvbiIsInNwbGl0Iiwic3BsaXRWQVNUIiwibWVyZ2VXcmFwcGVyQWREYXRhIiwidmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzIiwidmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcyIsInZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUiLCJwYXJzZXJVdGlscyIsInBhcnNlQ3JlYXRpdmVDb21wYW5pb24iLCJjb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGUiLCJDcmVhdGl2ZUxpbmVhciIsInNraXBEZWxheSIsImFkUGFyYW1ldGVycyIsImljb25zIiwiSWNvbiIsInByb2dyYW0iLCJ4UG9zaXRpb24iLCJ5UG9zaXRpb24iLCJvZmZzZXQiLCJpY29uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUiLCJpY29uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyIsImljb25WaWV3VHJhY2tpbmdVUkxUZW1wbGF0ZSIsIk1lZGlhRmlsZSIsImRlbGl2ZXJ5VHlwZSIsIm1pbWVUeXBlIiwiY29kZWMiLCJiaXRyYXRlIiwibWluQml0cmF0ZSIsIm1heEJpdHJhdGUiLCJzY2FsYWJsZSIsIm1haW50YWluQXNwZWN0UmF0aW8iLCJwYXJzZUNyZWF0aXZlTGluZWFyIiwiY2hhckF0IiwiYSIsInRvTG93ZXJDYXNlIiwibyIsInBhcnNlWFBvc2l0aW9uIiwicGFyc2VZUG9zaXRpb24iLCJDcmVhdGl2ZU5vbkxpbmVhciIsIk5vbkxpbmVhckFkIiwiZXhwYW5kZWRXaWR0aCIsImV4cGFuZGVkSGVpZ2h0IiwibWluU3VnZ2VzdGVkRHVyYXRpb24iLCJub25saW5lYXJDbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSIsIm5vbmxpbmVhckNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMiLCJwYXJzZUNyZWF0aXZlTm9uTGluZWFyIiwicGFyc2VBZCIsInBhcnNlV3JhcHBlciIsInBhcnNlSW5MaW5lIiwicGFyc2VDcmVhdGl2ZUFkSWRBdHRyaWJ1dGUiLCJwYXJzZUV4dGVuc2lvbnMiLCJ2ZXJzaW9uIiwibW9kZWwiLCJjdXJyZW5jeSIsIm5leHRXcmFwcGVyVVJMIiwibm9kZVZhbHVlIiwiZG9tYWluIiwiRXZlbnRIYW5kbGVycyIsIkV2ZW50RW1pdHRlciIsImNhbGwiLCIkZ2V0TWF4TGlzdGVuZXJzIiwiX21heExpc3RlbmVycyIsImRlZmF1bHRNYXhMaXN0ZW5lcnMiLCJlbWl0Tm9uZSIsImFycmF5Q2xvbmUiLCJlbWl0T25lIiwiZW1pdFR3byIsImVtaXRUaHJlZSIsImwiLCJlbWl0TWFueSIsImFwcGx5IiwiX2FkZExpc3RlbmVyIiwiVHlwZUVycm9yIiwiX2V2ZW50cyIsIm5ld0xpc3RlbmVyIiwiZW1pdCIsIl9ldmVudHNDb3VudCIsInVuc2hpZnQiLCJ3YXJuZWQiLCJlbWl0dGVyIiwiY291bnQiLCJlbWl0V2FybmluZyIsIndhcm4iLCJfb25jZVdyYXAiLCJyZW1vdmVMaXN0ZW5lciIsImFyZ3VtZW50cyIsImxpc3RlbmVyQ291bnQiLCJzcGxpY2VPbmUiLCJwb3AiLCJ1bndyYXBMaXN0ZW5lcnMiLCJ4ZHIiLCJYRG9tYWluUmVxdWVzdCIsInN1cHBvcnRlZCIsIkFjdGl2ZVhPYmplY3QiLCJhc3luYyIsInJlcXVlc3QiLCJ0aW1lb3V0Iiwid2l0aENyZWRlbnRpYWxzIiwic2VuZCIsIm9ucHJvZ3Jlc3MiLCJvbmxvYWQiLCJsb2FkWE1MIiwicmVzcG9uc2VUZXh0IiwicHJvdG90eXBlIiwiY3JlYXRlIiwidXNpbmdEb21haW5zIiwiRG9tYWluIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRNYXhMaXN0ZW5lcnMiLCJnZXRNYXhMaXN0ZW5lcnMiLCJjIiwiY29udGV4dCIsImRvbWFpbkVtaXR0ZXIiLCJkb21haW5UaHJvd24iLCJwIiwiYWRkTGlzdGVuZXIiLCJwcmVwZW5kTGlzdGVuZXIiLCJvbmNlIiwicHJlcGVuZE9uY2VMaXN0ZW5lciIsInJlbW92ZUFsbExpc3RlbmVycyIsImxpc3RlbmVycyIsImV2ZW50TmFtZXMiLCJSZWZsZWN0Iiwib3duS2V5cyIsImZsYXNoVVJMSGFuZGxlciIsImdldCQxIiwibm9kZVVSTEhhbmRsZXIiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsInN1cHBvcnRlZCQxIiwiZ2V0JDIiLCJvdmVycmlkZU1pbWVUeXBlIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlWE1MIiwic3RhdHVzVGV4dCIsIlhIUlVSTEhhbmRsZXIiLCJnZXQkMyIsInVybEhhbmRsZXIiLCJWQVNUUmVzcG9uc2UiLCJERUZBVUxUX01BWF9XUkFQUEVSX0RFUFRIIiwiREVGQVVMVF9FVkVOVF9EQVRBIiwiVkFTVFBhcnNlciIsInJlbWFpbmluZ0FkcyIsInBhcmVudFVSTHMiLCJyb290RXJyb3JVUkxUZW1wbGF0ZXMiLCJtYXhXcmFwcGVyRGVwdGgiLCJVUkxUZW1wbGF0ZUZpbHRlcnMiLCJmZXRjaGluZ09wdGlvbnMiLCJ3cmFwcGVyRGVwdGgiLCJvcmlnaW5hbFVybCIsInJvb3RVUkwiLCJ3cmFwcGVyTGltaXQiLCJ1cmxoYW5kbGVyIiwic2hpZnQiLCJyZXNvbHZlQWRzIiwiYnVpbGRWQVNUUmVzcG9uc2UiLCJpbml0UGFyc2luZ1N0YXR1cyIsImZldGNoVkFTVCIsImlzUm9vdFZBU1QiLCJwYXJzZSIsImdldEVycm9yVVJMVGVtcGxhdGVzIiwiY29tcGxldGVXcmFwcGVyUmVzb2x2aW5nIiwicmVzb2x2ZUFsbCIsIndyYXBwZXJTZXF1ZW5jZSIsImRvY3VtZW50RWxlbWVudCIsInRyYWNrVmFzdEVycm9yIiwicmVzb2x2ZVdyYXBwZXJzIiwiYWxsIiwiZXJyb3JDb2RlIiwiZXJyb3JNZXNzYWdlIiwiRVJST1JNRVNTQUdFIiwic3BsaWNlIiwic3RvcmFnZSIsIkRFRkFVTFRfU1RPUkFHRSIsImdldEl0ZW0iLCJzZXRJdGVtIiwicmVtb3ZlSXRlbSIsImNsZWFyIiwiU3RvcmFnZSIsImluaXRTdG9yYWdlIiwibG9jYWxTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJpc1N0b3JhZ2VEaXNhYmxlZCIsImNhcHBpbmdGcmVlTHVuY2giLCJjYXBwaW5nTWluaW11bVRpbWVJbnRlcnZhbCIsImRlZmF1bHRPcHRpb25zIiwidmFzdFBhcnNlciIsImxhc3RTdWNjZXNzZnVsQWQiLCJ0b3RhbENhbGxzIiwidG90YWxDYWxsc1RpbWVvdXQiLCJnZXRSZW1haW5pbmdBZHMiLCJub3ciLCJoYXNPd25Qcm9wZXJ0eSIsImdldEFuZFBhcnNlVkFTVCIsIkRFRkFVTFRfU0tJUF9ERUxBWSIsImNyZWF0aXZlIiwidmFyaWF0aW9uIiwiaW1wcmVzc2VkIiwiX2FscmVhZHlUcmlnZ2VyZWRRdWFydGlsZXMiLCJlbWl0QWx3YXlzRXZlbnRzIiwiX2luaXRMaW5lYXJUcmFja2luZyIsIl9pbml0VmFyaWF0aW9uVHJhY2tpbmciLCJsaW5lYXIiLCJzZXREdXJhdGlvbiIsImNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlIiwiY2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyIsImFzc2V0RHVyYXRpb24iLCJxdWFydGlsZXMiLCJmaXJzdFF1YXJ0aWxlIiwibWlkcG9pbnQiLCJ0aGlyZFF1YXJ0aWxlIiwiaXNRdWFydGlsZVJlYWNoZWQiLCJwcm9ncmVzcyIsInBhdXNlZCIsImZ1bGxzY3JlZW4iLCJleHBhbmRlZCIsInRyYWNrVVJMcyIsInByb2dyZXNzRm9ybWF0dGVkIiwiY2xvc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBY0EsSUFBTUEsS0FBSyxTQUFMQSxFQUFLLENBQVNDLE9BQVQsRUFBa0JDLFFBQWxCLEVBQTRCQyxZQUE1QixFQUEwQ0MsUUFBMUMsRUFBb0RDLGFBQXBELEVBQWtFO0FBQ3pFO0FBQ0EsUUFBTUMsdUJBQXVCLG9CQUE3QjtBQUNBLFFBQU1DLHlCQUF5Qix5QkFBL0I7QUFDQSxRQUFJQyxxQkFBcUIsRUFBekI7QUFDQSxRQUFJQyxXQUFXLEVBQWY7O0FBRUEsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsT0FBTztBQUNQQyxpQkFBUyxLQURGLEVBQ1M7QUFDaEJDLGdCQUFTLEtBRkYsRUFFUztBQUNoQkMsc0JBQWU7QUFIUixLQUFYO0FBS0EsUUFBSUMsa0JBQWtCLElBQXRCO0FBQ0EsUUFBSUMsWUFBWSxJQUFoQjs7QUFFQSxRQUFJQyxxQkFBcUIsSUFBekI7QUFDQSxRQUFJQyxZQUFZLElBQWhCO0FBQ0EsUUFBSUMsYUFBYSxJQUFqQjtBQUNBLFFBQUlDLFdBQVcsSUFBZjtBQUNBLFFBQUlDLGFBQWEsSUFBakI7QUFDQSxRQUFJQyxrQkFBa0IsS0FBdEI7QUFBQSxRQUE2QkMsd0JBQXdCLEtBQXJEO0FB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RU4sSUFBRSxJQUFSLENBQWFNLEVBQUUvRixNQUFGLEdBQVMsQ0FBVCxLQUFhK0YsVUFBTUEsQ0FBbkIsRUFBd0IsSUFBSUcsSUFBRVQsSUFBRSxFQUFGLEdBQUssRUFBWCxDQUFjUyxFQUFFbEcsTUFBRixHQUFTLENBQVQsS0FBYWtHLFVBQU1BLENBQW5CLEVBQXdCLElBQUl2QyxJQUFFOEIsSUFBRSxFQUFSLENBQVcsT0FBTzlCLEVBQUUzRCxNQUFGLEdBQVMsQ0FBVCxLQUFhMkQsVUFBTXVDLENBQW5CLEdBQTJCSCxDQUEzQixTQUFnQ0csQ0FBaEMsU0FBcUN2QyxDQUFyQyxTQUEwQ3BCLFNBQVMsT0FBSyxLQUFLb1UsUUFBTCxHQUFjbFIsQ0FBbkIsQ0FBVCxDQUFqRDtBQUFtRjs7OztFQUF4dElzSCxZOztRQUFndUl6TixVLEdBQUFBLFU7UUFBVzhTLFUsR0FBQUEsVTtRQUFXdlMsVyxHQUFBQSxXIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+MmVjMTkzYWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDA4LzA0LzIwMTkuXHJcbiAqL1xyXG5pbXBvcnQgQWRzRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9hZHMvaW1hL0xpc3RlbmVyXCI7XHJcbmltcG9ydCB7VEVNUF9WSURFT19VUkx9IGZyb20gXCJhcGkvYWRzL3V0aWxzXCI7XHJcbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgRVJST1IsXHJcbiAgICBDT05URU5UX1ZPTFVNRSxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBJTklUX0FEU19FUlJPUixcclxuICAgIFNUQVRFX0FEX0VSUk9SLFxyXG4gICAgUExBWUVSX1dBUk5JTkcsXHJcbiAgICBDT05URU5UX01FVEEsXHJcbiAgICBXQVJOX01TR19NVVRFRFBMQVksXHJcbiAgICBTVEFURV9BRF9MT0FESU5HLFxyXG4gICAgUFJPVklERVJfREFTSCxcclxuICAgIFVJX0lDT05TXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbmNvbnN0IEFkID0gZnVuY3Rpb24oZWxWaWRlbywgcHJvdmlkZXIsIHBsYXllckNvbmZpZywgYWRUYWdVcmwsIGVycm9yQ2FsbGJhY2spe1xyXG4gICAgLy9Ub2RvIDogbW92ZSBjcmVhdGVBZENvbnRhaW5lciB0byBNZWRpYU1hbmFnZXJcclxuICAgIGNvbnN0IEFVVE9QTEFZX05PVF9BTExPV0VEID0gXCJhdXRvcGxheU5vdEFsbG93ZWRcIjtcclxuICAgIGNvbnN0IEFETUFOR0VSX0xPQURJTkdfRVJST1IgPSBcImFkbWFuYWdlckxvYWRpbmdUaW1lb3V0XCI7XHJcbiAgICBsZXQgQURTX01BTkFHRVJfTE9BREVEID0gXCJcIjtcclxuICAgIGxldCBBRF9FUlJPUiA9IFwiXCI7XHJcblxyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIGxldCBhZHNNYW5hZ2VyTG9hZGVkID0gZmFsc2U7XHJcbiAgICBsZXQgYWRzRXJyb3JPY2N1cnJlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHNwZWMgPSB7XHJcbiAgICAgICAgc3RhcnRlZDogZmFsc2UsIC8vcGxheWVyIHN0YXJ0ZWRcclxuICAgICAgICBhY3RpdmUgOiBmYWxzZSwgLy9vbiBBZFxyXG4gICAgICAgIGlzVmlkZW9FbmRlZCA6IGZhbHNlXHJcbiAgICB9O1xyXG4gICAgbGV0IE9uTWFuYWdlckxvYWRlZCA9IG51bGw7XHJcbiAgICBsZXQgT25BZEVycm9yID0gbnVsbDtcclxuXHJcbiAgICBsZXQgYWREaXNwbGF5Q29udGFpbmVyID0gbnVsbDtcclxuICAgIGxldCBhZHNMb2FkZXIgPSBudWxsO1xyXG4gICAgbGV0IGFkc01hbmFnZXIgPSBudWxsO1xyXG4gICAgbGV0IGxpc3RlbmVyID0gbnVsbDtcclxuICAgIGxldCBhZHNSZXF1ZXN0ID0gbnVsbDtcclxuICAgIGxldCBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZSwgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XHJcbiAgICBsZXQgYnJvd3NlciA9IHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCk7XHJcbiAgICBsZXQgaXNNb2JpbGUgPSBicm93c2VyLm9zID09PSBcIkFuZHJvaWRcIiB8fCBicm93c2VyLm9zID09PSBcImlPU1wiO1xyXG5cclxuICAgIGxldCBhZERpc3BsYXlDb250YWluZXJJbml0aWFsaXplZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0QXV0b1BsYXlBZEJyZWFrcyhmYWxzZSk7XHJcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xyXG5cclxuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRWcGFpZE1vZGUoZ29vZ2xlLmltYS5JbWFTZGtTZXR0aW5ncy5WcGFpZE1vZGUuRU5BQkxFRCk7XHJcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xyXG4gICAgY29uc3Qgc2VuZFdhcm5pbmdNZXNzYWdlRm9yTXV0ZWRQbGF5ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFBMQVlFUl9XQVJOSU5HLCB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgOiBXQVJOX01TR19NVVRFRFBMQVksXHJcbiAgICAgICAgICAgIHRpbWVyIDogMTAgKiAxMDAwLFxyXG4gICAgICAgICAgICBpY29uQ2xhc3MgOiBVSV9JQ09OUy52b2x1bWVfbXV0ZSxcclxuICAgICAgICAgICAgb25DbGlja0NhbGxiYWNrIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldE11dGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogc3RhcnRlZCBcIiwgXCJpc01vYmlsZSA6IFwiLCBpc01vYmlsZSwgYWRUYWdVcmwpO1xyXG5cclxuICAgIHRyeXtcclxuICAgICAgICBBRFNfTUFOQUdFUl9MT0FERUQgPSBnb29nbGUuaW1hLkFkc01hbmFnZXJMb2FkZWRFdmVudC5UeXBlLkFEU19NQU5BR0VSX0xPQURFRDtcclxuICAgICAgICBBRF9FUlJPUiA9IGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1I7XHJcbiAgICAgICAgZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUocGxheWVyQ29uZmlnLmdldExhbmd1YWdlKCkpO1xyXG4gICAgICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xyXG5cclxuICAgICAgICBjb25zdCBjcmVhdGVBZENvbnRhaW5lciA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3AtYWRzJyk7XHJcbiAgICAgICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnb3AtYWRzJyk7XHJcbiAgICAgICAgICAgIHBsYXllckNvbmZpZy5nZXRDb250YWluZXIoKS5hcHBlbmQoYWRDb250YWluZXIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFkQ29udGFpbmVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgT25BZEVycm9yID0gZnVuY3Rpb24oYWRFcnJvckV2ZW50KXtcclxuICAgICAgICAgICAgLy9ub3RlIDogYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpLmdldEVycm9yQ29kZSgpID09PSAxMjA1ICYgYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpID09PSA0MDAgaXMgQnJvd3NlciBVc2VyIEludGVyYWN0aXZlIGVycm9yLlxyXG5cclxuICAgICAgICAgICAgLy9EbyBub3QgdHJpZ2dlcmluZyBFUlJPUi4gYmVjdWFzZSBJdCBqdXN0IEFEIVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpLCBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRNZXNzYWdlKCkpO1xyXG4gICAgICAgICAgICBhZHNFcnJvck9jY3VycmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGlubmVyRXJyb3IgPSBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRJbm5lckVycm9yKCk7XHJcbiAgICAgICAgICAgIGlmKGlubmVyRXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5uZXJFcnJvci5nZXRFcnJvckNvZGUoKSwgaW5uZXJFcnJvci5nZXRNZXNzYWdlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qaWYgKGFkc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9FUlJPUiwge2NvZGUgOiBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRWYXN0RXJyb3JDb2RlKCkgLCBtZXNzYWdlIDogYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0TWVzc2FnZSgpfSk7XHJcbiAgICAgICAgICAgIHNwZWMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNwZWMuc3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcclxuXHJcbiAgICAgICAgICAgIC8qaWYoaW5uZXJFcnJvciAmJiBpbm5lckVycm9yLmdldEVycm9yQ29kZSgpID09PSAxMjA1KXtcclxuICAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgIH0qL1xyXG5cclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICBPbk1hbmFnZXJMb2FkZWQgPSBmdW5jdGlvbihhZHNNYW5hZ2VyTG9hZGVkRXZlbnQpe1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogT25NYW5hZ2VyTG9hZGVkIFwiKTtcclxuICAgICAgICAgICAgbGV0IGFkc1JlbmRlcmluZ1NldHRpbmdzID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVuZGVyaW5nU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgYWRzUmVuZGVyaW5nU2V0dGluZ3MucmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vYWRzUmVuZGVyaW5nU2V0dGluZ3MudXNlU3R5bGVkTm9uTGluZWFyQWRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYoYWRzTWFuYWdlcil7XHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBkZXN0cm95IGFkc01hbmFnZXItLS0tXCIpO1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgYWRzTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhZHNNYW5hZ2VyID0gYWRzTWFuYWdlckxvYWRlZEV2ZW50LmdldEFkc01hbmFnZXIoZWxWaWRlbywgYWRzUmVuZGVyaW5nU2V0dGluZ3MpO1xyXG5cclxuICAgICAgICAgICAgbGlzdGVuZXIgPSBBZHNFdmVudHNMaXN0ZW5lcihhZHNNYW5hZ2VyLCBwcm92aWRlciwgc3BlYywgT25BZEVycm9yKTtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGNyZWF0ZWQgYWRtYW5hZ2VyIGFuZCBsaXN0bmVyIFwiKTtcclxuXHJcbiAgICAgICAgICAgIGFkc01hbmFnZXJMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGFkQ29uYXRpbmVyRWxtZW50ID0gY3JlYXRlQWRDb250YWluZXIoKTtcclxuICAgICAgICBhZERpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIoYWRDb25hdGluZXJFbG1lbnQsIGVsVmlkZW8pO1xyXG4gICAgICAgIGFkc0xvYWRlciA9IG5ldyBnb29nbGUuaW1hLkFkc0xvYWRlcihhZERpc3BsYXlDb250YWluZXIpO1xyXG5cclxuICAgICAgICBhZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBRFNfTUFOQUdFUl9MT0FERUQsIE9uTWFuYWdlckxvYWRlZCwgZmFsc2UpO1xyXG4gICAgICAgIGFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKEFEX0VSUk9SLCBPbkFkRXJyb3IsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogYWREaXNwbGF5Q29udGFpbmVyIGluaXRpYWxpemVkXCIpO1xyXG4gICAgICAgIHByb3ZpZGVyLm9uKENPTlRFTlRfVk9MVU1FLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmKGFkc01hbmFnZXIpe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5tdXRlKXtcclxuICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnNldFZvbHVtZSgwKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc2V0Vm9sdW1lKGRhdGEudm9sdW1lLzEwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGF0KTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2V0QXV0b1BsYXlUb0Fkc1JlcXVlc3QgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgaWYoYWRzUmVxdWVzdCl7XHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBzZXRBRFdpbGxBdXRvUGxheSBcIiwgXCJhdXRvcGxheUFsbG93ZWRcIixhdXRvcGxheUFsbG93ZWQsIFwiYXV0b3BsYXlSZXF1aXJlc011dGVkXCIsYXV0b3BsYXlSZXF1aXJlc011dGVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhZHNSZXF1ZXN0LnNldEFkV2lsbEF1dG9QbGF5KGF1dG9wbGF5QWxsb3dlZCk7XHJcbiAgICAgICAgICAgICAgICBhZHNSZXF1ZXN0LnNldEFkV2lsbFBsYXlNdXRlZChhdXRvcGxheVJlcXVpcmVzTXV0ZWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoYXV0b3BsYXlSZXF1aXJlc011dGVkKXtcclxuICAgICAgICAgICAgICAgICAgICBzZW5kV2FybmluZ01lc3NhZ2VGb3JNdXRlZFBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGluaXRSZXF1ZXN0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgYWRzTWFuYWdlckxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBpbml0UmVxdWVzdCgpIEF1dG9QbGF5IFN1cHBvcnQgOiBcIiwgXCJhdXRvcGxheUFsbG93ZWRcIixhdXRvcGxheUFsbG93ZWQsIFwiYXV0b3BsYXlSZXF1aXJlc011dGVkXCIsYXV0b3BsYXlSZXF1aXJlc011dGVkKTtcclxuICAgICAgICAgICAgLyppZihhZHNSZXF1ZXN0KXtcclxuICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICBhZHNSZXF1ZXN0ID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICAgICAgYWRzUmVxdWVzdC5mb3JjZU5vbkxpbmVhckZ1bGxTbG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8qaWYocGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5icm93c2VyID09PSBcIlNhZmFyaVwiICYmIHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgPT09IFwiaU9TXCIgKXtcclxuICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgICAgIHNldEF1dG9QbGF5VG9BZHNSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIGFkc1JlcXVlc3QuYWRUYWdVcmwgPSBhZFRhZ1VybDtcclxuXHJcbiAgICAgICAgICAgIGFkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiByZXF1ZXN0QWRzIENvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICAvL3R3byB3YXkgd2hhdCBhZCBzdGFydHMuXHJcbiAgICAgICAgICAgIC8vYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7IG9yICBhZHNNYW5hZ2VyLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIC8vd2hhdD8gd2h5Pz8gd3RoPz9cclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgY2hlY2tBdXRvcGxheVN1cHBvcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSA6IGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkgXCIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8uc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XHJcbiAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnNyYyA9IFRFTVBfVklERU9fVVJMO1xyXG4gICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5sb2FkKCk7XHJcblxyXG4gICAgICAgICAgICAvL0Rhc2ggaGFzIGFscmVhZHkgbG9hZGVkIHdoZW4gdHJpZ2dlcmVkIHByb3ZpZGVyLnBsYXkoKSBhbHdheXMuXHJcbiAgICAgICAgICAgIGlmKGlzTW9iaWxlICYmIHByb3ZpZGVyLmdldE5hbWUoKSAhPT0gUFJPVklERVJfREFTSCApe1xyXG4gICAgICAgICAgICAgICAgLy9NYWluIHZpZGVvIHNldHMgdXNlciBnZXN0dXJlIHdoZW4gdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8gdHJpZ2dlcmVkIGNoZWNraW5nLlxyXG4gICAgICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyogRGlmZmVyZW50IGJyb3dzZXItc3BlY2lmaWMgd2F5cyB0byBkZWxpdmVyeSBVSSB0byBvdGhlciBlbGVtZW50cy4gIE15IEd1ZXNzLiAyMDE5LTA2LTE5XHJcbiAgICAgICAgICAgICogICAodGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ncyBVc2VyIEludGVyYWN0aW9uIGRlbGl2ZXJ5IHRvIGVsVmlkZW8uKVxyXG4gICAgICAgICAgICAqICAgTW9iaWxlIENocm9tZSBXZWJWaWV3IDpcclxuICAgICAgICAgICAgKiAgIFlvdSBoYXZlIHRvIHJ1biBlbFZpZGVvLmxvYWQoKSB3aGVuIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvIGlzc3VlcyB3aXRoaW4gNSBzZWNvbmRzIG9mIHVzZXIgaW50ZXJhY3Rpb24uXHJcbiAgICAgICAgICAgICpcclxuICAgICAgICAgICAgKiAgIE1vYmlsZSBpb3Mgc2FmYXJpIDpcclxuICAgICAgICAgICAgKiAgIFlvdSBoYXZlIHRvIHJ1biBlbFZpZGVvLmxvYWQoKSBiZWZvcmUgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8gcnVuIHBsYXkoKS5cclxuICAgICAgICAgICAgKiAqL1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY2xlYXJBbmRSZXBvcnQgPSBmdW5jdGlvbihfYXV0b3BsYXlBbGxvd2VkLCBfYXV0b3BsYXlSZXF1aXJlc011dGVkKXtcclxuICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IF9hdXRvcGxheUFsbG93ZWQ7XHJcbiAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBfYXV0b3BsYXlSZXF1aXJlc011dGVkO1xyXG4gICAgICAgICAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldEF1dG9QbGF5VG9BZHNSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICAgICAgICAgIGlmKCF0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5KXtcclxuICAgICAgICAgICAgICAgICAgICAvL0kgY2FuJ3QgcmVtZW1iZXIgdGhpcyBjYXNlLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogIXRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBsYXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwbGF5UHJvbWlzZSA9IHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBhdXRvIHBsYXkgYWxsb3dlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBtYWtlIGl0IGhlcmUsIHVubXV0ZWQgYXV0b3BsYXkgd29ya3MuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydCh0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogYXV0byBwbGF5IGZhaWxlZFwiLCBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRGlzYWJsZSBNdXRlZCBQbGF5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKnRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLm11dGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnZvbHVtZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5UHJvbWlzZSA9IHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBsYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5UHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBtYWtlIGl0IGhlcmUsIG11dGVkIGF1dG9wbGF5IHdvcmtzIGJ1dCB1bm11dGVkIGF1dG9wbGF5IGRvZXMgbm90LlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRFMgOiBtdXRlZCBhdXRvIHBsYXkgc3VjY2Vzcy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0TXV0ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydCh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogbXV0ZWQgYXV0byBwbGF5IGZhaWxlZFwiLCBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydChmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgOiBwcm9taXNlIG5vdCBzdXBwb3J0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL01heWJlIHRoaXMgaXMgSUUxMS4uLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoYXQuaXNBY3RpdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmFjdGl2ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuc3RhcnRlZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHNwZWMuc3RhcnRlZDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQucGxheSA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYoc3BlYy5zdGFydGVkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnJlc3VtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGFkRGlzcGxheUNvbnRhaW5lci5pbml0aWFsaXplKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFkc01hbmFnZXJMb2FkZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogYWQgc3RhcnQhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5pbml0KFwiMTAwJVwiLCBcIjEwMCVcIiwgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYWRzRXJyb3JPY2N1cnJlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihBRE1BTkdFUl9MT0FESU5HX0VSUk9SKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMTUwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0Fkc01hbmFnZXJJc1JlYWR5LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKEFETUFOR0VSX0xPQURJTkdfRVJST1IpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBdXRvcGxheVN1cHBvcnQoKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIChwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSAmJiAhYXV0b3BsYXlBbGxvd2VkKSApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogYXV0b3BsYXlBbGxvd2VkIDogZmFsc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoQVVUT1BMQVlfTk9UX0FMTE9XRUQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnBhdXNlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LnZpZGVvRW5kZWRDYWxsYmFjayA9IChjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaykgPT4ge1xyXG4gICAgICAgICAgICAvL2xpc3RlbmVyLmlzTGluZWFyQWQgOiBnZXQgY3VycmVudCBhZCdzIHN0YXR1cyB3aGV0aGVyIGxpbmVhciBhZCBvciBub3QuXHJcbiAgICAgICAgICAgIGlmKGxpc3RlbmVyICYmIChsaXN0ZW5lci5pc0FsbEFkQ29tcGxldGUoKSB8fCAhbGlzdGVuZXIuaXNMaW5lYXJBZCgpKSl7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihhZHNFcnJvck9jY3VycmVkKXtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlQ29udGVudENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy9JZiB5b3UgbmVlZCBwbGF5IHRoZSBwb3N0LXJvbGwsIHlvdSBoYXZlIHRvIGNhbGwgdG8gYWRzTG9hZGVyIHdoZW4gY29udGVudHMgd2FzIGNvbXBsZXRlZC5cclxuICAgICAgICAgICAgICAgIHNwZWMuaXNWaWRlb0VuZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGFkc0xvYWRlci5jb250ZW50Q29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmKGFkc0xvYWRlcil7XHJcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBRFNfTUFOQUdFUl9MT0FERUQsIE9uTWFuYWdlckxvYWRlZCk7XHJcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBRF9FUlJPUiwgT25BZEVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoYWRzTWFuYWdlcil7XHJcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoYWREaXNwbGF5Q29udGFpbmVyKXtcclxuICAgICAgICAgICAgICAgIGFkRGlzcGxheUNvbnRhaW5lci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGxpc3RlbmVyKXtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0ICRhZHMgPSBMQSQocGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpKS5maW5kKFwiLm9wLWFkc1wiKTtcclxuICAgICAgICAgICAgaWYoJGFkcyl7XHJcbiAgICAgICAgICAgICAgICAkYWRzLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcm92aWRlci5vZmYoQ09OVEVOVF9WT0xVTUUsIG51bGwsIHRoYXQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgfWNhdGNoIChlcnJvcil7XHJcbiAgICAgICAgLy9sZXQgdGVtcEVycm9yID0gRVJST1JTW0lOSVRfQURTX0VSUk9SXTtcclxuICAgICAgICAvL3RlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgIC8vZXJyb3JDYWxsYmFjayh0ZW1wRXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWQ7XHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDEwLzA0LzIwMTkuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIEVSUk9SLFxyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9TVEFMTEVELFxyXG4gICAgU1RBVEVfTE9BRElORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfQURfTE9BREVELFxyXG4gICAgU1RBVEVfQURfUExBWUlORyxcclxuICAgIFNUQVRFX0FEX1BBVVNFRCxcclxuICAgIFNUQVRFX0FEX0NPTVBMRVRFLFxyXG4gICAgQURfQ0hBTkdFRCxcclxuICAgIEFEX1RJTUUsXHJcbiAgICBTVEFURV9QQVVTRUQsXHJcbiAgICBTVEFURV9FUlJPUixcclxuICAgIENPTlRFTlRfQ09NUExFVEUsXHJcbiAgICBDT05URU5UX1NFRUssXHJcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxyXG4gICAgQ09OVEVOVF9TRUVLRUQsXHJcbiAgICBDT05URU5UX0JVRkZFUixcclxuICAgIENPTlRFTlRfVElNRSxcclxuICAgIENPTlRFTlRfVk9MVU1FLFxyXG4gICAgQ09OVEVOVF9NRVRBLFxyXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxyXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXHJcbiAgICBQTEFZRVJfU1RBVEUsXHJcbiAgICBQTEFZRVJfQ0xJQ0tFRCxcclxuICAgIFBMQVlFUl9BRF9DTElDSyxcclxuICAgIFBST1ZJREVSX0hUTUw1LFxyXG4gICAgUFJPVklERVJfV0VCUlRDLFxyXG4gICAgUFJPVklERVJfREFTSCxcclxuICAgIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGFkc01hbmFnZXIsIHByb3ZpZGVyLCBhZHNTcGVjLCBPbkFkRXJyb3Ipe1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIGxldCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xyXG5cclxuICAgIGxldCBpbnRlcnZhbFRpbWVyID0gbnVsbDtcclxuXHJcbiAgICBjb25zdCBBRF9CVUZGRVJJTkcgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BRF9CVUZGRVJJTkc7XHJcbiAgICBjb25zdCBDT05URU5UX1BBVVNFX1JFUVVFU1RFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVEO1xyXG4gICAgY29uc3QgQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEO1xyXG4gICAgY29uc3QgQURfRVJST1IgPSBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SO1xyXG4gICAgY29uc3QgQUxMX0FEU19DT01QTEVURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BTExfQURTX0NPTVBMRVRFRDtcclxuICAgIGNvbnN0IENMSUNLID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ0xJQ0s7XHJcbiAgICBjb25zdCBTS0lQUEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU0tJUFBFRDtcclxuICAgIGNvbnN0IENPTVBMRVRFID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09NUExFVEU7XHJcbiAgICBjb25zdCBGSVJTVF9RVUFSVElMRT0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuRklSU1RfUVVBUlRJTEU7XHJcbiAgICBjb25zdCBMT0FERUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQ7XHJcbiAgICBjb25zdCBNSURQT0lOVD0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTUlEUE9JTlQ7XHJcbiAgICBjb25zdCBQQVVTRUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5QQVVTRUQ7XHJcbiAgICBjb25zdCBSRVNVTUVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUkVTVU1FRDtcclxuICAgIGNvbnN0IFNUQVJURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TVEFSVEVEO1xyXG4gICAgY29uc3QgVVNFUl9DTE9TRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlVTRVJfQ0xPU0U7XHJcbiAgICBjb25zdCBUSElSRF9RVUFSVElMRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlRISVJEX1FVQVJUSUxFO1xyXG5cclxuICAgIGxldCBpc0FsbEFkQ29tcGVsZXRlID0gZmFsc2U7ICAgLy9Qb3N0IHJvbGzsnYQg7JyE7ZW0XHJcbiAgICBsZXQgYWRDb21wbGV0ZUNhbGxiYWNrID0gbnVsbDtcclxuICAgIGxldCBjdXJyZW50QWQgPSBudWxsO1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSU1BIDogTGlzdGVuZXIgQ3JlYXRlZFwiKTtcclxuICAgICBsb3dMZXZlbEV2ZW50c1tDT05URU5UX1BBVVNFX1JFUVVFU1RFRF0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgTElTVEVORVIgOiBcIiwgYWRFdmVudC50eXBlKTtcclxuXHJcbiAgICAgICAgIC8vVGhpcyBjYWxsbHMgd2hlbiBwbGF5ZXIgaXMgcGxheWluZyBjb250ZW50cyBmb3IgYWQuXHJcbiAgICAgICAgIGlmKGFkc1NwZWMuc3RhcnRlZCl7XHJcbiAgICAgICAgICAgICBhZHNTcGVjLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50c1tDT05URU5UX1JFU1VNRV9SRVFVRVNURURdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJJTUEgTElTVEVORVIgOiBcIiwgYWRFdmVudC50eXBlKTtcclxuICAgICAgICAvL1RoaXMgY2FsbHMgd2hlbiBvbmUgYWQgZW5kZWQuXHJcbiAgICAgICAgLy9BbmQgdGhpcyBpcyBzaWduYWwgd2hhdCBwbGF5IHRoZSBjb250ZW50cy5cclxuICAgICAgICBhZHNTcGVjLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZihhZHNTcGVjLnN0YXJ0ZWQgJiYgKHByb3ZpZGVyLmdldFBvc2l0aW9uKCkgPT09IDAgfHwgIWFkc1NwZWMuaXNWaWRlb0VuZGVkKSAgKXtcclxuICAgICAgICAgICAgcHJvdmlkZXIucGxheSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHNbQURfRVJST1JdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBpc0FsbEFkQ29tcGVsZXRlID0gdHJ1ZTtcclxuICAgICAgICBPbkFkRXJyb3IoYWRFdmVudCk7XHJcbiAgICB9IDtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50c1tBTExfQURTX0NPTVBMRVRFRF0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQSBMSVNURU5FUiA6IFwiLCBhZEV2ZW50LnR5cGUpO1xyXG5cclxuICAgICAgICBpc0FsbEFkQ29tcGVsZXRlID0gdHJ1ZTtcclxuICAgICAgICBpZihhZHNTcGVjLmlzVmlkZW9FbmRlZCl7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHNbQ0xJQ0tdID0gKGFkRXZlbnQpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFBMQVlFUl9DTElDS0VELCB7dHlwZSA6IFBMQVlFUl9BRF9DTElDS30pO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzW0ZJUlNUX1FVQVJUSUxFXSA9IChhZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XHJcbiAgICB9O1xyXG4gICAgLy9cclxuICAgIGxvd0xldmVsRXZlbnRzW0FEX0JVRkZFUklOR10gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEX0JVRkZFUklOR1wiLGFkRXZlbnQudHlwZSk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHNbTE9BREVEXSA9IChhZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XHJcbiAgICAgICAgbGV0IHJlbWFpbmluZ1RpbWUgPSBhZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcclxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9MT0FERUQsIHtyZW1haW5pbmcgOiByZW1haW5pbmdUaW1lLCBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgfSk7XHJcblxyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzW01JRFBPSU5UXSA9IChhZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHNbUEFVU0VEXSA9IChhZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUEFVU0VEKTtcclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50c1tSRVNVTUVEXSA9IChhZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50c1tTVEFSVEVEXSA9IChhZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XHJcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xyXG4gICAgICAgIGN1cnJlbnRBZCA9IGFkO1xyXG5cclxuICAgICAgICBsZXQgYWRPYmplY3QgPSB7XHJcbiAgICAgICAgICAgIGlzTGluZWFyIDogYWQuaXNMaW5lYXIoKSAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uIDogYWQuZ2V0RHVyYXRpb24oKSxcclxuICAgICAgICAgICAgc2tpcFRpbWVPZmZzZXQgOiBhZC5nZXRTa2lwVGltZU9mZnNldCgpICAgICAvL1RoZSBudW1iZXIgb2Ygc2Vjb25kcyBvZiBwbGF5YmFjayBiZWZvcmUgdGhlIGFkIGJlY29tZXMgc2tpcHBhYmxlLlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9DSEFOR0VELCBhZE9iamVjdCk7XHJcblxyXG5cclxuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xyXG5cclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XHJcbiAgICAgICAgICAgIGFkc1NwZWMuc3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIEZvciBhIGxpbmVhciBhZCwgYSB0aW1lciBjYW4gYmUgc3RhcnRlZCB0byBwb2xsIGZvclxyXG4gICAgICAgICAgICAvLyB0aGUgcmVtYWluaW5nIHRpbWUuXHJcbiAgICAgICAgICAgIGludGVydmFsVGltZXIgPSBzZXRJbnRlcnZhbChcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1haW5pbmdUaW1lID0gYWRzTWFuYWdlci5nZXRSZW1haW5pbmdUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gYWQuZ2V0RHVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9USU1FLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uIDogZHVyYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBUaW1lT2Zmc2V0IDogYWQuZ2V0U2tpcFRpbWVPZmZzZXQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nIDogcmVtYWluaW5nVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gOiBkdXJhdGlvbiAtIHJlbWFpbmluZ1RpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBwYWJsZSA6IGFkc01hbmFnZXIuZ2V0QWRTa2lwcGFibGVTdGF0ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAwKTsgLy8gZXZlcnkgMzAwbXNcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcHJvdmlkZXIucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50c1tDT01QTEVURV0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcclxuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcclxuICAgIH07XHJcbiAgICAvL1VzZXIgc2tpcHBlZCBhZC4gc2FtZSBwcm9jZXNzIG9uIGNvbXBsZXRlLlxyXG4gICAgbG93TGV2ZWxFdmVudHNbU0tJUFBFRF0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG5cclxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XHJcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHNbVVNFUl9DTE9TRV0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcclxuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50c1tUSElSRF9RVUFSVElMRV0gPSAoYWRFdmVudCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgICAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgIH0pO1xyXG4gICAgdGhhdC5zZXRBZENvbXBsZXRlQ2FsbGJhY2sgPSAoX2FkQ29tcGxldGVDYWxsYmFjaykgPT4ge1xyXG4gICAgICAgIGFkQ29tcGxldGVDYWxsYmFjayA9IF9hZENvbXBsZXRlQ2FsbGJhY2s7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0FsbEFkQ29tcGxldGUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGlzQWxsQWRDb21wZWxldGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0xpbmVhckFkID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50QWQgID8gY3VycmVudEFkLmlzTGluZWFyKCkgOiB0cnVlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIklNQUV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XHJcbiAgICAgICAgLy9wcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xyXG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDI3LzA2LzIwMTkuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgVEVNUF9WSURFT19VUkwgPSBcImRhdGE6dmlkZW8vbXA0O2Jhc2U2NCwgQUFBQUhHWjBlWEJOTkZZZ0FBQUNBR2x6YjIxcGMyOHlZWFpqTVFBQUFBaG1jbVZsQUFBR0YyMWtZWFRlQkFBQWJHbGlabUZoWXlBeExqSTRBQUJDQUpNZ0JESUFSd0FBQXJFR0JmLy9yZHhGNmIzbTJVaTNsaXpZSU5rajd1OTRNalkwSUMwZ1kyOXlaU0F4TkRJZ2NqSWdPVFUyWXpoa09DQXRJRWd1TWpZMEwwMVFSVWN0TkNCQlZrTWdZMjlrWldNZ0xTQkRiM0I1YkdWbWRDQXlNREF6TFRJd01UUWdMU0JvZEhSd09pOHZkM2QzTG5acFpHVnZiR0Z1TG05eVp5OTRNalkwTG1oMGJXd2dMU0J2Y0hScGIyNXpPaUJqWVdKaFl6MHdJSEpsWmoweklHUmxZbXh2WTJzOU1Ub3dPakFnWVc1aGJIbHpaVDB3ZURFNk1IZ3hNVEVnYldVOWFHVjRJSE4xWW0xbFBUY2djSE41UFRFZ2NITjVYM0prUFRFdU1EQTZNQzR3TUNCdGFYaGxaRjl5WldZOU1TQnRaVjl5WVc1blpUMHhOaUJqYUhKdmJXRmZiV1U5TVNCMGNtVnNiR2x6UFRFZ09IZzRaR04wUFRBZ1kzRnRQVEFnWkdWaFpIcHZibVU5TWpFc01URWdabUZ6ZEY5d2MydHBjRDB4SUdOb2NtOXRZVjl4Y0Y5dlptWnpaWFE5TFRJZ2RHaHlaV0ZrY3owMklHeHZiMnRoYUdWaFpGOTBhSEpsWVdSelBURWdjMnhwWTJWa1gzUm9jbVZoWkhNOU1DQnVjajB3SUdSbFkybHRZWFJsUFRFZ2FXNTBaWEpzWVdObFpEMHdJR0pzZFhKaGVWOWpiMjF3WVhROU1DQmpiMjV6ZEhKaGFXNWxaRjlwYm5SeVlUMHdJR0ptY21GdFpYTTlNQ0IzWldsbmFIUndQVEFnYTJWNWFXNTBQVEkxTUNCclpYbHBiblJmYldsdVBUSTFJSE5qWlc1bFkzVjBQVFF3SUdsdWRISmhYM0psWm5KbGMyZzlNQ0J5WTE5c2IyOXJZV2hsWVdROU5EQWdjbU05WTNKbUlHMWlkSEpsWlQweElHTnlaajB5TXk0d0lIRmpiMjF3UFRBdU5qQWdjWEJ0YVc0OU1DQnhjRzFoZUQwMk9TQnhjSE4wWlhBOU5DQjJZblpmYldGNGNtRjBaVDAzTmpnZ2RtSjJYMkoxWm5OcGVtVTlNekF3TUNCamNtWmZiV0Y0UFRBdU1DQnVZV3hmYUhKa1BXNXZibVVnWm1sc2JHVnlQVEFnYVhCZmNtRjBhVzg5TVM0ME1DQmhjVDB4T2pFdU1EQUFnQUFBQUZabGlJUUw4bUtBQUt2TW5KeWNuSnljbkp5Y25YWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYaUVBU1pBQ0dRQWpnQ0VBU1pBQ0dRQWpnQUFBQUFkQm1qZ1g0R1NBSVFCSmtBSVpBQ09BQUFBQUIwR2FWQVg0R1NBaEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBQUFBQUdRWnBnTDhESklRQkprQUlaQUNPQUlRQkprQUlaQUNPQUFBQUFCa0dhZ0MvQXlTRUFTWkFDR1FBamdBQUFBQVpCbXFBdndNa2hBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QUFBQUFHUVpyQUw4REpJUUJKa0FJWkFDT0FBQUFBQmtHYTRDL0F5U0VBU1pBQ0dRQWpnQ0VBU1pBQ0dRQWpnQUFBQUFaQm13QXZ3TWtoQUVtUUFoa0FJNEFBQUFBR1Fac2dMOERKSVFCSmtBSVpBQ09BSVFCSmtBSVpBQ09BQUFBQUJrR2JRQy9BeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtMkF2d01raEFFbVFBaGtBSTRBQUFBQUdRWnVBTDhESklRQkprQUlaQUNPQUlRQkprQUlaQUNPQUFBQUFCa0dib0MvQXlTRUFTWkFDR1FBamdBQUFBQVpCbThBdndNa2hBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QUFBQUFHUVp2Z0w4REpJUUJKa0FJWkFDT0FBQUFBQmtHYUFDL0F5U0VBU1pBQ0dRQWpnQ0VBU1pBQ0dRQWpnQUFBQUFaQm1pQXZ3TWtoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFBR1FacEFMOERKSVFCSmtBSVpBQ09BQUFBQUJrR2FZQy9BeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtb0F2d01raEFFbVFBaGtBSTRBQUFBQUdRWnFnTDhESklRQkprQUlaQUNPQUlRQkprQUlaQUNPQUFBQUFCa0dhd0MvQXlTRUFTWkFDR1FBamdBQUFBQVpCbXVBdndNa2hBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QUFBQUFHUVpzQUw4REpJUUJKa0FJWkFDT0FBQUFBQmtHYklDL0F5U0VBU1pBQ0dRQWpnQ0VBU1pBQ0dRQWpnQUFBQUFaQm0wQXZ3TWtoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFBR1FadGdMOERKSVFCSmtBSVpBQ09BQUFBQUJrR2JnQ3ZBeVNFQVNaQUNHUUFqZ0NFQVNaQUNHUUFqZ0FBQUFBWkJtNkFud01raEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBQUFBaHViVzl2ZGdBQUFHeHRkbWhrQUFBQUFBQUFBQUFBQUFBQUFBQUQ2QUFBQkRjQUFRQUFBUUFBQUFBQUFBQUFBQUFBQUFFQUFBQUFBQUFBQUFBQUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQXdBQUF6QjBjbUZyQUFBQVhIUnJhR1FBQUFBREFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUEra0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFMQUFBQUNRQUFBQUFBQWtaV1IwY3dBQUFCeGxiSE4wQUFBQUFBQUFBQUVBQUFQcEFBQUFBQUFCQUFBQUFBS29iV1JwWVFBQUFDQnRaR2hrQUFBQUFBQUFBQUFBQUFBQUFBQjFNQUFBZFU1VnhBQUFBQUFBTFdoa2JISUFBQUFBQUFBQUFIWnBaR1VBQUFBQUFBQUFBQUFBQUFCV2FXUmxiMGhoYm1Sc1pYSUFBQUFDVTIxcGJtWUFBQUFVZG0xb1pBQUFBQUVBQUFBQUFBQUFBQUFBQUNSa2FXNW1BQUFBSEdSeVpXWUFBQUFBQUFBQUFRQUFBQXgxY213Z0FBQUFBUUFBQWhOemRHSnNBQUFBcjNOMGMyUUFBQUFBQUFBQUFRQUFBSjloZG1NeEFBQUFBQUFBQUFFQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUxBQWtBQklBQUFBU0FBQUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFHUC8vQUFBQUxXRjJZME1CUXNBTi8rRUFGV2RDd0EzWkFzVHNCRUFBQVBwQUFEcVlBOFVLa2dFQUJXakxnOHNnQUFBQUhIVjFhV1JyYUVEeVh5UlB4Ym81cFJ2UEF5UHpBQUFBQUFBQUFCaHpkSFJ6QUFBQUFBQUFBQUVBQUFBZUFBQUQ2UUFBQUJSemRITnpBQUFBQUFBQUFBRUFBQUFCQUFBQUhITjBjMk1BQUFBQUFBQUFBUUFBQUFFQUFBQUJBQUFBQVFBQUFJeHpkSE42QUFBQUFBQUFBQUFBQUFBZUFBQUREd0FBQUFzQUFBQUxBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBaUhOMFkyOEFBQUFBQUFBQUhnQUFBRVlBQUFObkFBQURld0FBQTVnQUFBTzBBQUFEeHdBQUErTUFBQVAyQUFBRUVnQUFCQ1VBQUFSQkFBQUVYUUFBQkhBQUFBU01BQUFFbndBQUJMc0FBQVRPQUFBRTZnQUFCUVlBQUFVWkFBQUZOUUFBQlVnQUFBVmtBQUFGZHdBQUJaTUFBQVdtQUFBRndnQUFCZDRBQUFYeEFBQUdEUUFBQkdoMGNtRnJBQUFBWEhScmFHUUFBQUFEQUFBQUFBQUFBQUFBQUFBQ0FBQUFBQUFBQkRjQUFBQUFBQUFBQUFBQUFBRUJBQUFBQUFFQUFBQUFBQUFBQUFBQUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUFBa1pXUjBjd0FBQUJ4bGJITjBBQUFBQUFBQUFBRUFBQVFrQUFBRGNBQUJBQUFBQUFQZ2JXUnBZUUFBQUNCdFpHaGtBQUFBQUFBQUFBQUFBQUFBQUFDN2dBQUF5a0JWeEFBQUFBQUFMV2hrYkhJQUFBQUFBQUFBQUhOdmRXNEFBQUFBQUFBQUFBQUFBQUJUYjNWdVpFaGhibVJzWlhJQUFBQURpMjFwYm1ZQUFBQVFjMjFvWkFBQUFBQUFBQUFBQUFBQUpHUnBibVlBQUFBY1pISmxaZ0FBQUFBQUFBQUJBQUFBREhWeWJDQUFBQUFCQUFBRFQzTjBZbXdBQUFCbmMzUnpaQUFBQUFBQUFBQUJBQUFBVjIxd05HRUFBQUFBQUFBQUFRQUFBQUFBQUFBQUFBSUFFQUFBQUFDN2dBQUFBQUFBTTJWelpITUFBQUFBQTRDQWdDSUFBZ0FFZ0lDQUZFQVZCYmpZQUF1NEFBQUFEY29GZ0lDQUFoR1FCb0NBZ0FFQ0FBQUFJSE4wZEhNQUFBQUFBQUFBQWdBQUFESUFBQVFBQUFBQUFRQUFBa0FBQUFGVWMzUnpZd0FBQUFBQUFBQWJBQUFBQVFBQUFBRUFBQUFCQUFBQUFnQUFBQUlBQUFBQkFBQUFBd0FBQUFFQUFBQUJBQUFBQkFBQUFBSUFBQUFCQUFBQUJnQUFBQUVBQUFBQkFBQUFCd0FBQUFJQUFBQUJBQUFBQ0FBQUFBRUFBQUFCQUFBQUNRQUFBQUlBQUFBQkFBQUFDZ0FBQUFFQUFBQUJBQUFBQ3dBQUFBSUFBQUFCQUFBQURRQUFBQUVBQUFBQkFBQUFEZ0FBQUFJQUFBQUJBQUFBRHdBQUFBRUFBQUFCQUFBQUVBQUFBQUlBQUFBQkFBQUFFUUFBQUFFQUFBQUJBQUFBRWdBQUFBSUFBQUFCQUFBQUZBQUFBQUVBQUFBQkFBQUFGUUFBQUFJQUFBQUJBQUFBRmdBQUFBRUFBQUFCQUFBQUZ3QUFBQUlBQUFBQkFBQUFHQUFBQUFFQUFBQUJBQUFBR1FBQUFBSUFBQUFCQUFBQUdnQUFBQUVBQUFBQkFBQUFHd0FBQUFJQUFBQUJBQUFBSFFBQUFBRUFBQUFCQUFBQUhnQUFBQUlBQUFBQkFBQUFId0FBQUFRQUFBQUJBQUFBNEhOMGMzb0FBQUFBQUFBQUFBQUFBRE1BQUFBYUFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUNNYzNSamJ3QUFBQUFBQUFBZkFBQUFMQUFBQTFVQUFBTnlBQUFEaGdBQUE2SUFBQU8rQUFBRDBRQUFBKzBBQUFRQUFBQUVIQUFBQkM4QUFBUkxBQUFFWndBQUJIb0FBQVNXQUFBRXFRQUFCTVVBQUFUWUFBQUU5QUFBQlJBQUFBVWpBQUFGUHdBQUJWSUFBQVZ1QUFBRmdRQUFCWjBBQUFXd0FBQUZ6QUFBQmVnQUFBWDdBQUFHRndBQUFHSjFaSFJoQUFBQVdtMWxkR0VBQUFBQUFBQUFJV2hrYkhJQUFBQUFBQUFBQUcxa2FYSmhjSEJzQUFBQUFBQUFBQUFBQUFBQUxXbHNjM1FBQUFBbHFYUnZid0FBQUIxa1lYUmhBQUFBQVFBQUFBQk1ZWFptTlRVdU16TXVNVEF3XCI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjUvMDYvMjAxOS5cclxuICovXHJcblxyXG5pbXBvcnQgeyBWQVNUQ2xpZW50LCBWQVNUVHJhY2tlciB9IGZyb20gJ3V0aWxzL3Zhc3QtY2xpZW50JztcclxuaW1wb3J0IEFkc0V2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvYWRzL3Zhc3QvTGlzdGVuZXJcIjtcclxuaW1wb3J0IHtURU1QX1ZJREVPX1VSTH0gZnJvbSBcImFwaS9hZHMvdXRpbHNcIjtcclxuaW1wb3J0IHtcclxuICAgIEVSUk9SLFxyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9TVEFMTEVELFxyXG4gICAgU1RBVEVfTE9BRElORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfQURfTE9BREVELFxyXG4gICAgU1RBVEVfQURfUExBWUlORyxcclxuICAgIFNUQVRFX0FEX1BBVVNFRCxcclxuICAgIFNUQVRFX0FEX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfQURfRVJST1IsXHJcbiAgICBDT05URU5UX01FVEEsXHJcbiAgICBQUk9WSURFUl9EQVNIXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbmNvbnN0IEFkID0gZnVuY3Rpb24oZWxWaWRlbywgcHJvdmlkZXIsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpe1xyXG4gICAgY29uc3QgQVVUT1BMQVlfTk9UX0FMTE9XRUQgPSBcImF1dG9wbGF5Tm90QWxsb3dlZFwiO1xyXG5cclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICBzdGFydGVkOiBmYWxzZSwgLy9wbGF5ZXIgc3RhcnRlZFxyXG4gICAgICAgIGFjdGl2ZSA6IGZhbHNlLCAvL29uIEFkXHJcbiAgICAgICAgaXNWaWRlb0VuZGVkIDogZmFsc2UsXHJcbiAgICAgICAgbGFuZyA6IHBsYXllckNvbmZpZy5nZXRMYW5ndWFnZSgpXHJcbiAgICB9O1xyXG4gICAgbGV0IGFkc0Vycm9yT2NjdXJyZWQgPSBmYWxzZTtcclxuICAgIGxldCBsaXN0ZW5lciA9IG51bGw7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lciA9IFwiXCI7XHJcbiAgICBsZXQgZWxBZFZpZGVvID0gbnVsbDtcclxuICAgIGxldCB0ZXh0VmlldyA9IFwiXCI7XHJcbiAgICBsZXQgYWRCdXR0b24gPSBcIlwiO1xyXG5cclxuICAgIGxldCBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZSwgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XHJcbiAgICBsZXQgYnJvd3NlciA9IHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCk7XHJcbiAgICBsZXQgaXNNb2JpbGUgPSBicm93c2VyLm9zID09PSBcIkFuZHJvaWRcIiB8fCBicm93c2VyLm9zID09PSBcImlPU1wiO1xyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUFkQ29udGFpbmVyID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3AtYWRzJyk7XHJcbiAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdvcC1hZHMnKTtcclxuICAgICAgICBwbGF5ZXJDb25maWcuZ2V0Q29udGFpbmVyKCkuYXBwZW5kKGFkQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgZWxBZFZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICBlbEFkVmlkZW8uc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XHJcbiAgICAgICAgZWxBZFZpZGVvLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnQWR2ZXJ0aXNlbWVudCcpO1xyXG4gICAgICAgIGVsQWRWaWRlby5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ29wLWFkcy12YXN0LXZpZGVvJyk7XHJcblxyXG4gICAgICAgIGFkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYWRCdXR0b24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdvcC1hZHMtYnV0dG9uJyk7XHJcblxyXG4gICAgICAgIHRleHRWaWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGV4dFZpZXcuc2V0QXR0cmlidXRlKCdjbGFzcycsICdvcC1hZHMtdGV4dHZpZXcnKTtcclxuXHJcbiAgICAgICAgYWRCdXR0b24uYXBwZW5kKHRleHRWaWV3KTtcclxuICAgICAgICBhZENvbnRhaW5lci5hcHBlbmQoZWxBZFZpZGVvKTtcclxuICAgICAgICBhZENvbnRhaW5lci5hcHBlbmQoYWRCdXR0b24pO1xyXG5cclxuICAgICAgICByZXR1cm4gYWRDb250YWluZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnRhaW5lciA9IGNyZWF0ZUFkQ29udGFpbmVyKCk7XHJcblxyXG4gICAgbGV0IHZhc3RDbGllbnQgPSBuZXcgVkFTVENsaWVudCgpO1xyXG4gICAgbGV0IHZhc3RUcmFja2VyID0gbnVsbDtcclxuICAgIGxldCBhZCA9IG51bGw7XHJcblxyXG5cclxuICAgIGNvbnN0IE9uQWRFcnJvciA9IGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgYWRzRXJyb3JPY2N1cnJlZCA9IHRydWU7XHJcbiAgICAgICAgZWxBZFZpZGVvLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0VSUk9SLCB7Y29kZSA6IGVycm9yLmNvZGUsIG1lc3NhZ2UgOiBlcnJvci5tZXNzYWdlfSk7XHJcbiAgICAgICAgc3BlYy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaW5pdFJlcXVlc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFzdENsaWVudC5nZXQoYWRUYWdVcmwpIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHRoZSBwYXJzZWQgVkFTVCByZXNwb25zZVxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogaW5pdFJlcXVlc3QoKVwiKTtcclxuICAgICAgICAgICAgYWQgPSByZXMuYWRzWzBdO1xyXG4gICAgICAgICAgICBpZighYWQpe1xyXG4gICAgICAgICAgICAgICAgdGhyb3cge2NvZGUgOiA0MDEsIG1lc3NhZ2UgOiBcIkZpbGUgbm90IGZvdW5kLiBVbmFibGUgdG8gZmluZCBMaW5lYXIvTWVkaWFGaWxlIGZyb20gVVJJLlwifTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXN0VHJhY2tlciA9IG5ldyBWQVNUVHJhY2tlcih2YXN0Q2xpZW50LCBhZCwgYWQuY3JlYXRpdmVzWzBdKTtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBjcmVhdGVkIGFkIHRyYWNrZXIuXCIpO1xyXG5cclxuICAgICAgICAgICAgbGlzdGVuZXIgPSBBZHNFdmVudHNMaXN0ZW5lcihlbEFkVmlkZW8sIHZhc3RUcmFja2VyLCBwcm92aWRlciwgc3BlYywgYWRCdXR0b24sIHRleHRWaWV3LCBPbkFkRXJyb3IpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZpZGVvVVJMID0gIFwiXCI7XHJcbiAgICAgICAgICAgIGlmKGFkLmNyZWF0aXZlcyAmJiBhZC5jcmVhdGl2ZXMubGVuZ3RoID4gMCAmJiBhZC5jcmVhdGl2ZXNbMF0ubWVkaWFGaWxlcyAmJiBhZC5jcmVhdGl2ZXNbMF0ubWVkaWFGaWxlcy5sZW5ndGggPiAwICYmIGFkLmNyZWF0aXZlc1swXS5tZWRpYUZpbGVzWzBdLmZpbGVVUkwpe1xyXG4gICAgICAgICAgICAgICAgdmlkZW9VUkwgPSBhZC5jcmVhdGl2ZXNbMF0ubWVkaWFGaWxlc1swXS5maWxlVVJMO1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IG1lZGlhIHVybCA6IFwiLCB2aWRlb1VSTCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxBZFZpZGVvLnNyYyA9IHZpZGVvVVJMO1xyXG5cclxuICAgICAgICAgICAgLy9rZWVwIHZvbHVtZSBldmVuIGlmIHBsYXlsaXN0IGl0ZW0gY2hhbmdlcy5cclxuICAgICAgICAgICAgZWxBZFZpZGVvLnZvbHVtZSA9IGVsVmlkZW8udm9sdW1lO1xyXG4gICAgICAgICAgICBlbEFkVmlkZW8ubXV0ZWQgPSBlbFZpZGVvLm11dGVkO1xyXG5cclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgIE9uQWRFcnJvcihlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIGNvbnN0IGNoZWNrQXV0b3BsYXlTdXBwb3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBjaGVja0F1dG9wbGF5U3VwcG9ydCgpIFwiKTtcclxuXHJcbiAgICAgICAgbGV0IHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJ3RydWUnKTtcclxuICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5zcmMgPSBURU1QX1ZJREVPX1VSTDtcclxuICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5sb2FkKCk7XHJcblxyXG5cclxuICAgICAgICBlbEFkVmlkZW8ubG9hZCgpOyAgIC8vZm9yIGlvcyBVc2VyIEludGVyYWN0aW9uIHByb2JsZW1cclxuICAgICAgICAvL0Rhc2ggaGFzIGFscmVhZHkgbG9hZGVkIHdoZW4gdHJpZ2dlcmVkIHByb3ZpZGVyLnBsYXkoKSBhbHdheXMuXHJcbiAgICAgICAgaWYoaXNNb2JpbGUgJiYgcHJvdmlkZXIuZ2V0TmFtZSgpICE9PSBQUk9WSURFUl9EQVNIICl7XHJcbiAgICAgICAgICAgIC8vTWFpbiB2aWRlbyBzZXRzIHVzZXIgZ2VzdHVyZSB3aGVuIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvIHRyaWdnZXJlZCBjaGVja2luZy5cclxuICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNsZWFyQW5kUmVwb3J0ID0gZnVuY3Rpb24oX2F1dG9wbGF5QWxsb3dlZCwgX2F1dG9wbGF5UmVxdWlyZXNNdXRlZCl7XHJcbiAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IF9hdXRvcGxheUFsbG93ZWQ7XHJcbiAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IF9hdXRvcGxheVJlcXVpcmVzTXV0ZWQ7XHJcbiAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnJlbW92ZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgICAgICBpZighdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucGxheSl7XHJcbiAgICAgICAgICAgICAgICAvL0kgY2FuJ3QgcmVtZW1iZXIgdGhpcyBjYXNlLi4uXHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogIXRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBsYXlcIik7XHJcbiAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydCh0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXlQcm9taXNlID0gdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXlQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBhdXRvIHBsYXkgYWxsb3dlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIG1ha2UgaXQgaGVyZSwgdW5tdXRlZCBhdXRvcGxheSB3b3Jrcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogYXV0byBwbGF5IGZhaWxlZFwiLCBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IHByb21pc2Ugbm90IHN1cHBvcnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9NYXliZSB0aGlzIGlzIElFMTEuLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJBbmRSZXBvcnQodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhhdC5pc0FjdGl2ZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5hY3RpdmU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zdGFydGVkID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnN0YXJ0ZWQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMuc3RhcnRlZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBlbEFkVmlkZW8ucGxheSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrTWFpbkNvbnRlbnRMb2FkZWQgPSBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3dhaXQgZm9yIG1haW4gY29udGVudHMgbWV0YSBsb2FkZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9oYXZlIHRvIHRyaWdnZXIgQ09OVEVOVF9NRVRBIGZpcnN0LiBuZXh0IHRyaWdnZXIgQURfQ0hBTkdFRC5cclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRDb250cm9sVUkgZmlyc3QgLT4gIGluaXQgYWQgVUlcclxuICAgICAgICAgICAgICAgICAgICAvL01heWJlIGdvb2dsZSBpbWEgd2FpdHMgY29udGVudCBsb2FkZWQgaW50ZXJuYWwuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocHJvdmlkZXIubWV0YUxvYWRlZCgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IG1haW4gY29udGVudHMgbWV0YSBsb2FkZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0F1dG9wbGF5U3VwcG9ydCgpLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCAocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkgJiYgIWF1dG9wbGF5QWxsb3dlZCkgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogYXV0b3BsYXlBbGxvd2VkIDogZmFsc2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihBVVRPUExBWV9OT1RfQUxMT1dFRCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tNYWluQ29udGVudExvYWRlZCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNoZWNrTWFpbkNvbnRlbnRMb2FkZWQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xyXG4gICAgICAgIGVsQWRWaWRlby5wYXVzZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL0VuZCBPZiBNYWluIENvbnRlbnRzLlxyXG4gICAgdGhhdC52aWRlb0VuZGVkQ2FsbGJhY2sgPSAoY29tcGxldGVDb250ZW50Q2FsbGJhY2spID0+IHtcclxuXHJcbiAgICAgICAgY29tcGxldGVDb250ZW50Q2FsbGJhY2soKTtcclxuICAgICAgICAvL2NoZWNrIHRydWUgd2hlbiBtYWluIGNvbnRlbnRzIGVuZGVkLlxyXG4gICAgICAgIHNwZWMuaXNWaWRlb0VuZGVkID0gdHJ1ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYobGlzdGVuZXIpe1xyXG4gICAgICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFzdFRyYWNrZXIgPSBudWxsO1xyXG4gICAgICAgIHZhc3RDbGllbnQgPSBudWxsO1xyXG5cclxuICAgICAgICBjb250YWluZXIucmVtb3ZlKCk7XHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWQ7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyNi8wNi8yMDE5LlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICAgIEVSUk9SLFxyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9TVEFMTEVELFxyXG4gICAgU1RBVEVfTE9BRElORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfQURfTE9BREVELFxyXG4gICAgU1RBVEVfQURfUExBWUlORyxcclxuICAgIFNUQVRFX0FEX1BBVVNFRCxcclxuICAgIFNUQVRFX0FEX0NPTVBMRVRFLFxyXG4gICAgQURfQ0hBTkdFRCxcclxuICAgIEFEX1RJTUUsXHJcbiAgICBTVEFURV9QQVVTRUQsXHJcbiAgICBTVEFURV9FUlJPUixcclxuICAgIENPTlRFTlRfQ09NUExFVEUsXHJcbiAgICBDT05URU5UX1NFRUssXHJcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxyXG4gICAgQ09OVEVOVF9TRUVLRUQsXHJcbiAgICBDT05URU5UX0JVRkZFUixcclxuICAgIENPTlRFTlRfVElNRSxcclxuICAgIENPTlRFTlRfVk9MVU1FLFxyXG4gICAgQ09OVEVOVF9NRVRBLFxyXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxyXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXHJcbiAgICBQTEFZRVJfU1RBVEUsXHJcbiAgICBQTEFZRVJfQ0xJQ0tFRCxcclxuICAgIFBMQVlFUl9BRF9DTElDSyxcclxuICAgIFBST1ZJREVSX0hUTUw1LFxyXG4gICAgUFJPVklERVJfV0VCUlRDLFxyXG4gICAgUFJPVklERVJfREFTSCxcclxuICAgIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xyXG5cclxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihlbEFkVmlkZW8sIHZhc3RUcmFja2VyLCBwcm92aWRlciwgYWRzU3BlYywgYWRCdXR0b24sIHRleHRWaWV3LCBPbkFkRXJyb3Ipe1xyXG4gICAgY29uc3QgbG93TGV2ZWxFdmVudHMgPSB7fTtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBjb25zdCBNRURJQUZJTEVfUExBWUJBQ0tfRVJST1IgPSAnNDA1JztcclxuXHJcbiAgICBsZXQgJHRleHRWaWV3ID0gTEEkKHRleHRWaWV3KTtcclxuICAgIGxldCAkYWRCdXR0b24gPSBMQSQoYWRCdXR0b24pO1xyXG4gICAgbGV0ICRlbEFkVmlkZW8gPSBMQSQoZWxBZFZpZGVvKTtcclxuXHJcbiAgICBwcm92aWRlci5vbihDT05URU5UX1ZPTFVNRSwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIGlmKGRhdGEubXV0ZSl7XHJcbiAgICAgICAgICAgIGVsQWRWaWRlby5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGVsQWRWaWRlby5tdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlbEFkVmlkZW8udm9sdW1lID0gZGF0YS52b2x1bWUvMTAwO1xyXG4gICAgICAgIH1cclxuICAgIH0sIHRoYXQpO1xyXG5cclxuICAgIC8vTGlrZSBhIENPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRFxyXG4gICAgY29uc3QgcHJvY2Vzc0VuZE9mQWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICRhZEJ1dHRvbi5oaWRlKCk7XHJcblxyXG4gICAgICAgIGlmKGFkc1NwZWMuc3RhcnRlZCAmJiAocHJvdmlkZXIuZ2V0UG9zaXRpb24oKSA9PT0gMCB8fCAhYWRzU3BlYy5pc1ZpZGVvRW5kZWQpICApe1xyXG4gICAgICAgICAgICAkZWxBZFZpZGVvLmhpZGUoKTtcclxuICAgICAgICAgICAgcHJvdmlkZXIucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcclxuICAgIH07XHJcbiAgICAvL0xpa2UgYSBDT05URU5UX1BBVVNFX1JFUVVFU1RFRFxyXG4gICAgY29uc3QgcHJvY2Vzc1N0YXJ0T2ZBZCA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICRlbEFkVmlkZW8uc2hvdygpO1xyXG4gICAgICAgICRhZEJ1dHRvbi5zaG93KCk7XHJcblxyXG4gICAgfTtcclxuICAgIGNvbnN0IHNraXBCdXR0b25DbGlja2VkID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIGlmKCR0ZXh0Vmlldy5oYXNDbGFzcyhcInZpZGVvQWRVaUFjdGlvblwiKSl7XHJcbiAgICAgICAgICAgIHZhc3RUcmFja2VyLnNraXAoKTtcclxuICAgICAgICAgICAgZWxBZFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHByb2Nlc3NFbmRPZkFkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0ZXh0Vmlldy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2tpcEJ1dHRvbkNsaWNrZWQsIGZhbHNlKTtcclxuXHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMuZXJyb3IgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBsaXN0ZW5lciA6IGVycm9yLlwiLCBlbEFkVmlkZW8uZXJyb3IpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogZXJyb3IuXCIsIGVsQWRWaWRlby5lcnJvcik7XHJcbiAgICAgICAgbGV0IGVycm9yID0ge307XHJcbiAgICAgICAgY29uc3QgY29kZSA9IChlbEFkVmlkZW8uZXJyb3IgJiYgZWxBZFZpZGVvLmVycm9yLmNvZGUpIHx8IDA7XHJcblxyXG4gICAgICAgIGlmKGNvZGUgPT09IDIpIHtcclxuICAgICAgICAgICAgZXJyb3IuY29kZSA9IDQwMjtcclxuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IFwiVGltZW91dCBvZiBNZWRpYUZpbGUgVVJJLlwiO1xyXG4gICAgICAgIH1lbHNlIGlmKGNvZGUgPT09IDMpe1xyXG4gICAgICAgICAgICBlcnJvci5jb2RlID0gNDA1O1xyXG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gXCJQcm9ibGVtIGRpc3BsYXlpbmcgTWVkaWFGaWxlLiBWaWRlbyBwbGF5ZXIgZm91bmQgYSBNZWRpYUZpbGUgd2l0aCBzdXBwb3J0ZWQgdHlwZSBidXQgY291bGRu4oCZdCBkaXNwbGF5IGl0LiBNZWRpYUZpbGUgbWF5IGluY2x1ZGU6IHVuc3VwcG9ydGVkIGNvZGVjcywgZGlmZmVyZW50IE1JTUUgdHlwZSB0aGFuIE1lZGlhRmlsZUB0eXBlLCB1bnN1cHBvcnRlZCBkZWxpdmVyeSBtZXRob2QsIGV0Yy5cIjtcclxuICAgICAgICB9ZWxzZSBpZihjb2RlID09PSA0KXtcclxuICAgICAgICAgICAgZXJyb3IuY29kZSA9IDQwMztcclxuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IFwiQ291bGRu4oCZdCBmaW5kIE1lZGlhRmlsZSB0aGF0IGlzIHN1cHBvcnRlZCBieSB0aGlzIHZpZGVvIHBsYXllciwgYmFzZWQgb24gdGhlIGF0dHJpYnV0ZXMgb2YgdGhlIE1lZGlhRmlsZSBlbGVtZW50LlwiO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBlcnJvci5jb2RlID0gNDAwO1xyXG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gXCJHZW5lcmFsIExpbmVhciBlcnJvci4gVmlkZW8gcGxheWVyIGlzIHVuYWJsZSB0byBkaXNwbGF5IHRoZSBMaW5lYXIgQWQuXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhc3RUcmFja2VyLmVycm9yV2l0aENvZGUoZXJyb3IuY29kZSk7XHJcbiAgICAgICAgT25BZEVycm9yKE1FRElBRklMRV9QTEFZQkFDS19FUlJPUik7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmNhbnBsYXkgPSBmdW5jdGlvbigpe1xyXG5cclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50cy5lbmRlZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFzdFRyYWNrZXIuY29tcGxldGUoKTtcclxuXHJcbiAgICAgICAgcHJvY2Vzc0VuZE9mQWQoKTtcclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50cy5jbGljayA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB2YXN0VHJhY2tlci5jbGljaygpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXkgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhc3RUcmFja2VyLnNldFBhdXNlZChmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHMucGF1c2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhc3RUcmFja2VyLnNldFBhdXNlZCh0cnVlKTtcclxuICAgIH07XHJcbiAgICBsb3dMZXZlbEV2ZW50cy50aW1ldXBkYXRlID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIHZhc3RUcmFja2VyLnNldFByb2dyZXNzKGV2ZW50LnRhcmdldC5jdXJyZW50VGltZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9USU1FLCB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uIDogZWxBZFZpZGVvLmR1cmF0aW9uLFxyXG4gICAgICAgICAgICBwb3NpdGlvbiA6IGVsQWRWaWRlby5jdXJyZW50VGltZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnZvbHVtZWNoYW5nZSA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBBZCBWaWRlbyBWb2x1bWVjaGFuZ2UuXCIpO1xyXG4gICAgICAgIHZhc3RUcmFja2VyLnNldE11dGVkKGV2ZW50LnRhcmdldC5tdXRlZCk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkbWV0YWRhdGEgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBsaXN0ZW5lciA6IEFkIENPTlRFTlQgTE9BREVEIC5cIik7XHJcblxyXG4gICAgICAgIC8vRmxhc2ggcGxheSBpcyB2ZXJ5IGZhc3QuLi5cclxuICAgICAgICBpZihTVEFURV9QTEFZSU5HID09PSBwcm92aWRlci5nZXRTdGF0ZSgpKXtcclxuICAgICAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhc3RUcmFja2VyLnRyYWNrSW1wcmVzc2lvbigpO1xyXG5cclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0xPQURFRCwge3JlbWFpbmluZyA6IGVsQWRWaWRlby5kdXJhdGlvbiwgaXNMaW5lYXIgOiB0cnVlfSk7XHJcbiAgICAgICAgZWxBZFZpZGVvLnBsYXkoKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFzdFRyYWNrZXIub24oJ3NraXAnLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gc2tpcCB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBza2lwcGVkXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFzdFRyYWNrZXIub24oJ211dGUnLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gbXV0ZSB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBtdXRlZFwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhc3RUcmFja2VyLm9uKCd1bm11dGUnLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gdW5tdXRlIHRyYWNraW5nIFVSTHMgaGF2ZSBiZWVuIGNhbGxlZFxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBsaXN0ZW5lciA6IHVubXV0ZWRcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXN0VHJhY2tlci5vbigncmVzdW1lJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIHJlc3VtZSB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiB2YXN0VHJhY2tlciByZXN1bWVkLlwiKTtcclxuXHJcbiAgICAgICAgLy9wcmV2ZW50IHRvIHNldCBTVEFURV9BRF9QTEFZSU5HIHdoZW4gZmlyc3QgcGxheS5cclxuICAgICAgICBpZihhZHNTcGVjLnN0YXJ0ZWQpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QTEFZSU5HKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbiAgICB2YXN0VHJhY2tlci5vbigncGF1c2UnLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gcGF1c2UgdHJhY2tpbmcgVVJMcyBoYXZlIGJlZW4gY2FsbGVkXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogdmFzdFRyYWNrZXIgcGF1c2VkLlwiKTtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QQVVTRUQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFzdFRyYWNrZXIub24oJ2NsaWNrdGhyb3VnaCcsIHVybCA9PiB7XHJcbiAgICAgICAgLy8gT3BlbiB0aGUgcmVzb2x2ZWQgY2xpY2tUaHJvdWdoIHVybFxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBsaXN0ZW5lciA6IGNsaWNrdGhyb3VnaCA6XCIsIHVybCk7XHJcbiAgICAgICAgLy9kb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKHVybCwgJ19ibGFuaycpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIHZhc3RUcmFja2VyLm9uKCdza2lwLWNvdW50ZG93bicsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgaWYoZGF0YSA9PT0gMCl7XHJcbiAgICAgICAgICAgIGlmKGFkc1NwZWMubGFuZyA9PT0gXCJrb1wiKXtcclxuICAgICAgICAgICAgICAgICR0ZXh0Vmlldy5odG1sKFwi6rSR6rOgIOqxtOuEiOubsOq4sDxpIGNsYXNzPSdvcC1jb24gb3AtYXJyb3ctcmlnaHQgYnRuLXJpZ2h0Jz48L2k+XCIpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICR0ZXh0Vmlldy5odG1sKFwiQWQgU2tpcDxpIGNsYXNzPSdvcC1jb24gb3AtYXJyb3ctcmlnaHQgYnRuLXJpZ2h0Jz48L2k+XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICR0ZXh0Vmlldy5hZGRDbGFzcyhcInZpZGVvQWRVaUFjdGlvblwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoYWRzU3BlYy5sYW5nID09PSBcImtvXCIpe1xyXG4gICAgICAgICAgICAgICAgJHRleHRWaWV3Lmh0bWwoKHBhcnNlSW50KGRhdGEpKzEpK1wi7LSIIO2bhOyXkCDsnbQg6rSR6rOg66W8IOqxtOuEiOubuCDsiJgg7J6I7Iq164uI64ukLlwiKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkdGV4dFZpZXcuaHRtbChcIllvdSBjYW4gc2tpcCB0aGlzIGFkIGluIFwiKyhwYXJzZUludChkYXRhKSsxKSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2YXN0VHJhY2tlci5vbigncmV3aW5kJywgKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBsaXN0ZW5lciA6IHJld2luZFwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhc3RUcmFja2VyLm9uKCdzdGFydCcsICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBzdGFydGVkXCIpO1xyXG5cclxuICAgICAgICBhZHNTcGVjLnN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBwcm9jZXNzU3RhcnRPZkFkKCk7XHJcblxyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfQ0hBTkdFRCwge2lzTGluZWFyIDogdHJ1ZX0pO1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xyXG4gICAgfSk7XHJcbiAgICB2YXN0VHJhY2tlci5vbignZmlyc3RRdWFydGlsZScsICgpID0+IHtcclxuICAgICAgICAvLyBmaXJzdFF1YXJ0aWxlIHRyYWNraW5nIFVSTHMgaGF2ZSBiZWVuIGNhbGxlZFxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlZBU1QgOiBsaXN0ZW5lciA6IGZpcnN0UXVhcnRpbGVcIik7XHJcbiAgICB9KTtcclxuICAgIHZhc3RUcmFja2VyLm9uKCdtaWRwb2ludCcsICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBtaWRwb2ludFwiKTtcclxuICAgIH0pO1xyXG4gICAgdmFzdFRyYWNrZXIub24oJ3RoaXJkUXVhcnRpbGUnLCAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVkFTVCA6IGxpc3RlbmVyIDogdGhpcmRRdWFydGlsZVwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhc3RUcmFja2VyLm9uKCdjcmVhdGl2ZVZpZXcnLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gaW1wcmVzc2lvbiB0cmFja2luZyBVUkxzIGhhdmUgYmVlbiBjYWxsZWRcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJWQVNUIDogbGlzdGVuZXIgOiBjcmVhdGl2ZVZpZXdcIik7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICBlbEFkVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgICAgIGVsQWRWaWRlby5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xyXG4gICAgICAgIHRleHRWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBza2lwQnV0dG9uQ2xpY2tlZCwgZmFsc2UpO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XHJcbiAgICAgICAgICAgIGVsQWRWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxMi4uXHJcbiAqL1xyXG5pbXBvcnQge0VSUk9SLCBTVEFURV9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0VmlkZW9FbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudE9yTXNlKSB7XHJcbiAgICBpZihfLmlzRWxlbWVudChlbGVtZW50T3JNc2UpKXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlO1xyXG4gICAgfVxyXG4gICAgaWYoZWxlbWVudE9yTXNlLmdldFZpZGVvRWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQoKTtcclxuICAgIH1lbHNlIGlmKGVsZW1lbnRPck1zZS5tZWRpYSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5tZWRpYTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlcGFyYXRlTGl2ZSA9IGZ1bmN0aW9uKG1zZSkge1xyXG4gICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXHJcblxyXG4gICAgaWYobXNlICYmIG1zZS5pc0R5bmFtaWMpe1xyXG4gICAgICAgIHJldHVybiBtc2UuaXNEeW5hbWljKCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZXJyb3JUcmlnZ2VyID0gZnVuY3Rpb24oZXJyb3IsIHByb3ZpZGVyKXtcclxuICAgIGlmKHByb3ZpZGVyKXtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XHJcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwaWNrQ3VycmVudFNvdXJjZSA9IChzb3VyY2VzLCBjdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpID0+IHtcclxuICAgIGxldCBzb3VyY2VJbmRleCA9IE1hdGgubWF4KDAsIGN1cnJlbnRTb3VyY2UpO1xyXG4gICAgY29uc3QgbGFiZWwgPVwiXCI7XHJcbiAgICBpZiAoc291cmNlcykge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpID09PSBpICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyppZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNvdXJjZUluZGV4O1xyXG59OyIsIi8qQ29weXJpZ2h0IChjKSAyMDEzIE9saXZpZXIgUG9pdHJleSA8cnNAZGFpbHltb3Rpb24uY29tPlxyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWRcclxuIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuKi9cclxuY2xhc3MgQWR7Y29uc3RydWN0b3IoKXt0aGlzLmlkPW51bGwsdGhpcy5zZXF1ZW5jZT1udWxsLHRoaXMuc3lzdGVtPW51bGwsdGhpcy50aXRsZT1udWxsLHRoaXMuZGVzY3JpcHRpb249bnVsbCx0aGlzLmFkdmVydGlzZXI9bnVsbCx0aGlzLnByaWNpbmc9bnVsbCx0aGlzLnN1cnZleT1udWxsLHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXM9W10sdGhpcy5pbXByZXNzaW9uVVJMVGVtcGxhdGVzPVtdLHRoaXMuY3JlYXRpdmVzPVtdLHRoaXMuZXh0ZW5zaW9ucz1bXX19Y2xhc3MgQWRFeHRlbnNpb257Y29uc3RydWN0b3IoKXt0aGlzLmF0dHJpYnV0ZXM9e30sdGhpcy5jaGlsZHJlbj1bXX19Y2xhc3MgQWRFeHRlbnNpb25DaGlsZHtjb25zdHJ1Y3Rvcigpe3RoaXMubmFtZT1udWxsLHRoaXMudmFsdWU9bnVsbCx0aGlzLmF0dHJpYnV0ZXM9e319fWNsYXNzIENvbXBhbmlvbkFke2NvbnN0cnVjdG9yKCl7dGhpcy5pZD1udWxsLHRoaXMud2lkdGg9MCx0aGlzLmhlaWdodD0wLHRoaXMudHlwZT1udWxsLHRoaXMuc3RhdGljUmVzb3VyY2U9bnVsbCx0aGlzLmh0bWxSZXNvdXJjZT1udWxsLHRoaXMuaWZyYW1lUmVzb3VyY2U9bnVsbCx0aGlzLmFsdFRleHQ9bnVsbCx0aGlzLmNvbXBhbmlvbkNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPW51bGwsdGhpcy5jb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPVtdLHRoaXMudHJhY2tpbmdFdmVudHM9e319fWNsYXNzIENyZWF0aXZle2NvbnN0cnVjdG9yKGU9e30pe3RoaXMuaWQ9ZS5pZHx8bnVsbCx0aGlzLmFkSWQ9ZS5hZElkfHxudWxsLHRoaXMuc2VxdWVuY2U9ZS5zZXF1ZW5jZXx8bnVsbCx0aGlzLmFwaUZyYW1ld29yaz1lLmFwaUZyYW1ld29ya3x8bnVsbCx0aGlzLnRyYWNraW5nRXZlbnRzPXt9fX1jbGFzcyBDcmVhdGl2ZUNvbXBhbmlvbiBleHRlbmRzIENyZWF0aXZle2NvbnN0cnVjdG9yKGU9e30pe3N1cGVyKGUpLHRoaXMudHlwZT1cImNvbXBhbmlvblwiLHRoaXMudmFyaWF0aW9ucz1bXX19ZnVuY3Rpb24gdHJhY2soZSx0KXtyZXNvbHZlVVJMVGVtcGxhdGVzKGUsdCkuZm9yRWFjaChlPT57aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmbnVsbCE9PXdpbmRvdyl7KG5ldyBJbWFnZSkuc3JjPWV9fSl9ZnVuY3Rpb24gcmVzb2x2ZVVSTFRlbXBsYXRlcyhlLHQ9e30pe2NvbnN0IHI9W107dC5BU1NFVFVSSSYmKHQuQVNTRVRVUkk9ZW5jb2RlVVJJQ29tcG9uZW50UkZDMzk4Nih0LkFTU0VUVVJJKSksdC5DT05URU5UUExBWUhFQUQmJih0LkNPTlRFTlRQTEFZSEVBRD1lbmNvZGVVUklDb21wb25lbnRSRkMzOTg2KHQuQ09OVEVOVFBMQVlIRUFEKSksdC5FUlJPUkNPREUmJiEvXlswLTldezN9JC8udGVzdCh0LkVSUk9SQ09ERSkmJih0LkVSUk9SQ09ERT05MDApLHQuQ0FDSEVCVVNUSU5HPWxlZnRwYWQoTWF0aC5yb3VuZCgxZTgqTWF0aC5yYW5kb20oKSkudG9TdHJpbmcoKSksdC5USU1FU1RBTVA9ZW5jb2RlVVJJQ29tcG9uZW50UkZDMzk4NigobmV3IERhdGUpLnRvSVNPU3RyaW5nKCkpLHQuUkFORE9NPXQucmFuZG9tPXQuQ0FDSEVCVVNUSU5HO2ZvcihsZXQgaSBpbiBlKXtsZXQgcz1lW2ldO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBzKXtmb3IobGV0IGUgaW4gdCl7Y29uc3Qgcj10W2VdLGk9YFske2V9XWAsbj1gJSUke2V9JSVgO3M9KHM9cy5yZXBsYWNlKGkscikpLnJlcGxhY2UobixyKX1yLnB1c2gocyl9fXJldHVybiByfWZ1bmN0aW9uIGVuY29kZVVSSUNvbXBvbmVudFJGQzM5ODYoZSl7cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChlKS5yZXBsYWNlKC9bIScoKSpdL2csZT0+YCUke2UuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNil9YCl9ZnVuY3Rpb24gbGVmdHBhZChlKXtyZXR1cm4gZS5sZW5ndGg8OD9yYW5nZSgwLDgtZS5sZW5ndGgsITEpLm1hcChlPT5cIjBcIikuam9pbihcIlwiKStlOmV9ZnVuY3Rpb24gcmFuZ2UoZSx0LHIpe2xldCBpPVtdLHM9ZTx0LG49cj9zP3QrMTp0LTE6dDtmb3IobGV0IHQ9ZTtzP3Q8bjp0Pm47cz90Kys6dC0tKWkucHVzaCh0KTtyZXR1cm4gaX1mdW5jdGlvbiBpc051bWVyaWMoZSl7cmV0dXJuIWlzTmFOKHBhcnNlRmxvYXQoZSkpJiZpc0Zpbml0ZShlKX1mdW5jdGlvbiBmbGF0dGVuKGUpe3JldHVybiBlLnJlZHVjZSgoZSx0KT0+ZS5jb25jYXQoQXJyYXkuaXNBcnJheSh0KT9mbGF0dGVuKHQpOnQpLFtdKX1jb25zdCB1dGlsPXt0cmFjazp0cmFjayxyZXNvbHZlVVJMVGVtcGxhdGVzOnJlc29sdmVVUkxUZW1wbGF0ZXMsZW5jb2RlVVJJQ29tcG9uZW50UkZDMzk4NjplbmNvZGVVUklDb21wb25lbnRSRkMzOTg2LGxlZnRwYWQ6bGVmdHBhZCxyYW5nZTpyYW5nZSxpc051bWVyaWM6aXNOdW1lcmljLGZsYXR0ZW46ZmxhdHRlbn07ZnVuY3Rpb24gY2hpbGRCeU5hbWUoZSx0KXtjb25zdCByPWUuY2hpbGROb2Rlcztmb3IobGV0IGUgaW4gcil7Y29uc3QgaT1yW2VdO2lmKGkubm9kZU5hbWU9PT10KXJldHVybiBpfX1mdW5jdGlvbiBjaGlsZHJlbkJ5TmFtZShlLHQpe2NvbnN0IHI9W10saT1lLmNoaWxkTm9kZXM7Zm9yKGxldCBlIGluIGkpe2NvbnN0IHM9aVtlXTtzLm5vZGVOYW1lPT09dCYmci5wdXNoKHMpfXJldHVybiByfWZ1bmN0aW9uIHJlc29sdmVWYXN0QWRUYWdVUkkoZSx0KXtpZighdClyZXR1cm4gZTtpZigwPT09ZS5pbmRleE9mKFwiLy9cIikpe2NvbnN0e3Byb3RvY29sOnR9PWxvY2F0aW9uO3JldHVybmAke3R9JHtlfWB9aWYoLTE9PT1lLmluZGV4T2YoXCI6Ly9cIikpe3JldHVybmAke3Quc2xpY2UoMCx0Lmxhc3RJbmRleE9mKFwiL1wiKSl9LyR7ZX1gfXJldHVybiBlfWZ1bmN0aW9uIHBhcnNlQm9vbGVhbihlKXtyZXR1cm4tMSE9PVtcInRydWVcIixcIlRSVUVcIixcIjFcIl0uaW5kZXhPZihlKX1mdW5jdGlvbiBwYXJzZU5vZGVUZXh0KGUpe3JldHVybiBlJiYoZS50ZXh0Q29udGVudHx8ZS50ZXh0fHxcIlwiKS50cmltKCl9ZnVuY3Rpb24gY29weU5vZGVBdHRyaWJ1dGUoZSx0LHIpe2NvbnN0IGk9dC5nZXRBdHRyaWJ1dGUoZSk7aSYmci5zZXRBdHRyaWJ1dGUoZSxpKX1mdW5jdGlvbiBwYXJzZUR1cmF0aW9uKGUpe2lmKG51bGw9PWUpcmV0dXJuLTE7aWYodXRpbC5pc051bWVyaWMoZSkpcmV0dXJuIHBhcnNlSW50KGUpO2NvbnN0IHQ9ZS5zcGxpdChcIjpcIik7aWYoMyE9PXQubGVuZ3RoKXJldHVybi0xO2NvbnN0IHI9dFsyXS5zcGxpdChcIi5cIik7bGV0IGk9cGFyc2VJbnQoclswXSk7Mj09PXIubGVuZ3RoJiYoaSs9cGFyc2VGbG9hdChgMC4ke3JbMV19YCkpO2NvbnN0IHM9cGFyc2VJbnQoNjAqdFsxXSksbj1wYXJzZUludCg2MCp0WzBdKjYwKTtyZXR1cm4gaXNOYU4obil8fGlzTmFOKHMpfHxpc05hTihpKXx8cz4zNjAwfHxpPjYwPy0xOm4rcytpfWZ1bmN0aW9uIHNwbGl0VkFTVChlKXtjb25zdCB0PVtdO2xldCByPW51bGw7cmV0dXJuIGUuZm9yRWFjaCgoaSxzKT0+e2lmKGkuc2VxdWVuY2UmJihpLnNlcXVlbmNlPXBhcnNlSW50KGkuc2VxdWVuY2UsMTApKSxpLnNlcXVlbmNlPjEpe2NvbnN0IHQ9ZVtzLTFdO2lmKHQmJnQuc2VxdWVuY2U9PT1pLnNlcXVlbmNlLTEpcmV0dXJuIHZvaWQociYmci5wdXNoKGkpKTtkZWxldGUgaS5zZXF1ZW5jZX1yPVtpXSx0LnB1c2gocil9KSx0fWZ1bmN0aW9uIG1lcmdlV3JhcHBlckFkRGF0YShlLHQpe2UuZXJyb3JVUkxUZW1wbGF0ZXM9dC5lcnJvclVSTFRlbXBsYXRlcy5jb25jYXQoZS5lcnJvclVSTFRlbXBsYXRlcyksZS5pbXByZXNzaW9uVVJMVGVtcGxhdGVzPXQuaW1wcmVzc2lvblVSTFRlbXBsYXRlcy5jb25jYXQoZS5pbXByZXNzaW9uVVJMVGVtcGxhdGVzKSxlLmV4dGVuc2lvbnM9dC5leHRlbnNpb25zLmNvbmNhdChlLmV4dGVuc2lvbnMpLGUuY3JlYXRpdmVzLmZvckVhY2goZT0+e2lmKHQudHJhY2tpbmdFdmVudHMmJnQudHJhY2tpbmdFdmVudHNbZS50eXBlXSlmb3IobGV0IHIgaW4gdC50cmFja2luZ0V2ZW50c1tlLnR5cGVdKXtjb25zdCBpPXQudHJhY2tpbmdFdmVudHNbZS50eXBlXVtyXTtlLnRyYWNraW5nRXZlbnRzW3JdfHwoZS50cmFja2luZ0V2ZW50c1tyXT1bXSksZS50cmFja2luZ0V2ZW50c1tyXT1lLnRyYWNraW5nRXZlbnRzW3JdLmNvbmNhdChpKX19KSx0LnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyYmdC52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMubGVuZ3RoJiZlLmNyZWF0aXZlcy5mb3JFYWNoKGU9PntcImxpbmVhclwiPT09ZS50eXBlJiYoZS52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9ZS52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMuY29uY2F0KHQudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzKSl9KSx0LnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMmJnQudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcy5sZW5ndGgmJmUuY3JlYXRpdmVzLmZvckVhY2goZT0+e1wibGluZWFyXCI9PT1lLnR5cGUmJihlLnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXM9ZS52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzLmNvbmNhdCh0LnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMpKX0pLHQudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSYmZS5jcmVhdGl2ZXMuZm9yRWFjaChlPT57XCJsaW5lYXJcIj09PWUudHlwZSYmbnVsbD09ZS52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlJiYoZS52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPXQudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSl9KX1jb25zdCBwYXJzZXJVdGlscz17Y2hpbGRCeU5hbWU6Y2hpbGRCeU5hbWUsY2hpbGRyZW5CeU5hbWU6Y2hpbGRyZW5CeU5hbWUscmVzb2x2ZVZhc3RBZFRhZ1VSSTpyZXNvbHZlVmFzdEFkVGFnVVJJLHBhcnNlQm9vbGVhbjpwYXJzZUJvb2xlYW4scGFyc2VOb2RlVGV4dDpwYXJzZU5vZGVUZXh0LGNvcHlOb2RlQXR0cmlidXRlOmNvcHlOb2RlQXR0cmlidXRlLHBhcnNlRHVyYXRpb246cGFyc2VEdXJhdGlvbixzcGxpdFZBU1Q6c3BsaXRWQVNULG1lcmdlV3JhcHBlckFkRGF0YTptZXJnZVdyYXBwZXJBZERhdGF9O2Z1bmN0aW9uIHBhcnNlQ3JlYXRpdmVDb21wYW5pb24oZSx0KXtjb25zdCByPW5ldyBDcmVhdGl2ZUNvbXBhbmlvbih0KTtyZXR1cm4gcGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIkNvbXBhbmlvblwiKS5mb3JFYWNoKGU9Pntjb25zdCB0PW5ldyBDb21wYW5pb25BZDt0LmlkPWUuZ2V0QXR0cmlidXRlKFwiaWRcIil8fG51bGwsdC53aWR0aD1lLmdldEF0dHJpYnV0ZShcIndpZHRoXCIpLHQuaGVpZ2h0PWUuZ2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIpLHQuY29tcGFuaW9uQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz1bXSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiSFRNTFJlc291cmNlXCIpLmZvckVhY2goZT0+e3QudHlwZT1lLmdldEF0dHJpYnV0ZShcImNyZWF0aXZlVHlwZVwiKXx8XCJ0ZXh0L2h0bWxcIix0Lmh0bWxSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIklGcmFtZVJlc291cmNlXCIpLmZvckVhY2goZT0+e3QudHlwZT1lLmdldEF0dHJpYnV0ZShcImNyZWF0aXZlVHlwZVwiKXx8MCx0LmlmcmFtZVJlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiU3RhdGljUmVzb3VyY2VcIikuZm9yRWFjaChyPT57dC50eXBlPXIuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHwwLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJBbHRUZXh0XCIpLmZvckVhY2goZT0+e3QuYWx0VGV4dD1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSksdC5zdGF0aWNSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHIpfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlRyYWNraW5nRXZlbnRzXCIpLmZvckVhY2goZT0+e3BhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJUcmFja2luZ1wiKS5mb3JFYWNoKGU9Pntjb25zdCByPWUuZ2V0QXR0cmlidXRlKFwiZXZlbnRcIiksaT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpO3ImJmkmJihudWxsPT10LnRyYWNraW5nRXZlbnRzW3JdJiYodC50cmFja2luZ0V2ZW50c1tyXT1bXSksdC50cmFja2luZ0V2ZW50c1tyXS5wdXNoKGkpKX0pfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIkNvbXBhbmlvbkNsaWNrVHJhY2tpbmdcIikuZm9yRWFjaChlPT57dC5jb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLnB1c2gocGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKSl9KSx0LmNvbXBhbmlvbkNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIkNvbXBhbmlvbkNsaWNrVGhyb3VnaFwiKSksdC5jb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiQ29tcGFuaW9uQ2xpY2tUcmFja2luZ1wiKSksci52YXJpYXRpb25zLnB1c2godCl9KSxyfWNsYXNzIENyZWF0aXZlTGluZWFyIGV4dGVuZHMgQ3JlYXRpdmV7Y29uc3RydWN0b3IoZT17fSl7c3VwZXIoZSksdGhpcy50eXBlPVwibGluZWFyXCIsdGhpcy5kdXJhdGlvbj0wLHRoaXMuc2tpcERlbGF5PW51bGwsdGhpcy5tZWRpYUZpbGVzPVtdLHRoaXMudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT1udWxsLHRoaXMudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPVtdLHRoaXMudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcz1bXSx0aGlzLmFkUGFyYW1ldGVycz1udWxsLHRoaXMuaWNvbnM9W119fWNsYXNzIEljb257Y29uc3RydWN0b3IoKXt0aGlzLnByb2dyYW09bnVsbCx0aGlzLmhlaWdodD0wLHRoaXMud2lkdGg9MCx0aGlzLnhQb3NpdGlvbj0wLHRoaXMueVBvc2l0aW9uPTAsdGhpcy5hcGlGcmFtZXdvcms9bnVsbCx0aGlzLm9mZnNldD1udWxsLHRoaXMuZHVyYXRpb249MCx0aGlzLnR5cGU9bnVsbCx0aGlzLnN0YXRpY1Jlc291cmNlPW51bGwsdGhpcy5odG1sUmVzb3VyY2U9bnVsbCx0aGlzLmlmcmFtZVJlc291cmNlPW51bGwsdGhpcy5pY29uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9bnVsbCx0aGlzLmljb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPVtdLHRoaXMuaWNvblZpZXdUcmFja2luZ1VSTFRlbXBsYXRlPW51bGx9fWNsYXNzIE1lZGlhRmlsZXtjb25zdHJ1Y3Rvcigpe3RoaXMuaWQ9bnVsbCx0aGlzLmZpbGVVUkw9bnVsbCx0aGlzLmRlbGl2ZXJ5VHlwZT1cInByb2dyZXNzaXZlXCIsdGhpcy5taW1lVHlwZT1udWxsLHRoaXMuY29kZWM9bnVsbCx0aGlzLmJpdHJhdGU9MCx0aGlzLm1pbkJpdHJhdGU9MCx0aGlzLm1heEJpdHJhdGU9MCx0aGlzLndpZHRoPTAsdGhpcy5oZWlnaHQ9MCx0aGlzLmFwaUZyYW1ld29yaz1udWxsLHRoaXMuc2NhbGFibGU9bnVsbCx0aGlzLm1haW50YWluQXNwZWN0UmF0aW89bnVsbH19ZnVuY3Rpb24gcGFyc2VDcmVhdGl2ZUxpbmVhcihlLHQpe2xldCByO2NvbnN0IGk9bmV3IENyZWF0aXZlTGluZWFyKHQpO2kuZHVyYXRpb249cGFyc2VyVXRpbHMucGFyc2VEdXJhdGlvbihwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJEdXJhdGlvblwiKSkpO2NvbnN0IHM9ZS5nZXRBdHRyaWJ1dGUoXCJza2lwb2Zmc2V0XCIpO2lmKG51bGw9PXMpaS5za2lwRGVsYXk9bnVsbDtlbHNlIGlmKFwiJVwiPT09cy5jaGFyQXQocy5sZW5ndGgtMSkmJi0xIT09aS5kdXJhdGlvbil7Y29uc3QgZT1wYXJzZUludChzLDEwKTtpLnNraXBEZWxheT1pLmR1cmF0aW9uKihlLzEwMCl9ZWxzZSBpLnNraXBEZWxheT1wYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKHMpO2NvbnN0IG49cGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIlZpZGVvQ2xpY2tzXCIpO24mJihpLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShuLFwiQ2xpY2tUaHJvdWdoXCIpKSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShuLFwiQ2xpY2tUcmFja2luZ1wiKS5mb3JFYWNoKGU9PntpLnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5wdXNoKHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSkpfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUobixcIkN1c3RvbUNsaWNrXCIpLmZvckVhY2goZT0+e2kudmlkZW9DdXN0b21DbGlja1VSTFRlbXBsYXRlcy5wdXNoKHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSkpfSkpO2NvbnN0IGE9cGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIkFkUGFyYW1ldGVyc1wiKTthJiYoaS5hZFBhcmFtZXRlcnM9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChhKSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIlRyYWNraW5nRXZlbnRzXCIpLmZvckVhY2goZT0+e3BhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJUcmFja2luZ1wiKS5mb3JFYWNoKGU9PntsZXQgdD1lLmdldEF0dHJpYnV0ZShcImV2ZW50XCIpO2NvbnN0IHM9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKTtpZih0JiZzKXtpZihcInByb2dyZXNzXCI9PT10KXtpZighKHI9ZS5nZXRBdHRyaWJ1dGUoXCJvZmZzZXRcIikpKXJldHVybjt0PVwiJVwiPT09ci5jaGFyQXQoci5sZW5ndGgtMSk/YHByb2dyZXNzLSR7cn1gOmBwcm9ncmVzcy0ke01hdGgucm91bmQocGFyc2VyVXRpbHMucGFyc2VEdXJhdGlvbihyKSl9YH1udWxsPT1pLnRyYWNraW5nRXZlbnRzW3RdJiYoaS50cmFja2luZ0V2ZW50c1t0XT1bXSksaS50cmFja2luZ0V2ZW50c1t0XS5wdXNoKHMpfX0pfSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIk1lZGlhRmlsZXNcIikuZm9yRWFjaChlPT57cGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIk1lZGlhRmlsZVwiKS5mb3JFYWNoKGU9Pntjb25zdCB0PW5ldyBNZWRpYUZpbGU7dC5pZD1lLmdldEF0dHJpYnV0ZShcImlkXCIpLHQuZmlsZVVSTD1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpLHQuZGVsaXZlcnlUeXBlPWUuZ2V0QXR0cmlidXRlKFwiZGVsaXZlcnlcIiksdC5jb2RlYz1lLmdldEF0dHJpYnV0ZShcImNvZGVjXCIpLHQubWltZVR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpLHQuYXBpRnJhbWV3b3JrPWUuZ2V0QXR0cmlidXRlKFwiYXBpRnJhbWV3b3JrXCIpLHQuYml0cmF0ZT1wYXJzZUludChlLmdldEF0dHJpYnV0ZShcImJpdHJhdGVcIil8fDApLHQubWluQml0cmF0ZT1wYXJzZUludChlLmdldEF0dHJpYnV0ZShcIm1pbkJpdHJhdGVcIil8fDApLHQubWF4Qml0cmF0ZT1wYXJzZUludChlLmdldEF0dHJpYnV0ZShcIm1heEJpdHJhdGVcIil8fDApLHQud2lkdGg9cGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKXx8MCksdC5oZWlnaHQ9cGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIil8fDApO2xldCByPWUuZ2V0QXR0cmlidXRlKFwic2NhbGFibGVcIik7ciYmXCJzdHJpbmdcIj09dHlwZW9mIHImJihcInRydWVcIj09PShyPXIudG9Mb3dlckNhc2UoKSk/dC5zY2FsYWJsZT0hMDpcImZhbHNlXCI9PT1yJiYodC5zY2FsYWJsZT0hMSkpO2xldCBzPWUuZ2V0QXR0cmlidXRlKFwibWFpbnRhaW5Bc3BlY3RSYXRpb1wiKTtzJiZcInN0cmluZ1wiPT10eXBlb2YgcyYmKFwidHJ1ZVwiPT09KHM9cy50b0xvd2VyQ2FzZSgpKT90Lm1haW50YWluQXNwZWN0UmF0aW89ITA6XCJmYWxzZVwiPT09cyYmKHQubWFpbnRhaW5Bc3BlY3RSYXRpbz0hMSkpLGkubWVkaWFGaWxlcy5wdXNoKHQpfSl9KTtjb25zdCBvPXBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJJY29uc1wiKTtyZXR1cm4gbyYmcGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUobyxcIkljb25cIikuZm9yRWFjaChlPT57Y29uc3QgdD1uZXcgSWNvbjt0LnByb2dyYW09ZS5nZXRBdHRyaWJ1dGUoXCJwcm9ncmFtXCIpLHQuaGVpZ2h0PXBhcnNlSW50KGUuZ2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIpfHwwKSx0LndpZHRoPXBhcnNlSW50KGUuZ2V0QXR0cmlidXRlKFwid2lkdGhcIil8fDApLHQueFBvc2l0aW9uPXBhcnNlWFBvc2l0aW9uKGUuZ2V0QXR0cmlidXRlKFwieFBvc2l0aW9uXCIpKSx0LnlQb3NpdGlvbj1wYXJzZVlQb3NpdGlvbihlLmdldEF0dHJpYnV0ZShcInlQb3NpdGlvblwiKSksdC5hcGlGcmFtZXdvcms9ZS5nZXRBdHRyaWJ1dGUoXCJhcGlGcmFtZXdvcmtcIiksdC5vZmZzZXQ9cGFyc2VyVXRpbHMucGFyc2VEdXJhdGlvbihlLmdldEF0dHJpYnV0ZShcIm9mZnNldFwiKSksdC5kdXJhdGlvbj1wYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKGUuZ2V0QXR0cmlidXRlKFwiZHVyYXRpb25cIikpLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJIVE1MUmVzb3VyY2VcIikuZm9yRWFjaChlPT57dC50eXBlPWUuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHxcInRleHQvaHRtbFwiLHQuaHRtbFJlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiSUZyYW1lUmVzb3VyY2VcIikuZm9yRWFjaChlPT57dC50eXBlPWUuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHwwLHQuaWZyYW1lUmVzb3VyY2U9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJTdGF0aWNSZXNvdXJjZVwiKS5mb3JFYWNoKGU9Pnt0LnR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fDAsdC5zdGF0aWNSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSk7Y29uc3Qgcj1wYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiSWNvbkNsaWNrc1wiKTtyJiYodC5pY29uQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChwYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShyLFwiSWNvbkNsaWNrVGhyb3VnaFwiKSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUocixcIkljb25DbGlja1RyYWNraW5nXCIpLmZvckVhY2goZT0+e3QuaWNvbkNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMucHVzaChwYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpKX0pKSx0Lmljb25WaWV3VHJhY2tpbmdVUkxUZW1wbGF0ZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KHBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJJY29uVmlld1RyYWNraW5nXCIpKSxpLmljb25zLnB1c2godCl9KSxpfWZ1bmN0aW9uIHBhcnNlWFBvc2l0aW9uKGUpe3JldHVybi0xIT09W1wibGVmdFwiLFwicmlnaHRcIl0uaW5kZXhPZihlKT9lOnBhcnNlSW50KGV8fDApfWZ1bmN0aW9uIHBhcnNlWVBvc2l0aW9uKGUpe3JldHVybi0xIT09W1widG9wXCIsXCJib3R0b21cIl0uaW5kZXhPZihlKT9lOnBhcnNlSW50KGV8fDApfWNsYXNzIENyZWF0aXZlTm9uTGluZWFyIGV4dGVuZHMgQ3JlYXRpdmV7Y29uc3RydWN0b3IoZT17fSl7c3VwZXIoZSksdGhpcy50eXBlPVwibm9ubGluZWFyXCIsdGhpcy52YXJpYXRpb25zPVtdfX1jbGFzcyBOb25MaW5lYXJBZHtjb25zdHJ1Y3Rvcigpe3RoaXMuaWQ9bnVsbCx0aGlzLndpZHRoPTAsdGhpcy5oZWlnaHQ9MCx0aGlzLmV4cGFuZGVkV2lkdGg9MCx0aGlzLmV4cGFuZGVkSGVpZ2h0PTAsdGhpcy5zY2FsYWJsZT0hMCx0aGlzLm1haW50YWluQXNwZWN0UmF0aW89ITAsdGhpcy5taW5TdWdnZXN0ZWREdXJhdGlvbj0wLHRoaXMuYXBpRnJhbWV3b3JrPVwic3RhdGljXCIsdGhpcy50eXBlPW51bGwsdGhpcy5zdGF0aWNSZXNvdXJjZT1udWxsLHRoaXMuaHRtbFJlc291cmNlPW51bGwsdGhpcy5pZnJhbWVSZXNvdXJjZT1udWxsLHRoaXMubm9ubGluZWFyQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9bnVsbCx0aGlzLm5vbmxpbmVhckNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9W10sdGhpcy5hZFBhcmFtZXRlcnM9bnVsbH19ZnVuY3Rpb24gcGFyc2VDcmVhdGl2ZU5vbkxpbmVhcihlLHQpe2NvbnN0IHI9bmV3IENyZWF0aXZlTm9uTGluZWFyKHQpO3JldHVybiBwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiVHJhY2tpbmdFdmVudHNcIikuZm9yRWFjaChlPT57bGV0IHQsaTtwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiVHJhY2tpbmdcIikuZm9yRWFjaChlPT57dD1lLmdldEF0dHJpYnV0ZShcImV2ZW50XCIpLGk9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKSx0JiZpJiYobnVsbD09ci50cmFja2luZ0V2ZW50c1t0XSYmKHIudHJhY2tpbmdFdmVudHNbdF09W10pLHIudHJhY2tpbmdFdmVudHNbdF0ucHVzaChpKSl9KX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJOb25MaW5lYXJcIikuZm9yRWFjaChlPT57Y29uc3QgdD1uZXcgTm9uTGluZWFyQWQ7dC5pZD1lLmdldEF0dHJpYnV0ZShcImlkXCIpfHxudWxsLHQud2lkdGg9ZS5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKSx0LmhlaWdodD1lLmdldEF0dHJpYnV0ZShcImhlaWdodFwiKSx0LmV4cGFuZGVkV2lkdGg9ZS5nZXRBdHRyaWJ1dGUoXCJleHBhbmRlZFdpZHRoXCIpLHQuZXhwYW5kZWRIZWlnaHQ9ZS5nZXRBdHRyaWJ1dGUoXCJleHBhbmRlZEhlaWdodFwiKSx0LnNjYWxhYmxlPXBhcnNlclV0aWxzLnBhcnNlQm9vbGVhbihlLmdldEF0dHJpYnV0ZShcInNjYWxhYmxlXCIpKSx0Lm1haW50YWluQXNwZWN0UmF0aW89cGFyc2VyVXRpbHMucGFyc2VCb29sZWFuKGUuZ2V0QXR0cmlidXRlKFwibWFpbnRhaW5Bc3BlY3RSYXRpb1wiKSksdC5taW5TdWdnZXN0ZWREdXJhdGlvbj1wYXJzZXJVdGlscy5wYXJzZUR1cmF0aW9uKGUuZ2V0QXR0cmlidXRlKFwibWluU3VnZ2VzdGVkRHVyYXRpb25cIikpLHQuYXBpRnJhbWV3b3JrPWUuZ2V0QXR0cmlidXRlKFwiYXBpRnJhbWV3b3JrXCIpLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJIVE1MUmVzb3VyY2VcIikuZm9yRWFjaChlPT57dC50eXBlPWUuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHxcInRleHQvaHRtbFwiLHQuaHRtbFJlc291cmNlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoZSl9KSxwYXJzZXJVdGlscy5jaGlsZHJlbkJ5TmFtZShlLFwiSUZyYW1lUmVzb3VyY2VcIikuZm9yRWFjaChlPT57dC50eXBlPWUuZ2V0QXR0cmlidXRlKFwiY3JlYXRpdmVUeXBlXCIpfHwwLHQuaWZyYW1lUmVzb3VyY2U9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKX0pLHBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGUsXCJTdGF0aWNSZXNvdXJjZVwiKS5mb3JFYWNoKGU9Pnt0LnR5cGU9ZS5nZXRBdHRyaWJ1dGUoXCJjcmVhdGl2ZVR5cGVcIil8fDAsdC5zdGF0aWNSZXNvdXJjZT1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGUpfSk7Y29uc3QgaT1wYXJzZXJVdGlscy5jaGlsZEJ5TmFtZShlLFwiQWRQYXJhbWV0ZXJzXCIpO2kmJih0LmFkUGFyYW1ldGVycz1wYXJzZXJVdGlscy5wYXJzZU5vZGVUZXh0KGkpKSx0Lm5vbmxpbmVhckNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIk5vbkxpbmVhckNsaWNrVGhyb3VnaFwiKSkscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoZSxcIk5vbkxpbmVhckNsaWNrVHJhY2tpbmdcIikuZm9yRWFjaChlPT57dC5ub25saW5lYXJDbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLnB1c2gocGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChlKSl9KSxyLnZhcmlhdGlvbnMucHVzaCh0KX0pLHJ9ZnVuY3Rpb24gcGFyc2VBZChlKXtjb25zdCB0PWUuY2hpbGROb2Rlcztmb3IobGV0IHIgaW4gdCl7Y29uc3QgaT10W3JdO2lmKC0xIT09W1wiV3JhcHBlclwiLFwiSW5MaW5lXCJdLmluZGV4T2YoaS5ub2RlTmFtZSkpe2lmKHBhcnNlclV0aWxzLmNvcHlOb2RlQXR0cmlidXRlKFwiaWRcIixlLGkpLHBhcnNlclV0aWxzLmNvcHlOb2RlQXR0cmlidXRlKFwic2VxdWVuY2VcIixlLGkpLFwiV3JhcHBlclwiPT09aS5ub2RlTmFtZSlyZXR1cm4gcGFyc2VXcmFwcGVyKGkpO2lmKFwiSW5MaW5lXCI9PT1pLm5vZGVOYW1lKXJldHVybiBwYXJzZUluTGluZShpKX19fWZ1bmN0aW9uIHBhcnNlSW5MaW5lKGUpe2NvbnN0IHQ9ZS5jaGlsZE5vZGVzLHI9bmV3IEFkO3IuaWQ9ZS5nZXRBdHRyaWJ1dGUoXCJpZFwiKXx8bnVsbCxyLnNlcXVlbmNlPWUuZ2V0QXR0cmlidXRlKFwic2VxdWVuY2VcIil8fG51bGw7Zm9yKGxldCBlIGluIHQpe2NvbnN0IGk9dFtlXTtzd2l0Y2goaS5ub2RlTmFtZSl7Y2FzZVwiRXJyb3JcIjpyLmVycm9yVVJMVGVtcGxhdGVzLnB1c2gocGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKSk7YnJlYWs7Y2FzZVwiSW1wcmVzc2lvblwiOnIuaW1wcmVzc2lvblVSTFRlbXBsYXRlcy5wdXNoKHBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaSkpO2JyZWFrO2Nhc2VcIkNyZWF0aXZlc1wiOnBhcnNlclV0aWxzLmNoaWxkcmVuQnlOYW1lKGksXCJDcmVhdGl2ZVwiKS5mb3JFYWNoKGU9Pntjb25zdCB0PXtpZDplLmdldEF0dHJpYnV0ZShcImlkXCIpfHxudWxsLGFkSWQ6cGFyc2VDcmVhdGl2ZUFkSWRBdHRyaWJ1dGUoZSksc2VxdWVuY2U6ZS5nZXRBdHRyaWJ1dGUoXCJzZXF1ZW5jZVwiKXx8bnVsbCxhcGlGcmFtZXdvcms6ZS5nZXRBdHRyaWJ1dGUoXCJhcGlGcmFtZXdvcmtcIil8fG51bGx9O2ZvcihsZXQgaSBpbiBlLmNoaWxkTm9kZXMpe2NvbnN0IHM9ZS5jaGlsZE5vZGVzW2ldO3N3aXRjaChzLm5vZGVOYW1lKXtjYXNlXCJMaW5lYXJcIjpsZXQgZT1wYXJzZUNyZWF0aXZlTGluZWFyKHMsdCk7ZSYmci5jcmVhdGl2ZXMucHVzaChlKTticmVhaztjYXNlXCJOb25MaW5lYXJBZHNcIjpsZXQgaT1wYXJzZUNyZWF0aXZlTm9uTGluZWFyKHMsdCk7aSYmci5jcmVhdGl2ZXMucHVzaChpKTticmVhaztjYXNlXCJDb21wYW5pb25BZHNcIjpsZXQgbj1wYXJzZUNyZWF0aXZlQ29tcGFuaW9uKHMsdCk7biYmci5jcmVhdGl2ZXMucHVzaChuKX19fSk7YnJlYWs7Y2FzZVwiRXh0ZW5zaW9uc1wiOnBhcnNlRXh0ZW5zaW9ucyhyLmV4dGVuc2lvbnMscGFyc2VyVXRpbHMuY2hpbGRyZW5CeU5hbWUoaSxcIkV4dGVuc2lvblwiKSk7YnJlYWs7Y2FzZVwiQWRTeXN0ZW1cIjpyLnN5c3RlbT17dmFsdWU6cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKSx2ZXJzaW9uOmkuZ2V0QXR0cmlidXRlKFwidmVyc2lvblwiKXx8bnVsbH07YnJlYWs7Y2FzZVwiQWRUaXRsZVwiOnIudGl0bGU9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKTticmVhaztjYXNlXCJEZXNjcmlwdGlvblwiOnIuZGVzY3JpcHRpb249cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKTticmVhaztjYXNlXCJBZHZlcnRpc2VyXCI6ci5hZHZlcnRpc2VyPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaSk7YnJlYWs7Y2FzZVwiUHJpY2luZ1wiOnIucHJpY2luZz17dmFsdWU6cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dChpKSxtb2RlbDppLmdldEF0dHJpYnV0ZShcIm1vZGVsXCIpfHxudWxsLGN1cnJlbmN5OmkuZ2V0QXR0cmlidXRlKFwiY3VycmVuY3lcIil8fG51bGx9O2JyZWFrO2Nhc2VcIlN1cnZleVwiOnIuc3VydmV5PXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQoaSl9fXJldHVybiByfWZ1bmN0aW9uIHBhcnNlV3JhcHBlcihlKXtjb25zdCB0PXBhcnNlSW5MaW5lKGUpO2xldCByPXBhcnNlclV0aWxzLmNoaWxkQnlOYW1lKGUsXCJWQVNUQWRUYWdVUklcIik7aWYocj90Lm5leHRXcmFwcGVyVVJMPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocik6KHI9cGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUoZSxcIlZBU1RBZFRhZ1VSTFwiKSkmJih0Lm5leHRXcmFwcGVyVVJMPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQocGFyc2VyVXRpbHMuY2hpbGRCeU5hbWUocixcIlVSTFwiKSkpLHQuY3JlYXRpdmVzLmZvckVhY2goZT0+e2lmKC0xIT09W1wibGluZWFyXCIsXCJub25saW5lYXJcIl0uaW5kZXhPZihlLnR5cGUpKXtpZihlLnRyYWNraW5nRXZlbnRzKXt0LnRyYWNraW5nRXZlbnRzfHwodC50cmFja2luZ0V2ZW50cz17fSksdC50cmFja2luZ0V2ZW50c1tlLnR5cGVdfHwodC50cmFja2luZ0V2ZW50c1tlLnR5cGVdPXt9KTtmb3IobGV0IHIgaW4gZS50cmFja2luZ0V2ZW50cyl7Y29uc3QgaT1lLnRyYWNraW5nRXZlbnRzW3JdO3QudHJhY2tpbmdFdmVudHNbZS50eXBlXVtyXXx8KHQudHJhY2tpbmdFdmVudHNbZS50eXBlXVtyXT1bXSksaS5mb3JFYWNoKGk9Pnt0LnRyYWNraW5nRXZlbnRzW2UudHlwZV1bcl0ucHVzaChpKX0pfX1lLnZpZGVvQ2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyYmKHQudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzfHwodC52aWRlb0NsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXM9W10pLGUudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLmZvckVhY2goZT0+e3QudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzLnB1c2goZSl9KSksZS52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlJiYodC52aWRlb0NsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPWUudmlkZW9DbGlja1Rocm91Z2hVUkxUZW1wbGF0ZSksZS52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzJiYodC52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzfHwodC52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzPVtdKSxlLnZpZGVvQ3VzdG9tQ2xpY2tVUkxUZW1wbGF0ZXMuZm9yRWFjaChlPT57dC52aWRlb0N1c3RvbUNsaWNrVVJMVGVtcGxhdGVzLnB1c2goZSl9KSl9fSksdC5uZXh0V3JhcHBlclVSTClyZXR1cm4gdH1mdW5jdGlvbiBwYXJzZUV4dGVuc2lvbnMoZSx0KXt0LmZvckVhY2godD0+e2NvbnN0IHI9bmV3IEFkRXh0ZW5zaW9uLGk9dC5hdHRyaWJ1dGVzLHM9dC5jaGlsZE5vZGVzO2lmKHQuYXR0cmlidXRlcylmb3IobGV0IGUgaW4gaSl7Y29uc3QgdD1pW2VdO3Qubm9kZU5hbWUmJnQubm9kZVZhbHVlJiYoci5hdHRyaWJ1dGVzW3Qubm9kZU5hbWVdPXQubm9kZVZhbHVlKX1mb3IobGV0IGUgaW4gcyl7Y29uc3QgdD1zW2VdLGk9cGFyc2VyVXRpbHMucGFyc2VOb2RlVGV4dCh0KTtpZihcIiNjb21tZW50XCIhPT10Lm5vZGVOYW1lJiZcIlwiIT09aSl7Y29uc3QgZT1uZXcgQWRFeHRlbnNpb25DaGlsZDtpZihlLm5hbWU9dC5ub2RlTmFtZSxlLnZhbHVlPWksdC5hdHRyaWJ1dGVzKXtjb25zdCByPXQuYXR0cmlidXRlcztmb3IobGV0IHQgaW4gcil7Y29uc3QgaT1yW3RdO2UuYXR0cmlidXRlc1tpLm5vZGVOYW1lXT1pLm5vZGVWYWx1ZX19ci5jaGlsZHJlbi5wdXNoKGUpfX1lLnB1c2gocil9KX1mdW5jdGlvbiBwYXJzZUNyZWF0aXZlQWRJZEF0dHJpYnV0ZShlKXtyZXR1cm4gZS5nZXRBdHRyaWJ1dGUoXCJBZElEXCIpfHxlLmdldEF0dHJpYnV0ZShcImFkSURcIil8fGUuZ2V0QXR0cmlidXRlKFwiYWRJZFwiKXx8bnVsbH12YXIgZG9tYWluO2Z1bmN0aW9uIEV2ZW50SGFuZGxlcnMoKXt9ZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCl7RXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKX1mdW5jdGlvbiAkZ2V0TWF4TGlzdGVuZXJzKGUpe3JldHVybiB2b2lkIDA9PT1lLl9tYXhMaXN0ZW5lcnM/RXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM6ZS5fbWF4TGlzdGVuZXJzfWZ1bmN0aW9uIGVtaXROb25lKGUsdCxyKXtpZih0KWUuY2FsbChyKTtlbHNlIGZvcih2YXIgaT1lLmxlbmd0aCxzPWFycmF5Q2xvbmUoZSxpKSxuPTA7bjxpOysrbilzW25dLmNhbGwocil9ZnVuY3Rpb24gZW1pdE9uZShlLHQscixpKXtpZih0KWUuY2FsbChyLGkpO2Vsc2UgZm9yKHZhciBzPWUubGVuZ3RoLG49YXJyYXlDbG9uZShlLHMpLGE9MDthPHM7KythKW5bYV0uY2FsbChyLGkpfWZ1bmN0aW9uIGVtaXRUd28oZSx0LHIsaSxzKXtpZih0KWUuY2FsbChyLGkscyk7ZWxzZSBmb3IodmFyIG49ZS5sZW5ndGgsYT1hcnJheUNsb25lKGUsbiksbz0wO288bjsrK28pYVtvXS5jYWxsKHIsaSxzKX1mdW5jdGlvbiBlbWl0VGhyZWUoZSx0LHIsaSxzLG4pe2lmKHQpZS5jYWxsKHIsaSxzLG4pO2Vsc2UgZm9yKHZhciBhPWUubGVuZ3RoLG89YXJyYXlDbG9uZShlLGEpLGw9MDtsPGE7KytsKW9bbF0uY2FsbChyLGkscyxuKX1mdW5jdGlvbiBlbWl0TWFueShlLHQscixpKXtpZih0KWUuYXBwbHkocixpKTtlbHNlIGZvcih2YXIgcz1lLmxlbmd0aCxuPWFycmF5Q2xvbmUoZSxzKSxhPTA7YTxzOysrYSluW2FdLmFwcGx5KHIsaSl9ZnVuY3Rpb24gX2FkZExpc3RlbmVyKGUsdCxyLGkpe3ZhciBzLG4sYTtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiByKXRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtpZigobj1lLl9ldmVudHMpPyhuLm5ld0xpc3RlbmVyJiYoZS5lbWl0KFwibmV3TGlzdGVuZXJcIix0LHIubGlzdGVuZXI/ci5saXN0ZW5lcjpyKSxuPWUuX2V2ZW50cyksYT1uW3RdKToobj1lLl9ldmVudHM9bmV3IEV2ZW50SGFuZGxlcnMsZS5fZXZlbnRzQ291bnQ9MCksYSl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgYT9hPW5bdF09aT9bcixhXTpbYSxyXTppP2EudW5zaGlmdChyKTphLnB1c2gociksIWEud2FybmVkJiYocz0kZ2V0TWF4TGlzdGVuZXJzKGUpKSYmcz4wJiZhLmxlbmd0aD5zKXthLndhcm5lZD0hMDt2YXIgbz1uZXcgRXJyb3IoXCJQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuIFwiK2EubGVuZ3RoK1wiIFwiK3QrXCIgbGlzdGVuZXJzIGFkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdFwiKTtvLm5hbWU9XCJNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmdcIixvLmVtaXR0ZXI9ZSxvLnR5cGU9dCxvLmNvdW50PWEubGVuZ3RoLGVtaXRXYXJuaW5nKG8pfX1lbHNlIGE9blt0XT1yLCsrZS5fZXZlbnRzQ291bnQ7cmV0dXJuIGV9ZnVuY3Rpb24gZW1pdFdhcm5pbmcoZSl7XCJmdW5jdGlvblwiPT10eXBlb2YgY29uc29sZS53YXJuP2NvbnNvbGUud2FybihlKTpjb25zb2xlLmxvZyhlKX1mdW5jdGlvbiBfb25jZVdyYXAoZSx0LHIpe3ZhciBpPSExO2Z1bmN0aW9uIHMoKXtlLnJlbW92ZUxpc3RlbmVyKHQscyksaXx8KGk9ITAsci5hcHBseShlLGFyZ3VtZW50cykpfXJldHVybiBzLmxpc3RlbmVyPXIsc31mdW5jdGlvbiBsaXN0ZW5lckNvdW50KGUpe3ZhciB0PXRoaXMuX2V2ZW50cztpZih0KXt2YXIgcj10W2VdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHIpcmV0dXJuIDE7aWYocilyZXR1cm4gci5sZW5ndGh9cmV0dXJuIDB9ZnVuY3Rpb24gc3BsaWNlT25lKGUsdCl7Zm9yKHZhciByPXQsaT1yKzEscz1lLmxlbmd0aDtpPHM7cis9MSxpKz0xKWVbcl09ZVtpXTtlLnBvcCgpfWZ1bmN0aW9uIGFycmF5Q2xvbmUoZSx0KXtmb3IodmFyIHI9bmV3IEFycmF5KHQpO3QtLTspclt0XT1lW3RdO3JldHVybiByfWZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhlKXtmb3IodmFyIHQ9bmV3IEFycmF5KGUubGVuZ3RoKSxyPTA7cjx0Lmxlbmd0aDsrK3IpdFtyXT1lW3JdLmxpc3RlbmVyfHxlW3JdO3JldHVybiB0fWZ1bmN0aW9uIHhkcigpe2xldCBlO3JldHVybiB3aW5kb3cuWERvbWFpblJlcXVlc3QmJihlPW5ldyBYRG9tYWluUmVxdWVzdCksZX1mdW5jdGlvbiBzdXBwb3J0ZWQoKXtyZXR1cm4hIXhkcigpfWZ1bmN0aW9uIGdldChlLHQscil7bGV0IGk9XCJmdW5jdGlvblwiPT10eXBlb2Ygd2luZG93LkFjdGl2ZVhPYmplY3Q/bmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTERPTVwiKTp2b2lkIDA7aWYoIWkpcmV0dXJuIHIobmV3IEVycm9yKFwiRmxhc2hVUkxIYW5kbGVyOiBNaWNyb3NvZnQuWE1MRE9NIGZvcm1hdCBub3Qgc3VwcG9ydGVkXCIpKTtpLmFzeW5jPSExLHJlcXVlc3Qub3BlbihcIkdFVFwiLGUpLHJlcXVlc3QudGltZW91dD10LnRpbWVvdXR8fDAscmVxdWVzdC53aXRoQ3JlZGVudGlhbHM9dC53aXRoQ3JlZGVudGlhbHN8fCExLHJlcXVlc3Quc2VuZCgpLHJlcXVlc3Qub25wcm9ncmVzcz1mdW5jdGlvbigpe30scmVxdWVzdC5vbmxvYWQ9ZnVuY3Rpb24oKXtpLmxvYWRYTUwocmVxdWVzdC5yZXNwb25zZVRleHQpLHIobnVsbCxpKX19RXZlbnRIYW5kbGVycy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShudWxsKSxFdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyPUV2ZW50RW1pdHRlcixFdmVudEVtaXR0ZXIudXNpbmdEb21haW5zPSExLEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZG9tYWluPXZvaWQgMCxFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHM9dm9pZCAwLEV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycz12b2lkIDAsRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM9MTAsRXZlbnRFbWl0dGVyLmluaXQ9ZnVuY3Rpb24oKXt0aGlzLmRvbWFpbj1udWxsLEV2ZW50RW1pdHRlci51c2luZ0RvbWFpbnMmJighZG9tYWluLmFjdGl2ZXx8dGhpcyBpbnN0YW5jZW9mIGRvbWFpbi5Eb21haW58fCh0aGlzLmRvbWFpbj1kb21haW4uYWN0aXZlKSksdGhpcy5fZXZlbnRzJiZ0aGlzLl9ldmVudHMhPT1PYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50c3x8KHRoaXMuX2V2ZW50cz1uZXcgRXZlbnRIYW5kbGVycyx0aGlzLl9ldmVudHNDb3VudD0wKSx0aGlzLl9tYXhMaXN0ZW5lcnM9dGhpcy5fbWF4TGlzdGVuZXJzfHx2b2lkIDB9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzPWZ1bmN0aW9uKGUpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlfHxlPDB8fGlzTmFOKGUpKXRocm93IG5ldyBUeXBlRXJyb3IoJ1wiblwiIGFyZ3VtZW50IG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtyZXR1cm4gdGhpcy5fbWF4TGlzdGVuZXJzPWUsdGhpc30sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24oKXtyZXR1cm4gJGdldE1heExpc3RlbmVycyh0aGlzKX0sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKGUpe3ZhciB0LHIsaSxzLG4sYSxvLGw9XCJlcnJvclwiPT09ZTtpZihhPXRoaXMuX2V2ZW50cylsPWwmJm51bGw9PWEuZXJyb3I7ZWxzZSBpZighbClyZXR1cm4hMTtpZihvPXRoaXMuZG9tYWluLGwpe2lmKHQ9YXJndW1lbnRzWzFdLCFvKXtpZih0IGluc3RhbmNlb2YgRXJyb3IpdGhyb3cgdDt2YXIgYz1uZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnK3QrXCIpXCIpO3Rocm93IGMuY29udGV4dD10LGN9cmV0dXJuIHR8fCh0PW5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudCcpKSx0LmRvbWFpbkVtaXR0ZXI9dGhpcyx0LmRvbWFpbj1vLHQuZG9tYWluVGhyb3duPSExLG8uZW1pdChcImVycm9yXCIsdCksITF9aWYoIShyPWFbZV0pKXJldHVybiExO3ZhciBwPVwiZnVuY3Rpb25cIj09dHlwZW9mIHI7c3dpdGNoKGk9YXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAxOmVtaXROb25lKHIscCx0aGlzKTticmVhaztjYXNlIDI6ZW1pdE9uZShyLHAsdGhpcyxhcmd1bWVudHNbMV0pO2JyZWFrO2Nhc2UgMzplbWl0VHdvKHIscCx0aGlzLGFyZ3VtZW50c1sxXSxhcmd1bWVudHNbMl0pO2JyZWFrO2Nhc2UgNDplbWl0VGhyZWUocixwLHRoaXMsYXJndW1lbnRzWzFdLGFyZ3VtZW50c1syXSxhcmd1bWVudHNbM10pO2JyZWFrO2RlZmF1bHQ6Zm9yKHM9bmV3IEFycmF5KGktMSksbj0xO248aTtuKyspc1tuLTFdPWFyZ3VtZW50c1tuXTtlbWl0TWFueShyLHAsdGhpcyxzKX1yZXR1cm4hMH0sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3JldHVybiBfYWRkTGlzdGVuZXIodGhpcyxlLHQsITEpfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uPUV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIsRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsZSx0LCEwKX0sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlPWZ1bmN0aW9uKGUsdCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCl0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7cmV0dXJuIHRoaXMub24oZSxfb25jZVdyYXAodGhpcyxlLHQpKSx0aGlzfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtyZXR1cm4gdGhpcy5wcmVwZW5kTGlzdGVuZXIoZSxfb25jZVdyYXAodGhpcyxlLHQpKSx0aGlzfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7dmFyIHIsaSxzLG4sYTtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtpZighKGk9dGhpcy5fZXZlbnRzKSlyZXR1cm4gdGhpcztpZighKHI9aVtlXSkpcmV0dXJuIHRoaXM7aWYocj09PXR8fHIubGlzdGVuZXImJnIubGlzdGVuZXI9PT10KTA9PS0tdGhpcy5fZXZlbnRzQ291bnQ/dGhpcy5fZXZlbnRzPW5ldyBFdmVudEhhbmRsZXJzOihkZWxldGUgaVtlXSxpLnJlbW92ZUxpc3RlbmVyJiZ0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLGUsci5saXN0ZW5lcnx8dCkpO2Vsc2UgaWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygcil7Zm9yKHM9LTEsbj1yLmxlbmd0aDtuLS0gPjA7KWlmKHJbbl09PT10fHxyW25dLmxpc3RlbmVyJiZyW25dLmxpc3RlbmVyPT09dCl7YT1yW25dLmxpc3RlbmVyLHM9bjticmVha31pZihzPDApcmV0dXJuIHRoaXM7aWYoMT09PXIubGVuZ3RoKXtpZihyWzBdPXZvaWQgMCwwPT0tLXRoaXMuX2V2ZW50c0NvdW50KXJldHVybiB0aGlzLl9ldmVudHM9bmV3IEV2ZW50SGFuZGxlcnMsdGhpcztkZWxldGUgaVtlXX1lbHNlIHNwbGljZU9uZShyLHMpO2kucmVtb3ZlTGlzdGVuZXImJnRoaXMuZW1pdChcInJlbW92ZUxpc3RlbmVyXCIsZSxhfHx0KX1yZXR1cm4gdGhpc30sRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnM9ZnVuY3Rpb24oZSl7dmFyIHQscjtpZighKHI9dGhpcy5fZXZlbnRzKSlyZXR1cm4gdGhpcztpZighci5yZW1vdmVMaXN0ZW5lcilyZXR1cm4gMD09PWFyZ3VtZW50cy5sZW5ndGg/KHRoaXMuX2V2ZW50cz1uZXcgRXZlbnRIYW5kbGVycyx0aGlzLl9ldmVudHNDb3VudD0wKTpyW2VdJiYoMD09LS10aGlzLl9ldmVudHNDb3VudD90aGlzLl9ldmVudHM9bmV3IEV2ZW50SGFuZGxlcnM6ZGVsZXRlIHJbZV0pLHRoaXM7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpe2Zvcih2YXIgaSxzPU9iamVjdC5rZXlzKHIpLG49MDtuPHMubGVuZ3RoOysrbilcInJlbW92ZUxpc3RlbmVyXCIhPT0oaT1zW25dKSYmdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoaSk7cmV0dXJuIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKFwicmVtb3ZlTGlzdGVuZXJcIiksdGhpcy5fZXZlbnRzPW5ldyBFdmVudEhhbmRsZXJzLHRoaXMuX2V2ZW50c0NvdW50PTAsdGhpc31pZihcImZ1bmN0aW9uXCI9PXR5cGVvZih0PXJbZV0pKXRoaXMucmVtb3ZlTGlzdGVuZXIoZSx0KTtlbHNlIGlmKHQpZG97dGhpcy5yZW1vdmVMaXN0ZW5lcihlLHRbdC5sZW5ndGgtMV0pfXdoaWxlKHRbMF0pO3JldHVybiB0aGlzfSxFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycz1mdW5jdGlvbihlKXt2YXIgdCxyPXRoaXMuX2V2ZW50cztyZXR1cm4gciYmKHQ9cltlXSk/XCJmdW5jdGlvblwiPT10eXBlb2YgdD9bdC5saXN0ZW5lcnx8dF06dW53cmFwTGlzdGVuZXJzKHQpOltdfSxFdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudD1mdW5jdGlvbihlLHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGUubGlzdGVuZXJDb3VudD9lLmxpc3RlbmVyQ291bnQodCk6bGlzdGVuZXJDb3VudC5jYWxsKGUsdCl9LEV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudD1saXN0ZW5lckNvdW50LEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcz1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9ldmVudHNDb3VudD4wP1JlZmxlY3Qub3duS2V5cyh0aGlzLl9ldmVudHMpOltdfTtjb25zdCBmbGFzaFVSTEhhbmRsZXI9e2dldDpnZXQsc3VwcG9ydGVkOnN1cHBvcnRlZH07ZnVuY3Rpb24gZ2V0JDEoZSx0LHIpe3IobmV3IEVycm9yKFwiUGxlYXNlIGJ1bmRsZSB0aGUgbGlicmFyeSBmb3Igbm9kZSB0byB1c2UgdGhlIG5vZGUgdXJsSGFuZGxlclwiKSl9Y29uc3Qgbm9kZVVSTEhhbmRsZXI9e2dldDpnZXQkMX07ZnVuY3Rpb24geGhyKCl7dHJ5e2NvbnN0IGU9bmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdDtyZXR1cm5cIndpdGhDcmVkZW50aWFsc1wiaW4gZT9lOm51bGx9Y2F0Y2goZSl7cmV0dXJuIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gWEhSVVJMSGFuZGxlciBzdXBwb3J0IGNoZWNrOlwiLGUpLG51bGx9fWZ1bmN0aW9uIHN1cHBvcnRlZCQxKCl7cmV0dXJuISF4aHIoKX1mdW5jdGlvbiBnZXQkMihlLHQscil7aWYoXCJodHRwczpcIj09PXdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCYmMD09PWUuaW5kZXhPZihcImh0dHA6Ly9cIikpcmV0dXJuIHIobmV3IEVycm9yKFwiWEhSVVJMSGFuZGxlcjogQ2Fubm90IGdvIGZyb20gSFRUUFMgdG8gSFRUUC5cIikpO3RyeXtjb25zdCBpPXhocigpO2kub3BlbihcIkdFVFwiLGUpLGkudGltZW91dD10LnRpbWVvdXR8fDAsaS53aXRoQ3JlZGVudGlhbHM9dC53aXRoQ3JlZGVudGlhbHN8fCExLGkub3ZlcnJpZGVNaW1lVHlwZSYmaS5vdmVycmlkZU1pbWVUeXBlKFwidGV4dC94bWxcIiksaS5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXs0PT09aS5yZWFkeVN0YXRlJiYoMjAwPT09aS5zdGF0dXM/cihudWxsLGkucmVzcG9uc2VYTUwpOnIobmV3IEVycm9yKGBYSFJVUkxIYW5kbGVyOiAke2kuc3RhdHVzVGV4dH1gKSkpfSxpLnNlbmQoKX1jYXRjaChlKXtyKG5ldyBFcnJvcihcIlhIUlVSTEhhbmRsZXI6IFVuZXhwZWN0ZWQgZXJyb3JcIikpfX1jb25zdCBYSFJVUkxIYW5kbGVyPXtnZXQ6Z2V0JDIsc3VwcG9ydGVkOnN1cHBvcnRlZCQxfTtmdW5jdGlvbiBnZXQkMyhlLHQscil7cmV0dXJuIHJ8fChcImZ1bmN0aW9uXCI9PXR5cGVvZiB0JiYocj10KSx0PXt9KSxcInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93fHxudWxsPT09d2luZG93P25vZGVVUkxIYW5kbGVyLmdldChlLHQscik6WEhSVVJMSGFuZGxlci5zdXBwb3J0ZWQoKT9YSFJVUkxIYW5kbGVyLmdldChlLHQscik6Zmxhc2hVUkxIYW5kbGVyLnN1cHBvcnRlZCgpP2ZsYXNoVVJMSGFuZGxlci5nZXQoZSx0LHIpOnIobmV3IEVycm9yKFwiQ3VycmVudCBjb250ZXh0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgYW55IG9mIHRoZSBkZWZhdWx0IFVSTEhhbmRsZXJzLiBQbGVhc2UgcHJvdmlkZSBhIGN1c3RvbSBVUkxIYW5kbGVyXCIpKX1jb25zdCB1cmxIYW5kbGVyPXtnZXQ6Z2V0JDN9O2NsYXNzIFZBU1RSZXNwb25zZXtjb25zdHJ1Y3Rvcigpe3RoaXMuYWRzPVtdLHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXM9W119fWNvbnN0IERFRkFVTFRfTUFYX1dSQVBQRVJfREVQVEg9MTAsREVGQVVMVF9FVkVOVF9EQVRBPXtFUlJPUkNPREU6OTAwLGV4dGVuc2lvbnM6W119O2NsYXNzIFZBU1RQYXJzZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXJ7Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMucmVtYWluaW5nQWRzPVtdLHRoaXMucGFyZW50VVJMcz1bXSx0aGlzLmVycm9yVVJMVGVtcGxhdGVzPVtdLHRoaXMucm9vdEVycm9yVVJMVGVtcGxhdGVzPVtdLHRoaXMubWF4V3JhcHBlckRlcHRoPW51bGwsdGhpcy5VUkxUZW1wbGF0ZUZpbHRlcnM9W10sdGhpcy5mZXRjaGluZ09wdGlvbnM9e319YWRkVVJMVGVtcGxhdGVGaWx0ZXIoZSl7XCJmdW5jdGlvblwiPT10eXBlb2YgZSYmdGhpcy5VUkxUZW1wbGF0ZUZpbHRlcnMucHVzaChlKX1yZW1vdmVVUkxUZW1wbGF0ZUZpbHRlcigpe3RoaXMuVVJMVGVtcGxhdGVGaWx0ZXJzLnBvcCgpfWNvdW50VVJMVGVtcGxhdGVGaWx0ZXJzKCl7cmV0dXJuIHRoaXMuVVJMVGVtcGxhdGVGaWx0ZXJzLmxlbmd0aH1jbGVhclVSTFRlbXBsYXRlRmlsdGVycygpe3RoaXMuVVJMVGVtcGxhdGVGaWx0ZXJzPVtdfXRyYWNrVmFzdEVycm9yKGUsdCwuLi5yKXt0aGlzLmVtaXQoXCJWQVNULWVycm9yXCIsT2JqZWN0LmFzc2lnbihERUZBVUxUX0VWRU5UX0RBVEEsdCwuLi5yKSksdXRpbC50cmFjayhlLHQpfWdldEVycm9yVVJMVGVtcGxhdGVzKCl7cmV0dXJuIHRoaXMucm9vdEVycm9yVVJMVGVtcGxhdGVzLmNvbmNhdCh0aGlzLmVycm9yVVJMVGVtcGxhdGVzKX1mZXRjaFZBU1QoZSx0LHIpe3JldHVybiBuZXcgUHJvbWlzZSgoaSxzKT0+e3RoaXMuVVJMVGVtcGxhdGVGaWx0ZXJzLmZvckVhY2godD0+e2U9dChlKX0pLHRoaXMucGFyZW50VVJMcy5wdXNoKGUpLHRoaXMuZW1pdChcIlZBU1QtcmVzb2x2aW5nXCIse3VybDplLHdyYXBwZXJEZXB0aDp0LG9yaWdpbmFsVXJsOnJ9KSx0aGlzLnVybEhhbmRsZXIuZ2V0KGUsdGhpcy5mZXRjaGluZ09wdGlvbnMsKHQscik9Pnt0aGlzLmVtaXQoXCJWQVNULXJlc29sdmVkXCIse3VybDplLGVycm9yOnR9KSx0P3ModCk6aShyKX0pfSl9aW5pdFBhcnNpbmdTdGF0dXMoZT17fSl7dGhpcy5yb290VVJMPVwiXCIsdGhpcy5yZW1haW5pbmdBZHM9W10sdGhpcy5wYXJlbnRVUkxzPVtdLHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXM9W10sdGhpcy5yb290RXJyb3JVUkxUZW1wbGF0ZXM9W10sdGhpcy5tYXhXcmFwcGVyRGVwdGg9ZS53cmFwcGVyTGltaXR8fERFRkFVTFRfTUFYX1dSQVBQRVJfREVQVEgsdGhpcy5mZXRjaGluZ09wdGlvbnM9e3RpbWVvdXQ6ZS50aW1lb3V0LHdpdGhDcmVkZW50aWFsczplLndpdGhDcmVkZW50aWFsc30sdGhpcy51cmxIYW5kbGVyPWUudXJsaGFuZGxlcnx8dXJsSGFuZGxlcn1nZXRSZW1haW5pbmdBZHMoZSl7aWYoMD09PXRoaXMucmVtYWluaW5nQWRzLmxlbmd0aClyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gbW9yZSBhZHMgYXJlIGF2YWlsYWJsZSBmb3IgdGhlIGdpdmVuIFZBU1RcIikpO2NvbnN0IHQ9ZT91dGlsLmZsYXR0ZW4odGhpcy5yZW1haW5pbmdBZHMpOnRoaXMucmVtYWluaW5nQWRzLnNoaWZ0KCk7cmV0dXJuIHRoaXMuZXJyb3JVUkxUZW1wbGF0ZXM9W10sdGhpcy5wYXJlbnRVUkxzPVtdLHRoaXMucmVzb2x2ZUFkcyh0LHt3cmFwcGVyRGVwdGg6MCxvcmlnaW5hbFVybDp0aGlzLnJvb3RVUkx9KS50aGVuKGU9PnRoaXMuYnVpbGRWQVNUUmVzcG9uc2UoZSkpfWdldEFuZFBhcnNlVkFTVChlLHQ9e30pe3JldHVybiB0aGlzLmluaXRQYXJzaW5nU3RhdHVzKHQpLHRoaXMucm9vdFVSTD1lLHRoaXMuZmV0Y2hWQVNUKGUpLnRoZW4ocj0+KHQub3JpZ2luYWxVcmw9ZSx0LmlzUm9vdFZBU1Q9ITAsdGhpcy5wYXJzZShyLHQpLnRoZW4oZT0+dGhpcy5idWlsZFZBU1RSZXNwb25zZShlKSkpKX1wYXJzZVZBU1QoZSx0PXt9KXtyZXR1cm4gdGhpcy5pbml0UGFyc2luZ1N0YXR1cyh0KSx0LmlzUm9vdFZBU1Q9ITAsdGhpcy5wYXJzZShlLHQpLnRoZW4oZT0+dGhpcy5idWlsZFZBU1RSZXNwb25zZShlKSl9YnVpbGRWQVNUUmVzcG9uc2UoZSl7Y29uc3QgdD1uZXcgVkFTVFJlc3BvbnNlO3JldHVybiB0LmFkcz1lLHQuZXJyb3JVUkxUZW1wbGF0ZXM9dGhpcy5nZXRFcnJvclVSTFRlbXBsYXRlcygpLHRoaXMuY29tcGxldGVXcmFwcGVyUmVzb2x2aW5nKHQpLHR9cGFyc2UoZSx7cmVzb2x2ZUFsbDp0PSEwLHdyYXBwZXJTZXF1ZW5jZTpyPW51bGwsb3JpZ2luYWxVcmw6aT1udWxsLHdyYXBwZXJEZXB0aDpzPTAsaXNSb290VkFTVDpuPSExfSl7aWYoIWV8fCFlLmRvY3VtZW50RWxlbWVudHx8XCJWQVNUXCIhPT1lLmRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSlyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBWQVNUIFhNTERvY3VtZW50XCIpKTtsZXQgYT1bXTtjb25zdCBvPWUuZG9jdW1lbnRFbGVtZW50LmNoaWxkTm9kZXM7Zm9yKGxldCBlIGluIG8pe2NvbnN0IHQ9b1tlXTtpZihcIkVycm9yXCI9PT10Lm5vZGVOYW1lKXtjb25zdCBlPXBhcnNlclV0aWxzLnBhcnNlTm9kZVRleHQodCk7bj90aGlzLnJvb3RFcnJvclVSTFRlbXBsYXRlcy5wdXNoKGUpOnRoaXMuZXJyb3JVUkxUZW1wbGF0ZXMucHVzaChlKX1pZihcIkFkXCI9PT10Lm5vZGVOYW1lKXtjb25zdCBlPXBhcnNlQWQodCk7ZT9hLnB1c2goZSk6dGhpcy50cmFja1Zhc3RFcnJvcih0aGlzLmdldEVycm9yVVJMVGVtcGxhdGVzKCkse0VSUk9SQ09ERToxMDF9KX19Y29uc3QgbD1hLmxlbmd0aCxjPWFbbC0xXTtyZXR1cm4gMT09PWwmJnZvaWQgMCE9PXImJm51bGwhPT1yJiZjJiYhYy5zZXF1ZW5jZSYmKGMuc2VxdWVuY2U9ciksITE9PT10JiYodGhpcy5yZW1haW5pbmdBZHM9cGFyc2VyVXRpbHMuc3BsaXRWQVNUKGEpLGE9dGhpcy5yZW1haW5pbmdBZHMuc2hpZnQoKSksdGhpcy5yZXNvbHZlQWRzKGEse3dyYXBwZXJEZXB0aDpzLG9yaWdpbmFsVXJsOml9KX1yZXNvbHZlQWRzKGU9W10se3dyYXBwZXJEZXB0aDp0LG9yaWdpbmFsVXJsOnJ9KXtjb25zdCBpPVtdO3JldHVybiBlLmZvckVhY2goZT0+e2NvbnN0IHM9dGhpcy5yZXNvbHZlV3JhcHBlcnMoZSx0LHIpO2kucHVzaChzKX0pLFByb21pc2UuYWxsKGkpLnRoZW4oZT0+e2NvbnN0IGk9dXRpbC5mbGF0dGVuKGUpO2lmKCFpJiZ0aGlzLnJlbWFpbmluZ0Fkcy5sZW5ndGg+MCl7Y29uc3QgZT10aGlzLnJlbWFpbmluZ0Fkcy5zaGlmdCgpO3JldHVybiB0aGlzLnJlc29sdmVBZHMoZSx7d3JhcHBlckRlcHRoOnQsb3JpZ2luYWxVcmw6cn0pfXJldHVybiBpfSl9cmVzb2x2ZVdyYXBwZXJzKGUsdCxyKXtyZXR1cm4gbmV3IFByb21pc2UoKGkscyk9PntpZih0KyssIWUubmV4dFdyYXBwZXJVUkwpcmV0dXJuIGRlbGV0ZSBlLm5leHRXcmFwcGVyVVJMLGkoZSk7aWYodD49dGhpcy5tYXhXcmFwcGVyRGVwdGh8fC0xIT09dGhpcy5wYXJlbnRVUkxzLmluZGV4T2YoZS5uZXh0V3JhcHBlclVSTCkpcmV0dXJuIGUuZXJyb3JDb2RlPTMwMixkZWxldGUgZS5uZXh0V3JhcHBlclVSTCxpKGUpO2UubmV4dFdyYXBwZXJVUkw9cGFyc2VyVXRpbHMucmVzb2x2ZVZhc3RBZFRhZ1VSSShlLm5leHRXcmFwcGVyVVJMLHIpO2NvbnN0IG49ZS5zZXF1ZW5jZTtyPWUubmV4dFdyYXBwZXJVUkwsdGhpcy5mZXRjaFZBU1QoZS5uZXh0V3JhcHBlclVSTCx0LHIpLnRoZW4ocz0+dGhpcy5wYXJzZShzLHtvcmlnaW5hbFVybDpyLHdyYXBwZXJTZXF1ZW5jZTpuLHdyYXBwZXJEZXB0aDp0fSkudGhlbih0PT57aWYoZGVsZXRlIGUubmV4dFdyYXBwZXJVUkwsMD09PXQubGVuZ3RoKXJldHVybiBlLmNyZWF0aXZlcz1bXSxpKGUpO3QuZm9yRWFjaCh0PT57dCYmcGFyc2VyVXRpbHMubWVyZ2VXcmFwcGVyQWREYXRhKHQsZSl9KSxpKHQpfSkpLmNhdGNoKHQ9PntlLmVycm9yQ29kZT0zMDEsZS5lcnJvck1lc3NhZ2U9dC5tZXNzYWdlLGkoZSl9KX0pfWNvbXBsZXRlV3JhcHBlclJlc29sdmluZyhlKXtpZigwPT09ZS5hZHMubGVuZ3RoKXRoaXMudHJhY2tWYXN0RXJyb3IoZS5lcnJvclVSTFRlbXBsYXRlcyx7RVJST1JDT0RFOjMwM30pO2Vsc2UgZm9yKGxldCB0PWUuYWRzLmxlbmd0aC0xO3Q+PTA7dC0tKXtsZXQgcj1lLmFkc1t0XTsoci5lcnJvckNvZGV8fDA9PT1yLmNyZWF0aXZlcy5sZW5ndGgpJiYodGhpcy50cmFja1Zhc3RFcnJvcihyLmVycm9yVVJMVGVtcGxhdGVzLmNvbmNhdChlLmVycm9yVVJMVGVtcGxhdGVzKSx7RVJST1JDT0RFOnIuZXJyb3JDb2RlfHwzMDN9LHtFUlJPUk1FU1NBR0U6ci5lcnJvck1lc3NhZ2V8fFwiXCJ9LHtleHRlbnNpb25zOnIuZXh0ZW5zaW9uc30se3N5c3RlbTpyLnN5c3RlbX0pLGUuYWRzLnNwbGljZSh0LDEpKX19fWxldCBzdG9yYWdlPW51bGw7Y29uc3QgREVGQVVMVF9TVE9SQUdFPXtkYXRhOnt9LGxlbmd0aDowLGdldEl0ZW0oZSl7cmV0dXJuIHRoaXMuZGF0YVtlXX0sc2V0SXRlbShlLHQpe3RoaXMuZGF0YVtlXT10LHRoaXMubGVuZ3RoPU9iamVjdC5rZXlzKHRoaXMuZGF0YSkubGVuZ3RofSxyZW1vdmVJdGVtKGUpe2RlbGV0ZSBkYXRhW2VdLHRoaXMubGVuZ3RoPU9iamVjdC5rZXlzKHRoaXMuZGF0YSkubGVuZ3RofSxjbGVhcigpe3RoaXMuZGF0YT17fSx0aGlzLmxlbmd0aD0wfX07Y2xhc3MgU3RvcmFnZXtjb25zdHJ1Y3Rvcigpe3RoaXMuc3RvcmFnZT10aGlzLmluaXRTdG9yYWdlKCl9aW5pdFN0b3JhZ2UoKXtpZihzdG9yYWdlKXJldHVybiBzdG9yYWdlO3RyeXtzdG9yYWdlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJm51bGwhPT13aW5kb3c/d2luZG93LmxvY2FsU3RvcmFnZXx8d2luZG93LnNlc3Npb25TdG9yYWdlOm51bGx9Y2F0Y2goZSl7c3RvcmFnZT1udWxsfXJldHVybiBzdG9yYWdlJiYhdGhpcy5pc1N0b3JhZ2VEaXNhYmxlZChzdG9yYWdlKXx8KHN0b3JhZ2U9REVGQVVMVF9TVE9SQUdFKS5jbGVhcigpLHN0b3JhZ2V9aXNTdG9yYWdlRGlzYWJsZWQoZSl7Y29uc3QgdD1cIl9fVkFTVFN0b3JhZ2VfX1wiO3RyeXtpZihlLnNldEl0ZW0odCx0KSxlLmdldEl0ZW0odCkhPT10KXJldHVybiBlLnJlbW92ZUl0ZW0odCksITB9Y2F0Y2goZSl7cmV0dXJuITB9cmV0dXJuIGUucmVtb3ZlSXRlbSh0KSwhMX1nZXRJdGVtKGUpe3JldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShlKX1zZXRJdGVtKGUsdCl7cmV0dXJuIHRoaXMuc3RvcmFnZS5zZXRJdGVtKGUsdCl9cmVtb3ZlSXRlbShlKXtyZXR1cm4gdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0oZSl9Y2xlYXIoKXtyZXR1cm4gdGhpcy5zdG9yYWdlLmNsZWFyKCl9fWNsYXNzIFZBU1RDbGllbnR7Y29uc3RydWN0b3IoZSx0LHIpe3RoaXMuY2FwcGluZ0ZyZWVMdW5jaD1lfHwwLHRoaXMuY2FwcGluZ01pbmltdW1UaW1lSW50ZXJ2YWw9dHx8MCx0aGlzLmRlZmF1bHRPcHRpb25zPXt3aXRoQ3JlZGVudGlhbHM6ITEsdGltZW91dDowfSx0aGlzLnZhc3RQYXJzZXI9bmV3IFZBU1RQYXJzZXIsdGhpcy5zdG9yYWdlPXJ8fG5ldyBTdG9yYWdlLHZvaWQgMD09PXRoaXMubGFzdFN1Y2Nlc3NmdWxBZCYmKHRoaXMubGFzdFN1Y2Nlc3NmdWxBZD0wKSx2b2lkIDA9PT10aGlzLnRvdGFsQ2FsbHMmJih0aGlzLnRvdGFsQ2FsbHM9MCksdm9pZCAwPT09dGhpcy50b3RhbENhbGxzVGltZW91dCYmKHRoaXMudG90YWxDYWxsc1RpbWVvdXQ9MCl9Z2V0UGFyc2VyKCl7cmV0dXJuIHRoaXMudmFzdFBhcnNlcn1nZXQgbGFzdFN1Y2Nlc3NmdWxBZCgpe3JldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShcInZhc3QtY2xpZW50LWxhc3Qtc3VjY2Vzc2Z1bC1hZFwiKX1zZXQgbGFzdFN1Y2Nlc3NmdWxBZChlKXt0aGlzLnN0b3JhZ2Uuc2V0SXRlbShcInZhc3QtY2xpZW50LWxhc3Qtc3VjY2Vzc2Z1bC1hZFwiLGUpfWdldCB0b3RhbENhbGxzKCl7cmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKFwidmFzdC1jbGllbnQtdG90YWwtY2FsbHNcIil9c2V0IHRvdGFsQ2FsbHMoZSl7dGhpcy5zdG9yYWdlLnNldEl0ZW0oXCJ2YXN0LWNsaWVudC10b3RhbC1jYWxsc1wiLGUpfWdldCB0b3RhbENhbGxzVGltZW91dCgpe3JldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShcInZhc3QtY2xpZW50LXRvdGFsLWNhbGxzLXRpbWVvdXRcIil9c2V0IHRvdGFsQ2FsbHNUaW1lb3V0KGUpe3RoaXMuc3RvcmFnZS5zZXRJdGVtKFwidmFzdC1jbGllbnQtdG90YWwtY2FsbHMtdGltZW91dFwiLGUpfWhhc1JlbWFpbmluZ0Fkcygpe3JldHVybiB0aGlzLnZhc3RQYXJzZXIucmVtYWluaW5nQWRzLmxlbmd0aD4wfWdldE5leHRBZHMoZSl7cmV0dXJuIHRoaXMudmFzdFBhcnNlci5nZXRSZW1haW5pbmdBZHMoZSl9Z2V0KGUsdD17fSl7Y29uc3Qgcj1EYXRlLm5vdygpO3JldHVybih0PU9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0T3B0aW9ucyx0KSkuaGFzT3duUHJvcGVydHkoXCJyZXNvbHZlQWxsXCIpfHwodC5yZXNvbHZlQWxsPSExKSx0aGlzLnRvdGFsQ2FsbHNUaW1lb3V0PHI/KHRoaXMudG90YWxDYWxscz0xLHRoaXMudG90YWxDYWxsc1RpbWVvdXQ9ciszNmU1KTp0aGlzLnRvdGFsQ2FsbHMrKyxuZXcgUHJvbWlzZSgoaSxzKT0+e2lmKHRoaXMuY2FwcGluZ0ZyZWVMdW5jaD49dGhpcy50b3RhbENhbGxzKXJldHVybiBzKG5ldyBFcnJvcihgVkFTVCBjYWxsIGNhbmNlbGVkIOKAkyBGcmVlTHVuY2ggY2FwcGluZyBub3QgcmVhY2hlZCB5ZXQgJHt0aGlzLnRvdGFsQ2FsbHN9LyR7dGhpcy5jYXBwaW5nRnJlZUx1bmNofWApKTtjb25zdCBuPXItdGhpcy5sYXN0U3VjY2Vzc2Z1bEFkO2lmKG48MCl0aGlzLmxhc3RTdWNjZXNzZnVsQWQ9MDtlbHNlIGlmKG48dGhpcy5jYXBwaW5nTWluaW11bVRpbWVJbnRlcnZhbClyZXR1cm4gcyhuZXcgRXJyb3IoYFZBU1QgY2FsbCBjYW5jZWxlZCDigJMgKCR7dGhpcy5jYXBwaW5nTWluaW11bVRpbWVJbnRlcnZhbH0pbXMgbWluaW11bSBpbnRlcnZhbCByZWFjaGVkYCkpO3RoaXMudmFzdFBhcnNlci5nZXRBbmRQYXJzZVZBU1QoZSx0KS50aGVuKGU9PmkoZSkpLmNhdGNoKGU9PnMoZSkpfSl9fWNvbnN0IERFRkFVTFRfU0tJUF9ERUxBWT0tMTtjbGFzcyBWQVNUVHJhY2tlciBleHRlbmRzIEV2ZW50RW1pdHRlcntjb25zdHJ1Y3RvcihlLHQscixpPW51bGwpe3N1cGVyKCksdGhpcy5hZD10LHRoaXMuY3JlYXRpdmU9cix0aGlzLnZhcmlhdGlvbj1pLHRoaXMubXV0ZWQ9ITEsdGhpcy5pbXByZXNzZWQ9ITEsdGhpcy5za2lwcGFibGU9ITEsdGhpcy50cmFja2luZ0V2ZW50cz17fSx0aGlzLl9hbHJlYWR5VHJpZ2dlcmVkUXVhcnRpbGVzPXt9LHRoaXMuZW1pdEFsd2F5c0V2ZW50cz1bXCJjcmVhdGl2ZVZpZXdcIixcInN0YXJ0XCIsXCJmaXJzdFF1YXJ0aWxlXCIsXCJtaWRwb2ludFwiLFwidGhpcmRRdWFydGlsZVwiLFwiY29tcGxldGVcIixcInJlc3VtZVwiLFwicGF1c2VcIixcInJld2luZFwiLFwic2tpcFwiLFwiY2xvc2VMaW5lYXJcIixcImNsb3NlXCJdO2ZvcihsZXQgZSBpbiB0aGlzLmNyZWF0aXZlLnRyYWNraW5nRXZlbnRzKXtjb25zdCB0PXRoaXMuY3JlYXRpdmUudHJhY2tpbmdFdmVudHNbZV07dGhpcy50cmFja2luZ0V2ZW50c1tlXT10LnNsaWNlKDApfXRoaXMuY3JlYXRpdmUgaW5zdGFuY2VvZiBDcmVhdGl2ZUxpbmVhcj90aGlzLl9pbml0TGluZWFyVHJhY2tpbmcoKTp0aGlzLl9pbml0VmFyaWF0aW9uVHJhY2tpbmcoKSxlJiZ0aGlzLm9uKFwic3RhcnRcIiwoKT0+e2UubGFzdFN1Y2Nlc3NmdWxBZD1EYXRlLm5vdygpfSl9X2luaXRMaW5lYXJUcmFja2luZygpe3RoaXMubGluZWFyPSEwLHRoaXMuc2tpcERlbGF5PXRoaXMuY3JlYXRpdmUuc2tpcERlbGF5LHRoaXMuc2V0RHVyYXRpb24odGhpcy5jcmVhdGl2ZS5kdXJhdGlvbiksdGhpcy5jbGlja1Rocm91Z2hVUkxUZW1wbGF0ZT10aGlzLmNyZWF0aXZlLnZpZGVvQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUsdGhpcy5jbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPXRoaXMuY3JlYXRpdmUudmlkZW9DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzfV9pbml0VmFyaWF0aW9uVHJhY2tpbmcoKXtpZih0aGlzLmxpbmVhcj0hMSx0aGlzLnNraXBEZWxheT1ERUZBVUxUX1NLSVBfREVMQVksdGhpcy52YXJpYXRpb24pe2ZvcihsZXQgZSBpbiB0aGlzLnZhcmlhdGlvbi50cmFja2luZ0V2ZW50cyl7Y29uc3QgdD10aGlzLnZhcmlhdGlvbi50cmFja2luZ0V2ZW50c1tlXTt0aGlzLnRyYWNraW5nRXZlbnRzW2VdP3RoaXMudHJhY2tpbmdFdmVudHNbZV09dGhpcy50cmFja2luZ0V2ZW50c1tlXS5jb25jYXQodC5zbGljZSgwKSk6dGhpcy50cmFja2luZ0V2ZW50c1tlXT10LnNsaWNlKDApfXRoaXMudmFyaWF0aW9uIGluc3RhbmNlb2YgTm9uTGluZWFyQWQ/KHRoaXMuY2xpY2tUaHJvdWdoVVJMVGVtcGxhdGU9dGhpcy52YXJpYXRpb24ubm9ubGluZWFyQ2xpY2tUaHJvdWdoVVJMVGVtcGxhdGUsdGhpcy5jbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzPXRoaXMudmFyaWF0aW9uLm5vbmxpbmVhckNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMsdGhpcy5zZXREdXJhdGlvbih0aGlzLnZhcmlhdGlvbi5taW5TdWdnZXN0ZWREdXJhdGlvbikpOnRoaXMudmFyaWF0aW9uIGluc3RhbmNlb2YgQ29tcGFuaW9uQWQmJih0aGlzLmNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlPXRoaXMudmFyaWF0aW9uLmNvbXBhbmlvbkNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlLHRoaXMuY2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcz10aGlzLnZhcmlhdGlvbi5jb21wYW5pb25DbGlja1RyYWNraW5nVVJMVGVtcGxhdGVzKX19c2V0RHVyYXRpb24oZSl7dGhpcy5hc3NldER1cmF0aW9uPWUsdGhpcy5xdWFydGlsZXM9e2ZpcnN0UXVhcnRpbGU6TWF0aC5yb3VuZCgyNSp0aGlzLmFzc2V0RHVyYXRpb24pLzEwMCxtaWRwb2ludDpNYXRoLnJvdW5kKDUwKnRoaXMuYXNzZXREdXJhdGlvbikvMTAwLHRoaXJkUXVhcnRpbGU6TWF0aC5yb3VuZCg3NSp0aGlzLmFzc2V0RHVyYXRpb24pLzEwMH19c2V0UHJvZ3Jlc3MoZSl7Y29uc3QgdD10aGlzLnNraXBEZWxheXx8REVGQVVMVF9TS0lQX0RFTEFZO2lmKC0xPT09dHx8dGhpcy5za2lwcGFibGV8fCh0PmU/dGhpcy5lbWl0KFwic2tpcC1jb3VudGRvd25cIix0LWUpOih0aGlzLnNraXBwYWJsZT0hMCx0aGlzLmVtaXQoXCJza2lwLWNvdW50ZG93blwiLDApKSksdGhpcy5hc3NldER1cmF0aW9uPjApe2NvbnN0IHQ9W107aWYoZT4wKXtjb25zdCByPU1hdGgucm91bmQoZS90aGlzLmFzc2V0RHVyYXRpb24qMTAwKTt0LnB1c2goXCJzdGFydFwiKSx0LnB1c2goYHByb2dyZXNzLSR7cn0lYCksdC5wdXNoKGBwcm9ncmVzcy0ke01hdGgucm91bmQoZSl9YCk7Zm9yKGxldCByIGluIHRoaXMucXVhcnRpbGVzKXRoaXMuaXNRdWFydGlsZVJlYWNoZWQocix0aGlzLnF1YXJ0aWxlc1tyXSxlKSYmKHQucHVzaChyKSx0aGlzLl9hbHJlYWR5VHJpZ2dlcmVkUXVhcnRpbGVzW3JdPSEwKX10LmZvckVhY2goZT0+e3RoaXMudHJhY2soZSwhMCl9KSxlPHRoaXMucHJvZ3Jlc3MmJnRoaXMudHJhY2soXCJyZXdpbmRcIil9dGhpcy5wcm9ncmVzcz1lfWlzUXVhcnRpbGVSZWFjaGVkKGUsdCxyKXtsZXQgaT0hMTtyZXR1cm4gdDw9ciYmIXRoaXMuX2FscmVhZHlUcmlnZ2VyZWRRdWFydGlsZXNbZV0mJihpPSEwKSxpfXNldE11dGVkKGUpe3RoaXMubXV0ZWQhPT1lJiZ0aGlzLnRyYWNrKGU/XCJtdXRlXCI6XCJ1bm11dGVcIiksdGhpcy5tdXRlZD1lfXNldFBhdXNlZChlKXt0aGlzLnBhdXNlZCE9PWUmJnRoaXMudHJhY2soZT9cInBhdXNlXCI6XCJyZXN1bWVcIiksdGhpcy5wYXVzZWQ9ZX1zZXRGdWxsc2NyZWVuKGUpe3RoaXMuZnVsbHNjcmVlbiE9PWUmJnRoaXMudHJhY2soZT9cImZ1bGxzY3JlZW5cIjpcImV4aXRGdWxsc2NyZWVuXCIpLHRoaXMuZnVsbHNjcmVlbj1lfXNldEV4cGFuZChlKXt0aGlzLmV4cGFuZGVkIT09ZSYmdGhpcy50cmFjayhlP1wiZXhwYW5kXCI6XCJjb2xsYXBzZVwiKSx0aGlzLmV4cGFuZGVkPWV9c2V0U2tpcERlbGF5KGUpe1wibnVtYmVyXCI9PXR5cGVvZiBlJiYodGhpcy5za2lwRGVsYXk9ZSl9dHJhY2tJbXByZXNzaW9uKCl7dGhpcy5pbXByZXNzZWR8fCh0aGlzLmltcHJlc3NlZD0hMCx0aGlzLnRyYWNrVVJMcyh0aGlzLmFkLmltcHJlc3Npb25VUkxUZW1wbGF0ZXMpLHRoaXMudHJhY2soXCJjcmVhdGl2ZVZpZXdcIikpfWVycm9yV2l0aENvZGUoZSl7dGhpcy50cmFja1VSTHModGhpcy5hZC5lcnJvclVSTFRlbXBsYXRlcyx7RVJST1JDT0RFOmV9KX1jb21wbGV0ZSgpe3RoaXMudHJhY2soXCJjb21wbGV0ZVwiKX1jbG9zZSgpe3RoaXMudHJhY2sodGhpcy5saW5lYXI/XCJjbG9zZUxpbmVhclwiOlwiY2xvc2VcIil9c2tpcCgpe3RoaXMudHJhY2soXCJza2lwXCIpLHRoaXMudHJhY2tpbmdFdmVudHM9W119Y2xpY2soZT1udWxsKXt0aGlzLmNsaWNrVHJhY2tpbmdVUkxUZW1wbGF0ZXMmJnRoaXMuY2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcy5sZW5ndGgmJnRoaXMudHJhY2tVUkxzKHRoaXMuY2xpY2tUcmFja2luZ1VSTFRlbXBsYXRlcyk7Y29uc3QgdD10aGlzLmNsaWNrVGhyb3VnaFVSTFRlbXBsYXRlfHxlO2lmKHQpe2NvbnN0IGU9dGhpcy5saW5lYXI/e0NPTlRFTlRQTEFZSEVBRDp0aGlzLnByb2dyZXNzRm9ybWF0dGVkKCl9Ont9LHI9dXRpbC5yZXNvbHZlVVJMVGVtcGxhdGVzKFt0XSxlKVswXTt0aGlzLmVtaXQoXCJjbGlja3Rocm91Z2hcIixyKX19dHJhY2soZSx0PSExKXtcImNsb3NlTGluZWFyXCI9PT1lJiYhdGhpcy50cmFja2luZ0V2ZW50c1tlXSYmdGhpcy50cmFja2luZ0V2ZW50cy5jbG9zZSYmKGU9XCJjbG9zZVwiKTtjb25zdCByPXRoaXMudHJhY2tpbmdFdmVudHNbZV0saT10aGlzLmVtaXRBbHdheXNFdmVudHMuaW5kZXhPZihlKT4tMTtyPyh0aGlzLmVtaXQoZSxcIlwiKSx0aGlzLnRyYWNrVVJMcyhyKSk6aSYmdGhpcy5lbWl0KGUsXCJcIiksdCYmKGRlbGV0ZSB0aGlzLnRyYWNraW5nRXZlbnRzW2VdLGkmJnRoaXMuZW1pdEFsd2F5c0V2ZW50cy5zcGxpY2UodGhpcy5lbWl0QWx3YXlzRXZlbnRzLmluZGV4T2YoZSksMSkpfXRyYWNrVVJMcyhlLHQ9e30pe3RoaXMubGluZWFyJiYodGhpcy5jcmVhdGl2ZSYmdGhpcy5jcmVhdGl2ZS5tZWRpYUZpbGVzJiZ0aGlzLmNyZWF0aXZlLm1lZGlhRmlsZXNbMF0mJnRoaXMuY3JlYXRpdmUubWVkaWFGaWxlc1swXS5maWxlVVJMJiYodC5BU1NFVFVSST10aGlzLmNyZWF0aXZlLm1lZGlhRmlsZXNbMF0uZmlsZVVSTCksdC5DT05URU5UUExBWUhFQUQ9dGhpcy5wcm9ncmVzc0Zvcm1hdHRlZCgpKSx1dGlsLnRyYWNrKGUsdCl9cHJvZ3Jlc3NGb3JtYXR0ZWQoKXtjb25zdCBlPXBhcnNlSW50KHRoaXMucHJvZ3Jlc3MpO2xldCB0PWUvMzYwMDt0Lmxlbmd0aDwyJiYodD1gMCR7dH1gKTtsZXQgcj1lLzYwJTYwO3IubGVuZ3RoPDImJihyPWAwJHtyfWApO2xldCBpPWUlNjA7cmV0dXJuIGkubGVuZ3RoPDImJihpPWAwJHtyfWApLGAke3R9OiR7cn06JHtpfS4ke3BhcnNlSW50KDEwMCoodGhpcy5wcm9ncmVzcy1lKSl9YH19ZXhwb3J0e1ZBU1RDbGllbnQsVkFTVFBhcnNlcixWQVNUVHJhY2tlcn07Il0sInNvdXJjZVJvb3QiOiIifQ==