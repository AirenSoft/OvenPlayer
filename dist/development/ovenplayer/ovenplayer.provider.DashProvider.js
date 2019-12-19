/*! OvenPlayerv0.9.800 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
    var isDashMetaLoaded = false;
    var runedAutoStart = false;
    var prevLLLiveDuration = null;

    var sourceOfFile = "";

    try {

        if (dashjs.Version < "2.6.5") {
            throw _constants.ERRORS.codes[_constants.INIT_DASH_UNSUPPORT];
        }

        var coveredSetAutoSwitchQualityFor = function coveredSetAutoSwitchQualityFor(isAuto) {

            if (dashjs.Version >= '3.0.0') {
                dash.updateSettings({
                    streaming: {
                        abr: {
                            autoSwitchBitrate: {
                                video: isAuto
                            }
                        }
                    }
                });
            } else if (dashjs.Version > "2.9.0") {
                dash.setAutoSwitchQualityFor("video", isAuto);
            } else {
                dash.setAutoSwitchQualityFor(isAuto);
            }
        };

        var coveredGetAutoSwitchQualityFor = function coveredGetAutoSwitchQualityFor() {
            var result = "";

            if (dashjs.Version >= '3.0.0') {
                result = dash.getSettings().streaming.abr.autoSwitchBitrate.video;
            } else if (dashjs.Version > "2.9.0") {
                result = dash.getAutoSwitchQualityFor("video");
            } else {
                result = dash.getAutoSwitchQualityFor();
            }
            return result;
        };

        var liveDelayReducingCallback = function liveDelayReducingCallback() {

            if (dash.duration() !== prevLLLiveDuration) {
                prevLLLiveDuration = dash.duration();

                var dvrInfo = dash.getDashMetrics().getCurrentDVRInfo();
                var liveDelay = playerConfig.getConfig().lowLatencyMpdLiveDelay;

                dash.seek(dvrInfo.range.end - dvrInfo.range.start - liveDelay);
            }
        };

        dash = dashjs.MediaPlayer().create();
        dash.initialize(element, null, playerConfig.getConfig().autoStart);

        if (dashjs.Version >= '3.0.0') {

            dash.updateSettings({
                'debug': {
                    'logLevel': dashjs.Debug.LOG_LEVEL_NONE
                }
            });
        } else {

            dash.getDebug().setLogToBrowserConsole(false);
        }

        window.dash = dash;

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
            sourceOfFile = source.file;

            dash.off(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, liveDelayReducingCallback);

            if (source.lowLatency === true) {

                prevLLLiveDuration = null;

                if (dashjs.Version >= '3.0.0') {

                    dash.updateSettings({
                        streaming: {
                            lowLatencyEnabled: source.lowLatency
                        }
                    });
                } else {

                    dash.setLowLatencyEnabled(source.lowLatency);
                }

                if (playerConfig.getConfig().lowLatencyMpdLiveDelay && typeof playerConfig.getConfig().lowLatencyMpdLiveDelay === 'number') {

                    if (dashjs.Version >= '3.0.0') {

                        dash.updateSettings({
                            streaming: {
                                liveDelay: playerConfig.getConfig().lowLatencyMpdLiveDelay
                            }
                        });
                    } else {
                        dash.setLiveDelay(playerConfig.getConfig().lowLatencyMpdLiveDelay);
                    }
                }

                dash.on(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, liveDelayReducingCallback);
            } else {

                console.log('unset low latency');

                if (dashjs.Version >= '3.0.0') {

                    dash.updateSettings({
                        streaming: {
                            lowLatencyEnabled: false,
                            liveDelay: undefined
                        }
                    });
                } else {

                    dash.setLowLatencyEnabled(false);
                    dash.setLiveDelay();
                }
            }

            dash.attachSource(sourceOfFile);
            seekPosition_sec = lastPlayPosition;
        });

        superPlay_func = that["super"]('play');
        superDestroy_func = that["super"]('destroy');
        OvenPlayerConsole.log("DASH PROVIDER LOADED.");

        dash.on(dashjs.MediaPlayer.events.ERROR, function (error) {

            if (error && (error.error === DASHERROR.DOWNLOAD || error.error === DASHERROR.MANIFESTERROR)) {

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

            if (dash.isDynamic()) {
                spec.isLive = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwiaXNEYXNoTWV0YUxvYWRlZCIsInJ1bmVkQXV0b1N0YXJ0IiwicHJldkxMTGl2ZUR1cmF0aW9uIiwic291cmNlT2ZGaWxlIiwiZGFzaGpzIiwiVmVyc2lvbiIsIkVSUk9SUyIsImNvZGVzIiwiSU5JVF9EQVNIX1VOU1VQUE9SVCIsImNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsImlzQXV0byIsInVwZGF0ZVNldHRpbmdzIiwic3RyZWFtaW5nIiwiYWJyIiwiYXV0b1N3aXRjaEJpdHJhdGUiLCJ2aWRlbyIsInNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwicmVzdWx0IiwiZ2V0U2V0dGluZ3MiLCJnZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsImxpdmVEZWxheVJlZHVjaW5nQ2FsbGJhY2siLCJkdXJhdGlvbiIsImR2ckluZm8iLCJnZXREYXNoTWV0cmljcyIsImdldEN1cnJlbnREVlJJbmZvIiwibGl2ZURlbGF5IiwiZ2V0Q29uZmlnIiwibG93TGF0ZW5jeU1wZExpdmVEZWxheSIsInNlZWsiLCJyYW5nZSIsImVuZCIsInN0YXJ0IiwiTWVkaWFQbGF5ZXIiLCJjcmVhdGUiLCJpbml0aWFsaXplIiwiYXV0b1N0YXJ0IiwiRGVidWciLCJMT0dfTEVWRUxfTk9ORSIsImdldERlYnVnIiwic2V0TG9nVG9Ccm93c2VyQ29uc29sZSIsIndpbmRvdyIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfREFTSCIsIm1zZSIsImxpc3RlbmVyIiwiaXNMb2FkZWQiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImZyYW1lcmF0ZSIsImN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFNvdXJjZSIsInF1YWxpdHlMZXZlbHMiLCJzb3VyY2VzIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZmlsZSIsIm9mZiIsImV2ZW50cyIsIlBMQVlCQUNLX1BMQVlJTkciLCJsb3dMYXRlbmN5IiwibG93TGF0ZW5jeUVuYWJsZWQiLCJzZXRMb3dMYXRlbmN5RW5hYmxlZCIsInNldExpdmVEZWxheSIsIm9uIiwiY29uc29sZSIsInVuZGVmaW5lZCIsImF0dGFjaFNvdXJjZSIsIkVSUk9SIiwiZXJyb3IiLCJ0ZW1wRXJyb3IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUVVBTElUWV9DSEFOR0VfUkVRVUVTVEVEIiwiZXZlbnQiLCJtZWRpYVR5cGUiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwidHlwZSIsIlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVEIiwibmV3UXVhbGl0eSIsIlBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCIsImdldFF1YWxpdHlGb3IiLCJnZXRCaXRyYXRlSW5mb0xpc3RGb3IiLCJzdWJRdWFsaXR5TGlzdCIsImkiLCJsZW5ndGgiLCJfIiwiZmluZFdoZXJlIiwiYml0cmF0ZSIsImhlaWdodCIsIndpZHRoIiwicHVzaCIsImluZGV4IiwicXVhbGl0eUluZGV4IiwibGFiZWwiLCJpc0R5bmFtaWMiLCJwbGF5IiwibXV0ZWRQbGF5IiwicmV0cnlDb3VudCIsImdldFN0YXRlIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsImF0dGFjaFZpZXciLCJjaGVja0Rhc2hNZXRhTG9hZGVkIiwic2V0VGltZW91dCIsInNldEN1cnJlbnRRdWFsaXR5IiwiU1RBVEVfUExBWUlORyIsInNldFF1YWxpdHlGb3IiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJkZXN0cm95IiwicmVzZXQiLCJjb2RlIiwiSU5JVF9EQVNIX05PVEZPVU5EIiwic2l6ZUh1bWFuaXplciIsImJ5dGVzIiwic2kiLCJwb3N0cGl4IiwidGhyZXNoIiwiTWF0aCIsImFicyIsInVuaXQiLCJ1bml0cyIsInUiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFZQTs7Ozs7O0FBRUE7Ozs7O0FBS0EsSUFBTUEsWUFBWTtBQUNkQyxjQUFVLFVBREk7QUFFZEMsbUJBQWU7QUFGRCxDQUFsQixDLENBekJBOzs7O0FBNkJBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFVQyxPQUFWLEVBQW1CQyxZQUFuQixFQUFpQ0MsUUFBakMsRUFBMkM7O0FBRXBELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLGlCQUFpQixLQUFyQjtBQUNBLFFBQUlDLHFCQUFxQixJQUF6Qjs7QUFFQSxRQUFJQyxlQUFlLEVBQW5COztBQUVBLFFBQUk7O0FBRUEsWUFBSUMsT0FBT0MsT0FBUCxHQUFpQixPQUFyQixFQUE4QjtBQUMxQixrQkFBTUMsa0JBQU9DLEtBQVAsQ0FBYUMsOEJBQWIsQ0FBTjtBQUNIOztBQUVELFlBQU1DLGlDQUFpQyxTQUFqQ0EsOEJBQWlDLENBQVVDLE1BQVYsRUFBa0I7O0FBRXJELGdCQUFJTixPQUFPQyxPQUFQLElBQWtCLE9BQXRCLEVBQStCO0FBQzNCVCxxQkFBS2UsY0FBTCxDQUFvQjtBQUNoQkMsK0JBQVc7QUFDUEMsNkJB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RUFBOEI7QUFDaEQsUUFBSUMsU0FBU0YsS0FBSyxJQUFMLEdBQVksSUFBekI7QUFDQSxRQUFHRyxLQUFLQyxHQUFMLENBQVNMLEtBQVQsSUFBa0JHLE1BQXJCLEVBQTZCO0FBQ3pCLGVBQU9ILFFBQVEsSUFBZjtBQUNIO0FBQ0QsUUFBSU0sT0FBT0osV0FBUyxHQUFwQjtBQUNBLFFBQUlLLFFBQVEsQ0FBQyxNQUFJRCxJQUFMLEVBQVUsTUFBSUEsSUFBZCxFQUFtQixNQUFJQSxJQUF2QixFQUE0QixNQUFJQSxJQUFoQyxFQUFxQyxNQUFJQSxJQUF6QyxFQUE4QyxNQUFJQSxJQUFsRCxFQUF1RCxNQUFJQSxJQUEzRCxFQUFnRSxNQUFJQSxJQUFwRSxDQUFaO0FBQ0c7QUFDSCxRQUFJRSxJQUFJLENBQUMsQ0FBVDtBQUNBLE9BQUc7QUFDQ1IsaUJBQVNHLE1BQVQ7QUFDQSxVQUFFSyxDQUFGO0FBQ0gsS0FIRCxRQUdRSixLQUFLQyxHQUFMLENBQVNMLEtBQVQsS0FBbUJHLE1BQW5CLElBQTZCSyxJQUFJRCxNQUFNckMsTUFBTixHQUFlLENBSHhEO0FBSUEsV0FBTzhCLE1BQU1TLE9BQU4sQ0FBYyxDQUFkLElBQWlCRixNQUFNQyxDQUFOLENBQXhCO0FBQ0gsQ0FkRDs7cUJBZ0JlVCxhIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTQuLlxuICovXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCBzaXplSHVtYW5pemVyIGZyb20gXCJ1dGlscy9zaXplSHVtYW5pemVyXCI7XG5pbXBvcnQge1xuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBJTklUX0RBU0hfVU5TVVBQT1JULFxuICAgIElOSVRfREFTSF9OT1RGT1VORCxcbiAgICBFUlJPUlMsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBDT05URU5UX0xFVkVMX0NIQU5HRUQsXG4gICAgUFJPVklERVJfREFTSFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBkYXNoanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuY29uc3QgREFTSEVSUk9SID0ge1xuICAgIERPV05MT0FEOiBcImRvd25sb2FkXCIsXG4gICAgTUFOSUZFU1RFUlJPUjogXCJtYW5pZmVzdEVycm9yXCJcbn07XG5jb25zdCBEYXNoID0gZnVuY3Rpb24gKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpIHtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGRhc2ggPSBudWxsO1xuICAgIGxldCBzdXBlclBsYXlfZnVuYyA9IG51bGw7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcbiAgICBsZXQgc2Vla1Bvc2l0aW9uX3NlYyA9IDA7XG4gICAgbGV0IGlzRGFzaE1ldGFMb2FkZWQgPSBmYWxzZTtcbiAgICBsZXQgcnVuZWRBdXRvU3RhcnQgPSBmYWxzZTtcbiAgICB2YXIgcHJldkxMTGl2ZUR1cmF0aW9uID0gbnVsbDtcblxuICAgIGxldCBzb3VyY2VPZkZpbGUgPSBcIlwiO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPCBcIjIuNi41XCIpIHtcbiAgICAgICAgICAgIHRocm93IEVSUk9SUy5jb2Rlc1tJTklUX0RBU0hfVU5TVVBQT1JUXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvciA9IGZ1bmN0aW9uIChpc0F1dG8pIHtcblxuICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcbiAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYnI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvU3dpdGNoQml0cmF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlbzogaXNBdXRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhc2hqcy5WZXJzaW9uID4gXCIyLjkuMFwiKSB7XG4gICAgICAgICAgICAgICAgZGFzaC5zZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihcInZpZGVvXCIsIGlzQXV0byk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcblxuICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkYXNoLmdldFNldHRpbmdzKCkuc3RyZWFtaW5nLmFici5hdXRvU3dpdGNoQml0cmF0ZS52aWRlbztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkYXNoLmdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKFwidmlkZW9cIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgbGl2ZURlbGF5UmVkdWNpbmdDYWxsYmFjayAgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmIChkYXNoLmR1cmF0aW9uKCkgIT09IHByZXZMTExpdmVEdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIHByZXZMTExpdmVEdXJhdGlvbiA9IGRhc2guZHVyYXRpb24oKTtcblxuICAgICAgICAgICAgICAgIHZhciBkdnJJbmZvID0gZGFzaC5nZXREYXNoTWV0cmljcygpLmdldEN1cnJlbnREVlJJbmZvKCk7XG4gICAgICAgICAgICAgICAgdmFyIGxpdmVEZWxheSA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5O1xuXG4gICAgICAgICAgICAgICAgZGFzaC5zZWVrKGR2ckluZm8ucmFuZ2UuZW5kIC0gZHZySW5mby5yYW5nZS5zdGFydCAtIGxpdmVEZWxheSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIGRhc2ggPSBkYXNoanMuTWVkaWFQbGF5ZXIoKS5jcmVhdGUoKTtcbiAgICAgICAgZGFzaC5pbml0aWFsaXplKGVsZW1lbnQsIG51bGwsIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5hdXRvU3RhcnQpO1xuXG4gICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XG5cbiAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xuICAgICAgICAgICAgICAgICdkZWJ1Zyc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2xvZ0xldmVsJzogZGFzaGpzLkRlYnVnLkxPR19MRVZFTF9OT05FXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGRhc2guZ2V0RGVidWcoKS5zZXRMb2dUb0Jyb3dzZXJDb25zb2xlKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5kYXNoID0gZGFzaDtcblxuICAgICAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgICAgIG5hbWU6IFBST1ZJREVSX0RBU0gsXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgbXNlOiBkYXNoLFxuICAgICAgICAgICAgbGlzdGVuZXI6IG51bGwsXG4gICAgICAgICAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgICAgICAgICBjYW5TZWVrOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBzZWVraW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXRlOiBTVEFURV9JRExFLFxuICAgICAgICAgICAgYnVmZmVyOiAwLFxuICAgICAgICAgICAgZnJhbWVyYXRlOiAwLFxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IC0xLFxuICAgICAgICAgICAgY3VycmVudFNvdXJjZTogLTEsXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzOiBbXSxcbiAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxuICAgICAgICAgICAgYWRUYWdVcmw6IGFkVGFnVXJsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24gKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbikge1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogQXR0YWNoIEZpbGUgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIiArIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKHRydWUpO1xuICAgICAgICAgICAgc291cmNlT2ZGaWxlID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgIGRhc2gub2ZmKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUExBWUJBQ0tfUExBWUlORywgbGl2ZURlbGF5UmVkdWNpbmdDYWxsYmFjayk7XG5cbiAgICAgICAgICAgIGlmIChzb3VyY2UubG93TGF0ZW5jeSA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICAgICAgcHJldkxMTGl2ZUR1cmF0aW9uID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZGFzaC51cGRhdGVTZXR0aW5ncyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3dMYXRlbmN5RW5hYmxlZDogc291cmNlLmxvd0xhdGVuY3lcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2V0TG93TGF0ZW5jeUVuYWJsZWQoc291cmNlLmxvd0xhdGVuY3kpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheSAmJiB0eXBlb2YocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXkpID09PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXZlRGVsYXk6IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExpdmVEZWxheShwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUExBWUJBQ0tfUExBWUlORywgbGl2ZURlbGF5UmVkdWNpbmdDYWxsYmFjayk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndW5zZXQgbG93IGxhdGVuY3knKVxuXG4gICAgICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd0xhdGVuY3lFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXZlRGVsYXk6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZGFzaC5zZXRMb3dMYXRlbmN5RW5hYmxlZChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2V0TGl2ZURlbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhc2guYXR0YWNoU291cmNlKHNvdXJjZU9mRmlsZSk7XG4gICAgICAgICAgICBzZWVrUG9zaXRpb25fc2VjID0gbGFzdFBsYXlQb3NpdGlvbjtcblxuICAgICAgICB9KTtcblxuICAgICAgICBzdXBlclBsYXlfZnVuYyA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuRVJST1IsIGZ1bmN0aW9uIChlcnJvcikge1xuXG4gICAgICAgICAgICBpZiAoZXJyb3IgJiYgKGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuRE9XTkxPQUQgfHwgZXJyb3IuZXJyb3IgPT09IERBU0hFUlJPUi5NQU5JRkVTVEVSUk9SKSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICBlcnJvclRyaWdnZXIodGVtcEVycm9yLCB0aGF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFUVVFU1RFRCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKSB7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogc3BlYy5jdXJyZW50UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZXF1ZXN0XCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRU5ERVJFRCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKSB7XG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGV2ZW50Lm5ld1F1YWxpdHk7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogZXZlbnQubmV3UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZW5kZXJcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUExBWUJBQ0tfTUVUQURBVEFfTE9BREVELCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IFBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCAgOiBcIiwgZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKVtkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKV0pO1xuXG4gICAgICAgICAgICBpc0Rhc2hNZXRhTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBzdWJRdWFsaXR5TGlzdCA9IGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpO1xuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJRdWFsaXR5TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghXy5maW5kV2hlcmUoc3BlYy5xdWFsaXR5TGV2ZWxzLCB7Yml0cmF0ZTogc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSwgaGVpZ2h0OiBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQsIHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aH0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMucXVhbGl0eUxldmVscy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpdHJhdGU6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBzdWJRdWFsaXR5TGlzdFtpXS5xdWFsaXR5SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGggKyBcInhcIiArIHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCArIFwiLCBcIiArIHNpemVIdW1hbml6ZXIoc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSwgdHJ1ZSwgXCJicHNcIilcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGFzaC5pc0R5bmFtaWMoKSkge1xuICAgICAgICAgICAgICAgIHNwZWMuaXNMaXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGF0LnBsYXkgPSAobXV0ZWRQbGF5KSA9PiB7XG5cbiAgICAgICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcbiAgICAgICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcgfHwgdGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QQVVTRUQpIHtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpc0Rhc2hNZXRhTG9hZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZGFzaC5hdHRhY2hWaWV3KGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9EYXNoIGNhbiBpbmZpbml0ZSBsb2FkaW5nIHdoZW4gcGxheWVyIGlzIGluIGEgcGF1c2VkIHN0YXRlIGZvciBhIGxvbmcgdGltZS5cbiAgICAgICAgICAgIC8vVGhlbiBkYXNoIGFsd2F5cyBoYXZlIHRvIHJlbG9hZChhdHRhY2hWaWV3KSBhbmQgd2FpdCBmb3IgTWV0YUxvYWRlZCBldmVudCB3aGVuIHJlc3VtZS5cbiAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja0Rhc2hNZXRhTG9hZGVkKCkge1xuICAgICAgICAgICAgICAgIHJldHJ5Q291bnQrKztcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXNoTWV0YUxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICBzdXBlclBsYXlfZnVuYyhtdXRlZFBsYXkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHJ5Q291bnQgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tEYXNoTWV0YUxvYWRlZCwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gcXVhbGl0eUluZGV4O1xuICAgICAgICAgICAgaWYgKGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpKSB7XG4gICAgICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhc2guc2V0UXVhbGl0eUZvcihcInZpZGVvXCIsIHF1YWxpdHlJbmRleCk7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xuICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKGlzQXV0byk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgICAgIGRhc2gucmVzZXQoKTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgICAgIGlmIChlcnJvciAmJiBlcnJvci5jb2RlICYmIGVycm9yLmNvZGUgPT09IElOSVRfREFTSF9VTlNVUFBPUlQpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tJTklUX0RBU0hfTk9URk9VTkRdO1xuICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICB0aHJvdyB0ZW1wRXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgRGFzaDtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxNC4uXG4gKi9cblxuY29uc3Qgc2l6ZUh1bWFuaXplciA9IGZ1bmN0aW9uIChieXRlcywgc2ksIHBvc3RwaXgpIHtcbiAgICBsZXQgdGhyZXNoID0gc2kgPyAxMDAwIDogMTAyNDtcbiAgICBpZihNYXRoLmFicyhieXRlcykgPCB0aHJlc2gpIHtcbiAgICAgICAgcmV0dXJuIGJ5dGVzICsgJyBCJztcbiAgICB9XG4gICAgbGV0IHVuaXQgPSBwb3N0cGl4fHxcIkJcIjtcbiAgICBsZXQgdW5pdHMgPSBbJ2snK3VuaXQsJ00nK3VuaXQsJ0cnK3VuaXQsJ1QnK3VuaXQsJ1AnK3VuaXQsJ0UnK3VuaXQsJ1onK3VuaXQsJ1knK3VuaXRdO1xuICAgICAgIC8vID8gWydrQicsJ01CJywnR0InLCdUQicsJ1BCJywnRUInLCdaQicsJ1lCJ106IFsnS2lCJywnTWlCJywnR2lCJywnVGlCJywnUGlCJywnRWlCJywnWmlCJywnWWlCJ107XG4gICAgbGV0IHUgPSAtMTtcbiAgICBkbyB7XG4gICAgICAgIGJ5dGVzIC89IHRocmVzaDtcbiAgICAgICAgKyt1O1xuICAgIH0gd2hpbGUoTWF0aC5hYnMoYnl0ZXMpID49IHRocmVzaCAmJiB1IDwgdW5pdHMubGVuZ3RoIC0gMSk7XG4gICAgcmV0dXJuIGJ5dGVzLnRvRml4ZWQoMSkrdW5pdHNbdV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNpemVIdW1hbml6ZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==