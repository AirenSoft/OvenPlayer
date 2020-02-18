/*! OvenPlayerv0.9.853 | (c)2020 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
                    if (lastPlayPosition > 0) {
                        that.seek(lastPlayPosition);
                    }
                }
                if (playerConfig.isAutoStart()) {
                    that.play();
                }
            });

            hls.on(Hls.Events.ERROR, function (event, data) {

                if (data.networkDetails.status === 202) {

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

                    var tempError = _constants.ERRORS.codes[_constants2.PLAYER_UNKNWON_NEWWORK_ERROR];
                    tempError.error = data.details;
                    (0, _utils.errorTrigger)(tempError, that);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJQbGF5X2Z1bmMiLCJzdXBlckRlc3Ryb3lfZnVuYyIsImxvYWRSZXRyeWVyIiwiaXNNYW5pZmVzdExvYWRlZCIsImZpcnN0TG9hZGVkIiwiSGxzIiwiZGVidWciLCJtYXhCdWZmZXJMZW5ndGgiLCJtYXhNYXhCdWZmZXJMZW5ndGgiLCJmcmFnTG9hZGluZ01heFJldHJ5IiwibWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkiLCJsZXZlbExvYWRpbmdNYXhSZXRyeSIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRTb3VyY2UiLCJmaWxlIiwib25jZSIsIkV2ZW50cyIsIk1BTklGRVNUX0xPQURFRCIsImV2ZW50IiwiZGF0YSIsIkxFVkVMX0xPQURFRCIsImNsZWFyVGltZW91dCIsImNvbmZpZyIsImRldGFpbHMiLCJsaXZlIiwic2VlayIsImlzQXV0b1N0YXJ0IiwicGxheSIsIm9uIiwiRVJST1IiLCJuZXR3b3JrRGV0YWlscyIsInN0YXR1cyIsInNldFN0YXRlIiwiU1RBVEVfTE9BRElORyIsInNldFRpbWVvdXQiLCJzdG9wTG9hZCIsInRlbXBFcnJvciIsIkVSUk9SUyIsImNvZGVzIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsImVycm9yIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwibmV3c3RhdGUiLCJnZXRTb3VyY2VzIiwiZ2V0Q3VycmVudFNvdXJjZSIsImRlc3Ryb3kiLCJJTklUX0hMU0pTX05PVEZPVU5EIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7O0FBTUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFPQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsQ0FBVUMsT0FBVixFQUFtQkMsWUFBbkIsRUFBaUNDLFFBQWpDLEVBQTJDO0FBQzNELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE1BQU0sSUFBVjtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLGNBQWMsSUFBbEI7QUFDQSxRQUFJQyxtQkFBbUIsS0FBdkI7QUFDQSxRQUFJQyxjQUFjLEtBQWxCOztBQUVBLFFBQUk7QUFDQUwsY0FBTSxJQUFJTSxHQUFKLENBQVE7QUFDVkMsbUJBQU8sS0FERztBQUVWQyw2QkFBaUIsRUFGUDtBQUdWQyxnQ0FBb0IsRUFIVjtBQUlWQyxpQ0FBcUIsQ0FKWDtBQUtWQyxxQ0FBeUIsQ0FMZjtBQU1WQyxrQ0FBc0I7QUFOWixTQUFSLENBQU47O0FBU0FaLFlBQUlhLFdBQUosQ0FBZ0JqQixPQUFoQjs7QUFFQSxZQUFJa0IsT0FBTztBQUNQQyxrQkFBTUMsdUJBREM7QUFFUHBCLHFCQUFTQSxPQUZGO0FBR1BxQixpQkFBS2pCLEdBSEU7QUFJUGtCLHNCQUFVLElBSkg7QUFLUEMsc0JBQVUsS0FMSDtBQU1QQyxxQkFBUyxLQU5GO0FBT1BDLG9CQUFRLEtBUEQ7QUFRUEMscUJBQVMsS0FSRjtBQVNQQyxtQkFBT0MscUJBVEE7QUFVUEMsb0JBQVEsQ0FWRDtBQVdQQyx1QkFBVyxDQVhKO0FBWVBDLDRCQUFnQixDQUFDLENBWlY7QUFhUEMsMkJBQWUsQ0FBQyxDQWJUO0FBY1BDLDJCQUFlLEVBZFI7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QUVkLGdCQUFJLENBQUM3QyxnQkFBTCxFQUF1QjtBQUNuQixvQkFBSTJCLFNBQVNoQyxLQUFLbUUsVUFBTCxHQUFrQm5FLEtBQUtvRSxnQkFBTCxFQUFsQixFQUEyQy9CLElBQXhEO0FBQ0FwQyxvQkFBSW1DLFVBQUosQ0FBZUosTUFBZjtBQUNILGFBSEQsTUFHTztBQUNIOUI7QUFDSDtBQUVKLFNBVEQ7O0FBV0FGLGFBQUtxRSxPQUFMLEdBQWUsWUFBTTtBQUNqQnBFLGdCQUFJb0UsT0FBSjtBQUNBcEUsa0JBQU0sSUFBTjtBQUNBaUMsOEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7QUFDQWhDO0FBQ0gsU0FMRDtBQU1ILEtBL0hELENBK0hFLE9BQU80RCxLQUFQLEVBQWM7QUFDWixZQUFJSixZQUFZQyxrQkFBT0MsS0FBUCxDQUFhUyw4QkFBYixDQUFoQjtBQUNBWCxrQkFBVUksS0FBVixHQUFrQkEsS0FBbEI7QUFDQSxjQUFNSixTQUFOO0FBQ0g7O0FBRUQsV0FBTzNELElBQVA7QUFDSCxDQS9JRCxDLENBckJBOzs7cUJBdUtlSixXIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiA3Li5cbiAqL1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIFBST1ZJREVSX0hMUyxcbiAgICBQTEFZRVJfU1RBVEUsIFNUQVRFX0lETEUsIFNUQVRFX0xPQURJTkcsXG4gICAgSU5JVF9EQVNIX1VOU1VQUE9SVCwgRVJST1JTLFxuICAgIElOSVRfSExTSlNfTk9URk9VTkRcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5pbXBvcnQge1BMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1J9IGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBobHNqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cblxuY29uc3QgSGxzUHJvdmlkZXIgPSBmdW5jdGlvbiAoZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCkge1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGhscyA9IG51bGw7XG4gICAgbGV0IHN1cGVyUGxheV9mdW5jID0gbnVsbDtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuICAgIGxldCBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgbGV0IGlzTWFuaWZlc3RMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgZmlyc3RMb2FkZWQgPSBmYWxzZTtcblxuICAgIHRyeSB7XG4gICAgICAgIGhscyA9IG5ldyBIbHMoe1xuICAgICAgICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgICAgICAgbWF4QnVmZmVyTGVuZ3RoOiAyMCxcbiAgICAgICAgICAgIG1heE1heEJ1ZmZlckxlbmd0aDogMzAsXG4gICAgICAgICAgICBmcmFnTG9hZGluZ01heFJldHJ5OiAwLFxuICAgICAgICAgICAgbWFuaWZlc3RMb2FkaW5nTWF4UmV0cnk6IDAsXG4gICAgICAgICAgICBsZXZlbExvYWRpbmdNYXhSZXRyeTogMFxuICAgICAgICB9KTtcblxuICAgICAgICBobHMuYXR0YWNoTWVkaWEoZWxlbWVudCk7XG5cbiAgICAgICAgbGV0IHNwZWMgPSB7XG4gICAgICAgICAgICBuYW1lOiBQUk9WSURFUl9ITFMsXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgbXNlOiBobHMsXG4gICAgICAgICAgICBsaXN0ZW5lcjogbnVsbCxcbiAgICAgICAgICAgIGlzTG9hZGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNhblNlZWs6IGZhbHNlLFxuICAgICAgICAgICAgaXNMaXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHNlZWtpbmc6IGZhbHNlLFxuICAgICAgICAgICAgc3RhdGU6IFNUQVRFX0lETEUsXG4gICAgICAgICAgICBidWZmZXI6IDAsXG4gICAgICAgICAgICBmcmFtZXJhdGU6IDAsXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogLTEsXG4gICAgICAgICAgICBjdXJyZW50U291cmNlOiAtMSxcbiAgICAgICAgICAgIHF1YWxpdHlMZXZlbHM6IFtdLFxuICAgICAgICAgICAgc291cmNlczogW10sXG4gICAgICAgICAgICBhZFRhZ1VybDogYWRUYWdVcmxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBmdW5jdGlvbiAoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IG9uRXh0ZW5kZWRMb2FkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIgKyBsYXN0UGxheVBvc2l0aW9uKTtcblxuICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xuXG4gICAgICAgICAgICBobHMub25jZShIbHMuRXZlbnRzLk1BTklGRVNUX0xPQURFRCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBpc01hbmlmZXN0TG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBobHMub25jZShIbHMuRXZlbnRzLkxFVkVMX0xPQURFRCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBmaXJzdExvYWRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcbiAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGhscy5jb25maWcuZnJhZ0xvYWRpbmdNYXhSZXRyeSA9IDI7XG4gICAgICAgICAgICAgICAgaGxzLmNvbmZpZy5tYW5pZmVzdExvYWRpbmdNYXhSZXRyeSA9IDI7XG4gICAgICAgICAgICAgICAgaGxzLmNvbmZpZy5sZXZlbExvYWRpbmdNYXhSZXRyeSA9IDI7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5kZXRhaWxzLmxpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5pc0xpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0UGxheVBvc2l0aW9uID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaGxzLm9uKEhscy5FdmVudHMuRVJST1IsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubmV0d29ya0RldGFpbHMuc3RhdHVzID09PSAyMDIpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0xPQURJTkcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZGF0YS5kZXRhaWxzO1xuICAgICAgICAgICAgICAgICAgICBlcnJvclRyaWdnZXIodGVtcEVycm9yLCB0aGF0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhhdC5vbihQTEFZRVJfU1RBVEUsIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZpcnN0TG9hZGVkICYmIGRhdGEucHJldnN0YXRlID09PSBTVEFURV9MT0FESU5HICYmIGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX0lETEUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3VwZXJQbGF5X2Z1bmMgPSB0aGF0LnN1cGVyKCdwbGF5Jyk7XG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICghaXNNYW5pZmVzdExvYWRlZCkge1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSB0aGF0LmdldFNvdXJjZXMoKVt0aGF0LmdldEN1cnJlbnRTb3VyY2UoKV0uZmlsZTtcbiAgICAgICAgICAgICAgICBobHMubG9hZFNvdXJjZShzb3VyY2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdXBlclBsYXlfZnVuYygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgaGxzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGhscyA9IG51bGw7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBQUk9WSURFUiBERVNUUk9VWUVELlwiKTtcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tJTklUX0hMU0pTX05PVEZPVU5EXTtcbiAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHRocm93IHRlbXBFcnJvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgSGxzUHJvdmlkZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==