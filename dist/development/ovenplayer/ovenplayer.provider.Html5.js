/*! OvenPlayerv0.7.2 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.Html5"],{

/***/ "./src/js/api/provider/html5/Html5.js":
/*!********************************************!*\
  !*** ./src/js/api/provider/html5/Html5.js ***!
  \********************************************/
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

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   html5 provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

var Html5 = function Html5(container, playerConfig) {

    var mediaManager = (0, _Manager2.default)(container, _constants.PROVIDER_HTML5);
    var element = mediaManager.create();

    var that = (0, _Provider2.default)(_constants.PROVIDER_HTML5, element, playerConfig);
    var super_destroy = that.super('destroy');

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
exports.default = Html5;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0h0bWw1LmpzIl0sIm5hbWVzIjpbIkh0bWw1IiwiY29udGFpbmVyIiwicGxheWVyQ29uZmlnIiwibWVkaWFNYW5hZ2VyIiwiUFJPVklERVJfSFRNTDUiLCJlbGVtZW50IiwiY3JlYXRlIiwidGhhdCIsInN1cGVyX2Rlc3Ryb3kiLCJzdXBlciIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBTUEsSUFBTUEsUUFBUSxTQUFSQSxLQUFRLENBQVNDLFNBQVQsRUFBb0JDLFlBQXBCLEVBQWlDOztBQUUzQyxRQUFJQyxlQUFlLHVCQUFhRixTQUFiLEVBQXdCRyx5QkFBeEIsQ0FBbkI7QUFDQSxRQUFJQyxVQUFVRixhQUFhRyxNQUFiLEVBQWQ7O0FBRUEsUUFBSUMsT0FBTyx3QkFBU0gseUJBQVQsRUFBeUJDLE9BQXpCLEVBQWtDSCxZQUFsQyxDQUFYO0FBQ0EsUUFBSU0sZ0JBQWlCRCxLQUFLRSxLQUFMLENBQVcsU0FBWCxDQUFyQjs7QUFFQUMsc0JBQWtCQyxHQUFsQixDQUFzQix3QkFBdEI7O0FBRUFKLFNBQUtLLE9BQUwsR0FBZSxZQUFLO0FBQ2hCVCxxQkFBYVMsT0FBYjtBQUNBRiwwQkFBa0JDLEdBQWxCLENBQXNCLDZCQUF0QjtBQUNBSDtBQUNILEtBSkQ7O0FBTUEsV0FBT0QsSUFBUDtBQUVILENBbEJELEMsQ0FiQTs7O2tCQWlDZVAsSyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxuICovXG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcbmltcG9ydCB7UFJPVklERVJfSFRNTDUsIFNUQVRFX0VSUk9SLCBFUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBodG1sNSBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgZWxlbWVudCB2aWRlbyBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cbmNvbnN0IEh0bWw1ID0gZnVuY3Rpb24oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpe1xuXG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIFBST1ZJREVSX0hUTUw1KTtcbiAgICBsZXQgZWxlbWVudCA9IG1lZGlhTWFuYWdlci5jcmVhdGUoKTtcblxuICAgIGxldCB0aGF0ID0gUHJvdmlkZXIoUFJPVklERVJfSFRNTDUsIGVsZW1lbnQsIHBsYXllckNvbmZpZyk7XG4gICAgbGV0IHN1cGVyX2Rlc3Ryb3kgID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSFRNTDUgUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJIVE1MNSA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XG4gICAgICAgIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEh0bWw1O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==