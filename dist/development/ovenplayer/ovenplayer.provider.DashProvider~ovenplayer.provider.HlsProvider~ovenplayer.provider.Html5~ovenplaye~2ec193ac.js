/*! OvenPlayerv0.9.5977 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        checkAutoplayPeriod: true
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
    OvenPlayerConsole.log("ADS : started ", adTagUrl);

    try {
        var initRequest = function initRequest() {

            OvenPlayerConsole.log("ADS : AutoPlay Support : ", "autoplayAllowed", autoplayAllowed, "autoplayRequiresMuted", autoplayRequiresMuted);

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
            OvenPlayerConsole.log("ADS : requestAds Complete");
            //two way what ad starts.
            //adsLoader.requestAds(adsRequest); or  adsManager.start();
            //what? why?? wth??
        };

        var checkAutoplaySupport = function checkAutoplaySupport() {
            OvenPlayerConsole.log("ADS : checkAutoplaySupport() ");
            spec.checkAutoplayPeriod = true;
            //let cloneVideo = elVideo.cloneNode(true);
            if (!elVideo.play) {
                autoplayAllowed = true;
                autoplayRequiresMuted = false;
                spec.checkAutoplayPeriod = false;
                initRequest();
                return false;
            }

            var playPromise = elVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(function () {
                    OvenPlayerConsole.log("ADS : CHECK AUTO PLAY success");
                    // If we make it here, unmuted autoplay works.
                    elVideo.pause();
                    autoplayAllowed = true;
                    autoplayRequiresMuted = false;
                    spec.checkAutoplayPeriod = false;
                    initRequest();
                })["catch"](function (error) {
                    OvenPlayerConsole.log("ADS : CHECK AUTO PLAY fail", error.message);
                    autoplayAllowed = false;
                    autoplayRequiresMuted = false;
                    spec.checkAutoplayPeriod = false;
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
                spec.checkAutoplayPeriod = false;
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
                    checkAutoplaySupport();
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
            return spec.checkAutoplayPeriod;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Fkcy9BZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9hZHMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci91dGlscy5qcyJdLCJuYW1lcyI6WyJBZHMiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsImVycm9yQ2FsbGJhY2siLCJBVVRPUExBWV9OT1RfQUxMT1dFRCIsIkFETUFOR0VSX0xPQURJTkdfRVJST1IiLCJBRFNfTUFOQUdFUl9MT0FERUQiLCJBRF9FUlJPUiIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJjaGVja0F1dG9wbGF5UGVyaW9kIiwiT25BZEVycm9yIiwiT25NYW5hZ2VyTG9hZGVkIiwiYWREaXNwbGF5Q29udGFpbmVyIiwiYWRzTG9hZGVyIiwiYWRzTWFuYWdlciIsImxpc3RlbmVyIiwiYWRzUmVxdWVzdCIsImF1dG9wbGF5QWxsb3dlZCIsImF1dG9wbGF5UmVxdWlyZXNNdXRlZCIsInNlbmRXYXJuaW5nTWVzc2FnZUZvck11dGVkUGxheSIsInRyaWdnZXIiLCJQTEFZRVJfV0FSTklORyIsIm1lc3NhZ2UiLCJXQVJOX01TR19NVVRFRFBMQVkiLCJ0aW1lciIsImljb25DbGFzcyIsIlVJX0lDT05TIiwidm9sdW1lX211dGUiLCJvbkNsaWNrQ2FsbGJhY2siLCJzZXRNdXRlIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJpbml0UmVxdWVzdCIsImdvb2dsZSIsImltYSIsIkFkc1JlcXVlc3QiLCJmb3JjZU5vbkxpbmVhckZ1bGxTbG90Iiwic2V0QWRXaWxsQXV0b1BsYXkiLCJzZXRBZFdpbGxQbGF5TXV0ZWQiLCJyZXF1ZXN0QWRzIiwiY2hlY2tBdXRvcGxheVN1cHBvcnQiLCJwbGF5IiwicGxheVByb21pc2UiLCJ1bmRlZmluZWQiLCJ0aGVuIiwicGF1c2UiLCJlcnJvciIsIkFkc01hbmFnZXJMb2FkZWRFdmVudCIsIlR5cGUiLCJBZEVycm9yRXZlbnQiLCJzZXR0aW5ncyIsInNldExvY2FsZSIsInNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyIsImNyZWF0ZUFkQ29udGFpbmVyIiwiYWRDb250YWluZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJnZXRDb250YWluZXIiLCJhcHBlbmQiLCJhZEVycm9yRXZlbnQiLCJjb25zb2xlIiwiZ2V0RXJyb3IiLCJnZXRWYXN0RXJyb3JDb2RlIiwiZ2V0TWVzc2FnZSIsImlubmVyRXJyb3IiLCJnZXRJbm5lckVycm9yIiwiZ2V0RXJyb3JDb2RlIiwiZGVzdHJveSIsIlNUQVRFX0FEX0VSUk9SIiwiY29kZSIsImFkc01hbmFnZXJMb2FkZWRFdmVudCIsImFkc1JlbmRlcmluZ1NldHRpbmdzIiwiQWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJyZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlIiwiZ2V0QWRzTWFuYWdlciIsIm9uIiwiQ09OVEVOVF9WT0xVTUUiLCJkYXRhIiwibXV0ZSIsInNldFZvbHVtZSIsInZvbHVtZSIsIkFkRGlzcGxheUNvbnRhaW5lciIsIkFkc0xvYWRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJpc0FjdGl2ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVzdW1lIiwicmV0cnlDb3VudCIsImNoZWNrQWRzTWFuYWdlcklzUmVhZHkiLCJpc0F1dG9TdGFydCIsIkVycm9yIiwiaW5pdGlhbGl6ZSIsImluaXQiLCJWaWV3TW9kZSIsIk5PUk1BTCIsInN0YXJ0Iiwic2V0VGltZW91dCIsInZpZGVvRW5kZWRDYWxsYmFjayIsImNvbXBsZXRlQ29udGVudENhbGxiYWNrIiwiaXNBbGxBZENvbXBsZXRlIiwiaXNMaW5lYXJBZCIsImNvbnRlbnRDb21wbGV0ZSIsImlzQXV0b1BsYXlTdXBwb3J0Q2hlY2tUaW1lIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIiRhZHMiLCJmaW5kIiwicmVtb3ZlIiwib2ZmIiwiTGlzdGVuZXIiLCJhZHNTcGVjIiwibG93TGV2ZWxFdmVudHMiLCJpbnRlcnZhbFRpbWVyIiwiQURfQlVGRkVSSU5HIiwiQWRFdmVudCIsIkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVEIiwiQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEIiwiQUxMX0FEU19DT01QTEVURUQiLCJDTElDSyIsIlNLSVBQRUQiLCJDT01QTEVURSIsIkZJUlNUX1FVQVJUSUxFIiwiTE9BREVEIiwiTUlEUE9JTlQiLCJQQVVTRUQiLCJSRVNVTUVEIiwiU1RBUlRFRCIsIlVTRVJfQ0xPU0UiLCJUSElSRF9RVUFSVElMRSIsImlzQWxsQWRDb21wZWxldGUiLCJhZENvbXBsZXRlQ2FsbGJhY2siLCJjdXJyZW50QWQiLCJhZEV2ZW50IiwidHlwZSIsImdldFBvc2l0aW9uIiwic2V0U3RhdGUiLCJTVEFURV9DT01QTEVURSIsInJlbWFpbmluZ1RpbWUiLCJnZXRSZW1haW5pbmdUaW1lIiwiYWQiLCJnZXRBZCIsIlNUQVRFX0FEX0xPQURFRCIsInJlbWFpbmluZyIsImlzTGluZWFyIiwiU1RBVEVfQURfUEFVU0VEIiwiU1RBVEVfQURfUExBWUlORyIsImFkT2JqZWN0IiwiZHVyYXRpb24iLCJnZXREdXJhdGlvbiIsInNraXBUaW1lT2Zmc2V0IiwiZ2V0U2tpcFRpbWVPZmZzZXQiLCJBRF9DSEFOR0VEIiwic2V0SW50ZXJ2YWwiLCJBRF9USU1FIiwicG9zaXRpb24iLCJza2lwcGFibGUiLCJnZXRBZFNraXBwYWJsZVN0YXRlIiwiY2xlYXJJbnRlcnZhbCIsIlNUQVRFX0FEX0NPTVBMRVRFIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJldmVudE5hbWUiLCJzZXRBZENvbXBsZXRlQ2FsbGJhY2siLCJfYWRDb21wbGV0ZUNhbGxiYWNrIiwiZXh0cmFjdFZpZGVvRWxlbWVudCIsImVsZW1lbnRPck1zZSIsIl8iLCJpc0VsZW1lbnQiLCJnZXRWaWRlb0VsZW1lbnQiLCJtZWRpYSIsInNlcGFyYXRlTGl2ZSIsIm1zZSIsImlzRHluYW1pYyIsImVycm9yVHJpZ2dlciIsIlNUQVRFX0VSUk9SIiwiRVJST1IiLCJwaWNrQ3VycmVudFNvdXJjZSIsInNvdXJjZXMiLCJjdXJyZW50U291cmNlIiwic291cmNlSW5kZXgiLCJNYXRoIiwibWF4IiwibGFiZWwiLCJpIiwibGVuZ3RoIiwiZ2V0U291cmNlSW5kZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBTkE7OztBQW1CQSxJQUFNQSxNQUFNLFNBQU5BLEdBQU0sQ0FBU0MsT0FBVCxFQUFrQkMsUUFBbEIsRUFBNEJDLFlBQTVCLEVBQTBDQyxRQUExQyxFQUFvREMsYUFBcEQsRUFBa0U7QUFDMUU7QUFDQSxRQUFNQyx1QkFBdUIsb0JBQTdCO0FBQ0EsUUFBTUMseUJBQXlCLHlCQUEvQjtBQUNBLFFBQUlDLHFCQUFxQixFQUF6QjtBQUNBLFFBQUlDLFdBQVcsRUFBZjs7QUFFQSxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxtQkFBbUIsS0FBdkI7QUFDQSxRQUFJQyxPQUFPO0FBQ1BDLGlCQUFTLEtBREYsRUFDUztBQUNoQkMsZ0JBQVMsS0FGRixFQUVTO0FBQ2hCQyxzQkFBZSxLQUhSO0FBSVBDLDZCQUFzQjtBQUpmLEtBQVg7QUFNQSxRQUFJQyxZQUFZLElBQWhCO0FBQ0EsUUFBSUMsa0JBQWtCLElBQXRCOztBQUVBLFFBQUlDLHFCQUFxQixJQUF6QjtBQUNBLFFBQUlDLFlBQVksSUFBaEI7QUFDQSxRQUFJQyxhQUFhLElBQWpCO0FBQ0EsUUFBSUMsV0FBVyxJQUFmO0FBQ0EsUUFBSUMsYUFBYSxJQUFqQjtBQUNBLFFBQUlDLGtCQUFrQixLQUF0QjtBQUFBLFFBQTZCQyx3QkFBd0IsS0FBckQ7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFNQyxpQ0FBaUMs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YXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX4yZWMxOTNhYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDA4LzA0LzIwMTkuXG4gKi9cbmltcG9ydCBBZHNFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2Fkcy9MaXN0ZW5lclwiO1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUiwgRVJST1JTLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgSU5JVF9BRFNfRVJST1IsXG4gICAgU1RBVEVfQURfRVJST1IsXG4gICAgUExBWUVSX1dBUk5JTkcsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFdBUk5fTVNHX01VVEVEUExBWSxcbiAgICBTVEFURV9BRF9MT0FESU5HLFxuICAgIFVJX0lDT05TXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IEFkcyA9IGZ1bmN0aW9uKGVsVmlkZW8sIHByb3ZpZGVyLCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsLCBlcnJvckNhbGxiYWNrKXtcbiAgICAvL1RvZG8gOiBtb3ZlIGNyZWF0ZUFkQ29udGFpbmVyIHRvIE1lZGlhTWFuYWdlclxuICAgIGNvbnN0IEFVVE9QTEFZX05PVF9BTExPV0VEID0gXCJhdXRvcGxheU5vdEFsbG93ZWRcIjtcbiAgICBjb25zdCBBRE1BTkdFUl9MT0FESU5HX0VSUk9SID0gXCJhZG1hbmFnZXJMb2FkaW5nVGltZW91dFwiO1xuICAgIGxldCBBRFNfTUFOQUdFUl9MT0FERUQgPSBcIlwiO1xuICAgIGxldCBBRF9FUlJPUiA9IFwiXCI7XG5cbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBhZHNNYW5hZ2VyTG9hZGVkID0gZmFsc2U7XG4gICAgbGV0IHNwZWMgPSB7XG4gICAgICAgIHN0YXJ0ZWQ6IGZhbHNlLCAvL3BsYXllciBzdGFydGVkXG4gICAgICAgIGFjdGl2ZSA6IGZhbHNlLCAvL29uIEFkXG4gICAgICAgIGlzVmlkZW9FbmRlZCA6IGZhbHNlLFxuICAgICAgICBjaGVja0F1dG9wbGF5UGVyaW9kIDogdHJ1ZVxuICAgIH07XG4gICAgbGV0IE9uQWRFcnJvciA9IG51bGw7XG4gICAgbGV0IE9uTWFuYWdlckxvYWRlZCA9IG51bGw7XG5cbiAgICBsZXQgYWREaXNwbGF5Q29udGFpbmVyID0gbnVsbDtcbiAgICBsZXQgYWRzTG9hZGVyID0gbnVsbDtcbiAgICBsZXQgYWRzTWFuYWdlciA9IG51bGw7XG4gICAgbGV0IGxpc3RlbmVyID0gbnVsbDtcbiAgICBsZXQgYWRzUmVxdWVzdCA9IG51bGw7XG4gICAgbGV0IGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlLCBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcblxuXG4gICAgLy8gZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRBdXRvUGxheUFkQnJlYWtzKGZhbHNlKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuXG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldExvY2FsZSgna28nKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXModHJ1ZSk7XG4gICAgY29uc3Qgc2VuZFdhcm5pbmdNZXNzYWdlRm9yTXV0ZWRQbGF5ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZRVJfV0FSTklORywge1xuICAgICAgICAgICAgbWVzc2FnZSA6IFdBUk5fTVNHX01VVEVEUExBWSxcbiAgICAgICAgICAgIHRpbWVyIDogMTAgKiAxMDAwLFxuICAgICAgICAgICAgaWNvbkNsYXNzIDogVUlfSUNPTlMudm9sdW1lX211dGUsXG4gICAgICAgICAgICBvbkNsaWNrQ2FsbGJhY2sgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldE11dGUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IHN0YXJ0ZWQgXCIsIGFkVGFnVXJsKTtcblxuICAgIHRyeXtcbiAgICAgICAgQURTX01BTkFHRVJfTE9BREVEID0gZ29vZ2xlLmltYS5BZHNNYW5hZ2VyTG9hZGVkRXZlbnQuVHlwZS5BRFNfTUFOQUdFUl9MT0FERUQ7XG4gICAgICAgIEFEX0VSUk9SID0gZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUjtcbiAgICAgICAgZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUoXCJrb1wiKTtcbiAgICAgICAgZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXModHJ1ZSk7XG5cblxuXG5cbiAgICAgICAgY29uc3QgY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3ZwLWFkcycpO1xuICAgICAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdvdnAtYWRzJyk7XG4gICAgICAgICAgICBwbGF5ZXJDb25maWcuZ2V0Q29udGFpbmVyKCkuYXBwZW5kKGFkQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFkQ29udGFpbmVyO1xuICAgICAgICB9O1xuICAgICAgICBPbkFkRXJyb3IgPSBmdW5jdGlvbihhZEVycm9yRXZlbnQpe1xuICAgICAgICAgICAgLy9ub3RlIDogYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpLmdldEVycm9yQ29kZSgpID09PSAxMjA1ICYgYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpID09PSA0MDAgaXMgQnJvd3NlciBVc2VyIEludGVyYWN0aXZlIGVycm9yLlxuXG4gICAgICAgICAgICAvL0RvIG5vdCB0cmlnZ2VyaW5nIEVSUk9SLiBiZWN1YXNlIEl0IGp1c3QgQUQhXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSwgYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0TWVzc2FnZSgpKTtcblxuICAgICAgICAgICAgbGV0IGlubmVyRXJyb3IgPSBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRJbm5lckVycm9yKCk7XG4gICAgICAgICAgICBpZihpbm5lckVycm9yKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbm5lckVycm9yLmdldEVycm9yQ29kZSgpLCBpbm5lckVycm9yLmdldE1lc3NhZ2UoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWRzTWFuYWdlcikge1xuICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9FUlJPUiwge2NvZGUgOiBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRWYXN0RXJyb3JDb2RlKCkgLCBtZXNzYWdlIDogYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0TWVzc2FnZSgpfSk7XG4gICAgICAgICAgICBzcGVjLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcblxuICAgICAgICAgICAgLyppZihpbm5lckVycm9yICYmIGlubmVyRXJyb3IuZ2V0RXJyb3JDb2RlKCkgPT09IDEyMDUpe1xuICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgfSovXG5cblxuICAgICAgICB9O1xuICAgICAgICBPbk1hbmFnZXJMb2FkZWQgPSBmdW5jdGlvbihhZHNNYW5hZ2VyTG9hZGVkRXZlbnQpe1xuICAgICAgICAgICAgbGV0IGFkc1JlbmRlcmluZ1NldHRpbmdzID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVuZGVyaW5nU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIGFkc1JlbmRlcmluZ1NldHRpbmdzLnJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgLy9hZHNSZW5kZXJpbmdTZXR0aW5ncy51c2VTdHlsZWROb25MaW5lYXJBZHMgPSB0cnVlO1xuICAgICAgICAgICAgYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKGVsVmlkZW8sIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcblxuXG4gICAgICAgICAgICBsaXN0ZW5lciA9IEFkc0V2ZW50c0xpc3RlbmVyKGFkc01hbmFnZXIsIHByb3ZpZGVyLCBzcGVjLCBPbkFkRXJyb3IpO1xuXG4gICAgICAgICAgICBwcm92aWRlci5vbihDT05URU5UX1ZPTFVNRSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmKGRhdGEubXV0ZSl7XG4gICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc2V0Vm9sdW1lKDApO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnNldFZvbHVtZShkYXRhLnZvbHVtZS8xMDApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgdGhhdCk7XG5cbiAgICAgICAgICAgIGFkc01hbmFnZXJMb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgIH07XG5cblxuICAgICAgICBhZERpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIoY3JlYXRlQWRDb250YWluZXIoKSwgZWxWaWRlbyk7XG4gICAgICAgIGFkc0xvYWRlciA9IG5ldyBnb29nbGUuaW1hLkFkc0xvYWRlcihhZERpc3BsYXlDb250YWluZXIpO1xuXG4gICAgICAgIGFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKEFEU19NQU5BR0VSX0xPQURFRCwgT25NYW5hZ2VyTG9hZGVkLCBmYWxzZSk7XG4gICAgICAgIGFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKEFEX0VSUk9SLCBPbkFkRXJyb3IsIGZhbHNlKTtcblxuXG4gICAgICAgIGZ1bmN0aW9uIGluaXRSZXF1ZXN0KCl7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IEF1dG9QbGF5IFN1cHBvcnQgOiBcIiwgXCJhdXRvcGxheUFsbG93ZWRcIixhdXRvcGxheUFsbG93ZWQsIFwiYXV0b3BsYXlSZXF1aXJlc011dGVkXCIsYXV0b3BsYXlSZXF1aXJlc011dGVkKTtcblxuICAgICAgICAgICAgYWRzUmVxdWVzdCA9IG5ldyBnb29nbGUuaW1hLkFkc1JlcXVlc3QoKTtcblxuICAgICAgICAgICAgYWRzUmVxdWVzdC5mb3JjZU5vbkxpbmVhckZ1bGxTbG90ID0gZmFsc2U7XG4gICAgICAgICAgICAvKmlmKHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkuYnJvd3NlciA9PT0gXCJTYWZhcmlcIiAmJiBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zID09PSBcImlPU1wiICl7XG4gICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgIGFkc1JlcXVlc3Quc2V0QWRXaWxsQXV0b1BsYXkoYXV0b3BsYXlBbGxvd2VkKTtcbiAgICAgICAgICAgIGFkc1JlcXVlc3Quc2V0QWRXaWxsUGxheU11dGVkKGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XG4gICAgICAgICAgICBpZihhdXRvcGxheVJlcXVpcmVzTXV0ZWQpe1xuICAgICAgICAgICAgICAgIHNlbmRXYXJuaW5nTWVzc2FnZUZvck11dGVkUGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRzUmVxdWVzdC5hZFRhZ1VybCA9IGFkVGFnVXJsO1xuXG4gICAgICAgICAgICBhZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IHJlcXVlc3RBZHMgQ29tcGxldGVcIik7XG4gICAgICAgICAgICAvL3R3byB3YXkgd2hhdCBhZCBzdGFydHMuXG4gICAgICAgICAgICAvL2Fkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpOyBvciAgYWRzTWFuYWdlci5zdGFydCgpO1xuICAgICAgICAgICAgLy93aGF0PyB3aHk/PyB3dGg/P1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tBdXRvcGxheVN1cHBvcnQoKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRFMgOiBjaGVja0F1dG9wbGF5U3VwcG9ydCgpIFwiKTtcbiAgICAgICAgICAgIHNwZWMuY2hlY2tBdXRvcGxheVBlcmlvZCA9IHRydWU7XG4gICAgICAgICAgICAvL2xldCBjbG9uZVZpZGVvID0gZWxWaWRlby5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBpZighZWxWaWRlby5wbGF5KXtcbiAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNwZWMuY2hlY2tBdXRvcGxheVBlcmlvZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcGxheVByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgIGlmIChwbGF5UHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRFMgOiBDSEVDSyBBVVRPIFBMQVkgc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCB1bm11dGVkIGF1dG9wbGF5IHdvcmtzLlxuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzcGVjLmNoZWNrQXV0b3BsYXlQZXJpb2QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcblxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogQ0hFQ0sgQVVUTyBQTEFZIGZhaWxcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5UGVyaW9kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgLy9EaXNhYmxlIE11dGVkIFBsYXlcbiAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwbGF5UHJvbWlzZSA9IGVsVmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCBtdXRlZCBhdXRvcGxheSB3b3JrcyBidXQgdW5tdXRlZCBhdXRvcGxheSBkb2VzIG5vdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMuY2hlY2tBdXRvcGxheVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJvdGggbXV0ZWQgYW5kIHVubXV0ZWQgYXV0b3BsYXkgZmFpbGVkLiBGYWxsIGJhY2sgdG8gY2xpY2sgdG8gcGxheS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgLy9NYXliZSB0aGlzIGlzIElFMTEuLi4uXG4gICAgICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5UGVyaW9kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cblxuICAgICAgICB0aGF0LmlzQWN0aXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMuYWN0aXZlO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LnN0YXJ0ZWQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5zdGFydGVkO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XG4gICAgICAgICAgICAvL3Byb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuXG4gICAgICAgICAgICBpZihzcGVjLnN0YXJ0ZWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIucmVzdW1lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgICAgIC8vcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfTE9BRElORyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBjaGVja0F1dG9wbGF5U3VwcG9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFkc01hbmFnZXJMb2FkZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKChwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSAmJiAhYXV0b3BsYXlBbGxvd2VkKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSB0cnVlOyAvL2F1dG9wbGF5IGZhaWwuIHNldCBmb3JjZWQgYXV0b3BsYXlBbGxvd2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKEFVVE9QTEFZX05PVF9BTExPV0VEKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSSB0aGluayBkbyBub3QgbmVzc2Vzc2FyeSB0aGlzIGNvZGUgYW55bW9yZS4gQmVjYXVzZSBtdXRlZCBwbGF5IHNvbHZlcyBldmVyeXRoaW5nLiAyMDE5LTA2LTA0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qaWYocGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyAgPT09IFwiaU9TXCIgfHwgcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyAgPT09IFwiQW5kcm9pZFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRG9uJ3QgcGxheWluZyB2aWRlbyB3aGVuIHBsYXllciBjb21wbGV0ZSBwbGF5aW5nIEFELlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Pbmx5IGlPUyBTYWZhcmkgRmlyc3QgbG9hZGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkRGlzcGxheUNvbnRhaW5lci5pbml0aWFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuaW5pdChcIjEwMCVcIiwgXCIxMDAlXCIsIGdvb2dsZS5pbWEuVmlld01vZGUuTk9STUFMKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDMwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihBRE1BTkdFUl9MT0FESU5HX0VSUk9SKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xuICAgICAgICAgICAgYWRzTWFuYWdlci5wYXVzZSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LnZpZGVvRW5kZWRDYWxsYmFjayA9IChjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgLy9saXN0ZW5lci5pc0xpbmVhckFkIDogZ2V0IGN1cnJlbnQgYWQncyBzdGF0dXMgd2hldGhlciBsaW5lYXIgYWQgb3Igbm90LlxuICAgICAgICAgICAgaWYobGlzdGVuZXIgJiYgKGxpc3RlbmVyLmlzQWxsQWRDb21wbGV0ZSgpIHx8ICFsaXN0ZW5lci5pc0xpbmVhckFkKCkpKXtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaygpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgLy9Qb3N0IC0gUm9sbCDsnYQg7J6s7IOd7ZWY6riwIOychO2VtOyEnOuKlCDsvZjthZDsuKDqsIAg64Gd64Ks7J2M7J2EIGFkc0xvYWRlcuyXkOqyjCDslYzroKTslbwg7ZWc64ukXG4gICAgICAgICAgICAgICAgc3BlYy5pc1ZpZGVvRW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGFkc0xvYWRlci5jb250ZW50Q29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5pc0F1dG9QbGF5U3VwcG9ydENoZWNrVGltZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmNoZWNrQXV0b3BsYXlQZXJpb2Q7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYoYWRzTG9hZGVyKXtcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBRFNfTUFOQUdFUl9MT0FERUQsIE9uTWFuYWdlckxvYWRlZCk7XG4gICAgICAgICAgICAgICAgYWRzTG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQURfRVJST1IsIE9uQWRFcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGFkc01hbmFnZXIpe1xuICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihhZERpc3BsYXlDb250YWluZXIpe1xuICAgICAgICAgICAgICAgIGFkRGlzcGxheUNvbnRhaW5lci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGxpc3RlbmVyKXtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCAkYWRzID0gTEEkKHBsYXllckNvbmZpZy5nZXRDb250YWluZXIoKSkuZmluZChcIi5vdnAtYWRzXCIpO1xuICAgICAgICAgICAgaWYoJGFkcyl7XG4gICAgICAgICAgICAgICAgJGFkcy5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvdmlkZXIub2ZmKENPTlRFTlRfVk9MVU1FLCBudWxsLCB0aGF0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoYXQ7XG5cbiAgICB9Y2F0Y2ggKGVycm9yKXtcbiAgICAgICAgLy9sZXQgdGVtcEVycm9yID0gRVJST1JTW0lOSVRfQURTX0VSUk9SXTtcbiAgICAgICAgLy90ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgLy9lcnJvckNhbGxiYWNrKHRlbXBFcnJvcik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IEFkczsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAxMC8wNC8yMDE5LlxuICovXG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcbmltcG9ydCB7XG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9BRF9MT0FERUQsXG4gICAgU1RBVEVfQURfUExBWUlORyxcbiAgICBTVEFURV9BRF9QQVVTRUQsXG4gICAgU1RBVEVfQURfQ09NUExFVEUsXG4gICAgQURfQ0hBTkdFRCxcbiAgICBBRF9USU1FLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihhZHNNYW5hZ2VyLCBwcm92aWRlciwgYWRzU3BlYywgT25BZEVycm9yKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xuXG4gICAgbGV0IGludGVydmFsVGltZXIgPSBudWxsO1xuXG4gICAgY29uc3QgQURfQlVGRkVSSU5HID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQURfQlVGRkVSSU5HO1xuICAgIGNvbnN0IENPTlRFTlRfUEFVU0VfUkVRVUVTVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQ7XG4gICAgY29uc3QgQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEO1xuICAgIGNvbnN0IEFEX0VSUk9SID0gZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUjtcbiAgICBjb25zdCBBTExfQURTX0NPTVBMRVRFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFMTF9BRFNfQ09NUExFVEVEO1xuICAgIGNvbnN0IENMSUNLID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ0xJQ0s7XG4gICAgY29uc3QgU0tJUFBFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNLSVBQRUQ7XG4gICAgY29uc3QgQ09NUExFVEUgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT01QTEVURTtcbiAgICBjb25zdCBGSVJTVF9RVUFSVElMRT0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuRklSU1RfUVVBUlRJTEU7XG4gICAgY29uc3QgTE9BREVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVEO1xuICAgIGNvbnN0IE1JRFBPSU5UPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5NSURQT0lOVDtcbiAgICBjb25zdCBQQVVTRUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5QQVVTRUQ7XG4gICAgY29uc3QgUkVTVU1FRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlJFU1VNRUQ7XG4gICAgY29uc3QgU1RBUlRFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQ7XG4gICAgY29uc3QgVVNFUl9DTE9TRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlVTRVJfQ0xPU0U7XG4gICAgY29uc3QgVEhJUkRfUVVBUlRJTEUgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5USElSRF9RVUFSVElMRTtcblxuICAgIGxldCBpc0FsbEFkQ29tcGVsZXRlID0gZmFsc2U7ICAgLy9Qb3N0IHJvbGzsnYQg7JyE7ZW0XG4gICAgbGV0IGFkQ29tcGxldGVDYWxsYmFjayA9IG51bGw7XG4gICAgbGV0IGN1cnJlbnRBZCA9IG51bGw7XG5cbiAgICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9QQVVTRV9SRVFVRVNURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIC8vVGhpcyBjYWxsbHMgd2hlbiBwbGF5ZXIgaXMgcGxheWluZyBjb250ZW50cyBmb3IgYWQuXG4gICAgICAgICBpZihhZHNTcGVjLnN0YXJ0ZWQpe1xuICAgICAgICAgICAgIGFkc1NwZWMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzW0NPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgLy9UaGlzIGNhbGxzIHdoZW4gb25lIGFkIGVuZGVkLlxuICAgICAgICAvL0FuZCB0aGlzIGlzIHNpZ25hbCB3aGF0IHBsYXkgdGhlIGNvbnRlbnRzLlxuICAgICAgICBhZHNTcGVjLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmKGFkc1NwZWMuc3RhcnRlZCAmJiAocHJvdmlkZXIuZ2V0UG9zaXRpb24oKSA9PT0gMCB8fCAhYWRzU3BlYy5pc1ZpZGVvRW5kZWQpICApe1xuICAgICAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0FEX0VSUk9SXSA9IE9uQWRFcnJvcjtcblxuICAgIGxvd0xldmVsRXZlbnRzW0FMTF9BRFNfQ09NUExFVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBpc0FsbEFkQ29tcGVsZXRlID0gdHJ1ZTtcbiAgICAgICAgaWYoYWRzU3BlYy5pc1ZpZGVvRW5kZWQpe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tDTElDS10gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0ZJUlNUX1FVQVJUSUxFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgLy9cbiAgICBsb3dMZXZlbEV2ZW50c1tBRF9CVUZGRVJJTkddID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURfQlVGRkVSSU5HXCIsYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0xPQURFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IHJlbWFpbmluZ1RpbWUgPSBhZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICAvKnZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgdHlwZSA6XCJhZFwiXG4gICAgICAgIH07Ki9cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9MT0FERUQsIHtyZW1haW5pbmcgOiByZW1haW5pbmdUaW1lLCBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgfSk7XG5cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW01JRFBPSU5UXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbUEFVU0VEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QQVVTRUQpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbUkVTVU1FRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHNbU1RBUlRFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBjdXJyZW50QWQgPSBhZDtcblxuICAgICAgICBsZXQgYWRPYmplY3QgPSB7XG4gICAgICAgICAgICBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgLFxuICAgICAgICAgICAgZHVyYXRpb24gOiBhZC5nZXREdXJhdGlvbigpLFxuICAgICAgICAgICAgc2tpcFRpbWVPZmZzZXQgOiBhZC5nZXRTa2lwVGltZU9mZnNldCgpICAgICAvL1RoZSBudW1iZXIgb2Ygc2Vjb25kcyBvZiBwbGF5YmFjayBiZWZvcmUgdGhlIGFkIGJlY29tZXMgc2tpcHBhYmxlLlxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEFEX0NIQU5HRUQsIGFkT2JqZWN0KTtcblxuXG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG5cbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xuICAgICAgICAgICAgYWRzU3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIEZvciBhIGxpbmVhciBhZCwgYSB0aW1lciBjYW4gYmUgc3RhcnRlZCB0byBwb2xsIGZvclxuICAgICAgICAgICAgLy8gdGhlIHJlbWFpbmluZyB0aW1lLlxuICAgICAgICAgICAgaW50ZXJ2YWxUaW1lciA9IHNldEludGVydmFsKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZHVyYXRpb24gPSBhZC5nZXREdXJhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfVElNRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24gOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBUaW1lT2Zmc2V0IDogYWQuZ2V0U2tpcFRpbWVPZmZzZXQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZyA6IHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA6IGR1cmF0aW9uIC0gcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBwYWJsZSA6IGFkc01hbmFnZXIuZ2V0QWRTa2lwcGFibGVTdGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMzAwKTsgLy8gZXZlcnkgMzAwbXNcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0NPTVBMRVRFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgLy9Vc2VyIHNraXBwZWQgYWQuIHNhbWUgcHJvY2VzcyBvbiBjb21wbGV0ZS5cbiAgICBsb3dMZXZlbEV2ZW50c1tTS0lQUEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuXG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tVU0VSX0NMT1NFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbVEhJUkRfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcblxuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuICAgIHRoYXQuc2V0QWRDb21wbGV0ZUNhbGxiYWNrID0gKF9hZENvbXBsZXRlQ2FsbGJhY2spID0+IHtcbiAgICAgICAgYWRDb21wbGV0ZUNhbGxiYWNrID0gX2FkQ29tcGxldGVDYWxsYmFjaztcbiAgICB9O1xuICAgIHRoYXQuaXNBbGxBZENvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaXNBbGxBZENvbXBlbGV0ZTtcbiAgICB9O1xuICAgIHRoYXQuaXNMaW5lYXJBZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRBZCAgPyBjdXJyZW50QWQuaXNMaW5lYXIoKSA6IHRydWU7XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQWRzRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDEyLi5cbiAqL1xuaW1wb3J0IHtFUlJPUiwgU1RBVEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnRPck1zZSkge1xuICAgIGlmKF8uaXNFbGVtZW50KGVsZW1lbnRPck1zZSkpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlO1xuICAgIH1cbiAgICBpZihlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQoKTtcbiAgICB9ZWxzZSBpZihlbGVtZW50T3JNc2UubWVkaWEpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLm1lZGlhO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUxpdmUgPSBmdW5jdGlvbihtc2UpIHtcbiAgICAvL1RvRG8gOiBZb3UgY29uc2lkZXIgaGxzanMuIEJ1dCBub3Qgbm93IGJlY2F1c2Ugd2UgZG9uJ3Qgc3VwcG9ydCBobHNqcy5cblxuICAgIGlmKG1zZSAmJiBtc2UuaXNEeW5hbWljKXtcbiAgICAgICAgcmV0dXJuIG1zZS5pc0R5bmFtaWMoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBlcnJvclRyaWdnZXIgPSBmdW5jdGlvbihlcnJvciwgcHJvdmlkZXIpe1xuICAgIGlmKHByb3ZpZGVyKXtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xuICAgIH1cblxufTtcblxuZXhwb3J0IGNvbnN0IHBpY2tDdXJyZW50U291cmNlID0gKHNvdXJjZXMsIGN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZykgPT4ge1xuICAgIGxldCBzb3VyY2VJbmRleCA9IE1hdGgubWF4KDAsIGN1cnJlbnRTb3VyY2UpO1xuICAgIGNvbnN0IGxhYmVsID1cIlwiO1xuICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSA9PT0gaSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSovXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZUluZGV4O1xufTsiXSwic291cmNlUm9vdCI6IiJ9