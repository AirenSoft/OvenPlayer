/*! OvenPlayerv0.9.851 | (c)2020 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
    var superDestroy_func = null;

    try {
        hls = new Hls({
            debug: false,
            maxBufferLength: 20,
            maxMaxBufferLength: 30,
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

            hls.once(Hls.Events.LEVEL_LOADED, function (event, data) {

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
                var tempError = _constants.ERRORS.codes[_constants2.PLAYER_UNKNWON_NEWWORK_ERROR];
                tempError.error = data.details;
                (0, _utils.errorTrigger)(tempError, that);
            });
        });

        superDestroy_func = that["super"]('destroy');
        OvenPlayerConsole.log("HLS PROVIDER LOADED.");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJIbHMiLCJkZWJ1ZyIsIm1heEJ1ZmZlckxlbmd0aCIsIm1heE1heEJ1ZmZlckxlbmd0aCIsIm1hbmlmZXN0TG9hZGluZ01heFJldHJ5IiwibGV2ZWxMb2FkaW5nTWF4UmV0cnkiLCJhdHRhY2hNZWRpYSIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfSExTIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJsb2FkU291cmNlIiwiZmlsZSIsIm9uY2UiLCJFdmVudHMiLCJMRVZFTF9MT0FERUQiLCJldmVudCIsImRhdGEiLCJjb25maWciLCJkZXRhaWxzIiwibGl2ZSIsInNlZWsiLCJpc0F1dG9TdGFydCIsInBsYXkiLCJvbiIsIkVSUk9SIiwidGVtcEVycm9yIiwiRVJST1JTIiwiY29kZXMiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiZXJyb3IiLCJkZXN0cm95IiwiSU5JVF9ITFNKU19OT1RGT1VORCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOztBQUtBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBT0EsSUFBTUEsY0FBYyxTQUFkQSxXQUFjLENBQVVDLE9BQVYsRUFBbUJDLFlBQW5CLEVBQWlDQyxR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LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gNy4uXG4gKi9cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtcbiAgICBQUk9WSURFUl9ITFMsIFNUQVRFX0lETEUsXG4gICAgSU5JVF9EQVNIX1VOU1VQUE9SVCwgRVJST1JTLFxuICAgIElOSVRfSExTSlNfTk9URk9VTkRcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5pbXBvcnQge1BMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1J9IGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBobHNqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cblxuY29uc3QgSGxzUHJvdmlkZXIgPSBmdW5jdGlvbiAoZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCkge1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGhscyA9IG51bGw7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICAgIGhscyA9IG5ldyBIbHMoe1xuICAgICAgICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgICAgICAgbWF4QnVmZmVyTGVuZ3RoOiAyMCxcbiAgICAgICAgICAgIG1heE1heEJ1ZmZlckxlbmd0aDogMzAsXG4gICAgICAgICAgICBtYW5pZmVzdExvYWRpbmdNYXhSZXRyeTogMCxcbiAgICAgICAgICAgIGxldmVsTG9hZGluZ01heFJldHJ5OiAwXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhscy5hdHRhY2hNZWRpYShlbGVtZW50KTtcblxuICAgICAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgICAgIG5hbWU6IFBST1ZJREVSX0hMUyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICBtc2U6IGhscyxcbiAgICAgICAgICAgIGxpc3RlbmVyOiBudWxsLFxuICAgICAgICAgICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY2FuU2VlazogZmFsc2UsXG4gICAgICAgICAgICBpc0xpdmU6IGZhbHNlLFxuICAgICAgICAgICAgc2Vla2luZzogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZTogU1RBVEVfSURMRSxcbiAgICAgICAgICAgIGJ1ZmZlcjogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZTogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiAtMSxcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IC0xLFxuICAgICAgICAgICAgcXVhbGl0eUxldmVsczogW10sXG4gICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgIGFkVGFnVXJsOiBhZFRhZ1VybFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uIChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pIHtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIiArIGxhc3RQbGF5UG9zaXRpb24pO1xuXG4gICAgICAgICAgICBobHMubG9hZFNvdXJjZShzb3VyY2UuZmlsZSk7XG5cbiAgICAgICAgICAgIGhscy5vbmNlKEhscy5FdmVudHMuTEVWRUxfTE9BREVELCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGhscy5jb25maWcubWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkgPSAyO1xuICAgICAgICAgICAgICAgIGhscy5jb25maWcubGV2ZWxMb2FkaW5nTWF4UmV0cnkgPSAyO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGV0YWlscy5saXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMuaXNMaXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFBsYXlQb3NpdGlvbiA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaGxzLm9uKEhscy5FdmVudHMuRVJST1IsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUl07XG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZGF0YS5kZXRhaWxzO1xuICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgICAgICBobHMuZGVzdHJveSgpO1xuICAgICAgICAgICAgaGxzID0gbnVsbDtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IFBST1ZJREVSIERFU1RST1VZRUQuXCIpO1xuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW0lOSVRfSExTSlNfTk9URk9VTkRdO1xuICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgdGhyb3cgdGVtcEVycm9yO1xuICAgIH1cblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBIbHNQcm92aWRlcjsiXSwic291cmNlUm9vdCI6IiJ9