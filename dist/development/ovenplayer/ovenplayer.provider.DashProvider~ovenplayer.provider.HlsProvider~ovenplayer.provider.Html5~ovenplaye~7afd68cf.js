/*! OvenPlayerv0.7.6 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

/**
 * @brief   Trigger on various video events.
 * @param   providerName child Provider Name
 * @param   extendedElement extended media object by mse.
 * @param   element elVideo  video
 * @param   Provider provider  html5Provider
 * */

var Listener = function Listener(providerName, extendedElement, elVideo, provider) {
    var lowLevelEvents = {};

    OvenPlayerConsole.log("EventListener loaded.");
    var that = {};
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
        //ToDo : You consider hlsjs. But not now because we don't support hlsjs.
        var isLive = elVideo.duration == Infinity ? true : providerName === _constants.PROVIDER_DASH ? extendedElement.isDynamic() : false;
        var type = provider.getCurrentQuality() ? provider.getCurrentQuality().type : "";
        var metadata = {
            duration: isLive ? Infinity : elVideo.duration,
            type: type
        };
        //provider.setLive(isLive);

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
        OvenPlayerConsole.log("EventListener : on timeupdate", {
            position: position,
            duration: duration
        });
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

var _underscore = __webpack_require__(/*! utils/underscore.js */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hoho on 2018. 6. 27..
 */
var extractVideoElement = function extractVideoElement(providerName, extendedElement) {
    if (_underscore2["default"].isElement(extendedElement)) {
        return extendedElement;
    }
    if (providerName === _constants.PROVIDER_DASH) {
        return extendedElement.getVideoElement();
    } else if (providerName === _constants.PROVIDER_HLS) {
        return extendedElement.media;
    }
    return null;
};

/**
 * @brief   Core For Html5 Video.
 * @param   providerName provider name
 * @param   extendedElement extended media object by mse. or video element.
 * @param   playerConfig  player config
 * @param   onLoad on load handler
 * */
var Provider = function Provider(providerName, extendedElement, playerConfig, onBeforeLoad) {
    OvenPlayerConsole.log("CORE loaded. ");

    var that = {};
    (0, _EventEmitter2["default"])(that);

    var elVideo = extractVideoElement(providerName, extendedElement);
    var listener = (0, _Listener2["default"])(providerName, extendedElement, elVideo, that);
    var canSeek = false;
    var seeking = false;
    var state = _constants.STATE_IDLE;
    var buffer = 0;
    var currentQuality = -1;
    var sources = [];
    //let isLive = false;

    var posterImage = playerConfig.getConfig().image || "";
    elVideo.playbackRate = elVideo.defaultPlaybackRate = playerConfig.getDefaultPlaybackRate();

    var pickCurrentQuality = function pickCurrentQuality(sources) {
        var quality = Math.max(0, currentQuality);
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

    var _load = function _load(lastPlayPosition) {
        var source = sources[currentQuality];
        if (onBeforeLoad) {
            onBeforeLoad(source, lastPlayPosition);
        } else {
            OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : " + lastPlayPosition);
            var previousSource = elVideo.src;
            var sourceElement = document.createElement('source');

            sourceElement.src = source.file;
            var sourceChanged = sourceElement.src !== previousSource;
            if (sourceChanged) {
                elVideo.src = sources[currentQuality].file;
                // Do not call load if src was not set. load() will cancel any active play promise.
                if (previousSource) {
                    elVideo.load();
                }
            } else if (lastPlayPosition == 0 && elVideo.currentTime > 0) {
                that.seek(lastPlayPosition);
            }
            if (lastPlayPosition > 0) {
                that.seek(lastPlayPosition);
                that.play();
            }
            that.trigger(_constants.CONTENT_LEVELS, {
                currentQuality: currentQuality
            });

            if (posterImage) {
                elVideo.poster = posterImage;
            }
        }
    };

    that.getName = function () {
        return providerName;
    };
    that.canSeek = function () {
        return canSeek;
    };
    that.setCanSeek = function (canSeek_) {
        canSeek = canSeek_;
    };
    that.isSeeking = function () {
        return seeking;
    };
    that.setSeeking = function (seeking_) {
        seeking = seeking_;
    };

    that.setState = function (newState) {
        if (state != newState) {
            var prevState = state;
            switch (newState) {
                case _constants.STATE_COMPLETE:
                    that.trigger(_constants.PLAYER_COMPLETE);
                    break;
                case _constants.STATE_PAUSED:
                    that.trigger(_constants.PLAYER_PAUSE, {
                        prevState: state
                    });
                    break;
                case _constants.STATE_PLAYING:
                    that.trigger(_constants.PLAYER_PLAY, {
                        prevState: state
                    });
                    break;
            }
            state = newState;
            that.trigger(_constants.PLAYER_STATE, {
                prevstate: prevState,
                newstate: state
            });
        }
    };
    that.getState = function () {
        return state;
    };
    that.setBuffer = function (newBuffer) {
        buffer = newBuffer;
    };
    that.getBuffer = function () {
        return buffer;
    };
    that.getDuration = function () {
        //ToDo : You consider hlsjs. But not now because we don't support hlsjs.
        var isLive = elVideo.duration == Infinity ? true : providerName === _constants.PROVIDER_DASH ? extendedElement.isDynamic() : false;
        return isLive ? Infinity : elVideo.duration;
    };
    that.getPosition = function () {
        return elVideo.currentTime;
    };
    that.setVolume = function (volume) {
        elVideo.volume = volume / 100;
    };
    that.getVolume = function () {
        return elVideo.volume * 100;
    };
    that.setMute = function (state) {

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
        return elVideo.muted;
    };

    that.preload = function (sources_, lastPlayPosition) {
        sources = sources_;
        currentQuality = pickCurrentQuality(sources);
        _load(lastPlayPosition || 0);

        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    that.load = function (sources_) {
        sources = sources_;
        currentQuality = pickCurrentQuality(sources);
        _load(sources_.starttime || 0);
    };

    that.play = function () {
        if (that.getState() !== _constants.STATE_PLAYING) {
            elVideo.play();
        }
    };
    that.pause = function () {
        if (that.getState() == _constants.STATE_PLAYING) {
            elVideo.pause();
        }
    };
    that.seek = function (position) {
        elVideo.currentTime = position;
    };
    that.setPlaybackRate = function (playbackRate) {
        that.trigger(_constants.PLAYBACK_RATE_CHANGED, { playbackRate: playbackRate });
        return elVideo.playbackRate = elVideo.defaultPlaybackRate = playbackRate;
    };
    that.getPlaybackRate = function () {
        return elVideo.playbackRate;
    };
    that.getQualityLevels = function () {
        var qualityLevels = sources.map(function (source, index) {
            return {
                file: source.file,
                type: source.type,
                label: source.label,
                index: index
            };
        });
        return qualityLevels;
    };
    that.getCurrentQuality = function () {
        var source = sources[currentQuality];
        return {
            file: source.file,
            type: source.type,
            label: source.label,
            index: currentQuality
        };
    };
    that.setCurrentQuality = function (qualityIndex, needProviderChange) {
        if (currentQuality == qualityIndex) {
            return false;
        }

        if (qualityIndex > -1) {
            if (sources && sources.length > qualityIndex) {
                //that.pause();
                that.setState(_constants.STATE_IDLE);
                OvenPlayerConsole.log("source changed : " + qualityIndex);
                currentQuality = qualityIndex;

                that.trigger(_constants.CONTENT_LEVEL_CHANGED, {
                    currentQuality: qualityIndex
                });

                playerConfig.setQualityLabel(sources[qualityIndex].label);
                if (needProviderChange) {

                    _load(elVideo.currentTime || 0);
                }
                return currentQuality;
            }
        }
    };

    that.stop = function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9tZWRpYS9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYnJvd3Nlci5qcyJdLCJuYW1lcyI6WyJNYW5hZ2VyIiwiY29udGFpbmVyIiwicHJvdmlkZXJUeXBlIiwidGhhdCIsInJvb3RJZCIsImdldEF0dHJpYnV0ZSIsIm1lZGlhRWxlbWVudCIsImJyb3dzZXJUeXBlIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJjcmVhdGVNZWRpYUVsZW1lbnQiLCJQUk9WSURFUl9SVE1QIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJtb3ZpZSIsImZsYXNodmFycyIsImFsbG93c2NyaXB0YWNjZXNzIiwiYWxsb3dmdWxsc2NyZWVuIiwicXVhbGl0eSIsIm5hbWUiLCJtZW51IiwicXVhbCIsImJnY29sb3IiLCJTV0ZwYXRoIiwiY3JlYXRlIiwiZGVzdHJveSIsInJlbW92ZUNoaWxkIiwiTGlzdGVuZXIiLCJwcm92aWRlck5hbWUiLCJleHRlbmRlZEVsZW1lbnQiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJsb3dMZXZlbEV2ZW50cyIsImJldHdlZW4iLCJudW0iLCJtaW4iLCJtYXgiLCJNYXRoIiwib25FcnJvciIsImVycm9yIiwic2V0U3RhdGUiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwidHJpZ2dlciIsIkVSUk9SIiwiY2FucGxheSIsInNldENhblNlZWsiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJDT05URU5UX0NPTVBMRVRFIiwibG9hZGVkZGF0YSIsImxvYWRlZG1ldGFkYXRhIiwiaXNMaXZlIiwiZHVyYXRpb24iLCJJbmZpbml0eSIsIlBST1ZJREVSX0RBU0giLCJpc0R5bmFtaWMiLCJ0eXBlIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJtZXRhZGF0YSIsIkNPTlRFTlRfTUVUQSIsImN1cnJlbnRUaW1lIiwiU1RBVEVfUEFVU0VEIiwicGxheSIsInBhdXNlZCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9MT0FESU5HIiwicGxheWluZyIsInRpbWVSYW5nZXMiLCJidWZmZXJlZCIsInBvc2l0aW9uIiwibGVuZ3RoIiwiZW5kIiwic2V0QnVmZmVyIiwiQ09OVEVOVF9CVUZGRVIiLCJidWZmZXJQZXJjZW50Iiwic3RhbGxlZCIsInRpbWV1cGRhdGUiLCJpc05hTiIsImlzU2Vla2luZyIsIkNPTlRFTlRfVElNRSIsInJlc2l6ZSIsInNlZWtpbmciLCJzZXRTZWVraW5nIiwiQ09OVEVOVF9TRUVLIiwic2Vla2VkIiwiQ09OVEVOVF9TRUVLRUQiLCJ3YWl0aW5nIiwiU1RBVEVfU1RBTExFRCIsInZvbHVtZWNoYW5nZSIsInJvdW5kIiwidm9sdW1lIiwiQ09OVEVOVF9WT0xVTUUiLCJtdXRlIiwibXV0ZWQiLCJjb2RlIiwiZXJyb3JDb2RlR2VuIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZlbnROYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJfIiwiaXNFbGVtZW50IiwiZ2V0VmlkZW9FbGVtZW50IiwiUFJPVklERVJfSExTIiwibWVkaWEiLCJQcm92aWRlciIsInBsYXllckNvbmZpZyIsIm9uQmVmb3JlTG9hZCIsImxpc3RlbmVyIiwiY2FuU2VlayIsInN0YXRlIiwiYnVmZmVyIiwiY3VycmVudFF1YWxpdHkiLCJzb3VyY2VzIiwicG9zdGVySW1hZ2UiLCJnZXRDb25maWciLCJpbWFnZSIsInBsYXliYWNrUmF0ZSIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXREZWZhdWx0UGxheWJhY2tSYXRlIiwicGlja0N1cnJlbnRRdWFsaXR5IiwibGFiZWwiLCJpIiwiZ2V0UXVhbGl0eUxhYmVsIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwicHJldmlvdXNTb3VyY2UiLCJzcmMiLCJzb3VyY2VFbGVtZW50IiwiZmlsZSIsInNvdXJjZUNoYW5nZWQiLCJsb2FkIiwic2VlayIsIkNPTlRFTlRfTEVWRUxTIiwicG9zdGVyIiwiZ2V0TmFtZSIsImNhblNlZWtfIiwic2Vla2luZ18iLCJuZXdTdGF0ZSIsInByZXZTdGF0ZSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwibmV3c3RhdGUiLCJuZXdCdWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsImdldFBvc2l0aW9uIiwic2V0Vm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0TXV0ZSIsIkNPTlRFTlRfTVVURSIsImdldE11dGUiLCJwcmVsb2FkIiwic291cmNlc18iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN0YXJ0dGltZSIsInNldFBsYXliYWNrUmF0ZSIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsImdldFBsYXliYWNrUmF0ZSIsImdldFF1YWxpdHlMZXZlbHMiLCJxdWFsaXR5TGV2ZWxzIiwibWFwIiwiaW5kZXgiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsIm5lZWRQcm92aWRlckNoYW5nZSIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsInNldFF1YWxpdHlMYWJlbCIsInN0b3AiLCJyZW1vdmVBdHRyaWJ1dGUiLCJmaXJzdENoaWxkIiwib2ZmIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJnZXRCcm93c2VyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsIm1zaWUiLCJpZSIsInVuZGVmIiwidiIsImRpdiIsImFsbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0tBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxVQUFVLFNBQVZBLE9BQVUsQ0FBU0MsU0FBVCxFQUFvQkMsWUFBcEIsRUFBaUM7QUFDN0MsUUFBTUMsT0FBTyxFQUFiO0FBQ0EsUUFBSUMsU0FBU0gsVUFBVUksWUFBVixDQUF1QixnQkFBdkIsQ0FBYjtBQUNBLFFBQUlDLGVBQWUsRUFBbkI7QUFDQSxRQUFJQyxjQUFjLDBCQUFsQjs7QUFFQUMsc0JBQWtCQyxHQUFsQixDQUFzQix3Q0FBdUNGLFdBQTdEO0FBQ0EsUUFBTUcscUJBQXFCLFNBQXJCQSxrQkFBcUIsR0FBVTtBQUNqQyxZQUFHUixpQkFBaUJTLHdCQUFwQixFQUFrQztBQUM5QkwsMkJBQWVNLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZjtBQUNBUCx5QkFBYVEsWUFBYixDQUEwQix1QkFBMUIsRUFBbUQsRUFBbkQ7QUFDQVIseUJBQWFRLFlBQWIsQ0FBMEIsb0JBQTFCLEVBQWdELEVBQWhEO0FBQ0FSLHlCQUFhUSxZQUFiLENBQTBCLGFBQTFCLEVBQXlDLEVBQXpDO0FBQ0FiLHNCQUFVYyxXQUFWLENBQXNCVCxZQUF0QjtBQUVILFNBUEQsTUFPSztBQUNELGdCQUFJVSxjQUFKO0FBQUEsZ0JBQVdDLGtCQUFYO0FBQUEsZ0JBQXNCQywwQkFBdEI7QUFBQSxnQkFBeUNDLHdCQUF6QztBQUFBLGdCQUEwREMsZ0JBQTFEO0FBQUEsZ0JBQW1FQyxhQUFuRTtBQUFBLGdCQUF5RUMsYUFBekU7QUFBQSxnQkFBK0VDLGFBQS9FO0FBQUEsZ0JBQXFGQyxnQkFBckY7QUFDQVIsb0JBQVFKLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUjtBQUNBRyxrQkFBTUYsWUFBTixDQUFtQixNQUFuQixFQUEyQixPQUEzQjtBQUNBRSxrQkFBTUYsWUFBTixDQUFtQixPQUFuQixFQUE0QlcsNEJBQTVCOztBQUVBUix3QkFBWUwsU0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFaO0FBQ0FJLHNCQUFVSCxZQUFWLENBQXVCLE1BQXZCLEVBQStCLFdBQS9CO0FBQ0E7QUFDQUcsc0JBQVVILFlBQVYsQ0FBdUIsT0FBdkIsRUFBZ0MsY0FBWVYsTUFBNUM7O0FBRUFjLGdDQUFvQk4sU0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFwQjtBQUNBSyw4QkFBa0JKLFlBQWxCLENBQStCLE1BQS9CLEVBQXVDLG1CQUF2QztBQUNBSSw4QkFBa0JKLFlBQWxCLENBQStCLE9BQS9CLEVBQXdDLFFBQXhDOztBQUVBSyw4QkFBa0JQLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBbEI7QUFDQU0sNEJBQWdCTCxZQUFoQixDQUE2QixNQUE3QixFQUFxQyxpQkFBckM7QUFDQUssNEJBQWdCTCxZQUFoQixDQUE2QixPQUE3QixFQUFzQyxNQUF0Qzs7QUFFQU0sc0JBQVVSLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBVjtBQUNBTyxvQkFBUU4sWUFBUixDQUFxQixNQUFyQixFQUE2QixTQUE3QjtBQUNBTSxvQkFBUU4sWUFBUixDQUFxQixPQUFyQixFQUE4QixRQUE5Qjs7QUFFQU8sbUJBQU9ULFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUDtBQUNBUSxpQkFBS1AsWUFBTCxDQUFrQixNQUFsQixFQUEwQixNQUExQjtBQUNBTyxpQkFBS1AsWUFBTCxDQUFrQixPQUFsQixFQUEyQlYsU0FBTyxRQUFsQzs7QUFFQWtCLG1CQUFPVixTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQVA7QUFDQVMsaUJBQUtSLFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsTUFBMUI7QUFDQVEsaUJBQUtSLFlBQUwsQ0FBa0IsT0FBbEIsRUFBMkIsT0FBM0I7O0FBRUFTLG1CQUFPWCxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQVA7QUFDQVUsaUJBQUtULFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsU0FBMUI7QUFDQVMsaUJBQUtULFlBQUwsQ0FBa0IsT0FBbEIsRUFBMkIsTUFBM0I7O0FBRUFVLHNCQUFVWixTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQVY7QUFDQVcsb0JBQVFWLFlBQVIsQ0FBcUIsTUFBckIsRUFBNkIsU0FBN0I7QUFDQVUsb0JBQVFWLFlBQVIsQ0FBcUIsT0FBckIsRUFBOEIsU0FBOUI7O0FBRUFSLDJCQUFlTSxTQUFTQyxhQUFULENBQXVCLFFBQXZCLENBQWY7QUFDQVAseUJBQWFRLFlBQWIsQ0FBMEIsSUFBMUIsRUFBZ0NWLFNBQU8sUUFBdkM7QUFDQUUseUJBQWFRLFlBQWIsQ0FBMEIsTUFBMUIsRUFBa0NWLFNBQU8sUUFBekM7QUFDQUUseUJBQWFRLFlBQWIsQ0FBMEIsT0FBMUIsRUFBbUMsTUFBbkM7QUFDQVIseUJBQWFRLFlBQWIsQ0FBMEIsUUFBMUIsRUFBb0MsTUFBcEM7O0FBRUEsZ0JBQUdQLGdCQUFnQixPQUFuQixFQUEyQjtBQUN2QkQsNkJBQWFRLFlBQWIsQ0FBMEIsTUFBMUIsRUFBa0NXLDRCQUFsQztBQUNBbkIsNkJBQWFRLFlBQWIsQ0FBMEIsTUFBMUIsRUFBa0MsK0JBQWxDO0FBQ0gsYUFIRCxNQUdLO0FBQ0RSLDZCQUFhUSxZQUFiLENBQTBCLFNBQTFCLEVBQXFDLDRDQUFyQzs7QUFFQVIsNkJBQWFTLFdBQWIsQ0FBeUJDLEtBQXpCO0FBQ0g7QUFDRFYseUJBQWFTLFdBQWIsQ0FBeUJTLE9BQXpCO0FBQ0FsQix5QkFBYVMsV0FBYixDQUF5QlEsSUFBekI7QUFDQWpCLHlCQUFhUyxXQUFiLENBQXlCSSxlQUF6QjtBQUNBYix5QkFBYVMsV0FBYixDQUF5QkcsaUJBQXpCO0FBQ0FaLHlCQUFhUyxXQUFiLENBQXlCRSxTQUF6Qjs7QUFFQWhCLHNCQUFVYyxXQUFWLENBQXNCVCxZQUF0QjtBQUNIO0FBQ0QsZUFBT0EsWUFBUDtBQUNILEtBdEVEOztBQXdFQUgsU0FBS3VCLE1BQUwsR0FBYyxZQUFLO0FBQ2ZsQiwwQkFBa0JDLEdBQWxCLENBQXNCLDhCQUF0QjtBQUNBLFlBQUdILFlBQUgsRUFBZ0I7QUFDWkgsaUJBQUt3QixPQUFMO0FBQ0g7QUFDRCxlQUFPakIsb0JBQVA7QUFDSCxLQU5EOztBQVFBUCxTQUFLd0IsT0FBTCxHQUFlLFlBQUs7QUFDaEJuQiwwQkFBa0JDLEdBQWxCLENBQXNCLDhCQUF0QjtBQUNBUixrQkFBVTJCLFdBQVYsQ0FBc0J0QixZQUF0QjtBQUNBQSx1QkFBZSxJQUFmO0FBQ0gsS0FKRDs7QUFNQSxXQUFPSCxJQUFQO0FBQ0gsQ0E5RkQsQyxDQVRBOzs7OztxQkF5R2VILE87Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pHZjs7QUE2QkE7Ozs7Ozs7O0FBUUEsSUFBTTZCLFdBQVcsU0FBWEEsUUFBVyxDQUFTQyxZQUFULEVBQXVCQyxlQUF2QixFQUF3Q0MsT0FBeEMsRUFBaURDLFFBQWpELEVBQTBEO0FBQ3ZFLFFBQU1DLGlCQUFpQixFQUF2Qjs7QUFFQTFCLHNCQUFrQkMsR0FBbEIsQ0FBc0IsdUJBQXRCO0FBQ0EsUUFBTU4sT0FBTyxFQUFiO0FBQ0EsUUFBTWdDLFVBQVUsU0FBVkEsT0FBVSxDQUFVQyxHQUFWLEVBQWVDLEdBQWYsRUFBb0JDLEdBQXBCLEVBQXlCO0FBQ3JDLGVBQU9DLEtBQUtELEdBQUwsQ0FBU0MsS0FBS0YsR0FBTCxDQUFTRCxHQUFULEVBQWNFLEdBQWQsQ0FBVCxFQUE2QkQsR0FBN0IsQ0FBUDtBQUNILEtBRkQ7QUFHQSxRQUFNRyxVQUFVLFNBQVZBLE9BQVUsQ0FBU0MsS0FBVCxFQUFlO0FBQzNCUixpQkFBU1MsUUFBVCxDQUFrQkMsc0JBQWxCO0FBQ0FWLGlCQUFTVyxLQUFUOztBQUVBO0FBQ0FYLGlCQUFTWSxPQUFULENBQWlCQyxnQkFBakIsRUFBd0JMLEtBQXhCO0FBQ0gsS0FORDs7QUFRQTtBQUNBUCxtQkFBZWEsT0FBZixHQUF5QixZQUFNO0FBQzNCZCxpQkFBU2UsVUFBVCxDQUFvQixJQUFwQjtBQUNBZixpQkFBU1ksT0FBVCxDQUFpQkksOEJBQWpCO0FBQ0F6QywwQkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QjtBQUNILEtBSkQ7QUFLQTtBQUNBeUIsbUJBQWVnQixjQUFmLEdBQWdDLFlBQU07QUFDbENoQix1QkFBZWlCLFFBQWY7QUFDQTNDLDBCQUFrQkMsR0FBbEIsQ0FBc0IsbUNBQXRCO0FBQ0gsS0FIRDtBQUlBO0FBQ0F5QixtQkFBZWtCLEtBQWYsR0FBdUIsWUFBTTtBQUN6QjVDLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMEJBQXRCO0FBQ0EsWUFBR3dCLFNBQVNvQixRQUFULE1BQXVCQyxxQkFBdkIsSUFBcUNyQixTQUFTb0IsUUFBVCxNQUF1QkUseUJBQS9ELEVBQThFO0FBQzFFdEIscUJBQVNZLE9BQVQsQ0FBaUJXLDJCQUFqQjtBQUNBdkIscUJBQVNTLFFBQVQsQ0FBa0JhLHlCQUFsQjtBQUNIO0FBQ0osS0FORDtBQU9BO0FBQ0FyQixtQkFBZXVCLFVBQWYsR0FBNEIsWUFBTTtBQUM5QjtBQUNBOzs7Ozs7O0FBT0FqRCwwQkFBa0JDLEdBQWxCLENBQXNCLCtCQUF0QjtBQUNILEtBVkQ7QUFXQTtBQUNBeUIsbUJBQWV3QixjQUFmLEdBQWdDLFlBQU07QUFDbEM7QUFDQSxZQUFJQyxTQUFVM0IsUUFBUTRCLFFBQVIsSUFBb0JDLFFBQXBCLEdBQThCLElBQTlCLEdBQXNDL0IsaUJBQWlCZ0Msd0JBQWpCLEdBQWdDL0IsZ0JBQWdCZ0MsU0FBaEIsRUFBaEMsR0FBOEQsS0FBbEg7QUFDQSxZQUFJQyxPQUFPL0IsU0FBU2dDLGlCQUFULEtBQStCaEMsU0FBU2dDLGlCQUFULEdBQTZCRCxJQUE1RCxHQUFtRSxFQUE5RTtBQUNBLFlBQUlFLFdBQVc7QUFDWE4sc0JBQVVELFNBQVVFLFFBQVYsR0FBcUI3QixRQUFRNEIsUUFENUI7QUFFWEksa0JBQU1BO0FBRkssU0FBZjtBQUlBOztBQUVBeEQsMEJBQWtCQyxHQUFsQixDQUFzQixtQ0FBdEIsRUFBMkR5RCxRQUEzRDtBQUNBakMsaUJBQVNZLE9BQVQsQ0FBaUJzQix1QkFBakIsRUFBK0JELFFBQS9CO0FBQ0gsS0FaRDtBQWFBO0FBQ0FoQyxtQkFBZVUsS0FBZixHQUF1QixZQUFNO0FBQ3pCLFlBQUdYLFNBQVNvQixRQUFULE9BQXdCRSx5QkFBeEIsSUFBeUN0QixTQUFTb0IsUUFBVCxPQUF3QlYsc0JBQXBFLEVBQWdGO0FBQzVFLG1CQUFPLEtBQVA7QUFDSDtBQUNELFlBQUdYLFFBQVFvQixLQUFYLEVBQWlCO0FBQ2IsbUJBQU8sS0FBUDtBQUNIO0FBQ0QsWUFBR3BCLFFBQVFTLEtBQVgsRUFBaUI7QUFDYixtQkFBTyxLQUFQO0FBQ0g7QUFDRCxZQUFHVCxRQUFRb0MsV0FBUixLQUF3QnBDLFFBQVE0QixRQUFuQyxFQUE0QztBQUN4QyxtQkFBTyxLQUFQO0FBQ0g7QUFDRHBELDBCQUFrQkMsR0FBbEIsQ0FBc0IsMEJBQXRCO0FBQ0F3QixpQkFBU1MsUUFBVCxDQUFrQjJCLHVCQUFsQjtBQUNILEtBZkQ7QUFnQkE7QUFDQW5DLG1CQUFlb0MsSUFBZixHQUFzQixZQUFNO0FBQ3hCLFlBQUksQ0FBQ3RDLFFBQVF1QyxNQUFULElBQW1CdEMsU0FBU29CLFFBQVQsT0FBd0JtQix3QkFBL0MsRUFBOEQ7QUFDMURoRSw4QkFBa0JDLEdBQWxCLENBQXNCLHlCQUF0QjtBQUNBd0IscUJBQVNTLFFBQVQsQ0FBa0IrQix3QkFBbEI7QUFDSDtBQUVKLEtBTkQ7QUFPQTtBQUNBdkMsbUJBQWV3QyxPQUFmLEdBQXlCLFlBQU07QUFDM0JsRSwwQkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QjtBQUNBd0IsaUJBQVNTLFFBQVQsQ0FBa0I4Qix3QkFBbEI7QUFDQTtBQUNILEtBSkQ7QUFLQTtBQUNBdEMsbUJBQWVpQixRQUFmLEdBQTBCLFlBQU07QUFDNUIsWUFBSXdCLGFBQWEzQyxRQUFRNEMsUUFBekI7QUFDQSxZQUFHLENBQUNELFVBQUosRUFBZ0I7QUFDWixtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsWUFBSWYsV0FBVzVCLFFBQVE0QixRQUF2QjtBQUFBLFlBQWlDaUIsV0FBVzdDLFFBQVFvQyxXQUFwRDtBQUNBLFlBQUlRLFdBQVd6QyxRQUFTLENBQUN3QyxXQUFXRyxNQUFYLEdBQW1CLENBQW5CLEdBQXVCSCxXQUFXSSxHQUFYLENBQWVKLFdBQVdHLE1BQVgsR0FBb0IsQ0FBbkMsQ0FBdkIsR0FBK0QsQ0FBaEUsSUFBc0VsQixRQUEvRSxFQUF5RixDQUF6RixFQUE0RixDQUE1RixDQUFmOztBQUVBcEQsMEJBQWtCQyxHQUFsQixDQUFzQiw2QkFBdEIsRUFBcURtRSxXQUFTLEdBQTlEOztBQUVBM0MsaUJBQVMrQyxTQUFULENBQW1CSixXQUFTLEdBQTVCO0FBQ0EzQyxpQkFBU1ksT0FBVCxDQUFpQm9DLHlCQUFqQixFQUFpQztBQUM3QkMsMkJBQWVOLFdBQVMsR0FESztBQUU3QkMsc0JBQVdBLFFBRmtCO0FBRzdCakIsc0JBQVVBO0FBSG1CLFNBQWpDO0FBS0gsS0FqQkQ7QUFrQkE7QUFDQTFCLG1CQUFlaUQsT0FBZixHQUF5QixZQUFNO0FBQzNCM0UsMEJBQWtCQyxHQUFsQixDQUFzQiwwQkFBdEI7QUFDSCxLQUZEO0FBR0E7QUFDQXlCLG1CQUFla0QsVUFBZixHQUE0QixZQUFNO0FBQzlCLFlBQU1QLFdBQVc3QyxRQUFRb0MsV0FBekI7QUFDQSxZQUFNUixXQUFXNUIsUUFBUTRCLFFBQXpCO0FBQ0EsWUFBSXlCLE1BQU16QixRQUFOLENBQUosRUFBcUI7QUFDakI7QUFDSDs7QUFFRCxZQUFHLENBQUMzQixTQUFTcUQsU0FBVCxFQUFELElBQXlCLENBQUN0RCxRQUFRdUMsTUFBckMsRUFBNEM7QUFDeEN0QyxxQkFBU1MsUUFBVCxDQUFrQjhCLHdCQUFsQjtBQUNIO0FBQ0RoRSwwQkFBa0JDLEdBQWxCLENBQXNCLCtCQUF0QixFQUF3RDtBQUNwRG9FLHNCQUFVQSxRQUQwQztBQUVwRGpCLHNCQUFVQTtBQUYwQyxTQUF4RDtBQUlBLFlBQUkzQixTQUFTb0IsUUFBVCxPQUF3Qm1CLHdCQUF4QixJQUF5Q3ZDLFNBQVNxRCxTQUFULEVBQTdDLEVBQW1FO0FBQy9EckQscUJBQVNZLE9BQVQsQ0FBaUIwQyx1QkFBakIsRUFBK0I7QUFDM0JWLDBCQUFVQSxRQURpQjtBQUUzQmpCLDBCQUFVQTtBQUZpQixhQUEvQjtBQUlIO0FBRUosS0FyQkQ7QUFzQkExQixtQkFBZXNELE1BQWYsR0FBd0IsWUFBTTtBQUMxQmhGLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMkJBQXRCO0FBQ0gsS0FGRDtBQUdBeUIsbUJBQWV1RCxPQUFmLEdBQXlCLFlBQU07QUFDM0J4RCxpQkFBU3lELFVBQVQsQ0FBb0IsSUFBcEI7QUFDQWxGLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCLEVBQW9EdUIsUUFBUW9DLFdBQTVEO0FBQ0FuQyxpQkFBU1ksT0FBVCxDQUFpQjhDLHVCQUFqQixFQUE4QjtBQUMxQmQsc0JBQVc3QyxRQUFRb0M7QUFETyxTQUE5QjtBQUdILEtBTkQ7QUFPQWxDLG1CQUFlMEQsTUFBZixHQUF3QixZQUFNO0FBQzFCLFlBQUcsQ0FBQzNELFNBQVNxRCxTQUFULEVBQUosRUFBeUI7QUFDckI7QUFDSDtBQUNEOUUsMEJBQWtCQyxHQUFsQixDQUFzQiwyQkFBdEI7QUFDQXdCLGlCQUFTeUQsVUFBVCxDQUFvQixLQUFwQjtBQUNBekQsaUJBQVNZLE9BQVQsQ0FBaUJnRCx5QkFBakI7QUFDSCxLQVBEOztBQVNBO0FBQ0EzRCxtQkFBZTRELE9BQWYsR0FBeUIsWUFBTTtBQUMzQnRGLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCLEVBQW9Ed0IsU0FBU29CLFFBQVQsRUFBcEQ7QUFDQSxZQUFHcEIsU0FBU3FELFNBQVQsRUFBSCxFQUF3QjtBQUNwQnJELHFCQUFTUyxRQUFULENBQWtCK0Isd0JBQWxCO0FBQ0gsU0FGRCxNQUVNLElBQUd4QyxTQUFTb0IsUUFBVCxNQUF1Qm1CLHdCQUExQixFQUF3QztBQUMxQ3ZDLHFCQUFTUyxRQUFULENBQWtCcUQsd0JBQWxCO0FBQ0g7QUFDSixLQVBEOztBQVNBN0QsbUJBQWU4RCxZQUFmLEdBQThCLFlBQU07O0FBRWhDeEYsMEJBQWtCQyxHQUFsQixDQUFzQixpQ0FBdEIsRUFBeUQ4QixLQUFLMEQsS0FBTCxDQUFXakUsUUFBUWtFLE1BQVIsR0FBaUIsR0FBNUIsQ0FBekQ7QUFDQWpFLGlCQUFTWSxPQUFULENBQWlCc0QseUJBQWpCLEVBQWlDO0FBQzdCRCxvQkFBUTNELEtBQUswRCxLQUFMLENBQVdqRSxRQUFRa0UsTUFBUixHQUFpQixHQUE1QixDQURxQjtBQUU3QkUsa0JBQU1wRSxRQUFRcUU7QUFGZSxTQUFqQztBQUlILEtBUEQ7O0FBU0FuRSxtQkFBZU8sS0FBZixHQUF1QixZQUFNO0FBQ3pCLFlBQU02RCxPQUFRdEUsUUFBUVMsS0FBUixJQUFpQlQsUUFBUVMsS0FBUixDQUFjNkQsSUFBaEMsSUFBeUMsQ0FBdEQ7QUFDQSxZQUFNQyxlQUFnQjtBQUNsQixlQUFHLEVBQUNELE1BQU9FLCtCQUFSLEVBQThCQyxRQUFTLDJCQUF2QyxFQUFvRUMsU0FBVSwyQkFBOUUsRUFEZTtBQUVsQixlQUFHLEVBQUNKLE1BQU9LLHlDQUFSLEVBQXdDRixRQUFTLDJCQUFqRCxFQUE4RUMsU0FBVSwyQkFBeEYsRUFGZTtBQUdsQixlQUFHLEVBQUNKLE1BQU9NLHVDQUFSLEVBQXNDSCxRQUFTLHVCQUEvQyxFQUF3RUMsU0FBVSx1QkFBbEYsRUFIZTtBQUlsQixlQUFHLEVBQUNKLE1BQU9PLHNDQUFSLEVBQXFDSixRQUFTLHNCQUE5QyxFQUFzRUMsU0FBVSxzQkFBaEYsRUFKZTtBQUtsQixlQUFHLEVBQUNKLE1BQU9RLDRCQUFSLEVBQTJCTCxRQUFTLDBCQUFwQyxFQUFnRUMsU0FBVSwwQkFBMUU7QUFMZSxVQU1wQkosSUFOb0IsS0FNYixDQU5UO0FBT0FDLHFCQUFhOUQsS0FBYixHQUFxQlQsUUFBUVMsS0FBN0I7O0FBRUFqQywwQkFBa0JDLEdBQWxCLENBQXNCLDBCQUF0QixFQUFrRDhGLFlBQWxEO0FBQ0EvRCxnQkFBUStELFlBQVI7QUFDSCxLQWJEOztBQWlCQVEsV0FBT0MsSUFBUCxDQUFZOUUsY0FBWixFQUE0QitFLE9BQTVCLENBQW9DLHFCQUFhO0FBQzdDakYsZ0JBQVFrRixtQkFBUixDQUE0QkMsU0FBNUIsRUFBdUNqRixlQUFlaUYsU0FBZixDQUF2QztBQUNBbkYsZ0JBQVFvRixnQkFBUixDQUF5QkQsU0FBekIsRUFBb0NqRixlQUFlaUYsU0FBZixDQUFwQztBQUNILEtBSEQ7O0FBS0FoSCxTQUFLd0IsT0FBTCxHQUFlLFlBQUs7QUFDaEJuQiwwQkFBa0JDLEdBQWxCLENBQXNCLDJCQUF0Qjs7QUFFQXNHLGVBQU9DLElBQVAsQ0FBWTlFLGNBQVosRUFBNEIrRSxPQUE1QixDQUFvQyxxQkFBYTtBQUM3Q2pGLG9CQUFRa0YsbUJBQVIsQ0FBNEJDLFNBQTVCLEVBQXVDakYsZUFBZWlGLFNBQWYsQ0FBdkM7QUFDSCxTQUZEO0FBR0gsS0FORDtBQU9BLFdBQU9oSCxJQUFQO0FBQ0gsQ0E5TUQ7O3FCQWdOZTBCLFE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xQZjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQU5BOzs7QUFhQSxJQUFJd0Ysc0JBQXNCLFNBQXRCQSxtQkFBc0IsQ0FBU3ZGLFlBQVQsRUFBdUJDLGVBQXZCLEVBQXVDO0FBQzdELFFBQUd1Rix3QkFBRUMsU0FBRixDQUFZeEYsZUFBWixDQUFILEVBQWdDO0FBQzVCLGVBQU9BLGVBQVA7QUFDSDtBQUNELFFBQUdELGlCQUFpQmdDLHdCQUFwQixFQUFrQztBQUM5QixlQUFPL0IsZ0JBQWdCeUYsZUFBaEIsRUFBUDtBQUNILEtBRkQsTUFFTSxJQUFHMUYsaUJBQWlCMkYsdUJBQXBCLEVBQWlDO0FBQ25DLGVBQU8xRixnQkFBZ0IyRixLQUF2QjtBQUNIO0FBQ0QsV0FBTyxJQUFQO0FBQ0gsQ0FWRDs7QUFZQTs7Ozs7OztBQU9BLElBQU1DLFdBQVcsU0FBWEEsUUFBVyxDQUFVN0YsWUFBVixFQUF3QkMsZUFBeEIsRUFBeUM2RixZQUF6QyxFQUF1REMsWUFBdkQsRUFBb0U7QUFDakZySCxzQkFBa0JDLEdBQWxCLENBQXNCLGVBQXRCOztBQUVBLFFBQUlOLE9BQU0sRUFBVjtBQUNBLG1DQUFhQSxJQUFiOztBQUVBLFFBQUk2QixVQUFVcUYsb0JBQW9CdkYsWUFBcEIsRUFBa0NDLGVBQWxDLENBQWQ7QUFDQSxRQUFJK0YsV0FBVywyQkFBZWhHLFlBQWYsRUFBNkJDLGVBQTdCLEVBQThDQyxPQUE5QyxFQUF1RDdCLElBQXZELENBQWY7QUFDQSxRQUFJNEgsVUFBVSxLQUFkO0FBQ0EsUUFBSXRDLFVBQVUsS0FBZDtBQUNBLFFBQUl1QyxRQUFRMUUscUJBQVo7QUFDQSxRQUFJMkUsU0FBUyxDQUFiO0FBQ0EsUUFBSUMsaUJBQWlCLENBQUMsQ0FBdEI7QUFDQSxRQUFJQyxVQUFVLEVBQWQ7QUFDQTs7QUFFQSxRQUFJQyxjQUFjUixhQUFhUyxTQUFiLEdBQXlCQyxLQUF6QixJQUFnQyxFQUFsRDtBQUNBdEcsWUFBUXVHLFlBQVIsR0FBdUJ2RyxRQUFRd0csbUJBQVIsR0FBOEJaLGFBQWFhLHNCQUFiLEVBQXJEOztBQUVBLFFBQU1DLHFCQUFxQixTQUFyQkEsa0JBQXFCLENBQUNQLE9BQUQsRUFBWTtBQUNuQyxZQUFJL0csVUFBVW1CLEtBQUtELEdBQUwsQ0FBUyxDQUFULEVBQVk0RixjQUFaLENBQWQ7QUFDQSxZQUFNUyxRQUFPLEVBQWI7QUFDQSxZQUFJUixPQUFKLEVBQWE7QUFDVCxpQkFBSyxJQUFJUyxJQUFJLENBQWIsRUFBZ0JBLElBQUlULFFBQVFyRCxNQUE1QixFQUFvQzhELEdBQXBDLEVBQXlDO0FBQ3JDLG9CQUFJVCxRQUFRUyxDQUFSLFlBQUosRUFBd0I7QUFDcEJ4SCw4QkFBVXdILENBQVY7QUFDSDtBQUNELG9CQUFJaEIsYUFBYWlCLGVBQWIsTUFBa0NWLFFBQVFTLENBQVIsRUFBV0QsS0FBWCxLQUFxQmYsYUFBYWlCLGVBQWIsRUFBM0QsRUFBNEY7QUFDeEYsMkJBQU9ELENBQVA7QUFDSDtBQUNKO0FBQ0o7QUFDRCxlQUFPeEgsT0FBUDtBQUNILEtBZEQ7O0FBZ0JBLFFBQU0wSCxRQUFRLFNBQVJBLEtBQVEsQ0FBQ0MsZ0JBQUQsRUFBcUI7QUFDL0IsWUFBTUMsU0FBVWIsUUFBUUQsY0FBUixDQUFoQjtBQUNBLFlBQUdMLFlBQUgsRUFBZ0I7QUFDWkEseUJBQWFtQixNQUFiLEVBQXFCRCxnQkFBckI7QUFDSCxTQUZELE1BRUs7QUFDRHZJLDhCQUFrQkMsR0FBbEIsQ0FBc0Isa0JBQXRCLEVBQTBDdUksTUFBMUMsRUFBa0Qsd0JBQXVCRCxnQkFBekU7QUFDQSxnQkFBSUUsaUJBQWlCakgsUUFBUWtILEdBQTdCO0FBQ0EsZ0JBQU1DLGdCQUFnQnZJLFNBQVNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdEI7O0FBRUFzSSwwQkFBY0QsR0FBZCxHQUFvQkYsT0FBT0ksSUFBM0I7QUFDQSxnQkFBTUMsZ0JBQWlCRixjQUFjRCxHQUFkLEtBQXNCRCxjQUE3QztBQUNBLGdCQUFJSSxhQUFKLEVBQW1CO0FBQ2ZySCx3QkFBUWtILEdBQVIsR0FBY2YsUUFBUUQsY0FBUixFQUF3QmtCLElBQXRDO0FBQ0E7QUFDQSxvQkFBSUgsY0FBSixFQUFvQjtBQUNoQmpILDRCQUFRc0gsSUFBUjtBQUNIO0FBQ0osYUFORCxNQU1NLElBQUdQLG9CQUFvQixDQUFwQixJQUF5Qi9HLFFBQVFvQyxXQUFSLEdBQXNCLENBQWxELEVBQW9EO0FBQ3REakUscUJBQUtvSixJQUFMLENBQVVSLGdCQUFWO0FBQ0g7QUFDRCxnQkFBR0EsbUJBQW1CLENBQXRCLEVBQXdCO0FBQ3BCNUkscUJBQUtvSixJQUFMLENBQVVSLGdCQUFWO0FBQ0E1SSxxQkFBS21FLElBQUw7QUFDSDtBQUNEbkUsaUJBQUswQyxPQUFMLENBQWEyRyx5QkFBYixFQUE2QjtBQUN6QnRCLGdDQUFnQkE7QUFEUyxhQUE3Qjs7QUFJQSxnQkFBR0UsV0FBSCxFQUFlO0FBQ1hwRyx3QkFBUXlILE1BQVIsR0FBaUJyQixXQUFqQjtBQUNIO0FBQ0o7QUFDSixLQWhDRDs7QUFrQ0FqSSxTQUFLdUosT0FBTCxHQUFlLFlBQU07QUFDakIsZUFBTzVILFlBQVA7QUFDSCxLQUZEO0FBR0EzQixTQUFLNEgsT0FBTCxHQUFlLFlBQU07QUFDakIsZUFBT0EsT0FBUDtBQUNILEtBRkQ7QUFHQTVILFNBQUs2QyxVQUFMLEdBQWtCLFVBQUMyRyxRQUFELEVBQWM7QUFDNUI1QixrQkFBVTRCLFFBQVY7QUFDSCxLQUZEO0FBR0F4SixTQUFLbUYsU0FBTCxHQUFpQixZQUFJO0FBQ2pCLGVBQU9HLE9BQVA7QUFDSCxLQUZEO0FBR0F0RixTQUFLdUYsVUFBTCxHQUFrQixVQUFDa0UsUUFBRCxFQUFZO0FBQzFCbkUsa0JBQVVtRSxRQUFWO0FBQ0gsS0FGRDs7QUFJQXpKLFNBQUt1QyxRQUFMLEdBQWdCLFVBQUNtSCxRQUFELEVBQWM7QUFDMUIsWUFBRzdCLFNBQVM2QixRQUFaLEVBQXFCO0FBQ2pCLGdCQUFJQyxZQUFZOUIsS0FBaEI7QUFDQSxvQkFBTzZCLFFBQVA7QUFDSSxxQkFBS3RHLHlCQUFMO0FBQ0lwRCx5QkFBSzBDLE9BQUwsQ0FBYWtILDBCQUFiO0FBQ0E7QUFDSixxQkFBSzFGLHVCQUFMO0FBQ0lsRSx5QkFBSzBDLE9BQUwsQ0FBYW1ILHVCQUFiLEVBQTJCO0FBQ3ZCRixtQ0FBVzlCO0FBRFkscUJBQTNCO0FBR0E7QUFDSixxQkFBS3hELHdCQUFMO0FBQ0lyRSx5QkFBSzBDLE9BQUwsQ0FBYW9ILHNCQUFiLEVBQTBCO0FBQ3RCSCxtQ0FBVzlCO0FBRFcscUJBQTFCO0FBR0E7QUFiUjtBQWVBQSxvQkFBTzZCLFFBQVA7QUFDQTFKLGlCQUFLMEMsT0FBTCxDQUFhcUgsdUJBQWIsRUFBMkI7QUFDdkJDLDJCQUFXTCxTQURZO0FBRXZCTSwwQkFBVXBDO0FBRmEsYUFBM0I7QUFJSDtBQUNKLEtBeEJEO0FBeUJBN0gsU0FBS2tELFFBQUwsR0FBZ0IsWUFBSztBQUNqQixlQUFPMkUsS0FBUDtBQUNILEtBRkQ7QUFHQTdILFNBQUs2RSxTQUFMLEdBQWlCLFVBQUNxRixTQUFELEVBQWU7QUFDNUJwQyxpQkFBU29DLFNBQVQ7QUFDSCxLQUZEO0FBR0FsSyxTQUFLbUssU0FBTCxHQUFpQixZQUFNO0FBQ25CLGVBQU9yQyxNQUFQO0FBQ0gsS0FGRDtBQUdBOUgsU0FBS29LLFdBQUwsR0FBbUIsWUFBTTtBQUNyQjtBQUNBLFlBQUk1RyxTQUFVM0IsUUFBUTRCLFFBQVIsSUFBb0JDLFFBQXBCLEdBQThCLElBQTlCLEdBQXNDL0IsaUJBQWlCZ0Msd0JBQWpCLEdBQWdDL0IsZ0JBQWdCZ0MsU0FBaEIsRUFBaEMsR0FBOEQsS0FBbEg7QUFDQSxlQUFPSixTQUFVRSxRQUFWLEdBQXFCN0IsUUFBUTRCLFFBQXBDO0FBQ0gsS0FKRDtBQUtBekQsU0FBS3FLLFdBQUwsR0FBbUIsWUFBTTtBQUNyQixlQUFPeEksUUFBUW9DLFdBQWY7QUFDSCxLQUZEO0FBR0FqRSxTQUFLc0ssU0FBTCxHQUFpQixVQUFDdkUsTUFBRCxFQUFXO0FBQ3hCbEUsZ0JBQVFrRSxNQUFSLEdBQWlCQSxTQUFPLEdBQXhCO0FBQ0gsS0FGRDtBQUdBL0YsU0FBS3VLLFNBQUwsR0FBaUIsWUFBSztBQUNsQixlQUFPMUksUUFBUWtFLE1BQVIsR0FBZSxHQUF0QjtBQUNILEtBRkQ7QUFHQS9GLFNBQUt3SyxPQUFMLEdBQWUsVUFBQzNDLEtBQUQsRUFBVTs7QUFFckIsWUFBSSxPQUFPQSxLQUFQLEtBQWlCLFdBQXJCLEVBQWtDOztBQUU5QmhHLG9CQUFRcUUsS0FBUixHQUFnQixDQUFDckUsUUFBUXFFLEtBQXpCOztBQUVBbEcsaUJBQUswQyxPQUFMLENBQWErSCx1QkFBYixFQUEyQjtBQUN2QnhFLHNCQUFNcEUsUUFBUXFFO0FBRFMsYUFBM0I7QUFJSCxTQVJELE1BUU87O0FBRUhyRSxvQkFBUXFFLEtBQVIsR0FBZ0IyQixLQUFoQjs7QUFFQTdILGlCQUFLMEMsT0FBTCxDQUFhK0gsdUJBQWIsRUFBMkI7QUFDdkJ4RSxzQkFBTXBFLFFBQVFxRTtBQURTLGFBQTNCO0FBR0g7QUFDRCxlQUFPckUsUUFBUXFFLEtBQWY7QUFDSCxLQW5CRDtBQW9CQWxHLFNBQUswSyxPQUFMLEdBQWUsWUFBSztBQUNoQixlQUFPN0ksUUFBUXFFLEtBQWY7QUFDSCxLQUZEOztBQUlBbEcsU0FBSzJLLE9BQUwsR0FBZSxVQUFDQyxRQUFELEVBQVdoQyxnQkFBWCxFQUErQjtBQUMxQ1osa0JBQVU0QyxRQUFWO0FBQ0E3Qyx5QkFBaUJRLG1CQUFtQlAsT0FBbkIsQ0FBakI7QUFDQVcsY0FBTUMsb0JBQW9CLENBQTFCOztBQUVBLGVBQU8sSUFBSWlDLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUMxQ0Q7QUFDSCxTQUZNLENBQVA7QUFJSCxLQVREO0FBVUE5SyxTQUFLbUosSUFBTCxHQUFZLFVBQUN5QixRQUFELEVBQWE7QUFDckI1QyxrQkFBVTRDLFFBQVY7QUFDQTdDLHlCQUFpQlEsbUJBQW1CUCxPQUFuQixDQUFqQjtBQUNBVyxjQUFNaUMsU0FBU0ksU0FBVCxJQUFzQixDQUE1QjtBQUNILEtBSkQ7O0FBTUFoTCxTQUFLbUUsSUFBTCxHQUFZLFlBQUs7QUFDYixZQUFJbkUsS0FBS2tELFFBQUwsT0FBb0JtQix3QkFBeEIsRUFBc0M7QUFDbEN4QyxvQkFBUXNDLElBQVI7QUFDSDtBQUNKLEtBSkQ7QUFLQW5FLFNBQUt5QyxLQUFMLEdBQWEsWUFBSztBQUNkLFlBQUl6QyxLQUFLa0QsUUFBTCxNQUFtQm1CLHdCQUF2QixFQUFxQztBQUNqQ3hDLG9CQUFRWSxLQUFSO0FBQ0g7QUFDSixLQUpEO0FBS0F6QyxTQUFLb0osSUFBTCxHQUFZLFVBQUMxRSxRQUFELEVBQWE7QUFDckI3QyxnQkFBUW9DLFdBQVIsR0FBc0JTLFFBQXRCO0FBQ0gsS0FGRDtBQUdBMUUsU0FBS2lMLGVBQUwsR0FBdUIsVUFBQzdDLFlBQUQsRUFBaUI7QUFDcENwSSxhQUFLMEMsT0FBTCxDQUFhd0ksZ0NBQWIsRUFBb0MsRUFBQzlDLGNBQWVBLFlBQWhCLEVBQXBDO0FBQ0EsZUFBT3ZHLFFBQVF1RyxZQUFSLEdBQXVCdkcsUUFBUXdHLG1CQUFSLEdBQThCRCxZQUE1RDtBQUNILEtBSEQ7QUFJQXBJLFNBQUttTCxlQUFMLEdBQXVCLFlBQUs7QUFDeEIsZUFBT3RKLFFBQVF1RyxZQUFmO0FBQ0gsS0FGRDtBQUdBcEksU0FBS29MLGdCQUFMLEdBQXdCLFlBQU07QUFDMUIsWUFBSUMsZ0JBQWdCckQsUUFBUXNELEdBQVIsQ0FBWSxVQUFTekMsTUFBVCxFQUFpQjBDLEtBQWpCLEVBQXdCO0FBQ3BELG1CQUFPO0FBQ0h0QyxzQkFBTUosT0FBT0ksSUFEVjtBQUVIcEYsc0JBQU1nRixPQUFPaEYsSUFGVjtBQUdIMkUsdUJBQU9LLE9BQU9MLEtBSFg7QUFJSCtDLHVCQUFRQTtBQUpMLGFBQVA7QUFNSCxTQVBtQixDQUFwQjtBQVFBLGVBQU9GLGFBQVA7QUFDSCxLQVZEO0FBV0FyTCxTQUFLOEQsaUJBQUwsR0FBeUIsWUFBTTtBQUMzQixZQUFJK0UsU0FBU2IsUUFBUUQsY0FBUixDQUFiO0FBQ0EsZUFBTztBQUNIa0Isa0JBQU1KLE9BQU9JLElBRFY7QUFFSHBGLGtCQUFNZ0YsT0FBT2hGLElBRlY7QUFHSDJFLG1CQUFPSyxPQUFPTCxLQUhYO0FBSUgrQyxtQkFBUXhEO0FBSkwsU0FBUDtBQU1ILEtBUkQ7QUFTQS9ILFNBQUt3TCxpQkFBTCxHQUF5QixVQUFDQyxZQUFELEVBQWVDLGtCQUFmLEVBQXNDO0FBQzNELFlBQUczRCxrQkFBa0IwRCxZQUFyQixFQUFrQztBQUM5QixtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsWUFBR0EsZUFBZSxDQUFDLENBQW5CLEVBQXFCO0FBQ2pCLGdCQUFHekQsV0FBV0EsUUFBUXJELE1BQVIsR0FBaUI4RyxZQUEvQixFQUE0QztBQUN4QztBQUNBekwscUJBQUt1QyxRQUFMLENBQWNZLHFCQUFkO0FBQ0E5QyxrQ0FBa0JDLEdBQWxCLENBQXNCLHNCQUFzQm1MLFlBQTVDO0FBQ0ExRCxpQ0FBaUIwRCxZQUFqQjs7QUFFQXpMLHFCQUFLMEMsT0FBTCxDQUFhaUosZ0NBQWIsRUFBb0M7QUFDaEM1RCxvQ0FBZ0IwRDtBQURnQixpQkFBcEM7O0FBSUFoRSw2QkFBYW1FLGVBQWIsQ0FBNkI1RCxRQUFReUQsWUFBUixFQUFzQmpELEtBQW5EO0FBQ0Esb0JBQUdrRCxrQkFBSCxFQUFzQjs7QUFFbEIvQywwQkFBTTlHLFFBQVFvQyxXQUFSLElBQXVCLENBQTdCO0FBQ0g7QUFDRCx1QkFBTzhELGNBQVA7QUFDSDtBQUNKO0FBQ0osS0F4QkQ7O0FBMEJBL0gsU0FBSzZMLElBQUwsR0FBWSxZQUFLO0FBQ2J4TCwwQkFBa0JDLEdBQWxCLENBQXNCLGdCQUF0QjtBQUNBdUIsZ0JBQVFpSyxlQUFSLENBQXdCLFNBQXhCO0FBQ0FqSyxnQkFBUWlLLGVBQVIsQ0FBd0IsS0FBeEI7QUFDQSxlQUFPakssUUFBUWtLLFVBQWYsRUFBMkI7QUFDdkJsSyxvQkFBUUosV0FBUixDQUFvQkksUUFBUWtLLFVBQTVCO0FBQ0g7QUFDRC9MLGFBQUt5QyxLQUFMO0FBQ0F6QyxhQUFLdUMsUUFBTCxDQUFjWSxxQkFBZDtBQUNILEtBVEQ7O0FBV0FuRCxTQUFLd0IsT0FBTCxHQUFlLFlBQUs7QUFDaEJ4QixhQUFLNkwsSUFBTDtBQUNBbEUsaUJBQVNuRyxPQUFUO0FBQ0E7QUFDQXhCLGFBQUtnTSxHQUFMO0FBQ0EzTCwwQkFBa0JDLEdBQWxCLENBQXNCLHlEQUF0QjtBQUNILEtBTkQ7O0FBUUE7QUFDQTtBQUNBTixvQkFBYSxVQUFDa0IsSUFBRCxFQUFVO0FBQ25CLFlBQU0rSyxTQUFTak0sS0FBS2tCLElBQUwsQ0FBZjtBQUNBLGVBQU8sWUFBVTtBQUNiLG1CQUFPK0ssT0FBT0MsS0FBUCxDQUFhbE0sSUFBYixFQUFtQm1NLFNBQW5CLENBQVA7QUFDSCxTQUZEO0FBR0gsS0FMRDtBQU1BLFdBQU9uTSxJQUFQO0FBRUgsQ0E1UUQ7O3FCQThRZXdILFE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOVNmOzs7O0FBS08sSUFBTTRFLGtDQUFhLFNBQWJBLFVBQWEsR0FBVTtBQUNoQyxRQUFHLENBQUNDLFVBQVVDLFNBQVYsQ0FBb0JDLE9BQXBCLENBQTRCLE9BQTVCLEtBQXdDRixVQUFVQyxTQUFWLENBQW9CQyxPQUFwQixDQUE0QixLQUE1QixDQUF6QyxLQUFnRixDQUFDLENBQXBGLEVBQXVGO0FBQ25GLGVBQU8sT0FBUDtBQUNILEtBRkQsTUFFTSxJQUFHRixVQUFVQyxTQUFWLENBQW9CQyxPQUFwQixDQUE0QixRQUE1QixLQUF5QyxDQUFDLENBQTdDLEVBQWdEO0FBQ2xELGVBQU8sUUFBUDtBQUNILEtBRkssTUFFQSxJQUFHRixVQUFVQyxTQUFWLENBQW9CQyxPQUFwQixDQUE0QixRQUE1QixLQUF5QyxDQUFDLENBQTdDLEVBQStDO0FBQ2pELGVBQU8sUUFBUDtBQUNILEtBRkssTUFFQSxJQUFHRixVQUFVQyxTQUFWLENBQW9CQyxPQUFwQixDQUE0QixTQUE1QixLQUEwQyxDQUFDLENBQTlDLEVBQWlEO0FBQ25ELGVBQU8sU0FBUDtBQUNILEtBRkssTUFFQSxJQUFJRixVQUFVQyxTQUFWLENBQW9CQyxPQUFwQixDQUE0QixNQUE1QixLQUF1QyxDQUFDLENBQTVDLEVBQWdEO0FBQ2xELFlBQUlDLE9BQU9ILFVBQVVDLFNBQVYsQ0FBb0JDLE9BQXBCLENBQTRCLE1BQTVCLENBQVg7QUFDQTs7Ozs7Ozs7Ozs7QUFXQSxZQUFJRSxLQUFNLFlBQVU7O0FBRWhCLGdCQUFJQyxLQUFKO0FBQUEsZ0JBQ0lDLElBQUksQ0FEUjtBQUFBLGdCQUVJQyxNQUFNbk0sU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUZWO0FBQUEsZ0JBR0ltTSxNQUFNRCxJQUFJRSxvQkFBSixDQUF5QixHQUF6QixDQUhWOztBQUtBLG1CQUNJRixJQUFJRyxTQUFKLEdBQWdCLG1CQUFvQixFQUFFSixDQUF0QixHQUEyQix1QkFBM0MsRUFDSUUsSUFBSSxDQUFKLENBRlI7O0FBS0EsbUJBQU9GLElBQUksQ0FBSixHQUFRQSxDQUFSLEdBQVlELEtBQW5CO0FBRUgsU0FkUyxFQUFWO0FBZUEsWUFBR0QsS0FBSyxDQUFSLEVBQVU7QUFDTixtQkFBTyxPQUFQO0FBQ0gsU0FGRCxNQUVLO0FBQ0QsbUJBQU8sVUFBUDtBQUNIO0FBRUosS0FsQ0ssTUFrQ0Q7QUFDRCxlQUFPLFNBQVA7QUFDSDtBQUVKLENBL0NNLEMiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIk92ZW5QbGF5ZXJGbGFzaC5zd2ZcIjsiLCIvKipcclxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxyXG4gKiBAcGFyYW0gICB7ZWxlbWVudH0gICBjb250YWluZXIgICBkb20gZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5pbXBvcnQge2dldEJyb3dzZXJ9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XHJcbmltcG9ydCB7UFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IFNXRnBhdGggZnJvbSAnLi4vLi4vLi4vYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YnO1xyXG5cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgcHJvdmlkZXJUeXBlKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCByb290SWQgPSBjb250YWluZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXJlbnQtaWRcIik7XHJcbiAgICBsZXQgbWVkaWFFbGVtZW50ID0gXCJcIjtcclxuICAgIGxldCBicm93c2VyVHlwZSA9IGdldEJyb3dzZXIoKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgbG9hZGVkLiBicm93c2VyVHlwZSA6IFwiKyBicm93c2VyVHlwZSk7XHJcbiAgICBjb25zdCBjcmVhdGVNZWRpYUVsZW1lbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHByb3ZpZGVyVHlwZSAhPT0gUFJPVklERVJfUlRNUCl7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVSZW1vdGVQbGF5YmFjaycsICcnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnd2Via2l0LXBsYXlzaW5saW5lJywgJycpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICcnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lZGlhRWxlbWVudCk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgbW92aWUsIGZsYXNodmFycywgYWxsb3dzY3JpcHRhY2Nlc3MsIGFsbG93ZnVsbHNjcmVlbiwgcXVhbGl0eSwgbmFtZSwgbWVudSwgcXVhbCwgYmdjb2xvcjtcclxuICAgICAgICAgICAgbW92aWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbW92aWUnKTtcclxuICAgICAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsIFNXRnBhdGgpO1xyXG5cclxuICAgICAgICAgICAgZmxhc2h2YXJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdmbGFzaHZhcnMnKTtcclxuICAgICAgICAgICAgLy9wbGF5ZXJJZCB1c2VzIFNXRiBmb3IgRXh0ZXJuYWxJbnRlcmZhY2UuY2FsbCgpLlxyXG4gICAgICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdwbGF5ZXJJZD0nK3Jvb3RJZCk7XHJcblxyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd3NjcmlwdGFjY2VzcycpO1xyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xyXG5cclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd2Z1bGxzY3JlZW4nKTtcclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAndHJ1ZScpO1xyXG5cclxuICAgICAgICAgICAgcXVhbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIHF1YWxpdHkuc2V0QXR0cmlidXRlKCduYW1lJywgJ3F1YWxpdHknKTtcclxuICAgICAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hlaWdodCcpO1xyXG5cclxuICAgICAgICAgICAgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ25hbWUnKTtcclxuICAgICAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG5cclxuICAgICAgICAgICAgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21lbnUnKTtcclxuICAgICAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2ZhbHNlJyk7XHJcblxyXG4gICAgICAgICAgICBxdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgcXVhbC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xyXG4gICAgICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGlnaCcpO1xyXG5cclxuICAgICAgICAgICAgYmdjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCduYW1lJywgJ2JnY29sb3InKTtcclxuICAgICAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJyMwMDAwMDAnKTtcclxuXHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29iamVjdCcpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpO1xyXG5cclxuICAgICAgICAgICAgaWYoYnJvd3NlclR5cGUgIT09IFwib2xkSUVcIil7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhJywgU1dGcGF0aCk7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQobW92aWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChiZ2NvbG9yKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKHF1YWwpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dmdWxsc2NyZWVuKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGFsbG93c2NyaXB0YWNjZXNzKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGZsYXNodmFycyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lZGlhRWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jcmVhdGUgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgY3JlYXRlRWxlbWVudCgpXCIpO1xyXG4gICAgICAgIGlmKG1lZGlhRWxlbWVudCl7XHJcbiAgICAgICAgICAgIHRoYXQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3JlYXRlTWVkaWFFbGVtZW50KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciByZW1vdmVFbGVtZW50KClcIik7XHJcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKG1lZGlhRWxlbWVudCk7XHJcbiAgICAgICAgbWVkaWFFbGVtZW50ID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJpbXBvcnQge1xyXG4gICAgRVJST1IsXHJcbiAgICBTVEFURV9JRExFLFxyXG4gICAgU1RBVEVfUExBWUlORyxcclxuICAgIFNUQVRFX1NUQUxMRUQsXHJcbiAgICBTVEFURV9MT0FESU5HLFxyXG4gICAgU1RBVEVfQ09NUExFVEUsXHJcbiAgICBTVEFURV9QQVVTRUQsXHJcbiAgICBTVEFURV9FUlJPUixcclxuICAgIENPTlRFTlRfQ09NUExFVEUsXHJcbiAgICBDT05URU5UX1NFRUssXHJcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxyXG4gICAgQ09OVEVOVF9TRUVLRUQsXHJcbiAgICBDT05URU5UX0JVRkZFUixcclxuICAgIENPTlRFTlRfVElNRSxcclxuICAgIENPTlRFTlRfVk9MVU1FLFxyXG4gICAgQ09OVEVOVF9NRVRBLFxyXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxyXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXHJcbiAgICBQUk9WSURFUl9IVE1MNSxcclxuICAgIFBST1ZJREVSX1dFQlJUQyxcclxuICAgIFBST1ZJREVSX0RBU0gsXHJcbiAgICBQUk9WSURFUl9ITFNcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUcmlnZ2VyIG9uIHZhcmlvdXMgdmlkZW8gZXZlbnRzLlxyXG4gKiBAcGFyYW0gICBwcm92aWRlck5hbWUgY2hpbGQgUHJvdmlkZXIgTmFtZVxyXG4gKiBAcGFyYW0gICBleHRlbmRlZEVsZW1lbnQgZXh0ZW5kZWQgbWVkaWEgb2JqZWN0IGJ5IG1zZS5cclxuICogQHBhcmFtICAgZWxlbWVudCBlbFZpZGVvICB2aWRlb1xyXG4gKiBAcGFyYW0gICBQcm92aWRlciBwcm92aWRlciAgaHRtbDVQcm92aWRlclxyXG4gKiAqL1xyXG5cclxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihwcm92aWRlck5hbWUsIGV4dGVuZGVkRWxlbWVudCwgZWxWaWRlbywgcHJvdmlkZXIpe1xyXG4gICAgY29uc3QgbG93TGV2ZWxFdmVudHMgPSB7fTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIGxvYWRlZC5cIik7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBjb25zdCBiZXR3ZWVuID0gZnVuY3Rpb24gKG51bSwgbWluLCBtYXgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4obnVtLCBtYXgpLCBtaW4pO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgb25FcnJvciA9IGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XHJcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcclxuXHJcbiAgICAgICAgLy9QUklWQVRFX1NUQVRFX0VSUk9SXHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIGF1ZGlvL3ZpZGVvXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5jYW5wbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIHByb3ZpZGVyLnNldENhblNlZWsodHJ1ZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUl9GVUxMKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gY2FucGxheVwiKTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGR1cmF0aW9uIG9mIHRoZSBhdWRpby92aWRlbyBpcyBjaGFuZ2VkXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5kdXJhdGlvbmNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcygpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBkdXJhdGlvbmNoYW5nZVwiKTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWxpc3QgaXMgZW5kZWRcclxuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlbmRlZFwiKTtcclxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpICE9IFNUQVRFX0lETEUgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPSBTVEFURV9DT01QTEVURSl7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9DT01QTEVURSk7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgdGhlIGN1cnJlbnQgZnJhbWUgb2YgdGhlIGF1ZGlvL3ZpZGVvXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZyBCZWNhdXNlIHRoaXMgY2F1c2VzIGNoYW9zIGJ5IGxvYWRlZG1ldGFkYXRhLlxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogZWxWaWRlby5kdXJhdGlvbixcclxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aDogZWxWaWRlby52aWRlb1dpZHRoXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGxvYWRlZGRhdGFcIik7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgbWV0YSBkYXRhIGZvciB0aGUgYXVkaW8vdmlkZW9cclxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxyXG4gICAgICAgIGxldCBpc0xpdmUgPSAoZWxWaWRlby5kdXJhdGlvbiA9PSBJbmZpbml0eT8gdHJ1ZSA6IChwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX0RBU0g/IGV4dGVuZGVkRWxlbWVudC5pc0R5bmFtaWMoKSA6IGZhbHNlKSk7XHJcbiAgICAgICAgbGV0IHR5cGUgPSBwcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpID8gcHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKS50eXBlIDogXCJcIjtcclxuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uLFxyXG4gICAgICAgICAgICB0eXBlIDp0eXBlXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL3Byb3ZpZGVyLnNldExpdmUoaXNMaXZlKTtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGxvYWRlZG1ldGFkYXRhXCIsIG1ldGFkYXRhKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gcGF1c2VkXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wYXVzZSA9ICgpID0+IHtcclxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9DT01QTEVURSB8fHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0VSUk9SKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbFZpZGVvLmVuZGVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbFZpZGVvLmVycm9yKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbFZpZGVvLmN1cnJlbnRUaW1lID09PSBlbFZpZGVvLmR1cmF0aW9uKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGF1c2VcIik7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUEFVU0VEKTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHN0YXJ0ZWQgb3IgaXMgbm8gbG9uZ2VyIHBhdXNlZFxyXG4gICAgbG93TGV2ZWxFdmVudHMucGxheSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIWVsVmlkZW8ucGF1c2VkICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpIHtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBsYXlcIik7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBpcyBwbGF5aW5nIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZCBvciBzdG9wcGVkIGZvciBidWZmZXJpbmdcclxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXlpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBsYXlpbmdcIik7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XHJcbiAgICAgICAgLy9wcm92aWRlci50cmlnZ2VyKFBST1ZJREVSX0ZJUlNUX0ZSQU1FKTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgdGhlIGF1ZGlvL3ZpZGVvXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcyA9ICgpID0+IHtcclxuICAgICAgICBsZXQgdGltZVJhbmdlcyA9IGVsVmlkZW8uYnVmZmVyZWQ7XHJcbiAgICAgICAgaWYoIXRpbWVSYW5nZXMgKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbiwgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIGxldCBidWZmZXJlZCA9IGJldHdlZW4oICh0aW1lUmFuZ2VzLmxlbmd0aD4gMCA/IHRpbWVSYW5nZXMuZW5kKHRpbWVSYW5nZXMubGVuZ3RoIC0gMSkgOiAwICkgLyBkdXJhdGlvbiwgMCwgMSk7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwcm9ncmVzc1wiLCBidWZmZXJlZCoxMDApO1xyXG5cclxuICAgICAgICBwcm92aWRlci5zZXRCdWZmZXIoYnVmZmVyZWQqMTAwKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSLCB7XHJcbiAgICAgICAgICAgIGJ1ZmZlclBlcmNlbnQ6IGJ1ZmZlcmVkKjEwMCxcclxuICAgICAgICAgICAgcG9zaXRpb246ICBwb3NpdGlvbixcclxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGlzIHRyeWluZyB0byBnZXQgbWVkaWEgZGF0YSwgYnV0IGRhdGEgaXMgbm90IGF2YWlsYWJsZVxyXG4gICAgbG93TGV2ZWxFdmVudHMuc3RhbGxlZCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc3RhbGxcIik7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGhhcyBjaGFuZ2VkXHJcbiAgICBsb3dMZXZlbEV2ZW50cy50aW1ldXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcclxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb247XHJcbiAgICAgICAgaWYgKGlzTmFOKGR1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkgJiYgIWVsVmlkZW8ucGF1c2VkKXtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB0aW1ldXBkYXRlXCIgLCB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcclxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcgfHwgcHJvdmlkZXIuaXNTZWVraW5nKCkpIHtcclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnJlc2l6ZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcmVzaXplXCIpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyh0cnVlKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2luZ1wiLCBlbFZpZGVvLmN1cnJlbnRUaW1lKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFSyx7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uIDogZWxWaWRlby5jdXJyZW50VGltZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtlZCA9ICgpID0+IHtcclxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVrZWRcIik7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyhmYWxzZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUtFRCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgdmlkZW8gc3RvcHMgYmVjYXVzZSBpdCBuZWVkcyB0byBidWZmZXIgdGhlIG5leHQgZnJhbWVcclxuICAgIGxvd0xldmVsRXZlbnRzLndhaXRpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIiwgcHJvdmlkZXIuZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgaWYocHJvdmlkZXIuaXNTZWVraW5nKCkpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuICAgICAgICB9ZWxzZSBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9TVEFMTEVEKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnZvbHVtZWNoYW5nZSA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHZvbHVtZWNoYW5nZVwiLCBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwge1xyXG4gICAgICAgICAgICB2b2x1bWU6IE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApLFxyXG4gICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxWaWRlby5lcnJvciAmJiBlbFZpZGVvLmVycm9yLmNvZGUpIHx8IDA7XHJcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlR2VuID0gKHtcclxuICAgICAgICAgICAgMDoge2NvZGUgOiBQTEFZRVJfVU5LTldPTl9FUlJPUiwgcmVhc29uIDogXCJVbmtub3duIGh0bWw1IHZpZGVvIGVycm9yXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gaHRtbDUgdmlkZW8gZXJyb3JcIn0sXHJcbiAgICAgICAgICAgIDE6IHtjb2RlIDogUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gb3BlcmF0aW9uIGFib3J0ZWRcIiwgbWVzc2FnZSA6IFwiVW5rbm93biBvcGVyYXRpb24gYWJvcnRlZFwifSxcclxuICAgICAgICAgICAgMjoge2NvZGUgOiBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gbmV0d29yayBlcnJvclwiLCBtZXNzYWdlIDogXCJVbmtub3duIG5ldHdvcmsgZXJyb3JcIn0sXHJcbiAgICAgICAgICAgIDM6IHtjb2RlIDogUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gZGVjb2RlIGVycm9yXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gZGVjb2RlIGVycm9yXCJ9LFxyXG4gICAgICAgICAgICA0OiB7Y29kZSA6IFBMQVlFUl9GSUxFX0VSUk9SLCByZWFzb24gOiBcIkZpbGUgY291bGQgbm90IGJlIHBsYXllZFwiLCBtZXNzYWdlIDogXCJGaWxlIGNvdWxkIG5vdCBiZSBwbGF5ZWRcIn1cclxuICAgICAgICB9W2NvZGVdfHwwKTtcclxuICAgICAgICBlcnJvckNvZGVHZW4uZXJyb3IgPSBlbFZpZGVvLmVycm9yO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZXJyb3JcIiwgZXJyb3JDb2RlR2VuKTtcclxuICAgICAgICBvbkVycm9yKGVycm9yQ29kZUdlbik7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgICAgICBlbFZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XHJcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyNy4uXHJcbiAqL1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCBFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyXCI7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlLmpzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgUExBWUVSX1NUQVRFLCBQTEFZRVJfQ09NUExFVEUsIFBMQVlFUl9QQVVTRSwgUExBWUVSX1BMQVksXHJcbiAgICBDT05URU5UX0xFVkVMUywgQ09OVEVOVF9MRVZFTF9DSEFOR0VELCBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCxcclxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxubGV0IGV4dHJhY3RWaWRlb0VsZW1lbnQgPSBmdW5jdGlvbihwcm92aWRlck5hbWUsIGV4dGVuZGVkRWxlbWVudCl7XHJcbiAgICBpZihfLmlzRWxlbWVudChleHRlbmRlZEVsZW1lbnQpKXtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgaWYocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9EQVNIKXtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50LmdldFZpZGVvRWxlbWVudCgpO1xyXG4gICAgfWVsc2UgaWYocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9ITFMpe1xyXG4gICAgICAgIHJldHVybiBleHRlbmRlZEVsZW1lbnQubWVkaWE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBDb3JlIEZvciBIdG1sNSBWaWRlby5cclxuICogQHBhcmFtICAgcHJvdmlkZXJOYW1lIHByb3ZpZGVyIG5hbWVcclxuICogQHBhcmFtICAgZXh0ZW5kZWRFbGVtZW50IGV4dGVuZGVkIG1lZGlhIG9iamVjdCBieSBtc2UuIG9yIHZpZGVvIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xyXG4gKiBAcGFyYW0gICBvbkxvYWQgb24gbG9hZCBoYW5kbGVyXHJcbiAqICovXHJcbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24gKHByb3ZpZGVyTmFtZSwgZXh0ZW5kZWRFbGVtZW50LCBwbGF5ZXJDb25maWcsIG9uQmVmb3JlTG9hZCl7XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIGxvYWRlZC4gXCIpO1xyXG5cclxuICAgIGxldCB0aGF0ID17fTtcclxuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcclxuXHJcbiAgICBsZXQgZWxWaWRlbyA9IGV4dHJhY3RWaWRlb0VsZW1lbnQocHJvdmlkZXJOYW1lLCBleHRlbmRlZEVsZW1lbnQpO1xyXG4gICAgbGV0IGxpc3RlbmVyID0gRXZlbnRzTGlzdGVuZXIocHJvdmlkZXJOYW1lLCBleHRlbmRlZEVsZW1lbnQsIGVsVmlkZW8sIHRoYXQpO1xyXG4gICAgbGV0IGNhblNlZWsgPSBmYWxzZTtcclxuICAgIGxldCBzZWVraW5nID0gZmFsc2U7XHJcbiAgICBsZXQgc3RhdGUgPSBTVEFURV9JRExFO1xyXG4gICAgbGV0IGJ1ZmZlciA9IDA7XHJcbiAgICBsZXQgY3VycmVudFF1YWxpdHkgPSAtMTtcclxuICAgIGxldCBzb3VyY2VzID0gW107XHJcbiAgICAvL2xldCBpc0xpdmUgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgcG9zdGVySW1hZ2UgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuaW1hZ2V8fFwiXCI7XHJcbiAgICBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXllckNvbmZpZy5nZXREZWZhdWx0UGxheWJhY2tSYXRlKCk7XHJcblxyXG4gICAgY29uc3QgcGlja0N1cnJlbnRRdWFsaXR5ID0gKHNvdXJjZXMpID0+e1xyXG4gICAgICAgIHZhciBxdWFsaXR5ID0gTWF0aC5tYXgoMCwgY3VycmVudFF1YWxpdHkpO1xyXG4gICAgICAgIGNvbnN0IGxhYmVsID1cIlwiO1xyXG4gICAgICAgIGlmIChzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHF1YWxpdHk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzb3VyY2VzW2N1cnJlbnRRdWFsaXR5XTtcclxuICAgICAgICBpZihvbkJlZm9yZUxvYWQpe1xyXG4gICAgICAgICAgICBvbkJlZm9yZUxvYWQoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IHByZXZpb3VzU291cmNlID0gZWxWaWRlby5zcmM7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzb3VyY2UnKTtcclxuXHJcbiAgICAgICAgICAgIHNvdXJjZUVsZW1lbnQuc3JjID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUNoYW5nZWQgPSAoc291cmNlRWxlbWVudC5zcmMgIT09IHByZXZpb3VzU291cmNlKTtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIGVsVmlkZW8uc3JjID0gc291cmNlc1tjdXJyZW50UXVhbGl0eV0uZmlsZTtcclxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBjYWxsIGxvYWQgaWYgc3JjIHdhcyBub3Qgc2V0LiBsb2FkKCkgd2lsbCBjYW5jZWwgYW55IGFjdGl2ZSBwbGF5IHByb21pc2UuXHJcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbFZpZGVvLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2UgaWYobGFzdFBsYXlQb3NpdGlvbiA9PSAwICYmIGVsVmlkZW8uY3VycmVudFRpbWUgPiAwKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTFMsIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBjdXJyZW50UXVhbGl0eVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHBvc3RlckltYWdlKXtcclxuICAgICAgICAgICAgICAgIGVsVmlkZW8ucG9zdGVyID0gcG9zdGVySW1hZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gcHJvdmlkZXJOYW1lO1xyXG4gICAgfTtcclxuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gY2FuU2VlaztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldENhblNlZWsgPSAoY2FuU2Vla18pID0+IHtcclxuICAgICAgICBjYW5TZWVrID0gY2FuU2Vla187XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e1xyXG4gICAgICAgIHJldHVybiBzZWVraW5nO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0U2Vla2luZyA9IChzZWVraW5nXyk9PntcclxuICAgICAgICBzZWVraW5nID0gc2Vla2luZ187XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcclxuICAgICAgICBpZihzdGF0ZSAhPSBuZXdTdGF0ZSl7XHJcbiAgICAgICAgICAgIGxldCBwcmV2U3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgc3dpdGNoKG5ld1N0YXRlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfQ09NUExFVEUgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfQ09NUExFVEUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QQVVTRUQgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUEFVU0UsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QTEFZSU5HIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1BMQVksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0YXRlPSBuZXdTdGF0ZTtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9TVEFURSwge1xyXG4gICAgICAgICAgICAgICAgcHJldnN0YXRlOiBwcmV2U3RhdGUsXHJcbiAgICAgICAgICAgICAgICBuZXdzdGF0ZTogc3RhdGVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XHJcbiAgICAgICAgYnVmZmVyID0gbmV3QnVmZmVyO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBidWZmZXI7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICAvL1RvRG8gOiBZb3UgY29uc2lkZXIgaGxzanMuIEJ1dCBub3Qgbm93IGJlY2F1c2Ugd2UgZG9uJ3Qgc3VwcG9ydCBobHNqcy5cclxuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT0gSW5maW5pdHk/IHRydWUgOiAocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9EQVNIPyBleHRlbmRlZEVsZW1lbnQuaXNEeW5hbWljKCkgOiBmYWxzZSkpO1xyXG4gICAgICAgIHJldHVybiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PntcclxuICAgICAgICBlbFZpZGVvLnZvbHVtZSA9IHZvbHVtZS8xMDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gZWxWaWRlby52b2x1bWUqMTAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT57XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gIWVsVmlkZW8ubXV0ZWQ7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XHJcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHN0YXRlO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTVVURSwge1xyXG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzXywgbGFzdFBsYXlQb3NpdGlvbikgPT57XHJcbiAgICAgICAgc291cmNlcyA9IHNvdXJjZXNfO1xyXG4gICAgICAgIGN1cnJlbnRRdWFsaXR5ID0gcGlja0N1cnJlbnRRdWFsaXR5KHNvdXJjZXMpO1xyXG4gICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXNfKSA9PntcclxuICAgICAgICBzb3VyY2VzID0gc291cmNlc187XHJcbiAgICAgICAgY3VycmVudFF1YWxpdHkgPSBwaWNrQ3VycmVudFF1YWxpdHkoc291cmNlcyk7XHJcbiAgICAgICAgX2xvYWQoc291cmNlc18uc3RhcnR0aW1lIHx8IDApO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcclxuICAgICAgICBpZiggdGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgZWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCB0aGF0LmdldFN0YXRlKCkgPT0gU1RBVEVfUExBWUlORyl7XHJcbiAgICAgICAgICAgIGVsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcclxuICAgICAgICBlbFZpZGVvLmN1cnJlbnRUaW1lID0gcG9zaXRpb247XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcclxuICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUJBQ0tfUkFURV9DSEFOR0VELCB7cGxheWJhY2tSYXRlIDogcGxheWJhY2tSYXRlfSk7XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ucGxheWJhY2tSYXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcclxuICAgICAgICBsZXQgcXVhbGl0eUxldmVscyA9IHNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxyXG4gICAgICAgICAgICAgICAgaW5kZXggOiBpbmRleFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBxdWFsaXR5TGV2ZWxzO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbY3VycmVudFF1YWxpdHldO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxyXG4gICAgICAgICAgICB0eXBlOiBzb3VyY2UudHlwZSxcclxuICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcclxuICAgICAgICAgICAgaW5kZXggOiBjdXJyZW50UXVhbGl0eVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgsIG5lZWRQcm92aWRlckNoYW5nZSkgPT4ge1xyXG4gICAgICAgIGlmKGN1cnJlbnRRdWFsaXR5ID09IHF1YWxpdHlJbmRleCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHF1YWxpdHlJbmRleCA+IC0xKXtcclxuICAgICAgICAgICAgaWYoc291cmNlcyAmJiBzb3VyY2VzLmxlbmd0aCA+IHF1YWxpdHlJbmRleCl7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgY2hhbmdlZCA6IFwiICsgcXVhbGl0eUluZGV4KTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5ID0gcXVhbGl0eUluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMX0NIQU5HRUQsIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogcXVhbGl0eUluZGV4XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0UXVhbGl0eUxhYmVsKHNvdXJjZXNbcXVhbGl0eUluZGV4XS5sYWJlbCk7XHJcbiAgICAgICAgICAgICAgICBpZihuZWVkUHJvdmlkZXJDaGFuZ2Upe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfbG9hZChlbFZpZGVvLmN1cnJlbnRUaW1lIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRRdWFsaXR5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc3RvcCgpIFwiKTtcclxuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgncHJlbG9hZCcpO1xyXG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcclxuICAgICAgICB3aGlsZSAoZWxWaWRlby5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlQ2hpbGQoZWxWaWRlby5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIHRoYXQuc3RvcCgpO1xyXG4gICAgICAgIGxpc3RlbmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAvL2VsVmlkZW8ucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhhdC5vZmYoKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZGVzdHJveSgpIHBsYXllciBzdG9wLCBsaXN0ZW5lciwgZXZlbnQgZGVzdHJvaWVkXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cclxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcclxuICAgIHRoYXQuc3VwZXIgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xyXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXG4gKi9cblxuXG5leHBvcnQgY29uc3QgZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCl7XG4gICAgaWYoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk9wZXJhXCIpIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignT1BSJykpICE9IC0xICl7XG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKSAhPSAtMSApe1xuICAgICAgICByZXR1cm4gJ2Nocm9tZSc7XG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpICE9IC0xKXtcbiAgICAgICAgcmV0dXJuICdzYWZhcmknO1xuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIikgIT0gLTEgKXtcbiAgICAgICAgcmV0dXJuICdmaXJlZm94JztcbiAgICB9ZWxzZSBpZigobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKSAhPSAtMSApKXtcbiAgICAgICAgbGV0IG1zaWUgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpO1xuICAgICAgICAvKmlmKCEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09IHRydWUgKXtcbiAgICAgICAgICAgIHJldHVybiAnaWUnO1xuICAgICAgICB9ZWxzZSBpZighIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1RyaWRlbnQuKnJ2XFw6MTFcXC4vKSl7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llICsgNSwgdWEuaW5kZXhPZihcIi5cIiwgbXNpZSkpKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICAgICAgfSovXG4gICAgICAgIHZhciBpZSA9IChmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB2YXIgdW5kZWYsXG4gICAgICAgICAgICAgICAgdiA9IDMsXG4gICAgICAgICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICAgICAgYWxsID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJyk7XG5cbiAgICAgICAgICAgIHdoaWxlIChcbiAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgZ3QgSUUgJyArICgrK3YpICsgJ10+PGk+PC9pPjwhW2VuZGlmXS0tPicsXG4gICAgICAgICAgICAgICAgICAgIGFsbFswXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiB2ID4gNCA/IHYgOiB1bmRlZjtcblxuICAgICAgICB9KCkpO1xuICAgICAgICBpZihpZSA8IDkpe1xuICAgICAgICAgICAgcmV0dXJuICdvbGRJRSc7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuICdtb2Rlcm5JRSc7XG4gICAgICAgIH1cblxuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgIH1cblxufTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==