/*! OvenPlayerv0.8.41 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var _Manager = __webpack_require__(/*! api/media/Manager */ "./src/js/api/media/Manager.js");

var _Manager2 = _interopRequireDefault(_Manager);

var _Provider = __webpack_require__(/*! api/provider/html5/Provider */ "./src/js/api/provider/html5/Provider.js");

var _Provider2 = _interopRequireDefault(_Provider);

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _sizeHumanizer = __webpack_require__(/*! utils/sizeHumanizer */ "./src/js/utils/sizeHumanizer.js");

var _sizeHumanizer2 = _interopRequireDefault(_sizeHumanizer);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

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

var Dash = function Dash(container, playerConfig) {
    var that = {};
    var dash = null;
    var superDestroy_func = null;
    var seekPosition_sec = 0;
    var isFirstError = false;

    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_DASH, playerConfig.isLoop());
    var element = mediaManager.create();

    try {
        dash = dashjs.MediaPlayer().create();
        dash.getDebug().setLogToBrowserConsole(false);
        dash.initialize(element, null, false);
        var spec = {
            name: _constants.PROVIDER_DASH,
            extendedElement: dash,
            listener: null,
            canSeek: false,
            isLive: false,
            seeking: false,
            state: _constants.STATE_IDLE,
            buffer: 0,
            framerate: 0,
            currentQuality: -1,
            currentSource: -1,
            qualityLevels: [],
            sources: []
        };

        that = (0, _Provider2["default"])(spec, playerConfig, function (source, lastPlayPosition) {
            OvenPlayerConsole.log("DASH : onExtendedLoad : ", source, "lastPlayPosition : " + lastPlayPosition);
            dash.setAutoSwitchQuality(true);
            dash.attachSource(source.file);
            seekPosition_sec = lastPlayPosition;
        });
        superDestroy_func = that["super"]('destroy');
        OvenPlayerConsole.log("DASH PROVIDER LOADED.");

        dash.on(dashjs.MediaPlayer.events.ERROR, function (error) {
            if (error && !isFirstError && (error.error === DASHERROR.DOWNLOAD || error.error === DASHERROR.MANIFESTERROR)) {
                isFirstError = true;
                var tempError = _constants.ERRORS[_constants.PLAYER_UNKNWON_NEWWORK_ERROR];
                tempError.error = error;
                (0, _utils.errorTrigger)(tempError, that);
            }
        });

        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, function (event) {
            if (event && event.mediaType && event.mediaType === "video") {
                that.trigger(_constants.CONTENT_LEVEL_CHANGED, {
                    isAuto: dash.getAutoSwitchQuality(),
                    currentQuality: spec.currentQuality,
                    type: "request"
                });
            }
        });
        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function (event) {
            if (event && event.mediaType && event.mediaType === "video") {
                spec.currentQuality = event.newQuality;
                that.trigger(_constants.CONTENT_LEVEL_CHANGED, {
                    isAuto: dash.getAutoSwitchQuality(),
                    currentQuality: event.newQuality,
                    type: "render"
                });
            }
        });

        that.on(_constants.CONTENT_META, function (meta) {
            OvenPlayerConsole.log("GetStreamInfo  : ", dash.getQualityFor("video"), dash.getBitrateInfoListFor('video'), dash.getBitrateInfoListFor('video')[dash.getQualityFor("video")]);

            var subQualityList = dash.getBitrateInfoListFor('video');
            spec.currentQuality = dash.getQualityFor("video");
            for (var i = 0; i < subQualityList.length; i++) {
                spec.qualityLevels.push({
                    bitrate: subQualityList[i].bitrate,
                    height: subQualityList[i].height,
                    width: subQualityList[i].width,
                    index: subQualityList[i].qualityIndex,
                    label: subQualityList[i].width + "x" + subQualityList[i].height + ", " + (0, _sizeHumanizer2["default"])(subQualityList[i].bitrate, true, "bps")
                });
            }

            if (dash.isDynamic()) {
                that.play();
            } else {
                if (seekPosition_sec) {
                    dash.seek(seekPosition_sec);
                    that.play();
                }
            }
        }, that);
        that.setCurrentQuality = function (qualityIndex) {
            if (that.getState() !== _constants.STATE_PLAYING) {
                that.play();
            }
            spec.currentQuality = qualityIndex;
            if (dash.getAutoSwitchQuality()) {
                dash.setAutoSwitchQuality(false);
            }
            dash.setQualityFor("video", qualityIndex);

            return spec.currentQuality;
        };
        that.isAutoQuality = function () {
            return dash.getAutoSwitchQuality();
        };
        that.setAutoQuality = function (isAuto) {
            dash.setAutoSwitchQuality(isAuto);
        };
        that.destroy = function () {
            dash.reset();
            mediaManager.destroy();
            mediaManager = null;
            element = null;
            OvenPlayerConsole.log("DASH : PROVIDER DESTROYED.");

            superDestroy_func();
        };
    } catch (error) {
        throw new Error(error);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJjb250YWluZXIiLCJwbGF5ZXJDb25maWciLCJ0aGF0IiwiZGFzaCIsInN1cGVyRGVzdHJveV9mdW5jIiwic2Vla1Bvc2l0aW9uX3NlYyIsImlzRmlyc3RFcnJvciIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX0RBU0giLCJpc0xvb3AiLCJlbGVtZW50IiwiY3JlYXRlIiwiZGFzaGpzIiwiTWVkaWFQbGF5ZXIiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJpbml0aWFsaXplIiwic3BlYyIsIm5hbWUiLCJleHRlbmRlZEVsZW1lbnQiLCJsaXN0ZW5lciIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJzZXRBdXRvU3dpdGNoUXVhbGl0eSIsImF0dGFjaFNvdXJjZSIsImZpbGUiLCJvbiIsImV2ZW50cyIsIkVSUk9SIiwiZXJyb3IiLCJ0ZW1wRXJyb3IiLCJFUlJPUlMiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUVVBTElUWV9DSEFOR0VfUkVRVUVTVEVEIiwiZXZlbnQiLCJtZWRpYVR5cGUiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiaXNBdXRvIiwiZ2V0QXV0b1N3aXRjaFF1YWxpdHkiLCJ0eXBlIiwiUVVBTElUWV9DSEFOR0VfUkVOREVSRUQiLCJuZXdRdWFsaXR5IiwiQ09OVEVOVF9NRVRBIiwibWV0YSIsImdldFF1YWxpdHlGb3IiLCJnZXRCaXRyYXRlSW5mb0xpc3RGb3IiLCJzdWJRdWFsaXR5TGlzdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwiYml0cmF0ZSIsImhlaWdodCIsIndpZHRoIiwiaW5kZXgiLCJxdWFsaXR5SW5kZXgiLCJsYWJlbCIsImlzRHluYW1pYyIsInBsYXkiLCJzZWVrIiwic2V0Q3VycmVudFF1YWxpdHkiLCJnZXRTdGF0ZSIsIlNUQVRFX1BMQVlJTkciLCJzZXRRdWFsaXR5Rm9yIiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiZGVzdHJveSIsInJlc2V0IiwiRXJyb3IiLCJzaXplSHVtYW5pemVyIiwiYnl0ZXMiLCJzaSIsInBvc3RwaXgiLCJ0aHJlc2giLCJNYXRoIiwiYWJzIiwidW5pdCIsInVuaXRzIiwidSIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7QUFLQSxJQUFNQSxZQUFZO0FBQ2RDLGNBQVcsVUFERztBQUVkQyxtQkFBZ0I7QUFGRixDQUFsQixDLENBZEE7Ozs7QUFrQkEsSUFBTUMsT0FBTyxTQUFQQSxJQUFPLENBQVNDLFNBQVQsRUFBb0JDLFlBQXBCLEVBQWlDO0FBQzFDLFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLGVBQWUsS0FBbkI7O0FBRUEsUUFBSUMsZUFBZSwwQkFBYVAsU0FBYixFQUF3QlEsd0JBQXhCLEVBQXVDUCxhQUFhUSxNQUFiLEVBQXZDLENBQW5CO0FBQ0EsUUFBSUMsVUFBV0gsYUFBYUksTUFBYixFQUFmOztBQUVBLFFBQUk7QUFDQVIsZUFBT1MsT0FBT0MsV0FBUCxHQUFxQkYsTUFBckIsRUFBUDtBQUNBUixhQUFL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LFFBQVEsQ0FBQyxNQUFJRCxJQUFMLEVBQVUsTUFBSUEsSUFBZCxFQUFtQixNQUFJQSxJQUF2QixFQUE0QixNQUFJQSxJQUFoQyxFQUFxQyxNQUFJQSxJQUF6QyxFQUE4QyxNQUFJQSxJQUFsRCxFQUF1RCxNQUFJQSxJQUEzRCxFQUFnRSxNQUFJQSxJQUFwRSxDQUFaO0FBQ0c7QUFDSCxRQUFJRSxJQUFJLENBQUMsQ0FBVDtBQUNBLE9BQUc7QUFDQ1IsaUJBQVNHLE1BQVQ7QUFDQSxVQUFFSyxDQUFGO0FBQ0gsS0FIRCxRQUdRSixLQUFLQyxHQUFMLENBQVNMLEtBQVQsS0FBbUJHLE1BQW5CLElBQTZCSyxJQUFJRCxNQUFNNUIsTUFBTixHQUFlLENBSHhEO0FBSUEsV0FBT3FCLE1BQU1TLE9BQU4sQ0FBYyxDQUFkLElBQWlCRixNQUFNQyxDQUFOLENBQXhCO0FBQ0gsQ0FkRDs7cUJBZ0JlVCxhIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAxNC4uXHJcbiAqL1xyXG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQgc2l6ZUh1bWFuaXplciBmcm9tIFwidXRpbHMvc2l6ZUh1bWFuaXplclwiO1xyXG5pbXBvcnQge1NUQVRFX0lETEUsIEVSUk9SUywgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiwgQ09OVEVOVF9MRVZFTF9DSEFOR0VELCAgU1RBVEVfUExBWUlORywgUFJPVklERVJfREFTSCwgQ09OVEVOVF9NRVRBfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIGRhc2hqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcbmNvbnN0IERBU0hFUlJPUiA9IHtcclxuICAgIERPV05MT0FEIDogXCJkb3dubG9hZFwiLFxyXG4gICAgTUFOSUZFU1RFUlJPUiA6IFwibWFuaWZlc3RFcnJvclwiXHJcbn07XHJcbmNvbnN0IERhc2ggPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGRhc2ggPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcclxuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcclxuICAgIGxldCBpc0ZpcnN0RXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgUFJPVklERVJfREFTSCwgcGxheWVyQ29uZmlnLmlzTG9vcCgpKTtcclxuICAgIGxldCBlbGVtZW50ID0gIG1lZGlhTWFuYWdlci5jcmVhdGUoKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGRhc2ggPSBkYXNoanMuTWVkaWFQbGF5ZXIoKS5jcmVhdGUoKTtcclxuICAgICAgICBkYXNoLmdldERlYnVnKCkuc2V0TG9nVG9Ccm93c2VyQ29uc29sZShmYWxzZSk7XHJcbiAgICAgICAgZGFzaC5pbml0aWFsaXplKGVsZW1lbnQsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICAgICAgbmFtZSA6IFBST1ZJREVSX0RBU0gsXHJcbiAgICAgICAgICAgIGV4dGVuZGVkRWxlbWVudCA6IGRhc2gsXHJcbiAgICAgICAgICAgIGxpc3RlbmVyIDogbnVsbCxcclxuICAgICAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0xpdmUgOiBmYWxzZSxcclxuICAgICAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXHJcbiAgICAgICAgICAgIGJ1ZmZlciA6IDAsXHJcbiAgICAgICAgICAgIGZyYW1lcmF0ZSA6IDAsXHJcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXHJcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcclxuICAgICAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxyXG4gICAgICAgICAgICBzb3VyY2VzIDogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBmdW5jdGlvbihzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIisgbGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHkodHJ1ZSk7XHJcbiAgICAgICAgICAgIGRhc2guYXR0YWNoU291cmNlKHNvdXJjZS5maWxlKTtcclxuICAgICAgICAgICAgc2Vla1Bvc2l0aW9uX3NlYyA9IGxhc3RQbGF5UG9zaXRpb247XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuRVJST1IsIGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgaWYoZXJyb3IgJiYgIWlzRmlyc3RFcnJvciAmJiAoIGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuRE9XTkxPQUQgfHwgZXJyb3IuZXJyb3IgPT09IERBU0hFUlJPUi5NQU5JRkVTVEVSUk9SICkpe1xyXG4gICAgICAgICAgICAgICAgaXNGaXJzdEVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIGVycm9yVHJpZ2dlcih0ZW1wRXJyb3IsIHRoYXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgaWYoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKXtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMX0NIQU5HRUQsIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHkoKSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogc3BlYy5jdXJyZW50UXVhbGl0eSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlIDogXCJyZXF1ZXN0XCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVELCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50ICYmIGV2ZW50Lm1lZGlhVHlwZSAmJiBldmVudC5tZWRpYVR5cGUgPT09IFwidmlkZW9cIil7XHJcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZXZlbnQubmV3UXVhbGl0eTtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihDT05URU5UX0xFVkVMX0NIQU5HRUQsIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHkoKSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogZXZlbnQubmV3UXVhbGl0eSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlIDogXCJyZW5kZXJcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhhdC5vbihDT05URU5UX01FVEEsIGZ1bmN0aW9uKG1ldGEpe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJHZXRTdHJlYW1JbmZvICA6IFwiLCBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpW2Rhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpXSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3ViUXVhbGl0eUxpc3QgPSBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKTtcclxuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc3ViUXVhbGl0eUxpc3QubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgICAgIHNwZWMucXVhbGl0eUxldmVscy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBiaXRyYXRlOiBzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogc3ViUXVhbGl0eUxpc3RbaV0ucXVhbGl0eUluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsIDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGgrXCJ4XCIrc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0K1wiLCBcIisgc2l6ZUh1bWFuaXplcihzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCB0cnVlLCBcImJwc1wiKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGRhc2guaXNEeW5hbWljKCkpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoc2Vla1Bvc2l0aW9uX3NlYyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGFzaC5zZWVrKHNlZWtQb3NpdGlvbl9zZWMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhhdCk7XHJcbiAgICAgICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYodGhhdC5nZXRTdGF0ZSgpICE9PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBxdWFsaXR5SW5kZXg7XHJcbiAgICAgICAgICAgIGlmKGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHkoKSl7XHJcbiAgICAgICAgICAgICAgICBkYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5KGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXNoLnNldFF1YWxpdHlGb3IoXCJ2aWRlb1wiLCBxdWFsaXR5SW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFF1YWxpdHk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXNoLmdldEF1dG9Td2l0Y2hRdWFsaXR5KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xyXG4gICAgICAgICAgICBkYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5KGlzQXV0byk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICAgICAgZGFzaC5yZXNldCgpO1xyXG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XHJcblxyXG4gICAgICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xyXG4gICAgICAgIH07XHJcbiAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaDtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTQuLlxyXG4gKi9cclxuXHJcbmNvbnN0IHNpemVIdW1hbml6ZXIgPSBmdW5jdGlvbiAoYnl0ZXMsIHNpLCBwb3N0cGl4KSB7XHJcbiAgICBsZXQgdGhyZXNoID0gc2kgPyAxMDAwIDogMTAyNDtcclxuICAgIGlmKE1hdGguYWJzKGJ5dGVzKSA8IHRocmVzaCkge1xyXG4gICAgICAgIHJldHVybiBieXRlcyArICcgQic7XHJcbiAgICB9XHJcbiAgICBsZXQgdW5pdCA9IHBvc3RwaXh8fFwiQlwiO1xyXG4gICAgbGV0IHVuaXRzID0gWydrJyt1bml0LCdNJyt1bml0LCdHJyt1bml0LCdUJyt1bml0LCdQJyt1bml0LCdFJyt1bml0LCdaJyt1bml0LCdZJyt1bml0XTtcclxuICAgICAgIC8vID8gWydrQicsJ01CJywnR0InLCdUQicsJ1BCJywnRUInLCdaQicsJ1lCJ106IFsnS2lCJywnTWlCJywnR2lCJywnVGlCJywnUGlCJywnRWlCJywnWmlCJywnWWlCJ107XHJcbiAgICBsZXQgdSA9IC0xO1xyXG4gICAgZG8ge1xyXG4gICAgICAgIGJ5dGVzIC89IHRocmVzaDtcclxuICAgICAgICArK3U7XHJcbiAgICB9IHdoaWxlKE1hdGguYWJzKGJ5dGVzKSA+PSB0aHJlc2ggJiYgdSA8IHVuaXRzLmxlbmd0aCAtIDEpO1xyXG4gICAgcmV0dXJuIGJ5dGVzLnRvRml4ZWQoMSkrdW5pdHNbdV07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNpemVIdW1hbml6ZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==