/*! OvenPlayerv0.9.853 | (c)2020 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.HlsProvider"],{

/***/ "./src/js/api/provider/html5/providers/Hls.js":
/*!****************************************************!*\
  !*** ./src/js/api/provider/html5/providers/Hls.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Provider = __webpack_require__(/*! api/provider/html5/Provider */ "./src/js/api/provider/html5/Provider.js");

var _Provider2 = _interopRequireDefault(_Provider);

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _constants2 = __webpack_require__(/*! ../../../constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   hlsjs provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

var HlsProvider = function HlsProvider(element, playerConfig, adTagUrl) {
    var that = {};
    var hls = null;
    var superPlay_func = null;
    var superDestroy_func = null;
    var loadRetryer = null;
    var isManifestLoaded = false;
    var firstLoaded = false;

    try {
        hls = new Hls({
            debug: false,
            maxBufferLength: 20,
            maxMaxBufferLength: 30,
            fragLoadingMaxRetry: 0,
            manifestLoadingMaxRetry: 0,
            levelLoadingMaxRetry: 0
        });

        hls.attachMedia(element);

        var spec = {
            name: _constants.PROVIDER_HLS,
            element: element,
            mse: hls,
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

            OvenPlayerConsole.log("HLS : onExtendedLoad : ", source, "lastPlayPosition : " + lastPlayPosition);

            var loadingRetryCount = playerConfig.getConfig().loadingRetryCount;

            hls.loadSource(source.file);

            hls.once(Hls.Events.MANIFEST_LOADED, function (event, data) {

                isManifestLoaded = true;
            });

            hls.once(Hls.Events.LEVEL_LOADED, function (event, data) {

                firstLoaded = true;

                if (loadRetryer) {
                    clearTimeout(loadRetryer);
                    loadRetryer = null;
                }

                hls.config.fragLoadingMaxRetry = 2;
                hls.config.manifestLoadingMaxRetry = 2;
                hls.config.levelLoadingMaxRetry = 2;

                if (data.details.live) {
                    spec.isLive = true;
                } else {
                    if (lastPlayPosition > 0) {
                        that.seek(lastPlayPosition);
                    }
                }
                if (playerConfig.isAutoStart()) {
                    that.play();
                }
            });

            hls.on(Hls.Events.ERROR, function (event, data) {

                if (data.networkDetails.status === 202) {

                    that.setState(_constants.STATE_LOADING);

                    if (loadRetryer) {
                        clearTimeout(loadRetryer);
                        loadRetryer = null;
                    }

                    loadRetryer = setTimeout(function () {

                        hls.stopLoad();
                        hls.loadSource(source.file);
                    }, 1000);
                } else {

                    if (loadingRetryCount > 0) {

                        that.setState(_constants.STATE_LOADING);

                        if (loadRetryer) {
                            clearTimeout(loadRetryer);
                            loadRetryer = null;
                        }

                        loadingRetryCount = loadingRetryCount - 1;

                        loadRetryer = setTimeout(function () {

                            hls.stopLoad();
                            hls.loadSource(source.file);
                        }, 1000);
                    } else {
                        var tempError = _constants.ERRORS.codes[_constants2.PLAYER_UNKNWON_NEWWORK_ERROR];
                        tempError.error = data.details;
                        (0, _utils.errorTrigger)(tempError, that);
                    }
                }
            });

            that.on(_constants.PLAYER_STATE, function (data) {

                if (!firstLoaded && data.prevstate === _constants.STATE_LOADING && data.newstate === _constants.STATE_IDLE) {

                    if (loadRetryer) {
                        clearTimeout(loadRetryer);
                        loadRetryer = null;
                    }

                    hls.stopLoad();
                }
            });
        });

        superPlay_func = that["super"]('play');
        superDestroy_func = that["super"]('destroy');
        OvenPlayerConsole.log("HLS PROVIDER LOADED.");

        that.play = function () {

            if (!isManifestLoaded) {
                var source = that.getSources()[that.getCurrentSource()].file;
                hls.loadSource(source);
            } else {
                superPlay_func();
            }
        };

        that.destroy = function () {
            hls.destroy();
            hls = null;
            OvenPlayerConsole.log("HLS : PROVIDER DESTROUYED.");
            superDestroy_func();
        };
    } catch (error) {
        var tempError = _constants.ERRORS.codes[_constants.INIT_HLSJS_NOTFOUND];
        tempError.error = error;
        throw tempError;
    }

    return that;
}; /**
    * Created by hoho on 2018. 6. 7..
    */
exports["default"] = HlsProvider;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMuanMiXSwibmFtZXMiOlsiSGxzUHJvdmlkZXIiLCJlbGVtZW50IiwicGxheWVyQ29uZmlnIiwiYWRUYWdVcmwiLCJ0aGF0IiwiaGxzIiwic3VwZXJQbGF5X2Z1bmMiLCJzdXBlckRlc3Ryb3lfZnVuYyIsImxvYWRSZXRyeWVyIiwiaXNNYW5pZmVzdExvYWRlZCIsImZpcnN0TG9hZGVkIiwiSGxzIiwiZGVidWciLCJtYXhCdWZmZXJMZW5ndGgiLCJtYXhNYXhCdWZmZXJMZW5ndGgiLCJmcmFnTG9hZGluZ01heFJldHJ5IiwibWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkiLCJsZXZlbExvYWRpbmdNYXhSZXRyeSIsImF0dGFjaE1lZGlhIiwic3BlYyIsIm5hbWUiLCJQUk9WSURFUl9ITFMiLCJtc2UiLCJsaXN0ZW5lciIsImlzTG9hZGVkIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImxhc3RQbGF5UG9zaXRpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImxvYWRpbmdSZXRyeUNvdW50IiwiZ2V0Q29uZmlnIiwibG9hZFNvdXJjZSIsImZpbGUiLCJvbmNlIiwiRXZlbnRzIiwiTUFOSUZFU1RfTE9BREVEIiwiZXZlbnQiLCJkYXRhIiwiTEVWRUxfTE9BREVEIiwiY2xlYXJUaW1lb3V0IiwiY29uZmlnIiwiZGV0YWlscyIsImxpdmUiLCJzZWVrIiwiaXNBdXRvU3RhcnQiLCJwbGF5Iiwib24iLCJFUlJPUiIsIm5ldHdvcmtEZXRhaWxzIiwic3RhdHVzIiwic2V0U3RhdGUiLCJTVEFURV9MT0FESU5HIiwic2V0VGltZW91dCIsInN0b3BMb2FkIiwidGVtcEVycm9yIiwiRVJST1JTIiwiY29kZXMiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiZXJyb3IiLCJQTEFZRVJfU1RBVEUiLCJwcmV2c3RhdGUiLCJuZXdzdGF0ZSIsImdldFNvdXJjZXMiLCJnZXRDdXJyZW50U291cmNlIiwiZGVzdHJveSIsIklOSVRfSExTSlNfTk9URk9VTkQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7QUFDQTs7QUFNQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQU9BLElBQU1BLGNBQWMsU0FBZEEsV0FBYyxDQUFVQyxPQUFWLEVBQW1CQyxZQUFuQixFQUFpQ0MsUUFBakMsRUFBMkM7QUFDM0QsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsTUFBTSxJQUFWO0FBQ0EsUUFBSUMsaUJBQWlCLElBQXJCO0FBQ0EsUUFBSUMsb0JBQW9CLElBQXhCO0FBQ0EsUUFBSUMsY0FBYyxJQUFsQjtBQUNBLFFBQUlDLG1CQUFtQixLQUF2QjtBQUNBLFFBQUlDLGNBQWMsS0FBbEI7O0FBRUEsUUFBSTtBQUNBTCxjQUFNLElBQUlNLEdBQUosQ0FBUTtBQUNWQyxtQkFBTyxLQURHO0FBRVZDLDZCQUFpQixFQUZQO0FBR1ZDLGdDQUFvQixFQUhWO0FBSVZDLGlDQUFxQixDQUpYO0FBS1ZDLHFDQUF5QixDQUxmO0FBTVZDLGtDQUFzQjtBQU5aLFNBQVIsQ0FBTjs7QUFTQVosWUFBSWEsV0FBSixDQUFnQmpCLE9BQWhCOztBQUVBLFlBQUlrQixPQUFPO0FBQ1BDLGtCQUFNQyx1QkFEQztBQUVQcEIscUJBQVNBLE9BRkY7QUFHUHFCLGlCQUFLakIsR0FIRTtBQUlQa0Isc0JBQVUsSUFKSDtBQUtQQyxzQkFBVSxLQUxIO0FBTVBDLHFCQUFTLEtBTkY7QUFPUEMsb0JBQVEsS0FQRDtBQVFQQyxxQkFBUyxLQVJGO0FBU1BDLG1CQUFPQyxxQkFUQTtBQVVQQyxvQkFBUSxDQVZEO0FBV1BDLHVCQUFXLENBWEo7QUFZUEMsNEJBQWdCLENBQUMsQ0FaVjtBQWFQQywy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ZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDcuLlxuICovXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgUFJPVklERVJfSExTLFxuICAgIFBMQVlFUl9TVEFURSwgU1RBVEVfSURMRSwgU1RBVEVfTE9BRElORyxcbiAgICBJTklUX0RBU0hfVU5TVVBQT1JULCBFUlJPUlMsXG4gICAgSU5JVF9ITFNKU19OT1RGT1VORFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcbmltcG9ydCB7UExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUn0gZnJvbSBcIi4uLy4uLy4uL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIGhsc2pzIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxuICogKi9cblxuXG5jb25zdCBIbHNQcm92aWRlciA9IGZ1bmN0aW9uIChlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKSB7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgaGxzID0gbnVsbDtcbiAgICBsZXQgc3VwZXJQbGF5X2Z1bmMgPSBudWxsO1xuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyA9IG51bGw7XG4gICAgbGV0IGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICBsZXQgaXNNYW5pZmVzdExvYWRlZCA9IGZhbHNlO1xuICAgIGxldCBmaXJzdExvYWRlZCA9IGZhbHNlO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgaGxzID0gbmV3IEhscyh7XG4gICAgICAgICAgICBkZWJ1ZzogZmFsc2UsXG4gICAgICAgICAgICBtYXhCdWZmZXJMZW5ndGg6IDIwLFxuICAgICAgICAgICAgbWF4TWF4QnVmZmVyTGVuZ3RoOiAzMCxcbiAgICAgICAgICAgIGZyYWdMb2FkaW5nTWF4UmV0cnk6IDAsXG4gICAgICAgICAgICBtYW5pZmVzdExvYWRpbmdNYXhSZXRyeTogMCxcbiAgICAgICAgICAgIGxldmVsTG9hZGluZ01heFJldHJ5OiAwXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhscy5hdHRhY2hNZWRpYShlbGVtZW50KTtcblxuICAgICAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgICAgIG5hbWU6IFBST1ZJREVSX0hMUyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICBtc2U6IGhscyxcbiAgICAgICAgICAgIGxpc3RlbmVyOiBudWxsLFxuICAgICAgICAgICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY2FuU2VlazogZmFsc2UsXG4gICAgICAgICAgICBpc0xpdmU6IGZhbHNlLFxuICAgICAgICAgICAgc2Vla2luZzogZmFsc2UsXG4gICAgICAgICAgICBzdGF0ZTogU1RBVEVfSURMRSxcbiAgICAgICAgICAgIGJ1ZmZlcjogMCxcbiAgICAgICAgICAgIGZyYW1lcmF0ZTogMCxcbiAgICAgICAgICAgIGN1cnJlbnRRdWFsaXR5OiAtMSxcbiAgICAgICAgICAgIGN1cnJlbnRTb3VyY2U6IC0xLFxuICAgICAgICAgICAgcXVhbGl0eUxldmVsczogW10sXG4gICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgIGFkVGFnVXJsOiBhZFRhZ1VybFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uIChzb3VyY2UsIGxhc3RQbGF5UG9zaXRpb24pIHtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogb25FeHRlbmRlZExvYWQgOiBcIiwgc291cmNlLCBcImxhc3RQbGF5UG9zaXRpb24gOiBcIiArIGxhc3RQbGF5UG9zaXRpb24pO1xuXG4gICAgICAgICAgICBsZXQgbG9hZGluZ1JldHJ5Q291bnQgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG9hZGluZ1JldHJ5Q291bnQ7XG5cbiAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZS5maWxlKTtcblxuICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5NQU5JRkVTVF9MT0FERUQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaXNNYW5pZmVzdExvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaGxzLm9uY2UoSGxzLkV2ZW50cy5MRVZFTF9MT0FERUQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZmlyc3RMb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRSZXRyeWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBobHMuY29uZmlnLmZyYWdMb2FkaW5nTWF4UmV0cnkgPSAyO1xuICAgICAgICAgICAgICAgIGhscy5jb25maWcubWFuaWZlc3RMb2FkaW5nTWF4UmV0cnkgPSAyO1xuICAgICAgICAgICAgICAgIGhscy5jb25maWcubGV2ZWxMb2FkaW5nTWF4UmV0cnkgPSAyO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGV0YWlscy5saXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWMuaXNMaXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFBsYXlQb3NpdGlvbiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VlayhsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGhscy5vbihIbHMuRXZlbnRzLkVSUk9SLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm5ldHdvcmtEZXRhaWxzLnN0YXR1cyA9PT0gMjAyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZS5maWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkaW5nUmV0cnlDb3VudCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9MT0FESU5HKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvYWRSZXRyeWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRSZXRyeWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmdSZXRyeUNvdW50ID0gbG9hZGluZ1JldHJ5Q291bnQgLSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLnN0b3BMb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2Uoc291cmNlLmZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZGF0YS5kZXRhaWxzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKHRlbXBFcnJvciwgdGhhdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhhdC5vbihQTEFZRVJfU1RBVEUsIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZpcnN0TG9hZGVkICYmIGRhdGEucHJldnN0YXRlID09PSBTVEFURV9MT0FESU5HICYmIGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX0lETEUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobG9hZFJldHJ5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsb2FkUmV0cnllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkUmV0cnllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBobHMuc3RvcExvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3VwZXJQbGF5X2Z1bmMgPSB0aGF0LnN1cGVyKCdwbGF5Jyk7XG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgUFJPVklERVIgTE9BREVELlwiKTtcblxuICAgICAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICghaXNNYW5pZmVzdExvYWRlZCkge1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSB0aGF0LmdldFNvdXJjZXMoKVt0aGF0LmdldEN1cnJlbnRTb3VyY2UoKV0uZmlsZTtcbiAgICAgICAgICAgICAgICBobHMubG9hZFNvdXJjZShzb3VyY2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdXBlclBsYXlfZnVuYygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgaGxzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGhscyA9IG51bGw7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJITFMgOiBQUk9WSURFUiBERVNUUk9VWUVELlwiKTtcbiAgICAgICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tJTklUX0hMU0pTX05PVEZPVU5EXTtcbiAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHRocm93IHRlbXBFcnJvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgSGxzUHJvdmlkZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==