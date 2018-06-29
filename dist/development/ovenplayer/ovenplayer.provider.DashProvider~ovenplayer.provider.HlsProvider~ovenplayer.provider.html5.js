/*! OvenPlayerv0.6.1 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5"],{

/***/ "./src/js/api/provider/Core.js":
/*!*************************************!*\
  !*** ./src/js/api/provider/Core.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by hoho on 2018. 6. 27..
                                                                                                                                                                                                                                                                   */


var _events = __webpack_require__(/*! utils/events */ "./src/js/utils/events.js");

var _events2 = _interopRequireDefault(_events);

var _Listener = __webpack_require__(/*! api/provider/Listener */ "./src/js/api/provider/Listener.js");

var _Listener2 = _interopRequireDefault(_Listener);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _underscore = __webpack_require__(/*! utils/underscore.js */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _promise = __webpack_require__(/*! api/shims/promise */ "./src/js/api/shims/promise.js");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractVideoElement = function extractVideoElement(providerName, extendedElement) {
    if (_underscore2.default.isElement(extendedElement)) {
        return extendedElement;
    }
    if (providerName === _constants.PROVIDER_DASH) {
        return extendedElement.getVideoElement();
    } else if (providerName === _constants.PROVIDER_HLS) {
        return extendedElement.media;
    }
    return null;
};

/**
 * @brief   Core Provider.
 * @param   providerName provider name
 * @param   extendedElement extended media object by mse. or video element.
 * @param   playerConfig  player config
 * @param   onLoad on load handler
 * */
var Core = function Core(providerName, extendedElement, playerConfig, onLoad) {
    OvenPlayerConsole.log("CORE loaded. ");

    var that = _extends({
        on: _events2.default.on,
        once: _events2.default.once,
        off: _events2.default.off,
        trigger: _events2.default.trigger
    });

    var elVideo = extractVideoElement(providerName, extendedElement);
    var listener = (0, _Listener2.default)(providerName, extendedElement, elVideo, that);
    var canSeek = false;
    var seeking = false;
    var state = _constants.STATE_IDLE;
    var buffer = 0;
    var currentQuality = -1;
    var sources = [];
    //let isLive = false;

    var posterImage = playerConfig.getConfig().image || "";
    elVideo.playbackRate = elVideo.defaultPlaybackRate = playerConfig.getDefaultPlaybackRate();

    var setQualityLevelBySources = function setQualityLevelBySources(sources) {
        var pickQuality = function pickQuality(sources) {
            var quality = Math.max(0, currentQuality);
            var label = "";
            if (sources) {
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i].default) {
                        quality = i;
                    }
                    if (playerConfig.getQualityLabel() && sources[i].label === playerConfig.getQualityLabel()) {
                        return i;
                    }
                }
            }
            return quality;
        };

        currentQuality = pickQuality(sources);
    };

    var _load = function _load(lastPlayPosition) {
        var source = sources[currentQuality];
        if (onLoad) {
            onLoad(source, lastPlayPosition);
        } else {
            OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : " + lastPlayPosition);
            var previousSource = elVideo.src;
            var sourceElement = document.createElement('source');

            sourceElement.src = source.file;
            var sourceChanged = sourceElement.src !== previousSource;
            if (sourceChanged) {
                elVideo.src = sources[currentQuality].file;
                // Do not call load if src was not set. load() will cancel any active play promise.
                if (previousSource) {
                    elVideo.load();
                }
            } else if (lastPlayPosition == 0 && elVideo.currentTime > 0) {
                that.seek(lastPlayPosition);
            }
            if (lastPlayPosition > 0) {
                that.seek(lastPlayPosition);
                that.play();
            }
            that.trigger(_constants.CONTENT_LEVELS, {
                currentQuality: currentQuality
            });

            if (posterImage) {
                elVideo.poster = posterImage;
            }
        }
    };

    that.getCurrentSource = function () {
        OvenPlayerConsole.log("CORE : getCurrentSource() ", sources[currentQuality]);
        return sources[currentQuality];
    };

    that.canSeek = function () {
        OvenPlayerConsole.log("CORE : canSeek() ", canSeek);return canSeek;
    };
    that.setCanSeek = function (canSeek_) {
        OvenPlayerConsole.log("CORE : setCanSeek() ", canSeek_);canSeek = canSeek_;
    };

    that.isSeeking = function () {
        OvenPlayerConsole.log("CORE : isSeeking() ", seeking);return seeking;
    };
    that.setSeeking = function (seeking_) {
        OvenPlayerConsole.log("CORE : setSeeking() ", seeking_);seeking = seeking_;
    };

    //that.isLive = ()=>{return isLive;};
    //that.setLive = (live)=>{isLive = live;};

    that.setPlayerElement = function (element) {
        OvenPlayerConsole.log("CORE : setPlayerElement() ", element);
        elVideo = element;
    };

    that.setState = function (newState) {
        if (state != newState) {
            var prevState = state;
            switch (newState) {
                case _constants.STATE_COMPLETE:
                    that.trigger(_constants.PLAYER_COMPLETE);
                    break;
                case _constants.STATE_PAUSED:
                    that.trigger(_constants.PLAYER_PAUSE, {
                        prevState: state
                    });
                    break;
                case _constants.STATE_PLAYING:
                    that.trigger(_constants.PLAYER_PLAY, {
                        prevState: state
                    });
                    break;
            }
            state = newState;
            OvenPlayerConsole.log("CORE : setState() ", state);
            that.trigger(_constants.PLAYER_STATE, {
                prevstate: prevState,
                newstate: state
            });
        }
    };
    that.getState = function () {
        OvenPlayerConsole.log("CORE : getState() ", state);
        return state;
    };
    that.setBuffer = function (newBuffer) {
        OvenPlayerConsole.log("CORE : setBuffer() ", newBuffer);
        buffer = newBuffer;
    };
    that.getBuffer = function () {
        OvenPlayerConsole.log("CORE : getBuffer() ", buffer);
        return buffer;
    };
    that.getDuration = function () {
        //ToDo : You consider hlsjs. But not now because we don't support hlsjs.
        var isLive = elVideo.duration == Infinity ? true : providerName === _constants.PROVIDER_DASH ? extendedElement.isDynamic() : false;
        OvenPlayerConsole.log("CORE : getDuration() ", isLive ? Infinity : elVideo.duration);
        return isLive ? Infinity : elVideo.duration;
    };
    that.getPosition = function () {
        OvenPlayerConsole.log("CORE : getPosition() ", elVideo.currentTime);
        return elVideo.currentTime;
    };
    that.setVolume = function (volume) {
        OvenPlayerConsole.log("CORE : setVolume() ", volume);
        elVideo.volume = volume / 100;
    };
    that.getVolume = function () {
        OvenPlayerConsole.log("CORE : getVolume() ", elVideo.volume * 100);
        return elVideo.volume * 100;
    };
    that.setMute = function (state) {

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
        OvenPlayerConsole.log("CORE : setMute() ", elVideo.muted);
        return elVideo.muted;
    };
    that.getMute = function () {
        OvenPlayerConsole.log("CORE : setMute() ", elVideo.muted);
        return elVideo.muted;
    };

    that.preload = function (sources_, lastPlayPosition) {
        OvenPlayerConsole.log("CORE : preload() ", sources_, lastPlayPosition);
        sources = sources_;
        setQualityLevelBySources(sources);
        _load(lastPlayPosition || 0);
    };
    that.load = function (sources_) {
        OvenPlayerConsole.log("CORE : load() ", sources_);
        sources = sources_;
        setQualityLevelBySources(sources);
        _load(sources_.starttime || 0);
    };

    that.play = function () {
        OvenPlayerConsole.log("CORE : play() ");
        if (that.getState() !== _constants.STATE_PLAYING) {
            elVideo.play();
        }
    };
    that.pause = function () {
        OvenPlayerConsole.log("CORE : pause() ");
        if (that.getState() == _constants.STATE_PLAYING) {
            elVideo.pause();
        }
    };
    that.seek = function (position) {
        OvenPlayerConsole.log("CORE : seek() ", position);
        elVideo.currentTime = position;
    };
    that.setPlaybackRate = function (playbackRate) {
        that.trigger(_constants.PLAYBACK_RATE_CHANGED, { playbackRate: playbackRate });
        OvenPlayerConsole.log("CORE : setPlaybackRate() ", playbackRate);
        return elVideo.playbackRate = elVideo.defaultPlaybackRate = playbackRate;
    };
    that.getPlaybackRate = function () {
        OvenPlayerConsole.log("CORE : getPlaybackRate() ", elVideo.playbackRate);
        return elVideo.playbackRate;
    };
    that.getQualityLevels = function () {
        var getQualityLevel = function getQualityLevel(source) {
            return {
                bitrate: source.bitrate,
                label: source.label,
                width: source.width,
                height: source.height
            };
        };
        var qualityLevels = sources.map(function (source) {
            return getQualityLevel(source);
        });
        OvenPlayerConsole.log("CORE : getQualityLevels() ", qualityLevels);
        return qualityLevels;
    };
    that.getCurrentQuality = function () {
        OvenPlayerConsole.log("CORE : getCurrentQuality() ", currentQuality);
        return currentQuality;
    };
    that.setCurrentQuality = function (qualityIndex, needLoad) {
        OvenPlayerConsole.log("CORE : setCurrentQuality() ", qualityIndex, needLoad);
        if (currentQuality == qualityIndex) {
            return false;
        }
        if (qualityIndex > -1) {
            if (sources && sources.length > qualityIndex) {
                //that.pause();
                that.setState(_constants.STATE_IDLE);
                OvenPlayerConsole.log("source changed : " + qualityIndex);
                currentQuality = qualityIndex;

                that.trigger(_constants.CONTENT_LEVEL_CHANGED, {
                    currentQuality: qualityIndex
                });

                playerConfig.setQualityLabel(sources[qualityIndex].label);
                if (needLoad) {

                    _load(elVideo.currentTime || 0);
                }
                return currentQuality;
            }
        }
    };

    that.stop = function () {
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
        that.stop();
        listener.destroy();
        //elVideo.remove();
        that.off();
        OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied");
    };

    //XXX : This is es6. So we can't "prototype export". Finally I consider this method.
    that.super = function (name) {
        var method = that[name];
        return function () {
            return method.apply(that, arguments);
        };
    };
    return that;
};

exports.default = Core;

/***/ }),

/***/ "./src/js/api/provider/Listener.js":
/*!*****************************************!*\
  !*** ./src/js/api/provider/Listener.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

/**
 * @brief   Trigger on various video events.
 * @param   providerName child Provider Name
 * @param   extendedElement extended media object by mse.
 * @param   element elVideo  video
 * @param   Provider provider  html5Provider
 * */

var Listener = function Listener(providerName, extendedElement, elVideo, provider) {
    var lowLevelEvents = {};

    OvenPlayerConsole.log("EventListener loaded.");
    var that = {};
    var between = function between(num, min, max) {
        return Math.max(Math.min(num, max), min);
    };
    var onError = function onError(error) {
        provider.setState(_constants.STATE_ERROR);
        provider.pause();
        provider.trigger(_constants.ERROR, error);
    };

    //Fires when the browser can start playing the audio/video
    lowLevelEvents.canplay = function () {
        provider.setCanSeek(true);
        provider.trigger(_constants.CONTENT_BUFFER_FULL);
        OvenPlayerConsole.log("EventListener : on canplay");
    };
    //Fires when the duration of the audio/video is changed
    lowLevelEvents.durationchange = function () {
        lowLevelEvents.progress();
        OvenPlayerConsole.log("EventListener : on durationchange");
    };
    //Fires when the current playlist is ended
    lowLevelEvents.ended = function () {
        OvenPlayerConsole.log("EventListener : on ended");
        if (provider.getState() != _constants.STATE_IDLE && provider.getState() != _constants.STATE_COMPLETE) {
            provider.trigger(_constants.CONTENT_COMPLETE);
            provider.setState(_constants.STATE_COMPLETE);
        }
    };
    //Fires when the browser has loaded the current frame of the audio/video
    lowLevelEvents.loadeddata = function () {
        //Do nothing Because this causes chaos by loadedmetadata.
        /*
        var metadata = {
            duration: elVideo.duration,
            height: elVideo.videoHeight,
            width: elVideo.videoWidth
        };
        provider.trigger(CONTENT_META, metadata);*/
        OvenPlayerConsole.log("EventListener : on loadeddata");
    };
    //Fires when the browser has loaded meta data for the audio/video
    lowLevelEvents.loadedmetadata = function () {
        //ToDo : You consider hlsjs. But not now because we don't support hlsjs.
        var isLive = elVideo.duration == Infinity ? true : providerName === _constants.PROVIDER_DASH ? extendedElement.isDynamic() : false;
        var type = provider.getCurrentSource() ? provider.getCurrentSource().type : "";
        var metadata = {
            duration: isLive ? Infinity : elVideo.duration,
            type: type
        };
        //provider.setLive(isLive);

        OvenPlayerConsole.log("EventListener : on loadedmetadata", metadata);
        provider.trigger(_constants.CONTENT_META, metadata);
    };
    //Fires when the audio/video has been paused
    lowLevelEvents.pause = function () {
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
    //Fires when the audio/video has been started or is no longer paused
    lowLevelEvents.play = function () {
        if (!elVideo.paused && provider.getState() !== _constants.STATE_PLAYING) {
            OvenPlayerConsole.log("EventListener : on play");
            provider.setState(_constants.STATE_LOADING);
        }
    };
    //Fires when the audio/video is playing after having been paused or stopped for buffering
    lowLevelEvents.playing = function () {
        OvenPlayerConsole.log("EventListener : on playing");
        provider.setState(_constants.STATE_PLAYING);
        //provider.trigger(PROVIDER_FIRST_FRAME);
    };
    //Fires when the browser is downloading the audio/video
    lowLevelEvents.progress = function () {
        var timeRanges = elVideo.buffered;
        if (!timeRanges) {
            return false;
        }

        var duration = elVideo.duration,
            position = elVideo.currentTime;
        var buffered = between((timeRanges.length > 0 ? timeRanges.end(timeRanges.length - 1) : 0) / duration, 0, 1);

        OvenPlayerConsole.log("EventListener : on progress", buffered * 100);

        provider.setBuffer(buffered * 100);
        provider.trigger(_constants.CONTENT_BUFFER, {
            bufferPercent: buffered * 100,
            position: position,
            duration: duration
        });
    };
    //Fires when the browser is trying to get media data, but data is not available
    lowLevelEvents.stalled = function () {
        OvenPlayerConsole.log("EventListener : on stall");
    };
    //Fires when the current playback position has changed
    lowLevelEvents.timeupdate = function () {
        var position = elVideo.currentTime;
        var duration = elVideo.duration;
        if (isNaN(duration)) {
            return;
        }

        if (!provider.isSeeking() && !elVideo.paused) {
            provider.setState(_constants.STATE_PLAYING);
        }
        OvenPlayerConsole.log("EventListener : on timeupdate", {
            position: position,
            duration: duration
        });
        if (provider.getState() === _constants.STATE_PLAYING || provider.isSeeking()) {
            provider.trigger(_constants.CONTENT_TIME, {
                position: position,
                duration: duration
            });
        }
    };
    lowLevelEvents.resize = function () {
        OvenPlayerConsole.log("EventListener : on resize");
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

    //Fires when the video stops because it needs to buffer the next frame
    lowLevelEvents.waiting = function () {
        OvenPlayerConsole.log("EventListener : on waiting", provider.getState());
        if (provider.isSeeking()) {
            provider.setState(_constants.STATE_LOADING);
        } else if (provider.getState() == _constants.STATE_PLAYING) {
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
        var errorCodeGen = {
            0: { code: _constants.PLAYER_UNKNWON_ERROR, reason: "Unknown html5 video error", message: "Unknown html5 video error" },
            1: { code: _constants.PLAYER_UNKNWON_OPERATION_ERROR, reason: "Unknown operation aborted", message: "Unknown operation aborted" },
            2: { code: _constants.PLAYER_UNKNWON_NEWWORK_ERROR, reason: "Unknown network error", message: "Unknown network error" },
            3: { code: _constants.PLAYER_UNKNWON_DECODE_ERROR, reason: "Unknown decode error", message: "Unknown decode error" },
            4: { code: _constants.PLAYER_FILE_ERROR, reason: "File could not be played", message: "File could not be played" }
        }[code] || 0;
        errorCodeGen.error = elVideo.error;

        OvenPlayerConsole.log("EventListener : on error", errorCodeGen);
        onError(errorCodeGen);
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

exports.default = Listener;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL0NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9MaXN0ZW5lci5qcyJdLCJuYW1lcyI6WyJleHRyYWN0VmlkZW9FbGVtZW50IiwicHJvdmlkZXJOYW1lIiwiZXh0ZW5kZWRFbGVtZW50IiwiXyIsImlzRWxlbWVudCIsIlBST1ZJREVSX0RBU0giLCJnZXRWaWRlb0VsZW1lbnQiLCJQUk9WSURFUl9ITFMiLCJtZWRpYSIsIkNvcmUiLCJwbGF5ZXJDb25maWciLCJvbkxvYWQiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsInRoYXQiLCJvbiIsIkV2ZW50cyIsIm9uY2UiLCJvZmYiLCJ0cmlnZ2VyIiwiZWxWaWRlbyIsImxpc3RlbmVyIiwiY2FuU2VlayIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJjdXJyZW50UXVhbGl0eSIsInNvdXJjZXMiLCJwb3N0ZXJJbWFnZSIsImdldENvbmZpZyIsImltYWdlIiwicGxheWJhY2tSYXRlIiwiZGVmYXVsdFBsYXliYWNrUmF0ZSIsImdldERlZmF1bHRQbGF5YmFja1JhdGUiLCJzZXRRdWFsaXR5TGV2ZWxCeVNvdXJjZXMiLCJwaWNrUXVhbGl0eSIsInF1YWxpdHkiLCJNYXRoIiwibWF4IiwibGFiZWwiLCJpIiwibGVuZ3RoIiwiZGVmYXVsdCIsImdldFF1YWxpdHlMYWJlbCIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsInByZXZpb3VzU291cmNlIiwic3JjIiwic291cmNlRWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImZpbGUiLCJzb3VyY2VDaGFuZ2VkIiwibG9hZCIsImN1cnJlbnRUaW1lIiwic2VlayIsInBsYXkiLCJDT05URU5UX0xFVkVMUyIsInBvc3RlciIsImdldEN1cnJlbnRTb3VyY2UiLCJzZXRDYW5TZWVrIiwiY2FuU2Vla18iLCJpc1NlZWtpbmciLCJzZXRTZWVraW5nIiwic2Vla2luZ18iLCJzZXRQbGF5ZXJFbGVtZW50IiwiZWxlbWVudCIsInNldFN0YXRlIiwibmV3U3RhdGUiLCJwcmV2U3RhdGUiLCJTVEFURV9DT01QTEVURSIsIlBMQVlFUl9DT01QTEVURSIsIlNUQVRFX1BBVVNFRCIsIlBMQVlFUl9QQVVTRSIsIlNUQVRFX1BMQVlJTkciLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld3N0YXRlIiwiZ2V0U3RhdGUiLCJzZXRCdWZmZXIiLCJuZXdCdWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsImlzTGl2ZSIsImR1cmF0aW9uIiwiSW5maW5pdHkiLCJpc0R5bmFtaWMiLCJnZXRQb3NpdGlvbiIsInNldFZvbHVtZSIsInZvbHVtZSIsImdldFZvbHVtZSIsInNldE11dGUiLCJtdXRlZCIsIkNPTlRFTlRfTVVURSIsIm11dGUiLCJnZXRNdXRlIiwicHJlbG9hZCIsInNvdXJjZXNfIiwic3RhcnR0aW1lIiwicGF1c2UiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsImdldFBsYXliYWNrUmF0ZSIsImdldFF1YWxpdHlMZXZlbHMiLCJnZXRRdWFsaXR5TGV2ZWwiLCJiaXRyYXRlIiwid2lkdGgiLCJoZWlnaHQiLCJxdWFsaXR5TGV2ZWxzIiwibWFwIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsIm5lZWRMb2FkIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwic2V0UXVhbGl0eUxhYmVsIiwic3RvcCIsInJlbW92ZUF0dHJpYnV0ZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImRlc3Ryb3kiLCJzdXBlciIsIm5hbWUiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyIsIkxpc3RlbmVyIiwicHJvdmlkZXIiLCJsb3dMZXZlbEV2ZW50cyIsImJldHdlZW4iLCJudW0iLCJtaW4iLCJvbkVycm9yIiwiZXJyb3IiLCJTVEFURV9FUlJPUiIsIkVSUk9SIiwiY2FucGxheSIsIkNPTlRFTlRfQlVGRkVSX0ZVTEwiLCJkdXJhdGlvbmNoYW5nZSIsInByb2dyZXNzIiwiZW5kZWQiLCJDT05URU5UX0NPTVBMRVRFIiwibG9hZGVkZGF0YSIsImxvYWRlZG1ldGFkYXRhIiwidHlwZSIsIm1ldGFkYXRhIiwiQ09OVEVOVF9NRVRBIiwicGF1c2VkIiwiU1RBVEVfTE9BRElORyIsInBsYXlpbmciLCJ0aW1lUmFuZ2VzIiwiYnVmZmVyZWQiLCJlbmQiLCJDT05URU5UX0JVRkZFUiIsImJ1ZmZlclBlcmNlbnQiLCJzdGFsbGVkIiwidGltZXVwZGF0ZSIsImlzTmFOIiwiQ09OVEVOVF9USU1FIiwicmVzaXplIiwiQ09OVEVOVF9TRUVLIiwic2Vla2VkIiwiQ09OVEVOVF9TRUVLRUQiLCJ3YWl0aW5nIiwiU1RBVEVfU1RBTExFRCIsInZvbHVtZWNoYW5nZSIsInJvdW5kIiwiQ09OVEVOVF9WT0xVTUUiLCJjb2RlIiwiZXJyb3JDb2RlR2VuIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZlbnROYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7a1FBQUE7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQU1BOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLHNCQUFzQixTQUF0QkEsbUJBQXNCLENBQVNDLFlBQVQsRUFBdUJDLGVBQXZCLEVBQXVDO0FBQzdELFFBQUdDLHFCQUFFQyxTQUFGLENBQVlGLGVBQVosQ0FBSCxFQUFnQztBQUM1QixlQUFPQSxlQUFQO0FBQ0g7QUFDRCxRQUFHRCxpQkFBaUJJLHdCQUFwQixFQUFrQztBQUM5QixlQUFPSCxnQkFBZ0JJLGVBQWhCLEVBQVA7QUFDSCxLQUZELE1BRU0sSUFBR0wsaUJBQWlCTSx1QkFBcEIsRUFBaUM7QUFDbkMsZUFBT0wsZ0JBQWdCTSxLQUF2QjtBQUNIO0FBQ0QsV0FBTyxJQUFQO0FBQ0gsQ0FWRDs7QUFZQTs7Ozs7OztBQU9BLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFVUixZQUFWLEVBQXdCQyxlQUF4QixFQUF5Q1EsWUFBekMsRUFBdURDLE1BQXZELEVBQThEO0FBQ3ZFQyxzQkFBa0JDLEdBQWxCLENBQXNCLGVBQXRCOztBQUVBLFFBQUlDLE9BQU8sU0FBYztBQUNyQkMsWUFBSUMsaUJBQU9ELEVBRFU7QUFFckJFLGNBQU1ELGlCQUFPQyxJQUZRO0FBR3JCQyxhQUFLRixpQkFBT0UsR0FIUztBQUlyQkMsaUJBQVNILGlCQUFPRztBQUpLLEtBQWQsQ0FBWDs7QUFRQSxRQUFJQyxVQUFVcEIsb0JBQW9CQyxZQUFwQixFQUFrQ0MsZUFBbEMsQ0FBZDtBQUNBLFFBQUltQixXQUFXLHdCQUFlcEIsWUFBZixFQUE2QkMsZUFBN0IsRUFBOENrQixPQUE5QyxFQUF1RE4sSUFBdkQsQ0FBZjtBQUNBLFFBQUlRLFVBQVUsS0FBZDtBQUNBLFFBQUlDLFVBQVUsS0FBZDtBQUNBLFFBQUlDLFFBQVFDLHFCQUFaO0FBQ0EsUUFBSUMsU0FBUyxDQUFiO0FBQ0EsUUFBSUMsaUJBQWlCLENBQUMsQ0FBdEI7QUFDQSxRQUFJQyxVQUFVLEVBQWQ7QUFDQTs7QUFFQSxRQUFJQyxjQUFjbkIsYUFBYW9CLFNBQWIsR0FBeUJDLEtBQXpCLElBQWdDLEVBQWxEO0FBQ0FYLFlBQVFZLFlBQVIsR0FBdUJaLFFBQVFhLG1CQUFSLEdBQThCdkIsYUFBYXdCLHNCQUFiLEVBQXJEOztBQUVBLFFBQU1DLDJCQUEyQixTQUEzQkEsd0JBQTJCLENBQUNQLE9BQUQsRUFBWTtBQUN6QyxZQUFNUSxjQUFjLFNBQWRBLFdBQWMsQ0FBQ1IsT0FBRCxFQUFZO0FBQzVCLGdCQUFJUyxVQUFVQyxLQUFLQyxHQUFMLENBQVMsQ0FBVCxFQUFZWixjQUFaLENBQWQ7QUFDQSxnQkFBTWEsUUFBTyxFQUFiO0FBQ0EsZ0JBQUlaLE9BQUosRUFBYTtBQUNULHFCQUFLLElBQUlhLElBQUksQ0FBYixFQUFnQkEsSUFBSWIsUUFBUWMsTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLHdCQUFJYixRQUFRYSxDQUFSLEVBQVdFLE9BQWYsRUFBd0I7QUFDcEJOLGtDQUFVSSxDQUFWO0FBQ0g7QUFDRCx3QkFBSS9CLGFBQWFrQyxlQUFiLE1BQWtDaEIsUUFBUWEsQ0FBUixFQUFXRCxLQUFYLEtBQXFCOUIsYUFBYWtDLGVBQWIsRUFBM0QsRUFBNEY7QUFDeEYsK0JBQU9ILENBQVA7QUFDSDtBQUNKO0FBQ0o7QUFDRCxtQkFBT0osT0FBUDtBQUNILFNBZEQ7O0FBZ0JBVix5QkFBaUJTLFlBQVlSLE9BQVosQ0FBakI7QUFDSCxLQWxCRDs7QUFvQkEsUUFBTWlCLFFBQVEsU0FBUkEsS0FBUSxDQUFDQyxnQkFBRCxFQUFxQjtBQUMvQixZQUFNQyxTQUFVbkIsUUFBUUQsY0FBUixDQUFoQjtBQUNBLFlBQUdoQixNQUFILEVBQVU7QUFDTkEsbUJBQU9vQyxNQUFQLEVBQWVELGdCQUFmO0FBQ0gsU0FGRCxNQUVLO0FBQ0RsQyw4QkFBa0JDLEdBQWxCLENBQXNCLGtCQUF0QixFQUEwQ2tDLE1BQTFDLEVBQWtELHdCQUF1QkQsZ0JBQXpFO0FBQ0EsZ0JBQUlFLGlCQUFpQjVCLFFBQVE2QixHQUE3QjtBQUNBLGdCQUFNQyxnQkFBZ0JDLFNBQVNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdEI7O0FBRUFGLDBCQUFjRCxHQUFkLEdBQW9CRixPQUFPTSxJQUEzQjtBQUNBLGdCQUFNQyxnQkFBaUJKLGNBQWNELEdBQWQsS0FBc0JELGNBQTdDO0FBQ0EsZ0JBQUlNLGFBQUosRUFBbUI7QUFDZmxDLHdCQUFRNkIsR0FBUixHQUFjckIsUUFBUUQsY0FBUixFQUF3QjBCLElBQXRDO0FBQ0E7QUFDQSxvQkFBSUwsY0FBSixFQUFvQjtBQUNoQjVCLDRCQUFRbUMsSUFBUjtBQUNIO0FBQ0osYUFORCxNQU1NLElBQUdULG9CQUFvQixDQUFwQixJQUF5QjFCLFFBQVFvQyxXQUFSLEdBQXNCLENBQWxELEVBQW9EO0FBQ3REMUMscUJBQUsyQyxJQUFMLENBQVVYLGdCQUFWO0FBQ0g7QUFDRCxnQkFBR0EsbUJBQW1CLENBQXRCLEVBQXdCO0FBQ3BCaEMscUJBQUsyQyxJQUFMLENBQVVYLGdCQUFWO0FBQ0FoQyxxQkFBSzRDLElBQUw7QUFDSDtBQUNENUMsaUJBQUtLLE9BQUwsQ0FBYXdDLHlCQUFiLEVBQTZCO0FBQ3pCaEMsZ0NBQWdCQTtBQURTLGFBQTdCOztBQUlBLGdCQUFHRSxXQUFILEVBQWU7QUFDWFQsd0JBQVF3QyxNQUFSLEdBQWlCL0IsV0FBakI7QUFDSDtBQUNKO0FBQ0osS0FoQ0Q7O0FBbUNBZixTQUFLK0MsZ0JBQUwsR0FBd0IsWUFBTTtBQUMxQmpELDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCLEVBQW9EZSxRQUFRRCxjQUFSLENBQXBEO0FBQ0EsZUFBT0MsUUFBUUQsY0FBUixDQUFQO0FBQ0gsS0FIRDs7QUFLQWIsU0FBS1EsT0FBTCxHQUFlLFlBQU07QUFBRVYsMEJBQWtCQyxHQUFsQixDQUFzQixtQkFBdEIsRUFBMkNTLE9BQTNDLEVBQXFELE9BQU9BLE9BQVA7QUFBZ0IsS0FBNUY7QUFDQVIsU0FBS2dELFVBQUwsR0FBa0IsVUFBQ0MsUUFBRCxFQUFjO0FBQUduRCwwQkFBa0JDLEdBQWxCLENBQXNCLHNCQUF0QixFQUE4Q2tELFFBQTlDLEVBQTBEekMsVUFBVXlDLFFBQVY7QUFBcUIsS0FBbEg7O0FBRUFqRCxTQUFLa0QsU0FBTCxHQUFpQixZQUFJO0FBQUNwRCwwQkFBa0JDLEdBQWxCLENBQXNCLHFCQUF0QixFQUE2Q1UsT0FBN0MsRUFBdUQsT0FBT0EsT0FBUDtBQUFnQixLQUE3RjtBQUNBVCxTQUFLbUQsVUFBTCxHQUFrQixVQUFDQyxRQUFELEVBQVk7QUFBRXRELDBCQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXRCLEVBQThDcUQsUUFBOUMsRUFBeUQzQyxVQUFVMkMsUUFBVjtBQUFvQixLQUE3Rzs7QUFFQTtBQUNBOztBQUVBcEQsU0FBS3FELGdCQUFMLEdBQXdCLFVBQUNDLE9BQUQsRUFBYTtBQUNqQ3hELDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCLEVBQW9EdUQsT0FBcEQ7QUFDQWhELGtCQUFVZ0QsT0FBVjtBQUNILEtBSEQ7O0FBS0F0RCxTQUFLdUQsUUFBTCxHQUFnQixVQUFDQyxRQUFELEVBQWM7QUFDMUIsWUFBRzlDLFNBQVM4QyxRQUFaLEVBQXFCO0FBQ2pCLGdCQUFJQyxZQUFZL0MsS0FBaEI7QUFDQSxvQkFBTzhDLFFBQVA7QUFDSSxxQkFBS0UseUJBQUw7QUFDSTFELHlCQUFLSyxPQUFMLENBQWFzRCwwQkFBYjtBQUNBO0FBQ0oscUJBQUtDLHVCQUFMO0FBQ0k1RCx5QkFBS0ssT0FBTCxDQUFhd0QsdUJBQWIsRUFBMkI7QUFDdkJKLG1DQUFXL0M7QUFEWSxxQkFBM0I7QUFHQTtBQUNKLHFCQUFLb0Qsd0JBQUw7QUFDSTlELHlCQUFLSyxPQUFMLENBQWEwRCxzQkFBYixFQUEwQjtBQUN0Qk4sbUNBQVcvQztBQURXLHFCQUExQjtBQUdBO0FBYlI7QUFlQUEsb0JBQU84QyxRQUFQO0FBQ0ExRCw4QkFBa0JDLEdBQWxCLENBQXNCLG9CQUF0QixFQUE0Q1csS0FBNUM7QUFDQVYsaUJBQUtLLE9BQUwsQ0FBYTJELHVCQUFiLEVBQTJCO0FBQ3ZCQywyQkFBV1IsU0FEWTtBQUV2QlMsMEJBQVV4RDtBQUZhLGFBQTNCO0FBSUg7QUFDSixLQXpCRDtBQTBCQVYsU0FBS21FLFFBQUwsR0FBZ0IsWUFBSztBQUNqQnJFLDBCQUFrQkMsR0FBbEIsQ0FBc0Isb0JBQXRCLEVBQTRDVyxLQUE1QztBQUNBLGVBQU9BLEtBQVA7QUFDSCxLQUhEO0FBSUFWLFNBQUtvRSxTQUFMLEdBQWlCLFVBQUNDLFNBQUQsRUFBZTtBQUM1QnZFLDBCQUFrQkMsR0FBbEIsQ0FBc0IscUJBQXRCLEVBQTZDc0UsU0FBN0M7QUFDQXpELGlCQUFTeUQsU0FBVDtBQUNILEtBSEQ7QUFJQXJFLFNBQUtzRSxTQUFMLEdBQWlCLFlBQU07QUFDbkJ4RSwwQkFBa0JDLEdBQWxCLENBQXNCLHFCQUF0QixFQUE2Q2EsTUFBN0M7QUFDQSxlQUFPQSxNQUFQO0FBQ0gsS0FIRDtBQUlBWixTQUFLdUUsV0FBTCxHQUFtQixZQUFNO0FBQ3JCO0FBQ0EsWUFBSUMsU0FBVWxFLFFBQVFtRSxRQUFSLElBQW9CQyxRQUFwQixHQUE4QixJQUE5QixHQUFzQ3ZGLGlCQUFpQkksd0JBQWpCLEdBQWdDSCxnQkFBZ0J1RixTQUFoQixFQUFoQyxHQUE4RCxLQUFsSDtBQUNBN0UsMEJBQWtCQyxHQUFsQixDQUFzQix1QkFBdEIsRUFBK0N5RSxTQUFVRSxRQUFWLEdBQXFCcEUsUUFBUW1FLFFBQTVFO0FBQ0EsZUFBT0QsU0FBVUUsUUFBVixHQUFxQnBFLFFBQVFtRSxRQUFwQztBQUNILEtBTEQ7QUFNQXpFLFNBQUs0RSxXQUFMLEdBQW1CLFlBQU07QUFDckI5RSwwQkFBa0JDLEdBQWxCLENBQXNCLHVCQUF0QixFQUErQ08sUUFBUW9DLFdBQXZEO0FBQ0EsZUFBT3BDLFFBQVFvQyxXQUFmO0FBQ0gsS0FIRDtBQUlBMUMsU0FBSzZFLFNBQUwsR0FBaUIsVUFBQ0MsTUFBRCxFQUFXO0FBQ3hCaEYsMEJBQWtCQyxHQUFsQixDQUFzQixxQkFBdEIsRUFBNkMrRSxNQUE3QztBQUNBeEUsZ0JBQVF3RSxNQUFSLEdBQWlCQSxTQUFPLEdBQXhCO0FBQ0gsS0FIRDtBQUlBOUUsU0FBSytFLFNBQUwsR0FBaUIsWUFBSztBQUNsQmpGLDBCQUFrQkMsR0FBbEIsQ0FBc0IscUJBQXRCLEVBQTZDTyxRQUFRd0UsTUFBUixHQUFlLEdBQTVEO0FBQ0EsZUFBT3hFLFFBQVF3RSxNQUFSLEdBQWUsR0FBdEI7QUFDSCxLQUhEO0FBSUE5RSxTQUFLZ0YsT0FBTCxHQUFlLFVBQUN0RSxLQUFELEVBQVU7O0FBRXJCLFlBQUksT0FBT0EsS0FBUCxLQUFpQixXQUFyQixFQUFrQzs7QUFFOUJKLG9CQUFRMkUsS0FBUixHQUFnQixDQUFDM0UsUUFBUTJFLEtBQXpCOztBQUVBakYsaUJBQUtLLE9BQUwsQ0FBYTZFLHVCQUFiLEVBQTJCO0FBQ3ZCQyxzQkFBTTdFLFFBQVEyRTtBQURTLGFBQTNCO0FBSUgsU0FSRCxNQVFPOztBQUVIM0Usb0JBQVEyRSxLQUFSLEdBQWdCdkUsS0FBaEI7O0FBRUFWLGlCQUFLSyxPQUFMLENBQWE2RSx1QkFBYixFQUEyQjtBQUN2QkMsc0JBQU03RSxRQUFRMkU7QUFEUyxhQUEzQjtBQUdIO0FBQ0RuRiwwQkFBa0JDLEdBQWxCLENBQXNCLG1CQUF0QixFQUEyQ08sUUFBUTJFLEtBQW5EO0FBQ0EsZUFBTzNFLFFBQVEyRSxLQUFmO0FBQ0gsS0FwQkQ7QUFxQkFqRixTQUFLb0YsT0FBTCxHQUFlLFlBQUs7QUFDaEJ0RiwwQkFBa0JDLEdBQWxCLENBQXNCLG1CQUF0QixFQUEyQ08sUUFBUTJFLEtBQW5EO0FBQ0EsZUFBTzNFLFFBQVEyRSxLQUFmO0FBQ0gsS0FIRDs7QUFLQWpGLFNBQUtxRixPQUFMLEdBQWUsVUFBQ0MsUUFBRCxFQUFXdEQsZ0JBQVgsRUFBK0I7QUFDMUNsQywwQkFBa0JDLEdBQWxCLENBQXNCLG1CQUF0QixFQUEyQ3VGLFFBQTNDLEVBQXFEdEQsZ0JBQXJEO0FBQ0FsQixrQkFBVXdFLFFBQVY7QUFDQWpFLGlDQUF5QlAsT0FBekI7QUFDQWlCLGNBQU1DLG9CQUFvQixDQUExQjtBQUNILEtBTEQ7QUFNQWhDLFNBQUt5QyxJQUFMLEdBQVksVUFBQzZDLFFBQUQsRUFBYTtBQUNyQnhGLDBCQUFrQkMsR0FBbEIsQ0FBc0IsZ0JBQXRCLEVBQXdDdUYsUUFBeEM7QUFDQXhFLGtCQUFVd0UsUUFBVjtBQUNBakUsaUNBQXlCUCxPQUF6QjtBQUNBaUIsY0FBTXVELFNBQVNDLFNBQVQsSUFBc0IsQ0FBNUI7QUFDSCxLQUxEOztBQU9BdkYsU0FBSzRDLElBQUwsR0FBWSxZQUFLO0FBQ2I5QywwQkFBa0JDLEdBQWxCLENBQXNCLGdCQUF0QjtBQUNBLFlBQUlDLEtBQUttRSxRQUFMLE9BQW9CTCx3QkFBeEIsRUFBc0M7QUFDbEN4RCxvQkFBUXNDLElBQVI7QUFDSDtBQUNKLEtBTEQ7QUFNQTVDLFNBQUt3RixLQUFMLEdBQWEsWUFBSztBQUNkMUYsMEJBQWtCQyxHQUFsQixDQUFzQixpQkFBdEI7QUFDQSxZQUFJQyxLQUFLbUUsUUFBTCxNQUFtQkwsd0JBQXZCLEVBQXFDO0FBQ2pDeEQsb0JBQVFrRixLQUFSO0FBQ0g7QUFDSixLQUxEO0FBTUF4RixTQUFLMkMsSUFBTCxHQUFZLFVBQUM4QyxRQUFELEVBQWE7QUFDckIzRiwwQkFBa0JDLEdBQWxCLENBQXNCLGdCQUF0QixFQUF3QzBGLFFBQXhDO0FBQ0FuRixnQkFBUW9DLFdBQVIsR0FBc0IrQyxRQUF0QjtBQUNILEtBSEQ7QUFJQXpGLFNBQUswRixlQUFMLEdBQXVCLFVBQUN4RSxZQUFELEVBQWlCO0FBQ3BDbEIsYUFBS0ssT0FBTCxDQUFhc0YsZ0NBQWIsRUFBb0MsRUFBQ3pFLGNBQWVBLFlBQWhCLEVBQXBDO0FBQ0FwQiwwQkFBa0JDLEdBQWxCLENBQXNCLDJCQUF0QixFQUFtRG1CLFlBQW5EO0FBQ0EsZUFBT1osUUFBUVksWUFBUixHQUF1QlosUUFBUWEsbUJBQVIsR0FBOEJELFlBQTVEO0FBQ0gsS0FKRDtBQUtBbEIsU0FBSzRGLGVBQUwsR0FBdUIsWUFBSztBQUN4QjlGLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMkJBQXRCLEVBQW1ETyxRQUFRWSxZQUEzRDtBQUNBLGVBQU9aLFFBQVFZLFlBQWY7QUFDSCxLQUhEO0FBSUFsQixTQUFLNkYsZ0JBQUwsR0FBd0IsWUFBTTtBQUMxQixZQUFJQyxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQVM3RCxNQUFULEVBQWlCO0FBQ25DLG1CQUFPO0FBQ0g4RCx5QkFBUzlELE9BQU84RCxPQURiO0FBRUhyRSx1QkFBT08sT0FBT1AsS0FGWDtBQUdIc0UsdUJBQU8vRCxPQUFPK0QsS0FIWDtBQUlIQyx3QkFBUWhFLE9BQU9nRTtBQUpaLGFBQVA7QUFNSCxTQVBEO0FBUUEsWUFBSUMsZ0JBQWdCcEYsUUFBUXFGLEdBQVIsQ0FBWSxVQUFTbEUsTUFBVCxFQUFnQjtBQUFDLG1CQUFPNkQsZ0JBQWdCN0QsTUFBaEIsQ0FBUDtBQUErQixTQUE1RCxDQUFwQjtBQUNBbkMsMEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEIsRUFBb0RtRyxhQUFwRDtBQUNBLGVBQU9BLGFBQVA7QUFDSCxLQVpEO0FBYUFsRyxTQUFLb0csaUJBQUwsR0FBeUIsWUFBTTtBQUMzQnRHLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNkJBQXRCLEVBQXFEYyxjQUFyRDtBQUNBLGVBQU9BLGNBQVA7QUFDSCxLQUhEO0FBSUFiLFNBQUtxRyxpQkFBTCxHQUF5QixVQUFDQyxZQUFELEVBQWVDLFFBQWYsRUFBNEI7QUFDakR6RywwQkFBa0JDLEdBQWxCLENBQXNCLDZCQUF0QixFQUFxRHVHLFlBQXJELEVBQW1FQyxRQUFuRTtBQUNBLFlBQUcxRixrQkFBa0J5RixZQUFyQixFQUFrQztBQUM5QixtQkFBTyxLQUFQO0FBQ0g7QUFDRCxZQUFHQSxlQUFlLENBQUMsQ0FBbkIsRUFBcUI7QUFDakIsZ0JBQUd4RixXQUFXQSxRQUFRYyxNQUFSLEdBQWlCMEUsWUFBL0IsRUFBNEM7QUFDeEM7QUFDQXRHLHFCQUFLdUQsUUFBTCxDQUFjNUMscUJBQWQ7QUFDQWIsa0NBQWtCQyxHQUFsQixDQUFzQixzQkFBc0J1RyxZQUE1QztBQUNBekYsaUNBQWlCeUYsWUFBakI7O0FBRUF0RyxxQkFBS0ssT0FBTCxDQUFhbUcsZ0NBQWIsRUFBb0M7QUFDaEMzRixvQ0FBZ0J5RjtBQURnQixpQkFBcEM7O0FBSUExRyw2QkFBYTZHLGVBQWIsQ0FBNkIzRixRQUFRd0YsWUFBUixFQUFzQjVFLEtBQW5EO0FBQ0Esb0JBQUc2RSxRQUFILEVBQVk7O0FBRVJ4RSwwQkFBTXpCLFFBQVFvQyxXQUFSLElBQXVCLENBQTdCO0FBQ0g7QUFDRCx1QkFBTzdCLGNBQVA7QUFDSDtBQUNKO0FBQ0osS0F4QkQ7O0FBMEJBYixTQUFLMEcsSUFBTCxHQUFZLFlBQUs7QUFDYjVHLDBCQUFrQkMsR0FBbEIsQ0FBc0IsZ0JBQXRCO0FBQ0FPLGdCQUFRcUcsZUFBUixDQUF3QixTQUF4QjtBQUNBckcsZ0JBQVFxRyxlQUFSLENBQXdCLEtBQXhCO0FBQ0EsZUFBT3JHLFFBQVFzRyxVQUFmLEVBQTJCO0FBQ3ZCdEcsb0JBQVF1RyxXQUFSLENBQW9CdkcsUUFBUXNHLFVBQTVCO0FBQ0g7QUFDRDVHLGFBQUt3RixLQUFMO0FBQ0F4RixhQUFLdUQsUUFBTCxDQUFjNUMscUJBQWQ7QUFDSCxLQVREOztBQVdBWCxTQUFLOEcsT0FBTCxHQUFlLFlBQUs7QUFDaEI5RyxhQUFLMEcsSUFBTDtBQUNBbkcsaUJBQVN1RyxPQUFUO0FBQ0E7QUFDQTlHLGFBQUtJLEdBQUw7QUFDQU4sMEJBQWtCQyxHQUFsQixDQUFzQix5REFBdEI7QUFDSCxLQU5EOztBQVFBO0FBQ0FDLFNBQUsrRyxLQUFMLEdBQWEsVUFBQ0MsSUFBRCxFQUFVO0FBQ25CLFlBQU1DLFNBQVNqSCxLQUFLZ0gsSUFBTCxDQUFmO0FBQ0EsZUFBTyxZQUFVO0FBQ2IsbUJBQU9DLE9BQU9DLEtBQVAsQ0FBYWxILElBQWIsRUFBbUJtSCxTQUFuQixDQUFQO0FBQ0gsU0FGRDtBQUdILEtBTEQ7QUFNQSxXQUFPbkgsSUFBUDtBQUVILENBalNEOztrQkFtU2VMLEk7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BVZjs7QUE2QkE7Ozs7Ozs7O0FBUUEsSUFBTXlILFdBQVcsU0FBWEEsUUFBVyxDQUFTakksWUFBVCxFQUF1QkMsZUFBdkIsRUFBd0NrQixPQUF4QyxFQUFpRCtHLFFBQWpELEVBQTBEO0FBQ3ZFLFFBQU1DLGlCQUFpQixFQUF2Qjs7QUFFQXhILHNCQUFrQkMsR0FBbEIsQ0FBc0IsdUJBQXRCO0FBQ0EsUUFBTUMsT0FBTyxFQUFiO0FBQ0EsUUFBTXVILFVBQVUsU0FBVkEsT0FBVSxDQUFVQyxHQUFWLEVBQWVDLEdBQWYsRUFBb0JoRyxHQUFwQixFQUF5QjtBQUNyQyxlQUFPRCxLQUFLQyxHQUFMLENBQVNELEtBQUtpRyxHQUFMLENBQVNELEdBQVQsRUFBYy9GLEdBQWQsQ0FBVCxFQUE2QmdHLEdBQTdCLENBQVA7QUFDSCxLQUZEO0FBR0EsUUFBTUMsVUFBVSxTQUFWQSxPQUFVLENBQVNDLEtBQVQsRUFBZTtBQUMzQk4saUJBQVM5RCxRQUFULENBQWtCcUUsc0JBQWxCO0FBQ0FQLGlCQUFTN0IsS0FBVDtBQUNBNkIsaUJBQVNoSCxPQUFULENBQWlCd0gsZ0JBQWpCLEVBQXdCRixLQUF4QjtBQUNILEtBSkQ7O0FBTUE7QUFDQUwsbUJBQWVRLE9BQWYsR0FBeUIsWUFBTTtBQUMzQlQsaUJBQVNyRSxVQUFULENBQW9CLElBQXBCO0FBQ0FxRSxpQkFBU2hILE9BQVQsQ0FBaUIwSCw4QkFBakI7QUFDQWpJLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCO0FBQ0gsS0FKRDtBQUtBO0FBQ0F1SCxtQkFBZVUsY0FBZixHQUFnQyxZQUFNO0FBQ2xDVix1QkFBZVcsUUFBZjtBQUNBbkksMEJBQWtCQyxHQUFsQixDQUFzQixtQ0FBdEI7QUFDSCxLQUhEO0FBSUE7QUFDQXVILG1CQUFlWSxLQUFmLEdBQXVCLFlBQU07QUFDekJwSSwwQkFBa0JDLEdBQWxCLENBQXNCLDBCQUF0QjtBQUNBLFlBQUdzSCxTQUFTbEQsUUFBVCxNQUF1QnhELHFCQUF2QixJQUFxQzBHLFNBQVNsRCxRQUFULE1BQXVCVCx5QkFBL0QsRUFBOEU7QUFDMUUyRCxxQkFBU2hILE9BQVQsQ0FBaUI4SCwyQkFBakI7QUFDQWQscUJBQVM5RCxRQUFULENBQWtCRyx5QkFBbEI7QUFDSDtBQUNKLEtBTkQ7QUFPQTtBQUNBNEQsbUJBQWVjLFVBQWYsR0FBNEIsWUFBTTtBQUM5QjtBQUNBOzs7Ozs7O0FBT0F0SSwwQkFBa0JDLEdBQWxCLENBQXNCLCtCQUF0QjtBQUNILEtBVkQ7QUFXQTtBQUNBdUgsbUJBQWVlLGNBQWYsR0FBZ0MsWUFBTTtBQUNsQztBQUNBLFlBQUk3RCxTQUFVbEUsUUFBUW1FLFFBQVIsSUFBb0JDLFFBQXBCLEdBQThCLElBQTlCLEdBQXNDdkYsaUJBQWlCSSx3QkFBakIsR0FBZ0NILGdCQUFnQnVGLFNBQWhCLEVBQWhDLEdBQThELEtBQWxIO0FBQ0EsWUFBSTJELE9BQU9qQixTQUFTdEUsZ0JBQVQsS0FBOEJzRSxTQUFTdEUsZ0JBQVQsR0FBNEJ1RixJQUExRCxHQUFpRSxFQUE1RTtBQUNBLFlBQUlDLFdBQVc7QUFDWDlELHNCQUFVRCxTQUFVRSxRQUFWLEdBQXFCcEUsUUFBUW1FLFFBRDVCO0FBRVg2RCxrQkFBTUE7QUFGSyxTQUFmO0FBSUE7O0FBRUF4SSwwQkFBa0JDLEdBQWxCLENBQXNCLG1DQUF0QixFQUEyRHdJLFFBQTNEO0FBQ0FsQixpQkFBU2hILE9BQVQsQ0FBaUJtSSx1QkFBakIsRUFBK0JELFFBQS9CO0FBQ0gsS0FaRDtBQWFBO0FBQ0FqQixtQkFBZTlCLEtBQWYsR0FBdUIsWUFBTTtBQUN6QixZQUFHNkIsU0FBU2xELFFBQVQsT0FBd0JULHlCQUF4QixJQUF5QzJELFNBQVNsRCxRQUFULE9BQXdCeUQsc0JBQXBFLEVBQWdGO0FBQzVFLG1CQUFPLEtBQVA7QUFDSDtBQUNELFlBQUd0SCxRQUFRNEgsS0FBWCxFQUFpQjtBQUNiLG1CQUFPLEtBQVA7QUFDSDtBQUNELFlBQUc1SCxRQUFRcUgsS0FBWCxFQUFpQjtBQUNiLG1CQUFPLEtBQVA7QUFDSDtBQUNELFlBQUdySCxRQUFRb0MsV0FBUixLQUF3QnBDLFFBQVFtRSxRQUFuQyxFQUE0QztBQUN4QyxtQkFBTyxLQUFQO0FBQ0g7QUFDRDNFLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMEJBQXRCO0FBQ0FzSCxpQkFBUzlELFFBQVQsQ0FBa0JLLHVCQUFsQjtBQUNILEtBZkQ7QUFnQkE7QUFDQTBELG1CQUFlMUUsSUFBZixHQUFzQixZQUFNO0FBQ3hCLFlBQUksQ0FBQ3RDLFFBQVFtSSxNQUFULElBQW1CcEIsU0FBU2xELFFBQVQsT0FBd0JMLHdCQUEvQyxFQUE4RDtBQUMxRGhFLDhCQUFrQkMsR0FBbEIsQ0FBc0IseUJBQXRCO0FBQ0FzSCxxQkFBUzlELFFBQVQsQ0FBa0JtRix3QkFBbEI7QUFDSDtBQUVKLEtBTkQ7QUFPQTtBQUNBcEIsbUJBQWVxQixPQUFmLEdBQXlCLFlBQU07QUFDM0I3SSwwQkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QjtBQUNBc0gsaUJBQVM5RCxRQUFULENBQWtCTyx3QkFBbEI7QUFDQTtBQUNILEtBSkQ7QUFLQTtBQUNBd0QsbUJBQWVXLFFBQWYsR0FBMEIsWUFBTTtBQUM1QixZQUFJVyxhQUFhdEksUUFBUXVJLFFBQXpCO0FBQ0EsWUFBRyxDQUFDRCxVQUFKLEVBQWdCO0FBQ1osbUJBQU8sS0FBUDtBQUNIOztBQUVELFlBQUluRSxXQUFXbkUsUUFBUW1FLFFBQXZCO0FBQUEsWUFBaUNnQixXQUFXbkYsUUFBUW9DLFdBQXBEO0FBQ0EsWUFBSW1HLFdBQVd0QixRQUFTLENBQUNxQixXQUFXaEgsTUFBWCxHQUFtQixDQUFuQixHQUF1QmdILFdBQVdFLEdBQVgsQ0FBZUYsV0FBV2hILE1BQVgsR0FBb0IsQ0FBbkMsQ0FBdkIsR0FBK0QsQ0FBaEUsSUFBc0U2QyxRQUEvRSxFQUF5RixDQUF6RixFQUE0RixDQUE1RixDQUFmOztBQUVBM0UsMEJBQWtCQyxHQUFsQixDQUFzQiw2QkFBdEIsRUFBcUQ4SSxXQUFTLEdBQTlEOztBQUVBeEIsaUJBQVNqRCxTQUFULENBQW1CeUUsV0FBUyxHQUE1QjtBQUNBeEIsaUJBQVNoSCxPQUFULENBQWlCMEkseUJBQWpCLEVBQWlDO0FBQzdCQywyQkFBZUgsV0FBUyxHQURLO0FBRTdCcEQsc0JBQVdBLFFBRmtCO0FBRzdCaEIsc0JBQVVBO0FBSG1CLFNBQWpDO0FBS0gsS0FqQkQ7QUFrQkE7QUFDQTZDLG1CQUFlMkIsT0FBZixHQUF5QixZQUFNO0FBQzNCbkosMEJBQWtCQyxHQUFsQixDQUFzQiwwQkFBdEI7QUFDSCxLQUZEO0FBR0E7QUFDQXVILG1CQUFlNEIsVUFBZixHQUE0QixZQUFNO0FBQzlCLFlBQU16RCxXQUFXbkYsUUFBUW9DLFdBQXpCO0FBQ0EsWUFBTStCLFdBQVduRSxRQUFRbUUsUUFBekI7QUFDQSxZQUFJMEUsTUFBTTFFLFFBQU4sQ0FBSixFQUFxQjtBQUNqQjtBQUNIOztBQUVELFlBQUcsQ0FBQzRDLFNBQVNuRSxTQUFULEVBQUQsSUFBeUIsQ0FBQzVDLFFBQVFtSSxNQUFyQyxFQUE0QztBQUN4Q3BCLHFCQUFTOUQsUUFBVCxDQUFrQk8sd0JBQWxCO0FBQ0g7QUFDRGhFLDBCQUFrQkMsR0FBbEIsQ0FBc0IsK0JBQXRCLEVBQXdEO0FBQ3BEMEYsc0JBQVVBLFFBRDBDO0FBRXBEaEIsc0JBQVVBO0FBRjBDLFNBQXhEO0FBSUEsWUFBSTRDLFNBQVNsRCxRQUFULE9BQXdCTCx3QkFBeEIsSUFBeUN1RCxTQUFTbkUsU0FBVCxFQUE3QyxFQUFtRTtBQUMvRG1FLHFCQUFTaEgsT0FBVCxDQUFpQitJLHVCQUFqQixFQUErQjtBQUMzQjNELDBCQUFVQSxRQURpQjtBQUUzQmhCLDBCQUFVQTtBQUZpQixhQUEvQjtBQUlIO0FBRUosS0FyQkQ7QUFzQkE2QyxtQkFBZStCLE1BQWYsR0FBd0IsWUFBTTtBQUMxQnZKLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMkJBQXRCO0FBQ0gsS0FGRDtBQUdBdUgsbUJBQWU3RyxPQUFmLEdBQXlCLFlBQU07QUFDM0I0RyxpQkFBU2xFLFVBQVQsQ0FBb0IsSUFBcEI7QUFDQXJELDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCLEVBQW9ETyxRQUFRb0MsV0FBNUQ7QUFDQTJFLGlCQUFTaEgsT0FBVCxDQUFpQmlKLHVCQUFqQixFQUE4QjtBQUMxQjdELHNCQUFXbkYsUUFBUW9DO0FBRE8sU0FBOUI7QUFHSCxLQU5EO0FBT0E0RSxtQkFBZWlDLE1BQWYsR0FBd0IsWUFBTTtBQUMxQixZQUFHLENBQUNsQyxTQUFTbkUsU0FBVCxFQUFKLEVBQXlCO0FBQ3JCO0FBQ0g7QUFDRHBELDBCQUFrQkMsR0FBbEIsQ0FBc0IsMkJBQXRCO0FBQ0FzSCxpQkFBU2xFLFVBQVQsQ0FBb0IsS0FBcEI7QUFDQWtFLGlCQUFTaEgsT0FBVCxDQUFpQm1KLHlCQUFqQjtBQUNILEtBUEQ7O0FBU0E7QUFDQWxDLG1CQUFlbUMsT0FBZixHQUF5QixZQUFNO0FBQzNCM0osMEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEIsRUFBb0RzSCxTQUFTbEQsUUFBVCxFQUFwRDtBQUNBLFlBQUdrRCxTQUFTbkUsU0FBVCxFQUFILEVBQXdCO0FBQ3BCbUUscUJBQVM5RCxRQUFULENBQWtCbUYsd0JBQWxCO0FBQ0gsU0FGRCxNQUVNLElBQUdyQixTQUFTbEQsUUFBVCxNQUF1Qkwsd0JBQTFCLEVBQXdDO0FBQzFDdUQscUJBQVM5RCxRQUFULENBQWtCbUcsd0JBQWxCO0FBQ0g7QUFDSixLQVBEOztBQVNBcEMsbUJBQWVxQyxZQUFmLEdBQThCLFlBQU07O0FBRWhDN0osMEJBQWtCQyxHQUFsQixDQUFzQixpQ0FBdEIsRUFBeUR5QixLQUFLb0ksS0FBTCxDQUFXdEosUUFBUXdFLE1BQVIsR0FBaUIsR0FBNUIsQ0FBekQ7QUFDQXVDLGlCQUFTaEgsT0FBVCxDQUFpQndKLHlCQUFqQixFQUFpQztBQUM3Qi9FLG9CQUFRdEQsS0FBS29JLEtBQUwsQ0FBV3RKLFFBQVF3RSxNQUFSLEdBQWlCLEdBQTVCLENBRHFCO0FBRTdCSyxrQkFBTTdFLFFBQVEyRTtBQUZlLFNBQWpDO0FBSUgsS0FQRDs7QUFTQXFDLG1CQUFlSyxLQUFmLEdBQXVCLFlBQU07QUFDekIsWUFBTW1DLE9BQVF4SixRQUFRcUgsS0FBUixJQUFpQnJILFFBQVFxSCxLQUFSLENBQWNtQyxJQUFoQyxJQUF5QyxDQUF0RDtBQUNBLFlBQU1DLGVBQWdCO0FBQ2xCLGVBQUcsRUFBQ0QsTUFBT0UsK0JBQVIsRUFBOEJDLFFBQVMsMkJBQXZDLEVBQW9FQyxTQUFVLDJCQUE5RSxFQURlO0FBRWxCLGVBQUcsRUFBQ0osTUFBT0sseUNBQVIsRUFBd0NGLFFBQVMsMkJBQWpELEVBQThFQyxTQUFVLDJCQUF4RixFQUZlO0FBR2xCLGVBQUcsRUFBQ0osTUFBT00sdUNBQVIsRUFBc0NILFFBQVMsdUJBQS9DLEVBQXdFQyxTQUFVLHVCQUFsRixFQUhlO0FBSWxCLGVBQUcsRUFBQ0osTUFBT08sc0NBQVIsRUFBcUNKLFFBQVMsc0JBQTlDLEVBQXNFQyxTQUFVLHNCQUFoRixFQUplO0FBS2xCLGVBQUcsRUFBQ0osTUFBT1EsNEJBQVIsRUFBMkJMLFFBQVMsMEJBQXBDLEVBQWdFQyxTQUFVLDBCQUExRTtBQUxlLFVBTXBCSixJQU5vQixLQU1iLENBTlQ7QUFPQUMscUJBQWFwQyxLQUFiLEdBQXFCckgsUUFBUXFILEtBQTdCOztBQUVBN0gsMEJBQWtCQyxHQUFsQixDQUFzQiwwQkFBdEIsRUFBa0RnSyxZQUFsRDtBQUNBckMsZ0JBQVFxQyxZQUFSO0FBQ0gsS0FiRDs7QUFpQkFRLFdBQU9DLElBQVAsQ0FBWWxELGNBQVosRUFBNEJtRCxPQUE1QixDQUFvQyxxQkFBYTtBQUM3Q25LLGdCQUFRb0ssbUJBQVIsQ0FBNEJDLFNBQTVCLEVBQXVDckQsZUFBZXFELFNBQWYsQ0FBdkM7QUFDQXJLLGdCQUFRc0ssZ0JBQVIsQ0FBeUJELFNBQXpCLEVBQW9DckQsZUFBZXFELFNBQWYsQ0FBcEM7QUFDSCxLQUhEOztBQUtBM0ssU0FBSzhHLE9BQUwsR0FBZSxZQUFLO0FBQ2hCaEgsMEJBQWtCQyxHQUFsQixDQUFzQiwyQkFBdEI7O0FBRUF3SyxlQUFPQyxJQUFQLENBQVlsRCxjQUFaLEVBQTRCbUQsT0FBNUIsQ0FBb0MscUJBQWE7QUFDN0NuSyxvQkFBUW9LLG1CQUFSLENBQTRCQyxTQUE1QixFQUF1Q3JELGVBQWVxRCxTQUFmLENBQXZDO0FBQ0gsU0FGRDtBQUdILEtBTkQ7QUFPQSxXQUFPM0ssSUFBUDtBQUNILENBNU1EOztrQkE4TWVvSCxRIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5odG1sNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI3Li5cbiAqL1xuaW1wb3J0IEV2ZW50cyBmcm9tIFwidXRpbHMvZXZlbnRzXCI7XG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9MaXN0ZW5lclwiO1xuaW1wb3J0IHtcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLFxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLFxuICAgIENPTlRFTlRfTEVWRUxTLCBDT05URU5UX0xFVkVMX0NIQU5HRUQsIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELFxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlLmpzXCI7XG5pbXBvcnQgUHJvbWlzZSwge3Jlc29sdmVkfSBmcm9tIFwiYXBpL3NoaW1zL3Byb21pc2VcIjtcblxubGV0IGV4dHJhY3RWaWRlb0VsZW1lbnQgPSBmdW5jdGlvbihwcm92aWRlck5hbWUsIGV4dGVuZGVkRWxlbWVudCl7XG4gICAgaWYoXy5pc0VsZW1lbnQoZXh0ZW5kZWRFbGVtZW50KSl7XG4gICAgICAgIHJldHVybiBleHRlbmRlZEVsZW1lbnQ7XG4gICAgfVxuICAgIGlmKHByb3ZpZGVyTmFtZSA9PT0gUFJPVklERVJfREFTSCl7XG4gICAgICAgIHJldHVybiBleHRlbmRlZEVsZW1lbnQuZ2V0VmlkZW9FbGVtZW50KCk7XG4gICAgfWVsc2UgaWYocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9ITFMpe1xuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50Lm1lZGlhO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogQGJyaWVmICAgQ29yZSBQcm92aWRlci5cbiAqIEBwYXJhbSAgIHByb3ZpZGVyTmFtZSBwcm92aWRlciBuYW1lXG4gKiBAcGFyYW0gICBleHRlbmRlZEVsZW1lbnQgZXh0ZW5kZWQgbWVkaWEgb2JqZWN0IGJ5IG1zZS4gb3IgdmlkZW8gZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xuICogQHBhcmFtICAgb25Mb2FkIG9uIGxvYWQgaGFuZGxlclxuICogKi9cbmNvbnN0IENvcmUgPSBmdW5jdGlvbiAocHJvdmlkZXJOYW1lLCBleHRlbmRlZEVsZW1lbnQsIHBsYXllckNvbmZpZywgb25Mb2FkKXtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIGxvYWRlZC4gXCIpO1xuXG4gICAgbGV0IHRoYXQgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgb246IEV2ZW50cy5vbixcbiAgICAgICAgb25jZTogRXZlbnRzLm9uY2UsXG4gICAgICAgIG9mZjogRXZlbnRzLm9mZixcbiAgICAgICAgdHJpZ2dlcjogRXZlbnRzLnRyaWdnZXJcbiAgICB9KTtcblxuXG4gICAgbGV0IGVsVmlkZW8gPSBleHRyYWN0VmlkZW9FbGVtZW50KHByb3ZpZGVyTmFtZSwgZXh0ZW5kZWRFbGVtZW50KTtcbiAgICBsZXQgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihwcm92aWRlck5hbWUsIGV4dGVuZGVkRWxlbWVudCwgZWxWaWRlbywgdGhhdCk7XG4gICAgbGV0IGNhblNlZWsgPSBmYWxzZTtcbiAgICBsZXQgc2Vla2luZyA9IGZhbHNlO1xuICAgIGxldCBzdGF0ZSA9IFNUQVRFX0lETEU7XG4gICAgbGV0IGJ1ZmZlciA9IDA7XG4gICAgbGV0IGN1cnJlbnRRdWFsaXR5ID0gLTE7XG4gICAgbGV0IHNvdXJjZXMgPSBbXTtcbiAgICAvL2xldCBpc0xpdmUgPSBmYWxzZTtcblxuICAgIGxldCBwb3N0ZXJJbWFnZSA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5pbWFnZXx8XCJcIjtcbiAgICBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXllckNvbmZpZy5nZXREZWZhdWx0UGxheWJhY2tSYXRlKCk7XG5cbiAgICBjb25zdCBzZXRRdWFsaXR5TGV2ZWxCeVNvdXJjZXMgPSAoc291cmNlcykgPT57XG4gICAgICAgIGNvbnN0IHBpY2tRdWFsaXR5ID0gKHNvdXJjZXMpID0+e1xuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSBNYXRoLm1heCgwLCBjdXJyZW50UXVhbGl0eSk7XG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9XCJcIjtcbiAgICAgICAgICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcXVhbGl0eTtcbiAgICAgICAgfTtcblxuICAgICAgICBjdXJyZW50UXVhbGl0eSA9IHBpY2tRdWFsaXR5KHNvdXJjZXMpO1xuICAgIH07XG5cbiAgICBjb25zdCBfbG9hZCA9IChsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgY29uc3Qgc291cmNlID0gIHNvdXJjZXNbY3VycmVudFF1YWxpdHldO1xuICAgICAgICBpZihvbkxvYWQpe1xuICAgICAgICAgICAgb25Mb2FkKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1NvdXJjZSA9IGVsVmlkZW8uc3JjO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xuXG4gICAgICAgICAgICBzb3VyY2VFbGVtZW50LnNyYyA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2VFbGVtZW50LnNyYyAhPT0gcHJldmlvdXNTb3VyY2UpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICBlbFZpZGVvLnNyYyA9IHNvdXJjZXNbY3VycmVudFF1YWxpdHldLmZpbGU7XG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGNhbGwgbG9hZCBpZiBzcmMgd2FzIG5vdCBzZXQuIGxvYWQoKSB3aWxsIGNhbmNlbCBhbnkgYWN0aXZlIHBsYXkgcHJvbWlzZS5cbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2UgaWYobGFzdFBsYXlQb3NpdGlvbiA9PSAwICYmIGVsVmlkZW8uY3VycmVudFRpbWUgPiAwKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxTLCB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IGN1cnJlbnRRdWFsaXR5XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYocG9zdGVySW1hZ2Upe1xuICAgICAgICAgICAgICAgIGVsVmlkZW8ucG9zdGVyID0gcG9zdGVySW1hZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBnZXRDdXJyZW50U291cmNlKCkgXCIsIHNvdXJjZXNbY3VycmVudFF1YWxpdHldKTtcbiAgICAgICAgcmV0dXJuIHNvdXJjZXNbY3VycmVudFF1YWxpdHldO1xuICAgIH07XG5cbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7IE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBjYW5TZWVrKCkgXCIsIGNhblNlZWspOyByZXR1cm4gY2FuU2Vlazt9O1xuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrXykgPT4geyAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHNldENhblNlZWsoKSBcIiwgY2FuU2Vla18pOyAgY2FuU2VlayA9IGNhblNlZWtfOyB9O1xuXG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e092ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBpc1NlZWtpbmcoKSBcIiwgc2Vla2luZyk7IHJldHVybiBzZWVraW5nO307XG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmdfKT0+eyBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc2V0U2Vla2luZygpIFwiLCBzZWVraW5nXyk7IHNlZWtpbmcgPSBzZWVraW5nXzt9O1xuXG4gICAgLy90aGF0LmlzTGl2ZSA9ICgpPT57cmV0dXJuIGlzTGl2ZTt9O1xuICAgIC8vdGhhdC5zZXRMaXZlID0gKGxpdmUpPT57aXNMaXZlID0gbGl2ZTt9O1xuXG4gICAgdGhhdC5zZXRQbGF5ZXJFbGVtZW50ID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHNldFBsYXllckVsZW1lbnQoKSBcIiwgZWxlbWVudCk7XG4gICAgICAgIGVsVmlkZW8gPSBlbGVtZW50O1xuICAgIH07XG5cbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XG4gICAgICAgIGlmKHN0YXRlICE9IG5ld1N0YXRlKXtcbiAgICAgICAgICAgIGxldCBwcmV2U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChuZXdTdGF0ZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0ZT0gbmV3U3RhdGU7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc2V0U3RhdGUoKSBcIiwgc3RhdGUpO1xuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xuICAgICAgICAgICAgICAgIHByZXZzdGF0ZTogcHJldlN0YXRlLFxuICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBzdGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGdldFN0YXRlKCkgXCIsIHN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzZXRCdWZmZXIoKSBcIiwgbmV3QnVmZmVyKTtcbiAgICAgICAgYnVmZmVyID0gbmV3QnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBnZXRCdWZmZXIoKSBcIiwgYnVmZmVyKTtcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICB9O1xuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT0gSW5maW5pdHk/IHRydWUgOiAocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9EQVNIPyBleHRlbmRlZEVsZW1lbnQuaXNEeW5hbWljKCkgOiBmYWxzZSkpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZ2V0RHVyYXRpb24oKSBcIiwgaXNMaXZlID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbik7XG4gICAgICAgIHJldHVybiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uO1xuICAgIH07XG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGdldFBvc2l0aW9uKCkgXCIsIGVsVmlkZW8uY3VycmVudFRpbWUpO1xuICAgICAgICByZXR1cm4gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzZXRWb2x1bWUoKSBcIiwgdm9sdW1lKTtcbiAgICAgICAgZWxWaWRlby52b2x1bWUgPSB2b2x1bWUvMTAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGdldFZvbHVtZSgpIFwiLCBlbFZpZGVvLnZvbHVtZSoxMDApO1xuICAgICAgICByZXR1cm4gZWxWaWRlby52b2x1bWUqMTAwO1xuICAgIH07XG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PntcblxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gIWVsVmlkZW8ubXV0ZWQ7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gc3RhdGU7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc2V0TXV0ZSgpIFwiLCBlbFZpZGVvLm11dGVkKTtcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHNldE11dGUoKSBcIiwgZWxWaWRlby5tdXRlZCk7XG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xuICAgIH07XG5cbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlc18sIGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogcHJlbG9hZCgpIFwiLCBzb3VyY2VzXywgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIHNvdXJjZXMgPSBzb3VyY2VzXztcbiAgICAgICAgc2V0UXVhbGl0eUxldmVsQnlTb3VyY2VzKHNvdXJjZXMpO1xuICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uIHx8IDApO1xuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXNfKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGxvYWQoKSBcIiwgc291cmNlc18pO1xuICAgICAgICBzb3VyY2VzID0gc291cmNlc187XG4gICAgICAgIHNldFF1YWxpdHlMZXZlbEJ5U291cmNlcyhzb3VyY2VzKTtcbiAgICAgICAgX2xvYWQoc291cmNlc18uc3RhcnR0aW1lIHx8IDApO1xuICAgIH07XG5cbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHBsYXkoKSBcIik7XG4gICAgICAgIGlmKCB0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgZWxWaWRlby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogcGF1c2UoKSBcIik7XG4gICAgICAgIGlmKCB0aGF0LmdldFN0YXRlKCkgPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzZWVrKCkgXCIsIHBvc2l0aW9uKTtcbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwge3BsYXliYWNrUmF0ZSA6IHBsYXliYWNrUmF0ZX0pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBnZXRQbGF5YmFja1JhdGUoKSBcIiwgZWxWaWRlby5wbGF5YmFja1JhdGUpO1xuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGU7XG4gICAgfTtcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XG4gICAgICAgIHZhciBnZXRRdWFsaXR5TGV2ZWwgPSBmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYml0cmF0ZTogc291cmNlLmJpdHJhdGUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcbiAgICAgICAgICAgICAgICB3aWR0aDogc291cmNlLndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogc291cmNlLmhlaWdodFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcXVhbGl0eUxldmVscyA9IHNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIGdldFF1YWxpdHlMZXZlbChzb3VyY2UpfSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBnZXRRdWFsaXR5TGV2ZWxzKCkgXCIsIHF1YWxpdHlMZXZlbHMpO1xuICAgICAgICByZXR1cm4gcXVhbGl0eUxldmVscztcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UXVhbGl0eSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UXVhbGl0eTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4LCBuZWVkTG9hZCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgcXVhbGl0eUluZGV4LCBuZWVkTG9hZCk7XG4gICAgICAgIGlmKGN1cnJlbnRRdWFsaXR5ID09IHF1YWxpdHlJbmRleCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYocXVhbGl0eUluZGV4ID4gLTEpe1xuICAgICAgICAgICAgaWYoc291cmNlcyAmJiBzb3VyY2VzLmxlbmd0aCA+IHF1YWxpdHlJbmRleCl7XG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgY2hhbmdlZCA6IFwiICsgcXVhbGl0eUluZGV4KTtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eSA9IHF1YWxpdHlJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IHF1YWxpdHlJbmRleFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFF1YWxpdHlMYWJlbChzb3VyY2VzW3F1YWxpdHlJbmRleF0ubGFiZWwpO1xuICAgICAgICAgICAgICAgIGlmKG5lZWRMb2FkKXtcblxuICAgICAgICAgICAgICAgICAgICBfbG9hZChlbFZpZGVvLmN1cnJlbnRUaW1lIHx8IDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFF1YWxpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgncHJlbG9hZCcpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIHdoaWxlIChlbFZpZGVvLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlQ2hpbGQoZWxWaWRlby5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICB0aGF0LnN0b3AoKTtcbiAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xuICAgICAgICAvL2VsVmlkZW8ucmVtb3ZlKCk7XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG4gICAgfTtcblxuICAgIC8vWFhYIDogVGhpcyBpcyBlczYuIFNvIHdlIGNhbid0IFwicHJvdG90eXBlIGV4cG9ydFwiLiBGaW5hbGx5IEkgY29uc2lkZXIgdGhpcyBtZXRob2QuXG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvcmU7IiwiaW1wb3J0IHtcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5cbi8qKlxuICogQGJyaWVmICAgVHJpZ2dlciBvbiB2YXJpb3VzIHZpZGVvIGV2ZW50cy5cbiAqIEBwYXJhbSAgIHByb3ZpZGVyTmFtZSBjaGlsZCBQcm92aWRlciBOYW1lXG4gKiBAcGFyYW0gICBleHRlbmRlZEVsZW1lbnQgZXh0ZW5kZWQgbWVkaWEgb2JqZWN0IGJ5IG1zZS5cbiAqIEBwYXJhbSAgIGVsZW1lbnQgZWxWaWRlbyAgdmlkZW9cbiAqIEBwYXJhbSAgIFByb3ZpZGVyIHByb3ZpZGVyICBodG1sNVByb3ZpZGVyXG4gKiAqL1xuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSwgZXh0ZW5kZWRFbGVtZW50LCBlbFZpZGVvLCBwcm92aWRlcil7XG4gICAgY29uc3QgbG93TGV2ZWxFdmVudHMgPSB7fTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgbG9hZGVkLlwiKTtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgY29uc3QgYmV0d2VlbiA9IGZ1bmN0aW9uIChudW0sIG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihudW0sIG1heCksIG1pbik7XG4gICAgfVxuICAgIGNvbnN0IG9uRXJyb3IgPSBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IgKTtcbiAgICB9O1xuXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGNhbiBzdGFydCBwbGF5aW5nIHRoZSBhdWRpby92aWRlb1xuICAgIGxvd0xldmVsRXZlbnRzLmNhbnBsYXkgPSAoKSA9PiB7XG4gICAgICAgIHByb3ZpZGVyLnNldENhblNlZWsodHJ1ZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVJfRlVMTCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBjYW5wbGF5XCIpO1xuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBkdXJhdGlvbiBvZiB0aGUgYXVkaW8vdmlkZW8gaXMgY2hhbmdlZFxuICAgIGxvd0xldmVsRXZlbnRzLmR1cmF0aW9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcygpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZHVyYXRpb25jaGFuZ2VcIik7XG4gICAgfTtcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWxpc3QgaXMgZW5kZWRcbiAgICBsb3dMZXZlbEV2ZW50cy5lbmRlZCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVuZGVkXCIpO1xuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpICE9IFNUQVRFX0lETEUgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPSBTVEFURV9DT01QTEVURSl7XG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQ09NUExFVEUpO1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZSBvZiB0aGUgYXVkaW8vdmlkZW9cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmcgQmVjYXVzZSB0aGlzIGNhdXNlcyBjaGFvcyBieSBsb2FkZWRtZXRhZGF0YS5cbiAgICAgICAgLypcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xuICAgICAgICAgICAgZHVyYXRpb246IGVsVmlkZW8uZHVyYXRpb24sXG4gICAgICAgICAgICBoZWlnaHQ6IGVsVmlkZW8udmlkZW9IZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogZWxWaWRlby52aWRlb1dpZHRoXG4gICAgICAgIH07XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7Ki9cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGxvYWRlZGRhdGFcIik7XG4gICAgfTtcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCBtZXRhIGRhdGEgZm9yIHRoZSBhdWRpby92aWRlb1xuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL1RvRG8gOiBZb3UgY29uc2lkZXIgaGxzanMuIEJ1dCBub3Qgbm93IGJlY2F1c2Ugd2UgZG9uJ3Qgc3VwcG9ydCBobHNqcy5cbiAgICAgICAgbGV0IGlzTGl2ZSA9IChlbFZpZGVvLmR1cmF0aW9uID09IEluZmluaXR5PyB0cnVlIDogKHByb3ZpZGVyTmFtZSA9PT0gUFJPVklERVJfREFTSD8gZXh0ZW5kZWRFbGVtZW50LmlzRHluYW1pYygpIDogZmFsc2UpKTtcbiAgICAgICAgbGV0IHR5cGUgPSBwcm92aWRlci5nZXRDdXJyZW50U291cmNlKCkgPyBwcm92aWRlci5nZXRDdXJyZW50U291cmNlKCkudHlwZSA6IFwiXCI7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgdHlwZSA6dHlwZVxuICAgICAgICB9O1xuICAgICAgICAvL3Byb3ZpZGVyLnNldExpdmUoaXNMaXZlKTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gbG9hZGVkbWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpO1xuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBwYXVzZWRcbiAgICBsb3dMZXZlbEV2ZW50cy5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQ09NUExFVEUgfHxwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9FUlJPUil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lbmRlZCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lcnJvcil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5jdXJyZW50VGltZSA9PT0gZWxWaWRlby5kdXJhdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBhdXNlXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBzdGFydGVkIG9yIGlzIG5vIGxvbmdlciBwYXVzZWRcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xuICAgICAgICBpZiAoIWVsVmlkZW8ucGF1c2VkICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwbGF5XCIpO1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBpcyBwbGF5aW5nIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZCBvciBzdG9wcGVkIGZvciBidWZmZXJpbmdcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5aW5nID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheWluZ1wiKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XG4gICAgICAgIC8vcHJvdmlkZXIudHJpZ2dlcihQUk9WSURFUl9GSVJTVF9GUkFNRSk7XG4gICAgfTtcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MgPSAoKSA9PiB7XG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcbiAgICAgICAgaWYoIXRpbWVSYW5nZXMgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb24sIHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcHJvZ3Jlc3NcIiwgYnVmZmVyZWQqMTAwKTtcblxuICAgICAgICBwcm92aWRlci5zZXRCdWZmZXIoYnVmZmVyZWQqMTAwKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwge1xuICAgICAgICAgICAgYnVmZmVyUGVyY2VudDogYnVmZmVyZWQqMTAwLFxuICAgICAgICAgICAgcG9zaXRpb246ICBwb3NpdGlvbixcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBpcyB0cnlpbmcgdG8gZ2V0IG1lZGlhIGRhdGEsIGJ1dCBkYXRhIGlzIG5vdCBhdmFpbGFibGVcbiAgICBsb3dMZXZlbEV2ZW50cy5zdGFsbGVkID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc3RhbGxcIik7XG4gICAgfTtcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcbiAgICBsb3dMZXZlbEV2ZW50cy50aW1ldXBkYXRlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbjtcbiAgICAgICAgaWYgKGlzTmFOKGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpICYmICFlbFZpZGVvLnBhdXNlZCl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gdGltZXVwZGF0ZVwiICwge1xuICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyB8fCBwcm92aWRlci5pc1NlZWtpbmcoKSkge1xuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50cy5yZXNpemUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiByZXNpemVcIik7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50cy5zZWVraW5nID0gKCkgPT4ge1xuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKHRydWUpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2luZ1wiLCBlbFZpZGVvLmN1cnJlbnRUaW1lKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUsse1xuICAgICAgICAgICAgcG9zaXRpb24gOiBlbFZpZGVvLmN1cnJlbnRUaW1lXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2VkID0gKCkgPT4ge1xuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVrZWRcIik7XG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcoZmFsc2UpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFS0VEKTtcbiAgICB9O1xuXG4gICAgLy9GaXJlcyB3aGVuIHRoZSB2aWRlbyBzdG9wcyBiZWNhdXNlIGl0IG5lZWRzIHRvIGJ1ZmZlciB0aGUgbmV4dCBmcmFtZVxuICAgIGxvd0xldmVsRXZlbnRzLndhaXRpbmcgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB3YWl0aW5nXCIsIHByb3ZpZGVyLmdldFN0YXRlKCkpO1xuICAgICAgICBpZihwcm92aWRlci5pc1NlZWtpbmcoKSl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICAgICAgfWVsc2UgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1NUQUxMRUQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnZvbHVtZWNoYW5nZSA9ICgpID0+IHtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gdm9sdW1lY2hhbmdlXCIsIE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwge1xuICAgICAgICAgICAgdm9sdW1lOiBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSxcbiAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb2RlID0gKGVsVmlkZW8uZXJyb3IgJiYgZWxWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xuICAgICAgICBjb25zdCBlcnJvckNvZGVHZW4gPSAoe1xuICAgICAgICAgICAgMDoge2NvZGUgOiBQTEFZRVJfVU5LTldPTl9FUlJPUiwgcmVhc29uIDogXCJVbmtub3duIGh0bWw1IHZpZGVvIGVycm9yXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gaHRtbDUgdmlkZW8gZXJyb3JcIn0sXG4gICAgICAgICAgICAxOiB7Y29kZSA6IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiwgcmVhc29uIDogXCJVbmtub3duIG9wZXJhdGlvbiBhYm9ydGVkXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gb3BlcmF0aW9uIGFib3J0ZWRcIn0sXG4gICAgICAgICAgICAyOiB7Y29kZSA6IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsIHJlYXNvbiA6IFwiVW5rbm93biBuZXR3b3JrIGVycm9yXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gbmV0d29yayBlcnJvclwifSxcbiAgICAgICAgICAgIDM6IHtjb2RlIDogUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gZGVjb2RlIGVycm9yXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gZGVjb2RlIGVycm9yXCJ9LFxuICAgICAgICAgICAgNDoge2NvZGUgOiBQTEFZRVJfRklMRV9FUlJPUiwgcmVhc29uIDogXCJGaWxlIGNvdWxkIG5vdCBiZSBwbGF5ZWRcIiwgbWVzc2FnZSA6IFwiRmlsZSBjb3VsZCBub3QgYmUgcGxheWVkXCJ9XG4gICAgICAgIH1bY29kZV18fDApO1xuICAgICAgICBlcnJvckNvZGVHZW4uZXJyb3IgPSBlbFZpZGVvLmVycm9yO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlcnJvclwiLCBlcnJvckNvZGVHZW4pO1xuICAgICAgICBvbkVycm9yKGVycm9yQ29kZUdlbik7XG4gICAgfTtcblxuXG5cbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgZWxWaWRlby5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgfSk7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiXSwic291cmNlUm9vdCI6IiJ9