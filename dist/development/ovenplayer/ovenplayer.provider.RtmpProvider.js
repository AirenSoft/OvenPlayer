/*! OvenPlayerv0.8.3 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

                    if (playerConfig.isAutoStart()) {
                        that.play();
                    }

                    if (playerConfig.isMute()) {
                        that.setMute(true);
                    }
                    if (playerConfig.getVolume()) {
                        that.setVolume(playerConfig.getVolume());
                    }

                    return resolve();
                } else {
                    if (retryCount < 100) {
                        setTimeout(checkSwfIsReady, 100);
                    } else {
                        return reject(_constants.ERRORS[_constants.INIT_RTMP_SETUP_ERROR]);
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
    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_RTMP, playerConfig.isLoop());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9tZWRpYS9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2Jyb3dzZXIuanMiXSwibmFtZXMiOlsiTWFuYWdlciIsImNvbnRhaW5lciIsInByb3ZpZGVyVHlwZSIsImxvb3AiLCJ0aGF0Iiwicm9vdElkIiwiZ2V0QXR0cmlidXRlIiwibWVkaWFFbGVtZW50IiwiYnJvd3NlclR5cGUiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImNyZWF0ZU1lZGlhRWxlbWVudCIsIlBST1ZJREVSX1JUTVAiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsIm1vdmllIiwiZmxhc2h2YXJzIiwiYWxsb3dzY3JpcHRhY2Nlc3MiLCJhbGxvd2Z1bGxzY3JlZW4iLCJxdWFsaXR5IiwibmFtZSIsIm1lbnUiLCJxdWFsIiwiYmdjb2xvciIsIlNXRnBhdGgiLCJjcmVhdGUiLCJkZXN0cm95IiwicmVtb3ZlQ2hpbGQiLCJMaXN0ZW5lciIsImVsRmxhc2giLCJwcm92aWRlciIsImlzSlNSZWFkeSIsInRpbWUiLCJkYXRhIiwidHJpZ2dlciIsIkNPTlRFTlRfVElNRSIsIkNPTlRFTlRfQlVGRkVSIiwidm9sdW1lQ2hhbmdlZCIsIkNPTlRFTlRfVk9MVU1FIiwic3RhdGVDaGFuZ2VkIiwic2V0U3RhdGUiLCJuZXdzdGF0ZSIsIlBMQVlFUl9TVEFURSIsIm1ldGFDaGFuZ2VkIiwiQ09OVEVOVF9NRVRBIiwiZXJyb3IiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwiRVJST1IiLCJQcm92aWRlciIsInNwZWMiLCJwbGF5ZXJDb25maWciLCJsaXN0ZW5lciIsImV4dGVuZGVkRWxlbWVudCIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsInNvdXJjZXMiLCJjdXJyZW50U291cmNlIiwicHJldmlvdXNTb3VyY2UiLCJnZXRDdXJyZW50U291cmNlIiwic291cmNlQ2hhbmdlZCIsImZpbGUiLCJsb2FkIiwiZ2V0UG9zaXRpb24iLCJzZWVrIiwicGxheSIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsImZ1bmNOYW1lIiwiZnVuY0RhdGEiLCJnZXROYW1lIiwiY2FuU2VlayIsInNldENhblNlZWsiLCJpc1NlZWtpbmciLCJzZWVraW5nIiwic2V0U2Vla2luZyIsIm5ld1N0YXRlIiwic3RhdGUiLCJnZXRTdGF0ZSIsInNldEJ1ZmZlciIsIm5ld0J1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0TXV0ZSIsImdldE11dGUiLCJwcmVsb2FkIiwicmV0cnlDb3VudCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2hlY2tTd2ZJc1JlYWR5IiwiaXNGbGFzaFJlYWR5IiwiaXNBdXRvU3RhcnQiLCJpc011dGUiLCJzZXRUaW1lb3V0IiwiRVJST1JTIiwiSU5JVF9SVE1QX1NFVFVQX0VSUk9SIiwic291cmNlc18iLCJzdGFydHRpbWUiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsImdldFNvdXJjZXMiLCJtYXAiLCJpbmRleCIsInR5cGUiLCJsYWJlbCIsInNldEN1cnJlbnRTb3VyY2UiLCJzb3VyY2VJbmRleCIsIm5lZWRQcm92aWRlckNoYW5nZSIsImN1cnJlbnRRdWFsaXR5IiwibGVuZ3RoIiwiU1RBVEVfSURMRSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJzZXRTb3VyY2VMYWJlbCIsImdldEN1cnJlbnRUaW1lIiwiZ2V0UXVhbGl0eUxldmVscyIsInF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsInNldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0RnJhbWVyYXRlIiwiZnJhbWVyYXRlIiwic2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImZwcyIsImN1cnJlbnRGcmFtZXMiLCJuZXdQb3NpdGlvbiIsInN0b3AiLCJyZW1vdmUiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyIsIlJ0bXAiLCJzdXBlckRlc3Ryb3lfZnVuYyIsIm1lZGlhTWFuYWdlciIsImlzTG9vcCIsImVsZW1lbnQiLCJpc0xpdmUiLCJidWZmZXIiLCJleHRyYWN0VmlkZW9FbGVtZW50IiwiXyIsImlzRWxlbWVudCIsImdldFZpZGVvRWxlbWVudCIsIm1lZGlhIiwic2VwYXJhdGVMaXZlIiwiaXNEeW5hbWljIiwiZXJyb3JUcmlnZ2VyIiwicGlja0N1cnJlbnRTb3VyY2UiLCJNYXRoIiwibWF4IiwiaSIsImdldFNvdXJjZUxhYmVsIiwiZ2V0QnJvd3Nlckxhbmd1YWdlIiwibmF2Iiwid2luZG93IiwibmF2aWdhdG9yIiwiYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzIiwibGFuZ3VhZ2UiLCJBcnJheSIsImlzQXJyYXkiLCJsYW5ndWFnZXMiLCJnZXRCcm93c2VyIiwidXNlckFnZW50IiwiaW5kZXhPZiIsIm1zaWUiLCJpZSIsInVuZGVmIiwidiIsImRpdiIsImFsbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUJBQWlCLHFCQUF1Qix5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDS3hD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QUFFSixLQWxDSyxNQWtDRDtBQUNELGVBQU8sU0FBUDtBQUNIO0FBRUosQ0EvQ00sQyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIk92ZW5QbGF5ZXJGbGFzaC5zd2ZcIjsiLCIvKipcclxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxyXG4gKiBAcGFyYW0gICB7ZWxlbWVudH0gICBjb250YWluZXIgICBkb20gZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5pbXBvcnQge2dldEJyb3dzZXJ9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XHJcbmltcG9ydCB7UFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IFNXRnBhdGggZnJvbSAnLi4vLi4vLi4vYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YnO1xyXG5cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgcHJvdmlkZXJUeXBlLCBsb29wKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCByb290SWQgPSBjb250YWluZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXJlbnQtaWRcIik7XHJcbiAgICBsZXQgbWVkaWFFbGVtZW50ID0gXCJcIjtcclxuICAgIGxldCBicm93c2VyVHlwZSA9IGdldEJyb3dzZXIoKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgbG9hZGVkLiBicm93c2VyVHlwZSA6IFwiKyBicm93c2VyVHlwZSk7XHJcbiAgICBjb25zdCBjcmVhdGVNZWRpYUVsZW1lbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHByb3ZpZGVyVHlwZSAhPT0gUFJPVklERVJfUlRNUCl7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVSZW1vdGVQbGF5YmFjaycsICcnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnd2Via2l0LXBsYXlzaW5saW5lJywgJycpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICcnKTtcclxuICAgICAgICAgICAgaWYobG9vcCl7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdsb29wJywgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUVsZW1lbnQpO1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IG1vdmllLCBmbGFzaHZhcnMsIGFsbG93c2NyaXB0YWNjZXNzLCBhbGxvd2Z1bGxzY3JlZW4sIHF1YWxpdHksIG5hbWUsIG1lbnUsIHF1YWwsIGJnY29sb3IsIGxvb3A7XHJcbiAgICAgICAgICAgIG1vdmllID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21vdmllJyk7XHJcbiAgICAgICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBTV0ZwYXRoKTtcclxuXHJcbiAgICAgICAgICAgIGZsYXNodmFycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGZsYXNodmFycy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnZmxhc2h2YXJzJyk7XHJcbiAgICAgICAgICAgIC8vcGxheWVySWQgaXMgdG8gdXNlIFNXRiBmb3IgRXh0ZXJuYWxJbnRlcmZhY2UuY2FsbCgpLlxyXG4gICAgICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdwbGF5ZXJJZD0nK3Jvb3RJZCk7XHJcblxyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd3NjcmlwdGFjY2VzcycpO1xyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xyXG5cclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd2Z1bGxzY3JlZW4nKTtcclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAndHJ1ZScpO1xyXG5cclxuICAgICAgICAgICAgcXVhbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIHF1YWxpdHkuc2V0QXR0cmlidXRlKCduYW1lJywgJ3F1YWxpdHknKTtcclxuICAgICAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hlaWdodCcpO1xyXG5cclxuICAgICAgICAgICAgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ25hbWUnKTtcclxuICAgICAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG5cclxuICAgICAgICAgICAgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21lbnUnKTtcclxuICAgICAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2ZhbHNlJyk7XHJcblxyXG4gICAgICAgICAgICBxdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgcXVhbC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xyXG4gICAgICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGlnaCcpO1xyXG5cclxuICAgICAgICAgICAgYmdjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCduYW1lJywgJ2JnY29sb3InKTtcclxuICAgICAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJyMwMDAwMDAnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGxvb3Ape1xyXG4gICAgICAgICAgICAgICAgbG9vcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgICAgICBsb29wLnNldEF0dHJpYnV0ZSgnbmFtZScsICdsb29wJyk7XHJcbiAgICAgICAgICAgICAgICBsb29wLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAndHJ1ZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCByb290SWQrXCItZmxhc2hcIik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCByb290SWQrXCItZmxhc2hcIik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnc2NhbGUnLCAnZGVmYXVsdCcpO1xyXG5cclxuICAgICAgICAgICAgaWYoYnJvd3NlclR5cGUgIT09IFwib2xkSUVcIil7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhJywgU1dGcGF0aCk7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQobW92aWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGxvb3Ape1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGxvb3ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChiZ2NvbG9yKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKHF1YWwpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dmdWxsc2NyZWVuKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGFsbG93c2NyaXB0YWNjZXNzKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGZsYXNodmFycyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lZGlhRWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jcmVhdGUgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgY3JlYXRlRWxlbWVudCgpXCIpO1xyXG4gICAgICAgIGlmKG1lZGlhRWxlbWVudCl7XHJcbiAgICAgICAgICAgIHRoYXQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3JlYXRlTWVkaWFFbGVtZW50KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciByZW1vdmVFbGVtZW50KClcIik7XHJcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKG1lZGlhRWxlbWVudCk7XHJcbiAgICAgICAgbWVkaWFFbGVtZW50ID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI3Li5cclxuICovXHJcbmltcG9ydCB7XHJcbiAgICBFUlJPUixcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX1BBVVNFRCxcclxuICAgIFNUQVRFX0VSUk9SLFxyXG4gICAgQ09OVEVOVF9DT01QTEVURSxcclxuICAgIENPTlRFTlRfU0VFSyxcclxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXHJcbiAgICBDT05URU5UX1NFRUtFRCxcclxuICAgIENPTlRFTlRfQlVGRkVSLFxyXG4gICAgQ09OVEVOVF9USU1FLFxyXG4gICAgQ09OVEVOVF9WT0xVTUUsXHJcbiAgICBDT05URU5UX01FVEEsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXHJcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcclxuICAgIFBMQVlFUl9TVEFURSxcclxuICAgIFBST1ZJREVSX0hUTUw1LFxyXG4gICAgUFJPVklERVJfV0VCUlRDLFxyXG4gICAgUFJPVklERVJfREFTSCxcclxuICAgIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGVsRmxhc2gsIHByb3ZpZGVyKXtcclxuICAgIGxldCB0aGF0ID0ge307XHJcblxyXG4gICAgdGhhdC5pc0pTUmVhZHkgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnRpbWUgPSAoZGF0YSkgPT57XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIGRhdGEpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVIsIGRhdGEpO1xyXG4gICAgfTtcclxuICAgIHRoYXQudm9sdW1lQ2hhbmdlZCA9IChkYXRhKSA9PntcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVk9MVU1FLCBkYXRhKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnN0YXRlQ2hhbmdlZCA9IChkYXRhKSA9PntcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShkYXRhLm5ld3N0YXRlKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFBMQVlFUl9TVEFURSwgZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5tZXRhQ2hhbmdlZCA9IChkYXRhKSA9PntcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5lcnJvciA9IChlcnJvcikgPT57XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xyXG4gICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XHJcblxyXG4gICAgICAgIC8vUFJJVkFURV9TVEFURV9FUlJPUlxyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yKTtcclxuXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCBFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2ZsYXNoL0xpc3RlbmVyXCI7XHJcbmltcG9ydCB7ZXh0cmFjdFZpZGVvRWxlbWVudCwgc2VwYXJhdGVMaXZlLCBwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgRVJST1JTLCBJTklUX1JUTVBfU0VUVVBfRVJST1IsXHJcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgUExBWUVSX1NUQVRFLCBQTEFZRVJfQ09NUExFVEUsIFBMQVlFUl9QQVVTRSwgUExBWUVSX1BMQVksXHJcbiAgICBDT05URU5UX1NPVVJDRV9DSEFOR0VELCBDT05URU5UX0xFVkVMX0NIQU5HRUQsIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELFxyXG4gICAgUExBWUJBQ0tfUkFURV9DSEFOR0VELCBDT05URU5UX01VVEUsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgQ29yZSBGb3IgRmxhc2ggVmlkZW8uXHJcbiAqIEBwYXJhbSAgIHNwZWMgbWVtYmVyIHZhbHVlXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24oc3BlYywgcGxheWVyQ29uZmlnKXtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgbG9hZGVkLiBcIik7XHJcblxyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcclxuXHJcbiAgICBsZXQgbGlzdGVuZXIgPSBFdmVudHNMaXN0ZW5lcihzcGVjLmV4dGVuZGVkRWxlbWVudCwgdGhhdCk7XHJcbiAgICBsZXQgZWxGbGFzaCA9IGV4dHJhY3RWaWRlb0VsZW1lbnQoc3BlYy5leHRlbmRlZEVsZW1lbnQpO1xyXG5cclxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzcGVjLnNvdXJjZXNbc3BlYy5jdXJyZW50U291cmNlXTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gZWxGbGFzaC5nZXRDdXJyZW50U291cmNlKCk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2UuZmlsZSAhPT0gcHJldmlvdXNTb3VyY2UpO1xyXG5cclxuICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICBlbEZsYXNoLmxvYWQoc291cmNlLmZpbGUpO1xyXG4gICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgdGhhdC5nZXRQb3NpdGlvbigpID4gMCl7XHJcbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9UaGlzIGlzIHdoeS4gRmxhc2ggZG9lcyBub3Qgc2VsZiB0cmlnIHRvIGFkcyxsbWFsbSxcclxuICAgIHRoYXQudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsID0gKGZ1bmNOYW1lLCBmdW5jRGF0YSkgPT4ge1xyXG4gICAgICAgIGlmKGxpc3RlbmVyW2Z1bmNOYW1lXSl7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lcltmdW5jTmFtZV0oZnVuY0RhdGEpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXROYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLm5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY2FuU2VlayA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5jYW5TZWVrO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrKSA9PiB7XHJcbiAgICAgICAgc3BlYy5jYW5TZWVrID0gY2FuU2VlaztcclxuICAgIH07XHJcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc2Vla2luZztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZyk9PntcclxuICAgICAgICBzcGVjLnNlZWtpbmcgPSBzZWVraW5nO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XHJcbiAgICAgICAgc3BlYy5zdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5zdGF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEJ1ZmZlciA9IChuZXdCdWZmZXIpID0+IHtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0QnVmZmVyID8gZWxGbGFzaC5nZXRCdWZmZXIoKSA6IG51bGw7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXREdXJhdGlvbiA/IGVsRmxhc2guZ2V0RHVyYXRpb24oKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRQb3NpdGlvbiA/IGVsRmxhc2guZ2V0UG9zaXRpb24oKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guc2V0Vm9sdW1lID8gZWxGbGFzaC5zZXRWb2x1bWUodm9sdW1lKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guc2V0Vm9sdW1lID8gZWxGbGFzaC5nZXRWb2x1bWUoKSA6IDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKCkgPT57XHJcbiAgICAgICAgZWxGbGFzaC5zZXRNdXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0TXV0ZSA/IGVsRmxhc2guZ2V0TXV0ZSgpIDogZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucHJlbG9hZCA9IChzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogcHJlbG9hZCgpIFwiLCBzb3VyY2VzLCBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XHJcblxyXG4gICAgICAgIHNwZWMuc291cmNlcyA9IHNvdXJjZXM7XHJcbiAgICAgICAgc3BlYy5jdXJyZW50U291cmNlID0gcGlja0N1cnJlbnRTb3VyY2Uoc291cmNlcywgc3BlYy5jdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tTd2ZJc1JlYWR5KCl7XHJcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGVsRmxhc2guaXNGbGFzaFJlYWR5ICYmIGVsRmxhc2guaXNGbGFzaFJlYWR5KCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNNdXRlKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE11dGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Vm9sdW1lKHBsYXllckNvbmZpZy5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tTd2ZJc1JlYWR5LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KEVSUk9SU1tJTklUX1JUTVBfU0VUVVBfRVJST1JdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHRoYXQubG9hZCA9IChzb3VyY2VzKSA9PntcclxuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xyXG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcclxuICAgICAgICBfbG9hZChzcGVjLnNvdXJjZXNfLnN0YXJ0dGltZSB8fCAwKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XHJcbiAgICAgICAgaWYoZWxGbGFzaC5wbGF5KXtcclxuICAgICAgICAgICAgZWxGbGFzaC5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKGVsRmxhc2gucGF1c2Upe1xyXG4gICAgICAgICAgICBlbEZsYXNoLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT57XHJcbiAgICAgICAgZWxGbGFzaC5zZWVrKHBvc2l0aW9uKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbEZsYXNoKXtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBzb3VyY2UudHlwZSxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXHJcbiAgICAgICAgICAgICAgICBpbmRleCA6IGluZGV4XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFNvdXJjZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoc291cmNlSW5kZXgsIG5lZWRQcm92aWRlckNoYW5nZSkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMuY3VycmVudFF1YWxpdHkgPT09IHNvdXJjZUluZGV4KXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc291cmNlSW5kZXggPiAtMSl7XHJcbiAgICAgICAgICAgIGlmKHNwZWMuc291cmNlcyAmJiBzcGVjLnNvdXJjZXMubGVuZ3RoID4gc291cmNlSW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHNvdXJjZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHNvdXJjZUluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX1NPVVJDRV9DSEFOR0VELCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNvdXJjZTogc291cmNlSW5kZXhcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VMYWJlbChzcGVjLnNvdXJjZXNbc291cmNlSW5kZXhdLmxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsRmxhc2guZ2V0Q3VycmVudFRpbWUoKSB8fCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxGbGFzaCl7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucXVhbGl0eUxldmVscztcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFlbEZsYXNoKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nXHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nXHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuZnJhbWVyYXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0RnJhbWVyYXRlID0gKGZyYW1lcmF0ZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZSA9IGZyYW1lcmF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PntcclxuICAgICAgICBsZXQgZnBzID0gc3BlYy5mcmFtZXJhdGU7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRGcmFtZXMgPSBlbEZsYXNoLmdldEN1cnJlbnRUaW1lKCkgKiBmcHM7XHJcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gKGN1cnJlbnRGcmFtZXMgKyBmcmFtZUNvdW50KSAvIGZwcztcclxuICAgICAgICBuZXdQb3NpdGlvbiA9IG5ld1Bvc2l0aW9uICsgMC4wMDAwMTsgLy8gRklYRVMgQSBTQUZBUkkgU0VFSyBJU1NVRS4gbXlWZGllby5jdXJyZW50VGltZSA9IDAuMDQgd291bGQgZ2l2ZSBTTVBURSAwMDowMDowMDowMCB3aGVyYXMgaXQgc2hvdWxkIGdpdmUgMDA6MDA6MDA6MDFcclxuXHJcbiAgICAgICAgdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgIHRoYXQuc2VlayhuZXdQb3NpdGlvbik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc3RvcCA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xyXG4gICAgICAgIGVsRmxhc2guc3RvcCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogZGVzdHJveSgpIHBsYXllciBzdG9wLCBsaXN0ZW5lciwgZXZlbnQgZGVzdHJvaWVkXCIpO1xyXG5cclxuICAgICAgICBlbEZsYXNoLnJlbW92ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL1hYWCA6IEkgaG9wZSB1c2luZyBlczYgY2xhc3Nlcy4gYnV0IEkgdGhpbmsgdG8gb2NjdXIgcHJvYmxlbSBmcm9tIE9sZCBJRS4gVGhlbiBJIGNob2ljZSBmdW5jdGlvbiBpbmhlcml0LiBGaW5hbGx5IHVzaW5nIHN1cGVyIGZ1bmN0aW9uIGlzIHNvIGRpZmZpY3VsdC5cclxuICAgIC8vIHVzZSA6IGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTsgLi4uIHN1cGVyX2Rlc3Ryb3koKTtcclxuICAgIHRoYXQuc3VwZXIgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoYXRbbmFtZV07XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDIzLi5cclxuICovXHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7U1RBVEVfSURMRSwgUFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvZmxhc2gvUHJvdmlkZXJcIjtcclxuLyoqXHJcbiAqIEBicmllZiAgIHJ0bXAgcHJvdmlkZXJcclxuICogQHBhcmFtICAgZWxlbWVudCB2aWRlbyBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IFJ0bXAgPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcclxuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyLCBQUk9WSURFUl9SVE1QLCBwbGF5ZXJDb25maWcuaXNMb29wKCkpO1xyXG4gICAgbGV0IGVsZW1lbnQgPSBtZWRpYU1hbmFnZXIuY3JlYXRlKCk7XHJcblxyXG4gICAgbGV0IHNwZWMgPSB7XHJcbiAgICAgICAgbmFtZSA6IFBST1ZJREVSX1JUTVAsXHJcbiAgICAgICAgZXh0ZW5kZWRFbGVtZW50IDogZWxlbWVudCxcclxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXHJcbiAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxyXG4gICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxyXG4gICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcclxuICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXHJcbiAgICAgICAgYnVmZmVyIDogMCxcclxuICAgICAgICBmcmFtZXJhdGUgOiAwLFxyXG4gICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXHJcbiAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxyXG4gICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcclxuICAgICAgICBzb3VyY2VzIDogW11cclxuICAgIH07XHJcblxyXG4gICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgbnVsbCk7XHJcbiAgICBzdXBlckRlc3Ryb3lfZnVuYyAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUlRNUCBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIG1lZGlhTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgbWVkaWFNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBlbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUlRNUCA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XHJcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUnRtcDsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxMi4uXHJcbiAqL1xyXG5pbXBvcnQge0VSUk9SLCBTVEFURV9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0VmlkZW9FbGVtZW50ID0gZnVuY3Rpb24oZXh0ZW5kZWRFbGVtZW50KSB7XHJcbiAgICBpZihfLmlzRWxlbWVudChleHRlbmRlZEVsZW1lbnQpKXtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kZWRFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgaWYoZXh0ZW5kZWRFbGVtZW50LmdldFZpZGVvRWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5nZXRWaWRlb0VsZW1lbnQoKTtcclxuICAgIH1lbHNlIGlmKGV4dGVuZGVkRWxlbWVudC5tZWRpYSl7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5tZWRpYTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlcGFyYXRlTGl2ZSA9IGZ1bmN0aW9uKGV4dGVuZGVkRWxlbWVudCkge1xyXG4gICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXHJcblxyXG4gICAgaWYoZXh0ZW5kZWRFbGVtZW50LmlzRHluYW1pYyl7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudC5pc0R5bmFtaWMoKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBlcnJvclRyaWdnZXIgPSBmdW5jdGlvbihlcnJvciwgcHJvdmlkZXIpe1xyXG4gICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xyXG4gICAgcHJvdmlkZXIucGF1c2UoKTtcclxuICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcGlja0N1cnJlbnRTb3VyY2UgPSAoc291cmNlcywgY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKSA9PiB7XHJcbiAgICBsZXQgc291cmNlSW5kZXggPSBNYXRoLm1heCgwLCBjdXJyZW50U291cmNlKTtcclxuICAgIGNvbnN0IGxhYmVsID1cIlwiO1xyXG4gICAgaWYgKHNvdXJjZXMpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgc291cmNlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNvdXJjZUluZGV4O1xyXG59OyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyTGFuZ3VhZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IG5hdiA9IHdpbmRvdy5uYXZpZ2F0b3IsXHJcbiAgICAgICAgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzID0gWydsYW5ndWFnZScsICdicm93c2VyTGFuZ3VhZ2UnLCAnc3lzdGVtTGFuZ3VhZ2UnLCAndXNlckxhbmd1YWdlJ10sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBsYW5ndWFnZTtcclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBIVE1MIDUuMSBcIm5hdmlnYXRvci5sYW5ndWFnZXNcIlxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmF2Lmxhbmd1YWdlcykpIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmF2Lmxhbmd1YWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsYW5ndWFnZSA9IG5hdi5sYW5ndWFnZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBvdGhlciB3ZWxsIGtub3duIHByb3BlcnRpZXMgaW4gYnJvd3NlcnNcclxuICAgIGZvciAoaSA9IDA7IGkgPCBicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsYW5ndWFnZSA9IG5hdlticm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXNbaV1dO1xyXG4gICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGlmKChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPcGVyYVwiKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpKSAhPSAtMSApe1xyXG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xyXG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpICE9IC0xICl7XHJcbiAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xyXG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpICE9IC0xKXtcclxuICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XHJcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpICE9IC0xICl7XHJcbiAgICAgICAgcmV0dXJuICdmaXJlZm94JztcclxuICAgIH1lbHNlIGlmKChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpICE9IC0xICkpe1xyXG4gICAgICAgIGxldCBtc2llID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKTtcclxuICAgICAgICAvKmlmKCEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09IHRydWUgKXtcclxuICAgICAgICAgICAgcmV0dXJuICdpZSc7XHJcbiAgICAgICAgfWVsc2UgaWYoISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LipydlxcOjExXFwuLykpe1xyXG4gICAgICAgICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llICsgNSwgdWEuaW5kZXhPZihcIi5cIiwgbXNpZSkpKSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaWUnO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuICd1bmtub3duJztcclxuICAgICAgICB9Ki9cclxuICAgICAgICB2YXIgaWUgPSAoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIHZhciB1bmRlZixcclxuICAgICAgICAgICAgICAgIHYgPSAzLFxyXG4gICAgICAgICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgICAgICAgICAgICBhbGwgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKTtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChcclxuICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSAnPCEtLVtpZiBndCBJRSAnICsgKCsrdikgKyAnXT48aT48L2k+PCFbZW5kaWZdLS0+JyxcclxuICAgICAgICAgICAgICAgICAgICBhbGxbMF1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdiA+IDQgPyB2IDogdW5kZWY7XHJcblxyXG4gICAgICAgIH0oKSk7XHJcbiAgICAgICAgaWYoaWUgPCA5KXtcclxuICAgICAgICAgICAgcmV0dXJuICdvbGRJRSc7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiAnbW9kZXJuSUUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=