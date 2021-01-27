/*! OvenPlayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var Listener = function Listener(element, provider, videoEndedCallback, playerConfig) {
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

        // IE doesn't set paused property to true. So force set it.
        elVideo.pause();

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

    lowLevelEvents.loadstart = function () {

        if (playerConfig) {
            if (!playerConfig.getConfig().showBigPlayButton && playerConfig.getConfig().autoStart) {
                provider.setState(_constants.STATE_LOADING);
            }
        }
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

        if (position > duration) {
            elVideo.pause();
            provider.setState(_constants.STATE_COMPLETE);
            return;
        }

        var sectionStart = provider.getSources()[provider.getCurrentSource()].sectionStart;

        if (sectionStart && position < sectionStart && provider.getState() === _constants.STATE_PLAYING) {

            provider.seek(sectionStart);
        }

        var sectionEnd = provider.getSources()[provider.getCurrentSource()].sectionEnd;

        if (sectionEnd && position > sectionEnd && provider.getState() === _constants.STATE_PLAYING) {

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

        if (sectionStart && sectionStart > 0) {

            position = position - sectionStart;

            if (position < 0) {
                position = 0;
            }
        }

        if (sectionEnd) {
            duration = sectionEnd;
        }

        if (sectionStart) {
            duration = duration - sectionStart;
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

    listener = (0, _Listener2["default"])(elVideo, that, ads ? ads.videoEndedCallback : null, playerConfig);
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
                that.seek(lastPlayPosition);
                if (!playerConfig.isAutoStart()) {
                    // that.play();
                }
            }

            if (playerConfig.isAutoStart()) {}

            // that.play();

            /*that.trigger(CONTENT_SOURCE_CHANGED, {
                currentSource: spec.currentSource
            });*/
        }
    };

    that.getName = function () {
        return spec.name;
    };
    that.getMse = function () {
        return spec.mse;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJwbGF5ZXJDb25maWciLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsInRvRml4ZWQiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsInRyaWdnZXIiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwicGF1c2UiLCJnZXRTdGF0ZSIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsIlNUQVRFX0VSUk9SIiwic2V0U3RhdGUiLCJsb2FkZWRkYXRhIiwibG9hZGVkbWV0YWRhdGEiLCJzb3VyY2VzIiwiZ2V0U291cmNlcyIsInNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZSIsInR5cGUiLCJtZXRhZGF0YSIsImR1cmF0aW9uIiwiaXNMaXZlIiwiSW5maW5pdHkiLCJzZXRNZXRhTG9hZGVkIiwiQ09OVEVOVF9NRVRBIiwiZXJyb3IiLCJjdXJyZW50VGltZSIsIlNUQVRFX1BBVVNFRCIsImxvYWRzdGFydCIsImdldENvbmZpZyIsInNob3dCaWdQbGF5QnV0dG9uIiwiYXV0b1N0YXJ0IiwiU1RBVEVfTE9BRElORyIsInBsYXkiLCJwYXVzZWQiLCJTVEFURV9QTEFZSU5HIiwicGxheWluZyIsInRpbWVSYW5nZXMiLCJidWZmZXJlZCIsImxlbmd0aCIsImVuZCIsInNldEJ1ZmZlciIsIkNPTlRFTlRfQlVGRkVSIiwiYnVmZmVyUGVyY2VudCIsInRpbWV1cGRhdGUiLCJpc05hTiIsInNlY3Rpb25TdGFydCIsInNlZWsiLCJzZWN0aW9uRW5kIiwic3RvcCIsImlzU2Vla2luZyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJjb2RlcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2ZW50TmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZXN0cm95IiwiUHJvdmlkZXIiLCJzcGVjIiwib25FeHRlbmRlZExvYWQiLCJkYXNoQXR0YWNoZWRWaWV3IiwiYWRzIiwibGlzdGVuZXIiLCJpc1BsYXlpbmdQcm9jZXNzaW5nIiwiYWRUYWdVcmwiLCJnZXRBZENsaWVudCIsIkFEX0NMSUVOVF9WQVNUIiwiY29uc29sZSIsInBsYXliYWNrUmF0ZSIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJjdXJyZW50U291cmNlIiwiZnJhbWVyYXRlIiwic2V0Vm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0VGltZWNvZGVNb2RlIiwicHJldmlvdXNTb3VyY2UiLCJzcmMiLCJzb3VyY2VDaGFuZ2VkIiwiZmlsZSIsImxvYWQiLCJpc0F1dG9TdGFydCIsImdldE5hbWUiLCJuYW1lIiwiZ2V0TXNlIiwibXNlIiwiY2FuU2VlayIsImlzTG9hZGVkIiwibWV0YUxvYWRlZCIsIm5ld1N0YXRlIiwic3RhdGUiLCJwcmV2U3RhdGUiLCJQTEFZRVJfQ09NUExFVEUiLCJQTEFZRVJfUEFVU0UiLCJuZXdzdGF0ZSIsIlNUQVRFX0FEX1BBVVNFRCIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwibmV3QnVmZmVyIiwiYnVmZmVyIiwiZ2V0QnVmZmVyIiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsInNldE11dGUiLCJDT05URU5UX01VVEUiLCJnZXRNdXRlIiwicHJlbG9hZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaXNNdXRlIiwic3RhcnR0aW1lIiwiaXNBY3RpdmUiLCJzdGFydGVkIiwidGhlbiIsInByb21pc2UiLCJ1bmRlZmluZWQiLCJtZXNzYWdlIiwic2V0UGxheWJhY2tSYXRlIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwibWFwIiwiaW5kZXgiLCJvYmoiLCJsYWJlbCIsImdyaWRUaHVtYm5haWwiLCJsb3dMYXRlbmN5Iiwic2V0Q3VycmVudFNvdXJjZSIsIm5lZWRQcm92aWRlckNoYW5nZSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJzZXRTb3VyY2VJbmRleCIsImdldFF1YWxpdHlMZXZlbHMiLCJxdWFsaXR5TGV2ZWxzIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJjdXJyZW50UXVhbGl0eSIsInNldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0RnJhbWVyYXRlIiwic2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImZwcyIsImN1cnJlbnRGcmFtZXMiLCJuZXdQb3NpdGlvbiIsInJlbW92ZUF0dHJpYnV0ZSIsImZpcnN0Q2hpbGQiLCJyZW1v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LkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIEVSUk9SUyxcclxuICAgIEVSUk9SLFxyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9TVEFMTEVELFxyXG4gICAgU1RBVEVfTE9BRElORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfQURfUExBWUlORyxcclxuICAgIFNUQVRFX1BBVVNFRCxcclxuICAgIFNUQVRFX0VSUk9SLFxyXG4gICAgQ09OVEVOVF9DT01QTEVURSxcclxuICAgIENPTlRFTlRfU0VFSyxcclxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXHJcbiAgICBDT05URU5UX1NFRUtFRCxcclxuICAgIENPTlRFTlRfQlVGRkVSLFxyXG4gICAgQ09OVEVOVF9USU1FLFxyXG4gICAgQ09OVEVOVF9WT0xVTUUsXHJcbiAgICBDT05URU5UX01FVEEsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXHJcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcclxuICAgIFBST1ZJREVSX0hUTUw1LFxyXG4gICAgUFJPVklERVJfV0VCUlRDLFxyXG4gICAgUFJPVklERVJfREFTSCxcclxuICAgIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVHJpZ2dlciBvbiB2YXJpb3VzIHZpZGVvIGV2ZW50cy5cclxuICogQHBhcmFtICAgZXh0ZW5kZWRFbGVtZW50IGV4dGVuZGVkIG1lZGlhIG9iamVjdCBieSBtc2UuXHJcbiAqIEBwYXJhbSAgIFByb3ZpZGVyIHByb3ZpZGVyICBodG1sNVByb3ZpZGVyXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihlbGVtZW50LCBwcm92aWRlciwgdmlkZW9FbmRlZENhbGxiYWNrLCBwbGF5ZXJDb25maWcpe1xyXG4gICAgY29uc3QgbG93TGV2ZWxFdmVudHMgPSB7fTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIGxvYWRlZC5cIixlbGVtZW50ICxwcm92aWRlciApO1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG5cclxuICAgIGxldCBzdGFsbGVkID0gLTE7XHJcbiAgICBsZXQgZWxWaWRlbyA9ICBlbGVtZW50O1xyXG4gICAgY29uc3QgYmV0d2VlbiA9IGZ1bmN0aW9uIChudW0sIG1pbiwgbWF4KSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKG51bSwgbWF4KSwgbWluKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBjb21wYXJlU3RhbGxlZFRpbWUgPSBmdW5jdGlvbihzdGFsbGVkLCBwb3NpdGlvbil7XHJcbiAgICAgICAgLy9PcmlnaW5hbCBDb2RlIGlzIHN0YWxsZWQgIT09IHBvc2l0aW9uXHJcbiAgICAgICAgLy9CZWNhdXNlIERhc2hqcyBpcyB2ZXJ5IG1ldGljdWxvdXMuIFRoZW4gYWx3YXlzIGRpZmZyZW5jZSBzdGFsbGVkIGFuZCBwb3NpdGlvbi5cclxuICAgICAgICAvL1RoYXQgaXMgd2h5IHdoZW4gSSB1c2UgdG9GaXhlZCgyKS5cclxuICAgICAgICByZXR1cm4gc3RhbGxlZC50b0ZpeGVkKDIpID09PSBwb3NpdGlvbi50b0ZpeGVkKDIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5jYW5wbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBjYW4gc3RhcnQgcGxheWluZyB0aGUgYXVkaW8vdmlkZW9cclxuICAgICAgICBwcm92aWRlci5zZXRDYW5TZWVrKHRydWUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVJfRlVMTCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGNhbnBsYXlcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmR1cmF0aW9uY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgZHVyYXRpb24gb2YgdGhlIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWRcclxuICAgICAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcygpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBkdXJhdGlvbmNoYW5nZVwiKTtcclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMuZW5kZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXlsaXN0IGlzIGVuZGVkXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVuZGVkXCIpO1xyXG5cclxuICAgICAgICAvLyBJRSBkb2Vzbid0IHNldCBwYXVzZWQgcHJvcGVydHkgdG8gdHJ1ZS4gU28gZm9yY2Ugc2V0IGl0LlxyXG4gICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcclxuXHJcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9DT01QTEVURSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9FUlJPUikge1xyXG4gICAgICAgICAgICBpZih2aWRlb0VuZGVkQ2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgdmlkZW9FbmRlZENhbGxiYWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIHRoZSBjdXJyZW50IGZyYW1lIG9mIHRoZSBhdWRpby92aWRlb1xyXG4gICAgICAgIC8vRG8gbm90aGluZyBCZWNhdXNlIHRoaXMgY2F1c2VzIGNoYW9zIGJ5IGxvYWRlZG1ldGFkYXRhLlxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogZWxWaWRlby5kdXJhdGlvbixcclxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aDogZWxWaWRlby52aWRlb1dpZHRoXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIG1ldGEgZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvXHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VzID0gcHJvdmlkZXIuZ2V0U291cmNlcygpO1xyXG4gICAgICAgIGxldCBzb3VyY2VJbmRleCA9IHByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcclxuICAgICAgICBsZXQgdHlwZSA9IHNvdXJjZUluZGV4ID4gLTEgPyBzb3VyY2VzW3NvdXJjZUluZGV4XS50eXBlIDogXCJcIjtcclxuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBwcm92aWRlci5pc0xpdmUoKSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb24sXHJcbiAgICAgICAgICAgIHR5cGUgOnR5cGVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcm92aWRlci5zZXRNZXRhTG9hZGVkKCk7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRtZXRhZGF0YVwiLCBtZXRhZGF0YSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMucGF1c2UgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBwYXVzZWRcclxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9DT01QTEVURSB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9FUlJPUil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWxWaWRlby5lbmRlZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWxWaWRlby5lcnJvcil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWxWaWRlby5jdXJyZW50VGltZSA9PT0gZWxWaWRlby5kdXJhdGlvbil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBhdXNlXCIpO1xyXG5cclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5sb2Fkc3RhcnQgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKCFwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuc2hvd0JpZ1BsYXlCdXR0b24gJiYgcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9TdGFydCkge1xyXG4gICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXkgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gc3RhcnRlZCBvciBpcyBubyBsb25nZXIgcGF1c2VkXHJcbiAgICAgICAgc3RhbGxlZCA9IC0xO1xyXG4gICAgICAgIGlmICghZWxWaWRlby5wYXVzZWQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXlpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBpcyBwbGF5aW5nIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZCBvciBzdG9wcGVkIGZvciBidWZmZXJpbmdcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheWluZ1wiKTtcclxuICAgICAgICBpZihzdGFsbGVkIDwgMCl7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGlzIGRvd25sb2FkaW5nIHRoZSBhdWRpby92aWRlb1xyXG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcclxuICAgICAgICBpZighdGltZVJhbmdlcyApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uLCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcclxuXHJcbiAgICAgICAgcHJvdmlkZXIuc2V0QnVmZmVyKGJ1ZmZlcmVkKjEwMCk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwge1xyXG4gICAgICAgICAgICBidWZmZXJQZXJjZW50OiBidWZmZXJlZCoxMDAsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAgcG9zaXRpb24sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwcm9ncmVzc1wiLCBidWZmZXJlZCoxMDApO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb247XHJcbiAgICAgICAgaWYgKGlzTmFOKGR1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocG9zaXRpb24gPiBkdXJhdGlvbikge1xyXG4gICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlY3Rpb25TdGFydCA9IHByb3ZpZGVyLmdldFNvdXJjZXMoKVtwcm92aWRlci5nZXRDdXJyZW50U291cmNlKCldLnNlY3Rpb25TdGFydDtcclxuXHJcbiAgICAgICAgaWYgKHNlY3Rpb25TdGFydCAmJiBwb3NpdGlvbiA8IHNlY3Rpb25TdGFydCAmJiBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XHJcblxyXG4gICAgICAgICAgICBwcm92aWRlci5zZWVrKHNlY3Rpb25TdGFydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VjdGlvbkVuZCA9IHByb3ZpZGVyLmdldFNvdXJjZXMoKVtwcm92aWRlci5nZXRDdXJyZW50U291cmNlKCldLnNlY3Rpb25FbmQ7XHJcblxyXG4gICAgICAgIGlmIChzZWN0aW9uRW5kICYmIHBvc2l0aW9uID4gc2VjdGlvbkVuZCAmJiBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XHJcblxyXG4gICAgICAgICAgICBwcm92aWRlci5zdG9wKCk7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9Tb21ldGltZXMgZGFzaCBsaXZlIGdhdmUgdG8gbWUgY3JhenkgZHVyYXRpb24uICg5MDA3MTk5MjU0NzQwOTkxLi4uKSB3aHk/Pz9cclxuICAgICAgICBpZihkdXJhdGlvbiA+IDkwMDAwMDAwMDAwMDAwMDApeyAgICAvLzkwMDcxOTkyNTQ3NDA5OTFcclxuICAgICAgICAgICAgZHVyYXRpb24gPSBJbmZpbml0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSAmJiAhZWxWaWRlby5wYXVzZWQgJiYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1NUQUxMRUQgfHwgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfTE9BRElORyB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKSAmJlxyXG4gICAgICAgICAgICAhY29tcGFyZVN0YWxsZWRUaW1lKHN0YWxsZWQsIHBvc2l0aW9uKSApe1xyXG4gICAgICAgICAgICBzdGFsbGVkID0gLTE7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlY3Rpb25TdGFydCAmJiBzZWN0aW9uU3RhcnQgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIC0gc2VjdGlvblN0YXJ0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VjdGlvbkVuZCkge1xyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHNlY3Rpb25FbmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VjdGlvblN0YXJ0KSB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gLSBzZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyB8fCBwcm92aWRlci5pc1NlZWtpbmcoKSkge1xyXG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyh0cnVlKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2luZ1wiLCBlbFZpZGVvLmN1cnJlbnRUaW1lKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFSyx7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uIDogZWxWaWRlby5jdXJyZW50VGltZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtlZCA9ICgpID0+IHtcclxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVrZWRcIik7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyhmYWxzZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUtFRCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnN0YWxsZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHN0YWxsZWRcIik7XHJcbiAgICAgICAgLy9UaGlzIGNhbGxiYWNrIGRvZXMgbm90IHdvcmsgb24gY2hyb21lLiBUaGlzIGNhbGxzIG9uIEZpcmVmb3ggaW50ZXJtaXR0ZW50LiBUaGVuIGRvIG5vdCB3b3JrIGhlcmUuIHVzaW5nIHdhaXRpbmcgZXZlbnQuXHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLndhaXRpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSB2aWRlbyBzdG9wcyBiZWNhdXNlIGl0IG5lZWRzIHRvIGJ1ZmZlciB0aGUgbmV4dCBmcmFtZVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB3YWl0aW5nXCIsIHByb3ZpZGVyLmdldFN0YXRlKCkpO1xyXG4gICAgICAgIGlmKHByb3ZpZGVyLmlzU2Vla2luZygpKXtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XHJcbiAgICAgICAgfWVsc2UgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyl7XHJcbiAgICAgICAgICAgIHN0YWxsZWQgPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9TVEFMTEVEKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnZvbHVtZWNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gdm9sdW1lY2hhbmdlXCIsIE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVk9MVU1FLCB7XHJcbiAgICAgICAgICAgIHZvbHVtZTogTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCksXHJcbiAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMuZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29kZSA9IChlbFZpZGVvLmVycm9yICYmIGVsVmlkZW8uZXJyb3IuY29kZSkgfHwgMDtcclxuICAgICAgICBsZXQgY29udmVydGVkRXJyb0NvZGUgPSAoe1xyXG4gICAgICAgICAgICAwOiBQTEFZRVJfVU5LTldPTl9FUlJPUixcclxuICAgICAgICAgICAgMTogUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxyXG4gICAgICAgICAgICAyOiBQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SLFxyXG4gICAgICAgICAgICAzOiBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXHJcbiAgICAgICAgICAgIDQ6IFBMQVlFUl9GSUxFX0VSUk9SXHJcbiAgICAgICAgfVtjb2RlXXx8MCk7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlcnJvclwiLCBjb252ZXJ0ZWRFcnJvQ29kZSk7XHJcbiAgICAgICAgZXJyb3JUcmlnZ2VyKEVSUk9SUy5jb2Rlc1tjb252ZXJ0ZWRFcnJvQ29kZV0sIHByb3ZpZGVyKTtcclxuICAgIH07XHJcblxyXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgICAgICBlbFZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XHJcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyNy4uXHJcbiAqL1xyXG5pbXBvcnQgSW1hIGZyb20gXCJhcGkvYWRzL2ltYS9BZFwiO1xyXG5pbXBvcnQgVmFzdCBmcm9tIFwiYXBpL2Fkcy92YXN0L0FkXCI7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXJcIjtcclxuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgV0FSTl9NU0dfTVVURURQTEFZLFxyXG4gICAgVUlfSUNPTlMsIFBMQVlFUl9XQVJOSU5HLFxyXG4gICAgU1RBVEVfSURMRSwgU1RBVEVfUExBWUlORywgU1RBVEVfUEFVU0VELCBTVEFURV9DT01QTEVURSwgU1RBVEVfRVJST1IsXHJcbiAgICBQTEFZRVJfU1RBVEUsIFBMQVlFUl9DT01QTEVURSwgUExBWUVSX1BBVVNFLCBQTEFZRVJfUExBWSwgU1RBVEVfQURfUExBWUlORywgU1RBVEVfQURfUEFVU0VELFxyXG4gICAgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIENPTlRFTlRfU09VUkNFX0NIQU5HRUQsXHJcbiAgICBBRF9DTElFTlRfR09PR0xFSU1BLCBBRF9DTElFTlRfVkFTVCxcclxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIENvcmUgRm9yIEh0bWw1IFZpZGVvLlxyXG4gKiBAcGFyYW0gICBzcGVjIG1lbWJlciB2YWx1ZVxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcclxuICogQHBhcmFtICAgb25FeHRlbmRlZExvYWQgb24gbG9hZCBoYW5kbGVyXHJcbiAqICovXHJcbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24gKHNwZWMsIHBsYXllckNvbmZpZywgb25FeHRlbmRlZExvYWQpe1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiW1Byb3ZpZGVyXSBsb2FkZWQuIFwiKTtcclxuXHJcbiAgICBsZXQgdGhhdCA9e307XHJcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XHJcblxyXG4gICAgbGV0IGRhc2hBdHRhY2hlZFZpZXcgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgZWxWaWRlbyA9IHNwZWMuZWxlbWVudDtcclxuICAgIGxldCBhZHMgPSBudWxsLCBsaXN0ZW5lciA9IG51bGwsIHZpZGVvRW5kZWRDYWxsYmFjayA9IG51bGw7XHJcblxyXG4gICAgbGV0IGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcclxuXHJcbiAgICBpZihzcGVjLmFkVGFnVXJsKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbUHJvdmlkZXJdIEFkIENsaWVudCAtIFwiLCBwbGF5ZXJDb25maWcuZ2V0QWRDbGllbnQoKSk7XHJcbiAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldEFkQ2xpZW50KCkgPT09IEFEX0NMSUVOVF9WQVNUKXtcclxuICAgICAgICAgICAgYWRzID0gVmFzdChlbFZpZGVvLCB0aGF0LCBwbGF5ZXJDb25maWcsIHNwZWMuYWRUYWdVcmwpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhZHMgPSBJbWEoZWxWaWRlbywgdGhhdCwgcGxheWVyQ29uZmlnLCBzcGVjLmFkVGFnVXJsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFhZHMpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhbiBub3QgbG9hZCBkdWUgdG8gZ29vZ2xlIGltYSBmb3IgQWRzLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihlbFZpZGVvLCB0aGF0LCBhZHMgPyBhZHMudmlkZW9FbmRlZENhbGxiYWNrIDogbnVsbCwgcGxheWVyQ29uZmlnKTtcclxuICAgIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWVyQ29uZmlnLmdldFBsYXliYWNrUmF0ZSgpO1xyXG5cclxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xyXG5cclxuICAgICAgICBjb25zdCBzb3VyY2UgPSAgc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV07XHJcbiAgICAgICAgc3BlYy5mcmFtZXJhdGUgPSBzb3VyY2UuZnJhbWVyYXRlO1xyXG5cclxuICAgICAgICB0aGF0LnNldFZvbHVtZShwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpO1xyXG5cclxuICAgICAgICBpZighc3BlYy5mcmFtZXJhdGUpe1xyXG4gICAgICAgICAgICAvL2luaXQgdGltZWNvZGUgbW9kZVxyXG4gICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvbkV4dGVuZGVkTG9hZCl7XHJcbiAgICAgICAgICAgIG9uRXh0ZW5kZWRMb2FkKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbik7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1NvdXJjZSA9IGVsVmlkZW8uc3JjO1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc3Qgc291cmNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xyXG4gICAgICAgICAgICAvLyBzb3VyY2VFbGVtZW50LnNyYyA9IHNvdXJjZS5maWxlO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2UuZmlsZSAhPT0gcHJldmlvdXNTb3VyY2UpO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGVsVmlkZW8uc3JjID0gc291cmNlLmZpbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9Eb24ndCB1c2UgdGhpcy4gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzA2Mzc3ODQvZGV0ZWN0LWFuLWVycm9yLW9uLWh0bWw1LXZpZGVvXHJcbiAgICAgICAgICAgICAgICAvL2VsVmlkZW8uYXBwZW5kKHNvdXJjZUVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBjYWxsIGxvYWQgaWYgc3JjIHdhcyBub3Qgc2V0LiBsb2FkKCkgd2lsbCBjYW5jZWwgYW55IGFjdGl2ZSBwbGF5IHByb21pc2UuXHJcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNTb3VyY2UgfHwgcHJldmlvdXNTb3VyY2UgPT09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uICYmIGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNwZWMuY3VycmVudFNvdXJjZVxyXG4gICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5uYW1lO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TXNlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLm1zZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY2FuU2VlaztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldENhblNlZWsgPSAoY2FuU2VlaykgPT4ge1xyXG4gICAgICAgIHNwZWMuY2FuU2VlayA9IGNhblNlZWs7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnNlZWtpbmc7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmcpPT57XHJcbiAgICAgICAgc3BlYy5zZWVraW5nID0gc2Vla2luZztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldE1ldGFMb2FkZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgc3BlYy5pc0xvYWRlZCA9IHRydWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5tZXRhTG9hZGVkID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmlzTG9hZGVkO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xyXG4gICAgICAgICAgICBsZXQgcHJldlN0YXRlID0gc3BlYy5zdGF0ZTtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogc2V0U3RhdGUoKVwiLCBuZXdTdGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAvL1RvRG8gOiBUaGlzIGlzIHRlbXBvcmFyeSBjb2RlLiBJZiBtYWluIHZpZGVvIG9jY3VyIGVycm9yLCBwbGF5ZXIgYXZvaWQgZXJyb3IgbWVzc2FnZSBvbiBhZCBwbGF5aW5nLlxyXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BMQVlJTkcgJiYgKG5ld1N0YXRlID09PSBTVEFURV9FUlJPUiB8fCBuZXdTdGF0ZSA9PT0gU1RBVEVfSURMRSkgKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICogMjAxOS0wNi0xM1xyXG4gICAgICAgICAgICAgKiBObyBtb3JlIG5lY2Vzc2FyeSB0aGlzIGNvZGVzLlxyXG4gICAgICAgICAgICAgKiBDaGVja2luZyB0aGUgYXV0b1BsYXkgc3VwcG9ydCB3YXMgdXNpbmcgbWFpbiB2aWRlbyBlbGVtZW50LiBlbFZpZGVvLnBsYXkoKSAtPiB5ZXMgb3Igbm8/P1xyXG4gICAgICAgICAgICAgKiBBbmQgdGhlbiB0aGF0IGNhdXNlcyB0cmlnZ2VyaW5nIHBsYXkgYW5kIHBhdXNlIGV2ZW50LlxyXG4gICAgICAgICAgICAgKiBBbmQgdGhhdCBjaGVja2luZyB3YWl0cyBmb3IgZWxWaWRlbyBsb2FkZWQuIERhc2ggbG9hZCBjb21wbGV0aW9uIHRpbWUgaXMgdW5rbm93bi5cclxuICAgICAgICAgICAgICogVGhlbiBJIGNoYW5nZWQgY2hlY2sgbWV0aG9kLiBJIG1ha2UgdGVtcG9yYXJ5IHZpZGVvIHRhZyBhbmQgaW5zZXJ0IGVtcHR5IHZpZGVvLlxyXG4gICAgICAgICAgICAgKiAqL1xyXG4gICAgICAgICAgICAvL2lmICgocHJldlN0YXRlID09PSBTVEFURV9BRF9QTEFZSU5HIHx8IHByZXZTdGF0ZSA9PT0gU1RBVEVfQURfUEFVU0VEICkgJiYgKG5ld1N0YXRlID09PSBTVEFURV9QQVVTRUQgfHwgbmV3U3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpKSB7XHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgLy9BZHMgY2hlY2tzIGNoZWNrQXV0b3BsYXlTdXBwb3J0KCkuIEl0IGNhbGxzIHJlYWwgcGxheSgpIGFuZCBwYXVzZSgpIHRvIHZpZGVvIGVsZW1lbnQuXHJcbiAgICAgICAgICAgIC8vQW5kIHRoZW4gdGhhdCB0cmlnZ2VycyBcInBsYXlpbmdcIiBhbmQgXCJwYXVzZVwiLlxyXG4gICAgICAgICAgICAvL0kgcHJldmVudCB0aGVzZSBwcm9jZXNzLlxyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogdHJpZ2dlclNhdGF0dXNcIiwgbmV3U3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChuZXdTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QQVVTRURcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQURfUEFVU0VEIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX0FEX1BBVVNFRFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QTEFZSU5HIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfUExBWUlOR1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9BRF9QTEFZSU5HIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfQURfUExBWUlOR1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNwZWMuc3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xyXG4gICAgICAgICAgICAgICAgcHJldnN0YXRlOiBwcmV2U3RhdGUsXHJcbiAgICAgICAgICAgICAgICBuZXdzdGF0ZTogc3BlYy5zdGF0ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnN0YXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0QnVmZmVyID0gKG5ld0J1ZmZlcikgPT4ge1xyXG4gICAgICAgIHNwZWMuYnVmZmVyID0gbmV3QnVmZmVyO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmJ1ZmZlcjtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzTGl2ZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5pc0xpdmUgPyB0cnVlIDogKGVsVmlkZW8uZHVyYXRpb24gPT09IEluZmluaXR5KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGF0LmlzTGl2ZSgpID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbjtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsVmlkZW8udm9sdW1lID0gdm9sdW1lLzEwMDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLnZvbHVtZSoxMDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSAhZWxWaWRlby5tdXRlZDtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcclxuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gc3RhdGU7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XHJcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcclxuXHJcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcclxuXHJcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNNdXRlKCkpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFZvbHVtZShwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQubG9hZCA9IChzb3VyY2VzKSA9PntcclxuXHJcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcclxuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XHJcbiAgICAgICAgX2xvYWQoc3BlYy5zb3VyY2VzLnN0YXJ0dGltZSB8fCAwKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogcGxheSgpXCIpO1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9UZXN0IGl0IHRob3JvdWdobHkgYW5kIHJlbW92ZSBpc1BsYXlpbmdQcm9jZXNzaW5nLiBNb3N0IG9mIHRoZSBoYXphcmRzIGhhdmUgYmVlbiByZW1vdmVkLiBhIGxvdCBvZiBub25ibG9ja2luZyBwbGF5KCkgd2F5IC0+IGJsb2NraW5nIHBsYXkoKVxyXG4gICAgICAgIC8vIGlmKGlzUGxheWluZ1Byb2Nlc3Npbmcpe1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gdHJ1ZTtcclxuICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBpZiAoICAoYWRzICYmIGFkcy5pc0FjdGl2ZSgpKSB8fCAoYWRzICYmICFhZHMuc3RhcnRlZCgpKSApIHtcclxuICAgICAgICAgICAgICAgIGFkcy5wbGF5KCkudGhlbihfID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2FkcyBwbGF5IHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiBhZHMgcGxheSBzdWNjZXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2FkcyBwbGF5IGZhaWwgbWF5YmUgY2F1c2UgdXNlciBpbnRlcmFjdGl2ZSBsZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogYWRzIHBsYXkgZmFpbFwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9taXNlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHZpZGVvIHBsYXkgc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobXV0ZWRQbGF5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfV0FSTklORywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgOiBXQVJOX01TR19NVVRFRFBMQVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXIgOiAxMCAqIDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbkNsYXNzIDogVUlfSUNPTlMudm9sdW1lX211dGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGlja0NhbGxiYWNrIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHZpZGVvIHBsYXkgZXJyb3JcIiwgZXJyb3IubWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFtdXRlZFBsYXkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL0lFIHByb21pc2UgaXMgdW5kZWZpbmRlZC5cclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHZpZGVvIHBsYXkgc3VjY2VzcyAoaWUpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogcGF1c2UoKVwiKTtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcclxuICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORyl7XHJcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbFZpZGVvLmN1cnJlbnRUaW1lID0gcG9zaXRpb247XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwge3BsYXliYWNrUmF0ZSA6IHBsYXliYWNrUmF0ZX0pO1xyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxyXG4gICAgICAgICAgICAgICAgaW5kZXggOiBpbmRleCxcclxuICAgICAgICAgICAgICAgIHNlY3Rpb25TdGFydDogc291cmNlLnNlY3Rpb25TdGFydCxcclxuICAgICAgICAgICAgICAgIHNlY3Rpb25FbmQ6IHNvdXJjZS5zZWN0aW9uRW5kLFxyXG4gICAgICAgICAgICAgICAgZ3JpZFRodW1ibmFpbDogc291cmNlLmdyaWRUaHVtYm5haWwsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoc291cmNlLmxvd0xhdGVuY3kpIHtcclxuICAgICAgICAgICAgICAgIG9iai5sb3dMYXRlbmN5ID0gc291cmNlLmxvd0xhdGVuY3k7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoc291cmNlSW5kZXgsIG5lZWRQcm92aWRlckNoYW5nZSkgPT4ge1xyXG5cclxuICAgICAgICBpZihzb3VyY2VJbmRleCA+IC0xKXtcclxuICAgICAgICAgICAgaWYoc3BlYy5zb3VyY2VzICYmIHNwZWMuc291cmNlcy5sZW5ndGggPiBzb3VyY2VJbmRleCl7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBzb3VyY2VJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VJbmRleChzb3VyY2VJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAvL3BsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcclxuICAgICAgICAgICAgICAgIC8vc3BlYy5jdXJyZW50UXVhbGl0eSA9IHNvdXJjZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xyXG4gICAgICAgICAgICAgICAgaWYobmVlZFByb3ZpZGVyQ2hhbmdlKXtcclxuICAgICAgICAgICAgICAgICAgICBfbG9hZChlbFZpZGVvLmN1cnJlbnRUaW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRGcmFtZXJhdGUgPSAoZnJhbWVyYXRlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlID0gZnJhbWVyYXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+e1xyXG4gICAgICAgIGxldCBmcHMgPSBzcGVjLmZyYW1lcmF0ZTtcclxuICAgICAgICBsZXQgY3VycmVudEZyYW1lcyA9IGVsVmlkZW8uY3VycmVudFRpbWUgKiBmcHM7XHJcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcclxuICAgICAgICBuZXdQb3NpdGlvbiA9IG5ld1Bvc2l0aW9uICsgMC4wMDAwMTsgLy8gRklYRVMgQSBTQUZBUkkgU0VFSyBJU1NVRS4gbXlWZGllby5jdXJyZW50VGltZSA9IDAuMDQgd291bGQgZ2l2ZSBTTVBURSAwMDowMDowMDowMCB3aGVyYXMgaXQgc2hvdWxkIGdpdmUgMDA6MDA6MDA6MDFcclxuXHJcbiAgICAgICAgdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgIHRoYXQuc2VlayhuZXdQb3NpdGlvbik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc3RvcCA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc3RvcCgpIFwiKTtcclxuXHJcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3ByZWxvYWQnKTtcclxuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICAgICAgd2hpbGUgKGVsVmlkZW8uZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUNoaWxkKGVsVmlkZW8uZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcclxuICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0LnN0b3AoKTtcclxuICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XHJcbiAgICAgICAgLy9lbFZpZGVvLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICBpZihhZHMpe1xyXG4gICAgICAgICAgICBhZHMuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBhZHMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0Lm9mZigpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxyXG4gICAgLy8gdXNlIDogbGV0IHN1cGVyX2Rlc3Ryb3kgID0gdGhhdC5zdXBlcignZGVzdHJveScpOyAuLi4gc3VwZXJfZGVzdHJveSgpO1xyXG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=