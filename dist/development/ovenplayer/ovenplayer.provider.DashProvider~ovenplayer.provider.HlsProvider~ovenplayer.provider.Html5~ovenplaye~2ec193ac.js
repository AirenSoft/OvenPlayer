/*! OvenPlayerv0.9.61 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac"],{

/***/ "./src/js/api/provider/ads/Ads.js":
/*!****************************************!*\
  !*** ./src/js/api/provider/ads/Ads.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Listener = __webpack_require__(/*! api/provider/ads/Listener */ "./src/js/api/provider/ads/Listener.js");

var _Listener2 = _interopRequireDefault(_Listener);

var _likeA$ = __webpack_require__(/*! utils/likeA$.js */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hoho on 08/04/2019.
 */
var TEMP_VIDEO_URL = "data:video/mp4;base64, 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";

var Ads = function Ads(elVideo, provider, playerConfig, adTagUrl, errorCallback) {
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
    var OnAdError = null;
    var OnManagerLoaded = null;

    var adDisplayContainer = null;
    var adDisplayInitialized = false;
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
    OvenPlayerConsole.log("ADS : started ", "isMobile : ", isMobile, adTagUrl);

    try {
        ADS_MANAGER_LOADED = google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED;
        AD_ERROR = google.ima.AdErrorEvent.Type.AD_ERROR;
        google.ima.settings.setLocale("ko");
        google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);

        var createAdContainer = function createAdContainer() {
            var adContainer = document.createElement('div');
            adContainer.setAttribute('class', 'ovp-ads');
            adContainer.setAttribute('id', 'ovp-ads');
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

            OvenPlayerConsole.log("ADS : OnManagerLoaded ");
            var adsRenderingSettings = new google.ima.AdsRenderingSettings();
            adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
            //adsRenderingSettings.useStyledNonLinearAds = true;
            if (adsManager) {
                OvenPlayerConsole.log("ADS : destroy adsManager----");
                listener.destroy();
                listener = null;
                adsManager.destroy();
                adsManager = null;
            }
            adsManager = adsManagerLoadedEvent.getAdsManager(elVideo, adsRenderingSettings);

            listener = (0, _Listener2["default"])(adsManager, provider, spec, OnAdError);

            OvenPlayerConsole.log("ADS : created admanager and listner ");

            adsManagerLoaded = true;
        };

        adDisplayContainer = new google.ima.AdDisplayContainer(createAdContainer(), elVideo);
        adsLoader = new google.ima.AdsLoader(adDisplayContainer);

        /*let videos = document.getElementsByTagName("video");
        if(videos.length === 3){
            videos[2].parentElement.remove();
        }*/
        adsLoader.addEventListener(ADS_MANAGER_LOADED, OnManagerLoaded, false);
        adsLoader.addEventListener(AD_ERROR, OnAdError, false);

        OvenPlayerConsole.log("ADS : adDisplayContainer initialized");
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
                OvenPlayerConsole.log("ADS : setADWillAutoPlay ", "autoplayAllowed", autoplayAllowed, "autoplayRequiresMuted", autoplayRequiresMuted);

                adsRequest.setAdWillAutoPlay(autoplayAllowed);
                adsRequest.setAdWillPlayMuted(autoplayRequiresMuted);
                if (autoplayRequiresMuted) {
                    sendWarningMessageForMutedPlay();
                }
            }
        };

        var initRequest = function initRequest() {
            adsManagerLoaded = false;
            OvenPlayerConsole.log("ADS : initRequest() AutoPlay Support : ", "autoplayAllowed", autoplayAllowed, "autoplayRequiresMuted", autoplayRequiresMuted);
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
            OvenPlayerConsole.log("ADS : requestAds Complete");
            //two way what ad starts.
            //adsLoader.requestAds(adsRequest); or  adsManager.start();
            //what? why?? wth??
        };

        var checkAutoplaySupport = function checkAutoplaySupport() {
            OvenPlayerConsole.log("ADS : checkAutoplaySupport() ");

            var temporarySupportCheckVideo = document.createElement('video');
            temporarySupportCheckVideo.setAttribute('playsinline', 'true');
            temporarySupportCheckVideo.src = TEMP_VIDEO_URL;
            temporarySupportCheckVideo.load();

            //Dash has already loaded when triggered provider.play() always.
            if (isMobile && provider.getName() !== _constants.PROVIDER_DASH) {
                //Main video sets user gesture when temporarySupportCheckVideo triggered checking.
                elVideo.load();
            }
            /* The method that delivery the User Interaction between video elements on mobile.  My Guess. 2019-06-19
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
                    OvenPlayerConsole.log("ADS : !temporarySupportCheckVideo.play");
                    clearAndReport(true, false);
                    resolve();
                } else {
                    var playPromise = temporarySupportCheckVideo.play();
                    if (playPromise !== undefined) {
                        playPromise.then(function () {
                            OvenPlayerConsole.log("ADS : auto play allowed.");
                            // If we make it here, unmuted autoplay works.
                            clearAndReport(true, false);
                            resolve();
                        })["catch"](function (error) {
                            OvenPlayerConsole.log("ADS : auto play failed", error.message);
                            clearAndReport(false, false);
                            resolve();
                        });
                    } else {
                        OvenPlayerConsole.log("ADS : promise not support");
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
                            OvenPlayerConsole.log("ADS : ad start!");
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
                            OvenPlayerConsole.log("ADS : autoplayAllowed : false");
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

            var $ads = (0, _likeA$2["default"])(playerConfig.getContainer()).find(".ovp-ads");
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
};

exports["default"] = Ads;

/***/ }),

/***/ "./src/js/api/provider/ads/Listener.js":
/*!*********************************************!*\
  !*** ./src/js/api/provider/ads/Listener.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _likeA$ = __webpack_require__(/*! utils/likeA$.js */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hoho on 10/04/2019.
 */
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
    OvenPlayerConsole.log("ADS : Listener Created");
    lowLevelEvents[CONTENT_PAUSE_REQUESTED] = function (adEvent) {
        OvenPlayerConsole.log("ADS LISTENER : ", adEvent.type);

        //This callls when player is playing contents for ad.
        if (adsSpec.started) {
            adsSpec.active = true;
            provider.pause();
        }
    };

    lowLevelEvents[CONTENT_RESUME_REQUESTED] = function (adEvent) {
        OvenPlayerConsole.log("ADS LISTENER : ", adEvent.type);
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
        OvenPlayerConsole.log("ADS LISTENER : ", adEvent.type);

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
        OvenPlayerConsole.log("AdsEventListener : destroy()");
        //provider.trigger(STATE_AD_COMPLETE);
        Object.keys(lowLevelEvents).forEach(function (eventName) {
            adsManager.removeEventListener(eventName, lowLevelEvents[eventName]);
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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Fkcy9BZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9hZHMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci91dGlscy5qcyJdLCJuYW1lcyI6WyJURU1QX1ZJREVPX1VSTCIsIkFkcyIsImVsVmlkZW8iLCJwcm92aWRlciIsInBsYXllckNvbmZpZyIsImFkVGFnVXJsIiwiZXJyb3JDYWxsYmFjayIsIkFVVE9QTEFZX05PVF9BTExPV0VEIiwiQURNQU5HRVJfTE9BRElOR19FUlJPUiIsIkFEU19NQU5BR0VSX0xPQURFRCIsIkFEX0VSUk9SIiwidGhhdCIsImFkc01hbmFnZXJMb2FkZWQiLCJhZHNFcnJvck9jY3VycmVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJPbkFkRXJyb3IiLCJPbk1hbmFnZXJMb2FkZWQiLCJhZERpc3BsYXlDb250YWluZXIiLCJhZERpc3BsYXlJbml0aWFsaXplZCIsImFkc0xvYWRlciIsImFkc01hbmFnZXIiLCJsaXN0ZW5lciIsImFkc1JlcXVlc3QiLCJhdXRvcGxheUFsbG93ZWQiLCJhdXRvcGxheVJlcXVpcmVzTXV0ZWQiLCJicm93c2VyIiwiZ2V0QnJvd3NlciIsImlzTW9iaWxlIiwib3MiLCJhZERpc3BsYXlDb250YWluZXJJbml0aWFsaXplZCIsInNlbmRXYXJuaW5nTWVzc2FnZUZvck11dGVkUGxheSIsInRyaWdnZXIiLCJQTEFZRVJfV0FSTklORyIsIm1lc3NhZ2UiLCJXQVJOX01TR19NVVRFRFBMQVkiLCJ0aW1lciIsImljb25DbGFzcyIsIlVJX0lDT05TIiwidm9sdW1lX211dGUiLCJvbkNsaWNrQ2FsbGJhY2siLCJzZXRNdXRlIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJnb29nbGUiLCJpbWEiLCJBZHNNYW5hZ2VyTG9hZGVkRXZlbnQiLCJUeXBlIiwiQWRFcnJvckV2ZW50Iiwic2V0dGluZ3MiLCJzZXRMb2NhbGUiLCJzZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXMiLCJjcmVhdGVBZENvbnRhaW5lciIsImFkQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiZ2V0Q29udGFpbmVyIiwiYXBwZW5kIiwiYWRFcnJvckV2ZW50IiwiY29uc29sZSIsImdldEVycm9yIiwiZ2V0VmFzdEVycm9yQ29kZSIsImdldE1lc3NhZ2UiLCJpbm5lckVycm9yIiwiZ2V0SW5uZXJFcnJvciIsImdldEVycm9yQ29kZSIsIlNUQVRFX0FEX0VSUk9SIiwiY29kZSIsInBsYXkiLCJhZHNNYW5hZ2VyTG9hZGVkRXZlbnQiLCJhZHNSZW5kZXJpbmdTZXR0aW5ncyIsIkFkc1JlbmRlcmluZ1NldHRpbmdzIiwicmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSIsImRlc3Ryb3kiLCJnZXRBZHNNYW5hZ2VyIiwiQWREaXNwbGF5Q29udGFpbmVyIiwiQWRzTG9hZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uIiwiQ09OVEVOVF9WT0xVTUUiLCJkYXRhIiwibXV0ZSIsInNldFZvbHVtZSIsInZvbHVtZSIsInNldEF1dG9QbGF5VG9BZHNSZXF1ZXN0Iiwic2V0QWRXaWxsQXV0b1BsYXkiLCJzZXRBZFdpbGxQbGF5TXV0ZWQiLCJpbml0UmVxdWVzdCIsIkFkc1JlcXVlc3QiLCJmb3JjZU5vbkxpbmVhckZ1bGxTbG90IiwicmVxdWVzdEFkcyIsImNoZWNrQXV0b3BsYXlTdXBwb3J0IiwidGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8iLCJzcmMiLCJsb2FkIiwiZ2V0TmFtZSIsIlBST1ZJREVSX0RBU0giLCJjbGVhckFuZFJlcG9ydCIsIl9hdXRvcGxheUFsbG93ZWQiLCJfYXV0b3BsYXlSZXF1aXJlc011dGVkIiwicGF1c2UiLCJyZW1vdmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInBsYXlQcm9taXNlIiwidW5kZWZpbmVkIiwidGhlbiIsImVycm9yIiwiaXNBY3RpdmUiLCJyZXN1bWUiLCJpbml0aWFsaXplIiwicmV0cnlDb3VudCIsImNoZWNrQWRzTWFuYWdlcklzUmVhZHkiLCJpbml0IiwiVmlld01vZGUiLCJOT1JNQUwiLCJzdGFydCIsIkVycm9yIiwic2V0VGltZW91dCIsImlzQXV0b1N0YXJ0IiwidmlkZW9FbmRlZENhbGxiYWNrIiwiY29tcGxldGVDb250ZW50Q2FsbGJhY2siLCJpc0FsbEFkQ29tcGxldGUiLCJpc0xpbmVhckFkIiwiY29udGVudENvbXBsZXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIiRhZHMiLCJmaW5kIiwib2ZmIiwiTGlzdGVuZXIiLCJhZHNTcGVjIiwibG93TGV2ZWxFdmVudHMiLCJpbnRlcnZhbFRpbWVyIiwiQURfQlVGRkVSSU5HIiwiQWRFdmVudCIsIkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVEIiwiQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEIiwiQUxMX0FEU19DT01QTEVURUQiLCJDTElDSyIsIlNLSVBQRUQiLCJDT01QTEVURSIsIkZJUlNUX1FVQVJUSUxFIiwiTE9BREVEIiwiTUlEUE9JTlQiLCJQQVVTRUQiLCJSRVNVTUVEIiwiU1RBUlRFRCIsIlVTRVJfQ0xPU0UiLCJUSElSRF9RVUFSVElMRSIsImlzQWxsQWRDb21wZWxldGUiLCJhZENvbXBsZXRlQ2FsbGJhY2siLCJjdXJyZW50QWQiLCJhZEV2ZW50IiwidHlwZSIsImdldFBvc2l0aW9uIiwic2V0U3RhdGUiLCJTVEFURV9DT01QTEVURSIsIlBMQVlFUl9DTElDS0VEIiwiUExBWUVSX0FEX0NMSUNLIiwicmVtYWluaW5nVGltZSIsImdldFJlbWFpbmluZ1RpbWUiLCJhZCIsImdldEFkIiwiU1RBVEVfQURfTE9BREVEIiwicmVtYWluaW5nIiwiaXNMaW5lYXIiLCJTVEFURV9BRF9QQVVTRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiYWRPYmplY3QiLCJkdXJhdGlvbiIsImdldER1cmF0aW9uIiwic2tpcFRpbWVPZmZzZXQiLCJnZXRTa2lwVGltZU9mZnNldCIsIkFEX0NIQU5HRUQiLCJzZXRJbnRlcnZhbCIsIkFEX1RJTUUiLCJwb3NpdGlvbiIsInNraXBwYWJsZSIsImdldEFkU2tpcHBhYmxlU3RhdGUiLCJjbGVhckludGVydmFsIiwiU1RBVEVfQURfQ09NUExFVEUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImV2ZW50TmFtZSIsInNldEFkQ29tcGxldGVDYWxsYmFjayIsIl9hZENvbXBsZXRlQ2FsbGJhY2siLCJleHRyYWN0VmlkZW9FbGVtZW50IiwiZWxlbWVudE9yTXNlIiwiXyIsImlzRWxlbWVudCIsImdldFZpZGVvRWxlbWVudCIsIm1lZGlhIiwic2VwYXJhdGVMaXZlIiwibXNlIiwiaXNEeW5hbWljIiwiZXJyb3JUcmlnZ2VyIiwiU1RBVEVfRVJST1IiLCJFUlJPUiIsInBpY2tDdXJyZW50U291cmNlIiwic291cmNlcyIsImN1cnJlbnRTb3VyY2UiLCJzb3VyY2VJbmRleCIsIk1hdGgiLCJtYXgiLCJsYWJlbCIsImkiLCJsZW5ndGgiLCJnZXRTb3VyY2VJbmRleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFOQTs7O0FBbUJBLElBQU1BLGlCQUFpQixxNkpBQXZCOztBQUVBLElBQU1DLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxPQUFULEVBQWtCQyxRQUFsQixFQUE0QkMsWUFBNUIsRUFBMENDLFFBQTFDLEVBQW9EQyxhQUFwRCxFQUFrRTtBQUMxRTtBQUNBLFFBQU1DLHVCQUF1QixvQkFBN0I7QUFDQSxRQUFNQyx5QkFBeUIseUJBQS9CO0FBQ0EsUUFBSUMscUJBQXFCLEVBQXpCO0FBQ0EsUUFBSUMsV0FBVyxFQUFmOztBQUVBLFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLE9BQU87QUFDUEMsaUJBQVMsS0FERixF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QVVBLElBQU1DLHNDQUFlLFNBQWZBLFlBQWUsQ0FBU3pGLEtBQVQsRUFBZ0I1RyxRQUFoQixFQUF5QjtBQUNqRCxRQUFHQSxRQUFILEVBQVk7QUFDUkEsaUJBQVM0SixRQUFULENBQWtCMEMsc0JBQWxCO0FBQ0F0TSxpQkFBU29HLEtBQVQ7QUFDQXBHLGlCQUFTK0IsT0FBVCxDQUFpQndLLGdCQUFqQixFQUF3QjNGLEtBQXhCO0FBQ0g7QUFFSixDQVBNOztBQVNBLElBQU00RixnREFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxPQUFELEVBQVVDLGFBQVYsRUFBeUJ6TSxZQUF6QixFQUEwQztBQUN2RSxRQUFJME0sY0FBY0MsS0FBS0MsR0FBTCxDQUFTLENBQVQsRUFBWUgsYUFBWixDQUFsQjtBQUNBLFFBQU1JLFFBQU8sRUFBYjtBQUNBLFFBQUlMLE9BQUosRUFBYTtBQUNULGFBQUssSUFBSU0sSUFBSSxDQUFiLEVBQWdCQSxJQUFJTixRQUFRTyxNQUE1QixFQUFvQ0QsR0FBcEMsRUFBeUM7QUFDckMsZ0JBQUlOLFFBQVFNLENBQVIsWUFBSixFQUF3QjtBQUNwQkosOEJBQWNJLENBQWQ7QUFDSDtBQUNELGdCQUFJOU0sYUFBYWdOLGNBQWIsT0FBa0NGLENBQXRDLEVBQTBDO0FBQ3RDLHVCQUFPQSxDQUFQO0FBQ0g7QUFDRDs7O0FBR0g7QUFDSjtBQUNELFdBQU9KLFdBQVA7QUFDSCxDQWpCTSxDIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+MmVjMTkzYWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAwOC8wNC8yMDE5LlxuICovXG5pbXBvcnQgQWRzRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9hZHMvTGlzdGVuZXJcIjtcbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgRVJST1IsIEVSUk9SUyxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIElOSVRfQURTX0VSUk9SLFxuICAgIFNUQVRFX0FEX0VSUk9SLFxuICAgIFBMQVlFUl9XQVJOSU5HLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBXQVJOX01TR19NVVRFRFBMQVksXG4gICAgU1RBVEVfQURfTE9BRElORyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFVJX0lDT05TXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5jb25zdCBURU1QX1ZJREVPX1VSTCA9IFwiZGF0YTp2aWRlby9tcDQ7YmFzZTY0LCBBQUFBSEdaMGVYQk5ORllnQUFBQ0FHbHpiMjFwYzI4eVlYWmpNUUFBQUFobWNtVmxBQUFHRjIxa1lYVGVCQUFBYkdsaVptRmhZeUF4TGpJNEFBQkNBSk1nQkRJQVJ3QUFBckVHQmYvL3JkeEY2YjNtMlVpM2xpellJTmtqN3U5NE1qWTBJQzBnWTI5eVpTQXhORElnY2pJZ09UVTJZemhrT0NBdElFZ3VNalkwTDAxUVJVY3ROQ0JCVmtNZ1kyOWtaV01nTFNCRGIzQjViR1ZtZENBeU1EQXpMVEl3TVRRZ0xTQm9kSFJ3T2k4dmQzZDNMblpwWkdWdmJHRnVMbTl5Wnk5NE1qWTBMbWgwYld3Z0xTQnZjSFJwYjI1ek9pQmpZV0poWXowd0lISmxaajB6SUdSbFlteHZZMnM5TVRvd09qQWdZVzVoYkhselpUMHdlREU2TUhneE1URWdiV1U5YUdWNElITjFZbTFsUFRjZ2NITjVQVEVnY0hONVgzSmtQVEV1TURBNk1DNHdNQ0J0YVhobFpGOXlaV1k5TVNCdFpWOXlZVzVuWlQweE5pQmphSEp2YldGZmJXVTlNU0IwY21Wc2JHbHpQVEVnT0hnNFpHTjBQVEFnWTNGdFBUQWdaR1ZoWkhwdmJtVTlNakVzTVRFZ1ptRnpkRjl3YzJ0cGNEMHhJR05vY205dFlWOXhjRjl2Wm1aelpYUTlMVElnZEdoeVpXRmtjejAySUd4dmIydGhhR1ZoWkY5MGFISmxZV1J6UFRFZ2MyeHBZMlZrWDNSb2NtVmhaSE05TUNCdWNqMHdJR1JsWTJsdFlYUmxQVEVnYVc1MFpYSnNZV05sWkQwd0lHSnNkWEpoZVY5amIyMXdZWFE5TUNCamIyNXpkSEpoYVc1bFpGOXBiblJ5WVQwd0lHSm1jbUZ0WlhNOU1DQjNaV2xuYUhSd1BUQWdhMlY1YVc1MFBUSTFNQ0JyWlhscGJuUmZiV2x1UFRJMUlITmpaVzVsWTNWMFBUUXdJR2x1ZEhKaFgzSmxabkpsYzJnOU1DQnlZMTlzYjI5cllXaGxZV1E5TkRBZ2NtTTlZM0ptSUcxaWRISmxaVDB4SUdOeVpqMHlNeTR3SUhGamIyMXdQVEF1TmpBZ2NYQnRhVzQ5TUNCeGNHMWhlRDAyT1NCeGNITjBaWEE5TkNCMlluWmZiV0Y0Y21GMFpUMDNOamdnZG1KMlgySjFabk5wZW1VOU16QXdNQ0JqY21aZmJXRjRQVEF1TUNCdVlXeGZhSEprUFc1dmJtVWdabWxzYkdWeVBUQWdhWEJmY21GMGFXODlNUzQwTUNCaGNUMHhPakV1TURBQWdBQUFBRlpsaUlRTDhtS0FBS3ZNbkp5Y25KeWNuSnljblhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhpRUFTWkFDR1FBamdDRUFTWkFDR1FBamdBQUFBQWRCbWpnWDRHU0FJUUJKa0FJWkFDT0FBQUFBQjBHYVZBWDRHU0FoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFBR1FacGdMOERKSVFCSmtBSVpBQ09BSVFCSmtBSVpBQ09BQUFBQUJrR2FnQy9BeVNFQVNaQUNHUUFqZ0FBQUFBWkJtcUF2d01raEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBQUFBQUdRWnJBTDhESklRQkprQUlaQUNPQUFBQUFCa0dhNEMvQXlTRUFTWkFDR1FBamdDRUFTWkFDR1FBamdBQUFBQVpCbXdBdndNa2hBRW1RQWhrQUk0QUFBQUFHUVpzZ0w4REpJUUJKa0FJWkFDT0FJUUJKa0FJWkFDT0FBQUFBQmtHYlFDL0F5U0VBU1pBQ0dRQWpnQ0VBU1pBQ0dRQWpnQUFBQUFaQm0yQXZ3TWtoQUVtUUFoa0FJNEFBQUFBR1FadUFMOERKSVFCSmtBSVpBQ09BSVFCSmtBSVpBQ09BQUFBQUJrR2JvQy9BeVNFQVNaQUNHUUFqZ0FBQUFBWkJtOEF2d01raEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBQUFBQUdRWnZnTDhESklRQkprQUlaQUNPQUFBQUFCa0dhQUMvQXlTRUFTWkFDR1FBamdDRUFTWkFDR1FBamdBQUFBQVpCbWlBdndNa2hBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QUFBQUFHUVpwQUw4REpJUUJKa0FJWkFDT0FBQUFBQmtHYVlDL0F5U0VBU1pBQ0dRQWpnQ0VBU1pBQ0dRQWpnQUFBQUFaQm1vQXZ3TWtoQUVtUUFoa0FJNEFBQUFBR1FacWdMOERKSVFCSmtBSVpBQ09BSVFCSmtBSVpBQ09BQUFBQUJrR2F3Qy9BeVNFQVNaQUNHUUFqZ0FBQUFBWkJtdUF2d01raEFFbVFBaGtBSTRBaEFFbVFBaGtBSTRBQUFBQUdRWnNBTDhESklRQkprQUlaQUNPQUFBQUFCa0diSUMvQXlTRUFTWkFDR1FBamdDRUFTWkFDR1FBamdBQUFBQVpCbTBBdndNa2hBRW1RQWhrQUk0QWhBRW1RQWhrQUk0QUFBQUFHUVp0Z0w4REpJUUJKa0FJWkFDT0FBQUFBQmtHYmdDdkF5U0VBU1pBQ0dRQWpnQ0VBU1pBQ0dRQWpnQUFBQUFaQm02QW53TWtoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFoQUVtUUFoa0FJNEFBQUFodWJXOXZkZ0FBQUd4dGRtaGtBQUFBQUFBQUFBQUFBQUFBQUFBRDZBQUFCRGNBQVFBQUFRQUFBQUFBQUFBQUFBQUFBQUVBQUFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBd0FBQXpCMGNtRnJBQUFBWEhScmFHUUFBQUFEQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQStrQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFFQUFBQUFBQUFBQUFBQUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUxBQUFBQ1FBQUFBQUFBa1pXUjBjd0FBQUJ4bGJITjBBQUFBQUFBQUFBRUFBQVBwQUFBQUFBQUJBQUFBQUFLb2JXUnBZUUFBQUNCdFpHaGtBQUFBQUFBQUFBQUFBQUFBQUFCMU1BQUFkVTVWeEFBQUFBQUFMV2hrYkhJQUFBQUFBQUFBQUhacFpHVUFBQUFBQUFBQUFBQUFBQUJXYVdSbGIwaGhibVJzWlhJQUFBQUNVMjFwYm1ZQUFBQVVkbTFvWkFBQUFBRUFBQUFBQUFBQUFBQUFBQ1JrYVc1bUFBQUFIR1J5WldZQUFBQUFBQUFBQVFBQUFBeDFjbXdnQUFBQUFRQUFBaE56ZEdKc0FBQUFyM04wYzJRQUFBQUFBQUFBQVFBQUFKOWhkbU14QUFBQUFBQUFBQUVBQUFBQUFBQUFBQUFBQUFBQUFBQUFBTEFBa0FCSUFBQUFTQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUdQLy9BQUFBTFdGMlkwTUJRc0FOLytFQUZXZEN3QTNaQXNUc0JFQUFBUHBBQURxWUE4VUtrZ0VBQldqTGc4c2dBQUFBSEhWMWFXUnJhRUR5WHlSUHhibzVwUnZQQXlQekFBQUFBQUFBQUJoemRIUnpBQUFBQUFBQUFBRUFBQUFlQUFBRDZRQUFBQlJ6ZEhOekFBQUFBQUFBQUFFQUFBQUJBQUFBSEhOMGMyTUFBQUFBQUFBQUFRQUFBQUVBQUFBQkFBQUFBUUFBQUl4emRITjZBQUFBQUFBQUFBQUFBQUFlQUFBRER3QUFBQXNBQUFBTEFBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFDZ0FBQUFvQUFBQUtBQUFBQ2dBQUFBb0FBQUFLQUFBQUNnQUFBQW9BQUFBS0FBQUFpSE4wWTI4QUFBQUFBQUFBSGdBQUFFWUFBQU5uQUFBRGV3QUFBNWdBQUFPMEFBQUR4d0FBQStNQUFBUDJBQUFFRWdBQUJDVUFBQVJCQUFBRVhRQUFCSEFBQUFTTUFBQUVud0FBQkxzQUFBVE9BQUFFNmdBQUJRWUFBQVVaQUFBRk5RQUFCVWdBQUFWa0FBQUZkd0FBQlpNQUFBV21BQUFGd2dBQUJkNEFBQVh4QUFBR0RRQUFCR2gwY21GckFBQUFYSFJyYUdRQUFBQURBQUFBQUFBQUFBQUFBQUFDQUFBQUFBQUFCRGNBQUFBQUFBQUFBQUFBQUFFQkFBQUFBQUVBQUFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFBQUFBQUFrWldSMGN3QUFBQnhsYkhOMEFBQUFBQUFBQUFFQUFBUWtBQUFEY0FBQkFBQUFBQVBnYldScFlRQUFBQ0J0Wkdoa0FBQUFBQUFBQUFBQUFBQUFBQUM3Z0FBQXlrQlZ4QUFBQUFBQUxXaGtiSElBQUFBQUFBQUFBSE52ZFc0QUFBQUFBQUFBQUFBQUFBQlRiM1Z1WkVoaGJtUnNaWElBQUFBRGkyMXBibVlBQUFBUWMyMW9aQUFBQUFBQUFBQUFBQUFBSkdScGJtWUFBQUFjWkhKbFpnQUFBQUFBQUFBQkFBQUFESFZ5YkNBQUFBQUJBQUFEVDNOMFltd0FBQUJuYzNSelpBQUFBQUFBQUFBQkFBQUFWMjF3TkdFQUFBQUFBQUFBQVFBQUFBQUFBQUFBQUFJQUVBQUFBQUM3Z0FBQUFBQUFNMlZ6WkhNQUFBQUFBNENBZ0NJQUFnQUVnSUNBRkVBVkJiallBQXU0QUFBQURjb0ZnSUNBQWhHUUJvQ0FnQUVDQUFBQUlITjBkSE1BQUFBQUFBQUFBZ0FBQURJQUFBUUFBQUFBQVFBQUFrQUFBQUZVYzNSell3QUFBQUFBQUFBYkFBQUFBUUFBQUFFQUFBQUJBQUFBQWdBQUFBSUFBQUFCQUFBQUF3QUFBQUVBQUFBQkFBQUFCQUFBQUFJQUFBQUJBQUFBQmdBQUFBRUFBQUFCQUFBQUJ3QUFBQUlBQUFBQkFBQUFDQUFBQUFFQUFBQUJBQUFBQ1FBQUFBSUFBQUFCQUFBQUNnQUFBQUVBQUFBQkFBQUFDd0FBQUFJQUFBQUJBQUFBRFFBQUFBRUFBQUFCQUFBQURnQUFBQUlBQUFBQkFBQUFEd0FBQUFFQUFBQUJBQUFBRUFBQUFBSUFBQUFCQUFBQUVRQUFBQUVBQUFBQkFBQUFFZ0FBQUFJQUFBQUJBQUFBRkFBQUFBRUFBQUFCQUFBQUZRQUFBQUlBQUFBQkFBQUFGZ0FBQUFFQUFBQUJBQUFBRndBQUFBSUFBQUFCQUFBQUdBQUFBQUVBQUFBQkFBQUFHUUFBQUFJQUFBQUJBQUFBR2dBQUFBRUFBQUFCQUFBQUd3QUFBQUlBQUFBQkFBQUFIUUFBQUFFQUFBQUJBQUFBSGdBQUFBSUFBQUFCQUFBQUh3QUFBQVFBQUFBQkFBQUE0SE4wYzNvQUFBQUFBQUFBQUFBQUFETUFBQUFhQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQUpBQUFBQ1FBQUFBa0FBQUFKQUFBQUNRQUFBQWtBQUFBSkFBQUFDUUFBQUFrQUFBQ01jM1JqYndBQUFBQUFBQUFmQUFBQUxBQUFBMVVBQUFOeUFBQURoZ0FBQTZJQUFBTytBQUFEMFFBQUErMEFBQVFBQUFBRUhBQUFCQzhBQUFSTEFBQUVad0FBQkhvQUFBU1dBQUFFcVFBQUJNVUFBQVRZQUFBRTlBQUFCUkFBQUFVakFBQUZQd0FBQlZJQUFBVnVBQUFGZ1FBQUJaMEFBQVd3QUFBRnpBQUFCZWdBQUFYN0FBQUdGd0FBQUdKMVpIUmhBQUFBV20xbGRHRUFBQUFBQUFBQUlXaGtiSElBQUFBQUFBQUFBRzFrYVhKaGNIQnNBQUFBQUFBQUFBQUFBQUFBTFdsc2MzUUFBQUFscVhSdmJ3QUFBQjFrWVhSaEFBQUFBUUFBQUFCTVlYWm1OVFV1TXpNdU1UQXdcIjtcblxuY29uc3QgQWRzID0gZnVuY3Rpb24oZWxWaWRlbywgcHJvdmlkZXIsIHBsYXllckNvbmZpZywgYWRUYWdVcmwsIGVycm9yQ2FsbGJhY2spe1xuICAgIC8vVG9kbyA6IG1vdmUgY3JlYXRlQWRDb250YWluZXIgdG8gTWVkaWFNYW5hZ2VyXG4gICAgY29uc3QgQVVUT1BMQVlfTk9UX0FMTE9XRUQgPSBcImF1dG9wbGF5Tm90QWxsb3dlZFwiO1xuICAgIGNvbnN0IEFETUFOR0VSX0xPQURJTkdfRVJST1IgPSBcImFkbWFuYWdlckxvYWRpbmdUaW1lb3V0XCI7XG4gICAgbGV0IEFEU19NQU5BR0VSX0xPQURFRCA9IFwiXCI7XG4gICAgbGV0IEFEX0VSUk9SID0gXCJcIjtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGFkc01hbmFnZXJMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgYWRzRXJyb3JPY2N1cnJlZCA9IGZhbHNlO1xuICAgIGxldCBzcGVjID0ge1xuICAgICAgICBzdGFydGVkOiBmYWxzZSwgLy9wbGF5ZXIgc3RhcnRlZFxuICAgICAgICBhY3RpdmUgOiBmYWxzZSwgLy9vbiBBZFxuICAgICAgICBpc1ZpZGVvRW5kZWQgOiBmYWxzZVxuICAgIH07XG4gICAgbGV0IE9uQWRFcnJvciA9IG51bGw7XG4gICAgbGV0IE9uTWFuYWdlckxvYWRlZCA9IG51bGw7XG5cbiAgICBsZXQgYWREaXNwbGF5Q29udGFpbmVyID0gbnVsbDtcbiAgICBsZXQgYWREaXNwbGF5SW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICBsZXQgYWRzTG9hZGVyID0gbnVsbDtcbiAgICBsZXQgYWRzTWFuYWdlciA9IG51bGw7XG4gICAgbGV0IGxpc3RlbmVyID0gbnVsbDtcbiAgICBsZXQgYWRzUmVxdWVzdCA9IG51bGw7XG4gICAgbGV0IGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlLCBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICBsZXQgYnJvd3NlciA9IHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCk7XG4gICAgbGV0IGlzTW9iaWxlID0gYnJvd3Nlci5vcyA9PT0gXCJBbmRyb2lkXCIgfHwgYnJvd3Nlci5vcyA9PT0gXCJpT1NcIjtcblxuICAgIGxldCBhZERpc3BsYXlDb250YWluZXJJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgLy8gZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRBdXRvUGxheUFkQnJlYWtzKGZhbHNlKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuXG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldExvY2FsZSgna28nKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXModHJ1ZSk7XG4gICAgY29uc3Qgc2VuZFdhcm5pbmdNZXNzYWdlRm9yTXV0ZWRQbGF5ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZRVJfV0FSTklORywge1xuICAgICAgICAgICAgbWVzc2FnZSA6IFdBUk5fTVNHX01VVEVEUExBWSxcbiAgICAgICAgICAgIHRpbWVyIDogMTAgKiAxMDAwLFxuICAgICAgICAgICAgaWNvbkNsYXNzIDogVUlfSUNPTlMudm9sdW1lX211dGUsXG4gICAgICAgICAgICBvbkNsaWNrQ2FsbGJhY2sgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldE11dGUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IHN0YXJ0ZWQgXCIsIFwiaXNNb2JpbGUgOiBcIiwgaXNNb2JpbGUsIGFkVGFnVXJsKTtcblxuICAgIHRyeXtcbiAgICAgICAgQURTX01BTkFHRVJfTE9BREVEID0gZ29vZ2xlLmltYS5BZHNNYW5hZ2VyTG9hZGVkRXZlbnQuVHlwZS5BRFNfTUFOQUdFUl9MT0FERUQ7XG4gICAgICAgIEFEX0VSUk9SID0gZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUjtcbiAgICAgICAgZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUoXCJrb1wiKTtcbiAgICAgICAgZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXModHJ1ZSk7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3ZwLWFkcycpO1xuICAgICAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdvdnAtYWRzJyk7XG4gICAgICAgICAgICBwbGF5ZXJDb25maWcuZ2V0Q29udGFpbmVyKCkuYXBwZW5kKGFkQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFkQ29udGFpbmVyO1xuICAgICAgICB9O1xuICAgICAgICBPbkFkRXJyb3IgPSBmdW5jdGlvbihhZEVycm9yRXZlbnQpe1xuICAgICAgICAgICAgLy9ub3RlIDogYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpLmdldEVycm9yQ29kZSgpID09PSAxMjA1ICYgYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpID09PSA0MDAgaXMgQnJvd3NlciBVc2VyIEludGVyYWN0aXZlIGVycm9yLlxuXG4gICAgICAgICAgICAvL0RvIG5vdCB0cmlnZ2VyaW5nIEVSUk9SLiBiZWN1YXNlIEl0IGp1c3QgQUQhXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSwgYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0TWVzc2FnZSgpKTtcbiAgICAgICAgICAgIGFkc0Vycm9yT2NjdXJyZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGlubmVyRXJyb3IgPSBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRJbm5lckVycm9yKCk7XG4gICAgICAgICAgICBpZihpbm5lckVycm9yKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbm5lckVycm9yLmdldEVycm9yQ29kZSgpLCBpbm5lckVycm9yLmdldE1lc3NhZ2UoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKmlmIChhZHNNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgYWRzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfRVJST1IsIHtjb2RlIDogYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpICwgbWVzc2FnZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldE1lc3NhZ2UoKX0pO1xuICAgICAgICAgICAgc3BlYy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHNwZWMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG5cbiAgICAgICAgICAgIC8qaWYoaW5uZXJFcnJvciAmJiBpbm5lckVycm9yLmdldEVycm9yQ29kZSgpID09PSAxMjA1KXtcbiAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgIH0qL1xuXG5cbiAgICAgICAgfTtcbiAgICAgICAgT25NYW5hZ2VyTG9hZGVkID0gZnVuY3Rpb24oYWRzTWFuYWdlckxvYWRlZEV2ZW50KXtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogT25NYW5hZ2VyTG9hZGVkIFwiKTtcbiAgICAgICAgICAgIGxldCBhZHNSZW5kZXJpbmdTZXR0aW5ncyA9IG5ldyBnb29nbGUuaW1hLkFkc1JlbmRlcmluZ1NldHRpbmdzKCk7XG4gICAgICAgICAgICBhZHNSZW5kZXJpbmdTZXR0aW5ncy5yZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vYWRzUmVuZGVyaW5nU2V0dGluZ3MudXNlU3R5bGVkTm9uTGluZWFyQWRzID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmKGFkc01hbmFnZXIpe1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IGRlc3Ryb3kgYWRzTWFuYWdlci0tLS1cIik7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkc01hbmFnZXIgPSBhZHNNYW5hZ2VyTG9hZGVkRXZlbnQuZ2V0QWRzTWFuYWdlcihlbFZpZGVvLCBhZHNSZW5kZXJpbmdTZXR0aW5ncyk7XG5cbiAgICAgICAgICAgIGxpc3RlbmVyID0gQWRzRXZlbnRzTGlzdGVuZXIoYWRzTWFuYWdlciwgcHJvdmlkZXIsIHNwZWMsIE9uQWRFcnJvcik7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IGNyZWF0ZWQgYWRtYW5hZ2VyIGFuZCBsaXN0bmVyIFwiKTtcblxuICAgICAgICAgICAgYWRzTWFuYWdlckxvYWRlZCA9IHRydWU7XG4gICAgICAgIH07XG5cblxuICAgICAgICBhZERpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIoY3JlYXRlQWRDb250YWluZXIoKSwgZWxWaWRlbyk7XG4gICAgICAgIGFkc0xvYWRlciA9IG5ldyBnb29nbGUuaW1hLkFkc0xvYWRlcihhZERpc3BsYXlDb250YWluZXIpO1xuXG4gICAgICAgIC8qbGV0IHZpZGVvcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidmlkZW9cIik7XG4gICAgICAgIGlmKHZpZGVvcy5sZW5ndGggPT09IDMpe1xuICAgICAgICAgICAgdmlkZW9zWzJdLnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH0qL1xuICAgICAgICBhZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBRFNfTUFOQUdFUl9MT0FERUQsIE9uTWFuYWdlckxvYWRlZCwgZmFsc2UpO1xuICAgICAgICBhZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBRF9FUlJPUiwgT25BZEVycm9yLCBmYWxzZSk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogYWREaXNwbGF5Q29udGFpbmVyIGluaXRpYWxpemVkXCIpO1xuICAgICAgICBwcm92aWRlci5vbihDT05URU5UX1ZPTFVNRSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYoYWRzTWFuYWdlcil7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5tdXRlKXtcbiAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zZXRWb2x1bWUoMCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc2V0Vm9sdW1lKGRhdGEudm9sdW1lLzEwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGF0KTtcblxuICAgICAgICBjb25zdCBzZXRBdXRvUGxheVRvQWRzUmVxdWVzdCA9IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgaWYoYWRzUmVxdWVzdCl7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogc2V0QURXaWxsQXV0b1BsYXkgXCIsIFwiYXV0b3BsYXlBbGxvd2VkXCIsYXV0b3BsYXlBbGxvd2VkLCBcImF1dG9wbGF5UmVxdWlyZXNNdXRlZFwiLGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XG5cbiAgICAgICAgICAgICAgICBhZHNSZXF1ZXN0LnNldEFkV2lsbEF1dG9QbGF5KGF1dG9wbGF5QWxsb3dlZCk7XG4gICAgICAgICAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxQbGF5TXV0ZWQoYXV0b3BsYXlSZXF1aXJlc011dGVkKTtcbiAgICAgICAgICAgICAgICBpZihhdXRvcGxheVJlcXVpcmVzTXV0ZWQpe1xuICAgICAgICAgICAgICAgICAgICBzZW5kV2FybmluZ01lc3NhZ2VGb3JNdXRlZFBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgaW5pdFJlcXVlc3QgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgYWRzTWFuYWdlckxvYWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogaW5pdFJlcXVlc3QoKSBBdXRvUGxheSBTdXBwb3J0IDogXCIsIFwiYXV0b3BsYXlBbGxvd2VkXCIsYXV0b3BsYXlBbGxvd2VkLCBcImF1dG9wbGF5UmVxdWlyZXNNdXRlZFwiLGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XG4gICAgICAgICAgICAvKmlmKGFkc1JlcXVlc3Qpe1xuICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIGFkc1JlcXVlc3QgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgIGFkc1JlcXVlc3QuZm9yY2VOb25MaW5lYXJGdWxsU2xvdCA9IGZhbHNlO1xuICAgICAgICAgICAgLyppZihwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLmJyb3dzZXIgPT09IFwiU2FmYXJpXCIgJiYgcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyA9PT0gXCJpT1NcIiApe1xuICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICBzZXRBdXRvUGxheVRvQWRzUmVxdWVzdCgpO1xuICAgICAgICAgICAgYWRzUmVxdWVzdC5hZFRhZ1VybCA9IGFkVGFnVXJsO1xuXG4gICAgICAgICAgICBhZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IHJlcXVlc3RBZHMgQ29tcGxldGVcIik7XG4gICAgICAgICAgICAvL3R3byB3YXkgd2hhdCBhZCBzdGFydHMuXG4gICAgICAgICAgICAvL2Fkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpOyBvciAgYWRzTWFuYWdlci5zdGFydCgpO1xuICAgICAgICAgICAgLy93aGF0PyB3aHk/PyB3dGg/P1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgY29uc3QgY2hlY2tBdXRvcGxheVN1cHBvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRFMgOiBjaGVja0F1dG9wbGF5U3VwcG9ydCgpIFwiKTtcblxuICAgICAgICAgICAgbGV0IHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgICAgIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpO1xuICAgICAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8uc3JjID0gVEVNUF9WSURFT19VUkw7XG4gICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5sb2FkKCk7XG5cbiAgICAgICAgICAgIC8vRGFzaCBoYXMgYWxyZWFkeSBsb2FkZWQgd2hlbiB0cmlnZ2VyZWQgcHJvdmlkZXIucGxheSgpIGFsd2F5cy5cbiAgICAgICAgICAgIGlmKGlzTW9iaWxlICYmIHByb3ZpZGVyLmdldE5hbWUoKSAhPT0gUFJPVklERVJfREFTSCApe1xuICAgICAgICAgICAgICAgIC8vTWFpbiB2aWRlbyBzZXRzIHVzZXIgZ2VzdHVyZSB3aGVuIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvIHRyaWdnZXJlZCBjaGVja2luZy5cbiAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIFRoZSBtZXRob2QgdGhhdCBkZWxpdmVyeSB0aGUgVXNlciBJbnRlcmFjdGlvbiBiZXR3ZWVuIHZpZGVvIGVsZW1lbnRzIG9uIG1vYmlsZS4gIE15IEd1ZXNzLiAyMDE5LTA2LTE5XG4gICAgICAgICAgICAqICAgKHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvJ3MgVXNlciBJbnRlcmFjdGlvbiBkZWxpdmVyeSB0byBlbFZpZGVvLilcbiAgICAgICAgICAgICogICBNb2JpbGUgQ2hyb21lIFdlYlZpZXcgOlxuICAgICAgICAgICAgKiAgIFlvdSBoYXZlIHRvIHJ1biBlbFZpZGVvLmxvYWQoKSB3aGVuIHRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvIGlzc3VlcyB3aXRoaW4gNSBzZWNvbmRzIG9mIHVzZXIgaW50ZXJhY3Rpb24uXG4gICAgICAgICAgICAqXG4gICAgICAgICAgICAqICAgTW9iaWxlIGlvcyBzYWZhcmkgOlxuICAgICAgICAgICAgKiAgIFlvdSBoYXZlIHRvIHJ1biBlbFZpZGVvLmxvYWQoKSBiZWZvcmUgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8gcnVuIHBsYXkoKS5cbiAgICAgICAgICAgICogKi9cblxuICAgICAgICAgICAgY29uc3QgY2xlYXJBbmRSZXBvcnQgPSBmdW5jdGlvbihfYXV0b3BsYXlBbGxvd2VkLCBfYXV0b3BsYXlSZXF1aXJlc011dGVkKXtcbiAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBfYXV0b3BsYXlBbGxvd2VkO1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IF9hdXRvcGxheVJlcXVpcmVzTXV0ZWQ7XG4gICAgICAgICAgICAgICAgdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgIHNldEF1dG9QbGF5VG9BZHNSZXF1ZXN0KCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgICAgICAgICBpZighdGVtcG9yYXJ5U3VwcG9ydENoZWNrVmlkZW8ucGxheSl7XG4gICAgICAgICAgICAgICAgICAgIC8vSSBjYW4ndCByZW1lbWJlciB0aGlzIGNhc2UuLi5cbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogIXRlbXBvcmFyeVN1cHBvcnRDaGVja1ZpZGVvLnBsYXlcIik7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheVByb21pc2UgPSB0ZW1wb3JhcnlTdXBwb3J0Q2hlY2tWaWRlby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5UHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogYXV0byBwbGF5IGFsbG93ZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIG1ha2UgaXQgaGVyZSwgdW5tdXRlZCBhdXRvcGxheSB3b3Jrcy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydCh0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogYXV0byBwbGF5IGZhaWxlZFwiLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFuZFJlcG9ydChmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IHByb21pc2Ugbm90IHN1cHBvcnRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL01heWJlIHRoaXMgaXMgSUUxMS4uLi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQW5kUmVwb3J0KHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhhdC5pc0FjdGl2ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmFjdGl2ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5zdGFydGVkID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMuc3RhcnRlZDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYoc3BlYy5zdGFydGVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnJlc3VtZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja0Fkc01hbmFnZXJJc1JlYWR5ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhZHNNYW5hZ2VyTG9hZGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRFMgOiBhZCBzdGFydCFcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5pbml0KFwiMTAwJVwiLCBcIjEwMCVcIiwgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYWRzRXJyb3JPY2N1cnJlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoQURNQU5HRVJfTE9BRElOR19FUlJPUikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMTUwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKEFETUFOR0VSX0xPQURJTkdfRVJST1IpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpICYmICFhdXRvcGxheUFsbG93ZWQpICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogYXV0b3BsYXlBbGxvd2VkIDogZmFsc2VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihBVVRPUExBWV9OT1RfQUxMT1dFRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0Fkc01hbmFnZXJJc1JlYWR5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGFkc01hbmFnZXIucGF1c2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC52aWRlb0VuZGVkQ2FsbGJhY2sgPSAoY29tcGxldGVDb250ZW50Q2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIC8vbGlzdGVuZXIuaXNMaW5lYXJBZCA6IGdldCBjdXJyZW50IGFkJ3Mgc3RhdHVzIHdoZXRoZXIgbGluZWFyIGFkIG9yIG5vdC5cbiAgICAgICAgICAgIGlmKGxpc3RlbmVyICYmIChsaXN0ZW5lci5pc0FsbEFkQ29tcGxldGUoKSB8fCAhbGlzdGVuZXIuaXNMaW5lYXJBZCgpKSl7XG4gICAgICAgICAgICAgICAgY29tcGxldGVDb250ZW50Q2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1lbHNlIGlmKGFkc0Vycm9yT2NjdXJyZWQpe1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlQ29udGVudENhbGxiYWNrKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL0lmIHlvdSBuZWVkIHBsYXkgdGhlIHBvc3Qtcm9sbCwgeW91IGhhdmUgdG8gY2FsbCB0byBhZHNMb2FkZXIgd2hlbiBjb250ZW50cyB3YXMgY29tcGxldGVkLlxuICAgICAgICAgICAgICAgIHNwZWMuaXNWaWRlb0VuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIuY29udGVudENvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xuXG4gICAgICAgICAgICBpZihhZHNMb2FkZXIpe1xuICAgICAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEU19NQU5BR0VSX0xPQURFRCwgT25NYW5hZ2VyTG9hZGVkKTtcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBRF9FUlJPUiwgT25BZEVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoYWRzTWFuYWdlcil7XG4gICAgICAgICAgICAgICAgYWRzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGFkRGlzcGxheUNvbnRhaW5lcil7XG4gICAgICAgICAgICAgICAgYWREaXNwbGF5Q29udGFpbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYobGlzdGVuZXIpe1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0ICRhZHMgPSBMQSQocGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpKS5maW5kKFwiLm92cC1hZHNcIik7XG4gICAgICAgICAgICBpZigkYWRzKXtcbiAgICAgICAgICAgICAgICAkYWRzLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcm92aWRlci5vZmYoQ09OVEVOVF9WT0xVTUUsIG51bGwsIHRoYXQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH1jYXRjaCAoZXJyb3Ipe1xuICAgICAgICAvL2xldCB0ZW1wRXJyb3IgPSBFUlJPUlNbSU5JVF9BRFNfRVJST1JdO1xuICAgICAgICAvL3RlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAvL2Vycm9yQ2FsbGJhY2sodGVtcEVycm9yKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQWRzO1xuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAxMC8wNC8yMDE5LlxuICovXG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcbmltcG9ydCB7XG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9BRF9MT0FERUQsXG4gICAgU1RBVEVfQURfUExBWUlORyxcbiAgICBTVEFURV9BRF9QQVVTRUQsXG4gICAgU1RBVEVfQURfQ09NUExFVEUsXG4gICAgQURfQ0hBTkdFRCxcbiAgICBBRF9USU1FLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBQTEFZRVJfQ0xJQ0tFRCxcbiAgICBQTEFZRVJfQURfQ0xJQ0ssXG4gICAgUFJPVklERVJfSFRNTDUsXG4gICAgUFJPVklERVJfV0VCUlRDLFxuICAgIFBST1ZJREVSX0RBU0gsXG4gICAgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oYWRzTWFuYWdlciwgcHJvdmlkZXIsIGFkc1NwZWMsIE9uQWRFcnJvcil7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgbG93TGV2ZWxFdmVudHMgPSB7fTtcblxuICAgIGxldCBpbnRlcnZhbFRpbWVyID0gbnVsbDtcblxuICAgIGNvbnN0IEFEX0JVRkZFUklORyA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFEX0JVRkZFUklORztcbiAgICBjb25zdCBDT05URU5UX1BBVVNFX1JFUVVFU1RFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVEO1xuICAgIGNvbnN0IENPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRDtcbiAgICBjb25zdCBBRF9FUlJPUiA9IGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1I7XG4gICAgY29uc3QgQUxMX0FEU19DT01QTEVURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BTExfQURTX0NPTVBMRVRFRDtcbiAgICBjb25zdCBDTElDSyA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNMSUNLO1xuICAgIGNvbnN0IFNLSVBQRUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TS0lQUEVEO1xuICAgIGNvbnN0IENPTVBMRVRFID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09NUExFVEU7XG4gICAgY29uc3QgRklSU1RfUVVBUlRJTEU9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkZJUlNUX1FVQVJUSUxFO1xuICAgIGNvbnN0IExPQURFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkxPQURFRDtcbiAgICBjb25zdCBNSURQT0lOVD0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTUlEUE9JTlQ7XG4gICAgY29uc3QgUEFVU0VEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUEFVU0VEO1xuICAgIGNvbnN0IFJFU1VNRUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5SRVNVTUVEO1xuICAgIGNvbnN0IFNUQVJURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TVEFSVEVEO1xuICAgIGNvbnN0IFVTRVJfQ0xPU0UgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5VU0VSX0NMT1NFO1xuICAgIGNvbnN0IFRISVJEX1FVQVJUSUxFID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuVEhJUkRfUVVBUlRJTEU7XG5cbiAgICBsZXQgaXNBbGxBZENvbXBlbGV0ZSA9IGZhbHNlOyAgIC8vUG9zdCByb2xs7J2EIOychO2VtFxuICAgIGxldCBhZENvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xuICAgIGxldCBjdXJyZW50QWQgPSBudWxsO1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IExpc3RlbmVyIENyZWF0ZWRcIik7XG4gICAgIGxvd0xldmVsRXZlbnRzW0NPTlRFTlRfUEFVU0VfUkVRVUVTVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRFMgTElTVEVORVIgOiBcIiwgYWRFdmVudC50eXBlKTtcblxuICAgICAgICAgLy9UaGlzIGNhbGxscyB3aGVuIHBsYXllciBpcyBwbGF5aW5nIGNvbnRlbnRzIGZvciBhZC5cbiAgICAgICAgIGlmKGFkc1NwZWMuc3RhcnRlZCl7XG4gICAgICAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG4gICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyBMSVNURU5FUiA6IFwiLCBhZEV2ZW50LnR5cGUpO1xuICAgICAgICAvL1RoaXMgY2FsbHMgd2hlbiBvbmUgYWQgZW5kZWQuXG4gICAgICAgIC8vQW5kIHRoaXMgaXMgc2lnbmFsIHdoYXQgcGxheSB0aGUgY29udGVudHMuXG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkICYmIChwcm92aWRlci5nZXRQb3NpdGlvbigpID09PSAwIHx8ICFhZHNTcGVjLmlzVmlkZW9FbmRlZCkgICl7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQURfRVJST1JdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgaXNBbGxBZENvbXBlbGV0ZSA9IHRydWU7XG4gICAgICAgIE9uQWRFcnJvcihhZEV2ZW50KTtcbiAgICB9IDtcblxuICAgIGxvd0xldmVsRXZlbnRzW0FMTF9BRFNfQ09NUExFVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyBMSVNURU5FUiA6IFwiLCBhZEV2ZW50LnR5cGUpO1xuXG4gICAgICAgIGlzQWxsQWRDb21wZWxldGUgPSB0cnVlO1xuICAgICAgICBpZihhZHNTcGVjLmlzVmlkZW9FbmRlZCl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0NMSUNLXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFBMQVlFUl9DTElDS0VELCB7dHlwZSA6IFBMQVlFUl9BRF9DTElDS30pO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbRklSU1RfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICAvL1xuICAgIGxvd0xldmVsRXZlbnRzW0FEX0JVRkZFUklOR10gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRF9CVUZGRVJJTkdcIixhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbTE9BREVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIC8qdmFyIG1ldGFkYXRhID0ge1xuICAgICAgICAgICAgZHVyYXRpb246IHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICB0eXBlIDpcImFkXCJcbiAgICAgICAgfTsqL1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0xPQURFRCwge3JlbWFpbmluZyA6IHJlbWFpbmluZ1RpbWUsIGlzTGluZWFyIDogYWQuaXNMaW5lYXIoKSB9KTtcblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbTUlEUE9JTlRdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tQQVVTRURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BBVVNFRCk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tSRVNVTUVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QTEFZSU5HKTtcbiAgICB9O1xuXG5cbiAgICBsb3dMZXZlbEV2ZW50c1tTVEFSVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGN1cnJlbnRBZCA9IGFkO1xuXG4gICAgICAgIGxldCBhZE9iamVjdCA9IHtcbiAgICAgICAgICAgIGlzTGluZWFyIDogYWQuaXNMaW5lYXIoKSAsXG4gICAgICAgICAgICBkdXJhdGlvbiA6IGFkLmdldER1cmF0aW9uKCksXG4gICAgICAgICAgICBza2lwVGltZU9mZnNldCA6IGFkLmdldFNraXBUaW1lT2Zmc2V0KCkgICAgIC8vVGhlIG51bWJlciBvZiBzZWNvbmRzIG9mIHBsYXliYWNrIGJlZm9yZSB0aGUgYWQgYmVjb21lcyBza2lwcGFibGUuXG4gICAgICAgIH07XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfQ0hBTkdFRCwgYWRPYmplY3QpO1xuXG5cbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcblxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgICAgICAgICBhZHNTcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgLy8gRm9yIGEgbGluZWFyIGFkLCBhIHRpbWVyIGNhbiBiZSBzdGFydGVkIHRvIHBvbGwgZm9yXG4gICAgICAgICAgICAvLyB0aGUgcmVtYWluaW5nIHRpbWUuXG4gICAgICAgICAgICBpbnRlcnZhbFRpbWVyID0gc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1haW5pbmdUaW1lID0gYWRzTWFuYWdlci5nZXRSZW1haW5pbmdUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGFkLmdldER1cmF0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9USU1FLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiA6IGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcFRpbWVPZmZzZXQgOiBhZC5nZXRTa2lwVGltZU9mZnNldCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nIDogcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogZHVyYXRpb24gLSByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcHBhYmxlIDogYWRzTWFuYWdlci5nZXRBZFNraXBwYWJsZVN0YXRlKClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAzMDApOyAvLyBldmVyeSAzMDBtc1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQ09NUExFVEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICAvL1VzZXIgc2tpcHBlZCBhZC4gc2FtZSBwcm9jZXNzIG9uIGNvbXBsZXRlLlxuICAgIGxvd0xldmVsRXZlbnRzW1NLSVBQRURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG5cbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW1VTRVJfQ0xPU0VdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tUSElSRF9RVUFSVElMRV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuXG5cbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgfSk7XG4gICAgdGhhdC5zZXRBZENvbXBsZXRlQ2FsbGJhY2sgPSAoX2FkQ29tcGxldGVDYWxsYmFjaykgPT4ge1xuICAgICAgICBhZENvbXBsZXRlQ2FsbGJhY2sgPSBfYWRDb21wbGV0ZUNhbGxiYWNrO1xuICAgIH07XG4gICAgdGhhdC5pc0FsbEFkQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBpc0FsbEFkQ29tcGVsZXRlO1xuICAgIH07XG4gICAgdGhhdC5pc0xpbmVhckFkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gY3VycmVudEFkICA/IGN1cnJlbnRBZC5pc0xpbmVhcigpIDogdHJ1ZTtcbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBZHNFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xuICAgICAgICAvL3Byb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxMi4uXG4gKi9cbmltcG9ydCB7RVJST1IsIFNUQVRFX0VSUk9SfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RWaWRlb0VsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50T3JNc2UpIHtcbiAgICBpZihfLmlzRWxlbWVudChlbGVtZW50T3JNc2UpKXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZTtcbiAgICB9XG4gICAgaWYoZWxlbWVudE9yTXNlLmdldFZpZGVvRWxlbWVudCl7XG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KCk7XG4gICAgfWVsc2UgaWYoZWxlbWVudE9yTXNlLm1lZGlhKXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5tZWRpYTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VwYXJhdGVMaXZlID0gZnVuY3Rpb24obXNlKSB7XG4gICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXG5cbiAgICBpZihtc2UgJiYgbXNlLmlzRHluYW1pYyl7XG4gICAgICAgIHJldHVybiBtc2UuaXNEeW5hbWljKCk7XG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXJyb3JUcmlnZ2VyID0gZnVuY3Rpb24oZXJyb3IsIHByb3ZpZGVyKXtcbiAgICBpZihwcm92aWRlcil7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IgKTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCBjb25zdCBwaWNrQ3VycmVudFNvdXJjZSA9IChzb3VyY2VzLCBjdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpID0+IHtcbiAgICBsZXQgc291cmNlSW5kZXggPSBNYXRoLm1heCgwLCBjdXJyZW50U291cmNlKTtcbiAgICBjb25zdCBsYWJlbCA9XCJcIjtcbiAgICBpZiAoc291cmNlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VJbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkgPT09IGkgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKmlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2VJbmRleDtcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==