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
                    }
                }
                if (playerConfig.isAutoStart()) {
                    that.play();
                }
            });

            hls.on(Hls.Events.ERROR, function (event, data) {

                hls.once(Hls.Events.FRAG_LOADING, function () {
                    that.setState(_constants.STATE_LOADING);
                });

                if (data && data.networkDetails && data.networkDetails.status === 202) {

                    if (loadRetryer) {
                        clearTimeout(loadRetryer);
                        loadRetryer = null;
                    }

                    loadRetryer = setTimeout(function () {

                        if (hls) {

                            that.stop();
                            hls.stopLoad();
                            hls.startLoad();
                            that.play();
                        }
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

                                if (hls) {

                                    hls.stopLoad();
                                    hls.startLoad();
                                }

                                that.play();
                            }, 1000);
                        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {

                            loadRetryer = setTimeout(function () {

                                if (hls) {

                                    hls.recoverMediaError();
                                }

                                that.play();
                            }, 1000);
                        } else {

                            loadRetryer = setTimeout(function () {

                                that.stop();

                                if (hls) {

                                    hls.stopLoad();
                                    hls.startLoad();
                                }

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

                if (hls) {
                    hls.loadSource(source);
                }
            } else {
                superPlay_func();
            }
        };

        that.stop = function () {

            if (loadRetryer) {

                clearTimeout(loadRetryer);
                loadRetryer = null;
            }

            if (hls) {
                hls.stopLoad();
            }

            superStop_func();
        };

        that.destroy = function () {

            if (loadRetryer) {

                clearTimeout(loadRetryer);
                loadRetryer = null;
            }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJQbGF5X2Z1bmMiLCJzdXBlclN0b3BfZnVuYyIsInN1cGVyRGVzdHJveV9mdW5jIiwibG9hZFJldHJ5ZXIiLCJpc01hbmlmZXN0TG9hZGVkIiwiZmlyc3RMb2FkZWQiLCJobHNDb25maWciLCJkZWJ1ZyIsIm1heEJ1ZmZlckxlbmd0aCIsIm1heE1heEJ1ZmZlckxlbmd0aCIsImZyYWdMb2FkaW5nTWF4UmV0cnkiLCJtYW5pZmVzdExvYWRpbmdNYXhSZXRyeSIsImxldmVsTG9hZGluZ01heFJldHJ5IiwiaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZyIsImdldENvbmZpZyIsImtleSIsIkhscyIsIndpbmRvdyIsIm9wX2hscyIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRpbmdSZXRyeUNvdW50IiwibG9hZFNvdXJjZSIsImZpbGUiLCJvbmNlIiwiRXZlbnRzIiwiTUFOSUZFU1RfTE9BREVEIiwiZXZlbnQiLCJkYXRhIiwiTEVWRUxfTE9BREVEIiwiY2xlYXJUaW1lb3V0IiwiY29uZmlnIiwiZGV0YWlscyIsImxpdmUiLCJzZWVrIiwiaXNBdXRvU3RhcnQiLCJwbGF5Iiwib24iLCJFUlJPUiIsIkZSQUdfTE9BRElORyIsInNldFN0YXRlIiwiU1RBVEVfTE9BRElORyIsIm5ldHdvcmtEZXRhaWxzIiwic3RhdHVzIiwic2V0VGltZW91dCIsInN0b3AiLCJzdG9wTG9hZCIsInN0YXJ0TG9hZCIsInR5cGUiLCJFcnJvclR5cGVzIiwiTUVESUFfRVJST1IiLCJmYXRhbCIsIk5FVFdPUktfRVJST1IiLCJyZWNvdmVyTWVkaWFFcnJvciIsImVycm9yVHlwZSIsIlBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IiLCJQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IiLCJQTEFZRVJfQVVUSF9GQUlMRURfRVJST1IiLCJQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1IiLCJ0ZW1wRXJyb3IiLCJFUlJPUlMiLCJjb2RlcyIsImVycm9yIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwibmV3c3RhdGUiLCJnZXRTb3VyY2VzIiwiZ2V0Q3VycmVudFNvdXJjZSIsImRlc3Ryb3kiLCJJTklUX0hMU0pTX05PVEZPVU5EIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7O0FBTUE7Ozs7QUFDQTs7OztBQVNBOzs7Ozs7QUFPQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsQ0FBVUMsT0FBVixFQUFtQkMsWUFBbkIsRUFBaUNDLFFBQWpDLEVBQTJDO0FBQzNELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE1BQU0sSUFBVjtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLGNBQWMsSUFBbEI7QUFDQSxRQUFJQyxtQkFBbUIsS0FBdkI7QUFDQSxRQUFJQyxjQUFjLEtBQWxCOztBQUdBLFFBQUk7O0FBRUEsWUFBSUMsWUFBWTtBQUNaQyxtQkFBTyxLQURLO0FBRVpDLDZCQUFpQixFQUZMO0FBR1pDLGdDQUFvQixFQUhSO0FBSVpDLGlDQUFxQixDQUpUO0FBS1pDLHFDQUF5QixDQUxiO0FB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QW9RRSxPQUFPZ0YsS0FBUCxFQUFjO0FBQ1osWUFBSUgsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYVEsOEJBQWIsQ0FBaEI7QUFDQVYsa0JBQVVHLEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0EsY0FBTUgsU0FBTjtBQUNIOztBQUVELFdBQU9qRixJQUFQO0FBQ0gsQ0F0UkQsQyxDQTVCQTs7O3FCQXFUZUosVyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiA3Li5cclxuICovXHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBQUk9WSURFUl9ITFMsXHJcbiAgICBQTEFZRVJfU1RBVEUsIFNUQVRFX0lETEUsIFNUQVRFX0xPQURJTkcsXHJcbiAgICBJTklUX0RBU0hfVU5TVVBQT1JULCBFUlJPUlMsXHJcbiAgICBJTklUX0hMU0pTX05PVEZPVU5EXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuaW1wb3J0IHtcclxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcclxuICAgIFBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUixcclxuICAgIFBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUixcclxuICAgIFBMQVlFUl9OT1RfQUNDRVBUQUJMRV9FUlJPUlxyXG59IGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBobHNqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgSGxzUHJvdmlkZXIgPSBmdW5jdGlvbiAoZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCkge1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIGxldCBobHMgPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyUGxheV9mdW5jID0gbnVsbDtcclxuICAgIGxldCBzdXBlclN0b3BfZnVuYyA9IG51bGw7XHJcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xyXG4gICAgbGV0IGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgIGxldCBpc01hbmlmZXN0TG9hZGVkID0gZmFsc2U7XHJcbiAgICBsZXQgZmlyc3RMb2FkZWQgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgbGV0IGhsc0NvbmZpZyA9IHtcclxuICAgICAgICAgICAgZGVidWc6IGZhbHNlLFxyXG4gICAgICAgICAgICBtYXhCdWZmZXJMZW5ndGg6IDIwLFxyXG4gICAgICAgICAgICBtYXhNYXhCdWZmZXJMZW5ndGg6IDMwLFxyXG4gICAgICAgICAgICBmcmFnTG9hZGluZ01heFJldHJ5OiAwLFxyXG4gICAgICAgICAgICBtYW5pZmVzdExvYWRpbmdNYXhSZXRyeTogMCxcclxuICAgICAgICAgICAgbGV2ZWxMb2FkaW5nTWF4UmV0cnk6IDBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZyA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5obHNDb25maWc7XHJcblxyXG4gICAgICAgIGlmIChobHNDb25maWdGcm9tUGxheWVyQ29uZmlnKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgaGxzQ29uZmlnW2tleV0gPSBobHNDb25maWdGcm9tUGxheWVyQ29uZmlnW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhscyA9IG5ldyBIbHMoaGxzQ29uZmlnKTtcclxuXHJcbiAgICAgICAgd2luZG93Lm9wX2hscyA9IGhscztcclxuXHJcbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICAgICAgbmFtZTogUFJPVklERVJfSExTLFxyXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICAgICAgICBtc2U6IGhscyxcclxuICAgICAgICAgICAgbGlzdGVuZXI6IG51bGwsXHJcbiAgICAgICAgICAgIGlzTG9hZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY2FuU2VlazogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzTGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlZWtpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdGF0ZTogU1RBVEVfSURMRSxcclxuICAgICAgICAgICAgYnVmZmVyOiAwLFxyXG4gICAgICAgICAgICBmcmFtZXJhdGU6IDAsXHJcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiAtMSxcclxuICAgICAgICAgICAgY3VycmVudFNvdXJjZTogLTEsXHJcbiAgICAgICAgICAgIHF1YWxpdHlMZXZlbHM6IFtdLFxyXG4gICAgICAgICAgICBzb3VyY2VzOiBbXSxcclxuICAgICAgICAgICAgYWRUYWdVcmw6IGFkVGFnVXJsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24gKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbikge1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIiArIGxhc3RQbGF5UG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGxvYWRpbmdSZXRyeUNvdW50ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvYWRpbmdSZXRyeUNvdW50O1xyXG5cclxuICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xyXG5cclxuICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5NQU5JRkVTVF9MT0FERUQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlzTWFuaWZlc3RMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGhscy5vbmNlKEhscy5FdmVudHMuTEVWRUxfTE9BREVELCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmaXJzdExvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaGxzLmNvbmZpZy5mcmFnTG9hZGluZ01heFJldHJ5ID0gMjtcclxuICAgICAgICAgICAgICAgIGhscy5jb25maWcubWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkgPSAyO1xyXG4gICAgICAgICAgICAgICAgaGxzLmNvbmZpZy5sZXZlbExvYWRpbmdNYXhSZXRyeSA9IDI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGV0YWlscy5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5pc0xpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RQbGF5UG9zaXRpb24gJiYgbGFzdFBsYXlQb3NpdGlvbiA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBobHMub24oSGxzLkV2ZW50cy5FUlJPUiwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5GUkFHX0xPQURJTkcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gMjAyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhscykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBIbHMuRXJyb3JUeXBlcy5NRURJQV9FUlJPUikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLmZhdGFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nIHdoZW4gbm9uIGZhdGFsIG1lZGlhIGVycm9yLiBobHNqcyB3aWxsIHJlY292ZXIgaXQgYXV0b21hdGljYWxseS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRpbmdSZXRyeUNvdW50ID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ1JldHJ5Q291bnQgPSBsb2FkaW5nUmV0cnlDb3VudCAtIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBIbHMuRXJyb3JUeXBlcy5ORVRXT1JLX0VSUk9SKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gSGxzLkVycm9yVHlwZXMuTUVESUFfRVJST1IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGxzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMucmVjb3Zlck1lZGlhRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3JUeXBlID0gUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlID0gUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGUgPSBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YSAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzICYmIGRhdGEubmV0d29ya0RldGFpbHMuc3RhdHVzID09PSA0MDYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZSA9IFBMQVlFUl9OT1RfQUNDRVBUQUJMRV9FUlJPUjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tlcnJvclR5cGVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBkYXRhLmRldGFpbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm9uKFBMQVlFUl9TVEFURSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWZpcnN0TG9hZGVkICYmIGRhdGEucHJldnN0YXRlID09PSBTVEFURV9MT0FESU5HICYmIGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX0lETEUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN1cGVyUGxheV9mdW5jID0gdGhhdC5zdXBlcigncGxheScpO1xyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuICAgICAgICBzdXBlclN0b3BfZnVuYyA9IHRoYXQuc3VwZXIoJ3N0b3AnKTtcclxuXHJcbiAgICAgICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc01hbmlmZXN0TG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gdGhhdC5nZXRTb3VyY2VzKClbdGhhdC5nZXRDdXJyZW50U291cmNlKCldLmZpbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGhscykge1xyXG4gICAgICAgICAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3VwZXJQbGF5X2Z1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0LnN0b3AgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xyXG4gICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaGxzKSB7XHJcbiAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3VwZXJTdG9wX2Z1bmMoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xyXG4gICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaGxzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaGxzLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaGxzID0gbnVsbDtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogUFJPVklERVIgREVTVFJPVVlFRC5cIik7XHJcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tJTklUX0hMU0pTX05PVEZPVU5EXTtcclxuICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICB0aHJvdyB0ZW1wRXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGxzUHJvdmlkZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==