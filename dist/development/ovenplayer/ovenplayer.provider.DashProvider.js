/*! OvenPlayerv0.6.6 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.DashProvider"],{

/***/ "./src/js/api/provider/dash/Dash.js":
/*!******************************************!*\
  !*** ./src/js/api/provider/dash/Dash.js ***!
  \******************************************/
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
 * @brief   dashjs provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

/**
 * Created by hoho on 2018. 6. 14..
 */
var DashProvider = function DashProvider(element, playerConfig) {
    var dashObject = "";
    var that = {};
    var super_destroy = "",
        super_play = "";

    var seekPosition_sec = 0;
    try {

        dashObject = dashjs.MediaPlayer().create();
        dashObject.getDebug().setLogToBrowserConsole(false);
        dashObject.initialize(element, null, false);

        var sourceLoaded = function sourceLoaded(source, lastPlayPosition) {
            OvenPlayerConsole.log("DASH : source loaded : ", source, "lastPlayPosition : " + lastPlayPosition);
            dashObject.attachSource(source.file);
            seekPosition_sec = lastPlayPosition;
        };

        that = (0, _Core2.default)(_constants.PROVIDER_DASH, dashObject, playerConfig, sourceLoaded);
        OvenPlayerConsole.log("DASH PROVIDER LOADED.");
        super_play = that.super('play');
        super_destroy = that.super('destroy');

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

            OvenPlayerConsole.log("DASH : PROVIDER DESTROYED.");

            super_destroy();
        };
    } catch (error) {
        throw new Error(error);
    }

    return that;
};

exports.default = DashProvider;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Rhc2gvRGFzaC5qcyJdLCJuYW1lcyI6WyJEYXNoUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiZGFzaE9iamVjdCIsInRoYXQiLCJzdXBlcl9kZXN0cm95Iiwic3VwZXJfcGxheSIsInNlZWtQb3NpdGlvbl9zZWMiLCJkYXNoanMiLCJNZWRpYVBsYXllciIsImNyZWF0ZSIsImdldERlYnVnIiwic2V0TG9nVG9Ccm93c2VyQ29uc29sZSIsImluaXRpYWxpemUiLCJzb3VyY2VMb2FkZWQiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJhdHRhY2hTb3VyY2UiLCJmaWxlIiwiUFJPVklERVJfREFTSCIsInN1cGVyIiwib24iLCJDT05URU5UX01FVEEiLCJtZXRhIiwiaXNEeW5hbWljIiwic2VlayIsImRlc3Ryb3kiLCJyZXNldCIsImVycm9yIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFOQTs7O0FBYUEsSUFBTUEsZUFBZSxTQUFmQSxZQUFlLENBQVNDLE9BQVQsRUFBa0JDLFlBQWxCLEVBQStCO0FBQ2hELFFBQUlDLGFBQWEsRUFBakI7QUFDQSxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxnQkFBZ0IsRUFBcEI7QUFBQSxRQUF3QkMsYUFBYSxFQUFyQzs7QUFFQSxRQUFJQyxtQkFBbUIsQ0FBdkI7QUFDQSxRQUFJOztBQUVBSixxQkFBYUssT0FBT0MsV0FBUCxHQUFxQkMsTUFBckIsRUFBYjtBQUNBUCxtQkFBV1EsUUFBWCxHQUFzQkMsc0JBQXRCLENBQTZDLEtBQTdDO0FBQ0FULG1CQUFXVSxVQUFYLENBQXNCWixPQUF0QixFQUErQixJQUEvQixFQUFxQyxLQUFyQzs7QUFFQSxZQUFNYSxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsTUFBRCxFQUFTQyxnQkFBVCxFQUE4QjtBQUMvQ0MsOEJBQWtCQyxHQUFsQixDQUFzQix5QkFBdEIsRUFBaURILE1BQWpELEVBQXlELHdCQUF1QkMsZ0JBQWhGO0FBQ0FiLHVCQUFXZ0IsWUFBWCxDQUF3QkosT0FBT0ssSUFBL0I7QUFDQWIsK0JBQW1CUyxnQkFBbkI7QUFDSCxTQUpEOztBQU1BWixlQUFPLG9CQUFhaUIsd0JBQWIsRUFBNEJsQixVQUE1QixFQUF3Q0QsWUFBeEMsRUFBc0RZLFlBQXRELENBQVA7QUFDQUcsMEJBQWtCQyxHQUFsQixDQUFzQix1QkFBdEI7QUFDQVoscUJBQWFGLEtBQUtrQixLQUFMLENBQVcsTUFBWCxDQUFiO0FBQ0FqQix3QkFBZ0JELEtBQUtrQixLQUFMLENBQVcsU0FBWCxDQUFoQjs7QUFFQWxCLGFBQUttQixFQUFMLENBQVFDLHVCQUFSLEVBQXNCLFVBQVNDLElBQVQsRUFBYztBQUNoQyxnQkFBR3RCLFdBQVd1QixTQUFYLEVBQUgsRUFBMEI7QUFDdEJwQjtBQUNILGFBRkQsTUFFSztBQUNELG9CQUFHQyxnQkFBSCxFQUFvQjtBQUNoQkosK0JBQVd3QixJQUFYLENBQWdCcEIsZ0JBQWhCO0FBQ0FEO0FBQ0g7QUFDSjtBQUNKLFNBVEQsRUFTR0YsSUFUSDs7QUFXQUEsYUFBS3dCLE9BQUwsR0FBZSxZQUFLO0FBQ2hCekIsdUJBQVcwQixLQUFYOztBQUVBWiw4QkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0Qjs7QUFFQWI7QUFDSCxTQU5EO0FBT0gsS0FuQ0QsQ0FtQ0MsT0FBTXlCLEtBQU4sRUFBWTtBQUNULGNBQU0sSUFBSUMsS0FBSixDQUFVRCxLQUFWLENBQU47QUFDSDs7QUFFRCxXQUFPMUIsSUFBUDtBQUNILENBOUNEOztrQkFpRGVKLFkiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAxNC4uXG4gKi9cbmltcG9ydCBDb3JlUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9Db3JlXCI7XG5pbXBvcnQge1BST1ZJREVSX0RBU0gsIENPTlRFTlRfTUVUQX0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBkYXNoanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5cbmNvbnN0IERhc2hQcm92aWRlciA9IGZ1bmN0aW9uKGVsZW1lbnQsIHBsYXllckNvbmZpZyl7XG4gICAgbGV0IGRhc2hPYmplY3QgPSBcIlwiO1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IHN1cGVyX2Rlc3Ryb3kgPSBcIlwiLCBzdXBlcl9wbGF5ID0gXCJcIjtcblxuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcbiAgICB0cnkge1xuXG4gICAgICAgIGRhc2hPYmplY3QgPSBkYXNoanMuTWVkaWFQbGF5ZXIoKS5jcmVhdGUoKTtcbiAgICAgICAgZGFzaE9iamVjdC5nZXREZWJ1ZygpLnNldExvZ1RvQnJvd3NlckNvbnNvbGUoZmFsc2UpO1xuICAgICAgICBkYXNoT2JqZWN0LmluaXRpYWxpemUoZWxlbWVudCwgbnVsbCwgZmFsc2UpO1xuXG4gICAgICAgIGNvbnN0IHNvdXJjZUxvYWRlZCA9IChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pID0+IHtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBzb3VyY2UgbG9hZGVkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgZGFzaE9iamVjdC5hdHRhY2hTb3VyY2Uoc291cmNlLmZpbGUpO1xuICAgICAgICAgICAgc2Vla1Bvc2l0aW9uX3NlYyA9IGxhc3RQbGF5UG9zaXRpb247XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdCA9IENvcmVQcm92aWRlcihQUk9WSURFUl9EQVNILCBkYXNoT2JqZWN0LCBwbGF5ZXJDb25maWcsIHNvdXJjZUxvYWRlZCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcbiAgICAgICAgc3VwZXJfcGxheSA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcbiAgICAgICAgc3VwZXJfZGVzdHJveSA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGF0Lm9uKENPTlRFTlRfTUVUQSwgZnVuY3Rpb24obWV0YSl7XG4gICAgICAgICAgICBpZihkYXNoT2JqZWN0LmlzRHluYW1pYygpKXtcbiAgICAgICAgICAgICAgICBzdXBlcl9wbGF5KCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZihzZWVrUG9zaXRpb25fc2VjKXtcbiAgICAgICAgICAgICAgICAgICAgZGFzaE9iamVjdC5zZWVrKHNlZWtQb3NpdGlvbl9zZWMpO1xuICAgICAgICAgICAgICAgICAgICBzdXBlcl9wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGF0KTtcblxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgICAgIGRhc2hPYmplY3QucmVzZXQoKTtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XG5cbiAgICAgICAgICAgIHN1cGVyX2Rlc3Ryb3koKTtcbiAgICAgICAgfTtcbiAgICB9Y2F0Y2goZXJyb3Ipe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBEYXNoUHJvdmlkZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9