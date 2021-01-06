/*! OvenPlayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
                                return reject(_constants.ERRORS.codes[_constants.INIT_RTMP_SETUP_ERROR]);
                            }
                        }
                    }();
                } else {
                    if (retryCount < 100) {
                        setTimeout(checkSwfIsReady, 100);
                    } else {
                        return reject(_constants.ERRORS.codes[_constants.INIT_RTMP_SETUP_ERROR]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcC5qcyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImVsRmxhc2giLCJwcm92aWRlciIsInZpZGVvRW5kZWRDYWxsYmFjayIsInRoYXQiLCJpc0pTUmVhZHkiLCJ0aW1ldXBkYXRlIiwiZGF0YSIsImN1cnJlbnRUaW1lIiwicG9zaXRpb24iLCJ0cmlnZ2VyIiwiQ09OVEVOVF9USU1FIiwidm9sdW1lQ2hhbmdlZCIsIkNPTlRFTlRfVk9MVU1FIiwic3RhdGVDaGFuZ2VkIiwic2V0U3RhdGUiLCJuZXdzdGF0ZSIsIm1ldGFDaGFuZ2VkIiwiQ09OVEVOVF9NRVRBIiwiZXJyb3IiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwiRVJST1IiLCJQcm92aWRlciIsInNwZWMiLCJwbGF5ZXJDb25maWciLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImVsZW1lbnQiLCJhZHMiLCJsaXN0ZW5lciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImFkVGFnVXJsIiwiZ2V0QWRDbGllbnQiLCJBRF9DTElFTlRfVkFTVCIsImNvbnNvbGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJzb3VyY2VzIiwiY3VycmVudFNvdXJjZSIsInByZXZpb3VzU291cmNlIiwiZ2V0Q3VycmVudFNvdXJjZSIsInNvdXJjZUNoYW5nZWQiLCJmaWxlIiwibG9hZCIsImdldFBvc2l0aW9uIiwic2VlayIsIl9hZnRlckxvYWQiLCJpc0xvYWRlZCIsImlzQXV0b1N0YXJ0IiwicGxheSIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsImZ1bmNOYW1lIiwiZnVuY0RhdGEiLCJnZXROYW1lIiwibmFtZSIsImNhblNlZWsiLCJzZXRDYW5TZWVrIiwiaXNTZWVraW5nIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJzZXRNZXRhTG9hZGVkIiwibWV0YUxvYWRlZCIsIm5ld1N0YXRlIiwic3RhdGUiLCJwcmV2U3RhdGUiLCJTVEFURV9BRF9QTEFZSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiUExBWUVSX1BBVVNFIiwiU1RBVEVfQURfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwiZ2V0U3RhdGUiLCJzZXRCdWZmZXIiLCJuZXdCdWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsInNldFZvbHVtZSIsInZvbHVtZSIsImdldFZvbHVtZSIsInNldE11dGUiLCJnZXRNdXRlIiwicHJlbG9hZCIsInJldHJ5Q291bnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNoZWNrU3dmSXNSZWFkeSIsImlzRmxhc2hSZWFkeSIsImNoZWNrRmlsZUxvYWRlZCIsImlzRmlsZUxvYWRlZCIsImlzTXV0ZSIsInNldFRpbWVvdXQiLCJFUlJPUlMiLCJjb2RlcyIsIklOSVRfUlRNUF9TRVRVUF9FUlJPUiIsImlzQWN0aXZlIiwic3RhcnRlZCIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsImdldFNvdXJjZXMiLCJtYXAiLCJpbmRleCIsInR5cGUiLCJsYWJlbCIsInNldEN1cnJlbnRTb3VyY2UiLCJzb3VyY2VJbmRleCIsIm5lZWRQcm92aWRlckNoYW5nZSIsImN1cnJlbnRRdWFsaXR5IiwibGVuZ3RoIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsInNldFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFRpbWUiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRGcmFtZXJhdGUiLCJmcmFtZXJhdGUiLCJzZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZnBzIiwiY3VycmVudEZyYW1lcyIsIm5ld1Bvc2l0aW9uIiwic3RvcCIsImRlc3Ryb3kiLCJvZmYiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyIsIlJ0bXAiLCJzdXBlckRlc3Ryb3lfZnVuYyIsIlBST1ZJREVSX1JUTVAiLCJtc2UiLCJpc0xpdmUiLCJidWZmZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7O0FBNkJBLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFTQyxPQUFULEVBQWtCQyxRQUFsQixFQUE0QkMsa0JBQTVCLEVBQStDO0FBQzVELFFBQUlDLE9BQU8sRUFBWDs7QUFFQUEsU0FBS0MsU0FBTCxHQUFpQixZQUFLO0FBQ2xCLGVBQU8sSUFBUDtBQUNILEtBRkQ7QUFHQUQsU0FBS0UsVUFBTCxHQUFrQixVQUFDQyxJQUFELEVBQVM7O0FBRXZCTixnQkFBUU8sV0FBUixHQUFzQkQsS0FBS0UsUUFBM0I7QUFDQVAsaUJBQVNRLE9BQVQsQ0FBaUJDLHVCQUFqQixFQUErQkosSUFBL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFZSCxLQW5CRDtBQW9CQUgsU0FBS1EsYUFBTCxHQUFxQixVQUFDTCxJQUFELEVBQVM7QUFDMUJMLGlCQUFTUSxPQUFULENBQWlCRyx5QkFBakIsRUFBaUNOLElBQWpDO0FBQ0gsS0FGRDtBQUdBSCxTQUFLVSxZQUFMLEdBQW9CLFVBQUNQLElBQUQsRUFBUztBQUN6QkwsaUJBQVNhLFFBQVQsQ0FBa0JSLEtBQUtTLFFBQXZCO0FBQ0gsS0FGRDtBQUdBWixTQUFLYSxXQUFMLEdBQW1CLFVBQUNWLElBQUQsRUFBUztBQUN4QkwsaUJBQVNRLE9B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LFdBQU85SSxJQUFQO0FBQ0gsQ0FsQ0Q7O3FCQXFDZTZJLEkiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI3Li5cclxuICovXHJcbmltcG9ydCB7XHJcbiAgICBFUlJPUixcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX1BBVVNFRCxcclxuICAgIFNUQVRFX0VSUk9SLFxyXG4gICAgQ09OVEVOVF9DT01QTEVURSxcclxuICAgIENPTlRFTlRfU0VFSyxcclxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXHJcbiAgICBDT05URU5UX1NFRUtFRCxcclxuICAgIENPTlRFTlRfQlVGRkVSLFxyXG4gICAgQ09OVEVOVF9USU1FLFxyXG4gICAgQ09OVEVOVF9WT0xVTUUsXHJcbiAgICBDT05URU5UX01FVEEsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXHJcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcclxuICAgIFBMQVlFUl9TVEFURSxcclxuICAgIFBST1ZJREVSX0hUTUw1LFxyXG4gICAgUFJPVklERVJfV0VCUlRDLFxyXG4gICAgUFJPVklERVJfREFTSCxcclxuICAgIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGVsRmxhc2gsIHByb3ZpZGVyLCB2aWRlb0VuZGVkQ2FsbGJhY2spe1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuXHJcbiAgICB0aGF0LmlzSlNSZWFkeSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIHRoYXQudGltZXVwZGF0ZSA9IChkYXRhKSA9PntcclxuXHJcbiAgICAgICAgZWxGbGFzaC5jdXJyZW50VGltZSA9IGRhdGEucG9zaXRpb247XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIGRhdGEpO1xyXG4gICAgICAgIC8vcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwgZGF0YSk7XHJcbiAgICAgICAgLy9kYXRhLmR1cmF0aW9uLTEgOiB0aGlzIGlzIHRyaWNrLiBiZWNhdXNlIHNvbWV0aW1lcyBydG1wJ3MgcG9zaXRpb24gPCBkdXJhdGlvbiB3aGVuIHZpZGVvIGVuZGVkLlxyXG4gICAgICAgIC8vMjAxOS0wNi0wNyA6IERvIG5vdCB1c2UgZHVyYXRpb24tMSB0cmljayBhbnltb3JlLiBJIGltcHJvdmVkIFNXRiBwbGF5ZXIuXHJcbiAgICAgICAgLyppZihkYXRhLnBvc2l0aW9uID49IChkYXRhLmR1cmF0aW9uLTEpKXtcclxuICAgICAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9DT01QTEVURSl7XHJcbiAgICAgICAgICAgICAgICBpZih2aWRlb0VuZGVkQ2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZGVvRW5kZWRDYWxsYmFjayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSovXHJcbiAgICB9O1xyXG4gICAgdGhhdC52b2x1bWVDaGFuZ2VkID0gKGRhdGEpID0+e1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIGRhdGEpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc3RhdGVDaGFuZ2VkID0gKGRhdGEpID0+e1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKGRhdGEubmV3c3RhdGUpO1xyXG4gICAgfTtcclxuICAgIHRoYXQubWV0YUNoYW5nZWQgPSAoZGF0YSkgPT57XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIGRhdGEpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZXJyb3IgPSAoZXJyb3IpID0+e1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcclxuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xyXG5cclxuICAgICAgICAvL1BSSVZBVEVfU1RBVEVfRVJST1JcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvcik7XHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxyXG4gKi9cclxuaW1wb3J0IEltYSBmcm9tIFwiYXBpL2Fkcy9pbWEvQWRcIjtcclxuaW1wb3J0IFZhc3QgZnJvbSBcImFwaS9hZHMvdmFzdC9BZFwiO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCBFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2ZsYXNoL0xpc3RlbmVyXCI7XHJcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgcGlja0N1cnJlbnRTb3VyY2V9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuaW1wb3J0IHtcclxuICAgIEVSUk9SUywgSU5JVF9SVE1QX1NFVFVQX0VSUk9SLFxyXG4gICAgU1RBVEVfSURMRSwgU1RBVEVfUExBWUlORywgU1RBVEVfUEFVU0VELCBTVEFURV9DT01QTEVURSwgU1RBVEVfRVJST1IsXHJcbiAgICBQTEFZRVJfU1RBVEUsIFBMQVlFUl9DT01QTEVURSwgUExBWUVSX1BBVVNFLCBQTEFZRVJfUExBWSwgU1RBVEVfQURfUExBWUlORywgU1RBVEVfQURfUEFVU0VELFxyXG4gICAgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwgQ09OVEVOVF9MRVZFTF9DSEFOR0VELCBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCxcclxuICAgIEFEX0NMSUVOVF9HT09HTEVJTUEsIEFEX0NMSUVOVF9WQVNULFxyXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgQ29yZSBGb3IgRmxhc2ggVmlkZW8uXHJcbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24oc3BlYywgcGxheWVyQ29uZmlnKXtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgbG9hZGVkLiBcIik7XHJcblxyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcclxuXHJcbiAgICBsZXQgZWxGbGFzaCA9IHNwZWMuZWxlbWVudDtcclxuICAgIGxldCBhZHMgPSBudWxsLCBsaXN0ZW5lciA9IG51bGwsIHZpZGVvRW5kZWRDYWxsYmFjayA9IG51bGw7XHJcblxyXG4gICAgLy9JdCBtZWFucyB0byBzdXBwb3J0IGFkIGZvciBmbGFzaC4gU2V0IHRoZSBzYW1lIHNwZWNpZmljYXRpb25zIGxpa2UgYSBWaWRlbyBUYWcuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxGbGFzaCwgJ2N1cnJlbnRUaW1lJyxcclxuICAgICAgICB7dmFsdWUgOjAsIHdyaXRhYmxlIDogdHJ1ZX1cclxuICAgICk7XHJcblxyXG4gICAgaWYoc3BlYy5hZFRhZ1VybCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiW1Byb3ZpZGVyXSBBZCBDbGllbnQgLSBcIiwgcGxheWVyQ29uZmlnLmdldEFkQ2xpZW50KCkpO1xyXG4gICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRBZENsaWVudCgpID09PSBBRF9DTElFTlRfVkFTVCl7XHJcbiAgICAgICAgICAgIGFkcyA9IFZhc3QoZWxGbGFzaCwgdGhhdCwgcGxheWVyQ29uZmlnLCBzcGVjLmFkVGFnVXJsKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYWRzID0gSW1hKGVsRmxhc2gsIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighYWRzKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYW4gbm90IGxvYWQgZHVlIHRvIGdvb2dsZSBpbWEgZm9yIEFkcy5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihlbEZsYXNoLCB0aGF0LCBhZHMgPyBhZHMudmlkZW9FbmRlZENhbGxiYWNrIDogbnVsbCk7XHJcblxyXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gZWxGbGFzaC5nZXRDdXJyZW50U291cmNlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZUNoYW5nZWQgPSAoc291cmNlLmZpbGUgIT09IHByZXZpb3VzU291cmNlKTtcclxuICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICBlbEZsYXNoLmxvYWQoc291cmNlLmZpbGUpO1xyXG4gICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgdGhhdC5nZXRQb3NpdGlvbigpID4gMCl7XHJcbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIC8vRmxhc2ggaGFzIHR3byBpbml0IHN0YXRlcy4gRmxhc2hMb2FkZWQgYW5kIEZpbGVMb2FkZWQuXHJcbiAgICAvL19sb2FkIGNhbGxzIGFmdGVyIEZsYXNoTG9hZGVkLiBfYWZ0ZXJMb2FkIGNhbGxzIGFmdGVyIEZpbGVMb2FkZWQuXHJcbiAgICBjb25zdCBfYWZ0ZXJMb2FkID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XHJcbiAgICAgICAgc3BlYy5pc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vVGhpcyBpcyB3aHkuIEZsYXNoIGRvZXMgbm90IHNlbGYgdHJpZyB0byBhZHMsbG1hbG0sXHJcbiAgICB0aGF0LnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCA9IChmdW5jTmFtZSwgZnVuY0RhdGEpID0+IHtcclxuICAgICAgICBpZihsaXN0ZW5lcltmdW5jTmFtZV0pe1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVuZXJbZnVuY05hbWVdKGZ1bmNEYXRhKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5uYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY2FuU2VlaztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldENhblNlZWsgPSAoY2FuU2VlaykgPT4ge1xyXG4gICAgICAgIHNwZWMuY2FuU2VlayA9IGNhblNlZWs7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnNlZWtpbmc7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmcpPT57XHJcbiAgICAgICAgc3BlYy5zZWVraW5nID0gc2Vla2luZztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldE1ldGFMb2FkZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgc3BlYy5pc0xvYWRlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGF0Lm1ldGFMb2FkZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNMb2FkZWQ7XHJcbiAgICB9XHJcbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xyXG4gICAgICAgICAgICBsZXQgcHJldlN0YXRlID0gc3BlYy5zdGF0ZTtcclxuICAgICAgICAgICAgLy9Ub0RvIDogVGhpcyBpcyB0ZW1wb3JhcnkgY29kZS4gYXZvaWQgYmFja2dyb3VuZCBjb250ZW50IGVycm9yLlxyXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BMQVlJTkcgJiYgKG5ld1N0YXRlID09PSBTVEFURV9FUlJPUiB8fCBuZXdTdGF0ZSA9PT0gU1RBVEVfSURMRSkgKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgKiAyMDE5LTA2LTEzXHJcbiAgICAgICAgICAgICAqIE5vIG1vcmUgbmVjZXNzYXJ5IHRoaXMgY29kZXMuXHJcbiAgICAgICAgICAgICAqIENoZWNraW5nIHRoZSBhdXRvUGxheSBzdXBwb3J0IHdhcyB1c2luZyBtYWluIHZpZGVvIGVsZW1lbnQuIGVsVmlkZW8ucGxheSgpIC0+IHllcyBvciBubz8/XHJcbiAgICAgICAgICAgICAqIEFuZCB0aGVuIHRoYXQgY2F1c2VzIHRyaWdnZXJpbmcgcGxheSBhbmQgcGF1c2UgZXZlbnQuXHJcbiAgICAgICAgICAgICAqIEFuZCB0aGF0IGNoZWNraW5nIHdhaXRzIGZvciBlbFZpZGVvIGxvYWRlZC4gRGFzaCBsb2FkIGNvbXBsZXRpb24gdGltZSBpcyB1bmtub3duLlxyXG4gICAgICAgICAgICAgKiBUaGVuIEkgY2hhbmdlZCBjaGVjayBtZXRob2QuIEkgbWFrZSB0ZW1wb3JhcnkgdmlkZW8gdGFnIGFuZCBpbnNlcnQgZW1wdHkgdmlkZW8uXHJcbiAgICAgICAgICAgICAqICovXHJcbiAgICAgICAgICAgIC8vaWYgKChwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BMQVlJTkcgfHwgcHJldlN0YXRlID09PSBTVEFURV9BRF9QQVVTRUQgKSAmJiAobmV3U3RhdGUgPT09IFNUQVRFX1BBVVNFRCB8fCBuZXdTdGF0ZSA9PT0gU1RBVEVfUExBWUlORykpIHtcclxuICAgICAgICAgICAgLy8gICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvL0FkcyBjaGVja3MgY2hlY2tBdXRvcGxheVN1cHBvcnQoKS4gSXQgY2FsbHMgcmVhbCBwbGF5KCkgYW5kIHBhdXNlKCkgdG8gdmlkZW8gZWxlbWVudC5cclxuICAgICAgICAgICAgLy9BbmQgdGhlbiB0aGF0IHRyaWdnZXJzIFwicGxheWluZ1wiIGFuZCBcInBhdXNlXCIuXHJcbiAgICAgICAgICAgIC8vSSBwcmV2ZW50IHRoZXNlIHByb2Nlc3MuXHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBzd2l0Y2gobmV3U3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QQVVTRURcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQURfUEFVU0VEIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX0FEX1BBVVNFRFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QTEFZSU5HIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfUExBWUlOR1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9BRF9QTEFZSU5HIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfQURfUExBWUlOR1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNwZWMuc3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xyXG4gICAgICAgICAgICAgICAgcHJldnN0YXRlIDogcHJldlN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5zdGF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRCdWZmZXIgPyBlbEZsYXNoLmdldEJ1ZmZlcigpIDogbnVsbDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbEZsYXNoKXtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0RHVyYXRpb24gPyBlbEZsYXNoLmdldER1cmF0aW9uKCkgOiAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRQb3NpdGlvbiA/IGVsRmxhc2guZ2V0UG9zaXRpb24oKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5zZXRWb2x1bWUgPyBlbEZsYXNoLnNldFZvbHVtZSh2b2x1bWUpIDogMDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxGbGFzaCl7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbEZsYXNoLnNldFZvbHVtZSA/IGVsRmxhc2guZ2V0Vm9sdW1lKCkgOiAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbEZsYXNoKXtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxGbGFzaC5zZXRNdXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRNdXRlID8gZWxGbGFzaC5nZXRNdXRlKCkgOiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wcmVsb2FkID0gKHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBwcmVsb2FkKCkgXCIsIHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcclxuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIC8vRmlyc3QgOiBjaGVja1N3ZklzUmVhZHkgLT4gSXQgY2hlY2tzIHN3ZiBsb2FkaW5nIGNvbXBsZXRlIGJ5IHBvbGxpbmcuXHJcbiAgICAgICAgICAgIC8vU2Vjb25kIDogY2hlY2tGaWxlTG9hZGVkIC0+IEl0IGNoZWNrcyBzcmMgbG9hZGluZyBjb21wbGV0ZSBieSBwb2xsaW5nIHRvby5cclxuICAgICAgICAgICAgLy9XaHkgY29tcGxleCBpcyBpdD8gLT4gSXQgYWdhaW5zdHMgZmxhc2ggdGltaW5nIGlzc3VlLlxyXG4gICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tTd2ZJc1JlYWR5KCl7XHJcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xyXG4gICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZsYXNoUmVhZHkgJiYgZWxGbGFzaC5pc0ZsYXNoUmVhZHkoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsRmxhc2gsICdkdXJhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZSA6ZWxGbGFzaC5nZXREdXJhdGlvbigpfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbiB8fCAwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiBjaGVja0ZpbGVMb2FkZWQoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZpbGVMb2FkZWQgJiYgZWxGbGFzaC5pc0ZpbGVMb2FkZWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWZ0ZXJMb2FkKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzTXV0ZSgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkgJiYgcGxheWVyQ29uZmlnLmdldFZvbHVtZSgpIDwgMTAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFZvbHVtZShwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAzMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tGaWxlTG9hZGVkLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlMuY29kZXNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrU3dmSXNSZWFkeSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlMuY29kZXNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XHJcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcclxuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XHJcbiAgICAgICAgX2xvYWQoMCk7ICAgLy9zcGVjLnNvdXJjZXNfLnN0YXJ0dGltZSB8fFxyXG4gICAgICAgIF9hZnRlckxvYWQoMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucGxheSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbEZsYXNoKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBpZiAoIChhZHMgJiYgYWRzLmlzQWN0aXZlKCkpIHx8IChhZHMgJiYgIWFkcy5zdGFydGVkKCkpICkge1xyXG4gICAgICAgICAgICAgICAgYWRzLnBsYXkoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBlbEZsYXNoLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcclxuICAgICAgICAgICAgZWxGbGFzaC5wYXVzZSgpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORyl7XHJcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcclxuICAgICAgICBlbEZsYXNoLnNlZWsocG9zaXRpb24pO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcclxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChzb3VyY2VJbmRleCwgbmVlZFByb3ZpZGVyQ2hhbmdlKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5jdXJyZW50UXVhbGl0eSA9PT0gc291cmNlSW5kZXgpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzb3VyY2VJbmRleCA+IC0xKXtcclxuICAgICAgICAgICAgaWYoc3BlYy5zb3VyY2VzICYmIHNwZWMuc291cmNlcy5sZW5ndGggPiBzb3VyY2VJbmRleCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHNvdXJjZUluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc291cmNlSW5kZXhcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VJbmRleChzb3VyY2VJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAvL3BsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihuZWVkUHJvdmlkZXJDaGFuZ2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gZWxGbGFzaC5nZXRDdXJyZW50VGltZSgpfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja0ZpbGVMb2FkZWQoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZpbGVMb2FkZWQgJiYgZWxGbGFzaC5pc0ZpbGVMb2FkZWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWZ0ZXJMb2FkKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMzAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRmlsZUxvYWRlZCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZUxvYWQgZmFpbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxGbGFzaCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEZyYW1lcmF0ZSA9IChmcmFtZXJhdGUpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGUgPSBmcmFtZXJhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT57XHJcbiAgICAgICAgbGV0IGZwcyA9IHNwZWMuZnJhbWVyYXRlO1xyXG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVzID0gZWxGbGFzaC5nZXRDdXJyZW50VGltZSgpICogZnBzO1xyXG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IChjdXJyZW50RnJhbWVzICsgZnJhbWVDb3VudCkgLyBmcHM7XHJcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXHJcblxyXG4gICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc3RvcCgpIFwiKTtcclxuICAgICAgICBlbEZsYXNoLnN0b3AoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGRlc3Ryb3koKSBwbGF5ZXIgc3RvcCwgbGlzdGVuZXIsIGV2ZW50IGRlc3Ryb2llZFwiKTtcclxuICAgICAgICB0aGF0LnN0b3AoKTtcclxuXHJcbiAgICAgICAgLyp0cnl7XHJcbiAgICAgICAgICAgIGVsRmxhc2gucmVtb3ZlKCk7XHJcbiAgICAgICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0qL1xyXG5cclxuXHJcbiAgICAgICAgaWYoYWRzKXtcclxuICAgICAgICAgICAgYWRzLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC5vZmYoKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9YWFggOiBJIGhvcGUgdXNpbmcgZXM2IGNsYXNzZXMuIGJ1dCBJIHRoaW5rIHRvIG9jY3VyIHByb2JsZW0gZnJvbSBPbGQgSUUuIFRoZW4gSSBjaG9pY2UgZnVuY3Rpb24gaW5oZXJpdC4gRmluYWxseSB1c2luZyBzdXBlciBmdW5jdGlvbiBpcyBzbyBkaWZmaWN1bHQuXHJcbiAgICAvLyB1c2UgOiBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7IC4uLiBzdXBlcl9kZXN0cm95KCk7XHJcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcclxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGF0W25hbWVdO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm92aWRlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQge1NUQVRFX0lETEUsIFBST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2ZsYXNoL1Byb3ZpZGVyXCI7XHJcbi8qKlxyXG4gKiBAYnJpZWYgICBydG1wIHByb3ZpZGVyXHJcbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cclxuICogKi9cclxuXHJcblxyXG5jb25zdCBSdG1wID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcclxuXHJcbiAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICBuYW1lIDogUFJPVklERVJfUlRNUCxcclxuICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcclxuICAgICAgICBtc2UgOiBudWxsLFxyXG4gICAgICAgIGxpc3RlbmVyIDogbnVsbCxcclxuICAgICAgICBpc0xvYWRlZCA6IGZhbHNlLFxyXG4gICAgICAgIGNhblNlZWsgOiBmYWxzZSxcclxuICAgICAgICBpc0xpdmUgOiBmYWxzZSxcclxuICAgICAgICBzZWVraW5nIDogZmFsc2UsXHJcbiAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxyXG4gICAgICAgIGJ1ZmZlciA6IDAsXHJcbiAgICAgICAgZnJhbWVyYXRlIDogMCxcclxuICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxyXG4gICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcclxuICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXHJcbiAgICAgICAgc291cmNlcyA6IFtdLFxyXG4gICAgICAgIGFkVGFnVXJsIDogYWRUYWdVcmxcclxuICAgIH07XHJcblxyXG4gICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgbnVsbCk7XHJcbiAgICBzdXBlckRlc3Ryb3lfZnVuYyAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUlRNUCBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlJUTVAgOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJ0bXA7Il0sInNvdXJjZVJvb3QiOiIifQ==