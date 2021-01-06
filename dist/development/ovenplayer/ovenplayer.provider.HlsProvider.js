/*! OvenPlayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
            fragLoadingMaxRetry: 2,
            manifestLoadingMaxRetry: 2,
            levelLoadingMaxRetry: 2
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJQbGF5X2Z1bmMiLCJzdXBlclN0b3BfZnVuYyIsInN1cGVyRGVzdHJveV9mdW5jIiwibG9hZFJldHJ5ZXIiLCJpc01hbmlmZXN0TG9hZGVkIiwiZmlyc3RMb2FkZWQiLCJobHNDb25maWciLCJkZWJ1ZyIsIm1heEJ1ZmZlckxlbmd0aCIsIm1heE1heEJ1ZmZlckxlbmd0aCIsImZyYWdMb2FkaW5nTWF4UmV0cnkiLCJtYW5pZmVzdExvYWRpbmdNYXhSZXRyeSIsImxldmVsTG9hZGluZ01heFJldHJ5IiwiaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZyIsImdldENvbmZpZyIsImtleSIsIkhscyIsIndpbmRvdyIsIm9wX2hscyIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRpbmdSZXRyeUNvdW50IiwibG9hZFNvdXJjZSIsImZpbGUiLCJvbmNlIiwiRXZlbnRzIiwiTUFOSUZFU1RfTE9BREVEIiwiZXZlbnQiLCJkYXRhIiwiTEVWRUxfTE9BREVEIiwiY2xlYXJUaW1lb3V0IiwiZGV0YWlscyIsImxpdmUiLCJzZWVrIiwib24iLCJFUlJPUiIsIm5ldHdvcmtEZXRhaWxzIiwic3RhdHVzIiwic2V0U3RhdGUiLCJTVEFURV9MT0FESU5HIiwic2V0VGltZW91dCIsInN0b3AiLCJzdG9wTG9hZCIsInN0YXJ0TG9hZCIsInBsYXkiLCJGUkFHX0xPQURJTkciLCJ0eXBlIiwiRXJyb3JUeXBlcyIsIk1FRElBX0VSUk9SIiwiZmF0YWwiLCJORVRXT1JLX0VSUk9SIiwicmVjb3Zlck1lZGlhRXJyb3IiLCJlcnJvclR5cGUiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SIiwiUExBWUVSX0FVVEhfRkFJTEVEX0VSUk9SIiwiUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SIiwidGVtcEVycm9yIiwiRVJST1JTIiwiY29kZXMiLCJlcnJvciIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld3N0YXRlIiwiZ2V0U291cmNlcyIsImdldEN1cnJlbnRTb3VyY2UiLCJkZXN0cm95IiwiSU5JVF9ITFNKU19OT1RGT1VORCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOztBQU1BOzs7O0FBQ0E7Ozs7QUFTQTs7Ozs7O0FBT0EsSUFBTUEsY0FBYyxTQUFkQSxXQUFjLENBQVVDLE9BQVYsRUFBbUJDLFlBQW5CLEVBQWlDQyxRQUFqQyxFQUEyQztBQUMzRCxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxNQUFNLElBQVY7QUFDQSxRQUFJQyxpQkFBaUIsSUFBckI7QUFDQSxRQUFJQyxpQkFBaUIsSUFBckI7QUFDQSxRQUFJQyxvQkFBb0IsSUFBeEI7QUFDQSxRQUFJQyxjQUFjLElBQWxCO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsY0FBYyxLQUFsQjs7QUFHQSxRQUFJOztBQUVBLFlBQUlDLFlBQVk7QUFDWkMsbUJBQU8sS0FESztBQUVaQyw2QkFBaUIsRUFGTDtBQUdaQyxnQ0FBb0IsRUFIUjtBQUlaQyxpQ0FBcUIsQ0FKVDtBQUtaQyxxQ0FBeUIsQ0FMYjtBQU1aQyxrQ0FBc0I7QUFOVixTQUFoQjs7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LCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gNy4uXHJcbiAqL1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgUFJPVklERVJfSExTLFxyXG4gICAgUExBWUVSX1NUQVRFLCBTVEFURV9JRExFLCBTVEFURV9MT0FESU5HLFxyXG4gICAgSU5JVF9EQVNIX1VOU1VQUE9SVCwgRVJST1JTLFxyXG4gICAgSU5JVF9ITFNKU19OT1RGT1VORFxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBQTEFZRVJfVU5LTldPTl9FUlJPUixcclxuICAgIFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IsXHJcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXHJcbiAgICBQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IsXHJcbiAgICBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1IsXHJcbiAgICBQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1JcclxufSBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgaGxzanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cclxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IEhsc1Byb3ZpZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpIHtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgaGxzID0gbnVsbDtcclxuICAgIGxldCBzdXBlclBsYXlfZnVuYyA9IG51bGw7XHJcbiAgICBsZXQgc3VwZXJTdG9wX2Z1bmMgPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcclxuICAgIGxldCBsb2FkUmV0cnllciA9IG51bGw7XHJcbiAgICBsZXQgaXNNYW5pZmVzdExvYWRlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGZpcnN0TG9hZGVkID0gZmFsc2U7XHJcblxyXG5cclxuICAgIHRyeSB7XHJcblxyXG4gICAgICAgIGxldCBobHNDb25maWcgPSB7XHJcbiAgICAgICAgICAgIGRlYnVnOiBmYWxzZSxcclxuICAgICAgICAgICAgbWF4QnVmZmVyTGVuZ3RoOiAyMCxcclxuICAgICAgICAgICAgbWF4TWF4QnVmZmVyTGVuZ3RoOiAzMCxcclxuICAgICAgICAgICAgZnJhZ0xvYWRpbmdNYXhSZXRyeTogMixcclxuICAgICAgICAgICAgbWFuaWZlc3RMb2FkaW5nTWF4UmV0cnk6IDIsXHJcbiAgICAgICAgICAgIGxldmVsTG9hZGluZ01heFJldHJ5OiAyXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IGhsc0NvbmZpZ0Zyb21QbGF5ZXJDb25maWcgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuaGxzQ29uZmlnO1xyXG5cclxuICAgICAgICBpZiAoaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZykge1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGhsc0NvbmZpZ0Zyb21QbGF5ZXJDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIGhsc0NvbmZpZ1trZXldID0gaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZ1trZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBobHMgPSBuZXcgSGxzKGhsc0NvbmZpZyk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5vcF9obHMgPSBobHM7XHJcblxyXG4gICAgICAgIGhscy5hdHRhY2hNZWRpYShlbGVtZW50KTtcclxuXHJcbiAgICAgICAgbGV0IHNwZWMgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IFBST1ZJREVSX0hMUyxcclxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgICAgICAgbXNlOiBobHMsXHJcbiAgICAgICAgICAgIGxpc3RlbmVyOiBudWxsLFxyXG4gICAgICAgICAgICBpc0xvYWRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhblNlZWs6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0xpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWVraW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RhdGU6IFNUQVRFX0lETEUsXHJcbiAgICAgICAgICAgIGJ1ZmZlcjogMCxcclxuICAgICAgICAgICAgZnJhbWVyYXRlOiAwLFxyXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogLTEsXHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IC0xLFxyXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzOiBbXSxcclxuICAgICAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgICAgIGFkVGFnVXJsOiBhZFRhZ1VybFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uIChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IG9uRXh0ZW5kZWRMb2FkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIgKyBsYXN0UGxheVBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBsb2FkaW5nUmV0cnlDb3VudCA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb2FkaW5nUmV0cnlDb3VudDtcclxuXHJcbiAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZS5maWxlKTtcclxuXHJcbiAgICAgICAgICAgIGhscy5vbmNlKEhscy5FdmVudHMuTUFOSUZFU1RfTE9BREVELCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpc01hbmlmZXN0TG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBobHMub25jZShIbHMuRXZlbnRzLkxFVkVMX0xPQURFRCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZmlyc3RMb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmRldGFpbHMubGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwZWMuaXNMaXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0UGxheVBvc2l0aW9uICYmIGxhc3RQbGF5UG9zaXRpb24gPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaGxzLm9uKEhscy5FdmVudHMuRVJST1IsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDIwMikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0YXJ0TG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5GUkFHX0xPQURJTkcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gSGxzLkVycm9yVHlwZXMuTUVESUFfRVJST1IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5mYXRhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90aGluZyB3aGVuIG5vbiBmYXRhbCBtZWRpYSBlcnJvci4gaGxzanMgd2lsbCByZWNvdmVyIGl0IGF1dG9tYXRpY2FsbHkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkaW5nUmV0cnlDb3VudCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmdSZXRyeUNvdW50ID0gbG9hZGluZ1JldHJ5Q291bnQgLSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gSGxzLkVycm9yVHlwZXMuTkVUV09SS19FUlJPUikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGxzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0YXJ0TG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT09IEhscy5FcnJvclR5cGVzLk1FRElBX0VSUk9SKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhscykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnJlY292ZXJNZWRpYUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGxzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0YXJ0TG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yVHlwZSA9IFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1I7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzICYmIGRhdGEubmV0d29ya0RldGFpbHMuc3RhdHVzID09PSA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZSA9IFBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlID0gUExBWUVSX0FVVEhfRkFJTEVEX0VSUk9SO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gNDA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGUgPSBQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbZXJyb3JUeXBlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZGF0YS5kZXRhaWxzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclRyaWdnZXIodGVtcEVycm9yLCB0aGF0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5vbihQTEFZRVJfU1RBVEUsIGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFmaXJzdExvYWRlZCAmJiBkYXRhLnByZXZzdGF0ZSA9PT0gU1RBVEVfTE9BRElORyAmJiBkYXRhLm5ld3N0YXRlID09PSBTVEFURV9JRExFKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGxzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzdXBlclBsYXlfZnVuYyA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcclxuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcbiAgICAgICAgc3VwZXJTdG9wX2Z1bmMgPSB0aGF0LnN1cGVyKCdzdG9wJyk7XHJcblxyXG4gICAgICAgIHRoYXQucGxheSA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNNYW5pZmVzdExvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IHRoYXQuZ2V0U291cmNlcygpW3RoYXQuZ2V0Q3VycmVudFNvdXJjZSgpXS5maWxlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChobHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBobHMubG9hZFNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN1cGVyUGxheV9mdW5jKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdC5zdG9wID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcclxuICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhscykge1xyXG4gICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN1cGVyU3RvcF9mdW5jKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcclxuICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhscykge1xyXG5cclxuICAgICAgICAgICAgICAgIGhscy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGhscyA9IG51bGw7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IFBST1ZJREVSIERFU1RST1VZRUQuXCIpO1xyXG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xyXG4gICAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9ITFNKU19OT1RGT1VORF07XHJcbiAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgdGhyb3cgdGVtcEVycm9yO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhsc1Byb3ZpZGVyOyJdLCJzb3VyY2VSb290IjoiIn0=