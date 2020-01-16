/*! OvenPlayerv0.9.850 | (c)2020 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

            if (error && (error.error === DASHERROR.DOWNLOAD || error.error === DASHERROR.MANIFESTERROR || error.error.code === 25)) {

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwiaXNEYXNoTWV0YUxvYWRlZCIsInByZXZMTExpdmVEdXJhdGlvbiIsInNvdXJjZU9mRmlsZSIsImRhc2hqcyIsIlZlcnNpb24iLCJFUlJPUlMiLCJjb2RlcyIsIklOSVRfREFTSF9VTlNVUFBPUlQiLCJjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJpc0F1dG8iLCJ1cGRhdGVTZXR0aW5ncyIsInN0cmVhbWluZyIsImFiciIsImF1dG9Td2l0Y2hCaXRyYXRlIiwidmlkZW8iLCJzZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsImNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsInJlc3VsdCIsImdldFNldHRpbmdzIiwiZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJsaXZlRGVsYXlSZWR1Y2luZ0NhbGxiYWNrIiwiZHVyYXRpb24iLCJkdnJJbmZvIiwiZ2V0RGFzaE1ldHJpY3MiLCJnZXRDdXJyZW50RFZSSW5mbyIsImxpdmVEZWxheSIsImdldENvbmZpZyIsImxvd0xhdGVuY3lNcGRMaXZlRGVsYXkiLCJzZWVrIiwicmFuZ2UiLCJlbmQiLCJzdGFydCIsIk1lZGlhUGxheWVyIiwiY3JlYXRlIiwiaW5pdGlhbGl6ZSIsImF1dG9TdGFydCIsIkRlYnVnIiwiTE9HX0xFVkVMX05PTkUiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJ3aW5kb3ciLCJzcGVjIiwibmFtZSIsIlBST1ZJREVSX0RBU0giLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImZpbGUiLCJvZmYiLCJldmVudHMiLCJQTEFZQkFDS19QTEFZSU5HIiwibG93TGF0ZW5jeSIsImxvd0xhdGVuY3lFbmFibGVkIiwic2V0TG93TGF0ZW5jeUVuYWJsZWQiLCJzZXRMaXZlRGVsYXkiLCJvbiIsInVuZGVmaW5lZCIsImF0dGFjaFNvdXJjZSIsIkVSUk9SIiwiZXJyb3IiLCJjb2RlIiwidGVtcEVycm9yIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlFVQUxJVFlfQ0hBTkdFX1JFUVVFU1RFRCIsImV2ZW50IiwibWVkaWFUeXBlIiwidHJpZ2dlciIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsInR5cGUiLCJRVUFMSVRZX0NIQU5HRV9SRU5ERVJFRCIsIm5ld1F1YWxpdHkiLCJQTEFZQkFDS19NRVRBREFUQV9MT0FERUQiLCJnZXRRdWFsaXR5Rm9yIiwiZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yIiwic3ViUXVhbGl0eUxpc3QiLCJpIiwibGVuZ3RoIiwiXyIsImZpbmRXaGVyZSIsImJpdHJhdGUiLCJoZWlnaHQiLCJ3aWR0aCIsInB1c2giLCJpbmRleCIsInF1YWxpdHlJbmRleCIsImxhYmVsIiwiaXNEeW5hbWljIiwicGxheSIsIm11dGVkUGxheSIsInJldHJ5Q291bnQiLCJnZXRTdGF0ZSIsIlNUQVRFX0FEX1BMQVlJTkciLCJTVEFURV9BRF9QQVVTRUQiLCJhdHRhY2hWaWV3IiwiY2hlY2tEYXNoTWV0YUxvYWRlZCIsInNldFRpbWVvdXQiLCJzZXRDdXJyZW50UXVhbGl0eSIsIlNUQVRFX1BMQVlJTkciLCJzZXRRdWFsaXR5Rm9yIiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiZGVzdHJveSIsInJlc2V0IiwiSU5JVF9EQVNIX05PVEZPVU5EIiwic2l6ZUh1bWFuaXplciIsImJ5dGVzIiwic2kiLCJwb3N0cGl4IiwidGhyZXNoIiwiTWF0aCIsImFicyIsInVuaXQiLCJ1bml0cyIsInUiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFZQTs7Ozs7O0FBRUE7Ozs7O0FBS0EsSUFBTUEsWUFBWTtBQUNkQyxjQUFVLFVBREk7QUFFZEMsbUJBQWU7QUFGRCxDQUFsQixDLENBekJBOzs7O0FBNkJBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFVQyxPQUFWLEVBQW1CQyxZQUFuQixFQUFpQ0MsUUFBakMsRUFBMkM7O0FBRXBELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLHFCQUFxQixJQUF6Qjs7QUFFQSxRQUFJQyxlQUFlLEVBQW5COztBQUVBLFFBQUk7O0FBRUEsWUFBSUMsT0FBT0MsT0FBUCxHQUFpQixPQUFyQixFQUE4QjtBQUMxQixrQkFBTUMsa0JBQU9DLEtBQVAsQ0FBYUMsOEJBQWIsQ0FBTjtBQUNIOztBQUVELFlBQU1DLGlDQUFpQyxTQUFqQ0EsOEJBQWlDLENBQVVDLE1BQVYsRUFBa0I7O0FBRXJELGdCQUFJTixPQUFPQyxPQUFQLElBQWtCLE9BQXRCLEVBQStCO0FBQzNCUixxQkFBS2MsY0FBTCxDQUFvQjtBQUNoQkMsK0JBQVc7QUFDUEMsNkJBQUs7QUFDREMsK0NBQW1CO0FBQ2ZDLHVDQUFPTDtBQURRO0FBRGxCO0FBREU7QUFESyxp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QyxPQUFyQixFQUE4QjtBQUNoRCxRQUFJQyxTQUFTRixLQUFLLElBQUwsR0FBWSxJQUF6QjtBQUNBLFFBQUdHLEtBQUtDLEdBQUwsQ0FBU0wsS0FBVCxJQUFrQkcsTUFBckIsRUFBNkI7QUFDekIsZUFBT0gsUUFBUSxJQUFmO0FBQ0g7QUFDRCxRQUFJTSxPQUFPSixXQUFTLEdBQXBCO0FBQ0EsUUFBSUssUUFBUSxDQUFDLE1BQUlELElBQUwsRUFBVSxNQUFJQSxJQUFkLEVBQW1CLE1BQUlBLElBQXZCLEVBQTRCLE1BQUlBLElBQWhDLEVBQXFDLE1BQUlBLElBQXpDLEVBQThDLE1BQUlBLElBQWxELEVBQXVELE1BQUlBLElBQTNELEVBQWdFLE1BQUlBLElBQXBFLENBQVo7QUFDRztBQUNILFFBQUlFLElBQUksQ0FBQyxDQUFUO0FBQ0EsT0FBRztBQUNDUixpQkFBU0csTUFBVDtBQUNBLFVBQUVLLENBQUY7QUFDSCxLQUhELFFBR1FKLEtBQUtDLEdBQUwsQ0FBU0wsS0FBVCxLQUFtQkcsTUFBbkIsSUFBNkJLLElBQUlELE1BQU1wQyxNQUFOLEdBQWUsQ0FIeEQ7QUFJQSxXQUFPNkIsTUFBTVMsT0FBTixDQUFjLENBQWQsSUFBaUJGLE1BQU1DLENBQU4sQ0FBeEI7QUFDSCxDQWREOztxQkFnQmVULGEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAxNC4uXG4gKi9cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHNpemVIdW1hbml6ZXIgZnJvbSBcInV0aWxzL3NpemVIdW1hbml6ZXJcIjtcbmltcG9ydCB7XG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXG4gICAgU1RBVEVfQURfUEFVU0VELFxuICAgIElOSVRfREFTSF9VTlNVUFBPUlQsXG4gICAgSU5JVF9EQVNIX05PVEZPVU5ELFxuICAgIEVSUk9SUyxcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCxcbiAgICBQUk9WSURFUl9EQVNIXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG4vKipcbiAqIEBicmllZiAgIGRhc2hqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5jb25zdCBEQVNIRVJST1IgPSB7XG4gICAgRE9XTkxPQUQ6IFwiZG93bmxvYWRcIixcbiAgICBNQU5JRkVTVEVSUk9SOiBcIm1hbmlmZXN0RXJyb3JcIlxufTtcbmNvbnN0IERhc2ggPSBmdW5jdGlvbiAoZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCkge1xuXG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgZGFzaCA9IG51bGw7XG4gICAgbGV0IHN1cGVyUGxheV9mdW5jID0gbnVsbDtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcbiAgICBsZXQgaXNEYXNoTWV0YUxvYWRlZCA9IGZhbHNlO1xuICAgIHZhciBwcmV2TExMaXZlRHVyYXRpb24gPSBudWxsO1xuXG4gICAgbGV0IHNvdXJjZU9mRmlsZSA9IFwiXCI7XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA8IFwiMi42LjVcIikge1xuICAgICAgICAgICAgdGhyb3cgRVJST1JTLmNvZGVzW0lOSVRfREFTSF9VTlNVUFBPUlRdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yID0gZnVuY3Rpb24gKGlzQXV0bykge1xuXG4gICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xuICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xuICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFicjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Td2l0Y2hCaXRyYXRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvOiBpc0F1dG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpIHtcbiAgICAgICAgICAgICAgICBkYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKFwidmlkZW9cIiwgaXNBdXRvKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGFzaC5zZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihpc0F1dG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuXG4gICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0U2V0dGluZ3MoKS5zdHJlYW1pbmcuYWJyLmF1dG9Td2l0Y2hCaXRyYXRlLnZpZGVvO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXNoanMuVmVyc2lvbiA+IFwiMi45LjBcIikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBsaXZlRGVsYXlSZWR1Y2luZ0NhbGxiYWNrICA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKGRhc2guZHVyYXRpb24oKSAhPT0gcHJldkxMTGl2ZUR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgcHJldkxMTGl2ZUR1cmF0aW9uID0gZGFzaC5kdXJhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGR2ckluZm8gPSBkYXNoLmdldERhc2hNZXRyaWNzKCkuZ2V0Q3VycmVudERWUkluZm8oKTtcbiAgICAgICAgICAgICAgICB2YXIgbGl2ZURlbGF5ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWxpdmVEZWxheSkge1xuICAgICAgICAgICAgICAgICAgICBsaXZlRGVsYXkgPSAzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRhc2guc2VlayhkdnJJbmZvLnJhbmdlLmVuZCAtIGR2ckluZm8ucmFuZ2Uuc3RhcnQgLSBsaXZlRGVsYXkpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICBkYXNoID0gZGFzaGpzLk1lZGlhUGxheWVyKCkuY3JlYXRlKCk7XG4gICAgICAgIGRhc2guaW5pdGlhbGl6ZShlbGVtZW50LCBudWxsLCBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuYXV0b1N0YXJ0KTtcblxuICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xuXG4gICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICAnZGVidWcnOiB7XG4gICAgICAgICAgICAgICAgICAgICdsb2dMZXZlbCc6IGRhc2hqcy5EZWJ1Zy5MT0dfTEVWRUxfTk9ORVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBkYXNoLmdldERlYnVnKCkuc2V0TG9nVG9Ccm93c2VyQ29uc29sZShmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuZGFzaCA9IGRhc2g7XG5cbiAgICAgICAgbGV0IHNwZWMgPSB7XG4gICAgICAgICAgICBuYW1lOiBQUk9WSURFUl9EQVNILFxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIG1zZTogZGFzaCxcbiAgICAgICAgICAgIGxpc3RlbmVyOiBudWxsLFxuICAgICAgICAgICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY2FuU2VlazogZmFsc2UsXG4gICAgICAgICAgICBpc0xpdmU6IGZhbHNlLFxuICAgICAgICAgICAgc2Vla2luZzogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZTogU1RBVEVfSURMRSxcbiAgICAgICAgICAgIGJ1ZmZlcjogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZTogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiAtMSxcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IC0xLFxuICAgICAgICAgICAgcXVhbGl0eUxldmVsczogW10sXG4gICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgIGFkVGFnVXJsOiBhZFRhZ1VybFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uIChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pIHtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IEF0dGFjaCBGaWxlIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIgKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcih0cnVlKTtcbiAgICAgICAgICAgIHNvdXJjZU9mRmlsZSA9IHNvdXJjZS5maWxlO1xuXG4gICAgICAgICAgICBkYXNoLm9mZihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlBMQVlCQUNLX1BMQVlJTkcsIGxpdmVEZWxheVJlZHVjaW5nQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICBpZiAoc291cmNlLmxvd0xhdGVuY3kgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgICAgIHByZXZMTExpdmVEdXJhdGlvbiA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93TGF0ZW5jeUVuYWJsZWQ6IHNvdXJjZS5sb3dMYXRlbmN5XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExvd0xhdGVuY3lFbmFibGVkKHNvdXJjZS5sb3dMYXRlbmN5KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXkgJiYgdHlwZW9mKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5KSA9PT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl2ZURlbGF5OiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGFzaC5zZXRMaXZlRGVsYXkocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlBMQVlCQUNLX1BMQVlJTkcsIGxpdmVEZWxheVJlZHVjaW5nQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd0xhdGVuY3lFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXZlRGVsYXk6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZGFzaC5zZXRMb3dMYXRlbmN5RW5hYmxlZChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2V0TGl2ZURlbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhc2guYXR0YWNoU291cmNlKHNvdXJjZU9mRmlsZSk7XG4gICAgICAgICAgICBzZWVrUG9zaXRpb25fc2VjID0gbGFzdFBsYXlQb3NpdGlvbjtcblxuICAgICAgICB9KTtcblxuICAgICAgICBzdXBlclBsYXlfZnVuYyA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuRVJST1IsIGZ1bmN0aW9uIChlcnJvcikge1xuXG4gICAgICAgICAgICBpZiAoZXJyb3IgJiYgKGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuRE9XTkxPQUQgfHwgZXJyb3IuZXJyb3IgPT09IERBU0hFUlJPUi5NQU5JRkVTVEVSUk9SIHx8IGVycm9yLmVycm9yLmNvZGUgPT09IDI1KSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICBlcnJvclRyaWdnZXIodGVtcEVycm9yLCB0aGF0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVRVUVTVEVELCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC5tZWRpYVR5cGUgJiYgZXZlbnQubWVkaWFUeXBlID09PSBcInZpZGVvXCIpIHtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCksXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBzcGVjLmN1cnJlbnRRdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlcXVlc3RcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVELCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC5tZWRpYVR5cGUgJiYgZXZlbnQubWVkaWFUeXBlID09PSBcInZpZGVvXCIpIHtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZXZlbnQubmV3UXVhbGl0eTtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCksXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBldmVudC5uZXdRdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlbmRlclwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5QTEFZQkFDS19NRVRBREFUQV9MT0FERUQsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUExBWUJBQ0tfTUVUQURBVEFfTE9BREVEICA6IFwiLCBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpW2Rhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpXSk7XG5cbiAgICAgICAgICAgIGlzRGFzaE1ldGFMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHN1YlF1YWxpdHlMaXN0ID0gZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyk7XG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YlF1YWxpdHlMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfLmZpbmRXaGVyZShzcGVjLnF1YWxpdHlMZXZlbHMsIHtiaXRyYXRlOiBzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCwgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRofSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3BlYy5xdWFsaXR5TGV2ZWxzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgYml0cmF0ZTogc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHN1YlF1YWxpdHlMaXN0W2ldLnF1YWxpdHlJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCArIFwieFwiICsgc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0ICsgXCIsIFwiICsgc2l6ZUh1bWFuaXplcihzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCB0cnVlLCBcImJwc1wiKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXNoLmlzRHluYW1pYygpKSB7XG4gICAgICAgICAgICAgICAgc3BlYy5pc0xpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoYXQucGxheSA9IChtdXRlZFBsYXkpID0+IHtcblxuICAgICAgICAgICAgbGV0IHJldHJ5Q291bnQgPSAwO1xuICAgICAgICAgICAgaWYgKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORyB8fCB0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BBVVNFRCkge1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlzRGFzaE1ldGFMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkYXNoLmF0dGFjaFZpZXcoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0Rhc2ggY2FuIGluZmluaXRlIGxvYWRpbmcgd2hlbiBwbGF5ZXIgaXMgaW4gYSBwYXVzZWQgc3RhdGUgZm9yIGEgbG9uZyB0aW1lLlxuICAgICAgICAgICAgLy9UaGVuIGRhc2ggYWx3YXlzIGhhdmUgdG8gcmVsb2FkKGF0dGFjaFZpZXcpIGFuZCB3YWl0IGZvciBNZXRhTG9hZGVkIGV2ZW50IHdoZW4gcmVzdW1lLlxuICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrRGFzaE1ldGFMb2FkZWQoKSB7XG4gICAgICAgICAgICAgICAgcmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgICAgIGlmIChpc0Rhc2hNZXRhTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyUGxheV9mdW5jKG11dGVkUGxheSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0cnlDb3VudCA8IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0Rhc2hNZXRhTG9hZGVkLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBxdWFsaXR5SW5kZXg7XG4gICAgICAgICAgICBpZiAoY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCkpIHtcbiAgICAgICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGFzaC5zZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiwgcXVhbGl0eUluZGV4KTtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgZGFzaC5yZXNldCgpO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xuICAgICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG5cbiAgICAgICAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgJiYgZXJyb3IuY29kZSA9PT0gSU5JVF9EQVNIX1VOU1VQUE9SVCkge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW0lOSVRfREFTSF9OT1RGT1VORF07XG4gICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIHRocm93IHRlbXBFcnJvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBEYXNoO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDE0Li5cbiAqL1xuXG5jb25zdCBzaXplSHVtYW5pemVyID0gZnVuY3Rpb24gKGJ5dGVzLCBzaSwgcG9zdHBpeCkge1xuICAgIGxldCB0aHJlc2ggPSBzaSA/IDEwMDAgOiAxMDI0O1xuICAgIGlmKE1hdGguYWJzKGJ5dGVzKSA8IHRocmVzaCkge1xuICAgICAgICByZXR1cm4gYnl0ZXMgKyAnIEInO1xuICAgIH1cbiAgICBsZXQgdW5pdCA9IHBvc3RwaXh8fFwiQlwiO1xuICAgIGxldCB1bml0cyA9IFsnaycrdW5pdCwnTScrdW5pdCwnRycrdW5pdCwnVCcrdW5pdCwnUCcrdW5pdCwnRScrdW5pdCwnWicrdW5pdCwnWScrdW5pdF07XG4gICAgICAgLy8gPyBbJ2tCJywnTUInLCdHQicsJ1RCJywnUEInLCdFQicsJ1pCJywnWUInXTogWydLaUInLCdNaUInLCdHaUInLCdUaUInLCdQaUInLCdFaUInLCdaaUInLCdZaUInXTtcbiAgICBsZXQgdSA9IC0xO1xuICAgIGRvIHtcbiAgICAgICAgYnl0ZXMgLz0gdGhyZXNoO1xuICAgICAgICArK3U7XG4gICAgfSB3aGlsZShNYXRoLmFicyhieXRlcykgPj0gdGhyZXNoICYmIHUgPCB1bml0cy5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gYnl0ZXMudG9GaXhlZCgxKSt1bml0c1t1XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2l6ZUh1bWFuaXplcjsiXSwic291cmNlUm9vdCI6IiJ9