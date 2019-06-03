/*! OvenPlayerv0.9.5952 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcC5qcyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImVsRmxhc2giLCJwcm92aWRlciIsInZpZGVvRW5kZWRDYWxsYmFjayIsInRoYXQiLCJpc0pTUmVhZHkiLCJ0aW1ldXBkYXRlIiwiZGF0YSIsImN1cnJlbnRUaW1lIiwicG9zaXRpb24iLCJ0cmlnZ2VyIiwiQ09OVEVOVF9USU1FIiwiZHVyYXRpb24iLCJnZXRTdGF0ZSIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsInNldFN0YXRlIiwidm9sdW1lQ2hhbmdlZCIsIkNPTlRFTlRfVk9MVU1FIiwic3RhdGVDaGFuZ2VkIiwibmV3c3RhdGUiLCJtZXRhQ2hhbmdlZCIsIkNPTlRFTlRfTUVUQSIsImVycm9yIiwiU1RBVEVfRVJST1IiLCJwYXVzZSIsIkVSUk9SIiwiUHJvdmlkZXIiLCJzcGVjIiwicGxheWVyQ29uZmlnIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJlbGVtZW50IiwiYWRzIiwibGlzdGVuZXIiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwid3JpdGFibGUiLCJhZFRhZ1VybCIsImNvbnNvbGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJzb3VyY2VzIiwiY3VycmVudFNvdXJjZSIsInByZXZpb3VzU291cmNlIiwiZ2V0Q3VycmVudFNvdXJjZSIsInNvdXJjZUNoYW5nZWQiLCJmaWxlIiwibG9hZCIsImdldFBvc2l0aW9uIiwic2VlayIsImlzQXV0b1N0YXJ0IiwicGxheSIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsImZ1bmNOYW1lIiwiZnVuY0RhdGEiLCJnZXROYW1lIiwibmFtZSIsImNhblNlZWsiLCJzZXRDYW5TZWVrIiwiaXNTZWVraW5nIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJuZXdTdGF0ZSIsInN0YXRlIiwicHJldlN0YXRlIiwiUExBWUVSX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiUExBWUVSX1BBVVNFIiwiU1RBVEVfUExBWUlORyIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwic2V0QnVmZmVyIiwibmV3QnVmZmVyIiwiZ2V0QnVmZmVyIiwiZ2V0RHVyYXRpb24iLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRNdXRlIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJyZXRyeUNvdW50IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjaGVja1N3ZklzUmVhZHkiLCJpc0ZsYXNoUmVhZHkiLCJjaGVja0ZpbGVMb2FkZWQiLCJpc0ZpbGVMb2FkZWQiLCJpc011dGUiLCJzZXRUaW1lb3V0IiwiRVJST1JTIiwiSU5JVF9SVE1QX1NFVFVQX0VSUk9SIiwic291cmNlc18iLCJzdGFydHRpbWUiLCJpc0FjdGl2ZSIsInN0YXJ0ZWQiLCJTVEFURV9BRF9QTEFZSU5HIiwic2V0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiZ2V0U291cmNlcyIsIm1hcCIsImluZGV4IiwidHlwZSIsImxhYmVsIiwic2V0Q3VycmVudFNvdXJjZSIsInNvdXJjZUluZGV4IiwibmVlZFByb3ZpZGVyQ2hhbmdlIiwiY3VycmVudFF1YWxpdHkiLCJsZW5ndGgiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwic2V0U291cmNlTGFiZWwiLCJnZXRDdXJyZW50VGltZSIsImdldFF1YWxpdHlMZXZlbHMiLCJxdWFsaXR5TGV2ZWxzIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldEZyYW1lcmF0ZSIsImZyYW1lcmF0ZSIsInNldEZyYW1lcmF0ZSIsInNlZWtGcmFtZSIsImZyYW1lQ291bnQiLCJmcHMiLCJjdXJyZW50RnJhbWVzIiwibmV3UG9zaXRpb24iLCJzdG9wIiwiZGVzdHJveSIsInJlbW92ZSIsIm9mZiIsIm1ldGhvZCIsImFwcGx5IiwiYXJndW1lbnRzIiwiUnRtcCIsInN1cGVyRGVzdHJveV9mdW5jIiwiUFJPVklERVJfUlRNUCIsIm1zZSIsImlzTGl2ZSIsImJ1ZmZlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7QUE2QkEsSUFBTUEsV0FBVyxTQUFYQSxRQUFXLENBQVNDLE9BQVQsRUFBa0JDLFFBQWxCLEVBQTRCQyxrQkFBNUIsRUFBK0M7QUFDNUQsUUFBSUMsT0FBTyxFQUFYOztBQUVBQSxTQUFLQyxTQUFMLEdBQWlCLFlBQUs7QUFDbEIsZUFBTyxJQUFQO0FBQ0gsS0FGRDtBQUdBRCxTQUFLRSxVQUFMLEdBQWtCLFVBQUNDLElBQUQsRUFBUzs7QUFFdkJOLGdCQUFRTyxXQUFSLEdBQXNCRCxLQUFLRSxRQUEzQjtBQUNBUCxpQkFBU1EsT0FBVCxDQUFpQkMsdUJBQWpCLEVBQStCSixJQUEvQjtBQUNBO0FBQ0E7QUFDQSxZQUFHQSxLQUFLRSxRQUFMLElBQWtCRixLQUFLSyxRQUFMLEdBQWMsQ0FBbkMsRUFBc0M7QUFDbEMsZ0JBQUdWLFNBQVNXLFFBQVQsT0FBd0JDLHFCQUF4QixJQUFzQ1osU0FBU1csUUFBVCxPQUF3QkUseUJBQWpFLEVBQWdGO0FBQzVFLG9CQUFHWixrQkFBSCxFQUFzQjtBQUNsQkEsdUNBQW1CLFlBQVU7QUFDekJELGlDQUFTYyxRQUFULENBQWtCRCx5QkFBbEI7QUFDSCxxQkFGRDtBQUdILGlCQUpELE1BSUs7QUFDRGIsNkJBQVNjLFFBQVQsQ0FBa0JELHlCQUFsQjtBQUNIO0FBRUo7QUFDSjtBQUNKLEtBbEJEO0FBbUJBWCxTQUFLYSxhQUFMLEdBQXFCLFVBQUNWLElBQUQsRUFBUztB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dkksSUFBYixFQUFtQndJLFNBQW5CLENBQVA7QUFDSCxTQUZEO0FBR0gsS0FMRDtBQU1BLFdBQU94SSxJQUFQO0FBQ0gsQ0FyVkQsQyxDQXRCQTs7O3FCQThXZXVCLFE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNXZjs7QUFDQTs7Ozs7O0FBQ0E7Ozs7OztBQUxBOzs7QUFZQSxJQUFNa0gsT0FBTyxTQUFQQSxJQUFPLENBQVM3RyxPQUFULEVBQWtCSCxZQUFsQixFQUFnQ1UsUUFBaEMsRUFBeUM7QUFDbEQsUUFBSW5DLE9BQU8sRUFBWDtBQUNBLFFBQUkwSSxvQkFBb0IsSUFBeEI7O0FBRUEsUUFBSWxILE9BQU87QUFDUCtCLGNBQU9vRix3QkFEQTtBQUVQL0csaUJBQVVBLE9BRkg7QUFHUGdILGFBQU0sSUFIQztBQUlQOUcsa0JBQVcsSUFKSjtBQUtQMEIsaUJBQVUsS0FMSDtBQU1QcUYsZ0JBQVMsS0FORjtBQU9QbEYsaUJBQVUsS0FQSDtBQVFQRyxlQUFRcEQscUJBUkQ7QUFTUG9JLGdCQUFTLENBVEY7QUFVUG5CLG1CQUFZLENBVkw7QUFXUGQsd0JBQWlCLENBQUMsQ0FYWDtBQVlQcEUsdUJBQWdCLENBQUMsQ0FaVjtBQWFQMEUsdUJBQWdCLEVBYlQ7QUFjUDNFLGlCQUFVLEVBZEg7QUFlUEwsa0JBQVdBO0FBZkosS0FBWDs7QUFrQkFuQyxXQUFPLDJCQUFTd0IsSUFBVCxFQUFlQyxZQUFmLEVBQTZCLElBQTdCLENBQVA7QUFDQWlILHdCQUFxQjFJLGNBQVcsU0FBWCxDQUFyQjs7QUFFQTBCLHNCQUFrQkMsR0FBbEIsQ0FBc0IsdUJBQXRCOztBQUVBM0IsU0FBS21JLE9BQUwsR0FBZSxZQUFLO0FBQ2hCekcsMEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7QUFDQStHO0FBQ0gsS0FIRDs7QUFLQSxXQUFPMUksSUFBUDtBQUNILENBakNEOztxQkFvQ2V5SSxJIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjcuLlxuICovXG5pbXBvcnQge1xuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUExBWUVSX1NUQVRFLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGVsRmxhc2gsIHByb3ZpZGVyLCB2aWRlb0VuZGVkQ2FsbGJhY2spe1xuICAgIGxldCB0aGF0ID0ge307XG5cbiAgICB0aGF0LmlzSlNSZWFkeSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHRoYXQudGltZXVwZGF0ZSA9IChkYXRhKSA9PntcblxuICAgICAgICBlbEZsYXNoLmN1cnJlbnRUaW1lID0gZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIGRhdGEpO1xuICAgICAgICAvL3Byb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVIsIGRhdGEpO1xuICAgICAgICAvL2RhdGEuZHVyYXRpb24tMSA6IHRoaXMgaXMgdHJpY2suIGJlY2F1c2Ugc29tZXRpbWVzIHJ0bXAncyBwb3NpdGlvbiA8IGR1cmF0aW9uIHdoZW4gdmlkZW8gZW5kZWQuXG4gICAgICAgIGlmKGRhdGEucG9zaXRpb24gPj0gKGRhdGEuZHVyYXRpb24tMSkpe1xuICAgICAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9DT01QTEVURSl7XG4gICAgICAgICAgICAgICAgaWYodmlkZW9FbmRlZENhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9FbmRlZENhbGxiYWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQudm9sdW1lQ2hhbmdlZCA9IChkYXRhKSA9PntcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwgZGF0YSk7XG4gICAgfTtcbiAgICB0aGF0LnN0YXRlQ2hhbmdlZCA9IChkYXRhKSA9PntcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoZGF0YS5uZXdzdGF0ZSk7XG4gICAgfTtcbiAgICB0aGF0Lm1ldGFDaGFuZ2VkID0gKGRhdGEpID0+e1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgZGF0YSk7XG4gICAgfTtcbiAgICB0aGF0LmVycm9yID0gKGVycm9yKSA9PntcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuXG4gICAgICAgIC8vUFJJVkFURV9TVEFURV9FUlJPUlxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvcik7XG5cbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyMy4uXG4gKi9cbmltcG9ydCBBZHMgZnJvbSBcImFwaS9wcm92aWRlci9hZHMvQWRzXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9mbGFzaC9MaXN0ZW5lclwiO1xuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBzZXBhcmF0ZUxpdmUsIHBpY2tDdXJyZW50U291cmNlfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIEVSUk9SUywgSU5JVF9SVE1QX1NFVFVQX0VSUk9SLFxuICAgIFNUQVRFX0lETEUsIFNUQVRFX1BMQVlJTkcsIFNUQVRFX1BBVVNFRCwgU1RBVEVfQ09NUExFVEUsXG4gICAgUExBWUVSX1NUQVRFLCBQTEFZRVJfQ09NUExFVEUsIFBMQVlFUl9QQVVTRSwgUExBWUVSX1BMQVksIFNUQVRFX0FEX1BMQVlJTkcsXG4gICAgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwgQ09OVEVOVF9MRVZFTF9DSEFOR0VELCBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCxcbiAgICBQTEFZQkFDS19SQVRFX0NIQU5HRUQsIENPTlRFTlRfTVVURSwgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgQ29yZSBGb3IgRmxhc2ggVmlkZW8uXG4gKiBAcGFyYW0gICBzcGVjIG1lbWJlciB2YWx1ZVxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICBwbGF5ZXIgY29uZmlnXG4gKiAqL1xuXG5cbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24oc3BlYywgcGxheWVyQ29uZmlnKXtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIGxvYWRlZC4gXCIpO1xuXG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XG5cbiAgICBsZXQgZWxGbGFzaCA9IHNwZWMuZWxlbWVudDtcbiAgICBsZXQgYWRzID0gbnVsbCwgbGlzdGVuZXIgPSBudWxsLCB2aWRlb0VuZGVkQ2FsbGJhY2sgPSBudWxsO1xuXG4gICAgLy9JdCBtZWFucyB0byBzdXBwb3J0IGFkIGZvciBmbGFzaC4gU2V0IHRoZSBzYW1lIHNwZWNpZmljYXRpb25zIGxpa2UgYSBWaWRlbyBUYWcuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsRmxhc2gsICdjdXJyZW50VGltZScsXG4gICAgICAgIHt2YWx1ZSA6MCwgd3JpdGFibGUgOiB0cnVlfVxuICAgICk7XG5cbiAgICBpZihzcGVjLmFkVGFnVXJsKXtcbiAgICAgICAgYWRzID0gQWRzKGVsRmxhc2gsIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XG4gICAgICAgIGlmKCFhZHMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYW4gbm90IGxvYWQgZHVlIHRvIGdvb2dsZSBpbWEgZm9yIEFkcy5cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihlbEZsYXNoLCB0aGF0LCBhZHMgPyBhZHMudmlkZW9FbmRlZENhbGxiYWNrIDogbnVsbCk7XG5cbiAgICBjb25zdCBfbG9hZCA9IChsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgY29uc3Qgc291cmNlID0gIHNwZWMuc291cmNlc1tzcGVjLmN1cnJlbnRTb3VyY2VdO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICBjb25zdCBwcmV2aW91c1NvdXJjZSA9IGVsRmxhc2guZ2V0Q3VycmVudFNvdXJjZSgpO1xuICAgICAgICBjb25zdCBzb3VyY2VDaGFuZ2VkID0gKHNvdXJjZS5maWxlICE9PSBwcmV2aW91c1NvdXJjZSk7XG5cbiAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIGVsRmxhc2gubG9hZChzb3VyY2UuZmlsZSk7XG4gICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgdGhhdC5nZXRQb3NpdGlvbigpID4gMCl7XG4gICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xuXG4gICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vVGhpcyBpcyB3aHkuIEZsYXNoIGRvZXMgbm90IHNlbGYgdHJpZyB0byBhZHMsbG1hbG0sXG4gICAgdGhhdC50cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwgPSAoZnVuY05hbWUsIGZ1bmNEYXRhKSA9PiB7XG4gICAgICAgIGlmKGxpc3RlbmVyW2Z1bmNOYW1lXSl7XG4gICAgICAgICAgICByZXR1cm4gbGlzdGVuZXJbZnVuY05hbWVdKGZ1bmNEYXRhKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5uYW1lO1xuICAgIH07XG5cbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LnNldENhblNlZWsgPSAoY2FuU2VlaykgPT4ge1xuICAgICAgICBzcGVjLmNhblNlZWsgPSBjYW5TZWVrO1xuICAgIH07XG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e1xuICAgICAgICByZXR1cm4gc3BlYy5zZWVraW5nO1xuICAgIH07XG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmcpPT57XG4gICAgICAgIHNwZWMuc2Vla2luZyA9IHNlZWtpbmc7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHNwZWMuc3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2gobmV3U3RhdGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQ09NUExFVEUgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwZWMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcbiAgICAgICAgICAgICAgICBwcmV2c3RhdGUgOiBwcmV2U3RhdGUsXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLnN0YXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XG5cbiAgICB9O1xuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldEJ1ZmZlciA/IGVsRmxhc2guZ2V0QnVmZmVyKCkgOiBudWxsO1xuICAgIH07XG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXREdXJhdGlvbiA/IGVsRmxhc2guZ2V0RHVyYXRpb24oKSA6IDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldFBvc2l0aW9uID8gZWxGbGFzaC5nZXRQb3NpdGlvbigpIDogMDtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLnNldFZvbHVtZSA/IGVsRmxhc2guc2V0Vm9sdW1lKHZvbHVtZSkgOiAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guc2V0Vm9sdW1lID8gZWxGbGFzaC5nZXRWb2x1bWUoKSA6IDA7XG4gICAgfTtcbiAgICB0aGF0LnNldE11dGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICBlbEZsYXNoLnNldE11dGUoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldE11dGUgPyBlbEZsYXNoLmdldE11dGUoKSA6IGZhbHNlO1xuICAgIH07XG5cbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBwcmVsb2FkKCkgXCIsIHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XG5cbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAvL0ZpcnN0IDogY2hlY2tTd2ZJc1JlYWR5IC0+IEl0IGNoZWNrcyBzd2YgbG9hZGluZyBjb21wbGV0ZSBieSBwb2xsaW5nLlxuICAgICAgICAgICAgLy9TZWNvbmQgOiBjaGVja0ZpbGVMb2FkZWQgLT4gSXQgY2hlY2tzIHNyYyBsb2FkaW5nIGNvbXBsZXRlIGJ5IHBvbGxpbmcgdG9vLlxuICAgICAgICAgICAgLy9XaHkgY29tcGxleCBpcyBpdD8gLT4gSXQgYWdhaW5zdHMgZmxhc2ggdGltaW5nIGlzc3VlLlxuICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrU3dmSXNSZWFkeSgpe1xuICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZsYXNoUmVhZHkgJiYgZWxGbGFzaC5pc0ZsYXNoUmVhZHkoKSl7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbEZsYXNoLCAnZHVyYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAge3ZhbHVlIDplbEZsYXNoLmdldER1cmF0aW9uKCl9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gY2hlY2tGaWxlTG9hZGVkKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZpbGVMb2FkZWQgJiYgZWxGbGFzaC5pc0ZpbGVMb2FkZWQoKSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNNdXRlKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSAmJiBwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkgPCAxMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFZvbHVtZShwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAzMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRmlsZUxvYWRlZCwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAxMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja1N3ZklzUmVhZHksIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXMpID0+e1xuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKHNwZWMuc291cmNlc18uc3RhcnR0aW1lIHx8IDApO1xuICAgIH07XG5cbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBpZiAoIChhZHMgJiYgYWRzLmlzQWN0aXZlKCkpIHx8IChhZHMgJiYgIWFkcy5zdGFydGVkKCkpICkge1xuICAgICAgICAgICAgICAgIGFkcy5wbGF5KCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBlbEZsYXNoLnBsYXkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuICAgIHRoYXQucGF1c2UgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIGVsRmxhc2gucGF1c2UoKTtcbiAgICAgICAgfWVsc2UgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKXtcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT57XG4gICAgICAgIGVsRmxhc2guc2Vlayhwb3NpdGlvbik7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXG4gICAgICAgICAgICAgICAgaW5kZXggOiBpbmRleFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChzb3VyY2VJbmRleCwgbmVlZFByb3ZpZGVyQ2hhbmdlKSA9PiB7XG4gICAgICAgIGlmKHNwZWMuY3VycmVudFF1YWxpdHkgPT09IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNvdXJjZUluZGV4ID4gLTEpe1xuICAgICAgICAgICAgaWYoc3BlYy5zb3VyY2VzICYmIHNwZWMuc291cmNlcy5sZW5ndGggPiBzb3VyY2VJbmRleCl7XG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgY2hhbmdlZCA6IFwiICsgc291cmNlSW5kZXgpO1xuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHNvdXJjZUluZGV4O1xuXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc291cmNlSW5kZXhcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcbiAgICAgICAgICAgICAgICBpZihuZWVkUHJvdmlkZXJDaGFuZ2Upe1xuXG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsRmxhc2guZ2V0Q3VycmVudFRpbWUoKSB8fCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGV2ZWxzO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEZyYW1lcmF0ZSA9IChmcmFtZXJhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlID0gZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT57XG4gICAgICAgIGxldCBmcHMgPSBzcGVjLmZyYW1lcmF0ZTtcbiAgICAgICAgbGV0IGN1cnJlbnRGcmFtZXMgPSBlbEZsYXNoLmdldEN1cnJlbnRUaW1lKCkgKiBmcHM7XG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IChjdXJyZW50RnJhbWVzICsgZnJhbWVDb3VudCkgLyBmcHM7XG4gICAgICAgIG5ld1Bvc2l0aW9uID0gbmV3UG9zaXRpb24gKyAwLjAwMDAxOyAvLyBGSVhFUyBBIFNBRkFSSSBTRUVLIElTU1VFLiBteVZkaWVvLmN1cnJlbnRUaW1lID0gMC4wNCB3b3VsZCBnaXZlIFNNUFRFIDAwOjAwOjAwOjAwIHdoZXJhcyBpdCBzaG91bGQgZ2l2ZSAwMDowMDowMDowMVxuXG4gICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgdGhhdC5zZWVrKG5ld1Bvc2l0aW9uKTtcbiAgICB9O1xuXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xuICAgICAgICBlbEZsYXNoLnN0b3AoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG5cbiAgICAgICAgZWxGbGFzaC5yZW1vdmUoKTtcblxuICAgICAgICBpZihhZHMpe1xuICAgICAgICAgICAgYWRzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Lm9mZigpO1xuICAgIH07XG5cbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cbiAgICAvLyB1c2UgOiBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7IC4uLiBzdXBlcl9kZXN0cm95KCk7XG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxuICovXG5pbXBvcnQge1NUQVRFX0lETEUsIFBST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlclwiO1xuLyoqXG4gKiBAYnJpZWYgICBydG1wIHByb3ZpZGVyXG4gKiBAcGFyYW0gICBlbGVtZW50IHZpZGVvIGVsZW1lbnQuXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxuICogKi9cblxuXG5jb25zdCBSdG1wID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuXG4gICAgbGV0IHNwZWMgPSB7XG4gICAgICAgIG5hbWUgOiBQUk9WSURFUl9SVE1QLFxuICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcbiAgICAgICAgbXNlIDogbnVsbCxcbiAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxuICAgICAgICBjYW5TZWVrIDogZmFsc2UsXG4gICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxuICAgICAgICBzZWVraW5nIDogZmFsc2UsXG4gICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcbiAgICAgICAgYnVmZmVyIDogMCxcbiAgICAgICAgZnJhbWVyYXRlIDogMCxcbiAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcbiAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxuICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXG4gICAgICAgIHNvdXJjZXMgOiBbXSxcbiAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxuICAgIH07XG5cbiAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBudWxsKTtcbiAgICBzdXBlckRlc3Ryb3lfZnVuYyAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJSVE1QIFBST1ZJREVSIExPQURFRC5cIik7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUlRNUCA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBSdG1wOyJdLCJzb3VyY2VSb290IjoiIn0=