/*! OvenPlayerv0.9.5954 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
            switch (newState) {
                case _constants.STATE_COMPLETE:
                    that.trigger(_constants.PLAYER_COMPLETE);
                    break;
                case _constants.STATE_PAUSED:
                    that.trigger(_constants.PLAYER_PAUSE, {
                        prevState: spec.state
                    });
                    break;
                case _constants.STATE_PLAYING:
                    that.trigger(_constants.PLAYER_PLAY, {
                        prevState: spec.state
                    });
                    break;
            }
            spec.state = newState;
            that.trigger(_constants.PLAYER_STATE, {
                prevstate: prevState,
                newstate: spec.state
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcC5qcyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImVsRmxhc2giLCJwcm92aWRlciIsInZpZGVvRW5kZWRDYWxsYmFjayIsInRoYXQiLCJpc0pTUmVhZHkiLCJ0aW1ldXBkYXRlIiwiZGF0YSIsImN1cnJlbnRUaW1lIiwicG9zaXRpb24iLCJ0cmlnZ2VyIiwiQ09OVEVOVF9USU1FIiwiZHVyYXRpb24iLCJnZXRTdGF0ZSIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsInNldFN0YXRlIiwidm9sdW1lQ2hhbmdlZCIsIkNPTlRFTlRfVk9MVU1FIiwic3RhdGVDaGFuZ2VkIiwibmV3c3RhdGUiLCJtZXRhQ2hhbmdlZCIsIkNPTlRFTlRfTUVUQSIsImVycm9yIiwiU1RBVEVfRVJST1IiLCJwYXVzZSIsIkVSUk9SIiwiUHJvdmlkZXIiLCJzcGVjIiwicGxheWVyQ29uZmlnIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJlbGVtZW50IiwiYWRzIiwibGlzdGVuZXIiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwid3JpdGFibGUiLCJhZFRhZ1VybCIsImNvbnNvbGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJzb3VyY2VzIiwiY3VycmVudFNvdXJjZSIsInByZXZpb3VzU291cmNlIiwiZ2V0Q3VycmVudFNvdXJjZSIsInNvdXJjZUNoYW5nZWQiLCJmaWxlIiwibG9hZCIsImdldFBvc2l0aW9uIiwic2VlayIsIl9hZnRlckxvYWQiLCJpc0F1dG9TdGFydCIsInBsYXkiLCJ0cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwiLCJmdW5jTmFtZSIsImZ1bmNEYXRhIiwiZ2V0TmFtZSIsIm5hbWUiLCJjYW5TZWVrIiwic2V0Q2FuU2VlayIsImlzU2Vla2luZyIsInNlZWtpbmciLCJzZXRTZWVraW5nIiwibmV3U3RhdGUiLCJzdGF0ZSIsInByZXZTdGF0ZSIsIlBMQVlFUl9DT01QTEVURSIsIlNUQVRFX1BBVVNFRCIsIlBMQVlFUl9QQVVTRSIsIlNUQVRFX1BMQVlJTkciLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsInNldEJ1ZmZlciIsIm5ld0J1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0TXV0ZSIsImdldE11dGUiLCJwcmVsb2FkIiwicmV0cnlDb3VudCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2hlY2tTd2ZJc1JlYWR5IiwiaXNGbGFzaFJlYWR5IiwiY2hlY2tGaWxlTG9hZGVkIiwiaXNGaWxlTG9hZGVkIiwiaXNNdXRlIiwic2V0VGltZW91dCIsIkVSUk9SUyIsIklOSVRfUlRNUF9TRVRVUF9FUlJPUiIsImlzQWN0aXZlIiwic3RhcnRlZCIsIlNUQVRFX0FEX1BMQVlJTkciLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRTb3VyY2VzIiwibWFwIiwiaW5kZXgiLCJ0eXBlIiwibGFiZWwiLCJzZXRDdXJyZW50U291cmNlIiwic291cmNlSW5kZXgiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJjdXJyZW50UXVhbGl0eSIsImxlbmd0aCIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJzZXRTb3VyY2VMYWJlbCIsImdldEN1cnJlbnRUaW1lIiwiZ2V0UXVhbGl0eUxldmVscyIsInF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsInNldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0RnJhbWVyYXRlIiwiZnJhbWVyYXRlIiwic2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImZwcyIsImN1cnJlbnRGcmFtZXMiLCJuZXdQb3NpdGlvbiIsInN0b3AiLCJkZXN0cm95Iiwib2ZmIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJSdG1wIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJQUk9WSURFUl9SVE1QIiwibXNlIiwiaXNMaXZlIiwiYnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOztBQTZCQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBU0MsT0FBVCxFQUFrQkMsUUFBbEIsRUFBNEJDLGtCQUE1QixFQUErQztBQUM1RCxRQUFJQyxPQUFPLEVBQVg7O0FBRUFBLFNBQUtDLFNBQUwsR0FBaUIsWUFBSztBQUNsQixlQUFPLElBQVA7QUFDSCxLQUZEO0FBR0FELFNBQUtFLFVBQUwsR0FBa0IsVUFBQ0MsSUFBRCxFQUFTOztBQUV2Qk4sZ0JBQVFPLFdBQVIsR0FBc0JELEtBQUtFLFFBQTNCO0FBQ0FQLGlCQUFTUSxPQUFULENBQWlCQyx1QkFBakIsRUFBK0JKLElBQS9CO0FBQ0E7QUFDQTtBQUNBLFlBQUdBLEtBQUtFLFFBQUwsSUFBa0JGLEtBQUtLLFFBQUwsR0FBYyxDQUFuQyxFQUFzQztBQUNsQyxnQkFBR1YsU0FBU1csUUFBVCxPQUF3QkMscUJBQXhCLElBQXNDWixTQUFTVyxRQUFULE9BQXdCRSx5QkFBakUsRUFBZ0Y7QUFDNUUsb0JBQUdaLGtCQUFILEVBQXNCO0FBQ2xCQSx1Q0FBbUIsWUFBVTtBQUN6QkQsaUNBQVNjLFFBQVQsQ0FBa0JELHlCQUFsQjtBQUNILHFCQUZEO0FBR0gsaUJBSkQsTUFJSztBQUNEYiw2QkFBU2MsUUFBVCxDQUFrQkQseUJBQWxCO0FBQ0g7QUFFSjtBQUNKO0FBQ0osS0FsQkQ7QUFtQkFYLFNBQUthLGFBQUwsR0FBcUIsVUFBQ1YsSUFBRCxFQUFTO0FBQzFCTCxpQkFBU1EsT0FBVCxD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LENBWlY7QUFhUHlFLHVCQUFnQixFQWJUO0FBY1AxRSxpQkFBVSxFQWRIO0FBZVBMLGtCQUFXQTtBQWZKLEtBQVg7O0FBa0JBbkMsV0FBTywyQkFBU3dCLElBQVQsRUFBZUMsWUFBZixFQUE2QixJQUE3QixDQUFQO0FBQ0ErRyx3QkFBcUJ4SSxjQUFXLFNBQVgsQ0FBckI7O0FBRUEwQixzQkFBa0JDLEdBQWxCLENBQXNCLHVCQUF0Qjs7QUFFQTNCLFNBQUtrSSxPQUFMLEdBQWUsWUFBSztBQUNoQnhHLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCO0FBQ0E2RztBQUNILEtBSEQ7O0FBS0EsV0FBT3hJLElBQVA7QUFDSCxDQWpDRDs7cUJBb0NldUksSSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI3Li5cbiAqL1xuaW1wb3J0IHtcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihlbEZsYXNoLCBwcm92aWRlciwgdmlkZW9FbmRlZENhbGxiYWNrKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuXG4gICAgdGhhdC5pc0pTUmVhZHkgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICB0aGF0LnRpbWV1cGRhdGUgPSAoZGF0YSkgPT57XG5cbiAgICAgICAgZWxGbGFzaC5jdXJyZW50VGltZSA9IGRhdGEucG9zaXRpb247XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FLCBkYXRhKTtcbiAgICAgICAgLy9wcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSLCBkYXRhKTtcbiAgICAgICAgLy9kYXRhLmR1cmF0aW9uLTEgOiB0aGlzIGlzIHRyaWNrLiBiZWNhdXNlIHNvbWV0aW1lcyBydG1wJ3MgcG9zaXRpb24gPCBkdXJhdGlvbiB3aGVuIHZpZGVvIGVuZGVkLlxuICAgICAgICBpZihkYXRhLnBvc2l0aW9uID49IChkYXRhLmR1cmF0aW9uLTEpKXtcbiAgICAgICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0lETEUgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfQ09NUExFVEUpe1xuICAgICAgICAgICAgICAgIGlmKHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvRW5kZWRDYWxsYmFjayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnZvbHVtZUNoYW5nZWQgPSAoZGF0YSkgPT57XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIGRhdGEpO1xuICAgIH07XG4gICAgdGhhdC5zdGF0ZUNoYW5nZWQgPSAoZGF0YSkgPT57XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKGRhdGEubmV3c3RhdGUpO1xuICAgIH07XG4gICAgdGhhdC5tZXRhQ2hhbmdlZCA9IChkYXRhKSA9PntcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIGRhdGEpO1xuICAgIH07XG4gICAgdGhhdC5lcnJvciA9IChlcnJvcikgPT57XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcblxuICAgICAgICAvL1BSSVZBVEVfU1RBVEVfRVJST1JcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IpO1xuXG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxuICovXG5pbXBvcnQgQWRzIGZyb20gXCJhcGkvcHJvdmlkZXIvYWRzL0Fkc1wiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXJcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlLCBwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUlMsIElOSVRfUlRNUF9TRVRVUF9FUlJPUixcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLFxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLCBTVEFURV9BRF9QTEFZSU5HLFxuICAgIENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIENvcmUgRm9yIEZsYXNoIFZpZGVvLlxuICogQHBhcmFtICAgc3BlYyBtZW1iZXIgdmFsdWVcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xuICogKi9cblxuXG5jb25zdCBQcm92aWRlciA9IGZ1bmN0aW9uKHNwZWMsIHBsYXllckNvbmZpZyl7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG4gICAgbGV0IGVsRmxhc2ggPSBzcGVjLmVsZW1lbnQ7XG4gICAgbGV0IGFkcyA9IG51bGwsIGxpc3RlbmVyID0gbnVsbCwgdmlkZW9FbmRlZENhbGxiYWNrID0gbnVsbDtcblxuICAgIC8vSXQgbWVhbnMgdG8gc3VwcG9ydCBhZCBmb3IgZmxhc2guIFNldCB0aGUgc2FtZSBzcGVjaWZpY2F0aW9ucyBsaWtlIGEgVmlkZW8gVGFnLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbEZsYXNoLCAnY3VycmVudFRpbWUnLFxuICAgICAgICB7dmFsdWUgOjAsIHdyaXRhYmxlIDogdHJ1ZX1cbiAgICApO1xuXG4gICAgaWYoc3BlYy5hZFRhZ1VybCl7XG4gICAgICAgIGFkcyA9IEFkcyhlbEZsYXNoLCB0aGF0LCBwbGF5ZXJDb25maWcsIHNwZWMuYWRUYWdVcmwpO1xuICAgICAgICBpZighYWRzKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxpc3RlbmVyID0gRXZlbnRzTGlzdGVuZXIoZWxGbGFzaCwgdGhhdCwgYWRzID8gYWRzLnZpZGVvRW5kZWRDYWxsYmFjayA6IG51bGwpO1xuXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2UgPSBlbEZsYXNoLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2UuZmlsZSAhPT0gcHJldmlvdXNTb3VyY2UpO1xuICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xuICAgICAgICAgICAgZWxGbGFzaC5sb2FkKHNvdXJjZS5maWxlKTtcbiAgICAgICAgfWVsc2UgaWYobGFzdFBsYXlQb3NpdGlvbiA9PT0gMCAmJiB0aGF0LmdldFBvc2l0aW9uKCkgPiAwKXtcbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICAvL0ZsYXNoIGhhcyB0d28gaW5pdCBzdGF0ZXMuIEZsYXNoTG9hZGVkIGFuZCBGaWxlTG9hZGVkLlxuICAgIC8vX2xvYWQgY2FsbHMgYWZ0ZXIgRmxhc2hMb2FkZWQuIF9hZnRlckxvYWQgY2FsbHMgYWZ0ZXIgRmlsZUxvYWRlZC5cbiAgICBjb25zdCBfYWZ0ZXJMb2FkID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XG4gICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcbiAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuXG4gICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIC8vVGhpcyBpcyB3aHkuIEZsYXNoIGRvZXMgbm90IHNlbGYgdHJpZyB0byBhZHMsbG1hbG0sXG4gICAgdGhhdC50cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwgPSAoZnVuY05hbWUsIGZ1bmNEYXRhKSA9PiB7XG4gICAgICAgIGlmKGxpc3RlbmVyW2Z1bmNOYW1lXSl7XG4gICAgICAgICAgICByZXR1cm4gbGlzdGVuZXJbZnVuY05hbWVdKGZ1bmNEYXRhKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5uYW1lO1xuICAgIH07XG5cbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LnNldENhblNlZWsgPSAoY2FuU2VlaykgPT4ge1xuICAgICAgICBzcGVjLmNhblNlZWsgPSBjYW5TZWVrO1xuICAgIH07XG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e1xuICAgICAgICByZXR1cm4gc3BlYy5zZWVraW5nO1xuICAgIH07XG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmcpPT57XG4gICAgICAgIHNwZWMuc2Vla2luZyA9IHNlZWtpbmc7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHNwZWMuc3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2gobmV3U3RhdGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQ09NUExFVEUgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwZWMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcbiAgICAgICAgICAgICAgICBwcmV2c3RhdGUgOiBwcmV2U3RhdGUsXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLnN0YXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XG5cbiAgICB9O1xuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldEJ1ZmZlciA/IGVsRmxhc2guZ2V0QnVmZmVyKCkgOiBudWxsO1xuICAgIH07XG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXREdXJhdGlvbiA/IGVsRmxhc2guZ2V0RHVyYXRpb24oKSA6IDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldFBvc2l0aW9uID8gZWxGbGFzaC5nZXRQb3NpdGlvbigpIDogMDtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLnNldFZvbHVtZSA/IGVsRmxhc2guc2V0Vm9sdW1lKHZvbHVtZSkgOiAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guc2V0Vm9sdW1lID8gZWxGbGFzaC5nZXRWb2x1bWUoKSA6IDA7XG4gICAgfTtcbiAgICB0aGF0LnNldE11dGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICBlbEZsYXNoLnNldE11dGUoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldE11dGUgPyBlbEZsYXNoLmdldE11dGUoKSA6IGZhbHNlO1xuICAgIH07XG5cbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBwcmVsb2FkKCkgXCIsIHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XG5cbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAvL0ZpcnN0IDogY2hlY2tTd2ZJc1JlYWR5IC0+IEl0IGNoZWNrcyBzd2YgbG9hZGluZyBjb21wbGV0ZSBieSBwb2xsaW5nLlxuICAgICAgICAgICAgLy9TZWNvbmQgOiBjaGVja0ZpbGVMb2FkZWQgLT4gSXQgY2hlY2tzIHNyYyBsb2FkaW5nIGNvbXBsZXRlIGJ5IHBvbGxpbmcgdG9vLlxuICAgICAgICAgICAgLy9XaHkgY29tcGxleCBpcyBpdD8gLT4gSXQgYWdhaW5zdHMgZmxhc2ggdGltaW5nIGlzc3VlLlxuICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrU3dmSXNSZWFkeSgpe1xuICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZsYXNoUmVhZHkgJiYgZWxGbGFzaC5pc0ZsYXNoUmVhZHkoKSl7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbEZsYXNoLCAnZHVyYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAge3ZhbHVlIDplbEZsYXNoLmdldER1cmF0aW9uKCl9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gY2hlY2tGaWxlTG9hZGVkKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZpbGVMb2FkZWQgJiYgZWxGbGFzaC5pc0ZpbGVMb2FkZWQoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2FmdGVyTG9hZChsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNNdXRlKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSAmJiBwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkgPCAxMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFZvbHVtZShwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAzMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRmlsZUxvYWRlZCwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAxMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja1N3ZklzUmVhZHksIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXMpID0+e1xuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKDApOyAgIC8vc3BlYy5zb3VyY2VzXy5zdGFydHRpbWUgfHxcbiAgICAgICAgX2FmdGVyTG9hZCgwKTtcbiAgICB9O1xuXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgaWYgKCAoYWRzICYmIGFkcy5pc0FjdGl2ZSgpKSB8fCAoYWRzICYmICFhZHMuc3RhcnRlZCgpKSApIHtcbiAgICAgICAgICAgICAgICBhZHMucGxheSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZWxGbGFzaC5wbGF5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICBlbEZsYXNoLnBhdXNlKCk7XG4gICAgICAgIH1lbHNlIGlmKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORyl7XG4gICAgICAgICAgICBhZHMucGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xuICAgICAgICBlbEZsYXNoLnNlZWsocG9zaXRpb24pO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBzb3VyY2UudHlwZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoc291cmNlSW5kZXgsIG5lZWRQcm92aWRlckNoYW5nZSkgPT4ge1xuICAgICAgICBpZihzcGVjLmN1cnJlbnRRdWFsaXR5ID09PSBzb3VyY2VJbmRleCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZihzb3VyY2VJbmRleCA+IC0xKXtcbiAgICAgICAgICAgIGlmKHNwZWMuc291cmNlcyAmJiBzcGVjLnNvdXJjZXMubGVuZ3RoID4gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBzb3VyY2VJbmRleCk7XG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gc291cmNlSW5kZXg7XG5cbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzb3VyY2VJbmRleFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUxhYmVsKHNwZWMuc291cmNlc1tzb3VyY2VJbmRleF0ubGFiZWwpO1xuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gZWxGbGFzaC5nZXRDdXJyZW50VGltZSgpfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tGaWxlTG9hZGVkKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZpbGVMb2FkZWQgJiYgZWxGbGFzaC5pc0ZpbGVMb2FkZWQoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2FmdGVyTG9hZChsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDMwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tGaWxlTG9hZGVkLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGVMb2FkIEZhaXVsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0RnJhbWVyYXRlID0gKGZyYW1lcmF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGUgPSBmcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PntcbiAgICAgICAgbGV0IGZwcyA9IHNwZWMuZnJhbWVyYXRlO1xuICAgICAgICBsZXQgY3VycmVudEZyYW1lcyA9IGVsRmxhc2guZ2V0Q3VycmVudFRpbWUoKSAqIGZwcztcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXG5cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xuICAgIH07XG5cbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XG4gICAgICAgIGVsRmxhc2guc3RvcCgpO1xuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGRlc3Ryb3koKSBwbGF5ZXIgc3RvcCwgbGlzdGVuZXIsIGV2ZW50IGRlc3Ryb2llZFwiKTtcbiAgICAgICAgdGhhdC5zdG9wKCk7XG5cbiAgICAgICAgLyp0cnl7XG4gICAgICAgICAgICBlbEZsYXNoLnJlbW92ZSgpO1xuICAgICAgICB9Y2F0Y2goZXJyb3Ipe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9Ki9cblxuXG4gICAgICAgIGlmKGFkcyl7XG4gICAgICAgICAgICBhZHMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgfTtcblxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyMy4uXG4gKi9cbmltcG9ydCB7U1RBVEVfSURMRSwgUFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2ZsYXNoL1Byb3ZpZGVyXCI7XG4vKipcbiAqIEBicmllZiAgIHJ0bXAgcHJvdmlkZXJcbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5cbmNvbnN0IFJ0bXAgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyA9IG51bGw7XG5cbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgbmFtZSA6IFBST1ZJREVSX1JUTVAsXG4gICAgICAgIGVsZW1lbnQgOiBlbGVtZW50LFxuICAgICAgICBtc2UgOiBudWxsLFxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXG4gICAgICAgIGNhblNlZWsgOiBmYWxzZSxcbiAgICAgICAgaXNMaXZlIDogZmFsc2UsXG4gICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcbiAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxuICAgICAgICBidWZmZXIgOiAwLFxuICAgICAgICBmcmFtZXJhdGUgOiAwLFxuICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxuICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXG4gICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcbiAgICAgICAgc291cmNlcyA6IFtdLFxuICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXG4gICAgfTtcblxuICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIG51bGwpO1xuICAgIHN1cGVyRGVzdHJveV9mdW5jICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlJUTVAgUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJSVE1QIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFJ0bXA7Il0sInNvdXJjZVJvb3QiOiIifQ==