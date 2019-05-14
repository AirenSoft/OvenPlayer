/*! OvenPlayerv0.9.496 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
    var ADS_MANAGER_LOADED = google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED;
    var AD_ERROR = google.ima.AdErrorEvent.Type.AD_ERROR;

    var that = {};
    var adsManagerLoaded = false;
    var spec = {
        started: false,
        active: false,
        isVideoEnded: false
    };
    google.ima.settings.setLocale("ko");
    google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
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
        //Do not triggering ERROR. becuase It just AD!
        console.error(adErrorEvent.getError().getVastErrorCode(), adErrorEvent.getError().getMessage(), adErrorEvent.getError().getInnerError());
        if (adsManager) {
            adsManager.destroy();
        }
        spec.active = false;
        spec.started = true;
        provider.play();
    };
    var OnManagerLoaded = function OnManagerLoaded(adsManagerLoadedEvent) {
        var adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
        //adsRenderingSettings.useStyledNonLinearAds = true;
        adsManager = adsManagerLoadedEvent.getAdsManager(elVideo, adsRenderingSettings);
        adsManager.init("100%", "100%", google.ima.ViewMode.NORMAL);

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

    var initAndStart = function initAndStart() {
        adsRequest = new google.ima.AdsRequest();

        /* adsRequest.nonLinearAdSlotWidth = 150;
         adsRequest.nonLinearAdSlotHeight = 60;*/

        adsRequest.forceNonLinearFullSlot = false;
        adsRequest.setAdWillAutoPlay(false);
        adsRequest.setAdWillPlayMuted(false);
        adsRequest.adTagUrl = adTagUrl;

        adsLoader.requestAds(adsRequest);
    };
    initAndStart();

    that.isActive = function () {
        return spec.active;
    };
    that.started = function () {
        return spec.started;
    };
    that.play = function () {
        provider.setState(_constants.STATE_LOADING);
        if (spec.started) {
            adsManager.resume();
        } else {
            var retryCount = 0;

            return new Promise(function (resolve, reject) {
                (function checkAdsManagerIsReady() {
                    retryCount++;
                    if (adsManagerLoaded) {
                        elVideo.load();
                        adDisplayContainer.initialize();
                        adsManager.start();
                        spec.started = true;
                        return resolve();
                    } else {
                        if (retryCount < 100) {
                            setTimeout(checkAdsManagerIsReady, 100);
                        } else {
                            return reject();
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

    //광고를 재생하기 위해 컨텐츠를 일시 중지
    lowLevelEvents[CONTENT_PAUSE_REQUESTED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        adsSpec.active = true;
        provider.pause();
    };

    //컨텐츠를 재생
    lowLevelEvents[CONTENT_RESUME_REQUESTED] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
        //alert(adEvent.type);
        adsSpec.active = false;
        if (!adsSpec.isVideoEnded) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Fkcy9BZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9hZHMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci91dGlscy5qcyJdLCJuYW1lcyI6WyJBZHMiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsIkFEU19NQU5BR0VSX0xPQURFRCIsImdvb2dsZSIsImltYSIsIkFkc01hbmFnZXJMb2FkZWRFdmVudCIsIlR5cGUiLCJBRF9FUlJPUiIsIkFkRXJyb3JFdmVudCIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJzZXR0aW5ncyIsInNldExvY2FsZSIsInNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyIsImFkRGlzcGxheUNvbnRhaW5lciIsImFkc0xvYWRlciIsImFkc01hbmFnZXIiLCJsaXN0ZW5lciIsImFkc1JlcXVlc3QiLCJjcmVhdGVBZENvbnRhaW5lciIsImFkQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiZ2V0Q29udGFpbmVyIiwiYXBwZW5kIiwiT25BZEVycm9yIiwiYWRFcnJvckV2ZW50IiwiY29uc29sZSIsImVycm9yIiwiZ2V0RXJyb3IiLCJnZXRWYXN0RXJyb3JDb2RlIiwiZ2V0TWVzc2FnZSIsImdldElubmVyRXJyb3IiLCJkZXN0cm95IiwicGxheSIsIk9uTWFuYWdlckxvYWRlZCIsImFkc01hbmFnZXJMb2FkZWRFdmVudCIsImFkc1JlbmRlcmluZ1NldHRpbmdzIiwiQWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJyZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlIiwiZ2V0QWRzTWFuYWdlciIsImluaXQiLCJWaWV3TW9kZSIsIk5PUk1BTCIsIm9uIiwiQ09OVEVOVF9WT0xVTUUiLCJkYXRhIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwiQWREaXNwbGF5Q29udGFpbmVyIiwiQWRzTG9hZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXRBbmRTdGFydCIsIkFkc1JlcXVlc3QiLCJmb3JjZU5vbkxpbmVhckZ1bGxTbG90Iiwic2V0QWRXaWxsQXV0b1BsYXkiLCJzZXRBZFdpbGxQbGF5TXV0ZWQiLCJyZXF1ZXN0QWRzIiwiaXNBY3RpdmUiLCJzZXRTdGF0ZSIsIlNUQVRFX0xPQURJTkciLCJyZXN1bWUiLCJyZXRyeUNvdW50IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjaGVja0Fkc01hbmFnZXJJc1JlYWR5IiwibG9hZCIsImluaXRpYWxpemUiLCJzdGFydCIsInNldFRpbWVvdXQiLCJwYXVzZSIsInZpZGVvRW5kZWRDYWxsYmFjayIsImNvbXBsZXRlQ29udGVudENhbGxiYWNrIiwiaXNBbGxBZENvbXBsZXRlIiwiaXNMaW5lYXJBZCIsImNvbnRlbnRDb21wbGV0ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCIkYWRzIiwiZmluZCIsInJlbW92ZSIsIm9mZiIsIkxpc3RlbmVyIiwiYWRzU3BlYyIsImxvd0xldmVsRXZlbnRzIiwiaW50ZXJ2YWxUaW1lciIsIkFEX0JVRkZFUklORyIsIkFkRXZlbnQiLCJDT05URU5UX1BBVVNFX1JFUVVFU1RFRCIsIkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCIsIkFMTF9BRFNfQ09NUExFVEVEIiwiQ0xJQ0siLCJTS0lQUEVEIiwiQ09NUExFVEUiLCJGSVJTVF9RVUFSVElMRSIsIkxPQURFRCIsIk1JRFBPSU5UIiwiUEFVU0VEIiwiUkVTVU1FRCIsIlNUQVJURUQiLCJVU0VSX0NMT1NFIiwiVEhJUkRfUVVBUlRJTEUiLCJpc0FsbEFkQ29tcGVsZXRlIiwiYWRDb21wbGV0ZUNhbGxiYWNrIiwiY3VycmVudEFkIiwiYWRFdmVudCIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidHlwZSIsIlNUQVRFX0NPTVBMRVRFIiwicmVtYWluaW5nVGltZSIsImdldFJlbWFpbmluZ1RpbWUiLCJhZCIsImdldEFkIiwidHJpZ2dlciIsIlNUQVRFX0FEX0xPQURFRCIsInJlbWFpbmluZyIsImlzTGluZWFyIiwiU1RBVEVfQURfUEFVU0VEIiwiU1RBVEVfQURfUExBWUlORyIsImFkT2JqZWN0IiwiZHVyYXRpb24iLCJnZXREdXJhdGlvbiIsInNraXBUaW1lT2Zmc2V0IiwiZ2V0U2tpcFRpbWVPZmZzZXQiLCJBRF9DSEFOR0VEIiwic2V0SW50ZXJ2YWwiLCJBRF9USU1FIiwicG9zaXRpb24iLCJza2lwcGFibGUiLCJnZXRBZFNraXBwYWJsZVN0YXRlIiwiY2xlYXJJbnRlcnZhbCIsIlNUQVRFX0FEX0NPTVBMRVRFIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJldmVudE5hbWUiLCJzZXRBZENvbXBsZXRlQ2FsbGJhY2siLCJfYWRDb21wbGV0ZUNhbGxiYWNrIiwiZXh0cmFjdFZpZGVvRWxlbWVudCIsImVsZW1lbnRPck1zZSIsIl8iLCJpc0VsZW1lbnQiLCJnZXRWaWRlb0VsZW1lbnQiLCJtZWRpYSIsInNlcGFyYXRlTGl2ZSIsIm1zZSIsImlzRHluYW1pYyIsImVycm9yVHJpZ2dlciIsIlNUQVRFX0VSUk9SIiwiRVJST1IiLCJwaWNrQ3VycmVudFNvdXJjZSIsInNvdXJjZXMiLCJjdXJyZW50U291cmNlIiwic291cmNlSW5kZXgiLCJNYXRoIiwibWF4IiwibGFiZWwiLCJpIiwibGVuZ3RoIiwiZ2V0U291cmNlTGFiZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBTkE7OztBQVVBLElBQU1BLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxPQUFULEVBQWtCQyxRQUFsQixFQUE0QkMsWUFBNUIsRUFBMENDLFFBQTFDLEVBQW1EO0FBQzNELFFBQU1DLHFCQUFxQkMsT0FBT0MsR0FBUCxDQUFXQyxxQkFBWCxDQUFpQ0MsSUFB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LFFBQUdBLE9BQU9BLElBQUlDLFNBQWQsRUFBd0I7QUFDcEIsZUFBT0QsSUFBSUMsU0FBSixFQUFQO0FBQ0gsS0FGRCxNQUVLO0FBQ0QsZUFBTyxLQUFQO0FBQ0g7QUFDSixDQVJNOztBQVVBLElBQU1DLHNDQUFlLFNBQWZBLFlBQWUsQ0FBU3hILEtBQVQsRUFBZ0JsQyxRQUFoQixFQUF5QjtBQUNqRCxRQUFHQSxRQUFILEVBQVk7QUFDUkEsaUJBQVNpRSxRQUFULENBQWtCMEYsc0JBQWxCO0FBQ0EzSixpQkFBUzZFLEtBQVQ7QUFDQTdFLGlCQUFTd0gsT0FBVCxDQUFpQm9DLGdCQUFqQixFQUF3QjFILEtBQXhCO0FBQ0g7QUFFSixDQVBNOztBQVNBLElBQU0ySCxnREFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxPQUFELEVBQVVDLGFBQVYsRUFBeUI5SixZQUF6QixFQUEwQztBQUN2RSxRQUFJK0osY0FBY0MsS0FBS0MsR0FBTCxDQUFTLENBQVQsRUFBWUgsYUFBWixDQUFsQjtBQUNBLFFBQU1JLFFBQU8sRUFBYjtBQUNBLFFBQUlMLE9BQUosRUFBYTtBQUNULGFBQUssSUFBSU0sSUFBSSxDQUFiLEVBQWdCQSxJQUFJTixRQUFRTyxNQUE1QixFQUFvQ0QsR0FBcEMsRUFBeUM7QUFDckMsZ0JBQUlOLFFBQVFNLENBQVIsWUFBSixFQUF3QjtBQUNwQkosOEJBQWNJLENBQWQ7QUFDSDtBQUNELGdCQUFJbkssYUFBYXFLLGNBQWIsTUFBaUNSLFFBQVFNLENBQVIsRUFBV0QsS0FBWCxLQUFxQmxLLGFBQWFxSyxjQUFiLEVBQTFELEVBQTBGO0FBQ3RGLHVCQUFPRixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsV0FBT0osV0FBUDtBQUNILENBZE0sQyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMDgvMDQvMjAxOS5cbiAqL1xuaW1wb3J0IEFkc0V2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvYWRzL0xpc3RlbmVyXCI7XG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIEVSUk9SUywgQ09OVEVOVF9WT0xVTUUsIFNUQVRFX0xPQURJTkdcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgQWRzID0gZnVuY3Rpb24oZWxWaWRlbywgcHJvdmlkZXIsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpe1xuICAgIGNvbnN0IEFEU19NQU5BR0VSX0xPQURFRCA9IGdvb2dsZS5pbWEuQWRzTWFuYWdlckxvYWRlZEV2ZW50LlR5cGUuQURTX01BTkFHRVJfTE9BREVEO1xuICAgIGNvbnN0IEFEX0VSUk9SID0gZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUjtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGFkc01hbmFnZXJMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgc3RhcnRlZDogZmFsc2UsXG4gICAgICAgIGFjdGl2ZSA6IGZhbHNlLFxuICAgICAgICBpc1ZpZGVvRW5kZWQgOiBmYWxzZVxuICAgIH07XG4gICAgZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUoXCJrb1wiKTtcbiAgICBnb29nbGUuaW1hLnNldHRpbmdzLnNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyh0cnVlKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuXG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldExvY2FsZSgna28nKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXModHJ1ZSk7XG4gICAgbGV0IGFkRGlzcGxheUNvbnRhaW5lciA9IG51bGw7XG4gICAgbGV0IGFkc0xvYWRlciA9IG51bGw7XG4gICAgbGV0IGFkc01hbmFnZXIgPSBudWxsO1xuICAgIGxldCBsaXN0ZW5lciA9IG51bGw7XG4gICAgbGV0IGFkc1JlcXVlc3QgPSBudWxsO1xuXG4gICAgY29uc3QgY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ292cC1hZHMnKTtcbiAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdvdnAtYWRzJyk7XG4gICAgICAgIHBsYXllckNvbmZpZy5nZXRDb250YWluZXIoKS5hcHBlbmQoYWRDb250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcbiAgICB9O1xuICAgIGNvbnN0IE9uQWRFcnJvciA9IGZ1bmN0aW9uKGFkRXJyb3JFdmVudCl7XG4gICAgICAgIC8vRG8gbm90IHRyaWdnZXJpbmcgRVJST1IuIGJlY3Vhc2UgSXQganVzdCBBRCFcbiAgICAgICAgY29uc29sZS5lcnJvcihhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRWYXN0RXJyb3JDb2RlKCksIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldE1lc3NhZ2UoKSwgYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpLCApO1xuICAgICAgICBpZiAoYWRzTWFuYWdlcikge1xuICAgICAgICAgICAgYWRzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgc3BlYy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgc3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuICAgIH07XG4gICAgY29uc3QgT25NYW5hZ2VyTG9hZGVkID0gZnVuY3Rpb24oYWRzTWFuYWdlckxvYWRlZEV2ZW50KXtcbiAgICAgICAgbGV0IGFkc1JlbmRlcmluZ1NldHRpbmdzID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVuZGVyaW5nU2V0dGluZ3MoKTtcbiAgICAgICAgYWRzUmVuZGVyaW5nU2V0dGluZ3MucmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIC8vYWRzUmVuZGVyaW5nU2V0dGluZ3MudXNlU3R5bGVkTm9uTGluZWFyQWRzID0gdHJ1ZTtcbiAgICAgICAgYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKGVsVmlkZW8sIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcbiAgICAgICAgYWRzTWFuYWdlci5pbml0KFwiMTAwJVwiLCBcIjEwMCVcIiwgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xuXG4gICAgICAgIGxpc3RlbmVyID0gQWRzRXZlbnRzTGlzdGVuZXIoYWRzTWFuYWdlciwgcHJvdmlkZXIsIHNwZWMsIE9uQWRFcnJvcik7XG5cbiAgICAgICAgcHJvdmlkZXIub24oQ09OVEVOVF9WT0xVTUUsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGFkc01hbmFnZXIuc2V0Vm9sdW1lKGRhdGEudm9sdW1lLzEwMCk7XG4gICAgICAgIH0sIHRoYXQpO1xuXG4gICAgICAgIGFkc01hbmFnZXJMb2FkZWQgPSB0cnVlO1xuXG4gICAgfTtcblxuXG4gICAgYWREaXNwbGF5Q29udGFpbmVyID0gbmV3IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyKGNyZWF0ZUFkQ29udGFpbmVyKCksIGVsVmlkZW8pO1xuICAgIGFkc0xvYWRlciA9IG5ldyBnb29nbGUuaW1hLkFkc0xvYWRlcihhZERpc3BsYXlDb250YWluZXIpO1xuXG4gICAgYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQURTX01BTkFHRVJfTE9BREVELCBPbk1hbmFnZXJMb2FkZWQsIGZhbHNlKTtcbiAgICBhZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBRF9FUlJPUiwgT25BZEVycm9yLCBmYWxzZSk7XG5cbiAgICBjb25zdCBpbml0QW5kU3RhcnQgPSBmdW5jdGlvbigpe1xuICAgICAgICBhZHNSZXF1ZXN0ID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVxdWVzdCgpO1xuXG4gICAgICAgLyogYWRzUmVxdWVzdC5ub25MaW5lYXJBZFNsb3RXaWR0aCA9IDE1MDtcbiAgICAgICAgYWRzUmVxdWVzdC5ub25MaW5lYXJBZFNsb3RIZWlnaHQgPSA2MDsqL1xuXG4gICAgICAgIGFkc1JlcXVlc3QuZm9yY2VOb25MaW5lYXJGdWxsU2xvdCA9IGZhbHNlO1xuICAgICAgICBhZHNSZXF1ZXN0LnNldEFkV2lsbEF1dG9QbGF5KGZhbHNlKTtcbiAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxQbGF5TXV0ZWQoZmFsc2UpO1xuICAgICAgICBhZHNSZXF1ZXN0LmFkVGFnVXJsID0gYWRUYWdVcmw7XG5cbiAgICAgICAgYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7XG4gICAgfTtcbiAgICBpbml0QW5kU3RhcnQoKTtcblxuXG5cbiAgICB0aGF0LmlzQWN0aXZlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5hY3RpdmU7XG4gICAgfTtcbiAgICB0aGF0LnN0YXJ0ZWQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnN0YXJ0ZWQ7XG4gICAgfTtcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuICAgICAgICBpZihzcGVjLnN0YXJ0ZWQpe1xuICAgICAgICAgICAgYWRzTWFuYWdlci5yZXN1bWUoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrQWRzTWFuYWdlcklzUmVhZHkoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcbiAgICAgICAgICAgICAgICAgICAgaWYoYWRzTWFuYWdlckxvYWRlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkRGlzcGxheUNvbnRhaW5lci5pbml0aWFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMTAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrQWRzTWFuYWdlcklzUmVhZHksIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIGFkc01hbmFnZXIucGF1c2UoKTtcbiAgICB9O1xuICAgIHRoYXQudmlkZW9FbmRlZENhbGxiYWNrID0gKGNvbXBsZXRlQ29udGVudENhbGxiYWNrKSA9PiB7XG4gICAgICAgIC8vbGlzdGVuZXIuaXNMaW5lYXJBZCA6IGdldCBjdXJyZW50IGFkJ3Mgc3RhdHVzIHdoZXRoZXIgbGluZWFyIGFkIG9yIG5vdC5cbiAgICAgICAgaWYobGlzdGVuZXIuaXNBbGxBZENvbXBsZXRlKCkgfHwgIWxpc3RlbmVyLmlzTGluZWFyQWQoKSl7XG4gICAgICAgICAgICBjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaygpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vUG9zdCAtIFJvbGwg7J2EIOyerOyDne2VmOq4sCDsnITtlbTshJzripQg7L2Y7YWQ7Lig6rCAIOuBneuCrOydjOydhCBhZHNMb2FkZXLsl5Dqsowg7JWM66Ck7JW8IO2VnOuLpFxuICAgICAgICAgICAgc3BlYy5pc1ZpZGVvRW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgYWRzTG9hZGVyLmNvbnRlbnRDb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgaWYoYWRzTWFuYWdlcil7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBpZihhZERpc3BsYXlDb250YWluZXIpe1xuICAgICAgICAgICAgYWREaXNwbGF5Q29udGFpbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBpZihsaXN0ZW5lcil7XG4gICAgICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYWRzTG9hZGVyKXtcbiAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEU19NQU5BR0VSX0xPQURFRCwgT25NYW5hZ2VyTG9hZGVkKTtcbiAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEX0VSUk9SLCBPbkFkRXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0ICRhZHMgPUxBJChwbGF5ZXJDb25maWcuZ2V0Q29udGFpbmVyKCkpLmZpbmQoXCIub3ZwLWFkc1wiKTtcbiAgICAgICAgaWYoJGFkcyl7XG4gICAgICAgICAgICAkYWRzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLm9mZihDT05URU5UX1ZPTFVNRSwgbnVsbCwgdGhhdCk7XG5cblxuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IEFkczsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAxMC8wNC8yMDE5LlxuICovXG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcbmltcG9ydCB7XG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9BRF9MT0FERUQsXG4gICAgU1RBVEVfQURfUExBWUlORyxcbiAgICBTVEFURV9BRF9QQVVTRUQsXG4gICAgU1RBVEVfQURfQ09NUExFVEUsXG4gICAgQURfQ0hBTkdFRCxcbiAgICBBRF9USU1FLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihhZHNNYW5hZ2VyLCBwcm92aWRlciwgYWRzU3BlYywgT25BZEVycm9yKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xuXG4gICAgbGV0IGludGVydmFsVGltZXIgPSBudWxsO1xuXG4gICAgY29uc3QgQURfQlVGRkVSSU5HID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQURfQlVGRkVSSU5HO1xuICAgIGNvbnN0IENPTlRFTlRfUEFVU0VfUkVRVUVTVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQ7XG4gICAgY29uc3QgQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEO1xuICAgIGNvbnN0IEFEX0VSUk9SID0gZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUjtcbiAgICBjb25zdCBBTExfQURTX0NPTVBMRVRFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFMTF9BRFNfQ09NUExFVEVEO1xuICAgIGNvbnN0IENMSUNLID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ0xJQ0s7XG4gICAgY29uc3QgU0tJUFBFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNLSVBQRUQ7XG4gICAgY29uc3QgQ09NUExFVEUgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT01QTEVURTtcbiAgICBjb25zdCBGSVJTVF9RVUFSVElMRT0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuRklSU1RfUVVBUlRJTEU7XG4gICAgY29uc3QgTE9BREVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVEO1xuICAgIGNvbnN0IE1JRFBPSU5UPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5NSURQT0lOVDtcbiAgICBjb25zdCBQQVVTRUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5QQVVTRUQ7XG4gICAgY29uc3QgUkVTVU1FRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlJFU1VNRUQ7XG4gICAgY29uc3QgU1RBUlRFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQ7XG4gICAgY29uc3QgVVNFUl9DTE9TRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlVTRVJfQ0xPU0U7XG4gICAgY29uc3QgVEhJUkRfUVVBUlRJTEUgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5USElSRF9RVUFSVElMRTtcblxuICAgIGxldCBpc0FsbEFkQ29tcGVsZXRlID0gZmFsc2U7ICAgLy9Qb3N0IHJvbGzsnYQg7JyE7ZW0XG4gICAgbGV0IGFkQ29tcGxldGVDYWxsYmFjayA9IG51bGw7XG4gICAgbGV0IGN1cnJlbnRBZCA9IG51bGw7XG5cbiAgICAvL+q0keqzoOulvCDsnqzsg53tlZjquLAg7JyE7ZW0IOy7qO2FkOy4oOulvCDsnbzsi5wg7KSR7KeAXG4gICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9QQVVTRV9SRVFVRVNURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcbiAgICB9O1xuXG4gICAgLy/su6jthZDsuKDrpbwg7J6s7IOdXG4gICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICAvL2FsZXJ0KGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmKCFhZHNTcGVjLmlzVmlkZW9FbmRlZCl7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQURfRVJST1JdID0gT25BZEVycm9yO1xuXG4gICAgbG93TGV2ZWxFdmVudHNbQUxMX0FEU19DT01QTEVURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGlzQWxsQWRDb21wZWxldGUgPSB0cnVlO1xuICAgICAgICBpZihhZHNTcGVjLmlzVmlkZW9FbmRlZCl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0NMSUNLXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbRklSU1RfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICAvL1xuICAgIGxvd0xldmVsRXZlbnRzW0FEX0JVRkZFUklOR10gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRF9CVUZGRVJJTkdcIixhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0xPQURFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IHJlbWFpbmluZ1RpbWUgPSBhZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICAvKnZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgdHlwZSA6XCJhZFwiXG4gICAgICAgIH07Ki9cblxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0xPQURFRCwge3JlbWFpbmluZyA6IHJlbWFpbmluZ1RpbWUsIGlzTGluZWFyIDogYWQuaXNMaW5lYXIoKSB9KTtcblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbTUlEUE9JTlRdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tQQVVTRURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BBVVNFRCk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tSRVNVTUVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QTEFZSU5HKTtcbiAgICB9O1xuXG5cbiAgICBsb3dMZXZlbEV2ZW50c1tTVEFSVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGN1cnJlbnRBZCA9IGFkO1xuXG4gICAgICAgIGxldCBhZE9iamVjdCA9IHtcbiAgICAgICAgICAgIGlzTGluZWFyIDogYWQuaXNMaW5lYXIoKSAsXG4gICAgICAgICAgICBkdXJhdGlvbiA6IGFkLmdldER1cmF0aW9uKCksXG4gICAgICAgICAgICBza2lwVGltZU9mZnNldCA6IGFkLmdldFNraXBUaW1lT2Zmc2V0KCkgICAgIC8vVGhlIG51bWJlciBvZiBzZWNvbmRzIG9mIHBsYXliYWNrIGJlZm9yZSB0aGUgYWQgYmVjb21lcyBza2lwcGFibGUuXG4gICAgICAgIH07XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfQ0hBTkdFRCwgYWRPYmplY3QpO1xuXG5cbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcblxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgICAgICAgICBhZHNTcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgLy8gRm9yIGEgbGluZWFyIGFkLCBhIHRpbWVyIGNhbiBiZSBzdGFydGVkIHRvIHBvbGwgZm9yXG4gICAgICAgICAgICAvLyB0aGUgcmVtYWluaW5nIHRpbWUuXG4gICAgICAgICAgICBpbnRlcnZhbFRpbWVyID0gc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1haW5pbmdUaW1lID0gYWRzTWFuYWdlci5nZXRSZW1haW5pbmdUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGFkLmdldER1cmF0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9USU1FLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiA6IGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcFRpbWVPZmZzZXQgOiBhZC5nZXRTa2lwVGltZU9mZnNldCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nIDogcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogZHVyYXRpb24gLSByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcHBhYmxlIDogYWRzTWFuYWdlci5nZXRBZFNraXBwYWJsZVN0YXRlKClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAzMDApOyAvLyBldmVyeSAzMDBtc1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQ09NUExFVEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG5cbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICB9O1xuICAgIC8vVXNlciBza2lwcGVkIGFkLiBzYW1lIHByb2Nlc3Mgb24gY29tcGxldGUuXG4gICAgbG93TGV2ZWxFdmVudHNbU0tJUFBFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcblxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbVVNFUl9DTE9TRV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcblxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbVEhJUkRfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcblxuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuICAgIHRoYXQuc2V0QWRDb21wbGV0ZUNhbGxiYWNrID0gKF9hZENvbXBsZXRlQ2FsbGJhY2spID0+IHtcbiAgICAgICAgYWRDb21wbGV0ZUNhbGxiYWNrID0gX2FkQ29tcGxldGVDYWxsYmFjaztcbiAgICB9O1xuICAgIHRoYXQuaXNBbGxBZENvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaXNBbGxBZENvbXBlbGV0ZTtcbiAgICB9O1xuICAgIHRoYXQuaXNMaW5lYXJBZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRBZCAgPyBjdXJyZW50QWQuaXNMaW5lYXIoKSA6IHRydWU7XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQWRzRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDEyLi5cbiAqL1xuaW1wb3J0IHtFUlJPUiwgU1RBVEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnRPck1zZSkge1xuICAgIGlmKF8uaXNFbGVtZW50KGVsZW1lbnRPck1zZSkpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlO1xuICAgIH1cbiAgICBpZihlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQoKTtcbiAgICB9ZWxzZSBpZihlbGVtZW50T3JNc2UubWVkaWEpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLm1lZGlhO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUxpdmUgPSBmdW5jdGlvbihtc2UpIHtcbiAgICAvL1RvRG8gOiBZb3UgY29uc2lkZXIgaGxzanMuIEJ1dCBub3Qgbm93IGJlY2F1c2Ugd2UgZG9uJ3Qgc3VwcG9ydCBobHNqcy5cblxuICAgIGlmKG1zZSAmJiBtc2UuaXNEeW5hbWljKXtcbiAgICAgICAgcmV0dXJuIG1zZS5pc0R5bmFtaWMoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBlcnJvclRyaWdnZXIgPSBmdW5jdGlvbihlcnJvciwgcHJvdmlkZXIpe1xuICAgIGlmKHByb3ZpZGVyKXtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xuICAgIH1cblxufTtcblxuZXhwb3J0IGNvbnN0IHBpY2tDdXJyZW50U291cmNlID0gKHNvdXJjZXMsIGN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZykgPT4ge1xuICAgIGxldCBzb3VyY2VJbmRleCA9IE1hdGgubWF4KDAsIGN1cnJlbnRTb3VyY2UpO1xuICAgIGNvbnN0IGxhYmVsID1cIlwiO1xuICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc291cmNlSW5kZXg7XG59OyJdLCJzb3VyY2VSb290IjoiIn0=