/*! OvenPlayerv0.9.498 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        started: false,
        active: false,
        isVideoEnded: false
    };
    var autoplayAllowed = void 0,
        autoplayRequiresMuted = void 0;

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
    checkAutoplaySupport();

    function initRequest() {

        OvenPlayerConsole.log("AutoPlay Support : ", "autoplayAllowed", autoplayAllowed, "autoplayRequiresMuted", autoplayRequiresMuted);

        adsRequest = new google.ima.AdsRequest();

        adsRequest.forceNonLinearFullSlot = false;
        adsRequest.setAdWillAutoPlay(autoplayAllowed);
        adsRequest.setAdWillPlayMuted(autoplayRequiresMuted);
        adsRequest.adTagUrl = adTagUrl;

        adsLoader.requestAds(adsRequest);
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
        }
    }

    that.isActive = function () {
        return spec.active;
    };
    that.started = function () {
        return spec.started;
    };
    that.play = function () {
        //provider.setState(STATE_LOADING);


        if (spec.started) {
            adsManager.resume();
        } else {
            var retryCount = 0;

            return new Promise(function (resolve, reject) {
                (function checkAdsManagerIsReady() {
                    retryCount++;
                    if (adsManagerLoaded) {
                        //elVideo.load();

                        if (!autoplayAllowed) {
                            autoplayAllowed = true;
                            return reject(new Error(AUTOPLAY_NOT_ALLOWED));
                        } else {
                            adDisplayContainer.initialize();
                            adsManager.start();
                            spec.started = true;

                            return resolve();
                        }
                    } else {
                        if (retryCount < 100) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Fkcy9BZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9hZHMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci91dGlscy5qcyJdLCJuYW1lcyI6WyJBZHMiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsIkFVVE9QTEFZX05PVF9BTExPV0VEIiwiQURNQU5HRVJfTE9BRElOR19FUlJPUiIsIkFEU19NQU5BR0VSX0xPQURFRCIsImdvb2dsZSIsImltYSIsIkFkc01hbmFnZXJMb2FkZWRFdmVudCIsIlR5cGUiLCJBRF9FUlJPUiIsIkFkRXJyb3JFdmVudCIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJhdXRvcGxheUFsbG93ZWQiLCJhdXRvcGxheVJlcXVpcmVzTXV0ZWQiLCJzZXR0aW5ncyIsInNldExvY2FsZSIsInNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyIsImFkRGlzcGxheUNvbnRhaW5lciIsImFkc0xvYWRlciIsImFkc01hbmFnZXIiLCJsaXN0ZW5lciIsImFkc1JlcXVlc3QiLCJjcmVhdGVBZENvbnRhaW5lciIsImFkQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiZ2V0Q29udGFpbmVyIiwiYXBwZW5kIiwiT25BZEVycm9yIiwiYWRFcnJvckV2ZW50IiwiY29uc29sZSIsImxvZyIsImdldEVycm9yIiwiZ2V0VmFzdEVycm9yQ29kZSIsImdldE1lc3NhZ2UiLCJpbm5lckVycm9yIiwiZ2V0SW5uZXJFcnJvciIsImdldEVycm9yQ29kZSIsImRlc3Ryb3kiLCJwbGF5IiwiT25NYW5hZ2VyTG9hZGVkIiwiYWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiYWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJBZHNSZW5kZXJpbmdTZXR0aW5ncyIsInJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUiLCJnZXRBZHNNYW5hZ2VyIiwiaW5pdCIsIlZpZXdNb2RlIiwiTk9STUFMIiwib24iLCJDT05URU5UX1ZPTFVNRSIsImRhdGEiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJBZERpc3BsYXlDb250YWluZXIiLCJBZHNMb2FkZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiY2hlY2tBdXRvcGxheVN1cHBvcnQiLCJpbml0UmVxdWVzdCIsIk92ZW5QbGF5ZXJDb25zb2xlIiwiQWRzUmVxdWVzdCIsImZvcmNlTm9uTGluZWFyRnVsbFNsb3QiLCJzZXRBZFdpbGxBdXRvUGxheSIsInNldEFkV2lsbFBsYXlNdXRlZCIsInJlcXVlc3RBZHMiLCJwbGF5UHJvbWlzZSIsInVuZGVmaW5lZCIsInRoZW4iLCJwYXVzZSIsImlzQWN0aXZlIiwicmVzdW1lIiwicmV0cnlDb3VudCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSIsIkVycm9yIiwiaW5pdGlhbGl6ZSIsInN0YXJ0Iiwic2V0VGltZW91dCIsInZpZGVvRW5kZWRDYWxsYmFjayIsImNvbXBsZXRlQ29udGVudENhbGxiYWNrIiwiaXNBbGxBZENvbXBsZXRlIiwiaXNMaW5lYXJBZCIsImNvbnRlbnRDb21wbGV0ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCIkYWRzIiwiZmluZCIsInJlbW92ZSIsIm9mZiIsIkxpc3RlbmVyIiwiYWRzU3BlYyIsImxvd0xldmVsRXZlbnRzIiwiaW50ZXJ2YWxUaW1lciIsIkFEX0JVRkZFUklORyIsIkFkRXZlbnQiLCJDT05URU5UX1BBVVNFX1JFUVVFU1RFRCIsIkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCIsIkFMTF9BRFNfQ09NUExFVEVEIiwiQ0xJQ0siLCJTS0lQUEVEIiwiQ09NUExFVEUiLCJGSVJTVF9RVUFSVElMRSIsIkxPQURFRCIsIk1JRFBPSU5UIiwiUEFVU0VEIiwiUkVTVU1FRCIsIlNUQVJURUQiLCJVU0VSX0NMT1NFIiwiVEhJUkRfUVVBUlRJTEUiLCJpc0FsbEFkQ29tcGVsZXRlIiwiYWRDb21wbGV0ZUNhbGxiYWNrIiwiY3VycmVudEFkIiwiYWRFdmVudCIsInR5cGUiLCJzZXRTdGF0ZSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfTE9BRElORyIsInJlbWFpbmluZ1RpbWUiLCJnZXRSZW1haW5pbmdUaW1lIiwiYWQiLCJnZXRBZCIsInRyaWdnZXIiLCJTVEFURV9BRF9MT0FERUQiLCJyZW1haW5pbmciLCJpc0xpbmVhciIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX1BMQVlJTkciLCJhZE9iamVjdCIsImR1cmF0aW9uIiwiZ2V0RHVyYXRpb24iLCJza2lwVGltZU9mZnNldCIsImdldFNraXBUaW1lT2Zmc2V0IiwiQURfQ0hBTkdFRCIsInNldEludGVydmFsIiwiQURfVElNRSIsInBvc2l0aW9uIiwic2tpcHBhYmxlIiwiZ2V0QWRTa2lwcGFibGVTdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJTVEFURV9BRF9DT01QTEVURSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwic2V0QWRDb21wbGV0ZUNhbGxiYWNrIiwiX2FkQ29tcGxldGVDYWxsYmFjayIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJlbGVtZW50T3JNc2UiLCJfIiwiaXNFbGVtZW50IiwiZ2V0VmlkZW9FbGVtZW50IiwibWVkaWEiLCJzZXBhcmF0ZUxpdmUiLCJtc2UiLCJpc0R5bmFtaWMiLCJlcnJvclRyaWdnZXIiLCJlcnJvciIsIlNUQVRFX0VSUk9SIiwiRVJST1IiLCJwaWNrQ3VycmVudFNvdXJjZSIsInNvdXJjZXMiLCJjdXJyZW50U291cmNlIiwic291cmNlSW5kZXgiLCJNYXRoIiwibWF4IiwibGFiZWwiLCJpIiwibGVuZ3RoIiwiZ2V0U291cmNlTGFiZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBTkE7OztBQVVBLElBQU1BLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxPQUFULEVBQWtCQyxRQUFsQixFQUE0QkMsWUFBNUIsRUFBMENDLFFBQTFDLEVBQW1EO0FBQzNEOztBQUVBLFFBQU1DLHVCQUF1QixvQkFBN0I7QUFDQSxRQUFNQyx5QkFBeUIseUJBQS9COztBQUVBLFFBQU1DLHFCQUFxQkMsT0FBT0MsR0FBUCxDQUFXQyxxQkFBWCxDQUFpQ0MsSUFBakMsQ0FBc0NKLGtCQUFqRTtBQUNBLFFBQU1LLFdBQVdKLE9BQU9DLEdBQVAsQ0FBV0ksWUFBWCxDQUF3QkYsSUFBeEIsQ0FBNkJDLFFBQTlDOztBQUVBLFFBQUlFLE9BQU8sRUFBWDtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLE9BQU87QUFDUEMsaUJBQVMsS0FERjtBQUVQQyxnQkFBUyxLQUZGO0FBR1BDLHNCQUFlO0FBSFIsS0FBWDtBQUtBLFFBQUlDLHdCQUFKO0FBQUEsUUFBcUJDLDhCQUFyQjs7QUFHQWIsV0FBT0MsR0FBUCxDQUFXYSxRQUFYLENBQW9CQyxTQUFwQixDQUE4QixJQUE5QjtBQUNBZixXQUFPQyxHQUFQLENBQVdhLFFBQVgsQ0FBb0JFLG9DQUFwQixDQUF5RCxJQUF6RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQUlDLHFCQUFxQixJQUF6QjtBQUNBLFFBQUlDLFlBQVksSUFBaEI7QUFDQSxRQUFJQyxhQUFhLElBQWpCO0FBQ0EsUUFBSUMsV0FBVyxJQUFmO0FBQ0EsUUFBSUMsYUFBYSxJQUFqQjs7QUFFQSxRQUFNQyxvQkFBb0IsU0FBcEJBLGlCQUFvQixHQUFNO0FBQzVCLFlBQUlDLGNBQWNDLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7QUFDQUYsb0JBQVlHLFlBQVosQ0FBeUIsT0FBekIsRUFBa0MsU0FBbEM7QUFDQUgsb0JBQVlHLFlBQVosQ0FBeUIsSUFBekIsRUFBK0IsU0FBL0I7QUFDQS9CLHFCQUFhZ0MsWUFBYixHQUE0QkMsTUFBNUIsQ0FBbUNMLFdBQW5DOztBQUVBLGVBQU9BLFdBQVA7QUFDSCxLQVBEO0FBUUEsUUFBTU0sWUFBWSxTQUFaQSxTQUFZLENBQVNDLFlBQVQsRUFBc0I7QUFDcEM7O0FBRUE7O0FBRUFDLGdCQUFRQyxHQUFSLENBQVlGLGFBQWFHLFFBQWIsR0FBd0JDLGdCQUF4QixFQUFaLEVBQXdESixhQUFhRyxRQUFiLEdBQXdCRSxVQUF4QixFQUF4RDs7QUFFQSxZQUFJQyxhQUFhTixhQUFhRyxRQUFiLEdBQXdCSSxhQUF4QixFQUFqQjtBQUNBLFlBQUdELFVBQUgsRUFBYztBQUNWTCxvQkFBUUMsR0FBUixDQUFZSSxXQUFXRSxZQUFYLEVBQVosRUFBdUNGLFdBQVdELFVBQVgsRUFBdkM7QUFDSDs7QUFFRCxZQUFJaEIsVUFBSixFQUFnQjtBQUNaQSx1QkFBV29CLE9BQVg7QUFDSDtBQUNEL0IsYUFBS0UsTUFBTCxHQUFjLEtBQWQ7QUFDQUYsYUFBS0MsT0FBTCxHQUFlLElBQWY7QUFDQWYsaUJBQVM4QyxJQUFUO0FBRUgsS0FuQkQ7QUFvQkEsUUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFTQyxxQkFBVCxFQUErQjtBQUNuRCxZQUFJQyx1QkFBdUIsSUFBSTNDLE9BQU9DLEdBQVAsQ0FBVzJDLG9CQUFmLEVBQTNCO0FBQ0FELDZCQUFxQkUsMkNBQXJCLEdBQW1FLElBQW5FO0FBQ0E7QUFDQTFCLHFCQUFhdUIsc0JBQXNCSSxhQUF0QixDQUFvQ3JELE9BQXBDLEVBQTZDa0Qsb0JBQTdDLENBQWI7QUFDQXhCLG1CQUFXNEIsSUFBWCxDQUFnQixNQUFoQixFQUF3QixNQUF4QixFQUFnQy9DLE9BQU9DLEdBQVAsQ0FBVytDLFFBQVgsQ0FBb0JDLE1BQXBEOztBQUVBN0IsbUJBQVcsMkJBQWtCRCxVQUFsQixFQUE4QnpCLFFBQTlCLEVBQXdDYyxJQUF4QyxFQUE4Q3FCLFNBQTlDLENBQVg7O0FBRUFuQyxpQkFBU3dELEVBQVQsQ0FBWUMseUJBQVosRUFBNEIsVUFBU0MsSUFBVCxFQUFlO0FBQ3ZDakMsdUJBQVdrQyxTQUFYLENBQXFCRCxLQUFLRSxNQUFMLEdBQVksR0FBakM7QUFDSCxTQUZELEVBRUdoRCxJQUZIOztBQUlBQywyQkFBbUIsSUFBbkI7QUFFSCxLQWZEOztBQWtCQVUseUJBQXFCLElBQUlqQixPQUFPQyxHQUFQLENBQVdzRCxrQkFBZixDQUFrQ2pDLG1CQUFsQyxFQUF1RDdCLE9BQXZELENBQXJCO0FBQ0F5QixnQkFBWSxJQUFJbEIsT0FBT0MsR0FBUCxDQUFXdUQsU0FBZixDQUF5QnZDLGtCQUF6QixDQUFaOztBQUVBQyxjQUFVdUMsZ0JBQVYsQ0FBMkIxRCxrQkFBM0IsRUFBK0MwQyxlQUEvQyxFQUFnRSxLQUFoRTtBQUNBdkIsY0FBVXVDLGdCQUFWLENBQTJCckQsUUFBM0IsRUFBcUN5QixTQUFyQyxFQUFnRCxLQUFoRDtBQUNBNkI7O0FBRUEsYUFBU0MsV0FBVCxHQUFzQjs7QUFFbEJDLDBCQUFrQjVCLEdBQWxCLENBQXNCLHFCQUF0QixFQUE2QyxpQkFBN0MsRUFBK0RwQixlQUEvRCxFQUFnRix1QkFBaEYsRUFBd0dDLHFCQUF4Rzs7QUFFQVEscUJBQWEsSUFBSXJCLE9BQU9DLEdBQVAsQ0FBVzRELFVBQWYsRUFBYjs7QUFFQXhDLG1CQUFXeUMsc0JBQVgsR0FBb0MsS0FBcEM7QUFDQXpDLG1CQUFXMEMsaUJBQVgsQ0FBNkJuRCxlQUE3QjtBQUNBUyxtQkFBVzJDLGtCQUFYLENBQThCbkQscUJBQTlCO0FBQ0FRLG1CQUFXekIsUUFBWCxHQUFzQkEsUUFBdEI7O0FBRUFzQixrQkFBVStDLFVBQVYsQ0FBcUI1QyxVQUFyQjtBQUNIOztBQUVELGFBQVNxQyxvQkFBVCxHQUFnQztBQUM1QixZQUFJUSxjQUFjekUsUUFBUStDLElBQVIsRUFBbEI7QUFDQSxZQUFJMEIsZ0JBQWdCQyxTQUFwQixFQUErQjtBQUMzQkQsd0JBQVlFLElBQVosQ0FBaUIsWUFBVTtBQUN2QjtBQUNBM0Usd0JBQVE0RSxLQUFSOztBQUVBekQsa0NBQWtCLElBQWxCO0FBQ0FDLHdDQUF3QixLQUF4Qjs7QUFFQThDO0FBRUgsYUFURCxXQVNTLFlBQVU7QUFDZmxFLHdCQUFRNEUsS0FBUjtBQUNBekQsa0NBQWtCLEtBQWxCO0FBQ0FDLHdDQUF3QixLQUF4QjtBQUNBOEM7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJILGFBckNEO0FBc0NIO0FBQ0o7O0FBRURyRCxTQUFLZ0UsUUFBTCxHQUFnQixZQUFNO0FBQ2xCLGVBQU85RCxLQUFLRSxNQUFaO0FBQ0gsS0FGRDtBQUdBSixTQUFLRyxPQUFMLEdBQWUsWUFBTTtBQUNqQixlQUFPRCxLQUFLQyxPQUFaO0FBQ0gsS0FGRDtBQUdBSCxTQUFLa0MsSUFBTCxHQUFZLFlBQU07QUFDZDs7O0FBR0EsWUFBR2hDLEtBQUtDLE9BQVIsRUFBZ0I7QUFDWlUsdUJBQVdvRCxNQUFYO0FBQ0gsU0FGRCxNQUVLO0FBQ0QsZ0JBQUlDLGFBQWEsQ0FBakI7O0FBRUEsbUJBQU8sSUFBSUMsT0FBSixDQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzFDLGlCQUFDLFNBQVNDLHNCQUFULEdBQWlDO0FBQzlCSjtBQUNBLHdCQUFHakUsZ0JBQUgsRUFBb0I7QUFDaEI7O0FBRUEsNEJBQUcsQ0FBQ0ssZUFBSixFQUFvQjtBQUNoQkEsOENBQWtCLElBQWxCO0FBQ0EsbUNBQU8rRCxPQUFPLElBQUlFLEtBQUosQ0FBVWhGLG9CQUFWLENBQVAsQ0FBUDtBQUNILHlCQUhELE1BR0s7QUFDRG9CLCtDQUFtQjZELFVBQW5CO0FBQ0EzRCx1Q0FBVzRELEtBQVg7QUFDQXZFLGlDQUFLQyxPQUFMLEdBQWUsSUFBZjs7QUFFQSxtQ0FBT2lFLFNBQVA7QUFDSDtBQUdKLHFCQWZELE1BZUs7QUFDRCw0QkFBR0YsYUFBYSxHQUFoQixFQUFvQjtBQUNoQlEsdUNBQVdKLHNCQUFYLEVBQW1DLEdBQW5DO0FBQ0gseUJBRkQsTUFFSztBQUNELG1DQUFPRCxPQUFPLElBQUlFLEtBQUosQ0FBVS9FLHNCQUFWLENBQVAsQ0FBUDtBQUNIO0FBQ0o7QUFFSixpQkF6QkQ7QUEwQkgsYUEzQk0sQ0FBUDtBQThCSDtBQUNKLEtBeENEO0FBeUNBUSxTQUFLK0QsS0FBTCxHQUFhLFlBQU07QUFDZmxELG1CQUFXa0QsS0FBWDtBQUNILEtBRkQ7QUFHQS9ELFNBQUsyRSxrQkFBTCxHQUEwQixVQUFDQyx1QkFBRCxFQUE2QjtBQUNuRDtBQUNBLFlBQUc5RCxTQUFTK0QsZUFBVCxNQUE4QixDQUFDL0QsU0FBU2dFLFVBQVQsRUFBbEMsRUFBd0Q7QUFDcERGO0FBQ0gsU0FGRCxNQUVLO0FBQ0Q7QUFDQTFFLGlCQUFLRyxZQUFMLEdBQW9CLElBQXBCO0FBQ0FPLHNCQUFVbUUsZUFBVjtBQUNIO0FBQ0osS0FURDs7QUFXQS9FLFNBQUtpQyxPQUFMLEdBQWUsWUFBTTtBQUNqQixZQUFHcEIsVUFBSCxFQUFjO0FBQ1ZBLHVCQUFXb0IsT0FBWDtBQUNIO0FBQ0QsWUFBR3RCLGtCQUFILEVBQXNCO0FBQ2xCQSwrQkFBbUJzQixPQUFuQjtBQUNIO0FBQ0QsWUFBR25CLFFBQUgsRUFBWTtBQUNSQSxxQkFBU21CLE9BQVQ7QUFDSDtBQUNELFlBQUdyQixTQUFILEVBQWE7QUFDVEEsc0JBQVVvRSxtQkFBVixDQUE4QnZGLGtCQUE5QixFQUFrRDBDLGVBQWxEO0FBQ0F2QixzQkFBVW9FLG1CQUFWLENBQThCbEYsUUFBOUIsRUFBd0N5QixTQUF4QztBQUNIOztBQUVELFlBQUkwRCxPQUFPLHlCQUFJNUYsYUFBYWdDLFlBQWIsRUFBSixFQUFpQzZELElBQWpDLENBQXNDLFVBQXRDLENBQVg7QUFDQSxZQUFHRCxJQUFILEVBQVE7QUFDSkEsaUJBQUtFLE1BQUw7QUFDSDtBQUNEL0YsaUJBQVNnRyxHQUFULENBQWF2Qyx5QkFBYixFQUE2QixJQUE3QixFQUFtQzdDLElBQW5DO0FBR0gsS0F0QkQ7O0FBeUJBLFdBQU9BLElBQVA7QUFDSCxDQXRPRDs7cUJBeU9lZCxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoUGY7Ozs7QUFDQTs7OztBQUpBOzs7QUF1Q0EsSUFBTW1HLFdBQVcsU0FBWEEsUUFBVyxDQUFTeEUsVUFBVCxFQUFxQnpCLFFBQXJCLEVBQStCa0csT0FBL0IsRUFBd0MvRCxTQUF4QyxFQUFrRDtBQUMvRCxRQUFJdkIsT0FBTyxFQUFYO0FBQ0EsUUFBSXVGLGlCQUFpQixFQUFyQjs7QUFFQSxRQUFJQyxnQkFBZ0IsSUFBcEI7O0FBRUEsUUFBTUMsZUFBZS9GLE9BQU9DLEdBQVAsQ0FBVytGLE9BQVgsQ0FBbUI3RixJQUFuQixDQUF3QjRGLFlBQTdDO0FBQ0EsUUFBTUUsMEJBQTBCakcsT0FBT0MsR0FBUCxDQUFXK0YsT0FBWCxDQUFtQjdGLElBQW5CLENBQXdCOEYsdUJBQXhEO0FBQ0EsUUFBTUMsMkJBQTJCbEcsT0FBT0MsR0FBUCxDQUFXK0YsT0FBWCxDQUFtQjdGLElBQW5CLENBQXdCK0Ysd0JBQXpEO0FBQ0EsUUFBTTlGLFdBQVdKLE9BQU9DLEdBQVAsQ0FBV0ksWUFBWCxDQUF3QkYsSUFBeEIsQ0FBNkJDLFFBQTlDO0FBQ0EsUUFBTStGLG9CQUFvQm5HLE9BQU9DLEdBQVAsQ0FBVytGLE9BQVgsQ0FBbUI3RixJQUFuQixDQUF3QmdHLGlCQUFsRDtBQUNBLFFBQU1DLFFBQVFwRyxPQUFPQyxHQUFQLENBQVcrRixPQUFYLENBQW1CN0YsSUFBbkIsQ0FBd0JpRyxLQUF0QztBQUNBLFFBQU1DLFVBQVVyRyxPQUFPQyxHQUFQLENBQVcrRixPQUFYLENBQW1CN0YsSUFBbkIsQ0FBd0JrRyxPQUF4QztBQUNBLFFBQU1DLFdBQVd0RyxPQUFPQyxHQUFQLENBQVcrRixPQUFYLENBQW1CN0YsSUFBbkIsQ0FBd0JtRyxRQUF6QztBQUNBLFFBQU1DLGlCQUFnQnZHLE9BQU9DLEdBQVAsQ0FBVytGLE9BQVgsQ0FBbUI3RixJQUFuQixDQUF3Qm9HLGNBQTlDO0FBQ0EsUUFBTUMsU0FBU3hHLE9BQU9DLEdBQVAsQ0FBVytGLE9BQVgsQ0FBbUI3RixJQUFuQixDQUF3QnFHLE1BQXZDO0FBQ0EsUUFBTUMsV0FBVXpHLE9BQU9DLEdBQVAsQ0FBVytGLE9BQVgsQ0FBbUI3RixJQUFuQixDQUF3QnNHLFFBQXhDO0FBQ0EsUUFBTUMsU0FBUzFHLE9BQU9DLEdBQVAsQ0FBVytGLE9BQVgsQ0FBbUI3RixJQUFuQixDQUF3QnVHLE1BQXZDO0FBQ0EsUUFBTUMsVUFBVTNHLE9BQU9DLEdBQVAsQ0FBVytGLE9BQVgsQ0FBbUI3RixJQUFuQixDQUF3QndHLE9BQXhDO0FBQ0EsUUFBTUMsVUFBVTVHLE9BQU9DLEdBQVAsQ0FBVytGLE9BQVgsQ0FBbUI3RixJQUFuQixDQUF3QnlHLE9BQXhDO0FBQ0EsUUFBTUMsYUFBYTdHLE9BQU9DLEdBQVAsQ0FBVytGLE9BQVgsQ0FBbUI3RixJQUFuQixDQUF3QjBHLFVBQTNDO0FBQ0EsUUFBTUMsaUJBQWlCOUcsT0FBT0MsR0FBUCxDQUFXK0YsT0FBWCxDQUFtQjdGLElBQW5CLENBQXdCMkcsY0FBL0M7O0FBRUEsUUFBSUMsbUJBQW1CLEtBQXZCLENBdkIrRCxDQXVCL0I7QUFDaEMsUUFBSUMscUJBQXFCLElBQXpCO0FBQ0EsUUFBSUMsWUFBWSxJQUFoQjs7QUFFQTtBQUNBcEIsbUJBQWVJLHVCQUFmLElBQTBDLFVBQUNpQixPQUFELEVBQWE7QUFDbkR0RCwwQkFBa0I1QixHQUFsQixDQUFzQmtGLFFBQVFDLElBQTlCO0FBQ0F2QixnQkFBUWxGLE1BQVIsR0FBaUIsSUFBakI7QUFDQWhCLGlCQUFTMkUsS0FBVDtBQUNILEtBSkQ7O0FBTUE7QUFDQXdCLG1CQUFlSyx3QkFBZixJQUEyQyxVQUFDZ0IsT0FBRCxFQUFhO0FBQ3BEdEQsMEJBQWtCNUIsR0FBbEIsQ0FBc0JrRixRQUFRQyxJQUE5QjtBQUNBO0FBQ0F2QixnQkFBUWxGLE1BQVIsR0FBaUIsS0FBakI7QUFDQSxZQUFHLENBQUNrRixRQUFRakYsWUFBWixFQUF5QjtBQUNyQmpCLHFCQUFTOEMsSUFBVDtBQUNIO0FBRUosS0FSRDtBQVNBcUQsbUJBQWV6RixRQUFmLElBQTJCeUIsU0FBM0I7O0FBRUFnRSxtQkFBZU0saUJBQWYsSUFBb0MsVUFBQ2UsT0FBRCxFQUFhO0FBQzdDdEQsMEJBQWtCNUIsR0FBbEIsQ0FBc0JrRixRQUFRQyxJQUE5QjtBQUNBSiwyQkFBbUIsSUFBbkI7QUFDQSxZQUFHbkIsUUFBUWpGLFlBQVgsRUFBd0I7QUFDcEJqQixxQkFBUzBILFFBQVQsQ0FBa0JDLHlCQUFsQjtBQUNIO0FBQ0osS0FORDtBQU9BeEIsbUJBQWVPLEtBQWYsSUFBd0IsVUFBQ2MsT0FBRCxFQUFhO0FBQ2pDdEQsMEJBQWtCNUIsR0FBbEIsQ0FBc0JrRixRQUFRQyxJQUE5QjtBQUNILEtBRkQ7QUFHQXRCLG1CQUFlVSxjQUFmLElBQWlDLFVBQUNXLE9BQUQsRUFBYTtBQUMxQ3RELDBCQUFrQjVCLEdBQWxCLENBQXNCa0YsUUFBUUMsSUFBOUI7QUFDSCxLQUZEO0FBR0E7QUFDQXRCLG1CQUFlRSxZQUFmLElBQStCLFVBQUNtQixPQUFELEVBQWE7QUFDeEN0RCwwQkFBa0I1QixHQUFsQixDQUFzQixjQUF0QixFQUFxQ2tGLFFBQVFDLElBQTdDO0FBQ0F6SCxpQkFBUzBILFFBQVQsQ0FBa0JFLHdCQUFsQjtBQUNILEtBSEQ7QUFJQXpCLG1CQUFlVyxNQUFmLElBQXlCLFVBQUNVLE9BQUQsRUFBYTtBQUNsQ3RELDBCQUFrQjVCLEdBQWxCLENBQXNCa0YsUUFBUUMsSUFBOUI7QUFDQSxZQUFJSSxnQkFBZ0JwRyxXQUFXcUcsZ0JBQVgsRUFBcEI7QUFDQSxZQUFJQyxLQUFLUCxRQUFRUSxLQUFSLEVBQVQ7QUFDQTs7Ozs7QUFLQWhJLGlCQUFTaUksT0FBVCxDQUFpQkMsMEJBQWpCLEVBQWtDLEVBQUNDLFdBQVlOLGFBQWIsRUFBNEJPLFVBQVdMLEdBQUdLLFFBQUgsRUFBdkMsRUFBbEM7QUFFSCxLQVhEO0FBWUFqQyxtQkFBZVksUUFBZixJQUEyQixVQUFDUyxPQUFELEVBQWE7QUFDcEN0RCwwQkFBa0I1QixHQUFsQixDQUFzQmtGLFFBQVFDLElBQTlCO0FBQ0gsS0FGRDtBQUdBdEIsbUJBQWVhLE1BQWYsSUFBeUIsVUFBQ1EsT0FBRCxFQUFhO0FBQ2xDdEQsMEJBQWtCNUIsR0FBbEIsQ0FBc0JrRixRQUFRQyxJQUE5QjtBQUNBekgsaUJBQVMwSCxRQUFULENBQWtCVywwQkFBbEI7QUFDSCxLQUhEO0FBSUFsQyxtQkFBZWMsT0FBZixJQUEwQixVQUFDTyxPQUFELEVBQWE7QUFDbkN0RCwwQkFBa0I1QixHQUFsQixDQUFzQmtGLFFBQVFDLElBQTlCO0FBQ0F6SCxpQkFBUzBILFFBQVQsQ0FBa0JZLDJCQUFsQjtBQUNILEtBSEQ7O0FBTUFuQyxtQkFBZWUsT0FBZixJQUEwQixVQUFDTSxPQUFELEVBQWE7QUFDbkN0RCwwQkFBa0I1QixHQUFsQixDQUFzQmtGLFFBQVFDLElBQTlCO0FBQ0EsWUFBSU0sS0FBS1AsUUFBUVEsS0FBUixFQUFUO0FBQ0FULG9CQUFZUSxFQUFaOztBQUVBLFlBQUlRLFdBQVc7QUFDWEgsc0JBQVdMLEdBQUdLLFFBQUgsRUFEQTtBQUVYSSxzQkFBV1QsR0FBR1UsV0FBSCxFQUZBO0FBR1hDLDRCQUFpQlgsR0FBR1ksaUJBQUgsRUFITixDQUdpQztBQUhqQyxTQUFmO0FBS0EzSSxpQkFBU2lJLE9BQVQsQ0FBaUJXLHFCQUFqQixFQUE2QkwsUUFBN0I7O0FBR0EsWUFBSVIsR0FBR0ssUUFBSCxFQUFKLEVBQW1COztBQUVmcEkscUJBQVMwSCxRQUFULENBQWtCWSwyQkFBbEI7QUFDQXBDLG9CQUFRbkYsT0FBUixHQUFrQixJQUFsQjtBQUNBO0FBQ0E7QUFDQXFGLDRCQUFnQnlDLFlBQ1osWUFBVztBQUNQLG9CQUFJaEIsZ0JBQWdCcEcsV0FBV3FHLGdCQUFYLEVBQXBCO0FBQ0Esb0JBQUlVLFdBQVdULEdBQUdVLFdBQUgsRUFBZjs7QUFFQXpJLHlCQUFTaUksT0FBVCxDQUFpQmEsa0JBQWpCLEVBQTBCO0FBQ3RCTiw4QkFBV0EsUUFEVztBQUV0QkUsb0NBQWlCWCxHQUFHWSxpQkFBSCxFQUZLO0FBR3RCUiwrQkFBWU4sYUFIVTtBQUl0QmtCLDhCQUFXUCxXQUFXWCxhQUpBO0FBS3RCbUIsK0JBQVl2SCxXQUFXd0gsbUJBQVg7QUFMVSxpQkFBMUI7QUFPSCxhQVpXLEVBYVosR0FiWSxDQUFoQixDQU5lLENBbUJMO0FBQ2IsU0FwQkQsTUFvQks7QUFDRGpKLHFCQUFTOEMsSUFBVDtBQUNIO0FBQ0osS0FwQ0Q7QUFxQ0FxRCxtQkFBZVMsUUFBZixJQUEyQixVQUFDWSxPQUFELEVBQWE7QUFDcEN0RCwwQkFBa0I1QixHQUFsQixDQUFzQmtGLFFBQVFDLElBQTlCOztBQUVBLFlBQUlNLEtBQUtQLFFBQVFRLEtBQVIsRUFBVDtBQUNBLFlBQUlELEdBQUdLLFFBQUgsRUFBSixFQUFtQjtBQUNmYywwQkFBYzlDLGFBQWQ7QUFDSDtBQUNEcEcsaUJBQVNpSSxPQUFULENBQWlCa0IsNEJBQWpCO0FBQ0gsS0FSRDtBQVNBO0FBQ0FoRCxtQkFBZVEsT0FBZixJQUEwQixVQUFDYSxPQUFELEVBQWE7QUFDbkN0RCwwQkFBa0I1QixHQUFsQixDQUFzQmtGLFFBQVFDLElBQTlCOztBQUVBLFlBQUlNLEtBQUtQLFFBQVFRLEtBQVIsRUFBVDtBQUNBLFlBQUlELEdBQUdLLFFBQUgsRUFBSixFQUFtQjtBQUNmYywwQkFBYzlDLGFBQWQ7QUFDSDtBQUNEcEcsaUJBQVNpSSxPQUFULENBQWlCa0IsNEJBQWpCO0FBQ0gsS0FSRDtBQVNBaEQsbUJBQWVnQixVQUFmLElBQTZCLFVBQUNLLE9BQUQsRUFBYTtBQUN0Q3RELDBCQUFrQjVCLEdBQWxCLENBQXNCa0YsUUFBUUMsSUFBOUI7O0FBRUEsWUFBSU0sS0FBS1AsUUFBUVEsS0FBUixFQUFUO0FBQ0EsWUFBSUQsR0FBR0ssUUFBSCxFQUFKLEVBQW1CO0FBQ2ZjLDBCQUFjOUMsYUFBZDtBQUNIO0FBQ0RwRyxpQkFBU2lJLE9BQVQsQ0FBaUJrQiw0QkFBakI7QUFDSCxLQVJEO0FBU0FoRCxtQkFBZWlCLGNBQWYsSUFBaUMsVUFBQ0ksT0FBRCxFQUFhO0FBQzFDdEQsMEJBQWtCNUIsR0FBbEIsQ0FBc0JrRixRQUFRQyxJQUE5QjtBQUNILEtBRkQ7O0FBS0EyQixXQUFPQyxJQUFQLENBQVlsRCxjQUFaLEVBQTRCbUQsT0FBNUIsQ0FBb0MscUJBQWE7QUFDN0M3SCxtQkFBV21FLG1CQUFYLENBQStCMkQsU0FBL0IsRUFBMENwRCxlQUFlb0QsU0FBZixDQUExQztBQUNBOUgsbUJBQVdzQyxnQkFBWCxDQUE0QndGLFNBQTVCLEVBQXVDcEQsZUFBZW9ELFNBQWYsQ0FBdkM7QUFDSCxLQUhEO0FBSUEzSSxTQUFLNEkscUJBQUwsR0FBNkIsVUFBQ0MsbUJBQUQsRUFBeUI7QUFDbERuQyw2QkFBcUJtQyxtQkFBckI7QUFDSCxLQUZEO0FBR0E3SSxTQUFLNkUsZUFBTCxHQUF1QixZQUFNO0FBQ3pCLGVBQU80QixnQkFBUDtBQUNILEtBRkQ7QUFHQXpHLFNBQUs4RSxVQUFMLEdBQWtCLFlBQU07QUFDcEIsZUFBTzZCLFlBQWFBLFVBQVVhLFFBQVYsRUFBYixHQUFvQyxJQUEzQztBQUNILEtBRkQ7QUFHQXhILFNBQUtpQyxPQUFMLEdBQWUsWUFBSztBQUNoQnFCLDBCQUFrQjVCLEdBQWxCLENBQXNCLDhCQUF0QjtBQUNBdEMsaUJBQVNpSSxPQUFULENBQWlCa0IsNEJBQWpCO0FBQ0FDLGVBQU9DLElBQVAsQ0FBWWxELGNBQVosRUFBNEJtRCxPQUE1QixDQUFvQyxxQkFBYTtBQUM3QzdILHVCQUFXbUUsbUJBQVgsQ0FBK0IyRCxTQUEvQixFQUEwQ3BELGVBQWVvRCxTQUFmLENBQTFDO0FBQ0gsU0FGRDtBQUdILEtBTkQ7QUFPQSxXQUFPM0ksSUFBUDtBQUVILENBckxEOztxQkF1TGVxRixROzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM05mOztBQUNBOzs7Ozs7QUFKQTs7O0FBTU8sSUFBTXlELG9EQUFzQixTQUF0QkEsbUJBQXNCLENBQVNDLFlBQVQsRUFBdUI7QUFDdEQsUUFBR0Msd0JBQUVDLFNBQUYsQ0FBWUYsWUFBWixDQUFILEVBQTZCO0FBQ3pCLGVBQU9BLFlBQVA7QUFDSDtBQUNELFFBQUdBLGFBQWFHLGVBQWhCLEVBQWdDO0FBQzVCLGVBQU9ILGFBQWFHLGVBQWIsRUFBUDtBQUNILEtBRkQsTUFFTSxJQUFHSCxhQUFhSSxLQUFoQixFQUFzQjtBQUN4QixlQUFPSixhQUFhSSxLQUFwQjtBQUNIO0FBQ0QsV0FBTyxJQUFQO0FBQ0gsQ0FWTTs7QUFZQSxJQUFNQyxzQ0FBZSxTQUFmQSxZQUFlLENBQVNDLEdBQVQsRUFBYztBQUN0Qzs7QUFFQSxRQUFHQSxPQUFPQSxJQUFJQyxTQUFkLEVBQXdCO0FBQ3BCLGVBQU9ELElBQUlDLFNBQUosRUFBUDtBQUNILEtBRkQsTUFFSztBQUNELGVBQU8sS0FBUDtBQUNIO0FBQ0osQ0FSTTs7QUFVQSxJQUFNQyxzQ0FBZSxTQUFmQSxZQUFlLENBQVNDLEtBQVQsRUFBZ0JwSyxRQUFoQixFQUF5QjtBQUNqRCxRQUFHQSxRQUFILEVBQVk7QUFDUkEsaUJBQVMwSCxRQUFULENBQWtCMkMsc0JBQWxCO0FBQ0FySyxpQkFBUzJFLEtBQVQ7QUFDQTNFLGlCQUFTaUksT0FBVCxDQUFpQnFDLGdCQUFqQixFQUF3QkYsS0FBeEI7QUFDSDtBQUVKLENBUE07O0FBU0EsSUFBTUcsZ0RBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsT0FBRCxFQUFVQyxhQUFWLEVBQXlCeEssWUFBekIsRUFBMEM7QUFDdkUsUUFBSXlLLGNBQWNDLEtBQUtDLEdBQUwsQ0FBUyxDQUFULEVBQVlILGFBQVosQ0FBbEI7QUFDQSxRQUFNSSxRQUFPLEVBQWI7QUFDQSxRQUFJTCxPQUFKLEVBQWE7QUFDVCxhQUFLLElBQUlNLElBQUksQ0FBYixFQUFnQkEsSUFBSU4sUUFBUU8sTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLGdCQUFJTixRQUFRTSxDQUFSLFlBQUosRUFBd0I7QUFDcEJKLDhCQUFjSSxDQUFkO0FBQ0g7QUFDRCxnQkFBSTdLLGFBQWErSyxjQUFiLE1BQWlDUixRQUFRTSxDQUFSLEVBQVdELEtBQVgsS0FBcUI1SyxhQUFhK0ssY0FBYixFQUExRCxFQUEwRjtBQUN0Rix1QkFBT0YsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU9KLFdBQVA7QUFDSCxDQWRNLEMiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX4yZWMxOTNhYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDA4LzA0LzIwMTkuXG4gKi9cbmltcG9ydCBBZHNFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2Fkcy9MaXN0ZW5lclwiO1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUlMsIENPTlRFTlRfVk9MVU1FLCBTVEFURV9MT0FESU5HXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IEFkcyA9IGZ1bmN0aW9uKGVsVmlkZW8sIHByb3ZpZGVyLCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcbiAgICAvL1RvZG8gOiBtb3ZlIGNyZWF0ZUFkQ29udGFpbmVyIHRvIE1lZGlhTWFuYWdlclxuXG4gICAgY29uc3QgQVVUT1BMQVlfTk9UX0FMTE9XRUQgPSBcImF1dG9wbGF5Tm90QWxsb3dlZFwiO1xuICAgIGNvbnN0IEFETUFOR0VSX0xPQURJTkdfRVJST1IgPSBcImFkbWFuYWdlckxvYWRpbmdUaW1lb3V0XCI7XG5cbiAgICBjb25zdCBBRFNfTUFOQUdFUl9MT0FERUQgPSBnb29nbGUuaW1hLkFkc01hbmFnZXJMb2FkZWRFdmVudC5UeXBlLkFEU19NQU5BR0VSX0xPQURFRDtcbiAgICBjb25zdCBBRF9FUlJPUiA9IGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1I7XG5cbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBhZHNNYW5hZ2VyTG9hZGVkID0gZmFsc2U7XG4gICAgbGV0IHNwZWMgPSB7XG4gICAgICAgIHN0YXJ0ZWQ6IGZhbHNlLFxuICAgICAgICBhY3RpdmUgOiBmYWxzZSxcbiAgICAgICAgaXNWaWRlb0VuZGVkIDogZmFsc2VcbiAgICB9O1xuICAgIGxldCBhdXRvcGxheUFsbG93ZWQsIGF1dG9wbGF5UmVxdWlyZXNNdXRlZDtcblxuXG4gICAgZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUoXCJrb1wiKTtcbiAgICBnb29nbGUuaW1hLnNldHRpbmdzLnNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyh0cnVlKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuXG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldExvY2FsZSgna28nKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXModHJ1ZSk7XG4gICAgbGV0IGFkRGlzcGxheUNvbnRhaW5lciA9IG51bGw7XG4gICAgbGV0IGFkc0xvYWRlciA9IG51bGw7XG4gICAgbGV0IGFkc01hbmFnZXIgPSBudWxsO1xuICAgIGxldCBsaXN0ZW5lciA9IG51bGw7XG4gICAgbGV0IGFkc1JlcXVlc3QgPSBudWxsO1xuXG4gICAgY29uc3QgY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ292cC1hZHMnKTtcbiAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdvdnAtYWRzJyk7XG4gICAgICAgIHBsYXllckNvbmZpZy5nZXRDb250YWluZXIoKS5hcHBlbmQoYWRDb250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcbiAgICB9O1xuICAgIGNvbnN0IE9uQWRFcnJvciA9IGZ1bmN0aW9uKGFkRXJyb3JFdmVudCl7XG4gICAgICAgIC8vbm90ZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldElubmVyRXJyb3IoKS5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSAmIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSA9PT0gNDAwIGlzIEJyb3dzZXIgVXNlciBJbnRlcmFjdGl2ZSBlcnJvci5cblxuICAgICAgICAvL0RvIG5vdCB0cmlnZ2VyaW5nIEVSUk9SLiBiZWN1YXNlIEl0IGp1c3QgQUQhXG5cbiAgICAgICAgY29uc29sZS5sb2coYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpLCBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRNZXNzYWdlKCkpO1xuXG4gICAgICAgIGxldCBpbm5lckVycm9yID0gYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpO1xuICAgICAgICBpZihpbm5lckVycm9yKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlubmVyRXJyb3IuZ2V0RXJyb3JDb2RlKCksIGlubmVyRXJyb3IuZ2V0TWVzc2FnZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhZHNNYW5hZ2VyKSB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBzcGVjLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBwcm92aWRlci5wbGF5KCk7XG5cbiAgICB9O1xuICAgIGNvbnN0IE9uTWFuYWdlckxvYWRlZCA9IGZ1bmN0aW9uKGFkc01hbmFnZXJMb2FkZWRFdmVudCl7XG4gICAgICAgIGxldCBhZHNSZW5kZXJpbmdTZXR0aW5ncyA9IG5ldyBnb29nbGUuaW1hLkFkc1JlbmRlcmluZ1NldHRpbmdzKCk7XG4gICAgICAgIGFkc1JlbmRlcmluZ1NldHRpbmdzLnJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAvL2Fkc1JlbmRlcmluZ1NldHRpbmdzLnVzZVN0eWxlZE5vbkxpbmVhckFkcyA9IHRydWU7XG4gICAgICAgIGFkc01hbmFnZXIgPSBhZHNNYW5hZ2VyTG9hZGVkRXZlbnQuZ2V0QWRzTWFuYWdlcihlbFZpZGVvLCBhZHNSZW5kZXJpbmdTZXR0aW5ncyk7XG4gICAgICAgIGFkc01hbmFnZXIuaW5pdChcIjEwMCVcIiwgXCIxMDAlXCIsIGdvb2dsZS5pbWEuVmlld01vZGUuTk9STUFMKTtcblxuICAgICAgICBsaXN0ZW5lciA9IEFkc0V2ZW50c0xpc3RlbmVyKGFkc01hbmFnZXIsIHByb3ZpZGVyLCBzcGVjLCBPbkFkRXJyb3IpO1xuXG4gICAgICAgIHByb3ZpZGVyLm9uKENPTlRFTlRfVk9MVU1FLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnNldFZvbHVtZShkYXRhLnZvbHVtZS8xMDApO1xuICAgICAgICB9LCB0aGF0KTtcblxuICAgICAgICBhZHNNYW5hZ2VyTG9hZGVkID0gdHJ1ZTtcblxuICAgIH07XG5cblxuICAgIGFkRGlzcGxheUNvbnRhaW5lciA9IG5ldyBnb29nbGUuaW1hLkFkRGlzcGxheUNvbnRhaW5lcihjcmVhdGVBZENvbnRhaW5lcigpLCBlbFZpZGVvKTtcbiAgICBhZHNMb2FkZXIgPSBuZXcgZ29vZ2xlLmltYS5BZHNMb2FkZXIoYWREaXNwbGF5Q29udGFpbmVyKTtcblxuICAgIGFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKEFEU19NQU5BR0VSX0xPQURFRCwgT25NYW5hZ2VyTG9hZGVkLCBmYWxzZSk7XG4gICAgYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQURfRVJST1IsIE9uQWRFcnJvciwgZmFsc2UpO1xuICAgIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCk7XG5cbiAgICBmdW5jdGlvbiBpbml0UmVxdWVzdCgpe1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkF1dG9QbGF5IFN1cHBvcnQgOiBcIiwgXCJhdXRvcGxheUFsbG93ZWRcIixhdXRvcGxheUFsbG93ZWQsIFwiYXV0b3BsYXlSZXF1aXJlc011dGVkXCIsYXV0b3BsYXlSZXF1aXJlc011dGVkKTtcblxuICAgICAgICBhZHNSZXF1ZXN0ID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVxdWVzdCgpO1xuXG4gICAgICAgIGFkc1JlcXVlc3QuZm9yY2VOb25MaW5lYXJGdWxsU2xvdCA9IGZhbHNlO1xuICAgICAgICBhZHNSZXF1ZXN0LnNldEFkV2lsbEF1dG9QbGF5KGF1dG9wbGF5QWxsb3dlZCk7XG4gICAgICAgIGFkc1JlcXVlc3Quc2V0QWRXaWxsUGxheU11dGVkKGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XG4gICAgICAgIGFkc1JlcXVlc3QuYWRUYWdVcmwgPSBhZFRhZ1VybDtcblxuICAgICAgICBhZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0F1dG9wbGF5U3VwcG9ydCgpIHtcbiAgICAgICAgdmFyIHBsYXlQcm9taXNlID0gZWxWaWRlby5wbGF5KCk7XG4gICAgICAgIGlmIChwbGF5UHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwbGF5UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCB1bm11dGVkIGF1dG9wbGF5IHdvcmtzLlxuICAgICAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcblxuICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuXG5cbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIC8vY2hlY2sgbXV0ZWQgYXV0byBzdGFydC5cbiAgICAgICAgICAgICAgICAvL0kgZG9uJ3QgbmVlZCBmb3IgdGhpcyB2ZXJzaW9uLlxuICAgICAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBwbGF5UHJvbWlzZSA9IGVsVmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgIGlmIChwbGF5UHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCBtdXRlZCBhdXRvcGxheSB3b3JrcyBidXQgdW5tdXRlZCBhdXRvcGxheSBkb2VzIG5vdC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBtdXRlZCBhbmQgdW5tdXRlZCBhdXRvcGxheSBmYWlsZWQuIEZhbGwgYmFjayB0byBjbGljayB0byBwbGF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0qL1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoYXQuaXNBY3RpdmUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmFjdGl2ZTtcbiAgICB9O1xuICAgIHRoYXQuc3RhcnRlZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhcnRlZDtcbiAgICB9O1xuICAgIHRoYXQucGxheSA9ICgpID0+IHtcbiAgICAgICAgLy9wcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcblxuXG4gICAgICAgIGlmKHNwZWMuc3RhcnRlZCl7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLnJlc3VtZSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSgpe1xuICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgICAgICBpZihhZHNNYW5hZ2VyTG9hZGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxWaWRlby5sb2FkKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFhdXRvcGxheUFsbG93ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoQVVUT1BMQVlfTk9UX0FMTE9XRUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkRGlzcGxheUNvbnRhaW5lci5pbml0aWFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMuc3RhcnRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMTAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrQWRzTWFuYWdlcklzUmVhZHksIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihBRE1BTkdFUl9MT0FESU5HX0VSUk9SKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIGFkc01hbmFnZXIucGF1c2UoKTtcbiAgICB9O1xuICAgIHRoYXQudmlkZW9FbmRlZENhbGxiYWNrID0gKGNvbXBsZXRlQ29udGVudENhbGxiYWNrKSA9PiB7XG4gICAgICAgIC8vbGlzdGVuZXIuaXNMaW5lYXJBZCA6IGdldCBjdXJyZW50IGFkJ3Mgc3RhdHVzIHdoZXRoZXIgbGluZWFyIGFkIG9yIG5vdC5cbiAgICAgICAgaWYobGlzdGVuZXIuaXNBbGxBZENvbXBsZXRlKCkgfHwgIWxpc3RlbmVyLmlzTGluZWFyQWQoKSl7XG4gICAgICAgICAgICBjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaygpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vUG9zdCAtIFJvbGwg7J2EIOyerOyDne2VmOq4sCDsnITtlbTshJzripQg7L2Y7YWQ7Lig6rCAIOuBneuCrOydjOydhCBhZHNMb2FkZXLsl5Dqsowg7JWM66Ck7JW8IO2VnOuLpFxuICAgICAgICAgICAgc3BlYy5pc1ZpZGVvRW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgYWRzTG9hZGVyLmNvbnRlbnRDb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgaWYoYWRzTWFuYWdlcil7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBpZihhZERpc3BsYXlDb250YWluZXIpe1xuICAgICAgICAgICAgYWREaXNwbGF5Q29udGFpbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBpZihsaXN0ZW5lcil7XG4gICAgICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYWRzTG9hZGVyKXtcbiAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEU19NQU5BR0VSX0xPQURFRCwgT25NYW5hZ2VyTG9hZGVkKTtcbiAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEX0VSUk9SLCBPbkFkRXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0ICRhZHMgPSBMQSQocGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpKS5maW5kKFwiLm92cC1hZHNcIik7XG4gICAgICAgIGlmKCRhZHMpe1xuICAgICAgICAgICAgJGFkcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci5vZmYoQ09OVEVOVF9WT0xVTUUsIG51bGwsIHRoYXQpO1xuXG5cbiAgICB9O1xuXG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQWRzOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDEwLzA0LzIwMTkuXG4gKi9cbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX0FEX0xPQURFRCxcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBTVEFURV9BRF9DT01QTEVURSxcbiAgICBBRF9DSEFOR0VELFxuICAgIEFEX1RJTUUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUExBWUVSX1NUQVRFLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGFkc01hbmFnZXIsIHByb3ZpZGVyLCBhZHNTcGVjLCBPbkFkRXJyb3Ipe1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGxvd0xldmVsRXZlbnRzID0ge307XG5cbiAgICBsZXQgaW50ZXJ2YWxUaW1lciA9IG51bGw7XG5cbiAgICBjb25zdCBBRF9CVUZGRVJJTkcgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BRF9CVUZGRVJJTkc7XG4gICAgY29uc3QgQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRDtcbiAgICBjb25zdCBDT05URU5UX1JFU1VNRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQ7XG4gICAgY29uc3QgQURfRVJST1IgPSBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SO1xuICAgIGNvbnN0IEFMTF9BRFNfQ09NUExFVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQ7XG4gICAgY29uc3QgQ0xJQ0sgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DTElDSztcbiAgICBjb25zdCBTS0lQUEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU0tJUFBFRDtcbiAgICBjb25zdCBDT01QTEVURSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFO1xuICAgIGNvbnN0IEZJUlNUX1FVQVJUSUxFPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5GSVJTVF9RVUFSVElMRTtcbiAgICBjb25zdCBMT0FERUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQ7XG4gICAgY29uc3QgTUlEUE9JTlQ9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLk1JRFBPSU5UO1xuICAgIGNvbnN0IFBBVVNFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlBBVVNFRDtcbiAgICBjb25zdCBSRVNVTUVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUkVTVU1FRDtcbiAgICBjb25zdCBTVEFSVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU1RBUlRFRDtcbiAgICBjb25zdCBVU0VSX0NMT1NFID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuVVNFUl9DTE9TRTtcbiAgICBjb25zdCBUSElSRF9RVUFSVElMRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlRISVJEX1FVQVJUSUxFO1xuXG4gICAgbGV0IGlzQWxsQWRDb21wZWxldGUgPSBmYWxzZTsgICAvL1Bvc3Qgcm9sbOydhCDsnITtlbRcbiAgICBsZXQgYWRDb21wbGV0ZUNhbGxiYWNrID0gbnVsbDtcbiAgICBsZXQgY3VycmVudEFkID0gbnVsbDtcblxuICAgIC8v6rSR6rOg66W8IOyerOyDne2VmOq4sCDsnITtlbQg7Luo7YWQ7Lig66W8IOydvOyLnCDspJHsp4BcbiAgICBsb3dMZXZlbEV2ZW50c1tDT05URU5UX1BBVVNFX1JFUVVFU1RFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgIH07XG5cbiAgICAvL+y7qO2FkOy4oOulvCDsnqzsg51cbiAgICBsb3dMZXZlbEV2ZW50c1tDT05URU5UX1JFU1VNRV9SRVFVRVNURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIC8vYWxlcnQoYWRFdmVudC50eXBlKTtcbiAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYoIWFkc1NwZWMuaXNWaWRlb0VuZGVkKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tBRF9FUlJPUl0gPSBPbkFkRXJyb3I7XG5cbiAgICBsb3dMZXZlbEV2ZW50c1tBTExfQURTX0NPTVBMRVRFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgaXNBbGxBZENvbXBlbGV0ZSA9IHRydWU7XG4gICAgICAgIGlmKGFkc1NwZWMuaXNWaWRlb0VuZGVkKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQ0xJQ0tdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tGSVJTVF9RVUFSVElMRV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIC8vXG4gICAgbG93TGV2ZWxFdmVudHNbQURfQlVGRkVSSU5HXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFEX0JVRkZFUklOR1wiLGFkRXZlbnQudHlwZSk7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbTE9BREVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIC8qdmFyIG1ldGFkYXRhID0ge1xuICAgICAgICAgICAgZHVyYXRpb246IHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICB0eXBlIDpcImFkXCJcbiAgICAgICAgfTsqL1xuXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfTE9BREVELCB7cmVtYWluaW5nIDogcmVtYWluaW5nVGltZSwgaXNMaW5lYXIgOiBhZC5pc0xpbmVhcigpIH0pO1xuXG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tNSURQT0lOVF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW1BBVVNFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUEFVU0VEKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW1JFU1VNRURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BMQVlJTkcpO1xuICAgIH07XG5cblxuICAgIGxvd0xldmVsRXZlbnRzW1NUQVJURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgY3VycmVudEFkID0gYWQ7XG5cbiAgICAgICAgbGV0IGFkT2JqZWN0ID0ge1xuICAgICAgICAgICAgaXNMaW5lYXIgOiBhZC5pc0xpbmVhcigpICxcbiAgICAgICAgICAgIGR1cmF0aW9uIDogYWQuZ2V0RHVyYXRpb24oKSxcbiAgICAgICAgICAgIHNraXBUaW1lT2Zmc2V0IDogYWQuZ2V0U2tpcFRpbWVPZmZzZXQoKSAgICAgLy9UaGUgbnVtYmVyIG9mIHNlY29uZHMgb2YgcGxheWJhY2sgYmVmb3JlIHRoZSBhZCBiZWNvbWVzIHNraXBwYWJsZS5cbiAgICAgICAgfTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9DSEFOR0VELCBhZE9iamVjdCk7XG5cblxuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QTEFZSU5HKTtcbiAgICAgICAgICAgIGFkc1NwZWMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAvLyBGb3IgYSBsaW5lYXIgYWQsIGEgdGltZXIgY2FuIGJlIHN0YXJ0ZWQgdG8gcG9sbCBmb3JcbiAgICAgICAgICAgIC8vIHRoZSByZW1haW5pbmcgdGltZS5cbiAgICAgICAgICAgIGludGVydmFsVGltZXIgPSBzZXRJbnRlcnZhbChcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbWFpbmluZ1RpbWUgPSBhZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gYWQuZ2V0RHVyYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKEFEX1RJTUUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uIDogZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBza2lwVGltZU9mZnNldCA6IGFkLmdldFNraXBUaW1lT2Zmc2V0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1haW5pbmcgOiByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gOiBkdXJhdGlvbiAtIHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBza2lwcGFibGUgOiBhZHNNYW5hZ2VyLmdldEFkU2tpcHBhYmxlU3RhdGUoKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDMwMCk7IC8vIGV2ZXJ5IDMwMG1zXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tDT01QTEVURV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcblxuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsVGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoU1RBVEVfQURfQ09NUExFVEUpO1xuICAgIH07XG4gICAgLy9Vc2VyIHNraXBwZWQgYWQuIHNhbWUgcHJvY2VzcyBvbiBjb21wbGV0ZS5cbiAgICBsb3dMZXZlbEV2ZW50c1tTS0lQUEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuXG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tVU0VSX0NMT1NFXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuXG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tUSElSRF9RVUFSVElMRV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuXG5cbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgfSk7XG4gICAgdGhhdC5zZXRBZENvbXBsZXRlQ2FsbGJhY2sgPSAoX2FkQ29tcGxldGVDYWxsYmFjaykgPT4ge1xuICAgICAgICBhZENvbXBsZXRlQ2FsbGJhY2sgPSBfYWRDb21wbGV0ZUNhbGxiYWNrO1xuICAgIH07XG4gICAgdGhhdC5pc0FsbEFkQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBpc0FsbEFkQ29tcGVsZXRlO1xuICAgIH07XG4gICAgdGhhdC5pc0xpbmVhckFkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gY3VycmVudEFkICA/IGN1cnJlbnRBZC5pc0xpbmVhcigpIDogdHJ1ZTtcbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBZHNFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGFkc01hbmFnZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTIuLlxuICovXG5pbXBvcnQge0VSUk9SLCBTVEFURV9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VmlkZW9FbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudE9yTXNlKSB7XG4gICAgaWYoXy5pc0VsZW1lbnQoZWxlbWVudE9yTXNlKSl7XG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2U7XG4gICAgfVxuICAgIGlmKGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLmdldFZpZGVvRWxlbWVudCgpO1xuICAgIH1lbHNlIGlmKGVsZW1lbnRPck1zZS5tZWRpYSl7XG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2UubWVkaWE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlcGFyYXRlTGl2ZSA9IGZ1bmN0aW9uKG1zZSkge1xuICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxuXG4gICAgaWYobXNlICYmIG1zZS5pc0R5bmFtaWMpe1xuICAgICAgICByZXR1cm4gbXNlLmlzRHluYW1pYygpO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGVycm9yVHJpZ2dlciA9IGZ1bmN0aW9uKGVycm9yLCBwcm92aWRlcil7XG4gICAgaWYocHJvdmlkZXIpe1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XG4gICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yICk7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgY29uc3QgcGlja0N1cnJlbnRTb3VyY2UgPSAoc291cmNlcywgY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKSA9PiB7XG4gICAgbGV0IHNvdXJjZUluZGV4ID0gTWF0aC5tYXgoMCwgY3VycmVudFNvdXJjZSk7XG4gICAgY29uc3QgbGFiZWwgPVwiXCI7XG4gICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgc291cmNlSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2VJbmRleDtcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==