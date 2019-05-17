/*! OvenPlayerv0.9.498 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        console.log("EventListener : 순수 playing");
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
            console.log("EventListener : 만들어진 playing");
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

    lowLevelEvents.stalled = function () {
        console.log("EventListener : on stalled");
    };

    lowLevelEvents.waiting = function () {
        console.log("EventListener : on waiting");
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
        var isLive = elVideo.duration === Infinity ? true : (0, _utils.separateLive)(spec.mse);
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
            if (ads && (ads.isActive() || !ads.started())) {
                ads.play().then(function (_) {
                    // started!
                })["catch"](function (error) {
                    OvenPlayerConsole.log(error);
                });
            } else {
                if (that.getName() === _constants.PROVIDER_DASH && ads && !dashAttachedView) {
                    //Ad steals dash's video element. Put in right place.
                    spec.mse.attachView(elVideo);
                    dashAttachedView = true;
                }

                var promise = elVideo.play();
                if (promise !== undefined) {
                    promise.then(function (_) {
                        // started!
                    })["catch"](function (error) {
                        //Can't play because User doesn't any interactions.
                        //Wait for User Interactions. (like click)
                        setTimeout(function () {
                            that.play();
                        }, 500);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwibXNlIiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsInRvRml4ZWQiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsInRyaWdnZXIiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJzZXRTdGF0ZSIsImxvYWRlZGRhdGEiLCJsb2FkZWRtZXRhZGF0YSIsImlzTGl2ZSIsImR1cmF0aW9uIiwiSW5maW5pdHkiLCJzb3VyY2VzIiwiZ2V0U291cmNlcyIsInNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZSIsInR5cGUiLCJtZXRhZGF0YSIsIkNPTlRFTlRfTUVUQSIsInBhdXNlIiwiU1RBVEVfRVJST1IiLCJlcnJvciIsImN1cnJlbnRUaW1lIiwiU1RBVEVfUEFVU0VEIiwicGxheSIsInBhdXNlZCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9MT0FESU5HIiwicGxheWluZyIsImNvbnNvbGUiLCJ0aW1lUmFuZ2VzIiwiYnVmZmVyZWQiLCJsZW5ndGgiLCJlbmQiLCJzZXRCdWZmZXIiLCJDT05URU5UX0JVRkZFUiIsImJ1ZmZlclBlcmNlbnQiLCJ0aW1ldXBkYXRlIiwiaXNOYU4iLCJpc1NlZWtpbmciLCJTVEFURV9TVEFMTEVEIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldmVudE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVzdHJveSIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsIm9uRXh0ZW5kZWRMb2FkIiwiZGFzaEF0dGFjaGVkVmlldyIsImFkcyIsImxpc3RlbmVyIiwicG9zdGVySW1hZ2UiLCJnZXRDb25maWciLCJpbWFnZSIsImFkVGFnVXJsIiwicGxheWJhY2tSYXRlIiwiZGVmYXVsdFBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsImN1cnJlbnRTb3VyY2UiLCJmcmFtZXJhdGUiLCJzZXRUaW1lY29kZU1vZGUiLCJwcmV2aW91c1NvdXJjZSIsInNyYyIsInNvdXJjZUVsZW1lbnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJmaWxlIiwic291cmNlQ2hhbmdlZCIsImFwcGVuZCIsImxvYWQiLCJzZWVrIiwiZ2V0TmFtZSIsIm5hbWUiLCJjYW5TZWVrIiwibmV3U3RhdGUiLCJzdGF0ZSIsInByZXZTdGF0ZSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwibmV3c3RhdGUiLCJuZXdCdWZmZXIiLCJidWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsImdldFBvc2l0aW9uIiwic2V0Vm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0TXV0ZSIsIkNPTlRFTlRfTVVURSIsImdldE11dGUiLCJwcmVsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpc0F1dG9TdGFydCIsImlzTXV0ZSIsInN0YXJ0dGltZSIsImlzQWN0aXZlIiwic3RhcnRlZCIsInRoZW4iLCJQUk9WSURFUl9EQVNIIiwiYXR0YWNoVmlldyIsInByb21pc2UiLCJ1bmRlZmluZWQiLCJzZXRUaW1lb3V0IiwiU1RBVEVfQURfUExBWUlORyIsInNldFBsYXliYWNrUmF0ZSIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIm1hcCIsImluZGV4IiwibGFiZWwiLCJzZXRDdXJyZW50U291cmNlIiwibmVlZFByb3ZpZGVyQ2hhbmdlIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsInNldFNvdXJjZUxhYmVsIiwiZ2V0UXVhbGl0eUxldmVscyIsInF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsImN1cnJlbnRRdWFsaXR5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRGcmFtZXJhdGUiLCJzZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZnBzIiwiY3VycmVudEZyYW1lcyIsIm5ld1Bvc2l0aW9uIiwic3RvcCIsInJlbW92ZUF0dHJpYnV0ZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsIm9mZiIsIm1ldGhvZCIsImFwcGx5IiwiYXJndW1lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQTRCQTs7QUFFQTs7Ozs7O0FBT0EsSUFBTUEsV0FBVyxTQUFYQSxRQUFXLENBQVND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LDBCQUFrQkMsR0FBbEIsQ0FBc0IseURBQXRCO0FBQ0gsS0FiRDs7QUFlQTtBQUNBO0FBQ0FDLG9CQUFhLFVBQUNtSCxJQUFELEVBQVU7QUFDbkIsWUFBTW1FLFNBQVN0TCxLQUFLbUgsSUFBTCxDQUFmO0FBQ0EsZUFBTyxZQUFVO0FBQ2IsbUJBQU9tRSxPQUFPQyxLQUFQLENBQWF2TCxJQUFiLEVBQW1Cd0wsU0FBbkIsQ0FBUDtBQUNILFNBRkQ7QUFHSCxLQUxEO0FBTUEsV0FBT3hMLElBQVA7QUFFSCxDQWhZRCxDLENBcEJBOzs7cUJBc1plb0YsUSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBFUlJPUlMsXG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlLCBlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUcmlnZ2VyIG9uIHZhcmlvdXMgdmlkZW8gZXZlbnRzLlxuICogQHBhcmFtICAgZXh0ZW5kZWRFbGVtZW50IGV4dGVuZGVkIG1lZGlhIG9iamVjdCBieSBtc2UuXG4gKiBAcGFyYW0gICBQcm92aWRlciBwcm92aWRlciAgaHRtbDVQcm92aWRlclxuICogKi9cblxuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGVsZW1lbnQsIG1zZSwgcHJvdmlkZXIsIHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgY29uc3QgbG93TGV2ZWxFdmVudHMgPSB7fTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgbG9hZGVkLlwiLGVsZW1lbnQgLHByb3ZpZGVyICk7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuXG4gICAgbGV0IHN0YWxsZWQgPSAtMTtcbiAgICBsZXQgZWxWaWRlbyA9ICBlbGVtZW50O1xuICAgIGNvbnN0IGJldHdlZW4gPSBmdW5jdGlvbiAobnVtLCBtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4obnVtLCBtYXgpLCBtaW4pO1xuICAgIH1cbiAgICBjb25zdCBjb21wYXJlU3RhbGxlZFRpbWUgPSBmdW5jdGlvbihzdGFsbGVkLCBwb3NpdGlvbil7XG4gICAgICAgIC8vT3JpZ2luYWwgQ29kZSBpcyBzdGFsbGVkICE9PSBwb3NpdGlvblxuICAgICAgICAvL0JlY2F1c2UgRGFzaGpzIGlzIHZlcnkgbWV0aWN1bG91cy4gVGhlbiBhbHdheXMgZGlmZnJlbmNlIHN0YWxsZWQgYW5kIHBvc2l0aW9uLlxuICAgICAgICAvL1RoYXQgaXMgd2h5IHdoZW4gSSB1c2UgdG9GaXhlZCgyKS5cbiAgICAgICAgcmV0dXJuIHN0YWxsZWQudG9GaXhlZCgyKSA9PT0gcG9zaXRpb24udG9GaXhlZCgyKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuY2FucGxheSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGNhbiBzdGFydCBwbGF5aW5nIHRoZSBhdWRpby92aWRlb1xuICAgICAgICBwcm92aWRlci5zZXRDYW5TZWVrKHRydWUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSX0ZVTEwpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gY2FucGxheVwiKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuZHVyYXRpb25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgZHVyYXRpb24gb2YgdGhlIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWRcbiAgICAgICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MoKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGR1cmF0aW9uY2hhbmdlXCIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5lbmRlZCA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXlsaXN0IGlzIGVuZGVkXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlbmRlZFwiKTtcblxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpICE9IFNUQVRFX0lETEUgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPSBTVEFURV9DT01QTEVURSl7XG4gICAgICAgICAgICBpZih2aWRlb0VuZGVkQ2FsbGJhY2spe1xuICAgICAgICAgICAgICAgIHZpZGVvRW5kZWRDYWxsYmFjayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkZGF0YSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgdGhlIGN1cnJlbnQgZnJhbWUgb2YgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIC8vRG8gbm90aGluZyBCZWNhdXNlIHRoaXMgY2F1c2VzIGNoYW9zIGJ5IGxvYWRlZG1ldGFkYXRhLlxuICAgICAgICAvKlxuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgICAgICAgICBkdXJhdGlvbjogZWxWaWRlby5kdXJhdGlvbixcbiAgICAgICAgICAgIGhlaWdodDogZWxWaWRlby52aWRlb0hlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiBlbFZpZGVvLnZpZGVvV2lkdGhcbiAgICAgICAgfTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTsqL1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRtZXRhZGF0YSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgbWV0YSBkYXRhIGZvciB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgbGV0IGlzTGl2ZSA9IChlbFZpZGVvLmR1cmF0aW9uID09PSBJbmZpbml0eSkgPyB0cnVlIDogc2VwYXJhdGVMaXZlKG1zZSk7XG4gICAgICAgIGxldCBzb3VyY2VzID0gcHJvdmlkZXIuZ2V0U291cmNlcygpO1xuICAgICAgICBsZXQgc291cmNlSW5kZXggPSBwcm92aWRlci5nZXRDdXJyZW50U291cmNlKCk7XG4gICAgICAgIGxldCB0eXBlID0gc291cmNlSW5kZXggPiAtMSA/IHNvdXJjZXNbc291cmNlSW5kZXhdLnR5cGUgOiBcIlwiO1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgICAgICAgICBkdXJhdGlvbjogaXNMaXZlID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbixcbiAgICAgICAgICAgIHR5cGUgOnR5cGVcbiAgICAgICAgfTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gbG9hZGVkbWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBwYXVzZWRcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQ09NUExFVEUgfHwgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfRVJST1Ipe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uZW5kZWQpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uZXJyb3Ipe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uY3VycmVudFRpbWUgPT09IGVsVmlkZW8uZHVyYXRpb24pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwYXVzZVwiKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUEFVU0VEKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucGxheSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBzdGFydGVkIG9yIGlzIG5vIGxvbmdlciBwYXVzZWRcbiAgICAgICAgc3RhbGxlZCA9IC0xO1xuICAgICAgICBpZiAoIWVsVmlkZW8ucGF1c2VkICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXlpbmcgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IOyInOyImCBwbGF5aW5nXCIpO1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGlzIHBsYXlpbmcgYWZ0ZXIgaGF2aW5nIGJlZW4gcGF1c2VkIG9yIHN0b3BwZWQgZm9yIGJ1ZmZlcmluZ1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheWluZ1wiKTtcbiAgICAgICAgaWYoc3RhbGxlZCA8IDApe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBpcyBkb3dubG9hZGluZyB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgbGV0IHRpbWVSYW5nZXMgPSBlbFZpZGVvLmJ1ZmZlcmVkO1xuICAgICAgICBpZighdGltZVJhbmdlcyApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbiwgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICBsZXQgYnVmZmVyZWQgPSBiZXR3ZWVuKCAodGltZVJhbmdlcy5sZW5ndGg+IDAgPyB0aW1lUmFuZ2VzLmVuZCh0aW1lUmFuZ2VzLmxlbmd0aCAtIDEpIDogMCApIC8gZHVyYXRpb24sIDAsIDEpO1xuXG4gICAgICAgIHByb3ZpZGVyLnNldEJ1ZmZlcihidWZmZXJlZCoxMDApO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSLCB7XG4gICAgICAgICAgICBidWZmZXJQZXJjZW50OiBidWZmZXJlZCoxMDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogIHBvc2l0aW9uLFxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcHJvZ3Jlc3NcIiwgYnVmZmVyZWQqMTAwKTtcbiAgICB9O1xuXG5cbiAgICBsb3dMZXZlbEV2ZW50cy50aW1ldXBkYXRlID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb247XG4gICAgICAgIGlmIChpc05hTihkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkgJiYgIWVsVmlkZW8ucGF1c2VkICYmIChwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9TVEFMTEVEIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0xPQURJTkcpICYmXG4gICAgICAgICAgICAhY29tcGFyZVN0YWxsZWRUaW1lKHN0YWxsZWQsIHBvc2l0aW9uKSApe1xuICAgICAgICAgICAgc3RhbGxlZCA9IC0xO1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiDrp4zrk6TslrTsp4QgcGxheWluZ1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HIHx8IHByb3ZpZGVyLmlzU2Vla2luZygpKSB7XG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2luZyA9ICgpID0+IHtcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyh0cnVlKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtpbmdcIiwgZWxWaWRlby5jdXJyZW50VGltZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLLHtcbiAgICAgICAgICAgIHBvc2l0aW9uIDogZWxWaWRlby5jdXJyZW50VGltZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtlZCA9ICgpID0+IHtcbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2VkXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKGZhbHNlKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUtFRCk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnN0YWxsZWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHN0YWxsZWRcIik7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLndhaXRpbmcgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIik7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgdmlkZW8gc3RvcHMgYmVjYXVzZSBpdCBuZWVkcyB0byBidWZmZXIgdGhlIG5leHQgZnJhbWVcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIiwgcHJvdmlkZXIuZ2V0U3RhdGUoKSk7XG4gICAgICAgIGlmKHByb3ZpZGVyLmlzU2Vla2luZygpKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuICAgICAgICB9ZWxzZSBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIHN0YWxsZWQgPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfU1RBTExFRCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMudm9sdW1lY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gdm9sdW1lY2hhbmdlXCIsIE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwge1xuICAgICAgICAgICAgdm9sdW1lOiBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSxcbiAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb2RlID0gKGVsVmlkZW8uZXJyb3IgJiYgZWxWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xuICAgICAgICBsZXQgY29udmVydGVkRXJyb0NvZGUgPSAoe1xuICAgICAgICAgICAgMDogUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgICAgICAgICAxOiBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgICAgICAgICAyOiBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgICAgICAgICAgMzogUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgICAgICAgICAgNDogUExBWUVSX0ZJTEVfRVJST1JcbiAgICAgICAgfVtjb2RlXXx8MCk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVycm9yXCIsIGNvbnZlcnRlZEVycm9Db2RlKTtcbiAgICAgICAgZXJyb3JUcmlnZ2VyKEVSUk9SU1tjb252ZXJ0ZWRFcnJvQ29kZV0pO1xuICAgIH07XG5cbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgZWxWaWRlby5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgfSk7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyNy4uXG4gKi9cbmltcG9ydCBBZHMgZnJvbSBcImFwaS9wcm92aWRlci9hZHMvQWRzXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9MaXN0ZW5lclwiO1xuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBzZXBhcmF0ZUxpdmUsIHBpY2tDdXJyZW50U291cmNlfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIFNUQVRFX0lETEUsIFNUQVRFX1BMQVlJTkcsIFNUQVRFX1BBVVNFRCwgU1RBVEVfQ09NUExFVEUsXG4gICAgUExBWUVSX1NUQVRFLCBQTEFZRVJfQ09NUExFVEUsIFBMQVlFUl9QQVVTRSwgUExBWUVSX1BMQVksIFNUQVRFX0FEX1BMQVlJTkcsXG4gICAgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIENPTlRFTlRfU09VUkNFX0NIQU5HRUQsXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIENvcmUgRm9yIEh0bWw1IFZpZGVvLlxuICogQHBhcmFtICAgc3BlYyBtZW1iZXIgdmFsdWVcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xuICogQHBhcmFtICAgb25FeHRlbmRlZExvYWQgb24gbG9hZCBoYW5kbGVyXG4gKiAqL1xuY29uc3QgUHJvdmlkZXIgPSBmdW5jdGlvbiAoc3BlYywgcGxheWVyQ29uZmlnLCBvbkV4dGVuZGVkTG9hZCl7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcblxuICAgIGxldCB0aGF0ID17fTtcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XG5cbiAgICBsZXQgZGFzaEF0dGFjaGVkVmlldyA9IGZhbHNlO1xuXG4gICAgbGV0IGVsVmlkZW8gPSBzcGVjLmVsZW1lbnQ7XG4gICAgbGV0IGFkcyA9IG51bGwsIGxpc3RlbmVyID0gbnVsbCwgdmlkZW9FbmRlZENhbGxiYWNrID0gbnVsbDtcbiAgICBsZXQgcG9zdGVySW1hZ2UgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuaW1hZ2V8fFwiXCI7XG5cbiAgICBpZihzcGVjLmFkVGFnVXJsKXtcbiAgICAgICAgYWRzID0gQWRzKGVsVmlkZW8sIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XG4gICAgfVxuICAgIGxpc3RlbmVyID0gRXZlbnRzTGlzdGVuZXIoZWxWaWRlbywgc3BlYy5tc2UsIHRoYXQsIGFkcyA/IGFkcy52aWRlb0VuZGVkQ2FsbGJhY2sgOiBudWxsKTtcbiAgICBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXllckNvbmZpZy5nZXRQbGF5YmFja1JhdGUoKTtcblxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAgc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV07XG4gICAgICAgIHNwZWMuZnJhbWVyYXRlID0gc291cmNlLmZyYW1lcmF0ZTtcbiAgICAgICAgaWYoIXNwZWMuZnJhbWVyYXRlKXtcbiAgICAgICAgICAgIC8vaW5pdCB0aW1lY29kZSBtb2RlXG4gICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9uRXh0ZW5kZWRMb2FkKXtcbiAgICAgICAgICAgIG9uRXh0ZW5kZWRMb2FkKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1NvdXJjZSA9IGVsVmlkZW8uc3JjO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xuXG4gICAgICAgICAgICBzb3VyY2VFbGVtZW50LnNyYyA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2VFbGVtZW50LnNyYyAhPT0gcHJldmlvdXNTb3VyY2UpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAvL2VsVmlkZW8uc3JjID0gc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV0uZmlsZTtcbiAgICAgICAgICAgICAgICBlbFZpZGVvLmFwcGVuZChzb3VyY2VFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgY2FsbCBsb2FkIGlmIHNyYyB3YXMgbm90IHNldC4gbG9hZCgpIHdpbGwgY2FuY2VsIGFueSBhY3RpdmUgcGxheSBwcm9taXNlLlxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSBpZihsYXN0UGxheVBvc2l0aW9uID09PSAwICYmIGVsVmlkZW8uY3VycmVudFRpbWUgPiAwKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzcGVjLmN1cnJlbnRTb3VyY2VcbiAgICAgICAgICAgIH0pOyovXG5cbiAgICAgICAgICAgIGlmKHBvc3RlckltYWdlKXtcbiAgICAgICAgICAgICAgICAvL1RoZXJlIGlzIG5vIHdheSB0byB2ZXJpZnkgdGhlIHBvc3RlckltYWdlIFVSTC4gVGhpcyB3aWxsIGJlIGJsbmFrIHVudGlsIGhhdmUgYSBnb29kIGlkZWEuXG4gICAgICAgICAgICAgICAgLy9lbFZpZGVvLnN0eWxlLmJhY2tncm91bmQgPSBcInRyYW5zcGFyZW50IHVybCgnXCIrcG9zdGVySW1hZ2UrXCInKSBuby1yZXBlYXQgMCAwXCI7XG4gICAgICAgICAgICAgICAgLy9lbFZpZGVvLnBvc3RlciA9IHBvc3RlckltYWdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LmdldE5hbWUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XG4gICAgfTtcbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LnNldENhblNlZWsgPSAoY2FuU2VlaykgPT4ge1xuICAgICAgICBzcGVjLmNhblNlZWsgPSBjYW5TZWVrO1xuICAgIH07XG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e1xuICAgICAgICByZXR1cm4gc3BlYy5zZWVraW5nO1xuICAgIH07XG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmcpPT57XG4gICAgICAgIHNwZWMuc2Vla2luZyA9IHNlZWtpbmc7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHNwZWMuc3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2gobmV3U3RhdGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQ09NUExFVEUgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwZWMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcbiAgICAgICAgICAgICAgICBwcmV2c3RhdGUgOiBwcmV2U3RhdGUsXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLnN0YXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XG4gICAgICAgIHNwZWMuYnVmZmVyID0gbmV3QnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmJ1ZmZlcjtcbiAgICB9O1xuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGxldCBpc0xpdmUgPSAoZWxWaWRlby5kdXJhdGlvbiA9PT0gSW5maW5pdHkpID8gdHJ1ZSA6IHNlcGFyYXRlTGl2ZShzcGVjLm1zZSk7XG4gICAgICAgIHJldHVybiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uO1xuICAgIH07XG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgfTtcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby52b2x1bWUgPSB2b2x1bWUvMTAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8udm9sdW1lKjEwMDtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gIWVsVmlkZW8ubXV0ZWQ7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gc3RhdGU7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcblxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcblxuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzTXV0ZSgpKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpe1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcbiAgICAgICAgX2xvYWQoc3BlYy5zb3VyY2VzLnN0YXJ0dGltZSB8fCAwKTtcbiAgICB9O1xuXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBpZiAoIGFkcyAmJiAoYWRzLmlzQWN0aXZlKCkgfHwgIWFkcy5zdGFydGVkKCkpICApIHtcbiAgICAgICAgICAgICAgICBhZHMucGxheSgpLnRoZW4oXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0ZWQhXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZih0aGF0LmdldE5hbWUoKSA9PT0gUFJPVklERVJfREFTSCAmJiBhZHMgJiYgIWRhc2hBdHRhY2hlZFZpZXcpe1xuICAgICAgICAgICAgICAgICAgICAvL0FkIHN0ZWFscyBkYXNoJ3MgdmlkZW8gZWxlbWVudC4gUHV0IGluIHJpZ2h0IHBsYWNlLlxuICAgICAgICAgICAgICAgICAgICBzcGVjLm1zZS5hdHRhY2hWaWV3KGVsVmlkZW8pO1xuICAgICAgICAgICAgICAgICAgICBkYXNoQXR0YWNoZWRWaWV3ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZSA9IGVsVmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgIGlmIChwcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKF8gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnRlZCFcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9DYW4ndCBwbGF5IGJlY2F1c2UgVXNlciBkb2Vzbid0IGFueSBpbnRlcmFjdGlvbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1dhaXQgZm9yIFVzZXIgSW50ZXJhY3Rpb25zLiAobGlrZSBjbGljaylcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XG4gICAgICAgIH1lbHNlIGlmKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORyl7XG4gICAgICAgICAgICBhZHMucGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsVmlkZW8uY3VycmVudFRpbWUgPSBwb3NpdGlvbjtcbiAgICB9O1xuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUJBQ0tfUkFURV9DSEFOR0VELCB7cGxheWJhY2tSYXRlIDogcGxheWJhY2tSYXRlfSk7XG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXG4gICAgICAgICAgICAgICAgaW5kZXggOiBpbmRleFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChzb3VyY2VJbmRleCwgbmVlZFByb3ZpZGVyQ2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZihzcGVjLmN1cnJlbnRTb3VyY2UgPT09IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNvdXJjZUluZGV4ID4gLTEpe1xuICAgICAgICAgICAgaWYoc3BlYy5zb3VyY2VzICYmIHNwZWMuc291cmNlcy5sZW5ndGggPiBzb3VyY2VJbmRleCl7XG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgLy90aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBzb3VyY2VJbmRleCk7XG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gc291cmNlSW5kZXg7XG5cbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzb3VyY2VJbmRleFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAvL3NwZWMuY3VycmVudFF1YWxpdHkgPSBzb3VyY2VJbmRleDtcbiAgICAgICAgICAgICAgICBpZihuZWVkUHJvdmlkZXJDaGFuZ2Upe1xuICAgICAgICAgICAgICAgICAgICBfbG9hZChlbFZpZGVvLmN1cnJlbnRUaW1lIHx8IDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGV2ZWxzO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0RnJhbWVyYXRlID0gKGZyYW1lcmF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGUgPSBmcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PntcbiAgICAgICAgbGV0IGZwcyA9IHNwZWMuZnJhbWVyYXRlO1xuICAgICAgICBsZXQgY3VycmVudEZyYW1lcyA9IGVsVmlkZW8uY3VycmVudFRpbWUgKiBmcHM7XG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IChjdXJyZW50RnJhbWVzICsgZnJhbWVDb3VudCkgLyBmcHM7XG4gICAgICAgIG5ld1Bvc2l0aW9uID0gbmV3UG9zaXRpb24gKyAwLjAwMDAxOyAvLyBGSVhFUyBBIFNBRkFSSSBTRUVLIElTU1VFLiBteVZkaWVvLmN1cnJlbnRUaW1lID0gMC4wNCB3b3VsZCBnaXZlIFNNUFRFIDAwOjAwOjAwOjAwIHdoZXJhcyBpdCBzaG91bGQgZ2l2ZSAwMDowMDowMDowMVxuXG4gICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgdGhhdC5zZWVrKG5ld1Bvc2l0aW9uKTtcbiAgICB9O1xuXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc3RvcCgpIFwiKTtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3ByZWxvYWQnKTtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICB3aGlsZSAoZWxWaWRlby5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUNoaWxkKGVsVmlkZW8uZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuc3RvcCgpO1xuICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XG4gICAgICAgIC8vZWxWaWRlby5yZW1vdmUoKTtcblxuICAgICAgICBpZihhZHMpe1xuICAgICAgICAgICAgYWRzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZGVzdHJveSgpIHBsYXllciBzdG9wLCBsaXN0ZW5lciwgZXZlbnQgZGVzdHJvaWVkXCIpO1xuICAgIH07XG5cbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cbiAgICAvLyB1c2UgOiBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7IC4uLiBzdXBlcl9kZXN0cm95KCk7XG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==