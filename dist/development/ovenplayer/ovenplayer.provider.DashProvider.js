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
            dash.reset();
            dash.destroy();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwiaXNEYXNoTWV0YUxvYWRlZCIsInByZXZMTExpdmVEdXJhdGlvbiIsImxvYWRSZXRyeWVyIiwic291cmNlT2ZGaWxlIiwicnVuZWRBdXRvU3RhcnQiLCJkYXNoanMiLCJWZXJzaW9uIiwiRVJST1JTIiwiY29kZXMiLCJJTklUX0RBU0hfVU5TVVBQT1JUIiwiY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiaXNBdXRvIiwidXBkYXRlU2V0dGluZ3MiLCJzdHJlYW1pbmciLCJhYnIiLCJhdXRvU3dpdGNoQml0cmF0ZSIsInZpZGVvIiwic2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJyZXN1bHQiLCJnZXRTZXR0aW5ncyIsImdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwibGl2ZURlbGF5UmVkdWNpbmdDYWxsYmFjayIsImR1cmF0aW9uIiwiZHZySW5mbyIsImdldERhc2hNZXRyaWNzIiwiZ2V0Q3VycmVudERWUkluZm8iLCJsaXZlRGVsYXkiLCJnZXRDb25maWciLCJsb3dMYXRlbmN5TXBkTGl2ZURlbGF5Iiwic2VlayIsInJhbmdlIiwiZW5kIiwic3RhcnQiLCJNZWRpYVBsYXllciIsImNyZWF0ZSIsImluaXRpYWxpemUiLCJ3aW5kb3ciLCJvcF9kYXNoIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9EQVNIIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ0cmlnZ2VyIiwiREFTSF9QUkVQQVJFRCIsImZpbGUiLCJvZmYiLCJldmVudHMiLCJQTEFZQkFDS19QTEFZSU5HIiwibG93TGF0ZW5jeSIsImxvd0xhdGVuY3lFbmFibGVkIiwic2V0TG93TGF0ZW5jeUVuYWJsZWQiLCJzZXRMaXZlRGVsYXkiLCJvbiIsInVuZGVmaW5lZCIsImRlYnVnIiwibG9nTGV2ZWwiLCJEZWJ1ZyIsIkxPR19MRVZFTF9OT05FIiwicmV0cnlBdHRlbXB0cyIsIk1QRCIsImdldERlYnVnIiwic2V0TG9nVG9Ccm93c2VyQ29uc29sZSIsImF0dGFjaFNvdXJjZSIsImxvYWRpbmdSZXRyeUNvdW50IiwiRVJST1IiLCJlcnJvciIsImNvZGUiLCJlcnJvcnMiLCJET1dOTE9BRF9FUlJPUl9JRF9NQU5JRkVTVF9DT0RFIiwiTUFOSUZFU1RfTE9BREVSX0xPQURJTkdfRkFJTFVSRV9FUlJPUl9DT0RFIiwic2V0U3RhdGUiLCJTVEFURV9MT0FESU5HIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInRlbXBFcnJvciIsIlBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IiLCJRVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQiLCJldmVudCIsIm1lZGlhVHlwZSIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsInR5cGUiLCJRVUFMSVRZX0NIQU5HRV9SRU5ERVJFRCIsIm5ld1F1YWxpdHkiLCJQTEFZQkFDS19NRVRBREFUQV9MT0FERUQiLCJnZXRRdWFsaXR5Rm9yIiwiZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yIiwic3ViUXVhbGl0eUxpc3QiLCJpIiwibGVuZ3RoIiwiXyIsImZpbmRXaGVyZSIsImJpdHJhdGUiLCJoZWlnaHQiLCJ3aWR0aCIsInB1c2giLCJpbmRleCIsInF1YWxpdHlJbmRleCIsImxhYmVsIiwiaXNEeW5hbWljIiwiaXNBdXRvU3RhcnQiLCJwbGF5IiwibXV0ZWRQbGF5IiwicmV0cnlDb3VudCIsImdldFN0YXRlIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsImF0dGFjaFZpZXciLCJjaGVja0Rhc2hNZXRhTG9hZGVkIiwic2V0Q3VycmVudFF1YWxpdHkiLCJTVEFURV9QTEFZSU5HIiwic2V0UXVhbGl0eUZvciIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImRlc3Ryb3kiLCJyZXNldCIsIkRBU0hfREVTVFJPWUVEIiwiSU5JVF9EQVNIX05PVEZPVU5EIiwic2l6ZUh1bWFuaXplciIsImJ5dGVzIiwic2kiLCJwb3N0cGl4IiwidGhyZXNoIiwiTWF0aCIsImFicyIsInVuaXQiLCJ1bml0cyIsInUiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFjQTs7OztBQUNBOzs7O0FBRUE7Ozs7O0FBdkJBOzs7QUE0QkEsSUFBTUEsWUFBWTtBQUNkQyxjQUFVLFVBREk7QUFFZEMsbUJBQWU7QUFGRCxDQUFsQjtBQUlBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFVQyxPQUFWLEVBQW1CQyxZQUFuQixFQUFpQ0MsUUFBakMsRUFBMkM7O0FBRXBELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLHFCQUFxQixJQUF6QjtBQUNBLFFBQUlDLGNBQWMsSUFBbEI7QUFDQSxRQUFJQyxlQUFlLEVBQW5C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QUFrQkEsS0FBbEI7QUFDQSxrQkFBTVMsU0FBTjtBQUNIO0FBQ0o7O0FBRUQsV0FBT2pHLElBQVA7QUFDSCxDQWxWRDs7cUJBcVZlSixJOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JYZjs7OztBQUlBLElBQU1nSixnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQVVDLEtBQVYsRUFBaUJDLEVBQWpCLEVBQXFCQyxPQUFyQixFQUE4QjtBQUNoRCxRQUFJQyxTQUFTRixLQUFLLElBQUwsR0FBWSxJQUF6QjtBQUNBLFFBQUdHLEtBQUtDLEdBQUwsQ0FBU0wsS0FBVCxJQUFrQkcsTUFBckIsRUFBNkI7QUFDekIsZUFBT0gsUUFBUSxJQUFmO0FBQ0g7QUFDRCxRQUFJTSxPQUFPSixXQUFTLEdBQXBCO0FBQ0EsUUFBSUssUUFBUSxDQUFDLE1BQUlELElBQUwsRUFBVSxNQUFJQSxJQUFkLEVBQW1CLE1BQUlBLElBQXZCLEVBQTRCLE1BQUlBLElBQWhDLEVBQXFDLE1BQUlBLElBQXpDLEVBQThDLE1BQUlBLElBQWxELEVBQXVELE1BQUlBLElBQTNELEVBQWdFLE1BQUlBLElBQXBFLENBQVo7QUFDRztBQUNILFFBQUlFLElBQUksQ0FBQyxDQUFUO0FBQ0EsT0FBRztBQUNDUixpQkFBU0csTUFBVDtBQUNBLFVBQUVLLENBQUY7QUFDSCxLQUhELFFBR1FKLEtBQUtDLEdBQUwsQ0FBU0wsS0FBVCxLQUFtQkcsTUFBbkIsSUFBNkJLLElBQUlELE1BQU1yQyxNQUFOLEdBQWUsQ0FIeEQ7QUFJQSxXQUFPOEIsTUFBTVMsT0FBTixDQUFjLENBQWQsSUFBaUJGLE1BQU1DLENBQU4sQ0FBeEI7QUFDSCxDQWREOztxQkFnQmVULGEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDE0Li5cclxuICovXHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCBzaXplSHVtYW5pemVyIGZyb20gXCJ1dGlscy9zaXplSHVtYW5pemVyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBTVEFURV9JRExFLFxyXG4gICAgU1RBVEVfUExBWUlORyxcclxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXHJcbiAgICBTVEFURV9BRF9QQVVTRUQsXHJcbiAgICBJTklUX0RBU0hfVU5TVVBQT1JULFxyXG4gICAgSU5JVF9EQVNIX05PVEZPVU5ELFxyXG4gICAgRVJST1JTLFxyXG4gICAgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUixcclxuICAgIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCxcclxuICAgIFBST1ZJREVSX0RBU0gsXHJcbiAgICBEQVNIX1BSRVBBUkVELFxyXG4gICAgREFTSF9ERVNUUk9ZRURcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5pbXBvcnQge1NUQVRFX0xPQURJTkd9IGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBkYXNoanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cclxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5jb25zdCBEQVNIRVJST1IgPSB7XHJcbiAgICBET1dOTE9BRDogXCJkb3dubG9hZFwiLFxyXG4gICAgTUFOSUZFU1RFUlJPUjogXCJtYW5pZmVzdEVycm9yXCJcclxufTtcclxuY29uc3QgRGFzaCA9IGZ1bmN0aW9uIChlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKSB7XHJcblxyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIGxldCBkYXNoID0gbnVsbDtcclxuICAgIGxldCBzdXBlclBsYXlfZnVuYyA9IG51bGw7XHJcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xyXG4gICAgbGV0IHNlZWtQb3NpdGlvbl9zZWMgPSAwO1xyXG4gICAgbGV0IGlzRGFzaE1ldGFMb2FkZWQgPSBmYWxzZTtcclxuICAgIGxldCBwcmV2TExMaXZlRHVyYXRpb24gPSBudWxsO1xyXG4gICAgbGV0IGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgIGxldCBzb3VyY2VPZkZpbGUgPSBcIlwiO1xyXG4gICAgbGV0IHJ1bmVkQXV0b1N0YXJ0ID0gZmFsc2U7XHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uIDwgXCIyLjYuNVwiKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVSUk9SUy5jb2Rlc1tJTklUX0RBU0hfVU5TVVBQT1JUXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvciA9IGZ1bmN0aW9uIChpc0F1dG8pIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XHJcbiAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWJyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvU3dpdGNoQml0cmF0ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvOiBpc0F1dG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhc2hqcy5WZXJzaW9uID4gXCIyLjkuMFwiKSB7XHJcbiAgICAgICAgICAgICAgICBkYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKFwidmlkZW9cIiwgaXNBdXRvKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRTZXR0aW5ncygpLnN0cmVhbWluZy5hYnIuYXV0b1N3aXRjaEJpdHJhdGUudmlkZW87XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGxpdmVEZWxheVJlZHVjaW5nQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGFzaC5kdXJhdGlvbigpICE9PSBwcmV2TExMaXZlRHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHByZXZMTExpdmVEdXJhdGlvbiA9IGRhc2guZHVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZHZySW5mbyA9IGRhc2guZ2V0RGFzaE1ldHJpY3MoKS5nZXRDdXJyZW50RFZSSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpdmVEZWxheSA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbGl2ZURlbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGl2ZURlbGF5ID0gMztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkYXNoLnNlZWsoZHZySW5mby5yYW5nZS5lbmQgLSBkdnJJbmZvLnJhbmdlLnN0YXJ0IC0gbGl2ZURlbGF5KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGRhc2ggPSBkYXNoanMuTWVkaWFQbGF5ZXIoKS5jcmVhdGUoKTtcclxuICAgICAgICBkYXNoLmluaXRpYWxpemUoZWxlbWVudCwgbnVsbCwgZmFsc2UpO1xyXG5cclxuICAgICAgICB3aW5kb3cub3BfZGFzaCA9IGRhc2g7XHJcblxyXG4gICAgICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBQUk9WSURFUl9EQVNILFxyXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICAgICAgICBtc2U6IGRhc2gsXHJcbiAgICAgICAgICAgIGxpc3RlbmVyOiBudWxsLFxyXG4gICAgICAgICAgICBpc0xvYWRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhblNlZWs6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0xpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWVraW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RhdGU6IFNUQVRFX0lETEUsXHJcbiAgICAgICAgICAgIGJ1ZmZlcjogMCxcclxuICAgICAgICAgICAgZnJhbWVyYXRlOiAwLFxyXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogLTEsXHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IC0xLFxyXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzOiBbXSxcclxuICAgICAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgICAgIGFkVGFnVXJsOiBhZFRhZ1VybFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uIChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBBdHRhY2ggRmlsZSA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiICsgbGFzdFBsYXlQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoREFTSF9QUkVQQVJFRCwgZGFzaCk7XHJcblxyXG4gICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IodHJ1ZSk7XHJcbiAgICAgICAgICAgIHNvdXJjZU9mRmlsZSA9IHNvdXJjZS5maWxlO1xyXG5cclxuICAgICAgICAgICAgZGFzaC5vZmYoZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5QTEFZQkFDS19QTEFZSU5HLCBsaXZlRGVsYXlSZWR1Y2luZ0NhbGxiYWNrKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzb3VyY2UubG93TGF0ZW5jeSA9PT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHByZXZMTExpdmVEdXJhdGlvbiA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGFzaC51cGRhdGVTZXR0aW5ncyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93TGF0ZW5jeUVuYWJsZWQ6IHNvdXJjZS5sb3dMYXRlbmN5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExvd0xhdGVuY3lFbmFibGVkKHNvdXJjZS5sb3dMYXRlbmN5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXkgJiYgdHlwZW9mKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5KSA9PT0gJ251bWJlcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl2ZURlbGF5OiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExpdmVEZWxheShwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5QTEFZQkFDS19QTEFZSU5HLCBsaXZlRGVsYXlSZWR1Y2luZ0NhbGxiYWNrKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGFzaC51cGRhdGVTZXR0aW5ncyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93TGF0ZW5jeUVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl2ZURlbGF5OiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2V0TG93TGF0ZW5jeUVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2V0TGl2ZURlbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ0xldmVsOiBkYXNoanMuRGVidWcuTE9HX0xFVkVMX05PTkVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUF0dGVtcHRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNUEQ6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXNoLmdldERlYnVnKCkuc2V0TG9nVG9Ccm93c2VyQ29uc29sZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhc2guYXR0YWNoU291cmNlKHNvdXJjZU9mRmlsZSk7XHJcblxyXG4gICAgICAgICAgICBzZWVrUG9zaXRpb25fc2VjID0gbGFzdFBsYXlQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN1cGVyUGxheV9mdW5jID0gdGhhdC5zdXBlcigncGxheScpO1xyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcbiAgICAgICAgbGV0IGxvYWRpbmdSZXRyeUNvdW50ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvYWRpbmdSZXRyeUNvdW50O1xyXG5cclxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuRVJST1IsIGZ1bmN0aW9uIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgLy8gSGFuZGxlIG1wZCBsb2FkIGVycm9yLlxyXG4gICAgICAgICAgICBpZiAoZXJyb3IgJiZcclxuICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICBlcnJvci5lcnJvci5jb2RlID09PSBkYXNoanMuTWVkaWFQbGF5ZXIuZXJyb3JzLkRPV05MT0FEX0VSUk9SX0lEX01BTklGRVNUX0NPREUgfHxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvci5lcnJvci5jb2RlID09PSBkYXNoanMuTWVkaWFQbGF5ZXIuZXJyb3JzLk1BTklGRVNUX0xPQURFUl9MT0FESU5HX0ZBSUxVUkVfRVJST1JfQ09ERVxyXG4gICAgICAgICAgICAgICAgKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsb2FkaW5nUmV0cnlDb3VudCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmdSZXRyeUNvdW50ID0gbG9hZGluZ1JldHJ5Q291bnQgLSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2guYXR0YWNoU291cmNlKHNvdXJjZU9mRmlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNBdXRvOiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogc3BlYy5jdXJyZW50UXVhbGl0eSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlcXVlc3RcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVOREVSRUQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKSB7XHJcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZXZlbnQubmV3UXVhbGl0eTtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMX0NIQU5HRUQsIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBldmVudC5uZXdRdWFsaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicmVuZGVyXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5QTEFZQkFDS19NRVRBREFUQV9MT0FERUQsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IFBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCAgOiBcIiwgZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKVtkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKV0pO1xyXG5cclxuICAgICAgICAgICAgaXNEYXNoTWV0YUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBzdWJRdWFsaXR5TGlzdCA9IGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpO1xyXG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIik7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViUXVhbGl0eUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghXy5maW5kV2hlcmUoc3BlYy5xdWFsaXR5TGV2ZWxzLCB7Yml0cmF0ZTogc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSwgaGVpZ2h0OiBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQsIHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aH0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5xdWFsaXR5TGV2ZWxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiaXRyYXRlOiBzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogc3ViUXVhbGl0eUxpc3RbaV0ucXVhbGl0eUluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGggKyBcInhcIiArIHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCArIFwiLCBcIiArIHNpemVIdW1hbml6ZXIoc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSwgdHJ1ZSwgXCJicHNcIilcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhc2guaXNEeW5hbWljKCkpIHtcclxuICAgICAgICAgICAgICAgIHNwZWMuaXNMaXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNlZWtQb3NpdGlvbl9zZWMgJiYgIXNwZWMuaXNMaXZlKSB7XHJcbiAgICAgICAgICAgICAgICBkYXNoLnNlZWsoc2Vla1Bvc2l0aW9uX3NlYyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSAmJiAhcnVuZWRBdXRvU3RhcnQpIHtcclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBBVVRPUExBWSgpIVwiKTtcclxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgcnVuZWRBdXRvU3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGF0LnBsYXkgPSAobXV0ZWRQbGF5KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcgfHwgdGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QQVVTRUQpIHtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpc0Rhc2hNZXRhTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBkYXNoLmF0dGFjaFZpZXcoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9EYXNoIGNhbiBpbmZpbml0ZSBsb2FkaW5nIHdoZW4gcGxheWVyIGlzIGluIGEgcGF1c2VkIHN0YXRlIGZvciBhIGxvbmcgdGltZS5cclxuICAgICAgICAgICAgLy9UaGVuIGRhc2ggYWx3YXlzIGhhdmUgdG8gcmVsb2FkKGF0dGFjaFZpZXcpIGFuZCB3YWl0IGZvciBNZXRhTG9hZGVkIGV2ZW50IHdoZW4gcmVzdW1lLlxyXG4gICAgICAgICAgICAoZnVuY3Rpb24gY2hlY2tEYXNoTWV0YUxvYWRlZCgpIHtcclxuICAgICAgICAgICAgICAgIHJldHJ5Q291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmIChpc0Rhc2hNZXRhTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXJQbGF5X2Z1bmMobXV0ZWRQbGF5KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRyeUNvdW50IDwgMzAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tEYXNoTWV0YUxvYWRlZCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBxdWFsaXR5SW5kZXg7XHJcbiAgICAgICAgICAgIGlmIChjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKSkge1xyXG4gICAgICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXNoLnNldFF1YWxpdHlGb3IoXCJ2aWRlb1wiLCBxdWFsaXR5SW5kZXgpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcclxuICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKGlzQXV0byk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGRhc2gucmVzZXQoKTtcclxuICAgICAgICAgICAgZGFzaC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGRhc2ggPSBudWxsO1xyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoREFTSF9ERVNUUk9ZRUQpO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcclxuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgJiYgZXJyb3IuY29kZSA9PT0gSU5JVF9EQVNIX1VOU1VQUE9SVCkge1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW0lOSVRfREFTSF9OT1RGT1VORF07XHJcbiAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICB0aHJvdyB0ZW1wRXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2g7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDE0Li5cclxuICovXHJcblxyXG5jb25zdCBzaXplSHVtYW5pemVyID0gZnVuY3Rpb24gKGJ5dGVzLCBzaSwgcG9zdHBpeCkge1xyXG4gICAgbGV0IHRocmVzaCA9IHNpID8gMTAwMCA6IDEwMjQ7XHJcbiAgICBpZihNYXRoLmFicyhieXRlcykgPCB0aHJlc2gpIHtcclxuICAgICAgICByZXR1cm4gYnl0ZXMgKyAnIEInO1xyXG4gICAgfVxyXG4gICAgbGV0IHVuaXQgPSBwb3N0cGl4fHxcIkJcIjtcclxuICAgIGxldCB1bml0cyA9IFsnaycrdW5pdCwnTScrdW5pdCwnRycrdW5pdCwnVCcrdW5pdCwnUCcrdW5pdCwnRScrdW5pdCwnWicrdW5pdCwnWScrdW5pdF07XHJcbiAgICAgICAvLyA/IFsna0InLCdNQicsJ0dCJywnVEInLCdQQicsJ0VCJywnWkInLCdZQiddOiBbJ0tpQicsJ01pQicsJ0dpQicsJ1RpQicsJ1BpQicsJ0VpQicsJ1ppQicsJ1lpQiddO1xyXG4gICAgbGV0IHUgPSAtMTtcclxuICAgIGRvIHtcclxuICAgICAgICBieXRlcyAvPSB0aHJlc2g7XHJcbiAgICAgICAgKyt1O1xyXG4gICAgfSB3aGlsZShNYXRoLmFicyhieXRlcykgPj0gdGhyZXNoICYmIHUgPCB1bml0cy5sZW5ndGggLSAxKTtcclxuICAgIHJldHVybiBieXRlcy50b0ZpeGVkKDEpK3VuaXRzW3VdO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzaXplSHVtYW5pemVyOyJdLCJzb3VyY2VSb290IjoiIn0=