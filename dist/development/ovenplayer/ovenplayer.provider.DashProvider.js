/*! OvenPlayerv0.9.4 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
/**
 * Created by hoho on 2018. 6. 14..
 */
var DASHERROR = {
    DOWNLOAD: "download",
    MANIFESTERROR: "manifestError"
};
var Dash = function Dash(element, playerConfig, adTagUrl) {
    var that = {};
    var dash = null;
    var superDestroy_func = null;
    var seekPosition_sec = 0;
    var isFirstError = false;

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
            sources: [],
            adTagUrl: adTagUrl
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
                var tempError = _constants.ERRORS[_constants.PLAYER_UNKNWON_NEWWORK_ERROR];
                tempError.error = error;
                (0, _utils.errorTrigger)(tempError, that);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyRGVzdHJveV9mdW5jIiwic2Vla1Bvc2l0aW9uX3NlYyIsImlzRmlyc3RFcnJvciIsImRhc2hqcyIsIk1lZGlhUGxheWVyIiwiY3JlYXRlIiwiZ2V0RGVidWciLCJzZXRMb2dUb0Jyb3dzZXJDb25zb2xlIiwiaW5pdGlhbGl6ZSIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfREFTSCIsImV4dGVuZGVkRWxlbWVudCIsImxpc3RlbmVyIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsInNldEF1dG9Td2l0Y2hRdWFsaXR5IiwiYXR0YWNoU291cmNlIiwiZmlsZSIsIm9uIiwiZXZlbnRzIiwiRVJST1IiLCJlcnJvciIsInRlbXBFcnJvciIsIkVSUk9SUyIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJRVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQiLCJldmVudCIsIm1lZGlhVHlwZSIsInRyaWdnZXIiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJpc0F1dG8iLCJnZXRBdXRvU3dpdGNoUXVhbGl0eSIsInR5cGUiLCJRVUFMSVRZX0NIQU5HRV9SRU5ERVJFRCIsIm5ld1F1YWxpdHkiLCJDT05URU5UX01FVEEiLCJtZXRhIiwiZ2V0UXVhbGl0eUZvciIsImdldEJpdHJhdGVJbmZvTGlzdEZvciIsInN1YlF1YWxpdHlMaXN0IiwiaSIsImxlbmd0aCIsInB1c2giLCJiaXRyYXRlIiwiaGVpZ2h0Iiwid2lkdGgiLCJpbmRleCIsInF1YWxpdHlJbmRleCIsImxhYmVsIiwiaXNEeW5hbWljIiwicGxheSIsInNlZWsiLCJzZXRDdXJyZW50UXVhbGl0eSIsImdldFN0YXRlIiwiU1RBVEVfUExBWUlORyIsInNldFF1YWxpdHlGb3IiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJkZXN0cm95IiwicmVzZXQiLCJFcnJvciIsInNpemVIdW1hbml6ZXIiLCJieXRlcyIsInNpIiwicG9zdHBpeCIsInRocmVzaCIsIk1hdGgiLCJhYnMiLCJ1bml0IiwidW5pdHMiLCJ1IiwidG9GaXhlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7QUFSQTs7O0FBYUEsSUFBTUEsWUFBWTtBQUNkQyxjQUFXLFVBREc7QUFFZEMsbUJBQWdCO0FBRkYsQ0FBbEI7QUFJQSxJQUFNQyxPQUFPLFNBQVBBLElBQU8sQ0FBU0MsT0FBVCxFQUFrQkMsWUFBbEIsRUFBZ0NDLFFBQWhDLEVBQXlDO0FBQ2xELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLGVBQWUsS0FBbkI7O0FBRUEsUUFBSTtBQUNBSCxlQUFPSSxPQUFPQyxXQUFQLEdBQXFCQyxNQUFyQixFQUFQO0FBQ0FOLGFBQUtPLFFBQUwsR0FBZ0JDLHNCQUFoQixDQUF1QyxLQUF2QztBQUNBUixhQUFLUyxVQUFMLENBQWdCYixPQUFoQixFQUF5QixJQUF6QixFQUErQixLQUEvQjtBQUNBLFlBQUljLE9BQU87QUFDUEMsa0JBQU9DLHdCQURBO0FBRVBDLDZC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LENBQUMsQ0FBVDtBQUNBLE9BQUc7QUFDQ1IsaUJBQVNHLE1BQVQ7QUFDQSxVQUFFSyxDQUFGO0FBQ0gsS0FIRCxRQUdRSixLQUFLQyxHQUFMLENBQVNMLEtBQVQsS0FBbUJHLE1BQW5CLElBQTZCSyxJQUFJRCxNQUFNNUIsTUFBTixHQUFlLENBSHhEO0FBSUEsV0FBT3FCLE1BQU1TLE9BQU4sQ0FBYyxDQUFkLElBQWlCRixNQUFNQyxDQUFOLENBQXhCO0FBQ0gsQ0FkRDs7cUJBZ0JlVCxhIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAxNC4uXHJcbiAqL1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQgc2l6ZUh1bWFuaXplciBmcm9tIFwidXRpbHMvc2l6ZUh1bWFuaXplclwiO1xyXG5pbXBvcnQge1NUQVRFX0lETEUsIEVSUk9SUywgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiwgQ09OVEVOVF9MRVZFTF9DSEFOR0VELCAgU1RBVEVfUExBWUlORywgUFJPVklERVJfREFTSCwgQ09OVEVOVF9NRVRBfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIGRhc2hqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcbmNvbnN0IERBU0hFUlJPUiA9IHtcclxuICAgIERPV05MT0FEIDogXCJkb3dubG9hZFwiLFxyXG4gICAgTUFOSUZFU1RFUlJPUiA6IFwibWFuaWZlc3RFcnJvclwiXHJcbn07XHJcbmNvbnN0IERhc2ggPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgZGFzaCA9IG51bGw7XHJcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xyXG4gICAgbGV0IHNlZWtQb3NpdGlvbl9zZWMgPSAwO1xyXG4gICAgbGV0IGlzRmlyc3RFcnJvciA9IGZhbHNlO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgZGFzaCA9IGRhc2hqcy5NZWRpYVBsYXllcigpLmNyZWF0ZSgpO1xyXG4gICAgICAgIGRhc2guZ2V0RGVidWcoKS5zZXRMb2dUb0Jyb3dzZXJDb25zb2xlKGZhbHNlKTtcclxuICAgICAgICBkYXNoLmluaXRpYWxpemUoZWxlbWVudCwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgICAgICBuYW1lIDogUFJPVklERVJfREFTSCxcclxuICAgICAgICAgICAgZXh0ZW5kZWRFbGVtZW50IDogZGFzaCxcclxuICAgICAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxyXG4gICAgICAgICAgICBjYW5TZWVrIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWVraW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcclxuICAgICAgICAgICAgYnVmZmVyIDogMCxcclxuICAgICAgICAgICAgZnJhbWVyYXRlIDogMCxcclxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcclxuICAgICAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxyXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXHJcbiAgICAgICAgICAgIHNvdXJjZXMgOiBbXSxcclxuICAgICAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbil7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBvbkV4dGVuZGVkTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgZGFzaC5zZXRBdXRvU3dpdGNoUXVhbGl0eSh0cnVlKTtcclxuICAgICAgICAgICAgZGFzaC5hdHRhY2hTb3VyY2Uoc291cmNlLmZpbGUpO1xyXG4gICAgICAgICAgICBzZWVrUG9zaXRpb25fc2VjID0gbGFzdFBsYXlQb3NpdGlvbjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIFBST1ZJREVSIExPQURFRC5cIik7XHJcblxyXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5FUlJPUiwgZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICBpZihlcnJvciAmJiAhaXNGaXJzdEVycm9yICYmICggZXJyb3IuZXJyb3IgPT09IERBU0hFUlJPUi5ET1dOTE9BRCB8fCBlcnJvci5lcnJvciA9PT0gREFTSEVSUk9SLk1BTklGRVNURVJST1IgKSl7XHJcbiAgICAgICAgICAgICAgICBpc0ZpcnN0RXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKHRlbXBFcnJvciwgdGhhdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFUVVFU1RFRCwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBpZihldmVudCAmJiBldmVudC5tZWRpYVR5cGUgJiYgZXZlbnQubWVkaWFUeXBlID09PSBcInZpZGVvXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBzcGVjLmN1cnJlbnRRdWFsaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgOiBcInJlcXVlc3RcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVOREVSRUQsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgaWYoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKXtcclxuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBldmVudC5uZXdRdWFsaXR5O1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBldmVudC5uZXdRdWFsaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgOiBcInJlbmRlclwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGF0Lm9uKENPTlRFTlRfTUVUQSwgZnVuY3Rpb24obWV0YSl7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkdldFN0cmVhbUluZm8gIDogXCIsIGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJylbZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIildKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdWJRdWFsaXR5TGlzdCA9IGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpO1xyXG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIik7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdWJRdWFsaXR5TGlzdC5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICAgICAgc3BlYy5xdWFsaXR5TGV2ZWxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGJpdHJhdGU6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBzdWJRdWFsaXR5TGlzdFtpXS5xdWFsaXR5SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCtcInhcIitzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQrXCIsIFwiKyBzaXplSHVtYW5pemVyKHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsIHRydWUsIFwiYnBzXCIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZGFzaC5pc0R5bmFtaWMoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihzZWVrUG9zaXRpb25fc2VjKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXNoLnNlZWsoc2Vla1Bvc2l0aW9uX3NlYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGF0KTtcclxuICAgICAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IHF1YWxpdHlJbmRleDtcclxuICAgICAgICAgICAgaWYoZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eSgpKXtcclxuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHkoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhc2guc2V0UXVhbGl0eUZvcihcInZpZGVvXCIsIHF1YWxpdHlJbmRleCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHkoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XHJcbiAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHkoaXNBdXRvKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgICAgICBkYXNoLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xyXG4gICAgICAgIH07XHJcbiAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaDtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTQuLlxyXG4gKi9cclxuXHJcbmNvbnN0IHNpemVIdW1hbml6ZXIgPSBmdW5jdGlvbiAoYnl0ZXMsIHNpLCBwb3N0cGl4KSB7XHJcbiAgICBsZXQgdGhyZXNoID0gc2kgPyAxMDAwIDogMTAyNDtcclxuICAgIGlmKE1hdGguYWJzKGJ5dGVzKSA8IHRocmVzaCkge1xyXG4gICAgICAgIHJldHVybiBieXRlcyArICcgQic7XHJcbiAgICB9XHJcbiAgICBsZXQgdW5pdCA9IHBvc3RwaXh8fFwiQlwiO1xyXG4gICAgbGV0IHVuaXRzID0gWydrJyt1bml0LCdNJyt1bml0LCdHJyt1bml0LCdUJyt1bml0LCdQJyt1bml0LCdFJyt1bml0LCdaJyt1bml0LCdZJyt1bml0XTtcclxuICAgICAgIC8vID8gWydrQicsJ01CJywnR0InLCdUQicsJ1BCJywnRUInLCdaQicsJ1lCJ106IFsnS2lCJywnTWlCJywnR2lCJywnVGlCJywnUGlCJywnRWlCJywnWmlCJywnWWlCJ107XHJcbiAgICBsZXQgdSA9IC0xO1xyXG4gICAgZG8ge1xyXG4gICAgICAgIGJ5dGVzIC89IHRocmVzaDtcclxuICAgICAgICArK3U7XHJcbiAgICB9IHdoaWxlKE1hdGguYWJzKGJ5dGVzKSA+PSB0aHJlc2ggJiYgdSA8IHVuaXRzLmxlbmd0aCAtIDEpO1xyXG4gICAgcmV0dXJuIGJ5dGVzLnRvRml4ZWQoMSkrdW5pdHNbdV07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNpemVIdW1hbml6ZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==