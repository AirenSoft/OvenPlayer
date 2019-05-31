/*! OvenPlayerv0.9.595 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        isVideoEnded: false,
        checkAutoplayStart: true
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
                if (playerConfig.getBrowser().os === "iOS" || playerConfig.getBrowser().os === "Android") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Fkcy9BZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9hZHMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci91dGlscy5qcyJdLCJuYW1lcyI6WyJBZHMiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsIkFVVE9QTEFZX05PVF9BTExPV0VEIiwiQURNQU5HRVJfTE9BRElOR19FUlJPUiIsIkFEU19NQU5BR0VSX0xPQURFRCIsImdvb2dsZSIsImltYSIsIkFkc01hbmFnZXJMb2FkZWRFdmVudCIsIlR5cGUiLCJBRF9FUlJPUiIsIkFkRXJyb3JFdmVudCIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJjaGVja0F1dG9wbGF5U3RhcnQiLCJhdXRvcGxheUFsbG93ZWQiLCJhdXRvcGxheVJlcXVpcmVzTXV0ZWQiLCJzZXR0aW5ncyIsInNldExvY2FsZSIsInNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyIsImFkRGlzcGxheUNvbnRhaW5lciIsImFkc0xvYWRlciIsImFkc01hbmFnZXIiLCJsaXN0ZW5lciIsImFkc1JlcXVlc3QiLCJjcmVhdGVBZENvbnRhaW5lciIsImFkQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiZ2V0Q29udGFpbmVyIiwiYXBwZW5kIiwiT25BZEVycm9yIiwiYWRFcnJvckV2ZW50IiwiY29uc29sZSIsImxvZyIsImdldEVycm9yIiwiZ2V0VmFzdEVycm9yQ29kZSIsImdldE1lc3NhZ2UiLCJpbm5lckVycm9yIiwiZ2V0SW5uZXJFcnJvciIsImdldEVycm9yQ29kZSIsImRlc3Ryb3kiLCJwbGF5IiwiT25NYW5hZ2VyTG9hZGVkIiwiYWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiYWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJBZHNSZW5kZXJpbmdTZXR0aW5ncyIsInJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUiLCJnZXRBZHNNYW5hZ2VyIiwib24iLCJDT05URU5UX1ZPTFVNRSIsImRhdGEiLCJtdXRlIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwiQWREaXNwbGF5Q29udGFpbmVyIiwiQWRzTG9hZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXRSZXF1ZXN0IiwiT3ZlblBsYXllckNvbnNvbGUiLCJBZHNSZXF1ZXN0IiwiZm9yY2VOb25MaW5lYXJGdWxsU2xvdCIsInNldEFkV2lsbEF1dG9QbGF5Iiwic2V0QWRXaWxsUGxheU11dGVkIiwicmVxdWVzdEFkcyIsImNoZWNrQXV0b3BsYXlTdXBwb3J0IiwicGxheVByb21pc2UiLCJ1bmRlZmluZWQiLCJ0aGVuIiwicGF1c2UiLCJnZXRCcm93c2VyIiwib3MiLCJtdXRlZCIsImlzQWN0aXZlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXN1bWUiLCJlcnJvciIsInJldHJ5Q291bnQiLCJjaGVja0Fkc01hbmFnZXJJc1JlYWR5IiwiaXNBdXRvU3RhcnQiLCJFcnJvciIsImxvYWQiLCJpbml0aWFsaXplIiwiaW5pdCIsIlZpZXdNb2RlIiwiTk9STUFMIiwic3RhcnQiLCJzZXRUaW1lb3V0IiwidmlkZW9FbmRlZENhbGxiYWNrIiwiY29tcGxldGVDb250ZW50Q2FsbGJhY2siLCJpc0FsbEFkQ29tcGxldGUiLCJpc0xpbmVhckFkIiwiY29udGVudENvbXBsZXRlIiwiaXNBdXRvUGxheVN1cHBvcnRDaGVja1RpbWUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiJGFkcyIsImZpbmQiLCJyZW1vdmUiLCJvZmYiLCJMaXN0ZW5lciIsImFkc1NwZWMiLCJsb3dMZXZlbEV2ZW50cyIsImludGVydmFsVGltZXIiLCJBRF9CVUZGRVJJTkciLCJBZEV2ZW50IiwiQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQiLCJDT05URU5UX1JFU1VNRV9SRVFVRVNURUQiLCJBTExfQURTX0NPTVBMRVRFRCIsIkNMSUNLIiwiU0tJUFBFRCIsIkNPTVBMRVRFIiwiRklSU1RfUVVBUlRJTEUiLCJMT0FERUQiLCJNSURQT0lOVCIsIlBBVVNFRCIsIlJFU1VNRUQiLCJTVEFSVEVEIiwiVVNFUl9DTE9TRSIsIlRISVJEX1FVQVJUSUxFIiwiaXNBbGxBZENvbXBlbGV0ZSIsImFkQ29tcGxldGVDYWxsYmFjayIsImN1cnJlbnRBZCIsImFkRXZlbnQiLCJ0eXBlIiwiZ2V0UG9zaXRpb24iLCJzZXRTdGF0ZSIsIlNUQVRFX0NPTVBMRVRFIiwicmVtYWluaW5nVGltZSIsImdldFJlbWFpbmluZ1RpbWUiLCJhZCIsImdldEFkIiwidHJpZ2dlciIsIlNUQVRFX0FEX0xPQURFRCIsInJlbWFpbmluZyIsImlzTGluZWFyIiwiU1RBVEVfQURfUEFVU0VEIiwiU1RBVEVfQURfUExBWUlORyIsImFkT2JqZWN0IiwiZHVyYXRpb24iLCJnZXREdXJhdGlvbiIsInNraXBUaW1lT2Zmc2V0IiwiZ2V0U2tpcFRpbWVPZmZzZXQiLCJBRF9DSEFOR0VEIiwic2V0SW50ZXJ2YWwiLCJBRF9USU1FIiwicG9zaXRpb24iLCJza2lwcGFibGUiLCJnZXRBZFNraXBwYWJsZVN0YXRlIiwiY2xlYXJJbnRlcnZhbCIsIlNUQVRFX0FEX0NPTVBMRVRFIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJldmVudE5hbWUiLCJzZXRBZENvbXBsZXRlQ2FsbGJhY2siLCJfYWRDb21wbGV0ZUNhbGxiYWNrIiwiZXh0cmFjdFZpZGVvRWxlbWVudCIsImVsZW1lbnRPck1zZSIsIl8iLCJpc0VsZW1lbnQiLCJnZXRWaWRlb0VsZW1lbnQiLCJtZWRpYSIsInNlcGFyYXRlTGl2ZSIsIm1zZSIsImlzRHluYW1pYyIsImVycm9yVHJpZ2dlciIsIlNUQVRFX0VSUk9SIiwiRVJST1IiLCJwaWNrQ3VycmVudFNvdXJjZSIsInNvdXJjZXMiLCJjdXJyZW50U291cmNlIiwic291cmNlSW5kZXgiLCJNYXRoIiwibWF4IiwibGFiZWwiLCJpIiwibGVuZ3RoIiwiZ2V0U291cmNlTGFiZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBTkE7OztBQVVBLElBQU1BLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxPQUFULEVBQWtCQyxRQUFsQixFQUE0QkMsWUFBNUIsRUFBMENDLFFBQTFDLEVBQW1EO0FBQzNEOztBQUVBLFFBQU1DLHVCQUF1QixvQkFBN0I7QUFDQSxRQUFNQyx5QkFBeUIseUJBQS9COztBQUVBLFFBQU1DLHFCQUFxQkMsT0FBT0MsR0FBUCxDQUFXQyxxQkFBWCxDQUFpQ0MsSUFBakMsQ0FBc0NKLGtCQUFqRTtBQUNBLFFBQU1LLFdBQVdKLE9BQU9DLEdBQVAsQ0FBV0ksWUFBWCxDQUF3QkYsSUFBeEIsQ0FBNkJDLFFBQTlDOztBQUVBLFFBQUlFLE9BQU8sRUFBWDtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLE9BQU87QUFDUEMsaUJBQVMsS0FERixFQUNTO0FBQ2hCQyxnQkFBUyxLQUZGLEVBRVM7QUFDaEJDLHNCQUFlLEtBSFI7QUFJUEMsNEJBQXFCO0FBSmQsS0FBWDtBQU1BLFFBQUlDLGtCQUFrQixLQUF0QjtBQUFBLFFBQTZCQyx3QkFBd0IsS0FBckQ7O0FBR0FkLFdBQU9DLEdBQVAsQ0FBV2MsUUFBWCxDQUFvQkMsU0FBcEIsQ0FBOEIsSUFBOUI7QUFDQWhCLFdBQU9DLEdBQVAsQ0FBV2MsUUFBWCxDQUFvQkUsb0NBQXBCLENBQXlELElBQXpEOztBQUdEO0FBQ0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBSUMscUJBQXFCLElBQXpCO0FBQ0EsUUFBSUMsWUFBWSxJQUFoQjtBQUNBLFFBQUlDLGFBQWEsSUFBakI7QUFDQSxRQUFJQyxXQUFXLElBQWY7QUFDQSxRQUFJQyxhQUFhLElBQWpCOztBQUVBLFFBQU1DLG9CQUFvQixTQUFwQkEsaUJBQW9CLEdBQU07QUFD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Z0JBQWpCLEVBQXdCM0YsS0FBeEI7QUFDSDtBQUVKLENBUE07O0FBU0EsSUFBTTRGLGdEQUFvQixTQUFwQkEsaUJBQW9CLENBQUNDLE9BQUQsRUFBVUMsYUFBVixFQUF5QmhMLFlBQXpCLEVBQTBDO0FBQ3ZFLFFBQUlpTCxjQUFjQyxLQUFLQyxHQUFMLENBQVMsQ0FBVCxFQUFZSCxhQUFaLENBQWxCO0FBQ0EsUUFBTUksUUFBTyxFQUFiO0FBQ0EsUUFBSUwsT0FBSixFQUFhO0FBQ1QsYUFBSyxJQUFJTSxJQUFJLENBQWIsRUFBZ0JBLElBQUlOLFFBQVFPLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QztBQUNyQyxnQkFBSU4sUUFBUU0sQ0FBUixZQUFKLEVBQXdCO0FBQ3BCSiw4QkFBY0ksQ0FBZDtBQUNIO0FBQ0QsZ0JBQUlyTCxhQUFhdUwsY0FBYixNQUFpQ1IsUUFBUU0sQ0FBUixFQUFXRCxLQUFYLEtBQXFCcEwsYUFBYXVMLGNBQWIsRUFBMUQsRUFBMEY7QUFDdEYsdUJBQU9GLENBQVA7QUFDSDtBQUNKO0FBQ0o7QUFDRCxXQUFPSixXQUFQO0FBQ0gsQ0FkTSxDIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+MmVjMTkzYWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAwOC8wNC8yMDE5LlxuICovXG5pbXBvcnQgQWRzRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9hZHMvTGlzdGVuZXJcIjtcbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgRVJST1JTLCBDT05URU5UX1ZPTFVNRSwgU1RBVEVfTE9BRElOR1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBBZHMgPSBmdW5jdGlvbihlbFZpZGVvLCBwcm92aWRlciwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XG4gICAgLy9Ub2RvIDogbW92ZSBjcmVhdGVBZENvbnRhaW5lciB0byBNZWRpYU1hbmFnZXJcblxuICAgIGNvbnN0IEFVVE9QTEFZX05PVF9BTExPV0VEID0gXCJhdXRvcGxheU5vdEFsbG93ZWRcIjtcbiAgICBjb25zdCBBRE1BTkdFUl9MT0FESU5HX0VSUk9SID0gXCJhZG1hbmFnZXJMb2FkaW5nVGltZW91dFwiO1xuXG4gICAgY29uc3QgQURTX01BTkFHRVJfTE9BREVEID0gZ29vZ2xlLmltYS5BZHNNYW5hZ2VyTG9hZGVkRXZlbnQuVHlwZS5BRFNfTUFOQUdFUl9MT0FERUQ7XG4gICAgY29uc3QgQURfRVJST1IgPSBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SO1xuXG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgYWRzTWFuYWdlckxvYWRlZCA9IGZhbHNlO1xuICAgIGxldCBzcGVjID0ge1xuICAgICAgICBzdGFydGVkOiBmYWxzZSwgLy9wbGF5ZXIgc3RhcnRlZFxuICAgICAgICBhY3RpdmUgOiBmYWxzZSwgLy9vbiBBZFxuICAgICAgICBpc1ZpZGVvRW5kZWQgOiBmYWxzZSxcbiAgICAgICAgY2hlY2tBdXRvcGxheVN0YXJ0IDogdHJ1ZVxuICAgIH07XG4gICAgbGV0IGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlLCBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcblxuXG4gICAgZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUoXCJrb1wiKTtcbiAgICBnb29nbGUuaW1hLnNldHRpbmdzLnNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyh0cnVlKTtcblxuXG4gICAvLyBnb29nbGUuaW1hLnNldHRpbmdzLnNldEF1dG9QbGF5QWRCcmVha3MoZmFsc2UpO1xuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRWcGFpZE1vZGUoZ29vZ2xlLmltYS5JbWFTZGtTZXR0aW5ncy5WcGFpZE1vZGUuRU5BQkxFRCk7XG5cbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0TG9jYWxlKCdrbycpO1xuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRWcGFpZE1vZGUoZ29vZ2xlLmltYS5JbWFTZGtTZXR0aW5ncy5WcGFpZE1vZGUuRU5BQkxFRCk7XG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyh0cnVlKTtcbiAgICBsZXQgYWREaXNwbGF5Q29udGFpbmVyID0gbnVsbDtcbiAgICBsZXQgYWRzTG9hZGVyID0gbnVsbDtcbiAgICBsZXQgYWRzTWFuYWdlciA9IG51bGw7XG4gICAgbGV0IGxpc3RlbmVyID0gbnVsbDtcbiAgICBsZXQgYWRzUmVxdWVzdCA9IG51bGw7XG5cbiAgICBjb25zdCBjcmVhdGVBZENvbnRhaW5lciA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3ZwLWFkcycpO1xuICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ292cC1hZHMnKTtcbiAgICAgICAgcGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpLmFwcGVuZChhZENvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIGFkQ29udGFpbmVyO1xuICAgIH07XG4gICAgY29uc3QgT25BZEVycm9yID0gZnVuY3Rpb24oYWRFcnJvckV2ZW50KXtcbiAgICAgICAgLy9ub3RlIDogYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpLmdldEVycm9yQ29kZSgpID09PSAxMjA1ICYgYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpID09PSA0MDAgaXMgQnJvd3NlciBVc2VyIEludGVyYWN0aXZlIGVycm9yLlxuXG4gICAgICAgIC8vRG8gbm90IHRyaWdnZXJpbmcgRVJST1IuIGJlY3Vhc2UgSXQganVzdCBBRCFcblxuICAgICAgICBjb25zb2xlLmxvZyhhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRWYXN0RXJyb3JDb2RlKCksIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldE1lc3NhZ2UoKSk7XG5cbiAgICAgICAgbGV0IGlubmVyRXJyb3IgPSBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRJbm5lckVycm9yKCk7XG4gICAgICAgIGlmKGlubmVyRXJyb3Ipe1xuICAgICAgICAgICAgY29uc29sZS5sb2coaW5uZXJFcnJvci5nZXRFcnJvckNvZGUoKSwgaW5uZXJFcnJvci5nZXRNZXNzYWdlKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZHNNYW5hZ2VyKSB7XG4gICAgICAgICAgICBhZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBzcGVjLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBwcm92aWRlci5wbGF5KCk7XG5cbiAgICAgICAgLyppZihpbm5lckVycm9yICYmIGlubmVyRXJyb3IuZ2V0RXJyb3JDb2RlKCkgPT09IDEyMDUpe1xuICAgICAgICB9ZWxzZXtcblxuICAgICAgICB9Ki9cblxuXG4gICAgfTtcbiAgICBjb25zdCBPbk1hbmFnZXJMb2FkZWQgPSBmdW5jdGlvbihhZHNNYW5hZ2VyTG9hZGVkRXZlbnQpe1xuICAgICAgICBsZXQgYWRzUmVuZGVyaW5nU2V0dGluZ3MgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZW5kZXJpbmdTZXR0aW5ncygpO1xuICAgICAgICBhZHNSZW5kZXJpbmdTZXR0aW5ncy5yZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgLy9hZHNSZW5kZXJpbmdTZXR0aW5ncy51c2VTdHlsZWROb25MaW5lYXJBZHMgPSB0cnVlO1xuICAgICAgICBhZHNNYW5hZ2VyID0gYWRzTWFuYWdlckxvYWRlZEV2ZW50LmdldEFkc01hbmFnZXIoZWxWaWRlbywgYWRzUmVuZGVyaW5nU2V0dGluZ3MpO1xuXG5cbiAgICAgICAgbGlzdGVuZXIgPSBBZHNFdmVudHNMaXN0ZW5lcihhZHNNYW5hZ2VyLCBwcm92aWRlciwgc3BlYywgT25BZEVycm9yKTtcblxuICAgICAgICBwcm92aWRlci5vbihDT05URU5UX1ZPTFVNRSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYoZGF0YS5tdXRlKXtcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnNldFZvbHVtZSgwKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuc2V0Vm9sdW1lKGRhdGEudm9sdW1lLzEwMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgdGhhdCk7XG5cbiAgICAgICAgYWRzTWFuYWdlckxvYWRlZCA9IHRydWU7XG5cbiAgICB9O1xuXG5cbiAgICBhZERpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIoY3JlYXRlQWRDb250YWluZXIoKSwgZWxWaWRlbyk7XG4gICAgYWRzTG9hZGVyID0gbmV3IGdvb2dsZS5pbWEuQWRzTG9hZGVyKGFkRGlzcGxheUNvbnRhaW5lcik7XG5cbiAgICBhZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBRFNfTUFOQUdFUl9MT0FERUQsIE9uTWFuYWdlckxvYWRlZCwgZmFsc2UpO1xuICAgIGFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKEFEX0VSUk9SLCBPbkFkRXJyb3IsIGZhbHNlKTtcblxuXG4gICAgZnVuY3Rpb24gaW5pdFJlcXVlc3QoKXtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBdXRvUGxheSBTdXBwb3J0IDogXCIsIFwiYXV0b3BsYXlBbGxvd2VkXCIsYXV0b3BsYXlBbGxvd2VkLCBcImF1dG9wbGF5UmVxdWlyZXNNdXRlZFwiLGF1dG9wbGF5UmVxdWlyZXNNdXRlZCk7XG5cbiAgICAgICAgYWRzUmVxdWVzdCA9IG5ldyBnb29nbGUuaW1hLkFkc1JlcXVlc3QoKTtcblxuICAgICAgICBhZHNSZXF1ZXN0LmZvcmNlTm9uTGluZWFyRnVsbFNsb3QgPSBmYWxzZTtcbiAgICAgICAgLyppZihwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLmJyb3dzZXIgPT09IFwiU2FmYXJpXCIgJiYgcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyA9PT0gXCJpT1NcIiApe1xuICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2U7XG4gICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgfSovXG5cbiAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxBdXRvUGxheShhdXRvcGxheUFsbG93ZWQpO1xuICAgICAgICBhZHNSZXF1ZXN0LnNldEFkV2lsbFBsYXlNdXRlZChhdXRvcGxheVJlcXVpcmVzTXV0ZWQpO1xuICAgICAgICBhZHNSZXF1ZXN0LmFkVGFnVXJsID0gYWRUYWdVcmw7XG5cbiAgICAgICAgYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7XG5cbiAgICAgICAgLy90d28gd2F5IHdoYXQgYWQgc3RhcnRzLlxuICAgICAgICAvL2Fkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpOyBvciAgYWRzTWFuYWdlci5zdGFydCgpO1xuICAgICAgICAvL3doYXQ/IHdoeT8/IHd0aD8/XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBdXRvcGxheVN1cHBvcnQoKSB7XG4gICAgICAgIGlmKCFlbFZpZGVvLnBsYXkpe1xuICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGxheVByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgaWYgKHBsYXlQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBsYXlQcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBtYWtlIGl0IGhlcmUsIHVubXV0ZWQgYXV0b3BsYXkgd29ya3MuXG4gICAgICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuXG4gICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzcGVjLmNoZWNrQXV0b3BsYXlTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyAgPT09IFwiaU9TXCIgfHwgcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyAgPT09IFwiQW5kcm9pZFwiKXtcbiAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgbXV0ZWQgYXV0byBzdGFydC5cbiAgICAgICAgICAgICAgICAgICAgIC8vSSBkb24ndCBuZWVkIGZvciB0aGlzIHZlcnNpb24uXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBsYXlQcm9taXNlID0gZWxWaWRlby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5UHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5UHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBtYWtlIGl0IGhlcmUsIG11dGVkIGF1dG9wbGF5IHdvcmtzIGJ1dCB1bm11dGVkIGF1dG9wbGF5IGRvZXMgbm90LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJvdGggbXV0ZWQgYW5kIHVubXV0ZWQgYXV0b3BsYXkgZmFpbGVkLiBGYWxsIGJhY2sgdG8gY2xpY2sgdG8gcGxheS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMuY2hlY2tBdXRvcGxheVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy9NYXliZSB0aGlzIGlzIElFMTEuLi4uXG4gICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICBzcGVjLmNoZWNrQXV0b3BsYXlTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja0F1dG9wbGF5U3VwcG9ydCgpO1xuXG4gICAgdGhhdC5pc0FjdGl2ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuYWN0aXZlO1xuICAgIH07XG4gICAgdGhhdC5zdGFydGVkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5zdGFydGVkO1xuICAgIH07XG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAvL3Byb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuXG5cbiAgICAgICAgaWYoc3BlYy5zdGFydGVkKXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5yZXN1bWUoKTtcbiAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSgpe1xuICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgICAgICBpZihhZHNNYW5hZ2VyTG9hZGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKChwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSAmJiAhYXV0b3BsYXlBbGxvd2VkKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihBVVRPUExBWV9OT1RfQUxMT1dFRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Eb24ndCBwbGF5aW5nIHZpZGVvIHdoZW4gcGxheWVyIGNvbXBsZXRlIHBsYXlpbmcgQUQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Pbmx5IGlPUyBTYWZhcmkgRmlyc3QgbG9hZGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgID09PSBcImlPU1wiIHx8IHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgID09PSBcIkFuZHJvaWRcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIuaW5pdChcIjEwMCVcIiwgXCIxMDAlXCIsIGdvb2dsZS5pbWEuVmlld01vZGUuTk9STUFMKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDMwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0Fkc01hbmFnZXJJc1JlYWR5LCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihBRE1BTkdFUl9MT0FESU5HX0VSUk9SKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIGFkc01hbmFnZXIucGF1c2UoKTtcbiAgICB9O1xuICAgIHRoYXQudmlkZW9FbmRlZENhbGxiYWNrID0gKGNvbXBsZXRlQ29udGVudENhbGxiYWNrKSA9PiB7XG4gICAgICAgIC8vbGlzdGVuZXIuaXNMaW5lYXJBZCA6IGdldCBjdXJyZW50IGFkJ3Mgc3RhdHVzIHdoZXRoZXIgbGluZWFyIGFkIG9yIG5vdC5cbiAgICAgICAgaWYobGlzdGVuZXIuaXNBbGxBZENvbXBsZXRlKCkgfHwgIWxpc3RlbmVyLmlzTGluZWFyQWQoKSl7XG4gICAgICAgICAgICBjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaygpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vUG9zdCAtIFJvbGwg7J2EIOyerOyDne2VmOq4sCDsnITtlbTshJzripQg7L2Y7YWQ7Lig6rCAIOuBneuCrOydjOydhCBhZHNMb2FkZXLsl5Dqsowg7JWM66Ck7JW8IO2VnOuLpFxuICAgICAgICAgICAgc3BlYy5pc1ZpZGVvRW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgYWRzTG9hZGVyLmNvbnRlbnRDb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmlzQXV0b1BsYXlTdXBwb3J0Q2hlY2tUaW1lID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQ7XG4gICAgfVxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgaWYoYWRzTG9hZGVyKXtcbiAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEU19NQU5BR0VSX0xPQURFRCwgT25NYW5hZ2VyTG9hZGVkKTtcbiAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEX0VSUk9SLCBPbkFkRXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoYWRzTWFuYWdlcil7XG5cbiAgICAgICAgICAgIGFkc01hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGFkRGlzcGxheUNvbnRhaW5lcil7XG4gICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGxpc3RlbmVyKXtcbiAgICAgICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0ICRhZHMgPSBMQSQocGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpKS5maW5kKFwiLm92cC1hZHNcIik7XG4gICAgICAgIGlmKCRhZHMpe1xuICAgICAgICAgICAgJGFkcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci5vZmYoQ09OVEVOVF9WT0xVTUUsIG51bGwsIHRoYXQpO1xuXG5cbiAgICB9O1xuXG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQWRzOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDEwLzA0LzIwMTkuXG4gKi9cbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX0FEX0xPQURFRCxcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBTVEFURV9BRF9DT01QTEVURSxcbiAgICBBRF9DSEFOR0VELFxuICAgIEFEX1RJTUUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUExBWUVSX1NUQVRFLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGFkc01hbmFnZXIsIHByb3ZpZGVyLCBhZHNTcGVjLCBPbkFkRXJyb3Ipe1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGxvd0xldmVsRXZlbnRzID0ge307XG5cbiAgICBsZXQgaW50ZXJ2YWxUaW1lciA9IG51bGw7XG5cbiAgICBjb25zdCBBRF9CVUZGRVJJTkcgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BRF9CVUZGRVJJTkc7XG4gICAgY29uc3QgQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRDtcbiAgICBjb25zdCBDT05URU5UX1JFU1VNRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQ7XG4gICAgY29uc3QgQURfRVJST1IgPSBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SO1xuICAgIGNvbnN0IEFMTF9BRFNfQ09NUExFVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQ7XG4gICAgY29uc3QgQ0xJQ0sgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DTElDSztcbiAgICBjb25zdCBTS0lQUEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU0tJUFBFRDtcbiAgICBjb25zdCBDT01QTEVURSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFO1xuICAgIGNvbnN0IEZJUlNUX1FVQVJUSUxFPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5GSVJTVF9RVUFSVElMRTtcbiAgICBjb25zdCBMT0FERUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQ7XG4gICAgY29uc3QgTUlEUE9JTlQ9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLk1JRFBPSU5UO1xuICAgIGNvbnN0IFBBVVNFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlBBVVNFRDtcbiAgICBjb25zdCBSRVNVTUVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUkVTVU1FRDtcbiAgICBjb25zdCBTVEFSVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU1RBUlRFRDtcbiAgICBjb25zdCBVU0VSX0NMT1NFID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuVVNFUl9DTE9TRTtcbiAgICBjb25zdCBUSElSRF9RVUFSVElMRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlRISVJEX1FVQVJUSUxFO1xuXG4gICAgbGV0IGlzQWxsQWRDb21wZWxldGUgPSBmYWxzZTsgICAvL1Bvc3Qgcm9sbOydhCDsnITtlbRcbiAgICBsZXQgYWRDb21wbGV0ZUNhbGxiYWNrID0gbnVsbDtcbiAgICBsZXQgY3VycmVudEFkID0gbnVsbDtcblxuICAgICBsb3dMZXZlbEV2ZW50c1tDT05URU5UX1BBVVNFX1JFUVVFU1RFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgLy9UaGlzIGNhbGxscyB3aGVuIHBsYXllciBpcyBwbGF5aW5nIGNvbnRlbnRzIGZvciBhZC5cbiAgICAgICAgIGlmKGFkc1NwZWMuc3RhcnRlZCl7XG4gICAgICAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG4gICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICAvL1RoaXMgY2FsbHMgd2hlbiBvbmUgYWQgZW5kZWQuXG4gICAgICAgIC8vQW5kIHRoaXMgaXMgc2lnbmFsIHdoYXQgcGxheSB0aGUgY29udGVudHMuXG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkICYmIChwcm92aWRlci5nZXRQb3NpdGlvbigpID09PSAwIHx8ICFhZHNTcGVjLmlzVmlkZW9FbmRlZCkgICl7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQURfRVJST1JdID0gT25BZEVycm9yO1xuXG4gICAgbG93TGV2ZWxFdmVudHNbQUxMX0FEU19DT01QTEVURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGlzQWxsQWRDb21wZWxldGUgPSB0cnVlO1xuICAgICAgICBpZihhZHNTcGVjLmlzVmlkZW9FbmRlZCl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW0NMSUNLXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbRklSU1RfUVVBUlRJTEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICAvL1xuICAgIGxvd0xldmVsRXZlbnRzW0FEX0JVRkZFUklOR10gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRF9CVUZGRVJJTkdcIixhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbTE9BREVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIC8qdmFyIG1ldGFkYXRhID0ge1xuICAgICAgICAgICAgZHVyYXRpb246IHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICB0eXBlIDpcImFkXCJcbiAgICAgICAgfTsqL1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0xPQURFRCwge3JlbWFpbmluZyA6IHJlbWFpbmluZ1RpbWUsIGlzTGluZWFyIDogYWQuaXNMaW5lYXIoKSB9KTtcblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbTUlEUE9JTlRdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tQQVVTRURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0FEX1BBVVNFRCk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tSRVNVTUVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QTEFZSU5HKTtcbiAgICB9O1xuXG5cbiAgICBsb3dMZXZlbEV2ZW50c1tTVEFSVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGN1cnJlbnRBZCA9IGFkO1xuXG4gICAgICAgIGxldCBhZE9iamVjdCA9IHtcbiAgICAgICAgICAgIGlzTGluZWFyIDogYWQuaXNMaW5lYXIoKSAsXG4gICAgICAgICAgICBkdXJhdGlvbiA6IGFkLmdldER1cmF0aW9uKCksXG4gICAgICAgICAgICBza2lwVGltZU9mZnNldCA6IGFkLmdldFNraXBUaW1lT2Zmc2V0KCkgICAgIC8vVGhlIG51bWJlciBvZiBzZWNvbmRzIG9mIHBsYXliYWNrIGJlZm9yZSB0aGUgYWQgYmVjb21lcyBza2lwcGFibGUuXG4gICAgICAgIH07XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfQ0hBTkdFRCwgYWRPYmplY3QpO1xuXG5cbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcblxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgICAgICAgICBhZHNTcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgLy8gRm9yIGEgbGluZWFyIGFkLCBhIHRpbWVyIGNhbiBiZSBzdGFydGVkIHRvIHBvbGwgZm9yXG4gICAgICAgICAgICAvLyB0aGUgcmVtYWluaW5nIHRpbWUuXG4gICAgICAgICAgICBpbnRlcnZhbFRpbWVyID0gc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1haW5pbmdUaW1lID0gYWRzTWFuYWdlci5nZXRSZW1haW5pbmdUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGFkLmdldER1cmF0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9USU1FLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiA6IGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcFRpbWVPZmZzZXQgOiBhZC5nZXRTa2lwVGltZU9mZnNldCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nIDogcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogZHVyYXRpb24gLSByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcHBhYmxlIDogYWRzTWFuYWdlci5nZXRBZFNraXBwYWJsZVN0YXRlKClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAzMDApOyAvLyBldmVyeSAzMDBtc1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQ09NUExFVEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICAvL1VzZXIgc2tpcHBlZCBhZC4gc2FtZSBwcm9jZXNzIG9uIGNvbXBsZXRlLlxuICAgIGxvd0xldmVsRXZlbnRzW1NLSVBQRURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG5cbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW1VTRVJfQ0xPU0VdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tUSElSRF9RVUFSVElMRV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuXG5cbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgfSk7XG4gICAgdGhhdC5zZXRBZENvbXBsZXRlQ2FsbGJhY2sgPSAoX2FkQ29tcGxldGVDYWxsYmFjaykgPT4ge1xuICAgICAgICBhZENvbXBsZXRlQ2FsbGJhY2sgPSBfYWRDb21wbGV0ZUNhbGxiYWNrO1xuICAgIH07XG4gICAgdGhhdC5pc0FsbEFkQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBpc0FsbEFkQ29tcGVsZXRlO1xuICAgIH07XG4gICAgdGhhdC5pc0xpbmVhckFkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gY3VycmVudEFkICA/IGN1cnJlbnRBZC5pc0xpbmVhcigpIDogdHJ1ZTtcbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBZHNFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGFkc01hbmFnZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTIuLlxuICovXG5pbXBvcnQge0VSUk9SLCBTVEFURV9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VmlkZW9FbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudE9yTXNlKSB7XG4gICAgaWYoXy5pc0VsZW1lbnQoZWxlbWVudE9yTXNlKSl7XG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2U7XG4gICAgfVxuICAgIGlmKGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLmdldFZpZGVvRWxlbWVudCgpO1xuICAgIH1lbHNlIGlmKGVsZW1lbnRPck1zZS5tZWRpYSl7XG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2UubWVkaWE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlcGFyYXRlTGl2ZSA9IGZ1bmN0aW9uKG1zZSkge1xuICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxuXG4gICAgaWYobXNlICYmIG1zZS5pc0R5bmFtaWMpe1xuICAgICAgICByZXR1cm4gbXNlLmlzRHluYW1pYygpO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGVycm9yVHJpZ2dlciA9IGZ1bmN0aW9uKGVycm9yLCBwcm92aWRlcil7XG4gICAgaWYocHJvdmlkZXIpe1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XG4gICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yICk7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgY29uc3QgcGlja0N1cnJlbnRTb3VyY2UgPSAoc291cmNlcywgY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKSA9PiB7XG4gICAgbGV0IHNvdXJjZUluZGV4ID0gTWF0aC5tYXgoMCwgY3VycmVudFNvdXJjZSk7XG4gICAgY29uc3QgbGFiZWwgPVwiXCI7XG4gICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgc291cmNlSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2VJbmRleDtcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==