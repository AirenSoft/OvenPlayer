/*! OvenPlayerv0.7.4 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            movie.setAttribute('value', _OvenPlayerFlash2.default);

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
            mediaElement.setAttribute('data', _OvenPlayerFlash2.default);

            mediaElement.setAttribute('id', rootId + "-flash");
            mediaElement.setAttribute('name', rootId + "-flash");
            mediaElement.setAttribute('width', '100%');
            mediaElement.setAttribute('height', '100%');

            mediaElement.appendChild(movie);
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
}; /**
    * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
    * @param   {element}   container   dom element
    *
    * */
exports.default = Manager;

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
exports.default = Listener;

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

var _promise = __webpack_require__(/*! api/shims/promise */ "./src/js/api/shims/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   Core For Flash Video.
 * @param   element flash object element
 * @param   playerConfig  player config
 * */

/**
 * Created by hoho on 2018. 8. 23..
 */
var Provider = function Provider(providerName, element, playerConfig) {
    OvenPlayerConsole.log("CORE loaded. ");

    var that = {};
    (0, _EventEmitter2.default)(that);

    var elFlash = element;
    var listener = (0, _Listener2.default)(elFlash, that);
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
        return elFlash.getBuffer();
    };
    that.getDuration = function () {
        return elFlash.getDuration();
    };
    that.getPosition = function () {
        return elFlash.getPosition();
    };
    that.setVolume = function (volume) {
        return elFlash.setVolume(volume);
    };
    that.getVolume = function () {
        return elFlash.getVolume();
    };
    that.setMute = function () {
        elFlash.setMute();
    };
    that.getMute = function () {
        return elFlash.getMute();
    };

    that.preload = function (sources_, lastPlayPosition) {
        OvenPlayerConsole.log("CORE : preload() ", sources_, lastPlayPosition);
        var retryCount = 0;

        sources = sources_;
        currentQuality = pickCurrentQuality(sources);

        return new _promise2.default(function (resolve, reject) {
            (function checkSwfIsReady() {
                retryCount++;
                if (elFlash.isFlashReady && elFlash.isFlashReady()) {
                    _load(lastPlayPosition || 0);
                    return resolve();
                } else {
                    if (retryCount < 30) {
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
        elFlash.play();
    };
    that.pause = function () {
        elFlash.pause();
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   rtmp provider
 * @param   element video element.
 * @param   playerConfig    config.
 * */

var Rtmp = function Rtmp(container, playerConfig) {

    var mediaManager = (0, _Manager2.default)(container, _constants.PROVIDER_RTMP);
    var element = mediaManager.create();

    var that = (0, _Provider2.default)(_constants.PROVIDER_RTMP, element, playerConfig);
    var super_destroy = that.super('destroy');

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
exports.default = Rtmp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL092ZW5QbGF5ZXJGbGFzaC5zd2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9tZWRpYS9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL1J0bXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2Jyb3dzZXIuanMiXSwibmFtZXMiOlsiTWFuYWdlciIsImNvbnRhaW5lciIsInByb3ZpZGVyVHlwZSIsInRoYXQiLCJyb290SWQiLCJnZXRBdHRyaWJ1dGUiLCJtZWRpYUVsZW1lbnQiLCJicm93c2VyVHlwZSIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiY3JlYXRlTWVkaWFFbGVtZW50IiwiUFJPVklERVJfUlRNUCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwibW92aWUiLCJmbGFzaHZhcnMiLCJhbGxvd3NjcmlwdGFjY2VzcyIsImFsbG93ZnVsbHNjcmVlbiIsInF1YWxpdHkiLCJTV0ZwYXRoIiwiY3JlYXRlIiwiZGVzdHJveSIsInJlbW92ZUNoaWxkIiwiTGlzdGVuZXIiLCJlbEZsYXNoIiwicHJvdmlkZXIiLCJpc0pTUmVhZHkiLCJ0aW1lIiwiZGF0YSIsInRyaWdnZXIiLCJDT05URU5UX1RJTUUiLCJDT05URU5UX0JVRkZFUiIsInZvbHVtZUNoYW5nZWQiLCJDT05URU5UX1ZPTFVNRSIsInN0YXRlQ2hhbmdlZCIsInNldFN0YXRlIiwibmV3c3RhdGUiLCJQTEFZRVJfU1RBVEUiLCJtZXRhQ2hhbmdlZCIsIkNPTlRFTlRfTUVUQSIsImVycm9yIiwiU1RBVEVfRVJST1IiLCJwYXVzZSIsIkVSUk9SIiwiUHJvdmlkZXIiLCJwcm92aWRlck5hbWUiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwibGlzdGVuZXIiLCJjYW5TZWVrIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImN1cnJlbnRRdWFsaXR5Iiwic291cmNlcyIsInBpY2tDdXJyZW50UXVhbGl0eSIsIk1hdGgiLCJtYXgiLCJsYWJlbCIsImkiLCJsZW5ndGgiLCJkZWZhdWx0IiwiZ2V0UXVhbGl0eUxhYmVsIiwiX2xvYWQiLCJsYXN0UGxheVBvc2l0aW9uIiwic291cmNlIiwicHJldmlvdXNTb3VyY2UiLCJnZXRDdXJyZW50U291cmNlIiwic291cmNlQ2hhbmdlZCIsImZpbGUiLCJsb2FkIiwiZ2V0UG9zaXRpb24iLCJzZWVrIiwicGxheSIsIkNPTlRFTlRfTEVWRUxTIiwidHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsIiwiZnVuY05hbWUiLCJmdW5jRGF0YSIsImdldE5hbWUiLCJzZXRDYW5TZWVrIiwiY2FuU2Vla18iLCJpc1NlZWtpbmciLCJzZXRTZWVraW5nIiwic2Vla2luZ18iLCJuZXdTdGF0ZSIsImdldFN0YXRlIiwic2V0QnVmZmVyIiwibmV3QnVmZmVyIiwiZ2V0QnVmZmVyIiwiZ2V0RHVyYXRpb24iLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRNdXRlIiwiZ2V0TXV0ZSIsInByZWxvYWQiLCJzb3VyY2VzXyIsInJldHJ5Q291bnQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNoZWNrU3dmSXNSZWFkeSIsImlzRmxhc2hSZWFkeSIsInNldFRpbWVvdXQiLCJzdGFydHRpbWUiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsImdldFF1YWxpdHlMZXZlbHMiLCJxdWFsaXR5TGV2ZWxzIiwibWFwIiwiaW5kZXgiLCJ0eXBlIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsIm5lZWRQcm92aWRlckNoYW5nZSIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsInNldFF1YWxpdHlMYWJlbCIsImdldEN1cnJlbnRUaW1lIiwic3RvcCIsInJlbW92ZSIsInN1cGVyIiwibmFtZSIsIm1ldGhvZCIsImFwcGx5IiwiYXJndW1lbnRzIiwiUnRtcCIsIm1lZGlhTWFuYWdlciIsInN1cGVyX2Rlc3Ryb3kiLCJnZXRCcm93c2VyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsIm1zaWUiLCJhdmlnYXRvciIsImRvY3VtZW50TW9kZSIsIm1hdGNoIiwiaXNOYU4iLCJwYXJzZUludCIsInVhIiwic3Vic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0tBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxVQUFVLFNBQVZBLE9BQVUsQ0FBU0MsU0FBVCxFQUFvQkMsWUFBcEIsRUFBaUM7QUFDN0MsUUFBTUMsT0FBTyxFQUFiO0FBQ0EsUUFBSUMsU0FBU0gsVUFBVUksWUFBVixDQUF1QixnQkFBdkIsQ0FBYjtBQUNBLFFBQUlDLGVBQWUsRUFBbkI7QUFDQSxRQUFJQyxjQUFjLDBCQUFsQjs7QUFFQUMsc0JBQWtCQyxHQUFsQixDQUFzQix3Q0FBdUNGLFdBQTdEO0FBQ0EsUUFBTUcscUJBQXFCLFNBQXJCQSxrQkFBcUIsR0FBVTtBQUNqQyxZQUFHUixpQkFBaUJTLHdCQUFwQixFQUFrQztBQUM5QkwsMkJBQWVNLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZjtBQUNBUCx5QkFBYVEsWUFBYixDQUEwQix1QkFBMUIsRUFBbUQsRUFBbkQ7QUFDQVIseUJBQWFRLFlBQWIsQ0FBMEIsb0JBQTFCLEVBQWdELEVBQWhEO0FBQ0FSLHlCQUFhUSxZQUFiLENBQTBCLGFBQTFCLEVBQXlDLEVBQXpDO0FBQ0FiLHNCQUFVYyxXQUFWLENBQXNCVCxZQUF0QjtBQUVILFNBUEQsTUFPSztBQUNELGdCQUFJVSxjQUFKO0FBQUEsZ0JBQVdD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ZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiT3ZlblBsYXllckZsYXNoLnN3ZlwiOyIsIi8qKlxyXG4gKiBAYnJpZWYgICDrr7jrlJTslrQg7JeY66as66i87Yq466W8IOq0gOumrO2VmOuKlCDqsJ3ssrQuIO2YhOyerOuKlCDtlZjripQg7J287J20IOunjuyngCDslYrri6QuXHJcbiAqIEBwYXJhbSAgIHtlbGVtZW50fSAgIGNvbnRhaW5lciAgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcbmltcG9ydCB7Z2V0QnJvd3Nlcn0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgU1dGcGF0aCBmcm9tICcuLi8uLi8uLi9hc3NldHMvT3ZlblBsYXllckZsYXNoLnN3Zic7XHJcblxyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyLCBwcm92aWRlclR5cGUpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgbGV0IHJvb3RJZCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmVudC1pZFwiKTtcclxuICAgIGxldCBtZWRpYUVsZW1lbnQgPSBcIlwiO1xyXG4gICAgbGV0IGJyb3dzZXJUeXBlID0gZ2V0QnJvd3NlcigpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBsb2FkZWQuIGJyb3dzZXJUeXBlIDogXCIrIGJyb3dzZXJUeXBlKTtcclxuICAgIGNvbnN0IGNyZWF0ZU1lZGlhRWxlbWVudCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYocHJvdmlkZXJUeXBlICE9PSBQUk9WSURFUl9SVE1QKXtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZVJlbW90ZVBsYXliYWNrJywgJycpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd3ZWJraXQtcGxheXNpbmxpbmUnLCAnJyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJycpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBtb3ZpZSwgZmxhc2h2YXJzLCBhbGxvd3NjcmlwdGFjY2VzcywgYWxsb3dmdWxsc2NyZWVuLCBxdWFsaXR5O1xyXG4gICAgICAgICAgICBtb3ZpZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgnbmFtZScsICdtb3ZpZScpO1xyXG4gICAgICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgU1dGcGF0aCk7XHJcblxyXG4gICAgICAgICAgICBmbGFzaHZhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZsYXNodmFycycpO1xyXG4gICAgICAgICAgICAvL3BsYXllcklkIHVzZXMgU1dGIGZvciBFeHRlcm5hbEludGVyZmFjZS5jYWxsKCkuXHJcbiAgICAgICAgICAgIGZsYXNodmFycy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3BsYXllcklkPScrcm9vdElkKTtcclxuXHJcbiAgICAgICAgICAgIGFsbG93c2NyaXB0YWNjZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93c2NyaXB0YWNjZXNzJyk7XHJcbiAgICAgICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnYWx3YXlzJyk7XHJcblxyXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW4uc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93ZnVsbHNjcmVlbicpO1xyXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW4uc2V0QXR0cmlidXRlKCd2YWx1ZScsICd0cnVlJyk7XHJcblxyXG4gICAgICAgICAgICBxdWFsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xyXG4gICAgICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGVpZ2h0Jyk7XHJcblxyXG4gICAgICAgICAgICBpZihicm93c2VyVHlwZSAhPT0gXCJpZVwiKXtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0Jyk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YScsIFNXRnBhdGgpO1xyXG5cclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCByb290SWQrXCItZmxhc2hcIik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCByb290SWQrXCItZmxhc2hcIik7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKTtcclxuXHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChtb3ZpZSk7XHJcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dzY3JpcHRhY2Nlc3MpO1xyXG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dmdWxsc2NyZWVuKTtcclxuICAgICAgICAgICAgLyppZihicm93c2VyVHlwZSAhPT0gXCJpZVwiKXtcclxuICAgICAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChpbm5lcik7XHJcbiAgICAgICAgICAgIH0qL1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lZGlhRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVkaWFFbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNyZWF0ZSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBjcmVhdGVFbGVtZW50KClcIik7XHJcbiAgICAgICAgaWYobWVkaWFFbGVtZW50KXtcclxuICAgICAgICAgICAgdGhhdC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIHJlbW92ZUVsZW1lbnQoKVwiKTtcclxuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQobWVkaWFFbGVtZW50KTtcclxuICAgICAgICBtZWRpYUVsZW1lbnQgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjcuLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICAgIEVSUk9SLFxyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9TVEFMTEVELFxyXG4gICAgU1RBVEVfTE9BRElORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfUEFVU0VELFxyXG4gICAgU1RBVEVfRVJST1IsXHJcbiAgICBDT05URU5UX0NPTVBMRVRFLFxyXG4gICAgQ09OVEVOVF9TRUVLLFxyXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcclxuICAgIENPTlRFTlRfU0VFS0VELFxyXG4gICAgQ09OVEVOVF9CVUZGRVIsXHJcbiAgICBDT05URU5UX1RJTUUsXHJcbiAgICBDT05URU5UX1ZPTFVNRSxcclxuICAgIENPTlRFTlRfTUVUQSxcclxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcclxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLFxyXG4gICAgUExBWUVSX1NUQVRFLFxyXG4gICAgUFJPVklERVJfSFRNTDUsXHJcbiAgICBQUk9WSURFUl9XRUJSVEMsXHJcbiAgICBQUk9WSURFUl9EQVNILFxyXG4gICAgUFJPVklERVJfSExTXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxGbGFzaCwgcHJvdmlkZXIpe1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuXHJcbiAgICB0aGF0LmlzSlNSZWFkeSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIHRoYXQudGltZSA9IChkYXRhKSA9PntcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRSwgZGF0YSk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX0JVRkZFUiwgZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC52b2x1bWVDaGFuZ2VkID0gKGRhdGEpID0+e1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9WT0xVTUUsIGRhdGEpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc3RhdGVDaGFuZ2VkID0gKGRhdGEpID0+e1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKGRhdGEubmV3c3RhdGUpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoUExBWUVSX1NUQVRFLCBkYXRhKTtcclxuICAgIH07XHJcbiAgICB0aGF0Lm1ldGFDaGFuZ2VkID0gKGRhdGEpID0+e1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBkYXRhKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmVycm9yID0gKGVycm9yKSA9PntcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XHJcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcclxuXHJcbiAgICAgICAgLy9QUklWQVRFX1NUQVRFX0VSUk9SXHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IpO1xyXG5cclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0ZW5lcjsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDIzLi5cclxuICovXHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXJcIjtcclxuaW1wb3J0IFByb21pc2UsIHtyZXNvbHZlZH0gZnJvbSBcImFwaS9zaGltcy9wcm9taXNlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgUExBWUVSX1NUQVRFLCBQTEFZRVJfQ09NUExFVEUsIFBMQVlFUl9QQVVTRSwgUExBWUVSX1BMQVksXHJcbiAgICBDT05URU5UX0xFVkVMUywgQ09OVEVOVF9MRVZFTF9DSEFOR0VELCBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCxcclxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIENvcmUgRm9yIEZsYXNoIFZpZGVvLlxyXG4gKiBAcGFyYW0gICBlbGVtZW50IGZsYXNoIG9iamVjdCBlbGVtZW50XHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IFByb3ZpZGVyID0gZnVuY3Rpb24ocHJvdmlkZXJOYW1lLCBlbGVtZW50LCBwbGF5ZXJDb25maWcpe1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSBsb2FkZWQuIFwiKTtcclxuXHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xyXG5cclxuICAgIGxldCBlbEZsYXNoID0gZWxlbWVudDtcclxuICAgIGxldCBsaXN0ZW5lciA9IEV2ZW50c0xpc3RlbmVyKGVsRmxhc2gsIHRoYXQpO1xyXG4gICAgbGV0IGNhblNlZWsgPSBmYWxzZTtcclxuICAgIGxldCBzZWVraW5nID0gZmFsc2U7XHJcbiAgICBsZXQgc3RhdGUgPSBTVEFURV9JRExFO1xyXG4gICAgbGV0IGJ1ZmZlciA9IDA7XHJcbiAgICBsZXQgY3VycmVudFF1YWxpdHkgPSAtMTtcclxuICAgIGxldCBzb3VyY2VzID0gW107XHJcblxyXG4gICAgY29uc3QgcGlja0N1cnJlbnRRdWFsaXR5ID0gKHNvdXJjZXMpID0+e1xyXG4gICAgICAgIHZhciBxdWFsaXR5ID0gTWF0aC5tYXgoMCwgY3VycmVudFF1YWxpdHkpO1xyXG4gICAgICAgIGNvbnN0IGxhYmVsID1cIlwiO1xyXG4gICAgICAgIGlmIChzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHF1YWxpdHk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IF9sb2FkID0gKGxhc3RQbGF5UG9zaXRpb24pID0+e1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzb3VyY2VzW2N1cnJlbnRRdWFsaXR5XTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzU291cmNlID0gZWxGbGFzaC5nZXRDdXJyZW50U291cmNlKCk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2UuZmlsZSAhPT0gcHJldmlvdXNTb3VyY2UpO1xyXG5cclxuICAgICAgICBpZiAoc291cmNlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICBlbEZsYXNoLmxvYWQoc291cmNlLmZpbGUpO1xyXG4gICAgICAgIH1lbHNlIGlmKGxhc3RQbGF5UG9zaXRpb24gPT09IDAgJiYgdGhhdC5nZXRQb3NpdGlvbigpID4gMCl7XHJcbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTFMsIHtcclxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IGN1cnJlbnRRdWFsaXR5XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vVGhpcyBpcyB3aHkuIEZsYXNoIGRvZXMgbm90IHNlbGYgdHJpZyB0byBhZHMsbG1hbG0sXHJcbiAgICB0aGF0LnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCA9IChmdW5jTmFtZSwgZnVuY0RhdGEpID0+IHtcclxuICAgICAgICBpZihsaXN0ZW5lcltmdW5jTmFtZV0pe1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVuZXJbZnVuY05hbWVdKGZ1bmNEYXRhKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gcHJvdmlkZXJOYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNhblNlZWsgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNhblNlZWs7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDYW5TZWVrID0gKGNhblNlZWtfKSA9PiB7XHJcbiAgICAgICAgY2FuU2VlayA9IGNhblNlZWtfO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNTZWVraW5nID0gKCk9PntcclxuICAgICAgICByZXR1cm4gc2Vla2luZztcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFNlZWtpbmcgPSAoc2Vla2luZ18pPT57XHJcbiAgICAgICAgc2Vla2luZyA9IHNlZWtpbmdfO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNldFN0YXRlID0gKG5ld1N0YXRlKSA9PiB7XHJcbiAgICAgICAgc3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0QnVmZmVyID0gKG5ld0J1ZmZlcikgPT4ge1xyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRCdWZmZXIoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldER1cmF0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRQb3NpdGlvbigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBlbEZsYXNoLnNldFZvbHVtZSh2b2x1bWUpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldFZvbHVtZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9ICgpID0+e1xyXG4gICAgICAgIGVsRmxhc2guc2V0TXV0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldE11dGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5wcmVsb2FkID0gKHNvdXJjZXNfLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogcHJlbG9hZCgpIFwiLCBzb3VyY2VzXywgbGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xyXG5cclxuICAgICAgICBzb3VyY2VzID0gc291cmNlc187XHJcbiAgICAgICAgY3VycmVudFF1YWxpdHkgPSBwaWNrQ3VycmVudFF1YWxpdHkoc291cmNlcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja1N3ZklzUmVhZHkoKXtcclxuICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XHJcbiAgICAgICAgICAgICAgICBpZihlbEZsYXNoLmlzRmxhc2hSZWFkeSAmJiBlbEZsYXNoLmlzRmxhc2hSZWFkeSgpKXtcclxuICAgICAgICAgICAgICAgICAgICBfbG9hZChsYXN0UGxheVBvc2l0aW9uIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMzApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrU3dmSXNSZWFkeSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXNfKSA9PntcclxuICAgICAgICBzb3VyY2VzID0gc291cmNlc187XHJcbiAgICAgICAgY3VycmVudFF1YWxpdHkgPSBwaWNrQ3VycmVudFF1YWxpdHkoc291cmNlcyk7XHJcbiAgICAgICAgX2xvYWQoc291cmNlc18uc3RhcnR0aW1lIHx8IDApO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcclxuICAgICAgICBlbEZsYXNoLnBsYXkoKTtcclxuICAgIH1cclxuICAgIHRoYXQucGF1c2UgPSAoKSA9PntcclxuICAgICAgICBlbEZsYXNoLnBhdXNlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcclxuICAgICAgICBlbEZsYXNoLnNlZWsocG9zaXRpb24pO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHF1YWxpdHlMZXZlbHMgPSBzb3VyY2VzLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IHNvdXJjZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHNvdXJjZS5sYWJlbCxcclxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcXVhbGl0eUxldmVscztcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2N1cnJlbnRRdWFsaXR5XTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcclxuICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXHJcbiAgICAgICAgICAgIGxhYmVsOiBzb3VyY2UubGFiZWwsXHJcbiAgICAgICAgICAgIGluZGV4IDogY3VycmVudFF1YWxpdHlcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4LCBuZWVkUHJvdmlkZXJDaGFuZ2UpID0+IHtcclxuICAgICAgICBpZihjdXJyZW50UXVhbGl0eSA9PSBxdWFsaXR5SW5kZXgpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihxdWFsaXR5SW5kZXggPiAtMSl7XHJcbiAgICAgICAgICAgIGlmKHNvdXJjZXMgJiYgc291cmNlcy5sZW5ndGggPiBxdWFsaXR5SW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0lETEUpO1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGNoYW5nZWQgOiBcIiArIHF1YWxpdHlJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eSA9IHF1YWxpdHlJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IHF1YWxpdHlJbmRleFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFF1YWxpdHlMYWJlbChzb3VyY2VzW3F1YWxpdHlJbmRleF0ubGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgaWYobmVlZFByb3ZpZGVyQ2hhbmdlKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX2xvYWQoZWxGbGFzaC5nZXRDdXJyZW50VGltZSgpIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRRdWFsaXR5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnN0b3AgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIDogc3RvcCgpIFwiKTtcclxuICAgICAgICBlbEZsYXNoLnN0b3AoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IGRlc3Ryb3koKSBwbGF5ZXIgc3RvcCwgbGlzdGVuZXIsIGV2ZW50IGRlc3Ryb2llZFwiKTtcclxuXHJcbiAgICAgICAgZWxGbGFzaC5yZW1vdmUoKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9YWFggOiBJIGhvcGUgdXNpbmcgZXM2IGNsYXNzZXMuIGJ1dCBJIHRoaW5rIHRvIG9jY3VyIHByb2JsZW0gZnJvbSBPbGQgSUUuIFRoZW4gSSBjaG9pY2UgZnVuY3Rpb24gaW5oZXJpdC4gRmluYWxseSB1c2luZyBzdXBlciBmdW5jdGlvbiBpcyBzbyBkaWZmaWN1bHQuXHJcbiAgICAvLyB1c2UgOiBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7IC4uLiBzdXBlcl9kZXN0cm95KCk7XHJcbiAgICB0aGF0LnN1cGVyID0gKG5hbWUpID0+IHtcclxuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGF0W25hbWVdO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm92aWRlcjsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDIzLi5cclxuICovXHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7UFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvZmxhc2gvUHJvdmlkZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBydG1wIHByb3ZpZGVyXHJcbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cclxuICogKi9cclxuXHJcblxyXG5jb25zdCBSdG1wID0gZnVuY3Rpb24oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpe1xyXG5cclxuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyLCBQUk9WSURFUl9SVE1QKTtcclxuICAgIGxldCBlbGVtZW50ID0gbWVkaWFNYW5hZ2VyLmNyZWF0ZSgpO1xyXG5cclxuICAgIGxldCB0aGF0ID0gUHJvdmlkZXIoUFJPVklERVJfUlRNUCwgZWxlbWVudCwgcGxheWVyQ29uZmlnKTtcclxuICAgIGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJSVE1QIFBST1ZJREVSIExPQURFRC5cIik7XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJSVE1QIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcclxuICAgICAgICBzdXBlcl9kZXN0cm95KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJ0bXA7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxuICovXG5cblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXIgPSBmdW5jdGlvbigpe1xuICAgIGlmKChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPcGVyYVwiKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpKSAhPSAtMSApe1xuICAgICAgICByZXR1cm4gJ29wZXJhJztcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIikgIT0gLTEgKXtcbiAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlNhZmFyaVwiKSAhPSAtMSl7XG4gICAgICAgIHJldHVybiAnc2FmYXJpJztcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpICE9IC0xICl7XG4gICAgICAgIHJldHVybiAnZmlyZWZveCc7XG4gICAgfWVsc2UgaWYoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIikgIT0gLTEgKSl7XG4gICAgICAgIGxldCBtc2llID0gYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpO1xuICAgICAgICBpZighIWRvY3VtZW50LmRvY3VtZW50TW9kZSA9PSB0cnVlICl7XG4gICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgfWVsc2UgaWYoISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LipydlxcOjExXFwuLykpe1xuICAgICAgICAgICAgaWYgKCFpc05hTihwYXJzZUludCh1YS5zdWJzdHJpbmcobXNpZSArIDUsIHVhLmluZGV4T2YoXCIuXCIsIG1zaWUpKSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpZSc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XG4gICAgICAgIH1cblxuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgIH1cblxufTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==