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
        hls = new Hls({
            debug: false,
            maxBufferLength: 20,
            maxMaxBufferLength: 30,
            fragLoadingMaxRetry: 0,
            manifestLoadingMaxRetry: 0,
            levelLoadingMaxRetry: 0
        });

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
                        hls.stopLoad();
                        hls.loadSource(source.file);
                    }, 1000);
                } else {

                    if (loadingRetryCount > 0) {

                        that.setState(_constants.STATE_LOADING);

                        if (loadRetryer) {
                            clearTimeout(loadRetryer);
                            loadRetryer = null;
                        }

                        loadingRetryCount = loadingRetryCount - 1;

                        loadRetryer = setTimeout(function () {

                            hls.stopLoad();
                            hls.loadSource(source.file);
                        }, 1000);
                    } else {

                        var errorType = _constants2.PLAYER_UNKNWON_NETWORK_ERROR;

                        if (data && data.networkDetails && data.networkDetails.status === 400) {
                            errorType = _constants2.PLAYER_BAD_REQUEST_ERROR;
                        } else if (data && data.networkDetails && data.networkDetails.status === 403) {
                            errorType = _constants2.PLAYER_AUTH_FAILED_ERROR;
                        } else if (data && data.networkDetails && data.networkDetails.status === 406) {
                            errorType = _constants2.PLAYER_NOT_ACCEPTABLE_ERROR;
                        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {

                            errorType = _constants2.PLAYER_UNKNWON_DECODE_ERROR;

                            if (!data.fatal) {
                                return;
                            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJQbGF5X2Z1bmMiLCJzdXBlckRlc3Ryb3lfZnVuYyIsImxvYWRSZXRyeWVyIiwiaXNNYW5pZmVzdExvYWRlZCIsImZpcnN0TG9hZGVkIiwiSGxzIiwiZGVidWciLCJtYXhCdWZmZXJMZW5ndGgiLCJtYXhNYXhCdWZmZXJMZW5ndGgiLCJmcmFnTG9hZGluZ01heFJldHJ5IiwibWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkiLCJsZXZlbExvYWRpbmdNYXhSZXRyeSIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRpbmdSZXRyeUNvdW50IiwiZ2V0Q29uZmlnIiwibG9hZFNvdXJjZSIsImZpbGUiLCJvbmNlIiwiRXZlbnRzIiwiTUFOSUZFU1RfTE9BREVEIiwiZXZlbnQiLCJkYXRhIiwiTEVWRUxfTE9BREVEIiwiY2xlYXJUaW1lb3V0IiwiY29uZmlnIiwiZGV0YWlscyIsImxpdmUiLCJzZWVrIiwiaXNBdXRvU3RhcnQiLCJwbGF5Iiwib24iLCJFUlJPUiIsIm5ldHdvcmtEZXRhaWxzIiwic3RhdHVzIiwic2V0U3RhdGUiLCJTVEFURV9MT0FESU5HIiwic2V0VGltZW91dCIsInN0b3BMb2FkIiwiZXJyb3JUeXBlIiwiUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUiIsIlBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUiIsIlBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUiIsIlBMQVlFUl9OT1RfQUNDRVBUQUJMRV9FUlJPUiIsInR5cGUiLCJFcnJvclR5cGVzIiwiTUVESUFfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJmYXRhbCIsInRlbXBFcnJvciIsIkVSUk9SUyIsImNvZGVzIiwiZXJyb3IiLCJQTEFZRVJfU1RBVEUiLCJwcmV2c3RhdGUiLCJuZXdzdGF0ZSIsImdldFNvdXJjZXMiLCJnZXRDdXJyZW50U291cmNlIiwiZGVzdHJveSIsIklOSVRfSExTSlNfTk9URk9VTkQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7QUFDQTs7QUFNQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQU9BLElBQU1BLGNBQWMsU0FBZEEsV0FBYyxDQUFVQyxPQUFWLEVBQW1CQyxZQUFuQixFQUFpQ0MsUUFBakMsRUFBMkM7QUFDM0QsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsTUFBTSxJQUFWO0FBQ0EsUUFBSUMsaUJBQWlCLElBQXJCO0FBQ0EsUUFBSUMsb0JBQW9CLElBQXhCO0FBQ0EsUUFBSUMsY0FBYyxJQUFsQjtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLGNBQWMsS0FBbEI7O0FBRUEsUUFBSTtBQUNBTCxjQUFNLElBQUlNLEdBQUosQ0FBUTtBQUNWQyxtQkFBTyxLQURHO0FBRVZDLDZCQUFpQixFQUZQO0FBR1ZDLGdDQUFvQixFQUhWO0FBSVZDLGlDQUFxQixDQUpYO0FBS1ZDLHFDQUF5QixDQUxmO0FBTVZDLGtDQUFzQjtBQU5aLFNBQVIsQ0FBTjs7QUFTQVosWUFBSWEsV0FBSixDQUFnQmpCLE9BQWhCOztBQUVBLFlBQUlrQixPQUFPO0FBQ1BDLGtCQUFNQyx1QkFEQztBQUVQcEIscUJBQVNBLE9BRkY7QUFHUHFCLGlCQUFLakIsR0FIRTtB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MkQsUUFBSjtBQUNIO0FBQ0osYUFYRDtBQVlILFNBOUdNLENBQVA7O0FBZ0hBMUQseUJBQWlCRixjQUFXLE1BQVgsQ0FBakI7QUFDQUcsNEJBQW9CSCxjQUFXLFNBQVgsQ0FBcEI7QUFDQWtDLDBCQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXRCOztBQUVBbkMsYUFBS29ELElBQUwsR0FBWSxZQUFNOztBQUVkLGdCQUFJLENBQUMvQyxnQkFBTCxFQUF1QjtBQUNuQixvQkFBSTJCLFNBQVNoQyxLQUFLOEUsVUFBTCxHQUFrQjlFLEtBQUsrRSxnQkFBTCxFQUFsQixFQUEyQ3hDLElBQXhEO0FBQ0F0QyxvQkFBSXFDLFVBQUosQ0FBZU4sTUFBZjtBQUNILGFBSEQsTUFHTztBQUNIOUI7QUFDSDtBQUVKLFNBVEQ7O0FBV0FGLGFBQUtnRixPQUFMLEdBQWUsWUFBTTtBQUNqQi9FLGdCQUFJK0UsT0FBSjtBQUNBL0Usa0JBQU0sSUFBTjtBQUNBaUMsOEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7QUFDQWhDO0FBQ0gsU0FMRDtBQU1ILEtBcEtELENBb0tFLE9BQU91RSxLQUFQLEVBQWM7QUFDWixZQUFJSCxZQUFZQyxrQkFBT0MsS0FBUCxDQUFhUSw4QkFBYixDQUFoQjtBQUNBVixrQkFBVUcsS0FBVixHQUFrQkEsS0FBbEI7QUFDQSxjQUFNSCxTQUFOO0FBQ0g7O0FBRUQsV0FBT3ZFLElBQVA7QUFDSCxDQXBMRCxDLENBckJBOzs7cUJBNE1lSixXIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiA3Li5cbiAqL1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIFBST1ZJREVSX0hMUyxcbiAgICBQTEFZRVJfU1RBVEUsIFNUQVRFX0lETEUsIFNUQVRFX0xPQURJTkcsXG4gICAgSU5JVF9EQVNIX1VOU1VQUE9SVCwgRVJST1JTLFxuICAgIElOSVRfSExTSlNfTk9URk9VTkRcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5pbXBvcnQge1BMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IsIFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiwgUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SLCBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1IsIFBMQVlFUl9OT1RfQUNDRVBUQUJMRV9FUlJPUn0gZnJvbSBcIi4uLy4uLy4uL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIGhsc2pzIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxuICogKi9cblxuXG5jb25zdCBIbHNQcm92aWRlciA9IGZ1bmN0aW9uIChlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKSB7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgaGxzID0gbnVsbDtcbiAgICBsZXQgc3VwZXJQbGF5X2Z1bmMgPSBudWxsO1xuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyA9IG51bGw7XG4gICAgbGV0IGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICBsZXQgaXNNYW5pZmVzdExvYWRlZCA9IGZhbHNlO1xuICAgIGxldCBmaXJzdExvYWRlZCA9IGZhbHNlO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgaGxzID0gbmV3IEhscyh7XG4gICAgICAgICAgICBkZWJ1ZzogZmFsc2UsXG4gICAgICAgICAgICBtYXhCdWZmZXJMZW5ndGg6IDIwLFxuICAgICAgICAgICAgbWF4TWF4QnVmZmVyTGVuZ3RoOiAzMCxcbiAgICAgICAgICAgIGZyYWdMb2FkaW5nTWF4UmV0cnk6IDAsXG4gICAgICAgICAgICBtYW5pZmVzdExvYWRpbmdNYXhSZXRyeTogMCxcbiAgICAgICAgICAgIGxldmVsTG9hZGluZ01heFJldHJ5OiAwXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhscy5hdHRhY2hNZWRpYShlbGVtZW50KTtcblxuICAgICAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgICAgIG5hbWU6IFBST1ZJREVSX0hMUyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICBtc2U6IGhscyxcbiAgICAgICAgICAgIGxpc3RlbmVyOiBudWxsLFxuICAgICAgICAgICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY2FuU2VlazogZmFsc2UsXG4gICAgICAgICAgICBpc0xpdmU6IGZhbHNlLFxuICAgICAgICAgICAgc2Vla2luZzogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZTogU1RBVEVfSURMRSxcbiAgICAgICAgICAgIGJ1ZmZlcjogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZTogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiAtMSxcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IC0xLFxuICAgICAgICAgICAgcXVhbGl0eUxldmVsczogW10sXG4gICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgIGFkVGFnVXJsOiBhZFRhZ1VybFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uIChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pIHtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIiArIGxhc3RQbGF5UG9zaXRpb24pO1xuXG4gICAgICAgICAgICBsZXQgbG9hZGluZ1JldHJ5Q291bnQgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG9hZGluZ1JldHJ5Q291bnQ7XG5cbiAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZS5maWxlKTtcblxuICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5NQU5JRkVTVF9MT0FERUQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaXNNYW5pZmVzdExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5MRVZFTF9MT0FERUQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZmlyc3RMb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBobHMuY29uZmlnLmZyYWdMb2FkaW5nTWF4UmV0cnkgPSAyO1xuICAgICAgICAgICAgICAgIGhscy5jb25maWcubWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkgPSAyO1xuICAgICAgICAgICAgICAgIGhscy5jb25maWcubGV2ZWxMb2FkaW5nTWF4UmV0cnkgPSAyO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGV0YWlscy5saXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMuaXNMaXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFBsYXlQb3NpdGlvbiAmJiBsYXN0UGxheVBvc2l0aW9uID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGhscy5vbihIbHMuRXZlbnRzLkVSUk9SLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDIwMikge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRpbmdSZXRyeUNvdW50ID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ1JldHJ5Q291bnQgPSBsb2FkaW5nUmV0cnlDb3VudCAtIDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMubG9hZFNvdXJjZShzb3VyY2UuZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yVHlwZSA9IFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1I7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDQwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZSA9IFBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YSAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzICYmIGRhdGEubmV0d29ya0RldGFpbHMuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGUgPSBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gNDA2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlID0gUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT09IEhscy5FcnJvclR5cGVzLk1FRElBX0VSUk9SKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGUgPSBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1I7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuZmF0YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tlcnJvclR5cGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZGF0YS5kZXRhaWxzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKHRlbXBFcnJvciwgdGhhdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhhdC5vbihQTEFZRVJfU1RBVEUsIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZpcnN0TG9hZGVkICYmIGRhdGEucHJldnN0YXRlID09PSBTVEFURV9MT0FESU5HICYmIGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX0lETEUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3VwZXJQbGF5X2Z1bmMgPSB0aGF0LnN1cGVyKCdwbGF5Jyk7XG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICghaXNNYW5pZmVzdExvYWRlZCkge1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSB0aGF0LmdldFNvdXJjZXMoKVt0aGF0LmdldEN1cnJlbnRTb3VyY2UoKV0uZmlsZTtcbiAgICAgICAgICAgICAgICBobHMubG9hZFNvdXJjZShzb3VyY2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdXBlclBsYXlfZnVuYygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgaGxzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGhscyA9IG51bGw7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBQUk9WSURFUiBERVNUUk9VWUVELlwiKTtcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tJTklUX0hMU0pTX05PVEZPVU5EXTtcbiAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHRocm93IHRlbXBFcnJvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgSGxzUHJvdmlkZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==