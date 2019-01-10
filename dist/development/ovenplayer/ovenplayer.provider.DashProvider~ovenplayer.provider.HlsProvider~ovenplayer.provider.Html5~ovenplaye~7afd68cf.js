/*! OvenPlayerv0.8.2 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
            if (_loop) {
                mediaElement.appendChild(_loop);
            }
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
        var convertedErroCode = {
            0: _constants.PLAYER_UNKNWON_ERROR,
            1: _constants.PLAYER_UNKNWON_OPERATION_ERROR,
            2: _constants.PLAYER_UNKNWON_NEWWORK_ERROR,
            3: _constants.PLAYER_UNKNWON_DECODE_ERROR,
            4: _constants.PLAYER_FILE_ERROR
        }[code] || 0;

        OvenPlayerConsole.log("EventListener : on error", convertedErroCode);
        (0, _utils.errorTrigger)(_constants.ERRORS[convertedErroCode]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9tZWRpYS9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9icm93c2VyLmpzIl0sIm5hbWVzIjpbIk1hbmFnZXIiLCJjb250YWluZXIiLCJwcm92aWRlclR5cGUiLCJsb29wIiwidGhhdCIsInJvb3RJZCIsImdldEF0dHJpYnV0ZSIsIm1lZGlhRWxlbWVudCIsImJyb3dzZXJUeXBlIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJjcmVhdGVNZWRpYUVsZW1lbnQiLCJQUk9WSURFUl9SVE1QIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJtb3ZpZSIsImZsYXNodmFycyIsImFsbG93c2NyaXB0YWNjZXNzIiwiYWxsb3dmdWxsc2NyZWVuIiwicXVhbGl0eSIsIm5hbWUiLCJtZW51IiwicXVhbCIsImJnY29sb3IiLCJTV0ZwYXRoIiwiY3JlYXRlIiwiZGVzdHJveSIsInJlbW92ZUNoaWxkIiwiTGlzdGVuZXIiLCJleHRlbmRlZEVsZW1lbnQiLCJwcm92aWRlciIsImxvd0xldmVsRXZlbnRzIiwiZWxWaWRlbyIsImJldHdlZW4iLCJudW0iLCJtaW4iLCJtYXgiLCJNYXRoIiwiY2FucGxheSIsInNldENhblNlZWsiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsImR1cmF0aW9uY2hhbmdlIiwicHJvZ3Jlc3MiLCJlbmRlZCIsImdldFN0YXRlIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiQ09OVEVOVF9DT01QTEVURSIsInNldFN0YXRlIiwibG9hZGVkZGF0YSIsImxvYWRlZG1ldGFkYXRhIiwiaXNMaXZlIiwiZHVyYXRpb24iLCJJbmZpbml0eSIsInNvdXJjZXMiLCJnZXRTb3VyY2VzIiwic291cmNlSW5kZXgiLCJnZXRDdXJyZW50U291cmNlIiwidHlwZSIsIm1ldGFkYXRhIiwiQ09OVEVOVF9NRVRBIiwicGF1c2UiLCJTVEFURV9FUlJPUiIsImVycm9yIiwiY3VycmVudFRpbWUiLCJTVEFURV9QQVVTRUQiLCJwbGF5IiwicGF1c2VkIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0xPQURJTkciLCJwbGF5aW5nIiwidGltZVJhbmdlcyIsImJ1ZmZlcmVkIiwicG9zaXRpb24iLCJsZW5ndGgiLCJlbmQiLCJzZXRCdWZmZXIiLCJDT05URU5UX0JVRkZFUiIsImJ1ZmZlclBlcmNlbnQiLCJzdGFsbGVkIiwidGltZXVwZGF0ZSIsImlzTmFOIiwiaXNTZWVraW5nIiwiQ09OVEVOVF9USU1FIiwicmVzaXplIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJTVEFURV9TVEFMTEVEIiwidm9sdW1lY2hhbmdlIiwicm91bmQiLCJ2b2x1bWUiLCJDT05URU5UX1ZPTFVNRSIsIm11dGUiLCJtdXRlZCIsImNvZGUiLCJjb252ZXJ0ZWRFcnJvQ29kZSIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiRVJST1JTIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZlbnROYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsIm9uRXh0ZW5kZWRMb2FkIiwibGlzdGVuZXIiLCJwb3N0ZXJJbWFnZSIsImdldENvbmZpZyIsImltYWdlIiwicGxheWJhY2tSYXRlIiwiZGVmYXVsdFBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsImN1cnJlbnRTb3VyY2UiLCJmcmFtZXJhdGUiLCJzZXRUaW1lY29kZU1vZGUiLCJwcmV2aW91c1NvdXJjZSIsInNyYyIsInNvdXJjZUVsZW1lbnQiLCJmaWxlIiwic291cmNlQ2hhbmdlZCIsImxvYWQiLCJzZWVrIiwiZ2V0TmFtZSIsImNhblNlZWsiLCJuZXdTdGF0ZSIsInN0YXRlIiwicHJldlN0YXRlIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfU1RBVEUiLCJwcmV2c3RhdGUiLCJuZXdzdGF0ZSIsIm5ld0J1ZmZlciIsImJ1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRNdXRlIiwiQ09OVEVOVF9NVVRFIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImlzQXV0b1N0YXJ0IiwiaXNNdXRlIiwic3RhcnR0aW1lIiwicHJvbWlzZSIsInVuZGVmaW5lZCIsInRoZW4iLCJzZXRUaW1lb3V0Iiwic2V0UGxheWJhY2tSYXRlIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwibWFwIiwiaW5kZXgiLCJsYWJlbCIsInNldEN1cnJlbnRTb3VyY2UiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwic2V0U291cmNlTGFiZWwiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldEZyYW1lcmF0ZSIsInNldEZyYW1lcmF0ZSIsInNlZWtGcmFtZSIsImZyYW1lQ291bnQiLCJmcHMiLCJjdXJyZW50RnJhbWVzIiwibmV3UG9zaXRpb24iLCJzdG9wIiwicmVtb3ZlQXR0cmlidXRlIiwiZmlyc3RDaGlsZCIsIm9mZiIsIm1ldGhvZCIsImFwcGx5IiwiYXJndW1lbnRzIiwiZXh0cmFjdFZpZGVvRWxlbWVudCIsIl8iLCJpc0VsZW1lbnQiLCJnZXRWaWRlb0VsZW1lbnQiLCJtZWRpYSIsInNlcGFyYXRlTGl2ZSIsImlzRHluYW1pYyIsImVycm9yVHJpZ2dlciIsIkVSUk9SIiwicGlja0N1cnJlbnRTb3VyY2UiLCJpIiwiZ2V0U291cmNlTGFiZWwiLCJnZXRCcm93c2VyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsIm1zaWUiLCJpZSIsInVuZGVmIiwidiIsImRpdiIsImFsbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUJBQWlCLHFCQUF1Qix5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDS3hDOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxVQUFVLFNBQVZBLE9BQVUsQ0FBU0MsU0FBVCxFQUFvQkMsWUFBcEIsRUFBa0NDLElBQWxDLEVBQXVDO0FBQ25ELFFBQU1DLE9BQU8sRUFBYjtBQUNBLFFBQUlDLFNBQVNKLFVBQVVLLFlBQVYsQ0FBdUIsZ0JBQXZCLENBQWI7QUFDQSxRQUFJQyxlQUFlLEVBQW5CO0FBQ0EsUUFBSUMsY0FBYywwQkFBbEI7O0FBRUFDLHNCQUFrQkMsR0FBbEIsQ0FBc0Isd0NBQXVDRixXQUE3RDtBQUNBLFFBQU1HLHFCQUFxQixTQUFyQkEsa0JBQXFCLEdBQVU7QUFDakMsWUFBR1QsaUJBQWlCVSx3QkFBcEIsRUFBa0M7QUFDOUJMLDJCQUFlTSxTQUFTQyxhQUFULENBQXVCLE9B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MEMsQ0FBQyxDQUE5QyxFQUFpRDtBQUNuRCxlQUFPLFNBQVA7QUFDSCxLQUZLLE1BRUEsSUFBSUYsVUFBVUMsU0FBVixDQUFvQkMsT0FBcEIsQ0FBNEIsTUFBNUIsS0FBdUMsQ0FBQyxDQUE1QyxFQUFnRDtBQUNsRCxZQUFJQyxPQUFPSCxVQUFVQyxTQUFWLENBQW9CQyxPQUFwQixDQUE0QixNQUE1QixDQUFYO0FBQ0E7Ozs7Ozs7Ozs7O0FBV0EsWUFBSUUsS0FBTSxZQUFVOztBQUVoQixnQkFBSUMsS0FBSjtBQUFBLGdCQUNJQyxJQUFJLENBRFI7QUFBQSxnQkFFSUMsTUFBTWxOLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FGVjtBQUFBLGdCQUdJa04sTUFBTUQsSUFBSUUsb0JBQUosQ0FBeUIsR0FBekIsQ0FIVjs7QUFLQSxtQkFDSUYsSUFBSUcsU0FBSixHQUFnQixtQkFBb0IsRUFBRUosQ0FBdEIsR0FBMkIsdUJBQTNDLEVBQ0lFLElBQUksQ0FBSixDQUZSOztBQUtBLG1CQUFPRixJQUFJLENBQUosR0FBUUEsQ0FBUixHQUFZRCxLQUFuQjtBQUVILFNBZFMsRUFBVjtBQWVBLFlBQUdELEtBQUssQ0FBUixFQUFVO0FBQ04sbUJBQU8sT0FBUDtBQUNILFNBRkQsTUFFSztBQUNELG1CQUFPLFVBQVA7QUFDSDtBQUVKLEtBbENLLE1Ba0NEO0FBQ0QsZUFBTyxTQUFQO0FBQ0g7QUFFSixDQS9DTSxDIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2YuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJPdmVuUGxheWVyRmxhc2guc3dmXCI7IiwiLyoqXHJcbiAqIEBicmllZiAgIOuvuOuUlOyWtCDsl5jrpqzrqLztirjrpbwg6rSA66as7ZWY64qUIOqwneyytC4g7ZiE7J6s64qUIO2VmOuKlCDsnbzsnbQg66eO7KeAIOyViuuLpC5cclxuICogQHBhcmFtICAge2VsZW1lbnR9ICAgY29udGFpbmVyICAgZG9tIGVsZW1lbnRcclxuICpcclxuICogKi9cclxuaW1wb3J0IHtnZXRCcm93c2VyfSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xyXG5pbXBvcnQge1BST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBTV0ZwYXRoIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9PdmVuUGxheWVyRmxhc2guc3dmJztcclxuXHJcbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbihjb250YWluZXIsIHByb3ZpZGVyVHlwZSwgbG9vcCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBsZXQgcm9vdElkID0gY29udGFpbmVyLmdldEF0dHJpYnV0ZShcImRhdGEtcGFyZW50LWlkXCIpO1xyXG4gICAgbGV0IG1lZGlhRWxlbWVudCA9IFwiXCI7XHJcbiAgICBsZXQgYnJvd3NlclR5cGUgPSBnZXRCcm93c2VyKCk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGxvYWRlZC4gYnJvd3NlclR5cGUgOiBcIisgYnJvd3NlclR5cGUpO1xyXG4gICAgY29uc3QgY3JlYXRlTWVkaWFFbGVtZW50ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihwcm92aWRlclR5cGUgIT09IFBST1ZJREVSX1JUTVApe1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlUmVtb3RlUGxheWJhY2snLCAnJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dlYmtpdC1wbGF5c2lubGluZScsICcnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAnJyk7XHJcbiAgICAgICAgICAgIGlmKGxvb3Ape1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnbG9vcCcsICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBtb3ZpZSwgZmxhc2h2YXJzLCBhbGxvd3NjcmlwdGFjY2VzcywgYWxsb3dmdWxsc2NyZWVuLCBxdWFsaXR5LCBuYW1lLCBtZW51LCBxdWFsLCBiZ2NvbG9yLCBsb29wO1xyXG4gICAgICAgICAgICBtb3ZpZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgnbmFtZScsICdtb3ZpZScpO1xyXG4gICAgICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgU1dGcGF0aCk7XHJcblxyXG4gICAgICAgICAgICBmbGFzaHZhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZsYXNodmFycycpO1xyXG4gICAgICAgICAgICAvL3BsYXllcklkIGlzIHRvIHVzZSBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cclxuICAgICAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAncGxheWVySWQ9Jytyb290SWQpO1xyXG5cclxuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dzY3JpcHRhY2Nlc3MnKTtcclxuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCd2YWx1ZScsICdhbHdheXMnKTtcclxuXHJcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dmdWxsc2NyZWVuJyk7XHJcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcclxuXHJcbiAgICAgICAgICAgIHF1YWxpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XHJcbiAgICAgICAgICAgIHF1YWxpdHkuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoZWlnaHQnKTtcclxuXHJcbiAgICAgICAgICAgIG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBuYW1lLnNldEF0dHJpYnV0ZSgnbmFtZScsICduYW1lJyk7XHJcbiAgICAgICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuXHJcbiAgICAgICAgICAgIG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgnbmFtZScsICdtZW51Jyk7XHJcbiAgICAgICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdmYWxzZScpO1xyXG5cclxuICAgICAgICAgICAgcXVhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCduYW1lJywgJ3F1YWxpdHknKTtcclxuICAgICAgICAgICAgcXVhbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hpZ2gnKTtcclxuXHJcbiAgICAgICAgICAgIGJnY29sb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBiZ2NvbG9yLnNldEF0dHJpYnV0ZSgnbmFtZScsICdiZ2NvbG9yJyk7XHJcbiAgICAgICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCd2YWx1ZScsICcjMDAwMDAwJyk7XHJcblxyXG4gICAgICAgICAgICBpZihsb29wKXtcclxuICAgICAgICAgICAgICAgIGxvb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICAgICAgbG9vcC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbG9vcCcpO1xyXG4gICAgICAgICAgICAgICAgbG9vcC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0Jyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCduYW1lJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAlJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NjYWxlJywgJ2RlZmF1bHQnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGJyb3dzZXJUeXBlICE9PSBcIm9sZElFXCIpe1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YScsIFNXRnBhdGgpO1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCcpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzaWQnLCAnY2xzaWQ6RDI3Q0RCNkUtQUU2RC0xMWNmLTk2QjgtNDQ0NTUzNTQwMDAwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKG1vdmllKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihsb29wKXtcclxuICAgICAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChsb29wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoYmdjb2xvcik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChxdWFsKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGFsbG93ZnVsbHNjcmVlbik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd3NjcmlwdGFjY2Vzcyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lZGlhRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZWRpYUVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY3JlYXRlID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGNyZWF0ZUVsZW1lbnQoKVwiKTtcclxuICAgICAgICBpZihtZWRpYUVsZW1lbnQpe1xyXG4gICAgICAgICAgICB0aGF0LmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU1lZGlhRWxlbWVudCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgcmVtb3ZlRWxlbWVudCgpXCIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChtZWRpYUVsZW1lbnQpO1xyXG4gICAgICAgIG1lZGlhRWxlbWVudCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcclxuIiwiaW1wb3J0IHtcclxuICAgIEVSUk9SUyxcclxuICAgIEVSUk9SLFxyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9TVEFMTEVELFxyXG4gICAgU1RBVEVfTE9BRElORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfUEFVU0VELFxyXG4gICAgU1RBVEVfRVJST1IsXHJcbiAgICBDT05URU5UX0NPTVBMRVRFLFxyXG4gICAgQ09OVEVOVF9TRUVLLFxyXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcclxuICAgIENPTlRFTlRfU0VFS0VELFxyXG4gICAgQ09OVEVOVF9CVUZGRVIsXHJcbiAgICBDT05URU5UX1RJTUUsXHJcbiAgICBDT05URU5UX1ZPTFVNRSxcclxuICAgIENPTlRFTlRfTUVUQSxcclxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcclxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxyXG4gICAgUFJPVklERVJfSFRNTDUsXHJcbiAgICBQUk9WSURFUl9XRUJSVEMsXHJcbiAgICBQUk9WSURFUl9EQVNILFxyXG4gICAgUFJPVklERVJfSExTXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBzZXBhcmF0ZUxpdmUsIGVycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRyaWdnZXIgb24gdmFyaW91cyB2aWRlbyBldmVudHMuXHJcbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLlxyXG4gKiBAcGFyYW0gICBQcm92aWRlciBwcm92aWRlciAgaHRtbDVQcm92aWRlclxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZXh0ZW5kZWRFbGVtZW50LCBwcm92aWRlcil7XHJcbiAgICBjb25zdCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgbG9hZGVkLlwiLGV4dGVuZGVkRWxlbWVudCAscHJvdmlkZXIgKTtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuXHJcbiAgICBsZXQgZWxWaWRlbyA9IGV4dHJhY3RWaWRlb0VsZW1lbnQoZXh0ZW5kZWRFbGVtZW50KTtcclxuICAgIGNvbnN0IGJldHdlZW4gPSBmdW5jdGlvbiAobnVtLCBtaW4sIG1heCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihudW0sIG1heCksIG1pbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGNhbiBzdGFydCBwbGF5aW5nIHRoZSBhdWRpby92aWRlb1xyXG4gICAgbG93TGV2ZWxFdmVudHMuY2FucGxheSA9ICgpID0+IHtcclxuICAgICAgICBwcm92aWRlci5zZXRDYW5TZWVrKHRydWUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVJfRlVMTCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGNhbnBsYXlcIik7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBkdXJhdGlvbiBvZiB0aGUgYXVkaW8vdmlkZW8gaXMgY2hhbmdlZFxyXG4gICAgbG93TGV2ZWxFdmVudHMuZHVyYXRpb25jaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MoKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZHVyYXRpb25jaGFuZ2VcIik7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXlsaXN0IGlzIGVuZGVkXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5lbmRlZCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZW5kZWRcIik7XHJcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSAhPSBTVEFURV9JRExFICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT0gU1RBVEVfQ09NUExFVEUpe1xyXG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIHRoZSBjdXJyZW50IGZyYW1lIG9mIHRoZSBhdWRpby92aWRlb1xyXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkZGF0YSA9ICgpID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmcgQmVjYXVzZSB0aGlzIGNhdXNlcyBjaGFvcyBieSBsb2FkZWRtZXRhZGF0YS5cclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcclxuICAgICAgICAgICAgZHVyYXRpb246IGVsVmlkZW8uZHVyYXRpb24sXHJcbiAgICAgICAgICAgIGhlaWdodDogZWxWaWRlby52aWRlb0hlaWdodCxcclxuICAgICAgICAgICAgd2lkdGg6IGVsVmlkZW8udmlkZW9XaWR0aFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTsqL1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRkYXRhXCIpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIG1ldGEgZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRtZXRhZGF0YSA9ICgpID0+IHtcclxuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT09IEluZmluaXR5KSA/IHRydWUgOiBzZXBhcmF0ZUxpdmUoZXh0ZW5kZWRFbGVtZW50KTtcclxuICAgICAgICBsZXQgc291cmNlcyA9IHByb3ZpZGVyLmdldFNvdXJjZXMoKTtcclxuICAgICAgICBsZXQgc291cmNlSW5kZXggPSBwcm92aWRlci5nZXRDdXJyZW50U291cmNlKCk7XHJcbiAgICAgICAgbGV0IHR5cGUgPSBzb3VyY2VJbmRleCA+IC0xID8gc291cmNlc1tzb3VyY2VJbmRleF0udHlwZSA6IFwiXCI7XHJcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogaXNMaXZlID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbixcclxuICAgICAgICAgICAgdHlwZSA6dHlwZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRtZXRhZGF0YVwiLCBtZXRhZGF0YSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHBhdXNlZFxyXG4gICAgbG93TGV2ZWxFdmVudHMucGF1c2UgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQ09NUExFVEUgfHxwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9FUlJPUil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWxWaWRlby5lbmRlZCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWxWaWRlby5lcnJvcil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWxWaWRlby5jdXJyZW50VGltZSA9PT0gZWxWaWRlby5kdXJhdGlvbil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBhdXNlXCIpO1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BBVVNFRCk7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBzdGFydGVkIG9yIGlzIG5vIGxvbmdlciBwYXVzZWRcclxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFlbFZpZGVvLnBhdXNlZCAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKSB7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwbGF5XCIpO1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaXMgcGxheWluZyBhZnRlciBoYXZpbmcgYmVlbiBwYXVzZWQgb3Igc3RvcHBlZCBmb3IgYnVmZmVyaW5nXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5aW5nID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwbGF5aW5nXCIpO1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xyXG4gICAgICAgIC8vcHJvdmlkZXIudHJpZ2dlcihQUk9WSURFUl9GSVJTVF9GUkFNRSk7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGlzIGRvd25sb2FkaW5nIHRoZSBhdWRpby92aWRlb1xyXG4gICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHRpbWVSYW5nZXMgPSBlbFZpZGVvLmJ1ZmZlcmVkO1xyXG4gICAgICAgIGlmKCF0aW1lUmFuZ2VzICl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb24sIHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcclxuICAgICAgICBsZXQgYnVmZmVyZWQgPSBiZXR3ZWVuKCAodGltZVJhbmdlcy5sZW5ndGg+IDAgPyB0aW1lUmFuZ2VzLmVuZCh0aW1lUmFuZ2VzLmxlbmd0aCAtIDEpIDogMCApIC8gZHVyYXRpb24sIDAsIDEpO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcHJvZ3Jlc3NcIiwgYnVmZmVyZWQqMTAwKTtcclxuXHJcbiAgICAgICAgcHJvdmlkZXIuc2V0QnVmZmVyKGJ1ZmZlcmVkKjEwMCk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwge1xyXG4gICAgICAgICAgICBidWZmZXJQZXJjZW50OiBidWZmZXJlZCoxMDAsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAgcG9zaXRpb24sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBpcyB0cnlpbmcgdG8gZ2V0IG1lZGlhIGRhdGEsIGJ1dCBkYXRhIGlzIG5vdCBhdmFpbGFibGVcclxuICAgIGxvd0xldmVsRXZlbnRzLnN0YWxsZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHN0YWxsXCIpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiBoYXMgY2hhbmdlZFxyXG4gICAgbG93TGV2ZWxFdmVudHMudGltZXVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uO1xyXG4gICAgICAgIGlmIChpc05hTihkdXJhdGlvbikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpICYmICFlbFZpZGVvLnBhdXNlZCl7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1BMQVlJTkcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKk92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB0aW1ldXBkYXRlXCIgLCB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcclxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXHJcbiAgICAgICAgfSk7Ki9cclxuICAgICAgICBpZiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyB8fCBwcm92aWRlci5pc1NlZWtpbmcoKSkge1xyXG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHMucmVzaXplID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiByZXNpemVcIik7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2luZyA9ICgpID0+IHtcclxuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKHRydWUpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVraW5nXCIsIGVsVmlkZW8uY3VycmVudFRpbWUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9TRUVLLHtcclxuICAgICAgICAgICAgcG9zaXRpb24gOiBlbFZpZGVvLmN1cnJlbnRUaW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2VkID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHNlZWtlZFwiKTtcclxuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKGZhbHNlKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFS0VEKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSB2aWRlbyBzdG9wcyBiZWNhdXNlIGl0IG5lZWRzIHRvIGJ1ZmZlciB0aGUgbmV4dCBmcmFtZVxyXG4gICAgbG93TGV2ZWxFdmVudHMud2FpdGluZyA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gd2FpdGluZ1wiLCBwcm92aWRlci5nZXRTdGF0ZSgpKTtcclxuICAgICAgICBpZihwcm92aWRlci5pc1NlZWtpbmcoKSl7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xyXG4gICAgICAgIH1lbHNlIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9TVEFMTEVEKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnZvbHVtZWNoYW5nZSA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHZvbHVtZWNoYW5nZVwiLCBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwge1xyXG4gICAgICAgICAgICB2b2x1bWU6IE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApLFxyXG4gICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxWaWRlby5lcnJvciAmJiBlbFZpZGVvLmVycm9yLmNvZGUpIHx8IDA7XHJcbiAgICAgICAgbGV0IGNvbnZlcnRlZEVycm9Db2RlID0gKHtcclxuICAgICAgICAgICAgMDogUExBWUVSX1VOS05XT05fRVJST1IsXHJcbiAgICAgICAgICAgIDE6IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcclxuICAgICAgICAgICAgMjogUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcclxuICAgICAgICAgICAgMzogUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxyXG4gICAgICAgICAgICA0OiBQTEFZRVJfRklMRV9FUlJPUlxyXG4gICAgICAgIH1bY29kZV18fDApO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZXJyb3JcIiwgY29udmVydGVkRXJyb0NvZGUpO1xyXG4gICAgICAgIGVycm9yVHJpZ2dlcihFUlJPUlNbY29udmVydGVkRXJyb0NvZGVdKTtcclxuICAgIH07XHJcblxyXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgICAgICBlbFZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XHJcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyNy4uXHJcbiAqL1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCBFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyXCI7XHJcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlLCBwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgU1RBVEVfSURMRSwgU1RBVEVfUExBWUlORywgU1RBVEVfUEFVU0VELCBTVEFURV9DT01QTEVURSxcclxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLFxyXG4gICAgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIENPTlRFTlRfU09VUkNFX0NIQU5HRUQsXHJcbiAgICBQTEFZQkFDS19SQVRFX0NIQU5HRUQsIENPTlRFTlRfTVVURSwgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBDb3JlIEZvciBIdG1sNSBWaWRlby5cclxuICogQHBhcmFtICAgc3BlYyBtZW1iZXIgdmFsdWVcclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICBwbGF5ZXIgY29uZmlnXHJcbiAqIEBwYXJhbSAgIG9uRXh0ZW5kZWRMb2FkIG9uIGxvYWQgaGFuZGxlclxyXG4gKiAqL1xyXG5jb25zdCBQcm92aWRlciA9IGZ1bmN0aW9uIChzcGVjLCBwbGF5ZXJDb25maWcsIG9uRXh0ZW5kZWRMb2FkKXtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgbG9hZGVkLiBcIik7XHJcblxyXG4gICAgbGV0IHRoYXQgPXt9O1xyXG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xyXG5cclxuICAgIGxldCBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKHNwZWMuZXh0ZW5kZWRFbGVtZW50LCB0aGF0KTtcclxuICAgIGxldCBlbFZpZGVvID0gZXh0cmFjdFZpZGVvRWxlbWVudChzcGVjLmV4dGVuZGVkRWxlbWVudCk7XHJcbiAgICBsZXQgcG9zdGVySW1hZ2UgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuaW1hZ2V8fFwiXCI7XHJcbiAgICBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXllckNvbmZpZy5nZXRQbGF5YmFja1JhdGUoKTtcclxuXHJcblxyXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gIHNwZWMuc291cmNlc1tzcGVjLmN1cnJlbnRTb3VyY2VdO1xyXG4gICAgICAgIHNwZWMuZnJhbWVyYXRlID0gc291cmNlLmZyYW1lcmF0ZTtcclxuICAgICAgICBpZighc3BlYy5mcmFtZXJhdGUpe1xyXG4gICAgICAgICAgICAvL2luaXQgdGltZWNvZGUgbW9kZVxyXG4gICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvbkV4dGVuZGVkTG9hZCl7XHJcbiAgICAgICAgICAgIG9uRXh0ZW5kZWRMb2FkKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBsb2FkZWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1NvdXJjZSA9IGVsVmlkZW8uc3JjO1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XHJcblxyXG4gICAgICAgICAgICBzb3VyY2VFbGVtZW50LnNyYyA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VDaGFuZ2VkID0gKHNvdXJjZUVsZW1lbnQuc3JjICE9PSBwcmV2aW91c1NvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICBlbFZpZGVvLnNyYyA9IHNwZWMuc291cmNlc1tzcGVjLmN1cnJlbnRTb3VyY2VdLmZpbGU7XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgY2FsbCBsb2FkIGlmIHNyYyB3YXMgbm90IHNldC4gbG9hZCgpIHdpbGwgY2FuY2VsIGFueSBhY3RpdmUgcGxheSBwcm9taXNlLlxyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzU291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgZWxWaWRlby5jdXJyZW50VGltZSA+IDApe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNwZWMuY3VycmVudFNvdXJjZVxyXG4gICAgICAgICAgICB9KTsqL1xyXG5cclxuICAgICAgICAgICAgaWYocG9zdGVySW1hZ2Upe1xyXG4gICAgICAgICAgICAgICAgLy9UaGVyZSBpcyBubyB3YXkgdG8gdmVyaWZ5IHRoZSBwb3N0ZXJJbWFnZSBVUkwuIFRoaXMgd2lsbCBiZSBibG5hayB1bnRpbCBoYXZlIGEgZ29vZCBpZGVhLlxyXG4gICAgICAgICAgICAgICAgLy9lbFZpZGVvLnN0eWxlLmJhY2tncm91bmQgPSBcInRyYW5zcGFyZW50IHVybCgnXCIrcG9zdGVySW1hZ2UrXCInKSBuby1yZXBlYXQgMCAwXCI7XHJcbiAgICAgICAgICAgICAgICAvL2VsVmlkZW8ucG9zdGVyID0gcG9zdGVySW1hZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5uYW1lO1xyXG4gICAgfTtcclxuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5jYW5TZWVrO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XHJcbiAgICAgICAgc3BlYy5jYW5TZWVrID0gY2FuU2VlaztcclxuICAgIH07XHJcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc2Vla2luZztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcclxuICAgICAgICBzcGVjLnNlZWtpbmcgPSBzZWVraW5nO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xyXG4gICAgICAgICAgICBsZXQgcHJldlN0YXRlID0gc3BlYy5zdGF0ZTtcclxuICAgICAgICAgICAgc3dpdGNoKG5ld1N0YXRlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQ09NUExFVEUgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QQVVTRUQgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BMQVlJTkcgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzcGVjLnN0YXRlID0gbmV3U3RhdGU7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcclxuICAgICAgICAgICAgICAgIHByZXZzdGF0ZSA6IHByZXZTdGF0ZSxcclxuICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBzcGVjLnN0YXRlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XHJcbiAgICAgICAgc3BlYy5idWZmZXIgPSBuZXdCdWZmZXI7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuYnVmZmVyO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGlzTGl2ZSA9IChlbFZpZGVvLmR1cmF0aW9uID09PSBJbmZpbml0eSkgPyB0cnVlIDogc2VwYXJhdGVMaXZlKHNwZWMuZXh0ZW5kZWRFbGVtZW50KTtcclxuICAgICAgICByZXR1cm4gaXNMaXZlID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbjtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsVmlkZW8udm9sdW1lID0gdm9sdW1lLzEwMDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLnZvbHVtZSoxMDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSAhZWxWaWRlby5tdXRlZDtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcclxuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gc3RhdGU7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XHJcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcclxuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xyXG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcclxuICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uIHx8IDApO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNNdXRlKCkpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFZvbHVtZShwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQubG9hZCA9IChzb3VyY2VzKSA9PntcclxuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xyXG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcclxuICAgICAgICBfbG9hZChzcGVjLnNvdXJjZXMuc3RhcnR0aW1lIHx8IDApO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORyl7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXNlID0gZWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIGlmIChwcm9taXNlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihfID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBdXRvcGxheSBzdGFydGVkIVxyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ2FuJ3QgcGxheSBiZWNhdXNlIFVzZXIgZG9lc24ndCBhbnkgaW50ZXJhY3Rpb25zLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vV2FpdCBmb3IgVXNlciBJbnRlcmFjdGlvbnMuIChsaWtlIGNsaWNrKVxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBlbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsVmlkZW8uY3VycmVudFRpbWUgPSBwb3NpdGlvbjtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUJBQ0tfUkFURV9DSEFOR0VELCB7cGxheWJhY2tSYXRlIDogcGxheWJhY2tSYXRlfSk7XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcclxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChzb3VyY2VJbmRleCwgbmVlZFByb3ZpZGVyQ2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHNwZWMuY3VycmVudFNvdXJjZSA9PT0gc291cmNlSW5kZXgpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzb3VyY2VJbmRleCA+IC0xKXtcclxuICAgICAgICAgICAgaWYoc3BlYy5zb3VyY2VzICYmIHNwZWMuc291cmNlcy5sZW5ndGggPiBzb3VyY2VJbmRleCl7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgY2hhbmdlZCA6IFwiICsgc291cmNlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gc291cmNlSW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzb3VyY2VJbmRleFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlTGFiZWwoc3BlYy5zb3VyY2VzW3NvdXJjZUluZGV4XS5sYWJlbCk7XHJcbiAgICAgICAgICAgICAgICAvL3NwZWMuY3VycmVudFF1YWxpdHkgPSBzb3VyY2VJbmRleDtcclxuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsVmlkZW8uY3VycmVudFRpbWUgfHwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGV2ZWxzO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nXHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0RnJhbWVyYXRlID0gKGZyYW1lcmF0ZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZSA9IGZyYW1lcmF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PntcclxuICAgICAgICBsZXQgZnBzID0gc3BlYy5mcmFtZXJhdGU7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRGcmFtZXMgPSBlbFZpZGVvLmN1cnJlbnRUaW1lICogZnBzO1xyXG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IChjdXJyZW50RnJhbWVzICsgZnJhbWVDb3VudCkgLyBmcHM7XHJcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXHJcblxyXG4gICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XHJcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3ByZWxvYWQnKTtcclxuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICAgICAgd2hpbGUgKGVsVmlkZW8uZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUNoaWxkKGVsVmlkZW8uZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC5zdG9wKCk7XHJcbiAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIC8vZWxWaWRlby5yZW1vdmUoKTtcclxuICAgICAgICB0aGF0Lm9mZigpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxyXG4gICAgLy8gdXNlIDogbGV0IHN1cGVyX2Rlc3Ryb3kgID0gdGhhdC5zdXBlcignZGVzdHJveScpOyAuLi4gc3VwZXJfZGVzdHJveSgpO1xyXG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDEyLi5cclxuICovXHJcbmltcG9ydCB7RVJST1IsIFNUQVRFX0VSUk9SfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGV4dHJhY3RWaWRlb0VsZW1lbnQgPSBmdW5jdGlvbihleHRlbmRlZEVsZW1lbnQpIHtcclxuICAgIGlmKF8uaXNFbGVtZW50KGV4dGVuZGVkRWxlbWVudCkpe1xyXG4gICAgICAgIHJldHVybiBleHRlbmRlZEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBpZihleHRlbmRlZEVsZW1lbnQuZ2V0VmlkZW9FbGVtZW50KXtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50LmdldFZpZGVvRWxlbWVudCgpO1xyXG4gICAgfWVsc2UgaWYoZXh0ZW5kZWRFbGVtZW50Lm1lZGlhKXtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50Lm1lZGlhO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2VwYXJhdGVMaXZlID0gZnVuY3Rpb24oZXh0ZW5kZWRFbGVtZW50KSB7XHJcbiAgICAvL1RvRG8gOiBZb3UgY29uc2lkZXIgaGxzanMuIEJ1dCBub3Qgbm93IGJlY2F1c2Ugd2UgZG9uJ3Qgc3VwcG9ydCBobHNqcy5cclxuXHJcbiAgICBpZihleHRlbmRlZEVsZW1lbnQuaXNEeW5hbWljKXtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50LmlzRHluYW1pYygpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGVycm9yVHJpZ2dlciA9IGZ1bmN0aW9uKGVycm9yLCBwcm92aWRlcil7XHJcbiAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XHJcbiAgICBwcm92aWRlci5wYXVzZSgpO1xyXG4gICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwaWNrQ3VycmVudFNvdXJjZSA9IChzb3VyY2VzLCBjdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpID0+IHtcclxuICAgIGxldCBzb3VyY2VJbmRleCA9IE1hdGgubWF4KDAsIGN1cnJlbnRTb3VyY2UpO1xyXG4gICAgY29uc3QgbGFiZWwgPVwiXCI7XHJcbiAgICBpZiAoc291cmNlcykge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc291cmNlSW5kZXg7XHJcbn07IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXHJcbiAqL1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGlmKChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPcGVyYVwiKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpKSAhPSAtMSApe1xyXG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xyXG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpICE9IC0xICl7XHJcbiAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xyXG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpICE9IC0xKXtcclxuICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XHJcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpICE9IC0xICl7XHJcbiAgICAgICAgcmV0dXJuICdmaXJlZm94JztcclxuICAgIH1lbHNlIGlmKChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpICE9IC0xICkpe1xyXG4gICAgICAgIGxldCBtc2llID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKTtcclxuICAgICAgICAvKmlmKCEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09IHRydWUgKXtcclxuICAgICAgICAgICAgcmV0dXJuICdpZSc7XHJcbiAgICAgICAgfWVsc2UgaWYoISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LipydlxcOjExXFwuLykpe1xyXG4gICAgICAgICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llICsgNSwgdWEuaW5kZXhPZihcIi5cIiwgbXNpZSkpKSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaWUnO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuICd1bmtub3duJztcclxuICAgICAgICB9Ki9cclxuICAgICAgICB2YXIgaWUgPSAoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIHZhciB1bmRlZixcclxuICAgICAgICAgICAgICAgIHYgPSAzLFxyXG4gICAgICAgICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgICAgICAgICAgICBhbGwgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKTtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChcclxuICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSAnPCEtLVtpZiBndCBJRSAnICsgKCsrdikgKyAnXT48aT48L2k+PCFbZW5kaWZdLS0+JyxcclxuICAgICAgICAgICAgICAgICAgICBhbGxbMF1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdiA+IDQgPyB2IDogdW5kZWY7XHJcblxyXG4gICAgICAgIH0oKSk7XHJcbiAgICAgICAgaWYoaWUgPCA5KXtcclxuICAgICAgICAgICAgcmV0dXJuICdvbGRJRSc7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiAnbW9kZXJuSUUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=