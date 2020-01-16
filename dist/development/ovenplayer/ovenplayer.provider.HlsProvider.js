/*! OvenPlayerv0.9.850 | (c)2020 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var _Provider = __webpack_require__(/*! api/provider/html5/Provider */ "./src/js/api/provider/html5/Provider.js");

var _Provider2 = _interopRequireDefault(_Provider);

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _constants2 = __webpack_require__(/*! ../../../constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   hlsjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

var HlsProvider = function HlsProvider(element, playerConfig, adTagUrl) {
    var that = {};
    var hls = null;
    var superDestroy_func = null;

    try {
        hls = new Hls({
            debug: false,
            maxBufferLength: 20,
            maxMaxBufferLength: 30
        });
        hls.attachMedia(element);

        var spec = {
            name: _constants.PROVIDER_HLS,
            element: element,
            mse: hls,
            listener: null,
            isLoaded: false,
            canSeek: false,
            isLive: false,
            seeking: false,
            state: _constants.STATE_IDLE,
            buffer: 0,
            framerate: 0,
            currentQuality: -1,
            currentSource: -1,
            qualityLevels: [],
            sources: [],
            adTagUrl: adTagUrl
        };
        that = (0, _Provider2["default"])(spec, playerConfig, function (source, lastPlayPosition) {
            OvenPlayerConsole.log("HLS : onExtendedLoad : ", source, "lastPlayPosition : " + lastPlayPosition);

            hls.loadSource(source.file);

            hls.once(Hls.Events.LEVEL_LOADED, function (event, data) {
                if (data.details.live) {
                    spec.isLive = true;
                } else {
                    if (lastPlayPosition > 0) {
                        //element.seek(lastPlayPosition);
                        that.seek(lastPlayPosition);
                    }
                }
                if (playerConfig.isAutoStart()) {
                    that.play();
                }
            });

            hls.on(Hls.Events.ERROR, function (event, data) {
                var tempError = _constants.ERRORS.codes[_constants2.PLAYER_UNKNWON_NEWWORK_ERROR];
                tempError.error = data.details;
                (0, _utils.errorTrigger)(tempError, that);
            });
        });

        superDestroy_func = that["super"]('destroy');
        OvenPlayerConsole.log("HLS PROVIDER LOADED.");

        that.destroy = function () {
            hls.destroy();
            hls = null;
            OvenPlayerConsole.log("HLS : PROVIDER DESTROUYED.");
            superDestroy_func();
        };
    } catch (error) {
        var tempError = _constants.ERRORS.codes[_constants.INIT_HLSJS_NOTFOUND];
        tempError.error = error;
        throw tempError;
    }

    return that;
}; /**
    * Created by hoho on 2018. 6. 7..
    */
exports["default"] = HlsProvider;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJIbHMiLCJkZWJ1ZyIsIm1heEJ1ZmZlckxlbmd0aCIsIm1heE1heEJ1ZmZlckxlbmd0aCIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRTb3VyY2UiLCJmaWxlIiwib25jZSIsIkV2ZW50cyIsIkxFVkVMX0xPQURFRCIsImV2ZW50IiwiZGF0YSIsImRldGFpbHMiLCJsaXZlIiwic2VlayIsImlzQXV0b1N0YXJ0IiwicGxheSIsIm9uIiwiRVJST1IiLCJ0ZW1wRXJyb3IiLCJFUlJPUlMiLCJjb2RlcyIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJlcnJvciIsImRlc3Ryb3kiLCJJTklUX0hMU0pTX05PVEZPVU5EIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFPQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsQ0FBU0MsT0FBVCxFQUFrQkMsWUFBbEIsRUFBZ0NDLFFBQWhDLEVBQXlDO0FBQ3pELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE1BQU0sSUFBVjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4Qjs7QUFFQSxRQUFJO0FBQ0FELGNBQU0sSUFBSUUsR0FBSixDQUFRO0FBQ1ZDLG1CQUFPLEtBREc7QUFFVkMsNkJBQWlCLEVBRlA7QUFHVkMsZ0NBQW9CO0FBSFYsU0FBUixDQUFOO0FBS0FMLFlBQUlNLFdBQUosQ0FBZ0JWLE9BQWhCOztBQUdBLFlBQUlXLE9BQU87QUFDUEMsa0JBQU9DLHVCQURBO0FBRVBiLHFCQUFVQSxPQUZIO0FBR1BjLGlCQUFNVixHQUhDO0FBSVBXLHNCQUFXLElBSko7QUFLUEMsc0JBQVcsS0FMSjtBQU1QQyxxQkFBVSxLQU5IO0FBT1BDLG9CQUFTLEtBUEY7QUFRUEMscUJBQVUsS0FSSDtBQVNQQyxtQkFBUUMscUJBVEQ7QUFVUEMsb0JBQVMsQ0FWRjtBQVdQQyx1QkFBWSxDQVhMO0FBWVBDLDRCQUFpQixDQUFDLENBWlg7QUFhUEMsMkJBQWdCLENBQUMsQ0FiVjtBQWNQQywyQkFBZ0IsRUFkVDtBQWVQQyxxQkFBVSxFQWZIO0FBZ0JQekIsc0JBQVdBO0FBaEJKLFNBQVg7QUFrQkFDLGVBQU8sMkJBQVNRLElBQVQsRUFBZVYsWUFBZixFQUE2QixVQUFTMkIsTUFBVCxFQUFpQkMsZ0JBQWpCLEVBQWtDO0FBQ2xFQyw4QkFBa0JDLEdBQWxCLENBQXNCLHlCQUF0QixFQUFpREgsTUFBakQsRUFBeUQsd0JBQXVCQyxnQkFBaEY7O0FBRUF6QixnQkFBSTRCLFVBQUosQ0FBZUosT0FBT0ssSUFBdEI7O0FBRUE3QixnQkFBSThCLElBQUosQ0FBUzVCLElBQUk2QixNQUFKLENBQVdDLFlBQXBCLEVBQWtDLFVBQVVDLEtBQVYsRUFBaUJDLElBQWpCLEVBQXVCO0FBQ3JELG9CQUFHQSxLQUFLQyxPQUFMLENBQWFDLElBQWhCLEVBQXFCO0FBQ2pCN0IseUJBQUtPLE1BQUwsR0FBYyxJQUFkO0FBQ0gsaUJBRkQsTUFFSztBQUNELHdCQUFHVyxtQkFBbUIsQ0FBdEIsRUFBeUI7QUFDckI7QUFDQTFCLDZCQUFLc0MsSUFBTCxDQUFVWixnQkFBVjtBQUNIO0FBQ0o7QUFDRCxvQkFBRzVCLGFBQWF5QyxXQUFiLEVBQUgsRUFBOEI7QUFDMUJ2Qyx5QkFBS3dDLElBQUw7QUFDSDtBQUNKLGFBWkQ7O0FBY0F2QyxnQkFBSXdDLEVBQUosQ0FBT3RDLElBQUk2QixNQUFKLENBQVdVLEtBQWxCLEVBQXlCLFVBQVVSLEtBQVYsRUFBaUJDLElBQWpCLEVBQXVCO0FBQzVDLG9CQUFJUSxZQUFZQyxrQkFBT0MsS0FBUCxDQUFhQyx3Q0FBYixDQUFoQjtBQUNBSCwwQkFBVUksS0FBVixHQUFrQlosS0FBS0MsT0FBdkI7QUFDQSx5Q0FBYU8sU0FBYixFQUF3QjNDLElBQXhCO0FBQ0gsYUFKRDtBQUtILFNBeEJNLENBQVA7O0FBMEJBRSw0QkFBb0JGLGNBQVcsU0FBWCxDQUFwQjtBQUNBMkIsMEJBQWtCQyxHQUFsQixDQUFzQixzQkFBdEI7O0FBRUE1QixhQUFLZ0QsT0FBTCxHQUFlLFlBQUs7QUFDaEIvQyxnQkFBSStDLE9BQUo7QUFDQS9DLGtCQUFNLElBQU47QUFDQTBCLDhCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCO0FBQ0ExQjtBQUNILFNBTEQ7QUFNSCxLQTlERCxDQThEQyxPQUFNNkMsS0FBTixFQUFZO0FBQ1QsWUFBSUosWUFBYUMsa0JBQU9DLEtBQVAsQ0FBYUksOEJBQWIsQ0FBakI7QUFDQU4sa0JBQVVJLEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0EsY0FBTUosU0FBTjtBQUNIOztBQUVELFdBQU8zQyxJQUFQO0FBQ0gsQ0ExRUQsQyxDQWxCQTs7O3FCQStGZUosVyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gNy4uXG4gKi9cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtQUk9WSURFUl9ITFMsIFNUQVRFX0lETEUsXG4gICAgSU5JVF9EQVNIX1VOU1VQUE9SVCwgRVJST1JTLFxuICAgIElOSVRfSExTSlNfTk9URk9VTkR9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuaW1wb3J0IHtQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SfSBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgaGxzanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5cbmNvbnN0IEhsc1Byb3ZpZGVyID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgaGxzID0gbnVsbDtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgaGxzID0gbmV3IEhscyh7XG4gICAgICAgICAgICBkZWJ1ZzogZmFsc2UsXG4gICAgICAgICAgICBtYXhCdWZmZXJMZW5ndGg6IDIwLFxuICAgICAgICAgICAgbWF4TWF4QnVmZmVyTGVuZ3RoOiAzMFxuICAgICAgICB9KTtcbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKGVsZW1lbnQpO1xuXG5cbiAgICAgICAgbGV0IHNwZWMgPSB7XG4gICAgICAgICAgICBuYW1lIDogUFJPVklERVJfSExTLFxuICAgICAgICAgICAgZWxlbWVudCA6IGVsZW1lbnQsXG4gICAgICAgICAgICBtc2UgOiBobHMsXG4gICAgICAgICAgICBsaXN0ZW5lciA6IG51bGwsXG4gICAgICAgICAgICBpc0xvYWRlZCA6IGZhbHNlLFxuICAgICAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxuICAgICAgICAgICAgaXNMaXZlIDogZmFsc2UsXG4gICAgICAgICAgICBzZWVraW5nIDogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXG4gICAgICAgICAgICBidWZmZXIgOiAwLFxuICAgICAgICAgICAgZnJhbWVyYXRlIDogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXG4gICAgICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXG4gICAgICAgICAgICBzb3VyY2VzIDogW10sXG4gICAgICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXG4gICAgICAgIH07XG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbil7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBvbkV4dGVuZGVkTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcblxuICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xuXG4gICAgICAgICAgICBobHMub25jZShIbHMuRXZlbnRzLkxFVkVMX0xPQURFRCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5kZXRhaWxzLmxpdmUpe1xuICAgICAgICAgICAgICAgICAgICBzcGVjLmlzTGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2VsZW1lbnQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBobHMub24oSGxzLkV2ZW50cy5FUlJPUiwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBkYXRhLmRldGFpbHM7XG4gICAgICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKHRlbXBFcnJvciwgdGhhdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyBQUk9WSURFUiBMT0FERUQuXCIpO1xuXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICAgICAgaGxzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGhscyA9IG51bGw7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBQUk9WSURFUiBERVNUUk9VWUVELlwiKTtcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgICAgIH07XG4gICAgfWNhdGNoKGVycm9yKXtcbiAgICAgICAgbGV0IHRlbXBFcnJvciA9ICBFUlJPUlMuY29kZXNbSU5JVF9ITFNKU19OT1RGT1VORF07XG4gICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICB0aHJvdyB0ZW1wRXJyb3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IEhsc1Byb3ZpZGVyOyJdLCJzb3VyY2VSb290IjoiIn0=