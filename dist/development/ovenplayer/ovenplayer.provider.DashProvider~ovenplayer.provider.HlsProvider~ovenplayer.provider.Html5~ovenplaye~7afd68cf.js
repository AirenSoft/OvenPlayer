/*! OvenPlayerv0.9.496 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var Listener = function Listener(element, mse, provider, videoEndedCallback) {
    var lowLevelEvents = {};

    OvenPlayerConsole.log("EventListener loaded.", element, provider);
    var that = {};

    var stalled = -1;
    var elVideo = element;
    var between = function between(num, min, max) {
        return Math.max(Math.min(num, max), min);
    };
    var compareStalledTime = function compareStalledTime(stalled, position) {
        //Original Code is stalled !== position
        //Because Dashjs is very meticulous. Then always diffrence stalled and position.
        //That is why when I use toFixed(2).
        console.log(stalled.toFixed(2), position.toFixed(2));
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
        var isLive = elVideo.duration === Infinity ? true : (0, _utils.separateLive)(mse);
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

    var dashAttachedView = false;

    var elVideo = spec.element;
    var ads = null,
        listener = null,
        videoEndedCallback = null;
    var posterImage = playerConfig.getConfig().image || "";

    if (spec.adTagUrl) {
        ads = (0, _Ads2["default"])(elVideo, that, playerConfig, spec.adTagUrl);
    }
    listener = (0, _Listener2["default"])(elVideo, spec.mse, that, ads ? ads.videoEndedCallback : null);
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
        var isLive = elVideo.duration === Infinity ? true : (0, _utils.separateLive)(spec.elementOrMse);
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
                if (that.getName() === _constants.PROVIDER_DASH && ads && !dashAttachedView) {
                    //Ad steals dash's video element. Put in right place.
                    spec.mse.attachView(elVideo);
                    dashAttachedView = true;
                }

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
                //that.pause();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwibXNlIiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsImNvbnNvbGUiLCJ0b0ZpeGVkIiwiY2FucGxheSIsInNldENhblNlZWsiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsImR1cmF0aW9uY2hhbmdlIiwicHJvZ3Jlc3MiLCJlbmRlZCIsImdldFN0YXRlIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwic2V0U3RhdGUiLCJsb2FkZWRkYXRhIiwibG9hZGVkbWV0YWRhdGEiLCJpc0xpdmUiLCJkdXJhdGlvbiIsIkluZmluaXR5Iiwic291cmNlcyIsImdldFNvdXJjZXMiLCJzb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2UiLCJ0eXBlIiwibWV0YWRhdGEiLCJDT05URU5UX01FVEEiLCJwYXVzZSIsIlNUQVRFX0VSUk9SIiwiZXJyb3IiLCJjdXJyZW50VGltZSIsIlNUQVRFX1BBVVNFRCIsInBsYXkiLCJwYXVzZWQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfTE9BRElORyIsInBsYXlpbmciLCJ0aW1lUmFuZ2VzIiwiYnVmZmVyZWQiLCJsZW5ndGgiLCJlbmQiLCJzZXRCdWZmZXIiLCJDT05URU5UX0JVRkZFUiIsImJ1ZmZlclBlcmNlbnQiLCJ0aW1ldXBkYXRlIiwiaXNOYU4iLCJpc1NlZWtpbmciLCJTVEFURV9TVEFMTEVEIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldmVudE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVzdHJveSIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsIm9uRXh0ZW5kZWRMb2FkIiwiZGFzaEF0dGFjaGVkVmlldyIsImFkcyIsImxpc3RlbmVyIiwicG9zdGVySW1hZ2UiLCJnZXRDb25maWciLCJpbWFnZSIsImFkVGFnVXJsIiwicGxheWJhY2tSYXRlIiwiZGVmYXVsdFBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsImN1cnJlbnRTb3VyY2UiLCJmcmFtZXJhdGUiLCJzZXRUaW1lY29kZU1vZGUiLCJwcmV2aW91c1NvdXJjZSIsInNyYyIsInNvdXJjZUVsZW1lbnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJmaWxlIiwic291cmNlQ2hhbmdlZCIsImFwcGVuZCIsImxvYWQiLCJzZWVrIiwiZ2V0TmFtZSIsIm5hbWUiLCJjYW5TZWVrIiwibmV3U3RhdGUiLCJzdGF0ZSIsInByZXZTdGF0ZSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwibmV3c3RhdGUiLCJuZXdCdWZmZXIiLCJidWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsImVsZW1lbnRPck1zZSIsImdldFBvc2l0aW9uIiwic2V0Vm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0TXV0ZSIsIkNPTlRFTlRfTVVURSIsImdldE11dGUiLCJwcmVsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpc0F1dG9TdGFydCIsImlzTXV0ZSIsInN0YXJ0dGltZSIsImlzQWN0aXZlIiwic3RhcnRlZCIsIlBST1ZJREVSX0RBU0giLCJhdHRhY2hWaWV3IiwicHJvbWlzZSIsInVuZGVmaW5lZCIsInRoZW4iLCJzZXRUaW1lb3V0IiwiU1RBVEVfQURfUExBWUlORyIsInNldFBsYXliYWNrUmF0ZSIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIm1hcCIsImluZGV4IiwibGFiZWwiLCJzZXRDdXJyZW50U291cmNlIiwibmVlZFByb3ZpZGVyQ2hhbmdlIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsInNldFNvdXJjZUxhYmVsIiwiZ2V0UXVhbGl0eUxldmVscyIsInF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsImN1cnJlbnRRdWFsaXR5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRGcmFtZXJhdGUiLCJzZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZnBzIiwiY3VycmVudEZyYW1lcyIsIm5ld1Bvc2l0aW9uIiwic3RvcCIsInJlbW92ZUF0dHJpYnV0ZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsIm9mZiIsIm1ldGhvZCIsImFwcGx5IiwiYXJndW1lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQTRCQTs7QUFFQTs7Ozs7O0FBT0EsSUFBTUEsV0FBVyxT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QU9DLEtBQVAsQ0FBYXhMLElBQWIsRUFBbUJ5TCxTQUFuQixDQUFQO0FBQ0gsU0FGRDtBQUdILEtBTEQ7QUFNQSxXQUFPekwsSUFBUDtBQUVILENBM1hELEMsQ0FwQkE7OztxQkFpWmVvRixRIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2YuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEVSUk9SUyxcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBzZXBhcmF0ZUxpdmUsIGVycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuXG4vKipcbiAqIEBicmllZiAgIFRyaWdnZXIgb24gdmFyaW91cyB2aWRlbyBldmVudHMuXG4gKiBAcGFyYW0gICBleHRlbmRlZEVsZW1lbnQgZXh0ZW5kZWQgbWVkaWEgb2JqZWN0IGJ5IG1zZS5cbiAqIEBwYXJhbSAgIFByb3ZpZGVyIHByb3ZpZGVyICBodG1sNVByb3ZpZGVyXG4gKiAqL1xuXG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxlbWVudCwgbXNlLCBwcm92aWRlciwgdmlkZW9FbmRlZENhbGxiYWNrKXtcbiAgICBjb25zdCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciBsb2FkZWQuXCIsZWxlbWVudCAscHJvdmlkZXIgKTtcbiAgICBjb25zdCB0aGF0ID0ge307XG5cbiAgICBsZXQgc3RhbGxlZCA9IC0xO1xuICAgIGxldCBlbFZpZGVvID0gIGVsZW1lbnQ7XG4gICAgY29uc3QgYmV0d2VlbiA9IGZ1bmN0aW9uIChudW0sIG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihudW0sIG1heCksIG1pbik7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBhcmVTdGFsbGVkVGltZSA9IGZ1bmN0aW9uKHN0YWxsZWQsIHBvc2l0aW9uKXtcbiAgICAgICAgLy9PcmlnaW5hbCBDb2RlIGlzIHN0YWxsZWQgIT09IHBvc2l0aW9uXG4gICAgICAgIC8vQmVjYXVzZSBEYXNoanMgaXMgdmVyeSBtZXRpY3Vsb3VzLiBUaGVuIGFsd2F5cyBkaWZmcmVuY2Ugc3RhbGxlZCBhbmQgcG9zaXRpb24uXG4gICAgICAgIC8vVGhhdCBpcyB3aHkgd2hlbiBJIHVzZSB0b0ZpeGVkKDIpLlxuICAgICAgICBjb25zb2xlLmxvZyhzdGFsbGVkLnRvRml4ZWQoMiksIHBvc2l0aW9uLnRvRml4ZWQoMikpO1xuICAgICAgICByZXR1cm4gc3RhbGxlZC50b0ZpeGVkKDIpID09PSBwb3NpdGlvbi50b0ZpeGVkKDIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5jYW5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIHByb3ZpZGVyLnNldENhblNlZWsodHJ1ZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVJfRlVMTCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBjYW5wbGF5XCIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5kdXJhdGlvbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBkdXJhdGlvbiBvZiB0aGUgYXVkaW8vdmlkZW8gaXMgY2hhbmdlZFxuICAgICAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcygpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZHVyYXRpb25jaGFuZ2VcIik7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWxpc3QgaXMgZW5kZWRcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVuZGVkXCIpO1xuXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9IFNUQVRFX0NPTVBMRVRFKXtcbiAgICAgICAgICAgIGlmKHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgdmlkZW9FbmRlZENhbGxiYWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZSBvZiB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgLy9EbyBub3RoaW5nIEJlY2F1c2UgdGhpcyBjYXVzZXMgY2hhb3MgYnkgbG9hZGVkbWV0YWRhdGEuXG4gICAgICAgIC8qXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IGVsVmlkZW8udmlkZW9XaWR0aFxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCBtZXRhIGRhdGEgZm9yIHRoZSBhdWRpby92aWRlb1xuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT09IEluZmluaXR5KSA/IHRydWUgOiBzZXBhcmF0ZUxpdmUobXNlKTtcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwcm92aWRlci5nZXRTb3VyY2VzKCk7XG4gICAgICAgIGxldCBzb3VyY2VJbmRleCA9IHByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICAgICAgbGV0IHR5cGUgPSBzb3VyY2VJbmRleCA+IC0xID8gc291cmNlc1tzb3VyY2VJbmRleF0udHlwZSA6IFwiXCI7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgdHlwZSA6dHlwZVxuICAgICAgICB9O1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRtZXRhZGF0YVwiLCBtZXRhZGF0YSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHBhdXNlZFxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9DT01QTEVURSB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9FUlJPUil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lbmRlZCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lcnJvcil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5jdXJyZW50VGltZSA9PT0gZWxWaWRlby5kdXJhdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBhdXNlXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHN0YXJ0ZWQgb3IgaXMgbm8gbG9uZ2VyIHBhdXNlZFxuICAgICAgICBzdGFsbGVkID0gLTE7XG4gICAgICAgIGlmICghZWxWaWRlby5wYXVzZWQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucGxheWluZyA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBpcyBwbGF5aW5nIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZCBvciBzdG9wcGVkIGZvciBidWZmZXJpbmdcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBsYXlpbmdcIik7XG4gICAgICAgIGlmKHN0YWxsZWQgPCAwKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcbiAgICAgICAgaWYoIXRpbWVSYW5nZXMgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb24sIHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcblxuICAgICAgICBwcm92aWRlci5zZXRCdWZmZXIoYnVmZmVyZWQqMTAwKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwge1xuICAgICAgICAgICAgYnVmZmVyUGVyY2VudDogYnVmZmVyZWQqMTAwLFxuICAgICAgICAgICAgcG9zaXRpb246ICBwb3NpdGlvbixcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICB9KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHByb2dyZXNzXCIsIGJ1ZmZlcmVkKjEwMCk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGhhcyBjaGFuZ2VkXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uO1xuICAgICAgICBpZiAoaXNOYU4oZHVyYXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpICYmICFlbFZpZGVvLnBhdXNlZCAmJiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfU1RBTExFRCB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9MT0FESU5HKSAmJlxuICAgICAgICAgICAgIWNvbXBhcmVTdGFsbGVkVGltZShzdGFsbGVkLCBwb3NpdGlvbikgKXtcbiAgICAgICAgICAgIHN0YWxsZWQgPSAtMTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcgfHwgcHJvdmlkZXIuaXNTZWVraW5nKCkpIHtcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FLCB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5zZWVraW5nID0gKCkgPT4ge1xuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKHRydWUpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2luZ1wiLCBlbFZpZGVvLmN1cnJlbnRUaW1lKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUsse1xuICAgICAgICAgICAgcG9zaXRpb24gOiBlbFZpZGVvLmN1cnJlbnRUaW1lXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2VkID0gKCkgPT4ge1xuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVrZWRcIik7XG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcoZmFsc2UpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFS0VEKTtcbiAgICB9O1xuXG5cbiAgICBsb3dMZXZlbEV2ZW50cy53YWl0aW5nID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIHZpZGVvIHN0b3BzIGJlY2F1c2UgaXQgbmVlZHMgdG8gYnVmZmVyIHRoZSBuZXh0IGZyYW1lXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB3YWl0aW5nXCIsIHByb3ZpZGVyLmdldFN0YXRlKCkpO1xuICAgICAgICBpZihwcm92aWRlci5pc1NlZWtpbmcoKSl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICAgICAgfWVsc2UgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBzdGFsbGVkID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1NUQUxMRUQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnZvbHVtZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHZvbHVtZWNoYW5nZVwiLCBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIHtcbiAgICAgICAgICAgIHZvbHVtZTogTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCksXG4gICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5lcnJvciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29kZSA9IChlbFZpZGVvLmVycm9yICYmIGVsVmlkZW8uZXJyb3IuY29kZSkgfHwgMDtcbiAgICAgICAgbGV0IGNvbnZlcnRlZEVycm9Db2RlID0gKHtcbiAgICAgICAgICAgIDA6IFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgICAgICAgICAgMTogUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgICAgICAgICAgMjogUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICAgICAgICAgIDM6IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICAgICAgICAgIDQ6IFBMQVlFUl9GSUxFX0VSUk9SXG4gICAgICAgIH1bY29kZV18fDApO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlcnJvclwiLCBjb252ZXJ0ZWRFcnJvQ29kZSk7XG4gICAgICAgIGVycm9yVHJpZ2dlcihFUlJPUlNbY29udmVydGVkRXJyb0NvZGVdKTtcbiAgICB9O1xuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGVsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XG5cbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjcuLlxuICovXG5pbXBvcnQgQWRzIGZyb20gXCJhcGkvcHJvdmlkZXIvYWRzL0Fkc1wiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXJcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlLCBwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLFxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLCBTVEFURV9BRF9QTEFZSU5HLFxuICAgIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBDT05URU5UX1NPVVJDRV9DSEFOR0VELFxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBDb3JlIEZvciBIdG1sNSBWaWRlby5cbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcbiAqIEBwYXJhbSAgIG9uRXh0ZW5kZWRMb2FkIG9uIGxvYWQgaGFuZGxlclxuICogKi9cbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24gKHNwZWMsIHBsYXllckNvbmZpZywgb25FeHRlbmRlZExvYWQpe1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgbG9hZGVkLiBcIik7XG5cbiAgICBsZXQgdGhhdCA9e307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuICAgIFxuICAgIGxldCBkYXNoQXR0YWNoZWRWaWV3ID0gZmFsc2U7XG5cbiAgICBsZXQgZWxWaWRlbyA9IHNwZWMuZWxlbWVudDtcbiAgICBsZXQgYWRzID0gbnVsbCwgbGlzdGVuZXIgPSBudWxsLCB2aWRlb0VuZGVkQ2FsbGJhY2sgPSBudWxsO1xuICAgIGxldCBwb3N0ZXJJbWFnZSA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5pbWFnZXx8XCJcIjtcblxuICAgIGlmKHNwZWMuYWRUYWdVcmwpe1xuICAgICAgICBhZHMgPSBBZHMoZWxWaWRlbywgdGhhdCwgcGxheWVyQ29uZmlnLCBzcGVjLmFkVGFnVXJsKTtcbiAgICB9XG4gICAgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihlbFZpZGVvLCBzcGVjLm1zZSwgdGhhdCwgYWRzID8gYWRzLnZpZGVvRW5kZWRDYWxsYmFjayA6IG51bGwpO1xuICAgIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWVyQ29uZmlnLmdldFBsYXliYWNrUmF0ZSgpO1xuXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcbiAgICAgICAgc3BlYy5mcmFtZXJhdGUgPSBzb3VyY2UuZnJhbWVyYXRlO1xuICAgICAgICBpZighc3BlYy5mcmFtZXJhdGUpe1xuICAgICAgICAgICAgLy9pbml0IHRpbWVjb2RlIG1vZGVcbiAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRUaW1lY29kZU1vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYob25FeHRlbmRlZExvYWQpe1xuICAgICAgICAgICAgb25FeHRlbmRlZExvYWQoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgbGV0IHByZXZpb3VzU291cmNlID0gZWxWaWRlby5zcmM7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XG5cbiAgICAgICAgICAgIHNvdXJjZUVsZW1lbnQuc3JjID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VDaGFuZ2VkID0gKHNvdXJjZUVsZW1lbnQuc3JjICE9PSBwcmV2aW91c1NvdXJjZSk7XG4gICAgICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIC8vZWxWaWRlby5zcmMgPSBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXS5maWxlO1xuICAgICAgICAgICAgICAgIGVsVmlkZW8uYXBwZW5kKHNvdXJjZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBjYWxsIGxvYWQgaWYgc3JjIHdhcyBub3Qgc2V0LiBsb2FkKCkgd2lsbCBjYW5jZWwgYW55IGFjdGl2ZSBwbGF5IHByb21pc2UuXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzU291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgZWxWaWRlby5jdXJyZW50VGltZSA+IDApe1xuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyp0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNwZWMuY3VycmVudFNvdXJjZVxuICAgICAgICAgICAgfSk7Ki9cblxuICAgICAgICAgICAgaWYocG9zdGVySW1hZ2Upe1xuICAgICAgICAgICAgICAgIC8vVGhlcmUgaXMgbm8gd2F5IHRvIHZlcmlmeSB0aGUgcG9zdGVySW1hZ2UgVVJMLiBUaGlzIHdpbGwgYmUgYmxuYWsgdW50aWwgaGF2ZSBhIGdvb2QgaWRlYS5cbiAgICAgICAgICAgICAgICAvL2VsVmlkZW8uc3R5bGUuYmFja2dyb3VuZCA9IFwidHJhbnNwYXJlbnQgdXJsKCdcIitwb3N0ZXJJbWFnZStcIicpIG5vLXJlcGVhdCAwIDBcIjtcbiAgICAgICAgICAgICAgICAvL2VsVmlkZW8ucG9zdGVyID0gcG9zdGVySW1hZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMubmFtZTtcbiAgICB9O1xuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XG4gICAgICAgIHNwZWMuY2FuU2VlayA9IGNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XG4gICAgICAgIHJldHVybiBzcGVjLnNlZWtpbmc7XG4gICAgfTtcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcbiAgICAgICAgc3BlYy5zZWVraW5nID0gc2Vla2luZztcbiAgICB9O1xuXG4gICAgdGhhdC5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgPT4ge1xuICAgICAgICBpZihzcGVjLnN0YXRlICE9PSBuZXdTdGF0ZSl7XG4gICAgICAgICAgICBsZXQgcHJldlN0YXRlID0gc3BlYy5zdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChuZXdTdGF0ZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QTEFZSU5HIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BlYy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xuICAgICAgICAgICAgICAgIHByZXZzdGF0ZSA6IHByZXZTdGF0ZSxcbiAgICAgICAgICAgICAgICBuZXdzdGF0ZTogc3BlYy5zdGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcbiAgICAgICAgc3BlYy5idWZmZXIgPSBuZXdCdWZmZXI7XG4gICAgfTtcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuYnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgbGV0IGlzTGl2ZSA9IChlbFZpZGVvLmR1cmF0aW9uID09PSBJbmZpbml0eSkgPyB0cnVlIDogc2VwYXJhdGVMaXZlKHNwZWMuZWxlbWVudE9yTXNlKTtcbiAgICAgICAgcmV0dXJuIGlzTGl2ZSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb247XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbFZpZGVvLnZvbHVtZSA9IHZvbHVtZS8xMDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby52b2x1bWUqMTAwO1xuICAgIH07XG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSAhZWxWaWRlby5tdXRlZDtcblxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSBzdGF0ZTtcblxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xuICAgIH07XG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcbiAgICB9O1xuXG4gICAgdGhhdC5wcmVsb2FkID0gKHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuXG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcbiAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbiB8fCAwKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNNdXRlKCkpe1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRWb2x1bWUocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChzb3VyY2VzKSA9PntcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xuICAgICAgICBfbG9hZChzcGVjLnNvdXJjZXMuc3RhcnR0aW1lIHx8IDApO1xuICAgIH07XG5cbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIGlmICggKGFkcyAmJiBhZHMuaXNBY3RpdmUoKSkgfHwgKGFkcyAmJiAhYWRzLnN0YXJ0ZWQoKSkpIHtcbiAgICAgICAgICAgICAgICBhZHMucGxheSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhhdC5nZXROYW1lKCkgPT09IFBST1ZJREVSX0RBU0ggJiYgYWRzICYmICFkYXNoQXR0YWNoZWRWaWV3KXtcbiAgICAgICAgICAgICAgICAgICAgLy9BZCBzdGVhbHMgZGFzaCdzIHZpZGVvIGVsZW1lbnQuIFB1dCBpbiByaWdodCBwbGFjZS5cbiAgICAgICAgICAgICAgICAgICAgc3BlYy5tc2UuYXR0YWNoVmlldyhlbFZpZGVvKTtcbiAgICAgICAgICAgICAgICAgICAgZGFzaEF0dGFjaGVkVmlldyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEF1dG9wbGF5IHN0YXJ0ZWQhXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2FuJ3QgcGxheSBiZWNhdXNlIFVzZXIgZG9lc24ndCBhbnkgaW50ZXJhY3Rpb25zLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy9XYWl0IGZvciBVc2VyIEludGVyYWN0aW9ucy4gKGxpa2UgY2xpY2spXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgfWVsc2UgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKXtcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQudHJpZ2dlcihQTEFZQkFDS19SQVRFX0NIQU5HRUQsIHtwbGF5YmFja1JhdGUgOiBwbGF5YmFja1JhdGV9KTtcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBpbmRleCA6IGluZGV4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmKHNwZWMuY3VycmVudFNvdXJjZSA9PT0gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XG4gICAgICAgICAgICBpZihzcGVjLnNvdXJjZXMgJiYgc3BlYy5zb3VyY2VzLmxlbmd0aCA+IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAvL3RoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUxhYmVsKHNwZWMuc291cmNlc1tzb3VyY2VJbmRleF0ubGFiZWwpO1xuICAgICAgICAgICAgICAgIC8vc3BlYy5jdXJyZW50UXVhbGl0eSA9IHNvdXJjZUluZGV4O1xuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsVmlkZW8uY3VycmVudFRpbWUgfHwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG5cbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRGcmFtZXJhdGUgPSAoZnJhbWVyYXRlKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZSA9IGZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+e1xuICAgICAgICBsZXQgZnBzID0gc3BlYy5mcmFtZXJhdGU7XG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVzID0gZWxWaWRlby5jdXJyZW50VGltZSAqIGZwcztcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXG5cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xuICAgIH07XG5cbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgncHJlbG9hZCcpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIHdoaWxlIChlbFZpZGVvLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlQ2hpbGQoZWxWaWRlby5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5zdG9wKCk7XG4gICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgLy9lbFZpZGVvLnJlbW92ZSgpO1xuXG4gICAgICAgIGlmKGFkcyl7XG4gICAgICAgICAgICBhZHMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG4gICAgfTtcblxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9