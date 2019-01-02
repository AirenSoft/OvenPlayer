/*! OvenPlayerv0.7.9 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.Html5"],{

/***/ "./src/js/api/provider/html5/providers/Html5.js":
/*!******************************************************!*\
  !*** ./src/js/api/provider/html5/providers/Html5.js ***!
  \******************************************************/
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

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   html5 provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

/**
 * Created by hoho on 2018. 8. 24..
 */
var Html5 = function Html5(container, playerConfig) {

    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_HTML5);
    var element = mediaManager.create();

    var spec = {
        name: _constants.PROVIDER_HTML5,
        extendedElement: element,
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

    var that = (0, _Provider2["default"])(spec, playerConfig, null);
    var superDestroy_func = that["super"]('destroy');

    OvenPlayerConsole.log("HTML5 PROVIDER LOADED.");

    that.destroy = function () {
        mediaManager.destroy();
        mediaManager = null;
        element = null;
        OvenPlayerConsole.log("HTML5 : PROVIDER DESTROYED.");

        superDestroy_func();
    };

    return that;
};

exports["default"] = Html5;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNS5qcyJdLCJuYW1lcyI6WyJIdG1sNSIsImNvbnRhaW5lciIsInBsYXllckNvbmZpZyIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX0hUTUw1IiwiZWxlbWVudCIsImNyZWF0ZSIsInNwZWMiLCJuYW1lIiwiZXh0ZW5kZWRFbGVtZW50IiwibGlzdGVuZXIiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImZyYW1lcmF0ZSIsImN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFNvdXJjZSIsInF1YWxpdHlMZXZlbHMiLCJzb3VyY2VzIiwidGhhdCIsInN1cGVyRGVzdHJveV9mdW5jIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJkZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7QUFSQTs7O0FBY0EsSUFBTUEsUUFBUSxTQUFSQSxLQUFRLENBQVNDLFNBQVQsRUFBb0JDLFlBQXBCLEVBQWlDOztBQUUzQyxRQUFJQyxlQUFlLDBCQUFhRixTQUFiLEVBQXdCRyx5QkFBeEIsQ0FBbkI7QUFDQSxRQUFJQyxVQUFVRixhQUFhRyxNQUFiLEVBQWQ7O0FBRUEsUUFBSUMsT0FBTztBQUNQQyxjQUFPSix5QkFEQTtBQUVQSyx5QkFBa0JKLE9BRlg7QUFHUEssa0JBQVcsSUFISjtBQUlQQyxpQkFBVSxLQUpIO0FBS1BDLGdCQUFTLEtBTEY7QUFNUEMsaUJBQVUsS0FOSDtBQU9QQyxlQUFRQyxxQkFQRDtBQVFQQyxnQkFBUyxDQVJGO0FBU1BDLG1CQUFZLENBVEw7QUFVUEMsd0JBQWlCLENBQUMsQ0FWWDtBQVdQQyx1QkFBZ0IsQ0FBQyxDQVhWO0FBWVBDLHVCQUFnQixFQVpUO0FBYVBDLGlCQUFVO0FBYkgsS0FBWDs7QUFnQkEsUUFBSUMsT0FBTywyQkFBU2YsSUFBVCxFQUFlTCxZQUFmLEVBQTZCLElBQTdCLENBQVg7QUFDQSxRQUFJcUIsb0JBQXFCRCxjQUFXLFNBQVgsQ0FBekI7O0FBRUFFLHNCQUFrQkMsR0FBbEIsQ0FBc0Isd0JBQXRCOztBQUVBSCxTQUFLSSxPQUFMLEdBQWUsWUFBSztBQUNoQnZCLHFCQUFhdUIsT0FBYjtBQUNBdkIsdUJBQWUsSUFBZjtBQUNBRSxrQkFBVSxJQUFWO0FBQ0FtQiwwQkFBa0JDLEdBQWxCLENBQXNCLDZCQUF0Qjs7QUFFQUY7QUFDSCxLQVBEOztBQVNBLFdBQU9ELElBQVA7QUFFSCxDQXJDRDs7cUJBdUNldEIsSyIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXHJcbiAqL1xyXG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQge1BST1ZJREVSX0hUTUw1LCBTVEFURV9JRExFfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIGh0bWw1IHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXHJcbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cclxuICogKi9cclxuXHJcbmNvbnN0IEh0bWw1ID0gZnVuY3Rpb24oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpe1xyXG5cclxuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyLCBQUk9WSURFUl9IVE1MNSk7XHJcbiAgICBsZXQgZWxlbWVudCA9IG1lZGlhTWFuYWdlci5jcmVhdGUoKTtcclxuXHJcbiAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICBuYW1lIDogUFJPVklERVJfSFRNTDUsXHJcbiAgICAgICAgZXh0ZW5kZWRFbGVtZW50IDogZWxlbWVudCxcclxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXHJcbiAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxyXG4gICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxyXG4gICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcclxuICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXHJcbiAgICAgICAgYnVmZmVyIDogMCxcclxuICAgICAgICBmcmFtZXJhdGUgOiAwLFxyXG4gICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXHJcbiAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxyXG4gICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcclxuICAgICAgICBzb3VyY2VzIDogW11cclxuICAgIH07XHJcblxyXG4gICAgbGV0IHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIG51bGwpO1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jICA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJIVE1MNSBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgIG1lZGlhTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgbWVkaWFNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBlbGVtZW50ID0gbnVsbDtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJIVE1MNSA6IFBST1ZJREVSIERFU1RST1lFRC5cIik7XHJcblxyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEh0bWw1O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9