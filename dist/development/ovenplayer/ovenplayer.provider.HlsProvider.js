/*! OvenPlayerv0.9.0 | (c)2020 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.HlsProvider"],{

/***/ "./src/js/api/provider/html5/providers/Hls.js":
/*!****************************************************!*\
  !*** ./src/js/api/provider/html5/providers/Hls.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Provider = __webpack_require__(/*! api/provider/html5/Provider */ "./src/js/api/provider/html5/Provider.js");

var _Provider2 = _interopRequireDefault(_Provider);

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _constants2 = __webpack_require__(/*! ../../../constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   hlsjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

var HlsProvider = function HlsProvider(element, playerConfig, adTagUrl) {
    var that = {};
    var hls = null;
    var superPlay_func = null;
    var superStop_func = null;
    var superDestroy_func = null;
    var loadRetryer = null;
    var isManifestLoaded = false;
    var firstLoaded = false;

    try {

        var hlsConfig = {
            debug: false,
            maxBufferLength: 20,
            maxMaxBufferLength: 30,
            fragLoadingMaxRetry: 0,
            manifestLoadingMaxRetry: 0,
            levelLoadingMaxRetry: 0
        };

        var hlsConfigFromPlayerConfig = playerConfig.getConfig().hlsConfig;

        if (hlsConfigFromPlayerConfig) {

            for (var key in hlsConfigFromPlayerConfig) {
                hlsConfig[key] = hlsConfigFromPlayerConfig[key];
            }
        }

        hls = new Hls(hlsConfig);

        window.op_hls = hls;

        hls.attachMedia(element);

        var spec = {
            name: _constants.PROVIDER_HLS,
            element: element,
            mse: hls,
            listener: null,
            isLoaded: false,
            canSeek: false,
            isLive: false,
            seeking: false,
            state: _constants.STATE_IDLE,
            buffer: 0,
            framerate: 0,
            currentQuality: -1,
            currentSource: -1,
            qualityLevels: [],
            sources: [],
            adTagUrl: adTagUrl
        };

        that = (0, _Provider2["default"])(spec, playerConfig, function (source, lastPlayPosition) {

            OvenPlayerConsole.log("HLS : onExtendedLoad : ", source, "lastPlayPosition : " + lastPlayPosition);

            var loadingRetryCount = playerConfig.getConfig().loadingRetryCount;

            hls.loadSource(source.file);

            hls.once(Hls.Events.MANIFEST_LOADED, function (event, data) {

                isManifestLoaded = true;
            });

            hls.once(Hls.Events.LEVEL_LOADED, function (event, data) {

                firstLoaded = true;

                if (loadRetryer) {
                    clearTimeout(loadRetryer);
                    loadRetryer = null;
                }

                hls.config.fragLoadingMaxRetry = 2;
                hls.config.manifestLoadingMaxRetry = 2;
                hls.config.levelLoadingMaxRetry = 2;

                if (data.details.live) {
                    spec.isLive = true;
                } else {

                    if (lastPlayPosition && lastPlayPosition >= 0) {
                        that.seek(lastPlayPosition);
                    } else if (source.sectionStart && source.sectionStart > 0) {
                        that.seek(source.sectionStart);
                    }
                }
                if (playerConfig.isAutoStart()) {
                    that.play();
                }
            });

            hls.on(Hls.Events.ERROR, function (event, data) {

                if (data && data.networkDetails && data.networkDetails.status === 202) {

                    that.setState(_constants.STATE_LOADING);

                    if (loadRetryer) {
                        clearTimeout(loadRetryer);
                        loadRetryer = null;
                    }

                    loadRetryer = setTimeout(function () {
                        that.stop();
                        hls.stopLoad();
                        hls.startLoad();
                        that.play();
                    }, 1000);
                } else {

                    if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {

                        if (!data.fatal) {
                            // do nothing when non fatal media error. hlsjs will recover it automatically.
                            return;
                        }
                    }

                    if (loadingRetryCount > 0) {

                        that.setState(_constants.STATE_LOADING);

                        if (loadRetryer) {
                            clearTimeout(loadRetryer);
                            loadRetryer = null;
                        }

                        loadingRetryCount = loadingRetryCount - 1;

                        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {

                            loadRetryer = setTimeout(function () {

                                that.stop();
                                hls.stopLoad();
                                hls.startLoad();
                                that.play();
                            }, 1000);
                        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {

                            loadRetryer = setTimeout(function () {

                                hls.recoverMediaError();
                                that.play();
                            }, 1000);
                        } else {

                            loadRetryer = setTimeout(function () {

                                that.stop();
                                hls.stopLoad();
                                hls.startLoad();
                                that.play();
                            }, 1000);
                        }
                    } else {

                        var errorType = _constants2.PLAYER_UNKNWON_NETWORK_ERROR;

                        if (data && data.networkDetails && data.networkDetails.status === 400) {
                            errorType = _constants2.PLAYER_BAD_REQUEST_ERROR;
                        } else if (data && data.networkDetails && data.networkDetails.status === 403) {
                            errorType = _constants2.PLAYER_AUTH_FAILED_ERROR;
                        } else if (data && data.networkDetails && data.networkDetails.status === 406) {
                            errorType = _constants2.PLAYER_NOT_ACCEPTABLE_ERROR;
                        }

                        var tempError = _constants.ERRORS.codes[errorType];
                        tempError.error = data.details;
                        (0, _utils.errorTrigger)(tempError, that);
                    }
                }
            });

            that.on(_constants.PLAYER_STATE, function (data) {

                if (!firstLoaded && data.prevstate === _constants.STATE_LOADING && data.newstate === _constants.STATE_IDLE) {

                    if (loadRetryer) {
                        clearTimeout(loadRetryer);
                        loadRetryer = null;
                    }

                    if (hls) {

                        hls.stopLoad();
                    }
                }
            });
        });

        superPlay_func = that["super"]('play');
        superDestroy_func = that["super"]('destroy');
        OvenPlayerConsole.log("HLS PROVIDER LOADED.");

        superStop_func = that["super"]('stop');

        that.play = function () {

            if (!isManifestLoaded) {
                var source = that.getSources()[that.getCurrentSource()].file;

                hls.loadSource(source);
            } else {
                superPlay_func();
            }
        };

        that.stop = function () {

            if (hls) {
                hls.stopLoad();
            }

            superStop_func();
        };

        that.destroy = function () {

            if (hls) {
                hls.destroy();
            }

            hls = null;
            OvenPlayerConsole.log("HLS : PROVIDER DESTROUYED.");
            superDestroy_func();
        };
    } catch (error) {
        var tempError = _constants.ERRORS.codes[_constants.INIT_HLSJS_NOTFOUND];
        tempError.error = error;
        throw tempError;
    }

    return that;
}; /**
    * Created by hoho on 2018. 6. 7..
    */
exports["default"] = HlsProvider;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJQbGF5X2Z1bmMiLCJzdXBlclN0b3BfZnVuYyIsInN1cGVyRGVzdHJveV9mdW5jIiwibG9hZFJldHJ5ZXIiLCJpc01hbmlmZXN0TG9hZGVkIiwiZmlyc3RMb2FkZWQiLCJobHNDb25maWciLCJkZWJ1ZyIsIm1heEJ1ZmZlckxlbmd0aCIsIm1heE1heEJ1ZmZlckxlbmd0aCIsImZyYWdMb2FkaW5nTWF4UmV0cnkiLCJtYW5pZmVzdExvYWRpbmdNYXhSZXRyeSIsImxldmVsTG9hZGluZ01heFJldHJ5IiwiaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZyIsImdldENvbmZpZyIsImtleSIsIkhscyIsIndpbmRvdyIsIm9wX2hscyIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRpbmdSZXRyeUNvdW50IiwibG9hZFNvdXJjZSIsImZpbGUiLCJvbmNlIiwiRXZlbnRzIiwiTUFOSUZFU1RfTE9BREVEIiwiZXZlbnQiLCJkYXRhIiwiTEVWRUxfTE9BREVEIiwiY2xlYXJUaW1lb3V0IiwiY29uZmlnIiwiZGV0YWlscyIsImxpdmUiLCJzZWVrIiwic2VjdGlvblN0YXJ0IiwiaXNBdXRvU3RhcnQiLCJwbGF5Iiwib24iLCJFUlJPUiIsIm5ldHdvcmtEZXRhaWxzIiwic3RhdHVzIiwic2V0U3RhdGUiLCJTVEFURV9MT0FESU5HIiwic2V0VGltZW91dCIsInN0b3AiLCJzdG9wTG9hZCIsInN0YXJ0TG9hZCIsInR5cGUiLCJFcnJvclR5cGVzIiwiTUVESUFfRVJST1IiLCJmYXRhbCIsIk5FVFdPUktfRVJST1IiLCJyZWNvdmVyTWVkaWFFcnJvciIsImVycm9yVHlwZSIsIlBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IiLCJQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IiLCJQTEFZRVJfQVVUSF9GQUlMRURfRVJST1IiLCJQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1IiLCJ0ZW1wRXJyb3IiLCJFUlJPUlMiLCJjb2RlcyIsImVycm9yIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwibmV3c3RhdGUiLCJnZXRTb3VyY2VzIiwiZ2V0Q3VycmVudFNvdXJjZSIsImRlc3Ryb3kiLCJJTklUX0hMU0pTX05PVEZPVU5EIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7O0FBTUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFPQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsQ0FBVUMsT0FBVixFQUFtQkMsWUFBbkIsRUFBaUNDLFFBQWpDLEVBQTJDO0FBQzNELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE1BQU0sSUFBVjtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLGNBQWMsSUFBbEI7QUFDQSxRQUFJQyxtQkFBbUIsS0FBdkI7QUFDQSxRQUFJQyxjQUFjLEtBQWxCOztBQUdBLFFBQUk7O0FBRUEsWUFBSUMsWUFBWTtBQUNaQyxtQkFBTyxLQURLO0FBRVpDLDZCQUFpQixFQUZMO0FBR1pDLGdDQUFvQixFQUhSO0FBSVpDLGlDQUFxQixDQUpUO0FBS1pDLHFDQUF5QixDQUxiO0FB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QUlKLEdBQUosRUFBUzs7QUFFTEEsNEJBQUltRSxRQUFKO0FBQ0g7QUFDSjtBQUNKLGFBZEQ7QUFlSCxTQTdJTSxDQUFQOztBQStJQWxFLHlCQUFpQkYsY0FBVyxNQUFYLENBQWpCO0FBQ0FJLDRCQUFvQkosY0FBVyxTQUFYLENBQXBCO0FBQ0F5QywwQkFBa0JDLEdBQWxCLENBQXNCLHNCQUF0Qjs7QUFFQXZDLHlCQUFpQkgsY0FBVyxNQUFYLENBQWpCOztBQUVBQSxhQUFLMkQsSUFBTCxHQUFZLFlBQU07O0FBRWQsZ0JBQUksQ0FBQ3JELGdCQUFMLEVBQXVCO0FBQ25CLG9CQUFJaUMsU0FBU3ZDLEtBQUt3RixVQUFMLEdBQWtCeEYsS0FBS3lGLGdCQUFMLEVBQWxCLEVBQTJDNUMsSUFBeEQ7O0FBRUE1QyxvQkFBSTJDLFVBQUosQ0FBZUwsTUFBZjtBQUNILGFBSkQsTUFJTztBQUNIckM7QUFDSDtBQUVKLFNBVkQ7O0FBWUFGLGFBQUttRSxJQUFMLEdBQVksWUFBTTs7QUFFZCxnQkFBSWxFLEdBQUosRUFBUztBQUNMQSxvQkFBSW1FLFFBQUo7QUFDSDs7QUFFRGpFO0FBQ0gsU0FQRDs7QUFTQUgsYUFBSzBGLE9BQUwsR0FBZSxZQUFNOztBQUVqQixnQkFBSXpGLEdBQUosRUFBUztBQUNMQSxvQkFBSXlGLE9BQUo7QUFDSDs7QUFFRHpGLGtCQUFNLElBQU47QUFDQXdDLDhCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCO0FBQ0F0QztBQUNILFNBVEQ7QUFVSCxLQWpPRCxDQWlPRSxPQUFPZ0YsS0FBUCxFQUFjO0FBQ1osWUFBSUgsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYVEsOEJBQWIsQ0FBaEI7QUFDQVYsa0JBQVVHLEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0EsY0FBTUgsU0FBTjtBQUNIOztBQUVELFdBQU9qRixJQUFQO0FBQ0gsQ0FuUEQsQyxDQXJCQTs7O3FCQTJRZUosVyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gNy4uXG4gKi9cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBQUk9WSURFUl9ITFMsXG4gICAgUExBWUVSX1NUQVRFLCBTVEFURV9JRExFLCBTVEFURV9MT0FESU5HLFxuICAgIElOSVRfREFTSF9VTlNVUFBPUlQsIEVSUk9SUyxcbiAgICBJTklUX0hMU0pTX05PVEZPVU5EXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuaW1wb3J0IHtQTEFZRVJfVU5LTldPTl9FUlJPUiwgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUiwgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLCBQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IsIFBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUiwgUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SfSBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgaGxzanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5cbmNvbnN0IEhsc1Byb3ZpZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpIHtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBobHMgPSBudWxsO1xuICAgIGxldCBzdXBlclBsYXlfZnVuYyA9IG51bGw7XG4gICAgbGV0IHN1cGVyU3RvcF9mdW5jID0gbnVsbDtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuICAgIGxldCBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgbGV0IGlzTWFuaWZlc3RMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgZmlyc3RMb2FkZWQgPSBmYWxzZTtcblxuXG4gICAgdHJ5IHtcblxuICAgICAgICBsZXQgaGxzQ29uZmlnID0ge1xuICAgICAgICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgICAgICAgbWF4QnVmZmVyTGVuZ3RoOiAyMCxcbiAgICAgICAgICAgIG1heE1heEJ1ZmZlckxlbmd0aDogMzAsXG4gICAgICAgICAgICBmcmFnTG9hZGluZ01heFJldHJ5OiAwLFxuICAgICAgICAgICAgbWFuaWZlc3RMb2FkaW5nTWF4UmV0cnk6IDAsXG4gICAgICAgICAgICBsZXZlbExvYWRpbmdNYXhSZXRyeTogMFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBobHNDb25maWdGcm9tUGxheWVyQ29uZmlnID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmhsc0NvbmZpZztcblxuICAgICAgICBpZiAoaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZykge1xuXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZykge1xuICAgICAgICAgICAgICAgIGhsc0NvbmZpZ1trZXldID0gaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZ1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaGxzID0gbmV3IEhscyhobHNDb25maWcpO1xuXG4gICAgICAgIHdpbmRvdy5vcF9obHMgPSBobHM7XG5cbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKGVsZW1lbnQpO1xuXG4gICAgICAgIGxldCBzcGVjID0ge1xuICAgICAgICAgICAgbmFtZTogUFJPVklERVJfSExTLFxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIG1zZTogaGxzLFxuICAgICAgICAgICAgbGlzdGVuZXI6IG51bGwsXG4gICAgICAgICAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgICAgICAgICBjYW5TZWVrOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBzZWVraW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXRlOiBTVEFURV9JRExFLFxuICAgICAgICAgICAgYnVmZmVyOiAwLFxuICAgICAgICAgICAgZnJhbWVyYXRlOiAwLFxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IC0xLFxuICAgICAgICAgICAgY3VycmVudFNvdXJjZTogLTEsXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzOiBbXSxcbiAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxuICAgICAgICAgICAgYWRUYWdVcmw6IGFkVGFnVXJsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24gKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbikge1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBvbkV4dGVuZGVkTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiICsgbGFzdFBsYXlQb3NpdGlvbik7XG5cbiAgICAgICAgICAgIGxldCBsb2FkaW5nUmV0cnlDb3VudCA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb2FkaW5nUmV0cnlDb3VudDtcblxuICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xuXG4gICAgICAgICAgICBobHMub25jZShIbHMuRXZlbnRzLk1BTklGRVNUX0xPQURFRCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBpc01hbmlmZXN0TG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBobHMub25jZShIbHMuRXZlbnRzLkxFVkVMX0xPQURFRCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBmaXJzdExvYWRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcbiAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGhscy5jb25maWcuZnJhZ0xvYWRpbmdNYXhSZXRyeSA9IDI7XG4gICAgICAgICAgICAgICAgaGxzLmNvbmZpZy5tYW5pZmVzdExvYWRpbmdNYXhSZXRyeSA9IDI7XG4gICAgICAgICAgICAgICAgaGxzLmNvbmZpZy5sZXZlbExvYWRpbmdNYXhSZXRyeSA9IDI7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5kZXRhaWxzLmxpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5pc0xpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RQbGF5UG9zaXRpb24gJiYgbGFzdFBsYXlQb3NpdGlvbiA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlLnNlY3Rpb25TdGFydCAmJiBzb3VyY2Uuc2VjdGlvblN0YXJ0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZWVrKHNvdXJjZS5zZWN0aW9uU3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaGxzLm9uKEhscy5FdmVudHMuRVJST1IsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gMjAyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdGFydExvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gSGxzLkVycm9yVHlwZXMuTUVESUFfRVJST1IpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLmZhdGFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90aGluZyB3aGVuIG5vbiBmYXRhbCBtZWRpYSBlcnJvci4gaGxzanMgd2lsbCByZWNvdmVyIGl0IGF1dG9tYXRpY2FsbHkuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRpbmdSZXRyeUNvdW50ID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ1JldHJ5Q291bnQgPSBsb2FkaW5nUmV0cnlDb3VudCAtIDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IEhscy5FcnJvclR5cGVzLk5FVFdPUktfRVJST1IpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT09IEhscy5FcnJvclR5cGVzLk1FRElBX0VSUk9SKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5yZWNvdmVyTWVkaWFFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0YXJ0TG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3JUeXBlID0gUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlID0gUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZSA9IFBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YSAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzICYmIGRhdGEubmV0d29ya0RldGFpbHMuc3RhdHVzID09PSA0MDYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGUgPSBQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbZXJyb3JUeXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGRhdGEuZGV0YWlscztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoYXQub24oUExBWUVSX1NUQVRFLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFmaXJzdExvYWRlZCAmJiBkYXRhLnByZXZzdGF0ZSA9PT0gU1RBVEVfTE9BRElORyAmJiBkYXRhLm5ld3N0YXRlID09PSBTVEFURV9JRExFKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGhscykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdXBlclBsYXlfZnVuYyA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyBQUk9WSURFUiBMT0FERUQuXCIpO1xuXG4gICAgICAgIHN1cGVyU3RvcF9mdW5jID0gdGhhdC5zdXBlcignc3RvcCcpO1xuXG4gICAgICAgIHRoYXQucGxheSA9ICgpID0+IHtcblxuICAgICAgICAgICAgaWYgKCFpc01hbmlmZXN0TG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IHRoYXQuZ2V0U291cmNlcygpW3RoYXQuZ2V0Q3VycmVudFNvdXJjZSgpXS5maWxlO1xuXG4gICAgICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VwZXJQbGF5X2Z1bmMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuc3RvcCA9ICgpID0+IHtcblxuICAgICAgICAgICAgaWYgKGhscykge1xuICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdXBlclN0b3BfZnVuYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcblxuICAgICAgICAgICAgaWYgKGhscykge1xuICAgICAgICAgICAgICAgIGhscy5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhscyA9IG51bGw7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBQUk9WSURFUiBERVNUUk9VWUVELlwiKTtcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tJTklUX0hMU0pTX05PVEZPVU5EXTtcbiAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHRocm93IHRlbXBFcnJvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgSGxzUHJvdmlkZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==