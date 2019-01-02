/*! OvenPlayerv0.7.9 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

            var test = document.createElement('param');
            test.setAttribute('name', 'SCALE');
            test.setAttribute('value', 'default');

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
            mediaElement.appendChild(test);
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
 * @param   spec member value
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
        var source = spec.sources[spec.currentSource];
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
        spec.currentSource = (0, _utils.pickCurrentSource)(sources, spec.currentSource, playerConfig);

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
        spec.currentSource = (0, _utils.pickCurrentSource)(sources, spec.currentSource, playerConfig);
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
    that.getSources = function () {
        if (!elFlash) {
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
        if (spec.currentQuality === sourceIndex) {
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
                if (needProviderChange) {

                    _load(elFlash.getCurrentTime() || 0);
                }
                return spec.currentSource;
            }
        }
    };

    that.getQualityLevels = function () {
        if (!elFlash) {
            return [];
        }
        return spec.qualityLevels;
    };
    that.getCurrentQuality = function () {
        if (!elFlash) {
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
        var currentFrames = elFlash.getCurrentTime() * fps;
        var newPosition = (currentFrames + frameCount) / fps;
        newPosition = newPosition + 0.00001; // FIXES A SAFARI SEEK ISSUE. myVdieo.currentTime = 0.04 would give SMPTE 00:00:00:00 wheras it should give 00:00:00:01

        that.pause();
        that.seek(newPosition);
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
        framerate: 0,
        currentQuality: -1,
        currentSource: -1,
        qualityLevels: [],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9tZWRpYS9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2Jyb3dzZXIuanMiXSwibmFtZXMiOlsiTWFuYWdlciIsImNvbnRhaW5lciIsInByb3ZpZGVyVHlwZSIsInRoYXQiLCJyb290SWQiLCJnZXRBdHRyaWJ1dGUiLCJtZWRpYUVsZW1lbnQiLCJicm93c2VyVHlwZSIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiY3JlYXRlTWVkaWFFbGVtZW50IiwiUFJPVklERVJfUlRNUCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwibW92aWUiLCJmbGFzaHZhcnMiLCJhbGxvd3NjcmlwdGFjY2VzcyIsImFsbG93ZnVsbHNjcmVlbiIsInF1YWxpdHkiLCJuYW1lIiwibWVudSIsInF1YWwiLCJiZ2NvbG9yIiwiU1dGcGF0aCIsInRlc3QiLCJjcmVhdGUiLCJkZXN0cm95IiwicmVtb3ZlQ2hpbGQiLCJMaXN0ZW5lciIsImVsRmxhc2giLCJwcm92aWRlciIsImlzSlNSZWFkeSIsInRpbWUiLCJkYXRhIiwidHJpZ2dlciIsIkNPTlRFTlRfVElNRSIsIkNPTlRFTlRfQlVGRkVSIiwidm9sdW1lQ2hhbmdlZCIsIkNPTlRFTlRfVk9MVU1FIiwic3RhdGVDaGFuZ2VkIiwic2V0U3RhdGUiLCJuZXdzdGF0ZSIsIlBMQVlFUl9TVEFURSIsIm1ldGFDaGFuZ2VkIiwiQ09OVEVOVF9NRVRBIiwiZXJyb3IiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwiRVJST1IiLCJQcm92aWRlciIsInNwZWMiLCJwbGF5ZXJDb25maWciLCJsaXN0ZW5lciIsImV4dGVuZGVkRWxlbWVudCIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsInNvdXJjZXMiLCJjdXJyZW50U291cmNlIiwicHJldmlvdXNTb3VyY2UiLCJnZXRDdXJyZW50U291cmNlIiwic291cmNlQ2hhbmdlZCIsImZpbGUiLCJsb2FkIiwiZ2V0UG9zaXRpb24iLCJzZWVrIiwicGxheSIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsImZ1bmNOYW1lIiwiZnVuY0RhdGEiLCJnZXROYW1lIiwiY2FuU2VlayIsInNldENhblNlZWsiLCJpc1NlZWtpbmciLCJzZWVraW5nIiwic2V0U2Vla2luZyIsIm5ld1N0YXRlIiwic3RhdGUiLCJnZXRTdGF0ZSIsInNldEJ1ZmZlciIsIm5ld0J1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0TXV0ZSIsImdldE11dGUiLCJwcmVsb2FkIiwicmV0cnlDb3VudCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2hlY2tTd2ZJc1JlYWR5IiwiaXNGbGFzaFJlYWR5Iiwic2V0VGltZW91dCIsInNvdXJjZXNfIiwic3RhcnR0aW1lIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRTb3VyY2VzIiwibWFwIiwiaW5kZXgiLCJ0eXBlIiwibGFiZWwiLCJzZXRDdXJyZW50U291cmNlIiwic291cmNlSW5kZXgiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJjdXJyZW50UXVhbGl0eSIsImxlbmd0aCIsIlNUQVRFX0lETEUiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwic2V0U291cmNlTGFiZWwiLCJnZXRDdXJyZW50VGltZSIsImdldFF1YWxpdHlMZXZlbHMiLCJxdWFsaXR5TGV2ZWxzIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldEZyYW1lcmF0ZSIsImZyYW1lcmF0ZSIsInNldEZyYW1lcmF0ZSIsInNlZWtGcmFtZSIsImZyYW1lQ291bnQiLCJmcHMiLCJjdXJyZW50RnJhbWVzIiwibmV3UG9zaXRpb24iLCJzdG9wIiwicmVtb3ZlIiwibWV0aG9kIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJSdG1wIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJtZWRpYU1hbmFnZXIiLCJlbGVtZW50IiwiaXNMaXZlIiwiYnVmZmVyIiwiZXh0cmFjdFZpZGVvRWxlbWVudCIsIl8iLCJpc0VsZW1lbnQiLCJnZXRWaWRlb0VsZW1lbnQiLCJtZWRpYSIsInNlcGFyYXRlTGl2ZSIsImlzRHluYW1pYyIsImVycm9yVHJpZ2dlciIsInBpY2tDdXJyZW50U291cmNlIiwiTWF0aCIsIm1heCIsImkiLCJnZXRTb3VyY2VMYWJlbCIsImdldEJyb3dzZXIiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJpbmRleE9mIiwibXNpZSIsImllIiwidW5kZWYiLCJ2IiwiZGl2IiwiYWxsIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbm5lckhUTUwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQkFBaUIscUJBQXVCLHlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNLeEM7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFVBQVUsU0FBVkEsT0FBVSxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFpQztBQUM3QyxRQUFNQyxPQUFPLEVBQWI7QUFDQSxRQUFJQyxTQUFTSCxVQUFVSSxZQUFWLENBQXVCLGdCQUF2QixDQUFiO0FBQ0EsUUFBSUMsZUFBZSxFQUFuQjtBQUNBLFFB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U0FBNUIsS0FBMEMsQ0FBQyxDQUE5QyxFQUFpRDtBQUNuRCxlQUFPLFNBQVA7QUFDSCxLQUZLLE1BRUEsSUFBSUYsVUFBVUMsU0FBVixDQUFvQkMsT0FBcEIsQ0FBNEIsTUFBNUIsS0FBdUMsQ0FBQyxDQUE1QyxFQUFnRDtBQUNsRCxZQUFJQyxPQUFPSCxVQUFVQyxTQUFWLENBQW9CQyxPQUFwQixDQUE0QixNQUE1QixDQUFYO0FBQ0E7Ozs7Ozs7Ozs7O0FBV0EsWUFBSUUsS0FBTSxZQUFVOztBQUVoQixnQkFBSUMsS0FBSjtBQUFBLGdCQUNJQyxJQUFJLENBRFI7QUFBQSxnQkFFSUMsTUFBTTFKLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FGVjtBQUFBLGdCQUdJMEosTUFBTUQsSUFBSUUsb0JBQUosQ0FBeUIsR0FBekIsQ0FIVjs7QUFLQSxtQkFDSUYsSUFBSUcsU0FBSixHQUFnQixtQkFBb0IsRUFBRUosQ0FBdEIsR0FBMkIsdUJBQTNDLEVBQ0lFLElBQUksQ0FBSixDQUZSOztBQUtBLG1CQUFPRixJQUFJLENBQUosR0FBUUEsQ0FBUixHQUFZRCxLQUFuQjtBQUVILFNBZFMsRUFBVjtBQWVBLFlBQUdELEtBQUssQ0FBUixFQUFVO0FBQ04sbUJBQU8sT0FBUDtBQUNILFNBRkQsTUFFSztBQUNELG1CQUFPLFVBQVA7QUFDSDtBQUVKLEtBbENLLE1Ba0NEO0FBQ0QsZUFBTyxTQUFQO0FBQ0g7QUFFSixDQS9DTSxDIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiT3ZlblBsYXllckZsYXNoLnN3ZlwiOyIsIi8qKlxyXG4gKiBAYnJpZWYgICDrr7jrlJTslrQg7JeY66as66i87Yq466W8IOq0gOumrO2VmOuKlCDqsJ3ssrQuIO2YhOyerOuKlCDtlZjripQg7J287J20IOunjuyngCDslYrri6QuXHJcbiAqIEBwYXJhbSAgIHtlbGVtZW50fSAgIGNvbnRhaW5lciAgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcbmltcG9ydCB7Z2V0QnJvd3Nlcn0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgU1dGcGF0aCBmcm9tICcuLi8uLi8uLi9hc3NldHMvT3ZlblBsYXllckZsYXNoLnN3Zic7XHJcblxyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyLCBwcm92aWRlclR5cGUpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgbGV0IHJvb3RJZCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmVudC1pZFwiKTtcclxuICAgIGxldCBtZWRpYUVsZW1lbnQgPSBcIlwiO1xyXG4gICAgbGV0IGJyb3dzZXJUeXBlID0gZ2V0QnJvd3NlcigpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBsb2FkZWQuIGJyb3dzZXJUeXBlIDogXCIrIGJyb3dzZXJUeXBlKTtcclxuICAgIGNvbnN0IGNyZWF0ZU1lZGlhRWxlbWVudCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYocHJvdmlkZXJUeXBlICE9PSBQUk9WSURFUl9SVE1QKXtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZVJlbW90ZVBsYXliYWNrJywgJycpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd3ZWJraXQtcGxheXNpbmxpbmUnLCAnJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJycpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBtb3ZpZSwgZmxhc2h2YXJzLCBhbGxvd3NjcmlwdGFjY2VzcywgYWxsb3dmdWxsc2NyZWVuLCBxdWFsaXR5LCBuYW1lLCBtZW51LCBxdWFsLCBiZ2NvbG9yO1xyXG4gICAgICAgICAgICBtb3ZpZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgnbmFtZScsICdtb3ZpZScpO1xyXG4gICAgICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgU1dGcGF0aCk7XHJcblxyXG4gICAgICAgICAgICBmbGFzaHZhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZsYXNodmFycycpO1xyXG4gICAgICAgICAgICAvL3BsYXllcklkIGlzIHRvIHVzZSBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cclxuICAgICAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAncGxheWVySWQ9Jytyb290SWQpO1xyXG5cclxuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dzY3JpcHRhY2Nlc3MnKTtcclxuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCd2YWx1ZScsICdhbHdheXMnKTtcclxuXHJcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dmdWxsc2NyZWVuJyk7XHJcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcclxuXHJcbiAgICAgICAgICAgIHF1YWxpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XHJcbiAgICAgICAgICAgIHF1YWxpdHkuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoZWlnaHQnKTtcclxuXHJcbiAgICAgICAgICAgIG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBuYW1lLnNldEF0dHJpYnV0ZSgnbmFtZScsICduYW1lJyk7XHJcbiAgICAgICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuXHJcbiAgICAgICAgICAgIG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgnbmFtZScsICdtZW51Jyk7XHJcbiAgICAgICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdmYWxzZScpO1xyXG5cclxuICAgICAgICAgICAgcXVhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCduYW1lJywgJ3F1YWxpdHknKTtcclxuICAgICAgICAgICAgcXVhbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hpZ2gnKTtcclxuXHJcbiAgICAgICAgICAgIGJnY29sb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBiZ2NvbG9yLnNldEF0dHJpYnV0ZSgnbmFtZScsICdiZ2NvbG9yJyk7XHJcbiAgICAgICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCd2YWx1ZScsICcjMDAwMDAwJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGVzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIHRlc3Quc2V0QXR0cmlidXRlKCduYW1lJywgJ1NDQUxFJyk7XHJcbiAgICAgICAgICAgIHRlc3Quc2V0QXR0cmlidXRlKCd2YWx1ZScsICdkZWZhdWx0Jyk7XHJcblxyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCByb290SWQrXCItZmxhc2hcIik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCByb290SWQrXCItZmxhc2hcIik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnc2NhbGUnLCAnZGVmYXVsdCcpO1xyXG5cclxuICAgICAgICAgICAgaWYoYnJvd3NlclR5cGUgIT09IFwib2xkSUVcIil7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhJywgU1dGcGF0aCk7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQobW92aWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZCh0ZXN0KTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGJnY29sb3IpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQocXVhbCk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd2Z1bGxzY3JlZW4pO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dzY3JpcHRhY2Nlc3MpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoZmxhc2h2YXJzKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVkaWFFbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNyZWF0ZSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBjcmVhdGVFbGVtZW50KClcIik7XHJcbiAgICAgICAgaWYobWVkaWFFbGVtZW50KXtcclxuICAgICAgICAgICAgdGhhdC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIHJlbW92ZUVsZW1lbnQoKVwiKTtcclxuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuICAgICAgICBtZWRpYUVsZW1lbnQgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjcuLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICAgIEVSUk9SLFxyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9TVEFMTEVELFxyXG4gICAgU1RBVEVfTE9BRElORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfUEFVU0VELFxyXG4gICAgU1RBVEVfRVJST1IsXHJcbiAgICBDT05URU5UX0NPTVBMRVRFLFxyXG4gICAgQ09OVEVOVF9TRUVLLFxyXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcclxuICAgIENPTlRFTlRfU0VFS0VELFxyXG4gICAgQ09OVEVOVF9CVUZGRVIsXHJcbiAgICBDT05URU5UX1RJTUUsXHJcbiAgICBDT05URU5UX1ZPTFVNRSxcclxuICAgIENPTlRFTlRfTUVUQSxcclxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcclxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxyXG4gICAgUExBWUVSX1NUQVRFLFxyXG4gICAgUFJPVklERVJfSFRNTDUsXHJcbiAgICBQUk9WSURFUl9XRUJSVEMsXHJcbiAgICBQUk9WSURFUl9EQVNILFxyXG4gICAgUFJPVklERVJfSExTXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxGbGFzaCwgcHJvdmlkZXIpe1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuXHJcbiAgICB0aGF0LmlzSlNSZWFkeSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIHRoYXQudGltZSA9IChkYXRhKSA9PntcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwgZGF0YSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwgZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC52b2x1bWVDaGFuZ2VkID0gKGRhdGEpID0+e1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIGRhdGEpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc3RhdGVDaGFuZ2VkID0gKGRhdGEpID0+e1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKGRhdGEubmV3c3RhdGUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoUExBWUVSX1NUQVRFLCBkYXRhKTtcclxuICAgIH07XHJcbiAgICB0aGF0Lm1ldGFDaGFuZ2VkID0gKGRhdGEpID0+e1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBkYXRhKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmVycm9yID0gKGVycm9yKSA9PntcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XHJcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcclxuXHJcbiAgICAgICAgLy9QUklWQVRFX1NUQVRFX0VSUk9SXHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IpO1xyXG5cclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDIzLi5cclxuICovXHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXJcIjtcclxuaW1wb3J0IHtleHRyYWN0VmlkZW9FbGVtZW50LCBzZXBhcmF0ZUxpdmUsIHBpY2tDdXJyZW50U291cmNlfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgUExBWUVSX1NUQVRFLCBQTEFZRVJfQ09NUExFVEUsIFBMQVlFUl9QQVVTRSwgUExBWUVSX1BMQVksXHJcbiAgICBDT05URU5UX1NPVVJDRV9DSEFOR0VELCBDT05URU5UX0xFVkVMX0NIQU5HRUQsIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELFxyXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgQ29yZSBGb3IgRmxhc2ggVmlkZW8uXHJcbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24oc3BlYywgcGxheWVyQ29uZmlnKXtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgbG9hZGVkLiBcIik7XHJcblxyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcclxuXHJcbiAgICBsZXQgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihzcGVjLmV4dGVuZGVkRWxlbWVudCwgdGhhdCk7XHJcbiAgICBsZXQgZWxGbGFzaCA9IGV4dHJhY3RWaWRlb0VsZW1lbnQoc3BlYy5leHRlbmRlZEVsZW1lbnQpO1xyXG5cclxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gZWxGbGFzaC5nZXRDdXJyZW50U291cmNlKCk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2UuZmlsZSAhPT0gcHJldmlvdXNTb3VyY2UpO1xyXG5cclxuICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICBlbEZsYXNoLmxvYWQoc291cmNlLmZpbGUpO1xyXG4gICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgdGhhdC5nZXRQb3NpdGlvbigpID4gMCl7XHJcbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9UaGlzIGlzIHdoeS4gRmxhc2ggZG9lcyBub3Qgc2VsZiB0cmlnIHRvIGFkcyxsbWFsbSxcclxuICAgIHRoYXQudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsID0gKGZ1bmNOYW1lLCBmdW5jRGF0YSkgPT4ge1xyXG4gICAgICAgIGlmKGxpc3RlbmVyW2Z1bmNOYW1lXSl7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lcltmdW5jTmFtZV0oZnVuY0RhdGEpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5jYW5TZWVrO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XHJcbiAgICAgICAgc3BlYy5jYW5TZWVrID0gY2FuU2VlaztcclxuICAgIH07XHJcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc2Vla2luZztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcclxuICAgICAgICBzcGVjLnNlZWtpbmcgPSBzZWVraW5nO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XHJcbiAgICAgICAgc3BlYy5zdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5zdGF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0QnVmZmVyID8gZWxGbGFzaC5nZXRCdWZmZXIoKSA6IG51bGw7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXREdXJhdGlvbiA/IGVsRmxhc2guZ2V0RHVyYXRpb24oKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRQb3NpdGlvbiA/IGVsRmxhc2guZ2V0UG9zaXRpb24oKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guc2V0Vm9sdW1lID8gZWxGbGFzaC5zZXRWb2x1bWUodm9sdW1lKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guc2V0Vm9sdW1lID8gZWxGbGFzaC5nZXRWb2x1bWUoKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKCkgPT57XHJcbiAgICAgICAgZWxGbGFzaC5zZXRNdXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0TXV0ZSA/IGVsRmxhc2guZ2V0TXV0ZSgpIDogZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogcHJlbG9hZCgpIFwiLCBzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XHJcblxyXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XHJcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tTd2ZJc1JlYWR5KCl7XHJcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGVsRmxhc2guaXNGbGFzaFJlYWR5ICYmIGVsRmxhc2guaXNGbGFzaFJlYWR5KCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrU3dmSXNSZWFkeSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXMpID0+e1xyXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XHJcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgICAgIF9sb2FkKHNwZWMuc291cmNlc18uc3RhcnR0aW1lIHx8IDApO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcclxuICAgICAgICBpZihlbEZsYXNoLnBsYXkpe1xyXG4gICAgICAgICAgICBlbEZsYXNoLnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGF0LnBhdXNlID0gKCkgPT57XHJcbiAgICAgICAgaWYoZWxGbGFzaC5wYXVzZSl7XHJcbiAgICAgICAgICAgIGVsRmxhc2gucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcclxuICAgICAgICBlbEZsYXNoLnNlZWsocG9zaXRpb24pO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcclxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChzb3VyY2VJbmRleCwgbmVlZFByb3ZpZGVyQ2hhbmdlKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5jdXJyZW50UXVhbGl0eSA9PT0gc291cmNlSW5kZXgpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzb3VyY2VJbmRleCA+IC0xKXtcclxuICAgICAgICAgICAgaWYoc3BlYy5zb3VyY2VzICYmIHNwZWMuc291cmNlcy5sZW5ndGggPiBzb3VyY2VJbmRleCl7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfSURMRSk7XHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgY2hhbmdlZCA6IFwiICsgc291cmNlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gc291cmNlSW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfU09VUkNFX0NIQU5HRUQsIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U291cmNlOiBzb3VyY2VJbmRleFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUxhYmVsKHNwZWMuc291cmNlc1tzb3VyY2VJbmRleF0ubGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgaWYobmVlZFByb3ZpZGVyQ2hhbmdlKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQoZWxGbGFzaC5nZXRDdXJyZW50VGltZSgpIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbEZsYXNoKXtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGV2ZWxzO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nXHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRGcmFtZXJhdGUgPSAoZnJhbWVyYXRlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlID0gZnJhbWVyYXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+e1xyXG4gICAgICAgIGxldCBmcHMgPSBzcGVjLmZyYW1lcmF0ZTtcclxuICAgICAgICBsZXQgY3VycmVudEZyYW1lcyA9IGVsRmxhc2guZ2V0Q3VycmVudFRpbWUoKSAqIGZwcztcclxuICAgICAgICBsZXQgbmV3UG9zaXRpb24gPSAoY3VycmVudEZyYW1lcyArIGZyYW1lQ291bnQpIC8gZnBzO1xyXG4gICAgICAgIG5ld1Bvc2l0aW9uID0gbmV3UG9zaXRpb24gKyAwLjAwMDAxOyAvLyBGSVhFUyBBIFNBRkFSSSBTRUVLIElTU1VFLiBteVZkaWVvLmN1cnJlbnRUaW1lID0gMC4wNCB3b3VsZCBnaXZlIFNNUFRFIDAwOjAwOjAwOjAwIHdoZXJhcyBpdCBzaG91bGQgZ2l2ZSAwMDowMDowMDowMVxyXG5cclxuICAgICAgICB0aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgdGhhdC5zZWVrKG5ld1Bvc2l0aW9uKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XHJcbiAgICAgICAgZWxGbGFzaC5zdG9wKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XHJcblxyXG4gICAgICAgIGVsRmxhc2gucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxyXG4gICAgLy8gdXNlIDogbGV0IHN1cGVyX2Rlc3Ryb3kgID0gdGhhdC5zdXBlcignZGVzdHJveScpOyAuLi4gc3VwZXJfZGVzdHJveSgpO1xyXG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxyXG4gKi9cclxuaW1wb3J0IE1lZGlhTWFuYWdlciBmcm9tIFwiYXBpL21lZGlhL01hbmFnZXJcIjtcclxuaW1wb3J0IHtTVEFURV9JRExFLCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlclwiO1xyXG4vKipcclxuICogQGJyaWVmICAgcnRtcCBwcm92aWRlclxyXG4gKiBAcGFyYW0gICBlbGVtZW50IHZpZGVvIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgUnRtcCA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgcGxheWVyQ29uZmlnKXtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xyXG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIFBST1ZJREVSX1JUTVApO1xyXG4gICAgbGV0IGVsZW1lbnQgPSBtZWRpYU1hbmFnZXIuY3JlYXRlKCk7XHJcblxyXG4gICAgbGV0IHNwZWMgPSB7XHJcbiAgICAgICAgbmFtZSA6IFBST1ZJREVSX1JUTVAsXHJcbiAgICAgICAgZXh0ZW5kZWRFbGVtZW50IDogZWxlbWVudCxcclxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXHJcbiAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxyXG4gICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxyXG4gICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcclxuICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXHJcbiAgICAgICAgYnVmZmVyIDogMCxcclxuICAgICAgICBmcmFtZXJhdGUgOiAwLFxyXG4gICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXHJcbiAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxyXG4gICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcclxuICAgICAgICBzb3VyY2VzIDogW11cclxuICAgIH07XHJcblxyXG4gICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgbnVsbCk7XHJcbiAgICBzdXBlckRlc3Ryb3lfZnVuYyAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUlRNUCBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIG1lZGlhTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgbWVkaWFNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBlbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUlRNUCA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XHJcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUnRtcDsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxMi4uXHJcbiAqL1xyXG5pbXBvcnQge0VSUk9SLCBTVEFURV9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0VmlkZW9FbGVtZW50ID0gZnVuY3Rpb24oZXh0ZW5kZWRFbGVtZW50KSB7XHJcbiAgICBpZihfLmlzRWxlbWVudChleHRlbmRlZEVsZW1lbnQpKXtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgaWYoZXh0ZW5kZWRFbGVtZW50LmdldFZpZGVvRWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5nZXRWaWRlb0VsZW1lbnQoKTtcclxuICAgIH1lbHNlIGlmKGV4dGVuZGVkRWxlbWVudC5tZWRpYSl7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5tZWRpYTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlcGFyYXRlTGl2ZSA9IGZ1bmN0aW9uKGV4dGVuZGVkRWxlbWVudCkge1xyXG4gICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXHJcblxyXG4gICAgaWYoZXh0ZW5kZWRFbGVtZW50LmlzRHluYW1pYyl7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5pc0R5bmFtaWMoKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBlcnJvclRyaWdnZXIgPSBmdW5jdGlvbihlcnJvciwgcHJvdmlkZXIpe1xyXG4gICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xyXG4gICAgcHJvdmlkZXIucGF1c2UoKTtcclxuICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcGlja0N1cnJlbnRTb3VyY2UgPSAoc291cmNlcywgY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKSA9PiB7XHJcbiAgICBsZXQgc291cmNlSW5kZXggPSBNYXRoLm1heCgwLCBjdXJyZW50U291cmNlKTtcclxuICAgIGNvbnN0IGxhYmVsID1cIlwiO1xyXG4gICAgaWYgKHNvdXJjZXMpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgc291cmNlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNvdXJjZUluZGV4O1xyXG59OyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxyXG4gKi9cclxuXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBpZigobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT3BlcmFcIikgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPUFInKSkgIT0gLTEgKXtcclxuICAgICAgICByZXR1cm4gJ29wZXJhJztcclxuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKSAhPSAtMSApe1xyXG4gICAgICAgIHJldHVybiAnY2hyb21lJztcclxuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlNhZmFyaVwiKSAhPSAtMSl7XHJcbiAgICAgICAgcmV0dXJuICdzYWZhcmknO1xyXG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiRmlyZWZveFwiKSAhPSAtMSApe1xyXG4gICAgICAgIHJldHVybiAnZmlyZWZveCc7XHJcbiAgICB9ZWxzZSBpZigobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKSAhPSAtMSApKXtcclxuICAgICAgICBsZXQgbXNpZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIik7XHJcbiAgICAgICAgLyppZighIWRvY3VtZW50LmRvY3VtZW50TW9kZSA9PSB0cnVlICl7XHJcbiAgICAgICAgICAgIHJldHVybiAnaWUnO1xyXG4gICAgICAgIH1lbHNlIGlmKCEhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvVHJpZGVudC4qcnZcXDoxMVxcLi8pKXtcclxuICAgICAgICAgICAgaWYgKCFpc05hTihwYXJzZUludCh1YS5zdWJzdHJpbmcobXNpZSArIDUsIHVhLmluZGV4T2YoXCIuXCIsIG1zaWUpKSkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2llJztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgdmFyIGllID0gKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICB2YXIgdW5kZWYsXHJcbiAgICAgICAgICAgICAgICB2ID0gMyxcclxuICAgICAgICAgICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICAgICAgICAgICAgYWxsID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJyk7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoXHJcbiAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgZ3QgSUUgJyArICgrK3YpICsgJ10+PGk+PC9pPjwhW2VuZGlmXS0tPicsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsWzBdXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHYgPiA0ID8gdiA6IHVuZGVmO1xyXG5cclxuICAgICAgICB9KCkpO1xyXG4gICAgICAgIGlmKGllIDwgOSl7XHJcbiAgICAgICAgICAgIHJldHVybiAnb2xkSUUnO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gJ21vZGVybklFJztcclxuICAgICAgICB9XHJcblxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuICd1bmtub3duJztcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9