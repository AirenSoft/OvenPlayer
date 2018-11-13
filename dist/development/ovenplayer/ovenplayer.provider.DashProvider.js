/*! OvenPlayerv0.7.7 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.DashProvider"],{

/***/ "./src/js/api/provider/html5/providers/Dash.js":
/*!*****************************************************!*\
  !*** ./src/js/api/provider/html5/providers/Dash.js ***!
  \*****************************************************/
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

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   dashjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */
/**
 * Created by hoho on 2018. 6. 14..
 */
var DASHERROR = {
    DOWNLOAD: "download",
    MANIFESTERROR: "manifestError"
};
var Dash = function Dash(container, playerConfig) {
    var that = {};
    var dash = null;
    var superDestroy_func = null;
    var seekPosition_sec = 0;
    var isFirstError = false;

    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_DASH);
    var element = mediaManager.create();

    try {
        dash = dashjs.MediaPlayer().create();
        dash.getDebug().setLogToBrowserConsole(false);
        dash.initialize(element, null, false);

        var spec = {
            name: _constants.PROVIDER_DASH,
            extendedElement: dash,
            listener: null,
            canSeek: false,
            isLive: false,
            seeking: false,
            state: _constants.STATE_IDLE,
            buffer: 0,
            currentQuality: -1,
            currentSource: -1,
            qualityLevels: [],
            sources: []
        };

        that = (0, _Provider2["default"])(spec, playerConfig, function (source, lastPlayPosition) {
            OvenPlayerConsole.log("DASH : onExtendedLoad : ", source, "lastPlayPosition : " + lastPlayPosition);
            dash.attachSource(source.file);
            seekPosition_sec = lastPlayPosition;
        });
        superDestroy_func = that["super"]('destroy');
        OvenPlayerConsole.log("DASH PROVIDER LOADED.");

        dash.on(dashjs.MediaPlayer.events.ERROR, function (error) {
            if (error && !isFirstError && (error.error === DASHERROR.DOWNLOAD || error.error === DASHERROR.MANIFESTERROR)) {
                isFirstError = true;
                (0, _utils.errorTrigger)({ code: _constants.PLAYER_UNKNWON_NEWWORK_ERROR, reason: "Unknown network error", message: "Unknown network error" }, that);
            }
        });
        that.on(_constants.CONTENT_META, function (meta) {
            OvenPlayerConsole.log("GetStreamInfo  : ", dash.getQualityFor("video"), dash.getBitrateInfoListFor('video'), dash.getBitrateInfoListFor('video')[dash.getQualityFor("video")]);

            var subQualityList = dash.getBitrateInfoListFor('video');
            spec.currentQuality = dash.getQualityFor("video");
            for (var i = 0; i < subQualityList.length; i++) {
                spec.qualityLevels.push({
                    bitrate: subQualityList[i].bitrate,
                    height: subQualityList[i].height,
                    width: subQualityList[i].width,
                    index: subQualityList[i].qualityIndex,
                    label: subQualityList[i].width + "x" + subQualityList[i].height + ", " + subQualityList[i].bitrate
                });
            }

            if (dash.isDynamic()) {
                that.play();
            } else {
                if (seekPosition_sec) {
                    dash.seek(seekPosition_sec);
                    that.play();
                }
            }
        }, that);
        that.setCurrentQuality = function (qualityIndex) {
            //dash.setAutoSwitchQuality(false);
            dash.setQualityFor("video", qualityIndex);
            spec.currentQuality = dash.getQualityFor("video");
            that.trigger(_constants.CONTENT_LEVEL_CHANGED, {
                currentQuality: spec.currentQuality
            });
            return spec.currentQuality;
        };
        that.destroy = function () {
            dash.reset();
            mediaManager.destroy();
            mediaManager = null;
            element = null;
            OvenPlayerConsole.log("DASH : PROVIDER DESTROYED.");

            superDestroy_func();
        };
    } catch (error) {
        throw new Error(error);
    }

    return that;
};

exports["default"] = Dash;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJjb250YWluZXIiLCJwbGF5ZXJDb25maWciLCJ0aGF0IiwiZGFzaCIsInN1cGVyRGVzdHJveV9mdW5jIiwic2Vla1Bvc2l0aW9uX3NlYyIsImlzRmlyc3RFcnJvciIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX0RBU0giLCJlbGVtZW50IiwiY3JlYXRlIiwiZGFzaGpzIiwiTWVkaWFQbGF5ZXIiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJpbml0aWFsaXplIiwic3BlYyIsIm5hbWUiLCJleHRlbmRlZEVsZW1lbnQiLCJsaXN0ZW5lciIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJhdHRhY2hTb3VyY2UiLCJmaWxlIiwib24iLCJldmVudHMiLCJFUlJPUiIsImVycm9yIiwiY29kZSIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwiQ09OVEVOVF9NRVRBIiwibWV0YSIsImdldFF1YWxpdHlGb3IiLCJnZXRCaXRyYXRlSW5mb0xpc3RGb3IiLCJzdWJRdWFsaXR5TGlzdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwiYml0cmF0ZSIsImhlaWdodCIsIndpZHRoIiwiaW5kZXgiLCJxdWFsaXR5SW5kZXgiLCJsYWJlbCIsImlzRHluYW1pYyIsInBsYXkiLCJzZWVrIiwic2V0Q3VycmVudFF1YWxpdHkiLCJzZXRRdWFsaXR5Rm9yIiwi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YjtBQUNBMUQsMkJBQWUsSUFBZjtBQUNBRSxzQkFBVSxJQUFWO0FBQ0F1Qiw4QkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0Qjs7QUFFQTdCO0FBQ0gsU0FSRDtBQVNILEtBNUVELENBNEVDLE9BQU1tQyxLQUFOLEVBQVk7QUFDVCxjQUFNLElBQUk0QixLQUFKLENBQVU1QixLQUFWLENBQU47QUFDSDs7QUFFRCxXQUFPckMsSUFBUDtBQUNILENBM0ZEOztxQkE4RmVILEkiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDE0Li5cclxuICovXHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7U1RBVEVfSURMRSwgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiwgQ09OVEVOVF9MRVZFTF9DSEFOR0VELCAgUFJPVklERVJfREFTSCwgQ09OVEVOVF9NRVRBfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIGRhc2hqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcbmNvbnN0IERBU0hFUlJPUiA9IHtcclxuICAgIERPV05MT0FEIDogXCJkb3dubG9hZFwiLFxyXG4gICAgTUFOSUZFU1RFUlJPUiA6IFwibWFuaWZlc3RFcnJvclwiXHJcbn07XHJcbmNvbnN0IERhc2ggPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGRhc2ggPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcclxuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcclxuICAgIGxldCBpc0ZpcnN0RXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgUFJPVklERVJfREFTSCk7XHJcbiAgICBsZXQgZWxlbWVudCA9ICBtZWRpYU1hbmFnZXIuY3JlYXRlKCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBkYXNoID0gZGFzaGpzLk1lZGlhUGxheWVyKCkuY3JlYXRlKCk7XHJcbiAgICAgICAgZGFzaC5nZXREZWJ1ZygpLnNldExvZ1RvQnJvd3NlckNvbnNvbGUoZmFsc2UpO1xyXG4gICAgICAgIGRhc2guaW5pdGlhbGl6ZShlbGVtZW50LCBudWxsLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgICAgICBuYW1lIDogUFJPVklERVJfREFTSCxcclxuICAgICAgICAgICAgZXh0ZW5kZWRFbGVtZW50IDogZGFzaCxcclxuICAgICAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxyXG4gICAgICAgICAgICBjYW5TZWVrIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWVraW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcclxuICAgICAgICAgICAgYnVmZmVyIDogMCxcclxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcclxuICAgICAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxyXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXHJcbiAgICAgICAgICAgIHNvdXJjZXMgOiBbXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbil7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBvbkV4dGVuZGVkTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgZGFzaC5hdHRhY2hTb3VyY2Uoc291cmNlLmZpbGUpO1xyXG4gICAgICAgICAgICBzZWVrUG9zaXRpb25fc2VjID0gbGFzdFBsYXlQb3NpdGlvbjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIFBST1ZJREVSIExPQURFRC5cIik7XHJcblxyXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5FUlJPUiwgZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICBpZihlcnJvciAmJiAhaXNGaXJzdEVycm9yICYmICggZXJyb3IuZXJyb3IgPT09IERBU0hFUlJPUi5ET1dOTE9BRCB8fCBlcnJvci5lcnJvciA9PT0gREFTSEVSUk9SLk1BTklGRVNURVJST1IgKSl7XHJcbiAgICAgICAgICAgICAgICBpc0ZpcnN0RXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKHtjb2RlIDogUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiwgcmVhc29uIDogXCJVbmtub3duIG5ldHdvcmsgZXJyb3JcIiwgbWVzc2FnZSA6IFwiVW5rbm93biBuZXR3b3JrIGVycm9yXCJ9LCB0aGF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoYXQub24oQ09OVEVOVF9NRVRBLCBmdW5jdGlvbihtZXRhKXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiR2V0U3RyZWFtSW5mbyAgOiBcIiwgZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKVtkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKV0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN1YlF1YWxpdHlMaXN0ID0gZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN1YlF1YWxpdHlMaXN0Lmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgICAgICBzcGVjLnF1YWxpdHlMZXZlbHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYml0cmF0ZTogc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHN1YlF1YWxpdHlMaXN0W2ldLnF1YWxpdHlJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbCA6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoK1wieFwiK3N1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCtcIiwgXCIrIHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihkYXNoLmlzRHluYW1pYygpKXtcclxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKHNlZWtQb3NpdGlvbl9zZWMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2VlayhzZWVrUG9zaXRpb25fc2VjKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoYXQpO1xyXG4gICAgICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vZGFzaC5zZXRBdXRvU3dpdGNoUXVhbGl0eShmYWxzZSk7XHJcbiAgICAgICAgICAgIGRhc2guc2V0UXVhbGl0eUZvcihcInZpZGVvXCIsIHF1YWxpdHlJbmRleCk7XHJcbiAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IHNwZWMuY3VycmVudFF1YWxpdHlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgICAgIGRhc2gucmVzZXQoKTtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG5cclxuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcclxuICAgICAgICB9O1xyXG4gICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2g7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=