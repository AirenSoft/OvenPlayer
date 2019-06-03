/*! OvenPlayerv0.9.5951 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
                                //Don't playing video when player complete playing AD.
                                //Only iOS Safari First loaded.
                                if (playerConfig.getBrowser().os === "iOS" || playerConfig.getBrowser().os === "Android") {
                                    elVideo.load();
                                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Fkcy9BZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9hZHMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci91dGlscy5qcyJdLCJuYW1lcyI6WyJBZHMiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsImVycm9yQ2FsbGJhY2siLCJBVVRPUExBWV9OT1RfQUxMT1dFRCIsIkFETUFOR0VSX0xPQURJTkdfRVJST1IiLCJBRFNfTUFOQUdFUl9MT0FERUQiLCJBRF9FUlJPUiIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJjaGVja0F1dG9wbGF5U3RhcnQiLCJPbkFkRXJyb3IiLCJPbk1hbmFnZXJMb2FkZWQiLCJhZERpc3BsYXlDb250YWluZXIiLCJhZHNMb2FkZXIiLCJhZHNNYW5hZ2VyIiwibGlzdGVuZXIiLCJhZHNSZXF1ZXN0IiwiYXV0b3BsYXlBbGxvd2VkIiwiYXV0b3BsYXlSZXF1aXJlc011dGVkIiwiaW5pdFJlcXVlc3QiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImdvb2dsZSIsImltYSIsIkFkc1JlcXVlc3QiLCJmb3JjZU5vbkxpbmVhckZ1bGxTbG90Iiwic2V0QWRXaWxsQXV0b1BsYXkiLCJzZXRBZFdpbGxQbGF5TXV0ZWQiLCJyZXF1ZXN0QWRzIiwiY2hlY2tBdXRvcGxheVN1cHBvcnQiLCJwbGF5IiwicGxheVByb21pc2UiLCJ1bmRlZmluZWQiLCJ0aGVuIiwicGF1c2UiLCJnZXRCcm93c2VyIiwiYnJvd3NlciIsIm9zIiwibXV0ZWQiLCJBZHNNYW5hZ2VyTG9hZGVkRXZlbnQiLCJUeXBlIiwiQWRFcnJvckV2ZW50Iiwic2V0dGluZ3MiLCJzZXRMb2NhbGUiLCJzZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXMiLCJjcmVhdGVBZENvbnRhaW5lciIsImFkQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiZ2V0Q29udGFpbmVyIiwiYXBwZW5kIiwiYWRFcnJvckV2ZW50IiwiY29uc29sZSIsImdldEVycm9yIiwiZ2V0VmFzdEVycm9yQ29kZSIsImdldE1lc3NhZ2UiLCJpbm5lckVycm9yIiwiZ2V0SW5uZXJFcnJvciIsImdldEVycm9yQ29kZSIsImRlc3Ryb3kiLCJhZHNNYW5hZ2VyTG9hZGVkRXZlbnQiLCJhZHNSZW5kZXJpbmdTZXR0aW5ncyIsIkFkc1JlbmRlcmluZ1NldHRpbmdzIiwicmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSIsImdldEFkc01hbmFnZXIiLCJvbiIsIkNPTlRFTlRfVk9MVU1FIiwiZGF0YSIsIm11dGUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJBZERpc3BsYXlDb250YWluZXIiLCJBZHNMb2FkZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiaXNBY3RpdmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3VtZSIsImVycm9yIiwicmV0cnlDb3VudCIsImNoZWNrQWRzTWFuYWdlcklzUmVhZHkiLCJpc0F1dG9TdGFydCIsIkVycm9yIiwibG9hZCIsImluaXRpYWxpemUiLCJpbml0IiwiVmlld01vZGUiLCJOT1JNQUwiLCJzdGFydCIsInNldFRpbWVvdXQiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJjb21wbGV0ZUNvbnRlbnRDYWxsYmFjayIsImlzQWxsQWRDb21wbGV0ZSIsImlzTGluZWFyQWQiLCJjb250ZW50Q29tcGxldGUiLCJpc0F1dG9QbGF5U3VwcG9ydENoZWNrVGltZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCIkYWRzIiwiZmluZCIsInJlbW92ZSIsIm9mZiIsIkxpc3RlbmVyIiwiYWRzU3BlYyIsImxvd0xldmVsRXZlbnRzIiwiaW50ZXJ2YWxUaW1lciIsIkFEX0JVRkZFUklORyIsIkFkRXZlbnQiLCJDT05URU5UX1BBVVNFX1JFUVVFU1RFRCIsIkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCIsIkFMTF9BRFNfQ09NUExFVEVEIiwiQ0xJQ0siLCJTS0lQUEVEIiwiQ09NUExFVEUiLCJGSVJTVF9RVUFSVElMRSIsIkxPQURFRCIsIk1JRFBPSU5UIiwiUEFVU0VEIiwiUkVTVU1FRCIsIlNUQVJURUQiLCJVU0VSX0NMT1NFIiwiVEhJUkRfUVVBUlRJTEUiLCJpc0FsbEFkQ29tcGVsZXRlIiwiYWRDb21wbGV0ZUNhbGxiYWNrIiwiY3VycmVudEFkIiwiYWRFdmVudCIsInR5cGUiLCJnZXRQb3NpdGlvbiIsInNldFN0YXRlIiwiU1RBVEVfQ09NUExFVEUiLCJyZW1haW5pbmdUaW1lIiwiZ2V0UmVtYWluaW5nVGltZSIsImFkIiwiZ2V0QWQiLCJ0cmlnZ2VyIiwiU1RBVEVfQURfTE9BREVEIiwicmVtYWluaW5nIiwiaXNMaW5lYXIiLCJTVEFURV9BRF9QQVVTRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiYWRPYmplY3QiLCJkdXJhdGlvbiIsImdldER1cmF0aW9uIiwic2tpcFRpbWVPZmZzZXQiLCJnZXRTa2lwVGltZU9mZnNldCIsIkFEX0NIQU5HRUQiLCJzZXRJbnRlcnZhbCIsIkFEX1RJTUUiLCJwb3NpdGlvbiIsInNraXBwYWJsZSIsImdldEFkU2tpcHBhYmxlU3RhdGUiLCJjbGVhckludGVydmFsIiwiU1RBVEVfQURfQ09NUExFVEUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImV2ZW50TmFtZSIsInNldEFkQ29tcGxldGVDYWxsYmFjayIsIl9hZENvbXBsZXRlQ2FsbGJhY2siLCJleHRyYWN0VmlkZW9FbGVtZW50IiwiZWxlbWVudE9yTXNlIiwiXyIsImlzRWxlbWVudCIsImdldFZpZGVvRWxlbWVudCIsIm1lZGlhIiwic2VwYXJhdGVMaXZlIiwibXNlIiwiaXNEeW5hbWljIiwiZXJyb3JUcmlnZ2VyIiwiU1RBVEVfRVJST1IiLCJFUlJPUiIsInBpY2tDdXJyZW50U291cmNlIiwic291cmNlcyIsImN1cnJlbnRTb3VyY2UiLCJzb3VyY2VJbmRleCIsIk1hdGgiLCJtYXgiLCJsYWJlbCIsImkiLCJsZW5ndGgiLCJnZXRTb3VyY2VMYWJlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFOQTs7O0FBVUEsSUFBTUEsTUFBTSxTQUFOQSxHQUFNLENBQVNDLE9BQVQsRUFBa0JDLFFBQWxCLEVBQTRCQyxZQUE1QixFQUEwQ0MsUUFBMUMsRUFBb0RDLGFBQXBELEVBQWtFO0FBQzFFO0FBQ0EsUUFBTUMsdUJBQXVCLG9CQUE3QjtBQUNBLFFBQU1DLHlCQUF5Qix5QkFBL0I7QUFDQSxRQUFJQyxxQkFBcUIsRUFBekI7QUFDQSxRQUFJQyxXQUFXLEVBQWY7O0FBRUEsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsT0FBTztBQUNQQyxpQkFBUyxLQURGLEVBQ1M7QUFDaEJDLGdCQUFTLEtBRkYsRUFFUztBQUNoQkMsc0JBQWUsS0FIUjtBQUlQQyw0QkFBcUI7QUFKZCxLQUFYO0FBTUEsUUFBSUMsWUFBWSxJQUFoQjtBQUNBLFFBQUlDLGtCQUFrQixJQUF0Qjs7QUFFQSxRQUFJQyxxQkFBcUIsSUFBekI7QUFDQSxRQUFJQyxZQUFZLElBQWhCO0FBQ0EsUUFBSUMsYUFBYSxJQUFqQjtBQUNBLFFBQUlDLFdBQVcsSUFBZjtBQUNBLFFBQUlDLGFBQWEsSUFBakI7QUFDQSxRQUFJQyxrQkFBa0IsS0FBdEI7QUFBQSxRQUE2QkMsd0JBQXdCLEtBQXJEOztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQSxRQUFHO0FBQUEsWUF3RVVDLFdBeEVWLEdBd0VDLFNBQVNBLFdBQVQsR0FBc0I7O0FBRWxCQyw4QkFBa0JDLEdBQWxCLENBQXNCLHFCQUF0QixFQUE2QyxpQkFBN0MsRUFBK0RKLGVBQS9ELEVBQWdGLHVCQUFoRixFQUF3R0MscUJBQXhHOztBQUVBRix5QkFBYSxJQUFJTSxPQUFPQyxHQUFQLENBQVdDLFVBQWYsRUFBYjs7QUFFQVIsdUJBQVdTLHNCQUFYLEdBQW9DLEtBQXBDO0FBQ0E7Ozs7O0FBS0FULHVCQUFXVSxpQkFBWCxDQUE2QlQsZUFBN0I7QUFDQUQsdUJBQVdXLGtCQUFYLENBQThCVCxxQkFBOUI7QUFDQUYsdUJBQVduQixRQUFYLEdBQXNCQSxRQUF0Qjs7QUFFQWdCLHNCQUFVZSxVQUFWLENBQXFCWixVQUFyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDSCxTQTdGRjs7QUFBQSxZQStGVWEsb0JBL0ZWLEdBK0ZDLFNBQVNBLG9CQUFULEdBQWdDO0FBQzVCLGdCQUFHLENBQUNuQyxRQUFRb0MsSUFBWixFQUFpQjtBQUNiYixrQ0FBa0IsSUFBbEI7QUFDQUMsd0NBQXdCLEtBQXhCO0FBQ0FiLHFCQUFLSSxrQkFBTCxHQUEwQixLQUExQjtBQUNBVTtBQUNBLHVCQUFPLEtBQVA7QUFDSDs7QUFFRCxnQkFBSVksY0FBY3JDLFFBQVFvQyxJQUFSLEVBQWxCO0FBQ0EsZ0JBQUlDLGdCQUFnQkMsU0FBcEIsRUFBK0I7QUFDM0JELDRCQUFZRSxJQUFaLENBQWlCLFlBQVU7QUFDdkI7QUFDQXZDLDRCQUFRd0MsS0FBUjs7QUFFQWpCLHNDQUFrQixJQUFsQjtBQUNBQyw0Q0FBd0IsS0FBeEI7QUFDQWIseUJBQUtJLGtCQUFMLEdBQTBCLEtBQTFCO0FBQ0FVO0FBRUgsaUJBVEQsV0FTUyxZQUFVO0FBQ2Ysd0JBQUd2QixhQUFhdUMsVUFBYixHQUEwQkMsT0FBMUIsS0FBdUMsUUFBdkMsSUFBbUR4QyxhQUFhdUMsVUFBYixHQUEwQkUsRUFBMUIsS0FBa0MsS0FBckYsSUFBOEZ6QyxhQUFhdUMsVUFBYixHQUEwQkUsRUFBMUIsS0FBa0MsU0FBbkksRUFBNkk7QUFDekk7Ozs7QUFJQTNDLGdDQUFRNEMsS0FBUixHQUFnQixJQUFoQjtBQUNBLDRCQUFJUCxjQUFjckMsUUFBUW9DLElBQVIsRUFBbEI7QUFDQSw0QkFBSUMsZ0JBQWdCQyxTQUFwQixFQUErQjtBQUMzQkQsd0NBQVlFLElBQVosQ0FBaUIsWUFBWTtBQUN6QjtBQUNBdkMsd0NBQVF3QyxLQUFSO0FBQ0FqQixrREFBa0IsSUFBbEI7QUFDQUMsd0RBQXdCLElBQXhCO0FBQ0FiLHFDQUFLSSxrQkFBTCxHQUEwQixLQUExQjtBQUNBVTtBQUNILDZCQVBELFdBT1MsWUFBWTtBQUNqQjtBQUNBekIsd0NBQVE0QyxLQUFSLEdBQWdCLEtBQWhCO0FBQ0FyQixrREFBa0IsS0FBbEI7QUFDQUMsd0RBQXdCLEtBQXhCO0FBQ0FiLHFDQUFLSSxrQkFBTCxHQUEwQixLQUExQjtBQUNBVTtBQUNILDZCQWREO0FBZUg7QUFDSixxQkF4QkQsTUF3Qks7QUFDRHpCLGdDQUFRd0MsS0FBUjtBQUNBakIsMENBQWtCLEtBQWxCO0FBQ0FDLGdEQUF3QixLQUF4QjtBQUNBYiw2QkFBS0ksa0JBQUwsR0FBMEIsS0FBMUI7QUFDQVU7QUFDSDtBQUNKLGlCQXpDRDtBQTBDSCxhQTNDRCxNQTJDSztBQUNEO0FBQ0F6Qix3QkFBUXdDLEtBQVI7QUFDQWpCLGtDQUFrQixJQUFsQjtBQUNBQyx3Q0FBd0IsS0FBeEI7QUFDQWIscUJBQUtJLGtCQUFMLEdBQTBCLEtBQTFCO0FBQ0FVO0FBQ0g7QUFDSixTQTVKRjs7QUFDQ2xCLDZCQUFxQnFCLE9BQU9DLEdBQVAsQ0FBV2dCLHFCQUFYLENBQWlDQyxJQUFqQyxDQUFzQ3ZDLGtCQUEzRDtBQUNBQyxtQkFBV29CLE9BQU9DLEdBQVAsQ0FBV2tCLFlBQVgsQ0FBd0JELElBQXhCLENBQTZCdEMsUUFBeEM7QUFDQW9CLGVBQU9DLEdBQVAsQ0FBV21CLFFBQVgsQ0FBb0JDLFNBQXBCLENBQThCLElBQTlCO0FBQ0FyQixlQUFPQyxHQUFQLENBQVdtQixRQUFYLENBQW9CRSxvQ0FBcEIsQ0FBeUQsSUFBekQ7O0FBS0EsWUFBTUMsb0JBQW9CLFNBQXBCQSxpQkFBb0IsR0FBTTtBQUM1QixnQkFBSUMsY0FBY0MsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFsQjtBQUNBRix3QkFBWUcsWUFBWixDQUF5QixPQUF6QixFQUFrQyxTQUFsQztBQUNBSCx3QkFBWUcsWUFBWixDQUF5QixJQUF6QixFQUErQixTQUEvQjtBQUNBckQseUJBQWFzRCxZQUFiLEdBQTRCQyxNQUE1QixDQUFtQ0wsV0FBbkM7O0FBRUEsbUJBQU9BLFdBQVA7QUFDSCxTQVBEO0FBUUFwQyxvQkFBWSxtQkFBUzBDLFlBQVQsRUFBc0I7QUFDOUI7O0FBRUE7O0FBRUFDLG9CQUFRaEMsR0FBUixDQUFZK0IsYUFBYUUsUUFBYixHQUF3QkMsZ0JBQXhCLEVBQVosRUFBd0RILGFBQWFFLFFBQWIsR0FBd0JFLFVBQXhCLEVBQXhEOztBQUVBLGdCQUFJQyxhQUFhTCxhQUFhRSxRQUFiLEdBQXdCSSxhQUF4QixFQUFqQjtBQUNBLGdCQUFHRCxVQUFILEVBQWM7QUFDVkosd0JBQVFoQyxHQUFSLENBQVlvQyxXQUFXRSxZQUFYLEVBQVosRUFBdUNGLFdBQVdELFVBQVgsRUFBdkM7QUFDSDtBQUNELGdCQUFJMUMsVUFBSixFQUFnQjtBQUNaQSwyQkFBVzhDLE9BQVg7QUFDSDtBQUNEdkQsaUJBQUtFLE1BQUwsR0FBYyxLQUFkO0FBQ0FGLGlCQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBWCxxQkFBU21DLElBQVQ7O0FBRUE7OztBQU1ILFNBeEJEO0FBeUJBbkIsMEJBQWtCLHlCQUFTa0QscUJBQVQsRUFBK0I7QUFDN0MsZ0JBQUlDLHVCQUF1QixJQUFJeEMsT0FBT0MsR0FBUCxDQUFXd0Msb0JBQWYsRUFBM0I7QUFDQUQsaUNBQXFCRSwyQ0FBckIsR0FBbUUsSUFBbkU7QUFDQTtBQUNBbEQseUJBQWErQyxzQkFBc0JJLGFBQXRCLENBQW9DdkUsT0FBcEMsRUFBNkNvRSxvQkFBN0MsQ0FBYjs7QUFHQS9DLHVCQUFXLDJCQUFrQkQsVUFBbEIsRUFBOEJuQixRQUE5QixFQUF3Q1UsSUFBeEMsRUFBOENLLFNBQTlDLENBQVg7O0FBRUFmLHFCQUFTdUUsRUFBVCxDQUFZQyx5QkFBWixFQUE0QixVQUFTQyxJQUFULEVBQWU7QUFDdkMsb0JBQUdBLEtBQUtDLElBQVIsRUFBYTtBQUNUdkQsK0JBQVd3RCxTQUFYLENBQXFCLENBQXJCO0FBQ0gsaUJBRkQsTUFFSztBQUNEeEQsK0JBQVd3RCxTQUFYLENBQXFCRixLQUFLRyxNQUFMLEdBQVksR0FBakM7QUFDSDtBQUVKLGFBUEQsRUFPR3BFLElBUEg7O0FBU0FDLCtCQUFtQixJQUFuQjtBQUVILFNBcEJEOztBQXVCQVEsNkJBQXFCLElBQUlVLE9BQU9DLEdBQVAsQ0FBV2lELGtCQUFmLENBQWtDM0IsbUJBQWxDLEVBQXVEbkQsT0FBdkQsQ0FBckI7QUFDQW1CLG9CQUFZLElBQUlTLE9BQU9DLEdBQVAsQ0FBV2tELFNBQWYsQ0FBeUI3RCxrQkFBekIsQ0FBWjs7QUFFQUMsa0JBQVU2RCxnQkFBVixDQUEyQnpFLGtCQUEzQixFQUErQ1UsZUFBL0MsRUFBZ0UsS0FBaEU7QUFDQUUsa0JBQVU2RCxnQkFBVixDQUEyQnhFLFFBQTNCLEVBQXFDUSxTQUFyQyxFQUFnRCxLQUFoRDs7QUF3RkFtQjs7QUFFQTFCLGFBQUt3RSxRQUFMLEdBQWdCLFlBQU07QUFDbEIsbUJBQU90RSxLQUFLRSxNQUFaO0FBQ0gsU0FGRDtBQUdBSixhQUFLRyxPQUFMLEdBQWUsWUFBTTtBQUNqQixtQkFBT0QsS0FBS0MsT0FBWjtBQUNILFNBRkQ7QUFHQUgsYUFBSzJCLElBQUwsR0FBWSxZQUFNO0FBQ2Q7O0FBRUEsZ0JBQUd6QixLQUFLQyxPQUFSLEVBQWdCO0FBQ1osdUJBQU8sSUFBSXNFLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUMxQyx3QkFBRztBQUNDaEUsbUNBQVdpRSxNQUFYO0FBQ0FGO0FBQ0gscUJBSEQsQ0FHRSxPQUFPRyxLQUFQLEVBQWE7QUFDWEYsK0JBQU9FLEtBQVA7QUFDSDtBQUNKLGlCQVBNLENBQVA7QUFTSCxhQVZELE1BVUs7QUFDRCxvQkFBSUMsYUFBYSxDQUFqQjtBQUNBLHVCQUFPLElBQUlMLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUMxQyxxQkFBQyxTQUFTSSxzQkFBVCxHQUFpQztBQUM5QkQ7QUFDQSw0QkFBRzdFLGdCQUFILEVBQW9CO0FBQ2hCLGdDQUFJUixhQUFhdUYsV0FBYixNQUE4QixDQUFDbEUsZUFBbkMsRUFBcUQ7QUFDakRBLGtEQUFrQixJQUFsQjtBQUNBWixxQ0FBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQXdFLHVDQUFPLElBQUlNLEtBQUosQ0FBVXJGLG9CQUFWLENBQVA7QUFDSCw2QkFKRCxNQUlLO0FBQ0Q7QUFDQTtBQUNBLG9DQUFHSCxhQUFhdUMsVUFBYixHQUEwQkUsRUFBMUIsS0FBa0MsS0FBbEMsSUFBMkN6QyxhQUFhdUMsVUFBYixHQUEwQkUsRUFBMUIsS0FBa0MsU0FBaEYsRUFBMEY7QUFDdEYzQyw0Q0FBUTJGLElBQVI7QUFDSDtBQUNEekUsbURBQW1CMEUsVUFBbkI7QUFDQXhFLDJDQUFXeUUsSUFBWCxDQUFnQixNQUFoQixFQUF3QixNQUF4QixFQUFnQ2pFLE9BQU9DLEdBQVAsQ0FBV2lFLFFBQVgsQ0FBb0JDLE1BQXBEO0FBQ0EzRSwyQ0FBVzRFLEtBQVg7QUFDQXJGLHFDQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBdUU7QUFDSDtBQUNKLHlCQWpCRCxNQWlCSztBQUNELGdDQUFHSSxhQUFhLEdBQWhCLEVBQW9CO0FBQ2hCVSwyQ0FBV1Qsc0JBQVgsRUFBbUMsR0FBbkM7QUFDSCw2QkFGRCxNQUVLO0FBQ0RKLHVDQUFPLElBQUlNLEtBQUosQ0FBVXBGLHNCQUFWLENBQVA7QUFDSDtBQUNKO0FBRUoscUJBM0JEO0FBNEJILGlCQTdCTSxDQUFQO0FBZ0NIO0FBQ0osU0FoREQ7QUFpREFHLGFBQUsrQixLQUFMLEdBQWEsWUFBTTtBQUNmcEIsdUJBQVdvQixLQUFYO0FBQ0gsU0FGRDtBQUdBL0IsYUFBS3lGLGtCQUFMLEdBQTBCLFVBQUNDLHVCQUFELEVBQTZCO0FBQ25EO0FBQ0EsZ0JBQUc5RSxTQUFTK0UsZUFBVCxNQUE4QixDQUFDL0UsU0FBU2dGLFVBQVQsRUFBbEMsRUFBd0Q7QUFDcERGO0FBQ0gsYUFGRCxNQUVLO0FBQ0Q7QUFDQXhGLHFCQUFLRyxZQUFMLEdBQW9CLElBQXBCO0FBQ0FLLDBCQUFVbUYsZUFBVjtBQUNIO0FBQ0osU0FURDtBQVVBN0YsYUFBSzhGLDBCQUFMLEdBQWtDLFlBQU07QUFDcEMsbUJBQU81RixLQUFLSSxrQkFBWjtBQUNILFNBRkQ7QUFHQU4sYUFBS3lELE9BQUwsR0FBZSxZQUFNO0FBQ2pCLGdCQUFHL0MsU0FBSCxFQUFhO0FBQ1RBLDBCQUFVcUYsbUJBQVYsQ0FBOEJqRyxrQkFBOUIsRUFBa0RVLGVBQWxEO0FBQ0FFLDBCQUFVcUYsbUJBQVYsQ0FBOEJoRyxRQUE5QixFQUF3Q1EsU0FBeEM7QUFDSDs7QUFFRCxnQkFBR0ksVUFBSCxFQUFjO0FBQ1ZBLDJCQUFXOEMsT0FBWDtBQUNIOztBQUVELGdCQUFHaEQsa0JBQUgsRUFBc0I7QUFDbEJBLG1DQUFtQmdELE9BQW5CO0FBQ0g7O0FBRUQsZ0JBQUc3QyxRQUFILEVBQVk7QUFDUkEseUJBQVM2QyxPQUFUO0FBQ0g7O0FBRUQsZ0JBQUl1QyxPQUFPLHlCQUFJdkcsYUFBYXNELFlBQWIsRUFBSixFQUFpQ2tELElBQWpDLENBQXNDLFVBQXRDLENBQVg7QUFDQSxnQkFBR0QsSUFBSCxFQUFRO0FBQ0pBLHFCQUFLRSxNQUFMO0FBQ0g7O0FBRUQxRyxxQkFBUzJHLEdBQVQsQ0FBYW5DLHlCQUFiLEVBQTZCLElBQTdCLEVBQW1DaEUsSUFBbkM7QUFDSCxTQXhCRDtBQXlCQSxlQUFPQSxJQUFQO0FBRUgsS0FqUUQsQ0FpUUMsT0FBTzZFLEtBQVAsRUFBYTtBQUNWO0FBQ0E7QUFDQTtBQUNBM0IsZ0JBQVFoQyxHQUFSO0FBQ0EsZUFBTyxJQUFQO0FBQ0g7QUFHSixDQTVTRDs7cUJBK1NlNUIsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdFRmOzs7O0FBQ0E7Ozs7QUFKQTs7O0FBdUNBLElBQU04RyxXQUFXLFNBQVhBLFFBQVcsQ0FBU3pGLFVBQVQsRUFBcUJuQixRQUFyQixFQUErQjZHLE9BQS9CLEVBQXdDOUYsU0FBeEMsRUFBa0Q7QUFDL0QsUUFBSVAsT0FBTyxFQUFYO0FBQ0EsUUFBSXNHLGlCQUFpQixFQUFyQjs7QUFFQSxRQUFJQyxnQkFBZ0IsSUFBcEI7O0FBRUEsUUFBTUMsZUFBZXJGLE9BQU9DLEdBQVAsQ0FBV3FGLE9BQVgsQ0FBbUJwRSxJQUFuQixDQUF3Qm1FLFlBQTdDO0FBQ0EsUUFBTUUsMEJBQTBCdkYsT0FBT0MsR0FBUCxDQUFXcUYsT0FBWCxDQUFtQnBFLElBQW5CLENBQXdCcUUsdUJBQXhEO0FBQ0EsUUFBTUMsMkJBQTJCeEYsT0FBT0MsR0FBUCxDQUFXcUYsT0FBWCxDQUFtQnBFLElBQW5CLENBQXdCc0Usd0JBQXpEO0FBQ0EsUUFBTTVHLFdBQVdvQixPQUFPQyxHQUFQLENBQVdrQixZQUFYLENBQXdCRCxJQUF4QixDQUE2QnRDLFFBQTlDO0FBQ0EsUUFBTTZHLG9CQUFvQnpGLE9BQU9DLEdBQVAsQ0FBV3FGLE9BQVgsQ0FBbUJwRSxJQUFuQixDQUF3QnVFLGlCQUFsRDtBQUNBLFFBQU1DLFFBQVExRixPQUFPQyxHQUFQLENBQVdxRixPQUFYLENBQW1CcEUsSUFBbkIsQ0FBd0J3RSxLQUF0QztBQUNBLFFBQU1DLFVBQVUzRixPQUFPQyxHQUFQLENBQVdxRixPQUFYLENBQW1CcEUsSUFBbkIsQ0FBd0J5RSxPQUF4QztBQUNBLFFBQU1DLFdBQVc1RixPQUFPQyxHQUFQLENBQVdxRixPQUFYLENBQW1CcEUsSUFBbkIsQ0FBd0IwRSxRQUF6QztBQUNBLFFBQU1DLGlCQUFnQjdGLE9BQU9DLEdBQVAsQ0FBV3FGLE9BQVgsQ0FBbUJwRSxJQUFuQixDQUF3QjJFLGNBQTlDO0FBQ0EsUUFBTUMsU0FBUzlGLE9BQU9DLEdBQVAsQ0FBV3FGLE9BQVgsQ0FBbUJwRSxJQUFuQixDQUF3QjRFLE1BQXZDO0FBQ0EsUUFBTUMsV0FBVS9GLE9BQU9DLEdBQVAsQ0FBV3FGLE9BQVgsQ0FBbUJwRSxJQUFuQixDQUF3QjZFLFFBQXhDO0FBQ0EsUUFBTUMsU0FBU2hHLE9BQU9DLEdBQVAsQ0FBV3FGLE9BQVgsQ0FBbUJwRSxJQUFuQixDQUF3QjhFLE1BQXZDO0FBQ0EsUUFBTUMsVUFBVWpHLE9BQU9DLEdBQVAsQ0FBV3FGLE9BQVgsQ0FBbUJwRSxJQUFuQixDQUF3QitFLE9BQXhDO0FBQ0EsUUFBTUMsVUFBVWxHLE9BQU9DLEdBQVAsQ0FBV3FGLE9BQVgsQ0FBbUJwRSxJQUFuQixDQUF3QmdGLE9BQXhDO0FBQ0EsUUFBTUMsYUFBYW5HLE9BQU9DLEdBQVAsQ0FBV3FGLE9BQVgsQ0FBbUJwRSxJQUFuQixDQUF3QmlGLFVBQTNDO0FBQ0EsUUFBTUMsaUJBQWlCcEcsT0FBT0MsR0FBUCxDQUFXcUYsT0FBWCxDQUFtQnBFLElBQW5CLENBQXdCa0YsY0FBL0M7O0FBRUEsUUFBSUMsbUJBQW1CLEtBQXZCLENBdkIrRCxDQXVCL0I7QUFDaEMsUUFBSUMscUJBQXFCLElBQXpCO0FBQ0EsUUFBSUMsWUFBWSxJQUFoQjs7QUFFQ3BCLG1CQUFlSSx1QkFBZixJQUEwQyxVQUFDaUIsT0FBRCxFQUFhO0FBQ3BEMUcsMEJBQWtCQyxHQUFsQixDQUFzQnlHLFFBQVFDLElBQTlCO0FBQ0E7QUFDQyxZQUFHdkIsUUFBUWxHLE9BQVgsRUFBbUI7QUFDZmtHLG9CQUFRakcsTUFBUixHQUFpQixJQUFqQjtBQUNBWixxQkFBU3VDLEtBQVQ7QUFDSDtBQUVMLEtBUkE7O0FBVUR1RSxtQkFBZUssd0JBQWYsSUFBMkMsVUFBQ2dCLE9BQUQsRUFBYTtBQUNwRDFHLDBCQUFrQkMsR0FBbEIsQ0FBc0J5RyxRQUFRQyxJQUE5QjtBQUNBO0FBQ0E7QUFDQXZCLGdCQUFRakcsTUFBUixHQUFpQixLQUFqQjs7QUFFQSxZQUFHaUcsUUFBUWxHLE9BQVIsS0FBb0JYLFNBQVNxSSxXQUFULE9BQTJCLENBQTNCLElBQWdDLENBQUN4QixRQUFRaEcsWUFBN0QsQ0FBSCxFQUFnRjtBQUM1RWIscUJBQVNtQyxJQUFUO0FBQ0g7QUFFSixLQVZEO0FBV0EyRSxtQkFBZXZHLFFBQWYsSUFBMkJRLFNBQTNCOztBQUVBK0YsbUJBQWVNLGlCQUFmLElBQW9DLFVBQUNlLE9BQUQsRUFBYTtBQUM3QzFHLDBCQUFrQkMsR0FBbEIsQ0FBc0J5RyxRQUFRQyxJQUE5QjtBQUNBSiwyQkFBbUIsSUFBbkI7QUFDQSxZQUFHbkIsUUFBUWhHLFlBQVgsRUFBd0I7QUFDcEJiLHFCQUFTc0ksUUFBVCxDQUFrQkMseUJBQWxCO0FBQ0g7QUFDSixLQU5EO0FBT0F6QixtQkFBZU8sS0FBZixJQUF3QixVQUFDYyxPQUFELEVBQWE7QUFDakMxRywwQkFBa0JDLEdBQWxCLENBQXNCeUcsUUFBUUMsSUFBOUI7QUFDSCxLQUZEO0FBR0F0QixtQkFBZVUsY0FBZixJQUFpQyxVQUFDVyxPQUFELEVBQWE7QUFDMUMxRywwQkFBa0JDLEdBQWxCLENBQXNCeUcsUUFBUUMsSUFBOUI7QUFDSCxLQUZEO0FBR0E7QUFDQXRCLG1CQUFlRSxZQUFmLElBQStCLFVBQUNtQixPQUFELEVBQWE7QUFDeEMxRywwQkFBa0JDLEdBQWxCLENBQXNCLGNBQXRCLEVBQXFDeUcsUUFBUUMsSUFBN0M7QUFDSCxLQUZEO0FBR0F0QixtQkFBZVcsTUFBZixJQUF5QixVQUFDVSxPQUFELEVBQWE7QUFDbEMxRywwQkFBa0JDLEdBQWxCLENBQXNCeUcsUUFBUUMsSUFBOUI7QUFDQSxZQUFJSSxnQkFBZ0JySCxXQUFXc0gsZ0JBQVgsRUFBcEI7QUFDQSxZQUFJQyxLQUFLUCxRQUFRUSxLQUFSLEVBQVQ7QUFDQTs7OztBQUlBM0ksaUJBQVM0SSxPQUFULENBQWlCQywwQkFBakIsRUFBa0MsRUFBQ0MsV0FBWU4sYUFBYixFQUE0Qk8sVUFBV0wsR0FBR0ssUUFBSCxFQUF2QyxFQUFsQztBQUVILEtBVkQ7QUFXQWpDLG1CQUFlWSxRQUFmLElBQTJCLFVBQUNTLE9BQUQsRUFBYTtBQUNwQzFHLDBCQUFrQkMsR0FBbEIsQ0FBc0J5RyxRQUFRQyxJQUE5QjtBQUNILEtBRkQ7QUFHQXRCLG1CQUFlYSxNQUFmLElBQXlCLFVBQUNRLE9BQUQsRUFBYTtBQUNsQzFHLDBCQUFrQkMsR0FBbEIsQ0FBc0J5RyxRQUFRQyxJQUE5QjtBQUNBcEksaUJBQVNzSSxRQUFULENBQWtCVSwwQkFBbEI7QUFDSCxLQUhEO0FBSUFsQyxtQkFBZWMsT0FBZixJQUEwQixVQUFDTyxPQUFELEVBQWE7QUFDbkMxRywwQkFBa0JDLEdBQWxCLENBQXNCeUcsUUFBUUMsSUFBOUI7QUFDQXBJLGlCQUFTc0ksUUFBVCxDQUFrQlcsMkJBQWxCO0FBQ0gsS0FIRDs7QUFNQW5DLG1CQUFlZSxPQUFmLElBQTBCLFVBQUNNLE9BQUQsRUFBYTtBQUNuQzFHLDBCQUFrQkMsR0FBbEIsQ0FBc0J5RyxRQUFRQyxJQUE5QjtBQUNBLFlBQUlNLEtBQUtQLFFBQVFRLEtBQVIsRUFBVDtBQUNBVCxvQkFBWVEsRUFBWjs7QUFFQSxZQUFJUSxXQUFXO0FBQ1hILHNCQUFXTCxHQUFHSyxRQUFILEVBREE7QUFFWEksc0JBQVdULEdBQUdVLFdBQUgsRUFGQTtBQUdYQyw0QkFBaUJYLEdBQUdZLGlCQUFILEVBSE4sQ0FHaUM7QUFIakMsU0FBZjtBQUtBdEosaUJBQVM0SSxPQUFULENBQWlCVyxxQkFBakIsRUFBNkJMLFFBQTdCOztBQUdBLFlBQUlSLEdBQUdLLFFBQUgsRUFBSixFQUFtQjs7QUFFZi9JLHFCQUFTc0ksUUFBVCxDQUFrQlcsMkJBQWxCO0FBQ0FwQyxvQkFBUWxHLE9BQVIsR0FBa0IsSUFBbEI7QUFDQTtBQUNBO0FBQ0FvRyw0QkFBZ0J5QyxZQUNaLFlBQVc7QUFDUCxvQkFBSWhCLGdCQUFnQnJILFdBQVdzSCxnQkFBWCxFQUFwQjtBQUNBLG9CQUFJVSxXQUFXVCxHQUFHVSxXQUFILEVBQWY7O0FBRUFwSix5QkFBUzRJLE9BQVQsQ0FBaUJhLGtCQUFqQixFQUEwQjtBQUN0Qk4sOEJBQVdBLFFBRFc7QUFFdEJFLG9DQUFpQlgsR0FBR1ksaUJBQUgsRUFGSztBQUd0QlIsK0JBQVlOLGFBSFU7QUFJdEJrQiw4QkFBV1AsV0FBV1gsYUFKQTtBQUt0Qm1CLCtCQUFZeEksV0FBV3lJLG1CQUFYO0FBTFUsaUJBQTFCO0FBT0gsYUFaVyxFQWFaLEdBYlksQ0FBaEIsQ0FOZSxDQW1CTDtBQUNiLFNBcEJELE1Bb0JLO0FBQ0Q1SixxQkFBU21DLElBQVQ7QUFDSDtBQUNKLEtBcENEO0FBcUNBMkUsbUJBQWVTLFFBQWYsSUFBMkIsVUFBQ1ksT0FBRCxFQUFhO0FBQ3BDMUcsMEJBQWtCQyxHQUFsQixDQUFzQnlHLFFBQVFDLElBQTlCO0FBQ0EsWUFBSU0sS0FBS1AsUUFBUVEsS0FBUixFQUFUO0FBQ0EsWUFBSUQsR0FBR0ssUUFBSCxFQUFKLEVBQW1CO0FBQ2ZjLDBCQUFjOUMsYUFBZDtBQUNIO0FBQ0QvRyxpQkFBUzRJLE9BQVQsQ0FBaUJrQiw0QkFBakI7QUFDSCxLQVBEO0FBUUE7QUFDQWhELG1CQUFlUSxPQUFmLElBQTBCLFVBQUNhLE9BQUQsRUFBYTtBQUNuQzFHLDBCQUFrQkMsR0FBbEIsQ0FBc0J5RyxRQUFRQyxJQUE5Qjs7QUFFQSxZQUFJTSxLQUFLUCxRQUFRUSxLQUFSLEVBQVQ7QUFDQSxZQUFJRCxHQUFHSyxRQUFILEVBQUosRUFBbUI7QUFDZmMsMEJBQWM5QyxhQUFkO0FBQ0g7QUFDRC9HLGlCQUFTNEksT0FBVCxDQUFpQmtCLDRCQUFqQjtBQUNILEtBUkQ7QUFTQWhELG1CQUFlZ0IsVUFBZixJQUE2QixVQUFDSyxPQUFELEVBQWE7QUFDdEMxRywwQkFBa0JDLEdBQWxCLENBQXNCeUcsUUFBUUMsSUFBOUI7QUFDQSxZQUFJTSxLQUFLUCxRQUFRUSxLQUFSLEVBQVQ7QUFDQSxZQUFJRCxHQUFHSyxRQUFILEVBQUosRUFBbUI7QUFDZmMsMEJBQWM5QyxhQUFkO0FBQ0g7QUFDRC9HLGlCQUFTNEksT0FBVCxDQUFpQmtCLDRCQUFqQjtBQUNILEtBUEQ7QUFRQWhELG1CQUFlaUIsY0FBZixJQUFpQyxVQUFDSSxPQUFELEVBQWE7QUFDMUMxRywwQkFBa0JDLEdBQWxCLENBQXNCeUcsUUFBUUMsSUFBOUI7QUFDSCxLQUZEOztBQUtBMkIsV0FBT0MsSUFBUCxDQUFZbEQsY0FBWixFQUE0Qm1ELE9BQTVCLENBQW9DLHFCQUFhO0FBQzdDOUksbUJBQVdvRixtQkFBWCxDQUErQjJELFNBQS9CLEVBQTBDcEQsZUFBZW9ELFNBQWYsQ0FBMUM7QUFDQS9JLG1CQUFXNEQsZ0JBQVgsQ0FBNEJtRixTQUE1QixFQUF1Q3BELGVBQWVvRCxTQUFmLENBQXZDO0FBQ0gsS0FIRDtBQUlBMUosU0FBSzJKLHFCQUFMLEdBQTZCLFVBQUNDLG1CQUFELEVBQXlCO0FBQ2xEbkMsNkJBQXFCbUMsbUJBQXJCO0FBQ0gsS0FGRDtBQUdBNUosU0FBSzJGLGVBQUwsR0FBdUIsWUFBTTtBQUN6QixlQUFPNkIsZ0JBQVA7QUFDSCxLQUZEO0FBR0F4SCxTQUFLNEYsVUFBTCxHQUFrQixZQUFNO0FBQ3BCLGVBQU84QixZQUFhQSxVQUFVYSxRQUFWLEVBQWIsR0FBb0MsSUFBM0M7QUFDSCxLQUZEO0FBR0F2SSxTQUFLeUQsT0FBTCxHQUFlLFlBQUs7QUFDaEJ4QywwQkFBa0JDLEdBQWxCLENBQXNCLDhCQUF0QjtBQUNBMUIsaUJBQVM0SSxPQUFULENBQWlCa0IsNEJBQWpCO0FBQ0FDLGVBQU9DLElBQVAsQ0FBWWxELGNBQVosRUFBNEJtRCxPQUE1QixDQUFvQyxxQkFBYTtBQUM3QzlJLHVCQUFXb0YsbUJBQVgsQ0FBK0IyRCxTQUEvQixFQUEwQ3BELGVBQWVvRCxTQUFmLENBQTFDO0FBQ0gsU0FGRDtBQUdILEtBTkQ7QUFPQSxXQUFPMUosSUFBUDtBQUVILENBckxEOztxQkF1TGVvRyxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM05mOztBQUNBOzs7Ozs7QUFKQTs7O0FBTU8sSUFBTXlELG9EQUFzQixTQUF0QkEsbUJBQXNCLENBQVNDLFlBQVQsRUFBdUI7QUFDdEQsUUFBR0Msd0JBQUVDLFNBQUYsQ0FBWUYsWUFBWixDQUFILEVBQTZCO0FBQ3pCLGVBQU9BLFlBQVA7QUFDSDtBQUNELFFBQUdBLGFBQWFHLGVBQWhCLEVBQWdDO0FBQzVCLGVBQU9ILGFBQWFHLGVBQWIsRUFBUDtBQUNILEtBRkQsTUFFTSxJQUFHSCxhQUFhSSxLQUFoQixFQUFzQjtBQUN4QixlQUFPSixhQUFhSSxLQUFwQjtBQUNIO0FBQ0QsV0FBTyxJQUFQO0FBQ0gsQ0FWTTs7QUFZQSxJQUFNQyxzQ0FBZSxTQUFmQSxZQUFlLENBQVNDLEdBQVQsRUFBYztBQUN0Qzs7QUFFQSxRQUFHQSxPQUFPQSxJQUFJQyxTQUFkLEVBQXdCO0FBQ3BCLGVBQU9ELElBQUlDLFNBQUosRUFBUDtBQUNILEtBRkQsTUFFSztBQUNELGVBQU8sS0FBUDtBQUNIO0FBQ0osQ0FSTTs7QUFVQSxJQUFNQyxzQ0FBZSxTQUFmQSxZQUFlLENBQVN6RixLQUFULEVBQWdCckYsUUFBaEIsRUFBeUI7QUFDakQsUUFBR0EsUUFBSCxFQUFZO0FBQ1JBLGlCQUFTc0ksUUFBVCxDQUFrQnlDLHNCQUFsQjtBQUNBL0ssaUJBQVN1QyxLQUFUO0FBQ0F2QyxpQkFBUzRJLE9BQVQsQ0FBaUJvQyxnQkFBakIsRUFBd0IzRixLQUF4QjtBQUNIO0FBRUosQ0FQTTs7QUFTQSxJQUFNNEYsZ0RBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsT0FBRCxFQUFVQyxhQUFWLEVBQXlCbEwsWUFBekIsRUFBMEM7QUFDdkUsUUFBSW1MLGNBQWNDLEtBQUtDLEdBQUwsQ0FBUyxDQUFULEVBQVlILGFBQVosQ0FBbEI7QUFDQSxRQUFNSSxRQUFPLEVBQWI7QUFDQSxRQUFJTCxPQUFKLEVBQWE7QUFDVCxhQUFLLElBQUlNLElBQUksQ0FBYixFQUFnQkEsSUFBSU4sUUFBUU8sTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLGdCQUFJTixRQUFRTSxDQUFSLFlBQUosRUFBd0I7QUFDcEJKLDhCQUFjSSxDQUFkO0FBQ0g7QUFDRCxnQkFBSXZMLGFBQWF5TCxjQUFiLE1BQWlDUixRQUFRTSxDQUFSLEVBQVdELEtBQVgsS0FBcUJ0TCxhQUFheUwsY0FBYixFQUExRCxFQUEwRjtBQUN0Rix1QkFBT0YsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU9KLFdBQVA7QUFDSCxDQWRNLEMiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX4yZWMxOTNhYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDA4LzA0LzIwMTkuXG4gKi9cbmltcG9ydCBBZHNFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2Fkcy9MaXN0ZW5lclwiO1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUiwgRVJST1JTLCBDT05URU5UX1ZPTFVNRSwgU1RBVEVfTE9BRElORywgSU5JVF9BRFNfRVJST1Jcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgQWRzID0gZnVuY3Rpb24oZWxWaWRlbywgcHJvdmlkZXIsIHBsYXllckNvbmZpZywgYWRUYWdVcmwsIGVycm9yQ2FsbGJhY2spe1xuICAgIC8vVG9kbyA6IG1vdmUgY3JlYXRlQWRDb250YWluZXIgdG8gTWVkaWFNYW5hZ2VyXG4gICAgY29uc3QgQVVUT1BMQVlfTk9UX0FMTE9XRUQgPSBcImF1dG9wbGF5Tm90QWxsb3dlZFwiO1xuICAgIGNvbnN0IEFETUFOR0VSX0xPQURJTkdfRVJST1IgPSBcImFkbWFuYWdlckxvYWRpbmdUaW1lb3V0XCI7XG4gICAgbGV0IEFEU19NQU5BR0VSX0xPQURFRCA9IFwiXCI7XG4gICAgbGV0IEFEX0VSUk9SID0gXCJcIjtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGFkc01hbmFnZXJMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgc3RhcnRlZDogZmFsc2UsIC8vcGxheWVyIHN0YXJ0ZWRcbiAgICAgICAgYWN0aXZlIDogZmFsc2UsIC8vb24gQWRcbiAgICAgICAgaXNWaWRlb0VuZGVkIDogZmFsc2UsXG4gICAgICAgIGNoZWNrQXV0b3BsYXlTdGFydCA6IHRydWVcbiAgICB9O1xuICAgIGxldCBPbkFkRXJyb3IgPSBudWxsO1xuICAgIGxldCBPbk1hbmFnZXJMb2FkZWQgPSBudWxsO1xuXG4gICAgbGV0IGFkRGlzcGxheUNvbnRhaW5lciA9IG51bGw7XG4gICAgbGV0IGFkc0xvYWRlciA9IG51bGw7XG4gICAgbGV0IGFkc01hbmFnZXIgPSBudWxsO1xuICAgIGxldCBsaXN0ZW5lciA9IG51bGw7XG4gICAgbGV0IGFkc1JlcXVlc3QgPSBudWxsO1xuICAgIGxldCBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZSwgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG5cblxuICAgIC8vIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0QXV0b1BsYXlBZEJyZWFrcyhmYWxzZSk7XG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldFZwYWlkTW9kZShnb29nbGUuaW1hLkltYVNka1NldHRpbmdzLlZwYWlkTW9kZS5FTkFCTEVEKTtcblxuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUoJ2tvJyk7XG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldFZwYWlkTW9kZShnb29nbGUuaW1hLkltYVNka1NldHRpbmdzLlZwYWlkTW9kZS5FTkFCTEVEKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xuXG5cbiAgICB0cnl7XG4gICAgICAgIEFEU19NQU5BR0VSX0xPQURFRCA9IGdvb2dsZS5pbWEuQWRzTWFuYWdlckxvYWRlZEV2ZW50LlR5cGUuQURTX01BTkFHRVJfTE9BREVEO1xuICAgICAgICBBRF9FUlJPUiA9IGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1I7XG4gICAgICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0TG9jYWxlKFwia29cIik7XG4gICAgICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xuXG5cblxuXG4gICAgICAgIGNvbnN0IGNyZWF0ZUFkQ29udGFpbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ292cC1hZHMnKTtcbiAgICAgICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnb3ZwLWFkcycpO1xuICAgICAgICAgICAgcGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpLmFwcGVuZChhZENvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcbiAgICAgICAgfTtcbiAgICAgICAgT25BZEVycm9yID0gZnVuY3Rpb24oYWRFcnJvckV2ZW50KXtcbiAgICAgICAgICAgIC8vbm90ZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldElubmVyRXJyb3IoKS5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSAmIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSA9PT0gNDAwIGlzIEJyb3dzZXIgVXNlciBJbnRlcmFjdGl2ZSBlcnJvci5cblxuICAgICAgICAgICAgLy9EbyBub3QgdHJpZ2dlcmluZyBFUlJPUi4gYmVjdWFzZSBJdCBqdXN0IEFEIVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRWYXN0RXJyb3JDb2RlKCksIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldE1lc3NhZ2UoKSk7XG5cbiAgICAgICAgICAgIGxldCBpbm5lckVycm9yID0gYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpO1xuICAgICAgICAgICAgaWYoaW5uZXJFcnJvcil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5uZXJFcnJvci5nZXRFcnJvckNvZGUoKSwgaW5uZXJFcnJvci5nZXRNZXNzYWdlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFkc01hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwZWMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuXG4gICAgICAgICAgICAvKmlmKGlubmVyRXJyb3IgJiYgaW5uZXJFcnJvci5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSl7XG4gICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICB9Ki9cblxuXG4gICAgICAgIH07XG4gICAgICAgIE9uTWFuYWdlckxvYWRlZCA9IGZ1bmN0aW9uKGFkc01hbmFnZXJMb2FkZWRFdmVudCl7XG4gICAgICAgICAgICBsZXQgYWRzUmVuZGVyaW5nU2V0dGluZ3MgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZW5kZXJpbmdTZXR0aW5ncygpO1xuICAgICAgICAgICAgYWRzUmVuZGVyaW5nU2V0dGluZ3MucmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICAvL2Fkc1JlbmRlcmluZ1NldHRpbmdzLnVzZVN0eWxlZE5vbkxpbmVhckFkcyA9IHRydWU7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyID0gYWRzTWFuYWdlckxvYWRlZEV2ZW50LmdldEFkc01hbmFnZXIoZWxWaWRlbywgYWRzUmVuZGVyaW5nU2V0dGluZ3MpO1xuXG5cbiAgICAgICAgICAgIGxpc3RlbmVyID0gQWRzRXZlbnRzTGlzdGVuZXIoYWRzTWFuYWdlciwgcHJvdmlkZXIsIHNwZWMsIE9uQWRFcnJvcik7XG5cbiAgICAgICAgICAgIHByb3ZpZGVyLm9uKENPTlRFTlRfVk9MVU1FLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5tdXRlKXtcbiAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zZXRWb2x1bWUoMCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc2V0Vm9sdW1lKGRhdGEudm9sdW1lLzEwMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCB0aGF0KTtcblxuICAgICAgICAgICAgYWRzTWFuYWdlckxvYWRlZCA9IHRydWU7XG5cbiAgICAgICAgfTtcblxuXG4gICAgICAgIGFkRGlzcGxheUNvbnRhaW5lciA9IG5ldyBnb29nbGUuaW1hLkFkRGlzcGxheUNvbnRhaW5lcihjcmVhdGVBZENvbnRhaW5lcigpLCBlbFZpZGVvKTtcbiAgICAgICAgYWRzTG9hZGVyID0gbmV3IGdvb2dsZS5pbWEuQWRzTG9hZGVyKGFkRGlzcGxheUNvbnRhaW5lcik7XG5cbiAgICAgICAgYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQURTX01BTkFHRVJfTE9BREVELCBPbk1hbmFnZXJMb2FkZWQsIGZhbHNlKTtcbiAgICAgICAgYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQURfRVJST1IsIE9uQWRFcnJvciwgZmFsc2UpO1xuXG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdFJlcXVlc3QoKXtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQXV0b1BsYXkgU3VwcG9ydCA6IFwiLCBcImF1dG9wbGF5QWxsb3dlZFwiLGF1dG9wbGF5QWxsb3dlZCwgXCJhdXRvcGxheVJlcXVpcmVzTXV0ZWRcIixhdXRvcGxheVJlcXVpcmVzTXV0ZWQpO1xuXG4gICAgICAgICAgICBhZHNSZXF1ZXN0ID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVxdWVzdCgpO1xuXG4gICAgICAgICAgICBhZHNSZXF1ZXN0LmZvcmNlTm9uTGluZWFyRnVsbFNsb3QgPSBmYWxzZTtcbiAgICAgICAgICAgIC8qaWYocGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5icm93c2VyID09PSBcIlNhZmFyaVwiICYmIHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgPT09IFwiaU9TXCIgKXtcbiAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxBdXRvUGxheShhdXRvcGxheUFsbG93ZWQpO1xuICAgICAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxQbGF5TXV0ZWQoYXV0b3BsYXlSZXF1aXJlc011dGVkKTtcbiAgICAgICAgICAgIGFkc1JlcXVlc3QuYWRUYWdVcmwgPSBhZFRhZ1VybDtcblxuICAgICAgICAgICAgYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7XG5cbiAgICAgICAgICAgIC8vdHdvIHdheSB3aGF0IGFkIHN0YXJ0cy5cbiAgICAgICAgICAgIC8vYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7IG9yICBhZHNNYW5hZ2VyLnN0YXJ0KCk7XG4gICAgICAgICAgICAvL3doYXQ/IHdoeT8/IHd0aD8/XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjaGVja0F1dG9wbGF5U3VwcG9ydCgpIHtcbiAgICAgICAgICAgIGlmKCFlbFZpZGVvLnBsYXkpe1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBsYXlQcm9taXNlID0gZWxWaWRlby5wbGF5KCk7XG4gICAgICAgICAgICBpZiAocGxheVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHBsYXlQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCB1bm11dGVkIGF1dG9wbGF5IHdvcmtzLlxuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMuY2hlY2tBdXRvcGxheVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLmJyb3dzZXIgID09PSBcIlNhZmFyaVwiIHx8IHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgID09PSBcImlPU1wiIHx8IHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgID09PSBcIkFuZHJvaWRcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgbXV0ZWQgYXV0byBzdGFydC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAvL0kgZG9uJ3QgbmVlZCBmb3IgdGhpcyB2ZXJzaW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwbGF5UHJvbWlzZSA9IGVsVmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXlQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5UHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCBtdXRlZCBhdXRvcGxheSB3b3JrcyBidXQgdW5tdXRlZCBhdXRvcGxheSBkb2VzIG5vdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLmNoZWNrQXV0b3BsYXlTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBtdXRlZCBhbmQgdW5tdXRlZCBhdXRvcGxheSBmYWlsZWQuIEZhbGwgYmFjayB0byBjbGljayB0byBwbGF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vTWF5YmUgdGhpcyBpcyBJRTExLi4uLlxuICAgICAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNwZWMuY2hlY2tBdXRvcGxheVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGVja0F1dG9wbGF5U3VwcG9ydCgpO1xuXG4gICAgICAgIHRoYXQuaXNBY3RpdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5hY3RpdmU7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuc3RhcnRlZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnN0YXJ0ZWQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQucGxheSA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG5cbiAgICAgICAgICAgIGlmKHNwZWMuc3RhcnRlZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5yZXN1bWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrQWRzTWFuYWdlcklzUmVhZHkoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhZHNNYW5hZ2VyTG9hZGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkgJiYgIWF1dG9wbGF5QWxsb3dlZCkgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoQVVUT1BMQVlfTk9UX0FMTE9XRUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Eb24ndCBwbGF5aW5nIHZpZGVvIHdoZW4gcGxheWVyIGNvbXBsZXRlIHBsYXlpbmcgQUQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vT25seSBpT1MgU2FmYXJpIEZpcnN0IGxvYWRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyAgPT09IFwiaU9TXCIgfHwgcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyAgPT09IFwiQW5kcm9pZFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkRGlzcGxheUNvbnRhaW5lci5pbml0aWFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuaW5pdChcIjEwMCVcIiwgXCIxMDAlXCIsIGdvb2dsZS5pbWEuVmlld01vZGUuTk9STUFMKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDMwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihBRE1BTkdFUl9MT0FESU5HX0VSUk9SKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xuICAgICAgICAgICAgYWRzTWFuYWdlci5wYXVzZSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LnZpZGVvRW5kZWRDYWxsYmFjayA9IChjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgLy9saXN0ZW5lci5pc0xpbmVhckFkIDogZ2V0IGN1cnJlbnQgYWQncyBzdGF0dXMgd2hldGhlciBsaW5lYXIgYWQgb3Igbm90LlxuICAgICAgICAgICAgaWYobGlzdGVuZXIuaXNBbGxBZENvbXBsZXRlKCkgfHwgIWxpc3RlbmVyLmlzTGluZWFyQWQoKSl7XG4gICAgICAgICAgICAgICAgY29tcGxldGVDb250ZW50Q2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vUG9zdCAtIFJvbGwg7J2EIOyerOyDne2VmOq4sCDsnITtlbTshJzripQg7L2Y7YWQ7Lig6rCAIOuBneuCrOydjOydhCBhZHNMb2FkZXLsl5Dqsowg7JWM66Ck7JW8IO2VnOuLpFxuICAgICAgICAgICAgICAgIHNwZWMuaXNWaWRlb0VuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIuY29udGVudENvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuaXNBdXRvUGxheVN1cHBvcnRDaGVja1RpbWUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYoYWRzTG9hZGVyKXtcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBRFNfTUFOQUdFUl9MT0FERUQsIE9uTWFuYWdlckxvYWRlZCk7XG4gICAgICAgICAgICAgICAgYWRzTG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQURfRVJST1IsIE9uQWRFcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGFkc01hbmFnZXIpe1xuICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihhZERpc3BsYXlDb250YWluZXIpe1xuICAgICAgICAgICAgICAgIGFkRGlzcGxheUNvbnRhaW5lci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGxpc3RlbmVyKXtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCAkYWRzID0gTEEkKHBsYXllckNvbmZpZy5nZXRDb250YWluZXIoKSkuZmluZChcIi5vdnAtYWRzXCIpO1xuICAgICAgICAgICAgaWYoJGFkcyl7XG4gICAgICAgICAgICAgICAgJGFkcy5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvdmlkZXIub2ZmKENPTlRFTlRfVk9MVU1FLCBudWxsLCB0aGF0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoYXQ7XG5cbiAgICB9Y2F0Y2ggKGVycm9yKXtcbiAgICAgICAgLy9sZXQgdGVtcEVycm9yID0gRVJST1JTW0lOSVRfQURTX0VSUk9SXTtcbiAgICAgICAgLy90ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgLy9lcnJvckNhbGxiYWNrKHRlbXBFcnJvcik7XG4gICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IEFkczsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAxMC8wNC8yMDE5LlxuICovXG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcbmltcG9ydCB7XG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9BRF9MT0FERUQsXG4gICAgU1RBVEVfQURfUExBWUlORyxcbiAgICBTVEFURV9BRF9QQVVTRUQsXG4gICAgU1RBVEVfQURfQ09NUExFVEUsXG4gICAgQURfQ0hBTkdFRCxcbiAgICBBRF9USU1FLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihhZHNNYW5hZ2VyLCBwcm92aWRlciwgYWRzU3BlYywgT25BZEVycm9yKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xuXG4gICAgbGV0IGludGVydmFsVGltZXIgPSBudWxsO1xuXG4gICAgY29uc3QgQURfQlVGRkVSSU5HID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQURfQlVGRkVSSU5HO1xuICAgIGNvbnN0IENPTlRFTlRfUEFVU0VfUkVRVUVTVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQ7XG4gICAgY29uc3QgQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEO1xuICAgIGNvbnN0IEFEX0VSUk9SID0gZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUjtcbiAgICBjb25zdCBBTExfQURTX0NPTVBMRVRFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFMTF9BRFNfQ09NUExFVEVEO1xuICAgIGNvbnN0IENMSUNLID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ0xJQ0s7XG4gICAgY29uc3QgU0tJUFBFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNLSVBQRUQ7XG4gICAgY29uc3QgQ09NUExFVEUgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT01QTEVURTtcbiAgICBjb25zdCBGSVJTVF9RVUFSVElMRT0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuRklSU1RfUVVBUlRJTEU7XG4gICAgY29uc3QgTE9BREVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVEO1xuICAgIGNvbnN0IE1JRFBPSU5UPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5NSURQT0lOVDtcbiAgICBjb25zdCBQQVVTRUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5QQVVTRUQ7XG4gICAgY29uc3QgUkVTVU1FRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlJFU1VNRUQ7XG4gICAgY29uc3QgU1RBUlRFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQ7XG4gICAgY29uc3QgVVNFUl9DTE9TRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlVTRVJfQ0xPU0U7XG4gICAgY29uc3QgVEhJUkRfUVVBUlRJTEUgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5USElSRF9RVUFSVElMRTtcblxuICAgIGxldCBpc0FsbEFkQ29tcGVsZXRlID0gZmFsc2U7ICAgLy9Qb3N0IHJvbGzsnYQg7JyE7ZW0XG4gICAgbGV0IGFkQ29tcGxldGVDYWxsYmFjayA9IG51bGw7XG4gICAgbGV0IGN1cnJlbnRBZCA9IG51bGw7XG5cbiAgICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9QQVVTRV9SRVFVRVNURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIC8vVGhpcyBjYWxsbHMgd2hlbiBwbGF5ZXIgaXMgcGxheWluZyBjb250ZW50cyBmb3IgYWQuXG4gICAgICAgICBpZihhZHNTcGVjLnN0YXJ0ZWQpe1xuICAgICAgICAgICAgIGFkc1NwZWMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzW0NPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgLy9UaGlzIGNhbGxzIHdoZW4gb25lIGFkIGVuZGVkLlxuICAgICAgICAvL0FuZCB0aGlzIGlzIHNpZ25hbCB3aGF0IHBsYXkgdGhlIGNvbnRlbnRzLlxuICAgICAgICBhZHNTcGVjLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmKGFkc1NwZWMuc3RhcnRlZCAmJiAocHJvdmlkZXIuZ2V0UG9zaXRpb24oKSA9PT0gMCB8fCAhYWRzU3BlYy5pc1ZpZGVvRW5kZWQpICApe1xuICAgICAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0FEX0VSUk9SXSA9IE9uQWRFcnJvcjtcblxuICAgIGxvd0xldmVsRXZlbnRzW0FMTF9BRFNfQ09NUExFVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBpc0FsbEFkQ29tcGVsZXRlID0gdHJ1ZTtcbiAgICAgICAgaWYoYWRzU3BlYy5pc1ZpZGVvRW5kZWQpe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tDTElDS10gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0ZJUlNUX1FVQVJUSUxFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgLy9cbiAgICBsb3dMZXZlbEV2ZW50c1tBRF9CVUZGRVJJTkddID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURfQlVGRkVSSU5HXCIsYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0xPQURFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IHJlbWFpbmluZ1RpbWUgPSBhZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICAvKnZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgdHlwZSA6XCJhZFwiXG4gICAgICAgIH07Ki9cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9MT0FERUQsIHtyZW1haW5pbmcgOiByZW1haW5pbmdUaW1lLCBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgfSk7XG5cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW01JRFBPSU5UXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbUEFVU0VEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QQVVTRUQpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbUkVTVU1FRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHNbU1RBUlRFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBjdXJyZW50QWQgPSBhZDtcblxuICAgICAgICBsZXQgYWRPYmplY3QgPSB7XG4gICAgICAgICAgICBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgLFxuICAgICAgICAgICAgZHVyYXRpb24gOiBhZC5nZXREdXJhdGlvbigpLFxuICAgICAgICAgICAgc2tpcFRpbWVPZmZzZXQgOiBhZC5nZXRTa2lwVGltZU9mZnNldCgpICAgICAvL1RoZSBudW1iZXIgb2Ygc2Vjb25kcyBvZiBwbGF5YmFjayBiZWZvcmUgdGhlIGFkIGJlY29tZXMgc2tpcHBhYmxlLlxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEFEX0NIQU5HRUQsIGFkT2JqZWN0KTtcblxuXG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG5cbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xuICAgICAgICAgICAgYWRzU3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIEZvciBhIGxpbmVhciBhZCwgYSB0aW1lciBjYW4gYmUgc3RhcnRlZCB0byBwb2xsIGZvclxuICAgICAgICAgICAgLy8gdGhlIHJlbWFpbmluZyB0aW1lLlxuICAgICAgICAgICAgaW50ZXJ2YWxUaW1lciA9IHNldEludGVydmFsKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZHVyYXRpb24gPSBhZC5nZXREdXJhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfVElNRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24gOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBUaW1lT2Zmc2V0IDogYWQuZ2V0U2tpcFRpbWVPZmZzZXQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZyA6IHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA6IGR1cmF0aW9uIC0gcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBwYWJsZSA6IGFkc01hbmFnZXIuZ2V0QWRTa2lwcGFibGVTdGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMzAwKTsgLy8gZXZlcnkgMzAwbXNcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0NPTVBMRVRFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgLy9Vc2VyIHNraXBwZWQgYWQuIHNhbWUgcHJvY2VzcyBvbiBjb21wbGV0ZS5cbiAgICBsb3dMZXZlbEV2ZW50c1tTS0lQUEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuXG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tVU0VSX0NMT1NFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbVEhJUkRfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcblxuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuICAgIHRoYXQuc2V0QWRDb21wbGV0ZUNhbGxiYWNrID0gKF9hZENvbXBsZXRlQ2FsbGJhY2spID0+IHtcbiAgICAgICAgYWRDb21wbGV0ZUNhbGxiYWNrID0gX2FkQ29tcGxldGVDYWxsYmFjaztcbiAgICB9O1xuICAgIHRoYXQuaXNBbGxBZENvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaXNBbGxBZENvbXBlbGV0ZTtcbiAgICB9O1xuICAgIHRoYXQuaXNMaW5lYXJBZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRBZCAgPyBjdXJyZW50QWQuaXNMaW5lYXIoKSA6IHRydWU7XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQWRzRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDEyLi5cbiAqL1xuaW1wb3J0IHtFUlJPUiwgU1RBVEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnRPck1zZSkge1xuICAgIGlmKF8uaXNFbGVtZW50KGVsZW1lbnRPck1zZSkpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlO1xuICAgIH1cbiAgICBpZihlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQoKTtcbiAgICB9ZWxzZSBpZihlbGVtZW50T3JNc2UubWVkaWEpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLm1lZGlhO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUxpdmUgPSBmdW5jdGlvbihtc2UpIHtcbiAgICAvL1RvRG8gOiBZb3UgY29uc2lkZXIgaGxzanMuIEJ1dCBub3Qgbm93IGJlY2F1c2Ugd2UgZG9uJ3Qgc3VwcG9ydCBobHNqcy5cblxuICAgIGlmKG1zZSAmJiBtc2UuaXNEeW5hbWljKXtcbiAgICAgICAgcmV0dXJuIG1zZS5pc0R5bmFtaWMoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBlcnJvclRyaWdnZXIgPSBmdW5jdGlvbihlcnJvciwgcHJvdmlkZXIpe1xuICAgIGlmKHByb3ZpZGVyKXtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xuICAgIH1cblxufTtcblxuZXhwb3J0IGNvbnN0IHBpY2tDdXJyZW50U291cmNlID0gKHNvdXJjZXMsIGN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZykgPT4ge1xuICAgIGxldCBzb3VyY2VJbmRleCA9IE1hdGgubWF4KDAsIGN1cnJlbnRTb3VyY2UpO1xuICAgIGNvbnN0IGxhYmVsID1cIlwiO1xuICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc291cmNlSW5kZXg7XG59OyJdLCJzb3VyY2VSb290IjoiIn0=