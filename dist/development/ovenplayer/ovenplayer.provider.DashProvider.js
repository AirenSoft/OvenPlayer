/*! OvenPlayerv0.9.5972 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        dashsetABRStrategy("abrThroughput");

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
                //islive
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwiaXNGaXJzdEVycm9yIiwiaXNEYXNoTWV0YUxvYWRlZCIsInJ1bmVkQXV0b1N0YXJ0IiwiY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiaXNBdXRvIiwiZGFzaGpzIiwiVmVyc2lvbiIsInNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwicmVzdWx0IiwiZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJNZWRpYVBsYXllciIsImNyZWF0ZSIsIkVSUk9SUyIsIklOSVRfREFTSF9VTlNVUFBPUlQiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJpbml0aWFsaXplIiwiZGFzaHNldEFCUlN0cmF0ZWd5Iiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9EQVNIIiwibXNlIiwibGlzdGVuZXIiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImZyYW1lcmF0ZSIsImN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFNvdXJjZSIsInF1YWxpdHlMZXZlbHMiLCJzb3VyY2VzIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiYXR0YWNoU291cmNlIiwiZmlsZSIsIm9uIiwiZXZlbnRzIiwiRVJST1IiLCJlcnJvciIsInRlbXBFcnJvciIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJRVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQiLCJldmVudCIsIm1lZGlhVHlwZSIsInRyaWdnZXIiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJ0eXBlIiwiUVVBTElUWV9DSEFOR0VfUkVOREVSRUQiLCJuZXdRdWFsaXR5IiwiUExBWUJBQ0tfTUVUQURBVEFfTE9BREVEIiwiZ2V0UXVhbGl0eUZvciIsImdldEJpdHJhdGVJbmZvTGlzdEZvciIsInN1YlF1YWxpdHlMaXN0IiwiaSIsImxlbmd0aCIsIl8iLCJmaW5kV2hlcmUiLCJiaXRyYXRlIiwiaGVpZ2h0Iiwid2lkdGgiLCJwdXNoIiwiaW5kZXgiLCJxdWFsaXR5SW5kZXgiLCJsYWJlbCIsImlzRHluYW1pYyIsInNlZWsiLCJpc0F1dG9TdGFydCIsInBsYXkiLCJtdXRlZFBsYXkiLCJhdHRhY2hWaWV3IiwicmV0cnlDb3VudCIsImNoZWNrRGFzaE1ldGFMb2FkZWQiLCJzZXRUaW1lb3V0Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJnZXRTdGF0ZSIsIlNUQVRFX1BMQVlJTkciLCJzZXRRdWFsaXR5Rm9yIiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiZGVzdHJveSIsInJlc2V0IiwiY29kZSIsIklOSVRfREFTSF9OT1RGT1VORCIsInNpemVIdW1hbml6ZXIiLCJieXRlcyIsInNpIiwicG9zdHBpeCIsInRocmVzaCIsIk1hdGgiLCJhYnMiLCJ1bml0IiwidW5pdHMiLCJ1IiwidG9GaXhlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBVUE7Ozs7OztBQUVBOzs7OztBQUtBLElBQU1BLFlBQVk7QUFDZEMsY0FBVyxVQURHO0FBRWRDLG1CQUFnQjtBQUZGLENBQWxCLEMsQ0F2QkE7Ozs7QUEyQkEsSUFBTUMsT0FBTyxTQUFQQSxJQUFPLENBQVNDLE9BQVQsRUFBa0JDLFlBQWxCLEVBQWdDQyxR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QUFMLENBQVNMLEtBQVQsS0FBbUJHLE1BQW5CLElBQTZCSyxJQUFJRCxNQUFNckMsTUFBTixHQUFlLENBSHhEO0FBSUEsV0FBTzhCLE1BQU1TLE9BQU4sQ0FBYyxDQUFkLElBQWlCRixNQUFNQyxDQUFOLENBQXhCO0FBQ0gsQ0FkRDs7cUJBZ0JlVCxhIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTQuLlxuICovXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCBzaXplSHVtYW5pemVyIGZyb20gXCJ1dGlscy9zaXplSHVtYW5pemVyXCI7XG5pbXBvcnQge1xuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBJTklUX0RBU0hfVU5TVVBQT1JULFxuICAgIElOSVRfREFTSF9OT1RGT1VORCxcbiAgICBFUlJPUlMsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBDT05URU5UX0xFVkVMX0NIQU5HRUQsXG4gICAgUFJPVklERVJfREFTSCwgQ09OVEVOVF9NRVRBXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG4vKipcbiAqIEBicmllZiAgIGRhc2hqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5jb25zdCBEQVNIRVJST1IgPSB7XG4gICAgRE9XTkxPQUQgOiBcImRvd25sb2FkXCIsXG4gICAgTUFOSUZFU1RFUlJPUiA6IFwibWFuaWZlc3RFcnJvclwiXG59O1xuY29uc3QgRGFzaCA9IGZ1bmN0aW9uKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpe1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGRhc2ggPSBudWxsO1xuICAgIGxldCBzdXBlclBsYXlfZnVuYyA9IG51bGw7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcbiAgICBsZXQgc2Vla1Bvc2l0aW9uX3NlYyA9IDA7XG4gICAgbGV0IGlzRmlyc3RFcnJvciA9IGZhbHNlO1xuICAgIGxldCBpc0Rhc2hNZXRhTG9hZGVkID0gZmFsc2U7XG4gICAgbGV0IHJ1bmVkQXV0b1N0YXJ0ID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yID0gZnVuY3Rpb24oaXNBdXRvKXtcbiAgICAgICAgICAgIGlmKGRhc2hqcy5WZXJzaW9uID4gXCIyLjkuMFwiKXtcbiAgICAgICAgICAgICAgICBkYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKFwidmlkZW9cIiwgaXNBdXRvKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICAgICAgaWYoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpe1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIGRhc2ggPSBkYXNoanMuTWVkaWFQbGF5ZXIoKS5jcmVhdGUoKTtcbiAgICAgICAgaWYoZGFzaGpzLlZlcnNpb24gPCBcIjIuNi41XCIpe1xuICAgICAgICAgICAgdGhyb3cgRVJST1JTW0lOSVRfREFTSF9VTlNVUFBPUlRdO1xuICAgICAgICB9XG4gICAgICAgIGRhc2guZ2V0RGVidWcoKS5zZXRMb2dUb0Jyb3dzZXJDb25zb2xlKGZhbHNlKTtcbiAgICAgICAgZGFzaC5pbml0aWFsaXplKGVsZW1lbnQsIG51bGwsIGZhbHNlKTtcbiAgICAgICAgZGFzaHNldEFCUlN0cmF0ZWd5ICggXCJhYnJUaHJvdWdocHV0XCIpO1xuXG4gICAgICAgIGxldCBzcGVjID0ge1xuICAgICAgICAgICAgbmFtZSA6IFBST1ZJREVSX0RBU0gsXG4gICAgICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcbiAgICAgICAgICAgIG1zZSA6IGRhc2gsXG4gICAgICAgICAgICBsaXN0ZW5lciA6IG51bGwsXG4gICAgICAgICAgICBjYW5TZWVrIDogZmFsc2UsXG4gICAgICAgICAgICBpc0xpdmUgOiBmYWxzZSxcbiAgICAgICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcbiAgICAgICAgICAgIGJ1ZmZlciA6IDAsXG4gICAgICAgICAgICBmcmFtZXJhdGUgOiAwLFxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcbiAgICAgICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcbiAgICAgICAgICAgIHNvdXJjZXMgOiBbXSxcbiAgICAgICAgICAgIGFkVGFnVXJsIDogYWRUYWdVcmxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBmdW5jdGlvbihzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pe1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IG9uRXh0ZW5kZWRMb2FkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKHRydWUpO1xuICAgICAgICAgICAgZGFzaC5hdHRhY2hTb3VyY2Uoc291cmNlLmZpbGUpO1xuICAgICAgICAgICAgc2Vla1Bvc2l0aW9uX3NlYyA9IGxhc3RQbGF5UG9zaXRpb247XG4gICAgICAgIH0pO1xuICAgICAgICBzdXBlclBsYXlfZnVuYyA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuRVJST1IsIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgIGlmKGVycm9yICYmICFpc0ZpcnN0RXJyb3IgJiYgKCBlcnJvci5lcnJvciA9PT0gREFTSEVSUk9SLkRPV05MT0FEIHx8IGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuTUFOSUZFU1RFUlJPUiApKXtcbiAgICAgICAgICAgICAgICBpc0ZpcnN0RXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUl07XG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKHRlbXBFcnJvciwgdGhhdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGlmKGV2ZW50ICYmIGV2ZW50Lm1lZGlhVHlwZSAmJiBldmVudC5tZWRpYVR5cGUgPT09IFwidmlkZW9cIil7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogc3BlYy5jdXJyZW50UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IFwicmVxdWVzdFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVOREVSRUQsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGlmKGV2ZW50ICYmIGV2ZW50Lm1lZGlhVHlwZSAmJiBldmVudC5tZWRpYVR5cGUgPT09IFwidmlkZW9cIil7XG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGV2ZW50Lm5ld1F1YWxpdHk7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogZXZlbnQubmV3UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IFwicmVuZGVyXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5QTEFZQkFDS19NRVRBREFUQV9MT0FERUQsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCAgOiBcIiwgZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKVtkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKV0pO1xuXG4gICAgICAgICAgICBpc0Rhc2hNZXRhTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBzdWJRdWFsaXR5TGlzdCA9IGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpO1xuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN1YlF1YWxpdHlMaXN0Lmxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICAgICAgaWYoIV8uZmluZFdoZXJlKHNwZWMucXVhbGl0eUxldmVscyx7Yml0cmF0ZSA6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aH0pKXtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5xdWFsaXR5TGV2ZWxzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgYml0cmF0ZTogc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHN1YlF1YWxpdHlMaXN0W2ldLnF1YWxpdHlJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsIDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGgrXCJ4XCIrc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0K1wiLCBcIisgc2l6ZUh1bWFuaXplcihzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCB0cnVlLCBcImJwc1wiKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGRhc2guaXNEeW5hbWljKCkpe1xuICAgICAgICAgICAgICAgIC8vaXNsaXZlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihzZWVrUG9zaXRpb25fc2VjKXtcbiAgICAgICAgICAgICAgICBkYXNoLnNlZWsoc2Vla1Bvc2l0aW9uX3NlYyk7XG4gICAgICAgICAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpICYmICFydW5lZEF1dG9TdGFydCl7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgcnVuZWRBdXRvU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL0Rhc2ggd2lsbCBpbmZpbml0ZSBsb2FkaW5nIHdoZW4gcGxheWVyIGlzIGluIGEgcGF1c2VkIHN0YXRlIGZvciBhIGxvbmcgdGltZS5cbiAgICAgICAgdGhhdC5wbGF5ID0gKG11dGVkUGxheSkgPT57XG4gICAgICAgICAgICBpc0Rhc2hNZXRhTG9hZGVkID0gZmFsc2U7XG4gICAgICAgICAgICBkYXNoLmF0dGFjaFZpZXcoZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrRGFzaE1ldGFMb2FkZWQoKXtcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgIGlmKGlzRGFzaE1ldGFMb2FkZWQpe1xuICAgICAgICAgICAgICAgICAgICBzdXBlclBsYXlfZnVuYyhtdXRlZFBsYXkpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAzMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0Rhc2hNZXRhTG9hZGVkLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IHF1YWxpdHlJbmRleDtcbiAgICAgICAgICAgIGlmKGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpKXtcbiAgICAgICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGFzaC5zZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiwgcXVhbGl0eUluZGV4KTtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgICAgICBkYXNoLnJlc2V0KCk7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgICAgIH07XG4gICAgfWNhdGNoKGVycm9yKXtcbiAgICAgICAgaWYoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBlcnJvci5jb2RlID09PSBJTklUX0RBU0hfVU5TVVBQT1JUKXtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSAgRVJST1JTW0lOSVRfREFTSF9OT1RGT1VORF07XG4gICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIHRocm93IHRlbXBFcnJvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBEYXNoO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDE0Li5cbiAqL1xuXG5jb25zdCBzaXplSHVtYW5pemVyID0gZnVuY3Rpb24gKGJ5dGVzLCBzaSwgcG9zdHBpeCkge1xuICAgIGxldCB0aHJlc2ggPSBzaSA/IDEwMDAgOiAxMDI0O1xuICAgIGlmKE1hdGguYWJzKGJ5dGVzKSA8IHRocmVzaCkge1xuICAgICAgICByZXR1cm4gYnl0ZXMgKyAnIEInO1xuICAgIH1cbiAgICBsZXQgdW5pdCA9IHBvc3RwaXh8fFwiQlwiO1xuICAgIGxldCB1bml0cyA9IFsnaycrdW5pdCwnTScrdW5pdCwnRycrdW5pdCwnVCcrdW5pdCwnUCcrdW5pdCwnRScrdW5pdCwnWicrdW5pdCwnWScrdW5pdF07XG4gICAgICAgLy8gPyBbJ2tCJywnTUInLCdHQicsJ1RCJywnUEInLCdFQicsJ1pCJywnWUInXTogWydLaUInLCdNaUInLCdHaUInLCdUaUInLCdQaUInLCdFaUInLCdaaUInLCdZaUInXTtcbiAgICBsZXQgdSA9IC0xO1xuICAgIGRvIHtcbiAgICAgICAgYnl0ZXMgLz0gdGhyZXNoO1xuICAgICAgICArK3U7XG4gICAgfSB3aGlsZShNYXRoLmFicyhieXRlcykgPj0gdGhyZXNoICYmIHUgPCB1bml0cy5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gYnl0ZXMudG9GaXhlZCgxKSt1bml0c1t1XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2l6ZUh1bWFuaXplcjsiXSwic291cmNlUm9vdCI6IiJ9