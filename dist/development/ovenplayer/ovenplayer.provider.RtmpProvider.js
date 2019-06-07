/*! OvenPlayerv0.9.596 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcC5qcyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImVsRmxhc2giLCJwcm92aWRlciIsInZpZGVvRW5kZWRDYWxsYmFjayIsInRoYXQiLCJpc0pTUmVhZHkiLCJ0aW1ldXBkYXRlIiwiZGF0YSIsImN1cnJlbnRUaW1lIiwicG9zaXRpb24iLCJ0cmlnZ2VyIiwiQ09OVEVOVF9USU1FIiwidm9sdW1lQ2hhbmdlZCIsIkNPTlRFTlRfVk9MVU1FIiwic3RhdGVDaGFuZ2VkIiwic2V0U3RhdGUiLCJuZXdzdGF0ZSIsIm1ldGFDaGFuZ2VkIiwiQ09OVEVOVF9NRVRBIiwiZXJyb3IiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwiRVJST1IiLCJQcm92aWRlciIsInNwZWMiLCJwbGF5ZXJDb25maWciLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImVsZW1lbnQiLCJhZHMiLCJsaXN0ZW5lciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImFkVGFnVXJsIiwiY29uc29sZSIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsInNvdXJjZXMiLCJjdXJyZW50U291cmNlIiwicHJldmlvdXNTb3VyY2UiLCJnZXRDdXJyZW50U291cmNlIiwic291cmNlQ2hhbmdlZCIsImZpbGUiLCJsb2FkIiwiZ2V0UG9zaXRpb24iLCJzZWVrIiwiX2FmdGVyTG9hZCIsImlzQXV0b1N0YXJ0IiwicGxheSIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsImZ1bmNOYW1lIiwiZnVuY0RhdGEiLCJnZXROYW1lIiwibmFtZSIsImNhblNlZWsiLCJzZXRDYW5TZWVrIiwiaXNTZWVraW5nIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJuZXdTdGF0ZSIsInN0YXRlIiwicHJldlN0YXRlIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0lETEUiLCJpc0F1dG9QbGF5U3VwcG9ydENoZWNrVGltZSIsIlNUQVRFX0NPTVBMRVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiUExBWUVSX1BBVVNFIiwiU1RBVEVfQURfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwiZ2V0U3RhdGUiLCJzZXRCdWZmZXIiLCJuZXdCdWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsInNldFZvbHVtZSIsInZvbHVtZSIsImdldFZvbHVtZSIsInNldE11dGUiLCJnZXRNdXRlIiwicHJlbG9hZCIsInJldHJ5Q291bnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNoZWNrU3dmSXNSZWFkeSIsImlzRmxhc2hSZWFkeSIsImNoZWNrRmlsZUxvYWRlZCIsImlzRmlsZUxvYWRlZCIsImlzTXV0ZSIsInNldFRpbWVvdXQiLCJFUlJPUlMiLCJJTklUX1JUTVBfU0VUVVBfRVJST1IiLCJpc0FjdGl2ZSIsInN0YXJ0ZWQiLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRTb3VyY2VzIiwibWFwIiwiaW5kZXgiLCJ0eXBlIiwibGFiZWwiLCJzZXRDdXJyZW50U291cmNlIiwic291cmNlSW5kZXgiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJjdXJyZW50UXVhbGl0eSIsImxlbmd0aCIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJzZXRTb3VyY2VMYWJlbCIsImdldEN1cnJlbnRUaW1lIiwiZ2V0UXVhbGl0eUxldmVscyIsInF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsInNldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0RnJhbWVyYXRlIiwiZnJhbWVyYXRlIiwic2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImZwcyIsImN1cnJlbnRGcmFtZXMiLCJuZXdQb3NpdGlvbiIsInN0b3AiLCJkZXN0cm95Iiwib2ZmIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJSdG1wIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJQUk9WSURFUl9SVE1QIiwibXNlIiwiaXNMaXZlIiwiYnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOztBQTZCQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBU0MsT0FBVCxFQUFrQkMsUUFBbEIsRUFBNEJDLGtCQUE1QixFQUErQztBQUM1RCxRQUFJQyxPQUFPLEVBQVg7O0FBRUFBLFNBQUtDLFNBQUwsR0FBaUIsWUFBSztBQUNsQixlQUFPLElBQVA7QUFDSCxLQUZEO0FBR0FELFNBQUtFLFVBQUwsR0FBa0IsVUFBQ0MsSUFBRCxFQUFTOztBQUV2Qk4sZ0JBQVFPLFdBQVIsR0FBc0JELEtBQUtFLFFBQTNCO0FBQ0FQLGlCQUFTUSxPQUFULENBQWlCQyx1QkFBakIsRUFBK0JKLElBQS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBWUgsS0FuQkQ7QUFvQkFILFNBQUtRLGFBQUwsR0FBcUIsVUFBQ0wsSUFBRCxFQUFTO0FBQzFCTCxpQkFBU1EsT0FBVCxDQUFpQkcseUJBQWpCLEVBQWlDTixJQUFqQztBQUNILEtBRkQ7QUFHQUgsU0FBS1UsWUFBTCxHQUFvQixVQUFDUCxJQUFELEVBQVM7QUFDekJMLGlCQUFTYSxRQUFULENBQWtCUixLQUFLUyxRQUF2QjtBQUNILEtBRkQ7QUFHQVosU0FBS2EsV0FBTCxHQUFtQixVQUFDVixJQUFELEVBQVM7QUFDeEJMLGlCQUFTUSxPQUFULENBQWlCUSx1QkFBakIsRUFBK0JYLElBQS9CO0FBQ0gsS0FGRDtBQUdBSCxTQUFL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LE9BQU87QUFDUGdDLGNBQU9zRix3QkFEQTtBQUVQbEgsaUJBQVVBLE9BRkg7QUFHUG1ILGFBQU0sSUFIQztBQUlQakgsa0JBQVcsSUFKSjtBQUtQMkIsaUJBQVUsS0FMSDtBQU1QdUYsZ0JBQVMsS0FORjtBQU9QcEYsaUJBQVUsS0FQSDtBQVFQRyxlQUFRRyxxQkFSRDtBQVNQK0UsZ0JBQVMsQ0FURjtBQVVQbEIsbUJBQVksQ0FWTDtBQVdQZCx3QkFBaUIsQ0FBQyxDQVhYO0FBWVB4RSx1QkFBZ0IsQ0FBQyxDQVpWO0FBYVA4RSx1QkFBZ0IsRUFiVDtBQWNQL0UsaUJBQVUsRUFkSDtBQWVQTCxrQkFBV0E7QUFmSixLQUFYOztBQWtCQS9CLFdBQU8sMkJBQVNvQixJQUFULEVBQWVDLFlBQWYsRUFBNkIsSUFBN0IsQ0FBUDtBQUNBb0gsd0JBQXFCekksY0FBVyxTQUFYLENBQXJCOztBQUVBc0Isc0JBQWtCQyxHQUFsQixDQUFzQix1QkFBdEI7O0FBRUF2QixTQUFLbUksT0FBTCxHQUFlLFlBQUs7QUFDaEI3RywwQkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QjtBQUNBa0g7QUFDSCxLQUhEOztBQUtBLFdBQU96SSxJQUFQO0FBQ0gsQ0FqQ0Q7O3FCQW9DZXdJLEkiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNy4uXG4gKi9cbmltcG9ydCB7XG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsXG4gICAgUFJPVklERVJfSFRNTDUsXG4gICAgUFJPVklERVJfV0VCUlRDLFxuICAgIFBST1ZJREVSX0RBU0gsXG4gICAgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxGbGFzaCwgcHJvdmlkZXIsIHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgbGV0IHRoYXQgPSB7fTtcblxuICAgIHRoYXQuaXNKU1JlYWR5ID0gKCkgPT57XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgdGhhdC50aW1ldXBkYXRlID0gKGRhdGEpID0+e1xuXG4gICAgICAgIGVsRmxhc2guY3VycmVudFRpbWUgPSBkYXRhLnBvc2l0aW9uO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwgZGF0YSk7XG4gICAgICAgIC8vcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwgZGF0YSk7XG4gICAgICAgIC8vZGF0YS5kdXJhdGlvbi0xIDogdGhpcyBpcyB0cmljay4gYmVjYXVzZSBzb21ldGltZXMgcnRtcCdzIHBvc2l0aW9uIDwgZHVyYXRpb24gd2hlbiB2aWRlbyBlbmRlZC5cbiAgICAgICAgLy8yMDE5LTA2LTA3IDogRG8gbm90IHVzZSBkdXJhdGlvbi0xIHRyaWNrIGFueW1vcmUuIEkgaW1wcm92ZWQgU1dGIHBsYXllci5cbiAgICAgICAgLyppZihkYXRhLnBvc2l0aW9uID49IChkYXRhLmR1cmF0aW9uLTEpKXtcbiAgICAgICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0lETEUgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfQ09NUExFVEUpe1xuICAgICAgICAgICAgICAgIGlmKHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvRW5kZWRDYWxsYmFjayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9Ki9cbiAgICB9O1xuICAgIHRoYXQudm9sdW1lQ2hhbmdlZCA9IChkYXRhKSA9PntcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwgZGF0YSk7XG4gICAgfTtcbiAgICB0aGF0LnN0YXRlQ2hhbmdlZCA9IChkYXRhKSA9PntcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoZGF0YS5uZXdzdGF0ZSk7XG4gICAgfTtcbiAgICB0aGF0Lm1ldGFDaGFuZ2VkID0gKGRhdGEpID0+e1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgZGF0YSk7XG4gICAgfTtcbiAgICB0aGF0LmVycm9yID0gKGVycm9yKSA9PntcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuXG4gICAgICAgIC8vUFJJVkFURV9TVEFURV9FUlJPUlxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvcik7XG5cbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyMy4uXG4gKi9cbmltcG9ydCBBZHMgZnJvbSBcImFwaS9wcm92aWRlci9hZHMvQWRzXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9mbGFzaC9MaXN0ZW5lclwiO1xuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBzZXBhcmF0ZUxpdmUsIHBpY2tDdXJyZW50U291cmNlfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIEVSUk9SUywgSU5JVF9SVE1QX1NFVFVQX0VSUk9SLFxuICAgIFNUQVRFX0lETEUsIFNUQVRFX1BMQVlJTkcsIFNUQVRFX1BBVVNFRCwgU1RBVEVfQ09NUExFVEUsIFNUQVRFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLCBTVEFURV9BRF9QTEFZSU5HLCBTVEFURV9BRF9QQVVTRUQsXG4gICAgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwgQ09OVEVOVF9MRVZFTF9DSEFOR0VELCBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCxcbiAgICBQTEFZQkFDS19SQVRFX0NIQU5HRUQsIENPTlRFTlRfTVVURSwgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgQ29yZSBGb3IgRmxhc2ggVmlkZW8uXG4gKiBAcGFyYW0gICBzcGVjIG1lbWJlciB2YWx1ZVxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICBwbGF5ZXIgY29uZmlnXG4gKiAqL1xuXG5cbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24oc3BlYywgcGxheWVyQ29uZmlnKXtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIGxvYWRlZC4gXCIpO1xuXG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XG5cbiAgICBsZXQgZWxGbGFzaCA9IHNwZWMuZWxlbWVudDtcbiAgICBsZXQgYWRzID0gbnVsbCwgbGlzdGVuZXIgPSBudWxsLCB2aWRlb0VuZGVkQ2FsbGJhY2sgPSBudWxsO1xuXG4gICAgLy9JdCBtZWFucyB0byBzdXBwb3J0IGFkIGZvciBmbGFzaC4gU2V0IHRoZSBzYW1lIHNwZWNpZmljYXRpb25zIGxpa2UgYSBWaWRlbyBUYWcuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsRmxhc2gsICdjdXJyZW50VGltZScsXG4gICAgICAgIHt2YWx1ZSA6MCwgd3JpdGFibGUgOiB0cnVlfVxuICAgICk7XG5cbiAgICBpZihzcGVjLmFkVGFnVXJsKXtcbiAgICAgICAgYWRzID0gQWRzKGVsRmxhc2gsIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XG4gICAgICAgIGlmKCFhZHMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYW4gbm90IGxvYWQgZHVlIHRvIGdvb2dsZSBpbWEgZm9yIEFkcy5cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihlbEZsYXNoLCB0aGF0LCBhZHMgPyBhZHMudmlkZW9FbmRlZENhbGxiYWNrIDogbnVsbCk7XG5cbiAgICBjb25zdCBfbG9hZCA9IChsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgY29uc3Qgc291cmNlID0gIHNwZWMuc291cmNlc1tzcGVjLmN1cnJlbnRTb3VyY2VdO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICBjb25zdCBwcmV2aW91c1NvdXJjZSA9IGVsRmxhc2guZ2V0Q3VycmVudFNvdXJjZSgpO1xuICAgICAgICBjb25zdCBzb3VyY2VDaGFuZ2VkID0gKHNvdXJjZS5maWxlICE9PSBwcmV2aW91c1NvdXJjZSk7XG4gICAgICAgIGlmIChzb3VyY2VDaGFuZ2VkKSB7XG4gICAgICAgICAgICBlbEZsYXNoLmxvYWQoc291cmNlLmZpbGUpO1xuICAgICAgICB9ZWxzZSBpZihsYXN0UGxheVBvc2l0aW9uID09PSAwICYmIHRoYXQuZ2V0UG9zaXRpb24oKSA+IDApe1xuICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIC8vRmxhc2ggaGFzIHR3byBpbml0IHN0YXRlcy4gRmxhc2hMb2FkZWQgYW5kIEZpbGVMb2FkZWQuXG4gICAgLy9fbG9hZCBjYWxscyBhZnRlciBGbGFzaExvYWRlZC4gX2FmdGVyTG9hZCBjYWxscyBhZnRlciBGaWxlTG9hZGVkLlxuICAgIGNvbnN0IF9hZnRlckxvYWQgPSBmdW5jdGlvbihsYXN0UGxheVBvc2l0aW9uKXtcbiAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xuICAgICAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG5cbiAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLy9UaGlzIGlzIHdoeS4gRmxhc2ggZG9lcyBub3Qgc2VsZiB0cmlnIHRvIGFkcyxsbWFsbSxcbiAgICB0aGF0LnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCA9IChmdW5jTmFtZSwgZnVuY0RhdGEpID0+IHtcbiAgICAgICAgaWYobGlzdGVuZXJbZnVuY05hbWVdKXtcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lcltmdW5jTmFtZV0oZnVuY0RhdGEpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldE5hbWUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XG4gICAgfTtcblxuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XG4gICAgICAgIHNwZWMuY2FuU2VlayA9IGNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XG4gICAgICAgIHJldHVybiBzcGVjLnNlZWtpbmc7XG4gICAgfTtcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcbiAgICAgICAgc3BlYy5zZWVraW5nID0gc2Vla2luZztcbiAgICB9O1xuXG4gICAgdGhhdC5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgPT4ge1xuICAgICAgICBpZihzcGVjLnN0YXRlICE9PSBuZXdTdGF0ZSl7XG4gICAgICAgICAgICBsZXQgcHJldlN0YXRlID0gc3BlYy5zdGF0ZTtcbiAgICAgICAgICAgIC8vVG9EbyA6IFRoaXMgaXMgdGVtcG9yYXJ5IGNvZGUuIGF2b2lkIGJhY2tncm91bmQgY29udGVudCBlcnJvci5cbiAgICAgICAgICAgIGlmKHByZXZTdGF0ZSA9PT0gU1RBVEVfQURfUExBWUlORyAmJiAobmV3U3RhdGUgPT09IFNUQVRFX0VSUk9SIHx8IG5ld1N0YXRlID09PSBTVEFURV9JRExFKSApe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZihhZHMgJiYgYWRzLmlzQXV0b1BsYXlTdXBwb3J0Q2hlY2tUaW1lKCkpe1xuICAgICAgICAgICAgICAgIC8vQWRzIGNoZWNrcyBjaGVja0F1dG9wbGF5U3VwcG9ydCgpLlxuICAgICAgICAgICAgICAgIC8vSXQgY2FsbHMgcmVhbCBwbGF5KCkgYW5kIHBhdXNlKCkuXG4gICAgICAgICAgICAgICAgLy9BbmQgdGhlbiB0aGlzIHRyaWdnZXJzIFwicGxheWluZ1wiIGFuZCBcInBhdXNlXCIuXG4gICAgICAgICAgICAgICAgLy9JIHByZXZlbnQgdGhlc2UgcHJvY2Vzcy5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHN3aXRjaChuZXdTdGF0ZSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQ09NUExFVEUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfUEFVU0VEXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0FEX1BBVVNFRCA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9BRF9QQVVTRURcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX1BMQVlJTkdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0FEX1BMQVlJTkcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9BRF9QTEFZSU5HXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzcGVjLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xuICAgICAgICAgICAgICAgICAgICBwcmV2c3RhdGUgOiBwcmV2U3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBzcGVjLnN0YXRlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcblxuICAgIH07XG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0QnVmZmVyID8gZWxGbGFzaC5nZXRCdWZmZXIoKSA6IG51bGw7XG4gICAgfTtcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldER1cmF0aW9uID8gZWxGbGFzaC5nZXREdXJhdGlvbigpIDogMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0UG9zaXRpb24gPyBlbEZsYXNoLmdldFBvc2l0aW9uKCkgOiAwO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guc2V0Vm9sdW1lID8gZWxGbGFzaC5zZXRWb2x1bWUodm9sdW1lKSA6IDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5zZXRWb2x1bWUgPyBlbEZsYXNoLmdldFZvbHVtZSgpIDogMDtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIGVsRmxhc2guc2V0TXV0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0TXV0ZSA/IGVsRmxhc2guZ2V0TXV0ZSgpIDogZmFsc2U7XG4gICAgfTtcblxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHByZWxvYWQoKSBcIiwgc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcblxuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIC8vRmlyc3QgOiBjaGVja1N3ZklzUmVhZHkgLT4gSXQgY2hlY2tzIHN3ZiBsb2FkaW5nIGNvbXBsZXRlIGJ5IHBvbGxpbmcuXG4gICAgICAgICAgICAvL1NlY29uZCA6IGNoZWNrRmlsZUxvYWRlZCAtPiBJdCBjaGVja3Mgc3JjIGxvYWRpbmcgY29tcGxldGUgYnkgcG9sbGluZyB0b28uXG4gICAgICAgICAgICAvL1doeSBjb21wbGV4IGlzIGl0PyAtPiBJdCBhZ2FpbnN0cyBmbGFzaCB0aW1pbmcgaXNzdWUuXG4gICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tTd2ZJc1JlYWR5KCl7XG4gICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcbiAgICAgICAgICAgICAgICBpZihlbEZsYXNoLmlzRmxhc2hSZWFkeSAmJiBlbEZsYXNoLmlzRmxhc2hSZWFkeSgpKXtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsRmxhc2gsICdkdXJhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWUgOmVsRmxhc2guZ2V0RHVyYXRpb24oKX1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbiB8fCAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0cnlDb3VudCA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiBjaGVja0ZpbGVMb2FkZWQoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlbEZsYXNoLmlzRmlsZUxvYWRlZCAmJiBlbEZsYXNoLmlzRmlsZUxvYWRlZCgpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWZ0ZXJMb2FkKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc011dGUoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpICYmIHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSA8IDEwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDMwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tGaWxlTG9hZGVkLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KEVSUk9SU1tJTklUX1JUTVBfU0VUVVBfRVJST1JdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDEwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrU3dmSXNSZWFkeSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KEVSUk9SU1tJTklUX1JUTVBfU0VUVVBfRVJST1JdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcbiAgICAgICAgX2xvYWQoMCk7ICAgLy9zcGVjLnNvdXJjZXNfLnN0YXJ0dGltZSB8fFxuICAgICAgICBfYWZ0ZXJMb2FkKDApO1xuICAgIH07XG5cbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBpZiAoIChhZHMgJiYgYWRzLmlzQWN0aXZlKCkpIHx8IChhZHMgJiYgIWFkcy5zdGFydGVkKCkpICkge1xuICAgICAgICAgICAgICAgIGFkcy5wbGF5KCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBlbEZsYXNoLnBsYXkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuICAgIHRoYXQucGF1c2UgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIGVsRmxhc2gucGF1c2UoKTtcbiAgICAgICAgfWVsc2UgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKXtcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT57XG4gICAgICAgIGVsRmxhc2guc2Vlayhwb3NpdGlvbik7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXG4gICAgICAgICAgICAgICAgaW5kZXggOiBpbmRleFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChzb3VyY2VJbmRleCwgbmVlZFByb3ZpZGVyQ2hhbmdlKSA9PiB7XG4gICAgICAgIGlmKHNwZWMuY3VycmVudFF1YWxpdHkgPT09IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNvdXJjZUluZGV4ID4gLTEpe1xuICAgICAgICAgICAgaWYoc3BlYy5zb3VyY2VzICYmIHNwZWMuc291cmNlcy5sZW5ndGggPiBzb3VyY2VJbmRleCl7XG4gICAgICAgICAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlTGFiZWwoc3BlYy5zb3VyY2VzW3NvdXJjZUluZGV4XS5sYWJlbCk7XG4gICAgICAgICAgICAgICAgaWYobmVlZFByb3ZpZGVyQ2hhbmdlKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3RQbGF5UG9zaXRpb24gPSBlbEZsYXNoLmdldEN1cnJlbnRUaW1lKCl8fCAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja0ZpbGVMb2FkZWQoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlbEZsYXNoLmlzRmlsZUxvYWRlZCAmJiBlbEZsYXNoLmlzRmlsZUxvYWRlZCgpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWZ0ZXJMb2FkKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMzAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0ZpbGVMb2FkZWQsIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZUxvYWQgZmFpbGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0RnJhbWVyYXRlID0gKGZyYW1lcmF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGUgPSBmcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PntcbiAgICAgICAgbGV0IGZwcyA9IHNwZWMuZnJhbWVyYXRlO1xuICAgICAgICBsZXQgY3VycmVudEZyYW1lcyA9IGVsRmxhc2guZ2V0Q3VycmVudFRpbWUoKSAqIGZwcztcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXG5cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xuICAgIH07XG5cbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XG4gICAgICAgIGVsRmxhc2guc3RvcCgpO1xuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGRlc3Ryb3koKSBwbGF5ZXIgc3RvcCwgbGlzdGVuZXIsIGV2ZW50IGRlc3Ryb2llZFwiKTtcbiAgICAgICAgdGhhdC5zdG9wKCk7XG5cbiAgICAgICAgLyp0cnl7XG4gICAgICAgICAgICBlbEZsYXNoLnJlbW92ZSgpO1xuICAgICAgICB9Y2F0Y2goZXJyb3Ipe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9Ki9cblxuXG4gICAgICAgIGlmKGFkcyl7XG4gICAgICAgICAgICBhZHMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgfTtcblxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyMy4uXG4gKi9cbmltcG9ydCB7U1RBVEVfSURMRSwgUFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2ZsYXNoL1Byb3ZpZGVyXCI7XG4vKipcbiAqIEBicmllZiAgIHJ0bXAgcHJvdmlkZXJcbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5cbmNvbnN0IFJ0bXAgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyA9IG51bGw7XG5cbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgbmFtZSA6IFBST1ZJREVSX1JUTVAsXG4gICAgICAgIGVsZW1lbnQgOiBlbGVtZW50LFxuICAgICAgICBtc2UgOiBudWxsLFxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXG4gICAgICAgIGNhblNlZWsgOiBmYWxzZSxcbiAgICAgICAgaXNMaXZlIDogZmFsc2UsXG4gICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcbiAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxuICAgICAgICBidWZmZXIgOiAwLFxuICAgICAgICBmcmFtZXJhdGUgOiAwLFxuICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxuICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXG4gICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcbiAgICAgICAgc291cmNlcyA6IFtdLFxuICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXG4gICAgfTtcblxuICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIG51bGwpO1xuICAgIHN1cGVyRGVzdHJveV9mdW5jICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlJUTVAgUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJSVE1QIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFJ0bXA7Il0sInNvdXJjZVJvb3QiOiIifQ==