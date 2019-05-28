/*! OvenPlayerv0.9.5896 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        var coveredSetAutoSwitchQualityFor = function coveredSetAutoSwitchQualityFor(isAuto) {
            if (dashjs.Version > "2.9.0") {
                dash.setAutoSwitchQualityFor("video", isAuto);
            } else {
                dash.setAutoSwitchQualityFor(isAuto);
            }
        };
        var coveredGetAutoSwitchQualityFor = function coveredGetAutoSwitchQualityFor() {
            var result = "";
            if (dashjs.Version > "2.9.0") {
                result = dash.getAutoSwitchQualityFor("video");
            } else {
                result = dash.getAutoSwitchQualityFor();
            }
            return result;
        };
        dash = dashjs.MediaPlayer().create();
        if (dashjs.Version < "2.6.5") {
            throw _constants.ERRORS[103];
        }
        dash.getDebug().setLogToBrowserConsole(false);
        dash.initialize(element, null, false);

        var spec = {
            name: _constants.PROVIDER_DASH,
            element: element,
            mse: dash,
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
            coveredSetAutoSwitchQualityFor(true);
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
                    isAuto: coveredGetAutoSwitchQualityFor(),
                    currentQuality: spec.currentQuality,
                    type: "request"
                });
            }
        });
        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function (event) {
            if (event && event.mediaType && event.mediaType === "video") {
                spec.currentQuality = event.newQuality;
                that.trigger(_constants.CONTENT_LEVEL_CHANGED, {
                    isAuto: coveredGetAutoSwitchQualityFor(),
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
                //that.play();
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
            if (coveredGetAutoSwitchQualityFor()) {
                coveredSetAutoSwitchQualityFor(false);
            }
            dash.setQualityFor("video", qualityIndex);
            return spec.currentQuality;
        };
        that.isAutoQuality = function () {
            return coveredGetAutoSwitchQualityFor();
        };
        that.setAutoQuality = function (isAuto) {
            coveredSetAutoSwitchQualityFor(isAuto);
        };
        that.destroy = function () {
            dash.reset();
            OvenPlayerConsole.log("DASH : PROVIDER DESTROYED.");
            superDestroy_func();
        };
    } catch (error) {
        if (error.code && error.message) {
            throw error;
        } else {
            throw new Error(error);
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyRGVzdHJveV9mdW5jIiwic2Vla1Bvc2l0aW9uX3NlYyIsImlzRmlyc3RFcnJvciIsImNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsImlzQXV0byIsImRhc2hqcyIsIlZlcnNpb24iLCJzZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsImNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsInJlc3VsdCIsImdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiTWVkaWFQbGF5ZXIiLCJjcmVhdGUiLCJFUlJPUlMiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJpbml0aWFsaXplIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9EQVNIIiwibXNlIiwibGlzdGVuZXIiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImZyYW1lcmF0ZSIsImN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFNvdXJjZSIsInF1YWxpdHlMZXZlbHMiLCJzb3VyY2VzIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiYXR0YWNoU291cmNlIiwiZmlsZSIsIm9uIiwiZXZlbnRzIiwiRVJST1IiLCJlcnJvciIsInRlbXBFcnJvciIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJRVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQiLCJldmVudCIsIm1lZGlhVHlwZSIsInRyaWdnZXIiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJ0eXBlIiwiUVVBTElUWV9DSEFOR0VfUkVOREVSRUQiLCJuZXdRdWFsaXR5IiwiQ09OVEVOVF9NRVRBIiwibWV0YSIsImdldFF1YWxpdHlGb3IiLCJnZXRCaXRyYXRlSW5mb0xpc3RGb3IiLCJzdWJRdWFsaXR5TGlzdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwiYml0cmF0ZSIsImhlaWdodCIsIndpZHRoIiwiaW5kZXgiLCJxdWFsaXR5SW5kZXgiLCJsYWJlbCIsImlzRHluYW1pYyIsInNlZWsiLCJwbGF5Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJnZXRTdGF0ZSIsIlNUQVRFX1BMQVlJTkciLCJzZXRRdWFsaXR5Rm9yIiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiZGVzdHJveSIsInJlc2V0IiwiY29kZSIsIm1lc3NhZ2UiLCJFcnJvciIsInNpemVIdW1hbml6ZXIiLCJieXRlcyIsInNpIiwicG9zdHBpeCIsInRocmVzaCIsIk1hdGgiLCJhYnMiLCJ1bml0IiwidW5pdHMiLCJ1IiwidG9GaXhlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7QUFSQTs7O0FBYUEsSUFBTUEsWUFBWTtBQUNkQyxjQUFXLFVBREc7QUFFZEMsbUJBQWdCO0FBRkYsQ0FBbEI7QUFJQSxJQUFNQyxPQUFPLFNBQVBBLElBQU8sQ0FBU0MsT0FBVCxFQUFrQkMsWUFBbEIsRUFBZ0NDLFFBQWhDLEVBQXlDO0FBQ2xELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLGVBQWUsS0FBbkI7O0FBRUEsUUFBSTtBQUNBLFlBQU1DLGlDQUFpQyxTQUFqQ0EsOEJBQWlDLENBQVNDLE1BQVQsRUFBZ0I7QUFDbkQsZ0JBQUdDLE9BQU9DLE9BQVAsR0FBaUIsT0FBcEIs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Q1QsWUFBR0EsTUFBTW9DLElBQU4sSUFBY3BDLE1BQU1xQyxPQUF2QixFQUErQjtBQUMzQixrQkFBTXJDLEtBQU47QUFDSCxTQUZELE1BRUs7QUFDRCxrQkFBTSxJQUFJc0MsS0FBSixDQUFVdEMsS0FBVixDQUFOO0FBQ0g7QUFFSjs7QUFFRCxXQUFPNUMsSUFBUDtBQUNILENBL0lEOztxQkFrSmVKLEk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbktmOzs7O0FBSUEsSUFBTXVGLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBVUMsS0FBVixFQUFpQkMsRUFBakIsRUFBcUJDLE9BQXJCLEVBQThCO0FBQ2hELFFBQUlDLFNBQVNGLEtBQUssSUFBTCxHQUFZLElBQXpCO0FBQ0EsUUFBR0csS0FBS0MsR0FBTCxDQUFTTCxLQUFULElBQWtCRyxNQUFyQixFQUE2QjtBQUN6QixlQUFPSCxRQUFRLElBQWY7QUFDSDtBQUNELFFBQUlNLE9BQU9KLFdBQVMsR0FBcEI7QUFDQSxRQUFJSyxRQUFRLENBQUMsTUFBSUQsSUFBTCxFQUFVLE1BQUlBLElBQWQsRUFBbUIsTUFBSUEsSUFBdkIsRUFBNEIsTUFBSUEsSUFBaEMsRUFBcUMsTUFBSUEsSUFBekMsRUFBOEMsTUFBSUEsSUFBbEQsRUFBdUQsTUFBSUEsSUFBM0QsRUFBZ0UsTUFBSUEsSUFBcEUsQ0FBWjtBQUNHO0FBQ0gsUUFBSUUsSUFBSSxDQUFDLENBQVQ7QUFDQSxPQUFHO0FBQ0NSLGlCQUFTRyxNQUFUO0FBQ0EsVUFBRUssQ0FBRjtBQUNILEtBSEQsUUFHUUosS0FBS0MsR0FBTCxDQUFTTCxLQUFULEtBQW1CRyxNQUFuQixJQUE2QkssSUFBSUQsTUFBTTlCLE1BQU4sR0FBZSxDQUh4RDtBQUlBLFdBQU91QixNQUFNUyxPQUFOLENBQWMsQ0FBZCxJQUFpQkYsTUFBTUMsQ0FBTixDQUF4QjtBQUNILENBZEQ7O3FCQWdCZVQsYSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDE0Li5cbiAqL1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQgc2l6ZUh1bWFuaXplciBmcm9tIFwidXRpbHMvc2l6ZUh1bWFuaXplclwiO1xuaW1wb3J0IHtTVEFURV9JRExFLCBFUlJPUlMsIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwgIFNUQVRFX1BMQVlJTkcsIFBST1ZJREVSX0RBU0gsIENPTlRFTlRfTUVUQX0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBkYXNoanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuY29uc3QgREFTSEVSUk9SID0ge1xuICAgIERPV05MT0FEIDogXCJkb3dubG9hZFwiLFxuICAgIE1BTklGRVNURVJST1IgOiBcIm1hbmlmZXN0RXJyb3JcIlxufTtcbmNvbnN0IERhc2ggPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBkYXNoID0gbnVsbDtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcbiAgICBsZXQgaXNGaXJzdEVycm9yID0gZmFsc2U7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IgPSBmdW5jdGlvbihpc0F1dG8pe1xuICAgICAgICAgICAgaWYoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpe1xuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiLCBpc0F1dG8pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZGFzaC5zZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihpc0F1dG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgICAgICBpZihkYXNoanMuVmVyc2lvbiA+IFwiMi45LjBcIil7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihcInZpZGVvXCIpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgZGFzaCA9IGRhc2hqcy5NZWRpYVBsYXllcigpLmNyZWF0ZSgpO1xuICAgICAgICBpZihkYXNoanMuVmVyc2lvbiA8IFwiMi42LjVcIil7XG4gICAgICAgICAgICB0aHJvdyBFUlJPUlNbMTAzXTtcbiAgICAgICAgfVxuICAgICAgICBkYXNoLmdldERlYnVnKCkuc2V0TG9nVG9Ccm93c2VyQ29uc29sZShmYWxzZSk7XG4gICAgICAgIGRhc2guaW5pdGlhbGl6ZShlbGVtZW50LCBudWxsLCBmYWxzZSk7XG5cbiAgICAgICAgbGV0IHNwZWMgPSB7XG4gICAgICAgICAgICBuYW1lIDogUFJPVklERVJfREFTSCxcbiAgICAgICAgICAgIGVsZW1lbnQgOiBlbGVtZW50LFxuICAgICAgICAgICAgbXNlIDogZGFzaCxcbiAgICAgICAgICAgIGxpc3RlbmVyIDogbnVsbCxcbiAgICAgICAgICAgIGNhblNlZWsgOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxuICAgICAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxuICAgICAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxuICAgICAgICAgICAgYnVmZmVyIDogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZSA6IDAsXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxuICAgICAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxuICAgICAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxuICAgICAgICAgICAgc291cmNlcyA6IFtdLFxuICAgICAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbil7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IodHJ1ZSk7XG4gICAgICAgICAgICBkYXNoLmF0dGFjaFNvdXJjZShzb3VyY2UuZmlsZSk7XG4gICAgICAgICAgICBzZWVrUG9zaXRpb25fc2VjID0gbGFzdFBsYXlQb3NpdGlvbjtcbiAgICAgICAgfSk7XG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIFBST1ZJREVSIExPQURFRC5cIik7XG5cbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLkVSUk9SLCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICBpZihlcnJvciAmJiAhaXNGaXJzdEVycm9yICYmICggZXJyb3IuZXJyb3IgPT09IERBU0hFUlJPUi5ET1dOTE9BRCB8fCBlcnJvci5lcnJvciA9PT0gREFTSEVSUk9SLk1BTklGRVNURVJST1IgKSl7XG4gICAgICAgICAgICAgICAgaXNGaXJzdEVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1JdO1xuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVRVUVTVEVELCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBpZihldmVudCAmJiBldmVudC5tZWRpYVR5cGUgJiYgZXZlbnQubWVkaWFUeXBlID09PSBcInZpZGVvXCIpe1xuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICAgICAgaXNBdXRvOiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IHNwZWMuY3VycmVudFF1YWxpdHksXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgOiBcInJlcXVlc3RcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVELCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBpZihldmVudCAmJiBldmVudC5tZWRpYVR5cGUgJiYgZXZlbnQubWVkaWFUeXBlID09PSBcInZpZGVvXCIpe1xuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBldmVudC5uZXdRdWFsaXR5O1xuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICAgICAgaXNBdXRvOiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IGV2ZW50Lm5ld1F1YWxpdHksXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgOiBcInJlbmRlclwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoYXQub24oQ09OVEVOVF9NRVRBLCBmdW5jdGlvbihtZXRhKXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkdldFN0cmVhbUluZm8gIDogXCIsIGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJylbZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIildKTtcblxuICAgICAgICAgICAgbGV0IHN1YlF1YWxpdHlMaXN0ID0gZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyk7XG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIik7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc3ViUXVhbGl0eUxpc3QubGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgICAgICBzcGVjLnF1YWxpdHlMZXZlbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGJpdHJhdGU6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBzdWJRdWFsaXR5TGlzdFtpXS5xdWFsaXR5SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsIDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGgrXCJ4XCIrc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0K1wiLCBcIisgc2l6ZUh1bWFuaXplcihzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCB0cnVlLCBcImJwc1wiKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihkYXNoLmlzRHluYW1pYygpKXtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGxheSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYoc2Vla1Bvc2l0aW9uX3NlYyl7XG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2VlayhzZWVrUG9zaXRpb25fc2VjKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGF0KTtcbiAgICAgICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gcXVhbGl0eUluZGV4O1xuICAgICAgICAgICAgaWYoY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCkpe1xuICAgICAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXNoLnNldFF1YWxpdHlGb3IoXCJ2aWRlb1wiLCBxdWFsaXR5SW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcbiAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihpc0F1dG8pO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgICAgIGRhc2gucmVzZXQoKTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICAgICAgfTtcbiAgICB9Y2F0Y2goZXJyb3Ipe1xuICAgICAgICBpZihlcnJvci5jb2RlICYmIGVycm9yLm1lc3NhZ2Upe1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IERhc2g7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTQuLlxuICovXG5cbmNvbnN0IHNpemVIdW1hbml6ZXIgPSBmdW5jdGlvbiAoYnl0ZXMsIHNpLCBwb3N0cGl4KSB7XG4gICAgbGV0IHRocmVzaCA9IHNpID8gMTAwMCA6IDEwMjQ7XG4gICAgaWYoTWF0aC5hYnMoYnl0ZXMpIDwgdGhyZXNoKSB7XG4gICAgICAgIHJldHVybiBieXRlcyArICcgQic7XG4gICAgfVxuICAgIGxldCB1bml0ID0gcG9zdHBpeHx8XCJCXCI7XG4gICAgbGV0IHVuaXRzID0gWydrJyt1bml0LCdNJyt1bml0LCdHJyt1bml0LCdUJyt1bml0LCdQJyt1bml0LCdFJyt1bml0LCdaJyt1bml0LCdZJyt1bml0XTtcbiAgICAgICAvLyA/IFsna0InLCdNQicsJ0dCJywnVEInLCdQQicsJ0VCJywnWkInLCdZQiddOiBbJ0tpQicsJ01pQicsJ0dpQicsJ1RpQicsJ1BpQicsJ0VpQicsJ1ppQicsJ1lpQiddO1xuICAgIGxldCB1ID0gLTE7XG4gICAgZG8ge1xuICAgICAgICBieXRlcyAvPSB0aHJlc2g7XG4gICAgICAgICsrdTtcbiAgICB9IHdoaWxlKE1hdGguYWJzKGJ5dGVzKSA+PSB0aHJlc2ggJiYgdSA8IHVuaXRzLmxlbmd0aCAtIDEpO1xuICAgIHJldHVybiBieXRlcy50b0ZpeGVkKDEpK3VuaXRzW3VdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaXplSHVtYW5pemVyOyJdLCJzb3VyY2VSb290IjoiIn0=