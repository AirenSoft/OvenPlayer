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
                    if (lastPlayPosition > 0) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJQbGF5X2Z1bmMiLCJzdXBlckRlc3Ryb3lfZnVuYyIsImxvYWRSZXRyeWVyIiwiaXNNYW5pZmVzdExvYWRlZCIsImZpcnN0TG9hZGVkIiwiSGxzIiwiZGVidWciLCJtYXhCdWZmZXJMZW5ndGgiLCJtYXhNYXhCdWZmZXJMZW5ndGgiLCJmcmFnTG9hZGluZ01heFJldHJ5IiwibWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkiLCJsZXZlbExvYWRpbmdNYXhSZXRyeSIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRpbmdSZXRyeUNvdW50IiwiZ2V0Q29uZmlnIiwibG9hZFNvdXJjZSIsImZpbGUiLCJvbmNlIiwiRXZlbnRzIiwiTUFOSUZFU1RfTE9BREVEIiwiZXZlbnQiLCJkYXRhIiwiTEVWRUxfTE9BREVEIiwiY2xlYXJUaW1lb3V0IiwiY29uZmlnIiwiZGV0YWlscyIsImxpdmUiLCJzZWVrIiwiaXNBdXRvU3RhcnQiLCJwbGF5Iiwib24iLCJFUlJPUiIsIm5ldHdvcmtEZXRhaWxzIiwic3RhdHVzIiwic2V0U3RhdGUiLCJTVEFURV9MT0FESU5HIiwic2V0VGltZW91dCIsInN0b3BMb2FkIiwiZXJyb3JUeXBlIiwiUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUiIsIlBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUiIsIlBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUiIsIlBMQVlFUl9OT1RfQUNDRVBUQUJMRV9FUlJPUiIsInR5cGUiLCJFcnJvclR5cGVzIiwiTUVESUFfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJ0ZW1wRXJyb3IiLCJFUlJPUlMiLCJjb2RlcyIsImVycm9yIiwiUExBWUVSX1NUQVRFIiwicHJldnN0YXRlIiwibmV3c3RhdGUiLCJnZXRTb3VyY2VzIiwiZ2V0Q3VycmVudFNvdXJjZSIsImRlc3Ryb3kiLCJJTklUX0hMU0pTX05PVEZPVU5EIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7O0FBTUE7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFPQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsQ0FBVUMsT0FBVixFQUFtQkMsWUFBbkIsRUFBaUNDLFFBQWpDLEVBQTJDO0FBQzNELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE1BQU0sSUFBVjtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLGNBQWMsSUFBbEI7QUFDQSxRQUFJQyxtQkFBbUIsS0FBdkI7QUFDQSxRQUFJQyxjQUFjLEtBQWxCOztBQUVBLFFBQUk7QUFDQUwsY0FBTSxJQUFJTSxHQUFKLENBQVE7QUFDVkMsbUJBQU8sS0FERztBQUVWQyw2QkFBaUIsRUFGUDtBQUdWQyxnQ0FBb0IsRUFIVjtBQUlWQyxpQ0FBcUIsQ0FKWDtBQUtWQyxxQ0FBeUIsQ0FMZjtBQU1WQyxrQ0FBc0I7QUFOWixTQUFSLENBQU47O0FBU0FaLFlBQUlhLFdBQUosQ0FBZ0JqQixPQUFoQjs7QUFFQSxZQUFJa0IsT0FBTztBQUNQQyxrQkFBTUMsdUJBREM7QUFFUHBCLHFCQUFTQSxPQUZGO0FBR1BxQixpQkFBS2pCLEdBSEU7QUFJUGtCLHNC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WCxDQUFqQjtBQUNBRyw0QkFBb0JILGNBQVcsU0FBWCxDQUFwQjtBQUNBa0MsMEJBQWtCQyxHQUFsQixDQUFzQixzQkFBdEI7O0FBRUFuQyxhQUFLb0QsSUFBTCxHQUFZLFlBQU07O0FBRWQsZ0JBQUksQ0FBQy9DLGdCQUFMLEVBQXVCO0FBQ25CLG9CQUFJMkIsU0FBU2hDLEtBQUs2RSxVQUFMLEdBQWtCN0UsS0FBSzhFLGdCQUFMLEVBQWxCLEVBQTJDdkMsSUFBeEQ7QUFDQXRDLG9CQUFJcUMsVUFBSixDQUFlTixNQUFmO0FBQ0gsYUFIRCxNQUdPO0FBQ0g5QjtBQUNIO0FBRUosU0FURDs7QUFXQUYsYUFBSytFLE9BQUwsR0FBZSxZQUFNO0FBQ2pCOUUsZ0JBQUk4RSxPQUFKO0FBQ0E5RSxrQkFBTSxJQUFOO0FBQ0FpQyw4QkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QjtBQUNBaEM7QUFDSCxTQUxEO0FBTUgsS0EvSkQsQ0ErSkUsT0FBT3NFLEtBQVAsRUFBYztBQUNaLFlBQUlILFlBQVlDLGtCQUFPQyxLQUFQLENBQWFRLDhCQUFiLENBQWhCO0FBQ0FWLGtCQUFVRyxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBLGNBQU1ILFNBQU47QUFDSDs7QUFFRCxXQUFPdEUsSUFBUDtBQUNILENBL0tELEMsQ0FyQkE7OztxQkF1TWVKLFciLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDcuLlxuICovXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgUFJPVklERVJfSExTLFxuICAgIFBMQVlFUl9TVEFURSwgU1RBVEVfSURMRSwgU1RBVEVfTE9BRElORyxcbiAgICBJTklUX0RBU0hfVU5TVVBQT1JULCBFUlJPUlMsXG4gICAgSU5JVF9ITFNKU19OT1RGT1VORFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcbmltcG9ydCB7UExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUiwgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SLCBQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IsIFBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUiwgUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SfSBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgaGxzanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5cbmNvbnN0IEhsc1Byb3ZpZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpIHtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBobHMgPSBudWxsO1xuICAgIGxldCBzdXBlclBsYXlfZnVuYyA9IG51bGw7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcbiAgICBsZXQgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgIGxldCBpc01hbmlmZXN0TG9hZGVkID0gZmFsc2U7XG4gICAgbGV0IGZpcnN0TG9hZGVkID0gZmFsc2U7XG5cbiAgICB0cnkge1xuICAgICAgICBobHMgPSBuZXcgSGxzKHtcbiAgICAgICAgICAgIGRlYnVnOiBmYWxzZSxcbiAgICAgICAgICAgIG1heEJ1ZmZlckxlbmd0aDogMjAsXG4gICAgICAgICAgICBtYXhNYXhCdWZmZXJMZW5ndGg6IDMwLFxuICAgICAgICAgICAgZnJhZ0xvYWRpbmdNYXhSZXRyeTogMCxcbiAgICAgICAgICAgIG1hbmlmZXN0TG9hZGluZ01heFJldHJ5OiAwLFxuICAgICAgICAgICAgbGV2ZWxMb2FkaW5nTWF4UmV0cnk6IDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKGVsZW1lbnQpO1xuXG4gICAgICAgIGxldCBzcGVjID0ge1xuICAgICAgICAgICAgbmFtZTogUFJPVklERVJfSExTLFxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIG1zZTogaGxzLFxuICAgICAgICAgICAgbGlzdGVuZXI6IG51bGwsXG4gICAgICAgICAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgICAgICAgICBjYW5TZWVrOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBzZWVraW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXRlOiBTVEFURV9JRExFLFxuICAgICAgICAgICAgYnVmZmVyOiAwLFxuICAgICAgICAgICAgZnJhbWVyYXRlOiAwLFxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IC0xLFxuICAgICAgICAgICAgY3VycmVudFNvdXJjZTogLTEsXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzOiBbXSxcbiAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxuICAgICAgICAgICAgYWRUYWdVcmw6IGFkVGFnVXJsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24gKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbikge1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBvbkV4dGVuZGVkTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiICsgbGFzdFBsYXlQb3NpdGlvbik7XG5cbiAgICAgICAgICAgIGxldCBsb2FkaW5nUmV0cnlDb3VudCA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb2FkaW5nUmV0cnlDb3VudDtcblxuICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xuXG4gICAgICAgICAgICBobHMub25jZShIbHMuRXZlbnRzLk1BTklGRVNUX0xPQURFRCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBpc01hbmlmZXN0TG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBobHMub25jZShIbHMuRXZlbnRzLkxFVkVMX0xPQURFRCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBmaXJzdExvYWRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcbiAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGhscy5jb25maWcuZnJhZ0xvYWRpbmdNYXhSZXRyeSA9IDI7XG4gICAgICAgICAgICAgICAgaGxzLmNvbmZpZy5tYW5pZmVzdExvYWRpbmdNYXhSZXRyeSA9IDI7XG4gICAgICAgICAgICAgICAgaGxzLmNvbmZpZy5sZXZlbExvYWRpbmdNYXhSZXRyeSA9IDI7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5kZXRhaWxzLmxpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5pc0xpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0UGxheVBvc2l0aW9uID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaGxzLm9uKEhscy5FdmVudHMuRVJST1IsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gMjAyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBobHMubG9hZFNvdXJjZShzb3VyY2UuZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobG9hZGluZ1JldHJ5Q291bnQgPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nUmV0cnlDb3VudCA9IGxvYWRpbmdSZXRyeUNvdW50IC0gMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5zdG9wTG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZS5maWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3JUeXBlID0gUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5uZXR3b3JrRGV0YWlscyAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlID0gUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhICYmIGRhdGEubmV0d29ya0RldGFpbHMgJiYgZGF0YS5uZXR3b3JrRGV0YWlscy5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZSA9IFBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YSAmJiBkYXRhLm5ldHdvcmtEZXRhaWxzICYmIGRhdGEubmV0d29ya0RldGFpbHMuc3RhdHVzID09PSA0MDYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGUgPSBQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gSGxzLkVycm9yVHlwZXMuTUVESUFfRVJST1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGUgPSBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbZXJyb3JUeXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGRhdGEuZGV0YWlscztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoYXQub24oUExBWUVSX1NUQVRFLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFmaXJzdExvYWRlZCAmJiBkYXRhLnByZXZzdGF0ZSA9PT0gU1RBVEVfTE9BRElORyAmJiBkYXRhLm5ld3N0YXRlID09PSBTVEFURV9JRExFKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN1cGVyUGxheV9mdW5jID0gdGhhdC5zdXBlcigncGxheScpO1xuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIFBST1ZJREVSIExPQURFRC5cIik7XG5cbiAgICAgICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoIWlzTWFuaWZlc3RMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gdGhhdC5nZXRTb3VyY2VzKClbdGhhdC5nZXRDdXJyZW50U291cmNlKCldLmZpbGU7XG4gICAgICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VwZXJQbGF5X2Z1bmMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgICAgIGhscy5kZXN0cm95KCk7XG4gICAgICAgICAgICBobHMgPSBudWxsO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogUFJPVklERVIgREVTVFJPVVlFRC5cIik7XG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9ITFNKU19OT1RGT1VORF07XG4gICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICB0aHJvdyB0ZW1wRXJyb3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IEhsc1Byb3ZpZGVyOyJdLCJzb3VyY2VSb290IjoiIn0=