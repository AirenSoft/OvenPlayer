/*! OvenPlayerv0.9.1 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
            mediaElement.setAttribute('webkit-playsinline', 'true');
            mediaElement.setAttribute('playsinline', 'true');
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
    if (provider) {
        provider.setState(_constants.STATE_ERROR);
        provider.pause();
        provider.trigger(_constants.ERROR, error);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9tZWRpYS9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2Jyb3dzZXIuanMiXSwibmFtZXMiOlsiTWFuYWdlciIsImNvbnRhaW5lciIsInByb3ZpZGVyVHlwZSIsImxvb3AiLCJ0aGF0Iiwicm9vdElkIiwiZ2V0QXR0cmlidXRlIiwibWVkaWFFbGVtZW50IiwiYnJvd3NlclR5cGUiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImNyZWF0ZU1lZGlhRWxlbWVudCIsIlBST1ZJREVSX1JUTVAiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsIm1vdmllIiwiZmxhc2h2YXJzIiwiYWxsb3dzY3JpcHRhY2Nlc3MiLCJhbGxvd2Z1bGxzY3JlZW4iLCJxdWFsaXR5IiwibmFtZSIsIm1lbnUiLCJxdWFsIiwiYmdjb2xvciIsIlNXRnBhdGgiLCJjcmVhdGUiLCJkZXN0cm95IiwicmVtb3ZlQ2hpbGQiLCJMaXN0ZW5lciIsImVsRmxhc2giLCJwcm92aWRlciIsImlzSlNSZWFkeSIsInRpbWUiLCJkYXRhIiwidHJpZ2dlciIsIkNPTlRFTlRfVElNRSIsIkNPTlRFTlRfQlVGRkVSIiwidm9sdW1lQ2hhbmdlZCIsIkNPTlRFTlRfVk9MVU1FIiwic3RhdGVDaGFuZ2VkIiwic2V0U3RhdGUiLCJuZXdzdGF0ZSIsIlBMQVlFUl9TVEFURSIsIm1ldGFDaGFuZ2VkIiwiQ09OVEVOVF9NRVRBIiwiZXJyb3IiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwiRVJST1IiLCJQcm92aWRlciIsInNwZWMiLCJwbGF5ZXJDb25maWciLCJsaXN0ZW5lciIsImV4dGVuZGVkRWxlbWVudCIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsInNvdXJjZXMiLCJjdXJyZW50U291cmNlIiwicHJldmlvdXNTb3VyY2UiLCJnZXRDdXJyZW50U291cmNlIiwic291cmNlQ2hhbmdlZCIsImZpbGUiLCJsb2FkIiwiZ2V0UG9zaXRpb24iLCJzZWVrIiwicGxheSIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsImZ1bmNOYW1lIiwiZnVuY0RhdGEiLCJnZXROYW1lIiwiY2FuU2VlayIsInNldENhblNlZWsiLCJpc1NlZWtpbmciLCJzZWVraW5nIiwic2V0U2Vla2luZyIsIm5ld1N0YXRlIiwic3RhdGUiLCJnZXRTdGF0ZSIsInNldEJ1ZmZlciIsIm5ld0J1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0TXV0ZSIsImdldE11dGUiLCJwcmVsb2FkIiwicmV0cnlDb3VudCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2hlY2tTd2ZJc1JlYWR5IiwiaXNGbGFzaFJlYWR5IiwiaXNBdXRvU3RhcnQiLCJpc011dGUiLCJzZXRUaW1lb3V0IiwiRVJST1JTIiwiSU5JVF9SVE1QX1NFVFVQX0VSUk9SIiwic291cmNlc18iLCJzdGFydHRpbWUiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsImdldFNvdXJjZXMiLCJtYXAiLCJpbmRleCIsInR5cGUiLCJsYWJlbCIsInNldEN1cnJlbnRTb3VyY2UiLCJzb3VyY2VJbmRleCIsIm5lZWRQcm92aWRlckNoYW5nZSIsImN1cnJlbnRRdWFsaXR5IiwibGVuZ3RoIiwiU1RBVEVfSURMRSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJzZXRTb3VyY2VMYWJlbCIsImdldEN1cnJlbnRUaW1lIiwiZ2V0UXVhbGl0eUxldmVscyIsInF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsInNldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0RnJhbWVyYXRlIiwiZnJhbWVyYXRlIiwic2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImZwcyIsImN1cnJlbnRGcmFtZXMiLCJuZXdQb3NpdGlvbiIsInN0b3AiLCJyZW1vdmUiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyIsIlJ0bXAiLCJzdXBlckRlc3Ryb3lfZnVuYyIsIm1lZGlhTWFuYWdlciIsImlzTG9vcCIsImVsZW1lbnQiLCJpc0xpdmUiLCJidWZmZXIiLCJleHRyYWN0VmlkZW9FbGVtZW50IiwiXyIsImlzRWxlbWVudCIsImdldFZpZGVvRWxlbWVudCIsIm1lZGlhIiwic2VwYXJhdGVMaXZlIiwiaXNEeW5hbWljIiwiZXJyb3JUcmlnZ2VyIiwicGlja0N1cnJlbnRTb3VyY2UiLCJNYXRoIiwibWF4IiwiaSIsImdldFNvdXJjZUxhYmVsIiwiZ2V0QnJvd3Nlckxhbmd1YWdlIiwibmF2Iiwid2luZG93IiwibmF2aWdhdG9yIiwiYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzIiwibGFuZ3VhZ2UiLCJBcnJheSIsImlzQXJyYXkiLCJsYW5ndWFnZXMiLCJnZXRCcm93c2VyIiwidXNlckFnZW50IiwiaW5kZXhPZiIsIm1zaWUiLCJpZSIsInVuZGVmIiwidiIsImRpdiIsImFsbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUJBQWlCLHFCQUF1Qix5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDS3hD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RkQsTUFFSztBQUNELG1CQUFPLFVBQVA7QUFDSDtBQUVKLEtBbENLLE1Ba0NEO0FBQ0QsZUFBTyxTQUFQO0FBQ0g7QUFFSixDQS9DTSxDIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiT3ZlblBsYXllckZsYXNoLnN3ZlwiOyIsIi8qKlxyXG4gKiBAYnJpZWYgICDrr7jrlJTslrQg7JeY66as66i87Yq466W8IOq0gOumrO2VmOuKlCDqsJ3ssrQuIO2YhOyerOuKlCDtlZjripQg7J287J20IOunjuyngCDslYrri6QuXHJcbiAqIEBwYXJhbSAgIHtlbGVtZW50fSAgIGNvbnRhaW5lciAgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcbmltcG9ydCB7Z2V0QnJvd3Nlcn0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgU1dGcGF0aCBmcm9tICcuLi8uLi8uLi9hc3NldHMvT3ZlblBsYXllckZsYXNoLnN3Zic7XHJcblxyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyLCBwcm92aWRlclR5cGUsIGxvb3Ape1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgbGV0IHJvb3RJZCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmVudC1pZFwiKTtcclxuICAgIGxldCBtZWRpYUVsZW1lbnQgPSBcIlwiO1xyXG4gICAgbGV0IGJyb3dzZXJUeXBlID0gZ2V0QnJvd3NlcigpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBsb2FkZWQuIGJyb3dzZXJUeXBlIDogXCIrIGJyb3dzZXJUeXBlKTtcclxuICAgIGNvbnN0IGNyZWF0ZU1lZGlhRWxlbWVudCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYocHJvdmlkZXJUeXBlICE9PSBQUk9WSURFUl9SVE1QKXtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZVJlbW90ZVBsYXliYWNrJywgJycpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd3ZWJraXQtcGxheXNpbmxpbmUnLCAndHJ1ZScpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XHJcbiAgICAgICAgICAgIGlmKGxvb3Ape1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnbG9vcCcsICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBtb3ZpZSwgZmxhc2h2YXJzLCBhbGxvd3NjcmlwdGFjY2VzcywgYWxsb3dmdWxsc2NyZWVuLCBxdWFsaXR5LCBuYW1lLCBtZW51LCBxdWFsLCBiZ2NvbG9yLCBsb29wO1xyXG4gICAgICAgICAgICBtb3ZpZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgnbmFtZScsICdtb3ZpZScpO1xyXG4gICAgICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgU1dGcGF0aCk7XHJcblxyXG4gICAgICAgICAgICBmbGFzaHZhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZsYXNodmFycycpO1xyXG4gICAgICAgICAgICAvL3BsYXllcklkIGlzIHRvIHVzZSBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cclxuICAgICAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAncGxheWVySWQ9Jytyb290SWQpO1xyXG5cclxuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dzY3JpcHRhY2Nlc3MnKTtcclxuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCd2YWx1ZScsICdhbHdheXMnKTtcclxuXHJcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dmdWxsc2NyZWVuJyk7XHJcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcclxuXHJcbiAgICAgICAgICAgIHF1YWxpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XHJcbiAgICAgICAgICAgIHF1YWxpdHkuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoZWlnaHQnKTtcclxuXHJcbiAgICAgICAgICAgIG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBuYW1lLnNldEF0dHJpYnV0ZSgnbmFtZScsICduYW1lJyk7XHJcbiAgICAgICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuXHJcbiAgICAgICAgICAgIG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgnbmFtZScsICdtZW51Jyk7XHJcbiAgICAgICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdmYWxzZScpO1xyXG5cclxuICAgICAgICAgICAgcXVhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCduYW1lJywgJ3F1YWxpdHknKTtcclxuICAgICAgICAgICAgcXVhbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hpZ2gnKTtcclxuXHJcbiAgICAgICAgICAgIGJnY29sb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBiZ2NvbG9yLnNldEF0dHJpYnV0ZSgnbmFtZScsICdiZ2NvbG9yJyk7XHJcbiAgICAgICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCd2YWx1ZScsICcjMDAwMDAwJyk7XHJcblxyXG4gICAgICAgICAgICBpZihsb29wKXtcclxuICAgICAgICAgICAgICAgIGxvb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICAgICAgbG9vcC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbG9vcCcpO1xyXG4gICAgICAgICAgICAgICAgbG9vcC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0Jyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCduYW1lJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAlJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NjYWxlJywgJ2RlZmF1bHQnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGJyb3dzZXJUeXBlICE9PSBcIm9sZElFXCIpe1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YScsIFNXRnBhdGgpO1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCcpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzaWQnLCAnY2xzaWQ6RDI3Q0RCNkUtQUU2RC0xMWNmLTk2QjgtNDQ0NTUzNTQwMDAwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKG1vdmllKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihsb29wKXtcclxuICAgICAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChsb29wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoYmdjb2xvcik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChxdWFsKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGFsbG93ZnVsbHNjcmVlbik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd3NjcmlwdGFjY2Vzcyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lZGlhRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZWRpYUVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY3JlYXRlID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGNyZWF0ZUVsZW1lbnQoKVwiKTtcclxuICAgICAgICBpZihtZWRpYUVsZW1lbnQpe1xyXG4gICAgICAgICAgICB0aGF0LmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU1lZGlhRWxlbWVudCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgcmVtb3ZlRWxlbWVudCgpXCIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChtZWRpYUVsZW1lbnQpO1xyXG4gICAgICAgIG1lZGlhRWxlbWVudCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNy4uXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gICAgRVJST1IsXHJcbiAgICBTVEFURV9JRExFLFxyXG4gICAgU1RBVEVfUExBWUlORyxcclxuICAgIFNUQVRFX1NUQUxMRUQsXHJcbiAgICBTVEFURV9MT0FESU5HLFxyXG4gICAgU1RBVEVfQ09NUExFVEUsXHJcbiAgICBTVEFURV9QQVVTRUQsXHJcbiAgICBTVEFURV9FUlJPUixcclxuICAgIENPTlRFTlRfQ09NUExFVEUsXHJcbiAgICBDT05URU5UX1NFRUssXHJcbiAgICBDT05URU5UX0JVRkZFUl9GVUxMLFxyXG4gICAgQ09OVEVOVF9TRUVLRUQsXHJcbiAgICBDT05URU5UX0JVRkZFUixcclxuICAgIENPTlRFTlRfVElNRSxcclxuICAgIENPTlRFTlRfVk9MVU1FLFxyXG4gICAgQ09OVEVOVF9NRVRBLFxyXG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLFxyXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsXHJcbiAgICBQTEFZRVJfU1RBVEUsXHJcbiAgICBQUk9WSURFUl9IVE1MNSxcclxuICAgIFBST1ZJREVSX1dFQlJUQyxcclxuICAgIFBST1ZJREVSX0RBU0gsXHJcbiAgICBQUk9WSURFUl9ITFNcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuY29uc3QgTGlzdGVuZXIgPSBmdW5jdGlvbihlbEZsYXNoLCBwcm92aWRlcil7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG5cclxuICAgIHRoYXQuaXNKU1JlYWR5ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC50aW1lID0gKGRhdGEpID0+e1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FLCBkYXRhKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSLCBkYXRhKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnZvbHVtZUNoYW5nZWQgPSAoZGF0YSkgPT57XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwgZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zdGF0ZUNoYW5nZWQgPSAoZGF0YSkgPT57XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoZGF0YS5uZXdzdGF0ZSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZRVJfU1RBVEUsIGRhdGEpO1xyXG4gICAgfTtcclxuICAgIHRoYXQubWV0YUNoYW5nZWQgPSAoZGF0YSkgPT57XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX01FVEEsIGRhdGEpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZXJyb3IgPSAoZXJyb3IpID0+e1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcclxuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xyXG5cclxuICAgICAgICAvL1BSSVZBVEVfU1RBVEVfRVJST1JcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvcik7XHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxyXG4gKi9cclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgRXZlbnRzTGlzdGVuZXIgZnJvbSBcImFwaS9wcm92aWRlci9mbGFzaC9MaXN0ZW5lclwiO1xyXG5pbXBvcnQge2V4dHJhY3RWaWRlb0VsZW1lbnQsIHNlcGFyYXRlTGl2ZSwgcGlja0N1cnJlbnRTb3VyY2V9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuaW1wb3J0IHtcclxuICAgIEVSUk9SUywgSU5JVF9SVE1QX1NFVFVQX0VSUk9SLFxyXG4gICAgU1RBVEVfSURMRSwgU1RBVEVfUExBWUlORywgU1RBVEVfUEFVU0VELCBTVEFURV9DT01QTEVURSxcclxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLFxyXG4gICAgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwgQ09OVEVOVF9MRVZFTF9DSEFOR0VELCBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCxcclxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIENvcmUgRm9yIEZsYXNoIFZpZGVvLlxyXG4gKiBAcGFyYW0gICBzcGVjIG1lbWJlciB2YWx1ZVxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgIHBsYXllciBjb25maWdcclxuICogKi9cclxuXHJcblxyXG5jb25zdCBQcm92aWRlciA9IGZ1bmN0aW9uKHNwZWMsIHBsYXllckNvbmZpZyl7XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIGxvYWRlZC4gXCIpO1xyXG5cclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XHJcblxyXG4gICAgbGV0IGxpc3RlbmVyID0gRXZlbnRzTGlzdGVuZXIoc3BlYy5leHRlbmRlZEVsZW1lbnQsIHRoYXQpO1xyXG4gICAgbGV0IGVsRmxhc2ggPSBleHRyYWN0VmlkZW9FbGVtZW50KHNwZWMuZXh0ZW5kZWRFbGVtZW50KTtcclxuXHJcbiAgICBjb25zdCBfbG9hZCA9IChsYXN0UGxheVBvc2l0aW9uKSA9PntcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSAgc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFNvdXJjZV07XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICBjb25zdCBwcmV2aW91c1NvdXJjZSA9IGVsRmxhc2guZ2V0Q3VycmVudFNvdXJjZSgpO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZUNoYW5nZWQgPSAoc291cmNlLmZpbGUgIT09IHByZXZpb3VzU291cmNlKTtcclxuXHJcbiAgICAgICAgaWYgKHNvdXJjZUNoYW5nZWQpIHtcclxuICAgICAgICAgICAgZWxGbGFzaC5sb2FkKHNvdXJjZS5maWxlKTtcclxuICAgICAgICB9ZWxzZSBpZihsYXN0UGxheVBvc2l0aW9uID09PSAwICYmIHRoYXQuZ2V0UG9zaXRpb24oKSA+IDApe1xyXG4gICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcclxuICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vVGhpcyBpcyB3aHkuIEZsYXNoIGRvZXMgbm90IHNlbGYgdHJpZyB0byBhZHMsbG1hbG0sXHJcbiAgICB0aGF0LnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCA9IChmdW5jTmFtZSwgZnVuY0RhdGEpID0+IHtcclxuICAgICAgICBpZihsaXN0ZW5lcltmdW5jTmFtZV0pe1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVuZXJbZnVuY05hbWVdKGZ1bmNEYXRhKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5uYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY2FuU2VlaztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldENhblNlZWsgPSAoY2FuU2VlaykgPT4ge1xyXG4gICAgICAgIHNwZWMuY2FuU2VlayA9IGNhblNlZWs7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc1NlZWtpbmcgPSAoKT0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnNlZWtpbmc7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmcpPT57XHJcbiAgICAgICAgc3BlYy5zZWVraW5nID0gc2Vla2luZztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zZXRTdGF0ZSA9IChuZXdTdGF0ZSkgPT4ge1xyXG4gICAgICAgIHNwZWMuc3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc3RhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldEJ1ZmZlciA/IGVsRmxhc2guZ2V0QnVmZmVyKCkgOiBudWxsO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0RHVyYXRpb24gPyBlbEZsYXNoLmdldER1cmF0aW9uKCkgOiAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVsRmxhc2guZ2V0UG9zaXRpb24gPyBlbEZsYXNoLmdldFBvc2l0aW9uKCkgOiAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBlbEZsYXNoLnNldFZvbHVtZSA/IGVsRmxhc2guc2V0Vm9sdW1lKHZvbHVtZSkgOiAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBlbEZsYXNoLnNldFZvbHVtZSA/IGVsRmxhc2guZ2V0Vm9sdW1lKCkgOiAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9ICgpID0+e1xyXG4gICAgICAgIGVsRmxhc2guc2V0TXV0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldE11dGUgPyBlbEZsYXNoLmdldE11dGUoKSA6IGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnByZWxvYWQgPSAoc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbikgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHByZWxvYWQoKSBcIiwgc291cmNlcywgbGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xyXG5cclxuICAgICAgICBzcGVjLnNvdXJjZXMgPSBzb3VyY2VzO1xyXG4gICAgICAgIHNwZWMuY3VycmVudFNvdXJjZSA9IHBpY2tDdXJyZW50U291cmNlKHNvdXJjZXMsIHNwZWMuY3VycmVudFNvdXJjZSwgcGxheWVyQ29uZmlnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrU3dmSXNSZWFkeSgpe1xyXG4gICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcclxuXHJcbiAgICAgICAgICAgICAgICBpZihlbEZsYXNoLmlzRmxhc2hSZWFkeSAmJiBlbEZsYXNoLmlzRmxhc2hSZWFkeSgpKXtcclxuICAgICAgICAgICAgICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uIHx8IDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzTXV0ZSgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRNdXRlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFZvbHVtZShwbGF5ZXJDb25maWcuZ2V0Vm9sdW1lKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAxMDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrU3dmSXNSZWFkeSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChFUlJPUlNbSU5JVF9SVE1QX1NFVFVQX0VSUk9SXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAoc291cmNlcykgPT57XHJcbiAgICAgICAgc3BlYy5zb3VyY2VzID0gc291cmNlcztcclxuICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBwaWNrQ3VycmVudFNvdXJjZShzb3VyY2VzLCBzcGVjLmN1cnJlbnRTb3VyY2UsIHBsYXllckNvbmZpZyk7XHJcbiAgICAgICAgX2xvYWQoc3BlYy5zb3VyY2VzXy5zdGFydHRpbWUgfHwgMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucGxheSA9ICgpID0+e1xyXG4gICAgICAgIGlmKGVsRmxhc2gucGxheSl7XHJcbiAgICAgICAgICAgIGVsRmxhc2gucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoYXQucGF1c2UgPSAoKSA9PntcclxuICAgICAgICBpZihlbEZsYXNoLnBhdXNlKXtcclxuICAgICAgICAgICAgZWxGbGFzaC5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+e1xyXG4gICAgICAgIGVsRmxhc2guc2Vlayhwb3NpdGlvbik7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxGbGFzaCl7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZXMubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxyXG4gICAgICAgICAgICAgICAgaW5kZXggOiBpbmRleFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRTb3VyY2U7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcclxuICAgICAgICBpZihzcGVjLmN1cnJlbnRRdWFsaXR5ID09PSBzb3VyY2VJbmRleCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHNvdXJjZUluZGV4ID4gLTEpe1xyXG4gICAgICAgICAgICBpZihzcGVjLnNvdXJjZXMgJiYgc3BlYy5zb3VyY2VzLmxlbmd0aCA+IHNvdXJjZUluZGV4KXtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBzb3VyY2VJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRTb3VyY2UgPSBzb3VyY2VJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IHNvdXJjZUluZGV4XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlTGFiZWwoc3BlYy5zb3VyY2VzW3NvdXJjZUluZGV4XS5sYWJlbCk7XHJcbiAgICAgICAgICAgICAgICBpZihuZWVkUHJvdmlkZXJDaGFuZ2Upe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfbG9hZChlbEZsYXNoLmdldEN1cnJlbnRUaW1lKCkgfHwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50U291cmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWVsRmxhc2gpe1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMZXZlbHM7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICBpZighZWxGbGFzaCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xyXG4gICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmZyYW1lcmF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEZyYW1lcmF0ZSA9IChmcmFtZXJhdGUpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5mcmFtZXJhdGUgPSBmcmFtZXJhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT57XHJcbiAgICAgICAgbGV0IGZwcyA9IHNwZWMuZnJhbWVyYXRlO1xyXG4gICAgICAgIGxldCBjdXJyZW50RnJhbWVzID0gZWxGbGFzaC5nZXRDdXJyZW50VGltZSgpICogZnBzO1xyXG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IChjdXJyZW50RnJhbWVzICsgZnJhbWVDb3VudCkgLyBmcHM7XHJcbiAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbiArIDAuMDAwMDE7IC8vIEZJWEVTIEEgU0FGQVJJIFNFRUsgSVNTVUUuIG15VmRpZW8uY3VycmVudFRpbWUgPSAwLjA0IHdvdWxkIGdpdmUgU01QVEUgMDA6MDA6MDA6MDAgd2hlcmFzIGl0IHNob3VsZCBnaXZlIDAwOjAwOjAwOjAxXHJcblxyXG4gICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICB0aGF0LnNlZWsobmV3UG9zaXRpb24pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc3RvcCgpIFwiKTtcclxuICAgICAgICBlbEZsYXNoLnN0b3AoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGRlc3Ryb3koKSBwbGF5ZXIgc3RvcCwgbGlzdGVuZXIsIGV2ZW50IGRlc3Ryb2llZFwiKTtcclxuXHJcbiAgICAgICAgZWxGbGFzaC5yZW1vdmUoKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9YWFggOiBJIGhvcGUgdXNpbmcgZXM2IGNsYXNzZXMuIGJ1dCBJIHRoaW5rIHRvIG9jY3VyIHByb2JsZW0gZnJvbSBPbGQgSUUuIFRoZW4gSSBjaG9pY2UgZnVuY3Rpb24gaW5oZXJpdC4gRmluYWxseSB1c2luZyBzdXBlciBmdW5jdGlvbiBpcyBzbyBkaWZmaWN1bHQuXHJcbiAgICAvLyB1c2UgOiBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7IC4uLiBzdXBlcl9kZXN0cm95KCk7XHJcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcclxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGF0W25hbWVdO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm92aWRlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xyXG5pbXBvcnQge1NUQVRFX0lETEUsIFBST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2ZsYXNoL1Byb3ZpZGVyXCI7XHJcbi8qKlxyXG4gKiBAYnJpZWYgICBydG1wIHByb3ZpZGVyXHJcbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cclxuICogKi9cclxuXHJcblxyXG5jb25zdCBSdG1wID0gZnVuY3Rpb24oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpe1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyA9IG51bGw7XHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgUFJPVklERVJfUlRNUCwgcGxheWVyQ29uZmlnLmlzTG9vcCgpKTtcclxuICAgIGxldCBlbGVtZW50ID0gbWVkaWFNYW5hZ2VyLmNyZWF0ZSgpO1xyXG5cclxuICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgIG5hbWUgOiBQUk9WSURFUl9SVE1QLFxyXG4gICAgICAgIGV4dGVuZGVkRWxlbWVudCA6IGVsZW1lbnQsXHJcbiAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxyXG4gICAgICAgIGNhblNlZWsgOiBmYWxzZSxcclxuICAgICAgICBpc0xpdmUgOiBmYWxzZSxcclxuICAgICAgICBzZWVraW5nIDogZmFsc2UsXHJcbiAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxyXG4gICAgICAgIGJ1ZmZlciA6IDAsXHJcbiAgICAgICAgZnJhbWVyYXRlIDogMCxcclxuICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxyXG4gICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcclxuICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXHJcbiAgICAgICAgc291cmNlcyA6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIG51bGwpO1xyXG4gICAgc3VwZXJEZXN0cm95X2Z1bmMgID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlJUTVAgUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIG1lZGlhTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgZWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlJUTVAgOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJ0bXA7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTIuLlxyXG4gKi9cclxuaW1wb3J0IHtFUlJPUiwgU1RBVEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKGV4dGVuZGVkRWxlbWVudCkge1xyXG4gICAgaWYoXy5pc0VsZW1lbnQoZXh0ZW5kZWRFbGVtZW50KSl7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRWxlbWVudDtcclxuICAgIH1cclxuICAgIGlmKGV4dGVuZGVkRWxlbWVudC5nZXRWaWRlb0VsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBleHRlbmRlZEVsZW1lbnQuZ2V0VmlkZW9FbGVtZW50KCk7XHJcbiAgICB9ZWxzZSBpZihleHRlbmRlZEVsZW1lbnQubWVkaWEpe1xyXG4gICAgICAgIHJldHVybiBleHRlbmRlZEVsZW1lbnQubWVkaWE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUxpdmUgPSBmdW5jdGlvbihleHRlbmRlZEVsZW1lbnQpIHtcclxuICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxyXG5cclxuICAgIGlmKGV4dGVuZGVkRWxlbWVudC5pc0R5bmFtaWMpe1xyXG4gICAgICAgIHJldHVybiBleHRlbmRlZEVsZW1lbnQuaXNEeW5hbWljKCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZXJyb3JUcmlnZ2VyID0gZnVuY3Rpb24oZXJyb3IsIHByb3ZpZGVyKXtcclxuICAgIGlmKHByb3ZpZGVyKXtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XHJcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwaWNrQ3VycmVudFNvdXJjZSA9IChzb3VyY2VzLCBjdXJyZW50U291cmNlLCBwbGF5ZXJDb25maWcpID0+IHtcclxuICAgIGxldCBzb3VyY2VJbmRleCA9IE1hdGgubWF4KDAsIGN1cnJlbnRTb3VyY2UpO1xyXG4gICAgY29uc3QgbGFiZWwgPVwiXCI7XHJcbiAgICBpZiAoc291cmNlcykge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VJbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc291cmNlSW5kZXg7XHJcbn07IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJMYW5ndWFnZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgbmF2ID0gd2luZG93Lm5hdmlnYXRvcixcclxuICAgICAgICBicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMgPSBbJ2xhbmd1YWdlJywgJ2Jyb3dzZXJMYW5ndWFnZScsICdzeXN0ZW1MYW5ndWFnZScsICd1c2VyTGFuZ3VhZ2UnXSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGxhbmd1YWdlO1xyXG5cclxuICAgIC8vIHN1cHBvcnQgZm9yIEhUTUwgNS4xIFwibmF2aWdhdG9yLmxhbmd1YWdlc1wiXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShuYXYubGFuZ3VhZ2VzKSkge1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuYXYubGFuZ3VhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxhbmd1YWdlID0gbmF2Lmxhbmd1YWdlc1tpXTtcclxuICAgICAgICAgICAgaWYgKGxhbmd1YWdlICYmIGxhbmd1YWdlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHN1cHBvcnQgZm9yIG90aGVyIHdlbGwga25vd24gcHJvcGVydGllcyBpbiBicm93c2Vyc1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxhbmd1YWdlID0gbmF2W2Jyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5c1tpXV07XHJcbiAgICAgICAgaWYgKGxhbmd1YWdlICYmIGxhbmd1YWdlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgaWYoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk9wZXJhXCIpIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignT1BSJykpICE9IC0xICl7XHJcbiAgICAgICAgcmV0dXJuICdvcGVyYSc7XHJcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIikgIT0gLTEgKXtcclxuICAgICAgICByZXR1cm4gJ2Nocm9tZSc7XHJcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJTYWZhcmlcIikgIT0gLTEpe1xyXG4gICAgICAgIHJldHVybiAnc2FmYXJpJztcclxuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIikgIT0gLTEgKXtcclxuICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xyXG4gICAgfWVsc2UgaWYoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIikgIT0gLTEgKSl7XHJcbiAgICAgICAgbGV0IG1zaWUgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpO1xyXG4gICAgICAgIC8qaWYoISFkb2N1bWVudC5kb2N1bWVudE1vZGUgPT0gdHJ1ZSApe1xyXG4gICAgICAgICAgICByZXR1cm4gJ2llJztcclxuICAgICAgICB9ZWxzZSBpZighIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1RyaWRlbnQuKnJ2XFw6MTFcXC4vKSl7XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4ocGFyc2VJbnQodWEuc3Vic3RyaW5nKG1zaWUgKyA1LCB1YS5pbmRleE9mKFwiLlwiLCBtc2llKSkpKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdpZSc7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd1bmtub3duJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIHZhciBpZSA9IChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgdmFyIHVuZGVmLFxyXG4gICAgICAgICAgICAgICAgdiA9IDMsXHJcbiAgICAgICAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgICAgICAgICAgIGFsbCA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaScpO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKFxyXG4gICAgICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9ICc8IS0tW2lmIGd0IElFICcgKyAoKyt2KSArICddPjxpPjwvaT48IVtlbmRpZl0tLT4nLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsbFswXVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2ID4gNCA/IHYgOiB1bmRlZjtcclxuXHJcbiAgICAgICAgfSgpKTtcclxuICAgICAgICBpZihpZSA8IDkpe1xyXG4gICAgICAgICAgICByZXR1cm4gJ29sZElFJztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuICdtb2Rlcm5JRSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiAndW5rbm93bic7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==