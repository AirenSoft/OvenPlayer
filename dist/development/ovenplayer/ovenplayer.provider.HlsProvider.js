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

                    hls.stopLoad();
                }
            });
        });

        superPlay_func = that["super"]('play');
        superDestroy_func = that["super"]('destroy');
        OvenPlayerConsole.log("HLS PROVIDER LOADED.");

        that.play = function () {

            if (!isManifestLoaded) {
                var source = that.getSources()[that.getCurrentSource()].file;

                hls.loadSource(source);
            } else {
                superPlay_func();
            }
        };

        that.destroy = function () {
            hls.destroy();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJQbGF5X2Z1bmMiLCJzdXBlckRlc3Ryb3lfZnVuYyIsImxvYWRSZXRyeWVyIiwiaXNNYW5pZmVzdExvYWRlZCIsImZpcnN0TG9hZGVkIiwiaGxzQ29uZmlnIiwiZGVidWciLCJtYXhCdWZmZXJMZW5ndGgiLCJtYXhNYXhCdWZmZXJMZW5ndGgiLCJmcmFnTG9hZGluZ01heFJldHJ5IiwibWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkiLCJsZXZlbExvYWRpbmdNYXhSZXRyeSIsImhsc0NvbmZpZ0Zyb21QbGF5ZXJDb25maWciLCJnZXRDb25maWciLCJrZXkiLCJIbHMiLCJ3aW5kb3ciLCJvcF9obHMiLCJhdHRhY2hNZWRpYSIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfSExTIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJsb2FkaW5nUmV0cnlDb3VudCIsImxvYWRTb3VyY2UiLCJmaWxlIiwib25jZSIsIkV2ZW50cyIsIk1BTklGRVNUX0xPQURFRCIsImV2ZW50IiwiZGF0YSIsIkxFVkVMX0xPQURFRCIsImNsZWFyVGltZW91dCIsImNvbmZpZyIsImRldGFpbHMiLCJsaXZlIiwic2VlayIsImlzQXV0b1N0YXJ0IiwicGxheSIsIm9uIiwiRVJST1IiLCJuZXR3b3JrRGV0YWlscyIsInN0YXR1cyIsInNldFN0YXRlIiwiU1RBVEVfTE9BRElORyIsInNldFRpbWVvdXQiLCJzdG9wIiwic3RvcExvYWQiLCJzdGFydExvYWQiLCJ0eXBlIiwiRXJyb3JUeXBlcyIsIk1FRElBX0VSUk9SIiwiZmF0YWwiLCJORVRXT1JLX0VSUk9SIiwicmVjb3Zlck1lZGlhRXJyb3IiLCJlcnJvclR5cGUiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SIiwiUExBWUVSX0FVVEhfRkFJTEVEX0VSUk9SIiwiUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SIiwidGVtcEVycm9yIiwiRVJST1JTIiwiY29kZXMiLCJlcnJvciIsIlBMQVlFUl9TVEFURSIsInByZXZzdGF0ZSIsIm5ld3N0YXRlIiwiZ2V0U291cmNlcyIsImdldEN1cnJlbnRTb3VyY2UiLCJkZXN0cm95IiwiSU5JVF9ITFNKU19OT1RGT1VORCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOztBQU1BOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBT0EsSUFBTUEsY0FBYyxTQUFkQSxXQUFjLENBQVVDLE9BQVYsRUFBbUJDLFlBQW5CLEVBQWlDQyxRQUFqQyxFQUEyQztBQUMzRCxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxNQUFNLElBQVY7QUFDQSxRQUFJQyxpQkFBaUIsSUFBckI7QUFDQSxRQUFJQyxvQkFBb0IsSUFBeEI7QUFDQSxRQUFJQyxjQUFjLElBQWxCO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsUUFBSUMsY0FBYyxLQUFsQjs7QUFHQSxRQUFJOztBQUVBLFlBQUlDLFlBQVk7QUFDWkMsbUJBQU8sS0FESztBQUVaQyw2QkFBaUIsRUFGTDtBQUdaQyxnQ0FBb0IsRUFIUjtBQUlaQyxpQ0FBcUIsQ0FKVDtBQUtaQyxxQ0FBeUIsQ0FMYjtBQU1aQyxrQ0FBc0I7QUFOVixTQUFoQjs7QUFTQSxZQUFJQyw0QkFBNEJoQixhQUFhaUIsU0FBYixH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QUVkLGdCQUFJLENBQUNwRCxnQkFBTCxFQUF1QjtBQUNuQixvQkFBSWlDLFNBQVN0QyxLQUFLc0YsVUFBTCxHQUFrQnRGLEtBQUt1RixnQkFBTCxFQUFsQixFQUEyQzNDLElBQXhEOztBQUVBM0Msb0JBQUkwQyxVQUFKLENBQWVMLE1BQWY7QUFDSCxhQUpELE1BSU87QUFDSHBDO0FBQ0g7QUFFSixTQVZEOztBQVlBRixhQUFLd0YsT0FBTCxHQUFlLFlBQU07QUFDakJ2RixnQkFBSXVGLE9BQUo7QUFDQXZGLGtCQUFNLElBQU47QUFDQXVDLDhCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCO0FBQ0F0QztBQUNILFNBTEQ7QUFNSCxLQTVNRCxDQTRNRSxPQUFPK0UsS0FBUCxFQUFjO0FBQ1osWUFBSUgsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYVEsOEJBQWIsQ0FBaEI7QUFDQVYsa0JBQVVHLEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0EsY0FBTUgsU0FBTjtBQUNIOztBQUVELFdBQU8vRSxJQUFQO0FBQ0gsQ0E3TkQsQyxDQXJCQTs7O3FCQXFQZUosVyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gNy4uXG4gKi9cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBQUk9WSURFUl9ITFMsXG4gICAgUExBWUVSX1NUQVRFLCBTVEFURV9JRExFLCBTVEFURV9MT0FESU5HLFxuICAgIElOSVRfREFTSF9VTlNVUFBPUlQsIEVSUk9SUyxcbiAgICBJTklUX0hMU0pTX05PVEZPVU5EXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuaW1wb3J0IHtQTEFZRVJfVU5LTldPTl9FUlJPUiwgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUiwgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLCBQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IsIFBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUiwgUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SfSBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgaGxzanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5cbmNvbnN0IEhsc1Byb3ZpZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpIHtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBobHMgPSBudWxsO1xuICAgIGxldCBzdXBlclBsYXlfZnVuYyA9IG51bGw7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcbiAgICBsZXQgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgIGxldCBpc01hbmlmZXN0TG9hZGVkID0gZmFsc2U7XG4gICAgbGV0IGZpcnN0TG9hZGVkID0gZmFsc2U7XG5cblxuICAgIHRyeSB7XG5cbiAgICAgICAgbGV0IGhsc0NvbmZpZyA9IHtcbiAgICAgICAgICAgIGRlYnVnOiBmYWxzZSxcbiAgICAgICAgICAgIG1heEJ1ZmZlckxlbmd0aDogMjAsXG4gICAgICAgICAgICBtYXhNYXhCdWZmZXJMZW5ndGg6IDMwLFxuICAgICAgICAgICAgZnJhZ0xvYWRpbmdNYXhSZXRyeTogMCxcbiAgICAgICAgICAgIG1hbmlmZXN0TG9hZGluZ01heFJldHJ5OiAwLFxuICAgICAgICAgICAgbGV2ZWxMb2FkaW5nTWF4UmV0cnk6IDBcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgaGxzQ29uZmlnRnJvbVBsYXllckNvbmZpZyA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5obHNDb25maWc7XG5cbiAgICAgICAgaWYgKGhsc0NvbmZpZ0Zyb21QbGF5ZXJDb25maWcpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGhsc0NvbmZpZ0Zyb21QbGF5ZXJDb25maWcpIHtcbiAgICAgICAgICAgICAgICBobHNDb25maWdba2V5XSA9IGhsc0NvbmZpZ0Zyb21QbGF5ZXJDb25maWdba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGhscyA9IG5ldyBIbHMoaGxzQ29uZmlnKTtcblxuICAgICAgICB3aW5kb3cub3BfaGxzID0gaGxzO1xuXG4gICAgICAgIGhscy5hdHRhY2hNZWRpYShlbGVtZW50KTtcblxuICAgICAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgICAgIG5hbWU6IFBST1ZJREVSX0hMUyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICBtc2U6IGhscyxcbiAgICAgICAgICAgIGxpc3RlbmVyOiBudWxsLFxuICAgICAgICAgICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY2FuU2VlazogZmFsc2UsXG4gICAgICAgICAgICBpc0xpdmU6IGZhbHNlLFxuICAgICAgICAgICAgc2Vla2luZzogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZTogU1RBVEVfSURMRSxcbiAgICAgICAgICAgIGJ1ZmZlcjogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZTogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiAtMSxcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IC0xLFxuICAgICAgICAgICAgcXVhbGl0eUxldmVsczogW10sXG4gICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgIGFkVGFnVXJsOiBhZFRhZ1VybFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uIChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pIHtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIiArIGxhc3RQbGF5UG9zaXRpb24pO1xuXG4gICAgICAgICAgICBsZXQgbG9hZGluZ1JldHJ5Q291bnQgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG9hZGluZ1JldHJ5Q291bnQ7XG5cbiAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZS5maWxlKTtcblxuICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5NQU5JRkVTVF9MT0FERUQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaXNNYW5pZmVzdExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5MRVZFTF9MT0FERUQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZmlyc3RMb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBobHMuY29uZmlnLmZyYWdMb2FkaW5nTWF4UmV0cnkgPSAyO1xuICAgICAgICAgICAgICAgIGhscy5jb25maWcubWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkgPSAyO1xuICAgICAgICAgICAgICAgIGhscy5jb25maWcubGV2ZWxMb2FkaW5nTWF4UmV0cnkgPSAyO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGV0YWlscy5saXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMuaXNMaXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFBsYXlQb3NpdGlvbiAmJiBsYXN0UGxheVBvc2l0aW9uID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGhscy5vbihIbHMuRXZlbnRzLkVSUk9SLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDIwMikge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IEhscy5FcnJvclR5cGVzLk1FRElBX0VSUk9SKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5mYXRhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmcgd2hlbiBub24gZmF0YWwgbWVkaWEgZXJyb3IuIGhsc2pzIHdpbGwgcmVjb3ZlciBpdCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkaW5nUmV0cnlDb3VudCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmdSZXRyeUNvdW50ID0gbG9hZGluZ1JldHJ5Q291bnQgLSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBIbHMuRXJyb3JUeXBlcy5ORVRXT1JLX0VSUk9SKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0YXJ0TG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSBIbHMuRXJyb3JUeXBlcy5NRURJQV9FUlJPUikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMucmVjb3Zlck1lZGlhRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdGFydExvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yVHlwZSA9IFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1I7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDQwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZSA9IFBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YSAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzICYmIGRhdGEubmV0d29ya0RldGFpbHMuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGUgPSBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gNDA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlID0gUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW2Vycm9yVHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBkYXRhLmRldGFpbHM7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclRyaWdnZXIodGVtcEVycm9yLCB0aGF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGF0Lm9uKFBMQVlFUl9TVEFURSwgZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGlmICghZmlyc3RMb2FkZWQgJiYgZGF0YS5wcmV2c3RhdGUgPT09IFNUQVRFX0xPQURJTkcgJiYgZGF0YS5uZXdzdGF0ZSA9PT0gU1RBVEVfSURMRSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdXBlclBsYXlfZnVuYyA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyBQUk9WSURFUiBMT0FERUQuXCIpO1xuXG4gICAgICAgIHRoYXQucGxheSA9ICgpID0+IHtcblxuICAgICAgICAgICAgaWYgKCFpc01hbmlmZXN0TG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IHRoYXQuZ2V0U291cmNlcygpW3RoYXQuZ2V0Q3VycmVudFNvdXJjZSgpXS5maWxlO1xuXG4gICAgICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VwZXJQbGF5X2Z1bmMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgICAgIGhscy5kZXN0cm95KCk7XG4gICAgICAgICAgICBobHMgPSBudWxsO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogUFJPVklERVIgREVTVFJPVVlFRC5cIik7XG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9ITFNKU19OT1RGT1VORF07XG4gICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICB0aHJvdyB0ZW1wRXJyb3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IEhsc1Byb3ZpZGVyOyJdLCJzb3VyY2VSb290IjoiIn0=