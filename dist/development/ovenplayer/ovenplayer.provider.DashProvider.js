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

        dash = dashjs.MediaPlayer().create();

        window.dash = dash;

        if (dashjs.Version < "2.6.5") {
            throw _constants.ERRORS.codes[_constants.INIT_DASH_UNSUPPORT];
        }

        if (dashjs.Version >= '3.0.0') {

            dash.updateSettings({
                'debug': {
                    'logLevel': dashjs.Debug.LOG_LEVEL_NONE
                }
            });
        } else {

            dash.getDebug().setLogToBrowserConsole(false);
        }

        dash.initialize(element, null, false);

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

            if (source.lowLatency) {

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

        console.log(error);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwiaXNGaXJzdEVycm9yIiwiaXNEYXNoTWV0YUxvYWRlZCIsInJ1bmVkQXV0b1N0YXJ0Iiwic291cmNlT2ZGaWxlIiwiY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiaXNBdXRvIiwiZGFzaGpzIiwiVmVyc2lvbiIsInVwZGF0ZVNldHRpbmdzIiwic3RyZWFtaW5nIiwiYWJyIiwiYXV0b1N3aXRjaEJpdHJhdGUiLCJ2aWRlbyIsInNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwicmVzdWx0IiwiZ2V0U2V0dGluZ3MiLCJnZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsIk1lZGlhUGxheWVyIiwiY3JlYXRlIiwid2luZG93IiwiRVJST1JTIiwiY29kZXMiLCJJTklUX0RBU0hfVU5TVVBQT1JUIiwiRGVidWciLCJMT0dfTEVWRUxfTk9ORSIsImdldERlYnVnIiwic2V0TG9nVG9Ccm93c2VyQ29uc29sZSIsImluaXRpYWxpemUiLCJzcGVjIiwibmFtZSIsIlBST1ZJREVSX0RBU0giLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImZpbGUiLCJsb3dMYXRlbmN5IiwibG93TGF0ZW5jeUVuYWJsZWQiLCJzZXRMb3dMYXRlbmN5RW5hYmxlZCIsImdldENvbmZpZyIsImxvd0xhdGVuY3lNcGRMaXZlRGVsYXkiLCJsaXZlRGVsYXkiLCJzZXRMaXZlRGVsYXkiLCJ1bmRlZmluZWQiLCJhdHRhY2hTb3VyY2UiLCJvbiIsImV2ZW50cyIsIkVSUk9SIiwiZXJyb3IiLCJ0ZW1wRXJyb3IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUVVBTElUWV9DSEFOR0VfUkVRVUVTVEVEIiwiZXZlbnQiLCJtZWRpYVR5cGUiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwidHlwZSIsIlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVEIiwibmV3UXVhbGl0eSIsIlBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCIsImdldFF1YWxpdHlGb3IiLCJnZXRCaXRyYXRlSW5mb0xpc3RGb3IiLCJzdWJRdWFsaXR5TGlzdCIsImkiLCJsZW5ndGgiLCJfIiwiZmluZFdoZXJlIiwiYml0cmF0ZSIsImhlaWdodCIsIndpZHRoIiwicHVzaCIsImluZGV4IiwicXVhbGl0eUluZGV4IiwibGFiZWwiLCJzZWVrIiwiaXNBdXRvU3RhcnQiLCJwbGF5IiwiaXNEeW5hbWljIiwibXV0ZWRQbGF5IiwicmV0cnlDb3VudCIsImdldFN0YXRlIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsImF0dGFjaFZpZXciLCJjaGVja0Rhc2hNZXRhTG9hZGVkIiwic2V0VGltZW91dCIsInNldEN1cnJlbnRRdWFsaXR5IiwiU1RBVEVfUExBWUlORyIsInNldFF1YWxpdHlGb3IiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJkZXN0cm95IiwicmVzZXQiLCJjb25zb2xlIiwiY29kZSIsIklOSVRfREFTSF9OT1RGT1VORCIsInNpemVIdW1hbml6ZXIiLCJieXRlcyIsInNpIiwicG9zdHBpeCIsInRocmVzaCIsIk1hdGgiLCJhYnMiLCJ1bml0IiwidW5pdHMiLCJ1IiwidG9GaXhlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBWUE7Ozs7OztBQUVBOzs7OztBQUtBLElBQU1BLFlBQVk7QUFDZEMsY0FBVSxVQURJO0FBRWRDLG1CQUFlO0FBRkQsQ0FBbEIsQyxDQXpCQTs7OztBQTZCQSxJQUFNQyxPQUFPLFNBQVBBLElBQU8sQ0FBVUMsT0FBVixFQUFtQkMsWUFBbkIsRUFBaUNDLFFBQWpDLEVBQTJDO0FBQ3BELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLGlCQUFpQixJQUFyQjtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLGVBQWUsS0FBbkI7QUFDQSxRQUFJQyxtQkFBbUIsS0FBdkI7QUFDQSxRQUFJQyxpQkFBaUIsS0FBckI7O0FBRUEsUUFBSUMsZUFBZSxFQUFuQjtBQUNBLFFBQUk7QUFDQSxZQUFNQyxpQ0FBaUMsU0FBakNBLDhCQUFpQyxDQUFVQyxNQUFWLEVBQWtCOztBQUVyRCxnQkFBSUMsT0FBT0MsT0FBUCxJQUFrQixPQUF0QixFQUErQjtBQUMzQlgscUJBQUtZLGNBQUwsQ0FBb0I7QUFDaEJDLCtCQUFXO0FBQ1BDLDZCQUFLO0FBQ0RDLCtDQUFtQjtBQUNmQyx1Q0FBT1A7QUFEUTtBQURsQjtBQURFO0FBREssaUJBQXBCO0FBU0gsYUFWRCxNQVVPLElBQUlDLE9BQU9DLE9BQVAsR0FBaUIsT0FBckIsRUFBOEI7QUFDakNYLHFCQUFLaUIsdUJBQUwsQ0FBNkIsT0FBN0IsRUFBc0NSLE1BQXRDO0FBQ0gsYUFGTSxNQUVBO0FBQ0hULHFCQUFLaUIsdUJBQUwsQ0FBNkJSLE1BQTdCO0FBQ0g7QUFDSixTQWpCRDtBQWtCQSxZQUFNUyxp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QkcsTUFBbkIsSUFBNkJLLElBQUlELE1BQU14QyxNQUFOLEdBQWUsQ0FIeEQ7QUFJQSxXQUFPaUMsTUFBTVMsT0FBTixDQUFjLENBQWQsSUFBaUJGLE1BQU1DLENBQU4sQ0FBeEI7QUFDSCxDQWREOztxQkFnQmVULGEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAxNC4uXG4gKi9cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHNpemVIdW1hbml6ZXIgZnJvbSBcInV0aWxzL3NpemVIdW1hbml6ZXJcIjtcbmltcG9ydCB7XG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXG4gICAgU1RBVEVfQURfUEFVU0VELFxuICAgIElOSVRfREFTSF9VTlNVUFBPUlQsXG4gICAgSU5JVF9EQVNIX05PVEZPVU5ELFxuICAgIEVSUk9SUyxcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCxcbiAgICBQUk9WSURFUl9EQVNIXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG4vKipcbiAqIEBicmllZiAgIGRhc2hqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5jb25zdCBEQVNIRVJST1IgPSB7XG4gICAgRE9XTkxPQUQ6IFwiZG93bmxvYWRcIixcbiAgICBNQU5JRkVTVEVSUk9SOiBcIm1hbmlmZXN0RXJyb3JcIlxufTtcbmNvbnN0IERhc2ggPSBmdW5jdGlvbiAoZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCkge1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGRhc2ggPSBudWxsO1xuICAgIGxldCBzdXBlclBsYXlfZnVuYyA9IG51bGw7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcbiAgICBsZXQgc2Vla1Bvc2l0aW9uX3NlYyA9IDA7XG4gICAgbGV0IGlzRmlyc3RFcnJvciA9IGZhbHNlO1xuICAgIGxldCBpc0Rhc2hNZXRhTG9hZGVkID0gZmFsc2U7XG4gICAgbGV0IHJ1bmVkQXV0b1N0YXJ0ID0gZmFsc2U7XG5cbiAgICBsZXQgc291cmNlT2ZGaWxlID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IgPSBmdW5jdGlvbiAoaXNBdXRvKSB7XG5cbiAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XG4gICAgICAgICAgICAgICAgZGFzaC51cGRhdGVTZXR0aW5ncyh7XG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWJyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b1N3aXRjaEJpdHJhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW86IGlzQXV0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXNoanMuVmVyc2lvbiA+IFwiMi45LjBcIikge1xuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiLCBpc0F1dG8pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKGlzQXV0byk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuXG4gICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0U2V0dGluZ3MoKS5zdHJlYW1pbmcuYWJyLmF1dG9Td2l0Y2hCaXRyYXRlLnZpZGVvO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXNoanMuVmVyc2lvbiA+IFwiMi45LjBcIikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcblxuICAgICAgICBkYXNoID0gZGFzaGpzLk1lZGlhUGxheWVyKCkuY3JlYXRlKCk7XG5cbiAgICAgICAgd2luZG93LmRhc2ggPSBkYXNoO1xuXG4gICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA8IFwiMi42LjVcIikge1xuICAgICAgICAgICAgdGhyb3cgRVJST1JTLmNvZGVzW0lOSVRfREFTSF9VTlNVUFBPUlRdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcblxuICAgICAgICAgICAgZGFzaC51cGRhdGVTZXR0aW5ncyh7XG4gICAgICAgICAgICAgICAgJ2RlYnVnJzoge1xuICAgICAgICAgICAgICAgICAgICAnbG9nTGV2ZWwnOiBkYXNoanMuRGVidWcuTE9HX0xFVkVMX05PTkVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgZGFzaC5nZXREZWJ1ZygpLnNldExvZ1RvQnJvd3NlckNvbnNvbGUoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGFzaC5pbml0aWFsaXplKGVsZW1lbnQsIG51bGwsIGZhbHNlKTtcblxuICAgICAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgICAgIG5hbWU6IFBST1ZJREVSX0RBU0gsXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgbXNlOiBkYXNoLFxuICAgICAgICAgICAgbGlzdGVuZXI6IG51bGwsXG4gICAgICAgICAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgICAgICAgICBjYW5TZWVrOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBzZWVraW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXRlOiBTVEFURV9JRExFLFxuICAgICAgICAgICAgYnVmZmVyOiAwLFxuICAgICAgICAgICAgZnJhbWVyYXRlOiAwLFxuICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IC0xLFxuICAgICAgICAgICAgY3VycmVudFNvdXJjZTogLTEsXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzOiBbXSxcbiAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxuICAgICAgICAgICAgYWRUYWdVcmw6IGFkVGFnVXJsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24gKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbikge1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogQXR0YWNoIEZpbGUgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIiArIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKHRydWUpO1xuICAgICAgICAgICAgc291cmNlT2ZGaWxlID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgIGlmIChzb3VyY2UubG93TGF0ZW5jeSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhc2hqcy5WZXJzaW9uID49ICczLjAuMCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBkYXNoLnVwZGF0ZVNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd0xhdGVuY3lFbmFibGVkOiBzb3VyY2UubG93TGF0ZW5jeVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGRhc2guc2V0TG93TGF0ZW5jeUVuYWJsZWQoc291cmNlLmxvd0xhdGVuY3kpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheSAmJiB0eXBlb2YocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXkpID09PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXNoanMuVmVyc2lvbiA+PSAnMy4wLjAnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXZlRGVsYXk6IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExpdmVEZWxheShwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGFzaGpzLlZlcnNpb24gPj0gJzMuMC4wJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGRhc2gudXBkYXRlU2V0dGluZ3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93TGF0ZW5jeUVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdmVEZWxheTogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExvd0xhdGVuY3lFbmFibGVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgZGFzaC5zZXRMaXZlRGVsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGFzaC5hdHRhY2hTb3VyY2Uoc291cmNlT2ZGaWxlKTtcbiAgICAgICAgICAgIHNlZWtQb3NpdGlvbl9zZWMgPSBsYXN0UGxheVBvc2l0aW9uO1xuXG4gICAgICAgIH0pO1xuICAgICAgICBzdXBlclBsYXlfZnVuYyA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuRVJST1IsIGZ1bmN0aW9uIChlcnJvcikge1xuXG4gICAgICAgICAgICBpZiAoZXJyb3IgJiYgKGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuRE9XTkxPQUQgfHwgZXJyb3IuZXJyb3IgPT09IERBU0hFUlJPUi5NQU5JRkVTVEVSUk9SKSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICBlcnJvclRyaWdnZXIodGVtcEVycm9yLCB0aGF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFUVVFU1RFRCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKSB7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogc3BlYy5jdXJyZW50UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZXF1ZXN0XCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRU5ERVJFRCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKSB7XG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGV2ZW50Lm5ld1F1YWxpdHk7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogZXZlbnQubmV3UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZW5kZXJcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUExBWUJBQ0tfTUVUQURBVEFfTE9BREVELCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IFBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCAgOiBcIiwgZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKVtkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKV0pO1xuXG4gICAgICAgICAgICBpc0Rhc2hNZXRhTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBzdWJRdWFsaXR5TGlzdCA9IGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpO1xuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJRdWFsaXR5TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghXy5maW5kV2hlcmUoc3BlYy5xdWFsaXR5TGV2ZWxzLCB7Yml0cmF0ZTogc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSwgaGVpZ2h0OiBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQsIHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aH0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMucXVhbGl0eUxldmVscy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpdHJhdGU6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBzdWJRdWFsaXR5TGlzdFtpXS5xdWFsaXR5SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGggKyBcInhcIiArIHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCArIFwiLCBcIiArIHNpemVIdW1hbml6ZXIoc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSwgdHJ1ZSwgXCJicHNcIilcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2Vla1Bvc2l0aW9uX3NlYykge1xuICAgICAgICAgICAgICAgIGRhc2guc2VlayhzZWVrUG9zaXRpb25fc2VjKTtcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhc2guaXNEeW5hbWljKCkpIHtcbiAgICAgICAgICAgICAgICBzcGVjLmlzTGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSAmJiAhcnVuZWRBdXRvU3RhcnQpIHtcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogQVVUT1BMQVkoKSFcIik7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG5cbiAgICAgICAgICAgICAgICBydW5lZEF1dG9TdGFydCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9KTtcblxuXG4gICAgICAgIHRoYXQucGxheSA9IChtdXRlZFBsYXkpID0+IHtcbiAgICAgICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcbiAgICAgICAgICAgIGlmICh0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcgfHwgdGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QQVVTRUQpIHtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpc0Rhc2hNZXRhTG9hZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZGFzaC5hdHRhY2hWaWV3KGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9EYXNoIGNhbiBpbmZpbml0ZSBsb2FkaW5nIHdoZW4gcGxheWVyIGlzIGluIGEgcGF1c2VkIHN0YXRlIGZvciBhIGxvbmcgdGltZS5cbiAgICAgICAgICAgIC8vVGhlbiBkYXNoIGFsd2F5cyBoYXZlIHRvIHJlbG9hZChhdHRhY2hWaWV3KSBhbmQgd2FpdCBmb3IgTWV0YUxvYWRlZCBldmVudCB3aGVuIHJlc3VtZS5cbiAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja0Rhc2hNZXRhTG9hZGVkKCkge1xuICAgICAgICAgICAgICAgIHJldHJ5Q291bnQrKztcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXNoTWV0YUxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICBzdXBlclBsYXlfZnVuYyhtdXRlZFBsYXkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHJ5Q291bnQgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tEYXNoTWV0YUxvYWRlZCwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gcXVhbGl0eUluZGV4O1xuICAgICAgICAgICAgaWYgKGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpKSB7XG4gICAgICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhc2guc2V0UXVhbGl0eUZvcihcInZpZGVvXCIsIHF1YWxpdHlJbmRleCk7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xuICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKGlzQXV0byk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgICAgIGRhc2gucmVzZXQoKTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcblxuICAgICAgICBpZiAoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBlcnJvci5jb2RlID09PSBJTklUX0RBU0hfVU5TVVBQT1JUKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9EQVNIX05PVEZPVU5EXTtcbiAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgdGhyb3cgdGVtcEVycm9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IERhc2g7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTQuLlxuICovXG5cbmNvbnN0IHNpemVIdW1hbml6ZXIgPSBmdW5jdGlvbiAoYnl0ZXMsIHNpLCBwb3N0cGl4KSB7XG4gICAgbGV0IHRocmVzaCA9IHNpID8gMTAwMCA6IDEwMjQ7XG4gICAgaWYoTWF0aC5hYnMoYnl0ZXMpIDwgdGhyZXNoKSB7XG4gICAgICAgIHJldHVybiBieXRlcyArICcgQic7XG4gICAgfVxuICAgIGxldCB1bml0ID0gcG9zdHBpeHx8XCJCXCI7XG4gICAgbGV0IHVuaXRzID0gWydrJyt1bml0LCdNJyt1bml0LCdHJyt1bml0LCdUJyt1bml0LCdQJyt1bml0LCdFJyt1bml0LCdaJyt1bml0LCdZJyt1bml0XTtcbiAgICAgICAvLyA/IFsna0InLCdNQicsJ0dCJywnVEInLCdQQicsJ0VCJywnWkInLCdZQiddOiBbJ0tpQicsJ01pQicsJ0dpQicsJ1RpQicsJ1BpQicsJ0VpQicsJ1ppQicsJ1lpQiddO1xuICAgIGxldCB1ID0gLTE7XG4gICAgZG8ge1xuICAgICAgICBieXRlcyAvPSB0aHJlc2g7XG4gICAgICAgICsrdTtcbiAgICB9IHdoaWxlKE1hdGguYWJzKGJ5dGVzKSA+PSB0aHJlc2ggJiYgdSA8IHVuaXRzLmxlbmd0aCAtIDEpO1xuICAgIHJldHVybiBieXRlcy50b0ZpeGVkKDEpK3VuaXRzW3VdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaXplSHVtYW5pemVyOyJdLCJzb3VyY2VSb290IjoiIn0=