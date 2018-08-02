/*! OvenPlayerv0.6.6 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var _EventEmitter = __webpack_require__(/*! api/EventEmitter */ "./src/js/api/EventEmitter.js");

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

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
/**
 * Created by hoho on 2018. 6. 27..
 */
var Core = function Core(providerName, extendedElement, playerConfig, onLoad) {
    OvenPlayerConsole.log("CORE loaded. ");

    var that = {};
    (0, _EventEmitter2.default)(that);

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
    that.setCurrentQuality = function (qualityIndex, needProviderChange) {
        OvenPlayerConsole.log("CORE : setCurrentQuality() ", qualityIndex, needProviderChange);
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
                if (needProviderChange) {

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

        //PRIVATE_STATE_ERROR
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL0NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9MaXN0ZW5lci5qcyJdLCJuYW1lcyI6WyJleHRyYWN0VmlkZW9FbGVtZW50IiwicHJvdmlkZXJOYW1lIiwiZXh0ZW5kZWRFbGVtZW50IiwiXyIsImlzRWxlbWVudCIsIlBST1ZJREVSX0RBU0giLCJnZXRWaWRlb0VsZW1lbnQiLCJQUk9WSURFUl9ITFMiLCJtZWRpYSIsIkNvcmUiLCJwbGF5ZXJDb25maWciLCJvbkxvYWQiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsInRoYXQiLCJlbFZpZGVvIiwibGlzdGVuZXIiLCJjYW5TZWVrIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImN1cnJlbnRRdWFsaXR5Iiwic291cmNlcyIsInBvc3RlckltYWdlIiwiZ2V0Q29uZmlnIiwiaW1hZ2UiLCJwbGF5YmFja1JhdGUiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSIsInNldFF1YWxpdHlMZXZlbEJ5U291cmNlcyIsInBpY2tRdWFsaXR5IiwicXVhbGl0eSIsIk1hdGgiLCJtYXgiLCJsYWJlbCIsImkiLCJsZW5ndGgiLCJkZWZhdWx0IiwiZ2V0UXVhbGl0eUxhYmVsIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwicHJldmlvdXNTb3VyY2UiLCJzcmMiLCJzb3VyY2VFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZmlsZSIsInNvdXJjZUNoYW5nZWQiLCJsb2FkIiwiY3VycmVudFRpbWUiLCJzZWVrIiwicGxheSIsInRyaWdnZXIiLCJDT05URU5UX0xFVkVMUyIsInBvc3RlciIsImdldEN1cnJlbnRTb3VyY2UiLCJzZXRDYW5TZWVrIiwiY2FuU2Vla18iLCJpc1NlZWtpbmciLCJzZXRTZWVraW5nIiwic2Vla2luZ18iLCJzZXRQbGF5ZXJFbGVtZW50IiwiZWxlbWVudCIsInNldFN0YXRlIiwibmV3U3RhdGUiLCJwcmV2U3RhdGUiLCJTVEFURV9DT01QTEVURSIsIlBMQVlFUl9DT01QTEVURSIsIlNUQVRFX1BBVVNFRCIsIlBMQVlFUl9QQVVTRSIsIlNUQVRFX1BMQVlJTkciLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld3N0YXRlIiwiZ2V0U3RhdGUiLCJzZXRCdWZmZXIiLCJuZXdCdWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsImlzTGl2ZSIsImR1cmF0aW9uIiwiSW5maW5pdHkiLCJpc0R5bmFtaWMiLCJnZXRQb3NpdGlvbiIsInNldFZvbHVtZSIsInZvbHVtZSIsImdldFZvbHVtZSIsInNldE11dGUiLCJtdXRlZCIsIkNPTlRFTlRfTVVURSIsIm11dGUiLCJnZXRNdXRlIiwicHJlbG9hZCIsInNvdXJjZXNfIiwic3RhcnR0aW1lIiwicGF1c2UiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsImdldFBsYXliYWNrUmF0ZSIsImdldFF1YWxpdHlMZXZlbHMiLCJnZXRRdWFsaXR5TGV2ZWwiLCJiaXRyYXRlIiwid2lkdGgiLCJoZWlnaHQiLCJxdWFsaXR5TGV2ZWxzIiwibWFwIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsIm5lZWRQcm92aWRlckNoYW5nZSIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsInNldFF1YWxpdHlMYWJlbCIsInN0b3AiLCJyZW1vdmVBdHRyaWJ1dGUiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJkZXN0cm95Iiwib2ZmIiwic3VwZXIiLCJuYW1lIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJMaXN0ZW5lciIsInByb3ZpZGVyIiwibG93TGV2ZWxFdmVudHMiLCJiZXR3ZWVuIiwibnVtIiwibWluIiwib25FcnJvciIsImVycm9yIiwiU1RBVEVfRVJST1IiLCJFUlJPUiIsImNhbnBsYXkiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiQ09OVEVOVF9DT01QTEVURSIsImxvYWRlZGRhdGEiLCJsb2FkZWRtZXRhZGF0YSIsInR5cGUiLCJtZXRhZGF0YSIsIkNPTlRFTlRfTUVUQSIsInBhdXNlZCIsIlNUQVRFX0xPQURJTkciLCJwbGF5aW5nIiwidGltZVJhbmdlcyIsImJ1ZmZlcmVkIiwiZW5kIiwiQ09OVEVOVF9CVUZGRVIiLCJidWZmZXJQZXJjZW50Iiwic3RhbGxlZCIsInRpbWV1cGRhdGUiLCJpc05hTiIsIkNPTlRFTlRfVElNRSIsInJlc2l6ZSIsIkNPTlRFTlRfU0VFSyIsInNlZWtlZCIsIkNPTlRFTlRfU0VFS0VEIiwid2FpdGluZyIsIlNUQVRFX1NUQUxMRUQiLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsIkNPTlRFTlRfVk9MVU1FIiwiY29kZSIsImVycm9yQ29kZUdlbiIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwicmVhc29uIiwibWVzc2FnZSIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfRklMRV9FUlJPUiIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2ZW50TmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQU1BOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLHNCQUFzQixTQUF0QkEsbUJBQXNCLENBQVNDLFlBQVQsRUFBdUJDLGVBQXZCLEVBQXVDO0FBQzdELFFBQUdDLHFCQUFFQyxTQUFGLENBQVlGLGVBQVosQ0FBSCxFQUFnQztBQUM1QixlQUFPQSxlQUFQO0FBQ0g7QUFDRCxRQUFH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QU1wQkosSUFOb0IsS0FNYixDQU5UO0FBT0FDLHFCQUFhcEMsS0FBYixHQUFxQnZILFFBQVF1SCxLQUE3Qjs7QUFFQTFILDBCQUFrQkMsR0FBbEIsQ0FBc0IsMEJBQXRCLEVBQWtENkosWUFBbEQ7QUFDQXJDLGdCQUFRcUMsWUFBUjtBQUNILEtBYkQ7O0FBaUJBUSxXQUFPQyxJQUFQLENBQVlsRCxjQUFaLEVBQTRCbUQsT0FBNUIsQ0FBb0MscUJBQWE7QUFDN0NySyxnQkFBUXNLLG1CQUFSLENBQTRCQyxTQUE1QixFQUF1Q3JELGVBQWVxRCxTQUFmLENBQXZDO0FBQ0F2SyxnQkFBUXdLLGdCQUFSLENBQXlCRCxTQUF6QixFQUFvQ3JELGVBQWVxRCxTQUFmLENBQXBDO0FBQ0gsS0FIRDs7QUFLQXhLLFNBQUswRyxPQUFMLEdBQWUsWUFBSztBQUNoQjVHLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMkJBQXRCOztBQUVBcUssZUFBT0MsSUFBUCxDQUFZbEQsY0FBWixFQUE0Qm1ELE9BQTVCLENBQW9DLHFCQUFhO0FBQzdDckssb0JBQVFzSyxtQkFBUixDQUE0QkMsU0FBNUIsRUFBdUNyRCxlQUFlcUQsU0FBZixDQUF2QztBQUNILFNBRkQ7QUFHSCxLQU5EO0FBT0EsV0FBT3hLLElBQVA7QUFDSCxDQTlNRDs7a0JBZ05laUgsUSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuaHRtbDUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyNy4uXG4gKi9cbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcbmltcG9ydCBFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL0xpc3RlbmVyXCI7XG5pbXBvcnQge1xuICAgIFNUQVRFX0lETEUsIFNUQVRFX1BMQVlJTkcsIFNUQVRFX1BBVVNFRCwgU1RBVEVfQ09NUExFVEUsXG4gICAgUExBWUVSX1NUQVRFLCBQTEFZRVJfQ09NUExFVEUsIFBMQVlFUl9QQVVTRSwgUExBWUVSX1BMQVksXG4gICAgQ09OVEVOVF9MRVZFTFMsIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmUuanNcIjtcbmltcG9ydCBQcm9taXNlLCB7cmVzb2x2ZWR9IGZyb20gXCJhcGkvc2hpbXMvcHJvbWlzZVwiO1xuXG5sZXQgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSwgZXh0ZW5kZWRFbGVtZW50KXtcbiAgICBpZihfLmlzRWxlbWVudChleHRlbmRlZEVsZW1lbnQpKXtcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudDtcbiAgICB9XG4gICAgaWYocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9EQVNIKXtcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5nZXRWaWRlb0VsZW1lbnQoKTtcbiAgICB9ZWxzZSBpZihwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX0hMUyl7XG4gICAgICAgIHJldHVybiBleHRlbmRlZEVsZW1lbnQubWVkaWE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBAYnJpZWYgICBDb3JlIFByb3ZpZGVyLlxuICogQHBhcmFtICAgcHJvdmlkZXJOYW1lIHByb3ZpZGVyIG5hbWVcbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLiBvciB2aWRlbyBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICBwbGF5ZXIgY29uZmlnXG4gKiBAcGFyYW0gICBvbkxvYWQgb24gbG9hZCBoYW5kbGVyXG4gKiAqL1xuY29uc3QgQ29yZSA9IGZ1bmN0aW9uIChwcm92aWRlck5hbWUsIGV4dGVuZGVkRWxlbWVudCwgcGxheWVyQ29uZmlnLCBvbkxvYWQpe1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgbG9hZGVkLiBcIik7XG5cbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcblxuXG4gICAgbGV0IGVsVmlkZW8gPSBleHRyYWN0VmlkZW9FbGVtZW50KHByb3ZpZGVyTmFtZSwgZXh0ZW5kZWRFbGVtZW50KTtcbiAgICBsZXQgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihwcm92aWRlck5hbWUsIGV4dGVuZGVkRWxlbWVudCwgZWxWaWRlbywgdGhhdCk7XG4gICAgbGV0IGNhblNlZWsgPSBmYWxzZTtcbiAgICBsZXQgc2Vla2luZyA9IGZhbHNlO1xuICAgIGxldCBzdGF0ZSA9IFNUQVRFX0lETEU7XG4gICAgbGV0IGJ1ZmZlciA9IDA7XG4gICAgbGV0IGN1cnJlbnRRdWFsaXR5ID0gLTE7XG4gICAgbGV0IHNvdXJjZXMgPSBbXTtcbiAgICAvL2xldCBpc0xpdmUgPSBmYWxzZTtcblxuICAgIGxldCBwb3N0ZXJJbWFnZSA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5pbWFnZXx8XCJcIjtcbiAgICBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXllckNvbmZpZy5nZXREZWZhdWx0UGxheWJhY2tSYXRlKCk7XG5cbiAgICBjb25zdCBzZXRRdWFsaXR5TGV2ZWxCeVNvdXJjZXMgPSAoc291cmNlcykgPT57XG4gICAgICAgIGNvbnN0IHBpY2tRdWFsaXR5ID0gKHNvdXJjZXMpID0+e1xuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSBNYXRoLm1heCgwLCBjdXJyZW50UXVhbGl0eSk7XG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9XCJcIjtcbiAgICAgICAgICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcXVhbGl0eTtcbiAgICAgICAgfTtcblxuICAgICAgICBjdXJyZW50UXVhbGl0eSA9IHBpY2tRdWFsaXR5KHNvdXJjZXMpO1xuICAgIH07XG5cbiAgICBjb25zdCBfbG9hZCA9IChsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgY29uc3Qgc291cmNlID0gIHNvdXJjZXNbY3VycmVudFF1YWxpdHldO1xuICAgICAgICBpZihvbkxvYWQpe1xuICAgICAgICAgICAgb25Mb2FkKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1NvdXJjZSA9IGVsVmlkZW8uc3JjO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xuXG4gICAgICAgICAgICBzb3VyY2VFbGVtZW50LnNyYyA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2VFbGVtZW50LnNyYyAhPT0gcHJldmlvdXNTb3VyY2UpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICBlbFZpZGVvLnNyYyA9IHNvdXJjZXNbY3VycmVudFF1YWxpdHldLmZpbGU7XG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGNhbGwgbG9hZCBpZiBzcmMgd2FzIG5vdCBzZXQuIGxvYWQoKSB3aWxsIGNhbmNlbCBhbnkgYWN0aXZlIHBsYXkgcHJvbWlzZS5cbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2UgaWYobGFzdFBsYXlQb3NpdGlvbiA9PSAwICYmIGVsVmlkZW8uY3VycmVudFRpbWUgPiAwKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxTLCB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IGN1cnJlbnRRdWFsaXR5XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYocG9zdGVySW1hZ2Upe1xuICAgICAgICAgICAgICAgIGVsVmlkZW8ucG9zdGVyID0gcG9zdGVySW1hZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBnZXRDdXJyZW50U291cmNlKCkgXCIsIHNvdXJjZXNbY3VycmVudFF1YWxpdHldKTtcbiAgICAgICAgcmV0dXJuIHNvdXJjZXNbY3VycmVudFF1YWxpdHldO1xuICAgIH07XG5cbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7IE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBjYW5TZWVrKCkgXCIsIGNhblNlZWspOyByZXR1cm4gY2FuU2Vlazt9O1xuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrXykgPT4geyAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHNldENhblNlZWsoKSBcIiwgY2FuU2Vla18pOyAgY2FuU2VlayA9IGNhblNlZWtfOyB9O1xuXG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e092ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBpc1NlZWtpbmcoKSBcIiwgc2Vla2luZyk7IHJldHVybiBzZWVraW5nO307XG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmdfKT0+eyBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc2V0U2Vla2luZygpIFwiLCBzZWVraW5nXyk7IHNlZWtpbmcgPSBzZWVraW5nXzt9O1xuXG4gICAgLy90aGF0LmlzTGl2ZSA9ICgpPT57cmV0dXJuIGlzTGl2ZTt9O1xuICAgIC8vdGhhdC5zZXRMaXZlID0gKGxpdmUpPT57aXNMaXZlID0gbGl2ZTt9O1xuXG4gICAgdGhhdC5zZXRQbGF5ZXJFbGVtZW50ID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHNldFBsYXllckVsZW1lbnQoKSBcIiwgZWxlbWVudCk7XG4gICAgICAgIGVsVmlkZW8gPSBlbGVtZW50O1xuICAgIH07XG5cbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XG4gICAgICAgIGlmKHN0YXRlICE9IG5ld1N0YXRlKXtcbiAgICAgICAgICAgIGxldCBwcmV2U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChuZXdTdGF0ZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0ZT0gbmV3U3RhdGU7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc2V0U3RhdGUoKSBcIiwgc3RhdGUpO1xuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xuICAgICAgICAgICAgICAgIHByZXZzdGF0ZTogcHJldlN0YXRlLFxuICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBzdGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGdldFN0YXRlKCkgXCIsIHN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzZXRCdWZmZXIoKSBcIiwgbmV3QnVmZmVyKTtcbiAgICAgICAgYnVmZmVyID0gbmV3QnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBnZXRCdWZmZXIoKSBcIiwgYnVmZmVyKTtcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICB9O1xuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT0gSW5maW5pdHk/IHRydWUgOiAocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9EQVNIPyBleHRlbmRlZEVsZW1lbnQuaXNEeW5hbWljKCkgOiBmYWxzZSkpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZ2V0RHVyYXRpb24oKSBcIiwgaXNMaXZlID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbik7XG4gICAgICAgIHJldHVybiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uO1xuICAgIH07XG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGdldFBvc2l0aW9uKCkgXCIsIGVsVmlkZW8uY3VycmVudFRpbWUpO1xuICAgICAgICByZXR1cm4gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzZXRWb2x1bWUoKSBcIiwgdm9sdW1lKTtcbiAgICAgICAgZWxWaWRlby52b2x1bWUgPSB2b2x1bWUvMTAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGdldFZvbHVtZSgpIFwiLCBlbFZpZGVvLnZvbHVtZSoxMDApO1xuICAgICAgICByZXR1cm4gZWxWaWRlby52b2x1bWUqMTAwO1xuICAgIH07XG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PntcblxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gIWVsVmlkZW8ubXV0ZWQ7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gc3RhdGU7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc2V0TXV0ZSgpIFwiLCBlbFZpZGVvLm11dGVkKTtcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHNldE11dGUoKSBcIiwgZWxWaWRlby5tdXRlZCk7XG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xuICAgIH07XG5cbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlc18sIGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogcHJlbG9hZCgpIFwiLCBzb3VyY2VzXywgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIHNvdXJjZXMgPSBzb3VyY2VzXztcbiAgICAgICAgc2V0UXVhbGl0eUxldmVsQnlTb3VyY2VzKHNvdXJjZXMpO1xuICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uIHx8IDApO1xuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXNfKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGxvYWQoKSBcIiwgc291cmNlc18pO1xuICAgICAgICBzb3VyY2VzID0gc291cmNlc187XG4gICAgICAgIHNldFF1YWxpdHlMZXZlbEJ5U291cmNlcyhzb3VyY2VzKTtcbiAgICAgICAgX2xvYWQoc291cmNlc18uc3RhcnR0aW1lIHx8IDApO1xuICAgIH07XG5cbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHBsYXkoKSBcIik7XG4gICAgICAgIGlmKCB0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgZWxWaWRlby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogcGF1c2UoKSBcIik7XG4gICAgICAgIGlmKCB0aGF0LmdldFN0YXRlKCkgPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzZWVrKCkgXCIsIHBvc2l0aW9uKTtcbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwge3BsYXliYWNrUmF0ZSA6IHBsYXliYWNrUmF0ZX0pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBnZXRQbGF5YmFja1JhdGUoKSBcIiwgZWxWaWRlby5wbGF5YmFja1JhdGUpO1xuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGU7XG4gICAgfTtcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XG4gICAgICAgIHZhciBnZXRRdWFsaXR5TGV2ZWwgPSBmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYml0cmF0ZTogc291cmNlLmJpdHJhdGUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcbiAgICAgICAgICAgICAgICB3aWR0aDogc291cmNlLndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogc291cmNlLmhlaWdodFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcXVhbGl0eUxldmVscyA9IHNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIGdldFF1YWxpdHlMZXZlbChzb3VyY2UpfSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBnZXRRdWFsaXR5TGV2ZWxzKCkgXCIsIHF1YWxpdHlMZXZlbHMpO1xuICAgICAgICByZXR1cm4gcXVhbGl0eUxldmVscztcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UXVhbGl0eSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UXVhbGl0eTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgXCIsIHF1YWxpdHlJbmRleCwgbmVlZFByb3ZpZGVyQ2hhbmdlKTtcbiAgICAgICAgaWYoY3VycmVudFF1YWxpdHkgPT0gcXVhbGl0eUluZGV4KXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHF1YWxpdHlJbmRleCA+IC0xKXtcbiAgICAgICAgICAgIGlmKHNvdXJjZXMgJiYgc291cmNlcy5sZW5ndGggPiBxdWFsaXR5SW5kZXgpe1xuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHF1YWxpdHlJbmRleCk7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHkgPSBxdWFsaXR5SW5kZXg7XG5cbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBxdWFsaXR5SW5kZXhcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRRdWFsaXR5TGFiZWwoc291cmNlc1txdWFsaXR5SW5kZXhdLmxhYmVsKTtcbiAgICAgICAgICAgICAgICBpZihuZWVkUHJvdmlkZXJDaGFuZ2Upe1xuXG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsVmlkZW8uY3VycmVudFRpbWUgfHwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UXVhbGl0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdwcmVsb2FkJyk7XG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgd2hpbGUgKGVsVmlkZW8uZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVDaGlsZChlbFZpZGVvLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIHRoYXQuc3RvcCgpO1xuICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XG4gICAgICAgIC8vZWxWaWRlby5yZW1vdmUoKTtcbiAgICAgICAgdGhhdC5vZmYoKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGRlc3Ryb3koKSBwbGF5ZXIgc3RvcCwgbGlzdGVuZXIsIGV2ZW50IGRlc3Ryb2llZFwiKTtcbiAgICB9O1xuXG4gICAgLy9YWFggOiBUaGlzIGlzIGVzNi4gU28gd2UgY2FuJ3QgXCJwcm90b3R5cGUgZXhwb3J0XCIuIEZpbmFsbHkgSSBjb25zaWRlciB0aGlzIG1ldGhvZC5cbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29yZTtcbiIsImltcG9ydCB7XG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuXG4vKipcbiAqIEBicmllZiAgIFRyaWdnZXIgb24gdmFyaW91cyB2aWRlbyBldmVudHMuXG4gKiBAcGFyYW0gICBwcm92aWRlck5hbWUgY2hpbGQgUHJvdmlkZXIgTmFtZVxuICogQHBhcmFtICAgZXh0ZW5kZWRFbGVtZW50IGV4dGVuZGVkIG1lZGlhIG9iamVjdCBieSBtc2UuXG4gKiBAcGFyYW0gICBlbGVtZW50IGVsVmlkZW8gIHZpZGVvXG4gKiBAcGFyYW0gICBQcm92aWRlciBwcm92aWRlciAgaHRtbDVQcm92aWRlclxuICogKi9cblxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihwcm92aWRlck5hbWUsIGV4dGVuZGVkRWxlbWVudCwgZWxWaWRlbywgcHJvdmlkZXIpe1xuICAgIGNvbnN0IGxvd0xldmVsRXZlbnRzID0ge307XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIGxvYWRlZC5cIik7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGNvbnN0IGJldHdlZW4gPSBmdW5jdGlvbiAobnVtLCBtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4obnVtLCBtYXgpLCBtaW4pO1xuICAgIH1cbiAgICBjb25zdCBvbkVycm9yID0gZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XG4gICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG5cbiAgICAgICAgLy9QUklWQVRFX1NUQVRFX0VSUk9SXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yICk7XG4gICAgfTtcblxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBjYW4gc3RhcnQgcGxheWluZyB0aGUgYXVkaW8vdmlkZW9cbiAgICBsb3dMZXZlbEV2ZW50cy5jYW5wbGF5ID0gKCkgPT4ge1xuICAgICAgICBwcm92aWRlci5zZXRDYW5TZWVrKHRydWUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSX0ZVTEwpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gY2FucGxheVwiKTtcbiAgICB9O1xuICAgIC8vRmlyZXMgd2hlbiB0aGUgZHVyYXRpb24gb2YgdGhlIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWRcbiAgICBsb3dMZXZlbEV2ZW50cy5kdXJhdGlvbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MoKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGR1cmF0aW9uY2hhbmdlXCIpO1xuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXlsaXN0IGlzIGVuZGVkXG4gICAgbG93TGV2ZWxFdmVudHMuZW5kZWQgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlbmRlZFwiKTtcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSAhPSBTVEFURV9JRExFICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT0gU1RBVEVfQ09NUExFVEUpe1xuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0NPTVBMRVRFKTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgdGhlIGN1cnJlbnQgZnJhbWUgb2YgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkZGF0YSA9ICgpID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nIEJlY2F1c2UgdGhpcyBjYXVzZXMgY2hhb3MgYnkgbG9hZGVkbWV0YWRhdGEuXG4gICAgICAgIC8qXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IGVsVmlkZW8udmlkZW9XaWR0aFxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRkYXRhXCIpO1xuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgbWV0YSBkYXRhIGZvciB0aGUgYXVkaW8vdmlkZW9cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRtZXRhZGF0YSA9ICgpID0+IHtcbiAgICAgICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXG4gICAgICAgIGxldCBpc0xpdmUgPSAoZWxWaWRlby5kdXJhdGlvbiA9PSBJbmZpbml0eT8gdHJ1ZSA6IChwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX0RBU0g/IGV4dGVuZGVkRWxlbWVudC5pc0R5bmFtaWMoKSA6IGZhbHNlKSk7XG4gICAgICAgIGxldCB0eXBlID0gcHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpID8gcHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpLnR5cGUgOiBcIlwiO1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgICAgICAgICBkdXJhdGlvbjogaXNMaXZlID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbixcbiAgICAgICAgICAgIHR5cGUgOnR5cGVcbiAgICAgICAgfTtcbiAgICAgICAgLy9wcm92aWRlci5zZXRMaXZlKGlzTGl2ZSk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGxvYWRlZG1ldGFkYXRhXCIsIG1ldGFkYXRhKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTtcbiAgICB9O1xuICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gcGF1c2VkXG4gICAgbG93TGV2ZWxFdmVudHMucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0NPTVBMRVRFIHx8cHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfRVJST1Ipe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uZW5kZWQpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uZXJyb3Ipe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uY3VycmVudFRpbWUgPT09IGVsVmlkZW8uZHVyYXRpb24pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwYXVzZVwiKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUEFVU0VEKTtcbiAgICB9O1xuICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gc3RhcnRlZCBvciBpcyBubyBsb25nZXIgcGF1c2VkXG4gICAgbG93TGV2ZWxFdmVudHMucGxheSA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFlbFZpZGVvLnBhdXNlZCAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheVwiKTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaXMgcGxheWluZyBhZnRlciBoYXZpbmcgYmVlbiBwYXVzZWQgb3Igc3RvcHBlZCBmb3IgYnVmZmVyaW5nXG4gICAgbG93TGV2ZWxFdmVudHMucGxheWluZyA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBsYXlpbmdcIik7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xuICAgICAgICAvL3Byb3ZpZGVyLnRyaWdnZXIoUFJPVklERVJfRklSU1RfRlJBTUUpO1xuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGlzIGRvd25sb2FkaW5nIHRoZSBhdWRpby92aWRlb1xuICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzID0gKCkgPT4ge1xuICAgICAgICBsZXQgdGltZVJhbmdlcyA9IGVsVmlkZW8uYnVmZmVyZWQ7XG4gICAgICAgIGlmKCF0aW1lUmFuZ2VzICl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uLCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgICAgIGxldCBidWZmZXJlZCA9IGJldHdlZW4oICh0aW1lUmFuZ2VzLmxlbmd0aD4gMCA/IHRpbWVSYW5nZXMuZW5kKHRpbWVSYW5nZXMubGVuZ3RoIC0gMSkgOiAwICkgLyBkdXJhdGlvbiwgMCwgMSk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHByb2dyZXNzXCIsIGJ1ZmZlcmVkKjEwMCk7XG5cbiAgICAgICAgcHJvdmlkZXIuc2V0QnVmZmVyKGJ1ZmZlcmVkKjEwMCk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVIsIHtcbiAgICAgICAgICAgIGJ1ZmZlclBlcmNlbnQ6IGJ1ZmZlcmVkKjEwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAgcG9zaXRpb24sXG4gICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgdHJ5aW5nIHRvIGdldCBtZWRpYSBkYXRhLCBidXQgZGF0YSBpcyBub3QgYXZhaWxhYmxlXG4gICAgbG93TGV2ZWxFdmVudHMuc3RhbGxlZCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHN0YWxsXCIpO1xuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGhhcyBjaGFuZ2VkXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb247XG4gICAgICAgIGlmIChpc05hTihkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSAmJiAhZWxWaWRlby5wYXVzZWQpe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHRpbWV1cGRhdGVcIiAsIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcgfHwgcHJvdmlkZXIuaXNTZWVraW5nKCkpIHtcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FLCB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMucmVzaXplID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcmVzaXplXCIpO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2luZyA9ICgpID0+IHtcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyh0cnVlKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtpbmdcIiwgZWxWaWRlby5jdXJyZW50VGltZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLLHtcbiAgICAgICAgICAgIHBvc2l0aW9uIDogZWxWaWRlby5jdXJyZW50VGltZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtlZCA9ICgpID0+IHtcbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2VkXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKGZhbHNlKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUtFRCk7XG4gICAgfTtcblxuICAgIC8vRmlyZXMgd2hlbiB0aGUgdmlkZW8gc3RvcHMgYmVjYXVzZSBpdCBuZWVkcyB0byBidWZmZXIgdGhlIG5leHQgZnJhbWVcbiAgICBsb3dMZXZlbEV2ZW50cy53YWl0aW5nID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gd2FpdGluZ1wiLCBwcm92aWRlci5nZXRTdGF0ZSgpKTtcbiAgICAgICAgaWYocHJvdmlkZXIuaXNTZWVraW5nKCkpe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgIH1lbHNlIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9TVEFMTEVEKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy52b2x1bWVjaGFuZ2UgPSAoKSA9PiB7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHZvbHVtZWNoYW5nZVwiLCBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIHtcbiAgICAgICAgICAgIHZvbHVtZTogTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCksXG4gICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5lcnJvciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29kZSA9IChlbFZpZGVvLmVycm9yICYmIGVsVmlkZW8uZXJyb3IuY29kZSkgfHwgMDtcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlR2VuID0gKHtcbiAgICAgICAgICAgIDA6IHtjb2RlIDogUExBWUVSX1VOS05XT05fRVJST1IsIHJlYXNvbiA6IFwiVW5rbm93biBodG1sNSB2aWRlbyBlcnJvclwiLCBtZXNzYWdlIDogXCJVbmtub3duIGh0bWw1IHZpZGVvIGVycm9yXCJ9LFxuICAgICAgICAgICAgMToge2NvZGUgOiBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsIHJlYXNvbiA6IFwiVW5rbm93biBvcGVyYXRpb24gYWJvcnRlZFwiLCBtZXNzYWdlIDogXCJVbmtub3duIG9wZXJhdGlvbiBhYm9ydGVkXCJ9LFxuICAgICAgICAgICAgMjoge2NvZGUgOiBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gbmV0d29yayBlcnJvclwiLCBtZXNzYWdlIDogXCJVbmtub3duIG5ldHdvcmsgZXJyb3JcIn0sXG4gICAgICAgICAgICAzOiB7Y29kZSA6IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiwgcmVhc29uIDogXCJVbmtub3duIGRlY29kZSBlcnJvclwiLCBtZXNzYWdlIDogXCJVbmtub3duIGRlY29kZSBlcnJvclwifSxcbiAgICAgICAgICAgIDQ6IHtjb2RlIDogUExBWUVSX0ZJTEVfRVJST1IsIHJlYXNvbiA6IFwiRmlsZSBjb3VsZCBub3QgYmUgcGxheWVkXCIsIG1lc3NhZ2UgOiBcIkZpbGUgY291bGQgbm90IGJlIHBsYXllZFwifVxuICAgICAgICB9W2NvZGVdfHwwKTtcbiAgICAgICAgZXJyb3JDb2RlR2VuLmVycm9yID0gZWxWaWRlby5lcnJvcjtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZXJyb3JcIiwgZXJyb3JDb2RlR2VuKTtcbiAgICAgICAgb25FcnJvcihlcnJvckNvZGVHZW4pO1xuICAgIH07XG5cblxuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGVsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XG5cbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9