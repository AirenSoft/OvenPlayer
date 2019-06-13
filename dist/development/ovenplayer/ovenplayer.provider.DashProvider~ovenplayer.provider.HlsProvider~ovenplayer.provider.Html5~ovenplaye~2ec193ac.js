/*! OvenPlayerv0.9.599 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

            OvenPlayerConsole.log("ADS : initRequest() AutoPlay Support : ", "autoplayAllowed", autoplayAllowed, "autoplayRequiresMuted", autoplayRequiresMuted);
            if (adsRequest) {
                return false;
            }
            adsRequest = new google.ima.AdsRequest();

            adsRequest.forceNonLinearFullSlot = false;
            /*if(playerConfig.getBrowser().browser === "Safari" && playerConfig.getBrowser().os === "iOS" ){
             autoplayAllowed = false;
             autoplayRequiresMuted = false;
             }*/

            adsRequest.setAdWillAutoPlay(true);
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
            OvenPlayerConsole.log("ADS : OnManagerLoaded ");
            var adsRenderingSettings = new google.ima.AdsRenderingSettings();
            adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
            //adsRenderingSettings.useStyledNonLinearAds = true;

            //if(!adsManager)
            {
                adsManager = adsManagerLoadedEvent.getAdsManager(elVideo, adsRenderingSettings);

                listener = (0, _Listener2["default"])(adsManager, provider, spec, OnAdError);

                OvenPlayerConsole.log("ADS : created admanager and listner ");

                provider.on(_constants.CONTENT_VOLUME, function (data) {
                    if (data.mute) {
                        adsManager.setVolume(0);
                    } else {
                        adsManager.setVolume(data.volume / 100);
                    }
                }, that);

                adsManagerLoaded = true;
            }
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
    lowLevelEvents[AD_ERROR] = function (adEvent) {
        isAllAdCompelete = true;
        OnAdError(adEvent);
    };

    lowLevelEvents[ALL_ADS_COMPLETED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Fkcy9BZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9hZHMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci91dGlscy5qcyJdLCJuYW1lcyI6WyJBZHMiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsImVycm9yQ2FsbGJhY2siLCJBVVRPUExBWV9OT1RfQUxMT1dFRCIsIkFETUFOR0VSX0xPQURJTkdfRVJST1IiLCJBRFNfTUFOQUdFUl9MT0FERUQiLCJBRF9FUlJPUiIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJjaGVja0F1dG9wbGF5UGVyaW9kIiwiT25BZEVycm9yIiwiT25NYW5hZ2VyTG9hZGVkIiwiYWREaXNwbGF5Q29udGFpbmVyIiwiYWRzTG9hZGVyIiwiYWRzTWFuYWdlciIsImxpc3RlbmVyIiwiYWRzUmVxdWVzdCIsImF1dG9wbGF5QWxsb3dlZCIsImF1dG9wbGF5UmVxdWlyZXNNdXRlZCIsInNlbmRXYXJuaW5nTWVzc2FnZUZvck11dGVkUGxheSIsInRyaWdnZXIiLCJQTEFZRVJfV0FSTklORyIsIm1lc3NhZ2UiLCJXQVJOX01TR19NVVRFRFBMQVkiLCJ0aW1lciIsImljb25DbGFzcyIsIlVJX0lDT05TIiwidm9sdW1lX211dGUiLCJvbkNsaWNrQ2FsbGJhY2siLCJzZXRNdXRlIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJpbml0UmVxdWVzdCIsImdvb2dsZSIsImltYSIsIkFkc1JlcXVlc3QiLCJmb3JjZU5vbkxpbmVhckZ1bGxTbG90Iiwic2V0QWRXaWxsQXV0b1BsYXkiLCJzZXRBZFdpbGxQbGF5TXV0ZWQiLCJyZXF1ZXN0QWRzIiwiY2hlY2tBdXRvcGxheVN1cHBvcnQiLCJwbGF5IiwicGxheVByb21pc2UiLCJ1bmRlZmluZWQiLCJ0aGVuIiwicGF1c2UiLCJlcnJvciIsIkFkc01hbmFnZXJMb2FkZWRFdmVudCIsIlR5cGUiLCJBZEVycm9yRXZlbnQiLCJzZXR0aW5ncyIsInNldExvY2FsZSIsInNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyIsImNyZWF0ZUFkQ29udGFpbmVyIiwiYWRDb250YWluZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJnZXRDb250YWluZXIiLCJhcHBlbmQiLCJhZEVycm9yRXZlbnQiLCJjb25zb2xlIiwiZ2V0RXJyb3IiLCJnZXRWYXN0RXJyb3JDb2RlIiwiZ2V0TWVzc2FnZSIsImlubmVyRXJyb3IiLCJnZXRJbm5lckVycm9yIiwiZ2V0RXJyb3JDb2RlIiwiZGVzdHJveSIsIlNUQVRFX0FEX0VSUk9SIiwiY29kZSIsImFkc01hbmFnZXJMb2FkZWRFdmVudCIsImFkc1JlbmRlcmluZ1NldHRpbmdzIiwiQWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJyZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlIiwiZ2V0QWRzTWFuYWdlciIsIm9uIiwiQ09OVEVOVF9WT0xVTUUiLCJkYXRhIiwibXV0ZSIsInNldFZvbHVtZSIsInZvbHVtZSIsIkFkRGlzcGxheUNvbnRhaW5lciIsIkFkc0xvYWRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJpc0FjdGl2ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVzdW1lIiwicmV0cnlDb3VudCIsImNoZWNrQWRzTWFuYWdlcklzUmVhZHkiLCJpc0F1dG9TdGFydCIsIkVycm9yIiwiaW5pdGlhbGl6ZSIsImluaXQiLCJWaWV3TW9kZSIsIk5PUk1BTCIsInN0YXJ0Iiwic2V0VGltZW91dCIsInZpZGVvRW5kZWRDYWxsYmFjayIsImNvbXBsZXRlQ29udGVudENhbGxiYWNrIiwiaXNBbGxBZENvbXBsZXRlIiwiaXNMaW5lYXJBZCIsImNvbnRlbnRDb21wbGV0ZSIsImlzQXV0b1BsYXlTdXBwb3J0Q2hlY2tUaW1lIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIiRhZHMiLCJmaW5kIiwicmVtb3ZlIiwib2ZmIiwiTGlzdGVuZXIiLCJhZHNTcGVjIiwibG93TGV2ZWxFdmVudHMiLCJpbnRlcnZhbFRpbWVyIiwiQURfQlVGRkVSSU5HIiwiQWRFdmVudCIsIkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVEIiwiQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEIiwiQUxMX0FEU19DT01QTEVURUQiLCJDTElDSyIsIlNLSVBQRUQiLCJDT01QTEVURSIsIkZJUlNUX1FVQVJUSUxFIiwiTE9BREVEIiwiTUlEUE9JTlQiLCJQQVVTRUQiLCJSRVNVTUVEIiwiU1RBUlRFRCIsIlVTRVJfQ0xPU0UiLCJUSElSRF9RVUFSVElMRSIsImlzQWxsQWRDb21wZWxldGUiLCJhZENvbXBsZXRlQ2FsbGJhY2siLCJjdXJyZW50QWQiLCJhZEV2ZW50IiwidHlwZSIsImdldFBvc2l0aW9uIiwic2V0U3RhdGUiLCJTVEFURV9DT01QTEVURSIsIlBMQVlFUl9DTElDS0VEIiwiUExBWUVSX0FEX0NMSUNLIiwicmVtYWluaW5nVGltZSIsImdldFJlbWFpbmluZ1RpbWUiLCJhZCIsImdldEFkIiwiU1RBVEVfQURfTE9BREVEIiwicmVtYWluaW5nIiwiaXNMaW5lYXIiLCJTVEFURV9BRF9QQVVTRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiYWRPYmplY3QiLCJkdXJhdGlvbiIsImdldER1cmF0aW9uIiwic2tpcFRpbWVPZmZzZXQiLCJnZXRTa2lwVGltZU9mZnNldCIsIkFEX0NIQU5HRUQiLCJzZXRJbnRlcnZhbCIsIkFEX1RJTUUiLCJwb3NpdGlvbiIsInNraXBwYWJsZSIsImdldEFkU2tpcHBhYmxlU3RhdGUiLCJjbGVhckludGVydmFsIiwiU1RBVEVfQURfQ09NUExFVEUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImV2ZW50TmFtZSIsInNldEFkQ29tcGxldGVDYWxsYmFjayIsIl9hZENvbXBsZXRlQ2FsbGJhY2siLCJleHRyYWN0VmlkZW9FbGVtZW50IiwiZWxlbWVudE9yTXNlIiwiXyIsImlzRWxlbWVudCIsImdldFZpZGVvRWxlbWVudCIsIm1lZGlhIiwic2VwYXJhdGVMaXZlIiwibXNlIiwiaXNEeW5hbWljIiwiZXJyb3JUcmlnZ2VyIiwiU1RBVEVfRVJST1IiLCJFUlJPUiIsInBpY2tDdXJyZW50U291cmNlIiwic291cmNlcyIsImN1cnJlbnRTb3VyY2UiLCJzb3VyY2VJbmRleCIsIk1hdGgiLCJtYXgiLCJsYWJlbCIsImkiLCJsZW5ndGgiLCJnZXRTb3VyY2VJbmRleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFOQTs7O0FBbUJBLElBQU1BLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxPQUFULEVBQWtCQyxRQUFsQixFQUE0QkMsWUFBNUIsRUFBMENDLFFBQTFDLEVBQW9EQyxhQUFwRCxFQUFrRTtBQUMxRTtBQUNBLFFBQU1DLHVCQUF1QixvQkFBN0I7QUFDQSxRQUFNQyx5QkFBeUIseUJBQS9CO0FBQ0EsUUFBSUMscUJBQXFCLEVBQXpCO0FBQ0EsUUFBSUMsV0FBVyxFQUFmOztBQUVBLFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLE9BQU87QUFDUEMsaUJBQVMsS0FERixFQUNTO0FBQ2hCQyxnQkFBUyxLQUZGLEVBRVM7QUFDaEJDLHNCQUFlLEtBSFI7QUFJUEMsNkJBQXNCO0FBSmYsS0FBWDtBQU1BLFFBQUlDLFlBQVksSUFBaEI7QUFDQSxRQUFJQyxrQkFBa0IsSUFBdEI7O0FBRUEsUUFBSUMscUJBQXFCLElBQXpCO0FBQ0EsUUFBSUMsWUFBWSxJQUFoQjtBQUNBLFFBQUlDLGFBQWEsSUFBakI7QUFDQSxRQUFJQyxXQUFXLElBQWY7QUFDQSxRQUFJQyxhQUFhLElBQWpCO0FBQ0EsUUFBSUMsa0JBQWtCLEtBQXRCO0FBQUEsUUFBNkJDLHdCQUF3QixLQUFyRDs7QUFHQTtBQUNB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LFFBQUlMLE9BQUosRUFBYTtBQUNULGFBQUssSUFBSU0sSUFBSSxDQUFiLEVBQWdCQSxJQUFJTixRQUFRTyxNQUE1QixFQUFvQ0QsR0FBcEMsRUFBeUM7QUFDckMsZ0JBQUlOLFFBQVFNLENBQVIsWUFBSixFQUF3QjtBQUNwQkosOEJBQWNJLENBQWQ7QUFDSDtBQUNELGdCQUFJaE0sYUFBYWtNLGNBQWIsT0FBa0NGLENBQXRDLEVBQTBDO0FBQ3RDLHVCQUFPQSxDQUFQO0FBQ0g7QUFDRDs7O0FBR0g7QUFDSjtBQUNELFdBQU9KLFdBQVA7QUFDSCxDQWpCTSxDIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+MmVjMTkzYWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAwOC8wNC8yMDE5LlxuICovXG5pbXBvcnQgQWRzRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9hZHMvTGlzdGVuZXJcIjtcbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgRVJST1IsIEVSUk9SUyxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIElOSVRfQURTX0VSUk9SLFxuICAgIFNUQVRFX0FEX0VSUk9SLFxuICAgIFBMQVlFUl9XQVJOSU5HLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBXQVJOX01TR19NVVRFRFBMQVksXG4gICAgU1RBVEVfQURfTE9BRElORyxcbiAgICBVSV9JQ09OU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBBZHMgPSBmdW5jdGlvbihlbFZpZGVvLCBwcm92aWRlciwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCwgZXJyb3JDYWxsYmFjayl7XG4gICAgLy9Ub2RvIDogbW92ZSBjcmVhdGVBZENvbnRhaW5lciB0byBNZWRpYU1hbmFnZXJcbiAgICBjb25zdCBBVVRPUExBWV9OT1RfQUxMT1dFRCA9IFwiYXV0b3BsYXlOb3RBbGxvd2VkXCI7XG4gICAgY29uc3QgQURNQU5HRVJfTE9BRElOR19FUlJPUiA9IFwiYWRtYW5hZ2VyTG9hZGluZ1RpbWVvdXRcIjtcbiAgICBsZXQgQURTX01BTkFHRVJfTE9BREVEID0gXCJcIjtcbiAgICBsZXQgQURfRVJST1IgPSBcIlwiO1xuXG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgYWRzTWFuYWdlckxvYWRlZCA9IGZhbHNlO1xuICAgIGxldCBzcGVjID0ge1xuICAgICAgICBzdGFydGVkOiBmYWxzZSwgLy9wbGF5ZXIgc3RhcnRlZFxuICAgICAgICBhY3RpdmUgOiBmYWxzZSwgLy9vbiBBZFxuICAgICAgICBpc1ZpZGVvRW5kZWQgOiBmYWxzZSxcbiAgICAgICAgY2hlY2tBdXRvcGxheVBlcmlvZCA6IHRydWVcbiAgICB9O1xuICAgIGxldCBPbkFkRXJyb3IgPSBudWxsO1xuICAgIGxldCBPbk1hbmFnZXJMb2FkZWQgPSBudWxsO1xuXG4gICAgbGV0IGFkRGlzcGxheUNvbnRhaW5lciA9IG51bGw7XG4gICAgbGV0IGFkc0xvYWRlciA9IG51bGw7XG4gICAgbGV0IGFkc01hbmFnZXIgPSBudWxsO1xuICAgIGxldCBsaXN0ZW5lciA9IG51bGw7XG4gICAgbGV0IGFkc1JlcXVlc3QgPSBudWxsO1xuICAgIGxldCBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZSwgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG5cblxuICAgIC8vIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0QXV0b1BsYXlBZEJyZWFrcyhmYWxzZSk7XG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldFZwYWlkTW9kZShnb29nbGUuaW1hLkltYVNka1NldHRpbmdzLlZwYWlkTW9kZS5FTkFCTEVEKTtcblxuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUoJ2tvJyk7XG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldFZwYWlkTW9kZShnb29nbGUuaW1hLkltYVNka1NldHRpbmdzLlZwYWlkTW9kZS5FTkFCTEVEKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xuICAgIGNvbnN0IHNlbmRXYXJuaW5nTWVzc2FnZUZvck11dGVkUGxheSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoUExBWUVSX1dBUk5JTkcsIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgOiBXQVJOX01TR19NVVRFRFBMQVksXG4gICAgICAgICAgICB0aW1lciA6IDEwICogMTAwMCxcbiAgICAgICAgICAgIGljb25DbGFzcyA6IFVJX0lDT05TLnZvbHVtZV9tdXRlLFxuICAgICAgICAgICAgb25DbGlja0NhbGxiYWNrIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRNdXRlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRFMgOiBzdGFydGVkIFwiLCBhZFRhZ1VybCk7XG5cbiAgICB0cnl7XG4gICAgICAgIEFEU19NQU5BR0VSX0xPQURFRCA9IGdvb2dsZS5pbWEuQWRzTWFuYWdlckxvYWRlZEV2ZW50LlR5cGUuQURTX01BTkFHRVJfTE9BREVEO1xuICAgICAgICBBRF9FUlJPUiA9IGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1I7XG4gICAgICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0TG9jYWxlKFwia29cIik7XG4gICAgICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xuXG5cblxuXG4gICAgICAgIGNvbnN0IGNyZWF0ZUFkQ29udGFpbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ292cC1hZHMnKTtcbiAgICAgICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnb3ZwLWFkcycpO1xuICAgICAgICAgICAgcGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpLmFwcGVuZChhZENvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcbiAgICAgICAgfTtcbiAgICAgICAgT25BZEVycm9yID0gZnVuY3Rpb24oYWRFcnJvckV2ZW50KXtcbiAgICAgICAgICAgIC8vbm90ZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldElubmVyRXJyb3IoKS5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSAmIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSA9PT0gNDAwIGlzIEJyb3dzZXIgVXNlciBJbnRlcmFjdGl2ZSBlcnJvci5cblxuICAgICAgICAgICAgLy9EbyBub3QgdHJpZ2dlcmluZyBFUlJPUi4gYmVjdWFzZSBJdCBqdXN0IEFEIVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRWYXN0RXJyb3JDb2RlKCksIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldE1lc3NhZ2UoKSk7XG5cbiAgICAgICAgICAgIGxldCBpbm5lckVycm9yID0gYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpO1xuICAgICAgICAgICAgaWYoaW5uZXJFcnJvcil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5uZXJFcnJvci5nZXRFcnJvckNvZGUoKSwgaW5uZXJFcnJvci5nZXRNZXNzYWdlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFkc01hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfRVJST1IsIHtjb2RlIDogYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpICwgbWVzc2FnZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldE1lc3NhZ2UoKX0pO1xuICAgICAgICAgICAgc3BlYy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHNwZWMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG5cbiAgICAgICAgICAgIC8qaWYoaW5uZXJFcnJvciAmJiBpbm5lckVycm9yLmdldEVycm9yQ29kZSgpID09PSAxMjA1KXtcbiAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgIH0qL1xuXG5cbiAgICAgICAgfTtcbiAgICAgICAgT25NYW5hZ2VyTG9hZGVkID0gZnVuY3Rpb24oYWRzTWFuYWdlckxvYWRlZEV2ZW50KXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IE9uTWFuYWdlckxvYWRlZCBcIik7XG4gICAgICAgICAgICBsZXQgYWRzUmVuZGVyaW5nU2V0dGluZ3MgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZW5kZXJpbmdTZXR0aW5ncygpO1xuICAgICAgICAgICAgYWRzUmVuZGVyaW5nU2V0dGluZ3MucmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICAvL2Fkc1JlbmRlcmluZ1NldHRpbmdzLnVzZVN0eWxlZE5vbkxpbmVhckFkcyA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vaWYoIWFkc01hbmFnZXIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKGVsVmlkZW8sIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcblxuICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gQWRzRXZlbnRzTGlzdGVuZXIoYWRzTWFuYWdlciwgcHJvdmlkZXIsIHNwZWMsIE9uQWRFcnJvcik7XG5cbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRFMgOiBjcmVhdGVkIGFkbWFuYWdlciBhbmQgbGlzdG5lciBcIik7XG5cbiAgICAgICAgICAgICAgICBwcm92aWRlci5vbihDT05URU5UX1ZPTFVNRSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLm11dGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zZXRWb2x1bWUoMCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zZXRWb2x1bWUoZGF0YS52b2x1bWUvMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSwgdGhhdCk7XG5cbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBhZERpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIoY3JlYXRlQWRDb250YWluZXIoKSwgZWxWaWRlbyk7XG4gICAgICAgIGFkc0xvYWRlciA9IG5ldyBnb29nbGUuaW1hLkFkc0xvYWRlcihhZERpc3BsYXlDb250YWluZXIpO1xuXG4gICAgICAgIGFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKEFEU19NQU5BR0VSX0xPQURFRCwgT25NYW5hZ2VyTG9hZGVkLCBmYWxzZSk7XG4gICAgICAgIGFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKEFEX0VSUk9SLCBPbkFkRXJyb3IsIGZhbHNlKTtcblxuXG4gICAgICAgIGZ1bmN0aW9uIGluaXRSZXF1ZXN0KCl7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IGluaXRSZXF1ZXN0KCkgQXV0b1BsYXkgU3VwcG9ydCA6IFwiLCBcImF1dG9wbGF5QWxsb3dlZFwiLGF1dG9wbGF5QWxsb3dlZCwgXCJhdXRvcGxheVJlcXVpcmVzTXV0ZWRcIixhdXRvcGxheVJlcXVpcmVzTXV0ZWQpO1xuICAgICAgICAgICAgaWYoYWRzUmVxdWVzdCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRzUmVxdWVzdCA9IG5ldyBnb29nbGUuaW1hLkFkc1JlcXVlc3QoKTtcblxuICAgICAgICAgICAgYWRzUmVxdWVzdC5mb3JjZU5vbkxpbmVhckZ1bGxTbG90ID0gZmFsc2U7XG4gICAgICAgICAgICAvKmlmKHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkuYnJvd3NlciA9PT0gXCJTYWZhcmlcIiAmJiBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zID09PSBcImlPU1wiICl7XG4gICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgIGFkc1JlcXVlc3Quc2V0QWRXaWxsQXV0b1BsYXkodHJ1ZSk7XG4gICAgICAgICAgICBhZHNSZXF1ZXN0LnNldEFkV2lsbFBsYXlNdXRlZChhdXRvcGxheVJlcXVpcmVzTXV0ZWQpO1xuICAgICAgICAgICAgaWYoYXV0b3BsYXlSZXF1aXJlc011dGVkKXtcbiAgICAgICAgICAgICAgICBzZW5kV2FybmluZ01lc3NhZ2VGb3JNdXRlZFBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkc1JlcXVlc3QuYWRUYWdVcmwgPSBhZFRhZ1VybDtcblxuICAgICAgICAgICAgYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRFMgOiByZXF1ZXN0QWRzIENvbXBsZXRlXCIpO1xuICAgICAgICAgICAgLy90d28gd2F5IHdoYXQgYWQgc3RhcnRzLlxuICAgICAgICAgICAgLy9hZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTsgb3IgIGFkc01hbmFnZXIuc3RhcnQoKTtcbiAgICAgICAgICAgIC8vd2hhdD8gd2h5Pz8gd3RoPz9cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkge1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogY2hlY2tBdXRvcGxheVN1cHBvcnQoKSBcIik7XG4gICAgICAgICAgICBzcGVjLmNoZWNrQXV0b3BsYXlQZXJpb2QgPSB0cnVlO1xuICAgICAgICAgICAgLy9sZXQgY2xvbmVWaWRlbyA9IGVsVmlkZW8uY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgaWYoIWVsVmlkZW8ucGxheSl7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzcGVjLmNoZWNrQXV0b3BsYXlQZXJpb2QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBsYXlQcm9taXNlID0gZWxWaWRlby5wbGF5KCk7XG4gICAgICAgICAgICBpZiAocGxheVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHBsYXlQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURTIDogQ0hFQ0sgQVVUTyBQTEFZIHN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIG1ha2UgaXQgaGVyZSwgdW5tdXRlZCBhdXRvcGxheSB3b3Jrcy5cbiAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5UGVyaW9kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEUyA6IENIRUNLIEFVVE8gUExBWSBmYWlsXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMuY2hlY2tBdXRvcGxheVBlcmlvZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgIC8vRGlzYWJsZSBNdXRlZCBQbGF5XG4gICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGxheVByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXlQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIG1ha2UgaXQgaGVyZSwgbXV0ZWQgYXV0b3BsYXkgd29ya3MgYnV0IHVubXV0ZWQgYXV0b3BsYXkgZG9lcyBub3QuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLmNoZWNrQXV0b3BsYXlTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCb3RoIG11dGVkIGFuZCB1bm11dGVkIGF1dG9wbGF5IGZhaWxlZC4gRmFsbCBiYWNrIHRvIGNsaWNrIHRvIHBsYXkuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMuY2hlY2tBdXRvcGxheVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vTWF5YmUgdGhpcyBpcyBJRTExLi4uLlxuICAgICAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNwZWMuY2hlY2tBdXRvcGxheVBlcmlvZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgdGhhdC5pc0FjdGl2ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmFjdGl2ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5zdGFydGVkID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMuc3RhcnRlZDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAgICAgLy9wcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcblxuICAgICAgICAgICAgaWYoc3BlYy5zdGFydGVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnJlc3VtZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAvL3Byb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX0xPQURJTkcpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBdXRvcGxheVN1cHBvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrQWRzTWFuYWdlcklzUmVhZHkoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhZHNNYW5hZ2VyTG9hZGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkgJiYgIWF1dG9wbGF5QWxsb3dlZCkgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTsgLy9hdXRvcGxheSBmYWlsLiBzZXQgZm9yY2VkIGF1dG9wbGF5QWxsb3dlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihBVVRPUExBWV9OT1RfQUxMT1dFRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0kgdGhpbmsgZG8gbm90IG5lc3Nlc3NhcnkgdGhpcyBjb2RlIGFueW1vcmUuIEJlY2F1c2UgbXV0ZWQgcGxheSBzb2x2ZXMgZXZlcnl0aGluZy4gMjAxOS0wNi0wNFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKmlmKHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgID09PSBcImlPU1wiIHx8IHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgID09PSBcIkFuZHJvaWRcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0Rvbid0IHBsYXlpbmcgdmlkZW8gd2hlbiBwbGF5ZXIgY29tcGxldGUgcGxheWluZyBBRC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vT25seSBpT1MgU2FmYXJpIEZpcnN0IGxvYWRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmluaXQoXCIxMDAlXCIsIFwiMTAwJVwiLCBnb29nbGUuaW1hLlZpZXdNb2RlLk5PUk1BTCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAzMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrQWRzTWFuYWdlcklzUmVhZHksIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoQURNQU5HRVJfTE9BRElOR19FUlJPUikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGFkc01hbmFnZXIucGF1c2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC52aWRlb0VuZGVkQ2FsbGJhY2sgPSAoY29tcGxldGVDb250ZW50Q2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIC8vbGlzdGVuZXIuaXNMaW5lYXJBZCA6IGdldCBjdXJyZW50IGFkJ3Mgc3RhdHVzIHdoZXRoZXIgbGluZWFyIGFkIG9yIG5vdC5cbiAgICAgICAgICAgIGlmKGxpc3RlbmVyICYmIChsaXN0ZW5lci5pc0FsbEFkQ29tcGxldGUoKSB8fCAhbGlzdGVuZXIuaXNMaW5lYXJBZCgpKSl7XG4gICAgICAgICAgICAgICAgY29tcGxldGVDb250ZW50Q2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vUG9zdCAtIFJvbGwg7J2EIOyerOyDne2VmOq4sCDsnITtlbTshJzripQg7L2Y7YWQ7Lig6rCAIOuBneuCrOydjOydhCBhZHNMb2FkZXLsl5Dqsowg7JWM66Ck7JW8IO2VnOuLpFxuICAgICAgICAgICAgICAgIHNwZWMuaXNWaWRlb0VuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhZHNMb2FkZXIuY29udGVudENvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuaXNBdXRvUGxheVN1cHBvcnRDaGVja1RpbWUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5jaGVja0F1dG9wbGF5UGVyaW9kO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmKGFkc0xvYWRlcil7XG4gICAgICAgICAgICAgICAgYWRzTG9hZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQURTX01BTkFHRVJfTE9BREVELCBPbk1hbmFnZXJMb2FkZWQpO1xuICAgICAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEX0VSUk9SLCBPbkFkRXJyb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihhZHNNYW5hZ2VyKXtcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoYWREaXNwbGF5Q29udGFpbmVyKXtcbiAgICAgICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihsaXN0ZW5lcil7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgJGFkcyA9IExBJChwbGF5ZXJDb25maWcuZ2V0Q29udGFpbmVyKCkpLmZpbmQoXCIub3ZwLWFkc1wiKTtcbiAgICAgICAgICAgIGlmKCRhZHMpe1xuICAgICAgICAgICAgICAgICRhZHMucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByb3ZpZGVyLm9mZihDT05URU5UX1ZPTFVNRSwgbnVsbCwgdGhhdCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGF0O1xuXG4gICAgfWNhdGNoIChlcnJvcil7XG4gICAgICAgIC8vbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tJTklUX0FEU19FUlJPUl07XG4gICAgICAgIC8vdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgIC8vZXJyb3JDYWxsYmFjayh0ZW1wRXJyb3IpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBBZHM7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMTAvMDQvMjAxOS5cbiAqL1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5pbXBvcnQge1xuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfQURfTE9BREVELFxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXG4gICAgU1RBVEVfQURfUEFVU0VELFxuICAgIFNUQVRFX0FEX0NPTVBMRVRFLFxuICAgIEFEX0NIQU5HRUQsXG4gICAgQURfVElNRSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsXG4gICAgUExBWUVSX0NMSUNLRUQsXG4gICAgUExBWUVSX0FEX0NMSUNLLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGFkc01hbmFnZXIsIHByb3ZpZGVyLCBhZHNTcGVjLCBPbkFkRXJyb3Ipe1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGxvd0xldmVsRXZlbnRzID0ge307XG5cbiAgICBsZXQgaW50ZXJ2YWxUaW1lciA9IG51bGw7XG5cbiAgICBjb25zdCBBRF9CVUZGRVJJTkcgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BRF9CVUZGRVJJTkc7XG4gICAgY29uc3QgQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRDtcbiAgICBjb25zdCBDT05URU5UX1JFU1VNRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQ7XG4gICAgY29uc3QgQURfRVJST1IgPSBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SO1xuICAgIGNvbnN0IEFMTF9BRFNfQ09NUExFVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQ7XG4gICAgY29uc3QgQ0xJQ0sgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DTElDSztcbiAgICBjb25zdCBTS0lQUEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU0tJUFBFRDtcbiAgICBjb25zdCBDT01QTEVURSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFO1xuICAgIGNvbnN0IEZJUlNUX1FVQVJUSUxFPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5GSVJTVF9RVUFSVElMRTtcbiAgICBjb25zdCBMT0FERUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQ7XG4gICAgY29uc3QgTUlEUE9JTlQ9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLk1JRFBPSU5UO1xuICAgIGNvbnN0IFBBVVNFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlBBVVNFRDtcbiAgICBjb25zdCBSRVNVTUVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUkVTVU1FRDtcbiAgICBjb25zdCBTVEFSVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU1RBUlRFRDtcbiAgICBjb25zdCBVU0VSX0NMT1NFID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuVVNFUl9DTE9TRTtcbiAgICBjb25zdCBUSElSRF9RVUFSVElMRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlRISVJEX1FVQVJUSUxFO1xuXG4gICAgbGV0IGlzQWxsQWRDb21wZWxldGUgPSBmYWxzZTsgICAvL1Bvc3Qgcm9sbOydhCDsnITtlbRcbiAgICBsZXQgYWRDb21wbGV0ZUNhbGxiYWNrID0gbnVsbDtcbiAgICBsZXQgY3VycmVudEFkID0gbnVsbDtcblxuICAgICBsb3dMZXZlbEV2ZW50c1tDT05URU5UX1BBVVNFX1JFUVVFU1RFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgLy9UaGlzIGNhbGxscyB3aGVuIHBsYXllciBpcyBwbGF5aW5nIGNvbnRlbnRzIGZvciBhZC5cbiAgICAgICAgIGlmKGFkc1NwZWMuc3RhcnRlZCl7XG4gICAgICAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG4gICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICAvL1RoaXMgY2FsbHMgd2hlbiBvbmUgYWQgZW5kZWQuXG4gICAgICAgIC8vQW5kIHRoaXMgaXMgc2lnbmFsIHdoYXQgcGxheSB0aGUgY29udGVudHMuXG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkICYmIChwcm92aWRlci5nZXRQb3NpdGlvbigpID09PSAwIHx8ICFhZHNTcGVjLmlzVmlkZW9FbmRlZCkgICl7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQURfRVJST1JdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgaXNBbGxBZENvbXBlbGV0ZSA9IHRydWU7XG4gICAgICAgIE9uQWRFcnJvcihhZEV2ZW50KTtcbiAgICB9IDtcblxuICAgIGxvd0xldmVsRXZlbnRzW0FMTF9BRFNfQ09NUExFVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBpc0FsbEFkQ29tcGVsZXRlID0gdHJ1ZTtcbiAgICAgICAgaWYoYWRzU3BlYy5pc1ZpZGVvRW5kZWQpe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tDTElDS10gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZRVJfQ0xJQ0tFRCwge3R5cGUgOiBQTEFZRVJfQURfQ0xJQ0t9KTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0ZJUlNUX1FVQVJUSUxFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgLy9cbiAgICBsb3dMZXZlbEV2ZW50c1tBRF9CVUZGRVJJTkddID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQURfQlVGRkVSSU5HXCIsYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0xPQURFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IHJlbWFpbmluZ1RpbWUgPSBhZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICAvKnZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgdHlwZSA6XCJhZFwiXG4gICAgICAgIH07Ki9cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9MT0FERUQsIHtyZW1haW5pbmcgOiByZW1haW5pbmdUaW1lLCBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgfSk7XG5cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW01JRFBPSU5UXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbUEFVU0VEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QQVVTRUQpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbUkVTVU1FRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHNbU1RBUlRFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBjdXJyZW50QWQgPSBhZDtcblxuICAgICAgICBsZXQgYWRPYmplY3QgPSB7XG4gICAgICAgICAgICBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgLFxuICAgICAgICAgICAgZHVyYXRpb24gOiBhZC5nZXREdXJhdGlvbigpLFxuICAgICAgICAgICAgc2tpcFRpbWVPZmZzZXQgOiBhZC5nZXRTa2lwVGltZU9mZnNldCgpICAgICAvL1RoZSBudW1iZXIgb2Ygc2Vjb25kcyBvZiBwbGF5YmFjayBiZWZvcmUgdGhlIGFkIGJlY29tZXMgc2tpcHBhYmxlLlxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEFEX0NIQU5HRUQsIGFkT2JqZWN0KTtcblxuXG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG5cbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xuICAgICAgICAgICAgYWRzU3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIEZvciBhIGxpbmVhciBhZCwgYSB0aW1lciBjYW4gYmUgc3RhcnRlZCB0byBwb2xsIGZvclxuICAgICAgICAgICAgLy8gdGhlIHJlbWFpbmluZyB0aW1lLlxuICAgICAgICAgICAgaW50ZXJ2YWxUaW1lciA9IHNldEludGVydmFsKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZHVyYXRpb24gPSBhZC5nZXREdXJhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfVElNRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24gOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBUaW1lT2Zmc2V0IDogYWQuZ2V0U2tpcFRpbWVPZmZzZXQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZyA6IHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA6IGR1cmF0aW9uIC0gcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBwYWJsZSA6IGFkc01hbmFnZXIuZ2V0QWRTa2lwcGFibGVTdGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMzAwKTsgLy8gZXZlcnkgMzAwbXNcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0NPTVBMRVRFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgLy9Vc2VyIHNraXBwZWQgYWQuIHNhbWUgcHJvY2VzcyBvbiBjb21wbGV0ZS5cbiAgICBsb3dMZXZlbEV2ZW50c1tTS0lQUEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuXG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tVU0VSX0NMT1NFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbVEhJUkRfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcblxuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuICAgIHRoYXQuc2V0QWRDb21wbGV0ZUNhbGxiYWNrID0gKF9hZENvbXBsZXRlQ2FsbGJhY2spID0+IHtcbiAgICAgICAgYWRDb21wbGV0ZUNhbGxiYWNrID0gX2FkQ29tcGxldGVDYWxsYmFjaztcbiAgICB9O1xuICAgIHRoYXQuaXNBbGxBZENvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaXNBbGxBZENvbXBlbGV0ZTtcbiAgICB9O1xuICAgIHRoYXQuaXNMaW5lYXJBZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRBZCAgPyBjdXJyZW50QWQuaXNMaW5lYXIoKSA6IHRydWU7XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQWRzRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDEyLi5cbiAqL1xuaW1wb3J0IHtFUlJPUiwgU1RBVEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnRPck1zZSkge1xuICAgIGlmKF8uaXNFbGVtZW50KGVsZW1lbnRPck1zZSkpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlO1xuICAgIH1cbiAgICBpZihlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQoKTtcbiAgICB9ZWxzZSBpZihlbGVtZW50T3JNc2UubWVkaWEpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLm1lZGlhO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUxpdmUgPSBmdW5jdGlvbihtc2UpIHtcbiAgICAvL1RvRG8gOiBZb3UgY29uc2lkZXIgaGxzanMuIEJ1dCBub3Qgbm93IGJlY2F1c2Ugd2UgZG9uJ3Qgc3VwcG9ydCBobHNqcy5cblxuICAgIGlmKG1zZSAmJiBtc2UuaXNEeW5hbWljKXtcbiAgICAgICAgcmV0dXJuIG1zZS5pc0R5bmFtaWMoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBlcnJvclRyaWdnZXIgPSBmdW5jdGlvbihlcnJvciwgcHJvdmlkZXIpe1xuICAgIGlmKHByb3ZpZGVyKXtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xuICAgIH1cblxufTtcblxuZXhwb3J0IGNvbnN0IHBpY2tDdXJyZW50U291cmNlID0gKHNvdXJjZXMsIGN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZykgPT4ge1xuICAgIGxldCBzb3VyY2VJbmRleCA9IE1hdGgubWF4KDAsIGN1cnJlbnRTb3VyY2UpO1xuICAgIGNvbnN0IGxhYmVsID1cIlwiO1xuICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSA9PT0gaSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSovXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZUluZGV4O1xufTsiXSwic291cmNlUm9vdCI6IiJ9