/*! OvenPlayerv0.9.494 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        provider.trigger(_constants.CONTENT_BUFFER, data);

        if (data.position >= data.duration) {
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

    if (spec.adTag) {
        ads = (0, _Ads2["default"])(elFlash, that, playerConfig, spec.adTag);
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
                        if (elFlash.isFileLoaded()) {

                            if (playerConfig.isAutoStart()) {
                                that.play();
                            }

                            if (playerConfig.isMute()) {
                                that.setMute(true);
                            }
                            if (playerConfig.getVolume() && playerConfig.getVolume() < 100) {
                                that.setVolume(playerConfig.getVolume());
                            }

                            return resolve();
                        } else {
                            if (retryCount < 100) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcC5qcyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImVsRmxhc2giLCJwcm92aWRlciIsInZpZGVvRW5kZWRDYWxsYmFjayIsInRoYXQiLCJpc0pTUmVhZHkiLCJ0aW1ldXBkYXRlIiwiZGF0YSIsImN1cnJlbnRUaW1lIiwicG9zaXRpb24iLCJ0cmlnZ2VyIiwiQ09OVEVOVF9USU1FIiwiQ09OVEVOVF9CVUZGRVIiLCJkdXJhdGlvbiIsImdldFN0YXRlIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwic2V0U3RhdGUiLCJ2b2x1bWVDaGFuZ2VkIiwiQ09OVEVOVF9WT0xVTUUiLCJzdGF0ZUNoYW5nZWQiLCJuZXdzdGF0ZSIsIm1ldGFDaGFuZ2VkIiwiQ09OVEVOVF9NRVRBIiwiZXJyb3IiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwiRVJST1IiLCJQcm92aWRlciIsInNwZWMiLCJwbGF5ZXJDb25maWciLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImVsZW1lbnQiLCJhZHMiLCJsaXN0ZW5lciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImFkVGFnIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwic291cmNlcyIsImN1cnJlbnRTb3VyY2UiLCJwcmV2aW91c1NvdXJjZSIsImdldEN1cnJlbnRTb3VyY2UiLCJzb3VyY2VDaGFuZ2VkIiwiZmlsZSIsImxvYWQiLCJnZXRQb3NpdGlvbiIsInNlZWsiLCJwbGF5IiwidHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsIiwiZnVuY05hbWUiLCJmdW5jRGF0YSIsImdldE5hbWUiLCJuYW1lIiwiY2FuU2VlayIsInNldENhblNlZWsiLCJpc1NlZWtpbmciLCJzZWVraW5nIiwic2V0U2Vla2luZyIsIm5ld1N0YXRlIiwic3RhdGUiLCJwcmV2U3RhdGUiLCJQTEFZRVJfQ09NUExFVEUiLCJTVEFURV9QQVVTRUQiLCJQTEFZRVJfUEFVU0UiLCJTVEFURV9QTEFZSU5HIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfU1RBVEUiLCJwcmV2c3RhdGUiLCJzZXRCdWZmZXIiLCJuZXdCdWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsInNldFZvbHVtZSIsInZvbHVtZSIsImdldFZvbHVtZSIsInNldE11dGUiLCJnZXRNdXRlIiwicHJlbG9hZCIsInJldHJ5Q291bnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNoZWNrU3dmSXNSZWFkeSIsImlzRmxhc2hSZWFkeSIsImNoZWNrRmlsZUxvYWRlZCIsImlzRmlsZUxvYWRlZCIsImlzQXV0b1N0YXJ0IiwiaXNNdXRlIiwic2V0VGltZW91dCIsIkVSUk9SUyIsIklOSVRfUlRNUF9TRVRVUF9FUlJPUiIsInNvdXJjZXNfIiwic3RhcnR0aW1lIiwiaXNBY3RpdmUiLCJzdGFydGVkIiwiU1RBVEVfQURfUExBWUlORyIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsImdldFNvdXJjZXMiLCJtYXAiLCJpbmRleCIsInR5cGUiLCJsYWJlbCIsInNldEN1cnJlbnRTb3VyY2UiLCJzb3VyY2VJbmRleCIsIm5lZWRQcm92aWRlckNoYW5nZSIsImN1cnJlbnRRdWFsaXR5IiwibGVuZ3RoIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsInNldFNvdXJjZUxhYmVsIiwiZ2V0Q3VycmVudFRpbWUiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRGcmFtZXJhdGUiLCJmcmFtZXJhdGUiLCJzZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZnBzIiwiY3VycmVudEZyYW1lcyIsIm5ld1Bvc2l0aW9uIiwic3RvcCIsImRlc3Ryb3kiLCJyZW1vdmUiLCJvZmYiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyIsIlJ0bXAiLCJhZFRhZ1VybCIsInN1cGVyRGVzdHJveV9mdW5jIiwiUFJPVklERVJfUlRNUCIsIm1zZSIsImlzTGl2ZSIsImJ1ZmZlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7QUE2QkEsSUFBTUEsV0FBVyxTQUFYQSxRQUFXLENBQVNDLE9BQVQsRUFBa0JDLFFBQWxCLEVBQTRCQyxrQkFBNUIsRUFBK0M7QUFDNUQsUUFBSUMsT0FBTyxFQUFYOztBQUVBQSxTQUFLQyxTQUFMLEdBQWlCLFlBQUs7QUFDbEIsZUFBTyxJQUFQO0FBQ0gsS0FGRDtBQUdBRCxTQUFLRSxVQUFMLEdBQWtCLFVBQUNDLElBQUQsRUFBUzs7QUFFdkJOLGdCQUFRTyxXQUFSLEdBQXNCRCxLQUFLRSxRQUEzQjtBQUNBUCxpQkFBU1EsT0FBVCxDQUFpQkMsdUJBQWpCLEVBQStCSixJQUEvQjtBQUNBTCxpQkFBU1EsT0FBVCxDQUFpQkUseUJBQWpCLEVBQWlDTCxJQUFqQzs7QUFFQSxZQUFHQSxLQUFLRSxRQUFMLElBQWlCRixLQUFLTSxRQUF6QixFQUFrQztBQUM5QixnQkFBR1gsU0FBU1ksUUFBVCxPQUF3QkMscUJBQXhCLElBQXNDYixTQUFTWSxRQUFULE9BQXdCRSx5QkFBakUsRUFBZ0Y7QUFDNUUsb0JBQUdiLGtCQUFILEVBQXNCO0FBQ2xCQSx1Q0FBbUIsWUFBVTtBQUN6QkQsaUNBQVNlLFFBQVQsQ0FBa0JELHlCQUFsQjtBQUNILHFCQUZEO0FBR0gsaUJBSkQsTUFJSztBQUNEZCw2QkFBU2UsUUFBVCxDQUFrQkQseUJBQWxCO0FBQ0g7QUFFSjtBQUNKO0FBQ0osS0FsQkQ7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Ozs7Ozs7Ozs7Ozs7O0FDdldmOztBQUNBOzs7Ozs7QUFDQTs7Ozs7O0FBTEE7OztBQVlBLElBQU1pSCxPQUFPLFNBQVBBLElBQU8sQ0FBUzVHLE9BQVQsRUFBa0JILFlBQWxCLEVBQWdDZ0gsUUFBaEMsRUFBeUM7QUFDbEQsUUFBSTFJLE9BQU8sRUFBWDtBQUNBLFFBQUkySSxvQkFBb0IsSUFBeEI7O0FBRUEsUUFBSWxILE9BQU87QUFDUDZCLGNBQU9zRix3QkFEQTtBQUVQL0csaUJBQVVBLE9BRkg7QUFHUGdILGFBQU0sSUFIQztBQUlQOUcsa0JBQVcsSUFKSjtBQUtQd0IsaUJBQVUsS0FMSDtBQU1QdUYsZ0JBQVMsS0FORjtBQU9QcEYsaUJBQVUsS0FQSDtBQVFQRyxlQUFRbEQscUJBUkQ7QUFTUG9JLGdCQUFTLENBVEY7QUFVUHBCLG1CQUFZLENBVkw7QUFXUGQsd0JBQWlCLENBQUMsQ0FYWDtBQVlQcEUsdUJBQWdCLENBQUMsQ0FaVjtBQWFQMEUsdUJBQWdCLEVBYlQ7QUFjUDNFLGlCQUFVLEVBZEg7QUFlUGtHLGtCQUFXQTtBQWZKLEtBQVg7O0FBa0JBMUksV0FBTywyQkFBU3lCLElBQVQsRUFBZUMsWUFBZixFQUE2QixJQUE3QixDQUFQO0FBQ0FpSCx3QkFBcUIzSSxjQUFXLFNBQVgsQ0FBckI7O0FBRUEyQixzQkFBa0JDLEdBQWxCLENBQXNCLHVCQUF0Qjs7QUFFQTVCLFNBQUttSSxPQUFMLEdBQWUsWUFBSztBQUNoQnhHLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCO0FBQ0ErRztBQUNILEtBSEQ7O0FBS0EsV0FBTzNJLElBQVA7QUFDSCxDQWpDRDs7cUJBb0NleUksSSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI3Li5cbiAqL1xuaW1wb3J0IHtcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihlbEZsYXNoLCBwcm92aWRlciwgdmlkZW9FbmRlZENhbGxiYWNrKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuXG4gICAgdGhhdC5pc0pTUmVhZHkgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICB0aGF0LnRpbWV1cGRhdGUgPSAoZGF0YSkgPT57XG5cbiAgICAgICAgZWxGbGFzaC5jdXJyZW50VGltZSA9IGRhdGEucG9zaXRpb247XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FLCBkYXRhKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwgZGF0YSk7XG5cbiAgICAgICAgaWYoZGF0YS5wb3NpdGlvbiA+PSBkYXRhLmR1cmF0aW9uKXtcbiAgICAgICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0lETEUgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfQ09NUExFVEUpe1xuICAgICAgICAgICAgICAgIGlmKHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvRW5kZWRDYWxsYmFjayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnZvbHVtZUNoYW5nZWQgPSAoZGF0YSkgPT57XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIGRhdGEpO1xuICAgIH07XG4gICAgdGhhdC5zdGF0ZUNoYW5nZWQgPSAoZGF0YSkgPT57XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKGRhdGEubmV3c3RhdGUpO1xuICAgIH07XG4gICAgdGhhdC5tZXRhQ2hhbmdlZCA9IChkYXRhKSA9PntcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIGRhdGEpO1xuICAgIH07XG4gICAgdGhhdC5lcnJvciA9IChlcnJvcikgPT57XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcblxuICAgICAgICAvL1BSSVZBVEVfU1RBVEVfRVJST1JcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IpO1xuXG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxuICovXG5pbXBvcnQgQWRzIGZyb20gXCJhcGkvcHJvdmlkZXIvYWRzL0Fkc1wiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXJcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlLCBwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUlMsIElOSVRfUlRNUF9TRVRVUF9FUlJPUixcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLFxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLCBTVEFURV9BRF9QTEFZSU5HLFxuICAgIENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIENvcmUgRm9yIEZsYXNoIFZpZGVvLlxuICogQHBhcmFtICAgc3BlYyBtZW1iZXIgdmFsdWVcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xuICogKi9cblxuXG5jb25zdCBQcm92aWRlciA9IGZ1bmN0aW9uKHNwZWMsIHBsYXllckNvbmZpZyl7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG4gICAgbGV0IGVsRmxhc2ggPSBzcGVjLmVsZW1lbnQ7XG4gICAgbGV0IGFkcyA9IG51bGwsIGxpc3RlbmVyID0gbnVsbCwgdmlkZW9FbmRlZENhbGxiYWNrID0gbnVsbDtcblxuICAgIC8vSXQgbWVhbnMgdG8gc3VwcG9ydCBhZCBmb3IgZmxhc2guIFNldCB0aGUgc2FtZSBzcGVjaWZpY2F0aW9ucyBsaWtlIGEgVmlkZW8gVGFnLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbEZsYXNoLCAnY3VycmVudFRpbWUnLFxuICAgICAgICB7dmFsdWUgOjAsIHdyaXRhYmxlIDogdHJ1ZX1cbiAgICApO1xuXG4gICAgaWYoc3BlYy5hZFRhZyl7XG4gICAgICAgIGFkcyA9IEFkcyhlbEZsYXNoLCB0aGF0LCBwbGF5ZXJDb25maWcsIHNwZWMuYWRUYWcpO1xuICAgIH1cbiAgICBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKGVsRmxhc2gsIHRoYXQsIGFkcyA/IGFkcy52aWRlb0VuZGVkQ2FsbGJhY2sgOiBudWxsKTtcblxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAgc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV07XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBsb2FkZWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gZWxGbGFzaC5nZXRDdXJyZW50U291cmNlKCk7XG4gICAgICAgIGNvbnN0IHNvdXJjZUNoYW5nZWQgPSAoc291cmNlLmZpbGUgIT09IHByZXZpb3VzU291cmNlKTtcblxuICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xuICAgICAgICAgICAgZWxGbGFzaC5sb2FkKHNvdXJjZS5maWxlKTtcbiAgICAgICAgfWVsc2UgaWYobGFzdFBsYXlQb3NpdGlvbiA9PT0gMCAmJiB0aGF0LmdldFBvc2l0aW9uKCkgPiAwKXtcbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XG4gICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvL1RoaXMgaXMgd2h5LiBGbGFzaCBkb2VzIG5vdCBzZWxmIHRyaWcgdG8gYWRzLGxtYWxtLFxuICAgIHRoYXQudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsID0gKGZ1bmNOYW1lLCBmdW5jRGF0YSkgPT4ge1xuICAgICAgICBpZihsaXN0ZW5lcltmdW5jTmFtZV0pe1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyW2Z1bmNOYW1lXShmdW5jRGF0YSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMubmFtZTtcbiAgICB9O1xuXG4gICAgdGhhdC5jYW5TZWVrID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5jYW5TZWVrO1xuICAgIH07XG4gICAgdGhhdC5zZXRDYW5TZWVrID0gKGNhblNlZWspID0+IHtcbiAgICAgICAgc3BlYy5jYW5TZWVrID0gY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuaXNTZWVraW5nID0gKCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuc2Vla2luZztcbiAgICB9O1xuICAgIHRoYXQuc2V0U2Vla2luZyA9IChzZWVraW5nKT0+e1xuICAgICAgICBzcGVjLnNlZWtpbmcgPSBzZWVraW5nO1xuICAgIH07XG5cbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XG4gICAgICAgIGlmKHNwZWMuc3RhdGUgIT09IG5ld1N0YXRlKXtcbiAgICAgICAgICAgIGxldCBwcmV2U3RhdGUgPSBzcGVjLnN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKG5ld1N0YXRlKXtcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0NPTVBMRVRFIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUEFVU0VEIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BMQVlJTkcgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcGVjLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1NUQVRFLCB7XG4gICAgICAgICAgICAgICAgcHJldnN0YXRlIDogcHJldlN0YXRlLFxuICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBzcGVjLnN0YXRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5zdGF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0QnVmZmVyID0gKG5ld0J1ZmZlcikgPT4ge1xuXG4gICAgfTtcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRCdWZmZXIgPyBlbEZsYXNoLmdldEJ1ZmZlcigpIDogbnVsbDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0RHVyYXRpb24gPyBlbEZsYXNoLmdldER1cmF0aW9uKCkgOiAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRQb3NpdGlvbiA/IGVsRmxhc2guZ2V0UG9zaXRpb24oKSA6IDA7XG4gICAgfTtcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5zZXRWb2x1bWUgPyBlbEZsYXNoLnNldFZvbHVtZSh2b2x1bWUpIDogMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLnNldFZvbHVtZSA/IGVsRmxhc2guZ2V0Vm9sdW1lKCkgOiAwO1xuICAgIH07XG4gICAgdGhhdC5zZXRNdXRlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgZWxGbGFzaC5zZXRNdXRlKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRNdXRlID8gZWxGbGFzaC5nZXRNdXRlKCkgOiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdGhhdC5wcmVsb2FkID0gKHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogcHJlbG9hZCgpIFwiLCBzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgLy9GaXJzdCA6IGNoZWNrU3dmSXNSZWFkeSAtPiBJdCBjaGVja3Mgc3dmIGxvYWRpbmcgY29tcGxldGUgYnkgcG9sbGluZy5cbiAgICAgICAgICAgIC8vU2Vjb25kIDogY2hlY2tGaWxlTG9hZGVkIC0+IEl0IGNoZWNrcyBzcmMgbG9hZGluZyBjb21wbGV0ZSBieSBwb2xsaW5nIHRvby5cbiAgICAgICAgICAgIC8vV2h5IGNvbXBsZXggaXMgaXQ/IC0+IEl0IGFnYWluc3RzIGZsYXNoIHRpbWluZyBpc3N1ZS5cbiAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja1N3ZklzUmVhZHkoKXtcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgIGlmKGVsRmxhc2guaXNGbGFzaFJlYWR5ICYmIGVsRmxhc2guaXNGbGFzaFJlYWR5KCkpe1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxGbGFzaCwgJ2R1cmF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZSA6ZWxGbGFzaC5nZXREdXJhdGlvbigpfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uIHx8IDApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gY2hlY2tGaWxlTG9hZGVkKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZpbGVMb2FkZWQoKSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc011dGUoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpICYmIHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSA8IDEwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAxMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRmlsZUxvYWRlZCwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAxMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja1N3ZklzUmVhZHksIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXMpID0+e1xuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKHNwZWMuc291cmNlc18uc3RhcnR0aW1lIHx8IDApO1xuICAgIH07XG5cbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIGlmICggKGFkcyAmJiBhZHMuaXNBY3RpdmUoKSkgfHwgKGFkcyAmJiAhYWRzLnN0YXJ0ZWQoKSkpIHtcbiAgICAgICAgICAgICAgICBhZHMucGxheSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZWxGbGFzaC5wbGF5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICBlbEZsYXNoLnBhdXNlKCk7XG4gICAgICAgIH1lbHNlIGlmKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORyl7XG4gICAgICAgICAgICBhZHMucGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xuICAgICAgICBlbEZsYXNoLnNlZWsocG9zaXRpb24pO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBzb3VyY2UudHlwZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoc291cmNlSW5kZXgsIG5lZWRQcm92aWRlckNoYW5nZSkgPT4ge1xuICAgICAgICBpZihzcGVjLmN1cnJlbnRRdWFsaXR5ID09PSBzb3VyY2VJbmRleCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZihzb3VyY2VJbmRleCA+IC0xKXtcbiAgICAgICAgICAgIGlmKHNwZWMuc291cmNlcyAmJiBzcGVjLnNvdXJjZXMubGVuZ3RoID4gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlTGFiZWwoc3BlYy5zb3VyY2VzW3NvdXJjZUluZGV4XS5sYWJlbCk7XG4gICAgICAgICAgICAgICAgaWYobmVlZFByb3ZpZGVyQ2hhbmdlKXtcblxuICAgICAgICAgICAgICAgICAgICBfbG9hZChlbEZsYXNoLmdldEN1cnJlbnRUaW1lKCkgfHwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMucXVhbGl0eUxldmVscztcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRGcmFtZXJhdGUgPSAoZnJhbWVyYXRlKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZSA9IGZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+e1xuICAgICAgICBsZXQgZnBzID0gc3BlYy5mcmFtZXJhdGU7XG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVzID0gZWxGbGFzaC5nZXRDdXJyZW50VGltZSgpICogZnBzO1xuICAgICAgICBsZXQgbmV3UG9zaXRpb24gPSAoY3VycmVudEZyYW1lcyArIGZyYW1lQ291bnQpIC8gZnBzO1xuICAgICAgICBuZXdQb3NpdGlvbiA9IG5ld1Bvc2l0aW9uICsgMC4wMDAwMTsgLy8gRklYRVMgQSBTQUZBUkkgU0VFSyBJU1NVRS4gbXlWZGllby5jdXJyZW50VGltZSA9IDAuMDQgd291bGQgZ2l2ZSBTTVBURSAwMDowMDowMDowMCB3aGVyYXMgaXQgc2hvdWxkIGdpdmUgMDA6MDA6MDA6MDFcblxuICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgIHRoYXQuc2VlayhuZXdQb3NpdGlvbik7XG4gICAgfTtcblxuICAgIHRoYXQuc3RvcCA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc3RvcCgpIFwiKTtcbiAgICAgICAgZWxGbGFzaC5zdG9wKCk7XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZGVzdHJveSgpIHBsYXllciBzdG9wLCBsaXN0ZW5lciwgZXZlbnQgZGVzdHJvaWVkXCIpO1xuXG4gICAgICAgIGVsRmxhc2gucmVtb3ZlKCk7XG5cbiAgICAgICAgaWYoYWRzKXtcbiAgICAgICAgICAgIGFkcy5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5vZmYoKTtcbiAgICB9O1xuXG4gICAgLy9YWFggOiBJIGhvcGUgdXNpbmcgZXM2IGNsYXNzZXMuIGJ1dCBJIHRoaW5rIHRvIG9jY3VyIHByb2JsZW0gZnJvbSBPbGQgSUUuIFRoZW4gSSBjaG9pY2UgZnVuY3Rpb24gaW5oZXJpdC4gRmluYWxseSB1c2luZyBzdXBlciBmdW5jdGlvbiBpcyBzbyBkaWZmaWN1bHQuXG4gICAgLy8gdXNlIDogbGV0IHN1cGVyX2Rlc3Ryb3kgID0gdGhhdC5zdXBlcignZGVzdHJveScpOyAuLi4gc3VwZXJfZGVzdHJveSgpO1xuICAgIHRoYXQuc3VwZXIgPSAobmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGF0W25hbWVdO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBQcm92aWRlcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDIzLi5cbiAqL1xuaW1wb3J0IHtTVEFURV9JRExFLCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvZmxhc2gvUHJvdmlkZXJcIjtcbi8qKlxuICogQGJyaWVmICAgcnRtcCBwcm92aWRlclxuICogQHBhcmFtICAgZWxlbWVudCB2aWRlbyBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cblxuY29uc3QgUnRtcCA9IGZ1bmN0aW9uKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpe1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcblxuICAgIGxldCBzcGVjID0ge1xuICAgICAgICBuYW1lIDogUFJPVklERVJfUlRNUCxcbiAgICAgICAgZWxlbWVudCA6IGVsZW1lbnQsXG4gICAgICAgIG1zZSA6IG51bGwsXG4gICAgICAgIGxpc3RlbmVyIDogbnVsbCxcbiAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxuICAgICAgICBpc0xpdmUgOiBmYWxzZSxcbiAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxuICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXG4gICAgICAgIGJ1ZmZlciA6IDAsXG4gICAgICAgIGZyYW1lcmF0ZSA6IDAsXG4gICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXG4gICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcbiAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxuICAgICAgICBzb3VyY2VzIDogW10sXG4gICAgICAgIGFkVGFnVXJsIDogYWRUYWdVcmxcbiAgICB9O1xuXG4gICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgbnVsbCk7XG4gICAgc3VwZXJEZXN0cm95X2Z1bmMgID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUlRNUCBQUk9WSURFUiBMT0FERUQuXCIpO1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlJUTVAgOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgUnRtcDsiXSwic291cmNlUm9vdCI6IiJ9