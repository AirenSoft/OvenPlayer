/*! OvenPlayerv0.7.3 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.HlsProvider"],{

/***/ "./src/js/api/provider/html5/Hls.js":
/*!******************************************!*\
  !*** ./src/js/api/provider/html5/Hls.js ***!
  \******************************************/
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
 * @brief   hlsjs provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

var Hls = function Hls(container, playerConfig) {

    var mediaManager = (0, _Manager2.default)(container, _constants.PROVIDER_HLS);
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

        that = (0, _Provider2.default)(_constants.PROVIDER_HLS, hls, playerConfig, onBeforeLoad);
        OvenPlayerConsole.log("HLS PROVIDER LOADED.");
        super_play = that.super('play');
        super_destroy = that.super('destroy');

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
exports.default = Hls;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0hscy5qcyJdLCJuYW1lcyI6WyJIbHMiLCJjb250YWluZXIiLCJwbGF5ZXJDb25maWciLCJtZWRpYU1hbmFnZXIiLCJQUk9WSURFUl9ITFMiLCJlbGVtZW50IiwiY3JlYXRlIiwiaGxzIiwidGhhdCIsInN1cGVyX3BsYXkiLCJzdXBlcl9kZXN0cm95IiwiZGVidWciLCJhdHRhY2hNZWRpYSIsIm9uQmVmb3JlTG9hZCIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRTb3VyY2UiLCJmaWxlIiwic2VlayIsInN1cGVyIiwiZGVzdHJveSIsImVycm9yIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQU9BLElBQU1BLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFpQzs7QUFFekMsUUFBSUMsZUFBZSx1QkFBYUYsU0FBYixFQUF3QkcsdUJBQXhCLENBQW5CO0FBQ0EsUUFBSUMsVUFBVUYsYUFBYUcsTUFBYixFQUFkOztBQUVBLFFBQUlDLE1BQU0sRUFBVjtBQUNBLFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLGFBQWEsRUFBakI7QUFBQSxRQUFxQkMsZ0JBQWdCLEVBQXJDOztBQUVBLFFBQUk7QUFDQUgsY0FBTSxJQUFJUCxHQUFKLENBQVEsRUFBQ1csT0FBTyxLQUFSLEVBQVIsQ0FBTjtBQUNBSixZQUFJSyxXQUFKLENBQWdCUCxPQUFoQjs7QUFFQSxZQUFNUSxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsTUFBRCxFQUFTQyxnQkFBVCxFQUE4QjtBQUMvQ0MsOEJBQWtCQyxHQUFsQixDQUFzQix1QkFBdEIsRUFBK0NILE1BQS9DLEVBQXVELHdCQUF1QkMsZ0JBQTlFO0FBQ0FSLGdCQUFJVyxVQUFKLENBQWVKLE9BQU9LLElBQXRCO0FBQ0EsZ0JBQUdKLG1CQUFtQixDQUF0QixFQUF3QjtBQUNwQlYsd0JBQVFlLElBQVIsQ0FBYUwsZ0JBQWI7QUFDQU47QUFDSDtBQUVKLFNBUkQ7O0FBVUFELGVBQU8sd0JBQVNKLHVCQUFULEVBQXVCRyxHQUF2QixFQUE0QkwsWUFBNUIsRUFBMENXLFlBQTFDLENBQVA7QUFDQUcsMEJBQWtCQyxHQUFsQixDQUFzQixzQkFBdEI7QUFDQVIscUJBQWFELEtBQUthLEtBQUwsQ0FBVyxNQUFYLENBQWI7QUFDQVgsd0JBQWdCRixLQUFLYSxLQUFMLENBQVcsU0FBWCxDQUFoQjs7QUFHQWIsYUFBS2MsT0FBTCxHQUFlLFlBQUs7QUFDaEJmLGdCQUFJZSxPQUFKO0FBQ0FmLGtCQUFNLElBQU47QUFDQUoseUJBQWFtQixPQUFiO0FBQ0FOLDhCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCOztBQUVBUDtBQUNILFNBUEQ7QUFRSCxLQTVCRCxDQTRCQyxPQUFNYSxLQUFOLEVBQVk7QUFDVCxjQUFNLElBQUlDLEtBQUosQ0FBVUQsS0FBVixDQUFOO0FBQ0g7O0FBRUQsV0FBT2YsSUFBUDtBQUNILENBMUNELEMsQ0FkQTs7O2tCQTJEZVIsRyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiA3Li5cclxuICovXHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7UFJPVklERVJfSExTfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIGhsc2pzIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXHJcbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cclxuICogKi9cclxuXHJcblxyXG5jb25zdCBIbHMgPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcblxyXG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIFBST1ZJREVSX0hMUyk7XHJcbiAgICBsZXQgZWxlbWVudCA9IG1lZGlhTWFuYWdlci5jcmVhdGUoKTtcclxuXHJcbiAgICBsZXQgaGxzID0gXCJcIjtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgc3VwZXJfcGxheSA9IFwiXCIsIHN1cGVyX2Rlc3Ryb3kgPSBcIlwiO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgaGxzID0gbmV3IEhscyh7ZGVidWc6IGZhbHNlfSk7XHJcbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICBjb25zdCBvbkJlZm9yZUxvYWQgPSAoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IG9uQmVmb3JlTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xyXG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBzdXBlcl9wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKFBST1ZJREVSX0hMUywgaGxzLCBwbGF5ZXJDb25maWcsIG9uQmVmb3JlTG9hZCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIFBST1ZJREVSIExPQURFRC5cIik7XHJcbiAgICAgICAgc3VwZXJfcGxheSA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcclxuICAgICAgICBzdXBlcl9kZXN0cm95ID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG5cclxuXHJcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgICAgIGhscy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGhscyA9IG51bGw7XHJcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IFBST1ZJREVSIERFU1RST1VZRUQuXCIpO1xyXG5cclxuICAgICAgICAgICAgc3VwZXJfZGVzdHJveSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGxzOyJdLCJzb3VyY2VSb290IjoiIn0=