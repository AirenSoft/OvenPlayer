/*! OvenPlayerv0.7.5 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.HlsProvider"],{

/***/ "./src/js/api/provider/html5/Hls.js":
/*!******************************************!*\
  !*** ./src/js/api/provider/html5/Hls.js ***!
  \******************************************/
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
 * @brief   hlsjs provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

var Hls = function Hls(container, playerConfig) {

    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_HLS);
    var element = mediaManager.create();

    var hls = "";
    var that = {};
    var super_play = "",
        super_destroy = "";

    try {
        hls = new Hls({ debug: false });
        hls.attachMedia(element);

        var onBeforeLoad = function onBeforeLoad(source, lastPlayPosition) {
            OvenPlayerConsole.log("HLS : onBeforeLoad : ", source, "lastPlayPosition : " + lastPlayPosition);
            hls.loadSource(source.file);
            if (lastPlayPosition > 0) {
                element.seek(lastPlayPosition);
                super_play();
            }
        };

        that = (0, _Provider2["default"])(_constants.PROVIDER_HLS, hls, playerConfig, onBeforeLoad);
        OvenPlayerConsole.log("HLS PROVIDER LOADED.");
        super_play = that["super"]('play');
        super_destroy = that["super"]('destroy');

        that.destroy = function () {
            hls.destroy();
            hls = null;
            mediaManager.destroy();
            OvenPlayerConsole.log("HLS : PROVIDER DESTROUYED.");

            super_destroy();
        };
    } catch (error) {
        throw new Error(error);
    }

    return that;
}; /**
    * Created by hoho on 2018. 6. 7..
    */
exports["default"] = Hls;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0hscy5qcyJdLCJuYW1lcyI6WyJIbHMiLCJjb250YWluZXIiLCJwbGF5ZXJDb25maWciLCJtZWRpYU1hbmFnZXIiLCJQUk9WSURFUl9ITFMiLCJlbGVtZW50IiwiY3JlYXRlIiwiaGxzIiwidGhhdCIsInN1cGVyX3BsYXkiLCJzdXBlcl9kZXN0cm95IiwiZGVidWciLCJhdHRhY2hNZWRpYSIsIm9uQmVmb3JlTG9hZCIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRTb3VyY2UiLCJmaWxlIiwic2VlayIsImRlc3Ryb3kiLCJlcnJvciIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBT0EsSUFBTUEsTUFBTSxTQUFOQSxHQUFNLENBQVNDLFNBQVQsRUFBb0JDLFlBQXBCLEVBQWlDOztBQUV6QyxRQUFJQyxlQUFlLDBCQUFhRixTQUFiLEVBQXdCRyx1QkFBeEIsQ0FBbkI7QUFDQSxRQUFJQyxVQUFVRixhQUFhRyxNQUFiLEVBQWQ7O0FBRUEsUUFBSUMsTUFBTSxFQUFWO0FBQ0EsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsYUFBYSxFQUFqQjtBQUFBLFFBQXFCQyxnQkFBZ0IsRUFBckM7O0FBRUEsUUFBSTtBQUNBSCxjQUFNLElBQUlQLEdBQUosQ0FBUSxFQUFDVyxPQUFPLEtBQVIsRUFBUixDQUFOO0FBQ0FKLFlBQUlLLFdBQUosQ0FBZ0JQLE9BQWhCOztBQUVBLFlBQU1RLGVBQWUsU0FBZkEsWUFBZSxDQUFDQyxNQUFELEVBQVNDLGdCQUFULEVBQThCO0FBQy9DQyw4QkFBa0JDLEdBQWxCLENBQXNCLHVCQUF0QixFQUErQ0gsTUFBL0MsRUFBdUQsd0JBQXVCQyxnQkFBOUU7QUFDQVIsZ0JBQUlXLFVBQUosQ0FBZUosT0FBT0ssSUFBdEI7QUFDQSxnQkFBR0osbUJBQW1CLENBQXRCLEVBQXdCO0FBQ3BCVix3QkFBUWUsSUFBUixDQUFhTCxnQkFBYjtBQUNBTjtBQUNIO0FBRUosU0FSRDs7QUFVQUQsZUFBTywyQkFBU0osdUJBQVQsRUFBdUJHLEdBQXZCLEVBQTRCTCxZQUE1QixFQUEwQ1csWUFBMUMsQ0FBUDtBQUNBRywwQkFBa0JDLEdBQWxCLENBQXNCLHNCQUF0QjtBQUNBUixxQkFBYUQsY0FBVyxNQUFYLENBQWI7QUFDQUUsd0JBQWdCRixjQUFXLFNBQVgsQ0FBaEI7O0FBR0FBLGFBQUthLE9BQUwsR0FBZSxZQUFLO0FBQ2hCZCxnQkFBSWMsT0FBSjtBQUNBZCxrQkFBTSxJQUFOO0FBQ0FKLHlCQUFha0IsT0FBYjtBQUNBTCw4QkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0Qjs7QUFFQVA7QUFDSCxTQVBEO0FBUUgsS0E1QkQsQ0E0QkMsT0FBTVksS0FBTixFQUFZO0FBQ1QsY0FBTSxJQUFJQyxLQUFKLENBQVVELEtBQVYsQ0FBTjtBQUNIOztBQUVELFdBQU9kLElBQVA7QUFDSCxDQTFDRCxDLENBZEE7OztxQkEyRGVSLEciLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gNy4uXHJcbiAqL1xyXG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xyXG5pbXBvcnQge1BST1ZJREVSX0hMU30gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBobHNqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBlbGVtZW50IHZpZGVvIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgSGxzID0gZnVuY3Rpb24oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpe1xyXG5cclxuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyLCBQUk9WSURFUl9ITFMpO1xyXG4gICAgbGV0IGVsZW1lbnQgPSBtZWRpYU1hbmFnZXIuY3JlYXRlKCk7XHJcblxyXG4gICAgbGV0IGhscyA9IFwiXCI7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IHN1cGVyX3BsYXkgPSBcIlwiLCBzdXBlcl9kZXN0cm95ID0gXCJcIjtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGhscyA9IG5ldyBIbHMoe2RlYnVnOiBmYWxzZX0pO1xyXG4gICAgICAgIGhscy5hdHRhY2hNZWRpYShlbGVtZW50KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb25CZWZvcmVMb2FkID0gKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBvbkJlZm9yZUxvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZS5maWxlKTtcclxuICAgICAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgc3VwZXJfcGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihQUk9WSURFUl9ITFMsIGhscywgcGxheWVyQ29uZmlnLCBvbkJlZm9yZUxvYWQpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG4gICAgICAgIHN1cGVyX3BsYXkgPSB0aGF0LnN1cGVyKCdwbGF5Jyk7XHJcbiAgICAgICAgc3VwZXJfZGVzdHJveSA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuXHJcblxyXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgICAgICBobHMuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBobHMgPSBudWxsO1xyXG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBQUk9WSURFUiBERVNUUk9VWUVELlwiKTtcclxuXHJcbiAgICAgICAgICAgIHN1cGVyX2Rlc3Ryb3koKTtcclxuICAgICAgICB9O1xyXG4gICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhsczsiXSwic291cmNlUm9vdCI6IiJ9