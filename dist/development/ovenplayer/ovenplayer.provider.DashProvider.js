/*! OvenPlayerv0.9.750 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

        window.op_dash = dash;

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

            if (source.lowLatency) {

                dash.setLowLatencyEnabled(source.lowLatency);

                if (playerConfig.getConfig().lowLatencyMpdLiveDelay && typeof playerConfig.getConfig().lowLatencyMpdLiveDelay === 'number') {

                    dash.setLiveDelay(playerConfig.getConfig().lowLatencyMpdLiveDelay);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyUGxheV9mdW5jIiwic3VwZXJEZXN0cm95X2Z1bmMiLCJzZWVrUG9zaXRpb25fc2VjIiwiaXNGaXJzdEVycm9yIiwiaXNEYXNoTWV0YUxvYWRlZCIsInJ1bmVkQXV0b1N0YXJ0Iiwic291cmNlT2ZGaWxlIiwiY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiaXNBdXRvIiwiZGFzaGpzIiwiVmVyc2lvbiIsInNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwicmVzdWx0IiwiZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IiLCJNZWRpYVBsYXllciIsImNyZWF0ZSIsIndpbmRvdyIsIm9wX2Rhc2giLCJFUlJPUlMiLCJjb2RlcyIsIklOSVRfREFTSF9VTlNVUFBPUlQiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJpbml0aWFsaXplIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9EQVNIIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJsYXN0UGxheVBvc2l0aW9uIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJmaWxlIiwibG93TGF0ZW5jeSIsInNldExvd0xhdGVuY3lFbmFibGVkIiwiZ2V0Q29uZmlnIiwibG93TGF0ZW5jeU1wZExpdmVEZWxheSIsInNldExpdmVEZWxheSIsImF0dGFjaFNvdXJjZSIsIm9uIiwiZXZlbnRzIiwiRVJST1IiLCJlcnJvciIsInRlbXBFcnJvciIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJRVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQiLCJldmVudCIsIm1lZGlhVHlwZSIsInRyaWdnZXIiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJ0eXBlIiwiUVVBTElUWV9DSEFOR0VfUkVOREVSRUQiLCJuZXdRdWFsaXR5IiwiUExBWUJBQ0tfTUVUQURBVEFfTE9BREVEIiwiZ2V0UXVhbGl0eUZvciIsImdldEJpdHJhdGVJbmZvTGlzdEZvciIsInN1YlF1YWxpdHlMaXN0IiwiaSIsImxlbmd0aCIsIl8iLCJmaW5kV2hlcmUiLCJiaXRyYXRlIiwiaGVpZ2h0Iiwid2lkdGgiLCJwdXNoIiwiaW5kZXgiLCJxdWFsaXR5SW5kZXgiLCJsYWJlbCIsInNlZWsiLCJpc0F1dG9TdGFydCIsInBsYXkiLCJpc0R5bmFtaWMiLCJtdXRlZFBsYXkiLCJyZXRyeUNvdW50IiwiZ2V0U3RhdGUiLCJTVEFURV9BRF9QTEFZSU5HIiwiU1RBVEVfQURfUEFVU0VEIiwiYXR0YWNoVmlldyIsImNoZWNrRGFzaE1ldGFMb2FkZWQiLCJzZXRUaW1lb3V0Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJTVEFURV9QTEFZSU5HIiwic2V0UXVhbGl0eUZvciIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImRlc3Ryb3kiLCJyZXNldCIsImNvZGUiLCJJTklUX0RBU0hfTk9URk9VTkQiLCJzaXplSHVtYW5pemVyIiwiYnl0ZXMiLCJzaSIsInBvc3RwaXgiLCJ0aHJlc2giLCJNYXRoIiwiYWJzIiwidW5pdCIsInVuaXRzIiwidSIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQVlBOzs7Ozs7QUFFQTs7Ozs7QUFLQSxJQUFNQSxZQUFZO0FBQ2RDLGNBQVcsVUFERztBQUVkQyxtQkFBZ0I7QUFGRixDQUFsQixDLENBekJBOzs7O0FBNkJBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFTQyxPQUFULEVBQWtCQyxZQUFsQixFQUFnQ0MsUUFBaEMsRUFBeUM7QUFDbEQsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsT0FBTyxJQUFYO0FBQ0EsUUFBSUMsaUJBQWlCLElBQXJCO0FBQ0EsUUFBSUMsb0JBQW9CLElBQXhCO0FBQ0EsUUFBSUMsbUJBQW1CLENBQXZCO0FBQ0EsUUFBSUMsZUFBZSxLQUFuQjtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLGlCQUFpQixLQUFyQjs7QUFFQSxRQUFJQyxlQUFlLEVBQW5CO0FBQ0EsUUFBSTtBQUNBLFlBQU1DLGlDQUFpQyxTQUFqQ0EsOEJBQWlDLENBQVNDLE1BQVQsRUFBZ0I7QUFDbkQsZ0JBQUdDLE9BQU9DLE9BQVAsR0FBaUIsT0FBcEIsRUFBNEI7QUFDeEJYLHFCQUFLWSx1QkFBTCxDQUE2QixPQUE3QixFQUFzQ0gsTUFBdEM7QUFDSCxhQUZELE1BRUs7QUFDRFQscUJBQUtZLHVCQUFMLENBQTZCSCxNQUE3QjtBQUNIO0FBQ0osU0FORDtBQU9BLFlBQU1JLGlDQUFpQyxTQUFqQ0EsOEJBQWlDLEdBQVU7QUFDN0MsZ0JBQUlDLFNBQVMsRUFBYjtBQUNBLGdCQUFHSixPQUFPQyxPQUFQLEdBQWlCLE9BQXBCLEVBQTRCO0FBQ3hCRyx5QkFBU2QsS0FBS2UsdUJBQUwsQ0FBNkIsT0FBN0IsQ0FBVDtBQUNILGFBRkQsTUFFSztBQUNERCx5QkFBU2QsS0FBS2UsdUJBQUwsRUFBVDtBQUNIO0FBQ0QsbUJBQU9ELE1BQVA7QUFDSCxTQVJEO0FBU0FkLGVBQU9VLE9BQU9NLFdBQVAsR0FBcUJDLE1BQXJCLEVBQVA7O0FBRUFDLGVBQU9DLE9BQVAsR0FBaUJuQixJQUFqQjs7QUFFQSxZQUFHVSxPQUFPQyxPQUFQLEdBQWlCLE9BQXBCLEVBQTRCO0FBQ3hCLGtCQUFNUyxrQkFBT0MsS0FBUCxDQUFhQyw4QkFBYixDQUFOO0FBQ0g7QUFDRHRCLGFBQUt1QixRQUFMLEdBQWdCQyxzQkFBaEIsQ0FBdUMsS0FBdkM7QUFDQXhCLGFBQUt5QixVQUFMLENBQWdCN0IsT0FBaEIsRUFBeUIsSUFBekIsRUFBK0IsS0FBL0I7O0FBR0EsWUFBSThCLE9BQU87QUFDUEMsa0JBQU9DLHdCQURBO0FBRVBoQyxxQkFBVUEsT0FGSDtBQUdQaUMsaUJBQU03QixJQUhDO0FBSVA4QixzQkFBVyxJQUpKO0FBS1BDLHNCQUFXLEtBTEo7QUFNUEMscUJBQVUsS0FOSDtBQU9QQyxvQkFBUyxLQVBGO0FBUVBDLHFCQUFVLEtBUkg7QUFTUEMsbUJBQVFDLHFCQVREO0FBVVBDLG9CQUFTLENBVkY7QUFXUEMsdUJBQVksQ0FYTDtBQVlQQyw0QkFBaUIsQ0FBQyxDQVpYO0FBYVBDLDJCQUFnQixDQUFDLENBYlY7QUFjUEMsMkJBQWdCLEVBZFQ7QUFlUEMscUJBQVUsRUFmSDtBQWdCUDVDLHNCQUFXQTtBQWhCSixTQUFYOztBQW1CQUMsZUFBTywyQkFBUzJCLElBQVQsRUFBZTdCLFlBQWYsRUFBNkIsVUFBUzhDLE1BQVQsRUFBaUJDLGdCQUFqQixFQUFrQzs7QUFFbEVDLDhCQUFrQkMsR0FBbEIsQ0FBc0IsdUJBQXRCLEVBQStDSCxNQUEvQyxFQUF1RCx3QkFBdUJDLGdCQUE5RTtBQUNBcEMsMkNBQStCLElBQS9CO0FBQ0FELDJCQUFlb0MsT0FBT0ksSUFBdEI7O0FBRUEsZ0JBQUlKLE9BQU9LLFVBQVgsRUFBdUI7O0FBRW5CaEQscUJBQUtpRCxvQkFBTCxDQUEwQk4sT0FBT0ssVUFBakM7O0FBRUEsb0JBQUluRCxhQUFhcUQsU0FBYixHQUF5QkMsc0JBQXpCLElBQW1ELE9BQU90RCxhQUFhcUQsU0FBYixHQUF5QkMsc0JBQWhDLEtBQTRELFFBQW5ILEVBQTZIOztBQUV6SG5ELHlCQUFLb0QsWUFBTCxDQUFrQnZELGFBQWFxRCxTQUFiLEdBQXlCQyxzQkFBM0M7QUFDSDtBQUNKOztBQUVEbkQsaUJBQUtxRCxZQUFMLENBQWtCOUMsWUFBbEI7QUFDQUosK0JBQW1CeUMsZ0JBQW5CO0FBRUgsU0FuQk0sQ0FBUDtBQW9CQTNDLHlCQUFpQkYsY0FBVyxNQUFYLENBQWpCO0FBQ0FHLDRCQUFvQkgsY0FBVyxTQUFYLENBQXBCO0FBQ0E4QywwQkFBa0JDLEdBQWxCLENBQXNCLHVCQUF0Qjs7QUFFQTlDLGFBQUtzRCxFQUFMLENBQVE1QyxPQUFPTSxXQUFQLENBQW1CdUMsTUFBbkIsQ0FBMEJDLEtBQWxDLEVBQXlDLFVBQVNDLEtBQVQsRUFBZTs7QUFFcEQsZ0JBQUdBLFVBQVdBLE1BQU1BLEtBQU4sS0FBZ0JqRSxVQUFVQyxRQUExQixJQUFzQ2dFLE1BQU1BLEtBQU4sS0FBZ0JqRSxVQUFVRSxhQUEzRSxDQUFILEVBQThGOztBQUUxRixvQkFBSWdFLFlBQVl0QyxrQkFBT0MsS0FBUCxDQUFhc0MsdUNBQWIsQ0FBaEI7QUFDQUQsMEJBQVVELEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0EseUNBQWFDLFNBQWIsRUFBd0IzRCxJQUF4QjtBQUNIO0FBQ0osU0FSRDs7QUFVQUMsYUFBS3NELEVBQUwsQ0FBUTVDLE9BQU9NLFdBQVAsQ0FBbUJ1QyxNQUFuQixDQUEwQkssd0JBQWxDLEVBQTRELFVBQVNDLEtBQVQsRUFBZTtBQUN2RSxnQkFBR0EsU0FBU0EsTUFBTUMsU0FBZixJQUE0QkQsTUFBTUMsU0FBTixLQUFvQixPQUFuRCxFQUEyRDtBQUN2RC9ELHFCQUFLZ0UsT0FBTCxDQUFhQyxnQ0FBYixFQUFvQztBQUNoQ3ZELDRCQUFRSSxnQ0FEd0I7QUFFaEMwQixvQ0FBZ0JiLEtBQUthLGNBRlc7QUFHaEMwQiwwQkFBTztBQUh5QixpQkFBcEM7QUFLSDtBQUNKLFNBUkQ7QUFTQWpFLGFBQUtzRCxFQUFMLENBQVE1QyxPQUFPTSxXQUFQLENBQW1CdUMsTUFBbkIsQ0FBMEJXLHVCQUFsQyxFQUEyRCxVQUFTTCxLQUFULEVBQWU7QUFDdEUsZ0JBQUdBLFNBQVNBLE1BQU1DLFNBQWYsSUFBNEJELE1BQU1DLFNBQU4sS0FBb0IsT0FBbkQsRUFBMkQ7QUFDdkRwQyxxQkFBS2EsY0FBTCxHQUFzQnNCLE1BQU1NLFVBQTVCO0FBQ0FwRSxxQkFBS2dFLE9BQUwsQ0FBYUMsZ0NBQWIsRUFBb0M7QUFDaEN2RCw0QkFBUUksZ0NBRHdCO0FBRWhDMEIsb0NBQWdCc0IsTUFBTU0sVUFGVTtBQUdoQ0YsMEJBQU87QUFIeUIsaUJBQXBDO0FBS0g7QUFDSixTQVREOztBQVdBakUsYUFBS3NELEVBQUwsQ0FBUTVDLE9BQU9NLFdBQVAsQ0FBbUJ1QyxNQUFuQixDQUEwQmEsd0JBQWxDLEVBQTRELFVBQVNQLEtBQVQsRUFBZTs7QUFFdkVoQiw4QkFBa0JDLEdBQWxCLENBQXNCLHFDQUF0QixFQUE2RDlDLEtBQUtxRSxhQUFMLENBQW1CLE9BQW5CLENBQTdELEVBQTBGckUsS0FBS3NFLHFCQUFMLENBQTJCLE9BQTNCLENBQTFGLEVBQStIdEUsS0FBS3NFLHFCQUFMLENBQTJCLE9BQTNCLEVBQW9DdEUsS0FBS3FFLGFBQUwsQ0FBbUIsT0FBbkIsQ0FBcEMsQ0FBL0g7O0FBRUFoRSwrQkFBbUIsSUFBbkI7QUFDQSxnQkFBSWtFLGlCQUFpQnZFLEtBQUtzRSxxQkFBTCxDQUEyQixPQUEzQixDQUFyQjtBQUNBNUMsaUJBQUthLGNBQUwsR0FBc0J2QyxLQUFLcUUsYUFBTCxDQUFtQixPQUFuQixDQUF0QjtBQUNBLGlCQUFJLElBQUlHLElBQUksQ0FBWixFQUFlQSxJQUFJRCxlQUFlRSxNQUFsQyxFQUEwQ0QsR0FBMUMsRUFBK0M7QUFDM0Msb0JBQUcsQ0FBQ0Usd0JBQUVDLFNBQUYsQ0FBWWpELEtBQUtlLGFBQWpCLEVBQStCLEVBQUNtQyxTQUFVTCxlQUFlQyxDQUFmLEVBQWtCSSxPQUE3QixFQUFzQ0MsUUFBUU4sZUFBZUMsQ0FBZixFQUFrQkssTUFBaEUsRUFBdUVDLE9BQU9QLGVBQWVDLENBQWYsRUFBa0JNLEtBQWhHLEVBQS9CLENBQUosRUFBMkk7QUFDdklwRCx5QkFBS2UsYUFBTCxDQUFtQnNDLElBQW5CLENBQXdCO0FBQ3BCSCxpQ0FBU0wsZUFBZUMsQ0FBZixFQUFrQkksT0FEUDtBQUVwQkMsZ0NBQVFOLGVBQWVDLENBQWYsRUFBa0JLLE1BRk47QUFHcEJDLCtCQUFPUCxlQUFlQyxDQUFmLEVBQWtCTSxLQUhMO0FBSXBCRSwrQkFBT1QsZUFBZUMsQ0FBZixFQUFrQlMsWUFKTDtBQUtwQkMsK0JBQVFYLGVBQWVDLENBQWYsRUFBa0JNLEtBQWxCLEdBQXdCLEdBQXhCLEdBQTRCUCxlQUFlQyxDQUFmLEVBQWtCSyxNQUE5QyxHQUFxRCxJQUFyRCxHQUEyRCxnQ0FBY04sZUFBZUMsQ0FBZixFQUFrQkksT0FBaEMsRUFBeUMsSUFBekMsRUFBK0MsS0FBL0M7QUFML0MscUJBQXhCO0FBT0g7QUFDSjs7QUFFRCxnQkFBR3pFLGdCQUFILEVBQW9CO0FBQ2hCSCxxQkFBS21GLElBQUwsQ0FBVWhGLGdCQUFWO0FBQ0Esb0JBQUcsQ0FBQ04sYUFBYXVGLFdBQWIsRUFBSixFQUErQjtBQUMzQnJGLHlCQUFLc0YsSUFBTDtBQUNIO0FBQ0o7O0FBRUQsZ0JBQUdyRixLQUFLc0YsU0FBTCxFQUFILEVBQW9CO0FBQ2hCNUQscUJBQUtPLE1BQUwsR0FBYyxJQUFkO0FBQ0g7O0FBRUQsZ0JBQUdwQyxhQUFhdUYsV0FBYixNQUE4QixDQUFDOUUsY0FBbEMsRUFBaUQ7QUFDN0N1QyxrQ0FBa0JDLEdBQWxCLENBQXNCLG9CQUF0QjtBQUNBL0MscUJBQUtzRixJQUFMOztBQUVBL0UsaUNBQWlCLElBQWpCO0FBQ0g7QUFHSixTQXRDRDs7QUF5Q0FQLGFBQUtzRixJQUFMLEdBQVksVUFBQ0UsU0FBRCxFQUFjO0FBQ3RCLGdCQUFJQyxhQUFhLENBQWpCO0FBQ0EsZ0JBQUd6RixLQUFLMEYsUUFBTCxPQUFvQkMsMkJBQXBCLElBQXdDM0YsS0FBSzBGLFFBQUwsT0FBb0JFLDBCQUEvRCxFQUErRSxDQUU5RSxDQUZELE1BRUs7QUFDRHRGLG1DQUFtQixLQUFuQjtBQUNBTCxxQkFBSzRGLFVBQUwsQ0FBZ0JoRyxPQUFoQjtBQUNIO0FBQ0Q7QUFDQTtBQUNBLGFBQUMsU0FBU2lHLG1CQUFULEdBQThCO0FBQzNCTDtBQUNBLG9CQUFHbkYsZ0JBQUgsRUFBb0I7QUFDaEJKLG1DQUFlc0YsU0FBZjtBQUNILGlCQUZELE1BRUs7O0FBRUQsd0JBQUdDLGFBQWEsR0FBaEIsRUFBb0I7QUFDaEJNLG1DQUFXRCxtQkFBWCxFQUFnQyxHQUFoQztBQUNILHFCQUZELE1BRUs7QUFDRDlGLDZCQUFLc0YsSUFBTDtBQUNIO0FBQ0o7QUFDSixhQVpEO0FBY0gsU0F4QkQ7O0FBMEJBdEYsYUFBS2dHLGlCQUFMLEdBQXlCLFVBQUNkLFlBQUQsRUFBa0I7QUFDdkMsZ0JBQUdsRixLQUFLMEYsUUFBTCxPQUFvQk8sd0JBQXZCLEVBQXFDO0FBQ2pDakcscUJBQUtzRixJQUFMO0FBQ0g7QUFDRDNELGlCQUFLYSxjQUFMLEdBQXNCMEMsWUFBdEI7QUFDQSxnQkFBR3BFLGdDQUFILEVBQW9DO0FBQ2hDTCwrQ0FBK0IsS0FBL0I7QUFDSDtBQUNEUixpQkFBS2lHLGFBQUwsQ0FBbUIsT0FBbkIsRUFBNEJoQixZQUE1QjtBQUNBLG1CQUFPdkQsS0FBS2EsY0FBWjtBQUNILFNBVkQ7QUFXQXhDLGFBQUttRyxhQUFMLEdBQXFCLFlBQU07QUFDdkIsbUJBQU9yRixnQ0FBUDtBQUNILFNBRkQ7QUFHQWQsYUFBS29HLGNBQUwsR0FBc0IsVUFBQzFGLE1BQUQsRUFBWTtBQUM5QkQsMkNBQStCQyxNQUEvQjtBQUNILFNBRkQ7QUFHQVYsYUFBS3FHLE9BQUwsR0FBZSxZQUFLO0FBQ2hCcEcsaUJBQUtxRyxLQUFMO0FBQ0F4RCw4QkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QjtBQUNBNUM7QUFDSCxTQUpEO0FBS0gsS0E5TEQsQ0E4TEMsT0FBTXVELEtBQU4sRUFBWTtBQUNULFlBQUdBLFNBQVNBLE1BQU02QyxJQUFmLElBQXVCN0MsTUFBTTZDLElBQU4sS0FBZWhGLDhCQUF6QyxFQUE2RDtBQUN6RCxrQkFBTW1DLEtBQU47QUFDSCxTQUZELE1BRUs7QUFDRCxnQkFBSUMsWUFBYXRDLGtCQUFPQyxLQUFQLENBQWFrRiw2QkFBYixDQUFqQjtBQUNBN0Msc0JBQVVELEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0Esa0JBQU1DLFNBQU47QUFDSDtBQUNKOztBQUVELFdBQU8zRCxJQUFQO0FBQ0gsQ0FwTkQ7O3FCQXVOZUosSTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwUGY7Ozs7QUFJQSxJQUFNNkcsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFVQyxLQUFWLEVBQWlCQyxFQUFqQixFQUFxQkMsT0FBckIsRUFBOEI7QUFDaEQsUUFBSUMsU0FBU0YsS0FBSyxJQUFMLEdBQVksSUFBekI7QUFDQSxRQUFHRyxLQUFLQyxHQUFMLENBQVNMLEtBQVQsSUFBa0JHLE1BQXJCLEVBQTZCO0FBQ3pCLGVBQU9ILFFBQVEsSUFBZjtBQUNIO0FBQ0QsUUFBSU0sT0FBT0osV0FBUyxHQUFwQjtBQUNBLFFBQUlLLFFBQVEsQ0FBQyxNQUFJRCxJQUFMLEVBQVUsTUFBSUEsSUFBZCxFQUFtQixNQUFJQSxJQUF2QixFQUE0QixNQUFJQSxJQUFoQyxFQUFxQyxNQUFJQSxJQUF6QyxFQUE4QyxNQUFJQSxJQUFsRCxFQUF1RCxNQUFJQSxJQUEzRCxFQUFnRSxNQUFJQSxJQUFwRSxDQUFaO0FBQ0c7QUFDSCxRQUFJRSxJQUFJLENBQUMsQ0FBVDtBQUNBLE9BQUc7QUFDQ1IsaUJBQVNHLE1BQVQ7QUFDQSxVQUFFSyxDQUFGO0FBQ0gsS0FIRCxRQUdRSixLQUFLQyxHQUFMLENBQVNMLEtBQVQsS0FBbUJHLE1BQW5CLElBQTZCSyxJQUFJRCxNQUFNdkMsTUFBTixHQUFlLENBSHhEO0FBSUEsV0FBT2dDLE1BQU1TLE9BQU4sQ0FBYyxDQUFkLElBQWlCRixNQUFNQyxDQUFOLENBQXhCO0FBQ0gsQ0FkRDs7cUJBZ0JlVCxhIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTQuLlxuICovXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCBzaXplSHVtYW5pemVyIGZyb20gXCJ1dGlscy9zaXplSHVtYW5pemVyXCI7XG5pbXBvcnQge1xuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9BRF9QTEFZSU5HLFxuICAgIFNUQVRFX0FEX1BBVVNFRCxcbiAgICBJTklUX0RBU0hfVU5TVVBQT1JULFxuICAgIElOSVRfREFTSF9OT1RGT1VORCxcbiAgICBFUlJPUlMsXG4gICAgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUixcbiAgICBDT05URU5UX0xFVkVMX0NIQU5HRUQsXG4gICAgUFJPVklERVJfREFTSFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBkYXNoanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuY29uc3QgREFTSEVSUk9SID0ge1xuICAgIERPV05MT0FEIDogXCJkb3dubG9hZFwiLFxuICAgIE1BTklGRVNURVJST1IgOiBcIm1hbmlmZXN0RXJyb3JcIlxufTtcbmNvbnN0IERhc2ggPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBkYXNoID0gbnVsbDtcbiAgICBsZXQgc3VwZXJQbGF5X2Z1bmMgPSBudWxsO1xuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyA9IG51bGw7XG4gICAgbGV0IHNlZWtQb3NpdGlvbl9zZWMgPSAwO1xuICAgIGxldCBpc0ZpcnN0RXJyb3IgPSBmYWxzZTtcbiAgICBsZXQgaXNEYXNoTWV0YUxvYWRlZCA9IGZhbHNlO1xuICAgIGxldCBydW5lZEF1dG9TdGFydCA9IGZhbHNlO1xuXG4gICAgbGV0IHNvdXJjZU9mRmlsZSA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yID0gZnVuY3Rpb24oaXNBdXRvKXtcbiAgICAgICAgICAgIGlmKGRhc2hqcy5WZXJzaW9uID4gXCIyLjkuMFwiKXtcbiAgICAgICAgICAgICAgICBkYXNoLnNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKFwidmlkZW9cIiwgaXNBdXRvKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgICAgICAgICAgaWYoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpe1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRhc2guZ2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIGRhc2ggPSBkYXNoanMuTWVkaWFQbGF5ZXIoKS5jcmVhdGUoKTtcblxuICAgICAgICB3aW5kb3cub3BfZGFzaCA9IGRhc2g7XG5cbiAgICAgICAgaWYoZGFzaGpzLlZlcnNpb24gPCBcIjIuNi41XCIpe1xuICAgICAgICAgICAgdGhyb3cgRVJST1JTLmNvZGVzW0lOSVRfREFTSF9VTlNVUFBPUlRdO1xuICAgICAgICB9XG4gICAgICAgIGRhc2guZ2V0RGVidWcoKS5zZXRMb2dUb0Jyb3dzZXJDb25zb2xlKGZhbHNlKTtcbiAgICAgICAgZGFzaC5pbml0aWFsaXplKGVsZW1lbnQsIG51bGwsIGZhbHNlKTtcblxuXG4gICAgICAgIGxldCBzcGVjID0ge1xuICAgICAgICAgICAgbmFtZSA6IFBST1ZJREVSX0RBU0gsXG4gICAgICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcbiAgICAgICAgICAgIG1zZSA6IGRhc2gsXG4gICAgICAgICAgICBsaXN0ZW5lciA6IG51bGwsXG4gICAgICAgICAgICBpc0xvYWRlZCA6IGZhbHNlLFxuICAgICAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxuICAgICAgICAgICAgaXNMaXZlIDogZmFsc2UsXG4gICAgICAgICAgICBzZWVraW5nIDogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXG4gICAgICAgICAgICBidWZmZXIgOiAwLFxuICAgICAgICAgICAgZnJhbWVyYXRlIDogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXG4gICAgICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXG4gICAgICAgICAgICBzb3VyY2VzIDogW10sXG4gICAgICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24oc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKXtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IEF0dGFjaCBGaWxlIDogXCIsIHNvdXJjZSwgXCJsYXN0UGxheVBvc2l0aW9uIDogXCIrIGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICAgICAgY292ZXJlZFNldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKHRydWUpO1xuICAgICAgICAgICAgc291cmNlT2ZGaWxlID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgIGlmIChzb3VyY2UubG93TGF0ZW5jeSkge1xuXG4gICAgICAgICAgICAgICAgZGFzaC5zZXRMb3dMYXRlbmN5RW5hYmxlZChzb3VyY2UubG93TGF0ZW5jeSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmxvd0xhdGVuY3lNcGRMaXZlRGVsYXkgJiYgdHlwZW9mKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb3dMYXRlbmN5TXBkTGl2ZURlbGF5KSA9PT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgICAgICAgICBkYXNoLnNldExpdmVEZWxheShwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG93TGF0ZW5jeU1wZExpdmVEZWxheSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXNoLmF0dGFjaFNvdXJjZShzb3VyY2VPZkZpbGUpO1xuICAgICAgICAgICAgc2Vla1Bvc2l0aW9uX3NlYyA9IGxhc3RQbGF5UG9zaXRpb247XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHN1cGVyUGxheV9mdW5jID0gdGhhdC5zdXBlcigncGxheScpO1xuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCBQUk9WSURFUiBMT0FERUQuXCIpO1xuXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5FUlJPUiwgZnVuY3Rpb24oZXJyb3Ipe1xuXG4gICAgICAgICAgICBpZihlcnJvciAmJiAoIGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuRE9XTkxPQUQgfHwgZXJyb3IuZXJyb3IgPT09IERBU0hFUlJPUi5NQU5JRkVTVEVSUk9SICkpe1xuXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICBlcnJvclRyaWdnZXIodGVtcEVycm9yLCB0aGF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGFzaC5vbihkYXNoanMuTWVkaWFQbGF5ZXIuZXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFUVVFU1RFRCwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgaWYoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKXtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCksXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBzcGVjLmN1cnJlbnRRdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICB0eXBlIDogXCJyZXF1ZXN0XCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRU5ERVJFRCwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgaWYoZXZlbnQgJiYgZXZlbnQubWVkaWFUeXBlICYmIGV2ZW50Lm1lZGlhVHlwZSA9PT0gXCJ2aWRlb1wiKXtcbiAgICAgICAgICAgICAgICBzcGVjLmN1cnJlbnRRdWFsaXR5ID0gZXZlbnQubmV3UXVhbGl0eTtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoQ09OVEVOVF9MRVZFTF9DSEFOR0VELCB7XG4gICAgICAgICAgICAgICAgICAgIGlzQXV0bzogY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCksXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiBldmVudC5uZXdRdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICB0eXBlIDogXCJyZW5kZXJcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUExBWUJBQ0tfTUVUQURBVEFfTE9BREVELCBmdW5jdGlvbihldmVudCl7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBQTEFZQkFDS19NRVRBREFUQV9MT0FERUQgIDogXCIsIGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpLCBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJylbZGFzaC5nZXRRdWFsaXR5Rm9yKFwidmlkZW9cIildKTtcblxuICAgICAgICAgICAgaXNEYXNoTWV0YUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgc3ViUXVhbGl0eUxpc3QgPSBkYXNoLmdldEJpdHJhdGVJbmZvTGlzdEZvcigndmlkZW8nKTtcbiAgICAgICAgICAgIHNwZWMuY3VycmVudFF1YWxpdHkgPSBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdWJRdWFsaXR5TGlzdC5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgICAgIGlmKCFfLmZpbmRXaGVyZShzcGVjLnF1YWxpdHlMZXZlbHMse2JpdHJhdGUgOiBzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLCBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCx3aWR0aDogc3ViUXVhbGl0eUxpc3RbaV0ud2lkdGh9KSl7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMucXVhbGl0eUxldmVscy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpdHJhdGU6IHN1YlF1YWxpdHlMaXN0W2ldLmJpdHJhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzdWJRdWFsaXR5TGlzdFtpXS53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBzdWJRdWFsaXR5TGlzdFtpXS5xdWFsaXR5SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoK1wieFwiK3N1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCtcIiwgXCIrIHNpemVIdW1hbml6ZXIoc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSwgdHJ1ZSwgXCJicHNcIilcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzZWVrUG9zaXRpb25fc2VjKXtcbiAgICAgICAgICAgICAgICBkYXNoLnNlZWsoc2Vla1Bvc2l0aW9uX3NlYyk7XG4gICAgICAgICAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihkYXNoLmlzRHluYW1pYygpKXtcbiAgICAgICAgICAgICAgICBzcGVjLmlzTGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpICYmICFydW5lZEF1dG9TdGFydCl7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiREFTSCA6IEFVVE9QTEFZKCkhXCIpO1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuXG4gICAgICAgICAgICAgICAgcnVuZWRBdXRvU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgICB0aGF0LnBsYXkgPSAobXV0ZWRQbGF5KSA9PntcbiAgICAgICAgICAgIGxldCByZXRyeUNvdW50ID0gMDtcbiAgICAgICAgICAgIGlmKHRoYXQuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfQURfUExBWUlORyB8fCB0aGF0LmdldFN0YXRlKCkgPT09IFNUQVRFX0FEX1BBVVNFRCl7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlzRGFzaE1ldGFMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkYXNoLmF0dGFjaFZpZXcoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0Rhc2ggY2FuIGluZmluaXRlIGxvYWRpbmcgd2hlbiBwbGF5ZXIgaXMgaW4gYSBwYXVzZWQgc3RhdGUgZm9yIGEgbG9uZyB0aW1lLlxuICAgICAgICAgICAgLy9UaGVuIGRhc2ggYWx3YXlzIGhhdmUgdG8gcmVsb2FkKGF0dGFjaFZpZXcpIGFuZCB3YWl0IGZvciBNZXRhTG9hZGVkIGV2ZW50IHdoZW4gcmVzdW1lLlxuICAgICAgICAgICAgKGZ1bmN0aW9uIGNoZWNrRGFzaE1ldGFMb2FkZWQoKXtcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50ICsrO1xuICAgICAgICAgICAgICAgIGlmKGlzRGFzaE1ldGFMb2FkZWQpe1xuICAgICAgICAgICAgICAgICAgICBzdXBlclBsYXlfZnVuYyhtdXRlZFBsYXkpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHJ5Q291bnQgPCAzMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0Rhc2hNZXRhTG9hZGVkLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IHF1YWxpdHlJbmRleDtcbiAgICAgICAgICAgIGlmKGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpKXtcbiAgICAgICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGFzaC5zZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiwgcXVhbGl0eUluZGV4KTtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgICAgICBkYXNoLnJlc2V0KCk7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgICAgIH07XG4gICAgfWNhdGNoKGVycm9yKXtcbiAgICAgICAgaWYoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBlcnJvci5jb2RlID09PSBJTklUX0RBU0hfVU5TVVBQT1JUKXtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSAgRVJST1JTLmNvZGVzW0lOSVRfREFTSF9OT1RGT1VORF07XG4gICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIHRocm93IHRlbXBFcnJvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBEYXNoO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDE0Li5cbiAqL1xuXG5jb25zdCBzaXplSHVtYW5pemVyID0gZnVuY3Rpb24gKGJ5dGVzLCBzaSwgcG9zdHBpeCkge1xuICAgIGxldCB0aHJlc2ggPSBzaSA/IDEwMDAgOiAxMDI0O1xuICAgIGlmKE1hdGguYWJzKGJ5dGVzKSA8IHRocmVzaCkge1xuICAgICAgICByZXR1cm4gYnl0ZXMgKyAnIEInO1xuICAgIH1cbiAgICBsZXQgdW5pdCA9IHBvc3RwaXh8fFwiQlwiO1xuICAgIGxldCB1bml0cyA9IFsnaycrdW5pdCwnTScrdW5pdCwnRycrdW5pdCwnVCcrdW5pdCwnUCcrdW5pdCwnRScrdW5pdCwnWicrdW5pdCwnWScrdW5pdF07XG4gICAgICAgLy8gPyBbJ2tCJywnTUInLCdHQicsJ1RCJywnUEInLCdFQicsJ1pCJywnWUInXTogWydLaUInLCdNaUInLCdHaUInLCdUaUInLCdQaUInLCdFaUInLCdaaUInLCdZaUInXTtcbiAgICBsZXQgdSA9IC0xO1xuICAgIGRvIHtcbiAgICAgICAgYnl0ZXMgLz0gdGhyZXNoO1xuICAgICAgICArK3U7XG4gICAgfSB3aGlsZShNYXRoLmFicyhieXRlcykgPj0gdGhyZXNoICYmIHUgPCB1bml0cy5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gYnl0ZXMudG9GaXhlZCgxKSt1bml0c1t1XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2l6ZUh1bWFuaXplcjsiXSwic291cmNlUm9vdCI6IiJ9