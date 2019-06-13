/*! OvenPlayerv0.9.5981 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

            OvenPlayerConsole.log("Provider : setState()", newState, "isAdsCheckingtime :", ads && ads.isAutoPlaySupportCheckTime());

            //ToDo : This is temporary code. avoid background content error.
            if (prevState === _constants.STATE_AD_PLAYING && (newState === _constants.STATE_ERROR || newState === _constants.STATE_IDLE)) {
                return false;
            }
            if ((prevState === _constants.STATE_AD_PLAYING || prevState === _constants.STATE_AD_PAUSED) && (newState === _constants.STATE_PAUSED || newState === _constants.STATE_PLAYING)) {
                return false;
            }
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

            /*
            if(newState === STATE_AD_PLAYING || newState === STATE_AD_PAUSED){
             }else if(ads && ads.isAutoPlaySupportCheckTime()){
                //Do nothing
                //silence Area!!!
                //Ads checks checkAutoplaySupport(). It calls real play() and pause() to video element.
                //And then that triggers "playing" and "pause".
                //I prevent these process.
            }else{
                triggerSatatus();
            }*/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsInRvRml4ZWQiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsInRyaWdnZXIiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJzZXRTdGF0ZSIsImxvYWRlZGRhdGEiLCJsb2FkZWRtZXRhZGF0YSIsInNvdXJjZXMiLCJnZXRTb3VyY2VzIiwic291cmNlSW5kZXgiLCJnZXRDdXJyZW50U291cmNlIiwidHlwZSIsIm1ldGFkYXRhIiwiZHVyYXRpb24iLCJpc0xpdmUiLCJJbmZpbml0eSIsIkNPTlRFTlRfTUVUQSIsInBhdXNlIiwiU1RBVEVfRVJST1IiLCJlcnJvciIsImN1cnJlbnRUaW1lIiwiU1RBVEVfUEFVU0VEIiwicGxheSIsInBhdXNlZCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9MT0FESU5HIiwicGxheWluZyIsInRpbWVSYW5nZXMiLCJidWZmZXJlZCIsImxlbmd0aCIsImVuZCIsInNldEJ1ZmZlciIsIkNPTlRFTlRfQlVGRkVSIiwiYnVmZmVyUGVyY2VudCIsInRpbWV1cGRhdGUiLCJpc05hTiIsImlzU2Vla2luZyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldmVudE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVzdHJveSIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsIm9uRXh0ZW5kZWRMb2FkIiwiZGFzaEF0dGFjaGVkVmlldyIsImFkcyIsImxpc3RlbmVyIiwiaXNQbGF5aW5nUHJvY2Vzc2luZyIsImFkVGFnVXJsIiwiY29uc29sZSIsInBsYXliYWNrUmF0ZSIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJjdXJyZW50U291cmNlIiwiZnJhbWVyYXRlIiwic2V0VGltZWNvZGVNb2RlIiwicHJldmlvdXNTb3VyY2UiLCJzcmMiLCJzb3VyY2VFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZmlsZSIsInNvdXJjZUNoYW5nZWQiLCJsb2FkIiwic2VlayIsImlzQXV0b1N0YXJ0IiwiZ2V0TmFtZSIsIm5hbWUiLCJjYW5TZWVrIiwibmV3U3RhdGUiLCJzdGF0ZSIsInByZXZTdGF0ZSIsImlzQXV0b1BsYXlTdXBwb3J0Q2hlY2tUaW1lIiwiU1RBVEVfQURfUEFVU0VEIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwibmV3c3RhdGUiLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld0J1ZmZlciIsImJ1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRNdXRlIiwiQ09OVEVOVF9NVVRFIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImlzTXV0ZSIsInN0YXJ0dGltZSIsImlzQWN0aXZlIiwic3RhcnRlZCIsInRoZW4iLCJwcm9taXNlIiwidW5kZWZpbmVkIiwibWVzc2FnZSIsInNldFBsYXliYWNrUmF0ZSIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIm1hcCIsImluZGV4IiwibGFiZWwiLCJzZXRDdXJyZW50U291cmNlIiwibmVlZFByb3ZpZGVyQ2hhbmdlIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsInNldFNvdXJjZUluZGV4IiwiZ2V0UXVhbGl0eUxldmVscyIsInF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsImN1cnJlbnRRdWFsaXR5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRGcmFtZXJhdGUiLCJzZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZnBzIiwiY3VycmVudEZyYW1lcyIsIm5ld1Bvc2l0aW9uIiwic3RvcCIsInJlbW92ZUF0dHJpYnV0ZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsIm9mZiIsIm1ldGhvZCIsImFwcGx5IiwiYXJndW1lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQTZCQTs7QUFFQTs7Ozs7O0FBT0EsSUFBTUEsV0FBVyxTQUFYQSxRQUFXLENBQVNDLE9BQVQsRUFBa0JD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QUNILEtBYkQ7O0FBZUE7QUFDQTtBQUNBQyxvQkFBYSxVQUFDa0gsSUFBRCxFQUFVO0FBQ25CLFlBQU1pRSxTQUFTbkwsS0FBS2tILElBQUwsQ0FBZjtBQUNBLGVBQU8sWUFBVTtBQUNiLG1CQUFPaUUsT0FBT0MsS0FBUCxDQUFhcEwsSUFBYixFQUFtQnFMLFNBQW5CLENBQVA7QUFDSCxTQUZEO0FBR0gsS0FMRDtBQU1BLFdBQU9yTCxJQUFQO0FBRUgsQ0F6Y0QsQyxDQXRCQTs7O3FCQWllZW9GLFEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRVJST1JTLFxuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfQURfUExBWUlORyxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVHJpZ2dlciBvbiB2YXJpb3VzIHZpZGVvIGV2ZW50cy5cbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLlxuICogQHBhcmFtICAgUHJvdmlkZXIgcHJvdmlkZXIgIGh0bWw1UHJvdmlkZXJcbiAqICovXG5cblxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihlbGVtZW50LCBwcm92aWRlciwgdmlkZW9FbmRlZENhbGxiYWNrKXtcbiAgICBjb25zdCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciBsb2FkZWQuXCIsZWxlbWVudCAscHJvdmlkZXIgKTtcbiAgICBjb25zdCB0aGF0ID0ge307XG5cbiAgICBsZXQgc3RhbGxlZCA9IC0xO1xuICAgIGxldCBlbFZpZGVvID0gIGVsZW1lbnQ7XG4gICAgY29uc3QgYmV0d2VlbiA9IGZ1bmN0aW9uIChudW0sIG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihudW0sIG1heCksIG1pbik7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBhcmVTdGFsbGVkVGltZSA9IGZ1bmN0aW9uKHN0YWxsZWQsIHBvc2l0aW9uKXtcbiAgICAgICAgLy9PcmlnaW5hbCBDb2RlIGlzIHN0YWxsZWQgIT09IHBvc2l0aW9uXG4gICAgICAgIC8vQmVjYXVzZSBEYXNoanMgaXMgdmVyeSBtZXRpY3Vsb3VzLiBUaGVuIGFsd2F5cyBkaWZmcmVuY2Ugc3RhbGxlZCBhbmQgcG9zaXRpb24uXG4gICAgICAgIC8vVGhhdCBpcyB3aHkgd2hlbiBJIHVzZSB0b0ZpeGVkKDIpLlxuICAgICAgICByZXR1cm4gc3RhbGxlZC50b0ZpeGVkKDIpID09PSBwb3NpdGlvbi50b0ZpeGVkKDIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5jYW5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIHByb3ZpZGVyLnNldENhblNlZWsodHJ1ZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVJfRlVMTCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBjYW5wbGF5XCIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5kdXJhdGlvbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBkdXJhdGlvbiBvZiB0aGUgYXVkaW8vdmlkZW8gaXMgY2hhbmdlZFxuICAgICAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcygpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZHVyYXRpb25jaGFuZ2VcIik7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWxpc3QgaXMgZW5kZWRcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVuZGVkXCIpO1xuXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0lETEUgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfQ09NUExFVEUpe1xuICAgICAgICAgICAgaWYodmlkZW9FbmRlZENhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICB2aWRlb0VuZGVkQ2FsbGJhY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZGRhdGEgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIHRoZSBjdXJyZW50IGZyYW1lIG9mIHRoZSBhdWRpby92aWRlb1xuICAgICAgICAvL0RvIG5vdGhpbmcgQmVjYXVzZSB0aGlzIGNhdXNlcyBjaGFvcyBieSBsb2FkZWRtZXRhZGF0YS5cbiAgICAgICAgLypcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xuICAgICAgICAgICAgZHVyYXRpb246IGVsVmlkZW8uZHVyYXRpb24sXG4gICAgICAgICAgICBoZWlnaHQ6IGVsVmlkZW8udmlkZW9IZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogZWxWaWRlby52aWRlb1dpZHRoXG4gICAgICAgIH07XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7Ki9cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkbWV0YWRhdGEgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIG1ldGEgZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvXG5cbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwcm92aWRlci5nZXRTb3VyY2VzKCk7XG4gICAgICAgIGxldCBzb3VyY2VJbmRleCA9IHByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICAgICAgbGV0IHR5cGUgPSBzb3VyY2VJbmRleCA+IC0xID8gc291cmNlc1tzb3VyY2VJbmRleF0udHlwZSA6IFwiXCI7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBwcm92aWRlci5pc0xpdmUoKSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb24sXG4gICAgICAgICAgICB0eXBlIDp0eXBlXG4gICAgICAgIH07XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRtZXRhZGF0YVwiLCBtZXRhZGF0YSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHBhdXNlZFxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9DT01QTEVURSB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9FUlJPUil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lbmRlZCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lcnJvcil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5jdXJyZW50VGltZSA9PT0gZWxWaWRlby5kdXJhdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBhdXNlXCIpO1xuXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BBVVNFRCk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXkgPSAoKSA9PiB7XG5cbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBzdGFydGVkIG9yIGlzIG5vIGxvbmdlciBwYXVzZWRcbiAgICAgICAgc3RhbGxlZCA9IC0xO1xuICAgICAgICBpZiAoIWVsVmlkZW8ucGF1c2VkICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXlpbmcgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaXMgcGxheWluZyBhZnRlciBoYXZpbmcgYmVlbiBwYXVzZWQgb3Igc3RvcHBlZCBmb3IgYnVmZmVyaW5nXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwbGF5aW5nXCIpO1xuICAgICAgICBpZihzdGFsbGVkIDwgMCl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcyA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGlzIGRvd25sb2FkaW5nIHRoZSBhdWRpby92aWRlb1xuICAgICAgICBsZXQgdGltZVJhbmdlcyA9IGVsVmlkZW8uYnVmZmVyZWQ7XG4gICAgICAgIGlmKCF0aW1lUmFuZ2VzICl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uLCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgICAgIGxldCBidWZmZXJlZCA9IGJldHdlZW4oICh0aW1lUmFuZ2VzLmxlbmd0aD4gMCA/IHRpbWVSYW5nZXMuZW5kKHRpbWVSYW5nZXMubGVuZ3RoIC0gMSkgOiAwICkgLyBkdXJhdGlvbiwgMCwgMSk7XG5cbiAgICAgICAgcHJvdmlkZXIuc2V0QnVmZmVyKGJ1ZmZlcmVkKjEwMCk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVIsIHtcbiAgICAgICAgICAgIGJ1ZmZlclBlcmNlbnQ6IGJ1ZmZlcmVkKjEwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAgcG9zaXRpb24sXG4gICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgICAgfSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwcm9ncmVzc1wiLCBidWZmZXJlZCoxMDApO1xuICAgIH07XG5cblxuICAgIGxvd0xldmVsRXZlbnRzLnRpbWV1cGRhdGUgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiBoYXMgY2hhbmdlZFxuICAgICAgICBsZXQgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICBsZXQgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uO1xuICAgICAgICBpZiAoaXNOYU4oZHVyYXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL1NvbWV0aW1lcyBkYXNoIGxpdmUgZ2F2ZSB0byBtZSBjcmF6eSBkdXJhdGlvbi4gKDkwMDcxOTkyNTQ3NDA5OTEuLi4pIHdoeT8/P1xuICAgICAgICBpZihkdXJhdGlvbiA+IDkwMDAwMDAwMDAwMDAwMDApeyAgICAvLzkwMDcxOTkyNTQ3NDA5OTFcbiAgICAgICAgICAgIGR1cmF0aW9uID0gSW5maW5pdHk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkgJiYgIWVsVmlkZW8ucGF1c2VkICYmIChwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9TVEFMTEVEIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0xPQURJTkcgfHwgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORykgJiZcbiAgICAgICAgICAgICFjb21wYXJlU3RhbGxlZFRpbWUoc3RhbGxlZCwgcG9zaXRpb24pICl7XG4gICAgICAgICAgICBzdGFsbGVkID0gLTE7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HIHx8IHByb3ZpZGVyLmlzU2Vla2luZygpKSB7XG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2luZyA9ICgpID0+IHtcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyh0cnVlKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtpbmdcIiwgZWxWaWRlby5jdXJyZW50VGltZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLLHtcbiAgICAgICAgICAgIHBvc2l0aW9uIDogZWxWaWRlby5jdXJyZW50VGltZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtlZCA9ICgpID0+IHtcbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2VkXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKGZhbHNlKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUtFRCk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnN0YWxsZWQgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzdGFsbGVkXCIpO1xuICAgICAgICAvL1RoaXMgY2FsbGJhY2sgZG9lcyBub3Qgd29yayBvbiBjaHJvbWUuIFRoaXMgY2FsbHMgb24gRmlyZWZveCBpbnRlcm1pdHRlbnQuIFRoZW4gZG8gbm90IHdvcmsgaGVyZS4gdXNpbmcgd2FpdGluZyBldmVudC5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMud2FpdGluZyA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSB2aWRlbyBzdG9wcyBiZWNhdXNlIGl0IG5lZWRzIHRvIGJ1ZmZlciB0aGUgbmV4dCBmcmFtZVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gd2FpdGluZ1wiLCBwcm92aWRlci5nZXRTdGF0ZSgpKTtcbiAgICAgICAgaWYocHJvdmlkZXIuaXNTZWVraW5nKCkpe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgIH1lbHNlIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgc3RhbGxlZCA9IGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9TVEFMTEVEKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy52b2x1bWVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB2b2x1bWVjaGFuZ2VcIiwgTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCkpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVk9MVU1FLCB7XG4gICAgICAgICAgICB2b2x1bWU6IE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApLFxuICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxWaWRlby5lcnJvciAmJiBlbFZpZGVvLmVycm9yLmNvZGUpIHx8IDA7XG4gICAgICAgIGxldCBjb252ZXJ0ZWRFcnJvQ29kZSA9ICh7XG4gICAgICAgICAgICAwOiBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICAgICAgICAgIDE6IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICAgICAgICAgIDI6IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgICAgICAgICAzOiBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgICAgICAgICA0OiBQTEFZRVJfRklMRV9FUlJPUlxuICAgICAgICB9W2NvZGVdfHwwKTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZXJyb3JcIiwgY29udmVydGVkRXJyb0NvZGUpO1xuICAgICAgICBlcnJvclRyaWdnZXIoRVJST1JTW2NvbnZlcnRlZEVycm9Db2RlXSwgcHJvdmlkZXIpO1xuICAgIH07XG5cbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgZWxWaWRlby5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgfSk7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyNy4uXG4gKi9cbmltcG9ydCBBZHMgZnJvbSBcImFwaS9wcm92aWRlci9hZHMvQWRzXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9MaXN0ZW5lclwiO1xuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBXQVJOX01TR19NVVRFRFBMQVksXG4gICAgVUlfSUNPTlMsIFBMQVlFUl9XQVJOSU5HLFxuICAgIFNUQVRFX0lETEUsIFNUQVRFX1BMQVlJTkcsIFNUQVRFX1BBVVNFRCwgU1RBVEVfQ09NUExFVEUsIFNUQVRFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLCBTVEFURV9BRF9QTEFZSU5HLCBTVEFURV9BRF9QQVVTRUQsXG4gICAgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIENPTlRFTlRfU09VUkNFX0NIQU5HRUQsXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIENvcmUgRm9yIEh0bWw1IFZpZGVvLlxuICogQHBhcmFtICAgc3BlYyBtZW1iZXIgdmFsdWVcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xuICogQHBhcmFtICAgb25FeHRlbmRlZExvYWQgb24gbG9hZCBoYW5kbGVyXG4gKiAqL1xuY29uc3QgUHJvdmlkZXIgPSBmdW5jdGlvbiAoc3BlYywgcGxheWVyQ29uZmlnLCBvbkV4dGVuZGVkTG9hZCl7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcblxuICAgIGxldCB0aGF0ID17fTtcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XG5cbiAgICBsZXQgZGFzaEF0dGFjaGVkVmlldyA9IGZhbHNlO1xuXG4gICAgbGV0IGVsVmlkZW8gPSBzcGVjLmVsZW1lbnQ7XG4gICAgbGV0IGFkcyA9IG51bGwsIGxpc3RlbmVyID0gbnVsbCwgdmlkZW9FbmRlZENhbGxiYWNrID0gbnVsbDtcblxuICAgIGxldCBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XG5cbiAgICBpZihzcGVjLmFkVGFnVXJsKXtcbiAgICAgICAgYWRzID0gQWRzKGVsVmlkZW8sIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XG4gICAgICAgIGlmKCFhZHMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYW4gbm90IGxvYWQgZHVlIHRvIGdvb2dsZSBpbWEgZm9yIEFkcy5cIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKGVsVmlkZW8sIHRoYXQsIGFkcyA/IGFkcy52aWRlb0VuZGVkQ2FsbGJhY2sgOiBudWxsKTtcbiAgICBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXllckNvbmZpZy5nZXRQbGF5YmFja1JhdGUoKTtcblxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAgc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV07XG4gICAgICAgIHNwZWMuZnJhbWVyYXRlID0gc291cmNlLmZyYW1lcmF0ZTtcbiAgICAgICAgaWYoIXNwZWMuZnJhbWVyYXRlKXtcbiAgICAgICAgICAgIC8vaW5pdCB0aW1lY29kZSBtb2RlXG4gICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9uRXh0ZW5kZWRMb2FkKXtcbiAgICAgICAgICAgIG9uRXh0ZW5kZWRMb2FkKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbik7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgbGV0IHByZXZpb3VzU291cmNlID0gZWxWaWRlby5zcmM7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XG5cbiAgICAgICAgICAgIHNvdXJjZUVsZW1lbnQuc3JjID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VDaGFuZ2VkID0gKHNvdXJjZUVsZW1lbnQuc3JjICE9PSBwcmV2aW91c1NvdXJjZSk7XG4gICAgICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xuXG4gICAgICAgICAgICAgICAgZWxWaWRlby5zcmMgPSBzb3VyY2UuZmlsZTtcblxuICAgICAgICAgICAgICAgIC8vRG9uJ3QgdXNlIHRoaXMuIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwNjM3Nzg0L2RldGVjdC1hbi1lcnJvci1vbi1odG1sNS12aWRlb1xuICAgICAgICAgICAgICAgIC8vZWxWaWRlby5hcHBlbmQoc291cmNlRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgY2FsbCBsb2FkIGlmIHNyYyB3YXMgbm90IHNldC4gbG9hZCgpIHdpbGwgY2FuY2VsIGFueSBhY3RpdmUgcGxheSBwcm9taXNlLlxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSBpZihsYXN0UGxheVBvc2l0aW9uID09PSAwICYmIGVsVmlkZW8uY3VycmVudFRpbWUgPiAwKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyp0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNwZWMuY3VycmVudFNvdXJjZVxuICAgICAgICAgICAgfSk7Ki9cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMubmFtZTtcbiAgICB9O1xuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XG4gICAgICAgIHNwZWMuY2FuU2VlayA9IGNhblNlZWs7XG4gICAgfTtcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XG4gICAgICAgIHJldHVybiBzcGVjLnNlZWtpbmc7XG4gICAgfTtcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcbiAgICAgICAgc3BlYy5zZWVraW5nID0gc2Vla2luZztcbiAgICB9O1xuXG4gICAgdGhhdC5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgPT4ge1xuICAgICAgICBpZihzcGVjLnN0YXRlICE9PSBuZXdTdGF0ZSl7XG4gICAgICAgICAgICBsZXQgcHJldlN0YXRlID0gc3BlYy5zdGF0ZTtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiBzZXRTdGF0ZSgpXCIsIG5ld1N0YXRlLCBcImlzQWRzQ2hlY2tpbmd0aW1lIDpcIiwgKGFkcyAmJiBhZHMuaXNBdXRvUGxheVN1cHBvcnRDaGVja1RpbWUoKSkpO1xuXG4gICAgICAgICAgICAvL1RvRG8gOiBUaGlzIGlzIHRlbXBvcmFyeSBjb2RlLiBhdm9pZCBiYWNrZ3JvdW5kIGNvbnRlbnQgZXJyb3IuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BMQVlJTkcgJiYgKG5ld1N0YXRlID09PSBTVEFURV9FUlJPUiB8fCBuZXdTdGF0ZSA9PT0gU1RBVEVfSURMRSkgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZigocHJldlN0YXRlID09PSBTVEFURV9BRF9QTEFZSU5HIHx8IHByZXZTdGF0ZSA9PT0gU1RBVEVfQURfUEFVU0VEICkgJiYgKG5ld1N0YXRlID09PSBTVEFURV9QQVVTRUQgfHwgbmV3U3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHRyaWdnZXJTYXRhdHVzXCIsIG5ld1N0YXRlKTtcblxuICAgICAgICAgICAgc3dpdGNoKG5ld1N0YXRlKXtcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0NPTVBMRVRFIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUEFVU0VEIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX1BBVVNFRFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9BRF9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfQURfUEFVU0VEXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BMQVlJTkcgOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QTEFZSU5HXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQURfUExBWUlORyA6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX0FEX1BMQVlJTkdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BlYy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xuICAgICAgICAgICAgICAgIHByZXZzdGF0ZSA6IHByZXZTdGF0ZSxcbiAgICAgICAgICAgICAgICBuZXdzdGF0ZTogc3BlYy5zdGF0ZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBpZihuZXdTdGF0ZSA9PT0gU1RBVEVfQURfUExBWUlORyB8fCBuZXdTdGF0ZSA9PT0gU1RBVEVfQURfUEFVU0VEKXtcblxuICAgICAgICAgICAgfWVsc2UgaWYoYWRzICYmIGFkcy5pc0F1dG9QbGF5U3VwcG9ydENoZWNrVGltZSgpKXtcbiAgICAgICAgICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICAgICAgICAgICAgICAvL3NpbGVuY2UgQXJlYSEhIVxuICAgICAgICAgICAgICAgIC8vQWRzIGNoZWNrcyBjaGVja0F1dG9wbGF5U3VwcG9ydCgpLiBJdCBjYWxscyByZWFsIHBsYXkoKSBhbmQgcGF1c2UoKSB0byB2aWRlbyBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vQW5kIHRoZW4gdGhhdCB0cmlnZ2VycyBcInBsYXlpbmdcIiBhbmQgXCJwYXVzZVwiLlxuICAgICAgICAgICAgICAgIC8vSSBwcmV2ZW50IHRoZXNlIHByb2Nlc3MuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyU2F0YXR1cygpO1xuICAgICAgICAgICAgfSovXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcbiAgICAgICAgc3BlYy5idWZmZXIgPSBuZXdCdWZmZXI7XG4gICAgfTtcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuYnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5pc0xpdmUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmlzTGl2ZSA/IHRydWUgOiAoZWxWaWRlby5kdXJhdGlvbiA9PT0gSW5maW5pdHkpO1xuICAgIH07XG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoYXQuaXNMaXZlKCkgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uO1xuICAgIH07XG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgfTtcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby52b2x1bWUgPSB2b2x1bWUvMTAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8udm9sdW1lKjEwMDtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gIWVsVmlkZW8ubXV0ZWQ7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gc3RhdGU7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcblxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcblxuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc011dGUoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFZvbHVtZShwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcbiAgICAgICAgX2xvYWQoc3BlYy5zb3VyY2VzLnN0YXJ0dGltZSB8fCAwKTtcbiAgICB9O1xuXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogcGxheSgpXCIpO1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoaXNQbGF5aW5nUHJvY2Vzc2luZyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gdHJ1ZTtcbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIGlmICggIChhZHMgJiYgYWRzLmlzQWN0aXZlKCkpIHx8IChhZHMgJiYgIWFkcy5zdGFydGVkKCkpICkge1xuICAgICAgICAgICAgICAgIGFkcy5wbGF5KCkudGhlbihfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9hZHMgcGxheSBzdWNjZXNzXG4gICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiBhZHMgcGxheSBzdWNjZXNzXCIpO1xuXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2FkcyBwbGF5IGZhaWwgbWF5YmUgY2F1c2UgdXNlciBpbnRlcmFjdGl2ZSBsZXNzXG4gICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiBhZHMgcGxheSBmYWlsXCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXIgOiB2aWRlbyBwbGF5IHN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobXV0ZWRQbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1dBUk5JTkcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA6IFdBUk5fTVNHX01VVEVEUExBWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXIgOiAxMCAqIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25DbGFzcyA6IFVJX0lDT05TLnZvbHVtZV9tdXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrQ2FsbGJhY2sgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogdmlkZW8gcGxheSBlcnJvclwiLCBlcnJvci5tZXNzYWdlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFtdXRlZFBsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgLy9JRSBwcm9taXNlIGlzIHVuZGVmaW5kZWQuXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyIDogdmlkZW8gcGxheSBzdWNjZXNzIChpZSlcIik7XG4gICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlciA6IHBhdXNlKClcIik7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcbiAgICAgICAgfWVsc2UgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HKXtcbiAgICAgICAgICAgIGFkcy5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQudHJpZ2dlcihQTEFZQkFDS19SQVRFX0NIQU5HRUQsIHtwbGF5YmFja1JhdGUgOiBwbGF5YmFja1JhdGV9KTtcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBpbmRleCA6IGluZGV4XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmKHNwZWMuY3VycmVudFNvdXJjZSA9PT0gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XG4gICAgICAgICAgICBpZihzcGVjLnNvdXJjZXMgJiYgc3BlYy5zb3VyY2VzLmxlbmd0aCA+IHNvdXJjZUluZGV4KXtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAvL3RoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUluZGV4KHNvdXJjZUluZGV4KTtcbiAgICAgICAgICAgICAgICAvL3BsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAvL3NwZWMuY3VycmVudFF1YWxpdHkgPSBzb3VyY2VJbmRleDtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsVmlkZW8uY3VycmVudFRpbWUgfHwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG5cbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRGcmFtZXJhdGUgPSAoZnJhbWVyYXRlKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZSA9IGZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+e1xuICAgICAgICBsZXQgZnBzID0gc3BlYy5mcmFtZXJhdGU7XG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVzID0gZWxWaWRlby5jdXJyZW50VGltZSAqIGZwcztcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXG5cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xuICAgIH07XG5cbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgncHJlbG9hZCcpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIHdoaWxlIChlbFZpZGVvLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlQ2hpbGQoZWxWaWRlby5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5zdG9wKCk7XG4gICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgLy9lbFZpZGVvLnJlbW92ZSgpO1xuXG4gICAgICAgIGlmKGFkcyl7XG4gICAgICAgICAgICBhZHMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG4gICAgfTtcblxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9