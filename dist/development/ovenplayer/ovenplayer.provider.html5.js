/*! OvenPlayerv0.6.2 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.html5"],{

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

var _Core = __webpack_require__(/*! api/provider/Core */ "./src/js/api/provider/Core.js");

var _Core2 = _interopRequireDefault(_Core);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   html5 provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

var Html5 = function Html5(element, playerConfig) {

    var that = (0, _Core2.default)(_constants.PROVIDER_HTML5, element, playerConfig);

    var super_destroy = that.super('destroy');
    OvenPlayerConsole.log("HTML5 PROVIDER LOADED.");

    that.destroy = function () {
        super_destroy();

        OvenPlayerConsole.log("HTML5 : PROVIDER DESTROYED.");
    };

    return that;
};

exports.default = Html5;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0h0bWw1LmpzIl0sIm5hbWVzIjpbIkh0bWw1IiwiZWxlbWVudCIsInBsYXllckNvbmZpZyIsInRoYXQiLCJQUk9WSURFUl9IVE1MNSIsInN1cGVyX2Rlc3Ryb3kiLCJzdXBlciIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFFBQVEsU0FBUkEsS0FBUSxDQUFTQyxPQUFULEVBQWtCQyxZQUFsQixFQUErQjs7QUFFekMsUUFBSUMsT0FBTyxvQkFBYUMseUJBQWIsRUFBNkJILE9BQTdCLEVBQXNDQyxZQUF0QyxDQUFYOztBQUVBLFFBQUlHLGdCQUFpQkYsS0FBS0csS0FBTCxDQUFXLFNBQVgsQ0FBckI7QUFDQUMsc0JBQWtCQyxHQUFsQixDQUFzQix3QkFBdEI7O0FBRUFMLFNBQUtNLE9BQUwsR0FBZSxZQUFLO0FBQ2hCSjs7QUFFQUUsMEJBQWtCQyxHQUFsQixDQUFzQiw2QkFBdEI7QUFDSCxLQUpEOztBQU1BLFdBQU9MLElBQVA7QUFFSCxDQWZEOztrQkFpQmVILEsiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5odG1sNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb3JlUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9Db3JlXCI7XG5cbmltcG9ydCB7UFJPVklERVJfSFRNTDUsIFNUQVRFX0VSUk9SLCBFUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBodG1sNSBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgZWxlbWVudCB2aWRlbyBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cbmNvbnN0IEh0bWw1ID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnKXtcblxuICAgIGxldCB0aGF0ID0gQ29yZVByb3ZpZGVyKFBST1ZJREVSX0hUTUw1LCBlbGVtZW50LCBwbGF5ZXJDb25maWcpO1xuXG4gICAgbGV0IHN1cGVyX2Rlc3Ryb3kgID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhUTUw1IFBST1ZJREVSIExPQURFRC5cIik7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgc3VwZXJfZGVzdHJveSgpO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhUTUw1IDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEh0bWw1OyJdLCJzb3VyY2VSb290IjoiIn0=