/*! OvenPlayerv0.7.5 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.DashProvider"],{

/***/ "./src/js/api/provider/html5/Dash.js":
/*!*******************************************!*\
  !*** ./src/js/api/provider/html5/Dash.js ***!
  \*******************************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0Rhc2guanMiXSwibmFtZXMiOlsiRGFzaCIsImNvbnRhaW5lciIsInBsYXllckNvbmZpZyIsIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX0RBU0giLCJlbGVtZW50IiwiY3JlYXRlIiwiZGFzaE9iamVjdCIsInRoYXQiLCJzdXBlcl9kZXN0cm95Iiwic3VwZXJfcGxheSIsInNlZWtQb3NpdGlvbl9zZWMiLCJpc0ZpcnN0RXJyb3IiLCJlcnJvckhhbmRsZXIiLCJlcnJvciIsInNldFN0YXRlIiwiU1RBVEVfRVJST1IiLCJwYXVzZSIsInRyaWdnZXIiLCJFUlJPUiIsImRhc2hqcyIsIk1lZGlhUGxheWVyIiwiZ2V0RGVidWciLCJzZXRMb2dUb0Jyb3dzZXJDb25zb2xlIiwiaW5pdGlhbGl6ZSIsIm9uIiwiZXZlbnRzIiwiY29kZSIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwib25CZWZvcmVMb2FkIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiYXR0YWNoU291cmNlIiwiZmlsZSIsIkNPTlRFTlRfTUVUQSIsIm1ldGEiLCJpc0R5bmFtaWMiLCJzZWVrIiwiZGVzdHJveSIsInJlc2V0IiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFPQSxJQUFNQSxPQUFPLFNBQVBBLElBQU8sQ0FBU0MsU0FBVCxFQUFvQkMsWUFBcEIsRUFBaUM7QUFDMUMsUUFBTUMsWUFBWTtBQUNkQyxrQkFBVyxVQURHO0FBRWRDLHVCQUFnQjtBQUZGLEtBQWxCO0FBSUEsUUFBSUMsZUFBZSwwQkFBYUwsU0FBYixFQUF3Qk0sd0JBQXhCLENBQW5CO0FBQ0EsUUFBSUMsVUFBVUYsYUFBYUcsTUFBYixFQUFkOztBQUVBLFFBQUlDLGFBQWEsRUFBakI7QUFDQSxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxnQkFBZ0IsRUFBcEI7QUFBQSxRQUF3QkMsYUFBYSxFQUFyQztBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLGVBQWUsS0FBbkI7O0FBRUEsUUFBSUMsZUFBZSxTQUFmQSxZQUFlLENBQVNDLEtBQVQsRUFBZTtBQUM5Qk4sYUFBS08sUUFBTCxDQUFjQyxzQkFBZDtBQUNBUixhQUFLUyxLQUFMO0FBQ0FULGFBQUtVLE9BQUwsQ0FBYUMsZ0JBQWIsRUFBb0JMLEtBQXBCO0FBQ0gsS0FKRDs7QUFNQSxRQUFJOztBQUVBUCxxQkFBYWEsT0FBT0MsV0FBUCxHQUFxQmYsTUFBckIsRUFBYjtBQUNBQyxtQkFBV2UsUUFBWCxHQUFzQkMsc0JBQXRCLENBQTZDLEtBQTdDO0FBQ0FoQixtQkFBV2lCLFVBQVgsQ0FBc0JuQixPQUF0QixFQUErQixJQUEvQixFQUFxQyxLQUFyQztBQUNBRSxtQkFBV2tCLEVBQVgsQ0FBY0wsT0FBT0MsV0FBUCxDQUFtQkssTUFBbkIsQ0FBMEJQLEtBQXhDLEVBQStDLFVBQVNMLEtBQVQsRUFBZTtBQUMxRCxnQkFBR0EsU0FBUyxDQUFDRixZQUFWLEtBQTRCRSxNQUFNQSxLQUFOLEtBQWdCZCxVQUFVQyxRQUExQixJQUFzQ2EsTUFBTUEsS0FBTixLQUFnQmQsVUFBVUUsYUFBNUYsQ0FBSCxFQUErRztBQUMzR1UsK0JBQWUsSUFBZjtBQUNBQyw2QkFBYSxFQUFDYyxNQUFPQyx1Q0FBUixFQUFzQ0MsUUFBUyx1QkFBL0MsRUFBd0VDLFNBQVUsdUJBQWxGLEVBQWI7QUFDSDtBQUNKLFNBTEQ7O0FBT0EsWUFBTUMsZUFBZSxTQUFmQSxZQUFlLENBQUNDLE1BQUQsRUFBU0MsZ0JBQVQsRUFBOEI7QUFDL0NDLDhCQUFrQkMsR0FBbEIsQ0FBc0Isd0JBQXRCLEVBQWdESCxNQUFoRCxFQUF3RCx3QkFBdUJDLGdCQUEvRTtBQUNBMUIsdUJBQVc2QixZQUFYLENBQXdCSixPQUFPSyxJQUEvQjtBQUNBMUIsK0JBQW1Cc0IsZ0JBQW5CO0FBQ0gsU0FKRDs7QUFNQXpCLGVBQU8sMkJBQVNKLHdCQUFULEVBQXdCRyxVQUF4QixFQUFvQ1IsWUFBcEMsRUFBa0RnQyxZQUFsRCxDQUFQO0FBQ0FHLDBCQUFrQkMsR0FBbEIsQ0FBc0IsdUJBQXRCO0FBQ0F6QixxQkFBYUYsY0FBVyxNQUFYLENBQWI7QUFDQUMsd0JBQWdCRCxjQUFXLFNBQVgsQ0FBaEI7O0FBRUFBLGFBQUtpQixFQUFMLENBQVFhLHVCQUFSLEVBQXNCLFVBQVNDLElBQVQsRUFBYztBQUNoQyxnQkFBR2hDLFdBQVdpQyxTQUFYLEVBQUgsRUFBMEI7QUFDdEI5QjtBQUNILGFBRkQsTUFFSztBQUNELG9CQUFHQyxnQkFBSCxFQUFvQjtBQUNoQkosK0JBQVdrQyxJQUFYLENBQWdCOUIsZ0JBQWhCO0FBQ0FEO0FBQ0g7QUFDSjtBQUNKLFNBVEQsRUFTR0YsSUFUSDs7QUFXQUEsYUFBS2tDLE9BQUwsR0FBZSxZQUFLO0FBQ2hCbkMsdUJBQVdvQyxLQUFYO0FBQ0F4Qyx5QkFBYXVDLE9BQWI7QUFDQVIsOEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7O0FBRUExQjtBQUNILFNBTkQ7QUFPSCxLQXpDRCxDQXlDQyxPQUFNSyxLQUFOLEVBQVk7QUFDVCxjQUFNLElBQUk4QixLQUFKLENBQVU5QixLQUFWLENBQU47QUFDSDs7QUFFRCxXQUFPTixJQUFQO0FBQ0gsQ0FsRUQsQyxDQWRBOzs7cUJBbUZlWCxJIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAxNC4uXHJcbiAqL1xyXG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xyXG5pbXBvcnQge1BMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsIFBST1ZJREVSX0RBU0gsIENPTlRFTlRfTUVUQSwgRVJST1IsIFNUQVRFX0VSUk9SfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIGRhc2hqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBlbGVtZW50IHZpZGVvIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgRGFzaCA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgcGxheWVyQ29uZmlnKXtcclxuICAgIGNvbnN0IERBU0hFUlJPUiA9IHtcclxuICAgICAgICBET1dOTE9BRCA6IFwiZG93bmxvYWRcIixcclxuICAgICAgICBNQU5JRkVTVEVSUk9SIDogXCJtYW5pZmVzdEVycm9yXCJcclxuICAgIH07XHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgUFJPVklERVJfREFTSCk7XHJcbiAgICBsZXQgZWxlbWVudCA9IG1lZGlhTWFuYWdlci5jcmVhdGUoKTtcclxuXHJcbiAgICBsZXQgZGFzaE9iamVjdCA9IFwiXCI7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IHN1cGVyX2Rlc3Ryb3kgPSBcIlwiLCBzdXBlcl9wbGF5ID0gXCJcIjtcclxuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcclxuICAgIGxldCBpc0ZpcnN0RXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgZXJyb3JIYW5kbGVyID0gZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xyXG4gICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIGVycm9yICk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcblxyXG4gICAgICAgIGRhc2hPYmplY3QgPSBkYXNoanMuTWVkaWFQbGF5ZXIoKS5jcmVhdGUoKTtcclxuICAgICAgICBkYXNoT2JqZWN0LmdldERlYnVnKCkuc2V0TG9nVG9Ccm93c2VyQ29uc29sZShmYWxzZSk7XHJcbiAgICAgICAgZGFzaE9iamVjdC5pbml0aWFsaXplKGVsZW1lbnQsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICBkYXNoT2JqZWN0Lm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuRVJST1IsIGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgaWYoZXJyb3IgJiYgIWlzRmlyc3RFcnJvciAmJiAoIGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuRE9XTkxPQUQgfHwgZXJyb3IuZXJyb3IgPT09IERBU0hFUlJPUi5NQU5JRkVTVEVSUk9SICkpe1xyXG4gICAgICAgICAgICAgICAgaXNGaXJzdEVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGVycm9ySGFuZGxlcih7Y29kZSA6IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsIHJlYXNvbiA6IFwiVW5rbm93biBuZXR3b3JrIGVycm9yXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gbmV0d29yayBlcnJvclwifSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb25CZWZvcmVMb2FkID0gKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogb25CZWZvcmVMb2FkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICBkYXNoT2JqZWN0LmF0dGFjaFNvdXJjZShzb3VyY2UuZmlsZSk7XHJcbiAgICAgICAgICAgIHNlZWtQb3NpdGlvbl9zZWMgPSBsYXN0UGxheVBvc2l0aW9uO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihQUk9WSURFUl9EQVNILCBkYXNoT2JqZWN0LCBwbGF5ZXJDb25maWcsIG9uQmVmb3JlTG9hZCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG4gICAgICAgIHN1cGVyX3BsYXkgPSB0aGF0LnN1cGVyKCdwbGF5Jyk7XHJcbiAgICAgICAgc3VwZXJfZGVzdHJveSA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuXHJcbiAgICAgICAgdGhhdC5vbihDT05URU5UX01FVEEsIGZ1bmN0aW9uKG1ldGEpe1xyXG4gICAgICAgICAgICBpZihkYXNoT2JqZWN0LmlzRHluYW1pYygpKXtcclxuICAgICAgICAgICAgICAgIHN1cGVyX3BsYXkoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihzZWVrUG9zaXRpb25fc2VjKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXNoT2JqZWN0LnNlZWsoc2Vla1Bvc2l0aW9uX3NlYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXJfcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhhdCk7XHJcblxyXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgICAgICBkYXNoT2JqZWN0LnJlc2V0KCk7XHJcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG5cclxuICAgICAgICAgICAgc3VwZXJfZGVzdHJveSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaDtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==