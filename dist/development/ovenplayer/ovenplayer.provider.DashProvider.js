/*! OvenPlayerv0.9.6212 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

    var sourceOfFile = "";
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
            OvenPlayerConsole.log("DASH : Attach File : ", source, "lastPlayPosition : " + lastPlayPosition);
            coveredSetAutoSwitchQualityFor(true);
            sourceOfFile = source.file;
            dash.attachSource(sourceOfFile);
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

            OvenPlayerConsole.log("DASH : PLAYBACK_METADATA_LOADED  : ", dash.getQualityFor("video"), dash.getBitrateInfoListFor('video'), dash.getBitrateInfoListFor('video')[dash.getQualityFor("video")]);

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

            if (seekPosition_sec) {
                dash.seek(seekPosition_sec);
                if (!playerConfig.isAutoStart()) {
                    that.play();
                }
            }

            if (dash.isDynamic()) {
                spec.isLive = true;
            }

            if (playerConfig.isAutoStart() && !runedAutoStart) {
                OvenPlayerConsole.log("DASH : AUTOPLAY()!");
                that.play();

                runedAutoStart = true;
            }
        });

        that.play = function (mutedPlay) {
            var retryCount = 0;
            if (that.getState() === _constants.STATE_AD_PLAYING || that.getState() === _constants.STATE_AD_PAUSED) {} else {
                isDashMetaLoaded = false;
                dash.attachView(element);
            }
            //Dash can infinite loading when player is in a paused state for a long time.
            //Then dash always have to reload(attachView) and wait for MetaLoaded event when resume.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwiaXNGaXJzdEVycm9yIiwiaXNEYXNoTWV0YUxvYWRlZCIsInJ1bmVkQXV0b1N0YXJ0Iiwic291cmNlT2ZGaWxlIiwiY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiaXNBdXRvIiwiZGFzaGpzIiwiVmVyc2lvbiIsInNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwicmVzdWx0IiwiZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJNZWRpYVBsYXllciIsImNyZWF0ZSIsIkVSUk9SUyIsIklOSVRfREFTSF9VTlNVUFBPUlQiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJpbml0aWFsaXplIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9EQVNIIiwibXNlIiwibGlzdGVuZXIiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImZyYW1lcmF0ZSIsImN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFNvdXJjZSIsInF1YWxpdHlMZXZlbHMiLCJzb3VyY2VzIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZmlsZSIsImF0dGFjaFNvdXJjZSIsIm9uIiwiZXZlbnRzIiwiRVJST1IiLCJlcnJvciIsInRlbXBFcnJvciIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJRVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQiLCJldmVudCIsIm1lZGlhVHlwZSIsInRyaWdnZXIiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJ0eXBlIiwiUVVBTElUWV9DSEFOR0VfUkVOREVSRUQiLCJuZXdRdWFsaXR5IiwiUExBWUJBQ0tfTUVUQURBVEFfTE9BREVEIiwiZ2V0UXVhbGl0eUZvciIsImdldEJpdHJhdGVJbmZvTGlzdEZvciIsInN1YlF1YWxpdHlMaXN0IiwiaSIsImxlbmd0aCIsIl8iLCJmaW5kV2hlcmUiLCJiaXRyYXRlIiwiaGVpZ2h0Iiwid2lkdGgiLCJwdXNoIiwiaW5kZXgiLCJxdWFsaXR5SW5kZXgiLCJsYWJlbCIsInNlZWsiLCJpc0F1dG9TdGFydCIsInBsYXkiLCJpc0R5bmFtaWMiLCJtdXRlZFBsYXkiLCJyZXRyeUNvdW50IiwiZ2V0U3RhdGUiLCJTVEFURV9BRF9QTEFZSU5HIiwiU1RBVEVfQURfUEFVU0VEIiwiYXR0YWNoVmlldyIsImNoZWNrRGFzaE1ldGFMb2FkZWQiLCJzZXRUaW1lb3V0Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJTVEFURV9QTEFZSU5HIiwic2V0UXVhbGl0eUZvciIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImRlc3Ryb3kiLCJyZXNldCIsImNvZGUiLCJJTklUX0RBU0hfTk9URk9VTkQiLCJzaXplSHVtYW5pemVyIiwiYnl0ZXMiLCJzaSIsInBvc3RwaXgiLCJ0aHJlc2giLCJNYXRoIiwiYWJzIiwidW5pdCIsInVuaXRzIiwidSIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQVlBOzs7Ozs7QUFFQTs7Ozs7QUFLQSxJQUFNQSxZQUFZO0FBQ2RDLGNBQVcsVUFERztBQUVkQyxtQkFBZ0I7QUFGRixDQUFsQixDLENBekJBOzs7O0FBNkJBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxD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SUEsSUFBZCxFQUFtQixNQUFJQSxJQUF2QixFQUE0QixNQUFJQSxJQUFoQyxFQUFxQyxNQUFJQSxJQUF6QyxFQUE4QyxNQUFJQSxJQUFsRCxFQUF1RCxNQUFJQSxJQUEzRCxFQUFnRSxNQUFJQSxJQUFwRSxDQUFaO0FBQ0c7QUFDSCxRQUFJRSxJQUFJLENBQUMsQ0FBVDtBQUNBLE9BQUc7QUFDQ1IsaUJBQVNHLE1BQVQ7QUFDQSxVQUFFSyxDQUFGO0FBQ0gsS0FIRCxRQUdRSixLQUFLQyxHQUFMLENBQVNMLEtBQVQsS0FBbUJHLE1BQW5CLElBQTZCSyxJQUFJRCxNQUFNdkMsTUFBTixHQUFlLENBSHhEO0FBSUEsV0FBT2dDLE1BQU1TLE9BQU4sQ0FBYyxDQUFkLElBQWlCRixNQUFNQyxDQUFOLENBQXhCO0FBQ0gsQ0FkRDs7cUJBZ0JlVCxhIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTQuLlxuICovXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCBzaXplSHVtYW5pemVyIGZyb20gXCJ1dGlscy9zaXplSHVtYW5pemVyXCI7XG5pbXBvcnQge1xuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBJTklUX0RBU0hfVU5TVVBQT1JULFxuICAgIElOSVRfREFTSF9OT1RGT1VORCxcbiAgICBFUlJPUlMsQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsXG4gICAgQ09OVEVOVF9MRVZFTF9DSEFOR0VELFxuICAgIFBST1ZJREVSX0RBU0hcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbi8qKlxuICogQGJyaWVmICAgZGFzaGpzIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxuICogKi9cbmNvbnN0IERBU0hFUlJPUiA9IHtcbiAgICBET1dOTE9BRCA6IFwiZG93bmxvYWRcIixcbiAgICBNQU5JRkVTVEVSUk9SIDogXCJtYW5pZmVzdEVycm9yXCJcbn07XG5jb25zdCBEYXNoID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgZGFzaCA9IG51bGw7XG4gICAgbGV0IHN1cGVyUGxheV9mdW5jID0gbnVsbDtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcbiAgICBsZXQgaXNGaXJzdEVycm9yID0gZmFsc2U7XG4gICAgbGV0IGlzRGFzaE1ldGFMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgcnVuZWRBdXRvU3RhcnQgPSBmYWxzZTtcblxuICAgIGxldCBzb3VyY2VPZkZpbGUgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvciA9IGZ1bmN0aW9uKGlzQXV0byl7XG4gICAgICAgICAgICBpZihkYXNoanMuVmVyc2lvbiA+IFwiMi45LjBcIil7XG4gICAgICAgICAgICAgICAgZGFzaC5zZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihcInZpZGVvXCIsIGlzQXV0byk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKGlzQXV0byk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgICAgIGlmKGRhc2hqcy5WZXJzaW9uID4gXCIyLjkuMFwiKXtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkYXNoLmdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKFwidmlkZW9cIik7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkYXNoLmdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICBkYXNoID0gZGFzaGpzLk1lZGlhUGxheWVyKCkuY3JlYXRlKCk7XG4gICAgICAgIGlmKGRhc2hqcy5WZXJzaW9uIDwgXCIyLjYuNVwiKXtcbiAgICAgICAgICAgIHRocm93IEVSUk9SU1tJTklUX0RBU0hfVU5TVVBQT1JUXTtcbiAgICAgICAgfVxuICAgICAgICBkYXNoLmdldERlYnVnKCkuc2V0TG9nVG9Ccm93c2VyQ29uc29sZShmYWxzZSk7XG4gICAgICAgIGRhc2guaW5pdGlhbGl6ZShlbGVtZW50LCBudWxsLCBmYWxzZSk7XG5cbiAgICAgICAgbGV0IHNwZWMgPSB7XG4gICAgICAgICAgICBuYW1lIDogUFJPVklERVJfREFTSCxcbiAgICAgICAgICAgIGVsZW1lbnQgOiBlbGVtZW50LFxuICAgICAgICAgICAgbXNlIDogZGFzaCxcbiAgICAgICAgICAgIGxpc3RlbmVyIDogbnVsbCxcbiAgICAgICAgICAgIGNhblNlZWsgOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxuICAgICAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxuICAgICAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxuICAgICAgICAgICAgYnVmZmVyIDogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZSA6IDAsXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxuICAgICAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxuICAgICAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxuICAgICAgICAgICAgc291cmNlcyA6IFtdLFxuICAgICAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbil7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogQXR0YWNoIEZpbGUgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IodHJ1ZSk7XG4gICAgICAgICAgICBzb3VyY2VPZkZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgIGRhc2guYXR0YWNoU291cmNlKHNvdXJjZU9mRmlsZSk7XG4gICAgICAgICAgICBzZWVrUG9zaXRpb25fc2VjID0gbGFzdFBsYXlQb3NpdGlvbjtcblxuICAgICAgICB9KTtcbiAgICAgICAgc3VwZXJQbGF5X2Z1bmMgPSB0aGF0LnN1cGVyKCdwbGF5Jyk7XG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIFBST1ZJREVSIExPQURFRC5cIik7XG5cbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLkVSUk9SLCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICBpZihlcnJvciAmJiAhaXNGaXJzdEVycm9yICYmICggZXJyb3IuZXJyb3IgPT09IERBU0hFUlJPUi5ET1dOTE9BRCB8fCBlcnJvci5lcnJvciA9PT0gREFTSEVSUk9SLk1BTklGRVNURVJST1IgKSl7XG4gICAgICAgICAgICAgICAgaXNGaXJzdEVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1JdO1xuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVRVUVTVEVELCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBpZihldmVudCAmJiBldmVudC5tZWRpYVR5cGUgJiYgZXZlbnQubWVkaWFUeXBlID09PSBcInZpZGVvXCIpe1xuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICAgICAgaXNBdXRvOiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IHNwZWMuY3VycmVudFF1YWxpdHksXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgOiBcInJlcXVlc3RcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVELCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBpZihldmVudCAmJiBldmVudC5tZWRpYVR5cGUgJiYgZXZlbnQubWVkaWFUeXBlID09PSBcInZpZGVvXCIpe1xuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBldmVudC5uZXdRdWFsaXR5O1xuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMX0NIQU5HRUQsIHtcbiAgICAgICAgICAgICAgICAgICAgaXNBdXRvOiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IGV2ZW50Lm5ld1F1YWxpdHksXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgOiBcInJlbmRlclwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5QTEFZQkFDS19NRVRBREFUQV9MT0FERUQsIGZ1bmN0aW9uKGV2ZW50KXtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IFBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCAgOiBcIiwgZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKVtkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKV0pO1xuXG4gICAgICAgICAgICBpc0Rhc2hNZXRhTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBzdWJRdWFsaXR5TGlzdCA9IGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpO1xuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN1YlF1YWxpdHlMaXN0Lmxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICAgICAgaWYoIV8uZmluZFdoZXJlKHNwZWMucXVhbGl0eUxldmVscyx7Yml0cmF0ZSA6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aH0pKXtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5xdWFsaXR5TGV2ZWxzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgYml0cmF0ZTogc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHN1YlF1YWxpdHlMaXN0W2ldLnF1YWxpdHlJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsIDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGgrXCJ4XCIrc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0K1wiLCBcIisgc2l6ZUh1bWFuaXplcihzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCB0cnVlLCBcImJwc1wiKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNlZWtQb3NpdGlvbl9zZWMpe1xuICAgICAgICAgICAgICAgIGRhc2guc2VlayhzZWVrUG9zaXRpb25fc2VjKTtcbiAgICAgICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGRhc2guaXNEeW5hbWljKCkpe1xuICAgICAgICAgICAgICAgIHNwZWMuaXNMaXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkgJiYgIXJ1bmVkQXV0b1N0YXJ0KXtcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogQVVUT1BMQVkoKSFcIik7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG5cbiAgICAgICAgICAgICAgICBydW5lZEF1dG9TdGFydCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHRoYXQucGxheSA9IChtdXRlZFBsYXkpID0+e1xuICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HIHx8IHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUEFVU0VEKXtcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaXNEYXNoTWV0YUxvYWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRhc2guYXR0YWNoVmlldyhlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vRGFzaCBjYW4gaW5maW5pdGUgbG9hZGluZyB3aGVuIHBsYXllciBpcyBpbiBhIHBhdXNlZCBzdGF0ZSBmb3IgYSBsb25nIHRpbWUuXG4gICAgICAgICAgICAvL1RoZW4gZGFzaCBhbHdheXMgaGF2ZSB0byByZWxvYWQoYXR0YWNoVmlldykgYW5kIHdhaXQgZm9yIE1ldGFMb2FkZWQgZXZlbnQgd2hlbiByZXN1bWUuXG4gICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tEYXNoTWV0YUxvYWRlZCgpe1xuICAgICAgICAgICAgICAgIHJldHJ5Q291bnQgKys7XG4gICAgICAgICAgICAgICAgaWYoaXNEYXNoTWV0YUxvYWRlZCl7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyUGxheV9mdW5jKG11dGVkUGxheSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudCA8IDMwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRGFzaE1ldGFMb2FkZWQsIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gcXVhbGl0eUluZGV4O1xuICAgICAgICAgICAgaWYoY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCkpe1xuICAgICAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXNoLnNldFF1YWxpdHlGb3IoXCJ2aWRlb1wiLCBxdWFsaXR5SW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcbiAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihpc0F1dG8pO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgICAgIGRhc2gucmVzZXQoKTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICAgICAgfTtcbiAgICB9Y2F0Y2goZXJyb3Ipe1xuICAgICAgICBpZihlcnJvciAmJiBlcnJvci5jb2RlICYmIGVycm9yLmNvZGUgPT09IElOSVRfREFTSF9VTlNVUFBPUlQpe1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9ICBFUlJPUlNbSU5JVF9EQVNIX05PVEZPVU5EXTtcbiAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgdGhyb3cgdGVtcEVycm9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IERhc2g7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTQuLlxuICovXG5cbmNvbnN0IHNpemVIdW1hbml6ZXIgPSBmdW5jdGlvbiAoYnl0ZXMsIHNpLCBwb3N0cGl4KSB7XG4gICAgbGV0IHRocmVzaCA9IHNpID8gMTAwMCA6IDEwMjQ7XG4gICAgaWYoTWF0aC5hYnMoYnl0ZXMpIDwgdGhyZXNoKSB7XG4gICAgICAgIHJldHVybiBieXRlcyArICcgQic7XG4gICAgfVxuICAgIGxldCB1bml0ID0gcG9zdHBpeHx8XCJCXCI7XG4gICAgbGV0IHVuaXRzID0gWydrJyt1bml0LCdNJyt1bml0LCdHJyt1bml0LCdUJyt1bml0LCdQJyt1bml0LCdFJyt1bml0LCdaJyt1bml0LCdZJyt1bml0XTtcbiAgICAgICAvLyA/IFsna0InLCdNQicsJ0dCJywnVEInLCdQQicsJ0VCJywnWkInLCdZQiddOiBbJ0tpQicsJ01pQicsJ0dpQicsJ1RpQicsJ1BpQicsJ0VpQicsJ1ppQicsJ1lpQiddO1xuICAgIGxldCB1ID0gLTE7XG4gICAgZG8ge1xuICAgICAgICBieXRlcyAvPSB0aHJlc2g7XG4gICAgICAgICsrdTtcbiAgICB9IHdoaWxlKE1hdGguYWJzKGJ5dGVzKSA+PSB0aHJlc2ggJiYgdSA8IHVuaXRzLmxlbmd0aCAtIDEpO1xuICAgIHJldHVybiBieXRlcy50b0ZpeGVkKDEpK3VuaXRzW3VdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaXplSHVtYW5pemVyOyJdLCJzb3VyY2VSb290IjoiIn0=