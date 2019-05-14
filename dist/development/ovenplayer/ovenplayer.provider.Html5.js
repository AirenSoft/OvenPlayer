/*! OvenPlayerv0.9.496 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNS5qcyJdLCJuYW1lcyI6WyJIdG1sNSIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfSFRNTDUiLCJtc2UiLCJsaXN0ZW5lciIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJ0aGF0Iiwic3VwZXJEZXN0cm95X2Z1bmMiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7QUFNQSxJQUFNQSxRQUFRLFNBQVJBLEtBQVEsQ0FBU0MsT0FBVCxFQUFrQkMsWUFBbEIsRUFBZ0NDLFFBQWhDLEVBQXlDOztBQUVuRCxRQUFJQyxPQUFPO0FBQ1BDLGNBQU9DLHlCQURBO0FBRVBMLGlCQUFVQSxPQUZIO0FBR1BNLGFBQU0sSUFIQztBQUlQQyxrQkFBVyxJQUpKO0FBS1BDLGlCQUFVLEtBTEg7QUFNUEMsZ0JBQVMsS0FORjtBQU9QQyxpQkFBVSxLQVBIO0FBUVBDLGVBQVFDLHFCQVJEO0FBU1BDLGdCQUFTLENBVEY7QUFVUEMsbUJBQVksQ0FWTDtBQVdQQyx3QkFBaUIsQ0FBQyxDQVhYO0FBWVBDLHVCQUFnQixDQUFDLENBWlY7QUFhUEMsdUJBQWdCLEVBYlQ7QUFjUEMsaUJBQVUsRUFkSDtBQWVQaEIsa0JBQVdBO0FBZkosS0FBWDs7QUFrQkEsUUFBSWlCLE9BQU8sMkJBQVNoQixJQUFULEVBQWVGLFlBQWYsRUFBNkIsSUFBN0IsQ0FBWDtBQUNBLFFBQUltQixvQkFBcUJELGNBQVcsU0FBWCxDQUF6Qjs7QUFFQUUsc0JBQWtCQyxHQUFsQixDQUFzQix3QkFBdEI7O0FBRUFILFNBQUtJLE9BQUwsR0FBZSxZQUFLO0FBQ2hCRiwwQkFBa0JDLEdBQWxCLENBQXNCLDZCQUF0Qjs7QUFFQUY7QUFDSCxLQUpEOztBQU1BLFdBQU9ELElBQVA7QUFFSCxDQWpDRCxDLENBYkE7OztxQkFnRGVwQixLIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXG4gKi9cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtQUk9WSURFUl9IVE1MNSwgU1RBVEVfSURMRX0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBodG1sNSBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cbmNvbnN0IEh0bWw1ID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XG5cbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgbmFtZSA6IFBST1ZJREVSX0hUTUw1LFxuICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcbiAgICAgICAgbXNlIDogbnVsbCxcbiAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxuICAgICAgICBjYW5TZWVrIDogZmFsc2UsXG4gICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxuICAgICAgICBzZWVraW5nIDogZmFsc2UsXG4gICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcbiAgICAgICAgYnVmZmVyIDogMCxcbiAgICAgICAgZnJhbWVyYXRlIDogMCxcbiAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcbiAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxuICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXG4gICAgICAgIHNvdXJjZXMgOiBbXSxcbiAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxuICAgIH07XG5cbiAgICBsZXQgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgbnVsbCk7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhUTUw1IFBST1ZJREVSIExPQURFRC5cIik7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSFRNTDUgOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xuXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBIdG1sNTtcbiJdLCJzb3VyY2VSb290IjoiIn0=