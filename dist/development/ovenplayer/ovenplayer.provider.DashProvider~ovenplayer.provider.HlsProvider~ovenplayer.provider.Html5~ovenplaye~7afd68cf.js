/*! OvenPlayerv0.9.596 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

        //Sometimes dash live gave to me crazy duration. (9007199254740991...) why???
        if (duration > 9000000000000000) {
            //9007199254740991
            duration = Infinity;
        }

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
                /*
                * It is not necessary no more. Maybe Google ima updated 3.310.0	or 3.309.0. https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/history
                if(ads && !dashAttachedView){
                    //Ad steals dash's video element. Put in right place.
                    spec.mse.attachView(elVideo);
                    dashAttachedView = true;
                }*/
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

                //No more setTimeout playing.
                /*if(that.getName() === PROVIDER_DASH){
                    if(ads && !dashAttachedView){
                        //Ad steals dash's video element. Put in right place.
                        spec.mse.attachView(elVideo);
                        dashAttachedView = true;
                    }
                     //I was starting the stream by calling play(). (Autoplay was turned off)
                    //the video freeze for live. like this https://github.com/Dash-Industry-Forum/dash.js/issues/2184
                    //My guess is user interective...
                    //This is temporary until i will find perfect solution.
                    setTimeout(function(){
                        let promise = elVideo.play();
                        if (promise !== undefined) {
                            promise.then(function(){
                                isPlayingProcess = false;
                            }).catch(error => {
                                if(playerConfig.getBrowser().browser  === "Safari" || playerConfig.getBrowser().os  === "iOS" || playerConfig.getBrowser().os  === "Android"){
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
                    },500);
                }*/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwibXNlIiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsInRvRml4ZWQiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsInRyaWdnZXIiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJzZXRTdGF0ZSIsImxvYWRlZGRhdGEiLCJsb2FkZWRtZXRhZGF0YSIsImlzTGl2ZSIsImR1cmF0aW9uIiwiSW5maW5pdHkiLCJzb3VyY2VzIiwiZ2V0U291cmNlcyIsInNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZSIsInR5cGUiLCJtZXRhZGF0YSIsIkNPTlRFTlRfTUVUQSIsInBhdXNlIiwiU1RBVEVfRVJST1IiLCJlcnJvciIsImN1cnJlbnRUaW1lIiwiU1RBVEVfUEFVU0VEIiwicGxheSIsInBhdXNlZCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9MT0FESU5HIiwicGxheWluZyIsInRpbWVSYW5nZXMiLCJidWZmZXJlZCIsImxlbmd0aCIsImVuZCIsInNldEJ1ZmZlciIsIkNPTlRFTlRfQlVGRkVSIiwiYnVmZmVyUGVyY2VudCIsInRpbWV1cGRhdGUiLCJpc05hTiIsImlzU2Vla2luZyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldmVudE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVzdHJveSIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsIm9uRXh0ZW5kZWRMb2FkIiwiZGFzaEF0dGFjaGVkVmlldyIsImFkcyIsImxpc3RlbmVyIiwiaXNQbGF5aW5nUHJvY2VzcyIsImFkVGFnVXJsIiwiY29uc29sZSIsInBsYXliYWNrUmF0ZSIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJjdXJyZW50U291cmNlIiwiZnJhbWVyYXRlIiwic2V0VGltZWNvZGVNb2RlIiwicHJldmlvdXNTb3VyY2UiLCJzcmMiLCJzb3VyY2VFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZmlsZSIsInNvdXJjZUNoYW5nZWQiLCJsb2FkIiwic2VlayIsImlzQXV0b1N0YXJ0IiwiZ2V0TmFtZSIsIm5hbWUiLCJjYW5TZWVrIiwibmV3U3RhdGUiLCJzdGF0ZSIsInByZXZTdGF0ZSIsImlzQXV0b1BsYXlTdXBwb3J0Q2hlY2tUaW1lIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwibmV3c3RhdGUiLCJTVEFURV9BRF9QQVVTRUQiLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld0J1ZmZlciIsImJ1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRNdXRlIiwiQ09OVEVOVF9NVVRFIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImlzTXV0ZSIsInN0YXJ0dGltZSIsImlzQWN0aXZlIiwic3RhcnRlZCIsInRoZW4iLCJwcm9taXNlIiwidW5kZWZpbmVkIiwiZ2V0QnJvd3NlciIsImJyb3dzZXIiLCJvcyIsInNldFRpbWVvdXQiLCJzZXRQbGF5YmFja1JhdGUiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJtYXAiLCJpbmRleCIsImxhYmVsIiwic2V0Q3VycmVudFNvdXJjZSIsIm5lZWRQcm92aWRlckNoYW5nZSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJzZXRTb3VyY2VMYWJlbCIsImdldFF1YWxpdHlMZXZlbHMiLCJxdWFsaXR5TGV2ZWxzIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJjdXJyZW50UXVhbGl0eSIsInNldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0RnJhbWVyYXRlIiwic2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImZwcyIsImN1cnJlbnRGcmFtZXMiLCJuZXdQb3NpdGlvbiIsInN0b3AiLCJyZW1vdmVBdHRyaWJ1dGUiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJvZmYiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUE2QkE7O0FBRUE7Ozs7OztBQU9BLElBQU1B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Q2tILElBQUQsRUFBVTtBQUNuQixZQUFNb0UsU0FBU3RMLEtBQUtrSCxJQUFMLENBQWY7QUFDQSxlQUFPLFlBQVU7QUFDYixtQkFBT29FLE9BQU9DLEtBQVAsQ0FBYXZMLElBQWIsRUFBbUJ3TCxTQUFuQixDQUFQO0FBQ0gsU0FGRDtBQUdILEtBTEQ7QUFNQSxXQUFPeEwsSUFBUDtBQUVILENBOWNELEMsQ0FwQkE7OztxQkFvZWVvRixRIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2YuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEVSUk9SUyxcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUFJPVklERVJfSFRNTDUsXG4gICAgUFJPVklERVJfV0VCUlRDLFxuICAgIFBST1ZJREVSX0RBU0gsXG4gICAgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIHNlcGFyYXRlTGl2ZSwgZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVHJpZ2dlciBvbiB2YXJpb3VzIHZpZGVvIGV2ZW50cy5cbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLlxuICogQHBhcmFtICAgUHJvdmlkZXIgcHJvdmlkZXIgIGh0bWw1UHJvdmlkZXJcbiAqICovXG5cblxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihlbGVtZW50LCBtc2UsIHByb3ZpZGVyLCB2aWRlb0VuZGVkQ2FsbGJhY2spe1xuICAgIGNvbnN0IGxvd0xldmVsRXZlbnRzID0ge307XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIGxvYWRlZC5cIixlbGVtZW50ICxwcm92aWRlciApO1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcblxuICAgIGxldCBzdGFsbGVkID0gLTE7XG4gICAgbGV0IGVsVmlkZW8gPSAgZWxlbWVudDtcbiAgICBjb25zdCBiZXR3ZWVuID0gZnVuY3Rpb24gKG51bSwgbWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKG51bSwgbWF4KSwgbWluKTtcbiAgICB9XG4gICAgY29uc3QgY29tcGFyZVN0YWxsZWRUaW1lID0gZnVuY3Rpb24oc3RhbGxlZCwgcG9zaXRpb24pe1xuICAgICAgICAvL09yaWdpbmFsIENvZGUgaXMgc3RhbGxlZCAhPT0gcG9zaXRpb25cbiAgICAgICAgLy9CZWNhdXNlIERhc2hqcyBpcyB2ZXJ5IG1ldGljdWxvdXMuIFRoZW4gYWx3YXlzIGRpZmZyZW5jZSBzdGFsbGVkIGFuZCBwb3NpdGlvbi5cbiAgICAgICAgLy9UaGF0IGlzIHdoeSB3aGVuIEkgdXNlIHRvRml4ZWQoMikuXG4gICAgICAgIHJldHVybiBzdGFsbGVkLnRvRml4ZWQoMikgPT09IHBvc2l0aW9uLnRvRml4ZWQoMik7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmNhbnBsYXkgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBjYW4gc3RhcnQgcGxheWluZyB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgcHJvdmlkZXIuc2V0Q2FuU2Vlayh0cnVlKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUl9GVUxMKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGNhbnBsYXlcIik7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmR1cmF0aW9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGR1cmF0aW9uIG9mIHRoZSBhdWRpby92aWRlbyBpcyBjaGFuZ2VkXG4gICAgICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzKCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBkdXJhdGlvbmNoYW5nZVwiKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuZW5kZWQgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgY3VycmVudCBwbGF5bGlzdCBpcyBlbmRlZFxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZW5kZWRcIik7XG5cbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9DT01QTEVURSl7XG4gICAgICAgICAgICBpZih2aWRlb0VuZGVkQ2FsbGJhY2spe1xuICAgICAgICAgICAgICAgIHZpZGVvRW5kZWRDYWxsYmFjayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkZGF0YSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgdGhlIGN1cnJlbnQgZnJhbWUgb2YgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIC8vRG8gbm90aGluZyBCZWNhdXNlIHRoaXMgY2F1c2VzIGNoYW9zIGJ5IGxvYWRlZG1ldGFkYXRhLlxuICAgICAgICAvKlxuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgICAgICAgICBkdXJhdGlvbjogZWxWaWRlby5kdXJhdGlvbixcbiAgICAgICAgICAgIGhlaWdodDogZWxWaWRlby52aWRlb0hlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiBlbFZpZGVvLnZpZGVvV2lkdGhcbiAgICAgICAgfTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTsqL1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRtZXRhZGF0YSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgbWV0YSBkYXRhIGZvciB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgbGV0IGlzTGl2ZSA9IChlbFZpZGVvLmR1cmF0aW9uID09PSBJbmZpbml0eSkgPyB0cnVlIDogc2VwYXJhdGVMaXZlKG1zZSk7XG4gICAgICAgIGxldCBzb3VyY2VzID0gcHJvdmlkZXIuZ2V0U291cmNlcygpO1xuICAgICAgICBsZXQgc291cmNlSW5kZXggPSBwcm92aWRlci5nZXRDdXJyZW50U291cmNlKCk7XG4gICAgICAgIGxldCB0eXBlID0gc291cmNlSW5kZXggPiAtMSA/IHNvdXJjZXNbc291cmNlSW5kZXhdLnR5cGUgOiBcIlwiO1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgICAgICAgICBkdXJhdGlvbjogaXNMaXZlID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbixcbiAgICAgICAgICAgIHR5cGUgOnR5cGVcbiAgICAgICAgfTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGxvYWRlZG1ldGFkYXRhXCIsIG1ldGFkYXRhKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gcGF1c2VkXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0NPTVBMRVRFIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0VSUk9SKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihlbFZpZGVvLmVuZGVkKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihlbFZpZGVvLmVycm9yKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihlbFZpZGVvLmN1cnJlbnRUaW1lID09PSBlbFZpZGVvLmR1cmF0aW9uKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGF1c2VcIik7XG5cbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUEFVU0VEKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucGxheSA9ICgpID0+IHtcblxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHN0YXJ0ZWQgb3IgaXMgbm8gbG9uZ2VyIHBhdXNlZFxuICAgICAgICBzdGFsbGVkID0gLTE7XG4gICAgICAgIGlmICghZWxWaWRlby5wYXVzZWQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucGxheWluZyA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBpcyBwbGF5aW5nIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZCBvciBzdG9wcGVkIGZvciBidWZmZXJpbmdcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBsYXlpbmdcIik7XG4gICAgICAgIGlmKHN0YWxsZWQgPCAwKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcbiAgICAgICAgaWYoIXRpbWVSYW5nZXMgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb24sIHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcblxuICAgICAgICBwcm92aWRlci5zZXRCdWZmZXIoYnVmZmVyZWQqMTAwKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwge1xuICAgICAgICAgICAgYnVmZmVyUGVyY2VudDogYnVmZmVyZWQqMTAwLFxuICAgICAgICAgICAgcG9zaXRpb246ICBwb3NpdGlvbixcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICB9KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHByb2dyZXNzXCIsIGJ1ZmZlcmVkKjEwMCk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGhhcyBjaGFuZ2VkXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb247XG4gICAgICAgIGlmIChpc05hTihkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vU29tZXRpbWVzIGRhc2ggbGl2ZSBnYXZlIHRvIG1lIGNyYXp5IGR1cmF0aW9uLiAoOTAwNzE5OTI1NDc0MDk5MS4uLikgd2h5Pz8/XG4gICAgICAgIGlmKGR1cmF0aW9uID4gOTAwMDAwMDAwMDAwMDAwMCl7ICAgIC8vOTAwNzE5OTI1NDc0MDk5MVxuICAgICAgICAgICAgZHVyYXRpb24gPSBJbmZpbml0eTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSAmJiAhZWxWaWRlby5wYXVzZWQgJiYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1NUQUxMRUQgfHwgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfTE9BRElORyB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKSAmJlxuICAgICAgICAgICAgIWNvbXBhcmVTdGFsbGVkVGltZShzdGFsbGVkLCBwb3NpdGlvbikgKXtcbiAgICAgICAgICAgIHN0YWxsZWQgPSAtMTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcgfHwgcHJvdmlkZXIuaXNTZWVraW5nKCkpIHtcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FLCB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5zZWVraW5nID0gKCkgPT4ge1xuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKHRydWUpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2luZ1wiLCBlbFZpZGVvLmN1cnJlbnRUaW1lKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUsse1xuICAgICAgICAgICAgcG9zaXRpb24gOiBlbFZpZGVvLmN1cnJlbnRUaW1lXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2VkID0gKCkgPT4ge1xuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVrZWRcIik7XG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcoZmFsc2UpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFS0VEKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuc3RhbGxlZCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHN0YWxsZWRcIik7XG4gICAgICAgIC8vVGhpcyBjYWxsYmFjayBkb2VzIG5vdCB3b3JrIG9uIGNocm9tZS4gVGhpcyBjYWxscyBvbiBGaXJlZm94IGludGVybWl0dGVudC4gVGhlbiBkbyBub3Qgd29yayBoZXJlLiB1c2luZyB3YWl0aW5nIGV2ZW50LlxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy53YWl0aW5nID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIHZpZGVvIHN0b3BzIGJlY2F1c2UgaXQgbmVlZHMgdG8gYnVmZmVyIHRoZSBuZXh0IGZyYW1lXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB3YWl0aW5nXCIsIHByb3ZpZGVyLmdldFN0YXRlKCkpO1xuICAgICAgICBpZihwcm92aWRlci5pc1NlZWtpbmcoKSl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICAgICAgfWVsc2UgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBzdGFsbGVkID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1NUQUxMRUQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnZvbHVtZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHZvbHVtZWNoYW5nZVwiLCBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIHtcbiAgICAgICAgICAgIHZvbHVtZTogTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCksXG4gICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5lcnJvciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29kZSA9IChlbFZpZGVvLmVycm9yICYmIGVsVmlkZW8uZXJyb3IuY29kZSkgfHwgMDtcbiAgICAgICAgbGV0IGNvbnZlcnRlZEVycm9Db2RlID0gKHtcbiAgICAgICAgICAgIDA6IFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgICAgICAgICAgMTogUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgICAgICAgICAgMjogUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICAgICAgICAgIDM6IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICAgICAgICAgIDQ6IFBMQVlFUl9GSUxFX0VSUk9SXG4gICAgICAgIH1bY29kZV18fDApO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlcnJvclwiLCBjb252ZXJ0ZWRFcnJvQ29kZSk7XG4gICAgICAgIGVycm9yVHJpZ2dlcihFUlJPUlNbY29udmVydGVkRXJyb0NvZGVdLCBwcm92aWRlcik7XG4gICAgfTtcblxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICBlbFZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICB9KTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI3Li5cbiAqL1xuaW1wb3J0IEFkcyBmcm9tIFwiYXBpL3Byb3ZpZGVyL2Fkcy9BZHNcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcbmltcG9ydCBFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyXCI7XG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIHNlcGFyYXRlTGl2ZSwgcGlja0N1cnJlbnRTb3VyY2V9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgU1RBVEVfSURMRSwgU1RBVEVfUExBWUlORywgU1RBVEVfUEFVU0VELCBTVEFURV9DT01QTEVURSwgU1RBVEVfRVJST1IsXG4gICAgUExBWUVSX1NUQVRFLCBQTEFZRVJfQ09NUExFVEUsIFBMQVlFUl9QQVVTRSwgUExBWUVSX1BMQVksIFNUQVRFX0FEX1BMQVlJTkcsIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCxcbiAgICBQTEFZQkFDS19SQVRFX0NIQU5HRUQsIENPTlRFTlRfTVVURSwgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgQ29yZSBGb3IgSHRtbDUgVmlkZW8uXG4gKiBAcGFyYW0gICBzcGVjIG1lbWJlciB2YWx1ZVxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICBwbGF5ZXIgY29uZmlnXG4gKiBAcGFyYW0gICBvbkV4dGVuZGVkTG9hZCBvbiBsb2FkIGhhbmRsZXJcbiAqICovXG5jb25zdCBQcm92aWRlciA9IGZ1bmN0aW9uIChzcGVjLCBwbGF5ZXJDb25maWcsIG9uRXh0ZW5kZWRMb2FkKXtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIGxvYWRlZC4gXCIpO1xuXG4gICAgbGV0IHRoYXQgPXt9O1xuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcblxuICAgIGxldCBkYXNoQXR0YWNoZWRWaWV3ID0gZmFsc2U7XG5cbiAgICBsZXQgZWxWaWRlbyA9IHNwZWMuZWxlbWVudDtcbiAgICBsZXQgYWRzID0gbnVsbCwgbGlzdGVuZXIgPSBudWxsLCB2aWRlb0VuZGVkQ2FsbGJhY2sgPSBudWxsO1xuXG4gICAgbGV0IGlzUGxheWluZ1Byb2Nlc3MgPSBmYWxzZTtcblxuICAgIGlmKHNwZWMuYWRUYWdVcmwpe1xuICAgICAgICBhZHMgPSBBZHMoZWxWaWRlbywgdGhhdCwgcGxheWVyQ29uZmlnLCBzcGVjLmFkVGFnVXJsKTtcbiAgICAgICAgaWYoIWFkcyl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhbiBub3QgbG9hZCBkdWUgdG8gZ29vZ2xlIGltYSBmb3IgQWRzLlwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKGVsVmlkZW8sIHNwZWMubXNlLCB0aGF0LCBhZHMgPyBhZHMudmlkZW9FbmRlZENhbGxiYWNrIDogbnVsbCk7XG4gICAgZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5ZXJDb25maWcuZ2V0UGxheWJhY2tSYXRlKCk7XG5cbiAgICBjb25zdCBfbG9hZCA9IChsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgY29uc3Qgc291cmNlID0gIHNwZWMuc291cmNlc1tzcGVjLmN1cnJlbnRTb3VyY2VdO1xuICAgICAgICBzcGVjLmZyYW1lcmF0ZSA9IHNvdXJjZS5mcmFtZXJhdGU7XG4gICAgICAgIGlmKCFzcGVjLmZyYW1lcmF0ZSl7XG4gICAgICAgICAgICAvL2luaXQgdGltZWNvZGUgbW9kZVxuICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFRpbWVjb2RlTW9kZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZihvbkV4dGVuZGVkTG9hZCl7XG4gICAgICAgICAgICBvbkV4dGVuZGVkTG9hZChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBsb2FkZWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICBsZXQgcHJldmlvdXNTb3VyY2UgPSBlbFZpZGVvLnNyYztcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzb3VyY2UnKTtcblxuICAgICAgICAgICAgc291cmNlRWxlbWVudC5zcmMgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUNoYW5nZWQgPSAoc291cmNlRWxlbWVudC5zcmMgIT09IHByZXZpb3VzU291cmNlKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2VDaGFuZ2VkKSB7XG5cbiAgICAgICAgICAgICAgICBlbFZpZGVvLnNyYyA9IHNvdXJjZS5maWxlO1xuXG4gICAgICAgICAgICAgICAgLy9Eb24ndCB1c2UgdGhpcy4gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzA2Mzc3ODQvZGV0ZWN0LWFuLWVycm9yLW9uLWh0bWw1LXZpZGVvXG4gICAgICAgICAgICAgICAgLy9lbFZpZGVvLmFwcGVuZChzb3VyY2VFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBjYWxsIGxvYWQgaWYgc3JjIHdhcyBub3Qgc2V0LiBsb2FkKCkgd2lsbCBjYW5jZWwgYW55IGFjdGl2ZSBwbGF5IHByb21pc2UuXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzU291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgZWxWaWRlby5jdXJyZW50VGltZSA+IDApe1xuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKnRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc3BlYy5jdXJyZW50U291cmNlXG4gICAgICAgICAgICB9KTsqL1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5uYW1lO1xuICAgIH07XG4gICAgdGhhdC5jYW5TZWVrID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5jYW5TZWVrO1xuICAgIH07XG4gICAgdGhhdC5zZXRDYW5TZWVrID0gKGNhblNlZWspID0+IHtcbiAgICAgICAgc3BlYy5jYW5TZWVrID0gY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuaXNTZWVraW5nID0gKCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuc2Vla2luZztcbiAgICB9O1xuICAgIHRoYXQuc2V0U2Vla2luZyA9IChzZWVraW5nKT0+e1xuICAgICAgICBzcGVjLnNlZWtpbmcgPSBzZWVraW5nO1xuICAgIH07XG5cbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XG4gICAgICAgIGlmKHNwZWMuc3RhdGUgIT09IG5ld1N0YXRlKXtcbiAgICAgICAgICAgIGxldCBwcmV2U3RhdGUgPSBzcGVjLnN0YXRlO1xuXG4gICAgICAgICAgICAvL1RvRG8gOiBUaGlzIGlzIHRlbXBvcmFyeSBjb2RlLiBhdm9pZCBiYWNrZ3JvdW5kIGNvbnRlbnQgZXJyb3IuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BMQVlJTkcgJiYgKG5ld1N0YXRlID09PSBTVEFURV9FUlJPUiB8fCBuZXdTdGF0ZSA9PT0gU1RBVEVfSURMRSkgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYoYWRzICYmIGFkcy5pc0F1dG9QbGF5U3VwcG9ydENoZWNrVGltZSgpKXtcbiAgICAgICAgICAgICAgICAvL0FkcyBjaGVja3MgY2hlY2tBdXRvcGxheVN1cHBvcnQoKS5cbiAgICAgICAgICAgICAgICAvL0l0IGNhbGxzIHJlYWwgcGxheSgpIGFuZCBwYXVzZSgpLlxuICAgICAgICAgICAgICAgIC8vQW5kIHRoZW4gdGhpcyB0cmlnZ2VycyBcInBsYXlpbmdcIiBhbmQgXCJwYXVzZVwiLlxuICAgICAgICAgICAgICAgIC8vSSBwcmV2ZW50IHRoZXNlIHByb2Nlc3MuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBzd2l0Y2gobmV3U3RhdGUpe1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0NPTVBMRVRFIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUEFVU0VEIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX1BBVVNFRFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTVEFURV9BRF9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfQURfUEFVU0VEXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BMQVlJTkcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QTEFZSU5HXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTVEFURV9BRF9QTEFZSU5HIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfQURfUExBWUlOR1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3BlYy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldnN0YXRlIDogcHJldlN0YXRlLFxuICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogc3BlYy5zdGF0ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLnN0YXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XG4gICAgICAgIHNwZWMuYnVmZmVyID0gbmV3QnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmJ1ZmZlcjtcbiAgICB9O1xuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGxldCBpc0xpdmUgPSAoZWxWaWRlby5kdXJhdGlvbiA9PT0gSW5maW5pdHkpID8gdHJ1ZSA6IHNlcGFyYXRlTGl2ZShzcGVjLm1zZSk7XG4gICAgICAgIHJldHVybiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uO1xuICAgIH07XG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgfTtcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby52b2x1bWUgPSB2b2x1bWUvMTAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8udm9sdW1lKjEwMDtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gIWVsVmlkZW8ubXV0ZWQ7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gc3RhdGU7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcblxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcblxuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc011dGUoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFZvbHVtZShwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcbiAgICAgICAgX2xvYWQoc3BlYy5zb3VyY2VzLnN0YXJ0dGltZSB8fCAwKTtcbiAgICB9O1xuXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihpc1BsYXlpbmdQcm9jZXNzKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpc1BsYXlpbmdQcm9jZXNzID0gdHJ1ZTtcbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIGlmICggIChhZHMgJiYgYWRzLmlzQWN0aXZlKCkpIHx8IChhZHMgJiYgIWFkcy5zdGFydGVkKCkpICkge1xuICAgICAgICAgICAgICAgIGFkcy5wbGF5KCkudGhlbihfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9hZHMgcGxheSBzdWNjZXNzXG4gICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vYWRzIHBsYXkgZmFpbCBtYXliZSBjYXVzZSB1c2VyIGludGVyYWN0aXZlIGxlc3NcbiAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgKiBJdCBpcyBub3QgbmVjZXNzYXJ5IG5vIG1vcmUuIE1heWJlIEdvb2dsZSBpbWEgdXBkYXRlZCAzLjMxMC4wXHRvciAzLjMwOS4wLiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9pbnRlcmFjdGl2ZS1tZWRpYS1hZHMvZG9jcy9zZGtzL2h0bWw1L3YzL2hpc3RvcnlcbiAgICAgICAgICAgICAgICBpZihhZHMgJiYgIWRhc2hBdHRhY2hlZFZpZXcpe1xuICAgICAgICAgICAgICAgICAgICAvL0FkIHN0ZWFscyBkYXNoJ3MgdmlkZW8gZWxlbWVudC4gUHV0IGluIHJpZ2h0IHBsYWNlLlxuICAgICAgICAgICAgICAgICAgICBzcGVjLm1zZS5hdHRhY2hWaWV3KGVsVmlkZW8pO1xuICAgICAgICAgICAgICAgICAgICBkYXNoQXR0YWNoZWRWaWV3ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZSA9IGVsVmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgIGlmIChwcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCkuYnJvd3NlciAgPT09IFwiU2FmYXJpXCIgfHwgcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyAgPT09IFwiaU9TXCIgfHwgcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5vcyAgPT09IFwiQW5kcm9pZFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2FuJ3QgcGxheSBiZWNhdXNlIFVzZXIgZG9lc24ndCBhbnkgaW50ZXJhY3Rpb25zLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy9XYWl0IGZvciBVc2VyIEludGVyYWN0aW9ucy4gKGxpa2UgY2xpY2spXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vTm8gbW9yZSBzZXRUaW1lb3V0IHBsYXlpbmcuXG4gICAgICAgICAgICAgICAgLyppZih0aGF0LmdldE5hbWUoKSA9PT0gUFJPVklERVJfREFTSCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGFkcyAmJiAhZGFzaEF0dGFjaGVkVmlldyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0FkIHN0ZWFscyBkYXNoJ3MgdmlkZW8gZWxlbWVudC4gUHV0IGluIHJpZ2h0IHBsYWNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5tc2UuYXR0YWNoVmlldyhlbFZpZGVvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2hBdHRhY2hlZFZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9JIHdhcyBzdGFydGluZyB0aGUgc3RyZWFtIGJ5IGNhbGxpbmcgcGxheSgpLiAoQXV0b3BsYXkgd2FzIHR1cm5lZCBvZmYpXG4gICAgICAgICAgICAgICAgICAgIC8vdGhlIHZpZGVvIGZyZWV6ZSBmb3IgbGl2ZS4gbGlrZSB0aGlzIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXNoLUluZHVzdHJ5LUZvcnVtL2Rhc2guanMvaXNzdWVzLzIxODRcbiAgICAgICAgICAgICAgICAgICAgLy9NeSBndWVzcyBpcyB1c2VyIGludGVyZWN0aXZlLi4uXG4gICAgICAgICAgICAgICAgICAgIC8vVGhpcyBpcyB0ZW1wb3JhcnkgdW50aWwgaSB3aWxsIGZpbmQgcGVyZmVjdCBzb2x1dGlvbi5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5icm93c2VyICA9PT0gXCJTYWZhcmlcIiB8fCBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zICA9PT0gXCJpT1NcIiB8fCBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zICA9PT0gXCJBbmRyb2lkXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DYW4ndCBwbGF5IGJlY2F1c2UgVXNlciBkb2Vzbid0IGFueSBpbnRlcmFjdGlvbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vV2FpdCBmb3IgVXNlciBJbnRlcmFjdGlvbnMuIChsaWtlIGNsaWNrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSw1MDApO1xuICAgICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgfWVsc2UgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKXtcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQudHJpZ2dlcihQTEFZQkFDS19SQVRFX0NIQU5HRUQsIHtwbGF5YmFja1JhdGUgOiBwbGF5YmFja1JhdGV9KTtcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBpbmRleCA6IGluZGV4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmKHNwZWMuY3VycmVudFNvdXJjZSA9PT0gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XG4gICAgICAgICAgICBpZihzcGVjLnNvdXJjZXMgJiYgc3BlYy5zb3VyY2VzLmxlbmd0aCA+IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAvL3RoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUxhYmVsKHNwZWMuc291cmNlc1tzb3VyY2VJbmRleF0ubGFiZWwpO1xuICAgICAgICAgICAgICAgIC8vc3BlYy5jdXJyZW50UXVhbGl0eSA9IHNvdXJjZUluZGV4O1xuICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsVmlkZW8uY3VycmVudFRpbWUgfHwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG5cbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRGcmFtZXJhdGUgPSAoZnJhbWVyYXRlKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZSA9IGZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+e1xuICAgICAgICBsZXQgZnBzID0gc3BlYy5mcmFtZXJhdGU7XG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVzID0gZWxWaWRlby5jdXJyZW50VGltZSAqIGZwcztcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXG5cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xuICAgIH07XG5cbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgncHJlbG9hZCcpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIHdoaWxlIChlbFZpZGVvLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlQ2hpbGQoZWxWaWRlby5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5zdG9wKCk7XG4gICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgLy9lbFZpZGVvLnJlbW92ZSgpO1xuXG4gICAgICAgIGlmKGFkcyl7XG4gICAgICAgICAgICBhZHMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG4gICAgfTtcblxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9