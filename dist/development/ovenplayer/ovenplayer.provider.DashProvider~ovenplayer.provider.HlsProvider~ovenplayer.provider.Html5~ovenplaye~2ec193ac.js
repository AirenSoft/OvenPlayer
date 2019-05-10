/*! OvenPlayerv0.9.492 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
    var OnManagerLoaded = function OnManagerLoaded(adsManagerLoadedEvent) {
        var adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
        //adsRenderingSettings.useStyledNonLinearAds = true;
        adsManager = adsManagerLoadedEvent.getAdsManager(elVideo, adsRenderingSettings);
        adsManager.init("100%", "100%", google.ima.ViewMode.NORMAL);

        listener = (0, _Listener2["default"])(adsManager, provider, spec);

        provider.on(_constants.CONTENT_VOLUME, function (data) {
            adsManager.setVolume(data.volume / 100);
        }, that);

        adsManagerLoaded = true;
    };
    var OnAdError = function OnAdError(adErrorEvent) {
        (0, _utils.errorTrigger)({
            message: adErrorEvent.getError().getMessage() + " [" + adErrorEvent.getError().getVastErrorCode() + "]",
            code: adErrorEvent.getError().getVastErrorCode(),
            reason: adErrorEvent.getError().getMessage()
        }, provider);
        if (adsManager) {
            adsManager.destroy();
        }
        spec.active = false;
        spec.started = true;
        provider.play();
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
var Listener = function Listener(adsManager, provider, adsSpec) {
    var that = {};
    var lowLevelEvents = {};

    var intervalTimer = null;

    var AD_BUFFERING = google.ima.AdEvent.Type.AD_BUFFERING;
    var CONTENT_PAUSE_REQUESTED = google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED;
    var CONTENT_RESUME_REQUESTED = google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED;
    var AD_ERROR = google.ima.AdEvent.Type.AD_ERROR;
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
    lowLevelEvents[AD_ERROR] = function (adEvent) {
        OvenPlayerConsole.log(adEvent.type);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Fkcy9BZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9hZHMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci91dGlscy5qcyJdLCJuYW1lcyI6WyJBZHMiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsIkFEU19NQU5BR0VSX0xPQURFRCIsImdvb2dsZSIsImltYSIsIkFkc01hbmFnZXJMb2FkZWRFdmVudCIsIlR5cGUiLCJBRF9FUlJPUiIsIkFkRXJyb3JFdmVudCIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJzZXR0aW5ncyIsInNldExvY2FsZSIsInNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyIsImFkRGlzcGxheUNvbnRhaW5lciIsImFkc0xvYWRlciIsImFkc01hbmFnZXIiLCJsaXN0ZW5lciIsImFkc1JlcXVlc3QiLCJjcmVhdGVBZENvbnRhaW5lciIsImFkQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiZ2V0Q29udGFpbmVyIiwiYXBwZW5kIiwiT25NYW5hZ2VyTG9hZGVkIiwiYWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiYWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJBZHNSZW5kZXJpbmdTZXR0aW5ncyIsInJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUiLCJnZXRBZHNNYW5hZ2VyIiwiaW5pdCIsIlZpZXdNb2RlIiwiTk9STUFMIiwib24iLCJDT05URU5UX1ZPTFVNRSIsImRhdGEiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJPbkFkRXJyb3IiLCJhZEVycm9yRXZlbnQiLCJtZXNzYWdlIiwiZ2V0RXJyb3IiLCJnZXRNZXNzYWdlIiwiZ2V0VmFzdEVycm9yQ29kZSIsImNvZGUiLCJyZWFzb24iLCJkZXN0cm95IiwicGxheSIsIkFkRGlzcGxheUNvbnRhaW5lciIsIkFkc0xvYWRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbml0QW5kU3RhcnQiLCJBZHNSZXF1ZXN0IiwiZm9yY2VOb25MaW5lYXJGdWxsU2xvdCIsInNldEFkV2lsbEF1dG9QbGF5Iiwic2V0QWRXaWxsUGxheU11dGVkIiwicmVxdWVzdEFkcyIsImlzQWN0aXZlIiwic2V0U3RhdGUiLCJTVEFURV9MT0FESU5HIiwicmVzdW1lIiwicmV0cnlDb3VudCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSIsImxvYWQiLCJpbml0aWFsaXplIiwic3RhcnQiLCJzZXRUaW1lb3V0IiwicGF1c2UiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJjb21wbGV0ZUNvbnRlbnRDYWxsYmFjayIsImlzQWxsQWRDb21wbGV0ZSIsImlzTGluZWFyQWQiLCJjb250ZW50Q29tcGxldGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiJGFkcyIsImZpbmQiLCJyZW1vdmUiLCJvZmYiLCJMaXN0ZW5lciIsImFkc1NwZWMiLCJsb3dMZXZlbEV2ZW50cyIsImludGVydmFsVGltZXIiLCJBRF9CVUZGRVJJTkciLCJBZEV2ZW50IiwiQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQiLCJDT05URU5UX1JFU1VNRV9SRVFVRVNURUQiLCJBTExfQURTX0NPTVBMRVRFRCIsIkNMSUNLIiwiU0tJUFBFRCIsIkNPTVBMRVRFIiwiRklSU1RfUVVBUlRJTEUiLCJMT0FERUQiLCJNSURQT0lOVCIsIlBBVVNFRCIsIlJFU1VNRUQiLCJTVEFSVEVEIiwiVVNFUl9DTE9TRSIsIlRISVJEX1FVQVJUSUxFIiwiaXNBbGxBZENvbXBlbGV0ZSIsImFkQ29tcGxldGVDYWxsYmFjayIsImN1cnJlbnRBZCIsImFkRXZlbnQiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsInR5cGUiLCJTVEFURV9DT01QTEVURSIsInJlbWFpbmluZ1RpbWUiLCJnZXRSZW1haW5pbmdUaW1lIiwiYWQiLCJnZXRBZCIsInRyaWdnZXIiLCJTVEFURV9BRF9MT0FERUQiLCJyZW1haW5pbmciLCJpc0xpbmVhciIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX1BMQVlJTkciLCJhZE9iamVjdCIsImR1cmF0aW9uIiwiZ2V0RHVyYXRpb24iLCJza2lwVGltZU9mZnNldCIsImdldFNraXBUaW1lT2Zmc2V0IiwiQURfQ0hBTkdFRCIsInNldEludGVydmFsIiwiQURfVElNRSIsInBvc2l0aW9uIiwic2tpcHBhYmxlIiwiZ2V0QWRTa2lwcGFibGVTdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJTVEFURV9BRF9DT01QTEVURSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwic2V0QWRDb21wbGV0ZUNhbGxiYWNrIiwiX2FkQ29tcGxldGVDYWxsYmFjayIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJlbGVtZW50T3JNc2UiLCJfIiwiaXNFbGVtZW50IiwiZ2V0VmlkZW9FbGVtZW50IiwibWVkaWEiLCJzZXBhcmF0ZUxpdmUiLCJtc2UiLCJpc0R5bmFtaWMiLCJlcnJvclRyaWdnZXIiLCJlcnJvciIsIlNUQVRFX0VSUk9SIiwiRVJST1IiLCJwaWNrQ3VycmVudFNvdXJjZSIsInNvdXJjZXMiLCJjdXJyZW50U291cmNlIiwic291cmNlSW5kZXgiLCJNYXRoIiwibWF4IiwibGFiZWwiLCJpIiwibGVuZ3RoIiwiZ2V0U291cmNlTGFiZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBTkE7OztBQVVBLElBQU1BLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxPQUFULEVBQWtCQyxRQUFsQixFQUE0QkMsWUFBNUIsRUFBMENDLFFBQTFDLEVBQW1EO0FBQzNELFFBQU1DLHFCQUFxQkMsT0FBT0MsR0FBUCxDQUFXQyxxQkFBWCxDQUFpQ0MsSUFB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fm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+MmVjMTkzYWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAwOC8wNC8yMDE5LlxuICovXG5pbXBvcnQgQWRzRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9hZHMvTGlzdGVuZXJcIjtcbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgRVJST1JTLCBDT05URU5UX1ZPTFVNRSwgU1RBVEVfTE9BRElOR1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBBZHMgPSBmdW5jdGlvbihlbFZpZGVvLCBwcm92aWRlciwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XG4gICAgY29uc3QgQURTX01BTkFHRVJfTE9BREVEID0gZ29vZ2xlLmltYS5BZHNNYW5hZ2VyTG9hZGVkRXZlbnQuVHlwZS5BRFNfTUFOQUdFUl9MT0FERUQ7XG4gICAgY29uc3QgQURfRVJST1IgPSBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SO1xuXG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgYWRzTWFuYWdlckxvYWRlZCA9IGZhbHNlO1xuICAgIGxldCBzcGVjID0ge1xuICAgICAgICBzdGFydGVkOiBmYWxzZSxcbiAgICAgICAgYWN0aXZlIDogZmFsc2UsXG4gICAgICAgIGlzVmlkZW9FbmRlZCA6IGZhbHNlXG4gICAgfTtcbiAgICBnb29nbGUuaW1hLnNldHRpbmdzLnNldExvY2FsZShcImtvXCIpO1xuICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0RGlzYWJsZUN1c3RvbVBsYXliYWNrRm9ySU9TMTBQbHVzKHRydWUpO1xuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRWcGFpZE1vZGUoZ29vZ2xlLmltYS5JbWFTZGtTZXR0aW5ncy5WcGFpZE1vZGUuRU5BQkxFRCk7XG5cbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0TG9jYWxlKCdrbycpO1xuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRWcGFpZE1vZGUoZ29vZ2xlLmltYS5JbWFTZGtTZXR0aW5ncy5WcGFpZE1vZGUuRU5BQkxFRCk7XG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyh0cnVlKTtcbiAgICBsZXQgYWREaXNwbGF5Q29udGFpbmVyID0gbnVsbDtcbiAgICBsZXQgYWRzTG9hZGVyID0gbnVsbDtcbiAgICBsZXQgYWRzTWFuYWdlciA9IG51bGw7XG4gICAgbGV0IGxpc3RlbmVyID0gbnVsbDtcbiAgICBsZXQgYWRzUmVxdWVzdCA9IG51bGw7XG5cbiAgICBjb25zdCBjcmVhdGVBZENvbnRhaW5lciA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3ZwLWFkcycpO1xuICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ292cC1hZHMnKTtcbiAgICAgICAgcGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpLmFwcGVuZChhZENvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIGFkQ29udGFpbmVyO1xuICAgIH07XG4gICAgY29uc3QgT25NYW5hZ2VyTG9hZGVkID0gZnVuY3Rpb24oYWRzTWFuYWdlckxvYWRlZEV2ZW50KXtcbiAgICAgICAgbGV0IGFkc1JlbmRlcmluZ1NldHRpbmdzID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVuZGVyaW5nU2V0dGluZ3MoKTtcbiAgICAgICAgYWRzUmVuZGVyaW5nU2V0dGluZ3MucmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIC8vYWRzUmVuZGVyaW5nU2V0dGluZ3MudXNlU3R5bGVkTm9uTGluZWFyQWRzID0gdHJ1ZTtcbiAgICAgICAgYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKGVsVmlkZW8sIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcbiAgICAgICAgYWRzTWFuYWdlci5pbml0KFwiMTAwJVwiLCBcIjEwMCVcIiwgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xuXG4gICAgICAgIGxpc3RlbmVyID0gQWRzRXZlbnRzTGlzdGVuZXIoYWRzTWFuYWdlciwgcHJvdmlkZXIsIHNwZWMpO1xuXG4gICAgICAgIHByb3ZpZGVyLm9uKENPTlRFTlRfVk9MVU1FLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnNldFZvbHVtZShkYXRhLnZvbHVtZS8xMDApO1xuICAgICAgICB9LCB0aGF0KTtcblxuICAgICAgICBhZHNNYW5hZ2VyTG9hZGVkID0gdHJ1ZTtcblxuICAgIH07XG4gICAgY29uc3QgT25BZEVycm9yID0gZnVuY3Rpb24oYWRFcnJvckV2ZW50KXtcbiAgICAgICAgZXJyb3JUcmlnZ2VyKHtcbiAgICAgICAgICAgIG1lc3NhZ2UgOiBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRNZXNzYWdlKCkgKyBcIiBbXCIrYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpK1wiXVwiLFxuICAgICAgICAgICAgY29kZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSxcbiAgICAgICAgICAgIHJlYXNvbiA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldE1lc3NhZ2UoKVxuICAgICAgICB9LCBwcm92aWRlcik7XG4gICAgICAgIGlmIChhZHNNYW5hZ2VyKSB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBzcGVjLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgfTtcblxuICAgIGFkRGlzcGxheUNvbnRhaW5lciA9IG5ldyBnb29nbGUuaW1hLkFkRGlzcGxheUNvbnRhaW5lcihjcmVhdGVBZENvbnRhaW5lcigpLCBlbFZpZGVvKTtcbiAgICBhZHNMb2FkZXIgPSBuZXcgZ29vZ2xlLmltYS5BZHNMb2FkZXIoYWREaXNwbGF5Q29udGFpbmVyKTtcblxuICAgIGFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKEFEU19NQU5BR0VSX0xPQURFRCwgT25NYW5hZ2VyTG9hZGVkLCBmYWxzZSk7XG4gICAgYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQURfRVJST1IsIE9uQWRFcnJvciwgZmFsc2UpO1xuXG4gICAgY29uc3QgaW5pdEFuZFN0YXJ0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgYWRzUmVxdWVzdCA9IG5ldyBnb29nbGUuaW1hLkFkc1JlcXVlc3QoKTtcblxuICAgICAgIC8qIGFkc1JlcXVlc3Qubm9uTGluZWFyQWRTbG90V2lkdGggPSAxNTA7XG4gICAgICAgIGFkc1JlcXVlc3Qubm9uTGluZWFyQWRTbG90SGVpZ2h0ID0gNjA7Ki9cblxuICAgICAgICBhZHNSZXF1ZXN0LmZvcmNlTm9uTGluZWFyRnVsbFNsb3QgPSBmYWxzZTtcbiAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxBdXRvUGxheShmYWxzZSk7XG4gICAgICAgIGFkc1JlcXVlc3Quc2V0QWRXaWxsUGxheU11dGVkKGZhbHNlKTtcbiAgICAgICAgYWRzUmVxdWVzdC5hZFRhZ1VybCA9IGFkVGFnVXJsO1xuXG4gICAgICAgIGFkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpO1xuICAgIH07XG4gICAgaW5pdEFuZFN0YXJ0KCk7XG5cblxuXG4gICAgdGhhdC5pc0FjdGl2ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuYWN0aXZlO1xuICAgIH07XG4gICAgdGhhdC5zdGFydGVkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5zdGFydGVkO1xuICAgIH07XG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICAgICAgaWYoc3BlYy5zdGFydGVkKXtcbiAgICAgICAgICAgIGFkc01hbmFnZXIucmVzdW1lKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja0Fkc01hbmFnZXJJc1JlYWR5KCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgICAgIGlmKGFkc01hbmFnZXJMb2FkZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDEwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0Fkc01hbmFnZXJJc1JlYWR5LCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xuICAgICAgICBhZHNNYW5hZ2VyLnBhdXNlKCk7XG4gICAgfTtcbiAgICB0aGF0LnZpZGVvRW5kZWRDYWxsYmFjayA9IChjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaykgPT4ge1xuICAgICAgICAvL2xpc3RlbmVyLmlzTGluZWFyQWQgOiBnZXQgY3VycmVudCBhZCdzIHN0YXR1cyB3aGV0aGVyIGxpbmVhciBhZCBvciBub3QuXG4gICAgICAgIGlmKGxpc3RlbmVyLmlzQWxsQWRDb21wbGV0ZSgpIHx8ICFsaXN0ZW5lci5pc0xpbmVhckFkKCkpe1xuICAgICAgICAgICAgY29tcGxldGVDb250ZW50Q2FsbGJhY2soKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvL1Bvc3QgLSBSb2xsIOydhCDsnqzsg53tlZjquLAg7JyE7ZW07ISc64qUIOy9mO2FkOy4oOqwgCDrgZ3rgqzsnYzsnYQgYWRzTG9hZGVy7JeQ6rKMIOyVjOugpOyVvCDtlZzri6RcbiAgICAgICAgICAgIHNwZWMuaXNWaWRlb0VuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGFkc0xvYWRlci5jb250ZW50Q29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgIGlmKGFkc01hbmFnZXIpe1xuICAgICAgICAgICAgYWRzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYWREaXNwbGF5Q29udGFpbmVyKXtcbiAgICAgICAgICAgIGFkRGlzcGxheUNvbnRhaW5lci5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobGlzdGVuZXIpe1xuICAgICAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGFkc0xvYWRlcil7XG4gICAgICAgICAgICBhZHNMb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBRFNfTUFOQUdFUl9MT0FERUQsIE9uTWFuYWdlckxvYWRlZCk7XG4gICAgICAgICAgICBhZHNMb2FkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBRF9FUlJPUiwgT25BZEVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCAkYWRzID1MQSQocGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpKS5maW5kKFwiLm92cC1hZHNcIik7XG4gICAgICAgIGlmKCRhZHMpe1xuICAgICAgICAgICAgJGFkcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci5vZmYoQ09OVEVOVF9WT0xVTUUsIG51bGwsIHRoYXQpO1xuXG5cbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBBZHM7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMTAvMDQvMjAxOS5cbiAqL1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5pbXBvcnQge1xuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfQURfTE9BREVELFxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXG4gICAgU1RBVEVfQURfUEFVU0VELFxuICAgIFNUQVRFX0FEX0NPTVBMRVRFLFxuICAgIEFEX0NIQU5HRUQsXG4gICAgQURfVElNRSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsXG4gICAgUFJPVklERVJfSFRNTDUsXG4gICAgUFJPVklERVJfV0VCUlRDLFxuICAgIFBST1ZJREVSX0RBU0gsXG4gICAgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oYWRzTWFuYWdlciwgcHJvdmlkZXIsIGFkc1NwZWMpe1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGxvd0xldmVsRXZlbnRzID0ge307XG5cbiAgICBsZXQgaW50ZXJ2YWxUaW1lciA9IG51bGw7XG5cbiAgICBjb25zdCBBRF9CVUZGRVJJTkcgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BRF9CVUZGRVJJTkc7XG4gICAgY29uc3QgQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRDtcbiAgICBjb25zdCBDT05URU5UX1JFU1VNRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQ7XG4gICAgY29uc3QgQURfRVJST1IgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BRF9FUlJPUjtcbiAgICBjb25zdCBBTExfQURTX0NPTVBMRVRFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFMTF9BRFNfQ09NUExFVEVEO1xuICAgIGNvbnN0IENMSUNLID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ0xJQ0s7XG4gICAgY29uc3QgU0tJUFBFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNLSVBQRUQ7XG4gICAgY29uc3QgQ09NUExFVEUgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT01QTEVURTtcbiAgICBjb25zdCBGSVJTVF9RVUFSVElMRT0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuRklSU1RfUVVBUlRJTEU7XG4gICAgY29uc3QgTE9BREVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVEO1xuICAgIGNvbnN0IE1JRFBPSU5UPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5NSURQT0lOVDtcbiAgICBjb25zdCBQQVVTRUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5QQVVTRUQ7XG4gICAgY29uc3QgUkVTVU1FRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlJFU1VNRUQ7XG4gICAgY29uc3QgU1RBUlRFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQ7XG4gICAgY29uc3QgVVNFUl9DTE9TRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlVTRVJfQ0xPU0U7XG4gICAgY29uc3QgVEhJUkRfUVVBUlRJTEUgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5USElSRF9RVUFSVElMRTtcblxuICAgIGxldCBpc0FsbEFkQ29tcGVsZXRlID0gZmFsc2U7ICAgLy9Qb3N0IHJvbGzsnYQg7JyE7ZW0XG4gICAgbGV0IGFkQ29tcGxldGVDYWxsYmFjayA9IG51bGw7XG4gICAgbGV0IGN1cnJlbnRBZCA9IG51bGw7XG5cbiAgICAvL+q0keqzoOulvCDsnqzsg53tlZjquLAg7JyE7ZW0IOy7qO2FkOy4oOulvCDsnbzsi5wg7KSR7KeAXG4gICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9QQVVTRV9SRVFVRVNURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcbiAgICB9O1xuXG4gICAgLy/su6jthZDsuKDrpbwg7J6s7IOdXG4gICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICAvL2FsZXJ0KGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmKCFhZHNTcGVjLmlzVmlkZW9FbmRlZCl7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQURfRVJST1JdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHNbQUxMX0FEU19DT01QTEVURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGlzQWxsQWRDb21wZWxldGUgPSB0cnVlO1xuICAgICAgICBpZihhZHNTcGVjLmlzVmlkZW9FbmRlZCl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0NMSUNLXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbRklSU1RfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICAvL1xuICAgIGxvd0xldmVsRXZlbnRzW0FEX0JVRkZFUklOR10gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRF9CVUZGRVJJTkdcIixhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0xPQURFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IHJlbWFpbmluZ1RpbWUgPSBhZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICAvKnZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgdHlwZSA6XCJhZFwiXG4gICAgICAgIH07Ki9cblxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0xPQURFRCwge3JlbWFpbmluZyA6IHJlbWFpbmluZ1RpbWUsIGlzTGluZWFyIDogYWQuaXNMaW5lYXIoKSB9KTtcblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbTUlEUE9JTlRdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tQQVVTRURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BBVVNFRCk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tSRVNVTUVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QTEFZSU5HKTtcbiAgICB9O1xuXG5cbiAgICBsb3dMZXZlbEV2ZW50c1tTVEFSVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGN1cnJlbnRBZCA9IGFkO1xuXG4gICAgICAgIGxldCBhZE9iamVjdCA9IHtcbiAgICAgICAgICAgIGlzTGluZWFyIDogYWQuaXNMaW5lYXIoKSAsXG4gICAgICAgICAgICBkdXJhdGlvbiA6IGFkLmdldER1cmF0aW9uKCksXG4gICAgICAgICAgICBza2lwVGltZU9mZnNldCA6IGFkLmdldFNraXBUaW1lT2Zmc2V0KCkgICAgIC8vVGhlIG51bWJlciBvZiBzZWNvbmRzIG9mIHBsYXliYWNrIGJlZm9yZSB0aGUgYWQgYmVjb21lcyBza2lwcGFibGUuXG4gICAgICAgIH07XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfQ0hBTkdFRCwgYWRPYmplY3QpO1xuXG5cbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcblxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgICAgICAgICBhZHNTcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgLy8gRm9yIGEgbGluZWFyIGFkLCBhIHRpbWVyIGNhbiBiZSBzdGFydGVkIHRvIHBvbGwgZm9yXG4gICAgICAgICAgICAvLyB0aGUgcmVtYWluaW5nIHRpbWUuXG4gICAgICAgICAgICBpbnRlcnZhbFRpbWVyID0gc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1haW5pbmdUaW1lID0gYWRzTWFuYWdlci5nZXRSZW1haW5pbmdUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGFkLmdldER1cmF0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9USU1FLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiA6IGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcFRpbWVPZmZzZXQgOiBhZC5nZXRTa2lwVGltZU9mZnNldCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nIDogcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogZHVyYXRpb24gLSByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcHBhYmxlIDogYWRzTWFuYWdlci5nZXRBZFNraXBwYWJsZVN0YXRlKClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAzMDApOyAvLyBldmVyeSAzMDBtc1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQ09NUExFVEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG5cbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICB9O1xuICAgIC8vVXNlciBza2lwcGVkIGFkLiBzYW1lIHByb2Nlc3Mgb24gY29tcGxldGUuXG4gICAgbG93TGV2ZWxFdmVudHNbU0tJUFBFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcblxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbVVNFUl9DTE9TRV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcblxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbVEhJUkRfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcblxuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgYWRzTWFuYWdlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuICAgIHRoYXQuc2V0QWRDb21wbGV0ZUNhbGxiYWNrID0gKF9hZENvbXBsZXRlQ2FsbGJhY2spID0+IHtcbiAgICAgICAgYWRDb21wbGV0ZUNhbGxiYWNrID0gX2FkQ29tcGxldGVDYWxsYmFjaztcbiAgICB9O1xuICAgIHRoYXQuaXNBbGxBZENvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaXNBbGxBZENvbXBlbGV0ZTtcbiAgICB9O1xuICAgIHRoYXQuaXNMaW5lYXJBZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRBZCAgPyBjdXJyZW50QWQuaXNMaW5lYXIoKSA6IHRydWU7XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQWRzRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDEyLi5cbiAqL1xuaW1wb3J0IHtFUlJPUiwgU1RBVEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnRPck1zZSkge1xuICAgIGlmKF8uaXNFbGVtZW50KGVsZW1lbnRPck1zZSkpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlO1xuICAgIH1cbiAgICBpZihlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQoKTtcbiAgICB9ZWxzZSBpZihlbGVtZW50T3JNc2UubWVkaWEpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLm1lZGlhO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUxpdmUgPSBmdW5jdGlvbihtc2UpIHtcbiAgICAvL1RvRG8gOiBZb3UgY29uc2lkZXIgaGxzanMuIEJ1dCBub3Qgbm93IGJlY2F1c2Ugd2UgZG9uJ3Qgc3VwcG9ydCBobHNqcy5cblxuICAgIGlmKG1zZSAmJiBtc2UuaXNEeW5hbWljKXtcbiAgICAgICAgcmV0dXJuIG1zZS5pc0R5bmFtaWMoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBlcnJvclRyaWdnZXIgPSBmdW5jdGlvbihlcnJvciwgcHJvdmlkZXIpe1xuICAgIGlmKHByb3ZpZGVyKXtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xuICAgIH1cblxufTtcblxuZXhwb3J0IGNvbnN0IHBpY2tDdXJyZW50U291cmNlID0gKHNvdXJjZXMsIGN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZykgPT4ge1xuICAgIGxldCBzb3VyY2VJbmRleCA9IE1hdGgubWF4KDAsIGN1cnJlbnRTb3VyY2UpO1xuICAgIGNvbnN0IGxhYmVsID1cIlwiO1xuICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc291cmNlSW5kZXg7XG59OyJdLCJzb3VyY2VSb290IjoiIn0=