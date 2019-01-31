/*! OvenPlayerv0.8.4 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var getBrowserLanguage = exports.getBrowserLanguage = function getBrowserLanguage() {
    var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i = void 0,
        language = void 0;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
                return language;
            }
        }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
            return language;
        }
    }

    return null;
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9tZWRpYS9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9icm93c2VyLmpzIl0sIm5hbWVzIjpbIk1hbmFnZXIiLCJjb250YWluZXIiLCJwcm92aWRlclR5cGUiLCJsb29wIiwidGhhdCIsInJvb3RJZCIsImdldEF0dHJpYnV0ZSIsIm1lZGlhRWxlbWVudCIsImJyb3dzZXJUeXBlIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJjcmVhdGVNZWRpYUVsZW1lbnQiLCJQUk9WSURFUl9SVE1QIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJtb3ZpZSIsImZsYXNodmFycyIsImFsbG93c2NyaXB0YWNjZXNzIiwiYWxsb3dmdWxsc2NyZWVuIiwicXVhbGl0eSIsIm5hbWUiLCJtZW51IiwicXVhbCIsImJnY29sb3IiLCJTV0ZwYXRoIiwiY3JlYXRlIiwiZGVzdHJveSIsInJlbW92ZUNoaWxkIiwiTGlzdGVuZXIiLCJleHRlbmRlZEVsZW1lbnQiLCJwcm92aWRlciIsImxvd0xldmVsRXZlbnRzIiwiZWxWaWRlbyIsImJldHdlZW4iLCJudW0iLCJtaW4iLCJtYXgiLCJNYXRoIiwiY2FucGxheSIsInNldENhblNlZWsiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsImR1cmF0aW9uY2hhbmdlIiwicHJvZ3Jlc3MiLCJlbmRlZCIsImdldFN0YXRlIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiQ09OVEVOVF9DT01QTEVURSIsInNldFN0YXRlIiwibG9hZGVkZGF0YSIsImxvYWRlZG1ldGFkYXRhIiwiaXNMaXZlIiwiZHVyYXRpb24iLCJJbmZpbml0eSIsInNvdXJjZXMiLCJnZXRTb3VyY2VzIiwic291cmNlSW5kZXgiLCJnZXRDdXJyZW50U291cmNlIiwidHlwZSIsIm1ldGFkYXRhIiwiQ09OVEVOVF9NRVRBIiwicGF1c2UiLCJTVEFURV9FUlJPUiIsImVycm9yIiwiY3VycmVudFRpbWUiLCJTVEFURV9QQVVTRUQiLCJwbGF5IiwicGF1c2VkIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0xPQURJTkciLCJwbGF5aW5nIiwidGltZVJhbmdlcyIsImJ1ZmZlcmVkIiwicG9zaXRpb24iLCJsZW5ndGgiLCJlbmQiLCJzZXRCdWZmZXIiLCJDT05URU5UX0JVRkZFUiIsImJ1ZmZlclBlcmNlbnQiLCJzdGFsbGVkIiwidGltZXVwZGF0ZSIsImlzTmFOIiwiaXNTZWVraW5nIiwiQ09OVEVOVF9USU1FIiwicmVzaXplIiwic2Vla2luZyIsInNldFNlZWtpbmciLCJDT05URU5UX1NFRUsiLCJzZWVrZWQiLCJDT05URU5UX1NFRUtFRCIsIndhaXRpbmciLCJTVEFURV9TVEFMTEVEIiwidm9sdW1lY2hhbmdlIiwicm91bmQiLCJ2b2x1bWUiLCJDT05URU5UX1ZPTFVNRSIsIm11dGUiLCJtdXRlZCIsImNvZGUiLCJjb252ZXJ0ZWRFcnJvQ29kZSIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiRVJST1JTIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZlbnROYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsIm9uRXh0ZW5kZWRMb2FkIiwibGlzdGVuZXIiLCJwb3N0ZXJJbWFnZSIsImdldENvbmZpZyIsImltYWdlIiwicGxheWJhY2tSYXRlIiwiZGVmYXVsdFBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsImN1cnJlbnRTb3VyY2UiLCJmcmFtZXJhdGUiLCJzZXRUaW1lY29kZU1vZGUiLCJwcmV2aW91c1NvdXJjZSIsInNyYyIsInNvdXJjZUVsZW1lbnQiLCJmaWxlIiwic291cmNlQ2hhbmdlZCIsImxvYWQiLCJzZWVrIiwiZ2V0TmFtZSIsImNhblNlZWsiLCJuZXdTdGF0ZSIsInN0YXRlIiwicHJldlN0YXRlIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfU1RBVEUiLCJwcmV2c3RhdGUiLCJuZXdzdGF0ZSIsIm5ld0J1ZmZlciIsImJ1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRNdXRlIiwiQ09OVEVOVF9NVVRFIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImlzQXV0b1N0YXJ0IiwiaXNNdXRlIiwic3RhcnR0aW1lIiwicHJvbWlzZSIsInVuZGVmaW5lZCIsInRoZW4iLCJzZXRUaW1lb3V0Iiwic2V0UGxheWJhY2tSYXRlIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwibWFwIiwiaW5kZXgiLCJsYWJlbCIsInNldEN1cnJlbnRTb3VyY2UiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwic2V0U291cmNlTGFiZWwiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldEZyYW1lcmF0ZSIsInNldEZyYW1lcmF0ZSIsInNlZWtGcmFtZSIsImZyYW1lQ291bnQiLCJmcHMiLCJjdXJyZW50RnJhbWVzIiwibmV3UG9zaXRpb24iLCJzdG9wIiwicmVtb3ZlQXR0cmlidXRlIiwiZmlyc3RDaGlsZCIsIm9mZiIsIm1ldGhvZCIsImFwcGx5IiwiYXJndW1lbnRzIiwiZXh0cmFjdFZpZGVvRWxlbWVudCIsIl8iLCJpc0VsZW1lbnQiLCJnZXRWaWRlb0VsZW1lbnQiLCJtZWRpYSIsInNlcGFyYXRlTGl2ZSIsImlzRHluYW1pYyIsImVycm9yVHJpZ2dlciIsIkVSUk9SIiwicGlja0N1cnJlbnRTb3VyY2UiLCJpIiwiZ2V0U291cmNlTGFiZWwiLCJnZXRCcm93c2VyTGFuZ3VhZ2UiLCJuYXYiLCJ3aW5kb3ciLCJuYXZpZ2F0b3IiLCJicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMiLCJsYW5ndWFnZSIsIkFycmF5IiwiaXNBcnJheSIsImxhbmd1YWdlcyIsImdldEJyb3dzZXIiLCJ1c2VyQWdlbnQiLCJpbmRleE9mIiwibXNpZSIsImllIiwidW5kZWYiLCJ2IiwiZGl2IiwiYWxsIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbm5lckhUTUwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQkFBaUIscUJBQXVCLHlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNLeEM7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFVBQVUsU0FBVkEsT0FBVSxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFrQ0MsSUFBbEMsRUFBdUM7QUFDbkQsUUFBTUMsT0FBTyxFQUFiO0FBQ0EsUUFBSUMsU0FBU0osVUFBVUssWUFBVixDQUF1QixnQkFBdkIsQ0FBYjtBQUNBLFFBQUlDLGVBQWUsRUFBbkI7QUFDQSxRQUFJQyxjQUFjLDBCQUFsQjs7QUFFQUMsc0JBQWtCQyxHQUFsQixDQUFzQix3Q0FBdUNGLFdB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TUFBNUIsQ0FBWDtBQUNBOzs7Ozs7Ozs7OztBQVdBLFlBQUlFLEtBQU0sWUFBVTs7QUFFaEIsZ0JBQUlDLEtBQUo7QUFBQSxnQkFDSUMsSUFBSSxDQURSO0FBQUEsZ0JBRUlDLE1BQU0xTixTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBRlY7QUFBQSxnQkFHSTBOLE1BQU1ELElBQUlFLG9CQUFKLENBQXlCLEdBQXpCLENBSFY7O0FBS0EsbUJBQ0lGLElBQUlHLFNBQUosR0FBZ0IsbUJBQW9CLEVBQUVKLENBQXRCLEdBQTJCLHVCQUEzQyxFQUNJRSxJQUFJLENBQUosQ0FGUjs7QUFLQSxtQkFBT0YsSUFBSSxDQUFKLEdBQVFBLENBQVIsR0FBWUQsS0FBbkI7QUFFSCxTQWRTLEVBQVY7QUFlQSxZQUFHRCxLQUFLLENBQVIsRUFBVTtBQUNOLG1CQUFPLE9BQVA7QUFDSCxTQUZELE1BRUs7QUFDRCxtQkFBTyxVQUFQO0FBQ0g7QUFFSixLQWxDSyxNQWtDRDtBQUNELGVBQU8sU0FBUDtBQUNIO0FBRUosQ0EvQ00sQyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiT3ZlblBsYXllckZsYXNoLnN3ZlwiOyIsIi8qKlxyXG4gKiBAYnJpZWYgICDrr7jrlJTslrQg7JeY66as66i87Yq466W8IOq0gOumrO2VmOuKlCDqsJ3ssrQuIO2YhOyerOuKlCDtlZjripQg7J287J20IOunjuyngCDslYrri6QuXHJcbiAqIEBwYXJhbSAgIHtlbGVtZW50fSAgIGNvbnRhaW5lciAgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcbmltcG9ydCB7Z2V0QnJvd3Nlcn0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgU1dGcGF0aCBmcm9tICcuLi8uLi8uLi9hc3NldHMvT3ZlblBsYXllckZsYXNoLnN3Zic7XHJcblxyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyLCBwcm92aWRlclR5cGUsIGxvb3Ape1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgbGV0IHJvb3RJZCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmVudC1pZFwiKTtcclxuICAgIGxldCBtZWRpYUVsZW1lbnQgPSBcIlwiO1xyXG4gICAgbGV0IGJyb3dzZXJUeXBlID0gZ2V0QnJvd3NlcigpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBsb2FkZWQuIGJyb3dzZXJUeXBlIDogXCIrIGJyb3dzZXJUeXBlKTtcclxuICAgIGNvbnN0IGNyZWF0ZU1lZGlhRWxlbWVudCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYocHJvdmlkZXJUeXBlICE9PSBQUk9WSURFUl9SVE1QKXtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZVJlbW90ZVBsYXliYWNrJywgJycpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd3ZWJraXQtcGxheXNpbmxpbmUnLCAnJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJycpO1xyXG4gICAgICAgICAgICBpZihsb29wKXtcclxuICAgICAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2xvb3AnLCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lZGlhRWxlbWVudCk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgbW92aWUsIGZsYXNodmFycywgYWxsb3dzY3JpcHRhY2Nlc3MsIGFsbG93ZnVsbHNjcmVlbiwgcXVhbGl0eSwgbmFtZSwgbWVudSwgcXVhbCwgYmdjb2xvciwgbG9vcDtcclxuICAgICAgICAgICAgbW92aWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbW92aWUnKTtcclxuICAgICAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsIFNXRnBhdGgpO1xyXG5cclxuICAgICAgICAgICAgZmxhc2h2YXJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdmbGFzaHZhcnMnKTtcclxuICAgICAgICAgICAgLy9wbGF5ZXJJZCBpcyB0byB1c2UgU1dGIGZvciBFeHRlcm5hbEludGVyZmFjZS5jYWxsKCkuXHJcbiAgICAgICAgICAgIGZsYXNodmFycy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3BsYXllcklkPScrcm9vdElkKTtcclxuXHJcbiAgICAgICAgICAgIGFsbG93c2NyaXB0YWNjZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93c2NyaXB0YWNjZXNzJyk7XHJcbiAgICAgICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnYWx3YXlzJyk7XHJcblxyXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW4uc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93ZnVsbHNjcmVlbicpO1xyXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW4uc2V0QXR0cmlidXRlKCd2YWx1ZScsICd0cnVlJyk7XHJcblxyXG4gICAgICAgICAgICBxdWFsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xyXG4gICAgICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGVpZ2h0Jyk7XHJcblxyXG4gICAgICAgICAgICBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbmFtZScpO1xyXG4gICAgICAgICAgICBuYW1lLnNldEF0dHJpYnV0ZSgndmFsdWUnLCByb290SWQrXCItZmxhc2hcIik7XHJcblxyXG4gICAgICAgICAgICBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbWVudScpO1xyXG4gICAgICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnZmFsc2UnKTtcclxuXHJcbiAgICAgICAgICAgIHF1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XHJcbiAgICAgICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoaWdoJyk7XHJcblxyXG4gICAgICAgICAgICBiZ2NvbG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYmdjb2xvcicpO1xyXG4gICAgICAgICAgICBiZ2NvbG9yLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnIzAwMDAwMCcpO1xyXG5cclxuICAgICAgICAgICAgaWYobG9vcCl7XHJcbiAgICAgICAgICAgICAgICBsb29wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCduYW1lJywgJ2xvb3AnKTtcclxuICAgICAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCd2YWx1ZScsICd0cnVlJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29iamVjdCcpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdzY2FsZScsICdkZWZhdWx0Jyk7XHJcblxyXG4gICAgICAgICAgICBpZihicm93c2VyVHlwZSAhPT0gXCJvbGRJRVwiKXtcclxuICAgICAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEnLCBTV0ZwYXRoKTtcclxuICAgICAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzc2lkJywgJ2Nsc2lkOkQyN0NEQjZFLUFFNkQtMTFjZi05NkI4LTQ0NDU1MzU0MDAwMCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChtb3ZpZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobG9vcCl7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQobG9vcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGJnY29sb3IpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQocXVhbCk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd2Z1bGxzY3JlZW4pO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dzY3JpcHRhY2Nlc3MpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoZmxhc2h2YXJzKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVkaWFFbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNyZWF0ZSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBjcmVhdGVFbGVtZW50KClcIik7XHJcbiAgICAgICAgaWYobWVkaWFFbGVtZW50KXtcclxuICAgICAgICAgICAgdGhhdC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIHJlbW92ZUVsZW1lbnQoKVwiKTtcclxuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuICAgICAgICBtZWRpYUVsZW1lbnQgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsImltcG9ydCB7XHJcbiAgICBFUlJPUlMsXHJcbiAgICBFUlJPUixcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX1BBVVNFRCxcclxuICAgIFNUQVRFX0VSUk9SLFxyXG4gICAgQ09OVEVOVF9DT01QTEVURSxcclxuICAgIENPTlRFTlRfU0VFSyxcclxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXHJcbiAgICBDT05URU5UX1NFRUtFRCxcclxuICAgIENPTlRFTlRfQlVGRkVSLFxyXG4gICAgQ09OVEVOVF9USU1FLFxyXG4gICAgQ09OVEVOVF9WT0xVTUUsXHJcbiAgICBDT05URU5UX01FVEEsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXHJcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcclxuICAgIFBST1ZJREVSX0hUTUw1LFxyXG4gICAgUFJPVklERVJfV0VCUlRDLFxyXG4gICAgUFJPVklERVJfREFTSCxcclxuICAgIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlLCBlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUcmlnZ2VyIG9uIHZhcmlvdXMgdmlkZW8gZXZlbnRzLlxyXG4gKiBAcGFyYW0gICBleHRlbmRlZEVsZW1lbnQgZXh0ZW5kZWQgbWVkaWEgb2JqZWN0IGJ5IG1zZS5cclxuICogQHBhcmFtICAgUHJvdmlkZXIgcHJvdmlkZXIgIGh0bWw1UHJvdmlkZXJcclxuICogKi9cclxuXHJcblxyXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGV4dGVuZGVkRWxlbWVudCwgcHJvdmlkZXIpe1xyXG4gICAgY29uc3QgbG93TGV2ZWxFdmVudHMgPSB7fTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIGxvYWRlZC5cIixleHRlbmRlZEVsZW1lbnQgLHByb3ZpZGVyICk7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcblxyXG4gICAgbGV0IGVsVmlkZW8gPSBleHRyYWN0VmlkZW9FbGVtZW50KGV4dGVuZGVkRWxlbWVudCk7XHJcbiAgICBjb25zdCBiZXR3ZWVuID0gZnVuY3Rpb24gKG51bSwgbWluLCBtYXgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4obnVtLCBtYXgpLCBtaW4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBjYW4gc3RhcnQgcGxheWluZyB0aGUgYXVkaW8vdmlkZW9cclxuICAgIGxvd0xldmVsRXZlbnRzLmNhbnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0Q2FuU2Vlayh0cnVlKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSX0ZVTEwpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBjYW5wbGF5XCIpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgZHVyYXRpb24gb2YgdGhlIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWRcclxuICAgIGxvd0xldmVsRXZlbnRzLmR1cmF0aW9uY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzKCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGR1cmF0aW9uY2hhbmdlXCIpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgY3VycmVudCBwbGF5bGlzdCBpcyBlbmRlZFxyXG4gICAgbG93TGV2ZWxFdmVudHMuZW5kZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVuZGVkXCIpO1xyXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgIT0gU1RBVEVfSURMRSAmJiBwcm92aWRlci5nZXRTdGF0ZSgpICE9IFNUQVRFX0NPTVBMRVRFKXtcclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0NPTVBMRVRFKTtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfQ09NUExFVEUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZSBvZiB0aGUgYXVkaW8vdmlkZW9cclxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZGRhdGEgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nIEJlY2F1c2UgdGhpcyBjYXVzZXMgY2hhb3MgYnkgbG9hZGVkbWV0YWRhdGEuXHJcbiAgICAgICAgLypcclxuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBlbFZpZGVvLmR1cmF0aW9uLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGVsVmlkZW8udmlkZW9IZWlnaHQsXHJcbiAgICAgICAgICAgIHdpZHRoOiBlbFZpZGVvLnZpZGVvV2lkdGhcclxuICAgICAgICB9O1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7Ki9cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gbG9hZGVkZGF0YVwiKTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaGFzIGxvYWRlZCBtZXRhIGRhdGEgZm9yIHRoZSBhdWRpby92aWRlb1xyXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkbWV0YWRhdGEgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGlzTGl2ZSA9IChlbFZpZGVvLmR1cmF0aW9uID09PSBJbmZpbml0eSkgPyB0cnVlIDogc2VwYXJhdGVMaXZlKGV4dGVuZGVkRWxlbWVudCk7XHJcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwcm92aWRlci5nZXRTb3VyY2VzKCk7XHJcbiAgICAgICAgbGV0IHNvdXJjZUluZGV4ID0gcHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpO1xyXG4gICAgICAgIGxldCB0eXBlID0gc291cmNlSW5kZXggPiAtMSA/IHNvdXJjZXNbc291cmNlSW5kZXhdLnR5cGUgOiBcIlwiO1xyXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcclxuICAgICAgICAgICAgZHVyYXRpb246IGlzTGl2ZSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb24sXHJcbiAgICAgICAgICAgIHR5cGUgOnR5cGVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gbG9hZGVkbWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBwYXVzZWRcclxuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0NPTVBMRVRFIHx8cHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfRVJST1Ipe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsVmlkZW8uZW5kZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsVmlkZW8uZXJyb3Ipe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsVmlkZW8uY3VycmVudFRpbWUgPT09IGVsVmlkZW8uZHVyYXRpb24pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwYXVzZVwiKTtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gc3RhcnRlZCBvciBpcyBubyBsb25nZXIgcGF1c2VkXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICghZWxWaWRlby5wYXVzZWQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheVwiKTtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGlzIHBsYXlpbmcgYWZ0ZXIgaGF2aW5nIGJlZW4gcGF1c2VkIG9yIHN0b3BwZWQgZm9yIGJ1ZmZlcmluZ1xyXG4gICAgbG93TGV2ZWxFdmVudHMucGxheWluZyA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheWluZ1wiKTtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcclxuICAgICAgICAvL3Byb3ZpZGVyLnRyaWdnZXIoUFJPVklERVJfRklSU1RfRlJBTUUpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBpcyBkb3dubG9hZGluZyB0aGUgYXVkaW8vdmlkZW9cclxuICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcclxuICAgICAgICBpZighdGltZVJhbmdlcyApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uLCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHByb2dyZXNzXCIsIGJ1ZmZlcmVkKjEwMCk7XHJcblxyXG4gICAgICAgIHByb3ZpZGVyLnNldEJ1ZmZlcihidWZmZXJlZCoxMDApO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVIsIHtcclxuICAgICAgICAgICAgYnVmZmVyUGVyY2VudDogYnVmZmVyZWQqMTAwLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogIHBvc2l0aW9uLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgdHJ5aW5nIHRvIGdldCBtZWRpYSBkYXRhLCBidXQgZGF0YSBpcyBub3QgYXZhaWxhYmxlXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5zdGFsbGVkID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzdGFsbFwiKTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcclxuICAgIGxvd0xldmVsRXZlbnRzLnRpbWV1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbjtcclxuICAgICAgICBpZiAoaXNOYU4oZHVyYXRpb24pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSAmJiAhZWxWaWRlby5wYXVzZWQpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gdGltZXVwZGF0ZVwiICwge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgIH0pOyovXHJcbiAgICAgICAgaWYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcgfHwgcHJvdmlkZXIuaXNTZWVraW5nKCkpIHtcclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnJlc2l6ZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcmVzaXplXCIpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyh0cnVlKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2luZ1wiLCBlbFZpZGVvLmN1cnJlbnRUaW1lKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFSyx7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uIDogZWxWaWRlby5jdXJyZW50VGltZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtlZCA9ICgpID0+IHtcclxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVrZWRcIik7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyhmYWxzZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUtFRCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgdmlkZW8gc3RvcHMgYmVjYXVzZSBpdCBuZWVkcyB0byBidWZmZXIgdGhlIG5leHQgZnJhbWVcclxuICAgIGxvd0xldmVsRXZlbnRzLndhaXRpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIiwgcHJvdmlkZXIuZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgaWYocHJvdmlkZXIuaXNTZWVraW5nKCkpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuICAgICAgICB9ZWxzZSBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfU1RBTExFRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy52b2x1bWVjaGFuZ2UgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB2b2x1bWVjaGFuZ2VcIiwgTWF0aC5yb3VuZChlbFZpZGVvLnZvbHVtZSAqIDEwMCkpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIHtcclxuICAgICAgICAgICAgdm9sdW1lOiBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSxcclxuICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5lcnJvciA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjb2RlID0gKGVsVmlkZW8uZXJyb3IgJiYgZWxWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xyXG4gICAgICAgIGxldCBjb252ZXJ0ZWRFcnJvQ29kZSA9ICh7XHJcbiAgICAgICAgICAgIDA6IFBMQVlFUl9VTktOV09OX0VSUk9SLFxyXG4gICAgICAgICAgICAxOiBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXHJcbiAgICAgICAgICAgIDI6IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXHJcbiAgICAgICAgICAgIDM6IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcclxuICAgICAgICAgICAgNDogUExBWUVSX0ZJTEVfRVJST1JcclxuICAgICAgICB9W2NvZGVdfHwwKTtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGVycm9yXCIsIGNvbnZlcnRlZEVycm9Db2RlKTtcclxuICAgICAgICBlcnJvclRyaWdnZXIoRVJST1JTW2NvbnZlcnRlZEVycm9Db2RlXSk7XHJcbiAgICB9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XHJcbiAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICAgICAgZWxWaWRlby5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xyXG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjcuLlxyXG4gKi9cclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9MaXN0ZW5lclwiO1xyXG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIHNlcGFyYXRlTGl2ZSwgcGlja0N1cnJlbnRTb3VyY2V9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuaW1wb3J0IHtcclxuICAgIFNUQVRFX0lETEUsIFNUQVRFX1BMQVlJTkcsIFNUQVRFX1BBVVNFRCwgU1RBVEVfQ09NUExFVEUsXHJcbiAgICBQTEFZRVJfU1RBVEUsIFBMQVlFUl9DT01QTEVURSwgUExBWUVSX1BBVVNFLCBQTEFZRVJfUExBWSxcclxuICAgIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBDT05URU5UX1NPVVJDRV9DSEFOR0VELFxyXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgQ29yZSBGb3IgSHRtbDUgVmlkZW8uXHJcbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xyXG4gKiBAcGFyYW0gICBvbkV4dGVuZGVkTG9hZCBvbiBsb2FkIGhhbmRsZXJcclxuICogKi9cclxuY29uc3QgUHJvdmlkZXIgPSBmdW5jdGlvbiAoc3BlYywgcGxheWVyQ29uZmlnLCBvbkV4dGVuZGVkTG9hZCl7XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIGxvYWRlZC4gXCIpO1xyXG5cclxuICAgIGxldCB0aGF0ID17fTtcclxuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcclxuXHJcbiAgICBsZXQgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihzcGVjLmV4dGVuZGVkRWxlbWVudCwgdGhhdCk7XHJcbiAgICBsZXQgZWxWaWRlbyA9IGV4dHJhY3RWaWRlb0VsZW1lbnQoc3BlYy5leHRlbmRlZEVsZW1lbnQpO1xyXG4gICAgbGV0IHBvc3RlckltYWdlID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmltYWdlfHxcIlwiO1xyXG4gICAgZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5ZXJDb25maWcuZ2V0UGxheWJhY2tSYXRlKCk7XHJcblxyXG5cclxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcclxuICAgICAgICBzcGVjLmZyYW1lcmF0ZSA9IHNvdXJjZS5mcmFtZXJhdGU7XHJcbiAgICAgICAgaWYoIXNwZWMuZnJhbWVyYXRlKXtcclxuICAgICAgICAgICAgLy9pbml0IHRpbWVjb2RlIG1vZGVcclxuICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFRpbWVjb2RlTW9kZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob25FeHRlbmRlZExvYWQpe1xyXG4gICAgICAgICAgICBvbkV4dGVuZGVkTG9hZChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgcHJldmlvdXNTb3VyY2UgPSBlbFZpZGVvLnNyYztcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xyXG5cclxuICAgICAgICAgICAgc291cmNlRWxlbWVudC5zcmMgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2VFbGVtZW50LnNyYyAhPT0gcHJldmlvdXNTb3VyY2UpO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgZWxWaWRlby5zcmMgPSBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXS5maWxlO1xyXG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGNhbGwgbG9hZCBpZiBzcmMgd2FzIG5vdCBzZXQuIGxvYWQoKSB3aWxsIGNhbmNlbCBhbnkgYWN0aXZlIHBsYXkgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihsYXN0UGxheVBvc2l0aW9uID09PSAwICYmIGVsVmlkZW8uY3VycmVudFRpbWUgPiAwKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKnRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzcGVjLmN1cnJlbnRTb3VyY2VcclxuICAgICAgICAgICAgfSk7Ki9cclxuXHJcbiAgICAgICAgICAgIGlmKHBvc3RlckltYWdlKXtcclxuICAgICAgICAgICAgICAgIC8vVGhlcmUgaXMgbm8gd2F5IHRvIHZlcmlmeSB0aGUgcG9zdGVySW1hZ2UgVVJMLiBUaGlzIHdpbGwgYmUgYmxuYWsgdW50aWwgaGF2ZSBhIGdvb2QgaWRlYS5cclxuICAgICAgICAgICAgICAgIC8vZWxWaWRlby5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ0cmFuc3BhcmVudCB1cmwoJ1wiK3Bvc3RlckltYWdlK1wiJykgbm8tcmVwZWF0IDAgMFwiO1xyXG4gICAgICAgICAgICAgICAgLy9lbFZpZGVvLnBvc3RlciA9IHBvc3RlckltYWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldE5hbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMubmFtZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY2FuU2VlaztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldENhblNlZWsgPSAoY2FuU2VlaykgPT4ge1xyXG4gICAgICAgIHNwZWMuY2FuU2VlayA9IGNhblNlZWs7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnNlZWtpbmc7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmcpPT57XHJcbiAgICAgICAgc3BlYy5zZWVraW5nID0gc2Vla2luZztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMuc3RhdGUgIT09IG5ld1N0YXRlKXtcclxuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHNwZWMuc3RhdGU7XHJcbiAgICAgICAgICAgIHN3aXRjaChuZXdTdGF0ZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0NPTVBMRVRFIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX0NPTVBMRVRFKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUEFVU0VEIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BBVVNFLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZTogc3BlYy5zdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QTEFZSU5HIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3BlYy5zdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1NUQVRFLCB7XHJcbiAgICAgICAgICAgICAgICBwcmV2c3RhdGUgOiBwcmV2U3RhdGUsXHJcbiAgICAgICAgICAgICAgICBuZXdzdGF0ZTogc3BlYy5zdGF0ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnN0YXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0QnVmZmVyID0gKG5ld0J1ZmZlcikgPT4ge1xyXG4gICAgICAgIHNwZWMuYnVmZmVyID0gbmV3QnVmZmVyO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmJ1ZmZlcjtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBpc0xpdmUgPSAoZWxWaWRlby5kdXJhdGlvbiA9PT0gSW5maW5pdHkpID8gdHJ1ZSA6IHNlcGFyYXRlTGl2ZShzcGVjLmV4dGVuZGVkRWxlbWVudCk7XHJcbiAgICAgICAgcmV0dXJuIGlzTGl2ZSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb247XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby5jdXJyZW50VGltZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbFZpZGVvLnZvbHVtZSA9IHZvbHVtZS8xMDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby52b2x1bWUqMTAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gIWVsVmlkZW8ubXV0ZWQ7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XHJcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHN0YXRlO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xyXG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLm11dGVkO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbikgPT57XHJcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcclxuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XHJcbiAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbiB8fCAwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzTXV0ZSgpKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0TXV0ZSh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRWb2x1bWUocGxheWVyQ29uZmlnLmdldFZvbHVtZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XHJcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcclxuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XHJcbiAgICAgICAgX2xvYWQoc3BlYy5zb3VyY2VzLnN0YXJ0dGltZSB8fCAwKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBsZXQgcHJvbWlzZSA9IGVsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oXyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQXV0b3BsYXkgc3RhcnRlZCFcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL0Nhbid0IHBsYXkgYmVjYXVzZSBVc2VyIGRvZXNuJ3QgYW55IGludGVyYWN0aW9ucy5cclxuICAgICAgICAgICAgICAgICAgICAvL1dhaXQgZm9yIFVzZXIgSW50ZXJhY3Rpb25zLiAobGlrZSBjbGljaylcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoYXQucGF1c2UgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbFZpZGVvLmN1cnJlbnRUaW1lID0gcG9zaXRpb247XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwge3BsYXliYWNrUmF0ZSA6IHBsYXliYWNrUmF0ZX0pO1xyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBzb3VyY2UudHlwZSxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXHJcbiAgICAgICAgICAgICAgICBpbmRleCA6IGluZGV4XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoc291cmNlSW5kZXgsIG5lZWRQcm92aWRlckNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICBpZihzcGVjLmN1cnJlbnRTb3VyY2UgPT09IHNvdXJjZUluZGV4KXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XHJcbiAgICAgICAgICAgIGlmKHNwZWMuc291cmNlcyAmJiBzcGVjLnNvdXJjZXMubGVuZ3RoID4gc291cmNlSW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHNvdXJjZUluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc291cmNlSW5kZXhcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUxhYmVsKHNwZWMuc291cmNlc1tzb3VyY2VJbmRleF0ubGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgLy9zcGVjLmN1cnJlbnRRdWFsaXR5ID0gc291cmNlSW5kZXg7XHJcbiAgICAgICAgICAgICAgICBpZihuZWVkUHJvdmlkZXJDaGFuZ2Upe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfbG9hZChlbFZpZGVvLmN1cnJlbnRUaW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucXVhbGl0eUxldmVscztcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nXHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEZyYW1lcmF0ZSA9IChmcmFtZXJhdGUpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGUgPSBmcmFtZXJhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT57XHJcbiAgICAgICAgbGV0IGZwcyA9IHNwZWMuZnJhbWVyYXRlO1xyXG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVzID0gZWxWaWRlby5jdXJyZW50VGltZSAqIGZwcztcclxuICAgICAgICBsZXQgbmV3UG9zaXRpb24gPSAoY3VycmVudEZyYW1lcyArIGZyYW1lQ291bnQpIC8gZnBzO1xyXG4gICAgICAgIG5ld1Bvc2l0aW9uID0gbmV3UG9zaXRpb24gKyAwLjAwMDAxOyAvLyBGSVhFUyBBIFNBRkFSSSBTRUVLIElTU1VFLiBteVZkaWVvLmN1cnJlbnRUaW1lID0gMC4wNCB3b3VsZCBnaXZlIFNNUFRFIDAwOjAwOjAwOjAwIHdoZXJhcyBpdCBzaG91bGQgZ2l2ZSAwMDowMDowMDowMVxyXG5cclxuICAgICAgICB0aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgdGhhdC5zZWVrKG5ld1Bvc2l0aW9uKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xyXG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdwcmVsb2FkJyk7XHJcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xyXG4gICAgICAgIHdoaWxlIChlbFZpZGVvLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVDaGlsZChlbFZpZGVvLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQuc3RvcCgpO1xyXG4gICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAvL2VsVmlkZW8ucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhhdC5vZmYoKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZGVzdHJveSgpIHBsYXllciBzdG9wLCBsaXN0ZW5lciwgZXZlbnQgZGVzdHJvaWVkXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cclxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcclxuICAgIHRoYXQuc3VwZXIgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxMi4uXHJcbiAqL1xyXG5pbXBvcnQge0VSUk9SLCBTVEFURV9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0VmlkZW9FbGVtZW50ID0gZnVuY3Rpb24oZXh0ZW5kZWRFbGVtZW50KSB7XHJcbiAgICBpZihfLmlzRWxlbWVudChleHRlbmRlZEVsZW1lbnQpKXtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgaWYoZXh0ZW5kZWRFbGVtZW50LmdldFZpZGVvRWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5nZXRWaWRlb0VsZW1lbnQoKTtcclxuICAgIH1lbHNlIGlmKGV4dGVuZGVkRWxlbWVudC5tZWRpYSl7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5tZWRpYTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlcGFyYXRlTGl2ZSA9IGZ1bmN0aW9uKGV4dGVuZGVkRWxlbWVudCkge1xyXG4gICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXHJcblxyXG4gICAgaWYoZXh0ZW5kZWRFbGVtZW50LmlzRHluYW1pYyl7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5pc0R5bmFtaWMoKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBlcnJvclRyaWdnZXIgPSBmdW5jdGlvbihlcnJvciwgcHJvdmlkZXIpe1xyXG4gICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xyXG4gICAgcHJvdmlkZXIucGF1c2UoKTtcclxuICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcGlja0N1cnJlbnRTb3VyY2UgPSAoc291cmNlcywgY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKSA9PiB7XHJcbiAgICBsZXQgc291cmNlSW5kZXggPSBNYXRoLm1heCgwLCBjdXJyZW50U291cmNlKTtcclxuICAgIGNvbnN0IGxhYmVsID1cIlwiO1xyXG4gICAgaWYgKHNvdXJjZXMpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgc291cmNlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNvdXJjZUluZGV4O1xyXG59OyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyTGFuZ3VhZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IG5hdiA9IHdpbmRvdy5uYXZpZ2F0b3IsXHJcbiAgICAgICAgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzID0gWydsYW5ndWFnZScsICdicm93c2VyTGFuZ3VhZ2UnLCAnc3lzdGVtTGFuZ3VhZ2UnLCAndXNlckxhbmd1YWdlJ10sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBsYW5ndWFnZTtcclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBIVE1MIDUuMSBcIm5hdmlnYXRvci5sYW5ndWFnZXNcIlxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmF2Lmxhbmd1YWdlcykpIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmF2Lmxhbmd1YWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsYW5ndWFnZSA9IG5hdi5sYW5ndWFnZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBvdGhlciB3ZWxsIGtub3duIHByb3BlcnRpZXMgaW4gYnJvd3NlcnNcclxuICAgIGZvciAoaSA9IDA7IGkgPCBicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsYW5ndWFnZSA9IG5hdlticm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXNbaV1dO1xyXG4gICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGlmKChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPcGVyYVwiKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpKSAhPSAtMSApe1xyXG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xyXG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpICE9IC0xICl7XHJcbiAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xyXG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpICE9IC0xKXtcclxuICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XHJcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpICE9IC0xICl7XHJcbiAgICAgICAgcmV0dXJuICdmaXJlZm94JztcclxuICAgIH1lbHNlIGlmKChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpICE9IC0xICkpe1xyXG4gICAgICAgIGxldCBtc2llID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKTtcclxuICAgICAgICAvKmlmKCEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09IHRydWUgKXtcclxuICAgICAgICAgICAgcmV0dXJuICdpZSc7XHJcbiAgICAgICAgfWVsc2UgaWYoISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LipydlxcOjExXFwuLykpe1xyXG4gICAgICAgICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llICsgNSwgdWEuaW5kZXhPZihcIi5cIiwgbXNpZSkpKSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaWUnO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuICd1bmtub3duJztcclxuICAgICAgICB9Ki9cclxuICAgICAgICB2YXIgaWUgPSAoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIHZhciB1bmRlZixcclxuICAgICAgICAgICAgICAgIHYgPSAzLFxyXG4gICAgICAgICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgICAgICAgICAgICBhbGwgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKTtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChcclxuICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSAnPCEtLVtpZiBndCBJRSAnICsgKCsrdikgKyAnXT48aT48L2k+PCFbZW5kaWZdLS0+JyxcclxuICAgICAgICAgICAgICAgICAgICBhbGxbMF1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdiA+IDQgPyB2IDogdW5kZWY7XHJcblxyXG4gICAgICAgIH0oKSk7XHJcbiAgICAgICAgaWYoaWUgPCA5KXtcclxuICAgICAgICAgICAgcmV0dXJuICdvbGRJRSc7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiAnbW9kZXJuSUUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=