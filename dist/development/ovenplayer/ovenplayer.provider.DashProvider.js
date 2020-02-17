/*! OvenPlayerv0.9.852 | (c)2020 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

                if (!liveDelay) {
                    liveDelay = 3;
                }

                dash.seek(dvrInfo.range.end - dvrInfo.range.start - liveDelay);
            }
        };

        dash = dashjs.MediaPlayer().create();
        dash.initialize(element, null, playerConfig.getConfig().autoStart);

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

            if (dashjs.Version >= '3.0.0') {

                dash.updateSettings({
                    debug: {
                        logLevel: dashjs.Debug.LOG_LEVEL_NONE
                    },
                    streaming: {
                        retryAttempts: {
                            MPD: 0
                        }
                    }
                });
            } else {

                dash.getDebug().setLogToBrowserConsole(false);
            }

            dash.attachSource(sourceOfFile);

            seekPosition_sec = lastPlayPosition;
        });

        superPlay_func = that["super"]('play');
        superDestroy_func = that["super"]('destroy');
        OvenPlayerConsole.log("DASH PROVIDER LOADED.");

        dash.on(dashjs.MediaPlayer.events.ERROR, function (error) {

            // Handle mpd load error.
            if (error && (error.error.code === dashjs.MediaPlayer.errors.DOWNLOAD_ERROR_ID_MANIFEST_CODE || error.error.code === dashjs.MediaPlayer.errors.MANIFEST_LOADER_LOADING_FAILURE_ERROR_CODE)) {

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

            if (dashjs.Version >= '3.0.0') {

                dash.updateSettings({
                    streaming: {
                        retryAttempts: {
                            MPD: 2
                        }
                    }
                });
            }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwiaXNEYXNoTWV0YUxvYWRlZCIsInByZXZMTExpdmVEdXJhdGlvbiIsInNvdXJjZU9mRmlsZSIsImRhc2hqcyIsIlZlcnNpb24iLCJFUlJPUlMiLCJjb2RlcyIsIklOSVRfREFTSF9VTlNVUFBPUlQiLCJjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJpc0F1dG8iLCJ1cGRhdGVTZXR0aW5ncyIsInN0cmVhbWluZyIsImFiciIsImF1dG9Td2l0Y2hCaXRyYXRlIiwidmlkZW8iLCJzZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsImNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsInJlc3VsdCIsImdldFNldHRpbmdzIiwiZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJsaXZlRGVsYXlSZWR1Y2luZ0NhbGxiYWNrIiwiZHVyYXRpb24iLCJkdnJJbmZvIiwiZ2V0RGFzaE1ldHJpY3MiLCJnZXRDdXJyZW50RFZSSW5mbyIsImxpdmVEZWxheSIsImdldENvbmZpZyIsImxvd0xhdGVuY3lNcGRMaXZlRGVsYXkiLCJzZWVrIiwicmFuZ2UiLCJlbmQiLCJzdGFydCIsIk1lZGlhUGxheWVyIiwiY3JlYXRlIiwiaW5pdGlhbGl6ZSIsImF1dG9TdGFydCIsIndpbmRvdyIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfREFTSCIsIm1zZSIsImxpc3RlbmVyIiwiaXNMb2FkZWQiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImZyYW1lcmF0ZSIsImN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFNvdXJjZSIsInF1YWxpdHlMZXZlbHMiLCJzb3VyY2VzIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZmlsZSIsIm9mZiIsImV2ZW50cyIsIlBMQVlCQUNLX1BMQVlJTkciLCJsb3dMYXRlbmN5IiwibG93TGF0ZW5jeUVuYWJsZWQiLCJzZXRMb3dMYXRlbmN5RW5hYmxlZCIsInNldExpdmVEZWxheSIsIm9uIiwidW5kZWZpbmVkIiwiZGVidWciLCJsb2dMZXZlbCIsIkRlYnVnIiwiTE9HX0xFVkVMX05PTkUiLCJyZXRyeUF0dGVtcHRzIiwiTVBEIiwiZ2V0RGVidWciLCJzZXRMb2dUb0Jyb3dzZXJDb25zb2xlIiwiYXR0YWNoU291cmNlIiwiRVJST1IiLCJlcnJvciIsImNvZGUiLCJlcnJvcnMiLCJET1dOTE9BRF9FUlJPUl9JRF9NQU5JRkVTVF9DT0RFIiwiTUFOSUZFU1RfTE9BREVSX0xPQURJTkdfRkFJTFVSRV9FUlJPUl9DT0RFIiwidGVtcEVycm9yIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlFVQUxJVFlfQ0hBTkdFX1JFUVVFU1RFRCIsImV2ZW50IiwibWVkaWFUeXBlIiwidHJpZ2dlciIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsInR5cGUiLCJRVUFMSVRZX0NIQU5HRV9SRU5ERVJFRCIsIm5ld1F1YWxpdHkiLCJQTEFZQkFDS19NRVRBREFUQV9MT0FERUQiLCJnZXRRdWFsaXR5Rm9yIiwiZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yIiwic3ViUXVhbGl0eUxpc3QiLCJpIiwibGVuZ3RoIiwiXyIsImZpbmRXaGVyZSIsImJpdHJhdGUiLCJoZWlnaHQiLCJ3aWR0aCIsInB1c2giLCJpbmRleCIsInF1YWxpdHlJbmRleCIsImxhYmVsIiwiaXNEeW5hbWljIiwicGxheSIsIm11dGVkUGxheSIsInJldHJ5Q291bnQiLCJnZXRTdGF0ZSIsIlNUQVRFX0FEX1BMQVlJTkciLCJTVEFURV9BRF9QQVVTRUQiLCJhdHRhY2hWaWV3IiwiY2hlY2tEYXNoTWV0YUxvYWRlZCIsInNldFRpbWVvdXQiLCJzZXRDdXJyZW50UXVhbGl0eSIsIlNUQVRFX1BMQVlJTkciLCJzZXRRdWFsaXR5Rm9yIiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiZGVzdHJveSIsInJlc2V0IiwiSU5JVF9EQVNIX05PVEZPVU5EIiwic2l6ZUh1bWFuaXplciIsImJ5dGVzIiwic2kiLCJwb3N0cGl4IiwidGhyZXNoIiwiTWF0aCIsImFicyIsInVuaXQiLCJ1bml0cyIsInUiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFZQTs7Ozs7O0FBRUE7Ozs7O0FBS0EsSUFBTUEsWUFBWTtBQUNkQyxjQUFVLFVBREk7QUFFZEMsbUJBQWU7QUFGRCxDQUFsQixDLENBekJBOzs7O0FBNkJBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFVQyxPQUFWLEVBQW1CQyxZQUFuQixFQUFpQ0MsUUFBakMsRUFBMkM7O0FBRXBELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLHFCQUFxQixJQUF6Qjs7QUFFQSxRQUFJQyxlQUFlLEVBQW5COztBQUVBLFFBQUk7O0FBRUEsWUFBSUMsT0FBT0MsT0FBUCxHQUFpQixPQUFyQixFQUE4QjtBQUMxQixrQkFBTUMsa0JBQU9DLEtBQVAsQ0FBYUMsOEJBQWIsQ0FBTjtBQUNIOztBQUVELFlBQU1DLGlDQUFpQyxTQUFqQ0EsOEJBQWlDLENBQVVDLE1BQVYsRUFBa0I7O0FBRXJELGdCQUFJ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QXhCO0FBQ0gsQ0FkRDs7cUJBZ0JlVCxhIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTQuLlxuICovXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCBzaXplSHVtYW5pemVyIGZyb20gXCJ1dGlscy9zaXplSHVtYW5pemVyXCI7XG5pbXBvcnQge1xuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBJTklUX0RBU0hfVU5TVVBQT1JULFxuICAgIElOSVRfREFTSF9OT1RGT1VORCxcbiAgICBFUlJPUlMsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBDT05URU5UX0xFVkVMX0NIQU5HRUQsXG4gICAgUFJPVklERVJfREFTSFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBkYXNoanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuY29uc3QgREFTSEVSUk9SID0ge1xuICAgIERPV05MT0FEOiBcImRvd25sb2FkXCIsXG4gICAgTUFOSUZFU1RFUlJPUjogXCJtYW5pZmVzdEVycm9yXCJcbn07XG5jb25zdCBEYXNoID0gZnVuY3Rpb24gKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpIHtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGRhc2ggPSBudWxsO1xuICAgIGxldCBzdXBlclBsYXlfZnVuYyA9IG51bGw7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcbiAgICBsZXQgc2Vla1Bvc2l0aW9uX3NlYyA9IDA7XG4gICAgbGV0IGlzRGFzaE1ldGFMb2FkZWQgPSBmYWxzZTtcbiAgICB2YXIgcHJldkxMTGl2ZUR1cmF0aW9uID0gbnVsbDtcblxuICAgIGxldCBzb3VyY2VPZkZpbGUgPSBcIlwiO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPCBcIjIuNi41XCIpIHtcbiAgICAgICAgICAgIHRocm93IEVSUk9SUy5jb2Rlc1tJTklUX0RBU0hfVU5TVVBQT1JUXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvciA9IGZ1bmN0aW9uIChpc0F1dG8pIHtcblxuICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcbiAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYnI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvU3dpdGNoQml0cmF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlbzogaXNBdXRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhc2hqcy5WZXJzaW9uID4gXCIyLjkuMFwiKSB7XG4gICAgICAgICAgICAgICAgZGFzaC5zZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihcInZpZGVvXCIsIGlzQXV0byk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcblxuICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkYXNoLmdldFNldHRpbmdzKCkuc3RyZWFtaW5nLmFici5hdXRvU3dpdGNoQml0cmF0ZS52aWRlbztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkYXNoLmdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKFwidmlkZW9cIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgbGl2ZURlbGF5UmVkdWNpbmdDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKGRhc2guZHVyYXRpb24oKSAhPT0gcHJldkxMTGl2ZUR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgcHJldkxMTGl2ZUR1cmF0aW9uID0gZGFzaC5kdXJhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGR2ckluZm8gPSBkYXNoLmdldERhc2hNZXRyaWNzKCkuZ2V0Q3VycmVudERWUkluZm8oKTtcbiAgICAgICAgICAgICAgICB2YXIgbGl2ZURlbGF5ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWxpdmVEZWxheSkge1xuICAgICAgICAgICAgICAgICAgICBsaXZlRGVsYXkgPSAzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRhc2guc2VlayhkdnJJbmZvLnJhbmdlLmVuZCAtIGR2ckluZm8ucmFuZ2Uuc3RhcnQgLSBsaXZlRGVsYXkpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICBkYXNoID0gZGFzaGpzLk1lZGlhUGxheWVyKCkuY3JlYXRlKCk7XG4gICAgICAgIGRhc2guaW5pdGlhbGl6ZShlbGVtZW50LCBudWxsLCBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuYXV0b1N0YXJ0KTtcblxuICAgICAgICB3aW5kb3cuZGFzaCA9IGRhc2g7XG5cbiAgICAgICAgbGV0IHNwZWMgPSB7XG4gICAgICAgICAgICBuYW1lOiBQUk9WSURFUl9EQVNILFxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIG1zZTogZGFzaCxcbiAgICAgICAgICAgIGxpc3RlbmVyOiBudWxsLFxuICAgICAgICAgICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY2FuU2VlazogZmFsc2UsXG4gICAgICAgICAgICBpc0xpdmU6IGZhbHNlLFxuICAgICAgICAgICAgc2Vla2luZzogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZTogU1RBVEVfSURMRSxcbiAgICAgICAgICAgIGJ1ZmZlcjogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZTogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiAtMSxcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IC0xLFxuICAgICAgICAgICAgcXVhbGl0eUxldmVsczogW10sXG4gICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgIGFkVGFnVXJsOiBhZFRhZ1VybFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uIChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pIHtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IEF0dGFjaCBGaWxlIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIgKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcih0cnVlKTtcbiAgICAgICAgICAgIHNvdXJjZU9mRmlsZSA9IHNvdXJjZS5maWxlO1xuXG4gICAgICAgICAgICBkYXNoLm9mZihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlBMQVlCQUNLX1BMQVlJTkcsIGxpdmVEZWxheVJlZHVjaW5nQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICBpZiAoc291cmNlLmxvd0xhdGVuY3kgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgICAgIHByZXZMTExpdmVEdXJhdGlvbiA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93TGF0ZW5jeUVuYWJsZWQ6IHNvdXJjZS5sb3dMYXRlbmN5XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExvd0xhdGVuY3lFbmFibGVkKHNvdXJjZS5sb3dMYXRlbmN5KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXkgJiYgdHlwZW9mKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5KSA9PT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl2ZURlbGF5OiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGFzaC5zZXRMaXZlRGVsYXkocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlBMQVlCQUNLX1BMQVlJTkcsIGxpdmVEZWxheVJlZHVjaW5nQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd0xhdGVuY3lFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXZlRGVsYXk6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZGFzaC5zZXRMb3dMYXRlbmN5RW5hYmxlZChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2V0TGl2ZURlbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XG5cbiAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICAgICAgZGVidWc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ0xldmVsOiBkYXNoanMuRGVidWcuTE9HX0xFVkVMX05PTkVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUF0dGVtcHRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTVBEOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGRhc2guZ2V0RGVidWcoKS5zZXRMb2dUb0Jyb3dzZXJDb25zb2xlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGFzaC5hdHRhY2hTb3VyY2Uoc291cmNlT2ZGaWxlKTtcblxuICAgICAgICAgICAgc2Vla1Bvc2l0aW9uX3NlYyA9IGxhc3RQbGF5UG9zaXRpb247XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3VwZXJQbGF5X2Z1bmMgPSB0aGF0LnN1cGVyKCdwbGF5Jyk7XG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIFBST1ZJREVSIExPQURFRC5cIik7XG5cbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLkVSUk9SLCBmdW5jdGlvbiAoZXJyb3IpIHtcblxuICAgICAgICAgICAgLy8gSGFuZGxlIG1wZCBsb2FkIGVycm9yLlxuICAgICAgICAgICAgaWYgKGVycm9yICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICBlcnJvci5lcnJvci5jb2RlID09PSBkYXNoanMuTWVkaWFQbGF5ZXIuZXJyb3JzLkRPV05MT0FEX0VSUk9SX0lEX01BTklGRVNUX0NPREUgfHxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IuZXJyb3IuY29kZSA9PT0gZGFzaGpzLk1lZGlhUGxheWVyLmVycm9ycy5NQU5JRkVTVF9MT0FERVJfTE9BRElOR19GQUlMVVJFX0VSUk9SX0NPREVcbiAgICAgICAgICAgICAgICApKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1JdO1xuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVRVUVTVEVELCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC5tZWRpYVR5cGUgJiYgZXZlbnQubWVkaWFUeXBlID09PSBcInZpZGVvXCIpIHtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCksXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBzcGVjLmN1cnJlbnRRdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlcXVlc3RcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVELCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC5tZWRpYVR5cGUgJiYgZXZlbnQubWVkaWFUeXBlID09PSBcInZpZGVvXCIpIHtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZXZlbnQubmV3UXVhbGl0eTtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCksXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBldmVudC5uZXdRdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlbmRlclwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5QTEFZQkFDS19NRVRBREFUQV9MT0FERUQsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xuXG4gICAgICAgICAgICAgICAgZGFzaC51cGRhdGVTZXR0aW5ncyh7XG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlBdHRlbXB0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1QRDogMlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQTEFZQkFDS19NRVRBREFUQV9MT0FERUQgIDogXCIsIGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJylbZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIildKTtcblxuICAgICAgICAgICAgaXNEYXNoTWV0YUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgc3ViUXVhbGl0eUxpc3QgPSBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKTtcbiAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViUXVhbGl0eUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIV8uZmluZFdoZXJlKHNwZWMucXVhbGl0eUxldmVscywge2JpdHJhdGU6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LCB3aWR0aDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGh9KSkge1xuICAgICAgICAgICAgICAgICAgICBzcGVjLnF1YWxpdHlMZXZlbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBiaXRyYXRlOiBzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogc3ViUXVhbGl0eUxpc3RbaV0ucXVhbGl0eUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoICsgXCJ4XCIgKyBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQgKyBcIiwgXCIgKyBzaXplSHVtYW5pemVyKHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsIHRydWUsIFwiYnBzXCIpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhc2guaXNEeW5hbWljKCkpIHtcbiAgICAgICAgICAgICAgICBzcGVjLmlzTGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhhdC5wbGF5ID0gKG11dGVkUGxheSkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XG4gICAgICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HIHx8IHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUEFVU0VEKSB7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXNEYXNoTWV0YUxvYWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRhc2guYXR0YWNoVmlldyhlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vRGFzaCBjYW4gaW5maW5pdGUgbG9hZGluZyB3aGVuIHBsYXllciBpcyBpbiBhIHBhdXNlZCBzdGF0ZSBmb3IgYSBsb25nIHRpbWUuXG4gICAgICAgICAgICAvL1RoZW4gZGFzaCBhbHdheXMgaGF2ZSB0byByZWxvYWQoYXR0YWNoVmlldykgYW5kIHdhaXQgZm9yIE1ldGFMb2FkZWQgZXZlbnQgd2hlbiByZXN1bWUuXG4gICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tEYXNoTWV0YUxvYWRlZCgpIHtcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50Kys7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGFzaE1ldGFMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXJQbGF5X2Z1bmMobXV0ZWRQbGF5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRyeUNvdW50IDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRGFzaE1ldGFMb2FkZWQsIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IHF1YWxpdHlJbmRleDtcbiAgICAgICAgICAgIGlmIChjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKSkge1xuICAgICAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXNoLnNldFF1YWxpdHlGb3IoXCJ2aWRlb1wiLCBxdWFsaXR5SW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcbiAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihpc0F1dG8pO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgICAgICBkYXNoLnJlc2V0KCk7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICAgICAgICBpZiAoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBlcnJvci5jb2RlID09PSBJTklUX0RBU0hfVU5TVVBQT1JUKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9EQVNIX05PVEZPVU5EXTtcbiAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgdGhyb3cgdGVtcEVycm9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IERhc2g7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTQuLlxuICovXG5cbmNvbnN0IHNpemVIdW1hbml6ZXIgPSBmdW5jdGlvbiAoYnl0ZXMsIHNpLCBwb3N0cGl4KSB7XG4gICAgbGV0IHRocmVzaCA9IHNpID8gMTAwMCA6IDEwMjQ7XG4gICAgaWYoTWF0aC5hYnMoYnl0ZXMpIDwgdGhyZXNoKSB7XG4gICAgICAgIHJldHVybiBieXRlcyArICcgQic7XG4gICAgfVxuICAgIGxldCB1bml0ID0gcG9zdHBpeHx8XCJCXCI7XG4gICAgbGV0IHVuaXRzID0gWydrJyt1bml0LCdNJyt1bml0LCdHJyt1bml0LCdUJyt1bml0LCdQJyt1bml0LCdFJyt1bml0LCdaJyt1bml0LCdZJyt1bml0XTtcbiAgICAgICAvLyA/IFsna0InLCdNQicsJ0dCJywnVEInLCdQQicsJ0VCJywnWkInLCdZQiddOiBbJ0tpQicsJ01pQicsJ0dpQicsJ1RpQicsJ1BpQicsJ0VpQicsJ1ppQicsJ1lpQiddO1xuICAgIGxldCB1ID0gLTE7XG4gICAgZG8ge1xuICAgICAgICBieXRlcyAvPSB0aHJlc2g7XG4gICAgICAgICsrdTtcbiAgICB9IHdoaWxlKE1hdGguYWJzKGJ5dGVzKSA+PSB0aHJlc2ggJiYgdSA8IHVuaXRzLmxlbmd0aCAtIDEpO1xuICAgIHJldHVybiBieXRlcy50b0ZpeGVkKDEpK3VuaXRzW3VdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaXplSHVtYW5pemVyOyJdLCJzb3VyY2VSb290IjoiIn0=