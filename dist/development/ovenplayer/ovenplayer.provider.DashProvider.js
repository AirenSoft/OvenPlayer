/*! OvenPlayerv0.9.0 | (c)2020 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var _constants2 = __webpack_require__(/*! ../../../constants */ "./src/js/api/constants.js");

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
    var superPlay_func = null;
    var superDestroy_func = null;
    var seekPosition_sec = 0;
    var isDashMetaLoaded = false;
    var prevLLLiveDuration = null;
    var loadRetryer = null;
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

        var loadingRetryCount = playerConfig.getConfig().loadingRetryCount;

        dash.on(dashjs.MediaPlayer.events.ERROR, function (error) {

            // Handle mpd load error.
            if (error && (error.error.code === dashjs.MediaPlayer.errors.DOWNLOAD_ERROR_ID_MANIFEST_CODE || error.error.code === dashjs.MediaPlayer.errors.MANIFEST_LOADER_LOADING_FAILURE_ERROR_CODE)) {

                if (loadingRetryCount > 0) {

                    that.setState(_constants2.STATE_LOADING);

                    if (loadRetryer) {
                        clearTimeout(loadRetryer);
                        loadRetryer = null;
                    }

                    loadingRetryCount = loadingRetryCount - 1;

                    loadRetryer = setTimeout(function () {

                        dash.attachSource(sourceOfFile);
                    }, 1000);
                } else {

                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_UNKNWON_NETWORK_ERROR];
                    tempError.error = error;
                    (0, _utils.errorTrigger)(tempError, that);
                }
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
            } else {

                if (seekPosition_sec && typeof seekPosition_sec === 'number' && seekPosition_sec >= 0) dash.seek(seekPosition_sec);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwiaXNEYXNoTWV0YUxvYWRlZCIsInByZXZMTExpdmVEdXJhdGlvbiIsImxvYWRSZXRyeWVyIiwic291cmNlT2ZGaWxlIiwiZGFzaGpzIiwiVmVyc2lvbiIsIkVSUk9SUyIsImNvZGVzIiwiSU5JVF9EQVNIX1VOU1VQUE9SVCIsImNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsImlzQXV0byIsInVwZGF0ZVNldHRpbmdzIiwic3RyZWFtaW5nIiwiYWJyIiwiYXV0b1N3aXRjaEJpdHJhdGUiLCJ2aWRlbyIsInNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwicmVzdWx0IiwiZ2V0U2V0dGluZ3MiLCJnZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsImxpdmVEZWxheVJlZHVjaW5nQ2FsbGJhY2siLCJkdXJhdGlvbiIsImR2ckluZm8iLCJnZXREYXNoTWV0cmljcyIsImdldEN1cnJlbnREVlJJbmZvIiwibGl2ZURlbGF5IiwiZ2V0Q29uZmlnIiwibG93TGF0ZW5jeU1wZExpdmVEZWxheSIsInNlZWsiLCJyYW5nZSIsImVuZCIsInN0YXJ0IiwiTWVkaWFQbGF5ZXIiLCJjcmVhdGUiLCJpbml0aWFsaXplIiwiYXV0b1N0YXJ0Iiwid2luZG93Iiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9EQVNIIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJmaWxlIiwib2ZmIiwiZXZlbnRzIiwiUExBWUJBQ0tfUExBWUlORyIsImxvd0xhdGVuY3kiLCJsb3dMYXRlbmN5RW5hYmxlZCIsInNldExvd0xhdGVuY3lFbmFibGVkIiwic2V0TGl2ZURlbGF5Iiwib24iLCJ1bmRlZmluZWQiLCJkZWJ1ZyIsImxvZ0xldmVsIiwiRGVidWciLCJMT0dfTEVWRUxfTk9ORSIsInJldHJ5QXR0ZW1wdHMiLCJNUEQiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJhdHRhY2hTb3VyY2UiLCJsb2FkaW5nUmV0cnlDb3VudCIsIkVSUk9SIiwiZXJyb3IiLCJjb2RlIiwiZXJyb3JzIiwiRE9XTkxPQURfRVJST1JfSURfTUFOSUZFU1RfQ09ERSIsIk1BTklGRVNUX0xPQURFUl9MT0FESU5HX0ZBSUxVUkVfRVJST1JfQ09ERSIsInNldFN0YXRlIiwiU1RBVEVfTE9BRElORyIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ0ZW1wRXJyb3IiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUVVBTElUWV9DSEFOR0VfUkVRVUVTVEVEIiwiZXZlbnQiLCJtZWRpYVR5cGUiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwidHlwZSIsIlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVEIiwibmV3UXVhbGl0eSIsIlBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCIsImdldFF1YWxpdHlGb3IiLCJnZXRCaXRyYXRlSW5mb0xpc3RGb3IiLCJzdWJRdWFsaXR5TGlzdCIsImkiLCJsZW5ndGgiLCJfIiwiZmluZFdoZXJlIiwiYml0cmF0ZSIsImhlaWdodCIsIndpZHRoIiwicHVzaCIsImluZGV4IiwicXVhbGl0eUluZGV4IiwibGFiZWwiLCJpc0R5bmFtaWMiLCJwbGF5IiwibXV0ZWRQbGF5IiwicmV0cnlDb3VudCIsImdldFN0YXRlIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsImF0dGFjaFZpZXciLCJjaGVja0Rhc2hNZXRhTG9hZGVkIiwic2V0Q3VycmVudFF1YWxpdHkiLCJTVEFURV9QTEFZSU5HIiwic2V0UXVhbGl0eUZvciIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImRlc3Ryb3kiLCJyZXNldCIsIklOSVRfREFTSF9OT1RGT1VORCIsInNpemVIdW1hbml6ZXIiLCJieXRlcyIsInNpIiwicG9zdHBpeCIsInRocmVzaCIsIk1hdGgiLCJhYnMiLCJ1bml0IiwidW5pdHMiLCJ1IiwidG9GaXhlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBWUE7Ozs7QUFDQTs7OztBQUVBOzs7OztBQXJCQTs7O0FBMEJBLElBQU1BLFlBQVk7QUFDZEMsY0FBVSxVQURJO0FBRWRDLG1CQUFlO0FBRkQsQ0FBbEI7QUFJQSxJQUFNQyxPQUFPLFNBQVBBLElBQU8sQ0FBVUMsT0FBVixFQUFtQkMsWUFBbkIsRUFBaUNDLFFBQWpDLEVBQTJDOztBQUVwRCxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxPQUFPLElBQVg7QUFDQSxRQUFJQyxpQkFBaUIsSUFBckI7QUFDQSxRQUFJQyxvQkFBb0IsSUFBeEI7QUFDQSxRQUFJQyxtQkFBbUIsQ0FBdkI7QUFDQSxRQUFJQyxtQkFBbUIsS0FBdkI7QUFDQSxRQUFJQyxxQkFBcUIsSUFBekI7QUFDQSxRQUFJQyxjQUFjLElBQWxCO0FBQ0EsUUFBSUMsZUFBZSxFQUFuQjs7QUFFQSxRQUFJOztBQUVBLFlBQUlDLE9BQU9DLE9BQVAsR0FBaUIsT0FBckIsRUFBOEI7QUFDMUIsa0JB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cUJDLE9BQXJCLEVBQThCO0FBQ2hELFFBQUlDLFNBQVNGLEtBQUssSUFBTCxHQUFZLElBQXpCO0FBQ0EsUUFBR0csS0FBS0MsR0FBTCxDQUFTTCxLQUFULElBQWtCRyxNQUFyQixFQUE2QjtBQUN6QixlQUFPSCxRQUFRLElBQWY7QUFDSDtBQUNELFFBQUlNLE9BQU9KLFdBQVMsR0FBcEI7QUFDQSxRQUFJSyxRQUFRLENBQUMsTUFBSUQsSUFBTCxFQUFVLE1BQUlBLElBQWQsRUFBbUIsTUFBSUEsSUFBdkIsRUFBNEIsTUFBSUEsSUFBaEMsRUFBcUMsTUFBSUEsSUFBekMsRUFBOEMsTUFBSUEsSUFBbEQsRUFBdUQsTUFBSUEsSUFBM0QsRUFBZ0UsTUFBSUEsSUFBcEUsQ0FBWjtBQUNHO0FBQ0gsUUFBSUUsSUFBSSxDQUFDLENBQVQ7QUFDQSxPQUFHO0FBQ0NSLGlCQUFTRyxNQUFUO0FBQ0EsVUFBRUssQ0FBRjtBQUNILEtBSEQsUUFHUUosS0FBS0MsR0FBTCxDQUFTTCxLQUFULEtBQW1CRyxNQUFuQixJQUE2QkssSUFBSUQsTUFBTW5DLE1BQU4sR0FBZSxDQUh4RDtBQUlBLFdBQU80QixNQUFNUyxPQUFOLENBQWMsQ0FBZCxJQUFpQkYsTUFBTUMsQ0FBTixDQUF4QjtBQUNILENBZEQ7O3FCQWdCZVQsYSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDE0Li5cbiAqL1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQgc2l6ZUh1bWFuaXplciBmcm9tIFwidXRpbHMvc2l6ZUh1bWFuaXplclwiO1xuaW1wb3J0IHtcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfQURfUExBWUlORyxcbiAgICBTVEFURV9BRF9QQVVTRUQsXG4gICAgSU5JVF9EQVNIX1VOU1VQUE9SVCxcbiAgICBJTklUX0RBU0hfTk9URk9VTkQsXG4gICAgRVJST1JTLFxuICAgIFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IsXG4gICAgQ09OVEVOVF9MRVZFTF9DSEFOR0VELFxuICAgIFBST1ZJREVSX0RBU0hcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5pbXBvcnQge1NUQVRFX0xPQURJTkd9IGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBkYXNoanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuY29uc3QgREFTSEVSUk9SID0ge1xuICAgIERPV05MT0FEOiBcImRvd25sb2FkXCIsXG4gICAgTUFOSUZFU1RFUlJPUjogXCJtYW5pZmVzdEVycm9yXCJcbn07XG5jb25zdCBEYXNoID0gZnVuY3Rpb24gKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpIHtcblxuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGRhc2ggPSBudWxsO1xuICAgIGxldCBzdXBlclBsYXlfZnVuYyA9IG51bGw7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcbiAgICBsZXQgc2Vla1Bvc2l0aW9uX3NlYyA9IDA7XG4gICAgbGV0IGlzRGFzaE1ldGFMb2FkZWQgPSBmYWxzZTtcbiAgICB2YXIgcHJldkxMTGl2ZUR1cmF0aW9uID0gbnVsbDtcbiAgICBsZXQgbG9hZFJldHJ5ZXIgPSBudWxsO1xuICAgIGxldCBzb3VyY2VPZkZpbGUgPSBcIlwiO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPCBcIjIuNi41XCIpIHtcbiAgICAgICAgICAgIHRocm93IEVSUk9SUy5jb2Rlc1tJTklUX0RBU0hfVU5TVVBQT1JUXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvciA9IGZ1bmN0aW9uIChpc0F1dG8pIHtcblxuICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcbiAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYnI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvU3dpdGNoQml0cmF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlbzogaXNBdXRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhc2hqcy5WZXJzaW9uID4gXCIyLjkuMFwiKSB7XG4gICAgICAgICAgICAgICAgZGFzaC5zZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihcInZpZGVvXCIsIGlzQXV0byk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcblxuICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkYXNoLmdldFNldHRpbmdzKCkuc3RyZWFtaW5nLmFici5hdXRvU3dpdGNoQml0cmF0ZS52aWRlbztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkYXNoLmdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKFwidmlkZW9cIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgbGl2ZURlbGF5UmVkdWNpbmdDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKGRhc2guZHVyYXRpb24oKSAhPT0gcHJldkxMTGl2ZUR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgcHJldkxMTGl2ZUR1cmF0aW9uID0gZGFzaC5kdXJhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGR2ckluZm8gPSBkYXNoLmdldERhc2hNZXRyaWNzKCkuZ2V0Q3VycmVudERWUkluZm8oKTtcbiAgICAgICAgICAgICAgICB2YXIgbGl2ZURlbGF5ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWxpdmVEZWxheSkge1xuICAgICAgICAgICAgICAgICAgICBsaXZlRGVsYXkgPSAzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRhc2guc2VlayhkdnJJbmZvLnJhbmdlLmVuZCAtIGR2ckluZm8ucmFuZ2Uuc3RhcnQgLSBsaXZlRGVsYXkpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICBkYXNoID0gZGFzaGpzLk1lZGlhUGxheWVyKCkuY3JlYXRlKCk7XG4gICAgICAgIGRhc2guaW5pdGlhbGl6ZShlbGVtZW50LCBudWxsLCBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuYXV0b1N0YXJ0KTtcblxuICAgICAgICB3aW5kb3cuZGFzaCA9IGRhc2g7XG5cbiAgICAgICAgbGV0IHNwZWMgPSB7XG4gICAgICAgICAgICBuYW1lOiBQUk9WSURFUl9EQVNILFxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIG1zZTogZGFzaCxcbiAgICAgICAgICAgIGxpc3RlbmVyOiBudWxsLFxuICAgICAgICAgICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY2FuU2VlazogZmFsc2UsXG4gICAgICAgICAgICBpc0xpdmU6IGZhbHNlLFxuICAgICAgICAgICAgc2Vla2luZzogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZTogU1RBVEVfSURMRSxcbiAgICAgICAgICAgIGJ1ZmZlcjogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZTogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiAtMSxcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IC0xLFxuICAgICAgICAgICAgcXVhbGl0eUxldmVsczogW10sXG4gICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgIGFkVGFnVXJsOiBhZFRhZ1VybFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uIChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pIHtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IEF0dGFjaCBGaWxlIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIgKyBsYXN0UGxheVBvc2l0aW9uKTtcblxuICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKHRydWUpO1xuICAgICAgICAgICAgc291cmNlT2ZGaWxlID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgIGRhc2gub2ZmKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUExBWUJBQ0tfUExBWUlORywgbGl2ZURlbGF5UmVkdWNpbmdDYWxsYmFjayk7XG5cbiAgICAgICAgICAgIGlmIChzb3VyY2UubG93TGF0ZW5jeSA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICAgICAgcHJldkxMTGl2ZUR1cmF0aW9uID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZGFzaC51cGRhdGVTZXR0aW5ncyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3dMYXRlbmN5RW5hYmxlZDogc291cmNlLmxvd0xhdGVuY3lcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2V0TG93TGF0ZW5jeUVuYWJsZWQoc291cmNlLmxvd0xhdGVuY3kpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheSAmJiB0eXBlb2YocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXkpID09PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXZlRGVsYXk6IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExpdmVEZWxheShwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUExBWUJBQ0tfUExBWUlORywgbGl2ZURlbGF5UmVkdWNpbmdDYWxsYmFjayk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93TGF0ZW5jeUVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdmVEZWxheTogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExvd0xhdGVuY3lFbmFibGVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgZGFzaC5zZXRMaXZlRGVsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcblxuICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xuICAgICAgICAgICAgICAgICAgICBkZWJ1Zzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nTGV2ZWw6IGRhc2hqcy5EZWJ1Zy5MT0dfTEVWRUxfTk9ORVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5QXR0ZW1wdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNUEQ6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgZGFzaC5nZXREZWJ1ZygpLnNldExvZ1RvQnJvd3NlckNvbnNvbGUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXNoLmF0dGFjaFNvdXJjZShzb3VyY2VPZkZpbGUpO1xuXG4gICAgICAgICAgICBzZWVrUG9zaXRpb25fc2VjID0gbGFzdFBsYXlQb3NpdGlvbjtcblxuICAgICAgICB9KTtcblxuICAgICAgICBzdXBlclBsYXlfZnVuYyA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICBsZXQgbG9hZGluZ1JldHJ5Q291bnQgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG9hZGluZ1JldHJ5Q291bnQ7XG5cbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLkVSUk9SLCBmdW5jdGlvbiAoZXJyb3IpIHtcblxuICAgICAgICAgICAgLy8gSGFuZGxlIG1wZCBsb2FkIGVycm9yLlxuICAgICAgICAgICAgaWYgKGVycm9yICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICBlcnJvci5lcnJvci5jb2RlID09PSBkYXNoanMuTWVkaWFQbGF5ZXIuZXJyb3JzLkRPV05MT0FEX0VSUk9SX0lEX01BTklGRVNUX0NPREUgfHxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IuZXJyb3IuY29kZSA9PT0gZGFzaGpzLk1lZGlhUGxheWVyLmVycm9ycy5NQU5JRkVTVF9MT0FERVJfTE9BRElOR19GQUlMVVJFX0VSUk9SX0NPREVcbiAgICAgICAgICAgICAgICApKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAobG9hZGluZ1JldHJ5Q291bnQgPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nUmV0cnlDb3VudCA9IGxvYWRpbmdSZXRyeUNvdW50IC0gMTtcblxuICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2guYXR0YWNoU291cmNlKHNvdXJjZU9mRmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFUVVFU1RFRCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKSB7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogc3BlYy5jdXJyZW50UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZXF1ZXN0XCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRU5ERVJFRCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKSB7XG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGV2ZW50Lm5ld1F1YWxpdHk7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogZXZlbnQubmV3UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZW5kZXJcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUExBWUJBQ0tfTUVUQURBVEFfTE9BREVELCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcblxuICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xuICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5QXR0ZW1wdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNUEQ6IDJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUExBWUJBQ0tfTUVUQURBVEFfTE9BREVEICA6IFwiLCBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpW2Rhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpXSk7XG5cbiAgICAgICAgICAgIGlzRGFzaE1ldGFMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHN1YlF1YWxpdHlMaXN0ID0gZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyk7XG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YlF1YWxpdHlMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfLmZpbmRXaGVyZShzcGVjLnF1YWxpdHlMZXZlbHMsIHtiaXRyYXRlOiBzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCwgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRofSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5xdWFsaXR5TGV2ZWxzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgYml0cmF0ZTogc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHN1YlF1YWxpdHlMaXN0W2ldLnF1YWxpdHlJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCArIFwieFwiICsgc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0ICsgXCIsIFwiICsgc2l6ZUh1bWFuaXplcihzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCB0cnVlLCBcImJwc1wiKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXNoLmlzRHluYW1pYygpKSB7XG4gICAgICAgICAgICAgICAgc3BlYy5pc0xpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGlmIChzZWVrUG9zaXRpb25fc2VjICYmIHR5cGVvZiBzZWVrUG9zaXRpb25fc2VjID09PSAnbnVtYmVyJyAmJiBzZWVrUG9zaXRpb25fc2VjID49IDApXG4gICAgICAgICAgICAgICAgZGFzaC5zZWVrKHNlZWtQb3NpdGlvbl9zZWMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoYXQucGxheSA9IChtdXRlZFBsYXkpID0+IHtcblxuICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgaWYgKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORyB8fCB0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BBVVNFRCkge1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlzRGFzaE1ldGFMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkYXNoLmF0dGFjaFZpZXcoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0Rhc2ggY2FuIGluZmluaXRlIGxvYWRpbmcgd2hlbiBwbGF5ZXIgaXMgaW4gYSBwYXVzZWQgc3RhdGUgZm9yIGEgbG9uZyB0aW1lLlxuICAgICAgICAgICAgLy9UaGVuIGRhc2ggYWx3YXlzIGhhdmUgdG8gcmVsb2FkKGF0dGFjaFZpZXcpIGFuZCB3YWl0IGZvciBNZXRhTG9hZGVkIGV2ZW50IHdoZW4gcmVzdW1lLlxuICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrRGFzaE1ldGFMb2FkZWQoKSB7XG4gICAgICAgICAgICAgICAgcmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgICAgIGlmIChpc0Rhc2hNZXRhTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyUGxheV9mdW5jKG11dGVkUGxheSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0cnlDb3VudCA8IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0Rhc2hNZXRhTG9hZGVkLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBxdWFsaXR5SW5kZXg7XG4gICAgICAgICAgICBpZiAoY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCkpIHtcbiAgICAgICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGFzaC5zZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiwgcXVhbGl0eUluZGV4KTtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgZGFzaC5yZXNldCgpO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG5cbiAgICAgICAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgJiYgZXJyb3IuY29kZSA9PT0gSU5JVF9EQVNIX1VOU1VQUE9SVCkge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW0lOSVRfREFTSF9OT1RGT1VORF07XG4gICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIHRocm93IHRlbXBFcnJvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBEYXNoO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDE0Li5cbiAqL1xuXG5jb25zdCBzaXplSHVtYW5pemVyID0gZnVuY3Rpb24gKGJ5dGVzLCBzaSwgcG9zdHBpeCkge1xuICAgIGxldCB0aHJlc2ggPSBzaSA/IDEwMDAgOiAxMDI0O1xuICAgIGlmKE1hdGguYWJzKGJ5dGVzKSA8IHRocmVzaCkge1xuICAgICAgICByZXR1cm4gYnl0ZXMgKyAnIEInO1xuICAgIH1cbiAgICBsZXQgdW5pdCA9IHBvc3RwaXh8fFwiQlwiO1xuICAgIGxldCB1bml0cyA9IFsnaycrdW5pdCwnTScrdW5pdCwnRycrdW5pdCwnVCcrdW5pdCwnUCcrdW5pdCwnRScrdW5pdCwnWicrdW5pdCwnWScrdW5pdF07XG4gICAgICAgLy8gPyBbJ2tCJywnTUInLCdHQicsJ1RCJywnUEInLCdFQicsJ1pCJywnWUInXTogWydLaUInLCdNaUInLCdHaUInLCdUaUInLCdQaUInLCdFaUInLCdaaUInLCdZaUInXTtcbiAgICBsZXQgdSA9IC0xO1xuICAgIGRvIHtcbiAgICAgICAgYnl0ZXMgLz0gdGhyZXNoO1xuICAgICAgICArK3U7XG4gICAgfSB3aGlsZShNYXRoLmFicyhieXRlcykgPj0gdGhyZXNoICYmIHUgPCB1bml0cy5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gYnl0ZXMudG9GaXhlZCgxKSt1bml0c1t1XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2l6ZUh1bWFuaXplcjsiXSwic291cmNlUm9vdCI6IiJ9