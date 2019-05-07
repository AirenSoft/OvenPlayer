/*! OvenPlayerv0.9.44 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var Html5 = function Html5(element, playerConfig, adTag) {

    var spec = {
        name: _constants.PROVIDER_HTML5,
        extendedElement: element,
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
        adTagUrl: adTag
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNS5qcyJdLCJuYW1lcyI6WyJIdG1sNSIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJhZFRhZyIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfSFRNTDUiLCJleHRlbmRlZEVsZW1lbnQiLCJsaXN0ZW5lciIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJhZFRhZ1VybCIsInRoYXQiLCJzdXBlckRlc3Ryb3lfZnVuYyIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFFBQVEsU0FBUkEsS0FBUSxDQUFTQyxPQUFULEVBQWtCQyxZQUFsQixFQUFnQ0MsS0FBaEMsRUFBc0M7O0FBRWhELFFBQUlDLE9BQU87QUFDUEMsY0FBT0MseUJBREE7QUFFUEMseUJBQWtCTixPQUZYO0FBR1BPLGtCQUFXLElBSEo7QUFJUEMsaUJBQVUsS0FKSDtBQUtQQyxnQkFBUyxLQUxGO0FBTVBDLGlCQUFVLEtBTkg7QUFPUEMsZUFBUUMscUJBUEQ7QUFRUEMsZ0JBQVMsQ0FSRjtBQVNQQyxtQkFBWSxDQVRMO0FBVVBDLHdCQUFpQixDQUFDLENBVlg7QUFXUEMsdUJBQWdCLENBQUMsQ0FYVjtBQVlQQyx1QkFBZ0IsRUFaVDtBQWFQQyxpQkFBVSxFQWJIO0FBY1BDLGtCQUFXakI7QUFkSixLQUFYOztBQWlCQSxRQUFJa0IsT0FBTywyQkFBU2pCLElBQVQsRUFBZUYsWUFBZixFQUE2QixJQUE3QixDQUFYO0FBQ0EsUUFBSW9CLG9CQUFxQkQsY0FBVyxTQUFYLENBQXpCOztBQUVBRSxzQkFBa0JDLEdBQWxCLENBQXNCLHdCQUF0Qjs7QUFFQUgsU0FBS0ksT0FBTCxHQUFlLFlBQUs7QUFDaEJGLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNkJBQXRCOztBQUVBRjtBQUNILEtBSkQ7O0FBTUEsV0FBT0QsSUFBUDtBQUVILENBaENELEMsQ0FiQTs7O3FCQStDZXJCLEsiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cbiAqL1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1BST1ZJREVSX0hUTUw1LCBTVEFURV9JRExFfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIGh0bWw1IHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxuICogKi9cblxuY29uc3QgSHRtbDUgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnKXtcblxuICAgIGxldCBzcGVjID0ge1xuICAgICAgICBuYW1lIDogUFJPVklERVJfSFRNTDUsXG4gICAgICAgIGV4dGVuZGVkRWxlbWVudCA6IGVsZW1lbnQsXG4gICAgICAgIGxpc3RlbmVyIDogbnVsbCxcbiAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxuICAgICAgICBpc0xpdmUgOiBmYWxzZSxcbiAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxuICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXG4gICAgICAgIGJ1ZmZlciA6IDAsXG4gICAgICAgIGZyYW1lcmF0ZSA6IDAsXG4gICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXG4gICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcbiAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxuICAgICAgICBzb3VyY2VzIDogW10sXG4gICAgICAgIGFkVGFnVXJsIDogYWRUYWdcbiAgICB9O1xuXG4gICAgbGV0IHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIG51bGwpO1xuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyAgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJIVE1MNSBQUk9WSURFUiBMT0FERUQuXCIpO1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhUTUw1IDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcblxuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgSHRtbDU7XG4iXSwic291cmNlUm9vdCI6IiJ9