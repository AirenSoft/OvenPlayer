/*! OvenPlayerv0.7.653 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var _Manager = __webpack_require__(/*! api/media/Manager */ "./src/js/api/media/Manager.js");

var _Manager2 = _interopRequireDefault(_Manager);

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

/**
 * Created by hoho on 2018. 8. 24..
 */
var Html5 = function Html5(container, playerConfig) {

    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_HTML5);
    var element = mediaManager.create();

    var spec = {
        name: _constants.PROVIDER_HTML5,
        extendedElement: element,
        listener: null,
        canSeek: false,
        isLive: false,
        seeking: false,
        state: _constants.STATE_IDLE,
        buffer: 0,
        currentQuality: -1,
        sources: []
    };

    var that = (0, _Provider2["default"])(spec, playerConfig, null);
    var superDestroy_func = that["super"]('destroy');

    OvenPlayerConsole.log("HTML5 PROVIDER LOADED.");

    that.destroy = function () {
        mediaManager.destroy();
        mediaManager = null;
        element = null;
        OvenPlayerConsole.log("HTML5 : PROVIDER DESTROYED.");

        superDestroy_func();
    };

    return that;
};

exports["default"] = Html5;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNS5qcyJdLCJuYW1lcyI6WyJIdG1sNSIsImNvbnRhaW5lciIsInBsYXllckNvbmZpZyIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX0hUTUw1IiwiZWxlbWVudCIsImNyZWF0ZSIsInNwZWMiLCJuYW1lIiwiZXh0ZW5kZWRFbGVtZW50IiwibGlzdGVuZXIiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImN1cnJlbnRRdWFsaXR5Iiwic291cmNlcyIsInRoYXQiLCJzdXBlckRlc3Ryb3lfZnVuYyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBUkE7OztBQWNBLElBQU1BLFFBQVEsU0FBUkEsS0FBUSxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFpQzs7QUFFM0MsUUFBSUMsZUFBZSwwQkFBYUYsU0FBYixFQUF3QkcseUJBQXhCLENBQW5CO0FBQ0EsUUFBSUMsVUFBVUYsYUFBYUcsTUFBYixFQUFkOztBQUVBLFFBQUlDLE9BQU87QUFDUEMsY0FBT0oseUJBREE7QUFFUEsseUJBQWtCSixPQUZYO0FBR1BLLGtCQUFXLElBSEo7QUFJUEMsaUJBQVUsS0FKSDtBQUtQQyxnQkFBUyxLQUxGO0FBTVBDLGlCQUFVLEtBTkg7QUFPUEMsZUFBUUMscUJBUEQ7QUFRUEMsZ0JBQVMsQ0FSRjtBQVNQQyx3QkFBaUIsQ0FBQyxDQVRYO0FBVVBDLGlCQUFVO0FBVkgsS0FBWDs7QUFhQSxRQUFJQyxPQUFPLDJCQUFTWixJQUFULEVBQWVMLFlBQWYsRUFBNkIsSUFBN0IsQ0FBWDtBQUNBLFFBQUlrQixvQkFBcUJELGNBQVcsU0FBWCxDQUF6Qjs7QUFFQUUsc0JBQWtCQyxHQUFsQixDQUFzQix3QkFBdEI7O0FBRUFILFNBQUtJLE9BQUwsR0FBZSxZQUFLO0FBQ2hCcEIscUJBQWFvQixPQUFiO0FBQ0FwQix1QkFBZSxJQUFmO0FBQ0FFLGtCQUFVLElBQVY7QUFDQWdCLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNkJBQXRCOztBQUVBRjtBQUNILEtBUEQ7O0FBU0EsV0FBT0QsSUFBUDtBQUVILENBbENEOztxQkFvQ2VuQixLIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cclxuICovXHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7UFJPVklERVJfSFRNTDUsIFNUQVRFX0lETEV9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgaHRtbDUgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cclxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5cclxuY29uc3QgSHRtbDUgPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcblxyXG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIFBST1ZJREVSX0hUTUw1KTtcclxuICAgIGxldCBlbGVtZW50ID0gbWVkaWFNYW5hZ2VyLmNyZWF0ZSgpO1xyXG5cclxuICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgIG5hbWUgOiBQUk9WSURFUl9IVE1MNSxcclxuICAgICAgICBleHRlbmRlZEVsZW1lbnQgOiBlbGVtZW50LFxyXG4gICAgICAgIGxpc3RlbmVyIDogbnVsbCxcclxuICAgICAgICBjYW5TZWVrIDogZmFsc2UsXHJcbiAgICAgICAgaXNMaXZlIDogZmFsc2UsXHJcbiAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxyXG4gICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcclxuICAgICAgICBidWZmZXIgOiAwLFxyXG4gICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXHJcbiAgICAgICAgc291cmNlcyA6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBudWxsKTtcclxuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSFRNTDUgUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIG1lZGlhTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgZWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSFRNTDUgOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG5cclxuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIdG1sNTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==