/*! OvenPlayerv0.9.59781 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        //2019-06-07 : Do not use duration-1 trick anymore. I improved SWF player.
        /*if(data.position >= (data.duration-1)){
            if(provider.getState() !== STATE_IDLE && provider.getState() !== STATE_COMPLETE){
                if(videoEndedCallback){
                    videoEndedCallback(function(){
                        provider.setState(STATE_COMPLETE);
                    });
                }else{
                    provider.setState(STATE_COMPLETE);
                }
             }
        }*/
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

                playerConfig.setSourceIndex(sourceIndex);
                //playerConfig.setSourceLabel(spec.sources[sourceIndex].label);

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
                                console.log("FileLoad failed");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcC5qcyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImVsRmxhc2giLCJwcm92aWRlciIsInZpZGVvRW5kZWRDYWxsYmFjayIsInRoYXQiLCJpc0pTUmVhZHkiLCJ0aW1ldXBkYXRlIiwiZGF0YSIsImN1cnJlbnRUaW1lIiwicG9zaXRpb24iLCJ0cmlnZ2VyIiwiQ09OVEVOVF9USU1FIiwidm9sdW1lQ2hhbmdlZCIsIkNPTlRFTlRfVk9MVU1FIiwic3RhdGVDaGFuZ2VkIiwic2V0U3RhdGUiLCJuZXdzdGF0ZSIsIm1ldGFDaGFuZ2VkIiwiQ09OVEVOVF9NRVRBIiwiZXJyb3IiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwiRVJST1IiLCJQcm92aWRlciIsInNwZWMiLCJwbGF5ZXJDb25maWciLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImVsZW1lbnQiLCJhZHMiLCJsaXN0ZW5lciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImFkVGFnVXJsIiwiY29uc29sZSIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsInNvdXJjZXMiLCJjdXJyZW50U291cmNlIiwicHJldmlvdXNTb3VyY2UiLCJnZXRDdXJyZW50U291cmNlIiwic291cmNlQ2hhbmdlZCIsImZpbGUiLCJsb2FkIiwiZ2V0UG9zaXRpb24iLCJzZWVrIiwiX2FmdGVyTG9hZCIsImlzQXV0b1N0YXJ0IiwicGxheSIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsImZ1bmNOYW1lIiwiZnVuY0RhdGEiLCJnZXROYW1lIiwibmFtZSIsImNhblNlZWsiLCJzZXRDYW5TZWVrIiwiaXNTZWVraW5nIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJuZXdTdGF0ZSIsInN0YXRlIiwicHJldlN0YXRlIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0lETEUiLCJpc0F1dG9QbGF5U3VwcG9ydENoZWNrVGltZSIsIlNUQVRFX0NPTVBMRVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiUExBWUVSX1BBVVNFIiwiU1RBVEVfQURfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwiZ2V0U3RhdGUiLCJzZXRCdWZmZXIiLCJuZXdCdWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsInNldFZvbHVtZSIsInZvbHVtZSIsImdldFZvbHVtZSIsInNldE11dGUiLCJnZXRNdXRlIiwicHJlbG9hZCIsInJldHJ5Q291bnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNoZWNrU3dmSXNSZWFkeSIsImlzRmxhc2hSZWFkeSIsImNoZWNrRmlsZUxvYWRlZCIsImlzRmlsZUxvYWRlZCIsImlzTXV0ZSIsInNldFRpbWVvdXQiLCJFUlJPUlMiLCJJTklUX1JUTVBfU0VUVVBfRVJST1IiLCJpc0FjdGl2ZSIsInN0YXJ0ZWQiLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRTb3VyY2VzIiwibWFwIiwiaW5kZXgiLCJ0eXBlIiwibGFiZWwiLCJzZXRDdXJyZW50U291cmNlIiwic291cmNlSW5kZXgiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJjdXJyZW50UXVhbGl0eSIsImxlbmd0aCIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJzZXRTb3VyY2VJbmRleCIsImdldEN1cnJlbnRUaW1lIiwiZ2V0UXVhbGl0eUxldmVscyIsInF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsInNldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0RnJhbWVyYXRlIiwiZnJhbWVyYXRlIiwic2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImZwcyIsImN1cnJlbnRGcmFtZXMiLCJuZXdQb3NpdGlvbiIsInN0b3AiLCJkZXN0cm95Iiwib2ZmIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJSdG1wIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJQUk9WSURFUl9SVE1QIiwibXNlIiwiaXNMaXZlIiwiYnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOztBQTZCQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBU0MsT0FBVCxFQUFrQkMsUUFBbEIsRUFBNEJDLGtCQUE1QixFQUErQztBQUM1RCxRQUFJQyxPQUFPLEVBQVg7O0FBRUFBLFNBQUtDLFNBQUwsR0FBaUIsWUFBSztBQUNsQixlQUFPLElBQVA7QUFDSCxLQUZEO0FBR0FELFNBQUtFLFVBQUwsR0FBa0IsVUFBQ0MsSUFBRCxFQUFTOztBQUV2Qk4sZ0JBQVFPLFdBQVIsR0FBc0JELEtBQUtFLFFBQTNCO0FBQ0FQLGlCQUFTUSxPQUFULENBQWlCQyx1QkFBakIsRUFBK0JKLElBQS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBWUgsS0FuQkQ7QUFvQkFILFNBQUtRLGFBQUwsR0FBcUIsVUFBQ0wsSUFBRCxFQUFTO0FBQzFCTCxpQkFBU1EsT0FBVCxDQUFpQkcseUJBQWpCLEVBQWlDTixJQUFqQztBQUNILEtBRkQ7QUFHQUgsU0FBS1UsWUFBTCxHQUFvQixVQUFDUCxJQUFELEVBQVM7QUFDekJMLGlCQUFTYSxRQUFULENBQWtCUixLQUFLUyxRQUF2QjtBQUNILEtBRkQ7QUFHQVosU0FBS2EsV0FBTCxHQUFtQixVQUFDVixJQUFELEVBQVM7QUFDeEJMLGlCQUFTUSxPQUFULENBQWlCUSx1QkFBakIsRUFBK0JYLElBQS9CO0FBQ0gsS0FGRDtBQUdBSCxTQUFL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QUFFUGxILGlCQUFVQSxPQUZIO0FBR1BtSCxhQUFNLElBSEM7QUFJUGpILGtCQUFXLElBSko7QUFLUDJCLGlCQUFVLEtBTEg7QUFNUHVGLGdCQUFTLEtBTkY7QUFPUHBGLGlCQUFVLEtBUEg7QUFRUEcsZUFBUUcscUJBUkQ7QUFTUCtFLGdCQUFTLENBVEY7QUFVUGxCLG1CQUFZLENBVkw7QUFXUGQsd0JBQWlCLENBQUMsQ0FYWDtBQVlQeEUsdUJBQWdCLENBQUMsQ0FaVjtBQWFQOEUsdUJBQWdCLEVBYlQ7QUFjUC9FLGlCQUFVLEVBZEg7QUFlUEwsa0JBQVdBO0FBZkosS0FBWDs7QUFrQkEvQixXQUFPLDJCQUFTb0IsSUFBVCxFQUFlQyxZQUFmLEVBQTZCLElBQTdCLENBQVA7QUFDQW9ILHdCQUFxQnpJLGNBQVcsU0FBWCxDQUFyQjs7QUFFQXNCLHNCQUFrQkMsR0FBbEIsQ0FBc0IsdUJBQXRCOztBQUVBdkIsU0FBS21JLE9BQUwsR0FBZSxZQUFLO0FBQ2hCN0csMEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7QUFDQWtIO0FBQ0gsS0FIRDs7QUFLQSxXQUFPekksSUFBUDtBQUNILENBakNEOztxQkFvQ2V3SSxJIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjcuLlxuICovXG5pbXBvcnQge1xuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUExBWUVSX1NUQVRFLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGVsRmxhc2gsIHByb3ZpZGVyLCB2aWRlb0VuZGVkQ2FsbGJhY2spe1xuICAgIGxldCB0aGF0ID0ge307XG5cbiAgICB0aGF0LmlzSlNSZWFkeSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHRoYXQudGltZXVwZGF0ZSA9IChkYXRhKSA9PntcblxuICAgICAgICBlbEZsYXNoLmN1cnJlbnRUaW1lID0gZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIGRhdGEpO1xuICAgICAgICAvL3Byb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVIsIGRhdGEpO1xuICAgICAgICAvL2RhdGEuZHVyYXRpb24tMSA6IHRoaXMgaXMgdHJpY2suIGJlY2F1c2Ugc29tZXRpbWVzIHJ0bXAncyBwb3NpdGlvbiA8IGR1cmF0aW9uIHdoZW4gdmlkZW8gZW5kZWQuXG4gICAgICAgIC8vMjAxOS0wNi0wNyA6IERvIG5vdCB1c2UgZHVyYXRpb24tMSB0cmljayBhbnltb3JlLiBJIGltcHJvdmVkIFNXRiBwbGF5ZXIuXG4gICAgICAgIC8qaWYoZGF0YS5wb3NpdGlvbiA+PSAoZGF0YS5kdXJhdGlvbi0xKSl7XG4gICAgICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9JRExFICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0NPTVBMRVRFKXtcbiAgICAgICAgICAgICAgICBpZih2aWRlb0VuZGVkQ2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICB2aWRlb0VuZGVkQ2FsbGJhY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSovXG4gICAgfTtcbiAgICB0aGF0LnZvbHVtZUNoYW5nZWQgPSAoZGF0YSkgPT57XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIGRhdGEpO1xuICAgIH07XG4gICAgdGhhdC5zdGF0ZUNoYW5nZWQgPSAoZGF0YSkgPT57XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKGRhdGEubmV3c3RhdGUpO1xuICAgIH07XG4gICAgdGhhdC5tZXRhQ2hhbmdlZCA9IChkYXRhKSA9PntcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIGRhdGEpO1xuICAgIH07XG4gICAgdGhhdC5lcnJvciA9IChlcnJvcikgPT57XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcblxuICAgICAgICAvL1BSSVZBVEVfU1RBVEVfRVJST1JcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IpO1xuXG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxuICovXG5pbXBvcnQgQWRzIGZyb20gXCJhcGkvcHJvdmlkZXIvYWRzL0Fkc1wiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXJcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlLCBwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUlMsIElOSVRfUlRNUF9TRVRVUF9FUlJPUixcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLCBTVEFURV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsIFBMQVlFUl9DT01QTEVURSwgUExBWUVSX1BBVVNFLCBQTEFZRVJfUExBWSwgU1RBVEVfQURfUExBWUlORywgU1RBVEVfQURfUEFVU0VELFxuICAgIENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIENvcmUgRm9yIEZsYXNoIFZpZGVvLlxuICogQHBhcmFtICAgc3BlYyBtZW1iZXIgdmFsdWVcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xuICogKi9cblxuXG5jb25zdCBQcm92aWRlciA9IGZ1bmN0aW9uKHNwZWMsIHBsYXllckNvbmZpZyl7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG4gICAgbGV0IGVsRmxhc2ggPSBzcGVjLmVsZW1lbnQ7XG4gICAgbGV0IGFkcyA9IG51bGwsIGxpc3RlbmVyID0gbnVsbCwgdmlkZW9FbmRlZENhbGxiYWNrID0gbnVsbDtcblxuICAgIC8vSXQgbWVhbnMgdG8gc3VwcG9ydCBhZCBmb3IgZmxhc2guIFNldCB0aGUgc2FtZSBzcGVjaWZpY2F0aW9ucyBsaWtlIGEgVmlkZW8gVGFnLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbEZsYXNoLCAnY3VycmVudFRpbWUnLFxuICAgICAgICB7dmFsdWUgOjAsIHdyaXRhYmxlIDogdHJ1ZX1cbiAgICApO1xuXG4gICAgaWYoc3BlYy5hZFRhZ1VybCl7XG4gICAgICAgIGFkcyA9IEFkcyhlbEZsYXNoLCB0aGF0LCBwbGF5ZXJDb25maWcsIHNwZWMuYWRUYWdVcmwpO1xuICAgICAgICBpZighYWRzKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxpc3RlbmVyID0gRXZlbnRzTGlzdGVuZXIoZWxGbGFzaCwgdGhhdCwgYWRzID8gYWRzLnZpZGVvRW5kZWRDYWxsYmFjayA6IG51bGwpO1xuXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2UgPSBlbEZsYXNoLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2UuZmlsZSAhPT0gcHJldmlvdXNTb3VyY2UpO1xuICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xuICAgICAgICAgICAgZWxGbGFzaC5sb2FkKHNvdXJjZS5maWxlKTtcbiAgICAgICAgfWVsc2UgaWYobGFzdFBsYXlQb3NpdGlvbiA9PT0gMCAmJiB0aGF0LmdldFBvc2l0aW9uKCkgPiAwKXtcbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICAvL0ZsYXNoIGhhcyB0d28gaW5pdCBzdGF0ZXMuIEZsYXNoTG9hZGVkIGFuZCBGaWxlTG9hZGVkLlxuICAgIC8vX2xvYWQgY2FsbHMgYWZ0ZXIgRmxhc2hMb2FkZWQuIF9hZnRlckxvYWQgY2FsbHMgYWZ0ZXIgRmlsZUxvYWRlZC5cbiAgICBjb25zdCBfYWZ0ZXJMb2FkID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XG4gICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcbiAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuXG4gICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIC8vVGhpcyBpcyB3aHkuIEZsYXNoIGRvZXMgbm90IHNlbGYgdHJpZyB0byBhZHMsbG1hbG0sXG4gICAgdGhhdC50cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwgPSAoZnVuY05hbWUsIGZ1bmNEYXRhKSA9PiB7XG4gICAgICAgIGlmKGxpc3RlbmVyW2Z1bmNOYW1lXSl7XG4gICAgICAgICAgICByZXR1cm4gbGlzdGVuZXJbZnVuY05hbWVdKGZ1bmNEYXRhKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5uYW1lO1xuICAgIH07XG5cbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LnNldENhblNlZWsgPSAoY2FuU2VlaykgPT4ge1xuICAgICAgICBzcGVjLmNhblNlZWsgPSBjYW5TZWVrO1xuICAgIH07XG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e1xuICAgICAgICByZXR1cm4gc3BlYy5zZWVraW5nO1xuICAgIH07XG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmcpPT57XG4gICAgICAgIHNwZWMuc2Vla2luZyA9IHNlZWtpbmc7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHNwZWMuc3RhdGU7XG4gICAgICAgICAgICAvL1RvRG8gOiBUaGlzIGlzIHRlbXBvcmFyeSBjb2RlLiBhdm9pZCBiYWNrZ3JvdW5kIGNvbnRlbnQgZXJyb3IuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BMQVlJTkcgJiYgKG5ld1N0YXRlID09PSBTVEFURV9FUlJPUiB8fCBuZXdTdGF0ZSA9PT0gU1RBVEVfSURMRSkgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYoYWRzICYmIGFkcy5pc0F1dG9QbGF5U3VwcG9ydENoZWNrVGltZSgpKXtcbiAgICAgICAgICAgICAgICAvL0FkcyBjaGVja3MgY2hlY2tBdXRvcGxheVN1cHBvcnQoKS5cbiAgICAgICAgICAgICAgICAvL0l0IGNhbGxzIHJlYWwgcGxheSgpIGFuZCBwYXVzZSgpLlxuICAgICAgICAgICAgICAgIC8vQW5kIHRoZW4gdGhpcyB0cmlnZ2VycyBcInBsYXlpbmdcIiBhbmQgXCJwYXVzZVwiLlxuICAgICAgICAgICAgICAgIC8vSSBwcmV2ZW50IHRoZXNlIHByb2Nlc3MuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBzd2l0Y2gobmV3U3RhdGUpe1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0NPTVBMRVRFIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUEFVU0VEIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX1BBVVNFRFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTVEFURV9BRF9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfQURfUEFVU0VEXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BMQVlJTkcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QTEFZSU5HXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTVEFURV9BRF9QTEFZSU5HIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfQURfUExBWUlOR1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3BlYy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldnN0YXRlIDogcHJldlN0YXRlLFxuICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogc3BlYy5zdGF0ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLnN0YXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XG5cbiAgICB9O1xuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldEJ1ZmZlciA/IGVsRmxhc2guZ2V0QnVmZmVyKCkgOiBudWxsO1xuICAgIH07XG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXREdXJhdGlvbiA/IGVsRmxhc2guZ2V0RHVyYXRpb24oKSA6IDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldFBvc2l0aW9uID8gZWxGbGFzaC5nZXRQb3NpdGlvbigpIDogMDtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLnNldFZvbHVtZSA/IGVsRmxhc2guc2V0Vm9sdW1lKHZvbHVtZSkgOiAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guc2V0Vm9sdW1lID8gZWxGbGFzaC5nZXRWb2x1bWUoKSA6IDA7XG4gICAgfTtcbiAgICB0aGF0LnNldE11dGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICBlbEZsYXNoLnNldE11dGUoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldE11dGUgPyBlbEZsYXNoLmdldE11dGUoKSA6IGZhbHNlO1xuICAgIH07XG5cbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBwcmVsb2FkKCkgXCIsIHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XG5cbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAvL0ZpcnN0IDogY2hlY2tTd2ZJc1JlYWR5IC0+IEl0IGNoZWNrcyBzd2YgbG9hZGluZyBjb21wbGV0ZSBieSBwb2xsaW5nLlxuICAgICAgICAgICAgLy9TZWNvbmQgOiBjaGVja0ZpbGVMb2FkZWQgLT4gSXQgY2hlY2tzIHNyYyBsb2FkaW5nIGNvbXBsZXRlIGJ5IHBvbGxpbmcgdG9vLlxuICAgICAgICAgICAgLy9XaHkgY29tcGxleCBpcyBpdD8gLT4gSXQgYWdhaW5zdHMgZmxhc2ggdGltaW5nIGlzc3VlLlxuICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrU3dmSXNSZWFkeSgpe1xuICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZsYXNoUmVhZHkgJiYgZWxGbGFzaC5pc0ZsYXNoUmVhZHkoKSl7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbEZsYXNoLCAnZHVyYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAge3ZhbHVlIDplbEZsYXNoLmdldER1cmF0aW9uKCl9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gY2hlY2tGaWxlTG9hZGVkKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZpbGVMb2FkZWQgJiYgZWxGbGFzaC5pc0ZpbGVMb2FkZWQoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2FmdGVyTG9hZChsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNNdXRlKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSAmJiBwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkgPCAxMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFZvbHVtZShwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAzMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRmlsZUxvYWRlZCwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAxMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja1N3ZklzUmVhZHksIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXMpID0+e1xuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKDApOyAgIC8vc3BlYy5zb3VyY2VzXy5zdGFydHRpbWUgfHxcbiAgICAgICAgX2FmdGVyTG9hZCgwKTtcbiAgICB9O1xuXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgaWYgKCAoYWRzICYmIGFkcy5pc0FjdGl2ZSgpKSB8fCAoYWRzICYmICFhZHMuc3RhcnRlZCgpKSApIHtcbiAgICAgICAgICAgICAgICBhZHMucGxheSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZWxGbGFzaC5wbGF5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICBlbEZsYXNoLnBhdXNlKCk7XG4gICAgICAgIH1lbHNlIGlmKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORyl7XG4gICAgICAgICAgICBhZHMucGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xuICAgICAgICBlbEZsYXNoLnNlZWsocG9zaXRpb24pO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBzb3VyY2UudHlwZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoc291cmNlSW5kZXgsIG5lZWRQcm92aWRlckNoYW5nZSkgPT4ge1xuICAgICAgICBpZihzcGVjLmN1cnJlbnRRdWFsaXR5ID09PSBzb3VyY2VJbmRleCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZihzb3VyY2VJbmRleCA+IC0xKXtcbiAgICAgICAgICAgIGlmKHNwZWMuc291cmNlcyAmJiBzcGVjLnNvdXJjZXMubGVuZ3RoID4gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBzb3VyY2VJbmRleCk7XG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gc291cmNlSW5kZXg7XG5cbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzb3VyY2VJbmRleFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUluZGV4KHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICAvL3BsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcblxuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gZWxGbGFzaC5nZXRDdXJyZW50VGltZSgpfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tGaWxlTG9hZGVkKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZpbGVMb2FkZWQgJiYgZWxGbGFzaC5pc0ZpbGVMb2FkZWQoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2FmdGVyTG9hZChsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDMwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tGaWxlTG9hZGVkLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGVMb2FkIGZhaWxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGV2ZWxzO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEZyYW1lcmF0ZSA9IChmcmFtZXJhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlID0gZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT57XG4gICAgICAgIGxldCBmcHMgPSBzcGVjLmZyYW1lcmF0ZTtcbiAgICAgICAgbGV0IGN1cnJlbnRGcmFtZXMgPSBlbEZsYXNoLmdldEN1cnJlbnRUaW1lKCkgKiBmcHM7XG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IChjdXJyZW50RnJhbWVzICsgZnJhbWVDb3VudCkgLyBmcHM7XG4gICAgICAgIG5ld1Bvc2l0aW9uID0gbmV3UG9zaXRpb24gKyAwLjAwMDAxOyAvLyBGSVhFUyBBIFNBRkFSSSBTRUVLIElTU1VFLiBteVZkaWVvLmN1cnJlbnRUaW1lID0gMC4wNCB3b3VsZCBnaXZlIFNNUFRFIDAwOjAwOjAwOjAwIHdoZXJhcyBpdCBzaG91bGQgZ2l2ZSAwMDowMDowMDowMVxuXG4gICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgdGhhdC5zZWVrKG5ld1Bvc2l0aW9uKTtcbiAgICB9O1xuXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xuICAgICAgICBlbEZsYXNoLnN0b3AoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG4gICAgICAgIHRoYXQuc3RvcCgpO1xuXG4gICAgICAgIC8qdHJ5e1xuICAgICAgICAgICAgZWxGbGFzaC5yZW1vdmUoKTtcbiAgICAgICAgfWNhdGNoKGVycm9yKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSovXG5cblxuICAgICAgICBpZihhZHMpe1xuICAgICAgICAgICAgYWRzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Lm9mZigpO1xuICAgIH07XG5cbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cbiAgICAvLyB1c2UgOiBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7IC4uLiBzdXBlcl9kZXN0cm95KCk7XG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxuICovXG5pbXBvcnQge1NUQVRFX0lETEUsIFBST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlclwiO1xuLyoqXG4gKiBAYnJpZWYgICBydG1wIHByb3ZpZGVyXG4gKiBAcGFyYW0gICBlbGVtZW50IHZpZGVvIGVsZW1lbnQuXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxuICogKi9cblxuXG5jb25zdCBSdG1wID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuXG4gICAgbGV0IHNwZWMgPSB7XG4gICAgICAgIG5hbWUgOiBQUk9WSURFUl9SVE1QLFxuICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcbiAgICAgICAgbXNlIDogbnVsbCxcbiAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxuICAgICAgICBjYW5TZWVrIDogZmFsc2UsXG4gICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxuICAgICAgICBzZWVraW5nIDogZmFsc2UsXG4gICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcbiAgICAgICAgYnVmZmVyIDogMCxcbiAgICAgICAgZnJhbWVyYXRlIDogMCxcbiAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcbiAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxuICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXG4gICAgICAgIHNvdXJjZXMgOiBbXSxcbiAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxuICAgIH07XG5cbiAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBudWxsKTtcbiAgICBzdXBlckRlc3Ryb3lfZnVuYyAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJSVE1QIFBST1ZJREVSIExPQURFRC5cIik7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUlRNUCA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBSdG1wOyJdLCJzb3VyY2VSb290IjoiIn0=