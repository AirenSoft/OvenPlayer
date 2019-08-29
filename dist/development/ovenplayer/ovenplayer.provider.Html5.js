/*! OvenPlayerv0.9.741 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNS5qcyJdLCJuYW1lcyI6WyJIdG1sNSIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfSFRNTDUiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInRoYXQiLCJzdXBlckRlc3Ryb3lfZnVuYyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFFBQVEsU0FBUkEsS0FBUSxDQUFTQyxPQUFULEVBQWtCQyxZQUFsQixFQUFnQ0MsUUFBaEMsRUFBeUM7O0FBRW5ELFFBQUlDLE9BQU87QUFDUEMsY0FBT0MseUJBREE7QUFFUEwsaUJBQVVBLE9BRkg7QUFHUE0sYUFBTSxJQUhDO0FBSVBDLGtCQUFXLElBSko7QUFLUEMsa0JBQVcsS0FMSjtBQU1QQyxpQkFBVSxLQU5IO0FBT1BDLGdCQUFTLEtBUEY7QUFRUEMsaUJBQVUsS0FSSDtBQVNQQyxlQUFRQyxxQkFURDtBQVVQQyxnQkFBUyxDQVZGO0FBV1BDLG1CQUFZLENBWEw7QUFZUEMsd0JBQWlCLENBQUMsQ0FaWDtBQWFQQyx1QkFBZ0IsQ0FBQyxDQWJWO0FBY1BDLHVCQUFnQixFQWRUO0FBZVBDLGlCQUFVLEVBZkg7QUFnQlBqQixrQkFBV0E7QUFoQkosS0FBWDs7QUFtQkEsUUFBSWtCLE9BQU8sMkJBQVNqQixJQUFULEVBQWVGLFlBQWYsRUFBNkIsSUFBN0IsQ0FBWDtBQUNBLFFBQUlvQixvQkFBcUJELGNBQVcsU0FBWCxDQUF6Qjs7QUFFQUUsc0JBQWtCQyxHQUFsQixDQUFzQix3QkFBdEI7O0FBRUFILFNBQUtJLE9BQUwsR0FBZSxZQUFLO0FBQ2hCRiwwQkFBa0JDLEdBQWxCLENBQXNCLDZCQUF0Qjs7QUFFQUY7QUFDSCxLQUpEOztBQU1BLFdBQU9ELElBQVA7QUFFSCxDQWxDRCxDLENBYkE7OztxQkFpRGVyQixLIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXG4gKi9cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtQUk9WSURFUl9IVE1MNSwgU1RBVEVfSURMRX0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBodG1sNSBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cbmNvbnN0IEh0bWw1ID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XG5cbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgbmFtZSA6IFBST1ZJREVSX0hUTUw1LFxuICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcbiAgICAgICAgbXNlIDogbnVsbCxcbiAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxuICAgICAgICBpc0xvYWRlZCA6IGZhbHNlLFxuICAgICAgICBjYW5TZWVrIDogZmFsc2UsXG4gICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxuICAgICAgICBzZWVraW5nIDogZmFsc2UsXG4gICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcbiAgICAgICAgYnVmZmVyIDogMCxcbiAgICAgICAgZnJhbWVyYXRlIDogMCxcbiAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcbiAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxuICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXG4gICAgICAgIHNvdXJjZXMgOiBbXSxcbiAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxuICAgIH07XG5cbiAgICBsZXQgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgbnVsbCk7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhUTUw1IFBST1ZJREVSIExPQURFRC5cIik7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSFRNTDUgOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xuXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBIdG1sNTtcbiJdLCJzb3VyY2VSb290IjoiIn0=