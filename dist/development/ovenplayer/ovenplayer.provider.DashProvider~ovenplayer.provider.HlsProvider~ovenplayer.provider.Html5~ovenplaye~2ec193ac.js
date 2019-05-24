/*! OvenPlayerv0.9.587 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
var Ads = function Ads(elVideo, provider, playerConfig, adTagUrl) {
    //Todo : move createAdContainer to MediaManager

    var AUTOPLAY_NOT_ALLOWED = "autoplayNotAllowed";
    var ADMANGER_LOADING_ERROR = "admanagerLoadingTimeout";

    var ADS_MANAGER_LOADED = google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED;
    var AD_ERROR = google.ima.AdErrorEvent.Type.AD_ERROR;

    var that = {};
    var adsManagerLoaded = false;
    var spec = {
        started: false, //player started
        active: false, //on Ad
        isVideoEnded: false
    };
    var autoplayAllowed = false,
        autoplayRequiresMuted = false;

    google.ima.settings.setLocale("ko");
    google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);

    // google.ima.settings.setAutoPlayAdBreaks(false);
    //google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);

    //google.ima.settings.setLocale('ko');
    //google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
    //google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
    var adDisplayContainer = null;
    var adsLoader = null;
    var adsManager = null;
    var listener = null;
    var adsRequest = null;

    var createAdContainer = function createAdContainer() {
        var adContainer = document.createElement('div');
        adContainer.setAttribute('class', 'ovp-ads');
        adContainer.setAttribute('id', 'ovp-ads');
        playerConfig.getContainer().append(adContainer);

        return adContainer;
    };
    var OnAdError = function OnAdError(adErrorEvent) {
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
    var OnManagerLoaded = function OnManagerLoaded(adsManagerLoadedEvent) {
        var adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
        //adsRenderingSettings.useStyledNonLinearAds = true;
        adsManager = adsManagerLoadedEvent.getAdsManager(elVideo, adsRenderingSettings);

        listener = (0, _Listener2["default"])(adsManager, provider, spec, OnAdError);

        provider.on(_constants.CONTENT_VOLUME, function (data) {
            adsManager.setVolume(data.volume / 100);
        }, that);

        adsManagerLoaded = true;
    };

    adDisplayContainer = new google.ima.AdDisplayContainer(createAdContainer(), elVideo);
    adsLoader = new google.ima.AdsLoader(adDisplayContainer);

    adsLoader.addEventListener(ADS_MANAGER_LOADED, OnManagerLoaded, false);
    adsLoader.addEventListener(AD_ERROR, OnAdError, false);

    function initRequest() {

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
    }

    function checkAutoplaySupport() {

        var playPromise = elVideo.play();
        if (playPromise !== undefined) {
            playPromise.then(function () {
                // If we make it here, unmuted autoplay works.
                elVideo.pause();

                autoplayAllowed = true;
                autoplayRequiresMuted = false;

                initRequest();
            })["catch"](function () {
                elVideo.pause();
                autoplayAllowed = false;
                autoplayRequiresMuted = false;
                initRequest();

                /*
                //check muted auto start.
                //I don't need for this version.
                elVideo.muted = true;
                var playPromise = elVideo.play();
                if (playPromise !== undefined) {
                    playPromise.then(function () {
                        // If we make it here, muted autoplay works but unmuted autoplay does not.
                        elVideo.pause();
                        autoplayAllowed = true;
                        autoplayRequiresMuted = true;
                        initRequest();
                    }).catch(function () {
                        // Both muted and unmuted autoplay failed. Fall back to click to play.
                        elVideo.muted = false;
                        autoplayAllowed = false;
                        autoplayRequiresMuted = false;
                        initRequest();
                    });
                }*/
            });
        } else {
            //Maybe this is IE11....
            elVideo.pause();
            autoplayAllowed = false;
            autoplayRequiresMuted = false;
            initRequest();
        }
    }
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
                    return resolve();
                } catch (error) {
                    return reject(error);
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
                            return reject(new Error(AUTOPLAY_NOT_ALLOWED));
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
                            return resolve();
                        }
                    } else {
                        if (retryCount < 50) {
                            setTimeout(checkAdsManagerIsReady, 100);
                        } else {
                            return reject(new Error(ADMANGER_LOADING_ERROR));
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

    that.destroy = function () {
        if (adsManager) {
            adsManager.destroy();
        }
        if (adDisplayContainer) {
            adDisplayContainer.destroy();
        }
        if (listener) {
            listener.destroy();
        }
        if (adsLoader) {
            adsLoader.removeEventListener(ADS_MANAGER_LOADED, OnManagerLoaded);
            adsLoader.removeEventListener(AD_ERROR, OnAdError);
        }

        var $ads = (0, _likeA$2["default"])(playerConfig.getContainer()).find(".ovp-ads");
        if ($ads) {
            $ads.remove();
        }
        provider.off(_constants.CONTENT_VOLUME, null, that);
    };

    return that;
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
        provider.setState(_constants.STATE_LOADING);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Fkcy9BZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9hZHMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci91dGlscy5qcyJdLCJuYW1lcyI6WyJBZHMiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsIkFVVE9QTEFZX05PVF9BTExPV0VEIiwiQURNQU5HRVJfTE9BRElOR19FUlJPUiIsIkFEU19NQU5BR0VSX0xPQURFRCIsImdvb2dsZSIsImltYSIsIkFkc01hbmFnZXJMb2FkZWRFdmVudCIsIlR5cGUiLCJBRF9FUlJPUiIsIkFkRXJyb3JFdmVudCIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJhdXRvcGxheUFsbG93ZWQiLCJhdXRvcGxheVJlcXVpcmVzTXV0ZWQiLCJzZXR0aW5ncyIsInNldExvY2FsZSIsInNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyIsImFkRGlzcGxheUNvbnRhaW5lciIsImFkc0xvYWRlciIsImFkc01hbmFnZXIiLCJsaXN0ZW5lciIsImFkc1JlcXVlc3QiLCJjcmVhdGVBZENvbnRhaW5lciIsImFkQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiZ2V0Q29udGFpbmVyIiwiYXBwZW5kIiwiT25BZEVycm9yIiwiYWRFcnJvckV2ZW50IiwiY29uc29sZSIsImxvZyIsImdldEVycm9yIiwiZ2V0VmFzdEVycm9yQ29kZSIsImdldE1lc3NhZ2UiLCJpbm5lckVycm9yIiwiZ2V0SW5uZXJFcnJvciIsImdldEVycm9yQ29kZSIsImRlc3Ryb3kiLCJwbGF5IiwiT25NYW5hZ2VyTG9hZGVkIiwiYWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiYWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJBZHNSZW5kZXJpbmdTZXR0aW5ncyIsInJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUiLCJnZXRBZHNNYW5hZ2VyIiwib24iLCJDT05URU5UX1ZPTFVNRSIsImRhdGEiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJBZERpc3BsYXlDb250YWluZXIiLCJBZHNMb2FkZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5pdFJlcXVlc3QiLCJPdmVuUGxheWVyQ29uc29sZSIsIkFkc1JlcXVlc3QiLCJmb3JjZU5vbkxpbmVhckZ1bGxTbG90Iiwic2V0QWRXaWxsQXV0b1BsYXkiLCJzZXRBZFdpbGxQbGF5TXV0ZWQiLCJyZXF1ZXN0QWRzIiwiY2hlY2tBdXRvcGxheVN1cHBvcnQiLCJwbGF5UHJvbWlzZSIsInVuZGVmaW5lZCIsInRoZW4iLCJwYXVzZSIsImlzQWN0aXZlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXN1bWUiLCJlcnJvciIsInJldHJ5Q291bnQiLCJjaGVja0Fkc01hbmFnZXJJc1JlYWR5IiwiaXNBdXRvU3RhcnQiLCJFcnJvciIsImdldEJyb3dzZXIiLCJvcyIsImxvYWQiLCJpbml0aWFsaXplIiwiaW5pdCIsIlZpZXdNb2RlIiwiTk9STUFMIiwic3RhcnQiLCJzZXRUaW1lb3V0IiwidmlkZW9FbmRlZENhbGxiYWNrIiwiY29tcGxldGVDb250ZW50Q2FsbGJhY2siLCJpc0FsbEFkQ29tcGxldGUiLCJpc0xpbmVhckFkIiwiY29udGVudENvbXBsZXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIiRhZHMiLCJmaW5kIiwicmVtb3ZlIiwib2ZmIiwiTGlzdGVuZXIiLCJhZHNTcGVjIiwibG93TGV2ZWxFdmVudHMiLCJpbnRlcnZhbFRpbWVyIiwiQURfQlVGRkVSSU5HIiwiQWRFdmVudCIsIkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVEIiwiQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEIiwiQUxMX0FEU19DT01QTEVURUQiLCJDTElDSyIsIlNLSVBQRUQiLCJDT01QTEVURSIsIkZJUlNUX1FVQVJUSUxFIiwiTE9BREVEIiwiTUlEUE9JTlQiLCJQQVVTRUQiLCJSRVNVTUVEIiwiU1RBUlRFRCIsIlVTRVJfQ0xPU0UiLCJUSElSRF9RVUFSVElMRSIsImlzQWxsQWRDb21wZWxldGUiLCJhZENvbXBsZXRlQ2FsbGJhY2siLCJjdXJyZW50QWQiLCJhZEV2ZW50IiwidHlwZSIsImdldFBvc2l0aW9uIiwic2V0U3RhdGUiLCJTVEFURV9DT01QTEVURSIsIlNUQVRFX0xPQURJTkciLCJyZW1haW5pbmdUaW1lIiwiZ2V0UmVtYWluaW5nVGltZSIsImFkIiwiZ2V0QWQiLCJ0cmlnZ2VyIiwiU1RBVEVfQURfTE9BREVEIiwicmVtYWluaW5nIiwiaXNMaW5lYXIiLCJTVEFURV9BRF9QQVVTRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiYWRPYmplY3QiLCJkdXJhdGlvbiIsImdldER1cmF0aW9uIiwic2tpcFRpbWVPZmZzZXQiLCJnZXRTa2lwVGltZU9mZnNldCIsIkFEX0NIQU5HRUQiLCJzZXRJbnRlcnZhbCIsIkFEX1RJTUUiLCJwb3NpdGlvbiIsInNraXBwYWJsZSIsImdldEFkU2tpcHBhYmxlU3RhdGUiLCJjbGVhckludGVydmFsIiwiU1RBVEVfQURfQ09NUExFVEUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImV2ZW50TmFtZSIsInNldEFkQ29tcGxldGVDYWxsYmFjayIsIl9hZENvbXBsZXRlQ2FsbGJhY2siLCJleHRyYWN0VmlkZW9FbGVtZW50IiwiZWxlbWVudE9yTXNlIiwiXyIsImlzRWxlbWVudCIsImdldFZpZGVvRWxlbWVudCIsIm1lZGlhIiwic2VwYXJhdGVMaXZlIiwibXNlIiwiaXNEeW5hbWljIiwiZXJyb3JUcmlnZ2VyIiwiU1RBVEVfRVJST1IiLCJFUlJPUiIsInBpY2tDdXJyZW50U291cmNlIiwic291cmNlcyIsImN1cnJlbnRTb3VyY2UiLCJzb3VyY2VJbmRleCIsIk1hdGgiLCJtYXgiLCJsYWJlbCIsImkiLCJs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LHNCQUFsQjtBQUNBMUssaUJBQVN3RSxLQUFUO0FBQ0F4RSxpQkFBU3VJLE9BQVQsQ0FBaUJvQyxnQkFBakIsRUFBd0I3RixLQUF4QjtBQUNIO0FBRUosQ0FQTTs7QUFTQSxJQUFNOEYsZ0RBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsT0FBRCxFQUFVQyxhQUFWLEVBQXlCN0ssWUFBekIsRUFBMEM7QUFDdkUsUUFBSThLLGNBQWNDLEtBQUtDLEdBQUwsQ0FBUyxDQUFULEVBQVlILGFBQVosQ0FBbEI7QUFDQSxRQUFNSSxRQUFPLEVBQWI7QUFDQSxRQUFJTCxPQUFKLEVBQWE7QUFDVCxhQUFLLElBQUlNLElBQUksQ0FBYixFQUFnQkEsSUFBSU4sUUFBUU8sTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLGdCQUFJTixRQUFRTSxDQUFSLFlBQUosRUFBd0I7QUFDcEJKLDhCQUFjSSxDQUFkO0FBQ0g7QUFDRCxnQkFBSWxMLGFBQWFvTCxjQUFiLE1BQWlDUixRQUFRTSxDQUFSLEVBQVdELEtBQVgsS0FBcUJqTCxhQUFhb0wsY0FBYixFQUExRCxFQUEwRjtBQUN0Rix1QkFBT0YsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU9KLFdBQVA7QUFDSCxDQWRNLEMiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX4yZWMxOTNhYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDA4LzA0LzIwMTkuXG4gKi9cbmltcG9ydCBBZHNFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2Fkcy9MaXN0ZW5lclwiO1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUlMsIENPTlRFTlRfVk9MVU1FLCBTVEFURV9MT0FESU5HXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IEFkcyA9IGZ1bmN0aW9uKGVsVmlkZW8sIHByb3ZpZGVyLCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcbiAgICAvL1RvZG8gOiBtb3ZlIGNyZWF0ZUFkQ29udGFpbmVyIHRvIE1lZGlhTWFuYWdlclxuXG4gICAgY29uc3QgQVVUT1BMQVlfTk9UX0FMTE9XRUQgPSBcImF1dG9wbGF5Tm90QWxsb3dlZFwiO1xuICAgIGNvbnN0IEFETUFOR0VSX0xPQURJTkdfRVJST1IgPSBcImFkbWFuYWdlckxvYWRpbmdUaW1lb3V0XCI7XG5cbiAgICBjb25zdCBBRFNfTUFOQUdFUl9MT0FERUQgPSBnb29nbGUuaW1hLkFkc01hbmFnZXJMb2FkZWRFdmVudC5UeXBlLkFEU19NQU5BR0VSX0xPQURFRDtcbiAgICBjb25zdCBBRF9FUlJPUiA9IGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1I7XG5cbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBhZHNNYW5hZ2VyTG9hZGVkID0gZmFsc2U7XG4gICAgbGV0IHNwZWMgPSB7XG4gICAgICAgIHN0YXJ0ZWQ6IGZhbHNlLCAvL3BsYXllciBzdGFydGVkXG4gICAgICAgIGFjdGl2ZSA6IGZhbHNlLCAvL29uIEFkXG4gICAgICAgIGlzVmlkZW9FbmRlZCA6IGZhbHNlXG4gICAgfTtcbiAgICBsZXQgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2UsIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuXG5cbiAgICBnb29nbGUuaW1hLnNldHRpbmdzLnNldExvY2FsZShcImtvXCIpO1xuICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xuXG5cbiAgIC8vIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0QXV0b1BsYXlBZEJyZWFrcyhmYWxzZSk7XG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldFZwYWlkTW9kZShnb29nbGUuaW1hLkltYVNka1NldHRpbmdzLlZwYWlkTW9kZS5FTkFCTEVEKTtcblxuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUoJ2tvJyk7XG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldFZwYWlkTW9kZShnb29nbGUuaW1hLkltYVNka1NldHRpbmdzLlZwYWlkTW9kZS5FTkFCTEVEKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xuICAgIGxldCBhZERpc3BsYXlDb250YWluZXIgPSBudWxsO1xuICAgIGxldCBhZHNMb2FkZXIgPSBudWxsO1xuICAgIGxldCBhZHNNYW5hZ2VyID0gbnVsbDtcbiAgICBsZXQgbGlzdGVuZXIgPSBudWxsO1xuICAgIGxldCBhZHNSZXF1ZXN0ID0gbnVsbDtcblxuICAgIGNvbnN0IGNyZWF0ZUFkQ29udGFpbmVyID0gKCkgPT4ge1xuICAgICAgICBsZXQgYWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdvdnAtYWRzJyk7XG4gICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnb3ZwLWFkcycpO1xuICAgICAgICBwbGF5ZXJDb25maWcuZ2V0Q29udGFpbmVyKCkuYXBwZW5kKGFkQ29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gYWRDb250YWluZXI7XG4gICAgfTtcbiAgICBjb25zdCBPbkFkRXJyb3IgPSBmdW5jdGlvbihhZEVycm9yRXZlbnQpe1xuICAgICAgICAvL25vdGUgOiBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRJbm5lckVycm9yKCkuZ2V0RXJyb3JDb2RlKCkgPT09IDEyMDUgJiBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRWYXN0RXJyb3JDb2RlKCkgPT09IDQwMCBpcyBCcm93c2VyIFVzZXIgSW50ZXJhY3RpdmUgZXJyb3IuXG5cbiAgICAgICAgLy9EbyBub3QgdHJpZ2dlcmluZyBFUlJPUi4gYmVjdWFzZSBJdCBqdXN0IEFEIVxuXG4gICAgICAgIGNvbnNvbGUubG9nKGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSwgYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0TWVzc2FnZSgpKTtcblxuICAgICAgICBsZXQgaW5uZXJFcnJvciA9IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldElubmVyRXJyb3IoKTtcbiAgICAgICAgaWYoaW5uZXJFcnJvcil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbm5lckVycm9yLmdldEVycm9yQ29kZSgpLCBpbm5lckVycm9yLmdldE1lc3NhZ2UoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkc01hbmFnZXIpIHtcbiAgICAgICAgICAgIGFkc01hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHNwZWMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHNwZWMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcblxuICAgICAgICAvKmlmKGlubmVyRXJyb3IgJiYgaW5uZXJFcnJvci5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSl7XG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgIH0qL1xuXG5cbiAgICB9O1xuICAgIGNvbnN0IE9uTWFuYWdlckxvYWRlZCA9IGZ1bmN0aW9uKGFkc01hbmFnZXJMb2FkZWRFdmVudCl7XG4gICAgICAgIGxldCBhZHNSZW5kZXJpbmdTZXR0aW5ncyA9IG5ldyBnb29nbGUuaW1hLkFkc1JlbmRlcmluZ1NldHRpbmdzKCk7XG4gICAgICAgIGFkc1JlbmRlcmluZ1NldHRpbmdzLnJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAvL2Fkc1JlbmRlcmluZ1NldHRpbmdzLnVzZVN0eWxlZE5vbkxpbmVhckFkcyA9IHRydWU7XG4gICAgICAgIGFkc01hbmFnZXIgPSBhZHNNYW5hZ2VyTG9hZGVkRXZlbnQuZ2V0QWRzTWFuYWdlcihlbFZpZGVvLCBhZHNSZW5kZXJpbmdTZXR0aW5ncyk7XG5cblxuICAgICAgICBsaXN0ZW5lciA9IEFkc0V2ZW50c0xpc3RlbmVyKGFkc01hbmFnZXIsIHByb3ZpZGVyLCBzcGVjLCBPbkFkRXJyb3IpO1xuXG4gICAgICAgIHByb3ZpZGVyLm9uKENPTlRFTlRfVk9MVU1FLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnNldFZvbHVtZShkYXRhLnZvbHVtZS8xMDApO1xuICAgICAgICB9LCB0aGF0KTtcblxuICAgICAgICBhZHNNYW5hZ2VyTG9hZGVkID0gdHJ1ZTtcblxuICAgIH07XG5cblxuICAgIGFkRGlzcGxheUNvbnRhaW5lciA9IG5ldyBnb29nbGUuaW1hLkFkRGlzcGxheUNvbnRhaW5lcihjcmVhdGVBZENvbnRhaW5lcigpLCBlbFZpZGVvKTtcbiAgICBhZHNMb2FkZXIgPSBuZXcgZ29vZ2xlLmltYS5BZHNMb2FkZXIoYWREaXNwbGF5Q29udGFpbmVyKTtcblxuICAgIGFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKEFEU19NQU5BR0VSX0xPQURFRCwgT25NYW5hZ2VyTG9hZGVkLCBmYWxzZSk7XG4gICAgYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQURfRVJST1IsIE9uQWRFcnJvciwgZmFsc2UpO1xuXG5cbiAgICBmdW5jdGlvbiBpbml0UmVxdWVzdCgpe1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkF1dG9QbGF5IFN1cHBvcnQgOiBcIiwgXCJhdXRvcGxheUFsbG93ZWRcIixhdXRvcGxheUFsbG93ZWQsIFwiYXV0b3BsYXlSZXF1aXJlc011dGVkXCIsYXV0b3BsYXlSZXF1aXJlc011dGVkKTtcblxuICAgICAgICBhZHNSZXF1ZXN0ID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVxdWVzdCgpO1xuXG4gICAgICAgIGFkc1JlcXVlc3QuZm9yY2VOb25MaW5lYXJGdWxsU2xvdCA9IGZhbHNlO1xuICAgICAgICAvKmlmKHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkuYnJvd3NlciA9PT0gXCJTYWZhcmlcIiAmJiBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zID09PSBcImlPU1wiICl7XG4gICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICB9Ki9cblxuICAgICAgICBhZHNSZXF1ZXN0LnNldEFkV2lsbEF1dG9QbGF5KGF1dG9wbGF5QWxsb3dlZCk7XG4gICAgICAgIGFkc1JlcXVlc3Quc2V0QWRXaWxsUGxheU11dGVkKGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XG4gICAgICAgIGFkc1JlcXVlc3QuYWRUYWdVcmwgPSBhZFRhZ1VybDtcblxuICAgICAgICBhZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTtcblxuICAgICAgICAvL3R3byB3YXkgd2hhdCBhZCBzdGFydHMuXG4gICAgICAgIC8vYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7IG9yICBhZHNNYW5hZ2VyLnN0YXJ0KCk7XG4gICAgICAgIC8vd2hhdD8gd2h5Pz8gd3RoPz9cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0F1dG9wbGF5U3VwcG9ydCgpIHtcblxuICAgICAgICB2YXIgcGxheVByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgaWYgKHBsYXlQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBsYXlQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBtYWtlIGl0IGhlcmUsIHVubXV0ZWQgYXV0b3BsYXkgd29ya3MuXG4gICAgICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuXG4gICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG5cblxuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgLy9jaGVjayBtdXRlZCBhdXRvIHN0YXJ0LlxuICAgICAgICAgICAgICAgIC8vSSBkb24ndCBuZWVkIGZvciB0aGlzIHZlcnNpb24uXG4gICAgICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHBsYXlQcm9taXNlID0gZWxWaWRlby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXlQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBtYWtlIGl0IGhlcmUsIG11dGVkIGF1dG9wbGF5IHdvcmtzIGJ1dCB1bm11dGVkIGF1dG9wbGF5IGRvZXMgbm90LlxuICAgICAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBCb3RoIG11dGVkIGFuZCB1bm11dGVkIGF1dG9wbGF5IGZhaWxlZC4gRmFsbCBiYWNrIHRvIGNsaWNrIHRvIHBsYXkuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vTWF5YmUgdGhpcyBpcyBJRTExLi4uLlxuICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2U7XG4gICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tBdXRvcGxheVN1cHBvcnQoKTtcblxuICAgIHRoYXQuaXNBY3RpdmUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmFjdGl2ZTtcbiAgICB9O1xuICAgIHRoYXQuc3RhcnRlZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhcnRlZDtcbiAgICB9O1xuICAgIHRoYXQucGxheSA9ICgpID0+IHtcbiAgICAgICAgLy9wcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcblxuXG4gICAgICAgIGlmKHNwZWMuc3RhcnRlZCl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIucmVzdW1lKCk7XG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSgpe1xuICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgICAgICBpZihhZHNNYW5hZ2VyTG9hZGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKChwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSAmJiAhYXV0b3BsYXlBbGxvd2VkKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoQVVUT1BMQVlfTk9UX0FMTE9XRUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRG9uJ3QgcGxheWluZyB2aWRlbyB3aGVuIHBsYXllciBjb21wbGV0ZSBwbGF5aW5nIEFELlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vT25seSBpT1MgU2FmYXJpIEZpcnN0IGxvYWRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zICA9PT0gXCJpT1NcIiB8fCBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zICA9PT0gXCJBbmRyb2lkXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuaW5pdChcIjEwMCVcIiwgXCIxMDAlXCIsIGdvb2dsZS5pbWEuVmlld01vZGUuTk9STUFMKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCA1MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0Fkc01hbmFnZXJJc1JlYWR5LCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoQURNQU5HRVJfTE9BRElOR19FUlJPUikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xuICAgICAgICBhZHNNYW5hZ2VyLnBhdXNlKCk7XG4gICAgfTtcbiAgICB0aGF0LnZpZGVvRW5kZWRDYWxsYmFjayA9IChjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaykgPT4ge1xuICAgICAgICAvL2xpc3RlbmVyLmlzTGluZWFyQWQgOiBnZXQgY3VycmVudCBhZCdzIHN0YXR1cyB3aGV0aGVyIGxpbmVhciBhZCBvciBub3QuXG4gICAgICAgIGlmKGxpc3RlbmVyLmlzQWxsQWRDb21wbGV0ZSgpIHx8ICFsaXN0ZW5lci5pc0xpbmVhckFkKCkpe1xuICAgICAgICAgICAgY29tcGxldGVDb250ZW50Q2FsbGJhY2soKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvL1Bvc3QgLSBSb2xsIOydhCDsnqzsg53tlZjquLAg7JyE7ZW07ISc64qUIOy9mO2FkOy4oOqwgCDrgZ3rgqzsnYzsnYQgYWRzTG9hZGVy7JeQ6rKMIOyVjOugpOyVvCDtlZzri6RcbiAgICAgICAgICAgIHNwZWMuaXNWaWRlb0VuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGFkc0xvYWRlci5jb250ZW50Q29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgIGlmKGFkc01hbmFnZXIpe1xuICAgICAgICAgICAgYWRzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYWREaXNwbGF5Q29udGFpbmVyKXtcbiAgICAgICAgICAgIGFkRGlzcGxheUNvbnRhaW5lci5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobGlzdGVuZXIpe1xuICAgICAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGFkc0xvYWRlcil7XG4gICAgICAgICAgICBhZHNMb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBRFNfTUFOQUdFUl9MT0FERUQsIE9uTWFuYWdlckxvYWRlZCk7XG4gICAgICAgICAgICBhZHNMb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBRF9FUlJPUiwgT25BZEVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCAkYWRzID0gTEEkKHBsYXllckNvbmZpZy5nZXRDb250YWluZXIoKSkuZmluZChcIi5vdnAtYWRzXCIpO1xuICAgICAgICBpZigkYWRzKXtcbiAgICAgICAgICAgICRhZHMucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIub2ZmKENPTlRFTlRfVk9MVU1FLCBudWxsLCB0aGF0KTtcblxuXG4gICAgfTtcblxuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IEFkczsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAxMC8wNC8yMDE5LlxuICovXG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcbmltcG9ydCB7XG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9BRF9MT0FERUQsXG4gICAgU1RBVEVfQURfUExBWUlORyxcbiAgICBTVEFURV9BRF9QQVVTRUQsXG4gICAgU1RBVEVfQURfQ09NUExFVEUsXG4gICAgQURfQ0hBTkdFRCxcbiAgICBBRF9USU1FLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihhZHNNYW5hZ2VyLCBwcm92aWRlciwgYWRzU3BlYywgT25BZEVycm9yKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xuXG4gICAgbGV0IGludGVydmFsVGltZXIgPSBudWxsO1xuXG4gICAgY29uc3QgQURfQlVGRkVSSU5HID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQURfQlVGRkVSSU5HO1xuICAgIGNvbnN0IENPTlRFTlRfUEFVU0VfUkVRVUVTVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQ7XG4gICAgY29uc3QgQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEO1xuICAgIGNvbnN0IEFEX0VSUk9SID0gZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUjtcbiAgICBjb25zdCBBTExfQURTX0NPTVBMRVRFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFMTF9BRFNfQ09NUExFVEVEO1xuICAgIGNvbnN0IENMSUNLID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ0xJQ0s7XG4gICAgY29uc3QgU0tJUFBFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNLSVBQRUQ7XG4gICAgY29uc3QgQ09NUExFVEUgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT01QTEVURTtcbiAgICBjb25zdCBGSVJTVF9RVUFSVElMRT0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuRklSU1RfUVVBUlRJTEU7XG4gICAgY29uc3QgTE9BREVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVEO1xuICAgIGNvbnN0IE1JRFBPSU5UPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5NSURQT0lOVDtcbiAgICBjb25zdCBQQVVTRUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5QQVVTRUQ7XG4gICAgY29uc3QgUkVTVU1FRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlJFU1VNRUQ7XG4gICAgY29uc3QgU1RBUlRFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQ7XG4gICAgY29uc3QgVVNFUl9DTE9TRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlVTRVJfQ0xPU0U7XG4gICAgY29uc3QgVEhJUkRfUVVBUlRJTEUgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5USElSRF9RVUFSVElMRTtcblxuICAgIGxldCBpc0FsbEFkQ29tcGVsZXRlID0gZmFsc2U7ICAgLy9Qb3N0IHJvbGzsnYQg7JyE7ZW0XG4gICAgbGV0IGFkQ29tcGxldGVDYWxsYmFjayA9IG51bGw7XG4gICAgbGV0IGN1cnJlbnRBZCA9IG51bGw7XG5cbiAgICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9QQVVTRV9SRVFVRVNURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG5cbiAgICAgICAgLy9UaGlzIGNhbGxscyB3aGVuIHBsYXllciBpcyBwbGF5aW5nIGNvbnRlbnRzIGZvciBhZC5cbiAgICAgICAgIGlmKGFkc1NwZWMuc3RhcnRlZCl7XG4gICAgICAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG4gICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICAvL1RoaXMgY2FsbHMgd2hlbiBvbmUgYWQgZW5kZWQuXG4gICAgICAgIC8vQW5kIHRoaXMgaXMgc2lnbmFsIHdoYXQgcGxheSB0aGUgY29udGVudHMuXG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkICYmIChwcm92aWRlci5nZXRQb3NpdGlvbigpID09PSAwIHx8ICFhZHNTcGVjLmlzVmlkZW9FbmRlZCkgICl7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQURfRVJST1JdID0gT25BZEVycm9yO1xuXG4gICAgbG93TGV2ZWxFdmVudHNbQUxMX0FEU19DT01QTEVURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGlzQWxsQWRDb21wZWxldGUgPSB0cnVlO1xuICAgICAgICBpZihhZHNTcGVjLmlzVmlkZW9FbmRlZCl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0NMSUNLXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbRklSU1RfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICAvL1xuICAgIGxvd0xldmVsRXZlbnRzW0FEX0JVRkZFUklOR10gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRF9CVUZGRVJJTkdcIixhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0xPQURFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IHJlbWFpbmluZ1RpbWUgPSBhZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICAvKnZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgdHlwZSA6XCJhZFwiXG4gICAgICAgIH07Ki9cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9MT0FERUQsIHtyZW1haW5pbmcgOiByZW1haW5pbmdUaW1lLCBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgfSk7XG5cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW01JRFBPSU5UXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbUEFVU0VEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QQVVTRUQpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbUkVTVU1FRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHNbU1RBUlRFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBjdXJyZW50QWQgPSBhZDtcblxuICAgICAgICBsZXQgYWRPYmplY3QgPSB7XG4gICAgICAgICAgICBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgLFxuICAgICAgICAgICAgZHVyYXRpb24gOiBhZC5nZXREdXJhdGlvbigpLFxuICAgICAgICAgICAgc2tpcFRpbWVPZmZzZXQgOiBhZC5nZXRTa2lwVGltZU9mZnNldCgpICAgICAvL1RoZSBudW1iZXIgb2Ygc2Vjb25kcyBvZiBwbGF5YmFjayBiZWZvcmUgdGhlIGFkIGJlY29tZXMgc2tpcHBhYmxlLlxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEFEX0NIQU5HRUQsIGFkT2JqZWN0KTtcblxuXG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG5cbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xuICAgICAgICAgICAgYWRzU3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIEZvciBhIGxpbmVhciBhZCwgYSB0aW1lciBjYW4gYmUgc3RhcnRlZCB0byBwb2xsIGZvclxuICAgICAgICAgICAgLy8gdGhlIHJlbWFpbmluZyB0aW1lLlxuICAgICAgICAgICAgaW50ZXJ2YWxUaW1lciA9IHNldEludGVydmFsKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZHVyYXRpb24gPSBhZC5nZXREdXJhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfVElNRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24gOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBUaW1lT2Zmc2V0IDogYWQuZ2V0U2tpcFRpbWVPZmZzZXQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZyA6IHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA6IGR1cmF0aW9uIC0gcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBwYWJsZSA6IGFkc01hbmFnZXIuZ2V0QWRTa2lwcGFibGVTdGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMzAwKTsgLy8gZXZlcnkgMzAwbXNcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0NPTVBMRVRFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuXG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICAvL1VzZXIgc2tpcHBlZCBhZC4gc2FtZSBwcm9jZXNzIG9uIGNvbXBsZXRlLlxuICAgIGxvd0xldmVsRXZlbnRzW1NLSVBQRURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG5cbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW1VTRVJfQ0xPU0VdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG5cbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW1RISVJEX1FVQVJUSUxFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG5cblxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgIGFkc01hbmFnZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICB9KTtcbiAgICB0aGF0LnNldEFkQ29tcGxldGVDYWxsYmFjayA9IChfYWRDb21wbGV0ZUNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGFkQ29tcGxldGVDYWxsYmFjayA9IF9hZENvbXBsZXRlQ2FsbGJhY2s7XG4gICAgfTtcbiAgICB0aGF0LmlzQWxsQWRDb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGlzQWxsQWRDb21wZWxldGU7XG4gICAgfTtcbiAgICB0aGF0LmlzTGluZWFyQWQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBjdXJyZW50QWQgID8gY3VycmVudEFkLmlzTGluZWFyKCkgOiB0cnVlO1xuICAgIH07XG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFkc0V2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxMi4uXG4gKi9cbmltcG9ydCB7RVJST1IsIFNUQVRFX0VSUk9SfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RWaWRlb0VsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50T3JNc2UpIHtcbiAgICBpZihfLmlzRWxlbWVudChlbGVtZW50T3JNc2UpKXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZTtcbiAgICB9XG4gICAgaWYoZWxlbWVudE9yTXNlLmdldFZpZGVvRWxlbWVudCl7XG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KCk7XG4gICAgfWVsc2UgaWYoZWxlbWVudE9yTXNlLm1lZGlhKXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5tZWRpYTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VwYXJhdGVMaXZlID0gZnVuY3Rpb24obXNlKSB7XG4gICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXG5cbiAgICBpZihtc2UgJiYgbXNlLmlzRHluYW1pYyl7XG4gICAgICAgIHJldHVybiBtc2UuaXNEeW5hbWljKCk7XG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXJyb3JUcmlnZ2VyID0gZnVuY3Rpb24oZXJyb3IsIHByb3ZpZGVyKXtcbiAgICBpZihwcm92aWRlcil7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IgKTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCBjb25zdCBwaWNrQ3VycmVudFNvdXJjZSA9IChzb3VyY2VzLCBjdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpID0+IHtcbiAgICBsZXQgc291cmNlSW5kZXggPSBNYXRoLm1heCgwLCBjdXJyZW50U291cmNlKTtcbiAgICBjb25zdCBsYWJlbCA9XCJcIjtcbiAgICBpZiAoc291cmNlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VJbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZUluZGV4O1xufTsiXSwic291cmNlUm9vdCI6IiJ9