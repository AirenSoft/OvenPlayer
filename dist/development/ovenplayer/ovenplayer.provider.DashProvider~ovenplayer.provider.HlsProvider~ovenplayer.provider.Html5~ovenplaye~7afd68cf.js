/*! OvenPlayerv0.9.45 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"],{

/***/ "./src/js/api/provider/html5/Listener.js":
/*!***********************************************!*\
  !*** ./src/js/api/provider/html5/Listener.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

/**
 * @brief   Trigger on various video events.
 * @param   extendedElement extended media object by mse.
 * @param   Provider provider  html5Provider
 * */

var Listener = function Listener(extendedElement, provider, videoEndedCallback) {
    var lowLevelEvents = {};

    OvenPlayerConsole.log("EventListener loaded.", extendedElement, provider);
    var that = {};

    var stalled = -1;
    var elVideo = (0, _utils.extractVideoElement)(extendedElement);
    var between = function between(num, min, max) {
        return Math.max(Math.min(num, max), min);
    };

    lowLevelEvents.canplay = function () {
        //Fires when the browser can start playing the audio/video
        provider.setCanSeek(true);
        provider.trigger(_constants.CONTENT_BUFFER_FULL);
        OvenPlayerConsole.log("EventListener : on canplay");
    };

    lowLevelEvents.durationchange = function () {
        //Fires when the duration of the audio/video is changed
        lowLevelEvents.progress();
        OvenPlayerConsole.log("EventListener : on durationchange");
    };

    lowLevelEvents.ended = function () {
        //Fires when the current playlist is ended
        OvenPlayerConsole.log("EventListener : on ended");

        if (provider.getState() != _constants.STATE_IDLE && provider.getState() != _constants.STATE_COMPLETE) {
            if (videoEndedCallback) {
                videoEndedCallback(function () {
                    provider.setState(_constants.STATE_COMPLETE);
                });
            } else {
                provider.setState(_constants.STATE_COMPLETE);
            }
        }
    };

    lowLevelEvents.loadeddata = function () {
        //Fires when the browser has loaded the current frame of the audio/video
        //Do nothing Because this causes chaos by loadedmetadata.
        /*
        var metadata = {
            duration: elVideo.duration,
            height: elVideo.videoHeight,
            width: elVideo.videoWidth
        };
        provider.trigger(CONTENT_META, metadata);*/
    };

    lowLevelEvents.loadedmetadata = function () {
        //Fires when the browser has loaded meta data for the audio/video
        var isLive = elVideo.duration === Infinity ? true : (0, _utils.separateLive)(extendedElement);
        var sources = provider.getSources();
        var sourceIndex = provider.getCurrentSource();
        var type = sourceIndex > -1 ? sources[sourceIndex].type : "";
        var metadata = {
            duration: isLive ? Infinity : elVideo.duration,
            type: type
        };

        OvenPlayerConsole.log("EventListener : on loadedmetadata", metadata);
        provider.trigger(_constants.CONTENT_META, metadata);
    };

    lowLevelEvents.pause = function () {
        //Fires when the audio/video has been paused
        if (provider.getState() === _constants.STATE_COMPLETE || provider.getState() === _constants.STATE_ERROR) {
            return false;
        }
        if (elVideo.ended) {
            return false;
        }
        if (elVideo.error) {
            return false;
        }
        if (elVideo.currentTime === elVideo.duration) {
            return false;
        }
        OvenPlayerConsole.log("EventListener : on pause");
        provider.setState(_constants.STATE_PAUSED);
    };

    lowLevelEvents.play = function () {
        //Fires when the audio/video has been started or is no longer paused
        stalled = -1;
        if (!elVideo.paused && provider.getState() !== _constants.STATE_PLAYING) {
            provider.setState(_constants.STATE_LOADING);
        }
    };

    lowLevelEvents.playing = function () {
        //Fires when the audio/video is playing after having been paused or stopped for buffering
        OvenPlayerConsole.log("EventListener : on playing");
        if (stalled < 0) {
            provider.setState(_constants.STATE_PLAYING);
        }
    };

    lowLevelEvents.progress = function () {
        //Fires when the browser is downloading the audio/video
        var timeRanges = elVideo.buffered;
        if (!timeRanges) {
            return false;
        }

        var duration = elVideo.duration,
            position = elVideo.currentTime;
        var buffered = between((timeRanges.length > 0 ? timeRanges.end(timeRanges.length - 1) : 0) / duration, 0, 1);

        provider.setBuffer(buffered * 100);
        provider.trigger(_constants.CONTENT_BUFFER, {
            bufferPercent: buffered * 100,
            position: position,
            duration: duration
        });
        OvenPlayerConsole.log("EventListener : on progress", buffered * 100);
    };

    lowLevelEvents.timeupdate = function () {
        //Fires when the current playback position has changed
        var position = elVideo.currentTime;
        var duration = elVideo.duration;
        if (isNaN(duration)) {
            return;
        }

        if (!provider.isSeeking() && !elVideo.paused && (provider.getState() === _constants.STATE_STALLED || provider.getState() === _constants.STATE_LOADING) && stalled !== position) {
            stalled = -1;
            provider.setState(_constants.STATE_PLAYING);
        }

        if (provider.getState() === _constants.STATE_PLAYING || provider.isSeeking()) {
            provider.trigger(_constants.CONTENT_TIME, {
                position: position,
                duration: duration
            });
        }
    };

    lowLevelEvents.seeking = function () {
        provider.setSeeking(true);
        OvenPlayerConsole.log("EventListener : on seeking", elVideo.currentTime);
        provider.trigger(_constants.CONTENT_SEEK, {
            position: elVideo.currentTime
        });
    };
    lowLevelEvents.seeked = function () {
        if (!provider.isSeeking()) {
            return;
        }
        OvenPlayerConsole.log("EventListener : on seeked");
        provider.setSeeking(false);
        provider.trigger(_constants.CONTENT_SEEKED);
    };

    lowLevelEvents.waiting = function () {
        //Fires when the video stops because it needs to buffer the next frame
        OvenPlayerConsole.log("EventListener : on waiting", provider.getState());
        if (provider.isSeeking()) {
            provider.setState(_constants.STATE_LOADING);
        } else if (provider.getState() === _constants.STATE_PLAYING) {
            stalled = elVideo.currentTime;
            provider.setState(_constants.STATE_STALLED);
        }
    };

    lowLevelEvents.volumechange = function () {
        OvenPlayerConsole.log("EventListener : on volumechange", Math.round(elVideo.volume * 100));
        provider.trigger(_constants.CONTENT_VOLUME, {
            volume: Math.round(elVideo.volume * 100),
            mute: elVideo.muted
        });
    };

    lowLevelEvents.error = function () {
        var code = elVideo.error && elVideo.error.code || 0;
        var convertedErroCode = {
            0: _constants.PLAYER_UNKNWON_ERROR,
            1: _constants.PLAYER_UNKNWON_OPERATION_ERROR,
            2: _constants.PLAYER_UNKNWON_NEWWORK_ERROR,
            3: _constants.PLAYER_UNKNWON_DECODE_ERROR,
            4: _constants.PLAYER_FILE_ERROR
        }[code] || 0;

        OvenPlayerConsole.log("EventListener : on error", convertedErroCode);
        (0, _utils.errorTrigger)(_constants.ERRORS[convertedErroCode]);
    };

    Object.keys(lowLevelEvents).forEach(function (eventName) {
        elVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        elVideo.addEventListener(eventName, lowLevelEvents[eventName]);
    });

    that.destroy = function () {
        OvenPlayerConsole.log("EventListener : destroy()");

        Object.keys(lowLevelEvents).forEach(function (eventName) {
            elVideo.removeEventListener(eventName, lowLevelEvents[eventName]);
        });
    };
    return that;
};

exports["default"] = Listener;

/***/ }),

/***/ "./src/js/api/provider/html5/Provider.js":
/*!***********************************************!*\
  !*** ./src/js/api/provider/html5/Provider.js ***!
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

var _Listener = __webpack_require__(/*! api/provider/html5/Listener */ "./src/js/api/provider/html5/Listener.js");

var _Listener2 = _interopRequireDefault(_Listener);

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   Core For Html5 Video.
 * @param   spec member value
 * @param   playerConfig  player config
 * @param   onExtendedLoad on load handler
 * */
var Provider = function Provider(spec, playerConfig, onExtendedLoad) {
    OvenPlayerConsole.log("CORE loaded. ");

    var that = {};
    (0, _EventEmitter2["default"])(that);

    var elVideo = (0, _utils.extractVideoElement)(spec.extendedElement);
    var ads = null,
        listener = null,
        videoEndedCallback = null;
    var posterImage = playerConfig.getConfig().image || "";

    if (spec.adTagUrl) {
        ads = (0, _Ads2["default"])(elVideo, that, playerConfig, spec.adTagUrl);
    }
    listener = (0, _Listener2["default"])(spec.extendedElement, that, ads ? ads.videoEndedCallback : null);
    elVideo.playbackRate = elVideo.defaultPlaybackRate = playerConfig.getPlaybackRate();

    var _load = function _load(lastPlayPosition) {
        var source = spec.sources[spec.currentSource];
        spec.framerate = source.framerate;
        if (!spec.framerate) {
            //init timecode mode
            playerConfig.setTimecodeMode(true);
        }
        if (onExtendedLoad) {
            onExtendedLoad(source, lastPlayPosition);
        } else {
            OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : " + lastPlayPosition);
            var previousSource = elVideo.src;
            var sourceElement = document.createElement('source');

            sourceElement.src = source.file;
            var sourceChanged = sourceElement.src !== previousSource;
            if (sourceChanged) {
                //elVideo.src = spec.sources[spec.currentSource].file;
                elVideo.append(sourceElement);
                // Do not call load if src was not set. load() will cancel any active play promise.
                if (previousSource) {
                    elVideo.load();
                }
            } else if (lastPlayPosition === 0 && elVideo.currentTime > 0) {
                that.seek(lastPlayPosition);
            }

            if (lastPlayPosition > 0) {
                that.seek(lastPlayPosition);
                that.play();
            }
            /*that.trigger(CONTENT_SOURCE_CHANGED, {
                currentSource: spec.currentSource
            });*/

            if (posterImage) {
                //There is no way to verify the posterImage URL. This will be blnak until have a good idea.
                //elVideo.style.background = "transparent url('"+posterImage+"') no-repeat 0 0";
                //elVideo.poster = posterImage;
            }
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
    that.setBuffer = function (newBuffer) {
        spec.buffer = newBuffer;
    };
    that.getBuffer = function () {
        return spec.buffer;
    };
    that.getDuration = function () {
        var isLive = elVideo.duration === Infinity ? true : (0, _utils.separateLive)(spec.extendedElement);
        return isLive ? Infinity : elVideo.duration;
    };
    that.getPosition = function () {
        if (!elVideo) {
            return 0;
        }
        return elVideo.currentTime;
    };
    that.setVolume = function (volume) {
        if (!elVideo) {
            return false;
        }
        elVideo.volume = volume / 100;
    };
    that.getVolume = function () {
        if (!elVideo) {
            return 0;
        }
        return elVideo.volume * 100;
    };
    that.setMute = function (state) {
        if (!elVideo) {
            return false;
        }
        if (typeof state === 'undefined') {

            elVideo.muted = !elVideo.muted;

            that.trigger(_constants.CONTENT_MUTE, {
                mute: elVideo.muted
            });
        } else {

            elVideo.muted = state;

            that.trigger(_constants.CONTENT_MUTE, {
                mute: elVideo.muted
            });
        }
        return elVideo.muted;
    };
    that.getMute = function () {
        if (!elVideo) {
            return false;
        }
        return elVideo.muted;
    };

    that.preload = function (sources, lastPlayPosition) {
        spec.sources = sources;

        spec.currentSource = (0, _utils.pickCurrentSource)(sources, spec.currentSource, playerConfig);
        _load(lastPlayPosition || 0);

        return new Promise(function (resolve, reject) {
            resolve();

            if (playerConfig.isAutoStart()) {
                that.play();
            }
            if (playerConfig.isMute()) {
                that.setMute(true);
            }
            if (playerConfig.getVolume()) {
                that.setVolume(playerConfig.getVolume());
            }
        });
    };
    that.load = function (sources) {
        spec.sources = sources;
        spec.currentSource = (0, _utils.pickCurrentSource)(sources, spec.currentSource, playerConfig);
        _load(spec.sources.starttime || 0);
    };

    that.play = function () {
        if (!elVideo) {
            return false;
        }

        if (that.getState() !== _constants.STATE_PLAYING) {
            if (ads && ads.isActive() || ads && !ads.started()) {
                ads.play();
            } else {
                elVideo.play();
                var promise = elVideo.play();
                if (promise !== undefined) {
                    promise.then(function (_) {
                        // Autoplay started!
                    })["catch"](function (error) {
                        //Can't play because User doesn't any interactions.
                        //Wait for User Interactions. (like click)
                        setTimeout(function () {
                            that.play();
                        }, 1000);
                    });
                }
            }
        }
    };
    that.pause = function () {
        if (!elVideo) {
            return false;
        }

        if (that.getState() === _constants.STATE_PLAYING) {
            elVideo.pause();
        } else if (that.getState() === _constants.STATE_AD_PLAYING) {
            ads.pause();
        }
    };
    that.seek = function (position) {
        if (!elVideo) {
            return false;
        }
        elVideo.currentTime = position;
    };
    that.setPlaybackRate = function (playbackRate) {
        if (!elVideo) {
            return false;
        }
        that.trigger(_constants.PLAYBACK_RATE_CHANGED, { playbackRate: playbackRate });
        return elVideo.playbackRate = elVideo.defaultPlaybackRate = playbackRate;
    };
    that.getPlaybackRate = function () {
        if (!elVideo) {
            return 0;
        }
        return elVideo.playbackRate;
    };

    that.getSources = function () {
        if (!elVideo) {
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
        if (spec.currentSource === sourceIndex) {
            return false;
        }

        if (sourceIndex > -1) {
            if (spec.sources && spec.sources.length > sourceIndex) {
                //that.pause();
                //that.setState(STATE_IDLE);
                OvenPlayerConsole.log("source changed : " + sourceIndex);
                spec.currentSource = sourceIndex;

                that.trigger(_constants.CONTENT_SOURCE_CHANGED, {
                    currentSource: sourceIndex
                });
                playerConfig.setSourceLabel(spec.sources[sourceIndex].label);
                //spec.currentQuality = sourceIndex;
                if (needProviderChange) {
                    _load(elVideo.currentTime || 0);
                }
                that.pause();
                that.setState(_constants.STATE_IDLE);
                return spec.currentSource;
            }
        }
    };

    that.getQualityLevels = function () {
        if (!elVideo) {
            return [];
        }
        return spec.qualityLevels;
    };
    that.getCurrentQuality = function () {
        if (!elVideo) {
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
        var currentFrames = elVideo.currentTime * fps;
        var newPosition = (currentFrames + frameCount) / fps;
        newPosition = newPosition + 0.00001; // FIXES A SAFARI SEEK ISSUE. myVdieo.currentTime = 0.04 would give SMPTE 00:00:00:00 wheras it should give 00:00:00:01

        that.pause();
        that.seek(newPosition);
    };

    that.stop = function () {
        if (!elVideo) {
            return false;
        }
        OvenPlayerConsole.log("CORE : stop() ");
        elVideo.removeAttribute('preload');
        elVideo.removeAttribute('src');
        while (elVideo.firstChild) {
            elVideo.removeChild(elVideo.firstChild);
        }
        that.pause();
        that.setState(_constants.STATE_IDLE);
    };

    that.destroy = function () {
        if (!elVideo) {
            return false;
        }
        that.stop();
        listener.destroy();
        //elVideo.remove();

        if (ads) {
            ads.destroy();
        }
        that.off();
        OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied");
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
    * Created by hoho on 2018. 6. 27..
    */
exports["default"] = Provider;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJleHRlbmRlZEVsZW1lbnQiLCJwcm92aWRlciIsInZpZGVvRW5kZWRDYWxsYmFjayIsImxvd0xldmVsRXZlbnRzIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ0aGF0Iiwic3RhbGxlZCIsImVsVmlkZW8iLCJiZXR3ZWVuIiwibnVtIiwibWluIiwibWF4IiwiTWF0aCIsImNhbnBsYXkiLCJzZXRDYW5TZWVrIiwidHJpZ2dlciIsIkNPTlRFTlRfQlVGRkVSX0ZVTEwiLCJkdXJhdGlvbmNoYW5nZSIsInByb2dyZXNzIiwiZW5kZWQiLCJnZXRTdGF0ZSIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsInNldFN0YXRlIiwibG9hZGVkZGF0YSIsImxvYWRlZG1ldGFkYXRhIiwiaXNMaXZlIiwiZHVyYXRpb24iLCJJbmZpbml0eSIsInNvdXJjZXMiLCJnZXRTb3VyY2VzIiwic291cmNlSW5kZXgiLCJnZXRDdXJyZW50U291cmNlIiwidHlwZSIsIm1ldGFkYXRhIiwiQ09OVEVOVF9NRVRBIiwicGF1c2UiLCJTVEFURV9FUlJPUiIsImVycm9yIiwiY3VycmVudFRpbWUiLCJTVEFURV9QQVVTRUQiLCJwbGF5IiwicGF1c2VkIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0xPQURJTkciLCJwbGF5aW5nIiwidGltZVJhbmdlcyIsImJ1ZmZlcmVkIiwicG9zaXRpb24iLCJsZW5ndGgiLCJlbmQiLCJzZXRCdWZmZXIiLCJDT05URU5UX0JVRkZFUiIsImJ1ZmZlclBlcmNlbnQiLCJ0aW1ldXBkYXRlIiwiaXNOYU4iLCJpc1NlZWtpbmciLCJTVEFURV9TVEFMTEVEIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldmVudE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVzdHJveSIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsIm9uRXh0ZW5kZWRMb2FkIiwiYWRzIiwibGlzdGVuZXIiLCJwb3N0ZXJJbWFnZSIsImdldENvbmZpZyIsImltYWdlIiwiYWRUYWdVcmwiLCJwbGF5YmFja1JhdGUiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwiY3VycmVudFNvdXJjZSIsImZyYW1lcmF0ZSIsInNldFRpbWVjb2RlTW9kZSIsInByZXZpb3VzU291cmNlIiwic3JjIiwic291cmNlRWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImZpbGUiLCJzb3VyY2VDaGFuZ2VkIiwiYXBwZW5kIiwibG9hZCIsInNlZWsiLCJnZXROYW1lIiwibmFtZSIsImNhblNlZWsiLCJuZXdTdGF0ZSIsInN0YXRlIiwicHJldlN0YXRlIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfU1RBVEUiLCJwcmV2c3RhdGUiLCJuZXdzdGF0ZSIsIm5ld0J1ZmZlciIsImJ1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRNdXRlIiwiQ09OVEVOVF9NVVRFIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImlzQXV0b1N0YXJ0IiwiaXNNdXRlIiwic3RhcnR0aW1lIiwiaXNBY3RpdmUiLCJzdGFydGVkIiwicHJvbWlzZSIsInVuZGVmaW5lZCIsInRoZW4iLCJzZXRUaW1lb3V0IiwiU1RBVEVfQURfUExBWUlORyIsInNldFBsYXliYWNrUmF0ZSIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIm1hcCIsImluZGV4IiwibGFiZWwiLCJzZXRDdXJyZW50U291cmNlIiwibmVlZFByb3ZpZGVyQ2hhbmdlIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsInNldFNvdXJjZUxhYmVsIiwiZ2V0UXVhbGl0eUxldmVscyIsInF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsImN1cnJlbnRRdWFsaXR5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRGcmFtZXJhdGUiLCJzZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZnBzIiwiY3VycmVudEZyYW1lcyIsIm5ld1Bvc2l0aW9uIiwic3RvcCIsInJlbW92ZUF0dHJpYnV0ZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsIm9mZiIsIm1ldGhvZCIsImFwcGx5IiwiYXJndW1lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQTRCQTs7QUFFQTs7Ozs7O0FBT0EsSUFBTUEsV0FBVyxTQUFYQSxRQUFXLENBQVNDLGVBQVQsRUFBMEJDLFFBQTFCLEVBQW9DQyxrQkFBcEMsRUFBdUQ7QUFDcEUsUUFBTUMsaUJBQWlCLEVBQXZCOztBQUVBQyxzQkFBa0JDLEdBQWxCLENB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O0FBQ0gsS0FaRDs7QUFjQWhCLFNBQUtnRixPQUFMLEdBQWUsWUFBSztBQUNoQixZQUFHLENBQUM5RSxPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7QUFDREYsYUFBSzJLLElBQUw7QUFDQXJGLGlCQUFTTixPQUFUO0FBQ0E7O0FBRUEsWUFBR0ssR0FBSCxFQUFPO0FBQ0hBLGdCQUFJTCxPQUFKO0FBQ0g7QUFDRGhGLGFBQUsrSyxHQUFMO0FBQ0FqTCwwQkFBa0JDLEdBQWxCLENBQXNCLHlEQUF0QjtBQUNILEtBYkQ7O0FBZUE7QUFDQTtBQUNBQyxvQkFBYSxVQUFDK0csSUFBRCxFQUFVO0FBQ25CLFlBQU1pRSxTQUFTaEwsS0FBSytHLElBQUwsQ0FBZjtBQUNBLGVBQU8sWUFBVTtBQUNiLG1CQUFPaUUsT0FBT0MsS0FBUCxDQUFhakwsSUFBYixFQUFtQmtMLFNBQW5CLENBQVA7QUFDSCxTQUZEO0FBR0gsS0FMRDtBQU1BLFdBQU9sTCxJQUFQO0FBRUgsQ0FwWEQsQyxDQXBCQTs7O3FCQTBZZWlGLFEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRVJST1JTLFxuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUFJPVklERVJfSFRNTDUsXG4gICAgUFJPVklERVJfV0VCUlRDLFxuICAgIFBST1ZJREVSX0RBU0gsXG4gICAgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIHNlcGFyYXRlTGl2ZSwgZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVHJpZ2dlciBvbiB2YXJpb3VzIHZpZGVvIGV2ZW50cy5cbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLlxuICogQHBhcmFtICAgUHJvdmlkZXIgcHJvdmlkZXIgIGh0bWw1UHJvdmlkZXJcbiAqICovXG5cblxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihleHRlbmRlZEVsZW1lbnQsIHByb3ZpZGVyLCB2aWRlb0VuZGVkQ2FsbGJhY2spe1xuICAgIGNvbnN0IGxvd0xldmVsRXZlbnRzID0ge307XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIGxvYWRlZC5cIixleHRlbmRlZEVsZW1lbnQgLHByb3ZpZGVyICk7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuXG4gICAgbGV0IHN0YWxsZWQgPSAtMTtcbiAgICBsZXQgZWxWaWRlbyA9IGV4dHJhY3RWaWRlb0VsZW1lbnQoZXh0ZW5kZWRFbGVtZW50KTtcbiAgICBjb25zdCBiZXR3ZWVuID0gZnVuY3Rpb24gKG51bSwgbWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKG51bSwgbWF4KSwgbWluKTtcbiAgICB9XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5jYW5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIHByb3ZpZGVyLnNldENhblNlZWsodHJ1ZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVJfRlVMTCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBjYW5wbGF5XCIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5kdXJhdGlvbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBkdXJhdGlvbiBvZiB0aGUgYXVkaW8vdmlkZW8gaXMgY2hhbmdlZFxuICAgICAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcygpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZHVyYXRpb25jaGFuZ2VcIik7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWxpc3QgaXMgZW5kZWRcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVuZGVkXCIpO1xuXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9IFNUQVRFX0NPTVBMRVRFKXtcbiAgICAgICAgICAgIGlmKHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgdmlkZW9FbmRlZENhbGxiYWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZSBvZiB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgLy9EbyBub3RoaW5nIEJlY2F1c2UgdGhpcyBjYXVzZXMgY2hhb3MgYnkgbG9hZGVkbWV0YWRhdGEuXG4gICAgICAgIC8qXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IGVsVmlkZW8udmlkZW9XaWR0aFxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCBtZXRhIGRhdGEgZm9yIHRoZSBhdWRpby92aWRlb1xuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT09IEluZmluaXR5KSA/IHRydWUgOiBzZXBhcmF0ZUxpdmUoZXh0ZW5kZWRFbGVtZW50KTtcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwcm92aWRlci5nZXRTb3VyY2VzKCk7XG4gICAgICAgIGxldCBzb3VyY2VJbmRleCA9IHByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICAgICAgbGV0IHR5cGUgPSBzb3VyY2VJbmRleCA+IC0xID8gc291cmNlc1tzb3VyY2VJbmRleF0udHlwZSA6IFwiXCI7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgdHlwZSA6dHlwZVxuICAgICAgICB9O1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRtZXRhZGF0YVwiLCBtZXRhZGF0YSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHBhdXNlZFxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9DT01QTEVURSB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9FUlJPUil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lbmRlZCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lcnJvcil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5jdXJyZW50VGltZSA9PT0gZWxWaWRlby5kdXJhdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBhdXNlXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHN0YXJ0ZWQgb3IgaXMgbm8gbG9uZ2VyIHBhdXNlZFxuICAgICAgICBzdGFsbGVkID0gLTE7XG4gICAgICAgIGlmICghZWxWaWRlby5wYXVzZWQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucGxheWluZyA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBpcyBwbGF5aW5nIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZCBvciBzdG9wcGVkIGZvciBidWZmZXJpbmdcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBsYXlpbmdcIik7XG4gICAgICAgIGlmKHN0YWxsZWQgPCAwKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcbiAgICAgICAgaWYoIXRpbWVSYW5nZXMgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb24sIHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcblxuICAgICAgICBwcm92aWRlci5zZXRCdWZmZXIoYnVmZmVyZWQqMTAwKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwge1xuICAgICAgICAgICAgYnVmZmVyUGVyY2VudDogYnVmZmVyZWQqMTAwLFxuICAgICAgICAgICAgcG9zaXRpb246ICBwb3NpdGlvbixcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICB9KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHByb2dyZXNzXCIsIGJ1ZmZlcmVkKjEwMCk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGhhcyBjaGFuZ2VkXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uO1xuICAgICAgICBpZiAoaXNOYU4oZHVyYXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkgJiYgIWVsVmlkZW8ucGF1c2VkICYmIChwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9TVEFMTEVEIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0xPQURJTkcpICYmXG4gICAgICAgICAgICBzdGFsbGVkICE9PSBwb3NpdGlvbil7XG4gICAgICAgICAgICBzdGFsbGVkID0gLTE7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HIHx8IHByb3ZpZGVyLmlzU2Vla2luZygpKSB7XG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2luZyA9ICgpID0+IHtcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyh0cnVlKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtpbmdcIiwgZWxWaWRlby5jdXJyZW50VGltZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLLHtcbiAgICAgICAgICAgIHBvc2l0aW9uIDogZWxWaWRlby5jdXJyZW50VGltZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtlZCA9ICgpID0+IHtcbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2VkXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKGZhbHNlKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUtFRCk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHMud2FpdGluZyA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSB2aWRlbyBzdG9wcyBiZWNhdXNlIGl0IG5lZWRzIHRvIGJ1ZmZlciB0aGUgbmV4dCBmcmFtZVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gd2FpdGluZ1wiLCBwcm92aWRlci5nZXRTdGF0ZSgpKTtcbiAgICAgICAgaWYocHJvdmlkZXIuaXNTZWVraW5nKCkpe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgIH1lbHNlIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgc3RhbGxlZCA9IGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9TVEFMTEVEKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy52b2x1bWVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB2b2x1bWVjaGFuZ2VcIiwgTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCkpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVk9MVU1FLCB7XG4gICAgICAgICAgICB2b2x1bWU6IE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApLFxuICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxWaWRlby5lcnJvciAmJiBlbFZpZGVvLmVycm9yLmNvZGUpIHx8IDA7XG4gICAgICAgIGxldCBjb252ZXJ0ZWRFcnJvQ29kZSA9ICh7XG4gICAgICAgICAgICAwOiBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICAgICAgICAgIDE6IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICAgICAgICAgIDI6IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgICAgICAgICAzOiBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgICAgICAgICA0OiBQTEFZRVJfRklMRV9FUlJPUlxuICAgICAgICB9W2NvZGVdfHwwKTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZXJyb3JcIiwgY29udmVydGVkRXJyb0NvZGUpO1xuICAgICAgICBlcnJvclRyaWdnZXIoRVJST1JTW2NvbnZlcnRlZEVycm9Db2RlXSk7XG4gICAgfTtcblxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICBlbFZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICB9KTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI3Li5cbiAqL1xuaW1wb3J0IEFkcyBmcm9tIFwiYXBpL3Byb3ZpZGVyL2Fkcy9BZHNcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcbmltcG9ydCBFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyXCI7XG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIHNlcGFyYXRlTGl2ZSwgcGlja0N1cnJlbnRTb3VyY2V9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgU1RBVEVfSURMRSwgU1RBVEVfUExBWUlORywgU1RBVEVfUEFVU0VELCBTVEFURV9DT01QTEVURSxcbiAgICBQTEFZRVJfU1RBVEUsIFBMQVlFUl9DT01QTEVURSwgUExBWUVSX1BBVVNFLCBQTEFZRVJfUExBWSwgU1RBVEVfQURfUExBWUlORyxcbiAgICBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCxcbiAgICBQTEFZQkFDS19SQVRFX0NIQU5HRUQsIENPTlRFTlRfTVVURSwgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgQ29yZSBGb3IgSHRtbDUgVmlkZW8uXG4gKiBAcGFyYW0gICBzcGVjIG1lbWJlciB2YWx1ZVxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICBwbGF5ZXIgY29uZmlnXG4gKiBAcGFyYW0gICBvbkV4dGVuZGVkTG9hZCBvbiBsb2FkIGhhbmRsZXJcbiAqICovXG5jb25zdCBQcm92aWRlciA9IGZ1bmN0aW9uIChzcGVjLCBwbGF5ZXJDb25maWcsIG9uRXh0ZW5kZWRMb2FkKXtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIGxvYWRlZC4gXCIpO1xuXG4gICAgbGV0IHRoYXQgPXt9O1xuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcblxuICAgIGxldCBlbFZpZGVvID0gZXh0cmFjdFZpZGVvRWxlbWVudChzcGVjLmV4dGVuZGVkRWxlbWVudCk7XG4gICAgbGV0IGFkcyA9IG51bGwsIGxpc3RlbmVyID0gbnVsbCwgdmlkZW9FbmRlZENhbGxiYWNrID0gbnVsbDtcbiAgICBsZXQgcG9zdGVySW1hZ2UgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuaW1hZ2V8fFwiXCI7XG5cbiAgICBpZihzcGVjLmFkVGFnVXJsKXtcbiAgICAgICAgYWRzID0gQWRzKGVsVmlkZW8sIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XG4gICAgfVxuICAgIGxpc3RlbmVyID0gRXZlbnRzTGlzdGVuZXIoc3BlYy5leHRlbmRlZEVsZW1lbnQsIHRoYXQsIGFkcyA/IGFkcy52aWRlb0VuZGVkQ2FsbGJhY2sgOiBudWxsKTtcbiAgICBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXllckNvbmZpZy5nZXRQbGF5YmFja1JhdGUoKTtcblxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAgc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV07XG4gICAgICAgIHNwZWMuZnJhbWVyYXRlID0gc291cmNlLmZyYW1lcmF0ZTtcbiAgICAgICAgaWYoIXNwZWMuZnJhbWVyYXRlKXtcbiAgICAgICAgICAgIC8vaW5pdCB0aW1lY29kZSBtb2RlXG4gICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9uRXh0ZW5kZWRMb2FkKXtcbiAgICAgICAgICAgIG9uRXh0ZW5kZWRMb2FkKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1NvdXJjZSA9IGVsVmlkZW8uc3JjO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xuXG4gICAgICAgICAgICBzb3VyY2VFbGVtZW50LnNyYyA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2VFbGVtZW50LnNyYyAhPT0gcHJldmlvdXNTb3VyY2UpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAvL2VsVmlkZW8uc3JjID0gc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV0uZmlsZTtcbiAgICAgICAgICAgICAgICBlbFZpZGVvLmFwcGVuZChzb3VyY2VFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgY2FsbCBsb2FkIGlmIHNyYyB3YXMgbm90IHNldC4gbG9hZCgpIHdpbGwgY2FuY2VsIGFueSBhY3RpdmUgcGxheSBwcm9taXNlLlxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSBpZihsYXN0UGxheVBvc2l0aW9uID09PSAwICYmIGVsVmlkZW8uY3VycmVudFRpbWUgPiAwKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzcGVjLmN1cnJlbnRTb3VyY2VcbiAgICAgICAgICAgIH0pOyovXG5cbiAgICAgICAgICAgIGlmKHBvc3RlckltYWdlKXtcbiAgICAgICAgICAgICAgICAvL1RoZXJlIGlzIG5vIHdheSB0byB2ZXJpZnkgdGhlIHBvc3RlckltYWdlIFVSTC4gVGhpcyB3aWxsIGJlIGJsbmFrIHVudGlsIGhhdmUgYSBnb29kIGlkZWEuXG4gICAgICAgICAgICAgICAgLy9lbFZpZGVvLnN0eWxlLmJhY2tncm91bmQgPSBcInRyYW5zcGFyZW50IHVybCgnXCIrcG9zdGVySW1hZ2UrXCInKSBuby1yZXBlYXQgMCAwXCI7XG4gICAgICAgICAgICAgICAgLy9lbFZpZGVvLnBvc3RlciA9IHBvc3RlckltYWdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LmdldE5hbWUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XG4gICAgfTtcbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LnNldENhblNlZWsgPSAoY2FuU2VlaykgPT4ge1xuICAgICAgICBzcGVjLmNhblNlZWsgPSBjYW5TZWVrO1xuICAgIH07XG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e1xuICAgICAgICByZXR1cm4gc3BlYy5zZWVraW5nO1xuICAgIH07XG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmcpPT57XG4gICAgICAgIHNwZWMuc2Vla2luZyA9IHNlZWtpbmc7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHNwZWMuc3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2gobmV3U3RhdGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQ09NUExFVEUgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwZWMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcbiAgICAgICAgICAgICAgICBwcmV2c3RhdGUgOiBwcmV2U3RhdGUsXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLnN0YXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XG4gICAgICAgIHNwZWMuYnVmZmVyID0gbmV3QnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmJ1ZmZlcjtcbiAgICB9O1xuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGxldCBpc0xpdmUgPSAoZWxWaWRlby5kdXJhdGlvbiA9PT0gSW5maW5pdHkpID8gdHJ1ZSA6IHNlcGFyYXRlTGl2ZShzcGVjLmV4dGVuZGVkRWxlbWVudCk7XG4gICAgICAgIHJldHVybiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uO1xuICAgIH07XG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgfTtcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby52b2x1bWUgPSB2b2x1bWUvMTAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8udm9sdW1lKjEwMDtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gIWVsVmlkZW8ubXV0ZWQ7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gc3RhdGU7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcblxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcblxuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzTXV0ZSgpKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpe1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcbiAgICAgICAgX2xvYWQoc3BlYy5zb3VyY2VzLnN0YXJ0dGltZSB8fCAwKTtcbiAgICB9O1xuXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBpZiAoIChhZHMgJiYgYWRzLmlzQWN0aXZlKCkpIHx8IChhZHMgJiYgIWFkcy5zdGFydGVkKCkpKSB7XG4gICAgICAgICAgICAgICAgYWRzLnBsYXkoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGVsVmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gZWxWaWRlby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgaWYgKHByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBdXRvcGxheSBzdGFydGVkIVxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0Nhbid0IHBsYXkgYmVjYXVzZSBVc2VyIGRvZXNuJ3QgYW55IGludGVyYWN0aW9ucy5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vV2FpdCBmb3IgVXNlciBJbnRlcmFjdGlvbnMuIChsaWtlIGNsaWNrKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG4gICAgICAgIH1lbHNlIGlmKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORyl7XG4gICAgICAgICAgICBhZHMucGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsVmlkZW8uY3VycmVudFRpbWUgPSBwb3NpdGlvbjtcbiAgICB9O1xuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUJBQ0tfUkFURV9DSEFOR0VELCB7cGxheWJhY2tSYXRlIDogcGxheWJhY2tSYXRlfSk7XG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXG4gICAgICAgICAgICAgICAgaW5kZXggOiBpbmRleFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChzb3VyY2VJbmRleCwgbmVlZFByb3ZpZGVyQ2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZihzcGVjLmN1cnJlbnRTb3VyY2UgPT09IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNvdXJjZUluZGV4ID4gLTEpe1xuICAgICAgICAgICAgaWYoc3BlYy5zb3VyY2VzICYmIHNwZWMuc291cmNlcy5sZW5ndGggPiBzb3VyY2VJbmRleCl7XG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgLy90aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBzb3VyY2VJbmRleCk7XG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gc291cmNlSW5kZXg7XG5cbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzb3VyY2VJbmRleFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAvL3NwZWMuY3VycmVudFF1YWxpdHkgPSBzb3VyY2VJbmRleDtcbiAgICAgICAgICAgICAgICBpZihuZWVkUHJvdmlkZXJDaGFuZ2Upe1xuICAgICAgICAgICAgICAgICAgICBfbG9hZChlbFZpZGVvLmN1cnJlbnRUaW1lIHx8IDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMucXVhbGl0eUxldmVscztcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcblxuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEZyYW1lcmF0ZSA9IChmcmFtZXJhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlID0gZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT57XG4gICAgICAgIGxldCBmcHMgPSBzcGVjLmZyYW1lcmF0ZTtcbiAgICAgICAgbGV0IGN1cnJlbnRGcmFtZXMgPSBlbFZpZGVvLmN1cnJlbnRUaW1lICogZnBzO1xuICAgICAgICBsZXQgbmV3UG9zaXRpb24gPSAoY3VycmVudEZyYW1lcyArIGZyYW1lQ291bnQpIC8gZnBzO1xuICAgICAgICBuZXdQb3NpdGlvbiA9IG5ld1Bvc2l0aW9uICsgMC4wMDAwMTsgLy8gRklYRVMgQSBTQUZBUkkgU0VFSyBJU1NVRS4gbXlWZGllby5jdXJyZW50VGltZSA9IDAuMDQgd291bGQgZ2l2ZSBTTVBURSAwMDowMDowMDowMCB3aGVyYXMgaXQgc2hvdWxkIGdpdmUgMDA6MDA6MDA6MDFcblxuICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgIHRoYXQuc2VlayhuZXdQb3NpdGlvbik7XG4gICAgfTtcblxuICAgIHRoYXQuc3RvcCA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdwcmVsb2FkJyk7XG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgd2hpbGUgKGVsVmlkZW8uZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVDaGlsZChlbFZpZGVvLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnN0b3AoKTtcbiAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xuICAgICAgICAvL2VsVmlkZW8ucmVtb3ZlKCk7XG5cbiAgICAgICAgaWYoYWRzKXtcbiAgICAgICAgICAgIGFkcy5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5vZmYoKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGRlc3Ryb3koKSBwbGF5ZXIgc3RvcCwgbGlzdGVuZXIsIGV2ZW50IGRlc3Ryb2llZFwiKTtcbiAgICB9O1xuXG4gICAgLy9YWFggOiBJIGhvcGUgdXNpbmcgZXM2IGNsYXNzZXMuIGJ1dCBJIHRoaW5rIHRvIG9jY3VyIHByb2JsZW0gZnJvbSBPbGQgSUUuIFRoZW4gSSBjaG9pY2UgZnVuY3Rpb24gaW5oZXJpdC4gRmluYWxseSB1c2luZyBzdXBlciBmdW5jdGlvbiBpcyBzbyBkaWZmaWN1bHQuXG4gICAgLy8gdXNlIDogbGV0IHN1cGVyX2Rlc3Ryb3kgID0gdGhhdC5zdXBlcignZGVzdHJveScpOyAuLi4gc3VwZXJfZGVzdHJveSgpO1xuICAgIHRoYXQuc3VwZXIgPSAobmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGF0W25hbWVdO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQcm92aWRlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=