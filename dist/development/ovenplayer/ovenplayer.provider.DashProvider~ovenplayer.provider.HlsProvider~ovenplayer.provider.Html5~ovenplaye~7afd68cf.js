/*! OvenPlayerv0.7.65 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var Manager = function Manager(container, providerType) {
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
                bgcolor = void 0;
            movie = document.createElement('param');
            movie.setAttribute('name', 'movie');
            movie.setAttribute('value', _OvenPlayerFlash2["default"]);

            flashvars = document.createElement('param');
            flashvars.setAttribute('name', 'flashvars');
            //playerId uses SWF for ExternalInterface.call().
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

            mediaElement = document.createElement('object');
            mediaElement.setAttribute('id', rootId + "-flash");
            mediaElement.setAttribute('name', rootId + "-flash");
            mediaElement.setAttribute('width', '100%');
            mediaElement.setAttribute('height', '100%');

            if (browserType !== "oldIE") {
                mediaElement.setAttribute('data', _OvenPlayerFlash2["default"]);
                mediaElement.setAttribute('type', 'application/x-shockwave-flash');
            } else {
                mediaElement.setAttribute('classid', 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000');

                mediaElement.appendChild(movie);
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
 * @param   providerName child Provider Name
 * @param   extendedElement extended media object by mse.
 * @param   element elVideo  video
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
        var type = provider.getCurrentQuality() ? provider.getCurrentQuality().type : "";
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
        } else if (provider.getState() == _constants.STATE_PLAYING) {
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
 * @param   providerName provider name
 * @param   extendedElement extended media object by mse. or video element.
 * @param   playerConfig  player config
 * @param   onLoad on load handler
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
    elVideo.playbackRate = elVideo.defaultPlaybackRate = playerConfig.getDefaultPlaybackRate();

    var _load = function _load(lastPlayPosition) {
        var source = spec.sources[spec.currentQuality];
        if (onExtendedLoad) {
            onExtendedLoad(source, lastPlayPosition);
        } else {
            OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : " + lastPlayPosition);
            var previousSource = elVideo.src;
            var sourceElement = document.createElement('source');

            sourceElement.src = source.file;
            var sourceChanged = sourceElement.src !== previousSource;
            if (sourceChanged) {
                elVideo.src = spec.sources[spec.currentQuality].file;
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
            that.trigger(_constants.CONTENT_LEVELS, {
                currentQuality: spec.currentQuality
            });

            if (posterImage) {
                elVideo.poster = posterImage;
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
        spec.currentQuality = (0, _utils.pickCurrentQualityIndex)(sources, spec.currentQuality, playerConfig);
        _load(lastPlayPosition || 0);

        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    that.load = function (sources) {
        spec.sources = sources;
        spec.currentQuality = (0, _utils.pickCurrentQualityIndex)(sources, spec.currentQuality, playerConfig);
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
    that.getQualityLevels = function () {
        if (!elVideo) {
            return [];
        }
        var qualityLevels = spec.sources.map(function (source, index) {
            return {
                file: source.file,
                type: source.type,
                label: source.label,
                index: index,
                metaQuality: source.metaQuality
            };
        });
        return qualityLevels;
    };
    that.getCurrentQuality = function () {
        if (!elVideo) {
            return null;
        }
        var source = spec.sources[spec.currentQuality];
        return {
            file: source.file,
            type: source.type,
            label: source.label,
            index: spec.currentQuality
        };
    };
    that.setCurrentQuality = function (qualityIndex, needProviderChange) {
        if (spec.currentQuality === qualityIndex) {
            return false;
        }

        if (qualityIndex > -1) {
            if (spec.sources && spec.sources.length > qualityIndex) {
                //that.pause();
                that.setState(_constants.STATE_IDLE);
                OvenPlayerConsole.log("source changed : " + qualityIndex);
                spec.currentQuality = qualityIndex;

                that.trigger(_constants.CONTENT_LEVEL_CHANGED, {
                    currentQuality: qualityIndex
                });

                playerConfig.setQualityLabel(spec.sources[qualityIndex].label);
                if (needProviderChange) {

                    _load(elVideo.currentTime || 0);
                }
                return spec.currentQuality;
            }
        }
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
exports.pickCurrentQualityIndex = exports.errorTrigger = exports.separateLive = exports.extractVideoElement = undefined;

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var extractVideoElement = exports.extractVideoElement = function extractVideoElement(extendedElement) {
    if (_.isElement(extendedElement)) {
        return extendedElement;
    }
    if (extendedElement.getVideoElement) {
        return extendedElement.getVideoElement();
    } else if (extendedElement.media) {
        return extendedElement.media;
    }
    return null;
}; /**
    * Created by hoho on 2018. 11. 12..
    */
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

var pickCurrentQualityIndex = exports.pickCurrentQualityIndex = function pickCurrentQualityIndex(sources, currentQualityIndex, playerConfig) {
    var quality = Math.max(0, currentQualityIndex);
    var label = "";
    if (sources) {
        for (var i = 0; i < sources.length; i++) {
            if (sources[i]["default"]) {
                quality = i;
            }
            if (playerConfig.getQualityLabel() && sources[i].label === playerConfig.getQualityLabel()) {
                return i;
            }
        }
    }
    return quality;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9tZWRpYS9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9icm93c2VyLmpzIl0sIm5hbWVzIjpbIk1hbmFnZXIiLCJjb250YWluZXIiLCJwcm92aWRlclR5cGUiLCJ0aGF0Iiwicm9vdElkIiwiZ2V0QXR0cmlidXRlIiwibWVkaWFFbGVtZW50IiwiYnJvd3NlclR5cGUiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImNyZWF0ZU1lZGlhRWxlbWVudCIsIlBST1ZJREVSX1JUTVAiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsIm1vdmllIiwiZmxhc2h2YXJzIiwiYWxsb3dzY3JpcHRhY2Nlc3MiLCJhbGxvd2Z1bGxzY3JlZW4iLCJxdWFsaXR5IiwibmFtZSIsIm1lbnUiLCJxdWFsIiwiYmdjb2xvciIsIlNXRnBhdGgiLCJjcmVhdGUiLCJkZXN0cm95IiwicmVtb3ZlQ2hpbGQiLCJMaXN0ZW5lciIsImV4dGVuZGVkRWxlbWVudCIsInByb3ZpZGVyIiwibG93TGV2ZWxFdmVudHMiLCJlbFZpZGVvIiwiYmV0d2VlbiIsIm51bSIsIm1pbiIsIm1heCIsIk1hdGgiLCJvbkVycm9yIiwiZXJyb3IiLCJzZXRTdGF0ZSIsIlNUQVRFX0VSUk9SIiwicGF1c2UiLCJ0cmlnZ2VyIiwiRVJST1IiLCJjYW5wbGF5Iiwic2V0Q2FuU2VlayIsIkNPTlRFTlRfQlVGRkVSX0ZVTEwiLCJkdXJhdGlvbmNoYW5nZSIsInByb2dyZXNzIiwiZW5kZWQiLCJnZXRTdGF0ZSIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsIkNPTlRFTlRfQ09NUExFVEUiLCJsb2FkZWRkYXRhIiwibG9hZGVkbWV0YWRhdGEiLCJpc0xpdmUiLCJkdXJhdGlvbiIsIkluZmluaXR5IiwidHlwZSIsImdldEN1cnJlbnRRdWFsaXR5IiwibWV0YWRhdGEiLCJDT05URU5UX01FVEEiLCJjdXJyZW50VGltZSIsIlNUQVRFX1BBVVNFRCIsInBsYXkiLCJwYXVzZWQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfTE9BRElORyIsInBsYXlpbmciLCJ0aW1lUmFuZ2VzIiwiYnVmZmVyZWQiLCJwb3NpdGlvbiIsImxlbmd0aCIsImVuZCIsInNldEJ1ZmZlciIsIkNPTlRFTlRfQlVGRkVSIiwiYnVmZmVyUGVyY2VudCIsInN0YWxsZWQiLCJ0aW1ldXBkYXRlIiwiaXNOYU4iLCJpc1NlZWtpbmciLCJDT05URU5UX1RJTUUiLCJyZXNpemUiLCJzZWVraW5nIiwic2V0U2Vla2luZyIsIkNPTlRFTlRfU0VFSyIsInNlZWtlZCIsIkNPTlRFTlRfU0VFS0VEIiwid2FpdGluZyIsIlNUQVRFX1NUQUxMRUQiLCJ2b2x1bWVjaGFuZ2UiLCJyb3VuZCIsInZvbHVtZSIsIkNPTlRFTlRfVk9MVU1FIiwibXV0ZSIsIm11dGVkIiwiY29kZSIsImVycm9yQ29kZUdlbiIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwicmVhc29uIiwibWVzc2FnZSIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfRklMRV9FUlJPUiIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2ZW50TmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJQcm92aWRlciIsInNwZWMiLCJwbGF5ZXJDb25maWciLCJvbkV4dGVuZGVkTG9hZCIsImxpc3RlbmVyIiwicG9zdGVySW1hZ2UiLCJnZXRDb25maWciLCJpbWFnZSIsInBsYXliYWNrUmF0ZSIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXREZWZhdWx0UGxheWJhY2tSYXRlIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwic291cmNlcyIsImN1cnJlbnRRdWFsaXR5IiwicHJldmlvdXNTb3VyY2UiLCJzcmMiLCJzb3VyY2VFbGVtZW50IiwiZmlsZSIsInNvdXJjZUNoYW5nZWQiLCJsb2FkIiwic2VlayIsIkNPTlRFTlRfTEVWRUxTIiwicG9zdGVyIiwiZ2V0TmFtZSIsImNhblNlZWsiLCJuZXdTdGF0ZSIsInN0YXRlIiwicHJldlN0YXRlIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfU1RBVEUiLCJwcmV2c3RhdGUiLCJuZXdzdGF0ZSIsIm5ld0J1ZmZlciIsImJ1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRNdXRlIiwiQ09OVEVOVF9NVVRFIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN0YXJ0dGltZSIsInByb21pc2UiLCJ1bmRlZmluZWQiLCJ0aGVuIiwic2V0VGltZW91dCIsInNldFBsYXliYWNrUmF0ZSIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsImdldFBsYXliYWNrUmF0ZSIsImdldFF1YWxpdHlMZXZlbHMiLCJxdWFsaXR5TGV2ZWxzIiwibWFwIiwiaW5kZXgiLCJsYWJlbCIsIm1ldGFRdWFsaXR5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJzZXRRdWFsaXR5TGFiZWwiLCJzdG9wIiwicmVtb3ZlQXR0cmlidXRlIiwiZmlyc3RDaGlsZCIsIm9mZiIsIm1ldGhvZCIsImFwcGx5IiwiYXJndW1lbnRzIiwiZXh0cmFjdFZpZGVvRWxlbWVudCIsIl8iLCJpc0VsZW1lbnQiLCJnZXRWaWRlb0VsZW1lbnQiLCJtZWRpYSIsInNlcGFyYXRlTGl2ZSIsImlzRHluYW1pYyIsImVycm9yVHJpZ2dlciIsInBpY2tDdXJyZW50UXVhbGl0eUluZGV4IiwiY3VycmVudFF1YWxpdHlJbmRleCIsImkiLCJnZXRRdWFsaXR5TGFiZWwiLCJnZXRCcm93c2VyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsIm1zaWUiLCJpZSIsInVuZGVmIiwidiIsImRpdiIsImFsbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUJBQWlCLHFCQUF1Qix5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDS3hDOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxVQUFVLFNBQVZBLE9BQVUsQ0FBU0MsU0FBVCxFQUFvQkMsWUFBcEIsRUFBaUM7QUFDN0MsUUFBTUMsT0FBTyxFQUFiO0FBQ0EsUUFBSUMsU0FBU0gsVUFBVUksWUFBVixDQUF1QixnQkFBdkIsQ0FBYjtBQUNBLFFBQUlDLGVBQWUsRUFBbkI7QUFDQSxRQUFJQyxjQUFjLDBCQUFsQjs7QUFFQUMsc0JBQWtCQyxHQUFsQixDQUFzQix3Q0FBdUNGLFdBQTdEO0FBQ0EsUUFBTUcscUJBQXFCLFNBQXJCQSxrQkFBcUIsR0FBVTtBQUNqQyxZQUFHUixpQkFBaUJTLHdCQUFwQixFQUFrQztBQUM5QkwsMkJBQWVNLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZjtBQUNBUCx5QkFBYVEsWUFBYixDQUEwQix1QkFBMUIsRUFBbUQsRUFBbkQ7QUFDQVIseUJBQWFRLFlBQWIsQ0FBMEIsb0JBQTFCLEVBQWdELEVBQWhEO0FBQ0FSLHlCQUFhUSxZQUFiLENBQTBCLGFBQTFCLEVBQXlDLEVBQXpDO0FBQ0FiLHNCQUFVYyxXQUFWLENBQXNCVCxZQUF0QjtBQUVILFNBUEQs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QXVDLENBQUMsQ0FBNUMsRUFBZ0Q7QUFDbEQsWUFBSUMsT0FBT0gsVUFBVUMsU0FBVixDQUFvQkMsT0FBcEIsQ0FBNEIsTUFBNUIsQ0FBWDtBQUNBOzs7Ozs7Ozs7OztBQVdBLFlBQUlFLEtBQU0sWUFBVTs7QUFFaEIsZ0JBQUlDLEtBQUo7QUFBQSxnQkFDSUMsSUFBSSxDQURSO0FBQUEsZ0JBRUlDLE1BQU10TSxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBRlY7QUFBQSxnQkFHSXNNLE1BQU1ELElBQUlFLG9CQUFKLENBQXlCLEdBQXpCLENBSFY7O0FBS0EsbUJBQ0lGLElBQUlHLFNBQUosR0FBZ0IsbUJBQW9CLEVBQUVKLENBQXRCLEdBQTJCLHVCQUEzQyxFQUNJRSxJQUFJLENBQUosQ0FGUjs7QUFLQSxtQkFBT0YsSUFBSSxDQUFKLEdBQVFBLENBQVIsR0FBWUQsS0FBbkI7QUFFSCxTQWRTLEVBQVY7QUFlQSxZQUFHRCxLQUFLLENBQVIsRUFBVTtBQUNOLG1CQUFPLE9BQVA7QUFDSCxTQUZELE1BRUs7QUFDRCxtQkFBTyxVQUFQO0FBQ0g7QUFFSixLQWxDSyxNQWtDRDtBQUNELGVBQU8sU0FBUDtBQUNIO0FBRUosQ0EvQ00sQyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiT3ZlblBsYXllckZsYXNoLnN3ZlwiOyIsIi8qKlxyXG4gKiBAYnJpZWYgICDrr7jrlJTslrQg7JeY66as66i87Yq466W8IOq0gOumrO2VmOuKlCDqsJ3ssrQuIO2YhOyerOuKlCDtlZjripQg7J287J20IOunjuyngCDslYrri6QuXHJcbiAqIEBwYXJhbSAgIHtlbGVtZW50fSAgIGNvbnRhaW5lciAgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcbmltcG9ydCB7Z2V0QnJvd3Nlcn0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgU1dGcGF0aCBmcm9tICcuLi8uLi8uLi9hc3NldHMvT3ZlblBsYXllckZsYXNoLnN3Zic7XHJcblxyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyLCBwcm92aWRlclR5cGUpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgbGV0IHJvb3RJZCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmVudC1pZFwiKTtcclxuICAgIGxldCBtZWRpYUVsZW1lbnQgPSBcIlwiO1xyXG4gICAgbGV0IGJyb3dzZXJUeXBlID0gZ2V0QnJvd3NlcigpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBsb2FkZWQuIGJyb3dzZXJUeXBlIDogXCIrIGJyb3dzZXJUeXBlKTtcclxuICAgIGNvbnN0IGNyZWF0ZU1lZGlhRWxlbWVudCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYocHJvdmlkZXJUeXBlICE9PSBQUk9WSURFUl9SVE1QKXtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZVJlbW90ZVBsYXliYWNrJywgJycpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd3ZWJraXQtcGxheXNpbmxpbmUnLCAnJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJycpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBtb3ZpZSwgZmxhc2h2YXJzLCBhbGxvd3NjcmlwdGFjY2VzcywgYWxsb3dmdWxsc2NyZWVuLCBxdWFsaXR5LCBuYW1lLCBtZW51LCBxdWFsLCBiZ2NvbG9yO1xyXG4gICAgICAgICAgICBtb3ZpZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgnbmFtZScsICdtb3ZpZScpO1xyXG4gICAgICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgU1dGcGF0aCk7XHJcblxyXG4gICAgICAgICAgICBmbGFzaHZhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZsYXNodmFycycpO1xyXG4gICAgICAgICAgICAvL3BsYXllcklkIHVzZXMgU1dGIGZvciBFeHRlcm5hbEludGVyZmFjZS5jYWxsKCkuXHJcbiAgICAgICAgICAgIGZsYXNodmFycy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3BsYXllcklkPScrcm9vdElkKTtcclxuXHJcbiAgICAgICAgICAgIGFsbG93c2NyaXB0YWNjZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93c2NyaXB0YWNjZXNzJyk7XHJcbiAgICAgICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnYWx3YXlzJyk7XHJcblxyXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW4uc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93ZnVsbHNjcmVlbicpO1xyXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW4uc2V0QXR0cmlidXRlKCd2YWx1ZScsICd0cnVlJyk7XHJcblxyXG4gICAgICAgICAgICBxdWFsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xyXG4gICAgICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGVpZ2h0Jyk7XHJcblxyXG4gICAgICAgICAgICBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbmFtZScpO1xyXG4gICAgICAgICAgICBuYW1lLnNldEF0dHJpYnV0ZSgndmFsdWUnLCByb290SWQrXCItZmxhc2hcIik7XHJcblxyXG4gICAgICAgICAgICBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbWVudScpO1xyXG4gICAgICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnZmFsc2UnKTtcclxuXHJcbiAgICAgICAgICAgIHF1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XHJcbiAgICAgICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoaWdoJyk7XHJcblxyXG4gICAgICAgICAgICBiZ2NvbG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYmdjb2xvcicpO1xyXG4gICAgICAgICAgICBiZ2NvbG9yLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnIzAwMDAwMCcpO1xyXG5cclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0Jyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCduYW1lJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAlJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJyk7XHJcblxyXG4gICAgICAgICAgICBpZihicm93c2VyVHlwZSAhPT0gXCJvbGRJRVwiKXtcclxuICAgICAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEnLCBTV0ZwYXRoKTtcclxuICAgICAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzc2lkJywgJ2Nsc2lkOkQyN0NEQjZFLUFFNkQtMTFjZi05NkI4LTQ0NDU1MzU0MDAwMCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChtb3ZpZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGJnY29sb3IpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQocXVhbCk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd2Z1bGxzY3JlZW4pO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dzY3JpcHRhY2Nlc3MpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoZmxhc2h2YXJzKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVkaWFFbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNyZWF0ZSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBjcmVhdGVFbGVtZW50KClcIik7XHJcbiAgICAgICAgaWYobWVkaWFFbGVtZW50KXtcclxuICAgICAgICAgICAgdGhhdC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIHJlbW92ZUVsZW1lbnQoKVwiKTtcclxuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuICAgICAgICBtZWRpYUVsZW1lbnQgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsImltcG9ydCB7XHJcbiAgICBFUlJPUixcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX1BBVVNFRCxcclxuICAgIFNUQVRFX0VSUk9SLFxyXG4gICAgQ09OVEVOVF9DT01QTEVURSxcclxuICAgIENPTlRFTlRfU0VFSyxcclxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXHJcbiAgICBDT05URU5UX1NFRUtFRCxcclxuICAgIENPTlRFTlRfQlVGRkVSLFxyXG4gICAgQ09OVEVOVF9USU1FLFxyXG4gICAgQ09OVEVOVF9WT0xVTUUsXHJcbiAgICBDT05URU5UX01FVEEsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXHJcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcclxuICAgIFBST1ZJREVSX0hUTUw1LFxyXG4gICAgUFJPVklERVJfV0VCUlRDLFxyXG4gICAgUFJPVklERVJfREFTSCxcclxuICAgIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRyaWdnZXIgb24gdmFyaW91cyB2aWRlbyBldmVudHMuXHJcbiAqIEBwYXJhbSAgIHByb3ZpZGVyTmFtZSBjaGlsZCBQcm92aWRlciBOYW1lXHJcbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLlxyXG4gKiBAcGFyYW0gICBlbGVtZW50IGVsVmlkZW8gIHZpZGVvXHJcbiAqIEBwYXJhbSAgIFByb3ZpZGVyIHByb3ZpZGVyICBodG1sNVByb3ZpZGVyXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihleHRlbmRlZEVsZW1lbnQsIHByb3ZpZGVyKXtcclxuICAgIGNvbnN0IGxvd0xldmVsRXZlbnRzID0ge307XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciBsb2FkZWQuXCIsZXh0ZW5kZWRFbGVtZW50ICxwcm92aWRlciApO1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG5cclxuICAgIGxldCBlbFZpZGVvID0gZXh0cmFjdFZpZGVvRWxlbWVudChleHRlbmRlZEVsZW1lbnQpO1xyXG4gICAgY29uc3QgYmV0d2VlbiA9IGZ1bmN0aW9uIChudW0sIG1pbiwgbWF4KSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKG51bSwgbWF4KSwgbWluKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG9uRXJyb3IgPSBmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xyXG4gICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XHJcblxyXG4gICAgICAgIC8vUFJJVkFURV9TVEFURV9FUlJPUlxyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGNhbiBzdGFydCBwbGF5aW5nIHRoZSBhdWRpby92aWRlb1xyXG4gICAgbG93TGV2ZWxFdmVudHMuY2FucGxheSA9ICgpID0+IHtcclxuICAgICAgICBwcm92aWRlci5zZXRDYW5TZWVrKHRydWUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVJfRlVMTCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGNhbnBsYXlcIik7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBkdXJhdGlvbiBvZiB0aGUgYXVkaW8vdmlkZW8gaXMgY2hhbmdlZFxyXG4gICAgbG93TGV2ZWxFdmVudHMuZHVyYXRpb25jaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MoKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZHVyYXRpb25jaGFuZ2VcIik7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXlsaXN0IGlzIGVuZGVkXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5lbmRlZCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZW5kZWRcIik7XHJcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSAhPSBTVEFURV9JRExFICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT0gU1RBVEVfQ09NUExFVEUpe1xyXG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9DT01QTEVURSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIHRoZSBjdXJyZW50IGZyYW1lIG9mIHRoZSBhdWRpby92aWRlb1xyXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkZGF0YSA9ICgpID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmcgQmVjYXVzZSB0aGlzIGNhdXNlcyBjaGFvcyBieSBsb2FkZWRtZXRhZGF0YS5cclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcclxuICAgICAgICAgICAgZHVyYXRpb246IGVsVmlkZW8uZHVyYXRpb24sXHJcbiAgICAgICAgICAgIGhlaWdodDogZWxWaWRlby52aWRlb0hlaWdodCxcclxuICAgICAgICAgICAgd2lkdGg6IGVsVmlkZW8udmlkZW9XaWR0aFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIG1ldGFkYXRhKTsqL1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRkYXRhXCIpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBoYXMgbG9hZGVkIG1ldGEgZGF0YSBmb3IgdGhlIGF1ZGlvL3ZpZGVvXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRtZXRhZGF0YSA9ICgpID0+IHtcclxuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT09IEluZmluaXR5KSA/IHRydWUgOiBzZXBhcmF0ZUxpdmUoZXh0ZW5kZWRFbGVtZW50KTtcclxuICAgICAgICBsZXQgdHlwZSA9IHByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCkgPyBwcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpLnR5cGUgOiBcIlwiO1xyXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcclxuICAgICAgICAgICAgZHVyYXRpb246IGlzTGl2ZSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb24sXHJcbiAgICAgICAgICAgIHR5cGUgOnR5cGVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gbG9hZGVkbWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBtZXRhZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBwYXVzZWRcclxuICAgIGxvd0xldmVsRXZlbnRzLnBhdXNlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0NPTVBMRVRFIHx8cHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfRVJST1Ipe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsVmlkZW8uZW5kZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsVmlkZW8uZXJyb3Ipe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsVmlkZW8uY3VycmVudFRpbWUgPT09IGVsVmlkZW8uZHVyYXRpb24pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwYXVzZVwiKTtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gc3RhcnRlZCBvciBpcyBubyBsb25nZXIgcGF1c2VkXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICghZWxWaWRlby5wYXVzZWQgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheVwiKTtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGlzIHBsYXlpbmcgYWZ0ZXIgaGF2aW5nIGJlZW4gcGF1c2VkIG9yIHN0b3BwZWQgZm9yIGJ1ZmZlcmluZ1xyXG4gICAgbG93TGV2ZWxFdmVudHMucGxheWluZyA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheWluZ1wiKTtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcclxuICAgICAgICAvL3Byb3ZpZGVyLnRyaWdnZXIoUFJPVklERVJfRklSU1RfRlJBTUUpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBpcyBkb3dubG9hZGluZyB0aGUgYXVkaW8vdmlkZW9cclxuICAgIGxvd0xldmVsRXZlbnRzLnByb2dyZXNzID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcclxuICAgICAgICBpZighdGltZVJhbmdlcyApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZHVyYXRpb24gPSBlbFZpZGVvLmR1cmF0aW9uLCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHByb2dyZXNzXCIsIGJ1ZmZlcmVkKjEwMCk7XHJcblxyXG4gICAgICAgIHByb3ZpZGVyLnNldEJ1ZmZlcihidWZmZXJlZCoxMDApO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVIsIHtcclxuICAgICAgICAgICAgYnVmZmVyUGVyY2VudDogYnVmZmVyZWQqMTAwLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogIHBvc2l0aW9uLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgdHJ5aW5nIHRvIGdldCBtZWRpYSBkYXRhLCBidXQgZGF0YSBpcyBub3QgYXZhaWxhYmxlXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5zdGFsbGVkID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzdGFsbFwiKTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcclxuICAgIGxvd0xldmVsRXZlbnRzLnRpbWV1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbjtcclxuICAgICAgICBpZiAoaXNOYU4oZHVyYXRpb24pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFwcm92aWRlci5pc1NlZWtpbmcoKSAmJiAhZWxWaWRlby5wYXVzZWQpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gdGltZXVwZGF0ZVwiICwge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgIH0pOyovXHJcbiAgICAgICAgaWYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcgfHwgcHJvdmlkZXIuaXNTZWVraW5nKCkpIHtcclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnJlc2l6ZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcmVzaXplXCIpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyh0cnVlKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2luZ1wiLCBlbFZpZGVvLmN1cnJlbnRUaW1lKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFSyx7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uIDogZWxWaWRlby5jdXJyZW50VGltZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtlZCA9ICgpID0+IHtcclxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVrZWRcIik7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyhmYWxzZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUtFRCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgdmlkZW8gc3RvcHMgYmVjYXVzZSBpdCBuZWVkcyB0byBidWZmZXIgdGhlIG5leHQgZnJhbWVcclxuICAgIGxvd0xldmVsRXZlbnRzLndhaXRpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIiwgcHJvdmlkZXIuZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgaWYocHJvdmlkZXIuaXNTZWVraW5nKCkpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuICAgICAgICB9ZWxzZSBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9TVEFMTEVEKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnZvbHVtZWNoYW5nZSA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHZvbHVtZWNoYW5nZVwiLCBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwge1xyXG4gICAgICAgICAgICB2b2x1bWU6IE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApLFxyXG4gICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxWaWRlby5lcnJvciAmJiBlbFZpZGVvLmVycm9yLmNvZGUpIHx8IDA7XHJcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlR2VuID0gKHtcclxuICAgICAgICAgICAgMDoge2NvZGUgOiBQTEFZRVJfVU5LTldPTl9FUlJPUiwgcmVhc29uIDogXCJVbmtub3duIGh0bWw1IHZpZGVvIGVycm9yXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gaHRtbDUgdmlkZW8gZXJyb3JcIn0sXHJcbiAgICAgICAgICAgIDE6IHtjb2RlIDogUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gb3BlcmF0aW9uIGFib3J0ZWRcIiwgbWVzc2FnZSA6IFwiVW5rbm93biBvcGVyYXRpb24gYWJvcnRlZFwifSxcclxuICAgICAgICAgICAgMjoge2NvZGUgOiBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gbmV0d29yayBlcnJvclwiLCBtZXNzYWdlIDogXCJVbmtub3duIG5ldHdvcmsgZXJyb3JcIn0sXHJcbiAgICAgICAgICAgIDM6IHtjb2RlIDogUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gZGVjb2RlIGVycm9yXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gZGVjb2RlIGVycm9yXCJ9LFxyXG4gICAgICAgICAgICA0OiB7Y29kZSA6IFBMQVlFUl9GSUxFX0VSUk9SLCByZWFzb24gOiBcIkZpbGUgY291bGQgbm90IGJlIHBsYXllZFwiLCBtZXNzYWdlIDogXCJGaWxlIGNvdWxkIG5vdCBiZSBwbGF5ZWRcIn1cclxuICAgICAgICB9W2NvZGVdfHwwKTtcclxuICAgICAgICBlcnJvckNvZGVHZW4uZXJyb3IgPSBlbFZpZGVvLmVycm9yO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZXJyb3JcIiwgZXJyb3JDb2RlR2VuKTtcclxuICAgICAgICBvbkVycm9yKGVycm9yQ29kZUdlbik7XHJcbiAgICB9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XHJcbiAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICAgICAgZWxWaWRlby5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogZGVzdHJveSgpXCIpO1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xyXG4gICAgICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjcuLlxyXG4gKi9cclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9MaXN0ZW5lclwiO1xyXG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIHNlcGFyYXRlTGl2ZSwgcGlja0N1cnJlbnRRdWFsaXR5SW5kZXh9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuaW1wb3J0IHtcclxuICAgIFNUQVRFX0lETEUsIFNUQVRFX1BMQVlJTkcsIFNUQVRFX1BBVVNFRCwgU1RBVEVfQ09NUExFVEUsXHJcbiAgICBQTEFZRVJfU1RBVEUsIFBMQVlFUl9DT01QTEVURSwgUExBWUVSX1BBVVNFLCBQTEFZRVJfUExBWSxcclxuICAgIENPTlRFTlRfTEVWRUxTLCBDT05URU5UX0xFVkVMX0NIQU5HRUQsIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELFxyXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgQ29yZSBGb3IgSHRtbDUgVmlkZW8uXHJcbiAqIEBwYXJhbSAgIHByb3ZpZGVyTmFtZSBwcm92aWRlciBuYW1lXHJcbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLiBvciB2aWRlbyBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcclxuICogQHBhcmFtICAgb25Mb2FkIG9uIGxvYWQgaGFuZGxlclxyXG4gKiAqL1xyXG5jb25zdCBQcm92aWRlciA9IGZ1bmN0aW9uIChzcGVjLCBwbGF5ZXJDb25maWcsIG9uRXh0ZW5kZWRMb2FkKXtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgbG9hZGVkLiBcIik7XHJcblxyXG4gICAgbGV0IHRoYXQgPXt9O1xyXG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xyXG5cclxuICAgIGxldCBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKHNwZWMuZXh0ZW5kZWRFbGVtZW50LCB0aGF0KTtcclxuICAgIGxldCBlbFZpZGVvID0gZXh0cmFjdFZpZGVvRWxlbWVudChzcGVjLmV4dGVuZGVkRWxlbWVudCk7XHJcbiAgICBsZXQgcG9zdGVySW1hZ2UgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuaW1hZ2V8fFwiXCI7XHJcbiAgICBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXllckNvbmZpZy5nZXREZWZhdWx0UGxheWJhY2tSYXRlKCk7XHJcblxyXG5cclxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50UXVhbGl0eV07XHJcbiAgICAgICAgaWYob25FeHRlbmRlZExvYWQpe1xyXG4gICAgICAgICAgICBvbkV4dGVuZGVkTG9hZChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgcHJldmlvdXNTb3VyY2UgPSBlbFZpZGVvLnNyYztcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xyXG5cclxuICAgICAgICAgICAgc291cmNlRWxlbWVudC5zcmMgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2VFbGVtZW50LnNyYyAhPT0gcHJldmlvdXNTb3VyY2UpO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgZWxWaWRlby5zcmMgPSBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50UXVhbGl0eV0uZmlsZTtcclxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBjYWxsIGxvYWQgaWYgc3JjIHdhcyBub3Qgc2V0LiBsb2FkKCkgd2lsbCBjYW5jZWwgYW55IGFjdGl2ZSBwbGF5IHByb21pc2UuXHJcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYobGFzdFBsYXlQb3NpdGlvbiA9PT0gMCAmJiBlbFZpZGVvLmN1cnJlbnRUaW1lID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxTLCB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogc3BlYy5jdXJyZW50UXVhbGl0eVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHBvc3RlckltYWdlKXtcclxuICAgICAgICAgICAgICAgIGVsVmlkZW8ucG9zdGVyID0gcG9zdGVySW1hZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5uYW1lO1xyXG4gICAgfTtcclxuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5jYW5TZWVrO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XHJcbiAgICAgICAgc3BlYy5jYW5TZWVrID0gY2FuU2VlaztcclxuICAgIH07XHJcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc2Vla2luZztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcclxuICAgICAgICBzcGVjLnNlZWtpbmcgPSBzZWVraW5nO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5zdGF0ZSAhPT0gbmV3U3RhdGUpe1xyXG4gICAgICAgICAgICBsZXQgcHJldlN0YXRlID0gc3BlYy5zdGF0ZTtcclxuICAgICAgICAgICAgc3dpdGNoKG5ld1N0YXRlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQ09NUExFVEUgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QQVVTRUQgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzcGVjLnN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BMQVlJTkcgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHNwZWMuc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzcGVjLnN0YXRlID0gbmV3U3RhdGU7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcclxuICAgICAgICAgICAgICAgIHByZXZzdGF0ZSA6IHByZXZTdGF0ZSxcclxuICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBzcGVjLnN0YXRlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XHJcbiAgICAgICAgc3BlYy5idWZmZXIgPSBuZXdCdWZmZXI7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuYnVmZmVyO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGlzTGl2ZSA9IChlbFZpZGVvLmR1cmF0aW9uID09PSBJbmZpbml0eSkgPyB0cnVlIDogc2VwYXJhdGVMaXZlKHNwZWMuZXh0ZW5kZWRFbGVtZW50KTtcclxuICAgICAgICByZXR1cm4gaXNMaXZlID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbjtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsVmlkZW8udm9sdW1lID0gdm9sdW1lLzEwMDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLnZvbHVtZSoxMDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSAhZWxWaWRlby5tdXRlZDtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcclxuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gc3RhdGU7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XHJcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcclxuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xyXG4gICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBwaWNrQ3VycmVudFF1YWxpdHlJbmRleChzb3VyY2VzLCBzcGVjLmN1cnJlbnRRdWFsaXR5LCBwbGF5ZXJDb25maWcpO1xyXG4gICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXMpID0+e1xyXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XHJcbiAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IHBpY2tDdXJyZW50UXVhbGl0eUluZGV4KHNvdXJjZXMsIHNwZWMuY3VycmVudFF1YWxpdHksIHBsYXllckNvbmZpZyk7XHJcbiAgICAgICAgX2xvYWQoc3BlYy5zb3VyY2VzLnN0YXJ0dGltZSB8fCAwKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBsZXQgcHJvbWlzZSA9IGVsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICBpZiAocHJvbWlzZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oXyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQXV0b3BsYXkgc3RhcnRlZCFcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL0Nhbid0IHBsYXkgYmVjYXVzZSBVc2VyIGRvZXNuJ3QgYW55IGludGVyYWN0aW9ucy5cclxuICAgICAgICAgICAgICAgICAgICAvL1dhaXQgZm9yIFVzZXIgSW50ZXJhY3Rpb25zLiAobGlrZSBjbGljaylcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoYXQucGF1c2UgPSAoKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbFZpZGVvLmN1cnJlbnRUaW1lID0gcG9zaXRpb247XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcclxuICAgICAgICBpZighZWxWaWRlbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwge3BsYXliYWNrUmF0ZSA6IHBsYXliYWNrUmF0ZX0pO1xyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFlbFZpZGVvKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBxdWFsaXR5TGV2ZWxzID0gc3BlYy5zb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcclxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICBtZXRhUXVhbGl0eSA6IHNvdXJjZS5tZXRhUXVhbGl0eVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBxdWFsaXR5TGV2ZWxzO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNvdXJjZSA9IHNwZWMuc291cmNlc1tzcGVjLmN1cnJlbnRRdWFsaXR5XTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcclxuICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXHJcbiAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXHJcbiAgICAgICAgICAgIGluZGV4IDogc3BlYy5jdXJyZW50UXVhbGl0eVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgsIG5lZWRQcm92aWRlckNoYW5nZSkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMuY3VycmVudFF1YWxpdHkgPT09IHF1YWxpdHlJbmRleCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHF1YWxpdHlJbmRleCA+IC0xKXtcclxuICAgICAgICAgICAgaWYoc3BlYy5zb3VyY2VzICYmIHNwZWMuc291cmNlcy5sZW5ndGggPiBxdWFsaXR5SW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHF1YWxpdHlJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gcXVhbGl0eUluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMX0NIQU5HRUQsIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogcXVhbGl0eUluZGV4XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0UXVhbGl0eUxhYmVsKHNwZWMuc291cmNlc1txdWFsaXR5SW5kZXhdLmxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsVmlkZW8uY3VycmVudFRpbWUgfHwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xyXG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdwcmVsb2FkJyk7XHJcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xyXG4gICAgICAgIHdoaWxlIChlbFZpZGVvLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVDaGlsZChlbFZpZGVvLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWVsVmlkZW8pe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQuc3RvcCgpO1xyXG4gICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAvL2VsVmlkZW8ucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhhdC5vZmYoKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZGVzdHJveSgpIHBsYXllciBzdG9wLCBsaXN0ZW5lciwgZXZlbnQgZGVzdHJvaWVkXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cclxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcclxuICAgIHRoYXQuc3VwZXIgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xyXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTIuLlxuICovXG5pbXBvcnQge0VSUk9SLCBTVEFURV9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RWaWRlb0VsZW1lbnQgPSBmdW5jdGlvbihleHRlbmRlZEVsZW1lbnQpIHtcbiAgICBpZihfLmlzRWxlbWVudChleHRlbmRlZEVsZW1lbnQpKXtcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudDtcbiAgICB9XG4gICAgaWYoZXh0ZW5kZWRFbGVtZW50LmdldFZpZGVvRWxlbWVudCl7XG4gICAgICAgIHJldHVybiBleHRlbmRlZEVsZW1lbnQuZ2V0VmlkZW9FbGVtZW50KCk7XG4gICAgfWVsc2UgaWYoZXh0ZW5kZWRFbGVtZW50Lm1lZGlhKXtcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5tZWRpYTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VwYXJhdGVMaXZlID0gZnVuY3Rpb24oZXh0ZW5kZWRFbGVtZW50KSB7XG4gICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXG5cbiAgICBpZihleHRlbmRlZEVsZW1lbnQuaXNEeW5hbWljKXtcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5pc0R5bmFtaWMoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBlcnJvclRyaWdnZXIgPSBmdW5jdGlvbihlcnJvciwgcHJvdmlkZXIpe1xuICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcbiAgICBwcm92aWRlci5wYXVzZSgpO1xuICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yICk7XG59O1xuXG5leHBvcnQgY29uc3QgcGlja0N1cnJlbnRRdWFsaXR5SW5kZXggPSAoc291cmNlcywgY3VycmVudFF1YWxpdHlJbmRleCwgcGxheWVyQ29uZmlnKSA9PiB7XG4gICAgbGV0IHF1YWxpdHkgPSBNYXRoLm1heCgwLCBjdXJyZW50UXVhbGl0eUluZGV4KTtcbiAgICBjb25zdCBsYWJlbCA9XCJcIjtcbiAgICBpZiAoc291cmNlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICBxdWFsaXR5ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBxdWFsaXR5O1xufTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXG4gKi9cblxuXG5leHBvcnQgY29uc3QgZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCl7XG4gICAgaWYoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk9wZXJhXCIpIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignT1BSJykpICE9IC0xICl7XG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKSAhPSAtMSApe1xuICAgICAgICByZXR1cm4gJ2Nocm9tZSc7XG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpICE9IC0xKXtcbiAgICAgICAgcmV0dXJuICdzYWZhcmknO1xuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIikgIT0gLTEgKXtcbiAgICAgICAgcmV0dXJuICdmaXJlZm94JztcbiAgICB9ZWxzZSBpZigobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKSAhPSAtMSApKXtcbiAgICAgICAgbGV0IG1zaWUgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpO1xuICAgICAgICAvKmlmKCEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09IHRydWUgKXtcbiAgICAgICAgICAgIHJldHVybiAnaWUnO1xuICAgICAgICB9ZWxzZSBpZighIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1RyaWRlbnQuKnJ2XFw6MTFcXC4vKSl7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llICsgNSwgdWEuaW5kZXhPZihcIi5cIiwgbXNpZSkpKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICAgICAgfSovXG4gICAgICAgIHZhciBpZSA9IChmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB2YXIgdW5kZWYsXG4gICAgICAgICAgICAgICAgdiA9IDMsXG4gICAgICAgICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICAgICAgYWxsID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJyk7XG5cbiAgICAgICAgICAgIHdoaWxlIChcbiAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgZ3QgSUUgJyArICgrK3YpICsgJ10+PGk+PC9pPjwhW2VuZGlmXS0tPicsXG4gICAgICAgICAgICAgICAgICAgIGFsbFswXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiB2ID4gNCA/IHYgOiB1bmRlZjtcblxuICAgICAgICB9KCkpO1xuICAgICAgICBpZihpZSA8IDkpe1xuICAgICAgICAgICAgcmV0dXJuICdvbGRJRSc7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuICdtb2Rlcm5JRSc7XG4gICAgICAgIH1cblxuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgIH1cblxufTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==