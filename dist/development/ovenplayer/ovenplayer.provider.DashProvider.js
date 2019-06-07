/*! OvenPlayerv0.9.596 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
    var superDestroy_func = null;
    var seekPosition_sec = 0;
    var isFirstError = false;

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
            throw _constants.ERRORS[103];
        }
        dash.getDebug().setLogToBrowserConsole(true);
        dash.initialize(element, null, false);

        var spec = {
            name: _constants.PROVIDER_DASH,
            element: element,
            mse: dash,
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
            sources: [],
            adTagUrl: adTagUrl
        };

        that = (0, _Provider2["default"])(spec, playerConfig, function (source, lastPlayPosition) {
            OvenPlayerConsole.log("DASH : onExtendedLoad : ", source, "lastPlayPosition : " + lastPlayPosition);
            coveredSetAutoSwitchQualityFor(true);
            dash.attachSource(source.file);
            seekPosition_sec = lastPlayPosition;
        });
        superDestroy_func = that["super"]('destroy');
        OvenPlayerConsole.log("DASH PROVIDER LOADED.");

        dash.on(dashjs.MediaPlayer.events.ERROR, function (error) {
            console.log(error);
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
                //islive
            }
            if (seekPosition_sec) {
                dash.seek(seekPosition_sec);
                if (!playerConfig.isAutoStart()) {
                    that.play();
                }
            }
            if (playerConfig.isAutoStart()) {
                that.play();
            }
        });

        /*that.on(CONTENT_META, function(meta){
        }, that);*/

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
        if (error.code && error.message) {
            throw error;
        } else {
            throw new Error(error);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zaXplSHVtYW5pemVyLmpzIl0sIm5hbWVzIjpbIkRBU0hFUlJPUiIsIkRPV05MT0FEIiwiTUFOSUZFU1RFUlJPUiIsIkRhc2giLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiZGFzaCIsInN1cGVyRGVzdHJveV9mdW5jIiwic2Vla1Bvc2l0aW9uX3NlYyIsImlzRmlyc3RFcnJvciIsImNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsImlzQXV0byIsImRhc2hqcyIsIlZlcnNpb24iLCJzZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsImNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvciIsInJlc3VsdCIsImdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yIiwiTWVkaWFQbGF5ZXIiLCJjcmVhdGUiLCJFUlJPUlMiLCJnZXREZWJ1ZyIsInNldExvZ1RvQnJvd3NlckNvbnNvbGUiLCJpbml0aWFsaXplIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9EQVNIIiwibXNlIiwibGlzdGVuZXIiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImZyYW1lcmF0ZSIsImN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFNvdXJjZSIsInF1YWxpdHlMZXZlbHMiLCJzb3VyY2VzIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiYXR0YWNoU291cmNlIiwiZmlsZSIsIm9uIiwiZXZlbnRzIiwiRVJST1IiLCJlcnJvciIsImNvbnNvbGUiLCJ0ZW1wRXJyb3IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUVVBTElUWV9DSEFOR0VfUkVRVUVTVEVEIiwiZXZlbnQiLCJtZWRpYVR5cGUiLCJ0cmlnZ2VyIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwidHlwZSIsIlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVEIiwibmV3UXVhbGl0eSIsIlBMQVlCQUNLX01FVEFEQVRBX0xPQURFRCIsImdldFF1YWxpdHlGb3IiLCJnZXRCaXRyYXRlSW5mb0xpc3RGb3IiLCJzdWJRdWFsaXR5TGlzdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwiYml0cmF0ZSIsImhlaWdodCIsIndpZHRoIiwiaW5kZXgiLCJxdWFsaXR5SW5kZXgiLCJsYWJlbCIsImlzRHluYW1pYyIsInNlZWsiLCJpc0F1dG9TdGFydCIsInBsYXkiLCJzZXRDdXJyZW50UXVhbGl0eSIsImdldFN0YXRlIiwiU1RBVEVfUExBWUlORyIsInNldFF1YWxpdHlGb3IiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJkZXN0cm95IiwicmVzZXQiLCJjb2RlIiwibWVzc2FnZSIsIkVycm9yIiwic2l6ZUh1bWFuaXplciIsImJ5dGVzIiwic2kiLCJwb3N0cGl4IiwidGhyZXNoIiwiTWF0aCIsImFicyIsInVuaXQiLCJ1bml0cyIsInUiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7OztBQVJBOzs7QUFhQSxJQUFNQSxZQUFZO0FBQ2RDLGNBQVcsVUFERztBQUVkQyxtQkFBZ0I7QUFGRixDQUFsQjtBQUlBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFTQyxPQUFULEVBQWtCQyxZQUFsQixFQUFnQ0MsUUFBaEMsRUFBeUM7QUFDbEQsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsT0FBTyxJQUFYO0FBQ0EsUUFBSUMsb0JBQW9CLElBQXhCO0FBQ0EsUUFBSUMsbUJBQW1CLENBQXZCO0FBQ0EsUUFBSUMsZUFBZSxLQUFuQjs7QUFFQSxRQUFJO0FBQ0EsWUFBTUMsaUNBQWlDLFNBQWpDQSw4QkFBaUMsQ0FBU0MsTUFBVCxFQUFnQjtBQUNuRCxnQkFBR0MsT0FBT0MsT0FBUCxHQUFpQixPQUFwQixFQUE0QjtBQUN4QlAscUJBQUtRLHVCQUFMLENBQTZCLE9BQTdCLEVBQXNDSCxNQUF0QztBQUNILGFBRkQsTUFFSztBQUNETCxxQkFBS1EsdUJBQUwsQ0FBNkJILE1BQTdCO0FBQ0g7QUFDSixTQU5EO0FBT0EsWUFBTUksaUNBQWlDLFNBQWpDQSw4QkFBaUMsR0FBVTtBQUM3QyxnQkFBSUMsU0FBUyxFQUFiO0FBQ0EsZ0JBQUdKLE9BQU9DLE9BQVAsR0FBaUIsT0FBcEIsRUFBNEI7QUFDeEJHLHlCQUFTVixLQUFLVyx1QkFBTCxDQUE2QixPQUE3QixDQUFUO0FBQ0gsYUFGRCxNQUVLO0FBQ0RELHlCQUFTVixLQUFLVyx1QkFBTCxFQUFUO0FBQ0g7QUFDRCxtQkFBT0QsTUFBUDtBQUNILFNBUkQ7QUFTQVYsZUFBT00sT0FBT00sV0FBUCxHQUFxQkMsTUFBckIsRUFBUDtBQUNBLFlBQUdQLE9BQU9DLE9BQVAsR0FBaUIsT0FBcEIsRUFBNEI7QUFDeEIsa0JBQU1PLGtCQUFPLEdBQVAsQ0FBTjtBQUNIO0FBQ0RkLGFBQUtlLFFBQUwsR0FBZ0JDLHNCQUFoQixDQUF1QyxJQUF2QztBQUNBaEIsYUFBS2lCLFVBQUwsQ0FBZ0JyQixPQUFoQixFQUF5QixJQUF6QixFQUErQixLQUEvQjs7QUFFQSxZQUFJc0IsT0FBTztBQUNQQyxrQkFBT0Msd0JBREE7QUFFUHhCLHFCQUFVQSxPQUZIO0FBR1B5QixpQkFBTXJCLElBSEM7QUFJUHNCLHNCQUFXLElBSko7QUFLUEMscUJBQVUsS0FMSDtBQU1QQyxvQkFBUyxLQU5GO0FBT1BDLHFCQUFVLEtBUEg7QUFRUEMsbUJBQVFDLHFCQVJEO0FBU1BDLG9CQUFTLENBVEY7QUFVUEMsdUJBQVksQ0FWTDtBQVdQQyw0QkFBaUIsQ0FBQyxDQVhYO0FBWVBDLDJCQUFnQixDQUFDLENBWlY7QUFhUEMsMkJBQWdCLEVBYlQ7QUFjUEMscUJBQVUsRUFkSDtBQWVQbkMsc0JBQVdBO0FBZkosU0FBWDs7QUFrQkFDLGVBQU8sMkJBQVNtQixJQUFULEVBQWVyQixZQUFmLEVBQTZCLFVBQVNxQyxNQUFULEVBQWlCQyxnQkFBakIsRUFBa0M7QUFDbEVDLDhCQUFrQkMsR0FBbEIsQ0FBc0IsMEJBQXRCLEVBQWtESCxNQUFsRCxFQUEwRCx3QkFBdUJDLGdCQUFqRjtBQUNBL0IsMkNBQStCLElBQS9CO0FBQ0FKLGlCQUFLc0MsWUFBTCxDQUFrQkosT0FBT0ssSUFBekI7QUFDQXJDLCtCQUFtQmlDLGdCQUFuQjtBQUNILFNBTE0sQ0FBUDtBQU1BbEMsNEJBQW9CRixjQUFXLFNBQVgsQ0FBcEI7QUFDQXFDLDBCQUFrQkMsR0FBbEIsQ0FBc0IsdUJBQXRCOztBQUVBckMsYUFBS3dDLEVBQUwsQ0FBUWxDLE9BQU9NLFdBQVAsQ0FBbUI2QixNQUFuQixDQUEwQkMsS0FBbEMsRUFBeUMsVUFBU0MsS0FBVCxFQUFlO0FBQ3BEQyxvQkFBUVAsR0FBUixDQUFZTSxLQUFaO0FBQ0EsZ0JBQUdBLFNBQVMsQ0FBQ3hDLFlBQVYsS0FBNEJ3QyxNQUFNQSxLQUFOLEtBQWdCbkQsVUFBVUMsUUFBMUIsSUFBc0NrRCxNQUFNQSxLQUFOLEtBQWdCbkQsVUFBVUUsYUFBNUYsQ0FBSCxFQUErRztBQUMzR1MsK0JBQWUsSUFBZjtBQUNBLG9CQUFJMEMsWUFBWS9CLGtCQUFPZ0MsdUNBQVAsQ0FBaEI7QUFDQUQsMEJBQVVGLEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0EseUNBQWFFLFNBQWIsRUFBd0I5QyxJQUF4QjtBQUNIO0FBQ0osU0FSRDs7QUFVQUMsYUFBS3dDLEVBQUwsQ0FBUWxDLE9BQU9NLFdBQVAsQ0FBbUI2QixNQUFuQixDQUEwQk0sd0JBQWxDLEVBQTRELFVBQVNDLEtBQVQsRUFBZTtBQUN2RSxnQkFBR0EsU0FBU0EsTUFBTUMsU0FBZixJQUE0QkQsTUFBTUMsU0FBTixLQUFvQixPQUFuRCxFQUEyRDtBQUN2RGxELHFCQUFLbUQsT0FBTCxDQUFhQyxnQ0FBYixFQUFvQztBQUNoQzlDLDRCQUFRSSxnQ0FEd0I7QUFFaENxQixvQ0FBZ0JaLEtBQUtZLGNBRlc7QUFHaENzQiwwQkFBTztBQUh5QixpQkFBcEM7QUFLSDtBQUNKLFNBUkQ7QUFTQXBELGFBQUt3QyxFQUFMLENBQVFsQyxPQUFPTSxXQUFQLENBQW1CNkIsTUFBbkIsQ0FBMEJZLHVCQUFsQyxFQUEyRCxVQUFTTCxLQUFULEVBQWU7QUFDdEUsZ0JBQUdBLFNBQVNBLE1BQU1DLFNBQWYsSUFBNEJELE1BQU1DLFNBQU4sS0FBb0IsT0FBbkQsRUFBMkQ7QUFDdkQvQixxQkFBS1ksY0FBTCxHQUFzQmtCLE1BQU1NLFVBQTVCO0FBQ0F2RCxxQkFBS21ELE9BQUwsQ0FBYUMsZ0NBQWIsRUFBb0M7QUFDaEM5Qyw0QkFBUUksZ0NBRHdCO0FBRWhDcUIsb0NBQWdCa0IsTUFBTU0sVUFGVTtBQUdoQ0YsMEJBQU87QUFIeUIsaUJBQXBDO0FBS0g7QUFDSixTQVREOztBQVlBcEQsYUFBS3dDLEVBQUwsQ0FBUWxDLE9BQU9NLFdBQVAsQ0FBbUI2QixNQUFuQixDQUEwQmMsd0JBQWxDLEVBQTRELFVBQVNQLEtBQVQsRUFBZTtBQUN2RVosOEJBQWtCQyxHQUFsQixDQUFzQixtQkFBdEIsRUFBMkNyQyxLQUFLd0QsYUFBTCxDQUFtQixPQUFuQixDQUEzQyxFQUF3RXhELEtBQUt5RCxxQkFBTCxDQUEyQixPQUEzQixDQUF4RSxFQUE2R3pELEtBQUt5RCxxQkFBTCxDQUEyQixPQUEzQixFQUFvQ3pELEtBQUt3RCxhQUFMLENBQW1CLE9BQW5CLENBQXBDLENBQTdHOztBQUVBLGdCQUFJRSxpQkFBaUIxRCxLQUFLeUQscUJBQUwsQ0FBMkIsT0FBM0IsQ0FBckI7QUFDQXZDLGlCQUFLWSxjQUFMLEdBQXNCOUIsS0FBS3dELGFBQUwsQ0FBbUIsT0FBbkIsQ0FBdEI7QUFDQSxpQkFBSSxJQUFJRyxJQUFJLENBQVosRUFBZUEsSUFBSUQsZUFBZUUsTUFBbEMsRUFBMENELEdBQTFDLEVBQStDO0FBQzNDekMscUJBQUtjLGFBQUwsQ0FBbUI2QixJQUFuQixDQUF3QjtBQUNwQkMsNkJBQVNKLGVBQWVDLENBQWYsRUFBa0JHLE9BRFA7QUFFcEJDLDRCQUFRTCxlQUFlQyxDQUFmLEVBQWtCSSxNQUZOO0FBR3BCQywyQkFBT04sZUFBZUMsQ0FBZixFQUFrQkssS0FITDtBQUlwQkMsMkJBQU9QLGVBQWVDLENBQWYsRUFBa0JPLFlBSkw7QUFLcEJDLDJCQUFRVCxlQUFlQyxDQUFmLEVBQWtCSyxLQUFsQixHQUF3QixHQUF4QixHQUE0Qk4sZUFBZUMsQ0FBZixFQUFrQkksTUFBOUMsR0FBcUQsSUFBckQsR0FBMkQsZ0NBQWNMLGVBQWVDLENBQWYsRUFBa0JHLE9BQWhDLEVBQXlDLElBQXpDLEVBQStDLEtBQS9DO0FBTC9DLGlCQUF4QjtBQU9IOztBQUVELGdCQUFHOUQsS0FBS29FLFNBQUwsRUFBSCxFQUFvQjtBQUNoQjtBQUNIO0FBQ0QsZ0JBQUdsRSxnQkFBSCxFQUFvQjtBQUNoQkYscUJBQUtxRSxJQUFMLENBQVVuRSxnQkFBVjtBQUNBLG9CQUFHLENBQUNMLGFBQWF5RSxXQUFiLEVBQUosRUFBK0I7QUFDM0J2RSx5QkFBS3dFLElBQUw7QUFDSDtBQUNKO0FBQ0QsZ0JBQUcxRSxhQUFheUUsV0FBYixFQUFILEVBQThCO0FBQzFCdkUscUJBQUt3RSxJQUFMO0FBQ0g7QUFDSixTQTNCRDs7QUE2QkE7OztBQUdBeEUsYUFBS3lFLGlCQUFMLEdBQXlCLFVBQUNOLFlBQUQsRUFBa0I7QUFDdkMsZ0JBQUduRSxLQUFLMEUsUUFBTCxPQUFvQkMsd0JBQXZCLEVBQXFDO0FBQ2pDM0UscUJBQUt3RSxJQUFMO0FBQ0g7QUFDRHJELGlCQUFLWSxjQUFMLEdBQXNCb0MsWUFBdEI7QUFDQSxnQkFBR3pELGdDQUFILEVBQW9DO0FBQ2hDTCwrQ0FBK0IsS0FBL0I7QUFDSDtBQUNESixpQkFBSzJFLGFBQUwsQ0FBbUIsT0FBbkIsRUFBNEJULFlBQTVCO0FBQ0EsbUJBQU9oRCxLQUFLWSxjQUFaO0FBQ0gsU0FWRDtBQVdBL0IsYUFBSzZFLGFBQUwsR0FBcUIsWUFBTTtBQUN2QixtQkFBT25FLGdDQUFQO0FBQ0gsU0FGRDtBQUdBVixhQUFLOEUsY0FBTCxHQUFzQixVQUFDeEUsTUFBRCxFQUFZO0FBQzlCRCwyQ0FBK0JDLE1BQS9CO0FBQ0gsU0FGRDtBQUdBTixhQUFLK0UsT0FBTCxHQUFlLFlBQUs7QUFDaEI5RSxpQkFBSytFLEtBQUw7QUFDQTNDLDhCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCO0FBQ0FwQztBQUNILFNBSkQ7QUFLSCxLQXhJRCxDQXdJQyxPQUFNMEMsS0FBTixFQUFZO0FBQ1QsWUFBR0EsTUFBTXFDLElBQU4sSUFBY3JDLE1BQU1zQyxPQUF2QixFQUErQjtBQUMzQixrQkFBTXRDLEtBQU47QUFDSCxTQUZELE1BRUs7QUFDRCxrQkFBTSxJQUFJdUMsS0FBSixDQUFVdkMsS0FBVixDQUFOO0FBQ0g7QUFFSjs7QUFFRCxXQUFPNUMsSUFBUDtBQUNILENBekpEOztxQkE0SmVKLEk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0tmOzs7O0FBSUEsSUFBTXdGLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBVUMsS0FBVixFQUFpQkMsRUFBakIsRUFBcUJDLE9BQXJCLEVBQThCO0FBQ2hELFFBQUlDLFNBQVNGLEtBQUssSUFBTCxHQUFZLElBQXpCO0FBQ0EsUUFBR0csS0FBS0MsR0FBTCxDQUFTTCxLQUFULElBQWtCRyxNQUFyQixFQUE2QjtBQUN6QixlQUFPSCxRQUFRLElBQWY7QUFDSDtBQUNELFFBQUlNLE9BQU9KLFdBQVMsR0FBcEI7QUFDQSxRQUFJSyxRQUFRLENBQUMsTUFBSUQsSUFBTCxFQUFVLE1BQUlBLElBQWQsRUFBbUIsTUFBSUEsSUFBdkIsRUFBNEIsTUFBSUEsSUFBaEMsRUFBcUMsTUFBSUEsSUFBekMsRUFBOEMsTUFBSUEsSUFBbEQsRUFBdUQsTUFBSUEsSUFBM0QsRUFBZ0UsTUFBSUEsSUFBcEUsQ0FBWjtBQUNHO0FBQ0gsUUFBSUUsSUFBSSxDQUFDLENBQVQ7QUFDQSxPQUFHO0FBQ0NSLGlCQUFTRyxNQUFUO0FBQ0EsVUFBRUssQ0FBRjtBQUNILEtBSEQsUUFHUUosS0FBS0MsR0FBTCxDQUFTTCxLQUFULEtBQW1CRyxNQUFuQixJQUE2QkssSUFBSUQsTUFBTS9CLE1BQU4sR0FBZSxDQUh4RDtBQUlBLFdBQU93QixNQUFNUyxPQUFOLENBQWMsQ0FBZCxJQUFpQkYsTUFBTUMsQ0FBTixDQUF4QjtBQUNILENBZEQ7O3FCQWdCZVQsYSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDE0Li5cbiAqL1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQgc2l6ZUh1bWFuaXplciBmcm9tIFwidXRpbHMvc2l6ZUh1bWFuaXplclwiO1xuaW1wb3J0IHtTVEFURV9JRExFLCBFUlJPUlMsIFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IsIENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwgIFNUQVRFX1BMQVlJTkcsIFBST1ZJREVSX0RBU0gsIENPTlRFTlRfTUVUQX0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBkYXNoanMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuY29uc3QgREFTSEVSUk9SID0ge1xuICAgIERPV05MT0FEIDogXCJkb3dubG9hZFwiLFxuICAgIE1BTklGRVNURVJST1IgOiBcIm1hbmlmZXN0RXJyb3JcIlxufTtcbmNvbnN0IERhc2ggPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCBkYXNoID0gbnVsbDtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgPSBudWxsO1xuICAgIGxldCBzZWVrUG9zaXRpb25fc2VjID0gMDtcbiAgICBsZXQgaXNGaXJzdEVycm9yID0gZmFsc2U7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IgPSBmdW5jdGlvbihpc0F1dG8pe1xuICAgICAgICAgICAgaWYoZGFzaGpzLlZlcnNpb24gPiBcIjIuOS4wXCIpe1xuICAgICAgICAgICAgICAgIGRhc2guc2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoXCJ2aWRlb1wiLCBpc0F1dG8pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZGFzaC5zZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihpc0F1dG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb3ZlcmVkR2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgICAgICBpZihkYXNoanMuVmVyc2lvbiA+IFwiMi45LjBcIil7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eUZvcihcInZpZGVvXCIpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGFzaC5nZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgZGFzaCA9IGRhc2hqcy5NZWRpYVBsYXllcigpLmNyZWF0ZSgpO1xuICAgICAgICBpZihkYXNoanMuVmVyc2lvbiA8IFwiMi42LjVcIil7XG4gICAgICAgICAgICB0aHJvdyBFUlJPUlNbMTAzXTtcbiAgICAgICAgfVxuICAgICAgICBkYXNoLmdldERlYnVnKCkuc2V0TG9nVG9Ccm93c2VyQ29uc29sZSh0cnVlKTtcbiAgICAgICAgZGFzaC5pbml0aWFsaXplKGVsZW1lbnQsIG51bGwsIGZhbHNlKTtcblxuICAgICAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgICAgIG5hbWUgOiBQUk9WSURFUl9EQVNILFxuICAgICAgICAgICAgZWxlbWVudCA6IGVsZW1lbnQsXG4gICAgICAgICAgICBtc2UgOiBkYXNoLFxuICAgICAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxuICAgICAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxuICAgICAgICAgICAgaXNMaXZlIDogZmFsc2UsXG4gICAgICAgICAgICBzZWVraW5nIDogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXG4gICAgICAgICAgICBidWZmZXIgOiAwLFxuICAgICAgICAgICAgZnJhbWVyYXRlIDogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXG4gICAgICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXG4gICAgICAgICAgICBzb3VyY2VzIDogW10sXG4gICAgICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24oc291cmNlLCBsYXN0UGxheVBvc2l0aW9uKXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggOiBvbkV4dGVuZGVkTG9hZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGNvdmVyZWRTZXRBdXRvU3dpdGNoUXVhbGl0eUZvcih0cnVlKTtcbiAgICAgICAgICAgIGRhc2guYXR0YWNoU291cmNlKHNvdXJjZS5maWxlKTtcbiAgICAgICAgICAgIHNlZWtQb3NpdGlvbl9zZWMgPSBsYXN0UGxheVBvc2l0aW9uO1xuICAgICAgICB9KTtcbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkRBU0ggUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuRVJST1IsIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIGlmKGVycm9yICYmICFpc0ZpcnN0RXJyb3IgJiYgKCBlcnJvci5lcnJvciA9PT0gREFTSEVSUk9SLkRPV05MT0FEIHx8IGVycm9yLmVycm9yID09PSBEQVNIRVJST1IuTUFOSUZFU1RFUlJPUiApKXtcbiAgICAgICAgICAgICAgICBpc0ZpcnN0RXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUl07XG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKHRlbXBFcnJvciwgdGhhdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRhc2gub24oZGFzaGpzLk1lZGlhUGxheWVyLmV2ZW50cy5RVUFMSVRZX0NIQU5HRV9SRVFVRVNURUQsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGlmKGV2ZW50ICYmIGV2ZW50Lm1lZGlhVHlwZSAmJiBldmVudC5tZWRpYVR5cGUgPT09IFwidmlkZW9cIil7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogc3BlYy5jdXJyZW50UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IFwicmVxdWVzdFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUVVBTElUWV9DSEFOR0VfUkVOREVSRUQsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGlmKGV2ZW50ICYmIGV2ZW50Lm1lZGlhVHlwZSAmJiBldmVudC5tZWRpYVR5cGUgPT09IFwidmlkZW9cIil7XG4gICAgICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGV2ZW50Lm5ld1F1YWxpdHk7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKENPTlRFTlRfTEVWRUxfQ0hBTkdFRCwge1xuICAgICAgICAgICAgICAgICAgICBpc0F1dG86IGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVhbGl0eTogZXZlbnQubmV3UXVhbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IFwicmVuZGVyXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICBkYXNoLm9uKGRhc2hqcy5NZWRpYVBsYXllci5ldmVudHMuUExBWUJBQ0tfTUVUQURBVEFfTE9BREVELCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJHZXRTdHJlYW1JbmZvICA6IFwiLCBkYXNoLmdldFF1YWxpdHlGb3IoXCJ2aWRlb1wiKSwgZGFzaC5nZXRCaXRyYXRlSW5mb0xpc3RGb3IoJ3ZpZGVvJyksIGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpW2Rhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpXSk7XG5cbiAgICAgICAgICAgIGxldCBzdWJRdWFsaXR5TGlzdCA9IGRhc2guZ2V0Qml0cmF0ZUluZm9MaXN0Rm9yKCd2aWRlbycpO1xuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IGRhc2guZ2V0UXVhbGl0eUZvcihcInZpZGVvXCIpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN1YlF1YWxpdHlMaXN0Lmxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICAgICAgc3BlYy5xdWFsaXR5TGV2ZWxzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBiaXRyYXRlOiBzdWJRdWFsaXR5TGlzdFtpXS5iaXRyYXRlLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHN1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogc3ViUXVhbGl0eUxpc3RbaV0ucXVhbGl0eUluZGV4LFxuICAgICAgICAgICAgICAgICAgICBsYWJlbCA6IHN1YlF1YWxpdHlMaXN0W2ldLndpZHRoK1wieFwiK3N1YlF1YWxpdHlMaXN0W2ldLmhlaWdodCtcIiwgXCIrIHNpemVIdW1hbml6ZXIoc3ViUXVhbGl0eUxpc3RbaV0uYml0cmF0ZSwgdHJ1ZSwgXCJicHNcIilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZGFzaC5pc0R5bmFtaWMoKSl7XG4gICAgICAgICAgICAgICAgLy9pc2xpdmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHNlZWtQb3NpdGlvbl9zZWMpe1xuICAgICAgICAgICAgICAgIGRhc2guc2VlayhzZWVrUG9zaXRpb25fc2VjKTtcbiAgICAgICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qdGhhdC5vbihDT05URU5UX01FVEEsIGZ1bmN0aW9uKG1ldGEpe1xuICAgICAgICB9LCB0aGF0KTsqL1xuXG4gICAgICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZih0aGF0LmdldFN0YXRlKCkgIT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BlYy5jdXJyZW50UXVhbGl0eSA9IHF1YWxpdHlJbmRleDtcbiAgICAgICAgICAgIGlmKGNvdmVyZWRHZXRBdXRvU3dpdGNoUXVhbGl0eUZvcigpKXtcbiAgICAgICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGFzaC5zZXRRdWFsaXR5Rm9yKFwidmlkZW9cIiwgcXVhbGl0eUluZGV4KTtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRRdWFsaXR5O1xuICAgICAgICB9O1xuICAgICAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY292ZXJlZEdldEF1dG9Td2l0Y2hRdWFsaXR5Rm9yKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgICAgICBjb3ZlcmVkU2V0QXV0b1N3aXRjaFF1YWxpdHlGb3IoaXNBdXRvKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgICAgICBkYXNoLnJlc2V0KCk7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJEQVNIIDogUFJPVklERVIgREVTVFJPWUVELlwiKTtcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgICAgIH07XG4gICAgfWNhdGNoKGVycm9yKXtcbiAgICAgICAgaWYoZXJyb3IuY29kZSAmJiBlcnJvci5tZXNzYWdlKXtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBEYXNoO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDE0Li5cbiAqL1xuXG5jb25zdCBzaXplSHVtYW5pemVyID0gZnVuY3Rpb24gKGJ5dGVzLCBzaSwgcG9zdHBpeCkge1xuICAgIGxldCB0aHJlc2ggPSBzaSA/IDEwMDAgOiAxMDI0O1xuICAgIGlmKE1hdGguYWJzKGJ5dGVzKSA8IHRocmVzaCkge1xuICAgICAgICByZXR1cm4gYnl0ZXMgKyAnIEInO1xuICAgIH1cbiAgICBsZXQgdW5pdCA9IHBvc3RwaXh8fFwiQlwiO1xuICAgIGxldCB1bml0cyA9IFsnaycrdW5pdCwnTScrdW5pdCwnRycrdW5pdCwnVCcrdW5pdCwnUCcrdW5pdCwnRScrdW5pdCwnWicrdW5pdCwnWScrdW5pdF07XG4gICAgICAgLy8gPyBbJ2tCJywnTUInLCdHQicsJ1RCJywnUEInLCdFQicsJ1pCJywnWUInXTogWydLaUInLCdNaUInLCdHaUInLCdUaUInLCdQaUInLCdFaUInLCdaaUInLCdZaUInXTtcbiAgICBsZXQgdSA9IC0xO1xuICAgIGRvIHtcbiAgICAgICAgYnl0ZXMgLz0gdGhyZXNoO1xuICAgICAgICArK3U7XG4gICAgfSB3aGlsZShNYXRoLmFicyhieXRlcykgPj0gdGhyZXNoICYmIHUgPCB1bml0cy5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gYnl0ZXMudG9GaXhlZCgxKSt1bml0c1t1XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2l6ZUh1bWFuaXplcjsiXSwic291cmNlUm9vdCI6IiJ9