/*! OvenPlayerv0.9.47 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
    var compareStalledTime = function compareStalledTime(stalled, position) {
        //Original Code is stalled !== position
        //Because Dashjs is very meticulous. Then always diffrence stalled and position.
        //That is why when I use toFixed(2).
        return stalled.toFixed(2) === position.toFixed(2);
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
        if (!provider.isSeeking() && !elVideo.paused && (provider.getState() === _constants.STATE_STALLED || provider.getState() === _constants.STATE_LOADING) && !compareStalledTime(stalled, position)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJleHRlbmRlZEVsZW1lbnQiLCJwcm92aWRlciIsInZpZGVvRW5kZWRDYWxsYmFjayIsImxvd0xldmVsRXZlbnRzIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ0aGF0Iiwic3RhbGxlZCIsImVsVmlkZW8iLCJiZXR3ZWVuIiwibnVtIiwibWluIiwibWF4IiwiTWF0aCIsImNvbXBhcmVTdGFsbGVkVGltZSIsInBvc2l0aW9uIiwidG9GaXhlZCIsImNhbnBsYXkiLCJzZXRDYW5TZWVrIiwidHJpZ2dlciIsIkNPTlRFTlRfQlVGRkVSX0ZVTEwiLCJkdXJhdGlvbmNoYW5nZSIsInByb2dyZXNzIiwiZW5kZWQiLCJnZXRTdGF0ZSIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsInNldFN0YXRlIiwibG9hZGVkZGF0YSIsImxvYWRlZG1ldGFkYXRhIiwiaXNMaXZlIiwiZHVyYXRpb24iLCJJbmZpbml0eSIsInNvdXJjZXMiLCJnZXRTb3VyY2VzIiwic291cmNlSW5kZXgiLCJnZXRDdXJyZW50U291cmNlIiwidHlwZSIsIm1ldGFkYXRhIiwiQ09OVEVOVF9NRVRBIiwicGF1c2UiLCJTVEFURV9FUlJPUiIsImVycm9yIiwiY3VycmVudFRpbWUiLCJTVEFURV9QQVVTRUQiLCJwbGF5IiwicGF1c2VkIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0xPQURJTkciLCJwbGF5aW5nIiwidGltZVJhbmdlcyIsImJ1ZmZlcmVkIiwibGVuZ3RoIiwiZW5kIiwic2V0QnVmZmVyIiwiQ09OVEVOVF9CVUZGRVIiLCJidWZmZXJQZXJjZW50IiwidGltZXVwZGF0ZSIsImlzTmFOIiwiaXNTZWVraW5nIiwiU1RBVEVfU1RBTExFRCIsIkNPTlRFTlRfVElNRSIsInNlZWtpbmciLCJzZXRTZWVraW5nIiwiQ09OVEVOVF9TRUVLIiwic2Vla2VkIiwiQ09OVEVOVF9TRUVLRUQiLCJ3YWl0aW5nIiwidm9sdW1lY2hhbmdlIiwicm91bmQiLCJ2b2x1bWUiLCJDT05URU5UX1ZPTFVNRSIsIm11dGUiLCJtdXRlZCIsImNvZGUiLCJjb252ZXJ0ZWRFcnJvQ29kZSIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiRVJST1JTIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZlbnROYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRlc3Ryb3kiLCJQcm92aWRlciIsInNwZWMiLCJwbGF5ZXJDb25maWciLCJvbkV4dGVuZGVkTG9hZCIsImFkcyIsImxpc3RlbmVyIiwicG9zdGVySW1hZ2UiLCJnZXRDb25maWciLCJpbWFnZSIsImFkVGFnVXJsIiwicGxheWJhY2tSYXRlIiwiZGVmYXVsdFBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsImN1cnJlbnRTb3VyY2UiLCJmcmFtZXJhdGUiLCJzZXRUaW1lY29kZU1vZGUiLCJwcmV2aW91c1NvdXJjZSIsInNyYyIsInNvdXJjZUVsZW1lbnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJmaWxlIiwic291cmNlQ2hhbmdlZCIsImFwcGVuZCIsImxvYWQiLCJzZWVrIiwiZ2V0TmFtZSIsIm5hbWUiLCJjYW5TZWVrIiwibmV3U3RhdGUiLCJzdGF0ZSIsInByZXZTdGF0ZSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwibmV3c3RhdGUiLCJuZXdCdWZmZXIiLCJidWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsImdldFBvc2l0aW9uIiwic2V0Vm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0TXV0ZSIsIkNPTlRFTlRfTVVURSIsImdldE11dGUiLCJwcmVsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpc0F1dG9TdGFydCIsImlzTXV0ZSIsInN0YXJ0dGltZSIsImlzQWN0aXZlIiwic3RhcnRlZCIsInByb21pc2UiLCJ1bmRlZmluZWQiLCJ0aGVuIiwic2V0VGltZW91dCIsIlNUQVRFX0FEX1BMQVlJTkciLCJzZXRQbGF5YmFja1JhdGUiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJtYXAiLCJpbmRleCIsImxhYmVsIiwic2V0Q3VycmVudFNvdXJjZSIsIm5lZWRQcm92aWRlckNoYW5nZSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJzZXRTb3VyY2VMYWJlbCIsImdldFF1YWxpdHlMZXZlbHMiLCJxdWFsaXR5TGV2ZWxzIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJjdXJyZW50UXVhbGl0eSIsInNldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0RnJhbWVyYXRlIiwic2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImZwcyIsImN1cnJlbnRGcmFtZXMiLCJuZXdQb3NpdGlvbiIsInN0b3AiLCJyZW1vdmVBdHRyaWJ1dGUiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJvZmYiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUE0QkE7O0FBRUE7Ozs7OztBQU9BLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFTQyxlQUFULEVBQTBCQyxRQUExQixFQUFvQ0Msa0JBQXBDLEVBQXVEO0FBQ3BFLFFBQU1DLGlCQUFp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UDtBQUNIO0FBQ0RKLDBCQUFrQkMsR0FBbEIsQ0FBc0IsZ0JBQXRCO0FBQ0FHLGdCQUFRNEssZUFBUixDQUF3QixTQUF4QjtBQUNBNUssZ0JBQVE0SyxlQUFSLENBQXdCLEtBQXhCO0FBQ0EsZUFBTzVLLFFBQVE2SyxVQUFmLEVBQTJCO0FBQ3ZCN0ssb0JBQVE4SyxXQUFSLENBQW9COUssUUFBUTZLLFVBQTVCO0FBQ0g7QUFDRC9LLGFBQUtrQyxLQUFMO0FBQ0FsQyxhQUFLcUIsUUFBTCxDQUFjRixxQkFBZDtBQUNILEtBWkQ7O0FBY0FuQixTQUFLa0YsT0FBTCxHQUFlLFlBQUs7QUFDaEIsWUFBRyxDQUFDaEYsT0FBSixFQUFZO0FBQ1IsbUJBQU8sS0FBUDtBQUNIO0FBQ0RGLGFBQUs2SyxJQUFMO0FBQ0FyRixpQkFBU04sT0FBVDtBQUNBOztBQUVBLFlBQUdLLEdBQUgsRUFBTztBQUNIQSxnQkFBSUwsT0FBSjtBQUNIO0FBQ0RsRixhQUFLaUwsR0FBTDtBQUNBbkwsMEJBQWtCQyxHQUFsQixDQUFzQix5REFBdEI7QUFDSCxLQWJEOztBQWVBO0FBQ0E7QUFDQUMsb0JBQWEsVUFBQ2lILElBQUQsRUFBVTtBQUNuQixZQUFNaUUsU0FBU2xMLEtBQUtpSCxJQUFMLENBQWY7QUFDQSxlQUFPLFlBQVU7QUFDYixtQkFBT2lFLE9BQU9DLEtBQVAsQ0FBYW5MLElBQWIsRUFBbUJvTCxTQUFuQixDQUFQO0FBQ0gsU0FGRDtBQUdILEtBTEQ7QUFNQSxXQUFPcEwsSUFBUDtBQUVILENBcFhELEMsQ0FwQkE7OztxQkEwWWVtRixRIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2YuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEVSUk9SUyxcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBzZXBhcmF0ZUxpdmUsIGVycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuXG4vKipcbiAqIEBicmllZiAgIFRyaWdnZXIgb24gdmFyaW91cyB2aWRlbyBldmVudHMuXG4gKiBAcGFyYW0gICBleHRlbmRlZEVsZW1lbnQgZXh0ZW5kZWQgbWVkaWEgb2JqZWN0IGJ5IG1zZS5cbiAqIEBwYXJhbSAgIFByb3ZpZGVyIHByb3ZpZGVyICBodG1sNVByb3ZpZGVyXG4gKiAqL1xuXG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZXh0ZW5kZWRFbGVtZW50LCBwcm92aWRlciwgdmlkZW9FbmRlZENhbGxiYWNrKXtcbiAgICBjb25zdCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciBsb2FkZWQuXCIsZXh0ZW5kZWRFbGVtZW50ICxwcm92aWRlciApO1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcblxuICAgIGxldCBzdGFsbGVkID0gLTE7XG4gICAgbGV0IGVsVmlkZW8gPSBleHRyYWN0VmlkZW9FbGVtZW50KGV4dGVuZGVkRWxlbWVudCk7XG4gICAgY29uc3QgYmV0d2VlbiA9IGZ1bmN0aW9uIChudW0sIG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihudW0sIG1heCksIG1pbik7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBhcmVTdGFsbGVkVGltZSA9IGZ1bmN0aW9uKHN0YWxsZWQsIHBvc2l0aW9uKXtcbiAgICAgICAgLy9PcmlnaW5hbCBDb2RlIGlzIHN0YWxsZWQgIT09IHBvc2l0aW9uXG4gICAgICAgIC8vQmVjYXVzZSBEYXNoanMgaXMgdmVyeSBtZXRpY3Vsb3VzLiBUaGVuIGFsd2F5cyBkaWZmcmVuY2Ugc3RhbGxlZCBhbmQgcG9zaXRpb24uXG4gICAgICAgIC8vVGhhdCBpcyB3aHkgd2hlbiBJIHVzZSB0b0ZpeGVkKDIpLlxuICAgICAgICByZXR1cm4gc3RhbGxlZC50b0ZpeGVkKDIpID09PSBwb3NpdGlvbi50b0ZpeGVkKDIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5jYW5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIHByb3ZpZGVyLnNldENhblNlZWsodHJ1ZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVJfRlVMTCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBjYW5wbGF5XCIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5kdXJhdGlvbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBkdXJhdGlvbiBvZiB0aGUgYXVkaW8vdmlkZW8gaXMgY2hhbmdlZFxuICAgICAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcygpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZHVyYXRpb25jaGFuZ2VcIik7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWxpc3QgaXMgZW5kZWRcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVuZGVkXCIpO1xuXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9IFNUQVRFX0NPTVBMRVRFKXtcbiAgICAgICAgICAgIGlmKHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgdmlkZW9FbmRlZENhbGxiYWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZSBvZiB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgLy9EbyBub3RoaW5nIEJlY2F1c2UgdGhpcyBjYXVzZXMgY2hhb3MgYnkgbG9hZGVkbWV0YWRhdGEuXG4gICAgICAgIC8qXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IGVsVmlkZW8udmlkZW9XaWR0aFxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCBtZXRhIGRhdGEgZm9yIHRoZSBhdWRpby92aWRlb1xuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT09IEluZmluaXR5KSA/IHRydWUgOiBzZXBhcmF0ZUxpdmUoZXh0ZW5kZWRFbGVtZW50KTtcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwcm92aWRlci5nZXRTb3VyY2VzKCk7XG4gICAgICAgIGxldCBzb3VyY2VJbmRleCA9IHByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICAgICAgbGV0IHR5cGUgPSBzb3VyY2VJbmRleCA+IC0xID8gc291cmNlc1tzb3VyY2VJbmRleF0udHlwZSA6IFwiXCI7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgdHlwZSA6dHlwZVxuICAgICAgICB9O1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRtZXRhZGF0YVwiLCBtZXRhZGF0YSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHBhdXNlZFxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9DT01QTEVURSB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9FUlJPUil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lbmRlZCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lcnJvcil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5jdXJyZW50VGltZSA9PT0gZWxWaWRlby5kdXJhdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBhdXNlXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHN0YXJ0ZWQgb3IgaXMgbm8gbG9uZ2VyIHBhdXNlZFxuICAgICAgICBzdGFsbGVkID0gLTE7XG4gICAgICAgIGlmICghZWxWaWRlby5wYXVzZWQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucGxheWluZyA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBpcyBwbGF5aW5nIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZCBvciBzdG9wcGVkIGZvciBidWZmZXJpbmdcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBsYXlpbmdcIik7XG4gICAgICAgIGlmKHN0YWxsZWQgPCAwKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcbiAgICAgICAgaWYoIXRpbWVSYW5nZXMgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb24sIHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcblxuICAgICAgICBwcm92aWRlci5zZXRCdWZmZXIoYnVmZmVyZWQqMTAwKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwge1xuICAgICAgICAgICAgYnVmZmVyUGVyY2VudDogYnVmZmVyZWQqMTAwLFxuICAgICAgICAgICAgcG9zaXRpb246ICBwb3NpdGlvbixcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICB9KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHByb2dyZXNzXCIsIGJ1ZmZlcmVkKjEwMCk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGhhcyBjaGFuZ2VkXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uO1xuICAgICAgICBpZiAoaXNOYU4oZHVyYXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpICYmICFlbFZpZGVvLnBhdXNlZCAmJiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfU1RBTExFRCB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9MT0FESU5HKSAmJlxuICAgICAgICAgICAgIWNvbXBhcmVTdGFsbGVkVGltZShzdGFsbGVkLCBwb3NpdGlvbikgKXtcbiAgICAgICAgICAgIHN0YWxsZWQgPSAtMTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcgfHwgcHJvdmlkZXIuaXNTZWVraW5nKCkpIHtcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FLCB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5zZWVraW5nID0gKCkgPT4ge1xuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKHRydWUpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2luZ1wiLCBlbFZpZGVvLmN1cnJlbnRUaW1lKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUsse1xuICAgICAgICAgICAgcG9zaXRpb24gOiBlbFZpZGVvLmN1cnJlbnRUaW1lXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2VkID0gKCkgPT4ge1xuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVrZWRcIik7XG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcoZmFsc2UpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFS0VEKTtcbiAgICB9O1xuXG5cbiAgICBsb3dMZXZlbEV2ZW50cy53YWl0aW5nID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIHZpZGVvIHN0b3BzIGJlY2F1c2UgaXQgbmVlZHMgdG8gYnVmZmVyIHRoZSBuZXh0IGZyYW1lXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB3YWl0aW5nXCIsIHByb3ZpZGVyLmdldFN0YXRlKCkpO1xuICAgICAgICBpZihwcm92aWRlci5pc1NlZWtpbmcoKSl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICAgICAgfWVsc2UgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBzdGFsbGVkID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1NUQUxMRUQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnZvbHVtZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHZvbHVtZWNoYW5nZVwiLCBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIHtcbiAgICAgICAgICAgIHZvbHVtZTogTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCksXG4gICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5lcnJvciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29kZSA9IChlbFZpZGVvLmVycm9yICYmIGVsVmlkZW8uZXJyb3IuY29kZSkgfHwgMDtcbiAgICAgICAgbGV0IGNvbnZlcnRlZEVycm9Db2RlID0gKHtcbiAgICAgICAgICAgIDA6IFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgICAgICAgICAgMTogUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgICAgICAgICAgMjogUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICAgICAgICAgIDM6IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICAgICAgICAgIDQ6IFBMQVlFUl9GSUxFX0VSUk9SXG4gICAgICAgIH1bY29kZV18fDApO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlcnJvclwiLCBjb252ZXJ0ZWRFcnJvQ29kZSk7XG4gICAgICAgIGVycm9yVHJpZ2dlcihFUlJPUlNbY29udmVydGVkRXJyb0NvZGVdKTtcbiAgICB9O1xuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGVsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XG5cbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjcuLlxuICovXG5pbXBvcnQgQWRzIGZyb20gXCJhcGkvcHJvdmlkZXIvYWRzL0Fkc1wiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXJcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlLCBwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLFxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLCBTVEFURV9BRF9QTEFZSU5HLFxuICAgIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBDT05URU5UX1NPVVJDRV9DSEFOR0VELFxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBDb3JlIEZvciBIdG1sNSBWaWRlby5cbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcbiAqIEBwYXJhbSAgIG9uRXh0ZW5kZWRMb2FkIG9uIGxvYWQgaGFuZGxlclxuICogKi9cbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24gKHNwZWMsIHBsYXllckNvbmZpZywgb25FeHRlbmRlZExvYWQpe1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgbG9hZGVkLiBcIik7XG5cbiAgICBsZXQgdGhhdCA9e307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG4gICAgbGV0IGVsVmlkZW8gPSBleHRyYWN0VmlkZW9FbGVtZW50KHNwZWMuZXh0ZW5kZWRFbGVtZW50KTtcbiAgICBsZXQgYWRzID0gbnVsbCwgbGlzdGVuZXIgPSBudWxsLCB2aWRlb0VuZGVkQ2FsbGJhY2sgPSBudWxsO1xuICAgIGxldCBwb3N0ZXJJbWFnZSA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5pbWFnZXx8XCJcIjtcblxuICAgIGlmKHNwZWMuYWRUYWdVcmwpe1xuICAgICAgICBhZHMgPSBBZHMoZWxWaWRlbywgdGhhdCwgcGxheWVyQ29uZmlnLCBzcGVjLmFkVGFnVXJsKTtcbiAgICB9XG4gICAgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihzcGVjLmV4dGVuZGVkRWxlbWVudCwgdGhhdCwgYWRzID8gYWRzLnZpZGVvRW5kZWRDYWxsYmFjayA6IG51bGwpO1xuICAgIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWVyQ29uZmlnLmdldFBsYXliYWNrUmF0ZSgpO1xuXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcbiAgICAgICAgc3BlYy5mcmFtZXJhdGUgPSBzb3VyY2UuZnJhbWVyYXRlO1xuICAgICAgICBpZighc3BlYy5mcmFtZXJhdGUpe1xuICAgICAgICAgICAgLy9pbml0IHRpbWVjb2RlIG1vZGVcbiAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRUaW1lY29kZU1vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYob25FeHRlbmRlZExvYWQpe1xuICAgICAgICAgICAgb25FeHRlbmRlZExvYWQoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgbGV0IHByZXZpb3VzU291cmNlID0gZWxWaWRlby5zcmM7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XG5cbiAgICAgICAgICAgIHNvdXJjZUVsZW1lbnQuc3JjID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VDaGFuZ2VkID0gKHNvdXJjZUVsZW1lbnQuc3JjICE9PSBwcmV2aW91c1NvdXJjZSk7XG4gICAgICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIC8vZWxWaWRlby5zcmMgPSBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXS5maWxlO1xuICAgICAgICAgICAgICAgIGVsVmlkZW8uYXBwZW5kKHNvdXJjZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBjYWxsIGxvYWQgaWYgc3JjIHdhcyBub3Qgc2V0LiBsb2FkKCkgd2lsbCBjYW5jZWwgYW55IGFjdGl2ZSBwbGF5IHByb21pc2UuXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzU291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgZWxWaWRlby5jdXJyZW50VGltZSA+IDApe1xuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyp0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNwZWMuY3VycmVudFNvdXJjZVxuICAgICAgICAgICAgfSk7Ki9cblxuICAgICAgICAgICAgaWYocG9zdGVySW1hZ2Upe1xuICAgICAgICAgICAgICAgIC8vVGhlcmUgaXMgbm8gd2F5IHRvIHZlcmlmeSB0aGUgcG9zdGVySW1hZ2UgVVJMLiBUaGlzIHdpbGwgYmUgYmxuYWsgdW50aWwgaGF2ZSBhIGdvb2QgaWRlYS5cbiAgICAgICAgICAgICAgICAvL2VsVmlkZW8uc3R5bGUuYmFja2dyb3VuZCA9IFwidHJhbnNwYXJlbnQgdXJsKCdcIitwb3N0ZXJJbWFnZStcIicpIG5vLXJlcGVhdCAwIDBcIjtcbiAgICAgICAgICAgICAgICAvL2VsVmlkZW8ucG9zdGVyID0gcG9zdGVySW1hZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMubmFtZTtcbiAgICB9O1xuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XG4gICAgICAgIHNwZWMuY2FuU2VlayA9IGNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XG4gICAgICAgIHJldHVybiBzcGVjLnNlZWtpbmc7XG4gICAgfTtcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcbiAgICAgICAgc3BlYy5zZWVraW5nID0gc2Vla2luZztcbiAgICB9O1xuXG4gICAgdGhhdC5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgPT4ge1xuICAgICAgICBpZihzcGVjLnN0YXRlICE9PSBuZXdTdGF0ZSl7XG4gICAgICAgICAgICBsZXQgcHJldlN0YXRlID0gc3BlYy5zdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChuZXdTdGF0ZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QTEFZSU5HIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BlYy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xuICAgICAgICAgICAgICAgIHByZXZzdGF0ZSA6IHByZXZTdGF0ZSxcbiAgICAgICAgICAgICAgICBuZXdzdGF0ZTogc3BlYy5zdGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcbiAgICAgICAgc3BlYy5idWZmZXIgPSBuZXdCdWZmZXI7XG4gICAgfTtcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuYnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgbGV0IGlzTGl2ZSA9IChlbFZpZGVvLmR1cmF0aW9uID09PSBJbmZpbml0eSkgPyB0cnVlIDogc2VwYXJhdGVMaXZlKHNwZWMuZXh0ZW5kZWRFbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIGlzTGl2ZSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb247XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbFZpZGVvLnZvbHVtZSA9IHZvbHVtZS8xMDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby52b2x1bWUqMTAwO1xuICAgIH07XG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSAhZWxWaWRlby5tdXRlZDtcblxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSBzdGF0ZTtcblxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xuICAgIH07XG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcbiAgICB9O1xuXG4gICAgdGhhdC5wcmVsb2FkID0gKHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuXG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcbiAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbiB8fCAwKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNNdXRlKCkpe1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRWb2x1bWUocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChzb3VyY2VzKSA9PntcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xuICAgICAgICBfbG9hZChzcGVjLnNvdXJjZXMuc3RhcnR0aW1lIHx8IDApO1xuICAgIH07XG5cbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIGlmICggKGFkcyAmJiBhZHMuaXNBY3RpdmUoKSkgfHwgKGFkcyAmJiAhYWRzLnN0YXJ0ZWQoKSkpIHtcbiAgICAgICAgICAgICAgICBhZHMucGxheSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZWxWaWRlby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEF1dG9wbGF5IHN0YXJ0ZWQhXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2FuJ3QgcGxheSBiZWNhdXNlIFVzZXIgZG9lc24ndCBhbnkgaW50ZXJhY3Rpb25zLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy9XYWl0IGZvciBVc2VyIEludGVyYWN0aW9ucy4gKGxpa2UgY2xpY2spXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgfWVsc2UgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKXtcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQudHJpZ2dlcihQTEFZQkFDS19SQVRFX0NIQU5HRUQsIHtwbGF5YmFja1JhdGUgOiBwbGF5YmFja1JhdGV9KTtcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBpbmRleCA6IGluZGV4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmKHNwZWMuY3VycmVudFNvdXJjZSA9PT0gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XG4gICAgICAgICAgICBpZihzcGVjLnNvdXJjZXMgJiYgc3BlYy5zb3VyY2VzLmxlbmd0aCA+IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAvL3RoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUxhYmVsKHNwZWMuc291cmNlc1tzb3VyY2VJbmRleF0ubGFiZWwpO1xuICAgICAgICAgICAgICAgIC8vc3BlYy5jdXJyZW50UXVhbGl0eSA9IHNvdXJjZUluZGV4O1xuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsVmlkZW8uY3VycmVudFRpbWUgfHwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGV2ZWxzO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0RnJhbWVyYXRlID0gKGZyYW1lcmF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGUgPSBmcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PntcbiAgICAgICAgbGV0IGZwcyA9IHNwZWMuZnJhbWVyYXRlO1xuICAgICAgICBsZXQgY3VycmVudEZyYW1lcyA9IGVsVmlkZW8uY3VycmVudFRpbWUgKiBmcHM7XG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IChjdXJyZW50RnJhbWVzICsgZnJhbWVDb3VudCkgLyBmcHM7XG4gICAgICAgIG5ld1Bvc2l0aW9uID0gbmV3UG9zaXRpb24gKyAwLjAwMDAxOyAvLyBGSVhFUyBBIFNBRkFSSSBTRUVLIElTU1VFLiBteVZkaWVvLmN1cnJlbnRUaW1lID0gMC4wNCB3b3VsZCBnaXZlIFNNUFRFIDAwOjAwOjAwOjAwIHdoZXJhcyBpdCBzaG91bGQgZ2l2ZSAwMDowMDowMDowMVxuXG4gICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgdGhhdC5zZWVrKG5ld1Bvc2l0aW9uKTtcbiAgICB9O1xuXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc3RvcCgpIFwiKTtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3ByZWxvYWQnKTtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICB3aGlsZSAoZWxWaWRlby5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUNoaWxkKGVsVmlkZW8uZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuc3RvcCgpO1xuICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XG4gICAgICAgIC8vZWxWaWRlby5yZW1vdmUoKTtcblxuICAgICAgICBpZihhZHMpe1xuICAgICAgICAgICAgYWRzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZGVzdHJveSgpIHBsYXllciBzdG9wLCBsaXN0ZW5lciwgZXZlbnQgZGVzdHJvaWVkXCIpO1xuICAgIH07XG5cbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cbiAgICAvLyB1c2UgOiBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7IC4uLiBzdXBlcl9kZXN0cm95KCk7XG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==