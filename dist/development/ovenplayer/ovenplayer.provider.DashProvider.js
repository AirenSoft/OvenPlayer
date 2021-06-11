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

            if (that.getState() === _constants.STATE_AD_PLAYING || that.getState() === _constants.STATE_AD_PAUSED) {} else {

                superPlay_func(mutedPlay);
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwicHJldkxMTGl2ZUR1cmF0aW9uIiwibG9hZFJldHJ5ZXIiLCJzb3VyY2VPZkZpbGUiLCJydW5lZEF1dG9TdGFydCIsImRhc2hqcyIsIlZlcnNpb24iLCJFUlJPUlMiLCJjb2RlcyIsIklOSVRfREFTSF9VTlNVUFBPUlQiLCJjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJpc0F1dG8iLCJ1cGRhdGVTZXR0aW5ncyIsInN0cmVhbWluZyIsImFiciIsImF1dG9Td2l0Y2hCaXRyYXRlIiwidmlkZW8iLCJzZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsImNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsInJlc3VsdCIsImdldFNldHRpbmdzIiwiZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJsaXZlRGVsYXlSZWR1Y2luZ0NhbGxiYWNrIiwiZHVyYXRpb24iLCJkdnJJbmZvIiwiZ2V0RGFzaE1ldHJpY3MiLCJnZXRDdXJyZW50RFZSSW5mbyIsImxpdmVEZWxheSIsImdldENvbmZpZyIsImxvd0xhdGVuY3lNcGRMaXZlRGVsYXkiLCJzZWVrIiwicmFuZ2UiLCJlbmQiLCJzdGFydCIsIk1lZGlhUGxheWVyIiwiY3JlYXRlIiwiaW5pdGlhbGl6ZSIsIndpbmRvdyIsIm9wX2Rhc2giLCJzcGVjIiwibmFtZSIsIlBST1ZJREVSX0RBU0giLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsInRyaWdnZXIiLCJEQVNIX1BSRVBBUkVEIiwiZmlsZSIsIm9mZiIsImV2ZW50cyIsIlBMQVlCQUNLX1BMQVlJTkciLCJsb3dMYXRlbmN5IiwibG93TGF0ZW5jeUVuYWJsZWQiLCJzZXRMb3dMYXRlbmN5RW5hYmxlZCIsInNldExpdmVEZWxheSIsIm9uIiwidW5kZWZpbmVkIiwiZGVidWciLCJsb2dMZXZlbCIsIkRlYnVnIiwiTE9HX0xFVkVMX05PTkUiLCJyZXRyeUF0dGVtcHRzIiwiTVBEIiwiZ2V0RGVidWciLCJzZXRMb2dUb0Jyb3dzZXJDb25zb2xlIiwiYXR0YWNoU291cmNlIiwibG9hZGluZ1JldHJ5Q291bnQiLCJFUlJPUiIsImVycm9yIiwiY29kZSIsImVycm9ycyIsIkRPV05MT0FEX0VSUk9SX0lEX01BTklGRVNUX0NPREUiLCJNQU5JRkVTVF9MT0FERVJfTE9BRElOR19GQUlMVVJFX0VSUk9SX0NPREUiLCJzZXRTdGF0ZSIsIlNUQVRFX0xPQURJTkciLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwidGVtcEVycm9yIiwiUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUiIsIlFVQUxJVFlfQ0hBTkdFX1JFUVVFU1RFRCIsImV2ZW50IiwibWVkaWFUeXBlIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwidHlwZSIsIlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVEIiwibmV3UXVhbGl0eSIsIlBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCIsImdldFF1YWxpdHlGb3IiLCJnZXRCaXRyYXRlSW5mb0xpc3RGb3IiLCJzdWJRdWFsaXR5TGlzdCIsImkiLCJsZW5ndGgiLCJfIiwiZmluZFdoZXJlIiwiYml0cmF0ZSIsImhlaWdodCIsIndpZHRoIiwicHVzaCIsImluZGV4IiwicXVhbGl0eUluZGV4IiwibGFiZWwiLCJpc0R5bmFtaWMiLCJpc0F1dG9TdGFydCIsInBsYXkiLCJtdXRlZFBsYXkiLCJnZXRTdGF0ZSIsIlNUQVRFX0FEX1BMQVlJTkciLCJTVEFURV9BRF9QQVVTRUQiLCJzZXRDdXJyZW50UXVhbGl0eSIsIlNUQVRFX1BMQVlJTkciLCJzZXRRdWFsaXR5Rm9yIiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiZGVzdHJveSIsInJlc2V0IiwiREFTSF9ERVNUUk9ZRUQiLCJJTklUX0RBU0hfTk9URk9VTkQiLCJzaXplSHVtYW5pemVyIiwiYnl0ZXMiLCJzaSIsInBvc3RwaXgiLCJ0aHJlc2giLCJNYXRoIiwiYWJzIiwidW5pdCIsInVuaXRzIiwidSIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQWNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7QUF2QkE7OztBQTRCQSxJQUFNQSxZQUFZO0FBQ2RDLGNBQVUsVUFESTtBQUVkQyxtQkFBZTtBQUZELENBQWxCO0FBSUEsSUFBTUMsT0FBTyxTQUFQQSxJQUFPLENBQVVDLE9BQVYsRUFBbUJDLFlBQW5CLEVBQWlDQyxRQUFqQyxFQUEyQzs7QUFFcEQsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsT0FBTyxJQUFYO0FBQ0EsUUFBSUMsaUJBQWlCLElBQXJCO0FBQ0EsUUFBSUMsb0JBQW9CLElBQXhCO0FBQ0EsUUFBSUMsbUJBQW1CLENBQXZCO0FBQ0EsUUFBSUMscUJBQXFCLElBQXpCO0FBQ0EsUUFBSUMsY0FBYyxJQUFsQjtBQUNBLFFBQUlDLGVBQWUsRUFBbkI7QUFDQSxRQUFJQyxpQkFBaUIsS0FBckI7O0FBRUEsUUFBSTs7QUFFQSxZQUFJQyxPQUFPQyxPQUFQLEdBQWlCLE9BQXJCLEVBQThCO0FBQzFCLGtCQUFNQyxr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QUFJRCxJQUFMLEVBQVUsTUFBSUEsSUFBZCxFQUFtQixNQUFJQSxJQUF2QixFQUE0QixNQUFJQSxJQUFoQyxFQUFxQyxNQUFJQSxJQUF6QyxFQUE4QyxNQUFJQSxJQUFsRCxFQUF1RCxNQUFJQSxJQUEzRCxFQUFnRSxNQUFJQSxJQUFwRSxDQUFaO0FBQ0c7QUFDSCxRQUFJRSxJQUFJLENBQUMsQ0FBVDtBQUNBLE9BQUc7QUFDQ1IsaUJBQVNHLE1BQVQ7QUFDQSxVQUFFSyxDQUFGO0FBQ0gsS0FIRCxRQUdRSixLQUFLQyxHQUFMLENBQVNMLEtBQVQsS0FBbUJHLE1BQW5CLElBQTZCSyxJQUFJRCxNQUFNbEMsTUFBTixHQUFlLENBSHhEO0FBSUEsV0FBTzJCLE1BQU1TLE9BQU4sQ0FBYyxDQUFkLElBQWlCRixNQUFNQyxDQUFOLENBQXhCO0FBQ0gsQ0FkRDs7cUJBZ0JlVCxhIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAxNC4uXHJcbiAqL1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQgc2l6ZUh1bWFuaXplciBmcm9tIFwidXRpbHMvc2l6ZUh1bWFuaXplclwiO1xyXG5pbXBvcnQge1xyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxyXG4gICAgU1RBVEVfQURfUEFVU0VELFxyXG4gICAgSU5JVF9EQVNIX1VOU1VQUE9SVCxcclxuICAgIElOSVRfREFTSF9OT1RGT1VORCxcclxuICAgIEVSUk9SUyxcclxuICAgIFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IsXHJcbiAgICBDT05URU5UX0xFVkVMX0NIQU5HRUQsXHJcbiAgICBQUk9WSURFUl9EQVNILFxyXG4gICAgREFTSF9QUkVQQVJFRCxcclxuICAgIERBU0hfREVTVFJPWUVEXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuaW1wb3J0IHtTVEFURV9MT0FESU5HfSBmcm9tIFwiLi4vLi4vLi4vY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgZGFzaGpzIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXHJcbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cclxuICogKi9cclxuY29uc3QgREFTSEVSUk9SID0ge1xyXG4gICAgRE9XTkxPQUQ6IFwiZG93bmxvYWRcIixcclxuICAgIE1BTklGRVNURVJST1I6IFwibWFuaWZlc3RFcnJvclwiXHJcbn07XHJcbmNvbnN0IERhc2ggPSBmdW5jdGlvbiAoZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCkge1xyXG5cclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgZGFzaCA9IG51bGw7XHJcbiAgICBsZXQgc3VwZXJQbGF5X2Z1bmMgPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcclxuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcclxuICAgIGxldCBwcmV2TExMaXZlRHVyYXRpb24gPSBudWxsO1xyXG4gICAgbGV0IGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgIGxldCBzb3VyY2VPZkZpbGUgPSBcIlwiO1xyXG4gICAgbGV0IHJ1bmVkQXV0b1N0YXJ0ID0gZmFsc2U7XHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uIDwgXCIyLjYuNVwiKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVSUk9SUy5jb2Rlc1tJTklUX0RBU0hfVU5TVVBQT1JUXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvciA9IGZ1bmN0aW9uIChpc0F1dG8pIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XHJcbiAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWJyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvU3dpdGNoQml0cmF0ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvOiBpc0F1dG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhc2hqcy5WZXJzaW9uID4gXCIyLjkuMFwiKSB7XHJcbiAgICAgICAgICAgICAgICBkYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKFwidmlkZW9cIiwgaXNBdXRvKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRTZXR0aW5ncygpLnN0cmVhbWluZy5hYnIuYXV0b1N3aXRjaEJpdHJhdGUudmlkZW87XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGxpdmVEZWxheVJlZHVjaW5nQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGFzaC5kdXJhdGlvbigpICE9PSBwcmV2TExMaXZlRHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHByZXZMTExpdmVEdXJhdGlvbiA9IGRhc2guZHVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZHZySW5mbyA9IGRhc2guZ2V0RGFzaE1ldHJpY3MoKS5nZXRDdXJyZW50RFZSSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpdmVEZWxheSA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbGl2ZURlbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGl2ZURlbGF5ID0gMztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkYXNoLnNlZWsoZHZySW5mby5yYW5nZS5lbmQgLSBkdnJJbmZvLnJhbmdlLnN0YXJ0IC0gbGl2ZURlbGF5KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGRhc2ggPSBkYXNoanMuTWVkaWFQbGF5ZXIoKS5jcmVhdGUoKTtcclxuICAgICAgICBkYXNoLmluaXRpYWxpemUoZWxlbWVudCwgbnVsbCwgZmFsc2UpO1xyXG5cclxuICAgICAgICB3aW5kb3cub3BfZGFzaCA9IGRhc2g7XHJcblxyXG4gICAgICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBQUk9WSURFUl9EQVNILFxyXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICAgICAgICBtc2U6IGRhc2gsXHJcbiAgICAgICAgICAgIGxpc3RlbmVyOiBudWxsLFxyXG4gICAgICAgICAgICBpc0xvYWRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhblNlZWs6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0xpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWVraW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RhdGU6IFNUQVRFX0lETEUsXHJcbiAgICAgICAgICAgIGJ1ZmZlcjogMCxcclxuICAgICAgICAgICAgZnJhbWVyYXRlOiAwLFxyXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogLTEsXHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IC0xLFxyXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzOiBbXSxcclxuICAgICAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgICAgIGFkVGFnVXJsOiBhZFRhZ1VybFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uIChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBBdHRhY2ggRmlsZSA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiICsgbGFzdFBsYXlQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoREFTSF9QUkVQQVJFRCwgZGFzaCk7XHJcblxyXG4gICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IodHJ1ZSk7XHJcbiAgICAgICAgICAgIHNvdXJjZU9mRmlsZSA9IHNvdXJjZS5maWxlO1xyXG5cclxuICAgICAgICAgICAgZGFzaC5vZmYoZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5QTEFZQkFDS19QTEFZSU5HLCBsaXZlRGVsYXlSZWR1Y2luZ0NhbGxiYWNrKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzb3VyY2UubG93TGF0ZW5jeSA9PT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHByZXZMTExpdmVEdXJhdGlvbiA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGFzaC51cGRhdGVTZXR0aW5ncyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93TGF0ZW5jeUVuYWJsZWQ6IHNvdXJjZS5sb3dMYXRlbmN5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExvd0xhdGVuY3lFbmFibGVkKHNvdXJjZS5sb3dMYXRlbmN5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXkgJiYgdHlwZW9mKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5KSA9PT0gJ251bWJlcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl2ZURlbGF5OiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExpdmVEZWxheShwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5QTEFZQkFDS19QTEFZSU5HLCBsaXZlRGVsYXlSZWR1Y2luZ0NhbGxiYWNrKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGFzaC51cGRhdGVTZXR0aW5ncyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93TGF0ZW5jeUVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl2ZURlbGF5OiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2V0TG93TGF0ZW5jeUVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2V0TGl2ZURlbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ0xldmVsOiBkYXNoanMuRGVidWcuTE9HX0xFVkVMX05PTkVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUF0dGVtcHRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNUEQ6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXNoLmdldERlYnVnKCkuc2V0TG9nVG9Ccm93c2VyQ29uc29sZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhc2guYXR0YWNoU291cmNlKHNvdXJjZU9mRmlsZSk7XHJcblxyXG4gICAgICAgICAgICBzZWVrUG9zaXRpb25fc2VjID0gbGFzdFBsYXlQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN1cGVyUGxheV9mdW5jID0gdGhhdC5zdXBlcigncGxheScpO1xyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcbiAgICAgICAgbGV0IGxvYWRpbmdSZXRyeUNvdW50ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvYWRpbmdSZXRyeUNvdW50O1xyXG5cclxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuRVJST1IsIGZ1bmN0aW9uIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgLy8gSGFuZGxlIG1wZCBsb2FkIGVycm9yLlxyXG4gICAgICAgICAgICBpZiAoZXJyb3IgJiZcclxuICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICBlcnJvci5lcnJvci5jb2RlID09PSBkYXNoanMuTWVkaWFQbGF5ZXIuZXJyb3JzLkRPV05MT0FEX0VSUk9SX0lEX01BTklGRVNUX0NPREUgfHxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvci5lcnJvci5jb2RlID09PSBkYXNoanMuTWVkaWFQbGF5ZXIuZXJyb3JzLk1BTklGRVNUX0xPQURFUl9MT0FESU5HX0ZBSUxVUkVfRVJST1JfQ09ERVxyXG4gICAgICAgICAgICAgICAgKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsb2FkaW5nUmV0cnlDb3VudCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmdSZXRyeUNvdW50ID0gbG9hZGluZ1JldHJ5Q291bnQgLSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2guYXR0YWNoU291cmNlKHNvdXJjZU9mRmlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNBdXRvOiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogc3BlYy5jdXJyZW50UXVhbGl0eSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlcXVlc3RcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVOREVSRUQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKSB7XHJcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZXZlbnQubmV3UXVhbGl0eTtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMX0NIQU5HRUQsIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBldmVudC5uZXdRdWFsaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicmVuZGVyXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5QTEFZQkFDS19NRVRBREFUQV9MT0FERUQsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IFBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCAgOiBcIiwgZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKVtkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKV0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN1YlF1YWxpdHlMaXN0ID0gZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJRdWFsaXR5TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfLmZpbmRXaGVyZShzcGVjLnF1YWxpdHlMZXZlbHMsIHtiaXRyYXRlOiBzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCwgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRofSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGVjLnF1YWxpdHlMZXZlbHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpdHJhdGU6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBzdWJRdWFsaXR5TGlzdFtpXS5xdWFsaXR5SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCArIFwieFwiICsgc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0ICsgXCIsIFwiICsgc2l6ZUh1bWFuaXplcihzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCB0cnVlLCBcImJwc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGFzaC5pc0R5bmFtaWMoKSkge1xyXG4gICAgICAgICAgICAgICAgc3BlYy5pc0xpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc2Vla1Bvc2l0aW9uX3NlYyAmJiAhc3BlYy5pc0xpdmUpIHtcclxuICAgICAgICAgICAgICAgIGRhc2guc2VlayhzZWVrUG9zaXRpb25fc2VjKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpICYmICFydW5lZEF1dG9TdGFydCkge1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IEFVVE9QTEFZKCkhXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBydW5lZEF1dG9TdGFydCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoYXQucGxheSA9IChtdXRlZFBsYXkpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcgfHwgdGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QQVVTRUQpIHtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc3VwZXJQbGF5X2Z1bmMobXV0ZWRQbGF5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gcXVhbGl0eUluZGV4O1xyXG4gICAgICAgICAgICBpZiAoY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCkpIHtcclxuICAgICAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGFzaC5zZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiwgcXVhbGl0eUluZGV4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XHJcbiAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihpc0F1dG8pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhc2guZGVzdHJveSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhc2guZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhc2gucmVzZXQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGFzaCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihEQVNIX0RFU1RST1lFRCk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xyXG4gICAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG5cclxuICAgICAgICBpZiAoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBlcnJvci5jb2RlID09PSBJTklUX0RBU0hfVU5TVVBQT1JUKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9EQVNIX05PVEZPVU5EXTtcclxuICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgIHRocm93IHRlbXBFcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaDtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTQuLlxyXG4gKi9cclxuXHJcbmNvbnN0IHNpemVIdW1hbml6ZXIgPSBmdW5jdGlvbiAoYnl0ZXMsIHNpLCBwb3N0cGl4KSB7XHJcbiAgICBsZXQgdGhyZXNoID0gc2kgPyAxMDAwIDogMTAyNDtcclxuICAgIGlmKE1hdGguYWJzKGJ5dGVzKSA8IHRocmVzaCkge1xyXG4gICAgICAgIHJldHVybiBieXRlcyArICcgQic7XHJcbiAgICB9XHJcbiAgICBsZXQgdW5pdCA9IHBvc3RwaXh8fFwiQlwiO1xyXG4gICAgbGV0IHVuaXRzID0gWydrJyt1bml0LCdNJyt1bml0LCdHJyt1bml0LCdUJyt1bml0LCdQJyt1bml0LCdFJyt1bml0LCdaJyt1bml0LCdZJyt1bml0XTtcclxuICAgICAgIC8vID8gWydrQicsJ01CJywnR0InLCdUQicsJ1BCJywnRUInLCdaQicsJ1lCJ106IFsnS2lCJywnTWlCJywnR2lCJywnVGlCJywnUGlCJywnRWlCJywnWmlCJywnWWlCJ107XHJcbiAgICBsZXQgdSA9IC0xO1xyXG4gICAgZG8ge1xyXG4gICAgICAgIGJ5dGVzIC89IHRocmVzaDtcclxuICAgICAgICArK3U7XHJcbiAgICB9IHdoaWxlKE1hdGguYWJzKGJ5dGVzKSA+PSB0aHJlc2ggJiYgdSA8IHVuaXRzLmxlbmd0aCAtIDEpO1xyXG4gICAgcmV0dXJuIGJ5dGVzLnRvRml4ZWQoMSkrdW5pdHNbdV07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNpemVIdW1hbml6ZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==