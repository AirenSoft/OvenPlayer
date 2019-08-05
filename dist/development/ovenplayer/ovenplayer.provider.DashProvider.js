/*! OvenPlayerv0.9.73 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwiaXNGaXJzdEVycm9yIiwiaXNEYXNoTWV0YUxvYWRlZCIsInJ1bmVkQXV0b1N0YXJ0Iiwic291cmNlT2ZGaWxlIiwiY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiaXNBdXRvIiwiZGFzaGpzIiwiVmVyc2lvbiIsInNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwicmVzdWx0IiwiZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJNZWRpYVBsYXllciIsImNyZWF0ZSIsIkVSUk9SUyIsImNvZGVzIiwiSU5JVF9EQVNIX1VOU1VQUE9SVCIsImdldERlYnVnIiwic2V0TG9nVG9Ccm93c2VyQ29uc29sZSIsImluaXRpYWxpemUiLCJzcGVjIiwibmFtZSIsIlBST1ZJREVSX0RBU0giLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImZpbGUiLCJhdHRhY2hTb3VyY2UiLCJvbiIsImV2ZW50cyIsIkVSUk9SIiwiZXJyb3IiLCJ0ZW1wRXJyb3IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUVVBTElUWV9DSEFOR0VfUkVRVUVTVEVEIiwiZXZlbnQiLCJtZWRpYVR5cGUiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwidHlwZSIsIlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVEIiwibmV3UXVhbGl0eSIsIlBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCIsImdldFF1YWxpdHlGb3IiLCJnZXRCaXRyYXRlSW5mb0xpc3RGb3IiLCJzdWJRdWFsaXR5TGlzdCIsImkiLCJsZW5ndGgiLCJfIiwiZmluZFdoZXJlIiwiYml0cmF0ZSIsImhlaWdodCIsIndpZHRoIiwicHVzaCIsImluZGV4IiwicXVhbGl0eUluZGV4IiwibGFiZWwiLCJzZWVrIiwiaXNBdXRvU3RhcnQiLCJwbGF5IiwiaXNEeW5hbWljIiwibXV0ZWRQbGF5IiwicmV0cnlDb3VudCIsImdldFN0YXRlIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsImF0dGFjaFZpZXciLCJjaGVja0Rhc2hNZXRhTG9hZGVkIiwic2V0VGltZW91dCIsInNldEN1cnJlbnRRdWFsaXR5IiwiU1RBVEVfUExBWUlORyIsInNldFF1YWxpdHlGb3IiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJkZXN0cm95IiwicmVzZXQiLCJjb2RlIiwiSU5JVF9EQVNIX05PVEZPVU5EIiwic2l6ZUh1bWFuaXplciIsImJ5dGVzIiwic2kiLCJwb3N0cGl4IiwidGhyZXNoIiwiTWF0aCIsImFicyIsInVuaXQiLCJ1bml0cyIsInUiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFZQTs7Ozs7O0FBRUE7Ozs7O0FBS0EsSUFBTUEsWUFBWTtBQUNkQyxjQUFXLFVBREc7QUFFZEMsbUJBQWdCO0FBRkYsQ0FBbEIsQyxDQXpCQTs7OztBQTZCQSxJQUFN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Q0g7QUFDRCxRQUFJTSxPQUFPSixXQUFTLEdBQXBCO0FBQ0EsUUFBSUssUUFBUSxDQUFDLE1BQUlELElBQUwsRUFBVSxNQUFJQSxJQUFkLEVBQW1CLE1BQUlBLElBQXZCLEVBQTRCLE1BQUlBLElBQWhDLEVBQXFDLE1BQUlBLElBQXpDLEVBQThDLE1BQUlBLElBQWxELEVBQXVELE1BQUlBLElBQTNELEVBQWdFLE1BQUlBLElBQXBFLENBQVo7QUFDRztBQUNILFFBQUlFLElBQUksQ0FBQyxDQUFUO0FBQ0EsT0FBRztBQUNDUixpQkFBU0csTUFBVDtBQUNBLFVBQUVLLENBQUY7QUFDSCxLQUhELFFBR1FKLEtBQUtDLEdBQUwsQ0FBU0wsS0FBVCxLQUFtQkcsTUFBbkIsSUFBNkJLLElBQUlELE1BQU12QyxNQUFOLEdBQWUsQ0FIeEQ7QUFJQSxXQUFPZ0MsTUFBTVMsT0FBTixDQUFjLENBQWQsSUFBaUJGLE1BQU1DLENBQU4sQ0FBeEI7QUFDSCxDQWREOztxQkFnQmVULGEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAxNC4uXG4gKi9cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHNpemVIdW1hbml6ZXIgZnJvbSBcInV0aWxzL3NpemVIdW1hbml6ZXJcIjtcbmltcG9ydCB7XG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BMQVlJTkcsXG4gICAgU1RBVEVfQURfUEFVU0VELFxuICAgIElOSVRfREFTSF9VTlNVUFBPUlQsXG4gICAgSU5JVF9EQVNIX05PVEZPVU5ELFxuICAgIEVSUk9SUyxcbiAgICBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLFxuICAgIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCxcbiAgICBQUk9WSURFUl9EQVNIXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG4vKipcbiAqIEBicmllZiAgIGRhc2hqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5jb25zdCBEQVNIRVJST1IgPSB7XG4gICAgRE9XTkxPQUQgOiBcImRvd25sb2FkXCIsXG4gICAgTUFOSUZFU1RFUlJPUiA6IFwibWFuaWZlc3RFcnJvclwiXG59O1xuY29uc3QgRGFzaCA9IGZ1bmN0aW9uKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpe1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IGRhc2ggPSBudWxsO1xuICAgIGxldCBzdXBlclBsYXlfZnVuYyA9IG51bGw7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcbiAgICBsZXQgc2Vla1Bvc2l0aW9uX3NlYyA9IDA7XG4gICAgbGV0IGlzRmlyc3RFcnJvciA9IGZhbHNlO1xuICAgIGxldCBpc0Rhc2hNZXRhTG9hZGVkID0gZmFsc2U7XG4gICAgbGV0IHJ1bmVkQXV0b1N0YXJ0ID0gZmFsc2U7XG5cbiAgICBsZXQgc291cmNlT2ZGaWxlID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IgPSBmdW5jdGlvbihpc0F1dG8pe1xuICAgICAgICAgICAgaWYoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpe1xuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiLCBpc0F1dG8pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZGFzaC5zZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihpc0F1dG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgICAgICBpZihkYXNoanMuVmVyc2lvbiA+IFwiMi45LjBcIil7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihcInZpZGVvXCIpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgZGFzaCA9IGRhc2hqcy5NZWRpYVBsYXllcigpLmNyZWF0ZSgpO1xuICAgICAgICBpZihkYXNoanMuVmVyc2lvbiA8IFwiMi42LjVcIil7XG4gICAgICAgICAgICB0aHJvdyBFUlJPUlMuY29kZXNbSU5JVF9EQVNIX1VOU1VQUE9SVF07XG4gICAgICAgIH1cbiAgICAgICAgZGFzaC5nZXREZWJ1ZygpLnNldExvZ1RvQnJvd3NlckNvbnNvbGUoZmFsc2UpO1xuICAgICAgICBkYXNoLmluaXRpYWxpemUoZWxlbWVudCwgbnVsbCwgZmFsc2UpO1xuXG4gICAgICAgIGxldCBzcGVjID0ge1xuICAgICAgICAgICAgbmFtZSA6IFBST1ZJREVSX0RBU0gsXG4gICAgICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcbiAgICAgICAgICAgIG1zZSA6IGRhc2gsXG4gICAgICAgICAgICBsaXN0ZW5lciA6IG51bGwsXG4gICAgICAgICAgICBpc0xvYWRlZCA6IGZhbHNlLFxuICAgICAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxuICAgICAgICAgICAgaXNMaXZlIDogZmFsc2UsXG4gICAgICAgICAgICBzZWVraW5nIDogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXG4gICAgICAgICAgICBidWZmZXIgOiAwLFxuICAgICAgICAgICAgZnJhbWVyYXRlIDogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXG4gICAgICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXG4gICAgICAgICAgICBzb3VyY2VzIDogW10sXG4gICAgICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24oc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBBdHRhY2ggRmlsZSA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcih0cnVlKTtcbiAgICAgICAgICAgIHNvdXJjZU9mRmlsZSA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgZGFzaC5hdHRhY2hTb3VyY2Uoc291cmNlT2ZGaWxlKTtcbiAgICAgICAgICAgIHNlZWtQb3NpdGlvbl9zZWMgPSBsYXN0UGxheVBvc2l0aW9uO1xuXG4gICAgICAgIH0pO1xuICAgICAgICBzdXBlclBsYXlfZnVuYyA9IHRoYXQuc3VwZXIoJ3BsYXknKTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuRVJST1IsIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgIGlmKGVycm9yICYmICFpc0ZpcnN0RXJyb3IgJiYgKCBlcnJvci5lcnJvciA9PT0gREFTSEVSUk9SLkRPV05MT0FEIHx8IGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuTUFOSUZFU1RFUlJPUiApKXtcbiAgICAgICAgICAgICAgICBpc0ZpcnN0RXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUl07XG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKHRlbXBFcnJvciwgdGhhdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGlmKGV2ZW50ICYmIGV2ZW50Lm1lZGlhVHlwZSAmJiBldmVudC5tZWRpYVR5cGUgPT09IFwidmlkZW9cIil7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogc3BlYy5jdXJyZW50UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IFwicmVxdWVzdFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVOREVSRUQsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGlmKGV2ZW50ICYmIGV2ZW50Lm1lZGlhVHlwZSAmJiBldmVudC5tZWRpYVR5cGUgPT09IFwidmlkZW9cIil7XG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGV2ZW50Lm5ld1F1YWxpdHk7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogZXZlbnQubmV3UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IFwicmVuZGVyXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCwgZnVuY3Rpb24oZXZlbnQpe1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUExBWUJBQ0tfTUVUQURBVEFfTE9BREVEICA6IFwiLCBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpW2Rhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpXSk7XG5cbiAgICAgICAgICAgIGlzRGFzaE1ldGFMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHN1YlF1YWxpdHlMaXN0ID0gZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyk7XG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIik7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc3ViUXVhbGl0eUxpc3QubGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgICAgICBpZighXy5maW5kV2hlcmUoc3BlYy5xdWFsaXR5TGV2ZWxzLHtiaXRyYXRlIDogc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSwgaGVpZ2h0OiBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQsd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRofSkpe1xuICAgICAgICAgICAgICAgICAgICBzcGVjLnF1YWxpdHlMZXZlbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBiaXRyYXRlOiBzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogc3ViUXVhbGl0eUxpc3RbaV0ucXVhbGl0eUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCtcInhcIitzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQrXCIsIFwiKyBzaXplSHVtYW5pemVyKHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsIHRydWUsIFwiYnBzXCIpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc2Vla1Bvc2l0aW9uX3NlYyl7XG4gICAgICAgICAgICAgICAgZGFzaC5zZWVrKHNlZWtQb3NpdGlvbl9zZWMpO1xuICAgICAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZGFzaC5pc0R5bmFtaWMoKSl7XG4gICAgICAgICAgICAgICAgc3BlYy5pc0xpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSAmJiAhcnVuZWRBdXRvU3RhcnQpe1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBBVVRPUExBWSgpIVwiKTtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcblxuICAgICAgICAgICAgICAgIHJ1bmVkQXV0b1N0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhhdC5wbGF5ID0gKG11dGVkUGxheSkgPT57XG4gICAgICAgICAgICBsZXQgcmV0cnlDb3VudCA9IDA7XG4gICAgICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BMQVlJTkcgfHwgdGhhdC5nZXRTdGF0ZSgpID09PSBTVEFURV9BRF9QQVVTRUQpe1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpc0Rhc2hNZXRhTG9hZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZGFzaC5hdHRhY2hWaWV3KGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9EYXNoIGNhbiBpbmZpbml0ZSBsb2FkaW5nIHdoZW4gcGxheWVyIGlzIGluIGEgcGF1c2VkIHN0YXRlIGZvciBhIGxvbmcgdGltZS5cbiAgICAgICAgICAgIC8vVGhlbiBkYXNoIGFsd2F5cyBoYXZlIHRvIHJlbG9hZChhdHRhY2hWaWV3KSBhbmQgd2FpdCBmb3IgTWV0YUxvYWRlZCBldmVudCB3aGVuIHJlc3VtZS5cbiAgICAgICAgICAgIChmdW5jdGlvbiBjaGVja0Rhc2hNZXRhTG9hZGVkKCl7XG4gICAgICAgICAgICAgICAgcmV0cnlDb3VudCArKztcbiAgICAgICAgICAgICAgICBpZihpc0Rhc2hNZXRhTG9hZGVkKXtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXJQbGF5X2Z1bmMobXV0ZWRQbGF5KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50IDwgMzAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tEYXNoTWV0YUxvYWRlZCwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBxdWFsaXR5SW5kZXg7XG4gICAgICAgICAgICBpZihjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKSl7XG4gICAgICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhc2guc2V0UXVhbGl0eUZvcihcInZpZGVvXCIsIHF1YWxpdHlJbmRleCk7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xuICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKGlzQXV0byk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICAgICAgZGFzaC5yZXNldCgpO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xuICAgICAgICB9O1xuICAgIH1jYXRjaChlcnJvcil7XG4gICAgICAgIGlmKGVycm9yICYmIGVycm9yLmNvZGUgJiYgZXJyb3IuY29kZSA9PT0gSU5JVF9EQVNIX1VOU1VQUE9SVCl7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gIEVSUk9SUy5jb2Rlc1tJTklUX0RBU0hfTk9URk9VTkRdO1xuICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICB0aHJvdyB0ZW1wRXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgRGFzaDtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxNC4uXG4gKi9cblxuY29uc3Qgc2l6ZUh1bWFuaXplciA9IGZ1bmN0aW9uIChieXRlcywgc2ksIHBvc3RwaXgpIHtcbiAgICBsZXQgdGhyZXNoID0gc2kgPyAxMDAwIDogMTAyNDtcbiAgICBpZihNYXRoLmFicyhieXRlcykgPCB0aHJlc2gpIHtcbiAgICAgICAgcmV0dXJuIGJ5dGVzICsgJyBCJztcbiAgICB9XG4gICAgbGV0IHVuaXQgPSBwb3N0cGl4fHxcIkJcIjtcbiAgICBsZXQgdW5pdHMgPSBbJ2snK3VuaXQsJ00nK3VuaXQsJ0cnK3VuaXQsJ1QnK3VuaXQsJ1AnK3VuaXQsJ0UnK3VuaXQsJ1onK3VuaXQsJ1knK3VuaXRdO1xuICAgICAgIC8vID8gWydrQicsJ01CJywnR0InLCdUQicsJ1BCJywnRUInLCdaQicsJ1lCJ106IFsnS2lCJywnTWlCJywnR2lCJywnVGlCJywnUGlCJywnRWlCJywnWmlCJywnWWlCJ107XG4gICAgbGV0IHUgPSAtMTtcbiAgICBkbyB7XG4gICAgICAgIGJ5dGVzIC89IHRocmVzaDtcbiAgICAgICAgKyt1O1xuICAgIH0gd2hpbGUoTWF0aC5hYnMoYnl0ZXMpID49IHRocmVzaCAmJiB1IDwgdW5pdHMubGVuZ3RoIC0gMSk7XG4gICAgcmV0dXJuIGJ5dGVzLnRvRml4ZWQoMSkrdW5pdHNbdV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNpemVIdW1hbml6ZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==