/*! OvenPlayerv0.9.5956 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.RtmpProvider"],{

/***/ "./src/js/api/provider/flash/Listener.js":
/*!***********************************************!*\
  !*** ./src/js/api/provider/flash/Listener.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var Listener = function Listener(elFlash, provider, videoEndedCallback) {
    var that = {};

    that.isJSReady = function () {
        return true;
    };
    that.timeupdate = function (data) {

        elFlash.currentTime = data.position;
        provider.trigger(_constants.CONTENT_TIME, data);
        //provider.trigger(CONTENT_BUFFER, data);
        //data.duration-1 : this is trick. because sometimes rtmp's position < duration when video ended.
        if (data.position >= data.duration - 1) {
            if (provider.getState() !== _constants.STATE_IDLE && provider.getState() !== _constants.STATE_COMPLETE) {
                if (videoEndedCallback) {
                    videoEndedCallback(function () {
                        provider.setState(_constants.STATE_COMPLETE);
                    });
                } else {
                    provider.setState(_constants.STATE_COMPLETE);
                }
            }
        }
    };
    that.volumeChanged = function (data) {
        provider.trigger(_constants.CONTENT_VOLUME, data);
    };
    that.stateChanged = function (data) {
        provider.setState(data.newstate);
    };
    that.metaChanged = function (data) {
        provider.trigger(_constants.CONTENT_META, data);
    };
    that.error = function (error) {
        provider.setState(_constants.STATE_ERROR);
        provider.pause();

        //PRIVATE_STATE_ERROR
        provider.trigger(_constants.ERROR, error);
    };
    return that;
}; /**
    * Created by hoho on 2018. 8. 27..
    */
exports["default"] = Listener;

/***/ }),

/***/ "./src/js/api/provider/flash/Provider.js":
/*!***********************************************!*\
  !*** ./src/js/api/provider/flash/Provider.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Ads = __webpack_require__(/*! api/provider/ads/Ads */ "./src/js/api/provider/ads/Ads.js");

var _Ads2 = _interopRequireDefault(_Ads);

var _EventEmitter = __webpack_require__(/*! api/EventEmitter */ "./src/js/api/EventEmitter.js");

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _Listener = __webpack_require__(/*! api/provider/flash/Listener */ "./src/js/api/provider/flash/Listener.js");

var _Listener2 = _interopRequireDefault(_Listener);

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   Core For Flash Video.
 * @param   spec member value
 * @param   playerConfig  player config
 * */

var Provider = function Provider(spec, playerConfig) {
    OvenPlayerConsole.log("CORE loaded. ");

    var that = {};
    (0, _EventEmitter2["default"])(that);

    var elFlash = spec.element;
    var ads = null,
        listener = null,
        videoEndedCallback = null;

    //It means to support ad for flash. Set the same specifications like a Video Tag.
    Object.defineProperty(elFlash, 'currentTime', { value: 0, writable: true });

    if (spec.adTagUrl) {
        ads = (0, _Ads2["default"])(elFlash, that, playerConfig, spec.adTagUrl);
        if (!ads) {
            console.log("Can not load due to google ima for Ads.");
        }
    }
    listener = (0, _Listener2["default"])(elFlash, that, ads ? ads.videoEndedCallback : null);

    var _load = function _load(lastPlayPosition) {
        var source = spec.sources[spec.currentSource];
        OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : " + lastPlayPosition);
        var previousSource = elFlash.getCurrentSource();
        var sourceChanged = source.file !== previousSource;
        if (sourceChanged) {
            elFlash.load(source.file);
        } else if (lastPlayPosition === 0 && that.getPosition() > 0) {
            that.seek(lastPlayPosition);
        }
    };
    //Flash has two init states. FlashLoaded and FileLoaded.
    //_load calls after FlashLoaded. _afterLoad calls after FileLoaded.
    var _afterLoad = function _afterLoad(lastPlayPosition) {
        if (lastPlayPosition > 0) {
            if (!playerConfig.isAutoStart()) {
                that.play();
            }
            that.seek(lastPlayPosition);
        }
        if (playerConfig.isAutoStart()) {

            that.play();
        }
    };

    //This is why. Flash does not self trig to ads,lmalm,
    that.triggerEventFromExternal = function (funcName, funcData) {
        if (listener[funcName]) {
            return listener[funcName](funcData);
        } else {
            return null;
        }
    };
    that.getName = function () {
        return spec.name;
    };

    that.canSeek = function () {
        return spec.canSeek;
    };
    that.setCanSeek = function (canSeek) {
        spec.canSeek = canSeek;
    };
    that.isSeeking = function () {
        return spec.seeking;
    };
    that.setSeeking = function (seeking) {
        spec.seeking = seeking;
    };

    that.setState = function (newState) {
        if (spec.state !== newState) {
            var prevState = spec.state;
            //ToDo : This is temporary code. avoid background content error.
            if (prevState === _constants.STATE_AD_PLAYING && (newState === _constants.STATE_ERROR || newState === _constants.STATE_IDLE)) {
                return false;
            }

            if (ads && ads.isAutoPlaySupportCheckTime()) {
                //Ads checks checkAutoplaySupport().
                //It calls real play() and pause().
                //And then this triggers "playing" and "pause".
                //I prevent these process.
            } else {
                switch (newState) {
                    case _constants.STATE_COMPLETE:
                        that.trigger(_constants.PLAYER_COMPLETE);
                        break;
                    case _constants.STATE_PAUSED:
                        that.trigger(_constants.PLAYER_PAUSE, {
                            prevState: spec.state,
                            newstate: _constants.STATE_PAUSED
                        });
                        break;
                    case _constants.STATE_AD_PAUSED:
                        that.trigger(_constants.PLAYER_PAUSE, {
                            prevState: spec.state,
                            newstate: _constants.STATE_AD_PAUSED
                        });
                        break;
                    case _constants.STATE_PLAYING:
                        that.trigger(_constants.PLAYER_PLAY, {
                            prevState: spec.state,
                            newstate: _constants.STATE_PLAYING
                        });
                    case _constants.STATE_AD_PLAYING:
                        that.trigger(_constants.PLAYER_PLAY, {
                            prevState: spec.state,
                            newstate: _constants.STATE_AD_PLAYING
                        });
                        break;
                }
                spec.state = newState;
                that.trigger(_constants.PLAYER_STATE, {
                    prevstate: prevState,
                    newstate: spec.state
                });
            }
        }
    };
    that.getState = function () {
        return spec.state;
    };
    that.setBuffer = function (newBuffer) {};
    that.getBuffer = function () {
        if (!elFlash) {
            return;
        }
        return elFlash.getBuffer ? elFlash.getBuffer() : null;
    };
    that.getDuration = function () {
        if (!elFlash) {
            return;
        }
        return elFlash.getDuration ? elFlash.getDuration() : 0;
    };
    that.getPosition = function () {
        if (!elFlash) {
            return;
        }
        return elFlash.getPosition ? elFlash.getPosition() : 0;
    };
    that.setVolume = function (volume) {
        if (!elFlash) {
            return;
        }
        return elFlash.setVolume ? elFlash.setVolume(volume) : 0;
    };
    that.getVolume = function () {
        if (!elFlash) {
            return;
        }
        return elFlash.setVolume ? elFlash.getVolume() : 0;
    };
    that.setMute = function () {
        if (!elFlash) {
            return;
        }
        elFlash.setMute();
    };
    that.getMute = function () {
        if (!elFlash) {
            return;
        }
        return elFlash.getMute ? elFlash.getMute() : false;
    };

    that.preload = function (sources, lastPlayPosition) {
        OvenPlayerConsole.log("CORE : preload() ", sources, lastPlayPosition);
        var retryCount = 0;

        spec.sources = sources;
        spec.currentSource = (0, _utils.pickCurrentSource)(sources, spec.currentSource, playerConfig);

        return new Promise(function (resolve, reject) {
            //First : checkSwfIsReady -> It checks swf loading complete by polling.
            //Second : checkFileLoaded -> It checks src loading complete by polling too.
            //Why complex is it? -> It againsts flash timing issue.
            (function checkSwfIsReady() {
                retryCount++;
                if (elFlash.isFlashReady && elFlash.isFlashReady()) {
                    Object.defineProperty(elFlash, 'duration', { value: elFlash.getDuration() });
                    _load(lastPlayPosition || 0);
                    retryCount = 0;

                    return function checkFileLoaded() {
                        retryCount++;
                        if (elFlash.isFileLoaded && elFlash.isFileLoaded()) {
                            _afterLoad(lastPlayPosition);
                            if (playerConfig.isMute()) {
                                that.setMute(true);
                            }
                            if (playerConfig.getVolume() && playerConfig.getVolume() < 100) {
                                that.setVolume(playerConfig.getVolume());
                            }

                            return resolve();
                        } else {

                            if (retryCount < 300) {
                                setTimeout(checkFileLoaded, 100);
                            } else {
                                return reject(_constants.ERRORS[_constants.INIT_RTMP_SETUP_ERROR]);
                            }
                        }
                    }();
                } else {
                    if (retryCount < 100) {
                        setTimeout(checkSwfIsReady, 100);
                    } else {
                        return reject(_constants.ERRORS[_constants.INIT_RTMP_SETUP_ERROR]);
                    }
                }
            })();
        });
    };
    that.load = function (sources) {
        spec.sources = sources;
        spec.currentSource = (0, _utils.pickCurrentSource)(sources, spec.currentSource, playerConfig);
        _load(0); //spec.sources_.starttime ||
        _afterLoad(0);
    };

    that.play = function () {
        if (!elFlash) {
            return false;
        }
        if (that.getState() !== _constants.STATE_PLAYING) {
            if (ads && ads.isActive() || ads && !ads.started()) {
                ads.play();
            } else {
                elFlash.play();
            }
        }
    };
    that.pause = function () {
        if (!elFlash) {
            return false;
        }
        if (that.getState() === _constants.STATE_PLAYING) {
            elFlash.pause();
        } else if (that.getState() === _constants.STATE_AD_PLAYING) {
            ads.pause();
        }
    };
    that.seek = function (position) {
        elFlash.seek(position);
    };
    that.setPlaybackRate = function (playbackRate) {
        return 0;
    };
    that.getPlaybackRate = function () {
        return 0;
    };
    that.getSources = function () {
        if (!elFlash) {
            return [];
        }

        return spec.sources.map(function (source, index) {
            return {
                file: source.file,
                type: source.type,
                label: source.label,
                index: index
            };
        });
    };
    that.getCurrentSource = function () {
        return spec.currentSource;
    };
    that.setCurrentSource = function (sourceIndex, needProviderChange) {
        if (spec.currentQuality === sourceIndex) {
            return false;
        }

        if (sourceIndex > -1) {
            if (spec.sources && spec.sources.length > sourceIndex) {
                that.pause();
                that.setState(_constants.STATE_IDLE);
                OvenPlayerConsole.log("source changed : " + sourceIndex);
                spec.currentSource = sourceIndex;

                that.trigger(_constants.CONTENT_SOURCE_CHANGED, {
                    currentSource: sourceIndex
                });

                playerConfig.setSourceLabel(spec.sources[sourceIndex].label);
                if (needProviderChange) {
                    var lastPlayPosition = elFlash.getCurrentTime() || 0;
                    var retryCount = 0;
                    _load(lastPlayPosition);

                    (function checkFileLoaded() {
                        retryCount++;
                        if (elFlash.isFileLoaded && elFlash.isFileLoaded()) {
                            _afterLoad(lastPlayPosition);
                        } else {

                            if (retryCount < 300) {
                                setTimeout(checkFileLoaded, 100);
                            } else {
                                console.log("FileLoad Faiul");
                            }
                        }
                    })();
                }
                return spec.currentSource;
            }
        }
    };

    that.getQualityLevels = function () {
        if (!elFlash) {
            return [];
        }
        return spec.qualityLevels;
    };
    that.getCurrentQuality = function () {
        if (!elFlash) {
            return null;
        }
        return spec.currentQuality;
    };
    that.setCurrentQuality = function (qualityIndex) {
        //Do nothing
    };
    that.isAutoQuality = function () {
        //Do nothing
    };
    that.setAutoQuality = function (isAuto) {
        //Do nothing
    };
    that.getFramerate = function () {
        return spec.framerate;
    };
    that.setFramerate = function (framerate) {
        return spec.framerate = framerate;
    };
    that.seekFrame = function (frameCount) {
        var fps = spec.framerate;
        var currentFrames = elFlash.getCurrentTime() * fps;
        var newPosition = (currentFrames + frameCount) / fps;
        newPosition = newPosition + 0.00001; // FIXES A SAFARI SEEK ISSUE. myVdieo.currentTime = 0.04 would give SMPTE 00:00:00:00 wheras it should give 00:00:00:01

        that.pause();
        that.seek(newPosition);
    };

    that.stop = function () {
        OvenPlayerConsole.log("CORE : stop() ");
        elFlash.stop();
    };

    that.destroy = function () {
        OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied");
        that.stop();

        /*try{
            elFlash.remove();
        }catch(error){
            console.log(error);
        }*/

        if (ads) {
            ads.destroy();
        }
        that.off();
    };

    //XXX : I hope using es6 classes. but I think to occur problem from Old IE. Then I choice function inherit. Finally using super function is so difficult.
    // use : let super_destroy  = that.super('destroy'); ... super_destroy();
    that["super"] = function (name) {
        var method = that[name];
        return function () {
            return method.apply(that, arguments);
        };
    };
    return that;
}; /**
    * Created by hoho on 2018. 8. 23..
    */
exports["default"] = Provider;

/***/ }),

/***/ "./src/js/api/provider/flash/providers/Rtmp.js":
/*!*****************************************************!*\
  !*** ./src/js/api/provider/flash/providers/Rtmp.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _Provider = __webpack_require__(/*! api/provider/flash/Provider */ "./src/js/api/provider/flash/Provider.js");

var _Provider2 = _interopRequireDefault(_Provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   rtmp provider
 * @param   element video element.
 * @param   playerConfig    config.
 * */

/**
 * Created by hoho on 2018. 8. 23..
 */
var Rtmp = function Rtmp(element, playerConfig, adTagUrl) {
    var that = {};
    var superDestroy_func = null;

    var spec = {
        name: _constants.PROVIDER_RTMP,
        element: element,
        mse: null,
        listener: null,
        canSeek: false,
        isLive: false,
        seeking: false,
        state: _constants.STATE_IDLE,
        buffer: 0,
        framerate: 0,
        currentQuality: -1,
        currentSource: -1,
        qualityLevels: [],
        sources: [],
        adTagUrl: adTagUrl
    };

    that = (0, _Provider2["default"])(spec, playerConfig, null);
    superDestroy_func = that["super"]('destroy');

    OvenPlayerConsole.log("RTMP PROVIDER LOADED.");

    that.destroy = function () {
        OvenPlayerConsole.log("RTMP : PROVIDER DESTROYED.");
        superDestroy_func();
    };

    return that;
};

exports["default"] = Rtmp;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcC5qcyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImVsRmxhc2giLCJwcm92aWRlciIsInZpZGVvRW5kZWRDYWxsYmFjayIsInRoYXQiLCJpc0pTUmVhZHkiLCJ0aW1ldXBkYXRlIiwiZGF0YSIsImN1cnJlbnRUaW1lIiwicG9zaXRpb24iLCJ0cmlnZ2VyIiwiQ09OVEVOVF9USU1FIiwiZHVyYXRpb24iLCJnZXRTdGF0ZSIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsInNldFN0YXRlIiwidm9sdW1lQ2hhbmdlZCIsIkNPTlRFTlRfVk9MVU1FIiwic3RhdGVDaGFuZ2VkIiwibmV3c3RhdGUiLCJtZXRhQ2hhbmdlZCIsIkNPTlRFTlRfTUVUQSIsImVycm9yIiwiU1RBVEVfRVJST1IiLCJwYXVzZSIsIkVSUk9SIiwiUHJvdmlkZXIiLCJzcGVjIiwicGxheWVyQ29uZmlnIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJlbGVtZW50IiwiYWRzIiwibGlzdGVuZXIiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwid3JpdGFibGUiLCJhZFRhZ1VybCIsImNvbnNvbGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJzb3VyY2VzIiwiY3VycmVudFNvdXJjZSIsInByZXZpb3VzU291cmNlIiwiZ2V0Q3VycmVudFNvdXJjZSIsInNvdXJjZUNoYW5nZWQiLCJmaWxlIiwibG9hZCIsImdldFBvc2l0aW9uIiwic2VlayIsIl9hZnRlckxvYWQiLCJpc0F1dG9TdGFydCIsInBsYXkiLCJ0cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwiLCJmdW5jTmFtZSIsImZ1bmNEYXRhIiwiZ2V0TmFtZSIsIm5hbWUiLCJjYW5TZWVrIiwic2V0Q2FuU2VlayIsImlzU2Vla2luZyIsInNlZWtpbmciLCJzZXRTZWVraW5nIiwibmV3U3RhdGUiLCJzdGF0ZSIsInByZXZTdGF0ZSIsIlNUQVRFX0FEX1BMQVlJTkciLCJpc0F1dG9QbGF5U3VwcG9ydENoZWNrVGltZSIsIlBMQVlFUl9DT01QTEVURSIsIlNUQVRFX1BBVVNFRCIsIlBMQVlFUl9QQVVTRSIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX1BMQVlJTkciLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsInNldEJ1ZmZlciIsIm5ld0J1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0TXV0ZSIsImdldE11dGUiLCJwcmVsb2FkIiwicmV0cnlDb3VudCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2hlY2tTd2ZJc1JlYWR5IiwiaXNGbGFzaFJlYWR5IiwiY2hlY2tGaWxlTG9hZGVkIiwiaXNGaWxlTG9hZGVkIiwiaXNNdXRlIiwic2V0VGltZW91dCIsIkVSUk9SUyIsIklOSVRfUlRNUF9TRVRVUF9FUlJPUiIsImlzQWN0aXZlIiwic3RhcnRlZCIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsImdldFNvdXJjZXMiLCJtYXAiLCJpbmRleCIsInR5cGUiLCJsYWJlbCIsInNldEN1cnJlbnRTb3VyY2UiLCJzb3VyY2VJbmRleCIsIm5lZWRQcm92aWRlckNoYW5nZSIsImN1cnJlbnRRdWFsaXR5IiwibGVuZ3RoIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsInNldFNvdXJjZUxhYmVsIiwiZ2V0Q3VycmVudFRpbWUiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRGcmFtZXJhdGUiLCJmcmFtZXJhdGUiLCJzZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZnBzIiwiY3VycmVudEZyYW1lcyIsIm5ld1Bvc2l0aW9uIiwic3RvcCIsImRlc3Ryb3kiLCJvZmYiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyIsIlJ0bXAiLCJzdXBlckRlc3Ryb3lfZnVuYyIsIlBST1ZJREVSX1JUTVAiLCJtc2UiLCJpc0xpdmUiLCJidWZmZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7O0FBNkJBLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFTQyxPQUFULEVBQWtCQyxRQUFsQixFQUE0QkMsa0JBQTVCLEVBQStDO0FBQzVELFFBQUlDLE9BQU8sRUFBWDs7QUFFQUEsU0FBS0MsU0FBTCxHQUFpQixZQUFLO0FBQ2xCLGVBQU8sSUFBUDtBQUNILEtBRkQ7QUFHQUQsU0FBS0UsVUFBTCxHQUFrQixVQUFDQyxJQUFELEVBQVM7O0FBRXZCTixnQkFBUU8sV0FBUixHQUFzQkQsS0FBS0UsUUFBM0I7QUFDQVAsaUJBQVNRLE9BQVQsQ0FBaUJDLHVCQUFqQixFQUErQkosSUFBL0I7QUFDQTtBQUNBO0FBQ0EsWUFBR0EsS0FBS0UsUUFBTCxJQUFrQkYsS0FBS0ssUUFBTCxHQUFjLENBQW5DLEVBQXNDO0FBQ2xDLGdCQUFHVixTQUFTVyxRQUFULE9BQXdCQyxxQkFBeEIsSUFBc0NaLFNBQVNXLFFBQVQsT0FBd0JFLHlCQUFqRSxFQUFnRjtBQUM1RSxvQkFBR1osa0JBQUgsRUFBc0I7QUFDbEJBLHVDQUFtQixZQUFVO0FBQ3pCRCxpQ0FBU2MsUUFBVCxDQUFrQkQseUJBQWxCO0FBQ0gscUJBRkQ7QUFHSCxpQkFKRCxNQUlLO0FBQ0RiLDZCQUFTYyxRQUFULENBQWtCRCx5QkFBbEI7QUFDSDtBQUVKO0FBQ0o7QUFDSixLQWxCRDtBQW1CQVgsU0FBS2Es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SSxJQUFiLEVBQW1Cd0ksU0FBbkIsQ0FBUDtBQUNILFNBRkQ7QUFHSCxLQUxEO0FBTUEsV0FBT3hJLElBQVA7QUFDSCxDQTNZRCxDLENBdEJBOzs7cUJBb2FldUIsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDamFmOztBQUNBOzs7Ozs7QUFDQTs7Ozs7O0FBTEE7OztBQVlBLElBQU1rSCxPQUFPLFNBQVBBLElBQU8sQ0FBUzdHLE9BQVQsRUFBa0JILFlBQWxCLEVBQWdDVSxRQUFoQyxFQUF5QztBQUNsRCxRQUFJbkMsT0FBTyxFQUFYO0FBQ0EsUUFBSTBJLG9CQUFvQixJQUF4Qjs7QUFFQSxRQUFJbEgsT0FBTztBQUNQZ0MsY0FBT21GLHdCQURBO0FBRVAvRyxpQkFBVUEsT0FGSDtBQUdQZ0gsYUFBTSxJQUhDO0FBSVA5RyxrQkFBVyxJQUpKO0FBS1AyQixpQkFBVSxLQUxIO0FBTVBvRixnQkFBUyxLQU5GO0FBT1BqRixpQkFBVSxLQVBIO0FBUVBHLGVBQVFyRCxxQkFSRDtBQVNQb0ksZ0JBQVMsQ0FURjtBQVVQbEIsbUJBQVksQ0FWTDtBQVdQZCx3QkFBaUIsQ0FBQyxDQVhYO0FBWVByRSx1QkFBZ0IsQ0FBQyxDQVpWO0FBYVAyRSx1QkFBZ0IsRUFiVDtBQWNQNUUsaUJBQVUsRUFkSDtBQWVQTCxrQkFBV0E7QUFmSixLQUFYOztBQWtCQW5DLFdBQU8sMkJBQVN3QixJQUFULEVBQWVDLFlBQWYsRUFBNkIsSUFBN0IsQ0FBUDtBQUNBaUgsd0JBQXFCMUksY0FBVyxTQUFYLENBQXJCOztBQUVBMEIsc0JBQWtCQyxHQUFsQixDQUFzQix1QkFBdEI7O0FBRUEzQixTQUFLb0ksT0FBTCxHQUFlLFlBQUs7QUFDaEIxRywwQkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QjtBQUNBK0c7QUFDSCxLQUhEOztBQUtBLFdBQU8xSSxJQUFQO0FBQ0gsQ0FqQ0Q7O3FCQW9DZXlJLEkiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNy4uXG4gKi9cbmltcG9ydCB7XG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsXG4gICAgUFJPVklERVJfSFRNTDUsXG4gICAgUFJPVklERVJfV0VCUlRDLFxuICAgIFBST1ZJREVSX0RBU0gsXG4gICAgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxGbGFzaCwgcHJvdmlkZXIsIHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgbGV0IHRoYXQgPSB7fTtcblxuICAgIHRoYXQuaXNKU1JlYWR5ID0gKCkgPT57XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgdGhhdC50aW1ldXBkYXRlID0gKGRhdGEpID0+e1xuXG4gICAgICAgIGVsRmxhc2guY3VycmVudFRpbWUgPSBkYXRhLnBvc2l0aW9uO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwgZGF0YSk7XG4gICAgICAgIC8vcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwgZGF0YSk7XG4gICAgICAgIC8vZGF0YS5kdXJhdGlvbi0xIDogdGhpcyBpcyB0cmljay4gYmVjYXVzZSBzb21ldGltZXMgcnRtcCdzIHBvc2l0aW9uIDwgZHVyYXRpb24gd2hlbiB2aWRlbyBlbmRlZC5cbiAgICAgICAgaWYoZGF0YS5wb3NpdGlvbiA+PSAoZGF0YS5kdXJhdGlvbi0xKSl7XG4gICAgICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9JRExFICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0NPTVBMRVRFKXtcbiAgICAgICAgICAgICAgICBpZih2aWRlb0VuZGVkQ2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICB2aWRlb0VuZGVkQ2FsbGJhY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC52b2x1bWVDaGFuZ2VkID0gKGRhdGEpID0+e1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVk9MVU1FLCBkYXRhKTtcbiAgICB9O1xuICAgIHRoYXQuc3RhdGVDaGFuZ2VkID0gKGRhdGEpID0+e1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShkYXRhLm5ld3N0YXRlKTtcbiAgICB9O1xuICAgIHRoYXQubWV0YUNoYW5nZWQgPSAoZGF0YSkgPT57XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBkYXRhKTtcbiAgICB9O1xuICAgIHRoYXQuZXJyb3IgPSAoZXJyb3IpID0+e1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XG4gICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG5cbiAgICAgICAgLy9QUklWQVRFX1NUQVRFX0VSUk9SXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yKTtcblxuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDIzLi5cbiAqL1xuaW1wb3J0IEFkcyBmcm9tIFwiYXBpL3Byb3ZpZGVyL2Fkcy9BZHNcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcbmltcG9ydCBFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2ZsYXNoL0xpc3RlbmVyXCI7XG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIHNlcGFyYXRlTGl2ZSwgcGlja0N1cnJlbnRTb3VyY2V9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgRVJST1JTLCBJTklUX1JUTVBfU0VUVVBfRVJST1IsXG4gICAgU1RBVEVfSURMRSwgU1RBVEVfUExBWUlORywgU1RBVEVfUEFVU0VELCBTVEFURV9DT01QTEVURSwgU1RBVEVfRVJST1IsXG4gICAgUExBWUVSX1NUQVRFLCBQTEFZRVJfQ09NUExFVEUsIFBMQVlFUl9QQVVTRSwgUExBWUVSX1BMQVksIFNUQVRFX0FEX1BMQVlJTkcsIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBDT05URU5UX1NPVVJDRV9DSEFOR0VELCBDT05URU5UX0xFVkVMX0NIQU5HRUQsIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELFxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBDb3JlIEZvciBGbGFzaCBWaWRlby5cbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcbiAqICovXG5cblxuY29uc3QgUHJvdmlkZXIgPSBmdW5jdGlvbihzcGVjLCBwbGF5ZXJDb25maWcpe1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgbG9hZGVkLiBcIik7XG5cbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcblxuICAgIGxldCBlbEZsYXNoID0gc3BlYy5lbGVtZW50O1xuICAgIGxldCBhZHMgPSBudWxsLCBsaXN0ZW5lciA9IG51bGwsIHZpZGVvRW5kZWRDYWxsYmFjayA9IG51bGw7XG5cbiAgICAvL0l0IG1lYW5zIHRvIHN1cHBvcnQgYWQgZm9yIGZsYXNoLiBTZXQgdGhlIHNhbWUgc3BlY2lmaWNhdGlvbnMgbGlrZSBhIFZpZGVvIFRhZy5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxGbGFzaCwgJ2N1cnJlbnRUaW1lJyxcbiAgICAgICAge3ZhbHVlIDowLCB3cml0YWJsZSA6IHRydWV9XG4gICAgKTtcblxuICAgIGlmKHNwZWMuYWRUYWdVcmwpe1xuICAgICAgICBhZHMgPSBBZHMoZWxGbGFzaCwgdGhhdCwgcGxheWVyQ29uZmlnLCBzcGVjLmFkVGFnVXJsKTtcbiAgICAgICAgaWYoIWFkcyl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhbiBub3QgbG9hZCBkdWUgdG8gZ29vZ2xlIGltYSBmb3IgQWRzLlwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKGVsRmxhc2gsIHRoYXQsIGFkcyA/IGFkcy52aWRlb0VuZGVkQ2FsbGJhY2sgOiBudWxsKTtcblxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAgc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV07XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBsb2FkZWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gZWxGbGFzaC5nZXRDdXJyZW50U291cmNlKCk7XG4gICAgICAgIGNvbnN0IHNvdXJjZUNoYW5nZWQgPSAoc291cmNlLmZpbGUgIT09IHByZXZpb3VzU291cmNlKTtcbiAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIGVsRmxhc2gubG9hZChzb3VyY2UuZmlsZSk7XG4gICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgdGhhdC5nZXRQb3NpdGlvbigpID4gMCl7XG4gICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgLy9GbGFzaCBoYXMgdHdvIGluaXQgc3RhdGVzLiBGbGFzaExvYWRlZCBhbmQgRmlsZUxvYWRlZC5cbiAgICAvL19sb2FkIGNhbGxzIGFmdGVyIEZsYXNoTG9hZGVkLiBfYWZ0ZXJMb2FkIGNhbGxzIGFmdGVyIEZpbGVMb2FkZWQuXG4gICAgY29uc3QgX2FmdGVyTG9hZCA9IGZ1bmN0aW9uKGxhc3RQbGF5UG9zaXRpb24pe1xuICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XG4gICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcblxuICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAvL1RoaXMgaXMgd2h5LiBGbGFzaCBkb2VzIG5vdCBzZWxmIHRyaWcgdG8gYWRzLGxtYWxtLFxuICAgIHRoYXQudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsID0gKGZ1bmNOYW1lLCBmdW5jRGF0YSkgPT4ge1xuICAgICAgICBpZihsaXN0ZW5lcltmdW5jTmFtZV0pe1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyW2Z1bmNOYW1lXShmdW5jRGF0YSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMubmFtZTtcbiAgICB9O1xuXG4gICAgdGhhdC5jYW5TZWVrID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5jYW5TZWVrO1xuICAgIH07XG4gICAgdGhhdC5zZXRDYW5TZWVrID0gKGNhblNlZWspID0+IHtcbiAgICAgICAgc3BlYy5jYW5TZWVrID0gY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuaXNTZWVraW5nID0gKCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuc2Vla2luZztcbiAgICB9O1xuICAgIHRoYXQuc2V0U2Vla2luZyA9IChzZWVraW5nKT0+e1xuICAgICAgICBzcGVjLnNlZWtpbmcgPSBzZWVraW5nO1xuICAgIH07XG5cbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XG4gICAgICAgIGlmKHNwZWMuc3RhdGUgIT09IG5ld1N0YXRlKXtcbiAgICAgICAgICAgIGxldCBwcmV2U3RhdGUgPSBzcGVjLnN0YXRlO1xuICAgICAgICAgICAgLy9Ub0RvIDogVGhpcyBpcyB0ZW1wb3JhcnkgY29kZS4gYXZvaWQgYmFja2dyb3VuZCBjb250ZW50IGVycm9yLlxuICAgICAgICAgICAgaWYocHJldlN0YXRlID09PSBTVEFURV9BRF9QTEFZSU5HICYmIChuZXdTdGF0ZSA9PT0gU1RBVEVfRVJST1IgfHwgbmV3U3RhdGUgPT09IFNUQVRFX0lETEUpICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmKGFkcyAmJiBhZHMuaXNBdXRvUGxheVN1cHBvcnRDaGVja1RpbWUoKSl7XG4gICAgICAgICAgICAgICAgLy9BZHMgY2hlY2tzIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkuXG4gICAgICAgICAgICAgICAgLy9JdCBjYWxscyByZWFsIHBsYXkoKSBhbmQgcGF1c2UoKS5cbiAgICAgICAgICAgICAgICAvL0FuZCB0aGVuIHRoaXMgdHJpZ2dlcnMgXCJwbGF5aW5nXCIgYW5kIFwicGF1c2VcIi5cbiAgICAgICAgICAgICAgICAvL0kgcHJldmVudCB0aGVzZSBwcm9jZXNzLlxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc3dpdGNoKG5ld1N0YXRlKXtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QQVVTRURcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQURfUEFVU0VEIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX0FEX1BBVVNFRFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QTEFZSU5HIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfUExBWUlOR1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQURfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX0FEX1BMQVlJTkdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNwZWMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1NUQVRFLCB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZzdGF0ZSA6IHByZXZTdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5zdGF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0QnVmZmVyID0gKG5ld0J1ZmZlcikgPT4ge1xuXG4gICAgfTtcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRCdWZmZXIgPyBlbEZsYXNoLmdldEJ1ZmZlcigpIDogbnVsbDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0RHVyYXRpb24gPyBlbEZsYXNoLmdldER1cmF0aW9uKCkgOiAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRQb3NpdGlvbiA/IGVsRmxhc2guZ2V0UG9zaXRpb24oKSA6IDA7XG4gICAgfTtcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5zZXRWb2x1bWUgPyBlbEZsYXNoLnNldFZvbHVtZSh2b2x1bWUpIDogMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLnNldFZvbHVtZSA/IGVsRmxhc2guZ2V0Vm9sdW1lKCkgOiAwO1xuICAgIH07XG4gICAgdGhhdC5zZXRNdXRlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgZWxGbGFzaC5zZXRNdXRlKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRNdXRlID8gZWxGbGFzaC5nZXRNdXRlKCkgOiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdGhhdC5wcmVsb2FkID0gKHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogcHJlbG9hZCgpIFwiLCBzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgLy9GaXJzdCA6IGNoZWNrU3dmSXNSZWFkeSAtPiBJdCBjaGVja3Mgc3dmIGxvYWRpbmcgY29tcGxldGUgYnkgcG9sbGluZy5cbiAgICAgICAgICAgIC8vU2Vjb25kIDogY2hlY2tGaWxlTG9hZGVkIC0+IEl0IGNoZWNrcyBzcmMgbG9hZGluZyBjb21wbGV0ZSBieSBwb2xsaW5nIHRvby5cbiAgICAgICAgICAgIC8vV2h5IGNvbXBsZXggaXMgaXQ/IC0+IEl0IGFnYWluc3RzIGZsYXNoIHRpbWluZyBpc3N1ZS5cbiAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja1N3ZklzUmVhZHkoKXtcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgIGlmKGVsRmxhc2guaXNGbGFzaFJlYWR5ICYmIGVsRmxhc2guaXNGbGFzaFJlYWR5KCkpe1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxGbGFzaCwgJ2R1cmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZSA6ZWxGbGFzaC5nZXREdXJhdGlvbigpfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uIHx8IDApO1xuICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ID0gMDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGZ1bmN0aW9uIGNoZWNrRmlsZUxvYWRlZCgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsRmxhc2guaXNGaWxlTG9hZGVkICYmIGVsRmxhc2guaXNGaWxlTG9hZGVkKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hZnRlckxvYWQobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzTXV0ZSgpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkgJiYgcGxheWVyQ29uZmlnLmdldFZvbHVtZSgpIDwgMTAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRWb2x1bWUocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMzAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0ZpbGVMb2FkZWQsIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoRVJST1JTW0lOSVRfUlRNUF9TRVRVUF9FUlJPUl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMTAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tTd2ZJc1JlYWR5LCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoRVJST1JTW0lOSVRfUlRNUF9TRVRVUF9FUlJPUl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChzb3VyY2VzKSA9PntcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xuICAgICAgICBfbG9hZCgwKTsgICAvL3NwZWMuc291cmNlc18uc3RhcnR0aW1lIHx8XG4gICAgICAgIF9hZnRlckxvYWQoMCk7XG4gICAgfTtcblxuICAgIHRoYXQucGxheSA9ICgpID0+e1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIGlmICggKGFkcyAmJiBhZHMuaXNBY3RpdmUoKSkgfHwgKGFkcyAmJiAhYWRzLnN0YXJ0ZWQoKSkgKSB7XG4gICAgICAgICAgICAgICAgYWRzLnBsYXkoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGVsRmxhc2gucGxheSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgZWxGbGFzaC5wYXVzZSgpO1xuICAgICAgICB9ZWxzZSBpZih0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcpe1xuICAgICAgICAgICAgYWRzLnBhdXNlKCk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcbiAgICAgICAgZWxGbGFzaC5zZWVrKHBvc2l0aW9uKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBpbmRleCA6IGluZGV4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcbiAgICAgICAgaWYoc3BlYy5jdXJyZW50UXVhbGl0eSA9PT0gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XG4gICAgICAgICAgICBpZihzcGVjLnNvdXJjZXMgJiYgc3BlYy5zb3VyY2VzLmxlbmd0aCA+IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgY2hhbmdlZCA6IFwiICsgc291cmNlSW5kZXgpO1xuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHNvdXJjZUluZGV4O1xuXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc291cmNlSW5kZXhcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcbiAgICAgICAgICAgICAgICBpZihuZWVkUHJvdmlkZXJDaGFuZ2Upe1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGFzdFBsYXlQb3NpdGlvbiA9IGVsRmxhc2guZ2V0Q3VycmVudFRpbWUoKXx8IDA7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrRmlsZUxvYWRlZCgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsRmxhc2guaXNGaWxlTG9hZGVkICYmIGVsRmxhc2guaXNGaWxlTG9hZGVkKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hZnRlckxvYWQobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAzMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRmlsZUxvYWRlZCwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlTG9hZCBGYWl1bFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGV2ZWxzO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEZyYW1lcmF0ZSA9IChmcmFtZXJhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlID0gZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT57XG4gICAgICAgIGxldCBmcHMgPSBzcGVjLmZyYW1lcmF0ZTtcbiAgICAgICAgbGV0IGN1cnJlbnRGcmFtZXMgPSBlbEZsYXNoLmdldEN1cnJlbnRUaW1lKCkgKiBmcHM7XG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IChjdXJyZW50RnJhbWVzICsgZnJhbWVDb3VudCkgLyBmcHM7XG4gICAgICAgIG5ld1Bvc2l0aW9uID0gbmV3UG9zaXRpb24gKyAwLjAwMDAxOyAvLyBGSVhFUyBBIFNBRkFSSSBTRUVLIElTU1VFLiBteVZkaWVvLmN1cnJlbnRUaW1lID0gMC4wNCB3b3VsZCBnaXZlIFNNUFRFIDAwOjAwOjAwOjAwIHdoZXJhcyBpdCBzaG91bGQgZ2l2ZSAwMDowMDowMDowMVxuXG4gICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgdGhhdC5zZWVrKG5ld1Bvc2l0aW9uKTtcbiAgICB9O1xuXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xuICAgICAgICBlbEZsYXNoLnN0b3AoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG4gICAgICAgIHRoYXQuc3RvcCgpO1xuXG4gICAgICAgIC8qdHJ5e1xuICAgICAgICAgICAgZWxGbGFzaC5yZW1vdmUoKTtcbiAgICAgICAgfWNhdGNoKGVycm9yKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSovXG5cblxuICAgICAgICBpZihhZHMpe1xuICAgICAgICAgICAgYWRzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Lm9mZigpO1xuICAgIH07XG5cbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cbiAgICAvLyB1c2UgOiBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7IC4uLiBzdXBlcl9kZXN0cm95KCk7XG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxuICovXG5pbXBvcnQge1NUQVRFX0lETEUsIFBST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlclwiO1xuLyoqXG4gKiBAYnJpZWYgICBydG1wIHByb3ZpZGVyXG4gKiBAcGFyYW0gICBlbGVtZW50IHZpZGVvIGVsZW1lbnQuXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxuICogKi9cblxuXG5jb25zdCBSdG1wID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuXG4gICAgbGV0IHNwZWMgPSB7XG4gICAgICAgIG5hbWUgOiBQUk9WSURFUl9SVE1QLFxuICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcbiAgICAgICAgbXNlIDogbnVsbCxcbiAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxuICAgICAgICBjYW5TZWVrIDogZmFsc2UsXG4gICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxuICAgICAgICBzZWVraW5nIDogZmFsc2UsXG4gICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcbiAgICAgICAgYnVmZmVyIDogMCxcbiAgICAgICAgZnJhbWVyYXRlIDogMCxcbiAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcbiAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxuICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXG4gICAgICAgIHNvdXJjZXMgOiBbXSxcbiAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxuICAgIH07XG5cbiAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBudWxsKTtcbiAgICBzdXBlckRlc3Ryb3lfZnVuYyAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJSVE1QIFBST1ZJREVSIExPQURFRC5cIik7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUlRNUCA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBSdG1wOyJdLCJzb3VyY2VSb290IjoiIn0=