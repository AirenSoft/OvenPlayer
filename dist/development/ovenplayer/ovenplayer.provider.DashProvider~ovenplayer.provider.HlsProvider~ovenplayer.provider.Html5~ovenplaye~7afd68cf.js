/*! OvenPlayerv0.9.750 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
            } else if (lastPlayPosition === 0 && elVideo.currentTime > 0) {
                that.seek(lastPlayPosition);
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

            var obj = {
                file: source.file,
                type: source.type,
                label: source.label,
                index: index
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsInRvRml4ZWQiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsInRyaWdnZXIiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJzZXRTdGF0ZSIsImxvYWRlZGRhdGEiLCJsb2FkZWRtZXRhZGF0YSIsInNvdXJjZXMiLCJnZXRTb3VyY2VzIiwic291cmNlSW5kZXgiLCJnZXRDdXJyZW50U291cmNlIiwidHlwZSIsIm1ldGFkYXRhIiwiZHVyYXRpb24iLCJpc0xpdmUiLCJJbmZpbml0eSIsInNldE1ldGFMb2FkZWQiLCJDT05URU5UX01FVEEiLCJwYXVzZSIsIlNUQVRFX0VSUk9SIiwiZXJyb3IiLCJjdXJyZW50VGltZSIsIlNUQVRFX1BBVVNFRCIsInBsYXkiLCJwYXVzZWQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfTE9BRElORyIsInBsYXlpbmciLCJ0aW1lUmFuZ2VzIiwiYnVmZmVyZWQiLCJsZW5ndGgiLCJlbmQiLCJzZXRCdWZmZXIiLCJDT05URU5UX0JVRkZFUiIsImJ1ZmZlclBlcmNlbnQiLCJ0aW1ldXBkYXRlIiwiaXNOYU4iLCJpc1NlZWtpbmciLCJTVEFURV9TVEFMTEVEIiwiU1RBVEVfQURfUExBWUlORyIsIkNPTlRFTlRfVElNRSIsInNlZWtpbmciLCJzZXRTZWVraW5nIiwiQ09OVEVOVF9TRUVLIiwic2Vla2VkIiwiQ09OVEVOVF9TRUVLRUQiLCJ3YWl0aW5nIiwidm9sdW1lY2hhbmdlIiwicm91bmQiLCJ2b2x1bWUiLCJDT05URU5UX1ZPTFVNRSIsIm11dGUiLCJtdXRlZCIsImNvZGUiLCJjb252ZXJ0ZWRFcnJvQ29kZSIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiRVJST1JTIiwiY29kZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldmVudE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVzdHJveSIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsIm9uRXh0ZW5kZWRMb2FkIiwiZGFzaEF0dGFjaGVkVmlldyIsImFkcyIsImxpc3RlbmVyIiwiaXNQbGF5aW5nUHJvY2Vzc2luZyIsImFkVGFnVXJsIiwiZ2V0QWRDbGllbnQiLCJBRF9DTElFTlRfVkFTVCIsImNvbnNvbGUiLCJwbGF5YmFja1JhdGUiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwiY3VycmVudFNvdXJjZSIsImZyYW1lcmF0ZSIsInNldFZvbHVtZSIsImdldFZvbHVtZSIsInNldFRpbWVjb2RlTW9kZSIsInByZXZpb3VzU291cmNlIiwic3JjIiwic291cmNlQ2hhbmdlZCIsImZpbGUiLCJsb2FkIiwic2VlayIsImlzQXV0b1N0YXJ0IiwiZ2V0TmFtZSIsIm5hbWUiLCJjYW5TZWVrIiwiaXNMb2FkZWQiLCJtZXRhTG9hZGVkIiwibmV3U3RhdGUiLCJzdGF0ZSIsInByZXZTdGF0ZSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIm5ld3N0YXRlIiwiU1RBVEVfQURfUEFVU0VEIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfU1RBVEUiLCJwcmV2c3RhdGUiLCJuZXdCdWZmZXIiLCJidWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsImdldFBvc2l0aW9uIiwic2V0TXV0ZSIsIkNPTlRFTlRfTVVURSIsImdldE11dGUiLCJwcmVsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpc011dGUiLCJzdGFydHRpbWUiLCJpc0FjdGl2ZSIsInN0YXJ0ZWQiLCJ0aGVuIiwicHJvbWlzZSIsInVuZGVmaW5lZCIsIm1lc3NhZ2UiLCJzZXRQbGF5YmFja1JhdGUiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJtYXAiLCJpbmRleCIsIm9iaiIsImxhYmVsIiwibG93TGF0ZW5jeSIsInNldEN1cnJlbnRTb3VyY2UiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwic2V0U291cmNlSW5kZXgiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldEZyYW1lcmF0ZSIsInNldEZyYW1lcmF0ZSIsInNlZWtGcmFtZSIsImZyYW1lQ291bnQiLCJmcHMiLCJjdXJyZW50RnJhbWVzIiwibmV3UG9zaXRpb24iLCJzdG9wIiwicmVtb3ZlQXR0cmlidXRlIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwib2ZmIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBNkJBOztBQUVBOzs7Ozs7QUFPQSxJQUFNQSxXQUFXLFNB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QVFrTCxVQUE1QjtBQUNIO0FBQ0RwTCxhQUFLbUMsS0FBTDtBQUNBbkMsYUFBS3FCLFFBQUwsQ0FBY0YscUJBQWQ7QUFDSCxLQVpEOztBQWNBbkIsU0FBS3FGLE9BQUwsR0FBZSxZQUFLO0FBQ2hCLFlBQUcsQ0FBQ25GLE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDtBQUNERixhQUFLa0wsSUFBTDtBQUNBdEYsaUJBQVNQLE9BQVQ7QUFDQTs7QUFFQSxZQUFHTSxHQUFILEVBQU87QUFDSEEsZ0JBQUlOLE9BQUo7QUFDQU0sa0JBQU0sSUFBTjtBQUNIO0FBQ0QzRixhQUFLc0wsR0FBTDtBQUNBeEwsMEJBQWtCQyxHQUFsQixDQUFzQix5REFBdEI7QUFDSCxLQWREOztBQWdCQTtBQUNBO0FBQ0FDLG9CQUFhLFVBQUNxSCxJQUFELEVBQVU7QUFDbkIsWUFBTWtFLFNBQVN2TCxLQUFLcUgsSUFBTCxDQUFmO0FBQ0EsZUFBTyxZQUFVO0FBQ2IsbUJBQU9rRSxPQUFPQyxLQUFQLENBQWF4TCxJQUFiLEVBQW1CeUwsU0FBbkIsQ0FBUDtBQUNILFNBRkQ7QUFHSCxLQUxEO0FBTUEsV0FBT3pMLElBQVA7QUFFSCxDQTNlRDs7cUJBNmVlc0YsUSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBFUlJPUlMsXG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBDT05URU5UX0NPTVBMRVRFLFxuICAgIENPTlRFTlRfU0VFSyxcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxuICAgIENPTlRFTlRfU0VFS0VELFxuICAgIENPTlRFTlRfQlVGRkVSLFxuICAgIENPTlRFTlRfVElNRSxcbiAgICBDT05URU5UX1ZPTFVNRSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxuICAgIFBST1ZJREVSX0hUTUw1LFxuICAgIFBST1ZJREVSX1dFQlJUQyxcbiAgICBQUk9WSURFUl9EQVNILFxuICAgIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUcmlnZ2VyIG9uIHZhcmlvdXMgdmlkZW8gZXZlbnRzLlxuICogQHBhcmFtICAgZXh0ZW5kZWRFbGVtZW50IGV4dGVuZGVkIG1lZGlhIG9iamVjdCBieSBtc2UuXG4gKiBAcGFyYW0gICBQcm92aWRlciBwcm92aWRlciAgaHRtbDVQcm92aWRlclxuICogKi9cblxuXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGVsZW1lbnQsIHByb3ZpZGVyLCB2aWRlb0VuZGVkQ2FsbGJhY2spe1xuICAgIGNvbnN0IGxvd0xldmVsRXZlbnRzID0ge307XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIGxvYWRlZC5cIixlbGVtZW50ICxwcm92aWRlciApO1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcblxuICAgIGxldCBzdGFsbGVkID0gLTE7XG4gICAgbGV0IGVsVmlkZW8gPSAgZWxlbWVudDtcbiAgICBjb25zdCBiZXR3ZWVuID0gZnVuY3Rpb24gKG51bSwgbWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKG51bSwgbWF4KSwgbWluKTtcbiAgICB9XG4gICAgY29uc3QgY29tcGFyZVN0YWxsZWRUaW1lID0gZnVuY3Rpb24oc3RhbGxlZCwgcG9zaXRpb24pe1xuICAgICAgICAvL09yaWdpbmFsIENvZGUgaXMgc3RhbGxlZCAhPT0gcG9zaXRpb25cbiAgICAgICAgLy9CZWNhdXNlIERhc2hqcyBpcyB2ZXJ5IG1ldGljdWxvdXMuIFRoZW4gYWx3YXlzIGRpZmZyZW5jZSBzdGFsbGVkIGFuZCBwb3NpdGlvbi5cbiAgICAgICAgLy9UaGF0IGlzIHdoeSB3aGVuIEkgdXNlIHRvRml4ZWQoMikuXG4gICAgICAgIHJldHVybiBzdGFsbGVkLnRvRml4ZWQoMikgPT09IHBvc2l0aW9uLnRvRml4ZWQoMik7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmNhbnBsYXkgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBjYW4gc3RhcnQgcGxheWluZyB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgcHJvdmlkZXIuc2V0Q2FuU2Vlayh0cnVlKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUl9GVUxMKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGNhbnBsYXlcIik7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmR1cmF0aW9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGR1cmF0aW9uIG9mIHRoZSBhdWRpby92aWRlbyBpcyBjaGFuZ2VkXG4gICAgICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzKCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBkdXJhdGlvbmNoYW5nZVwiKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuZW5kZWQgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgY3VycmVudCBwbGF5bGlzdCBpcyBlbmRlZFxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZW5kZWRcIik7XG5cbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9DT01QTEVURSl7XG4gICAgICAgICAgICBpZih2aWRlb0VuZGVkQ2FsbGJhY2spe1xuICAgICAgICAgICAgICAgIHZpZGVvRW5kZWRDYWxsYmFjayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkZGF0YSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgdGhlIGN1cnJlbnQgZnJhbWUgb2YgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIC8vRG8gbm90aGluZyBCZWNhdXNlIHRoaXMgY2F1c2VzIGNoYW9zIGJ5IGxvYWRlZG1ldGFkYXRhLlxuICAgICAgICAvKlxuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgICAgICAgICBkdXJhdGlvbjogZWxWaWRlby5kdXJhdGlvbixcbiAgICAgICAgICAgIGhlaWdodDogZWxWaWRlby52aWRlb0hlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiBlbFZpZGVvLnZpZGVvV2lkdGhcbiAgICAgICAgfTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTsqL1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRtZXRhZGF0YSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgbWV0YSBkYXRhIGZvciB0aGUgYXVkaW8vdmlkZW9cblxuICAgICAgICBsZXQgc291cmNlcyA9IHByb3ZpZGVyLmdldFNvdXJjZXMoKTtcbiAgICAgICAgbGV0IHNvdXJjZUluZGV4ID0gcHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpO1xuICAgICAgICBsZXQgdHlwZSA9IHNvdXJjZUluZGV4ID4gLTEgPyBzb3VyY2VzW3NvdXJjZUluZGV4XS50eXBlIDogXCJcIjtcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xuICAgICAgICAgICAgZHVyYXRpb246IHByb3ZpZGVyLmlzTGl2ZSgpID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbixcbiAgICAgICAgICAgIHR5cGUgOnR5cGVcbiAgICAgICAgfTtcblxuICAgICAgICBwcm92aWRlci5zZXRNZXRhTG9hZGVkKCk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGxvYWRlZG1ldGFkYXRhXCIsIG1ldGFkYXRhKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gcGF1c2VkXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0NPTVBMRVRFIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0VSUk9SKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihlbFZpZGVvLmVuZGVkKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihlbFZpZGVvLmVycm9yKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihlbFZpZGVvLmN1cnJlbnRUaW1lID09PSBlbFZpZGVvLmR1cmF0aW9uKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGF1c2VcIik7XG5cbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUEFVU0VEKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucGxheSA9ICgpID0+IHtcblxuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHN0YXJ0ZWQgb3IgaXMgbm8gbG9uZ2VyIHBhdXNlZFxuICAgICAgICBzdGFsbGVkID0gLTE7XG4gICAgICAgIGlmICghZWxWaWRlby5wYXVzZWQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucGxheWluZyA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBpcyBwbGF5aW5nIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZCBvciBzdG9wcGVkIGZvciBidWZmZXJpbmdcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBsYXlpbmdcIik7XG4gICAgICAgIGlmKHN0YWxsZWQgPCAwKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcbiAgICAgICAgaWYoIXRpbWVSYW5nZXMgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb24sIHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcblxuICAgICAgICBwcm92aWRlci5zZXRCdWZmZXIoYnVmZmVyZWQqMTAwKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwge1xuICAgICAgICAgICAgYnVmZmVyUGVyY2VudDogYnVmZmVyZWQqMTAwLFxuICAgICAgICAgICAgcG9zaXRpb246ICBwb3NpdGlvbixcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICB9KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHByb2dyZXNzXCIsIGJ1ZmZlcmVkKjEwMCk7XG4gICAgfTtcblxuXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGhhcyBjaGFuZ2VkXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb247XG4gICAgICAgIGlmIChpc05hTihkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vU29tZXRpbWVzIGRhc2ggbGl2ZSBnYXZlIHRvIG1lIGNyYXp5IGR1cmF0aW9uLiAoOTAwNzE5OTI1NDc0MDk5MS4uLikgd2h5Pz8/XG4gICAgICAgIGlmKGR1cmF0aW9uID4gOTAwMDAwMDAwMDAwMDAwMCl7ICAgIC8vOTAwNzE5OTI1NDc0MDk5MVxuICAgICAgICAgICAgZHVyYXRpb24gPSBJbmZpbml0eTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSAmJiAhZWxWaWRlby5wYXVzZWQgJiYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1NUQUxMRUQgfHwgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfTE9BRElORyB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKSAmJlxuICAgICAgICAgICAgIWNvbXBhcmVTdGFsbGVkVGltZShzdGFsbGVkLCBwb3NpdGlvbikgKXtcbiAgICAgICAgICAgIHN0YWxsZWQgPSAtMTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcgfHwgcHJvdmlkZXIuaXNTZWVraW5nKCkpIHtcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FLCB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5zZWVraW5nID0gKCkgPT4ge1xuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKHRydWUpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2luZ1wiLCBlbFZpZGVvLmN1cnJlbnRUaW1lKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUsse1xuICAgICAgICAgICAgcG9zaXRpb24gOiBlbFZpZGVvLmN1cnJlbnRUaW1lXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2VkID0gKCkgPT4ge1xuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVrZWRcIik7XG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcoZmFsc2UpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFS0VEKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuc3RhbGxlZCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHN0YWxsZWRcIik7XG4gICAgICAgIC8vVGhpcyBjYWxsYmFjayBkb2VzIG5vdCB3b3JrIG9uIGNocm9tZS4gVGhpcyBjYWxscyBvbiBGaXJlZm94IGludGVybWl0dGVudC4gVGhlbiBkbyBub3Qgd29yayBoZXJlLiB1c2luZyB3YWl0aW5nIGV2ZW50LlxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy53YWl0aW5nID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIHZpZGVvIHN0b3BzIGJlY2F1c2UgaXQgbmVlZHMgdG8gYnVmZmVyIHRoZSBuZXh0IGZyYW1lXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB3YWl0aW5nXCIsIHByb3ZpZGVyLmdldFN0YXRlKCkpO1xuICAgICAgICBpZihwcm92aWRlci5pc1NlZWtpbmcoKSl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICAgICAgfWVsc2UgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBzdGFsbGVkID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1NUQUxMRUQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnZvbHVtZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHZvbHVtZWNoYW5nZVwiLCBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIHtcbiAgICAgICAgICAgIHZvbHVtZTogTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCksXG4gICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5lcnJvciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29kZSA9IChlbFZpZGVvLmVycm9yICYmIGVsVmlkZW8uZXJyb3IuY29kZSkgfHwgMDtcbiAgICAgICAgbGV0IGNvbnZlcnRlZEVycm9Db2RlID0gKHtcbiAgICAgICAgICAgIDA6IFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgICAgICAgICAgMTogUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxuICAgICAgICAgICAgMjogUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICAgICAgICAgIDM6IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICAgICAgICAgIDQ6IFBMQVlFUl9GSUxFX0VSUk9SXG4gICAgICAgIH1bY29kZV18fDApO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlcnJvclwiLCBjb252ZXJ0ZWRFcnJvQ29kZSk7XG4gICAgICAgIGVycm9yVHJpZ2dlcihFUlJPUlMuY29kZXNbY29udmVydGVkRXJyb0NvZGVdLCBwcm92aWRlcik7XG4gICAgfTtcblxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICBlbFZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICB9KTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI3Li5cbiAqL1xuaW1wb3J0IEltYSBmcm9tIFwiYXBpL2Fkcy9pbWEvQWRcIjtcbmltcG9ydCBWYXN0IGZyb20gXCJhcGkvYWRzL3Zhc3QvQWRcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcbmltcG9ydCBFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyXCI7XG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIHBpY2tDdXJyZW50U291cmNlfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIFdBUk5fTVNHX01VVEVEUExBWSxcbiAgICBVSV9JQ09OUywgUExBWUVSX1dBUk5JTkcsXG4gICAgU1RBVEVfSURMRSwgU1RBVEVfUExBWUlORywgU1RBVEVfUEFVU0VELCBTVEFURV9DT01QTEVURSwgU1RBVEVfRVJST1IsXG4gICAgUExBWUVSX1NUQVRFLCBQTEFZRVJfQ09NUExFVEUsIFBMQVlFUl9QQVVTRSwgUExBWUVSX1BMQVksIFNUQVRFX0FEX1BMQVlJTkcsIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCxcbiAgICBBRF9DTElFTlRfR09PR0xFSU1BLCBBRF9DTElFTlRfVkFTVCxcbiAgICBQTEFZQkFDS19SQVRFX0NIQU5HRUQsIENPTlRFTlRfTVVURSwgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgQ29yZSBGb3IgSHRtbDUgVmlkZW8uXG4gKiBAcGFyYW0gICBzcGVjIG1lbWJlciB2YWx1ZVxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICBwbGF5ZXIgY29uZmlnXG4gKiBAcGFyYW0gICBvbkV4dGVuZGVkTG9hZCBvbiBsb2FkIGhhbmRsZXJcbiAqICovXG5jb25zdCBQcm92aWRlciA9IGZ1bmN0aW9uIChzcGVjLCBwbGF5ZXJDb25maWcsIG9uRXh0ZW5kZWRMb2FkKXtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbUHJvdmlkZXJdIGxvYWRlZC4gXCIpO1xuXG4gICAgbGV0IHRoYXQgPXt9O1xuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcblxuICAgIGxldCBkYXNoQXR0YWNoZWRWaWV3ID0gZmFsc2U7XG5cbiAgICBsZXQgZWxWaWRlbyA9IHNwZWMuZWxlbWVudDtcbiAgICBsZXQgYWRzID0gbnVsbCwgbGlzdGVuZXIgPSBudWxsLCB2aWRlb0VuZGVkQ2FsbGJhY2sgPSBudWxsO1xuXG4gICAgbGV0IGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcblxuICAgIGlmKHNwZWMuYWRUYWdVcmwpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbUHJvdmlkZXJdIEFkIENsaWVudCAtIFwiLCBwbGF5ZXJDb25maWcuZ2V0QWRDbGllbnQoKSk7XG4gICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRBZENsaWVudCgpID09PSBBRF9DTElFTlRfVkFTVCl7XG4gICAgICAgICAgICBhZHMgPSBWYXN0KGVsVmlkZW8sIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgYWRzID0gSW1hKGVsVmlkZW8sIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighYWRzKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihlbFZpZGVvLCB0aGF0LCBhZHMgPyBhZHMudmlkZW9FbmRlZENhbGxiYWNrIDogbnVsbCk7XG4gICAgZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5ZXJDb25maWcuZ2V0UGxheWJhY2tSYXRlKCk7XG5cbiAgICBjb25zdCBfbG9hZCA9IChsYXN0UGxheVBvc2l0aW9uKSA9PntcblxuICAgICAgICBjb25zdCBzb3VyY2UgPSAgc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV07XG4gICAgICAgIHNwZWMuZnJhbWVyYXRlID0gc291cmNlLmZyYW1lcmF0ZTtcblxuICAgICAgICB0aGF0LnNldFZvbHVtZShwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpO1xuXG4gICAgICAgIGlmKCFzcGVjLmZyYW1lcmF0ZSl7XG4gICAgICAgICAgICAvL2luaXQgdGltZWNvZGUgbW9kZVxuICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFRpbWVjb2RlTW9kZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZihvbkV4dGVuZGVkTG9hZCl7XG4gICAgICAgICAgICBvbkV4dGVuZGVkTG9hZChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pO1xuXG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xuXG4gICAgICAgICAgICBsZXQgcHJldmlvdXNTb3VyY2UgPSBlbFZpZGVvLnNyYztcblxuICAgICAgICAgICAgLy8gY29uc3Qgc291cmNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xuICAgICAgICAgICAgLy8gc291cmNlRWxlbWVudC5zcmMgPSBzb3VyY2UuZmlsZTtcblxuICAgICAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2UuZmlsZSAhPT0gcHJldmlvdXNTb3VyY2UpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcblxuICAgICAgICAgICAgICAgIGVsVmlkZW8uc3JjID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgICAgICAvL0Rvbid0IHVzZSB0aGlzLiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDYzNzc4NC9kZXRlY3QtYW4tZXJyb3Itb24taHRtbDUtdmlkZW9cbiAgICAgICAgICAgICAgICAvL2VsVmlkZW8uYXBwZW5kKHNvdXJjZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGNhbGwgbG9hZCBpZiBzcmMgd2FzIG5vdCBzZXQuIGxvYWQoKSB3aWxsIGNhbmNlbCBhbnkgYWN0aXZlIHBsYXkgcHJvbWlzZS5cbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNTb3VyY2UgfHwgcHJldmlvdXNTb3VyY2UgPT09ICcnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9ZWxzZSBpZihsYXN0UGxheVBvc2l0aW9uID09PSAwICYmIGVsVmlkZW8uY3VycmVudFRpbWUgPiAwKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcbiAgICAgICAgICAgICAgICAvLyB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcblxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyp0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNwZWMuY3VycmVudFNvdXJjZVxuICAgICAgICAgICAgfSk7Ki9cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMubmFtZTtcbiAgICB9O1xuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XG4gICAgICAgIHNwZWMuY2FuU2VlayA9IGNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XG4gICAgICAgIHJldHVybiBzcGVjLnNlZWtpbmc7XG4gICAgfTtcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcbiAgICAgICAgc3BlYy5zZWVraW5nID0gc2Vla2luZztcbiAgICB9O1xuICAgIHRoYXQuc2V0TWV0YUxvYWRlZCA9ICgpID0+IHtcbiAgICAgICAgc3BlYy5pc0xvYWRlZCA9IHRydWU7XG4gICAgfVxuICAgIHRoYXQubWV0YUxvYWRlZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNMb2FkZWQ7XG4gICAgfVxuXG4gICAgdGhhdC5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgPT4ge1xuICAgICAgICBpZihzcGVjLnN0YXRlICE9PSBuZXdTdGF0ZSl7XG4gICAgICAgICAgICBsZXQgcHJldlN0YXRlID0gc3BlYy5zdGF0ZTtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiBzZXRTdGF0ZSgpXCIsIG5ld1N0YXRlKTtcblxuICAgICAgICAgICAgLy9Ub0RvIDogVGhpcyBpcyB0ZW1wb3JhcnkgY29kZS4gSWYgbWFpbiB2aWRlbyBvY2N1ciBlcnJvciwgcGxheWVyIGF2b2lkIGVycm9yIG1lc3NhZ2Ugb24gYWQgcGxheWluZy5cbiAgICAgICAgICAgIGlmKHByZXZTdGF0ZSA9PT0gU1RBVEVfQURfUExBWUlORyAmJiAobmV3U3RhdGUgPT09IFNUQVRFX0VSUk9SIHx8IG5ld1N0YXRlID09PSBTVEFURV9JRExFKSApe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIDIwMTktMDYtMTNcbiAgICAgICAgICAgICAqIE5vIG1vcmUgbmVjZXNzYXJ5IHRoaXMgY29kZXMuXG4gICAgICAgICAgICAgKiBDaGVja2luZyB0aGUgYXV0b1BsYXkgc3VwcG9ydCB3YXMgdXNpbmcgbWFpbiB2aWRlbyBlbGVtZW50LiBlbFZpZGVvLnBsYXkoKSAtPiB5ZXMgb3Igbm8/P1xuICAgICAgICAgICAgICogQW5kIHRoZW4gdGhhdCBjYXVzZXMgdHJpZ2dlcmluZyBwbGF5IGFuZCBwYXVzZSBldmVudC5cbiAgICAgICAgICAgICAqIEFuZCB0aGF0IGNoZWNraW5nIHdhaXRzIGZvciBlbFZpZGVvIGxvYWRlZC4gRGFzaCBsb2FkIGNvbXBsZXRpb24gdGltZSBpcyB1bmtub3duLlxuICAgICAgICAgICAgICogVGhlbiBJIGNoYW5nZWQgY2hlY2sgbWV0aG9kLiBJIG1ha2UgdGVtcG9yYXJ5IHZpZGVvIHRhZyBhbmQgaW5zZXJ0IGVtcHR5IHZpZGVvLlxuICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgIC8vaWYgKChwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BMQVlJTkcgfHwgcHJldlN0YXRlID09PSBTVEFURV9BRF9QQVVTRUQgKSAmJiAobmV3U3RhdGUgPT09IFNUQVRFX1BBVVNFRCB8fCBuZXdTdGF0ZSA9PT0gU1RBVEVfUExBWUlORykpIHtcbiAgICAgICAgICAgIC8vICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIC8vQWRzIGNoZWNrcyBjaGVja0F1dG9wbGF5U3VwcG9ydCgpLiBJdCBjYWxscyByZWFsIHBsYXkoKSBhbmQgcGF1c2UoKSB0byB2aWRlbyBlbGVtZW50LlxuICAgICAgICAgICAgLy9BbmQgdGhlbiB0aGF0IHRyaWdnZXJzIFwicGxheWluZ1wiIGFuZCBcInBhdXNlXCIuXG4gICAgICAgICAgICAvL0kgcHJldmVudCB0aGVzZSBwcm9jZXNzLlxuICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogdHJpZ2dlclNhdGF0dXNcIiwgbmV3U3RhdGUpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKG5ld1N0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QQVVTRURcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQURfUEFVU0VEIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX0FEX1BBVVNFRFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QTEFZSU5HIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfUExBWUlOR1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0FEX1BMQVlJTkcgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9BRF9QTEFZSU5HXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwZWMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcbiAgICAgICAgICAgICAgICBwcmV2c3RhdGU6IHByZXZTdGF0ZSxcbiAgICAgICAgICAgICAgICBuZXdzdGF0ZTogc3BlYy5zdGF0ZVxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcbiAgICAgICAgc3BlYy5idWZmZXIgPSBuZXdCdWZmZXI7XG4gICAgfTtcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuYnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5pc0xpdmUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmlzTGl2ZSA/IHRydWUgOiAoZWxWaWRlby5kdXJhdGlvbiA9PT0gSW5maW5pdHkpO1xuICAgIH07XG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoYXQuaXNMaXZlKCkgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uO1xuICAgIH07XG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgfTtcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby52b2x1bWUgPSB2b2x1bWUvMTAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8udm9sdW1lKjEwMDtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gIWVsVmlkZW8ubXV0ZWQ7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gc3RhdGU7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcblxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcblxuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuXG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcbiAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbiB8fCAwKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNNdXRlKCkpe1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRWb2x1bWUocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcblxuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXMpID0+e1xuXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcbiAgICAgICAgX2xvYWQoc3BlYy5zb3VyY2VzLnN0YXJ0dGltZSB8fCAwKTtcbiAgICB9O1xuXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogcGxheSgpXCIpO1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvL1RvRG8gOiBUZXN0IGl0IHRob3JvdWdobHkgYW5kIHJlbW92ZSBpc1BsYXlpbmdQcm9jZXNzaW5nLiBNb3N0IG9mIHRoZSBoYXphcmRzIGhhdmUgYmVlbiByZW1vdmVkLiBhIGxvdCBvZiBub25ibG9ja2luZyBwbGF5KCkgd2F5IC0+IGJsb2NraW5nIHBsYXkoKVxuICAgICAgICBpZihpc1BsYXlpbmdQcm9jZXNzaW5nKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSB0cnVlO1xuICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgaWYgKCAgKGFkcyAmJiBhZHMuaXNBY3RpdmUoKSkgfHwgKGFkcyAmJiAhYWRzLnN0YXJ0ZWQoKSkgKSB7XG4gICAgICAgICAgICAgICAgYWRzLnBsYXkoKS50aGVuKF8gPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2FkcyBwbGF5IHN1Y2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IGFkcyBwbGF5IHN1Y2Nlc3NcIik7XG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vYWRzIHBsYXkgZmFpbCBtYXliZSBjYXVzZSB1c2VyIGludGVyYWN0aXZlIGxlc3NcbiAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IGFkcyBwbGF5IGZhaWxcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZSA9IGVsVmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgICAgIGlmIChwcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHZpZGVvIHBsYXkgc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihtdXRlZFBsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfV0FSTklORywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlIDogV0FSTl9NU0dfTVVURURQTEFZLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lciA6IDEwICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbkNsYXNzIDogVUlfSUNPTlMudm9sdW1lX211dGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2tDYWxsYmFjayA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IGVycm9yXCIsIGVycm9yLm1lc3NhZ2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIW11dGVkUGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAvL0lFIHByb21pc2UgaXMgdW5kZWZpbmRlZC5cbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IHN1Y2Nlc3MgKGllKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogcGF1c2UoKVwiKTtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICB9ZWxzZSBpZih0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcpe1xuICAgICAgICAgICAgYWRzLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbFZpZGVvLmN1cnJlbnRUaW1lID0gcG9zaXRpb247XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwge3BsYXliYWNrUmF0ZSA6IHBsYXliYWNrUmF0ZX0pO1xuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGU7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCkge1xuXG4gICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXG4gICAgICAgICAgICAgICAgaW5kZXggOiBpbmRleFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc291cmNlLmxvd0xhdGVuY3kpIHtcbiAgICAgICAgICAgICAgICBvYmoubG93TGF0ZW5jeSA9IHNvdXJjZS5sb3dMYXRlbmN5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcblxuICAgICAgICBpZihzb3VyY2VJbmRleCA+IC0xKXtcbiAgICAgICAgICAgIGlmKHNwZWMuc291cmNlcyAmJiBzcGVjLnNvdXJjZXMubGVuZ3RoID4gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIC8vdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgY2hhbmdlZCA6IFwiICsgc291cmNlSW5kZXgpO1xuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHNvdXJjZUluZGV4O1xuXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc291cmNlSW5kZXhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlSW5kZXgoc291cmNlSW5kZXgpO1xuICAgICAgICAgICAgICAgIC8vcGxheWVyQ29uZmlnLnNldFNvdXJjZUxhYmVsKHNwZWMuc291cmNlc1tzb3VyY2VJbmRleF0ubGFiZWwpO1xuICAgICAgICAgICAgICAgIC8vc3BlYy5jdXJyZW50UXVhbGl0eSA9IHNvdXJjZUluZGV4O1xuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgaWYobmVlZFByb3ZpZGVyQ2hhbmdlKXtcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQoZWxWaWRlby5jdXJyZW50VGltZSB8fCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMucXVhbGl0eUxldmVscztcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgfTtcblxuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEZyYW1lcmF0ZSA9IChmcmFtZXJhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlID0gZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT57XG4gICAgICAgIGxldCBmcHMgPSBzcGVjLmZyYW1lcmF0ZTtcbiAgICAgICAgbGV0IGN1cnJlbnRGcmFtZXMgPSBlbFZpZGVvLmN1cnJlbnRUaW1lICogZnBzO1xuICAgICAgICBsZXQgbmV3UG9zaXRpb24gPSAoY3VycmVudEZyYW1lcyArIGZyYW1lQ291bnQpIC8gZnBzO1xuICAgICAgICBuZXdQb3NpdGlvbiA9IG5ld1Bvc2l0aW9uICsgMC4wMDAwMTsgLy8gRklYRVMgQSBTQUZBUkkgU0VFSyBJU1NVRS4gbXlWZGllby5jdXJyZW50VGltZSA9IDAuMDQgd291bGQgZ2l2ZSBTTVBURSAwMDowMDowMDowMCB3aGVyYXMgaXQgc2hvdWxkIGdpdmUgMDA6MDA6MDA6MDFcblxuICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgIHRoYXQuc2VlayhuZXdQb3NpdGlvbik7XG4gICAgfTtcblxuICAgIHRoYXQuc3RvcCA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdwcmVsb2FkJyk7XG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgd2hpbGUgKGVsVmlkZW8uZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVDaGlsZChlbFZpZGVvLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnN0b3AoKTtcbiAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xuICAgICAgICAvL2VsVmlkZW8ucmVtb3ZlKCk7XG5cbiAgICAgICAgaWYoYWRzKXtcbiAgICAgICAgICAgIGFkcy5kZXN0cm95KCk7XG4gICAgICAgICAgICBhZHMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG4gICAgfTtcblxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9