/*! OvenPlayerv0.9.1 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_HLS, playerConfig.isLoop());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzIiwiY29udGFpbmVyIiwicGxheWVyQ29uZmlnIiwidGhhdCIsImhscyIsInN1cGVyRGVzdHJveV9mdW5jIiwibWVkaWFNYW5hZ2VyIiwiUFJPVklERVJfSExTIiwiaXNMb29wIiwiZWxlbWVudCIsImNyZWF0ZSIsImRlYnVnIiwiYXR0YWNoTWVkaWEiLCJzcGVjIiwibmFtZSIsImV4dGVuZGVkRWxlbWVudCIsImxpc3RlbmVyIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRTb3VyY2UiLCJmaWxlIiwic2VlayIsInBsYXkiLCJkZXN0cm95IiwiZXJyb3IiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBUkE7OztBQWVBLElBQU1BLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFpQztBQUN6QyxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxNQUFNLElBQVY7QUFDQSxRQUFJQyxvQkFBb0IsSUFBeEI7O0FBRUEsUUFBSUMsZUFBZSwwQkFBYUwsU0FBYixFQUF3Qk0sdUJBQXhCLEVBQXNDTCxhQUFhTSxNQUFiLEVBQXRDLENBQW5CO0FBQ0EsUUFBSUMsVUFBVUgsYUFBYUksTUFBYixFQUFkOztBQUVBLFFBQUk7QUFDQU4sY0FBTSxJQUFJSixHQUFKLENBQVEsRUFBQ1csT0FBTyxLQUFSLEVBQVIsQ0FBTjtBQUNBUCxZQUFJUSxXQUFKLENBQWdCSCxPQUFoQjs7QUFFQSxZQUFJSSxPQUFPO0FBQ1BDLGtCQUFPUCx1QkFEQTtBQUVQUSw2QkFBa0JYLEdBRlg7QUFHUFksc0JBQVcsSUFISjtBQUlQQyxxQkFBVSxLQUpIO0FBS1BDLG9CQUFTLEtBTEY7QUFNUEMscUJBQVUsS0FOSDtBQU9QQyxtQkFBUUMscUJBUEQ7QUFRUEMsb0JBQVMsQ0FSRjtBQVNQQyx1QkFBWSxDQVRMO0FBVVBDLDRCQUFpQixDQUFDLENBVlg7QUFXUEMsMkJBQWdCLENBQUMsQ0FYVjtBQVlQQywyQkFBZ0IsRUFaVDtBQWFQQyxxQkFBVTtBQWJILFNBQVg7QUFlQXhCLGVBQU8sMkJBQVNVLElBQVQsRUFBZVgsWUFBZixFQUE2QixVQUFTMEIsTUFBVCxFQUFpQkMsZ0JBQWpCLEVBQWtDO0FBQ2xFQyw4QkFBa0JDLEdBQWxCLENBQXNCLHlCQUF0QixFQUFpREgsTUFBakQsRUFBeUQsd0JBQXVCQyxnQkFBaEY7QUFDQXpCLGdCQUFJNEIsVUFBSixDQUFlSixPQUFPSyxJQUF0Qjs7QUFFQSxnQkFBR0osbUJBQW1CLENBQXRCLEVBQXdCO0FBQ3BCcEIsd0JBQVF5QixJQUFSLENBQWFMLGdCQUFiO0FBQ0ExQixxQkFBS2dDLElBQUw7QUFDSDtBQUNKLFNBUk0sQ0FBUDtBQVNBOUIsNEJBQW9CRixjQUFXLFNBQVgsQ0FBcEI7QUFDQTJCLDBCQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXRCOztBQUVBNUIsYUFBS2lDLE9BQUwsR0FBZSxZQUFLO0FBQ2hCaEMsZ0JBQUlnQyxPQUFKO0FBQ0FoQyxrQkFBTSxJQUFOO0FBQ0FFLHlCQUFhOEIsT0FBYjtBQUNBOUIsMkJBQWUsSUFBZjtBQUNBRyxzQkFBVSxJQUFWO0FBQ0FxQiw4QkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0Qjs7QUFFQTFCO0FBQ0gsU0FURDtBQVVILEtBekNELENBeUNDLE9BQU1nQyxLQUFOLEVBQVk7QUFDVCxjQUFNLElBQUlDLEtBQUosQ0FBVUQsS0FBVixDQUFOO0FBQ0g7O0FBRUQsV0FBT2xDLElBQVA7QUFDSCxDQXRERDs7cUJBeURlSCxHIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDcuLlxyXG4gKi9cclxuaW1wb3J0IE1lZGlhTWFuYWdlciBmcm9tIFwiYXBpL21lZGlhL01hbmFnZXJcIjtcclxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcclxuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuaW1wb3J0IHtQUk9WSURFUl9ITFMsIFNUQVRFX0lETEV9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgaGxzanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cclxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IEhscyA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgcGxheWVyQ29uZmlnKXtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgaGxzID0gbnVsbDtcclxuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyA9IG51bGw7XHJcblxyXG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIFBST1ZJREVSX0hMUywgcGxheWVyQ29uZmlnLmlzTG9vcCgpKTtcclxuICAgIGxldCBlbGVtZW50ID0gbWVkaWFNYW5hZ2VyLmNyZWF0ZSgpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgaGxzID0gbmV3IEhscyh7ZGVidWc6IGZhbHNlfSk7XHJcbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICAgICAgbmFtZSA6IFBST1ZJREVSX0hMUyxcclxuICAgICAgICAgICAgZXh0ZW5kZWRFbGVtZW50IDogaGxzLFxyXG4gICAgICAgICAgICBsaXN0ZW5lciA6IG51bGwsXHJcbiAgICAgICAgICAgIGNhblNlZWsgOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNMaXZlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxyXG4gICAgICAgICAgICBidWZmZXIgOiAwLFxyXG4gICAgICAgICAgICBmcmFtZXJhdGUgOiAwLFxyXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxyXG4gICAgICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXHJcbiAgICAgICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcclxuICAgICAgICAgICAgc291cmNlcyA6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBmdW5jdGlvbihzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBvbkV4dGVuZGVkTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xyXG5cclxuICAgICAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgICAgIGhscy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGhscyA9IG51bGw7XHJcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBQUk9WSURFUiBERVNUUk9VWUVELlwiKTtcclxuXHJcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1jYXRjaChlcnJvcil7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBIbHM7Il0sInNvdXJjZVJvb3QiOiIifQ==