/*! OvenPlayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
    var runedAutoStart = false;

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
        dash.initialize(element, null, false);

        window.op_dash = dash;

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

            if (seekPosition_sec) {
                dash.seek(seekPosition_sec);
                if (!playerConfig.isAutoStart()) {
                    // that.play();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwiaXNEYXNoTWV0YUxvYWRlZCIsInByZXZMTExpdmVEdXJhdGlvbiIsImxvYWRSZXRyeWVyIiwic291cmNlT2ZGaWxlIiwicnVuZWRBdXRvU3RhcnQiLCJkYXNoanMiLCJWZXJzaW9uIiwiRVJST1JTIiwiY29kZXMiLCJJTklUX0RBU0hfVU5TVVBQT1JUIiwiY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiaXNBdXRvIiwidXBkYXRlU2V0dGluZ3MiLCJzdHJlYW1pbmciLCJhYnIiLCJhdXRvU3dpdGNoQml0cmF0ZSIsInZpZGVvIiwic2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJyZXN1bHQiLCJnZXRTZXR0aW5ncyIsImdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwibGl2ZURlbGF5UmVkdWNpbmdDYWxsYmFjayIsImR1cmF0aW9uIiwiZHZySW5mbyIsImdldERhc2hNZXRyaWNzIiwiZ2V0Q3VycmVudERWUkluZm8iLCJsaXZlRGVsYXkiLCJnZXRDb25maWciLCJsb3dMYXRlbmN5TXBkTGl2ZURlbGF5Iiwic2VlayIsInJhbmdlIiwiZW5kIiwic3RhcnQiLCJNZWRpYVBsYXllciIsImNyZWF0ZSIsImluaXRpYWxpemUiLCJ3aW5kb3ciLCJvcF9kYXNoIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9EQVNIIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJmaWxlIiwib2ZmIiwiZXZlbnRzIiwiUExBWUJBQ0tfUExBWUlORyIsImxvd0xhdGVuY3kiLCJsb3dMYXRlbmN5RW5hYmxlZCIsInNldExvd0xhdGVuY3lFbmFibGVkIiwic2V0TGl2ZURlbGF5Iiwib24iLCJ1bmRlZmluZWQiLCJkZWJ1ZyIsImxvZ0xldmVsIiwiRGVidWciLCJMT0dfTEVWRUxfTk9ORSIsInJldHJ5QXR0ZW1wdHMiLCJNUEQiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJhdHRhY2hTb3VyY2UiLCJsb2FkaW5nUmV0cnlDb3VudCIsIkVSUk9SIiwiZXJyb3IiLCJjb2RlIiwiZXJyb3JzIiwiRE9XTkxPQURfRVJST1JfSURfTUFOSUZFU1RfQ09ERSIsIk1BTklGRVNUX0xPQURFUl9MT0FESU5HX0ZBSUxVUkVfRVJST1JfQ09ERSIsInNldFN0YXRlIiwiU1RBVEVfTE9BRElORyIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ0ZW1wRXJyb3IiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUVVBTElUWV9DSEFOR0VfUkVRVUVTVEVEIiwiZXZlbnQiLCJtZWRpYVR5cGUiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwidHlwZSIsIlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVEIiwibmV3UXVhbGl0eSIsIlBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCIsImdldFF1YWxpdHlGb3IiLCJnZXRCaXRyYXRlSW5mb0xpc3RGb3IiLCJzdWJRdWFsaXR5TGlzdCIsImkiLCJsZW5ndGgiLCJfIiwiZmluZFdoZXJlIiwiYml0cmF0ZSIsImhlaWdodCIsIndpZHRoIiwicHVzaCIsImluZGV4IiwicXVhbGl0eUluZGV4IiwibGFiZWwiLCJpc0F1dG9TdGFydCIsImlzRHluYW1pYyIsInBsYXkiLCJtdXRlZFBsYXkiLCJyZXRyeUNvdW50IiwiZ2V0U3RhdGUiLCJTVEFURV9BRF9QTEFZSU5HIiwiU1RBVEVfQURfUEFVU0VEIiwiYXR0YWNoVmlldyIsImNoZWNrRGFzaE1ldGFMb2FkZWQiLCJzZXRDdXJyZW50UXVhbGl0eSIsIlNUQVRFX1BMQVlJTkciLCJzZXRRdWFsaXR5Rm9yIiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiZGVzdHJveSIsInJlc2V0IiwiSU5JVF9EQVNIX05PVEZPVU5EIiwic2l6ZUh1bWFuaXplciIsImJ5dGVzIiwic2kiLCJwb3N0cGl4IiwidGhyZXNoIiwiTWF0aCIsImFicyIsInVuaXQiLCJ1bml0cyIsInUiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFZQTs7OztBQUNBOzs7O0FBRUE7Ozs7O0FBckJBOzs7QUEwQkEsSUFBTUEsWUFBWTtBQUNkQyxjQUFVLFVBREk7QUFFZEMsbUJBQWU7QUFGRCxDQUFsQjtBQUlBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFVQyxPQUFWLEVBQW1CQyxZQUFuQixFQUFpQ0MsUUFBakMsRUFBMkM7O0FBRXBELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLHFCQUFxQixJQUF6QjtBQUNBLFFBQUlDLGNBQWMsSUFBbEI7QUFDQSxRQUFJQyxlQUFlLEVBQW5CO0FBQ0EsUUFBSUMsaUJBQWlCLEtBQXJCOztBQUVBLFFB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QyxzQkFBVVQsS0FBVixHQUFrQkEsS0FBbEI7QUFDQSxrQkFBTVMsU0FBTjtBQUNIO0FBQ0o7O0FBRUQsV0FBTy9GLElBQVA7QUFDSCxDQTNWRDs7cUJBOFZlSixJOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVYZjs7OztBQUlBLElBQU04SSxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQVVDLEtBQVYsRUFBaUJDLEVBQWpCLEVBQXFCQyxPQUFyQixFQUE4QjtBQUNoRCxRQUFJQyxTQUFTRixLQUFLLElBQUwsR0FBWSxJQUF6QjtBQUNBLFFBQUdHLEtBQUtDLEdBQUwsQ0FBU0wsS0FBVCxJQUFrQkcsTUFBckIsRUFBNkI7QUFDekIsZUFBT0gsUUFBUSxJQUFmO0FBQ0g7QUFDRCxRQUFJTSxPQUFPSixXQUFTLEdBQXBCO0FBQ0EsUUFBSUssUUFBUSxDQUFDLE1BQUlELElBQUwsRUFBVSxNQUFJQSxJQUFkLEVBQW1CLE1BQUlBLElBQXZCLEVBQTRCLE1BQUlBLElBQWhDLEVBQXFDLE1BQUlBLElBQXpDLEVBQThDLE1BQUlBLElBQWxELEVBQXVELE1BQUlBLElBQTNELEVBQWdFLE1BQUlBLElBQXBFLENBQVo7QUFDRztBQUNILFFBQUlFLElBQUksQ0FBQyxDQUFUO0FBQ0EsT0FBRztBQUNDUixpQkFBU0csTUFBVDtBQUNBLFVBQUVLLENBQUY7QUFDSCxLQUhELFFBR1FKLEtBQUtDLEdBQUwsQ0FBU0wsS0FBVCxLQUFtQkcsTUFBbkIsSUFBNkJLLElBQUlELE1BQU1wQyxNQUFOLEdBQWUsQ0FIeEQ7QUFJQSxXQUFPNkIsTUFBTVMsT0FBTixDQUFjLENBQWQsSUFBaUJGLE1BQU1DLENBQU4sQ0FBeEI7QUFDSCxDQWREOztxQkFnQmVULGEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDE0Li5cclxuICovXHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCBzaXplSHVtYW5pemVyIGZyb20gXCJ1dGlscy9zaXplSHVtYW5pemVyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBTVEFURV9JRExFLFxyXG4gICAgU1RBVEVfUExBWUlORyxcclxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXHJcbiAgICBTVEFURV9BRF9QQVVTRUQsXHJcbiAgICBJTklUX0RBU0hfVU5TVVBQT1JULFxyXG4gICAgSU5JVF9EQVNIX05PVEZPVU5ELFxyXG4gICAgRVJST1JTLFxyXG4gICAgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUixcclxuICAgIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCxcclxuICAgIFBST1ZJREVSX0RBU0hcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5pbXBvcnQge1NUQVRFX0xPQURJTkd9IGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBkYXNoanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cclxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5jb25zdCBEQVNIRVJST1IgPSB7XHJcbiAgICBET1dOTE9BRDogXCJkb3dubG9hZFwiLFxyXG4gICAgTUFOSUZFU1RFUlJPUjogXCJtYW5pZmVzdEVycm9yXCJcclxufTtcclxuY29uc3QgRGFzaCA9IGZ1bmN0aW9uIChlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKSB7XHJcblxyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIGxldCBkYXNoID0gbnVsbDtcclxuICAgIGxldCBzdXBlclBsYXlfZnVuYyA9IG51bGw7XHJcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xyXG4gICAgbGV0IHNlZWtQb3NpdGlvbl9zZWMgPSAwO1xyXG4gICAgbGV0IGlzRGFzaE1ldGFMb2FkZWQgPSBmYWxzZTtcclxuICAgIHZhciBwcmV2TExMaXZlRHVyYXRpb24gPSBudWxsO1xyXG4gICAgbGV0IGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgIGxldCBzb3VyY2VPZkZpbGUgPSBcIlwiO1xyXG4gICAgbGV0IHJ1bmVkQXV0b1N0YXJ0ID0gZmFsc2U7XHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uIDwgXCIyLjYuNVwiKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVSUk9SUy5jb2Rlc1tJTklUX0RBU0hfVU5TVVBQT1JUXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvciA9IGZ1bmN0aW9uIChpc0F1dG8pIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XHJcbiAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWJyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvU3dpdGNoQml0cmF0ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvOiBpc0F1dG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhc2hqcy5WZXJzaW9uID4gXCIyLjkuMFwiKSB7XHJcbiAgICAgICAgICAgICAgICBkYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKFwidmlkZW9cIiwgaXNBdXRvKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRTZXR0aW5ncygpLnN0cmVhbWluZy5hYnIuYXV0b1N3aXRjaEJpdHJhdGUudmlkZW87XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGxpdmVEZWxheVJlZHVjaW5nQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGFzaC5kdXJhdGlvbigpICE9PSBwcmV2TExMaXZlRHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHByZXZMTExpdmVEdXJhdGlvbiA9IGRhc2guZHVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZHZySW5mbyA9IGRhc2guZ2V0RGFzaE1ldHJpY3MoKS5nZXRDdXJyZW50RFZSSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpdmVEZWxheSA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbGl2ZURlbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGl2ZURlbGF5ID0gMztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkYXNoLnNlZWsoZHZySW5mby5yYW5nZS5lbmQgLSBkdnJJbmZvLnJhbmdlLnN0YXJ0IC0gbGl2ZURlbGF5KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGRhc2ggPSBkYXNoanMuTWVkaWFQbGF5ZXIoKS5jcmVhdGUoKTtcclxuICAgICAgICBkYXNoLmluaXRpYWxpemUoZWxlbWVudCwgbnVsbCwgZmFsc2UpO1xyXG5cclxuICAgICAgICB3aW5kb3cub3BfZGFzaCA9IGRhc2g7XHJcblxyXG4gICAgICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBQUk9WSURFUl9EQVNILFxyXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICAgICAgICBtc2U6IGRhc2gsXHJcbiAgICAgICAgICAgIGxpc3RlbmVyOiBudWxsLFxyXG4gICAgICAgICAgICBpc0xvYWRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhblNlZWs6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0xpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWVraW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RhdGU6IFNUQVRFX0lETEUsXHJcbiAgICAgICAgICAgIGJ1ZmZlcjogMCxcclxuICAgICAgICAgICAgZnJhbWVyYXRlOiAwLFxyXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogLTEsXHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IC0xLFxyXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzOiBbXSxcclxuICAgICAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgICAgIGFkVGFnVXJsOiBhZFRhZ1VybFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uIChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBBdHRhY2ggRmlsZSA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiICsgbGFzdFBsYXlQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IodHJ1ZSk7XHJcbiAgICAgICAgICAgIHNvdXJjZU9mRmlsZSA9IHNvdXJjZS5maWxlO1xyXG5cclxuICAgICAgICAgICAgZGFzaC5vZmYoZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5QTEFZQkFDS19QTEFZSU5HLCBsaXZlRGVsYXlSZWR1Y2luZ0NhbGxiYWNrKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzb3VyY2UubG93TGF0ZW5jeSA9PT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHByZXZMTExpdmVEdXJhdGlvbiA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGFzaC51cGRhdGVTZXR0aW5ncyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93TGF0ZW5jeUVuYWJsZWQ6IHNvdXJjZS5sb3dMYXRlbmN5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExvd0xhdGVuY3lFbmFibGVkKHNvdXJjZS5sb3dMYXRlbmN5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXkgJiYgdHlwZW9mKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5KSA9PT0gJ251bWJlcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl2ZURlbGF5OiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExpdmVEZWxheShwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5QTEFZQkFDS19QTEFZSU5HLCBsaXZlRGVsYXlSZWR1Y2luZ0NhbGxiYWNrKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGFzaC51cGRhdGVTZXR0aW5ncyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93TGF0ZW5jeUVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl2ZURlbGF5OiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2V0TG93TGF0ZW5jeUVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2V0TGl2ZURlbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ0xldmVsOiBkYXNoanMuRGVidWcuTE9HX0xFVkVMX05PTkVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUF0dGVtcHRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNUEQ6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXNoLmdldERlYnVnKCkuc2V0TG9nVG9Ccm93c2VyQ29uc29sZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhc2guYXR0YWNoU291cmNlKHNvdXJjZU9mRmlsZSk7XHJcblxyXG4gICAgICAgICAgICBzZWVrUG9zaXRpb25fc2VjID0gbGFzdFBsYXlQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN1cGVyUGxheV9mdW5jID0gdGhhdC5zdXBlcigncGxheScpO1xyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcbiAgICAgICAgbGV0IGxvYWRpbmdSZXRyeUNvdW50ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvYWRpbmdSZXRyeUNvdW50O1xyXG5cclxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuRVJST1IsIGZ1bmN0aW9uIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgLy8gSGFuZGxlIG1wZCBsb2FkIGVycm9yLlxyXG4gICAgICAgICAgICBpZiAoZXJyb3IgJiZcclxuICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICBlcnJvci5lcnJvci5jb2RlID09PSBkYXNoanMuTWVkaWFQbGF5ZXIuZXJyb3JzLkRPV05MT0FEX0VSUk9SX0lEX01BTklGRVNUX0NPREUgfHxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvci5lcnJvci5jb2RlID09PSBkYXNoanMuTWVkaWFQbGF5ZXIuZXJyb3JzLk1BTklGRVNUX0xPQURFUl9MT0FESU5HX0ZBSUxVUkVfRVJST1JfQ09ERVxyXG4gICAgICAgICAgICAgICAgKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsb2FkaW5nUmV0cnlDb3VudCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmdSZXRyeUNvdW50ID0gbG9hZGluZ1JldHJ5Q291bnQgLSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2guYXR0YWNoU291cmNlKHNvdXJjZU9mRmlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNBdXRvOiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogc3BlYy5jdXJyZW50UXVhbGl0eSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlcXVlc3RcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVOREVSRUQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKSB7XHJcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZXZlbnQubmV3UXVhbGl0eTtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMX0NIQU5HRUQsIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBldmVudC5uZXdRdWFsaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicmVuZGVyXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5QTEFZQkFDS19NRVRBREFUQV9MT0FERUQsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlBdHRlbXB0czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTVBEOiAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IFBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCAgOiBcIiwgZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKVtkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKV0pO1xyXG5cclxuICAgICAgICAgICAgaXNEYXNoTWV0YUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBzdWJRdWFsaXR5TGlzdCA9IGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpO1xyXG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIik7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViUXVhbGl0eUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghXy5maW5kV2hlcmUoc3BlYy5xdWFsaXR5TGV2ZWxzLCB7Yml0cmF0ZTogc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSwgaGVpZ2h0OiBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQsIHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aH0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5xdWFsaXR5TGV2ZWxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiaXRyYXRlOiBzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogc3ViUXVhbGl0eUxpc3RbaV0ucXVhbGl0eUluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGggKyBcInhcIiArIHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCArIFwiLCBcIiArIHNpemVIdW1hbml6ZXIoc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSwgdHJ1ZSwgXCJicHNcIilcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoc2Vla1Bvc2l0aW9uX3NlYyl7XHJcbiAgICAgICAgICAgICAgICBkYXNoLnNlZWsoc2Vla1Bvc2l0aW9uX3NlYyk7XHJcbiAgICAgICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGFzaC5pc0R5bmFtaWMoKSkge1xyXG4gICAgICAgICAgICAgICAgc3BlYy5pc0xpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSAmJiAhcnVuZWRBdXRvU3RhcnQpe1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IEFVVE9QTEFZKCkhXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBydW5lZEF1dG9TdGFydCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoYXQucGxheSA9IChtdXRlZFBsYXkpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcclxuICAgICAgICAgICAgaWYgKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORyB8fCB0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BBVVNFRCkge1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlzRGFzaE1ldGFMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRhc2guYXR0YWNoVmlldyhlbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL0Rhc2ggY2FuIGluZmluaXRlIGxvYWRpbmcgd2hlbiBwbGF5ZXIgaXMgaW4gYSBwYXVzZWQgc3RhdGUgZm9yIGEgbG9uZyB0aW1lLlxyXG4gICAgICAgICAgICAvL1RoZW4gZGFzaCBhbHdheXMgaGF2ZSB0byByZWxvYWQoYXR0YWNoVmlldykgYW5kIHdhaXQgZm9yIE1ldGFMb2FkZWQgZXZlbnQgd2hlbiByZXN1bWUuXHJcbiAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja0Rhc2hNZXRhTG9hZGVkKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0cnlDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRGFzaE1ldGFMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlclBsYXlfZnVuYyhtdXRlZFBsYXkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHJ5Q291bnQgPCAzMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0Rhc2hNZXRhTG9hZGVkLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoYXQuZ2V0U3RhdGUoKSAhPT0gU1RBVEVfUExBWUlORykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IHF1YWxpdHlJbmRleDtcclxuICAgICAgICAgICAgaWYgKGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpKSB7XHJcbiAgICAgICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhc2guc2V0UXVhbGl0eUZvcihcInZpZGVvXCIsIHF1YWxpdHlJbmRleCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xyXG4gICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcclxuICAgICAgICAgICAgZGFzaC5yZXNldCgpO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcclxuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgJiYgZXJyb3IuY29kZSA9PT0gSU5JVF9EQVNIX1VOU1VQUE9SVCkge1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW0lOSVRfREFTSF9OT1RGT1VORF07XHJcbiAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICB0aHJvdyB0ZW1wRXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2g7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDE0Li5cclxuICovXHJcblxyXG5jb25zdCBzaXplSHVtYW5pemVyID0gZnVuY3Rpb24gKGJ5dGVzLCBzaSwgcG9zdHBpeCkge1xyXG4gICAgbGV0IHRocmVzaCA9IHNpID8gMTAwMCA6IDEwMjQ7XHJcbiAgICBpZihNYXRoLmFicyhieXRlcykgPCB0aHJlc2gpIHtcclxuICAgICAgICByZXR1cm4gYnl0ZXMgKyAnIEInO1xyXG4gICAgfVxyXG4gICAgbGV0IHVuaXQgPSBwb3N0cGl4fHxcIkJcIjtcclxuICAgIGxldCB1bml0cyA9IFsnaycrdW5pdCwnTScrdW5pdCwnRycrdW5pdCwnVCcrdW5pdCwnUCcrdW5pdCwnRScrdW5pdCwnWicrdW5pdCwnWScrdW5pdF07XHJcbiAgICAgICAvLyA/IFsna0InLCdNQicsJ0dCJywnVEInLCdQQicsJ0VCJywnWkInLCdZQiddOiBbJ0tpQicsJ01pQicsJ0dpQicsJ1RpQicsJ1BpQicsJ0VpQicsJ1ppQicsJ1lpQiddO1xyXG4gICAgbGV0IHUgPSAtMTtcclxuICAgIGRvIHtcclxuICAgICAgICBieXRlcyAvPSB0aHJlc2g7XHJcbiAgICAgICAgKyt1O1xyXG4gICAgfSB3aGlsZShNYXRoLmFicyhieXRlcykgPj0gdGhyZXNoICYmIHUgPCB1bml0cy5sZW5ndGggLSAxKTtcclxuICAgIHJldHVybiBieXRlcy50b0ZpeGVkKDEpK3VuaXRzW3VdO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzaXplSHVtYW5pemVyOyJdLCJzb3VyY2VSb290IjoiIn0=