/*! OvenPlayerv0.7.62 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0h0bWw1LmpzIl0sIm5hbWVzIjpbIkh0bWw1IiwiY29udGFpbmVyIiwicGxheWVyQ29uZmlnIiwibWVkaWFNYW5hZ2VyIiwiUFJPVklERVJfSFRNTDUiLCJlbGVtZW50IiwiY3JlYXRlIiwidGhhdCIsInN1cGVyX2Rlc3Ryb3kiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFFBQVEsU0FBUkEsS0FBUSxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFpQzs7QUFFM0MsUUFBSUMsZUFBZSwwQkFBYUYsU0FBYixFQUF3QkcseUJBQXhCLENBQW5CO0FBQ0EsUUFBSUMsVUFBVUYsYUFBYUcsTUFBYixFQUFkOztBQUVBLFFBQUlDLE9BQU8sMkJBQVNILHlCQUFULEVBQXlCQyxPQUF6QixFQUFrQ0gsWUFBbEMsQ0FBWDtBQUNBLFFBQUlNLGdCQUFpQkQsY0FBVyxTQUFYLENBQXJCOztBQUVBRSxzQkFBa0JDLEdBQWxCLENBQXNCLHdCQUF0Qjs7QUFFQUgsU0FBS0ksT0FBTCxHQUFlLFlBQUs7QUFDaEJSLHFCQUFhUSxPQUFiO0FBQ0FGLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNkJBQXRCO0FBQ0FGO0FBQ0gsS0FKRDs7QUFNQSxXQUFPRCxJQUFQO0FBRUgsQ0FsQkQsQyxDQWJBOzs7cUJBaUNlUCxLIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cclxuICovXHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7UFJPVklERVJfSFRNTDUsIFNUQVRFX0VSUk9SLCBFUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBodG1sNSBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBlbGVtZW50IHZpZGVvIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcblxyXG5jb25zdCBIdG1sNSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgcGxheWVyQ29uZmlnKXtcclxuXHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgUFJPVklERVJfSFRNTDUpO1xyXG4gICAgbGV0IGVsZW1lbnQgPSBtZWRpYU1hbmFnZXIuY3JlYXRlKCk7XHJcblxyXG4gICAgbGV0IHRoYXQgPSBQcm92aWRlcihQUk9WSURFUl9IVE1MNSwgZWxlbWVudCwgcGxheWVyQ29uZmlnKTtcclxuICAgIGxldCBzdXBlcl9kZXN0cm95ICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJIVE1MNSBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIG1lZGlhTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSFRNTDUgOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG4gICAgICAgIHN1cGVyX2Rlc3Ryb3koKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSHRtbDU7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=