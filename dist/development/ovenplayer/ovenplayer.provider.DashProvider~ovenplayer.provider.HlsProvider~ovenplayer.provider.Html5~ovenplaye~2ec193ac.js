/*! OvenPlayerv0.9.5975 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
                })["catch"](function (error) {
                    autoplayAllowed = false;
                    autoplayRequiresMuted = false;
                    spec.checkAutoplayStart = false;
                    initRequest();

                    /*
                    //Disable Muted Play
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
                        }).catch(function (error) {
                            // Both muted and unmuted autoplay failed. Fall back to click to play.
                            elVideo.muted = false;
                            autoplayAllowed = false;
                            autoplayRequiresMuted = false;
                            spec.checkAutoplayStart = false;
                            initRequest();
                        });
                    }*/
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
            provider.trigger(_constants.STATE_AD_ERROR, { code: adErrorEvent.getError().getVastErrorCode(), message: adErrorEvent.getError().getMessage() });
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
                //provider.setState(STATE_AD_LOADING);
                return new Promise(function (resolve, reject) {
                    (function checkAdsManagerIsReady() {
                        retryCount++;
                        if (adsManagerLoaded) {
                            if (playerConfig.isAutoStart() && !autoplayAllowed) {
                                autoplayAllowed = true; //autoplay fail. set forced autoplayAllowed
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Fkcy9BZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9hZHMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci91dGlscy5qcyJdLCJuYW1lcyI6WyJBZHMiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsImVycm9yQ2FsbGJhY2siLCJBVVRPUExBWV9OT1RfQUxMT1dFRCIsIkFETUFOR0VSX0xPQURJTkdfRVJST1IiLCJBRFNfTUFOQUdFUl9MT0FERUQiLCJBRF9FUlJPUiIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJjaGVja0F1dG9wbGF5U3RhcnQiLCJPbkFkRXJyb3IiLCJPbk1hbmFnZXJMb2FkZWQiLCJhZERpc3BsYXlDb250YWluZXIiLCJhZHNMb2FkZXIiLCJhZHNNYW5hZ2VyIiwibGlzdGVuZXIiLCJhZHNSZXF1ZXN0IiwiYXV0b3BsYXlBbGxvd2VkIiwiYXV0b3BsYXlSZXF1aXJlc011dGVkIiwic2VuZFdhcm5pbmdNZXNzYWdlRm9yTXV0ZWRQbGF5IiwidHJpZ2dlciIsIlBMQVlFUl9XQVJOSU5HIiwibWVzc2FnZSIsIldBUk5fTVNHX01VVEVEUExBWSIsInRpbWVyIiwiaWNvbkNsYXNzIiwiVUlfSUNPTlMiLCJ2b2x1bWVfbXV0ZSIsIm9uQ2xpY2tDYWxsYmFjayIsInNldE11dGUiLCJpbml0UmVxdWVzdCIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZ29vZ2xlIiwiaW1hIiwiQWRzUmVxdWVzdCIsImZvcmNlTm9uTGluZWFyRnVsbFNsb3QiLCJzZXRBZFdpbGxBdXRvUGxheSIsInNldEFkV2lsbFBsYXlNdXRlZCIsInJlcXVlc3RBZHMiLCJjaGVja0F1dG9wbGF5U3VwcG9ydCIsInBsYXkiLCJwbGF5UHJvbWlzZSIsInVuZGVmaW5lZCIsInRoZW4iLCJwYXVzZSIsImVycm9yIiwiQWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiVHlwZSIsIkFkRXJyb3JFdmVudCIsInNldHRpbmdzIiwic2V0TG9jYWxlIiwic2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzIiwiY3JlYXRlQWRDb250YWluZXIiLCJhZENvbnRhaW5lciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImdldENvbnRhaW5lciIsImFwcGVuZCIsImFkRXJyb3JFdmVudCIsImNvbnNvbGUiLCJnZXRFcnJvciIsImdldFZhc3RFcnJvckNvZGUiLCJnZXRNZXNzYWdlIiwiaW5uZXJFcnJvciIsImdldElubmVyRXJyb3IiLCJnZXRFcnJvckNvZGUiLCJkZXN0cm95IiwiU1RBVEVfQURfRVJST1IiLCJjb2RlIiwiYWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiYWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJBZHNSZW5kZXJpbmdTZXR0aW5ncyIsInJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUiLCJnZXRBZHNNYW5hZ2VyIiwib24iLCJDT05URU5UX1ZPTFVNRSIsImRhdGEiLCJtdXRlIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwiQWREaXNwbGF5Q29udGFpbmVyIiwiQWRzTG9hZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImlzQWN0aXZlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXN1bWUiLCJyZXRyeUNvdW50IiwiY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSIsImlzQXV0b1N0YXJ0IiwiRXJyb3IiLCJpbml0aWFsaXplIiwiaW5pdCIsIlZpZXdNb2RlIiwiTk9STUFMIiwic3RhcnQiLCJzZXRUaW1lb3V0IiwidmlkZW9FbmRlZENhbGxiYWNrIiwiY29tcGxldGVDb250ZW50Q2FsbGJhY2siLCJpc0FsbEFkQ29tcGxldGUiLCJpc0xpbmVhckFkIiwiY29udGVudENvbXBsZXRlIiwiaXNBdXRvUGxheVN1cHBvcnRDaGVja1RpbWUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiJGFkcyIsImZpbmQiLCJyZW1vdmUiLCJvZmYiLCJMaXN0ZW5lciIsImFkc1NwZWMiLCJsb3dMZXZlbEV2ZW50cyIsImludGVydmFsVGltZXIiLCJBRF9CVUZGRVJJTkciLCJBZEV2ZW50IiwiQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQiLCJDT05URU5UX1JFU1VNRV9SRVFVRVNURUQiLCJBTExfQURTX0NPTVBMRVRFRCIsIkNMSUNLIiwiU0tJUFBFRCIsIkNPTVBMRVRFIiwiRklSU1RfUVVBUlRJTEUiLCJMT0FERUQiLCJNSURQT0lOVCIsIlBBVVNFRCIsIlJFU1VNRUQiLCJTVEFSVEVEIiwiVVNFUl9DTE9TRSIsIlRISVJEX1FVQVJUSUxFIiwiaXNBbGxBZENvbXBlbGV0ZSIsImFkQ29tcGxldGVDYWxsYmFjayIsImN1cnJlbnRBZCIsImFkRXZlbnQiLCJ0eXBlIiwiZ2V0UG9zaXRpb24iLCJzZXRTdGF0ZSIsIlNUQVRFX0NPTVBMRVRFIiwicmVtYWluaW5nVGltZSIsImdldFJlbWFpbmluZ1RpbWUiLCJhZCIsImdldEFkIiwiU1RBVEVfQURfTE9BREVEIiwicmVtYWluaW5nIiwiaXNMaW5lYXIiLCJTVEFURV9BRF9QQVVTRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiYWRPYmplY3QiLCJkdXJhdGlvbiIsImdldER1cmF0aW9uIiwic2tpcFRpbWVPZmZzZXQiLCJnZXRTa2lwVGltZU9mZnNldCIsIkFEX0NIQU5HRUQiLCJzZXRJbnRlcnZhbCIsIkFEX1RJTUUiLCJwb3NpdGlvbiIsInNraXBwYWJsZSIsImdldEFkU2tpcHBhYmxlU3RhdGUiLCJjbGVhckludGVydmFsIiwiU1RBVEVfQURfQ09NUExFVEUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImV2ZW50TmFtZSIsInNldEFkQ29tcGxldGVDYWxsYmFjayIsIl9hZENvbXBsZXRlQ2FsbGJhY2siLCJleHRyYWN0VmlkZW9FbGVtZW50IiwiZWxlbWVudE9yTXNlIiwiXyIsImlzRWxlbWVudCIsImdldFZpZGVvRWxlbWVudCIsIm1lZGlhIiwic2VwYXJhdGVMaXZlIiwibXNlIiwiaXNEeW5hbWljIiwiZXJyb3JUcmlnZ2VyIiwiU1RBVEVfRVJST1IiLCJFUlJPUiIsInBpY2tDdXJyZW50U291cmNlIiwic291cmNlcyIsImN1cnJlbnRTb3VyY2UiLCJzb3VyY2VJbmRleCIsIk1hdGgiLCJtYXgiLCJsYWJlbCIsImkiLCJsZW5ndGgiLCJnZXRTb3VyY2VJbmRleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFOQTs7O0FBa0JBLElBQU1BLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxPQUFULEVBQWtCQyxRQUFsQixFQUE0QkMsWUFBNUIsRUFBMENDLFFBQTFDLEVBQW9EQyxhQUFwRCxFQUFrRTtBQUMxRTtBQUNBLFFBQU1DLHVCQUF1QixvQkFBN0I7QUFDQSxRQUFNQyx5QkFBeUIseUJBQS9CO0FBQ0EsUUFBSUMscUJBQXFCLEVBQXpCO0FBQ0EsUUFBSUMsV0FBVyxFQUFmOztBQUVBLFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLE9BQU87QUFDUEMsaUJBQVMsS0FERixFQUNTO0FBQ2hCQyxnQkFBUyxLQUZGLEVBRVM7QUFDaEJDLHNCQUFlLEtBSFI7QUFJUEMsNEJBQXFCO0FBSmQsS0FBWDtBQU1BLFFBQUlDLFlBQVksSUFBaEI7QUFDQSxRQUFJQyxrQkFBa0IsSUFBdEI7O0FBRUEsUUFBSUMscUJBQXFCLElBQXpCO0FBQ0EsUUFBSUMsWUFBWSxJQUFoQjtBQUNBLFFBQUlDLGFBQWEsSUFBakI7QUFDQSxRQUFJQyxXQUFXLElBQWY7QUFDQSxRQUFJQyxhQUFhLElBQWpCO0FBQ0EsUUFBSUMsa0JBQWtCLEtBQXRCO0FBQUEsUUFBNkJDLHdCQUF3QixLQUFyRDs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU1DLGlDQUFpQyxT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UDtBQUNIO0FBQ0osQ0FSTTs7QUFVQSxJQUFNQyxzQ0FBZSxTQUFmQSxZQUFlLENBQVNsSSxLQUFULEVBQWdCbkQsUUFBaEIsRUFBeUI7QUFDakQsUUFBR0EsUUFBSCxFQUFZO0FBQ1JBLGlCQUFTOEksUUFBVCxDQUFrQndDLHNCQUFsQjtBQUNBdEwsaUJBQVNrRCxLQUFUO0FBQ0FsRCxpQkFBU3lCLE9BQVQsQ0FBaUI4SixnQkFBakIsRUFBd0JwSSxLQUF4QjtBQUNIO0FBRUosQ0FQTTs7QUFTQSxJQUFNcUksZ0RBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsT0FBRCxFQUFVQyxhQUFWLEVBQXlCekwsWUFBekIsRUFBMEM7QUFDdkUsUUFBSTBMLGNBQWNDLEtBQUtDLEdBQUwsQ0FBUyxDQUFULEVBQVlILGFBQVosQ0FBbEI7QUFDQSxRQUFNSSxRQUFPLEVBQWI7QUFDQSxRQUFJTCxPQUFKLEVBQWE7QUFDVCxhQUFLLElBQUlNLElBQUksQ0FBYixFQUFnQkEsSUFBSU4sUUFBUU8sTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLGdCQUFJTixRQUFRTSxDQUFSLFlBQUosRUFBd0I7QUFDcEJKLDhCQUFjSSxDQUFkO0FBQ0g7QUFDRCxnQkFBSTlMLGFBQWFnTSxjQUFiLE9BQWtDRixDQUF0QyxFQUEwQztBQUN0Qyx1QkFBT0EsQ0FBUDtBQUNIO0FBQ0Q7OztBQUdIO0FBQ0o7QUFDRCxXQUFPSixXQUFQO0FBQ0gsQ0FqQk0sQyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMDgvMDQvMjAxOS5cbiAqL1xuaW1wb3J0IEFkc0V2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvYWRzL0xpc3RlbmVyXCI7XG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIEVSUk9SLCBFUlJPUlMsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBJTklUX0FEU19FUlJPUixcbiAgICBTVEFURV9BRF9FUlJPUixcbiAgICBQTEFZRVJfV0FSTklORyxcbiAgICBXQVJOX01TR19NVVRFRFBMQVksXG4gICAgU1RBVEVfQURfTE9BRElORyxcbiAgICBVSV9JQ09OU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBBZHMgPSBmdW5jdGlvbihlbFZpZGVvLCBwcm92aWRlciwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCwgZXJyb3JDYWxsYmFjayl7XG4gICAgLy9Ub2RvIDogbW92ZSBjcmVhdGVBZENvbnRhaW5lciB0byBNZWRpYU1hbmFnZXJcbiAgICBjb25zdCBBVVRPUExBWV9OT1RfQUxMT1dFRCA9IFwiYXV0b3BsYXlOb3RBbGxvd2VkXCI7XG4gICAgY29uc3QgQURNQU5HRVJfTE9BRElOR19FUlJPUiA9IFwiYWRtYW5hZ2VyTG9hZGluZ1RpbWVvdXRcIjtcbiAgICBsZXQgQURTX01BTkFHRVJfTE9BREVEID0gXCJcIjtcbiAgICBsZXQgQURfRVJST1IgPSBcIlwiO1xuXG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgYWRzTWFuYWdlckxvYWRlZCA9IGZhbHNlO1xuICAgIGxldCBzcGVjID0ge1xuICAgICAgICBzdGFydGVkOiBmYWxzZSwgLy9wbGF5ZXIgc3RhcnRlZFxuICAgICAgICBhY3RpdmUgOiBmYWxzZSwgLy9vbiBBZFxuICAgICAgICBpc1ZpZGVvRW5kZWQgOiBmYWxzZSxcbiAgICAgICAgY2hlY2tBdXRvcGxheVN0YXJ0IDogdHJ1ZVxuICAgIH07XG4gICAgbGV0IE9uQWRFcnJvciA9IG51bGw7XG4gICAgbGV0IE9uTWFuYWdlckxvYWRlZCA9IG51bGw7XG5cbiAgICBsZXQgYWREaXNwbGF5Q29udGFpbmVyID0gbnVsbDtcbiAgICBsZXQgYWRzTG9hZGVyID0gbnVsbDtcbiAgICBsZXQgYWRzTWFuYWdlciA9IG51bGw7XG4gICAgbGV0IGxpc3RlbmVyID0gbnVsbDtcbiAgICBsZXQgYWRzUmVxdWVzdCA9IG51bGw7XG4gICAgbGV0IGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlLCBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcblxuXG4gICAgLy8gZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRBdXRvUGxheUFkQnJlYWtzKGZhbHNlKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuXG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldExvY2FsZSgna28nKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXModHJ1ZSk7XG4gICAgY29uc3Qgc2VuZFdhcm5pbmdNZXNzYWdlRm9yTXV0ZWRQbGF5ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZRVJfV0FSTklORywge1xuICAgICAgICAgICAgbWVzc2FnZSA6IFdBUk5fTVNHX01VVEVEUExBWSxcbiAgICAgICAgICAgIHRpbWVyIDogMTAgKiAxMDAwLFxuICAgICAgICAgICAgaWNvbkNsYXNzIDogVUlfSUNPTlMudm9sdW1lX211dGUsXG4gICAgICAgICAgICBvbkNsaWNrQ2FsbGJhY2sgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldE11dGUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICB0cnl7XG4gICAgICAgIEFEU19NQU5BR0VSX0xPQURFRCA9IGdvb2dsZS5pbWEuQWRzTWFuYWdlckxvYWRlZEV2ZW50LlR5cGUuQURTX01BTkFHRVJfTE9BREVEO1xuICAgICAgICBBRF9FUlJPUiA9IGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1I7XG4gICAgICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0TG9jYWxlKFwia29cIik7XG4gICAgICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xuXG5cblxuXG4gICAgICAgIGNvbnN0IGNyZWF0ZUFkQ29udGFpbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ292cC1hZHMnKTtcbiAgICAgICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnb3ZwLWFkcycpO1xuICAgICAgICAgICAgcGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpLmFwcGVuZChhZENvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcbiAgICAgICAgfTtcbiAgICAgICAgT25BZEVycm9yID0gZnVuY3Rpb24oYWRFcnJvckV2ZW50KXtcbiAgICAgICAgICAgIC8vbm90ZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldElubmVyRXJyb3IoKS5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSAmIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSA9PT0gNDAwIGlzIEJyb3dzZXIgVXNlciBJbnRlcmFjdGl2ZSBlcnJvci5cblxuICAgICAgICAgICAgLy9EbyBub3QgdHJpZ2dlcmluZyBFUlJPUi4gYmVjdWFzZSBJdCBqdXN0IEFEIVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRWYXN0RXJyb3JDb2RlKCksIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldE1lc3NhZ2UoKSk7XG5cbiAgICAgICAgICAgIGxldCBpbm5lckVycm9yID0gYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpO1xuICAgICAgICAgICAgaWYoaW5uZXJFcnJvcil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5uZXJFcnJvci5nZXRFcnJvckNvZGUoKSwgaW5uZXJFcnJvci5nZXRNZXNzYWdlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFkc01hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfRVJST1IsIHtjb2RlIDogYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpICwgbWVzc2FnZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldE1lc3NhZ2UoKX0pO1xuICAgICAgICAgICAgc3BlYy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHNwZWMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG5cbiAgICAgICAgICAgIC8qaWYoaW5uZXJFcnJvciAmJiBpbm5lckVycm9yLmdldEVycm9yQ29kZSgpID09PSAxMjA1KXtcbiAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgIH0qL1xuXG5cbiAgICAgICAgfTtcbiAgICAgICAgT25NYW5hZ2VyTG9hZGVkID0gZnVuY3Rpb24oYWRzTWFuYWdlckxvYWRlZEV2ZW50KXtcbiAgICAgICAgICAgIGxldCBhZHNSZW5kZXJpbmdTZXR0aW5ncyA9IG5ldyBnb29nbGUuaW1hLkFkc1JlbmRlcmluZ1NldHRpbmdzKCk7XG4gICAgICAgICAgICBhZHNSZW5kZXJpbmdTZXR0aW5ncy5yZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vYWRzUmVuZGVyaW5nU2V0dGluZ3MudXNlU3R5bGVkTm9uTGluZWFyQWRzID0gdHJ1ZTtcbiAgICAgICAgICAgIGFkc01hbmFnZXIgPSBhZHNNYW5hZ2VyTG9hZGVkRXZlbnQuZ2V0QWRzTWFuYWdlcihlbFZpZGVvLCBhZHNSZW5kZXJpbmdTZXR0aW5ncyk7XG5cblxuICAgICAgICAgICAgbGlzdGVuZXIgPSBBZHNFdmVudHNMaXN0ZW5lcihhZHNNYW5hZ2VyLCBwcm92aWRlciwgc3BlYywgT25BZEVycm9yKTtcblxuICAgICAgICAgICAgcHJvdmlkZXIub24oQ09OVEVOVF9WT0xVTUUsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZihkYXRhLm11dGUpe1xuICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnNldFZvbHVtZSgwKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zZXRWb2x1bWUoZGF0YS52b2x1bWUvMTAwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIHRoYXQpO1xuXG4gICAgICAgICAgICBhZHNNYW5hZ2VyTG9hZGVkID0gdHJ1ZTtcblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgYWREaXNwbGF5Q29udGFpbmVyID0gbmV3IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyKGNyZWF0ZUFkQ29udGFpbmVyKCksIGVsVmlkZW8pO1xuICAgICAgICBhZHNMb2FkZXIgPSBuZXcgZ29vZ2xlLmltYS5BZHNMb2FkZXIoYWREaXNwbGF5Q29udGFpbmVyKTtcblxuICAgICAgICBhZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBRFNfTUFOQUdFUl9MT0FERUQsIE9uTWFuYWdlckxvYWRlZCwgZmFsc2UpO1xuICAgICAgICBhZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBRF9FUlJPUiwgT25BZEVycm9yLCBmYWxzZSk7XG5cblxuICAgICAgICBmdW5jdGlvbiBpbml0UmVxdWVzdCgpe1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBdXRvUGxheSBTdXBwb3J0IDogXCIsIFwiYXV0b3BsYXlBbGxvd2VkXCIsYXV0b3BsYXlBbGxvd2VkLCBcImF1dG9wbGF5UmVxdWlyZXNNdXRlZFwiLGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XG5cbiAgICAgICAgICAgIGFkc1JlcXVlc3QgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgIGFkc1JlcXVlc3QuZm9yY2VOb25MaW5lYXJGdWxsU2xvdCA9IGZhbHNlO1xuICAgICAgICAgICAgLyppZihwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLmJyb3dzZXIgPT09IFwiU2FmYXJpXCIgJiYgcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyA9PT0gXCJpT1NcIiApe1xuICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICBhZHNSZXF1ZXN0LnNldEFkV2lsbEF1dG9QbGF5KGF1dG9wbGF5QWxsb3dlZCk7XG4gICAgICAgICAgICBhZHNSZXF1ZXN0LnNldEFkV2lsbFBsYXlNdXRlZChhdXRvcGxheVJlcXVpcmVzTXV0ZWQpO1xuICAgICAgICAgICAgaWYoYXV0b3BsYXlSZXF1aXJlc011dGVkKXtcbiAgICAgICAgICAgICAgICBzZW5kV2FybmluZ01lc3NhZ2VGb3JNdXRlZFBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkc1JlcXVlc3QuYWRUYWdVcmwgPSBhZFRhZ1VybDtcblxuICAgICAgICAgICAgYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7XG5cbiAgICAgICAgICAgIC8vdHdvIHdheSB3aGF0IGFkIHN0YXJ0cy5cbiAgICAgICAgICAgIC8vYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7IG9yICBhZHNNYW5hZ2VyLnN0YXJ0KCk7XG4gICAgICAgICAgICAvL3doYXQ/IHdoeT8/IHd0aD8/XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjaGVja0F1dG9wbGF5U3VwcG9ydCgpIHtcbiAgICAgICAgICAgIGlmKCFlbFZpZGVvLnBsYXkpe1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBsYXlQcm9taXNlID0gZWxWaWRlby5wbGF5KCk7XG4gICAgICAgICAgICBpZiAocGxheVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHBsYXlQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCB1bm11dGVkIGF1dG9wbGF5IHdvcmtzLlxuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzcGVjLmNoZWNrQXV0b3BsYXlTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMuY2hlY2tBdXRvcGxheVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgLy9EaXNhYmxlIE11dGVkIFBsYXlcbiAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwbGF5UHJvbWlzZSA9IGVsVmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCBtdXRlZCBhdXRvcGxheSB3b3JrcyBidXQgdW5tdXRlZCBhdXRvcGxheSBkb2VzIG5vdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMuY2hlY2tBdXRvcGxheVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJvdGggbXV0ZWQgYW5kIHVubXV0ZWQgYXV0b3BsYXkgZmFpbGVkLiBGYWxsIGJhY2sgdG8gY2xpY2sgdG8gcGxheS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgLy9NYXliZSB0aGlzIGlzIElFMTEuLi4uXG4gICAgICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tBdXRvcGxheVN1cHBvcnQoKTtcbiAgICAgICAgdGhhdC5pc0FjdGl2ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmFjdGl2ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5zdGFydGVkID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMuc3RhcnRlZDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAgICAgLy9wcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcblxuICAgICAgICAgICAgaWYoc3BlYy5zdGFydGVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnJlc3VtZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAvL3Byb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX0xPQURJTkcpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja0Fkc01hbmFnZXJJc1JlYWR5KCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYWRzTWFuYWdlckxvYWRlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpICYmICFhdXRvcGxheUFsbG93ZWQpICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7IC8vYXV0b3BsYXkgZmFpbC4gc2V0IGZvcmNlZCBhdXRvcGxheUFsbG93ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoQVVUT1BMQVlfTk9UX0FMTE9XRUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JIHRoaW5rIGRvIG5vdCBuZXNzZXNzYXJ5IHRoaXMgY29kZSBhbnltb3JlLiBCZWNhdXNlIG11dGVkIHBsYXkgc29sdmVzIGV2ZXJ5dGhpbmcuIDIwMTktMDYtMDRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyppZihwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zICA9PT0gXCJpT1NcIiB8fCBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zICA9PT0gXCJBbmRyb2lkXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Eb24ndCBwbGF5aW5nIHZpZGVvIHdoZW4gcGxheWVyIGNvbXBsZXRlIHBsYXlpbmcgQUQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL09ubHkgaU9TIFNhZmFyaSBGaXJzdCBsb2FkZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWREaXNwbGF5Q29udGFpbmVyLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5pbml0KFwiMTAwJVwiLCBcIjEwMCVcIiwgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMzAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0Fkc01hbmFnZXJJc1JlYWR5LCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKEFETUFOR0VSX0xPQURJTkdfRVJST1IpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnBhdXNlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQudmlkZW9FbmRlZENhbGxiYWNrID0gKGNvbXBsZXRlQ29udGVudENhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICAvL2xpc3RlbmVyLmlzTGluZWFyQWQgOiBnZXQgY3VycmVudCBhZCdzIHN0YXR1cyB3aGV0aGVyIGxpbmVhciBhZCBvciBub3QuXG4gICAgICAgICAgICBpZihsaXN0ZW5lciAmJiAobGlzdGVuZXIuaXNBbGxBZENvbXBsZXRlKCkgfHwgIWxpc3RlbmVyLmlzTGluZWFyQWQoKSkpe1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlQ29udGVudENhbGxiYWNrKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL1Bvc3QgLSBSb2xsIOydhCDsnqzsg53tlZjquLAg7JyE7ZW07ISc64qUIOy9mO2FkOy4oOqwgCDrgZ3rgqzsnYzsnYQgYWRzTG9hZGVy7JeQ6rKMIOyVjOugpOyVvCDtlZzri6RcbiAgICAgICAgICAgICAgICBzcGVjLmlzVmlkZW9FbmRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYWRzTG9hZGVyLmNvbnRlbnRDb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGF0LmlzQXV0b1BsYXlTdXBwb3J0Q2hlY2tUaW1lID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMuY2hlY2tBdXRvcGxheVN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmKGFkc0xvYWRlcil7XG4gICAgICAgICAgICAgICAgYWRzTG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQURTX01BTkFHRVJfTE9BREVELCBPbk1hbmFnZXJMb2FkZWQpO1xuICAgICAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEX0VSUk9SLCBPbkFkRXJyb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihhZHNNYW5hZ2VyKXtcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoYWREaXNwbGF5Q29udGFpbmVyKXtcbiAgICAgICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihsaXN0ZW5lcil7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgJGFkcyA9IExBJChwbGF5ZXJDb25maWcuZ2V0Q29udGFpbmVyKCkpLmZpbmQoXCIub3ZwLWFkc1wiKTtcbiAgICAgICAgICAgIGlmKCRhZHMpe1xuICAgICAgICAgICAgICAgICRhZHMucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByb3ZpZGVyLm9mZihDT05URU5UX1ZPTFVNRSwgbnVsbCwgdGhhdCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGF0O1xuXG4gICAgfWNhdGNoIChlcnJvcil7XG4gICAgICAgIC8vbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tJTklUX0FEU19FUlJPUl07XG4gICAgICAgIC8vdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgIC8vZXJyb3JDYWxsYmFjayh0ZW1wRXJyb3IpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBBZHM7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMTAvMDQvMjAxOS5cbiAqL1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5pbXBvcnQge1xuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfQURfTE9BREVELFxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXG4gICAgU1RBVEVfQURfUEFVU0VELFxuICAgIFNUQVRFX0FEX0NPTVBMRVRFLFxuICAgIEFEX0NIQU5HRUQsXG4gICAgQURfVElNRSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsXG4gICAgUFJPVklERVJfSFRNTDUsXG4gICAgUFJPVklERVJfV0VCUlRDLFxuICAgIFBST1ZJREVSX0RBU0gsXG4gICAgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oYWRzTWFuYWdlciwgcHJvdmlkZXIsIGFkc1NwZWMsIE9uQWRFcnJvcil7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgbG93TGV2ZWxFdmVudHMgPSB7fTtcblxuICAgIGxldCBpbnRlcnZhbFRpbWVyID0gbnVsbDtcblxuICAgIGNvbnN0IEFEX0JVRkZFUklORyA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFEX0JVRkZFUklORztcbiAgICBjb25zdCBDT05URU5UX1BBVVNFX1JFUVVFU1RFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVEO1xuICAgIGNvbnN0IENPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRDtcbiAgICBjb25zdCBBRF9FUlJPUiA9IGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1I7XG4gICAgY29uc3QgQUxMX0FEU19DT01QTEVURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BTExfQURTX0NPTVBMRVRFRDtcbiAgICBjb25zdCBDTElDSyA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNMSUNLO1xuICAgIGNvbnN0IFNLSVBQRUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TS0lQUEVEO1xuICAgIGNvbnN0IENPTVBMRVRFID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09NUExFVEU7XG4gICAgY29uc3QgRklSU1RfUVVBUlRJTEU9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkZJUlNUX1FVQVJUSUxFO1xuICAgIGNvbnN0IExPQURFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkxPQURFRDtcbiAgICBjb25zdCBNSURQT0lOVD0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTUlEUE9JTlQ7XG4gICAgY29uc3QgUEFVU0VEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUEFVU0VEO1xuICAgIGNvbnN0IFJFU1VNRUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5SRVNVTUVEO1xuICAgIGNvbnN0IFNUQVJURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TVEFSVEVEO1xuICAgIGNvbnN0IFVTRVJfQ0xPU0UgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5VU0VSX0NMT1NFO1xuICAgIGNvbnN0IFRISVJEX1FVQVJUSUxFID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuVEhJUkRfUVVBUlRJTEU7XG5cbiAgICBsZXQgaXNBbGxBZENvbXBlbGV0ZSA9IGZhbHNlOyAgIC8vUG9zdCByb2xs7J2EIOychO2VtFxuICAgIGxldCBhZENvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xuICAgIGxldCBjdXJyZW50QWQgPSBudWxsO1xuXG4gICAgIGxvd0xldmVsRXZlbnRzW0NPTlRFTlRfUEFVU0VfUkVRVUVTVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICAvL1RoaXMgY2FsbGxzIHdoZW4gcGxheWVyIGlzIHBsYXlpbmcgY29udGVudHMgZm9yIGFkLlxuICAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkKXtcbiAgICAgICAgICAgICBhZHNTcGVjLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcbiAgICAgICAgIH1cblxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50c1tDT05URU5UX1JFU1VNRV9SRVFVRVNURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIC8vVGhpcyBjYWxscyB3aGVuIG9uZSBhZCBlbmRlZC5cbiAgICAgICAgLy9BbmQgdGhpcyBpcyBzaWduYWwgd2hhdCBwbGF5IHRoZSBjb250ZW50cy5cbiAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICBpZihhZHNTcGVjLnN0YXJ0ZWQgJiYgKHByb3ZpZGVyLmdldFBvc2l0aW9uKCkgPT09IDAgfHwgIWFkc1NwZWMuaXNWaWRlb0VuZGVkKSAgKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tBRF9FUlJPUl0gPSBPbkFkRXJyb3I7XG5cbiAgICBsb3dMZXZlbEV2ZW50c1tBTExfQURTX0NPTVBMRVRFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgaXNBbGxBZENvbXBlbGV0ZSA9IHRydWU7XG4gICAgICAgIGlmKGFkc1NwZWMuaXNWaWRlb0VuZGVkKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQ0xJQ0tdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tGSVJTVF9RVUFSVElMRV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIC8vXG4gICAgbG93TGV2ZWxFdmVudHNbQURfQlVGRkVSSU5HXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEX0JVRkZFUklOR1wiLGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tMT0FERURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGxldCByZW1haW5pbmdUaW1lID0gYWRzTWFuYWdlci5nZXRSZW1haW5pbmdUaW1lKCk7XG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgLyp2YXIgbWV0YWRhdGEgPSB7XG4gICAgICAgICAgICBkdXJhdGlvbjogcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgIHR5cGUgOlwiYWRcIlxuICAgICAgICB9OyovXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfTE9BREVELCB7cmVtYWluaW5nIDogcmVtYWluaW5nVGltZSwgaXNMaW5lYXIgOiBhZC5pc0xpbmVhcigpIH0pO1xuXG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tNSURQT0lOVF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW1BBVVNFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUEFVU0VEKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW1JFU1VNRURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xuICAgIH07XG5cblxuICAgIGxvd0xldmVsRXZlbnRzW1NUQVJURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgY3VycmVudEFkID0gYWQ7XG5cbiAgICAgICAgbGV0IGFkT2JqZWN0ID0ge1xuICAgICAgICAgICAgaXNMaW5lYXIgOiBhZC5pc0xpbmVhcigpICxcbiAgICAgICAgICAgIGR1cmF0aW9uIDogYWQuZ2V0RHVyYXRpb24oKSxcbiAgICAgICAgICAgIHNraXBUaW1lT2Zmc2V0IDogYWQuZ2V0U2tpcFRpbWVPZmZzZXQoKSAgICAgLy9UaGUgbnVtYmVyIG9mIHNlY29uZHMgb2YgcGxheWJhY2sgYmVmb3JlIHRoZSBhZCBiZWNvbWVzIHNraXBwYWJsZS5cbiAgICAgICAgfTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9DSEFOR0VELCBhZE9iamVjdCk7XG5cblxuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QTEFZSU5HKTtcbiAgICAgICAgICAgIGFkc1NwZWMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAvLyBGb3IgYSBsaW5lYXIgYWQsIGEgdGltZXIgY2FuIGJlIHN0YXJ0ZWQgdG8gcG9sbCBmb3JcbiAgICAgICAgICAgIC8vIHRoZSByZW1haW5pbmcgdGltZS5cbiAgICAgICAgICAgIGludGVydmFsVGltZXIgPSBzZXRJbnRlcnZhbChcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbWFpbmluZ1RpbWUgPSBhZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gYWQuZ2V0RHVyYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKEFEX1RJTUUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uIDogZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBza2lwVGltZU9mZnNldCA6IGFkLmdldFNraXBUaW1lT2Zmc2V0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1haW5pbmcgOiByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gOiBkdXJhdGlvbiAtIHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBza2lwcGFibGUgOiBhZHNNYW5hZ2VyLmdldEFkU2tpcHBhYmxlU3RhdGUoKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDMwMCk7IC8vIGV2ZXJ5IDMwMG1zXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tDT01QTEVURV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICB9O1xuICAgIC8vVXNlciBza2lwcGVkIGFkLiBzYW1lIHByb2Nlc3Mgb24gY29tcGxldGUuXG4gICAgbG93TGV2ZWxFdmVudHNbU0tJUFBFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcblxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbVVNFUl9DTE9TRV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW1RISVJEX1FVQVJUSUxFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG5cblxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgIGFkc01hbmFnZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICB9KTtcbiAgICB0aGF0LnNldEFkQ29tcGxldGVDYWxsYmFjayA9IChfYWRDb21wbGV0ZUNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGFkQ29tcGxldGVDYWxsYmFjayA9IF9hZENvbXBsZXRlQ2FsbGJhY2s7XG4gICAgfTtcbiAgICB0aGF0LmlzQWxsQWRDb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGlzQWxsQWRDb21wZWxldGU7XG4gICAgfTtcbiAgICB0aGF0LmlzTGluZWFyQWQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBjdXJyZW50QWQgID8gY3VycmVudEFkLmlzTGluZWFyKCkgOiB0cnVlO1xuICAgIH07XG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFkc0V2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxMi4uXG4gKi9cbmltcG9ydCB7RVJST1IsIFNUQVRFX0VSUk9SfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RWaWRlb0VsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50T3JNc2UpIHtcbiAgICBpZihfLmlzRWxlbWVudChlbGVtZW50T3JNc2UpKXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZTtcbiAgICB9XG4gICAgaWYoZWxlbWVudE9yTXNlLmdldFZpZGVvRWxlbWVudCl7XG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KCk7XG4gICAgfWVsc2UgaWYoZWxlbWVudE9yTXNlLm1lZGlhKXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5tZWRpYTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VwYXJhdGVMaXZlID0gZnVuY3Rpb24obXNlKSB7XG4gICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXG5cbiAgICBpZihtc2UgJiYgbXNlLmlzRHluYW1pYyl7XG4gICAgICAgIHJldHVybiBtc2UuaXNEeW5hbWljKCk7XG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXJyb3JUcmlnZ2VyID0gZnVuY3Rpb24oZXJyb3IsIHByb3ZpZGVyKXtcbiAgICBpZihwcm92aWRlcil7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IgKTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCBjb25zdCBwaWNrQ3VycmVudFNvdXJjZSA9IChzb3VyY2VzLCBjdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpID0+IHtcbiAgICBsZXQgc291cmNlSW5kZXggPSBNYXRoLm1heCgwLCBjdXJyZW50U291cmNlKTtcbiAgICBjb25zdCBsYWJlbCA9XCJcIjtcbiAgICBpZiAoc291cmNlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VJbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkgPT09IGkgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKmlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2VJbmRleDtcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==