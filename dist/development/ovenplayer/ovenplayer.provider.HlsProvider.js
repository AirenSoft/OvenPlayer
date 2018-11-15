/*! OvenPlayerv0.7.74 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.HlsProvider"],{

/***/ "./src/js/api/provider/html5/providers/Hls.js":
/*!****************************************************!*\
  !*** ./src/js/api/provider/html5/providers/Hls.js ***!
  \****************************************************/
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
 * @brief   hlsjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

/**
 * Created by hoho on 2018. 6. 7..
 */
var Hls = function Hls(container, playerConfig) {
    var that = {};
    var hls = null;
    var superDestroy_func = null;

    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_HLS);
    var element = mediaManager.create();

    try {
        hls = new Hls({ debug: false });
        hls.attachMedia(element);

        var spec = {
            name: _constants.PROVIDER_HLS,
            extendedElement: hls,
            listener: null,
            canSeek: false,
            isLive: false,
            seeking: false,
            state: _constants.STATE_IDLE,
            buffer: 0,
            currentQuality: -1,
            currentSource: -1,
            qualityLevels: [],
            sources: []
        };
        that = (0, _Provider2["default"])(spec, playerConfig, function (source, lastPlayPosition) {
            OvenPlayerConsole.log("HLS : onExtendedLoad : ", source, "lastPlayPosition : " + lastPlayPosition);
            hls.loadSource(source.file);

            if (lastPlayPosition > 0) {
                element.seek(lastPlayPosition);
                that.play();
            }
        });
        superDestroy_func = that["super"]('destroy');
        OvenPlayerConsole.log("HLS PROVIDER LOADED.");

        that.destroy = function () {
            hls.destroy();
            hls = null;
            mediaManager.destroy();
            mediaManager = null;
            element = null;
            OvenPlayerConsole.log("HLS : PROVIDER DESTROUYED.");

            superDestroy_func();
        };
    } catch (error) {
        throw new Error(error);
    }

    return that;
};

exports["default"] = Hls;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzIiwiY29udGFpbmVyIiwicGxheWVyQ29uZmlnIiwidGhhdCIsImhscyIsInN1cGVyRGVzdHJveV9mdW5jIiwibWVkaWFNYW5hZ2VyIiwiUFJPVklERVJfSExTIiwiZWxlbWVudCIsImNyZWF0ZSIsImRlYnVnIiwiYXR0YWNoTWVkaWEiLCJzcGVjIiwibmFtZSIsImV4dGVuZGVkRWxlbWVudCIsImxpc3RlbmVyIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRTb3VyY2UiLCJmaWxlIiwic2VlayIsInBsYXkiLCJkZXN0cm95IiwiZXJyb3IiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBUkE7OztBQWVBLElBQU1BLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFpQztBQUN6QyxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxNQUFNLElBQVY7QUFDQSxRQUFJQyxvQkFBb0IsSUFBeEI7O0FBRUEsUUFBSUMsZUFBZSwwQkFBYUwsU0FBYixFQUF3Qk0sdUJBQXhCLENBQW5CO0FBQ0EsUUFBSUMsVUFBVUYsYUFBYUcsTUFBYixFQUFkOztBQUVBLFFBQUk7QUFDQUwsY0FBTSxJQUFJSixHQUFKLENBQVEsRUFBQ1UsT0FBTyxLQUFSLEVBQVIsQ0FBTjtBQUNBTixZQUFJTyxXQUFKLENBQWdCSCxPQUFoQjs7QUFFQSxZQUFJSSxPQUFPO0FBQ1BDLGtCQUFPTix1QkFEQTtBQUVQTyw2QkFBa0JWLEdBRlg7QUFHUFcsc0JBQVcsSUFISjtBQUlQQyxxQkFBVSxLQUpIO0FBS1BDLG9CQUFTLEtBTEY7QUFNUEMscUJBQVUsS0FOSDtBQU9QQyxtQkFBUUMscUJBUEQ7QUFRUEMsb0JBQVMsQ0FSRjtBQVNQQyw0QkFBaUIsQ0FBQyxDQVRYO0FBVVBDLDJCQUFnQixDQUFDLENBVlY7QUFXUEMsMkJBQWdCLEVBWFQ7QUFZUEMscUJBQVU7QUFaSCxTQUFYO0FBY0F0QixlQUFPLDJCQUFTUyxJQUFULEVBQWVWLFlBQWYsRUFBNkIsVUFBU3dCLE1BQVQsRUFBaUJDLGdCQUFqQixFQUFrQztBQUNsRUMsOEJBQWtCQyxHQUFsQixDQUFzQix5QkFBdEIsRUFBaURILE1BQWpELEVBQXlELHdCQUF1QkMsZ0JBQWhGO0FBQ0F2QixnQkFBSTBCLFVBQUosQ0FBZUosT0FBT0ssSUFBdEI7O0FBRUEsZ0JBQUdKLG1CQUFtQixDQUF0QixFQUF3QjtBQUNwQm5CLHdCQUFRd0IsSUFBUixDQUFhTCxnQkFBYjtBQUNBeEIscUJBQUs4QixJQUFMO0FBQ0g7QUFDSixTQVJNLENBQVA7QUFTQTVCLDRCQUFvQkYsY0FBVyxTQUFYLENBQXBCO0FBQ0F5QiwwQkFBa0JDLEdBQWxCLENBQXNCLHNCQUF0Qjs7QUFFQTFCLGFBQUsrQixPQUFMLEdBQWUsWUFBSztBQUNoQjlCLGdCQUFJOEIsT0FBSjtBQUNBOUIsa0JBQU0sSUFBTjtBQUNBRSx5QkFBYTRCLE9BQWI7QUFDQTVCLDJCQUFlLElBQWY7QUFDQUUsc0JBQVUsSUFBVjtBQUNBb0IsOEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7O0FBRUF4QjtBQUNILFNBVEQ7QUFVSCxLQXhDRCxDQXdDQyxPQUFNOEIsS0FBTixFQUFZO0FBQ1QsY0FBTSxJQUFJQyxLQUFKLENBQVVELEtBQVYsQ0FBTjtBQUNIOztBQUVELFdBQU9oQyxJQUFQO0FBQ0gsQ0FyREQ7O3FCQXdEZUgsRyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiA3Li5cclxuICovXHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7UFJPVklERVJfSExTLCBTVEFURV9JRExFfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIGhsc2pzIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXHJcbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cclxuICogKi9cclxuXHJcblxyXG5jb25zdCBIbHMgPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGhscyA9IG51bGw7XHJcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xyXG5cclxuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyLCBQUk9WSURFUl9ITFMpO1xyXG4gICAgbGV0IGVsZW1lbnQgPSBtZWRpYU1hbmFnZXIuY3JlYXRlKCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBobHMgPSBuZXcgSGxzKHtkZWJ1ZzogZmFsc2V9KTtcclxuICAgICAgICBobHMuYXR0YWNoTWVkaWEoZWxlbWVudCk7XHJcblxyXG4gICAgICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgICAgICBuYW1lIDogUFJPVklERVJfSExTLFxyXG4gICAgICAgICAgICBleHRlbmRlZEVsZW1lbnQgOiBobHMsXHJcbiAgICAgICAgICAgIGxpc3RlbmVyIDogbnVsbCxcclxuICAgICAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0xpdmUgOiBmYWxzZSxcclxuICAgICAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXHJcbiAgICAgICAgICAgIGJ1ZmZlciA6IDAsXHJcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcclxuICAgICAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxyXG4gICAgICAgICAgICBzb3VyY2VzIDogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbil7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IG9uRXh0ZW5kZWRMb2FkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICBobHMubG9hZFNvdXJjZShzb3VyY2UuZmlsZSk7XHJcblxyXG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICAgICAgaGxzLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgaGxzID0gbnVsbDtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IFBST1ZJREVSIERFU1RST1VZRUQuXCIpO1xyXG5cclxuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcclxuICAgICAgICB9O1xyXG4gICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhsczsiXSwic291cmNlUm9vdCI6IiJ9