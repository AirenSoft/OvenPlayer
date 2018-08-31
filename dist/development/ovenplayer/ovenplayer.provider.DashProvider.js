/*! OvenPlayerv0.7.1 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   dashjs provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

var Dash = function Dash(container, playerConfig) {

    var mediaManager = (0, _Manager2.default)(container, _constants.PROVIDER_DASH);
    var element = mediaManager.create();

    var dashObject = "";
    var that = {};
    var super_destroy = "",
        super_play = "";
    var seekPosition_sec = 0;

    try {

        dashObject = dashjs.MediaPlayer().create();
        dashObject.getDebug().setLogToBrowserConsole(false);
        dashObject.initialize(element, null, false);

        var onBeforeLoad = function onBeforeLoad(source, lastPlayPosition) {
            OvenPlayerConsole.log("DASH : onBeforeLoad : ", source, "lastPlayPosition : " + lastPlayPosition);
            dashObject.attachSource(source.file);
            seekPosition_sec = lastPlayPosition;
        };

        that = (0, _Provider2.default)(_constants.PROVIDER_DASH, dashObject, playerConfig, onBeforeLoad);
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
exports.default = Dash;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0Rhc2guanMiXSwibmFtZXMiOlsiRGFzaCIsImNvbnRhaW5lciIsInBsYXllckNvbmZpZyIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX0RBU0giLCJlbGVtZW50IiwiY3JlYXRlIiwiZGFzaE9iamVjdCIsInRoYXQiLCJzdXBlcl9kZXN0cm95Iiwic3VwZXJfcGxheSIsInNlZWtQb3NpdGlvbl9zZWMiLCJkYXNoanMiLCJNZWRpYVBsYXllciIsImdldERlYnVnIiwic2V0TG9nVG9Ccm93c2VyQ29uc29sZSIsImluaXRpYWxpemUiLCJvbkJlZm9yZUxvYWQiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJhdHRhY2hTb3VyY2UiLCJmaWxlIiwic3VwZXIiLCJvbiIsIkNPTlRFTlRfTUVUQSIsIm1ldGEiLCJpc0R5bmFtaWMiLCJzZWVrIiwiZGVzdHJveSIsInJlc2V0IiwiZXJyb3IiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBT0EsSUFBTUEsT0FBTyxTQUFQQSxJQUFPLENBQVNDLFNBQVQsRUFBb0JDLFlBQXBCLEVBQWlDOztBQUUxQyxRQUFJQyxlQUFlLHVCQUFhRixTQUFiLEVBQXdCRyx3QkFBeEIsQ0FBbkI7QUFDQSxRQUFJQyxVQUFVRixhQUFhRyxNQUFiLEVBQWQ7O0FBRUEsUUFBSUMsYUFBYSxFQUFqQjtBQUNBLFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLGdCQUFnQixFQUFwQjtBQUFBLFFBQXdCQyxhQUFhLEVBQXJDO0FBQ0EsUUFBSUMsbUJBQW1CLENBQXZCOztBQUlBLFFBQUk7O0FBRUFKLHFCQUFhSyxPQUFPQyxXQUFQLEdBQXFCUCxNQUFyQixFQUFiO0FBQ0FDLG1CQUFXTyxRQUFYLEdBQXNCQyxzQkFBdEIsQ0FBNkMsS0FBN0M7QUFDQVIsbUJBQVdTLFVBQVgsQ0FBc0JYLE9BQXRCLEVBQStCLElBQS9CLEVBQXFDLEtBQXJDOztBQUVBLFlBQU1ZLGVBQWUsU0FBZkEsWUFBZSxDQUFDQyxNQUFELEVBQVNDLGdCQUFULEVBQThCO0FBQy9DQyw4QkFBa0JDLEdBQWxCLENBQXNCLHdCQUF0QixFQUFnREgsTUFBaEQsRUFBd0Qsd0JBQXVCQyxnQkFBL0U7QUFDQVosdUJBQVdlLFlBQVgsQ0FBd0JKLE9BQU9LLElBQS9CO0FBQ0FaLCtCQUFtQlEsZ0JBQW5CO0FBQ0gsU0FKRDs7QUFNQVgsZUFBTyx3QkFBU0osd0JBQVQsRUFBd0JHLFVBQXhCLEVBQW9DTCxZQUFwQyxFQUFrRGUsWUFBbEQsQ0FBUDtBQUNBRywwQkFBa0JDLEdBQWxCLENBQXNCLHVCQUF0QjtBQUNBWCxxQkFBYUYsS0FBS2dCLEtBQUwsQ0FBVyxNQUFYLENBQWI7QUFDQWYsd0JBQWdCRCxLQUFLZ0IsS0FBTCxDQUFXLFNBQVgsQ0FBaEI7O0FBRUFoQixhQUFLaUIsRUFBTCxDQUFRQyx1QkFBUixFQUFzQixVQUFTQyxJQUFULEVBQWM7QUFDaEMsZ0JBQUdwQixXQUFXcUIsU0FBWCxFQUFILEVBQTBCO0FBQ3RCbEI7QUFDSCxhQUZELE1BRUs7QUFDRCxvQkFBR0MsZ0JBQUgsRUFBb0I7QUFDaEJKLCtCQUFXc0IsSUFBWCxDQUFnQmxCLGdCQUFoQjtBQUNBRDtBQUNIO0FBQ0o7QUFDSixTQVRELEVBU0dGLElBVEg7O0FBV0FBLGFBQUtzQixPQUFMLEdBQWUsWUFBSztBQUNoQnZCLHVCQUFXd0IsS0FBWDtBQUNBNUIseUJBQWEyQixPQUFiO0FBQ0FWLDhCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCOztBQUVBWjtBQUNILFNBTkQ7QUFPSCxLQW5DRCxDQW1DQyxPQUFNdUIsS0FBTixFQUFZO0FBQ1QsY0FBTSxJQUFJQyxLQUFKLENBQVVELEtBQVYsQ0FBTjtBQUNIOztBQUVELFdBQU94QixJQUFQO0FBQ0gsQ0FwREQsQyxDQWRBOzs7a0JBcUVlUixJIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTQuLlxuICovXG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcbmltcG9ydCB7UFJPVklERVJfREFTSCwgQ09OVEVOVF9NRVRBfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIGRhc2hqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgZWxlbWVudCB2aWRlbyBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cblxuY29uc3QgRGFzaCA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgcGxheWVyQ29uZmlnKXtcblxuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyLCBQUk9WSURFUl9EQVNIKTtcbiAgICBsZXQgZWxlbWVudCA9IG1lZGlhTWFuYWdlci5jcmVhdGUoKTtcblxuICAgIGxldCBkYXNoT2JqZWN0ID0gXCJcIjtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBzdXBlcl9kZXN0cm95ID0gXCJcIiwgc3VwZXJfcGxheSA9IFwiXCI7XG4gICAgbGV0IHNlZWtQb3NpdGlvbl9zZWMgPSAwO1xuXG5cblxuICAgIHRyeSB7XG5cbiAgICAgICAgZGFzaE9iamVjdCA9IGRhc2hqcy5NZWRpYVBsYXllcigpLmNyZWF0ZSgpO1xuICAgICAgICBkYXNoT2JqZWN0LmdldERlYnVnKCkuc2V0TG9nVG9Ccm93c2VyQ29uc29sZShmYWxzZSk7XG4gICAgICAgIGRhc2hPYmplY3QuaW5pdGlhbGl6ZShlbGVtZW50LCBudWxsLCBmYWxzZSk7XG5cbiAgICAgICAgY29uc3Qgb25CZWZvcmVMb2FkID0gKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbikgPT4ge1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IG9uQmVmb3JlTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGRhc2hPYmplY3QuYXR0YWNoU291cmNlKHNvdXJjZS5maWxlKTtcbiAgICAgICAgICAgIHNlZWtQb3NpdGlvbl9zZWMgPSBsYXN0UGxheVBvc2l0aW9uO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihQUk9WSURFUl9EQVNILCBkYXNoT2JqZWN0LCBwbGF5ZXJDb25maWcsIG9uQmVmb3JlTG9hZCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcbiAgICAgICAgc3VwZXJfcGxheSA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcbiAgICAgICAgc3VwZXJfZGVzdHJveSA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcblxuICAgICAgICB0aGF0Lm9uKENPTlRFTlRfTUVUQSwgZnVuY3Rpb24obWV0YSl7XG4gICAgICAgICAgICBpZihkYXNoT2JqZWN0LmlzRHluYW1pYygpKXtcbiAgICAgICAgICAgICAgICBzdXBlcl9wbGF5KCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZihzZWVrUG9zaXRpb25fc2VjKXtcbiAgICAgICAgICAgICAgICAgICAgZGFzaE9iamVjdC5zZWVrKHNlZWtQb3NpdGlvbl9zZWMpO1xuICAgICAgICAgICAgICAgICAgICBzdXBlcl9wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGF0KTtcblxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgICAgIGRhc2hPYmplY3QucmVzZXQoKTtcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcblxuICAgICAgICAgICAgc3VwZXJfZGVzdHJveSgpO1xuICAgICAgICB9O1xuICAgIH1jYXRjaChlcnJvcil7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IERhc2g7Il0sInNvdXJjZVJvb3QiOiIifQ==