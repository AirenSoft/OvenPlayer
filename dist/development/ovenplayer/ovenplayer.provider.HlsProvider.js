/*! OvenPlayerv0.7.62 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0hscy5qcyJdLCJuYW1lcyI6WyJIbHMiLCJjb250YWluZXIiLCJwbGF5ZXJDb25maWciLCJtZWRpYU1hbmFnZXIiLCJQUk9WSURFUl9ITFMiLCJlbGVtZW50IiwiY3JlYXRlIiwiaGxzIiwidGhhdCIsInN1cGVyX3BsYXkiLCJzdXBlcl9kZXN0cm95IiwiZGVidWciLCJhdHRhY2hNZWRpYSIsIm9uQmVmb3JlTG9hZCIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRTb3VyY2UiLCJmaWxlIiwic2VlayIsImRlc3Ryb3kiLCJlcnJvciIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFPQSxJQUFNQSxNQUFNLFNBQU5BLEdBQU0sQ0FBU0MsU0FBVCxFQUFvQkMsWUFBcEIsRUFBaUM7O0FBRXpDLFFBQUlDLGVBQWUsMEJBQWFGLFNBQWIsRUFBd0JHLHVCQUF4QixDQUFuQjtBQUNBLFFBQUlDLFVBQVVGLGFBQWFHLE1BQWIsRUFBZDs7QUFFQSxRQUFJQyxNQUFNLEVBQVY7QUFDQSxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxhQUFhLEVBQWpCO0FBQUEsUUFBcUJDLGdCQUFnQixFQUFyQzs7QUFFQSxRQUFJO0FBQ0FILGNBQU0sSUFBSVAsR0FBSixDQUFRLEVBQUNXLE9BQU8sS0FBUixFQUFSLENBQU47QUFDQUosWUFBSUssV0FBSixDQUFnQlAsT0FBaEI7O0FBRUEsWUFBTVEsZUFBZSxTQUFmQSxZQUFlLENBQUNDLE1BQUQsRUFBU0MsZ0JBQVQsRUFBOEI7QUFDL0NDLDhCQUFrQkMsR0FBbEIsQ0FBc0IsdUJBQXRCLEVBQStDSCxNQUEvQyxFQUF1RCx3QkFBdUJDLGdCQUE5RTtBQUNBUixnQkFBSVcsVUFBSixDQUFlSixPQUFPSyxJQUF0QjtBQUNBLGdCQUFHSixtQkFBbUIsQ0FBdEIsRUFBd0I7QUFDcEJWLHdCQUFRZSxJQUFSLENBQWFMLGdCQUFiO0FBQ0FOO0FBQ0g7QUFFSixTQVJEOztBQVVBRCxlQUFPLDJCQUFTSix1QkFBVCxFQUF1QkcsR0FBdkIsRUFBNEJMLFlBQTVCLEVBQTBDVyxZQUExQyxDQUFQO0FBQ0FHLDBCQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXRCO0FBQ0FSLHFCQUFhRCxjQUFXLE1BQVgsQ0FBYjtBQUNBRSx3QkFBZ0JGLGNBQVcsU0FBWCxDQUFoQjs7QUFHQUEsYUFBS2EsT0FBTCxHQUFlLFlBQUs7QUFDaEJkLGdCQUFJYyxPQUFKO0FBQ0FkLGtCQUFNLElBQU47QUFDQUoseUJBQWFrQixPQUFiO0FBQ0FMLDhCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCOztBQUVBUDtBQUNILFNBUEQ7QUFRSCxLQTVCRCxDQTRCQyxPQUFNWSxLQUFOLEVBQVk7QUFDVCxjQUFNLElBQUlDLEtBQUosQ0FBVUQsS0FBVixDQUFOO0FBQ0g7O0FBRUQsV0FBT2QsSUFBUDtBQUNILENBMUNELEMsQ0FkQTs7O3FCQTJEZVIsRyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiA3Li5cclxuICovXHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7UFJPVklERVJfSExTfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIGhsc2pzIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXHJcbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cclxuICogKi9cclxuXHJcblxyXG5jb25zdCBIbHMgPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcblxyXG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIFBST1ZJREVSX0hMUyk7XHJcbiAgICBsZXQgZWxlbWVudCA9IG1lZGlhTWFuYWdlci5jcmVhdGUoKTtcclxuXHJcbiAgICBsZXQgaGxzID0gXCJcIjtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgc3VwZXJfcGxheSA9IFwiXCIsIHN1cGVyX2Rlc3Ryb3kgPSBcIlwiO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgaGxzID0gbmV3IEhscyh7ZGVidWc6IGZhbHNlfSk7XHJcbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICBjb25zdCBvbkJlZm9yZUxvYWQgPSAoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IG9uQmVmb3JlTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xyXG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBzdXBlcl9wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKFBST1ZJREVSX0hMUywgaGxzLCBwbGF5ZXJDb25maWcsIG9uQmVmb3JlTG9hZCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIFBST1ZJREVSIExPQURFRC5cIik7XHJcbiAgICAgICAgc3VwZXJfcGxheSA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcclxuICAgICAgICBzdXBlcl9kZXN0cm95ID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG5cclxuXHJcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgICAgIGhscy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGhscyA9IG51bGw7XHJcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IFBST1ZJREVSIERFU1RST1VZRUQuXCIpO1xyXG5cclxuICAgICAgICAgICAgc3VwZXJfZGVzdHJveSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGxzOyJdLCJzb3VyY2VSb290IjoiIn0=