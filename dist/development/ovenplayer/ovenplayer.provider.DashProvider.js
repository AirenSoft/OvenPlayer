/*! OvenPlayerv0.7.3 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L0Rhc2guanMiXSwibmFtZXMiOlsiRGFzaCIsImNvbnRhaW5lciIsInBsYXllckNvbmZpZyIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX0RBU0giLCJlbGVtZW50IiwiY3JlYXRlIiwiZGFzaE9iamVjdCIsInRoYXQiLCJzdXBlcl9kZXN0cm95Iiwic3VwZXJfcGxheSIsInNlZWtQb3NpdGlvbl9zZWMiLCJkYXNoanMiLCJNZWRpYVBsYXllciIsImdldERlYnVnIiwic2V0TG9nVG9Ccm93c2VyQ29uc29sZSIsImluaXRpYWxpemUiLCJvbkJlZm9yZUxvYWQiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJhdHRhY2hTb3VyY2UiLCJmaWxlIiwic3VwZXIiLCJvbiIsIkNPTlRFTlRfTUVUQSIsIm1ldGEiLCJpc0R5bmFtaWMiLCJzZWVrIiwiZGVzdHJveSIsInJlc2V0IiwiZXJyb3IiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBT0EsSUFBTUEsT0FBTyxTQUFQQSxJQUFPLENBQVNDLFNBQVQsRUFBb0JDLFlBQXBCLEVBQWlDOztBQUUxQyxRQUFJQyxlQUFlLHVCQUFhRixTQUFiLEVBQXdCRyx3QkFBeEIsQ0FBbkI7QUFDQSxRQUFJQyxVQUFVRixhQUFhRyxNQUFiLEVBQWQ7O0FBRUEsUUFBSUMsYUFBYSxFQUFqQjtBQUNBLFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLGdCQUFnQixFQUFwQjtBQUFBLFFBQXdCQyxhQUFhLEVBQXJDO0FBQ0EsUUFBSUMsbUJBQW1CLENBQXZCOztBQUlBLFFBQUk7O0FBRUFKLHFCQUFhSyxPQUFPQyxXQUFQLEdBQXFCUCxNQUFyQixFQUFiO0FBQ0FDLG1CQUFXTyxRQUFYLEdBQXNCQyxzQkFBdEIsQ0FBNkMsS0FBN0M7QUFDQVIsbUJBQVdTLFVBQVgsQ0FBc0JYLE9BQXRCLEVBQStCLElBQS9CLEVBQXFDLEtBQXJDOztBQUVBLFlBQU1ZLGVBQWUsU0FBZkEsWUFBZSxDQUFDQyxNQUFELEVBQVNDLGdCQUFULEVBQThCO0FBQy9DQyw4QkFBa0JDLEdBQWxCLENBQXNCLHdCQUF0QixFQUFnREgsTUFBaEQsRUFBd0Qsd0JBQXVCQyxnQkFBL0U7QUFDQVosdUJBQVdlLFlBQVgsQ0FBd0JKLE9BQU9LLElBQS9CO0FBQ0FaLCtCQUFtQlEsZ0JBQW5CO0FBQ0gsU0FKRDs7QUFNQVgsZUFBTyx3QkFBU0osd0JBQVQsRUFBd0JHLFVBQXhCLEVBQW9DTCxZQUFwQyxFQUFrRGUsWUFBbEQsQ0FBUDtBQUNBRywwQkFBa0JDLEdBQWxCLENBQXNCLHVCQUF0QjtBQUNBWCxxQkFBYUYsS0FBS2dCLEtBQUwsQ0FBVyxNQUFYLENBQWI7QUFDQWYsd0JBQWdCRCxLQUFLZ0IsS0FBTCxDQUFXLFNBQVgsQ0FBaEI7O0FBRUFoQixhQUFLaUIsRUFBTCxDQUFRQyx1QkFBUixFQUFzQixVQUFTQyxJQUFULEVBQWM7QUFDaEMsZ0JBQUdwQixXQUFXcUIsU0FBWCxFQUFILEVBQTBCO0FBQ3RCbEI7QUFDSCxhQUZELE1BRUs7QUFDRCxvQkFBR0MsZ0JBQUgsRUFBb0I7QUFDaEJKLCtCQUFXc0IsSUFBWCxDQUFnQmxCLGdCQUFoQjtBQUNBRDtBQUNIO0FBQ0o7QUFDSixTQVRELEVBU0dGLElBVEg7O0FBV0FBLGFBQUtzQixPQUFMLEdBQWUsWUFBSztBQUNoQnZCLHVCQUFXd0IsS0FBWDtBQUNBNUIseUJBQWEyQixPQUFiO0FBQ0FWLDhCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCOztBQUVBWjtBQUNILFNBTkQ7QUFPSCxLQW5DRCxDQW1DQyxPQUFNdUIsS0FBTixFQUFZO0FBQ1QsY0FBTSxJQUFJQyxLQUFKLENBQVVELEtBQVYsQ0FBTjtBQUNIOztBQUVELFdBQU94QixJQUFQO0FBQ0gsQ0FwREQsQyxDQWRBOzs7a0JBcUVlUixJIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAxNC4uXHJcbiAqL1xyXG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xyXG5pbXBvcnQge1BST1ZJREVSX0RBU0gsIENPTlRFTlRfTUVUQX0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBkYXNoanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cclxuICogQHBhcmFtICAgZWxlbWVudCB2aWRlbyBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IERhc2ggPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcblxyXG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIFBST1ZJREVSX0RBU0gpO1xyXG4gICAgbGV0IGVsZW1lbnQgPSBtZWRpYU1hbmFnZXIuY3JlYXRlKCk7XHJcblxyXG4gICAgbGV0IGRhc2hPYmplY3QgPSBcIlwiO1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIGxldCBzdXBlcl9kZXN0cm95ID0gXCJcIiwgc3VwZXJfcGxheSA9IFwiXCI7XHJcbiAgICBsZXQgc2Vla1Bvc2l0aW9uX3NlYyA9IDA7XHJcblxyXG5cclxuXHJcbiAgICB0cnkge1xyXG5cclxuICAgICAgICBkYXNoT2JqZWN0ID0gZGFzaGpzLk1lZGlhUGxheWVyKCkuY3JlYXRlKCk7XHJcbiAgICAgICAgZGFzaE9iamVjdC5nZXREZWJ1ZygpLnNldExvZ1RvQnJvd3NlckNvbnNvbGUoZmFsc2UpO1xyXG4gICAgICAgIGRhc2hPYmplY3QuaW5pdGlhbGl6ZShlbGVtZW50LCBudWxsLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9uQmVmb3JlTG9hZCA9IChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pID0+IHtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IG9uQmVmb3JlTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgZGFzaE9iamVjdC5hdHRhY2hTb3VyY2Uoc291cmNlLmZpbGUpO1xyXG4gICAgICAgICAgICBzZWVrUG9zaXRpb25fc2VjID0gbGFzdFBsYXlQb3NpdGlvbjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0ID0gUHJvdmlkZXIoUFJPVklERVJfREFTSCwgZGFzaE9iamVjdCwgcGxheWVyQ29uZmlnLCBvbkJlZm9yZUxvYWQpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcclxuICAgICAgICBzdXBlcl9wbGF5ID0gdGhhdC5zdXBlcigncGxheScpO1xyXG4gICAgICAgIHN1cGVyX2Rlc3Ryb3kgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XHJcblxyXG4gICAgICAgIHRoYXQub24oQ09OVEVOVF9NRVRBLCBmdW5jdGlvbihtZXRhKXtcclxuICAgICAgICAgICAgaWYoZGFzaE9iamVjdC5pc0R5bmFtaWMoKSl7XHJcbiAgICAgICAgICAgICAgICBzdXBlcl9wbGF5KCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoc2Vla1Bvc2l0aW9uX3NlYyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGFzaE9iamVjdC5zZWVrKHNlZWtQb3NpdGlvbl9zZWMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyX3BsYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoYXQpO1xyXG5cclxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICAgICAgZGFzaE9iamVjdC5yZXNldCgpO1xyXG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcclxuXHJcbiAgICAgICAgICAgIHN1cGVyX2Rlc3Ryb3koKTtcclxuICAgICAgICB9O1xyXG4gICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2g7Il0sInNvdXJjZVJvb3QiOiIifQ==