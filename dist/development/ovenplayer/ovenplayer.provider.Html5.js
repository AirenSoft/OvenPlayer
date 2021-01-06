/*! OvenPlayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.Html5"],{

/***/ "./src/js/api/provider/html5/providers/Html5.js":
/*!******************************************************!*\
  !*** ./src/js/api/provider/html5/providers/Html5.js ***!
  \******************************************************/
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
 * @brief   html5 provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

var Html5 = function Html5(element, playerConfig, adTagUrl) {

    var spec = {
        name: _constants.PROVIDER_HTML5,
        element: element,
        mse: null,
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

    var that = (0, _Provider2["default"])(spec, playerConfig, null);
    var superDestroy_func = that["super"]('destroy');

    OvenPlayerConsole.log("HTML5 PROVIDER LOADED.");

    that.destroy = function () {
        OvenPlayerConsole.log("HTML5 : PROVIDER DESTROYED.");

        superDestroy_func();
    };

    return that;
}; /**
    * Created by hoho on 2018. 8. 24..
    */
exports["default"] = Html5;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNS5qcyJdLCJuYW1lcyI6WyJIdG1sNSIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfSFRNTDUiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInRoYXQiLCJzdXBlckRlc3Ryb3lfZnVuYyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFFBQVEsU0FBUkEsS0FBUSxDQUFTQyxPQUFULEVBQWtCQyxZQUFsQixFQUFnQ0MsUUFBaEMsRUFBeUM7O0FBRW5ELFFBQUlDLE9BQU87QUFDUEMsY0FBT0MseUJBREE7QUFFUEwsaUJBQVVBLE9BRkg7QUFHUE0sYUFBTSxJQUhDO0FBSVBDLGtCQUFXLElBSko7QUFLUEMsa0JBQVcsS0FMSjtBQU1QQyxpQkFBVSxLQU5IO0FBT1BDLGdCQUFTLEtBUEY7QUFRUEMsaUJBQVUsS0FSSDtBQVNQQyxlQUFRQyxxQkFURDtBQVVQQyxnQkFBUyxDQVZGO0FBV1BDLG1CQUFZLENBWEw7QUFZUEMsd0JBQWlCLENBQUMsQ0FaWDtBQWFQQyx1QkFBZ0IsQ0FBQyxDQWJWO0FBY1BDLHVCQUFnQixFQWRUO0FBZVBDLGlCQUFVLEVBZkg7QUFnQlBqQixrQkFBV0E7QUFoQkosS0FBWDs7QUFtQkEsUUFBSWtCLE9BQU8sMkJBQVNqQixJQUFULEVBQWVGLFlBQWYsRUFBNkIsSUFBN0IsQ0FBWDtBQUNBLFFBQUlvQixvQkFBcUJELGNBQVcsU0FBWCxDQUF6Qjs7QUFFQUUsc0JBQWtCQyxHQUFsQixDQUFzQix3QkFBdEI7O0FBRUFILFNBQUtJLE9BQUwsR0FBZSxZQUFLO0FBQ2hCRiwwQkFBa0JDLEdBQWxCLENBQXNCLDZCQUF0Qjs7QUFFQUY7QUFDSCxLQUpEOztBQU1BLFdBQU9ELElBQVA7QUFFSCxDQWxDRCxDLENBYkE7OztxQkFpRGVyQixLIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cclxuICovXHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7UFJPVklERVJfSFRNTDUsIFNUQVRFX0lETEV9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgaHRtbDUgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cclxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5cclxuY29uc3QgSHRtbDUgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcclxuXHJcbiAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICBuYW1lIDogUFJPVklERVJfSFRNTDUsXHJcbiAgICAgICAgZWxlbWVudCA6IGVsZW1lbnQsXHJcbiAgICAgICAgbXNlIDogbnVsbCxcclxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXHJcbiAgICAgICAgaXNMb2FkZWQgOiBmYWxzZSxcclxuICAgICAgICBjYW5TZWVrIDogZmFsc2UsXHJcbiAgICAgICAgaXNMaXZlIDogZmFsc2UsXHJcbiAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxyXG4gICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcclxuICAgICAgICBidWZmZXIgOiAwLFxyXG4gICAgICAgIGZyYW1lcmF0ZSA6IDAsXHJcbiAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcclxuICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXHJcbiAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxyXG4gICAgICAgIHNvdXJjZXMgOiBbXSxcclxuICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBudWxsKTtcclxuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSFRNTDUgUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJIVE1MNSA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XHJcblxyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEh0bWw1O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9