/*! OvenPlayerv0.9.43 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   hlsjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

var Hls = function Hls(element, playerConfig, adTagUrl) {
    var that = {};
    var hls = null;
    var superDestroy_func = null;

    try {
        hls = new Hls({ debug: false });
        hls.attachMedia(element);

        var spec = {
            name: _constants.PROVIDER_HLS,
            extendedElement: hls,
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

            if (lastPlayPosition > 0) {
                element.seek(lastPlayPosition);
                that.play();
            }
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
        throw new Error(error);
    }

    return that;
}; /**
    * Created by hoho on 2018. 6. 7..
    */
exports["default"] = Hls;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzIiwiZWxlbWVudCIsInBsYXllckNvbmZpZyIsImFkVGFnVXJsIiwidGhhdCIsImhscyIsInN1cGVyRGVzdHJveV9mdW5jIiwiZGVidWciLCJhdHRhY2hNZWRpYSIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfSExTIiwiZXh0ZW5kZWRFbGVtZW50IiwibGlzdGVuZXIiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImZyYW1lcmF0ZSIsImN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFNvdXJjZSIsInF1YWxpdHlMZXZlbHMiLCJzb3VyY2VzIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwibG9hZFNvdXJjZSIsImZpbGUiLCJzZWVrIiwicGxheSIsImRlc3Ryb3kiLCJlcnJvciIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBT0EsSUFBTUEsTUFBTSxTQUFOQSxHQUFNLENBQVNDLE9BQVQsRUFBa0JDLFlBQWxCLEVBQWdDQyxRQUFoQyxFQUF5QztBQUNqRCxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxNQUFNLElBQVY7QUFDQSxRQUFJQyxvQkFBb0IsSUFBeEI7O0FBRUEsUUFBSTtBQUNBRCxjQUFNLElBQUlMLEdBQUosQ0FBUSxFQUFDTyxPQUFPLEtBQVIsRUFBUixDQUFOO0FBQ0FGLFlBQUlHLFdBQUosQ0FBZ0JQLE9BQWhCOztBQUVBLFlBQUlRLE9BQU87QUFDUEMsa0JBQU9DLHVCQURBO0FBRVBDLDZCQUFrQlAsR0FGWDtBQUdQUSxzQkFBVyxJQUhKO0FBSVBDLHFCQUFVLEtBSkg7QUFLUEMsb0JBQVMsS0FMRjtBQU1QQyxxQkFBVSxLQU5IO0FBT1BDLG1CQUFRQyxxQkFQRDtBQVFQQyxvQkFBUyxDQVJGO0FBU1BDLHVCQUFZLENBVEw7QUFVUEMsNEJBQWlCLENBQUMsQ0FWWDtBQVdQQywyQkFBZ0IsQ0FBQyxDQVhWO0FBWVBDLDJCQUFnQixFQVpUO0FBYVBDLHFCQUFVLEVBYkg7QUFjUHJCLHNCQUFXQTtBQWRKLFNBQVg7QUFnQkFDLGVBQU8sMkJBQVNLLElBQVQsRUFBZVAsWUFBZixFQUE2QixVQUFTdUIsTUFBVCxFQUFpQkMsZ0JBQWpCLEVBQWtDO0FBQ2xFQyw4QkFBa0JDLEdBQWxCLENBQXNCLHlCQUF0QixFQUFpREgsTUFBakQsRUFBeUQsd0JBQXVCQyxnQkFBaEY7QUFDQXJCLGdCQUFJd0IsVUFBSixDQUFlSixPQUFPSyxJQUF0Qjs7QUFFQSxnQkFBR0osbUJBQW1CLENBQXRCLEVBQXdCO0FBQ3BCekIsd0JBQVE4QixJQUFSLENBQWFMLGdCQUFiO0FBQ0F0QixxQkFBSzRCLElBQUw7QUFDSDtBQUNKLFNBUk0sQ0FBUDtBQVNBMUIsNEJBQW9CRixjQUFXLFNBQVgsQ0FBcEI7QUFDQXVCLDBCQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXRCOztBQUVBeEIsYUFBSzZCLE9BQUwsR0FBZSxZQUFLO0FBQ2hCNUIsZ0JBQUk0QixPQUFKO0FBQ0E1QixrQkFBTSxJQUFOO0FBQ0FzQiw4QkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0Qjs7QUFFQXRCO0FBQ0gsU0FORDtBQU9ILEtBdkNELENBdUNDLE9BQU00QixLQUFOLEVBQVk7QUFDVCxjQUFNLElBQUlDLEtBQUosQ0FBVUQsS0FBVixDQUFOO0FBQ0g7O0FBRUQsV0FBTzlCLElBQVA7QUFDSCxDQWpERCxDLENBZEE7OztxQkFrRWVKLEciLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gNy4uXHJcbiAqL1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQge1BST1ZJREVSX0hMUywgU1RBVEVfSURMRX0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBobHNqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgSGxzID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGhscyA9IG51bGw7XHJcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgaGxzID0gbmV3IEhscyh7ZGVidWc6IGZhbHNlfSk7XHJcbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICAgICAgbmFtZSA6IFBST1ZJREVSX0hMUyxcclxuICAgICAgICAgICAgZXh0ZW5kZWRFbGVtZW50IDogaGxzLFxyXG4gICAgICAgICAgICBsaXN0ZW5lciA6IG51bGwsXHJcbiAgICAgICAgICAgIGNhblNlZWsgOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNMaXZlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxyXG4gICAgICAgICAgICBidWZmZXIgOiAwLFxyXG4gICAgICAgICAgICBmcmFtZXJhdGUgOiAwLFxyXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxyXG4gICAgICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXHJcbiAgICAgICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcclxuICAgICAgICAgICAgc291cmNlcyA6IFtdLFxyXG4gICAgICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBmdW5jdGlvbihzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBvbkV4dGVuZGVkTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xyXG5cclxuICAgICAgICAgICAgaWYobGFzdFBsYXlQb3NpdGlvbiA+IDApe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZWVrKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgICAgIGhscy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGhscyA9IG51bGw7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IFBST1ZJREVSIERFU1RST1VZRUQuXCIpO1xyXG5cclxuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcclxuICAgICAgICB9O1xyXG4gICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhsczsiXSwic291cmNlUm9vdCI6IiJ9