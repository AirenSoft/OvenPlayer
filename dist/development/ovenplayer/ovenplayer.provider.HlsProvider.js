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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJQbGF5X2Z1bmMiLCJzdXBlclN0b3BfZnVuYyIsInN1cGVyRGVzdHJveV9mdW5jIiwibG9hZFJldHJ5ZXIiLCJpc01hbmlmZXN0TG9hZGVkIiwiZmlyc3RMb2FkZWQiLCJobHNDb25maWciLCJkZWJ1ZyIsIm1heEJ1ZmZlckxlbmd0aCIsIm1heE1heEJ1ZmZlckxlbmd0aCIsImZyYWdMb2FkaW5nTWF4UmV0cnkiLCJtYW5pZmVzdExvYWRpbmdNYXhSZXRyeSIsImxldmVsTG9hZGluZ01heFJldHJ5IiwiaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZyIsImdldENvbmZpZyIsImtleSIsIkhscyIsIndpbmRvdyIsIm9wX2hscyIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRpbmdSZXRyeUNvdW50IiwibG9hZFNvdXJjZSIsImZpbGUiLCJvbmNlIiwiRXZlbnRzIiwiTUFOSUZFU1RfTE9BREVEIiwiZXZlbnQiLCJkYXRhIiwiTEVWRUxfTE9BREVEIiwiY2xlYXJUaW1lb3V0IiwiZGV0YWlscyIsImxpdmUiLCJzZWVrIiwib24iLCJFUlJPUiIsIm5ldHdvcmtEZXRhaWxzIiwic3RhdHVzIiwic2V0U3RhdGUiLCJTVEFURV9MT0FESU5HIiwic2V0VGltZW91dCIsInN0b3AiLCJzdG9wTG9hZCIsInN0YXJ0TG9hZCIsInBsYXkiLCJGUkFHX0xPQURJTkciLCJ0eXBlIiwiRXJyb3JUeXBlcyIsIk1FRElBX0VSUk9SIiwiZmF0YWwiLCJORVRXT1JLX0VSUk9SIiwicmVjb3Zlck1lZGlhRXJyb3IiLCJlcnJvclR5cGUiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SIiwiUExBWUVSX0FVVEhfRkFJTEVEX0VSUk9SIiwiUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SIiwidGVtcEVycm9yIiwiRVJST1JTIiwiY29kZXMiLCJlcnJvciIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld3N0YXRlIiwiZ2V0U291cmNlcyIsImdldEN1cnJlbnRTb3VyY2UiLCJkZXN0cm95IiwiSU5JVF9ITFNKU19OT1RGT1VORCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOztBQU1BOzs7O0FBQ0E7Ozs7QUFTQTs7Ozs7O0FBT0EsSUFBTUEsY0FBYyxTQUFkQSxXQUFjLENBQVVDLE9BQVYsRUFBbUJDLFlBQW5CLEVBQWlDQyxRQUFqQyxFQUEyQztBQUMzRCxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxNQUFNLElBQVY7QUFDQSxRQUFJQyxpQkFBaUIsSUFBckI7QUFDQSxRQUFJQyxpQkFBaUIsSUFBckI7QUFDQSxRQUFJQyxvQkFBb0IsSUFBeEI7QUFDQSxRQUFJQyxjQUFjLElBQWxCO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsY0FBYyxLQUFsQjs7QUFHQSxRQUFJOztBQUVBLFlBQUlDLFlBQVk7QUFDWkMsbUJBQU8sS0FESztBQUVaQyw2QkFBaUIsRUFGTDtBQUdaQyxnQ0FBb0IsRUFIUjtBQUlaQyxpQ0FBcUIsQ0FKVDtBQUtaQyxxQ0FBeUIsQ0FMYjtBQU1aQyxrQ0FBc0I7QUFOVixTQUFoQjs7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LCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDcuLlxuICovXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgUFJPVklERVJfSExTLFxuICAgIFBMQVlFUl9TVEFURSwgU1RBVEVfSURMRSwgU1RBVEVfTE9BRElORyxcbiAgICBJTklUX0RBU0hfVU5TVVBQT1JULCBFUlJPUlMsXG4gICAgSU5JVF9ITFNKU19OT1RGT1VORFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcbmltcG9ydCB7XG4gICAgUExBWUVSX1VOS05XT05fRVJST1IsXG4gICAgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUixcbiAgICBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsXG4gICAgUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SLFxuICAgIFBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUixcbiAgICBQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1Jcbn0gZnJvbSBcIi4uLy4uLy4uL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIGhsc2pzIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxuICogKi9cblxuXG5jb25zdCBIbHNQcm92aWRlciA9IGZ1bmN0aW9uIChlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKSB7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgaGxzID0gbnVsbDtcbiAgICBsZXQgc3VwZXJQbGF5X2Z1bmMgPSBudWxsO1xuICAgIGxldCBzdXBlclN0b3BfZnVuYyA9IG51bGw7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcbiAgICBsZXQgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgIGxldCBpc01hbmlmZXN0TG9hZGVkID0gZmFsc2U7XG4gICAgbGV0IGZpcnN0TG9hZGVkID0gZmFsc2U7XG5cblxuICAgIHRyeSB7XG5cbiAgICAgICAgbGV0IGhsc0NvbmZpZyA9IHtcbiAgICAgICAgICAgIGRlYnVnOiBmYWxzZSxcbiAgICAgICAgICAgIG1heEJ1ZmZlckxlbmd0aDogMjAsXG4gICAgICAgICAgICBtYXhNYXhCdWZmZXJMZW5ndGg6IDMwLFxuICAgICAgICAgICAgZnJhZ0xvYWRpbmdNYXhSZXRyeTogMixcbiAgICAgICAgICAgIG1hbmlmZXN0TG9hZGluZ01heFJldHJ5OiAyLFxuICAgICAgICAgICAgbGV2ZWxMb2FkaW5nTWF4UmV0cnk6IDJcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZyA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5obHNDb25maWc7XG5cbiAgICAgICAgaWYgKGhsc0NvbmZpZ0Zyb21QbGF5ZXJDb25maWcpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGhsc0NvbmZpZ0Zyb21QbGF5ZXJDb25maWcpIHtcbiAgICAgICAgICAgICAgICBobHNDb25maWdba2V5XSA9IGhsc0NvbmZpZ0Zyb21QbGF5ZXJDb25maWdba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGhscyA9IG5ldyBIbHMoaGxzQ29uZmlnKTtcblxuICAgICAgICB3aW5kb3cub3BfaGxzID0gaGxzO1xuXG4gICAgICAgIGhscy5hdHRhY2hNZWRpYShlbGVtZW50KTtcblxuICAgICAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgICAgIG5hbWU6IFBST1ZJREVSX0hMUyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICBtc2U6IGhscyxcbiAgICAgICAgICAgIGxpc3RlbmVyOiBudWxsLFxuICAgICAgICAgICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY2FuU2VlazogZmFsc2UsXG4gICAgICAgICAgICBpc0xpdmU6IGZhbHNlLFxuICAgICAgICAgICAgc2Vla2luZzogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZTogU1RBVEVfSURMRSxcbiAgICAgICAgICAgIGJ1ZmZlcjogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZTogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiAtMSxcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IC0xLFxuICAgICAgICAgICAgcXVhbGl0eUxldmVsczogW10sXG4gICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgIGFkVGFnVXJsOiBhZFRhZ1VybFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uIChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pIHtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIiArIGxhc3RQbGF5UG9zaXRpb24pO1xuXG4gICAgICAgICAgICBsZXQgbG9hZGluZ1JldHJ5Q291bnQgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG9hZGluZ1JldHJ5Q291bnQ7XG5cbiAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZS5maWxlKTtcblxuICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5NQU5JRkVTVF9MT0FERUQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaXNNYW5pZmVzdExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5MRVZFTF9MT0FERUQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZmlyc3RMb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5kZXRhaWxzLmxpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5pc0xpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RQbGF5UG9zaXRpb24gJiYgbGFzdFBsYXlQb3NpdGlvbiA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaWYgKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBobHMub24oSGxzLkV2ZW50cy5FUlJPUiwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzICYmIGRhdGEubmV0d29ya0RldGFpbHMuc3RhdHVzID09PSAyMDIpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdGFydExvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5GUkFHX0xPQURJTkcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IEhscy5FcnJvclR5cGVzLk1FRElBX0VSUk9SKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5mYXRhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmcgd2hlbiBub24gZmF0YWwgbWVkaWEgZXJyb3IuIGhsc2pzIHdpbGwgcmVjb3ZlciBpdCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkaW5nUmV0cnlDb3VudCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmdSZXRyeUNvdW50ID0gbG9hZGluZ1JldHJ5Q291bnQgLSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBIbHMuRXJyb3JUeXBlcy5ORVRXT1JLX0VSUk9SKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBIbHMuRXJyb3JUeXBlcy5NRURJQV9FUlJPUikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGxzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5yZWNvdmVyTWVkaWFFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0b3AoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGxzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0YXJ0TG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yVHlwZSA9IFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1I7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDQwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZSA9IFBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YSAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzICYmIGRhdGEubmV0d29ya0RldGFpbHMuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGUgPSBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gNDA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlID0gUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW2Vycm9yVHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBkYXRhLmRldGFpbHM7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclRyaWdnZXIodGVtcEVycm9yLCB0aGF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGF0Lm9uKFBMQVlFUl9TVEFURSwgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGlmICghZmlyc3RMb2FkZWQgJiYgZGF0YS5wcmV2c3RhdGUgPT09IFNUQVRFX0xPQURJTkcgJiYgZGF0YS5uZXdzdGF0ZSA9PT0gU1RBVEVfSURMRSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChobHMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3VwZXJQbGF5X2Z1bmMgPSB0aGF0LnN1cGVyKCdwbGF5Jyk7XG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICBzdXBlclN0b3BfZnVuYyA9IHRoYXQuc3VwZXIoJ3N0b3AnKTtcblxuICAgICAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICghaXNNYW5pZmVzdExvYWRlZCkge1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSB0aGF0LmdldFNvdXJjZXMoKVt0aGF0LmdldEN1cnJlbnRTb3VyY2UoKV0uZmlsZTtcblxuICAgICAgICAgICAgICAgIGlmIChobHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VwZXJQbGF5X2Z1bmMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuc3RvcCA9ICgpID0+IHtcblxuICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG5cbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGhscykge1xuICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdXBlclN0b3BfZnVuYygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcblxuICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG5cbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGhscykge1xuXG4gICAgICAgICAgICAgICAgaGxzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGxzID0gbnVsbDtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IFBST1ZJREVSIERFU1RST1VZRUQuXCIpO1xuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW0lOSVRfSExTSlNfTk9URk9VTkRdO1xuICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgdGhyb3cgdGVtcEVycm9yO1xuICAgIH1cblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBIbHNQcm92aWRlcjsiXSwic291cmNlUm9vdCI6IiJ9