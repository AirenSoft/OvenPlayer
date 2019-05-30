/*! OvenPlayerv0.9.593 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
                elVideo.pause();
                autoplayAllowed = false;
                autoplayRequiresMuted = false;
                spec.checkAutoplayStart = false;
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
                        if (retryCount < 300) {
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
        console.log("ALL_ADS_COMPLETED");

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
        console.log("AD_BUFFERING");
        OvenPlayerConsole.log("AD_BUFFERING", adEvent.type);
    };
    lowLevelEvents[LOADED] = function (adEvent) {
        console.log("LOADED");
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
        console.log("STARTED");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Fkcy9BZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9hZHMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci91dGlscy5qcyJdLCJuYW1lcyI6WyJBZHMiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsIkFVVE9QTEFZX05PVF9BTExPV0VEIiwiQURNQU5HRVJfTE9BRElOR19FUlJPUiIsIkFEU19NQU5BR0VSX0xPQURFRCIsImdvb2dsZSIsImltYSIsIkFkc01hbmFnZXJMb2FkZWRFdmVudCIsIlR5cGUiLCJBRF9FUlJPUiIsIkFkRXJyb3JFdmVudCIsInRoYXQiLCJhZHNNYW5hZ2VyTG9hZGVkIiwic3BlYyIsInN0YXJ0ZWQiLCJhY3RpdmUiLCJpc1ZpZGVvRW5kZWQiLCJjaGVja0F1dG9wbGF5U3RhcnQiLCJhdXRvcGxheUFsbG93ZWQiLCJhdXRvcGxheVJlcXVpcmVzTXV0ZWQiLCJzZXR0aW5ncyIsInNldExvY2FsZSIsInNldERpc2FibGVDdXN0b21QbGF5YmFja0ZvcklPUzEwUGx1cyIsImFkRGlzcGxheUNvbnRhaW5lciIsImFkc0xvYWRlciIsImFkc01hbmFnZXIiLCJsaXN0ZW5lciIsImFkc1JlcXVlc3QiLCJjcmVhdGVBZENvbnRhaW5lciIsImFkQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiZ2V0Q29udGFpbmVyIiwiYXBwZW5kIiwiT25BZEVycm9yIiwiYWRFcnJvckV2ZW50IiwiY29uc29sZSIsImxvZyIsImdldEVycm9yIiwiZ2V0VmFzdEVycm9yQ29kZSIsImdldE1lc3NhZ2UiLCJpbm5lckVycm9yIiwiZ2V0SW5uZXJFcnJvciIsImdldEVycm9yQ29kZSIsImRlc3Ryb3kiLCJwbGF5IiwiT25NYW5hZ2VyTG9hZGVkIiwiYWRzTWFuYWdlckxvYWRlZEV2ZW50IiwiYWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJBZHNSZW5kZXJpbmdTZXR0aW5ncyIsInJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUiLCJnZXRBZHNNYW5hZ2VyIiwib24iLCJDT05URU5UX1ZPTFVNRSIsImRhdGEiLCJtdXRlIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwiQWREaXNwbGF5Q29udGFpbmVyIiwiQWRzTG9hZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXRSZXF1ZXN0IiwiT3ZlblBsYXllckNvbnNvbGUiLCJBZHNSZXF1ZXN0IiwiZm9yY2VOb25MaW5lYXJGdWxsU2xvdCIsInNldEFkV2lsbEF1dG9QbGF5Iiwic2V0QWRXaWxsUGxheU11dGVkIiwicmVxdWVzdEFkcyIsImNoZWNrQXV0b3BsYXlTdXBwb3J0IiwicGxheVByb21pc2UiLCJ1bmRlZmluZWQiLCJ0aGVuIiwicGF1c2UiLCJpc0FjdGl2ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVzdW1lIiwiZXJyb3IiLCJyZXRyeUNvdW50IiwiY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSIsImlzQXV0b1N0YXJ0IiwiRXJyb3IiLCJnZXRCcm93c2VyIiwib3MiLCJsb2FkIiwiaW5pdGlhbGl6ZSIsImluaXQiLCJWaWV3TW9kZSIsIk5PUk1BTCIsInN0YXJ0Iiwic2V0VGltZW91dCIsInZpZGVvRW5kZWRDYWxsYmFjayIsImNvbXBsZXRlQ29udGVudENhbGxiYWNrIiwiaXNBbGxBZENvbXBsZXRlIiwiaXNMaW5lYXJBZCIsImNvbnRlbnRDb21wbGV0ZSIsImlzQXV0b1BsYXlTdXBwb3J0Q2hlY2tUaW1lIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIiRhZHMiLCJmaW5kIiwicmVtb3ZlIiwib2ZmIiwiTGlzdGVuZXIiLCJhZHNTcGVjIiwibG93TGV2ZWxFdmVudHMiLCJpbnRlcnZhbFRpbWVyIiwiQURfQlVGRkVSSU5HIiwiQWRFdmVudCIsIkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVEIiwiQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEIiwiQUxMX0FEU19DT01QTEVURUQiLCJDTElDSyIsIlNLSVBQRUQiLCJDT01QTEVURSIsIkZJUlNUX1FVQVJUSUxFIiwiTE9BREVEIiwiTUlEUE9JTlQiLCJQQVVTRUQiLCJSRVNVTUVEIiwiU1RBUlRFRCIsIlVTRVJfQ0xPU0UiLCJUSElSRF9RVUFSVElMRSIsImlzQWxsQWRDb21wZWxldGUiLCJhZENvbXBsZXRlQ2FsbGJhY2siLCJjdXJyZW50QWQiLCJhZEV2ZW50IiwidHlwZSIsImdldFBvc2l0aW9uIiwic2V0U3RhdGUiLCJTVEFURV9DT01QTEVURSIsInJlbWFpbmluZ1RpbWUiLCJnZXRSZW1haW5pbmdUaW1lIiwiYWQiLCJnZXRBZCIsInRyaWdnZXIiLCJTVEFURV9BRF9MT0FERUQiLCJyZW1haW5pbmciLCJpc0xpbmVhciIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX1BMQVlJTkciLCJhZE9iamVjdCIsImR1cmF0aW9uIiwiZ2V0RHVyYXRpb24iLCJza2lwVGltZU9mZnNldCIsImdldFNraXBUaW1lT2Zmc2V0IiwiQURfQ0hBTkdFRCIsInNldEludGVydmFsIiwiQURfVElNRSIsInBvc2l0aW9uIiwic2tpcHBhYmxlIiwiZ2V0QWRTa2lwcGFibGVTdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJTVEFURV9BRF9DT01QTEVURSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwic2V0QWRDb21wbGV0ZUNhbGxiYWNrIiwiX2FkQ29tcGxldGVDYWxsYmFjayIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJlbGVtZW50T3JNc2UiLCJfIiwiaXNFbGVtZW50IiwiZ2V0VmlkZW9FbGVtZW50IiwibWVkaWEiLCJzZXBhcmF0ZUxpdmUiLCJtc2UiLCJpc0R5bmFtaWMiLCJlcnJvclRyaWdnZXIiLCJTVEFURV9FUlJPUiIsIkVSUk9SIiwicGlja0N1cnJlbnRTb3VyY2UiLCJzb3VyY2VzIiwiY3VycmVudFNvdXJjZSIs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QWQ7QUFDSDtBQUNELGdCQUFJcEwsYUFBYXNMLGNBQWIsTUFBaUNSLFFBQVFNLENBQVIsRUFBV0QsS0FBWCxLQUFxQm5MLGFBQWFzTCxjQUFiLEVBQTFELEVBQTBGO0FBQ3RGLHVCQUFPRixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsV0FBT0osV0FBUDtBQUNILENBZE0sQyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMDgvMDQvMjAxOS5cbiAqL1xuaW1wb3J0IEFkc0V2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvYWRzL0xpc3RlbmVyXCI7XG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIEVSUk9SUywgQ09OVEVOVF9WT0xVTUUsIFNUQVRFX0xPQURJTkdcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgQWRzID0gZnVuY3Rpb24oZWxWaWRlbywgcHJvdmlkZXIsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpe1xuICAgIC8vVG9kbyA6IG1vdmUgY3JlYXRlQWRDb250YWluZXIgdG8gTWVkaWFNYW5hZ2VyXG5cbiAgICBjb25zdCBBVVRPUExBWV9OT1RfQUxMT1dFRCA9IFwiYXV0b3BsYXlOb3RBbGxvd2VkXCI7XG4gICAgY29uc3QgQURNQU5HRVJfTE9BRElOR19FUlJPUiA9IFwiYWRtYW5hZ2VyTG9hZGluZ1RpbWVvdXRcIjtcblxuICAgIGNvbnN0IEFEU19NQU5BR0VSX0xPQURFRCA9IGdvb2dsZS5pbWEuQWRzTWFuYWdlckxvYWRlZEV2ZW50LlR5cGUuQURTX01BTkFHRVJfTE9BREVEO1xuICAgIGNvbnN0IEFEX0VSUk9SID0gZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUjtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGFkc01hbmFnZXJMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgc3RhcnRlZDogZmFsc2UsIC8vcGxheWVyIHN0YXJ0ZWRcbiAgICAgICAgYWN0aXZlIDogZmFsc2UsIC8vb24gQWRcbiAgICAgICAgaXNWaWRlb0VuZGVkIDogZmFsc2UsXG4gICAgICAgIGNoZWNrQXV0b3BsYXlTdGFydCA6IHRydWVcbiAgICB9O1xuICAgIGxldCBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZSwgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG5cblxuICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0TG9jYWxlKFwia29cIik7XG4gICAgZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXModHJ1ZSk7XG5cblxuICAgLy8gZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRBdXRvUGxheUFkQnJlYWtzKGZhbHNlKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuXG4gICAgLy9nb29nbGUuaW1hLnNldHRpbmdzLnNldExvY2FsZSgna28nKTtcbiAgICAvL2dvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xuICAgIC8vZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXREaXNhYmxlQ3VzdG9tUGxheWJhY2tGb3JJT1MxMFBsdXModHJ1ZSk7XG4gICAgbGV0IGFkRGlzcGxheUNvbnRhaW5lciA9IG51bGw7XG4gICAgbGV0IGFkc0xvYWRlciA9IG51bGw7XG4gICAgbGV0IGFkc01hbmFnZXIgPSBudWxsO1xuICAgIGxldCBsaXN0ZW5lciA9IG51bGw7XG4gICAgbGV0IGFkc1JlcXVlc3QgPSBudWxsO1xuXG4gICAgY29uc3QgY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ292cC1hZHMnKTtcbiAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdvdnAtYWRzJyk7XG4gICAgICAgIHBsYXllckNvbmZpZy5nZXRDb250YWluZXIoKS5hcHBlbmQoYWRDb250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcbiAgICB9O1xuICAgIGNvbnN0IE9uQWRFcnJvciA9IGZ1bmN0aW9uKGFkRXJyb3JFdmVudCl7XG4gICAgICAgIC8vbm90ZSA6IGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldElubmVyRXJyb3IoKS5nZXRFcnJvckNvZGUoKSA9PT0gMTIwNSAmIGFkRXJyb3JFdmVudC5nZXRFcnJvcigpLmdldFZhc3RFcnJvckNvZGUoKSA9PT0gNDAwIGlzIEJyb3dzZXIgVXNlciBJbnRlcmFjdGl2ZSBlcnJvci5cblxuICAgICAgICAvL0RvIG5vdCB0cmlnZ2VyaW5nIEVSUk9SLiBiZWN1YXNlIEl0IGp1c3QgQUQhXG5cbiAgICAgICAgY29uc29sZS5sb2coYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0VmFzdEVycm9yQ29kZSgpLCBhZEVycm9yRXZlbnQuZ2V0RXJyb3IoKS5nZXRNZXNzYWdlKCkpO1xuXG4gICAgICAgIGxldCBpbm5lckVycm9yID0gYWRFcnJvckV2ZW50LmdldEVycm9yKCkuZ2V0SW5uZXJFcnJvcigpO1xuICAgICAgICBpZihpbm5lckVycm9yKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlubmVyRXJyb3IuZ2V0RXJyb3JDb2RlKCksIGlubmVyRXJyb3IuZ2V0TWVzc2FnZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWRzTWFuYWdlcikge1xuICAgICAgICAgICAgYWRzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgc3BlYy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgc3BlYy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgcHJvdmlkZXIucGxheSgpO1xuXG4gICAgICAgIC8qaWYoaW5uZXJFcnJvciAmJiBpbm5lckVycm9yLmdldEVycm9yQ29kZSgpID09PSAxMjA1KXtcbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgfSovXG5cblxuICAgIH07XG4gICAgY29uc3QgT25NYW5hZ2VyTG9hZGVkID0gZnVuY3Rpb24oYWRzTWFuYWdlckxvYWRlZEV2ZW50KXtcbiAgICAgICAgbGV0IGFkc1JlbmRlcmluZ1NldHRpbmdzID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVuZGVyaW5nU2V0dGluZ3MoKTtcbiAgICAgICAgYWRzUmVuZGVyaW5nU2V0dGluZ3MucmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIC8vYWRzUmVuZGVyaW5nU2V0dGluZ3MudXNlU3R5bGVkTm9uTGluZWFyQWRzID0gdHJ1ZTtcbiAgICAgICAgYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKGVsVmlkZW8sIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcblxuXG4gICAgICAgIGxpc3RlbmVyID0gQWRzRXZlbnRzTGlzdGVuZXIoYWRzTWFuYWdlciwgcHJvdmlkZXIsIHNwZWMsIE9uQWRFcnJvcik7XG5cbiAgICAgICAgcHJvdmlkZXIub24oQ09OVEVOVF9WT0xVTUUsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGlmKGRhdGEubXV0ZSl7XG4gICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zZXRWb2x1bWUoMCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLnNldFZvbHVtZShkYXRhLnZvbHVtZS8xMDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIHRoYXQpO1xuXG4gICAgICAgIGFkc01hbmFnZXJMb2FkZWQgPSB0cnVlO1xuXG4gICAgfTtcblxuXG4gICAgYWREaXNwbGF5Q29udGFpbmVyID0gbmV3IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyKGNyZWF0ZUFkQ29udGFpbmVyKCksIGVsVmlkZW8pO1xuICAgIGFkc0xvYWRlciA9IG5ldyBnb29nbGUuaW1hLkFkc0xvYWRlcihhZERpc3BsYXlDb250YWluZXIpO1xuXG4gICAgYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoQURTX01BTkFHRVJfTE9BREVELCBPbk1hbmFnZXJMb2FkZWQsIGZhbHNlKTtcbiAgICBhZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihBRF9FUlJPUiwgT25BZEVycm9yLCBmYWxzZSk7XG5cblxuICAgIGZ1bmN0aW9uIGluaXRSZXF1ZXN0KCl7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQXV0b1BsYXkgU3VwcG9ydCA6IFwiLCBcImF1dG9wbGF5QWxsb3dlZFwiLGF1dG9wbGF5QWxsb3dlZCwgXCJhdXRvcGxheVJlcXVpcmVzTXV0ZWRcIixhdXRvcGxheVJlcXVpcmVzTXV0ZWQpO1xuXG4gICAgICAgIGFkc1JlcXVlc3QgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZXF1ZXN0KCk7XG5cbiAgICAgICAgYWRzUmVxdWVzdC5mb3JjZU5vbkxpbmVhckZ1bGxTbG90ID0gZmFsc2U7XG4gICAgICAgIC8qaWYocGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5icm93c2VyID09PSBcIlNhZmFyaVwiICYmIHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkub3MgPT09IFwiaU9TXCIgKXtcbiAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgIH0qL1xuXG4gICAgICAgIGFkc1JlcXVlc3Quc2V0QWRXaWxsQXV0b1BsYXkoYXV0b3BsYXlBbGxvd2VkKTtcbiAgICAgICAgYWRzUmVxdWVzdC5zZXRBZFdpbGxQbGF5TXV0ZWQoYXV0b3BsYXlSZXF1aXJlc011dGVkKTtcbiAgICAgICAgYWRzUmVxdWVzdC5hZFRhZ1VybCA9IGFkVGFnVXJsO1xuXG4gICAgICAgIGFkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpO1xuXG4gICAgICAgIC8vdHdvIHdheSB3aGF0IGFkIHN0YXJ0cy5cbiAgICAgICAgLy9hZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTsgb3IgIGFkc01hbmFnZXIuc3RhcnQoKTtcbiAgICAgICAgLy93aGF0PyB3aHk/PyB3dGg/P1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkge1xuICAgICAgICBpZighZWxWaWRlby5wbGF5KXtcbiAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHNwZWMuY2hlY2tBdXRvcGxheVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBsYXlQcm9taXNlID0gZWxWaWRlby5wbGF5KCk7XG4gICAgICAgIGlmIChwbGF5UHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwbGF5UHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgbWFrZSBpdCBoZXJlLCB1bm11dGVkIGF1dG9wbGF5IHdvcmtzLlxuICAgICAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcblxuICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlSZXF1aXJlc011dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBhdXRvcGxheVJlcXVpcmVzTXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzcGVjLmNoZWNrQXV0b3BsYXlTdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG5cblxuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgLy9jaGVjayBtdXRlZCBhdXRvIHN0YXJ0LlxuICAgICAgICAgICAgICAgIC8vSSBkb24ndCBuZWVkIGZvciB0aGlzIHZlcnNpb24uXG4gICAgICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHBsYXlQcm9taXNlID0gZWxWaWRlby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXlQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheVByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBtYWtlIGl0IGhlcmUsIG11dGVkIGF1dG9wbGF5IHdvcmtzIGJ1dCB1bm11dGVkIGF1dG9wbGF5IGRvZXMgbm90LlxuICAgICAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBCb3RoIG11dGVkIGFuZCB1bm11dGVkIGF1dG9wbGF5IGZhaWxlZC4gRmFsbCBiYWNrIHRvIGNsaWNrIHRvIHBsYXkuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheUFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vTWF5YmUgdGhpcyBpcyBJRTExLi4uLlxuICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgYXV0b3BsYXlBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGF1dG9wbGF5UmVxdWlyZXNNdXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGluaXRSZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tBdXRvcGxheVN1cHBvcnQoKTtcblxuICAgIHRoYXQuaXNBY3RpdmUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmFjdGl2ZTtcbiAgICB9O1xuICAgIHRoYXQuc3RhcnRlZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhcnRlZDtcbiAgICB9O1xuICAgIHRoYXQucGxheSA9ICgpID0+IHtcbiAgICAgICAgLy9wcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcblxuXG4gICAgICAgIGlmKHNwZWMuc3RhcnRlZCl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgIGFkc01hbmFnZXIucmVzdW1lKCk7XG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tBZHNNYW5hZ2VySXNSZWFkeSgpe1xuICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgICAgICBpZihhZHNNYW5hZ2VyTG9hZGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKChwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSAmJiAhYXV0b3BsYXlBbGxvd2VkKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5QWxsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoQVVUT1BMQVlfTk9UX0FMTE9XRUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRG9uJ3QgcGxheWluZyB2aWRlbyB3aGVuIHBsYXllciBjb21wbGV0ZSBwbGF5aW5nIEFELlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vT25seSBpT1MgU2FmYXJpIEZpcnN0IGxvYWRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zICA9PT0gXCJpT1NcIiB8fCBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zICA9PT0gXCJBbmRyb2lkXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWREaXNwbGF5Q29udGFpbmVyLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHNNYW5hZ2VyLmluaXQoXCIxMDAlXCIsIFwiMTAwJVwiLCBnb29nbGUuaW1hLlZpZXdNb2RlLk5PUk1BTCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRzTWFuYWdlci5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMzAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrQWRzTWFuYWdlcklzUmVhZHksIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihBRE1BTkdFUl9MT0FESU5HX0VSUk9SKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIGFkc01hbmFnZXIucGF1c2UoKTtcbiAgICB9O1xuICAgIHRoYXQudmlkZW9FbmRlZENhbGxiYWNrID0gKGNvbXBsZXRlQ29udGVudENhbGxiYWNrKSA9PiB7XG4gICAgICAgIC8vbGlzdGVuZXIuaXNMaW5lYXJBZCA6IGdldCBjdXJyZW50IGFkJ3Mgc3RhdHVzIHdoZXRoZXIgbGluZWFyIGFkIG9yIG5vdC5cbiAgICAgICAgaWYobGlzdGVuZXIuaXNBbGxBZENvbXBsZXRlKCkgfHwgIWxpc3RlbmVyLmlzTGluZWFyQWQoKSl7XG4gICAgICAgICAgICBjb21wbGV0ZUNvbnRlbnRDYWxsYmFjaygpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vUG9zdCAtIFJvbGwg7J2EIOyerOyDne2VmOq4sCDsnITtlbTshJzripQg7L2Y7YWQ7Lig6rCAIOuBneuCrOydjOydhCBhZHNMb2FkZXLsl5Dqsowg7JWM66Ck7JW8IO2VnOuLpFxuICAgICAgICAgICAgc3BlYy5pc1ZpZGVvRW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgYWRzTG9hZGVyLmNvbnRlbnRDb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmlzQXV0b1BsYXlTdXBwb3J0Q2hlY2tUaW1lID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5jaGVja0F1dG9wbGF5U3RhcnQ7XG4gICAgfVxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgaWYoYWRzTG9hZGVyKXtcbiAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEU19NQU5BR0VSX0xPQURFRCwgT25NYW5hZ2VyTG9hZGVkKTtcbiAgICAgICAgICAgIGFkc0xvYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKEFEX0VSUk9SLCBPbkFkRXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoYWRzTWFuYWdlcil7XG5cbiAgICAgICAgICAgIGFkc01hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGFkRGlzcGxheUNvbnRhaW5lcil7XG4gICAgICAgICAgICBhZERpc3BsYXlDb250YWluZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGxpc3RlbmVyKXtcbiAgICAgICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0ICRhZHMgPSBMQSQocGxheWVyQ29uZmlnLmdldENvbnRhaW5lcigpKS5maW5kKFwiLm92cC1hZHNcIik7XG4gICAgICAgIGlmKCRhZHMpe1xuICAgICAgICAgICAgJGFkcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci5vZmYoQ09OVEVOVF9WT0xVTUUsIG51bGwsIHRoYXQpO1xuXG5cbiAgICB9O1xuXG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgQWRzOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDEwLzA0LzIwMTkuXG4gKi9cbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX0FEX0xPQURFRCxcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBTVEFURV9BRF9DT01QTEVURSxcbiAgICBBRF9DSEFOR0VELFxuICAgIEFEX1RJTUUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUExBWUVSX1NUQVRFLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGFkc01hbmFnZXIsIHByb3ZpZGVyLCBhZHNTcGVjLCBPbkFkRXJyb3Ipe1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGxvd0xldmVsRXZlbnRzID0ge307XG5cbiAgICBsZXQgaW50ZXJ2YWxUaW1lciA9IG51bGw7XG5cbiAgICBjb25zdCBBRF9CVUZGRVJJTkcgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BRF9CVUZGRVJJTkc7XG4gICAgY29uc3QgQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRDtcbiAgICBjb25zdCBDT05URU5UX1JFU1VNRV9SRVFVRVNURUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQ7XG4gICAgY29uc3QgQURfRVJST1IgPSBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SO1xuICAgIGNvbnN0IEFMTF9BRFNfQ09NUExFVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQ7XG4gICAgY29uc3QgQ0xJQ0sgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DTElDSztcbiAgICBjb25zdCBTS0lQUEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU0tJUFBFRDtcbiAgICBjb25zdCBDT01QTEVURSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFO1xuICAgIGNvbnN0IEZJUlNUX1FVQVJUSUxFPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5GSVJTVF9RVUFSVElMRTtcbiAgICBjb25zdCBMT0FERUQgPSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQ7XG4gICAgY29uc3QgTUlEUE9JTlQ9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLk1JRFBPSU5UO1xuICAgIGNvbnN0IFBBVVNFRCA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlBBVVNFRDtcbiAgICBjb25zdCBSRVNVTUVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuUkVTVU1FRDtcbiAgICBjb25zdCBTVEFSVEVEID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU1RBUlRFRDtcbiAgICBjb25zdCBVU0VSX0NMT1NFID0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuVVNFUl9DTE9TRTtcbiAgICBjb25zdCBUSElSRF9RVUFSVElMRSA9IGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlRISVJEX1FVQVJUSUxFO1xuXG4gICAgbGV0IGlzQWxsQWRDb21wZWxldGUgPSBmYWxzZTsgICAvL1Bvc3Qgcm9sbOydhCDsnITtlbRcbiAgICBsZXQgYWRDb21wbGV0ZUNhbGxiYWNrID0gbnVsbDtcbiAgICBsZXQgY3VycmVudEFkID0gbnVsbDtcblxuICAgICBsb3dMZXZlbEV2ZW50c1tDT05URU5UX1BBVVNFX1JFUVVFU1RFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgLy9UaGlzIGNhbGxscyB3aGVuIHBsYXllciBpcyBwbGF5aW5nIGNvbnRlbnRzIGZvciBhZC5cbiAgICAgICAgIGlmKGFkc1NwZWMuc3RhcnRlZCl7XG4gICAgICAgICAgICAgYWRzU3BlYy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG4gICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHNbQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICAvL1RoaXMgY2FsbHMgd2hlbiBvbmUgYWQgZW5kZWQuXG4gICAgICAgIC8vQW5kIHRoaXMgaXMgc2lnbmFsIHdoYXQgcGxheSB0aGUgY29udGVudHMuXG4gICAgICAgIGFkc1NwZWMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgaWYoYWRzU3BlYy5zdGFydGVkICYmIChwcm92aWRlci5nZXRQb3NpdGlvbigpID09PSAwIHx8ICFhZHNTcGVjLmlzVmlkZW9FbmRlZCkgICl7XG4gICAgICAgICAgICBwcm92aWRlci5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQURfRVJST1JdID0gT25BZEVycm9yO1xuXG4gICAgbG93TGV2ZWxFdmVudHNbQUxMX0FEU19DT01QTEVURURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBTExfQURTX0NPTVBMRVRFRFwiKTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgaXNBbGxBZENvbXBlbGV0ZSA9IHRydWU7XG4gICAgICAgIGlmKGFkc1NwZWMuaXNWaWRlb0VuZGVkKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQ0xJQ0tdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tGSVJTVF9RVUFSVElMRV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuICAgIC8vXG4gICAgbG93TGV2ZWxFdmVudHNbQURfQlVGRkVSSU5HXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQURfQlVGRkVSSU5HXCIpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBRF9CVUZGRVJJTkdcIixhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbTE9BREVEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTE9BREVEXCIpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgbGV0IHJlbWFpbmluZ1RpbWUgPSBhZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICAvKnZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgdHlwZSA6XCJhZFwiXG4gICAgICAgIH07Ki9cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9MT0FERUQsIHtyZW1haW5pbmcgOiByZW1haW5pbmdUaW1lLCBpc0xpbmVhciA6IGFkLmlzTGluZWFyKCkgfSk7XG5cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW01JRFBPSU5UXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbUEFVU0VEXSA9IChhZEV2ZW50KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9BRF9QQVVTRUQpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbUkVTVU1FRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHNbU1RBUlRFRF0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNUQVJURURcIik7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhhZEV2ZW50LnR5cGUpO1xuICAgICAgICBsZXQgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG4gICAgICAgIGN1cnJlbnRBZCA9IGFkO1xuXG4gICAgICAgIGxldCBhZE9iamVjdCA9IHtcbiAgICAgICAgICAgIGlzTGluZWFyIDogYWQuaXNMaW5lYXIoKSAsXG4gICAgICAgICAgICBkdXJhdGlvbiA6IGFkLmdldER1cmF0aW9uKCksXG4gICAgICAgICAgICBza2lwVGltZU9mZnNldCA6IGFkLmdldFNraXBUaW1lT2Zmc2V0KCkgICAgIC8vVGhlIG51bWJlciBvZiBzZWNvbmRzIG9mIHBsYXliYWNrIGJlZm9yZSB0aGUgYWQgYmVjb21lcyBza2lwcGFibGUuXG4gICAgICAgIH07XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQURfQ0hBTkdFRCwgYWRPYmplY3QpO1xuXG5cbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcblxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQURfUExBWUlORyk7XG4gICAgICAgICAgICBhZHNTcGVjLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgLy8gRm9yIGEgbGluZWFyIGFkLCBhIHRpbWVyIGNhbiBiZSBzdGFydGVkIHRvIHBvbGwgZm9yXG4gICAgICAgICAgICAvLyB0aGUgcmVtYWluaW5nIHRpbWUuXG4gICAgICAgICAgICBpbnRlcnZhbFRpbWVyID0gc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1haW5pbmdUaW1lID0gYWRzTWFuYWdlci5nZXRSZW1haW5pbmdUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGFkLmdldER1cmF0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihBRF9USU1FLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiA6IGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcFRpbWVPZmZzZXQgOiBhZC5nZXRTa2lwVGltZU9mZnNldCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nIDogcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogZHVyYXRpb24gLSByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpcHBhYmxlIDogYWRzTWFuYWdlci5nZXRBZFNraXBwYWJsZVN0YXRlKClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAzMDApOyAvLyBldmVyeSAzMDBtc1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHNbQ09NUExFVEVdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICAvL1VzZXIgc2tpcHBlZCBhZC4gc2FtZSBwcm9jZXNzIG9uIGNvbXBsZXRlLlxuICAgIGxvd0xldmVsRXZlbnRzW1NLSVBQRURdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG5cbiAgICAgICAgbGV0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuICAgICAgICBpZiAoYWQuaXNMaW5lYXIoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzW1VTRVJfQ0xPU0VdID0gKGFkRXZlbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKGFkRXZlbnQudHlwZSk7XG4gICAgICAgIGxldCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcbiAgICAgICAgaWYgKGFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihTVEFURV9BRF9DT01QTEVURSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50c1tUSElSRF9RVUFSVElMRV0gPSAoYWRFdmVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coYWRFdmVudC50eXBlKTtcbiAgICB9O1xuXG5cbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICBhZHNNYW5hZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgfSk7XG4gICAgdGhhdC5zZXRBZENvbXBsZXRlQ2FsbGJhY2sgPSAoX2FkQ29tcGxldGVDYWxsYmFjaykgPT4ge1xuICAgICAgICBhZENvbXBsZXRlQ2FsbGJhY2sgPSBfYWRDb21wbGV0ZUNhbGxiYWNrO1xuICAgIH07XG4gICAgdGhhdC5pc0FsbEFkQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBpc0FsbEFkQ29tcGVsZXRlO1xuICAgIH07XG4gICAgdGhhdC5pc0xpbmVhckFkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gY3VycmVudEFkICA/IGN1cnJlbnRBZC5pc0xpbmVhcigpIDogdHJ1ZTtcbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBZHNFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFNUQVRFX0FEX0NPTVBMRVRFKTtcbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGFkc01hbmFnZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTIuLlxuICovXG5pbXBvcnQge0VSUk9SLCBTVEFURV9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VmlkZW9FbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudE9yTXNlKSB7XG4gICAgaWYoXy5pc0VsZW1lbnQoZWxlbWVudE9yTXNlKSl7XG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2U7XG4gICAgfVxuICAgIGlmKGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQpe1xuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLmdldFZpZGVvRWxlbWVudCgpO1xuICAgIH1lbHNlIGlmKGVsZW1lbnRPck1zZS5tZWRpYSl7XG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2UubWVkaWE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlcGFyYXRlTGl2ZSA9IGZ1bmN0aW9uKG1zZSkge1xuICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxuXG4gICAgaWYobXNlICYmIG1zZS5pc0R5bmFtaWMpe1xuICAgICAgICByZXR1cm4gbXNlLmlzRHluYW1pYygpO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGVycm9yVHJpZ2dlciA9IGZ1bmN0aW9uKGVycm9yLCBwcm92aWRlcil7XG4gICAgaWYocHJvdmlkZXIpe1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XG4gICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yICk7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgY29uc3QgcGlja0N1cnJlbnRTb3VyY2UgPSAoc291cmNlcywgY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKSA9PiB7XG4gICAgbGV0IHNvdXJjZUluZGV4ID0gTWF0aC5tYXgoMCwgY3VycmVudFNvdXJjZSk7XG4gICAgY29uc3QgbGFiZWwgPVwiXCI7XG4gICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgc291cmNlSW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2VJbmRleDtcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==