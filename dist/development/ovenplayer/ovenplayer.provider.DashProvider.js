/*! OvenPlayerv0.9.47 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyRGVzdHJveV9mdW5jIiwic2Vla1Bvc2l0aW9uX3NlYyIsImlzRmlyc3RFcnJvciIsImNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsImlzQXV0byIsImRhc2hqcyIsIlZlcnNpb24iLCJzZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsImNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsInJlc3VsdCIsImdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiTWVkaWFQbGF5ZXIiLCJjcmVhdGUiLCJFUlJPUlMiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJpbml0aWFsaXplIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9EQVNIIiwiZXh0ZW5kZWRFbGVtZW50IiwibGlzdGVuZXIiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImZyYW1lcmF0ZSIsImN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFNvdXJjZSIsInF1YWxpdHlMZXZlbHMiLCJzb3VyY2VzIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiYXR0YWNoU291cmNlIiwiZmlsZSIsIm9uIiwiZXZlbnRzIiwiRVJST1IiLCJlcnJvciIsInRlbXBFcnJvciIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJRVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQiLCJldmVudCIsIm1lZGlhVHlwZSIsInRyaWdnZXIiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJ0eXBlIiwiUVVBTElUWV9DSEFOR0VfUkVOREVSRUQiLCJuZXdRdWFsaXR5IiwiQ09OVEVOVF9NRVRBIiwibWV0YSIsImdldFF1YWxpdHlGb3IiLCJnZXRCaXRyYXRlSW5mb0xpc3RGb3IiLCJzdWJRdWFsaXR5TGlzdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwiYml0cmF0ZSIsImhlaWdodCIsIndpZHRoIiwiaW5kZXgiLCJxdWFsaXR5SW5kZXgiLCJsYWJlbCIsImlzRHluYW1pYyIsInBsYXkiLCJzZWVrIiwic2V0Q3VycmVudFF1YWxpdHkiLCJnZXRTdGF0ZSIsIlNUQVRFX1BMQVlJTkciLCJzZXRRdWFsaXR5Rm9yIiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiZGVzdHJveSIsInJlc2V0IiwiY29kZSIsIm1lc3NhZ2UiLCJFcnJvciIsInNpemVIdW1hbml6ZXIiLCJieXRlcyIsInNpIiwicG9zdHBpeCIsInRocmVzaCIsIk1hdGgiLCJhYnMiLCJ1bml0IiwidW5pdHMiLCJ1IiwidG9GaXhlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7QUFSQTs7O0FBYUEsSUFBTUEsWUFBWTtBQUNkQyxjQUFXLFVBREc7QUFFZEMsbUJBQWdCO0FBRkYsQ0FBbEI7QUFJQSxJQUFNQyxPQUFPLFNBQVBBLElBQU8sQ0FBU0MsT0FBVCxFQUFrQkMsWUFBbEIsRUFBZ0NDLFFBQWhDLEVBQXlDO0FBQ2xELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLGVBQWUsS0FBbkI7O0FBRUEsUUFBSTtBQUNBLFlBQU1DLGlDQUFpQyxTQUFqQ0EsOEJBQWlDLENBQVNDLE1BQVQsRUFBZ0I7QUFDbkQsZ0JBQUdDLE9BQU9DLE9BQVAs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RUFBWTtBQUNULFlBQUdBLE1BQU1vQyxJQUFOLElBQWNwQyxNQUFNcUMsT0FBdkIsRUFBK0I7QUFDM0Isa0JBQU1yQyxLQUFOO0FBQ0gsU0FGRCxNQUVLO0FBQ0Qsa0JBQU0sSUFBSXNDLEtBQUosQ0FBVXRDLEtBQVYsQ0FBTjtBQUNIO0FBRUo7O0FBRUQsV0FBTzVDLElBQVA7QUFDSCxDQTlJRDs7cUJBaUplSixJOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xLZjs7OztBQUlBLElBQU11RixnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQVVDLEtBQVYsRUFBaUJDLEVBQWpCLEVBQXFCQyxPQUFyQixFQUE4QjtBQUNoRCxRQUFJQyxTQUFTRixLQUFLLElBQUwsR0FBWSxJQUF6QjtBQUNBLFFBQUdHLEtBQUtDLEdBQUwsQ0FBU0wsS0FBVCxJQUFrQkcsTUFBckIsRUFBNkI7QUFDekIsZUFBT0gsUUFBUSxJQUFmO0FBQ0g7QUFDRCxRQUFJTSxPQUFPSixXQUFTLEdBQXBCO0FBQ0EsUUFBSUssUUFBUSxDQUFDLE1BQUlELElBQUwsRUFBVSxNQUFJQSxJQUFkLEVBQW1CLE1BQUlBLElBQXZCLEVBQTRCLE1BQUlBLElBQWhDLEVBQXFDLE1BQUlBLElBQXpDLEVBQThDLE1BQUlBLElBQWxELEVBQXVELE1BQUlBLElBQTNELEVBQWdFLE1BQUlBLElBQXBFLENBQVo7QUFDRztBQUNILFFBQUlFLElBQUksQ0FBQyxDQUFUO0FBQ0EsT0FBRztBQUNDUixpQkFBU0csTUFBVDtBQUNBLFVBQUVLLENBQUY7QUFDSCxLQUhELFFBR1FKLEtBQUtDLEdBQUwsQ0FBU0wsS0FBVCxLQUFtQkcsTUFBbkIsSUFBNkJLLElBQUlELE1BQU05QixNQUFOLEdBQWUsQ0FIeEQ7QUFJQSxXQUFPdUIsTUFBTVMsT0FBTixDQUFjLENBQWQsSUFBaUJGLE1BQU1DLENBQU4sQ0FBeEI7QUFDSCxDQWREOztxQkFnQmVULGEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAxNC4uXG4gKi9cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHNpemVIdW1hbml6ZXIgZnJvbSBcInV0aWxzL3NpemVIdW1hbml6ZXJcIjtcbmltcG9ydCB7U1RBVEVfSURMRSwgRVJST1JTLCBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLCBDT05URU5UX0xFVkVMX0NIQU5HRUQsICBTVEFURV9QTEFZSU5HLCBQUk9WSURFUl9EQVNILCBDT05URU5UX01FVEF9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgZGFzaGpzIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxuICogKi9cbmNvbnN0IERBU0hFUlJPUiA9IHtcbiAgICBET1dOTE9BRCA6IFwiZG93bmxvYWRcIixcbiAgICBNQU5JRkVTVEVSUk9SIDogXCJtYW5pZmVzdEVycm9yXCJcbn07XG5jb25zdCBEYXNoID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgZGFzaCA9IG51bGw7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcbiAgICBsZXQgc2Vla1Bvc2l0aW9uX3NlYyA9IDA7XG4gICAgbGV0IGlzRmlyc3RFcnJvciA9IGZhbHNlO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yID0gZnVuY3Rpb24oaXNBdXRvKXtcbiAgICAgICAgICAgIGlmKGRhc2hqcy5WZXJzaW9uID4gXCIyLjkuMFwiKXtcbiAgICAgICAgICAgICAgICBkYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKFwidmlkZW9cIiwgaXNBdXRvKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICAgICAgaWYoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpe1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIGRhc2ggPSBkYXNoanMuTWVkaWFQbGF5ZXIoKS5jcmVhdGUoKTtcbiAgICAgICAgaWYoZGFzaGpzLlZlcnNpb24gPCBcIjIuNi41XCIpe1xuICAgICAgICAgICAgdGhyb3cgRVJST1JTWzEwM107XG4gICAgICAgIH1cbiAgICAgICAgZGFzaC5nZXREZWJ1ZygpLnNldExvZ1RvQnJvd3NlckNvbnNvbGUoZmFsc2UpO1xuICAgICAgICBkYXNoLmluaXRpYWxpemUoZWxlbWVudCwgbnVsbCwgZmFsc2UpO1xuICAgICAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgICAgIG5hbWUgOiBQUk9WSURFUl9EQVNILFxuICAgICAgICAgICAgZXh0ZW5kZWRFbGVtZW50IDogZGFzaCxcbiAgICAgICAgICAgIGxpc3RlbmVyIDogbnVsbCxcbiAgICAgICAgICAgIGNhblNlZWsgOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxuICAgICAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxuICAgICAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxuICAgICAgICAgICAgYnVmZmVyIDogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZSA6IDAsXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxuICAgICAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxuICAgICAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxuICAgICAgICAgICAgc291cmNlcyA6IFtdLFxuICAgICAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbil7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IodHJ1ZSk7XG4gICAgICAgICAgICBkYXNoLmF0dGFjaFNvdXJjZShzb3VyY2UuZmlsZSk7XG4gICAgICAgICAgICBzZWVrUG9zaXRpb25fc2VjID0gbGFzdFBsYXlQb3NpdGlvbjtcblxuICAgICAgICB9KTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuRVJST1IsIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgIGlmKGVycm9yICYmICFpc0ZpcnN0RXJyb3IgJiYgKCBlcnJvci5lcnJvciA9PT0gREFTSEVSUk9SLkRPV05MT0FEIHx8IGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuTUFOSUZFU1RFUlJPUiApKXtcbiAgICAgICAgICAgICAgICBpc0ZpcnN0RXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUl07XG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKHRlbXBFcnJvciwgdGhhdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGlmKGV2ZW50ICYmIGV2ZW50Lm1lZGlhVHlwZSAmJiBldmVudC5tZWRpYVR5cGUgPT09IFwidmlkZW9cIil7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogc3BlYy5jdXJyZW50UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IFwicmVxdWVzdFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVOREVSRUQsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGlmKGV2ZW50ICYmIGV2ZW50Lm1lZGlhVHlwZSAmJiBldmVudC5tZWRpYVR5cGUgPT09IFwidmlkZW9cIil7XG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGV2ZW50Lm5ld1F1YWxpdHk7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogZXZlbnQubmV3UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IFwicmVuZGVyXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhhdC5vbihDT05URU5UX01FVEEsIGZ1bmN0aW9uKG1ldGEpe1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiR2V0U3RyZWFtSW5mbyAgOiBcIiwgZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKVtkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKV0pO1xuXG4gICAgICAgICAgICBsZXQgc3ViUXVhbGl0eUxpc3QgPSBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKTtcbiAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdWJRdWFsaXR5TGlzdC5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgICAgIHNwZWMucXVhbGl0eUxldmVscy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgYml0cmF0ZTogc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHN1YlF1YWxpdHlMaXN0W2ldLnF1YWxpdHlJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCtcInhcIitzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQrXCIsIFwiKyBzaXplSHVtYW5pemVyKHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsIHRydWUsIFwiYnBzXCIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGRhc2guaXNEeW5hbWljKCkpe1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYoc2Vla1Bvc2l0aW9uX3NlYyl7XG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2VlayhzZWVrUG9zaXRpb25fc2VjKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGF0KTtcbiAgICAgICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gcXVhbGl0eUluZGV4O1xuICAgICAgICAgICAgaWYoY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCkpe1xuICAgICAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXNoLnNldFF1YWxpdHlGb3IoXCJ2aWRlb1wiLCBxdWFsaXR5SW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcbiAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihpc0F1dG8pO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgICAgIGRhc2gucmVzZXQoKTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICAgICAgfTtcbiAgICB9Y2F0Y2goZXJyb3Ipe1xuICAgICAgICBpZihlcnJvci5jb2RlICYmIGVycm9yLm1lc3NhZ2Upe1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IERhc2g7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTQuLlxuICovXG5cbmNvbnN0IHNpemVIdW1hbml6ZXIgPSBmdW5jdGlvbiAoYnl0ZXMsIHNpLCBwb3N0cGl4KSB7XG4gICAgbGV0IHRocmVzaCA9IHNpID8gMTAwMCA6IDEwMjQ7XG4gICAgaWYoTWF0aC5hYnMoYnl0ZXMpIDwgdGhyZXNoKSB7XG4gICAgICAgIHJldHVybiBieXRlcyArICcgQic7XG4gICAgfVxuICAgIGxldCB1bml0ID0gcG9zdHBpeHx8XCJCXCI7XG4gICAgbGV0IHVuaXRzID0gWydrJyt1bml0LCdNJyt1bml0LCdHJyt1bml0LCdUJyt1bml0LCdQJyt1bml0LCdFJyt1bml0LCdaJyt1bml0LCdZJyt1bml0XTtcbiAgICAgICAvLyA/IFsna0InLCdNQicsJ0dCJywnVEInLCdQQicsJ0VCJywnWkInLCdZQiddOiBbJ0tpQicsJ01pQicsJ0dpQicsJ1RpQicsJ1BpQicsJ0VpQicsJ1ppQicsJ1lpQiddO1xuICAgIGxldCB1ID0gLTE7XG4gICAgZG8ge1xuICAgICAgICBieXRlcyAvPSB0aHJlc2g7XG4gICAgICAgICsrdTtcbiAgICB9IHdoaWxlKE1hdGguYWJzKGJ5dGVzKSA+PSB0aHJlc2ggJiYgdSA8IHVuaXRzLmxlbmd0aCAtIDEpO1xuICAgIHJldHVybiBieXRlcy50b0ZpeGVkKDEpK3VuaXRzW3VdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaXplSHVtYW5pemVyOyJdLCJzb3VyY2VSb290IjoiIn0=