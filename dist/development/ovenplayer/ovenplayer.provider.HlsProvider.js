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
                // if (playerConfig.isAutoStart()) {
                //     that.play();
                // }
            });

            hls.on(Hls.Events.ERROR, function (event, data) {

                if (data && data.networkDetails && data.networkDetails.status === 202) {

                    if (loadRetryer) {
                        clearTimeout(loadRetryer);
                        loadRetryer = null;
                    }

                    that.setState(_constants.STATE_LOADING);

                    loadRetryer = setTimeout(function () {

                        if (hls) {

                            that.stop();
                            hls.stopLoad();
                            hls.startLoad();
                            that.play();
                        }
                    }, 1000);
                } else {

                    hls.once(Hls.Events.FRAG_LOADING, function () {
                        that.setState(_constants.STATE_LOADING);
                    });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJQbGF5X2Z1bmMiLCJzdXBlclN0b3BfZnVuYyIsInN1cGVyRGVzdHJveV9mdW5jIiwibG9hZFJldHJ5ZXIiLCJpc01hbmlmZXN0TG9hZGVkIiwiZmlyc3RMb2FkZWQiLCJobHNDb25maWciLCJkZWJ1ZyIsIm1heEJ1ZmZlckxlbmd0aCIsIm1heE1heEJ1ZmZlckxlbmd0aCIsImZyYWdMb2FkaW5nTWF4UmV0cnkiLCJtYW5pZmVzdExvYWRpbmdNYXhSZXRyeSIsImxldmVsTG9hZGluZ01heFJldHJ5IiwiaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZyIsImdldENvbmZpZyIsImtleSIsIkhscyIsIndpbmRvdyIsIm9wX2hscyIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRpbmdSZXRyeUNvdW50IiwibG9hZFNvdXJjZSIsImZpbGUiLCJvbmNlIiwiRXZlbnRzIiwiTUFOSUZFU1RfTE9BREVEIiwiZXZlbnQiLCJkYXRhIiwiTEVWRUxfTE9BREVEIiwiY2xlYXJUaW1lb3V0IiwiY29uZmlnIiwiZGV0YWlscyIsImxpdmUiLCJzZWVrIiwib24iLCJFUlJPUiIsIm5ldHdvcmtEZXRhaWxzIiwic3RhdHVzIiwic2V0U3RhdGUiLCJTVEFURV9MT0FESU5HIiwic2V0VGltZW91dCIsInN0b3AiLCJzdG9wTG9hZCIsInN0YXJ0TG9hZCIsInBsYXkiLCJGUkFHX0xPQURJTkciLCJ0eXBlIiwiRXJyb3JUeXBlcyIsIk1FRElBX0VSUk9SIiwiZmF0YWwiLCJORVRXT1JLX0VSUk9SIiwicmVjb3Zlck1lZGlhRXJyb3IiLCJlcnJvclR5cGUiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SIiwiUExBWUVSX0FVVEhfRkFJTEVEX0VSUk9SIiwiUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SIiwidGVtcEVycm9yIiwiRVJST1JTIiwiY29kZXMiLCJlcnJvciIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld3N0YXRlIiwiZ2V0U291cmNlcyIsImdldEN1cnJlbnRTb3VyY2UiLCJkZXN0cm95IiwiSU5JVF9ITFNKU19OT1RGT1VORCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOztBQU1BOzs7O0FBQ0E7Ozs7QUFTQTs7Ozs7O0FBT0EsSUFBTUEsY0FBYyxTQUFkQSxXQUFjLENBQVVDLE9BQVYsRUFBbUJDLFlBQW5CLEVBQWlDQyxRQUFqQyxFQUEyQztBQUMzRCxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxNQUFNLElBQVY7QUFDQSxRQUFJQyxpQkFBaUIsSUFBckI7QUFDQSxRQUFJQyxpQkFBaUIsSUFBckI7QUFDQSxRQUFJQyxvQkFBb0IsSUFBeEI7QUFDQSxRQUFJQyxjQUFjLElBQWxCO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsY0FBYyxLQUFsQjs7QUFHQSxRQUFJOztBQUVBLFlBQUlDLFlBQVk7QUFDWkMsbUJBQU8sS0FESztBQUVaQyw2QkFBaUIsRUFGTDtBQUdaQyxnQ0FBb0IsRUFIUjtBQUlaQyxpQ0FBcUIsQ0FKVDtBQUtaQyxxQ0FBeUIsQ0FMYjtBQU1aQyxrQ0FBc0I7QUFO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WUFBSUgsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYVEsOEJBQWIsQ0FBaEI7QUFDQVYsa0JBQVVHLEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0EsY0FBTUgsU0FBTjtBQUNIOztBQUVELFdBQU9oRixJQUFQO0FBQ0gsQ0F4UkQsQyxDQTVCQTs7O3FCQXVUZUosVyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiA3Li5cclxuICovXHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBQUk9WSURFUl9ITFMsXHJcbiAgICBQTEFZRVJfU1RBVEUsIFNUQVRFX0lETEUsIFNUQVRFX0xPQURJTkcsXHJcbiAgICBJTklUX0RBU0hfVU5TVVBQT1JULCBFUlJPUlMsXHJcbiAgICBJTklUX0hMU0pTX05PVEZPVU5EXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuaW1wb3J0IHtcclxuICAgIFBMQVlFUl9VTktOV09OX0VSUk9SLFxyXG4gICAgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcclxuICAgIFBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUixcclxuICAgIFBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUixcclxuICAgIFBMQVlFUl9OT1RfQUNDRVBUQUJMRV9FUlJPUlxyXG59IGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBobHNqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgSGxzUHJvdmlkZXIgPSBmdW5jdGlvbiAoZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCkge1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIGxldCBobHMgPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyUGxheV9mdW5jID0gbnVsbDtcclxuICAgIGxldCBzdXBlclN0b3BfZnVuYyA9IG51bGw7XHJcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xyXG4gICAgbGV0IGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgIGxldCBpc01hbmlmZXN0TG9hZGVkID0gZmFsc2U7XHJcbiAgICBsZXQgZmlyc3RMb2FkZWQgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgbGV0IGhsc0NvbmZpZyA9IHtcclxuICAgICAgICAgICAgZGVidWc6IGZhbHNlLFxyXG4gICAgICAgICAgICBtYXhCdWZmZXJMZW5ndGg6IDIwLFxyXG4gICAgICAgICAgICBtYXhNYXhCdWZmZXJMZW5ndGg6IDMwLFxyXG4gICAgICAgICAgICBmcmFnTG9hZGluZ01heFJldHJ5OiAwLFxyXG4gICAgICAgICAgICBtYW5pZmVzdExvYWRpbmdNYXhSZXRyeTogMCxcclxuICAgICAgICAgICAgbGV2ZWxMb2FkaW5nTWF4UmV0cnk6IDBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZyA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5obHNDb25maWc7XHJcblxyXG4gICAgICAgIGlmIChobHNDb25maWdGcm9tUGxheWVyQ29uZmlnKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgaGxzQ29uZmlnW2tleV0gPSBobHNDb25maWdGcm9tUGxheWVyQ29uZmlnW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhscyA9IG5ldyBIbHMoaGxzQ29uZmlnKTtcclxuXHJcbiAgICAgICAgd2luZG93Lm9wX2hscyA9IGhscztcclxuXHJcbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICAgICAgbmFtZTogUFJPVklERVJfSExTLFxyXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICAgICAgICBtc2U6IGhscyxcclxuICAgICAgICAgICAgbGlzdGVuZXI6IG51bGwsXHJcbiAgICAgICAgICAgIGlzTG9hZGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY2FuU2VlazogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzTGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlZWtpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdGF0ZTogU1RBVEVfSURMRSxcclxuICAgICAgICAgICAgYnVmZmVyOiAwLFxyXG4gICAgICAgICAgICBmcmFtZXJhdGU6IDAsXHJcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiAtMSxcclxuICAgICAgICAgICAgY3VycmVudFNvdXJjZTogLTEsXHJcbiAgICAgICAgICAgIHF1YWxpdHlMZXZlbHM6IFtdLFxyXG4gICAgICAgICAgICBzb3VyY2VzOiBbXSxcclxuICAgICAgICAgICAgYWRUYWdVcmw6IGFkVGFnVXJsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24gKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbikge1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIiArIGxhc3RQbGF5UG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGxvYWRpbmdSZXRyeUNvdW50ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvYWRpbmdSZXRyeUNvdW50O1xyXG5cclxuICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xyXG5cclxuICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5NQU5JRkVTVF9MT0FERUQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlzTWFuaWZlc3RMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGhscy5vbmNlKEhscy5FdmVudHMuTEVWRUxfTE9BREVELCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmaXJzdExvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaGxzLmNvbmZpZy5mcmFnTG9hZGluZ01heFJldHJ5ID0gMjtcclxuICAgICAgICAgICAgICAgIGhscy5jb25maWcubWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkgPSAyO1xyXG4gICAgICAgICAgICAgICAgaGxzLmNvbmZpZy5sZXZlbExvYWRpbmdNYXhSZXRyeSA9IDI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGV0YWlscy5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5pc0xpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RQbGF5UG9zaXRpb24gJiYgbGFzdFBsYXlQb3NpdGlvbiA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBobHMub24oSGxzLkV2ZW50cy5FUlJPUiwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gMjAyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhscykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBobHMub25jZShIbHMuRXZlbnRzLkZSQUdfTE9BRElORywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBIbHMuRXJyb3JUeXBlcy5NRURJQV9FUlJPUikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLmZhdGFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nIHdoZW4gbm9uIGZhdGFsIG1lZGlhIGVycm9yLiBobHNqcyB3aWxsIHJlY292ZXIgaXQgYXV0b21hdGljYWxseS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRpbmdSZXRyeUNvdW50ID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ1JldHJ5Q291bnQgPSBsb2FkaW5nUmV0cnlDb3VudCAtIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBIbHMuRXJyb3JUeXBlcy5ORVRXT1JLX0VSUk9SKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gSGxzLkVycm9yVHlwZXMuTUVESUFfRVJST1IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGxzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMucmVjb3Zlck1lZGlhRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3JUeXBlID0gUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlID0gUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGUgPSBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YSAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzICYmIGRhdGEubmV0d29ya0RldGFpbHMuc3RhdHVzID09PSA0MDYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZSA9IFBMQVlFUl9OT1RfQUNDRVBUQUJMRV9FUlJPUjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tlcnJvclR5cGVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBkYXRhLmRldGFpbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm9uKFBMQVlFUl9TVEFURSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWZpcnN0TG9hZGVkICYmIGRhdGEucHJldnN0YXRlID09PSBTVEFURV9MT0FESU5HICYmIGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX0lETEUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN1cGVyUGxheV9mdW5jID0gdGhhdC5zdXBlcigncGxheScpO1xyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuICAgICAgICBzdXBlclN0b3BfZnVuYyA9IHRoYXQuc3VwZXIoJ3N0b3AnKTtcclxuXHJcbiAgICAgICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc01hbmlmZXN0TG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gdGhhdC5nZXRTb3VyY2VzKClbdGhhdC5nZXRDdXJyZW50U291cmNlKCldLmZpbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGhscykge1xyXG4gICAgICAgICAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3VwZXJQbGF5X2Z1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0LnN0b3AgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xyXG4gICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaGxzKSB7XHJcbiAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3VwZXJTdG9wX2Z1bmMoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xyXG4gICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaGxzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaGxzLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaGxzID0gbnVsbDtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogUFJPVklERVIgREVTVFJPVVlFRC5cIik7XHJcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tJTklUX0hMU0pTX05PVEZPVU5EXTtcclxuICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICB0aHJvdyB0ZW1wRXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGxzUHJvdmlkZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==