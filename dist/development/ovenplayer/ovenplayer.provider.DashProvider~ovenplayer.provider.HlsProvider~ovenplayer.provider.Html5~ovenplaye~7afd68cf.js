/*! OvenPlayerv0.9.491 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
                if (that.getName() === _constants.PROVIDER_DASH && ads) {
                    //Ad steals dash's video element. Put in right place.
                    spec.mse.attachView(elVideo);
                }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwibXNlIiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsImNvbnNvbGUiLCJ0b0ZpeGVkIiwiY2FucGxheSIsInNldENhblNlZWsiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsImR1cmF0aW9uY2hhbmdlIiwicHJvZ3Jlc3MiLCJlbmRlZCIsImdldFN0YXRlIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwic2V0U3RhdGUiLCJsb2FkZWRkYXRhIiwibG9hZGVkbWV0YWRhdGEiLCJpc0xpdmUiLCJkdXJhdGlvbiIsIkluZmluaXR5Iiwic291cmNlcyIsImdldFNvdXJjZXMiLCJzb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2UiLCJ0eXBlIiwibWV0YWRhdGEiLCJDT05URU5UX01FVEEiLCJwYXVzZSIsIlNUQVRFX0VSUk9SIiwiZXJyb3IiLCJjdXJyZW50VGltZSIsIlNUQVRFX1BBVVNFRCIsInBsYXkiLCJwYXVzZWQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfTE9BRElORyIsInBsYXlpbmciLCJ0aW1lUmFuZ2VzIiwiYnVmZmVyZWQiLCJsZW5ndGgiLCJlbmQiLCJzZXRCdWZmZXIiLCJDT05URU5UX0JVRkZFUiIsImJ1ZmZlclBlcmNlbnQiLCJ0aW1ldXBkYXRlIiwiaXNOYU4iLCJpc1NlZWtpbmciLCJTVEFURV9TVEFMTEVEIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldmVudE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVzdHJveSIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsIm9uRXh0ZW5kZWRMb2FkIiwiYWRzIiwibGlzdGVuZXIiLCJwb3N0ZXJJbWFnZSIsImdldENvbmZpZyIsImltYWdlIiwiYWRUYWdVcmwiLCJwbGF5YmFja1JhdGUiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwiY3VycmVudFNvdXJjZSIsImZyYW1lcmF0ZSIsInNldFRpbWVjb2RlTW9kZSIsInByZXZpb3VzU291cmNlIiwic3JjIiwic291cmNlRWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImZpbGUiLCJzb3VyY2VDaGFuZ2VkIiwiYXBwZW5kIiwibG9hZCIsInNlZWsiLCJnZXROYW1lIiwibmFtZSIsImNhblNlZWsiLCJuZXdTdGF0ZSIsInN0YXRlIiwicHJldlN0YXRlIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfU1RBVEUiLCJwcmV2c3RhdGUiLCJuZXdzdGF0ZSIsIm5ld0J1ZmZlciIsImJ1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwiZWxlbWVudE9yTXNlIiwiZ2V0UG9zaXRpb24iLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRNdXRlIiwiQ09OVEVOVF9NVVRFIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImlzQXV0b1N0YXJ0IiwiaXNNdXRlIiwic3RhcnR0aW1lIiwiaXNBY3RpdmUiLCJzdGFydGVkIiwiUFJPVklERVJfREFTSCIsImF0dGFjaFZpZXciLCJwcm9taXNlIiwidW5kZWZpbmVkIiwidGhlbiIsInNldFRpbWVvdXQiLCJTVEFURV9BRF9QTEFZSU5HIiwic2V0UGxheWJhY2tSYXRlIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwibWFwIiwiaW5kZXgiLCJsYWJlbCIsInNldEN1cnJlbnRTb3VyY2UiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwic2V0U291cmNlTGFiZWwiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldEZyYW1lcmF0ZSIsInNldEZyYW1lcmF0ZSIsInNlZWtGcmFtZSIsImZyYW1lQ291bnQiLCJmcHMiLCJjdXJyZW50RnJhbWVzIiwibmV3UG9zaXRpb24iLCJzdG9wIiwicmVtb3ZlQXR0cmlidXRlIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwib2ZmIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBNEJBOztBQUVBOzs7Ozs7QUFPQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBU0MsT0FB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QSxXQUFPeEwsSUFBUDtBQUVILENBelhELEMsQ0FwQkE7OztxQkErWWVvRixRIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2YuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEVSUk9SUyxcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBzZXBhcmF0ZUxpdmUsIGVycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuXG4vKipcbiAqIEBicmllZiAgIFRyaWdnZXIgb24gdmFyaW91cyB2aWRlbyBldmVudHMuXG4gKiBAcGFyYW0gICBleHRlbmRlZEVsZW1lbnQgZXh0ZW5kZWQgbWVkaWEgb2JqZWN0IGJ5IG1zZS5cbiAqIEBwYXJhbSAgIFByb3ZpZGVyIHByb3ZpZGVyICBodG1sNVByb3ZpZGVyXG4gKiAqL1xuXG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxlbWVudCwgbXNlLCBwcm92aWRlciwgdmlkZW9FbmRlZENhbGxiYWNrKXtcbiAgICBjb25zdCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciBsb2FkZWQuXCIsZWxlbWVudCAscHJvdmlkZXIgKTtcbiAgICBjb25zdCB0aGF0ID0ge307XG5cbiAgICBsZXQgc3RhbGxlZCA9IC0xO1xuICAgIGxldCBlbFZpZGVvID0gIGVsZW1lbnQ7XG4gICAgY29uc3QgYmV0d2VlbiA9IGZ1bmN0aW9uIChudW0sIG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihudW0sIG1heCksIG1pbik7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBhcmVTdGFsbGVkVGltZSA9IGZ1bmN0aW9uKHN0YWxsZWQsIHBvc2l0aW9uKXtcbiAgICAgICAgLy9PcmlnaW5hbCBDb2RlIGlzIHN0YWxsZWQgIT09IHBvc2l0aW9uXG4gICAgICAgIC8vQmVjYXVzZSBEYXNoanMgaXMgdmVyeSBtZXRpY3Vsb3VzLiBUaGVuIGFsd2F5cyBkaWZmcmVuY2Ugc3RhbGxlZCBhbmQgcG9zaXRpb24uXG4gICAgICAgIC8vVGhhdCBpcyB3aHkgd2hlbiBJIHVzZSB0b0ZpeGVkKDIpLlxuICAgICAgICBjb25zb2xlLmxvZyhzdGFsbGVkLnRvRml4ZWQoMiksIHBvc2l0aW9uLnRvRml4ZWQoMikpO1xuICAgICAgICByZXR1cm4gc3RhbGxlZC50b0ZpeGVkKDIpID09PSBwb3NpdGlvbi50b0ZpeGVkKDIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5jYW5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIHByb3ZpZGVyLnNldENhblNlZWsodHJ1ZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVJfRlVMTCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBjYW5wbGF5XCIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5kdXJhdGlvbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBkdXJhdGlvbiBvZiB0aGUgYXVkaW8vdmlkZW8gaXMgY2hhbmdlZFxuICAgICAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcygpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZHVyYXRpb25jaGFuZ2VcIik7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWxpc3QgaXMgZW5kZWRcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVuZGVkXCIpO1xuXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9IFNUQVRFX0NPTVBMRVRFKXtcbiAgICAgICAgICAgIGlmKHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgdmlkZW9FbmRlZENhbGxiYWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZSBvZiB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgLy9EbyBub3RoaW5nIEJlY2F1c2UgdGhpcyBjYXVzZXMgY2hhb3MgYnkgbG9hZGVkbWV0YWRhdGEuXG4gICAgICAgIC8qXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IGVsVmlkZW8udmlkZW9XaWR0aFxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCBtZXRhIGRhdGEgZm9yIHRoZSBhdWRpby92aWRlb1xuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT09IEluZmluaXR5KSA/IHRydWUgOiBzZXBhcmF0ZUxpdmUobXNlKTtcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwcm92aWRlci5nZXRTb3VyY2VzKCk7XG4gICAgICAgIGxldCBzb3VyY2VJbmRleCA9IHByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICAgICAgbGV0IHR5cGUgPSBzb3VyY2VJbmRleCA+IC0xID8gc291cmNlc1tzb3VyY2VJbmRleF0udHlwZSA6IFwiXCI7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgdHlwZSA6dHlwZVxuICAgICAgICB9O1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRtZXRhZGF0YVwiLCBtZXRhZGF0YSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHBhdXNlZFxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9DT01QTEVURSB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9FUlJPUil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lbmRlZCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lcnJvcil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5jdXJyZW50VGltZSA9PT0gZWxWaWRlby5kdXJhdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBhdXNlXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHN0YXJ0ZWQgb3IgaXMgbm8gbG9uZ2VyIHBhdXNlZFxuICAgICAgICBzdGFsbGVkID0gLTE7XG4gICAgICAgIGlmICghZWxWaWRlby5wYXVzZWQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucGxheWluZyA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBpcyBwbGF5aW5nIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZCBvciBzdG9wcGVkIGZvciBidWZmZXJpbmdcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBsYXlpbmdcIik7XG4gICAgICAgIGlmKHN0YWxsZWQgPCAwKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcbiAgICAgICAgaWYoIXRpbWVSYW5nZXMgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb24sIHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcblxuICAgICAgICBwcm92aWRlci5zZXRCdWZmZXIoYnVmZmVyZWQqMTAwKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwge1xuICAgICAgICAgICAgYnVmZmVyUGVyY2VudDogYnVmZmVyZWQqMTAwLFxuICAgICAgICAgICAgcG9zaXRpb246ICBwb3NpdGlvbixcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICB9KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHByb2dyZXNzXCIsIGJ1ZmZlcmVkKjEwMCk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGhhcyBjaGFuZ2VkXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uO1xuICAgICAgICBpZiAoaXNOYU4oZHVyYXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpICYmICFlbFZpZGVvLnBhdXNlZCAmJiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfU1RBTExFRCB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9MT0FESU5HKSAmJlxuICAgICAgICAgICAgIWNvbXBhcmVTdGFsbGVkVGltZShzdGFsbGVkLCBwb3NpdGlvbikgKXtcbiAgICAgICAgICAgIHN0YWxsZWQgPSAtMTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcgfHwgcHJvdmlkZXIuaXNTZWVraW5nKCkpIHtcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FLCB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5zZWVraW5nID0gKCkgPT4ge1xuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKHRydWUpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2luZ1wiLCBlbFZpZGVvLmN1cnJlbnRUaW1lKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUsse1xuICAgICAgICAgICAgcG9zaXRpb24gOiBlbFZpZGVvLmN1cnJlbnRUaW1lXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2VkID0gKCkgPT4ge1xuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVrZWRcIik7XG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcoZmFsc2UpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFS0VEKTtcbiAgICB9O1xuXG5cbiAgICBsb3dMZXZlbEV2ZW50cy53YWl0aW5nID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIHZpZGVvIHN0b3BzIGJlY2F1c2UgaXQgbmVlZHMgdG8gYnVmZmVyIHRoZSBuZXh0IGZyYW1lXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB3YWl0aW5nXCIsIHByb3ZpZGVyLmdldFN0YXRlKCkpO1xuICAgICAgICBpZihwcm92aWRlci5pc1NlZWtpbmcoKSl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICAgICAgfWVsc2UgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBzdGFsbGVkID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1NUQUxMRUQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnZvbHVtZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHZvbHVtZWNoYW5nZVwiLCBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIHtcbiAgICAgICAgICAgIHZvbHVtZTogTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCksXG4gICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5lcnJvciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29kZSA9IChlbFZpZGVvLmVycm9yICYmIGVsVmlkZW8uZXJyb3IuY29kZSkgfHwgMDtcbiAgICAgICAgbGV0IGNvbnZlcnRlZEVycm9Db2RlID0gKHtcbiAgICAgICAgICAgIDA6IFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgICAgICAgICAgMTogUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgICAgICAgICAgMjogUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICAgICAgICAgIDM6IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICAgICAgICAgIDQ6IFBMQVlFUl9GSUxFX0VSUk9SXG4gICAgICAgIH1bY29kZV18fDApO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlcnJvclwiLCBjb252ZXJ0ZWRFcnJvQ29kZSk7XG4gICAgICAgIGVycm9yVHJpZ2dlcihFUlJPUlNbY29udmVydGVkRXJyb0NvZGVdKTtcbiAgICB9O1xuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGVsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XG5cbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjcuLlxuICovXG5pbXBvcnQgQWRzIGZyb20gXCJhcGkvcHJvdmlkZXIvYWRzL0Fkc1wiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXJcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlLCBwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLFxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLCBTVEFURV9BRF9QTEFZSU5HLFxuICAgIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBDT05URU5UX1NPVVJDRV9DSEFOR0VELFxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBDb3JlIEZvciBIdG1sNSBWaWRlby5cbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcbiAqIEBwYXJhbSAgIG9uRXh0ZW5kZWRMb2FkIG9uIGxvYWQgaGFuZGxlclxuICogKi9cbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24gKHNwZWMsIHBsYXllckNvbmZpZywgb25FeHRlbmRlZExvYWQpe1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgbG9hZGVkLiBcIik7XG5cbiAgICBsZXQgdGhhdCA9e307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG4gICAgbGV0IGVsVmlkZW8gPSBzcGVjLmVsZW1lbnQ7XG4gICAgbGV0IGFkcyA9IG51bGwsIGxpc3RlbmVyID0gbnVsbCwgdmlkZW9FbmRlZENhbGxiYWNrID0gbnVsbDtcbiAgICBsZXQgcG9zdGVySW1hZ2UgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuaW1hZ2V8fFwiXCI7XG5cbiAgICBpZihzcGVjLmFkVGFnVXJsKXtcbiAgICAgICAgYWRzID0gQWRzKGVsVmlkZW8sIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XG4gICAgfVxuICAgIGxpc3RlbmVyID0gRXZlbnRzTGlzdGVuZXIoZWxWaWRlbywgc3BlYy5tc2UsIHRoYXQsIGFkcyA/IGFkcy52aWRlb0VuZGVkQ2FsbGJhY2sgOiBudWxsKTtcbiAgICBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXllckNvbmZpZy5nZXRQbGF5YmFja1JhdGUoKTtcblxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAgc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV07XG4gICAgICAgIHNwZWMuZnJhbWVyYXRlID0gc291cmNlLmZyYW1lcmF0ZTtcbiAgICAgICAgaWYoIXNwZWMuZnJhbWVyYXRlKXtcbiAgICAgICAgICAgIC8vaW5pdCB0aW1lY29kZSBtb2RlXG4gICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9uRXh0ZW5kZWRMb2FkKXtcbiAgICAgICAgICAgIG9uRXh0ZW5kZWRMb2FkKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1NvdXJjZSA9IGVsVmlkZW8uc3JjO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xuXG4gICAgICAgICAgICBzb3VyY2VFbGVtZW50LnNyYyA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2VFbGVtZW50LnNyYyAhPT0gcHJldmlvdXNTb3VyY2UpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAvL2VsVmlkZW8uc3JjID0gc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV0uZmlsZTtcbiAgICAgICAgICAgICAgICBlbFZpZGVvLmFwcGVuZChzb3VyY2VFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgY2FsbCBsb2FkIGlmIHNyYyB3YXMgbm90IHNldC4gbG9hZCgpIHdpbGwgY2FuY2VsIGFueSBhY3RpdmUgcGxheSBwcm9taXNlLlxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSBpZihsYXN0UGxheVBvc2l0aW9uID09PSAwICYmIGVsVmlkZW8uY3VycmVudFRpbWUgPiAwKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzcGVjLmN1cnJlbnRTb3VyY2VcbiAgICAgICAgICAgIH0pOyovXG5cbiAgICAgICAgICAgIGlmKHBvc3RlckltYWdlKXtcbiAgICAgICAgICAgICAgICAvL1RoZXJlIGlzIG5vIHdheSB0byB2ZXJpZnkgdGhlIHBvc3RlckltYWdlIFVSTC4gVGhpcyB3aWxsIGJlIGJsbmFrIHVudGlsIGhhdmUgYSBnb29kIGlkZWEuXG4gICAgICAgICAgICAgICAgLy9lbFZpZGVvLnN0eWxlLmJhY2tncm91bmQgPSBcInRyYW5zcGFyZW50IHVybCgnXCIrcG9zdGVySW1hZ2UrXCInKSBuby1yZXBlYXQgMCAwXCI7XG4gICAgICAgICAgICAgICAgLy9lbFZpZGVvLnBvc3RlciA9IHBvc3RlckltYWdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LmdldE5hbWUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XG4gICAgfTtcbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LnNldENhblNlZWsgPSAoY2FuU2VlaykgPT4ge1xuICAgICAgICBzcGVjLmNhblNlZWsgPSBjYW5TZWVrO1xuICAgIH07XG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e1xuICAgICAgICByZXR1cm4gc3BlYy5zZWVraW5nO1xuICAgIH07XG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmcpPT57XG4gICAgICAgIHNwZWMuc2Vla2luZyA9IHNlZWtpbmc7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHNwZWMuc3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2gobmV3U3RhdGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQ09NUExFVEUgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwZWMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcbiAgICAgICAgICAgICAgICBwcmV2c3RhdGUgOiBwcmV2U3RhdGUsXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLnN0YXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XG4gICAgICAgIHNwZWMuYnVmZmVyID0gbmV3QnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmJ1ZmZlcjtcbiAgICB9O1xuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGxldCBpc0xpdmUgPSAoZWxWaWRlby5kdXJhdGlvbiA9PT0gSW5maW5pdHkpID8gdHJ1ZSA6IHNlcGFyYXRlTGl2ZShzcGVjLmVsZW1lbnRPck1zZSk7XG4gICAgICAgIHJldHVybiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uO1xuICAgIH07XG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgfTtcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby52b2x1bWUgPSB2b2x1bWUvMTAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8udm9sdW1lKjEwMDtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gIWVsVmlkZW8ubXV0ZWQ7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gc3RhdGU7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcblxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcblxuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzTXV0ZSgpKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpe1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcbiAgICAgICAgX2xvYWQoc3BlYy5zb3VyY2VzLnN0YXJ0dGltZSB8fCAwKTtcbiAgICB9O1xuXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBpZiAoIChhZHMgJiYgYWRzLmlzQWN0aXZlKCkpIHx8IChhZHMgJiYgIWFkcy5zdGFydGVkKCkpKSB7XG4gICAgICAgICAgICAgICAgYWRzLnBsYXkoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHRoYXQuZ2V0TmFtZSgpID09PSBQUk9WSURFUl9EQVNIICYmIGFkcyl7XG4gICAgICAgICAgICAgICAgICAgIC8vQWQgc3RlYWxzIGRhc2gncyB2aWRlbyBlbGVtZW50LiBQdXQgaW4gcmlnaHQgcGxhY2UuXG4gICAgICAgICAgICAgICAgICAgIHNwZWMubXNlLmF0dGFjaFZpZXcoZWxWaWRlbyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxWaWRlby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEF1dG9wbGF5IHN0YXJ0ZWQhXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2FuJ3QgcGxheSBiZWNhdXNlIFVzZXIgZG9lc24ndCBhbnkgaW50ZXJhY3Rpb25zLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy9XYWl0IGZvciBVc2VyIEludGVyYWN0aW9ucy4gKGxpa2UgY2xpY2spXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgfWVsc2UgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKXtcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQudHJpZ2dlcihQTEFZQkFDS19SQVRFX0NIQU5HRUQsIHtwbGF5YmFja1JhdGUgOiBwbGF5YmFja1JhdGV9KTtcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBpbmRleCA6IGluZGV4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmKHNwZWMuY3VycmVudFNvdXJjZSA9PT0gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XG4gICAgICAgICAgICBpZihzcGVjLnNvdXJjZXMgJiYgc3BlYy5zb3VyY2VzLmxlbmd0aCA+IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAvL3RoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUxhYmVsKHNwZWMuc291cmNlc1tzb3VyY2VJbmRleF0ubGFiZWwpO1xuICAgICAgICAgICAgICAgIC8vc3BlYy5jdXJyZW50UXVhbGl0eSA9IHNvdXJjZUluZGV4O1xuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsVmlkZW8uY3VycmVudFRpbWUgfHwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGV2ZWxzO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0RnJhbWVyYXRlID0gKGZyYW1lcmF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGUgPSBmcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PntcbiAgICAgICAgbGV0IGZwcyA9IHNwZWMuZnJhbWVyYXRlO1xuICAgICAgICBsZXQgY3VycmVudEZyYW1lcyA9IGVsVmlkZW8uY3VycmVudFRpbWUgKiBmcHM7XG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IChjdXJyZW50RnJhbWVzICsgZnJhbWVDb3VudCkgLyBmcHM7XG4gICAgICAgIG5ld1Bvc2l0aW9uID0gbmV3UG9zaXRpb24gKyAwLjAwMDAxOyAvLyBGSVhFUyBBIFNBRkFSSSBTRUVLIElTU1VFLiBteVZkaWVvLmN1cnJlbnRUaW1lID0gMC4wNCB3b3VsZCBnaXZlIFNNUFRFIDAwOjAwOjAwOjAwIHdoZXJhcyBpdCBzaG91bGQgZ2l2ZSAwMDowMDowMDowMVxuXG4gICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgdGhhdC5zZWVrKG5ld1Bvc2l0aW9uKTtcbiAgICB9O1xuXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc3RvcCgpIFwiKTtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3ByZWxvYWQnKTtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICB3aGlsZSAoZWxWaWRlby5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUNoaWxkKGVsVmlkZW8uZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuc3RvcCgpO1xuICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XG4gICAgICAgIC8vZWxWaWRlby5yZW1vdmUoKTtcblxuICAgICAgICBpZihhZHMpe1xuICAgICAgICAgICAgYWRzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZGVzdHJveSgpIHBsYXllciBzdG9wLCBsaXN0ZW5lciwgZXZlbnQgZGVzdHJvaWVkXCIpO1xuICAgIH07XG5cbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cbiAgICAvLyB1c2UgOiBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7IC4uLiBzdXBlcl9kZXN0cm95KCk7XG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==