/*! OvenPlayerv0.6.4 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL0NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9MaXN0ZW5lci5qcyJdLCJuYW1lcyI6WyJleHRyYWN0VmlkZW9FbGVtZW50IiwicHJvdmlkZXJOYW1lIiwiZXh0ZW5kZWRFbGVtZW50IiwiXyIsImlzRWxlbWVudCIsIlBST1ZJREVSX0RBU0giLCJnZXRWaWRlb0VsZW1lbnQiLCJQUk9WSURFUl9ITFMiLCJtZWRpYSIsIkNvcmUiLCJwbGF5ZXJDb25maWciLCJvbkxvYWQiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsInRoYXQiLCJlbFZpZGVvIiwibGlzdGVuZXIiLCJjYW5TZWVrIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImN1cnJlbnRRdWFsaXR5Iiwic291cmNlcyIsInBvc3RlckltYWdlIiwiZ2V0Q29uZmlnIiwiaW1hZ2UiLCJwbGF5YmFja1JhdGUiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSIsInNldFF1YWxpdHlMZXZlbEJ5U291cmNlcyIsInBpY2tRdWFsaXR5IiwicXVhbGl0eSIsIk1hdGgiLCJtYXgiLCJsYWJlbCIsImkiLCJsZW5ndGgiLCJkZWZhdWx0IiwiZ2V0UXVhbGl0eUxhYmVsIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwicHJldmlvdXNTb3VyY2UiLCJzcmMiLCJzb3VyY2VFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZmlsZSIsInNvdXJjZUNoYW5nZWQiLCJsb2FkIiwiY3VycmVudFRpbWUiLCJzZWVrIiwicGxheSIsInRyaWdnZXIiLCJDT05URU5UX0xFVkVMUyIsInBvc3RlciIsImdldEN1cnJlbnRTb3VyY2UiLCJzZXRDYW5TZWVrIiwiY2FuU2Vla18iLCJpc1NlZWtpbmciLCJzZXRTZWVraW5nIiwic2Vla2luZ18iLCJzZXRQbGF5ZXJFbGVtZW50IiwiZWxlbWVudCIsInNldFN0YXRlIiwibmV3U3RhdGUiLCJwcmV2U3RhdGUiLCJTVEFURV9DT01QTEVURSIsIlBMQVlFUl9DT01QTEVURSIsIlNUQVRFX1BBVVNFRCIsIlBMQVlFUl9QQVVTRSIsIlNUQVRFX1BMQVlJTkciLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld3N0YXRlIiwiZ2V0U3RhdGUiLCJzZXRCdWZmZXIiLCJuZXdCdWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsImlzTGl2ZSIsImR1cmF0aW9uIiwiSW5maW5pdHkiLCJpc0R5bmFtaWMiLCJnZXRQb3NpdGlvbiIsInNldFZvbHVtZSIsInZvbHVtZSIsImdldFZvbHVtZSIsInNldE11dGUiLCJtdXRlZCIsIkNPTlRFTlRfTVVURSIsIm11dGUiLCJnZXRNdXRlIiwicHJlbG9hZCIsInNvdXJjZXNfIiwic3RhcnR0aW1lIiwicGF1c2UiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsImdldFBsYXliYWNrUmF0ZSIsImdldFF1YWxpdHlMZXZlbHMiLCJnZXRRdWFsaXR5TGV2ZWwiLCJiaXRyYXRlIiwid2lkdGgiLCJoZWlnaHQiLCJxdWFsaXR5TGV2ZWxzIiwibWFwIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsIm5lZWRMb2FkIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwic2V0UXVhbGl0eUxhYmVsIiwic3RvcCIsInJlbW92ZUF0dHJpYnV0ZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImRlc3Ryb3kiLCJvZmYiLCJzdXBlciIsIm5hbWUiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyIsIkxpc3RlbmVyIiwicHJvdmlkZXIiLCJsb3dMZXZlbEV2ZW50cyIsImJldHdlZW4iLCJudW0iLCJtaW4iLCJvbkVycm9yIiwiZXJyb3IiLCJTVEFURV9FUlJPUiIsIkVSUk9SIiwiY2FucGxheSIsIkNPTlRFTlRfQlVGRkVSX0ZVTEwiLCJkdXJhdGlvbmNoYW5nZSIsInByb2dyZXNzIiwiZW5kZWQiLCJDT05URU5UX0NPTVBMRVRFIiwibG9hZGVkZGF0YSIsImxvYWRlZG1ldGFkYXRhIiwidHlwZSIsIm1ldGFkYXRhIiwiQ09OVEVOVF9NRVRBIiwicGF1c2VkIiwiU1RBVEVfTE9BRElORyIsInBsYXlpbmciLCJ0aW1lUmFuZ2VzIiwiYnVmZmVyZWQiLCJlbmQiLCJDT05URU5UX0JVRkZFUiIsImJ1ZmZlclBlcmNlbnQiLCJzdGFsbGVkIiwidGltZXVwZGF0ZSIsImlzTmFOIiwiQ09OVEVOVF9USU1FIiwicmVzaXplIiwiQ09OVEVOVF9TRUVLIiwic2Vla2VkIiwiQ09OVEVOVF9TRUVLRUQiLCJ3YWl0aW5nIiwiU1RBVEVfU1RBTExFRCIsInZvbHVtZWNoYW5nZSIsInJvdW5kIiwiQ09OVEVOVF9WT0xVTUUiLCJjb2RlIiwiZXJyb3JDb2RlR2VuIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZlbnROYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBTUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsc0JBQXNCLFNBQXRCQSxtQkFBc0IsQ0FBU0MsWUFBVCxFQUF1QkMsZUFBdkIsRUFBdUM7QUFDN0QsUUFBR0MscUJBQUVDLFNBQUYsQ0FBWUYsZUFBWixDQUFILEVBQWdDO0FBQzVCLGVBQU9BLGVBQVA7QUFDSDtBQUNELFFBQUdELGlCQUFpQkks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QUFPQUMscUJBQWFwQyxLQUFiLEdBQXFCdkgsUUFBUXVILEtBQTdCOztBQUVBMUgsMEJBQWtCQyxHQUFsQixDQUFzQiwwQkFBdEIsRUFBa0Q2SixZQUFsRDtBQUNBckMsZ0JBQVFxQyxZQUFSO0FBQ0gsS0FiRDs7QUFpQkFRLFdBQU9DLElBQVAsQ0FBWWxELGNBQVosRUFBNEJtRCxPQUE1QixDQUFvQyxxQkFBYTtBQUM3Q3JLLGdCQUFRc0ssbUJBQVIsQ0FBNEJDLFNBQTVCLEVBQXVDckQsZUFBZXFELFNBQWYsQ0FBdkM7QUFDQXZLLGdCQUFRd0ssZ0JBQVIsQ0FBeUJELFNBQXpCLEVBQW9DckQsZUFBZXFELFNBQWYsQ0FBcEM7QUFDSCxLQUhEOztBQUtBeEssU0FBSzBHLE9BQUwsR0FBZSxZQUFLO0FBQ2hCNUcsMEJBQWtCQyxHQUFsQixDQUFzQiwyQkFBdEI7O0FBRUFxSyxlQUFPQyxJQUFQLENBQVlsRCxjQUFaLEVBQTRCbUQsT0FBNUIsQ0FBb0MscUJBQWE7QUFDN0NySyxvQkFBUXNLLG1CQUFSLENBQTRCQyxTQUE1QixFQUF1Q3JELGVBQWVxRCxTQUFmLENBQXZDO0FBQ0gsU0FGRDtBQUdILEtBTkQ7QUFPQSxXQUFPeEssSUFBUDtBQUNILENBNU1EOztrQkE4TWVpSCxRIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5odG1sNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI3Li5cbiAqL1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvTGlzdGVuZXJcIjtcbmltcG9ydCB7XG4gICAgU1RBVEVfSURMRSwgU1RBVEVfUExBWUlORywgU1RBVEVfUEFVU0VELCBTVEFURV9DT01QTEVURSxcbiAgICBQTEFZRVJfU1RBVEUsIFBMQVlFUl9DT01QTEVURSwgUExBWUVSX1BBVVNFLCBQTEFZRVJfUExBWSxcbiAgICBDT05URU5UX0xFVkVMUywgQ09OVEVOVF9MRVZFTF9DSEFOR0VELCBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCxcbiAgICBQTEFZQkFDS19SQVRFX0NIQU5HRUQsIENPTlRFTlRfTVVURSwgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZS5qc1wiO1xuaW1wb3J0IFByb21pc2UsIHtyZXNvbHZlZH0gZnJvbSBcImFwaS9zaGltcy9wcm9taXNlXCI7XG5cbmxldCBleHRyYWN0VmlkZW9FbGVtZW50ID0gZnVuY3Rpb24ocHJvdmlkZXJOYW1lLCBleHRlbmRlZEVsZW1lbnQpe1xuICAgIGlmKF8uaXNFbGVtZW50KGV4dGVuZGVkRWxlbWVudCkpe1xuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50O1xuICAgIH1cbiAgICBpZihwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX0RBU0gpe1xuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50LmdldFZpZGVvRWxlbWVudCgpO1xuICAgIH1lbHNlIGlmKHByb3ZpZGVyTmFtZSA9PT0gUFJPVklERVJfSExTKXtcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5tZWRpYTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIEBicmllZiAgIENvcmUgUHJvdmlkZXIuXG4gKiBAcGFyYW0gICBwcm92aWRlck5hbWUgcHJvdmlkZXIgbmFtZVxuICogQHBhcmFtICAgZXh0ZW5kZWRFbGVtZW50IGV4dGVuZGVkIG1lZGlhIG9iamVjdCBieSBtc2UuIG9yIHZpZGVvIGVsZW1lbnQuXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcbiAqIEBwYXJhbSAgIG9uTG9hZCBvbiBsb2FkIGhhbmRsZXJcbiAqICovXG5jb25zdCBDb3JlID0gZnVuY3Rpb24gKHByb3ZpZGVyTmFtZSwgZXh0ZW5kZWRFbGVtZW50LCBwbGF5ZXJDb25maWcsIG9uTG9hZCl7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG5cbiAgICBsZXQgZWxWaWRlbyA9IGV4dHJhY3RWaWRlb0VsZW1lbnQocHJvdmlkZXJOYW1lLCBleHRlbmRlZEVsZW1lbnQpO1xuICAgIGxldCBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKHByb3ZpZGVyTmFtZSwgZXh0ZW5kZWRFbGVtZW50LCBlbFZpZGVvLCB0aGF0KTtcbiAgICBsZXQgY2FuU2VlayA9IGZhbHNlO1xuICAgIGxldCBzZWVraW5nID0gZmFsc2U7XG4gICAgbGV0IHN0YXRlID0gU1RBVEVfSURMRTtcbiAgICBsZXQgYnVmZmVyID0gMDtcbiAgICBsZXQgY3VycmVudFF1YWxpdHkgPSAtMTtcbiAgICBsZXQgc291cmNlcyA9IFtdO1xuICAgIC8vbGV0IGlzTGl2ZSA9IGZhbHNlO1xuXG4gICAgbGV0IHBvc3RlckltYWdlID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmltYWdlfHxcIlwiO1xuICAgIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWVyQ29uZmlnLmdldERlZmF1bHRQbGF5YmFja1JhdGUoKTtcblxuICAgIGNvbnN0IHNldFF1YWxpdHlMZXZlbEJ5U291cmNlcyA9IChzb3VyY2VzKSA9PntcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHkgPSAoc291cmNlcykgPT57XG4gICAgICAgICAgICB2YXIgcXVhbGl0eSA9IE1hdGgubWF4KDAsIGN1cnJlbnRRdWFsaXR5KTtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID1cIlwiO1xuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBxdWFsaXR5O1xuICAgICAgICB9O1xuXG4gICAgICAgIGN1cnJlbnRRdWFsaXR5ID0gcGlja1F1YWxpdHkoc291cmNlcyk7XG4gICAgfTtcblxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAgc291cmNlc1tjdXJyZW50UXVhbGl0eV07XG4gICAgICAgIGlmKG9uTG9hZCl7XG4gICAgICAgICAgICBvbkxvYWQoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgbGV0IHByZXZpb3VzU291cmNlID0gZWxWaWRlby5zcmM7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XG5cbiAgICAgICAgICAgIHNvdXJjZUVsZW1lbnQuc3JjID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VDaGFuZ2VkID0gKHNvdXJjZUVsZW1lbnQuc3JjICE9PSBwcmV2aW91c1NvdXJjZSk7XG4gICAgICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIGVsVmlkZW8uc3JjID0gc291cmNlc1tjdXJyZW50UXVhbGl0eV0uZmlsZTtcbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgY2FsbCBsb2FkIGlmIHNyYyB3YXMgbm90IHNldC4gbG9hZCgpIHdpbGwgY2FuY2VsIGFueSBhY3RpdmUgcGxheSBwcm9taXNlLlxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSBpZihsYXN0UGxheVBvc2l0aW9uID09IDAgJiYgZWxWaWRlby5jdXJyZW50VGltZSA+IDApe1xuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTFMsIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogY3VycmVudFF1YWxpdHlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZihwb3N0ZXJJbWFnZSl7XG4gICAgICAgICAgICAgICAgZWxWaWRlby5wb3N0ZXIgPSBwb3N0ZXJJbWFnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGdldEN1cnJlbnRTb3VyY2UoKSBcIiwgc291cmNlc1tjdXJyZW50UXVhbGl0eV0pO1xuICAgICAgICByZXR1cm4gc291cmNlc1tjdXJyZW50UXVhbGl0eV07XG4gICAgfTtcblxuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHsgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGNhblNlZWsoKSBcIiwgY2FuU2Vlayk7IHJldHVybiBjYW5TZWVrO307XG4gICAgdGhhdC5zZXRDYW5TZWVrID0gKGNhblNlZWtfKSA9PiB7ICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc2V0Q2FuU2VlaygpIFwiLCBjYW5TZWVrXyk7ICBjYW5TZWVrID0gY2FuU2Vla187IH07XG5cbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57T3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGlzU2Vla2luZygpIFwiLCBzZWVraW5nKTsgcmV0dXJuIHNlZWtpbmc7fTtcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZ18pPT57IE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzZXRTZWVraW5nKCkgXCIsIHNlZWtpbmdfKTsgc2Vla2luZyA9IHNlZWtpbmdfO307XG5cbiAgICAvL3RoYXQuaXNMaXZlID0gKCk9PntyZXR1cm4gaXNMaXZlO307XG4gICAgLy90aGF0LnNldExpdmUgPSAobGl2ZSk9Pntpc0xpdmUgPSBsaXZlO307XG5cbiAgICB0aGF0LnNldFBsYXllckVsZW1lbnQgPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc2V0UGxheWVyRWxlbWVudCgpIFwiLCBlbGVtZW50KTtcbiAgICAgICAgZWxWaWRlbyA9IGVsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcbiAgICAgICAgaWYoc3RhdGUgIT0gbmV3U3RhdGUpe1xuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKG5ld1N0YXRlKXtcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0NPTVBMRVRFIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUEFVU0VEIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QTEFZSU5HIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzZXRTdGF0ZSgpIFwiLCBzdGF0ZSk7XG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1NUQVRFLCB7XG4gICAgICAgICAgICAgICAgcHJldnN0YXRlOiBwcmV2U3RhdGUsXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHN0YXRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZ2V0U3RhdGUoKSBcIiwgc3RhdGUpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHNldEJ1ZmZlcigpIFwiLCBuZXdCdWZmZXIpO1xuICAgICAgICBidWZmZXIgPSBuZXdCdWZmZXI7XG4gICAgfTtcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGdldEJ1ZmZlcigpIFwiLCBidWZmZXIpO1xuICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXG4gICAgICAgIGxldCBpc0xpdmUgPSAoZWxWaWRlby5kdXJhdGlvbiA9PSBJbmZpbml0eT8gdHJ1ZSA6IChwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX0RBU0g/IGV4dGVuZGVkRWxlbWVudC5pc0R5bmFtaWMoKSA6IGZhbHNlKSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBnZXREdXJhdGlvbigpIFwiLCBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uKTtcbiAgICAgICAgcmV0dXJuIGlzTGl2ZSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb247XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZ2V0UG9zaXRpb24oKSBcIiwgZWxWaWRlby5jdXJyZW50VGltZSk7XG4gICAgICAgIHJldHVybiBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHNldFZvbHVtZSgpIFwiLCB2b2x1bWUpO1xuICAgICAgICBlbFZpZGVvLnZvbHVtZSA9IHZvbHVtZS8xMDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZ2V0Vm9sdW1lKCkgXCIsIGVsVmlkZW8udm9sdW1lKjEwMCk7XG4gICAgICAgIHJldHVybiBlbFZpZGVvLnZvbHVtZSoxMDA7XG4gICAgfTtcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+e1xuXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSAhZWxWaWRlby5tdXRlZDtcblxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSBzdGF0ZTtcblxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzZXRNdXRlKCkgXCIsIGVsVmlkZW8ubXV0ZWQpO1xuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc2V0TXV0ZSgpIFwiLCBlbFZpZGVvLm11dGVkKTtcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcblxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzXywgbGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBwcmVsb2FkKCkgXCIsIHNvdXJjZXNfLCBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgc291cmNlcyA9IHNvdXJjZXNfO1xuICAgICAgICBzZXRRdWFsaXR5TGV2ZWxCeVNvdXJjZXMoc291cmNlcyk7XG4gICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XG4gICAgfTtcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlc18pID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogbG9hZCgpIFwiLCBzb3VyY2VzXyk7XG4gICAgICAgIHNvdXJjZXMgPSBzb3VyY2VzXztcbiAgICAgICAgc2V0UXVhbGl0eUxldmVsQnlTb3VyY2VzKHNvdXJjZXMpO1xuICAgICAgICBfbG9hZChzb3VyY2VzXy5zdGFydHRpbWUgfHwgMCk7XG4gICAgfTtcblxuICAgIHRoYXQucGxheSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogcGxheSgpIFwiKTtcbiAgICAgICAgaWYoIHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBwYXVzZSgpIFwiKTtcbiAgICAgICAgaWYoIHRoYXQuZ2V0U3RhdGUoKSA9PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHNlZWsoKSBcIiwgcG9zaXRpb24pO1xuICAgICAgICBlbFZpZGVvLmN1cnJlbnRUaW1lID0gcG9zaXRpb247XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xuICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUJBQ0tfUkFURV9DSEFOR0VELCB7cGxheWJhY2tSYXRlIDogcGxheWJhY2tSYXRlfSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzZXRQbGF5YmFja1JhdGUoKSBcIiwgcGxheWJhY2tSYXRlKTtcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGdldFBsYXliYWNrUmF0ZSgpIFwiLCBlbFZpZGVvLnBsYXliYWNrUmF0ZSk7XG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcbiAgICAgICAgdmFyIGdldFF1YWxpdHlMZXZlbCA9IGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBiaXRyYXRlOiBzb3VyY2UuYml0cmF0ZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBzb3VyY2Uud2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBzb3VyY2UuaGVpZ2h0XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGxldCBxdWFsaXR5TGV2ZWxzID0gc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gZ2V0UXVhbGl0eUxldmVsKHNvdXJjZSl9KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGdldFF1YWxpdHlMZXZlbHMoKSBcIiwgcXVhbGl0eUxldmVscyk7XG4gICAgICAgIHJldHVybiBxdWFsaXR5TGV2ZWxzO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGdldEN1cnJlbnRRdWFsaXR5KCkgXCIsIGN1cnJlbnRRdWFsaXR5KTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRRdWFsaXR5O1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgsIG5lZWRMb2FkKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBxdWFsaXR5SW5kZXgsIG5lZWRMb2FkKTtcbiAgICAgICAgaWYoY3VycmVudFF1YWxpdHkgPT0gcXVhbGl0eUluZGV4KXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihxdWFsaXR5SW5kZXggPiAtMSl7XG4gICAgICAgICAgICBpZihzb3VyY2VzICYmIHNvdXJjZXMubGVuZ3RoID4gcXVhbGl0eUluZGV4KXtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBxdWFsaXR5SW5kZXgpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5ID0gcXVhbGl0eUluZGV4O1xuXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogcXVhbGl0eUluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0UXVhbGl0eUxhYmVsKHNvdXJjZXNbcXVhbGl0eUluZGV4XS5sYWJlbCk7XG4gICAgICAgICAgICAgICAgaWYobmVlZExvYWQpe1xuXG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsVmlkZW8uY3VycmVudFRpbWUgfHwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UXVhbGl0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdwcmVsb2FkJyk7XG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgd2hpbGUgKGVsVmlkZW8uZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVDaGlsZChlbFZpZGVvLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIHRoYXQuc3RvcCgpO1xuICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XG4gICAgICAgIC8vZWxWaWRlby5yZW1vdmUoKTtcbiAgICAgICAgdGhhdC5vZmYoKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGRlc3Ryb3koKSBwbGF5ZXIgc3RvcCwgbGlzdGVuZXIsIGV2ZW50IGRlc3Ryb2llZFwiKTtcbiAgICB9O1xuXG4gICAgLy9YWFggOiBUaGlzIGlzIGVzNi4gU28gd2UgY2FuJ3QgXCJwcm90b3R5cGUgZXhwb3J0XCIuIEZpbmFsbHkgSSBjb25zaWRlciB0aGlzIG1ldGhvZC5cbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29yZTsiLCJpbXBvcnQge1xuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUFJPVklERVJfSFRNTDUsXG4gICAgUFJPVklERVJfV0VCUlRDLFxuICAgIFBST1ZJREVSX0RBU0gsXG4gICAgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cblxuLyoqXG4gKiBAYnJpZWYgICBUcmlnZ2VyIG9uIHZhcmlvdXMgdmlkZW8gZXZlbnRzLlxuICogQHBhcmFtICAgcHJvdmlkZXJOYW1lIGNoaWxkIFByb3ZpZGVyIE5hbWVcbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLlxuICogQHBhcmFtICAgZWxlbWVudCBlbFZpZGVvICB2aWRlb1xuICogQHBhcmFtICAgUHJvdmlkZXIgcHJvdmlkZXIgIGh0bWw1UHJvdmlkZXJcbiAqICovXG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24ocHJvdmlkZXJOYW1lLCBleHRlbmRlZEVsZW1lbnQsIGVsVmlkZW8sIHByb3ZpZGVyKXtcbiAgICBjb25zdCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciBsb2FkZWQuXCIpO1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBjb25zdCBiZXR3ZWVuID0gZnVuY3Rpb24gKG51bSwgbWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKG51bSwgbWF4KSwgbWluKTtcbiAgICB9XG4gICAgY29uc3Qgb25FcnJvciA9IGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xuICAgIH07XG5cbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgbG93TGV2ZWxFdmVudHMuY2FucGxheSA9ICgpID0+IHtcbiAgICAgICAgcHJvdmlkZXIuc2V0Q2FuU2Vlayh0cnVlKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUl9GVUxMKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGNhbnBsYXlcIik7XG4gICAgfTtcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGR1cmF0aW9uIG9mIHRoZSBhdWRpby92aWRlbyBpcyBjaGFuZ2VkXG4gICAgbG93TGV2ZWxFdmVudHMuZHVyYXRpb25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzKCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBkdXJhdGlvbmNoYW5nZVwiKTtcbiAgICB9O1xuICAgIC8vRmlyZXMgd2hlbiB0aGUgY3VycmVudCBwbGF5bGlzdCBpcyBlbmRlZFxuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZW5kZWRcIik7XG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9IFNUQVRFX0NPTVBMRVRFKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9DT01QTEVURSk7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIHRoZSBjdXJyZW50IGZyYW1lIG9mIHRoZSBhdWRpby92aWRlb1xuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZGRhdGEgPSAoKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZyBCZWNhdXNlIHRoaXMgY2F1c2VzIGNoYW9zIGJ5IGxvYWRlZG1ldGFkYXRhLlxuICAgICAgICAvKlxuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgICAgICAgICBkdXJhdGlvbjogZWxWaWRlby5kdXJhdGlvbixcbiAgICAgICAgICAgIGhlaWdodDogZWxWaWRlby52aWRlb0hlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiBlbFZpZGVvLnZpZGVvV2lkdGhcbiAgICAgICAgfTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTsqL1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gbG9hZGVkZGF0YVwiKTtcbiAgICB9O1xuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIG1ldGEgZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkbWV0YWRhdGEgPSAoKSA9PiB7XG4gICAgICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT0gSW5maW5pdHk/IHRydWUgOiAocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9EQVNIPyBleHRlbmRlZEVsZW1lbnQuaXNEeW5hbWljKCkgOiBmYWxzZSkpO1xuICAgICAgICBsZXQgdHlwZSA9IHByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKSA/IHByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKS50eXBlIDogXCJcIjtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xuICAgICAgICAgICAgZHVyYXRpb246IGlzTGl2ZSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb24sXG4gICAgICAgICAgICB0eXBlIDp0eXBlXG4gICAgICAgIH07XG4gICAgICAgIC8vcHJvdmlkZXIuc2V0TGl2ZShpc0xpdmUpO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRtZXRhZGF0YVwiLCBtZXRhZGF0YSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7XG4gICAgfTtcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHBhdXNlZFxuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gKCkgPT4ge1xuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9DT01QTEVURSB8fHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0VSUk9SKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihlbFZpZGVvLmVuZGVkKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihlbFZpZGVvLmVycm9yKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihlbFZpZGVvLmN1cnJlbnRUaW1lID09PSBlbFZpZGVvLmR1cmF0aW9uKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGF1c2VcIik7XG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BBVVNFRCk7XG4gICAgfTtcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHN0YXJ0ZWQgb3IgaXMgbm8gbG9uZ2VyIHBhdXNlZFxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXkgPSAoKSA9PiB7XG4gICAgICAgIGlmICghZWxWaWRlby5wYXVzZWQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBsYXlcIik7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGlzIHBsYXlpbmcgYWZ0ZXIgaGF2aW5nIGJlZW4gcGF1c2VkIG9yIHN0b3BwZWQgZm9yIGJ1ZmZlcmluZ1xuICAgIGxvd0xldmVsRXZlbnRzLnBsYXlpbmcgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwbGF5aW5nXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcbiAgICAgICAgLy9wcm92aWRlci50cmlnZ2VyKFBST1ZJREVSX0ZJUlNUX0ZSQU1FKTtcbiAgICB9O1xuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBpcyBkb3dubG9hZGluZyB0aGUgYXVkaW8vdmlkZW9cbiAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcyA9ICgpID0+IHtcbiAgICAgICAgbGV0IHRpbWVSYW5nZXMgPSBlbFZpZGVvLmJ1ZmZlcmVkO1xuICAgICAgICBpZighdGltZVJhbmdlcyApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbiwgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICBsZXQgYnVmZmVyZWQgPSBiZXR3ZWVuKCAodGltZVJhbmdlcy5sZW5ndGg+IDAgPyB0aW1lUmFuZ2VzLmVuZCh0aW1lUmFuZ2VzLmxlbmd0aCAtIDEpIDogMCApIC8gZHVyYXRpb24sIDAsIDEpO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwcm9ncmVzc1wiLCBidWZmZXJlZCoxMDApO1xuXG4gICAgICAgIHByb3ZpZGVyLnNldEJ1ZmZlcihidWZmZXJlZCoxMDApO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSLCB7XG4gICAgICAgICAgICBidWZmZXJQZXJjZW50OiBidWZmZXJlZCoxMDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogIHBvc2l0aW9uLFxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGlzIHRyeWluZyB0byBnZXQgbWVkaWEgZGF0YSwgYnV0IGRhdGEgaXMgbm90IGF2YWlsYWJsZVxuICAgIGxvd0xldmVsRXZlbnRzLnN0YWxsZWQgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzdGFsbFwiKTtcbiAgICB9O1xuICAgIC8vRmlyZXMgd2hlbiB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiBoYXMgY2hhbmdlZFxuICAgIGxvd0xldmVsRXZlbnRzLnRpbWV1cGRhdGUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uO1xuICAgICAgICBpZiAoaXNOYU4oZHVyYXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkgJiYgIWVsVmlkZW8ucGF1c2VkKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB0aW1ldXBkYXRlXCIgLCB7XG4gICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HIHx8IHByb3ZpZGVyLmlzU2Vla2luZygpKSB7XG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzLnJlc2l6ZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHJlc2l6ZVwiKTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtpbmcgPSAoKSA9PiB7XG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcodHJ1ZSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVraW5nXCIsIGVsVmlkZW8uY3VycmVudFRpbWUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFSyx7XG4gICAgICAgICAgICBwb3NpdGlvbiA6IGVsVmlkZW8uY3VycmVudFRpbWVcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50cy5zZWVrZWQgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtlZFwiKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyhmYWxzZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLRUQpO1xuICAgIH07XG5cbiAgICAvL0ZpcmVzIHdoZW4gdGhlIHZpZGVvIHN0b3BzIGJlY2F1c2UgaXQgbmVlZHMgdG8gYnVmZmVyIHRoZSBuZXh0IGZyYW1lXG4gICAgbG93TGV2ZWxFdmVudHMud2FpdGluZyA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIiwgcHJvdmlkZXIuZ2V0U3RhdGUoKSk7XG4gICAgICAgIGlmKHByb3ZpZGVyLmlzU2Vla2luZygpKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuICAgICAgICB9ZWxzZSBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfU1RBTExFRCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMudm9sdW1lY2hhbmdlID0gKCkgPT4ge1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB2b2x1bWVjaGFuZ2VcIiwgTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCkpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVk9MVU1FLCB7XG4gICAgICAgICAgICB2b2x1bWU6IE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApLFxuICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxWaWRlby5lcnJvciAmJiBlbFZpZGVvLmVycm9yLmNvZGUpIHx8IDA7XG4gICAgICAgIGNvbnN0IGVycm9yQ29kZUdlbiA9ICh7XG4gICAgICAgICAgICAwOiB7Y29kZSA6IFBMQVlFUl9VTktOV09OX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gaHRtbDUgdmlkZW8gZXJyb3JcIiwgbWVzc2FnZSA6IFwiVW5rbm93biBodG1sNSB2aWRlbyBlcnJvclwifSxcbiAgICAgICAgICAgIDE6IHtjb2RlIDogUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gb3BlcmF0aW9uIGFib3J0ZWRcIiwgbWVzc2FnZSA6IFwiVW5rbm93biBvcGVyYXRpb24gYWJvcnRlZFwifSxcbiAgICAgICAgICAgIDI6IHtjb2RlIDogUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiwgcmVhc29uIDogXCJVbmtub3duIG5ldHdvcmsgZXJyb3JcIiwgbWVzc2FnZSA6IFwiVW5rbm93biBuZXR3b3JrIGVycm9yXCJ9LFxuICAgICAgICAgICAgMzoge2NvZGUgOiBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsIHJlYXNvbiA6IFwiVW5rbm93biBkZWNvZGUgZXJyb3JcIiwgbWVzc2FnZSA6IFwiVW5rbm93biBkZWNvZGUgZXJyb3JcIn0sXG4gICAgICAgICAgICA0OiB7Y29kZSA6IFBMQVlFUl9GSUxFX0VSUk9SLCByZWFzb24gOiBcIkZpbGUgY291bGQgbm90IGJlIHBsYXllZFwiLCBtZXNzYWdlIDogXCJGaWxlIGNvdWxkIG5vdCBiZSBwbGF5ZWRcIn1cbiAgICAgICAgfVtjb2RlXXx8MCk7XG4gICAgICAgIGVycm9yQ29kZUdlbi5lcnJvciA9IGVsVmlkZW8uZXJyb3I7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVycm9yXCIsIGVycm9yQ29kZUdlbik7XG4gICAgICAgIG9uRXJyb3IoZXJyb3JDb2RlR2VuKTtcbiAgICB9O1xuXG5cblxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICBlbFZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICB9KTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyJdLCJzb3VyY2VSb290IjoiIn0=