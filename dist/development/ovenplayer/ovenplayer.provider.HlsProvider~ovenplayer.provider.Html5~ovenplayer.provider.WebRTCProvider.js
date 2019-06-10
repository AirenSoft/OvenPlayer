/*! OvenPlayerv0.9.5963 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplayer.provider.WebRTCProvider"],{

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

                // It is not necessary no more. Maybe Google ima updated 3.310.0	or 3.309.0. https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/history
                if (ads && !dashAttachedView) {
                    //Ad steals dash's video element. Put in right place.
                    spec.mse.attachView(elVideo);
                    dashAttachedView = true;
                    isPlayingProcess = false;
                } else {
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
                playerConfig.setSourceIndex(sourceIndex);
                //playerConfig.setSourceLabel(spec.sources[sourceIndex].label);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwibXNlIiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsInRvRml4ZWQiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsInRyaWdnZXIiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJzZXRTdGF0ZSIsImxvYWRlZGRhdGEiLCJsb2FkZWRtZXRhZGF0YSIsImlzTGl2ZSIsImR1cmF0aW9uIiwiSW5maW5pdHkiLCJzb3VyY2VzIiwiZ2V0U291cmNlcyIsInNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZSIsInR5cGUiLCJtZXRhZGF0YSIsIkNPTlRFTlRfTUVUQSIsInBhdXNlIiwiU1RBVEVfRVJST1IiLCJlcnJvciIsImN1cnJlbnRUaW1lIiwiU1RBVEVfUEFVU0VEIiwicGxheSIsInBhdXNlZCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9MT0FESU5HIiwicGxheWluZyIsInRpbWVSYW5nZXMiLCJidWZmZXJlZCIsImxlbmd0aCIsImVuZCIsInNldEJ1ZmZlciIsIkNPTlRFTlRfQlVGRkVSIiwiYnVmZmVyUGVyY2VudCIsInRpbWV1cGRhdGUiLCJpc05hTiIsImlzU2Vla2luZyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldmVudE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVzdHJveSIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsIm9uRXh0ZW5kZWRMb2FkIiwiZGFzaEF0dGFjaGVkVmlldyIsImFkcyIsImxpc3RlbmVyIiwiaXNQbGF5aW5nUHJvY2VzcyIsImFkVGFnVXJsIiwiY29uc29sZSIsInBsYXliYWNrUmF0ZSIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJjdXJyZW50U291cmNlIiwiZnJhbWVyYXRlIiwic2V0VGltZWNvZGVNb2RlIiwicHJldmlvdXNTb3VyY2UiLCJzcmMiLCJzb3VyY2VFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZmlsZSIsInNvdXJjZUNoYW5nZWQiLCJsb2FkIiwic2VlayIsImlzQXV0b1N0YXJ0IiwiZ2V0TmFtZSIsIm5hbWUiLCJjYW5TZWVrIiwibmV3U3RhdGUiLCJzdGF0ZSIsInByZXZTdGF0ZSIsImlzQXV0b1BsYXlTdXBwb3J0Q2hlY2tUaW1lIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwibmV3c3RhdGUiLCJTVEFURV9BRF9QQVVTRUQiLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld0J1ZmZlciIsImJ1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRNdXRlIiwiQ09OVEVOVF9NVVRFIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImlzTXV0ZSIsInN0YXJ0dGltZSIsImlzQWN0aXZlIiwic3RhcnRlZCIsInRoZW4iLCJhdHRhY2hWaWV3IiwicHJvbWlzZSIsInVuZGVmaW5lZCIsImdldEJyb3dzZXIiLCJicm93c2VyIiwib3MiLCJzZXRUaW1lb3V0Iiwic2V0UGxheWJhY2tSYXRlIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwibWFwIiwiaW5kZXgiLCJsYWJlbCIsInNldEN1cnJlbnRTb3VyY2UiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwic2V0U291cmNlSW5kZXgiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldEZyYW1lcmF0ZSIsInNldEZyYW1lcmF0ZSIsInNlZWtGcmFtZSIsImZyYW1lQ291bnQiLCJmcHMiLCJjdXJyZW50RnJhbWVzIiwibmV3UG9zaXRpb24iLCJzdG9wIiwicmVtb3ZlQXR0cmlidXRlIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwib2ZmIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBNkJBOztBQUVBOzs7Ozs7QUFPQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBU0MsT0FBVCxFQUFrQkMsR0FBbEIsRUFBdUJDLFFBQXZCLEVBQWlDQyxrQkFBakMsRUFBb0Q7QUFDakUsUUFBTUMsaUJBQWlCLEVBQXZCOztBQUVBQyxzQkFBa0JDLEdBQWxCLENBQXNCLHVCQUF0QixFQUE4Q04sT0FBOUMsRUFBdURFLFFBQXZEO0FBQ0EsUUFBTUssT0FBTyxFQUFiOztBQUVBLFFBQUlDLFVBQVUsQ0FBQyxDQUFmO0FBQ0EsUUFBSUMsVUFBV1QsT0FBZjtBQUNBLFFBQU1VLFVBQVUsU0FBVkEsT0FBVSxDQUFVQyxHQUFWLEVBQWVDLEdBQWYsRUFBb0JDLEdBQXBCLEVBQXlCO0FBQ3JDLGVBQU9DLEtBQUtELEdBQUwsQ0FBU0MsS0FBS0YsR0FBTCxDQUFTRCxHQUFULEVBQWNFLEdBQWQsQ0FBVCxFQUE2QkQsR0FBN0IsQ0FBUDtBQUNILEtBRkQ7QUFHQSxRQUFNRyxxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFTUCxPQUFULEVBQWtCUSxRQUFsQixFQUEyQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQSxlQUFPUixRQUFRUyxPQUFSLENBQWdCLENBQWhCLE1BQXVCRCxTQUFTQyxPQUFULENBQWlCLENBQWpCLENBQTlCO0FBQ0gsS0FMRDs7QUFPQWIsbUJBQWVjLE9BQWYsR0FBeUIsWUFBTTtBQUMzQjtBQUNBaEIsaUJBQVNpQixVQUFULENBQW9CLElBQXBCO0FBQ0FqQixpQkFBU2tCLE9BQVQsQ0FBaUJDLDhCQUFqQjtBQUNBaEIsMEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7QUFDSCxLQUxEOztBQU9BRixtQkFBZWtCLGNBQWYsR0FBZ0MsWUFBTTtBQUNsQztBQUNBbEIsdUJBQWVtQixRQUFmO0FBQ0FsQiwwQkFBa0JDLEdBQWxCLENBQXNCLG1DQUF0QjtBQUNILEtBSkQ7O0FBTUFGLG1CQUFlb0IsS0FBZixHQUF1QixZQUFNO0FBQ3pCO0FBQ0FuQiwwQkFBa0JDLEdBQWxCLENBQXNCLDBCQUF0Qjs7QUFFQSxZQUFHSixTQUFTdUIsUUFBVCxPQUF3QkMscUJBQXhCLElBQXNDeEIsU0FBU3VCLFFBQVQsT0FBd0JFLHlCQUFqRSxFQUFnRjtBQUM1RSxnQkFBR3hCLGtCQUFILEVBQXNCO0FBQ2xCQSxtQ0FBbUIsWUFBVTtBQUN6QkQsNkJBQVMwQixRQUFULENBQWtCRCx5QkFBbEI7QUFDSCxpQkFGRDtBQUdILGFBSkQsTUFJSztBQUNEekIseUJBQVMwQixRQUFULENBQWtCRCx5QkFBbEI7QUFDSDtBQUNKO0FBQ0osS0FiRDs7QUFlQXZCLG1CQUFleUIsVUFBZixHQUE0QixZQUFNO0FBQzlCO0FBQ0E7QUFDQTs7Ozs7OztBQU9ILEtBVkQ7O0FBWUF6QixtQkFBZTBCLGNBQWYsR0FBZ0MsWUFBTTtBQUNsQztBQUNBLFlBQUlDLFNBQVV0QixRQUFRdUIsUUFBUixLQUFxQkMsUUFBdEIsR0FBa0MsSUFBbEMsR0FBeUMseUJBQWFoQyxHQUFiLENBQXREO0FBQ0EsWUFBSWlDLFVBQVVoQyxTQUFTaUMsVUFBVCxFQUFkO0FBQ0EsWUFBSUMsY0FBY2xDLFNBQVNtQyxnQkFBVCxFQUFsQjtBQUNBLFlBQUlDLE9BQU9GLGNBQWMsQ0FBQyxDQUFmLEdBQW1CRixRQUFRRSxXQUFSLEVBQXFCRSxJQUF4QyxHQUErQyxFQUExRDtBQUNBLFlBQUlDLFdBQVc7QUFDWFAsc0JBQVVELFNBQVVFLFFBQVYsR0FBcUJ4QixRQUFRdUIsUUFENUI7QUFFWE0sa0JBQU1BO0FBRkssU0FBZjtBQUlBakMsMEJBQWtCQyxHQUFsQixDQUFzQixtQ0FBdEIsRUFBMkRpQyxRQUEzRDtBQUNBckMsaUJBQVNrQixPQUFULENBQWlCb0IsdUJBQWpCLEVBQStCRCxRQUEvQjtBQUNILEtBWkQ7O0FBY0FuQyxtQkFBZXFDLEtBQWYsR0FBdUIsWUFBTTtBQUN6QjtBQUNBLFlBQUd2QyxTQUFTdUIsUUFBVCxPQUF3QkUseUJBQXhCLElBQTBDekIsU0FBU3VCLFFBQVQsT0FBd0JpQixzQkFBckUsRUFBaUY7QUFDN0UsbUJBQU8sS0FBUDtBQUNIO0FBQ0QsWUFBR2pDLFFBQVFlLEtBQVgsRUFBaUI7QUFDYixtQkFBTyxLQUFQO0FBQ0g7QUFDRCxZQUFHZixRQUFRa0MsS0FBWCxFQUFpQjtBQUNiLG1CQUFPLEtBQVA7QUFDSDtBQUNELFlBQUdsQyxRQUFRbUMsV0FBUixLQUF3Qm5DLFFBQVF1QixRQUFuQyxFQUE0QztBQUN4QyxtQkFBTyxLQUFQO0FBQ0g7QUFDRDNCLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMEJBQXRCOztBQUVBSixpQkFBUzBCLFFBQVQsQ0FBa0JpQix1QkFBbEI7QUFDSCxLQWpCRDs7QUFtQkF6QyxtQkFBZTBDLElBQWYsR0FBc0IsWUFBTTs7QUFFeEI7QUFDQXRDLGtCQUFVLENBQUMsQ0FBWDtBQUNBLFlBQUksQ0FBQ0MsUUFBUXNDLE1BQVQsSUFBbUI3QyxTQUFTdUIsUUFBVCxPQUF3QnVCLHdCQUEvQyxFQUE4RDtBQUMxRDlDLHFCQUFTMEIsUUFBVCxDQUFrQnFCLHdCQUFsQjtBQUNIO0FBQ0osS0FQRDs7QUFTQTdDLG1CQUFlOEMsT0FBZixHQUF5QixZQUFNO0FBQzNCO0FBQ0E3QywwQkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QjtBQUNBLFlBQUdFLFVBQVUsQ0FBYixFQUFlO0FBQ1hOLHFCQUFTMEIsUUFBVCxDQUFrQm9CLHdCQUFsQjtBQUNIO0FBQ0osS0FORDs7QUFRQTVDLG1CQUFlbUIsUUFBZixHQUEwQixZQUFNO0FBQzVCO0FBQ0EsWUFBSTRCLGFBQWExQyxRQUFRMkMsUUFBekI7QUFDQSxZQUFHLENBQUNELFVBQUosRUFBZ0I7QUFDWixtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsWUFBSW5CLFdBQVd2QixRQUFRdUIsUUFBdkI7QUFBQSxZQUFpQ2hCLFdBQVdQLFFBQVFtQyxXQUFwRDtBQUNBLFlBQUlRLFdBQVcxQyxRQUFTLENBQUN5QyxXQUFXRSxNQUFYLEdBQW1CLENBQW5CLEdBQXVCRixXQUFXRyxHQUFYLENBQWVILFdBQVdFLE1BQVgsR0FBb0IsQ0FBbkMsQ0FBdkIsR0FBK0QsQ0FBaEUsSUFBc0VyQixRQUEvRSxFQUF5RixDQUF6RixFQUE0RixDQUE1RixDQUFmOztBQUVBOUIsaUJBQVNxRCxTQUFULENBQW1CSCxXQUFTLEdBQTVCO0FBQ0FsRCxpQkFBU2tCLE9BQVQsQ0FBaUJvQyx5QkFBakIsRUFBaUM7QUFDN0JDLDJCQUFlTCxXQUFTLEdBREs7QUFFN0JwQyxzQkFBV0EsUUFGa0I7QUFHN0JnQixzQkFBVUE7QUFIbUIsU0FBakM7QUFLQTNCLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNkJBQXRCLEVBQXFEOEMsV0FBUyxHQUE5RDtBQUNILEtBakJEOztBQW9CQWhELG1CQUFlc0QsVUFBZixHQUE0QixZQUFNO0FBQzlCO0FBQ0EsWUFBSTFDLFdBQVdQLFFBQVFtQyxXQUF2QjtBQUNBLFlBQUlaLFdBQVd2QixRQUFRdUIsUUFBdkI7QUFDQSxZQUFJMkIsTUFBTTNCLFFBQU4sQ0FBSixFQUFxQjtBQUNqQjtBQUNIOztBQUVEO0FBQ0EsWUFBR0EsV0FBVyxnQkFBZCxFQUErQjtBQUFLO0FBQ2hDQSx1QkFBV0MsUUFBWDtBQUNIOztBQUVELFlBQUcsQ0FBQy9CLFNBQVMwRCxTQUFULEVBQUQsSUFBeUIsQ0FBQ25ELFFBQVFzQyxNQUFsQyxLQUE2QzdDLFNBQVN1QixRQUFULE9BQXdCb0Msd0JBQXhCLElBQXlDM0QsU0FBU3VCLFFBQVQsT0FBd0J3Qix3QkFBakUsSUFBa0YvQyxTQUFTdUIsUUFBVCxPQUF3QnFDLDJCQUF2SixLQUNDLENBQUMvQyxtQkFBbUJQLE9BQW5CLEVBQTRCUSxRQUE1QixDQURMLEVBQzRDO0FBQ3hDUixzQkFBVSxDQUFDLENBQVg7QUFDQU4scUJBQVMwQixRQUFULENBQWtCb0Isd0JBQWxCO0FBQ0g7O0FBRUQsWUFBSTlDLFNBQVN1QixRQUFULE9BQXdCdUIsd0JBQXhCLElBQXlDOUMsU0FBUzBELFNBQVQsRUFBN0MsRUFBbUU7QUFDL0QxRCxxQkFBU2tCLE9BQVQsQ0FBaUIyQyx1QkFBakIsRUFBK0I7QUFDM0IvQywwQkFBVUEsUUFEaUI7QUFFM0JnQiwwQkFBVUE7QUFGaUIsYUFBL0I7QUFJSDtBQUVKLEtBMUJEOztBQTRCQTVCLG1CQUFlNEQsT0FBZixHQUF5QixZQUFNO0FBQzNCOUQsaUJBQVMrRCxVQUFULENBQW9CLElBQXBCO0FBQ0E1RCwwQkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QixFQUFvREcsUUFBUW1DLFdBQTVEO0FBQ0ExQyxpQkFBU2tCLE9BQVQsQ0FBaUI4Qyx1QkFBakIsRUFBOEI7QUFDMUJsRCxzQkFBV1AsUUFBUW1DO0FBRE8sU0FBOUI7QUFHSCxLQU5EO0FBT0F4QyxtQkFBZStELE1BQWYsR0FBd0IsWUFBTTtBQUMxQixZQUFHLENBQUNqRSxTQUFTMEQsU0FBVCxFQUFKLEVBQXlCO0FBQ3JCO0FBQ0g7QUFDRHZELDBCQUFrQkMsR0FBbEIsQ0FBc0IsMkJBQXRCO0FBQ0FKLGlCQUFTK0QsVUFBVCxDQUFvQixLQUFwQjtBQUNBL0QsaUJBQVNrQixPQUFULENBQWlCZ0QseUJBQWpCO0FBQ0gsS0FQRDs7QUFTQWhFLG1CQUFlSSxPQUFmLEdBQXlCLFlBQU07QUFDM0JILDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCO0FBQ0E7QUFDSCxLQUhEOztBQUtBRixtQkFBZWlFLE9BQWYsR0FBeUIsWUFBTTtBQUMzQjtBQUNBaEUsMEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEIsRUFBb0RKLFNBQVN1QixRQUFULEVBQXBEO0FBQ0EsWUFBR3ZCLFNBQVMwRCxTQUFULEVBQUgsRUFBd0I7QUFDcEIxRCxxQkFBUzBCLFFBQVQsQ0FBa0JxQix3QkFBbEI7QUFDSCxTQUZELE1BRU0sSUFBRy9DLFNBQVN1QixRQUFULE9BQXdCdUIsd0JBQTNCLEVBQXlDO0FBQzNDeEMsc0JBQVVDLFFBQVFtQyxXQUFsQjtBQUNBMUMscUJBQVMwQixRQUFULENBQWtCaUMsd0JBQWxCO0FBQ0g7QUFDSixLQVREOztBQVdBekQsbUJBQWVrRSxZQUFmLEdBQThCLFlBQU07QUFDaENqRSwwQkFBa0JDLEdBQWxCLENBQXNCLGlDQUF0QixFQUF5RFEsS0FBS3lELEtBQUwsQ0FBVzlELFFBQVErRCxNQUFSLEdBQWlCLEdBQTVCLENBQXpEO0FBQ0F0RSxpQkFBU2tCLE9BQVQsQ0FBaUJxRCx5QkFBakIsRUFBaUM7QUFDN0JELG9CQUFRMUQsS0FBS3lELEtBQUwsQ0FBVzlELFFBQVErRCxNQUFSLEdBQWlCLEdBQTVCLENBRHFCO0FBRTdCRSxrQkFBTWpFLFFBQVFrRTtBQUZlLFNBQWpDO0FBSUgsS0FORDs7QUFRQXZFLG1CQUFldUMsS0FBZixHQUF1QixZQUFNO0FBQ3pCLFlBQU1pQyxPQUFRbkUsUUFBUWtDLEtBQVIsSUFBaUJsQyxRQUFRa0MsS0FBUixDQUFjaUMsSUFBaEMsSUFBeUMsQ0FBdEQ7QUFDQSxZQUFJQyxvQkFBcUI7QUFDckIsZUFBR0MsK0JBRGtCO0FBRXJCLGVBQUdDLHlDQUZrQjtBQUdyQixlQUFHQyx1Q0FIa0I7QUFJckIsZUFBR0Msc0NBSmtCO0FBS3JCLGVBQUdDO0FBTGtCLFVBTXZCTixJQU51QixLQU1oQixDQU5UOztBQVFBdkUsMEJBQWtCQyxHQUFsQixDQUFzQiwwQkFBdEIsRUFBa0R1RSxpQkFBbEQ7QUFDQSxpQ0FBYU0sa0JBQU9OLGlCQUFQLENBQWIsRUFBd0MzRSxRQUF4QztBQUNILEtBWkQ7O0FBY0FrRixXQUFPQyxJQUFQLENBQVlqRixjQUFaLEVBQTRCa0YsT0FBNUIsQ0FBb0MscUJBQWE7QUFDN0M3RSxnQkFBUThFLG1CQUFSLENBQTRCQyxTQUE1QixFQUF1Q3BGLGVBQWVvRixTQUFmLENBQXZDO0FBQ0EvRSxnQkFBUWdGLGdCQUFSLENBQXlCRCxTQUF6QixFQUFvQ3BGLGVBQWVvRixTQUFmLENBQXBDO0FBQ0gsS0FIRDs7QUFLQWpGLFNBQUttRixPQUFMLEdBQWUsWUFBSztBQUNoQnJGLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMkJBQXRCOztBQUVBOEUsZUFBT0MsSUFBUCxDQUFZakYsY0FBWixFQUE0QmtGLE9BQTVCLENBQW9DLHFCQUFhO0FBQzdDN0Usb0JBQVE4RSxtQkFBUixDQUE0QkMsU0FBNUIsRUFBdUNwRixlQUFlb0YsU0FBZixDQUF2QztBQUNILFNBRkQ7QUFHSCxLQU5EO0FBT0EsV0FBT2pGLElBQVA7QUFDSCxDQS9ORDs7cUJBaU9lUixROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwUWY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFPQTs7Ozs7O0FBTUEsSUFBTTRGLFdBQVcsU0FBWEEsUUFBVyxDQUFVQyxJQUFWLEVBQWdCQyxZQUFoQixFQUE4QkMsY0FBOUIsRUFBNkM7QUFDMUR6RixzQkFBa0JDLEdBQWxCLENBQXNCLGVBQXRCOztBQUVBLFFBQUlDLE9BQU0sRUFBVjtBQUNBLG1DQUFhQSxJQUFiOztBQUVBLFFBQUl3RixtQkFBbUIsS0FBdkI7O0FBRUEsUUFBSXRGLFVBQVVtRixLQUFLNUYsT0FBbkI7QUFDQSxRQUFJZ0csTUFBTSxJQUFWO0FBQUEsUUFBZ0JDLFdBQVcsSUFBM0I7QUFBQSxRQUFpQzlGLHFCQUFxQixJQUF0RDs7QUFFQSxRQUFJK0YsbUJBQW1CLEtBQXZCOztBQUVBLFFBQUdOLEtBQUtPLFFBQVIsRUFBaUI7QUFDYkgsY0FBTSxzQkFBSXZGLE9BQUosRUFBYUYsSUFBYixFQUFtQnNGLFlBQW5CLEVBQWlDRCxLQUFLTyxRQUF0QyxDQUFOO0FBQ0EsWUFBRyxDQUFDSCxHQUFKLEVBQVE7QUFDSkksb0JBQVE5RixHQUFSLENBQVkseUNBQVo7QUFDSDtBQUNKO0FBQ0QyRixlQUFXLDJCQUFleEYsT0FBZixFQUF3Qm1GLEtBQUszRixHQUE3QixFQUFrQ00sSUFBbEMsRUFBd0N5RixNQUFNQSxJQUFJN0Ysa0JBQVYsR0FBK0IsSUFBdkUsQ0FBWDtBQUNBTSxZQUFRNEYsWUFBUixHQUF1QjVGLFFBQVE2RixtQkFBUixHQUE4QlQsYUFBYVUsZUFBYixFQUFyRDs7QUFFQSxRQUFNQyxRQUFRLFNBQVJBLEtBQVEsQ0FBQ0MsZ0JBQUQsRUFBcUI7QUFDL0IsWUFBTUMsU0FBVWQsS0FBSzFELE9BQUwsQ0FBYTBELEtBQUtlLGFBQWxCLENBQWhCO0FBQ0FmLGFBQUtnQixTQUFMLEdBQWlCRixPQUFPRSxTQUF4QjtBQUNBLFlBQUcsQ0FBQ2hCLEtBQUtnQixTQUFULEVBQW1CO0FBQ2Y7QUFDQWYseUJBQWFnQixlQUFiLENBQTZCLElBQTdCO0FBQ0g7QUFDRCxZQUFHZixjQUFILEVBQWtCO0FBQ2RBLDJCQUFlWSxNQUFmLEVBQXVCRCxnQkFBdkI7QUFDSCxTQUZELE1BRUs7QUFDRHBHLDhCQUFrQkMsR0FBbEIsQ0FBc0Isa0JBQXRCLEVBQTBDb0csTUFBMUMsRUFBa0Qsd0JBQXVCRCxnQkFBekU7QUFDQSxnQkFBSUssaUJBQWlCckcsUUFBUXNHLEdBQTdCO0FBQ0EsZ0JBQU1DLGdCQUFnQkMsU0FBU0MsYUFBVCxDQUF1QixRQUF2QixDQUF0Qjs7QUFFQUYsMEJBQWNELEdBQWQsR0FBb0JMLE9BQU9TLElBQTNCO0FBQ0EsZ0JBQU1DLGdCQUFpQkosY0FBY0QsR0FBZCxLQUFzQkQsY0FBN0M7QUFDQSxnQkFBSU0sYUFBSixFQUFtQjs7QUFFZjNHLHdCQUFRc0csR0FBUixHQUFjTCxPQUFPUyxJQUFyQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQUlMLGNBQUosRUFBb0I7QUFDaEJyRyw0QkFBUTRHLElBQVI7QUFDSDtBQUNKLGFBWEQsTUFXTSxJQUFHWixxQkFBcUIsQ0FBckIsSUFBMEJoRyxRQUFRbUMsV0FBUixHQUFzQixDQUFuRCxFQUFxRDtBQUN2RHJDLHFCQUFLK0csSUFBTCxDQUFVYixnQkFBVjtBQUNIOztBQUdELGdCQUFHQSxtQkFBbUIsQ0FBdEIsRUFBd0I7QUFDcEJsRyxxQkFBSytHLElBQUwsQ0FBVWIsZ0JBQVY7QUFDQSxvQkFBRyxDQUFDWixhQUFhMEIsV0FBYixFQUFKLEVBQStCO0FBQzNCaEgseUJBQUt1QyxJQUFMO0FBQ0g7QUFFSjs7QUFFRCxnQkFBRytDLGFBQWEwQixXQUFiLEVBQUgsRUFBOEI7QUFDMUJoSCxxQkFBS3VDLElBQUw7QUFDSDtBQUNEOzs7QUFHSDtBQUVKLEtBaEREOztBQWtEQXZDLFNBQUtpSCxPQUFMLEdBQWUsWUFBTTtBQUNqQixlQUFPNUIsS0FBSzZCLElBQVo7QUFDSCxLQUZEO0FBR0FsSCxTQUFLbUgsT0FBTCxHQUFlLFlBQU07QUFDakIsZUFBTzlCLEtBQUs4QixPQUFaO0FBQ0gsS0FGRDtBQUdBbkgsU0FBS1ksVUFBTCxHQUFrQixVQUFDdUcsT0FBRCxFQUFhO0FBQzNCOUIsYUFBSzhCLE9BQUwsR0FBZUEsT0FBZjtBQUNILEtBRkQ7QUFHQW5ILFNBQUtxRCxTQUFMLEdBQWlCLFlBQUk7QUFDakIsZUFBT2dDLEtBQUs1QixPQUFaO0FBQ0gsS0FGRDtBQUdBekQsU0FBSzBELFVBQUwsR0FBa0IsVUFBQ0QsT0FBRCxFQUFXO0FBQ3pCNEIsYUFBSzVCLE9BQUwsR0FBZUEsT0FBZjtBQUNILEtBRkQ7O0FBSUF6RCxTQUFLcUIsUUFBTCxHQUFnQixVQUFDK0YsUUFBRCxFQUFjO0FBQzFCLFlBQUcvQixLQUFLZ0MsS0FBTCxLQUFlRCxRQUFsQixFQUEyQjtBQUN2QixnQkFBSUUsWUFBWWpDLEtBQUtnQyxLQUFyQjs7QUFFQTtBQUNBLGdCQUFHQyxjQUFjL0QsMkJBQWQsS0FBbUM2RCxhQUFhakYsc0JBQWIsSUFBNEJpRixhQUFhakcscUJBQTVFLENBQUgsRUFBNEY7QUFDeEYsdUJBQU8sS0FBUDtBQUNIOztBQUdELGdCQUFHc0UsT0FBT0EsSUFBSThCLDBCQUFKLEVBQVYsRUFBMkM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDSCxhQUxELE1BS0s7QUFDRCx3QkFBT0gsUUFBUDtBQUNJLHlCQUFLaEcseUJBQUw7QUFDSXBCLDZCQUFLYSxPQUFMLENBQWEyRywwQkFBYjtBQUNBO0FBQ0oseUJBQUtsRix1QkFBTDtBQUNJdEMsNkJBQUthLE9BQUwsQ0FBYTRHLHVCQUFiLEVBQTJCO0FBQ3ZCSCx1Q0FBV2pDLEtBQUtnQyxLQURPO0FBRXZCSyxzQ0FBVXBGO0FBRmEseUJBQTNCO0FBSUE7QUFDSix5QkFBS3FGLDBCQUFMO0FBQ0kzSCw2QkFBS2EsT0FBTCxDQUFhNEcsdUJBQWIsRUFBMkI7QUFDdkJILHVDQUFXakMsS0FBS2dDLEtBRE87QUFFdkJLLHNDQUFVQztBQUZhLHlCQUEzQjtBQUlBO0FBQ0oseUJBQUtsRix3QkFBTDtBQUNJekMsNkJBQUthLE9BQUwsQ0FBYStHLHNCQUFiLEVBQTBCO0FBQ3RCTix1Q0FBV2pDLEtBQUtnQyxLQURNO0FBRXRCSyxzQ0FBVWpGO0FBRlkseUJBQTFCO0FBSUoseUJBQUtjLDJCQUFMO0FBQ0l2RCw2QkFBS2EsT0FBTCxDQUFhK0csc0JBQWIsRUFBMEI7QUFDdEJOLHVDQUFXakMsS0FBS2dDLEtBRE07QUFFdEJLLHNDQUFVbkU7QUFGWSx5QkFBMUI7QUFJQTtBQTFCUjtBQTRCQThCLHFCQUFLZ0MsS0FBTCxHQUFhRCxRQUFiO0FBQ0FwSCxxQkFBS2EsT0FBTCxDQUFhZ0gsdUJBQWIsRUFBMkI7QUFDdkJDLCtCQUFZUixTQURXO0FBRXZCSSw4QkFBVXJDLEtBQUtnQztBQUZRLGlCQUEzQjtBQUlIO0FBQ0o7QUFDSixLQW5ERDtBQW9EQXJILFNBQUtrQixRQUFMLEdBQWdCLFlBQUs7QUFDakIsZUFBT21FLEtBQUtnQyxLQUFaO0FBQ0gsS0FGRDtBQUdBckgsU0FBS2dELFNBQUwsR0FBaUIsVUFBQytFLFNBQUQsRUFBZTtBQUM1QjFDLGFBQUsyQyxNQUFMLEdBQWNELFNBQWQ7QUFDSCxLQUZEO0FBR0EvSCxTQUFLaUksU0FBTCxHQUFpQixZQUFNO0FBQ25CLGVBQU81QyxLQUFLMkMsTUFBWjtBQUNILEtBRkQ7QUFHQWhJLFNBQUtrSSxXQUFMLEdBQW1CLFlBQU07QUFDckIsWUFBSTFHLFNBQVV0QixRQUFRdUIsUUFBUixLQUFxQkMsUUFBdEIsR0FBa0MsSUFBbEMsR0FBeUMseUJBQWEyRCxLQUFLM0YsR0FBbEIsQ0FBdEQ7QUFDQSxlQUFPOEIsU0FBVUUsUUFBVixHQUFxQnhCLFFBQVF1QixRQUFwQztBQUNILEtBSEQ7QUFJQXpCLFNBQUttSSxXQUFMLEdBQW1CLFlBQU07QUFDckIsWUFBRyxDQUFDakksT0FBSixFQUFZO0FBQ1IsbUJBQU8sQ0FBUDtBQUNIO0FBQ0QsZUFBT0EsUUFBUW1DLFdBQWY7QUFDSCxLQUxEO0FBTUFyQyxTQUFLb0ksU0FBTCxHQUFpQixVQUFDbkUsTUFBRCxFQUFXO0FBQ3hCLFlBQUcsQ0FBQy9ELE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDtBQUNEQSxnQkFBUStELE1BQVIsR0FBaUJBLFNBQU8sR0FBeEI7QUFDSCxLQUxEO0FBTUFqRSxTQUFLcUksU0FBTCxHQUFpQixZQUFLO0FBQ2xCLFlBQUcsQ0FBQ25JLE9BQUosRUFBWTtBQUNSLG1CQUFPLENBQVA7QUFDSDtBQUNELGVBQU9BLFFBQVErRCxNQUFSLEdBQWUsR0FBdEI7QUFDSCxLQUxEO0FBTUFqRSxTQUFLc0ksT0FBTCxHQUFlLFVBQUNqQixLQUFELEVBQVU7QUFDckIsWUFBRyxDQUFDbkgsT0FBSixFQUFZO0FBQ1IsbUJBQU8sS0FBUDtBQUNIO0FBQ0QsWUFBSSxPQUFPbUgsS0FBUCxLQUFpQixXQUFyQixFQUFrQzs7QUFFOUJuSCxvQkFBUWtFLEtBQVIsR0FBZ0IsQ0FBQ2xFLFFBQVFrRSxLQUF6Qjs7QUFFQXBFLGlCQUFLYSxPQUFMLENBQWEwSCx1QkFBYixFQUEyQjtBQUN2QnBFLHNCQUFNakUsUUFBUWtFO0FBRFMsYUFBM0I7QUFJSCxTQVJELE1BUU87O0FBRUhsRSxvQkFBUWtFLEtBQVIsR0FBZ0JpRCxLQUFoQjs7QUFFQXJILGlCQUFLYSxPQUFMLENBQWEwSCx1QkFBYixFQUEyQjtBQUN2QnBFLHNCQUFNakUsUUFBUWtFO0FBRFMsYUFBM0I7QUFHSDtBQUNELGVBQU9sRSxRQUFRa0UsS0FBZjtBQUNILEtBckJEO0FBc0JBcEUsU0FBS3dJLE9BQUwsR0FBZSxZQUFLO0FBQ2hCLFlBQUcsQ0FBQ3RJLE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDtBQUNELGVBQU9BLFFBQVFrRSxLQUFmO0FBQ0gsS0FMRDs7QUFPQXBFLFNBQUt5SSxPQUFMLEdBQWUsVUFBQzlHLE9BQUQsRUFBVXVFLGdCQUFWLEVBQThCO0FBQ3pDYixhQUFLMUQsT0FBTCxHQUFlQSxPQUFmOztBQUVBMEQsYUFBS2UsYUFBTCxHQUFxQiw4QkFBa0J6RSxPQUFsQixFQUEyQjBELEtBQUtlLGFBQWhDLEVBQStDZCxZQUEvQyxDQUFyQjtBQUNBVyxjQUFNQyxvQkFBb0IsQ0FBMUI7O0FBRUEsZUFBTyxJQUFJd0MsT0FBSixDQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzFDLGdCQUFHdEQsYUFBYXVELE1BQWIsRUFBSCxFQUF5QjtBQUNyQjdJLHFCQUFLc0ksT0FBTCxDQUFhLElBQWI7QUFDSDtBQUNELGdCQUFHaEQsYUFBYStDLFNBQWIsRUFBSCxFQUE0QjtBQUN4QnJJLHFCQUFLb0ksU0FBTCxDQUFlOUMsYUFBYStDLFNBQWIsRUFBZjtBQUNIOztBQUVETTtBQUNILFNBVE0sQ0FBUDtBQVdILEtBakJEO0FBa0JBM0ksU0FBSzhHLElBQUwsR0FBWSxVQUFDbkYsT0FBRCxFQUFZO0FBQ3BCMEQsYUFBSzFELE9BQUwsR0FBZUEsT0FBZjtBQUNBMEQsYUFBS2UsYUFBTCxHQUFxQiw4QkFBa0J6RSxPQUFsQixFQUEyQjBELEtBQUtlLGFBQWhDLEVBQStDZCxZQUEvQyxDQUFyQjtBQUNBVyxjQUFNWixLQUFLMUQsT0FBTCxDQUFhbUgsU0FBYixJQUEwQixDQUFoQztBQUNILEtBSkQ7O0FBTUE5SSxTQUFLdUMsSUFBTCxHQUFZLFlBQUs7QUFDYixZQUFHLENBQUNyQyxPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7QUFDRCxZQUFHeUYsZ0JBQUgsRUFBb0I7QUFDaEIsbUJBQU8sS0FBUDtBQUNIO0FBQ0RBLDJCQUFtQixJQUFuQjtBQUNBLFlBQUczRixLQUFLa0IsUUFBTCxPQUFvQnVCLHdCQUF2QixFQUFxQztBQUNqQyxnQkFBT2dELE9BQU9BLElBQUlzRCxRQUFKLEVBQVIsSUFBNEJ0RCxPQUFPLENBQUNBLElBQUl1RCxPQUFKLEVBQTFDLEVBQTJEO0FBQ3ZEdkQsb0JBQUlsRCxJQUFKLEdBQVcwRyxJQUFYLENBQWdCLGFBQUs7QUFDakI7QUFDQXRELHVDQUFtQixLQUFuQjtBQUNILGlCQUhELFdBR1MsaUJBQVM7QUFDZDtBQUNBQSx1Q0FBbUIsS0FBbkI7QUFDQUUsNEJBQVE5RixHQUFSLENBQVlxQyxLQUFaO0FBQ0gsaUJBUEQ7QUFTSCxhQVZELE1BVUs7O0FBRUQ7QUFDQSxvQkFBR3FELE9BQU8sQ0FBQ0QsZ0JBQVgsRUFBNEI7QUFDeEI7QUFDQUgseUJBQUszRixHQUFMLENBQVN3SixVQUFULENBQW9CaEosT0FBcEI7QUFDQXNGLHVDQUFtQixJQUFuQjtBQUNBRyx1Q0FBbUIsS0FBbkI7QUFDSCxpQkFMRCxNQUtLO0FBQ0Qsd0JBQUl3RCxVQUFVakosUUFBUXFDLElBQVIsRUFBZDtBQUNBLHdCQUFJNEcsWUFBWUMsU0FBaEIsRUFBMkI7QUFDdkJELGdDQUFRRixJQUFSLENBQWEsWUFBVTtBQUNuQnRELCtDQUFtQixLQUFuQjtBQUNILHlCQUZELFdBRVMsaUJBQVM7QUFDZCxnQ0FBR0wsYUFBYStELFVBQWIsR0FBMEJDLE9BQTFCLEtBQXVDLFFBQXZDLElBQW1EaEUsYUFBYStELFVBQWIsR0FBMEJFLEVBQTFCLEtBQWtDLEtBQXJGLElBQThGakUsYUFBYStELFVBQWIsR0FBMEJFLEVBQTFCLEtBQWtDLFNBQW5JLEVBQTZJO0FBQ3pJckosd0NBQVFrRSxLQUFSLEdBQWdCLElBQWhCO0FBQ0g7QUFDRDtBQUNBO0FBQ0FvRix1Q0FBVyxZQUFZO0FBQ25CN0QsbURBQW1CLEtBQW5CO0FBQ0EzRixxQ0FBS3VDLElBQUw7QUFDSCw2QkFIRCxFQUdHLEdBSEg7QUFLSCx5QkFiRDtBQWNIO0FBQ0o7O0FBR0Q7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ0g7QUFFSjtBQUVKLEtBckZEO0FBc0ZBdkMsU0FBS2tDLEtBQUwsR0FBYSxZQUFLO0FBQ2QsWUFBRyxDQUFDaEMsT0FBSixFQUFZO0FBQ1IsbUJBQU8sS0FBUDtBQUNIOztBQUVELFlBQUlGLEtBQUtrQixRQUFMLE9BQW9CdUIsd0JBQXhCLEVBQXVDO0FBQ25DdkMsb0JBQVFnQyxLQUFSO0FBQ0gsU0FGRCxNQUVNLElBQUdsQyxLQUFLa0IsUUFBTCxPQUFvQnFDLDJCQUF2QixFQUF3QztBQUMxQ2tDLGdCQUFJdkQsS0FBSjtBQUNIO0FBQ0osS0FWRDtBQVdBbEMsU0FBSytHLElBQUwsR0FBWSxVQUFDdEcsUUFBRCxFQUFhO0FBQ3JCLFlBQUcsQ0FBQ1AsT0FBSixFQUFZO0FBQ1IsbUJBQU8sS0FBUDtBQUNIO0FBQ0RBLGdCQUFRbUMsV0FBUixHQUFzQjVCLFFBQXRCO0FBQ0gsS0FMRDtBQU1BVCxTQUFLeUosZUFBTCxHQUF1QixVQUFDM0QsWUFBRCxFQUFpQjtBQUNwQyxZQUFHLENBQUM1RixPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7QUFDREYsYUFBS2EsT0FBTCxDQUFhNkksZ0NBQWIsRUFBb0MsRUFBQzVELGNBQWVBLFlBQWhCLEVBQXBDO0FBQ0EsZUFBTzVGLFFBQVE0RixZQUFSLEdBQXVCNUYsUUFBUTZGLG1CQUFSLEdBQThCRCxZQUE1RDtBQUNILEtBTkQ7QUFPQTlGLFNBQUtnRyxlQUFMLEdBQXVCLFlBQUs7QUFDeEIsWUFBRyxDQUFDOUYsT0FBSixFQUFZO0FBQ1IsbUJBQU8sQ0FBUDtBQUNIO0FBQ0QsZUFBT0EsUUFBUTRGLFlBQWY7QUFDSCxLQUxEOztBQU9BOUYsU0FBSzRCLFVBQUwsR0FBa0IsWUFBTTtBQUNwQixZQUFHLENBQUMxQixPQUFKLEVBQVk7QUFDUixtQkFBTyxFQUFQO0FBQ0g7O0FBRUQsZUFBT21GLEtBQUsxRCxPQUFMLENBQWFnSSxHQUFiLENBQWlCLFVBQVN4RCxNQUFULEVBQWlCeUQsS0FBakIsRUFBd0I7QUFDNUMsbUJBQU87QUFDSGhELHNCQUFNVCxPQUFPUyxJQURWO0FBRUg3RSxzQkFBTW9FLE9BQU9wRSxJQUZWO0FBR0g4SCx1QkFBTzFELE9BQU8wRCxLQUhYO0FBSUhELHVCQUFRQTtBQUpMLGFBQVA7QUFNSCxTQVBNLENBQVA7QUFRSCxLQWJEO0FBY0E1SixTQUFLOEIsZ0JBQUwsR0FBd0IsWUFBSztBQUN6QixlQUFPdUQsS0FBS2UsYUFBWjtBQUNILEtBRkQ7QUFHQXBHLFNBQUs4SixnQkFBTCxHQUF3QixVQUFDakksV0FBRCxFQUFja0ksa0JBQWQsRUFBcUM7QUFDckQsWUFBRzFFLEtBQUtlLGFBQUwsS0FBdUJ2RSxXQUExQixFQUFzQztBQUN0QyxtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsWUFBR0EsY0FBYyxDQUFDLENBQWxCLEVBQW9CO0FBQ2hCLGdCQUFHd0QsS0FBSzFELE9BQUwsSUFBZ0IwRCxLQUFLMUQsT0FBTCxDQUFhbUIsTUFBYixHQUFzQmpCLFdBQXpDLEVBQXFEO0FBQ2pEO0FBQ0E7QUFDQS9CLGtDQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXNCOEIsV0FBNUM7QUFDQXdELHFCQUFLZSxhQUFMLEdBQXFCdkUsV0FBckI7O0FBRUE3QixxQkFBS2EsT0FBTCxDQUFhbUosaUNBQWIsRUFBcUM7QUFDakM1RCxtQ0FBZXZFO0FBRGtCLGlCQUFyQztBQUdBeUQsNkJBQWEyRSxjQUFiLENBQTRCcEksV0FBNUI7QUFDQTtBQUNBO0FBQ0E3QixxQkFBS2tDLEtBQUw7QUFDQWxDLHFCQUFLcUIsUUFBTCxDQUFjRixxQkFBZDtBQUNBLG9CQUFHNEksa0JBQUgsRUFBc0I7QUFDbEI5RCwwQkFBTS9GLFFBQVFtQyxXQUFSLElBQXVCLENBQTdCO0FBQ0g7QUFDRDtBQUNBLHVCQUFPZ0QsS0FBS2UsYUFBWjtBQUNIO0FBQ0o7QUFDSixLQTNCRDs7QUE4QkFwRyxTQUFLa0ssZ0JBQUwsR0FBd0IsWUFBTTtBQUMxQixZQUFHLENBQUNoSyxPQUFKLEVBQVk7QUFDUixtQkFBTyxFQUFQO0FBQ0g7QUFDRCxlQUFPbUYsS0FBSzhFLGFBQVo7QUFDSCxLQUxEO0FBTUFuSyxTQUFLb0ssaUJBQUwsR0FBeUIsWUFBTTtBQUMzQixZQUFHLENBQUNsSyxPQUFKLEVBQVk7QUFDUixtQkFBTyxJQUFQO0FBQ0g7QUFDRCxlQUFPbUYsS0FBS2dGLGNBQVo7QUFDSCxLQUxEO0FBTUFySyxTQUFLc0ssaUJBQUwsR0FBeUIsVUFBQ0MsWUFBRCxFQUFrQjtBQUN2QztBQUNILEtBRkQ7QUFHQXZLLFNBQUt3SyxhQUFMLEdBQXFCLFlBQU07QUFDdkI7QUFDSCxLQUZEO0FBR0F4SyxTQUFLeUssY0FBTCxHQUFzQixVQUFDQyxNQUFELEVBQVk7QUFDOUI7QUFDSCxLQUZEOztBQUlBMUssU0FBSzJLLFlBQUwsR0FBb0IsWUFBTTtBQUN0QixlQUFPdEYsS0FBS2dCLFNBQVo7QUFDSCxLQUZEO0FBR0FyRyxTQUFLNEssWUFBTCxHQUFvQixVQUFDdkUsU0FBRCxFQUFlO0FBQy9CLGVBQU9oQixLQUFLZ0IsU0FBTCxHQUFpQkEsU0FBeEI7QUFDSCxLQUZEO0FBR0FyRyxTQUFLNkssU0FBTCxHQUFpQixVQUFDQyxVQUFELEVBQWU7QUFDNUIsWUFBSUMsTUFBTTFGLEtBQUtnQixTQUFmO0FBQ0EsWUFBSTJFLGdCQUFnQjlLLFFBQVFtQyxXQUFSLEdBQXNCMEksR0FBMUM7QUFDQSxZQUFJRSxjQUFjLENBQUNELGdCQUFnQkYsVUFBakIsSUFBK0JDLEdBQWpEO0FBQ0FFLHNCQUFjQSxjQUFjLE9BQTVCLENBSjRCLENBSVM7O0FBRXJDakwsYUFBS2tDLEtBQUw7QUFDQWxDLGFBQUsrRyxJQUFMLENBQVVrRSxXQUFWO0FBQ0gsS0FSRDs7QUFVQWpMLFNBQUtrTCxJQUFMLEdBQVksWUFBSztBQUNiLFlBQUcsQ0FBQ2hMLE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDtBQUNESiwwQkFBa0JDLEdBQWxCLENBQXNCLGdCQUF0QjtBQUNBRyxnQkFBUWlMLGVBQVIsQ0FBd0IsU0FBeEI7QUFDQWpMLGdCQUFRaUwsZUFBUixDQUF3QixLQUF4QjtBQUNBLGVBQU9qTCxRQUFRa0wsVUFBZixFQUEyQjtBQUN2QmxMLG9CQUFRbUwsV0FBUixDQUFvQm5MLFFBQVFrTCxVQUE1QjtBQUNIO0FBQ0RwTCxhQUFLa0MsS0FBTDtBQUNBbEMsYUFBS3FCLFFBQUwsQ0FBY0YscUJBQWQ7QUFDSCxLQVpEOztBQWNBbkIsU0FBS21GLE9BQUwsR0FBZSxZQUFLO0FBQ2hCLFlBQUcsQ0FBQ2pGLE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDtBQUNERixhQUFLa0wsSUFBTDtBQUNBeEYsaUJBQVNQLE9BQVQ7QUFDQTs7QUFFQSxZQUFHTSxHQUFILEVBQU87QUFDSEEsZ0JBQUlOLE9BQUo7QUFDSDtBQUNEbkYsYUFBS3NMLEdBQUw7QUFDQXhMLDBCQUFrQkMsR0FBbEIsQ0FBc0IseURBQXRCO0FBQ0gsS0FiRDs7QUFlQTtBQUNBO0FBQ0FDLG9CQUFhLFVBQUNrSCxJQUFELEVBQVU7QUFDbkIsWUFBTXFFLFNBQVN2TCxLQUFLa0gsSUFBTCxDQUFmO0FBQ0EsZUFBTyxZQUFVO0FBQ2IsbUJBQU9xRSxPQUFPQyxLQUFQLENBQWF4TCxJQUFiLEVBQW1CeUwsU0FBbkIsQ0FBUDtBQUNILFNBRkQ7QUFHSCxLQUxEO0FBTUEsV0FBT3pMLElBQVA7QUFFSCxDQWpkRCxDLENBcEJBOzs7cUJBdWVlb0YsUSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRVJST1JTLFxuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfQURfUExBWUlORyxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlLCBlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUcmlnZ2VyIG9uIHZhcmlvdXMgdmlkZW8gZXZlbnRzLlxuICogQHBhcmFtICAgZXh0ZW5kZWRFbGVtZW50IGV4dGVuZGVkIG1lZGlhIG9iamVjdCBieSBtc2UuXG4gKiBAcGFyYW0gICBQcm92aWRlciBwcm92aWRlciAgaHRtbDVQcm92aWRlclxuICogKi9cblxuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGVsZW1lbnQsIG1zZSwgcHJvdmlkZXIsIHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgY29uc3QgbG93TGV2ZWxFdmVudHMgPSB7fTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgbG9hZGVkLlwiLGVsZW1lbnQgLHByb3ZpZGVyICk7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuXG4gICAgbGV0IHN0YWxsZWQgPSAtMTtcbiAgICBsZXQgZWxWaWRlbyA9ICBlbGVtZW50O1xuICAgIGNvbnN0IGJldHdlZW4gPSBmdW5jdGlvbiAobnVtLCBtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4obnVtLCBtYXgpLCBtaW4pO1xuICAgIH1cbiAgICBjb25zdCBjb21wYXJlU3RhbGxlZFRpbWUgPSBmdW5jdGlvbihzdGFsbGVkLCBwb3NpdGlvbil7XG4gICAgICAgIC8vT3JpZ2luYWwgQ29kZSBpcyBzdGFsbGVkICE9PSBwb3NpdGlvblxuICAgICAgICAvL0JlY2F1c2UgRGFzaGpzIGlzIHZlcnkgbWV0aWN1bG91cy4gVGhlbiBhbHdheXMgZGlmZnJlbmNlIHN0YWxsZWQgYW5kIHBvc2l0aW9uLlxuICAgICAgICAvL1RoYXQgaXMgd2h5IHdoZW4gSSB1c2UgdG9GaXhlZCgyKS5cbiAgICAgICAgcmV0dXJuIHN0YWxsZWQudG9GaXhlZCgyKSA9PT0gcG9zaXRpb24udG9GaXhlZCgyKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuY2FucGxheSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGNhbiBzdGFydCBwbGF5aW5nIHRoZSBhdWRpby92aWRlb1xuICAgICAgICBwcm92aWRlci5zZXRDYW5TZWVrKHRydWUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSX0ZVTEwpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gY2FucGxheVwiKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuZHVyYXRpb25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgZHVyYXRpb24gb2YgdGhlIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWRcbiAgICAgICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MoKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGR1cmF0aW9uY2hhbmdlXCIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5lbmRlZCA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXlsaXN0IGlzIGVuZGVkXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlbmRlZFwiKTtcblxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9JRExFICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0NPTVBMRVRFKXtcbiAgICAgICAgICAgIGlmKHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgdmlkZW9FbmRlZENhbGxiYWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZSBvZiB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgLy9EbyBub3RoaW5nIEJlY2F1c2UgdGhpcyBjYXVzZXMgY2hhb3MgYnkgbG9hZGVkbWV0YWRhdGEuXG4gICAgICAgIC8qXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IGVsVmlkZW8udmlkZW9XaWR0aFxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCBtZXRhIGRhdGEgZm9yIHRoZSBhdWRpby92aWRlb1xuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT09IEluZmluaXR5KSA/IHRydWUgOiBzZXBhcmF0ZUxpdmUobXNlKTtcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwcm92aWRlci5nZXRTb3VyY2VzKCk7XG4gICAgICAgIGxldCBzb3VyY2VJbmRleCA9IHByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICAgICAgbGV0IHR5cGUgPSBzb3VyY2VJbmRleCA+IC0xID8gc291cmNlc1tzb3VyY2VJbmRleF0udHlwZSA6IFwiXCI7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgdHlwZSA6dHlwZVxuICAgICAgICB9O1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gbG9hZGVkbWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBwYXVzZWRcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQ09NUExFVEUgfHwgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfRVJST1Ipe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uZW5kZWQpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uZXJyb3Ipe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uY3VycmVudFRpbWUgPT09IGVsVmlkZW8uZHVyYXRpb24pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwYXVzZVwiKTtcblxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xuXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gc3RhcnRlZCBvciBpcyBubyBsb25nZXIgcGF1c2VkXG4gICAgICAgIHN0YWxsZWQgPSAtMTtcbiAgICAgICAgaWYgKCFlbFZpZGVvLnBhdXNlZCAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5aW5nID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGlzIHBsYXlpbmcgYWZ0ZXIgaGF2aW5nIGJlZW4gcGF1c2VkIG9yIHN0b3BwZWQgZm9yIGJ1ZmZlcmluZ1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheWluZ1wiKTtcbiAgICAgICAgaWYoc3RhbGxlZCA8IDApe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBpcyBkb3dubG9hZGluZyB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgbGV0IHRpbWVSYW5nZXMgPSBlbFZpZGVvLmJ1ZmZlcmVkO1xuICAgICAgICBpZighdGltZVJhbmdlcyApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbiwgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICBsZXQgYnVmZmVyZWQgPSBiZXR3ZWVuKCAodGltZVJhbmdlcy5sZW5ndGg+IDAgPyB0aW1lUmFuZ2VzLmVuZCh0aW1lUmFuZ2VzLmxlbmd0aCAtIDEpIDogMCApIC8gZHVyYXRpb24sIDAsIDEpO1xuXG4gICAgICAgIHByb3ZpZGVyLnNldEJ1ZmZlcihidWZmZXJlZCoxMDApO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSLCB7XG4gICAgICAgICAgICBidWZmZXJQZXJjZW50OiBidWZmZXJlZCoxMDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogIHBvc2l0aW9uLFxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcHJvZ3Jlc3NcIiwgYnVmZmVyZWQqMTAwKTtcbiAgICB9O1xuXG5cbiAgICBsb3dMZXZlbEV2ZW50cy50aW1ldXBkYXRlID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbjtcbiAgICAgICAgaWYgKGlzTmFOKGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Tb21ldGltZXMgZGFzaCBsaXZlIGdhdmUgdG8gbWUgY3JhenkgZHVyYXRpb24uICg5MDA3MTk5MjU0NzQwOTkxLi4uKSB3aHk/Pz9cbiAgICAgICAgaWYoZHVyYXRpb24gPiA5MDAwMDAwMDAwMDAwMDAwKXsgICAgLy85MDA3MTk5MjU0NzQwOTkxXG4gICAgICAgICAgICBkdXJhdGlvbiA9IEluZmluaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpICYmICFlbFZpZGVvLnBhdXNlZCAmJiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfU1RBTExFRCB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9MT0FESU5HIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcpICYmXG4gICAgICAgICAgICAhY29tcGFyZVN0YWxsZWRUaW1lKHN0YWxsZWQsIHBvc2l0aW9uKSApe1xuICAgICAgICAgICAgc3RhbGxlZCA9IC0xO1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyB8fCBwcm92aWRlci5pc1NlZWtpbmcoKSkge1xuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtpbmcgPSAoKSA9PiB7XG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcodHJ1ZSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVraW5nXCIsIGVsVmlkZW8uY3VycmVudFRpbWUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFSyx7XG4gICAgICAgICAgICBwb3NpdGlvbiA6IGVsVmlkZW8uY3VycmVudFRpbWVcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50cy5zZWVrZWQgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtlZFwiKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyhmYWxzZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLRUQpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5zdGFsbGVkID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc3RhbGxlZFwiKTtcbiAgICAgICAgLy9UaGlzIGNhbGxiYWNrIGRvZXMgbm90IHdvcmsgb24gY2hyb21lLiBUaGlzIGNhbGxzIG9uIEZpcmVmb3ggaW50ZXJtaXR0ZW50LiBUaGVuIGRvIG5vdCB3b3JrIGhlcmUuIHVzaW5nIHdhaXRpbmcgZXZlbnQuXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLndhaXRpbmcgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgdmlkZW8gc3RvcHMgYmVjYXVzZSBpdCBuZWVkcyB0byBidWZmZXIgdGhlIG5leHQgZnJhbWVcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIiwgcHJvdmlkZXIuZ2V0U3RhdGUoKSk7XG4gICAgICAgIGlmKHByb3ZpZGVyLmlzU2Vla2luZygpKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuICAgICAgICB9ZWxzZSBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIHN0YWxsZWQgPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfU1RBTExFRCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMudm9sdW1lY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gdm9sdW1lY2hhbmdlXCIsIE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwge1xuICAgICAgICAgICAgdm9sdW1lOiBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSxcbiAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb2RlID0gKGVsVmlkZW8uZXJyb3IgJiYgZWxWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xuICAgICAgICBsZXQgY29udmVydGVkRXJyb0NvZGUgPSAoe1xuICAgICAgICAgICAgMDogUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgICAgICAgICAxOiBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgICAgICAgICAyOiBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgICAgICAgICAgMzogUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgICAgICAgICAgNDogUExBWUVSX0ZJTEVfRVJST1JcbiAgICAgICAgfVtjb2RlXXx8MCk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVycm9yXCIsIGNvbnZlcnRlZEVycm9Db2RlKTtcbiAgICAgICAgZXJyb3JUcmlnZ2VyKEVSUk9SU1tjb252ZXJ0ZWRFcnJvQ29kZV0sIHByb3ZpZGVyKTtcbiAgICB9O1xuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGVsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XG5cbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjcuLlxuICovXG5pbXBvcnQgQWRzIGZyb20gXCJhcGkvcHJvdmlkZXIvYWRzL0Fkc1wiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXJcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlLCBwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLCBTVEFURV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsIFBMQVlFUl9DT01QTEVURSwgUExBWUVSX1BBVVNFLCBQTEFZRVJfUExBWSwgU1RBVEVfQURfUExBWUlORywgU1RBVEVfQURfUEFVU0VELFxuICAgIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBDT05URU5UX1NPVVJDRV9DSEFOR0VELFxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBDb3JlIEZvciBIdG1sNSBWaWRlby5cbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcbiAqIEBwYXJhbSAgIG9uRXh0ZW5kZWRMb2FkIG9uIGxvYWQgaGFuZGxlclxuICogKi9cbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24gKHNwZWMsIHBsYXllckNvbmZpZywgb25FeHRlbmRlZExvYWQpe1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgbG9hZGVkLiBcIik7XG5cbiAgICBsZXQgdGhhdCA9e307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG4gICAgbGV0IGRhc2hBdHRhY2hlZFZpZXcgPSBmYWxzZTtcblxuICAgIGxldCBlbFZpZGVvID0gc3BlYy5lbGVtZW50O1xuICAgIGxldCBhZHMgPSBudWxsLCBsaXN0ZW5lciA9IG51bGwsIHZpZGVvRW5kZWRDYWxsYmFjayA9IG51bGw7XG5cbiAgICBsZXQgaXNQbGF5aW5nUHJvY2VzcyA9IGZhbHNlO1xuXG4gICAgaWYoc3BlYy5hZFRhZ1VybCl7XG4gICAgICAgIGFkcyA9IEFkcyhlbFZpZGVvLCB0aGF0LCBwbGF5ZXJDb25maWcsIHNwZWMuYWRUYWdVcmwpO1xuICAgICAgICBpZighYWRzKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxpc3RlbmVyID0gRXZlbnRzTGlzdGVuZXIoZWxWaWRlbywgc3BlYy5tc2UsIHRoYXQsIGFkcyA/IGFkcy52aWRlb0VuZGVkQ2FsbGJhY2sgOiBudWxsKTtcbiAgICBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXllckNvbmZpZy5nZXRQbGF5YmFja1JhdGUoKTtcblxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAgc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV07XG4gICAgICAgIHNwZWMuZnJhbWVyYXRlID0gc291cmNlLmZyYW1lcmF0ZTtcbiAgICAgICAgaWYoIXNwZWMuZnJhbWVyYXRlKXtcbiAgICAgICAgICAgIC8vaW5pdCB0aW1lY29kZSBtb2RlXG4gICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9uRXh0ZW5kZWRMb2FkKXtcbiAgICAgICAgICAgIG9uRXh0ZW5kZWRMb2FkKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1NvdXJjZSA9IGVsVmlkZW8uc3JjO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xuXG4gICAgICAgICAgICBzb3VyY2VFbGVtZW50LnNyYyA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2VFbGVtZW50LnNyYyAhPT0gcHJldmlvdXNTb3VyY2UpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcblxuICAgICAgICAgICAgICAgIGVsVmlkZW8uc3JjID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgICAgICAvL0Rvbid0IHVzZSB0aGlzLiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDYzNzc4NC9kZXRlY3QtYW4tZXJyb3Itb24taHRtbDUtdmlkZW9cbiAgICAgICAgICAgICAgICAvL2VsVmlkZW8uYXBwZW5kKHNvdXJjZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGNhbGwgbG9hZCBpZiBzcmMgd2FzIG5vdCBzZXQuIGxvYWQoKSB3aWxsIGNhbmNlbCBhbnkgYWN0aXZlIHBsYXkgcHJvbWlzZS5cbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2UgaWYobGFzdFBsYXlQb3NpdGlvbiA9PT0gMCAmJiBlbFZpZGVvLmN1cnJlbnRUaW1lID4gMCl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzcGVjLmN1cnJlbnRTb3VyY2VcbiAgICAgICAgICAgIH0pOyovXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LmdldE5hbWUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XG4gICAgfTtcbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LnNldENhblNlZWsgPSAoY2FuU2VlaykgPT4ge1xuICAgICAgICBzcGVjLmNhblNlZWsgPSBjYW5TZWVrO1xuICAgIH07XG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e1xuICAgICAgICByZXR1cm4gc3BlYy5zZWVraW5nO1xuICAgIH07XG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmcpPT57XG4gICAgICAgIHNwZWMuc2Vla2luZyA9IHNlZWtpbmc7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHNwZWMuc3RhdGU7XG5cbiAgICAgICAgICAgIC8vVG9EbyA6IFRoaXMgaXMgdGVtcG9yYXJ5IGNvZGUuIGF2b2lkIGJhY2tncm91bmQgY29udGVudCBlcnJvci5cbiAgICAgICAgICAgIGlmKHByZXZTdGF0ZSA9PT0gU1RBVEVfQURfUExBWUlORyAmJiAobmV3U3RhdGUgPT09IFNUQVRFX0VSUk9SIHx8IG5ld1N0YXRlID09PSBTVEFURV9JRExFKSApe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZihhZHMgJiYgYWRzLmlzQXV0b1BsYXlTdXBwb3J0Q2hlY2tUaW1lKCkpe1xuICAgICAgICAgICAgICAgIC8vQWRzIGNoZWNrcyBjaGVja0F1dG9wbGF5U3VwcG9ydCgpLlxuICAgICAgICAgICAgICAgIC8vSXQgY2FsbHMgcmVhbCBwbGF5KCkgYW5kIHBhdXNlKCkuXG4gICAgICAgICAgICAgICAgLy9BbmQgdGhlbiB0aGlzIHRyaWdnZXJzIFwicGxheWluZ1wiIGFuZCBcInBhdXNlXCIuXG4gICAgICAgICAgICAgICAgLy9JIHByZXZlbnQgdGhlc2UgcHJvY2Vzcy5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHN3aXRjaChuZXdTdGF0ZSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQ09NUExFVEUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfUEFVU0VEXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0FEX1BBVVNFRCA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9BRF9QQVVTRURcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX1BMQVlJTkdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0FEX1BMQVlJTkcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9BRF9QTEFZSU5HXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzcGVjLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xuICAgICAgICAgICAgICAgICAgICBwcmV2c3RhdGUgOiBwcmV2U3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBzcGVjLnN0YXRlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcbiAgICAgICAgc3BlYy5idWZmZXIgPSBuZXdCdWZmZXI7XG4gICAgfTtcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuYnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgbGV0IGlzTGl2ZSA9IChlbFZpZGVvLmR1cmF0aW9uID09PSBJbmZpbml0eSkgPyB0cnVlIDogc2VwYXJhdGVMaXZlKHNwZWMubXNlKTtcbiAgICAgICAgcmV0dXJuIGlzTGl2ZSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb247XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbFZpZGVvLnZvbHVtZSA9IHZvbHVtZS8xMDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby52b2x1bWUqMTAwO1xuICAgIH07XG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSAhZWxWaWRlby5tdXRlZDtcblxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSBzdGF0ZTtcblxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xuICAgIH07XG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcbiAgICB9O1xuXG4gICAgdGhhdC5wcmVsb2FkID0gKHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuXG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcbiAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbiB8fCAwKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzTXV0ZSgpKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpe1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChzb3VyY2VzKSA9PntcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xuICAgICAgICBfbG9hZChzcGVjLnNvdXJjZXMuc3RhcnR0aW1lIHx8IDApO1xuICAgIH07XG5cbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGlzUGxheWluZ1Byb2Nlc3Mpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlzUGxheWluZ1Byb2Nlc3MgPSB0cnVlO1xuICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgaWYgKCAgKGFkcyAmJiBhZHMuaXNBY3RpdmUoKSkgfHwgKGFkcyAmJiAhYWRzLnN0YXJ0ZWQoKSkgKSB7XG4gICAgICAgICAgICAgICAgYWRzLnBsYXkoKS50aGVuKF8gPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2FkcyBwbGF5IHN1Y2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9hZHMgcGxheSBmYWlsIG1heWJlIGNhdXNlIHVzZXIgaW50ZXJhY3RpdmUgbGVzc1xuICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAvLyBJdCBpcyBub3QgbmVjZXNzYXJ5IG5vIG1vcmUuIE1heWJlIEdvb2dsZSBpbWEgdXBkYXRlZCAzLjMxMC4wXHRvciAzLjMwOS4wLiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9pbnRlcmFjdGl2ZS1tZWRpYS1hZHMvZG9jcy9zZGtzL2h0bWw1L3YzL2hpc3RvcnlcbiAgICAgICAgICAgICAgICBpZihhZHMgJiYgIWRhc2hBdHRhY2hlZFZpZXcpe1xuICAgICAgICAgICAgICAgICAgICAvL0FkIHN0ZWFscyBkYXNoJ3MgdmlkZW8gZWxlbWVudC4gUHV0IGluIHJpZ2h0IHBsYWNlLlxuICAgICAgICAgICAgICAgICAgICBzcGVjLm1zZS5hdHRhY2hWaWV3KGVsVmlkZW8pO1xuICAgICAgICAgICAgICAgICAgICBkYXNoQXR0YWNoZWRWaWV3ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZSA9IGVsVmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5icm93c2VyICA9PT0gXCJTYWZhcmlcIiB8fCBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zICA9PT0gXCJpT1NcIiB8fCBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zICA9PT0gXCJBbmRyb2lkXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DYW4ndCBwbGF5IGJlY2F1c2UgVXNlciBkb2Vzbid0IGFueSBpbnRlcmFjdGlvbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9XYWl0IGZvciBVc2VyIEludGVyYWN0aW9ucy4gKGxpa2UgY2xpY2spXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vTm8gbW9yZSBzZXRUaW1lb3V0IHBsYXlpbmcuXG4gICAgICAgICAgICAgICAgLyppZih0aGF0LmdldE5hbWUoKSA9PT0gUFJPVklERVJfREFTSCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGFkcyAmJiAhZGFzaEF0dGFjaGVkVmlldyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0FkIHN0ZWFscyBkYXNoJ3MgdmlkZW8gZWxlbWVudC4gUHV0IGluIHJpZ2h0IHBsYWNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlYy5tc2UuYXR0YWNoVmlldyhlbFZpZGVvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2hBdHRhY2hlZFZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9JIHdhcyBzdGFydGluZyB0aGUgc3RyZWFtIGJ5IGNhbGxpbmcgcGxheSgpLiAoQXV0b3BsYXkgd2FzIHR1cm5lZCBvZmYpXG4gICAgICAgICAgICAgICAgICAgIC8vdGhlIHZpZGVvIGZyZWV6ZSBmb3IgbGl2ZS4gbGlrZSB0aGlzIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXNoLUluZHVzdHJ5LUZvcnVtL2Rhc2guanMvaXNzdWVzLzIxODRcbiAgICAgICAgICAgICAgICAgICAgLy9NeSBndWVzcyBpcyB1c2VyIGludGVyZWN0aXZlLi4uXG4gICAgICAgICAgICAgICAgICAgIC8vVGhpcyBpcyB0ZW1wb3JhcnkgdW50aWwgaSB3aWxsIGZpbmQgcGVyZmVjdCBzb2x1dGlvbi5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKS5icm93c2VyICA9PT0gXCJTYWZhcmlcIiB8fCBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zICA9PT0gXCJpT1NcIiB8fCBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpLm9zICA9PT0gXCJBbmRyb2lkXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DYW4ndCBwbGF5IGJlY2F1c2UgVXNlciBkb2Vzbid0IGFueSBpbnRlcmFjdGlvbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vV2FpdCBmb3IgVXNlciBJbnRlcmFjdGlvbnMuIChsaWtlIGNsaWNrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSw1MDApO1xuICAgICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgfWVsc2UgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKXtcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQudHJpZ2dlcihQTEFZQkFDS19SQVRFX0NIQU5HRUQsIHtwbGF5YmFja1JhdGUgOiBwbGF5YmFja1JhdGV9KTtcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBpbmRleCA6IGluZGV4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmKHNwZWMuY3VycmVudFNvdXJjZSA9PT0gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XG4gICAgICAgICAgICBpZihzcGVjLnNvdXJjZXMgJiYgc3BlYy5zb3VyY2VzLmxlbmd0aCA+IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAvL3RoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUluZGV4KHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICAvL3BsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAvL3NwZWMuY3VycmVudFF1YWxpdHkgPSBzb3VyY2VJbmRleDtcbiAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcbiAgICAgICAgICAgICAgICBpZihuZWVkUHJvdmlkZXJDaGFuZ2Upe1xuICAgICAgICAgICAgICAgICAgICBfbG9hZChlbFZpZGVvLmN1cnJlbnRUaW1lIHx8IDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGV2ZWxzO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0RnJhbWVyYXRlID0gKGZyYW1lcmF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGUgPSBmcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PntcbiAgICAgICAgbGV0IGZwcyA9IHNwZWMuZnJhbWVyYXRlO1xuICAgICAgICBsZXQgY3VycmVudEZyYW1lcyA9IGVsVmlkZW8uY3VycmVudFRpbWUgKiBmcHM7XG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IChjdXJyZW50RnJhbWVzICsgZnJhbWVDb3VudCkgLyBmcHM7XG4gICAgICAgIG5ld1Bvc2l0aW9uID0gbmV3UG9zaXRpb24gKyAwLjAwMDAxOyAvLyBGSVhFUyBBIFNBRkFSSSBTRUVLIElTU1VFLiBteVZkaWVvLmN1cnJlbnRUaW1lID0gMC4wNCB3b3VsZCBnaXZlIFNNUFRFIDAwOjAwOjAwOjAwIHdoZXJhcyBpdCBzaG91bGQgZ2l2ZSAwMDowMDowMDowMVxuXG4gICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgdGhhdC5zZWVrKG5ld1Bvc2l0aW9uKTtcbiAgICB9O1xuXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc3RvcCgpIFwiKTtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3ByZWxvYWQnKTtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICB3aGlsZSAoZWxWaWRlby5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUNoaWxkKGVsVmlkZW8uZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuc3RvcCgpO1xuICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XG4gICAgICAgIC8vZWxWaWRlby5yZW1vdmUoKTtcblxuICAgICAgICBpZihhZHMpe1xuICAgICAgICAgICAgYWRzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZGVzdHJveSgpIHBsYXllciBzdG9wLCBsaXN0ZW5lciwgZXZlbnQgZGVzdHJvaWVkXCIpO1xuICAgIH07XG5cbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cbiAgICAvLyB1c2UgOiBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7IC4uLiBzdXBlcl9kZXN0cm95KCk7XG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==