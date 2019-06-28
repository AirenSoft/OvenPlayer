/*! OvenPlayerv0.9.6232 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var _Ad = __webpack_require__(/*! api/ads/ima/Ad */ "./src/js/api/ads/ima/Ad.js");

var _Ad2 = _interopRequireDefault(_Ad);

var _Ad3 = __webpack_require__(/*! api/ads/vast/Ad */ "./src/js/api/ads/vast/Ad.js");

var _Ad4 = _interopRequireDefault(_Ad3);

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

/**
 * Created by hoho on 2018. 8. 23..
 */
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
        OvenPlayerConsole.log("[Provider] Ad Client - ", playerConfig.getAdClient());
        if (playerConfig.getAdClient() === _constants.AD_CLIENT_VAST) {
            ads = (0, _Ad4["default"])(elFlash, that, playerConfig, spec.adTagUrl);
        } else {
            ads = (0, _Ad2["default"])(elFlash, that, playerConfig, spec.adTagUrl);
        }

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
        spec.isLoaded = true;
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
    that.setMetaLoaded = function () {
        spec.isLoaded = true;
    };
    that.metaLoaded = function () {
        return spec.isLoaded;
    };
    that.setState = function (newState) {
        if (spec.state !== newState) {
            var prevState = spec.state;
            //ToDo : This is temporary code. avoid background content error.
            if (prevState === _constants.STATE_AD_PLAYING && (newState === _constants.STATE_ERROR || newState === _constants.STATE_IDLE)) {
                return false;
            }
            /*
             * 2019-06-13
             * No more necessary this codes.
             * Checking the autoPlay support was using main video element. elVideo.play() -> yes or no??
             * And then that causes triggering play and pause event.
             * And that checking waits for elVideo loaded. Dash load completion time is unknown.
             * Then I changed check method. I make temporary video tag and insert empty video.
             * */
            //if ((prevState === STATE_AD_PLAYING || prevState === STATE_AD_PAUSED ) && (newState === STATE_PAUSED || newState === STATE_PLAYING)) {
            //    return false;
            //Ads checks checkAutoplaySupport(). It calls real play() and pause() to video element.
            //And then that triggers "playing" and "pause".
            //I prevent these process.
            //}
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
};

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
        isLoaded: false,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcC5qcyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImVsRmxhc2giLCJwcm92aWRlciIsInZpZGVvRW5kZWRDYWxsYmFjayIsInRoYXQiLCJpc0pTUmVhZHkiLCJ0aW1ldXBkYXRlIiwiZGF0YSIsImN1cnJlbnRUaW1lIiwicG9zaXRpb24iLCJ0cmlnZ2VyIiwiQ09OVEVOVF9USU1FIiwidm9sdW1lQ2hhbmdlZCIsIkNPTlRFTlRfVk9MVU1FIiwic3RhdGVDaGFuZ2VkIiwic2V0U3RhdGUiLCJuZXdzdGF0ZSIsIm1ldGFDaGFuZ2VkIiwiQ09OVEVOVF9NRVRBIiwiZXJyb3IiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwiRVJST1IiLCJQcm92aWRlciIsInNwZWMiLCJwbGF5ZXJDb25maWciLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImVsZW1lbnQiLCJhZHMiLCJsaXN0ZW5lciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImFkVGFnVXJsIiwiZ2V0QWRDbGllbnQiLCJBRF9DTElFTlRfVkFTVCIsImNvbnNvbGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJzb3VyY2VzIiwiY3VycmVudFNvdXJjZSIsInByZXZpb3VzU291cmNlIiwiZ2V0Q3VycmVudFNvdXJjZSIsInNvdXJjZUNoYW5nZWQiLCJmaWxlIiwibG9hZCIsImdldFBvc2l0aW9uIiwic2VlayIsIl9hZnRlckxvYWQiLCJpc0xvYWRlZCIsImlzQXV0b1N0YXJ0IiwicGxheSIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsImZ1bmNOYW1lIiwiZnVuY0RhdGEiLCJnZXROYW1lIiwibmFtZSIsImNhblNlZWsiLCJzZXRDYW5TZWVrIiwiaXNTZWVraW5nIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJzZXRNZXRhTG9hZGVkIiwibWV0YUxvYWRlZCIsIm5ld1N0YXRlIiwic3RhdGUiLCJwcmV2U3RhdGUiLCJTVEFURV9BRF9QTEFZSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiUExBWUVSX1BBVVNFIiwiU1RBVEVfQURfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwiZ2V0U3RhdGUiLCJzZXRCdWZmZXIiLCJuZXdCdWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsInNldFZvbHVtZSIsInZvbHVtZSIsImdldFZvbHVtZSIsInNldE11dGUiLCJnZXRNdXRlIiwicHJlbG9hZCIsInJldHJ5Q291bnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNoZWNrU3dmSXNSZWFkeSIsImlzRmxhc2hSZWFkeSIsImNoZWNrRmlsZUxvYWRlZCIsImlzRmlsZUxvYWRlZCIsImlzTXV0ZSIsInNldFRpbWVvdXQiLCJFUlJPUlMiLCJJTklUX1JUTVBfU0VUVVBfRVJST1IiLCJpc0FjdGl2ZSIsInN0YXJ0ZWQiLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRTb3VyY2VzIiwibWFwIiwiaW5kZXgiLCJ0eXBlIiwibGFiZWwiLCJzZXRDdXJyZW50U291cmNlIiwic291cmNlSW5kZXgiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJjdXJyZW50UXVhbGl0eSIsImxlbmd0aCIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJzZXRTb3VyY2VJbmRleCIsImdldEN1cnJlbnRUaW1lIiwiZ2V0UXVhbGl0eUxldmVscyIsInF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsInNldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0RnJhbWVyYXRlIiwiZnJhbWVyYXRlIiwic2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImZwcyIsImN1cnJlbnRGcmFtZXMiLCJuZXdQb3NpdGlvbiIsInN0b3AiLCJkZXN0cm95Iiwib2ZmIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJSdG1wIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJQUk9WSURFUl9SVE1QIiwibXNlIiwiaXNMaXZlIiwiYnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOztBQTZCQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBU0MsT0FBVCxFQUFrQkMsUUFBbEIsRUFBNEJDLGtCQUE1QixFQUErQztBQUM1RCxRQUFJQyxPQUFPLEVBQVg7O0FBRUFBLFNBQUtDLFNBQUwsR0FBaUIsWUFBSztBQUNsQixlQUFPLElBQVA7QUFDSCxLQUZEO0FBR0FELFNBQUtFLFVBQUwsR0FBa0IsVUFBQ0MsSUFBRCxFQUFTOztBQUV2Qk4sZ0JBQVFPLFdBQVIsR0FBc0JELEtBQUtFLFFBQTNCO0FBQ0FQLGlCQUFTUSxPQUFULENBQWlCQyx1QkFBakIsRUFBK0JKLElBQS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBWUgsS0FuQkQ7QUFvQkFILFNBQUtRLGFBQUwsR0FBcUIsVUFBQ0wsSUFBRCxFQUFTO0FBQzFCTCxpQkFBU1EsT0FBVCxDQUFpQkcseUJBQWpCLEVBQWlDTixJQUFqQztBQUNILEtBRkQ7QUFHQUgsU0FBS1UsWUFBTCxHQUFvQixVQUFDUCxJQUFELEVBQVM7QUFDekJMLGlCQUFTYSxRQUFULENBQWtCUixLQUFLUyxRQUF2QjtBQUNILEtBRkQ7QUFHQVosU0FBS2EsV0FBTCxHQUFtQixVQUFDVixJQUFELEVBQVM7QUFDeEJMLGlCQUFTUSxPQUFULENBQWlC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SSxJIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjcuLlxuICovXG5pbXBvcnQge1xuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUExBWUVSX1NUQVRFLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGVsRmxhc2gsIHByb3ZpZGVyLCB2aWRlb0VuZGVkQ2FsbGJhY2spe1xuICAgIGxldCB0aGF0ID0ge307XG5cbiAgICB0aGF0LmlzSlNSZWFkeSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHRoYXQudGltZXVwZGF0ZSA9IChkYXRhKSA9PntcblxuICAgICAgICBlbEZsYXNoLmN1cnJlbnRUaW1lID0gZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIGRhdGEpO1xuICAgICAgICAvL3Byb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVIsIGRhdGEpO1xuICAgICAgICAvL2RhdGEuZHVyYXRpb24tMSA6IHRoaXMgaXMgdHJpY2suIGJlY2F1c2Ugc29tZXRpbWVzIHJ0bXAncyBwb3NpdGlvbiA8IGR1cmF0aW9uIHdoZW4gdmlkZW8gZW5kZWQuXG4gICAgICAgIC8vMjAxOS0wNi0wNyA6IERvIG5vdCB1c2UgZHVyYXRpb24tMSB0cmljayBhbnltb3JlLiBJIGltcHJvdmVkIFNXRiBwbGF5ZXIuXG4gICAgICAgIC8qaWYoZGF0YS5wb3NpdGlvbiA+PSAoZGF0YS5kdXJhdGlvbi0xKSl7XG4gICAgICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9JRExFICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0NPTVBMRVRFKXtcbiAgICAgICAgICAgICAgICBpZih2aWRlb0VuZGVkQ2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICB2aWRlb0VuZGVkQ2FsbGJhY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSovXG4gICAgfTtcbiAgICB0aGF0LnZvbHVtZUNoYW5nZWQgPSAoZGF0YSkgPT57XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIGRhdGEpO1xuICAgIH07XG4gICAgdGhhdC5zdGF0ZUNoYW5nZWQgPSAoZGF0YSkgPT57XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKGRhdGEubmV3c3RhdGUpO1xuICAgIH07XG4gICAgdGhhdC5tZXRhQ2hhbmdlZCA9IChkYXRhKSA9PntcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIGRhdGEpO1xuICAgIH07XG4gICAgdGhhdC5lcnJvciA9IChlcnJvcikgPT57XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcblxuICAgICAgICAvL1BSSVZBVEVfU1RBVEVfRVJST1JcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IpO1xuXG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxuICovXG5pbXBvcnQgSW1hIGZyb20gXCJhcGkvYWRzL2ltYS9BZFwiO1xuaW1wb3J0IFZhc3QgZnJvbSBcImFwaS9hZHMvdmFzdC9BZFwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXJcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgcGlja0N1cnJlbnRTb3VyY2V9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgRVJST1JTLCBJTklUX1JUTVBfU0VUVVBfRVJST1IsXG4gICAgU1RBVEVfSURMRSwgU1RBVEVfUExBWUlORywgU1RBVEVfUEFVU0VELCBTVEFURV9DT01QTEVURSwgU1RBVEVfRVJST1IsXG4gICAgUExBWUVSX1NUQVRFLCBQTEFZRVJfQ09NUExFVEUsIFBMQVlFUl9QQVVTRSwgUExBWUVSX1BMQVksIFNUQVRFX0FEX1BMQVlJTkcsIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBDT05URU5UX1NPVVJDRV9DSEFOR0VELCBDT05URU5UX0xFVkVMX0NIQU5HRUQsIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELFxuICAgIEFEX0NMSUVOVF9HT09HTEVJTUEsIEFEX0NMSUVOVF9WQVNULFxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBDb3JlIEZvciBGbGFzaCBWaWRlby5cbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcbiAqICovXG5cblxuY29uc3QgUHJvdmlkZXIgPSBmdW5jdGlvbihzcGVjLCBwbGF5ZXJDb25maWcpe1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgbG9hZGVkLiBcIik7XG5cbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcblxuICAgIGxldCBlbEZsYXNoID0gc3BlYy5lbGVtZW50O1xuICAgIGxldCBhZHMgPSBudWxsLCBsaXN0ZW5lciA9IG51bGwsIHZpZGVvRW5kZWRDYWxsYmFjayA9IG51bGw7XG5cbiAgICAvL0l0IG1lYW5zIHRvIHN1cHBvcnQgYWQgZm9yIGZsYXNoLiBTZXQgdGhlIHNhbWUgc3BlY2lmaWNhdGlvbnMgbGlrZSBhIFZpZGVvIFRhZy5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxGbGFzaCwgJ2N1cnJlbnRUaW1lJyxcbiAgICAgICAge3ZhbHVlIDowLCB3cml0YWJsZSA6IHRydWV9XG4gICAgKTtcblxuICAgIGlmKHNwZWMuYWRUYWdVcmwpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbUHJvdmlkZXJdIEFkIENsaWVudCAtIFwiLCBwbGF5ZXJDb25maWcuZ2V0QWRDbGllbnQoKSk7XG4gICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRBZENsaWVudCgpID09PSBBRF9DTElFTlRfVkFTVCl7XG4gICAgICAgICAgICBhZHMgPSBWYXN0KGVsRmxhc2gsIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgYWRzID0gSW1hKGVsRmxhc2gsIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighYWRzKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxpc3RlbmVyID0gRXZlbnRzTGlzdGVuZXIoZWxGbGFzaCwgdGhhdCwgYWRzID8gYWRzLnZpZGVvRW5kZWRDYWxsYmFjayA6IG51bGwpO1xuXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2UgPSBlbEZsYXNoLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2UuZmlsZSAhPT0gcHJldmlvdXNTb3VyY2UpO1xuICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xuICAgICAgICAgICAgZWxGbGFzaC5sb2FkKHNvdXJjZS5maWxlKTtcbiAgICAgICAgfWVsc2UgaWYobGFzdFBsYXlQb3NpdGlvbiA9PT0gMCAmJiB0aGF0LmdldFBvc2l0aW9uKCkgPiAwKXtcbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICAvL0ZsYXNoIGhhcyB0d28gaW5pdCBzdGF0ZXMuIEZsYXNoTG9hZGVkIGFuZCBGaWxlTG9hZGVkLlxuICAgIC8vX2xvYWQgY2FsbHMgYWZ0ZXIgRmxhc2hMb2FkZWQuIF9hZnRlckxvYWQgY2FsbHMgYWZ0ZXIgRmlsZUxvYWRlZC5cbiAgICBjb25zdCBfYWZ0ZXJMb2FkID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XG4gICAgICAgIHNwZWMuaXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XG4gICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcblxuICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAvL1RoaXMgaXMgd2h5LiBGbGFzaCBkb2VzIG5vdCBzZWxmIHRyaWcgdG8gYWRzLGxtYWxtLFxuICAgIHRoYXQudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsID0gKGZ1bmNOYW1lLCBmdW5jRGF0YSkgPT4ge1xuICAgICAgICBpZihsaXN0ZW5lcltmdW5jTmFtZV0pe1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyW2Z1bmNOYW1lXShmdW5jRGF0YSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMubmFtZTtcbiAgICB9O1xuXG4gICAgdGhhdC5jYW5TZWVrID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5jYW5TZWVrO1xuICAgIH07XG4gICAgdGhhdC5zZXRDYW5TZWVrID0gKGNhblNlZWspID0+IHtcbiAgICAgICAgc3BlYy5jYW5TZWVrID0gY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuaXNTZWVraW5nID0gKCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuc2Vla2luZztcbiAgICB9O1xuICAgIHRoYXQuc2V0U2Vla2luZyA9IChzZWVraW5nKT0+e1xuICAgICAgICBzcGVjLnNlZWtpbmcgPSBzZWVraW5nO1xuICAgIH07XG4gICAgdGhhdC5zZXRNZXRhTG9hZGVkID0gKCkgPT4ge1xuICAgICAgICBzcGVjLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhhdC5tZXRhTG9hZGVkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5pc0xvYWRlZDtcbiAgICB9XG4gICAgdGhhdC5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgPT4ge1xuICAgICAgICBpZihzcGVjLnN0YXRlICE9PSBuZXdTdGF0ZSl7XG4gICAgICAgICAgICBsZXQgcHJldlN0YXRlID0gc3BlYy5zdGF0ZTtcbiAgICAgICAgICAgIC8vVG9EbyA6IFRoaXMgaXMgdGVtcG9yYXJ5IGNvZGUuIGF2b2lkIGJhY2tncm91bmQgY29udGVudCBlcnJvci5cbiAgICAgICAgICAgIGlmKHByZXZTdGF0ZSA9PT0gU1RBVEVfQURfUExBWUlORyAmJiAobmV3U3RhdGUgPT09IFNUQVRFX0VSUk9SIHx8IG5ld1N0YXRlID09PSBTVEFURV9JRExFKSApe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiAyMDE5LTA2LTEzXG4gICAgICAgICAgICAgKiBObyBtb3JlIG5lY2Vzc2FyeSB0aGlzIGNvZGVzLlxuICAgICAgICAgICAgICogQ2hlY2tpbmcgdGhlIGF1dG9QbGF5IHN1cHBvcnQgd2FzIHVzaW5nIG1haW4gdmlkZW8gZWxlbWVudC4gZWxWaWRlby5wbGF5KCkgLT4geWVzIG9yIG5vPz9cbiAgICAgICAgICAgICAqIEFuZCB0aGVuIHRoYXQgY2F1c2VzIHRyaWdnZXJpbmcgcGxheSBhbmQgcGF1c2UgZXZlbnQuXG4gICAgICAgICAgICAgKiBBbmQgdGhhdCBjaGVja2luZyB3YWl0cyBmb3IgZWxWaWRlbyBsb2FkZWQuIERhc2ggbG9hZCBjb21wbGV0aW9uIHRpbWUgaXMgdW5rbm93bi5cbiAgICAgICAgICAgICAqIFRoZW4gSSBjaGFuZ2VkIGNoZWNrIG1ldGhvZC4gSSBtYWtlIHRlbXBvcmFyeSB2aWRlbyB0YWcgYW5kIGluc2VydCBlbXB0eSB2aWRlby5cbiAgICAgICAgICAgICAqICovXG4gICAgICAgICAgICAvL2lmICgocHJldlN0YXRlID09PSBTVEFURV9BRF9QTEFZSU5HIHx8IHByZXZTdGF0ZSA9PT0gU1RBVEVfQURfUEFVU0VEICkgJiYgKG5ld1N0YXRlID09PSBTVEFURV9QQVVTRUQgfHwgbmV3U3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpKSB7XG4gICAgICAgICAgICAvLyAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAvL0FkcyBjaGVja3MgY2hlY2tBdXRvcGxheVN1cHBvcnQoKS4gSXQgY2FsbHMgcmVhbCBwbGF5KCkgYW5kIHBhdXNlKCkgdG8gdmlkZW8gZWxlbWVudC5cbiAgICAgICAgICAgIC8vQW5kIHRoZW4gdGhhdCB0cmlnZ2VycyBcInBsYXlpbmdcIiBhbmQgXCJwYXVzZVwiLlxuICAgICAgICAgICAgLy9JIHByZXZlbnQgdGhlc2UgcHJvY2Vzcy5cbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgc3dpdGNoKG5ld1N0YXRlKXtcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0NPTVBMRVRFIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUEFVU0VEIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX1BBVVNFRFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9BRF9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfQURfUEFVU0VEXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BMQVlJTkcgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QTEFZSU5HXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQURfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX0FEX1BMQVlJTkdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BlYy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xuICAgICAgICAgICAgICAgIHByZXZzdGF0ZSA6IHByZXZTdGF0ZSxcbiAgICAgICAgICAgICAgICBuZXdzdGF0ZTogc3BlYy5zdGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcblxuICAgIH07XG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0QnVmZmVyID8gZWxGbGFzaC5nZXRCdWZmZXIoKSA6IG51bGw7XG4gICAgfTtcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldER1cmF0aW9uID8gZWxGbGFzaC5nZXREdXJhdGlvbigpIDogMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0UG9zaXRpb24gPyBlbEZsYXNoLmdldFBvc2l0aW9uKCkgOiAwO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guc2V0Vm9sdW1lID8gZWxGbGFzaC5zZXRWb2x1bWUodm9sdW1lKSA6IDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5zZXRWb2x1bWUgPyBlbEZsYXNoLmdldFZvbHVtZSgpIDogMDtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIGVsRmxhc2guc2V0TXV0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0TXV0ZSA/IGVsRmxhc2guZ2V0TXV0ZSgpIDogZmFsc2U7XG4gICAgfTtcblxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHByZWxvYWQoKSBcIiwgc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcblxuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIC8vRmlyc3QgOiBjaGVja1N3ZklzUmVhZHkgLT4gSXQgY2hlY2tzIHN3ZiBsb2FkaW5nIGNvbXBsZXRlIGJ5IHBvbGxpbmcuXG4gICAgICAgICAgICAvL1NlY29uZCA6IGNoZWNrRmlsZUxvYWRlZCAtPiBJdCBjaGVja3Mgc3JjIGxvYWRpbmcgY29tcGxldGUgYnkgcG9sbGluZyB0b28uXG4gICAgICAgICAgICAvL1doeSBjb21wbGV4IGlzIGl0PyAtPiBJdCBhZ2FpbnN0cyBmbGFzaCB0aW1pbmcgaXNzdWUuXG4gICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tTd2ZJc1JlYWR5KCl7XG4gICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcbiAgICAgICAgICAgICAgICBpZihlbEZsYXNoLmlzRmxhc2hSZWFkeSAmJiBlbEZsYXNoLmlzRmxhc2hSZWFkeSgpKXtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsRmxhc2gsICdkdXJhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWUgOmVsRmxhc2guZ2V0RHVyYXRpb24oKX1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbiB8fCAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0cnlDb3VudCA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiBjaGVja0ZpbGVMb2FkZWQoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlbEZsYXNoLmlzRmlsZUxvYWRlZCAmJiBlbEZsYXNoLmlzRmlsZUxvYWRlZCgpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWZ0ZXJMb2FkKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc011dGUoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpICYmIHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSA8IDEwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDMwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tGaWxlTG9hZGVkLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KEVSUk9SU1tJTklUX1JUTVBfU0VUVVBfRVJST1JdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDEwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrU3dmSXNSZWFkeSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KEVSUk9SU1tJTklUX1JUTVBfU0VUVVBfRVJST1JdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcbiAgICAgICAgX2xvYWQoMCk7ICAgLy9zcGVjLnNvdXJjZXNfLnN0YXJ0dGltZSB8fFxuICAgICAgICBfYWZ0ZXJMb2FkKDApO1xuICAgIH07XG5cbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBpZiAoIChhZHMgJiYgYWRzLmlzQWN0aXZlKCkpIHx8IChhZHMgJiYgIWFkcy5zdGFydGVkKCkpICkge1xuICAgICAgICAgICAgICAgIGFkcy5wbGF5KCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBlbEZsYXNoLnBsYXkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuICAgIHRoYXQucGF1c2UgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIGVsRmxhc2gucGF1c2UoKTtcbiAgICAgICAgfWVsc2UgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKXtcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT57XG4gICAgICAgIGVsRmxhc2guc2Vlayhwb3NpdGlvbik7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXG4gICAgICAgICAgICAgICAgaW5kZXggOiBpbmRleFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChzb3VyY2VJbmRleCwgbmVlZFByb3ZpZGVyQ2hhbmdlKSA9PiB7XG4gICAgICAgIGlmKHNwZWMuY3VycmVudFF1YWxpdHkgPT09IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNvdXJjZUluZGV4ID4gLTEpe1xuICAgICAgICAgICAgaWYoc3BlYy5zb3VyY2VzICYmIHNwZWMuc291cmNlcy5sZW5ndGggPiBzb3VyY2VJbmRleCl7XG4gICAgICAgICAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlSW5kZXgoc291cmNlSW5kZXgpO1xuICAgICAgICAgICAgICAgIC8vcGxheWVyQ29uZmlnLnNldFNvdXJjZUxhYmVsKHNwZWMuc291cmNlc1tzb3VyY2VJbmRleF0ubGFiZWwpO1xuXG4gICAgICAgICAgICAgICAgaWYobmVlZFByb3ZpZGVyQ2hhbmdlKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3RQbGF5UG9zaXRpb24gPSBlbEZsYXNoLmdldEN1cnJlbnRUaW1lKCl8fCAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja0ZpbGVMb2FkZWQoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlbEZsYXNoLmlzRmlsZUxvYWRlZCAmJiBlbEZsYXNoLmlzRmlsZUxvYWRlZCgpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWZ0ZXJMb2FkKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMzAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0ZpbGVMb2FkZWQsIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZUxvYWQgZmFpbGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0RnJhbWVyYXRlID0gKGZyYW1lcmF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGUgPSBmcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PntcbiAgICAgICAgbGV0IGZwcyA9IHNwZWMuZnJhbWVyYXRlO1xuICAgICAgICBsZXQgY3VycmVudEZyYW1lcyA9IGVsRmxhc2guZ2V0Q3VycmVudFRpbWUoKSAqIGZwcztcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXG5cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xuICAgIH07XG5cbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XG4gICAgICAgIGVsRmxhc2guc3RvcCgpO1xuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGRlc3Ryb3koKSBwbGF5ZXIgc3RvcCwgbGlzdGVuZXIsIGV2ZW50IGRlc3Ryb2llZFwiKTtcbiAgICAgICAgdGhhdC5zdG9wKCk7XG5cbiAgICAgICAgLyp0cnl7XG4gICAgICAgICAgICBlbEZsYXNoLnJlbW92ZSgpO1xuICAgICAgICB9Y2F0Y2goZXJyb3Ipe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9Ki9cblxuXG4gICAgICAgIGlmKGFkcyl7XG4gICAgICAgICAgICBhZHMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgfTtcblxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyMy4uXG4gKi9cbmltcG9ydCB7U1RBVEVfSURMRSwgUFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2ZsYXNoL1Byb3ZpZGVyXCI7XG4vKipcbiAqIEBicmllZiAgIHJ0bXAgcHJvdmlkZXJcbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5cbmNvbnN0IFJ0bXAgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyA9IG51bGw7XG5cbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgbmFtZSA6IFBST1ZJREVSX1JUTVAsXG4gICAgICAgIGVsZW1lbnQgOiBlbGVtZW50LFxuICAgICAgICBtc2UgOiBudWxsLFxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXG4gICAgICAgIGlzTG9hZGVkIDogZmFsc2UsXG4gICAgICAgIGNhblNlZWsgOiBmYWxzZSxcbiAgICAgICAgaXNMaXZlIDogZmFsc2UsXG4gICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcbiAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxuICAgICAgICBidWZmZXIgOiAwLFxuICAgICAgICBmcmFtZXJhdGUgOiAwLFxuICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxuICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXG4gICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcbiAgICAgICAgc291cmNlcyA6IFtdLFxuICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXG4gICAgfTtcblxuICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIG51bGwpO1xuICAgIHN1cGVyRGVzdHJveV9mdW5jICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlJUTVAgUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJSVE1QIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFJ0bXA7Il0sInNvdXJjZVJvb3QiOiIifQ==