/*! OvenPlayerv0.6.1 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2Rhc2gvRGFzaC5qcyJdLCJuYW1lcyI6WyJEYXNoUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiZGFzaE9iamVjdCIsInRoYXQiLCJzdXBlcl9kZXN0cm95Iiwic3VwZXJfcGxheSIsInNlZWtQb3NpdGlvbl9zZWMiLCJkYXNoanMiLCJNZWRpYVBsYXllciIsImNyZWF0ZSIsImdldERlYnVnIiwic2V0TG9nVG9Ccm93c2VyQ29uc29sZSIsImluaXRpYWxpemUiLCJzb3VyY2VMb2FkZWQiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJhdHRhY2hTb3VyY2UiLCJmaWxlIiwiUFJPVklERVJfREFTSCIsInN1cGVyIiwib24iLCJDT05URU5UX01FVEEiLCJtZXRhIiwiaXNEeW5hbWljIiwic2VlayIsImRlc3Ryb3kiLCJyZXNldCIsImVycm9yIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFOQTs7O0FBYUEsSUFBTUEsZUFBZSxTQUFmQSxZQUFlLENBQVNDLE9BQVQsRUFBa0JDLFlBQWxCLEVBQStCO0FBQ2hELFFBQUlDLGFBQWEsRUFBakI7QUFDQSxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxnQkFBZ0IsRUFBcEI7QUFBQSxRQUF3QkMsYUFBYSxFQUFyQzs7QUFFQSxRQUFJQyxtQkFBbUIsQ0FBdkI7QUFDQSxRQUFJOztBQUVBSixxQkFBYUssT0FBT0MsV0FBUCxHQUFxQkMsTUFBckIsRUFBYjtBQUNBUCxtQkFBV1EsUUFBWCxHQUFzQkMsc0JBQXRCLENBQTZDLEtBQTdDO0FBQ0FULG1CQUFXVSxVQUFYLENBQXNCWixPQUF0QixFQUErQixJQUEvQixFQUFxQyxLQUFyQzs7QUFFQSxZQUFNYSxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsTUFBRCxFQUFTQyxnQkFBVCxFQUE4QjtBQUMvQ0MsOEJBQWtCQyxHQUFsQixDQUFzQix5QkFBdEIsRUFBaURILE1BQWpELEVBQXlELHdCQUF1QkMsZ0JBQWhGO0FBQ0FiLHVCQUFXZ0IsWUFBWCxDQUF3QkosT0FBT0ssSUFBL0I7QUFDQWIsK0JBQW1CUyxnQkFBbkI7QUFDSCxTQUpEOztBQU1BWixlQUFPLG9CQUFhaUIsd0JBQWIsRUFBNEJsQixVQUE1QixFQUF3Q0QsWUFBeEMsRUFBc0RZLFlBQXRELENBQVA7QUFDQUcsMEJBQWtCQyxHQUFsQixDQUFzQix1QkFBdEI7QUFDQVoscUJBQWFGLEtBQUtrQixLQUFMLENBQVcsTUFBWCxDQUFiO0FBQ0FqQix3QkFBZ0JELEtBQUtrQixLQUFMLENBQVcsU0FBWCxDQUFoQjs7QUFFQWxCLGFBQUttQixFQUFMLENBQVFDLHVCQUFSLEVBQXNCLFVBQVNDLElBQVQsRUFBYztBQUNoQyxnQkFBR3RCLFdBQVd1QixTQUFYLEVBQUgsRUFBMEI7QUFDdEJwQjtBQUNILGFBRkQsTUFFSztBQUNELG9CQUFHQyxnQkFBSCxFQUFvQjtBQUNoQkosK0JBQVd3QixJQUFYLENBQWdCcEIsZ0JBQWhCO0FBQ0FEO0FBQ0g7QUFDSjtBQUNKLFNBVEQ7O0FBV0FGLGFBQUt3QixPQUFMLEdBQWUsWUFBSztBQUNoQnpCLHVCQUFXMEIsS0FBWDs7QUFFQVosOEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7O0FBRUFiO0FBQ0gsU0FORDtBQU9ILEtBbkNELENBbUNDLE9BQU15QixLQUFOLEVBQVk7QUFDVCxjQUFNLElBQUlDLEtBQUosQ0FBVUQsS0FBVixDQUFOO0FBQ0g7O0FBRUQsV0FBTzFCLElBQVA7QUFDSCxDQTlDRDs7a0JBaURlSixZIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTQuLlxuICovXG5pbXBvcnQgQ29yZVByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvQ29yZVwiO1xuaW1wb3J0IHtQUk9WSURFUl9EQVNILCBDT05URU5UX01FVEF9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgZGFzaGpzIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXG4gKiBAcGFyYW0gICBlbGVtZW50IHZpZGVvIGVsZW1lbnQuXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxuICogKi9cblxuXG5jb25zdCBEYXNoUHJvdmlkZXIgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcpe1xuICAgIGxldCBkYXNoT2JqZWN0ID0gXCJcIjtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBzdXBlcl9kZXN0cm95ID0gXCJcIiwgc3VwZXJfcGxheSA9IFwiXCI7XG5cbiAgICBsZXQgc2Vla1Bvc2l0aW9uX3NlYyA9IDA7XG4gICAgdHJ5IHtcblxuICAgICAgICBkYXNoT2JqZWN0ID0gZGFzaGpzLk1lZGlhUGxheWVyKCkuY3JlYXRlKCk7XG4gICAgICAgIGRhc2hPYmplY3QuZ2V0RGVidWcoKS5zZXRMb2dUb0Jyb3dzZXJDb25zb2xlKGZhbHNlKTtcbiAgICAgICAgZGFzaE9iamVjdC5pbml0aWFsaXplKGVsZW1lbnQsIG51bGwsIGZhbHNlKTtcblxuICAgICAgICBjb25zdCBzb3VyY2VMb2FkZWQgPSAoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKSA9PiB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogc291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGRhc2hPYmplY3QuYXR0YWNoU291cmNlKHNvdXJjZS5maWxlKTtcbiAgICAgICAgICAgIHNlZWtQb3NpdGlvbl9zZWMgPSBsYXN0UGxheVBvc2l0aW9uO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBDb3JlUHJvdmlkZXIoUFJPVklERVJfREFTSCwgZGFzaE9iamVjdCwgcGxheWVyQ29uZmlnLCBzb3VyY2VMb2FkZWQpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIFBST1ZJREVSIExPQURFRC5cIik7XG4gICAgICAgIHN1cGVyX3BsYXkgPSB0aGF0LnN1cGVyKCdwbGF5Jyk7XG4gICAgICAgIHN1cGVyX2Rlc3Ryb3kgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG5cbiAgICAgICAgdGhhdC5vbihDT05URU5UX01FVEEsIGZ1bmN0aW9uKG1ldGEpe1xuICAgICAgICAgICAgaWYoZGFzaE9iamVjdC5pc0R5bmFtaWMoKSl7XG4gICAgICAgICAgICAgICAgc3VwZXJfcGxheSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYoc2Vla1Bvc2l0aW9uX3NlYyl7XG4gICAgICAgICAgICAgICAgICAgIGRhc2hPYmplY3Quc2VlayhzZWVrUG9zaXRpb25fc2VjKTtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXJfcGxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgICAgICBkYXNoT2JqZWN0LnJlc2V0KCk7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xuXG4gICAgICAgICAgICBzdXBlcl9kZXN0cm95KCk7XG4gICAgICAgIH07XG4gICAgfWNhdGNoKGVycm9yKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgRGFzaFByb3ZpZGVyOyJdLCJzb3VyY2VSb290IjoiIn0=