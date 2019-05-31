/*! OvenPlayerv0.9.595 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   hlsjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

var Hls = function Hls(element, playerConfig, adTagUrl) {
    var that = {};
    var hls = null;
    var superDestroy_func = null;

    try {
        hls = new Hls({ debug: false });
        hls.attachMedia(element);

        var spec = {
            name: _constants.PROVIDER_HLS,
            element: element,
            mse: hls,
            listener: null,
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

            if (lastPlayPosition > 0) {
                element.seek(lastPlayPosition);
                that.play();
            }
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
        throw new Error(error);
    }

    return that;
}; /**
    * Created by hoho on 2018. 6. 7..
    */
exports["default"] = Hls;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzIiwiZWxlbWVudCIsInBsYXllckNvbmZpZyIsImFkVGFnVXJsIiwidGhhdCIsImhscyIsInN1cGVyRGVzdHJveV9mdW5jIiwiZGVidWciLCJhdHRhY2hNZWRpYSIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfSExTIiwibXNlIiwibGlzdGVuZXIiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImZyYW1lcmF0ZSIsImN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFNvdXJjZSIsInF1YWxpdHlMZXZlbHMiLCJzb3VyY2VzIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwibG9hZFNvdXJjZSIsImZpbGUiLCJzZWVrIiwicGxheSIsImRlc3Ryb3kiLCJlcnJvciIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBT0EsSUFBTUEsTUFBTSxTQUFOQSxHQUFNLENBQVNDLE9BQVQsRUFBa0JDLFlBQWxCLEVBQWdDQyxRQUFoQyxFQUF5QztBQUNqRCxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxNQUFNLElBQVY7QUFDQSxRQUFJQyxvQkFBb0IsSUFBeEI7O0FBRUEsUUFBSTtBQUNBRCxjQUFNLElBQUlMLEdBQUosQ0FBUSxFQUFDTyxPQUFPLEtBQVIsRUFBUixDQUFOO0FBQ0FGLFlBQUlHLFdBQUosQ0FBZ0JQLE9BQWhCOztBQUVBLFlBQUlRLE9BQU87QUFDUEMsa0JBQU9DLHVCQURBO0FBRVBWLHFCQUFVQSxPQUZIO0FBR1BXLGlCQUFNUCxHQUhDO0FBSVBRLHNCQUFXLElBSko7QUFLUEMscUJBQVUsS0FMSDtBQU1QQyxvQkFBUyxLQU5GO0FBT1BDLHFCQUFVLEtBUEg7QUFRUEMsbUJBQVFDLHFCQVJEO0FBU1BDLG9CQUFTLENBVEY7QUFVUEMsdUJBQVksQ0FWTDtBQVdQQyw0QkFBaUIsQ0FBQyxDQVhYO0FBWVBDLDJCQUFnQixDQUFDLENBWlY7QUFhUEMsMkJBQWdCLEVBYlQ7QUFjUEMscUJBQVUsRUFkSDtBQWVQckIsc0JBQVdBO0FBZkosU0FBWDtBQWlCQUMsZUFBTywyQkFBU0ssSUFBVCxFQUFlUCxZQUFmLEVBQTZCLFVBQVN1QixNQUFULEVBQWlCQyxnQkFBakIsRUFBa0M7QUFDbEVDLDhCQUFrQkMsR0FBbEIsQ0FBc0IseUJBQXRCLEVBQWlESCxNQUFqRCxFQUF5RCx3QkFBdUJDLGdCQUFoRjtBQUNBckIsZ0JBQUl3QixVQUFKLENBQWVKLE9BQU9LLElBQXRCOztBQUVBLGdCQUFHSixtQkFBbUIsQ0FBdEIsRUFBd0I7QUFDcEJ6Qix3QkFBUThCLElBQVIsQ0FBYUwsZ0JBQWI7QUFDQXRCLHFCQUFLNEIsSUFBTDtBQUNIO0FBQ0osU0FSTSxDQUFQO0FBU0ExQiw0QkFBb0JGLGNBQVcsU0FBWCxDQUFwQjtBQUNBdUIsMEJBQWtCQyxHQUFsQixDQUFzQixzQkFBdEI7O0FBRUF4QixhQUFLNkIsT0FBTCxHQUFlLFlBQUs7QUFDaEI1QixnQkFBSTRCLE9BQUo7QUFDQTVCLGtCQUFNLElBQU47QUFDQXNCLDhCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCOztBQUVBdEI7QUFDSCxTQU5EO0FBT0gsS0F4Q0QsQ0F3Q0MsT0FBTTRCLEtBQU4sRUFBWTtBQUNULGNBQU0sSUFBSUMsS0FBSixDQUFVRCxLQUFWLENBQU47QUFDSDs7QUFFRCxXQUFPOUIsSUFBUDtBQUNILENBbERELEMsQ0FkQTs7O3FCQW1FZUosRyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gNy4uXG4gKi9cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtQUk9WSURFUl9ITFMsIFNUQVRFX0lETEV9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgaGxzanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5cbmNvbnN0IEhscyA9IGZ1bmN0aW9uKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpe1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGhscyA9IG51bGw7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICAgIGhscyA9IG5ldyBIbHMoe2RlYnVnOiBmYWxzZX0pO1xuICAgICAgICBobHMuYXR0YWNoTWVkaWEoZWxlbWVudCk7XG5cbiAgICAgICAgbGV0IHNwZWMgPSB7XG4gICAgICAgICAgICBuYW1lIDogUFJPVklERVJfSExTLFxuICAgICAgICAgICAgZWxlbWVudCA6IGVsZW1lbnQsXG4gICAgICAgICAgICBtc2UgOiBobHMsXG4gICAgICAgICAgICBsaXN0ZW5lciA6IG51bGwsXG4gICAgICAgICAgICBjYW5TZWVrIDogZmFsc2UsXG4gICAgICAgICAgICBpc0xpdmUgOiBmYWxzZSxcbiAgICAgICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcbiAgICAgICAgICAgIGJ1ZmZlciA6IDAsXG4gICAgICAgICAgICBmcmFtZXJhdGUgOiAwLFxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcbiAgICAgICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcbiAgICAgICAgICAgIHNvdXJjZXMgOiBbXSxcbiAgICAgICAgICAgIGFkVGFnVXJsIDogYWRUYWdVcmxcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24oc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IG9uRXh0ZW5kZWRMb2FkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xuXG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyBQUk9WSURFUiBMT0FERUQuXCIpO1xuXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICAgICAgaGxzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGhscyA9IG51bGw7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBQUk9WSURFUiBERVNUUk9VWUVELlwiKTtcblxuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICAgICAgfTtcbiAgICB9Y2F0Y2goZXJyb3Ipe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBIbHM7Il0sInNvdXJjZVJvb3QiOiIifQ==