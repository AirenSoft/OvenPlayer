/*! OvenPlayerv0.7.71 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

        /*dash.on("streamInitialized", function () {
            ;
           // dash.setQualityFor("video", 3);
            console.log('My streamInitialized:', dash.getAutoSwitchQuality());
        });*/

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
            console.log("IsAUTO : ", dash.getAutoSwitchQuality());
            if (dash.getAutoSwitchQuality()) {
                dash.setAutoSwitchQuality(false);
            }
            dash.setQualityFor("video", qualityIndex);
            spec.currentQuality = dash.getQualityFor("video");
            that.trigger(_constants.CONTENT_LEVEL_CHANGED, {
                currentQuality: spec.currentQuality
            });
            return spec.currentQuality;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJjb250YWluZXIiLCJwbGF5ZXJDb25maWciLCJ0aGF0IiwiZGFzaCIsInN1cGVyRGVzdHJveV9mdW5jIiwic2Vla1Bvc2l0aW9uX3NlYyIsImlzRmlyc3RFcnJvciIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX0RBU0giLCJlbGVtZW50IiwiY3JlYXRlIiwiZGFzaGpzIiwiTWVkaWFQbGF5ZXIiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJpbml0aWFsaXplIiwic3BlYyIsIm5hbWUiLCJleHRlbmRlZEVsZW1lbnQiLCJsaXN0ZW5lciIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJhdHRhY2hTb3VyY2UiLCJmaWxlIiwib24iLCJldmVudHMiLCJFUlJPUiIsImVycm9yIiwiY29kZSIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwiQ09OVEVOVF9NRVRBIiwibWV0YSIsImdldFF1YWxpdHlGb3IiLCJnZXRCaXRyYXRlSW5mb0xpc3RGb3IiLCJzdWJRdWFsaXR5TGlzdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwiYml0cmF0ZSIsImhlaWdodCIsIndpZHRoIiwiaW5kZXgiLCJxdWFsaXR5SW5kZXgiLCJsYWJlbCIsImlzRHluYW1pYyIsInBsYXkiLCJzZWVrIiwic2V0Q3VycmVudFF1YWxpdHkiLCJjb25zb2xlIiwiZ2V0QXV0b1N3aXRjaFF1YWxpdHkiLCJzZXRBdXRvU3dpdGNoUXVhbGl0eSIsInNldFF1YWxpdHlGb3IiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiZGVzdHJveSIsInJlc2V0IiwiRXJyb3IiLCJzaXplSHVtYW5pemVyIiwiYnl0ZXMiLCJzaSIsInBvc3RwaXgiLCJ0aHJlc2giLCJNYXRoIiwiYWJzIiwidW5pdCIsInVuaXRzIiwidSIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7QUFLQSxJQUFNQSxZQUFZO0FBQ2RDLGNBQVcsVUFERztBQUVkQyxtQkFBZ0I7QUFGRixDQUFsQixDLENBZEE7Ozs7QUFrQkEsSUFBTUMsT0FBTyxTQUFQQSxJQUFPLENBQVNDLFNBQVQsRUFBb0JDLFlBQXBCLEVBQWlDO0FBQzFDLFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLG9CQUFvQixJQUF4QjtBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLGVBQWUsS0FBbkI7O0FBRUEsUUFBSUMsZUFBZSwwQkFBYVAsU0FBYixFQUF3QlEsd0JBQXhCLENBQW5CO0FBQ0EsUUFBSUMsVUFBV0YsYUFBYUcsTUFBYixFQUFmOztBQUVBLFFBQUk7QUFDQVAsZUFBT1EsT0FBT0MsV0FBUCxHQUFxQkYsTUFBckIsRUFBUDtBQUNBUCxhQUFLVSxRQUFMLEdBQWdCQyxzQkFBaEIsQ0FBdUMsS0FBdkM7QUFDQVgsYUFBS1ksVUFBTCxDQUFnQk4sT0FBaEIsRUFBeUIsSUFBekIsRUFBK0IsS0FBL0I7QUFDQSxZQUFJTyxPQUFPO0FBQ1BDLGtCQUFPVCx3QkFEQTtBQUVQVSw2QkFBa0JmLElBRlg7QUFHUGdCLHNCQUFXLElBSEo7QUFJUEMscUJBQVUsS0FKSDtBQUtQQyxvQkFBUyxLQUxG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LE1BQUlBLElBQWhDLEVBQXFDLE1BQUlBLElBQXpDLEVBQThDLE1BQUlBLElBQWxELEVBQXVELE1BQUlBLElBQTNELEVBQWdFLE1BQUlBLElBQXBFLENBQVo7QUFDRztBQUNILFFBQUlFLElBQUksQ0FBQyxDQUFUO0FBQ0EsT0FBRztBQUNDUixpQkFBU0csTUFBVDtBQUNBLFVBQUVLLENBQUY7QUFDSCxLQUhELFFBR1FKLEtBQUtDLEdBQUwsQ0FBU0wsS0FBVCxLQUFtQkcsTUFBbkIsSUFBNkJLLElBQUlELE1BQU03QixNQUFOLEdBQWUsQ0FIeEQ7QUFJQSxXQUFPc0IsTUFBTVMsT0FBTixDQUFjLENBQWQsSUFBaUJGLE1BQU1DLENBQU4sQ0FBeEI7QUFDSCxDQWREOztxQkFnQmVULGEiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDE0Li5cclxuICovXHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCBzaXplSHVtYW5pemVyIGZyb20gXCJ1dGlscy9zaXplSHVtYW5pemVyXCI7XHJcbmltcG9ydCB7U1RBVEVfSURMRSwgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiwgQ09OVEVOVF9MRVZFTF9DSEFOR0VELCAgUFJPVklERVJfREFTSCwgQ09OVEVOVF9NRVRBfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIGRhc2hqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcbmNvbnN0IERBU0hFUlJPUiA9IHtcclxuICAgIERPV05MT0FEIDogXCJkb3dubG9hZFwiLFxyXG4gICAgTUFOSUZFU1RFUlJPUiA6IFwibWFuaWZlc3RFcnJvclwiXHJcbn07XHJcbmNvbnN0IERhc2ggPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGRhc2ggPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jID0gbnVsbDtcclxuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcclxuICAgIGxldCBpc0ZpcnN0RXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgUFJPVklERVJfREFTSCk7XHJcbiAgICBsZXQgZWxlbWVudCA9ICBtZWRpYU1hbmFnZXIuY3JlYXRlKCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBkYXNoID0gZGFzaGpzLk1lZGlhUGxheWVyKCkuY3JlYXRlKCk7XHJcbiAgICAgICAgZGFzaC5nZXREZWJ1ZygpLnNldExvZ1RvQnJvd3NlckNvbnNvbGUoZmFsc2UpO1xyXG4gICAgICAgIGRhc2guaW5pdGlhbGl6ZShlbGVtZW50LCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgbGV0IHNwZWMgPSB7XHJcbiAgICAgICAgICAgIG5hbWUgOiBQUk9WSURFUl9EQVNILFxyXG4gICAgICAgICAgICBleHRlbmRlZEVsZW1lbnQgOiBkYXNoLFxyXG4gICAgICAgICAgICBsaXN0ZW5lciA6IG51bGwsXHJcbiAgICAgICAgICAgIGNhblNlZWsgOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNMaXZlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxyXG4gICAgICAgICAgICBidWZmZXIgOiAwLFxyXG4gICAgICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxyXG4gICAgICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXHJcbiAgICAgICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcclxuICAgICAgICAgICAgc291cmNlcyA6IFtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24oc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IG9uRXh0ZW5kZWRMb2FkIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgICAgICBkYXNoLmF0dGFjaFNvdXJjZShzb3VyY2UuZmlsZSk7XHJcbiAgICAgICAgICAgIHNlZWtQb3NpdGlvbl9zZWMgPSBsYXN0UGxheVBvc2l0aW9uO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLkVSUk9SLCBmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgIGlmKGVycm9yICYmICFpc0ZpcnN0RXJyb3IgJiYgKCBlcnJvci5lcnJvciA9PT0gREFTSEVSUk9SLkRPV05MT0FEIHx8IGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuTUFOSUZFU1RFUlJPUiApKXtcclxuICAgICAgICAgICAgICAgIGlzRmlyc3RFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBlcnJvclRyaWdnZXIoe2NvZGUgOiBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SLCByZWFzb24gOiBcIlVua25vd24gbmV0d29yayBlcnJvclwiLCBtZXNzYWdlIDogXCJVbmtub3duIG5ldHdvcmsgZXJyb3JcIn0sIHRoYXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAvKmRhc2gub24oXCJzdHJlYW1Jbml0aWFsaXplZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAvLyBkYXNoLnNldFF1YWxpdHlGb3IoXCJ2aWRlb1wiLCAzKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ015IHN0cmVhbUluaXRpYWxpemVkOicsIGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHkoKSk7XHJcbiAgICAgICAgfSk7Ki9cclxuXHJcblxyXG4gICAgICAgIHRoYXQub24oQ09OVEVOVF9NRVRBLCBmdW5jdGlvbihtZXRhKXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiR2V0U3RyZWFtSW5mbyAgOiBcIiwgZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKVtkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKV0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgc3ViUXVhbGl0eUxpc3QgPSBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKTtcclxuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc3ViUXVhbGl0eUxpc3QubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgICAgIHNwZWMucXVhbGl0eUxldmVscy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBiaXRyYXRlOiBzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogc3ViUXVhbGl0eUxpc3RbaV0ucXVhbGl0eUluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsIDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGgrXCJ4XCIrc3ViUXVhbGl0eUxpc3RbaV0uaGVpZ2h0K1wiLCBcIisgc2l6ZUh1bWFuaXplcihzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCB0cnVlLCBcImJwc1wiKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGRhc2guaXNEeW5hbWljKCkpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoc2Vla1Bvc2l0aW9uX3NlYyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGFzaC5zZWVrKHNlZWtQb3NpdGlvbl9zZWMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhhdCk7XHJcbiAgICAgICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJJc0FVVE8gOiBcIiwgZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eSgpKTtcclxuICAgICAgICAgICAgaWYoZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eSgpKXtcclxuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHkoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhc2guc2V0UXVhbGl0eUZvcihcInZpZGVvXCIsIHF1YWxpdHlJbmRleCk7XHJcbiAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFF1YWxpdHk6IHNwZWMuY3VycmVudFF1YWxpdHlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgICAgIGRhc2gucmVzZXQoKTtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgZWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG5cclxuICAgICAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcclxuICAgICAgICB9O1xyXG4gICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2g7XHJcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxNC4uXG4gKi9cblxuY29uc3Qgc2l6ZUh1bWFuaXplciA9IGZ1bmN0aW9uIChieXRlcywgc2ksIHBvc3RwaXgpIHtcbiAgICBsZXQgdGhyZXNoID0gc2kgPyAxMDAwIDogMTAyNDtcbiAgICBpZihNYXRoLmFicyhieXRlcykgPCB0aHJlc2gpIHtcbiAgICAgICAgcmV0dXJuIGJ5dGVzICsgJyBCJztcbiAgICB9XG4gICAgbGV0IHVuaXQgPSBwb3N0cGl4fHxcIkJcIjtcbiAgICBsZXQgdW5pdHMgPSBbJ2snK3VuaXQsJ00nK3VuaXQsJ0cnK3VuaXQsJ1QnK3VuaXQsJ1AnK3VuaXQsJ0UnK3VuaXQsJ1onK3VuaXQsJ1knK3VuaXRdO1xuICAgICAgIC8vID8gWydrQicsJ01CJywnR0InLCdUQicsJ1BCJywnRUInLCdaQicsJ1lCJ106IFsnS2lCJywnTWlCJywnR2lCJywnVGlCJywnUGlCJywnRWlCJywnWmlCJywnWWlCJ107XG4gICAgbGV0IHUgPSAtMTtcbiAgICBkbyB7XG4gICAgICAgIGJ5dGVzIC89IHRocmVzaDtcbiAgICAgICAgKyt1O1xuICAgIH0gd2hpbGUoTWF0aC5hYnMoYnl0ZXMpID49IHRocmVzaCAmJiB1IDwgdW5pdHMubGVuZ3RoIC0gMSk7XG4gICAgcmV0dXJuIGJ5dGVzLnRvRml4ZWQoMSkrdW5pdHNbdV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNpemVIdW1hbml6ZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==