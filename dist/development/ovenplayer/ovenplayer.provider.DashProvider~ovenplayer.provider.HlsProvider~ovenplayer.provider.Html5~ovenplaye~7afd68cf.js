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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJwbGF5ZXJDb25maWciLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsInRvRml4ZWQiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsInRyaWdnZXIiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJTVEFURV9FUlJPUiIsInNldFN0YXRlIiwibG9hZGVkZGF0YSIsImxvYWRlZG1ldGFkYXRhIiwic291cmNlcyIsImdldFNvdXJjZXMiLCJzb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2UiLCJ0eXBlIiwibWV0YWRhdGEiLCJkdXJhdGlvbiIsImlzTGl2ZSIsIkluZmluaXR5Iiwic2V0TWV0YUxvYWRlZCIsIkNPTlRFTlRfTUVUQSIsInBhdXNlIiwiZXJyb3IiLCJjdXJyZW50VGltZSIsIlNUQVRFX1BBVVNFRCIsImxvYWRzdGFydCIsImdldENvbmZpZyIsInNob3dCaWdQbGF5QnV0dG9uIiwiYXV0b1N0YXJ0IiwiU1RBVEVfTE9BRElORyIsInBsYXkiLCJwYXVzZWQiLCJTVEFURV9QTEFZSU5HIiwicGxheWluZyIsInRpbWVSYW5nZXMiLCJidWZmZXJlZCIsImxlbmd0aCIsImVuZCIsInNldEJ1ZmZlciIsIkNPTlRFTlRfQlVGRkVSIiwiYnVmZmVyUGVyY2VudCIsInRpbWV1cGRhdGUiLCJpc05hTiIsInNlY3Rpb25TdGFydCIsInNlZWsiLCJzZWN0aW9uRW5kIiwic3RvcCIsImlzU2Vla2luZyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJjb2RlcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2ZW50TmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJkZXN0cm95IiwiUHJvdmlkZXIiLCJzcGVjIiwib25FeHRlbmRlZExvYWQiLCJkYXNoQXR0YWNoZWRWaWV3IiwiYWRzIiwibGlzdGVuZXIiLCJpc1BsYXlpbmdQcm9jZXNzaW5nIiwiYWRUYWdVcmwiLCJnZXRBZENsaWVudCIsIkFEX0NMSUVOVF9WQVNUIiwiY29uc29sZSIsInBsYXliYWNrUmF0ZSIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJjdXJyZW50U291cmNlIiwiZnJhbWVyYXRlIiwic2V0Vm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0VGltZWNvZGVNb2RlIiwicHJldmlvdXNTb3VyY2UiLCJzcmMiLCJzb3VyY2VDaGFuZ2VkIiwiZmlsZSIsImxvYWQiLCJpc0F1dG9TdGFydCIsImdldE5hbWUiLCJuYW1lIiwiY2FuU2VlayIsImlzTG9hZGVkIiwibWV0YUxvYWRlZCIsIm5ld1N0YXRlIiwic3RhdGUiLCJwcmV2U3RhdGUiLCJQTEFZRVJfQ09NUExFVEUiLCJQTEFZRVJfUEFVU0UiLCJuZXdzdGF0ZSIsIlNUQVRFX0FEX1BBVVNFRCIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwibmV3QnVmZmVyIiwiYnVmZmVyIiwiZ2V0QnVmZmVyIiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsInNldE11dGUiLCJDT05URU5UX01VVEUiLCJnZXRNdXRlIiwicHJlbG9hZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaXNNdXRlIiwic3RhcnR0aW1lIiwiaXNBY3RpdmUiLCJzdGFydGVkIiwidGhlbiIsInByb21pc2UiLCJ1bmRlZmluZWQiLCJtZXNzYWdlIiwic2V0UGxheWJhY2tSYXRlIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwibWFwIiwiaW5kZXgiLCJvYmoiLCJsYWJlbCIsImdyaWRUaHVtYm5haWwiLCJsb3dMYXRlbmN5Iiwic2V0Q3VycmVudFNvdXJjZSIsIm5lZWRQcm92aWRlckNoYW5nZSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJzZXRTb3VyY2VJbmRleCIsImdldFF1YWxpdHlMZXZlbHMiLCJxdWFsaXR5TGV2ZWxzIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJjdXJyZW50UXVhbGl0eSIsInNldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0RnJhbWVyYXRlIiwic2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImZwcyIsImN1cnJlbnRGcmFtZXMiLCJuZXdQb3NpdGlvbiIsInJlbW92ZUF0dHJpYnV0ZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsIm9mZiIs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QkFBUXVMLGVBQVIsQ0FBd0IsU0FBeEI7QUFDQXZMLGdCQUFRdUwsZUFBUixDQUF3QixLQUF4QjtBQUNBLGVBQU92TCxRQUFRd0wsVUFBZixFQUEyQjtBQUN2QnhMLG9CQUFReUwsV0FBUixDQUFvQnpMLFFBQVF3TCxVQUE1QjtBQUNIOztBQUVEMUwsYUFBS29DLEtBQUw7QUFDQXBDLGFBQUtzQixRQUFMLENBQWNILHFCQUFkO0FBQ0FpRiw4QkFBc0IsS0FBdEI7QUFDSCxLQWZEOztBQWlCQXBHLFNBQUs2RixPQUFMLEdBQWUsWUFBSztBQUNoQixZQUFHLENBQUMzRixPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7QUFDREYsYUFBSzZELElBQUw7QUFDQXNDLGlCQUFTTixPQUFUO0FBQ0E7O0FBRUEsWUFBR0ssR0FBSCxFQUFPO0FBQ0hBLGdCQUFJTCxPQUFKO0FBQ0FLLGtCQUFNLElBQU47QUFDSDtBQUNEbEcsYUFBSzRMLEdBQUw7QUFDQTlMLDBCQUFrQkMsR0FBbEIsQ0FBc0IseURBQXRCO0FBQ0gsS0FkRDs7QUFnQkE7QUFDQTtBQUNBQyxvQkFBYSxVQUFDMkgsSUFBRCxFQUFVO0FBQ25CLFlBQU1rRSxTQUFTN0wsS0FBSzJILElBQUwsQ0FBZjtBQUNBLGVBQU8sWUFBVTtBQUNiLG1CQUFPa0UsT0FBT0MsS0FBUCxDQUFhOUwsSUFBYixFQUFtQitMLFNBQW5CLENBQVA7QUFDSCxTQUZEO0FBR0gsS0FMRDtBQU1BLFdBQU8vTCxJQUFQO0FBRUgsQ0F0ZkQ7O3FCQXdmZThGLFEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBFUlJPUlMsXHJcbiAgICBFUlJPUixcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXHJcbiAgICBTVEFURV9QQVVTRUQsXHJcbiAgICBTVEFURV9FUlJPUixcclxuICAgIENPTlRFTlRfQ09NUExFVEUsXHJcbiAgICBDT05URU5UX1NFRUssXHJcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxyXG4gICAgQ09OVEVOVF9TRUVLRUQsXHJcbiAgICBDT05URU5UX0JVRkZFUixcclxuICAgIENPTlRFTlRfVElNRSxcclxuICAgIENPTlRFTlRfVk9MVU1FLFxyXG4gICAgQ09OVEVOVF9NRVRBLFxyXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxyXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXHJcbiAgICBQUk9WSURFUl9IVE1MNSxcclxuICAgIFBST1ZJREVSX1dFQlJUQyxcclxuICAgIFBST1ZJREVSX0RBU0gsXHJcbiAgICBQUk9WSURFUl9ITFNcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIGVycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRyaWdnZXIgb24gdmFyaW91cyB2aWRlbyBldmVudHMuXHJcbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLlxyXG4gKiBAcGFyYW0gICBQcm92aWRlciBwcm92aWRlciAgaHRtbDVQcm92aWRlclxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxlbWVudCwgcHJvdmlkZXIsIHZpZGVvRW5kZWRDYWxsYmFjaywgcGxheWVyQ29uZmlnKXtcclxuICAgIGNvbnN0IGxvd0xldmVsRXZlbnRzID0ge307XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciBsb2FkZWQuXCIsZWxlbWVudCAscHJvdmlkZXIgKTtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuXHJcbiAgICBsZXQgc3RhbGxlZCA9IC0xO1xyXG4gICAgbGV0IGVsVmlkZW8gPSAgZWxlbWVudDtcclxuICAgIGNvbnN0IGJldHdlZW4gPSBmdW5jdGlvbiAobnVtLCBtaW4sIG1heCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihudW0sIG1heCksIG1pbik7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgY29tcGFyZVN0YWxsZWRUaW1lID0gZnVuY3Rpb24oc3RhbGxlZCwgcG9zaXRpb24pe1xyXG4gICAgICAgIC8vT3JpZ2luYWwgQ29kZSBpcyBzdGFsbGVkICE9PSBwb3NpdGlvblxyXG4gICAgICAgIC8vQmVjYXVzZSBEYXNoanMgaXMgdmVyeSBtZXRpY3Vsb3VzLiBUaGVuIGFsd2F5cyBkaWZmcmVuY2Ugc3RhbGxlZCBhbmQgcG9zaXRpb24uXHJcbiAgICAgICAgLy9UaGF0IGlzIHdoeSB3aGVuIEkgdXNlIHRvRml4ZWQoMikuXHJcbiAgICAgICAgcmV0dXJuIHN0YWxsZWQudG9GaXhlZCgyKSA9PT0gcG9zaXRpb24udG9GaXhlZCgyKTtcclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMuY2FucGxheSA9ICgpID0+IHtcclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIGF1ZGlvL3ZpZGVvXHJcbiAgICAgICAgcHJvdmlkZXIuc2V0Q2FuU2Vlayh0cnVlKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSX0ZVTEwpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBjYW5wbGF5XCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5kdXJhdGlvbmNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGR1cmF0aW9uIG9mIHRoZSBhdWRpby92aWRlbyBpcyBjaGFuZ2VkXHJcbiAgICAgICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MoKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZHVyYXRpb25jaGFuZ2VcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgY3VycmVudCBwbGF5bGlzdCBpcyBlbmRlZFxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlbmRlZFwiKTtcclxuXHJcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9DT01QTEVURSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9FUlJPUikge1xyXG4gICAgICAgICAgICBpZih2aWRlb0VuZGVkQ2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgdmlkZW9FbmRlZENhbGxiYWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIHRoZSBjdXJyZW50IGZyYW1lIG9mIHRoZSBhdWRpby92aWRlb1xyXG4gICAgICAgIC8vRG8gbm90aGluZyBCZWNhdXNlIHRoaXMgY2F1c2VzIGNoYW9zIGJ5IGxvYWRlZG1ldGFkYXRhLlxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogZWxWaWRlby5kdXJhdGlvbixcclxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aDogZWxWaWRlby52aWRlb1dpZHRoXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIG1ldGEgZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvXHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VzID0gcHJvdmlkZXIuZ2V0U291cmNlcygpO1xyXG4gICAgICAgIGxldCBzb3VyY2VJbmRleCA9IHByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcclxuICAgICAgICBsZXQgdHlwZSA9IHNvdXJjZUluZGV4ID4gLTEgPyBzb3VyY2VzW3NvdXJjZUluZGV4XS50eXBlIDogXCJcIjtcclxuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBwcm92aWRlci5pc0xpdmUoKSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb24sXHJcbiAgICAgICAgICAgIHR5cGUgOnR5cGVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwcm92aWRlci5zZXRNZXRhTG9hZGVkKCk7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRtZXRhZGF0YVwiLCBtZXRhZGF0YSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTtcclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMucGF1c2UgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBwYXVzZWRcclxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9DT01QTEVURSB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9FUlJPUil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWxWaWRlby5lbmRlZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWxWaWRlby5lcnJvcil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWxWaWRlby5jdXJyZW50VGltZSA9PT0gZWxWaWRlby5kdXJhdGlvbil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBhdXNlXCIpO1xyXG5cclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5sb2Fkc3RhcnQgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKCFwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuc2hvd0JpZ1BsYXlCdXR0b24gJiYgcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9TdGFydCkge1xyXG4gICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXkgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gc3RhcnRlZCBvciBpcyBubyBsb25nZXIgcGF1c2VkXHJcbiAgICAgICAgc3RhbGxlZCA9IC0xO1xyXG4gICAgICAgIGlmICghZWxWaWRlby5wYXVzZWQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXlpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBpcyBwbGF5aW5nIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZCBvciBzdG9wcGVkIGZvciBidWZmZXJpbmdcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheWluZ1wiKTtcclxuICAgICAgICBpZihzdGFsbGVkIDwgMCl7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGlzIGRvd25sb2FkaW5nIHRoZSBhdWRpby92aWRlb1xyXG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcclxuICAgICAgICBpZighdGltZVJhbmdlcyApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uLCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcclxuXHJcbiAgICAgICAgcHJvdmlkZXIuc2V0QnVmZmVyKGJ1ZmZlcmVkKjEwMCk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwge1xyXG4gICAgICAgICAgICBidWZmZXJQZXJjZW50OiBidWZmZXJlZCoxMDAsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAgcG9zaXRpb24sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwcm9ncmVzc1wiLCBidWZmZXJlZCoxMDApO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb247XHJcbiAgICAgICAgaWYgKGlzTmFOKGR1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VjdGlvblN0YXJ0ID0gcHJvdmlkZXIuZ2V0U291cmNlcygpW3Byb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKV0uc2VjdGlvblN0YXJ0O1xyXG5cclxuICAgICAgICBpZiAoc2VjdGlvblN0YXJ0ICYmIHBvc2l0aW9uIDwgc2VjdGlvblN0YXJ0ICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcclxuXHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNlZWsoc2VjdGlvblN0YXJ0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZWN0aW9uRW5kID0gcHJvdmlkZXIuZ2V0U291cmNlcygpW3Byb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKV0uc2VjdGlvbkVuZDtcclxuXHJcbiAgICAgICAgaWYgKHNlY3Rpb25FbmQgJiYgcG9zaXRpb24gPiBzZWN0aW9uRW5kICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcclxuXHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnN0b3AoKTtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1NvbWV0aW1lcyBkYXNoIGxpdmUgZ2F2ZSB0byBtZSBjcmF6eSBkdXJhdGlvbi4gKDkwMDcxOTkyNTQ3NDA5OTEuLi4pIHdoeT8/P1xyXG4gICAgICAgIGlmKGR1cmF0aW9uID4gOTAwMDAwMDAwMDAwMDAwMCl7ICAgIC8vOTAwNzE5OTI1NDc0MDk5MVxyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IEluZmluaXR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpICYmICFlbFZpZGVvLnBhdXNlZCAmJiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfU1RBTExFRCB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9MT0FESU5HIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcpICYmXHJcbiAgICAgICAgICAgICFjb21wYXJlU3RhbGxlZFRpbWUoc3RhbGxlZCwgcG9zaXRpb24pICl7XHJcbiAgICAgICAgICAgIHN0YWxsZWQgPSAtMTtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VjdGlvblN0YXJ0ICYmIHNlY3Rpb25TdGFydCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24gLSBzZWN0aW9uU3RhcnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZWN0aW9uRW5kKSB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0gc2VjdGlvbkVuZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZWN0aW9uU3RhcnQpIHtcclxuICAgICAgICAgICAgZHVyYXRpb24gPSBkdXJhdGlvbiAtIHNlY3Rpb25TdGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HIHx8IHByb3ZpZGVyLmlzU2Vla2luZygpKSB7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FLCB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2luZyA9ICgpID0+IHtcclxuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKHRydWUpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVraW5nXCIsIGVsVmlkZW8uY3VycmVudFRpbWUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLLHtcclxuICAgICAgICAgICAgcG9zaXRpb24gOiBlbFZpZGVvLmN1cnJlbnRUaW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2VkID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtlZFwiKTtcclxuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKGZhbHNlKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFS0VEKTtcclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMuc3RhbGxlZCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc3RhbGxlZFwiKTtcclxuICAgICAgICAvL1RoaXMgY2FsbGJhY2sgZG9lcyBub3Qgd29yayBvbiBjaHJvbWUuIFRoaXMgY2FsbHMgb24gRmlyZWZveCBpbnRlcm1pdHRlbnQuIFRoZW4gZG8gbm90IHdvcmsgaGVyZS4gdXNpbmcgd2FpdGluZyBldmVudC5cclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMud2FpdGluZyA9ICgpID0+IHtcclxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIHZpZGVvIHN0b3BzIGJlY2F1c2UgaXQgbmVlZHMgdG8gYnVmZmVyIHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIiwgcHJvdmlkZXIuZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgaWYocHJvdmlkZXIuaXNTZWVraW5nKCkpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuICAgICAgICB9ZWxzZSBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgc3RhbGxlZCA9IGVsVmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1NUQUxMRUQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbG93TGV2ZWxFdmVudHMudm9sdW1lY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB2b2x1bWVjaGFuZ2VcIiwgTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCkpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIHtcclxuICAgICAgICAgICAgdm9sdW1lOiBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSxcclxuICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5lcnJvciA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjb2RlID0gKGVsVmlkZW8uZXJyb3IgJiYgZWxWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xyXG4gICAgICAgIGxldCBjb252ZXJ0ZWRFcnJvQ29kZSA9ICh7XHJcbiAgICAgICAgICAgIDA6IFBMQVlFUl9VTktOV09OX0VSUk9SLFxyXG4gICAgICAgICAgICAxOiBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXHJcbiAgICAgICAgICAgIDI6IFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IsXHJcbiAgICAgICAgICAgIDM6IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcclxuICAgICAgICAgICAgNDogUExBWUVSX0ZJTEVfRVJST1JcclxuICAgICAgICB9W2NvZGVdfHwwKTtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVycm9yXCIsIGNvbnZlcnRlZEVycm9Db2RlKTtcclxuICAgICAgICBlcnJvclRyaWdnZXIoRVJST1JTLmNvZGVzW2NvbnZlcnRlZEVycm9Db2RlXSwgcHJvdmlkZXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xyXG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgICAgIGVsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI3Li5cclxuICovXHJcbmltcG9ydCBJbWEgZnJvbSBcImFwaS9hZHMvaW1hL0FkXCI7XHJcbmltcG9ydCBWYXN0IGZyb20gXCJhcGkvYWRzL3Zhc3QvQWRcIjtcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9MaXN0ZW5lclwiO1xyXG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIHBpY2tDdXJyZW50U291cmNlfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBXQVJOX01TR19NVVRFRFBMQVksXHJcbiAgICBVSV9JQ09OUywgUExBWUVSX1dBUk5JTkcsXHJcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLCBTVEFURV9FUlJPUixcclxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLCBTVEFURV9BRF9QTEFZSU5HLCBTVEFURV9BRF9QQVVTRUQsXHJcbiAgICBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCxcclxuICAgIEFEX0NMSUVOVF9HT09HTEVJTUEsIEFEX0NMSUVOVF9WQVNULFxyXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgQ29yZSBGb3IgSHRtbDUgVmlkZW8uXHJcbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xyXG4gKiBAcGFyYW0gICBvbkV4dGVuZGVkTG9hZCBvbiBsb2FkIGhhbmRsZXJcclxuICogKi9cclxuY29uc3QgUHJvdmlkZXIgPSBmdW5jdGlvbiAoc3BlYywgcGxheWVyQ29uZmlnLCBvbkV4dGVuZGVkTG9hZCl7XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbUHJvdmlkZXJdIGxvYWRlZC4gXCIpO1xyXG5cclxuICAgIGxldCB0aGF0ID17fTtcclxuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcclxuXHJcbiAgICBsZXQgZGFzaEF0dGFjaGVkVmlldyA9IGZhbHNlO1xyXG5cclxuICAgIGxldCBlbFZpZGVvID0gc3BlYy5lbGVtZW50O1xyXG4gICAgbGV0IGFkcyA9IG51bGwsIGxpc3RlbmVyID0gbnVsbCwgdmlkZW9FbmRlZENhbGxiYWNrID0gbnVsbDtcclxuXHJcbiAgICBsZXQgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG5cclxuICAgIGlmKHNwZWMuYWRUYWdVcmwpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltQcm92aWRlcl0gQWQgQ2xpZW50IC0gXCIsIHBsYXllckNvbmZpZy5nZXRBZENsaWVudCgpKTtcclxuICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0QWRDbGllbnQoKSA9PT0gQURfQ0xJRU5UX1ZBU1Qpe1xyXG4gICAgICAgICAgICBhZHMgPSBWYXN0KGVsVmlkZW8sIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFkcyA9IEltYShlbFZpZGVvLCB0aGF0LCBwbGF5ZXJDb25maWcsIHNwZWMuYWRUYWdVcmwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIWFkcyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKGVsVmlkZW8sIHRoYXQsIGFkcyA/IGFkcy52aWRlb0VuZGVkQ2FsbGJhY2sgOiBudWxsLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5ZXJDb25maWcuZ2V0UGxheWJhY2tSYXRlKCk7XHJcblxyXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcclxuICAgICAgICBzcGVjLmZyYW1lcmF0ZSA9IHNvdXJjZS5mcmFtZXJhdGU7XHJcblxyXG4gICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XHJcblxyXG4gICAgICAgIGlmKCFzcGVjLmZyYW1lcmF0ZSl7XHJcbiAgICAgICAgICAgIC8vaW5pdCB0aW1lY29kZSBtb2RlXHJcbiAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRUaW1lY29kZU1vZGUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9uRXh0ZW5kZWRMb2FkKXtcclxuICAgICAgICAgICAgb25FeHRlbmRlZExvYWQoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHByZXZpb3VzU291cmNlID0gZWxWaWRlby5zcmM7XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zdCBzb3VyY2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XHJcbiAgICAgICAgICAgIC8vIHNvdXJjZUVsZW1lbnQuc3JjID0gc291cmNlLmZpbGU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VDaGFuZ2VkID0gKHNvdXJjZS5maWxlICE9PSBwcmV2aW91c1NvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VDaGFuZ2VkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZWxWaWRlby5zcmMgPSBzb3VyY2UuZmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0Rvbid0IHVzZSB0aGlzLiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDYzNzc4NC9kZXRlY3QtYW4tZXJyb3Itb24taHRtbDUtdmlkZW9cclxuICAgICAgICAgICAgICAgIC8vZWxWaWRlby5hcHBlbmQoc291cmNlRWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGNhbGwgbG9hZCBpZiBzcmMgd2FzIG5vdCBzZXQuIGxvYWQoKSB3aWxsIGNhbmNlbCBhbnkgYWN0aXZlIHBsYXkgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NvdXJjZSB8fCBwcmV2aW91c1NvdXJjZSA9PT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gJiYgbGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyp0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc3BlYy5jdXJyZW50U291cmNlXHJcbiAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5jYW5TZWVrID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmNhblNlZWs7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDYW5TZWVrID0gKGNhblNlZWspID0+IHtcclxuICAgICAgICBzcGVjLmNhblNlZWsgPSBjYW5TZWVrO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNTZWVraW5nID0gKCk9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5zZWVraW5nO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0U2Vla2luZyA9IChzZWVraW5nKT0+e1xyXG4gICAgICAgIHNwZWMuc2Vla2luZyA9IHNlZWtpbmc7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNZXRhTG9hZGVkID0gKCkgPT4ge1xyXG4gICAgICAgIHNwZWMuaXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIHRoYXQubWV0YUxvYWRlZCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5pc0xvYWRlZDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMuc3RhdGUgIT09IG5ld1N0YXRlKXtcclxuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHNwZWMuc3RhdGU7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHNldFN0YXRlKClcIiwgbmV3U3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgLy9Ub0RvIDogVGhpcyBpcyB0ZW1wb3JhcnkgY29kZS4gSWYgbWFpbiB2aWRlbyBvY2N1ciBlcnJvciwgcGxheWVyIGF2b2lkIGVycm9yIG1lc3NhZ2Ugb24gYWQgcGxheWluZy5cclxuICAgICAgICAgICAgaWYocHJldlN0YXRlID09PSBTVEFURV9BRF9QTEFZSU5HICYmIChuZXdTdGF0ZSA9PT0gU1RBVEVfRVJST1IgfHwgbmV3U3RhdGUgPT09IFNUQVRFX0lETEUpICl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIDIwMTktMDYtMTNcclxuICAgICAgICAgICAgICogTm8gbW9yZSBuZWNlc3NhcnkgdGhpcyBjb2Rlcy5cclxuICAgICAgICAgICAgICogQ2hlY2tpbmcgdGhlIGF1dG9QbGF5IHN1cHBvcnQgd2FzIHVzaW5nIG1haW4gdmlkZW8gZWxlbWVudC4gZWxWaWRlby5wbGF5KCkgLT4geWVzIG9yIG5vPz9cclxuICAgICAgICAgICAgICogQW5kIHRoZW4gdGhhdCBjYXVzZXMgdHJpZ2dlcmluZyBwbGF5IGFuZCBwYXVzZSBldmVudC5cclxuICAgICAgICAgICAgICogQW5kIHRoYXQgY2hlY2tpbmcgd2FpdHMgZm9yIGVsVmlkZW8gbG9hZGVkLiBEYXNoIGxvYWQgY29tcGxldGlvbiB0aW1lIGlzIHVua25vd24uXHJcbiAgICAgICAgICAgICAqIFRoZW4gSSBjaGFuZ2VkIGNoZWNrIG1ldGhvZC4gSSBtYWtlIHRlbXBvcmFyeSB2aWRlbyB0YWcgYW5kIGluc2VydCBlbXB0eSB2aWRlby5cclxuICAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgLy9pZiAoKHByZXZTdGF0ZSA9PT0gU1RBVEVfQURfUExBWUlORyB8fCBwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BBVVNFRCApICYmIChuZXdTdGF0ZSA9PT0gU1RBVEVfUEFVU0VEIHx8IG5ld1N0YXRlID09PSBTVEFURV9QTEFZSU5HKSkge1xyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vQWRzIGNoZWNrcyBjaGVja0F1dG9wbGF5U3VwcG9ydCgpLiBJdCBjYWxscyByZWFsIHBsYXkoKSBhbmQgcGF1c2UoKSB0byB2aWRlbyBlbGVtZW50LlxyXG4gICAgICAgICAgICAvL0FuZCB0aGVuIHRoYXQgdHJpZ2dlcnMgXCJwbGF5aW5nXCIgYW5kIFwicGF1c2VcIi5cclxuICAgICAgICAgICAgLy9JIHByZXZlbnQgdGhlc2UgcHJvY2Vzcy5cclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHRyaWdnZXJTYXRhdHVzXCIsIG5ld1N0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAobmV3U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQ09NUExFVEUgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QQVVTRUQgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfUEFVU0VEXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0FEX1BBVVNFRCA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9BRF9QQVVTRURcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX1BMQVlJTkdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQURfUExBWUlORyA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX0FEX1BMQVlJTkdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzcGVjLnN0YXRlID0gbmV3U3RhdGU7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcclxuICAgICAgICAgICAgICAgIHByZXZzdGF0ZTogcHJldlN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5zdGF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcclxuICAgICAgICBzcGVjLmJ1ZmZlciA9IG5ld0J1ZmZlcjtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5idWZmZXI7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0xpdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNMaXZlID8gdHJ1ZSA6IChlbFZpZGVvLmR1cmF0aW9uID09PSBJbmZpbml0eSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhhdC5pc0xpdmUoKSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb247XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby5jdXJyZW50VGltZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbFZpZGVvLnZvbHVtZSA9IHZvbHVtZS8xMDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby52b2x1bWUqMTAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gIWVsVmlkZW8ubXV0ZWQ7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XHJcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHN0YXRlO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xyXG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbikgPT57XHJcblxyXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XHJcblxyXG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcclxuICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uIHx8IDApO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzTXV0ZSgpKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRWb2x1bWUocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XHJcblxyXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XHJcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgICAgIF9sb2FkKHNwZWMuc291cmNlcy5zdGFydHRpbWUgfHwgMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucGxheSA9ICgpID0+e1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHBsYXkoKVwiKTtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vVGVzdCBpdCB0aG9yb3VnaGx5IGFuZCByZW1vdmUgaXNQbGF5aW5nUHJvY2Vzc2luZy4gTW9zdCBvZiB0aGUgaGF6YXJkcyBoYXZlIGJlZW4gcmVtb3ZlZC4gYSBsb3Qgb2Ygbm9uYmxvY2tpbmcgcGxheSgpIHdheSAtPiBibG9ja2luZyBwbGF5KClcclxuICAgICAgICAvLyBpZihpc1BsYXlpbmdQcm9jZXNzaW5nKXtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IHRydWU7XHJcbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgaWYgKCAgKGFkcyAmJiBhZHMuaXNBY3RpdmUoKSkgfHwgKGFkcyAmJiAhYWRzLnN0YXJ0ZWQoKSkgKSB7XHJcbiAgICAgICAgICAgICAgICBhZHMucGxheSgpLnRoZW4oXyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZHMgcGxheSBzdWNjZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogYWRzIHBsYXkgc3VjY2Vzc1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZHMgcGxheSBmYWlsIG1heWJlIGNhdXNlIHVzZXIgaW50ZXJhY3RpdmUgbGVzc1xyXG4gICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IGFkcyBwbGF5IGZhaWxcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gZWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG11dGVkUGxheSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1dBUk5JTkcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlIDogV0FSTl9NU0dfTVVURURQTEFZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyIDogMTAgKiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25DbGFzcyA6IFVJX0lDT05TLnZvbHVtZV9tdXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2tDYWxsYmFjayA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IGVycm9yXCIsIGVycm9yLm1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighbXV0ZWRQbGF5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9JRSBwcm9taXNlIGlzIHVuZGVmaW5kZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IHN1Y2Nlc3MgKGllKVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHBhdXNlKClcIik7XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XHJcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICB9ZWxzZSBpZih0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBhZHMucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQudHJpZ2dlcihQTEFZQkFDS19SQVRFX0NIQU5HRUQsIHtwbGF5YmFja1JhdGUgOiBwbGF5YmFja1JhdGV9KTtcclxuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcclxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uU3RhcnQ6IHNvdXJjZS5zZWN0aW9uU3RhcnQsXHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uRW5kOiBzb3VyY2Uuc2VjdGlvbkVuZCxcclxuICAgICAgICAgICAgICAgIGdyaWRUaHVtYm5haWw6IHNvdXJjZS5ncmlkVGh1bWJuYWlsLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHNvdXJjZS5sb3dMYXRlbmN5KSB7XHJcbiAgICAgICAgICAgICAgICBvYmoubG93TGF0ZW5jeSA9IHNvdXJjZS5sb3dMYXRlbmN5O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcclxuXHJcbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XHJcbiAgICAgICAgICAgIGlmKHNwZWMuc291cmNlcyAmJiBzcGVjLnNvdXJjZXMubGVuZ3RoID4gc291cmNlSW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgY2hhbmdlZCA6IFwiICsgc291cmNlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gc291cmNlSW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzb3VyY2VJbmRleFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlSW5kZXgoc291cmNlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgLy9wbGF5ZXJDb25maWcuc2V0U291cmNlTGFiZWwoc3BlYy5zb3VyY2VzW3NvdXJjZUluZGV4XS5sYWJlbCk7XHJcbiAgICAgICAgICAgICAgICAvL3NwZWMuY3VycmVudFF1YWxpdHkgPSBzb3VyY2VJbmRleDtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcclxuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQoZWxWaWRlby5jdXJyZW50VGltZSB8fCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGV2ZWxzO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nXHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0RnJhbWVyYXRlID0gKGZyYW1lcmF0ZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZSA9IGZyYW1lcmF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PntcclxuICAgICAgICBsZXQgZnBzID0gc3BlYy5mcmFtZXJhdGU7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRGcmFtZXMgPSBlbFZpZGVvLmN1cnJlbnRUaW1lICogZnBzO1xyXG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IChjdXJyZW50RnJhbWVzICsgZnJhbWVDb3VudCkgLyBmcHM7XHJcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXHJcblxyXG4gICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XHJcblxyXG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdwcmVsb2FkJyk7XHJcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xyXG4gICAgICAgIHdoaWxlIChlbFZpZGVvLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVDaGlsZChlbFZpZGVvLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XHJcbiAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC5zdG9wKCk7XHJcbiAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIC8vZWxWaWRlby5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgaWYoYWRzKXtcclxuICAgICAgICAgICAgYWRzLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgYWRzID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC5vZmYoKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZGVzdHJveSgpIHBsYXllciBzdG9wLCBsaXN0ZW5lciwgZXZlbnQgZGVzdHJvaWVkXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cclxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcclxuICAgIHRoYXQuc3VwZXIgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9