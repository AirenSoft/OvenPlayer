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

        window.op_hls = hls;

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

                            hls.recoverMediaError();
                            that.play();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJQbGF5X2Z1bmMiLCJzdXBlckRlc3Ryb3lfZnVuYyIsImxvYWRSZXRyeWVyIiwiaXNNYW5pZmVzdExvYWRlZCIsImZpcnN0TG9hZGVkIiwiSGxzIiwiZGVidWciLCJtYXhCdWZmZXJMZW5ndGgiLCJtYXhNYXhCdWZmZXJMZW5ndGgiLCJmcmFnTG9hZGluZ01heFJldHJ5IiwibWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkiLCJsZXZlbExvYWRpbmdNYXhSZXRyeSIsImF0dGFjaE1lZGlhIiwid2luZG93Iiwib3BfaGxzIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRpbmdSZXRyeUNvdW50IiwiZ2V0Q29uZmlnIiwibG9hZFNvdXJjZSIsImZpbGUiLCJvbmNlIiwiRXZlbnRzIiwiTUFOSUZFU1RfTE9BREVEIiwiZXZlbnQiLCJkYXRhIiwiTEVWRUxfTE9BREVEIiwiY2xlYXJUaW1lb3V0IiwiY29uZmlnIiwiZGV0YWlscyIsImxpdmUiLCJzZWVrIiwiaXNBdXRvU3RhcnQiLCJwbGF5Iiwib24iLCJFUlJPUiIsIm5ldHdvcmtEZXRhaWxzIiwic3RhdHVzIiwic2V0U3RhdGUiLCJTVEFURV9MT0FESU5HIiwic2V0VGltZW91dCIsInN0b3AiLCJzdG9wTG9hZCIsInN0YXJ0TG9hZCIsInR5cGUiLCJFcnJvclR5cGVzIiwiTUVESUFfRVJST1IiLCJmYXRhbCIsInJlY292ZXJNZWRpYUVycm9yIiwiTkVUV09SS19FUlJPUiIsImVycm9yVHlwZSIsIlBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IiLCJQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IiLCJQTEFZRVJfQVVUSF9GQUlMRURfRVJST1IiLCJQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1IiLCJ0ZW1wRXJyb3IiLCJFUlJPUlMiLCJjb2RlcyIsImVycm9yIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwibmV3c3RhdGUiLCJnZXRTb3VyY2VzIiwiZ2V0Q3VycmVudFNvdXJjZSIsImRlc3Ryb3kiLCJJTklUX0hMU0pTX05PVEZPVU5EIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7O0FBTUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFPQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsQ0FBVUMsT0FBVixFQUFtQkMsWUFBbkIsRUFBaUNDLFFBQWpDLEVBQTJDO0FBQzNELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE1BQU0sSUFBVjtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLGNBQWMsSUFBbEI7QUFDQSxRQUFJQyxtQkFBbUIsS0FBdkI7QUFDQSxRQUFJQyxjQUFjLEtBQWxCOztBQUVBLFFBQUk7QUFDQUwsY0FBTSxJQUFJTSxHQUFKLENBQVE7QUFDVkMsbUJBQU8sS0FERztBQUVWQyw2QkFBaUIsRUFGUDtBQUdWQyxnQ0FBb0IsRUFIVjtBQUlWQyxpQ0FBcUIsQ0FKWDtBQUtWQyxxQ0FBeUIsQ0FMZjtBQU1WQyxrQ0FBc0I7QUFOWixTQUFSLENBQU47O0FBU0FaLFlBQUlhLFdBQUosQ0FBZ0JqQixPQUFoQjs7QUFFQWtCLGVBQU9DLE1BQVAsR0FBZ0JmLEdBQWhCOztB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LGdCQUFJb0YsT0FBSjtBQUNBcEYsa0JBQU0sSUFBTjtBQUNBbUMsOEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7QUFDQWxDO0FBQ0gsU0FMRDtBQU1ILEtBak1ELENBaU1FLE9BQU80RSxLQUFQLEVBQWM7QUFDWixZQUFJSCxZQUFZQyxrQkFBT0MsS0FBUCxDQUFhUSw4QkFBYixDQUFoQjtBQUNBVixrQkFBVUcsS0FBVixHQUFrQkEsS0FBbEI7QUFDQSxjQUFNSCxTQUFOO0FBQ0g7O0FBRUQsV0FBTzVFLElBQVA7QUFDSCxDQWpORCxDLENBckJBOzs7cUJBeU9lSixXIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiA3Li5cbiAqL1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIFBST1ZJREVSX0hMUyxcbiAgICBQTEFZRVJfU1RBVEUsIFNUQVRFX0lETEUsIFNUQVRFX0xPQURJTkcsXG4gICAgSU5JVF9EQVNIX1VOU1VQUE9SVCwgRVJST1JTLFxuICAgIElOSVRfSExTSlNfTk9URk9VTkRcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5pbXBvcnQge1BMQVlFUl9VTktOV09OX0VSUk9SLCBQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SLCBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IsIFBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUiwgUExBWUVSX0FVVEhfRkFJTEVEX0VSUk9SLCBQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1J9IGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBobHNqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cblxuY29uc3QgSGxzUHJvdmlkZXIgPSBmdW5jdGlvbiAoZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCkge1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGhscyA9IG51bGw7XG4gICAgbGV0IHN1cGVyUGxheV9mdW5jID0gbnVsbDtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuICAgIGxldCBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgbGV0IGlzTWFuaWZlc3RMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgZmlyc3RMb2FkZWQgPSBmYWxzZTtcblxuICAgIHRyeSB7XG4gICAgICAgIGhscyA9IG5ldyBIbHMoe1xuICAgICAgICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgICAgICAgbWF4QnVmZmVyTGVuZ3RoOiAyMCxcbiAgICAgICAgICAgIG1heE1heEJ1ZmZlckxlbmd0aDogMzAsXG4gICAgICAgICAgICBmcmFnTG9hZGluZ01heFJldHJ5OiAwLFxuICAgICAgICAgICAgbWFuaWZlc3RMb2FkaW5nTWF4UmV0cnk6IDAsXG4gICAgICAgICAgICBsZXZlbExvYWRpbmdNYXhSZXRyeTogMFxuICAgICAgICB9KTtcblxuICAgICAgICBobHMuYXR0YWNoTWVkaWEoZWxlbWVudCk7XG5cbiAgICAgICAgd2luZG93Lm9wX2hscyA9IGhscztcblxuICAgICAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgICAgIG5hbWU6IFBST1ZJREVSX0hMUyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICBtc2U6IGhscyxcbiAgICAgICAgICAgIGxpc3RlbmVyOiBudWxsLFxuICAgICAgICAgICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY2FuU2VlazogZmFsc2UsXG4gICAgICAgICAgICBpc0xpdmU6IGZhbHNlLFxuICAgICAgICAgICAgc2Vla2luZzogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZTogU1RBVEVfSURMRSxcbiAgICAgICAgICAgIGJ1ZmZlcjogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZTogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiAtMSxcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IC0xLFxuICAgICAgICAgICAgcXVhbGl0eUxldmVsczogW10sXG4gICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgIGFkVGFnVXJsOiBhZFRhZ1VybFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uIChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pIHtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIiArIGxhc3RQbGF5UG9zaXRpb24pO1xuXG4gICAgICAgICAgICBsZXQgbG9hZGluZ1JldHJ5Q291bnQgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG9hZGluZ1JldHJ5Q291bnQ7XG5cbiAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZS5maWxlKTtcblxuICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5NQU5JRkVTVF9MT0FERUQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaXNNYW5pZmVzdExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5MRVZFTF9MT0FERUQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZmlyc3RMb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBobHMuY29uZmlnLmZyYWdMb2FkaW5nTWF4UmV0cnkgPSAyO1xuICAgICAgICAgICAgICAgIGhscy5jb25maWcubWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkgPSAyO1xuICAgICAgICAgICAgICAgIGhscy5jb25maWcubGV2ZWxMb2FkaW5nTWF4UmV0cnkgPSAyO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGV0YWlscy5saXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMuaXNMaXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFBsYXlQb3NpdGlvbiAmJiBsYXN0UGxheVBvc2l0aW9uID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGhscy5vbihIbHMuRXZlbnRzLkVSUk9SLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDIwMikge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IEhscy5FcnJvclR5cGVzLk1FRElBX0VSUk9SKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5mYXRhbCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnJlY292ZXJNZWRpYUVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRpbmdSZXRyeUNvdW50ID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ1JldHJ5Q291bnQgPSBsb2FkaW5nUmV0cnlDb3VudCAtIDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IEhscy5FcnJvclR5cGVzLk5FVFdPUktfRVJST1IpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RhcnRMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT09IEhscy5FcnJvclR5cGVzLk1FRElBX0VSUk9SKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5yZWNvdmVyTWVkaWFFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0YXJ0TG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3JUeXBlID0gUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlID0gUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZSA9IFBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YSAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzICYmIGRhdGEubmV0d29ya0RldGFpbHMuc3RhdHVzID09PSA0MDYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGUgPSBQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbZXJyb3JUeXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGRhdGEuZGV0YWlscztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoYXQub24oUExBWUVSX1NUQVRFLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFmaXJzdExvYWRlZCAmJiBkYXRhLnByZXZzdGF0ZSA9PT0gU1RBVEVfTE9BRElORyAmJiBkYXRhLm5ld3N0YXRlID09PSBTVEFURV9JRExFKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN1cGVyUGxheV9mdW5jID0gdGhhdC5zdXBlcigncGxheScpO1xuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIFBST1ZJREVSIExPQURFRC5cIik7XG5cbiAgICAgICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoIWlzTWFuaWZlc3RMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gdGhhdC5nZXRTb3VyY2VzKClbdGhhdC5nZXRDdXJyZW50U291cmNlKCldLmZpbGU7XG4gICAgICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VwZXJQbGF5X2Z1bmMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgICAgIGhscy5kZXN0cm95KCk7XG4gICAgICAgICAgICBobHMgPSBudWxsO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogUFJPVklERVIgREVTVFJPVVlFRC5cIik7XG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9ITFNKU19OT1RGT1VORF07XG4gICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICB0aHJvdyB0ZW1wRXJyb3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IEhsc1Byb3ZpZGVyOyJdLCJzb3VyY2VSb290IjoiIn0=