/*! OvenPlayerv0.9.62142 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var Listener = function Listener(element, provider, videoEndedCallback) {
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

        var sources = provider.getSources();
        var sourceIndex = provider.getCurrentSource();
        var type = sourceIndex > -1 ? sources[sourceIndex].type : "";
        var metadata = {
            duration: provider.isLive() ? Infinity : elVideo.duration,
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

    var isPlayingProcessing = false;

    if (spec.adTagUrl) {
        ads = (0, _Ads2["default"])(elVideo, that, playerConfig, spec.adTagUrl);
        if (!ads) {
            console.log("Can not load due to google ima for Ads.");
        }
    }

    listener = (0, _Listener2["default"])(elVideo, that, ads ? ads.videoEndedCallback : null);
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

            OvenPlayerConsole.log("Provider : setState()", newState);

            //ToDo : This is temporary code. If main video occur error, player avoid error message on ad playing.
            if (prevState === _constants.STATE_AD_PLAYING && (newState === _constants.STATE_ERROR || newState === _constants.STATE_IDLE)) {
                return false;
            }

            /*
             * 2019-06-13
             * No more necessary this codes.
             * Checking the autoPlay support was using main video element. elVideo.play() -> yes or no??
             * And then that causes triggering play and pause event.
             * And that checking waits for elVideo loaded. Dash load completion time is unknown.
             * Then I changed check method. I make temporary video tag and insert empty video.
             * */
            //if ((prevState === STATE_AD_PLAYING || prevState === STATE_AD_PAUSED ) && (newState === STATE_PAUSED || newState === STATE_PLAYING)) {
            //    return false;
            //Ads checks checkAutoplaySupport(). It calls real play() and pause() to video element.
            //And then that triggers "playing" and "pause".
            //I prevent these process.
            //}

            OvenPlayerConsole.log("Provider : triggerSatatus", newState);

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
    that.isLive = function () {
        return spec.isLive ? true : elVideo.duration === Infinity;
    };
    that.getDuration = function () {
        return that.isLive() ? Infinity : elVideo.duration;
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
        OvenPlayerConsole.log("Provider : play()");
        if (!elVideo) {
            return false;
        }

        //ToDo : Test it thoroughly and remove isPlayingProcessing. Most of the hazards have been removed. a lot of nonblocking play() way -> blocking play()
        if (isPlayingProcessing) {
            return false;
        }

        isPlayingProcessing = true;
        if (that.getState() !== _constants.STATE_PLAYING) {
            if (ads && ads.isActive() || ads && !ads.started()) {
                ads.play().then(function (_) {
                    //ads play success
                    isPlayingProcessing = false;
                    OvenPlayerConsole.log("Provider : ads play success");
                })["catch"](function (error) {
                    //ads play fail maybe cause user interactive less
                    isPlayingProcessing = false;
                    OvenPlayerConsole.log("Provider : ads play fail", error);
                });
            } else {
                var promise = elVideo.play();
                if (promise !== undefined) {
                    promise.then(function () {
                        isPlayingProcessing = false;
                        OvenPlayerConsole.log("Provider : video play success");
                        /*
                        if(mutedPlay){
                            that.trigger(PLAYER_WARNING, {
                                message : WARN_MSG_MUTEDPLAY,
                                timer : 10 * 1000,
                                iconClass : UI_ICONS.volume_mute,
                                onClickCallback : function(){
                                    that.setMute(false);
                                }
                            });
                        }*/
                    })["catch"](function (error) {
                        OvenPlayerConsole.log("Provider : video play error", error.message);

                        isPlayingProcessing = false;
                        /*
                        if(!mutedPlay){
                            that.setMute(true);
                            that.play(true);
                        }
                        */
                    });
                } else {
                    //IE promise is undefinded.
                    OvenPlayerConsole.log("Provider : video play success (ie)");
                    isPlayingProcessing = false;
                }
            }
        }
    };
    that.pause = function () {
        OvenPlayerConsole.log("Provider : pause()");
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
                //that.pause();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsInRvRml4ZWQiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsInRyaWdnZXIiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJzZXRTdGF0ZSIsImxvYWRlZGRhdGEiLCJsb2FkZWRtZXRhZGF0YSIsInNvdXJjZXMiLCJnZXRTb3VyY2VzIiwic291cmNlSW5kZXgiLCJnZXRDdXJyZW50U291cmNlIiwidHlwZSIsIm1ldGFkYXRhIiwiZHVyYXRpb24iLCJpc0xpdmUiLCJJbmZpbml0eSIsIkNPTlRFTlRfTUVUQSIsInBhdXNlIiwiU1RBVEVfRVJST1IiLCJlcnJvciIsImN1cnJlbnRUaW1lIiwiU1RBVEVfUEFVU0VEIiwicGxheSIsInBhdXNlZCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9MT0FESU5HIiwicGxheWluZyIsInRpbWVSYW5nZXMiLCJidWZmZXJlZCIsImxlbmd0aCIsImVuZCIsInNldEJ1ZmZlciIsIkNPTlRFTlRfQlVGRkVSIiwiYnVmZmVyUGVyY2VudCIsInRpbWV1cGRhdGUiLCJpc05hTiIsImlzU2Vla2luZyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldmVudE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVzdHJveSIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsIm9uRXh0ZW5kZWRMb2FkIiwiZGFzaEF0dGFjaGVkVmlldyIsImFkcyIsImxpc3RlbmVyIiwiaXNQbGF5aW5nUHJvY2Vzc2luZyIsImFkVGFnVXJsIiwiY29uc29sZSIsInBsYXliYWNrUmF0ZSIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJjdXJyZW50U291cmNlIiwiZnJhbWVyYXRlIiwic2V0VGltZWNvZGVNb2RlIiwicHJldmlvdXNTb3VyY2UiLCJzcmMiLCJzb3VyY2VFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZmlsZSIsInNvdXJjZUNoYW5nZWQiLCJsb2FkIiwic2VlayIsImlzQXV0b1N0YXJ0IiwiZ2V0TmFtZSIsIm5hbWUiLCJjYW5TZWVrIiwibmV3U3RhdGUiLCJzdGF0ZSIsInByZXZTdGF0ZSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIm5ld3N0YXRlIiwiU1RBVEVfQURfUEFVU0VEIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfU1RBVEUiLCJwcmV2c3RhdGUiLCJuZXdCdWZmZXIiLCJidWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsImdldFBvc2l0aW9uIiwic2V0Vm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0TXV0ZSIsIkNPTlRFTlRfTVVURSIsImdldE11dGUiLCJwcmVsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpc011dGUiLCJzdGFydHRpbWUiLCJpc0FjdGl2ZSIsInN0YXJ0ZWQiLCJ0aGVuIiwicHJvbWlzZSIsInVuZGVmaW5lZCIsIm1lc3NhZ2UiLCJzZXRQbGF5YmFja1JhdGUiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJtYXAiLCJpbmRleCIsImxhYmVsIiwic2V0Q3VycmVudFNvdXJjZSIsIm5lZWRQcm92aWRlckNoYW5nZSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJzZXRTb3VyY2VJbmRleCIsImdldFF1YWxpdHlMZXZlbHMiLCJxdWFsaXR5TGV2ZWxzIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJjdXJyZW50UXVhbGl0eSIsInNldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0RnJhbWVyYXRlIiwic2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImZwcyIsImN1cnJlbnRGcmFtZXMiLCJuZXdQb3NpdGlvbiIsInN0b3AiLCJyZW1vdmVBdHRyaWJ1dGUiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJvZmYiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUE2QkE7O0FBRUE7Ozs7OztBQU9BLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFTQyxPQUFULEVBQWtCQyxRQUFsQixFQUE0QkMsa0JBQTVCLEVBQStDO0FB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QUdILEtBTEQ7QUFNQSxXQUFPcEwsSUFBUDtBQUVILENBOWNELEMsQ0F0QkE7OztxQkFzZWVvRixRIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2YuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEVSUk9SUyxcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUFJPVklERVJfSFRNTDUsXG4gICAgUFJPVklERVJfV0VCUlRDLFxuICAgIFBST1ZJREVSX0RBU0gsXG4gICAgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIGVycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuXG4vKipcbiAqIEBicmllZiAgIFRyaWdnZXIgb24gdmFyaW91cyB2aWRlbyBldmVudHMuXG4gKiBAcGFyYW0gICBleHRlbmRlZEVsZW1lbnQgZXh0ZW5kZWQgbWVkaWEgb2JqZWN0IGJ5IG1zZS5cbiAqIEBwYXJhbSAgIFByb3ZpZGVyIHByb3ZpZGVyICBodG1sNVByb3ZpZGVyXG4gKiAqL1xuXG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxlbWVudCwgcHJvdmlkZXIsIHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgY29uc3QgbG93TGV2ZWxFdmVudHMgPSB7fTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgbG9hZGVkLlwiLGVsZW1lbnQgLHByb3ZpZGVyICk7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuXG4gICAgbGV0IHN0YWxsZWQgPSAtMTtcbiAgICBsZXQgZWxWaWRlbyA9ICBlbGVtZW50O1xuICAgIGNvbnN0IGJldHdlZW4gPSBmdW5jdGlvbiAobnVtLCBtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4obnVtLCBtYXgpLCBtaW4pO1xuICAgIH1cbiAgICBjb25zdCBjb21wYXJlU3RhbGxlZFRpbWUgPSBmdW5jdGlvbihzdGFsbGVkLCBwb3NpdGlvbil7XG4gICAgICAgIC8vT3JpZ2luYWwgQ29kZSBpcyBzdGFsbGVkICE9PSBwb3NpdGlvblxuICAgICAgICAvL0JlY2F1c2UgRGFzaGpzIGlzIHZlcnkgbWV0aWN1bG91cy4gVGhlbiBhbHdheXMgZGlmZnJlbmNlIHN0YWxsZWQgYW5kIHBvc2l0aW9uLlxuICAgICAgICAvL1RoYXQgaXMgd2h5IHdoZW4gSSB1c2UgdG9GaXhlZCgyKS5cbiAgICAgICAgcmV0dXJuIHN0YWxsZWQudG9GaXhlZCgyKSA9PT0gcG9zaXRpb24udG9GaXhlZCgyKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuY2FucGxheSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGNhbiBzdGFydCBwbGF5aW5nIHRoZSBhdWRpby92aWRlb1xuICAgICAgICBwcm92aWRlci5zZXRDYW5TZWVrKHRydWUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSX0ZVTEwpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gY2FucGxheVwiKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuZHVyYXRpb25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgZHVyYXRpb24gb2YgdGhlIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWRcbiAgICAgICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MoKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGR1cmF0aW9uY2hhbmdlXCIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5lbmRlZCA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXlsaXN0IGlzIGVuZGVkXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlbmRlZFwiKTtcblxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9JRExFICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0NPTVBMRVRFKXtcbiAgICAgICAgICAgIGlmKHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgdmlkZW9FbmRlZENhbGxiYWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZSBvZiB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgLy9EbyBub3RoaW5nIEJlY2F1c2UgdGhpcyBjYXVzZXMgY2hhb3MgYnkgbG9hZGVkbWV0YWRhdGEuXG4gICAgICAgIC8qXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IGVsVmlkZW8udmlkZW9XaWR0aFxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCBtZXRhIGRhdGEgZm9yIHRoZSBhdWRpby92aWRlb1xuXG4gICAgICAgIGxldCBzb3VyY2VzID0gcHJvdmlkZXIuZ2V0U291cmNlcygpO1xuICAgICAgICBsZXQgc291cmNlSW5kZXggPSBwcm92aWRlci5nZXRDdXJyZW50U291cmNlKCk7XG4gICAgICAgIGxldCB0eXBlID0gc291cmNlSW5kZXggPiAtMSA/IHNvdXJjZXNbc291cmNlSW5kZXhdLnR5cGUgOiBcIlwiO1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgICAgICAgICBkdXJhdGlvbjogcHJvdmlkZXIuaXNMaXZlKCkgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgdHlwZSA6dHlwZVxuICAgICAgICB9O1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gbG9hZGVkbWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBwYXVzZWRcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQ09NUExFVEUgfHwgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfRVJST1Ipe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uZW5kZWQpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uZXJyb3Ipe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uY3VycmVudFRpbWUgPT09IGVsVmlkZW8uZHVyYXRpb24pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwYXVzZVwiKTtcblxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xuXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gc3RhcnRlZCBvciBpcyBubyBsb25nZXIgcGF1c2VkXG4gICAgICAgIHN0YWxsZWQgPSAtMTtcbiAgICAgICAgaWYgKCFlbFZpZGVvLnBhdXNlZCAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5aW5nID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGlzIHBsYXlpbmcgYWZ0ZXIgaGF2aW5nIGJlZW4gcGF1c2VkIG9yIHN0b3BwZWQgZm9yIGJ1ZmZlcmluZ1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheWluZ1wiKTtcbiAgICAgICAgaWYoc3RhbGxlZCA8IDApe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBpcyBkb3dubG9hZGluZyB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgbGV0IHRpbWVSYW5nZXMgPSBlbFZpZGVvLmJ1ZmZlcmVkO1xuICAgICAgICBpZighdGltZVJhbmdlcyApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbiwgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICBsZXQgYnVmZmVyZWQgPSBiZXR3ZWVuKCAodGltZVJhbmdlcy5sZW5ndGg+IDAgPyB0aW1lUmFuZ2VzLmVuZCh0aW1lUmFuZ2VzLmxlbmd0aCAtIDEpIDogMCApIC8gZHVyYXRpb24sIDAsIDEpO1xuXG4gICAgICAgIHByb3ZpZGVyLnNldEJ1ZmZlcihidWZmZXJlZCoxMDApO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSLCB7XG4gICAgICAgICAgICBidWZmZXJQZXJjZW50OiBidWZmZXJlZCoxMDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogIHBvc2l0aW9uLFxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcHJvZ3Jlc3NcIiwgYnVmZmVyZWQqMTAwKTtcbiAgICB9O1xuXG5cbiAgICBsb3dMZXZlbEV2ZW50cy50aW1ldXBkYXRlID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbjtcbiAgICAgICAgaWYgKGlzTmFOKGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Tb21ldGltZXMgZGFzaCBsaXZlIGdhdmUgdG8gbWUgY3JhenkgZHVyYXRpb24uICg5MDA3MTk5MjU0NzQwOTkxLi4uKSB3aHk/Pz9cbiAgICAgICAgaWYoZHVyYXRpb24gPiA5MDAwMDAwMDAwMDAwMDAwKXsgICAgLy85MDA3MTk5MjU0NzQwOTkxXG4gICAgICAgICAgICBkdXJhdGlvbiA9IEluZmluaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpICYmICFlbFZpZGVvLnBhdXNlZCAmJiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfU1RBTExFRCB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9MT0FESU5HIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcpICYmXG4gICAgICAgICAgICAhY29tcGFyZVN0YWxsZWRUaW1lKHN0YWxsZWQsIHBvc2l0aW9uKSApe1xuICAgICAgICAgICAgc3RhbGxlZCA9IC0xO1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyB8fCBwcm92aWRlci5pc1NlZWtpbmcoKSkge1xuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtpbmcgPSAoKSA9PiB7XG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcodHJ1ZSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVraW5nXCIsIGVsVmlkZW8uY3VycmVudFRpbWUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFSyx7XG4gICAgICAgICAgICBwb3NpdGlvbiA6IGVsVmlkZW8uY3VycmVudFRpbWVcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50cy5zZWVrZWQgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtlZFwiKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyhmYWxzZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLRUQpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5zdGFsbGVkID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc3RhbGxlZFwiKTtcbiAgICAgICAgLy9UaGlzIGNhbGxiYWNrIGRvZXMgbm90IHdvcmsgb24gY2hyb21lLiBUaGlzIGNhbGxzIG9uIEZpcmVmb3ggaW50ZXJtaXR0ZW50LiBUaGVuIGRvIG5vdCB3b3JrIGhlcmUuIHVzaW5nIHdhaXRpbmcgZXZlbnQuXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLndhaXRpbmcgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgdmlkZW8gc3RvcHMgYmVjYXVzZSBpdCBuZWVkcyB0byBidWZmZXIgdGhlIG5leHQgZnJhbWVcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIiwgcHJvdmlkZXIuZ2V0U3RhdGUoKSk7XG4gICAgICAgIGlmKHByb3ZpZGVyLmlzU2Vla2luZygpKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuICAgICAgICB9ZWxzZSBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIHN0YWxsZWQgPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfU1RBTExFRCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMudm9sdW1lY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gdm9sdW1lY2hhbmdlXCIsIE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwge1xuICAgICAgICAgICAgdm9sdW1lOiBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSxcbiAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb2RlID0gKGVsVmlkZW8uZXJyb3IgJiYgZWxWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xuICAgICAgICBsZXQgY29udmVydGVkRXJyb0NvZGUgPSAoe1xuICAgICAgICAgICAgMDogUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgICAgICAgICAxOiBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgICAgICAgICAyOiBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgICAgICAgICAgMzogUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgICAgICAgICAgNDogUExBWUVSX0ZJTEVfRVJST1JcbiAgICAgICAgfVtjb2RlXXx8MCk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVycm9yXCIsIGNvbnZlcnRlZEVycm9Db2RlKTtcbiAgICAgICAgZXJyb3JUcmlnZ2VyKEVSUk9SU1tjb252ZXJ0ZWRFcnJvQ29kZV0sIHByb3ZpZGVyKTtcbiAgICB9O1xuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGVsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XG5cbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjcuLlxuICovXG5pbXBvcnQgQWRzIGZyb20gXCJhcGkvcHJvdmlkZXIvYWRzL0Fkc1wiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXJcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgcGlja0N1cnJlbnRTb3VyY2V9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgV0FSTl9NU0dfTVVURURQTEFZLFxuICAgIFVJX0lDT05TLCBQTEFZRVJfV0FSTklORyxcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLCBTVEFURV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsIFBMQVlFUl9DT01QTEVURSwgUExBWUVSX1BBVVNFLCBQTEFZRVJfUExBWSwgU1RBVEVfQURfUExBWUlORywgU1RBVEVfQURfUEFVU0VELFxuICAgIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBDT05URU5UX1NPVVJDRV9DSEFOR0VELFxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBDb3JlIEZvciBIdG1sNSBWaWRlby5cbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcbiAqIEBwYXJhbSAgIG9uRXh0ZW5kZWRMb2FkIG9uIGxvYWQgaGFuZGxlclxuICogKi9cbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24gKHNwZWMsIHBsYXllckNvbmZpZywgb25FeHRlbmRlZExvYWQpe1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgbG9hZGVkLiBcIik7XG5cbiAgICBsZXQgdGhhdCA9e307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG4gICAgbGV0IGRhc2hBdHRhY2hlZFZpZXcgPSBmYWxzZTtcblxuICAgIGxldCBlbFZpZGVvID0gc3BlYy5lbGVtZW50O1xuICAgIGxldCBhZHMgPSBudWxsLCBsaXN0ZW5lciA9IG51bGwsIHZpZGVvRW5kZWRDYWxsYmFjayA9IG51bGw7XG5cbiAgICBsZXQgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuXG4gICAgaWYoc3BlYy5hZFRhZ1VybCl7XG4gICAgICAgIGFkcyA9IEFkcyhlbFZpZGVvLCB0aGF0LCBwbGF5ZXJDb25maWcsIHNwZWMuYWRUYWdVcmwpO1xuICAgICAgICBpZighYWRzKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihlbFZpZGVvLCB0aGF0LCBhZHMgPyBhZHMudmlkZW9FbmRlZENhbGxiYWNrIDogbnVsbCk7XG4gICAgZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5ZXJDb25maWcuZ2V0UGxheWJhY2tSYXRlKCk7XG5cbiAgICBjb25zdCBfbG9hZCA9IChsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgY29uc3Qgc291cmNlID0gIHNwZWMuc291cmNlc1tzcGVjLmN1cnJlbnRTb3VyY2VdO1xuICAgICAgICBzcGVjLmZyYW1lcmF0ZSA9IHNvdXJjZS5mcmFtZXJhdGU7XG4gICAgICAgIGlmKCFzcGVjLmZyYW1lcmF0ZSl7XG4gICAgICAgICAgICAvL2luaXQgdGltZWNvZGUgbW9kZVxuICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFRpbWVjb2RlTW9kZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZihvbkV4dGVuZGVkTG9hZCl7XG4gICAgICAgICAgICBvbkV4dGVuZGVkTG9hZChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pO1xuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1NvdXJjZSA9IGVsVmlkZW8uc3JjO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xuXG4gICAgICAgICAgICBzb3VyY2VFbGVtZW50LnNyYyA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2VFbGVtZW50LnNyYyAhPT0gcHJldmlvdXNTb3VyY2UpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcblxuICAgICAgICAgICAgICAgIGVsVmlkZW8uc3JjID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgICAgICAvL0Rvbid0IHVzZSB0aGlzLiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDYzNzc4NC9kZXRlY3QtYW4tZXJyb3Itb24taHRtbDUtdmlkZW9cbiAgICAgICAgICAgICAgICAvL2VsVmlkZW8uYXBwZW5kKHNvdXJjZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGNhbGwgbG9hZCBpZiBzcmMgd2FzIG5vdCBzZXQuIGxvYWQoKSB3aWxsIGNhbmNlbCBhbnkgYWN0aXZlIHBsYXkgcHJvbWlzZS5cbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2UgaWYobGFzdFBsYXlQb3NpdGlvbiA9PT0gMCAmJiBlbFZpZGVvLmN1cnJlbnRUaW1lID4gMCl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzcGVjLmN1cnJlbnRTb3VyY2VcbiAgICAgICAgICAgIH0pOyovXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LmdldE5hbWUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XG4gICAgfTtcbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LnNldENhblNlZWsgPSAoY2FuU2VlaykgPT4ge1xuICAgICAgICBzcGVjLmNhblNlZWsgPSBjYW5TZWVrO1xuICAgIH07XG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e1xuICAgICAgICByZXR1cm4gc3BlYy5zZWVraW5nO1xuICAgIH07XG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmcpPT57XG4gICAgICAgIHNwZWMuc2Vla2luZyA9IHNlZWtpbmc7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHNwZWMuc3RhdGU7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogc2V0U3RhdGUoKVwiLCBuZXdTdGF0ZSk7XG5cbiAgICAgICAgICAgIC8vVG9EbyA6IFRoaXMgaXMgdGVtcG9yYXJ5IGNvZGUuIElmIG1haW4gdmlkZW8gb2NjdXIgZXJyb3IsIHBsYXllciBhdm9pZCBlcnJvciBtZXNzYWdlIG9uIGFkIHBsYXlpbmcuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BMQVlJTkcgJiYgKG5ld1N0YXRlID09PSBTVEFURV9FUlJPUiB8fCBuZXdTdGF0ZSA9PT0gU1RBVEVfSURMRSkgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiAyMDE5LTA2LTEzXG4gICAgICAgICAgICAgKiBObyBtb3JlIG5lY2Vzc2FyeSB0aGlzIGNvZGVzLlxuICAgICAgICAgICAgICogQ2hlY2tpbmcgdGhlIGF1dG9QbGF5IHN1cHBvcnQgd2FzIHVzaW5nIG1haW4gdmlkZW8gZWxlbWVudC4gZWxWaWRlby5wbGF5KCkgLT4geWVzIG9yIG5vPz9cbiAgICAgICAgICAgICAqIEFuZCB0aGVuIHRoYXQgY2F1c2VzIHRyaWdnZXJpbmcgcGxheSBhbmQgcGF1c2UgZXZlbnQuXG4gICAgICAgICAgICAgKiBBbmQgdGhhdCBjaGVja2luZyB3YWl0cyBmb3IgZWxWaWRlbyBsb2FkZWQuIERhc2ggbG9hZCBjb21wbGV0aW9uIHRpbWUgaXMgdW5rbm93bi5cbiAgICAgICAgICAgICAqIFRoZW4gSSBjaGFuZ2VkIGNoZWNrIG1ldGhvZC4gSSBtYWtlIHRlbXBvcmFyeSB2aWRlbyB0YWcgYW5kIGluc2VydCBlbXB0eSB2aWRlby5cbiAgICAgICAgICAgICAqICovXG4gICAgICAgICAgICAvL2lmICgocHJldlN0YXRlID09PSBTVEFURV9BRF9QTEFZSU5HIHx8IHByZXZTdGF0ZSA9PT0gU1RBVEVfQURfUEFVU0VEICkgJiYgKG5ld1N0YXRlID09PSBTVEFURV9QQVVTRUQgfHwgbmV3U3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpKSB7XG4gICAgICAgICAgICAvLyAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAvL0FkcyBjaGVja3MgY2hlY2tBdXRvcGxheVN1cHBvcnQoKS4gSXQgY2FsbHMgcmVhbCBwbGF5KCkgYW5kIHBhdXNlKCkgdG8gdmlkZW8gZWxlbWVudC5cbiAgICAgICAgICAgIC8vQW5kIHRoZW4gdGhhdCB0cmlnZ2VycyBcInBsYXlpbmdcIiBhbmQgXCJwYXVzZVwiLlxuICAgICAgICAgICAgLy9JIHByZXZlbnQgdGhlc2UgcHJvY2Vzcy5cbiAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHRyaWdnZXJTYXRhdHVzXCIsIG5ld1N0YXRlKTtcblxuICAgICAgICAgICAgc3dpdGNoIChuZXdTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQ09NUExFVEUgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfUEFVU0VEXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0FEX1BBVVNFRCA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9BRF9QQVVTRURcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX1BMQVlJTkdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9BRF9QTEFZSU5HIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfQURfUExBWUlOR1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcGVjLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1NUQVRFLCB7XG4gICAgICAgICAgICAgICAgcHJldnN0YXRlOiBwcmV2U3RhdGUsXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLnN0YXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XG4gICAgICAgIHNwZWMuYnVmZmVyID0gbmV3QnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmJ1ZmZlcjtcbiAgICB9O1xuICAgIHRoYXQuaXNMaXZlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5pc0xpdmUgPyB0cnVlIDogKGVsVmlkZW8uZHVyYXRpb24gPT09IEluZmluaXR5KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGF0LmlzTGl2ZSgpID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbjtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsVmlkZW8udm9sdW1lID0gdm9sdW1lLzEwMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLnZvbHVtZSoxMDA7XG4gICAgfTtcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9ICFlbFZpZGVvLm11dGVkO1xuXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHN0YXRlO1xuXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xuICAgIH07XG5cbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG5cbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xuICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uIHx8IDApO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNNdXRlKCkpe1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRWb2x1bWUocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcblxuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXMpID0+e1xuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKHNwZWMuc291cmNlcy5zdGFydHRpbWUgfHwgMCk7XG4gICAgfTtcblxuICAgIHRoYXQucGxheSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHBsYXkoKVwiKTtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Ub0RvIDogVGVzdCBpdCB0aG9yb3VnaGx5IGFuZCByZW1vdmUgaXNQbGF5aW5nUHJvY2Vzc2luZy4gTW9zdCBvZiB0aGUgaGF6YXJkcyBoYXZlIGJlZW4gcmVtb3ZlZC4gYSBsb3Qgb2Ygbm9uYmxvY2tpbmcgcGxheSgpIHdheSAtPiBibG9ja2luZyBwbGF5KClcbiAgICAgICAgaWYoaXNQbGF5aW5nUHJvY2Vzc2luZyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gdHJ1ZTtcbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIGlmICggIChhZHMgJiYgYWRzLmlzQWN0aXZlKCkpIHx8IChhZHMgJiYgIWFkcy5zdGFydGVkKCkpICkge1xuICAgICAgICAgICAgICAgIGFkcy5wbGF5KCkudGhlbihfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9hZHMgcGxheSBzdWNjZXNzXG4gICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiBhZHMgcGxheSBzdWNjZXNzXCIpO1xuXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2FkcyBwbGF5IGZhaWwgbWF5YmUgY2F1c2UgdXNlciBpbnRlcmFjdGl2ZSBsZXNzXG4gICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiBhZHMgcGxheSBmYWlsXCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IHN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobXV0ZWRQbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1dBUk5JTkcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA6IFdBUk5fTVNHX01VVEVEUExBWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXIgOiAxMCAqIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25DbGFzcyA6IFVJX0lDT05TLnZvbHVtZV9tdXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrQ2FsbGJhY2sgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogdmlkZW8gcGxheSBlcnJvclwiLCBlcnJvci5tZXNzYWdlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFtdXRlZFBsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgLy9JRSBwcm9taXNlIGlzIHVuZGVmaW5kZWQuXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogdmlkZW8gcGxheSBzdWNjZXNzIChpZSlcIik7XG4gICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHBhdXNlKClcIik7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgfWVsc2UgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKXtcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQudHJpZ2dlcihQTEFZQkFDS19SQVRFX0NIQU5HRUQsIHtwbGF5YmFja1JhdGUgOiBwbGF5YmFja1JhdGV9KTtcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBpbmRleCA6IGluZGV4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmKHNwZWMuY3VycmVudFNvdXJjZSA9PT0gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XG4gICAgICAgICAgICBpZihzcGVjLnNvdXJjZXMgJiYgc3BlYy5zb3VyY2VzLmxlbmd0aCA+IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAvL3RoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUluZGV4KHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICAvL3BsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAvL3NwZWMuY3VycmVudFF1YWxpdHkgPSBzb3VyY2VJbmRleDtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsVmlkZW8uY3VycmVudFRpbWUgfHwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG5cbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRGcmFtZXJhdGUgPSAoZnJhbWVyYXRlKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZSA9IGZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+e1xuICAgICAgICBsZXQgZnBzID0gc3BlYy5mcmFtZXJhdGU7XG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVzID0gZWxWaWRlby5jdXJyZW50VGltZSAqIGZwcztcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXG5cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xuICAgIH07XG5cbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgncHJlbG9hZCcpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIHdoaWxlIChlbFZpZGVvLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlQ2hpbGQoZWxWaWRlby5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5zdG9wKCk7XG4gICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgLy9lbFZpZGVvLnJlbW92ZSgpO1xuXG4gICAgICAgIGlmKGFkcyl7XG4gICAgICAgICAgICBhZHMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG4gICAgfTtcblxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9