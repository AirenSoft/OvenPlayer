/*! OvenPlayerv0.7.751 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_DASH);
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
                (0, _utils.errorTrigger)({ code: _constants.PLAYER_UNKNWON_NEWWORK_ERROR, reason: "Unknown network error", message: "Unknown network error" }, that);
            }
        });

        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, function (event) {
            console.log("QUALITY_CHANGE_REQUESTED : ", event);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJjb250YWluZXIiLCJwbGF5ZXJDb25maWciLCJ0aGF0IiwiZGFzaCIsInN1cGVyRGVzdHJveV9mdW5jIiwic2Vla1Bvc2l0aW9uX3NlYyIsImlzRmlyc3RFcnJvciIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX0RBU0giLCJlbGVtZW50IiwiY3JlYXRlIiwiZGFzaGpzIiwiTWVkaWFQbGF5ZXIiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJpbml0aWFsaXplIiwic3BlYyIsIm5hbWUiLCJleHRlbmRlZEVsZW1lbnQiLCJsaXN0ZW5lciIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJzZXRBdXRvU3dpdGNoUXVhbGl0eSIsImF0dGFjaFNvdXJjZSIsImZpbGUiLCJvbiIsImV2ZW50cyIsIkVSUk9SIiwiZXJyb3IiLCJjb2RlIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsInJlYXNvbiIsIm1lc3NhZ2UiLCJRVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQiLCJldmVudCIsImNvbnNvbGUiLCJtZWRpYVR5cGUiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiaXNBdXRvIiwiZ2V0QXV0b1N3aXRjaFF1YWxpdHkiLCJ0eXBlIiwiUVVBTElUWV9DSEFOR0VfUkVOREVSRUQiLCJuZXdRdWFsaXR5IiwiQ09OVEVOVF9NRVRBIiwibWV0YSIsImdldFF1YWxpdHlGb3IiLCJnZXRCaXRyYXRlSW5mb0xpc3RGb3IiLCJzdWJRdWFsaXR5TGlzdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwiYml0cmF0ZSIsImhlaWdodCIsIndpZHRoIiwiaW5kZXgiLCJxdWFsaXR5SW5kZXgiLCJsYWJlbCIsImlzRHluYW1pYyIsInBsYXkiLCJzZWVrIiwic2V0Q3VycmVudFF1YWxpdHkiLCJnZXRTdGF0ZSIsIlNUQVRFX1BMQVlJTkciLCJzZXRRdWFsaXR5Rm9yIiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiZGVzdHJveSIsInJlc2V0IiwiRXJyb3IiLCJzaXplSHVtYW5pemVyIiwiYnl0ZXMiLCJzaSIsInBvc3RwaXgiLCJ0aHJlc2giLCJNYXRoIiwiYWJzIiwidW5pdCIsInVuaXRzIiwidSIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7QUFLQSxJQUFNQSxZQUFZO0FBQ2RDLGNBQVcsVUFERztBQUVkQyxtQkFBZ0I7QUFGRixDQUFsQixDLENBZEE7Ozs7QUFrQkEsSUFBTUMsT0FBTyxTQUFQQSxJQUFPLENBQVNDLFNBQVQsRUFBb0JDLFlBQXBCLEVBQWlDO0FBQzFDLFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLGVBQWUsS0FBbkI7O0FBRUEsUUFBSUMsZUFBZSwwQkFBYVAsU0FBYixFQUF3QlEsd0JBQXhCLENBQW5CO0FBQ0EsUUFBSUMsVUFBV0YsYUFBYUcsTUFBYixFQUFmOztBQUVBLFFBQUk7QUFDQVAsZUFBT1EsT0FBT0MsV0FBUCxHQUFxQkYsTUFBckIsRUFBUDtBQUNBUCxhQUFLVSxRQUFMLEdBQWdCQyxzQkFBaEIsQ0FBdUMsS0FB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QUwsRUFBVSxNQUFJQSxJQUFkLEVBQW1CLE1BQUlBLElBQXZCLEVBQTRCLE1BQUlBLElBQWhDLEVBQXFDLE1BQUlBLElBQXpDLEVBQThDLE1BQUlBLElBQWxELEVBQXVELE1BQUlBLElBQTNELEVBQWdFLE1BQUlBLElBQXBFLENBQVo7QUFDRztBQUNILFFBQUlFLElBQUksQ0FBQyxDQUFUO0FBQ0EsT0FBRztBQUNDUixpQkFBU0csTUFBVDtBQUNBLFVBQUVLLENBQUY7QUFDSCxLQUhELFFBR1FKLEtBQUtDLEdBQUwsQ0FBU0wsS0FBVCxLQUFtQkcsTUFBbkIsSUFBNkJLLElBQUlELE1BQU01QixNQUFOLEdBQWUsQ0FIeEQ7QUFJQSxXQUFPcUIsTUFBTVMsT0FBTixDQUFjLENBQWQsSUFBaUJGLE1BQU1DLENBQU4sQ0FBeEI7QUFDSCxDQWREOztxQkFnQmVULGEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDE0Li5cclxuICovXHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCBzaXplSHVtYW5pemVyIGZyb20gXCJ1dGlscy9zaXplSHVtYW5pemVyXCI7XHJcbmltcG9ydCB7U1RBVEVfSURMRSwgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiwgQ09OVEVOVF9MRVZFTF9DSEFOR0VELCAgU1RBVEVfUExBWUlORywgUFJPVklERVJfREFTSCwgQ09OVEVOVF9NRVRBfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIGRhc2hqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcbmNvbnN0IERBU0hFUlJPUiA9IHtcclxuICAgIERPV05MT0FEIDogXCJkb3dubG9hZFwiLFxyXG4gICAgTUFOSUZFU1RFUlJPUiA6IFwibWFuaWZlc3RFcnJvclwiXHJcbn07XHJcbmNvbnN0IERhc2ggPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGRhc2ggPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcclxuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcclxuICAgIGxldCBpc0ZpcnN0RXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgUFJPVklERVJfREFTSCk7XHJcbiAgICBsZXQgZWxlbWVudCA9ICBtZWRpYU1hbmFnZXIuY3JlYXRlKCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBkYXNoID0gZGFzaGpzLk1lZGlhUGxheWVyKCkuY3JlYXRlKCk7XHJcbiAgICAgICAgZGFzaC5nZXREZWJ1ZygpLnNldExvZ1RvQnJvd3NlckNvbnNvbGUoZmFsc2UpO1xyXG4gICAgICAgIGRhc2guaW5pdGlhbGl6ZShlbGVtZW50LCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgbGV0IHNwZWMgPSB7XHJcbiAgICAgICAgICAgIG5hbWUgOiBQUk9WSURFUl9EQVNILFxyXG4gICAgICAgICAgICBleHRlbmRlZEVsZW1lbnQgOiBkYXNoLFxyXG4gICAgICAgICAgICBsaXN0ZW5lciA6IG51bGwsXHJcbiAgICAgICAgICAgIGNhblNlZWsgOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNMaXZlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxyXG4gICAgICAgICAgICBidWZmZXIgOiAwLFxyXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxyXG4gICAgICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXHJcbiAgICAgICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcclxuICAgICAgICAgICAgc291cmNlcyA6IFtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24oc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IG9uRXh0ZW5kZWRMb2FkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICBkYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5KHRydWUpO1xyXG4gICAgICAgICAgICBkYXNoLmF0dGFjaFNvdXJjZShzb3VyY2UuZmlsZSk7XHJcbiAgICAgICAgICAgIHNlZWtQb3NpdGlvbl9zZWMgPSBsYXN0UGxheVBvc2l0aW9uO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLkVSUk9SLCBmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgIGlmKGVycm9yICYmICFpc0ZpcnN0RXJyb3IgJiYgKCBlcnJvci5lcnJvciA9PT0gREFTSEVSUk9SLkRPV05MT0FEIHx8IGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuTUFOSUZFU1RFUlJPUiApKXtcclxuICAgICAgICAgICAgICAgIGlzRmlyc3RFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBlcnJvclRyaWdnZXIoe2NvZGUgOiBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gbmV0d29yayBlcnJvclwiLCBtZXNzYWdlIDogXCJVbmtub3duIG5ldHdvcmsgZXJyb3JcIn0sIHRoYXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJRVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQgOiBcIiwgZXZlbnQpO1xyXG4gICAgICAgICAgICBpZihldmVudCAmJiBldmVudC5tZWRpYVR5cGUgJiYgZXZlbnQubWVkaWFUeXBlID09PSBcInZpZGVvXCIpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBzcGVjLmN1cnJlbnRRdWFsaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgOiBcInJlcXVlc3RcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVOREVSRUQsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgaWYoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKXtcclxuICAgICAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBldmVudC5uZXdRdWFsaXR5O1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBldmVudC5uZXdRdWFsaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgOiBcInJlbmRlclwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGF0Lm9uKENPTlRFTlRfTUVUQSwgZnVuY3Rpb24obWV0YSl7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkdldFN0cmVhbUluZm8gIDogXCIsIGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJylbZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIildKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdWJRdWFsaXR5TGlzdCA9IGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpO1xyXG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIik7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdWJRdWFsaXR5TGlzdC5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICAgICAgc3BlYy5xdWFsaXR5TGV2ZWxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGJpdHJhdGU6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBzdWJRdWFsaXR5TGlzdFtpXS5xdWFsaXR5SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCtcInhcIitzdWJRdWFsaXR5TGlzdFtpXS5oZWlnaHQrXCIsIFwiKyBzaXplSHVtYW5pemVyKHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsIHRydWUsIFwiYnBzXCIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZGFzaC5pc0R5bmFtaWMoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihzZWVrUG9zaXRpb25fc2VjKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXNoLnNlZWsoc2Vla1Bvc2l0aW9uX3NlYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGF0KTtcclxuICAgICAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IHF1YWxpdHlJbmRleDtcclxuICAgICAgICAgICAgaWYoZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eSgpKXtcclxuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHkoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhc2guc2V0UXVhbGl0eUZvcihcInZpZGVvXCIsIHF1YWxpdHlJbmRleCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50UXVhbGl0eTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHkoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XHJcbiAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHkoaXNBdXRvKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgICAgICBkYXNoLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcclxuXHJcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1jYXRjaChlcnJvcil7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXNoO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxNC4uXHJcbiAqL1xyXG5cclxuY29uc3Qgc2l6ZUh1bWFuaXplciA9IGZ1bmN0aW9uIChieXRlcywgc2ksIHBvc3RwaXgpIHtcclxuICAgIGxldCB0aHJlc2ggPSBzaSA/IDEwMDAgOiAxMDI0O1xyXG4gICAgaWYoTWF0aC5hYnMoYnl0ZXMpIDwgdGhyZXNoKSB7XHJcbiAgICAgICAgcmV0dXJuIGJ5dGVzICsgJyBCJztcclxuICAgIH1cclxuICAgIGxldCB1bml0ID0gcG9zdHBpeHx8XCJCXCI7XHJcbiAgICBsZXQgdW5pdHMgPSBbJ2snK3VuaXQsJ00nK3VuaXQsJ0cnK3VuaXQsJ1QnK3VuaXQsJ1AnK3VuaXQsJ0UnK3VuaXQsJ1onK3VuaXQsJ1knK3VuaXRdO1xyXG4gICAgICAgLy8gPyBbJ2tCJywnTUInLCdHQicsJ1RCJywnUEInLCdFQicsJ1pCJywnWUInXTogWydLaUInLCdNaUInLCdHaUInLCdUaUInLCdQaUInLCdFaUInLCdaaUInLCdZaUInXTtcclxuICAgIGxldCB1ID0gLTE7XHJcbiAgICBkbyB7XHJcbiAgICAgICAgYnl0ZXMgLz0gdGhyZXNoO1xyXG4gICAgICAgICsrdTtcclxuICAgIH0gd2hpbGUoTWF0aC5hYnMoYnl0ZXMpID49IHRocmVzaCAmJiB1IDwgdW5pdHMubGVuZ3RoIC0gMSk7XHJcbiAgICByZXR1cm4gYnl0ZXMudG9GaXhlZCgxKSt1bml0c1t1XTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2l6ZUh1bWFuaXplcjsiXSwic291cmNlUm9vdCI6IiJ9