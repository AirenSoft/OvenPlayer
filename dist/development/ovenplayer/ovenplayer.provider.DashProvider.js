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

            that.trigger(_constants.DASH_PREPARED, dash);

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

            if (seekPosition_sec && !spec.isLive) {
                dash.seek(seekPosition_sec);
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

            if (dash.destroy) {

                dash.destroy();
            } else {

                dash.reset();
            }

            dash = null;
            that.trigger(_constants.DASH_DESTROYED);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwiaXNEYXNoTWV0YUxvYWRlZCIsInByZXZMTExpdmVEdXJhdGlvbiIsImxvYWRSZXRyeWVyIiwic291cmNlT2ZGaWxlIiwicnVuZWRBdXRvU3RhcnQiLCJkYXNoanMiLCJWZXJzaW9uIiwiRVJST1JTIiwiY29kZXMiLCJJTklUX0RBU0hfVU5TVVBQT1JUIiwiY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiaXNBdXRvIiwidXBkYXRlU2V0dGluZ3MiLCJzdHJlYW1pbmciLCJhYnIiLCJhdXRvU3dpdGNoQml0cmF0ZSIsInZpZGVvIiwic2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJyZXN1bHQiLCJnZXRTZXR0aW5ncyIsImdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwibGl2ZURlbGF5UmVkdWNpbmdDYWxsYmFjayIsImR1cmF0aW9uIiwiZHZySW5mbyIsImdldERhc2hNZXRyaWNzIiwiZ2V0Q3VycmVudERWUkluZm8iLCJsaXZlRGVsYXkiLCJnZXRDb25maWciLCJsb3dMYXRlbmN5TXBkTGl2ZURlbGF5Iiwic2VlayIsInJhbmdlIiwiZW5kIiwic3RhcnQiLCJNZWRpYVBsYXllciIsImNyZWF0ZSIsImluaXRpYWxpemUiLCJ3aW5kb3ciLCJvcF9kYXNoIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9EQVNIIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ0cmlnZ2VyIiwiREFTSF9QUkVQQVJFRCIsImZpbGUiLCJvZmYiLCJldmVudHMiLCJQTEFZQkFDS19QTEFZSU5HIiwibG93TGF0ZW5jeSIsImxvd0xhdGVuY3lFbmFibGVkIiwic2V0TG93TGF0ZW5jeUVuYWJsZWQiLCJzZXRMaXZlRGVsYXkiLCJvbiIsInVuZGVmaW5lZCIsImRlYnVnIiwibG9nTGV2ZWwiLCJEZWJ1ZyIsIkxPR19MRVZFTF9OT05FIiwicmV0cnlBdHRlbXB0cyIsIk1QRCIsImdldERlYnVnIiwic2V0TG9nVG9Ccm93c2VyQ29uc29sZSIsImF0dGFjaFNvdXJjZSIsImxvYWRpbmdSZXRyeUNvdW50IiwiRVJST1IiLCJlcnJvciIsImNvZGUiLCJlcnJvcnMiLCJET1dOTE9BRF9FUlJPUl9JRF9NQU5JRkVTVF9DT0RFIiwiTUFOSUZFU1RfTE9BREVSX0xPQURJTkdfRkFJTFVSRV9FUlJPUl9DT0RFIiwic2V0U3RhdGUiLCJTVEFURV9MT0FESU5HIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInRlbXBFcnJvciIsIlBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IiLCJRVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQiLCJldmVudCIsIm1lZGlhVHlwZSIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsInR5cGUiLCJRVUFMSVRZX0NIQU5HRV9SRU5ERVJFRCIsIm5ld1F1YWxpdHkiLCJQTEFZQkFDS19NRVRBREFUQV9MT0FERUQiLCJnZXRRdWFsaXR5Rm9yIiwiZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yIiwic3ViUXVhbGl0eUxpc3QiLCJpIiwibGVuZ3RoIiwiXyIsImZpbmRXaGVyZSIsImJpdHJhdGUiLCJoZWlnaHQiLCJ3aWR0aCIsInB1c2giLCJpbmRleCIsInF1YWxpdHlJbmRleCIsImxhYmVsIiwiaXNEeW5hbWljIiwiaXNBdXRvU3RhcnQiLCJwbGF5IiwibXV0ZWRQbGF5IiwicmV0cnlDb3VudCIsImdldFN0YXRlIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsImF0dGFjaFZpZXciLCJjaGVja0Rhc2hNZXRhTG9hZGVkIiwic2V0Q3VycmVudFF1YWxpdHkiLCJTVEFURV9QTEFZSU5HIiwic2V0UXVhbGl0eUZvciIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImRlc3Ryb3kiLCJyZXNldCIsIkRBU0hfREVTVFJPWUVEIiwiSU5JVF9EQVNIX05PVEZPVU5EIiwic2l6ZUh1bWFuaXplciIsImJ5dGVzIiwic2kiLCJwb3N0cGl4IiwidGhyZXNoIiwiTWF0aCIsImFicyIsInVuaXQiLCJ1bml0cyIsInUiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFjQTs7OztBQUNBOzs7O0FBRUE7Ozs7O0FBdkJBOzs7QUE0QkEsSUFBTUEsWUFBWTtBQUNkQyxjQUFVLFVBREk7QUFFZEMsbUJBQWU7QUFGRCxDQUFsQjtBQUlBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFVQyxPQUFWLEVBQW1CQyxZQUFuQixFQUFpQ0MsUUFBakMsRUFBMkM7O0FBRXBELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLHFCQUFxQixJQUF6QjtBQUNBLFFBQUlDLGNBQWMsSUFBbEI7QUFDQSxRQUFJQyxlQUFlLEVBQW5C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WXJGLGtCQUFPQyxLQUFQLENBQWE4SCw2QkFBYixDQUFoQjtBQUNBMUMsc0JBQVVULEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0Esa0JBQU1TLFNBQU47QUFDSDtBQUNKOztBQUVELFdBQU9qRyxJQUFQO0FBQ0gsQ0F6VkQ7O3FCQTRWZUosSTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1WGY7Ozs7QUFJQSxJQUFNZ0osZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFVQyxLQUFWLEVBQWlCQyxFQUFqQixFQUFxQkMsT0FBckIsRUFBOEI7QUFDaEQsUUFBSUMsU0FBU0YsS0FBSyxJQUFMLEdBQVksSUFBekI7QUFDQSxRQUFHRyxLQUFLQyxHQUFMLENBQVNMLEtBQVQsSUFBa0JHLE1BQXJCLEVBQTZCO0FBQ3pCLGVBQU9ILFFBQVEsSUFBZjtBQUNIO0FBQ0QsUUFBSU0sT0FBT0osV0FBUyxHQUFwQjtBQUNBLFFBQUlLLFFBQVEsQ0FBQyxNQUFJRCxJQUFMLEVBQVUsTUFBSUEsSUFBZCxFQUFtQixNQUFJQSxJQUF2QixFQUE0QixNQUFJQSxJQUFoQyxFQUFxQyxNQUFJQSxJQUF6QyxFQUE4QyxNQUFJQSxJQUFsRCxFQUF1RCxNQUFJQSxJQUEzRCxFQUFnRSxNQUFJQSxJQUFwRSxDQUFaO0FBQ0c7QUFDSCxRQUFJRSxJQUFJLENBQUMsQ0FBVDtBQUNBLE9BQUc7QUFDQ1IsaUJBQVNHLE1BQVQ7QUFDQSxVQUFFSyxDQUFGO0FBQ0gsS0FIRCxRQUdRSixLQUFLQyxHQUFMLENBQVNMLEtBQVQsS0FBbUJHLE1BQW5CLElBQTZCSyxJQUFJRCxNQUFNckMsTUFBTixHQUFlLENBSHhEO0FBSUEsV0FBTzhCLE1BQU1TLE9BQU4sQ0FBYyxDQUFkLElBQWlCRixNQUFNQyxDQUFOLENBQXhCO0FBQ0gsQ0FkRDs7cUJBZ0JlVCxhIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAxNC4uXHJcbiAqL1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQgc2l6ZUh1bWFuaXplciBmcm9tIFwidXRpbHMvc2l6ZUh1bWFuaXplclwiO1xyXG5pbXBvcnQge1xyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxyXG4gICAgU1RBVEVfQURfUEFVU0VELFxyXG4gICAgSU5JVF9EQVNIX1VOU1VQUE9SVCxcclxuICAgIElOSVRfREFTSF9OT1RGT1VORCxcclxuICAgIEVSUk9SUyxcclxuICAgIFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IsXHJcbiAgICBDT05URU5UX0xFVkVMX0NIQU5HRUQsXHJcbiAgICBQUk9WSURFUl9EQVNILFxyXG4gICAgREFTSF9QUkVQQVJFRCxcclxuICAgIERBU0hfREVTVFJPWUVEXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuaW1wb3J0IHtTVEFURV9MT0FESU5HfSBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgZGFzaGpzIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXHJcbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cclxuICogKi9cclxuY29uc3QgREFTSEVSUk9SID0ge1xyXG4gICAgRE9XTkxPQUQ6IFwiZG93bmxvYWRcIixcclxuICAgIE1BTklGRVNURVJST1I6IFwibWFuaWZlc3RFcnJvclwiXHJcbn07XHJcbmNvbnN0IERhc2ggPSBmdW5jdGlvbiAoZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCkge1xyXG5cclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgZGFzaCA9IG51bGw7XHJcbiAgICBsZXQgc3VwZXJQbGF5X2Z1bmMgPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcclxuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcclxuICAgIGxldCBpc0Rhc2hNZXRhTG9hZGVkID0gZmFsc2U7XHJcbiAgICBsZXQgcHJldkxMTGl2ZUR1cmF0aW9uID0gbnVsbDtcclxuICAgIGxldCBsb2FkUmV0cnllciA9IG51bGw7XHJcbiAgICBsZXQgc291cmNlT2ZGaWxlID0gXCJcIjtcclxuICAgIGxldCBydW5lZEF1dG9TdGFydCA9IGZhbHNlO1xyXG5cclxuICAgIHRyeSB7XHJcblxyXG4gICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA8IFwiMi42LjVcIikge1xyXG4gICAgICAgICAgICB0aHJvdyBFUlJPUlMuY29kZXNbSU5JVF9EQVNIX1VOU1VQUE9SVF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IgPSBmdW5jdGlvbiAoaXNBdXRvKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xyXG4gICAgICAgICAgICAgICAgZGFzaC51cGRhdGVTZXR0aW5ncyh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFicjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b1N3aXRjaEJpdHJhdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlbzogaXNBdXRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXNoanMuVmVyc2lvbiA+IFwiMi45LjBcIikge1xyXG4gICAgICAgICAgICAgICAgZGFzaC5zZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihcInZpZGVvXCIsIGlzQXV0byk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKGlzQXV0byk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0U2V0dGluZ3MoKS5zdHJlYW1pbmcuYWJyLmF1dG9Td2l0Y2hCaXRyYXRlLnZpZGVvO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhc2hqcy5WZXJzaW9uID4gXCIyLjkuMFwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkYXNoLmdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKFwidmlkZW9cIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkYXNoLmdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBsaXZlRGVsYXlSZWR1Y2luZ0NhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhc2guZHVyYXRpb24oKSAhPT0gcHJldkxMTGl2ZUR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2TExMaXZlRHVyYXRpb24gPSBkYXNoLmR1cmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGR2ckluZm8gPSBkYXNoLmdldERhc2hNZXRyaWNzKCkuZ2V0Q3VycmVudERWUkluZm8oKTtcclxuICAgICAgICAgICAgICAgIGxldCBsaXZlRGVsYXkgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWxpdmVEZWxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpdmVEZWxheSA9IDM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGFzaC5zZWVrKGR2ckluZm8ucmFuZ2UuZW5kIC0gZHZySW5mby5yYW5nZS5zdGFydCAtIGxpdmVEZWxheSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBkYXNoID0gZGFzaGpzLk1lZGlhUGxheWVyKCkuY3JlYXRlKCk7XHJcbiAgICAgICAgZGFzaC5pbml0aWFsaXplKGVsZW1lbnQsIG51bGwsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgd2luZG93Lm9wX2Rhc2ggPSBkYXNoO1xyXG5cclxuICAgICAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICAgICAgbmFtZTogUFJPVklERVJfREFTSCxcclxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgICAgICAgbXNlOiBkYXNoLFxyXG4gICAgICAgICAgICBsaXN0ZW5lcjogbnVsbCxcclxuICAgICAgICAgICAgaXNMb2FkZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjYW5TZWVrOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNMaXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgc2Vla2luZzogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0YXRlOiBTVEFURV9JRExFLFxyXG4gICAgICAgICAgICBidWZmZXI6IDAsXHJcbiAgICAgICAgICAgIGZyYW1lcmF0ZTogMCxcclxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IC0xLFxyXG4gICAgICAgICAgICBjdXJyZW50U291cmNlOiAtMSxcclxuICAgICAgICAgICAgcXVhbGl0eUxldmVsczogW10sXHJcbiAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxyXG4gICAgICAgICAgICBhZFRhZ1VybDogYWRUYWdVcmxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBmdW5jdGlvbiAoc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogQXR0YWNoIEZpbGUgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIiArIGxhc3RQbGF5UG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKERBU0hfUFJFUEFSRUQsIGRhc2gpO1xyXG5cclxuICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKHRydWUpO1xyXG4gICAgICAgICAgICBzb3VyY2VPZkZpbGUgPSBzb3VyY2UuZmlsZTtcclxuXHJcbiAgICAgICAgICAgIGRhc2gub2ZmKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUExBWUJBQ0tfUExBWUlORywgbGl2ZURlbGF5UmVkdWNpbmdDYWxsYmFjayk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc291cmNlLmxvd0xhdGVuY3kgPT09IHRydWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwcmV2TExMaXZlRHVyYXRpb24gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd0xhdGVuY3lFbmFibGVkOiBzb3VyY2UubG93TGF0ZW5jeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGFzaC5zZXRMb3dMYXRlbmN5RW5hYmxlZChzb3VyY2UubG93TGF0ZW5jeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5ICYmIHR5cGVvZihwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheSkgPT09ICdudW1iZXInKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdmVEZWxheTogcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGFzaC5zZXRMaXZlRGVsYXkocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUExBWUJBQ0tfUExBWUlORywgbGl2ZURlbGF5UmVkdWNpbmdDYWxsYmFjayk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd0xhdGVuY3lFbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdmVEZWxheTogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExvd0xhdGVuY3lFbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExpdmVEZWxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Zzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dMZXZlbDogZGFzaGpzLkRlYnVnLkxPR19MRVZFTF9OT05FXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlBdHRlbXB0czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTVBEOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZGFzaC5nZXREZWJ1ZygpLnNldExvZ1RvQnJvd3NlckNvbnNvbGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXNoLmF0dGFjaFNvdXJjZShzb3VyY2VPZkZpbGUpO1xyXG5cclxuICAgICAgICAgICAgc2Vla1Bvc2l0aW9uX3NlYyA9IGxhc3RQbGF5UG9zaXRpb247XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzdXBlclBsYXlfZnVuYyA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcclxuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIFBST1ZJREVSIExPQURFRC5cIik7XHJcblxyXG4gICAgICAgIGxldCBsb2FkaW5nUmV0cnlDb3VudCA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb2FkaW5nUmV0cnlDb3VudDtcclxuXHJcbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLkVSUk9SLCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEhhbmRsZSBtcGQgbG9hZCBlcnJvci5cclxuICAgICAgICAgICAgaWYgKGVycm9yICYmXHJcbiAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IuZXJyb3IuY29kZSA9PT0gZGFzaGpzLk1lZGlhUGxheWVyLmVycm9ycy5ET1dOTE9BRF9FUlJPUl9JRF9NQU5JRkVTVF9DT0RFIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IuZXJyb3IuY29kZSA9PT0gZGFzaGpzLk1lZGlhUGxheWVyLmVycm9ycy5NQU5JRkVTVF9MT0FERVJfTE9BRElOR19GQUlMVVJFX0VSUk9SX0NPREVcclxuICAgICAgICAgICAgICAgICkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobG9hZGluZ1JldHJ5Q291bnQgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfTE9BRElORyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkUmV0cnllcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFJldHJ5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nUmV0cnlDb3VudCA9IGxvYWRpbmdSZXRyeUNvdW50IC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZFJldHJ5ZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXNoLmF0dGFjaFNvdXJjZShzb3VyY2VPZkZpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvclRyaWdnZXIodGVtcEVycm9yLCB0aGF0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVRVUVTVEVELCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50Lm1lZGlhVHlwZSAmJiBldmVudC5tZWRpYVR5cGUgPT09IFwidmlkZW9cIikge1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCksXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IHNwZWMuY3VycmVudFF1YWxpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZXF1ZXN0XCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVELCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50Lm1lZGlhVHlwZSAmJiBldmVudC5tZWRpYVR5cGUgPT09IFwidmlkZW9cIikge1xyXG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGV2ZW50Lm5ld1F1YWxpdHk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNBdXRvOiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogZXZlbnQubmV3UXVhbGl0eSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlbmRlclwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUExBWUJBQ0tfTUVUQURBVEFfTE9BREVELCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQTEFZQkFDS19NRVRBREFUQV9MT0FERUQgIDogXCIsIGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJylbZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIildKTtcclxuXHJcbiAgICAgICAgICAgIGlzRGFzaE1ldGFMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgc3ViUXVhbGl0eUxpc3QgPSBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKTtcclxuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YlF1YWxpdHlMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV8uZmluZFdoZXJlKHNwZWMucXVhbGl0eUxldmVscywge2JpdHJhdGU6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LCB3aWR0aDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGh9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwZWMucXVhbGl0eUxldmVscy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYml0cmF0ZTogc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHN1YlF1YWxpdHlMaXN0W2ldLnF1YWxpdHlJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoICsgXCJ4XCIgKyBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQgKyBcIiwgXCIgKyBzaXplSHVtYW5pemVyKHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsIHRydWUsIFwiYnBzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXNoLmlzRHluYW1pYygpKSB7XHJcbiAgICAgICAgICAgICAgICBzcGVjLmlzTGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzZWVrUG9zaXRpb25fc2VjICYmICFzcGVjLmlzTGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgZGFzaC5zZWVrKHNlZWtQb3NpdGlvbl9zZWMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkgJiYgIXJ1bmVkQXV0b1N0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogQVVUT1BMQVkoKSFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIHJ1bmVkQXV0b1N0YXJ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhhdC5wbGF5ID0gKG11dGVkUGxheSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QTEFZSU5HIHx8IHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUEFVU0VEKSB7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXNEYXNoTWV0YUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZGFzaC5hdHRhY2hWaWV3KGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vRGFzaCBjYW4gaW5maW5pdGUgbG9hZGluZyB3aGVuIHBsYXllciBpcyBpbiBhIHBhdXNlZCBzdGF0ZSBmb3IgYSBsb25nIHRpbWUuXHJcbiAgICAgICAgICAgIC8vVGhlbiBkYXNoIGFsd2F5cyBoYXZlIHRvIHJlbG9hZChhdHRhY2hWaWV3KSBhbmQgd2FpdCBmb3IgTWV0YUxvYWRlZCBldmVudCB3aGVuIHJlc3VtZS5cclxuICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrRGFzaE1ldGFMb2FkZWQoKSB7XHJcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXNoTWV0YUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyUGxheV9mdW5jKG11dGVkUGxheSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0cnlDb3VudCA8IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRGFzaE1ldGFMb2FkZWQsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gcXVhbGl0eUluZGV4O1xyXG4gICAgICAgICAgICBpZiAoY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCkpIHtcclxuICAgICAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGFzaC5zZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiwgcXVhbGl0eUluZGV4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XHJcbiAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihpc0F1dG8pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhc2guZGVzdHJveSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhc2guZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhc2gucmVzZXQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGFzaCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihEQVNIX0RFU1RST1lFRCk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xyXG4gICAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG5cclxuICAgICAgICBpZiAoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBlcnJvci5jb2RlID09PSBJTklUX0RBU0hfVU5TVVBQT1JUKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9EQVNIX05PVEZPVU5EXTtcclxuICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgIHRocm93IHRlbXBFcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaDtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTQuLlxyXG4gKi9cclxuXHJcbmNvbnN0IHNpemVIdW1hbml6ZXIgPSBmdW5jdGlvbiAoYnl0ZXMsIHNpLCBwb3N0cGl4KSB7XHJcbiAgICBsZXQgdGhyZXNoID0gc2kgPyAxMDAwIDogMTAyNDtcclxuICAgIGlmKE1hdGguYWJzKGJ5dGVzKSA8IHRocmVzaCkge1xyXG4gICAgICAgIHJldHVybiBieXRlcyArICcgQic7XHJcbiAgICB9XHJcbiAgICBsZXQgdW5pdCA9IHBvc3RwaXh8fFwiQlwiO1xyXG4gICAgbGV0IHVuaXRzID0gWydrJyt1bml0LCdNJyt1bml0LCdHJyt1bml0LCdUJyt1bml0LCdQJyt1bml0LCdFJyt1bml0LCdaJyt1bml0LCdZJyt1bml0XTtcclxuICAgICAgIC8vID8gWydrQicsJ01CJywnR0InLCdUQicsJ1BCJywnRUInLCdaQicsJ1lCJ106IFsnS2lCJywnTWlCJywnR2lCJywnVGlCJywnUGlCJywnRWlCJywnWmlCJywnWWlCJ107XHJcbiAgICBsZXQgdSA9IC0xO1xyXG4gICAgZG8ge1xyXG4gICAgICAgIGJ5dGVzIC89IHRocmVzaDtcclxuICAgICAgICArK3U7XHJcbiAgICB9IHdoaWxlKE1hdGguYWJzKGJ5dGVzKSA+PSB0aHJlc2ggJiYgdSA8IHVuaXRzLmxlbmd0aCAtIDEpO1xyXG4gICAgcmV0dXJuIGJ5dGVzLnRvRml4ZWQoMSkrdW5pdHNbdV07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNpemVIdW1hbml6ZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==