/*! OvenPlayerv0.9.5941 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        if (lastPlayPosition > 0) {

            that.seek(lastPlayPosition);
            if (!playerConfig.isAutoStart()) {
                that.play();
            }
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
        _load(spec.sources_.starttime || 0);
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
                //that.pause();
                that.setState(_constants.STATE_IDLE);
                OvenPlayerConsole.log("source changed : " + sourceIndex);
                spec.currentSource = sourceIndex;

                that.trigger(_constants.CONTENT_SOURCE_CHANGED, {
                    currentSource: sourceIndex
                });

                playerConfig.setSourceLabel(spec.sources[sourceIndex].label);
                if (needProviderChange) {

                    _load(elFlash.getCurrentTime() || 0);
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

        elFlash.remove();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcC5qcyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImVsRmxhc2giLCJwcm92aWRlciIsInZpZGVvRW5kZWRDYWxsYmFjayIsInRoYXQiLCJpc0pTUmVhZHkiLCJ0aW1ldXBkYXRlIiwiZGF0YSIsImN1cnJlbnRUaW1lIiwicG9zaXRpb24iLCJ0cmlnZ2VyIiwiQ09OVEVOVF9USU1FIiwiZHVyYXRpb24iLCJnZXRTdGF0ZSIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsInNldFN0YXRlIiwidm9sdW1lQ2hhbmdlZCIsIkNPTlRFTlRfVk9MVU1FIiwic3RhdGVDaGFuZ2VkIiwibmV3c3RhdGUiLCJtZXRhQ2hhbmdlZCIsIkNPTlRFTlRfTUVUQSIsImVycm9yIiwiU1RBVEVfRVJST1IiLCJwYXVzZSIsIkVSUk9SIiwiUHJvdmlkZXIiLCJzcGVjIiwicGxheWVyQ29uZmlnIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJlbGVtZW50IiwiYWRzIiwibGlzdGVuZXIiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwid3JpdGFibGUiLCJhZFRhZ1VybCIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsInNvdXJjZXMiLCJjdXJyZW50U291cmNlIiwicHJldmlvdXNTb3VyY2UiLCJnZXRDdXJyZW50U291cmNlIiwic291cmNlQ2hhbmdlZCIsImZpbGUiLCJsb2FkIiwiZ2V0UG9zaXRpb24iLCJzZWVrIiwiaXNBdXRvU3RhcnQiLCJwbGF5IiwidHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsIiwiZnVuY05hbWUiLCJmdW5jRGF0YSIsImdldE5hbWUiLCJuYW1lIiwiY2FuU2VlayIsInNldENhblNlZWsiLCJpc1NlZWtpbmciLCJzZWVraW5nIiwic2V0U2Vla2luZyIsIm5ld1N0YXRlIiwic3RhdGUiLCJwcmV2U3RhdGUiLCJQTEFZRVJfQ09NUExFVEUiLCJTVEFURV9QQVVTRUQiLCJQTEFZRVJfUEFVU0UiLCJTVEFURV9QTEFZSU5HIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfU1RBVEUiLCJwcmV2c3RhdGUiLCJzZXRCdWZmZXIiLCJuZXdCdWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsInNldFZvbHVtZSIsInZvbHVtZSIsImdldFZvbHVtZSIsInNldE11dGUiLCJnZXRNdXRlIiwicHJlbG9hZCIsInJldHJ5Q291bnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNoZWNrU3dmSXNSZWFkeSIsImlzRmxhc2hSZWFkeSIsImNoZWNrRmlsZUxvYWRlZCIsImlzRmlsZUxvYWRlZCIsImlzTXV0ZSIsInNldFRpbWVvdXQiLCJFUlJPUlMiLCJJTklUX1JUTVBfU0VUVVBfRVJST1IiLCJzb3VyY2VzXyIsInN0YXJ0dGltZSIsImlzQWN0aXZlIiwic3RhcnRlZCIsIlNUQVRFX0FEX1BMQVlJTkciLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRTb3VyY2VzIiwibWFwIiwiaW5kZXgiLCJ0eXBlIiwibGFiZWwiLCJzZXRDdXJyZW50U291cmNlIiwic291cmNlSW5kZXgiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJjdXJyZW50UXVhbGl0eSIsImxlbmd0aCIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJzZXRTb3VyY2VMYWJlbCIsImdldEN1cnJlbnRUaW1lIiwiZ2V0UXVhbGl0eUxldmVscyIsInF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsInNldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0RnJhbWVyYXRlIiwiZnJhbWVyYXRlIiwic2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImZwcyIsImN1cnJlbnRGcmFtZXMiLCJuZXdQb3NpdGlvbiIsInN0b3AiLCJkZXN0cm95IiwicmVtb3ZlIiwib2ZmIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJSdG1wIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJQUk9WSURFUl9SVE1QIiwibXNlIiwiaXNMaXZlIiwiYnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOztBQTZCQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBU0MsT0FBVCxFQUFrQkMsUUFBbEIsRUFBNEJDLGtCQUE1QixFQUErQztBQUM1RCxRQUFJQyxPQUFPLEVBQVg7O0FBRUFBLFNBQUtDLFNBQUwsR0FBaUIsWUFBSztBQUNsQixlQUFPLElBQVA7QUFDSCxLQUZEO0FBR0FELFNBQUtFLFVBQUwsR0FBa0IsVUFBQ0MsSUFBRCxFQUFTOztBQUV2Qk4sZ0JBQVFPLFdBQVIsR0FBc0JELEtBQUtFLFFBQTNCO0FBQ0FQLGlCQUFTUSxPQUFULENBQWlCQyx1QkFBakIsRUFBK0JKLElBQS9CO0FBQ0E7QUFDQTtBQUNBLFlBQUdBLEtBQUtFLFFBQUwsSUFBa0JGLEtBQUtLLFFBQUwsR0FBYyxDQUFuQyxFQUFzQztBQUNsQyxnQkFBR1YsU0FBU1csUUFBVCxPQUF3QkMscUJBQXhCLElBQXNDWixTQUFTVyxRQUFULE9BQXdCRSx5QkFBakUsRUFBZ0Y7QUFDNUUsb0JBQUdaLGtCQUFILEVBQXNCO0FBQ2xCQSx1Q0FBbUIsWUFBVTtBQUN6QkQsaUNBQVNjLFFBQVQsQ0FBa0JELHlCQUFsQjtBQUNILHFCQUZEO0FBR0gsaUJBSkQsTUFJSztBQUNEYiw2QkFBU2MsUUFBVCxDQUFrQkQseUJBQWxCO0FBQ0g7QUFFSjtBQUNKO0FBQ0osS0FsQkQ7QUFtQkFYLFNBQUthLGFBQUwsR0FBcUIsVUFBQ1YsSUFBRCxFQUFTO0FBQzFCTCxpQkFB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QkEyV2V1QixROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4V2Y7O0FBQ0E7Ozs7OztBQUNBOzs7Ozs7QUFMQTs7O0FBWUEsSUFBTWlILE9BQU8sU0FBUEEsSUFBTyxDQUFTNUcsT0FBVCxFQUFrQkgsWUFBbEIsRUFBZ0NVLFFBQWhDLEVBQXlDO0FBQ2xELFFBQUluQyxPQUFPLEVBQVg7QUFDQSxRQUFJeUksb0JBQW9CLElBQXhCOztBQUVBLFFBQUlqSCxPQUFPO0FBQ1A4QixjQUFPb0Ysd0JBREE7QUFFUDlHLGlCQUFVQSxPQUZIO0FBR1ArRyxhQUFNLElBSEM7QUFJUDdHLGtCQUFXLElBSko7QUFLUHlCLGlCQUFVLEtBTEg7QUFNUHFGLGdCQUFTLEtBTkY7QUFPUGxGLGlCQUFVLEtBUEg7QUFRUEcsZUFBUW5ELHFCQVJEO0FBU1BtSSxnQkFBUyxDQVRGO0FBVVBuQixtQkFBWSxDQVZMO0FBV1BkLHdCQUFpQixDQUFDLENBWFg7QUFZUHBFLHVCQUFnQixDQUFDLENBWlY7QUFhUDBFLHVCQUFnQixFQWJUO0FBY1AzRSxpQkFBVSxFQWRIO0FBZVBKLGtCQUFXQTtBQWZKLEtBQVg7O0FBa0JBbkMsV0FBTywyQkFBU3dCLElBQVQsRUFBZUMsWUFBZixFQUE2QixJQUE3QixDQUFQO0FBQ0FnSCx3QkFBcUJ6SSxjQUFXLFNBQVgsQ0FBckI7O0FBRUEwQixzQkFBa0JDLEdBQWxCLENBQXNCLHVCQUF0Qjs7QUFFQTNCLFNBQUtrSSxPQUFMLEdBQWUsWUFBSztBQUNoQnhHLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCO0FBQ0E4RztBQUNILEtBSEQ7O0FBS0EsV0FBT3pJLElBQVA7QUFDSCxDQWpDRDs7cUJBb0Nld0ksSSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI3Li5cbiAqL1xuaW1wb3J0IHtcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihlbEZsYXNoLCBwcm92aWRlciwgdmlkZW9FbmRlZENhbGxiYWNrKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuXG4gICAgdGhhdC5pc0pTUmVhZHkgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICB0aGF0LnRpbWV1cGRhdGUgPSAoZGF0YSkgPT57XG5cbiAgICAgICAgZWxGbGFzaC5jdXJyZW50VGltZSA9IGRhdGEucG9zaXRpb247XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FLCBkYXRhKTtcbiAgICAgICAgLy9wcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSLCBkYXRhKTtcbiAgICAgICAgLy9kYXRhLmR1cmF0aW9uLTEgOiB0aGlzIGlzIHRyaWNrLiBiZWNhdXNlIHNvbWV0aW1lcyBydG1wJ3MgcG9zaXRpb24gPCBkdXJhdGlvbiB3aGVuIHZpZGVvIGVuZGVkLlxuICAgICAgICBpZihkYXRhLnBvc2l0aW9uID49IChkYXRhLmR1cmF0aW9uLTEpKXtcbiAgICAgICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0lETEUgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfQ09NUExFVEUpe1xuICAgICAgICAgICAgICAgIGlmKHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvRW5kZWRDYWxsYmFjayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnZvbHVtZUNoYW5nZWQgPSAoZGF0YSkgPT57XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIGRhdGEpO1xuICAgIH07XG4gICAgdGhhdC5zdGF0ZUNoYW5nZWQgPSAoZGF0YSkgPT57XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKGRhdGEubmV3c3RhdGUpO1xuICAgIH07XG4gICAgdGhhdC5tZXRhQ2hhbmdlZCA9IChkYXRhKSA9PntcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIGRhdGEpO1xuICAgIH07XG4gICAgdGhhdC5lcnJvciA9IChlcnJvcikgPT57XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcblxuICAgICAgICAvL1BSSVZBVEVfU1RBVEVfRVJST1JcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IpO1xuXG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxuICovXG5pbXBvcnQgQWRzIGZyb20gXCJhcGkvcHJvdmlkZXIvYWRzL0Fkc1wiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXJcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlLCBwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUlMsIElOSVRfUlRNUF9TRVRVUF9FUlJPUixcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLFxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLCBTVEFURV9BRF9QTEFZSU5HLFxuICAgIENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIENvcmUgRm9yIEZsYXNoIFZpZGVvLlxuICogQHBhcmFtICAgc3BlYyBtZW1iZXIgdmFsdWVcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xuICogKi9cblxuXG5jb25zdCBQcm92aWRlciA9IGZ1bmN0aW9uKHNwZWMsIHBsYXllckNvbmZpZyl7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG4gICAgbGV0IGVsRmxhc2ggPSBzcGVjLmVsZW1lbnQ7XG4gICAgbGV0IGFkcyA9IG51bGwsIGxpc3RlbmVyID0gbnVsbCwgdmlkZW9FbmRlZENhbGxiYWNrID0gbnVsbDtcblxuICAgIC8vSXQgbWVhbnMgdG8gc3VwcG9ydCBhZCBmb3IgZmxhc2guIFNldCB0aGUgc2FtZSBzcGVjaWZpY2F0aW9ucyBsaWtlIGEgVmlkZW8gVGFnLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbEZsYXNoLCAnY3VycmVudFRpbWUnLFxuICAgICAgICB7dmFsdWUgOjAsIHdyaXRhYmxlIDogdHJ1ZX1cbiAgICApO1xuXG4gICAgaWYoc3BlYy5hZFRhZ1VybCl7XG4gICAgICAgIGFkcyA9IEFkcyhlbEZsYXNoLCB0aGF0LCBwbGF5ZXJDb25maWcsIHNwZWMuYWRUYWdVcmwpO1xuICAgIH1cbiAgICBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKGVsRmxhc2gsIHRoYXQsIGFkcyA/IGFkcy52aWRlb0VuZGVkQ2FsbGJhY2sgOiBudWxsKTtcblxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAgc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV07XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBsb2FkZWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gZWxGbGFzaC5nZXRDdXJyZW50U291cmNlKCk7XG4gICAgICAgIGNvbnN0IHNvdXJjZUNoYW5nZWQgPSAoc291cmNlLmZpbGUgIT09IHByZXZpb3VzU291cmNlKTtcblxuICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xuICAgICAgICAgICAgZWxGbGFzaC5sb2FkKHNvdXJjZS5maWxlKTtcbiAgICAgICAgfWVsc2UgaWYobGFzdFBsYXlQb3NpdGlvbiA9PT0gMCAmJiB0aGF0LmdldFBvc2l0aW9uKCkgPiAwKXtcbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XG5cbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9UaGlzIGlzIHdoeS4gRmxhc2ggZG9lcyBub3Qgc2VsZiB0cmlnIHRvIGFkcyxsbWFsbSxcbiAgICB0aGF0LnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCA9IChmdW5jTmFtZSwgZnVuY0RhdGEpID0+IHtcbiAgICAgICAgaWYobGlzdGVuZXJbZnVuY05hbWVdKXtcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lcltmdW5jTmFtZV0oZnVuY0RhdGEpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldE5hbWUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XG4gICAgfTtcblxuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XG4gICAgICAgIHNwZWMuY2FuU2VlayA9IGNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XG4gICAgICAgIHJldHVybiBzcGVjLnNlZWtpbmc7XG4gICAgfTtcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcbiAgICAgICAgc3BlYy5zZWVraW5nID0gc2Vla2luZztcbiAgICB9O1xuXG4gICAgdGhhdC5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgPT4ge1xuICAgICAgICBpZihzcGVjLnN0YXRlICE9PSBuZXdTdGF0ZSl7XG4gICAgICAgICAgICBsZXQgcHJldlN0YXRlID0gc3BlYy5zdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChuZXdTdGF0ZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QTEFZSU5HIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BlYy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xuICAgICAgICAgICAgICAgIHByZXZzdGF0ZSA6IHByZXZTdGF0ZSxcbiAgICAgICAgICAgICAgICBuZXdzdGF0ZTogc3BlYy5zdGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcblxuICAgIH07XG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0QnVmZmVyID8gZWxGbGFzaC5nZXRCdWZmZXIoKSA6IG51bGw7XG4gICAgfTtcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldER1cmF0aW9uID8gZWxGbGFzaC5nZXREdXJhdGlvbigpIDogMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0UG9zaXRpb24gPyBlbEZsYXNoLmdldFBvc2l0aW9uKCkgOiAwO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guc2V0Vm9sdW1lID8gZWxGbGFzaC5zZXRWb2x1bWUodm9sdW1lKSA6IDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5zZXRWb2x1bWUgPyBlbEZsYXNoLmdldFZvbHVtZSgpIDogMDtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIGVsRmxhc2guc2V0TXV0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0TXV0ZSA/IGVsRmxhc2guZ2V0TXV0ZSgpIDogZmFsc2U7XG4gICAgfTtcblxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHByZWxvYWQoKSBcIiwgc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcblxuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIC8vRmlyc3QgOiBjaGVja1N3ZklzUmVhZHkgLT4gSXQgY2hlY2tzIHN3ZiBsb2FkaW5nIGNvbXBsZXRlIGJ5IHBvbGxpbmcuXG4gICAgICAgICAgICAvL1NlY29uZCA6IGNoZWNrRmlsZUxvYWRlZCAtPiBJdCBjaGVja3Mgc3JjIGxvYWRpbmcgY29tcGxldGUgYnkgcG9sbGluZyB0b28uXG4gICAgICAgICAgICAvL1doeSBjb21wbGV4IGlzIGl0PyAtPiBJdCBhZ2FpbnN0cyBmbGFzaCB0aW1pbmcgaXNzdWUuXG4gICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tTd2ZJc1JlYWR5KCl7XG4gICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcbiAgICAgICAgICAgICAgICBpZihlbEZsYXNoLmlzRmxhc2hSZWFkeSAmJiBlbEZsYXNoLmlzRmxhc2hSZWFkeSgpKXtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsRmxhc2gsICdkdXJhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWUgOmVsRmxhc2guZ2V0RHVyYXRpb24oKX1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbiB8fCAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0cnlDb3VudCA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiBjaGVja0ZpbGVMb2FkZWQoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlbEZsYXNoLmlzRmlsZUxvYWRlZCAmJiBlbEZsYXNoLmlzRmlsZUxvYWRlZCgpKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc011dGUoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpICYmIHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSA8IDEwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDMwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tGaWxlTG9hZGVkLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KEVSUk9SU1tJTklUX1JUTVBfU0VUVVBfRVJST1JdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDEwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrU3dmSXNSZWFkeSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KEVSUk9SU1tJTklUX1JUTVBfU0VUVVBfRVJST1JdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcbiAgICAgICAgX2xvYWQoc3BlYy5zb3VyY2VzXy5zdGFydHRpbWUgfHwgMCk7XG4gICAgfTtcblxuICAgIHRoYXQucGxheSA9ICgpID0+e1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIGlmICggKGFkcyAmJiBhZHMuaXNBY3RpdmUoKSkgfHwgKGFkcyAmJiAhYWRzLnN0YXJ0ZWQoKSkgKSB7XG4gICAgICAgICAgICAgICAgYWRzLnBsYXkoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGVsRmxhc2gucGxheSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgZWxGbGFzaC5wYXVzZSgpO1xuICAgICAgICB9ZWxzZSBpZih0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcpe1xuICAgICAgICAgICAgYWRzLnBhdXNlKCk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcbiAgICAgICAgZWxGbGFzaC5zZWVrKHBvc2l0aW9uKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBpbmRleCA6IGluZGV4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcbiAgICAgICAgaWYoc3BlYy5jdXJyZW50UXVhbGl0eSA9PT0gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XG4gICAgICAgICAgICBpZihzcGVjLnNvdXJjZXMgJiYgc3BlYy5zb3VyY2VzLmxlbmd0aCA+IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBzb3VyY2VJbmRleCk7XG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gc291cmNlSW5kZXg7XG5cbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzb3VyY2VJbmRleFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUxhYmVsKHNwZWMuc291cmNlc1tzb3VyY2VJbmRleF0ubGFiZWwpO1xuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgX2xvYWQoZWxGbGFzaC5nZXRDdXJyZW50VGltZSgpIHx8IDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0RnJhbWVyYXRlID0gKGZyYW1lcmF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGUgPSBmcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PntcbiAgICAgICAgbGV0IGZwcyA9IHNwZWMuZnJhbWVyYXRlO1xuICAgICAgICBsZXQgY3VycmVudEZyYW1lcyA9IGVsRmxhc2guZ2V0Q3VycmVudFRpbWUoKSAqIGZwcztcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXG5cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xuICAgIH07XG5cbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XG4gICAgICAgIGVsRmxhc2guc3RvcCgpO1xuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGRlc3Ryb3koKSBwbGF5ZXIgc3RvcCwgbGlzdGVuZXIsIGV2ZW50IGRlc3Ryb2llZFwiKTtcblxuICAgICAgICBlbEZsYXNoLnJlbW92ZSgpO1xuXG4gICAgICAgIGlmKGFkcyl7XG4gICAgICAgICAgICBhZHMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgfTtcblxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyMy4uXG4gKi9cbmltcG9ydCB7U1RBVEVfSURMRSwgUFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2ZsYXNoL1Byb3ZpZGVyXCI7XG4vKipcbiAqIEBicmllZiAgIHJ0bXAgcHJvdmlkZXJcbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5cbmNvbnN0IFJ0bXAgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyA9IG51bGw7XG5cbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgbmFtZSA6IFBST1ZJREVSX1JUTVAsXG4gICAgICAgIGVsZW1lbnQgOiBlbGVtZW50LFxuICAgICAgICBtc2UgOiBudWxsLFxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXG4gICAgICAgIGNhblNlZWsgOiBmYWxzZSxcbiAgICAgICAgaXNMaXZlIDogZmFsc2UsXG4gICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcbiAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxuICAgICAgICBidWZmZXIgOiAwLFxuICAgICAgICBmcmFtZXJhdGUgOiAwLFxuICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxuICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXG4gICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcbiAgICAgICAgc291cmNlcyA6IFtdLFxuICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXG4gICAgfTtcblxuICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIG51bGwpO1xuICAgIHN1cGVyRGVzdHJveV9mdW5jICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlJUTVAgUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJSVE1QIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFJ0bXA7Il0sInNvdXJjZVJvb3QiOiIifQ==