/*! OvenPlayerv0.9.741 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   hlsjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

/**
 * Created by hoho on 2018. 6. 7..
 */
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
};

exports["default"] = HlsProvider;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJIbHMiLCJkZWJ1ZyIsIm1heEJ1ZmZlckxlbmd0aCIsIm1heE1heEJ1ZmZlckxlbmd0aCIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRTb3VyY2UiLCJmaWxlIiwib25jZSIsIkV2ZW50cyIsIkxFVkVMX0xPQURFRCIsImV2ZW50IiwiZGF0YSIsImRldGFpbHMiLCJsaXZlIiwic2VlayIsImlzQXV0b1N0YXJ0IiwicGxheSIsImRlc3Ryb3kiLCJlcnJvciIsInRlbXBFcnJvciIsIkVSUk9SUyIsImNvZGVzIiwiSU5JVF9ITFNKU19OT1RGT1VORCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOztBQUdBOzs7Ozs7QUFFQTs7Ozs7O0FBVkE7OztBQWlCQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsQ0FBU0MsT0FBVCxFQUFrQkMsWUFBbEIsRUFBZ0NDLFFBQWhDLEVBQXlDO0FBQ3pELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE1BQU0sSUFBVjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4Qjs7QUFFQSxRQUFJO0FBQ0FELGNBQU0sSUFBSUUsR0FBSixDQUFRO0FBQ1ZDLG1CQUFPLEtBREc7QUFFVkMsNkJBQWlCLEVBRlA7QUFHVkMsZ0NBQW9CO0FBSFYsU0FBUixDQUFOO0FBS0FMLFlBQUlNLFdBQUosQ0FBZ0JWLE9BQWhCOztBQUVBLFlBQUlXLE9BQU87QUFDUEMsa0JBQU9DLHVCQURBO0FBRVBiLHFCQUFVQSxPQUZIO0FBR1BjLGlCQUFNVixHQUhDO0FBSVBXLHNCQUFXLElBSko7QUFLUEMsc0JBQVcsS0FMSjtBQU1QQyxxQkFBVSxLQU5IO0FBT1BDLG9CQUFTLEtBUEY7QUFRUEMscUJBQVUsS0FSSDtBQVNQQyxtQkFBUUMscUJBVEQ7QUFVUEMsb0JBQVMsQ0FWRjtBQVdQQyx1QkFBWSxDQVhMO0FBWVBDLDRCQUFpQixDQUFDLENBWlg7QUFhUEMsMkJBQWdCLENBQUMsQ0FiVjtBQWNQQywyQkFBZ0IsRUFkVDtBQWVQQyxxQkFBVSxFQWZIO0FBZ0JQekIsc0JBQVdBO0FBaEJKLFNBQVg7QUFrQkFDLGVBQU8sMkJBQVNRLElBQVQsRUFBZVYsWUFBZixFQUE2QixVQUFTMkIsTUFBVCxFQUFpQkMsZ0JBQWpCLEVBQWtDO0FBQ2xFQyw4QkFBa0JDLEdBQWxCLENBQXNCLHlCQUF0QixFQUFpREgsTUFBakQsRUFBeUQsd0JBQXVCQyxnQkFBaEY7QUFDQXpCLGdCQUFJNEIsVUFBSixDQUFlSixPQUFPSyxJQUF0Qjs7QUFFQTdCLGdCQUFJOEIsSUFBSixDQUFTNUIsSUFBSTZCLE1BQUosQ0FBV0MsWUFBcEIsRUFBa0MsVUFBVUMsS0FBVixFQUFpQkMsSUFBakIsRUFBdUI7QUFDckQsb0JBQUdBLEtBQUtDLE9BQUwsQ0FBYUMsSUFBaEIsRUFBcUI7QUFDakI3Qix5QkFBS08sTUFBTCxHQUFjLElBQWQ7QUFDSCxpQkFGRCxNQUVLO0FBQ0Qsd0JBQUdXLG1CQUFtQixDQUF0QixFQUF5QjtBQUNyQjtBQUNBMUIsNkJBQUtzQyxJQUFMLENBQVVaLGdCQUFWO0FBQ0g7QUFDSjtBQUNELG9CQUFHNUIsYUFBYXlDLFdBQWIsRUFBSCxFQUE4QjtBQUMxQnZDLHlCQUFLd0MsSUFBTDtBQUNIO0FBQ0osYUFaRDtBQWVILFNBbkJNLENBQVA7O0FBcUJBdEMsNEJBQW9CRixjQUFXLFNBQVgsQ0FBcEI7QUFDQTJCLDBCQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXRCOztBQUVBNUIsYUFBS3lDLE9BQUwsR0FBZSxZQUFLO0FBQ2hCeEMsZ0JBQUl3QyxPQUFKO0FBQ0F4QyxrQkFBTSxJQUFOO0FBQ0EwQiw4QkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QjtBQUNBMUI7QUFDSCxTQUxEO0FBTUgsS0F4REQsQ0F3REMsT0FBTXdDLEtBQU4sRUFBWTtBQUNULFlBQUlDLFlBQWFDLGtCQUFPQyxLQUFQLENBQWFDLDhCQUFiLENBQWpCO0FBQ0FILGtCQUFVRCxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBLGNBQU1DLFNBQU47QUFDSDs7QUFFRCxXQUFPM0MsSUFBUDtBQUNILENBcEVEOztxQkF1RWVKLFciLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDcuLlxuICovXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7UFJPVklERVJfSExTLCBTVEFURV9JRExFLFxuICAgIElOSVRfREFTSF9VTlNVUFBPUlQsIEVSUk9SUyxcbiAgICBJTklUX0hMU0pTX05PVEZPVU5EfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBobHNqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cblxuY29uc3QgSGxzUHJvdmlkZXIgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBobHMgPSBudWxsO1xuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgICBobHMgPSBuZXcgSGxzKHtcbiAgICAgICAgICAgIGRlYnVnOiBmYWxzZSxcbiAgICAgICAgICAgIG1heEJ1ZmZlckxlbmd0aDogMjAsXG4gICAgICAgICAgICBtYXhNYXhCdWZmZXJMZW5ndGg6IDMwXG4gICAgICAgIH0pO1xuICAgICAgICBobHMuYXR0YWNoTWVkaWEoZWxlbWVudCk7XG5cbiAgICAgICAgbGV0IHNwZWMgPSB7XG4gICAgICAgICAgICBuYW1lIDogUFJPVklERVJfSExTLFxuICAgICAgICAgICAgZWxlbWVudCA6IGVsZW1lbnQsXG4gICAgICAgICAgICBtc2UgOiBobHMsXG4gICAgICAgICAgICBsaXN0ZW5lciA6IG51bGwsXG4gICAgICAgICAgICBpc0xvYWRlZCA6IGZhbHNlLFxuICAgICAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxuICAgICAgICAgICAgaXNMaXZlIDogZmFsc2UsXG4gICAgICAgICAgICBzZWVraW5nIDogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXG4gICAgICAgICAgICBidWZmZXIgOiAwLFxuICAgICAgICAgICAgZnJhbWVyYXRlIDogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXG4gICAgICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXG4gICAgICAgICAgICBzb3VyY2VzIDogW10sXG4gICAgICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXG4gICAgICAgIH07XG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbil7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBvbkV4dGVuZGVkTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZS5maWxlKTtcblxuICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5MRVZFTF9MT0FERUQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmKGRhdGEuZGV0YWlscy5saXZlKXtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5pc0xpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBpZihsYXN0UGxheVBvc2l0aW9uID4gMCApe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9lbGVtZW50LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgICAgIGhscy5kZXN0cm95KCk7XG4gICAgICAgICAgICBobHMgPSBudWxsO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogUFJPVklERVIgREVTVFJPVVlFRC5cIik7XG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xuICAgICAgICB9O1xuICAgIH1jYXRjaChlcnJvcil7XG4gICAgICAgIGxldCB0ZW1wRXJyb3IgPSAgRVJST1JTLmNvZGVzW0lOSVRfSExTSlNfTk9URk9VTkRdO1xuICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgdGhyb3cgdGVtcEVycm9yO1xuICAgIH1cblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBIbHNQcm92aWRlcjsiXSwic291cmNlUm9vdCI6IiJ9