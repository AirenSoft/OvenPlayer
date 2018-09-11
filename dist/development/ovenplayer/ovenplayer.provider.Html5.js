/*! OvenPlayerv0.7.5 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.Html5"],{

/***/ "./src/js/api/provider/html5/Html5.js":
/*!********************************************!*\
  !*** ./src/js/api/provider/html5/Html5.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Manager = __webpack_require__(/*! api/media/Manager */ "./src/js/api/media/Manager.js");

var _Manager2 = _interopRequireDefault(_Manager);

var _Provider = __webpack_require__(/*! api/provider/html5/Provider */ "./src/js/api/provider/html5/Provider.js");

var _Provider2 = _interopRequireDefault(_Provider);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   html5 provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

var Html5 = function Html5(container, playerConfig) {

    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_HTML5);
    var element = mediaManager.create();

    var that = (0, _Provider2["default"])(_constants.PROVIDER_HTML5, element, playerConfig);
    var super_destroy = that["super"]('destroy');

    OvenPlayerConsole.log("HTML5 PROVIDER LOADED.");

    that.destroy = function () {
        mediaManager.destroy();
        OvenPlayerConsole.log("HTML5 : PROVIDER DESTROYED.");
        super_destroy();
    };

    return that;
}; /**
    * Created by hoho on 2018. 8. 24..
    */
exports["default"] = Html5;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0h0bWw1LmpzIl0sIm5hbWVzIjpbIkh0bWw1IiwiY29udGFpbmVyIiwicGxheWVyQ29uZmlnIiwibWVkaWFNYW5hZ2VyIiwiUFJPVklERVJfSFRNTDUiLCJlbGVtZW50IiwiY3JlYXRlIiwidGhhdCIsInN1cGVyX2Rlc3Ryb3kiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFNQSxJQUFNQSxRQUFRLFNBQVJBLEtBQVEsQ0FBU0MsU0FBVCxFQUFvQkMsWUFBcEIsRUFBaUM7O0FBRTNDLFFBQUlDLGVBQWUsMEJBQWFGLFNBQWIsRUFBd0JHLHlCQUF4QixDQUFuQjtBQUNBLFFBQUlDLFVBQVVGLGFBQWFHLE1BQWIsRUFBZDs7QUFFQSxRQUFJQyxPQUFPLDJCQUFTSCx5QkFBVCxFQUF5QkMsT0FBekIsRUFBa0NILFlBQWxDLENBQVg7QUFDQSxRQUFJTSxnQkFBaUJELGNBQVcsU0FBWCxDQUFyQjs7QUFFQUUsc0JBQWtCQyxHQUFsQixDQUFzQix3QkFBdEI7O0FBRUFILFNBQUtJLE9BQUwsR0FBZSxZQUFLO0FBQ2hCUixxQkFBYVEsT0FBYjtBQUNBRiwwQkFBa0JDLEdBQWxCLENBQXNCLDZCQUF0QjtBQUNBRjtBQUNILEtBSkQ7O0FBTUEsV0FBT0QsSUFBUDtBQUVILENBbEJELEMsQ0FiQTs7O3FCQWlDZVAsSyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXHJcbiAqL1xyXG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xyXG5pbXBvcnQge1BST1ZJREVSX0hUTUw1LCBTVEFURV9FUlJPUiwgRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgaHRtbDUgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cclxuICogQHBhcmFtICAgZWxlbWVudCB2aWRlbyBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5cclxuY29uc3QgSHRtbDUgPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcblxyXG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIFBST1ZJREVSX0hUTUw1KTtcclxuICAgIGxldCBlbGVtZW50ID0gbWVkaWFNYW5hZ2VyLmNyZWF0ZSgpO1xyXG5cclxuICAgIGxldCB0aGF0ID0gUHJvdmlkZXIoUFJPVklERVJfSFRNTDUsIGVsZW1lbnQsIHBsYXllckNvbmZpZyk7XHJcbiAgICBsZXQgc3VwZXJfZGVzdHJveSAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSFRNTDUgUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhUTUw1IDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcclxuICAgICAgICBzdXBlcl9kZXN0cm95KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEh0bWw1O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9