/*! OvenPlayerv0.7.1 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"],{

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

/**
 * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
 * @param   {element}   container   dom element
 *
 * */
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
                quality = void 0;
            movie = document.createElement('param');
            movie.setAttribute('name', 'movie');
            movie.setAttribute('value', './ovenplayer/OvenPlayerFlash.swf');

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

            if (browserType !== "ie") {}
            mediaElement = document.createElement('object');
            mediaElement.setAttribute('type', 'application/x-shockwave-flash');
            mediaElement.setAttribute('data', './ovenplayer/OvenPlayerFlash.swf');
            mediaElement.setAttribute('id', rootId + "-flash");
            mediaElement.setAttribute('name', rootId + "-flash");
            mediaElement.setAttribute('width', '100%');
            mediaElement.setAttribute('height', '100%');

            mediaElement.appendChild(flashvars);
            mediaElement.appendChild(allowscriptaccess);
            mediaElement.appendChild(allowfullscreen);
            /*if(browserType !== "ie"){
                mediaElement.appendChild(inner);
            }*/

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
};

exports.default = Manager;

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

exports.default = Listener;

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

var _promise = __webpack_require__(/*! api/shims/promise */ "./src/js/api/shims/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractVideoElement = function extractVideoElement(providerName, extendedElement) {
    if (_underscore2.default.isElement(extendedElement)) {
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
    (0, _EventEmitter2.default)(that);

    var elVideo = extractVideoElement(providerName, extendedElement);
    var listener = (0, _Listener2.default)(providerName, extendedElement, elVideo, that);
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
                if (sources[i].default) {
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

        return new _promise2.default(function (resolve, reject) {
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
    that.super = function (name) {
        var method = that[name];
        return function () {
            return method.apply(that, arguments);
        };
    };
    return that;
};

exports.default = Provider;

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
        var msie = avigator.userAgent.indexOf("MSIE");
        if (!!document.documentMode == true) {
            return 'ie';
        } else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            if (!isNaN(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))))) {
                return 'ie';
            } else {
                return 'unknown';
            }
        } else {
            return 'unknown';
        }
    } else {
        return 'unknown';
    }
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL21lZGlhL01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9MaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9icm93c2VyLmpzIl0sIm5hbWVzIjpbIk1hbmFnZXIiLCJjb250YWluZXIiLCJwcm92aWRlclR5cGUiLCJ0aGF0Iiwicm9vdElkIiwiZ2V0QXR0cmlidXRlIiwibWVkaWFFbGVtZW50IiwiYnJvd3NlclR5cGUiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImNyZWF0ZU1lZGlhRWxlbWVudCIsIlBST1ZJREVSX1JUTVAiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsIm1vdmllIiwiZmxhc2h2YXJzIiwiYWxsb3dzY3JpcHRhY2Nlc3MiLCJhbGxvd2Z1bGxzY3JlZW4iLCJxdWFsaXR5IiwiY3JlYXRlIiwiZGVzdHJveSIsInJlbW92ZUNoaWxkIiwiTGlzdGVuZXIiLCJwcm92aWRlck5hbWUiLCJleHRlbmRlZEVsZW1lbnQiLCJlbFZpZGVvIiwicHJvdmlkZXIiLCJsb3dMZXZlbEV2ZW50cyIsImJldHdlZW4iLCJudW0iLCJtaW4iLCJtYXgiLCJNYXRoIiwib25FcnJvciIsImVycm9yIiwic2V0U3RhdGUiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwidHJpZ2dlciIsIkVSUk9SIiwiY2FucGxheSIsInNldENhblNlZWsiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiZHVyYXRpb25jaGFuZ2UiLCJwcm9ncmVzcyIsImVuZGVkIiwiZ2V0U3RhdGUiLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJDT05URU5UX0NPTVBMRVRFIiwibG9hZGVkZGF0YSIsImxvYWRlZG1ldGFkYXRhIiwiaXNMaXZlIiwiZHVyYXRpb24iLCJJbmZpbml0eSIsIlBST1ZJREVSX0RBU0giLCJpc0R5bmFtaWMiLCJ0eXBlIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJtZXRhZGF0YSIsIkNPTlRFTlRfTUVUQSIsImN1cnJlbnRUaW1lIiwiU1RBVEVfUEFVU0VEIiwicGxheSIsInBhdXNlZCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9MT0FESU5HIiwicGxheWluZyIsInRpbWVSYW5nZXMiLCJidWZmZXJlZCIsInBvc2l0aW9uIiwibGVuZ3RoIiwiZW5kIiwic2V0QnVmZmVyIiwiQ09OVEVOVF9CVUZGRVIiLCJidWZmZXJQZXJjZW50Iiwic3RhbGxlZCIsInRpbWV1cGRhdGUiLCJpc05hTiIsImlzU2Vla2luZyIsIkNPTlRFTlRfVElNRSIsInJlc2l6ZSIsInNlZWtpbmciLCJzZXRTZWVraW5nIiwiQ09OVEVOVF9TRUVLIiwic2Vla2VkIiwiQ09OVEVOVF9TRUVLRUQiLCJ3YWl0aW5nIiwiU1RBVEVfU1RBTExFRCIsInZvbHVtZWNoYW5nZSIsInJvdW5kIiwidm9sdW1lIiwiQ09OVEVOVF9WT0xVTUUiLCJtdXRlIiwibXV0ZWQiLCJjb2RlIiwiZXJyb3JDb2RlR2VuIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZlbnROYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJfIiwiaXNFbGVtZW50IiwiZ2V0VmlkZW9FbGVtZW50IiwiUFJPVklERVJfSExTIiwibWVkaWEiLCJQcm92aWRlciIsInBsYXllckNvbmZpZyIsIm9uQmVmb3JlTG9hZCIsImxpc3RlbmVyIiwiY2FuU2VlayIsInN0YXRlIiwiYnVmZmVyIiwiY3VycmVudFF1YWxpdHkiLCJzb3VyY2VzIiwicG9zdGVySW1hZ2UiLCJnZXRDb25maWciLCJpbWFnZSIsInBsYXliYWNrUmF0ZSIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXREZWZhdWx0UGxheWJhY2tSYXRlIiwicGlja0N1cnJlbnRRdWFsaXR5IiwibGFiZWwiLCJpIiwiZGVmYXVsdCIsImdldFF1YWxpdHlMYWJlbCIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsInByZXZpb3VzU291cmNlIiwic3JjIiwic291cmNlRWxlbWVudCIsImZpbGUiLCJzb3VyY2VDaGFuZ2VkIiwibG9hZCIsInNlZWsiLCJDT05URU5UX0xFVkVMUyIsInBvc3RlciIsImdldE5hbWUiLCJjYW5TZWVrXyIsInNlZWtpbmdfIiwibmV3U3RhdGUiLCJwcmV2U3RhdGUiLCJQTEFZRVJfQ09NUExFVEUiLCJQTEFZRVJfUEFVU0UiLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld3N0YXRlIiwibmV3QnVmZmVyIiwiZ2V0QnVmZmVyIiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsInNldFZvbHVtZSIsImdldFZvbHVtZSIsInNldE11dGUiLCJDT05URU5UX01VVEUiLCJnZXRNdXRlIiwicHJlbG9hZCIsInNvdXJjZXNfIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzdGFydHRpbWUiLCJzZXRQbGF5YmFja1JhdGUiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsIm1hcCIsImluZGV4Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJzZXRRdWFsaXR5TGFiZWwiLCJzdG9wIiwicmVtb3ZlQXR0cmlidXRlIiwiZmlyc3RDaGlsZCIsIm9mZiIsInN1cGVyIiwibmFtZSIsIm1ldGhvZCIsImFwcGx5IiwiYXJndW1lbnRzIiwiZ2V0QnJvd3NlciIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImluZGV4T2YiLCJtc2llIiwiYXZpZ2F0b3IiLCJkb2N1bWVudE1vZGUiLCJtYXRjaCIsInBhcnNlSW50IiwidWEiLCJzdWJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0E7O0FBQ0E7O0FBTkE7Ozs7O0FBUUEsSUFBTUEsVUFBVSxTQUFWQSxPQUFVLENBQVNDLFNBQVQsRUFBb0JDLFlBQXBCLEVBQWlDO0FBQzdDLFFBQU1DLE9BQU8sRUFBYjtBQUNBLFFBQUlDLFNBQVNILFVBQVVJLFlBQVYsQ0FBdUIsZ0JBQXZCLENBQWI7QUFDQSxRQUFJQyxlQUFlLEVBQW5CO0FBQ0EsUUFBSUMsY0FBYywwQkFBbEI7O0FBRUFDLHNCQUFrQkMsR0FBbEIsQ0FBc0Isd0NBQXVDRixXQUE3RDtBQUNBLFFBQU1HLHFCQUFxQixTQUFyQkEsa0JBQXFCLEdBQVU7QUFDakMsWUFBR1IsaUJBQWlCUyx3QkFBcEIsRUFBa0M7QUFDOUJMLDJCQUFlTSxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQWY7QUFDQVAseUJBQWFRLFlBQWIsQ0FBMEIsdUJBQTFCLEVBQW1ELEVBQW5EO0FBQ0FSLHlCQUFhUSxZQUFiLENBQTBCLG9CQUExQixFQUFnRCxFQUFoRDtBQUNBUix5QkFBYVEsWUFBYixDQUEwQixhQUExQixFQUF5QyxFQUF6QztBQUNBYixzQkFBVWMsV0FBVixDQUFzQlQsWUFBdEI7QUFFSCxTQVBELE1BT0s7QUFDRCxnQkFBSVUsY0FBSjtBQUFBLGdCQUFXQyxrQkFBWDtBQUFBLGdCQUFzQkMsMEJBQXRCO0FBQUEsZ0JBQXlDQyx3QkFBekM7QUFBQSxnQkFBMERDLGdCQUExRDtBQUNBSixvQkFBUUosU0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFSO0FBQ0FHLGtCQUFNRixZQUFOLENBQW1CLE1BQW5CLEVBQTJCLE9BQTNCO0FB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RCxtQkFBTyxTQUFQO0FBQ0g7QUFFSixLQWRLLE1BY0Q7QUFDRCxlQUFPLFNBQVA7QUFDSDtBQUVKLENBM0JNLEMiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxuICogQHBhcmFtICAge2VsZW1lbnR9ICAgY29udGFpbmVyICAgZG9tIGVsZW1lbnRcbiAqXG4gKiAqL1xuaW1wb3J0IHtnZXRCcm93c2VyfSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xuaW1wb3J0IHtQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyLCBwcm92aWRlclR5cGUpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgcm9vdElkID0gY29udGFpbmVyLmdldEF0dHJpYnV0ZShcImRhdGEtcGFyZW50LWlkXCIpO1xuICAgIGxldCBtZWRpYUVsZW1lbnQgPSBcIlwiO1xuICAgIGxldCBicm93c2VyVHlwZSA9IGdldEJyb3dzZXIoKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBsb2FkZWQuIGJyb3dzZXJUeXBlIDogXCIrIGJyb3dzZXJUeXBlKTtcbiAgICBjb25zdCBjcmVhdGVNZWRpYUVsZW1lbnQgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZihwcm92aWRlclR5cGUgIT09IFBST1ZJREVSX1JUTVApe1xuICAgICAgICAgICAgbWVkaWFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVSZW1vdGVQbGF5YmFjaycsICcnKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dlYmtpdC1wbGF5c2lubGluZScsICcnKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJycpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lZGlhRWxlbWVudCk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgbW92aWUsIGZsYXNodmFycywgYWxsb3dzY3JpcHRhY2Nlc3MsIGFsbG93ZnVsbHNjcmVlbiwgcXVhbGl0eTtcbiAgICAgICAgICAgIG1vdmllID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgnbmFtZScsICdtb3ZpZScpO1xuICAgICAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICcuL292ZW5wbGF5ZXIvT3ZlblBsYXllckZsYXNoLnN3ZicpO1xuXG4gICAgICAgICAgICBmbGFzaHZhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdmbGFzaHZhcnMnKTtcbiAgICAgICAgICAgIC8vcGxheWVySWQgdXNlcyBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cbiAgICAgICAgICAgIGZsYXNodmFycy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3BsYXllcklkPScrcm9vdElkKTtcblxuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93c2NyaXB0YWNjZXNzJyk7XG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xuXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd2Z1bGxzY3JlZW4nKTtcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcblxuICAgICAgICAgICAgcXVhbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XG4gICAgICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGVpZ2h0Jyk7XG5cbiAgICAgICAgICAgIGlmKGJyb3dzZXJUeXBlICE9PSBcImllXCIpe1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEnLCAnLi9vdmVucGxheWVyL092ZW5QbGF5ZXJGbGFzaC5zd2YnKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgcm9vdElkK1wiLWZsYXNoXCIpO1xuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJyk7XG5cbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGFsbG93c2NyaXB0YWNjZXNzKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd2Z1bGxzY3JlZW4pO1xuICAgICAgICAgICAgLyppZihicm93c2VyVHlwZSAhPT0gXCJpZVwiKXtcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lZGlhRWxlbWVudDtcbiAgICB9O1xuXG4gICAgdGhhdC5jcmVhdGUgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGNyZWF0ZUVsZW1lbnQoKVwiKTtcbiAgICAgICAgaWYobWVkaWFFbGVtZW50KXtcbiAgICAgICAgICAgIHRoYXQuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciByZW1vdmVFbGVtZW50KClcIik7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChtZWRpYUVsZW1lbnQpO1xuICAgICAgICBtZWRpYUVsZW1lbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XG4iLCJpbXBvcnQge1xuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIENPTlRFTlRfQ09NUExFVEUsXG4gICAgQ09OVEVOVF9TRUVLLFxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXG4gICAgQ09OVEVOVF9TRUVLRUQsXG4gICAgQ09OVEVOVF9CVUZGRVIsXG4gICAgQ09OVEVOVF9USU1FLFxuICAgIENPTlRFTlRfVk9MVU1FLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXG4gICAgUFJPVklERVJfSFRNTDUsXG4gICAgUFJPVklERVJfV0VCUlRDLFxuICAgIFBST1ZJREVSX0RBU0gsXG4gICAgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cblxuLyoqXG4gKiBAYnJpZWYgICBUcmlnZ2VyIG9uIHZhcmlvdXMgdmlkZW8gZXZlbnRzLlxuICogQHBhcmFtICAgcHJvdmlkZXJOYW1lIGNoaWxkIFByb3ZpZGVyIE5hbWVcbiAqIEBwYXJhbSAgIGV4dGVuZGVkRWxlbWVudCBleHRlbmRlZCBtZWRpYSBvYmplY3QgYnkgbXNlLlxuICogQHBhcmFtICAgZWxlbWVudCBlbFZpZGVvICB2aWRlb1xuICogQHBhcmFtICAgUHJvdmlkZXIgcHJvdmlkZXIgIGh0bWw1UHJvdmlkZXJcbiAqICovXG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24ocHJvdmlkZXJOYW1lLCBleHRlbmRlZEVsZW1lbnQsIGVsVmlkZW8sIHByb3ZpZGVyKXtcbiAgICBjb25zdCBsb3dMZXZlbEV2ZW50cyA9IHt9O1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciBsb2FkZWQuXCIpO1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBjb25zdCBiZXR3ZWVuID0gZnVuY3Rpb24gKG51bSwgbWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKG51bSwgbWF4KSwgbWluKTtcbiAgICB9XG4gICAgY29uc3Qgb25FcnJvciA9IGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuXG4gICAgICAgIC8vUFJJVkFURV9TVEFURV9FUlJPUlxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvcik7XG4gICAgfTtcblxuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBjYW4gc3RhcnQgcGxheWluZyB0aGUgYXVkaW8vdmlkZW9cbiAgICBsb3dMZXZlbEV2ZW50cy5jYW5wbGF5ID0gKCkgPT4ge1xuICAgICAgICBwcm92aWRlci5zZXRDYW5TZWVrKHRydWUpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSX0ZVTEwpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gY2FucGxheVwiKTtcbiAgICB9O1xuICAgIC8vRmlyZXMgd2hlbiB0aGUgZHVyYXRpb24gb2YgdGhlIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWRcbiAgICBsb3dMZXZlbEV2ZW50cy5kdXJhdGlvbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MoKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIGR1cmF0aW9uY2hhbmdlXCIpO1xuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBjdXJyZW50IHBsYXlsaXN0IGlzIGVuZGVkXG4gICAgbG93TGV2ZWxFdmVudHMuZW5kZWQgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlbmRlZFwiKTtcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSAhPSBTVEFURV9JRExFICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT0gU1RBVEVfQ09NUExFVEUpe1xuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0NPTVBMRVRFKTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0NPTVBMRVRFKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgdGhlIGN1cnJlbnQgZnJhbWUgb2YgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgbG93TGV2ZWxFdmVudHMubG9hZGVkZGF0YSA9ICgpID0+IHtcbiAgICAgICAgLy9EbyBub3RoaW5nIEJlY2F1c2UgdGhpcyBjYXVzZXMgY2hhb3MgYnkgbG9hZGVkbWV0YWRhdGEuXG4gICAgICAgIC8qXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgaGVpZ2h0OiBlbFZpZGVvLnZpZGVvSGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IGVsVmlkZW8udmlkZW9XaWR0aFxuICAgICAgICB9O1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpOyovXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBsb2FkZWRkYXRhXCIpO1xuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBicm93c2VyIGhhcyBsb2FkZWQgbWV0YSBkYXRhIGZvciB0aGUgYXVkaW8vdmlkZW9cbiAgICBsb3dMZXZlbEV2ZW50cy5sb2FkZWRtZXRhZGF0YSA9ICgpID0+IHtcbiAgICAgICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXG4gICAgICAgIGxldCBpc0xpdmUgPSAoZWxWaWRlby5kdXJhdGlvbiA9PSBJbmZpbml0eT8gdHJ1ZSA6IChwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX0RBU0g/IGV4dGVuZGVkRWxlbWVudC5pc0R5bmFtaWMoKSA6IGZhbHNlKSk7XG4gICAgICAgIGxldCB0eXBlID0gcHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKSA/IHByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCkudHlwZSA6IFwiXCI7XG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBpc0xpdmUgPyAgSW5maW5pdHkgOiBlbFZpZGVvLmR1cmF0aW9uLFxuICAgICAgICAgICAgdHlwZSA6dHlwZVxuICAgICAgICB9O1xuICAgICAgICAvL3Byb3ZpZGVyLnNldExpdmUoaXNMaXZlKTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gbG9hZGVkbWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgbWV0YWRhdGEpO1xuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBwYXVzZWRcbiAgICBsb3dMZXZlbEV2ZW50cy5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQ09NUExFVEUgfHxwcm92aWRlci5nZXRTdGF0ZSgpID09PSBTVEFURV9FUlJPUil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lbmRlZCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5lcnJvcil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWxWaWRlby5jdXJyZW50VGltZSA9PT0gZWxWaWRlby5kdXJhdGlvbil7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IG9uIHBhdXNlXCIpO1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QQVVTRUQpO1xuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBoYXMgYmVlbiBzdGFydGVkIG9yIGlzIG5vIGxvbmdlciBwYXVzZWRcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5ID0gKCkgPT4ge1xuICAgICAgICBpZiAoIWVsVmlkZW8ucGF1c2VkICYmIHByb3ZpZGVyLmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBwbGF5XCIpO1xuICAgICAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgLy9GaXJlcyB3aGVuIHRoZSBhdWRpby92aWRlbyBpcyBwbGF5aW5nIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZCBvciBzdG9wcGVkIGZvciBidWZmZXJpbmdcbiAgICBsb3dMZXZlbEV2ZW50cy5wbGF5aW5nID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcGxheWluZ1wiKTtcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfUExBWUlORyk7XG4gICAgICAgIC8vcHJvdmlkZXIudHJpZ2dlcihQUk9WSURFUl9GSVJTVF9GUkFNRSk7XG4gICAgfTtcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgbG93TGV2ZWxFdmVudHMucHJvZ3Jlc3MgPSAoKSA9PiB7XG4gICAgICAgIGxldCB0aW1lUmFuZ2VzID0gZWxWaWRlby5idWZmZXJlZDtcbiAgICAgICAgaWYoIXRpbWVSYW5nZXMgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGVsVmlkZW8uZHVyYXRpb24sIHBvc2l0aW9uID0gZWxWaWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGJ1ZmZlcmVkID0gYmV0d2VlbiggKHRpbWVSYW5nZXMubGVuZ3RoPiAwID8gdGltZVJhbmdlcy5lbmQodGltZVJhbmdlcy5sZW5ndGggLSAxKSA6IDAgKSAvIGR1cmF0aW9uLCAwLCAxKTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gcHJvZ3Jlc3NcIiwgYnVmZmVyZWQqMTAwKTtcblxuICAgICAgICBwcm92aWRlci5zZXRCdWZmZXIoYnVmZmVyZWQqMTAwKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwge1xuICAgICAgICAgICAgYnVmZmVyUGVyY2VudDogYnVmZmVyZWQqMTAwLFxuICAgICAgICAgICAgcG9zaXRpb246ICBwb3NpdGlvbixcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vRmlyZXMgd2hlbiB0aGUgYnJvd3NlciBpcyB0cnlpbmcgdG8gZ2V0IG1lZGlhIGRhdGEsIGJ1dCBkYXRhIGlzIG5vdCBhdmFpbGFibGVcbiAgICBsb3dMZXZlbEV2ZW50cy5zdGFsbGVkID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc3RhbGxcIik7XG4gICAgfTtcbiAgICAvL0ZpcmVzIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcbiAgICBsb3dMZXZlbEV2ZW50cy50aW1ldXBkYXRlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGVsVmlkZW8uY3VycmVudFRpbWU7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gZWxWaWRlby5kdXJhdGlvbjtcbiAgICAgICAgaWYgKGlzTmFOKGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXByb3ZpZGVyLmlzU2Vla2luZygpICYmICFlbFZpZGVvLnBhdXNlZCl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9QTEFZSU5HKTtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gdGltZXVwZGF0ZVwiICwge1xuICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyB8fCBwcm92aWRlci5pc1NlZWtpbmcoKSkge1xuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50cy5yZXNpemUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiByZXNpemVcIik7XG4gICAgfTtcbiAgICBsb3dMZXZlbEV2ZW50cy5zZWVraW5nID0gKCkgPT4ge1xuICAgICAgICBwcm92aWRlci5zZXRTZWVraW5nKHRydWUpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gc2Vla2luZ1wiLCBlbFZpZGVvLmN1cnJlbnRUaW1lKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1NFRUsse1xuICAgICAgICAgICAgcG9zaXRpb24gOiBlbFZpZGVvLmN1cnJlbnRUaW1lXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgbG93TGV2ZWxFdmVudHMuc2Vla2VkID0gKCkgPT4ge1xuICAgICAgICBpZighcHJvdmlkZXIuaXNTZWVraW5nKCkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBzZWVrZWRcIik7XG4gICAgICAgIHByb3ZpZGVyLnNldFNlZWtpbmcoZmFsc2UpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfU0VFS0VEKTtcbiAgICB9O1xuXG4gICAgLy9GaXJlcyB3aGVuIHRoZSB2aWRlbyBzdG9wcyBiZWNhdXNlIGl0IG5lZWRzIHRvIGJ1ZmZlciB0aGUgbmV4dCBmcmFtZVxuICAgIGxvd0xldmVsRXZlbnRzLndhaXRpbmcgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiB3YWl0aW5nXCIsIHByb3ZpZGVyLmdldFN0YXRlKCkpO1xuICAgICAgICBpZihwcm92aWRlci5pc1NlZWtpbmcoKSl7XG4gICAgICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcbiAgICAgICAgfWVsc2UgaWYocHJvdmlkZXIuZ2V0U3RhdGUoKSA9PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX1NUQUxMRUQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLnZvbHVtZWNoYW5nZSA9ICgpID0+IHtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJFdmVudExpc3RlbmVyIDogb24gdm9sdW1lY2hhbmdlXCIsIE1hdGgucm91bmQoZWxWaWRlby52b2x1bWUgKiAxMDApKTtcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwge1xuICAgICAgICAgICAgdm9sdW1lOiBNYXRoLnJvdW5kKGVsVmlkZW8udm9sdW1lICogMTAwKSxcbiAgICAgICAgICAgIG11dGU6IGVsVmlkZW8ubXV0ZWRcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxvd0xldmVsRXZlbnRzLmVycm9yID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb2RlID0gKGVsVmlkZW8uZXJyb3IgJiYgZWxWaWRlby5lcnJvci5jb2RlKSB8fCAwO1xuICAgICAgICBjb25zdCBlcnJvckNvZGVHZW4gPSAoe1xuICAgICAgICAgICAgMDoge2NvZGUgOiBQTEFZRVJfVU5LTldPTl9FUlJPUiwgcmVhc29uIDogXCJVbmtub3duIGh0bWw1IHZpZGVvIGVycm9yXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gaHRtbDUgdmlkZW8gZXJyb3JcIn0sXG4gICAgICAgICAgICAxOiB7Y29kZSA6IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiwgcmVhc29uIDogXCJVbmtub3duIG9wZXJhdGlvbiBhYm9ydGVkXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gb3BlcmF0aW9uIGFib3J0ZWRcIn0sXG4gICAgICAgICAgICAyOiB7Y29kZSA6IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsIHJlYXNvbiA6IFwiVW5rbm93biBuZXR3b3JrIGVycm9yXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gbmV0d29yayBlcnJvclwifSxcbiAgICAgICAgICAgIDM6IHtjb2RlIDogUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gZGVjb2RlIGVycm9yXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gZGVjb2RlIGVycm9yXCJ9LFxuICAgICAgICAgICAgNDoge2NvZGUgOiBQTEFZRVJfRklMRV9FUlJPUiwgcmVhc29uIDogXCJGaWxlIGNvdWxkIG5vdCBiZSBwbGF5ZWRcIiwgbWVzc2FnZSA6IFwiRmlsZSBjb3VsZCBub3QgYmUgcGxheWVkXCJ9XG4gICAgICAgIH1bY29kZV18fDApO1xuICAgICAgICBlcnJvckNvZGVHZW4uZXJyb3IgPSBlbFZpZGVvLmVycm9yO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkV2ZW50TGlzdGVuZXIgOiBvbiBlcnJvclwiLCBlcnJvckNvZGVHZW4pO1xuICAgICAgICBvbkVycm9yKGVycm9yQ29kZUdlbik7XG4gICAgfTtcblxuXG5cbiAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsb3dMZXZlbEV2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgZWxWaWRlby5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgfSk7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiRXZlbnRMaXN0ZW5lciA6IGRlc3Ryb3koKVwiKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhsb3dMZXZlbEV2ZW50cykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgZWxWaWRlby5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbG93TGV2ZWxFdmVudHNbZXZlbnROYW1lXSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyNy4uXG4gKi9cbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcbmltcG9ydCBFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L0xpc3RlbmVyXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZS5qc1wiO1xuaW1wb3J0IFByb21pc2UsIHtyZXNvbHZlZH0gZnJvbSBcImFwaS9zaGltcy9wcm9taXNlXCI7XG5pbXBvcnQge1xuICAgIFNUQVRFX0lETEUsIFNUQVRFX1BMQVlJTkcsIFNUQVRFX1BBVVNFRCwgU1RBVEVfQ09NUExFVEUsXG4gICAgUExBWUVSX1NUQVRFLCBQTEFZRVJfQ09NUExFVEUsIFBMQVlFUl9QQVVTRSwgUExBWUVSX1BMQVksXG4gICAgQ09OVEVOVF9MRVZFTFMsIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5sZXQgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSwgZXh0ZW5kZWRFbGVtZW50KXtcbiAgICBpZihfLmlzRWxlbWVudChleHRlbmRlZEVsZW1lbnQpKXtcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudDtcbiAgICB9XG4gICAgaWYocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9EQVNIKXtcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5nZXRWaWRlb0VsZW1lbnQoKTtcbiAgICB9ZWxzZSBpZihwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX0hMUyl7XG4gICAgICAgIHJldHVybiBleHRlbmRlZEVsZW1lbnQubWVkaWE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBAYnJpZWYgICBDb3JlIEZvciBIdG1sNSBWaWRlby5cbiAqIEBwYXJhbSAgIHByb3ZpZGVyTmFtZSBwcm92aWRlciBuYW1lXG4gKiBAcGFyYW0gICBleHRlbmRlZEVsZW1lbnQgZXh0ZW5kZWQgbWVkaWEgb2JqZWN0IGJ5IG1zZS4gb3IgdmlkZW8gZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xuICogQHBhcmFtICAgb25Mb2FkIG9uIGxvYWQgaGFuZGxlclxuICogKi9cbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24gKHByb3ZpZGVyTmFtZSwgZXh0ZW5kZWRFbGVtZW50LCBwbGF5ZXJDb25maWcsIG9uQmVmb3JlTG9hZCl7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcblxuICAgIGxldCB0aGF0ID17fTtcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XG5cbiAgICBsZXQgZWxWaWRlbyA9IGV4dHJhY3RWaWRlb0VsZW1lbnQocHJvdmlkZXJOYW1lLCBleHRlbmRlZEVsZW1lbnQpO1xuICAgIGxldCBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKHByb3ZpZGVyTmFtZSwgZXh0ZW5kZWRFbGVtZW50LCBlbFZpZGVvLCB0aGF0KTtcbiAgICBsZXQgY2FuU2VlayA9IGZhbHNlO1xuICAgIGxldCBzZWVraW5nID0gZmFsc2U7XG4gICAgbGV0IHN0YXRlID0gU1RBVEVfSURMRTtcbiAgICBsZXQgYnVmZmVyID0gMDtcbiAgICBsZXQgY3VycmVudFF1YWxpdHkgPSAtMTtcbiAgICBsZXQgc291cmNlcyA9IFtdO1xuICAgIC8vbGV0IGlzTGl2ZSA9IGZhbHNlO1xuXG4gICAgbGV0IHBvc3RlckltYWdlID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmltYWdlfHxcIlwiO1xuICAgIGVsVmlkZW8ucGxheWJhY2tSYXRlID0gZWxWaWRlby5kZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWVyQ29uZmlnLmdldERlZmF1bHRQbGF5YmFja1JhdGUoKTtcblxuXG4gICAgY29uc3QgcGlja0N1cnJlbnRRdWFsaXR5ID0gKHNvdXJjZXMpID0+e1xuICAgICAgICB2YXIgcXVhbGl0eSA9IE1hdGgubWF4KDAsIGN1cnJlbnRRdWFsaXR5KTtcbiAgICAgICAgY29uc3QgbGFiZWwgPVwiXCI7XG4gICAgICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxdWFsaXR5O1xuICAgIH07XG5cbiAgICBjb25zdCBfbG9hZCA9IChsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgY29uc3Qgc291cmNlID0gIHNvdXJjZXNbY3VycmVudFF1YWxpdHldO1xuICAgICAgICBpZihvbkJlZm9yZUxvYWQpe1xuICAgICAgICAgICAgb25CZWZvcmVMb2FkKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1NvdXJjZSA9IGVsVmlkZW8uc3JjO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xuXG4gICAgICAgICAgICBzb3VyY2VFbGVtZW50LnNyYyA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2VFbGVtZW50LnNyYyAhPT0gcHJldmlvdXNTb3VyY2UpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICBlbFZpZGVvLnNyYyA9IHNvdXJjZXNbY3VycmVudFF1YWxpdHldLmZpbGU7XG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IGNhbGwgbG9hZCBpZiBzcmMgd2FzIG5vdCBzZXQuIGxvYWQoKSB3aWxsIGNhbmNlbCBhbnkgYWN0aXZlIHBsYXkgcHJvbWlzZS5cbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxWaWRlby5sb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2UgaWYobGFzdFBsYXlQb3NpdGlvbiA9PSAwICYmIGVsVmlkZW8uY3VycmVudFRpbWUgPiAwKXtcbiAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XG4gICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxTLCB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IGN1cnJlbnRRdWFsaXR5XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYocG9zdGVySW1hZ2Upe1xuICAgICAgICAgICAgICAgIGVsVmlkZW8ucG9zdGVyID0gcG9zdGVySW1hZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gcHJvdmlkZXJOYW1lO1xuICAgIH07XG4gICAgdGhhdC5jYW5TZWVrID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrXykgPT4ge1xuICAgICAgICBjYW5TZWVrID0gY2FuU2Vla187XG4gICAgfTtcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XG4gICAgICAgIHJldHVybiBzZWVraW5nO1xuICAgIH07XG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmdfKT0+e1xuICAgICAgICBzZWVraW5nID0gc2Vla2luZ187XG4gICAgfTtcblxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcbiAgICAgICAgaWYoc3RhdGUgIT0gbmV3U3RhdGUpe1xuICAgICAgICAgICAgbGV0IHByZXZTdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKG5ld1N0YXRlKXtcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFX0NPTVBMRVRFIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEVfUEFVU0VEIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QQVVTRSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlOiBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURV9QTEFZSU5HIDpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFBMQVlFUl9QTEFZLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3RhdGU6IHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihQTEFZRVJfU1RBVEUsIHtcbiAgICAgICAgICAgICAgICBwcmV2c3RhdGU6IHByZXZTdGF0ZSxcbiAgICAgICAgICAgICAgICBuZXdzdGF0ZTogc3RhdGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0QnVmZmVyID0gKG5ld0J1ZmZlcikgPT4ge1xuICAgICAgICBidWZmZXIgPSBuZXdCdWZmZXI7XG4gICAgfTtcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICB9O1xuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxuICAgICAgICBsZXQgaXNMaXZlID0gKGVsVmlkZW8uZHVyYXRpb24gPT0gSW5maW5pdHk/IHRydWUgOiAocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9EQVNIPyBleHRlbmRlZEVsZW1lbnQuaXNEeW5hbWljKCkgOiBmYWxzZSkpO1xuICAgICAgICByZXR1cm4gaXNMaXZlID8gIEluZmluaXR5IDogZWxWaWRlby5kdXJhdGlvbjtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBlbFZpZGVvLmN1cnJlbnRUaW1lO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PntcbiAgICAgICAgZWxWaWRlby52b2x1bWUgPSB2b2x1bWUvMTAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8udm9sdW1lKjEwMDtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT57XG5cbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9ICFlbFZpZGVvLm11dGVkO1xuXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgZWxWaWRlby5tdXRlZCA9IHN0YXRlO1xuXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9NVVRFLCB7XG4gICAgICAgICAgICAgICAgbXV0ZTogZWxWaWRlby5tdXRlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIGVsVmlkZW8ubXV0ZWQ7XG4gICAgfTtcblxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzXywgbGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIHNvdXJjZXMgPSBzb3VyY2VzXztcbiAgICAgICAgY3VycmVudFF1YWxpdHkgPSBwaWNrQ3VycmVudFF1YWxpdHkoc291cmNlcyk7XG4gICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChzb3VyY2VzXykgPT57XG4gICAgICAgIHNvdXJjZXMgPSBzb3VyY2VzXztcbiAgICAgICAgY3VycmVudFF1YWxpdHkgPSBwaWNrQ3VycmVudFF1YWxpdHkoc291cmNlcyk7XG4gICAgICAgIF9sb2FkKHNvdXJjZXNfLnN0YXJ0dGltZSB8fCAwKTtcbiAgICB9O1xuXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XG4gICAgICAgIGlmKCB0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgZWxWaWRlby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xuICAgICAgICBpZiggdGhhdC5nZXRTdGF0ZSgpID09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgZWxWaWRlby5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xuICAgICAgICBlbFZpZGVvLmN1cnJlbnRUaW1lID0gcG9zaXRpb247XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xuICAgICAgICB0aGF0LnRyaWdnZXIoUExBWUJBQ0tfUkFURV9DSEFOR0VELCB7cGxheWJhY2tSYXRlIDogcGxheWJhY2tSYXRlfSk7XG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZSA9IGVsVmlkZW8uZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBlbFZpZGVvLnBsYXliYWNrUmF0ZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcbiAgICAgICAgbGV0IHF1YWxpdHlMZXZlbHMgPSBzb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXG4gICAgICAgICAgICAgICAgaW5kZXggOiBpbmRleFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBxdWFsaXR5TGV2ZWxzO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbY3VycmVudFF1YWxpdHldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXG4gICAgICAgICAgICB0eXBlOiBzb3VyY2UudHlwZSxcbiAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXG4gICAgICAgICAgICBpbmRleCA6IGN1cnJlbnRRdWFsaXR5XG4gICAgICAgIH07XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCwgbmVlZFByb3ZpZGVyQ2hhbmdlKSA9PiB7XG4gICAgICAgIGlmKGN1cnJlbnRRdWFsaXR5ID09IHF1YWxpdHlJbmRleCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZihxdWFsaXR5SW5kZXggPiAtMSl7XG4gICAgICAgICAgICBpZihzb3VyY2VzICYmIHNvdXJjZXMubGVuZ3RoID4gcXVhbGl0eUluZGV4KXtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBxdWFsaXR5SW5kZXgpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5ID0gcXVhbGl0eUluZGV4O1xuXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogcXVhbGl0eUluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0UXVhbGl0eUxhYmVsKHNvdXJjZXNbcXVhbGl0eUluZGV4XS5sYWJlbCk7XG4gICAgICAgICAgICAgICAgaWYobmVlZFByb3ZpZGVyQ2hhbmdlKXtcblxuICAgICAgICAgICAgICAgICAgICBfbG9hZChlbFZpZGVvLmN1cnJlbnRUaW1lIHx8IDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFF1YWxpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgncHJlbG9hZCcpO1xuICAgICAgICBlbFZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIHdoaWxlIChlbFZpZGVvLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGVsVmlkZW8ucmVtb3ZlQ2hpbGQoZWxWaWRlby5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICB0aGF0LnN0b3AoKTtcbiAgICAgICAgbGlzdGVuZXIuZGVzdHJveSgpO1xuICAgICAgICAvL2VsVmlkZW8ucmVtb3ZlKCk7XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG4gICAgfTtcblxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxuICovXG5cblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXIgPSBmdW5jdGlvbigpe1xuICAgIGlmKChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPcGVyYVwiKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpKSAhPSAtMSApe1xuICAgICAgICByZXR1cm4gJ29wZXJhJztcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIikgIT0gLTEgKXtcbiAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlNhZmFyaVwiKSAhPSAtMSl7XG4gICAgICAgIHJldHVybiAnc2FmYXJpJztcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpICE9IC0xICl7XG4gICAgICAgIHJldHVybiAnZmlyZWZveCc7XG4gICAgfWVsc2UgaWYoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIikgIT0gLTEgKSl7XG4gICAgICAgIGxldCBtc2llID0gYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpO1xuICAgICAgICBpZighIWRvY3VtZW50LmRvY3VtZW50TW9kZSA9PSB0cnVlICl7XG4gICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgfWVsc2UgaWYoISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LipydlxcOjExXFwuLykpe1xuICAgICAgICAgICAgaWYgKCFpc05hTihwYXJzZUludCh1YS5zdWJzdHJpbmcobXNpZSArIDUsIHVhLmluZGV4T2YoXCIuXCIsIG1zaWUpKSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpZSc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XG4gICAgICAgIH1cblxuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgIH1cblxufTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==