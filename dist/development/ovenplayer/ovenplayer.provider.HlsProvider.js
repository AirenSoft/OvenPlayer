/*! OvenPlayerv0.9.5972 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        hls = new Hls({ debug: false });
        hls.attachMedia(element);

        var spec = {
            name: _constants.PROVIDER_HLS,
            element: element,
            mse: hls,
            listener: null,
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
                console.log("Hls.Events.LEVEL_LOADED");
                console.log(data.details.live);
                if (data.details.live) {
                    spec.isLive = true;
                } else {
                    if (lastPlayPosition > 0) {
                        element.seek(lastPlayPosition);
                        that.play();
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
        var tempError = _constants.ERRORS[_constants.INIT_HLSJS_NOTFOUND];
        tempError.error = error;
        throw tempError;
    }

    return that;
};

exports["default"] = HlsProvider;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJIbHMiLCJkZWJ1ZyIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJsb2FkU291cmNlIiwiZmlsZSIsIm9uY2UiLCJFdmVudHMiLCJMRVZFTF9MT0FERUQiLCJldmVudCIsImRhdGEiLCJjb25zb2xlIiwiZGV0YWlscyIsImxpdmUiLCJzZWVrIiwicGxheSIsImlzQXV0b1N0YXJ0IiwiZGVzdHJveSIsImVycm9yIiwidGVtcEVycm9yIiwiRVJST1JTIiwiSU5JVF9ITFNKU19OT1RGT1VORCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOztBQUdBOzs7Ozs7QUFFQTs7Ozs7O0FBVkE7OztBQWlCQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsQ0FBU0MsT0FBVCxFQUFrQkMsWUFBbEIsRUFBZ0NDLFFBQWhDLEVBQXlDO0FBQ3pELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE1BQU0sSUFBVjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4Qjs7QUFFQSxRQUFJO0FBQ0FELGNBQU0sSUFBSUUsR0FBSixDQUFRLEVBQUNDLE9BQU8sS0FBUixFQUFSLENBQU47QUFDQUgsWUFBSUksV0FBSixDQUFnQlIsT0FBaEI7O0FBRUEsWUFBSVMsT0FBTztBQUNQQyxrQkFBT0MsdUJBREE7QUFFUFgscUJBQVVBLE9BRkg7QUFHUFksaUJBQU1SLEdBSEM7QUFJUFMsc0JBQVcsSUFKSjtBQUtQQyxxQkFBVSxLQUxIO0FBTVBDLG9CQUFTLEtBTkY7QUFPUEMscUJBQVUsS0FQSDtBQVFQQyxtQkFBUUMscUJBUkQ7QUFTUEMsb0JBQVMsQ0FURjtBQVVQQyx1QkFBWSxDQVZMO0FBV1BDLDRCQUFpQixDQUFDLENBWFg7QUFZUEMsMkJBQWdCLENBQUMsQ0FaVjtBQWFQQywyQkFBZ0IsRUFiVDtBQWNQQyxxQkFBVSxFQWRIO0FBZVB0QixzQkFBV0E7QUFmSixTQUFYO0FBaUJBQyxlQUFPLDJCQUFTTSxJQUFULEVBQWVSLFlBQWYsRUFBNkIsVUFBU3dCLE1BQVQsRUFBaUJDLGdCQUFqQixFQUFrQztBQUNsRUMsOEJBQWtCQyxHQUFsQixDQUFzQix5QkFBdEIsRUFBaURILE1BQWpELEVBQXlELHdCQUF1QkMsZ0JBQWhGO0FBQ0F0QixnQkFBSXlCLFVBQUosQ0FBZUosT0FBT0ssSUFBdEI7O0FBR0ExQixnQkFBSTJCLElBQUosQ0FBU3pCLElBQUkwQixNQUFKLENBQVdDLFlBQXBCLEVBQWtDLFVBQVVDLEtBQVYsRUFBaUJDLElBQWpCLEVBQXVCO0FBQ3JEQyx3QkFBUVIsR0FBUixDQUFZLHlCQUFaO0FBQ0FRLHdCQUFRUixHQUFSLENBQVlPLEtBQUtFLE9BQUwsQ0FBYUMsSUFBekI7QUFDQSxvQkFBR0gsS0FBS0UsT0FBTCxDQUFhQyxJQUFoQixFQUFxQjtBQUNqQjdCLHlCQUFLTSxNQUFMLEdBQWMsSUFBZDtBQUNILGlCQUZELE1BRUs7QUFDRCx3QkFBR1csbUJBQW1CLENBQXRCLEVBQXdCO0FBQ3BCMUIsZ0NBQVF1QyxJQUFSLENBQWFiLGdCQUFiO0FBQ0F2Qiw2QkFBS3FDLElBQUw7QUFDSDtBQUNKOztBQUVELG9CQUFHdkMsYUFBYXdDLFdBQWIsRUFBSCxFQUE4QjtBQUMxQnRDLHlCQUFLcUMsSUFBTDtBQUNIO0FBQ0osYUFmRDtBQWlCSCxTQXRCTSxDQUFQOztBQXlCQW5DLDRCQUFvQkYsY0FBVyxTQUFYLENBQXBCO0FBQ0F3QiwwQkFBa0JDLEdBQWxCLENBQXNCLHNCQUF0Qjs7QUFFQXpCLGFBQUt1QyxPQUFMLEdBQWUsWUFBSztBQUNoQnRDLGdCQUFJc0MsT0FBSjtBQUNBdEMsa0JBQU0sSUFBTjtBQUNBdUIsOEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7O0FBRUF2QjtBQUNILFNBTkQ7QUFPSCxLQXhERCxDQXdEQyxPQUFNc0MsS0FBTixFQUFZO0FBQ1QsWUFBSUMsWUFBYUMsa0JBQU9DLDhCQUFQLENBQWpCO0FBQ0FGLGtCQUFVRCxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBLGNBQU1DLFNBQU47QUFDSDs7QUFFRCxXQUFPekMsSUFBUDtBQUNILENBcEVEOztxQkF1RWVKLFciLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDcuLlxuICovXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7UFJPVklERVJfSExTLCBTVEFURV9JRExFLFxuICAgIElOSVRfREFTSF9VTlNVUFBPUlQsIEVSUk9SUyxcbiAgICBJTklUX0hMU0pTX05PVEZPVU5EfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBobHNqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cblxuY29uc3QgSGxzUHJvdmlkZXIgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBobHMgPSBudWxsO1xuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgICBobHMgPSBuZXcgSGxzKHtkZWJ1ZzogZmFsc2V9KTtcbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKGVsZW1lbnQpO1xuXG4gICAgICAgIGxldCBzcGVjID0ge1xuICAgICAgICAgICAgbmFtZSA6IFBST1ZJREVSX0hMUyxcbiAgICAgICAgICAgIGVsZW1lbnQgOiBlbGVtZW50LFxuICAgICAgICAgICAgbXNlIDogaGxzLFxuICAgICAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxuICAgICAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxuICAgICAgICAgICAgaXNMaXZlIDogZmFsc2UsXG4gICAgICAgICAgICBzZWVraW5nIDogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXG4gICAgICAgICAgICBidWZmZXIgOiAwLFxuICAgICAgICAgICAgZnJhbWVyYXRlIDogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXG4gICAgICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXG4gICAgICAgICAgICBzb3VyY2VzIDogW10sXG4gICAgICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXG4gICAgICAgIH07XG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbil7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBvbkV4dGVuZGVkTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZS5maWxlKTtcblxuXG4gICAgICAgICAgICBobHMub25jZShIbHMuRXZlbnRzLkxFVkVMX0xPQURFRCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJIbHMuRXZlbnRzLkxFVkVMX0xPQURFRFwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmRldGFpbHMubGl2ZSk7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5kZXRhaWxzLmxpdmUpe1xuICAgICAgICAgICAgICAgICAgICBzcGVjLmlzTGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgICAgIGhscy5kZXN0cm95KCk7XG4gICAgICAgICAgICBobHMgPSBudWxsO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogUFJPVklERVIgREVTVFJPVVlFRC5cIik7XG5cbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgICAgIH07XG4gICAgfWNhdGNoKGVycm9yKXtcbiAgICAgICAgbGV0IHRlbXBFcnJvciA9ICBFUlJPUlNbSU5JVF9ITFNKU19OT1RGT1VORF07XG4gICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICB0aHJvdyB0ZW1wRXJyb3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IEhsc1Byb3ZpZGVyOyJdLCJzb3VyY2VSb290IjoiIn0=