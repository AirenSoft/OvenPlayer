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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJQbGF5X2Z1bmMiLCJzdXBlclN0b3BfZnVuYyIsInN1cGVyRGVzdHJveV9mdW5jIiwibG9hZFJldHJ5ZXIiLCJpc01hbmlmZXN0TG9hZGVkIiwiZmlyc3RMb2FkZWQiLCJobHNDb25maWciLCJkZWJ1ZyIsIm1heEJ1ZmZlckxlbmd0aCIsIm1heE1heEJ1ZmZlckxlbmd0aCIsImZyYWdMb2FkaW5nTWF4UmV0cnkiLCJtYW5pZmVzdExvYWRpbmdNYXhSZXRyeSIsImxldmVsTG9hZGluZ01heFJldHJ5IiwiaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZyIsImdldENvbmZpZyIsImtleSIsIkhscyIsIndpbmRvdyIsIm9wX2hscyIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRpbmdSZXRyeUNvdW50IiwibG9hZFNvdXJjZSIsImZpbGUiLCJvbmNlIiwiRXZlbnRzIiwiTUFOSUZFU1RfTE9BREVEIiwiZXZlbnQiLCJkYXRhIiwiTEVWRUxfTE9BREVEIiwiY2xlYXJUaW1lb3V0IiwiY29uZmlnIiwiZGV0YWlscyIsImxpdmUiLCJzZWVrIiwib24iLCJFUlJPUiIsIm5ldHdvcmtEZXRhaWxzIiwic3RhdHVzIiwic2V0U3RhdGUiLCJTVEFURV9MT0FESU5HIiwic2V0VGltZW91dCIsInN0b3AiLCJzdG9wTG9hZCIsInN0YXJ0TG9hZCIsInBsYXkiLCJGUkFHX0xPQURJTkciLCJ0eXBlIiwiRXJyb3JUeXBlcyIsIk1FRElBX0VSUk9SIiwiZmF0YWwiLCJORVRXT1JLX0VSUk9SIiwicmVjb3Zlck1lZGlhRXJyb3IiLCJlcnJvclR5cGUiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SIiwiUExBWUVSX0FVVEhfRkFJTEVEX0VSUk9SIiwiUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SIiwidGVtcEVycm9yIiwiRVJST1JTIiwiY29kZXMiLCJlcnJvciIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld3N0YXRlIiwiZ2V0U291cmNlcyIsImdldEN1cnJlbnRTb3VyY2UiLCJkZXN0cm95IiwiSU5JVF9ITFNKU19OT1RGT1VORCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOztBQU1BOzs7O0FBQ0E7Ozs7QUFTQTs7Ozs7O0FBT0EsSUFBTUEsY0FBYyxTQUFkQSxXQUFjLENBQVVDLE9BQVYsRUFBbUJDLFlBQW5CLEVBQWlDQyxRQUFqQyxFQUEyQztBQUMzRCxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxNQUFNLElBQVY7QUFDQSxRQUFJQyxpQkFBaUIsSUFBckI7QUFDQSxRQUFJQyxpQkFBaUIsSUFBckI7QUFDQSxRQUFJQyxvQkFBb0IsSUFBeEI7QUFDQSxRQUFJQyxjQUFjLElBQWxCO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsY0FBYyxLQUFsQjs7QUFHQSxRQUFJOztBQUVBLFlBQUlDLFlBQVk7QUFDWkMsbUJBQU8sS0FESztBQUVaQyw2QkFBaUIsRUFGTDtBQUdaQyxnQ0FBb0IsRUFIUjtBQUlaQyxpQ0FBcUIsQ0FKVDtBQUtaQyxxQ0FBeUIsQ0FMYjtBQU1aQyxrQ0FBc0I7QUFO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WUFBSUgsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYVEsOEJBQWIsQ0FBaEI7QUFDQVYsa0JBQVVHLEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0EsY0FBTUgsU0FBTjtBQUNIOztBQUVELFdBQU9oRixJQUFQO0FBQ0gsQ0F4UkQsQyxDQTVCQTs7O3FCQXVUZUosVyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gNy4uXG4gKi9cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBQUk9WSURFUl9ITFMsXG4gICAgUExBWUVSX1NUQVRFLCBTVEFURV9JRExFLCBTVEFURV9MT0FESU5HLFxuICAgIElOSVRfREFTSF9VTlNVUFBPUlQsIEVSUk9SUyxcbiAgICBJTklUX0hMU0pTX05PVEZPVU5EXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuaW1wb3J0IHtcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SLFxuICAgIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUixcbiAgICBQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IsXG4gICAgUExBWUVSX0FVVEhfRkFJTEVEX0VSUk9SLFxuICAgIFBMQVlFUl9OT1RfQUNDRVBUQUJMRV9FUlJPUlxufSBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgaGxzanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5cbmNvbnN0IEhsc1Byb3ZpZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpIHtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBobHMgPSBudWxsO1xuICAgIGxldCBzdXBlclBsYXlfZnVuYyA9IG51bGw7XG4gICAgbGV0IHN1cGVyU3RvcF9mdW5jID0gbnVsbDtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuICAgIGxldCBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgbGV0IGlzTWFuaWZlc3RMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgZmlyc3RMb2FkZWQgPSBmYWxzZTtcblxuXG4gICAgdHJ5IHtcblxuICAgICAgICBsZXQgaGxzQ29uZmlnID0ge1xuICAgICAgICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgICAgICAgbWF4QnVmZmVyTGVuZ3RoOiAyMCxcbiAgICAgICAgICAgIG1heE1heEJ1ZmZlckxlbmd0aDogMzAsXG4gICAgICAgICAgICBmcmFnTG9hZGluZ01heFJldHJ5OiAwLFxuICAgICAgICAgICAgbWFuaWZlc3RMb2FkaW5nTWF4UmV0cnk6IDAsXG4gICAgICAgICAgICBsZXZlbExvYWRpbmdNYXhSZXRyeTogMFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBobHNDb25maWdGcm9tUGxheWVyQ29uZmlnID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmhsc0NvbmZpZztcblxuICAgICAgICBpZiAoaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZykge1xuXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZykge1xuICAgICAgICAgICAgICAgIGhsc0NvbmZpZ1trZXldID0gaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZ1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaGxzID0gbmV3IEhscyhobHNDb25maWcpO1xuXG4gICAgICAgIHdpbmRvdy5vcF9obHMgPSBobHM7XG5cbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKGVsZW1lbnQpO1xuXG4gICAgICAgIGxldCBzcGVjID0ge1xuICAgICAgICAgICAgbmFtZTogUFJPVklERVJfSExTLFxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIG1zZTogaGxzLFxuICAgICAgICAgICAgbGlzdGVuZXI6IG51bGwsXG4gICAgICAgICAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgICAgICAgICBjYW5TZWVrOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBzZWVraW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXRlOiBTVEFURV9JRExFLFxuICAgICAgICAgICAgYnVmZmVyOiAwLFxuICAgICAgICAgICAgZnJhbWVyYXRlOiAwLFxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IC0xLFxuICAgICAgICAgICAgY3VycmVudFNvdXJjZTogLTEsXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzOiBbXSxcbiAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxuICAgICAgICAgICAgYWRUYWdVcmw6IGFkVGFnVXJsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24gKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbikge1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBvbkV4dGVuZGVkTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiICsgbGFzdFBsYXlQb3NpdGlvbik7XG5cbiAgICAgICAgICAgIGxldCBsb2FkaW5nUmV0cnlDb3VudCA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb2FkaW5nUmV0cnlDb3VudDtcblxuICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xuXG4gICAgICAgICAgICBobHMub25jZShIbHMuRXZlbnRzLk1BTklGRVNUX0xPQURFRCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBpc01hbmlmZXN0TG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBobHMub25jZShIbHMuRXZlbnRzLkxFVkVMX0xPQURFRCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBmaXJzdExvYWRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcbiAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGhscy5jb25maWcuZnJhZ0xvYWRpbmdNYXhSZXRyeSA9IDI7XG4gICAgICAgICAgICAgICAgaGxzLmNvbmZpZy5tYW5pZmVzdExvYWRpbmdNYXhSZXRyeSA9IDI7XG4gICAgICAgICAgICAgICAgaGxzLmNvbmZpZy5sZXZlbExvYWRpbmdNYXhSZXRyeSA9IDI7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5kZXRhaWxzLmxpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5pc0xpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RQbGF5UG9zaXRpb24gJiYgbGFzdFBsYXlQb3NpdGlvbiA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBobHMub24oSGxzLkV2ZW50cy5FUlJPUiwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzICYmIGRhdGEubmV0d29ya0RldGFpbHMuc3RhdHVzID09PSAyMDIpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdGFydExvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5GUkFHX0xPQURJTkcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IEhscy5FcnJvclR5cGVzLk1FRElBX0VSUk9SKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5mYXRhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmcgd2hlbiBub24gZmF0YWwgbWVkaWEgZXJyb3IuIGhsc2pzIHdpbGwgcmVjb3ZlciBpdCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkaW5nUmV0cnlDb3VudCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmdSZXRyeUNvdW50ID0gbG9hZGluZ1JldHJ5Q291bnQgLSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBIbHMuRXJyb3JUeXBlcy5ORVRXT1JLX0VSUk9SKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBIbHMuRXJyb3JUeXBlcy5NRURJQV9FUlJPUikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGxzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5yZWNvdmVyTWVkaWFFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0b3AoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGxzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0YXJ0TG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yVHlwZSA9IFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1I7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDQwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZSA9IFBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YSAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzICYmIGRhdGEubmV0d29ya0RldGFpbHMuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGUgPSBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gNDA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlID0gUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW2Vycm9yVHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBkYXRhLmRldGFpbHM7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclRyaWdnZXIodGVtcEVycm9yLCB0aGF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGF0Lm9uKFBMQVlFUl9TVEFURSwgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGlmICghZmlyc3RMb2FkZWQgJiYgZGF0YS5wcmV2c3RhdGUgPT09IFNUQVRFX0xPQURJTkcgJiYgZGF0YS5uZXdzdGF0ZSA9PT0gU1RBVEVfSURMRSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3VwZXJQbGF5X2Z1bmMgPSB0aGF0LnN1cGVyKCdwbGF5Jyk7XG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICBzdXBlclN0b3BfZnVuYyA9IHRoYXQuc3VwZXIoJ3N0b3AnKTtcblxuICAgICAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICghaXNNYW5pZmVzdExvYWRlZCkge1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSB0aGF0LmdldFNvdXJjZXMoKVt0aGF0LmdldEN1cnJlbnRTb3VyY2UoKV0uZmlsZTtcblxuICAgICAgICAgICAgICAgIGlmIChobHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VwZXJQbGF5X2Z1bmMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuc3RvcCA9ICgpID0+IHtcblxuICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG5cbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGhscykge1xuICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdXBlclN0b3BfZnVuYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcblxuICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG5cbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGhscykge1xuXG4gICAgICAgICAgICAgICAgaGxzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGxzID0gbnVsbDtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IFBST1ZJREVSIERFU1RST1VZRUQuXCIpO1xuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW0lOSVRfSExTSlNfTk9URk9VTkRdO1xuICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgdGhyb3cgdGVtcEVycm9yO1xuICAgIH1cblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBIbHNQcm92aWRlcjsiXSwic291cmNlUm9vdCI6IiJ9