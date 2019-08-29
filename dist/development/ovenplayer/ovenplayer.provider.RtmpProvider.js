/*! OvenPlayerv0.9.741 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcC5qcyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImVsRmxhc2giLCJwcm92aWRlciIsInZpZGVvRW5kZWRDYWxsYmFjayIsInRoYXQiLCJpc0pTUmVhZHkiLCJ0aW1ldXBkYXRlIiwiZGF0YSIsImN1cnJlbnRUaW1lIiwicG9zaXRpb24iLCJ0cmlnZ2VyIiwiQ09OVEVOVF9USU1FIiwidm9sdW1lQ2hhbmdlZCIsIkNPTlRFTlRfVk9MVU1FIiwic3RhdGVDaGFuZ2VkIiwic2V0U3RhdGUiLCJuZXdzdGF0ZSIsIm1ldGFDaGFuZ2VkIiwiQ09OVEVOVF9NRVRBIiwiZXJyb3IiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwiRVJST1IiLCJQcm92aWRlciIsInNwZWMiLCJwbGF5ZXJDb25maWciLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImVsZW1lbnQiLCJhZHMiLCJsaXN0ZW5lciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImFkVGFnVXJsIiwiZ2V0QWRDbGllbnQiLCJBRF9DTElFTlRfVkFTVCIsImNvbnNvbGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJzb3VyY2VzIiwiY3VycmVudFNvdXJjZSIsInByZXZpb3VzU291cmNlIiwiZ2V0Q3VycmVudFNvdXJjZSIsInNvdXJjZUNoYW5nZWQiLCJmaWxlIiwibG9hZCIsImdldFBvc2l0aW9uIiwic2VlayIsIl9hZnRlckxvYWQiLCJpc0xvYWRlZCIsImlzQXV0b1N0YXJ0IiwicGxheSIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsImZ1bmNOYW1lIiwiZnVuY0RhdGEiLCJnZXROYW1lIiwibmFtZSIsImNhblNlZWsiLCJzZXRDYW5TZWVrIiwiaXNTZWVraW5nIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJzZXRNZXRhTG9hZGVkIiwibWV0YUxvYWRlZCIsIm5ld1N0YXRlIiwic3RhdGUiLCJwcmV2U3RhdGUiLCJTVEFURV9BRF9QTEFZSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiUExBWUVSX1BBVVNFIiwiU1RBVEVfQURfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwiZ2V0U3RhdGUiLCJzZXRCdWZmZXIiLCJuZXdCdWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsInNldFZvbHVtZSIsInZvbHVtZSIsImdldFZvbHVtZSIsInNldE11dGUiLCJnZXRNdXRlIiwicHJlbG9hZCIsInJldHJ5Q291bnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNoZWNrU3dmSXNSZWFkeSIsImlzRmxhc2hSZWFkeSIsImNoZWNrRmlsZUxvYWRlZCIsImlzRmlsZUxvYWRlZCIsImlzTXV0ZSIsInNldFRpbWVvdXQiLCJFUlJPUlMiLCJjb2RlcyIsIklOSVRfUlRNUF9TRVRVUF9FUlJPUiIsImlzQWN0aXZlIiwic3RhcnRlZCIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsImdldFNvdXJjZXMiLCJtYXAiLCJpbmRleCIsInR5cGUiLCJsYWJlbCIsInNldEN1cnJlbnRTb3VyY2UiLCJzb3VyY2VJbmRleCIsIm5lZWRQcm92aWRlckNoYW5nZSIsImN1cnJlbnRRdWFsaXR5IiwibGVuZ3RoIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsInNldFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFRpbWUiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRGcmFtZXJhdGUiLCJmcmFtZXJhdGUiLCJzZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZnBzIiwiY3VycmVudEZyYW1lcyIsIm5ld1Bvc2l0aW9uIiwic3RvcCIsImRlc3Ryb3kiLCJvZmYiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyIsIlJ0bXAiLCJzdXBlckRlc3Ryb3lfZnVuYyIsIlBST1ZJREVSX1JUTVAiLCJtc2UiLCJpc0xpdmUiLCJidWZmZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7O0FBNkJBLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFTQyxPQUFULEVBQWtCQyxRQUFsQixFQUE0QkMsa0JBQTVCLEVBQStDO0FBQzVELFFBQUlDLE9BQU8sRUFBWDs7QUFFQUEsU0FBS0MsU0FBTCxHQUFpQixZQUFLO0FBQ2xCLGVBQU8sSUFBUDtBQUNILEtBRkQ7QUFHQUQsU0FBS0UsVUFBTCxHQUFrQixVQUFDQyxJQUFELEVBQVM7O0FBRXZCTixnQkFBUU8sV0FBUixHQUFzQkQsS0FBS0UsUUFBM0I7QUFDQVAsaUJBQVNRLE9BQVQsQ0FBaUJDLHVCQUFqQixFQUErQkosSUFBL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFZSCxLQW5CRDtBQW9CQUgsU0FBS1EsYUFBTCxHQUFxQixVQUFDTCxJQUFELEVBQVM7QUFDMUJMLGlCQUFTUSxPQUFULENBQWlCRyx5QkFBakIsRUFBaUNOLElBQWpDO0FBQ0gsS0FGRDtBQUdBSCxTQUFLVSxZQUFMLEdBQW9CLFVBQUNQLElBQUQsRUFBUztBQUN6QkwsaUJBQVNhLFFBQVQsQ0FBa0JSLEtBQUtTLFFBQXZCO0FBQ0gsS0FGRDtBQUdBWixTQUFLYSxXQUFMLEdBQW1CLFVBQUNWLElBQUQsRUFBUztBQUN4QkwsaUJBQVNRLE9B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LFdBQU85SSxJQUFQO0FBQ0gsQ0FsQ0Q7O3FCQXFDZTZJLEkiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNy4uXG4gKi9cbmltcG9ydCB7XG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsXG4gICAgUFJPVklERVJfSFRNTDUsXG4gICAgUFJPVklERVJfV0VCUlRDLFxuICAgIFBST1ZJREVSX0RBU0gsXG4gICAgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxGbGFzaCwgcHJvdmlkZXIsIHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgbGV0IHRoYXQgPSB7fTtcblxuICAgIHRoYXQuaXNKU1JlYWR5ID0gKCkgPT57XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgdGhhdC50aW1ldXBkYXRlID0gKGRhdGEpID0+e1xuXG4gICAgICAgIGVsRmxhc2guY3VycmVudFRpbWUgPSBkYXRhLnBvc2l0aW9uO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwgZGF0YSk7XG4gICAgICAgIC8vcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwgZGF0YSk7XG4gICAgICAgIC8vZGF0YS5kdXJhdGlvbi0xIDogdGhpcyBpcyB0cmljay4gYmVjYXVzZSBzb21ldGltZXMgcnRtcCdzIHBvc2l0aW9uIDwgZHVyYXRpb24gd2hlbiB2aWRlbyBlbmRlZC5cbiAgICAgICAgLy8yMDE5LTA2LTA3IDogRG8gbm90IHVzZSBkdXJhdGlvbi0xIHRyaWNrIGFueW1vcmUuIEkgaW1wcm92ZWQgU1dGIHBsYXllci5cbiAgICAgICAgLyppZihkYXRhLnBvc2l0aW9uID49IChkYXRhLmR1cmF0aW9uLTEpKXtcbiAgICAgICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0lETEUgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfQ09NUExFVEUpe1xuICAgICAgICAgICAgICAgIGlmKHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvRW5kZWRDYWxsYmFjayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9Ki9cbiAgICB9O1xuICAgIHRoYXQudm9sdW1lQ2hhbmdlZCA9IChkYXRhKSA9PntcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwgZGF0YSk7XG4gICAgfTtcbiAgICB0aGF0LnN0YXRlQ2hhbmdlZCA9IChkYXRhKSA9PntcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoZGF0YS5uZXdzdGF0ZSk7XG4gICAgfTtcbiAgICB0aGF0Lm1ldGFDaGFuZ2VkID0gKGRhdGEpID0+e1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgZGF0YSk7XG4gICAgfTtcbiAgICB0aGF0LmVycm9yID0gKGVycm9yKSA9PntcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuXG4gICAgICAgIC8vUFJJVkFURV9TVEFURV9FUlJPUlxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvcik7XG5cbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyMy4uXG4gKi9cbmltcG9ydCBJbWEgZnJvbSBcImFwaS9hZHMvaW1hL0FkXCI7XG5pbXBvcnQgVmFzdCBmcm9tIFwiYXBpL2Fkcy92YXN0L0FkXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9mbGFzaC9MaXN0ZW5lclwiO1xuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBFUlJPUlMsIElOSVRfUlRNUF9TRVRVUF9FUlJPUixcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLCBTVEFURV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsIFBMQVlFUl9DT01QTEVURSwgUExBWUVSX1BBVVNFLCBQTEFZRVJfUExBWSwgU1RBVEVfQURfUExBWUlORywgU1RBVEVfQURfUEFVU0VELFxuICAgIENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsXG4gICAgQURfQ0xJRU5UX0dPT0dMRUlNQSwgQURfQ0xJRU5UX1ZBU1QsXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIENvcmUgRm9yIEZsYXNoIFZpZGVvLlxuICogQHBhcmFtICAgc3BlYyBtZW1iZXIgdmFsdWVcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xuICogKi9cblxuXG5jb25zdCBQcm92aWRlciA9IGZ1bmN0aW9uKHNwZWMsIHBsYXllckNvbmZpZyl7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG4gICAgbGV0IGVsRmxhc2ggPSBzcGVjLmVsZW1lbnQ7XG4gICAgbGV0IGFkcyA9IG51bGwsIGxpc3RlbmVyID0gbnVsbCwgdmlkZW9FbmRlZENhbGxiYWNrID0gbnVsbDtcblxuICAgIC8vSXQgbWVhbnMgdG8gc3VwcG9ydCBhZCBmb3IgZmxhc2guIFNldCB0aGUgc2FtZSBzcGVjaWZpY2F0aW9ucyBsaWtlIGEgVmlkZW8gVGFnLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbEZsYXNoLCAnY3VycmVudFRpbWUnLFxuICAgICAgICB7dmFsdWUgOjAsIHdyaXRhYmxlIDogdHJ1ZX1cbiAgICApO1xuXG4gICAgaWYoc3BlYy5hZFRhZ1VybCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltQcm92aWRlcl0gQWQgQ2xpZW50IC0gXCIsIHBsYXllckNvbmZpZy5nZXRBZENsaWVudCgpKTtcbiAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldEFkQ2xpZW50KCkgPT09IEFEX0NMSUVOVF9WQVNUKXtcbiAgICAgICAgICAgIGFkcyA9IFZhc3QoZWxGbGFzaCwgdGhhdCwgcGxheWVyQ29uZmlnLCBzcGVjLmFkVGFnVXJsKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBhZHMgPSBJbWEoZWxGbGFzaCwgdGhhdCwgcGxheWVyQ29uZmlnLCBzcGVjLmFkVGFnVXJsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFhZHMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYW4gbm90IGxvYWQgZHVlIHRvIGdvb2dsZSBpbWEgZm9yIEFkcy5cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihlbEZsYXNoLCB0aGF0LCBhZHMgPyBhZHMudmlkZW9FbmRlZENhbGxiYWNrIDogbnVsbCk7XG5cbiAgICBjb25zdCBfbG9hZCA9IChsYXN0UGxheVBvc2l0aW9uKSA9PntcblxuICAgICAgICBjb25zdCBzb3VyY2UgPSAgc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV07XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBsb2FkZWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gZWxGbGFzaC5nZXRDdXJyZW50U291cmNlKCk7XG5cbiAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2UuZmlsZSAhPT0gcHJldmlvdXNTb3VyY2UpO1xuICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xuICAgICAgICAgICAgZWxGbGFzaC5sb2FkKHNvdXJjZS5maWxlKTtcbiAgICAgICAgfWVsc2UgaWYobGFzdFBsYXlQb3NpdGlvbiA9PT0gMCAmJiB0aGF0LmdldFBvc2l0aW9uKCkgPiAwKXtcbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICAvL0ZsYXNoIGhhcyB0d28gaW5pdCBzdGF0ZXMuIEZsYXNoTG9hZGVkIGFuZCBGaWxlTG9hZGVkLlxuICAgIC8vX2xvYWQgY2FsbHMgYWZ0ZXIgRmxhc2hMb2FkZWQuIF9hZnRlckxvYWQgY2FsbHMgYWZ0ZXIgRmlsZUxvYWRlZC5cbiAgICBjb25zdCBfYWZ0ZXJMb2FkID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XG4gICAgICAgIHNwZWMuaXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XG4gICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcblxuICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9UaGlzIGlzIHdoeS4gRmxhc2ggZG9lcyBub3Qgc2VsZiB0cmlnIHRvIGFkcyxsbWFsbSxcbiAgICB0aGF0LnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCA9IChmdW5jTmFtZSwgZnVuY0RhdGEpID0+IHtcbiAgICAgICAgaWYobGlzdGVuZXJbZnVuY05hbWVdKXtcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lcltmdW5jTmFtZV0oZnVuY0RhdGEpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldE5hbWUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XG4gICAgfTtcblxuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XG4gICAgICAgIHNwZWMuY2FuU2VlayA9IGNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XG4gICAgICAgIHJldHVybiBzcGVjLnNlZWtpbmc7XG4gICAgfTtcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcbiAgICAgICAgc3BlYy5zZWVraW5nID0gc2Vla2luZztcbiAgICB9O1xuICAgIHRoYXQuc2V0TWV0YUxvYWRlZCA9ICgpID0+IHtcbiAgICAgICAgc3BlYy5pc0xvYWRlZCA9IHRydWU7XG4gICAgfVxuICAgIHRoYXQubWV0YUxvYWRlZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNMb2FkZWQ7XG4gICAgfVxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHNwZWMuc3RhdGU7XG4gICAgICAgICAgICAvL1RvRG8gOiBUaGlzIGlzIHRlbXBvcmFyeSBjb2RlLiBhdm9pZCBiYWNrZ3JvdW5kIGNvbnRlbnQgZXJyb3IuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BMQVlJTkcgJiYgKG5ld1N0YXRlID09PSBTVEFURV9FUlJPUiB8fCBuZXdTdGF0ZSA9PT0gU1RBVEVfSURMRSkgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogMjAxOS0wNi0xM1xuICAgICAgICAgICAgICogTm8gbW9yZSBuZWNlc3NhcnkgdGhpcyBjb2Rlcy5cbiAgICAgICAgICAgICAqIENoZWNraW5nIHRoZSBhdXRvUGxheSBzdXBwb3J0IHdhcyB1c2luZyBtYWluIHZpZGVvIGVsZW1lbnQuIGVsVmlkZW8ucGxheSgpIC0+IHllcyBvciBubz8/XG4gICAgICAgICAgICAgKiBBbmQgdGhlbiB0aGF0IGNhdXNlcyB0cmlnZ2VyaW5nIHBsYXkgYW5kIHBhdXNlIGV2ZW50LlxuICAgICAgICAgICAgICogQW5kIHRoYXQgY2hlY2tpbmcgd2FpdHMgZm9yIGVsVmlkZW8gbG9hZGVkLiBEYXNoIGxvYWQgY29tcGxldGlvbiB0aW1lIGlzIHVua25vd24uXG4gICAgICAgICAgICAgKiBUaGVuIEkgY2hhbmdlZCBjaGVjayBtZXRob2QuIEkgbWFrZSB0ZW1wb3JhcnkgdmlkZW8gdGFnIGFuZCBpbnNlcnQgZW1wdHkgdmlkZW8uXG4gICAgICAgICAgICAgKiAqL1xuICAgICAgICAgICAgLy9pZiAoKHByZXZTdGF0ZSA9PT0gU1RBVEVfQURfUExBWUlORyB8fCBwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BBVVNFRCApICYmIChuZXdTdGF0ZSA9PT0gU1RBVEVfUEFVU0VEIHx8IG5ld1N0YXRlID09PSBTVEFURV9QTEFZSU5HKSkge1xuICAgICAgICAgICAgLy8gICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgLy9BZHMgY2hlY2tzIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkuIEl0IGNhbGxzIHJlYWwgcGxheSgpIGFuZCBwYXVzZSgpIHRvIHZpZGVvIGVsZW1lbnQuXG4gICAgICAgICAgICAvL0FuZCB0aGVuIHRoYXQgdHJpZ2dlcnMgXCJwbGF5aW5nXCIgYW5kIFwicGF1c2VcIi5cbiAgICAgICAgICAgIC8vSSBwcmV2ZW50IHRoZXNlIHByb2Nlc3MuXG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIHN3aXRjaChuZXdTdGF0ZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QQVVTRURcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQURfUEFVU0VEIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX0FEX1BBVVNFRFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QTEFZSU5HIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfUExBWUlOR1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0FEX1BMQVlJTkcgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9BRF9QTEFZSU5HXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwZWMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcbiAgICAgICAgICAgICAgICBwcmV2c3RhdGUgOiBwcmV2U3RhdGUsXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLnN0YXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XG5cbiAgICB9O1xuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldEJ1ZmZlciA/IGVsRmxhc2guZ2V0QnVmZmVyKCkgOiBudWxsO1xuICAgIH07XG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXREdXJhdGlvbiA/IGVsRmxhc2guZ2V0RHVyYXRpb24oKSA6IDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldFBvc2l0aW9uID8gZWxGbGFzaC5nZXRQb3NpdGlvbigpIDogMDtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLnNldFZvbHVtZSA/IGVsRmxhc2guc2V0Vm9sdW1lKHZvbHVtZSkgOiAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsRmxhc2guc2V0Vm9sdW1lID8gZWxGbGFzaC5nZXRWb2x1bWUoKSA6IDA7XG4gICAgfTtcbiAgICB0aGF0LnNldE11dGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICBlbEZsYXNoLnNldE11dGUoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxGbGFzaCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldE11dGUgPyBlbEZsYXNoLmdldE11dGUoKSA6IGZhbHNlO1xuICAgIH07XG5cbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBwcmVsb2FkKCkgXCIsIHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XG5cbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAvL0ZpcnN0IDogY2hlY2tTd2ZJc1JlYWR5IC0+IEl0IGNoZWNrcyBzd2YgbG9hZGluZyBjb21wbGV0ZSBieSBwb2xsaW5nLlxuICAgICAgICAgICAgLy9TZWNvbmQgOiBjaGVja0ZpbGVMb2FkZWQgLT4gSXQgY2hlY2tzIHNyYyBsb2FkaW5nIGNvbXBsZXRlIGJ5IHBvbGxpbmcgdG9vLlxuICAgICAgICAgICAgLy9XaHkgY29tcGxleCBpcyBpdD8gLT4gSXQgYWdhaW5zdHMgZmxhc2ggdGltaW5nIGlzc3VlLlxuICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrU3dmSXNSZWFkeSgpe1xuICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZsYXNoUmVhZHkgJiYgZWxGbGFzaC5pc0ZsYXNoUmVhZHkoKSl7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbEZsYXNoLCAnZHVyYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAge3ZhbHVlIDplbEZsYXNoLmdldER1cmF0aW9uKCl9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gY2hlY2tGaWxlTG9hZGVkKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZpbGVMb2FkZWQgJiYgZWxGbGFzaC5pc0ZpbGVMb2FkZWQoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2FmdGVyTG9hZChsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNNdXRlKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSAmJiBwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkgPCAxMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFZvbHVtZShwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAzMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRmlsZUxvYWRlZCwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlMuY29kZXNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAxMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja1N3ZklzUmVhZHksIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlMuY29kZXNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXMpID0+e1xuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKDApOyAgIC8vc3BlYy5zb3VyY2VzXy5zdGFydHRpbWUgfHxcbiAgICAgICAgX2FmdGVyTG9hZCgwKTtcbiAgICB9O1xuXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgaWYgKCAoYWRzICYmIGFkcy5pc0FjdGl2ZSgpKSB8fCAoYWRzICYmICFhZHMuc3RhcnRlZCgpKSApIHtcbiAgICAgICAgICAgICAgICBhZHMucGxheSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZWxGbGFzaC5wbGF5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICBlbEZsYXNoLnBhdXNlKCk7XG4gICAgICAgIH1lbHNlIGlmKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORyl7XG4gICAgICAgICAgICBhZHMucGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xuICAgICAgICBlbEZsYXNoLnNlZWsocG9zaXRpb24pO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBzb3VyY2UudHlwZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoc291cmNlSW5kZXgsIG5lZWRQcm92aWRlckNoYW5nZSkgPT4ge1xuICAgICAgICBpZihzcGVjLmN1cnJlbnRRdWFsaXR5ID09PSBzb3VyY2VJbmRleCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZihzb3VyY2VJbmRleCA+IC0xKXtcbiAgICAgICAgICAgIGlmKHNwZWMuc291cmNlcyAmJiBzcGVjLnNvdXJjZXMubGVuZ3RoID4gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBzb3VyY2VJbmRleCk7XG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gc291cmNlSW5kZXg7XG5cbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzb3VyY2VJbmRleFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUluZGV4KHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICAvL3BsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcblxuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gZWxGbGFzaC5nZXRDdXJyZW50VGltZSgpfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tGaWxlTG9hZGVkKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZpbGVMb2FkZWQgJiYgZWxGbGFzaC5pc0ZpbGVMb2FkZWQoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2FmdGVyTG9hZChsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDMwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tGaWxlTG9hZGVkLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGVMb2FkIGZhaWxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbEZsYXNoKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGV2ZWxzO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEZyYW1lcmF0ZSA9IChmcmFtZXJhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlID0gZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT57XG4gICAgICAgIGxldCBmcHMgPSBzcGVjLmZyYW1lcmF0ZTtcbiAgICAgICAgbGV0IGN1cnJlbnRGcmFtZXMgPSBlbEZsYXNoLmdldEN1cnJlbnRUaW1lKCkgKiBmcHM7XG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IChjdXJyZW50RnJhbWVzICsgZnJhbWVDb3VudCkgLyBmcHM7XG4gICAgICAgIG5ld1Bvc2l0aW9uID0gbmV3UG9zaXRpb24gKyAwLjAwMDAxOyAvLyBGSVhFUyBBIFNBRkFSSSBTRUVLIElTU1VFLiBteVZkaWVvLmN1cnJlbnRUaW1lID0gMC4wNCB3b3VsZCBnaXZlIFNNUFRFIDAwOjAwOjAwOjAwIHdoZXJhcyBpdCBzaG91bGQgZ2l2ZSAwMDowMDowMDowMVxuXG4gICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgdGhhdC5zZWVrKG5ld1Bvc2l0aW9uKTtcbiAgICB9O1xuXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xuICAgICAgICBlbEZsYXNoLnN0b3AoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG4gICAgICAgIHRoYXQuc3RvcCgpO1xuXG4gICAgICAgIC8qdHJ5e1xuICAgICAgICAgICAgZWxGbGFzaC5yZW1vdmUoKTtcbiAgICAgICAgfWNhdGNoKGVycm9yKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSovXG5cblxuICAgICAgICBpZihhZHMpe1xuICAgICAgICAgICAgYWRzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Lm9mZigpO1xuICAgIH07XG5cbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cbiAgICAvLyB1c2UgOiBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7IC4uLiBzdXBlcl9kZXN0cm95KCk7XG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxuICovXG5pbXBvcnQge1NUQVRFX0lETEUsIFBST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlclwiO1xuLyoqXG4gKiBAYnJpZWYgICBydG1wIHByb3ZpZGVyXG4gKiBAcGFyYW0gICBlbGVtZW50IHZpZGVvIGVsZW1lbnQuXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxuICogKi9cblxuXG5jb25zdCBSdG1wID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuXG4gICAgbGV0IHNwZWMgPSB7XG4gICAgICAgIG5hbWUgOiBQUk9WSURFUl9SVE1QLFxuICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcbiAgICAgICAgbXNlIDogbnVsbCxcbiAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxuICAgICAgICBpc0xvYWRlZCA6IGZhbHNlLFxuICAgICAgICBjYW5TZWVrIDogZmFsc2UsXG4gICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxuICAgICAgICBzZWVraW5nIDogZmFsc2UsXG4gICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcbiAgICAgICAgYnVmZmVyIDogMCxcbiAgICAgICAgZnJhbWVyYXRlIDogMCxcbiAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcbiAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxuICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXG4gICAgICAgIHNvdXJjZXMgOiBbXSxcbiAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxuICAgIH07XG5cbiAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBudWxsKTtcbiAgICBzdXBlckRlc3Ryb3lfZnVuYyAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJSVE1QIFBST1ZJREVSIExPQURFRC5cIik7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUlRNUCA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBSdG1wOyJdLCJzb3VyY2VSb290IjoiIn0=