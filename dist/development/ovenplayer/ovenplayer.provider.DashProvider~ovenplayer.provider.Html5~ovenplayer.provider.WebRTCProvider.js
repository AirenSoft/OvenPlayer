/*! OvenPlayerv0.9.0 | (c)2020 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.DashProvider~ovenplayer.provider.Html5~ovenplayer.provider.WebRTCProvider"],{

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

        if (provider.getState() !== _constants.STATE_IDLE && provider.getState() !== _constants.STATE_COMPLETE && provider.getState() !== _constants.STATE_ERROR) {
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

        provider.setMetaLoaded();

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

        var sectionEnd = provider.getSources()[provider.getCurrentSource()].sectionEnd;

        if (sectionEnd && position >= sectionEnd && provider.getState() === _constants.STATE_PLAYING) {

            provider.stop();
            provider.setState(_constants.STATE_COMPLETE);
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
            2: _constants.PLAYER_UNKNWON_NETWORK_ERROR,
            3: _constants.PLAYER_UNKNWON_DECODE_ERROR,
            4: _constants.PLAYER_FILE_ERROR
        }[code] || 0;

        OvenPlayerConsole.log("EventListener : on error", convertedErroCode);
        (0, _utils.errorTrigger)(_constants.ERRORS.codes[convertedErroCode], provider);
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

var _Ad = __webpack_require__(/*! api/ads/ima/Ad */ "./src/js/api/ads/ima/Ad.js");

var _Ad2 = _interopRequireDefault(_Ad);

var _Ad3 = __webpack_require__(/*! api/ads/vast/Ad */ "./src/js/api/ads/vast/Ad.js");

var _Ad4 = _interopRequireDefault(_Ad3);

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
/**
 * Created by hoho on 2018. 6. 27..
 */
var Provider = function Provider(spec, playerConfig, onExtendedLoad) {
    OvenPlayerConsole.log("[Provider] loaded. ");

    var that = {};
    (0, _EventEmitter2["default"])(that);

    var dashAttachedView = false;

    var elVideo = spec.element;
    var ads = null,
        listener = null,
        videoEndedCallback = null;

    var isPlayingProcessing = false;

    if (spec.adTagUrl) {
        OvenPlayerConsole.log("[Provider] Ad Client - ", playerConfig.getAdClient());
        if (playerConfig.getAdClient() === _constants.AD_CLIENT_VAST) {
            ads = (0, _Ad4["default"])(elVideo, that, playerConfig, spec.adTagUrl);
        } else {
            ads = (0, _Ad2["default"])(elVideo, that, playerConfig, spec.adTagUrl);
        }

        if (!ads) {
            console.log("Can not load due to google ima for Ads.");
        }
    }

    listener = (0, _Listener2["default"])(elVideo, that, ads ? ads.videoEndedCallback : null);
    elVideo.playbackRate = elVideo.defaultPlaybackRate = playerConfig.getPlaybackRate();

    var _load = function _load(lastPlayPosition) {

        var source = spec.sources[spec.currentSource];
        spec.framerate = source.framerate;

        that.setVolume(playerConfig.getVolume());

        if (!spec.framerate) {
            //init timecode mode
            playerConfig.setTimecodeMode(true);
        }
        if (onExtendedLoad) {
            onExtendedLoad(source, lastPlayPosition);
        } else {

            OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : " + lastPlayPosition);

            var previousSource = elVideo.src;

            // const sourceElement = document.createElement('source');
            // sourceElement.src = source.file;

            var sourceChanged = source.file !== previousSource;
            if (sourceChanged) {

                elVideo.src = source.file;

                //Don't use this. https://stackoverflow.com/questions/30637784/detect-an-error-on-html5-video
                //elVideo.append(sourceElement);

                // Do not call load if src was not set. load() will cancel any active play promise.
                if (previousSource || previousSource === '') {

                    elVideo.load();
                }

                if (lastPlayPosition && lastPlayPosition > 0) {
                    that.seek(lastPlayPosition);
                }
            }

            if (lastPlayPosition > 0) {
                // that.seek(lastPlayPosition);
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
    that.setMetaLoaded = function () {
        spec.isLoaded = true;
    };
    that.metaLoaded = function () {
        return spec.isLoaded;
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

        //Test it thoroughly and remove isPlayingProcessing. Most of the hazards have been removed. a lot of nonblocking play() way -> blocking play()
        // if(isPlayingProcessing){
        //     return false;
        // }

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

            var obj = {
                file: source.file,
                type: source.type,
                label: source.label,
                index: index,
                sectionStart: source.sectionStart,
                sectionEnd: source.sectionEnd,
                gridThumbnail: source.gridThumbnail
            };

            if (source.lowLatency) {
                obj.lowLatency = source.lowLatency;
            }

            return obj;
        });
    };
    that.getCurrentSource = function () {
        return spec.currentSource;
    };
    that.setCurrentSource = function (sourceIndex, needProviderChange) {

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
        isPlayingProcessing = false;
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
            ads = null;
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
};

exports["default"] = Provider;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsInRvRml4ZWQiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsInRyaWdnZXIiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJTVEFURV9FUlJPUiIsInNldFN0YXRlIiwibG9hZGVkZGF0YSIsImxvYWRlZG1ldGFkYXRhIiwic291cmNlcyIsImdldFNvdXJjZXMiLCJzb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2UiLCJ0eXBlIiwibWV0YWRhdGEiLCJkdXJhdGlvbiIsImlzTGl2ZSIsIkluZmluaXR5Iiwic2V0TWV0YUxvYWRlZCIsIkNPTlRFTlRfTUVUQSIsInBhdXNlIiwiZXJyb3IiLCJjdXJyZW50VGltZSIsIlNUQVRFX1BBVVNFRCIsInBsYXkiLCJwYXVzZWQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfTE9BRElORyIsInBsYXlpbmciLCJ0aW1lUmFuZ2VzIiwiYnVmZmVyZWQiLCJsZW5ndGgiLCJlbmQiLCJzZXRCdWZmZXIiLCJDT05URU5UX0JVRkZFUiIsImJ1ZmZlclBlcmNlbnQiLCJ0aW1ldXBkYXRlIiwiaXNOYU4iLCJzZWN0aW9uRW5kIiwic3RvcCIsImlzU2Vla2luZyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJjb2RlcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2ZW50TmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZXN0cm95IiwiUHJvdmlkZXIiLCJzcGVjIiwicGxheWVyQ29uZmlnIiwib25FeHRlbmRlZExvYWQiLCJkYXNoQXR0YWNoZWRWaWV3IiwiYWRzIiwibGlzdGVuZXIiLCJpc1BsYXlpbmdQcm9jZXNzaW5nIiwiYWRUYWdVcmwiLCJnZXRBZENsaWVudCIsIkFEX0NMSUVOVF9WQVNUIiwiY29uc29sZSIsInBsYXliYWNrUmF0ZSIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJjdXJyZW50U291cmNlIiwiZnJhbWVyYXRlIiwic2V0Vm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0VGltZWNvZGVNb2RlIiwicHJldmlvdXNTb3VyY2UiLCJzcmMiLCJzb3VyY2VDaGFuZ2VkIiwiZmlsZSIsImxvYWQiLCJzZWVrIiwiaXNBdXRvU3RhcnQiLCJnZXROYW1lIiwibmFtZSIsImNhblNlZWsiLCJpc0xvYWRlZCIsIm1ldGFMb2FkZWQiLCJuZXdTdGF0ZSIsInN0YXRlIiwicHJldlN0YXRlIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwibmV3c3RhdGUiLCJTVEFURV9BRF9QQVVTRUQiLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld0J1ZmZlciIsImJ1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJzZXRNdXRlIiwiQ09OVEVOVF9NVVRFIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImlzTXV0ZSIsInN0YXJ0dGltZSIsImlzQWN0aXZlIiwic3RhcnRlZCIsInRoZW4iLCJwcm9taXNlIiwidW5kZWZpbmVkIiwibWVzc2FnZSIsInNldFBsYXliYWNrUmF0ZSIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIm1hcCIsImluZGV4Iiwib2JqIiwibGFiZWwiLCJzZWN0aW9uU3RhcnQiLCJncmlkVGh1bWJuYWlsIiwibG93TGF0ZW5jeSIsInNldEN1cnJlbnRTb3VyY2UiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwic2V0U291cmNlSW5kZXgiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldEZyYW1lcmF0ZSIsInNldEZyYW1lcmF0ZSIsInNlZWtGcmFtZSIsImZyYW1lQ291bnQiLCJmcHMiLCJjdXJyZW50RnJhbWVzIiwibmV3UG9zaXRpb24iLCJyZW1vdmVBdHRyaWJ1dGUiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJvZmYiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUE2QkE7O0FBRUE7Ozs7OztBQU9BLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFTQyxPQUFULEVBQWtCQyxRQUFsQixFQUE0QkMsa0JBQTVCLEVBQStDO0FBQzVELFFBQU1DLGlCQUFpQixFQUF2Qjs7QUFFQUMsc0JBQWtCQyxHQUFsQixDQUFzQix1QkFBdEIsRUFBOENMLE9BQTlDLEVBQXVEQyxRQUF2RDtBQUNBLFFBQU1LLE9BQU8sRUFBYjs7QUFFQSxRQUFJQyxVQUFVLENBQUMsQ0FBZjtBQUNBLFFBQUlDLFVBQVdSLE9BQWY7QUFDQSxRQUFNUyxVQUFVLFNBQVZBLE9BQVUsQ0FBVUMsR0FBVixFQUFlQyxHQUFmLEVBQW9CQyxHQUFwQixFQUF5QjtBQUNyQyxlQUFPQyxLQUFLRCxHQUFMLENBQVNDLEtBQUtGLEdBQUwsQ0FBU0QsR0FBVCxFQUFjRSxHQUFkLENBQVQsRUFBNkJELEdBQTdCLENBQVA7QUFDSCxLQUZEO0FBR0EsUUFBTUcscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBU1AsT0FBVCxFQUFrQlEsUUFBbEIsRUFBMkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsZUFBT1IsUUFBUVMsT0FBUixDQUFnQixDQUFoQixNQUF1QkQsU0FBU0MsT0FBVCxDQUFpQixDQUFqQixDQUE5QjtBQUNILEtBTEQ7O0FBT0FiLG1CQUFlYyxPQUFmLEdBQXlCLFlBQU07QUFDM0I7QUFDQWhCLGlCQUFTaUIsVUFBVCxDQUFvQixJQUFwQjtBQUNBakIsaUJBQVNrQixPQUFULENBQWlCQyw4QkFBakI7QUFDQWhCLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCO0FBQ0gsS0FMRDs7QUFPQUYsbUJBQWVrQixjQUFmLEdBQWdDLFlBQU07QUFDbEM7QUFDQWxCLHVCQUFlbUIsUUFBZjtBQUNBbEIsMEJBQWtCQyxHQUFsQixDQUFzQixtQ0FBdEI7QUFDSCxLQUpEOztBQU1BRixtQkFBZW9CLEtBQWYsR0FBdUIsWUFBTTtBQUN6QjtBQUNBbkIsMEJBQWtCQyxHQUFsQixDQUFzQiwwQkFBdEI7O0FBRUEsWUFBR0osU0FBU3VCLFFBQVQsT0FBd0JDLHFCQUF4QixJQUFzQ3hCLFNBQVN1QixRQUFULE9BQXdCRSx5QkFBOUQsSUFBZ0Z6QixTQUFTdUIsUUFBVCxPQUF3Qkcsc0JBQTNHLEVBQXdIO0FBQ3BILGdCQUFHekIsa0JBQUgsRUFBc0I7QUFDbEJBLG1DQUFtQixZQUFVO0FBQ3pCRCw2QkFBUzJCLFFBQVQsQ0FBa0JGLHlCQUFsQjtBQUNILGlCQUZEO0FBR0gsYUFKRCxNQUlLO0FBQ0R6Qix5QkFBUzJCLFFBQVQsQ0FBa0JGLHlCQUFsQjtBQUNIO0FBQ0o7QUFDSixLQWJEOztBQWVBdkIsbUJBQWUwQixVQUFmLEdBQTRCLFlBQU07QUFDOUI7QUFDQTtBQUNBOzs7Ozs7O0FBT0gsS0FWRDs7QUFZQTFCLG1CQUFlMkIsY0FBZixHQUFnQyxZQUFNO0FBQ2xDOztBQUVBLFlBQUlDLFVBQVU5QixTQUFTK0IsVUFBVCxFQUFkO0FBQ0EsWUFBSUMsY0FBY2hDLFNBQVNpQyxnQkFBVCxFQUFsQjtBQUNBLFlBQUlDLE9BQU9GLGNBQWMsQ0FBQyxDQUFmLEdBQW1CRixRQUFRRSxXQUFSLEVBQXFCRSxJQUF4QyxHQUErQyxFQUExRDtBQUNBLFlBQUlDLFdBQVc7QUFDWEMsc0JBQVVwQyxTQUFTcUMsTUFBVCxLQUFxQkMsUUFBckIsR0FBZ0MvQixRQUFRNkIsUUFEdkM7QUFFWEYsa0JBQU1BO0FBRkssU0FBZjs7QUFLQWxDLGlCQUFTdUMsYUFBVDs7QUFFQXBDLDBCQUFrQkMsR0FBbEIsQ0FBc0IsbUNBQXRCLEVBQTJEK0IsUUFBM0Q7QUFDQW5DLGlCQUFTa0IsT0FBVCxDQUFpQnNCLHVCQUFqQixFQUErQkwsUUFBL0I7QUFDSCxLQWZEOztBQWlCQWpDLG1CQUFldUMsS0FBZixHQUF1QixZQUFNO0FBQ3pCO0FBQ0EsWUFBR3pDLFNBQVN1QixRQUFULE9BQXdCRSx5QkFBeEIsSUFBMEN6QixTQUFTdUIsUUFBVCxPQUF3Qkcsc0JBQXJFLEVBQWlGO0FBQzdFLG1CQUFPLEtBQVA7QUFDSDtBQUNELFlBQUduQixRQUFRZSxLQUFYLEVBQWlCO0FBQ2IsbUJBQU8sS0FBUDtBQUNIO0FBQ0QsWUFBR2YsUUFBUW1DLEtBQVgsRUFBaUI7QUFDYixtQkFBTyxLQUFQO0FBQ0g7QUFDRCxZQUFHbkMsUUFBUW9DLFdBQVIsS0FBd0JwQyxRQUFRNkIsUUFBbkMsRUFBNEM7QUFDeEMsbUJBQU8sS0FBUDtBQUNIO0FBQ0RqQywwQkFBa0JDLEdBQWxCLENBQXNCLDBCQUF0Qjs7QUFFQUosaUJBQVMyQixRQUFULENBQWtCaUIsdUJBQWxCO0FBQ0gsS0FqQkQ7O0FBbUJBMUMsbUJBQWUyQyxJQUFmLEdBQXNCLFlBQU07O0FBRXhCO0FBQ0F2QyxrQkFBVSxDQUFDLENBQVg7QUFDQSxZQUFJLENBQUNDLFFBQVF1QyxNQUFULElBQW1COUMsU0FBU3VCLFFBQVQsT0FBd0J3Qix3QkFBL0MsRUFBOEQ7QUFDMUQvQyxxQkFBUzJCLFFBQVQsQ0FBa0JxQix3QkFBbEI7QUFDSDtBQUNKLEtBUEQ7O0FBU0E5QyxtQkFBZStDLE9BQWYsR0FBeUIsWUFBTTtBQUMzQjtBQUNBOUMsMEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7QUFDQSxZQUFHRSxVQUFVLENBQWIsRUFBZTtBQUNYTixxQkFBUzJCLFFBQVQsQ0FBa0JvQix3QkFBbEI7QUFDSDtBQUNKLEtBTkQ7O0FBUUE3QyxtQkFBZW1CLFFBQWYsR0FBMEIsWUFBTTtBQUM1QjtBQUNBLFlBQUk2QixhQUFhM0MsUUFBUTRDLFFBQXpCO0FBQ0EsWUFBRyxDQUFDRCxVQUFKLEVBQWdCO0FBQ1osbUJBQU8sS0FBUDtBQUNIOztBQUVELFlBQUlkLFdBQVc3QixRQUFRNkIsUUFBdkI7QUFBQSxZQUFpQ3RCLFdBQVdQLFFBQVFvQyxXQUFwRDtBQUNBLFlBQUlRLFdBQVczQyxRQUFTLENBQUMwQyxXQUFXRSxNQUFYLEdBQW1CLENBQW5CLEdBQXVCRixXQUFXRyxHQUFYLENBQWVILFdBQVdFLE1BQVgsR0FBb0IsQ0FBbkMsQ0FBdkIsR0FBK0QsQ0FBaEUsSUFBc0VoQixRQUEvRSxFQUF5RixDQUF6RixFQUE0RixDQUE1RixDQUFmOztBQUVBcEMsaUJBQVNzRCxTQUFULENBQW1CSCxXQUFTLEdBQTVCO0FBQ0FuRCxpQkFBU2tCLE9BQVQsQ0FBaUJxQyx5QkFBakIsRUFBaUM7QUFDN0JDLDJCQUFlTCxXQUFTLEdBREs7QUFFN0JyQyxzQkFBV0EsUUFGa0I7QUFHN0JzQixzQkFBVUE7QUFIbUIsU0FBakM7QUFLQWpDLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNkJBQXRCLEVBQXFEK0MsV0FBUyxHQUE5RDtBQUNILEtBakJEOztBQW9CQWpELG1CQUFldUQsVUFBZixHQUE0QixZQUFNO0FBQzlCO0FBQ0EsWUFBSTNDLFdBQVdQLFFBQVFvQyxXQUF2QjtBQUNBLFlBQUlQLFdBQVc3QixRQUFRNkIsUUFBdkI7QUFDQSxZQUFJc0IsTUFBTXRCLFFBQU4sQ0FBSixFQUFxQjtBQUNqQjtBQUNIOztBQUVELFlBQUl1QixhQUFhM0QsU0FBUytCLFVBQVQsR0FBc0IvQixTQUFTaUMsZ0JBQVQsRUFBdEIsRUFBbUQwQixVQUFwRTs7QUFFQSxZQUFJQSxjQUFjN0MsWUFBWTZDLFVBQTFCLElBQXdDM0QsU0FBU3VCLFFBQVQsT0FBd0J3Qix3QkFBcEUsRUFBbUY7O0FBRS9FL0MscUJBQVM0RCxJQUFUO0FBQ0E1RCxxQkFBUzJCLFFBQVQsQ0FBa0JGLHlCQUFsQjtBQUNBO0FBQ0g7O0FBRUQ7QUFDQSxZQUFHVyxXQUFXLGdCQUFkLEVBQStCO0FBQUs7QUFDaENBLHVCQUFXRSxRQUFYO0FBQ0g7O0FBRUQsWUFBRyxDQUFDdEMsU0FBUzZELFNBQVQsRUFBRCxJQUF5QixDQUFDdEQsUUFBUXVDLE1BQWxDLEtBQTZDOUMsU0FBU3VCLFFBQVQsT0FBd0J1Qyx3QkFBeEIsSUFBeUM5RCxTQUFTdUIsUUFBVCxPQUF3QnlCLHdCQUFqRSxJQUFrRmhELFNBQVN1QixRQUFULE9BQXdCd0MsMkJBQXZKLEtBQ0MsQ0FBQ2xELG1CQUFtQlAsT0FBbkIsRUFBNEJRLFFBQTVCLENBREwsRUFDNEM7QUFDeENSLHNCQUFVLENBQUMsQ0FBWDtBQUNBTixxQkFBUzJCLFFBQVQsQ0FBa0JvQix3QkFBbEI7QUFDSDs7QUFFRCxZQUFJL0MsU0FBU3VCLFFBQVQsT0FBd0J3Qix3QkFBeEIsSUFBeUMvQyxTQUFTNkQsU0FBVCxFQUE3QyxFQUFtRTtBQUMvRDdELHFCQUFTa0IsT0FBVCxDQUFpQjhDLHVCQUFqQixFQUErQjtBQUMzQmxELDBCQUFVQSxRQURpQjtBQUUzQnNCLDBCQUFVQTtBQUZpQixhQUEvQjtBQUlIO0FBRUosS0FuQ0Q7O0FBcUNBbEMsbUJBQWUrRCxPQUFmLEdBQXlCLFlBQU07QUFDM0JqRSxpQkFBU2tFLFVBQVQsQ0FBb0IsSUFBcEI7QUFDQS9ELDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCLEVBQW9ERyxRQUFRb0MsV0FBNUQ7QUFDQTNDLGlCQUFTa0IsT0FBVCxDQUFpQmlELHVCQUFqQixFQUE4QjtBQUMxQnJELHNCQUFXUCxRQUFRb0M7QUFETyxTQUE5QjtBQUdILEtBTkQ7QUFPQXpDLG1CQUFla0UsTUFBZixHQUF3QixZQUFNO0FBQzFCLFlBQUcsQ0FBQ3BFLFNBQVM2RCxTQUFULEVBQUosRUFBeUI7QUFDckI7QUFDSDtBQUNEMUQsMEJBQWtCQyxHQUFsQixDQUFzQiwyQkFBdEI7QUFDQUosaUJBQVNrRSxVQUFULENBQW9CLEtBQXBCO0FBQ0FsRSxpQkFBU2tCLE9BQVQsQ0FBaUJtRCx5QkFBakI7QUFDSCxLQVBEOztBQVNBbkUsbUJBQWVJLE9BQWYsR0FBeUIsWUFBTTtBQUMzQkgsMEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7QUFDQTtBQUNILEtBSEQ7O0FBS0FGLG1CQUFlb0UsT0FBZixHQUF5QixZQUFNO0FBQzNCO0FBQ0FuRSwwQkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QixFQUFvREosU0FBU3VCLFFBQVQsRUFBcEQ7QUFDQSxZQUFHdkIsU0FBUzZELFNBQVQsRUFBSCxFQUF3QjtBQUNwQjdELHFCQUFTMkIsUUFBVCxDQUFrQnFCLHdCQUFsQjtBQUNILFNBRkQsTUFFTSxJQUFHaEQsU0FBU3VCLFFBQVQsT0FBd0J3Qix3QkFBM0IsRUFBeUM7QUFDM0N6QyxzQkFBVUMsUUFBUW9DLFdBQWxCO0FBQ0EzQyxxQkFBUzJCLFFBQVQsQ0FBa0JtQyx3QkFBbEI7QUFDSDtBQUNKLEtBVEQ7O0FBV0E1RCxtQkFBZXFFLFlBQWYsR0FBOEIsWUFBTTtBQUNoQ3BFLDBCQUFrQkMsR0FBbEIsQ0FBc0IsaUNBQXRCLEVBQXlEUSxLQUFLNEQsS0FBTCxDQUFXakUsUUFBUWtFLE1BQVIsR0FBaUIsR0FBNUIsQ0FBekQ7QUFDQXpFLGlCQUFTa0IsT0FBVCxDQUFpQndELHlCQUFqQixFQUFpQztBQUM3QkQsb0JBQVE3RCxLQUFLNEQsS0FBTCxDQUFXakUsUUFBUWtFLE1BQVIsR0FBaUIsR0FBNUIsQ0FEcUI7QUFFN0JFLGtCQUFNcEUsUUFBUXFFO0FBRmUsU0FBakM7QUFJSCxLQU5EOztBQVFBMUUsbUJBQWV3QyxLQUFmLEdBQXVCLFlBQU07QUFDekIsWUFBTW1DLE9BQVF0RSxRQUFRbUMsS0FBUixJQUFpQm5DLFFBQVFtQyxLQUFSLENBQWNtQyxJQUFoQyxJQUF5QyxDQUF0RDtBQUNBLFlBQUlDLG9CQUFxQjtBQUNyQixlQUFHQywrQkFEa0I7QUFFckIsZUFBR0MseUNBRmtCO0FBR3JCLGVBQUdDLHVDQUhrQjtBQUlyQixlQUFHQyxzQ0FKa0I7QUFLckIsZUFBR0M7QUFMa0IsVUFNdkJOLElBTnVCLEtBTWhCLENBTlQ7O0FBUUExRSwwQkFBa0JDLEdBQWxCLENBQXNCLDBCQUF0QixFQUFrRDBFLGlCQUFsRDtBQUNBLGlDQUFhTSxrQkFBT0MsS0FBUCxDQUFhUCxpQkFBYixDQUFiLEVBQThDOUUsUUFBOUM7QUFDSCxLQVpEOztBQWNBc0YsV0FBT0MsSUFBUCxDQUFZckYsY0FBWixFQUE0QnNGLE9BQTVCLENBQW9DLHFCQUFhO0FBQzdDakYsZ0JBQVFrRixtQkFBUixDQUE0QkMsU0FBNUIsRUFBdUN4RixlQUFld0YsU0FBZixDQUF2QztBQUNBbkYsZ0JBQVFvRixnQkFBUixDQUF5QkQsU0FBekIsRUFBb0N4RixlQUFld0YsU0FBZixDQUFwQztBQUNILEtBSEQ7O0FBS0FyRixTQUFLdUYsT0FBTCxHQUFlLFlBQUs7QUFDaEJ6RiwwQkFBa0JDLEdBQWxCLENBQXNCLDJCQUF0Qjs7QUFFQWtGLGVBQU9DLElBQVAsQ0FBWXJGLGNBQVosRUFBNEJzRixPQUE1QixDQUFvQyxxQkFBYTtBQUM3Q2pGLG9CQUFRa0YsbUJBQVIsQ0FBNEJDLFNBQTVCLEVBQXVDeEYsZUFBZXdGLFNBQWYsQ0FBdkM7QUFDSCxTQUZEO0FBR0gsS0FORDtBQU9BLFdBQU9yRixJQUFQO0FBQ0gsQ0EzT0Q7O3FCQTZPZVAsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaFJmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFVQTs7Ozs7O0FBbEJBOzs7QUF3QkEsSUFBTStGLFdBQVcsU0FBWEEsUUFBVyxDQUFVQyxJQUFWLEVBQWdCQyxZQUFoQixFQUE4QkMsY0FBOUIsRUFBNkM7QUFDMUQ3RixzQkFBa0JDLEdBQWxCLENBQXNCLHFCQUF0Qjs7QUFFQSxRQUFJQyxPQUFNLEVBQVY7QUFDQSxtQ0FBYUEsSUFBYjs7QUFFQSxRQUFJNEYsbUJBQW1CLEtBQXZCOztBQUVBLFFBQUkxRixVQUFVdUYsS0FBSy9GLE9BQW5CO0FBQ0EsUUFBSW1HLE1BQU0sSUFBVjtBQUFBLFFBQWdCQyxXQUFXLElBQTNCO0FBQUEsUUFBaUNsRyxxQkFBcUIsSUFBdEQ7O0FBRUEsUUFBSW1HLHNCQUFzQixLQUExQjs7QUFFQSxRQUFHTixLQUFLTyxRQUFSLEVBQWlCO0FBQ2JsRywwQkFBa0JDLEdBQWxCLENBQXNCLHlCQUF0QixFQUFpRDJGLGFBQWFPLFdBQWIsRUFBakQ7QUFDQSxZQUFHUCxhQUFhTyxXQUFiLE9BQStCQyx5QkFBbEMsRUFBaUQ7QUFDN0NMLGtCQUFNLHFCQUFLM0YsT0FBTCxFQUFjRixJQUFkLEVBQW9CMEYsWUFBcEIsRUFBa0NELEtBQUtPLFFBQXZDLENBQU47QUFDSCxTQUZELE1BRUs7QUFDREgsa0JBQU0scUJBQUkzRixPQUFKLEVBQWFGLElBQWIsRUFBbUIwRixZQUFuQixFQUFpQ0QsS0FBS08sUUFBdEMsQ0FBTjtBQUNIOztBQUVELFlBQUcsQ0FBQ0gsR0FBSixFQUFRO0FBQ0pNLG9CQUFRcEcsR0FBUixDQUFZLHlDQUFaO0FBQ0g7QUFDSjs7QUFFRCtGLGVBQVcsMkJBQWU1RixPQUFmLEVBQXdCRixJQUF4QixFQUE4QjZGLE1BQU1BLElBQUlqRyxrQkFBVixHQUErQixJQUE3RCxDQUFYO0FBQ0FNLFlBQVFrRyxZQUFSLEdBQXVCbEcsUUFBUW1HLG1CQUFSLEdBQThCWCxhQUFhWSxlQUFiLEVBQXJEOztBQUVBLFFBQU1DLFFBQVEsU0FBUkEsS0FBUSxDQUFDQyxnQkFBRCxFQUFxQjs7QUFFL0IsWUFBTUMsU0FBVWhCLEtBQUtoRSxPQUFMLENBQWFnRSxLQUFLaUIsYUFBbEIsQ0FBaEI7QUFDQWpCLGFBQUtrQixTQUFMLEdBQWlCRixPQUFPRSxTQUF4Qjs7QUFFQTNHLGFBQUs0RyxTQUFMLENBQWVsQixhQUFhbUIsU0FBYixFQUFmOztBQUVBLFlBQUcsQ0FBQ3BCLEtBQUtrQixTQUFULEVBQW1CO0FBQ2Y7QUFDQWpCLHlCQUFhb0IsZUFBYixDQUE2QixJQUE3QjtBQUNIO0FBQ0QsWUFBR25CLGNBQUgsRUFBa0I7QUFDZEEsMkJBQWVjLE1BQWYsRUFBdUJELGdCQUF2QjtBQUVILFNBSEQsTUFHSzs7QUFFRDFHLDhCQUFrQkMsR0FBbEIsQ0FBc0Isa0JBQXRCLEVBQTBDMEcsTUFBMUMsRUFBa0Qsd0JBQXVCRCxnQkFBekU7O0FBRUEsZ0JBQUlPLGlCQUFpQjdHLFFBQVE4RyxHQUE3Qjs7QUFFQTtBQUNBOztBQUVBLGdCQUFNQyxnQkFBaUJSLE9BQU9TLElBQVAsS0FBZ0JILGNBQXZDO0FBQ0EsZ0JBQUlFLGFBQUosRUFBbUI7O0FBRWYvRyx3QkFBUThHLEdBQVIsR0FBY1AsT0FBT1MsSUFBckI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9CQUFJSCxrQkFBa0JBLG1CQUFtQixFQUF6QyxFQUE2Qzs7QUFFekM3Ryw0QkFBUWlILElBQVI7QUFDSDs7QUFHRCxvQkFBR1gsb0JBQW9CQSxtQkFBbUIsQ0FBMUMsRUFBNEM7QUFDeEN4Ryx5QkFBS29ILElBQUwsQ0FBVVosZ0JBQVY7QUFDSDtBQUVKOztBQUVELGdCQUFHQSxtQkFBbUIsQ0FBdEIsRUFBd0I7QUFDcEI7QUFDQSxvQkFBRyxDQUFDZCxhQUFhMkIsV0FBYixFQUFKLEVBQStCO0FBQzNCckgseUJBQUt3QyxJQUFMO0FBQ0g7QUFFSjs7QUFFRCxnQkFBR2tELGFBQWEyQixXQUFiLEVBQUgsRUFBOEI7O0FBRTFCckgscUJBQUt3QyxJQUFMO0FBQ0g7QUFDRDs7O0FBR0g7QUFFSixLQTdERDs7QUErREF4QyxTQUFLc0gsT0FBTCxHQUFlLFlBQU07QUFDakIsZUFBTzdCLEtBQUs4QixJQUFaO0FBQ0gsS0FGRDtBQUdBdkgsU0FBS3dILE9BQUwsR0FBZSxZQUFNO0FBQ2pCLGVBQU8vQixLQUFLK0IsT0FBWjtBQUNILEtBRkQ7QUFHQXhILFNBQUtZLFVBQUwsR0FBa0IsVUFBQzRHLE9BQUQsRUFBYTtBQUMzQi9CLGFBQUsrQixPQUFMLEdBQWVBLE9BQWY7QUFDSCxLQUZEO0FBR0F4SCxTQUFLd0QsU0FBTCxHQUFpQixZQUFJO0FBQ2pCLGVBQU9pQyxLQUFLN0IsT0FBWjtBQUNILEtBRkQ7QUFHQTVELFNBQUs2RCxVQUFMLEdBQWtCLFVBQUNELE9BQUQsRUFBVztBQUN6QjZCLGFBQUs3QixPQUFMLEdBQWVBLE9BQWY7QUFDSCxLQUZEO0FBR0E1RCxTQUFLa0MsYUFBTCxHQUFxQixZQUFNO0FBQ3ZCdUQsYUFBS2dDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDSCxLQUZEO0FBR0F6SCxTQUFLMEgsVUFBTCxHQUFrQixZQUFNO0FBQ3BCLGVBQU9qQyxLQUFLZ0MsUUFBWjtBQUNILEtBRkQ7O0FBSUF6SCxTQUFLc0IsUUFBTCxHQUFnQixVQUFDcUcsUUFBRCxFQUFjO0FBQzFCLFlBQUdsQyxLQUFLbUMsS0FBTCxLQUFlRCxRQUFsQixFQUEyQjtBQUN2QixnQkFBSUUsWUFBWXBDLEtBQUttQyxLQUFyQjs7QUFFQTlILDhCQUFrQkMsR0FBbEIsQ0FBc0IsdUJBQXRCLEVBQStDNEgsUUFBL0M7O0FBRUE7QUFDQSxnQkFBR0UsY0FBY25FLDJCQUFkLEtBQW1DaUUsYUFBYXRHLHNCQUFiLElBQTRCc0csYUFBYXhHLHFCQUE1RSxDQUFILEVBQTRGO0FBQ3hGLHVCQUFPLEtBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFyQiw4QkFBa0JDLEdBQWxCLENBQXNCLDJCQUF0QixFQUFtRDRILFFBQW5EOztBQUVBLG9CQUFRQSxRQUFSO0FBQ0kscUJBQUt2Ryx5QkFBTDtBQUNJcEIseUJBQUthLE9BQUwsQ0FBYWlILDBCQUFiO0FBQ0E7QUFDSixxQkFBS3ZGLHVCQUFMO0FBQ0l2Qyx5QkFBS2EsT0FBTCxDQUFha0gsdUJBQWIsRUFBMkI7QUFDdkJGLG1DQUFXcEMsS0FBS21DLEtBRE87QUFFdkJJLGtDQUFVekY7QUFGYSxxQkFBM0I7QUFJQTtBQUNKLHFCQUFLMEYsMEJBQUw7QUFDSWpJLHlCQUFLYSxPQUFMLENBQWFrSCx1QkFBYixFQUEyQjtBQUN2QkYsbUNBQVdwQyxLQUFLbUMsS0FETztBQUV2Qkksa0NBQVVDO0FBRmEscUJBQTNCO0FBSUE7QUFDSixxQkFBS3ZGLHdCQUFMO0FBQ0kxQyx5QkFBS2EsT0FBTCxDQUFhcUgsc0JBQWIsRUFBMEI7QUFDdEJMLG1DQUFXcEMsS0FBS21DLEtBRE07QUFFdEJJLGtDQUFVdEY7QUFGWSxxQkFBMUI7QUFJSixxQkFBS2dCLDJCQUFMO0FBQ0kxRCx5QkFBS2EsT0FBTCxDQUFhcUgsc0JBQWIsRUFBMEI7QUFDdEJMLG1DQUFXcEMsS0FBS21DLEtBRE07QUFFdEJJLGtDQUFVdEU7QUFGWSxxQkFBMUI7QUFJQTtBQTFCUjtBQTRCQStCLGlCQUFLbUMsS0FBTCxHQUFhRCxRQUFiO0FBQ0EzSCxpQkFBS2EsT0FBTCxDQUFhc0gsdUJBQWIsRUFBMkI7QUFDdkJDLDJCQUFXUCxTQURZO0FBRXZCRywwQkFBVXZDLEtBQUttQztBQUZRLGFBQTNCO0FBTUg7QUFDSixLQWhFRDs7QUFrRUE1SCxTQUFLa0IsUUFBTCxHQUFnQixZQUFLO0FBQ2pCLGVBQU91RSxLQUFLbUMsS0FBWjtBQUNILEtBRkQ7QUFHQTVILFNBQUtpRCxTQUFMLEdBQWlCLFVBQUNvRixTQUFELEVBQWU7QUFDNUI1QyxhQUFLNkMsTUFBTCxHQUFjRCxTQUFkO0FBQ0gsS0FGRDtBQUdBckksU0FBS3VJLFNBQUwsR0FBaUIsWUFBTTtBQUNuQixlQUFPOUMsS0FBSzZDLE1BQVo7QUFDSCxLQUZEO0FBR0F0SSxTQUFLZ0MsTUFBTCxHQUFjLFlBQU07QUFDaEIsZUFBT3lELEtBQUt6RCxNQUFMLEdBQWMsSUFBZCxHQUFzQjlCLFFBQVE2QixRQUFSLEtBQXFCRSxRQUFsRDtBQUNILEtBRkQ7QUFHQWpDLFNBQUt3SSxXQUFMLEdBQW1CLFlBQU07QUFDckIsZUFBT3hJLEtBQUtnQyxNQUFMLEtBQWlCQyxRQUFqQixHQUE0Qi9CLFFBQVE2QixRQUEzQztBQUNILEtBRkQ7QUFHQS9CLFNBQUt5SSxXQUFMLEdBQW1CLFlBQU07QUFDckIsWUFBRyxDQUFDdkksT0FBSixFQUFZO0FBQ1IsbUJBQU8sQ0FBUDtBQUNIO0FBQ0QsZUFBT0EsUUFBUW9DLFdBQWY7QUFDSCxLQUxEO0FBTUF0QyxTQUFLNEcsU0FBTCxHQUFpQixVQUFDeEMsTUFBRCxFQUFXO0FBQ3hCLFlBQUcsQ0FBQ2xFLE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDtBQUNEQSxnQkFBUWtFLE1BQVIsR0FBaUJBLFNBQU8sR0FBeEI7QUFDSCxLQUxEO0FBTUFwRSxTQUFLNkcsU0FBTCxHQUFpQixZQUFLO0FBQ2xCLFlBQUcsQ0FBQzNHLE9BQUosRUFBWTtBQUNSLG1CQUFPLENBQVA7QUFDSDtBQUNELGVBQU9BLFFBQVFrRSxNQUFSLEdBQWUsR0FBdEI7QUFDSCxLQUxEO0FBTUFwRSxTQUFLMEksT0FBTCxHQUFlLFVBQUNkLEtBQUQsRUFBVTtBQUNyQixZQUFHLENBQUMxSCxPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7QUFDRCxZQUFJLE9BQU8wSCxLQUFQLEtBQWlCLFdBQXJCLEVBQWtDOztBQUU5QjFILG9CQUFRcUUsS0FBUixHQUFnQixDQUFDckUsUUFBUXFFLEtBQXpCOztBQUVBdkUsaUJBQUthLE9BQUwsQ0FBYThILHVCQUFiLEVBQTJCO0FBQ3ZCckUsc0JBQU1wRSxRQUFRcUU7QUFEUyxhQUEzQjtBQUlILFNBUkQsTUFRTzs7QUFFSHJFLG9CQUFRcUUsS0FBUixHQUFnQnFELEtBQWhCOztBQUVBNUgsaUJBQUthLE9BQUwsQ0FBYThILHVCQUFiLEVBQTJCO0FBQ3ZCckUsc0JBQU1wRSxRQUFRcUU7QUFEUyxhQUEzQjtBQUdIO0FBQ0QsZUFBT3JFLFFBQVFxRSxLQUFmO0FBQ0gsS0FyQkQ7QUFzQkF2RSxTQUFLNEksT0FBTCxHQUFlLFlBQUs7QUFDaEIsWUFBRyxDQUFDMUksT0FBSixFQUFZO0FBQ1IsbUJBQU8sS0FBUDtBQUNIO0FBQ0QsZUFBT0EsUUFBUXFFLEtBQWY7QUFDSCxLQUxEOztBQU9BdkUsU0FBSzZJLE9BQUwsR0FBZSxVQUFDcEgsT0FBRCxFQUFVK0UsZ0JBQVYsRUFBOEI7O0FBRXpDZixhQUFLaEUsT0FBTCxHQUFlQSxPQUFmOztBQUVBZ0UsYUFBS2lCLGFBQUwsR0FBcUIsOEJBQWtCakYsT0FBbEIsRUFBMkJnRSxLQUFLaUIsYUFBaEMsRUFBK0NoQixZQUEvQyxDQUFyQjtBQUNBYSxjQUFNQyxvQkFBb0IsQ0FBMUI7O0FBRUEsZUFBTyxJQUFJc0MsT0FBSixDQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCOztBQUUxQyxnQkFBR3RELGFBQWF1RCxNQUFiLEVBQUgsRUFBeUI7QUFDckJqSixxQkFBSzBJLE9BQUwsQ0FBYSxJQUFiO0FBQ0g7QUFDRCxnQkFBR2hELGFBQWFtQixTQUFiLEVBQUgsRUFBNEI7QUFDeEI3RyxxQkFBSzRHLFNBQUwsQ0FBZWxCLGFBQWFtQixTQUFiLEVBQWY7QUFDSDs7QUFFRGtDO0FBQ0gsU0FWTSxDQUFQO0FBWUgsS0FuQkQ7QUFvQkEvSSxTQUFLbUgsSUFBTCxHQUFZLFVBQUMxRixPQUFELEVBQVk7O0FBRXBCZ0UsYUFBS2hFLE9BQUwsR0FBZUEsT0FBZjtBQUNBZ0UsYUFBS2lCLGFBQUwsR0FBcUIsOEJBQWtCakYsT0FBbEIsRUFBMkJnRSxLQUFLaUIsYUFBaEMsRUFBK0NoQixZQUEvQyxDQUFyQjtBQUNBYSxjQUFNZCxLQUFLaEUsT0FBTCxDQUFheUgsU0FBYixJQUEwQixDQUFoQztBQUNILEtBTEQ7O0FBT0FsSixTQUFLd0MsSUFBTCxHQUFZLFlBQUs7O0FBRWIxQywwQkFBa0JDLEdBQWxCLENBQXNCLG1CQUF0QjtBQUNBLFlBQUcsQ0FBQ0csT0FBSixFQUFZO0FBQ1IsbUJBQU8sS0FBUDtBQUNIOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBNkYsOEJBQXNCLElBQXRCO0FBQ0EsWUFBRy9GLEtBQUtrQixRQUFMLE9BQW9Cd0Isd0JBQXZCLEVBQXFDO0FBQ2pDLGdCQUFPbUQsT0FBT0EsSUFBSXNELFFBQUosRUFBUixJQUE0QnRELE9BQU8sQ0FBQ0EsSUFBSXVELE9BQUosRUFBMUMsRUFBMkQ7QUFDdkR2RCxvQkFBSXJELElBQUosR0FBVzZHLElBQVgsQ0FBZ0IsYUFBSztBQUNqQjtBQUNBdEQsMENBQXNCLEtBQXRCO0FBQ0FqRyxzQ0FBa0JDLEdBQWxCLENBQXNCLDZCQUF0QjtBQUVILGlCQUxELFdBS1MsaUJBQVM7QUFDZDtBQUNBZ0csMENBQXNCLEtBQXRCO0FBQ0FqRyxzQ0FBa0JDLEdBQWxCLENBQXNCLDBCQUF0QixFQUFrRHNDLEtBQWxEO0FBQ0gsaUJBVEQ7QUFXSCxhQVpELE1BWUs7QUFDRCxvQkFBSWlILFVBQVVwSixRQUFRc0MsSUFBUixFQUFkO0FBQ0Esb0JBQUk4RyxZQUFZQyxTQUFoQixFQUEyQjtBQUN2QkQsNEJBQVFELElBQVIsQ0FBYSxZQUFVO0FBQ25CdEQsOENBQXNCLEtBQXRCO0FBQ0FqRywwQ0FBa0JDLEdBQWxCLENBQXNCLCtCQUF0QjtBQUNBOzs7Ozs7Ozs7OztBQVdILHFCQWRELFdBY1MsaUJBQVM7QUFDZEQsMENBQWtCQyxHQUFsQixDQUFzQiw2QkFBdEIsRUFBcURzQyxNQUFNbUgsT0FBM0Q7O0FBRUF6RCw4Q0FBc0IsS0FBdEI7QUFDQTs7Ozs7O0FBTUgscUJBeEJEO0FBeUJILGlCQTFCRCxNQTBCSztBQUNEO0FBQ0FqRyxzQ0FBa0JDLEdBQWxCLENBQXNCLG9DQUF0QjtBQUNBZ0csMENBQXNCLEtBQXRCO0FBQ0g7QUFFSjtBQUVKO0FBRUosS0FoRUQ7QUFpRUEvRixTQUFLb0MsS0FBTCxHQUFhLFlBQUs7O0FBRWR0QywwQkFBa0JDLEdBQWxCLENBQXNCLG9CQUF0QjtBQUNBLFlBQUcsQ0FBQ0csT0FBSixFQUFZO0FBQ1IsbUJBQU8sS0FBUDtBQUNIOztBQUVELFlBQUlGLEtBQUtrQixRQUFMLE9BQW9Cd0Isd0JBQXhCLEVBQXVDO0FBQ25DeEMsb0JBQVFrQyxLQUFSO0FBQ0gsU0FGRCxNQUVNLElBQUdwQyxLQUFLa0IsUUFBTCxPQUFvQndDLDJCQUF2QixFQUF3QztBQUMxQ21DLGdCQUFJekQsS0FBSjtBQUNIO0FBQ0osS0FaRDtBQWFBcEMsU0FBS29ILElBQUwsR0FBWSxVQUFDM0csUUFBRCxFQUFhO0FBQ3JCLFlBQUcsQ0FBQ1AsT0FBSixFQUFZO0FBQ1IsbUJBQU8sS0FBUDtBQUNIO0FBQ0RBLGdCQUFRb0MsV0FBUixHQUFzQjdCLFFBQXRCO0FBQ0gsS0FMRDtBQU1BVCxTQUFLeUosZUFBTCxHQUF1QixVQUFDckQsWUFBRCxFQUFpQjtBQUNwQyxZQUFHLENBQUNsRyxPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7QUFDREYsYUFBS2EsT0FBTCxDQUFhNkksZ0NBQWIsRUFBb0MsRUFBQ3RELGNBQWVBLFlBQWhCLEVBQXBDO0FBQ0EsZUFBT2xHLFFBQVFrRyxZQUFSLEdBQXVCbEcsUUFBUW1HLG1CQUFSLEdBQThCRCxZQUE1RDtBQUNILEtBTkQ7QUFPQXBHLFNBQUtzRyxlQUFMLEdBQXVCLFlBQUs7QUFDeEIsWUFBRyxDQUFDcEcsT0FBSixFQUFZO0FBQ1IsbUJBQU8sQ0FBUDtBQUNIO0FBQ0QsZUFBT0EsUUFBUWtHLFlBQWY7QUFDSCxLQUxEOztBQU9BcEcsU0FBSzBCLFVBQUwsR0FBa0IsWUFBTTtBQUNwQixZQUFHLENBQUN4QixPQUFKLEVBQVk7QUFDUixtQkFBTyxFQUFQO0FBQ0g7O0FBRUQsZUFBT3VGLEtBQUtoRSxPQUFMLENBQWFrSSxHQUFiLENBQWlCLFVBQVNsRCxNQUFULEVBQWlCbUQsS0FBakIsRUFBd0I7O0FBRTVDLGdCQUFJQyxNQUFNO0FBQ04zQyxzQkFBTVQsT0FBT1MsSUFEUDtBQUVOckYsc0JBQU00RSxPQUFPNUUsSUFGUDtBQUdOaUksdUJBQU9yRCxPQUFPcUQsS0FIUjtBQUlORix1QkFBUUEsS0FKRjtBQUtORyw4QkFBY3RELE9BQU9zRCxZQUxmO0FBTU56Ryw0QkFBWW1ELE9BQU9uRCxVQU5iO0FBT04wRywrQkFBZXZELE9BQU91RDtBQVBoQixhQUFWOztBQVVBLGdCQUFJdkQsT0FBT3dELFVBQVgsRUFBdUI7QUFDbkJKLG9CQUFJSSxVQUFKLEdBQWlCeEQsT0FBT3dELFVBQXhCO0FBQ0g7O0FBRUQsbUJBQU9KLEdBQVA7QUFDSCxTQWpCTSxDQUFQO0FBa0JILEtBdkJEO0FBd0JBN0osU0FBSzRCLGdCQUFMLEdBQXdCLFlBQUs7QUFDekIsZUFBTzZELEtBQUtpQixhQUFaO0FBQ0gsS0FGRDtBQUdBMUcsU0FBS2tLLGdCQUFMLEdBQXdCLFVBQUN2SSxXQUFELEVBQWN3SSxrQkFBZCxFQUFxQzs7QUFFekQsWUFBR3hJLGNBQWMsQ0FBQyxDQUFsQixFQUFvQjtBQUNoQixnQkFBRzhELEtBQUtoRSxPQUFMLElBQWdCZ0UsS0FBS2hFLE9BQUwsQ0FBYXNCLE1BQWIsR0FBc0JwQixXQUF6QyxFQUFxRDtBQUNqRDtBQUNBO0FBQ0E3QixrQ0FBa0JDLEdBQWxCLENBQXNCLHNCQUFzQjRCLFdBQTVDO0FBQ0E4RCxxQkFBS2lCLGFBQUwsR0FBcUIvRSxXQUFyQjs7QUFFQTNCLHFCQUFLYSxPQUFMLENBQWF1SixpQ0FBYixFQUFxQztBQUNqQzFELG1DQUFlL0U7QUFEa0IsaUJBQXJDO0FBR0ErRCw2QkFBYTJFLGNBQWIsQ0FBNEIxSSxXQUE1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBM0IscUJBQUtzQixRQUFMLENBQWNILHFCQUFkO0FBQ0Esb0JBQUdnSixrQkFBSCxFQUFzQjtBQUNsQjVELDBCQUFNckcsUUFBUW9DLFdBQVIsSUFBdUIsQ0FBN0I7QUFDSDtBQUNEO0FBQ0EsdUJBQU9tRCxLQUFLaUIsYUFBWjtBQUNIO0FBQ0o7QUFDSixLQXhCRDs7QUEyQkExRyxTQUFLc0ssZ0JBQUwsR0FBd0IsWUFBTTtBQUMxQixZQUFHLENBQUNwSyxPQUFKLEVBQVk7QUFDUixtQkFBTyxFQUFQO0FBQ0g7QUFDRCxlQUFPdUYsS0FBSzhFLGFBQVo7QUFDSCxLQUxEO0FBTUF2SyxTQUFLd0ssaUJBQUwsR0FBeUIsWUFBTTtBQUMzQixZQUFHLENBQUN0SyxPQUFKLEVBQVk7QUFDUixtQkFBTyxJQUFQO0FBQ0g7QUFDRCxlQUFPdUYsS0FBS2dGLGNBQVo7QUFDSCxLQUxEO0FBTUF6SyxTQUFLMEssaUJBQUwsR0FBeUIsVUFBQ0MsWUFBRCxFQUFrQjtBQUN2QztBQUNILEtBRkQ7QUFHQTNLLFNBQUs0SyxhQUFMLEdBQXFCLFlBQU07QUFDdkI7QUFDSCxLQUZEO0FBR0E1SyxTQUFLNkssY0FBTCxHQUFzQixVQUFDQyxNQUFELEVBQVk7QUFDOUI7QUFDSCxLQUZEOztBQUlBOUssU0FBSytLLFlBQUwsR0FBb0IsWUFBTTtBQUN0QixlQUFPdEYsS0FBS2tCLFNBQVo7QUFDSCxLQUZEO0FBR0EzRyxTQUFLZ0wsWUFBTCxHQUFvQixVQUFDckUsU0FBRCxFQUFlO0FBQy9CLGVBQU9sQixLQUFLa0IsU0FBTCxHQUFpQkEsU0FBeEI7QUFDSCxLQUZEO0FBR0EzRyxTQUFLaUwsU0FBTCxHQUFpQixVQUFDQyxVQUFELEVBQWU7QUFDNUIsWUFBSUMsTUFBTTFGLEtBQUtrQixTQUFmO0FBQ0EsWUFBSXlFLGdCQUFnQmxMLFFBQVFvQyxXQUFSLEdBQXNCNkksR0FBMUM7QUFDQSxZQUFJRSxjQUFjLENBQUNELGdCQUFnQkYsVUFBakIsSUFBK0JDLEdBQWpEO0FBQ0FFLHNCQUFjQSxjQUFjLE9BQTVCLENBSjRCLENBSVM7O0FBRXJDckwsYUFBS29DLEtBQUw7QUFDQXBDLGFBQUtvSCxJQUFMLENBQVVpRSxXQUFWO0FBQ0gsS0FSRDs7QUFVQXJMLFNBQUt1RCxJQUFMLEdBQVksWUFBSztBQUNiLFlBQUcsQ0FBQ3JELE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDtBQUNESiwwQkFBa0JDLEdBQWxCLENBQXNCLGdCQUF0Qjs7QUFFQUcsZ0JBQVFvTCxlQUFSLENBQXdCLFNBQXhCO0FBQ0FwTCxnQkFBUW9MLGVBQVIsQ0FBd0IsS0FBeEI7QUFDQSxlQUFPcEwsUUFBUXFMLFVBQWYsRUFBMkI7QUFDdkJyTCxvQkFBUXNMLFdBQVIsQ0FBb0J0TCxRQUFRcUwsVUFBNUI7QUFDSDs7QUFFRHZMLGFBQUtvQyxLQUFMO0FBQ0FwQyxhQUFLc0IsUUFBTCxDQUFjSCxxQkFBZDtBQUNBNEUsOEJBQXNCLEtBQXRCO0FBQ0gsS0FmRDs7QUFpQkEvRixTQUFLdUYsT0FBTCxHQUFlLFlBQUs7QUFDaEIsWUFBRyxDQUFDckYsT0FBSixFQUFZO0FBQ1IsbUJBQU8sS0FBUDtBQUNIO0FBQ0RGLGFBQUt1RCxJQUFMO0FBQ0F1QyxpQkFBU1AsT0FBVDtBQUNBOztBQUVBLFlBQUdNLEdBQUgsRUFBTztBQUNIQSxnQkFBSU4sT0FBSjtBQUNBTSxrQkFBTSxJQUFOO0FBQ0g7QUFDRDdGLGFBQUt5TCxHQUFMO0FBQ0EzTCwwQkFBa0JDLEdBQWxCLENBQXNCLHlEQUF0QjtBQUNILEtBZEQ7O0FBZ0JBO0FBQ0E7QUFDQUMsb0JBQWEsVUFBQ3VILElBQUQsRUFBVTtBQUNuQixZQUFNbUUsU0FBUzFMLEtBQUt1SCxJQUFMLENBQWY7QUFDQSxlQUFPLFlBQVU7QUFDYixtQkFBT21FLE9BQU9DLEtBQVAsQ0FBYTNMLElBQWIsRUFBbUI0TCxTQUFuQixDQUFQO0FBQ0gsU0FGRDtBQUdILEtBTEQ7QUFNQSxXQUFPNUwsSUFBUDtBQUVILENBdGZEOztxQkF3ZmV3RixRIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRVJST1JTLFxuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfQURfUExBWUlORyxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVHJpZ2dlciBvbiB2YXJpb3VzIHZpZGVvIGV2ZW50cy5cbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLlxuICogQHBhcmFtICAgUHJvdmlkZXIgcHJvdmlkZXIgIGh0bWw1UHJvdmlkZXJcbiAqICovXG5cblxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihlbGVtZW50LCBwcm92aWRlciwgdmlkZW9FbmRlZENhbGxiYWNrKXtcbiAgICBjb25zdCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciBsb2FkZWQuXCIsZWxlbWVudCAscHJvdmlkZXIgKTtcbiAgICBjb25zdCB0aGF0ID0ge307XG5cbiAgICBsZXQgc3RhbGxlZCA9IC0xO1xuICAgIGxldCBlbFZpZGVvID0gIGVsZW1lbnQ7XG4gICAgY29uc3QgYmV0d2VlbiA9IGZ1bmN0aW9uIChudW0sIG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihudW0sIG1heCksIG1pbik7XG4gICAgfTtcbiAgICBjb25zdCBjb21wYXJlU3RhbGxlZFRpbWUgPSBmdW5jdGlvbihzdGFsbGVkLCBwb3NpdGlvbil7XG4gICAgICAgIC8vT3JpZ2luYWwgQ29kZSBpcyBzdGFsbGVkICE9PSBwb3NpdGlvblxuICAgICAgICAvL0JlY2F1c2UgRGFzaGpzIGlzIHZlcnkgbWV0aWN1bG91cy4gVGhlbiBhbHdheXMgZGlmZnJlbmNlIHN0YWxsZWQgYW5kIHBvc2l0aW9uLlxuICAgICAgICAvL1RoYXQgaXMgd2h5IHdoZW4gSSB1c2UgdG9GaXhlZCgyKS5cbiAgICAgICAgcmV0dXJuIHN0YWxsZWQudG9GaXhlZCgyKSA9PT0gcG9zaXRpb24udG9GaXhlZCgyKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuY2FucGxheSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGNhbiBzdGFydCBwbGF5aW5nIHRoZSBhdWRpby92aWRlb1xuICAgICAgICBwcm92aWRlci5zZXRDYW5TZWVrKHRydWUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSX0ZVTEwpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gY2FucGxheVwiKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuZHVyYXRpb25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgZHVyYXRpb24gb2YgdGhlIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWRcbiAgICAgICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MoKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGR1cmF0aW9uY2hhbmdlXCIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5lbmRlZCA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXlsaXN0IGlzIGVuZGVkXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlbmRlZFwiKTtcblxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9JRExFICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0NPTVBMRVRFICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0VSUk9SKSB7XG4gICAgICAgICAgICBpZih2aWRlb0VuZGVkQ2FsbGJhY2spe1xuICAgICAgICAgICAgICAgIHZpZGVvRW5kZWRDYWxsYmFjayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkZGF0YSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgdGhlIGN1cnJlbnQgZnJhbWUgb2YgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIC8vRG8gbm90aGluZyBCZWNhdXNlIHRoaXMgY2F1c2VzIGNoYW9zIGJ5IGxvYWRlZG1ldGFkYXRhLlxuICAgICAgICAvKlxuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgICAgICAgICBkdXJhdGlvbjogZWxWaWRlby5kdXJhdGlvbixcbiAgICAgICAgICAgIGhlaWdodDogZWxWaWRlby52aWRlb0hlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiBlbFZpZGVvLnZpZGVvV2lkdGhcbiAgICAgICAgfTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTsqL1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRtZXRhZGF0YSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgbWV0YSBkYXRhIGZvciB0aGUgYXVkaW8vdmlkZW9cblxuICAgICAgICBsZXQgc291cmNlcyA9IHByb3ZpZGVyLmdldFNvdXJjZXMoKTtcbiAgICAgICAgbGV0IHNvdXJjZUluZGV4ID0gcHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpO1xuICAgICAgICBsZXQgdHlwZSA9IHNvdXJjZUluZGV4ID4gLTEgPyBzb3VyY2VzW3NvdXJjZUluZGV4XS50eXBlIDogXCJcIjtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xuICAgICAgICAgICAgZHVyYXRpb246IHByb3ZpZGVyLmlzTGl2ZSgpID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbixcbiAgICAgICAgICAgIHR5cGUgOnR5cGVcbiAgICAgICAgfTtcblxuICAgICAgICBwcm92aWRlci5zZXRNZXRhTG9hZGVkKCk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGxvYWRlZG1ldGFkYXRhXCIsIG1ldGFkYXRhKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gcGF1c2VkXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0NPTVBMRVRFIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0VSUk9SKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihlbFZpZGVvLmVuZGVkKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihlbFZpZGVvLmVycm9yKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihlbFZpZGVvLmN1cnJlbnRUaW1lID09PSBlbFZpZGVvLmR1cmF0aW9uKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGF1c2VcIik7XG5cbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUEFVU0VEKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucGxheSA9ICgpID0+IHtcblxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHN0YXJ0ZWQgb3IgaXMgbm8gbG9uZ2VyIHBhdXNlZFxuICAgICAgICBzdGFsbGVkID0gLTE7XG4gICAgICAgIGlmICghZWxWaWRlby5wYXVzZWQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucGxheWluZyA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBpcyBwbGF5aW5nIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZCBvciBzdG9wcGVkIGZvciBidWZmZXJpbmdcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBsYXlpbmdcIik7XG4gICAgICAgIGlmKHN0YWxsZWQgPCAwKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcbiAgICAgICAgaWYoIXRpbWVSYW5nZXMgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb24sIHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcblxuICAgICAgICBwcm92aWRlci5zZXRCdWZmZXIoYnVmZmVyZWQqMTAwKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwge1xuICAgICAgICAgICAgYnVmZmVyUGVyY2VudDogYnVmZmVyZWQqMTAwLFxuICAgICAgICAgICAgcG9zaXRpb246ICBwb3NpdGlvbixcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICB9KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHByb2dyZXNzXCIsIGJ1ZmZlcmVkKjEwMCk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGhhcyBjaGFuZ2VkXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb247XG4gICAgICAgIGlmIChpc05hTihkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWN0aW9uRW5kID0gcHJvdmlkZXIuZ2V0U291cmNlcygpW3Byb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKV0uc2VjdGlvbkVuZDtcblxuICAgICAgICBpZiAoc2VjdGlvbkVuZCAmJiBwb3NpdGlvbiA+PSBzZWN0aW9uRW5kICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcblxuICAgICAgICAgICAgcHJvdmlkZXIuc3RvcCgpO1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Tb21ldGltZXMgZGFzaCBsaXZlIGdhdmUgdG8gbWUgY3JhenkgZHVyYXRpb24uICg5MDA3MTk5MjU0NzQwOTkxLi4uKSB3aHk/Pz9cbiAgICAgICAgaWYoZHVyYXRpb24gPiA5MDAwMDAwMDAwMDAwMDAwKXsgICAgLy85MDA3MTk5MjU0NzQwOTkxXG4gICAgICAgICAgICBkdXJhdGlvbiA9IEluZmluaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpICYmICFlbFZpZGVvLnBhdXNlZCAmJiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfU1RBTExFRCB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9MT0FESU5HIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcpICYmXG4gICAgICAgICAgICAhY29tcGFyZVN0YWxsZWRUaW1lKHN0YWxsZWQsIHBvc2l0aW9uKSApe1xuICAgICAgICAgICAgc3RhbGxlZCA9IC0xO1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyB8fCBwcm92aWRlci5pc1NlZWtpbmcoKSkge1xuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtpbmcgPSAoKSA9PiB7XG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcodHJ1ZSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVraW5nXCIsIGVsVmlkZW8uY3VycmVudFRpbWUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFSyx7XG4gICAgICAgICAgICBwb3NpdGlvbiA6IGVsVmlkZW8uY3VycmVudFRpbWVcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50cy5zZWVrZWQgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtlZFwiKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyhmYWxzZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLRUQpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5zdGFsbGVkID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc3RhbGxlZFwiKTtcbiAgICAgICAgLy9UaGlzIGNhbGxiYWNrIGRvZXMgbm90IHdvcmsgb24gY2hyb21lLiBUaGlzIGNhbGxzIG9uIEZpcmVmb3ggaW50ZXJtaXR0ZW50LiBUaGVuIGRvIG5vdCB3b3JrIGhlcmUuIHVzaW5nIHdhaXRpbmcgZXZlbnQuXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLndhaXRpbmcgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgdmlkZW8gc3RvcHMgYmVjYXVzZSBpdCBuZWVkcyB0byBidWZmZXIgdGhlIG5leHQgZnJhbWVcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIiwgcHJvdmlkZXIuZ2V0U3RhdGUoKSk7XG4gICAgICAgIGlmKHByb3ZpZGVyLmlzU2Vla2luZygpKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuICAgICAgICB9ZWxzZSBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIHN0YWxsZWQgPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfU1RBTExFRCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMudm9sdW1lY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gdm9sdW1lY2hhbmdlXCIsIE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwge1xuICAgICAgICAgICAgdm9sdW1lOiBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSxcbiAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb2RlID0gKGVsVmlkZW8uZXJyb3IgJiYgZWxWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xuICAgICAgICBsZXQgY29udmVydGVkRXJyb0NvZGUgPSAoe1xuICAgICAgICAgICAgMDogUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgICAgICAgICAxOiBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgICAgICAgICAyOiBQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SLFxuICAgICAgICAgICAgMzogUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgICAgICAgICAgNDogUExBWUVSX0ZJTEVfRVJST1JcbiAgICAgICAgfVtjb2RlXXx8MCk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVycm9yXCIsIGNvbnZlcnRlZEVycm9Db2RlKTtcbiAgICAgICAgZXJyb3JUcmlnZ2VyKEVSUk9SUy5jb2Rlc1tjb252ZXJ0ZWRFcnJvQ29kZV0sIHByb3ZpZGVyKTtcbiAgICB9O1xuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGVsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XG5cbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjcuLlxuICovXG5pbXBvcnQgSW1hIGZyb20gXCJhcGkvYWRzL2ltYS9BZFwiO1xuaW1wb3J0IFZhc3QgZnJvbSBcImFwaS9hZHMvdmFzdC9BZFwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXJcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgcGlja0N1cnJlbnRTb3VyY2V9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgV0FSTl9NU0dfTVVURURQTEFZLFxuICAgIFVJX0lDT05TLCBQTEFZRVJfV0FSTklORyxcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLCBTVEFURV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsIFBMQVlFUl9DT01QTEVURSwgUExBWUVSX1BBVVNFLCBQTEFZRVJfUExBWSwgU1RBVEVfQURfUExBWUlORywgU1RBVEVfQURfUEFVU0VELFxuICAgIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBDT05URU5UX1NPVVJDRV9DSEFOR0VELFxuICAgIEFEX0NMSUVOVF9HT09HTEVJTUEsIEFEX0NMSUVOVF9WQVNULFxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBDb3JlIEZvciBIdG1sNSBWaWRlby5cbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcbiAqIEBwYXJhbSAgIG9uRXh0ZW5kZWRMb2FkIG9uIGxvYWQgaGFuZGxlclxuICogKi9cbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24gKHNwZWMsIHBsYXllckNvbmZpZywgb25FeHRlbmRlZExvYWQpe1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltQcm92aWRlcl0gbG9hZGVkLiBcIik7XG5cbiAgICBsZXQgdGhhdCA9e307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG4gICAgbGV0IGRhc2hBdHRhY2hlZFZpZXcgPSBmYWxzZTtcblxuICAgIGxldCBlbFZpZGVvID0gc3BlYy5lbGVtZW50O1xuICAgIGxldCBhZHMgPSBudWxsLCBsaXN0ZW5lciA9IG51bGwsIHZpZGVvRW5kZWRDYWxsYmFjayA9IG51bGw7XG5cbiAgICBsZXQgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuXG4gICAgaWYoc3BlYy5hZFRhZ1VybCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltQcm92aWRlcl0gQWQgQ2xpZW50IC0gXCIsIHBsYXllckNvbmZpZy5nZXRBZENsaWVudCgpKTtcbiAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldEFkQ2xpZW50KCkgPT09IEFEX0NMSUVOVF9WQVNUKXtcbiAgICAgICAgICAgIGFkcyA9IFZhc3QoZWxWaWRlbywgdGhhdCwgcGxheWVyQ29uZmlnLCBzcGVjLmFkVGFnVXJsKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBhZHMgPSBJbWEoZWxWaWRlbywgdGhhdCwgcGxheWVyQ29uZmlnLCBzcGVjLmFkVGFnVXJsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFhZHMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYW4gbm90IGxvYWQgZHVlIHRvIGdvb2dsZSBpbWEgZm9yIEFkcy5cIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKGVsVmlkZW8sIHRoYXQsIGFkcyA/IGFkcy52aWRlb0VuZGVkQ2FsbGJhY2sgOiBudWxsKTtcbiAgICBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXllckNvbmZpZy5nZXRQbGF5YmFja1JhdGUoKTtcblxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xuXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcbiAgICAgICAgc3BlYy5mcmFtZXJhdGUgPSBzb3VyY2UuZnJhbWVyYXRlO1xuXG4gICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XG5cbiAgICAgICAgaWYoIXNwZWMuZnJhbWVyYXRlKXtcbiAgICAgICAgICAgIC8vaW5pdCB0aW1lY29kZSBtb2RlXG4gICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9uRXh0ZW5kZWRMb2FkKXtcbiAgICAgICAgICAgIG9uRXh0ZW5kZWRMb2FkKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbik7XG5cbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBsb2FkZWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XG5cbiAgICAgICAgICAgIGxldCBwcmV2aW91c1NvdXJjZSA9IGVsVmlkZW8uc3JjO1xuXG4gICAgICAgICAgICAvLyBjb25zdCBzb3VyY2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XG4gICAgICAgICAgICAvLyBzb3VyY2VFbGVtZW50LnNyYyA9IHNvdXJjZS5maWxlO1xuXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VDaGFuZ2VkID0gKHNvdXJjZS5maWxlICE9PSBwcmV2aW91c1NvdXJjZSk7XG4gICAgICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xuXG4gICAgICAgICAgICAgICAgZWxWaWRlby5zcmMgPSBzb3VyY2UuZmlsZTtcblxuICAgICAgICAgICAgICAgIC8vRG9uJ3QgdXNlIHRoaXMuIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwNjM3Nzg0L2RldGVjdC1hbi1lcnJvci1vbi1odG1sNS12aWRlb1xuICAgICAgICAgICAgICAgIC8vZWxWaWRlby5hcHBlbmQoc291cmNlRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgY2FsbCBsb2FkIGlmIHNyYyB3YXMgbm90IHNldC4gbG9hZCgpIHdpbGwgY2FuY2VsIGFueSBhY3RpdmUgcGxheSBwcm9taXNlLlxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NvdXJjZSB8fCBwcmV2aW91c1NvdXJjZSA9PT0gJycpIHtcblxuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gJiYgbGFzdFBsYXlQb3NpdGlvbiA+IDApe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcbiAgICAgICAgICAgICAgICAvLyB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcblxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyp0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNwZWMuY3VycmVudFNvdXJjZVxuICAgICAgICAgICAgfSk7Ki9cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMubmFtZTtcbiAgICB9O1xuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XG4gICAgICAgIHNwZWMuY2FuU2VlayA9IGNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XG4gICAgICAgIHJldHVybiBzcGVjLnNlZWtpbmc7XG4gICAgfTtcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcbiAgICAgICAgc3BlYy5zZWVraW5nID0gc2Vla2luZztcbiAgICB9O1xuICAgIHRoYXQuc2V0TWV0YUxvYWRlZCA9ICgpID0+IHtcbiAgICAgICAgc3BlYy5pc0xvYWRlZCA9IHRydWU7XG4gICAgfTtcbiAgICB0aGF0Lm1ldGFMb2FkZWQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmlzTG9hZGVkO1xuICAgIH07XG5cbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XG4gICAgICAgIGlmKHNwZWMuc3RhdGUgIT09IG5ld1N0YXRlKXtcbiAgICAgICAgICAgIGxldCBwcmV2U3RhdGUgPSBzcGVjLnN0YXRlO1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHNldFN0YXRlKClcIiwgbmV3U3RhdGUpO1xuXG4gICAgICAgICAgICAvL1RvRG8gOiBUaGlzIGlzIHRlbXBvcmFyeSBjb2RlLiBJZiBtYWluIHZpZGVvIG9jY3VyIGVycm9yLCBwbGF5ZXIgYXZvaWQgZXJyb3IgbWVzc2FnZSBvbiBhZCBwbGF5aW5nLlxuICAgICAgICAgICAgaWYocHJldlN0YXRlID09PSBTVEFURV9BRF9QTEFZSU5HICYmIChuZXdTdGF0ZSA9PT0gU1RBVEVfRVJST1IgfHwgbmV3U3RhdGUgPT09IFNUQVRFX0lETEUpICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogMjAxOS0wNi0xM1xuICAgICAgICAgICAgICogTm8gbW9yZSBuZWNlc3NhcnkgdGhpcyBjb2Rlcy5cbiAgICAgICAgICAgICAqIENoZWNraW5nIHRoZSBhdXRvUGxheSBzdXBwb3J0IHdhcyB1c2luZyBtYWluIHZpZGVvIGVsZW1lbnQuIGVsVmlkZW8ucGxheSgpIC0+IHllcyBvciBubz8/XG4gICAgICAgICAgICAgKiBBbmQgdGhlbiB0aGF0IGNhdXNlcyB0cmlnZ2VyaW5nIHBsYXkgYW5kIHBhdXNlIGV2ZW50LlxuICAgICAgICAgICAgICogQW5kIHRoYXQgY2hlY2tpbmcgd2FpdHMgZm9yIGVsVmlkZW8gbG9hZGVkLiBEYXNoIGxvYWQgY29tcGxldGlvbiB0aW1lIGlzIHVua25vd24uXG4gICAgICAgICAgICAgKiBUaGVuIEkgY2hhbmdlZCBjaGVjayBtZXRob2QuIEkgbWFrZSB0ZW1wb3JhcnkgdmlkZW8gdGFnIGFuZCBpbnNlcnQgZW1wdHkgdmlkZW8uXG4gICAgICAgICAgICAgKiAqL1xuICAgICAgICAgICAgLy9pZiAoKHByZXZTdGF0ZSA9PT0gU1RBVEVfQURfUExBWUlORyB8fCBwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BBVVNFRCApICYmIChuZXdTdGF0ZSA9PT0gU1RBVEVfUEFVU0VEIHx8IG5ld1N0YXRlID09PSBTVEFURV9QTEFZSU5HKSkge1xuICAgICAgICAgICAgLy8gICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgLy9BZHMgY2hlY2tzIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkuIEl0IGNhbGxzIHJlYWwgcGxheSgpIGFuZCBwYXVzZSgpIHRvIHZpZGVvIGVsZW1lbnQuXG4gICAgICAgICAgICAvL0FuZCB0aGVuIHRoYXQgdHJpZ2dlcnMgXCJwbGF5aW5nXCIgYW5kIFwicGF1c2VcIi5cbiAgICAgICAgICAgIC8vSSBwcmV2ZW50IHRoZXNlIHByb2Nlc3MuXG4gICAgICAgICAgICAvL31cblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB0cmlnZ2VyU2F0YXR1c1wiLCBuZXdTdGF0ZSk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAobmV3U3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0NPTVBMRVRFIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUEFVU0VEIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX1BBVVNFRFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9BRF9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfQURfUEFVU0VEXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BMQVlJTkcgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QTEFZSU5HXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQURfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX0FEX1BMQVlJTkdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BlYy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xuICAgICAgICAgICAgICAgIHByZXZzdGF0ZTogcHJldlN0YXRlLFxuICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBzcGVjLnN0YXRlXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5zdGF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0QnVmZmVyID0gKG5ld0J1ZmZlcikgPT4ge1xuICAgICAgICBzcGVjLmJ1ZmZlciA9IG5ld0J1ZmZlcjtcbiAgICB9O1xuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5idWZmZXI7XG4gICAgfTtcbiAgICB0aGF0LmlzTGl2ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNMaXZlID8gdHJ1ZSA6IChlbFZpZGVvLmR1cmF0aW9uID09PSBJbmZpbml0eSk7XG4gICAgfTtcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhhdC5pc0xpdmUoKSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb247XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbFZpZGVvLnZvbHVtZSA9IHZvbHVtZS8xMDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby52b2x1bWUqMTAwO1xuICAgIH07XG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSAhZWxWaWRlby5tdXRlZDtcblxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSBzdGF0ZTtcblxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xuICAgIH07XG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcbiAgICB9O1xuXG4gICAgdGhhdC5wcmVsb2FkID0gKHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pID0+e1xuXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG5cbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xuICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uIHx8IDApO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc011dGUoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFZvbHVtZShwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XG5cbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xuICAgICAgICBfbG9hZChzcGVjLnNvdXJjZXMuc3RhcnR0aW1lIHx8IDApO1xuICAgIH07XG5cbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHBsYXkoKVwiKTtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9UZXN0IGl0IHRob3JvdWdobHkgYW5kIHJlbW92ZSBpc1BsYXlpbmdQcm9jZXNzaW5nLiBNb3N0IG9mIHRoZSBoYXphcmRzIGhhdmUgYmVlbiByZW1vdmVkLiBhIGxvdCBvZiBub25ibG9ja2luZyBwbGF5KCkgd2F5IC0+IGJsb2NraW5nIHBsYXkoKVxuICAgICAgICAvLyBpZihpc1BsYXlpbmdQcm9jZXNzaW5nKXtcbiAgICAgICAgLy8gICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSB0cnVlO1xuICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgaWYgKCAgKGFkcyAmJiBhZHMuaXNBY3RpdmUoKSkgfHwgKGFkcyAmJiAhYWRzLnN0YXJ0ZWQoKSkgKSB7XG4gICAgICAgICAgICAgICAgYWRzLnBsYXkoKS50aGVuKF8gPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2FkcyBwbGF5IHN1Y2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IGFkcyBwbGF5IHN1Y2Nlc3NcIik7XG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vYWRzIHBsYXkgZmFpbCBtYXliZSBjYXVzZSB1c2VyIGludGVyYWN0aXZlIGxlc3NcbiAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IGFkcyBwbGF5IGZhaWxcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZSA9IGVsVmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgIGlmIChwcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHZpZGVvIHBsYXkgc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihtdXRlZFBsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfV0FSTklORywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlIDogV0FSTl9NU0dfTVVURURQTEFZLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lciA6IDEwICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbkNsYXNzIDogVUlfSUNPTlMudm9sdW1lX211dGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2tDYWxsYmFjayA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IGVycm9yXCIsIGVycm9yLm1lc3NhZ2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIW11dGVkUGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAvL0lFIHByb21pc2UgaXMgdW5kZWZpbmRlZC5cbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IHN1Y2Nlc3MgKGllKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogcGF1c2UoKVwiKTtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICB9ZWxzZSBpZih0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcpe1xuICAgICAgICAgICAgYWRzLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbFZpZGVvLmN1cnJlbnRUaW1lID0gcG9zaXRpb247XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwge3BsYXliYWNrUmF0ZSA6IHBsYXliYWNrUmF0ZX0pO1xuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGU7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCkge1xuXG4gICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXG4gICAgICAgICAgICAgICAgaW5kZXggOiBpbmRleCxcbiAgICAgICAgICAgICAgICBzZWN0aW9uU3RhcnQ6IHNvdXJjZS5zZWN0aW9uU3RhcnQsXG4gICAgICAgICAgICAgICAgc2VjdGlvbkVuZDogc291cmNlLnNlY3Rpb25FbmQsXG4gICAgICAgICAgICAgICAgZ3JpZFRodW1ibmFpbDogc291cmNlLmdyaWRUaHVtYm5haWwsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoc291cmNlLmxvd0xhdGVuY3kpIHtcbiAgICAgICAgICAgICAgICBvYmoubG93TGF0ZW5jeSA9IHNvdXJjZS5sb3dMYXRlbmN5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcblxuICAgICAgICBpZihzb3VyY2VJbmRleCA+IC0xKXtcbiAgICAgICAgICAgIGlmKHNwZWMuc291cmNlcyAmJiBzcGVjLnNvdXJjZXMubGVuZ3RoID4gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIC8vdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgY2hhbmdlZCA6IFwiICsgc291cmNlSW5kZXgpO1xuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHNvdXJjZUluZGV4O1xuXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc291cmNlSW5kZXhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlSW5kZXgoc291cmNlSW5kZXgpO1xuICAgICAgICAgICAgICAgIC8vcGxheWVyQ29uZmlnLnNldFNvdXJjZUxhYmVsKHNwZWMuc291cmNlc1tzb3VyY2VJbmRleF0ubGFiZWwpO1xuICAgICAgICAgICAgICAgIC8vc3BlYy5jdXJyZW50UXVhbGl0eSA9IHNvdXJjZUluZGV4O1xuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgaWYobmVlZFByb3ZpZGVyQ2hhbmdlKXtcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQoZWxWaWRlby5jdXJyZW50VGltZSB8fCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMucXVhbGl0eUxldmVscztcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcblxuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEZyYW1lcmF0ZSA9IChmcmFtZXJhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlID0gZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT57XG4gICAgICAgIGxldCBmcHMgPSBzcGVjLmZyYW1lcmF0ZTtcbiAgICAgICAgbGV0IGN1cnJlbnRGcmFtZXMgPSBlbFZpZGVvLmN1cnJlbnRUaW1lICogZnBzO1xuICAgICAgICBsZXQgbmV3UG9zaXRpb24gPSAoY3VycmVudEZyYW1lcyArIGZyYW1lQ291bnQpIC8gZnBzO1xuICAgICAgICBuZXdQb3NpdGlvbiA9IG5ld1Bvc2l0aW9uICsgMC4wMDAwMTsgLy8gRklYRVMgQSBTQUZBUkkgU0VFSyBJU1NVRS4gbXlWZGllby5jdXJyZW50VGltZSA9IDAuMDQgd291bGQgZ2l2ZSBTTVBURSAwMDowMDowMDowMCB3aGVyYXMgaXQgc2hvdWxkIGdpdmUgMDA6MDA6MDA6MDFcblxuICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgIHRoYXQuc2VlayhuZXdQb3NpdGlvbik7XG4gICAgfTtcblxuICAgIHRoYXQuc3RvcCA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XG5cbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3ByZWxvYWQnKTtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICB3aGlsZSAoZWxWaWRlby5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUNoaWxkKGVsVmlkZW8uZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnN0b3AoKTtcbiAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xuICAgICAgICAvL2VsVmlkZW8ucmVtb3ZlKCk7XG5cbiAgICAgICAgaWYoYWRzKXtcbiAgICAgICAgICAgIGFkcy5kZXN0cm95KCk7XG4gICAgICAgICAgICBhZHMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG4gICAgfTtcblxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9