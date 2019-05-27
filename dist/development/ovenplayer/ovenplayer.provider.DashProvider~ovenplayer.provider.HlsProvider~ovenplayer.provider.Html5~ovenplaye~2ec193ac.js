/*! OvenPlayerv0.9.5891 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        if (!elVideo.play) {
            autoplayAllowed = false;
            autoplayRequiresMuted = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Fkcy9BZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9hZHMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci91dGlscy5qcyJdLCJuYW1lcyI6WyJBZHMiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsIkFVVE9QTEFZX05PVF9BTExPV0VEIiwiQURNQU5HRVJfTE9BRElOR19FUlJPUiIsIkFEU19NQU5BR0VSX0xPQURFRCIsImdvb2dsZSIsImltYSIsIkFkc01hbmFnZXJMb2FkZWRFdmVudCIsIlR5cGUiLCJBRF9FUlJPUiIsIkFkRXJyb3JFdmVudCIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJhdXRvcGxheUFsbG93ZWQiLCJhdXRvcGxheVJlcXVpcmVzTXV0ZWQiLCJzZXR0aW5ncyIsInNldExvY2FsZSIsInNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyIsImFkRGlzcGxheUNvbnRhaW5lciIsImFkc0xvYWRlciIsImFkc01hbmFnZXIiLCJsaXN0ZW5lciIsImFkc1JlcXVlc3QiLCJjcmVhdGVBZENvbnRhaW5lciIsImFkQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiZ2V0Q29udGFpbmVyIiwiYXBwZW5kIiwiT25BZEVycm9yIiwiYWRFcnJvckV2ZW50IiwiY29uc29sZSIsImxvZyIsImdldEVycm9yIiwiZ2V0VmFzdEVycm9yQ29kZSIsImdldE1lc3NhZ2UiLCJpbm5lckVycm9yIiwiZ2V0SW5uZXJFcnJvciIsImdldEVycm9yQ29kZSIsImRlc3Ryb3kiLCJwbGF5IiwiT25NYW5hZ2VyTG9hZGVkIiwiYWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiYWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJBZHNSZW5kZXJpbmdTZXR0aW5ncyIsInJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUiLCJnZXRBZHNNYW5hZ2VyIiwib24iLCJDT05URU5UX1ZPTFVNRSIsImRhdGEiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJBZERpc3BsYXlDb250YWluZXIiLCJBZHNMb2FkZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5pdFJlcXVlc3QiLCJPdmVuUGxheWVyQ29uc29sZSIsIkFkc1JlcXVlc3QiLCJmb3JjZU5vbkxpbmVhckZ1bGxTbG90Iiwic2V0QWRXaWxsQXV0b1BsYXkiLCJzZXRBZFdpbGxQbGF5TXV0ZWQiLCJyZXF1ZXN0QWRzIiwiY2hlY2tBdXRvcGxheVN1cHBvcnQiLCJwbGF5UHJvbWlzZSIsInVuZGVmaW5lZCIsInRoZW4iLCJwYXVzZSIsImlzQWN0aXZlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXN1bWUiLCJlcnJvciIsInJldHJ5Q291bnQiLCJjaGVja0Fkc01hbmFnZXJJc1JlYWR5IiwiaXNBdXRvU3RhcnQiLCJFcnJvciIsImdldEJyb3dzZXIiLCJvcyIsImxvYWQiLCJpbml0aWFsaXplIiwiaW5pdCIsIlZpZXdNb2RlIiwiTk9STUFMIiwic3RhcnQiLCJzZXRUaW1lb3V0IiwidmlkZW9FbmRlZENhbGxiYWNrIiwiY29tcGxldGVDb250ZW50Q2FsbGJhY2siLCJpc0FsbEFkQ29tcGxldGUiLCJpc0xpbmVhckFkIiwiY29udGVudENvbXBsZXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIiRhZHMiLCJmaW5kIiwicmVtb3ZlIiwib2ZmIiwiTGlzdGVuZXIiLCJhZHNTcGVjIiwibG93TGV2ZWxFdmVudHMiLCJpbnRlcnZhbFRpbWVyIiwiQURfQlVGRkVSSU5HIiwiQWRFdmVudCIsIkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVEIiwiQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEIiwiQUxMX0FEU19DT01QTEVURUQiLCJDTElDSyIsIlNLSVBQRUQiLCJDT01QTEVURSIsIkZJUlNUX1FVQVJUSUxFIiwiTE9BREVEIiwiTUlEUE9JTlQiLCJQQVVTRUQiLCJSRVNVTUVEIiwiU1RBUlRFRCIsIlVTRVJfQ0xPU0UiLCJUSElSRF9RVUFSVElMRSIsImlzQWxsQWRDb21wZWxldGUiLCJhZENvbXBsZXRlQ2FsbGJhY2siLCJjdXJyZW50QWQiLCJhZEV2ZW50IiwidHlwZSIsImdldFBvc2l0aW9uIiwic2V0U3RhdGUiLCJTVEFURV9DT01QTEVURSIsIlNUQVRFX0xPQURJTkciLCJyZW1haW5pbmdUaW1lIiwiZ2V0UmVtYWluaW5nVGltZSIsImFkIiwiZ2V0QWQiLCJ0cmlnZ2VyIiwiU1RBVEVfQURfTE9BREVEIiwicmVtYWluaW5nIiwiaXNMaW5lYXIiLCJTVEFURV9BRF9QQVVTRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiYWRPYmplY3QiLCJkdXJhdGlvbiIsImdldER1cmF0aW9uIiwic2tpcFRpbWVPZmZzZXQiLCJnZXRTa2lwVGltZU9mZnNldCIsIkFEX0NIQU5HRUQiLCJzZXRJbnRlcnZhbCIsIkFEX1RJTUUiLCJwb3NpdGlvbiIsInNraXBwYWJsZSIsImdldEFkU2tpcHBhYmxlU3RhdGUiLCJjbGVhckludGVydmFsIiwiU1RBVEVfQURfQ09NUExFVEUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImV2ZW50TmFtZSIsInNldEFkQ29tcGxldGVDYWxsYmFjayIsIl9hZENvbXBsZXRlQ2FsbGJhY2siLCJleHRyYWN0VmlkZW9FbGVtZW50IiwiZWxlbWVudE9yTXNlIiwiXyIsImlzRWxlbWVudCIsImdldFZpZGVvRWxlbWVudCIsIm1lZGlhIiwic2VwYXJhdGVMaXZlIiwibXNlIiwiaXNEeW5hbWljIiwiZXJyb3JUcmlnZ2VyIiwiU1RBVEVfRVJST1IiLCJFUlJPUiIsInBpY2tDdXJyZW50U291cmNlIiwic291cmNlcyIsImN1cnJlbnRTb3VyY2UiLCJzb3VyY2VJbmRleCIsIk1hdGgiLCJtYXgiLCJsYWJlbCIsImkiLCJs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QU1DLHNDQUFlLFNBQWZBLFlBQWUsQ0FBUzNGLEtBQVQsRUFBZ0I5RSxRQUFoQixFQUF5QjtBQUNqRCxRQUFHQSxRQUFILEVBQVk7QUFDUkEsaUJBQVNnSSxRQUFULENBQWtCMEMsc0JBQWxCO0FBQ0ExSyxpQkFBU3dFLEtBQVQ7QUFDQXhFLGlCQUFTdUksT0FBVCxDQUFpQm9DLGdCQUFqQixFQUF3QjdGLEtBQXhCO0FBQ0g7QUFFSixDQVBNOztBQVNBLElBQU04RixnREFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxPQUFELEVBQVVDLGFBQVYsRUFBeUI3SyxZQUF6QixFQUEwQztBQUN2RSxRQUFJOEssY0FBY0MsS0FBS0MsR0FBTCxDQUFTLENBQVQsRUFBWUgsYUFBWixDQUFsQjtBQUNBLFFBQU1JLFFBQU8sRUFBYjtBQUNBLFFBQUlMLE9BQUosRUFBYTtBQUNULGFBQUssSUFBSU0sSUFBSSxDQUFiLEVBQWdCQSxJQUFJTixRQUFRTyxNQUE1QixFQUFvQ0QsR0FBcEMsRUFBeUM7QUFDckMsZ0JBQUlOLFFBQVFNLENBQVIsWUFBSixFQUF3QjtBQUNwQkosOEJBQWNJLENBQWQ7QUFDSDtBQUNELGdCQUFJbEwsYUFBYW9MLGNBQWIsTUFBaUNSLFFBQVFNLENBQVIsRUFBV0QsS0FBWCxLQUFxQmpMLGFBQWFvTCxjQUFiLEVBQTFELEVBQTBGO0FBQ3RGLHVCQUFPRixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsV0FBT0osV0FBUDtBQUNILENBZE0sQyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMDgvMDQvMjAxOS5cbiAqL1xuaW1wb3J0IEFkc0V2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvYWRzL0xpc3RlbmVyXCI7XG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIEVSUk9SUywgQ09OVEVOVF9WT0xVTUUsIFNUQVRFX0xPQURJTkdcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgQWRzID0gZnVuY3Rpb24oZWxWaWRlbywgcHJvdmlkZXIsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpe1xuICAgIC8vVG9kbyA6IG1vdmUgY3JlYXRlQWRDb250YWluZXIgdG8gTWVkaWFNYW5hZ2VyXG5cbiAgICBjb25zdCBBVVRPUExBWV9OT1RfQUxMT1dFRCA9IFwiYXV0b3BsYXlOb3RBbGxvd2VkXCI7XG4gICAgY29uc3QgQURNQU5HRVJfTE9BRElOR19FUlJPUiA9IFwiYWRtYW5hZ2VyTG9hZGluZ1RpbWVvdXRcIjtcblxuICAgIGNvbnN0IEFEU19NQU5BR0VSX0xPQURFRCA9IGdvb2dsZS5pbWEuQWRzTWFuYWdlckxvYWRlZEV2ZW50LlR5cGUuQURTX01BTkFHRVJfTE9BREVEO1xuICAgIGNvbnN0IEFEX0VSUk9SID0gZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUjtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGFkc01hbmFnZXJMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgc3RhcnRlZDogZmFsc2UsIC8vcGxheWVyIHN0YXJ0ZWRcbiAgICAgICAgYWN0aXZlIDogZmFsc2UsIC8vb24gQWRcbiAgICAgICAgaXNWaWRlb0VuZGVkIDogZmFsc2VcbiAgICB9O1xuICAgIGxldCBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZSwgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG5cblxuICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0TG9jYWxlKFwia29cIik7XG4gICAgZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXModHJ1ZSk7XG5cblxuICAgLy8gZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRBdXRvUGxheUFkQnJlYWtzKGZhbHNlKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuXG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldExvY2FsZSgna28nKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXModHJ1ZSk7XG4gICAgbGV0IGFkRGlzcGxheUNvbnRhaW5lciA9IG51bGw7XG4gICAgbGV0IGFkc0xvYWRlciA9IG51bGw7XG4gICAgbGV0IGFkc01hbmFnZXIgPSBudWxsO1xuICAgIGxldCBsaXN0ZW5lciA9IG51bGw7XG4gICAgbGV0IGFkc1JlcXVlc3QgPSBudWxsO1xuXG4gICAgY29uc3QgY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ292cC1hZHMnKTtcbiAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdvdnAtYWRzJyk7XG4gICAgICAgIHBsYXllckNvbmZpZy5nZXRDb250YWluZXIoKS5hcHBlbmQoYWRDb250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcbiAgICB9O1xuICAgIGNvbnN0IE9uQWRFcnJvciA9IGZ1bmN0aW9uKGFkRXJyb3JFdmVudCl7XG4gICAgICAgIC8vbm90ZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldElubmVyRXJyb3IoKS5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSAmIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSA9PT0gNDAwIGlzIEJyb3dzZXIgVXNlciBJbnRlcmFjdGl2ZSBlcnJvci5cblxuICAgICAgICAvL0RvIG5vdCB0cmlnZ2VyaW5nIEVSUk9SLiBiZWN1YXNlIEl0IGp1c3QgQUQhXG5cbiAgICAgICAgY29uc29sZS5sb2coYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpLCBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRNZXNzYWdlKCkpO1xuXG4gICAgICAgIGxldCBpbm5lckVycm9yID0gYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpO1xuICAgICAgICBpZihpbm5lckVycm9yKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlubmVyRXJyb3IuZ2V0RXJyb3JDb2RlKCksIGlubmVyRXJyb3IuZ2V0TWVzc2FnZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWRzTWFuYWdlcikge1xuICAgICAgICAgICAgYWRzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgc3BlYy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgc3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuXG4gICAgICAgIC8qaWYoaW5uZXJFcnJvciAmJiBpbm5lckVycm9yLmdldEVycm9yQ29kZSgpID09PSAxMjA1KXtcbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgfSovXG5cblxuICAgIH07XG4gICAgY29uc3QgT25NYW5hZ2VyTG9hZGVkID0gZnVuY3Rpb24oYWRzTWFuYWdlckxvYWRlZEV2ZW50KXtcbiAgICAgICAgbGV0IGFkc1JlbmRlcmluZ1NldHRpbmdzID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVuZGVyaW5nU2V0dGluZ3MoKTtcbiAgICAgICAgYWRzUmVuZGVyaW5nU2V0dGluZ3MucmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIC8vYWRzUmVuZGVyaW5nU2V0dGluZ3MudXNlU3R5bGVkTm9uTGluZWFyQWRzID0gdHJ1ZTtcbiAgICAgICAgYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKGVsVmlkZW8sIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcblxuXG4gICAgICAgIGxpc3RlbmVyID0gQWRzRXZlbnRzTGlzdGVuZXIoYWRzTWFuYWdlciwgcHJvdmlkZXIsIHNwZWMsIE9uQWRFcnJvcik7XG5cbiAgICAgICAgcHJvdmlkZXIub24oQ09OVEVOVF9WT0xVTUUsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGFkc01hbmFnZXIuc2V0Vm9sdW1lKGRhdGEudm9sdW1lLzEwMCk7XG4gICAgICAgIH0sIHRoYXQpO1xuXG4gICAgICAgIGFkc01hbmFnZXJMb2FkZWQgPSB0cnVlO1xuXG4gICAgfTtcblxuXG4gICAgYWREaXNwbGF5Q29udGFpbmVyID0gbmV3IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyKGNyZWF0ZUFkQ29udGFpbmVyKCksIGVsVmlkZW8pO1xuICAgIGFkc0xvYWRlciA9IG5ldyBnb29nbGUuaW1hLkFkc0xvYWRlcihhZERpc3BsYXlDb250YWluZXIpO1xuXG4gICAgYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQURTX01BTkFHRVJfTE9BREVELCBPbk1hbmFnZXJMb2FkZWQsIGZhbHNlKTtcbiAgICBhZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBRF9FUlJPUiwgT25BZEVycm9yLCBmYWxzZSk7XG5cblxuICAgIGZ1bmN0aW9uIGluaXRSZXF1ZXN0KCl7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQXV0b1BsYXkgU3VwcG9ydCA6IFwiLCBcImF1dG9wbGF5QWxsb3dlZFwiLGF1dG9wbGF5QWxsb3dlZCwgXCJhdXRvcGxheVJlcXVpcmVzTXV0ZWRcIixhdXRvcGxheVJlcXVpcmVzTXV0ZWQpO1xuXG4gICAgICAgIGFkc1JlcXVlc3QgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZXF1ZXN0KCk7XG5cbiAgICAgICAgYWRzUmVxdWVzdC5mb3JjZU5vbkxpbmVhckZ1bGxTbG90ID0gZmFsc2U7XG4gICAgICAgIC8qaWYocGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5icm93c2VyID09PSBcIlNhZmFyaVwiICYmIHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgPT09IFwiaU9TXCIgKXtcbiAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgIH0qL1xuXG4gICAgICAgIGFkc1JlcXVlc3Quc2V0QWRXaWxsQXV0b1BsYXkoYXV0b3BsYXlBbGxvd2VkKTtcbiAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxQbGF5TXV0ZWQoYXV0b3BsYXlSZXF1aXJlc011dGVkKTtcbiAgICAgICAgYWRzUmVxdWVzdC5hZFRhZ1VybCA9IGFkVGFnVXJsO1xuXG4gICAgICAgIGFkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpO1xuXG4gICAgICAgIC8vdHdvIHdheSB3aGF0IGFkIHN0YXJ0cy5cbiAgICAgICAgLy9hZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTsgb3IgIGFkc01hbmFnZXIuc3RhcnQoKTtcbiAgICAgICAgLy93aGF0PyB3aHk/PyB3dGg/P1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkge1xuICAgICAgICBpZighZWxWaWRlby5wbGF5KXtcbiAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwbGF5UHJvbWlzZSA9IGVsVmlkZW8ucGxheSgpO1xuICAgICAgICBpZiAocGxheVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIG1ha2UgaXQgaGVyZSwgdW5tdXRlZCBhdXRvcGxheSB3b3Jrcy5cbiAgICAgICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG5cbiAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcblxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcblxuXG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAvL2NoZWNrIG11dGVkIGF1dG8gc3RhcnQuXG4gICAgICAgICAgICAgICAgLy9JIGRvbid0IG5lZWQgZm9yIHRoaXMgdmVyc2lvbi5cbiAgICAgICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcGxheVByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBpZiAocGxheVByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBwbGF5UHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIG1ha2UgaXQgaGVyZSwgbXV0ZWQgYXV0b3BsYXkgd29ya3MgYnV0IHVubXV0ZWQgYXV0b3BsYXkgZG9lcyBub3QuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJvdGggbXV0ZWQgYW5kIHVubXV0ZWQgYXV0b3BsYXkgZmFpbGVkLiBGYWxsIGJhY2sgdG8gY2xpY2sgdG8gcGxheS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy9NYXliZSB0aGlzIGlzIElFMTEuLi4uXG4gICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja0F1dG9wbGF5U3VwcG9ydCgpO1xuXG4gICAgdGhhdC5pc0FjdGl2ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuYWN0aXZlO1xuICAgIH07XG4gICAgdGhhdC5zdGFydGVkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5zdGFydGVkO1xuICAgIH07XG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAvL3Byb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuXG5cbiAgICAgICAgaWYoc3BlYy5zdGFydGVkKXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5yZXN1bWUoKTtcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja0Fkc01hbmFnZXJJc1JlYWR5KCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgICAgIGlmKGFkc01hbmFnZXJMb2FkZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpICYmICFhdXRvcGxheUFsbG93ZWQpICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihBVVRPUExBWV9OT1RfQUxMT1dFRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Eb24ndCBwbGF5aW5nIHZpZGVvIHdoZW4gcGxheWVyIGNvbXBsZXRlIHBsYXlpbmcgQUQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Pbmx5IGlPUyBTYWZhcmkgRmlyc3QgbG9hZGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgID09PSBcImlPU1wiIHx8IHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgID09PSBcIkFuZHJvaWRcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkRGlzcGxheUNvbnRhaW5lci5pbml0aWFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5pbml0KFwiMTAwJVwiLCBcIjEwMCVcIiwgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDUwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrQWRzTWFuYWdlcklzUmVhZHksIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihBRE1BTkdFUl9MT0FESU5HX0VSUk9SKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIGFkc01hbmFnZXIucGF1c2UoKTtcbiAgICB9O1xuICAgIHRoYXQudmlkZW9FbmRlZENhbGxiYWNrID0gKGNvbXBsZXRlQ29udGVudENhbGxiYWNrKSA9PiB7XG4gICAgICAgIC8vbGlzdGVuZXIuaXNMaW5lYXJBZCA6IGdldCBjdXJyZW50IGFkJ3Mgc3RhdHVzIHdoZXRoZXIgbGluZWFyIGFkIG9yIG5vdC5cbiAgICAgICAgaWYobGlzdGVuZXIuaXNBbGxBZENvbXBsZXRlKCkgfHwgIWxpc3RlbmVyLmlzTGluZWFyQWQoKSl7XG4gICAgICAgICAgICBjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaygpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vUG9zdCAtIFJvbGwg7J2EIOyerOyDne2VmOq4sCDsnITtlbTshJzripQg7L2Y7YWQ7Lig6rCAIOuBneuCrOydjOydhCBhZHNMb2FkZXLsl5Dqsowg7JWM66Ck7JW8IO2VnOuLpFxuICAgICAgICAgICAgc3BlYy5pc1ZpZGVvRW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgYWRzTG9hZGVyLmNvbnRlbnRDb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgaWYoYWRzTWFuYWdlcil7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBpZihhZERpc3BsYXlDb250YWluZXIpe1xuICAgICAgICAgICAgYWREaXNwbGF5Q29udGFpbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBpZihsaXN0ZW5lcil7XG4gICAgICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYWRzTG9hZGVyKXtcbiAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEU19NQU5BR0VSX0xPQURFRCwgT25NYW5hZ2VyTG9hZGVkKTtcbiAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEX0VSUk9SLCBPbkFkRXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0ICRhZHMgPSBMQSQocGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpKS5maW5kKFwiLm92cC1hZHNcIik7XG4gICAgICAgIGlmKCRhZHMpe1xuICAgICAgICAgICAgJGFkcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci5vZmYoQ09OVEVOVF9WT0xVTUUsIG51bGwsIHRoYXQpO1xuXG5cbiAgICB9O1xuXG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQWRzOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDEwLzA0LzIwMTkuXG4gKi9cbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX0FEX0xPQURFRCxcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBTVEFURV9BRF9DT01QTEVURSxcbiAgICBBRF9DSEFOR0VELFxuICAgIEFEX1RJTUUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUExBWUVSX1NUQVRFLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGFkc01hbmFnZXIsIHByb3ZpZGVyLCBhZHNTcGVjLCBPbkFkRXJyb3Ipe1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGxvd0xldmVsRXZlbnRzID0ge307XG5cbiAgICBsZXQgaW50ZXJ2YWxUaW1lciA9IG51bGw7XG5cbiAgICBjb25zdCBBRF9CVUZGRVJJTkcgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BRF9CVUZGRVJJTkc7XG4gICAgY29uc3QgQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRDtcbiAgICBjb25zdCBDT05URU5UX1JFU1VNRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQ7XG4gICAgY29uc3QgQURfRVJST1IgPSBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SO1xuICAgIGNvbnN0IEFMTF9BRFNfQ09NUExFVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQ7XG4gICAgY29uc3QgQ0xJQ0sgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DTElDSztcbiAgICBjb25zdCBTS0lQUEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU0tJUFBFRDtcbiAgICBjb25zdCBDT01QTEVURSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFO1xuICAgIGNvbnN0IEZJUlNUX1FVQVJUSUxFPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5GSVJTVF9RVUFSVElMRTtcbiAgICBjb25zdCBMT0FERUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQ7XG4gICAgY29uc3QgTUlEUE9JTlQ9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLk1JRFBPSU5UO1xuICAgIGNvbnN0IFBBVVNFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlBBVVNFRDtcbiAgICBjb25zdCBSRVNVTUVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUkVTVU1FRDtcbiAgICBjb25zdCBTVEFSVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU1RBUlRFRDtcbiAgICBjb25zdCBVU0VSX0NMT1NFID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuVVNFUl9DTE9TRTtcbiAgICBjb25zdCBUSElSRF9RVUFSVElMRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlRISVJEX1FVQVJUSUxFO1xuXG4gICAgbGV0IGlzQWxsQWRDb21wZWxldGUgPSBmYWxzZTsgICAvL1Bvc3Qgcm9sbOydhCDsnITtlbRcbiAgICBsZXQgYWRDb21wbGV0ZUNhbGxiYWNrID0gbnVsbDtcbiAgICBsZXQgY3VycmVudEFkID0gbnVsbDtcblxuICAgICBsb3dMZXZlbEV2ZW50c1tDT05URU5UX1BBVVNFX1JFUVVFU1RFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcblxuICAgICAgICAvL1RoaXMgY2FsbGxzIHdoZW4gcGxheWVyIGlzIHBsYXlpbmcgY29udGVudHMgZm9yIGFkLlxuICAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkKXtcbiAgICAgICAgICAgICBhZHNTcGVjLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcbiAgICAgICAgIH1cblxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50c1tDT05URU5UX1JFU1VNRV9SRVFVRVNURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIC8vVGhpcyBjYWxscyB3aGVuIG9uZSBhZCBlbmRlZC5cbiAgICAgICAgLy9BbmQgdGhpcyBpcyBzaWduYWwgd2hhdCBwbGF5IHRoZSBjb250ZW50cy5cbiAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICBpZihhZHNTcGVjLnN0YXJ0ZWQgJiYgKHByb3ZpZGVyLmdldFBvc2l0aW9uKCkgPT09IDAgfHwgIWFkc1NwZWMuaXNWaWRlb0VuZGVkKSAgKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tBRF9FUlJPUl0gPSBPbkFkRXJyb3I7XG5cbiAgICBsb3dMZXZlbEV2ZW50c1tBTExfQURTX0NPTVBMRVRFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgaXNBbGxBZENvbXBlbGV0ZSA9IHRydWU7XG4gICAgICAgIGlmKGFkc1NwZWMuaXNWaWRlb0VuZGVkKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQ0xJQ0tdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tGSVJTVF9RVUFSVElMRV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIC8vXG4gICAgbG93TGV2ZWxFdmVudHNbQURfQlVGRkVSSU5HXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEX0JVRkZFUklOR1wiLGFkRXZlbnQudHlwZSk7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbTE9BREVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIC8qdmFyIG1ldGFkYXRhID0ge1xuICAgICAgICAgICAgZHVyYXRpb246IHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICB0eXBlIDpcImFkXCJcbiAgICAgICAgfTsqL1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0xPQURFRCwge3JlbWFpbmluZyA6IHJlbWFpbmluZ1RpbWUsIGlzTGluZWFyIDogYWQuaXNMaW5lYXIoKSB9KTtcblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbTUlEUE9JTlRdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tQQVVTRURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BBVVNFRCk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tSRVNVTUVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QTEFZSU5HKTtcbiAgICB9O1xuXG5cbiAgICBsb3dMZXZlbEV2ZW50c1tTVEFSVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGN1cnJlbnRBZCA9IGFkO1xuXG4gICAgICAgIGxldCBhZE9iamVjdCA9IHtcbiAgICAgICAgICAgIGlzTGluZWFyIDogYWQuaXNMaW5lYXIoKSAsXG4gICAgICAgICAgICBkdXJhdGlvbiA6IGFkLmdldER1cmF0aW9uKCksXG4gICAgICAgICAgICBza2lwVGltZU9mZnNldCA6IGFkLmdldFNraXBUaW1lT2Zmc2V0KCkgICAgIC8vVGhlIG51bWJlciBvZiBzZWNvbmRzIG9mIHBsYXliYWNrIGJlZm9yZSB0aGUgYWQgYmVjb21lcyBza2lwcGFibGUuXG4gICAgICAgIH07XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfQ0hBTkdFRCwgYWRPYmplY3QpO1xuXG5cbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcblxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgICAgICAgICBhZHNTcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgLy8gRm9yIGEgbGluZWFyIGFkLCBhIHRpbWVyIGNhbiBiZSBzdGFydGVkIHRvIHBvbGwgZm9yXG4gICAgICAgICAgICAvLyB0aGUgcmVtYWluaW5nIHRpbWUuXG4gICAgICAgICAgICBpbnRlcnZhbFRpbWVyID0gc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1haW5pbmdUaW1lID0gYWRzTWFuYWdlci5nZXRSZW1haW5pbmdUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGFkLmdldER1cmF0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9USU1FLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiA6IGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcFRpbWVPZmZzZXQgOiBhZC5nZXRTa2lwVGltZU9mZnNldCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nIDogcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogZHVyYXRpb24gLSByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcHBhYmxlIDogYWRzTWFuYWdlci5nZXRBZFNraXBwYWJsZVN0YXRlKClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAzMDApOyAvLyBldmVyeSAzMDBtc1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQ09NUExFVEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG5cbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICB9O1xuICAgIC8vVXNlciBza2lwcGVkIGFkLiBzYW1lIHByb2Nlc3Mgb24gY29tcGxldGUuXG4gICAgbG93TGV2ZWxFdmVudHNbU0tJUFBFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcblxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbVVNFUl9DTE9TRV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcblxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbVEhJUkRfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcblxuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuICAgIHRoYXQuc2V0QWRDb21wbGV0ZUNhbGxiYWNrID0gKF9hZENvbXBsZXRlQ2FsbGJhY2spID0+IHtcbiAgICAgICAgYWRDb21wbGV0ZUNhbGxiYWNrID0gX2FkQ29tcGxldGVDYWxsYmFjaztcbiAgICB9O1xuICAgIHRoYXQuaXNBbGxBZENvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaXNBbGxBZENvbXBlbGV0ZTtcbiAgICB9O1xuICAgIHRoYXQuaXNMaW5lYXJBZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRBZCAgPyBjdXJyZW50QWQuaXNMaW5lYXIoKSA6IHRydWU7XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQWRzRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDEyLi5cbiAqL1xuaW1wb3J0IHtFUlJPUiwgU1RBVEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnRPck1zZSkge1xuICAgIGlmKF8uaXNFbGVtZW50KGVsZW1lbnRPck1zZSkpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlO1xuICAgIH1cbiAgICBpZihlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQoKTtcbiAgICB9ZWxzZSBpZihlbGVtZW50T3JNc2UubWVkaWEpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLm1lZGlhO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUxpdmUgPSBmdW5jdGlvbihtc2UpIHtcbiAgICAvL1RvRG8gOiBZb3UgY29uc2lkZXIgaGxzanMuIEJ1dCBub3Qgbm93IGJlY2F1c2Ugd2UgZG9uJ3Qgc3VwcG9ydCBobHNqcy5cblxuICAgIGlmKG1zZSAmJiBtc2UuaXNEeW5hbWljKXtcbiAgICAgICAgcmV0dXJuIG1zZS5pc0R5bmFtaWMoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBlcnJvclRyaWdnZXIgPSBmdW5jdGlvbihlcnJvciwgcHJvdmlkZXIpe1xuICAgIGlmKHByb3ZpZGVyKXtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xuICAgIH1cblxufTtcblxuZXhwb3J0IGNvbnN0IHBpY2tDdXJyZW50U291cmNlID0gKHNvdXJjZXMsIGN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZykgPT4ge1xuICAgIGxldCBzb3VyY2VJbmRleCA9IE1hdGgubWF4KDAsIGN1cnJlbnRTb3VyY2UpO1xuICAgIGNvbnN0IGxhYmVsID1cIlwiO1xuICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc291cmNlSW5kZXg7XG59OyJdLCJzb3VyY2VSb290IjoiIn0=