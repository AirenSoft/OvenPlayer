/*! OvenPlayerv0.9.5974 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

            //ToDo : This is temporary code. avoid background content error.
            if (prevState === _constants.STATE_AD_PLAYING && (newState === _constants.STATE_ERROR || newState === _constants.STATE_IDLE)) {
                return false;
            }

            if (ads && ads.isAutoPlaySupportCheckTime()) {
                //silence Area!!!
                //Ads checks checkAutoplaySupport(). It calls real play() and pause() to video element.
                //And then that triggers "playing" and "pause".
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
                })["catch"](function (error) {
                    //ads play fail maybe cause user interactive less
                    isPlayingProcessing = false;
                });
            } else {
                var promise = elVideo.play();
                if (promise !== undefined) {
                    promise.then(function () {
                        isPlayingProcessing = false;
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
                    isPlayingProcessing = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiTGlzdGVuZXIiLCJlbGVtZW50IiwicHJvdmlkZXIiLCJ2aWRlb0VuZGVkQ2FsbGJhY2siLCJsb3dMZXZlbEV2ZW50cyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidGhhdCIsInN0YWxsZWQiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJjb21wYXJlU3RhbGxlZFRpbWUiLCJwb3NpdGlvbiIsInRvRml4ZWQiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsInRyaWdnZXIiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJzZXRTdGF0ZSIsImxvYWRlZGRhdGEiLCJsb2FkZWRtZXRhZGF0YSIsInNvdXJjZXMiLCJnZXRTb3VyY2VzIiwic291cmNlSW5kZXgiLCJnZXRDdXJyZW50U291cmNlIiwidHlwZSIsIm1ldGFkYXRhIiwiZHVyYXRpb24iLCJpc0xpdmUiLCJJbmZpbml0eSIsIkNPTlRFTlRfTUVUQSIsInBhdXNlIiwiU1RBVEVfRVJST1IiLCJlcnJvciIsImN1cnJlbnRUaW1lIiwiU1RBVEVfUEFVU0VEIiwicGxheSIsInBhdXNlZCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9MT0FESU5HIiwicGxheWluZyIsInRpbWVSYW5nZXMiLCJidWZmZXJlZCIsImxlbmd0aCIsImVuZCIsInNldEJ1ZmZlciIsIkNPTlRFTlRfQlVGRkVSIiwiYnVmZmVyUGVyY2VudCIsInRpbWV1cGRhdGUiLCJpc05hTiIsImlzU2Vla2luZyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiQ09OVEVOVF9USU1FIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImNvbnZlcnRlZEVycm9Db2RlIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJFUlJPUlMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldmVudE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVzdHJveSIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsIm9uRXh0ZW5kZWRMb2FkIiwiZGFzaEF0dGFjaGVkVmlldyIsImFkcyIsImxpc3RlbmVyIiwiaXNQbGF5aW5nUHJvY2Vzc2luZyIsImFkVGFnVXJsIiwiY29uc29sZSIsInBsYXliYWNrUmF0ZSIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJfbG9hZCIsImxhc3RQbGF5UG9zaXRpb24iLCJzb3VyY2UiLCJjdXJyZW50U291cmNlIiwiZnJhbWVyYXRlIiwic2V0VGltZWNvZGVNb2RlIiwicHJldmlvdXNTb3VyY2UiLCJzcmMiLCJzb3VyY2VFbGVtZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZmlsZSIsInNvdXJjZUNoYW5nZWQiLCJsb2FkIiwic2VlayIsImlzQXV0b1N0YXJ0IiwiZ2V0TmFtZSIsIm5hbWUiLCJjYW5TZWVrIiwibmV3U3RhdGUiLCJzdGF0ZSIsInByZXZTdGF0ZSIsImlzQXV0b1BsYXlTdXBwb3J0Q2hlY2tUaW1lIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwibmV3c3RhdGUiLCJTVEFURV9BRF9QQVVTRUQiLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld0J1ZmZlciIsImJ1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRNdXRlIiwiQ09OVEVOVF9NVVRFIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImlzTXV0ZSIsInN0YXJ0dGltZSIsImlzQWN0aXZlIiwic3RhcnRlZCIsInRoZW4iLCJwcm9taXNlIiwidW5kZWZpbmVkIiwic2V0UGxheWJhY2tSYXRlIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwibWFwIiwiaW5kZXgiLCJsYWJlbCIsInNldEN1cnJlbnRTb3VyY2UiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwic2V0U291cmNlSW5kZXgiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldEZyYW1lcmF0ZSIsInNldEZyYW1lcmF0ZSIsInNlZWtGcmFtZSIsImZyYW1lQ291bnQiLCJmcHMiLCJjdXJyZW50RnJhbWVzIiwibmV3UG9zaXRpb24iLCJzdG9wIiwicmVtb3ZlQXR0cmlidXRlIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwib2ZmIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBNkJBOztBQUVBOzs7Ozs7QUFPQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBU0MsT0FBVCxFQUFrQkMsUUFBbEIsRUFB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QixnQkFBdEI7QUFDQUcsZ0JBQVE0SyxlQUFSLENBQXdCLFNBQXhCO0FBQ0E1SyxnQkFBUTRLLGVBQVIsQ0FBd0IsS0FBeEI7QUFDQSxlQUFPNUssUUFBUTZLLFVBQWYsRUFBMkI7QUFDdkI3SyxvQkFBUThLLFdBQVIsQ0FBb0I5SyxRQUFRNkssVUFBNUI7QUFDSDtBQUNEL0ssYUFBS2tDLEtBQUw7QUFDQWxDLGFBQUtxQixRQUFMLENBQWNGLHFCQUFkO0FBQ0gsS0FaRDs7QUFjQW5CLFNBQUttRixPQUFMLEdBQWUsWUFBSztBQUNoQixZQUFHLENBQUNqRixPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7QUFDREYsYUFBSzZLLElBQUw7QUFDQW5GLGlCQUFTUCxPQUFUO0FBQ0E7O0FBRUEsWUFBR00sR0FBSCxFQUFPO0FBQ0hBLGdCQUFJTixPQUFKO0FBQ0g7QUFDRG5GLGFBQUtpTCxHQUFMO0FBQ0FuTCwwQkFBa0JDLEdBQWxCLENBQXNCLHlEQUF0QjtBQUNILEtBYkQ7O0FBZUE7QUFDQTtBQUNBQyxvQkFBYSxVQUFDa0gsSUFBRCxFQUFVO0FBQ25CLFlBQU1nRSxTQUFTbEwsS0FBS2tILElBQUwsQ0FBZjtBQUNBLGVBQU8sWUFBVTtBQUNiLG1CQUFPZ0UsT0FBT0MsS0FBUCxDQUFhbkwsSUFBYixFQUFtQm9MLFNBQW5CLENBQVA7QUFDSCxTQUZEO0FBR0gsS0FMRDtBQU1BLFdBQU9wTCxJQUFQO0FBRUgsQ0FuYkQsQyxDQXRCQTs7O3FCQTJjZW9GLFEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRVJST1JTLFxuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfQURfUExBWUlORyxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQUk9WSURFUl9IVE1MNSxcbiAgICBQUk9WSURFUl9XRUJSVEMsXG4gICAgUFJPVklERVJfREFTSCxcbiAgICBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVHJpZ2dlciBvbiB2YXJpb3VzIHZpZGVvIGV2ZW50cy5cbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLlxuICogQHBhcmFtICAgUHJvdmlkZXIgcHJvdmlkZXIgIGh0bWw1UHJvdmlkZXJcbiAqICovXG5cblxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihlbGVtZW50LCBwcm92aWRlciwgdmlkZW9FbmRlZENhbGxiYWNrKXtcbiAgICBjb25zdCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciBsb2FkZWQuXCIsZWxlbWVudCAscHJvdmlkZXIgKTtcbiAgICBjb25zdCB0aGF0ID0ge307XG5cbiAgICBsZXQgc3RhbGxlZCA9IC0xO1xuICAgIGxldCBlbFZpZGVvID0gIGVsZW1lbnQ7XG4gICAgY29uc3QgYmV0d2VlbiA9IGZ1bmN0aW9uIChudW0sIG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihudW0sIG1heCksIG1pbik7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBhcmVTdGFsbGVkVGltZSA9IGZ1bmN0aW9uKHN0YWxsZWQsIHBvc2l0aW9uKXtcbiAgICAgICAgLy9PcmlnaW5hbCBDb2RlIGlzIHN0YWxsZWQgIT09IHBvc2l0aW9uXG4gICAgICAgIC8vQmVjYXVzZSBEYXNoanMgaXMgdmVyeSBtZXRpY3Vsb3VzLiBUaGVuIGFsd2F5cyBkaWZmcmVuY2Ugc3RhbGxlZCBhbmQgcG9zaXRpb24uXG4gICAgICAgIC8vVGhhdCBpcyB3aHkgd2hlbiBJIHVzZSB0b0ZpeGVkKDIpLlxuICAgICAgICByZXR1cm4gc3RhbGxlZC50b0ZpeGVkKDIpID09PSBwb3NpdGlvbi50b0ZpeGVkKDIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5jYW5wbGF5ID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICAgIHByb3ZpZGVyLnNldENhblNlZWsodHJ1ZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVJfRlVMTCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBjYW5wbGF5XCIpO1xuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5kdXJhdGlvbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBkdXJhdGlvbiBvZiB0aGUgYXVkaW8vdmlkZW8gaXMgY2hhbmdlZFxuICAgICAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcygpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZHVyYXRpb25jaGFuZ2VcIik7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWxpc3QgaXMgZW5kZWRcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVuZGVkXCIpO1xuXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX0lETEUgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfQ09NUExFVEUpe1xuICAgICAgICAgICAgaWYodmlkZW9FbmRlZENhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICB2aWRlb0VuZGVkQ2FsbGJhY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZGRhdGEgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIHRoZSBjdXJyZW50IGZyYW1lIG9mIHRoZSBhdWRpby92aWRlb1xuICAgICAgICAvL0RvIG5vdGhpbmcgQmVjYXVzZSB0aGlzIGNhdXNlcyBjaGFvcyBieSBsb2FkZWRtZXRhZGF0YS5cbiAgICAgICAgLypcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xuICAgICAgICAgICAgZHVyYXRpb246IGVsVmlkZW8uZHVyYXRpb24sXG4gICAgICAgICAgICBoZWlnaHQ6IGVsVmlkZW8udmlkZW9IZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogZWxWaWRlby52aWRlb1dpZHRoXG4gICAgICAgIH07XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7Ki9cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkbWV0YWRhdGEgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIG1ldGEgZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvXG5cbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwcm92aWRlci5nZXRTb3VyY2VzKCk7XG4gICAgICAgIGxldCBzb3VyY2VJbmRleCA9IHByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICAgICAgbGV0IHR5cGUgPSBzb3VyY2VJbmRleCA+IC0xID8gc291cmNlc1tzb3VyY2VJbmRleF0udHlwZSA6IFwiXCI7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBwcm92aWRlci5pc0xpdmUoKSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb24sXG4gICAgICAgICAgICB0eXBlIDp0eXBlXG4gICAgICAgIH07XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRtZXRhZGF0YVwiLCBtZXRhZGF0YSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gKCkgPT4ge1xuICAgICAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHBhdXNlZFxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9DT01QTEVURSB8fCBwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9FUlJPUil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lbmRlZCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lcnJvcil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5jdXJyZW50VGltZSA9PT0gZWxWaWRlby5kdXJhdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBhdXNlXCIpO1xuXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BBVVNFRCk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXkgPSAoKSA9PiB7XG5cbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBzdGFydGVkIG9yIGlzIG5vIGxvbmdlciBwYXVzZWRcbiAgICAgICAgc3RhbGxlZCA9IC0xO1xuICAgICAgICBpZiAoIWVsVmlkZW8ucGF1c2VkICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXlpbmcgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaXMgcGxheWluZyBhZnRlciBoYXZpbmcgYmVlbiBwYXVzZWQgb3Igc3RvcHBlZCBmb3IgYnVmZmVyaW5nXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwbGF5aW5nXCIpO1xuICAgICAgICBpZihzdGFsbGVkIDwgMCl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcyA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGlzIGRvd25sb2FkaW5nIHRoZSBhdWRpby92aWRlb1xuICAgICAgICBsZXQgdGltZVJhbmdlcyA9IGVsVmlkZW8uYnVmZmVyZWQ7XG4gICAgICAgIGlmKCF0aW1lUmFuZ2VzICl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uLCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgICAgIGxldCBidWZmZXJlZCA9IGJldHdlZW4oICh0aW1lUmFuZ2VzLmxlbmd0aD4gMCA/IHRpbWVSYW5nZXMuZW5kKHRpbWVSYW5nZXMubGVuZ3RoIC0gMSkgOiAwICkgLyBkdXJhdGlvbiwgMCwgMSk7XG5cbiAgICAgICAgcHJvdmlkZXIuc2V0QnVmZmVyKGJ1ZmZlcmVkKjEwMCk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVIsIHtcbiAgICAgICAgICAgIGJ1ZmZlclBlcmNlbnQ6IGJ1ZmZlcmVkKjEwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAgcG9zaXRpb24sXG4gICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgICAgfSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwcm9ncmVzc1wiLCBidWZmZXJlZCoxMDApO1xuICAgIH07XG5cblxuICAgIGxvd0xldmVsRXZlbnRzLnRpbWV1cGRhdGUgPSAoKSA9PiB7XG4gICAgICAgIC8vRmlyZXMgd2hlbiB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiBoYXMgY2hhbmdlZFxuICAgICAgICBsZXQgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgICAgICBsZXQgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uO1xuICAgICAgICBpZiAoaXNOYU4oZHVyYXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL1NvbWV0aW1lcyBkYXNoIGxpdmUgZ2F2ZSB0byBtZSBjcmF6eSBkdXJhdGlvbi4gKDkwMDcxOTkyNTQ3NDA5OTEuLi4pIHdoeT8/P1xuICAgICAgICBpZihkdXJhdGlvbiA+IDkwMDAwMDAwMDAwMDAwMDApeyAgICAvLzkwMDcxOTkyNTQ3NDA5OTFcbiAgICAgICAgICAgIGR1cmF0aW9uID0gSW5maW5pdHk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkgJiYgIWVsVmlkZW8ucGF1c2VkICYmIChwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9TVEFMTEVEIHx8IHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0xPQURJTkcgfHwgcHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORykgJiZcbiAgICAgICAgICAgICFjb21wYXJlU3RhbGxlZFRpbWUoc3RhbGxlZCwgcG9zaXRpb24pICl7XG4gICAgICAgICAgICBzdGFsbGVkID0gLTE7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HIHx8IHByb3ZpZGVyLmlzU2Vla2luZygpKSB7XG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2luZyA9ICgpID0+IHtcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyh0cnVlKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtpbmdcIiwgZWxWaWRlby5jdXJyZW50VGltZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLLHtcbiAgICAgICAgICAgIHBvc2l0aW9uIDogZWxWaWRlby5jdXJyZW50VGltZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtlZCA9ICgpID0+IHtcbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2VkXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKGZhbHNlKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUtFRCk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnN0YWxsZWQgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzdGFsbGVkXCIpO1xuICAgICAgICAvL1RoaXMgY2FsbGJhY2sgZG9lcyBub3Qgd29yayBvbiBjaHJvbWUuIFRoaXMgY2FsbHMgb24gRmlyZWZveCBpbnRlcm1pdHRlbnQuIFRoZW4gZG8gbm90IHdvcmsgaGVyZS4gdXNpbmcgd2FpdGluZyBldmVudC5cbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMud2FpdGluZyA9ICgpID0+IHtcbiAgICAgICAgLy9GaXJlcyB3aGVuIHRoZSB2aWRlbyBzdG9wcyBiZWNhdXNlIGl0IG5lZWRzIHRvIGJ1ZmZlciB0aGUgbmV4dCBmcmFtZVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gd2FpdGluZ1wiLCBwcm92aWRlci5nZXRTdGF0ZSgpKTtcbiAgICAgICAgaWYocHJvdmlkZXIuaXNTZWVraW5nKCkpe1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgIH1lbHNlIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgc3RhbGxlZCA9IGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9TVEFMTEVEKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsb3dMZXZlbEV2ZW50cy52b2x1bWVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB2b2x1bWVjaGFuZ2VcIiwgTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCkpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVk9MVU1FLCB7XG4gICAgICAgICAgICB2b2x1bWU6IE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApLFxuICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgbG93TGV2ZWxFdmVudHMuZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxWaWRlby5lcnJvciAmJiBlbFZpZGVvLmVycm9yLmNvZGUpIHx8IDA7XG4gICAgICAgIGxldCBjb252ZXJ0ZWRFcnJvQ29kZSA9ICh7XG4gICAgICAgICAgICAwOiBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICAgICAgICAgIDE6IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICAgICAgICAgIDI6IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgICAgICAgICAzOiBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgICAgICAgICA0OiBQTEFZRVJfRklMRV9FUlJPUlxuICAgICAgICB9W2NvZGVdfHwwKTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZXJyb3JcIiwgY29udmVydGVkRXJyb0NvZGUpO1xuICAgICAgICBlcnJvclRyaWdnZXIoRVJST1JTW2NvbnZlcnRlZEVycm9Db2RlXSwgcHJvdmlkZXIpO1xuICAgIH07XG5cbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgZWxWaWRlby5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgfSk7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyNy4uXG4gKi9cbmltcG9ydCBBZHMgZnJvbSBcImFwaS9wcm92aWRlci9hZHMvQWRzXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9MaXN0ZW5lclwiO1xuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBXQVJOX01TR19NVVRFRFBMQVksXG4gICAgVUlfSUNPTlMsIFBMQVlFUl9XQVJOSU5HLFxuICAgIFNUQVRFX0lETEUsIFNUQVRFX1BMQVlJTkcsIFNUQVRFX1BBVVNFRCwgU1RBVEVfQ09NUExFVEUsIFNUQVRFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLCBTVEFURV9BRF9QTEFZSU5HLCBTVEFURV9BRF9QQVVTRUQsXG4gICAgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIENPTlRFTlRfU09VUkNFX0NIQU5HRUQsXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIENvcmUgRm9yIEh0bWw1IFZpZGVvLlxuICogQHBhcmFtICAgc3BlYyBtZW1iZXIgdmFsdWVcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xuICogQHBhcmFtICAgb25FeHRlbmRlZExvYWQgb24gbG9hZCBoYW5kbGVyXG4gKiAqL1xuY29uc3QgUHJvdmlkZXIgPSBmdW5jdGlvbiAoc3BlYywgcGxheWVyQ29uZmlnLCBvbkV4dGVuZGVkTG9hZCl7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcblxuICAgIGxldCB0aGF0ID17fTtcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XG5cbiAgICBsZXQgZGFzaEF0dGFjaGVkVmlldyA9IGZhbHNlO1xuXG4gICAgbGV0IGVsVmlkZW8gPSBzcGVjLmVsZW1lbnQ7XG4gICAgbGV0IGFkcyA9IG51bGwsIGxpc3RlbmVyID0gbnVsbCwgdmlkZW9FbmRlZENhbGxiYWNrID0gbnVsbDtcblxuICAgIGxldCBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XG5cbiAgICBpZihzcGVjLmFkVGFnVXJsKXtcbiAgICAgICAgYWRzID0gQWRzKGVsVmlkZW8sIHRoYXQsIHBsYXllckNvbmZpZywgc3BlYy5hZFRhZ1VybCk7XG4gICAgICAgIGlmKCFhZHMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYW4gbm90IGxvYWQgZHVlIHRvIGdvb2dsZSBpbWEgZm9yIEFkcy5cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihlbFZpZGVvLCB0aGF0LCBhZHMgPyBhZHMudmlkZW9FbmRlZENhbGxiYWNrIDogbnVsbCk7XG4gICAgZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5ZXJDb25maWcuZ2V0UGxheWJhY2tSYXRlKCk7XG5cbiAgICBjb25zdCBfbG9hZCA9IChsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgY29uc3Qgc291cmNlID0gIHNwZWMuc291cmNlc1tzcGVjLmN1cnJlbnRTb3VyY2VdO1xuICAgICAgICBzcGVjLmZyYW1lcmF0ZSA9IHNvdXJjZS5mcmFtZXJhdGU7XG4gICAgICAgIGlmKCFzcGVjLmZyYW1lcmF0ZSl7XG4gICAgICAgICAgICAvL2luaXQgdGltZWNvZGUgbW9kZVxuICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFRpbWVjb2RlTW9kZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZihvbkV4dGVuZGVkTG9hZCl7XG4gICAgICAgICAgICBvbkV4dGVuZGVkTG9hZChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBsb2FkZWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICBsZXQgcHJldmlvdXNTb3VyY2UgPSBlbFZpZGVvLnNyYztcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzb3VyY2UnKTtcblxuICAgICAgICAgICAgc291cmNlRWxlbWVudC5zcmMgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUNoYW5nZWQgPSAoc291cmNlRWxlbWVudC5zcmMgIT09IHByZXZpb3VzU291cmNlKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2VDaGFuZ2VkKSB7XG5cbiAgICAgICAgICAgICAgICBlbFZpZGVvLnNyYyA9IHNvdXJjZS5maWxlO1xuXG4gICAgICAgICAgICAgICAgLy9Eb24ndCB1c2UgdGhpcy4gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzA2Mzc3ODQvZGV0ZWN0LWFuLWVycm9yLW9uLWh0bWw1LXZpZGVvXG4gICAgICAgICAgICAgICAgLy9lbFZpZGVvLmFwcGVuZChzb3VyY2VFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBjYWxsIGxvYWQgaWYgc3JjIHdhcyBub3Qgc2V0LiBsb2FkKCkgd2lsbCBjYW5jZWwgYW55IGFjdGl2ZSBwbGF5IHByb21pc2UuXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzU291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgZWxWaWRlby5jdXJyZW50VGltZSA+IDApe1xuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKnRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc3BlYy5jdXJyZW50U291cmNlXG4gICAgICAgICAgICB9KTsqL1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5uYW1lO1xuICAgIH07XG4gICAgdGhhdC5jYW5TZWVrID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5jYW5TZWVrO1xuICAgIH07XG4gICAgdGhhdC5zZXRDYW5TZWVrID0gKGNhblNlZWspID0+IHtcbiAgICAgICAgc3BlYy5jYW5TZWVrID0gY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuaXNTZWVraW5nID0gKCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuc2Vla2luZztcbiAgICB9O1xuICAgIHRoYXQuc2V0U2Vla2luZyA9IChzZWVraW5nKT0+e1xuICAgICAgICBzcGVjLnNlZWtpbmcgPSBzZWVraW5nO1xuICAgIH07XG5cbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XG4gICAgICAgIGlmKHNwZWMuc3RhdGUgIT09IG5ld1N0YXRlKXtcbiAgICAgICAgICAgIGxldCBwcmV2U3RhdGUgPSBzcGVjLnN0YXRlO1xuXG4gICAgICAgICAgICAvL1RvRG8gOiBUaGlzIGlzIHRlbXBvcmFyeSBjb2RlLiBhdm9pZCBiYWNrZ3JvdW5kIGNvbnRlbnQgZXJyb3IuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUgPT09IFNUQVRFX0FEX1BMQVlJTkcgJiYgKG5ld1N0YXRlID09PSBTVEFURV9FUlJPUiB8fCBuZXdTdGF0ZSA9PT0gU1RBVEVfSURMRSkgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYoYWRzICYmIGFkcy5pc0F1dG9QbGF5U3VwcG9ydENoZWNrVGltZSgpKXtcbiAgICAgICAgICAgICAgICAvL3NpbGVuY2UgQXJlYSEhIVxuICAgICAgICAgICAgICAgIC8vQWRzIGNoZWNrcyBjaGVja0F1dG9wbGF5U3VwcG9ydCgpLiBJdCBjYWxscyByZWFsIHBsYXkoKSBhbmQgcGF1c2UoKSB0byB2aWRlbyBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vQW5kIHRoZW4gdGhhdCB0cmlnZ2VycyBcInBsYXlpbmdcIiBhbmQgXCJwYXVzZVwiLlxuICAgICAgICAgICAgICAgIC8vSSBwcmV2ZW50IHRoZXNlIHByb2Nlc3MuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBzd2l0Y2gobmV3U3RhdGUpe1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0NPTVBMRVRFIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUEFVU0VEIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3c3RhdGU6IFNUQVRFX1BBVVNFRFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTVEFURV9BRF9QQVVTRUQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfQURfUEFVU0VEXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BMQVlJTkcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBTVEFURV9QTEFZSU5HXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTVEFURV9BRF9QTEFZSU5HIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogU1RBVEVfQURfUExBWUlOR1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3BlYy5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldnN0YXRlIDogcHJldlN0YXRlLFxuICAgICAgICAgICAgICAgICAgICBuZXdzdGF0ZTogc3BlYy5zdGF0ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLnN0YXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XG4gICAgICAgIHNwZWMuYnVmZmVyID0gbmV3QnVmZmVyO1xuICAgIH07XG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmJ1ZmZlcjtcbiAgICB9O1xuICAgIHRoYXQuaXNMaXZlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5pc0xpdmUgPyB0cnVlIDogKGVsVmlkZW8uZHVyYXRpb24gPT09IEluZmluaXR5KTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGF0LmlzTGl2ZSgpID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbjtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsVmlkZW8udm9sdW1lID0gdm9sdW1lLzEwMDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLnZvbHVtZSoxMDA7XG4gICAgfTtcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9ICFlbFZpZGVvLm11dGVkO1xuXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHN0YXRlO1xuXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xuICAgIH07XG5cbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XG5cbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xuICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uIHx8IDApO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNNdXRlKCkpe1xuICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRWb2x1bWUocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcblxuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXMpID0+e1xuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIF9sb2FkKHNwZWMuc291cmNlcy5zdGFydHRpbWUgfHwgMCk7XG4gICAgfTtcblxuICAgIHRoYXQucGxheSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoaXNQbGF5aW5nUHJvY2Vzc2luZyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IHRydWU7XG4gICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBpZiAoICAoYWRzICYmIGFkcy5pc0FjdGl2ZSgpKSB8fCAoYWRzICYmICFhZHMuc3RhcnRlZCgpKSApIHtcbiAgICAgICAgICAgICAgICBhZHMucGxheSgpLnRoZW4oXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vYWRzIHBsYXkgc3VjY2Vzc1xuICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2FkcyBwbGF5IGZhaWwgbWF5YmUgY2F1c2UgdXNlciBpbnRlcmFjdGl2ZSBsZXNzXG4gICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNQbGF5aW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG11dGVkUGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9XQVJOSU5HLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgOiBXQVJOX01TR19NVVRFRFBMQVksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyIDogMTAgKiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uQ2xhc3MgOiBVSV9JQ09OUy52b2x1bWVfbXV0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGlja0NhbGxiYWNrIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUGxheWluZ1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighbXV0ZWRQbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIC8vSUUgcHJvbWlzZSBpcyB1bmRlZmluZGVkLlxuICAgICAgICAgICAgICAgICAgICBpc1BsYXlpbmdQcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHRoYXQucGF1c2UgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICB9ZWxzZSBpZih0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcpe1xuICAgICAgICAgICAgYWRzLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT57XG4gICAgICAgIGlmKCFlbFZpZGVvKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbFZpZGVvLmN1cnJlbnRUaW1lID0gcG9zaXRpb247XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwge3BsYXliYWNrUmF0ZSA6IHBsYXliYWNrUmF0ZX0pO1xuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGU7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBzb3VyY2UudHlwZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoc291cmNlSW5kZXgsIG5lZWRQcm92aWRlckNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYoc3BlYy5jdXJyZW50U291cmNlID09PSBzb3VyY2VJbmRleCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZihzb3VyY2VJbmRleCA+IC0xKXtcbiAgICAgICAgICAgIGlmKHNwZWMuc291cmNlcyAmJiBzcGVjLnNvdXJjZXMubGVuZ3RoID4gc291cmNlSW5kZXgpe1xuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIC8vdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgY2hhbmdlZCA6IFwiICsgc291cmNlSW5kZXgpO1xuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHNvdXJjZUluZGV4O1xuXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc291cmNlSW5kZXhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlSW5kZXgoc291cmNlSW5kZXgpO1xuICAgICAgICAgICAgICAgIC8vcGxheWVyQ29uZmlnLnNldFNvdXJjZUxhYmVsKHNwZWMuc291cmNlc1tzb3VyY2VJbmRleF0ubGFiZWwpO1xuICAgICAgICAgICAgICAgIC8vc3BlYy5jdXJyZW50UXVhbGl0eSA9IHNvdXJjZUluZGV4O1xuICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsVmlkZW8uY3VycmVudFRpbWUgfHwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICAvL0RvIG5vdGhpbmdcbiAgICB9O1xuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgIC8vRG8gbm90aGluZ1xuICAgIH07XG5cbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRGcmFtZXJhdGUgPSAoZnJhbWVyYXRlKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZSA9IGZyYW1lcmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+e1xuICAgICAgICBsZXQgZnBzID0gc3BlYy5mcmFtZXJhdGU7XG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVzID0gZWxWaWRlby5jdXJyZW50VGltZSAqIGZwcztcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXG5cbiAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xuICAgIH07XG5cbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgncHJlbG9hZCcpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIHdoaWxlIChlbFZpZGVvLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlQ2hpbGQoZWxWaWRlby5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBpZighZWxWaWRlbyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5zdG9wKCk7XG4gICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICAgICAgLy9lbFZpZGVvLnJlbW92ZSgpO1xuXG4gICAgICAgIGlmKGFkcyl7XG4gICAgICAgICAgICBhZHMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG4gICAgfTtcblxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9