/*! OvenPlayerv0.7.1 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0hscy5qcyJdLCJuYW1lcyI6WyJIbHMiLCJjb250YWluZXIiLCJwbGF5ZXJDb25maWciLCJtZWRpYU1hbmFnZXIiLCJQUk9WSURFUl9ITFMiLCJlbGVtZW50IiwiY3JlYXRlIiwiaGxzIiwidGhhdCIsInN1cGVyX3BsYXkiLCJzdXBlcl9kZXN0cm95IiwiZGVidWciLCJhdHRhY2hNZWRpYSIsIm9uQmVmb3JlTG9hZCIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRTb3VyY2UiLCJmaWxlIiwic2VlayIsInN1cGVyIiwiZGVzdHJveSIsImVycm9yIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQU9BLElBQU1BLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFpQzs7QUFFekMsUUFBSUMsZUFBZSx1QkFBYUYsU0FBYixFQUF3QkcsdUJBQXhCLENBQW5CO0FBQ0EsUUFBSUMsVUFBVUYsYUFBYUcsTUFBYixFQUFkOztBQUVBLFFBQUlDLE1BQU0sRUFBVjtBQUNBLFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLGFBQWEsRUFBakI7QUFBQSxRQUFxQkMsZ0JBQWdCLEVBQXJDOztBQUVBLFFBQUk7QUFDQUgsY0FBTSxJQUFJUCxHQUFKLENBQVEsRUFBQ1csT0FBTyxLQUFSLEVBQVIsQ0FBTjtBQUNBSixZQUFJSyxXQUFKLENBQWdCUCxPQUFoQjs7QUFFQSxZQUFNUSxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsTUFBRCxFQUFTQyxnQkFBVCxFQUE4QjtBQUMvQ0MsOEJBQWtCQyxHQUFsQixDQUFzQix1QkFBdEIsRUFBK0NILE1BQS9DLEVBQXVELHdCQUF1QkMsZ0JBQTlFO0FBQ0FSLGdCQUFJVyxVQUFKLENBQWVKLE9BQU9LLElBQXRCO0FBQ0EsZ0JBQUdKLG1CQUFtQixDQUF0QixFQUF3QjtBQUNwQlYsd0JBQVFlLElBQVIsQ0FBYUwsZ0JBQWI7QUFDQU47QUFDSDtBQUVKLFNBUkQ7O0FBVUFELGVBQU8sd0JBQVNKLHVCQUFULEVBQXVCRyxHQUF2QixFQUE0QkwsWUFBNUIsRUFBMENXLFlBQTFDLENBQVA7QUFDQUcsMEJBQWtCQyxHQUFsQixDQUFzQixzQkFBdEI7QUFDQVIscUJBQWFELEtBQUthLEtBQUwsQ0FBVyxNQUFYLENBQWI7QUFDQVgsd0JBQWdCRixLQUFLYSxLQUFMLENBQVcsU0FBWCxDQUFoQjs7QUFHQWIsYUFBS2MsT0FBTCxHQUFlLFlBQUs7QUFDaEJmLGdCQUFJZSxPQUFKO0FBQ0FmLGtCQUFNLElBQU47QUFDQUoseUJBQWFtQixPQUFiO0FBQ0FOLDhCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCOztBQUVBUDtBQUNILFNBUEQ7QUFRSCxLQTVCRCxDQTRCQyxPQUFNYSxLQUFOLEVBQVk7QUFDVCxjQUFNLElBQUlDLEtBQUosQ0FBVUQsS0FBVixDQUFOO0FBQ0g7O0FBRUQsV0FBT2YsSUFBUDtBQUNILENBMUNELEMsQ0FkQTs7O2tCQTJEZVIsRyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gNy4uXG4gKi9cbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IHtQUk9WSURFUl9ITFN9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgaGxzanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5cbmNvbnN0IEhscyA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgcGxheWVyQ29uZmlnKXtcblxuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyLCBQUk9WSURFUl9ITFMpO1xuICAgIGxldCBlbGVtZW50ID0gbWVkaWFNYW5hZ2VyLmNyZWF0ZSgpO1xuXG4gICAgbGV0IGhscyA9IFwiXCI7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgc3VwZXJfcGxheSA9IFwiXCIsIHN1cGVyX2Rlc3Ryb3kgPSBcIlwiO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgaGxzID0gbmV3IEhscyh7ZGVidWc6IGZhbHNlfSk7XG4gICAgICAgIGhscy5hdHRhY2hNZWRpYShlbGVtZW50KTtcblxuICAgICAgICBjb25zdCBvbkJlZm9yZUxvYWQgPSAoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKSA9PiB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBvbkJlZm9yZUxvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICBobHMubG9hZFNvdXJjZShzb3VyY2UuZmlsZSk7XG4gICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCl7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIHN1cGVyX3BsYXkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihQUk9WSURFUl9ITFMsIGhscywgcGxheWVyQ29uZmlnLCBvbkJlZm9yZUxvYWQpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgUFJPVklERVIgTE9BREVELlwiKTtcbiAgICAgICAgc3VwZXJfcGxheSA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcbiAgICAgICAgc3VwZXJfZGVzdHJveSA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcblxuXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICAgICAgaGxzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGhscyA9IG51bGw7XG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogUFJPVklERVIgREVTVFJPVVlFRC5cIik7XG5cbiAgICAgICAgICAgIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICAgICAgfTtcbiAgICB9Y2F0Y2goZXJyb3Ipe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBIbHM7Il0sInNvdXJjZVJvb3QiOiIifQ==