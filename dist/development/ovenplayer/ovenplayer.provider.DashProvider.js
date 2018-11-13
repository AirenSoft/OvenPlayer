/*! OvenPlayerv0.7.653 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
            var currentSource = spec.sources[spec.currentQuality];
            var subQualityList = dash.getBitrateInfoListFor('video');
            currentSource.metaQuality = [];
            for (var i = 0; i < subQualityList.length; i++) {
                currentSource.metaQuality.push({
                    bitrate: subQualityList[i].bitrate,
                    height: subQualityList[i].height,
                    width: subQualityList[i].width,
                    qualityIndex: subQualityList[i].qualityIndex,
                    title: subQualityList[i].height + " p"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJjb250YWluZXIiLCJwbGF5ZXJDb25maWciLCJ0aGF0IiwiZGFzaCIsInN1cGVyRGVzdHJveV9mdW5jIiwic2Vla1Bvc2l0aW9uX3NlYyIsImlzRmlyc3RFcnJvciIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX0RBU0giLCJlbGVtZW50IiwiY3JlYXRlIiwiZGFzaGpzIiwiTWVkaWFQbGF5ZXIiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJpbml0aWFsaXplIiwic3BlYyIsIm5hbWUiLCJleHRlbmRlZEVsZW1lbnQiLCJsaXN0ZW5lciIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiY3VycmVudFF1YWxpdHkiLCJzb3VyY2VzIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiYXR0YWNoU291cmNlIiwiZmlsZSIsIm9uIiwiZXZlbnRzIiwiRVJST1IiLCJlcnJvciIsImNvZGUiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwicmVhc29uIiwibWVzc2FnZSIsIkNPTlRFTlRfTUVUQSIsIm1ldGEiLCJnZXRRdWFsaXR5Rm9yIiwiZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yIiwiY3VycmVudFNvdXJjZSIsInN1YlF1YWxpdHlMaXN0IiwibWV0YVF1YWxpdHkiLCJpIiwibGVuZ3RoIiwicHVzaCIsImJpdHJhdGUiLCJoZWlnaHQiLCJ3aWR0aCIsInF1YWxpdHlJbmRleCIsInRpdGxlIiwiaXNEeW5hbWljIiwicGxheSIsInNlZWsiLCJkZXN0cm95IiwicmVzZXQiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7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RyxJQUExQixDQUErQjtBQUMzQkMsNkJBQVNMLGVBQWVFLENBQWYsRUFBa0JHLE9BREE7QUFFM0JDLDRCQUFRTixlQUFlRSxDQUFmLEVBQWtCSSxNQUZDO0FBRzNCQywyQkFBT1AsZUFBZUUsQ0FBZixFQUFrQkssS0FIRTtBQUkzQkMsa0NBQWNSLGVBQWVFLENBQWYsRUFBa0JNLFlBSkw7QUFLM0JDLDJCQUFRVCxlQUFlRSxDQUFmLEVBQWtCSSxNQUFsQixHQUF5QjtBQUxOLGlCQUEvQjtBQU9IOztBQUVELGdCQUFHbEQsS0FBS3NELFNBQUwsRUFBSCxFQUFvQjtBQUNoQnZELHFCQUFLd0QsSUFBTDtBQUNILGFBRkQsTUFFSztBQUNELG9CQUFHckQsZ0JBQUgsRUFBb0I7QUFDaEJGLHlCQUFLd0QsSUFBTCxDQUFVdEQsZ0JBQVY7QUFDQUgseUJBQUt3RCxJQUFMO0FBQ0g7QUFDSjtBQUNKLFNBdkJELEVBdUJHeEQsSUF2Qkg7O0FBeUJBQSxhQUFLMEQsT0FBTCxHQUFlLFlBQUs7QUFDaEJ6RCxpQkFBSzBELEtBQUw7QUFDQXRELHlCQUFhcUQsT0FBYjtBQUNBckQsMkJBQWUsSUFBZjtBQUNBRSxzQkFBVSxJQUFWO0FBQ0FxQiw4QkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0Qjs7QUFFQTNCO0FBQ0gsU0FSRDtBQVNILEtBbEVELENBa0VDLE9BQU1pQyxLQUFOLEVBQVk7QUFDVCxjQUFNLElBQUl5QixLQUFKLENBQVV6QixLQUFWLENBQU47QUFDSDs7QUFFRCxXQUFPbkMsSUFBUDtBQUNILENBakZEOztxQkFvRmVILEkiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDE0Li5cclxuICovXHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7U1RBVEVfSURMRSwgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiwgUFJPVklERVJfREFTSCwgQ09OVEVOVF9NRVRBfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIGRhc2hqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcbmNvbnN0IERBU0hFUlJPUiA9IHtcclxuICAgIERPV05MT0FEIDogXCJkb3dubG9hZFwiLFxyXG4gICAgTUFOSUZFU1RFUlJPUiA6IFwibWFuaWZlc3RFcnJvclwiXHJcbn07XHJcbmNvbnN0IERhc2ggPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGRhc2ggPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcclxuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcclxuICAgIGxldCBpc0ZpcnN0RXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgUFJPVklERVJfREFTSCk7XHJcbiAgICBsZXQgZWxlbWVudCA9ICBtZWRpYU1hbmFnZXIuY3JlYXRlKCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBkYXNoID0gZGFzaGpzLk1lZGlhUGxheWVyKCkuY3JlYXRlKCk7XHJcbiAgICAgICAgZGFzaC5nZXREZWJ1ZygpLnNldExvZ1RvQnJvd3NlckNvbnNvbGUoZmFsc2UpO1xyXG4gICAgICAgIGRhc2guaW5pdGlhbGl6ZShlbGVtZW50LCBudWxsLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgICAgICBuYW1lIDogUFJPVklERVJfREFTSCxcclxuICAgICAgICAgICAgZXh0ZW5kZWRFbGVtZW50IDogZGFzaCxcclxuICAgICAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxyXG4gICAgICAgICAgICBjYW5TZWVrIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWVraW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcclxuICAgICAgICAgICAgYnVmZmVyIDogMCxcclxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcclxuICAgICAgICAgICAgc291cmNlcyA6IFtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24oc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IG9uRXh0ZW5kZWRMb2FkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICBkYXNoLmF0dGFjaFNvdXJjZShzb3VyY2UuZmlsZSk7XHJcbiAgICAgICAgICAgIHNlZWtQb3NpdGlvbl9zZWMgPSBsYXN0UGxheVBvc2l0aW9uO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLkVSUk9SLCBmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgIGlmKGVycm9yICYmICFpc0ZpcnN0RXJyb3IgJiYgKCBlcnJvci5lcnJvciA9PT0gREFTSEVSUk9SLkRPV05MT0FEIHx8IGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuTUFOSUZFU1RFUlJPUiApKXtcclxuICAgICAgICAgICAgICAgIGlzRmlyc3RFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBlcnJvclRyaWdnZXIoe2NvZGUgOiBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gbmV0d29yayBlcnJvclwiLCBtZXNzYWdlIDogXCJVbmtub3duIG5ldHdvcmsgZXJyb3JcIn0sIHRoYXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhhdC5vbihDT05URU5UX01FVEEsIGZ1bmN0aW9uKG1ldGEpe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJHZXRTdHJlYW1JbmZvICA6IFwiLCBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpW2Rhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpXSk7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U291cmNlID0gc3BlYy5zb3VyY2VzW3NwZWMuY3VycmVudFF1YWxpdHldO1xyXG4gICAgICAgICAgICBsZXQgc3ViUXVhbGl0eUxpc3QgPSBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKTtcclxuICAgICAgICAgICAgY3VycmVudFNvdXJjZS5tZXRhUXVhbGl0eSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc3ViUXVhbGl0eUxpc3QubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTb3VyY2UubWV0YVF1YWxpdHkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYml0cmF0ZTogc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVhbGl0eUluZGV4OiBzdWJRdWFsaXR5TGlzdFtpXS5xdWFsaXR5SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQrXCIgcFwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZGFzaC5pc0R5bmFtaWMoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihzZWVrUG9zaXRpb25fc2VjKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXNoLnNlZWsoc2Vla1Bvc2l0aW9uX3NlYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGF0KTtcclxuXHJcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgICAgIGRhc2gucmVzZXQoKTtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG5cclxuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcclxuICAgICAgICB9O1xyXG4gICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2g7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=