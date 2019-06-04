/*! OvenPlayerv0.9.5954 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
var Ads = function Ads(elVideo, provider, playerConfig, adTagUrl, errorCallback) {
    //Todo : move createAdContainer to MediaManager
    var AUTOPLAY_NOT_ALLOWED = "autoplayNotAllowed";
    var ADMANGER_LOADING_ERROR = "admanagerLoadingTimeout";
    var ADS_MANAGER_LOADED = "";
    var AD_ERROR = "";

    var that = {};
    var adsManagerLoaded = false;
    var spec = {
        started: false, //player started
        active: false, //on Ad
        isVideoEnded: false,
        checkAutoplayStart: true
    };
    var OnAdError = null;
    var OnManagerLoaded = null;

    var adDisplayContainer = null;
    var adsLoader = null;
    var adsManager = null;
    var listener = null;
    var adsRequest = null;
    var autoplayAllowed = false,
        autoplayRequiresMuted = false;

    // google.ima.settings.setAutoPlayAdBreaks(false);
    //google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);

    //google.ima.settings.setLocale('ko');
    //google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
    //google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);


    try {
        var initRequest = function initRequest() {

            OvenPlayerConsole.log("AutoPlay Support : ", "autoplayAllowed", autoplayAllowed, "autoplayRequiresMuted", autoplayRequiresMuted);

            adsRequest = new google.ima.AdsRequest();

            adsRequest.forceNonLinearFullSlot = false;
            /*if(playerConfig.getBrowser().browser === "Safari" && playerConfig.getBrowser().os === "iOS" ){
             autoplayAllowed = false;
             autoplayRequiresMuted = false;
             }*/

            adsRequest.setAdWillAutoPlay(autoplayAllowed);
            adsRequest.setAdWillPlayMuted(autoplayRequiresMuted);
            adsRequest.adTagUrl = adTagUrl;

            adsLoader.requestAds(adsRequest);

            //two way what ad starts.
            //adsLoader.requestAds(adsRequest); or  adsManager.start();
            //what? why?? wth??
        };

        var checkAutoplaySupport = function checkAutoplaySupport() {
            if (!elVideo.play) {
                autoplayAllowed = true;
                autoplayRequiresMuted = false;
                spec.checkAutoplayStart = false;
                initRequest();
                return false;
            }

            var playPromise = elVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(function () {
                    // If we make it here, unmuted autoplay works.
                    elVideo.pause();

                    autoplayAllowed = true;
                    autoplayRequiresMuted = false;
                    spec.checkAutoplayStart = false;
                    initRequest();
                })["catch"](function () {
                    if (playerConfig.getBrowser().browser === "Safari" || playerConfig.getBrowser().os === "iOS" || playerConfig.getBrowser().os === "Android") {
                        /*
                         //check muted auto start.
                         //I don't need for this version.
                         */
                        elVideo.muted = true;
                        var playPromise = elVideo.play();
                        if (playPromise !== undefined) {
                            playPromise.then(function () {
                                // If we make it here, muted autoplay works but unmuted autoplay does not.
                                elVideo.pause();
                                autoplayAllowed = true;
                                autoplayRequiresMuted = true;
                                spec.checkAutoplayStart = false;
                                initRequest();
                            })["catch"](function () {
                                // Both muted and unmuted autoplay failed. Fall back to click to play.
                                elVideo.muted = false;
                                autoplayAllowed = false;
                                autoplayRequiresMuted = false;
                                spec.checkAutoplayStart = false;
                                initRequest();
                            });
                        }
                    } else {
                        elVideo.pause();
                        autoplayAllowed = false;
                        autoplayRequiresMuted = false;
                        spec.checkAutoplayStart = false;
                        initRequest();
                    }
                });
            } else {
                //Maybe this is IE11....
                elVideo.pause();
                autoplayAllowed = true;
                autoplayRequiresMuted = false;
                spec.checkAutoplayStart = false;
                initRequest();
            }
        };

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

            var innerError = adErrorEvent.getError().getInnerError();
            if (innerError) {
                console.log(innerError.getErrorCode(), innerError.getMessage());
            }
            if (adsManager) {
                adsManager.destroy();
            }
            spec.active = false;
            spec.started = true;
            provider.play();

            /*if(innerError && innerError.getErrorCode() === 1205){
             }else{
              }*/
        };
        OnManagerLoaded = function OnManagerLoaded(adsManagerLoadedEvent) {
            var adsRenderingSettings = new google.ima.AdsRenderingSettings();
            adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
            //adsRenderingSettings.useStyledNonLinearAds = true;
            adsManager = adsManagerLoadedEvent.getAdsManager(elVideo, adsRenderingSettings);

            listener = (0, _Listener2["default"])(adsManager, provider, spec, OnAdError);

            provider.on(_constants.CONTENT_VOLUME, function (data) {
                if (data.mute) {
                    adsManager.setVolume(0);
                } else {
                    adsManager.setVolume(data.volume / 100);
                }
            }, that);

            adsManagerLoaded = true;
        };

        adDisplayContainer = new google.ima.AdDisplayContainer(createAdContainer(), elVideo);
        adsLoader = new google.ima.AdsLoader(adDisplayContainer);

        adsLoader.addEventListener(ADS_MANAGER_LOADED, OnManagerLoaded, false);
        adsLoader.addEventListener(AD_ERROR, OnAdError, false);

        checkAutoplaySupport();

        that.isActive = function () {
            return spec.active;
        };
        that.started = function () {
            return spec.started;
        };
        that.play = function () {
            //provider.setState(STATE_LOADING);

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
                var retryCount = 0;
                return new Promise(function (resolve, reject) {
                    (function checkAdsManagerIsReady() {
                        retryCount++;
                        if (adsManagerLoaded) {
                            if (playerConfig.isAutoStart() && !autoplayAllowed) {
                                autoplayAllowed = true;
                                spec.started = false;
                                reject(new Error(AUTOPLAY_NOT_ALLOWED));
                            } else {
                                //I think do not nessessary this code anymore. Because muted play solves everything. 2019-06-04
                                /*if(playerConfig.getBrowser().os  === "iOS" || playerConfig.getBrowser().os  === "Android"){
                                 //Don't playing video when player complete playing AD.
                                 //Only iOS Safari First loaded.
                                    elVideo.load();
                                }*/

                                adDisplayContainer.initialize();
                                adsManager.init("100%", "100%", google.ima.ViewMode.NORMAL);
                                adsManager.start();
                                spec.started = true;
                                resolve();
                            }
                        } else {
                            if (retryCount < 300) {
                                setTimeout(checkAdsManagerIsReady, 100);
                            } else {
                                reject(new Error(ADMANGER_LOADING_ERROR));
                            }
                        }
                    })();
                });
            }
        };
        that.pause = function () {
            adsManager.pause();
        };
        that.videoEndedCallback = function (completeContentCallback) {
            //listener.isLinearAd : get current ad's status whether linear ad or not.
            if (listener.isAllAdComplete() || !listener.isLinearAd()) {
                completeContentCallback();
            } else {
                //Post - Roll 을 재생하기 위해서는 콘텐츠가 끝났음을 adsLoader에게 알려야 한다
                spec.isVideoEnded = true;
                adsLoader.contentComplete();
            }
        };
        that.isAutoPlaySupportCheckTime = function () {
            return spec.checkAutoplayStart;
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
        console.log();
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

    lowLevelEvents[CONTENT_PAUSE_REQUESTED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        //This callls when player is playing contents for ad.
        if (adsSpec.started) {
            adsSpec.active = true;
            provider.pause();
        }
    };

    lowLevelEvents[CONTENT_RESUME_REQUESTED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        //This calls when one ad ended.
        //And this is signal what play the contents.
        adsSpec.active = false;

        if (adsSpec.started && (provider.getPosition() === 0 || !adsSpec.isVideoEnded)) {
            provider.play();
        }
    };
    lowLevelEvents[AD_ERROR] = OnAdError;

    lowLevelEvents[ALL_ADS_COMPLETED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        isAllAdCompelete = true;
        if (adsSpec.isVideoEnded) {
            provider.setState(_constants.STATE_COMPLETE);
        }
    };
    lowLevelEvents[CLICK] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
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
        provider.trigger(_constants.STATE_AD_COMPLETE);
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
            if (playerConfig.getSourceLabel() && sources[i].label === playerConfig.getSourceLabel()) {
                return i;
            }
        }
    }
    return sourceIndex;
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Fkcy9BZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9hZHMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci91dGlscy5qcyJdLCJuYW1lcyI6WyJBZHMiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsImVycm9yQ2FsbGJhY2siLCJBVVRPUExBWV9OT1RfQUxMT1dFRCIsIkFETUFOR0VSX0xPQURJTkdfRVJST1IiLCJBRFNfTUFOQUdFUl9MT0FERUQiLCJBRF9FUlJPUiIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJjaGVja0F1dG9wbGF5U3RhcnQiLCJPbkFkRXJyb3IiLCJPbk1hbmFnZXJMb2FkZWQiLCJhZERpc3BsYXlDb250YWluZXIiLCJhZHNMb2FkZXIiLCJhZHNNYW5hZ2VyIiwibGlzdGVuZXIiLCJhZHNSZXF1ZXN0IiwiYXV0b3BsYXlBbGxvd2VkIiwiYXV0b3BsYXlSZXF1aXJlc011dGVkIiwiaW5pdFJlcXVlc3QiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImdvb2dsZSIsImltYSIsIkFkc1JlcXVlc3QiLCJmb3JjZU5vbkxpbmVhckZ1bGxTbG90Iiwic2V0QWRXaWxsQXV0b1BsYXkiLCJzZXRBZFdpbGxQbGF5TXV0ZWQiLCJyZXF1ZXN0QWRzIiwiY2hlY2tBdXRvcGxheVN1cHBvcnQiLCJwbGF5IiwicGxheVByb21pc2UiLCJ1bmRlZmluZWQiLCJ0aGVuIiwicGF1c2UiLCJnZXRCcm93c2VyIiwiYnJvd3NlciIsIm9zIiwibXV0ZWQiLCJBZHNNYW5hZ2VyTG9hZGVkRXZlbnQiLCJUeXBlIiwiQWRFcnJvckV2ZW50Iiwic2V0dGluZ3MiLCJzZXRMb2NhbGUiLCJzZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXMiLCJjcmVhdGVBZENvbnRhaW5lciIsImFkQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiZ2V0Q29udGFpbmVyIiwiYXBwZW5kIiwiYWRFcnJvckV2ZW50IiwiY29uc29sZSIsImdldEVycm9yIiwiZ2V0VmFzdEVycm9yQ29kZSIsImdldE1lc3NhZ2UiLCJpbm5lckVycm9yIiwiZ2V0SW5uZXJFcnJvciIsImdldEVycm9yQ29kZSIsImRlc3Ryb3kiLCJhZHNNYW5hZ2VyTG9hZGVkRXZlbnQiLCJhZHNSZW5kZXJpbmdTZXR0aW5ncyIsIkFkc1JlbmRlcmluZ1NldHRpbmdzIiwicmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSIsImdldEFkc01hbmFnZXIiLCJvbiIsIkNPTlRFTlRfVk9MVU1FIiwiZGF0YSIsIm11dGUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJBZERpc3BsYXlDb250YWluZXIiLCJBZHNMb2FkZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiaXNBY3RpdmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3VtZSIsImVycm9yIiwicmV0cnlDb3VudCIsImNoZWNrQWRzTWFuYWdlcklzUmVhZHkiLCJpc0F1dG9TdGFydCIsIkVycm9yIiwiaW5pdGlhbGl6ZSIsImluaXQiLCJWaWV3TW9kZSIsIk5PUk1BTCIsInN0YXJ0Iiwic2V0VGltZW91dCIsInZpZGVvRW5kZWRDYWxsYmFjayIsImNvbXBsZXRlQ29udGVudENhbGxiYWNrIiwiaXNBbGxBZENvbXBsZXRlIiwiaXNMaW5lYXJBZCIsImNvbnRlbnRDb21wbGV0ZSIsImlzQXV0b1BsYXlTdXBwb3J0Q2hlY2tUaW1lIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIiRhZHMiLCJmaW5kIiwicmVtb3ZlIiwib2ZmIiwiTGlzdGVuZXIiLCJhZHNTcGVjIiwibG93TGV2ZWxFdmVudHMiLCJpbnRlcnZhbFRpbWVyIiwiQURfQlVGRkVSSU5HIiwiQWRFdmVudCIsIkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVEIiwiQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEIiwiQUxMX0FEU19DT01QTEVURUQiLCJDTElDSyIsIlNLSVBQRUQiLCJDT01QTEVURSIsIkZJUlNUX1FVQVJUSUxFIiwiTE9BREVEIiwiTUlEUE9JTlQiLCJQQVVTRUQiLCJSRVNVTUVEIiwiU1RBUlRFRCIsIlVTRVJfQ0xPU0UiLCJUSElSRF9RVUFSVElMRSIsImlzQWxsQWRDb21wZWxldGUiLCJhZENvbXBsZXRlQ2FsbGJhY2siLCJjdXJyZW50QWQiLCJhZEV2ZW50IiwidHlwZSIsImdldFBvc2l0aW9uIiwic2V0U3RhdGUiLCJTVEFURV9DT01QTEVURSIsInJlbWFpbmluZ1RpbWUiLCJnZXRSZW1haW5pbmdUaW1lIiwiYWQiLCJnZXRBZCIsInRyaWdnZXIiLCJTVEFURV9BRF9MT0FERUQiLCJyZW1haW5pbmciLCJpc0xpbmVhciIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX1BMQVlJTkciLCJhZE9iamVjdCIsImR1cmF0aW9uIiwiZ2V0RHVyYXRpb24iLCJza2lwVGltZU9mZnNldCIsImdldFNraXBUaW1lT2Zmc2V0IiwiQURfQ0hBTkdFRCIsInNldEludGVydmFsIiwiQURfVElNRSIsInBvc2l0aW9uIiwic2tpcHBhYmxlIiwiZ2V0QWRTa2lwcGFibGVTdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJTVEFURV9BRF9DT01QTEVURSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwic2V0QWRDb21wbGV0ZUNhbGxiYWNrIiwiX2FkQ29tcGxldGVDYWxsYmFjayIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJlbGVtZW50T3JNc2UiLCJfIiwiaXNFbGVtZW50IiwiZ2V0VmlkZW9FbGVtZW50IiwibWVkaWEiLCJzZXBhcmF0ZUxpdmUiLCJtc2UiLCJpc0R5bmFtaWMiLCJlcnJvclRyaWdnZXIiLCJTVEFURV9FUlJPUiIsIkVSUk9SIiwicGlja0N1cnJlbnRTb3VyY2UiLCJzb3VyY2VzIiwiY3VycmVudFNvdXJjZSIsInNvdXJjZUluZGV4IiwiTWF0aCIsIm1heCIsImxhYmVsIiwiaSIsImxlbmd0aCIsImdldFNvdXJjZUxhYmVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQU5BOzs7QUFVQSxJQUFNQSxNQUFNLFNBQU5BLEdBQU0sQ0FBU0MsT0FBVCxFQUFrQkMsUUFBbEIsRUFBNEJDLFlBQTVCLEVBQTBDQyxRQUExQyxFQUFvREMsYUFBcEQsRUFBa0U7QUFDMUU7QUFDQSxRQUFNQyx1QkFBdUIsb0JBQTdCO0FBQ0EsUUFBTUMseUJBQXlCLHlCQUEvQjtBQUNBLFFBQUlDLHFCQUFxQixFQUF6QjtBQUNBLFFBQUlDLFdBQVcsRUFBZjs7QUFFQSxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxtQkFBbUIsS0FBdkI7QUFDQSxRQUFJQyxPQUFPO0FBQ1BDLGlCQUFTLEtBREYsRUFDUztBQUNoQkMsZ0JBQVMsS0FGRixFQUVTO0FBQ2hCQyxzQkFBZSxLQUhSO0FBSVBDLDRCQUFxQjtBQUpkLEtBQVg7QUFNQSxRQUFJQyxZQUFZLElBQWhCO0FBQ0EsUUFBSUMsa0JBQWtCLElBQXRCOztBQUVBLFFBQUlDLHFCQUFxQixJQUF6QjtBQUNBLFFBQUlDLFlBQVksSUFBaEI7QUFDQSxRQUFJQyxhQUFhLElBQWpCO0FBQ0EsUUFBSUMsV0FBVyxJQUFmO0FBQ0EsUUFBSUMsYUFBYSxJQUFqQjtBQUNBLFFBQUlDLGtCQUFrQixLQUF0QjtBQUFBLFFBQTZCQyx3QkFBd0IsS0FBckQ7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBLFFBQUc7QUFBQSxZQXdFVUMsV0F4RVYsR0F3RUMsU0FBU0EsV0FBVCxHQUFzQjs7QUFFbEJDLDhCQUFrQkMsR0FBbEIsQ0FBc0IscUJBQXRCLEVBQTZDLGlCQUE3QyxFQUErREosZUFBL0QsRUFBZ0YsdUJBQWhGLEVBQXdHQyxxQkFBeEc7O0FBRUFGLHlCQUFhLElBQUlNLE9B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QyxzQ0FBZSxTQUFmQSxZQUFlLENBQVN4RixLQUFULEVBQWdCckYsUUFBaEIsRUFBeUI7QUFDakQsUUFBR0EsUUFBSCxFQUFZO0FBQ1JBLGlCQUFTcUksUUFBVCxDQUFrQnlDLHNCQUFsQjtBQUNBOUssaUJBQVN1QyxLQUFUO0FBQ0F2QyxpQkFBUzJJLE9BQVQsQ0FBaUJvQyxnQkFBakIsRUFBd0IxRixLQUF4QjtBQUNIO0FBRUosQ0FQTTs7QUFTQSxJQUFNMkYsZ0RBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsT0FBRCxFQUFVQyxhQUFWLEVBQXlCakwsWUFBekIsRUFBMEM7QUFDdkUsUUFBSWtMLGNBQWNDLEtBQUtDLEdBQUwsQ0FBUyxDQUFULEVBQVlILGFBQVosQ0FBbEI7QUFDQSxRQUFNSSxRQUFPLEVBQWI7QUFDQSxRQUFJTCxPQUFKLEVBQWE7QUFDVCxhQUFLLElBQUlNLElBQUksQ0FBYixFQUFnQkEsSUFBSU4sUUFBUU8sTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLGdCQUFJTixRQUFRTSxDQUFSLFlBQUosRUFBd0I7QUFDcEJKLDhCQUFjSSxDQUFkO0FBQ0g7QUFDRCxnQkFBSXRMLGFBQWF3TCxjQUFiLE1BQWlDUixRQUFRTSxDQUFSLEVBQVdELEtBQVgsS0FBcUJyTCxhQUFhd0wsY0FBYixFQUExRCxFQUEwRjtBQUN0Rix1QkFBT0YsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU9KLFdBQVA7QUFDSCxDQWRNLEMiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX4yZWMxOTNhYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDA4LzA0LzIwMTkuXG4gKi9cbmltcG9ydCBBZHNFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2Fkcy9MaXN0ZW5lclwiO1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUiwgRVJST1JTLCBDT05URU5UX1ZPTFVNRSwgU1RBVEVfTE9BRElORywgSU5JVF9BRFNfRVJST1Jcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgQWRzID0gZnVuY3Rpb24oZWxWaWRlbywgcHJvdmlkZXIsIHBsYXllckNvbmZpZywgYWRUYWdVcmwsIGVycm9yQ2FsbGJhY2spe1xuICAgIC8vVG9kbyA6IG1vdmUgY3JlYXRlQWRDb250YWluZXIgdG8gTWVkaWFNYW5hZ2VyXG4gICAgY29uc3QgQVVUT1BMQVlfTk9UX0FMTE9XRUQgPSBcImF1dG9wbGF5Tm90QWxsb3dlZFwiO1xuICAgIGNvbnN0IEFETUFOR0VSX0xPQURJTkdfRVJST1IgPSBcImFkbWFuYWdlckxvYWRpbmdUaW1lb3V0XCI7XG4gICAgbGV0IEFEU19NQU5BR0VSX0xPQURFRCA9IFwiXCI7XG4gICAgbGV0IEFEX0VSUk9SID0gXCJcIjtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGFkc01hbmFnZXJMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgc3RhcnRlZDogZmFsc2UsIC8vcGxheWVyIHN0YXJ0ZWRcbiAgICAgICAgYWN0aXZlIDogZmFsc2UsIC8vb24gQWRcbiAgICAgICAgaXNWaWRlb0VuZGVkIDogZmFsc2UsXG4gICAgICAgIGNoZWNrQXV0b3BsYXlTdGFydCA6IHRydWVcbiAgICB9O1xuICAgIGxldCBPbkFkRXJyb3IgPSBudWxsO1xuICAgIGxldCBPbk1hbmFnZXJMb2FkZWQgPSBudWxsO1xuXG4gICAgbGV0IGFkRGlzcGxheUNvbnRhaW5lciA9IG51bGw7XG4gICAgbGV0IGFkc0xvYWRlciA9IG51bGw7XG4gICAgbGV0IGFkc01hbmFnZXIgPSBudWxsO1xuICAgIGxldCBsaXN0ZW5lciA9IG51bGw7XG4gICAgbGV0IGFkc1JlcXVlc3QgPSBudWxsO1xuICAgIGxldCBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZSwgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG5cblxuICAgIC8vIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0QXV0b1BsYXlBZEJyZWFrcyhmYWxzZSk7XG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldFZwYWlkTW9kZShnb29nbGUuaW1hLkltYVNka1NldHRpbmdzLlZwYWlkTW9kZS5FTkFCTEVEKTtcblxuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUoJ2tvJyk7XG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldFZwYWlkTW9kZShnb29nbGUuaW1hLkltYVNka1NldHRpbmdzLlZwYWlkTW9kZS5FTkFCTEVEKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xuXG5cbiAgICB0cnl7XG4gICAgICAgIEFEU19NQU5BR0VSX0xPQURFRCA9IGdvb2dsZS5pbWEuQWRzTWFuYWdlckxvYWRlZEV2ZW50LlR5cGUuQURTX01BTkFHRVJfTE9BREVEO1xuICAgICAgICBBRF9FUlJPUiA9IGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1I7XG4gICAgICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0TG9jYWxlKFwia29cIik7XG4gICAgICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xuXG5cblxuXG4gICAgICAgIGNvbnN0IGNyZWF0ZUFkQ29udGFpbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ292cC1hZHMnKTtcbiAgICAgICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnb3ZwLWFkcycpO1xuICAgICAgICAgICAgcGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpLmFwcGVuZChhZENvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcbiAgICAgICAgfTtcbiAgICAgICAgT25BZEVycm9yID0gZnVuY3Rpb24oYWRFcnJvckV2ZW50KXtcbiAgICAgICAgICAgIC8vbm90ZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldElubmVyRXJyb3IoKS5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSAmIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSA9PT0gNDAwIGlzIEJyb3dzZXIgVXNlciBJbnRlcmFjdGl2ZSBlcnJvci5cblxuICAgICAgICAgICAgLy9EbyBub3QgdHJpZ2dlcmluZyBFUlJPUi4gYmVjdWFzZSBJdCBqdXN0IEFEIVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRWYXN0RXJyb3JDb2RlKCksIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldE1lc3NhZ2UoKSk7XG5cbiAgICAgICAgICAgIGxldCBpbm5lckVycm9yID0gYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpO1xuICAgICAgICAgICAgaWYoaW5uZXJFcnJvcil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5uZXJFcnJvci5nZXRFcnJvckNvZGUoKSwgaW5uZXJFcnJvci5nZXRNZXNzYWdlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFkc01hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwZWMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuXG4gICAgICAgICAgICAvKmlmKGlubmVyRXJyb3IgJiYgaW5uZXJFcnJvci5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSl7XG4gICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICB9Ki9cblxuXG4gICAgICAgIH07XG4gICAgICAgIE9uTWFuYWdlckxvYWRlZCA9IGZ1bmN0aW9uKGFkc01hbmFnZXJMb2FkZWRFdmVudCl7XG4gICAgICAgICAgICBsZXQgYWRzUmVuZGVyaW5nU2V0dGluZ3MgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZW5kZXJpbmdTZXR0aW5ncygpO1xuICAgICAgICAgICAgYWRzUmVuZGVyaW5nU2V0dGluZ3MucmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICAvL2Fkc1JlbmRlcmluZ1NldHRpbmdzLnVzZVN0eWxlZE5vbkxpbmVhckFkcyA9IHRydWU7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyID0gYWRzTWFuYWdlckxvYWRlZEV2ZW50LmdldEFkc01hbmFnZXIoZWxWaWRlbywgYWRzUmVuZGVyaW5nU2V0dGluZ3MpO1xuXG5cbiAgICAgICAgICAgIGxpc3RlbmVyID0gQWRzRXZlbnRzTGlzdGVuZXIoYWRzTWFuYWdlciwgcHJvdmlkZXIsIHNwZWMsIE9uQWRFcnJvcik7XG5cbiAgICAgICAgICAgIHByb3ZpZGVyLm9uKENPTlRFTlRfVk9MVU1FLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5tdXRlKXtcbiAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zZXRWb2x1bWUoMCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc2V0Vm9sdW1lKGRhdGEudm9sdW1lLzEwMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCB0aGF0KTtcblxuICAgICAgICAgICAgYWRzTWFuYWdlckxvYWRlZCA9IHRydWU7XG5cbiAgICAgICAgfTtcblxuXG4gICAgICAgIGFkRGlzcGxheUNvbnRhaW5lciA9IG5ldyBnb29nbGUuaW1hLkFkRGlzcGxheUNvbnRhaW5lcihjcmVhdGVBZENvbnRhaW5lcigpLCBlbFZpZGVvKTtcbiAgICAgICAgYWRzTG9hZGVyID0gbmV3IGdvb2dsZS5pbWEuQWRzTG9hZGVyKGFkRGlzcGxheUNvbnRhaW5lcik7XG5cbiAgICAgICAgYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQURTX01BTkFHRVJfTE9BREVELCBPbk1hbmFnZXJMb2FkZWQsIGZhbHNlKTtcbiAgICAgICAgYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQURfRVJST1IsIE9uQWRFcnJvciwgZmFsc2UpO1xuXG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdFJlcXVlc3QoKXtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQXV0b1BsYXkgU3VwcG9ydCA6IFwiLCBcImF1dG9wbGF5QWxsb3dlZFwiLGF1dG9wbGF5QWxsb3dlZCwgXCJhdXRvcGxheVJlcXVpcmVzTXV0ZWRcIixhdXRvcGxheVJlcXVpcmVzTXV0ZWQpO1xuXG4gICAgICAgICAgICBhZHNSZXF1ZXN0ID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVxdWVzdCgpO1xuXG4gICAgICAgICAgICBhZHNSZXF1ZXN0LmZvcmNlTm9uTGluZWFyRnVsbFNsb3QgPSBmYWxzZTtcbiAgICAgICAgICAgIC8qaWYocGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5icm93c2VyID09PSBcIlNhZmFyaVwiICYmIHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgPT09IFwiaU9TXCIgKXtcbiAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxBdXRvUGxheShhdXRvcGxheUFsbG93ZWQpO1xuICAgICAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxQbGF5TXV0ZWQoYXV0b3BsYXlSZXF1aXJlc011dGVkKTtcbiAgICAgICAgICAgIGFkc1JlcXVlc3QuYWRUYWdVcmwgPSBhZFRhZ1VybDtcblxuICAgICAgICAgICAgYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7XG5cbiAgICAgICAgICAgIC8vdHdvIHdheSB3aGF0IGFkIHN0YXJ0cy5cbiAgICAgICAgICAgIC8vYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7IG9yICBhZHNNYW5hZ2VyLnN0YXJ0KCk7XG4gICAgICAgICAgICAvL3doYXQ/IHdoeT8/IHd0aD8/XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjaGVja0F1dG9wbGF5U3VwcG9ydCgpIHtcbiAgICAgICAgICAgIGlmKCFlbFZpZGVvLnBsYXkpe1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBsYXlQcm9taXNlID0gZWxWaWRlby5wbGF5KCk7XG4gICAgICAgICAgICBpZiAocGxheVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHBsYXlQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCB1bm11dGVkIGF1dG9wbGF5IHdvcmtzLlxuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMuY2hlY2tBdXRvcGxheVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLmJyb3dzZXIgID09PSBcIlNhZmFyaVwiIHx8IHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgID09PSBcImlPU1wiIHx8IHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgID09PSBcIkFuZHJvaWRcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgbXV0ZWQgYXV0byBzdGFydC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAvL0kgZG9uJ3QgbmVlZCBmb3IgdGhpcyB2ZXJzaW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwbGF5UHJvbWlzZSA9IGVsVmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXlQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5UHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCBtdXRlZCBhdXRvcGxheSB3b3JrcyBidXQgdW5tdXRlZCBhdXRvcGxheSBkb2VzIG5vdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLmNoZWNrQXV0b3BsYXlTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBtdXRlZCBhbmQgdW5tdXRlZCBhdXRvcGxheSBmYWlsZWQuIEZhbGwgYmFjayB0byBjbGljayB0byBwbGF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vTWF5YmUgdGhpcyBpcyBJRTExLi4uLlxuICAgICAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNwZWMuY2hlY2tBdXRvcGxheVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGVja0F1dG9wbGF5U3VwcG9ydCgpO1xuXG4gICAgICAgIHRoYXQuaXNBY3RpdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5hY3RpdmU7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuc3RhcnRlZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnN0YXJ0ZWQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQucGxheSA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG5cbiAgICAgICAgICAgIGlmKHNwZWMuc3RhcnRlZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5yZXN1bWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrQWRzTWFuYWdlcklzUmVhZHkoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhZHNNYW5hZ2VyTG9hZGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkgJiYgIWF1dG9wbGF5QWxsb3dlZCkgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoQVVUT1BMQVlfTk9UX0FMTE9XRUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JIHRoaW5rIGRvIG5vdCBuZXNzZXNzYXJ5IHRoaXMgY29kZSBhbnltb3JlLiBCZWNhdXNlIG11dGVkIHBsYXkgc29sdmVzIGV2ZXJ5dGhpbmcuIDIwMTktMDYtMDRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyppZihwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zICA9PT0gXCJpT1NcIiB8fCBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zICA9PT0gXCJBbmRyb2lkXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Eb24ndCBwbGF5aW5nIHZpZGVvIHdoZW4gcGxheWVyIGNvbXBsZXRlIHBsYXlpbmcgQUQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL09ubHkgaU9TIFNhZmFyaSBGaXJzdCBsb2FkZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWREaXNwbGF5Q29udGFpbmVyLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5pbml0KFwiMTAwJVwiLCBcIjEwMCVcIiwgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMzAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0Fkc01hbmFnZXJJc1JlYWR5LCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKEFETUFOR0VSX0xPQURJTkdfRVJST1IpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnBhdXNlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQudmlkZW9FbmRlZENhbGxiYWNrID0gKGNvbXBsZXRlQ29udGVudENhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICAvL2xpc3RlbmVyLmlzTGluZWFyQWQgOiBnZXQgY3VycmVudCBhZCdzIHN0YXR1cyB3aGV0aGVyIGxpbmVhciBhZCBvciBub3QuXG4gICAgICAgICAgICBpZihsaXN0ZW5lci5pc0FsbEFkQ29tcGxldGUoKSB8fCAhbGlzdGVuZXIuaXNMaW5lYXJBZCgpKXtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaygpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgLy9Qb3N0IC0gUm9sbCDsnYQg7J6s7IOd7ZWY6riwIOychO2VtOyEnOuKlCDsvZjthZDsuKDqsIAg64Gd64Ks7J2M7J2EIGFkc0xvYWRlcuyXkOqyjCDslYzroKTslbwg7ZWc64ukXG4gICAgICAgICAgICAgICAgc3BlYy5pc1ZpZGVvRW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGFkc0xvYWRlci5jb250ZW50Q29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5pc0F1dG9QbGF5U3VwcG9ydENoZWNrVGltZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmNoZWNrQXV0b3BsYXlTdGFydDtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZihhZHNMb2FkZXIpe1xuICAgICAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEU19NQU5BR0VSX0xPQURFRCwgT25NYW5hZ2VyTG9hZGVkKTtcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBRF9FUlJPUiwgT25BZEVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoYWRzTWFuYWdlcil7XG4gICAgICAgICAgICAgICAgYWRzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGFkRGlzcGxheUNvbnRhaW5lcil7XG4gICAgICAgICAgICAgICAgYWREaXNwbGF5Q29udGFpbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYobGlzdGVuZXIpe1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0ICRhZHMgPSBMQSQocGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpKS5maW5kKFwiLm92cC1hZHNcIik7XG4gICAgICAgICAgICBpZigkYWRzKXtcbiAgICAgICAgICAgICAgICAkYWRzLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcm92aWRlci5vZmYoQ09OVEVOVF9WT0xVTUUsIG51bGwsIHRoYXQpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhhdDtcblxuICAgIH1jYXRjaCAoZXJyb3Ipe1xuICAgICAgICAvL2xldCB0ZW1wRXJyb3IgPSBFUlJPUlNbSU5JVF9BRFNfRVJST1JdO1xuICAgICAgICAvL3RlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAvL2Vycm9yQ2FsbGJhY2sodGVtcEVycm9yKTtcbiAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQWRzOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDEwLzA0LzIwMTkuXG4gKi9cbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX0FEX0xPQURFRCxcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBTVEFURV9BRF9DT01QTEVURSxcbiAgICBBRF9DSEFOR0VELFxuICAgIEFEX1RJTUUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUExBWUVSX1NUQVRFLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGFkc01hbmFnZXIsIHByb3ZpZGVyLCBhZHNTcGVjLCBPbkFkRXJyb3Ipe1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGxvd0xldmVsRXZlbnRzID0ge307XG5cbiAgICBsZXQgaW50ZXJ2YWxUaW1lciA9IG51bGw7XG5cbiAgICBjb25zdCBBRF9CVUZGRVJJTkcgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BRF9CVUZGRVJJTkc7XG4gICAgY29uc3QgQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRDtcbiAgICBjb25zdCBDT05URU5UX1JFU1VNRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQ7XG4gICAgY29uc3QgQURfRVJST1IgPSBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SO1xuICAgIGNvbnN0IEFMTF9BRFNfQ09NUExFVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQ7XG4gICAgY29uc3QgQ0xJQ0sgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DTElDSztcbiAgICBjb25zdCBTS0lQUEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU0tJUFBFRDtcbiAgICBjb25zdCBDT01QTEVURSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFO1xuICAgIGNvbnN0IEZJUlNUX1FVQVJUSUxFPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5GSVJTVF9RVUFSVElMRTtcbiAgICBjb25zdCBMT0FERUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQ7XG4gICAgY29uc3QgTUlEUE9JTlQ9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLk1JRFBPSU5UO1xuICAgIGNvbnN0IFBBVVNFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlBBVVNFRDtcbiAgICBjb25zdCBSRVNVTUVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUkVTVU1FRDtcbiAgICBjb25zdCBTVEFSVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU1RBUlRFRDtcbiAgICBjb25zdCBVU0VSX0NMT1NFID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuVVNFUl9DTE9TRTtcbiAgICBjb25zdCBUSElSRF9RVUFSVElMRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlRISVJEX1FVQVJUSUxFO1xuXG4gICAgbGV0IGlzQWxsQWRDb21wZWxldGUgPSBmYWxzZTsgICAvL1Bvc3Qgcm9sbOydhCDsnITtlbRcbiAgICBsZXQgYWRDb21wbGV0ZUNhbGxiYWNrID0gbnVsbDtcbiAgICBsZXQgY3VycmVudEFkID0gbnVsbDtcblxuICAgICBsb3dMZXZlbEV2ZW50c1tDT05URU5UX1BBVVNFX1JFUVVFU1RFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgLy9UaGlzIGNhbGxscyB3aGVuIHBsYXllciBpcyBwbGF5aW5nIGNvbnRlbnRzIGZvciBhZC5cbiAgICAgICAgIGlmKGFkc1NwZWMuc3RhcnRlZCl7XG4gICAgICAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG4gICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICAvL1RoaXMgY2FsbHMgd2hlbiBvbmUgYWQgZW5kZWQuXG4gICAgICAgIC8vQW5kIHRoaXMgaXMgc2lnbmFsIHdoYXQgcGxheSB0aGUgY29udGVudHMuXG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkICYmIChwcm92aWRlci5nZXRQb3NpdGlvbigpID09PSAwIHx8ICFhZHNTcGVjLmlzVmlkZW9FbmRlZCkgICl7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQURfRVJST1JdID0gT25BZEVycm9yO1xuXG4gICAgbG93TGV2ZWxFdmVudHNbQUxMX0FEU19DT01QTEVURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGlzQWxsQWRDb21wZWxldGUgPSB0cnVlO1xuICAgICAgICBpZihhZHNTcGVjLmlzVmlkZW9FbmRlZCl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0NMSUNLXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbRklSU1RfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICAvL1xuICAgIGxvd0xldmVsRXZlbnRzW0FEX0JVRkZFUklOR10gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRF9CVUZGRVJJTkdcIixhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbTE9BREVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIC8qdmFyIG1ldGFkYXRhID0ge1xuICAgICAgICAgICAgZHVyYXRpb246IHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICB0eXBlIDpcImFkXCJcbiAgICAgICAgfTsqL1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0xPQURFRCwge3JlbWFpbmluZyA6IHJlbWFpbmluZ1RpbWUsIGlzTGluZWFyIDogYWQuaXNMaW5lYXIoKSB9KTtcblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbTUlEUE9JTlRdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tQQVVTRURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BBVVNFRCk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tSRVNVTUVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QTEFZSU5HKTtcbiAgICB9O1xuXG5cbiAgICBsb3dMZXZlbEV2ZW50c1tTVEFSVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGN1cnJlbnRBZCA9IGFkO1xuXG4gICAgICAgIGxldCBhZE9iamVjdCA9IHtcbiAgICAgICAgICAgIGlzTGluZWFyIDogYWQuaXNMaW5lYXIoKSAsXG4gICAgICAgICAgICBkdXJhdGlvbiA6IGFkLmdldER1cmF0aW9uKCksXG4gICAgICAgICAgICBza2lwVGltZU9mZnNldCA6IGFkLmdldFNraXBUaW1lT2Zmc2V0KCkgICAgIC8vVGhlIG51bWJlciBvZiBzZWNvbmRzIG9mIHBsYXliYWNrIGJlZm9yZSB0aGUgYWQgYmVjb21lcyBza2lwcGFibGUuXG4gICAgICAgIH07XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfQ0hBTkdFRCwgYWRPYmplY3QpO1xuXG5cbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcblxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgICAgICAgICBhZHNTcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgLy8gRm9yIGEgbGluZWFyIGFkLCBhIHRpbWVyIGNhbiBiZSBzdGFydGVkIHRvIHBvbGwgZm9yXG4gICAgICAgICAgICAvLyB0aGUgcmVtYWluaW5nIHRpbWUuXG4gICAgICAgICAgICBpbnRlcnZhbFRpbWVyID0gc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1haW5pbmdUaW1lID0gYWRzTWFuYWdlci5nZXRSZW1haW5pbmdUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGFkLmdldER1cmF0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9USU1FLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiA6IGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcFRpbWVPZmZzZXQgOiBhZC5nZXRTa2lwVGltZU9mZnNldCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nIDogcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogZHVyYXRpb24gLSByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcHBhYmxlIDogYWRzTWFuYWdlci5nZXRBZFNraXBwYWJsZVN0YXRlKClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAzMDApOyAvLyBldmVyeSAzMDBtc1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQ09NUExFVEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICAvL1VzZXIgc2tpcHBlZCBhZC4gc2FtZSBwcm9jZXNzIG9uIGNvbXBsZXRlLlxuICAgIGxvd0xldmVsRXZlbnRzW1NLSVBQRURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG5cbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW1VTRVJfQ0xPU0VdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tUSElSRF9RVUFSVElMRV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuXG5cbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgfSk7XG4gICAgdGhhdC5zZXRBZENvbXBsZXRlQ2FsbGJhY2sgPSAoX2FkQ29tcGxldGVDYWxsYmFjaykgPT4ge1xuICAgICAgICBhZENvbXBsZXRlQ2FsbGJhY2sgPSBfYWRDb21wbGV0ZUNhbGxiYWNrO1xuICAgIH07XG4gICAgdGhhdC5pc0FsbEFkQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBpc0FsbEFkQ29tcGVsZXRlO1xuICAgIH07XG4gICAgdGhhdC5pc0xpbmVhckFkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gY3VycmVudEFkICA/IGN1cnJlbnRBZC5pc0xpbmVhcigpIDogdHJ1ZTtcbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBZHNFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGFkc01hbmFnZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTIuLlxuICovXG5pbXBvcnQge0VSUk9SLCBTVEFURV9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VmlkZW9FbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudE9yTXNlKSB7XG4gICAgaWYoXy5pc0VsZW1lbnQoZWxlbWVudE9yTXNlKSl7XG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2U7XG4gICAgfVxuICAgIGlmKGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLmdldFZpZGVvRWxlbWVudCgpO1xuICAgIH1lbHNlIGlmKGVsZW1lbnRPck1zZS5tZWRpYSl7XG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2UubWVkaWE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlcGFyYXRlTGl2ZSA9IGZ1bmN0aW9uKG1zZSkge1xuICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxuXG4gICAgaWYobXNlICYmIG1zZS5pc0R5bmFtaWMpe1xuICAgICAgICByZXR1cm4gbXNlLmlzRHluYW1pYygpO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGVycm9yVHJpZ2dlciA9IGZ1bmN0aW9uKGVycm9yLCBwcm92aWRlcil7XG4gICAgaWYocHJvdmlkZXIpe1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XG4gICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yICk7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgY29uc3QgcGlja0N1cnJlbnRTb3VyY2UgPSAoc291cmNlcywgY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKSA9PiB7XG4gICAgbGV0IHNvdXJjZUluZGV4ID0gTWF0aC5tYXgoMCwgY3VycmVudFNvdXJjZSk7XG4gICAgY29uc3QgbGFiZWwgPVwiXCI7XG4gICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgc291cmNlSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2VJbmRleDtcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==