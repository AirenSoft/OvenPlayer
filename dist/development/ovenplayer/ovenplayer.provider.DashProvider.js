/*! OvenPlayerv0.7.6 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.DashProvider"],{

/***/ "./src/js/api/provider/html5/Dash.js":
/*!*******************************************!*\
  !*** ./src/js/api/provider/html5/Dash.js ***!
  \*******************************************/
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
 * @brief   dashjs provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

var Dash = function Dash(container, playerConfig) {
    var DASHERROR = {
        DOWNLOAD: "download",
        MANIFESTERROR: "manifestError"
    };
    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_DASH);
    var element = mediaManager.create();

    var dashObject = "";
    var that = {};
    var super_destroy = "",
        super_play = "";
    var seekPosition_sec = 0;
    var isFirstError = false;

    var errorHandler = function errorHandler(error) {
        that.setState(_constants.STATE_ERROR);
        that.pause();
        that.trigger(_constants.ERROR, error);
    };

    try {

        dashObject = dashjs.MediaPlayer().create();
        dashObject.getDebug().setLogToBrowserConsole(false);
        dashObject.initialize(element, null, false);
        dashObject.on(dashjs.MediaPlayer.events.ERROR, function (error) {
            if (error && !isFirstError && (error.error === DASHERROR.DOWNLOAD || error.error === DASHERROR.MANIFESTERROR)) {
                isFirstError = true;
                errorHandler({ code: _constants.PLAYER_UNKNWON_NEWWORK_ERROR, reason: "Unknown network error", message: "Unknown network error" });
            }
        });

        var onBeforeLoad = function onBeforeLoad(source, lastPlayPosition) {
            OvenPlayerConsole.log("DASH : onBeforeLoad : ", source, "lastPlayPosition : " + lastPlayPosition);
            dashObject.attachSource(source.file);
            seekPosition_sec = lastPlayPosition;
        };

        that = (0, _Provider2["default"])(_constants.PROVIDER_DASH, dashObject, playerConfig, onBeforeLoad);
        OvenPlayerConsole.log("DASH PROVIDER LOADED.");
        super_play = that["super"]('play');
        super_destroy = that["super"]('destroy');

        that.on(_constants.CONTENT_META, function (meta) {
            if (dashObject.isDynamic()) {
                super_play();
            } else {
                if (seekPosition_sec) {
                    dashObject.seek(seekPosition_sec);
                    super_play();
                }
            }
        }, that);

        that.destroy = function () {
            dashObject.reset();
            mediaManager.destroy();
            OvenPlayerConsole.log("DASH : PROVIDER DESTROYED.");

            super_destroy();
        };
    } catch (error) {
        throw new Error(error);
    }

    return that;
}; /**
    * Created by hoho on 2018. 6. 14..
    */
exports["default"] = Dash;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0Rhc2guanMiXSwibmFtZXMiOlsiRGFzaCIsImNvbnRhaW5lciIsInBsYXllckNvbmZpZyIsIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX0RBU0giLCJlbGVtZW50IiwiY3JlYXRlIiwiZGFzaE9iamVjdCIsInRoYXQiLCJzdXBlcl9kZXN0cm95Iiwic3VwZXJfcGxheSIsInNlZWtQb3NpdGlvbl9zZWMiLCJpc0ZpcnN0RXJyb3IiLCJlcnJvckhhbmRsZXIiLCJlcnJvciIsInNldFN0YXRlIiwiU1RBVEVfRVJST1IiLCJwYXVzZSIsInRyaWdnZXIiLCJFUlJPUiIsImRhc2hqcyIsIk1lZGlhUGxheWVyIiwiZ2V0RGVidWciLCJzZXRMb2dUb0Jyb3dzZXJDb25zb2xlIiwiaW5pdGlhbGl6ZSIsIm9uIiwiZXZlbnRzIiwiY29kZSIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwib25CZWZvcmVMb2FkIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiYXR0YWNoU291cmNlIiwiZmlsZSIsIkNPTlRFTlRfTUVUQSIsIm1ldGEiLCJpc0R5bmFtaWMiLCJzZWVrIiwiZGVzdHJveSIsInJlc2V0IiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQU9BLElBQU1BLE9BQU8sU0FBUEEsSUFBTyxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFpQztBQUMxQyxRQUFNQyxZQUFZO0FBQ2RDLGtCQUFXLFVBREc7QUFFZEMsdUJBQWdCO0FBRkYsS0FBbEI7QUFJQSxRQUFJQyxlQUFlLDBCQUFhTCxTQUFiLEVBQXdCTSx3QkFBeEIsQ0FBbkI7QUFDQSxRQUFJQyxVQUFVRixhQUFhRyxNQUFiLEVBQWQ7O0FBRUEsUUFBSUMsYUFBYSxFQUFqQjtBQUNBLFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLGdCQUFnQixFQUFwQjtBQUFBLFFBQXdCQyxhQUFhLEVBQXJDO0FBQ0EsUUFBSUMsbUJBQW1CLENBQXZCO0FBQ0EsUUFBSUMsZUFBZSxLQUFuQjs7QUFFQSxRQUFJQyxlQUFlLFNBQWZBLFlBQWUsQ0FBU0MsS0FBVCxFQUFlO0FBQzlCTixhQUFLTyxRQUFMLENBQWNDLHNCQUFkO0FBQ0FSLGFBQUtTLEtBQUw7QUFDQVQsYUFBS1UsT0FBTCxDQUFhQyxnQkFBYixFQUFvQkwsS0FBcEI7QUFDSCxLQUpEOztBQU1BLFFBQUk7O0FBRUFQLHFCQUFhYSxPQUFPQyxXQUFQLEdBQXFCZixNQUFyQixFQUFiO0FBQ0FDLG1CQUFXZSxRQUFYLEdBQXNCQyxzQkFBdEIsQ0FBNkMsS0FBN0M7QUFDQWhCLG1CQUFXaUIsVUFBWCxDQUFzQm5CLE9BQXRCLEVBQStCLElBQS9CLEVBQXFDLEtBQXJDO0FBQ0FFLG1CQUFXa0IsRUFBWCxDQUFjTCxPQUFPQyxXQUFQLENBQW1CSyxNQUFuQixDQUEwQlAsS0FBeEMsRUFBK0MsVUFBU0wsS0FBVCxFQUFlO0FBQzFELGdCQUFHQSxTQUFTLENBQUNGLFlBQVYsS0FBNEJFLE1BQU1BLEtBQU4sS0FBZ0JkLFVBQVVDLFFBQTFCLElBQXNDYSxNQUFNQSxLQUFOLEtBQWdCZCxVQUFVRSxhQUE1RixDQUFILEVBQStHO0FBQzNHVSwrQkFBZSxJQUFmO0FBQ0FDLDZCQUFhLEVBQUNjLE1BQU9DLHVDQUFSLEVBQXNDQyxRQUFTLHVCQUEvQyxFQUF3RUMsU0FBVSx1QkFBbEYsRUFBYjtBQUNIO0FBQ0osU0FMRDs7QUFPQSxZQUFNQyxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsTUFBRCxFQUFTQyxnQkFBVCxFQUE4QjtBQUMvQ0MsOEJBQWtCQyxHQUFsQixDQUFzQix3QkFBdEIsRUFBZ0RILE1BQWhELEVBQXdELHdCQUF1QkMsZ0JBQS9FO0FBQ0ExQix1QkFBVzZCLFlBQVgsQ0FBd0JKLE9BQU9LLElBQS9CO0FBQ0ExQiwrQkFBbUJzQixnQkFBbkI7QUFDSCxTQUpEOztBQU1BekIsZUFBTywyQkFBU0osd0JBQVQsRUFBd0JHLFVBQXhCLEVBQW9DUixZQUFwQyxFQUFrRGdDLFlBQWxELENBQVA7QUFDQUcsMEJBQWtCQyxHQUFsQixDQUFzQix1QkFBdEI7QUFDQXpCLHFCQUFhRixjQUFXLE1BQVgsQ0FBYjtBQUNBQyx3QkFBZ0JELGNBQVcsU0FBWCxDQUFoQjs7QUFFQUEsYUFBS2lCLEVBQUwsQ0FBUWEsdUJBQVIsRUFBc0IsVUFBU0MsSUFBVCxFQUFjO0FBQ2hDLGdCQUFHaEMsV0FBV2lDLFNBQVgsRUFBSCxFQUEwQjtBQUN0QjlCO0FBQ0gsYUFGRCxNQUVLO0FBQ0Qsb0JBQUdDLGdCQUFILEVBQW9CO0FBQ2hCSiwrQkFBV2tDLElBQVgsQ0FBZ0I5QixnQkFBaEI7QUFDQUQ7QUFDSDtBQUNKO0FBQ0osU0FURCxFQVNHRixJQVRIOztBQVdBQSxhQUFLa0MsT0FBTCxHQUFlLFlBQUs7QUFDaEJuQyx1QkFBV29DLEtBQVg7QUFDQXhDLHlCQUFhdUMsT0FBYjtBQUNBUiw4QkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0Qjs7QUFFQTFCO0FBQ0gsU0FORDtBQU9ILEtBekNELENBeUNDLE9BQU1LLEtBQU4sRUFBWTtBQUNULGNBQU0sSUFBSThCLEtBQUosQ0FBVTlCLEtBQVYsQ0FBTjtBQUNIOztBQUVELFdBQU9OLElBQVA7QUFDSCxDQWxFRCxDLENBZEE7OztxQkFtRmVYLEkiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDE0Li5cclxuICovXHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7UExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiwgUFJPVklERVJfREFTSCwgQ09OVEVOVF9NRVRBLCBFUlJPUiwgU1RBVEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgZGFzaGpzIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXHJcbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cclxuICogKi9cclxuXHJcblxyXG5jb25zdCBEYXNoID0gZnVuY3Rpb24oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpe1xyXG4gICAgY29uc3QgREFTSEVSUk9SID0ge1xyXG4gICAgICAgIERPV05MT0FEIDogXCJkb3dubG9hZFwiLFxyXG4gICAgICAgIE1BTklGRVNURVJST1IgOiBcIm1hbmlmZXN0RXJyb3JcIlxyXG4gICAgfTtcclxuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyLCBQUk9WSURFUl9EQVNIKTtcclxuICAgIGxldCBlbGVtZW50ID0gbWVkaWFNYW5hZ2VyLmNyZWF0ZSgpO1xyXG5cclxuICAgIGxldCBkYXNoT2JqZWN0ID0gXCJcIjtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgc3VwZXJfZGVzdHJveSA9IFwiXCIsIHN1cGVyX3BsYXkgPSBcIlwiO1xyXG4gICAgbGV0IHNlZWtQb3NpdGlvbl9zZWMgPSAwO1xyXG4gICAgbGV0IGlzRmlyc3RFcnJvciA9IGZhbHNlO1xyXG5cclxuICAgIGxldCBlcnJvckhhbmRsZXIgPSBmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9FUlJPUik7XHJcbiAgICAgICAgdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgZXJyb3IgKTtcclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgZGFzaE9iamVjdCA9IGRhc2hqcy5NZWRpYVBsYXllcigpLmNyZWF0ZSgpO1xyXG4gICAgICAgIGRhc2hPYmplY3QuZ2V0RGVidWcoKS5zZXRMb2dUb0Jyb3dzZXJDb25zb2xlKGZhbHNlKTtcclxuICAgICAgICBkYXNoT2JqZWN0LmluaXRpYWxpemUoZWxlbWVudCwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgIGRhc2hPYmplY3Qub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5FUlJPUiwgZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICBpZihlcnJvciAmJiAhaXNGaXJzdEVycm9yICYmICggZXJyb3IuZXJyb3IgPT09IERBU0hFUlJPUi5ET1dOTE9BRCB8fCBlcnJvci5lcnJvciA9PT0gREFTSEVSUk9SLk1BTklGRVNURVJST1IgKSl7XHJcbiAgICAgICAgICAgICAgICBpc0ZpcnN0RXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZXJyb3JIYW5kbGVyKHtjb2RlIDogUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiwgcmVhc29uIDogXCJVbmtub3duIG5ldHdvcmsgZXJyb3JcIiwgbWVzc2FnZSA6IFwiVW5rbm93biBuZXR3b3JrIGVycm9yXCJ9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBvbkJlZm9yZUxvYWQgPSAoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBvbkJlZm9yZUxvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGRhc2hPYmplY3QuYXR0YWNoU291cmNlKHNvdXJjZS5maWxlKTtcclxuICAgICAgICAgICAgc2Vla1Bvc2l0aW9uX3NlYyA9IGxhc3RQbGF5UG9zaXRpb247XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKFBST1ZJREVSX0RBU0gsIGRhc2hPYmplY3QsIHBsYXllckNvbmZpZywgb25CZWZvcmVMb2FkKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIFBST1ZJREVSIExPQURFRC5cIik7XHJcbiAgICAgICAgc3VwZXJfcGxheSA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcclxuICAgICAgICBzdXBlcl9kZXN0cm95ID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG5cclxuICAgICAgICB0aGF0Lm9uKENPTlRFTlRfTUVUQSwgZnVuY3Rpb24obWV0YSl7XHJcbiAgICAgICAgICAgIGlmKGRhc2hPYmplY3QuaXNEeW5hbWljKCkpe1xyXG4gICAgICAgICAgICAgICAgc3VwZXJfcGxheSgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKHNlZWtQb3NpdGlvbl9zZWMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhc2hPYmplY3Quc2VlayhzZWVrUG9zaXRpb25fc2VjKTtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlcl9wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGF0KTtcclxuXHJcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgICAgIGRhc2hPYmplY3QucmVzZXQoKTtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XHJcblxyXG4gICAgICAgICAgICBzdXBlcl9kZXN0cm95KCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1jYXRjaChlcnJvcil7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXNoO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9