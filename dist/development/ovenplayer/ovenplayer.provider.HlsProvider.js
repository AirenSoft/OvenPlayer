/*! OvenPlayerv0.9.5994 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        var tempError = _constants.ERRORS[_constants.INIT_HLSJS_NOTFOUND];
        tempError.error = error;
        throw tempError;
    }

    return that;
};

exports["default"] = HlsProvider;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJIbHMiLCJkZWJ1ZyIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJsb2FkU291cmNlIiwiZmlsZSIsIm9uY2UiLCJFdmVudHMiLCJMRVZFTF9MT0FERUQiLCJldmVudCIsImRhdGEiLCJkZXRhaWxzIiwibGl2ZSIsInNlZWsiLCJpc0F1dG9TdGFydCIsInBsYXkiLCJkZXN0cm95IiwiZXJyb3IiLCJ0ZW1wRXJyb3IiLCJFUlJPUlMiLCJJTklUX0hMU0pTX05PVEZPVU5EIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7OztBQUVBOzs7Ozs7QUFWQTs7O0FBaUJBLElBQU1BLGNBQWMsU0FBZEEsV0FBYyxDQUFTQyxPQUFULEVBQWtCQyxZQUFsQixFQUFnQ0MsUUFBaEMsRUFBeUM7QUFDekQsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsTUFBTSxJQUFWO0FBQ0EsUUFBSUMsb0JBQW9CLElBQXhCOztBQUVBLFFBQUk7QUFDQUQsY0FBTSxJQUFJRSxHQUFKLENBQVEsRUFBQ0MsT0FBTyxLQUFSLEVBQVIsQ0FBTjtBQUNBSCxZQUFJSSxXQUFKLENBQWdCUixPQUFoQjs7QUFFQSxZQUFJUyxPQUFPO0FBQ1BDLGtCQUFPQyx1QkFEQTtBQUVQWCxxQkFBVUEsT0FGSDtBQUdQWSxpQkFBTVIsR0FIQztBQUlQUyxzQkFBVyxJQUpKO0FBS1BDLHFCQUFVLEtBTEg7QUFNUEMsb0JBQVMsS0FORjtBQU9QQyxxQkFBVSxLQVBIO0FBUVBDLG1CQUFRQyxxQkFSRDtBQVNQQyxvQkFBUyxDQVRGO0FBVVBDLHVCQUFZLENBVkw7QUFXUEMsNEJBQWlCLENBQUMsQ0FYWDtBQVlQQywyQkFBZ0IsQ0FBQyxDQVpWO0FBYVBDLDJCQUFnQixFQWJUO0FBY1BDLHFCQUFVLEVBZEg7QUFlUHRCLHNCQUFXQTtBQWZKLFNBQVg7QUFpQkFDLGVBQU8sMkJBQVNNLElBQVQsRUFBZVIsWUFBZixFQUE2QixVQUFTd0IsTUFBVCxFQUFpQkMsZ0JBQWpCLEVBQWtDO0FBQ2xFQyw4QkFBa0JDLEdBQWxCLENBQXNCLHlCQUF0QixFQUFpREgsTUFBakQsRUFBeUQsd0JBQXVCQyxnQkFBaEY7QUFDQXRCLGdCQUFJeUIsVUFBSixDQUFlSixPQUFPSyxJQUF0Qjs7QUFFQTFCLGdCQUFJMkIsSUFBSixDQUFTekIsSUFBSTBCLE1BQUosQ0FBV0MsWUFBcEIsRUFBa0MsVUFBVUMsS0FBVixFQUFpQkMsSUFBakIsRUFBdUI7QUFDckQsb0JBQUdBLEtBQUtDLE9BQUwsQ0FBYUMsSUFBaEIsRUFBcUI7QUFDakI1Qix5QkFBS00sTUFBTCxHQUFjLElBQWQ7QUFDSCxpQkFGRCxNQUVLO0FBQ0Qsd0JBQUdXLG1CQUFtQixDQUF0QixFQUF5QjtBQUNyQjtBQUNBdkIsNkJBQUttQyxJQUFMLENBQVVaLGdCQUFWO0FBQ0g7QUFDSjtBQUNELG9CQUFHekIsYUFBYXNDLFdBQWIsRUFBSCxFQUE4QjtBQUMxQnBDLHlCQUFLcUMsSUFBTDtBQUNIO0FBQ0osYUFaRDtBQWVILFNBbkJNLENBQVA7O0FBcUJBbkMsNEJBQW9CRixjQUFXLFNBQVgsQ0FBcEI7QUFDQXdCLDBCQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXRCOztBQUVBekIsYUFBS3NDLE9BQUwsR0FBZSxZQUFLO0FBQ2hCckMsZ0JBQUlxQyxPQUFKO0FBQ0FyQyxrQkFBTSxJQUFOO0FBQ0F1Qiw4QkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QjtBQUNBdkI7QUFDSCxTQUxEO0FBTUgsS0FuREQsQ0FtREMsT0FBTXFDLEtBQU4sRUFBWTtBQUNULFlBQUlDLFlBQWFDLGtCQUFPQyw4QkFBUCxDQUFqQjtBQUNBRixrQkFBVUQsS0FBVixHQUFrQkEsS0FBbEI7QUFDQSxjQUFNQyxTQUFOO0FBQ0g7O0FBRUQsV0FBT3hDLElBQVA7QUFDSCxDQS9ERDs7cUJBa0VlSixXIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiA3Li5cbiAqL1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1BST1ZJREVSX0hMUywgU1RBVEVfSURMRSxcbiAgICBJTklUX0RBU0hfVU5TVVBQT1JULCBFUlJPUlMsXG4gICAgSU5JVF9ITFNKU19OT1RGT1VORH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbi8qKlxuICogQGJyaWVmICAgaGxzanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5cbmNvbnN0IEhsc1Byb3ZpZGVyID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgaGxzID0gbnVsbDtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgaGxzID0gbmV3IEhscyh7ZGVidWc6IGZhbHNlfSk7XG4gICAgICAgIGhscy5hdHRhY2hNZWRpYShlbGVtZW50KTtcblxuICAgICAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgICAgIG5hbWUgOiBQUk9WSURFUl9ITFMsXG4gICAgICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcbiAgICAgICAgICAgIG1zZSA6IGhscyxcbiAgICAgICAgICAgIGxpc3RlbmVyIDogbnVsbCxcbiAgICAgICAgICAgIGNhblNlZWsgOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxuICAgICAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxuICAgICAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxuICAgICAgICAgICAgYnVmZmVyIDogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZSA6IDAsXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxuICAgICAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxuICAgICAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxuICAgICAgICAgICAgc291cmNlcyA6IFtdLFxuICAgICAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxuICAgICAgICB9O1xuICAgICAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBmdW5jdGlvbihzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pe1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICBobHMubG9hZFNvdXJjZShzb3VyY2UuZmlsZSk7XG5cbiAgICAgICAgICAgIGhscy5vbmNlKEhscy5FdmVudHMuTEVWRUxfTE9BREVELCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZihkYXRhLmRldGFpbHMubGl2ZSl7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMuaXNMaXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDAgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxlbWVudC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9KTtcblxuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIFBST1ZJREVSIExPQURFRC5cIik7XG5cbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgICAgICBobHMuZGVzdHJveSgpO1xuICAgICAgICAgICAgaGxzID0gbnVsbDtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IFBST1ZJREVSIERFU1RST1VZRUQuXCIpO1xuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICAgICAgfTtcbiAgICB9Y2F0Y2goZXJyb3Ipe1xuICAgICAgICBsZXQgdGVtcEVycm9yID0gIEVSUk9SU1tJTklUX0hMU0pTX05PVEZPVU5EXTtcbiAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHRocm93IHRlbXBFcnJvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgSGxzUHJvdmlkZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==