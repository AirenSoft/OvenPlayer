/*! OvenPlayerv0.7.65 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.RtmpProvider"],{

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

/***/ "./src/js/api/provider/flash/Listener.js":
/*!***********************************************!*\
  !*** ./src/js/api/provider/flash/Listener.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var Listener = function Listener(elFlash, provider) {
    var that = {};

    that.isJSReady = function () {
        return true;
    };
    that.time = function (data) {
        provider.trigger(_constants.CONTENT_TIME, data);
        provider.trigger(_constants.CONTENT_BUFFER, data);
    };
    that.volumeChanged = function (data) {
        provider.trigger(_constants.CONTENT_VOLUME, data);
    };
    that.stateChanged = function (data) {
        provider.setState(data.newstate);
        provider.trigger(_constants.PLAYER_STATE, data);
    };
    that.metaChanged = function (data) {
        provider.trigger(_constants.CONTENT_META, data);
    };
    that.error = function (error) {
        provider.setState(_constants.STATE_ERROR);
        provider.pause();

        //PRIVATE_STATE_ERROR
        provider.trigger(_constants.ERROR, error);
    };
    return that;
}; /**
    * Created by hoho on 2018. 8. 27..
    */
exports["default"] = Listener;

/***/ }),

/***/ "./src/js/api/provider/flash/Provider.js":
/*!***********************************************!*\
  !*** ./src/js/api/provider/flash/Provider.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _EventEmitter = __webpack_require__(/*! api/EventEmitter */ "./src/js/api/EventEmitter.js");

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _Listener = __webpack_require__(/*! api/provider/flash/Listener */ "./src/js/api/provider/flash/Listener.js");

var _Listener2 = _interopRequireDefault(_Listener);

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   Core For Flash Video.
 * @param   element flash object element
 * @param   playerConfig  player config
 * */

/**
 * Created by hoho on 2018. 8. 23..
 */
var Provider = function Provider(spec, playerConfig) {
    OvenPlayerConsole.log("CORE loaded. ");

    var that = {};
    (0, _EventEmitter2["default"])(that);

    var listener = (0, _Listener2["default"])(spec.extendedElement, that);
    var elFlash = (0, _utils.extractVideoElement)(spec.extendedElement);

    var _load = function _load(lastPlayPosition) {
        var source = spec.sources[spec.currentQuality];
        OvenPlayerConsole.log("source loaded : ", source, "lastPlayPosition : " + lastPlayPosition);
        var previousSource = elFlash.getCurrentSource();
        var sourceChanged = source.file !== previousSource;

        if (sourceChanged) {
            elFlash.load(source.file);
        } else if (lastPlayPosition === 0 && that.getPosition() > 0) {
            that.seek(lastPlayPosition);
        }
        if (lastPlayPosition > 0) {
            that.seek(lastPlayPosition);
            that.play();
        }
        that.trigger(_constants.CONTENT_LEVELS, {
            currentQuality: spec.currentQuality
        });
    };

    //This is why. Flash does not self trig to ads,lmalm,
    that.triggerEventFromExternal = function (funcName, funcData) {
        if (listener[funcName]) {
            return listener[funcName](funcData);
        } else {
            return null;
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
        spec.state = newState;
    };
    that.getState = function () {
        return spec.state;
    };
    that.setBuffer = function (newBuffer) {};
    that.getBuffer = function () {
        return elFlash.getBuffer ? elFlash.getBuffer() : null;
    };
    that.getDuration = function () {
        return elFlash.getDuration ? elFlash.getDuration() : 0;
    };
    that.getPosition = function () {
        return elFlash.getPosition ? elFlash.getPosition() : 0;
    };
    that.setVolume = function (volume) {
        return elFlash.setVolume ? elFlash.setVolume(volume) : 0;
    };
    that.getVolume = function () {
        return elFlash.setVolume ? elFlash.getVolume() : 0;
    };
    that.setMute = function () {
        elFlash.setMute();
    };
    that.getMute = function () {
        return elFlash.getMute ? elFlash.getMute() : false;
    };

    that.preload = function (sources, lastPlayPosition) {
        OvenPlayerConsole.log("CORE : preload() ", sources, lastPlayPosition);
        var retryCount = 0;

        spec.sources = sources;
        spec.currentQuality = (0, _utils.pickCurrentQualityIndex)(sources, spec.currentQuality, playerConfig);

        return new Promise(function (resolve, reject) {
            (function checkSwfIsReady() {
                retryCount++;

                if (elFlash.isFlashReady && elFlash.isFlashReady()) {
                    _load(lastPlayPosition || 0);
                    return resolve();
                } else {
                    if (retryCount < 100) {
                        setTimeout(checkSwfIsReady, 100);
                    } else {
                        return reject();
                    }
                }
            })();
        });
    };
    that.load = function (sources) {
        spec.sources = sources;
        spec.currentQuality = (0, _utils.pickCurrentQualityIndex)(sources, spec.currentQuality, playerConfig);
        _load(spec.sources_.starttime || 0);
    };

    that.play = function () {
        if (elFlash.play) {
            elFlash.play();
        }
    };
    that.pause = function () {
        if (elFlash.pause) {
            elFlash.pause();
        }
    };
    that.seek = function (position) {
        elFlash.seek(position);
    };
    that.setPlaybackRate = function (playbackRate) {
        return 0;
    };
    that.getPlaybackRate = function () {
        return 0;
    };
    that.getQualityLevels = function () {
        var qualityLevels = spec.sources.map(function (source, index) {
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

                    _load(elFlash.getCurrentTime() || 0);
                }
                return spec.currentQuality;
            }
        }
    };

    that.stop = function () {
        OvenPlayerConsole.log("CORE : stop() ");
        elFlash.stop();
    };

    that.destroy = function () {
        OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied");

        elFlash.remove();
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

/***/ "./src/js/api/provider/flash/providers/Rtmp.js":
/*!*****************************************************!*\
  !*** ./src/js/api/provider/flash/providers/Rtmp.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Manager = __webpack_require__(/*! api/media/Manager */ "./src/js/api/media/Manager.js");

var _Manager2 = _interopRequireDefault(_Manager);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _Provider = __webpack_require__(/*! api/provider/flash/Provider */ "./src/js/api/provider/flash/Provider.js");

var _Provider2 = _interopRequireDefault(_Provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   rtmp provider
 * @param   element video element.
 * @param   playerConfig    config.
 * */

var Rtmp = function Rtmp(container, playerConfig) {
    var that = {};
    var superDestroy_func = null;
    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_RTMP);
    var element = mediaManager.create();

    var spec = {
        name: _constants.PROVIDER_RTMP,
        extendedElement: element,
        listener: null,
        canSeek: false,
        isLive: false,
        seeking: false,
        state: _constants.STATE_IDLE,
        buffer: 0,
        currentQuality: -1,
        sources: []
    };

    that = (0, _Provider2["default"])(spec, playerConfig, null);
    superDestroy_func = that["super"]('destroy');

    OvenPlayerConsole.log("RTMP PROVIDER LOADED.");

    that.destroy = function () {
        mediaManager.destroy();
        mediaManager = null;
        element = null;

        OvenPlayerConsole.log("RTMP : PROVIDER DESTROYED.");
        superDestroy_func();
    };

    return that;
}; /**
    * Created by hoho on 2018. 8. 23..
    */
exports["default"] = Rtmp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9tZWRpYS9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2Jyb3dzZXIuanMiXSwibmFtZXMiOlsiTWFuYWdlciIsImNvbnRhaW5lciIsInByb3ZpZGVyVHlwZSIsInRoYXQiLCJyb290SWQiLCJnZXRBdHRyaWJ1dGUiLCJtZWRpYUVsZW1lbnQiLCJicm93c2VyVHlwZSIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiY3JlYXRlTWVkaWFFbGVtZW50IiwiUFJPVklERVJfUlRNUCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwibW92aWUiLCJmbGFzaHZhcnMiLCJhbGxvd3NjcmlwdGFjY2VzcyIsImFsbG93ZnVsbHNjcmVlbiIsInF1YWxpdHkiLCJuYW1lIiwibWVudSIsInF1YWwiLCJiZ2NvbG9yIiwiU1dGcGF0aCIsImNyZWF0ZSIsImRlc3Ryb3kiLCJyZW1vdmVDaGlsZCIsIkxpc3RlbmVyIiwiZWxGbGFzaCIsInByb3ZpZGVyIiwiaXNKU1JlYWR5IiwidGltZSIsImRhdGEiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9USU1FIiwiQ09OVEVOVF9CVUZGRVIiLCJ2b2x1bWVDaGFuZ2VkIiwiQ09OVEVOVF9WT0xVTUUiLCJzdGF0ZUNoYW5nZWQiLCJzZXRTdGF0ZSIsIm5ld3N0YXRlIiwiUExBWUVSX1NUQVRFIiwibWV0YUNoYW5nZWQiLCJDT05URU5UX01FVEEiLCJlcnJvciIsIlNUQVRFX0VSUk9SIiwicGF1c2UiLCJFUlJPUiIsIlByb3ZpZGVyIiwic3BlYyIsInBsYXllckNvbmZpZyIsImxpc3RlbmVyIiwiZXh0ZW5kZWRFbGVtZW50IiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwic291cmNlcyIsImN1cnJlbnRRdWFsaXR5IiwicHJldmlvdXNTb3VyY2UiLCJnZXRDdXJyZW50U291cmNlIiwic291cmNlQ2hhbmdlZCIsImZpbGUiLCJsb2FkIiwiZ2V0UG9zaXRpb24iLCJzZWVrIiwicGxheSIsIkNPTlRFTlRfTEVWRUxTIiwidHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsIiwiZnVuY05hbWUiLCJmdW5jRGF0YSIsImdldE5hbWUiLCJjYW5TZWVrIiwic2V0Q2FuU2VlayIsImlzU2Vla2luZyIsInNlZWtpbmciLCJzZXRTZWVraW5nIiwibmV3U3RhdGUiLCJzdGF0ZSIsImdldFN0YXRlIiwic2V0QnVmZmVyIiwibmV3QnVmZmVyIiwiZ2V0QnVmZmVyIiwiZ2V0RHVyYXRpb24iLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRNdXRlIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJyZXRyeUNvdW50IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjaGVja1N3ZklzUmVhZHkiLCJpc0ZsYXNoUmVhZHkiLCJzZXRUaW1lb3V0Iiwic291cmNlc18iLCJzdGFydHRpbWUiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsImdldFF1YWxpdHlMZXZlbHMiLCJxdWFsaXR5TGV2ZWxzIiwibWFwIiwiaW5kZXgiLCJ0eXBlIiwibGFiZWwiLCJnZXRDdXJyZW50UXVhbGl0eSIsInNldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwibmVlZFByb3ZpZGVyQ2hhbmdlIiwibGVuZ3RoIiwiU1RBVEVfSURMRSIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsInNldFF1YWxpdHlMYWJlbCIsImdldEN1cnJlbnRUaW1lIiwic3RvcCIsInJlbW92ZSIsIm1ldGhvZCIsImFwcGx5IiwiYXJndW1lbnRzIiwiUnRtcCIsInN1cGVyRGVzdHJveV9mdW5jIiwibWVkaWFNYW5hZ2VyIiwiZWxlbWVudCIsImlzTGl2ZSIsImJ1ZmZlciIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJfIiwiaXNFbGVtZW50IiwiZ2V0VmlkZW9FbGVtZW50IiwibWVkaWEiLCJzZXBhcmF0ZUxpdmUiLCJpc0R5bmFtaWMiLCJlcnJvclRyaWdnZXIiLCJwaWNrQ3VycmVudFF1YWxpdHlJbmRleCIsImN1cnJlbnRRdWFsaXR5SW5kZXgiLCJNYXRoIiwibWF4IiwiaSIsImdldFF1YWxpdHlMYWJlbCIsImdldEJyb3dzZXIiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJpbmRleE9mIiwibXNpZSIsImllIiwidW5kZWYiLCJ2IiwiZGl2IiwiYWxsIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbm5lckhUTUwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQkFBaUIscUJBQXVCLHlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNLeEM7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFVBQVUsU0FBVkEsT0FBVSxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFpQztBQUM3QyxRQUFNQyxPQUFPLEVBQWI7QUFDQSxRQUFJQyxTQUFTSCxVQUFVSSxZQUFWLENBQXVCLGdCQUF2QixDQUFiO0FBQ0EsUUFBSUMsZUFBZSxFQUFuQjtBQUNBLFFBQUlDLGNBQWMsMEJBQWxCOztBQUVBQyxzQkFBa0JDLEdBQWxCLENBQXNCLHdDQUF1Q0YsV0FBN0Q7QUFDQSxRQUFNRyxxQkFBcUIsU0FBckJBLGtCQUFxQixHQUFVO0FBQ2pDLFlBQUdSLGlCQUFpQlMsd0JBQXBCLEVBQWtDO0FBQzlCTCwyQkFBZU0sU0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFm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Q0FBb0JDLE9BQXBCLENBQTRCLE1BQTVCLENBQVg7QUFDQTs7Ozs7Ozs7Ozs7QUFXQSxZQUFJRSxLQUFNLFlBQVU7O0FBRWhCLGdCQUFJQyxLQUFKO0FBQUEsZ0JBQ0lDLElBQUksQ0FEUjtBQUFBLGdCQUVJQyxNQUFNNUksU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUZWO0FBQUEsZ0JBR0k0SSxNQUFNRCxJQUFJRSxvQkFBSixDQUF5QixHQUF6QixDQUhWOztBQUtBLG1CQUNJRixJQUFJRyxTQUFKLEdBQWdCLG1CQUFvQixFQUFFSixDQUF0QixHQUEyQix1QkFBM0MsRUFDSUUsSUFBSSxDQUFKLENBRlI7O0FBS0EsbUJBQU9GLElBQUksQ0FBSixHQUFRQSxDQUFSLEdBQVlELEtBQW5CO0FBRUgsU0FkUyxFQUFWO0FBZUEsWUFBR0QsS0FBSyxDQUFSLEVBQVU7QUFDTixtQkFBTyxPQUFQO0FBQ0gsU0FGRCxNQUVLO0FBQ0QsbUJBQU8sVUFBUDtBQUNIO0FBRUosS0FsQ0ssTUFrQ0Q7QUFDRCxlQUFPLFNBQVA7QUFDSDtBQUVKLENBL0NNLEMiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJPdmVuUGxheWVyRmxhc2guc3dmXCI7IiwiLyoqXHJcbiAqIEBicmllZiAgIOuvuOuUlOyWtCDsl5jrpqzrqLztirjrpbwg6rSA66as7ZWY64qUIOqwneyytC4g7ZiE7J6s64qUIO2VmOuKlCDsnbzsnbQg66eO7KeAIOyViuuLpC5cclxuICogQHBhcmFtICAge2VsZW1lbnR9ICAgY29udGFpbmVyICAgZG9tIGVsZW1lbnRcclxuICpcclxuICogKi9cclxuaW1wb3J0IHtnZXRCcm93c2VyfSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xyXG5pbXBvcnQge1BST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBTV0ZwYXRoIGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9PdmVuUGxheWVyRmxhc2guc3dmJztcclxuXHJcbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbihjb250YWluZXIsIHByb3ZpZGVyVHlwZSl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBsZXQgcm9vdElkID0gY29udGFpbmVyLmdldEF0dHJpYnV0ZShcImRhdGEtcGFyZW50LWlkXCIpO1xyXG4gICAgbGV0IG1lZGlhRWxlbWVudCA9IFwiXCI7XHJcbiAgICBsZXQgYnJvd3NlclR5cGUgPSBnZXRCcm93c2VyKCk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGxvYWRlZC4gYnJvd3NlclR5cGUgOiBcIisgYnJvd3NlclR5cGUpO1xyXG4gICAgY29uc3QgY3JlYXRlTWVkaWFFbGVtZW50ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihwcm92aWRlclR5cGUgIT09IFBST1ZJREVSX1JUTVApe1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlUmVtb3RlUGxheWJhY2snLCAnJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dlYmtpdC1wbGF5c2lubGluZScsICcnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAnJyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUVsZW1lbnQpO1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IG1vdmllLCBmbGFzaHZhcnMsIGFsbG93c2NyaXB0YWNjZXNzLCBhbGxvd2Z1bGxzY3JlZW4sIHF1YWxpdHksIG5hbWUsIG1lbnUsIHF1YWwsIGJnY29sb3I7XHJcbiAgICAgICAgICAgIG1vdmllID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21vdmllJyk7XHJcbiAgICAgICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBTV0ZwYXRoKTtcclxuXHJcbiAgICAgICAgICAgIGZsYXNodmFycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGZsYXNodmFycy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnZmxhc2h2YXJzJyk7XHJcbiAgICAgICAgICAgIC8vcGxheWVySWQgdXNlcyBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cclxuICAgICAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAncGxheWVySWQ9Jytyb290SWQpO1xyXG5cclxuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dzY3JpcHRhY2Nlc3MnKTtcclxuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCd2YWx1ZScsICdhbHdheXMnKTtcclxuXHJcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dmdWxsc2NyZWVuJyk7XHJcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcclxuXHJcbiAgICAgICAgICAgIHF1YWxpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XHJcbiAgICAgICAgICAgIHF1YWxpdHkuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoZWlnaHQnKTtcclxuXHJcbiAgICAgICAgICAgIG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBuYW1lLnNldEF0dHJpYnV0ZSgnbmFtZScsICduYW1lJyk7XHJcbiAgICAgICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuXHJcbiAgICAgICAgICAgIG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgnbmFtZScsICdtZW51Jyk7XHJcbiAgICAgICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdmYWxzZScpO1xyXG5cclxuICAgICAgICAgICAgcXVhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCduYW1lJywgJ3F1YWxpdHknKTtcclxuICAgICAgICAgICAgcXVhbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hpZ2gnKTtcclxuXHJcbiAgICAgICAgICAgIGJnY29sb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBiZ2NvbG9yLnNldEF0dHJpYnV0ZSgnbmFtZScsICdiZ2NvbG9yJyk7XHJcbiAgICAgICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCd2YWx1ZScsICcjMDAwMDAwJyk7XHJcblxyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCByb290SWQrXCItZmxhc2hcIik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCByb290SWQrXCItZmxhc2hcIik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGJyb3dzZXJUeXBlICE9PSBcIm9sZElFXCIpe1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YScsIFNXRnBhdGgpO1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCcpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzaWQnLCAnY2xzaWQ6RDI3Q0RCNkUtQUU2RC0xMWNmLTk2QjgtNDQ0NTUzNTQwMDAwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKG1vdmllKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoYmdjb2xvcik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChxdWFsKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGFsbG93ZnVsbHNjcmVlbik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd3NjcmlwdGFjY2Vzcyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lZGlhRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZWRpYUVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY3JlYXRlID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGNyZWF0ZUVsZW1lbnQoKVwiKTtcclxuICAgICAgICBpZihtZWRpYUVsZW1lbnQpe1xyXG4gICAgICAgICAgICB0aGF0LmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU1lZGlhRWxlbWVudCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgcmVtb3ZlRWxlbWVudCgpXCIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChtZWRpYUVsZW1lbnQpO1xyXG4gICAgICAgIG1lZGlhRWxlbWVudCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNy4uXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gICAgRVJST1IsXHJcbiAgICBTVEFURV9JRExFLFxyXG4gICAgU1RBVEVfUExBWUlORyxcclxuICAgIFNUQVRFX1NUQUxMRUQsXHJcbiAgICBTVEFURV9MT0FESU5HLFxyXG4gICAgU1RBVEVfQ09NUExFVEUsXHJcbiAgICBTVEFURV9QQVVTRUQsXHJcbiAgICBTVEFURV9FUlJPUixcclxuICAgIENPTlRFTlRfQ09NUExFVEUsXHJcbiAgICBDT05URU5UX1NFRUssXHJcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxyXG4gICAgQ09OVEVOVF9TRUVLRUQsXHJcbiAgICBDT05URU5UX0JVRkZFUixcclxuICAgIENPTlRFTlRfVElNRSxcclxuICAgIENPTlRFTlRfVk9MVU1FLFxyXG4gICAgQ09OVEVOVF9NRVRBLFxyXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxyXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXHJcbiAgICBQTEFZRVJfU1RBVEUsXHJcbiAgICBQUk9WSURFUl9IVE1MNSxcclxuICAgIFBST1ZJREVSX1dFQlJUQyxcclxuICAgIFBST1ZJREVSX0RBU0gsXHJcbiAgICBQUk9WSURFUl9ITFNcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihlbEZsYXNoLCBwcm92aWRlcil7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG5cclxuICAgIHRoYXQuaXNKU1JlYWR5ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC50aW1lID0gKGRhdGEpID0+e1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FLCBkYXRhKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSLCBkYXRhKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnZvbHVtZUNoYW5nZWQgPSAoZGF0YSkgPT57XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwgZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zdGF0ZUNoYW5nZWQgPSAoZGF0YSkgPT57XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoZGF0YS5uZXdzdGF0ZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZRVJfU1RBVEUsIGRhdGEpO1xyXG4gICAgfTtcclxuICAgIHRoYXQubWV0YUNoYW5nZWQgPSAoZGF0YSkgPT57XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIGRhdGEpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZXJyb3IgPSAoZXJyb3IpID0+e1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcclxuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xyXG5cclxuICAgICAgICAvL1BSSVZBVEVfU1RBVEVfRVJST1JcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvcik7XHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxyXG4gKi9cclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9mbGFzaC9MaXN0ZW5lclwiO1xyXG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIHNlcGFyYXRlTGl2ZSwgcGlja0N1cnJlbnRRdWFsaXR5SW5kZXh9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuaW1wb3J0IHtcclxuICAgIFNUQVRFX0lETEUsIFNUQVRFX1BMQVlJTkcsIFNUQVRFX1BBVVNFRCwgU1RBVEVfQ09NUExFVEUsXHJcbiAgICBQTEFZRVJfU1RBVEUsIFBMQVlFUl9DT01QTEVURSwgUExBWUVSX1BBVVNFLCBQTEFZRVJfUExBWSxcclxuICAgIENPTlRFTlRfTEVWRUxTLCBDT05URU5UX0xFVkVMX0NIQU5HRUQsIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELFxyXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgQ29yZSBGb3IgRmxhc2ggVmlkZW8uXHJcbiAqIEBwYXJhbSAgIGVsZW1lbnQgZmxhc2ggb2JqZWN0IGVsZW1lbnRcclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICBwbGF5ZXIgY29uZmlnXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgUHJvdmlkZXIgPSBmdW5jdGlvbihzcGVjLCBwbGF5ZXJDb25maWcpe1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcclxuXHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xyXG5cclxuICAgIGxldCBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKHNwZWMuZXh0ZW5kZWRFbGVtZW50LCB0aGF0KTtcclxuICAgIGxldCBlbEZsYXNoID0gZXh0cmFjdFZpZGVvRWxlbWVudChzcGVjLmV4dGVuZGVkRWxlbWVudCk7XHJcblxyXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gIHNwZWMuc291cmNlc1tzcGVjLmN1cnJlbnRRdWFsaXR5XTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gZWxGbGFzaC5nZXRDdXJyZW50U291cmNlKCk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2UuZmlsZSAhPT0gcHJldmlvdXNTb3VyY2UpO1xyXG5cclxuICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICBlbEZsYXNoLmxvYWQoc291cmNlLmZpbGUpO1xyXG4gICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgdGhhdC5nZXRQb3NpdGlvbigpID4gMCl7XHJcbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTFMsIHtcclxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IHNwZWMuY3VycmVudFF1YWxpdHlcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy9UaGlzIGlzIHdoeS4gRmxhc2ggZG9lcyBub3Qgc2VsZiB0cmlnIHRvIGFkcyxsbWFsbSxcclxuICAgIHRoYXQudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsID0gKGZ1bmNOYW1lLCBmdW5jRGF0YSkgPT4ge1xyXG4gICAgICAgIGlmKGxpc3RlbmVyW2Z1bmNOYW1lXSl7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lcltmdW5jTmFtZV0oZnVuY0RhdGEpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5jYW5TZWVrO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XHJcbiAgICAgICAgc3BlYy5jYW5TZWVrID0gY2FuU2VlaztcclxuICAgIH07XHJcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc2Vla2luZztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcclxuICAgICAgICBzcGVjLnNlZWtpbmcgPSBzZWVraW5nO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XHJcbiAgICAgICAgc3BlYy5zdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5zdGF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0QnVmZmVyID8gZWxGbGFzaC5nZXRCdWZmZXIoKSA6IG51bGw7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXREdXJhdGlvbiA/IGVsRmxhc2guZ2V0RHVyYXRpb24oKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRQb3NpdGlvbiA/IGVsRmxhc2guZ2V0UG9zaXRpb24oKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guc2V0Vm9sdW1lID8gZWxGbGFzaC5zZXRWb2x1bWUodm9sdW1lKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guc2V0Vm9sdW1lID8gZWxGbGFzaC5nZXRWb2x1bWUoKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKCkgPT57XHJcbiAgICAgICAgZWxGbGFzaC5zZXRNdXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0TXV0ZSA/IGVsRmxhc2guZ2V0TXV0ZSgpIDogZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogcHJlbG9hZCgpIFwiLCBzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XHJcblxyXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XHJcbiAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IHBpY2tDdXJyZW50UXVhbGl0eUluZGV4KHNvdXJjZXMsIHNwZWMuY3VycmVudFF1YWxpdHksIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja1N3ZklzUmVhZHkoKXtcclxuICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZsYXNoUmVhZHkgJiYgZWxGbGFzaC5pc0ZsYXNoUmVhZHkoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQobGFzdFBsYXlQb3NpdGlvbiB8fCAwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tTd2ZJc1JlYWR5LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XHJcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcclxuICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gcGlja0N1cnJlbnRRdWFsaXR5SW5kZXgoc291cmNlcywgc3BlYy5jdXJyZW50UXVhbGl0eSwgcGxheWVyQ29uZmlnKTtcclxuICAgICAgICBfbG9hZChzcGVjLnNvdXJjZXNfLnN0YXJ0dGltZSB8fCAwKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XHJcbiAgICAgICAgaWYoZWxGbGFzaC5wbGF5KXtcclxuICAgICAgICAgICAgZWxGbGFzaC5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKGVsRmxhc2gucGF1c2Upe1xyXG4gICAgICAgICAgICBlbEZsYXNoLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT57XHJcbiAgICAgICAgZWxGbGFzaC5zZWVrKHBvc2l0aW9uKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBxdWFsaXR5TGV2ZWxzID0gc3BlYy5zb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcclxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcXVhbGl0eUxldmVscztcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciBzb3VyY2UgPSBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50UXVhbGl0eV07XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXHJcbiAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxyXG4gICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxyXG4gICAgICAgICAgICBpbmRleCA6IHNwZWMuY3VycmVudFF1YWxpdHlcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcclxuICAgICAgICBpZihzcGVjLmN1cnJlbnRRdWFsaXR5ID09PSBxdWFsaXR5SW5kZXgpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihxdWFsaXR5SW5kZXggPiAtMSl7XHJcbiAgICAgICAgICAgIGlmKHNwZWMuc291cmNlcyAmJiBzcGVjLnNvdXJjZXMubGVuZ3RoID4gcXVhbGl0eUluZGV4KXtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBxdWFsaXR5SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IHF1YWxpdHlJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IHF1YWxpdHlJbmRleFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFF1YWxpdHlMYWJlbChzcGVjLnNvdXJjZXNbcXVhbGl0eUluZGV4XS5sYWJlbCk7XHJcbiAgICAgICAgICAgICAgICBpZihuZWVkUHJvdmlkZXJDaGFuZ2Upe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfbG9hZChlbEZsYXNoLmdldEN1cnJlbnRUaW1lKCkgfHwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XHJcbiAgICAgICAgZWxGbGFzaC5zdG9wKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XHJcblxyXG4gICAgICAgIGVsRmxhc2gucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxyXG4gICAgLy8gdXNlIDogbGV0IHN1cGVyX2Rlc3Ryb3kgID0gdGhhdC5zdXBlcignZGVzdHJveScpOyAuLi4gc3VwZXJfZGVzdHJveSgpO1xyXG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxyXG4gKi9cclxuaW1wb3J0IE1lZGlhTWFuYWdlciBmcm9tIFwiYXBpL21lZGlhL01hbmFnZXJcIjtcclxuaW1wb3J0IHtTVEFURV9JRExFLCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlclwiO1xyXG4vKipcclxuICogQGJyaWVmICAgcnRtcCBwcm92aWRlclxyXG4gKiBAcGFyYW0gICBlbGVtZW50IHZpZGVvIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgUnRtcCA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgcGxheWVyQ29uZmlnKXtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xyXG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIFBST1ZJREVSX1JUTVApO1xyXG4gICAgbGV0IGVsZW1lbnQgPSBtZWRpYU1hbmFnZXIuY3JlYXRlKCk7XHJcblxyXG4gICAgbGV0IHNwZWMgPSB7XHJcbiAgICAgICAgbmFtZSA6IFBST1ZJREVSX1JUTVAsXHJcbiAgICAgICAgZXh0ZW5kZWRFbGVtZW50IDogZWxlbWVudCxcclxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXHJcbiAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxyXG4gICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxyXG4gICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcclxuICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXHJcbiAgICAgICAgYnVmZmVyIDogMCxcclxuICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxyXG4gICAgICAgIHNvdXJjZXMgOiBbXVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBudWxsKTtcclxuICAgIHN1cGVyRGVzdHJveV9mdW5jICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJSVE1QIFBST1ZJREVSIExPQURFRC5cIik7XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICBtZWRpYU1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIGVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJSVE1QIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcclxuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSdG1wOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxMi4uXG4gKi9cbmltcG9ydCB7RVJST1IsIFNUQVRFX0VSUk9SfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKGV4dGVuZGVkRWxlbWVudCkge1xuICAgIGlmKF8uaXNFbGVtZW50KGV4dGVuZGVkRWxlbWVudCkpe1xuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50O1xuICAgIH1cbiAgICBpZihleHRlbmRlZEVsZW1lbnQuZ2V0VmlkZW9FbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5nZXRWaWRlb0VsZW1lbnQoKTtcbiAgICB9ZWxzZSBpZihleHRlbmRlZEVsZW1lbnQubWVkaWEpe1xuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50Lm1lZGlhO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUxpdmUgPSBmdW5jdGlvbihleHRlbmRlZEVsZW1lbnQpIHtcbiAgICAvL1RvRG8gOiBZb3UgY29uc2lkZXIgaGxzanMuIEJ1dCBub3Qgbm93IGJlY2F1c2Ugd2UgZG9uJ3Qgc3VwcG9ydCBobHNqcy5cblxuICAgIGlmKGV4dGVuZGVkRWxlbWVudC5pc0R5bmFtaWMpe1xuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50LmlzRHluYW1pYygpO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGVycm9yVHJpZ2dlciA9IGZ1bmN0aW9uKGVycm9yLCBwcm92aWRlcil7XG4gICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xuICAgIHByb3ZpZGVyLnBhdXNlKCk7XG4gICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBwaWNrQ3VycmVudFF1YWxpdHlJbmRleCA9IChzb3VyY2VzLCBjdXJyZW50UXVhbGl0eUluZGV4LCBwbGF5ZXJDb25maWcpID0+IHtcbiAgICBsZXQgcXVhbGl0eSA9IE1hdGgubWF4KDAsIGN1cnJlbnRRdWFsaXR5SW5kZXgpO1xuICAgIGNvbnN0IGxhYmVsID1cIlwiO1xuICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1YWxpdHk7XG59OyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cbiAqL1xuXG5cbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyID0gZnVuY3Rpb24oKXtcbiAgICBpZigobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT3BlcmFcIikgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPUFInKSkgIT0gLTEgKXtcbiAgICAgICAgcmV0dXJuICdvcGVyYSc7XG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpICE9IC0xICl7XG4gICAgICAgIHJldHVybiAnY2hyb21lJztcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJTYWZhcmlcIikgIT0gLTEpe1xuICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiRmlyZWZveFwiKSAhPSAtMSApe1xuICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xuICAgIH1lbHNlIGlmKChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpICE9IC0xICkpe1xuICAgICAgICBsZXQgbXNpZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIik7XG4gICAgICAgIC8qaWYoISFkb2N1bWVudC5kb2N1bWVudE1vZGUgPT0gdHJ1ZSApe1xuICAgICAgICAgICAgcmV0dXJuICdpZSc7XG4gICAgICAgIH1lbHNlIGlmKCEhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvVHJpZGVudC4qcnZcXDoxMVxcLi8pKXtcbiAgICAgICAgICAgIGlmICghaXNOYU4ocGFyc2VJbnQodWEuc3Vic3RyaW5nKG1zaWUgKyA1LCB1YS5pbmRleE9mKFwiLlwiLCBtc2llKSkpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnaWUnO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgICAgICB9Ki9cbiAgICAgICAgdmFyIGllID0gKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciB1bmRlZixcbiAgICAgICAgICAgICAgICB2ID0gMyxcbiAgICAgICAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgICAgICBhbGwgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKTtcblxuICAgICAgICAgICAgd2hpbGUgKFxuICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSAnPCEtLVtpZiBndCBJRSAnICsgKCsrdikgKyAnXT48aT48L2k+PCFbZW5kaWZdLS0+JyxcbiAgICAgICAgICAgICAgICAgICAgYWxsWzBdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIHYgPiA0ID8gdiA6IHVuZGVmO1xuXG4gICAgICAgIH0oKSk7XG4gICAgICAgIGlmKGllIDwgOSl7XG4gICAgICAgICAgICByZXR1cm4gJ29sZElFJztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gJ21vZGVybklFJztcbiAgICAgICAgfVxuXG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiAndW5rbm93bic7XG4gICAgfVxuXG59O1xuXG4iXSwic291cmNlUm9vdCI6IiJ9