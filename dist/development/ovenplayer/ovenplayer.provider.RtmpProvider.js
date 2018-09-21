/*! OvenPlayerv0.7.6 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   Core For Flash Video.
 * @param   element flash object element
 * @param   playerConfig  player config
 * */

var Provider = function Provider(providerName, element, playerConfig) {
    OvenPlayerConsole.log("CORE loaded. ");

    var that = {};
    (0, _EventEmitter2["default"])(that);

    var elFlash = element;
    var listener = (0, _Listener2["default"])(elFlash, that);
    var canSeek = false;
    var seeking = false;
    var state = _constants.STATE_IDLE;
    var buffer = 0;
    var currentQuality = -1;
    var sources = [];

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
            currentQuality: currentQuality
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
        state = newState;
    };
    that.getState = function () {
        return state;
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

    that.preload = function (sources_, lastPlayPosition) {
        OvenPlayerConsole.log("CORE : preload() ", sources_, lastPlayPosition);
        var retryCount = 0;

        sources = sources_;
        currentQuality = pickCurrentQuality(sources);
        console.log(elFlash);
        return new Promise(function (resolve, reject) {
            (function checkSwfIsReady() {
                retryCount++;

                //console.log(getSWF(elFlash.id), elFlash);
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
    that.load = function (sources_) {
        sources = sources_;
        currentQuality = pickCurrentQuality(sources);
        _load(sources_.starttime || 0);
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

                    _load(elFlash.getCurrentTime() || 0);
                }
                return currentQuality;
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
}; /**
    * Created by hoho on 2018. 8. 23..
    */
exports["default"] = Provider;

/***/ }),

/***/ "./src/js/api/provider/flash/Rtmp.js":
/*!*******************************************!*\
  !*** ./src/js/api/provider/flash/Rtmp.js ***!
  \*******************************************/
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

    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_RTMP);
    var element = mediaManager.create();

    var that = (0, _Provider2["default"])(_constants.PROVIDER_RTMP, element, playerConfig);
    var super_destroy = that["super"]('destroy');

    OvenPlayerConsole.log("RTMP PROVIDER LOADED.");

    that.destroy = function () {
        mediaManager.destroy();
        OvenPlayerConsole.log("RTMP : PROVIDER DESTROYED.");
        super_destroy();
    };

    return that;
}; /**
    * Created by hoho on 2018. 8. 23..
    */
exports["default"] = Rtmp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9tZWRpYS9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL1J0bXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2Jyb3dzZXIuanMiXSwibmFtZXMiOlsiTWFuYWdlciIsImNvbnRhaW5lciIsInByb3ZpZGVyVHlwZSIsInRoYXQiLCJyb290SWQiLCJnZXRBdHRyaWJ1dGUiLCJtZWRpYUVsZW1lbnQiLCJicm93c2VyVHlwZSIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiY3JlYXRlTWVkaWFFbGVtZW50IiwiUFJPVklERVJfUlRNUCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwibW92aWUiLCJmbGFzaHZhcnMiLCJhbGxvd3NjcmlwdGFjY2VzcyIsImFsbG93ZnVsbHNjcmVlbiIsInF1YWxpdHkiLCJuYW1lIiwibWVudSIsInF1YWwiLCJiZ2NvbG9yIiwiU1dGcGF0aCIsImNyZWF0ZSIsImRlc3Ryb3kiLCJyZW1vdmVDaGlsZCIsIkxpc3RlbmVyIiwiZWxGbGFzaCIsInByb3ZpZGVyIiwiaXNKU1JlYWR5IiwidGltZSIsImRhdGEiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9USU1FIiwiQ09OVEVOVF9CVUZGRVIiLCJ2b2x1bWVDaGFuZ2VkIiwiQ09OVEVOVF9WT0xVTUUiLCJzdGF0ZUNoYW5nZWQiLCJzZXRTdGF0ZSIsIm5ld3N0YXRlIiwiUExBWUVSX1NUQVRFIiwibWV0YUNoYW5nZWQiLCJDT05URU5UX01FVEEiLCJlcnJvciIsIlNUQVRFX0VSUk9SIiwicGF1c2UiLCJFUlJPUiIsIlByb3ZpZGVyIiwicHJvdmlkZXJOYW1lIiwiZWxlbWVudCIsInBsYXllckNvbmZpZyIsImxpc3RlbmVyIiwiY2FuU2VlayIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJjdXJyZW50UXVhbGl0eSIsInNvdXJjZXMiLCJwaWNrQ3VycmVudFF1YWxpdHkiLCJNYXRoIiwibWF4IiwibGFiZWwiLCJpIiwibGVuZ3RoIiwiZ2V0UXVhbGl0eUxhYmVsIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwicHJldmlvdXNTb3VyY2UiLCJnZXRDdXJyZW50U291cmNlIiwic291cmNlQ2hhbmdlZCIsImZpbGUiLCJsb2FkIiwiZ2V0UG9zaXRpb24iLCJzZWVrIiwicGxheSIsIkNPTlRFTlRfTEVWRUxTIiwidHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsIiwiZnVuY05hbWUiLCJmdW5jRGF0YSIsImdldE5hbWUiLCJzZXRDYW5TZWVrIiwiY2FuU2Vla18iLCJpc1NlZWtpbmciLCJzZXRTZWVraW5nIiwic2Vla2luZ18iLCJuZXdTdGF0ZSIsImdldFN0YXRlIiwic2V0QnVmZmVyIiwibmV3QnVmZmVyIiwiZ2V0QnVmZmVyIiwiZ2V0RHVyYXRpb24iLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRNdXRlIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJzb3VyY2VzXyIsInJldHJ5Q291bnQiLCJjb25zb2xlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjaGVja1N3ZklzUmVhZHkiLCJpc0ZsYXNoUmVhZHkiLCJzZXRUaW1lb3V0Iiwic3RhcnR0aW1lIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsIm1hcCIsImluZGV4IiwidHlwZSIsImdldEN1cnJlbnRRdWFsaXR5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJzZXRRdWFsaXR5TGFiZWwiLCJnZXRDdXJyZW50VGltZSIsInN0b3AiLCJyZW1vdmUiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyIsIlJ0bXAiLCJtZWRpYU1hbmFnZXIiLCJzdXBlcl9kZXN0cm95IiwiZ2V0QnJvd3NlciIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImluZGV4T2YiLCJtc2llIiwiaWUiLCJ1bmRlZiIsInYiLCJkaXYiLCJhbGwiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNLQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxTQUFWQSxPQUFVLENBQVNDLFNBQVQsRUFBb0JDLFlBQXBCLEVBQWlDO0FBQzdDLFFBQU1DLE9BQU8sRUFBYjtBQUNBLFFBQUlDLFNBQVNILFVBQVVJLFlBQVYsQ0FBdUIsZ0JBQXZCLENBQWI7QUFDQSxRQUFJQyxlQUFlLEVBQW5CO0FBQ0EsUUFBSUMsY0FBYywwQkFBbEI7O0FBRUFDLHNCQUFrQkMsR0FBbEIsQ0FBc0Isd0NBQXVDRixXQUE3RDtBQUNBLFFBQU1HLHFCQUFxQixTQUFyQkEsa0JBQXFCLEdBQVU7QUFDakMsWUFBR1IsaUJBQWlCUyx3QkFBcEIsRUFBa0M7QUFDOUJMLDJCQUFlTSxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQWY7QUFDQVAseUJBQWFRLFlBQWIsQ0FBMEIsdUJBQTFCLEVBQW1ELEVBQW5EO0FBQ0FSLHlCQUFhUSxZQUFiLENBQTBCLG9CQUExQixFQUFnRCxFQUFoRDtBQUNBUix5QkFBYVEsWUFBYixDQUEwQixhQUExQixFQUF5QyxFQUF6QztBQUNBYixzQkFBVWMsV0FBVixDQUFzQlQsWUFBdEI7QUFFSCxTQVBELE1BT0s7QUFDRCxnQkFBSVUsY0FBSjtB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SCxTQUZELE1BRUs7QUFDRCxtQkFBTyxVQUFQO0FBQ0g7QUFFSixLQWxDSyxNQWtDRDtBQUNELGVBQU8sU0FBUDtBQUNIO0FBRUosQ0EvQ00sQyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIk92ZW5QbGF5ZXJGbGFzaC5zd2ZcIjsiLCIvKipcclxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxyXG4gKiBAcGFyYW0gICB7ZWxlbWVudH0gICBjb250YWluZXIgICBkb20gZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5pbXBvcnQge2dldEJyb3dzZXJ9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XHJcbmltcG9ydCB7UFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IFNXRnBhdGggZnJvbSAnLi4vLi4vLi4vYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YnO1xyXG5cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgcHJvdmlkZXJUeXBlKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCByb290SWQgPSBjb250YWluZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXJlbnQtaWRcIik7XHJcbiAgICBsZXQgbWVkaWFFbGVtZW50ID0gXCJcIjtcclxuICAgIGxldCBicm93c2VyVHlwZSA9IGdldEJyb3dzZXIoKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgbG9hZGVkLiBicm93c2VyVHlwZSA6IFwiKyBicm93c2VyVHlwZSk7XHJcbiAgICBjb25zdCBjcmVhdGVNZWRpYUVsZW1lbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHByb3ZpZGVyVHlwZSAhPT0gUFJPVklERVJfUlRNUCl7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVSZW1vdGVQbGF5YmFjaycsICcnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnd2Via2l0LXBsYXlzaW5saW5lJywgJycpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICcnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lZGlhRWxlbWVudCk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgbW92aWUsIGZsYXNodmFycywgYWxsb3dzY3JpcHRhY2Nlc3MsIGFsbG93ZnVsbHNjcmVlbiwgcXVhbGl0eSwgbmFtZSwgbWVudSwgcXVhbCwgYmdjb2xvcjtcclxuICAgICAgICAgICAgbW92aWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbW92aWUnKTtcclxuICAgICAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsIFNXRnBhdGgpO1xyXG5cclxuICAgICAgICAgICAgZmxhc2h2YXJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdmbGFzaHZhcnMnKTtcclxuICAgICAgICAgICAgLy9wbGF5ZXJJZCB1c2VzIFNXRiBmb3IgRXh0ZXJuYWxJbnRlcmZhY2UuY2FsbCgpLlxyXG4gICAgICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdwbGF5ZXJJZD0nK3Jvb3RJZCk7XHJcblxyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd3NjcmlwdGFjY2VzcycpO1xyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xyXG5cclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd2Z1bGxzY3JlZW4nKTtcclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAndHJ1ZScpO1xyXG5cclxuICAgICAgICAgICAgcXVhbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIHF1YWxpdHkuc2V0QXR0cmlidXRlKCduYW1lJywgJ3F1YWxpdHknKTtcclxuICAgICAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hlaWdodCcpO1xyXG5cclxuICAgICAgICAgICAgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ25hbWUnKTtcclxuICAgICAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG5cclxuICAgICAgICAgICAgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21lbnUnKTtcclxuICAgICAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2ZhbHNlJyk7XHJcblxyXG4gICAgICAgICAgICBxdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgcXVhbC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xyXG4gICAgICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGlnaCcpO1xyXG5cclxuICAgICAgICAgICAgYmdjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCduYW1lJywgJ2JnY29sb3InKTtcclxuICAgICAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJyMwMDAwMDAnKTtcclxuXHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29iamVjdCcpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpO1xyXG5cclxuICAgICAgICAgICAgaWYoYnJvd3NlclR5cGUgIT09IFwib2xkSUVcIil7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhJywgU1dGcGF0aCk7XHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQobW92aWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChiZ2NvbG9yKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKHF1YWwpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dmdWxsc2NyZWVuKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGFsbG93c2NyaXB0YWNjZXNzKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGZsYXNodmFycyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lZGlhRWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jcmVhdGUgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgY3JlYXRlRWxlbWVudCgpXCIpO1xyXG4gICAgICAgIGlmKG1lZGlhRWxlbWVudCl7XHJcbiAgICAgICAgICAgIHRoYXQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3JlYXRlTWVkaWFFbGVtZW50KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciByZW1vdmVFbGVtZW50KClcIik7XHJcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKG1lZGlhRWxlbWVudCk7XHJcbiAgICAgICAgbWVkaWFFbGVtZW50ID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI3Li5cclxuICovXHJcbmltcG9ydCB7XHJcbiAgICBFUlJPUixcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX1BBVVNFRCxcclxuICAgIFNUQVRFX0VSUk9SLFxyXG4gICAgQ09OVEVOVF9DT01QTEVURSxcclxuICAgIENPTlRFTlRfU0VFSyxcclxuICAgIENPTlRFTlRfQlVGRkVSX0ZVTEwsXHJcbiAgICBDT05URU5UX1NFRUtFRCxcclxuICAgIENPTlRFTlRfQlVGRkVSLFxyXG4gICAgQ09OVEVOVF9USU1FLFxyXG4gICAgQ09OVEVOVF9WT0xVTUUsXHJcbiAgICBDT05URU5UX01FVEEsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXHJcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcclxuICAgIFBMQVlFUl9TVEFURSxcclxuICAgIFBST1ZJREVSX0hUTUw1LFxyXG4gICAgUFJPVklERVJfV0VCUlRDLFxyXG4gICAgUFJPVklERVJfREFTSCxcclxuICAgIFBST1ZJREVSX0hMU1xyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCBMaXN0ZW5lciA9IGZ1bmN0aW9uKGVsRmxhc2gsIHByb3ZpZGVyKXtcclxuICAgIGxldCB0aGF0ID0ge307XHJcblxyXG4gICAgdGhhdC5pc0pTUmVhZHkgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LnRpbWUgPSAoZGF0YSkgPT57XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIGRhdGEpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9CVUZGRVIsIGRhdGEpO1xyXG4gICAgfTtcclxuICAgIHRoYXQudm9sdW1lQ2hhbmdlZCA9IChkYXRhKSA9PntcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVk9MVU1FLCBkYXRhKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnN0YXRlQ2hhbmdlZCA9IChkYXRhKSA9PntcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShkYXRhLm5ld3N0YXRlKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKFBMQVlFUl9TVEFURSwgZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5tZXRhQ2hhbmdlZCA9IChkYXRhKSA9PntcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfTUVUQSwgZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5lcnJvciA9IChlcnJvcikgPT57XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xyXG4gICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XHJcblxyXG4gICAgICAgIC8vUFJJVkFURV9TVEFURV9FUlJPUlxyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yKTtcclxuXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdGVuZXI7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCBFdmVudHNMaXN0ZW5lciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2ZsYXNoL0xpc3RlbmVyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgUExBWUVSX1NUQVRFLCBQTEFZRVJfQ09NUExFVEUsIFBMQVlFUl9QQVVTRSwgUExBWUVSX1BMQVksXHJcbiAgICBDT05URU5UX0xFVkVMUywgQ09OVEVOVF9MRVZFTF9DSEFOR0VELCBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCxcclxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIENvcmUgRm9yIEZsYXNoIFZpZGVvLlxyXG4gKiBAcGFyYW0gICBlbGVtZW50IGZsYXNoIG9iamVjdCBlbGVtZW50XHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24ocHJvdmlkZXJOYW1lLCBlbGVtZW50LCBwbGF5ZXJDb25maWcpe1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcclxuXHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xyXG5cclxuICAgIGxldCBlbEZsYXNoID0gZWxlbWVudDtcclxuICAgIGxldCBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKGVsRmxhc2gsIHRoYXQpO1xyXG4gICAgbGV0IGNhblNlZWsgPSBmYWxzZTtcclxuICAgIGxldCBzZWVraW5nID0gZmFsc2U7XHJcbiAgICBsZXQgc3RhdGUgPSBTVEFURV9JRExFO1xyXG4gICAgbGV0IGJ1ZmZlciA9IDA7XHJcbiAgICBsZXQgY3VycmVudFF1YWxpdHkgPSAtMTtcclxuICAgIGxldCBzb3VyY2VzID0gW107XHJcblxyXG4gICAgY29uc3QgcGlja0N1cnJlbnRRdWFsaXR5ID0gKHNvdXJjZXMpID0+e1xyXG4gICAgICAgIHZhciBxdWFsaXR5ID0gTWF0aC5tYXgoMCwgY3VycmVudFF1YWxpdHkpO1xyXG4gICAgICAgIGNvbnN0IGxhYmVsID1cIlwiO1xyXG4gICAgICAgIGlmIChzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHF1YWxpdHk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzb3VyY2VzW2N1cnJlbnRRdWFsaXR5XTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gZWxGbGFzaC5nZXRDdXJyZW50U291cmNlKCk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2UuZmlsZSAhPT0gcHJldmlvdXNTb3VyY2UpO1xyXG5cclxuICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICBlbEZsYXNoLmxvYWQoc291cmNlLmZpbGUpO1xyXG4gICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgdGhhdC5nZXRQb3NpdGlvbigpID4gMCl7XHJcbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTFMsIHtcclxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IGN1cnJlbnRRdWFsaXR5XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vVGhpcyBpcyB3aHkuIEZsYXNoIGRvZXMgbm90IHNlbGYgdHJpZyB0byBhZHMsbG1hbG0sXHJcbiAgICB0aGF0LnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCA9IChmdW5jTmFtZSwgZnVuY0RhdGEpID0+IHtcclxuICAgICAgICBpZihsaXN0ZW5lcltmdW5jTmFtZV0pe1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVuZXJbZnVuY05hbWVdKGZ1bmNEYXRhKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gcHJvdmlkZXJOYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNhblNlZWs7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDYW5TZWVrID0gKGNhblNlZWtfKSA9PiB7XHJcbiAgICAgICAgY2FuU2VlayA9IGNhblNlZWtfO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNTZWVraW5nID0gKCk9PntcclxuICAgICAgICByZXR1cm4gc2Vla2luZztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZ18pPT57XHJcbiAgICAgICAgc2Vla2luZyA9IHNlZWtpbmdfO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XHJcbiAgICAgICAgc3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0QnVmZmVyID0gKG5ld0J1ZmZlcikgPT4ge1xyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRCdWZmZXIgPyBlbEZsYXNoLmdldEJ1ZmZlcigpIDogbnVsbDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldER1cmF0aW9uID8gZWxGbGFzaC5nZXREdXJhdGlvbigpIDogMDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldFBvc2l0aW9uID8gZWxGbGFzaC5nZXRQb3NpdGlvbigpIDogMDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+IHtcclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5zZXRWb2x1bWUgPyBlbEZsYXNoLnNldFZvbHVtZSh2b2x1bWUpIDogMDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5zZXRWb2x1bWUgPyBlbEZsYXNoLmdldFZvbHVtZSgpIDogMDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldE11dGUgPSAoKSA9PntcclxuICAgICAgICBlbEZsYXNoLnNldE11dGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRNdXRlID8gZWxGbGFzaC5nZXRNdXRlKCkgOiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wcmVsb2FkID0gKHNvdXJjZXNfLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogcHJlbG9hZCgpIFwiLCBzb3VyY2VzXywgbGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xyXG5cclxuICAgICAgICBzb3VyY2VzID0gc291cmNlc187XHJcbiAgICAgICAgY3VycmVudFF1YWxpdHkgPSBwaWNrQ3VycmVudFF1YWxpdHkoc291cmNlcyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZWxGbGFzaCk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrU3dmSXNSZWFkeSgpe1xyXG4gICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGdldFNXRihlbEZsYXNoLmlkKSwgZWxGbGFzaCk7XHJcbiAgICAgICAgICAgICAgICBpZihlbEZsYXNoLmlzRmxhc2hSZWFkeSAmJiBlbEZsYXNoLmlzRmxhc2hSZWFkeSgpKXtcclxuICAgICAgICAgICAgICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMTAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja1N3ZklzUmVhZHksIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHRoYXQubG9hZCA9IChzb3VyY2VzXykgPT57XHJcbiAgICAgICAgc291cmNlcyA9IHNvdXJjZXNfO1xyXG4gICAgICAgIGN1cnJlbnRRdWFsaXR5ID0gcGlja0N1cnJlbnRRdWFsaXR5KHNvdXJjZXMpO1xyXG4gICAgICAgIF9sb2FkKHNvdXJjZXNfLnN0YXJ0dGltZSB8fCAwKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wbGF5ID0gKCkgPT57XHJcbiAgICAgICAgaWYoZWxGbGFzaC5wbGF5KXtcclxuICAgICAgICAgICAgZWxGbGFzaC5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhhdC5wYXVzZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKGVsRmxhc2gucGF1c2Upe1xyXG4gICAgICAgICAgICBlbEZsYXNoLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT57XHJcbiAgICAgICAgZWxGbGFzaC5zZWVrKHBvc2l0aW9uKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBxdWFsaXR5TGV2ZWxzID0gc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBzb3VyY2UudHlwZSxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXHJcbiAgICAgICAgICAgICAgICBpbmRleCA6IGluZGV4XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHF1YWxpdHlMZXZlbHM7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICB2YXIgc291cmNlID0gc291cmNlc1tjdXJyZW50UXVhbGl0eV07XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZmlsZTogc291cmNlLmZpbGUsXHJcbiAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxyXG4gICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxyXG4gICAgICAgICAgICBpbmRleCA6IGN1cnJlbnRRdWFsaXR5XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCwgbmVlZFByb3ZpZGVyQ2hhbmdlKSA9PiB7XHJcbiAgICAgICAgaWYoY3VycmVudFF1YWxpdHkgPT0gcXVhbGl0eUluZGV4KXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYocXVhbGl0eUluZGV4ID4gLTEpe1xyXG4gICAgICAgICAgICBpZihzb3VyY2VzICYmIHNvdXJjZXMubGVuZ3RoID4gcXVhbGl0eUluZGV4KXtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInNvdXJjZSBjaGFuZ2VkIDogXCIgKyBxdWFsaXR5SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHkgPSBxdWFsaXR5SW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBxdWFsaXR5SW5kZXhcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRRdWFsaXR5TGFiZWwoc291cmNlc1txdWFsaXR5SW5kZXhdLmxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGVsRmxhc2guZ2V0Q3VycmVudFRpbWUoKSB8fCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UXVhbGl0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHN0b3AoKSBcIik7XHJcbiAgICAgICAgZWxGbGFzaC5zdG9wKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XHJcblxyXG4gICAgICAgIGVsRmxhc2gucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vWFhYIDogSSBob3BlIHVzaW5nIGVzNiBjbGFzc2VzLiBidXQgSSB0aGluayB0byBvY2N1ciBwcm9ibGVtIGZyb20gT2xkIElFLiBUaGVuIEkgY2hvaWNlIGZ1bmN0aW9uIGluaGVyaXQuIEZpbmFsbHkgdXNpbmcgc3VwZXIgZnVuY3Rpb24gaXMgc28gZGlmZmljdWx0LlxyXG4gICAgLy8gdXNlIDogbGV0IHN1cGVyX2Rlc3Ryb3kgID0gdGhhdC5zdXBlcignZGVzdHJveScpOyAuLi4gc3VwZXJfZGVzdHJveSgpO1xyXG4gICAgdGhhdC5zdXBlciA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhhdFtuYW1lXTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjMuLlxyXG4gKi9cclxuaW1wb3J0IE1lZGlhTWFuYWdlciBmcm9tIFwiYXBpL21lZGlhL01hbmFnZXJcIjtcclxuaW1wb3J0IHtQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlclwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIHJ0bXAgcHJvdmlkZXJcclxuICogQHBhcmFtICAgZWxlbWVudCB2aWRlbyBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IFJ0bXAgPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcblxyXG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIFBST1ZJREVSX1JUTVApO1xyXG4gICAgbGV0IGVsZW1lbnQgPSBtZWRpYU1hbmFnZXIuY3JlYXRlKCk7XHJcblxyXG4gICAgbGV0IHRoYXQgPSBQcm92aWRlcihQUk9WSURFUl9SVE1QLCBlbGVtZW50LCBwbGF5ZXJDb25maWcpO1xyXG4gICAgbGV0IHN1cGVyX2Rlc3Ryb3kgID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlJUTVAgUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlJUTVAgOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG4gICAgICAgIHN1cGVyX2Rlc3Ryb3koKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUnRtcDsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXG4gKi9cblxuXG5leHBvcnQgY29uc3QgZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCl7XG4gICAgaWYoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk9wZXJhXCIpIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignT1BSJykpICE9IC0xICl7XG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKSAhPSAtMSApe1xuICAgICAgICByZXR1cm4gJ2Nocm9tZSc7XG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpICE9IC0xKXtcbiAgICAgICAgcmV0dXJuICdzYWZhcmknO1xuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIikgIT0gLTEgKXtcbiAgICAgICAgcmV0dXJuICdmaXJlZm94JztcbiAgICB9ZWxzZSBpZigobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKSAhPSAtMSApKXtcbiAgICAgICAgbGV0IG1zaWUgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpO1xuICAgICAgICAvKmlmKCEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09IHRydWUgKXtcbiAgICAgICAgICAgIHJldHVybiAnaWUnO1xuICAgICAgICB9ZWxzZSBpZighIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1RyaWRlbnQuKnJ2XFw6MTFcXC4vKSl7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llICsgNSwgdWEuaW5kZXhPZihcIi5cIiwgbXNpZSkpKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICAgICAgfSovXG4gICAgICAgIHZhciBpZSA9IChmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB2YXIgdW5kZWYsXG4gICAgICAgICAgICAgICAgdiA9IDMsXG4gICAgICAgICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICAgICAgYWxsID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJyk7XG5cbiAgICAgICAgICAgIHdoaWxlIChcbiAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgZ3QgSUUgJyArICgrK3YpICsgJ10+PGk+PC9pPjwhW2VuZGlmXS0tPicsXG4gICAgICAgICAgICAgICAgICAgIGFsbFswXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiB2ID4gNCA/IHYgOiB1bmRlZjtcblxuICAgICAgICB9KCkpO1xuICAgICAgICBpZihpZSA8IDkpe1xuICAgICAgICAgICAgcmV0dXJuICdvbGRJRSc7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuICdtb2Rlcm5JRSc7XG4gICAgICAgIH1cblxuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgIH1cblxufTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==