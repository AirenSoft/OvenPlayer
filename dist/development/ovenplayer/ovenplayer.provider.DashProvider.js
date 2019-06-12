/*! OvenPlayerv0.9.5975 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

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

var Dash = function Dash(element, playerConfig, adTagUrl) {
    var that = {};
    var dash = null;
    var superPlay_func = null;
    var superDestroy_func = null;
    var seekPosition_sec = 0;
    var isFirstError = false;
    var isDashMetaLoaded = false;
    var runedAutoStart = false;
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
            throw _constants.ERRORS[_constants.INIT_DASH_UNSUPPORT];
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
        superPlay_func = that["super"]('play');
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
        dash.on(dashjs.MediaPlayer.events.PLAYBACK_METADATA_LOADED, function (event) {
            OvenPlayerConsole.log("PLAYBACK_METADATA_LOADED  : ", dash.getQualityFor("video"), dash.getBitrateInfoListFor('video'), dash.getBitrateInfoListFor('video')[dash.getQualityFor("video")]);

            isDashMetaLoaded = true;
            var subQualityList = dash.getBitrateInfoListFor('video');
            spec.currentQuality = dash.getQualityFor("video");
            for (var i = 0; i < subQualityList.length; i++) {
                if (!_underscore2["default"].findWhere(spec.qualityLevels, { bitrate: subQualityList[i].bitrate, height: subQualityList[i].height, width: subQualityList[i].width })) {
                    spec.qualityLevels.push({
                        bitrate: subQualityList[i].bitrate,
                        height: subQualityList[i].height,
                        width: subQualityList[i].width,
                        index: subQualityList[i].qualityIndex,
                        label: subQualityList[i].width + "x" + subQualityList[i].height + ", " + (0, _sizeHumanizer2["default"])(subQualityList[i].bitrate, true, "bps")
                    });
                }
            }

            if (dash.isDynamic()) {
                spec.isLive = true;
            }
            if (seekPosition_sec) {
                dash.seek(seekPosition_sec);
                if (!playerConfig.isAutoStart()) {
                    that.play();
                }
            }
            //
            if (playerConfig.isAutoStart() && !runedAutoStart) {
                that.play();
                runedAutoStart = true;
            }
        });

        //Dash will infinite loading when player is in a paused state for a long time.
        that.play = function (mutedPlay) {
            isDashMetaLoaded = false;
            dash.attachView(element);

            var retryCount = 0;

            (function checkDashMetaLoaded() {
                retryCount++;
                if (isDashMetaLoaded) {
                    superPlay_func(mutedPlay);
                } else {

                    if (retryCount < 300) {
                        setTimeout(checkDashMetaLoaded, 100);
                    } else {
                        that.play();
                    }
                }
            })();
        };

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
        if (error && error.code && error.code === _constants.INIT_DASH_UNSUPPORT) {
            throw error;
        } else {
            var tempError = _constants.ERRORS[_constants.INIT_DASH_NOTFOUND];
            tempError.error = error;
            throw tempError;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwiaXNGaXJzdEVycm9yIiwiaXNEYXNoTWV0YUxvYWRlZCIsInJ1bmVkQXV0b1N0YXJ0IiwiY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiaXNBdXRvIiwiZGFzaGpzIiwiVmVyc2lvbiIsInNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwicmVzdWx0IiwiZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJNZWRpYVBsYXllciIsImNyZWF0ZSIsIkVSUk9SUyIsIklOSVRfREFTSF9VTlNVUFBPUlQiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJpbml0aWFsaXplIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9EQVNIIiwibXNlIiwibGlzdGVuZXIiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImZyYW1lcmF0ZSIsImN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFNvdXJjZSIsInF1YWxpdHlMZXZlbHMiLCJzb3VyY2VzIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiYXR0YWNoU291cmNlIiwiZmlsZSIsIm9uIiwiZXZlbnRzIiwiRVJST1IiLCJlcnJvciIsInRlbXBFcnJvciIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJRVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQiLCJldmVudCIsIm1lZGlhVHlwZSIsInRyaWdnZXIiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJ0eXBlIiwiUVVBTElUWV9DSEFOR0VfUkVOREVSRUQiLCJuZXdRdWFsaXR5IiwiUExBWUJBQ0tfTUVUQURBVEFfTE9BREVEIiwiZ2V0UXVhbGl0eUZvciIsImdldEJpdHJhdGVJbmZvTGlzdEZvciIsInN1YlF1YWxpdHlMaXN0IiwiaSIsImxlbmd0aCIsIl8iLCJmaW5kV2hlcmUiLCJiaXRyYXRlIiwiaGVpZ2h0Iiwid2lkdGgiLCJwdXNoIiwiaW5kZXgiLCJxdWFsaXR5SW5kZXgiLCJsYWJlbCIsImlzRHluYW1pYyIsInNlZWsiLCJpc0F1dG9TdGFydCIsInBsYXkiLCJtdXRlZFBsYXkiLCJhdHRhY2hWaWV3IiwicmV0cnlDb3VudCIsImNoZWNrRGFzaE1ldGFMb2FkZWQiLCJzZXRUaW1lb3V0Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJnZXRTdGF0ZSIsIlNUQVRFX1BMQVlJTkciLCJzZXRRdWFsaXR5Rm9yIiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiZGVzdHJveSIsInJlc2V0IiwiY29kZSIsIklOSVRfREFTSF9OT1RGT1VORCIsInNpemVIdW1hbml6ZXIiLCJieXRlcyIsInNpIiwicG9zdHBpeCIsInRocmVzaCIsIk1hdGgiLCJhYnMiLCJ1bml0IiwidW5pdHMiLCJ1IiwidG9GaXhlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBVUE7Ozs7OztBQUVBOzs7OztBQUtBLElBQU1BLFlBQVk7QUFDZEMsY0FBVyxVQURHO0FBRWRDLG1CQUFnQjtBQUZGLENBQWxCLEMsQ0F2QkE7Ozs7QUEyQkEsSUFBTUMsT0FBTyxTQUFQQSxJQUFPLENBQVNDLE9BQVQsRUFBa0JDLFlBQWxCLEVBQWdDQyxRQUFoQyxFQUF5QztBQUNsRCxRQUFJ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QUFtQkcsTUFBbkIsSUFBNkJLLElBQUlELE1BQU1yQyxNQUFOLEdBQWUsQ0FIeEQ7QUFJQSxXQUFPOEIsTUFBTVMsT0FBTixDQUFjLENBQWQsSUFBaUJGLE1BQU1DLENBQU4sQ0FBeEI7QUFDSCxDQWREOztxQkFnQmVULGEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAxNC4uXG4gKi9cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHNpemVIdW1hbml6ZXIgZnJvbSBcInV0aWxzL3NpemVIdW1hbml6ZXJcIjtcbmltcG9ydCB7XG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIElOSVRfREFTSF9VTlNVUFBPUlQsXG4gICAgSU5JVF9EQVNIX05PVEZPVU5ELFxuICAgIEVSUk9SUyxcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCxcbiAgICBQUk9WSURFUl9EQVNILCBDT05URU5UX01FVEFcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbi8qKlxuICogQGJyaWVmICAgZGFzaGpzIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxuICogKi9cbmNvbnN0IERBU0hFUlJPUiA9IHtcbiAgICBET1dOTE9BRCA6IFwiZG93bmxvYWRcIixcbiAgICBNQU5JRkVTVEVSUk9SIDogXCJtYW5pZmVzdEVycm9yXCJcbn07XG5jb25zdCBEYXNoID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgZGFzaCA9IG51bGw7XG4gICAgbGV0IHN1cGVyUGxheV9mdW5jID0gbnVsbDtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcbiAgICBsZXQgaXNGaXJzdEVycm9yID0gZmFsc2U7XG4gICAgbGV0IGlzRGFzaE1ldGFMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgcnVuZWRBdXRvU3RhcnQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IgPSBmdW5jdGlvbihpc0F1dG8pe1xuICAgICAgICAgICAgaWYoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpe1xuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiLCBpc0F1dG8pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZGFzaC5zZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihpc0F1dG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgICAgICBpZihkYXNoanMuVmVyc2lvbiA+IFwiMi45LjBcIil7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihcInZpZGVvXCIpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgZGFzaCA9IGRhc2hqcy5NZWRpYVBsYXllcigpLmNyZWF0ZSgpO1xuICAgICAgICBpZihkYXNoanMuVmVyc2lvbiA8IFwiMi42LjVcIil7XG4gICAgICAgICAgICB0aHJvdyBFUlJPUlNbSU5JVF9EQVNIX1VOU1VQUE9SVF07XG4gICAgICAgIH1cbiAgICAgICAgZGFzaC5nZXREZWJ1ZygpLnNldExvZ1RvQnJvd3NlckNvbnNvbGUoZmFsc2UpO1xuICAgICAgICBkYXNoLmluaXRpYWxpemUoZWxlbWVudCwgbnVsbCwgZmFsc2UpO1xuXG4gICAgICAgIGxldCBzcGVjID0ge1xuICAgICAgICAgICAgbmFtZSA6IFBST1ZJREVSX0RBU0gsXG4gICAgICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcbiAgICAgICAgICAgIG1zZSA6IGRhc2gsXG4gICAgICAgICAgICBsaXN0ZW5lciA6IG51bGwsXG4gICAgICAgICAgICBjYW5TZWVrIDogZmFsc2UsXG4gICAgICAgICAgICBpc0xpdmUgOiBmYWxzZSxcbiAgICAgICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcbiAgICAgICAgICAgIGJ1ZmZlciA6IDAsXG4gICAgICAgICAgICBmcmFtZXJhdGUgOiAwLFxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcbiAgICAgICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcbiAgICAgICAgICAgIHNvdXJjZXMgOiBbXSxcbiAgICAgICAgICAgIGFkVGFnVXJsIDogYWRUYWdVcmxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBmdW5jdGlvbihzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pe1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IG9uRXh0ZW5kZWRMb2FkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKHRydWUpO1xuICAgICAgICAgICAgZGFzaC5hdHRhY2hTb3VyY2Uoc291cmNlLmZpbGUpO1xuICAgICAgICAgICAgc2Vla1Bvc2l0aW9uX3NlYyA9IGxhc3RQbGF5UG9zaXRpb247XG4gICAgICAgIH0pO1xuICAgICAgICBzdXBlclBsYXlfZnVuYyA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuRVJST1IsIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgIGlmKGVycm9yICYmICFpc0ZpcnN0RXJyb3IgJiYgKCBlcnJvci5lcnJvciA9PT0gREFTSEVSUk9SLkRPV05MT0FEIHx8IGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuTUFOSUZFU1RFUlJPUiApKXtcbiAgICAgICAgICAgICAgICBpc0ZpcnN0RXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUl07XG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKHRlbXBFcnJvciwgdGhhdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGlmKGV2ZW50ICYmIGV2ZW50Lm1lZGlhVHlwZSAmJiBldmVudC5tZWRpYVR5cGUgPT09IFwidmlkZW9cIil7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogc3BlYy5jdXJyZW50UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IFwicmVxdWVzdFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVOREVSRUQsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGlmKGV2ZW50ICYmIGV2ZW50Lm1lZGlhVHlwZSAmJiBldmVudC5tZWRpYVR5cGUgPT09IFwidmlkZW9cIil7XG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGV2ZW50Lm5ld1F1YWxpdHk7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogZXZlbnQubmV3UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IFwicmVuZGVyXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5QTEFZQkFDS19NRVRBREFUQV9MT0FERUQsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCAgOiBcIiwgZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKVtkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKV0pO1xuXG4gICAgICAgICAgICBpc0Rhc2hNZXRhTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBzdWJRdWFsaXR5TGlzdCA9IGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpO1xuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN1YlF1YWxpdHlMaXN0Lmxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICAgICAgaWYoIV8uZmluZFdoZXJlKHNwZWMucXVhbGl0eUxldmVscyx7Yml0cmF0ZSA6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aH0pKXtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5xdWFsaXR5TGV2ZWxzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgYml0cmF0ZTogc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHN1YlF1YWxpdHlMaXN0W2ldLnF1YWxpdHlJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsIDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGgrXCJ4XCIrc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0K1wiLCBcIisgc2l6ZUh1bWFuaXplcihzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCB0cnVlLCBcImJwc1wiKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGRhc2guaXNEeW5hbWljKCkpe1xuICAgICAgICAgICAgICAgIHNwZWMuaXNMaXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHNlZWtQb3NpdGlvbl9zZWMpe1xuICAgICAgICAgICAgICAgIGRhc2guc2VlayhzZWVrUG9zaXRpb25fc2VjKTtcbiAgICAgICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkgJiYgIXJ1bmVkQXV0b1N0YXJ0KXtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICBydW5lZEF1dG9TdGFydCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vRGFzaCB3aWxsIGluZmluaXRlIGxvYWRpbmcgd2hlbiBwbGF5ZXIgaXMgaW4gYSBwYXVzZWQgc3RhdGUgZm9yIGEgbG9uZyB0aW1lLlxuICAgICAgICB0aGF0LnBsYXkgPSAobXV0ZWRQbGF5KSA9PntcbiAgICAgICAgICAgIGlzRGFzaE1ldGFMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGRhc2guYXR0YWNoVmlldyhlbGVtZW50KTtcblxuICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuXG4gICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tEYXNoTWV0YUxvYWRlZCgpe1xuICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgaWYoaXNEYXNoTWV0YUxvYWRlZCl7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyUGxheV9mdW5jKG11dGVkUGxheSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDMwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRGFzaE1ldGFMb2FkZWQsIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gcXVhbGl0eUluZGV4O1xuICAgICAgICAgICAgaWYoY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCkpe1xuICAgICAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXNoLnNldFF1YWxpdHlGb3IoXCJ2aWRlb1wiLCBxdWFsaXR5SW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcbiAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihpc0F1dG8pO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgICAgIGRhc2gucmVzZXQoKTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICAgICAgfTtcbiAgICB9Y2F0Y2goZXJyb3Ipe1xuICAgICAgICBpZihlcnJvciAmJiBlcnJvci5jb2RlICYmIGVycm9yLmNvZGUgPT09IElOSVRfREFTSF9VTlNVUFBPUlQpe1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9ICBFUlJPUlNbSU5JVF9EQVNIX05PVEZPVU5EXTtcbiAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgdGhyb3cgdGVtcEVycm9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IERhc2g7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTQuLlxuICovXG5cbmNvbnN0IHNpemVIdW1hbml6ZXIgPSBmdW5jdGlvbiAoYnl0ZXMsIHNpLCBwb3N0cGl4KSB7XG4gICAgbGV0IHRocmVzaCA9IHNpID8gMTAwMCA6IDEwMjQ7XG4gICAgaWYoTWF0aC5hYnMoYnl0ZXMpIDwgdGhyZXNoKSB7XG4gICAgICAgIHJldHVybiBieXRlcyArICcgQic7XG4gICAgfVxuICAgIGxldCB1bml0ID0gcG9zdHBpeHx8XCJCXCI7XG4gICAgbGV0IHVuaXRzID0gWydrJyt1bml0LCdNJyt1bml0LCdHJyt1bml0LCdUJyt1bml0LCdQJyt1bml0LCdFJyt1bml0LCdaJyt1bml0LCdZJyt1bml0XTtcbiAgICAgICAvLyA/IFsna0InLCdNQicsJ0dCJywnVEInLCdQQicsJ0VCJywnWkInLCdZQiddOiBbJ0tpQicsJ01pQicsJ0dpQicsJ1RpQicsJ1BpQicsJ0VpQicsJ1ppQicsJ1lpQiddO1xuICAgIGxldCB1ID0gLTE7XG4gICAgZG8ge1xuICAgICAgICBieXRlcyAvPSB0aHJlc2g7XG4gICAgICAgICsrdTtcbiAgICB9IHdoaWxlKE1hdGguYWJzKGJ5dGVzKSA+PSB0aHJlc2ggJiYgdSA8IHVuaXRzLmxlbmd0aCAtIDEpO1xuICAgIHJldHVybiBieXRlcy50b0ZpeGVkKDEpK3VuaXRzW3VdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaXplSHVtYW5pemVyOyJdLCJzb3VyY2VSb290IjoiIn0=