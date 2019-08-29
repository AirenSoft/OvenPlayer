/*! OvenPlayerv0.9.741 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
            throw _constants.ERRORS.codes[_constants.INIT_DASH_UNSUPPORT];
        }
        dash.getDebug().setLogToBrowserConsole(false);
        dash.initialize(element, null, false);

        if (playerConfig.getConfig().liveDelay && typeof playerConfig.getConfig().liveDelay === 'number') {
            dash.setLowLatencyEnabled(true);
            dash.setLiveDelay(playerConfig.getConfig().liveDelay);
        }

        var spec = {
            name: _constants.PROVIDER_DASH,
            element: element,
            mse: dash,
            listener: null,
            isLoaded: false,
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

            console.log(source);

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
                var tempError = _constants.ERRORS.codes[_constants.PLAYER_UNKNWON_NEWWORK_ERROR];
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
            var tempError = _constants.ERRORS.codes[_constants.INIT_DASH_NOTFOUND];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwiaXNGaXJzdEVycm9yIiwiaXNEYXNoTWV0YUxvYWRlZCIsInJ1bmVkQXV0b1N0YXJ0Iiwic291cmNlT2ZGaWxlIiwiY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiaXNBdXRvIiwiZGFzaGpzIiwiVmVyc2lvbiIsInNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwicmVzdWx0IiwiZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJNZWRpYVBsYXllciIsImNyZWF0ZSIsIkVSUk9SUyIsImNvZGVzIiwiSU5JVF9EQVNIX1VOU1VQUE9SVCIsImdldERlYnVnIiwic2V0TG9nVG9Ccm93c2VyQ29uc29sZSIsImluaXRpYWxpemUiLCJnZXRDb25maWciLCJsaXZlRGVsYXkiLCJzZXRMb3dMYXRlbmN5RW5hYmxlZCIsInNldExpdmVEZWxheSIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfREFTSCIsIm1zZSIsImxpc3RlbmVyIiwiaXNMb2FkZWQiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImZyYW1lcmF0ZSIsImN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFNvdXJjZSIsInF1YWxpdHlMZXZlbHMiLCJzb3VyY2VzIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiY29uc29sZSIsImZpbGUiLCJhdHRhY2hTb3VyY2UiLCJvbiIsImV2ZW50cyIsIkVSUk9SIiwiZXJyb3IiLCJ0ZW1wRXJyb3IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUVVBTElUWV9DSEFOR0VfUkVRVUVTVEVEIiwiZXZlbnQiLCJtZWRpYVR5cGUiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwidHlwZSIsIlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVEIiwibmV3UXVhbGl0eSIsIlBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCIsImdldFF1YWxpdHlGb3IiLCJnZXRCaXRyYXRlSW5mb0xpc3RGb3IiLCJzdWJRdWFsaXR5TGlzdCIsImkiLCJsZW5ndGgiLCJfIiwiZmluZFdoZXJlIiwiYml0cmF0ZSIsImhlaWdodCIsIndpZHRoIiwicHVzaCIsImluZGV4IiwicXVhbGl0eUluZGV4IiwibGFiZWwiLCJzZWVrIiwiaXNBdXRvU3RhcnQiLCJwbGF5IiwiaXNEeW5hbWljIiwibXV0ZWRQbGF5IiwicmV0cnlDb3VudCIsImdldFN0YXRlIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsImF0dGFjaFZpZXciLCJjaGVja0Rhc2hNZXRhTG9hZGVkIiwic2V0VGltZW91dCIsInNldEN1cnJlbnRRdWFsaXR5IiwiU1RBVEVfUExBWUlORyIsInNldFF1YWxpdHlGb3IiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJkZXN0cm95IiwicmVzZXQiLCJjb2RlIiwiSU5JVF9EQVNIX05PVEZPVU5EIiwic2l6ZUh1bWFuaXplciIsImJ5dGVzIiwic2kiLCJwb3N0cGl4IiwidGhyZXNoIiwiTWF0aCIsImFicyIsInVuaXQiLCJ1bml0cyIsInUiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFZQTs7Ozs7O0FBRUE7Ozs7O0FBS0Es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LEtBQWxCO0FBQ0Esa0JBQU1DLFNBQU47QUFDSDtBQUNKOztBQUVELFdBQU96RCxJQUFQO0FBQ0gsQ0EzTUQ7O3FCQThNZUosSTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzT2Y7Ozs7QUFJQSxJQUFNMkcsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFVQyxLQUFWLEVBQWlCQyxFQUFqQixFQUFxQkMsT0FBckIsRUFBOEI7QUFDaEQsUUFBSUMsU0FBU0YsS0FBSyxJQUFMLEdBQVksSUFBekI7QUFDQSxRQUFHRyxLQUFLQyxHQUFMLENBQVNMLEtBQVQsSUFBa0JHLE1BQXJCLEVBQTZCO0FBQ3pCLGVBQU9ILFFBQVEsSUFBZjtBQUNIO0FBQ0QsUUFBSU0sT0FBT0osV0FBUyxHQUFwQjtBQUNBLFFBQUlLLFFBQVEsQ0FBQyxNQUFJRCxJQUFMLEVBQVUsTUFBSUEsSUFBZCxFQUFtQixNQUFJQSxJQUF2QixFQUE0QixNQUFJQSxJQUFoQyxFQUFxQyxNQUFJQSxJQUF6QyxFQUE4QyxNQUFJQSxJQUFsRCxFQUF1RCxNQUFJQSxJQUEzRCxFQUFnRSxNQUFJQSxJQUFwRSxDQUFaO0FBQ0c7QUFDSCxRQUFJRSxJQUFJLENBQUMsQ0FBVDtBQUNBLE9BQUc7QUFDQ1IsaUJBQVNHLE1BQVQ7QUFDQSxVQUFFSyxDQUFGO0FBQ0gsS0FIRCxRQUdRSixLQUFLQyxHQUFMLENBQVNMLEtBQVQsS0FBbUJHLE1BQW5CLElBQTZCSyxJQUFJRCxNQUFNdkMsTUFBTixHQUFlLENBSHhEO0FBSUEsV0FBT2dDLE1BQU1TLE9BQU4sQ0FBYyxDQUFkLElBQWlCRixNQUFNQyxDQUFOLENBQXhCO0FBQ0gsQ0FkRDs7cUJBZ0JlVCxhIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTQuLlxuICovXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCBzaXplSHVtYW5pemVyIGZyb20gXCJ1dGlscy9zaXplSHVtYW5pemVyXCI7XG5pbXBvcnQge1xuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBJTklUX0RBU0hfVU5TVVBQT1JULFxuICAgIElOSVRfREFTSF9OT1RGT1VORCxcbiAgICBFUlJPUlMsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBDT05URU5UX0xFVkVMX0NIQU5HRUQsXG4gICAgUFJPVklERVJfREFTSFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBkYXNoanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuY29uc3QgREFTSEVSUk9SID0ge1xuICAgIERPV05MT0FEIDogXCJkb3dubG9hZFwiLFxuICAgIE1BTklGRVNURVJST1IgOiBcIm1hbmlmZXN0RXJyb3JcIlxufTtcbmNvbnN0IERhc2ggPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBkYXNoID0gbnVsbDtcbiAgICBsZXQgc3VwZXJQbGF5X2Z1bmMgPSBudWxsO1xuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyA9IG51bGw7XG4gICAgbGV0IHNlZWtQb3NpdGlvbl9zZWMgPSAwO1xuICAgIGxldCBpc0ZpcnN0RXJyb3IgPSBmYWxzZTtcbiAgICBsZXQgaXNEYXNoTWV0YUxvYWRlZCA9IGZhbHNlO1xuICAgIGxldCBydW5lZEF1dG9TdGFydCA9IGZhbHNlO1xuXG4gICAgbGV0IHNvdXJjZU9mRmlsZSA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yID0gZnVuY3Rpb24oaXNBdXRvKXtcbiAgICAgICAgICAgIGlmKGRhc2hqcy5WZXJzaW9uID4gXCIyLjkuMFwiKXtcbiAgICAgICAgICAgICAgICBkYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKFwidmlkZW9cIiwgaXNBdXRvKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICAgICAgaWYoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpe1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIGRhc2ggPSBkYXNoanMuTWVkaWFQbGF5ZXIoKS5jcmVhdGUoKTtcbiAgICAgICAgaWYoZGFzaGpzLlZlcnNpb24gPCBcIjIuNi41XCIpe1xuICAgICAgICAgICAgdGhyb3cgRVJST1JTLmNvZGVzW0lOSVRfREFTSF9VTlNVUFBPUlRdO1xuICAgICAgICB9XG4gICAgICAgIGRhc2guZ2V0RGVidWcoKS5zZXRMb2dUb0Jyb3dzZXJDb25zb2xlKGZhbHNlKTtcbiAgICAgICAgZGFzaC5pbml0aWFsaXplKGVsZW1lbnQsIG51bGwsIGZhbHNlKTtcblxuICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxpdmVEZWxheSAmJiB0eXBlb2YocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxpdmVEZWxheSkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBkYXNoLnNldExvd0xhdGVuY3lFbmFibGVkKHRydWUpO1xuICAgICAgICAgICAgZGFzaC5zZXRMaXZlRGVsYXkocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxpdmVEZWxheSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgICAgIG5hbWUgOiBQUk9WSURFUl9EQVNILFxuICAgICAgICAgICAgZWxlbWVudCA6IGVsZW1lbnQsXG4gICAgICAgICAgICBtc2UgOiBkYXNoLFxuICAgICAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxuICAgICAgICAgICAgaXNMb2FkZWQgOiBmYWxzZSxcbiAgICAgICAgICAgIGNhblNlZWsgOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxuICAgICAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxuICAgICAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxuICAgICAgICAgICAgYnVmZmVyIDogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZSA6IDAsXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxuICAgICAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxuICAgICAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxuICAgICAgICAgICAgc291cmNlcyA6IFtdLFxuICAgICAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbil7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogQXR0YWNoIEZpbGUgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IodHJ1ZSk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNvdXJjZSlcblxuICAgICAgICAgICAgc291cmNlT2ZGaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICBkYXNoLmF0dGFjaFNvdXJjZShzb3VyY2VPZkZpbGUpO1xuICAgICAgICAgICAgc2Vla1Bvc2l0aW9uX3NlYyA9IGxhc3RQbGF5UG9zaXRpb247XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHN1cGVyUGxheV9mdW5jID0gdGhhdC5zdXBlcigncGxheScpO1xuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCBQUk9WSURFUiBMT0FERUQuXCIpO1xuXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5FUlJPUiwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgaWYoZXJyb3IgJiYgIWlzRmlyc3RFcnJvciAmJiAoIGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuRE9XTkxPQUQgfHwgZXJyb3IuZXJyb3IgPT09IERBU0hFUlJPUi5NQU5JRkVTVEVSUk9SICkpe1xuICAgICAgICAgICAgICAgIGlzRmlyc3RFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICBlcnJvclRyaWdnZXIodGVtcEVycm9yLCB0aGF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFUVVFU1RFRCwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgaWYoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKXtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCksXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBzcGVjLmN1cnJlbnRRdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICB0eXBlIDogXCJyZXF1ZXN0XCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRU5ERVJFRCwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgaWYoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKXtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZXZlbnQubmV3UXVhbGl0eTtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCksXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBldmVudC5uZXdRdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICB0eXBlIDogXCJyZW5kZXJcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUExBWUJBQ0tfTUVUQURBVEFfTE9BREVELCBmdW5jdGlvbihldmVudCl7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQTEFZQkFDS19NRVRBREFUQV9MT0FERUQgIDogXCIsIGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJylbZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIildKTtcblxuICAgICAgICAgICAgaXNEYXNoTWV0YUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgc3ViUXVhbGl0eUxpc3QgPSBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKTtcbiAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdWJRdWFsaXR5TGlzdC5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgICAgIGlmKCFfLmZpbmRXaGVyZShzcGVjLnF1YWxpdHlMZXZlbHMse2JpdHJhdGUgOiBzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCx3aWR0aDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGh9KSl7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMucXVhbGl0eUxldmVscy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpdHJhdGU6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBzdWJRdWFsaXR5TGlzdFtpXS5xdWFsaXR5SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoK1wieFwiK3N1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCtcIiwgXCIrIHNpemVIdW1hbml6ZXIoc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSwgdHJ1ZSwgXCJicHNcIilcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzZWVrUG9zaXRpb25fc2VjKXtcbiAgICAgICAgICAgICAgICBkYXNoLnNlZWsoc2Vla1Bvc2l0aW9uX3NlYyk7XG4gICAgICAgICAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihkYXNoLmlzRHluYW1pYygpKXtcbiAgICAgICAgICAgICAgICBzcGVjLmlzTGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpICYmICFydW5lZEF1dG9TdGFydCl7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IEFVVE9QTEFZKCkhXCIpO1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuXG4gICAgICAgICAgICAgICAgcnVuZWRBdXRvU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgICB0aGF0LnBsYXkgPSAobXV0ZWRQbGF5KSA9PntcbiAgICAgICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcbiAgICAgICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORyB8fCB0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BBVVNFRCl7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlzRGFzaE1ldGFMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkYXNoLmF0dGFjaFZpZXcoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0Rhc2ggY2FuIGluZmluaXRlIGxvYWRpbmcgd2hlbiBwbGF5ZXIgaXMgaW4gYSBwYXVzZWQgc3RhdGUgZm9yIGEgbG9uZyB0aW1lLlxuICAgICAgICAgICAgLy9UaGVuIGRhc2ggYWx3YXlzIGhhdmUgdG8gcmVsb2FkKGF0dGFjaFZpZXcpIGFuZCB3YWl0IGZvciBNZXRhTG9hZGVkIGV2ZW50IHdoZW4gcmVzdW1lLlxuICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrRGFzaE1ldGFMb2FkZWQoKXtcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgIGlmKGlzRGFzaE1ldGFMb2FkZWQpe1xuICAgICAgICAgICAgICAgICAgICBzdXBlclBsYXlfZnVuYyhtdXRlZFBsYXkpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAzMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0Rhc2hNZXRhTG9hZGVkLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IHF1YWxpdHlJbmRleDtcbiAgICAgICAgICAgIGlmKGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpKXtcbiAgICAgICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGFzaC5zZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiwgcXVhbGl0eUluZGV4KTtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgICAgICBkYXNoLnJlc2V0KCk7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgICAgIH07XG4gICAgfWNhdGNoKGVycm9yKXtcbiAgICAgICAgaWYoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBlcnJvci5jb2RlID09PSBJTklUX0RBU0hfVU5TVVBQT1JUKXtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSAgRVJST1JTLmNvZGVzW0lOSVRfREFTSF9OT1RGT1VORF07XG4gICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIHRocm93IHRlbXBFcnJvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBEYXNoO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDE0Li5cbiAqL1xuXG5jb25zdCBzaXplSHVtYW5pemVyID0gZnVuY3Rpb24gKGJ5dGVzLCBzaSwgcG9zdHBpeCkge1xuICAgIGxldCB0aHJlc2ggPSBzaSA/IDEwMDAgOiAxMDI0O1xuICAgIGlmKE1hdGguYWJzKGJ5dGVzKSA8IHRocmVzaCkge1xuICAgICAgICByZXR1cm4gYnl0ZXMgKyAnIEInO1xuICAgIH1cbiAgICBsZXQgdW5pdCA9IHBvc3RwaXh8fFwiQlwiO1xuICAgIGxldCB1bml0cyA9IFsnaycrdW5pdCwnTScrdW5pdCwnRycrdW5pdCwnVCcrdW5pdCwnUCcrdW5pdCwnRScrdW5pdCwnWicrdW5pdCwnWScrdW5pdF07XG4gICAgICAgLy8gPyBbJ2tCJywnTUInLCdHQicsJ1RCJywnUEInLCdFQicsJ1pCJywnWUInXTogWydLaUInLCdNaUInLCdHaUInLCdUaUInLCdQaUInLCdFaUInLCdaaUInLCdZaUInXTtcbiAgICBsZXQgdSA9IC0xO1xuICAgIGRvIHtcbiAgICAgICAgYnl0ZXMgLz0gdGhyZXNoO1xuICAgICAgICArK3U7XG4gICAgfSB3aGlsZShNYXRoLmFicyhieXRlcykgPj0gdGhyZXNoICYmIHUgPCB1bml0cy5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gYnl0ZXMudG9GaXhlZCgxKSt1bml0c1t1XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2l6ZUh1bWFuaXplcjsiXSwic291cmNlUm9vdCI6IiJ9