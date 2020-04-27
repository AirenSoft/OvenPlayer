/*! OvenPlayerv0.9.850 | (c)2020 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsInRvRml4ZWQiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsInRyaWdnZXIiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJzZXRTdGF0ZSIsImxvYWRlZGRhdGEiLCJsb2FkZWRtZXRhZGF0YSIsInNvdXJjZXMiLCJnZXRTb3VyY2VzIiwic291cmNlSW5kZXgiLCJnZXRDdXJyZW50U291cmNlIiwidHlwZSIsIm1ldGFkYXRhIiwiZHVyYXRpb24iLCJpc0xpdmUiLCJJbmZpbml0eSIsInNldE1ldGFMb2FkZWQiLCJDT05URU5UX01FVEEiLCJwYXVzZSIsIlNUQVRFX0VSUk9SIiwiZXJyb3IiLCJjdXJyZW50VGltZSIsIlNUQVRFX1BBVVNFRCIsInBsYXkiLCJwYXVzZWQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfTE9BRElORyIsInBsYXlpbmciLCJ0aW1lUmFuZ2VzIiwiYnVmZmVyZWQiLCJsZW5ndGgiLCJlbmQiLCJzZXRCdWZmZXIiLCJDT05URU5UX0JVRkZFUiIsImJ1ZmZlclBlcmNlbnQiLCJ0aW1ldXBkYXRlIiwiaXNOYU4iLCJpc1NlZWtpbmciLCJTVEFURV9TVEFMTEVEIiwiU1RBVEVfQURfUExBWUlORyIsIkNPTlRFTlRfVElNRSIsInNlZWtpbmciLCJzZXRTZWVraW5nIiwiQ09OVEVOVF9TRUVLIiwic2Vla2VkIiwiQ09OVEVOVF9TRUVLRUQiLCJ3YWl0aW5nIiwidm9sdW1lY2hhbmdlIiwicm91bmQiLCJ2b2x1bWUiLCJDT05URU5UX1ZPTFVNRSIsIm11dGUiLCJtdXRlZCIsImNvZGUiLCJjb252ZXJ0ZWRFcnJvQ29kZSIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiRVJST1JTIiwiY29kZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldmVudE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVzdHJveSIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsIm9uRXh0ZW5kZWRMb2FkIiwiZGFzaEF0dGFjaGVkVmlldyIsImFkcyIsImxpc3RlbmVyIiwiaXNQbGF5aW5nUHJvY2Vzc2luZyIsImFkVGFnVXJsIiwiZ2V0QWRDbGllbnQiLCJBRF9DTElFTlRfVkFTVCIsImNvbnNvbGUiLCJwbGF5YmFja1JhdGUiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwiY3VycmVudFNvdXJjZSIsImZyYW1lcmF0ZSIsInNldFZvbHVtZSIsImdldFZvbHVtZSIsInNldFRpbWVjb2RlTW9kZSIsInByZXZpb3VzU291cmNlIiwic3JjIiwic291cmNlQ2hhbmdlZCIsImZpbGUiLCJsb2FkIiwic2VlayIsImlzQXV0b1N0YXJ0IiwiZ2V0TmFtZSIsIm5hbWUiLCJjYW5TZWVrIiwiaXNMb2FkZWQiLCJtZXRhTG9hZGVkIiwibmV3U3RhdGUiLCJzdGF0ZSIsInByZXZTdGF0ZSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIm5ld3N0YXRlIiwiU1RBVEVfQURfUEFVU0VEIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfU1RBVEUiLCJwcmV2c3RhdGUiLCJuZXdCdWZmZXIiLCJidWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsImdldFBvc2l0aW9uIiwic2V0TXV0ZSIsIkNPTlRFTlRfTVVURSIsImdldE11dGUiLCJwcmVsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpc011dGUiLCJzdGFydHRpbWUiLCJpc0FjdGl2ZSIsInN0YXJ0ZWQiLCJ0aGVuIiwicHJvbWlzZSIsInVuZGVmaW5lZCIsIm1lc3NhZ2UiLCJzZXRQbGF5YmFja1JhdGUiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJtYXAiLCJpbmRleCIsIm9iaiIsImxhYmVsIiwibG93TGF0ZW5jeSIsInNldEN1cnJlbnRTb3VyY2UiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwic2V0U291cmNlSW5kZXgiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldEZyYW1lcmF0ZSIsInNldEZyYW1lcmF0ZSIsInNlZWtGcmFtZSIsImZyYW1lQ291bnQiLCJmcHMiLCJjdXJyZW50RnJhbWVzIiwibmV3UG9zaXRpb24iLCJzdG9wIiwicmVtb3ZlQXR0cmlidXRlIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwib2ZmIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBNkJBOztBQUVBOzs7Ozs7QUFPQSxJQUFNQSxXQUFXLFNB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QUFRa0wsVUFBNUI7QUFDSDtBQUNEcEwsYUFBS21DLEtBQUw7QUFDQW5DLGFBQUtxQixRQUFMLENBQWNGLHFCQUFkO0FBQ0gsS0FaRDs7QUFjQW5CLFNBQUtxRixPQUFMLEdBQWUsWUFBSztBQUNoQixZQUFHLENBQUNuRixPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7QUFDREYsYUFBS2tMLElBQUw7QUFDQXRGLGlCQUFTUCxPQUFUO0FBQ0E7O0FBRUEsWUFBR00sR0FBSCxFQUFPO0FBQ0hBLGdCQUFJTixPQUFKO0FBQ0FNLGtCQUFNLElBQU47QUFDSDtBQUNEM0YsYUFBS3NMLEdBQUw7QUFDQXhMLDBCQUFrQkMsR0FBbEIsQ0FBc0IseURBQXRCO0FBQ0gsS0FkRDs7QUFnQkE7QUFDQTtBQUNBQyxvQkFBYSxVQUFDcUgsSUFBRCxFQUFVO0FBQ25CLFlBQU1rRSxTQUFTdkwsS0FBS3FILElBQUwsQ0FBZjtBQUNBLGVBQU8sWUFBVTtBQUNiLG1CQUFPa0UsT0FBT0MsS0FBUCxDQUFheEwsSUFBYixFQUFtQnlMLFNBQW5CLENBQVA7QUFDSCxTQUZEO0FBR0gsS0FMRDtBQU1BLFdBQU96TCxJQUFQO0FBRUgsQ0E1ZUQ7O3FCQThlZXNGLFEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEVSUk9SUyxcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUFJPVklERVJfSFRNTDUsXG4gICAgUFJPVklERVJfV0VCUlRDLFxuICAgIFBST1ZJREVSX0RBU0gsXG4gICAgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIGVycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuXG4vKipcbiAqIEBicmllZiAgIFRyaWdnZXIgb24gdmFyaW91cyB2aWRlbyBldmVudHMuXG4gKiBAcGFyYW0gICBleHRlbmRlZEVsZW1lbnQgZXh0ZW5kZWQgbWVkaWEgb2JqZWN0IGJ5IG1zZS5cbiAqIEBwYXJhbSAgIFByb3ZpZGVyIHByb3ZpZGVyICBodG1sNVByb3ZpZGVyXG4gKiAqL1xuXG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxlbWVudCwgcHJvdmlkZXIsIHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgY29uc3QgbG93TGV2ZWxFdmVudHMgPSB7fTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgbG9hZGVkLlwiLGVsZW1lbnQgLHByb3ZpZGVyICk7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuXG4gICAgbGV0IHN0YWxsZWQgPSAtMTtcbiAgICBsZXQgZWxWaWRlbyA9ICBlbGVtZW50O1xuICAgIGNvbnN0IGJldHdlZW4gPSBmdW5jdGlvbiAobnVtLCBtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4obnVtLCBtYXgpLCBtaW4pO1xuICAgIH1cbiAgICBjb25zdCBjb21wYXJlU3RhbGxlZFRpbWUgPSBmdW5jdGlvbihzdGFsbGVkLCBwb3NpdGlvbil7XG4gICAgICAgIC8vT3JpZ2luYWwgQ29kZSBpcyBzdGFsbGVkICE9PSBwb3NpdGlvblxuICAgICAgICAvL0JlY2F1c2UgRGFzaGpzIGlzIHZlcnkgbWV0aWN1bG91cy4gVGhlbiBhbHdheXMgZGlmZnJlbmNlIHN0YWxsZWQgYW5kIHBvc2l0aW9uLlxuICAgICAgICAvL1RoYXQgaXMgd2h5IHdoZW4gSSB1c2UgdG9GaXhlZCgyKS5cbiAgICAgICAgcmV0dXJuIHN0YWxsZWQudG9GaXhlZCgyKSA9PT0gcG9zaXRpb24udG9GaXhlZCgyKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuY2FucGxheSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGNhbiBzdGFydCBwbGF5aW5nIHRoZSBhdWRpby92aWRlb1xuICAgICAgICBwcm92aWRlci5zZXRDYW5TZWVrKHRydWUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSX0ZVTEwpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gY2FucGxheVwiKTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuZHVyYXRpb25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgZHVyYXRpb24gb2YgdGhlIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWRcbiAgICAgICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MoKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGR1cmF0aW9uY2hhbmdlXCIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5lbmRlZCA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXlsaXN0IGlzIGVuZGVkXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlbmRlZFwiKTtcblxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9JRExFICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0NPTVBMRVRFKXtcbiAgICAgICAgICAgIGlmKHZpZGVvRW5kZWRDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgdmlkZW9FbmRlZENhbGxiYWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZSBvZiB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgLy9EbyBub3RoaW5nIEJlY2F1c2UgdGhpcyBjYXVzZXMgY2hhb3MgYnkgbG9hZGVkbWV0YWRhdGEuXG4gICAgICAgIC8qXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IGVsVmlkZW8udmlkZW9XaWR0aFxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCBtZXRhIGRhdGEgZm9yIHRoZSBhdWRpby92aWRlb1xuXG4gICAgICAgIGxldCBzb3VyY2VzID0gcHJvdmlkZXIuZ2V0U291cmNlcygpO1xuICAgICAgICBsZXQgc291cmNlSW5kZXggPSBwcm92aWRlci5nZXRDdXJyZW50U291cmNlKCk7XG4gICAgICAgIGxldCB0eXBlID0gc291cmNlSW5kZXggPiAtMSA/IHNvdXJjZXNbc291cmNlSW5kZXhdLnR5cGUgOiBcIlwiO1xuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgICAgICAgICBkdXJhdGlvbjogcHJvdmlkZXIuaXNMaXZlKCkgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgdHlwZSA6dHlwZVxuICAgICAgICB9O1xuXG4gICAgICAgIHByb3ZpZGVyLnNldE1ldGFMb2FkZWQoKTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gbG9hZGVkbWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBwYXVzZWRcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQ09NUExFVEUgfHwgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfRVJST1Ipe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uZW5kZWQpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uZXJyb3Ipe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGVsVmlkZW8uY3VycmVudFRpbWUgPT09IGVsVmlkZW8uZHVyYXRpb24pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwYXVzZVwiKTtcblxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xuXG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gc3RhcnRlZCBvciBpcyBubyBsb25nZXIgcGF1c2VkXG4gICAgICAgIHN0YWxsZWQgPSAtMTtcbiAgICAgICAgaWYgKCFlbFZpZGVvLnBhdXNlZCAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5aW5nID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGlzIHBsYXlpbmcgYWZ0ZXIgaGF2aW5nIGJlZW4gcGF1c2VkIG9yIHN0b3BwZWQgZm9yIGJ1ZmZlcmluZ1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheWluZ1wiKTtcbiAgICAgICAgaWYoc3RhbGxlZCA8IDApe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBpcyBkb3dubG9hZGluZyB0aGUgYXVkaW8vdmlkZW9cbiAgICAgICAgbGV0IHRpbWVSYW5nZXMgPSBlbFZpZGVvLmJ1ZmZlcmVkO1xuICAgICAgICBpZighdGltZVJhbmdlcyApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbiwgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICBsZXQgYnVmZmVyZWQgPSBiZXR3ZWVuKCAodGltZVJhbmdlcy5sZW5ndGg+IDAgPyB0aW1lUmFuZ2VzLmVuZCh0aW1lUmFuZ2VzLmxlbmd0aCAtIDEpIDogMCApIC8gZHVyYXRpb24sIDAsIDEpO1xuXG4gICAgICAgIHByb3ZpZGVyLnNldEJ1ZmZlcihidWZmZXJlZCoxMDApO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSLCB7XG4gICAgICAgICAgICBidWZmZXJQZXJjZW50OiBidWZmZXJlZCoxMDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogIHBvc2l0aW9uLFxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcHJvZ3Jlc3NcIiwgYnVmZmVyZWQqMTAwKTtcbiAgICB9O1xuXG5cbiAgICBsb3dMZXZlbEV2ZW50cy50aW1ldXBkYXRlID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbjtcbiAgICAgICAgaWYgKGlzTmFOKGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Tb21ldGltZXMgZGFzaCBsaXZlIGdhdmUgdG8gbWUgY3JhenkgZHVyYXRpb24uICg5MDA3MTk5MjU0NzQwOTkxLi4uKSB3aHk/Pz9cbiAgICAgICAgaWYoZHVyYXRpb24gPiA5MDAwMDAwMDAwMDAwMDAwKXsgICAgLy85MDA3MTk5MjU0NzQwOTkxXG4gICAgICAgICAgICBkdXJhdGlvbiA9IEluZmluaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpICYmICFlbFZpZGVvLnBhdXNlZCAmJiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfU1RBTExFRCB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9MT0FESU5HIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcpICYmXG4gICAgICAgICAgICAhY29tcGFyZVN0YWxsZWRUaW1lKHN0YWxsZWQsIHBvc2l0aW9uKSApe1xuICAgICAgICAgICAgc3RhbGxlZCA9IC0xO1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyB8fCBwcm92aWRlci5pc1NlZWtpbmcoKSkge1xuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtpbmcgPSAoKSA9PiB7XG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcodHJ1ZSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVraW5nXCIsIGVsVmlkZW8uY3VycmVudFRpbWUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFSyx7XG4gICAgICAgICAgICBwb3NpdGlvbiA6IGVsVmlkZW8uY3VycmVudFRpbWVcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50cy5zZWVrZWQgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtlZFwiKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyhmYWxzZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLRUQpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5zdGFsbGVkID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc3RhbGxlZFwiKTtcbiAgICAgICAgLy9UaGlzIGNhbGxiYWNrIGRvZXMgbm90IHdvcmsgb24gY2hyb21lLiBUaGlzIGNhbGxzIG9uIEZpcmVmb3ggaW50ZXJtaXR0ZW50LiBUaGVuIGRvIG5vdCB3b3JrIGhlcmUuIHVzaW5nIHdhaXRpbmcgZXZlbnQuXG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLndhaXRpbmcgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgdmlkZW8gc3RvcHMgYmVjYXVzZSBpdCBuZWVkcyB0byBidWZmZXIgdGhlIG5leHQgZnJhbWVcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIiwgcHJvdmlkZXIuZ2V0U3RhdGUoKSk7XG4gICAgICAgIGlmKHByb3ZpZGVyLmlzU2Vla2luZygpKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuICAgICAgICB9ZWxzZSBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIHN0YWxsZWQgPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfU1RBTExFRCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMudm9sdW1lY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gdm9sdW1lY2hhbmdlXCIsIE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwge1xuICAgICAgICAgICAgdm9sdW1lOiBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSxcbiAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb2RlID0gKGVsVmlkZW8uZXJyb3IgJiYgZWxWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xuICAgICAgICBsZXQgY29udmVydGVkRXJyb0NvZGUgPSAoe1xuICAgICAgICAgICAgMDogUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgICAgICAgICAxOiBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgICAgICAgICAyOiBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgICAgICAgICAgMzogUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxuICAgICAgICAgICAgNDogUExBWUVSX0ZJTEVfRVJST1JcbiAgICAgICAgfVtjb2RlXXx8MCk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVycm9yXCIsIGNvbnZlcnRlZEVycm9Db2RlKTtcbiAgICAgICAgZXJyb3JUcmlnZ2VyKEVSUk9SUy5jb2Rlc1tjb252ZXJ0ZWRFcnJvQ29kZV0sIHByb3ZpZGVyKTtcbiAgICB9O1xuXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIGVsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgIH0pO1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XG5cbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjcuLlxuICovXG5pbXBvcnQgSW1hIGZyb20gXCJhcGkvYWRzL2ltYS9BZFwiO1xuaW1wb3J0IFZhc3QgZnJvbSBcImFwaS9hZHMvdmFzdC9BZFwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXJcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgcGlja0N1cnJlbnRTb3VyY2V9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgV0FSTl9NU0dfTVVURURQTEFZLFxuICAgIFVJX0lDT05TLCBQTEFZRVJfV0FSTklORyxcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLCBTVEFURV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsIFBMQVlFUl9DT01QTEVURSwgUExBWUVSX1BBVVNFLCBQTEFZRVJfUExBWSwgU1RBVEVfQURfUExBWUlORywgU1RBVEVfQURfUEFVU0VELFxuICAgIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBDT05URU5UX1NPVVJDRV9DSEFOR0VELFxuICAgIEFEX0NMSUVOVF9HT09HTEVJTUEsIEFEX0NMSUVOVF9WQVNULFxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBDb3JlIEZvciBIdG1sNSBWaWRlby5cbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcbiAqIEBwYXJhbSAgIG9uRXh0ZW5kZWRMb2FkIG9uIGxvYWQgaGFuZGxlclxuICogKi9cbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24gKHNwZWMsIHBsYXllckNvbmZpZywgb25FeHRlbmRlZExvYWQpe1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltQcm92aWRlcl0gbG9hZGVkLiBcIik7XG5cbiAgICBsZXQgdGhhdCA9e307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG4gICAgbGV0IGRhc2hBdHRhY2hlZFZpZXcgPSBmYWxzZTtcblxuICAgIGxldCBlbFZpZGVvID0gc3BlYy5lbGVtZW50O1xuICAgIGxldCBhZHMgPSBudWxsLCBsaXN0ZW5lciA9IG51bGwsIHZpZGVvRW5kZWRDYWxsYmFjayA9IG51bGw7XG5cbiAgICBsZXQgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuXG4gICAgaWYoc3BlYy5hZFRhZ1VybCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltQcm92aWRlcl0gQWQgQ2xpZW50IC0gXCIsIHBsYXllckNvbmZpZy5nZXRBZENsaWVudCgpKTtcbiAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldEFkQ2xpZW50KCkgPT09IEFEX0NMSUVOVF9WQVNUKXtcbiAgICAgICAgICAgIGFkcyA9IFZhc3QoZWxWaWRlbywgdGhhdCwgcGxheWVyQ29uZmlnLCBzcGVjLmFkVGFnVXJsKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBhZHMgPSBJbWEoZWxWaWRlbywgdGhhdCwgcGxheWVyQ29uZmlnLCBzcGVjLmFkVGFnVXJsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFhZHMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYW4gbm90IGxvYWQgZHVlIHRvIGdvb2dsZSBpbWEgZm9yIEFkcy5cIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKGVsVmlkZW8sIHRoYXQsIGFkcyA/IGFkcy52aWRlb0VuZGVkQ2FsbGJhY2sgOiBudWxsKTtcbiAgICBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXllckNvbmZpZy5nZXRQbGF5YmFja1JhdGUoKTtcblxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xuXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcbiAgICAgICAgc3BlYy5mcmFtZXJhdGUgPSBzb3VyY2UuZnJhbWVyYXRlO1xuXG4gICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XG5cbiAgICAgICAgaWYoIXNwZWMuZnJhbWVyYXRlKXtcbiAgICAgICAgICAgIC8vaW5pdCB0aW1lY29kZSBtb2RlXG4gICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9uRXh0ZW5kZWRMb2FkKXtcbiAgICAgICAgICAgIG9uRXh0ZW5kZWRMb2FkKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbik7XG5cbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBsb2FkZWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XG5cbiAgICAgICAgICAgIGxldCBwcmV2aW91c1NvdXJjZSA9IGVsVmlkZW8uc3JjO1xuXG4gICAgICAgICAgICAvLyBjb25zdCBzb3VyY2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XG4gICAgICAgICAgICAvLyBzb3VyY2VFbGVtZW50LnNyYyA9IHNvdXJjZS5maWxlO1xuXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VDaGFuZ2VkID0gKHNvdXJjZS5maWxlICE9PSBwcmV2aW91c1NvdXJjZSk7XG4gICAgICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xuXG4gICAgICAgICAgICAgICAgZWxWaWRlby5zcmMgPSBzb3VyY2UuZmlsZTtcblxuICAgICAgICAgICAgICAgIC8vRG9uJ3QgdXNlIHRoaXMuIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwNjM3Nzg0L2RldGVjdC1hbi1lcnJvci1vbi1odG1sNS12aWRlb1xuICAgICAgICAgICAgICAgIC8vZWxWaWRlby5hcHBlbmQoc291cmNlRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgY2FsbCBsb2FkIGlmIHNyYyB3YXMgbm90IHNldC4gbG9hZCgpIHdpbGwgY2FuY2VsIGFueSBhY3RpdmUgcGxheSBwcm9taXNlLlxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NvdXJjZSB8fCBwcmV2aW91c1NvdXJjZSA9PT0gJycpIHtcblxuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgZWxWaWRlby5jdXJyZW50VGltZSA+IDApe1xuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xuICAgICAgICAgICAgICAgIC8vIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKnRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc3BlYy5jdXJyZW50U291cmNlXG4gICAgICAgICAgICB9KTsqL1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5uYW1lO1xuICAgIH07XG4gICAgdGhhdC5jYW5TZWVrID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5jYW5TZWVrO1xuICAgIH07XG4gICAgdGhhdC5zZXRDYW5TZWVrID0gKGNhblNlZWspID0+IHtcbiAgICAgICAgc3BlYy5jYW5TZWVrID0gY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuaXNTZWVraW5nID0gKCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuc2Vla2luZztcbiAgICB9O1xuICAgIHRoYXQuc2V0U2Vla2luZyA9IChzZWVraW5nKT0+e1xuICAgICAgICBzcGVjLnNlZWtpbmcgPSBzZWVraW5nO1xuICAgIH07XG4gICAgdGhhdC5zZXRNZXRhTG9hZGVkID0gKCkgPT4ge1xuICAgICAgICBzcGVjLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIHRoYXQubWV0YUxvYWRlZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNMb2FkZWQ7XG4gICAgfTtcblxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHNwZWMuc3RhdGU7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogc2V0U3RhdGUoKVwiLCBuZXdTdGF0ZSk7XG5cbiAgICAgICAgICAgIC8vVG9EbyA6IFRoaXMgaXMgdGVtcG9yYXJ5IGNvZGUuIElmIG1haW4gdmlkZW8gb2NjdXIgZXJyb3IsIHBsYXllciBhdm9pZCBlcnJvciBtZXNzYWdlIG9uIGFkIHBsYXlpbmcuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BMQVlJTkcgJiYgKG5ld1N0YXRlID09PSBTVEFURV9FUlJPUiB8fCBuZXdTdGF0ZSA9PT0gU1RBVEVfSURMRSkgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiAyMDE5LTA2LTEzXG4gICAgICAgICAgICAgKiBObyBtb3JlIG5lY2Vzc2FyeSB0aGlzIGNvZGVzLlxuICAgICAgICAgICAgICogQ2hlY2tpbmcgdGhlIGF1dG9QbGF5IHN1cHBvcnQgd2FzIHVzaW5nIG1haW4gdmlkZW8gZWxlbWVudC4gZWxWaWRlby5wbGF5KCkgLT4geWVzIG9yIG5vPz9cbiAgICAgICAgICAgICAqIEFuZCB0aGVuIHRoYXQgY2F1c2VzIHRyaWdnZXJpbmcgcGxheSBhbmQgcGF1c2UgZXZlbnQuXG4gICAgICAgICAgICAgKiBBbmQgdGhhdCBjaGVja2luZyB3YWl0cyBmb3IgZWxWaWRlbyBsb2FkZWQuIERhc2ggbG9hZCBjb21wbGV0aW9uIHRpbWUgaXMgdW5rbm93bi5cbiAgICAgICAgICAgICAqIFRoZW4gSSBjaGFuZ2VkIGNoZWNrIG1ldGhvZC4gSSBtYWtlIHRlbXBvcmFyeSB2aWRlbyB0YWcgYW5kIGluc2VydCBlbXB0eSB2aWRlby5cbiAgICAgICAgICAgICAqICovXG4gICAgICAgICAgICAvL2lmICgocHJldlN0YXRlID09PSBTVEFURV9BRF9QTEFZSU5HIHx8IHByZXZTdGF0ZSA9PT0gU1RBVEVfQURfUEFVU0VEICkgJiYgKG5ld1N0YXRlID09PSBTVEFURV9QQVVTRUQgfHwgbmV3U3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpKSB7XG4gICAgICAgICAgICAvLyAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAvL0FkcyBjaGVja3MgY2hlY2tBdXRvcGxheVN1cHBvcnQoKS4gSXQgY2FsbHMgcmVhbCBwbGF5KCkgYW5kIHBhdXNlKCkgdG8gdmlkZW8gZWxlbWVudC5cbiAgICAgICAgICAgIC8vQW5kIHRoZW4gdGhhdCB0cmlnZ2VycyBcInBsYXlpbmdcIiBhbmQgXCJwYXVzZVwiLlxuICAgICAgICAgICAgLy9JIHByZXZlbnQgdGhlc2UgcHJvY2Vzcy5cbiAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHRyaWdnZXJTYXRhdHVzXCIsIG5ld1N0YXRlKTtcblxuICAgICAgICAgICAgc3dpdGNoIChuZXdTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQ09NUExFVEUgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfUEFVU0VEXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0FEX1BBVVNFRCA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9BRF9QQVVTRURcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX1BMQVlJTkdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9BRF9QTEFZSU5HIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfQURfUExBWUlOR1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcGVjLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1NUQVRFLCB7XG4gICAgICAgICAgICAgICAgcHJldnN0YXRlOiBwcmV2U3RhdGUsXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLnN0YXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XG4gICAgICAgIHNwZWMuYnVmZmVyID0gbmV3QnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmJ1ZmZlcjtcbiAgICB9O1xuICAgIHRoYXQuaXNMaXZlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5pc0xpdmUgPyB0cnVlIDogKGVsVmlkZW8uZHVyYXRpb24gPT09IEluZmluaXR5KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGF0LmlzTGl2ZSgpID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbjtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsVmlkZW8udm9sdW1lID0gdm9sdW1lLzEwMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLnZvbHVtZSoxMDA7XG4gICAgfTtcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9ICFlbFZpZGVvLm11dGVkO1xuXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHN0YXRlO1xuXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xuICAgIH07XG5cbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbikgPT57XG5cbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcblxuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzTXV0ZSgpKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpe1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChzb3VyY2VzKSA9PntcblxuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKHNwZWMuc291cmNlcy5zdGFydHRpbWUgfHwgMCk7XG4gICAgfTtcblxuICAgIHRoYXQucGxheSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHBsYXkoKVwiKTtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Ub0RvIDogVGVzdCBpdCB0aG9yb3VnaGx5IGFuZCByZW1vdmUgaXNQbGF5aW5nUHJvY2Vzc2luZy4gTW9zdCBvZiB0aGUgaGF6YXJkcyBoYXZlIGJlZW4gcmVtb3ZlZC4gYSBsb3Qgb2Ygbm9uYmxvY2tpbmcgcGxheSgpIHdheSAtPiBibG9ja2luZyBwbGF5KClcbiAgICAgICAgaWYoaXNQbGF5aW5nUHJvY2Vzc2luZyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gdHJ1ZTtcbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIGlmICggIChhZHMgJiYgYWRzLmlzQWN0aXZlKCkpIHx8IChhZHMgJiYgIWFkcy5zdGFydGVkKCkpICkge1xuICAgICAgICAgICAgICAgIGFkcy5wbGF5KCkudGhlbihfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9hZHMgcGxheSBzdWNjZXNzXG4gICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiBhZHMgcGxheSBzdWNjZXNzXCIpO1xuXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2FkcyBwbGF5IGZhaWwgbWF5YmUgY2F1c2UgdXNlciBpbnRlcmFjdGl2ZSBsZXNzXG4gICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiBhZHMgcGxheSBmYWlsXCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IHN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobXV0ZWRQbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1dBUk5JTkcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA6IFdBUk5fTVNHX01VVEVEUExBWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXIgOiAxMCAqIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25DbGFzcyA6IFVJX0lDT05TLnZvbHVtZV9tdXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrQ2FsbGJhY2sgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogdmlkZW8gcGxheSBlcnJvclwiLCBlcnJvci5tZXNzYWdlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFtdXRlZFBsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgLy9JRSBwcm9taXNlIGlzIHVuZGVmaW5kZWQuXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogdmlkZW8gcGxheSBzdWNjZXNzIChpZSlcIik7XG4gICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHRoYXQucGF1c2UgPSAoKSA9PntcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHBhdXNlKClcIik7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgfWVsc2UgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKXtcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQudHJpZ2dlcihQTEFZQkFDS19SQVRFX0NIQU5HRUQsIHtwbGF5YmFja1JhdGUgOiBwbGF5YmFja1JhdGV9KTtcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcblxuICAgICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBzb3VyY2UudHlwZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXhcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNvdXJjZS5sb3dMYXRlbmN5KSB7XG4gICAgICAgICAgICAgICAgb2JqLmxvd0xhdGVuY3kgPSBzb3VyY2UubG93TGF0ZW5jeTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChzb3VyY2VJbmRleCwgbmVlZFByb3ZpZGVyQ2hhbmdlKSA9PiB7XG5cbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XG4gICAgICAgICAgICBpZihzcGVjLnNvdXJjZXMgJiYgc3BlYy5zb3VyY2VzLmxlbmd0aCA+IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAvL3RoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUluZGV4KHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICAvL3BsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAvL3NwZWMuY3VycmVudFF1YWxpdHkgPSBzb3VyY2VJbmRleDtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsVmlkZW8uY3VycmVudFRpbWUgfHwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG5cbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRGcmFtZXJhdGUgPSAoZnJhbWVyYXRlKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZSA9IGZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+e1xuICAgICAgICBsZXQgZnBzID0gc3BlYy5mcmFtZXJhdGU7XG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVzID0gZWxWaWRlby5jdXJyZW50VGltZSAqIGZwcztcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXG5cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xuICAgIH07XG5cbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgncHJlbG9hZCcpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIHdoaWxlIChlbFZpZGVvLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlQ2hpbGQoZWxWaWRlby5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5zdG9wKCk7XG4gICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgLy9lbFZpZGVvLnJlbW92ZSgpO1xuXG4gICAgICAgIGlmKGFkcyl7XG4gICAgICAgICAgICBhZHMuZGVzdHJveSgpO1xuICAgICAgICAgICAgYWRzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZGVzdHJveSgpIHBsYXllciBzdG9wLCBsaXN0ZW5lciwgZXZlbnQgZGVzdHJvaWVkXCIpO1xuICAgIH07XG5cbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cbiAgICAvLyB1c2UgOiBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7IC4uLiBzdXBlcl9kZXN0cm95KCk7XG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==