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
                    if (lastPlayPosition > 0) {
                        that.seek(lastPlayPosition);
                    }
                }
                if (playerConfig.isAutoStart()) {
                    that.play();
                }
            });

            hls.on(Hls.Events.ERROR, function (event, data) {

                if (data && data.networkDetail && data.networkDetails.status === 202) {

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
                        var tempError = _constants.ERRORS.codes[_constants2.PLAYER_UNKNWON_NEWWORK_ERROR];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJQbGF5X2Z1bmMiLCJzdXBlckRlc3Ryb3lfZnVuYyIsImxvYWRSZXRyeWVyIiwiaXNNYW5pZmVzdExvYWRlZCIsImZpcnN0TG9hZGVkIiwiSGxzIiwiZGVidWciLCJtYXhCdWZmZXJMZW5ndGgiLCJtYXhNYXhCdWZmZXJMZW5ndGgiLCJmcmFnTG9hZGluZ01heFJldHJ5IiwibWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkiLCJsZXZlbExvYWRpbmdNYXhSZXRyeSIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRpbmdSZXRyeUNvdW50IiwiZ2V0Q29uZmlnIiwibG9hZFNvdXJjZSIsImZpbGUiLCJvbmNlIiwiRXZlbnRzIiwiTUFOSUZFU1RfTE9BREVEIiwiZXZlbnQiLCJkYXRhIiwiTEVWRUxfTE9BREVEIiwiY2xlYXJUaW1lb3V0IiwiY29uZmlnIiwiZGV0YWlscyIsImxpdmUiLCJzZWVrIiwiaXNBdXRvU3RhcnQiLCJwbGF5Iiwib24iLCJFUlJPUiIsIm5ldHdvcmtEZXRhaWwiLCJuZXR3b3JrRGV0YWlscyIsInN0YXR1cyIsInNldFN0YXRlIiwiU1RBVEVfTE9BRElORyIsInNldFRpbWVvdXQiLCJzdG9wTG9hZCIsInRlbXBFcnJvciIsIkVSUk9SUyIsImNvZGVzIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsImVycm9yIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwibmV3c3RhdGUiLCJnZXRTb3VyY2VzIiwiZ2V0Q3VycmVudFNvdXJjZSIsImRlc3Ryb3kiLCJJTklUX0hMU0pTX05PVEZPVU5EIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7O0FBTUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFPQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsQ0FBVUMsT0FBVixFQUFtQkMsWUFBbkIsRUFBaUNDLFFBQWpDLEVBQTJDO0FBQzNELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE1BQU0sSUFBVjtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLGNBQWMsSUFBbEI7QUFDQSxRQUFJQyxtQkFBbUIsS0FBdkI7QUFDQSxRQUFJQyxjQUFjLEtBQWxCOztBQUVBLFFBQUk7QUFDQUwsY0FBTSxJQUFJTSxHQUFKLENBQVE7QUFDVkMsbUJBQU8sS0FERztBQUVWQyw2QkFBaUIsRUFGUDtBQUdWQyxnQ0FBb0IsRUFIVjtBQUlWQyxpQ0FBcUIsQ0FKWDtBQUtWQyxxQ0FBeUIsQ0FMZjtBQU1WQyxrQ0FBc0I7QUFOWixTQUFSLENBQU47O0FBU0FaLFlBQUlhLFdBQUosQ0FBZ0JqQixPQUFoQjs7QUFFQSxZQUFJa0IsT0FBTztBQUNQQyxrQkFBTUMsdUJBREM7QUFFUHBCLHFCQUFTQSxPQUZGO0FBR1BxQixpQkFBS2pCLEdBSEU7QUFJUGtCLHNCQUFVLElBSkg7QUFLUEMsc0JBQVUsS0FMSDtBQU1QQyxxQkFBUyxLQU5GO0FBT1BDLG9CQUFRLEtBUEQ7QUFRUEMscUJBQVMsS0FSRjtBQVNQQyxtQkFBT0MscUJBVEE7QUFVUEMsb0JBQVEsQ0FWRDtBQVdQQyx1QkFBVyxDQVhKO0FBWVBDLDRCQUFnQixD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ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiA3Li5cbiAqL1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1xuICAgIFBST1ZJREVSX0hMUyxcbiAgICBQTEFZRVJfU1RBVEUsIFNUQVRFX0lETEUsIFNUQVRFX0xPQURJTkcsXG4gICAgSU5JVF9EQVNIX1VOU1VQUE9SVCwgRVJST1JTLFxuICAgIElOSVRfSExTSlNfTk9URk9VTkRcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5pbXBvcnQge1BMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1J9IGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBobHNqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cblxuY29uc3QgSGxzUHJvdmlkZXIgPSBmdW5jdGlvbiAoZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCkge1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGhscyA9IG51bGw7XG4gICAgbGV0IHN1cGVyUGxheV9mdW5jID0gbnVsbDtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuICAgIGxldCBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgbGV0IGlzTWFuaWZlc3RMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgZmlyc3RMb2FkZWQgPSBmYWxzZTtcblxuICAgIHRyeSB7XG4gICAgICAgIGhscyA9IG5ldyBIbHMoe1xuICAgICAgICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgICAgICAgbWF4QnVmZmVyTGVuZ3RoOiAyMCxcbiAgICAgICAgICAgIG1heE1heEJ1ZmZlckxlbmd0aDogMzAsXG4gICAgICAgICAgICBmcmFnTG9hZGluZ01heFJldHJ5OiAwLFxuICAgICAgICAgICAgbWFuaWZlc3RMb2FkaW5nTWF4UmV0cnk6IDAsXG4gICAgICAgICAgICBsZXZlbExvYWRpbmdNYXhSZXRyeTogMFxuICAgICAgICB9KTtcblxuICAgICAgICBobHMuYXR0YWNoTWVkaWEoZWxlbWVudCk7XG5cbiAgICAgICAgbGV0IHNwZWMgPSB7XG4gICAgICAgICAgICBuYW1lOiBQUk9WSURFUl9ITFMsXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgbXNlOiBobHMsXG4gICAgICAgICAgICBsaXN0ZW5lcjogbnVsbCxcbiAgICAgICAgICAgIGlzTG9hZGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNhblNlZWs6IGZhbHNlLFxuICAgICAgICAgICAgaXNMaXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHNlZWtpbmc6IGZhbHNlLFxuICAgICAgICAgICAgc3RhdGU6IFNUQVRFX0lETEUsXG4gICAgICAgICAgICBidWZmZXI6IDAsXG4gICAgICAgICAgICBmcmFtZXJhdGU6IDAsXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogLTEsXG4gICAgICAgICAgICBjdXJyZW50U291cmNlOiAtMSxcbiAgICAgICAgICAgIHF1YWxpdHlMZXZlbHM6IFtdLFxuICAgICAgICAgICAgc291cmNlczogW10sXG4gICAgICAgICAgICBhZFRhZ1VybDogYWRUYWdVcmxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBmdW5jdGlvbiAoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IG9uRXh0ZW5kZWRMb2FkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIgKyBsYXN0UGxheVBvc2l0aW9uKTtcblxuICAgICAgICAgICAgbGV0IGxvYWRpbmdSZXRyeUNvdW50ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvYWRpbmdSZXRyeUNvdW50O1xuXG4gICAgICAgICAgICBobHMubG9hZFNvdXJjZShzb3VyY2UuZmlsZSk7XG5cbiAgICAgICAgICAgIGhscy5vbmNlKEhscy5FdmVudHMuTUFOSUZFU1RfTE9BREVELCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGlzTWFuaWZlc3RMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGhscy5vbmNlKEhscy5FdmVudHMuTEVWRUxfTE9BREVELCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGZpcnN0TG9hZGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaGxzLmNvbmZpZy5mcmFnTG9hZGluZ01heFJldHJ5ID0gMjtcbiAgICAgICAgICAgICAgICBobHMuY29uZmlnLm1hbmlmZXN0TG9hZGluZ01heFJldHJ5ID0gMjtcbiAgICAgICAgICAgICAgICBobHMuY29uZmlnLmxldmVsTG9hZGluZ01heFJldHJ5ID0gMjtcblxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmRldGFpbHMubGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBzcGVjLmlzTGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RQbGF5UG9zaXRpb24gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBobHMub24oSGxzLkV2ZW50cy5FUlJPUiwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLm5ldHdvcmtEZXRhaWwgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDIwMikge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBobHMubG9hZFNvdXJjZShzb3VyY2UuZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobG9hZGluZ1JldHJ5Q291bnQgPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nUmV0cnlDb3VudCA9IGxvYWRpbmdSZXRyeUNvdW50IC0gMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZS5maWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGRhdGEuZGV0YWlscztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoYXQub24oUExBWUVSX1NUQVRFLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFmaXJzdExvYWRlZCAmJiBkYXRhLnByZXZzdGF0ZSA9PT0gU1RBVEVfTE9BRElORyAmJiBkYXRhLm5ld3N0YXRlID09PSBTVEFURV9JRExFKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN1cGVyUGxheV9mdW5jID0gdGhhdC5zdXBlcigncGxheScpO1xuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIFBST1ZJREVSIExPQURFRC5cIik7XG5cbiAgICAgICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoIWlzTWFuaWZlc3RMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gdGhhdC5nZXRTb3VyY2VzKClbdGhhdC5nZXRDdXJyZW50U291cmNlKCldLmZpbGU7XG4gICAgICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VwZXJQbGF5X2Z1bmMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgICAgIGhscy5kZXN0cm95KCk7XG4gICAgICAgICAgICBobHMgPSBudWxsO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogUFJPVklERVIgREVTVFJPVVlFRC5cIik7XG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9ITFNKU19OT1RGT1VORF07XG4gICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICB0aHJvdyB0ZW1wRXJyb3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IEhsc1Byb3ZpZGVyOyJdLCJzb3VyY2VSb290IjoiIn0=