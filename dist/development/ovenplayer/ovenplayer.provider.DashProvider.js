/*! OvenPlayerv0.8.1 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var _sizeHumanizer = __webpack_require__(/*! utils/sizeHumanizer */ "./src/js/utils/sizeHumanizer.js");

var _sizeHumanizer2 = _interopRequireDefault(_sizeHumanizer);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   dashjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */
var DASHERROR = {
    DOWNLOAD: "download",
    MANIFESTERROR: "manifestError"
}; /**
    * Created by hoho on 2018. 6. 14..
    */

var Dash = function Dash(container, playerConfig) {
    var that = {};
    var dash = null;
    var superDestroy_func = null;
    var seekPosition_sec = 0;
    var isFirstError = false;

    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_DASH, playerConfig.isLoop());
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
            framerate: 0,
            currentQuality: -1,
            currentSource: -1,
            qualityLevels: [],
            sources: []
        };

        that = (0, _Provider2["default"])(spec, playerConfig, function (source, lastPlayPosition) {
            OvenPlayerConsole.log("DASH : onExtendedLoad : ", source, "lastPlayPosition : " + lastPlayPosition);
            dash.setAutoSwitchQuality(true);
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

        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, function (event) {
            if (event && event.mediaType && event.mediaType === "video") {
                that.trigger(_constants.CONTENT_LEVEL_CHANGED, {
                    isAuto: dash.getAutoSwitchQuality(),
                    currentQuality: spec.currentQuality,
                    type: "request"
                });
            }
        });
        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function (event) {
            if (event && event.mediaType && event.mediaType === "video") {
                spec.currentQuality = event.newQuality;
                that.trigger(_constants.CONTENT_LEVEL_CHANGED, {
                    isAuto: dash.getAutoSwitchQuality(),
                    currentQuality: event.newQuality,
                    type: "render"
                });
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
                    label: subQualityList[i].width + "x" + subQualityList[i].height + ", " + (0, _sizeHumanizer2["default"])(subQualityList[i].bitrate, true, "bps")
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
            if (that.getState() !== _constants.STATE_PLAYING) {
                that.play();
            }
            spec.currentQuality = qualityIndex;
            if (dash.getAutoSwitchQuality()) {
                dash.setAutoSwitchQuality(false);
            }
            dash.setQualityFor("video", qualityIndex);

            return spec.currentQuality;
        };
        that.isAutoQuality = function () {
            return dash.getAutoSwitchQuality();
        };
        that.setAutoQuality = function (isAuto) {
            dash.setAutoSwitchQuality(isAuto);
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

/***/ }),

/***/ "./src/js/utils/sizeHumanizer.js":
/*!***************************************!*\
  !*** ./src/js/utils/sizeHumanizer.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 11. 14..
 */

var sizeHumanizer = function sizeHumanizer(bytes, si, postpix) {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var unit = postpix || "B";
    var units = ['k' + unit, 'M' + unit, 'G' + unit, 'T' + unit, 'P' + unit, 'E' + unit, 'Z' + unit, 'Y' + unit];
    // ? ['kB','MB','GB','TB','PB','EB','ZB','YB']: ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + units[u];
};

exports['default'] = sizeHumanizer;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJjb250YWluZXIiLCJwbGF5ZXJDb25maWciLCJ0aGF0IiwiZGFzaCIsInN1cGVyRGVzdHJveV9mdW5jIiwic2Vla1Bvc2l0aW9uX3NlYyIsImlzRmlyc3RFcnJvciIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX0RBU0giLCJpc0xvb3AiLCJlbGVtZW50IiwiY3JlYXRlIiwiZGFzaGpzIiwiTWVkaWFQbGF5ZXIiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJpbml0aWFsaXplIiwic3BlYyIsIm5hbWUiLCJleHRlbmRlZEVsZW1lbnQiLCJsaXN0ZW5lciIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJzZXRBdXRvU3dpdGNoUXVhbGl0eSIsImF0dGFjaFNvdXJjZSIsImZpbGUiLCJvbiIsImV2ZW50cyIsIkVSUk9SIiwiZXJyb3IiLCJjb2RlIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsInJlYXNvbiIsIm1lc3NhZ2UiLCJRVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQiLCJldmVudCIsIm1lZGlhVHlwZSIsInRyaWdnZXIiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJpc0F1dG8iLCJnZXRBdXRvU3dpdGNoUXVhbGl0eSIsInR5cGUiLCJRVUFMSVRZX0NIQU5HRV9SRU5ERVJFRCIsIm5ld1F1YWxpdHkiLCJDT05URU5UX01FVEEiLCJtZXRhIiwiZ2V0UXVhbGl0eUZvciIsImdldEJpdHJhdGVJbmZvTGlzdEZvciIsInN1YlF1YWxpdHlMaXN0IiwiaSIsImxlbmd0aCIsInB1c2giLCJiaXRyYXRlIiwiaGVpZ2h0Iiwid2lkdGgiLCJpbmRleCIsInF1YWxpdHlJbmRleCIsImxhYmVsIiwiaXNEeW5hbWljIiwicGxheSIsInNlZWsiLCJzZXRDdXJyZW50UXVhbGl0eSIsImdldFN0YXRlIiwiU1RBVEVfUExBWUlORyIsInNldFF1YWxpdHlGb3IiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJkZXN0cm95IiwicmVzZXQiLCJFcnJvciIsInNpemVIdW1hbml6ZXIiLCJieXRlcyIsInNpIiwicG9zdHBpeCIsInRocmVzaCIsIk1hdGgiLCJhYnMiLCJ1bml0IiwidW5pdHMiLCJ1IiwidG9GaXhlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7OztBQUtBLElBQU1BLFlBQVk7QUFDZEMsY0FBVyxVQURHO0FBRWRDLG1CQUFnQjtBQUZGLENBQWxCLEMsQ0FkQTs7OztBQWtCQSxJQUFNQyxPQUFPLFNBQVBBLElBQU8sQ0FBU0MsU0FBVCxFQUFvQkMsWUFBcEIsRUFBaUM7QUFDMUMsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsT0FBTyxJQUFYO0FBQ0EsUUFBSUMsb0JBQW9CLElBQXhCO0FBQ0EsUUFBSUMsbUJBQW1CLENBQXZCO0FBQ0EsUUFBSUMsZUFBZSxLQUFuQjs7QUFFQSxRQUFJQyxlQUFlLDBCQUFhUCxTQUFiLEVBQXdCUSx3QkFBeEIsRUFBdUNQLGFBQWFRLE1BQWIsRUFBdkMsQ0FBbkI7QUFDQSxRQUFJQyxVQUFXSCxhQUFhSSxNQUFiLEVBQWY7O0FBRUEsUUFBSTtBQUNBUixlQUFPUyxPQUFPQyxXQUFQLEdBQXFCRixNQUFyQixFQUFQO0FBQ0FS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QUFDLE1BQUlELElBQUwsRUFBVSxNQUFJQSxJQUFkLEVBQW1CLE1BQUlBLElBQXZCLEVBQTRCLE1BQUlBLElBQWhDLEVBQXFDLE1BQUlBLElBQXpDLEVBQThDLE1BQUlBLElBQWxELEVBQXVELE1BQUlBLElBQTNELEVBQWdFLE1BQUlBLElBQXBFLENBQVo7QUFDRztBQUNILFFBQUlFLElBQUksQ0FBQyxDQUFUO0FBQ0EsT0FBRztBQUNDUixpQkFBU0csTUFBVDtBQUNBLFVBQUVLLENBQUY7QUFDSCxLQUhELFFBR1FKLEtBQUtDLEdBQUwsQ0FBU0wsS0FBVCxLQUFtQkcsTUFBbkIsSUFBNkJLLElBQUlELE1BQU01QixNQUFOLEdBQWUsQ0FIeEQ7QUFJQSxXQUFPcUIsTUFBTVMsT0FBTixDQUFjLENBQWQsSUFBaUJGLE1BQU1DLENBQU4sQ0FBeEI7QUFDSCxDQWREOztxQkFnQmVULGEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDE0Li5cclxuICovXHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCBzaXplSHVtYW5pemVyIGZyb20gXCJ1dGlscy9zaXplSHVtYW5pemVyXCI7XHJcbmltcG9ydCB7U1RBVEVfSURMRSwgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiwgQ09OVEVOVF9MRVZFTF9DSEFOR0VELCAgU1RBVEVfUExBWUlORywgUFJPVklERVJfREFTSCwgQ09OVEVOVF9NRVRBfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIGRhc2hqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcbmNvbnN0IERBU0hFUlJPUiA9IHtcclxuICAgIERPV05MT0FEIDogXCJkb3dubG9hZFwiLFxyXG4gICAgTUFOSUZFU1RFUlJPUiA6IFwibWFuaWZlc3RFcnJvclwiXHJcbn07XHJcbmNvbnN0IERhc2ggPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGRhc2ggPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcclxuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcclxuICAgIGxldCBpc0ZpcnN0RXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgUFJPVklERVJfREFTSCwgcGxheWVyQ29uZmlnLmlzTG9vcCgpKTtcclxuICAgIGxldCBlbGVtZW50ID0gIG1lZGlhTWFuYWdlci5jcmVhdGUoKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGRhc2ggPSBkYXNoanMuTWVkaWFQbGF5ZXIoKS5jcmVhdGUoKTtcclxuICAgICAgICBkYXNoLmdldERlYnVnKCkuc2V0TG9nVG9Ccm93c2VyQ29uc29sZShmYWxzZSk7XHJcbiAgICAgICAgZGFzaC5pbml0aWFsaXplKGVsZW1lbnQsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICAgICAgbmFtZSA6IFBST1ZJREVSX0RBU0gsXHJcbiAgICAgICAgICAgIGV4dGVuZGVkRWxlbWVudCA6IGRhc2gsXHJcbiAgICAgICAgICAgIGxpc3RlbmVyIDogbnVsbCxcclxuICAgICAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0xpdmUgOiBmYWxzZSxcclxuICAgICAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXHJcbiAgICAgICAgICAgIGJ1ZmZlciA6IDAsXHJcbiAgICAgICAgICAgIGZyYW1lcmF0ZSA6IDAsXHJcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcclxuICAgICAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxyXG4gICAgICAgICAgICBzb3VyY2VzIDogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBmdW5jdGlvbihzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHkodHJ1ZSk7XHJcbiAgICAgICAgICAgIGRhc2guYXR0YWNoU291cmNlKHNvdXJjZS5maWxlKTtcclxuICAgICAgICAgICAgc2Vla1Bvc2l0aW9uX3NlYyA9IGxhc3RQbGF5UG9zaXRpb247XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuRVJST1IsIGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgaWYoZXJyb3IgJiYgIWlzRmlyc3RFcnJvciAmJiAoIGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuRE9XTkxPQUQgfHwgZXJyb3IuZXJyb3IgPT09IERBU0hFUlJPUi5NQU5JRkVTVEVSUk9SICkpe1xyXG4gICAgICAgICAgICAgICAgaXNGaXJzdEVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih7Y29kZSA6IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsIHJlYXNvbiA6IFwiVW5rbm93biBuZXR3b3JrIGVycm9yXCIsIG1lc3NhZ2UgOiBcIlVua25vd24gbmV0d29yayBlcnJvclwifSwgdGhhdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFUVVFU1RFRCwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBpZihldmVudCAmJiBldmVudC5tZWRpYVR5cGUgJiYgZXZlbnQubWVkaWFUeXBlID09PSBcInZpZGVvXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBzcGVjLmN1cnJlbnRRdWFsaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgOiBcInJlcXVlc3RcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVOREVSRUQsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgaWYoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKXtcclxuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBldmVudC5uZXdRdWFsaXR5O1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBldmVudC5uZXdRdWFsaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgOiBcInJlbmRlclwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGF0Lm9uKENPTlRFTlRfTUVUQSwgZnVuY3Rpb24obWV0YSl7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkdldFN0cmVhbUluZm8gIDogXCIsIGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJylbZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIildKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdWJRdWFsaXR5TGlzdCA9IGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpO1xyXG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIik7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdWJRdWFsaXR5TGlzdC5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICAgICAgc3BlYy5xdWFsaXR5TGV2ZWxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGJpdHJhdGU6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBzdWJRdWFsaXR5TGlzdFtpXS5xdWFsaXR5SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCtcInhcIitzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQrXCIsIFwiKyBzaXplSHVtYW5pemVyKHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsIHRydWUsIFwiYnBzXCIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZGFzaC5pc0R5bmFtaWMoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihzZWVrUG9zaXRpb25fc2VjKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXNoLnNlZWsoc2Vla1Bvc2l0aW9uX3NlYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGF0KTtcclxuICAgICAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IHF1YWxpdHlJbmRleDtcclxuICAgICAgICAgICAgaWYoZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eSgpKXtcclxuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHkoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhc2guc2V0UXVhbGl0eUZvcihcInZpZGVvXCIsIHF1YWxpdHlJbmRleCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHkoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XHJcbiAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHkoaXNBdXRvKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgICAgICBkYXNoLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcclxuXHJcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1jYXRjaChlcnJvcil7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXNoO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxNC4uXHJcbiAqL1xyXG5cclxuY29uc3Qgc2l6ZUh1bWFuaXplciA9IGZ1bmN0aW9uIChieXRlcywgc2ksIHBvc3RwaXgpIHtcclxuICAgIGxldCB0aHJlc2ggPSBzaSA/IDEwMDAgOiAxMDI0O1xyXG4gICAgaWYoTWF0aC5hYnMoYnl0ZXMpIDwgdGhyZXNoKSB7XHJcbiAgICAgICAgcmV0dXJuIGJ5dGVzICsgJyBCJztcclxuICAgIH1cclxuICAgIGxldCB1bml0ID0gcG9zdHBpeHx8XCJCXCI7XHJcbiAgICBsZXQgdW5pdHMgPSBbJ2snK3VuaXQsJ00nK3VuaXQsJ0cnK3VuaXQsJ1QnK3VuaXQsJ1AnK3VuaXQsJ0UnK3VuaXQsJ1onK3VuaXQsJ1knK3VuaXRdO1xyXG4gICAgICAgLy8gPyBbJ2tCJywnTUInLCdHQicsJ1RCJywnUEInLCdFQicsJ1pCJywnWUInXTogWydLaUInLCdNaUInLCdHaUInLCdUaUInLCdQaUInLCdFaUInLCdaaUInLCdZaUInXTtcclxuICAgIGxldCB1ID0gLTE7XHJcbiAgICBkbyB7XHJcbiAgICAgICAgYnl0ZXMgLz0gdGhyZXNoO1xyXG4gICAgICAgICsrdTtcclxuICAgIH0gd2hpbGUoTWF0aC5hYnMoYnl0ZXMpID49IHRocmVzaCAmJiB1IDwgdW5pdHMubGVuZ3RoIC0gMSk7XHJcbiAgICByZXR1cm4gYnl0ZXMudG9GaXhlZCgxKSt1bml0c1t1XTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2l6ZUh1bWFuaXplcjsiXSwic291cmNlUm9vdCI6IiJ9