/*! OvenPlayerv0.7.9 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var _Manager = __webpack_require__(/*! api/media/Manager */ "./src/js/api/media/Manager.js");

var _Manager2 = _interopRequireDefault(_Manager);

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

/**
 * Created by hoho on 2018. 6. 7..
 */
var Hls = function Hls(container, playerConfig) {
    var that = {};
    var hls = null;
    var superDestroy_func = null;

    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_HLS);
    var element = mediaManager.create();

    try {
        hls = new Hls({ debug: false });
        hls.attachMedia(element);

        var spec = {
            name: _constants.PROVIDER_HLS,
            extendedElement: hls,
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
            sources: []
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
            mediaManager.destroy();
            mediaManager = null;
            element = null;
            OvenPlayerConsole.log("HLS : PROVIDER DESTROUYED.");

            superDestroy_func();
        };
    } catch (error) {
        throw new Error(error);
    }

    return that;
};

exports["default"] = Hls;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzIiwiY29udGFpbmVyIiwicGxheWVyQ29uZmlnIiwidGhhdCIsImhscyIsInN1cGVyRGVzdHJveV9mdW5jIiwibWVkaWFNYW5hZ2VyIiwiUFJPVklERVJfSExTIiwiZWxlbWVudCIsImNyZWF0ZSIsImRlYnVnIiwiYXR0YWNoTWVkaWEiLCJzcGVjIiwibmFtZSIsImV4dGVuZGVkRWxlbWVudCIsImxpc3RlbmVyIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRTb3VyY2UiLCJmaWxlIiwic2VlayIsInBsYXkiLCJkZXN0cm95IiwiZXJyb3IiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBUkE7OztBQWVBLElBQU1BLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFpQztBQUN6QyxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxNQUFNLElBQVY7QUFDQSxRQUFJQyxvQkFBb0IsSUFBeEI7O0FBRUEsUUFBSUMsZUFBZSwwQkFBYUwsU0FBYixFQUF3Qk0sdUJBQXhCLENBQW5CO0FBQ0EsUUFBSUMsVUFBVUYsYUFBYUcsTUFBYixFQUFkOztBQUVBLFFBQUk7QUFDQUwsY0FBTSxJQUFJSixHQUFKLENBQVEsRUFBQ1UsT0FBTyxLQUFSLEVBQVIsQ0FBTjtBQUNBTixZQUFJTyxXQUFKLENBQWdCSCxPQUFoQjs7QUFFQSxZQUFJSSxPQUFPO0FBQ1BDLGtCQUFPTix1QkFEQTtBQUVQTyw2QkFBa0JWLEdBRlg7QUFHUFcsc0JBQVcsSUFISjtBQUlQQyxxQkFBVSxLQUpIO0FBS1BDLG9CQUFTLEtBTEY7QUFNUEMscUJBQVUsS0FOSDtBQU9QQyxtQkFBUUMscUJBUEQ7QUFRUEMsb0JBQVMsQ0FSRjtBQVNQQyx1QkFBWSxDQVRMO0FBVVBDLDRCQUFpQixDQUFDLENBVlg7QUFXUEMsMkJBQWdCLENBQUMsQ0FYVjtBQVlQQywyQkFBZ0IsRUFaVDtBQWFQQyxxQkFBVTtBQWJILFNBQVg7QUFlQXZCLGVBQU8sMkJBQVNTLElBQVQsRUFBZVYsWUFBZixFQUE2QixVQUFTeUIsTUFBVCxFQUFpQkMsZ0JBQWpCLEVBQWtDO0FBQ2xFQyw4QkFBa0JDLEdBQWxCLENBQXNCLHlCQUF0QixFQUFpREgsTUFBakQsRUFBeUQsd0JBQXVCQyxnQkFBaEY7QUFDQXhCLGdCQUFJMkIsVUFBSixDQUFlSixPQUFPSyxJQUF0Qjs7QUFFQSxnQkFBR0osbUJBQW1CLENBQXRCLEVBQXdCO0FBQ3BCcEIsd0JBQVF5QixJQUFSLENBQWFMLGdCQUFiO0FBQ0F6QixxQkFBSytCLElBQUw7QUFDSDtBQUNKLFNBUk0sQ0FBUDtBQVNBN0IsNEJBQW9CRixjQUFXLFNBQVgsQ0FBcEI7QUFDQTBCLDBCQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXRCOztBQUVBM0IsYUFBS2dDLE9BQUwsR0FBZSxZQUFLO0FBQ2hCL0IsZ0JBQUkrQixPQUFKO0FBQ0EvQixrQkFBTSxJQUFOO0FBQ0FFLHlCQUFhNkIsT0FBYjtBQUNBN0IsMkJBQWUsSUFBZjtBQUNBRSxzQkFBVSxJQUFWO0FBQ0FxQiw4QkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0Qjs7QUFFQXpCO0FBQ0gsU0FURDtBQVVILEtBekNELENBeUNDLE9BQU0rQixLQUFOLEVBQVk7QUFDVCxjQUFNLElBQUlDLEtBQUosQ0FBVUQsS0FBVixDQUFOO0FBQ0g7O0FBRUQsV0FBT2pDLElBQVA7QUFDSCxDQXRERDs7cUJBeURlSCxHIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDcuLlxyXG4gKi9cclxuaW1wb3J0IE1lZGlhTWFuYWdlciBmcm9tIFwiYXBpL21lZGlhL01hbmFnZXJcIjtcclxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcclxuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuaW1wb3J0IHtQUk9WSURFUl9ITFMsIFNUQVRFX0lETEV9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgaGxzanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cclxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IEhscyA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgcGxheWVyQ29uZmlnKXtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgaGxzID0gbnVsbDtcclxuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyA9IG51bGw7XHJcblxyXG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIFBST1ZJREVSX0hMUyk7XHJcbiAgICBsZXQgZWxlbWVudCA9IG1lZGlhTWFuYWdlci5jcmVhdGUoKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGhscyA9IG5ldyBIbHMoe2RlYnVnOiBmYWxzZX0pO1xyXG4gICAgICAgIGhscy5hdHRhY2hNZWRpYShlbGVtZW50KTtcclxuXHJcbiAgICAgICAgbGV0IHNwZWMgPSB7XHJcbiAgICAgICAgICAgIG5hbWUgOiBQUk9WSURFUl9ITFMsXHJcbiAgICAgICAgICAgIGV4dGVuZGVkRWxlbWVudCA6IGhscyxcclxuICAgICAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxyXG4gICAgICAgICAgICBjYW5TZWVrIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWVraW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcclxuICAgICAgICAgICAgYnVmZmVyIDogMCxcclxuICAgICAgICAgICAgZnJhbWVyYXRlIDogMCxcclxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcclxuICAgICAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxyXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXHJcbiAgICAgICAgICAgIHNvdXJjZXMgOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24oc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZS5maWxlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIFBST1ZJREVSIExPQURFRC5cIik7XHJcblxyXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgICAgICBobHMuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBobHMgPSBudWxsO1xyXG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogUFJPVklERVIgREVTVFJPVVlFRC5cIik7XHJcblxyXG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xyXG4gICAgICAgIH07XHJcbiAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGxzOyJdLCJzb3VyY2VSb290IjoiIn0=