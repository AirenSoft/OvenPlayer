/*! OvenPlayerv0.7.2 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.RtmpProvider"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL21lZGlhL01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9mbGFzaC9MaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2ZsYXNoL1Byb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvZmxhc2gvUnRtcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYnJvd3Nlci5qcyJdLCJuYW1lcyI6WyJNYW5hZ2VyIiwiY29udGFpbmVyIiwicHJvdmlkZXJUeXBlIiwidGhhdCIsInJvb3RJZCIsImdldEF0dHJpYnV0ZSIsIm1lZGlhRWxlbWVudCIsImJyb3dzZXJUeXBlIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJjcmVhdGVNZWRpYUVsZW1lbnQiLCJQUk9WSURFUl9SVE1QIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJtb3ZpZSIsImZsYXNodmFycyIsImFsbG93c2NyaXB0YWNjZXNzIiwiYWxsb3dmdWxsc2NyZWVuIiwicXVhbGl0eSIsImNyZWF0ZSIsImRlc3Ryb3kiLCJyZW1vdmVDaGlsZCIsIkxpc3RlbmVyIiwiZWxGbGFzaCIsInByb3ZpZGVyIiwiaXNKU1JlYWR5IiwidGltZSIsImRhdGEiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9USU1FIiwiQ09OVEVOVF9CVUZGRVIiLCJ2b2x1bWVDaGFuZ2VkIiwiQ09OVEVOVF9WT0xVTUUiLCJzdGF0ZUNoYW5nZWQiLCJzZXRTdGF0ZSIsIm5ld3N0YXRlIiwiUExBWUVSX1NUQVRFIiwibWV0YUNoYW5nZWQiLCJDT05URU5UX01FVEEiLCJlcnJvciIsIlNUQVRFX0VSUk9SIiwicGF1c2UiLCJFUlJPUiIsIlByb3ZpZGVyIiwicHJvdmlkZXJOYW1lIiwiZWxlbWVudCIsInBsYXllckNvbmZpZyIsImxpc3RlbmVyIiwiY2FuU2VlayIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJjdXJyZW50UXVhbGl0eSIsInNvdXJjZXMiLCJwaWNrQ3VycmVudFF1YWxpdHkiLCJNYXRoIiwibWF4IiwibGFiZWwiLCJpIiwibGVuZ3RoIiwiZGVmYXVsdCIsImdldFF1YWxpdHlMYWJlbCIsIl9sb2FkIiwibGFzdFBsYXlQb3NpdGlvbiIsInNvdXJjZSIsInByZXZpb3VzU291cmNlIiwiZ2V0Q3VycmVudFNvdXJjZSIsInNvdXJjZUNoYW5nZWQiLCJmaWxlIiwibG9hZCIsImdldFBvc2l0aW9uIiwic2VlayIsInBsYXkiLCJDT05URU5UX0xFVkVMUyIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsImZ1bmNOYW1lIiwiZnVuY0RhdGEiLCJnZXROYW1lIiwic2V0Q2FuU2VlayIsImNhblNlZWtfIiwiaXNTZWVraW5nIiwic2V0U2Vla2luZyIsInNlZWtpbmdfIiwibmV3U3RhdGUiLCJnZXRTdGF0ZSIsInNldEJ1ZmZlciIsIm5ld0J1ZmZlciIsImdldEJ1ZmZlciIsImdldER1cmF0aW9uIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0TXV0ZSIsImdldE11dGUiLCJwcmVsb2FkIiwic291cmNlc18iLCJyZXRyeUNvdW50IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjaGVja1N3ZklzUmVhZHkiLCJpc0ZsYXNoUmVhZHkiLCJzZXRUaW1lb3V0Iiwic3RhcnR0aW1lIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicXVhbGl0eUxldmVscyIsIm1hcCIsImluZGV4IiwidHlwZSIsImdldEN1cnJlbnRRdWFsaXR5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJuZWVkUHJvdmlkZXJDaGFuZ2UiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJzZXRRdWFsaXR5TGFiZWwiLCJnZXRDdXJyZW50VGltZSIsInN0b3AiLCJyZW1vdmUiLCJzdXBlciIsIm5hbWUiLCJtZXRob2QiLCJhcHBseSIsImFyZ3VtZW50cyIsIlJ0bXAiLCJtZWRpYU1hbmFnZXIiLCJzdXBlcl9kZXN0cm95IiwiZ2V0QnJvd3NlciIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImluZGV4T2YiLCJtc2llIiwiYXZpZ2F0b3IiLCJkb2N1bWVudE1vZGUiLCJtYXRjaCIsImlzTmFOIiwicGFyc2VJbnQiLCJ1YSIsInN1YnN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQTs7QUFDQTs7QUFOQTs7Ozs7QUFRQSxJQUFNQSxVQUFVLFNBQVZBLE9BQVUsQ0FBU0MsU0FBVCxFQUFvQkMsWUFBcEIsRUFBaUM7QUFDN0MsUUFBTUMsT0FBTyxFQUFiO0FBQ0EsUUFBSUMsU0FBU0gsVUFBVUksWUFBVixDQUF1QixnQkFBdkIsQ0FBYjtBQUNBLFFBQUlDLGVBQWUsRUFBbkI7QUFDQSxRQUFJQyxjQUFjLDBCQUFsQjs7QUFFQUMsc0JBQWtCQyxHQUFsQixDQUFzQix3Q0FBdUNGLFdBQTdEO0FBQ0EsUUFBTUcscUJBQXFCLFNBQXJCQSxrQkFBcUIsR0FBVTtBQUNqQyxZQUFHUixpQkFBaUJTLHdCQUFwQixFQUFrQztBQUM5QkwsMkJBQWVNLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZjtBQUNBUCx5QkFBYVEsWUFBYixDQUEwQix1QkFBMUIsRUFBbUQsRUFBbkQ7QUFDQVIseUJBQWFRLFlBQWIsQ0FBMEIsb0JBQTFCLEVBQWdELEVBQWhEO0FBQ0FSLHlCQUFhUSxZQUFiLENBQTBCLGFBQTFCLEVBQXlDLEVBQXpDO0FBQ0FiLHNCQUFVYyxXQUFWLENBQXNCVCxZQUF0QjtBQUVILFNBUEQsTUFPSztBQUNELGdCQUFJVSxjQUFKO0FBQUEsZ0JBQVdDLGtCQUFYO0FBQUEsZ0JBQXNCQywwQkFBdEI7QUFBQSxnQkFBeUNDLHdCQUF6QztBQUFBLGdCQUEwREMsZ0JBQTFEO0FBQ0FKLG9C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O0FBQ0gsS0FGSyxNQUVBLElBQUdGLFVBQVVDLFNBQVYsQ0FBb0JDLE9BQXBCLENBQTRCLFFBQTVCLEtBQXlDLENBQUMsQ0FBN0MsRUFBK0M7QUFDakQsZUFBTyxRQUFQO0FBQ0gsS0FGSyxNQUVBLElBQUdGLFVBQVVDLFNBQVYsQ0FBb0JDLE9BQXBCLENBQTRCLFNBQTVCLEtBQTBDLENBQUMsQ0FBOUMsRUFBaUQ7QUFDbkQsZUFBTyxTQUFQO0FBQ0gsS0FGSyxNQUVBLElBQUlGLFVBQVVDLFNBQVYsQ0FBb0JDLE9BQXBCLENBQTRCLE1BQTVCLEtBQXVDLENBQUMsQ0FBNUMsRUFBZ0Q7QUFDbEQsWUFBSUMsT0FBT0MsU0FBU0gsU0FBVCxDQUFtQkMsT0FBbkIsQ0FBMkIsTUFBM0IsQ0FBWDtBQUNBLFlBQUcsQ0FBQyxDQUFDNUgsU0FBUytILFlBQVgsSUFBMkIsSUFBOUIsRUFBb0M7QUFDaEMsbUJBQU8sSUFBUDtBQUNILFNBRkQsTUFFTSxJQUFHLENBQUMsQ0FBQ0wsVUFBVUMsU0FBVixDQUFvQkssS0FBcEIsQ0FBMEIsbUJBQTFCLENBQUwsRUFBb0Q7QUFDdEQsZ0JBQUksQ0FBQ0MsTUFBTUMsU0FBU0MsR0FBR0MsU0FBSCxDQUFhUCxPQUFPLENBQXBCLEVBQXVCTSxHQUFHUCxPQUFILENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBdkIsQ0FBVCxDQUFOLENBQUwsRUFBcUU7QUFDakUsdUJBQU8sSUFBUDtBQUNILGFBRkQsTUFFSztBQUNELHVCQUFPLFNBQVA7QUFDSDtBQUNKLFNBTkssTUFNRDtBQUNELG1CQUFPLFNBQVA7QUFDSDtBQUVKLEtBZEssTUFjRDtBQUNELGVBQU8sU0FBUDtBQUNIO0FBRUosQ0EzQk0sQyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxuICogQHBhcmFtICAge2VsZW1lbnR9ICAgY29udGFpbmVyICAgZG9tIGVsZW1lbnRcbiAqXG4gKiAqL1xuaW1wb3J0IHtnZXRCcm93c2VyfSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xuaW1wb3J0IHtQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyLCBwcm92aWRlclR5cGUpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgcm9vdElkID0gY29udGFpbmVyLmdldEF0dHJpYnV0ZShcImRhdGEtcGFyZW50LWlkXCIpO1xuICAgIGxldCBtZWRpYUVsZW1lbnQgPSBcIlwiO1xuICAgIGxldCBicm93c2VyVHlwZSA9IGdldEJyb3dzZXIoKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBsb2FkZWQuIGJyb3dzZXJUeXBlIDogXCIrIGJyb3dzZXJUeXBlKTtcbiAgICBjb25zdCBjcmVhdGVNZWRpYUVsZW1lbnQgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZihwcm92aWRlclR5cGUgIT09IFBST1ZJREVSX1JUTVApe1xuICAgICAgICAgICAgbWVkaWFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVSZW1vdGVQbGF5YmFjaycsICcnKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dlYmtpdC1wbGF5c2lubGluZScsICcnKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJycpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lZGlhRWxlbWVudCk7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgbW92aWUsIGZsYXNodmFycywgYWxsb3dzY3JpcHRhY2Nlc3MsIGFsbG93ZnVsbHNjcmVlbiwgcXVhbGl0eTtcbiAgICAgICAgICAgIG1vdmllID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgnbmFtZScsICdtb3ZpZScpO1xuICAgICAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICcuL292ZW5wbGF5ZXIvT3ZlblBsYXllckZsYXNoLnN3ZicpO1xuXG4gICAgICAgICAgICBmbGFzaHZhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdmbGFzaHZhcnMnKTtcbiAgICAgICAgICAgIC8vcGxheWVySWQgdXNlcyBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cbiAgICAgICAgICAgIGZsYXNodmFycy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3BsYXllcklkPScrcm9vdElkKTtcblxuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93c2NyaXB0YWNjZXNzJyk7XG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xuXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd2Z1bGxzY3JlZW4nKTtcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcblxuICAgICAgICAgICAgcXVhbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XG4gICAgICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGVpZ2h0Jyk7XG5cbiAgICAgICAgICAgIGlmKGJyb3dzZXJUeXBlICE9PSBcImllXCIpe1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZWRpYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEnLCAnLi9vdmVucGxheWVyL092ZW5QbGF5ZXJGbGFzaC5zd2YnKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgcm9vdElkK1wiLWZsYXNoXCIpO1xuICAgICAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJyk7XG5cbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xuICAgICAgICAgICAgbWVkaWFFbGVtZW50LmFwcGVuZENoaWxkKGFsbG93c2NyaXB0YWNjZXNzKTtcbiAgICAgICAgICAgIG1lZGlhRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd2Z1bGxzY3JlZW4pO1xuICAgICAgICAgICAgLyppZihicm93c2VyVHlwZSAhPT0gXCJpZVwiKXtcbiAgICAgICAgICAgICAgICBtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lZGlhRWxlbWVudDtcbiAgICB9O1xuXG4gICAgdGhhdC5jcmVhdGUgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGNyZWF0ZUVsZW1lbnQoKVwiKTtcbiAgICAgICAgaWYobWVkaWFFbGVtZW50KXtcbiAgICAgICAgICAgIHRoYXQuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciByZW1vdmVFbGVtZW50KClcIik7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChtZWRpYUVsZW1lbnQpO1xuICAgICAgICBtZWRpYUVsZW1lbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNy4uXG4gKi9cbmltcG9ydCB7XG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9DT01QTEVURSxcbiAgICBDT05URU5UX1NFRUssXG4gICAgQ09OVEVOVF9CVUZGRVJfRlVMTCxcbiAgICBDT05URU5UX1NFRUtFRCxcbiAgICBDT05URU5UX0JVRkZFUixcbiAgICBDT05URU5UX1RJTUUsXG4gICAgQ09OVEVOVF9WT0xVTUUsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfRklMRV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEUsXG4gICAgUFJPVklERVJfSFRNTDUsXG4gICAgUFJPVklERVJfV0VCUlRDLFxuICAgIFBST1ZJREVSX0RBU0gsXG4gICAgUFJPVklERVJfSExTXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IExpc3RlbmVyID0gZnVuY3Rpb24oZWxGbGFzaCwgcHJvdmlkZXIpe1xuICAgIGxldCB0aGF0ID0ge307XG5cbiAgICB0aGF0LmlzSlNSZWFkeSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHRoYXQudGltZSA9IChkYXRhKSA9PntcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUUsIGRhdGEpO1xuICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfQlVGRkVSLCBkYXRhKTtcbiAgICB9O1xuICAgIHRoYXQudm9sdW1lQ2hhbmdlZCA9IChkYXRhKSA9PntcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1ZPTFVNRSwgZGF0YSk7XG4gICAgfTtcbiAgICB0aGF0LnN0YXRlQ2hhbmdlZCA9IChkYXRhKSA9PntcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoZGF0YS5uZXdzdGF0ZSk7XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoUExBWUVSX1NUQVRFLCBkYXRhKTtcbiAgICB9O1xuICAgIHRoYXQubWV0YUNoYW5nZWQgPSAoZGF0YSkgPT57XG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9NRVRBLCBkYXRhKTtcbiAgICB9O1xuICAgIHRoYXQuZXJyb3IgPSAoZXJyb3IpID0+e1xuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XG4gICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG5cbiAgICAgICAgLy9QUklWQVRFX1NUQVRFX0VSUk9SXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yKTtcblxuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RlbmVyOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDIzLi5cbiAqL1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IEV2ZW50c0xpc3RlbmVyIGZyb20gXCJhcGkvcHJvdmlkZXIvZmxhc2gvTGlzdGVuZXJcIjtcbmltcG9ydCBQcm9taXNlLCB7cmVzb2x2ZWR9IGZyb20gXCJhcGkvc2hpbXMvcHJvbWlzZVwiO1xuaW1wb3J0IHtcbiAgICBTVEFURV9JRExFLCBTVEFURV9QTEFZSU5HLCBTVEFURV9QQVVTRUQsIFNUQVRFX0NPTVBMRVRFLFxuICAgIFBMQVlFUl9TVEFURSwgUExBWUVSX0NPTVBMRVRFLCBQTEFZRVJfUEFVU0UsIFBMQVlFUl9QTEFZLFxuICAgIENPTlRFTlRfTEVWRUxTLCBDT05URU5UX0xFVkVMX0NIQU5HRUQsIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELFxuICAgIFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCwgQ09OVEVOVF9NVVRFLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFNcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBDb3JlIEZvciBGbGFzaCBWaWRlby5cbiAqIEBwYXJhbSAgIGVsZW1lbnQgZmxhc2ggb2JqZWN0IGVsZW1lbnRcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgcGxheWVyIGNvbmZpZ1xuICogKi9cblxuXG5jb25zdCBQcm92aWRlciA9IGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSwgZWxlbWVudCwgcGxheWVyQ29uZmlnKXtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDT1JFIGxvYWRlZC4gXCIpO1xuXG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XG5cbiAgICBsZXQgZWxGbGFzaCA9IGVsZW1lbnQ7XG4gICAgbGV0IGxpc3RlbmVyID0gRXZlbnRzTGlzdGVuZXIoZWxGbGFzaCwgdGhhdCk7XG4gICAgbGV0IGNhblNlZWsgPSBmYWxzZTtcbiAgICBsZXQgc2Vla2luZyA9IGZhbHNlO1xuICAgIGxldCBzdGF0ZSA9IFNUQVRFX0lETEU7XG4gICAgbGV0IGJ1ZmZlciA9IDA7XG4gICAgbGV0IGN1cnJlbnRRdWFsaXR5ID0gLTE7XG4gICAgbGV0IHNvdXJjZXMgPSBbXTtcblxuICAgIGNvbnN0IHBpY2tDdXJyZW50UXVhbGl0eSA9IChzb3VyY2VzKSA9PntcbiAgICAgICAgdmFyIHF1YWxpdHkgPSBNYXRoLm1heCgwLCBjdXJyZW50UXVhbGl0eSk7XG4gICAgICAgIGNvbnN0IGxhYmVsID1cIlwiO1xuICAgICAgICBpZiAoc291cmNlcykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICBxdWFsaXR5ID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVhbGl0eTtcbiAgICB9O1xuXG4gICAgY29uc3QgX2xvYWQgPSAobGFzdFBsYXlQb3NpdGlvbikgPT57XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICBzb3VyY2VzW2N1cnJlbnRRdWFsaXR5XTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTb3VyY2UgPSBlbEZsYXNoLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICAgICAgY29uc3Qgc291cmNlQ2hhbmdlZCA9IChzb3VyY2UuZmlsZSAhPT0gcHJldmlvdXNTb3VyY2UpO1xuXG4gICAgICAgIGlmIChzb3VyY2VDaGFuZ2VkKSB7XG4gICAgICAgICAgICBlbEZsYXNoLmxvYWQoc291cmNlLmZpbGUpO1xuICAgICAgICB9ZWxzZSBpZihsYXN0UGxheVBvc2l0aW9uID09PSAwICYmIHRoYXQuZ2V0UG9zaXRpb24oKSA+IDApe1xuICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcbiAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMUywge1xuICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IGN1cnJlbnRRdWFsaXR5XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvL1RoaXMgaXMgd2h5LiBGbGFzaCBkb2VzIG5vdCBzZWxmIHRyaWcgdG8gYWRzLGxtYWxtLFxuICAgIHRoYXQudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsID0gKGZ1bmNOYW1lLCBmdW5jRGF0YSkgPT4ge1xuICAgICAgICBpZihsaXN0ZW5lcltmdW5jTmFtZV0pe1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyW2Z1bmNOYW1lXShmdW5jRGF0YSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0TmFtZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyTmFtZTtcbiAgICB9O1xuXG4gICAgdGhhdC5jYW5TZWVrID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gY2FuU2VlaztcbiAgICB9O1xuICAgIHRoYXQuc2V0Q2FuU2VlayA9IChjYW5TZWVrXykgPT4ge1xuICAgICAgICBjYW5TZWVrID0gY2FuU2Vla187XG4gICAgfTtcbiAgICB0aGF0LmlzU2Vla2luZyA9ICgpPT57XG4gICAgICAgIHJldHVybiBzZWVraW5nO1xuICAgIH07XG4gICAgdGhhdC5zZXRTZWVraW5nID0gKHNlZWtpbmdfKT0+e1xuICAgICAgICBzZWVraW5nID0gc2Vla2luZ187XG4gICAgfTtcblxuICAgIHRoYXQuc2V0U3RhdGUgPSAobmV3U3RhdGUpID0+IHtcbiAgICAgICAgc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRCdWZmZXIgPSAobmV3QnVmZmVyKSA9PiB7XG5cbiAgICB9O1xuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRCdWZmZXIoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldER1cmF0aW9uKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gZWxGbGFzaC5nZXRQb3NpdGlvbigpO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XG4gICAgICAgIHJldHVybiBlbEZsYXNoLnNldFZvbHVtZSh2b2x1bWUpO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldFZvbHVtZSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRNdXRlID0gKCkgPT57XG4gICAgICAgIGVsRmxhc2guc2V0TXV0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBlbEZsYXNoLmdldE11dGUoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5wcmVsb2FkID0gKHNvdXJjZXNfLCBsYXN0UGxheVBvc2l0aW9uKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ09SRSA6IHByZWxvYWQoKSBcIiwgc291cmNlc18sIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XG5cbiAgICAgICAgc291cmNlcyA9IHNvdXJjZXNfO1xuICAgICAgICBjdXJyZW50UXVhbGl0eSA9IHBpY2tDdXJyZW50UXVhbGl0eShzb3VyY2VzKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrU3dmSXNSZWFkeSgpe1xuICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgaWYoZWxGbGFzaC5pc0ZsYXNoUmVhZHkgJiYgZWxGbGFzaC5pc0ZsYXNoUmVhZHkoKSl7XG4gICAgICAgICAgICAgICAgICAgIF9sb2FkKGxhc3RQbGF5UG9zaXRpb24gfHwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAzMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrU3dmSXNSZWFkeSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHNvdXJjZXNfKSA9PntcbiAgICAgICAgc291cmNlcyA9IHNvdXJjZXNfO1xuICAgICAgICBjdXJyZW50UXVhbGl0eSA9IHBpY2tDdXJyZW50UXVhbGl0eShzb3VyY2VzKTtcbiAgICAgICAgX2xvYWQoc291cmNlc18uc3RhcnR0aW1lIHx8IDApO1xuICAgIH07XG5cbiAgICB0aGF0LnBsYXkgPSAoKSA9PntcbiAgICAgICAgZWxGbGFzaC5wbGF5KCk7XG4gICAgfVxuICAgIHRoYXQucGF1c2UgPSAoKSA9PntcbiAgICAgICAgZWxGbGFzaC5wYXVzZSgpO1xuICAgIH07XG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PntcbiAgICAgICAgZWxGbGFzaC5zZWVrKHBvc2l0aW9uKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PiB7XG4gICAgICAgIGxldCBxdWFsaXR5TGV2ZWxzID0gc291cmNlcy5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBmaWxlOiBzb3VyY2UuZmlsZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBzb3VyY2UudHlwZSxcbiAgICAgICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxuICAgICAgICAgICAgICAgIGluZGV4IDogaW5kZXhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcXVhbGl0eUxldmVscztcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2N1cnJlbnRRdWFsaXR5XTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpbGU6IHNvdXJjZS5maWxlLFxuICAgICAgICAgICAgdHlwZTogc291cmNlLnR5cGUsXG4gICAgICAgICAgICBsYWJlbDogc291cmNlLmxhYmVsLFxuICAgICAgICAgICAgaW5kZXggOiBjdXJyZW50UXVhbGl0eVxuICAgICAgICB9O1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgsIG5lZWRQcm92aWRlckNoYW5nZSkgPT4ge1xuICAgICAgICBpZihjdXJyZW50UXVhbGl0eSA9PSBxdWFsaXR5SW5kZXgpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYocXVhbGl0eUluZGV4ID4gLTEpe1xuICAgICAgICAgICAgaWYoc291cmNlcyAmJiBzb3VyY2VzLmxlbmd0aCA+IHF1YWxpdHlJbmRleCl7XG4gICAgICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9JRExFKTtcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzb3VyY2UgY2hhbmdlZCA6IFwiICsgcXVhbGl0eUluZGV4KTtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eSA9IHF1YWxpdHlJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IHF1YWxpdHlJbmRleFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFF1YWxpdHlMYWJlbChzb3VyY2VzW3F1YWxpdHlJbmRleF0ubGFiZWwpO1xuICAgICAgICAgICAgICAgIGlmKG5lZWRQcm92aWRlckNoYW5nZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgX2xvYWQoZWxGbGFzaC5nZXRDdXJyZW50VGltZSgpIHx8IDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFF1YWxpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5zdG9wID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBzdG9wKCkgXCIpO1xuICAgICAgICBlbEZsYXNoLnN0b3AoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNPUkUgOiBkZXN0cm95KCkgcGxheWVyIHN0b3AsIGxpc3RlbmVyLCBldmVudCBkZXN0cm9pZWRcIik7XG5cbiAgICAgICAgZWxGbGFzaC5yZW1vdmUoKTtcbiAgICB9O1xuXG4gICAgLy9YWFggOiBJIGhvcGUgdXNpbmcgZXM2IGNsYXNzZXMuIGJ1dCBJIHRoaW5rIHRvIG9jY3VyIHByb2JsZW0gZnJvbSBPbGQgSUUuIFRoZW4gSSBjaG9pY2UgZnVuY3Rpb24gaW5oZXJpdC4gRmluYWxseSB1c2luZyBzdXBlciBmdW5jdGlvbiBpcyBzbyBkaWZmaWN1bHQuXG4gICAgLy8gdXNlIDogbGV0IHN1cGVyX2Rlc3Ryb3kgID0gdGhhdC5zdXBlcignZGVzdHJveScpOyAuLi4gc3VwZXJfZGVzdHJveSgpO1xuICAgIHRoYXQuc3VwZXIgPSAobmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGF0W25hbWVdO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBQcm92aWRlcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyMy4uXG4gKi9cbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XG5pbXBvcnQge1BST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9mbGFzaC9Qcm92aWRlclwiO1xuXG4vKipcbiAqIEBicmllZiAgIHJ0bXAgcHJvdmlkZXJcbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5cbmNvbnN0IFJ0bXAgPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XG5cbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgUFJPVklERVJfUlRNUCk7XG4gICAgbGV0IGVsZW1lbnQgPSBtZWRpYU1hbmFnZXIuY3JlYXRlKCk7XG5cbiAgICBsZXQgdGhhdCA9IFByb3ZpZGVyKFBST1ZJREVSX1JUTVAsIGVsZW1lbnQsIHBsYXllckNvbmZpZyk7XG4gICAgbGV0IHN1cGVyX2Rlc3Ryb3kgID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUlRNUCBQUk9WSURFUiBMT0FERUQuXCIpO1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIG1lZGlhTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlJUTVAgOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xuICAgICAgICBzdXBlcl9kZXN0cm95KCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBSdG1wOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cbiAqL1xuXG5cbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyID0gZnVuY3Rpb24oKXtcbiAgICBpZigobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT3BlcmFcIikgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPUFInKSkgIT0gLTEgKXtcbiAgICAgICAgcmV0dXJuICdvcGVyYSc7XG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpICE9IC0xICl7XG4gICAgICAgIHJldHVybiAnY2hyb21lJztcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJTYWZhcmlcIikgIT0gLTEpe1xuICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiRmlyZWZveFwiKSAhPSAtMSApe1xuICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xuICAgIH1lbHNlIGlmKChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpICE9IC0xICkpe1xuICAgICAgICBsZXQgbXNpZSA9IGF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKTtcbiAgICAgICAgaWYoISFkb2N1bWVudC5kb2N1bWVudE1vZGUgPT0gdHJ1ZSApe1xuICAgICAgICAgICAgcmV0dXJuICdpZSc7XG4gICAgICAgIH1lbHNlIGlmKCEhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvVHJpZGVudC4qcnZcXDoxMVxcLi8pKXtcbiAgICAgICAgICAgIGlmICghaXNOYU4ocGFyc2VJbnQodWEuc3Vic3RyaW5nKG1zaWUgKyA1LCB1YS5pbmRleE9mKFwiLlwiLCBtc2llKSkpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnaWUnO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgICAgICB9XG5cbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICB9XG5cbn07XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=