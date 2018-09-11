/*! OvenPlayerv0.7.5 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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


exports.__esModule = true;

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


exports.__esModule = true;

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


exports.__esModule = true;

var _EventEmitter = __webpack_require__(/*! api/EventEmitter */ "./src/js/api/EventEmitter.js");

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _Listener = __webpack_require__(/*! api/provider/html5/Listener */ "./src/js/api/provider/html5/Listener.js");

var _Listener2 = _interopRequireDefault(_Listener);

var _underscore = __webpack_require__(/*! utils/underscore.js */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _promise = __webpack_require__(/*! api/shims/promise */ "./src/js/api/shims/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
/**
 * Created by hoho on 2018. 6. 27..
 */
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

        return new _promise2["default"](function (resolve, reject) {
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


exports.__esModule = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9tZWRpYS9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvaHRtbDUvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYnJvd3Nlci5qcyJdLCJuYW1lcyI6WyJNYW5hZ2VyIiwiY29udGFpbmVyIiwicHJvdmlkZXJUeXBlIiwidGhhdCIsInJvb3RJZCIsImdldEF0dHJpYnV0ZSIsIm1lZGlhRWxlbWVudCIsImJyb3dzZXJUeXBlIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJjcmVhdGVNZWRpYUVsZW1lbnQiLCJQUk9WSURFUl9SVE1QIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJtb3ZpZSIsImZsYXNodmFycyIsImFsbG93c2NyaXB0YWNjZXNzIiwiYWxsb3dmdWxsc2NyZWVuIiwicXVhbGl0eSIsIm5hbWUiLCJtZW51IiwicXVhbCIsImJnY29sb3IiLCJTV0ZwYXRoIiwiY3JlYXRlIiwiZGVzdHJveSIsInJlbW92ZUNoaWxkIiwiTGlzdGVuZXIiLCJwcm92aWRlck5hbWUiLCJleHRlbmRlZEVsZW1lbnQiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJsb3dMZXZlbEV2ZW50cyIsImJldHdlZW4iLCJudW0iLCJtaW4iLCJtYXgiLCJNYXRoIiwib25FcnJvciIsImVycm9yIiwic2V0U3RhdGUiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwidHJpZ2dlciIsIkVSUk9SIiwiY2FucGxheSIsInNldENhblNlZWsiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJDT05URU5UX0NPTVBMRVRFIiwibG9hZGVkZGF0YSIsImxvYWRlZG1ldGFkYXRhIiwiaXNMaXZlIiwiZHVyYXRpb24iLCJJbmZpbml0eSIsIlBST1ZJREVSX0RBU0giLCJpc0R5bmFtaWMiLCJ0eXBlIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJtZXRhZGF0YSIsIkNPTlRFTlRfTUVUQSIsImN1cnJlbnRUaW1lIiwiU1RBVEVfUEFVU0VEIiwicGxheSIsInBhdXNlZCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9MT0FESU5HIiwicGxheWluZyIsInRpbWVSYW5nZXMiLCJidWZmZXJlZCIsInBvc2l0aW9uIiwibGVuZ3RoIiwiZW5kIiwic2V0QnVmZmVyIiwiQ09OVEVOVF9CVUZGRVIiLCJidWZmZXJQZXJjZW50Iiwic3RhbGxlZCIsInRpbWV1cGRhdGUiLCJpc05hTiIsImlzU2Vla2luZyIsIkNPTlRFTlRfVElNRSIsInJlc2l6ZSIsInNlZWtpbmciLCJzZXRTZWVraW5nIiwiQ09OVEVOVF9TRUVLIiwic2Vla2VkIiwiQ09OVEVOVF9TRUVLRUQiLCJ3YWl0aW5nIiwiU1RBVEVfU1RBTExFRCIsInZvbHVtZWNoYW5nZSIsInJvdW5kIiwidm9sdW1lIiwiQ09OVEVOVF9WT0xVTUUiLCJtdXRlIiwibXV0ZWQiLCJjb2RlIiwiZXJyb3JDb2RlR2VuIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZlbnROYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJfIiwiaXNFbGVtZW50IiwiZ2V0VmlkZW9FbGVtZW50IiwiUFJPVklERVJfSExTIiwibWVkaWEiLCJQcm92aWRlciIsInBsYXllckNvbmZpZyIsIm9uQmVmb3JlTG9hZCIsImxpc3RlbmVyIiwiY2FuU2VlayIsInN0YXRlIiwiYnVmZmVyIiwiY3VycmVudFF1YWxpdHkiLCJzb3VyY2VzIiwicG9zdGVySW1hZ2UiLCJnZXRDb25maWciLCJpbWFnZSIsInBsYXliYWNrUmF0ZSIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXREZWZhdWx0UGxheWJhY2tSYXRlIiwicGlja0N1cnJlbnRRdWFsaXR5IiwibGFiZWwiLCJpIiwiZ2V0UXVhbGl0eUxhYmVsIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwicHJldmlvdXNTb3VyY2UiLCJzcmMiLCJzb3VyY2VFbGVtZW50IiwiZmlsZSIsInNvdXJjZUNoYW5nZWQiLCJsb2FkIiwic2VlayIsIkNPTlRFTlRfTEVWRUxTIiwicG9zdGVyIiwiZ2V0TmFtZSIsImNhblNlZWtfIiwic2Vla2luZ18iLCJuZXdTdGF0ZSIsInByZXZTdGF0ZSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwibmV3c3RhdGUiLCJuZXdCdWZmZXIiLCJnZXRCdWZmZXIiLCJnZXREdXJhdGlvbiIsImdldFBvc2l0aW9uIiwic2V0Vm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0TXV0ZSIsIkNPTlRFTlRfTVVURSIsImdldE11dGUiLCJwcmVsb2FkIiwic291cmNlc18iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN0YXJ0dGltZSIsInNldFBsYXliYWNrUmF0ZSIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsImdldFBsYXliYWNrUmF0ZSIsImdldFF1YWxpdHlMZXZlbHMiLCJxdWFsaXR5TGV2ZWxzIiwibWFwIiwiaW5kZXgiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsIm5lZWRQcm92aWRlckNoYW5nZSIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsInNldFF1YWxpdHlMYWJlbCIsInN0b3AiLCJyZW1vdmVBdHRyaWJ1dGUiLCJmaXJzdENoaWxkIiwib2ZmIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJnZXRCcm93c2VyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsIm1zaWUiLCJpZSIsInVuZGVmIiwidiIsImRpdiIsImFsbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNLQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxTQUFWQSxPQUFVLENBQVNDLFNBQVQsRUFBb0JDLFlBQXBCLEVBQWlDO0FBQzdDLFFBQU1DLE9BQU8sRUFBYjtBQUNBLFFBQUlDLFNBQVNILFVBQVVJLFlBQVYsQ0FBdUIsZ0JBQXZCLENBQWI7QUFDQSxRQUFJQyxlQUFlLEVBQW5CO0FBQ0EsUUFBSUMsY0FBYywwQkFBbEI7O0FBRUFDLHNCQUFrQkMsR0FBbEIsQ0FBc0Isd0NBQXVDRixXQUE3RDtBQUNBLFFBQU1HLHFCQUFxQixTQUFyQkEsa0JBQXFCLEdBQVU7QUFDakMsWUFBR1IsaUJBQWlCUyx3QkFBcEIsRUFBa0M7QUFDOUJMLDJCQUFlTSxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQWY7QUFDQVAseUJBQWFRLFlBQWIsQ0FBMEIsdUJBQTFCLEVBQW1ELEVBQW5EO0FBQ0FSLHlCQUFhUSxZQUFiLENBQTBCLG9CQUExQixFQUFnRCxFQUFoRDtBQUNBUix5QkFBYVEsWUFBYixDQUEwQixhQUExQixFQUF5QyxFQUF6QztBQUNBYixzQkFBVWMsV0FBVixDQUFzQlQsWUFBdEI7QUFFSCxTQVBELE1BT0s7QUFDRCxnQkFBSVUsY0FBSjtBQUFBLGdCQUFXQyxrQkFBWDtBQUFBLGdCQUFzQkMsMEJBQXRCO0FBQUEsZ0JBQXlDQyx3QkFBekM7QUFBQSxnQkFBMERDLGdCQUExRDtBQUFB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LENBL0NNLEMiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIk92ZW5QbGF5ZXJGbGFzaC5zd2ZcIjsiLCIvKipcclxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxyXG4gKiBAcGFyYW0gICB7ZWxlbWVudH0gICBjb250YWluZXIgICBkb20gZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5pbXBvcnQge2dldEJyb3dzZXJ9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XHJcbmltcG9ydCB7UFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IFNXRnBhdGggZnJvbSAnLi4vLi4vLi4vYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YnO1xyXG5cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgcHJvdmlkZXJUeXBlKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCByb290SWQgPSBjb250YWluZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXJlbnQtaWRcIik7XHJcbiAgICBsZXQgbWVkaWFFbGVtZW50ID0gXCJcIjtcclxuICAgIGxldCBicm93c2VyVHlwZSA9IGdldEJyb3dzZXIoKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgbG9hZGVkLiBicm93c2VyVHlwZSA6IFwiKyBicm93c2VyVHlwZSk7XHJcbiAgICBjb25zdCBjcmVhdGVNZWRpYUVsZW1lbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHByb3ZpZGVyVHlwZSAhPT0gUFJPVklERVJfUlRNUCl7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVSZW1vdGVQbGF5YmFjaycsICcnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnd2Via2l0LXBsYXlzaW5saW5lJywgJycpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICcnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lZGlhRWxlbWVudCk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgbW92aWUsIGZsYXNodmFycywgYWxsb3dzY3JpcHRhY2Nlc3MsIGFsbG93ZnVsbHNjcmVlbiwgcXVhbGl0eSwgbmFtZSwgbWVudSwgcXVhbCwgYmdjb2xvcjtcclxuICAgICAgICAgICAgbW92aWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbW92aWUnKTtcclxuICAgICAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsIFNXRnBhdGgpO1xyXG5cclxuICAgICAgICAgICAgZmxhc2h2YXJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdmbGFzaHZhcnMnKTtcclxuICAgICAgICAgICAgLy9wbGF5ZXJJZCB1c2VzIFNXRiBmb3IgRXh0ZXJuYWxJbnRlcmZhY2UuY2FsbCgpLlxyXG4gICAgICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdwbGF5ZXJJZD0nK3Jvb3RJZCk7XHJcblxyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd3NjcmlwdGFjY2VzcycpO1xyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xyXG5cclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd2Z1bGxzY3JlZW4nKTtcclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAndHJ1ZScpO1xyXG5cclxuICAgICAgICAgICAgcXVhbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIHF1YWxpdHkuc2V0QXR0cmlidXRlKCduYW1lJywgJ3F1YWxpdHknKTtcclxuICAgICAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hlaWdodCcpO1xyXG5cclxuICAgICAgICAgICAgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ25hbWUnKTtcclxuICAgICAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG5cclxuICAgICAgICAgICAgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21lbnUnKTtcclxuICAgICAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2ZhbHNlJyk7XHJcblxyXG4gICAgICAgICAgICBxdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgcXVhbC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xyXG4gICAgICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGlnaCcpO1xyXG5cclxuICAgICAgICAgICAgYmdjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCduYW1lJywgJ2JnY29sb3InKTtcclxuICAgICAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJyMwMDAwMDAnKTtcclxuXHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29iamVjdCcpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpO1xyXG5cclxuICAgICAgICAgICAgaWYoYnJvd3NlclR5cGUgIT09IFwib2xkSUVcIil7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhJywgU1dGcGF0aCk7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQobW92aWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChiZ2NvbG9yKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKHF1YWwpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dmdWxsc2NyZWVuKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGFsbG93c2NyaXB0YWNjZXNzKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGZsYXNodmFycyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lZGlhRWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jcmVhdGUgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgY3JlYXRlRWxlbWVudCgpXCIpO1xyXG4gICAgICAgIGlmKG1lZGlhRWxlbWVudCl7XHJcbiAgICAgICAgICAgIHRoYXQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3JlYXRlTWVkaWFFbGVtZW50KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciByZW1vdmVFbGVtZW50KClcIik7XHJcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKG1lZGlhRWxlbWVudCk7XHJcbiAgICAgICAgbWVkaWFFbGVtZW50ID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJpbXBvcnQge1xyXG4gICAgRVJST1IsXHJcbiAgICBTVEFURV9JRExFLFxyXG4gICAgU1RBVEVfUExBWUlORyxcclxuICAgIFNUQVRFX1NUQUxMRUQsXHJcbiAgICBTVEFURV9MT0FESU5HLFxyXG4gICAgU1RBVEVfQ09NUExFVEUsXHJcbiAgICBTVEFURV9QQVVTRUQsXHJcbiAgICBTVEFURV9FUlJPUixcclxuICAgIENPTlRFTlRfQ09NUExFVEUsXHJcbiAgICBDT05URU5UX1NFRUssXHJcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxyXG4gICAgQ09OVEVOVF9TRUVLRUQsXHJcbiAgICBDT05URU5UX0JVRkZFUixcclxuICAgIENPTlRFTlRfVElNRSxcclxuICAgIENPTlRFTlRfVk9MVU1FLFxyXG4gICAgQ09OVEVOVF9NRVRBLFxyXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxyXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXHJcbiAgICBQUk9WSURFUl9IVE1MNSxcclxuICAgIFBST1ZJREVSX1dFQlJUQyxcclxuICAgIFBST1ZJREVSX0RBU0gsXHJcbiAgICBQUk9WSURFUl9ITFNcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUcmlnZ2VyIG9uIHZhcmlvdXMgdmlkZW8gZXZlbnRzLlxyXG4gKiBAcGFyYW0gICBwcm92aWRlck5hbWUgY2hpbGQgUHJvdmlkZXIgTmFtZVxyXG4gKiBAcGFyYW0gICBleHRlbmRlZEVsZW1lbnQgZXh0ZW5kZWQgbWVkaWEgb2JqZWN0IGJ5IG1zZS5cclxuICogQHBhcmFtICAgZWxlbWVudCBlbFZpZGVvICB2aWRlb1xyXG4gKiBAcGFyYW0gICBQcm92aWRlciBwcm92aWRlciAgaHRtbDVQcm92aWRlclxyXG4gKiAqL1xyXG5cclxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihwcm92aWRlck5hbWUsIGV4dGVuZGVkRWxlbWVudCwgZWxWaWRlbywgcHJvdmlkZXIpe1xyXG4gICAgY29uc3QgbG93TGV2ZWxFdmVudHMgPSB7fTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIGxvYWRlZC5cIik7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBjb25zdCBiZXR3ZWVuID0gZnVuY3Rpb24gKG51bSwgbWluLCBtYXgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4obnVtLCBtYXgpLCBtaW4pO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgb25FcnJvciA9IGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XHJcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcclxuXHJcbiAgICAgICAgLy9QUklWQVRFX1NUQVRFX0VSUk9SXHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIGF1ZGlvL3ZpZGVvXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5jYW5wbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIHByb3ZpZGVyLnNldENhblNlZWsodHJ1ZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUl9GVUxMKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gY2FucGxheVwiKTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGR1cmF0aW9uIG9mIHRoZSBhdWRpby92aWRlbyBpcyBjaGFuZ2VkXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5kdXJhdGlvbmNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcygpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBkdXJhdGlvbmNoYW5nZVwiKTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWxpc3QgaXMgZW5kZWRcclxuICAgIGxvd0xldmVsRXZlbnRzLmVuZGVkID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlbmRlZFwiKTtcclxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpICE9IFNUQVRFX0lETEUgJiYgcHJvdmlkZXIuZ2V0U3RhdGUoKSAhPSBTVEFURV9DT01QTEVURSl7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9DT01QTEVURSk7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgdGhlIGN1cnJlbnQgZnJhbWUgb2YgdGhlIGF1ZGlvL3ZpZGVvXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRkYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZyBCZWNhdXNlIHRoaXMgY2F1c2VzIGNoYW9zIGJ5IGxvYWRlZG1ldGFkYXRhLlxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIG1ldGFkYXRhID0ge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogZWxWaWRlby5kdXJhdGlvbixcclxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aDogZWxWaWRlby52aWRlb1dpZHRoXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGxvYWRlZGRhdGFcIik7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgbWV0YSBkYXRhIGZvciB0aGUgYXVkaW8vdmlkZW9cclxuICAgIGxvd0xldmVsRXZlbnRzLmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xyXG4gICAgICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxyXG4gICAgICAgIGxldCBpc0xpdmUgPSAoZWxWaWRlby5kdXJhdGlvbiA9PSBJbmZpbml0eT8gdHJ1ZSA6IChwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX0RBU0g/IGV4dGVuZGVkRWxlbWVudC5pc0R5bmFtaWMoKSA6IGZhbHNlKSk7XHJcbiAgICAgICAgbGV0IHR5cGUgPSBwcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpID8gcHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKS50eXBlIDogXCJcIjtcclxuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uLFxyXG4gICAgICAgICAgICB0eXBlIDp0eXBlXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL3Byb3ZpZGVyLnNldExpdmUoaXNMaXZlKTtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGxvYWRlZG1ldGFkYXRhXCIsIG1ldGFkYXRhKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpO1xyXG4gICAgfTtcclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYXVkaW8vdmlkZW8gaGFzIGJlZW4gcGF1c2VkXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wYXVzZSA9ICgpID0+IHtcclxuICAgICAgICBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9DT01QTEVURSB8fHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX0VSUk9SKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbFZpZGVvLmVuZGVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbFZpZGVvLmVycm9yKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbFZpZGVvLmN1cnJlbnRUaW1lID09PSBlbFZpZGVvLmR1cmF0aW9uKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGF1c2VcIik7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUEFVU0VEKTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIHN0YXJ0ZWQgb3IgaXMgbm8gbG9uZ2VyIHBhdXNlZFxyXG4gICAgbG93TGV2ZWxFdmVudHMucGxheSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIWVsVmlkZW8ucGF1c2VkICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpIHtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBsYXlcIik7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBpcyBwbGF5aW5nIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZCBvciBzdG9wcGVkIGZvciBidWZmZXJpbmdcclxuICAgIGxvd0xldmVsRXZlbnRzLnBsYXlpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBsYXlpbmdcIik7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XHJcbiAgICAgICAgLy9wcm92aWRlci50cmlnZ2VyKFBST1ZJREVSX0ZJUlNUX0ZSQU1FKTtcclxuICAgIH07XHJcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgdGhlIGF1ZGlvL3ZpZGVvXHJcbiAgICBsb3dMZXZlbEV2ZW50cy5wcm9ncmVzcyA9ICgpID0+IHtcclxuICAgICAgICBsZXQgdGltZVJhbmdlcyA9IGVsVmlkZW8uYnVmZmVyZWQ7XHJcbiAgICAgICAgaWYoIXRpbWVSYW5nZXMgKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbiwgcG9zaXRpb24gPSBlbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIGxldCBidWZmZXJlZCA9IGJldHdlZW4oICh0aW1lUmFuZ2VzLmxlbmd0aD4gMCA/IHRpbWVSYW5nZXMuZW5kKHRpbWVSYW5nZXMubGVuZ3RoIC0gMSkgOiAwICkgLyBkdXJhdGlvbiwgMCwgMSk7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwcm9ncmVzc1wiLCBidWZmZXJlZCoxMDApO1xyXG5cclxuICAgICAgICBwcm92aWRlci5zZXRCdWZmZXIoYnVmZmVyZWQqMTAwKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSLCB7XHJcbiAgICAgICAgICAgIGJ1ZmZlclBlcmNlbnQ6IGJ1ZmZlcmVkKjEwMCxcclxuICAgICAgICAgICAgcG9zaXRpb246ICBwb3NpdGlvbixcclxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGlzIHRyeWluZyB0byBnZXQgbWVkaWEgZGF0YSwgYnV0IGRhdGEgaXMgbm90IGF2YWlsYWJsZVxyXG4gICAgbG93TGV2ZWxFdmVudHMuc3RhbGxlZCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc3RhbGxcIik7XHJcbiAgICB9O1xyXG4gICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGhhcyBjaGFuZ2VkXHJcbiAgICBsb3dMZXZlbEV2ZW50cy50aW1ldXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcclxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb247XHJcbiAgICAgICAgaWYgKGlzTmFOKGR1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkgJiYgIWVsVmlkZW8ucGF1c2VkKXtcclxuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB0aW1ldXBkYXRlXCIgLCB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcclxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHByb3ZpZGVyLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcgfHwgcHJvdmlkZXIuaXNTZWVraW5nKCkpIHtcclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnJlc2l6ZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcmVzaXplXCIpO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyh0cnVlKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2luZ1wiLCBlbFZpZGVvLmN1cnJlbnRUaW1lKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFSyx7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uIDogZWxWaWRlby5jdXJyZW50VGltZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGxvd0xldmVsRXZlbnRzLnNlZWtlZCA9ICgpID0+IHtcclxuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVrZWRcIik7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U2Vla2luZyhmYWxzZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUtFRCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vRmlyZXMgd2hlbiB0aGUgdmlkZW8gc3RvcHMgYmVjYXVzZSBpdCBuZWVkcyB0byBidWZmZXIgdGhlIG5leHQgZnJhbWVcclxuICAgIGxvd0xldmVsRXZlbnRzLndhaXRpbmcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHdhaXRpbmdcIiwgcHJvdmlkZXIuZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgaWYocHJvdmlkZXIuaXNTZWVraW5nKCkpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuICAgICAgICB9ZWxzZSBpZihwcm92aWRlci5nZXRTdGF0ZSgpID09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9TVEFMTEVEKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLnZvbHVtZWNoYW5nZSA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHZvbHVtZWNoYW5nZVwiLCBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwge1xyXG4gICAgICAgICAgICB2b2x1bWU6IE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApLFxyXG4gICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSAoZWxWaWRlby5lcnJvciAmJiBlbFZpZGVvLmVycm9yLmNvZGUpIHx8IDA7XHJcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlR2VuID0gKHtcclxuICAgICAgICAgICAgMDoge2NvZGUgOiBQTEFZRVJfVU5LTldPTl9FUlJPUiwgcmVhc29uIDogXCJVbmtub3duIGh0bWw1IHZpZGVvIGVycm9yXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gaHRtbDUgdmlkZW8gZXJyb3JcIn0sXHJcbiAgICAgICAgICAgIDE6IHtjb2RlIDogUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gb3BlcmF0aW9uIGFib3J0ZWRcIiwgbWVzc2FnZSA6IFwiVW5rbm93biBvcGVyYXRpb24gYWJvcnRlZFwifSxcclxuICAgICAgICAgICAgMjoge2NvZGUgOiBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gbmV0d29yayBlcnJvclwiLCBtZXNzYWdlIDogXCJVbmtub3duIG5ldHdvcmsgZXJyb3JcIn0sXHJcbiAgICAgICAgICAgIDM6IHtjb2RlIDogUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gZGVjb2RlIGVycm9yXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gZGVjb2RlIGVycm9yXCJ9LFxyXG4gICAgICAgICAgICA0OiB7Y29kZSA6IFBMQVlFUl9GSUxFX0VSUk9SLCByZWFzb24gOiBcIkZpbGUgY291bGQgbm90IGJlIHBsYXllZFwiLCBtZXNzYWdlIDogXCJGaWxlIGNvdWxkIG5vdCBiZSBwbGF5ZWRcIn1cclxuICAgICAgICB9W2NvZGVdfHwwKTtcclxuICAgICAgICBlcnJvckNvZGVHZW4uZXJyb3IgPSBlbFZpZGVvLmVycm9yO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gZXJyb3JcIiwgZXJyb3JDb2RlR2VuKTtcclxuICAgICAgICBvbkVycm9yKGVycm9yQ29kZUdlbik7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgT2JqZWN0LmtleXMobG93TGV2ZWxFdmVudHMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgICAgICBlbFZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBkZXN0cm95KClcIik7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKGxvd0xldmVsRXZlbnRzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XHJcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxvd0xldmVsRXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyNy4uXHJcbiAqL1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCBFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyXCI7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlLmpzXCI7XHJcbmltcG9ydCBQcm9taXNlLCB7cmVzb2x2ZWR9IGZyb20gXCJhcGkvc2hpbXMvcHJvbWlzZVwiO1xyXG5pbXBvcnQge1xyXG4gICAgU1RBVEVfSURMRSwgU1RBVEVfUExBWUlORywgU1RBVEVfUEFVU0VELCBTVEFURV9DT01QTEVURSxcclxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLFxyXG4gICAgQ09OVEVOVF9MRVZFTFMsIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsXHJcbiAgICBQTEFZQkFDS19SQVRFX0NIQU5HRUQsIENPTlRFTlRfTVVURSwgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbmxldCBleHRyYWN0VmlkZW9FbGVtZW50ID0gZnVuY3Rpb24ocHJvdmlkZXJOYW1lLCBleHRlbmRlZEVsZW1lbnQpe1xyXG4gICAgaWYoXy5pc0VsZW1lbnQoZXh0ZW5kZWRFbGVtZW50KSl7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmKHByb3ZpZGVyTmFtZSA9PT0gUFJPVklERVJfREFTSCl7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5nZXRWaWRlb0VsZW1lbnQoKTtcclxuICAgIH1lbHNlIGlmKHByb3ZpZGVyTmFtZSA9PT0gUFJPVklERVJfSExTKXtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50Lm1lZGlhO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgQ29yZSBGb3IgSHRtbDUgVmlkZW8uXHJcbiAqIEBwYXJhbSAgIHByb3ZpZGVyTmFtZSBwcm92aWRlciBuYW1lXHJcbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLiBvciB2aWRlbyBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcclxuICogQHBhcmFtICAgb25Mb2FkIG9uIGxvYWQgaGFuZGxlclxyXG4gKiAqL1xyXG5jb25zdCBQcm92aWRlciA9IGZ1bmN0aW9uIChwcm92aWRlck5hbWUsIGV4dGVuZGVkRWxlbWVudCwgcGxheWVyQ29uZmlnLCBvbkJlZm9yZUxvYWQpe1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcclxuXHJcbiAgICBsZXQgdGhhdCA9e307XHJcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XHJcblxyXG4gICAgbGV0IGVsVmlkZW8gPSBleHRyYWN0VmlkZW9FbGVtZW50KHByb3ZpZGVyTmFtZSwgZXh0ZW5kZWRFbGVtZW50KTtcclxuICAgIGxldCBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKHByb3ZpZGVyTmFtZSwgZXh0ZW5kZWRFbGVtZW50LCBlbFZpZGVvLCB0aGF0KTtcclxuICAgIGxldCBjYW5TZWVrID0gZmFsc2U7XHJcbiAgICBsZXQgc2Vla2luZyA9IGZhbHNlO1xyXG4gICAgbGV0IHN0YXRlID0gU1RBVEVfSURMRTtcclxuICAgIGxldCBidWZmZXIgPSAwO1xyXG4gICAgbGV0IGN1cnJlbnRRdWFsaXR5ID0gLTE7XHJcbiAgICBsZXQgc291cmNlcyA9IFtdO1xyXG4gICAgLy9sZXQgaXNMaXZlID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHBvc3RlckltYWdlID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmltYWdlfHxcIlwiO1xyXG4gICAgZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5ZXJDb25maWcuZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSgpO1xyXG5cclxuXHJcbiAgICBjb25zdCBwaWNrQ3VycmVudFF1YWxpdHkgPSAoc291cmNlcykgPT57XHJcbiAgICAgICAgdmFyIHF1YWxpdHkgPSBNYXRoLm1heCgwLCBjdXJyZW50UXVhbGl0eSk7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPVwiXCI7XHJcbiAgICAgICAgaWYgKHNvdXJjZXMpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVhbGl0eSA9IGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcXVhbGl0eTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gIHNvdXJjZXNbY3VycmVudFF1YWxpdHldO1xyXG4gICAgICAgIGlmKG9uQmVmb3JlTG9hZCl7XHJcbiAgICAgICAgICAgIG9uQmVmb3JlTG9hZChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgcHJldmlvdXNTb3VyY2UgPSBlbFZpZGVvLnNyYztcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xyXG5cclxuICAgICAgICAgICAgc291cmNlRWxlbWVudC5zcmMgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2VFbGVtZW50LnNyYyAhPT0gcHJldmlvdXNTb3VyY2UpO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgZWxWaWRlby5zcmMgPSBzb3VyY2VzW2N1cnJlbnRRdWFsaXR5XS5maWxlO1xyXG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGNhbGwgbG9hZCBpZiBzcmMgd2FzIG5vdCBzZXQuIGxvYWQoKSB3aWxsIGNhbmNlbCBhbnkgYWN0aXZlIHBsYXkgcHJvbWlzZS5cclxuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsVmlkZW8ubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihsYXN0UGxheVBvc2l0aW9uID09IDAgJiYgZWxWaWRlby5jdXJyZW50VGltZSA+IDApe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMUywge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IGN1cnJlbnRRdWFsaXR5XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYocG9zdGVySW1hZ2Upe1xyXG4gICAgICAgICAgICAgICAgZWxWaWRlby5wb3N0ZXIgPSBwb3N0ZXJJbWFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBwcm92aWRlck5hbWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5jYW5TZWVrID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBjYW5TZWVrO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrXykgPT4ge1xyXG4gICAgICAgIGNhblNlZWsgPSBjYW5TZWVrXztcclxuICAgIH07XHJcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XHJcbiAgICAgICAgcmV0dXJuIHNlZWtpbmc7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmdfKT0+e1xyXG4gICAgICAgIHNlZWtpbmcgPSBzZWVraW5nXztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmKHN0YXRlICE9IG5ld1N0YXRlKXtcclxuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICBzd2l0Y2gobmV3U3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9DT01QTEVURSA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BBVVNFRCA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX1BMQVlJTkcgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfUExBWSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RhdGU9IG5ld1N0YXRlO1xyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUVSX1NUQVRFLCB7XHJcbiAgICAgICAgICAgICAgICBwcmV2c3RhdGU6IHByZXZTdGF0ZSxcclxuICAgICAgICAgICAgICAgIG5ld3N0YXRlOiBzdGF0ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcclxuICAgICAgICBidWZmZXIgPSBuZXdCdWZmZXI7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxyXG4gICAgICAgIGxldCBpc0xpdmUgPSAoZWxWaWRlby5kdXJhdGlvbiA9PSBJbmZpbml0eT8gdHJ1ZSA6IChwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX0RBU0g/IGV4dGVuZGVkRWxlbWVudC5pc0R5bmFtaWMoKSA6IGZhbHNlKSk7XHJcbiAgICAgICAgcmV0dXJuIGlzTGl2ZSA/ICBJbmZpbml0eSA6IGVsVmlkZW8uZHVyYXRpb247XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZWxWaWRlby5jdXJyZW50VGltZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+e1xyXG4gICAgICAgIGVsVmlkZW8udm9sdW1lID0gdm9sdW1lLzEwMDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBlbFZpZGVvLnZvbHVtZSoxMDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PntcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgICAgIGVsVmlkZW8ubXV0ZWQgPSAhZWxWaWRlby5tdXRlZDtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX01VVEUsIHtcclxuICAgICAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBlbFZpZGVvLm11dGVkID0gc3RhdGU7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XHJcbiAgICAgICAgICAgICAgICBtdXRlOiBlbFZpZGVvLm11dGVkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gZWxWaWRlby5tdXRlZDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wcmVsb2FkID0gKHNvdXJjZXNfLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcclxuICAgICAgICBzb3VyY2VzID0gc291cmNlc187XHJcbiAgICAgICAgY3VycmVudFF1YWxpdHkgPSBwaWNrQ3VycmVudFF1YWxpdHkoc291cmNlcyk7XHJcbiAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbiB8fCAwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlc18pID0+e1xyXG4gICAgICAgIHNvdXJjZXMgPSBzb3VyY2VzXztcclxuICAgICAgICBjdXJyZW50UXVhbGl0eSA9IHBpY2tDdXJyZW50UXVhbGl0eShzb3VyY2VzKTtcclxuICAgICAgICBfbG9hZChzb3VyY2VzXy5zdGFydHRpbWUgfHwgMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucGxheSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCB0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBlbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIHRoYXQuZ2V0U3RhdGUoKSA9PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xyXG4gICAgICAgIGVsVmlkZW8uY3VycmVudFRpbWUgPSBwb3NpdGlvbjtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xyXG4gICAgICAgIHRoYXQudHJpZ2dlcihQTEFZQkFDS19SQVRFX0NIQU5HRUQsIHtwbGF5YmFja1JhdGUgOiBwbGF5YmFja1JhdGV9KTtcclxuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGUgPSBlbFZpZGVvLmRlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gZWxWaWRlby5wbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBxdWFsaXR5TGV2ZWxzID0gc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBzb3VyY2UudHlwZSxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXHJcbiAgICAgICAgICAgICAgICBpbmRleCA6IGluZGV4XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHF1YWxpdHlMZXZlbHM7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICB2YXIgc291cmNlID0gc291cmNlc1tjdXJyZW50UXVhbGl0eV07XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXHJcbiAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxyXG4gICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxyXG4gICAgICAgICAgICBpbmRleCA6IGN1cnJlbnRRdWFsaXR5XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCwgbmVlZFByb3ZpZGVyQ2hhbmdlKSA9PiB7XHJcbiAgICAgICAgaWYoY3VycmVudFF1YWxpdHkgPT0gcXVhbGl0eUluZGV4KXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYocXVhbGl0eUluZGV4ID4gLTEpe1xyXG4gICAgICAgICAgICBpZihzb3VyY2VzICYmIHNvdXJjZXMubGVuZ3RoID4gcXVhbGl0eUluZGV4KXtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBxdWFsaXR5SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHkgPSBxdWFsaXR5SW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBxdWFsaXR5SW5kZXhcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRRdWFsaXR5TGFiZWwoc291cmNlc1txdWFsaXR5SW5kZXhdLmxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsVmlkZW8uY3VycmVudFRpbWUgfHwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFF1YWxpdHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc3RvcCA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xyXG4gICAgICAgIGVsVmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdwcmVsb2FkJyk7XHJcbiAgICAgICAgZWxWaWRlby5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xyXG4gICAgICAgIHdoaWxlIChlbFZpZGVvLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVDaGlsZChlbFZpZGVvLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgdGhhdC5zdG9wKCk7XHJcbiAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIC8vZWxWaWRlby5yZW1vdmUoKTtcclxuICAgICAgICB0aGF0Lm9mZigpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxyXG4gICAgLy8gdXNlIDogbGV0IHN1cGVyX2Rlc3Ryb3kgID0gdGhhdC5zdXBlcignZGVzdHJveScpOyAuLi4gc3VwZXJfZGVzdHJveSgpO1xyXG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxuICovXG5cblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXIgPSBmdW5jdGlvbigpe1xuICAgIGlmKChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPcGVyYVwiKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpKSAhPSAtMSApe1xuICAgICAgICByZXR1cm4gJ29wZXJhJztcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIikgIT0gLTEgKXtcbiAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlNhZmFyaVwiKSAhPSAtMSl7XG4gICAgICAgIHJldHVybiAnc2FmYXJpJztcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpICE9IC0xICl7XG4gICAgICAgIHJldHVybiAnZmlyZWZveCc7XG4gICAgfWVsc2UgaWYoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIikgIT0gLTEgKSl7XG4gICAgICAgIGxldCBtc2llID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKTtcbiAgICAgICAgLyppZighIWRvY3VtZW50LmRvY3VtZW50TW9kZSA9PSB0cnVlICl7XG4gICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgfWVsc2UgaWYoISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LipydlxcOjExXFwuLykpe1xuICAgICAgICAgICAgaWYgKCFpc05hTihwYXJzZUludCh1YS5zdWJzdHJpbmcobXNpZSArIDUsIHVhLmluZGV4T2YoXCIuXCIsIG1zaWUpKSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpZSc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XG4gICAgICAgIH0qL1xuICAgICAgICB2YXIgaWUgPSAoZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIHVuZGVmLFxuICAgICAgICAgICAgICAgIHYgPSAzLFxuICAgICAgICAgICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgICAgIGFsbCA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaScpO1xuXG4gICAgICAgICAgICB3aGlsZSAoXG4gICAgICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9ICc8IS0tW2lmIGd0IElFICcgKyAoKyt2KSArICddPjxpPjwvaT48IVtlbmRpZl0tLT4nLFxuICAgICAgICAgICAgICAgICAgICBhbGxbMF1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4gdiA+IDQgPyB2IDogdW5kZWY7XG5cbiAgICAgICAgfSgpKTtcbiAgICAgICAgaWYoaWUgPCA5KXtcbiAgICAgICAgICAgIHJldHVybiAnb2xkSUUnO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiAnbW9kZXJuSUUnO1xuICAgICAgICB9XG5cbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICB9XG5cbn07XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=