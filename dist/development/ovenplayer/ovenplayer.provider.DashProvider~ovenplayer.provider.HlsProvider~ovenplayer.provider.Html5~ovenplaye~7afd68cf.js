/*! OvenPlayerv0.8.0 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"],{

/***/ "./src/assets/OvenPlayerFlash.swf":
/*!****************************************!*\
  !*** ./src/assets/OvenPlayerFlash.swf ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "OvenPlayerFlash.swf";

/***/ }),

/***/ "./src/js/api/media/Manager.js":
/*!*************************************!*\
  !*** ./src/js/api/media/Manager.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _OvenPlayerFlash = __webpack_require__(/*! ../../../assets/OvenPlayerFlash.swf */ "./src/assets/OvenPlayerFlash.swf");

var _OvenPlayerFlash2 = _interopRequireDefault(_OvenPlayerFlash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Manager = function Manager(container, providerType, loop) {
    var that = {};
    var rootId = container.getAttribute("data-parent-id");
    var mediaElement = "";
    var browserType = (0, _browser.getBrowser)();

    OvenPlayerConsole.log("MediaManager loaded. browserType : " + browserType);
    var createMediaElement = function createMediaElement() {
        if (providerType !== _constants.PROVIDER_RTMP) {
            mediaElement = document.createElement('video');
            mediaElement.setAttribute('disableRemotePlayback', '');
            mediaElement.setAttribute('webkit-playsinline', '');
            mediaElement.setAttribute('playsinline', '');
            if (loop) {
                mediaElement.setAttribute('loop', '');
            }
            container.appendChild(mediaElement);
        } else {
            var movie = void 0,
                flashvars = void 0,
                allowscriptaccess = void 0,
                allowfullscreen = void 0,
                quality = void 0,
                name = void 0,
                menu = void 0,
                qual = void 0,
                bgcolor = void 0,
                _loop = void 0;
            movie = document.createElement('param');
            movie.setAttribute('name', 'movie');
            movie.setAttribute('value', _OvenPlayerFlash2["default"]);

            flashvars = document.createElement('param');
            flashvars.setAttribute('name', 'flashvars');
            //playerId is to use SWF for ExternalInterface.call().
            flashvars.setAttribute('value', 'playerId=' + rootId);

            allowscriptaccess = document.createElement('param');
            allowscriptaccess.setAttribute('name', 'allowscriptaccess');
            allowscriptaccess.setAttribute('value', 'always');

            allowfullscreen = document.createElement('param');
            allowfullscreen.setAttribute('name', 'allowfullscreen');
            allowfullscreen.setAttribute('value', 'true');

            quality = document.createElement('param');
            quality.setAttribute('name', 'quality');
            quality.setAttribute('value', 'height');

            name = document.createElement('param');
            name.setAttribute('name', 'name');
            name.setAttribute('value', rootId + "-flash");

            menu = document.createElement('param');
            menu.setAttribute('name', 'menu');
            menu.setAttribute('value', 'false');

            qual = document.createElement('param');
            qual.setAttribute('name', 'quality');
            qual.setAttribute('value', 'high');

            bgcolor = document.createElement('param');
            bgcolor.setAttribute('name', 'bgcolor');
            bgcolor.setAttribute('value', '#000000');

            if (_loop) {
                _loop = document.createElement('param');
                _loop.setAttribute('name', 'loop');
                _loop.setAttribute('value', 'true');
            }

            mediaElement = document.createElement('object');
            mediaElement.setAttribute('id', rootId + "-flash");
            mediaElement.setAttribute('name', rootId + "-flash");
            mediaElement.setAttribute('width', '100%');
            mediaElement.setAttribute('height', '100%');
            mediaElement.setAttribute('scale', 'default');

            if (browserType !== "oldIE") {
                mediaElement.setAttribute('data', _OvenPlayerFlash2["default"]);
                mediaElement.setAttribute('type', 'application/x-shockwave-flash');
            } else {
                mediaElement.setAttribute('classid', 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000');

                mediaElement.appendChild(movie);
            }
            mediaElement.appendChild(_loop);
            mediaElement.appendChild(bgcolor);
            mediaElement.appendChild(qual);
            mediaElement.appendChild(allowfullscreen);
            mediaElement.appendChild(allowscriptaccess);
            mediaElement.appendChild(flashvars);

            container.appendChild(mediaElement);
        }
        return mediaElement;
    };

    that.create = function () {
        OvenPlayerConsole.log("MediaManager createElement()");
        if (mediaElement) {
            that.destroy();
        }
        return createMediaElement();
    };

    that.destroy = function () {
        OvenPlayerConsole.log("MediaManager removeElement()");
        container.removeChild(mediaElement);
        mediaElement = null;
    };

    return that;
}; /**
    * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
    * @param   {element}   container   dom element
    *
    * */
exports["default"] = Manager;

/***/ }),

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

var Listener = function Listener(extendedElement, provider) {
    var lowLevelEvents = {};

    OvenPlayerConsole.log("EventListener loaded.", extendedElement, provider);
    var that = {};

    var elVideo = (0, _utils.extractVideoElement)(extendedElement);
    var between = function between(num, min, max) {
        return Math.max(Math.min(num, max), min);
    };
    var onError = function onError(error) {
        provider.setState(_constants.STATE_ERROR);
        provider.pause();

        //PRIVATE_STATE_ERROR
        provider.trigger(_constants.ERROR, error);
    };

    //Fires when the browser can start playing the audio/video
    lowLevelEvents.canplay = function () {
        provider.setCanSeek(true);
        provider.trigger(_constants.CONTENT_BUFFER_FULL);
        OvenPlayerConsole.log("EventListener : on canplay");
    };
    //Fires when the duration of the audio/video is changed
    lowLevelEvents.durationchange = function () {
        lowLevelEvents.progress();
        OvenPlayerConsole.log("EventListener : on durationchange");
    };
    //Fires when the current playlist is ended
    lowLevelEvents.ended = function () {
        OvenPlayerConsole.log("EventListener : on ended");
        if (provider.getState() != _constants.STATE_IDLE && provider.getState() != _constants.STATE_COMPLETE) {
            provider.trigger(_constants.CONTENT_COMPLETE);
            provider.setState(_constants.STATE_COMPLETE);
        }
    };
    //Fires when the browser has loaded the current frame of the audio/video
    lowLevelEvents.loadeddata = function () {
        //Do nothing Because this causes chaos by loadedmetadata.
        /*
        var metadata = {
            duration: elVideo.duration,
            height: elVideo.videoHeight,
            width: elVideo.videoWidth
        };
        provider.trigger(CONTENT_META, metadata);*/
        OvenPlayerConsole.log("EventListener : on loadeddata");
    };
    //Fires when the browser has loaded meta data for the audio/video
    lowLevelEvents.loadedmetadata = function () {
        var isLive = elVideo.duration === Infinity ? true : (0, _utils.separateLive)(extendedElement);
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
    //Fires when the audio/video has been paused
    lowLevelEvents.pause = function () {
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
    //Fires when the audio/video has been started or is no longer paused
    lowLevelEvents.play = function () {
        if (!elVideo.paused && provider.getState() !== _constants.STATE_PLAYING) {
            OvenPlayerConsole.log("EventListener : on play");
            provider.setState(_constants.STATE_LOADING);
        }
    };
    //Fires when the audio/video is playing after having been paused or stopped for buffering
    lowLevelEvents.playing = function () {
        OvenPlayerConsole.log("EventListener : on playing");
        provider.setState(_constants.STATE_PLAYING);
        //provider.trigger(PROVIDER_FIRST_FRAME);
    };
    //Fires when the browser is downloading the audio/video
    lowLevelEvents.progress = function () {
        var timeRanges = elVideo.buffered;
        if (!timeRanges) {
            return false;
        }

        var duration = elVideo.duration,
            position = elVideo.currentTime;
        var buffered = between((timeRanges.length > 0 ? timeRanges.end(timeRanges.length - 1) : 0) / duration, 0, 1);

        OvenPlayerConsole.log("EventListener : on progress", buffered * 100);

        provider.setBuffer(buffered * 100);
        provider.trigger(_constants.CONTENT_BUFFER, {
            bufferPercent: buffered * 100,
            position: position,
            duration: duration
        });
    };
    //Fires when the browser is trying to get media data, but data is not available
    lowLevelEvents.stalled = function () {
        OvenPlayerConsole.log("EventListener : on stall");
    };
    //Fires when the current playback position has changed
    lowLevelEvents.timeupdate = function () {
        var position = elVideo.currentTime;
        var duration = elVideo.duration;
        if (isNaN(duration)) {
            return;
        }

        if (!provider.isSeeking() && !elVideo.paused) {
            provider.setState(_constants.STATE_PLAYING);
        }
        /*OvenPlayerConsole.log("EventListener : on timeupdate" , {
            position: position,
            duration: duration
        });*/
        if (provider.getState() === _constants.STATE_PLAYING || provider.isSeeking()) {
            provider.trigger(_constants.CONTENT_TIME, {
                position: position,
                duration: duration
            });
        }
    };
    lowLevelEvents.resize = function () {
        OvenPlayerConsole.log("EventListener : on resize");
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

    //Fires when the video stops because it needs to buffer the next frame
    lowLevelEvents.waiting = function () {
        OvenPlayerConsole.log("EventListener : on waiting", provider.getState());
        if (provider.isSeeking()) {
            provider.setState(_constants.STATE_LOADING);
        } else if (provider.getState() === _constants.STATE_PLAYING) {
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
        var errorCodeGen = {
            0: { code: _constants.PLAYER_UNKNWON_ERROR, reason: "Unknown html5 video error", message: "Unknown html5 video error" },
            1: { code: _constants.PLAYER_UNKNWON_OPERATION_ERROR, reason: "Unknown operation aborted", message: "Unknown operation aborted" },
            2: { code: _constants.PLAYER_UNKNWON_NEWWORK_ERROR, reason: "Unknown network error", message: "Unknown network error" },
            3: { code: _constants.PLAYER_UNKNWON_DECODE_ERROR, reason: "Unknown decode error", message: "Unknown decode error" },
            4: { code: _constants.PLAYER_FILE_ERROR, reason: "File could not be played", message: "File could not be played" }
        }[code] || 0;
        errorCodeGen.error = elVideo.error;

        OvenPlayerConsole.log("EventListener : on error", errorCodeGen);
        onError(errorCodeGen);
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
    OvenPlayerConsole.log("CORE loaded. ");

    var that = {};
    (0, _EventEmitter2["default"])(that);

    var listener = (0, _Listener2["default"])(spec.extendedElement, that);
    var elVideo = (0, _utils.extractVideoElement)(spec.extendedElement);
    var posterImage = playerConfig.getConfig().image || "";
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
                elVideo.src = spec.sources[spec.currentSource].file;
                // Do not call load if src was not set. load() will cancel any active play promise.
                if (previousSource) {
                    elVideo.load();
                }
            } else if (lastPlayPosition === 0 && elVideo.currentTime > 0) {
                that.seek(lastPlayPosition);
            }
            if (lastPlayPosition > 0) {
                that.seek(lastPlayPosition);
                that.play();
            }
            /*that.trigger(CONTENT_SOURCE_CHANGED, {
                currentSource: spec.currentSource
            });*/

            if (posterImage) {
                //There is no way to verify the posterImage URL. This will be blnak until have a good idea.
                //elVideo.style.background = "transparent url('"+posterImage+"') no-repeat 0 0";
                //elVideo.poster = posterImage;
            }
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
            switch (newState) {
                case _constants.STATE_COMPLETE:
                    that.trigger(_constants.PLAYER_COMPLETE);
                    break;
                case _constants.STATE_PAUSED:
                    that.trigger(_constants.PLAYER_PAUSE, {
                        prevState: spec.state
                    });
                    break;
                case _constants.STATE_PLAYING:
                    that.trigger(_constants.PLAYER_PLAY, {
                        prevState: spec.state
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
    that.getDuration = function () {
        var isLive = elVideo.duration === Infinity ? true : (0, _utils.separateLive)(spec.extendedElement);
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
            resolve();

            if (playerConfig.isAutoStart()) {
                that.play();
            }
            if (playerConfig.isMute()) {
                that.setMute(true);
            }
            if (playerConfig.getVolume()) {
                that.setVolume(playerConfig.getVolume());
            }
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

        if (that.getState() !== _constants.STATE_PLAYING) {
            var promise = elVideo.play();
            if (promise !== undefined) {
                promise.then(function (_) {
                    // Autoplay started!
                })["catch"](function (error) {
                    //Can't play because User doesn't any interactions.
                    //Wait for User Interactions. (like click)
                    setTimeout(function () {
                        that.play();
                    }, 1000);
                });
            }
        }
    };
    that.pause = function () {
        if (!elVideo) {
            return false;
        }
        if (that.getState() === _constants.STATE_PLAYING) {
            elVideo.pause();
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
                that.setState(_constants.STATE_IDLE);
                OvenPlayerConsole.log("source changed : " + sourceIndex);
                spec.currentSource = sourceIndex;

                that.trigger(_constants.CONTENT_SOURCE_CHANGED, {
                    currentSource: sourceIndex
                });
                playerConfig.setSourceLabel(spec.sources[sourceIndex].label);
                //spec.currentQuality = sourceIndex;
                if (needProviderChange) {

                    _load(elVideo.currentTime || 0);
                }
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

/***/ }),

/***/ "./src/js/api/provider/utils.js":
/*!**************************************!*\
  !*** ./src/js/api/provider/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pickCurrentSource = exports.errorTrigger = exports.separateLive = exports.extractVideoElement = undefined;

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hoho on 2018. 11. 12..
 */
var extractVideoElement = exports.extractVideoElement = function extractVideoElement(extendedElement) {
    if (_underscore2["default"].isElement(extendedElement)) {
        return extendedElement;
    }
    if (extendedElement.getVideoElement) {
        return extendedElement.getVideoElement();
    } else if (extendedElement.media) {
        return extendedElement.media;
    }
    return null;
};

var separateLive = exports.separateLive = function separateLive(extendedElement) {
    //ToDo : You consider hlsjs. But not now because we don't support hlsjs.

    if (extendedElement.isDynamic) {
        return extendedElement.isDynamic();
    } else {
        return false;
    }
};

var errorTrigger = exports.errorTrigger = function errorTrigger(error, provider) {
    provider.setState(_constants.STATE_ERROR);
    provider.pause();
    provider.trigger(_constants.ERROR, error);
};

var pickCurrentSource = exports.pickCurrentSource = function pickCurrentSource(sources, currentSource, playerConfig) {
    var sourceIndex = Math.max(0, currentSource);
    var label = "";
    if (sources) {
        for (var i = 0; i < sources.length; i++) {
            if (sources[i]["default"]) {
                sourceIndex = i;
            }
            if (playerConfig.getSourceLabel() && sources[i].label === playerConfig.getSourceLabel()) {
                return i;
            }
        }
    }
    return sourceIndex;
};

/***/ }),

/***/ "./src/js/utils/browser.js":
/*!*********************************!*\
  !*** ./src/js/utils/browser.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 8. 24..
 */

var getBrowser = exports.getBrowser = function getBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return 'opera';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return 'safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'firefox';
    } else if (navigator.userAgent.indexOf("MSIE") != -1) {
        var msie = navigator.userAgent.indexOf("MSIE");
        /*if(!!document.documentMode == true ){
            return 'ie';
        }else if(!!navigator.userAgent.match(/Trident.*rv\:11\./)){
            if (!isNaN(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))))) {
                return 'ie';
            }else{
                return 'unknown';
            }
        }else{
            return 'unknown';
        }*/
        var ie = function () {

            var undef,
                v = 3,
                div = document.createElement('div'),
                all = div.getElementsByTagName('i');

            while (div.innerHTML = '<!--[if gt IE ' + ++v + ']><i></i><![endif]-->', all[0]) {}

            return v > 4 ? v : undef;
        }();
        if (ie < 9) {
            return 'oldIE';
        } else {
            return 'modernIE';
        }
    } else {
        return 'unknown';
    }
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9tZWRpYS9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9icm93c2VyLmpzIl0sIm5hbWVzIjpbIk1hbmFnZXIiLCJjb250YWluZXIiLCJwcm92aWRlclR5cGUiLCJsb29wIiwidGhhdCIsInJvb3RJZCIsImdldEF0dHJpYnV0ZSIsIm1lZGlhRWxlbWVudCIsImJyb3dzZXJUeXBlIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJjcmVhdGVNZWRpYUVsZW1lbnQiLCJQUk9WSURFUl9SVE1QIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJtb3ZpZSIsImZsYXNodmFycyIsImFsbG93c2NyaXB0YWNjZXNzIiwiYWxsb3dmdWxsc2NyZWVuIiwicXVhbGl0eSIsIm5hbWUiLCJtZW51IiwicXVhbCIsImJnY29sb3IiLCJTV0ZwYXRoIiwiY3JlYXRlIiwiZGVzdHJveSIsInJlbW92ZUNoaWxkIiwiTGlzdGVuZXIiLCJleHRlbmRlZEVsZW1lbnQiLCJwcm92aWRlciIsImxvd0xldmVsRXZlbnRzIiwiZWxWaWRlbyIsImJldHdlZW4iLCJudW0iLCJtaW4iLCJtYXgiLCJNYXRoIiwib25FcnJvciIsImVycm9yIiwic2V0U3RhdGUiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwidHJpZ2dlciIsIkVSUk9SIiwiY2FucGxheSIsInNldENhblNlZWsiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJDT05URU5UX0NPTVBMRVRFIiwibG9hZGVkZGF0YSIsImxvYWRlZG1ldGFkYXRhIiwiaXNMaXZlIiwiZHVyYXRpb24iLCJJbmZpbml0eSIsInNvdXJjZXMiLCJnZXRTb3VyY2VzIiwic291cmNlSW5kZXgiLCJnZXRDdXJyZW50U291cmNlIiwidHlwZSIsIm1ldGFkYXRhIiwiQ09OVEVOVF9NRVRBIiwiY3VycmVudFRpbWUiLCJTVEFURV9QQVVTRUQiLCJwbGF5IiwicGF1c2VkIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0xPQURJTkciLCJwbGF5aW5nIiwidGltZVJhbmdlcyIsImJ1ZmZlcmVkIiwicG9zaXRpb24iLCJsZW5ndGgiLCJlbmQiLCJzZXRCdWZmZXIiLCJDT05URU5UX0JVRkZFUiIsImJ1ZmZlclBlcmNlbnQiLCJzdGFsbGVkIiwidGltZXVwZGF0ZSIsImlzTmFOIiwiaXNTZWVraW5nIiwiQ09OVEVOVF9USU1FIiwicmVzaXplIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJTVEFURV9TVEFMTEVEIiwidm9sdW1lY2hhbmdlIiwicm91bmQiLCJ2b2x1bWUiLCJDT05URU5UX1ZPTFVNRSIsIm11dGUiLCJtdXRlZCIsImNvZGUiLCJlcnJvckNvZGVHZW4iLCJQTEFZRVJfVU5LTldPTl9FUlJPUiIsInJlYXNvbiIsIm1lc3NhZ2UiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldmVudE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiUHJvdmlkZXIiLCJzcGVjIiwicGxheWVyQ29uZmlnIiwib25FeHRlbmRlZExvYWQiLCJsaXN0ZW5lciIsInBvc3RlckltYWdlIiwiZ2V0Q29uZmlnIiwiaW1hZ2UiLCJwbGF5YmFja1JhdGUiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwiY3VycmVudFNvdXJjZSIsImZyYW1lcmF0ZSIsInNldFRpbWVjb2RlTW9kZSIsInByZXZpb3VzU291cmNlIiwic3JjIiwic291cmNlRWxlbWVudCIsImZpbGUiLCJzb3VyY2VDaGFuZ2VkIiwibG9hZCIsInNlZWsiLCJnZXROYW1lIiwiY2FuU2VlayIsIm5ld1N0YXRlIiwic3RhdGUiLCJwcmV2U3RhdGUiLCJQTEFZRVJfQ09NUExFVEUiLCJQTEFZRVJfUEFVU0UiLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld3N0YXRlIiwibmV3QnVmZmVyIiwiYnVmZmVyIiwiZ2V0QnVmZmVyIiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsInNldFZvbHVtZSIsImdldFZvbHVtZSIsInNldE11dGUiLCJDT05URU5UX01VVEUiLCJnZXRNdXRlIiwicHJlbG9hZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaXNBdXRvU3RhcnQiLCJpc011dGUiLCJzdGFydHRpbWUiLCJwcm9taXNlIiwidW5kZWZpbmVkIiwidGhlbiIsInNldFRpbWVvdXQiLCJzZXRQbGF5YmFja1JhdGUiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJtYXAiLCJpbmRleCIsImxhYmVsIiwic2V0Q3VycmVudFNvdXJjZSIsIm5lZWRQcm92aWRlckNoYW5nZSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJzZXRTb3VyY2VMYWJlbCIsImdldFF1YWxpdHlMZXZlbHMiLCJxdWFsaXR5TGV2ZWxzIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJjdXJyZW50UXVhbGl0eSIsInNldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0RnJhbWVyYXRlIiwic2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImZwcyIsImN1cnJlbnRGcmFtZXMiLCJuZXdQb3NpdGlvbiIsInN0b3AiLCJyZW1vdmVBdHRyaWJ1dGUiLCJmaXJzdENoaWxkIiwib2ZmIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJleHRyYWN0VmlkZW9FbGVtZW50IiwiXyIsImlzRWxlbWVudCIsImdldFZpZGVvRWxlbWVudCIsIm1lZGlhIiwic2VwYXJhdGVMaXZlIiwiaXNEeW5hbWljIiwiZXJyb3JUcmlnZ2VyIiwicGlja0N1cnJlbnRTb3VyY2UiLCJpIiwiZ2V0U291cmNlTGFiZWwiLCJnZXRCcm93c2VyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsIm1zaWUiLCJpZSIsInVuZGVmIiwidiIsImRpdiIsImFsbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUJBQWlCLHFCQUF1Qix5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDS3hDOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxVQUFVLFNBQVZBLE9BQVUsQ0FBU0MsU0FBVCxFQUFvQkMsWUFBcEIsRUFBa0NDLElBQWxDLEVBQXVDO0FBQ25ELFFBQU1DLE9BQU8sRUFBYjtBQUNBLFFBQUlDLFNBQVNKLFVBQVVLLFlBQVYsQ0FBdUIsZ0JBQXZCLENBQWI7QUFDQSxRQUFJQyxlQUFlLEVBQW5CO0FBQ0EsUUFBSUMsY0FBYywwQkFBbEI7O0FBRUFDLHNCQUFrQkMsR0FBbEIsQ0FBc0Isd0NBQXVDRixXQUE3RDtBQUNBLFFBQU1HLHFCQUFxQixTQUFyQkEsa0JBQXFCLEdBQVU7QUFDakMsWUFBR1QsaUJBQWlCVSx3QkFBcEIsRUFBa0M7QUFDOUJMLDJCQUFlTSxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQWY7QUFDQVAseUJBQWFRLFlBQWIsQ0FBMEIsdUJBQTFCLEVBQW1ELEVBQW5EO0FBQ0FSLHlCQUFhUSxZQUFiLENBQTBCLG9CQUExQixFQUFnRCxFQUFoRDtBQUNBUix5QkFBYVEsWUFBYixDQUEwQixhQUExQixFQUF5QyxFQUF6QztBQUNBLGdCQUFHWixJQUFILEVBQVE7QUFDSkksNkJBQWFRLFlBQWIsQ0FBMEIsTUFBMUIsRUFBa0MsRUFBbEM7QUFDSDtBQUNEZCxzQkFBVWUsV0FBVixDQUFzQlQsWUFBdEI7QUFFSCxTQVZELE1BVUs7QUFDRCxnQkFBSVUsY0FBSjtBQUFBLGdCQUFXQyxrQkFBWDtBQUFBLGdCQUFzQkMsMEJBQXRCO0FBQUEsZ0JBQXlDQyx3QkFBekM7QUFBQSxnQkFBMERDLGdCQUExRDtBQUFBLGdCQUFtRUMsYUFBbkU7QUFBQSxnQkFBeUVDLGFBQXpFO0FBQUEsZ0JBQStFQyxhQUEvRTtBQUFBLGdCQUFxRkMsZ0JBQXJGO0FBQUEsZ0JBQThGdEIsY0FBOUY7QUFDQWMsb0JBQVFKLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUjtBQUNBRyxrQkFBTUYsWUFBTixDQUFtQixNQUFuQixFQUEyQixPQUEzQjtBQUNBRSxrQkFBTUYsWUFBTixDQUFtQixPQUFuQixFQUE0QlcsNEJBQTVCOztBQUVBUix3QkFBWUwsU0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFaO0FBQ0FJLHNCQUFVSCxZQUFWLENBQXVCLE1BQXZCLEVBQStCLFdBQS9CO0FBQ0E7QUFDQUcsc0JBQVVILFlBQVYsQ0FBdUIsT0FBdkIsRUFBZ0MsY0FBWVYsTUFBNUM7O0FBRUFjLGdDQUFvQk4sU0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFwQjtBQUNBSyw4QkFBa0JKLFlBQWxCLENBQStCLE1BQS9CLEVBQXVDLG1CQUF2QztBQUNBSSw4QkFBa0JKLFlBQWxCLENBQStCLE9BQS9CLEVBQXdDLFFBQXhDOztBQUVBSyw4QkFBa0JQLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBbEI7QUFDQU0sNEJBQWdCTCxZQUFoQixDQUE2QixNQUE3QixFQUFxQyxpQkFBckM7QUFDQUssNEJBQWdCTCxZQUFoQixDQUE2QixPQUE3QixFQUFzQyxNQUF0Qzs7QUFFQU0sc0JBQVVSLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBVjtBQUNBTyxvQkFBUU4sWUFBUixDQUFxQixNQUFyQixFQUE2QixTQUE3QjtBQUNBTSxvQkFBUU4sWUFBUixDQUFxQixPQUFyQixFQUE4QixRQUE5Qjs7QUFFQU8sbUJBQU9ULFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUDtBQUNBUSxpQkFBS1AsWUFBTCxDQUFrQixNQUFsQixFQUEwQixNQUExQjtBQUNBTyxpQkFBS1AsWUFBTCxDQUFrQixPQUFsQixFQUEyQlYsU0FBTyxRQUFsQzs7QUFFQWtCLG1CQUFPVixTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQVA7QUFDQVMsaUJBQUtSLFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsTUFBMUI7QUFDQVEsaUJBQUtSLFlBQUwsQ0FBa0IsT0FBbEIsRUFBMkIsT0FBM0I7O0FBRUFTLG1CQUFPWCxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQVA7QUFDQVUsaUJBQUtULFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsU0FBMUI7QUFDQVMsaUJBQUtULFlBQUwsQ0FBa0IsT0FBbEIsRUFBMkIsTUFBM0I7O0FBRUFVLHNCQUFVWixTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQVY7QUFDQVcsb0JBQVFWLFlBQVIsQ0FBcUIsTUFBckIsRUFBNkIsU0FBN0I7QUFDQVUsb0JBQVFWLFlBQVIsQ0FBcUIsT0FBckIsRUFBOEIsU0FBOUI7O0FBRUEsZ0JBQUdaLEtBQUgsRUFBUTtBQUNKQSx3QkFBT1UsU0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFQO0FBQ0FYLHNCQUFLWSxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLE1BQTFCO0FBQ0FaLHNCQUFLWSxZQUFMLENBQWtCLE9BQWxCLEVBQTJCLE1BQTNCO0FBQ0g7O0FBRURSLDJCQUFlTSxTQUFTQyxhQUFULENBQXVCLFFBQXZCLENBQWY7QUFDQVAseUJBQWFRLFlBQWIsQ0FBMEIsSUFBMUIsRUFBZ0NWLFNBQU8sUUFBdkM7QUFDQUUseUJBQWFRLFlBQWIsQ0FBMEIsTUFBMUIsRUFBa0NWLFNBQU8sUUFBekM7QUFDQUUseUJBQWFRLFlBQWIsQ0FBMEIsT0FBMUIsRUFBbUMsTUFBbkM7QUFDQVIseUJBQWFRLFlBQWIsQ0FBMEIsUUFBMUIsRUFBb0MsTUFBcEM7QUFDQVIseUJBQWFRLFlBQWIsQ0FBMEIsT0FBMUIsRUFBbUMsU0FBbkM7O0FBRUEsZ0JBQUdQLGdCQUFnQixPQUFuQixFQUEyQjtBQUN2QkQsNkJBQWFRLFlBQWIsQ0FBMEIsTUFBMUIsRUFBa0NXLDRCQUFsQztBQUNBbkIsNkJBQWFRLFlBQWIsQ0FBMEIsTUFBMUIsRUFBa0MsK0JBQWxDO0FBQ0gsYUFIRCxNQUdLO0FBQ0RSLDZCQUFhUSxZQUFiLENBQTBCLFNBQTFCLEVBQXFDLDRDQUFyQzs7QUFFQVIsNkJBQWFTLFdBQWIsQ0FBeUJDLEtBQXpCO0FBQ0g7QUFDRFYseUJBQWFTLFdBQWIsQ0FBeUJiLEtBQXpCO0FBQ0FJLHlCQUFhUyxXQUFiLENBQXlCUyxPQUF6QjtBQUNBbEIseUJBQWFTLFdBQWIsQ0FBeUJRLElBQXpCO0FBQ0FqQix5QkFBYVMsV0FBYixDQUF5QkksZUFBekI7QUFDQWIseUJBQWFTLFdBQWIsQ0FBeUJHLGlCQUF6QjtBQUNBWix5QkFBYVMsV0FBYixDQUF5QkUsU0FBekI7O0FBRUFqQixzQkFBVWUsV0FBVixDQUFzQlQsWUFBdEI7QUFDSDtBQUNELGVBQU9BLFlBQVA7QUFDSCxLQWpGRDs7QUFtRkFILFNBQUt1QixNQUFMLEdBQWMsWUFBSztBQUNmbEIsMEJBQWtCQyxHQUFsQixDQUFzQiw4QkFBdEI7QUFDQSxZQUFHSCxZQUFILEVBQWdCO0FBQ1pILGlCQUFLd0IsT0FBTDtBQUNIO0FBQ0QsZUFBT2pCLG9CQUFQO0FBQ0gsS0FORDs7QUFRQVAsU0FBS3dCLE9BQUwsR0FBZSxZQUFLO0FBQ2hCbkIsMEJBQWtCQyxHQUFsQixDQUFzQiw4QkFBdEI7QUFDQVQsa0JBQVU0QixXQUFWLENBQXNCdEIsWUFBdEI7QUFDQUEsdUJBQWUsSUFBZjtBQUNILEtBSkQ7O0FBTUEsV0FBT0gsSUFBUDtBQUNILENBekdELEMsQ0FUQTs7Ozs7cUJBb0hlSixPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwSGY7O0FBMkJBOztBQUdBOzs7Ozs7QUFPQSxJQUFNOEIsV0FBVyxTQUFYQSxRQUFXLENBQVNDLGVBQVQsRUFBMEJDLFFBQTFCLEVBQW1DO0FBQ2hELFFBQU1DLGlCQUFpQixFQUF2Qjs7QUFFQXhCLHNCQUFrQkMsR0FBbEIsQ0FBc0IsdUJBQXRCLEVBQThDcUIsZUFBOUMsRUFBK0RDLFFBQS9EO0FBQ0EsUUFBTTVCLE9BQU8sRUFBYjs7QUFFQSxRQUFJOEIsVUFBVSxnQ0FBb0JILGVBQXBCLENBQWQ7QUFDQSxRQUFNSSxVQUFVLFNBQVZBLE9BQVUsQ0FBVUMsR0FBVixFQUFlQyxHQUFmLEVBQW9CQyxHQUFwQixFQUF5QjtBQUNyQyxlQUFPQyxLQUFLRCxHQUFMLENBQVNDLEtBQUtGLEdBQUwsQ0FBU0QsR0FBVCxFQUFjRSxHQUFkLENBQVQsRUFBNkJELEdBQTdCLENBQVA7QUFDSCxLQUZEO0FBR0EsUUFBTUcsVUFBVSxTQUFWQSxPQUFVLENBQVNDLEtBQVQsRUFBZTtBQUMzQlQsaUJBQVNVLFFBQVQsQ0FBa0JDLHNCQUFsQjtBQUNBWCxpQkFBU1ksS0FBVDs7QUFFQTtBQUNBWixpQkFBU2EsT0FBVCxDQUFpQkMsZ0JBQWpCLEVBQXdCTCxLQUF4QjtBQUNILEtBTkQ7O0FBUUE7QUFDQVIsbUJBQWVjLE9BQWYsR0FBeUIsWUFBTTtBQUMzQmYsaUJBQVNnQixVQUFULENBQW9CLElBQXBCO0FBQ0FoQixpQkFBU2EsT0FBVCxDQUFpQkksOEJBQWpCO0FBQ0F4QywwQkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QjtBQUNILEtBSkQ7QUFLQTtBQUNBdUIsbUJBQWVpQixjQUFmLEdBQWdDLFlBQU07QUFDbENqQix1QkFBZWtCLFFBQWY7QUFDQTFDLDBCQUFrQkMsR0FBbEIsQ0FBc0IsbUNBQXRCO0FBQ0gsS0FIRDtBQUlBO0FBQ0F1QixtQkFBZW1CLEtBQWYsR0FBdUIsWUFBTTtBQUN6QjNDLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMEJBQXRCO0FBQ0EsWUFBR3NCLFNBQVNxQixRQUFULE1BQXVCQyxxQkFBdkIsSUFBcUN0QixTQUFTcUIsUUFBVCxNQUF1QkUseUJBQS9ELEVBQThFO0FBQzFFdkIscUJBQVNhLE9BQVQsQ0FBaUJXLDJCQUFqQjtBQUNBeEIscUJBQVNVLFFBQVQsQ0FBa0JhLHlCQUFsQjtBQUNIO0FBQ0osS0FORDtBQU9BO0FBQ0F0QixtQkFBZXdCLFVBQWYsR0FBNEIsWUFBTTtBQUM5QjtBQUNBOzs7Ozs7O0FBT0FoRCwwQkFBa0JDLEdBQWxCLENBQXNCLCtCQUF0QjtBQUNILEtBVkQ7QUFXQTtBQUNBdUIsbUJBQWV5QixjQUFmLEdBQWdDLFlBQU07QUFDbEMsWUFBSUMsU0FBVXpCLFFBQVEwQixRQUFSLEtBQXFCQyxRQUF0QixHQUFrQyxJQUFsQyxHQUF5Qyx5QkFBYTlCLGVBQWIsQ0FBdEQ7QUFDQSxZQUFJK0IsVUFBVTlCLFNBQVMrQixVQUFULEVBQWQ7QUFDQSxZQUFJQyxjQUFjaEMsU0FBU2lDLGdCQUFULEVBQWxCO0FBQ0EsWUFBSUMsT0FBT0YsY0FBYyxDQUFDLENBQWYsR0FBbUJGLFFBQVFFLFdBQVIsRUFBcUJFLElBQXhDLEdBQStDLEVBQTFEO0FBQ0EsWUFBSUMsV0FBVztBQUNYUCxzQkFBVUQsU0FBVUUsUUFBVixHQUFxQjNCLFFBQVEwQixRQUQ1QjtBQUVYTSxrQkFBTUE7QUFGSyxTQUFmOztBQUtBekQsMEJBQWtCQyxHQUFsQixDQUFzQixtQ0FBdEIsRUFBMkR5RCxRQUEzRDtBQUNBbkMsaUJBQVNhLE9BQVQsQ0FBaUJ1Qix1QkFBakIsRUFBK0JELFFBQS9CO0FBQ0gsS0FaRDtBQWFBO0FBQ0FsQyxtQkFBZVcsS0FBZixHQUF1QixZQUFNO0FBQ3pCLFlBQUdaLFNBQVNxQixRQUFULE9BQXdCRSx5QkFBeEIsSUFBeUN2QixTQUFTcUIsUUFBVCxPQUF3QlYsc0JBQXBFLEVBQWdGO0FBQzVFLG1CQUFPLEtBQVA7QUFDSDtBQUNELFlBQUdULFFBQVFrQixLQUFYLEVBQWlCO0FBQ2IsbUJBQU8sS0FBUDtBQUNIO0FBQ0QsWUFBR2xCLFFBQVFPLEtBQVgsRUFBaUI7QUFDYixtQkFBTyxLQUFQO0FBQ0g7QUFDRCxZQUFHUCxRQUFRbUMsV0FBUixLQUF3Qm5DLFFBQVEwQixRQUFuQyxFQUE0QztBQUN4QyxtQkFBTyxLQUFQO0FBQ0g7QUFDRG5ELDBCQUFrQkMsR0FBbEIsQ0FBc0IsMEJBQXRCO0FBQ0FzQixpQkFBU1UsUUFBVCxDQUFrQjRCLHVCQUFsQjtBQUNILEtBZkQ7QUFnQkE7QUFDQXJDLG1CQUFlc0MsSUFBZixHQUFzQixZQUFNO0FBQ3hCLFlBQUksQ0FBQ3JDLFFBQVFzQyxNQUFULElBQW1CeEMsU0FBU3FCLFFBQVQsT0FBd0JvQix3QkFBL0MsRUFBOEQ7QUFDMURoRSw4QkFBa0JDLEdBQWxCLENBQXNCLHlCQUF0QjtBQUNBc0IscUJBQVNVLFFBQVQsQ0FBa0JnQyx3QkFBbEI7QUFDSDtBQUVKLEtBTkQ7QUFPQTtBQUNBekMsbUJBQWUwQyxPQUFmLEdBQXlCLFlBQU07QUFDM0JsRSwwQkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QjtBQUNBc0IsaUJBQVNVLFFBQVQsQ0FBa0IrQix3QkFBbEI7QUFDQTtBQUNILEtBSkQ7QUFLQTtBQUNBeEMsbUJBQWVrQixRQUFmLEdBQTBCLFlBQU07QUFDNUIsWUFBSXlCLGFBQWExQyxRQUFRMkMsUUFBekI7QUFDQSxZQUFHLENBQUNELFVBQUosRUFBZ0I7QUFDWixtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsWUFBSWhCLFdBQVcxQixRQUFRMEIsUUFBdkI7QUFBQSxZQUFpQ2tCLFdBQVc1QyxRQUFRbUMsV0FBcEQ7QUFDQSxZQUFJUSxXQUFXMUMsUUFBUyxDQUFDeUMsV0FBV0csTUFBWCxHQUFtQixDQUFuQixHQUF1QkgsV0FBV0ksR0FBWCxDQUFlSixXQUFXRyxNQUFYLEdBQW9CLENBQW5DLENBQXZCLEdBQStELENBQWhFLElBQXNFbkIsUUFBL0UsRUFBeUYsQ0FBekYsRUFBNEYsQ0FBNUYsQ0FBZjs7QUFFQW5ELDBCQUFrQkMsR0FBbEIsQ0FBc0IsNkJBQXRCLEVBQXFEbUUsV0FBUyxHQUE5RDs7QUFFQTdDLGlCQUFTaUQsU0FBVCxDQUFtQkosV0FBUyxHQUE1QjtBQUNBN0MsaUJBQVNhLE9BQVQsQ0FBaUJxQyx5QkFBakIsRUFBaUM7QUFDN0JDLDJCQUFlTixXQUFTLEdBREs7QUFFN0JDLHNCQUFXQSxRQUZrQjtBQUc3QmxCLHNCQUFVQTtBQUhtQixTQUFqQztBQUtILEtBakJEO0FBa0JBO0FBQ0EzQixtQkFBZW1ELE9BQWYsR0FBeUIsWUFBTTtBQUMzQjNFLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMEJBQXRCO0FBQ0gsS0FGRDtBQUdBO0FBQ0F1QixtQkFBZW9ELFVBQWYsR0FBNEIsWUFBTTtBQUM5QixZQUFNUCxXQUFXNUMsUUFBUW1DLFdBQXpCO0FBQ0EsWUFBTVQsV0FBVzFCLFFBQVEwQixRQUF6QjtBQUNBLFlBQUkwQixNQUFNMUIsUUFBTixDQUFKLEVBQXFCO0FBQ2pCO0FBQ0g7O0FBRUQsWUFBRyxDQUFDNUIsU0FBU3VELFNBQVQsRUFBRCxJQUF5QixDQUFDckQsUUFBUXNDLE1BQXJDLEVBQTRDO0FBQ3hDeEMscUJBQVNVLFFBQVQsQ0FBa0IrQix3QkFBbEI7QUFDSDtBQUNEOzs7O0FBSUEsWUFBSXpDLFNBQVNxQixRQUFULE9BQXdCb0Isd0JBQXhCLElBQXlDekMsU0FBU3VELFNBQVQsRUFBN0MsRUFBbUU7QUFDL0R2RCxxQkFBU2EsT0FBVCxDQUFpQjJDLHVCQUFqQixFQUErQjtBQUMzQlYsMEJBQVVBLFFBRGlCO0FBRTNCbEIsMEJBQVVBO0FBRmlCLGFBQS9CO0FBSUg7QUFFSixLQXJCRDtBQXNCQTNCLG1CQUFld0QsTUFBZixHQUF3QixZQUFNO0FBQzFCaEYsMEJBQWtCQyxHQUFsQixDQUFzQiwyQkFBdEI7QUFDSCxLQUZEO0FBR0F1QixtQkFBZXlELE9BQWYsR0FBeUIsWUFBTTtBQUMzQjFELGlCQUFTMkQsVUFBVCxDQUFvQixJQUFwQjtBQUNBbEYsMEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEIsRUFBb0R3QixRQUFRbUMsV0FBNUQ7QUFDQXJDLGlCQUFTYSxPQUFULENBQWlCK0MsdUJBQWpCLEVBQThCO0FBQzFCZCxzQkFBVzVDLFFBQVFtQztBQURPLFNBQTlCO0FBR0gsS0FORDtBQU9BcEMsbUJBQWU0RCxNQUFmLEdBQXdCLFlBQU07QUFDMUIsWUFBRyxDQUFDN0QsU0FBU3VELFNBQVQsRUFBSixFQUF5QjtBQUNyQjtBQUNIO0FBQ0Q5RSwwQkFBa0JDLEdBQWxCLENBQXNCLDJCQUF0QjtBQUNBc0IsaUJBQVMyRCxVQUFULENBQW9CLEtBQXBCO0FBQ0EzRCxpQkFBU2EsT0FBVCxDQUFpQmlELHlCQUFqQjtBQUNILEtBUEQ7O0FBU0E7QUFDQTdELG1CQUFlOEQsT0FBZixHQUF5QixZQUFNO0FBQzNCdEYsMEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEIsRUFBb0RzQixTQUFTcUIsUUFBVCxFQUFwRDtBQUNBLFlBQUdyQixTQUFTdUQsU0FBVCxFQUFILEVBQXdCO0FBQ3BCdkQscUJBQVNVLFFBQVQsQ0FBa0JnQyx3QkFBbEI7QUFDSCxTQUZELE1BRU0sSUFBRzFDLFNBQVNxQixRQUFULE9BQXdCb0Isd0JBQTNCLEVBQXlDO0FBQzNDekMscUJBQVNVLFFBQVQsQ0FBa0JzRCx3QkFBbEI7QUFDSDtBQUNKLEtBUEQ7O0FBU0EvRCxtQkFBZWdFLFlBQWYsR0FBOEIsWUFBTTs7QUFFaEN4RiwwQkFBa0JDLEdBQWxCLENBQXNCLGlDQUF0QixFQUF5RDZCLEtBQUsyRCxLQUFMLENBQVdoRSxRQUFRaUUsTUFBUixHQUFpQixHQUE1QixDQUF6RDtBQUNBbkUsaUJBQVNhLE9BQVQsQ0FBaUJ1RCx5QkFBakIsRUFBaUM7QUFDN0JELG9CQUFRNUQsS0FBSzJELEtBQUwsQ0FBV2hFLFFBQVFpRSxNQUFSLEdBQWlCLEdBQTVCLENBRHFCO0FBRTdCRSxrQkFBTW5FLFFBQVFvRTtBQUZlLFNBQWpDO0FBSUgsS0FQRDs7QUFTQXJFLG1CQUFlUSxLQUFmLEdBQXVCLFlBQU07QUFDekIsWUFBTThELE9BQVFyRSxRQUFRTyxLQUFSLElBQWlCUCxRQUFRTyxLQUFSLENBQWM4RCxJQUFoQyxJQUF5QyxDQUF0RDtBQUNBLFlBQU1DLGVBQWdCO0FBQ2xCLGVBQUcsRUFBQ0QsTUFBT0UsK0JBQVIsRUFBOEJDLFFBQVMsMkJBQXZDLEVBQW9FQyxTQUFVLDJCQUE5RSxFQURlO0FBRWxCLGVBQUcsRUFBQ0osTUFBT0sseUNBQVIsRUFBd0NGLFFBQVMsMkJBQWpELEVBQThFQyxTQUFVLDJCQUF4RixFQUZlO0FBR2xCLGVBQUcsRUFBQ0osTUFBT00sdUNBQVIsRUFBc0NILFFBQVMsdUJBQS9DLEVBQXdFQyxTQUFVLHVCQUFsRixFQUhlO0FBSWxCLGVBQUcsRUFBQ0osTUFBT08sc0NBQVIsRUFBcUNKLFFBQVMsc0JBQTlDLEVBQXNFQyxTQUFVLHNCQUFoRixFQUplO0FBS2xCLGVBQUcsRUFBQ0osTUFBT1EsNEJBQVIsRUFBMkJMLFFBQVMsMEJBQXBDLEVBQWdFQyxTQUFVLDBCQUExRTtBQUxlLFVBTXBCSixJQU5vQixLQU1iLENBTlQ7QUFPQUMscUJBQWEvRCxLQUFiLEdBQXFCUCxRQUFRTyxLQUE3Qjs7QUFFQWhDLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMEJBQXRCLEVBQWtEOEYsWUFBbEQ7QUFDQWhFLGdCQUFRZ0UsWUFBUjtBQUNILEtBYkQ7O0FBZUFRLFdBQU9DLElBQVAsQ0FBWWhGLGNBQVosRUFBNEJpRixPQUE1QixDQUFvQyxxQkFBYTtBQUM3Q2hGLGdCQUFRaUYsbUJBQVIsQ0FBNEJDLFNBQTVCLEVBQXVDbkYsZUFBZW1GLFNBQWYsQ0FBdkM7QUFDQWxGLGdCQUFRbUYsZ0JBQVIsQ0FBeUJELFNBQXpCLEVBQW9DbkYsZUFBZW1GLFNBQWYsQ0FBcEM7QUFDSCxLQUhEOztBQUtBaEgsU0FBS3dCLE9BQUwsR0FBZSxZQUFLO0FBQ2hCbkIsMEJBQWtCQyxHQUFsQixDQUFzQiwyQkFBdEI7O0FBRUFzRyxlQUFPQyxJQUFQLENBQVloRixjQUFaLEVBQTRCaUYsT0FBNUIsQ0FBb0MscUJBQWE7QUFDN0NoRixvQkFBUWlGLG1CQUFSLENBQTRCQyxTQUE1QixFQUF1Q25GLGVBQWVtRixTQUFmLENBQXZDO0FBQ0gsU0FGRDtBQUdILEtBTkQ7QUFPQSxXQUFPaEgsSUFBUDtBQUNILENBOU1EOztxQkFnTmUwQixROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsUGY7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBT0E7Ozs7OztBQWJBOzs7QUFtQkEsSUFBTXdGLFdBQVcsU0FBWEEsUUFBVyxDQUFVQyxJQUFWLEVBQWdCQyxZQUFoQixFQUE4QkMsY0FBOUIsRUFBNkM7QUFDMURoSCxzQkFBa0JDLEdBQWxCLENBQXNCLGVBQXRCOztBQUVBLFFBQUlOLE9BQU0sRUFBVjtBQUNBLG1DQUFhQSxJQUFiOztBQUVBLFFBQUlzSCxXQUFXLDJCQUFlSCxLQUFLeEYsZUFBcEIsRUFBcUMzQixJQUFyQyxDQUFmO0FBQ0EsUUFBSThCLFVBQVUsZ0NBQW9CcUYsS0FBS3hGLGVBQXpCLENBQWQ7QUFDQSxRQUFJNEYsY0FBY0gsYUFBYUksU0FBYixHQUF5QkMsS0FBekIsSUFBZ0MsRUFBbEQ7QUFDQTNGLFlBQVE0RixZQUFSLEdBQXVCNUYsUUFBUTZGLG1CQUFSLEdBQThCUCxhQUFhUSxlQUFiLEVBQXJEOztBQUdBLFFBQU1DLFFBQVEsU0FBUkEsS0FBUSxDQUFDQyxnQkFBRCxFQUFxQjtBQUMvQixZQUFNQyxTQUFVWixLQUFLekQsT0FBTCxDQUFheUQsS0FBS2EsYUFBbEIsQ0FBaEI7QUFDQWIsYUFBS2MsU0FBTCxHQUFpQkYsT0FBT0UsU0FBeEI7QUFDQSxZQUFHLENBQUNkLEtBQUtjLFNBQVQsRUFBbUI7QUFDZjtBQUNBYix5QkFBYWMsZUFBYixDQUE2QixJQUE3QjtBQUNIO0FBQ0QsWUFBR2IsY0FBSCxFQUFrQjtBQUNkQSwyQkFBZVUsTUFBZixFQUF1QkQsZ0JBQXZCO0FBQ0gsU0FGRCxNQUVLO0FBQ0R6SCw4QkFBa0JDLEdBQWxCLENBQXNCLGtCQUF0QixFQUEwQ3lILE1BQTFDLEVBQWtELHdCQUF1QkQsZ0JBQXpFO0FBQ0EsZ0JBQUlLLGlCQUFpQnJHLFFBQVFzRyxHQUE3QjtBQUNBLGdCQUFNQyxnQkFBZ0I1SCxTQUFTQyxhQUFULENBQXVCLFFBQXZCLENBQXRCOztBQUVBMkgsMEJBQWNELEdBQWQsR0FBb0JMLE9BQU9PLElBQTNCO0FBQ0EsZ0JBQU1DLGdCQUFpQkYsY0FBY0QsR0FBZCxLQUFzQkQsY0FBN0M7QUFDQSxnQkFBSUksYUFBSixFQUFtQjtBQUNmekcsd0JBQVFzRyxHQUFSLEdBQWNqQixLQUFLekQsT0FBTCxDQUFheUQsS0FBS2EsYUFBbEIsRUFBaUNNLElBQS9DO0FBQ0E7QUFDQSxvQkFBSUgsY0FBSixFQUFvQjtBQUNoQnJHLDRCQUFRMEcsSUFBUjtBQUNIO0FBQ0osYUFORCxNQU1NLElBQUdWLHFCQUFxQixDQUFyQixJQUEwQmhHLFFBQVFtQyxXQUFSLEdBQXNCLENBQW5ELEVBQXFEO0FBQ3ZEakUscUJBQUt5SSxJQUFMLENBQVVYLGdCQUFWO0FBQ0g7QUFDRCxnQkFBR0EsbUJBQW1CLENBQXRCLEVBQXdCO0FBQ3BCOUgscUJBQUt5SSxJQUFMLENBQVVYLGdCQUFWO0FBQ0E5SCxxQkFBS21FLElBQUw7QUFDSDtBQUNEOzs7O0FBSUEsZ0JBQUdvRCxXQUFILEVBQWU7QUFDWDtBQUNBO0FBQ0E7QUFDSDtBQUNKO0FBQ0osS0F2Q0Q7O0FBeUNBdkgsU0FBSzBJLE9BQUwsR0FBZSxZQUFNO0FBQ2pCLGVBQU92QixLQUFLakcsSUFBWjtBQUNILEtBRkQ7QUFHQWxCLFNBQUsySSxPQUFMLEdBQWUsWUFBTTtBQUNqQixlQUFPeEIsS0FBS3dCLE9BQVo7QUFDSCxLQUZEO0FBR0EzSSxTQUFLNEMsVUFBTCxHQUFrQixVQUFDK0YsT0FBRCxFQUFhO0FBQzNCeEIsYUFBS3dCLE9BQUwsR0FBZUEsT0FBZjtBQUNILEtBRkQ7QUFHQTNJLFNBQUttRixTQUFMLEdBQWlCLFlBQUk7QUFDakIsZUFBT2dDLEtBQUs3QixPQUFaO0FBQ0gsS0FGRDtBQUdBdEYsU0FBS3VGLFVBQUwsR0FBa0IsVUFBQ0QsT0FBRCxFQUFXO0FBQ3pCNkIsYUFBSzdCLE9BQUwsR0FBZUEsT0FBZjtBQUNILEtBRkQ7O0FBSUF0RixTQUFLc0MsUUFBTCxHQUFnQixVQUFDc0csUUFBRCxFQUFjO0FBQzFCLFlBQUd6QixLQUFLMEIsS0FBTCxLQUFlRCxRQUFsQixFQUEyQjtBQUN2QixnQkFBSUUsWUFBWTNCLEtBQUswQixLQUFyQjtBQUNBLG9CQUFPRCxRQUFQO0FBQ0kscUJBQUt6Rix5QkFBTDtBQUNJbkQseUJBQUt5QyxPQUFMLENBQWFzRywwQkFBYjtBQUNBO0FBQ0oscUJBQUs3RSx1QkFBTDtBQUNJbEUseUJBQUt5QyxPQUFMLENBQWF1Ryx1QkFBYixFQUEyQjtBQUN2QkYsbUNBQVczQixLQUFLMEI7QUFETyxxQkFBM0I7QUFHQTtBQUNKLHFCQUFLeEUsd0JBQUw7QUFDSXJFLHlCQUFLeUMsT0FBTCxDQUFhd0csc0JBQWIsRUFBMEI7QUFDdEJILG1DQUFXM0IsS0FBSzBCO0FBRE0scUJBQTFCO0FBR0E7QUFiUjtBQWVBMUIsaUJBQUswQixLQUFMLEdBQWFELFFBQWI7QUFDQTVJLGlCQUFLeUMsT0FBTCxDQUFheUcsdUJBQWIsRUFBMkI7QUFDdkJDLDJCQUFZTCxTQURXO0FBRXZCTSwwQkFBVWpDLEtBQUswQjtBQUZRLGFBQTNCO0FBSUg7QUFDSixLQXhCRDtBQXlCQTdJLFNBQUtpRCxRQUFMLEdBQWdCLFlBQUs7QUFDakIsZUFBT2tFLEtBQUswQixLQUFaO0FBQ0gsS0FGRDtBQUdBN0ksU0FBSzZFLFNBQUwsR0FBaUIsVUFBQ3dFLFNBQUQsRUFBZTtBQUM1QmxDLGFBQUttQyxNQUFMLEdBQWNELFNBQWQ7QUFDSCxLQUZEO0FBR0FySixTQUFLdUosU0FBTCxHQUFpQixZQUFNO0FBQ25CLGVBQU9wQyxLQUFLbUMsTUFBWjtBQUNILEtBRkQ7QUFHQXRKLFNBQUt3SixXQUFMLEdBQW1CLFlBQU07QUFDckIsWUFBSWpHLFNBQVV6QixRQUFRMEIsUUFBUixLQUFxQkMsUUFBdEIsR0FBa0MsSUFBbEMsR0FBeUMseUJBQWEwRCxLQUFLeEYsZUFBbEIsQ0FBdEQ7QUFDQSxlQUFPNEIsU0FBVUUsUUFBVixHQUFxQjNCLFFBQVEwQixRQUFwQztBQUNILEtBSEQ7QUFJQXhELFNBQUt5SixXQUFMLEdBQW1CLFlBQU07QUFDckIsWUFBRyxDQUFDM0gsT0FBSixFQUFZO0FBQ1IsbUJBQU8sQ0FBUDtBQUNIO0FBQ0QsZUFBT0EsUUFBUW1DLFdBQWY7QUFDSCxLQUxEO0FBTUFqRSxTQUFLMEosU0FBTCxHQUFpQixVQUFDM0QsTUFBRCxFQUFXO0FBQ3hCLFlBQUcsQ0FBQ2pFLE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDtBQUNEQSxnQkFBUWlFLE1BQVIsR0FBaUJBLFNBQU8sR0FBeEI7QUFDSCxLQUxEO0FBTUEvRixTQUFLMkosU0FBTCxHQUFpQixZQUFLO0FBQ2xCLFlBQUcsQ0FBQzdILE9BQUosRUFBWTtBQUNSLG1CQUFPLENBQVA7QUFDSDtBQUNELGVBQU9BLFFBQVFpRSxNQUFSLEdBQWUsR0FBdEI7QUFDSCxLQUxEO0FBTUEvRixTQUFLNEosT0FBTCxHQUFlLFVBQUNmLEtBQUQsRUFBVTtBQUNyQixZQUFHLENBQUMvRyxPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7QUFDRCxZQUFJLE9BQU8rRyxLQUFQLEtBQWlCLFdBQXJCLEVBQWtDOztBQUU5Qi9HLG9CQUFRb0UsS0FBUixHQUFnQixDQUFDcEUsUUFBUW9FLEtBQXpCOztBQUVBbEcsaUJBQUt5QyxPQUFMLENBQWFvSCx1QkFBYixFQUEyQjtBQUN2QjVELHNCQUFNbkUsUUFBUW9FO0FBRFMsYUFBM0I7QUFJSCxTQVJELE1BUU87O0FBRUhwRSxvQkFBUW9FLEtBQVIsR0FBZ0IyQyxLQUFoQjs7QUFFQTdJLGlCQUFLeUMsT0FBTCxDQUFhb0gsdUJBQWIsRUFBMkI7QUFDdkI1RCxzQkFBTW5FLFFBQVFvRTtBQURTLGFBQTNCO0FBR0g7QUFDRCxlQUFPcEUsUUFBUW9FLEtBQWY7QUFDSCxLQXJCRDtBQXNCQWxHLFNBQUs4SixPQUFMLEdBQWUsWUFBSztBQUNoQixZQUFHLENBQUNoSSxPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7QUFDRCxlQUFPQSxRQUFRb0UsS0FBZjtBQUNILEtBTEQ7O0FBT0FsRyxTQUFLK0osT0FBTCxHQUFlLFVBQUNyRyxPQUFELEVBQVVvRSxnQkFBVixFQUE4QjtBQUN6Q1gsYUFBS3pELE9BQUwsR0FBZUEsT0FBZjtBQUNBeUQsYUFBS2EsYUFBTCxHQUFxQiw4QkFBa0J0RSxPQUFsQixFQUEyQnlELEtBQUthLGFBQWhDLEVBQStDWixZQUEvQyxDQUFyQjtBQUNBUyxjQUFNQyxvQkFBb0IsQ0FBMUI7O0FBRUEsZUFBTyxJQUFJa0MsT0FBSixDQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzFDRDs7QUFFQSxnQkFBRzdDLGFBQWErQyxXQUFiLEVBQUgsRUFBOEI7QUFDMUJuSyxxQkFBS21FLElBQUw7QUFDSDtBQUNELGdCQUFHaUQsYUFBYWdELE1BQWIsRUFBSCxFQUF5QjtBQUNyQnBLLHFCQUFLNEosT0FBTCxDQUFhLElBQWI7QUFDSDtBQUNELGdCQUFHeEMsYUFBYXVDLFNBQWIsRUFBSCxFQUE0QjtBQUN4QjNKLHFCQUFLMEosU0FBTCxDQUFldEMsYUFBYXVDLFNBQWIsRUFBZjtBQUNIO0FBQ0osU0FaTSxDQUFQO0FBY0gsS0FuQkQ7QUFvQkEzSixTQUFLd0ksSUFBTCxHQUFZLFVBQUM5RSxPQUFELEVBQVk7QUFDcEJ5RCxhQUFLekQsT0FBTCxHQUFlQSxPQUFmO0FBQ0F5RCxhQUFLYSxhQUFMLEdBQXFCLDhCQUFrQnRFLE9BQWxCLEVBQTJCeUQsS0FBS2EsYUFBaEMsRUFBK0NaLFlBQS9DLENBQXJCO0FBQ0FTLGNBQU1WLEtBQUt6RCxPQUFMLENBQWEyRyxTQUFiLElBQTBCLENBQWhDO0FBQ0gsS0FKRDs7QUFNQXJLLFNBQUttRSxJQUFMLEdBQVksWUFBSztBQUNiLFlBQUcsQ0FBQ3JDLE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDs7QUFFRCxZQUFHOUIsS0FBS2lELFFBQUwsT0FBb0JvQix3QkFBdkIsRUFBcUM7QUFDakMsZ0JBQUlpRyxVQUFVeEksUUFBUXFDLElBQVIsRUFBZDtBQUNBLGdCQUFJbUcsWUFBWUMsU0FBaEIsRUFBMkI7QUFDdkJELHdCQUFRRSxJQUFSLENBQWEsYUFBSztBQUNkO0FBQ0gsaUJBRkQsV0FFUyxpQkFBUztBQUNkO0FBQ0E7QUFDQUMsK0JBQVcsWUFBVTtBQUNqQnpLLDZCQUFLbUUsSUFBTDtBQUNILHFCQUZELEVBRUcsSUFGSDtBQUlILGlCQVREO0FBVUg7QUFFSjtBQUNKLEtBckJEO0FBc0JBbkUsU0FBS3dDLEtBQUwsR0FBYSxZQUFLO0FBQ2QsWUFBRyxDQUFDVixPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7QUFDRCxZQUFHOUIsS0FBS2lELFFBQUwsT0FBb0JvQix3QkFBdkIsRUFBcUM7QUFDakN2QyxvQkFBUVUsS0FBUjtBQUNIO0FBQ0osS0FQRDtBQVFBeEMsU0FBS3lJLElBQUwsR0FBWSxVQUFDL0QsUUFBRCxFQUFhO0FBQ3JCLFlBQUcsQ0FBQzVDLE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDtBQUNEQSxnQkFBUW1DLFdBQVIsR0FBc0JTLFFBQXRCO0FBQ0gsS0FMRDtBQU1BMUUsU0FBSzBLLGVBQUwsR0FBdUIsVUFBQ2hELFlBQUQsRUFBaUI7QUFDcEMsWUFBRyxDQUFDNUYsT0FBSixFQUFZO0FBQ1IsbUJBQU8sS0FBUDtBQUNIO0FBQ0Q5QixhQUFLeUMsT0FBTCxDQUFha0ksZ0NBQWIsRUFBb0MsRUFBQ2pELGNBQWVBLFlBQWhCLEVBQXBDO0FBQ0EsZUFBTzVGLFFBQVE0RixZQUFSLEdBQXVCNUYsUUFBUTZGLG1CQUFSLEdBQThCRCxZQUE1RDtBQUNILEtBTkQ7QUFPQTFILFNBQUs0SCxlQUFMLEdBQXVCLFlBQUs7QUFDeEIsWUFBRyxDQUFDOUYsT0FBSixFQUFZO0FBQ1IsbUJBQU8sQ0FBUDtBQUNIO0FBQ0QsZUFBT0EsUUFBUTRGLFlBQWY7QUFDSCxLQUxEOztBQU9BMUgsU0FBSzJELFVBQUwsR0FBa0IsWUFBTTtBQUNwQixZQUFHLENBQUM3QixPQUFKLEVBQVk7QUFDUixtQkFBTyxFQUFQO0FBQ0g7O0FBRUQsZUFBT3FGLEtBQUt6RCxPQUFMLENBQWFrSCxHQUFiLENBQWlCLFVBQVM3QyxNQUFULEVBQWlCOEMsS0FBakIsRUFBd0I7QUFDNUMsbUJBQU87QUFDSHZDLHNCQUFNUCxPQUFPTyxJQURWO0FBRUh4RSxzQkFBTWlFLE9BQU9qRSxJQUZWO0FBR0hnSCx1QkFBTy9DLE9BQU8rQyxLQUhYO0FBSUhELHVCQUFRQTtBQUpMLGFBQVA7QUFNSCxTQVBNLENBQVA7QUFRSCxLQWJEO0FBY0E3SyxTQUFLNkQsZ0JBQUwsR0FBd0IsWUFBSztBQUN6QixlQUFPc0QsS0FBS2EsYUFBWjtBQUNILEtBRkQ7QUFHQWhJLFNBQUsrSyxnQkFBTCxHQUF3QixVQUFDbkgsV0FBRCxFQUFjb0gsa0JBQWQsRUFBcUM7QUFDckQsWUFBRzdELEtBQUthLGFBQUwsS0FBdUJwRSxXQUExQixFQUFzQztBQUN0QyxtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsWUFBR0EsY0FBYyxDQUFDLENBQWxCLEVBQW9CO0FBQ2hCLGdCQUFHdUQsS0FBS3pELE9BQUwsSUFBZ0J5RCxLQUFLekQsT0FBTCxDQUFhaUIsTUFBYixHQUFzQmYsV0FBekMsRUFBcUQ7QUFDakQ7QUFDQTVELHFCQUFLc0MsUUFBTCxDQUFjWSxxQkFBZDtBQUNBN0Msa0NBQWtCQyxHQUFsQixDQUFzQixzQkFBc0JzRCxXQUE1QztBQUNBdUQscUJBQUthLGFBQUwsR0FBcUJwRSxXQUFyQjs7QUFFQTVELHFCQUFLeUMsT0FBTCxDQUFhd0ksaUNBQWIsRUFBcUM7QUFDakNqRCxtQ0FBZXBFO0FBRGtCLGlCQUFyQztBQUdBd0QsNkJBQWE4RCxjQUFiLENBQTRCL0QsS0FBS3pELE9BQUwsQ0FBYUUsV0FBYixFQUEwQmtILEtBQXREO0FBQ0E7QUFDQSxvQkFBR0Usa0JBQUgsRUFBc0I7O0FBRWxCbkQsMEJBQU0vRixRQUFRbUMsV0FBUixJQUF1QixDQUE3QjtBQUNIO0FBQ0QsdUJBQU9rRCxLQUFLYSxhQUFaO0FBQ0g7QUFDSjtBQUNKLEtBeEJEOztBQTJCQWhJLFNBQUttTCxnQkFBTCxHQUF3QixZQUFNO0FBQzFCLFlBQUcsQ0FBQ3JKLE9BQUosRUFBWTtBQUNSLG1CQUFPLEVBQVA7QUFDSDtBQUNELGVBQU9xRixLQUFLaUUsYUFBWjtBQUNILEtBTEQ7QUFNQXBMLFNBQUtxTCxpQkFBTCxHQUF5QixZQUFNO0FBQzNCLFlBQUcsQ0FBQ3ZKLE9BQUosRUFBWTtBQUNSLG1CQUFPLElBQVA7QUFDSDtBQUNELGVBQU9xRixLQUFLbUUsY0FBWjtBQUNILEtBTEQ7QUFNQXRMLFNBQUt1TCxpQkFBTCxHQUF5QixVQUFDQyxZQUFELEVBQWtCO0FBQ3ZDO0FBQ0gsS0FGRDtBQUdBeEwsU0FBS3lMLGFBQUwsR0FBcUIsWUFBTTtBQUN2QjtBQUNILEtBRkQ7QUFHQXpMLFNBQUswTCxjQUFMLEdBQXNCLFVBQUNDLE1BQUQsRUFBWTtBQUM5QjtBQUNILEtBRkQ7O0FBSUEzTCxTQUFLNEwsWUFBTCxHQUFvQixZQUFNO0FBQ3RCLGVBQU96RSxLQUFLYyxTQUFaO0FBQ0gsS0FGRDtBQUdBakksU0FBSzZMLFlBQUwsR0FBb0IsVUFBQzVELFNBQUQsRUFBZTtBQUMvQixlQUFPZCxLQUFLYyxTQUFMLEdBQWlCQSxTQUF4QjtBQUNILEtBRkQ7QUFHQWpJLFNBQUs4TCxTQUFMLEdBQWlCLFVBQUNDLFVBQUQsRUFBZTtBQUM1QixZQUFJQyxNQUFNN0UsS0FBS2MsU0FBZjtBQUNBLFlBQUlnRSxnQkFBZ0JuSyxRQUFRbUMsV0FBUixHQUFzQitILEdBQTFDO0FBQ0EsWUFBSUUsY0FBYyxDQUFDRCxnQkFBZ0JGLFVBQWpCLElBQStCQyxHQUFqRDtBQUNBRSxzQkFBY0EsY0FBYyxPQUE1QixDQUo0QixDQUlTOztBQUVyQ2xNLGFBQUt3QyxLQUFMO0FBQ0F4QyxhQUFLeUksSUFBTCxDQUFVeUQsV0FBVjtBQUNILEtBUkQ7O0FBVUFsTSxTQUFLbU0sSUFBTCxHQUFZLFlBQUs7QUFDYixZQUFHLENBQUNySyxPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7QUFDRHpCLDBCQUFrQkMsR0FBbEIsQ0FBc0IsZ0JBQXRCO0FBQ0F3QixnQkFBUXNLLGVBQVIsQ0FBd0IsU0FBeEI7QUFDQXRLLGdCQUFRc0ssZUFBUixDQUF3QixLQUF4QjtBQUNBLGVBQU90SyxRQUFRdUssVUFBZixFQUEyQjtBQUN2QnZLLG9CQUFRTCxXQUFSLENBQW9CSyxRQUFRdUssVUFBNUI7QUFDSDtBQUNEck0sYUFBS3dDLEtBQUw7QUFDQXhDLGFBQUtzQyxRQUFMLENBQWNZLHFCQUFkO0FBQ0gsS0FaRDs7QUFjQWxELFNBQUt3QixPQUFMLEdBQWUsWUFBSztBQUNoQixZQUFHLENBQUNNLE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDtBQUNEOUIsYUFBS21NLElBQUw7QUFDQTdFLGlCQUFTOUYsT0FBVDtBQUNBO0FBQ0F4QixhQUFLc00sR0FBTDtBQUNBak0sMEJBQWtCQyxHQUFsQixDQUFzQix5REFBdEI7QUFDSCxLQVREOztBQVdBO0FBQ0E7QUFDQU4sb0JBQWEsVUFBQ2tCLElBQUQsRUFBVTtBQUNuQixZQUFNcUwsU0FBU3ZNLEtBQUtrQixJQUFMLENBQWY7QUFDQSxlQUFPLFlBQVU7QUFDYixtQkFBT3FMLE9BQU9DLEtBQVAsQ0FBYXhNLElBQWIsRUFBbUJ5TSxTQUFuQixDQUFQO0FBQ0gsU0FGRDtBQUdILEtBTEQ7QUFNQSxXQUFPek0sSUFBUDtBQUVILENBM1ZEOztxQkE2VmVrSCxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN1dmOztBQUNBOzs7Ozs7QUFKQTs7O0FBTU8sSUFBTXdGLG9EQUFzQixTQUF0QkEsbUJBQXNCLENBQVMvSyxlQUFULEVBQTBCO0FBQ3pELFFBQUdnTCx3QkFBRUMsU0FBRixDQUFZakwsZUFBWixDQUFILEVBQWdDO0FBQzVCLGVBQU9BLGVBQVA7QUFDSDtBQUNELFFBQUdBLGdCQUFnQmtMLGVBQW5CLEVBQW1DO0FBQy9CLGVBQU9sTCxnQkFBZ0JrTCxlQUFoQixFQUFQO0FBQ0gsS0FGRCxNQUVNLElBQUdsTCxnQkFBZ0JtTCxLQUFuQixFQUF5QjtBQUMzQixlQUFPbkwsZ0JBQWdCbUwsS0FBdkI7QUFDSDtBQUNELFdBQU8sSUFBUDtBQUNILENBVk07O0FBWUEsSUFBTUMsc0NBQWUsU0FBZkEsWUFBZSxDQUFTcEwsZUFBVCxFQUEwQjtBQUNsRDs7QUFFQSxRQUFHQSxnQkFBZ0JxTCxTQUFuQixFQUE2QjtBQUN6QixlQUFPckwsZ0JBQWdCcUwsU0FBaEIsRUFBUDtBQUNILEtBRkQsTUFFSztBQUNELGVBQU8sS0FBUDtBQUNIO0FBQ0osQ0FSTTs7QUFVQSxJQUFNQyxzQ0FBZSxTQUFmQSxZQUFlLENBQVM1SyxLQUFULEVBQWdCVCxRQUFoQixFQUF5QjtBQUNqREEsYUFBU1UsUUFBVCxDQUFrQkMsc0JBQWxCO0FBQ0FYLGFBQVNZLEtBQVQ7QUFDQVosYUFBU2EsT0FBVCxDQUFpQkMsZ0JBQWpCLEVBQXdCTCxLQUF4QjtBQUNILENBSk07O0FBTUEsSUFBTTZLLGdEQUFvQixTQUFwQkEsaUJBQW9CLENBQUN4SixPQUFELEVBQVVzRSxhQUFWLEVBQXlCWixZQUF6QixFQUEwQztBQUN2RSxRQUFJeEQsY0FBY3pCLEtBQUtELEdBQUwsQ0FBUyxDQUFULEVBQVk4RixhQUFaLENBQWxCO0FBQ0EsUUFBTThDLFFBQU8sRUFBYjtBQUNBLFFBQUlwSCxPQUFKLEVBQWE7QUFDVCxhQUFLLElBQUl5SixJQUFJLENBQWIsRUFBZ0JBLElBQUl6SixRQUFRaUIsTUFBNUIsRUFBb0N3SSxHQUFwQyxFQUF5QztBQUNyQyxnQkFBSXpKLFFBQVF5SixDQUFSLFlBQUosRUFBd0I7QUFDcEJ2Siw4QkFBY3VKLENBQWQ7QUFDSDtBQUNELGdCQUFJL0YsYUFBYWdHLGNBQWIsTUFBaUMxSixRQUFReUosQ0FBUixFQUFXckMsS0FBWCxLQUFxQjFELGFBQWFnRyxjQUFiLEVBQTFELEVBQTBGO0FBQ3RGLHVCQUFPRCxDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsV0FBT3ZKLFdBQVA7QUFDSCxDQWRNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbENQOzs7O0FBS08sSUFBTXlKLGtDQUFhLFNBQWJBLFVBQWEsR0FBVTtBQUNoQyxRQUFHLENBQUNDLFVBQVVDLFNBQVYsQ0FBb0JDLE9BQXBCLENBQTRCLE9BQTVCLEtBQXdDRixVQUFVQyxTQUFWLENBQW9CQyxPQUFwQixDQUE0QixLQUE1QixDQUF6QyxLQUFnRixDQUFDLENBQXBGLEVBQXVGO0FBQ25GLGVBQU8sT0FBUDtBQUNILEtBRkQsTUFFTSxJQUFHRixVQUFVQyxTQUFWLENBQW9CQyxPQUFwQixDQUE0QixRQUE1QixLQUF5QyxDQUFDLENBQTdDLEVBQWdEO0FBQ2xELGVBQU8sUUFBUDtBQUNILEtBRkssTUFFQSxJQUFHRixVQUFVQyxTQUFWLENBQW9CQyxPQUFwQixDQUE0QixRQUE1QixLQUF5QyxDQUFDLENBQTdDLEVBQStDO0FBQ2pELGVBQU8sUUFBUDtBQUNILEtBRkssTUFFQSxJQUFHRixVQUFVQyxTQUFWLENBQW9CQyxPQUFwQixDQUE0QixTQUE1QixLQUEwQyxDQUFDLENBQTlDLEVBQWlEO0FBQ25ELGVBQU8sU0FBUDtBQUNILEtBRkssTUFFQSxJQUFJRixVQUFVQyxTQUFWLENBQW9CQyxPQUFwQixDQUE0QixNQUE1QixLQUF1QyxDQUFDLENBQTVDLEVBQWdEO0FBQ2xELFlBQUlDLE9BQU9ILFVBQVVDLFNBQVYsQ0FBb0JDLE9BQXBCLENBQTRCLE1BQTVCLENBQVg7QUFDQTs7Ozs7Ozs7Ozs7QUFXQSxZQUFJRSxLQUFNLFlBQVU7O0FBRWhCLGdCQUFJQyxLQUFKO0FBQUEsZ0JBQ0lDLElBQUksQ0FEUjtBQUFBLGdCQUVJQyxNQUFNcE4sU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUZWO0FBQUEsZ0JBR0lvTixNQUFNRCxJQUFJRSxvQkFBSixDQUF5QixHQUF6QixDQUhWOztBQUtBLG1CQUNJRixJQUFJRyxTQUFKLEdBQWdCLG1CQUFvQixFQUFFSixDQUF0QixHQUEyQix1QkFBM0MsRUFDSUUsSUFBSSxDQUFKLENBRlI7O0FBS0EsbUJBQU9GLElBQUksQ0FBSixHQUFRQSxDQUFSLEdBQVlELEtBQW5CO0FBRUgsU0FkUyxFQUFWO0FBZUEsWUFBR0QsS0FBSyxDQUFSLEVBQVU7QUFDTixtQkFBTyxPQUFQO0FBQ0gsU0FGRCxNQUVLO0FBQ0QsbUJBQU8sVUFBUDtBQUNIO0FBRUosS0FsQ0ssTUFrQ0Q7QUFDRCxlQUFPLFNBQVA7QUFDSDtBQUVKLENBL0NNLEMiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIk92ZW5QbGF5ZXJGbGFzaC5zd2ZcIjsiLCIvKipcclxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxyXG4gKiBAcGFyYW0gICB7ZWxlbWVudH0gICBjb250YWluZXIgICBkb20gZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5pbXBvcnQge2dldEJyb3dzZXJ9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XHJcbmltcG9ydCB7UFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IFNXRnBhdGggZnJvbSAnLi4vLi4vLi4vYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YnO1xyXG5cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgcHJvdmlkZXJUeXBlLCBsb29wKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCByb290SWQgPSBjb250YWluZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXJlbnQtaWRcIik7XHJcbiAgICBsZXQgbWVkaWFFbGVtZW50ID0gXCJcIjtcclxuICAgIGxldCBicm93c2VyVHlwZSA9IGdldEJyb3dzZXIoKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgbG9hZGVkLiBicm93c2VyVHlwZSA6IFwiKyBicm93c2VyVHlwZSk7XHJcbiAgICBjb25zdCBjcmVhdGVNZWRpYUVsZW1lbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHByb3ZpZGVyVHlwZSAhPT0gUFJPVklERVJfUlRNUCl7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVSZW1vdGVQbGF5YmFjaycsICcnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnd2Via2l0LXBsYXlzaW5saW5lJywgJycpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICcnKTtcclxuICAgICAgICAgICAgaWYobG9vcCl7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdsb29wJywgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUVsZW1lbnQpO1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IG1vdmllLCBmbGFzaHZhcnMsIGFsbG93c2NyaXB0YWNjZXNzLCBhbGxvd2Z1bGxzY3JlZW4sIHF1YWxpdHksIG5hbWUsIG1lbnUsIHF1YWwsIGJnY29sb3IsIGxvb3A7XHJcbiAgICAgICAgICAgIG1vdmllID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21vdmllJyk7XHJcbiAgICAgICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBTV0ZwYXRoKTtcclxuXHJcbiAgICAgICAgICAgIGZsYXNodmFycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGZsYXNodmFycy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnZmxhc2h2YXJzJyk7XHJcbiAgICAgICAgICAgIC8vcGxheWVySWQgaXMgdG8gdXNlIFNXRiBmb3IgRXh0ZXJuYWxJbnRlcmZhY2UuY2FsbCgpLlxyXG4gICAgICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdwbGF5ZXJJZD0nK3Jvb3RJZCk7XHJcblxyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd3NjcmlwdGFjY2VzcycpO1xyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xyXG5cclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd2Z1bGxzY3JlZW4nKTtcclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAndHJ1ZScpO1xyXG5cclxuICAgICAgICAgICAgcXVhbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIHF1YWxpdHkuc2V0QXR0cmlidXRlKCduYW1lJywgJ3F1YWxpdHknKTtcclxuICAgICAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hlaWdodCcpO1xyXG5cclxuICAgICAgICAgICAgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ25hbWUnKTtcclxuICAgICAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG5cclxuICAgICAgICAgICAgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21lbnUnKTtcclxuICAgICAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2ZhbHNlJyk7XHJcblxyXG4gICAgICAgICAgICBxdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgcXVhbC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xyXG4gICAgICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGlnaCcpO1xyXG5cclxuICAgICAgICAgICAgYmdjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCduYW1lJywgJ2JnY29sb3InKTtcclxuICAgICAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJyMwMDAwMDAnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGxvb3Ape1xyXG4gICAgICAgICAgICAgICAgbG9vcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgICAgICBsb29wLnNldEF0dHJpYnV0ZSgnbmFtZScsICdsb29wJyk7XHJcbiAgICAgICAgICAgICAgICBsb29wLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAndHJ1ZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCByb290SWQrXCItZmxhc2hcIik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCByb290SWQrXCItZmxhc2hcIik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnc2NhbGUnLCAnZGVmYXVsdCcpO1xyXG5cclxuICAgICAgICAgICAgaWYoYnJvd3NlclR5cGUgIT09IFwib2xkSUVcIil7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhJywgU1dGcGF0aCk7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQobW92aWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChsb29wKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGJnY29sb3IpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQocXVhbCk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd2Z1bGxzY3JlZW4pO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dzY3JpcHRhY2Nlc3MpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoZmxhc2h2YXJzKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVkaWFFbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNyZWF0ZSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBjcmVhdGVFbGVtZW50KClcIik7XHJcbiAgICAgICAgaWYobWVkaWFFbGVtZW50KXtcclxuICAgICAgICAgICAgdGhhdC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIHJlbW92ZUVsZW1lbnQoKVwiKTtcclxuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuICAgICAgICBtZWRpYUVsZW1lbnQgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsImltcG9ydCB7XHJcbiAgICBFUlJPUixcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX1BBVVNFRCxcclxuICAgIFNUQVRFX0VSUk9SLFxyXG4gICAgQ09OVEVOVF9DT01QTEVURSxcclxuICAgIENPTlRFTlRfU0VFSyxcclxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXHJcbiAgICBDT05URU5UX1NFRUtFRCxcclxuICAgIENPTlRFTlRfQlVGRkVSLFxyXG4gICAgQ09OVEVOVF9USU1FLFxyXG4gICAgQ09OVEVOVF9WT0xVTUUsXHJcbiAgICBDT05URU5UX01FVEEsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXHJcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcclxuICAgIFBST1ZJREVSX0hUTUw1LFxyXG4gICAgUFJPVklERVJfV0VCUlRDLFxyXG4gICAgUFJPVklERVJfREFTSCxcclxuICAgIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRyaWdnZXIgb24gdmFyaW91cyB2aWRlbyBldmVudHMuXHJcbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLlxyXG4gKiBAcGFyYW0gICBQcm92aWRlciBwcm92aWRlciAgaHRtbDVQcm92aWRlclxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZXh0ZW5kZWRFbGVtZW50LCBwcm92aWRlcil7XHJcbiAgICBjb25zdCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgbG9hZGVkLlwiLGV4dGVuZGVkRWxlbWVudCAscHJvdmlkZXIgKTtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuXHJcbiAgICBsZXQgZWxWaWRlbyA9IGV4dHJhY3RWaWRlb0VsZW1lbnQoZXh0ZW5kZWRFbGVtZW50KTtcclxuICAgIGNvbnN0IGJldHdlZW4gPSBmdW5jdGlvbiAobnVtLCBtaW4sIG1heCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihudW0sIG1heCksIG1pbik7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvbkVycm9yID0gZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcclxuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xyXG5cclxuICAgICAgICAvL1BSSVZBVEVfU1RBVEVfRVJST1JcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBjYW4gc3RhcnQgcGxheWluZyB0aGUgYXVkaW8vdmlkZW9cclxuICAgIGxvd0xldmVsRXZlbnRzLmNhbnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0Q2FuU2Vlayh0cnVlKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSX0ZVTEwpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBjYW5wbGF5XCIpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgZHVyYXRpb24gb2YgdGhlIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWRcclxuICAgIGxvd0xldmVsRXZlbnRzLmR1cmF0aW9uY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzKCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGR1cmF0aW9uY2hhbmdlXCIpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgY3VycmVudCBwbGF5bGlzdCBpcyBlbmRlZFxyXG4gICAgbG93TGV2ZWxFdmVudHMuZW5kZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVuZGVkXCIpO1xyXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9IFNUQVRFX0NPTVBMRVRFKXtcclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0NPTVBMRVRFKTtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZSBvZiB0aGUgYXVkaW8vdmlkZW9cclxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZGRhdGEgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nIEJlY2F1c2UgdGhpcyBjYXVzZXMgY2hhb3MgYnkgbG9hZGVkbWV0YWRhdGEuXHJcbiAgICAgICAgLypcclxuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBlbFZpZGVvLmR1cmF0aW9uLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGVsVmlkZW8udmlkZW9IZWlnaHQsXHJcbiAgICAgICAgICAgIHdpZHRoOiBlbFZpZGVvLnZpZGVvV2lkdGhcclxuICAgICAgICB9O1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7Ki9cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gbG9hZGVkZGF0YVwiKTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCBtZXRhIGRhdGEgZm9yIHRoZSBhdWRpby92aWRlb1xyXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkbWV0YWRhdGEgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGlzTGl2ZSA9IChlbFZpZGVvLmR1cmF0aW9uID09PSBJbmZpbml0eSkgPyB0cnVlIDogc2VwYXJhdGVMaXZlKGV4dGVuZGVkRWxlbWVudCk7XHJcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwcm92aWRlci5nZXRTb3VyY2VzKCk7XHJcbiAgICAgICAgbGV0IHNvdXJjZUluZGV4ID0gcHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpO1xyXG4gICAgICAgIGxldCB0eXBlID0gc291cmNlSW5kZXggPiAtMSA/IHNvdXJjZXNbc291cmNlSW5kZXhdLnR5cGUgOiBcIlwiO1xyXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcclxuICAgICAgICAgICAgZHVyYXRpb246IGlzTGl2ZSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb24sXHJcbiAgICAgICAgICAgIHR5cGUgOnR5cGVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gbG9hZGVkbWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBwYXVzZWRcclxuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0NPTVBMRVRFIHx8cHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfRVJST1Ipe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsVmlkZW8uZW5kZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsVmlkZW8uZXJyb3Ipe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsVmlkZW8uY3VycmVudFRpbWUgPT09IGVsVmlkZW8uZHVyYXRpb24pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwYXVzZVwiKTtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gc3RhcnRlZCBvciBpcyBubyBsb25nZXIgcGF1c2VkXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICghZWxWaWRlby5wYXVzZWQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheVwiKTtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGlzIHBsYXlpbmcgYWZ0ZXIgaGF2aW5nIGJlZW4gcGF1c2VkIG9yIHN0b3BwZWQgZm9yIGJ1ZmZlcmluZ1xyXG4gICAgbG93TGV2ZWxFdmVudHMucGxheWluZyA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheWluZ1wiKTtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcclxuICAgICAgICAvL3Byb3ZpZGVyLnRyaWdnZXIoUFJPVklERVJfRklSU1RfRlJBTUUpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBpcyBkb3dubG9hZGluZyB0aGUgYXVkaW8vdmlkZW9cclxuICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcclxuICAgICAgICBpZighdGltZVJhbmdlcyApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uLCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHByb2dyZXNzXCIsIGJ1ZmZlcmVkKjEwMCk7XHJcblxyXG4gICAgICAgIHByb3ZpZGVyLnNldEJ1ZmZlcihidWZmZXJlZCoxMDApO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVIsIHtcclxuICAgICAgICAgICAgYnVmZmVyUGVyY2VudDogYnVmZmVyZWQqMTAwLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogIHBvc2l0aW9uLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgdHJ5aW5nIHRvIGdldCBtZWRpYSBkYXRhLCBidXQgZGF0YSBpcyBub3QgYXZhaWxhYmxlXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5zdGFsbGVkID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzdGFsbFwiKTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcclxuICAgIGxvd0xldmVsRXZlbnRzLnRpbWV1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbjtcclxuICAgICAgICBpZiAoaXNOYU4oZHVyYXRpb24pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSAmJiAhZWxWaWRlby5wYXVzZWQpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gdGltZXVwZGF0ZVwiICwge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgIH0pOyovXHJcbiAgICAgICAgaWYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcgfHwgcHJvdmlkZXIuaXNTZWVraW5nKCkpIHtcclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnJlc2l6ZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcmVzaXplXCIpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyh0cnVlKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2luZ1wiLCBlbFZpZGVvLmN1cnJlbnRUaW1lKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFSyx7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uIDogZWxWaWRlby5jdXJyZW50VGltZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtlZCA9ICgpID0+IHtcclxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVrZWRcIik7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyhmYWxzZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUtFRCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgdmlkZW8gc3RvcHMgYmVjYXVzZSBpdCBuZWVkcyB0byBidWZmZXIgdGhlIG5leHQgZnJhbWVcclxuICAgIGxvd0xldmVsRXZlbnRzLndhaXRpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIiwgcHJvdmlkZXIuZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgaWYocHJvdmlkZXIuaXNTZWVraW5nKCkpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuICAgICAgICB9ZWxzZSBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfU1RBTExFRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy52b2x1bWVjaGFuZ2UgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB2b2x1bWVjaGFuZ2VcIiwgTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCkpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIHtcclxuICAgICAgICAgICAgdm9sdW1lOiBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSxcclxuICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5lcnJvciA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjb2RlID0gKGVsVmlkZW8uZXJyb3IgJiYgZWxWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGVycm9yQ29kZUdlbiA9ICh7XHJcbiAgICAgICAgICAgIDA6IHtjb2RlIDogUExBWUVSX1VOS05XT05fRVJST1IsIHJlYXNvbiA6IFwiVW5rbm93biBodG1sNSB2aWRlbyBlcnJvclwiLCBtZXNzYWdlIDogXCJVbmtub3duIGh0bWw1IHZpZGVvIGVycm9yXCJ9LFxyXG4gICAgICAgICAgICAxOiB7Y29kZSA6IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiwgcmVhc29uIDogXCJVbmtub3duIG9wZXJhdGlvbiBhYm9ydGVkXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gb3BlcmF0aW9uIGFib3J0ZWRcIn0sXHJcbiAgICAgICAgICAgIDI6IHtjb2RlIDogUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiwgcmVhc29uIDogXCJVbmtub3duIG5ldHdvcmsgZXJyb3JcIiwgbWVzc2FnZSA6IFwiVW5rbm93biBuZXR3b3JrIGVycm9yXCJ9LFxyXG4gICAgICAgICAgICAzOiB7Y29kZSA6IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiwgcmVhc29uIDogXCJVbmtub3duIGRlY29kZSBlcnJvclwiLCBtZXNzYWdlIDogXCJVbmtub3duIGRlY29kZSBlcnJvclwifSxcclxuICAgICAgICAgICAgNDoge2NvZGUgOiBQTEFZRVJfRklMRV9FUlJPUiwgcmVhc29uIDogXCJGaWxlIGNvdWxkIG5vdCBiZSBwbGF5ZWRcIiwgbWVzc2FnZSA6IFwiRmlsZSBjb3VsZCBub3QgYmUgcGxheWVkXCJ9XHJcbiAgICAgICAgfVtjb2RlXXx8MCk7XHJcbiAgICAgICAgZXJyb3JDb2RlR2VuLmVycm9yID0gZWxWaWRlby5lcnJvcjtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVycm9yXCIsIGVycm9yQ29kZUdlbik7XHJcbiAgICAgICAgb25FcnJvcihlcnJvckNvZGVHZW4pO1xyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xyXG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgICAgIGVsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI3Li5cclxuICovXHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXJcIjtcclxuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBzZXBhcmF0ZUxpdmUsIHBpY2tDdXJyZW50U291cmNlfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgUExBWUVSX1NUQVRFLCBQTEFZRVJfQ09NUExFVEUsIFBMQVlFUl9QQVVTRSwgUExBWUVSX1BMQVksXHJcbiAgICBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCxcclxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIENvcmUgRm9yIEh0bWw1IFZpZGVvLlxyXG4gKiBAcGFyYW0gICBzcGVjIG1lbWJlciB2YWx1ZVxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcclxuICogQHBhcmFtICAgb25FeHRlbmRlZExvYWQgb24gbG9hZCBoYW5kbGVyXHJcbiAqICovXHJcbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24gKHNwZWMsIHBsYXllckNvbmZpZywgb25FeHRlbmRlZExvYWQpe1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcclxuXHJcbiAgICBsZXQgdGhhdCA9e307XHJcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XHJcblxyXG4gICAgbGV0IGxpc3RlbmVyID0gRXZlbnRzTGlzdGVuZXIoc3BlYy5leHRlbmRlZEVsZW1lbnQsIHRoYXQpO1xyXG4gICAgbGV0IGVsVmlkZW8gPSBleHRyYWN0VmlkZW9FbGVtZW50KHNwZWMuZXh0ZW5kZWRFbGVtZW50KTtcclxuICAgIGxldCBwb3N0ZXJJbWFnZSA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5pbWFnZXx8XCJcIjtcclxuICAgIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWVyQ29uZmlnLmdldFBsYXliYWNrUmF0ZSgpO1xyXG5cclxuXHJcbiAgICBjb25zdCBfbG9hZCA9IChsYXN0UGxheVBvc2l0aW9uKSA9PntcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSAgc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV07XHJcbiAgICAgICAgc3BlYy5mcmFtZXJhdGUgPSBzb3VyY2UuZnJhbWVyYXRlO1xyXG4gICAgICAgIGlmKCFzcGVjLmZyYW1lcmF0ZSl7XHJcbiAgICAgICAgICAgIC8vaW5pdCB0aW1lY29kZSBtb2RlXHJcbiAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRUaW1lY29kZU1vZGUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9uRXh0ZW5kZWRMb2FkKXtcclxuICAgICAgICAgICAgb25FeHRlbmRlZExvYWQoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IHByZXZpb3VzU291cmNlID0gZWxWaWRlby5zcmM7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzb3VyY2UnKTtcclxuXHJcbiAgICAgICAgICAgIHNvdXJjZUVsZW1lbnQuc3JjID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUNoYW5nZWQgPSAoc291cmNlRWxlbWVudC5zcmMgIT09IHByZXZpb3VzU291cmNlKTtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIGVsVmlkZW8uc3JjID0gc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV0uZmlsZTtcclxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBjYWxsIGxvYWQgaWYgc3JjIHdhcyBub3Qgc2V0LiBsb2FkKCkgd2lsbCBjYW5jZWwgYW55IGFjdGl2ZSBwbGF5IHByb21pc2UuXHJcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYobGFzdFBsYXlQb3NpdGlvbiA9PT0gMCAmJiBlbFZpZGVvLmN1cnJlbnRUaW1lID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyp0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc3BlYy5jdXJyZW50U291cmNlXHJcbiAgICAgICAgICAgIH0pOyovXHJcblxyXG4gICAgICAgICAgICBpZihwb3N0ZXJJbWFnZSl7XHJcbiAgICAgICAgICAgICAgICAvL1RoZXJlIGlzIG5vIHdheSB0byB2ZXJpZnkgdGhlIHBvc3RlckltYWdlIFVSTC4gVGhpcyB3aWxsIGJlIGJsbmFrIHVudGlsIGhhdmUgYSBnb29kIGlkZWEuXHJcbiAgICAgICAgICAgICAgICAvL2VsVmlkZW8uc3R5bGUuYmFja2dyb3VuZCA9IFwidHJhbnNwYXJlbnQgdXJsKCdcIitwb3N0ZXJJbWFnZStcIicpIG5vLXJlcGVhdCAwIDBcIjtcclxuICAgICAgICAgICAgICAgIC8vZWxWaWRlby5wb3N0ZXIgPSBwb3N0ZXJJbWFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5jYW5TZWVrID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmNhblNlZWs7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDYW5TZWVrID0gKGNhblNlZWspID0+IHtcclxuICAgICAgICBzcGVjLmNhblNlZWsgPSBjYW5TZWVrO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNTZWVraW5nID0gKCk9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5zZWVraW5nO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0U2Vla2luZyA9IChzZWVraW5nKT0+e1xyXG4gICAgICAgIHNwZWMuc2Vla2luZyA9IHNlZWtpbmc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcclxuICAgICAgICBpZihzcGVjLnN0YXRlICE9PSBuZXdTdGF0ZSl7XHJcbiAgICAgICAgICAgIGxldCBwcmV2U3RhdGUgPSBzcGVjLnN0YXRlO1xyXG4gICAgICAgICAgICBzd2l0Y2gobmV3U3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUExBWUlORyA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNwZWMuc3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xyXG4gICAgICAgICAgICAgICAgcHJldnN0YXRlIDogcHJldlN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbmV3c3RhdGU6IHNwZWMuc3RhdGVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5zdGF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcclxuICAgICAgICBzcGVjLmJ1ZmZlciA9IG5ld0J1ZmZlcjtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5idWZmZXI7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT09IEluZmluaXR5KSA/IHRydWUgOiBzZXBhcmF0ZUxpdmUoc3BlYy5leHRlbmRlZEVsZW1lbnQpO1xyXG4gICAgICAgIHJldHVybiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxWaWRlby52b2x1bWUgPSB2b2x1bWUvMTAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8udm9sdW1lKjEwMDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHN0YXRlID09PSAndW5kZWZpbmVkJykge1xyXG5cclxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9ICFlbFZpZGVvLm11dGVkO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xyXG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSBzdGF0ZTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcclxuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wcmVsb2FkID0gKHNvdXJjZXMsIGxhc3RQbGF5UG9zaXRpb24pID0+e1xyXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XHJcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcclxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc011dGUoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXMpID0+e1xyXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XHJcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgICAgIF9sb2FkKHNwZWMuc291cmNlcy5zdGFydHRpbWUgfHwgMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucGxheSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgbGV0IHByb21pc2UgPSBlbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgaWYgKHByb21pc2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKF8gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEF1dG9wbGF5IHN0YXJ0ZWQhXHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9DYW4ndCBwbGF5IGJlY2F1c2UgVXNlciBkb2Vzbid0IGFueSBpbnRlcmFjdGlvbnMuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9XYWl0IGZvciBVc2VyIEludGVyYWN0aW9ucy4gKGxpa2UgY2xpY2spXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyl7XHJcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxWaWRlby5jdXJyZW50VGltZSA9IHBvc2l0aW9uO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQudHJpZ2dlcihQTEFZQkFDS19SQVRFX0NIQU5HRUQsIHtwbGF5YmFja1JhdGUgOiBwbGF5YmFja1JhdGV9KTtcclxuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxyXG4gICAgICAgICAgICAgICAgaW5kZXggOiBpbmRleFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgaWYoc3BlYy5jdXJyZW50U291cmNlID09PSBzb3VyY2VJbmRleCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHNvdXJjZUluZGV4ID4gLTEpe1xyXG4gICAgICAgICAgICBpZihzcGVjLnNvdXJjZXMgJiYgc3BlYy5zb3VyY2VzLmxlbmd0aCA+IHNvdXJjZUluZGV4KXtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBzb3VyY2VJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcclxuICAgICAgICAgICAgICAgIC8vc3BlYy5jdXJyZW50UXVhbGl0eSA9IHNvdXJjZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgaWYobmVlZFByb3ZpZGVyQ2hhbmdlKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQoZWxWaWRlby5jdXJyZW50VGltZSB8fCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRGcmFtZXJhdGUgPSAoZnJhbWVyYXRlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlID0gZnJhbWVyYXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+e1xyXG4gICAgICAgIGxldCBmcHMgPSBzcGVjLmZyYW1lcmF0ZTtcclxuICAgICAgICBsZXQgY3VycmVudEZyYW1lcyA9IGVsVmlkZW8uY3VycmVudFRpbWUgKiBmcHM7XHJcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcclxuICAgICAgICBuZXdQb3NpdGlvbiA9IG5ld1Bvc2l0aW9uICsgMC4wMDAwMTsgLy8gRklYRVMgQSBTQUZBUkkgU0VFSyBJU1NVRS4gbXlWZGllby5jdXJyZW50VGltZSA9IDAuMDQgd291bGQgZ2l2ZSBTTVBURSAwMDowMDowMDowMCB3aGVyYXMgaXQgc2hvdWxkIGdpdmUgMDA6MDA6MDA6MDFcclxuXHJcbiAgICAgICAgdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgIHRoYXQuc2VlayhuZXdQb3NpdGlvbik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc3RvcCA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc3RvcCgpIFwiKTtcclxuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgncHJlbG9hZCcpO1xyXG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcclxuICAgICAgICB3aGlsZSAoZWxWaWRlby5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlQ2hpbGQoZWxWaWRlby5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0LnN0b3AoKTtcclxuICAgICAgICBsaXN0ZW5lci5kZXN0cm95KCk7XHJcbiAgICAgICAgLy9lbFZpZGVvLnJlbW92ZSgpO1xyXG4gICAgICAgIHRoYXQub2ZmKCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGRlc3Ryb3koKSBwbGF5ZXIgc3RvcCwgbGlzdGVuZXIsIGV2ZW50IGRlc3Ryb2llZFwiKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9YWFggOiBJIGhvcGUgdXNpbmcgZXM2IGNsYXNzZXMuIGJ1dCBJIHRoaW5rIHRvIG9jY3VyIHByb2JsZW0gZnJvbSBPbGQgSUUuIFRoZW4gSSBjaG9pY2UgZnVuY3Rpb24gaW5oZXJpdC4gRmluYWxseSB1c2luZyBzdXBlciBmdW5jdGlvbiBpcyBzbyBkaWZmaWN1bHQuXHJcbiAgICAvLyB1c2UgOiBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7IC4uLiBzdXBlcl9kZXN0cm95KCk7XHJcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcclxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGF0W25hbWVdO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm92aWRlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTIuLlxyXG4gKi9cclxuaW1wb3J0IHtFUlJPUiwgU1RBVEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKGV4dGVuZGVkRWxlbWVudCkge1xyXG4gICAgaWYoXy5pc0VsZW1lbnQoZXh0ZW5kZWRFbGVtZW50KSl7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmKGV4dGVuZGVkRWxlbWVudC5nZXRWaWRlb0VsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBleHRlbmRlZEVsZW1lbnQuZ2V0VmlkZW9FbGVtZW50KCk7XHJcbiAgICB9ZWxzZSBpZihleHRlbmRlZEVsZW1lbnQubWVkaWEpe1xyXG4gICAgICAgIHJldHVybiBleHRlbmRlZEVsZW1lbnQubWVkaWE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUxpdmUgPSBmdW5jdGlvbihleHRlbmRlZEVsZW1lbnQpIHtcclxuICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxyXG5cclxuICAgIGlmKGV4dGVuZGVkRWxlbWVudC5pc0R5bmFtaWMpe1xyXG4gICAgICAgIHJldHVybiBleHRlbmRlZEVsZW1lbnQuaXNEeW5hbWljKCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZXJyb3JUcmlnZ2VyID0gZnVuY3Rpb24oZXJyb3IsIHByb3ZpZGVyKXtcclxuICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcclxuICAgIHByb3ZpZGVyLnBhdXNlKCk7XHJcbiAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHBpY2tDdXJyZW50U291cmNlID0gKHNvdXJjZXMsIGN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZykgPT4ge1xyXG4gICAgbGV0IHNvdXJjZUluZGV4ID0gTWF0aC5tYXgoMCwgY3VycmVudFNvdXJjZSk7XHJcbiAgICBjb25zdCBsYWJlbCA9XCJcIjtcclxuICAgIGlmIChzb3VyY2VzKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzb3VyY2VJbmRleDtcclxufTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cclxuICovXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgaWYoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk9wZXJhXCIpIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignT1BSJykpICE9IC0xICl7XHJcbiAgICAgICAgcmV0dXJuICdvcGVyYSc7XHJcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIikgIT0gLTEgKXtcclxuICAgICAgICByZXR1cm4gJ2Nocm9tZSc7XHJcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJTYWZhcmlcIikgIT0gLTEpe1xyXG4gICAgICAgIHJldHVybiAnc2FmYXJpJztcclxuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIikgIT0gLTEgKXtcclxuICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xyXG4gICAgfWVsc2UgaWYoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIikgIT0gLTEgKSl7XHJcbiAgICAgICAgbGV0IG1zaWUgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpO1xyXG4gICAgICAgIC8qaWYoISFkb2N1bWVudC5kb2N1bWVudE1vZGUgPT0gdHJ1ZSApe1xyXG4gICAgICAgICAgICByZXR1cm4gJ2llJztcclxuICAgICAgICB9ZWxzZSBpZighIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1RyaWRlbnQuKnJ2XFw6MTFcXC4vKSl7XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4ocGFyc2VJbnQodWEuc3Vic3RyaW5nKG1zaWUgKyA1LCB1YS5pbmRleE9mKFwiLlwiLCBtc2llKSkpKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdpZSc7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd1bmtub3duJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIHZhciBpZSA9IChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgdmFyIHVuZGVmLFxyXG4gICAgICAgICAgICAgICAgdiA9IDMsXHJcbiAgICAgICAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgICAgICAgICAgIGFsbCA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaScpO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKFxyXG4gICAgICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9ICc8IS0tW2lmIGd0IElFICcgKyAoKyt2KSArICddPjxpPjwvaT48IVtlbmRpZl0tLT4nLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsbFswXVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2ID4gNCA/IHYgOiB1bmRlZjtcclxuXHJcbiAgICAgICAgfSgpKTtcclxuICAgICAgICBpZihpZSA8IDkpe1xyXG4gICAgICAgICAgICByZXR1cm4gJ29sZElFJztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuICdtb2Rlcm5JRSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiAndW5rbm93bic7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==