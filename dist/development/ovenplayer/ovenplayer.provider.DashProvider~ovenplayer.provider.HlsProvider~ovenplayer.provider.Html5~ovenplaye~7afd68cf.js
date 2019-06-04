/*! OvenPlayerv0.9.5954 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

        if (provider.getState() !== _constants.STATE_IDLE && provider.getState() !== _constants.STATE_COMPLETE) {
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
        /*if(duration > 9000000000000000){    //9007199254740991
            duration = Infinity;
        }*/

        if (!provider.isSeeking() && !elVideo.paused && (provider.getState() === _constants.STATE_STALLED || provider.getState() === _constants.STATE_LOADING || provider.getState() === _constants.STATE_AD_PLAYING) && !compareStalledTime(stalled, position)) {
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

    lowLevelEvents.stalled = function () {
        OvenPlayerConsole.log("EventListener : on stalled");
        //This callback does not work on chrome. This calls on Firefox intermittent. Then do not work here. using waiting event.
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
        (0, _utils.errorTrigger)(_constants.ERRORS[convertedErroCode], provider);
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

    var isPlayingProcess = false;

    if (spec.adTagUrl) {
        ads = (0, _Ads2["default"])(elVideo, that, playerConfig, spec.adTagUrl);
        if (!ads) {
            console.log("Can not load due to google ima for Ads.");
        }
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

                elVideo.src = source.file;

                //Don't use this. https://stackoverflow.com/questions/30637784/detect-an-error-on-html5-video
                //elVideo.append(sourceElement);

                // Do not call load if src was not set. load() will cancel any active play promise.
                if (previousSource) {
                    elVideo.load();
                }
            } else if (lastPlayPosition === 0 && elVideo.currentTime > 0) {
                that.seek(lastPlayPosition);
            }

            if (lastPlayPosition > 0) {
                that.seek(lastPlayPosition);
                if (!playerConfig.isAutoStart()) {
                    that.play();
                }
            }

            if (playerConfig.isAutoStart()) {
                that.play();
            }
            /*that.trigger(CONTENT_SOURCE_CHANGED, {
                currentSource: spec.currentSource
            });*/
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

            //ToDo : This is temporary code. avoid background content error.
            if (prevState === _constants.STATE_AD_PLAYING && (newState === _constants.STATE_ERROR || newState === _constants.STATE_IDLE)) {
                return false;
            }

            if (ads && ads.isAutoPlaySupportCheckTime()) {
                //Ads checks checkAutoplaySupport().
                //It calls real play() and pause().
                //And then this triggers "playing" and "pause".
                //I prevent these process.
            } else {
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
            if (playerConfig.isMute()) {
                that.setMute(true);
            }
            if (playerConfig.getVolume()) {
                that.setVolume(playerConfig.getVolume());
            }

            resolve();
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
        console.log(isPlayingProcess);
        if (isPlayingProcess) {
            return false;
        }
        isPlayingProcess = true;
        if (that.getState() !== _constants.STATE_PLAYING) {
            if (ads && ads.isActive() || ads && !ads.started()) {
                ads.play().then(function (_) {
                    //ads play success
                    isPlayingProcess = false;
                })["catch"](function (error) {
                    //ads play fail maybe cause user interactive less
                    isPlayingProcess = false;
                    console.log(error);
                });
            } else {
                if (that.getName() === _constants.PROVIDER_DASH) {
                    if (ads && !dashAttachedView) {
                        //Ad steals dash's video element. Put in right place.
                        spec.mse.attachView(elVideo);
                        dashAttachedView = true;
                    }

                    //I was starting the stream by calling play(). (Autoplay was turned off)
                    //the video freeze for live. like this https://github.com/Dash-Industry-Forum/dash.js/issues/2184
                    //My guess is user interective...
                    //This is temporary until i will find perfect solution.
                    setTimeout(function () {
                        var promise = elVideo.play();
                        if (promise !== undefined) {
                            promise.then(function () {
                                isPlayingProcess = false;
                            })["catch"](function (error) {
                                if (playerConfig.getBrowser().browser === "Safari" || playerConfig.getBrowser().os === "iOS" || playerConfig.getBrowser().os === "Android") {
                                    elVideo.muted = true;
                                }
                                //Can't play because User doesn't any interactions.
                                //Wait for User Interactions. (like click)
                                setTimeout(function () {
                                    isPlayingProcess = false;
                                    that.play();
                                }, 100);
                            });
                        }
                    }, 500);
                } else {
                    var promise = elVideo.play();
                    if (promise !== undefined) {
                        promise.then(function () {
                            isPlayingProcess = false;
                        })["catch"](function (error) {
                            if (playerConfig.getBrowser().browser === "Safari" || playerConfig.getBrowser().os === "iOS" || playerConfig.getBrowser().os === "Android") {
                                elVideo.muted = true;
                            }
                            console.log(error);
                            //Can't play because User doesn't any interactions.
                            //Wait for User Interactions. (like click)
                            setTimeout(function () {
                                isPlayingProcess = false;
                                that.play();
                            }, 100);
                        });
                    }
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
                that.pause();
                that.setState(_constants.STATE_IDLE);
                if (needProviderChange) {
                    _load(elVideo.currentTime || 0);
                }
                //
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwibXNlIiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsInRvRml4ZWQiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsInRyaWdnZXIiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJzZXRTdGF0ZSIsImxvYWRlZGRhdGEiLCJsb2FkZWRtZXRhZGF0YSIsImlzTGl2ZSIsImR1cmF0aW9uIiwiSW5maW5pdHkiLCJzb3VyY2VzIiwiZ2V0U291cmNlcyIsInNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZSIsInR5cGUiLCJtZXRhZGF0YSIsIkNPTlRFTlRfTUVUQSIsInBhdXNlIiwiU1RBVEVfRVJST1IiLCJlcnJvciIsImN1cnJlbnRUaW1lIiwiU1RBVEVfUEFVU0VEIiwicGxheSIsInBhdXNlZCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9MT0FESU5HIiwicGxheWluZyIsInRpbWVSYW5nZXMiLCJidWZmZXJlZCIsImxlbmd0aCIsImVuZCIsInNldEJ1ZmZlciIsIkNPTlRFTlRfQlVGRkVSIiwiYnVmZmVyUGVyY2VudCIsInRpbWV1cGRhdGUiLCJpc05hTiIsImlzU2Vla2luZyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldmVudE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVzdHJveSIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsIm9uRXh0ZW5kZWRMb2FkIiwiZGFzaEF0dGFjaGVkVmlldyIsImFkcyIsImxpc3RlbmVyIiwiaXNQbGF5aW5nUHJvY2VzcyIsImFkVGFnVXJsIiwiY29uc29sZSIsInBsYXliYWNrUmF0ZSIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJjdXJyZW50U291cmNlIiwiZnJhbWVyYXRlIiwic2V0VGltZWNvZGVNb2RlIiwicHJldmlvdXNTb3VyY2UiLCJzcmMiLCJzb3VyY2VFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZmlsZSIsInNvdXJjZUNoYW5nZWQiLCJsb2FkIiwic2VlayIsImlzQXV0b1N0YXJ0IiwiZ2V0TmFtZSIsIm5hbWUiLCJjYW5TZWVrIiwibmV3U3RhdGUiLCJzdGF0ZSIsInByZXZTdGF0ZSIsImlzQXV0b1BsYXlTdXBwb3J0Q2hlY2tUaW1lIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwibmV3c3RhdGUiLCJTVEFURV9BRF9QQVVTRUQiLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld0J1ZmZlciIsImJ1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRNdXRlIiwiQ09OVEVOVF9NVVRFIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImlzTXV0ZSIsInN0YXJ0dGltZSIsImlzQWN0aXZlIiwic3RhcnRlZCIsInRoZW4iLCJQUk9WSURFUl9EQVNIIiwiYXR0YWNoVmlldyIsInNldFRpbWVvdXQiLCJwcm9taXNlIiwidW5kZWZpbmVkIiwiZ2V0QnJvd3NlciIsImJyb3dzZXIiLCJvcyIsInNldFBsYXliYWNrUmF0ZSIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIm1hcCIsImluZGV4IiwibGFiZWwiLCJzZXRDdXJyZW50U291cmNlIiwibmVlZFByb3ZpZGVyQ2hhbmdlIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsInNldFNvdXJjZUxhYmVsIiwiZ2V0UXVhbGl0eUxldmVscyIsInF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsImN1cnJlbnRRdWFsaXR5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRGcmFtZXJhdGUiLCJzZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZnBzIiwiY3VycmVudEZyYW1lcyIsIm5ld1Bvc2l0aW9uIiwic3RvcCIsInJlbW92ZUF0dHJpYnV0ZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsIm9mZiIsIm1ldGhvZCIsImFwcGx5IiwiYXJndW1lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFB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OztBQUVyQ2xMLGFBQUtrQyxLQUFMO0FBQ0FsQyxhQUFLK0csSUFBTCxDQUFVbUUsV0FBVjtBQUNILEtBUkQ7O0FBVUFsTCxTQUFLbUwsSUFBTCxHQUFZLFlBQUs7QUFDYixZQUFHLENBQUNqTCxPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7QUFDREosMEJBQWtCQyxHQUFsQixDQUFzQixnQkFBdEI7QUFDQUcsZ0JBQVFrTCxlQUFSLENBQXdCLFNBQXhCO0FBQ0FsTCxnQkFBUWtMLGVBQVIsQ0FBd0IsS0FBeEI7QUFDQSxlQUFPbEwsUUFBUW1MLFVBQWYsRUFBMkI7QUFDdkJuTCxvQkFBUW9MLFdBQVIsQ0FBb0JwTCxRQUFRbUwsVUFBNUI7QUFDSDtBQUNEckwsYUFBS2tDLEtBQUw7QUFDQWxDLGFBQUtxQixRQUFMLENBQWNGLHFCQUFkO0FBQ0gsS0FaRDs7QUFjQW5CLFNBQUttRixPQUFMLEdBQWUsWUFBSztBQUNoQixZQUFHLENBQUNqRixPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7QUFDREYsYUFBS21MLElBQUw7QUFDQXpGLGlCQUFTUCxPQUFUO0FBQ0E7O0FBRUEsWUFBR00sR0FBSCxFQUFPO0FBQ0hBLGdCQUFJTixPQUFKO0FBQ0g7QUFDRG5GLGFBQUt1TCxHQUFMO0FBQ0F6TCwwQkFBa0JDLEdBQWxCLENBQXNCLHlEQUF0QjtBQUNILEtBYkQ7O0FBZUE7QUFDQTtBQUNBQyxvQkFBYSxVQUFDa0gsSUFBRCxFQUFVO0FBQ25CLFlBQU1zRSxTQUFTeEwsS0FBS2tILElBQUwsQ0FBZjtBQUNBLGVBQU8sWUFBVTtBQUNiLG1CQUFPc0UsT0FBT0MsS0FBUCxDQUFhekwsSUFBYixFQUFtQjBMLFNBQW5CLENBQVA7QUFDSCxTQUZEO0FBR0gsS0FMRDtBQU1BLFdBQU8xTCxJQUFQO0FBRUgsQ0F4Y0QsQyxDQXBCQTs7O3FCQThkZW9GLFEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRVJST1JTLFxuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfQURfUExBWUlORyxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlLCBlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUcmlnZ2VyIG9uIHZhcmlvdXMgdmlkZW8gZXZlbnRzLlxuICogQHBhcmFtICAgZXh0ZW5kZWRFbGVtZW50IGV4dGVuZGVkIG1lZGlhIG9iamVjdCBieSBtc2UuXG4gKiBAcGFyYW0gICBQcm92aWRlciBwcm92aWRlciAgaHRtbDVQcm92aWRlclxuICogKi9cblxuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGVsZW1lbnQsIG1zZSwgcHJvdmlkZXIsIHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgY29uc3QgbG93TGV2ZWxFdmVudHMgPSB7fTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgbG9hZGVkLlwiLGVsZW1lbnQgLHByb3ZpZGVyICk7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuXG4gICAgbGV0IHN0YWxsZWQgPSAtMTtcbiAgICBsZXQgZWxWaWRlbyA9ICBlbGVtZW50O1xuICAgIGNvbnN0IGJldHdlZW4gPSBmdW5jdGlvbiAobnVtLCBtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4obnVtLCBtYXgpLCBtaW4pO1xuICAgIH1cbiAgICBjb25zdCBjb21wYXJlU3RhbGxlZFRpbWUgPSBmdW5jdGlvbihzdGFsbGVkLCBwb3NpdGlvbil7XG4gICAgICAgIC8vT3JpZ2luYWwgQ29kZSBpcyBzdGFsbGVkICE9PSBwb3NpdGlvblxuICAgICAgICAvL0JlY2F1c2UgRGFzaGpzIGlzIHZlcnkgbWV0aWN1bG91cy4gVGhlbiBhbHdheXMgZGlmZnJlbmNlIHN0YWxsZWQgYW5kIHBvc2l0aW9uLlxuICAgICAgICAvL1RoYXQgaXMgd2h5IHdoZW4gSSB1c2UgdG9GaXhlZCgyKS5cbiAgICAgICAgcmV0dXJuIHN0YWxsZWQudG9GaXhlZCgyKSA9PT0gcG9zaXRpb24udG9GaXhlZCgyKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuY2FucGxheSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGNhbiBzdGFydCBwbGF5aW5nIHRoZSBhdWRpby92aWRlb1xuICAgICAgICBwcm92aWRlci5zZXRDYW5TZWVrKHRydWUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSX0ZVTEwpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gY2FucGxheVwiKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuZHVyYXRpb25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgZHVyYXRpb24gb2YgdGhlIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWRcbiAgICAgICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MoKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGR1cmF0aW9uY2hhbmdlXCIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5lbmRlZCA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXlsaXN0IGlzIGVuZGVkXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlbmRlZFwiKTtcblxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9JRExFICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0NPTVBMRVRFKXtcbiAgICAgICAgICAgIGlmKHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgdmlkZW9FbmRlZENhbGxiYWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZSBvZiB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgLy9EbyBub3RoaW5nIEJlY2F1c2UgdGhpcyBjYXVzZXMgY2hhb3MgYnkgbG9hZGVkbWV0YWRhdGEuXG4gICAgICAgIC8qXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IGVsVmlkZW8udmlkZW9XaWR0aFxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCBtZXRhIGRhdGEgZm9yIHRoZSBhdWRpby92aWRlb1xuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT09IEluZmluaXR5KSA/IHRydWUgOiBzZXBhcmF0ZUxpdmUobXNlKTtcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwcm92aWRlci5nZXRTb3VyY2VzKCk7XG4gICAgICAgIGxldCBzb3VyY2VJbmRleCA9IHByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICAgICAgbGV0IHR5cGUgPSBzb3VyY2VJbmRleCA+IC0xID8gc291cmNlc1tzb3VyY2VJbmRleF0udHlwZSA6IFwiXCI7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgdHlwZSA6dHlwZVxuICAgICAgICB9O1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gbG9hZGVkbWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBwYXVzZWRcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQ09NUExFVEUgfHwgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfRVJST1Ipe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uZW5kZWQpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uZXJyb3Ipe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uY3VycmVudFRpbWUgPT09IGVsVmlkZW8uZHVyYXRpb24pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwYXVzZVwiKTtcblxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xuXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gc3RhcnRlZCBvciBpcyBubyBsb25nZXIgcGF1c2VkXG4gICAgICAgIHN0YWxsZWQgPSAtMTtcbiAgICAgICAgaWYgKCFlbFZpZGVvLnBhdXNlZCAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5aW5nID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGlzIHBsYXlpbmcgYWZ0ZXIgaGF2aW5nIGJlZW4gcGF1c2VkIG9yIHN0b3BwZWQgZm9yIGJ1ZmZlcmluZ1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheWluZ1wiKTtcbiAgICAgICAgaWYoc3RhbGxlZCA8IDApe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBpcyBkb3dubG9hZGluZyB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgbGV0IHRpbWVSYW5nZXMgPSBlbFZpZGVvLmJ1ZmZlcmVkO1xuICAgICAgICBpZighdGltZVJhbmdlcyApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbiwgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICBsZXQgYnVmZmVyZWQgPSBiZXR3ZWVuKCAodGltZVJhbmdlcy5sZW5ndGg+IDAgPyB0aW1lUmFuZ2VzLmVuZCh0aW1lUmFuZ2VzLmxlbmd0aCAtIDEpIDogMCApIC8gZHVyYXRpb24sIDAsIDEpO1xuXG4gICAgICAgIHByb3ZpZGVyLnNldEJ1ZmZlcihidWZmZXJlZCoxMDApO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSLCB7XG4gICAgICAgICAgICBidWZmZXJQZXJjZW50OiBidWZmZXJlZCoxMDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogIHBvc2l0aW9uLFxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcHJvZ3Jlc3NcIiwgYnVmZmVyZWQqMTAwKTtcbiAgICB9O1xuXG5cbiAgICBsb3dMZXZlbEV2ZW50cy50aW1ldXBkYXRlID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbjtcbiAgICAgICAgaWYgKGlzTmFOKGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8qaWYoZHVyYXRpb24gPiA5MDAwMDAwMDAwMDAwMDAwKXsgICAgLy85MDA3MTk5MjU0NzQwOTkxXG4gICAgICAgICAgICBkdXJhdGlvbiA9IEluZmluaXR5O1xuICAgICAgICB9Ki9cblxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkgJiYgIWVsVmlkZW8ucGF1c2VkICYmIChwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9TVEFMTEVEIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0xPQURJTkcgfHwgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORykgJiZcbiAgICAgICAgICAgICFjb21wYXJlU3RhbGxlZFRpbWUoc3RhbGxlZCwgcG9zaXRpb24pICl7XG4gICAgICAgICAgICBzdGFsbGVkID0gLTE7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HIHx8IHByb3ZpZGVyLmlzU2Vla2luZygpKSB7XG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2luZyA9ICgpID0+IHtcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyh0cnVlKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtpbmdcIiwgZWxWaWRlby5jdXJyZW50VGltZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLLHtcbiAgICAgICAgICAgIHBvc2l0aW9uIDogZWxWaWRlby5jdXJyZW50VGltZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtlZCA9ICgpID0+IHtcbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2VkXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKGZhbHNlKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUtFRCk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnN0YWxsZWQgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzdGFsbGVkXCIpO1xuICAgICAgICAvL1RoaXMgY2FsbGJhY2sgZG9lcyBub3Qgd29yayBvbiBjaHJvbWUuIFRoaXMgY2FsbHMgb24gRmlyZWZveCBpbnRlcm1pdHRlbnQuIFRoZW4gZG8gbm90IHdvcmsgaGVyZS4gdXNpbmcgd2FpdGluZyBldmVudC5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMud2FpdGluZyA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSB2aWRlbyBzdG9wcyBiZWNhdXNlIGl0IG5lZWRzIHRvIGJ1ZmZlciB0aGUgbmV4dCBmcmFtZVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gd2FpdGluZ1wiLCBwcm92aWRlci5nZXRTdGF0ZSgpKTtcbiAgICAgICAgaWYocHJvdmlkZXIuaXNTZWVraW5nKCkpe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgIH1lbHNlIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgc3RhbGxlZCA9IGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9TVEFMTEVEKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy52b2x1bWVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB2b2x1bWVjaGFuZ2VcIiwgTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCkpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVk9MVU1FLCB7XG4gICAgICAgICAgICB2b2x1bWU6IE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApLFxuICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxWaWRlby5lcnJvciAmJiBlbFZpZGVvLmVycm9yLmNvZGUpIHx8IDA7XG4gICAgICAgIGxldCBjb252ZXJ0ZWRFcnJvQ29kZSA9ICh7XG4gICAgICAgICAgICAwOiBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICAgICAgICAgIDE6IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICAgICAgICAgIDI6IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgICAgICAgICAzOiBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgICAgICAgICA0OiBQTEFZRVJfRklMRV9FUlJPUlxuICAgICAgICB9W2NvZGVdfHwwKTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZXJyb3JcIiwgY29udmVydGVkRXJyb0NvZGUpO1xuICAgICAgICBlcnJvclRyaWdnZXIoRVJST1JTW2NvbnZlcnRlZEVycm9Db2RlXSwgcHJvdmlkZXIpO1xuICAgIH07XG5cbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgZWxWaWRlby5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgfSk7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyNy4uXG4gKi9cbmltcG9ydCBBZHMgZnJvbSBcImFwaS9wcm92aWRlci9hZHMvQWRzXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9MaXN0ZW5lclwiO1xuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBzZXBhcmF0ZUxpdmUsIHBpY2tDdXJyZW50U291cmNlfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIFNUQVRFX0lETEUsIFNUQVRFX1BMQVlJTkcsIFNUQVRFX1BBVVNFRCwgU1RBVEVfQ09NUExFVEUsIFNUQVRFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLCBTVEFURV9BRF9QTEFZSU5HLCBTVEFURV9BRF9QQVVTRUQsXG4gICAgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIENPTlRFTlRfU09VUkNFX0NIQU5HRUQsXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIENvcmUgRm9yIEh0bWw1IFZpZGVvLlxuICogQHBhcmFtICAgc3BlYyBtZW1iZXIgdmFsdWVcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xuICogQHBhcmFtICAgb25FeHRlbmRlZExvYWQgb24gbG9hZCBoYW5kbGVyXG4gKiAqL1xuY29uc3QgUHJvdmlkZXIgPSBmdW5jdGlvbiAoc3BlYywgcGxheWVyQ29uZmlnLCBvbkV4dGVuZGVkTG9hZCl7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcblxuICAgIGxldCB0aGF0ID17fTtcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XG5cbiAgICBsZXQgZGFzaEF0dGFjaGVkVmlldyA9IGZhbHNlO1xuXG4gICAgbGV0IGVsVmlkZW8gPSBzcGVjLmVsZW1lbnQ7XG4gICAgbGV0IGFkcyA9IG51bGwsIGxpc3RlbmVyID0gbnVsbCwgdmlkZW9FbmRlZENhbGxiYWNrID0gbnVsbDtcblxuICAgIGxldCBpc1BsYXlpbmdQcm9jZXNzID0gZmFsc2U7XG5cbiAgICBpZihzcGVjLmFkVGFnVXJsKXtcbiAgICAgICAgYWRzID0gQWRzKGVsVmlkZW8sIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XG4gICAgICAgIGlmKCFhZHMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYW4gbm90IGxvYWQgZHVlIHRvIGdvb2dsZSBpbWEgZm9yIEFkcy5cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihlbFZpZGVvLCBzcGVjLm1zZSwgdGhhdCwgYWRzID8gYWRzLnZpZGVvRW5kZWRDYWxsYmFjayA6IG51bGwpO1xuICAgIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWVyQ29uZmlnLmdldFBsYXliYWNrUmF0ZSgpO1xuXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcbiAgICAgICAgc3BlYy5mcmFtZXJhdGUgPSBzb3VyY2UuZnJhbWVyYXRlO1xuICAgICAgICBpZighc3BlYy5mcmFtZXJhdGUpe1xuICAgICAgICAgICAgLy9pbml0IHRpbWVjb2RlIG1vZGVcbiAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRUaW1lY29kZU1vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYob25FeHRlbmRlZExvYWQpe1xuICAgICAgICAgICAgb25FeHRlbmRlZExvYWQoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgbGV0IHByZXZpb3VzU291cmNlID0gZWxWaWRlby5zcmM7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XG5cbiAgICAgICAgICAgIHNvdXJjZUVsZW1lbnQuc3JjID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VDaGFuZ2VkID0gKHNvdXJjZUVsZW1lbnQuc3JjICE9PSBwcmV2aW91c1NvdXJjZSk7XG4gICAgICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xuXG4gICAgICAgICAgICAgICAgZWxWaWRlby5zcmMgPSBzb3VyY2UuZmlsZTtcblxuICAgICAgICAgICAgICAgIC8vRG9uJ3QgdXNlIHRoaXMuIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwNjM3Nzg0L2RldGVjdC1hbi1lcnJvci1vbi1odG1sNS12aWRlb1xuICAgICAgICAgICAgICAgIC8vZWxWaWRlby5hcHBlbmQoc291cmNlRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgY2FsbCBsb2FkIGlmIHNyYyB3YXMgbm90IHNldC4gbG9hZCgpIHdpbGwgY2FuY2VsIGFueSBhY3RpdmUgcGxheSBwcm9taXNlLlxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSBpZihsYXN0UGxheVBvc2l0aW9uID09PSAwICYmIGVsVmlkZW8uY3VycmVudFRpbWUgPiAwKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyp0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNwZWMuY3VycmVudFNvdXJjZVxuICAgICAgICAgICAgfSk7Ki9cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMubmFtZTtcbiAgICB9O1xuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XG4gICAgICAgIHNwZWMuY2FuU2VlayA9IGNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XG4gICAgICAgIHJldHVybiBzcGVjLnNlZWtpbmc7XG4gICAgfTtcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcbiAgICAgICAgc3BlYy5zZWVraW5nID0gc2Vla2luZztcbiAgICB9O1xuXG4gICAgdGhhdC5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgPT4ge1xuICAgICAgICBpZihzcGVjLnN0YXRlICE9PSBuZXdTdGF0ZSl7XG4gICAgICAgICAgICBsZXQgcHJldlN0YXRlID0gc3BlYy5zdGF0ZTtcblxuICAgICAgICAgICAgLy9Ub0RvIDogVGhpcyBpcyB0ZW1wb3JhcnkgY29kZS4gYXZvaWQgYmFja2dyb3VuZCBjb250ZW50IGVycm9yLlxuICAgICAgICAgICAgaWYocHJldlN0YXRlID09PSBTVEFURV9BRF9QTEFZSU5HICYmIChuZXdTdGF0ZSA9PT0gU1RBVEVfRVJST1IgfHwgbmV3U3RhdGUgPT09IFNUQVRFX0lETEUpICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmKGFkcyAmJiBhZHMuaXNBdXRvUGxheVN1cHBvcnRDaGVja1RpbWUoKSl7XG4gICAgICAgICAgICAgICAgLy9BZHMgY2hlY2tzIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkuXG4gICAgICAgICAgICAgICAgLy9JdCBjYWxscyByZWFsIHBsYXkoKSBhbmQgcGF1c2UoKS5cbiAgICAgICAgICAgICAgICAvL0FuZCB0aGVuIHRoaXMgdHJpZ2dlcnMgXCJwbGF5aW5nXCIgYW5kIFwicGF1c2VcIi5cbiAgICAgICAgICAgICAgICAvL0kgcHJldmVudCB0aGVzZSBwcm9jZXNzLlxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc3dpdGNoKG5ld1N0YXRlKXtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QQVVTRURcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQURfUEFVU0VEIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX0FEX1BBVVNFRFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QTEFZSU5HIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfUExBWUlOR1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQURfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX0FEX1BMQVlJTkdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNwZWMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1NUQVRFLCB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZzdGF0ZSA6IHByZXZTdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5zdGF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0QnVmZmVyID0gKG5ld0J1ZmZlcikgPT4ge1xuICAgICAgICBzcGVjLmJ1ZmZlciA9IG5ld0J1ZmZlcjtcbiAgICB9O1xuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5idWZmZXI7XG4gICAgfTtcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT09IEluZmluaXR5KSA/IHRydWUgOiBzZXBhcmF0ZUxpdmUoc3BlYy5tc2UpO1xuICAgICAgICByZXR1cm4gaXNMaXZlID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbjtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsVmlkZW8udm9sdW1lID0gdm9sdW1lLzEwMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLnZvbHVtZSoxMDA7XG4gICAgfTtcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9ICFlbFZpZGVvLm11dGVkO1xuXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHN0YXRlO1xuXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xuICAgIH07XG5cbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG5cbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xuICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uIHx8IDApO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNNdXRlKCkpe1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRWb2x1bWUocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcblxuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXMpID0+e1xuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKHNwZWMuc291cmNlcy5zdGFydHRpbWUgfHwgMCk7XG4gICAgfTtcblxuICAgIHRoYXQucGxheSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coaXNQbGF5aW5nUHJvY2Vzcyk7XG4gICAgICAgIGlmKGlzUGxheWluZ1Byb2Nlc3Mpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlzUGxheWluZ1Byb2Nlc3MgPSB0cnVlO1xuICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgaWYgKCAgKGFkcyAmJiBhZHMuaXNBY3RpdmUoKSkgfHwgKGFkcyAmJiAhYWRzLnN0YXJ0ZWQoKSkgKSB7XG4gICAgICAgICAgICAgICAgYWRzLnBsYXkoKS50aGVuKF8gPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2FkcyBwbGF5IHN1Y2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9hZHMgcGxheSBmYWlsIG1heWJlIGNhdXNlIHVzZXIgaW50ZXJhY3RpdmUgbGVzc1xuICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhhdC5nZXROYW1lKCkgPT09IFBST1ZJREVSX0RBU0gpe1xuICAgICAgICAgICAgICAgICAgICBpZihhZHMgJiYgIWRhc2hBdHRhY2hlZFZpZXcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9BZCBzdGVhbHMgZGFzaCdzIHZpZGVvIGVsZW1lbnQuIFB1dCBpbiByaWdodCBwbGFjZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMubXNlLmF0dGFjaFZpZXcoZWxWaWRlbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXNoQXR0YWNoZWRWaWV3ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vSSB3YXMgc3RhcnRpbmcgdGhlIHN0cmVhbSBieSBjYWxsaW5nIHBsYXkoKS4gKEF1dG9wbGF5IHdhcyB0dXJuZWQgb2ZmKVxuICAgICAgICAgICAgICAgICAgICAvL3RoZSB2aWRlbyBmcmVlemUgZm9yIGxpdmUuIGxpa2UgdGhpcyBodHRwczovL2dpdGh1Yi5jb20vRGFzaC1JbmR1c3RyeS1Gb3J1bS9kYXNoLmpzL2lzc3Vlcy8yMTg0XG4gICAgICAgICAgICAgICAgICAgIC8vTXkgZ3Vlc3MgaXMgdXNlciBpbnRlcmVjdGl2ZS4uLlxuICAgICAgICAgICAgICAgICAgICAvL1RoaXMgaXMgdGVtcG9yYXJ5IHVudGlsIGkgd2lsbCBmaW5kIHBlcmZlY3Qgc29sdXRpb24uXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gZWxWaWRlby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkuYnJvd3NlciAgPT09IFwiU2FmYXJpXCIgfHwgcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyAgPT09IFwiaU9TXCIgfHwgcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyAgPT09IFwiQW5kcm9pZFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2FuJ3QgcGxheSBiZWNhdXNlIFVzZXIgZG9lc24ndCBhbnkgaW50ZXJhY3Rpb25zLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1dhaXQgZm9yIFVzZXIgSW50ZXJhY3Rpb25zLiAobGlrZSBjbGljaylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sNTAwKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkuYnJvd3NlciAgPT09IFwiU2FmYXJpXCIgfHwgcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyAgPT09IFwiaU9TXCIgfHwgcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyAgPT09IFwiQW5kcm9pZFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0Nhbid0IHBsYXkgYmVjYXVzZSBVc2VyIGRvZXNuJ3QgYW55IGludGVyYWN0aW9ucy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1dhaXQgZm9yIFVzZXIgSW50ZXJhY3Rpb25zLiAobGlrZSBjbGljaylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgfWVsc2UgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKXtcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQudHJpZ2dlcihQTEFZQkFDS19SQVRFX0NIQU5HRUQsIHtwbGF5YmFja1JhdGUgOiBwbGF5YmFja1JhdGV9KTtcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBpbmRleCA6IGluZGV4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmKHNwZWMuY3VycmVudFNvdXJjZSA9PT0gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XG4gICAgICAgICAgICBpZihzcGVjLnNvdXJjZXMgJiYgc3BlYy5zb3VyY2VzLmxlbmd0aCA+IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAvL3RoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUxhYmVsKHNwZWMuc291cmNlc1tzb3VyY2VJbmRleF0ubGFiZWwpO1xuICAgICAgICAgICAgICAgIC8vc3BlYy5jdXJyZW50UXVhbGl0eSA9IHNvdXJjZUluZGV4O1xuICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsVmlkZW8uY3VycmVudFRpbWUgfHwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG5cbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRGcmFtZXJhdGUgPSAoZnJhbWVyYXRlKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZSA9IGZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+e1xuICAgICAgICBsZXQgZnBzID0gc3BlYy5mcmFtZXJhdGU7XG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVzID0gZWxWaWRlby5jdXJyZW50VGltZSAqIGZwcztcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXG5cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xuICAgIH07XG5cbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgncHJlbG9hZCcpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIHdoaWxlIChlbFZpZGVvLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlQ2hpbGQoZWxWaWRlby5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5zdG9wKCk7XG4gICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgLy9lbFZpZGVvLnJlbW92ZSgpO1xuXG4gICAgICAgIGlmKGFkcyl7XG4gICAgICAgICAgICBhZHMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG4gICAgfTtcblxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9