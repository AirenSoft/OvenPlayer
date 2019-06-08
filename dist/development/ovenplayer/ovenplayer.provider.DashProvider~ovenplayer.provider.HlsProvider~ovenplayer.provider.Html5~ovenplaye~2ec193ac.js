/*! OvenPlayerv0.9.5961 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
            if (autoplayRequiresMuted) {
                sendWarningMessageForMutedPlay();
            }
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
            if (listener && (listener.isAllAdComplete() || !listener.isLinearAd())) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Fkcy9BZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9hZHMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci91dGlscy5qcyJdLCJuYW1lcyI6WyJBZHMiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsImVycm9yQ2FsbGJhY2siLCJBVVRPUExBWV9OT1RfQUxMT1dFRCIsIkFETUFOR0VSX0xPQURJTkdfRVJST1IiLCJBRFNfTUFOQUdFUl9MT0FERUQiLCJBRF9FUlJPUiIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJjaGVja0F1dG9wbGF5U3RhcnQiLCJPbkFkRXJyb3IiLCJPbk1hbmFnZXJMb2FkZWQiLCJhZERpc3BsYXlDb250YWluZXIiLCJhZHNMb2FkZXIiLCJhZHNNYW5hZ2VyIiwibGlzdGVuZXIiLCJhZHNSZXF1ZXN0IiwiYXV0b3BsYXlBbGxvd2VkIiwiYXV0b3BsYXlSZXF1aXJlc011dGVkIiwic2VuZFdhcm5pbmdNZXNzYWdlRm9yTXV0ZWRQbGF5IiwidHJpZ2dlciIsIlBMQVlFUl9XQVJOSU5HIiwibWVzc2FnZSIsIldBUk5fTVNHX01VVEVEUExBWSIsInRpbWVyIiwiaWNvbkNsYXNzIiwiVUlfSUNPTlMiLCJ2b2x1bWVfbXV0ZSIsIm9uQ2xpY2tDYWxsYmFjayIsInNldE11dGUiLCJpbml0UmVxdWVzdCIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZ29vZ2xlIiwiaW1hIiwiQWRzUmVxdWVzdCIsImZvcmNlTm9uTGluZWFyRnVsbFNsb3QiLCJzZXRBZFdpbGxBdXRvUGxheSIsInNldEFkV2lsbFBsYXlNdXRlZCIsInJlcXVlc3RBZHMiLCJjaGVja0F1dG9wbGF5U3VwcG9ydCIsInBsYXkiLCJwbGF5UHJvbWlzZSIsInVuZGVmaW5lZCIsInRoZW4iLCJwYXVzZSIsIm11dGVkIiwiQWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiVHlwZSIsIkFkRXJyb3JFdmVudCIsInNldHRpbmdzIiwic2V0TG9jYWxlIiwic2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzIiwiY3JlYXRlQWRDb250YWluZXIiLCJhZENvbnRhaW5lciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImdldENvbnRhaW5lciIsImFwcGVuZCIsImFkRXJyb3JFdmVudCIsImNvbnNvbGUiLCJnZXRFcnJvciIsImdldFZhc3RFcnJvckNvZGUiLCJnZXRNZXNzYWdlIiwiaW5uZXJFcnJvciIsImdldElubmVyRXJyb3IiLCJnZXRFcnJvckNvZGUiLCJkZXN0cm95IiwiYWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiYWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJBZHNSZW5kZXJpbmdTZXR0aW5ncyIsInJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUiLCJnZXRBZHNNYW5hZ2VyIiwib24iLCJDT05URU5UX1ZPTFVNRSIsImRhdGEiLCJtdXRlIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwiQWREaXNwbGF5Q29udGFpbmVyIiwiQWRzTG9hZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImlzQWN0aXZlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXN1bWUiLCJlcnJvciIsInJldHJ5Q291bnQiLCJjaGVja0Fkc01hbmFnZXJJc1JlYWR5IiwiaXNBdXRvU3RhcnQiLCJFcnJvciIsImluaXRpYWxpemUiLCJpbml0IiwiVmlld01vZGUiLCJOT1JNQUwiLCJzdGFydCIsInNldFRpbWVvdXQiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJjb21wbGV0ZUNvbnRlbnRDYWxsYmFjayIsImlzQWxsQWRDb21wbGV0ZSIsImlzTGluZWFyQWQiLCJjb250ZW50Q29tcGxldGUiLCJpc0F1dG9QbGF5U3VwcG9ydENoZWNrVGltZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCIkYWRzIiwiZmluZCIsInJlbW92ZSIsIm9mZiIsIkxpc3RlbmVyIiwiYWRzU3BlYyIsImxvd0xldmVsRXZlbnRzIiwiaW50ZXJ2YWxUaW1lciIsIkFEX0JVRkZFUklORyIsIkFkRXZlbnQiLCJDT05URU5UX1BBVVNFX1JFUVVFU1RFRCIsIkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCIsIkFMTF9BRFNfQ09NUExFVEVEIiwiQ0xJQ0siLCJTS0lQUEVEIiwiQ09NUExFVEUiLCJGSVJTVF9RVUFSVElMRSIsIkxPQURFRCIsIk1JRFBPSU5UIiwiUEFVU0VEIiwiUkVTVU1FRCIsIlNUQVJURUQiLCJVU0VSX0NMT1NFIiwiVEhJUkRfUVVBUlRJTEUiLCJpc0FsbEFkQ29tcGVsZXRlIiwiYWRDb21wbGV0ZUNhbGxiYWNrIiwiY3VycmVudEFkIiwiYWRFdmVudCIsInR5cGUiLCJnZXRQb3NpdGlvbiIsInNldFN0YXRlIiwiU1RBVEVfQ09NUExFVEUiLCJyZW1haW5pbmdUaW1lIiwiZ2V0UmVtYWluaW5nVGltZSIsImFkIiwiZ2V0QWQiLCJTVEFURV9BRF9MT0FERUQiLCJyZW1haW5pbmciLCJpc0xpbmVhciIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX1BMQVlJTkciLCJhZE9iamVjdCIsImR1cmF0aW9uIiwiZ2V0RHVyYXRpb24iLCJza2lwVGltZU9mZnNldCIsImdldFNraXBUaW1lT2Zmc2V0IiwiQURfQ0hBTkdFRCIsInNldEludGVydmFsIiwiQURfVElNRSIsInBvc2l0aW9uIiwic2tpcHBhYmxlIiwiZ2V0QWRTa2lwcGFibGVTdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJTVEFURV9BRF9DT01QTEVURSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwic2V0QWRDb21wbGV0ZUNhbGxiYWNrIiwiX2FkQ29tcGxldGVDYWxsYmFjayIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJlbGVtZW50T3JNc2UiLCJfIiwiaXNFbGVtZW50IiwiZ2V0VmlkZW9FbGVtZW50IiwibWVkaWEiLCJzZXBhcmF0ZUxpdmUiLCJtc2UiLCJpc0R5bmFtaWMiLCJlcnJvclRyaWdnZXIiLCJTVEFURV9FUlJPUiIsIkVSUk9SIiwicGlja0N1cnJlbnRTb3VyY2UiLCJzb3VyY2VzIiwiY3VycmVudFNvdXJjZSIsInNvdXJjZUluZGV4IiwiTWF0aCIsIm1heCIsImxhYmVsIiwiaSIsImxlbmd0aCIsImdldFNvdXJjZUluZGV4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQU5BOzs7QUFnQkEsSUFBTUEsTUFBTSxTQUFOQSxHQUFNLENBQVNDLE9BQVQsRUFBa0JDLFFBQWxCLEVBQTRCQyxZQUE1QixFQUEwQ0MsUUFBMUMsRUFBb0RDLGFBQXBELEVBQWtFO0FBQzFFO0FBQ0EsUUFBTUMsdUJBQXVCLG9CQUE3QjtBQUNBLFFBQU1DLHlCQUF5Qix5QkFBL0I7QUFDQSxRQUFJQyxxQkFBcUIsRUFBekI7QUFDQSxRQUFJQyxXQUFXLEVBQWY7O0FBRUEsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsT0FBTztBQUNQQyxpQkFBUyxLQURGLEVBQ1M7QUFDaEJDLGdCQUFTLEtBRkYsRUFFUztBQUNoQkMsc0JBQWUsS0FIUjtBQUlQQyw0QkFBcUI7QUFKZCxLQUFYO0FBTUEsUUFBSUMsWUFBWSxJQUFoQjtBQUNBLFFBQUlDLGtCQUFrQixJQUF0Qjs7QUFFQSxRQUFJQyxxQkFBcUIsSUFBekI7QUFDQSxRQUFJQyxZQUFZLElBQWhCO0FBQ0EsUUFBSUMsYUFBYSxJQUFqQjtBQUNBLFFBQUlDLFdBQVcsSUFBZjtBQUNBLFFBQUlDLGFBQWEsSUFBakI7QUFDQSxRQUFJQyxrQkFBa0IsS0FBdEI7QUFBQSxRQUE2QkMsd0JBQXdCLEtBQXJEOztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTUMsaUNBQWlDLFNBQWpDQSw4QkFBaUMsR0FB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YztBQUN0Qzs7QUFFQSxRQUFHQSxPQUFPQSxJQUFJQyxTQUFkLEVBQXdCO0FBQ3BCLGVBQU9ELElBQUlDLFNBQUosRUFBUDtBQUNILEtBRkQsTUFFSztBQUNELGVBQU8sS0FBUDtBQUNIO0FBQ0osQ0FSTTs7QUFVQSxJQUFNQyxzQ0FBZSxTQUFmQSxZQUFlLENBQVN2RixLQUFULEVBQWdCN0YsUUFBaEIsRUFBeUI7QUFDakQsUUFBR0EsUUFBSCxFQUFZO0FBQ1JBLGlCQUFTNkksUUFBVCxDQUFrQndDLHNCQUFsQjtBQUNBckwsaUJBQVNrRCxLQUFUO0FBQ0FsRCxpQkFBU3lCLE9BQVQsQ0FBaUI2SixnQkFBakIsRUFBd0J6RixLQUF4QjtBQUNIO0FBRUosQ0FQTTs7QUFTQSxJQUFNMEYsZ0RBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsT0FBRCxFQUFVQyxhQUFWLEVBQXlCeEwsWUFBekIsRUFBMEM7QUFDdkUsUUFBSXlMLGNBQWNDLEtBQUtDLEdBQUwsQ0FBUyxDQUFULEVBQVlILGFBQVosQ0FBbEI7QUFDQSxRQUFNSSxRQUFPLEVBQWI7QUFDQSxRQUFJTCxPQUFKLEVBQWE7QUFDVCxhQUFLLElBQUlNLElBQUksQ0FBYixFQUFnQkEsSUFBSU4sUUFBUU8sTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLGdCQUFJTixRQUFRTSxDQUFSLFlBQUosRUFBd0I7QUFDcEJKLDhCQUFjSSxDQUFkO0FBQ0g7QUFDRCxnQkFBSTdMLGFBQWErTCxjQUFiLE9BQWtDRixDQUF0QyxFQUEwQztBQUN0Qyx1QkFBT0EsQ0FBUDtBQUNIO0FBQ0Q7OztBQUdIO0FBQ0o7QUFDRCxXQUFPSixXQUFQO0FBQ0gsQ0FqQk0sQyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMDgvMDQvMjAxOS5cbiAqL1xuaW1wb3J0IEFkc0V2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvYWRzL0xpc3RlbmVyXCI7XG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIEVSUk9SLCBFUlJPUlMsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBJTklUX0FEU19FUlJPUixcbiAgICBQTEFZRVJfV0FSTklORyxcbiAgICBXQVJOX01TR19NVVRFRFBMQVksXG4gICAgVUlfSUNPTlNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgQWRzID0gZnVuY3Rpb24oZWxWaWRlbywgcHJvdmlkZXIsIHBsYXllckNvbmZpZywgYWRUYWdVcmwsIGVycm9yQ2FsbGJhY2spe1xuICAgIC8vVG9kbyA6IG1vdmUgY3JlYXRlQWRDb250YWluZXIgdG8gTWVkaWFNYW5hZ2VyXG4gICAgY29uc3QgQVVUT1BMQVlfTk9UX0FMTE9XRUQgPSBcImF1dG9wbGF5Tm90QWxsb3dlZFwiO1xuICAgIGNvbnN0IEFETUFOR0VSX0xPQURJTkdfRVJST1IgPSBcImFkbWFuYWdlckxvYWRpbmdUaW1lb3V0XCI7XG4gICAgbGV0IEFEU19NQU5BR0VSX0xPQURFRCA9IFwiXCI7XG4gICAgbGV0IEFEX0VSUk9SID0gXCJcIjtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGFkc01hbmFnZXJMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgc3RhcnRlZDogZmFsc2UsIC8vcGxheWVyIHN0YXJ0ZWRcbiAgICAgICAgYWN0aXZlIDogZmFsc2UsIC8vb24gQWRcbiAgICAgICAgaXNWaWRlb0VuZGVkIDogZmFsc2UsXG4gICAgICAgIGNoZWNrQXV0b3BsYXlTdGFydCA6IHRydWVcbiAgICB9O1xuICAgIGxldCBPbkFkRXJyb3IgPSBudWxsO1xuICAgIGxldCBPbk1hbmFnZXJMb2FkZWQgPSBudWxsO1xuXG4gICAgbGV0IGFkRGlzcGxheUNvbnRhaW5lciA9IG51bGw7XG4gICAgbGV0IGFkc0xvYWRlciA9IG51bGw7XG4gICAgbGV0IGFkc01hbmFnZXIgPSBudWxsO1xuICAgIGxldCBsaXN0ZW5lciA9IG51bGw7XG4gICAgbGV0IGFkc1JlcXVlc3QgPSBudWxsO1xuICAgIGxldCBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZSwgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG5cblxuICAgIC8vIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0QXV0b1BsYXlBZEJyZWFrcyhmYWxzZSk7XG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldFZwYWlkTW9kZShnb29nbGUuaW1hLkltYVNka1NldHRpbmdzLlZwYWlkTW9kZS5FTkFCTEVEKTtcblxuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUoJ2tvJyk7XG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldFZwYWlkTW9kZShnb29nbGUuaW1hLkltYVNka1NldHRpbmdzLlZwYWlkTW9kZS5FTkFCTEVEKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xuICAgIGNvbnN0IHNlbmRXYXJuaW5nTWVzc2FnZUZvck11dGVkUGxheSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoUExBWUVSX1dBUk5JTkcsIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgOiBXQVJOX01TR19NVVRFRFBMQVksXG4gICAgICAgICAgICB0aW1lciA6IDEwICogMTAwMCxcbiAgICAgICAgICAgIGljb25DbGFzcyA6IFVJX0lDT05TLnZvbHVtZV9tdXRlLFxuICAgICAgICAgICAgb25DbGlja0NhbGxiYWNrIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRNdXRlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgdHJ5e1xuICAgICAgICBBRFNfTUFOQUdFUl9MT0FERUQgPSBnb29nbGUuaW1hLkFkc01hbmFnZXJMb2FkZWRFdmVudC5UeXBlLkFEU19NQU5BR0VSX0xPQURFRDtcbiAgICAgICAgQURfRVJST1IgPSBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SO1xuICAgICAgICBnb29nbGUuaW1hLnNldHRpbmdzLnNldExvY2FsZShcImtvXCIpO1xuICAgICAgICBnb29nbGUuaW1hLnNldHRpbmdzLnNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyh0cnVlKTtcblxuXG5cblxuICAgICAgICBjb25zdCBjcmVhdGVBZENvbnRhaW5lciA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdvdnAtYWRzJyk7XG4gICAgICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ292cC1hZHMnKTtcbiAgICAgICAgICAgIHBsYXllckNvbmZpZy5nZXRDb250YWluZXIoKS5hcHBlbmQoYWRDb250YWluZXIpO1xuXG4gICAgICAgICAgICByZXR1cm4gYWRDb250YWluZXI7XG4gICAgICAgIH07XG4gICAgICAgIE9uQWRFcnJvciA9IGZ1bmN0aW9uKGFkRXJyb3JFdmVudCl7XG4gICAgICAgICAgICAvL25vdGUgOiBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRJbm5lckVycm9yKCkuZ2V0RXJyb3JDb2RlKCkgPT09IDEyMDUgJiBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRWYXN0RXJyb3JDb2RlKCkgPT09IDQwMCBpcyBCcm93c2VyIFVzZXIgSW50ZXJhY3RpdmUgZXJyb3IuXG5cbiAgICAgICAgICAgIC8vRG8gbm90IHRyaWdnZXJpbmcgRVJST1IuIGJlY3Vhc2UgSXQganVzdCBBRCFcblxuICAgICAgICAgICAgY29uc29sZS5sb2coYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpLCBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRNZXNzYWdlKCkpO1xuXG4gICAgICAgICAgICBsZXQgaW5uZXJFcnJvciA9IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldElubmVyRXJyb3IoKTtcbiAgICAgICAgICAgIGlmKGlubmVyRXJyb3Ipe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlubmVyRXJyb3IuZ2V0RXJyb3JDb2RlKCksIGlubmVyRXJyb3IuZ2V0TWVzc2FnZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhZHNNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgYWRzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcGVjLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcblxuICAgICAgICAgICAgLyppZihpbm5lckVycm9yICYmIGlubmVyRXJyb3IuZ2V0RXJyb3JDb2RlKCkgPT09IDEyMDUpe1xuICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgfSovXG5cblxuICAgICAgICB9O1xuICAgICAgICBPbk1hbmFnZXJMb2FkZWQgPSBmdW5jdGlvbihhZHNNYW5hZ2VyTG9hZGVkRXZlbnQpe1xuICAgICAgICAgICAgbGV0IGFkc1JlbmRlcmluZ1NldHRpbmdzID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVuZGVyaW5nU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIGFkc1JlbmRlcmluZ1NldHRpbmdzLnJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgLy9hZHNSZW5kZXJpbmdTZXR0aW5ncy51c2VTdHlsZWROb25MaW5lYXJBZHMgPSB0cnVlO1xuICAgICAgICAgICAgYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKGVsVmlkZW8sIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcblxuXG4gICAgICAgICAgICBsaXN0ZW5lciA9IEFkc0V2ZW50c0xpc3RlbmVyKGFkc01hbmFnZXIsIHByb3ZpZGVyLCBzcGVjLCBPbkFkRXJyb3IpO1xuXG4gICAgICAgICAgICBwcm92aWRlci5vbihDT05URU5UX1ZPTFVNRSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmKGRhdGEubXV0ZSl7XG4gICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc2V0Vm9sdW1lKDApO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnNldFZvbHVtZShkYXRhLnZvbHVtZS8xMDApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgdGhhdCk7XG5cbiAgICAgICAgICAgIGFkc01hbmFnZXJMb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgIH07XG5cblxuICAgICAgICBhZERpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIoY3JlYXRlQWRDb250YWluZXIoKSwgZWxWaWRlbyk7XG4gICAgICAgIGFkc0xvYWRlciA9IG5ldyBnb29nbGUuaW1hLkFkc0xvYWRlcihhZERpc3BsYXlDb250YWluZXIpO1xuXG4gICAgICAgIGFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKEFEU19NQU5BR0VSX0xPQURFRCwgT25NYW5hZ2VyTG9hZGVkLCBmYWxzZSk7XG4gICAgICAgIGFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKEFEX0VSUk9SLCBPbkFkRXJyb3IsIGZhbHNlKTtcblxuXG4gICAgICAgIGZ1bmN0aW9uIGluaXRSZXF1ZXN0KCl7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkF1dG9QbGF5IFN1cHBvcnQgOiBcIiwgXCJhdXRvcGxheUFsbG93ZWRcIixhdXRvcGxheUFsbG93ZWQsIFwiYXV0b3BsYXlSZXF1aXJlc011dGVkXCIsYXV0b3BsYXlSZXF1aXJlc011dGVkKTtcblxuICAgICAgICAgICAgYWRzUmVxdWVzdCA9IG5ldyBnb29nbGUuaW1hLkFkc1JlcXVlc3QoKTtcblxuICAgICAgICAgICAgYWRzUmVxdWVzdC5mb3JjZU5vbkxpbmVhckZ1bGxTbG90ID0gZmFsc2U7XG4gICAgICAgICAgICAvKmlmKHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkuYnJvd3NlciA9PT0gXCJTYWZhcmlcIiAmJiBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zID09PSBcImlPU1wiICl7XG4gICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgIGFkc1JlcXVlc3Quc2V0QWRXaWxsQXV0b1BsYXkoYXV0b3BsYXlBbGxvd2VkKTtcbiAgICAgICAgICAgIGFkc1JlcXVlc3Quc2V0QWRXaWxsUGxheU11dGVkKGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XG4gICAgICAgICAgICBpZihhdXRvcGxheVJlcXVpcmVzTXV0ZWQpe1xuICAgICAgICAgICAgICAgIHNlbmRXYXJuaW5nTWVzc2FnZUZvck11dGVkUGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRzUmVxdWVzdC5hZFRhZ1VybCA9IGFkVGFnVXJsO1xuXG4gICAgICAgICAgICBhZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTtcblxuICAgICAgICAgICAgLy90d28gd2F5IHdoYXQgYWQgc3RhcnRzLlxuICAgICAgICAgICAgLy9hZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTsgb3IgIGFkc01hbmFnZXIuc3RhcnQoKTtcbiAgICAgICAgICAgIC8vd2hhdD8gd2h5Pz8gd3RoPz9cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkge1xuICAgICAgICAgICAgaWYoIWVsVmlkZW8ucGxheSl7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzcGVjLmNoZWNrQXV0b3BsYXlTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcGxheVByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgIGlmIChwbGF5UHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBtYWtlIGl0IGhlcmUsIHVubXV0ZWQgYXV0b3BsYXkgd29ya3MuXG4gICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcblxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcblxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGxheVByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXlQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIG1ha2UgaXQgaGVyZSwgbXV0ZWQgYXV0b3BsYXkgd29ya3MgYnV0IHVubXV0ZWQgYXV0b3BsYXkgZG9lcyBub3QuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLmNoZWNrQXV0b3BsYXlTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBtdXRlZCBhbmQgdW5tdXRlZCBhdXRvcGxheSBmYWlsZWQuIEZhbGwgYmFjayB0byBjbGljayB0byBwbGF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLmNoZWNrQXV0b3BsYXlTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgLy9NYXliZSB0aGlzIGlzIElFMTEuLi4uXG4gICAgICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCk7XG5cbiAgICAgICAgdGhhdC5pc0FjdGl2ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmFjdGl2ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5zdGFydGVkID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMuc3RhcnRlZDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAgICAgLy9wcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcblxuICAgICAgICAgICAgaWYoc3BlYy5zdGFydGVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnJlc3VtZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFkc01hbmFnZXJMb2FkZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKChwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSAmJiAhYXV0b3BsYXlBbGxvd2VkKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihBVVRPUExBWV9OT1RfQUxMT1dFRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0kgdGhpbmsgZG8gbm90IG5lc3Nlc3NhcnkgdGhpcyBjb2RlIGFueW1vcmUuIEJlY2F1c2UgbXV0ZWQgcGxheSBzb2x2ZXMgZXZlcnl0aGluZy4gMjAxOS0wNi0wNFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKmlmKHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgID09PSBcImlPU1wiIHx8IHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgID09PSBcIkFuZHJvaWRcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0Rvbid0IHBsYXlpbmcgdmlkZW8gd2hlbiBwbGF5ZXIgY29tcGxldGUgcGxheWluZyBBRC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vT25seSBpT1MgU2FmYXJpIEZpcnN0IGxvYWRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmluaXQoXCIxMDAlXCIsIFwiMTAwJVwiLCBnb29nbGUuaW1hLlZpZXdNb2RlLk5PUk1BTCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAzMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrQWRzTWFuYWdlcklzUmVhZHksIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoQURNQU5HRVJfTE9BRElOR19FUlJPUikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGFkc01hbmFnZXIucGF1c2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC52aWRlb0VuZGVkQ2FsbGJhY2sgPSAoY29tcGxldGVDb250ZW50Q2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIC8vbGlzdGVuZXIuaXNMaW5lYXJBZCA6IGdldCBjdXJyZW50IGFkJ3Mgc3RhdHVzIHdoZXRoZXIgbGluZWFyIGFkIG9yIG5vdC5cbiAgICAgICAgICAgIGlmKGxpc3RlbmVyICYmIChsaXN0ZW5lci5pc0FsbEFkQ29tcGxldGUoKSB8fCAhbGlzdGVuZXIuaXNMaW5lYXJBZCgpKSl7XG4gICAgICAgICAgICAgICAgY29tcGxldGVDb250ZW50Q2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vUG9zdCAtIFJvbGwg7J2EIOyerOyDne2VmOq4sCDsnITtlbTshJzripQg7L2Y7YWQ7Lig6rCAIOuBneuCrOydjOydhCBhZHNMb2FkZXLsl5Dqsowg7JWM66Ck7JW8IO2VnOuLpFxuICAgICAgICAgICAgICAgIHNwZWMuaXNWaWRlb0VuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIuY29udGVudENvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuaXNBdXRvUGxheVN1cHBvcnRDaGVja1RpbWUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYoYWRzTG9hZGVyKXtcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBRFNfTUFOQUdFUl9MT0FERUQsIE9uTWFuYWdlckxvYWRlZCk7XG4gICAgICAgICAgICAgICAgYWRzTG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQURfRVJST1IsIE9uQWRFcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGFkc01hbmFnZXIpe1xuICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihhZERpc3BsYXlDb250YWluZXIpe1xuICAgICAgICAgICAgICAgIGFkRGlzcGxheUNvbnRhaW5lci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGxpc3RlbmVyKXtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCAkYWRzID0gTEEkKHBsYXllckNvbmZpZy5nZXRDb250YWluZXIoKSkuZmluZChcIi5vdnAtYWRzXCIpO1xuICAgICAgICAgICAgaWYoJGFkcyl7XG4gICAgICAgICAgICAgICAgJGFkcy5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvdmlkZXIub2ZmKENPTlRFTlRfVk9MVU1FLCBudWxsLCB0aGF0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoYXQ7XG5cbiAgICB9Y2F0Y2ggKGVycm9yKXtcbiAgICAgICAgLy9sZXQgdGVtcEVycm9yID0gRVJST1JTW0lOSVRfQURTX0VSUk9SXTtcbiAgICAgICAgLy90ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgLy9lcnJvckNhbGxiYWNrKHRlbXBFcnJvcik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IEFkczsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAxMC8wNC8yMDE5LlxuICovXG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcbmltcG9ydCB7XG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9BRF9MT0FERUQsXG4gICAgU1RBVEVfQURfUExBWUlORyxcbiAgICBTVEFURV9BRF9QQVVTRUQsXG4gICAgU1RBVEVfQURfQ09NUExFVEUsXG4gICAgQURfQ0hBTkdFRCxcbiAgICBBRF9USU1FLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihhZHNNYW5hZ2VyLCBwcm92aWRlciwgYWRzU3BlYywgT25BZEVycm9yKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xuXG4gICAgbGV0IGludGVydmFsVGltZXIgPSBudWxsO1xuXG4gICAgY29uc3QgQURfQlVGRkVSSU5HID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQURfQlVGRkVSSU5HO1xuICAgIGNvbnN0IENPTlRFTlRfUEFVU0VfUkVRVUVTVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQ7XG4gICAgY29uc3QgQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEO1xuICAgIGNvbnN0IEFEX0VSUk9SID0gZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUjtcbiAgICBjb25zdCBBTExfQURTX0NPTVBMRVRFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFMTF9BRFNfQ09NUExFVEVEO1xuICAgIGNvbnN0IENMSUNLID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ0xJQ0s7XG4gICAgY29uc3QgU0tJUFBFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNLSVBQRUQ7XG4gICAgY29uc3QgQ09NUExFVEUgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT01QTEVURTtcbiAgICBjb25zdCBGSVJTVF9RVUFSVElMRT0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuRklSU1RfUVVBUlRJTEU7XG4gICAgY29uc3QgTE9BREVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVEO1xuICAgIGNvbnN0IE1JRFBPSU5UPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5NSURQT0lOVDtcbiAgICBjb25zdCBQQVVTRUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5QQVVTRUQ7XG4gICAgY29uc3QgUkVTVU1FRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlJFU1VNRUQ7XG4gICAgY29uc3QgU1RBUlRFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQ7XG4gICAgY29uc3QgVVNFUl9DTE9TRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlVTRVJfQ0xPU0U7XG4gICAgY29uc3QgVEhJUkRfUVVBUlRJTEUgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5USElSRF9RVUFSVElMRTtcblxuICAgIGxldCBpc0FsbEFkQ29tcGVsZXRlID0gZmFsc2U7ICAgLy9Qb3N0IHJvbGzsnYQg7JyE7ZW0XG4gICAgbGV0IGFkQ29tcGxldGVDYWxsYmFjayA9IG51bGw7XG4gICAgbGV0IGN1cnJlbnRBZCA9IG51bGw7XG5cbiAgICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9QQVVTRV9SRVFVRVNURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIC8vVGhpcyBjYWxsbHMgd2hlbiBwbGF5ZXIgaXMgcGxheWluZyBjb250ZW50cyBmb3IgYWQuXG4gICAgICAgICBpZihhZHNTcGVjLnN0YXJ0ZWQpe1xuICAgICAgICAgICAgIGFkc1NwZWMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzW0NPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgLy9UaGlzIGNhbGxzIHdoZW4gb25lIGFkIGVuZGVkLlxuICAgICAgICAvL0FuZCB0aGlzIGlzIHNpZ25hbCB3aGF0IHBsYXkgdGhlIGNvbnRlbnRzLlxuICAgICAgICBhZHNTcGVjLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmKGFkc1NwZWMuc3RhcnRlZCAmJiAocHJvdmlkZXIuZ2V0UG9zaXRpb24oKSA9PT0gMCB8fCAhYWRzU3BlYy5pc1ZpZGVvRW5kZWQpICApe1xuICAgICAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0FEX0VSUk9SXSA9IE9uQWRFcnJvcjtcblxuICAgIGxvd0xldmVsRXZlbnRzW0FMTF9BRFNfQ09NUExFVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBpc0FsbEFkQ29tcGVsZXRlID0gdHJ1ZTtcbiAgICAgICAgaWYoYWRzU3BlYy5pc1ZpZGVvRW5kZWQpe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tDTElDS10gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0ZJUlNUX1FVQVJUSUxFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgLy9cbiAgICBsb3dMZXZlbEV2ZW50c1tBRF9CVUZGRVJJTkddID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURfQlVGRkVSSU5HXCIsYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0xPQURFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IHJlbWFpbmluZ1RpbWUgPSBhZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICAvKnZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgdHlwZSA6XCJhZFwiXG4gICAgICAgIH07Ki9cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9MT0FERUQsIHtyZW1haW5pbmcgOiByZW1haW5pbmdUaW1lLCBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgfSk7XG5cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW01JRFBPSU5UXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbUEFVU0VEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QQVVTRUQpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbUkVTVU1FRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHNbU1RBUlRFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBjdXJyZW50QWQgPSBhZDtcblxuICAgICAgICBsZXQgYWRPYmplY3QgPSB7XG4gICAgICAgICAgICBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgLFxuICAgICAgICAgICAgZHVyYXRpb24gOiBhZC5nZXREdXJhdGlvbigpLFxuICAgICAgICAgICAgc2tpcFRpbWVPZmZzZXQgOiBhZC5nZXRTa2lwVGltZU9mZnNldCgpICAgICAvL1RoZSBudW1iZXIgb2Ygc2Vjb25kcyBvZiBwbGF5YmFjayBiZWZvcmUgdGhlIGFkIGJlY29tZXMgc2tpcHBhYmxlLlxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEFEX0NIQU5HRUQsIGFkT2JqZWN0KTtcblxuXG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG5cbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xuICAgICAgICAgICAgYWRzU3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIEZvciBhIGxpbmVhciBhZCwgYSB0aW1lciBjYW4gYmUgc3RhcnRlZCB0byBwb2xsIGZvclxuICAgICAgICAgICAgLy8gdGhlIHJlbWFpbmluZyB0aW1lLlxuICAgICAgICAgICAgaW50ZXJ2YWxUaW1lciA9IHNldEludGVydmFsKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZHVyYXRpb24gPSBhZC5nZXREdXJhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfVElNRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24gOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBUaW1lT2Zmc2V0IDogYWQuZ2V0U2tpcFRpbWVPZmZzZXQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZyA6IHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA6IGR1cmF0aW9uIC0gcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBwYWJsZSA6IGFkc01hbmFnZXIuZ2V0QWRTa2lwcGFibGVTdGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMzAwKTsgLy8gZXZlcnkgMzAwbXNcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0NPTVBMRVRFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgLy9Vc2VyIHNraXBwZWQgYWQuIHNhbWUgcHJvY2VzcyBvbiBjb21wbGV0ZS5cbiAgICBsb3dMZXZlbEV2ZW50c1tTS0lQUEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuXG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tVU0VSX0NMT1NFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbVEhJUkRfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcblxuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuICAgIHRoYXQuc2V0QWRDb21wbGV0ZUNhbGxiYWNrID0gKF9hZENvbXBsZXRlQ2FsbGJhY2spID0+IHtcbiAgICAgICAgYWRDb21wbGV0ZUNhbGxiYWNrID0gX2FkQ29tcGxldGVDYWxsYmFjaztcbiAgICB9O1xuICAgIHRoYXQuaXNBbGxBZENvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaXNBbGxBZENvbXBlbGV0ZTtcbiAgICB9O1xuICAgIHRoYXQuaXNMaW5lYXJBZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRBZCAgPyBjdXJyZW50QWQuaXNMaW5lYXIoKSA6IHRydWU7XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQWRzRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDEyLi5cbiAqL1xuaW1wb3J0IHtFUlJPUiwgU1RBVEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnRPck1zZSkge1xuICAgIGlmKF8uaXNFbGVtZW50KGVsZW1lbnRPck1zZSkpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlO1xuICAgIH1cbiAgICBpZihlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQoKTtcbiAgICB9ZWxzZSBpZihlbGVtZW50T3JNc2UubWVkaWEpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLm1lZGlhO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUxpdmUgPSBmdW5jdGlvbihtc2UpIHtcbiAgICAvL1RvRG8gOiBZb3UgY29uc2lkZXIgaGxzanMuIEJ1dCBub3Qgbm93IGJlY2F1c2Ugd2UgZG9uJ3Qgc3VwcG9ydCBobHNqcy5cblxuICAgIGlmKG1zZSAmJiBtc2UuaXNEeW5hbWljKXtcbiAgICAgICAgcmV0dXJuIG1zZS5pc0R5bmFtaWMoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBlcnJvclRyaWdnZXIgPSBmdW5jdGlvbihlcnJvciwgcHJvdmlkZXIpe1xuICAgIGlmKHByb3ZpZGVyKXtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xuICAgIH1cblxufTtcblxuZXhwb3J0IGNvbnN0IHBpY2tDdXJyZW50U291cmNlID0gKHNvdXJjZXMsIGN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZykgPT4ge1xuICAgIGxldCBzb3VyY2VJbmRleCA9IE1hdGgubWF4KDAsIGN1cnJlbnRTb3VyY2UpO1xuICAgIGNvbnN0IGxhYmVsID1cIlwiO1xuICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSA9PT0gaSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSovXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZUluZGV4O1xufTsiXSwic291cmNlUm9vdCI6IiJ9