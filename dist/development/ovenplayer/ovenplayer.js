/*! OvenPlayerv0.6.6 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"ovenplayer": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5":"ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5","ovenplayer.provider.DashProvider":"ovenplayer.provider.DashProvider","ovenplayer.provider.HlsProvider":"ovenplayer.provider.HlsProvider","ovenplayer.provider.html5":"ovenplayer.provider.html5"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/ovenplayer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./node_modules/less-loader/dist/cjs.js??ref--5-2!./src/css/ovenplayer.less":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js??ref--5-2!./src/css/ovenplayer.less ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";.ovp-wrapper{position:relative;max-height:100%;overflow:hidden;zoom:1 !important;width:100%;display:block;background-color:#000;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;color:#eee;font-family:'Noto Sans',sans-serif;font-size:11px;line-height:1.3;font-weight:normal;outline:0}.ovp-wrapper:before,.ovp-wrapper:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ovp-wrapper *,.ovp-wrapper *:before,.ovp-wrapper *:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ovp-wrapper.ovp-fullscreen{height:100% !important}.ovp-wrapper.ovp-autohide{cursor:none}.ovp-wrapper.ovp-autohide .ovp-gradient-top,.ovp-wrapper.ovp-autohide .ovp-gradient-bottom,.ovp-wrapper.ovp-autohide .ovp-bottom-panel{opacity:0}.ovp-wrapper.ovp-autohide .ovp-progressbar-container,.ovp-wrapper.ovp-autohide .ovp-controls .ovp-button{cursor:none}.ovp-wrapper.ovp-autohide .ovp-caption-text-container{bottom:25px}.ovp-wrapper .ovp-ratio{padding-bottom:56.25%}.ovp-player{position:absolute;top:0;bottom:0;width:100%}.ovp-player .ovp-media-element-container{display:block;position:absolute;top:0;bottom:0;left:0;right:0;height:100%;width:100%}.ovp-player .ovp-media-element-container>*{width:100%;height:100%}.ovp-player .ovp-ui{position:absolute;top:0;width:100%;height:100%}.ovp-button{display:inline-block;border:none;background:transparent;padding:0;color:inherit;text-align:inherit;overflow:hidden;font-weight:100}.ovp-button:focus,.ovp-button{outline:0}.ovp-gradient-top,.ovp-gradient-bottom{width:100%;position:absolute;background-color:#12121c;pointer-events:none;opacity:.3;-moz-transition:opacity .25s cubic-bezier(0, 0, .2, 1);-webkit-transition:opacity .25s cubic-bezier(0, 0, .2, 1);transition:opacity .25s cubic-bezier(0, 0, .2, 1)}.ovp-gradient-bottom{height:50px;bottom:0;z-index:22}.ovp-spinner-container{position:absolute;top:0;left:0;width:100%;height:100%;display:none}.ovp-spinner-container .ovp-spinner{width:70px;height:18px;position:absolute;top:50%;left:50%;margin-top:-9px;margin-left:-35px;text-align:center}.ovp-spinner-container .ovp-spinner>div{width:18px;height:18px;background-color:#50e3c2;border-radius:100%;display:inline-block;-webkit-animation:sk-bouncedelay 1.4s infinite ease-in-out both;animation:sk-bouncedelay 1.4s infinite ease-in-out both}.ovp-spinner-container .ovp-spinner .bounce1{-webkit-animation-delay:-0.32s;animation-delay:-0.32s}.ovp-spinner-container .ovp-spinner .bounce2{-webkit-animation-delay:-0.16s;animation-delay:-0.16s}@-webkit-keyframes sk-bouncedelay{0%,80%,100%{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}@keyframes sk-bouncedelay{0%,80%,100%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}.ovp-message-box{position:absolute;top:0;left:0;width:100%;height:100%}.ovp-message-box .ovp-message-container{position:absolute;top:60px;width:100%;padding:0 12px;text-align:center}.ovp-message-box .ovp-message-container .ovp-message-text{font-size:140%;background-color:rgba(0,0,0,0.5);color:#fff;padding:.1em .3em;word-wrap:break-word;line-height:1.5em}.ovp-bigbutton-container{position:absolute;top:0;left:0;width:100%;height:100%}.ovp-bigbutton-container .ovp-bigbutton{position:absolute;top:50%;left:50%;width:80px;height:80px;margin-top:-40px;margin-left:-40px;text-align:center}.ovp-bigbutton-container .ovp-bigbutton.ovp-bigbutton-play{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-play-large.svg */ "./src/assets/images/ic-player-play-large.svg")) + ");background-size:100%}.ovp-bigbutton-container .ovp-bigbutton.ovp-bigbutton-pause{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-stop-large.svg */ "./src/assets/images/ic-player-stop-large.svg")) + ");background-size:100%}.ovp-bigbutton-container .ovp-bigbutton.ovp-bigbutton-replay{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-re-large.svg */ "./src/assets/images/ic-player-re-large.svg")) + ");background-size:100%}.ovp-setting-panel{position:absolute;bottom:55px;right:12px;overflow-y:auto;width:260px;font-size:120%;user-select:none;background-color:rgba(28,28,28,0.9);text-shadow:0 0 2px rgba(0,0,0,0.5)}.ovp-setting-panel .ovp-setting-title,.ovp-setting-panel .ovp-setting-item{width:100%;height:38px;line-height:38px;color:#eee;cursor:pointer;outline:none}.ovp-setting-panel .ovp-setting-title-container .ovp-setting-title .ovp-setting-title-title{padding-left:12px}.ovp-setting-panel .ovp-setting-title-container .ovp-setting-title .ovp-setting-title-previcon{padding:0 0 0 12px;margin-right:-6px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item:hover{background-color:rgba(255,255,255,0.1)}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item .ovp-setting-item-title{padding-left:12px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item .ovp-setting-item-nexticon{float:right;padding-right:12px;margin-left:-6px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item span.ovp-setting-item-value{float:right;padding-right:12px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item.ovp-setting-item-value .ovp-setting-item-title{margin-left:-6px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item.ovp-setting-item-value .ovp-setting-item-checked{padding-left:12px;visibility:hidden}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item.ovp-setting-item-value .ovp-setting-item-checked.ovp-show{visibility:visible}.ovp-controls-container .ovp-bottom-panel{position:absolute;left:0px;right:0px;bottom:0px;height:50px;z-index:60;-moz-transition:opacity .25s cubic-bezier(0, 0, .2, 1);-webkit-transition:opacity .25s cubic-bezier(0, 0, .2, 1);transition:opacity .25s cubic-bezier(0, 0, .2, 1)}.ovp-controls-container .ovp-bottom-panel .ovp-progressbar-container{display:block;position:absolute;width:100%;bottom:50px;height:4px;cursor:pointer}.ovp-controls-container .ovp-bottom-panel .ovp-progressbar-container .ovp-progressbar-padding{position:absolute;width:100%;height:16px;bottom:0;z-index:28}.ovp-controls-container .ovp-bottom-panel .ovp-controls{position:absolute;bottom:0;width:100%;height:50px;text-align:left}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-button{min-width:30px;height:30px;cursor:pointer}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-left-controls{float:left;height:100%}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-right-controls{float:right;height:100%}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-right-controls .ovp-setting-button{position:relative;top:10px;margin-right:12px}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-right-controls .ovp-setting-button>i{display:inline-block;width:100%;height:100%;background-size:100%;background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-setting.svg */ "./src/assets/images/ic-player-setting.svg")) + ")}.ovp-progressbar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:31;outline:none}.ovp-progressbar .ovp-play-background-color{background-color:#50e3c2}.ovp-progressbar .ovp-progress-list{position:relative;height:100%;background:rgba(255,255,255,0.2);z-index:39}.ovp-progressbar .ovp-progress-list .ovp-load-progress,.ovp-progressbar .ovp-progress-list .ovp-play-progress,.ovp-progressbar .ovp-progress-list .ovp-hover-progress{position:absolute;left:0;bottom:0;width:100%;height:100%;-moz-transform-origin:0 0;-ms-transform-origin:0 0;-webkit-transform-origin:0 0;transform-origin:0 0}.ovp-progressbar .ovp-progress-list .ovp-play-progress{width:0;z-index:34;-webkit-transition:width .1s ease;transition:width .1s ease}.ovp-progressbar .ovp-progress-list .ovp-load-progress{width:0;z-index:33;background-color:rgba(255,255,255,0.5);-webkit-transition:width .5s ease;transition:width .5s ease}.ovp-progressbar .ovp-progress-list .ovp-hover-progress{left:0;width:0;z-index:35;background-color:rgba(255,255,255,0.6)}.ovp-progressbar .ovp-progressbar-knob-container{position:absolute;top:-5px;left:0px;z-index:43;-moz-transition:-moz-transform .1s cubic-bezier(.4, 0, 1, 1);-webkit-transition:-webkit-transform .1s cubic-bezier(.4, 0, 1, 1);-ms-transition:-ms-transform .1s cubic-bezier(.4, 0, 1, 1);transition:transform .1s cubic-bezier(.4, 0, 1, 1);-moz-transform:scale(0);-ms-transform:scale(0);-webkit-transform:scale(0);transform:scale(0)}.ovp-progressbar .ovp-progressbar-knob-container .ovp-progressbar-knob{width:14px;height:14px;border-radius:7px;-webkit-transition:width .1s ease;transition:width .1s ease}.ovp-progressbar .ovp-progressbar-time{display:none;position:absolute;bottom:15px;left:0;width:auto;background-color:rgba(28,28,28,0.9);border-radius:2px;padding:5px 9px;font-size:118%;line-height:15px;user-select:none}.ovp-progressbar-hover .ovp-progressbar-knob-container{-moz-transform:none;-ms-transform:none;-webkit-transform:none;transform:none;-moz-transition:-moz-transform .1s cubic-bezier(0, 0, .2, 1);-webkit-transition:-webkit-transform .1s cubic-bezier(0, 0, .2, 1);-ms-transition:-ms-transform .1s cubic-bezier(0, 0, .2, 1);transition:transform .1s cubic-bezier(0, 0, .2, 1)}.ovp-progressbar-hover .ovp-progressbar-time{display:inline-block}.ovp-on-error .ovp-progressbar-time{display:none}.ovp-play-button{position:relative;top:10px;margin-left:15px}.ovp-play-button>i{display:inline-block;width:100%;height:100%;background-size:100%}.ovp-play-button .ovp-play-button-playicon{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-play.svg */ "./src/assets/images/ic-player-play.svg")) + ")}.ovp-play-button .ovp-play-button-pauseicon{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-stop.svg */ "./src/assets/images/ic-player-stop.svg")) + ")}.ovp-volume-controller{display:inline-block;position:relative;top:10px;margin-left:12px;height:30px}.ovp-volume-controller .ovp-volume-button>i{display:inline-block;width:100%;height:100%;background-size:100%}.ovp-volume-controller .ovp-volume-button .ovp-volume-button-bigicon{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-volume.svg */ "./src/assets/images/ic-player-volume.svg")) + ")}.ovp-volume-controller .ovp-volume-button .ovp-volume-button-smallicon{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-volume-2.svg */ "./src/assets/images/ic-player-volume-2.svg")) + ")}.ovp-volume-controller .ovp-volume-button .ovp-volume-button-muteicon{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-volume-mute.svg */ "./src/assets/images/ic-player-volume-mute.svg")) + ")}.ovp-volume-controller .ovp-volume-slider-container{display:inline-block;position:relative;width:0px;height:100%;overflow:hidden;cursor:pointer;user-select:none;outline:none;-moz-transition:margin .2s cubic-bezier(.4, 0, 1, 1),width .2s cubic-bezier(.4, 0, 1, 1);-webkit-transition:margin .2s cubic-bezier(.4, 0, 1, 1),width .2s cubic-bezier(.4, 0, 1, 1);transition:margin .2s cubic-bezier(.4, 0, 1, 1),width .2s cubic-bezier(.4, 0, 1, 1)}.ovp-volume-controller .ovp-volume-slider-container.active{width:70px;margin-left:8px;margin-right:0;-moz-transition:margin .2s cubic-bezier(0, 0, .2, 1),width .2s cubic-bezier(0, 0, .2, 1);-webkit-transition:margin .2s cubic-bezier(0, 0, .2, 1),width .2s cubic-bezier(0, 0, .2, 1);transition:margin .2s cubic-bezier(0, 0, .2, 1),width .2s cubic-bezier(0, 0, .2, 1)}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder{height:100%;position:relative;overflow:hidden}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-bg,.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-value{position:absolute;display:block;left:0;top:50%;height:4px;margin-top:-2px;border-radius:10px}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-bg{width:100%;background:#fff}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-value{width:100%;background:#50e3c2}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle{position:absolute;top:50%;left:30px;width:12px;height:12px;border-radius:6px;margin-top:-6px;background:#fff}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle:before,.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle:after{content:'';position:absolute;display:none;top:50%;height:4px;margin-top:-2px;width:80px;z-index:-1}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle:before{left:-58px;background:#50e3c2}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle:after{left:6px;background:#fff}.ovp-time-display{display:inline-block;position:relative;top:10px;margin-left:12px;height:30px;white-space:nowrap;line-height:30px;vertical-align:top;font-size:14px;user-select:none}.ovp-time-display .ovp-time-current,.ovp-time-display .ovp-time-separator,.ovp-time-display .ovp-time-duration{color:#fff}.ovp-time-display .ovp-live-badge{opacity:1;display:inline-block;width:auto;font-size:14px}.ovp-time-display .ovp-live-badge:before{background:#ff0000;display:inline-block;position:relative;top:-2px;width:6px;height:6px;margin-right:5px;content:'';border-radius:6px}.ovp-time-display .ovp-live-badge .ovp-live-badge-lowlatency{display:inline-block;margin-right:5px}.ovp-context-panel{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;position:absolute;overflow:hidden;width:200px;padding:6px 0;background:rgba(28,28,28,0.9);text-shadow:0 0 2px rgba(0,0,0,0.5);z-index:2300;font-family:Roboto,Arial,Helvetica,sans-serif;font-size:11px;font-weight:100;user-select:none}.ovp-context-panel:before,.ovp-context-panel:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ovp-context-panel *,.ovp-context-panel *:before,.ovp-context-panel *:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ovp-context-panel .ovp-context-item{width:100%;height:38px;padding-left:12px;line-height:38px;color:#eee;cursor:pointer;outline:none;font-size:120%}.ovp-context-panel .ovp-context-item:hover{background-color:rgba(255,255,255,0.1)}.ovp-fullscreen-button{position:relative;top:10px;margin-right:15px}.ovp-fullscreen-button>i{display:inline-block;width:100%;height:100%;background-size:100%}.ovp-fullscreen-button .ovp-fullscreen-button-expandicon{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-fullscreen-expand.svg */ "./src/assets/images/ic-player-fullscreen-expand.svg")) + ")}.ovp-fullscreen-button .ovp-fullscreen-button-compressicon{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-fullscreen-compress.svg */ "./src/assets/images/ic-player-fullscreen-compress.svg")) + ")}@keyframes fade{from{opacity:.3}55%{opacity:1}75%{opacity:1}to{opacity:.3}}@-webkit-keyframes shake{from,to{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px, 0, 0);transform:translate3d(-10px, 0, 0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px, 0, 0);transform:translate3d(10px, 0, 0)}}@keyframes shake{from,to{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px, 0, 0);transform:translate3d(-10px, 0, 0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px, 0, 0);transform:translate3d(10px, 0, 0)}}.ovp-player .shake{-webkit-animation-name:shake;animation-name:shake}@-webkit-keyframes bounceIn{from,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215, .61, .355, 1);animation-timing-function:cubic-bezier(.215, .61, .355, 1)}0%{opacity:0;-webkit-transform:scale3d(.5, .5, .5);transform:scale3d(.5, .5, .5)}20%{-webkit-transform:scale3d(1.1, 1.1, 1.1);transform:scale3d(1.1, 1.1, 1.1)}40%{-webkit-transform:scale3d(.9, .9, .9);transform:scale3d(.9, .9, .9)}60%{opacity:1;-webkit-transform:scale3d(1.03, 1.03, 1.03);transform:scale3d(1.03, 1.03, 1.03)}80%{-webkit-transform:scale3d(.97, .97, .97);transform:scale3d(.97, .97, .97)}to{opacity:1;-webkit-transform:scale3d(1, 1, 1);transform:scale3d(1, 1, 1)}}@keyframes bounceIn{from,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215, .61, .355, 1);animation-timing-function:cubic-bezier(.215, .61, .355, 1)}0%{opacity:0;-webkit-transform:scale3d(.3, .3, .3);transform:scale3d(.3, .3, .3)}20%{-webkit-transform:scale3d(1.1, 1.1, 1.1);transform:scale3d(1.1, 1.1, 1.1)}40%{-webkit-transform:scale3d(.9, .9, .9);transform:scale3d(.9, .9, .9)}60%{opacity:1;-webkit-transform:scale3d(1.03, 1.03, 1.03);transform:scale3d(1.03, 1.03, 1.03)}80%{-webkit-transform:scale3d(.97, .97, .97);transform:scale3d(.97, .97, .97)}to{opacity:1;-webkit-transform:scale3d(1, 1, 1);transform:scale3d(1, 1, 1)}}.ovp-player .bounceIn{-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-name:bounceIn;animation-name:bounceIn}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.ovp-player .fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn}.ovp-player .animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@media (prefers-reduced-motion){.ovp-player .animated{-webkit-animation:unset !important;animation:unset !important;-webkit-transition:none !important;transition:none !important}}.ovp-caption-viewer{position:absolute;top:0;left:0;width:100%;height:100%}.ovp-caption-viewer .ovp-caption-text-container{position:absolute;bottom:60px;width:100%;padding:0 12px;text-align:center;-moz-transition:bottom .25s cubic-bezier(0, 0, .2, 1);-webkit-transition:bottom .25s cubic-bezier(0, 0, .2, 1);transition:bottom .25s cubic-bezier(0, 0, .2, 1)}.ovp-caption-viewer .ovp-caption-text-container .ovp-caption-text{display:none;font-size:220%;background-color:rgba(8,8,8,0.75);border-radius:3px;color:#fff;padding:.1em .3em;word-wrap:break-word;line-height:1.5em;user-select:none}.ovp-caption-button{width:36px}.ovp-caption-button>i{font-size:18px;-moz-transition:color .25s cubic-bezier(0, 0, .2, 1);-webkit-transition:color .25s cubic-bezier(0, 0, .2, 1);transition:color .25s cubic-bezier(0, 0, .2, 1)}.ovp-caption-active .ovp-caption-button>i{color:#F36446}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/assets/images/ic-player-fullscreen-compress.svg":
/*!*************************************************************!*\
  !*** ./src/assets/images/ic-player-fullscreen-compress.svg ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ovenplayer/css/1a8254e953d483071f2374774e6a8bee.svg";

/***/ }),

/***/ "./src/assets/images/ic-player-fullscreen-expand.svg":
/*!***********************************************************!*\
  !*** ./src/assets/images/ic-player-fullscreen-expand.svg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ovenplayer/css/b3c7a5e50a84d86375f49f4cc510d33c.svg";

/***/ }),

/***/ "./src/assets/images/ic-player-play-large.svg":
/*!****************************************************!*\
  !*** ./src/assets/images/ic-player-play-large.svg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ovenplayer/css/dc278e7e5c8a172e5e7f345956bdbada.svg";

/***/ }),

/***/ "./src/assets/images/ic-player-play.svg":
/*!**********************************************!*\
  !*** ./src/assets/images/ic-player-play.svg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ovenplayer/css/20111bd23bd336231187c6fe729fdc53.svg";

/***/ }),

/***/ "./src/assets/images/ic-player-re-large.svg":
/*!**************************************************!*\
  !*** ./src/assets/images/ic-player-re-large.svg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ovenplayer/css/824f7afb03898d888d9fd39ddda494e0.svg";

/***/ }),

/***/ "./src/assets/images/ic-player-setting.svg":
/*!*************************************************!*\
  !*** ./src/assets/images/ic-player-setting.svg ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ovenplayer/css/bd4a8beb3ca4869418d3af58e08a69b1.svg";

/***/ }),

/***/ "./src/assets/images/ic-player-stop-large.svg":
/*!****************************************************!*\
  !*** ./src/assets/images/ic-player-stop-large.svg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ovenplayer/css/ac1e52f9b386a8a49f2f6d99f2bf28ac.svg";

/***/ }),

/***/ "./src/assets/images/ic-player-stop.svg":
/*!**********************************************!*\
  !*** ./src/assets/images/ic-player-stop.svg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ovenplayer/css/918ca6efa18e20e85deb8ee82fc39967.svg";

/***/ }),

/***/ "./src/assets/images/ic-player-volume-2.svg":
/*!**************************************************!*\
  !*** ./src/assets/images/ic-player-volume-2.svg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ovenplayer/css/c196916ae91709b9857673d445cc2514.svg";

/***/ }),

/***/ "./src/assets/images/ic-player-volume-mute.svg":
/*!*****************************************************!*\
  !*** ./src/assets/images/ic-player-volume-mute.svg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ovenplayer/css/ad356d62af6472d167a53880f76a81bf.svg";

/***/ }),

/***/ "./src/assets/images/ic-player-volume.svg":
/*!************************************************!*\
  !*** ./src/assets/images/ic-player-volume.svg ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ovenplayer/css/6b12b38daa32eedc10603db3aa46deea.svg";

/***/ }),

/***/ "./src/css/ovenplayer.less":
/*!*********************************!*\
  !*** ./src/css/ovenplayer.less ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/less-loader/dist/cjs.js??ref--5-2!./ovenplayer.less */ "./node_modules/css-loader/index.js!./node_modules/less-loader/dist/cjs.js??ref--5-2!./src/css/ovenplayer.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/js/api/Api.js":
/*!***************************!*\
  !*** ./src/js/api/Api.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Configurator = __webpack_require__(/*! api/Configurator */ "./src/js/api/Configurator.js");

var _Configurator2 = _interopRequireDefault(_Configurator);

var _EventEmitter = __webpack_require__(/*! api/EventEmitter */ "./src/js/api/EventEmitter.js");

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _LazyCommandExecutor = __webpack_require__(/*! api/LazyCommandExecutor */ "./src/js/api/LazyCommandExecutor.js");

var _LazyCommandExecutor2 = _interopRequireDefault(_LazyCommandExecutor);

var _logger = __webpack_require__(/*! utils/logger */ "./src/js/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

var _Manager = __webpack_require__(/*! api/media/Manager */ "./src/js/api/media/Manager.js");

var _Manager2 = _interopRequireDefault(_Manager);

var _Manager3 = __webpack_require__(/*! api/playlist/Manager */ "./src/js/api/playlist/Manager.js");

var _Manager4 = _interopRequireDefault(_Manager3);

var _Controller = __webpack_require__(/*! api/provider/Controller */ "./src/js/api/provider/Controller.js");

var _Controller2 = _interopRequireDefault(_Controller);

var _promise = __webpack_require__(/*! api/shims/promise */ "./src/js/api/shims/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _version = __webpack_require__(/*! version */ "./src/js/version.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */

//import CaptionManager from "api/caption/Manager";
var Api = function Api(container) {
    var logManager = (0, _logger2.default)();
    var that = {};
    (0, _EventEmitter2.default)(that);

    OvenPlayerConsole.log("[[OvenPlayer]] v." + _version.version);
    OvenPlayerConsole.log("API loaded.");
    //let captionManager = CaptionManager(that);
    var mediaManager = (0, _Manager2.default)(container);
    var playlistManager = (0, _Manager4.default)();
    var providerController = (0, _Controller2.default)();
    var currentProvider = "";
    var playerConfig = "";
    var lazyQueue = "";

    var initProvider = function initProvider(lastPlayPosition) {
        var pickQualityFromSource = function pickQualityFromSource(sources) {
            var quality = 0;
            if (sources) {
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i].default) {
                        quality = i;
                    }
                    if (playerConfig.getQualityLabel() && sources[i].label === playerConfig.getQualityLabel()) {
                        return i;
                    }
                }
            }
            return quality;
        };

        return providerController.loadProviders(playlistManager.getPlaylist()).then(function (Providers) {
            if (currentProvider) {
                currentProvider.destroy();
                currentProvider = null;
            }
            var videoElement = mediaManager.createElement();
            var currentSourceIndex = pickQualityFromSource(playlistManager.getCurrentSources());

            OvenPlayerConsole.log("current source index : " + currentSourceIndex);

            currentProvider = Providers[currentSourceIndex](videoElement, playerConfig);

            //This passes the event created by the Provider to API.
            currentProvider.on("all", function (name, data) {
                that.trigger(name, data);

                //Auto next source when player load was fail by amiss source.
                if (name === _constants.ERROR && (data.code === _constants.PLAYER_FILE_ERROR || parseInt(data.code / 100) === 5) || name === _constants.NETWORK_UNSTABLED) {
                    var currentQuality = that.getCurrentQuality();
                    if (currentQuality + 1 < that.getQualityLevels().length) {
                        //this sequential has available source.
                        that.pause();
                        that.setCurrentQuality(currentQuality + 1);
                    }
                }
            });
        }).then(function () {
            currentProvider.preload(playlistManager.getCurrentSources(), lastPlayPosition);

            lazyQueue.flush();
            //This is no reason to exist anymore.
            lazyQueue.destroy();

            that.trigger(_constants.READY);
        }).catch(function (error) {
            var errorObject = { code: _constants.INIT_ERROR, reason: "init error.", message: "Player init error.", error: error };
            that.trigger(_constants.ERROR, errorObject);

            //xxx : If you init empty sources. (I think this is strange case.)
            //This works for this case.
            //player = OvenPlayer.create("elId", {});
            //player.load(soruces);
            lazyQueue.removeAndExcuteOnce("load");
        });
    };

    /**
     * API 초기화 함수
     * init
     * @param      {object} options player initial option value.
     * @returns
     **/
    that.init = function (options) {
        //It collects the commands and executes them at the time when they are executable.
        lazyQueue = (0, _LazyCommandExecutor2.default)(that, ['load', 'play', 'pause', 'seek', 'stop', 'getDuration', 'getPosition', 'getVolume', 'getMute', 'getBuffer', 'getState']);
        playerConfig = (0, _Configurator2.default)(options);
        if (!playerConfig.isDebug()) {
            logManager.disable();
        }
        OvenPlayerConsole.log("API : init()");
        OvenPlayerConsole.log("API : init() config : ", playerConfig);

        playlistManager.setPlaylist(playerConfig.getPlaylist());
        OvenPlayerConsole.log("API : init() sources : ", playlistManager.getCurrentSources());
        initProvider();
    };
    that.getConfig = function () {
        OvenPlayerConsole.log("API : getConfig()", playerConfig.getConfig());
        return playerConfig.getConfig();
    };

    that.getDuration = function () {
        OvenPlayerConsole.log("API : getDuration()", currentProvider.getDuration());
        return currentProvider.getDuration();
    };
    that.getPosition = function () {
        OvenPlayerConsole.log("API : getPosition()", currentProvider.getPosition());
        return currentProvider.getPosition();
    };
    that.getVolume = function () {
        OvenPlayerConsole.log("API : getVolume()", currentProvider.getVolume());
        return currentProvider.getVolume();
    };
    that.setVolume = function (volume) {
        OvenPlayerConsole.log("API : setVolume() " + volume);
        currentProvider.setVolume(volume);
    };
    that.setMute = function (state) {
        OvenPlayerConsole.log("API : setMute() " + state);
        return currentProvider.setMute(state);
    };
    that.getMute = function () {
        OvenPlayerConsole.log("API : getMute() " + currentProvider.getMute());
        return currentProvider.getMute();
    };
    that.load = function (playlist) {
        OvenPlayerConsole.log("API : load() ", playlist);
        lazyQueue = (0, _LazyCommandExecutor2.default)(that, ['play', 'seek', 'stop']);

        if (playlist) {
            currentProvider.setCurrentQuality(0);
            playlistManager.setPlaylist(playlist);
        }
        return initProvider();
    };
    that.play = function () {
        OvenPlayerConsole.log("API : play() ");
        currentProvider.play();
    };
    that.pause = function () {
        OvenPlayerConsole.log("API : pause() ");
        currentProvider.pause();
    };
    that.seek = function (position) {
        OvenPlayerConsole.log("API : seek() " + position);
        currentProvider.seek(position);
    };
    that.setPlaybackRate = function (playbackRate) {
        OvenPlayerConsole.log("API : setPlaybackRate() ", playbackRate);
        return currentProvider.setPlaybackRate(playerConfig.setDefaultPlaybackRate(playbackRate));
    };
    that.getPlaybackRate = function () {
        OvenPlayerConsole.log("API : getPlaybackRate() ", currentProvider.getPlaybackRate());
        return currentProvider.getPlaybackRate();
    };
    that.getQualityLevels = function () {
        OvenPlayerConsole.log("API : getQualityLevels() ", currentProvider.getQualityLevels());
        return currentProvider.getQualityLevels();
    };
    that.getCurrentQuality = function () {
        OvenPlayerConsole.log("API : getCurrentQuality() ", currentProvider.getCurrentQuality());
        return currentProvider.getCurrentQuality();
    };
    that.setCurrentQuality = function (qualityIndex) {
        OvenPlayerConsole.log("API : setCurrentQuality() ", qualityIndex);

        var sources = playlistManager.getCurrentSources();
        var currentSource = sources[that.getCurrentQuality()];
        var newSource = sources[qualityIndex];
        var lastPlayPosition = that.getPosition();
        var isSameProvider = providerController.isSameProvider(currentSource, newSource);
        // provider.serCurrentQuality -> playerConfig setting -> load
        var resQualityIndex = currentProvider.setCurrentQuality(qualityIndex, isSameProvider);

        if (!newSource) {
            return null;
        }

        OvenPlayerConsole.log("API : setCurrentQuality() isSameProvider", isSameProvider);

        if (!isSameProvider) {
            lazyQueue = (0, _LazyCommandExecutor2.default)(that, ['play']);
            initProvider(lastPlayPosition);
        }

        return resQualityIndex;
    };

    /* Captions : This is not supported in the current version.*/
    /*that.setCurrentCaption = (index) =>{
        return captionManager.setCurrentCaption(index);
    }
    that.getCurrentCaption = () =>{
        return captionManager.getCurrentCaption();
    }
    that.getCaptionList = () => {
        return captionManager.getCaptionList();
    }
    that.addCaption = (track) => {
        return captionManager.addCaption();
    }
    that.getCaptionList = () => {
        return captionManager.getCaptionList();
    }*/

    that.getBuffer = function () {
        OvenPlayerConsole.log("API : getBuffer() ", currentProvider.getBuffer());
        currentProvider.getBuffer();
    };
    that.getState = function () {
        OvenPlayerConsole.log("API : getState() ", currentProvider.getState());
        return currentProvider.getState();
    };
    that.stop = function () {
        OvenPlayerConsole.log("API : stop() ");
        currentProvider.stop();
    };
    that.remove = function () {
        OvenPlayerConsole.log("API : remove() ");
        lazyQueue.destroy();
        currentProvider.destroy();
        currentProvider = null;
        providerController = null;
        playlistManager = null;
        playerConfig = null;

        that.trigger(_constants.DESTROY);
        that.off();

        OvenPlayerConsole.log("API : remove() - lazyQueue, currentProvider, providerController, playlistManager, playerConfig, api event destroed. ");
        logManager.destroy();
    };

    return that;
};

exports.default = Api;

/***/ }),

/***/ "./src/js/api/Configurator.js":
/*!************************************!*\
  !*** ./src/js/api/Configurator.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   This initializes the input options.
 * @param   options
 *
 * */
var Configurator = function Configurator(options) {

    var composeSourceOptions = function composeSourceOptions(options) {
        var Defaults = {
            defaultPlaybackRate: 1,
            playbackRateControls: false,
            playbackRates: [0.25, 0.5, 1, 1.5, 2],
            mute: false,
            volume: 90,
            width: 640,
            height: 360
        };
        var serialize = function serialize(val) {
            if (val === undefined) {
                return null;
            }
            if (typeof val === 'string' && val.length < 6) {
                var lowercaseVal = val.toLowerCase();
                if (lowercaseVal === 'true') {
                    return true;
                }
                if (lowercaseVal === 'false') {
                    return false;
                }
                if (!isNaN(Number(val)) && !isNaN(parseFloat(val))) {
                    return Number(val);
                }
            }
            return val;
        };
        var deserialize = function deserialize(options) {
            Object.keys(options).forEach(function (key) {
                if (key === 'id') {
                    return;
                }
                options[key] = serialize(options[key]);
            });
        };
        var normalizeSize = function normalizeSize(val) {
            if (val.slice && val.slice(-2) === 'px') {
                val = val.slice(0, -2);
            }
            return val;
        };
        var evaluateAspectRatio = function evaluateAspectRatio(ar, width) {
            if (width.toString().indexOf('%') === -1) {
                return 0;
            }
            if (typeof ar !== 'string' || !ar) {
                return 0;
            }
            if (/^\d*\.?\d+%$/.test(ar)) {
                return ar;
            }
            var index = ar.indexOf(':');
            if (index === -1) {
                return 0;
            }
            var w = parseFloat(ar.substr(0, index));
            var h = parseFloat(ar.substr(index + 1));
            if (w <= 0 || h <= 0) {
                return 0;
            }
            return h / w * 100 + '%';
        };
        deserialize(options);
        var config = _extends({}, Defaults, options);
        config.width = normalizeSize(config.width);
        config.height = normalizeSize(config.height);
        config.aspectratio = evaluateAspectRatio(config.aspectratio, config.width);

        var rateControls = config.playbackRateControls;
        if (rateControls) {
            var rates = config.playbackRates;

            if (Array.isArray(rateControls)) {
                rates = rateControls;
            }
            rates = rates.filter(function (rate) {
                return _underscore2.default.isNumber(rate) && rate >= 0.25 && rate <= 4;
            }).map(function (rate) {
                return Math.round(rate * 4) / 4;
            });

            if (rates.indexOf(1) < 0) {
                rates.push(1);
            }
            rates.sort();

            config.playbackRateControls = true;
            config.playbackRates = rates;
        }

        if (!config.playbackRateControls || config.playbackRates.indexOf(config.defaultPlaybackRate) < 0) {
            config.defaultPlaybackRate = 1;
        }

        config.playbackRate = config.defaultPlaybackRate;

        if (!config.aspectratio) {
            delete config.aspectratio;
        }

        var configPlaylist = config.playlist;
        if (!configPlaylist) {
            var obj = _underscore2.default.pick(config, ['title', 'description', 'type', 'mediaid', 'image', 'file', 'sources', 'tracks', 'preload', 'duration', 'host', 'application', 'stream']);

            config.playlist = [obj];
        } else if (_underscore2.default.isArray(configPlaylist.playlist)) {
            config.feedData = configPlaylist;
            config.playlist = configPlaylist.playlist;
        }

        delete config.duration;
        return config;
    };
    OvenPlayerConsole.log("Configurator loaded.", options);
    var config = composeSourceOptions(options);

    var aspectratio = config.aspectratio || "16:9";
    var debug = config.debug;
    var defaultPlaybackRate = config.defaultPlaybackRate || 1;
    var image = config.image;
    var playbackRateControls = config.playbackRateControls || true;
    var playbackRates = config.playbackRates || [0.5, 1, 1.25, 1.5, 2];
    var playlist = config.playlist || [];
    var qualityLabel = config.qualityLabel || "";
    var repeat = config.repeat || false;
    var stretching = config.stretching || 'uniform';

    var that = {};
    that.getConfig = function () {
        return config;
    };

    that.getAspectratio = function () {
        return aspectratio;
    };
    that.setAspectratio = function (aspectratio_) {
        aspectratio = aspectratio_;
    };

    that.isDebug = function () {
        return debug;
    };

    that.getDefaultPlaybackRate = function () {
        return defaultPlaybackRate;
    };
    that.setDefaultPlaybackRate = function (playbackRate) {
        defaultPlaybackRate = playbackRate;return playbackRate;
    };

    that.getQualityLabel = function () {
        return qualityLabel;
    };
    that.setQualityLabel = function (newLabel) {
        qualityLabel = newLabel;
    };

    that.getPlaybackRates = function () {
        return playbackRates;
    };
    that.isPlaybackRateControls = function () {
        return playbackRateControls;
    };

    that.getPlaylist = function () {
        return playlist;
    };
    that.setPlaylist = function (playlist_) {
        if (_underscore2.default.isArray(playlist_)) {
            playlist = playlist_;
        } else {
            playlist = [playlist_];
        }
        return playlist;
    };

    that.isRepeat = function () {
        return repeat;
    };

    that.getStretching = function () {
        return stretching;
    };

    return that;
};

exports.default = Configurator;

/***/ }),

/***/ "./src/js/api/EventEmitter.js":
/*!************************************!*\
  !*** ./src/js/api/EventEmitter.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 7. 3..
 */

/**
 * @brief   This module provide custom events.
 * @param   object    An object that requires custom events.
 *
 * */

var EventEmitter = function EventEmitter(object) {
    var that = object;
    var _events = [];

    var triggerEvents = function triggerEvents(events, args, context) {
        var i = 0;
        var length = events.length;
        for (i = 0; i < length; i++) {
            var event = events[i];
            event.listener.apply(event.context || context, args);
        }
    };

    that.on = function (name, listener, context) {
        (_events[name] || (_events[name] = [])).push({ listener: listener, context: context });
        return that;
    };
    that.trigger = function (name) {
        if (!_events) {
            return false;
        }
        var args = [].slice.call(arguments, 1);
        var events = _events[name];
        var allEvents = _events.all;

        if (events) {
            triggerEvents(events, args, that);
        }
        if (allEvents) {
            triggerEvents(allEvents, arguments, that);
        }
    };
    that.off = function (name, listener, context) {
        if (!_events) {
            return false;
        }

        if (!name && !listener && !context) {
            _events = [];
            return that;
        }

        var names = name ? [name] : Object.keys(_events);
        for (var i = 0, l = names.length; i < l; i++) {
            name = names[i];
            var events = _events[name];
            if (events) {
                var retain = _events[name] = [];
                if (listener || context) {
                    for (var j = 0, k = events.length; j < k; j++) {
                        var event = events[j];
                        if (listener && listener !== event.listener && listener !== event.listener.listener && listener !== event.listener._callback || context && context !== event.context) {
                            retain.push(event);
                        }
                    }
                }
                if (!retain.length) {
                    delete _events[name];
                }
            }
        }
        return that;
    };
    that.once = function (name, listener, context) {
        var count = 0;
        var onceCallback = function onceCallback() {
            if (count++) {
                return;
            }
            that.off(name, onceCallback);
            listener.apply(that, arguments);
        };
        onceCallback._listener = listener;
        return that.on(name, onceCallback, context);
    };

    return that;
};

exports.default = EventEmitter;

/***/ }),

/***/ "./src/js/api/LazyCommandExecutor.js":
/*!*******************************************!*\
  !*** ./src/js/api/LazyCommandExecutor.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   This executes the input commands at a specific point in time.
 * @param   instance
 * @param   queuedCommands
 * */
var LazyCommandExecutor = function LazyCommandExecutor(instance, queuedCommands) {
    var commandQueue = [];
    var undecoratedMethods = {};
    var executeMode = false;
    var that = {};
    OvenPlayerConsole.log("LazyCommandExecutor loaded.");
    queuedCommands.forEach(function (command) {
        var method = instance[command];
        undecoratedMethods[command] = method || function () {};

        instance[command] = function () {
            var args = Array.prototype.slice.call(arguments, 0);
            if (!executeMode) {
                //commandQueue.push({ command, args });
                that.addQueue(command, args);
            } else {
                executeQueuedCommands();
                if (method) {
                    method.apply(that, args);
                }
            }
        };
    });
    var executeQueuedCommands = function executeQueuedCommands() {
        while (commandQueue.length > 0) {
            var _commandQueue$shift = commandQueue.shift(),
                command = _commandQueue$shift.command,
                args = _commandQueue$shift.args;

            (undecoratedMethods[command] || instance[command]).apply(instance, args);
        }
    };

    that.setExecuteMode = function (mode) {
        executeMode = mode;
        OvenPlayerConsole.log("LazyCommandExecutor : setExecuteMode()", mode);
    };
    that.getUndecoratedMethods = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : getUndecoratedMethods()", undecoratedMethods);
        return undecoratedMethods;
    };
    that.getQueue = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : getQueue()", getQueue);
        return commandQueue;
    };
    that.addQueue = function (command, args) {
        OvenPlayerConsole.log("LazyCommandExecutor : addQueue()", command, args);
        commandQueue.push({ command: command, args: args });
    };

    that.flush = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : flush()");
        executeQueuedCommands();
    };
    that.empty = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : empty()");
        commandQueue.length = 0;
    };
    that.off = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : off()");
        queuedCommands.forEach(function (command) {
            var method = undecoratedMethods[command];
            if (method) {
                instance[command] = method;
                delete undecoratedMethods[command];
            }
        });
    };

    //Run once at the end
    that.removeAndExcuteOnce = function (command_) {
        var commandQueueItem = _underscore2.default.findWhere(commandQueue, { command: command_ });
        OvenPlayerConsole.log("LazyCommandExecutor : removeAndExcuteOnce()", command_);
        commandQueue.splice(_underscore2.default.findIndex(commandQueue, { command: command_ }), 1);

        var method = undecoratedMethods[command_];
        if (method) {
            OvenPlayerConsole.log("removeCommand()");
            if (commandQueueItem) {
                (method || instance[command_]).apply(instance, commandQueueItem.args);
            }
            instance[command_] = method;
            delete undecoratedMethods[command_];
        }
    };

    that.destroy = function () {
        OvenPlayerConsole.log("LazyCommandExecutor : destroy()");
        that.off();
        that.empty();
    };
    return that;
};

exports.default = LazyCommandExecutor;

/***/ }),

/***/ "./src/js/api/SupportChecker.js":
/*!**************************************!*\
  !*** ./src/js/api/SupportChecker.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

/**
 * @brief   This finds the provider that matches the input source.
 * @param
 * */

var SupportChecker = function SupportChecker() {
    var that = {};
    OvenPlayerConsole.log("SupportChecker loaded.");
    var supportList = [{
        name: 'html5',
        checkSupport: function checkSupport(source) {
            var MimeTypes = {
                aac: 'audio/mp4',
                mp4: 'video/mp4',
                f4v: 'video/mp4',
                m4v: 'video/mp4',
                mov: 'video/mp4',
                mp3: 'audio/mpeg',
                mpeg: 'audio/mpeg',
                ogv: 'video/ogg',
                ogg: 'video/ogg',
                oga: 'video/ogg',
                vorbis: 'video/ogg',
                webm: 'video/webm',
                f4a: 'video/aac',
                m3u8: 'application/vnd.apple.mpegurl',
                m3u: 'application/vnd.apple.mpegurl',
                hls: 'application/vnd.apple.mpegurl'
            };

            var video = function () {
                return document.createElement('video');
            }();
            if (!video.canPlayType) {
                return false;
            }

            var file = source.file;
            var type = source.type;
            if (!type) {
                return false;
            }
            var mimeType = source.mimeType || MimeTypes[type];

            if ((0, _validator.isRtmp)(file, type)) {
                return false;
            }

            if ((0, _validator.isWebRTC)(file, type)) {
                return false;
            }

            if (!mimeType) {
                return false;
            }

            return !!video.canPlayType(mimeType);
        }
    }, {
        name: 'webrtc',
        checkSupport: function checkSupport(source) {
            var video = function () {
                return document.createElement('video');
            }();
            if (!video.canPlayType) {
                return false;
            }

            var file = source.file;
            var type = source.type;

            if ((0, _validator.isWebRTC)(file, type)) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        name: 'dash',
        checkSupport: function checkSupport(source) {
            var file = source.file;

            //mpd application/dash+xml
            var type = source.type;
            if ((0, _validator.isDash)(file, type)) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        name: 'hls',
        checkSupport: function checkSupport(source) {
            var video = function () {
                return document.createElement('video');
            }();

            //this method from hls.js
            var isHlsSupport = function isHlsSupport() {
                function getMediaSource() {
                    if (typeof window !== 'undefined') {
                        return window.MediaSource || window.WebKitMediaSource;
                    }
                }
                var mediaSource = getMediaSource();
                var sourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer;
                var isTypeSupported = mediaSource && typeof mediaSource.isTypeSupported === 'function' && mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

                // if SourceBuffer is exposed ensure its API is valid
                // safari and old version of Chrome doe not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible
                var sourceBufferValidAPI = !sourceBuffer || sourceBuffer.prototype && typeof sourceBuffer.prototype.appendBuffer === 'function' && typeof sourceBuffer.prototype.remove === 'function';
                return !!isTypeSupported && !!sourceBufferValidAPI;
            };
            //Remove this '!!video.canPlayType('application/vnd.apple.mpegurl')' if you want to use hlsjs.
            return isHlsSupport() && !!video.canPlayType('application/vnd.apple.mpegurl');
        }
    }];

    that.findProviderNameBySource = function (soruce_) {
        OvenPlayerConsole.log("SupportChecker : findProviderNameBySource()", soruce_);
        var source = soruce_ === Object(soruce_) ? soruce_ : {};
        for (var i = 0; i < supportList.length; i++) {
            if (supportList[i].checkSupport(source)) {
                return supportList[i].name;
            }
        }
    };
    that.findProviderNamesByPlaylist = function (playlist_) {
        OvenPlayerConsole.log("SupportChecker : findProviderNamesByPlaylist()", playlist_);
        var supportNames = [];
        for (var i = playlist_.length; i--;) {
            var item = playlist_[i];
            var source = "";
            for (var j = 0; j < item.sources.length; j++) {
                source = item.sources[j];
                if (source) {
                    var supported = that.findProviderNameBySource(source);
                    if (supported) {
                        supportNames.push(supported);
                    }
                }
            }
        }

        return supportNames;
    };
    return that;
};

exports.default = SupportChecker;

/***/ }),

/***/ "./src/js/api/constants.js":
/*!*********************************!*\
  !*** ./src/js/api/constants.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// STATE
var STATE_BUFFERING = exports.STATE_BUFFERING = 'buffering';
var STATE_IDLE = exports.STATE_IDLE = 'idle';
var STATE_COMPLETE = exports.STATE_COMPLETE = 'complete';
var STATE_PAUSED = exports.STATE_PAUSED = 'paused';
var STATE_PLAYING = exports.STATE_PLAYING = 'playing';
var STATE_ERROR = exports.STATE_ERROR = 'error';
var STATE_LOADING = exports.STATE_LOADING = 'loading';
var STATE_STALLED = exports.STATE_STALLED = 'stalled';

// PROVIDER
var PROVIDER_HTML5 = exports.PROVIDER_HTML5 = 'html5';
var PROVIDER_WEBRTC = exports.PROVIDER_WEBRTC = 'webrtc';
var PROVIDER_DASH = exports.PROVIDER_DASH = 'dash';
var PROVIDER_HLS = exports.PROVIDER_HLS = 'hls';

// EVENTS
var CONTENT_COMPLETE = exports.CONTENT_COMPLETE = STATE_COMPLETE;
var READY = exports.READY = 'ready';
var DESTROY = exports.DESTROY = 'destroy';
var CONTENT_SEEK = exports.CONTENT_SEEK = 'seek';
var CONTENT_BUFFER_FULL = exports.CONTENT_BUFFER_FULL = 'bufferFull';
var DISPLAY_CLICK = exports.DISPLAY_CLICK = 'displayClick';
var CONTENT_LOADED = exports.CONTENT_LOADED = 'loaded';
var CONTENT_SEEKED = exports.CONTENT_SEEKED = 'seeked';
var NETWORK_UNSTABLED = exports.NETWORK_UNSTABLED = 'unstableNetwork';
var ERROR = exports.ERROR = 'error';

// STATE OF PLAYER
var PLAYER_STATE = exports.PLAYER_STATE = 'stateChanged';
var PLAYER_COMPLETE = exports.PLAYER_COMPLETE = STATE_COMPLETE;
var PLAYER_PAUSE = exports.PLAYER_PAUSE = 'pause';
var PLAYER_PLAY = exports.PLAYER_PLAY = 'play';

var CONTENT_BUFFER = exports.CONTENT_BUFFER = 'bufferChanged';
var CONTENT_TIME = exports.CONTENT_TIME = 'time';
var CONTENT_RATE_CHANGE = exports.CONTENT_RATE_CHANGE = 'ratechange';
var CONTENT_VOLUME = exports.CONTENT_VOLUME = 'volumeChanged';
var CONTENT_MUTE = exports.CONTENT_MUTE = 'mute';
var CONTENT_META = exports.CONTENT_META = 'metaChanged';
var CONTENT_LEVELS = exports.CONTENT_LEVELS = 'qualityLevelChanged';
var CONTENT_LEVEL_CHANGED = exports.CONTENT_LEVEL_CHANGED = 'currentQualityLevelChanged';
var PLAYBACK_RATE_CHANGED = exports.PLAYBACK_RATE_CHANGED = 'playbackRateChanged';
var CONTENT_CAPTION_CUE_CHANGED = exports.CONTENT_CAPTION_CUE_CHANGED = 'cueChanged';
var CONTENT_CAPTION_CHANGED = exports.CONTENT_CAPTION_CHANGED = 'captionChanged';

var INIT_ERROR = exports.INIT_ERROR = 100;
var PLAYER_UNKNWON_ERROR = exports.PLAYER_UNKNWON_ERROR = 300;
var PLAYER_UNKNWON_OPERATION_ERROR = exports.PLAYER_UNKNWON_OPERATION_ERROR = 301;
var PLAYER_UNKNWON_NEWWORK_ERROR = exports.PLAYER_UNKNWON_NEWWORK_ERROR = 302;
var PLAYER_UNKNWON_DECODE_ERROR = exports.PLAYER_UNKNWON_DECODE_ERROR = 303;
var PLAYER_FILE_ERROR = exports.PLAYER_FILE_ERROR = 304;
var PLAYER_CAPTION_ERROR = exports.PLAYER_CAPTION_ERROR = 305;
var PLAYER_WEBRTC_WS_ERROR = exports.PLAYER_WEBRTC_WS_ERROR = 501;
var PLAYER_WEBRTC_WS_CLOSED = exports.PLAYER_WEBRTC_WS_CLOSED = 502;
var PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR = exports.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR = 503;
var PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR = exports.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR = 504;
var PLAYER_WEBRTC_CREATE_ANSWER_ERROR = exports.PLAYER_WEBRTC_CREATE_ANSWER_ERROR = 505;
var PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR = exports.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR = 506;
var PLAYER_WEBRTC_NETWORK_SLOW = exports.PLAYER_WEBRTC_NETWORK_SLOW = 510;

/***/ }),

/***/ "./src/js/api/media/Manager.js":
/*!*************************************!*\
  !*** ./src/js/api/media/Manager.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
 * @param   {element}   container   dom element
 *
 * */

var Manager = function Manager(container) {
    var that = {};
    var mediaElement = "";
    OvenPlayerConsole.log("MediaManager loaded.");
    var createMediaElement = function createMediaElement() {

        mediaElement = document.createElement('video');
        mediaElement.setAttribute('disableRemotePlayback', '');
        mediaElement.setAttribute('webkit-playsinline', '');
        mediaElement.setAttribute('playsinline', '');
        container.appendChild(mediaElement);

        return mediaElement;
    };

    that.createElement = function () {
        OvenPlayerConsole.log("MediaManager createElement()");
        if (!mediaElement) {
            return createMediaElement();
        } else {
            container.removeChild(mediaElement);
            return createMediaElement();
        }
    };

    return that;
};

exports.default = Manager;

/***/ }),

/***/ "./src/js/api/playlist/Manager.js":
/*!****************************************!*\
  !*** ./src/js/api/playlist/Manager.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

var _strings = __webpack_require__(/*! ../../utils/strings */ "./src/js/utils/strings.js");

var _SupportChecker = __webpack_require__(/*! ../SupportChecker */ "./src/js/api/SupportChecker.js");

var _SupportChecker2 = _interopRequireDefault(_SupportChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   This manages Playlist or Sources.
 * @param
 *
 * */
var Manager = function Manager() {
    var that = {};
    var currentPlaylist = [];
    var supportChecker = (0, _SupportChecker2.default)();

    OvenPlayerConsole.log("PlaylistManager loaded.");

    var makePrettySource = function makePrettySource(source_) {
        if (!source_ || !source_.file && !(source_.host || source_.application || source_.stream)) {
            return;
        }

        var source = _extends({}, { 'default': false }, source_);
        source.file = (0, _strings.trim)('' + source.file);

        if (source.host && source.application && source.stream) {
            source.file = source.host + "/" + source.application + "/stream/" + source.stream;
            delete source.host;
            delete source.application;
            delete source.stream;
        }

        var mimetypeRegEx = /^[^/]+\/(?:x-)?([^/]+)$/;

        if (mimetypeRegEx.test(source.type)) {
            // if type is given as a mimetype
            source.mimeType = source.type;
            source.type = source.type.replace(mimetypeRegEx, '$1');
        }

        if ((0, _validator.isRtmp)(source.file)) {
            source.type = 'rtmp';
        } else if ((0, _validator.isWebRTC)(source.file)) {
            source.type = 'webrtc';
        } else if ((0, _validator.isDash)(source.file, source.type)) {
            source.type = 'dash';
        } else if (!source.type) {
            source.type = (0, _strings.extractExtension)(source.file);
        }

        if (!source.type) {
            return;
        }

        // normalize types
        switch (source.type) {
            case 'm3u8':
            case 'vnd.apple.mpegurl':
                source.type = 'hls';
                break;
            case 'm4a':
                source.type = 'aac';
                break;
            case 'smil':
                source.type = 'rtmp';
                break;
            default:
                break;
        }
        Object.keys(source).forEach(function (key) {
            if (source[key] === '') {
                delete source[key];
            }
        });

        return source;
    };

    that.setPlaylist = function (playlist) {
        OvenPlayerConsole.log("PlaylistManager setPlaylist() ", playlist);
        var prettiedPlaylist = (_underscore2.default.isArray(playlist) ? playlist : [playlist]).map(function (item) {
            if (!_underscore2.default.isArray(item.tracks)) {
                delete item.tracks;
            }
            var playlistItem = _extends({}, {
                sources: [],
                tracks: []
            }, item);

            if (playlistItem.sources === Object(playlistItem.sources) && !_underscore2.default.isArray(playlistItem.sources)) {
                playlistItem.sources = [makePrettySource(playlistItem.sources)];
            }

            if (!_underscore2.default.isArray(playlistItem.sources) || playlistItem.sources.length === 0) {
                if (item.levels) {
                    playlistItem.sources = item.levels;
                } else {
                    playlistItem.sources = [makePrettySource(item)];
                }
            }

            for (var i = 0; i < playlistItem.sources.length; i++) {
                var source = playlistItem.sources[i];
                var prettySource = "";
                if (!source) {
                    continue;
                }

                var defaultSource = source.default;
                if (defaultSource) {
                    source.default = defaultSource.toString() === 'true';
                } else {
                    source.default = false;
                }

                // If the source doesn't have a label, number it
                if (!playlistItem.sources[i].label) {
                    playlistItem.sources[i].label = playlistItem.sources[i].type + "-" + i.toString();
                }

                prettySource = makePrettySource(playlistItem.sources[i]);
                if (supportChecker.findProviderNameBySource(prettySource)) {
                    playlistItem.sources[i] = prettySource;
                } else {
                    playlistItem.sources[i] = null;
                }
            }

            playlistItem.sources = playlistItem.sources.filter(function (source) {
                return !!source;
            });

            // default 가 없을때 webrtc가 있다면 webrtc default : true로 자동 설정
            /*let haveDefault = _.find(playlistItem.sources, function(source){return source.default == true;});
            let webrtcSource = [];
            if(!haveDefault){
                webrtcSource = _.find(playlistItem.sources, function(source){return source.type == "webrtc";});
                if(webrtcSource){
                    webrtcSource.default = true;
                }
            }*/

            if (!_underscore2.default.isArray(playlistItem.tracks)) {
                playlistItem.tracks = [];
            }
            if (_underscore2.default.isArray(playlistItem.captions)) {
                playlistItem.tracks = playlistItem.tracks.concat(playlistItem.captions);
                delete playlistItem.captions;
            }

            playlistItem.tracks = playlistItem.tracks.map(function (track) {
                if (!track || !track.file) {
                    return false;
                }
                return _extends({}, {
                    'kind': 'captions',
                    'default': false
                }, track);
            }).filter(function (track) {
                return !!track;
            });

            return playlistItem;
        });
        currentPlaylist = prettiedPlaylist;
        return prettiedPlaylist;
    };
    that.getPlaylist = function () {
        OvenPlayerConsole.log("PlaylistManager getPlaylist() ", currentPlaylist);
        return currentPlaylist;
    };
    that.getCurrentSources = function () {
        //We do not support "PLAYLIST" not yet. So this returns playlist of 0.
        OvenPlayerConsole.log("PlaylistManager getCurrentSources() ", currentPlaylist[0].sources);
        return currentPlaylist[0].sources;
    };

    return that;
};

exports.default = Manager;

/***/ }),

/***/ "./src/js/api/provider/Controller.js":
/*!*******************************************!*\
  !*** ./src/js/api/provider/Controller.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SupportChecker = __webpack_require__(/*! api/SupportChecker */ "./src/js/api/SupportChecker.js");

var _SupportChecker2 = _interopRequireDefault(_SupportChecker);

var _promise = __webpack_require__(/*! api/shims/promise */ "./src/js/api/shims/promise.js");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   This manages provider.
 * @param
 * */
var Controller = function Controller() {
    var supportChacker = (0, _SupportChecker2.default)();
    var Providers = {};

    var that = {};
    OvenPlayerConsole.log("ProviderController loaded.");

    var registeProvider = function registeProvider(name, provider) {
        if (Providers[name]) {
            return;
        }
        OvenPlayerConsole.log("ProviderController _registerProvider() ", name);
        Providers[name] = provider;
    };

    var ProviderLoader = {
        html5: function html5() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.html5 */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5"), __webpack_require__.e("ovenplayer.provider.html5")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/Html5 */ "./src/js/api/provider/html5/Html5.js").default;
                registeProvider("html5", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        webrtc: function webrtc() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.HlsProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5"), __webpack_require__.e("ovenplayer.provider.HlsProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/webrtc/WebRTC */ "./src/js/api/provider/webrtc/WebRTC.js").default;
                registeProvider("webrtc", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        dash: function dash() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.DashProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5"), __webpack_require__.e("ovenplayer.provider.DashProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/dash/Dash */ "./src/js/api/provider/dash/Dash.js").default;
                Providers["dash"] = provider;
                registeProvider("dash", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        hls: function hls() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.HlsProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5"), __webpack_require__.e("ovenplayer.provider.HlsProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/hls/Hls */ "./src/js/api/provider/hls/Hls.js").default;
                registeProvider("hls", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        }
    };
    that.loadProviders = function (playlist) {
        var supportedProviderNames = supportChacker.findProviderNamesByPlaylist(playlist);
        OvenPlayerConsole.log("ProviderController loadProviders() ", supportedProviderNames);
        return _promise2.default.all(supportedProviderNames.filter(function (providerName) {
            return !!ProviderLoader[providerName];
        }).map(function (providerName) {
            var provider = ProviderLoader[providerName]();
            return provider;
        }));
    };

    that.findByName = function (name) {
        OvenPlayerConsole.log("ProviderController findByName() ", name);
        return Providers[name];
    };

    that.getProviderBySource = function (source) {
        var supportedProviderName = supportChacker.findProviderNameBySource(source);
        OvenPlayerConsole.log("ProviderController getProviderBySource() ", supportedProviderName);
        return that.findByName(supportedProviderName);
    };

    that.isSameProvider = function (currentSource, newSource) {
        OvenPlayerConsole.log("ProviderController isSameProvider() ", supportChacker.findProviderNameBySource(currentSource), supportChacker.findProviderNameBySource(newSource));
        return supportChacker.findProviderNameBySource(currentSource) == supportChacker.findProviderNameBySource(newSource);
    };

    return that;
};

exports.default = Controller;

/***/ }),

/***/ "./src/js/api/shims/promise.js":
/*!*************************************!*\
  !*** ./src/js/api/shims/promise.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//      Promise Polyfill
//      https://github.com/taylorhakes/promise-polyfill
//      Copyright (c) 2014 Taylor Hakes
//      Copyright (c) 2014 Forbes Lindesay
//      taylorhakes/promise-polyfill is licensed under the MIT License

var promiseFinally = function promiseFinally(callback) {
    var constructor = this.constructor;
    return this.then(function (value) {
        return constructor.resolve(callback()).then(function () {
            return value;
        });
    }, function (reason) {
        return constructor.resolve(callback()).then(function () {
            return constructor.reject(reason);
        });
    });
};

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = window.setTimeout;
var setImmediateFunc = window.setImmediate;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
    return function () {
        fn.apply(thisArg, arguments);
    };
}

var PromiseShim = function PromiseShim(fn) {
    if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
};

var handle = function handle(self, deferred) {
    while (self._state === 3) {
        self = self._value;
    }
    if (self._state === 0) {
        self._deferreds.push(deferred);
        return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
            (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
            return;
        }
        var ret;
        try {
            ret = cb(self._value);
        } catch (e) {
            reject(deferred.promise, e);
            return;
        }
        resolve(deferred.promise, ret);
    });
};

var resolve = function resolve(self, newValue) {
    try {
        // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
        if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
        if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (newValue instanceof Promise) {
                self._state = 3;
                self._value = newValue;
                finale(self);
                return;
            } else if (typeof then === 'function') {
                doResolve(bind(then, newValue), self);
                return;
            }
        }
        self._state = 1;
        self._value = newValue;
        finale(self);
    } catch (e) {
        reject(self, e);
    }
};

var reject = function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
};

var finale = function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
        Promise._immediateFn(function () {
            if (!self._handled) {
                Promise._unhandledRejectionFn(self._value);
            }
        });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
        handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
};

var Handler = function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
};

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
var doResolve = function doResolve(fn, self) {
    var done = false;
    try {
        fn(function (value) {
            if (done) return;
            done = true;
            resolve(self, value);
        }, function (reason) {
            if (done) return;
            done = true;
            reject(self, reason);
        });
    } catch (ex) {
        if (done) return;
        done = true;
        reject(self, ex);
    }
};

PromiseShim.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
};

PromiseShim.prototype.then = function (onFulfilled, onRejected) {
    var prom = new this.constructor(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
};

PromiseShim.prototype['finally'] = promiseFinally;

PromiseShim.all = function (arr) {
    return new Promise(function (resolve, reject) {
        if (!arr || typeof arr.length === 'undefined') throw new TypeError('Promise.all accepts an array');
        var args = Array.prototype.slice.call(arr);
        if (args.length === 0) return resolve([]);
        var remaining = args.length;

        function res(i, val) {
            try {
                if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
                    var then = val.then;
                    if (typeof then === 'function') {
                        then.call(val, function (val) {
                            res(i, val);
                        }, reject);
                        return;
                    }
                }
                args[i] = val;
                if (--remaining === 0) {
                    resolve(args);
                }
            } catch (ex) {
                reject(ex);
            }
        }

        for (var i = 0; i < args.length; i++) {
            res(i, args[i]);
        }
    });
};

PromiseShim.resolve = function (value) {
    if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
        return value;
    }

    return new Promise(function (resolve) {
        resolve(value);
    });
};

PromiseShim.reject = function (value) {
    return new Promise(function (resolve, reject) {
        reject(value);
    });
};

PromiseShim.race = function (values) {
    return new Promise(function (resolve, reject) {
        for (var i = 0, len = values.length; i < len; i++) {
            values[i].then(resolve, reject);
        }
    });
};

// Use polyfill for setImmediate for performance gains
PromiseShim._immediateFn = typeof setImmediateFunc === 'function' && function (fn) {
    setImmediateFunc(fn);
} || function (fn) {
    setImmediateFunc(fn, 0);
};

PromiseShim._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
        console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
};

var Promise = window.Promise || (window.Promise = PromiseShim);

var resolved = exports.resolved = Promise.resolve();

exports.default = Promise;

/***/ }),

/***/ "./src/js/ovenplayer.js":
/*!******************************!*\
  !*** ./src/js/ovenplayer.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ovenplayer = __webpack_require__(/*! ./ovenplayer.sdk */ "./src/js/ovenplayer.sdk.js");

var _ovenplayer2 = _interopRequireDefault(_ovenplayer);

var _view = __webpack_require__(/*! ./view/view */ "./src/js/view/view.js");

var _view2 = _interopRequireDefault(_view);

var _webpack = __webpack_require__(/*! utils/webpack */ "./src/js/utils/webpack.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__.p = (0, _webpack.getScriptPath)('ovenplayer.js');

var OvenPlayer = {};
window.OvenPlayer = OvenPlayer;

/**
 * Copy properties from OvenPlayerSDK object to OvenPlayer object
 */
_extends(OvenPlayer, _ovenplayer2.default);

OvenPlayer.create = function (container, options) {

    var containerElement = (0, _ovenplayer.checkAndGetContainerElement)(container);

    /*const view = new View();
     view.appendPlayerMarkup(containerElement);
     const playerInstance = OvenPlayerSDK.create(view.getMediaElementContainer(), options);
      view.addComponentsAndFunctions(playerInstance, options);*/

    var player = (0, _view2.default)(containerElement);

    var playerInstance = _ovenplayer2.default.create(player.getMediaElementContainer(), options);

    _extends(playerInstance, {
        getId: function getId() {
            return containerElement.id;
        }
    });

    player.setApi(playerInstance);

    //console.log(containerElement);


    return playerInstance;
};

/***/ }),

/***/ "./src/js/ovenplayer.sdk.js":
/*!**********************************!*\
  !*** ./src/js/ovenplayer.sdk.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkAndGetContainerElement = undefined;

var _Api = __webpack_require__(/*! api/Api */ "./src/js/api/Api.js");

var _Api2 = _interopRequireDefault(_Api);

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _webpack = __webpack_require__(/*! utils/webpack */ "./src/js/utils/webpack.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__.p = (0, _webpack.getScriptPath)('ovenplayer.sdk.js');

/**
 * Main OvenPlayerSDK object
 */
var OvenPlayerSDK = window.OvenPlayerSDK = {};

var version = '0.0.1';

var playerList = OvenPlayerSDK.playerList = [];

var checkAndGetContainerElement = exports.checkAndGetContainerElement = function checkAndGetContainerElement(container) {

    if (!container) {

        // TODO(rock): Should cause an error.
        return null;
    }

    var containerElement = null;

    if (typeof container === 'string') {

        containerElement = document.getElementById(container);
    } else if (container.nodeType) {

        containerElement = container;
    } else {
        // TODO(rock): Should cause an error.
        return null;
    }

    return containerElement;
};

/**
 * Create player instance and return it.
 *
 * @param      {string | dom element} container  Id of container element or container element
 * @param      {object} options  The options
 */
OvenPlayerSDK.create = function (container, options) {

    var containerElement = checkAndGetContainerElement(container);

    var playerInstance = (0, _Api2.default)(containerElement);
    playerInstance.init(options);

    playerList.push(playerInstance);

    return playerInstance;
};

/**
 * Gets the player instance list.
 *
 * @return     {array}  The player list.
 */
OvenPlayerSDK.getPlayerList = function () {

    return playerList;
};

/**
 * Gets the player instance by container id.
 *
 * @param      {string}  containerId  The container identifier
 * @return     {obeject | null}  The player instance.
 */
OvenPlayerSDK.getPlayerByContainerId = function (containerId) {

    for (var i = 0; i < playerList.length - 1; i++) {

        if (playerList[i].containerId === containerId) {

            return playerList[i];
        }
    }

    return null;
};

/**
 * Gets the player instance by index.
 *
 * @param      {number}  index   The index
 * @return     {object | null}  The player instance.
 */
OvenPlayerSDK.getPlayerByIndex = function (index) {

    var playerInstance = playerList[index];

    if (playerInstance) {

        return playerInstance;
    } else {

        return null;
    }
};

/**
 * Generate webrtc source for player source type.
 *
 * @param      {Object | Array}  source   webrtc source
 * @return     {Array}  Player source Obejct.
 */
OvenPlayerSDK.generateWebrtcUrls = function (sources) {
    return (_underscore2.default.isArray(sources) ? sources : [sources]).map(function (source, index) {
        if (source.host && (0, _validator.isWebRTC)(source.host) && source.application && source.stream) {
            return { file: source.host + "/" + source.application + "/" + source.stream, type: "webrtc", label: source.label ? source.label : "webrtc-" + (index + 1) };
        }
    });
};

exports.default = OvenPlayerSDK;

/***/ }),

/***/ "./src/js/utils/likeA$.js":
/*!********************************!*\
  !*** ./src/js/utils/likeA$.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _ui = __webpack_require__(/*! utils/polyfills/ui */ "./src/js/utils/polyfills/ui.js");

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   It was replace jquery's selector. It Often used by OvenTemplate. (/view/engine/OvenTemplate.js)
 * @param   selectorOrElement  string or element
 *
 * */

/**
 * Created by hoho on 2018. 7. 23..
 */
var La$ = function La$(selectorOrElement) {
    var that = {};
    var returnNode = function returnNode($element, selector) {
        var nodeList = $element.querySelectorAll(selector);
        if (nodeList.length > 1) {
            return nodeList;
        } else {
            return nodeList[0];
        }
    };

    var $element = "";

    if (_underscore2.default.every(selectorOrElement, function (item) {
        return _underscore2.default.isElement(item);
    })) {
        $element = selectorOrElement;
    } else if (selectorOrElement === "document") {
        $element = document;
    } else if (selectorOrElement === "window") {
        $element = window;
    } else {
        $element = returnNode(document, selectorOrElement);
    }

    if (!$element) {
        return null;
    }

    that.find = function (selector) {
        return La$(returnNode($element, selector));
    };

    that.css = function (name, value) {
        if ($element.length > 0) {
            $element.forEach(function (element) {
                element.style[name] = value;
            });
        } else {
            $element.style[name] = value;
        }
    };

    that.addClass = function (name) {
        if ($element.classList) {
            $element.classList.add(name);
        } else {
            var classNames = $element.className.split(" ");
            if (classNames.indexOf(name) === -1) {
                $element.className += " " + name;
            }
        }
    };

    that.removeClass = function (name) {
        if ($element.classList) {
            $element.classList.remove(name);
        } else {
            $element.className = $element.className.replace(new RegExp('(^|\\b)' + name.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    that.show = function () {
        $element.style.display = 'block';
    };

    that.hide = function () {
        $element.style.display = 'none';
    };

    that.append = function (htmlCode) {
        $element.innerHTML += htmlCode;
    };

    that.text = function (text) {
        //IE8+
        if (text) {
            $element.textContent = text;
        } else {
            return $element.textContent;
        }
    };

    that.hasClass = function (name) {
        //IE8+
        if ($element.classList) {
            return $element.classList.contains(name);
        } else {
            return new RegExp('(^| )' + name + '( |$)', 'gi').test($element.name);
        }
    };

    that.is = function ($targetElement) {
        return $element === $targetElement;
    };

    that.offset = function () {
        //IE8+
        var rect = $element.getBoundingClientRect();

        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    };

    that.width = function () {
        //IE8+
        return $element.clientWidth;
    };

    that.height = function () {
        //IE8+
        return $element.clientHeight;
    };

    that.attr = function (attr) {
        return $element.getAttribute(attr);
    };

    that.remove = function () {
        //IE8+
        $element.parentNode.removeChild($element);
    };

    that.replace = function (html) {
        $element.replaceWith(html);
    };

    that.append = function (html) {
        $element.appendChild(html);
    };

    that.remove = function () {
        $element.remove();
    };

    that.get = function () {
        return $element;
    };

    that.closest = function (selectorString) {
        return $element.closest(selectorString);
    };

    return that;
};

exports.default = La$;

/***/ }),

/***/ "./src/js/utils/logger.js":
/*!********************************!*\
  !*** ./src/js/utils/logger.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 5. 24..
 */

var logger = function logger() {
    var that = {};
    var prevConsoleLog = null;

    window.OvenPlayerConsole = { log: window['console']['log'] };

    that.enable = function () {
        if (prevConsoleLog == null) {
            return;
        }
        OvenPlayerConsole['log'] = prevConsoleLog;
    };
    that.disable = function () {
        prevConsoleLog = console.log;
        OvenPlayerConsole['log'] = function () {};
    };
    that.destroy = function () {
        window.OvenPlayerConsole = null;
    };

    return that;
};

exports.default = logger;

/***/ }),

/***/ "./src/js/utils/polyfills/ui.js":
/*!**************************************!*\
  !*** ./src/js/utils/polyfills/ui.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 8. 1..
 */
var closest = function closest() {
    if (window.Element && !Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i,
                el = this;
            do {
                i = matches.length;
                while (--i >= 0 && matches.item(i) !== el) {};
            } while (i < 0 && (el = el.parentElement));
            return el;
        };
    }
};

exports.default = closest;

/***/ }),

/***/ "./src/js/utils/strings.js":
/*!*********************************!*\
  !*** ./src/js/utils/strings.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extractExtension = undefined;
exports.trim = trim;
exports.naturalHms = naturalHms;

var _underscore = __webpack_require__(/*! ./underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function trim(string) {
    return string.replace(/^\s+|\s+$/g, '');
}

/**
 * extractExtension
 *
 * @param      {string} path for url
 * @return     {string}  Extension
 */
var extractExtension = exports.extractExtension = function extractExtension(path) {
    if (!path || path.substr(0, 4) == 'rtmp') {
        return "";
    }
    function getAzureFileFormat(path) {
        var extension = "";
        if (/[(,]format=mpd-/i.test(path)) {
            extension = 'mpd';
        } else if (/[(,]format=m3u8-/i.test(path)) {
            extension = 'm3u8';
        }
        return extension;
    }

    var azuredFormat = getAzureFileFormat(path);
    if (azuredFormat) {
        return azuredFormat;
    }
    path = path.split('?')[0].split('#')[0];
    if (path.lastIndexOf('.') > -1) {
        return path.substr(path.lastIndexOf('.') + 1, path.length).toLowerCase();
    } else {
        return "";
    }
};

/**
 * naturalHms
 *
 * @param      {number | string}  second  The second
 * @return     {string}  formatted String
 */
function naturalHms(second) {
    var secNum = parseInt(second, 10);
    var hours = Math.floor(secNum / 3600);
    var minutes = Math.floor((secNum - hours * 3600) / 60);
    var seconds = secNum - hours * 3600 - minutes * 60;

    if (hours > 0) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (hours > 0) {
        return hours + ':' + minutes + ':' + seconds;
    } else {
        return minutes + ':' + seconds;
    }
}

/***/ }),

/***/ "./src/js/utils/underscore.js":
/*!************************************!*\
  !*** ./src/js/utils/underscore.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//     Underscore.js 1.9.1
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
!function () {
  var n = "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self.self === self && self || "object" == (typeof global === "undefined" ? "undefined" : _typeof(global)) && global.global === global && global || this || {},
      r = n._,
      e = Array.prototype,
      o = Object.prototype,
      s = "undefined" != typeof Symbol ? Symbol.prototype : null,
      u = e.push,
      c = e.slice,
      p = o.toString,
      i = o.hasOwnProperty,
      t = Array.isArray,
      a = Object.keys,
      l = Object.create,
      f = function f() {},
      h = function h(n) {
    return n instanceof h ? n : this instanceof h ? void (this._wrapped = n) : new h(n);
  };"undefined" == typeof exports || exports.nodeType ? n._ = h : ("undefined" != typeof module && !module.nodeType && module.exports && (exports = module.exports = h), exports._ = h), h.VERSION = "1.9.1";var v,
      y = function y(u, i, n) {
    if (void 0 === i) return u;switch (null == n ? 3 : n) {case 1:
        return function (n) {
          return u.call(i, n);
        };case 3:
        return function (n, r, t) {
          return u.call(i, n, r, t);
        };case 4:
        return function (n, r, t, e) {
          return u.call(i, n, r, t, e);
        };}return function () {
      return u.apply(i, arguments);
    };
  },
      d = function d(n, r, t) {
    return h.iteratee !== v ? h.iteratee(n, r) : null == n ? h.identity : h.isFunction(n) ? y(n, r, t) : h.isObject(n) && !h.isArray(n) ? h.matcher(n) : h.property(n);
  };h.iteratee = v = function v(n, r) {
    return d(n, r, 1 / 0);
  };var g = function g(u, i) {
    return i = null == i ? u.length - 1 : +i, function () {
      for (var n = Math.max(arguments.length - i, 0), r = Array(n), t = 0; t < n; t++) {
        r[t] = arguments[t + i];
      }switch (i) {case 0:
          return u.call(this, r);case 1:
          return u.call(this, arguments[0], r);case 2:
          return u.call(this, arguments[0], arguments[1], r);}var e = Array(i + 1);for (t = 0; t < i; t++) {
        e[t] = arguments[t];
      }return e[i] = r, u.apply(this, e);
    };
  },
      m = function m(n) {
    if (!h.isObject(n)) return {};if (l) return l(n);f.prototype = n;var r = new f();return f.prototype = null, r;
  },
      b = function b(r) {
    return function (n) {
      return null == n ? void 0 : n[r];
    };
  },
      j = function j(n, r) {
    return null != n && i.call(n, r);
  },
      x = function x(n, r) {
    for (var t = r.length, e = 0; e < t; e++) {
      if (null == n) return;n = n[r[e]];
    }return t ? n : void 0;
  },
      _ = Math.pow(2, 53) - 1,
      A = b("length"),
      w = function w(n) {
    var r = A(n);return "number" == typeof r && 0 <= r && r <= _;
  };h.each = h.forEach = function (n, r, t) {
    var e, u;if (r = y(r, t), w(n)) for (e = 0, u = n.length; e < u; e++) {
      r(n[e], e, n);
    } else {
      var i = h.keys(n);for (e = 0, u = i.length; e < u; e++) {
        r(n[i[e]], i[e], n);
      }
    }return n;
  }, h.map = h.collect = function (n, r, t) {
    r = d(r, t);for (var e = !w(n) && h.keys(n), u = (e || n).length, i = Array(u), o = 0; o < u; o++) {
      var a = e ? e[o] : o;i[o] = r(n[a], a, n);
    }return i;
  };var O = function O(c) {
    return function (n, r, t, e) {
      var u = 3 <= arguments.length;return function (n, r, t, e) {
        var u = !w(n) && h.keys(n),
            i = (u || n).length,
            o = 0 < c ? 0 : i - 1;for (e || (t = n[u ? u[o] : o], o += c); 0 <= o && o < i; o += c) {
          var a = u ? u[o] : o;t = r(t, n[a], a, n);
        }return t;
      }(n, y(r, e, 4), t, u);
    };
  };h.reduce = h.foldl = h.inject = O(1), h.reduceRight = h.foldr = O(-1), h.find = h.detect = function (n, r, t) {
    var e = (w(n) ? h.findIndex : h.findKey)(n, r, t);if (void 0 !== e && -1 !== e) return n[e];
  }, h.filter = h.select = function (n, e, r) {
    var u = [];return e = d(e, r), h.each(n, function (n, r, t) {
      e(n, r, t) && u.push(n);
    }), u;
  }, h.reject = function (n, r, t) {
    return h.filter(n, h.negate(d(r)), t);
  }, h.every = h.all = function (n, r, t) {
    r = d(r, t);for (var e = !w(n) && h.keys(n), u = (e || n).length, i = 0; i < u; i++) {
      var o = e ? e[i] : i;if (!r(n[o], o, n)) return !1;
    }return !0;
  }, h.some = h.any = function (n, r, t) {
    r = d(r, t);for (var e = !w(n) && h.keys(n), u = (e || n).length, i = 0; i < u; i++) {
      var o = e ? e[i] : i;if (r(n[o], o, n)) return !0;
    }return !1;
  }, h.contains = h.includes = h.include = function (n, r, t, e) {
    return w(n) || (n = h.values(n)), ("number" != typeof t || e) && (t = 0), 0 <= h.indexOf(n, r, t);
  }, h.invoke = g(function (n, t, e) {
    var u, i;return h.isFunction(t) ? i = t : h.isArray(t) && (u = t.slice(0, -1), t = t[t.length - 1]), h.map(n, function (n) {
      var r = i;if (!r) {
        if (u && u.length && (n = x(n, u)), null == n) return;r = n[t];
      }return null == r ? r : r.apply(n, e);
    });
  }), h.pluck = function (n, r) {
    return h.map(n, h.property(r));
  }, h.where = function (n, r) {
    return h.filter(n, h.matcher(r));
  }, h.findWhere = function (n, r) {
    return h.find(n, h.matcher(r));
  }, h.max = function (n, e, r) {
    var t,
        u,
        i = -1 / 0,
        o = -1 / 0;if (null == e || "number" == typeof e && "object" != _typeof(n[0]) && null != n) for (var a = 0, c = (n = w(n) ? n : h.values(n)).length; a < c; a++) {
      null != (t = n[a]) && i < t && (i = t);
    } else e = d(e, r), h.each(n, function (n, r, t) {
      u = e(n, r, t), (o < u || u === -1 / 0 && i === -1 / 0) && (i = n, o = u);
    });return i;
  }, h.min = function (n, e, r) {
    var t,
        u,
        i = 1 / 0,
        o = 1 / 0;if (null == e || "number" == typeof e && "object" != _typeof(n[0]) && null != n) for (var a = 0, c = (n = w(n) ? n : h.values(n)).length; a < c; a++) {
      null != (t = n[a]) && t < i && (i = t);
    } else e = d(e, r), h.each(n, function (n, r, t) {
      ((u = e(n, r, t)) < o || u === 1 / 0 && i === 1 / 0) && (i = n, o = u);
    });return i;
  }, h.shuffle = function (n) {
    return h.sample(n, 1 / 0);
  }, h.sample = function (n, r, t) {
    if (null == r || t) return w(n) || (n = h.values(n)), n[h.random(n.length - 1)];var e = w(n) ? h.clone(n) : h.values(n),
        u = A(e);r = Math.max(Math.min(r, u), 0);for (var i = u - 1, o = 0; o < r; o++) {
      var a = h.random(o, i),
          c = e[o];e[o] = e[a], e[a] = c;
    }return e.slice(0, r);
  }, h.sortBy = function (n, e, r) {
    var u = 0;return e = d(e, r), h.pluck(h.map(n, function (n, r, t) {
      return { value: n, index: u++, criteria: e(n, r, t) };
    }).sort(function (n, r) {
      var t = n.criteria,
          e = r.criteria;if (t !== e) {
        if (e < t || void 0 === t) return 1;if (t < e || void 0 === e) return -1;
      }return n.index - r.index;
    }), "value");
  };var k = function k(o, r) {
    return function (e, u, n) {
      var i = r ? [[], []] : {};return u = d(u, n), h.each(e, function (n, r) {
        var t = u(n, r, e);o(i, n, t);
      }), i;
    };
  };h.groupBy = k(function (n, r, t) {
    j(n, t) ? n[t].push(r) : n[t] = [r];
  }), h.indexBy = k(function (n, r, t) {
    n[t] = r;
  }), h.countBy = k(function (n, r, t) {
    j(n, t) ? n[t]++ : n[t] = 1;
  });var S = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;h.toArray = function (n) {
    return n ? h.isArray(n) ? c.call(n) : h.isString(n) ? n.match(S) : w(n) ? h.map(n, h.identity) : h.values(n) : [];
  }, h.size = function (n) {
    return null == n ? 0 : w(n) ? n.length : h.keys(n).length;
  }, h.partition = k(function (n, r, t) {
    n[t ? 0 : 1].push(r);
  }, !0), h.first = h.head = h.take = function (n, r, t) {
    return null == n || n.length < 1 ? null == r ? void 0 : [] : null == r || t ? n[0] : h.initial(n, n.length - r);
  }, h.initial = function (n, r, t) {
    return c.call(n, 0, Math.max(0, n.length - (null == r || t ? 1 : r)));
  }, h.last = function (n, r, t) {
    return null == n || n.length < 1 ? null == r ? void 0 : [] : null == r || t ? n[n.length - 1] : h.rest(n, Math.max(0, n.length - r));
  }, h.rest = h.tail = h.drop = function (n, r, t) {
    return c.call(n, null == r || t ? 1 : r);
  }, h.compact = function (n) {
    return h.filter(n, Boolean);
  };var M = function M(n, r, t, e) {
    for (var u = (e = e || []).length, i = 0, o = A(n); i < o; i++) {
      var a = n[i];if (w(a) && (h.isArray(a) || h.isArguments(a))) {
        if (r) for (var c = 0, l = a.length; c < l;) {
          e[u++] = a[c++];
        } else M(a, r, t, e), u = e.length;
      } else t || (e[u++] = a);
    }return e;
  };h.flatten = function (n, r) {
    return M(n, r, !1);
  }, h.without = g(function (n, r) {
    return h.difference(n, r);
  }), h.uniq = h.unique = function (n, r, t, e) {
    h.isBoolean(r) || (e = t, t = r, r = !1), null != t && (t = d(t, e));for (var u = [], i = [], o = 0, a = A(n); o < a; o++) {
      var c = n[o],
          l = t ? t(c, o, n) : c;r && !t ? (o && i === l || u.push(c), i = l) : t ? h.contains(i, l) || (i.push(l), u.push(c)) : h.contains(u, c) || u.push(c);
    }return u;
  }, h.union = g(function (n) {
    return h.uniq(M(n, !0, !0));
  }), h.intersection = function (n) {
    for (var r = [], t = arguments.length, e = 0, u = A(n); e < u; e++) {
      var i = n[e];if (!h.contains(r, i)) {
        var o;for (o = 1; o < t && h.contains(arguments[o], i); o++) {}o === t && r.push(i);
      }
    }return r;
  }, h.difference = g(function (n, r) {
    return r = M(r, !0, !0), h.filter(n, function (n) {
      return !h.contains(r, n);
    });
  }), h.unzip = function (n) {
    for (var r = n && h.max(n, A).length || 0, t = Array(r), e = 0; e < r; e++) {
      t[e] = h.pluck(n, e);
    }return t;
  }, h.zip = g(h.unzip), h.object = function (n, r) {
    for (var t = {}, e = 0, u = A(n); e < u; e++) {
      r ? t[n[e]] = r[e] : t[n[e][0]] = n[e][1];
    }return t;
  };var F = function F(i) {
    return function (n, r, t) {
      r = d(r, t);for (var e = A(n), u = 0 < i ? 0 : e - 1; 0 <= u && u < e; u += i) {
        if (r(n[u], u, n)) return u;
      }return -1;
    };
  };h.findIndex = F(1), h.findLastIndex = F(-1), h.sortedIndex = function (n, r, t, e) {
    for (var u = (t = d(t, e, 1))(r), i = 0, o = A(n); i < o;) {
      var a = Math.floor((i + o) / 2);t(n[a]) < u ? i = a + 1 : o = a;
    }return i;
  };var E = function E(i, o, a) {
    return function (n, r, t) {
      var e = 0,
          u = A(n);if ("number" == typeof t) 0 < i ? e = 0 <= t ? t : Math.max(t + u, e) : u = 0 <= t ? Math.min(t + 1, u) : t + u + 1;else if (a && t && u) return n[t = a(n, r)] === r ? t : -1;if (r != r) return 0 <= (t = o(c.call(n, e, u), h.isNaN)) ? t + e : -1;for (t = 0 < i ? e : u - 1; 0 <= t && t < u; t += i) {
        if (n[t] === r) return t;
      }return -1;
    };
  };h.indexOf = E(1, h.findIndex, h.sortedIndex), h.lastIndexOf = E(-1, h.findLastIndex), h.range = function (n, r, t) {
    null == r && (r = n || 0, n = 0), t || (t = r < n ? -1 : 1);for (var e = Math.max(Math.ceil((r - n) / t), 0), u = Array(e), i = 0; i < e; i++, n += t) {
      u[i] = n;
    }return u;
  }, h.chunk = function (n, r) {
    if (null == r || r < 1) return [];for (var t = [], e = 0, u = n.length; e < u;) {
      t.push(c.call(n, e, e += r));
    }return t;
  };var N = function N(n, r, t, e, u) {
    if (!(e instanceof r)) return n.apply(t, u);var i = m(n.prototype),
        o = n.apply(i, u);return h.isObject(o) ? o : i;
  };h.bind = g(function (r, t, e) {
    if (!h.isFunction(r)) throw new TypeError("Bind must be called on a function");var u = g(function (n) {
      return N(r, u, t, this, e.concat(n));
    });return u;
  }), h.partial = g(function (u, i) {
    var o = h.partial.placeholder,
        a = function a() {
      for (var n = 0, r = i.length, t = Array(r), e = 0; e < r; e++) {
        t[e] = i[e] === o ? arguments[n++] : i[e];
      }for (; n < arguments.length;) {
        t.push(arguments[n++]);
      }return N(u, a, this, this, t);
    };return a;
  }), (h.partial.placeholder = h).bindAll = g(function (n, r) {
    var t = (r = M(r, !1, !1)).length;if (t < 1) throw new Error("bindAll must be passed function names");for (; t--;) {
      var e = r[t];n[e] = h.bind(n[e], n);
    }
  }), h.memoize = function (e, u) {
    var i = function i(n) {
      var r = i.cache,
          t = "" + (u ? u.apply(this, arguments) : n);return j(r, t) || (r[t] = e.apply(this, arguments)), r[t];
    };return i.cache = {}, i;
  }, h.delay = g(function (n, r, t) {
    return setTimeout(function () {
      return n.apply(null, t);
    }, r);
  }), h.defer = h.partial(h.delay, h, 1), h.throttle = function (t, e, u) {
    var i,
        o,
        a,
        c,
        l = 0;u || (u = {});var f = function f() {
      l = !1 === u.leading ? 0 : h.now(), i = null, c = t.apply(o, a), i || (o = a = null);
    },
        n = function n() {
      var n = h.now();l || !1 !== u.leading || (l = n);var r = e - (n - l);return o = this, a = arguments, r <= 0 || e < r ? (i && (clearTimeout(i), i = null), l = n, c = t.apply(o, a), i || (o = a = null)) : i || !1 === u.trailing || (i = setTimeout(f, r)), c;
    };return n.cancel = function () {
      clearTimeout(i), l = 0, i = o = a = null;
    }, n;
  }, h.debounce = function (t, e, u) {
    var i,
        o,
        a = function a(n, r) {
      i = null, r && (o = t.apply(n, r));
    },
        n = g(function (n) {
      if (i && clearTimeout(i), u) {
        var r = !i;i = setTimeout(a, e), r && (o = t.apply(this, n));
      } else i = h.delay(a, e, this, n);return o;
    });return n.cancel = function () {
      clearTimeout(i), i = null;
    }, n;
  }, h.wrap = function (n, r) {
    return h.partial(r, n);
  }, h.negate = function (n) {
    return function () {
      return !n.apply(this, arguments);
    };
  }, h.compose = function () {
    var t = arguments,
        e = t.length - 1;return function () {
      for (var n = e, r = t[e].apply(this, arguments); n--;) {
        r = t[n].call(this, r);
      }return r;
    };
  }, h.after = function (n, r) {
    return function () {
      if (--n < 1) return r.apply(this, arguments);
    };
  }, h.before = function (n, r) {
    var t;return function () {
      return 0 < --n && (t = r.apply(this, arguments)), n <= 1 && (r = null), t;
    };
  }, h.once = h.partial(h.before, 2), h.restArguments = g;var I = !{ toString: null }.propertyIsEnumerable("toString"),
      T = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"],
      B = function B(n, r) {
    var t = T.length,
        e = n.constructor,
        u = h.isFunction(e) && e.prototype || o,
        i = "constructor";for (j(n, i) && !h.contains(r, i) && r.push(i); t--;) {
      (i = T[t]) in n && n[i] !== u[i] && !h.contains(r, i) && r.push(i);
    }
  };h.keys = function (n) {
    if (!h.isObject(n)) return [];if (a) return a(n);var r = [];for (var t in n) {
      j(n, t) && r.push(t);
    }return I && B(n, r), r;
  }, h.allKeys = function (n) {
    if (!h.isObject(n)) return [];var r = [];for (var t in n) {
      r.push(t);
    }return I && B(n, r), r;
  }, h.values = function (n) {
    for (var r = h.keys(n), t = r.length, e = Array(t), u = 0; u < t; u++) {
      e[u] = n[r[u]];
    }return e;
  }, h.mapObject = function (n, r, t) {
    r = d(r, t);for (var e = h.keys(n), u = e.length, i = {}, o = 0; o < u; o++) {
      var a = e[o];i[a] = r(n[a], a, n);
    }return i;
  }, h.pairs = function (n) {
    for (var r = h.keys(n), t = r.length, e = Array(t), u = 0; u < t; u++) {
      e[u] = [r[u], n[r[u]]];
    }return e;
  }, h.invert = function (n) {
    for (var r = {}, t = h.keys(n), e = 0, u = t.length; e < u; e++) {
      r[n[t[e]]] = t[e];
    }return r;
  }, h.functions = h.methods = function (n) {
    var r = [];for (var t in n) {
      h.isFunction(n[t]) && r.push(t);
    }return r.sort();
  };var R = function R(c, l) {
    return function (n) {
      var r = arguments.length;if (l && (n = Object(n)), r < 2 || null == n) return n;for (var t = 1; t < r; t++) {
        for (var e = arguments[t], u = c(e), i = u.length, o = 0; o < i; o++) {
          var a = u[o];l && void 0 !== n[a] || (n[a] = e[a]);
        }
      }return n;
    };
  };h.extend = R(h.allKeys), h.extendOwn = h.assign = R(h.keys), h.findKey = function (n, r, t) {
    r = d(r, t);for (var e, u = h.keys(n), i = 0, o = u.length; i < o; i++) {
      if (r(n[e = u[i]], e, n)) return e;
    }
  };var q,
      K,
      z = function z(n, r, t) {
    return r in t;
  };h.pick = g(function (n, r) {
    var t = {},
        e = r[0];if (null == n) return t;h.isFunction(e) ? (1 < r.length && (e = y(e, r[1])), r = h.allKeys(n)) : (e = z, r = M(r, !1, !1), n = Object(n));for (var u = 0, i = r.length; u < i; u++) {
      var o = r[u],
          a = n[o];e(a, o, n) && (t[o] = a);
    }return t;
  }), h.omit = g(function (n, t) {
    var r,
        e = t[0];return h.isFunction(e) ? (e = h.negate(e), 1 < t.length && (r = t[1])) : (t = h.map(M(t, !1, !1), String), e = function e(n, r) {
      return !h.contains(t, r);
    }), h.pick(n, e, r);
  }), h.defaults = R(h.allKeys, !0), h.create = function (n, r) {
    var t = m(n);return r && h.extendOwn(t, r), t;
  }, h.clone = function (n) {
    return h.isObject(n) ? h.isArray(n) ? n.slice() : h.extend({}, n) : n;
  }, h.tap = function (n, r) {
    return r(n), n;
  }, h.isMatch = function (n, r) {
    var t = h.keys(r),
        e = t.length;if (null == n) return !e;for (var u = Object(n), i = 0; i < e; i++) {
      var o = t[i];if (r[o] !== u[o] || !(o in u)) return !1;
    }return !0;
  }, q = function q(n, r, t, e) {
    if (n === r) return 0 !== n || 1 / n == 1 / r;if (null == n || null == r) return !1;if (n != n) return r != r;var u = typeof n === "undefined" ? "undefined" : _typeof(n);return ("function" === u || "object" === u || "object" == (typeof r === "undefined" ? "undefined" : _typeof(r))) && K(n, r, t, e);
  }, K = function K(n, r, t, e) {
    n instanceof h && (n = n._wrapped), r instanceof h && (r = r._wrapped);var u = p.call(n);if (u !== p.call(r)) return !1;switch (u) {case "[object RegExp]":case "[object String]":
        return "" + n == "" + r;case "[object Number]":
        return +n != +n ? +r != +r : 0 == +n ? 1 / +n == 1 / r : +n == +r;case "[object Date]":case "[object Boolean]":
        return +n == +r;case "[object Symbol]":
        return s.valueOf.call(n) === s.valueOf.call(r);}var i = "[object Array]" === u;if (!i) {
      if ("object" != (typeof n === "undefined" ? "undefined" : _typeof(n)) || "object" != (typeof r === "undefined" ? "undefined" : _typeof(r))) return !1;var o = n.constructor,
          a = r.constructor;if (o !== a && !(h.isFunction(o) && o instanceof o && h.isFunction(a) && a instanceof a) && "constructor" in n && "constructor" in r) return !1;
    }e = e || [];for (var c = (t = t || []).length; c--;) {
      if (t[c] === n) return e[c] === r;
    }if (t.push(n), e.push(r), i) {
      if ((c = n.length) !== r.length) return !1;for (; c--;) {
        if (!q(n[c], r[c], t, e)) return !1;
      }
    } else {
      var l,
          f = h.keys(n);if (c = f.length, h.keys(r).length !== c) return !1;for (; c--;) {
        if (l = f[c], !j(r, l) || !q(n[l], r[l], t, e)) return !1;
      }
    }return t.pop(), e.pop(), !0;
  }, h.isEqual = function (n, r) {
    return q(n, r);
  }, h.isEmpty = function (n) {
    return null == n || (w(n) && (h.isArray(n) || h.isString(n) || h.isArguments(n)) ? 0 === n.length : 0 === h.keys(n).length);
  }, h.isElement = function (n) {
    return !(!n || 1 !== n.nodeType);
  }, h.isArray = t || function (n) {
    return "[object Array]" === p.call(n);
  }, h.isObject = function (n) {
    var r = typeof n === "undefined" ? "undefined" : _typeof(n);return "function" === r || "object" === r && !!n;
  }, h.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error", "Symbol", "Map", "WeakMap", "Set", "WeakSet"], function (r) {
    h["is" + r] = function (n) {
      return p.call(n) === "[object " + r + "]";
    };
  }), h.isArguments(arguments) || (h.isArguments = function (n) {
    return j(n, "callee");
  });var D = n.document && n.document.childNodes;"function" != typeof /./ && "object" != (typeof Int8Array === "undefined" ? "undefined" : _typeof(Int8Array)) && "function" != typeof D && (h.isFunction = function (n) {
    return "function" == typeof n || !1;
  }), h.isFinite = function (n) {
    return !h.isSymbol(n) && isFinite(n) && !isNaN(parseFloat(n));
  }, h.isNaN = function (n) {
    return h.isNumber(n) && isNaN(n);
  }, h.isBoolean = function (n) {
    return !0 === n || !1 === n || "[object Boolean]" === p.call(n);
  }, h.isNull = function (n) {
    return null === n;
  }, h.isUndefined = function (n) {
    return void 0 === n;
  }, h.has = function (n, r) {
    if (!h.isArray(r)) return j(n, r);for (var t = r.length, e = 0; e < t; e++) {
      var u = r[e];if (null == n || !i.call(n, u)) return !1;n = n[u];
    }return !!t;
  }, h.noConflict = function () {
    return n._ = r, this;
  }, h.identity = function (n) {
    return n;
  }, h.constant = function (n) {
    return function () {
      return n;
    };
  }, h.noop = function () {}, h.property = function (r) {
    return h.isArray(r) ? function (n) {
      return x(n, r);
    } : b(r);
  }, h.propertyOf = function (r) {
    return null == r ? function () {} : function (n) {
      return h.isArray(n) ? x(r, n) : r[n];
    };
  }, h.matcher = h.matches = function (r) {
    return r = h.extendOwn({}, r), function (n) {
      return h.isMatch(n, r);
    };
  }, h.times = function (n, r, t) {
    var e = Array(Math.max(0, n));r = y(r, t, 1);for (var u = 0; u < n; u++) {
      e[u] = r(u);
    }return e;
  }, h.random = function (n, r) {
    return null == r && (r = n, n = 0), n + Math.floor(Math.random() * (r - n + 1));
  }, h.now = Date.now || function () {
    return new Date().getTime();
  };var L = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" },
      P = h.invert(L),
      W = function W(r) {
    var t = function t(n) {
      return r[n];
    },
        n = "(?:" + h.keys(r).join("|") + ")",
        e = RegExp(n),
        u = RegExp(n, "g");return function (n) {
      return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n;
    };
  };h.escape = W(L), h.unescape = W(P), h.result = function (n, r, t) {
    h.isArray(r) || (r = [r]);var e = r.length;if (!e) return h.isFunction(t) ? t.call(n) : t;for (var u = 0; u < e; u++) {
      var i = null == n ? void 0 : n[r[u]];void 0 === i && (i = t, u = e), n = h.isFunction(i) ? i.call(n) : i;
    }return n;
  };var C = 0;h.uniqueId = function (n) {
    var r = ++C + "";return n ? n + r : r;
  }, h.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g };var J = /(.)^/,
      U = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029" },
      V = /\\|'|\r|\n|\u2028|\u2029/g,
      $ = function $(n) {
    return "\\" + U[n];
  };h.template = function (i, n, r) {
    !n && r && (n = r), n = h.defaults({}, n, h.templateSettings);var t,
        e = RegExp([(n.escape || J).source, (n.interpolate || J).source, (n.evaluate || J).source].join("|") + "|$", "g"),
        o = 0,
        a = "__p+='";i.replace(e, function (n, r, t, e, u) {
      return a += i.slice(o, u).replace(V, $), o = u + n.length, r ? a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : t ? a += "'+\n((__t=(" + t + "))==null?'':__t)+\n'" : e && (a += "';\n" + e + "\n__p+='"), n;
    }), a += "';\n", n.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";try {
      t = new Function(n.variable || "obj", "_", a);
    } catch (n) {
      throw n.source = a, n;
    }var u = function u(n) {
      return t.call(this, n, h);
    },
        c = n.variable || "obj";return u.source = "function(" + c + "){\n" + a + "}", u;
  }, h.chain = function (n) {
    var r = h(n);return r._chain = !0, r;
  };var G = function G(n, r) {
    return n._chain ? h(r).chain() : r;
  };h.mixin = function (t) {
    return h.each(h.functions(t), function (n) {
      var r = h[n] = t[n];h.prototype[n] = function () {
        var n = [this._wrapped];return u.apply(n, arguments), G(this, r.apply(h, n));
      };
    }), h;
  }, h.mixin(h), h.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (r) {
    var t = e[r];h.prototype[r] = function () {
      var n = this._wrapped;return t.apply(n, arguments), "shift" !== r && "splice" !== r || 0 !== n.length || delete n[0], G(this, n);
    };
  }), h.each(["concat", "join", "slice"], function (n) {
    var r = e[n];h.prototype[n] = function () {
      return G(this, r.apply(this._wrapped, arguments));
    };
  }), h.prototype.value = function () {
    return this._wrapped;
  }, h.prototype.valueOf = h.prototype.toJSON = h.prototype.value, h.prototype.toString = function () {
    return String(this._wrapped);
  }, "function" == "function" && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js") && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return h;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/utils/validator.js":
/*!***********************************!*\
  !*** ./src/js/utils/validator.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isDash = exports.isWebRTC = exports.isRtmp = undefined;

var _strings = __webpack_require__(/*! utils/strings */ "./src/js/utils/strings.js");

var isRtmp = exports.isRtmp = function isRtmp(file, type) {
    return file.indexOf('rtmp:') == 0 || type == 'rtmp';
};
var isWebRTC = exports.isWebRTC = function isWebRTC(file, type) {
    if (file) {
        return file.indexOf('ws:') === 0 || file.indexOf('wss:') === 0 || type === 'webrtc';
    }
    return false;
};
var isDash = exports.isDash = function isDash(file, type) {
    return type === 'mpd' || type === 'dash' || type === 'application/dash+xml' || (0, _strings.extractExtension)(file) == 'mpd';
};

/***/ }),

/***/ "./src/js/utils/webpack.js":
/*!*********************************!*\
  !*** ./src/js/utils/webpack.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * utils for webpack
 */

var getScriptPath = exports.getScriptPath = function getScriptPath(scriptName) {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].src;
        if (src) {
            var index = src.lastIndexOf('/' + scriptName);
            if (index >= 0) {
                return src.substr(0, index + 1);
            }
        }
    }
    return '';
};

/***/ }),

/***/ "./src/js/version.js":
/*!***************************!*\
  !*** ./src/js/version.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by hoho on 2018. 6. 29..
 */
var version = exports.version = '0.6.6-localbuild';

/***/ }),

/***/ "./src/js/view/controls/fullScreenButton.js":
/*!**************************************************!*\
  !*** ./src/js/view/controls/fullScreenButton.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by hoho on 2018. 7. 26..
 */
var FullScreenButton = function FullScreenButton($container, api) {
    var $root = (0, _likeA$2.default)("#" + api.getId());
    var $iconExpand = "",
        $iconCompress = "",
        isFullScreen = false;

    var fullScreenEventTypes = {
        onfullscreenchange: "fullscreenchange",
        onmozfullscreenchange: "mozfullscreenchange",
        onwebkitfullscreenchange: "webkitfullscreenchange",
        MSFullscreenChange: "MSFullscreenChange"
    };

    var fullScreenChangedCallback = function fullScreenChangedCallback(event) {
        var checkFullScreen = function checkFullScreen() {
            return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        };

        if (checkFullScreen()) {
            $root.addClass("ovp-fullscreen");
            isFullScreen = true;
            $iconExpand.hide();
            $iconCompress.show();
        } else {
            $root.removeClass("ovp-fullscreen");
            isFullScreen = false;
            $iconExpand.show();
            $iconCompress.hide();
        }
    };

    var requestFullScreen = function requestFullScreen() {
        if ($root.get().requestFullscreen) {
            $root.get().requestFullscreen();
        } else if ($root.get().webkitRequestFullscreen) {
            $root.get().webkitRequestFullscreen();
        } else if ($root.get().mozRequestFullScreen) {
            $root.get().mozRequestFullScreen();
        } else if ($root.get().msRequestFullscreen) {
            $root.get().msRequestFullscreen();
        } else {
            // TODO(rock): warn not supported
        }
    };
    var exitFullScreen = function exitFullScreen() {

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else {
            // TODO(rock): warn not supported
        }
    };
    var toggleFullScreen = function toggleFullScreen() {
        if (!isFullScreen) {
            requestFullScreen();
        } else {
            exitFullScreen();
        }
    };

    var onRendered = function onRendered($current, template) {
        $iconExpand = $current.find('.ovp-fullscreen-button-expandicon');
        $iconCompress = $current.find('.ovp-fullscreen-button-compressicon');

        //Bind Global(document) Event
        Object.keys(fullScreenEventTypes).forEach(function (eventName) {
            //Difference between undefined and null.
            //undefined is not support. null is support but not inited.
            if (document[eventName] === null) {
                document.addEventListener(fullScreenEventTypes[eventName], fullScreenChangedCallback);
            }
        });
    };
    var onDestroyed = function onDestroyed() {
        //Unbind Global(document) Event
        Object.keys(fullScreenEventTypes).forEach(function (eventName) {
            if (document[eventName] === null) {
                document.removeEventListener(fullScreenEventTypes[eventName], fullScreenChangedCallback);
            }
        });
    };
    var events = {
        "click .ovp-fullscreen-button": function clickOvpFullscreenButton(event, $current, template) {
            event.preventDefault();
            toggleFullScreen();
        }
    };

    return (0, _OvenTemplate2.default)($container, "FullScreenButton", null, events, onRendered, onDestroyed);
};

exports.default = FullScreenButton;

/***/ }),

/***/ "./src/js/view/controls/fullScreenButtonTemplate.js":
/*!**********************************************************!*\
  !*** ./src/js/view/controls/fullScreenButtonTemplate.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return '<button class="ovp-button ovp-fullscreen-button">' + '<i class="ovp-fullscreen-button-expandicon"></i>' + '<i class="ovp-fullscreen-button-compressicon"></i>' + '</button>';
};

/***/ }),

/***/ "./src/js/view/controls/main.js":
/*!**************************************!*\
  !*** ./src/js/view/controls/main.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _playButton = __webpack_require__(/*! view/controls/playButton */ "./src/js/view/controls/playButton.js");

var _playButton2 = _interopRequireDefault(_playButton);

var _volumeButton = __webpack_require__(/*! view/controls/volumeButton */ "./src/js/view/controls/volumeButton.js");

var _volumeButton2 = _interopRequireDefault(_volumeButton);

var _progressBar = __webpack_require__(/*! view/controls/progressBar */ "./src/js/view/controls/progressBar.js");

var _progressBar2 = _interopRequireDefault(_progressBar);

var _timeDisplay = __webpack_require__(/*! view/controls/timeDisplay */ "./src/js/view/controls/timeDisplay.js");

var _timeDisplay2 = _interopRequireDefault(_timeDisplay);

var _fullScreenButton = __webpack_require__(/*! view/controls/fullScreenButton */ "./src/js/view/controls/fullScreenButton.js");

var _fullScreenButton2 = _interopRequireDefault(_fullScreenButton);

var _settingPanel = __webpack_require__(/*! view/controls/settingPanel */ "./src/js/view/controls/settingPanel.js");

var _settingPanel2 = _interopRequireDefault(_settingPanel);

var _SettingPanelList = __webpack_require__(/*! view/global/SettingPanelList */ "./src/js/view/global/SettingPanelList.js");

var _SettingPanelList2 = _interopRequireDefault(_SettingPanelList);

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by hoho on 2018. 7. 20..
 */
var Controls = function Controls($container, api) {
    var volumeButton = "",
        playButton = "",
        progressBar = "",
        timeDisplay = "",
        fullScreenButton = "";

    var generateMainPanelData = function generateMainPanelData() {
        var panel = { title: "Settings", isMain: true, body: [] };
        if (api.getDuration() !== Infinity) {
            var body = {
                title: "Speed",
                value: api.getPlaybackRate() === 1 ? "Normal" : api.getPlaybackRate(),
                type: "playbackrate"
            };
            panel.body.push(body);
        }

        if (api.getQualityLevels().length > 0) {
            var qualityLevels = api.getQualityLevels();
            var currentQuality = api.getCurrentQuality();

            var _body = {
                title: "Source",
                value: qualityLevels[currentQuality] ? qualityLevels[currentQuality].label : "Default",
                type: "qualitylevel"
            };

            panel.body.push(_body);
        }
        return panel;
    };

    var onRendered = function onRendered($current, template) {

        var initTimeDisplay = function initTimeDisplay(data) {
            if (timeDisplay) {
                timeDisplay.destroy();
            }
            timeDisplay = (0, _timeDisplay2.default)($current.find(".ovp-left-controls"), api, data);
        };
        var initProgressBar = function initProgressBar() {
            if (progressBar) {
                progressBar.destroy();
            }
            progressBar = (0, _progressBar2.default)($current.find(".ovp-progressbar-container"), api);
        };

        playButton = (0, _playButton2.default)($current.find(".ovp-left-controls"), api);
        volumeButton = (0, _volumeButton2.default)($current.find(".ovp-left-controls"), api);
        fullScreenButton = (0, _fullScreenButton2.default)($current.find(".ovp-right-controls"), api);

        api.on(_constants.CONTENT_META, function (data) {
            initTimeDisplay(data);
            if (data.duration === Infinity) {
                //live
                if (progressBar) {
                    progressBar.destroy();
                }
            } else {
                //vod
                initProgressBar();
            }
        });
        api.on(_constants.ERROR, function (error) {
            template.destroy();
        });
    };
    var onDestroyed = function onDestroyed() {
        //Do nothing.
    };
    var events = {
        "mouseleave .ovp-controls": function mouseleaveOvpControls(event, $current, template) {
            event.preventDefault();

            volumeButton.setMouseDown(false);
            $current.find(".ovp-volume-slider-container").removeClass("active");
        },
        "click .ovp-setting-button": function clickOvpSettingButton(event, $current, template) {
            event.preventDefault();

            //toggle
            if (_SettingPanelList2.default.length > 0) {
                //clear all SettingPanelTemplate
                _underscore2.default.each(_SettingPanelList2.default, function (settingPanel) {
                    settingPanel.destroy();
                });
                _SettingPanelList2.default.splice(0, _SettingPanelList2.default.length);
            } else {
                _SettingPanelList2.default.push((0, _settingPanel2.default)($current, api, generateMainPanelData()));
            }
        }
    };

    return (0, _OvenTemplate2.default)($container, "Controls", null, events, onRendered, onDestroyed);
};

exports.default = Controls;

/***/ }),

/***/ "./src/js/view/controls/mainTemplate.js":
/*!**********************************************!*\
  !*** ./src/js/view/controls/mainTemplate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
     value: true
});

var Controls = function Controls() {
     return '<div class="ovp-controls-container">' + '<div class="ovp-gradient-bottom"></div>' + '<div class="ovp-bottom-panel">' + '    <div class="ovp-progressbar-container">' + '    </div>' + '    <div class="ovp-controls">' + '        <div class="ovp-left-controls">' + '        </div>' + '        <div class="ovp-right-controls">' + '               <button class="ovp-button ovp-setting-button"><i class="ovp-setting-button-icon"></i></button>' + '        </div>' + '    </div>' + '</div>';
     '</div>';
};

exports.default = Controls;

/***/ }),

/***/ "./src/js/view/controls/playButton.js":
/*!********************************************!*\
  !*** ./src/js/view/controls/playButton.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by hoho on 2018. 7. 24..
 */
var PlayButton = function PlayButton($container, api) {
    var $iconPlay = "",
        $iconPause = "",
        $iconReplay = "";

    var setButtonState = function setButtonState(state) {
        $iconPlay.hide();
        $iconPause.hide();
        $iconReplay.hide();

        if (state === _constants.STATE_PLAYING) {
            $iconPause.show();
        } else if (state === _constants.STATE_PAUSED) {
            $iconPlay.show();
        } else if (state === _constants.STATE_COMPLETE) {
            $iconPlay.show();
        } else {
            $iconPlay.show();
        }
    };

    var onRendered = function onRendered($current, template) {
        $iconPlay = $current.find(".ovp-play-button-playicon");
        $iconPause = $current.find(".ovp-play-button-pauseicon");
        $iconReplay = $current.find(".ovp-play-button-replayicon");

        api.on(_constants.PLAYER_STATE, function (data) {
            if (data && data.newstate) {
                setButtonState(data.newstate);
            }
        });
    };
    var onDestroyed = function onDestroyed() {
        //Do nothing.
    };
    var events = {
        "click .ovp-play-button": function clickOvpPlayButton(event, $current, template) {
            event.preventDefault();
            var currentState = api.getState();
            if (currentState === _constants.STATE_IDLE) {
                api.play();
            } else if (currentState === _constants.STATE_PLAYING) {
                api.pause();
            } else if (currentState === _constants.STATE_PAUSED) {
                api.play();
            } else if (currentState === _constants.STATE_COMPLETE) {
                api.play();
            }
        }
    };

    return (0, _OvenTemplate2.default)($container, "PlayButton", null, events, onRendered, onDestroyed);
};

exports.default = PlayButton;

/***/ }),

/***/ "./src/js/view/controls/playButtonTemplate.js":
/*!****************************************************!*\
  !*** ./src/js/view/controls/playButtonTemplate.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return '<button class="ovp-button ovp-play-button" type="button">' + '<i class="ovp-play-button-playicon"></i>' + '<i class="ovp-play-button-pauseicon"></i>' + '<i class="ovp-play-button-replayicon"></i>' + '</button>';
};

/***/ }),

/***/ "./src/js/view/controls/progressBar.js":
/*!*********************************************!*\
  !*** ./src/js/view/controls/progressBar.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _SettingPanelList = __webpack_require__(/*! view/global/SettingPanelList */ "./src/js/view/global/SettingPanelList.js");

var _SettingPanelList2 = _interopRequireDefault(_SettingPanelList);

var _strings = __webpack_require__(/*! utils/strings */ "./src/js/utils/strings.js");

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProgressBar = function ProgressBar($container, api) {
    var $root = (0, _likeA$2.default)("#" + api.getId());
    var currentPlayingPosition = 0;
    var currentPlayingPercentage = 0;
    var currentLoadedPercentage = 0;

    var mouseInside = false,
        mouseDown = false;

    var $progressBar = "",
        $progressLoad = "",
        $progressPlay = "",
        $progressHover = "",
        $knobContainer = "",
        $knob = "",
        knobWidth = 0,
        $time = "";

    var positionElements = function positionElements(percentage) {
        var progressBarWidth = $progressBar.width();
        var position = progressBarWidth * percentage;

        $progressPlay.css('width', position + 'px');
        $progressHover.css('left', position + 'px');

        var knobPostion = (progressBarWidth - knobWidth) * percentage;
        $knobContainer.css('left', knobPostion + 'px');

        currentPlayingPosition = position;
        currentPlayingPercentage = percentage;
    };

    var drawHoverProgress = function drawHoverProgress(percentage) {
        var progressBarWidth = $progressBar.width();
        var hoverPosition = progressBarWidth * percentage;

        $progressHover.css('width', percentage == 0 ? percentage : hoverPosition - currentPlayingPosition + 'px');
    };

    var drawLoadProgress = function drawLoadProgress(percentage) {
        var progressBarWidth = $progressBar.width();
        var loadPosition = progressBarWidth * percentage;

        $progressLoad.css('width', loadPosition + 'px');
        currentLoadedPercentage = percentage;
    };

    var calculatePercentage = function calculatePercentage(event) {
        var progressBarWidth = $progressBar.width();
        var progressBarOffsetX = $progressBar.offset().left;
        var pointerOffsetX = event.pageX;

        var percentage = (pointerOffsetX - progressBarOffsetX) / progressBarWidth;

        if (percentage < 0) {
            return 0;
        }

        if (percentage > 1) {
            return 1;
        }

        return percentage;
    };

    var drawTimeIndicator = function drawTimeIndicator(percentage, event) {
        if (_SettingPanelList2.default.length > 0) {
            $time.hide();
            return;
        }

        var duration = api.getDuration();
        var second = duration * percentage;

        var hms = (0, _strings.naturalHms)(second);

        $time.text(hms);

        var timeElemWidth = $time.width();
        var progressBarWidth = $progressBar.width();
        var position = progressBarWidth * percentage;
        var positionOfPixel = event.pageX - $progressBar.offset().left;

        var calculateMagnetic = function calculateMagnetic() {
            if (positionOfPixel < timeElemWidth / 2) {
                return 0;
            } else if (progressBarWidth - positionOfPixel < timeElemWidth / 2) {
                return progressBarWidth - timeElemWidth;
            } else {
                return position - timeElemWidth / 2;
            }
        };

        $time.css('left', calculateMagnetic() + "px");
    };

    var seek = function seek(percentage) {
        api.seek((api.getDuration() || 0) * percentage);
    };
    var onRendered = function onRendered($current, template) {
        $progressBar = $current;
        $progressLoad = $current.find(".ovp-load-progress");
        $progressPlay = $current.find(".ovp-play-progress");
        $progressHover = $current.find(".ovp-hover-progress");
        $knobContainer = $current.find(".ovp-progressbar-knob-container");
        $knob = $current.find(".ovp-progressbar-knob");
        knobWidth = $knob.width();
        $time = $current.find(".ovp-progressbar-time");

        api.on('time', function (data) {
            if (data && data.duration && data.position) {
                positionElements(data.position / data.duration);
            }
        });

        api.on('bufferChanged', function (data) {
            if (data && data.bufferPercent) {
                drawLoadProgress(data.bufferPercent / 100);
            }
        });
    };
    var onDestroyed = function onDestroyed() {};
    var events = {
        "resize window": function resizeWindow(event, $current, template) {
            event.preventDefault();

            positionElements(currentPlayingPercentage);
            drawLoadProgress(currentLoadedPercentage);
        },
        "mouseenter .ovp-progressbar": function mouseenterOvpProgressbar(event, $current, template) {
            event.preventDefault();

            mouseInside = true;
            $root.addClass("ovp-progressbar-hover");
            $time.show();
        },
        "mouseleave .ovp-progressbar": function mouseleaveOvpProgressbar(event, $current, template) {
            event.preventDefault();

            mouseInside = false;
            if (!mouseInside) {
                $root.removeClass("ovp-progressbar-hover");
                $time.hide();
            }
            drawHoverProgress(0);
        },
        "mousedown .ovp-progressbar": function mousedownOvpProgressbar(event, $current, template) {
            event.preventDefault();
            mouseDown = true;
            var percentage = calculatePercentage(event);
            positionElements(percentage);
            drawHoverProgress(0);
            seek(percentage);
        },
        "mousemove .ovp-progressbar": function mousemoveOvpProgressbar(event, $current, template) {
            event.preventDefault();

            if (!mouseDown) {
                var percentage = calculatePercentage(event);
                drawHoverProgress(percentage);
                drawTimeIndicator(percentage, event);
            }
        },
        "mousemove document": function mousemoveDocument(event, $current, template) {
            event.preventDefault();
            if (mouseDown) {
                var percentage = calculatePercentage(event);
                positionElements(percentage);
                drawHoverProgress(0);
                seek(percentage);
                drawTimeIndicator(percentage, event);
            }
        },
        "mouseup document": function mouseupDocument(event, $current, template) {
            event.preventDefault();

            if (mouseDown) {
                mouseDown = false;
                $root.removeClass("ovp-progressbar-hover");
            }
        }
    };

    return (0, _OvenTemplate2.default)($container, "ProgressBar", null, events, onRendered, onDestroyed);
}; /**
    * Created by hoho on 2018. 7. 24..
    */
exports.default = ProgressBar;

/***/ }),

/***/ "./src/js/view/controls/progressBarTemplate.js":
/*!*****************************************************!*\
  !*** ./src/js/view/controls/progressBarTemplate.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return '<div class="ovp-progressbar" tabindex="0">' + '<div class="ovp-progressbar-padding"></div>' + '<div class="ovp-progress-list">' + '<div class="ovp-load-progress"></div>' + '<div class="ovp-play-progress ovp-play-background-color"></div>' + '<div class="ovp-hover-progress"></div>' + '</div>' + '<div class="ovp-progressbar-knob-container">' + '<div class="ovp-progressbar-knob ovp-play-background-color"></div>' + '</div>' + '<span class="ovp-progressbar-time">0:00</span>' + '</div>';
};

/***/ }),

/***/ "./src/js/view/controls/settingPanel.js":
/*!**********************************************!*\
  !*** ./src/js/view/controls/settingPanel.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _SettingPanelList = __webpack_require__(/*! view/global/SettingPanelList */ "./src/js/view/global/SettingPanelList.js");

var _SettingPanelList2 = _interopRequireDefault(_SettingPanelList);

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by hoho on 2018. 7. 26..
 */
var PLAYER_MIN_HEIGHT = 220;
var SettingPanel = function SettingPanel($container, api, data) {
    var $root = (0, _likeA$2.default)("#" + api.getId());

    var extractPanelData = function extractPanelData(panelType) {
        var panel = { title: "", body: [], type: panelType };

        if (panelType === "playbackrate") {
            panel.title = "Speed";
            var playBackRates = api.getConfig().playbackRates;
            var currentPlaybackRate = api.getPlaybackRate();
            for (var i = 0; i < playBackRates.length; i++) {
                var body = {
                    title: playBackRates[i] === 1 ? "Normal" : playBackRates[i],
                    isCheck: currentPlaybackRate === playBackRates[i],
                    value: playBackRates[i]
                };
                panel.body.push(body);
            }
        } else if (panelType === "qualitylevel") {
            panel.title = "Source";

            var qualityLevels = api.getQualityLevels();
            var currentQuality = api.getCurrentQuality();

            for (var _i = 0; _i < qualityLevels.length; _i++) {
                var _body = {
                    title: qualityLevels[_i].label,
                    isCheck: currentQuality === _i,
                    value: _i
                };
                panel.body.push(_body);
            }
        }
        return panel;
    };

    var onRendered = function onRendered($current, template) {
        if (PLAYER_MIN_HEIGHT > $root.height()) {
            $root.find(".ovp-setting-panel").css("maxHeight", "114px");
        }
    };
    var onDestroyed = function onDestroyed() {
        //Do nothing.
    };
    var events = {
        "click .ovp-setting-main-item": function clickOvpSettingMainItem(event, $current, template) {
            event.preventDefault();
            var panelType = (0, _likeA$2.default)(event.currentTarget).attr("ovp-panel-type");

            //parent must be not $current!
            _SettingPanelList2.default.push(SettingPanel($container, api, extractPanelData(panelType)));
        },
        "click .ovp-setting-title": function clickOvpSettingTitle(event, $current, template) {
            event.preventDefault();

            //Remove Current Panel
            var last = _SettingPanelList2.default.pop();
            last.destroy();
        },
        "click .ovp-setting-item-value": function clickOvpSettingItemValue(event, $current, template) {
            event.preventDefault();

            var panelType = (0, _likeA$2.default)(event.currentTarget).attr("ovp-panel-type");
            var value = (0, _likeA$2.default)(event.currentTarget).attr("ovp-data-value");

            if (panelType && value) {
                if (panelType === "playbackrate") {
                    api.setPlaybackRate(parseFloat(value));
                } else if (panelType === "qualitylevel") {
                    api.setCurrentQuality(parseInt(value));
                }

                //clear all SettingPanelTemplate
                _underscore2.default.each(_SettingPanelList2.default, function (settingPanel) {
                    settingPanel.destroy();
                });
                _SettingPanelList2.default.splice(0, _SettingPanelList2.default.length);
            }
        }
    };

    return (0, _OvenTemplate2.default)($container, "SettingPanel", data, events, onRendered, onDestroyed);
};

exports.default = SettingPanel;

/***/ }),

/***/ "./src/js/view/controls/settingPanelTemplate.js":
/*!******************************************************!*\
  !*** ./src/js/view/controls/settingPanelTemplate.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.settingValueTemplate = exports.settingItemTemplate = undefined;

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (data) {
    var elements = '<div class="ovp-setting-panel ' + (data.isMain ? 'animated fadeIn' : '') + '">' + '<div class="ovp-setting-title-container">' + '<div class="ovp-setting-title" tabindex="0">' + (data.isMain ? '' : '<span class="ovp-setting-title-previcon">&lt;</span>') + '<span class="ovp-setting-title-title">' + data.title + '</span>' + '</div>' + '</div>' + '<div class="ovp-setting-item-container">';
    _underscore2.default.forEach(data.body, function (body) {
        if (data.isMain) {
            elements += settingItemTemplate(body.title, body.value, body.type);
        } else {
            elements += settingValueTemplate(body.title, body.value, data.type, body.isCheck);
        }
    });
    elements += '</div>' + '</div>';
    return elements;
};

var settingItemTemplate = exports.settingItemTemplate = function settingItemTemplate(title, value, type) {
    return '<div class="ovp-setting-item ovp-setting-main-item" ovp-panel-type="' + type + '">' + '<span class="ovp-setting-item-title">' + title + '</span>' + '<span class="ovp-setting-item-nexticon">&gt;</span>' + '<span class="ovp-setting-item-value">' + value + '</span>' + '</div>';
};

var settingValueTemplate = exports.settingValueTemplate = function settingValueTemplate(title, value, type, isCheck) {
    return '<div class="ovp-setting-item ovp-setting-item-value" ovp-panel-type="' + type + '" ovp-data-value="' + value + '">' + '<span class="ovp-setting-item-checked ' + (isCheck ? 'ovp-show' : '') + '">&#x2713;</span>' + '<span class="ovp-setting-item-title">' + title + '</span>' + '</div>';
};

/***/ }),

/***/ "./src/js/view/controls/timeDisplay.js":
/*!*********************************************!*\
  !*** ./src/js/view/controls/timeDisplay.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _strings = __webpack_require__(/*! utils/strings */ "./src/js/utils/strings.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by hoho on 2018. 7. 25..
 */
var TimeDisplay = function TimeDisplay($container, api, data) {

    var $position = "",
        $duration = "";
    var convertHumanizeTime = function convertHumanizeTime(time) {
        return (0, _strings.naturalHms)(time);
    };

    var onRendered = function onRendered($current, template) {
        $position = $current.find('.ovp-time-current');
        $duration = $current.find('.ovp-time-duration');

        if (data.duration !== Infinity) {

            $duration.text(convertHumanizeTime(data.duration));
            api.on('time', function (data) {
                $position.text(convertHumanizeTime(data.position));
            });
        }
    };
    var onDestroyed = function onDestroyed() {
        //Do nothing.
    };
    var events = {};

    return (0, _OvenTemplate2.default)($container, "TimeDisplay", data, events, onRendered, onDestroyed);
};

exports.default = TimeDisplay;

/***/ }),

/***/ "./src/js/view/controls/timeDisplayTemplate.js":
/*!*****************************************************!*\
  !*** ./src/js/view/controls/timeDisplayTemplate.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (data) {
    return '<div class="ovp-time-display">' + (data.duration === Infinity ? '<button class="ovp-live-badge ovp-button" disabled="disabled">' + (data.type == 'webrtc' ? '<span class="ovp-live-badge-lowlatency">low latency live</span>' : '<span>live</span>') + '</button>' : '<span class="ovp-time-current">0:00</span>' + '<span class="ovp-time-separator"> / </span>' + '<span class="ovp-time-duration">0:00</span>') + '</div>';
};

/***/ }),

/***/ "./src/js/view/controls/volumeButton.js":
/*!**********************************************!*\
  !*** ./src/js/view/controls/volumeButton.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by hoho on 2018. 7. 20..
                                                                                                                                                                                                                                                                   */


var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VolumeButton = function VolumeButton($container, api) {

    var $sliderContainer = "",
        $slider = "",
        $sliderHandle = "",
        $sliderValue = "",
        $volumeIconBig = "",
        $volumeIconSmall = "",
        $volumeIconMute = "";
    var mouseDown = false;
    var sliderWidth = 70,
        handleWidth = 0,
        minRange = 0,
        maxRange = 0;

    /*private functions*/
    var setVolumeIcon = function setVolumeIcon(percentage) {
        $volumeIconBig.hide();
        $volumeIconSmall.hide();
        $volumeIconMute.hide();

        if (percentage >= 50) {
            $volumeIconBig.show();
        } else if (percentage < 50 && percentage > 0) {
            $volumeIconSmall.show();
        } else if (percentage == 0) {
            $volumeIconMute.show();
        }
    };

    var setVolumeUI = function setVolumeUI(percentage) {
        if (api.getMute()) {
            percentage = 0;
        }

        setVolumeIcon(percentage);

        var handlePosition = maxRange * percentage / 100;

        $sliderHandle.css('left', handlePosition + 'px');
        $sliderValue.css('width', handlePosition + 'px');
    };

    var calculatePercentage = function calculatePercentage(event) {
        var relativeX = event.pageX - $slider.offset().left;
        var percentage = relativeX / sliderWidth * 100;

        if (percentage < 0) {
            percentage = 0;
        }

        if (percentage > 100) {
            percentage = 100;
        }

        return percentage;
    };

    var onRendered = function onRendered($current, template) {
        $sliderContainer = $current.find(".ovp-volume-slider-container");
        $slider = $current.find(".ovp-volume-silder");
        $sliderHandle = $current.find(".ovp-volume-slider-handle");
        $sliderValue = $current.find(".ovp-volume-slider-value");

        $volumeIconBig = $current.find(".ovp-volume-button-bigicon");
        $volumeIconSmall = $current.find(".ovp-volume-button-smallicon");
        $volumeIconMute = $current.find(".ovp-volume-button-muteicon");

        handleWidth = $sliderHandle.width();
        maxRange = sliderWidth - handleWidth;

        api.on('ready', function () {
            setVolumeUI(api.getVolume());
        });
        api.on('volumeChanged', function (data) {
            setVolumeUI(data.volume);
        });
        api.on('mute', function (data) {
            if (data.mute) {
                setVolumeUI(0);
            } else {
                setVolumeUI(api.getVolume());
            }
        });
    };
    var onDestroyed = function onDestroyed() {};
    var events = {
        "click .ovp-volume-button": function clickOvpVolumeButton(event, $current, template) {
            event.preventDefault();

            if (api.getVolume() === 0) {
                api.setMute(false);
                api.setVolume(100);
            } else {
                api.setMute();
            }
        },
        "mouseenter .ovp-volume-button": function mouseenterOvpVolumeButton(event, $current, template) {
            event.preventDefault();
            $sliderContainer.addClass("active");
        },
        "mouseleave .ovp-volume-silder": function mouseleaveOvpVolumeSilder(event, $current, template) {
            event.preventDefault();

            mouseDown = false;
        },
        "mousedown .ovp-volume-silder": function mousedownOvpVolumeSilder(event, $current, template) {
            event.preventDefault();
            mouseDown = true;
            api.setMute(false);
            api.setVolume(calculatePercentage(event));
        },
        "mouseup .ovp-volume-silder": function mouseupOvpVolumeSilder(event, $current, template) {
            event.preventDefault();
            mouseDown = false;
        },
        "mousemove .ovp-volume-silder": function mousemoveOvpVolumeSilder(event, $current, template) {
            event.preventDefault();
            if (!mouseDown) {
                return false;
            }

            api.setVolume(calculatePercentage(event));
        }
    };

    return _extends((0, _OvenTemplate2.default)($container, "VolumeButton", null, events, onRendered, onDestroyed), {
        setMouseDown: function setMouseDown(state) {
            mouseDown = state;
        }
    });
};

exports.default = VolumeButton;

/***/ }),

/***/ "./src/js/view/controls/volumeButtonTemplate.js":
/*!******************************************************!*\
  !*** ./src/js/view/controls/volumeButtonTemplate.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * Created by hoho on 2018. 7. 20..
 */
exports.default = function () {
    return '<div class="ovp-volume-controller">' + '<button class="ovp-button ovp-volume-button">' + '<i class="ovp-volume-button-bigicon"></i>' + '<i class="ovp-volume-button-smallicon"></i>' + '<i class="ovp-volume-button-muteicon"></i>' + '</button>' + '<div class="ovp-volume-slider-container">' + '<div class="ovp-volume-silder">' + '<div class="ovp-volume-slider-bg"></div>' + '<div class="ovp-volume-slider-value"></div>' + '<div class="ovp-volume-slider-handle"></div>' + '</div>' + '</div>' + '</div>';
};

/***/ }),

/***/ "./src/js/view/engine/OvenTemplate.js":
/*!********************************************!*\
  !*** ./src/js/view/engine/OvenTemplate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Templates = __webpack_require__(/*! view/engine/Templates */ "./src/js/view/engine/Templates.js");

var _Templates2 = _interopRequireDefault(_Templates);

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   This is simple ui renderer. This returns onRendered callback, onDestroyed callback on Template. And this bind events for Templates.
 * @param   container  dom element or LA$ object
 * @param   templateName    templateName
 * @param   data    preload data
 * @param   events    Template's events.
 * @param   onRendered    This callback occurs after append template.
 * @param   onDestroyed    This callback occurs after destroyed template.
 * @param   isRoot
 *
 * */
var OvenTemplate = function OvenTemplate(container, templateName, data, events, onRendered, onDestroyed, isRoot) {
    var $container = _underscore2.default.isElement(container) ? (0, _likeA$2.default)(container) : container;
    var $template = void 0;
    var viewEvents = {};
    var that = {};

    var createAndSelectElement = function createAndSelectElement(html) {
        var newElement = document.createElement('div');
        newElement.innerHTML = html;

        $template = (0, _likeA$2.default)(newElement.firstChild);

        return newElement.firstChild;
    };

    if (isRoot) {
        $container.replace(createAndSelectElement(_Templates2.default[templateName + "Template"](data)));
    } else {
        $container.append(createAndSelectElement(_Templates2.default[templateName + "Template"](data)));
    }

    if (onRendered) {
        onRendered($template, that);
    }

    Object.keys(events).forEach(function (eventString) {
        var explodedText = eventString.split(" ");
        var eventName = explodedText[0].replace(/ /gi, "");
        var target = explodedText[1].replace(/ /gi, "");

        var $target = "";

        if (target === "document" || target === "window") {
            $target = (0, _likeA$2.default)(target);
        } else {
            $target = $template.find(target) || ($template.hasClass(target.replace(".", "")) ? $template : null);
        }

        if (eventName && target && $target) {
            var id = Object.keys(viewEvents).length++;

            //because It retuns another data.
            var wrappedFunc = function wrappedFunc(event) {
                return events[eventString](event, $template, that);
            };
            viewEvents[id] = { name: eventName, target: target, callback: wrappedFunc };

            //sometimes target is NodeList
            if ($target.get().forEach) {
                $target.get().forEach(function ($item) {
                    $item.addEventListener(eventName, wrappedFunc);
                });
            } else {
                $target.get().addEventListener(eventName, wrappedFunc);
            }
        } else {
            return false;
        }
    });

    that.destroy = function () {
        Object.keys(viewEvents).forEach(function (id) {
            var event = viewEvents[id];
            var $target = "";

            if (event.target === "document" || event.target === "window") {
                $target = (0, _likeA$2.default)(event.target);
            } else {
                $target = $template.find(event.target) || ($template.hasClass(event.target.replace(".", "")) ? $template : null);
            }

            //sometimes target is NodeList
            if ($target.get().forEach) {
                $target.get().forEach(function ($item) {
                    $item.removeEventListener(event.name, event.callback);
                });
            } else {
                $target.get().removeEventListener(event.name, event.callback);
            }

            delete viewEvents[id];
        });

        if ($template) {
            $template.remove();
        }

        if (onDestroyed) {
            onDestroyed();
        }
    };
    return that;
}; /**
    * Created by hoho on 2018. 7. 19..
    */

exports.default = OvenTemplate;

/***/ }),

/***/ "./src/js/view/engine/Templates.js":
/*!*****************************************!*\
  !*** ./src/js/view/engine/Templates.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mainTemplate = __webpack_require__(/*! view/example/mainTemplate */ "./src/js/view/example/mainTemplate.js");

var _mainTemplate2 = _interopRequireDefault(_mainTemplate);

var _viewTemplate = __webpack_require__(/*! view/viewTemplate */ "./src/js/view/viewTemplate.js");

var _viewTemplate2 = _interopRequireDefault(_viewTemplate);

var _mainTemplate3 = __webpack_require__(/*! view/helper/mainTemplate */ "./src/js/view/helper/mainTemplate.js");

var _mainTemplate4 = _interopRequireDefault(_mainTemplate3);

var _bigButtonTemplate = __webpack_require__(/*! view/helper/bigButtonTemplate */ "./src/js/view/helper/bigButtonTemplate.js");

var _bigButtonTemplate2 = _interopRequireDefault(_bigButtonTemplate);

var _messageBoxTemplate = __webpack_require__(/*! view/helper/messageBoxTemplate */ "./src/js/view/helper/messageBoxTemplate.js");

var _messageBoxTemplate2 = _interopRequireDefault(_messageBoxTemplate);

var _spinnerTemplate = __webpack_require__(/*! view/helper/spinnerTemplate */ "./src/js/view/helper/spinnerTemplate.js");

var _spinnerTemplate2 = _interopRequireDefault(_spinnerTemplate);

var _contextPanelTemplate = __webpack_require__(/*! view/helper/contextPanelTemplate */ "./src/js/view/helper/contextPanelTemplate.js");

var _contextPanelTemplate2 = _interopRequireDefault(_contextPanelTemplate);

var _mainTemplate5 = __webpack_require__(/*! view/controls/mainTemplate */ "./src/js/view/controls/mainTemplate.js");

var _mainTemplate6 = _interopRequireDefault(_mainTemplate5);

var _volumeButtonTemplate = __webpack_require__(/*! view/controls/volumeButtonTemplate */ "./src/js/view/controls/volumeButtonTemplate.js");

var _volumeButtonTemplate2 = _interopRequireDefault(_volumeButtonTemplate);

var _progressBarTemplate = __webpack_require__(/*! view/controls/progressBarTemplate */ "./src/js/view/controls/progressBarTemplate.js");

var _progressBarTemplate2 = _interopRequireDefault(_progressBarTemplate);

var _playButtonTemplate = __webpack_require__(/*! view/controls/playButtonTemplate */ "./src/js/view/controls/playButtonTemplate.js");

var _playButtonTemplate2 = _interopRequireDefault(_playButtonTemplate);

var _timeDisplayTemplate = __webpack_require__(/*! view/controls/timeDisplayTemplate */ "./src/js/view/controls/timeDisplayTemplate.js");

var _timeDisplayTemplate2 = _interopRequireDefault(_timeDisplayTemplate);

var _fullScreenButtonTemplate = __webpack_require__(/*! view/controls/fullScreenButtonTemplate */ "./src/js/view/controls/fullScreenButtonTemplate.js");

var _fullScreenButtonTemplate2 = _interopRequireDefault(_fullScreenButtonTemplate);

var _settingPanelTemplate = __webpack_require__(/*! view/controls/settingPanelTemplate */ "./src/js/view/controls/settingPanelTemplate.js");

var _settingPanelTemplate2 = _interopRequireDefault(_settingPanelTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by hoho on 2018. 7. 20..
 */
var Templates = {
    TextViewTemplate: _mainTemplate2.default,
    ViewTemplate: _viewTemplate2.default,
    HelperTemplate: _mainTemplate4.default,
    BigButtonTemplate: _bigButtonTemplate2.default,
    MessageBoxTemplate: _messageBoxTemplate2.default,
    SpinnerTemplate: _spinnerTemplate2.default,
    ContextPanelTemplate: _contextPanelTemplate2.default,

    ControlsTemplate: _mainTemplate6.default,
    VolumeButtonTemplate: _volumeButtonTemplate2.default,
    ProgressBarTemplate: _progressBarTemplate2.default,
    PlayButtonTemplate: _playButtonTemplate2.default,
    TimeDisplayTemplate: _timeDisplayTemplate2.default,
    FullScreenButtonTemplate: _fullScreenButtonTemplate2.default,
    SettingPanelTemplate: _settingPanelTemplate2.default
};

exports.default = Templates;

/***/ }),

/***/ "./src/js/view/example/mainTemplate.js":
/*!*********************************************!*\
  !*** ./src/js/view/example/mainTemplate.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by hoho on 2018. 7. 19..
 */

var TextViewTemplate = function TextViewTemplate(text) {
  return '<div class="textView" style="padding : 5px; background: red">' + '<h3>' + text + '</h3>' + '<button type="button" class="btn">닫기</button>' + '</div>';
};

exports.default = TextViewTemplate;

/***/ }),

/***/ "./src/js/view/global/SettingPanelList.js":
/*!************************************************!*\
  !*** ./src/js/view/global/SettingPanelList.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by hoho on 2018. 7. 26..
 */
var SettingPanelList = [];

exports.default = SettingPanelList;

/***/ }),

/***/ "./src/js/view/helper/bigButton.js":
/*!*****************************************!*\
  !*** ./src/js/view/helper/bigButton.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by hoho on 2018. 7. 24..
 */
var BigButton = function BigButton($container, api, playerState) {

    var onRendered = function onRendered($container, $current, template) {
        //Do nothing!
    };
    var onDestroyed = function onDestroyed() {
        //Do nothing!
    };
    var events = {
        /*"click .ovp-bigbutton-container" : function(event){
            event.preventDefault();
             const currentState = api.getState();
            if (currentState === STATE_IDLE || currentState === STATE_PAUSED || currentState === STATE_COMPLETE) {
                api.play();
            }
        }*/
    };

    return (0, _OvenTemplate2.default)($container, "BigButton", playerState, events, onRendered, onDestroyed);
};

exports.default = BigButton;

/***/ }),

/***/ "./src/js/view/helper/bigButtonTemplate.js":
/*!*************************************************!*\
  !*** ./src/js/view/helper/bigButtonTemplate.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

exports.default = function (playerState) {
    return '<div class="ovp-bigbutton-container ">' + ( //animated bounceIn
    playerState === _constants.STATE_PLAYING ? '<i class="ovp-bigbutton ovp-bigbutton-pause"></i>' : '') + (playerState === _constants.STATE_PAUSED ? '<i class="ovp-bigbutton ovp-bigbutton-play"></i>' : '') + (playerState === _constants.STATE_COMPLETE ? '<i class="ovp-bigbutton ovp-bigbutton-replay"></i>' : '') + '</div>';
};

/***/ }),

/***/ "./src/js/view/helper/contextPanel.js":
/*!********************************************!*\
  !*** ./src/js/view/helper/contextPanel.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by hoho on 2018. 8. 1..
 */
var ContextPanel = function ContextPanel($container, api, position) {
    var $root = (0, _likeA$2.default)("#" + api.getId());

    var onRendered = function onRendered($current, template) {
        var panelWidth = $current.width();
        var panelHeight = $current.height();

        var x = Math.min(position.pageX - $root.offset().left, $root.width() - panelWidth);
        var y = Math.min(position.pageY - $root.offset().top, $root.height() - panelHeight);

        $current.css("left", x + "px");
        $current.css("top", y + "px");
    };
    var onDestroyed = function onDestroyed() {
        //Do nothing.
    };
    var events = {
        "click .ovp-context-item": function clickOvpContextItem(event, $current, template) {
            event.preventDefault();

            window.open('https://github.com/AirenSoft/OvenPlayer', '_blank');
        }
    };

    return (0, _OvenTemplate2.default)($container, "ContextPanel", position, events, onRendered, onDestroyed);
};

exports.default = ContextPanel;

/***/ }),

/***/ "./src/js/view/helper/contextPanelTemplate.js":
/*!****************************************************!*\
  !*** ./src/js/view/helper/contextPanelTemplate.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _version = __webpack_require__(/*! version */ "./src/js/version.js");

exports.default = function () {
    return '<div class="ovp-context-panel animated fadeIn">' + '<div class="ovp-context-item" tabindex="0">' + '<span class="ovp-context-item-text">Help</span>' + '</div>' + '<div class="ovp-context-item" tabindex="1">' + '<span class="ovp-context-item-text">About OvenPlayer ' + _version.version + '</span>' + '</div>' + '</div>';
};

/***/ }),

/***/ "./src/js/view/helper/main.js":
/*!************************************!*\
  !*** ./src/js/view/helper/main.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _bigButton = __webpack_require__(/*! view/helper/bigButton */ "./src/js/view/helper/bigButton.js");

var _bigButton2 = _interopRequireDefault(_bigButton);

var _messageBox = __webpack_require__(/*! view/helper/messageBox */ "./src/js/view/helper/messageBox.js");

var _messageBox2 = _interopRequireDefault(_messageBox);

var _spinner = __webpack_require__(/*! view/helper/spinner */ "./src/js/view/helper/spinner.js");

var _spinner2 = _interopRequireDefault(_spinner);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Helper = function Helper($container, api) {
    var bigButton = "",
        messageBox = "",
        spinner = "";

    var onRendered = function onRendered($current, template) {
        var createBigButton = function createBigButton(state) {
            if (bigButton) {
                bigButton.destroy();
            }
            bigButton = (0, _bigButton2.default)($current, api, state);
        };
        var createMessage = function createMessage(message, withTimer) {
            if (messageBox) {
                messageBox.destroy();
            }
            messageBox = (0, _messageBox2.default)($current, api, message, withTimer);
        };
        spinner = (0, _spinner2.default)($current, api);

        api.on(_constants.READY, function () {
            createBigButton(_constants.STATE_PAUSED);
        });
        api.on(_constants.PLAYER_STATE, function (data) {
            if (data && data.newstate) {
                if (data.newstate === _constants.STATE_PLAYING) {
                    bigButton.destroy();
                    spinner.show(false);
                } else {
                    createBigButton(data.newstate);
                    if (data.newstate === _constants.STATE_STALLED || data.newstate === _constants.STATE_LOADING) {
                        spinner.show(true);
                    } else {
                        spinner.show(false);
                    }
                }
            }
        });
        api.on(_constants.ERROR, function (error) {
            var message = '';

            if (error.code === 100) {
                message = 'Initialization failed.';
            } else if (error.code === 301) {
                message = 'Media playback was canceled.';
            } else if (error.code === 302) {
                message = 'Some of the media could not be downloaded due to a network error.';
            } else if (error.code === 303) {
                message = 'Unable to load media. This may be due to a server or network error, or due to an unsupported format.';
            } else if (error.code === 304) {
                message = 'Media playback has been canceled. It looks like your media is corrupted or your browser does not support the features your media uses.';
            } else if (parseInt(error.code / 100) === 5) {
                message = 'Connection with low-latency server failed.';
            } else {
                message = 'Can not play due to unknown reasons.';
            }

            createMessage(message, null);
        });

        api.on(_constants.NETWORK_UNSTABLED, function (event) {
            var message = 'Because the network connection is unstable, the following media source will be played.';

            if (api.getCurrentQuality() + 1 === api.getQualityLevels().length) {
                message = 'Network connection is unstable. Check the network connection.';
            }

            createMessage(message, 5000);
        });
    };
    var onDestroyed = function onDestroyed() {
        //Do nothing.
    };
    var events = {};

    return (0, _OvenTemplate2.default)($container, "Helper", null, events, onRendered, onDestroyed);
}; /**
    * Created by hoho on 2018. 7. 24..
    */
exports.default = Helper;

/***/ }),

/***/ "./src/js/view/helper/mainTemplate.js":
/*!********************************************!*\
  !*** ./src/js/view/helper/mainTemplate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by hoho on 2018. 7. 19..
 */

var HelperTemplate = function HelperTemplate(text) {
  return '<div class="ovp-helpers-container"></div>';
};

exports.default = HelperTemplate;

/***/ }),

/***/ "./src/js/view/helper/messageBox.js":
/*!******************************************!*\
  !*** ./src/js/view/helper/messageBox.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by hoho on 2018. 7. 24..
 */
var MessageBox = function MessageBox($container, api, message, withTimer) {

    var autoDestroyTimer = "";

    var onRendered = function onRendered($current, template) {
        if (withTimer) {
            autoDestroyTimer = setTimeout(function () {
                template.destroy();
            }, withTimer || 5000);
        }
    };
    var onDestroyed = function onDestroyed() {};
    var events = {
        "click .ovp-message-text": function clickOvpMessageText(event, $current, template) {
            event.preventDefault();

            if (autoDestroyTimer) {
                clearTimeout(autoDestroyTimer);
            }
            template.destroy();
        }
    };

    return (0, _OvenTemplate2.default)($container, "MessageBox", message, events, onRendered, onDestroyed);
};

exports.default = MessageBox;

/***/ }),

/***/ "./src/js/view/helper/messageBoxTemplate.js":
/*!**************************************************!*\
  !*** ./src/js/view/helper/messageBoxTemplate.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (message) {
    return '<div class="ovp-message-box animated shake">' + '<div class="ovp-message-container">' + '<span class="ovp-message-text">' + message + '</span>' + '</div>' + '</div>';
};

/***/ }),

/***/ "./src/js/view/helper/spinner.js":
/*!***************************************!*\
  !*** ./src/js/view/helper/spinner.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by hoho on 2018. 7. 25..
                                                                                                                                                                                                                                                                   */


var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = function Spinner($container, api) {
    var $spinner = "";

    var onRendered = function onRendered($current, template) {
        $spinner = $current;
    };
    var onDestroyed = function onDestroyed() {
        //Do nothing.
    };
    var events = {};

    return _extends((0, _OvenTemplate2.default)($container, "Spinner", null, events, onRendered, onDestroyed), {
        show: function show(isShow) {
            if (isShow) {
                $spinner.show();
            } else {
                $spinner.hide();
            }
        }
    });
};

exports.default = Spinner;

/***/ }),

/***/ "./src/js/view/helper/spinnerTemplate.js":
/*!***********************************************!*\
  !*** ./src/js/view/helper/spinnerTemplate.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return '<div class="ovp-spinner-container"><div class="ovp-spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>';
};

/***/ }),

/***/ "./src/js/view/view.js":
/*!*****************************!*\
  !*** ./src/js/view/view.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by hoho on 2018. 7. 20..
                                                                                                                                                                                                                                                                   */


var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _main = __webpack_require__(/*! view/helper/main */ "./src/js/view/helper/main.js");

var _main2 = _interopRequireDefault(_main);

var _main3 = __webpack_require__(/*! view/controls/main */ "./src/js/view/controls/main.js");

var _main4 = _interopRequireDefault(_main3);

var _SettingPanelList = __webpack_require__(/*! view/global/SettingPanelList */ "./src/js/view/global/SettingPanelList.js");

var _SettingPanelList2 = _interopRequireDefault(_SettingPanelList);

var _contextPanel = __webpack_require__(/*! view/helper/contextPanel */ "./src/js/view/helper/contextPanel.js");

var _contextPanel2 = _interopRequireDefault(_contextPanel);

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(/*! ../../css/ovenplayer.less */ "./src/css/ovenplayer.less");

var View = function View($container) {
    var controls = "",
        helper = "",
        $playerRoot = void 0,
        contextPanel = "",
        api = "",
        autoHideTimer = "";

    var setHide = function setHide(hide, autoHide) {

        if (autoHideTimer) {
            clearTimeout(autoHideTimer);
            autoHideTimer = null;
        }

        if (hide) {
            if (_SettingPanelList2.default.length > 0) {
                return false;
            }
            $playerRoot.addClass("ovp-autohide");
        } else {
            $playerRoot.removeClass("ovp-autohide");

            if (autoHide) {
                autoHideTimer = setTimeout(function () {
                    if (_SettingPanelList2.default.length > 0) {
                        return false;
                    }
                    $playerRoot.addClass("ovp-autohide");
                }, 1800);
            }
        }
    };
    var togglePlayPause = function togglePlayPause() {
        var currentState = api.getState();

        if (currentState === _constants.STATE_IDLE || currentState === _constants.STATE_PAUSED || currentState === _constants.STATE_COMPLETE) {
            api.play();
        } else if (currentState === _constants.STATE_PLAYING) {
            api.pause();
        }
    };
    var seek = function seek(seconds, isRewind) {

        var duration = api.getDuration();
        var currentPosition = api.getPosition();
        var position = 0;

        if (isRewind) {
            position = Math.max(currentPosition - seconds, 0);
        } else {
            position = Math.min(currentPosition + seconds, duration);
        }

        api.seek(position);
    };
    var volume = function volume(isUp) {
        var currentVolumn = api.getVolume();
        var newVolume = 0;
        if (isUp) {
            newVolume = Math.min(currentVolumn + 5, 100);
        } else {
            newVolume = Math.max(currentVolumn - 5, 0);
        }
        api.setVolume(newVolume);
    };
    var createContextPanel = function createContextPanel(pageX, pageY) {
        if (contextPanel) {
            contextPanel.destroy();
            contextPanel = null;
        }
        contextPanel = (0, _contextPanel2.default)($playerRoot, api, { pageX: pageX, pageY: pageY });
    };

    var onRendered = function onRendered($current, template) {
        $playerRoot = $current;
    };
    var onDestroyed = function onDestroyed() {
        //Do nothing.
    };
    var events = {
        "click .ovenplayer": function clickOvenplayer(event, $current, template) {
            event.preventDefault();

            if (contextPanel) {
                contextPanel.destroy();
                contextPanel = null;
                return false;
            }
            if (!(0, _likeA$2.default)(event.target).closest(".ovp-controls") && !(0, _likeA$2.default)(event.target).closest(".ovp-setting-panel")) {
                togglePlayPause();
            }
            if (!(0, _likeA$2.default)(event.target).closest(".ovp-setting-panel") && !(0, _likeA$2.default)(event.target).closest(".ovp-setting-button") && _SettingPanelList2.default.length > 0) {
                //clear all SettingPanelTemplate
                _underscore2.default.each(_SettingPanelList2.default, function (settingPanel) {
                    settingPanel.destroy();
                });
                _SettingPanelList2.default.splice(0, _SettingPanelList2.default.length);
            }
        },
        "mouseenter .ovenplayer": function mouseenterOvenplayer(event, $current, template) {
            event.preventDefault();

            if (api.getState() === _constants.STATE_PLAYING) {
                setHide(false, true);
            } else {
                setHide(false);
            }
        },
        "mousemove .ovenplayer": function mousemoveOvenplayer(event, $current, template) {
            event.preventDefault();

            if (api.getState() === _constants.STATE_PLAYING) {
                setHide(false, true);
            } else {
                setHide(false);
            }
        },
        "mouseleave .ovenplayer": function mouseleaveOvenplayer(event, $current, template) {
            event.preventDefault();

            if (api.getState() === _constants.STATE_PLAYING) {
                setHide(true);
            }
        },

        "keydown .ovenplayer": function keydownOvenplayer(event, $current, template) {
            switch (event.keyCode) {
                case 32:
                    //sapce
                    event.preventDefault();
                    togglePlayPause();
                    break;
                case 37:
                    //arrow left
                    event.preventDefault();
                    seek(5, true);
                    break;
                case 39:
                    //arrow right
                    event.preventDefault();
                    seek(5, false);
                    break;
                case 38:
                    //arrow up
                    event.preventDefault();
                    volume(true);
                    break;
                case 40:
                    //arrow up
                    event.preventDefault();
                    volume(false);
                    break;
            }
        },
        "contextmenu .ovenplayer": function contextmenuOvenplayer(event, $current, template) {
            event.preventDefault();
            createContextPanel(event.pageX, event.pageY);
            return false;
        }
    };

    return _extends((0, _OvenTemplate2.default)($container, "View", $container.id, events, onRendered, onDestroyed, true), {
        getMediaElementContainer: function getMediaElementContainer() {
            return $playerRoot.find(".ovp-media-element-container").get();
        },
        setApi: function setApi(playerInstance) {
            api = playerInstance;
            helper = (0, _main2.default)($playerRoot.find(".ovp-ui"), playerInstance);
            controls = (0, _main4.default)($playerRoot.find(".ovp-ui"), playerInstance);

            api.on(_constants.PLAYER_STATE, function (data) {
                if (data && data.newstate) {
                    if (data.newstate === _constants.STATE_PLAYING) {
                        setHide(false, true);
                    } else {
                        setHide(false);
                    }
                }
            });
        }
    });
};

exports.default = View;

/***/ }),

/***/ "./src/js/view/viewTemplate.js":
/*!*************************************!*\
  !*** ./src/js/view/viewTemplate.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 7. 20..
 */

var ViewTemplate = function ViewTemplate(id) {
    return '<div class="ovenplayer ovp-wrapper" tabindex="-1" aria-label="" id="' + id + '">' + '<div class="ovp-ratio"></div>' + '<div class="ovp-player">' + '<div class="ovp-media-element-container">' + '</div>' + '<div class="ovp-ui">' + '</div>' + '</div>' + '</div>';
};
exports.default = ViewTemplate;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9vdmVucGxheWVyLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLWZ1bGxzY3JlZW4tY29tcHJlc3Muc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1mdWxsc2NyZWVuLWV4cGFuZC5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXBsYXktbGFyZ2Uuc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1wbGF5LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItcmUtbGFyZ2Uuc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1zZXR0aW5nLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItc3RvcC1sYXJnZS5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXN0b3Auc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci12b2x1bWUtMi5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXZvbHVtZS1tdXRlLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItdm9sdW1lLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvY3NzL292ZW5wbGF5ZXIubGVzcz83MTVmIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQ29uZmlndXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvRXZlbnRFbWl0dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvTGF6eUNvbW1hbmRFeGVjdXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL1N1cHBvcnRDaGVja2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvc2hpbXMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xpa2VBJC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvbG9nZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9wb2x5ZmlsbHMvdWkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3VuZGVyc2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9mdWxsU2NyZWVuQnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2NvbnRyb2xzL2Z1bGxTY3JlZW5CdXR0b25UZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2NvbnRyb2xzL21haW5UZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9wbGF5QnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2NvbnRyb2xzL3BsYXlCdXR0b25UZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9wcm9ncmVzc0Jhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9wcm9ncmVzc0JhclRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2NvbnRyb2xzL3NldHRpbmdQYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9zZXR0aW5nUGFuZWxUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy90aW1lRGlzcGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy90aW1lRGlzcGxheVRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2NvbnRyb2xzL3ZvbHVtZUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy92b2x1bWVCdXR0b25UZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2VuZ2luZS9UZW1wbGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvZXhhbXBsZS9tYWluVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvZ2xvYmFsL1NldHRpbmdQYW5lbExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL2JpZ0J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9oZWxwZXIvYmlnQnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL2NvbnRleHRQYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9oZWxwZXIvY29udGV4dFBhbmVsVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL21haW5UZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9oZWxwZXIvbWVzc2FnZUJveC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9oZWxwZXIvbWVzc2FnZUJveFRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9zcGlubmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9zcGlubmVyVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy92aWV3VGVtcGxhdGUuanMiXSwibmFtZXMiOlsiQXBpIiwiY29udGFpbmVyIiwibG9nTWFuYWdlciIsInRoYXQiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsInZlcnNpb24iLCJtZWRpYU1hbmFnZXIiLCJwbGF5bGlzdE1hbmFnZXIiLCJwcm92aWRlckNvbnRyb2xsZXIiLCJjdXJyZW50UHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJsYXp5UXVldWUiLCJpbml0UHJvdmlkZXIiLCJsYXN0UGxheVBvc2l0aW9uIiwicGlja1F1YWxpdHlGcm9tU291cmNlIiwic291cmNlcyIsInF1YWxpdHkiLCJpIiwibGVuZ3RoIiwiZGVmYXVsdCIsImdldFF1YWxpdHlMYWJlbCIsImxhYmVsIiwibG9hZFByb3ZpZGVycyIsImdldFBsYXlsaXN0IiwidGhlbiIsImRlc3Ryb3kiLCJ2aWRlb0VsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJQcm92aWRlcnMiLCJvbiIsIm5hbWUiLCJkYXRhIiwidHJpZ2dlciIsIkVSUk9SIiwiY29kZSIsIlBMQVlFUl9GSUxFX0VSUk9SIiwicGFyc2VJbnQiLCJORVRXT1JLX1VOU1RBQkxFRCIsImN1cnJlbnRRdWFsaXR5IiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicGF1c2UiLCJzZXRDdXJyZW50UXVhbGl0eSIsInByZWxvYWQiLCJmbHVzaCIsIlJFQURZIiwiY2F0Y2giLCJlcnJvciIsImVycm9yT2JqZWN0IiwiSU5JVF9FUlJPUiIsInJlYXNvbiIsIm1lc3NhZ2UiLCJyZW1vdmVBbmRFeGN1dGVPbmNlIiwiaW5pdCIsIm9wdGlvbnMiLCJpc0RlYnVnIiwiZGlzYWJsZSIsInNldFBsYXlsaXN0IiwiZ2V0Q29uZmlnIiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsImdldFZvbHVtZSIsInNldFZvbHVtZSIsInZvbHVtZSIsInNldE11dGUiLCJzdGF0ZSIsImdldE11dGUiLCJsb2FkIiwicGxheWxpc3QiLCJwbGF5Iiwic2VlayIsInBvc2l0aW9uIiwic2V0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlIiwic2V0RGVmYXVsdFBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsInF1YWxpdHlJbmRleCIsImN1cnJlbnRTb3VyY2UiLCJuZXdTb3VyY2UiLCJpc1NhbWVQcm92aWRlciIsInJlc1F1YWxpdHlJbmRleCIsImdldEJ1ZmZlciIsImdldFN0YXRlIiwic3RvcCIsInJlbW92ZSIsIkRFU1RST1kiLCJvZmYiLCJDb25maWd1cmF0b3IiLCJjb21wb3NlU291cmNlT3B0aW9ucyIsIkRlZmF1bHRzIiwiZGVmYXVsdFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZUNvbnRyb2xzIiwicGxheWJhY2tSYXRlcyIsIm11dGUiLCJ3aWR0aCIsImhlaWdodCIsInNlcmlhbGl6ZSIsInZhbCIsInVuZGVmaW5lZCIsImxvd2VyY2FzZVZhbCIsInRvTG93ZXJDYXNlIiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwiZGVzZXJpYWxpemUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsIm5vcm1hbGl6ZVNpemUiLCJzbGljZSIsImV2YWx1YXRlQXNwZWN0UmF0aW8iLCJhciIsInRvU3RyaW5nIiwiaW5kZXhPZiIsInRlc3QiLCJpbmRleCIsInciLCJzdWJzdHIiLCJoIiwiY29uZmlnIiwiYXNwZWN0cmF0aW8iLCJyYXRlQ29udHJvbHMiLCJyYXRlcyIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsIl8iLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJwdXNoIiwic29ydCIsImNvbmZpZ1BsYXlsaXN0Iiwib2JqIiwicGljayIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJkZWJ1ZyIsImltYWdlIiwicXVhbGl0eUxhYmVsIiwicmVwZWF0Iiwic3RyZXRjaGluZyIsImdldEFzcGVjdHJhdGlvIiwic2V0QXNwZWN0cmF0aW8iLCJhc3BlY3RyYXRpb18iLCJnZXREZWZhdWx0UGxheWJhY2tSYXRlIiwic2V0UXVhbGl0eUxhYmVsIiwibmV3TGFiZWwiLCJnZXRQbGF5YmFja1JhdGVzIiwiaXNQbGF5YmFja1JhdGVDb250cm9scyIsInBsYXlsaXN0XyIsImlzUmVwZWF0IiwiZ2V0U3RyZXRjaGluZyIsIkV2ZW50RW1pdHRlciIsIm9iamVjdCIsIl9ldmVudHMiLCJ0cmlnZ2VyRXZlbnRzIiwiZXZlbnRzIiwiYXJncyIsImNvbnRleHQiLCJldmVudCIsImxpc3RlbmVyIiwiYXBwbHkiLCJjYWxsIiwiYXJndW1lbnRzIiwiYWxsRXZlbnRzIiwiYWxsIiwibmFtZXMiLCJsIiwicmV0YWluIiwiaiIsImsiLCJfY2FsbGJhY2siLCJvbmNlIiwiY291bnQiLCJvbmNlQ2FsbGJhY2siLCJfbGlzdGVuZXIiLCJMYXp5Q29tbWFuZEV4ZWN1dG9yIiwiaW5zdGFuY2UiLCJxdWV1ZWRDb21tYW5kcyIsImNvbW1hbmRRdWV1ZSIsInVuZGVjb3JhdGVkTWV0aG9kcyIsImV4ZWN1dGVNb2RlIiwiY29tbWFuZCIsIm1ldGhvZCIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwiY29tbWFuZF8iLCJjb21tYW5kUXVldWVJdGVtIiwiZmluZFdoZXJlIiwic3BsaWNlIiwiZmluZEluZGV4IiwiU3VwcG9ydENoZWNrZXIiLCJzdXBwb3J0TGlzdCIsImNoZWNrU3VwcG9ydCIsInNvdXJjZSIsIk1pbWVUeXBlcyIsImFhYyIsIm1wNCIsImY0diIsIm00diIsIm1vdiIsIm1wMyIsIm1wZWciLCJvZ3YiLCJvZ2ciLCJvZ2EiLCJ2b3JiaXMiLCJ3ZWJtIiwiZjRhIiwibTN1OCIsIm0zdSIsImhscyIsInZpZGVvIiwiZG9jdW1lbnQiLCJjYW5QbGF5VHlwZSIsImZpbGUiLCJ0eXBlIiwibWltZVR5cGUiLCJpc0hsc1N1cHBvcnQiLCJnZXRNZWRpYVNvdXJjZSIsIndpbmRvdyIsIk1lZGlhU291cmNlIiwiV2ViS2l0TWVkaWFTb3VyY2UiLCJtZWRpYVNvdXJjZSIsInNvdXJjZUJ1ZmZlciIsIlNvdXJjZUJ1ZmZlciIsIldlYktpdFNvdXJjZUJ1ZmZlciIsImlzVHlwZVN1cHBvcnRlZCIsInNvdXJjZUJ1ZmZlclZhbGlkQVBJIiwiYXBwZW5kQnVmZmVyIiwiZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlIiwic29ydWNlXyIsImZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCIsInN1cHBvcnROYW1lcyIsIml0ZW0iLCJzdXBwb3J0ZWQiLCJTVEFURV9CVUZGRVJJTkciLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJTVEFURV9QQVVTRUQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfRVJST1IiLCJTVEFURV9MT0FESU5HIiwiU1RBVEVfU1RBTExFRCIsIlBST1ZJREVSX0hUTUw1IiwiUFJPVklERVJfV0VCUlRDIiwiUFJPVklERVJfREFTSCIsIlBST1ZJREVSX0hMUyIsIkNPTlRFTlRfQ09NUExFVEUiLCJDT05URU5UX1NFRUsiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiRElTUExBWV9DTElDSyIsIkNPTlRFTlRfTE9BREVEIiwiQ09OVEVOVF9TRUVLRUQiLCJQTEFZRVJfU1RBVEUiLCJQTEFZRVJfQ09NUExFVEUiLCJQTEFZRVJfUEFVU0UiLCJQTEFZRVJfUExBWSIsIkNPTlRFTlRfQlVGRkVSIiwiQ09OVEVOVF9USU1FIiwiQ09OVEVOVF9SQVRFX0NIQU5HRSIsIkNPTlRFTlRfVk9MVU1FIiwiQ09OVEVOVF9NVVRFIiwiQ09OVEVOVF9NRVRBIiwiQ09OVEVOVF9MRVZFTFMiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQiLCJDT05URU5UX0NBUFRJT05fQ0hBTkdFRCIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9DQVBUSU9OX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfQ0xPU0VEIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1ciLCJNYW5hZ2VyIiwibWVkaWFFbGVtZW50IiwiY3JlYXRlTWVkaWFFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVDaGlsZCIsImN1cnJlbnRQbGF5bGlzdCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwicmVwbGFjZSIsInByZXR0aWVkUGxheWxpc3QiLCJ0cmFja3MiLCJwbGF5bGlzdEl0ZW0iLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwiY2FwdGlvbnMiLCJjb25jYXQiLCJ0cmFjayIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsInByb3ZpZGVyIiwiUHJvdmlkZXJMb2FkZXIiLCJodG1sNSIsInJlcXVpcmUiLCJlcnIiLCJFcnJvciIsIndlYnJ0YyIsImRhc2giLCJzdXBwb3J0ZWRQcm92aWRlck5hbWVzIiwiUHJvbWlzZSIsInByb3ZpZGVyTmFtZSIsImZpbmRCeU5hbWUiLCJnZXRQcm92aWRlckJ5U291cmNlIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lIiwicHJvbWlzZUZpbmFsbHkiLCJjYWxsYmFjayIsImNvbnN0cnVjdG9yIiwidmFsdWUiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0VGltZW91dEZ1bmMiLCJzZXRUaW1lb3V0Iiwic2V0SW1tZWRpYXRlRnVuYyIsInNldEltbWVkaWF0ZSIsIm5vb3AiLCJiaW5kIiwiZm4iLCJ0aGlzQXJnIiwiUHJvbWlzZVNoaW0iLCJUeXBlRXJyb3IiLCJfc3RhdGUiLCJfaGFuZGxlZCIsIl92YWx1ZSIsIl9kZWZlcnJlZHMiLCJkb1Jlc29sdmUiLCJoYW5kbGUiLCJzZWxmIiwiZGVmZXJyZWQiLCJfaW1tZWRpYXRlRm4iLCJjYiIsIm9uRnVsZmlsbGVkIiwib25SZWplY3RlZCIsInByb21pc2UiLCJyZXQiLCJlIiwibmV3VmFsdWUiLCJmaW5hbGUiLCJfdW5oYW5kbGVkUmVqZWN0aW9uRm4iLCJsZW4iLCJIYW5kbGVyIiwiZG9uZSIsImV4IiwicHJvbSIsImFyciIsInJlbWFpbmluZyIsInJlcyIsInJhY2UiLCJ2YWx1ZXMiLCJjb25zb2xlIiwid2FybiIsInJlc29sdmVkIiwiX193ZWJwYWNrX3B1YmxpY19wYXRoX18iLCJPdmVuUGxheWVyIiwiT3ZlblBsYXllclNESyIsImNyZWF0ZSIsImNvbnRhaW5lckVsZW1lbnQiLCJwbGF5ZXIiLCJwbGF5ZXJJbnN0YW5jZSIsImdldE1lZGlhRWxlbWVudENvbnRhaW5lciIsImdldElkIiwiaWQiLCJzZXRBcGkiLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub2RlVHlwZSIsImdldFBsYXllckxpc3QiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJnZXRQbGF5ZXJCeUluZGV4IiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwiTGEkIiwic2VsZWN0b3JPckVsZW1lbnQiLCJyZXR1cm5Ob2RlIiwiJGVsZW1lbnQiLCJzZWxlY3RvciIsIm5vZGVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsImV2ZXJ5IiwiaXNFbGVtZW50IiwiZmluZCIsImNzcyIsImVsZW1lbnQiLCJzdHlsZSIsImFkZENsYXNzIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2xhc3NOYW1lcyIsImNsYXNzTmFtZSIsInNwbGl0IiwicmVtb3ZlQ2xhc3MiLCJSZWdFeHAiLCJqb2luIiwic2hvdyIsImRpc3BsYXkiLCJoaWRlIiwiYXBwZW5kIiwiaHRtbENvZGUiLCJpbm5lckhUTUwiLCJ0ZXh0IiwidGV4dENvbnRlbnQiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiaXMiLCIkdGFyZ2V0RWxlbWVudCIsIm9mZnNldCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJib2R5Iiwic2Nyb2xsVG9wIiwibGVmdCIsInNjcm9sbExlZnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImF0dHIiLCJnZXRBdHRyaWJ1dGUiLCJwYXJlbnROb2RlIiwiaHRtbCIsInJlcGxhY2VXaXRoIiwiZ2V0IiwiY2xvc2VzdCIsInNlbGVjdG9yU3RyaW5nIiwibG9nZ2VyIiwicHJldkNvbnNvbGVMb2ciLCJlbmFibGUiLCJFbGVtZW50IiwicyIsIm1hdGNoZXMiLCJvd25lckRvY3VtZW50IiwiZWwiLCJwYXJlbnRFbGVtZW50IiwidHJpbSIsIm5hdHVyYWxIbXMiLCJzdHJpbmciLCJleHRyYWN0RXh0ZW5zaW9uIiwicGF0aCIsImdldEF6dXJlRmlsZUZvcm1hdCIsImV4dGVuc2lvbiIsImF6dXJlZEZvcm1hdCIsImxhc3RJbmRleE9mIiwic2Vjb25kIiwic2VjTnVtIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwibiIsImdsb2JhbCIsInIiLCJvIiwiU3ltYm9sIiwidSIsImMiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJ0IiwiYSIsImYiLCJfd3JhcHBlZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJWRVJTSU9OIiwidiIsInkiLCJkIiwiaXRlcmF0ZWUiLCJpZGVudGl0eSIsImlzRnVuY3Rpb24iLCJpc09iamVjdCIsIm1hdGNoZXIiLCJwcm9wZXJ0eSIsImciLCJtYXgiLCJtIiwiYiIsIngiLCJwb3ciLCJBIiwiZWFjaCIsImNvbGxlY3QiLCJPIiwicmVkdWNlIiwiZm9sZGwiLCJpbmplY3QiLCJyZWR1Y2VSaWdodCIsImZvbGRyIiwiZGV0ZWN0IiwiZmluZEtleSIsInNlbGVjdCIsIm5lZ2F0ZSIsInNvbWUiLCJhbnkiLCJpbmNsdWRlcyIsImluY2x1ZGUiLCJpbnZva2UiLCJwbHVjayIsIndoZXJlIiwibWluIiwic2h1ZmZsZSIsInNhbXBsZSIsInJhbmRvbSIsImNsb25lIiwic29ydEJ5IiwiY3JpdGVyaWEiLCJncm91cEJ5IiwiaW5kZXhCeSIsImNvdW50QnkiLCJTIiwidG9BcnJheSIsImlzU3RyaW5nIiwibWF0Y2giLCJzaXplIiwicGFydGl0aW9uIiwiZmlyc3QiLCJoZWFkIiwidGFrZSIsImluaXRpYWwiLCJsYXN0IiwicmVzdCIsInRhaWwiLCJkcm9wIiwiY29tcGFjdCIsIkJvb2xlYW4iLCJNIiwiaXNBcmd1bWVudHMiLCJmbGF0dGVuIiwid2l0aG91dCIsImRpZmZlcmVuY2UiLCJ1bmlxIiwidW5pcXVlIiwiaXNCb29sZWFuIiwidW5pb24iLCJpbnRlcnNlY3Rpb24iLCJ1bnppcCIsInppcCIsIkYiLCJmaW5kTGFzdEluZGV4Iiwic29ydGVkSW5kZXgiLCJFIiwicmFuZ2UiLCJjZWlsIiwiY2h1bmsiLCJOIiwicGFydGlhbCIsInBsYWNlaG9sZGVyIiwiYmluZEFsbCIsIm1lbW9pemUiLCJjYWNoZSIsImRlbGF5IiwiZGVmZXIiLCJ0aHJvdHRsZSIsImxlYWRpbmciLCJub3ciLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsImNhbmNlbCIsImRlYm91bmNlIiwid3JhcCIsImNvbXBvc2UiLCJhZnRlciIsImJlZm9yZSIsInJlc3RBcmd1bWVudHMiLCJJIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJUIiwiQiIsImFsbEtleXMiLCJtYXBPYmplY3QiLCJwYWlycyIsImludmVydCIsImZ1bmN0aW9ucyIsIm1ldGhvZHMiLCJSIiwiZXh0ZW5kIiwiZXh0ZW5kT3duIiwiYXNzaWduIiwicSIsIksiLCJ6Iiwib21pdCIsIlN0cmluZyIsImRlZmF1bHRzIiwidGFwIiwiaXNNYXRjaCIsInZhbHVlT2YiLCJwb3AiLCJpc0VxdWFsIiwiaXNFbXB0eSIsIkQiLCJjaGlsZE5vZGVzIiwiSW50OEFycmF5IiwiaXNGaW5pdGUiLCJpc1N5bWJvbCIsImlzTnVsbCIsImlzVW5kZWZpbmVkIiwiaGFzIiwibm9Db25mbGljdCIsImNvbnN0YW50IiwicHJvcGVydHlPZiIsInRpbWVzIiwiRGF0ZSIsImdldFRpbWUiLCJMIiwiUCIsIlciLCJlc2NhcGUiLCJ1bmVzY2FwZSIsInJlc3VsdCIsIkMiLCJ1bmlxdWVJZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwiSiIsIlUiLCJWIiwiJCIsInRlbXBsYXRlIiwidmFyaWFibGUiLCJGdW5jdGlvbiIsImNoYWluIiwiX2NoYWluIiwiRyIsIm1peGluIiwidG9KU09OIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0Rhc2giLCJnZXRTY3JpcHRQYXRoIiwic2NyaXB0TmFtZSIsInNjcmlwdHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInNyYyIsIkZ1bGxTY3JlZW5CdXR0b24iLCIkY29udGFpbmVyIiwiYXBpIiwiJHJvb3QiLCIkaWNvbkV4cGFuZCIsIiRpY29uQ29tcHJlc3MiLCJpc0Z1bGxTY3JlZW4iLCJmdWxsU2NyZWVuRXZlbnRUeXBlcyIsIm9uZnVsbHNjcmVlbmNoYW5nZSIsIm9ubW96ZnVsbHNjcmVlbmNoYW5nZSIsIm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSIsIk1TRnVsbHNjcmVlbkNoYW5nZSIsImZ1bGxTY3JlZW5DaGFuZ2VkQ2FsbGJhY2siLCJjaGVja0Z1bGxTY3JlZW4iLCJmdWxsc2NyZWVuRWxlbWVudCIsIndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IiwibW96RnVsbFNjcmVlbkVsZW1lbnQiLCJtc0Z1bGxzY3JlZW5FbGVtZW50IiwicmVxdWVzdEZ1bGxTY3JlZW4iLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwibW96UmVxdWVzdEZ1bGxTY3JlZW4iLCJtc1JlcXVlc3RGdWxsc2NyZWVuIiwiZXhpdEZ1bGxTY3JlZW4iLCJleGl0RnVsbHNjcmVlbiIsIndlYmtpdEV4aXRGdWxsc2NyZWVuIiwibW96Q2FuY2VsRnVsbFNjcmVlbiIsIm1zRXhpdEZ1bGxzY3JlZW4iLCJ0b2dnbGVGdWxsU2NyZWVuIiwib25SZW5kZXJlZCIsIiRjdXJyZW50IiwiZXZlbnROYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uRGVzdHJveWVkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInByZXZlbnREZWZhdWx0IiwiQ29udHJvbHMiLCJ2b2x1bWVCdXR0b24iLCJwbGF5QnV0dG9uIiwicHJvZ3Jlc3NCYXIiLCJ0aW1lRGlzcGxheSIsImZ1bGxTY3JlZW5CdXR0b24iLCJnZW5lcmF0ZU1haW5QYW5lbERhdGEiLCJwYW5lbCIsInRpdGxlIiwiaXNNYWluIiwiSW5maW5pdHkiLCJxdWFsaXR5TGV2ZWxzIiwiaW5pdFRpbWVEaXNwbGF5IiwiaW5pdFByb2dyZXNzQmFyIiwic2V0TW91c2VEb3duIiwiU2V0dGluZ1BhbmVsTGlzdCIsInNldHRpbmdQYW5lbCIsIlBsYXlCdXR0b24iLCIkaWNvblBsYXkiLCIkaWNvblBhdXNlIiwiJGljb25SZXBsYXkiLCJzZXRCdXR0b25TdGF0ZSIsIm5ld3N0YXRlIiwiY3VycmVudFN0YXRlIiwiUHJvZ3Jlc3NCYXIiLCJjdXJyZW50UGxheWluZ1Bvc2l0aW9uIiwiY3VycmVudFBsYXlpbmdQZXJjZW50YWdlIiwiY3VycmVudExvYWRlZFBlcmNlbnRhZ2UiLCJtb3VzZUluc2lkZSIsIm1vdXNlRG93biIsIiRwcm9ncmVzc0JhciIsIiRwcm9ncmVzc0xvYWQiLCIkcHJvZ3Jlc3NQbGF5IiwiJHByb2dyZXNzSG92ZXIiLCIka25vYkNvbnRhaW5lciIsIiRrbm9iIiwia25vYldpZHRoIiwiJHRpbWUiLCJwb3NpdGlvbkVsZW1lbnRzIiwicGVyY2VudGFnZSIsInByb2dyZXNzQmFyV2lkdGgiLCJrbm9iUG9zdGlvbiIsImRyYXdIb3ZlclByb2dyZXNzIiwiaG92ZXJQb3NpdGlvbiIsImRyYXdMb2FkUHJvZ3Jlc3MiLCJsb2FkUG9zaXRpb24iLCJjYWxjdWxhdGVQZXJjZW50YWdlIiwicHJvZ3Jlc3NCYXJPZmZzZXRYIiwicG9pbnRlck9mZnNldFgiLCJwYWdlWCIsImRyYXdUaW1lSW5kaWNhdG9yIiwiaG1zIiwidGltZUVsZW1XaWR0aCIsInBvc2l0aW9uT2ZQaXhlbCIsImNhbGN1bGF0ZU1hZ25ldGljIiwiYnVmZmVyUGVyY2VudCIsIlBMQVlFUl9NSU5fSEVJR0hUIiwiU2V0dGluZ1BhbmVsIiwiZXh0cmFjdFBhbmVsRGF0YSIsInBhbmVsVHlwZSIsInBsYXlCYWNrUmF0ZXMiLCJjdXJyZW50UGxheWJhY2tSYXRlIiwiaXNDaGVjayIsImN1cnJlbnRUYXJnZXQiLCJlbGVtZW50cyIsInNldHRpbmdJdGVtVGVtcGxhdGUiLCJzZXR0aW5nVmFsdWVUZW1wbGF0ZSIsIlRpbWVEaXNwbGF5IiwiJHBvc2l0aW9uIiwiJGR1cmF0aW9uIiwiY29udmVydEh1bWFuaXplVGltZSIsInRpbWUiLCJWb2x1bWVCdXR0b24iLCIkc2xpZGVyQ29udGFpbmVyIiwiJHNsaWRlciIsIiRzbGlkZXJIYW5kbGUiLCIkc2xpZGVyVmFsdWUiLCIkdm9sdW1lSWNvbkJpZyIsIiR2b2x1bWVJY29uU21hbGwiLCIkdm9sdW1lSWNvbk11dGUiLCJzbGlkZXJXaWR0aCIsImhhbmRsZVdpZHRoIiwibWluUmFuZ2UiLCJtYXhSYW5nZSIsInNldFZvbHVtZUljb24iLCJzZXRWb2x1bWVVSSIsImhhbmRsZVBvc2l0aW9uIiwicmVsYXRpdmVYIiwiT3ZlblRlbXBsYXRlIiwidGVtcGxhdGVOYW1lIiwiaXNSb290IiwiJHRlbXBsYXRlIiwidmlld0V2ZW50cyIsImNyZWF0ZUFuZFNlbGVjdEVsZW1lbnQiLCJuZXdFbGVtZW50IiwiZmlyc3RDaGlsZCIsIlRlbXBsYXRlcyIsImV4cGxvZGVkVGV4dCIsImV2ZW50U3RyaW5nIiwidGFyZ2V0IiwiJHRhcmdldCIsIndyYXBwZWRGdW5jIiwiJGl0ZW0iLCJUZXh0Vmlld1RlbXBsYXRlIiwiVmlld1RlbXBsYXRlIiwiSGVscGVyVGVtcGxhdGUiLCJCaWdCdXR0b25UZW1wbGF0ZSIsIk1lc3NhZ2VCb3hUZW1wbGF0ZSIsIlNwaW5uZXJUZW1wbGF0ZSIsIkNvbnRleHRQYW5lbFRlbXBsYXRlIiwiQ29udHJvbHNUZW1wbGF0ZSIsIlZvbHVtZUJ1dHRvblRlbXBsYXRlIiwiUHJvZ3Jlc3NCYXJUZW1wbGF0ZSIsIlBsYXlCdXR0b25UZW1wbGF0ZSIsIlRpbWVEaXNwbGF5VGVtcGxhdGUiLCJGdWxsU2NyZWVuQnV0dG9uVGVtcGxhdGUiLCJTZXR0aW5nUGFuZWxUZW1wbGF0ZSIsIkJpZ0J1dHRvbiIsInBsYXllclN0YXRlIiwiQ29udGV4dFBhbmVsIiwicGFuZWxXaWR0aCIsInBhbmVsSGVpZ2h0IiwicGFnZVkiLCJvcGVuIiwiSGVscGVyIiwiYmlnQnV0dG9uIiwibWVzc2FnZUJveCIsInNwaW5uZXIiLCJjcmVhdGVCaWdCdXR0b24iLCJjcmVhdGVNZXNzYWdlIiwid2l0aFRpbWVyIiwiTWVzc2FnZUJveCIsImF1dG9EZXN0cm95VGltZXIiLCJTcGlubmVyIiwiJHNwaW5uZXIiLCJpc1Nob3ciLCJWaWV3IiwiY29udHJvbHMiLCJoZWxwZXIiLCIkcGxheWVyUm9vdCIsImNvbnRleHRQYW5lbCIsImF1dG9IaWRlVGltZXIiLCJzZXRIaWRlIiwiYXV0b0hpZGUiLCJ0b2dnbGVQbGF5UGF1c2UiLCJpc1Jld2luZCIsImN1cnJlbnRQb3NpdGlvbiIsImlzVXAiLCJjdXJyZW50Vm9sdW1uIiwibmV3Vm9sdW1lIiwiY3JlYXRlQ29udGV4dFBhbmVsIiwia2V5Q29kZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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MkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkLGtEQUFrRCxzQkFBc0I7QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeEZBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JCQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7O0FDQ0E7O0FBRUE7O0FBRUE7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7OztBQVpBO0FBa0JBLElBQU1BLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxTQUFULEVBQW1CO0FBQzNCLFFBQUlDLGFBQWEsdUJBQWpCO0FBQ0EsUUFBTUMsT0FBTyxFQUFiO0FBQ0EsZ0NBQWFBLElBQWI7O0FBRUFDLHNCQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXFCQyxnQkFBM0M7QUFDQUYsc0JBQWtCQyxHQUFsQixDQUFzQixhQUF0QjtBQUNBO0FBQ0EsUUFBSUUsZUFBZSx1QkFBYU4sU0FBYixDQUFuQjtBQUNBLFFBQUlPLGtCQUFrQix3QkFBdEI7QUFDQSxRQUFJQyxxQkFBcUIsMkJBQXpCO0FBQ0EsUUFBSUMsa0JBQWtCLEVBQXRCO0FBQ0EsUUFBSUMsZUFBZSxFQUFuQjtBQUNBLFFBQUlDLFlBQVksRUFBaEI7O0FBRUEsUUFBTUMsZUFBZSxTQUFmQSxZQUFlLENBQVNDLGdCQUFULEVBQTBCO0FBQzNDLFlBQU1DLHdCQUF3QixTQUF4QkEscUJBQXdCLENBQUNDLE9BQUQsRUFBWTtBQUN0QyxnQkFBSUMsVUFBVSxDQUFkO0FBQ0EsZ0JBQUlELE9BQUosRUFBYTtBQUNULHFCQUFLLElBQUlFLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsUUFBUUcsTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLHdCQUFJRixRQUFRRSxDQUFSLEVBQVdFLE9BQWYsRUFBd0I7QUFDcEJILGtDQUFVQyxDQUFWO0FBQ0g7QUFDRCx3QkFBSVAsYUFBYVUsZUFBYixNQUFrQ0wsUUFBUUUsQ0FBUixFQUFXSSxLQUFYLEtBQXFCWCxhQUFhVSxlQUFiLEVBQTNELEVBQTRGO0FBQ3hGLCtCQUFPSCxDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsbUJBQU9ELE9BQVA7QUFDSCxTQWJEOztBQWVBLGVBQU9SLG1CQUFtQmMsYUFBbkIsQ0FBaUNmLGdCQUFnQmdCLFdBQWhCLEVBQWpDLEVBQWdFQyxJQUFoRSxDQUFxRSxxQkFBYTtBQUNyRixnQkFBR2YsZUFBSCxFQUFtQjtBQUNmQSxnQ0FBZ0JnQixPQUFoQjtBQUNBaEIsa0NBQWtCLElBQWxCO0FBQ0g7QUFDRCxnQkFBTWlCLGVBQWVwQixhQUFhcUIsYUFBYixFQUFyQjtBQUNBLGdCQUFJQyxxQkFBcUJkLHNCQUFzQlAsZ0JBQWdCc0IsaUJBQWhCLEVBQXRCLENBQXpCOztBQUVBMUIsOEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBMkJ3QixrQkFBakQ7O0FBRUFuQiw4QkFBa0JxQixVQUFVRixrQkFBVixFQUE4QkYsWUFBOUIsRUFBNENoQixZQUE1QyxDQUFsQjs7QUFFQTtBQUNBRCw0QkFBZ0JzQixFQUFoQixDQUFtQixLQUFuQixFQUEwQixVQUFTQyxJQUFULEVBQWVDLElBQWYsRUFBb0I7QUFDMUMvQixxQkFBS2dDLE9BQUwsQ0FBYUYsSUFBYixFQUFtQkMsSUFBbkI7O0FBRUE7QUFDQSxvQkFBS0QsU0FBU0csZ0JBQVQsS0FBbUJGLEtBQUtHLElBQUwsS0FBY0MsNEJBQWQsSUFBbUNDLFNBQVNMLEtBQUtHLElBQUwsR0FBVSxHQUFuQixNQUE0QixDQUFsRixDQUFELElBQ0dKLFNBQVNPLDRCQURoQixFQUNtQztBQUMvQix3QkFBSUMsaUJBQWlCdEMsS0FBS3VDLGlCQUFMLEVBQXJCO0FBQ0Esd0JBQUdELGlCQUFlLENBQWYsR0FBbUJ0QyxLQUFLd0MsZ0JBQUwsR0FBd0J4QixNQUE5QyxFQUFxRDtBQUNqRDtBQUNBaEIsNkJBQUt5QyxLQUFMO0FBQ0F6Qyw2QkFBSzBDLGlCQUFMLENBQXVCSixpQkFBZSxDQUF0QztBQUNIO0FBRUo7QUFFSixhQWZEO0FBaUJILFNBOUJNLEVBOEJKaEIsSUE5QkksQ0E4QkMsWUFBSTtBQUNSZiw0QkFBZ0JvQyxPQUFoQixDQUF3QnRDLGdCQUFnQnNCLGlCQUFoQixFQUF4QixFQUE2RGhCLGdCQUE3RDs7QUFFQUYsc0JBQVVtQyxLQUFWO0FBQ0E7QUFDQW5DLHNCQUFVYyxPQUFWOztBQUVBdkIsaUJBQUtnQyxPQUFMLENBQWFhLGdCQUFiO0FBQ0gsU0F0Q00sRUFzQ0pDLEtBdENJLENBc0NFLFVBQUNDLEtBQUQsRUFBVztBQUNoQixnQkFBTUMsY0FBYyxFQUFDZCxNQUFPZSxxQkFBUixFQUFvQkMsUUFBUyxhQUE3QixFQUE0Q0MsU0FBVSxvQkFBdEQsRUFBNEVKLE9BQVFBLEtBQXBGLEVBQXBCO0FBQ0EvQyxpQkFBS2dDLE9BQUwsQ0FBYUMsZ0JBQWIsRUFBb0JlLFdBQXBCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0F2QyxzQkFBVTJDLG1CQUFWLENBQThCLE1BQTlCO0FBQ0gsU0EvQ00sQ0FBUDtBQWdESCxLQWhFRDs7QUFtRUE7Ozs7OztBQU1BcEQsU0FBS3FELElBQUwsR0FBWSxVQUFDQyxPQUFELEVBQVk7QUFDcEI7QUFDQTdDLG9CQUFZLG1DQUFvQlQsSUFBcEIsRUFBMEIsQ0FBQyxNQUFELEVBQVEsTUFBUixFQUFlLE9BQWYsRUFBdUIsTUFBdkIsRUFBOEIsTUFBOUIsRUFBc0MsYUFBdEMsRUFBcUQsYUFBckQsRUFBb0UsV0FBcEUsRUFBaUYsU0FBakYsRUFBNEYsV0FBNUYsRUFBeUcsVUFBekcsQ0FBMUIsQ0FBWjtBQUNBUSx1QkFBZSw0QkFBYThDLE9BQWIsQ0FBZjtBQUNBLFlBQUcsQ0FBQzlDLGFBQWErQyxPQUFiLEVBQUosRUFBMkI7QUFDdkJ4RCx1QkFBV3lELE9BQVg7QUFDSDtBQUNEdkQsMEJBQWtCQyxHQUFsQixDQUFzQixjQUF0QjtBQUNBRCwwQkFBa0JDLEdBQWxCLENBQXNCLHdCQUF0QixFQUFnRE0sWUFBaEQ7O0FBRUFILHdCQUFnQm9ELFdBQWhCLENBQTRCakQsYUFBYWEsV0FBYixFQUE1QjtBQUNBcEIsMEJBQWtCQyxHQUFsQixDQUFzQix5QkFBdEIsRUFBa0RHLGdCQUFnQnNCLGlCQUFoQixFQUFsRDtBQUNBakI7QUFDSCxLQWJEO0FBY0FWLFNBQUswRCxTQUFMLEdBQWlCLFlBQU07QUFDbkJ6RCwwQkFBa0JDLEdBQWxCLENBQXNCLG1CQUF0QixFQUEyQ00sYUFBYWtELFNBQWIsRUFBM0M7QUFDQSxlQUFPbEQsYUFBYWtELFNBQWIsRUFBUDtBQUNILEtBSEQ7O0FBS0ExRCxTQUFLMkQsV0FBTCxHQUFtQixZQUFNO0FBQ3JCMUQsMEJBQWtCQyxHQUFsQixDQUFzQixxQkFBdEIsRUFBNkNLLGdCQUFnQm9ELFdBQWhCLEVBQTdDO0FBQ0EsZUFBT3BELGdCQUFnQm9ELFdBQWhCLEVBQVA7QUFDSCxLQUhEO0FBSUEzRCxTQUFLNEQsV0FBTCxHQUFtQixZQUFNO0FBQ3JCM0QsMEJBQWtCQyxHQUFsQixDQUFzQixxQkFBdEIsRUFBNkNLLGdCQUFnQnFELFdBQWhCLEVBQTdDO0FBQ0EsZUFBT3JELGdCQUFnQnFELFdBQWhCLEVBQVA7QUFDSCxLQUhEO0FBSUE1RCxTQUFLNkQsU0FBTCxHQUFpQixZQUFNO0FBQ25CNUQsMEJBQWtCQyxHQUFsQixDQUFzQixtQkFBdEIsRUFBMkNLLGdCQUFnQnNELFNBQWhCLEVBQTNDO0FBQ0EsZUFBT3RELGdCQUFnQnNELFNBQWhCLEVBQVA7QUFDSCxLQUhEO0FBSUE3RCxTQUFLOEQsU0FBTCxHQUFpQixVQUFDQyxNQUFELEVBQVk7QUFDekI5RCwwQkFBa0JDLEdBQWxCLENBQXNCLHVCQUF1QjZELE1BQTdDO0FBQ0F4RCx3QkFBZ0J1RCxTQUFoQixDQUEwQkMsTUFBMUI7QUFDSCxLQUhEO0FBSUEvRCxTQUFLZ0UsT0FBTCxHQUFlLFVBQUNDLEtBQUQsRUFBVztBQUN0QmhFLDBCQUFrQkMsR0FBbEIsQ0FBc0IscUJBQXFCK0QsS0FBM0M7QUFDQSxlQUFPMUQsZ0JBQWdCeUQsT0FBaEIsQ0FBd0JDLEtBQXhCLENBQVA7QUFDSCxLQUhEO0FBSUFqRSxTQUFLa0UsT0FBTCxHQUFlLFlBQU07QUFDakJqRSwwQkFBa0JDLEdBQWxCLENBQXNCLHFCQUFxQkssZ0JBQWdCMkQsT0FBaEIsRUFBM0M7QUFDQSxlQUFPM0QsZ0JBQWdCMkQsT0FBaEIsRUFBUDtBQUNILEtBSEQ7QUFJQWxFLFNBQUttRSxJQUFMLEdBQVksVUFBQ0MsUUFBRCxFQUFjO0FBQ3RCbkUsMEJBQWtCQyxHQUFsQixDQUFzQixlQUF0QixFQUF1Q2tFLFFBQXZDO0FBQ0EzRCxvQkFBWSxtQ0FBb0JULElBQXBCLEVBQTBCLENBQUMsTUFBRCxFQUFRLE1BQVIsRUFBZSxNQUFmLENBQTFCLENBQVo7O0FBRUEsWUFBR29FLFFBQUgsRUFBWTtBQUNSN0QsNEJBQWdCbUMsaUJBQWhCLENBQWtDLENBQWxDO0FBQ0FyQyw0QkFBZ0JvRCxXQUFoQixDQUE0QlcsUUFBNUI7QUFDSDtBQUNELGVBQU8xRCxjQUFQO0FBRUgsS0FWRDtBQVdBVixTQUFLcUUsSUFBTCxHQUFZLFlBQU07QUFDZHBFLDBCQUFrQkMsR0FBbEIsQ0FBc0IsZUFBdEI7QUFDQUssd0JBQWdCOEQsSUFBaEI7QUFDSCxLQUhEO0FBSUFyRSxTQUFLeUMsS0FBTCxHQUFhLFlBQU07QUFDZnhDLDBCQUFrQkMsR0FBbEIsQ0FBc0IsZ0JBQXRCO0FBQ0FLLHdCQUFnQmtDLEtBQWhCO0FBQ0gsS0FIRDtBQUlBekMsU0FBS3NFLElBQUwsR0FBWSxVQUFDQyxRQUFELEVBQWM7QUFDdEJ0RSwwQkFBa0JDLEdBQWxCLENBQXNCLGtCQUFpQnFFLFFBQXZDO0FBQ0FoRSx3QkFBZ0IrRCxJQUFoQixDQUFxQkMsUUFBckI7QUFDSCxLQUhEO0FBSUF2RSxTQUFLd0UsZUFBTCxHQUF1QixVQUFDQyxZQUFELEVBQWlCO0FBQ3BDeEUsMEJBQWtCQyxHQUFsQixDQUFzQiwwQkFBdEIsRUFBa0R1RSxZQUFsRDtBQUNBLGVBQU9sRSxnQkFBZ0JpRSxlQUFoQixDQUFnQ2hFLGFBQWFrRSxzQkFBYixDQUFvQ0QsWUFBcEMsQ0FBaEMsQ0FBUDtBQUNILEtBSEQ7QUFJQXpFLFNBQUsyRSxlQUFMLEdBQXVCLFlBQUs7QUFDeEIxRSwwQkFBa0JDLEdBQWxCLENBQXNCLDBCQUF0QixFQUFrREssZ0JBQWdCb0UsZUFBaEIsRUFBbEQ7QUFDQSxlQUFPcEUsZ0JBQWdCb0UsZUFBaEIsRUFBUDtBQUNILEtBSEQ7QUFJQTNFLFNBQUt3QyxnQkFBTCxHQUF3QixZQUFLO0FBQ3pCdkMsMEJBQWtCQyxHQUFsQixDQUFzQiwyQkFBdEIsRUFBbURLLGdCQUFnQmlDLGdCQUFoQixFQUFuRDtBQUNBLGVBQU9qQyxnQkFBZ0JpQyxnQkFBaEIsRUFBUDtBQUNILEtBSEQ7QUFJQXhDLFNBQUt1QyxpQkFBTCxHQUF5QixZQUFLO0FBQzFCdEMsMEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEIsRUFBb0RLLGdCQUFnQmdDLGlCQUFoQixFQUFwRDtBQUNBLGVBQU9oQyxnQkFBZ0JnQyxpQkFBaEIsRUFBUDtBQUNILEtBSEQ7QUFJQXZDLFNBQUswQyxpQkFBTCxHQUF5QixVQUFDa0MsWUFBRCxFQUFpQjtBQUN0QzNFLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCLEVBQW9EMEUsWUFBcEQ7O0FBRUEsWUFBSS9ELFVBQVVSLGdCQUFnQnNCLGlCQUFoQixFQUFkO0FBQ0EsWUFBSWtELGdCQUFnQmhFLFFBQVFiLEtBQUt1QyxpQkFBTCxFQUFSLENBQXBCO0FBQ0EsWUFBSXVDLFlBQVlqRSxRQUFRK0QsWUFBUixDQUFoQjtBQUNBLFlBQUlqRSxtQkFBbUJYLEtBQUs0RCxXQUFMLEVBQXZCO0FBQ0EsWUFBSW1CLGlCQUFpQnpFLG1CQUFtQnlFLGNBQW5CLENBQWtDRixhQUFsQyxFQUFpREMsU0FBakQsQ0FBckI7QUFDQTtBQUNBLFlBQUlFLGtCQUFrQnpFLGdCQUFnQm1DLGlCQUFoQixDQUFrQ2tDLFlBQWxDLEVBQWdERyxjQUFoRCxDQUF0Qjs7QUFFQSxZQUFHLENBQUNELFNBQUosRUFBYztBQUNWLG1CQUFPLElBQVA7QUFDSDs7QUFFRDdFLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMENBQXRCLEVBQWtFNkUsY0FBbEU7O0FBRUEsWUFBRyxDQUFDQSxjQUFKLEVBQW1CO0FBQ2Z0RSx3QkFBWSxtQ0FBb0JULElBQXBCLEVBQTBCLENBQUMsTUFBRCxDQUExQixDQUFaO0FBQ0FVLHlCQUFhQyxnQkFBYjtBQUNIOztBQUVELGVBQU9xRSxlQUFQO0FBQ0gsS0F2QkQ7O0FBeUJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkFoRixTQUFLaUYsU0FBTCxHQUFpQixZQUFNO0FBQ25CaEYsMEJBQWtCQyxHQUFsQixDQUFzQixvQkFBdEIsRUFBNENLLGdCQUFnQjBFLFNBQWhCLEVBQTVDO0FBQ0ExRSx3QkFBZ0IwRSxTQUFoQjtBQUNILEtBSEQ7QUFJQWpGLFNBQUtrRixRQUFMLEdBQWdCLFlBQU07QUFDbEJqRiwwQkFBa0JDLEdBQWxCLENBQXNCLG1CQUF0QixFQUEyQ0ssZ0JBQWdCMkUsUUFBaEIsRUFBM0M7QUFDQSxlQUFPM0UsZ0JBQWdCMkUsUUFBaEIsRUFBUDtBQUNILEtBSEQ7QUFJQWxGLFNBQUttRixJQUFMLEdBQVksWUFBTTtBQUNkbEYsMEJBQWtCQyxHQUFsQixDQUFzQixlQUF0QjtBQUNBSyx3QkFBZ0I0RSxJQUFoQjtBQUNILEtBSEQ7QUFJQW5GLFNBQUtvRixNQUFMLEdBQWMsWUFBTTtBQUNoQm5GLDBCQUFrQkMsR0FBbEIsQ0FBc0IsaUJBQXRCO0FBQ0FPLGtCQUFVYyxPQUFWO0FBQ0FoQix3QkFBZ0JnQixPQUFoQjtBQUNBaEIsMEJBQWtCLElBQWxCO0FBQ0FELDZCQUFxQixJQUFyQjtBQUNBRCwwQkFBa0IsSUFBbEI7QUFDQUcsdUJBQWUsSUFBZjs7QUFFQVIsYUFBS2dDLE9BQUwsQ0FBYXFELGtCQUFiO0FBQ0FyRixhQUFLc0YsR0FBTDs7QUFFQXJGLDBCQUFrQkMsR0FBbEIsQ0FBc0Isc0hBQXRCO0FBQ0FILG1CQUFXd0IsT0FBWDtBQUNILEtBZEQ7O0FBZ0JBLFdBQU92QixJQUFQO0FBQ0gsQ0FqUEQ7O2tCQXFQZUgsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2UWY7Ozs7OztBQUVBOzs7OztBQUtBLElBQU0wRixlQUFlLFNBQWZBLFlBQWUsQ0FBU2pDLE9BQVQsRUFBaUI7O0FBRWxDLFFBQU1rQyx1QkFBdUIsU0FBdkJBLG9CQUF1QixDQUFTbEMsT0FBVCxFQUFpQjtBQUMxQyxZQUFNbUMsV0FBVztBQUNiQyxpQ0FBcUIsQ0FEUjtBQUViQyxrQ0FBc0IsS0FGVDtBQUdiQywyQkFBZSxDQUFDLElBQUQsRUFBTyxHQUFQLEVBQVksQ0FBWixFQUFlLEdBQWYsRUFBb0IsQ0FBcEIsQ0FIRjtBQUliQyxrQkFBTSxLQUpPO0FBS2I5QixvQkFBUSxFQUxLO0FBTWIrQixtQkFBTyxHQU5NO0FBT2JDLG9CQUFRO0FBUEssU0FBakI7QUFTQSxZQUFNQyxZQUFZLFNBQVpBLFNBQVksQ0FBVUMsR0FBVixFQUFlO0FBQzdCLGdCQUFJQSxRQUFRQyxTQUFaLEVBQXVCO0FBQ25CLHVCQUFPLElBQVA7QUFDSDtBQUNELGdCQUFJLE9BQU9ELEdBQVAsS0FBZSxRQUFmLElBQTJCQSxJQUFJakYsTUFBSixHQUFhLENBQTVDLEVBQStDO0FBQzNDLG9CQUFNbUYsZUFBZUYsSUFBSUcsV0FBSixFQUFyQjtBQUNBLG9CQUFJRCxpQkFBaUIsTUFBckIsRUFBNkI7QUFDekIsMkJBQU8sSUFBUDtBQUNIO0FBQ0Qsb0JBQUlBLGlCQUFpQixPQUFyQixFQUE4QjtBQUMxQiwyQkFBTyxLQUFQO0FBQ0g7QUFDRCxvQkFBSSxDQUFDRSxNQUFNQyxPQUFPTCxHQUFQLENBQU4sQ0FBRCxJQUF1QixDQUFDSSxNQUFNRSxXQUFXTixHQUFYLENBQU4sQ0FBNUIsRUFBb0Q7QUFDaEQsMkJBQU9LLE9BQU9MLEdBQVAsQ0FBUDtBQUNIO0FBQ0o7QUFDRCxtQkFBT0EsR0FBUDtBQUNILFNBakJEO0FBa0JBLFlBQU1PLGNBQWMsU0FBZEEsV0FBYyxDQUFVbEQsT0FBVixFQUFtQjtBQUNuQ21ELG1CQUFPQyxJQUFQLENBQVlwRCxPQUFaLEVBQXFCcUQsT0FBckIsQ0FBNkIsVUFBQ0MsR0FBRCxFQUFTO0FBQ2xDLG9CQUFJQSxRQUFRLElBQVosRUFBa0I7QUFDZDtBQUNIO0FBQ0R0RCx3QkFBUXNELEdBQVIsSUFBZVosVUFBVTFDLFFBQVFzRCxHQUFSLENBQVYsQ0FBZjtBQUNILGFBTEQ7QUFNSCxTQVBEO0FBUUEsWUFBTUMsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFVWixHQUFWLEVBQWU7QUFDakMsZ0JBQUlBLElBQUlhLEtBQUosSUFBYWIsSUFBSWEsS0FBSixDQUFVLENBQUMsQ0FBWCxNQUFrQixJQUFuQyxFQUF5QztBQUNyQ2Isc0JBQU1BLElBQUlhLEtBQUosQ0FBVSxDQUFWLEVBQWEsQ0FBQyxDQUFkLENBQU47QUFDSDtBQUNELG1CQUFPYixHQUFQO0FBQ0gsU0FMRDtBQU1BLFlBQU1jLHNCQUFzQixTQUF0QkEsbUJBQXNCLENBQVVDLEVBQVYsRUFBY2xCLEtBQWQsRUFBcUI7QUFDN0MsZ0JBQUlBLE1BQU1tQixRQUFOLEdBQWlCQyxPQUFqQixDQUF5QixHQUF6QixNQUFrQyxDQUFDLENBQXZDLEVBQTBDO0FBQ3RDLHVCQUFPLENBQVA7QUFDSDtBQUNELGdCQUFJLE9BQU9GLEVBQVAsS0FBYyxRQUFkLElBQTBCLENBQUNBLEVBQS9CLEVBQW1DO0FBQy9CLHVCQUFPLENBQVA7QUFDSDtBQUNELGdCQUFJLGVBQWVHLElBQWYsQ0FBb0JILEVBQXBCLENBQUosRUFBNkI7QUFDekIsdUJBQU9BLEVBQVA7QUFDSDtBQUNELGdCQUFNSSxRQUFRSixHQUFHRSxPQUFILENBQVcsR0FBWCxDQUFkO0FBQ0EsZ0JBQUlFLFVBQVUsQ0FBQyxDQUFmLEVBQWtCO0FBQ2QsdUJBQU8sQ0FBUDtBQUNIO0FBQ0QsZ0JBQU1DLElBQUlkLFdBQVdTLEdBQUdNLE1BQUgsQ0FBVSxDQUFWLEVBQWFGLEtBQWIsQ0FBWCxDQUFWO0FBQ0EsZ0JBQU1HLElBQUloQixXQUFXUyxHQUFHTSxNQUFILENBQVVGLFFBQVEsQ0FBbEIsQ0FBWCxDQUFWO0FBQ0EsZ0JBQUlDLEtBQUssQ0FBTCxJQUFVRSxLQUFLLENBQW5CLEVBQXNCO0FBQ2xCLHVCQUFPLENBQVA7QUFDSDtBQUNELG1CQUFRQSxJQUFJRixDQUFKLEdBQVEsR0FBVCxHQUFnQixHQUF2QjtBQUNILFNBcEJEO0FBcUJBYixvQkFBWWxELE9BQVo7QUFDQSxZQUFJa0UsU0FBUyxTQUFjLEVBQWQsRUFBa0IvQixRQUFsQixFQUE0Qm5DLE9BQTVCLENBQWI7QUFDQWtFLGVBQU8xQixLQUFQLEdBQWVlLGNBQWNXLE9BQU8xQixLQUFyQixDQUFmO0FBQ0EwQixlQUFPekIsTUFBUCxHQUFnQmMsY0FBY1csT0FBT3pCLE1BQXJCLENBQWhCO0FBQ0F5QixlQUFPQyxXQUFQLEdBQXFCVixvQkFBb0JTLE9BQU9DLFdBQTNCLEVBQXdDRCxPQUFPMUIsS0FBL0MsQ0FBckI7O0FBRUEsWUFBSTRCLGVBQWVGLE9BQU83QixvQkFBMUI7QUFDQSxZQUFJK0IsWUFBSixFQUFrQjtBQUNkLGdCQUFJQyxRQUFRSCxPQUFPNUIsYUFBbkI7O0FBRUEsZ0JBQUlnQyxNQUFNQyxPQUFOLENBQWNILFlBQWQsQ0FBSixFQUFpQztBQUM3QkMsd0JBQVFELFlBQVI7QUFDSDtBQUNEQyxvQkFBUUEsTUFBTUcsTUFBTixDQUFhO0FBQUEsdUJBQVFDLHFCQUFFQyxRQUFGLENBQVdDLElBQVgsS0FBb0JBLFFBQVEsSUFBNUIsSUFBb0NBLFFBQVEsQ0FBcEQ7QUFBQSxhQUFiLEVBQ0hDLEdBREcsQ0FDQztBQUFBLHVCQUFRQyxLQUFLQyxLQUFMLENBQVdILE9BQU8sQ0FBbEIsSUFBdUIsQ0FBL0I7QUFBQSxhQURELENBQVI7O0FBR0EsZ0JBQUlOLE1BQU1ULE9BQU4sQ0FBYyxDQUFkLElBQW1CLENBQXZCLEVBQTBCO0FBQ3RCUyxzQkFBTVUsSUFBTixDQUFXLENBQVg7QUFDSDtBQUNEVixrQkFBTVcsSUFBTjs7QUFFQWQsbUJBQU83QixvQkFBUCxHQUE4QixJQUE5QjtBQUNBNkIsbUJBQU81QixhQUFQLEdBQXVCK0IsS0FBdkI7QUFDSDs7QUFHRCxZQUFJLENBQUNILE9BQU83QixvQkFBUixJQUFnQzZCLE9BQU81QixhQUFQLENBQXFCc0IsT0FBckIsQ0FBNkJNLE9BQU85QixtQkFBcEMsSUFBMkQsQ0FBL0YsRUFBa0c7QUFDOUY4QixtQkFBTzlCLG1CQUFQLEdBQTZCLENBQTdCO0FBQ0g7O0FBRUQ4QixlQUFPL0MsWUFBUCxHQUFzQitDLE9BQU85QixtQkFBN0I7O0FBRUEsWUFBSSxDQUFDOEIsT0FBT0MsV0FBWixFQUF5QjtBQUNyQixtQkFBT0QsT0FBT0MsV0FBZDtBQUNIOztBQUVELFlBQU1jLGlCQUFpQmYsT0FBT3BELFFBQTlCO0FBQ0EsWUFBSSxDQUFDbUUsY0FBTCxFQUFxQjtBQUNqQixnQkFBTUMsTUFBTVQscUJBQUVVLElBQUYsQ0FBT2pCLE1BQVAsRUFBZSxDQUN2QixPQUR1QixFQUV2QixhQUZ1QixFQUd2QixNQUh1QixFQUl2QixTQUp1QixFQUt2QixPQUx1QixFQU12QixNQU51QixFQU92QixTQVB1QixFQVF2QixRQVJ1QixFQVN2QixTQVR1QixFQVV2QixVQVZ1QixFQVd2QixNQVh1QixFQVl2QixhQVp1QixFQWF2QixRQWJ1QixDQUFmLENBQVo7O0FBZ0JBQSxtQkFBT3BELFFBQVAsR0FBa0IsQ0FBRW9FLEdBQUYsQ0FBbEI7QUFDSCxTQWxCRCxNQWtCTyxJQUFJVCxxQkFBRUYsT0FBRixDQUFVVSxlQUFlbkUsUUFBekIsQ0FBSixFQUF3QztBQUMzQ29ELG1CQUFPa0IsUUFBUCxHQUFrQkgsY0FBbEI7QUFDQWYsbUJBQU9wRCxRQUFQLEdBQWtCbUUsZUFBZW5FLFFBQWpDO0FBQ0g7O0FBRUQsZUFBT29ELE9BQU9tQixRQUFkO0FBQ0EsZUFBT25CLE1BQVA7QUFDSCxLQTdIRDtBQThIQXZILHNCQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXRCLEVBQThDb0QsT0FBOUM7QUFDQSxRQUFJa0UsU0FBU2hDLHFCQUFxQmxDLE9BQXJCLENBQWI7O0FBRUEsUUFBSW1FLGNBQWNELE9BQU9DLFdBQVAsSUFBc0IsTUFBeEM7QUFDQSxRQUFJbUIsUUFBUXBCLE9BQU9vQixLQUFuQjtBQUNBLFFBQUlsRCxzQkFBc0I4QixPQUFPOUIsbUJBQVAsSUFBOEIsQ0FBeEQ7QUFDQSxRQUFJbUQsUUFBUXJCLE9BQU9xQixLQUFuQjtBQUNBLFFBQUlsRCx1QkFBdUI2QixPQUFPN0Isb0JBQVAsSUFBK0IsSUFBMUQ7QUFDQSxRQUFJQyxnQkFBZ0I0QixPQUFPNUIsYUFBUCxJQUF3QixDQUFDLEdBQUQsRUFBTSxDQUFOLEVBQVMsSUFBVCxFQUFlLEdBQWYsRUFBb0IsQ0FBcEIsQ0FBNUM7QUFDQSxRQUFJeEIsV0FBV29ELE9BQU9wRCxRQUFQLElBQW1CLEVBQWxDO0FBQ0EsUUFBSTBFLGVBQWV0QixPQUFPc0IsWUFBUCxJQUF1QixFQUExQztBQUNBLFFBQUlDLFNBQVN2QixPQUFPdUIsTUFBUCxJQUFpQixLQUE5QjtBQUNBLFFBQUlDLGFBQWF4QixPQUFPd0IsVUFBUCxJQUFxQixTQUF0Qzs7QUFJQSxRQUFNaEosT0FBTyxFQUFiO0FBQ0FBLFNBQUswRCxTQUFMLEdBQWlCLFlBQU07QUFBQyxlQUFPOEQsTUFBUDtBQUFlLEtBQXZDOztBQUVBeEgsU0FBS2lKLGNBQUwsR0FBcUIsWUFBSTtBQUFDLGVBQU94QixXQUFQO0FBQW9CLEtBQTlDO0FBQ0F6SCxTQUFLa0osY0FBTCxHQUFxQixVQUFDQyxZQUFELEVBQWdCO0FBQUMxQixzQkFBYzBCLFlBQWQ7QUFBNEIsS0FBbEU7O0FBRUFuSixTQUFLdUQsT0FBTCxHQUFjLFlBQUk7QUFBQyxlQUFPcUYsS0FBUDtBQUFjLEtBQWpDOztBQUVBNUksU0FBS29KLHNCQUFMLEdBQTZCLFlBQUk7QUFBQyxlQUFPMUQsbUJBQVA7QUFBNEIsS0FBOUQ7QUFDQTFGLFNBQUswRSxzQkFBTCxHQUE2QixVQUFDRCxZQUFELEVBQWdCO0FBQUNpQiw4QkFBc0JqQixZQUF0QixDQUFvQyxPQUFPQSxZQUFQO0FBQXFCLEtBQXZHOztBQUVBekUsU0FBS2tCLGVBQUwsR0FBdUIsWUFBTTtBQUFDLGVBQU80SCxZQUFQO0FBQXFCLEtBQW5EO0FBQ0E5SSxTQUFLcUosZUFBTCxHQUF1QixVQUFDQyxRQUFELEVBQWM7QUFBQ1IsdUJBQWVRLFFBQWY7QUFBeUIsS0FBL0Q7O0FBRUF0SixTQUFLdUosZ0JBQUwsR0FBdUIsWUFBSTtBQUFDLGVBQU8zRCxhQUFQO0FBQXNCLEtBQWxEO0FBQ0E1RixTQUFLd0osc0JBQUwsR0FBNkIsWUFBSTtBQUFDLGVBQU83RCxvQkFBUDtBQUE2QixLQUEvRDs7QUFFQTNGLFNBQUtxQixXQUFMLEdBQWtCLFlBQUk7QUFBQyxlQUFPK0MsUUFBUDtBQUFpQixLQUF4QztBQUNBcEUsU0FBS3lELFdBQUwsR0FBa0IsVUFBQ2dHLFNBQUQsRUFBYztBQUM1QixZQUFHMUIscUJBQUVGLE9BQUYsQ0FBVTRCLFNBQVYsQ0FBSCxFQUF3QjtBQUNwQnJGLHVCQUFXcUYsU0FBWDtBQUNILFNBRkQsTUFFSztBQUNEckYsdUJBQVcsQ0FBQ3FGLFNBQUQsQ0FBWDtBQUNIO0FBQ0QsZUFBT3JGLFFBQVA7QUFDSCxLQVBEOztBQVNBcEUsU0FBSzBKLFFBQUwsR0FBZSxZQUFJO0FBQUMsZUFBT1gsTUFBUDtBQUFlLEtBQW5DOztBQUVBL0ksU0FBSzJKLGFBQUwsR0FBb0IsWUFBSTtBQUFDLGVBQU9YLFVBQVA7QUFBbUIsS0FBNUM7O0FBRUEsV0FBT2hKLElBQVA7QUFDSCxDQWhMRDs7a0JBa0xldUYsWTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6TGY7Ozs7QUFJQTs7Ozs7O0FBTUEsSUFBTXFFLGVBQWUsU0FBZkEsWUFBZSxDQUFTQyxNQUFULEVBQWdCO0FBQ2pDLFFBQUk3SixPQUFPNkosTUFBWDtBQUNBLFFBQUlDLFVBQVMsRUFBYjs7QUFFQSxRQUFNQyxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQVNDLE1BQVQsRUFBaUJDLElBQWpCLEVBQXVCQyxPQUF2QixFQUErQjtBQUNqRCxZQUFJbkosSUFBSSxDQUFSO0FBQ0EsWUFBSUMsU0FBU2dKLE9BQU9oSixNQUFwQjtBQUNBLGFBQUlELElBQUksQ0FBUixFQUFXQSxJQUFJQyxNQUFmLEVBQXVCRCxHQUF2QixFQUE0QjtBQUN4QixnQkFBSW9KLFFBQVFILE9BQU9qSixDQUFQLENBQVo7QUFDQW9KLGtCQUFNQyxRQUFOLENBQWVDLEtBQWYsQ0FBd0JGLE1BQU1ELE9BQU4sSUFBaUJBLE9BQXpDLEVBQW9ERCxJQUFwRDtBQUNIO0FBQ0osS0FQRDs7QUFTQWpLLFNBQUs2QixFQUFMLEdBQVUsVUFBU0MsSUFBVCxFQUFlc0ksUUFBZixFQUF5QkYsT0FBekIsRUFBaUM7QUFDdkMsU0FBQ0osUUFBUWhJLElBQVIsTUFBa0JnSSxRQUFRaEksSUFBUixJQUFjLEVBQWhDLENBQUQsRUFBdUN1RyxJQUF2QyxDQUE0QyxFQUFFK0IsVUFBVUEsUUFBWixFQUF3QkYsU0FBVUEsT0FBbEMsRUFBNUM7QUFDQSxlQUFPbEssSUFBUDtBQUNILEtBSEQ7QUFJQUEsU0FBS2dDLE9BQUwsR0FBZSxVQUFTRixJQUFULEVBQWM7QUFDekIsWUFBRyxDQUFDZ0ksT0FBSixFQUFZO0FBQ1IsbUJBQU8sS0FBUDtBQUNIO0FBQ0QsWUFBTUcsT0FBTyxHQUFHbkQsS0FBSCxDQUFTd0QsSUFBVCxDQUFjQyxTQUFkLEVBQXlCLENBQXpCLENBQWI7QUFDQSxZQUFNUCxTQUFTRixRQUFRaEksSUFBUixDQUFmO0FBQ0EsWUFBTTBJLFlBQVlWLFFBQVFXLEdBQTFCOztBQUVBLFlBQUdULE1BQUgsRUFBVTtBQUNORCwwQkFBY0MsTUFBZCxFQUFzQkMsSUFBdEIsRUFBNEJqSyxJQUE1QjtBQUNIO0FBQ0QsWUFBR3dLLFNBQUgsRUFBYTtBQUNUVCwwQkFBY1MsU0FBZCxFQUF5QkQsU0FBekIsRUFBb0N2SyxJQUFwQztBQUNIO0FBQ0osS0FkRDtBQWVBQSxTQUFLc0YsR0FBTCxHQUFXLFVBQVN4RCxJQUFULEVBQWVzSSxRQUFmLEVBQXlCRixPQUF6QixFQUFpQztBQUN4QyxZQUFHLENBQUNKLE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDs7QUFFRCxZQUFJLENBQUNoSSxJQUFELElBQVMsQ0FBQ3NJLFFBQVYsSUFBc0IsQ0FBQ0YsT0FBM0IsRUFBcUM7QUFDakNKLHNCQUFVLEVBQVY7QUFDQSxtQkFBTzlKLElBQVA7QUFDSDs7QUFFRCxZQUFNMEssUUFBUTVJLE9BQU8sQ0FBQ0EsSUFBRCxDQUFQLEdBQWdCMkUsT0FBT0MsSUFBUCxDQUFZb0QsT0FBWixDQUE5QjtBQUNBLGFBQUssSUFBSS9JLElBQUksQ0FBUixFQUFXNEosSUFBSUQsTUFBTTFKLE1BQTFCLEVBQWtDRCxJQUFJNEosQ0FBdEMsRUFBeUM1SixHQUF6QyxFQUE4QztBQUMxQ2UsbUJBQU80SSxNQUFNM0osQ0FBTixDQUFQO0FBQ0EsZ0JBQU1pSixTQUFTRixRQUFRaEksSUFBUixDQUFmO0FBQ0EsZ0JBQUlrSSxNQUFKLEVBQVk7QUFDUixvQkFBTVksU0FBU2QsUUFBUWhJLElBQVIsSUFBZ0IsRUFBL0I7QUFDQSxvQkFBSXNJLFlBQWFGLE9BQWpCLEVBQTBCO0FBQ3RCLHlCQUFLLElBQUlXLElBQUksQ0FBUixFQUFXQyxJQUFJZCxPQUFPaEosTUFBM0IsRUFBbUM2SixJQUFJQyxDQUF2QyxFQUEwQ0QsR0FBMUMsRUFBK0M7QUFDM0MsNEJBQU1WLFFBQVFILE9BQU9hLENBQVAsQ0FBZDtBQUNBLDRCQUFLVCxZQUFZQSxhQUFhRCxNQUFNQyxRQUEvQixJQUEyQ0EsYUFBYUQsTUFBTUMsUUFBTixDQUFlQSxRQUF2RSxJQUFvRkEsYUFBYUQsTUFBTUMsUUFBTixDQUFlVyxTQUFqSCxJQUNHYixXQUFXQSxZQUFZQyxNQUFNRCxPQURwQyxFQUVFO0FBQ0VVLG1DQUFPdkMsSUFBUCxDQUFZOEIsS0FBWjtBQUNIO0FBQ0o7QUFDSjtBQUNELG9CQUFJLENBQUNTLE9BQU81SixNQUFaLEVBQW9CO0FBQ2hCLDJCQUFPOEksUUFBUWhJLElBQVIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELGVBQU85QixJQUFQO0FBQ0gsS0FoQ0Q7QUFpQ0FBLFNBQUtnTCxJQUFMLEdBQVksVUFBU2xKLElBQVQsRUFBZXNJLFFBQWYsRUFBeUJGLE9BQXpCLEVBQWlDO0FBQ3pDLFlBQUllLFFBQVEsQ0FBWjtBQUNBLFlBQU1DLGVBQWUsU0FBZkEsWUFBZSxHQUFXO0FBQzVCLGdCQUFJRCxPQUFKLEVBQWE7QUFDVDtBQUNIO0FBQ0RqTCxpQkFBS3NGLEdBQUwsQ0FBU3hELElBQVQsRUFBZW9KLFlBQWY7QUFDQWQscUJBQVNDLEtBQVQsQ0FBZXJLLElBQWYsRUFBcUJ1SyxTQUFyQjtBQUNILFNBTkQ7QUFPQVcscUJBQWFDLFNBQWIsR0FBeUJmLFFBQXpCO0FBQ0EsZUFBT3BLLEtBQUs2QixFQUFMLENBQVFDLElBQVIsRUFBY29KLFlBQWQsRUFBNEJoQixPQUE1QixDQUFQO0FBQ0gsS0FYRDs7QUFhQSxXQUFPbEssSUFBUDtBQUNILENBL0VEOztrQkFpRmU0SixZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRmY7Ozs7OztBQUVBOzs7OztBQUtBLElBQU13QixzQkFBc0IsU0FBdEJBLG1CQUFzQixDQUFVQyxRQUFWLEVBQW9CQyxjQUFwQixFQUFvQztBQUM1RCxRQUFJQyxlQUFlLEVBQW5CO0FBQ0EsUUFBSUMscUJBQXFCLEVBQXpCO0FBQ0EsUUFBSUMsY0FBYyxLQUFsQjtBQUNBLFFBQUl6TCxPQUFPLEVBQVg7QUFDQUMsc0JBQWtCQyxHQUFsQixDQUFzQiw2QkFBdEI7QUFDQW9MLG1CQUFlM0UsT0FBZixDQUF1QixVQUFDK0UsT0FBRCxFQUFhO0FBQ2hDLFlBQU1DLFNBQVNOLFNBQVNLLE9BQVQsQ0FBZjtBQUNBRiwyQkFBbUJFLE9BQW5CLElBQThCQyxVQUFVLFlBQVUsQ0FBRSxDQUFwRDs7QUFFQU4saUJBQVNLLE9BQVQsSUFBb0IsWUFBVztBQUMzQixnQkFBTXpCLE9BQU9yQyxNQUFNZ0UsU0FBTixDQUFnQjlFLEtBQWhCLENBQXNCd0QsSUFBdEIsQ0FBMkJDLFNBQTNCLEVBQXNDLENBQXRDLENBQWI7QUFDRSxnQkFBSSxDQUFDa0IsV0FBTCxFQUFrQjtBQUNoQjtBQUNBekwscUJBQUs2TCxRQUFMLENBQWNILE9BQWQsRUFBdUJ6QixJQUF2QjtBQUNILGFBSEMsTUFHSztBQUNINkI7QUFDQSxvQkFBSUgsTUFBSixFQUFZO0FBQ1JBLDJCQUFPdEIsS0FBUCxDQUFhckssSUFBYixFQUFtQmlLLElBQW5CO0FBQ0g7QUFDSjtBQUNKLFNBWEQ7QUFZSCxLQWhCRDtBQWlCQSxRQUFJNkIsd0JBQXdCLFNBQXhCQSxxQkFBd0IsR0FBWTtBQUNwQyxlQUFPUCxhQUFhdkssTUFBYixHQUFzQixDQUE3QixFQUFnQztBQUFBLHNDQUNGdUssYUFBYVEsS0FBYixFQURFO0FBQUEsZ0JBQ3BCTCxPQURvQix1QkFDcEJBLE9BRG9CO0FBQUEsZ0JBQ1h6QixJQURXLHVCQUNYQSxJQURXOztBQUU1QixhQUFDdUIsbUJBQW1CRSxPQUFuQixLQUErQkwsU0FBU0ssT0FBVCxDQUFoQyxFQUFtRHJCLEtBQW5ELENBQXlEZ0IsUUFBekQsRUFBbUVwQixJQUFuRTtBQUNIO0FBQ0osS0FMRDs7QUFPQWpLLFNBQUtnTSxjQUFMLEdBQXNCLFVBQUNDLElBQUQsRUFBVTtBQUM1QlIsc0JBQWNRLElBQWQ7QUFDQWhNLDBCQUFrQkMsR0FBbEIsQ0FBc0Isd0NBQXRCLEVBQWdFK0wsSUFBaEU7QUFDSCxLQUhEO0FBSUFqTSxTQUFLa00scUJBQUwsR0FBNkIsWUFBVTtBQUNuQ2pNLDBCQUFrQkMsR0FBbEIsQ0FBc0IsK0NBQXRCLEVBQXVFc0wsa0JBQXZFO0FBQ0EsZUFBT0Esa0JBQVA7QUFDSCxLQUhEO0FBSUF4TCxTQUFLbU0sUUFBTCxHQUFnQixZQUFVO0FBQ3RCbE0sMEJBQWtCQyxHQUFsQixDQUFzQixrQ0FBdEIsRUFBMERpTSxRQUExRDtBQUNBLGVBQU9aLFlBQVA7QUFDSCxLQUhEO0FBSUF2TCxTQUFLNkwsUUFBTCxHQUFnQixVQUFTSCxPQUFULEVBQWtCekIsSUFBbEIsRUFBdUI7QUFDbkNoSywwQkFBa0JDLEdBQWxCLENBQXNCLGtDQUF0QixFQUEwRHdMLE9BQTFELEVBQW1FekIsSUFBbkU7QUFDQXNCLHFCQUFhbEQsSUFBYixDQUFrQixFQUFFcUQsZ0JBQUYsRUFBV3pCLFVBQVgsRUFBbEI7QUFDSCxLQUhEOztBQUtBakssU0FBSzRDLEtBQUwsR0FBYSxZQUFVO0FBQ25CM0MsMEJBQWtCQyxHQUFsQixDQUFzQiwrQkFBdEI7QUFDQTRMO0FBQ0gsS0FIRDtBQUlBOUwsU0FBS29NLEtBQUwsR0FBYSxZQUFXO0FBQ3BCbk0sMEJBQWtCQyxHQUFsQixDQUFzQiwrQkFBdEI7QUFDQXFMLHFCQUFhdkssTUFBYixHQUFzQixDQUF0QjtBQUNILEtBSEQ7QUFJQWhCLFNBQUtzRixHQUFMLEdBQVcsWUFBVztBQUNsQnJGLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNkJBQXRCO0FBQ0FvTCx1QkFBZTNFLE9BQWYsQ0FBdUIsVUFBQytFLE9BQUQsRUFBYTtBQUNoQyxnQkFBTUMsU0FBU0gsbUJBQW1CRSxPQUFuQixDQUFmO0FBQ0EsZ0JBQUlDLE1BQUosRUFBWTtBQUNSTix5QkFBU0ssT0FBVCxJQUFvQkMsTUFBcEI7QUFDQSx1QkFBT0gsbUJBQW1CRSxPQUFuQixDQUFQO0FBQ0g7QUFDSixTQU5EO0FBT0gsS0FURDs7QUFZQTtBQUNBMUwsU0FBS29ELG1CQUFMLEdBQTJCLFVBQVNpSixRQUFULEVBQWtCO0FBQ3pDLFlBQUlDLG1CQUFtQnZFLHFCQUFFd0UsU0FBRixDQUFZaEIsWUFBWixFQUEwQixFQUFDRyxTQUFVVyxRQUFYLEVBQTFCLENBQXZCO0FBQ0FwTSwwQkFBa0JDLEdBQWxCLENBQXNCLDZDQUF0QixFQUFxRW1NLFFBQXJFO0FBQ0FkLHFCQUFhaUIsTUFBYixDQUFvQnpFLHFCQUFFMEUsU0FBRixDQUFZbEIsWUFBWixFQUEwQixFQUFDRyxTQUFVVyxRQUFYLEVBQTFCLENBQXBCLEVBQXFFLENBQXJFOztBQUVBLFlBQU1WLFNBQVNILG1CQUFtQmEsUUFBbkIsQ0FBZjtBQUNBLFlBQUlWLE1BQUosRUFBWTtBQUNSMUwsOEJBQWtCQyxHQUFsQixDQUFzQixpQkFBdEI7QUFDQSxnQkFBR29NLGdCQUFILEVBQW9CO0FBQ2hCLGlCQUFDWCxVQUFTTixTQUFTZ0IsUUFBVCxDQUFWLEVBQThCaEMsS0FBOUIsQ0FBb0NnQixRQUFwQyxFQUE4Q2lCLGlCQUFpQnJDLElBQS9EO0FBQ0g7QUFDRG9CLHFCQUFTZ0IsUUFBVCxJQUFxQlYsTUFBckI7QUFDQSxtQkFBT0gsbUJBQW1CYSxRQUFuQixDQUFQO0FBQ0g7QUFDSixLQWREOztBQWdCQXJNLFNBQUt1QixPQUFMLEdBQWUsWUFBVztBQUN0QnRCLDBCQUFrQkMsR0FBbEIsQ0FBc0IsaUNBQXRCO0FBQ0FGLGFBQUtzRixHQUFMO0FBQ0F0RixhQUFLb00sS0FBTDtBQUNILEtBSkQ7QUFLQSxXQUFPcE0sSUFBUDtBQUNILENBMUZEOztrQkE0RmVvTCxtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkdmOztBQUVBOzs7OztBQUtBLElBQU1zQixpQkFBaUIsU0FBakJBLGNBQWlCLEdBQVU7QUFDN0IsUUFBTTFNLE9BQU8sRUFBYjtBQUNBQyxzQkFBa0JDLEdBQWxCLENBQXNCLHdCQUF0QjtBQUNBLFFBQU15TSxjQUFjLENBQ2hCO0FBQ0k3SyxjQUFNLE9BRFY7QUFFSThLLHNCQUFjLHNCQUFVQyxNQUFWLEVBQWtCO0FBQzVCLGdCQUFNQyxZQUFZO0FBQ2RDLHFCQUFLLFdBRFM7QUFFZEMscUJBQUssV0FGUztBQUdkQyxxQkFBSyxXQUhTO0FBSWRDLHFCQUFLLFdBSlM7QUFLZEMscUJBQUssV0FMUztBQU1kQyxxQkFBSyxZQU5TO0FBT2RDLHNCQUFNLFlBUFE7QUFRZEMscUJBQUssV0FSUztBQVNkQyxxQkFBSyxXQVRTO0FBVWRDLHFCQUFLLFdBVlM7QUFXZEMsd0JBQVEsV0FYTTtBQVlkQyxzQkFBTSxZQVpRO0FBYWRDLHFCQUFLLFdBYlM7QUFjZEMsc0JBQU0sK0JBZFE7QUFlZEMscUJBQUssK0JBZlM7QUFnQmRDLHFCQUFLO0FBaEJTLGFBQWxCOztBQW1CQSxnQkFBTUMsUUFBUSxZQUFVO0FBQ3BCLHVCQUFPQyxTQUFTdk0sYUFBVCxDQUF1QixPQUF2QixDQUFQO0FBQ0gsYUFGYSxFQUFkO0FBR0EsZ0JBQUksQ0FBQ3NNLE1BQU1FLFdBQVgsRUFBd0I7QUFDcEIsdUJBQU8sS0FBUDtBQUNIOztBQUVELGdCQUFNQyxPQUFPckIsT0FBT3FCLElBQXBCO0FBQ0EsZ0JBQU1DLE9BQU90QixPQUFPc0IsSUFBcEI7QUFDQSxnQkFBRyxDQUFDQSxJQUFKLEVBQVM7QUFBQyx1QkFBTyxLQUFQO0FBQWM7QUFDeEIsZ0JBQU1DLFdBQVd2QixPQUFPdUIsUUFBUCxJQUFtQnRCLFVBQVVxQixJQUFWLENBQXBDOztBQUVBLGdCQUFJLHVCQUFPRCxJQUFQLEVBQWFDLElBQWIsQ0FBSixFQUF3QjtBQUNwQix1QkFBTyxLQUFQO0FBQ0g7O0FBRUQsZ0JBQUcseUJBQVNELElBQVQsRUFBZUMsSUFBZixDQUFILEVBQXdCO0FBQ3BCLHVCQUFPLEtBQVA7QUFDSDs7QUFFRCxnQkFBSSxDQUFDQyxRQUFMLEVBQWU7QUFDWCx1QkFBTyxLQUFQO0FBQ0g7O0FBRUQsbUJBQU8sQ0FBQyxDQUFDTCxNQUFNRSxXQUFOLENBQWtCRyxRQUFsQixDQUFUO0FBQ0g7QUEvQ0wsS0FEZ0IsRUFrRGhCO0FBQ0l0TSxjQUFNLFFBRFY7QUFFSThLLHNCQUFjLHNCQUFVQyxNQUFWLEVBQWtCO0FBQzVCLGdCQUFNa0IsUUFBUSxZQUFVO0FBQ3BCLHVCQUFPQyxTQUFTdk0sYUFBVCxDQUF1QixPQUF2QixDQUFQO0FBQ0gsYUFGYSxFQUFkO0FBR0EsZ0JBQUksQ0FBQ3NNLE1BQU1FLFdBQVgsRUFBd0I7QUFDcEIsdUJBQU8sS0FBUDtBQUNIOztBQUVELGdCQUFNQyxPQUFPckIsT0FBT3FCLElBQXBCO0FBQ0EsZ0JBQU1DLE9BQU90QixPQUFPc0IsSUFBcEI7O0FBRUEsZ0JBQUcseUJBQVNELElBQVQsRUFBZUMsSUFBZixDQUFILEVBQXdCO0FBQ3BCLHVCQUFPLElBQVA7QUFDSCxhQUZELE1BRUs7QUFDRCx1QkFBTyxLQUFQO0FBQ0g7QUFDSjtBQWxCTCxLQWxEZ0IsRUFzRWhCO0FBQ0lyTSxjQUFNLE1BRFY7QUFFSThLLHNCQUFjLHNCQUFVQyxNQUFWLEVBQWtCO0FBQzVCLGdCQUFNcUIsT0FBT3JCLE9BQU9xQixJQUFwQjs7QUFFQTtBQUNBLGdCQUFNQyxPQUFPdEIsT0FBT3NCLElBQXBCO0FBQ0EsZ0JBQUksdUJBQU9ELElBQVAsRUFBYUMsSUFBYixDQUFKLEVBQXdCO0FBQ3BCLHVCQUFPLElBQVA7QUFDSCxhQUZELE1BRUs7QUFDRCx1QkFBTyxLQUFQO0FBQ0g7QUFDSjtBQVpMLEtBdEVnQixFQW9GaEI7QUFDSXJNLGNBQU0sS0FEVjtBQUVJOEssc0JBQWMsc0JBQVVDLE1BQVYsRUFBa0I7QUFDNUIsZ0JBQU1rQixRQUFRLFlBQVU7QUFDcEIsdUJBQU9DLFNBQVN2TSxhQUFULENBQXVCLE9BQXZCLENBQVA7QUFDSCxhQUZhLEVBQWQ7O0FBSUE7QUFDQSxnQkFBTTRNLGVBQWUsU0FBZkEsWUFBZSxHQUFLO0FBQ3JCLHlCQUFTQyxjQUFULEdBQTBCO0FBQ3ZCLHdCQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDL0IsK0JBQU9BLE9BQU9DLFdBQVAsSUFBc0JELE9BQU9FLGlCQUFwQztBQUNIO0FBQ0o7QUFDRCxvQkFBSUMsY0FBY0osZ0JBQWxCO0FBQ0Esb0JBQUlLLGVBQWVKLE9BQU9LLFlBQVAsSUFBdUJMLE9BQU9NLGtCQUFqRDtBQUNBLG9CQUFJQyxrQkFBa0JKLGVBQWUsT0FBT0EsWUFBWUksZUFBbkIsS0FBdUMsVUFBdEQsSUFBb0VKLFlBQVlJLGVBQVosQ0FBNEIsMkNBQTVCLENBQTFGOztBQUVBO0FBQ0E7QUFDQSxvQkFBSUMsdUJBQXVCLENBQUNKLFlBQUQsSUFBaUJBLGFBQWEvQyxTQUFiLElBQTBCLE9BQU8rQyxhQUFhL0MsU0FBYixDQUF1Qm9ELFlBQTlCLEtBQStDLFVBQXpFLElBQXVGLE9BQU9MLGFBQWEvQyxTQUFiLENBQXVCeEcsTUFBOUIsS0FBeUMsVUFBNUs7QUFDQSx1QkFBTyxDQUFDLENBQUMwSixlQUFGLElBQXFCLENBQUMsQ0FBQ0Msb0JBQTlCO0FBQ0gsYUFkRDtBQWVBO0FBQ0EsbUJBQU9WLGtCQUFrQixDQUFDLENBQUNOLE1BQU1FLFdBQU4sQ0FBa0IsK0JBQWxCLENBQTNCO0FBQ0g7QUF6QkwsS0FwRmdCLENBQXBCOztBQWlIQWpPLFNBQUtpUCx3QkFBTCxHQUFnQyxVQUFDQyxPQUFELEVBQWE7QUFDekNqUCwwQkFBa0JDLEdBQWxCLENBQXNCLDZDQUF0QixFQUFxRWdQLE9BQXJFO0FBQ0EsWUFBTXJDLFNBQVVxQyxZQUFZekksT0FBT3lJLE9BQVAsQ0FBYixHQUFnQ0EsT0FBaEMsR0FBMEMsRUFBekQ7QUFDQSxhQUFJLElBQUluTyxJQUFJLENBQVosRUFBZUEsSUFBSTRMLFlBQVkzTCxNQUEvQixFQUF1Q0QsR0FBdkMsRUFBNEM7QUFDeEMsZ0JBQUc0TCxZQUFZNUwsQ0FBWixFQUFlNkwsWUFBZixDQUE0QkMsTUFBNUIsQ0FBSCxFQUF1QztBQUNuQyx1QkFBT0YsWUFBWTVMLENBQVosRUFBZWUsSUFBdEI7QUFDSDtBQUNKO0FBQ0osS0FSRDtBQVNBOUIsU0FBS21QLDJCQUFMLEdBQW1DLFVBQUMxRixTQUFELEVBQWU7QUFDOUN4SiwwQkFBa0JDLEdBQWxCLENBQXNCLGdEQUF0QixFQUF3RXVKLFNBQXhFO0FBQ0EsWUFBSTJGLGVBQWUsRUFBbkI7QUFDQSxhQUFLLElBQUlyTyxJQUFJMEksVUFBVXpJLE1BQXZCLEVBQStCRCxHQUEvQixHQUFxQztBQUNqQyxnQkFBTXNPLE9BQU81RixVQUFVMUksQ0FBVixDQUFiO0FBQ0EsZ0JBQUk4TCxTQUFTLEVBQWI7QUFDQSxpQkFBSSxJQUFJaEMsSUFBSSxDQUFaLEVBQWVBLElBQUl3RSxLQUFLeE8sT0FBTCxDQUFhRyxNQUFoQyxFQUF3QzZKLEdBQXhDLEVBQTZDO0FBQ3pDZ0MseUJBQVN3QyxLQUFLeE8sT0FBTCxDQUFhZ0ssQ0FBYixDQUFUO0FBQ0Esb0JBQUlnQyxNQUFKLEVBQVk7QUFDUix3QkFBTXlDLFlBQVl0UCxLQUFLaVAsd0JBQUwsQ0FBOEJwQyxNQUE5QixDQUFsQjtBQUNBLHdCQUFJeUMsU0FBSixFQUFlO0FBQ1hGLHFDQUFhL0csSUFBYixDQUFrQmlILFNBQWxCO0FBQ0g7QUFDSjtBQUNKO0FBR0o7O0FBRUQsZUFBT0YsWUFBUDtBQUNILEtBcEJEO0FBcUJBLFdBQU9wUCxJQUFQO0FBQ0gsQ0FuSkQ7O2tCQXFKZTBNLGM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUpmO0FBQ08sSUFBTTZDLDRDQUFrQixXQUF4QjtBQUNBLElBQU1DLGtDQUFhLE1BQW5CO0FBQ0EsSUFBTUMsMENBQWlCLFVBQXZCO0FBQ0EsSUFBTUMsc0NBQWUsUUFBckI7QUFDQSxJQUFNQyx3Q0FBZ0IsU0FBdEI7QUFDQSxJQUFNQyxvQ0FBYyxPQUFwQjtBQUNBLElBQU1DLHdDQUFnQixTQUF0QjtBQUNBLElBQU1DLHdDQUFnQixTQUF0Qjs7QUFFUDtBQUNPLElBQU1DLDBDQUFpQixPQUF2QjtBQUNBLElBQU1DLDRDQUFrQixRQUF4QjtBQUNBLElBQU1DLHdDQUFnQixNQUF0QjtBQUNBLElBQU1DLHNDQUFlLEtBQXJCOztBQUVQO0FBQ08sSUFBTUMsOENBQW1CVixjQUF6QjtBQUNBLElBQU01TSx3QkFBUSxPQUFkO0FBQ0EsSUFBTXdDLDRCQUFVLFNBQWhCO0FBQ0EsSUFBTStLLHNDQUFlLE1BQXJCO0FBQ0EsSUFBTUMsb0RBQXNCLFlBQTVCO0FBQ0EsSUFBTUMsd0NBQWdCLGNBQXRCO0FBQ0EsSUFBTUMsMENBQWlCLFFBQXZCO0FBQ0EsSUFBTUMsMENBQWlCLFFBQXZCO0FBQ0EsSUFBTW5PLGdEQUFvQixpQkFBMUI7QUFDQSxJQUFNSix3QkFBUSxPQUFkOztBQUVQO0FBQ08sSUFBTXdPLHNDQUFlLGNBQXJCO0FBQ0EsSUFBTUMsNENBQWtCakIsY0FBeEI7QUFDQSxJQUFNa0Isc0NBQWUsT0FBckI7QUFDQSxJQUFNQyxvQ0FBYyxNQUFwQjs7QUFFQSxJQUFNQywwQ0FBaUIsZUFBdkI7QUFDQSxJQUFNQyxzQ0FBZSxNQUFyQjtBQUNBLElBQU1DLG9EQUFzQixZQUE1QjtBQUNBLElBQU1DLDBDQUFpQixlQUF2QjtBQUNBLElBQU1DLHNDQUFlLE1BQXJCO0FBQ0EsSUFBTUMsc0NBQWUsYUFBckI7QUFDQSxJQUFNQywwQ0FBaUIscUJBQXZCO0FBQ0EsSUFBTUMsd0RBQXdCLDRCQUE5QjtBQUNBLElBQU1DLHdEQUF3QixxQkFBOUI7QUFDQSxJQUFNQyxvRUFBOEIsWUFBcEM7QUFDQSxJQUFNQyw0REFBMEIsZ0JBQWhDOztBQUdBLElBQU10TyxrQ0FBYSxHQUFuQjtBQUNBLElBQU11TyxzREFBdUIsR0FBN0I7QUFDQSxJQUFNQywwRUFBaUMsR0FBdkM7QUFDQSxJQUFNQyxzRUFBK0IsR0FBckM7QUFDQSxJQUFNQyxvRUFBOEIsR0FBcEM7QUFDQSxJQUFNeFAsZ0RBQW9CLEdBQTFCO0FBQ0EsSUFBTXlQLHNEQUF1QixHQUE3QjtBQUNBLElBQU1DLDBEQUF5QixHQUEvQjtBQUNBLElBQU1DLDREQUEwQixHQUFoQztBQUNBLElBQU1DLHNGQUF1QyxHQUE3QztBQUNBLElBQU1DLG9GQUFzQyxHQUE1QztBQUNBLElBQU1DLGdGQUFvQyxHQUExQztBQUNBLElBQU1DLGtGQUFxQyxHQUEzQztBQUNBLElBQU1DLGtFQUE2QixHQUFuQyxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVEUDs7Ozs7O0FBTUEsSUFBTUMsVUFBVSxTQUFWQSxPQUFVLENBQVN0UyxTQUFULEVBQW1CO0FBQy9CLFFBQU1FLE9BQU8sRUFBYjtBQUNBLFFBQUlxUyxlQUFlLEVBQW5CO0FBQ0FwUyxzQkFBa0JDLEdBQWxCLENBQXNCLHNCQUF0QjtBQUNBLFFBQU1vUyxxQkFBcUIsU0FBckJBLGtCQUFxQixHQUFVOztBQUVqQ0QsdUJBQWVyRSxTQUFTdk0sYUFBVCxDQUF1QixPQUF2QixDQUFmO0FBQ0E0USxxQkFBYUUsWUFBYixDQUEwQix1QkFBMUIsRUFBbUQsRUFBbkQ7QUFDQUYscUJBQWFFLFlBQWIsQ0FBMEIsb0JBQTFCLEVBQWdELEVBQWhEO0FBQ0FGLHFCQUFhRSxZQUFiLENBQTBCLGFBQTFCLEVBQXlDLEVBQXpDO0FBQ0F6UyxrQkFBVTBTLFdBQVYsQ0FBc0JILFlBQXRCOztBQUVBLGVBQU9BLFlBQVA7QUFDSCxLQVREOztBQVdBclMsU0FBS3lCLGFBQUwsR0FBcUIsWUFBSztBQUN0QnhCLDBCQUFrQkMsR0FBbEIsQ0FBc0IsOEJBQXRCO0FBQ0EsWUFBRyxDQUFDbVMsWUFBSixFQUFpQjtBQUNiLG1CQUFPQyxvQkFBUDtBQUNILFNBRkQsTUFFSztBQUNEeFMsc0JBQVUyUyxXQUFWLENBQXNCSixZQUF0QjtBQUNBLG1CQUFPQyxvQkFBUDtBQUNIO0FBQ0osS0FSRDs7QUFVQSxXQUFPdFMsSUFBUDtBQUNILENBMUJEOztrQkE0QmVvUyxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDZjs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQTs7Ozs7QUFLQSxJQUFNQSxVQUFVLFNBQVZBLE9BQVUsR0FBVTtBQUN0QixRQUFNcFMsT0FBTyxFQUFiO0FBQ0EsUUFBSTBTLGtCQUFrQixFQUF0QjtBQUNBLFFBQUlDLGlCQUFpQiwrQkFBckI7O0FBRUExUyxzQkFBa0JDLEdBQWxCLENBQXNCLHlCQUF0Qjs7QUFFQSxRQUFNMFMsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBU0MsT0FBVCxFQUFpQjtBQUN0QyxZQUFJLENBQUNBLE9BQUQsSUFBWSxDQUFDQSxRQUFRM0UsSUFBVCxJQUFpQixFQUFFMkUsUUFBUUMsSUFBUixJQUFnQkQsUUFBUUUsV0FBeEIsSUFBdUNGLFFBQVFHLE1BQWpELENBQWpDLEVBQTJGO0FBQ3ZGO0FBQ0g7O0FBRUQsWUFBSW5HLFNBQVMsU0FBYyxFQUFkLEVBQWtCLEVBQUUsV0FBVyxLQUFiLEVBQWxCLEVBQXdDZ0csT0FBeEMsQ0FBYjtBQUNBaEcsZUFBT3FCLElBQVAsR0FBYyxtQkFBSyxLQUFLckIsT0FBT3FCLElBQWpCLENBQWQ7O0FBRUEsWUFBR3JCLE9BQU9pRyxJQUFQLElBQWVqRyxPQUFPa0csV0FBdEIsSUFBcUNsRyxPQUFPbUcsTUFBL0MsRUFBc0Q7QUFDbERuRyxtQkFBT3FCLElBQVAsR0FBY3JCLE9BQU9pRyxJQUFQLEdBQWMsR0FBZCxHQUFvQmpHLE9BQU9rRyxXQUEzQixHQUF5QyxVQUF6QyxHQUFzRGxHLE9BQU9tRyxNQUEzRTtBQUNBLG1CQUFPbkcsT0FBT2lHLElBQWQ7QUFDQSxtQkFBT2pHLE9BQU9rRyxXQUFkO0FBQ0EsbUJBQU9sRyxPQUFPbUcsTUFBZDtBQUNIOztBQUVELFlBQU1DLGdCQUFnQix5QkFBdEI7O0FBRUEsWUFBSUEsY0FBYzlMLElBQWQsQ0FBbUIwRixPQUFPc0IsSUFBMUIsQ0FBSixFQUFxQztBQUNqQztBQUNBdEIsbUJBQU91QixRQUFQLEdBQWtCdkIsT0FBT3NCLElBQXpCO0FBQ0F0QixtQkFBT3NCLElBQVAsR0FBY3RCLE9BQU9zQixJQUFQLENBQVkrRSxPQUFaLENBQW9CRCxhQUFwQixFQUFtQyxJQUFuQyxDQUFkO0FBQ0g7O0FBRUQsWUFBRyx1QkFBT3BHLE9BQU9xQixJQUFkLENBQUgsRUFBdUI7QUFDbkJyQixtQkFBT3NCLElBQVAsR0FBYyxNQUFkO0FBQ0gsU0FGRCxNQUVNLElBQUcseUJBQVN0QixPQUFPcUIsSUFBaEIsQ0FBSCxFQUF5QjtBQUMzQnJCLG1CQUFPc0IsSUFBUCxHQUFjLFFBQWQ7QUFDSCxTQUZLLE1BRUEsSUFBRyx1QkFBT3RCLE9BQU9xQixJQUFkLEVBQW9CckIsT0FBT3NCLElBQTNCLENBQUgsRUFBb0M7QUFDdEN0QixtQkFBT3NCLElBQVAsR0FBYyxNQUFkO0FBQ0gsU0FGSyxNQUVBLElBQUksQ0FBQ3RCLE9BQU9zQixJQUFaLEVBQWtCO0FBQ3BCdEIsbUJBQU9zQixJQUFQLEdBQWMsK0JBQWlCdEIsT0FBT3FCLElBQXhCLENBQWQ7QUFDSDs7QUFFRCxZQUFJLENBQUNyQixPQUFPc0IsSUFBWixFQUFrQjtBQUNkO0FBQ0g7O0FBRUQ7QUFDQSxnQkFBUXRCLE9BQU9zQixJQUFmO0FBQ0ksaUJBQUssTUFBTDtBQUNBLGlCQUFLLG1CQUFMO0FBQ0l0Qix1QkFBT3NCLElBQVAsR0FBYyxLQUFkO0FBQ0E7QUFDSixpQkFBSyxLQUFMO0FBQ0l0Qix1QkFBT3NCLElBQVAsR0FBYyxLQUFkO0FBQ0E7QUFDSixpQkFBSyxNQUFMO0FBQ0l0Qix1QkFBT3NCLElBQVAsR0FBYyxNQUFkO0FBQ0E7QUFDSjtBQUNJO0FBWlI7QUFjQTFILGVBQU9DLElBQVAsQ0FBWW1HLE1BQVosRUFBb0JsRyxPQUFwQixDQUE0QixVQUFTQyxHQUFULEVBQWM7QUFDdEMsZ0JBQUlpRyxPQUFPakcsR0FBUCxNQUFnQixFQUFwQixFQUF3QjtBQUNwQix1QkFBT2lHLE9BQU9qRyxHQUFQLENBQVA7QUFDSDtBQUNKLFNBSkQ7O0FBTUEsZUFBT2lHLE1BQVA7QUFFSCxLQTVERDs7QUE4REE3TSxTQUFLeUQsV0FBTCxHQUFrQixVQUFDVyxRQUFELEVBQWE7QUFDM0JuRSwwQkFBa0JDLEdBQWxCLENBQXNCLGdDQUF0QixFQUF3RGtFLFFBQXhEO0FBQ0EsWUFBTStPLG1CQUFtQixDQUFDcEwscUJBQUVGLE9BQUYsQ0FBVXpELFFBQVYsSUFBc0JBLFFBQXRCLEdBQWlDLENBQUNBLFFBQUQsQ0FBbEMsRUFBOEM4RCxHQUE5QyxDQUFrRCxVQUFTbUgsSUFBVCxFQUFjO0FBQ3JGLGdCQUFHLENBQUN0SCxxQkFBRUYsT0FBRixDQUFVd0gsS0FBSytELE1BQWYsQ0FBSixFQUE0QjtBQUN4Qix1QkFBTy9ELEtBQUsrRCxNQUFaO0FBQ0g7QUFDRCxnQkFBSUMsZUFBZSxTQUFjLEVBQWQsRUFBaUI7QUFDaEN4Uyx5QkFBUyxFQUR1QjtBQUVoQ3VTLHdCQUFRO0FBRndCLGFBQWpCLEVBR2hCL0QsSUFIZ0IsQ0FBbkI7O0FBS0EsZ0JBQUlnRSxhQUFheFMsT0FBYixLQUF5QjRGLE9BQU80TSxhQUFheFMsT0FBcEIsQ0FBMUIsSUFBMkQsQ0FBQ2tILHFCQUFFRixPQUFGLENBQVV3TCxhQUFheFMsT0FBdkIsQ0FBL0QsRUFBZ0c7QUFDNUZ3Uyw2QkFBYXhTLE9BQWIsR0FBdUIsQ0FBQytSLGlCQUFpQlMsYUFBYXhTLE9BQTlCLENBQUQsQ0FBdkI7QUFDSDs7QUFFRCxnQkFBRyxDQUFDa0gscUJBQUVGLE9BQUYsQ0FBVXdMLGFBQWF4UyxPQUF2QixDQUFELElBQW9Dd1MsYUFBYXhTLE9BQWIsQ0FBcUJHLE1BQXJCLEtBQWdDLENBQXZFLEVBQTBFO0FBQ3RFLG9CQUFJcU8sS0FBS2lFLE1BQVQsRUFBaUI7QUFDYkQsaUNBQWF4UyxPQUFiLEdBQXVCd08sS0FBS2lFLE1BQTVCO0FBQ0gsaUJBRkQsTUFFTztBQUNIRCxpQ0FBYXhTLE9BQWIsR0FBdUIsQ0FBQytSLGlCQUFpQnZELElBQWpCLENBQUQsQ0FBdkI7QUFDSDtBQUNKOztBQUdELGlCQUFJLElBQUl0TyxJQUFJLENBQVosRUFBZUEsSUFBSXNTLGFBQWF4UyxPQUFiLENBQXFCRyxNQUF4QyxFQUFnREQsR0FBaEQsRUFBcUQ7QUFDakQsb0JBQUk4TCxTQUFTd0csYUFBYXhTLE9BQWIsQ0FBcUJFLENBQXJCLENBQWI7QUFDQSxvQkFBSXdTLGVBQWUsRUFBbkI7QUFDQSxvQkFBSSxDQUFDMUcsTUFBTCxFQUFhO0FBQ1Q7QUFDSDs7QUFFRCxvQkFBSTJHLGdCQUFnQjNHLE9BQU81TCxPQUEzQjtBQUNBLG9CQUFJdVMsYUFBSixFQUFtQjtBQUNmM0csMkJBQU81TCxPQUFQLEdBQWtCdVMsY0FBY3ZNLFFBQWQsT0FBNkIsTUFBL0M7QUFDSCxpQkFGRCxNQUVPO0FBQ0g0RiwyQkFBTzVMLE9BQVAsR0FBaUIsS0FBakI7QUFDSDs7QUFFRDtBQUNBLG9CQUFJLENBQUNvUyxhQUFheFMsT0FBYixDQUFxQkUsQ0FBckIsRUFBd0JJLEtBQTdCLEVBQW9DO0FBQ2hDa1MsaUNBQWF4UyxPQUFiLENBQXFCRSxDQUFyQixFQUF3QkksS0FBeEIsR0FBZ0NrUyxhQUFheFMsT0FBYixDQUFxQkUsQ0FBckIsRUFBd0JvTixJQUF4QixHQUE2QixHQUE3QixHQUFpQ3BOLEVBQUVrRyxRQUFGLEVBQWpFO0FBQ0g7O0FBRURzTSwrQkFBZVgsaUJBQWlCUyxhQUFheFMsT0FBYixDQUFxQkUsQ0FBckIsQ0FBakIsQ0FBZjtBQUNBLG9CQUFHNFIsZUFBZTFELHdCQUFmLENBQXdDc0UsWUFBeEMsQ0FBSCxFQUF5RDtBQUNyREYsaUNBQWF4UyxPQUFiLENBQXFCRSxDQUFyQixJQUEwQndTLFlBQTFCO0FBQ0gsaUJBRkQsTUFFSztBQUNERixpQ0FBYXhTLE9BQWIsQ0FBcUJFLENBQXJCLElBQTBCLElBQTFCO0FBQ0g7QUFDSjs7QUFFRHNTLHlCQUFheFMsT0FBYixHQUF1QndTLGFBQWF4UyxPQUFiLENBQXFCaUgsTUFBckIsQ0FBNEI7QUFBQSx1QkFBVSxDQUFDLENBQUMrRSxNQUFaO0FBQUEsYUFBNUIsQ0FBdkI7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FBV0EsZ0JBQUcsQ0FBQzlFLHFCQUFFRixPQUFGLENBQVV3TCxhQUFhRCxNQUF2QixDQUFKLEVBQW1DO0FBQy9CQyw2QkFBYUQsTUFBYixHQUFzQixFQUF0QjtBQUNIO0FBQ0QsZ0JBQUdyTCxxQkFBRUYsT0FBRixDQUFVd0wsYUFBYUksUUFBdkIsQ0FBSCxFQUFvQztBQUNoQ0osNkJBQWFELE1BQWIsR0FBc0JDLGFBQWFELE1BQWIsQ0FBb0JNLE1BQXBCLENBQTJCTCxhQUFhSSxRQUF4QyxDQUF0QjtBQUNBLHVCQUFPSixhQUFhSSxRQUFwQjtBQUNIOztBQUVESix5QkFBYUQsTUFBYixHQUFzQkMsYUFBYUQsTUFBYixDQUFvQmxMLEdBQXBCLENBQXdCLFVBQVN5TCxLQUFULEVBQWU7QUFDekQsb0JBQUcsQ0FBQ0EsS0FBRCxJQUFVLENBQUNBLE1BQU16RixJQUFwQixFQUF5QjtBQUNyQiwyQkFBTyxLQUFQO0FBQ0g7QUFDRCx1QkFBTyxTQUFjLEVBQWQsRUFBa0I7QUFDckIsNEJBQVEsVUFEYTtBQUVyQiwrQkFBVztBQUZVLGlCQUFsQixFQUdKeUYsS0FISSxDQUFQO0FBSUgsYUFScUIsRUFRbkI3TCxNQVJtQixDQVFaO0FBQUEsdUJBQVMsQ0FBQyxDQUFDNkwsS0FBWDtBQUFBLGFBUlksQ0FBdEI7O0FBVUEsbUJBQU9OLFlBQVA7QUFDSCxTQWxGd0IsQ0FBekI7QUFtRkFYLDBCQUFrQlMsZ0JBQWxCO0FBQ0EsZUFBT0EsZ0JBQVA7QUFDSCxLQXZGRDtBQXdGQW5ULFNBQUtxQixXQUFMLEdBQW1CLFlBQU07QUFDckJwQiwwQkFBa0JDLEdBQWxCLENBQXNCLGdDQUF0QixFQUF3RHdTLGVBQXhEO0FBQ0EsZUFBT0EsZUFBUDtBQUNILEtBSEQ7QUFJQTFTLFNBQUsyQixpQkFBTCxHQUF5QixZQUFNO0FBQzNCO0FBQ0ExQiwwQkFBa0JDLEdBQWxCLENBQXNCLHNDQUF0QixFQUE4RHdTLGdCQUFnQixDQUFoQixFQUFtQjdSLE9BQWpGO0FBQ0EsZUFBTzZSLGdCQUFnQixDQUFoQixFQUFtQjdSLE9BQTFCO0FBQ0gsS0FKRDs7QUFNQSxXQUFPYixJQUFQO0FBQ0gsQ0F4S0Q7O2tCQTJLZW9TLE87Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JMZjs7OztBQUNBOzs7Ozs7QUFFQTs7OztBQUlBLElBQU13QixhQUFhLFNBQWJBLFVBQWEsR0FBVTtBQUN6QixRQUFJQyxpQkFBaUIsK0JBQXJCO0FBQ0EsUUFBTWpTLFlBQVksRUFBbEI7O0FBRUEsUUFBTTVCLE9BQU8sRUFBYjtBQUNBQyxzQkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0Qjs7QUFFQSxRQUFNNFQsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDaFMsSUFBRCxFQUFPaVMsUUFBUCxFQUFtQjtBQUN2QyxZQUFHblMsVUFBVUUsSUFBVixDQUFILEVBQW1CO0FBQ2Y7QUFDSDtBQUNEN0IsMEJBQWtCQyxHQUFsQixDQUFzQix5Q0FBdEIsRUFBaUU0QixJQUFqRTtBQUNBRixrQkFBVUUsSUFBVixJQUFrQmlTLFFBQWxCO0FBQ0gsS0FORDs7QUFRQSxRQUFNQyxpQkFBZ0I7QUFDbEJDLGVBQU8saUJBQVc7QUFDZCxtQkFBTyw4T0FBNkMsVUFBU0MsT0FBVCxFQUFrQjtBQUM5RCxvQkFBTUgsV0FBVyxtQkFBQUcsQ0FBUSxzRUFBUixFQUFvQ2pULE9BQXJEO0FBQ0E2UyxnQ0FBZ0IsT0FBaEIsRUFBeUJDLFFBQXpCO0FBQ0EsdUJBQU9BLFFBQVA7QUFDSCxhQUpFLHlDQUlBLFVBQVNJLEdBQVQsRUFBYTtBQUNaLHNCQUFNLElBQUlDLEtBQUosQ0FBVSxlQUFWLENBQU47QUFDSCxhQU5FLENBQVA7QUFRSCxTQVZpQjtBQVdsQkMsZ0JBQVMsa0JBQVU7QUFDZixtQkFBTywwUEFBK0MsVUFBU0gsT0FBVCxFQUFrQjtBQUNoRSxvQkFBTUgsV0FBVyxtQkFBQUcsQ0FBUSwwRUFBUixFQUFzQ2pULE9BQXZEO0FBQ0E2UyxnQ0FBZ0IsUUFBaEIsRUFBMEJDLFFBQTFCO0FBQ0EsdUJBQU9BLFFBQVA7QUFDSCxhQUpFLHlDQUlBLFVBQVNJLEdBQVQsRUFBYTtBQUNaLHNCQUFNLElBQUlDLEtBQUosQ0FBVSxlQUFWLENBQU47QUFDSCxhQU5FLENBQVA7QUFRSCxTQXBCaUI7QUFxQmxCRSxjQUFPLGdCQUFVO0FBQ2IsbUJBQU8sNFBBQTJDLFVBQVNKLE9BQVQsRUFBa0I7QUFDNUQsb0JBQU1ILFdBQVcsbUJBQUFHLENBQVEsa0VBQVIsRUFBa0NqVCxPQUFuRDtBQUNBVywwQkFBVSxNQUFWLElBQW9CbVMsUUFBcEI7QUFDQUQsZ0NBQWdCLE1BQWhCLEVBQXdCQyxRQUF4QjtBQUNBLHVCQUFPQSxRQUFQO0FBQ0gsYUFMRSx5Q0FLQSxVQUFTSSxHQUFULEVBQWE7QUFDWixzQkFBTSxJQUFJQyxLQUFKLENBQVUsZUFBVixDQUFOO0FBQ0gsYUFQRSxDQUFQO0FBU0gsU0EvQmlCO0FBZ0NsQnRHLGFBQU0sZUFBVTtBQUNaLG1CQUFPLDBQQUF5QyxVQUFTb0csT0FBVCxFQUFrQjtBQUMxRCxvQkFBTUgsV0FBVyxtQkFBQUcsQ0FBUSw4REFBUixFQUFnQ2pULE9BQWpEO0FBQ0E2UyxnQ0FBZ0IsS0FBaEIsRUFBdUJDLFFBQXZCO0FBQ0EsdUJBQU9BLFFBQVA7QUFDSCxhQUpFLHlDQUlBLFVBQVNJLEdBQVQsRUFBYTtBQUNaLHNCQUFNLElBQUlDLEtBQUosQ0FBVSxlQUFWLENBQU47QUFDSCxhQU5FLENBQVA7QUFRSDtBQXpDaUIsS0FBdEI7QUEyQ0FwVSxTQUFLb0IsYUFBTCxHQUFxQixVQUFDZ0QsUUFBRCxFQUFhO0FBQzlCLFlBQU1tUSx5QkFBeUJWLGVBQWUxRSwyQkFBZixDQUEyQy9LLFFBQTNDLENBQS9CO0FBQ0FuRSwwQkFBa0JDLEdBQWxCLENBQXNCLHFDQUF0QixFQUE2RHFVLHNCQUE3RDtBQUNBLGVBQU9DLGtCQUFRL0osR0FBUixDQUNIOEosdUJBQXVCek0sTUFBdkIsQ0FBOEIsVUFBUzJNLFlBQVQsRUFBc0I7QUFDaEQsbUJBQU8sQ0FBQyxDQUFDVCxlQUFlUyxZQUFmLENBQVQ7QUFDSCxTQUZELEVBRUd2TSxHQUZILENBRU8sVUFBU3VNLFlBQVQsRUFBc0I7QUFDekIsZ0JBQU1WLFdBQVdDLGVBQWVTLFlBQWYsR0FBakI7QUFDQSxtQkFBT1YsUUFBUDtBQUNILFNBTEQsQ0FERyxDQUFQO0FBUUgsS0FYRDs7QUFhQS9ULFNBQUswVSxVQUFMLEdBQWtCLFVBQUM1UyxJQUFELEVBQVU7QUFDeEI3QiwwQkFBa0JDLEdBQWxCLENBQXNCLGtDQUF0QixFQUEwRDRCLElBQTFEO0FBQ0EsZUFBT0YsVUFBVUUsSUFBVixDQUFQO0FBQ0gsS0FIRDs7QUFLQTlCLFNBQUsyVSxtQkFBTCxHQUEyQixVQUFDOUgsTUFBRCxFQUFZO0FBQ25DLFlBQU0rSCx3QkFBd0JmLGVBQWU1RSx3QkFBZixDQUF3Q3BDLE1BQXhDLENBQTlCO0FBQ0E1TSwwQkFBa0JDLEdBQWxCLENBQXNCLDJDQUF0QixFQUFtRTBVLHFCQUFuRTtBQUNBLGVBQU81VSxLQUFLMFUsVUFBTCxDQUFnQkUscUJBQWhCLENBQVA7QUFDSCxLQUpEOztBQU1BNVUsU0FBSytFLGNBQUwsR0FBc0IsVUFBQ0YsYUFBRCxFQUFnQkMsU0FBaEIsRUFBOEI7QUFDaEQ3RSwwQkFBa0JDLEdBQWxCLENBQXNCLHNDQUF0QixFQUE4RDJULGVBQWU1RSx3QkFBZixDQUF3Q3BLLGFBQXhDLENBQTlELEVBQXVIZ1AsZUFBZTVFLHdCQUFmLENBQXdDbkssU0FBeEMsQ0FBdkg7QUFDQSxlQUFPK08sZUFBZTVFLHdCQUFmLENBQXdDcEssYUFBeEMsS0FBMERnUCxlQUFlNUUsd0JBQWYsQ0FBd0NuSyxTQUF4QyxDQUFqRTtBQUVILEtBSkQ7O0FBTUEsV0FBTzlFLElBQVA7QUFDSCxDQXpGRDs7a0JBMkZlNFQsVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsR2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNaUIsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFTQyxRQUFULEVBQW1CO0FBQ3RDLFFBQUlDLGNBQWMsS0FBS0EsV0FBdkI7QUFDQSxXQUFPLEtBQUt6VCxJQUFMLENBQ0gsVUFBUzBULEtBQVQsRUFBZ0I7QUFDWixlQUFPRCxZQUFZRSxPQUFaLENBQW9CSCxVQUFwQixFQUFnQ3hULElBQWhDLENBQXFDLFlBQVc7QUFDbkQsbUJBQU8wVCxLQUFQO0FBQ0gsU0FGTSxDQUFQO0FBR0gsS0FMRSxFQU1ILFVBQVM5UixNQUFULEVBQWlCO0FBQ2IsZUFBTzZSLFlBQVlFLE9BQVosQ0FBb0JILFVBQXBCLEVBQWdDeFQsSUFBaEMsQ0FBcUMsWUFBVztBQUNuRCxtQkFBT3lULFlBQVlHLE1BQVosQ0FBbUJoUyxNQUFuQixDQUFQO0FBQ0gsU0FGTSxDQUFQO0FBR0gsS0FWRSxDQUFQO0FBWUgsQ0FkRDs7QUFnQkE7QUFDQTtBQUNBLElBQU1pUyxpQkFBaUI1RyxPQUFPNkcsVUFBOUI7QUFDQSxJQUFNQyxtQkFBbUI5RyxPQUFPK0csWUFBaEM7O0FBRUEsU0FBU0MsSUFBVCxHQUFnQixDQUFFOztBQUVsQjtBQUNBLFNBQVNDLElBQVQsQ0FBY0MsRUFBZCxFQUFrQkMsT0FBbEIsRUFBMkI7QUFDdkIsV0FBTyxZQUFXO0FBQ2RELFdBQUdwTCxLQUFILENBQVNxTCxPQUFULEVBQWtCbkwsU0FBbEI7QUFDSCxLQUZEO0FBR0g7O0FBRUQsSUFBTW9MLGNBQWMsU0FBZEEsV0FBYyxDQUFVRixFQUFWLEVBQWM7QUFDOUIsUUFBSSxFQUFFLGdCQUFnQmpCLE9BQWxCLENBQUosRUFDSSxNQUFNLElBQUlvQixTQUFKLENBQWMsc0NBQWQsQ0FBTjtBQUNKLFFBQUksT0FBT0gsRUFBUCxLQUFjLFVBQWxCLEVBQThCLE1BQU0sSUFBSUcsU0FBSixDQUFjLGdCQUFkLENBQU47QUFDOUIsU0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjN1AsU0FBZDtBQUNBLFNBQUs4UCxVQUFMLEdBQWtCLEVBQWxCOztBQUVBQyxjQUFVUixFQUFWLEVBQWMsSUFBZDtBQUNILENBVkQ7O0FBWUEsSUFBTVMsU0FBUyxTQUFUQSxNQUFTLENBQVVDLElBQVYsRUFBZ0JDLFFBQWhCLEVBQTBCO0FBQ3JDLFdBQU9ELEtBQUtOLE1BQUwsS0FBZ0IsQ0FBdkIsRUFBMEI7QUFDdEJNLGVBQU9BLEtBQUtKLE1BQVo7QUFDSDtBQUNELFFBQUlJLEtBQUtOLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkJNLGFBQUtILFVBQUwsQ0FBZ0IzTixJQUFoQixDQUFxQitOLFFBQXJCO0FBQ0E7QUFDSDtBQUNERCxTQUFLTCxRQUFMLEdBQWdCLElBQWhCO0FBQ0F0QixZQUFRNkIsWUFBUixDQUFxQixZQUFXO0FBQzVCLFlBQUlDLEtBQUtILEtBQUtOLE1BQUwsS0FBZ0IsQ0FBaEIsR0FBb0JPLFNBQVNHLFdBQTdCLEdBQTJDSCxTQUFTSSxVQUE3RDtBQUNBLFlBQUlGLE9BQU8sSUFBWCxFQUFpQjtBQUNiLGFBQUNILEtBQUtOLE1BQUwsS0FBZ0IsQ0FBaEIsR0FBb0JaLE9BQXBCLEdBQThCQyxNQUEvQixFQUF1Q2tCLFNBQVNLLE9BQWhELEVBQXlETixLQUFLSixNQUE5RDtBQUNBO0FBQ0g7QUFDRCxZQUFJVyxHQUFKO0FBQ0EsWUFBSTtBQUNBQSxrQkFBTUosR0FBR0gsS0FBS0osTUFBUixDQUFOO0FBQ0gsU0FGRCxDQUVFLE9BQU9ZLENBQVAsRUFBVTtBQUNSekIsbUJBQU9rQixTQUFTSyxPQUFoQixFQUF5QkUsQ0FBekI7QUFDQTtBQUNIO0FBQ0QxQixnQkFBUW1CLFNBQVNLLE9BQWpCLEVBQTBCQyxHQUExQjtBQUNILEtBZEQ7QUFlSCxDQXhCRDs7QUEwQkEsSUFBTXpCLFVBQVUsU0FBVkEsT0FBVSxDQUFVa0IsSUFBVixFQUFnQlMsUUFBaEIsRUFBMEI7QUFDdEMsUUFBSTtBQUNBO0FBQ0EsWUFBSUEsYUFBYVQsSUFBakIsRUFDSSxNQUFNLElBQUlQLFNBQUosQ0FBYywyQ0FBZCxDQUFOO0FBQ0osWUFDSWdCLGFBQ0MsUUFBT0EsUUFBUCx5Q0FBT0EsUUFBUCxPQUFvQixRQUFwQixJQUFnQyxPQUFPQSxRQUFQLEtBQW9CLFVBRHJELENBREosRUFHRTtBQUNFLGdCQUFJdFYsT0FBT3NWLFNBQVN0VixJQUFwQjtBQUNBLGdCQUFJc1Ysb0JBQW9CcEMsT0FBeEIsRUFBaUM7QUFDN0IyQixxQkFBS04sTUFBTCxHQUFjLENBQWQ7QUFDQU0scUJBQUtKLE1BQUwsR0FBY2EsUUFBZDtBQUNBQyx1QkFBT1YsSUFBUDtBQUNBO0FBQ0gsYUFMRCxNQUtPLElBQUksT0FBTzdVLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDbkMyVSwwQkFBVVQsS0FBS2xVLElBQUwsRUFBV3NWLFFBQVgsQ0FBVixFQUFnQ1QsSUFBaEM7QUFDQTtBQUNIO0FBQ0o7QUFDREEsYUFBS04sTUFBTCxHQUFjLENBQWQ7QUFDQU0sYUFBS0osTUFBTCxHQUFjYSxRQUFkO0FBQ0FDLGVBQU9WLElBQVA7QUFDSCxLQXRCRCxDQXNCRSxPQUFPUSxDQUFQLEVBQVU7QUFDUnpCLGVBQU9pQixJQUFQLEVBQWFRLENBQWI7QUFDSDtBQUNKLENBMUJEOztBQTRCQSxJQUFNekIsU0FBUSxTQUFSQSxNQUFRLENBQVVpQixJQUFWLEVBQWdCUyxRQUFoQixFQUEwQjtBQUNwQ1QsU0FBS04sTUFBTCxHQUFjLENBQWQ7QUFDQU0sU0FBS0osTUFBTCxHQUFjYSxRQUFkO0FBQ0FDLFdBQU9WLElBQVA7QUFDSCxDQUpEOztBQU1BLElBQU1VLFNBQVMsU0FBVEEsTUFBUyxDQUFVVixJQUFWLEVBQWdCO0FBQzNCLFFBQUlBLEtBQUtOLE1BQUwsS0FBZ0IsQ0FBaEIsSUFBcUJNLEtBQUtILFVBQUwsQ0FBZ0JoVixNQUFoQixLQUEyQixDQUFwRCxFQUF1RDtBQUNuRHdULGdCQUFRNkIsWUFBUixDQUFxQixZQUFXO0FBQzVCLGdCQUFJLENBQUNGLEtBQUtMLFFBQVYsRUFBb0I7QUFDaEJ0Qix3QkFBUXNDLHFCQUFSLENBQThCWCxLQUFLSixNQUFuQztBQUNIO0FBQ0osU0FKRDtBQUtIOztBQUVELFNBQUssSUFBSWhWLElBQUksQ0FBUixFQUFXZ1csTUFBTVosS0FBS0gsVUFBTCxDQUFnQmhWLE1BQXRDLEVBQThDRCxJQUFJZ1csR0FBbEQsRUFBdURoVyxHQUF2RCxFQUE0RDtBQUN4RG1WLGVBQU9DLElBQVAsRUFBYUEsS0FBS0gsVUFBTCxDQUFnQmpWLENBQWhCLENBQWI7QUFDSDtBQUNEb1YsU0FBS0gsVUFBTCxHQUFrQixJQUFsQjtBQUNILENBYkQ7O0FBZUEsSUFBTWdCLFVBQVUsU0FBVkEsT0FBVSxDQUFVVCxXQUFWLEVBQXVCQyxVQUF2QixFQUFtQ0MsT0FBbkMsRUFBNEM7QUFDeEQsU0FBS0YsV0FBTCxHQUFtQixPQUFPQSxXQUFQLEtBQXVCLFVBQXZCLEdBQW9DQSxXQUFwQyxHQUFrRCxJQUFyRTtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsT0FBT0EsVUFBUCxLQUFzQixVQUF0QixHQUFtQ0EsVUFBbkMsR0FBZ0QsSUFBbEU7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDSCxDQUpEOztBQU1BOzs7Ozs7QUFNQSxJQUFNUixZQUFZLFNBQVpBLFNBQVksQ0FBVVIsRUFBVixFQUFjVSxJQUFkLEVBQW9CO0FBQ2xDLFFBQUljLE9BQU8sS0FBWDtBQUNBLFFBQUk7QUFDQXhCLFdBQ0ksVUFBU1QsS0FBVCxFQUFnQjtBQUNaLGdCQUFJaUMsSUFBSixFQUFVO0FBQ1ZBLG1CQUFPLElBQVA7QUFDQWhDLG9CQUFRa0IsSUFBUixFQUFjbkIsS0FBZDtBQUNILFNBTEwsRUFNSSxVQUFTOVIsTUFBVCxFQUFpQjtBQUNiLGdCQUFJK1QsSUFBSixFQUFVO0FBQ1ZBLG1CQUFPLElBQVA7QUFDQS9CLG1CQUFPaUIsSUFBUCxFQUFhalQsTUFBYjtBQUNILFNBVkw7QUFZSCxLQWJELENBYUUsT0FBT2dVLEVBQVAsRUFBVztBQUNULFlBQUlELElBQUosRUFBVTtBQUNWQSxlQUFPLElBQVA7QUFDQS9CLGVBQU9pQixJQUFQLEVBQWFlLEVBQWI7QUFDSDtBQUNKLENBcEJEOztBQXNCQXZCLFlBQVkvSixTQUFaLENBQXNCLE9BQXRCLElBQWlDLFVBQVM0SyxVQUFULEVBQXFCO0FBQ2xELFdBQU8sS0FBS2xWLElBQUwsQ0FBVSxJQUFWLEVBQWdCa1YsVUFBaEIsQ0FBUDtBQUNILENBRkQ7O0FBSUFiLFlBQVkvSixTQUFaLENBQXNCdEssSUFBdEIsR0FBNkIsVUFBU2lWLFdBQVQsRUFBc0JDLFVBQXRCLEVBQWtDO0FBQzNELFFBQUlXLE9BQU8sSUFBSSxLQUFLcEMsV0FBVCxDQUFxQlEsSUFBckIsQ0FBWDs7QUFFQVcsV0FBTyxJQUFQLEVBQWEsSUFBSWMsT0FBSixDQUFZVCxXQUFaLEVBQXlCQyxVQUF6QixFQUFxQ1csSUFBckMsQ0FBYjtBQUNBLFdBQU9BLElBQVA7QUFDSCxDQUxEOztBQU9BeEIsWUFBWS9KLFNBQVosQ0FBc0IsU0FBdEIsSUFBbUNpSixjQUFuQzs7QUFFQWMsWUFBWWxMLEdBQVosR0FBa0IsVUFBUzJNLEdBQVQsRUFBYztBQUM1QixXQUFPLElBQUk1QyxPQUFKLENBQVksVUFBU1MsT0FBVCxFQUFrQkMsTUFBbEIsRUFBMEI7QUFDekMsWUFBSSxDQUFDa0MsR0FBRCxJQUFRLE9BQU9BLElBQUlwVyxNQUFYLEtBQXNCLFdBQWxDLEVBQ0ksTUFBTSxJQUFJNFUsU0FBSixDQUFjLDhCQUFkLENBQU47QUFDSixZQUFJM0wsT0FBT3JDLE1BQU1nRSxTQUFOLENBQWdCOUUsS0FBaEIsQ0FBc0J3RCxJQUF0QixDQUEyQjhNLEdBQTNCLENBQVg7QUFDQSxZQUFJbk4sS0FBS2pKLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUIsT0FBT2lVLFFBQVEsRUFBUixDQUFQO0FBQ3ZCLFlBQUlvQyxZQUFZcE4sS0FBS2pKLE1BQXJCOztBQUVBLGlCQUFTc1csR0FBVCxDQUFhdlcsQ0FBYixFQUFnQmtGLEdBQWhCLEVBQXFCO0FBQ2pCLGdCQUFJO0FBQ0Esb0JBQUlBLFFBQVEsUUFBT0EsR0FBUCx5Q0FBT0EsR0FBUCxPQUFlLFFBQWYsSUFBMkIsT0FBT0EsR0FBUCxLQUFlLFVBQWxELENBQUosRUFBbUU7QUFDL0Qsd0JBQUkzRSxPQUFPMkUsSUFBSTNFLElBQWY7QUFDQSx3QkFBSSxPQUFPQSxJQUFQLEtBQWdCLFVBQXBCLEVBQWdDO0FBQzVCQSw2QkFBS2dKLElBQUwsQ0FDSXJFLEdBREosRUFFSSxVQUFTQSxHQUFULEVBQWM7QUFDVnFSLGdDQUFJdlcsQ0FBSixFQUFPa0YsR0FBUDtBQUNILHlCQUpMLEVBS0lpUCxNQUxKO0FBT0E7QUFDSDtBQUNKO0FBQ0RqTCxxQkFBS2xKLENBQUwsSUFBVWtGLEdBQVY7QUFDQSxvQkFBSSxFQUFFb1IsU0FBRixLQUFnQixDQUFwQixFQUF1QjtBQUNuQnBDLDRCQUFRaEwsSUFBUjtBQUNIO0FBQ0osYUFsQkQsQ0FrQkUsT0FBT2lOLEVBQVAsRUFBVztBQUNUaEMsdUJBQU9nQyxFQUFQO0FBQ0g7QUFDSjs7QUFFRCxhQUFLLElBQUluVyxJQUFJLENBQWIsRUFBZ0JBLElBQUlrSixLQUFLakosTUFBekIsRUFBaUNELEdBQWpDLEVBQXNDO0FBQ2xDdVcsZ0JBQUl2VyxDQUFKLEVBQU9rSixLQUFLbEosQ0FBTCxDQUFQO0FBQ0g7QUFDSixLQWxDTSxDQUFQO0FBbUNILENBcENEOztBQXNDQTRVLFlBQVlWLE9BQVosR0FBc0IsVUFBU0QsS0FBVCxFQUFnQjtBQUNsQyxRQUFJQSxTQUFTLFFBQU9BLEtBQVAseUNBQU9BLEtBQVAsT0FBaUIsUUFBMUIsSUFBc0NBLE1BQU1ELFdBQU4sS0FBc0JQLE9BQWhFLEVBQXlFO0FBQ3JFLGVBQU9RLEtBQVA7QUFDSDs7QUFFRCxXQUFPLElBQUlSLE9BQUosQ0FBWSxVQUFTUyxPQUFULEVBQWtCO0FBQ2pDQSxnQkFBUUQsS0FBUjtBQUNILEtBRk0sQ0FBUDtBQUdILENBUkQ7O0FBVUFXLFlBQVlULE1BQVosR0FBcUIsVUFBU0YsS0FBVCxFQUFnQjtBQUNqQyxXQUFPLElBQUlSLE9BQUosQ0FBWSxVQUFTUyxPQUFULEVBQWtCQyxNQUFsQixFQUEwQjtBQUN6Q0EsZUFBT0YsS0FBUDtBQUNILEtBRk0sQ0FBUDtBQUdILENBSkQ7O0FBTUFXLFlBQVk0QixJQUFaLEdBQW1CLFVBQVNDLE1BQVQsRUFBaUI7QUFDaEMsV0FBTyxJQUFJaEQsT0FBSixDQUFZLFVBQVNTLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQ3pDLGFBQUssSUFBSW5VLElBQUksQ0FBUixFQUFXZ1csTUFBTVMsT0FBT3hXLE1BQTdCLEVBQXFDRCxJQUFJZ1csR0FBekMsRUFBOENoVyxHQUE5QyxFQUFtRDtBQUMvQ3lXLG1CQUFPelcsQ0FBUCxFQUFVTyxJQUFWLENBQWUyVCxPQUFmLEVBQXdCQyxNQUF4QjtBQUNIO0FBQ0osS0FKTSxDQUFQO0FBS0gsQ0FORDs7QUFRQTtBQUNBUyxZQUFZVSxZQUFaLEdBQ0ssT0FBT2hCLGdCQUFQLEtBQTRCLFVBQTVCLElBQ0QsVUFBU0ksRUFBVCxFQUFhO0FBQ1RKLHFCQUFpQkksRUFBakI7QUFDSCxDQUhELElBSUEsVUFBU0EsRUFBVCxFQUFhO0FBQ1RKLHFCQUFpQkksRUFBakIsRUFBcUIsQ0FBckI7QUFDSCxDQVBMOztBQVNBRSxZQUFZbUIscUJBQVosR0FBb0MsU0FBU0EscUJBQVQsQ0FBK0IzQyxHQUEvQixFQUFvQztBQUNwRSxRQUFJLE9BQU9zRCxPQUFQLEtBQW1CLFdBQW5CLElBQWtDQSxPQUF0QyxFQUErQztBQUMzQ0EsZ0JBQVFDLElBQVIsQ0FBYSx1Q0FBYixFQUFzRHZELEdBQXRELEVBRDJDLENBQ2lCO0FBQy9EO0FBQ0osQ0FKRDs7QUFNQSxJQUFNSyxVQUFVakcsT0FBT2lHLE9BQVAsS0FBbUJqRyxPQUFPaUcsT0FBUCxHQUFpQm1CLFdBQXBDLENBQWhCOztBQUVPLElBQU1nQyw4QkFBV25ELFFBQVFTLE9BQVIsRUFBakI7O2tCQUVRVCxPOzs7Ozs7Ozs7Ozs7Ozs7O0FDNVBmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBLHFCQUFBb0QsR0FBMEIsNEJBQWMsZUFBZCxDQUExQjs7QUFFQSxJQUFNQyxhQUFhLEVBQW5CO0FBQ0F0SixPQUFPc0osVUFBUCxHQUFvQkEsVUFBcEI7O0FBR0E7OztBQUdBLFNBQWNBLFVBQWQsRUFBMEJDLG9CQUExQjs7QUFFQUQsV0FBV0UsTUFBWCxHQUFvQixVQUFValksU0FBVixFQUFxQndELE9BQXJCLEVBQThCOztBQUU5QyxRQUFJMFUsbUJBQW1CLDZDQUE0QmxZLFNBQTVCLENBQXZCOztBQUVBOzs7OztBQVVBLFFBQUltWSxTQUFTLG9CQUFLRCxnQkFBTCxDQUFiOztBQUdBLFFBQU1FLGlCQUFpQkoscUJBQWNDLE1BQWQsQ0FBcUJFLE9BQU9FLHdCQUFQLEVBQXJCLEVBQXdEN1UsT0FBeEQsQ0FBdkI7O0FBRUEsYUFBYzRVLGNBQWQsRUFBOEI7QUFDM0JFLGVBQVEsaUJBQVU7QUFDZCxtQkFBT0osaUJBQWlCSyxFQUF4QjtBQUNIO0FBSDBCLEtBQTlCOztBQU1BSixXQUFPSyxNQUFQLENBQWNKLGNBQWQ7O0FBSUE7OztBQUdBLFdBQU9BLGNBQVA7QUFDSCxDQWpDRCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEJBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBLHFCQUFBTixHQUEwQiw0QkFBYyxtQkFBZCxDQUExQjs7QUFFQTs7O0FBR0EsSUFBTUUsZ0JBQWdCdkosT0FBT3VKLGFBQVAsR0FBdUIsRUFBN0M7O0FBRUEsSUFBTTNYLFVBQVUsT0FBaEI7O0FBRUEsSUFBTW9ZLGFBQWFULGNBQWNTLFVBQWQsR0FBMkIsRUFBOUM7O0FBRU8sSUFBTUMsb0VBQThCLFNBQTlCQSwyQkFBOEIsQ0FBUzFZLFNBQVQsRUFBb0I7O0FBRTNELFFBQUksQ0FBQ0EsU0FBTCxFQUFnQjs7QUFFWjtBQUNBLGVBQU8sSUFBUDtBQUNIOztBQUVELFFBQUlrWSxtQkFBbUIsSUFBdkI7O0FBRUEsUUFBSSxPQUFPbFksU0FBUCxLQUFxQixRQUF6QixFQUFtQzs7QUFFL0JrWSwyQkFBbUJoSyxTQUFTeUssY0FBVCxDQUF3QjNZLFNBQXhCLENBQW5CO0FBQ0gsS0FIRCxNQUdPLElBQUlBLFVBQVU0WSxRQUFkLEVBQXdCOztBQUUzQlYsMkJBQW1CbFksU0FBbkI7QUFDSCxLQUhNLE1BR0E7QUFDSDtBQUNBLGVBQU8sSUFBUDtBQUNIOztBQUVELFdBQU9rWSxnQkFBUDtBQUNILENBdEJNOztBQXdCUDs7Ozs7O0FBTUFGLGNBQWNDLE1BQWQsR0FBdUIsVUFBU2pZLFNBQVQsRUFBb0J3RCxPQUFwQixFQUE2Qjs7QUFFaEQsUUFBSTBVLG1CQUFtQlEsNEJBQTRCMVksU0FBNUIsQ0FBdkI7O0FBRUEsUUFBTW9ZLGlCQUFpQixtQkFBSUYsZ0JBQUosQ0FBdkI7QUFDQUUsbUJBQWU3VSxJQUFmLENBQW9CQyxPQUFwQjs7QUFFQWlWLGVBQVdsUSxJQUFYLENBQWdCNlAsY0FBaEI7O0FBRUEsV0FBT0EsY0FBUDtBQUNILENBVkQ7O0FBWUE7Ozs7O0FBS0FKLGNBQWNhLGFBQWQsR0FBOEIsWUFBVzs7QUFFckMsV0FBT0osVUFBUDtBQUNILENBSEQ7O0FBS0E7Ozs7OztBQU1BVCxjQUFjYyxzQkFBZCxHQUF1QyxVQUFTQyxXQUFULEVBQXNCOztBQUV6RCxTQUFLLElBQUk5WCxJQUFJLENBQWIsRUFBZ0JBLElBQUl3WCxXQUFXdlgsTUFBWCxHQUFtQixDQUF2QyxFQUEwQ0QsR0FBMUMsRUFBZ0Q7O0FBRTVDLFlBQUl3WCxXQUFXeFgsQ0FBWCxFQUFjOFgsV0FBZCxLQUE4QkEsV0FBbEMsRUFBK0M7O0FBRTNDLG1CQUFPTixXQUFXeFgsQ0FBWCxDQUFQO0FBQ0g7QUFDSjs7QUFFRCxXQUFPLElBQVA7QUFDSCxDQVhEOztBQWFBOzs7Ozs7QUFNQStXLGNBQWNnQixnQkFBZCxHQUFpQyxVQUFTMVIsS0FBVCxFQUFnQjs7QUFFN0MsUUFBTThRLGlCQUFpQkssV0FBV25SLEtBQVgsQ0FBdkI7O0FBRUEsUUFBSThRLGNBQUosRUFBb0I7O0FBRWhCLGVBQU9BLGNBQVA7QUFDSCxLQUhELE1BR087O0FBRUgsZUFBTyxJQUFQO0FBQ0g7QUFDSixDQVhEOztBQWFBOzs7Ozs7QUFNQUosY0FBY2lCLGtCQUFkLEdBQW1DLFVBQVNsWSxPQUFULEVBQWtCO0FBQ2pELFdBQU8sQ0FBQ2tILHFCQUFFRixPQUFGLENBQVVoSCxPQUFWLElBQXFCQSxPQUFyQixHQUErQixDQUFDQSxPQUFELENBQWhDLEVBQTJDcUgsR0FBM0MsQ0FBK0MsVUFBUzJFLE1BQVQsRUFBaUJ6RixLQUFqQixFQUF1QjtBQUN6RSxZQUFHeUYsT0FBT2lHLElBQVAsSUFBZSx5QkFBU2pHLE9BQU9pRyxJQUFoQixDQUFmLElBQXdDakcsT0FBT2tHLFdBQS9DLElBQThEbEcsT0FBT21HLE1BQXhFLEVBQStFO0FBQzNFLG1CQUFPLEVBQUM5RSxNQUFPckIsT0FBT2lHLElBQVAsR0FBYyxHQUFkLEdBQW9CakcsT0FBT2tHLFdBQTNCLEdBQXlDLEdBQXpDLEdBQStDbEcsT0FBT21HLE1BQTlELEVBQXNFN0UsTUFBTyxRQUE3RSxFQUF1RmhOLE9BQVEwTCxPQUFPMUwsS0FBUCxHQUFlMEwsT0FBTzFMLEtBQXRCLEdBQThCLGFBQVdpRyxRQUFNLENBQWpCLENBQTdILEVBQVA7QUFDSDtBQUNKLEtBSk0sQ0FBUDtBQUtILENBTkQ7O2tCQVFlMFEsYTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEhmOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7QUFOQTs7O0FBWUEsSUFBTWtCLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxpQkFBVCxFQUEyQjtBQUNuQyxRQUFNalosT0FBTyxFQUFiO0FBQ0EsUUFBTWtaLGFBQWEsU0FBYkEsVUFBYSxDQUFTQyxRQUFULEVBQW9CQyxRQUFwQixFQUE2QjtBQUM1QyxZQUFJQyxXQUFZRixTQUFTRyxnQkFBVCxDQUEwQkYsUUFBMUIsQ0FBaEI7QUFDQSxZQUFHQyxTQUFTclksTUFBVCxHQUFrQixDQUFyQixFQUF1QjtBQUNuQixtQkFBT3FZLFFBQVA7QUFDSCxTQUZELE1BRUs7QUFDRCxtQkFBT0EsU0FBUyxDQUFULENBQVA7QUFDSDtBQUVKLEtBUkQ7O0FBVUEsUUFBSUYsV0FBVyxFQUFmOztBQUVBLFFBQUlwUixxQkFBRXdSLEtBQUYsQ0FBUU4saUJBQVIsRUFBMkIsVUFBUzVKLElBQVQsRUFBYztBQUFDLGVBQU90SCxxQkFBRXlSLFNBQUYsQ0FBWW5LLElBQVosQ0FBUDtBQUF5QixLQUFuRSxDQUFKLEVBQXlFO0FBQ3JFOEosbUJBQVdGLGlCQUFYO0FBQ0gsS0FGRCxNQUVNLElBQUdBLHNCQUFzQixVQUF6QixFQUFvQztBQUN0Q0UsbUJBQVduTCxRQUFYO0FBQ0gsS0FGSyxNQUVBLElBQUdpTCxzQkFBc0IsUUFBekIsRUFBa0M7QUFDcENFLG1CQUFXNUssTUFBWDtBQUNILEtBRkssTUFFRDtBQUNENEssbUJBQVdELFdBQVdsTCxRQUFYLEVBQXFCaUwsaUJBQXJCLENBQVg7QUFDSDs7QUFHRCxRQUFHLENBQUNFLFFBQUosRUFBYTtBQUNULGVBQU8sSUFBUDtBQUNIOztBQUVEblosU0FBS3laLElBQUwsR0FBWSxVQUFDTCxRQUFELEVBQWE7QUFDckIsZUFBT0osSUFBSUUsV0FBV0MsUUFBWCxFQUFxQkMsUUFBckIsQ0FBSixDQUFQO0FBQ0gsS0FGRDs7QUFJQXBaLFNBQUswWixHQUFMLEdBQVcsVUFBQzVYLElBQUQsRUFBT2tULEtBQVAsRUFBaUI7QUFDeEIsWUFBR21FLFNBQVNuWSxNQUFULEdBQWtCLENBQXJCLEVBQXVCO0FBQ25CbVkscUJBQVN4UyxPQUFULENBQWlCLFVBQVNnVCxPQUFULEVBQWlCO0FBQzlCQSx3QkFBUUMsS0FBUixDQUFjOVgsSUFBZCxJQUFzQmtULEtBQXRCO0FBQ0gsYUFGRDtBQUdILFNBSkQsTUFJSztBQUNEbUUscUJBQVNTLEtBQVQsQ0FBZTlYLElBQWYsSUFBdUJrVCxLQUF2QjtBQUNIO0FBQ0osS0FSRDs7QUFVQWhWLFNBQUs2WixRQUFMLEdBQWdCLFVBQUMvWCxJQUFELEVBQVM7QUFDckIsWUFBR3FYLFNBQVNXLFNBQVosRUFBc0I7QUFDbEJYLHFCQUFTVyxTQUFULENBQW1CQyxHQUFuQixDQUF1QmpZLElBQXZCO0FBQ0gsU0FGRCxNQUVLO0FBQ0QsZ0JBQUlrWSxhQUFhYixTQUFTYyxTQUFULENBQW1CQyxLQUFuQixDQUF5QixHQUF6QixDQUFqQjtBQUNBLGdCQUFHRixXQUFXOVMsT0FBWCxDQUFtQnBGLElBQW5CLE1BQTZCLENBQUMsQ0FBakMsRUFBbUM7QUFDL0JxWCx5QkFBU2MsU0FBVCxJQUFzQixNQUFNblksSUFBNUI7QUFDSDtBQUNKO0FBRUosS0FWRDs7QUFZQTlCLFNBQUttYSxXQUFMLEdBQW1CLFVBQUNyWSxJQUFELEVBQVM7QUFDeEIsWUFBSXFYLFNBQVNXLFNBQWIsRUFBdUI7QUFDbkJYLHFCQUFTVyxTQUFULENBQW1CMVUsTUFBbkIsQ0FBMEJ0RCxJQUExQjtBQUNILFNBRkQsTUFFSztBQUNEcVgscUJBQVNjLFNBQVQsR0FBcUJkLFNBQVNjLFNBQVQsQ0FBbUIvRyxPQUFuQixDQUEyQixJQUFJa0gsTUFBSixDQUFXLFlBQVl0WSxLQUFLb1ksS0FBTCxDQUFXLEdBQVgsRUFBZ0JHLElBQWhCLENBQXFCLEdBQXJCLENBQVosR0FBd0MsU0FBbkQsRUFBOEQsSUFBOUQsQ0FBM0IsRUFBZ0csR0FBaEcsQ0FBckI7QUFFSDtBQUNKLEtBUEQ7O0FBU0FyYSxTQUFLc2EsSUFBTCxHQUFZLFlBQUs7QUFDYm5CLGlCQUFTUyxLQUFULENBQWVXLE9BQWYsR0FBeUIsT0FBekI7QUFDSCxLQUZEOztBQUlBdmEsU0FBS3dhLElBQUwsR0FBWSxZQUFLO0FBQ2JyQixpQkFBU1MsS0FBVCxDQUFlVyxPQUFmLEdBQXlCLE1BQXpCO0FBQ0gsS0FGRDs7QUFJQXZhLFNBQUt5YSxNQUFMLEdBQWMsVUFBQ0MsUUFBRCxFQUFhO0FBQ3ZCdkIsaUJBQVN3QixTQUFULElBQXNCRCxRQUF0QjtBQUNILEtBRkQ7O0FBSUExYSxTQUFLNGEsSUFBTCxHQUFZLFVBQUNBLElBQUQsRUFBVTtBQUFFO0FBQ3BCLFlBQUdBLElBQUgsRUFBUTtBQUNKekIscUJBQVMwQixXQUFULEdBQXVCRCxJQUF2QjtBQUNILFNBRkQsTUFFSztBQUNELG1CQUFPekIsU0FBUzBCLFdBQWhCO0FBQ0g7QUFDSixLQU5EOztBQVFBN2EsU0FBSzhhLFFBQUwsR0FBZ0IsVUFBQ2haLElBQUQsRUFBVTtBQUFFO0FBQ3hCLFlBQUdxWCxTQUFTVyxTQUFaLEVBQXNCO0FBQ2xCLG1CQUFPWCxTQUFTVyxTQUFULENBQW1CaUIsUUFBbkIsQ0FBNEJqWixJQUE1QixDQUFQO0FBQ0gsU0FGRCxNQUVLO0FBQ0QsbUJBQU8sSUFBSXNZLE1BQUosQ0FBVyxVQUFVdFksSUFBVixHQUFpQixPQUE1QixFQUFxQyxJQUFyQyxFQUEyQ3FGLElBQTNDLENBQWdEZ1MsU0FBU3JYLElBQXpELENBQVA7QUFDSDtBQUNKLEtBTkQ7O0FBUUE5QixTQUFLZ2IsRUFBTCxHQUFVLFVBQUNDLGNBQUQsRUFBb0I7QUFDMUIsZUFBTzlCLGFBQWE4QixjQUFwQjtBQUNILEtBRkQ7O0FBSUFqYixTQUFLa2IsTUFBTCxHQUFjLFlBQUs7QUFBSztBQUNwQixZQUFJQyxPQUFPaEMsU0FBU2lDLHFCQUFULEVBQVg7O0FBRUEsZUFBTztBQUNIQyxpQkFBS0YsS0FBS0UsR0FBTCxHQUFXck4sU0FBU3NOLElBQVQsQ0FBY0MsU0FEM0I7QUFFSEMsa0JBQU1MLEtBQUtLLElBQUwsR0FBWXhOLFNBQVNzTixJQUFULENBQWNHO0FBRjdCLFNBQVA7QUFJSCxLQVBEOztBQVNBemIsU0FBSzhGLEtBQUwsR0FBYSxZQUFNO0FBQUs7QUFDcEIsZUFBT3FULFNBQVN1QyxXQUFoQjtBQUNILEtBRkQ7O0FBSUExYixTQUFLK0YsTUFBTCxHQUFjLFlBQU07QUFBSTtBQUNwQixlQUFPb1QsU0FBU3dDLFlBQWhCO0FBQ0gsS0FGRDs7QUFJQTNiLFNBQUs0YixJQUFMLEdBQVksVUFBQ0EsSUFBRCxFQUFVO0FBQ2xCLGVBQU96QyxTQUFTMEMsWUFBVCxDQUFzQkQsSUFBdEIsQ0FBUDtBQUNILEtBRkQ7O0FBSUE1YixTQUFLb0YsTUFBTCxHQUFjLFlBQU07QUFBSTtBQUNwQitULGlCQUFTMkMsVUFBVCxDQUFvQnJKLFdBQXBCLENBQWdDMEcsUUFBaEM7QUFDSCxLQUZEOztBQUlBblosU0FBS2tULE9BQUwsR0FBZSxVQUFDNkksSUFBRCxFQUFVO0FBQ3JCNUMsaUJBQVM2QyxXQUFULENBQXFCRCxJQUFyQjtBQUNILEtBRkQ7O0FBSUEvYixTQUFLeWEsTUFBTCxHQUFjLFVBQUNzQixJQUFELEVBQVU7QUFDcEI1QyxpQkFBUzNHLFdBQVQsQ0FBcUJ1SixJQUFyQjtBQUNILEtBRkQ7O0FBSUEvYixTQUFLb0YsTUFBTCxHQUFjLFlBQU07QUFDaEIrVCxpQkFBUy9ULE1BQVQ7QUFDSCxLQUZEOztBQUlBcEYsU0FBS2ljLEdBQUwsR0FBVyxZQUFNO0FBQ2IsZUFBTzlDLFFBQVA7QUFDSCxLQUZEOztBQUlBblosU0FBS2tjLE9BQUwsR0FBZSxVQUFDQyxjQUFELEVBQW9CO0FBQy9CLGVBQU9oRCxTQUFTK0MsT0FBVCxDQUFpQkMsY0FBakIsQ0FBUDtBQUNILEtBRkQ7O0FBSUEsV0FBT25jLElBQVA7QUFDSCxDQTlJRDs7a0JBZ0plZ1osRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1SmY7Ozs7QUFJQSxJQUFNb0QsU0FBUyxTQUFUQSxNQUFTLEdBQVU7QUFDckIsUUFBTXBjLE9BQU8sRUFBYjtBQUNBLFFBQUlxYyxpQkFBaUIsSUFBckI7O0FBRUE5TixXQUFPdE8saUJBQVAsR0FBMkIsRUFBQ0MsS0FBTXFPLE9BQU8sU0FBUCxFQUFrQixLQUFsQixDQUFQLEVBQTNCOztBQUVBdk8sU0FBS3NjLE1BQUwsR0FBYyxZQUFLO0FBQ2YsWUFBR0Qsa0JBQWtCLElBQXJCLEVBQTBCO0FBQ3RCO0FBQ0g7QUFDRHBjLDBCQUFrQixLQUFsQixJQUEyQm9jLGNBQTNCO0FBQ0gsS0FMRDtBQU1BcmMsU0FBS3dELE9BQUwsR0FBZSxZQUFLO0FBQ2hCNlkseUJBQWlCNUUsUUFBUXZYLEdBQXpCO0FBQ0FELDBCQUFrQixLQUFsQixJQUEyQixZQUFVLENBQUUsQ0FBdkM7QUFDSCxLQUhEO0FBSUFELFNBQUt1QixPQUFMLEdBQWUsWUFBSztBQUNoQmdOLGVBQU90TyxpQkFBUCxHQUEyQixJQUEzQjtBQUNILEtBRkQ7O0FBSUEsV0FBT0QsSUFBUDtBQUNILENBckJEOztrQkF3QmVvYyxNOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVCZjs7O0FBR0EsSUFBTUYsVUFBVSxTQUFWQSxPQUFVLEdBQVU7QUFDdEIsUUFBSTNOLE9BQU9nTyxPQUFQLElBQWtCLENBQUNBLFFBQVEzUSxTQUFSLENBQWtCc1EsT0FBekMsRUFBa0Q7QUFDOUNLLGdCQUFRM1EsU0FBUixDQUFrQnNRLE9BQWxCLEdBQ0ksVUFBU00sQ0FBVCxFQUFZO0FBQ1IsZ0JBQUlDLFVBQVUsQ0FBQyxLQUFLek8sUUFBTCxJQUFpQixLQUFLME8sYUFBdkIsRUFBc0NwRCxnQkFBdEMsQ0FBdURrRCxDQUF2RCxDQUFkO0FBQUEsZ0JBQ0l6YixDQURKO0FBQUEsZ0JBRUk0YixLQUFLLElBRlQ7QUFHQSxlQUFHO0FBQ0M1YixvQkFBSTBiLFFBQVF6YixNQUFaO0FBQ0EsdUJBQU8sRUFBRUQsQ0FBRixJQUFPLENBQVAsSUFBWTBiLFFBQVFwTixJQUFSLENBQWF0TyxDQUFiLE1BQW9CNGIsRUFBdkMsRUFBMkMsQ0FBRTtBQUNoRCxhQUhELFFBR1U1YixJQUFJLENBQUwsS0FBWTRiLEtBQUtBLEdBQUdDLGFBQXBCLENBSFQ7QUFJQSxtQkFBT0QsRUFBUDtBQUNILFNBVkw7QUFXSDtBQUNKLENBZEQ7O2tCQWdCZVQsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FDakJDVyxJLEdBQUFBLEk7UUEyQ0FDLFUsR0FBQUEsVTs7QUE3Q2hCOzs7Ozs7QUFFTyxTQUFTRCxJQUFULENBQWNFLE1BQWQsRUFBc0I7QUFDekIsV0FBT0EsT0FBTzdKLE9BQVAsQ0FBZSxZQUFmLEVBQTZCLEVBQTdCLENBQVA7QUFDSDs7QUFFRDs7Ozs7O0FBTU8sSUFBTThKLDhDQUFtQixTQUFuQkEsZ0JBQW1CLENBQVNDLElBQVQsRUFBZTtBQUMzQyxRQUFHLENBQUNBLElBQUQsSUFBU0EsS0FBSzNWLE1BQUwsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxLQUFrQixNQUE5QixFQUFzQztBQUNsQyxlQUFPLEVBQVA7QUFDSDtBQUNELGFBQVM0VixrQkFBVCxDQUE0QkQsSUFBNUIsRUFBa0M7QUFDOUIsWUFBSUUsWUFBWSxFQUFoQjtBQUNBLFlBQUssa0JBQUQsQ0FBcUJoVyxJQUFyQixDQUEwQjhWLElBQTFCLENBQUosRUFBcUM7QUFDakNFLHdCQUFZLEtBQVo7QUFDSCxTQUZELE1BRU0sSUFBSyxtQkFBRCxDQUFzQmhXLElBQXRCLENBQTJCOFYsSUFBM0IsQ0FBSixFQUFzQztBQUN4Q0Usd0JBQVksTUFBWjtBQUNIO0FBQ0QsZUFBT0EsU0FBUDtBQUNIOztBQUVELFFBQUlDLGVBQWVGLG1CQUFtQkQsSUFBbkIsQ0FBbkI7QUFDQSxRQUFHRyxZQUFILEVBQWlCO0FBQ2IsZUFBT0EsWUFBUDtBQUNIO0FBQ0RILFdBQU9BLEtBQUsvQyxLQUFMLENBQVcsR0FBWCxFQUFnQixDQUFoQixFQUFtQkEsS0FBbkIsQ0FBeUIsR0FBekIsRUFBOEIsQ0FBOUIsQ0FBUDtBQUNBLFFBQUcrQyxLQUFLSSxXQUFMLENBQWlCLEdBQWpCLElBQXdCLENBQUMsQ0FBNUIsRUFBK0I7QUFDM0IsZUFBT0osS0FBSzNWLE1BQUwsQ0FBWTJWLEtBQUtJLFdBQUwsQ0FBaUIsR0FBakIsSUFBd0IsQ0FBcEMsRUFBdUNKLEtBQUtqYyxNQUE1QyxFQUFvRG9GLFdBQXBELEVBQVA7QUFDSCxLQUZELE1BRUs7QUFDRCxlQUFPLEVBQVA7QUFDSDtBQUNKLENBeEJNOztBQTJCUDs7Ozs7O0FBTU8sU0FBUzBXLFVBQVQsQ0FBb0JRLE1BQXBCLEVBQTRCO0FBQy9CLFFBQUlDLFNBQVNuYixTQUFTa2IsTUFBVCxFQUFpQixFQUFqQixDQUFiO0FBQ0EsUUFBSUUsUUFBVXJWLEtBQUtzVixLQUFMLENBQVdGLFNBQVMsSUFBcEIsQ0FBZDtBQUNBLFFBQUlHLFVBQVV2VixLQUFLc1YsS0FBTCxDQUFXLENBQUNGLFNBQVVDLFFBQVEsSUFBbkIsSUFBNEIsRUFBdkMsQ0FBZDtBQUNBLFFBQUlHLFVBQVVKLFNBQVVDLFFBQVEsSUFBbEIsR0FBMkJFLFVBQVUsRUFBbkQ7O0FBRUEsUUFBSUYsUUFBUSxDQUFaLEVBQWU7QUFBQ0Usa0JBQVUsTUFBSUEsT0FBZDtBQUF1QjtBQUN2QyxRQUFJQyxVQUFVLEVBQWQsRUFBa0I7QUFBQ0Esa0JBQVUsTUFBSUEsT0FBZDtBQUF1Qjs7QUFFMUMsUUFBSUgsUUFBUSxDQUFaLEVBQWU7QUFDWCxlQUFPQSxRQUFNLEdBQU4sR0FBVUUsT0FBVixHQUFrQixHQUFsQixHQUFzQkMsT0FBN0I7QUFDSCxLQUZELE1BRU87QUFDSCxlQUFPRCxVQUFRLEdBQVIsR0FBWUMsT0FBbkI7QUFDSDtBQUNKLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzREQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLFlBQVU7QUFBQyxNQUFJQyxJQUFFLG9CQUFpQnpILElBQWpCLHlDQUFpQkEsSUFBakIsTUFBdUJBLEtBQUtBLElBQUwsS0FBWUEsSUFBbkMsSUFBeUNBLElBQXpDLElBQStDLG9CQUFpQjBILE1BQWpCLHlDQUFpQkEsTUFBakIsTUFBeUJBLE9BQU9BLE1BQVAsS0FBZ0JBLE1BQXpDLElBQWlEQSxNQUFoRyxJQUF3RyxJQUF4RyxJQUE4RyxFQUFwSDtBQUFBLE1BQXVIQyxJQUFFRixFQUFFN1YsQ0FBM0g7QUFBQSxNQUE2SDRPLElBQUUvTyxNQUFNZ0UsU0FBckk7QUFBQSxNQUErSW1TLElBQUV0WCxPQUFPbUYsU0FBeEo7QUFBQSxNQUFrSzRRLElBQUUsZUFBYSxPQUFPd0IsTUFBcEIsR0FBMkJBLE9BQU9wUyxTQUFsQyxHQUE0QyxJQUFoTjtBQUFBLE1BQXFOcVMsSUFBRXRILEVBQUV0TyxJQUF6TjtBQUFBLE1BQThONlYsSUFBRXZILEVBQUU3UCxLQUFsTztBQUFBLE1BQXdPcVgsSUFBRUosRUFBRTlXLFFBQTVPO0FBQUEsTUFBcVBsRyxJQUFFZ2QsRUFBRUssY0FBelA7QUFBQSxNQUF3UUMsSUFBRXpXLE1BQU1DLE9BQWhSO0FBQUEsTUFBd1J5VyxJQUFFN1gsT0FBT0MsSUFBalM7QUFBQSxNQUFzU2lFLElBQUVsRSxPQUFPc1IsTUFBL1M7QUFBQSxNQUFzVHdHLElBQUUsU0FBRkEsQ0FBRSxHQUFVLENBQUUsQ0FBcFU7QUFBQSxNQUFxVWhYLElBQUUsU0FBRkEsQ0FBRSxDQUFTcVcsQ0FBVCxFQUFXO0FBQUMsV0FBT0EsYUFBYXJXLENBQWIsR0FBZXFXLENBQWYsR0FBaUIsZ0JBQWdCclcsQ0FBaEIsR0FBa0IsTUFBSyxLQUFLaVgsUUFBTCxHQUFjWixDQUFuQixDQUFsQixHQUF3QyxJQUFJclcsQ0FBSixDQUFNcVcsQ0FBTixDQUFoRTtBQUF5RSxHQUE1WixDQUE2WixlQUFhLE9BQU9hLE9BQXBCLElBQTZCQSxRQUFRL0YsUUFBckMsR0FBOENrRixFQUFFN1YsQ0FBRixHQUFJUixDQUFsRCxJQUFxRCxlQUFhLE9BQU9tWCxNQUFwQixJQUE0QixDQUFDQSxPQUFPaEcsUUFBcEMsSUFBOENnRyxPQUFPRCxPQUFyRCxLQUErREEsVUFBUUMsT0FBT0QsT0FBUCxHQUFlbFgsQ0FBdEYsR0FBeUZrWCxRQUFRMVcsQ0FBUixHQUFVUixDQUF4SixHQUEySkEsRUFBRW9YLE9BQUYsR0FBVSxPQUFySyxDQUE2SyxJQUFJQyxDQUFKO0FBQUEsTUFBTUMsSUFBRSxTQUFGQSxDQUFFLENBQVNaLENBQVQsRUFBV2xkLENBQVgsRUFBYTZjLENBQWIsRUFBZTtBQUFDLFFBQUcsS0FBSyxDQUFMLEtBQVM3YyxDQUFaLEVBQWMsT0FBT2tkLENBQVAsQ0FBUyxRQUFPLFFBQU1MLENBQU4sR0FBUSxDQUFSLEdBQVVBLENBQWpCLEdBQW9CLEtBQUssQ0FBTDtBQUFPLGVBQU8sVUFBU0EsQ0FBVCxFQUFXO0FBQUMsaUJBQU9LLEVBQUUzVCxJQUFGLENBQU92SixDQUFQLEVBQVM2YyxDQUFULENBQVA7QUFBbUIsU0FBdEMsQ0FBdUMsS0FBSyxDQUFMO0FBQU8sZUFBTyxVQUFTQSxDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlO0FBQUMsaUJBQU9KLEVBQUUzVCxJQUFGLENBQU92SixDQUFQLEVBQVM2YyxDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixDQUFQO0FBQXVCLFNBQTlDLENBQStDLEtBQUssQ0FBTDtBQUFPLGVBQU8sVUFBU1QsQ0FBVCxFQUFXRSxDQUFYLEVBQWFPLENBQWIsRUFBZTFILENBQWYsRUFBaUI7QUFBQyxpQkFBT3NILEVBQUUzVCxJQUFGLENBQU92SixDQUFQLEVBQVM2YyxDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlMUgsQ0FBZixDQUFQO0FBQXlCLFNBQWxELENBQS9ILENBQWtMLE9BQU8sWUFBVTtBQUFDLGFBQU9zSCxFQUFFNVQsS0FBRixDQUFRdEosQ0FBUixFQUFVd0osU0FBVixDQUFQO0FBQTRCLEtBQTlDO0FBQStDLEdBQWhSO0FBQUEsTUFBaVJ1VSxJQUFFLFNBQUZBLENBQUUsQ0FBU2xCLENBQVQsRUFBV0UsQ0FBWCxFQUFhTyxDQUFiLEVBQWU7QUFBQyxXQUFPOVcsRUFBRXdYLFFBQUYsS0FBYUgsQ0FBYixHQUFlclgsRUFBRXdYLFFBQUYsQ0FBV25CLENBQVgsRUFBYUUsQ0FBYixDQUFmLEdBQStCLFFBQU1GLENBQU4sR0FBUXJXLEVBQUV5WCxRQUFWLEdBQW1CelgsRUFBRTBYLFVBQUYsQ0FBYXJCLENBQWIsSUFBZ0JpQixFQUFFakIsQ0FBRixFQUFJRSxDQUFKLEVBQU1PLENBQU4sQ0FBaEIsR0FBeUI5VyxFQUFFMlgsUUFBRixDQUFXdEIsQ0FBWCxLQUFlLENBQUNyVyxFQUFFTSxPQUFGLENBQVUrVixDQUFWLENBQWhCLEdBQTZCclcsRUFBRTRYLE9BQUYsQ0FBVXZCLENBQVYsQ0FBN0IsR0FBMENyVyxFQUFFNlgsUUFBRixDQUFXeEIsQ0FBWCxDQUE1SDtBQUEwSSxHQUE3YSxDQUE4YXJXLEVBQUV3WCxRQUFGLEdBQVdILElBQUUsV0FBU2hCLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsV0FBT2dCLEVBQUVsQixDQUFGLEVBQUlFLENBQUosRUFBTSxJQUFFLENBQVIsQ0FBUDtBQUFrQixHQUE3QyxDQUE4QyxJQUFJdUIsSUFBRSxTQUFGQSxDQUFFLENBQVNwQixDQUFULEVBQVdsZCxDQUFYLEVBQWE7QUFBQyxXQUFPQSxJQUFFLFFBQU1BLENBQU4sR0FBUWtkLEVBQUVqZCxNQUFGLEdBQVMsQ0FBakIsR0FBbUIsQ0FBQ0QsQ0FBdEIsRUFBd0IsWUFBVTtBQUFDLFdBQUksSUFBSTZjLElBQUV6VixLQUFLbVgsR0FBTCxDQUFTL1UsVUFBVXZKLE1BQVYsR0FBaUJELENBQTFCLEVBQTRCLENBQTVCLENBQU4sRUFBcUMrYyxJQUFFbFcsTUFBTWdXLENBQU4sQ0FBdkMsRUFBZ0RTLElBQUUsQ0FBdEQsRUFBd0RBLElBQUVULENBQTFELEVBQTREUyxHQUE1RDtBQUFnRVAsVUFBRU8sQ0FBRixJQUFLOVQsVUFBVThULElBQUV0ZCxDQUFaLENBQUw7QUFBaEUsT0FBb0YsUUFBT0EsQ0FBUCxHQUFVLEtBQUssQ0FBTDtBQUFPLGlCQUFPa2QsRUFBRTNULElBQUYsQ0FBTyxJQUFQLEVBQVl3VCxDQUFaLENBQVAsQ0FBc0IsS0FBSyxDQUFMO0FBQU8saUJBQU9HLEVBQUUzVCxJQUFGLENBQU8sSUFBUCxFQUFZQyxVQUFVLENBQVYsQ0FBWixFQUF5QnVULENBQXpCLENBQVAsQ0FBbUMsS0FBSyxDQUFMO0FBQU8saUJBQU9HLEVBQUUzVCxJQUFGLENBQU8sSUFBUCxFQUFZQyxVQUFVLENBQVYsQ0FBWixFQUF5QkEsVUFBVSxDQUFWLENBQXpCLEVBQXNDdVQsQ0FBdEMsQ0FBUCxDQUF4RixDQUF3SSxJQUFJbkgsSUFBRS9PLE1BQU03RyxJQUFFLENBQVIsQ0FBTixDQUFpQixLQUFJc2QsSUFBRSxDQUFOLEVBQVFBLElBQUV0ZCxDQUFWLEVBQVlzZCxHQUFaO0FBQWdCMUgsVUFBRTBILENBQUYsSUFBSzlULFVBQVU4VCxDQUFWLENBQUw7QUFBaEIsT0FBa0MsT0FBTzFILEVBQUU1VixDQUFGLElBQUsrYyxDQUFMLEVBQU9HLEVBQUU1VCxLQUFGLENBQVEsSUFBUixFQUFhc00sQ0FBYixDQUFkO0FBQThCLEtBQXZWO0FBQXdWLEdBQTVXO0FBQUEsTUFBNlc0SSxJQUFFLFNBQUZBLENBQUUsQ0FBUzNCLENBQVQsRUFBVztBQUFDLFFBQUcsQ0FBQ3JXLEVBQUUyWCxRQUFGLENBQVd0QixDQUFYLENBQUosRUFBa0IsT0FBTSxFQUFOLENBQVMsSUFBR2pULENBQUgsRUFBSyxPQUFPQSxFQUFFaVQsQ0FBRixDQUFQLENBQVlXLEVBQUUzUyxTQUFGLEdBQVlnUyxDQUFaLENBQWMsSUFBSUUsSUFBRSxJQUFJUyxDQUFKLEVBQU4sQ0FBWSxPQUFPQSxFQUFFM1MsU0FBRixHQUFZLElBQVosRUFBaUJrUyxDQUF4QjtBQUEwQixHQUEzZDtBQUFBLE1BQTRkMEIsSUFBRSxTQUFGQSxDQUFFLENBQVMxQixDQUFULEVBQVc7QUFBQyxXQUFPLFVBQVNGLENBQVQsRUFBVztBQUFDLGFBQU8sUUFBTUEsQ0FBTixHQUFRLEtBQUssQ0FBYixHQUFlQSxFQUFFRSxDQUFGLENBQXRCO0FBQTJCLEtBQTlDO0FBQStDLEdBQXpoQjtBQUFBLE1BQTBoQmpULElBQUUsU0FBRkEsQ0FBRSxDQUFTK1MsQ0FBVCxFQUFXRSxDQUFYLEVBQWE7QUFBQyxXQUFPLFFBQU1GLENBQU4sSUFBUzdjLEVBQUV1SixJQUFGLENBQU9zVCxDQUFQLEVBQVNFLENBQVQsQ0FBaEI7QUFBNEIsR0FBdGtCO0FBQUEsTUFBdWtCMkIsSUFBRSxTQUFGQSxDQUFFLENBQVM3QixDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFNBQUksSUFBSU8sSUFBRVAsRUFBRTljLE1BQVIsRUFBZTJWLElBQUUsQ0FBckIsRUFBdUJBLElBQUUwSCxDQUF6QixFQUEyQjFILEdBQTNCLEVBQStCO0FBQUMsVUFBRyxRQUFNaUgsQ0FBVCxFQUFXLE9BQU9BLElBQUVBLEVBQUVFLEVBQUVuSCxDQUFGLENBQUYsQ0FBRjtBQUFVLFlBQU8wSCxJQUFFVCxDQUFGLEdBQUksS0FBSyxDQUFoQjtBQUFrQixHQUFycUI7QUFBQSxNQUFzcUI3VixJQUFFSSxLQUFLdVgsR0FBTCxDQUFTLENBQVQsRUFBVyxFQUFYLElBQWUsQ0FBdnJCO0FBQUEsTUFBeXJCQyxJQUFFSCxFQUFFLFFBQUYsQ0FBM3JCO0FBQUEsTUFBdXNCblksSUFBRSxTQUFGQSxDQUFFLENBQVN1VyxDQUFULEVBQVc7QUFBQyxRQUFJRSxJQUFFNkIsRUFBRS9CLENBQUYsQ0FBTixDQUFXLE9BQU0sWUFBVSxPQUFPRSxDQUFqQixJQUFvQixLQUFHQSxDQUF2QixJQUEwQkEsS0FBRy9WLENBQW5DO0FBQXFDLEdBQXJ3QixDQUFzd0JSLEVBQUVxWSxJQUFGLEdBQU9yWSxFQUFFWixPQUFGLEdBQVUsVUFBU2lYLENBQVQsRUFBV0UsQ0FBWCxFQUFhTyxDQUFiLEVBQWU7QUFBQyxRQUFJMUgsQ0FBSixFQUFNc0gsQ0FBTixDQUFRLElBQUdILElBQUVlLEVBQUVmLENBQUYsRUFBSU8sQ0FBSixDQUFGLEVBQVNoWCxFQUFFdVcsQ0FBRixDQUFaLEVBQWlCLEtBQUlqSCxJQUFFLENBQUYsRUFBSXNILElBQUVMLEVBQUU1YyxNQUFaLEVBQW1CMlYsSUFBRXNILENBQXJCLEVBQXVCdEgsR0FBdkI7QUFBMkJtSCxRQUFFRixFQUFFakgsQ0FBRixDQUFGLEVBQU9BLENBQVAsRUFBU2lILENBQVQ7QUFBM0IsS0FBakIsTUFBNEQ7QUFBQyxVQUFJN2MsSUFBRXdHLEVBQUViLElBQUYsQ0FBT2tYLENBQVAsQ0FBTixDQUFnQixLQUFJakgsSUFBRSxDQUFGLEVBQUlzSCxJQUFFbGQsRUFBRUMsTUFBWixFQUFtQjJWLElBQUVzSCxDQUFyQixFQUF1QnRILEdBQXZCO0FBQTJCbUgsVUFBRUYsRUFBRTdjLEVBQUU0VixDQUFGLENBQUYsQ0FBRixFQUFVNVYsRUFBRTRWLENBQUYsQ0FBVixFQUFlaUgsQ0FBZjtBQUEzQjtBQUE2QyxZQUFPQSxDQUFQO0FBQVMsR0FBNUssRUFBNktyVyxFQUFFVyxHQUFGLEdBQU1YLEVBQUVzWSxPQUFGLEdBQVUsVUFBU2pDLENBQVQsRUFBV0UsQ0FBWCxFQUFhTyxDQUFiLEVBQWU7QUFBQ1AsUUFBRWdCLEVBQUVoQixDQUFGLEVBQUlPLENBQUosQ0FBRixDQUFTLEtBQUksSUFBSTFILElBQUUsQ0FBQ3RQLEVBQUV1VyxDQUFGLENBQUQsSUFBT3JXLEVBQUViLElBQUYsQ0FBT2tYLENBQVAsQ0FBYixFQUF1QkssSUFBRSxDQUFDdEgsS0FBR2lILENBQUosRUFBTzVjLE1BQWhDLEVBQXVDRCxJQUFFNkcsTUFBTXFXLENBQU4sQ0FBekMsRUFBa0RGLElBQUUsQ0FBeEQsRUFBMERBLElBQUVFLENBQTVELEVBQThERixHQUE5RCxFQUFrRTtBQUFDLFVBQUlPLElBQUUzSCxJQUFFQSxFQUFFb0gsQ0FBRixDQUFGLEdBQU9BLENBQWIsQ0FBZWhkLEVBQUVnZCxDQUFGLElBQUtELEVBQUVGLEVBQUVVLENBQUYsQ0FBRixFQUFPQSxDQUFQLEVBQVNWLENBQVQsQ0FBTDtBQUFpQixZQUFPN2MsQ0FBUDtBQUFTLEdBQWxVLENBQW1VLElBQUkrZSxJQUFFLFNBQUZBLENBQUUsQ0FBUzVCLENBQVQsRUFBVztBQUFDLFdBQU8sVUFBU04sQ0FBVCxFQUFXRSxDQUFYLEVBQWFPLENBQWIsRUFBZTFILENBQWYsRUFBaUI7QUFBQyxVQUFJc0gsSUFBRSxLQUFHMVQsVUFBVXZKLE1BQW5CLENBQTBCLE9BQU8sVUFBUzRjLENBQVQsRUFBV0UsQ0FBWCxFQUFhTyxDQUFiLEVBQWUxSCxDQUFmLEVBQWlCO0FBQUMsWUFBSXNILElBQUUsQ0FBQzVXLEVBQUV1VyxDQUFGLENBQUQsSUFBT3JXLEVBQUViLElBQUYsQ0FBT2tYLENBQVAsQ0FBYjtBQUFBLFlBQXVCN2MsSUFBRSxDQUFDa2QsS0FBR0wsQ0FBSixFQUFPNWMsTUFBaEM7QUFBQSxZQUF1QytjLElBQUUsSUFBRUcsQ0FBRixHQUFJLENBQUosR0FBTW5kLElBQUUsQ0FBakQsQ0FBbUQsS0FBSTRWLE1BQUkwSCxJQUFFVCxFQUFFSyxJQUFFQSxFQUFFRixDQUFGLENBQUYsR0FBT0EsQ0FBVCxDQUFGLEVBQWNBLEtBQUdHLENBQXJCLENBQUosRUFBNEIsS0FBR0gsQ0FBSCxJQUFNQSxJQUFFaGQsQ0FBcEMsRUFBc0NnZCxLQUFHRyxDQUF6QyxFQUEyQztBQUFDLGNBQUlJLElBQUVMLElBQUVBLEVBQUVGLENBQUYsQ0FBRixHQUFPQSxDQUFiLENBQWVNLElBQUVQLEVBQUVPLENBQUYsRUFBSVQsRUFBRVUsQ0FBRixDQUFKLEVBQVNBLENBQVQsRUFBV1YsQ0FBWCxDQUFGO0FBQWdCLGdCQUFPUyxDQUFQO0FBQVMsT0FBekosQ0FBMEpULENBQTFKLEVBQTRKaUIsRUFBRWYsQ0FBRixFQUFJbkgsQ0FBSixFQUFNLENBQU4sQ0FBNUosRUFBcUswSCxDQUFySyxFQUF1S0osQ0FBdkssQ0FBUDtBQUFpTCxLQUFwTztBQUFxTyxHQUF2UCxDQUF3UDFXLEVBQUV3WSxNQUFGLEdBQVN4WSxFQUFFeVksS0FBRixHQUFRelksRUFBRTBZLE1BQUYsR0FBU0gsRUFBRSxDQUFGLENBQTFCLEVBQStCdlksRUFBRTJZLFdBQUYsR0FBYzNZLEVBQUU0WSxLQUFGLEdBQVFMLEVBQUUsQ0FBQyxDQUFILENBQXJELEVBQTJEdlksRUFBRWtTLElBQUYsR0FBT2xTLEVBQUU2WSxNQUFGLEdBQVMsVUFBU3hDLENBQVQsRUFBV0UsQ0FBWCxFQUFhTyxDQUFiLEVBQWU7QUFBQyxRQUFJMUgsSUFBRSxDQUFDdFAsRUFBRXVXLENBQUYsSUFBS3JXLEVBQUVrRixTQUFQLEdBQWlCbEYsRUFBRThZLE9BQXBCLEVBQTZCekMsQ0FBN0IsRUFBK0JFLENBQS9CLEVBQWlDTyxDQUFqQyxDQUFOLENBQTBDLElBQUcsS0FBSyxDQUFMLEtBQVMxSCxDQUFULElBQVksQ0FBQyxDQUFELEtBQUtBLENBQXBCLEVBQXNCLE9BQU9pSCxFQUFFakgsQ0FBRixDQUFQO0FBQVksR0FBdkssRUFBd0twUCxFQUFFTyxNQUFGLEdBQVNQLEVBQUUrWSxNQUFGLEdBQVMsVUFBUzFDLENBQVQsRUFBV2pILENBQVgsRUFBYW1ILENBQWIsRUFBZTtBQUFDLFFBQUlHLElBQUUsRUFBTixDQUFTLE9BQU90SCxJQUFFbUksRUFBRW5JLENBQUYsRUFBSW1ILENBQUosQ0FBRixFQUFTdlcsRUFBRXFZLElBQUYsQ0FBT2hDLENBQVAsRUFBUyxVQUFTQSxDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlO0FBQUMxSCxRQUFFaUgsQ0FBRixFQUFJRSxDQUFKLEVBQU1PLENBQU4sS0FBVUosRUFBRTVWLElBQUYsQ0FBT3VWLENBQVAsQ0FBVjtBQUFvQixLQUE3QyxDQUFULEVBQXdESyxDQUEvRDtBQUFpRSxHQUFwUixFQUFxUjFXLEVBQUUyTixNQUFGLEdBQVMsVUFBUzBJLENBQVQsRUFBV0UsQ0FBWCxFQUFhTyxDQUFiLEVBQWU7QUFBQyxXQUFPOVcsRUFBRU8sTUFBRixDQUFTOFYsQ0FBVCxFQUFXclcsRUFBRWdaLE1BQUYsQ0FBU3pCLEVBQUVoQixDQUFGLENBQVQsQ0FBWCxFQUEwQk8sQ0FBMUIsQ0FBUDtBQUFvQyxHQUFsVixFQUFtVjlXLEVBQUVnUyxLQUFGLEdBQVFoUyxFQUFFa0QsR0FBRixHQUFNLFVBQVNtVCxDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlO0FBQUNQLFFBQUVnQixFQUFFaEIsQ0FBRixFQUFJTyxDQUFKLENBQUYsQ0FBUyxLQUFJLElBQUkxSCxJQUFFLENBQUN0UCxFQUFFdVcsQ0FBRixDQUFELElBQU9yVyxFQUFFYixJQUFGLENBQU9rWCxDQUFQLENBQWIsRUFBdUJLLElBQUUsQ0FBQ3RILEtBQUdpSCxDQUFKLEVBQU81YyxNQUFoQyxFQUF1Q0QsSUFBRSxDQUE3QyxFQUErQ0EsSUFBRWtkLENBQWpELEVBQW1EbGQsR0FBbkQsRUFBdUQ7QUFBQyxVQUFJZ2QsSUFBRXBILElBQUVBLEVBQUU1VixDQUFGLENBQUYsR0FBT0EsQ0FBYixDQUFlLElBQUcsQ0FBQytjLEVBQUVGLEVBQUVHLENBQUYsQ0FBRixFQUFPQSxDQUFQLEVBQVNILENBQVQsQ0FBSixFQUFnQixPQUFNLENBQUMsQ0FBUDtBQUFTLFlBQU0sQ0FBQyxDQUFQO0FBQVMsR0FBbmUsRUFBb2VyVyxFQUFFaVosSUFBRixHQUFPalosRUFBRWtaLEdBQUYsR0FBTSxVQUFTN0MsQ0FBVCxFQUFXRSxDQUFYLEVBQWFPLENBQWIsRUFBZTtBQUFDUCxRQUFFZ0IsRUFBRWhCLENBQUYsRUFBSU8sQ0FBSixDQUFGLENBQVMsS0FBSSxJQUFJMUgsSUFBRSxDQUFDdFAsRUFBRXVXLENBQUYsQ0FBRCxJQUFPclcsRUFBRWIsSUFBRixDQUFPa1gsQ0FBUCxDQUFiLEVBQXVCSyxJQUFFLENBQUN0SCxLQUFHaUgsQ0FBSixFQUFPNWMsTUFBaEMsRUFBdUNELElBQUUsQ0FBN0MsRUFBK0NBLElBQUVrZCxDQUFqRCxFQUFtRGxkLEdBQW5ELEVBQXVEO0FBQUMsVUFBSWdkLElBQUVwSCxJQUFFQSxFQUFFNVYsQ0FBRixDQUFGLEdBQU9BLENBQWIsQ0FBZSxJQUFHK2MsRUFBRUYsRUFBRUcsQ0FBRixDQUFGLEVBQU9BLENBQVAsRUFBU0gsQ0FBVCxDQUFILEVBQWUsT0FBTSxDQUFDLENBQVA7QUFBUyxZQUFNLENBQUMsQ0FBUDtBQUFTLEdBQWxuQixFQUFtbkJyVyxFQUFFd1QsUUFBRixHQUFXeFQsRUFBRW1aLFFBQUYsR0FBV25aLEVBQUVvWixPQUFGLEdBQVUsVUFBUy9DLENBQVQsRUFBV0UsQ0FBWCxFQUFhTyxDQUFiLEVBQWUxSCxDQUFmLEVBQWlCO0FBQUMsV0FBT3RQLEVBQUV1VyxDQUFGLE1BQU9BLElBQUVyVyxFQUFFaVEsTUFBRixDQUFTb0csQ0FBVCxDQUFULEdBQXNCLENBQUMsWUFBVSxPQUFPUyxDQUFqQixJQUFvQjFILENBQXJCLE1BQTBCMEgsSUFBRSxDQUE1QixDQUF0QixFQUFxRCxLQUFHOVcsRUFBRUwsT0FBRixDQUFVMFcsQ0FBVixFQUFZRSxDQUFaLEVBQWNPLENBQWQsQ0FBL0Q7QUFBZ0YsR0FBcnZCLEVBQXN2QjlXLEVBQUVxWixNQUFGLEdBQVN2QixFQUFFLFVBQVN6QixDQUFULEVBQVdTLENBQVgsRUFBYTFILENBQWIsRUFBZTtBQUFDLFFBQUlzSCxDQUFKLEVBQU1sZCxDQUFOLENBQVEsT0FBT3dHLEVBQUUwWCxVQUFGLENBQWFaLENBQWIsSUFBZ0J0ZCxJQUFFc2QsQ0FBbEIsR0FBb0I5VyxFQUFFTSxPQUFGLENBQVV3VyxDQUFWLE1BQWVKLElBQUVJLEVBQUV2WCxLQUFGLENBQVEsQ0FBUixFQUFVLENBQUMsQ0FBWCxDQUFGLEVBQWdCdVgsSUFBRUEsRUFBRUEsRUFBRXJkLE1BQUYsR0FBUyxDQUFYLENBQWpDLENBQXBCLEVBQW9FdUcsRUFBRVcsR0FBRixDQUFNMFYsQ0FBTixFQUFRLFVBQVNBLENBQVQsRUFBVztBQUFDLFVBQUlFLElBQUUvYyxDQUFOLENBQVEsSUFBRyxDQUFDK2MsQ0FBSixFQUFNO0FBQUMsWUFBR0csS0FBR0EsRUFBRWpkLE1BQUwsS0FBYzRjLElBQUU2QixFQUFFN0IsQ0FBRixFQUFJSyxDQUFKLENBQWhCLEdBQXdCLFFBQU1MLENBQWpDLEVBQW1DLE9BQU9FLElBQUVGLEVBQUVTLENBQUYsQ0FBRjtBQUFPLGNBQU8sUUFBTVAsQ0FBTixHQUFRQSxDQUFSLEdBQVVBLEVBQUV6VCxLQUFGLENBQVF1VCxDQUFSLEVBQVVqSCxDQUFWLENBQWpCO0FBQThCLEtBQWxILENBQTNFO0FBQStMLEdBQXpOLENBQS92QixFQUEwOUJwUCxFQUFFc1osS0FBRixHQUFRLFVBQVNqRCxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFdBQU92VyxFQUFFVyxHQUFGLENBQU0wVixDQUFOLEVBQVFyVyxFQUFFNlgsUUFBRixDQUFXdEIsQ0FBWCxDQUFSLENBQVA7QUFBOEIsR0FBOWdDLEVBQStnQ3ZXLEVBQUV1WixLQUFGLEdBQVEsVUFBU2xELENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsV0FBT3ZXLEVBQUVPLE1BQUYsQ0FBUzhWLENBQVQsRUFBV3JXLEVBQUU0WCxPQUFGLENBQVVyQixDQUFWLENBQVgsQ0FBUDtBQUFnQyxHQUFya0MsRUFBc2tDdlcsRUFBRWdGLFNBQUYsR0FBWSxVQUFTcVIsQ0FBVCxFQUFXRSxDQUFYLEVBQWE7QUFBQyxXQUFPdlcsRUFBRWtTLElBQUYsQ0FBT21FLENBQVAsRUFBU3JXLEVBQUU0WCxPQUFGLENBQVVyQixDQUFWLENBQVQsQ0FBUDtBQUE4QixHQUE5bkMsRUFBK25DdlcsRUFBRStYLEdBQUYsR0FBTSxVQUFTMUIsQ0FBVCxFQUFXakgsQ0FBWCxFQUFhbUgsQ0FBYixFQUFlO0FBQUMsUUFBSU8sQ0FBSjtBQUFBLFFBQU1KLENBQU47QUFBQSxRQUFRbGQsSUFBRSxDQUFDLENBQUQsR0FBRyxDQUFiO0FBQUEsUUFBZWdkLElBQUUsQ0FBQyxDQUFELEdBQUcsQ0FBcEIsQ0FBc0IsSUFBRyxRQUFNcEgsQ0FBTixJQUFTLFlBQVUsT0FBT0EsQ0FBakIsSUFBb0Isb0JBQWlCaUgsRUFBRSxDQUFGLENBQWpCLENBQXBCLElBQTJDLFFBQU1BLENBQTdELEVBQStELEtBQUksSUFBSVUsSUFBRSxDQUFOLEVBQVFKLElBQUUsQ0FBQ04sSUFBRXZXLEVBQUV1VyxDQUFGLElBQUtBLENBQUwsR0FBT3JXLEVBQUVpUSxNQUFGLENBQVNvRyxDQUFULENBQVYsRUFBdUI1YyxNQUFyQyxFQUE0Q3NkLElBQUVKLENBQTlDLEVBQWdESSxHQUFoRDtBQUFvRCxlQUFPRCxJQUFFVCxFQUFFVSxDQUFGLENBQVQsS0FBZ0J2ZCxJQUFFc2QsQ0FBbEIsS0FBc0J0ZCxJQUFFc2QsQ0FBeEI7QUFBcEQsS0FBL0QsTUFBbUoxSCxJQUFFbUksRUFBRW5JLENBQUYsRUFBSW1ILENBQUosQ0FBRixFQUFTdlcsRUFBRXFZLElBQUYsQ0FBT2hDLENBQVAsRUFBUyxVQUFTQSxDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlO0FBQUNKLFVBQUV0SCxFQUFFaUgsQ0FBRixFQUFJRSxDQUFKLEVBQU1PLENBQU4sQ0FBRixFQUFXLENBQUNOLElBQUVFLENBQUYsSUFBS0EsTUFBSSxDQUFDLENBQUQsR0FBRyxDQUFQLElBQVVsZCxNQUFJLENBQUMsQ0FBRCxHQUFHLENBQXZCLE1BQTRCQSxJQUFFNmMsQ0FBRixFQUFJRyxJQUFFRSxDQUFsQyxDQUFYO0FBQWdELEtBQXpFLENBQVQsQ0FBb0YsT0FBT2xkLENBQVA7QUFBUyxHQUEzNUMsRUFBNDVDd0csRUFBRXdaLEdBQUYsR0FBTSxVQUFTbkQsQ0FBVCxFQUFXakgsQ0FBWCxFQUFhbUgsQ0FBYixFQUFlO0FBQUMsUUFBSU8sQ0FBSjtBQUFBLFFBQU1KLENBQU47QUFBQSxRQUFRbGQsSUFBRSxJQUFFLENBQVo7QUFBQSxRQUFjZ2QsSUFBRSxJQUFFLENBQWxCLENBQW9CLElBQUcsUUFBTXBILENBQU4sSUFBUyxZQUFVLE9BQU9BLENBQWpCLElBQW9CLG9CQUFpQmlILEVBQUUsQ0FBRixDQUFqQixDQUFwQixJQUEyQyxRQUFNQSxDQUE3RCxFQUErRCxLQUFJLElBQUlVLElBQUUsQ0FBTixFQUFRSixJQUFFLENBQUNOLElBQUV2VyxFQUFFdVcsQ0FBRixJQUFLQSxDQUFMLEdBQU9yVyxFQUFFaVEsTUFBRixDQUFTb0csQ0FBVCxDQUFWLEVBQXVCNWMsTUFBckMsRUFBNENzZCxJQUFFSixDQUE5QyxFQUFnREksR0FBaEQ7QUFBb0QsZUFBT0QsSUFBRVQsRUFBRVUsQ0FBRixDQUFULEtBQWdCRCxJQUFFdGQsQ0FBbEIsS0FBc0JBLElBQUVzZCxDQUF4QjtBQUFwRCxLQUEvRCxNQUFtSjFILElBQUVtSSxFQUFFbkksQ0FBRixFQUFJbUgsQ0FBSixDQUFGLEVBQVN2VyxFQUFFcVksSUFBRixDQUFPaEMsQ0FBUCxFQUFTLFVBQVNBLENBQVQsRUFBV0UsQ0FBWCxFQUFhTyxDQUFiLEVBQWU7QUFBQyxPQUFDLENBQUNKLElBQUV0SCxFQUFFaUgsQ0FBRixFQUFJRSxDQUFKLEVBQU1PLENBQU4sQ0FBSCxJQUFhTixDQUFiLElBQWdCRSxNQUFJLElBQUUsQ0FBTixJQUFTbGQsTUFBSSxJQUFFLENBQWhDLE1BQXFDQSxJQUFFNmMsQ0FBRixFQUFJRyxJQUFFRSxDQUEzQztBQUE4QyxLQUF2RSxDQUFULENBQWtGLE9BQU9sZCxDQUFQO0FBQVMsR0FBcHJELEVBQXFyRHdHLEVBQUV5WixPQUFGLEdBQVUsVUFBU3BELENBQVQsRUFBVztBQUFDLFdBQU9yVyxFQUFFMFosTUFBRixDQUFTckQsQ0FBVCxFQUFXLElBQUUsQ0FBYixDQUFQO0FBQXVCLEdBQWx1RCxFQUFtdURyVyxFQUFFMFosTUFBRixHQUFTLFVBQVNyRCxDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlO0FBQUMsUUFBRyxRQUFNUCxDQUFOLElBQVNPLENBQVosRUFBYyxPQUFPaFgsRUFBRXVXLENBQUYsTUFBT0EsSUFBRXJXLEVBQUVpUSxNQUFGLENBQVNvRyxDQUFULENBQVQsR0FBc0JBLEVBQUVyVyxFQUFFMlosTUFBRixDQUFTdEQsRUFBRTVjLE1BQUYsR0FBUyxDQUFsQixDQUFGLENBQTdCLENBQXFELElBQUkyVixJQUFFdFAsRUFBRXVXLENBQUYsSUFBS3JXLEVBQUU0WixLQUFGLENBQVF2RCxDQUFSLENBQUwsR0FBZ0JyVyxFQUFFaVEsTUFBRixDQUFTb0csQ0FBVCxDQUF0QjtBQUFBLFFBQWtDSyxJQUFFMEIsRUFBRWhKLENBQUYsQ0FBcEMsQ0FBeUNtSCxJQUFFM1YsS0FBS21YLEdBQUwsQ0FBU25YLEtBQUs0WSxHQUFMLENBQVNqRCxDQUFULEVBQVdHLENBQVgsQ0FBVCxFQUF1QixDQUF2QixDQUFGLENBQTRCLEtBQUksSUFBSWxkLElBQUVrZCxJQUFFLENBQVIsRUFBVUYsSUFBRSxDQUFoQixFQUFrQkEsSUFBRUQsQ0FBcEIsRUFBc0JDLEdBQXRCLEVBQTBCO0FBQUMsVUFBSU8sSUFBRS9XLEVBQUUyWixNQUFGLENBQVNuRCxDQUFULEVBQVdoZCxDQUFYLENBQU47QUFBQSxVQUFvQm1kLElBQUV2SCxFQUFFb0gsQ0FBRixDQUF0QixDQUEyQnBILEVBQUVvSCxDQUFGLElBQUtwSCxFQUFFMkgsQ0FBRixDQUFMLEVBQVUzSCxFQUFFMkgsQ0FBRixJQUFLSixDQUFmO0FBQWlCLFlBQU92SCxFQUFFN1AsS0FBRixDQUFRLENBQVIsRUFBVWdYLENBQVYsQ0FBUDtBQUFvQixHQUEvOUQsRUFBZytEdlcsRUFBRTZaLE1BQUYsR0FBUyxVQUFTeEQsQ0FBVCxFQUFXakgsQ0FBWCxFQUFhbUgsQ0FBYixFQUFlO0FBQUMsUUFBSUcsSUFBRSxDQUFOLENBQVEsT0FBT3RILElBQUVtSSxFQUFFbkksQ0FBRixFQUFJbUgsQ0FBSixDQUFGLEVBQVN2VyxFQUFFc1osS0FBRixDQUFRdFosRUFBRVcsR0FBRixDQUFNMFYsQ0FBTixFQUFRLFVBQVNBLENBQVQsRUFBV0UsQ0FBWCxFQUFhTyxDQUFiLEVBQWU7QUFBQyxhQUFNLEVBQUNySixPQUFNNEksQ0FBUCxFQUFTeFcsT0FBTTZXLEdBQWYsRUFBbUJvRCxVQUFTMUssRUFBRWlILENBQUYsRUFBSUUsQ0FBSixFQUFNTyxDQUFOLENBQTVCLEVBQU47QUFBNEMsS0FBcEUsRUFBc0UvVixJQUF0RSxDQUEyRSxVQUFTc1YsQ0FBVCxFQUFXRSxDQUFYLEVBQWE7QUFBQyxVQUFJTyxJQUFFVCxFQUFFeUQsUUFBUjtBQUFBLFVBQWlCMUssSUFBRW1ILEVBQUV1RCxRQUFyQixDQUE4QixJQUFHaEQsTUFBSTFILENBQVAsRUFBUztBQUFDLFlBQUdBLElBQUUwSCxDQUFGLElBQUssS0FBSyxDQUFMLEtBQVNBLENBQWpCLEVBQW1CLE9BQU8sQ0FBUCxDQUFTLElBQUdBLElBQUUxSCxDQUFGLElBQUssS0FBSyxDQUFMLEtBQVNBLENBQWpCLEVBQW1CLE9BQU0sQ0FBQyxDQUFQO0FBQVMsY0FBT2lILEVBQUV4VyxLQUFGLEdBQVEwVyxFQUFFMVcsS0FBakI7QUFBdUIsS0FBaE4sQ0FBUixFQUEwTixPQUExTixDQUFoQjtBQUFtUCxHQUFwdkUsQ0FBcXZFLElBQUkwRCxJQUFFLFNBQUZBLENBQUUsQ0FBU2lULENBQVQsRUFBV0QsQ0FBWCxFQUFhO0FBQUMsV0FBTyxVQUFTbkgsQ0FBVCxFQUFXc0gsQ0FBWCxFQUFhTCxDQUFiLEVBQWU7QUFBQyxVQUFJN2MsSUFBRStjLElBQUUsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFGLEdBQVUsRUFBaEIsQ0FBbUIsT0FBT0csSUFBRWEsRUFBRWIsQ0FBRixFQUFJTCxDQUFKLENBQUYsRUFBU3JXLEVBQUVxWSxJQUFGLENBQU9qSixDQUFQLEVBQVMsVUFBU2lILENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsWUFBSU8sSUFBRUosRUFBRUwsQ0FBRixFQUFJRSxDQUFKLEVBQU1uSCxDQUFOLENBQU4sQ0FBZW9ILEVBQUVoZCxDQUFGLEVBQUk2YyxDQUFKLEVBQU1TLENBQU47QUFBUyxPQUEvQyxDQUFULEVBQTBEdGQsQ0FBakU7QUFBbUUsS0FBN0c7QUFBOEcsR0FBbEksQ0FBbUl3RyxFQUFFK1osT0FBRixHQUFVeFcsRUFBRSxVQUFTOFMsQ0FBVCxFQUFXRSxDQUFYLEVBQWFPLENBQWIsRUFBZTtBQUFDeFQsTUFBRStTLENBQUYsRUFBSVMsQ0FBSixJQUFPVCxFQUFFUyxDQUFGLEVBQUtoVyxJQUFMLENBQVV5VixDQUFWLENBQVAsR0FBb0JGLEVBQUVTLENBQUYsSUFBSyxDQUFDUCxDQUFELENBQXpCO0FBQTZCLEdBQS9DLENBQVYsRUFBMkR2VyxFQUFFZ2EsT0FBRixHQUFVelcsRUFBRSxVQUFTOFMsQ0FBVCxFQUFXRSxDQUFYLEVBQWFPLENBQWIsRUFBZTtBQUFDVCxNQUFFUyxDQUFGLElBQUtQLENBQUw7QUFBTyxHQUF6QixDQUFyRSxFQUFnR3ZXLEVBQUVpYSxPQUFGLEdBQVUxVyxFQUFFLFVBQVM4UyxDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlO0FBQUN4VCxNQUFFK1MsQ0FBRixFQUFJUyxDQUFKLElBQU9ULEVBQUVTLENBQUYsR0FBUCxHQUFjVCxFQUFFUyxDQUFGLElBQUssQ0FBbkI7QUFBcUIsR0FBdkMsQ0FBMUcsQ0FBbUosSUFBSW9ELElBQUUsa0VBQU4sQ0FBeUVsYSxFQUFFbWEsT0FBRixHQUFVLFVBQVM5RCxDQUFULEVBQVc7QUFBQyxXQUFPQSxJQUFFclcsRUFBRU0sT0FBRixDQUFVK1YsQ0FBVixJQUFhTSxFQUFFNVQsSUFBRixDQUFPc1QsQ0FBUCxDQUFiLEdBQXVCclcsRUFBRW9hLFFBQUYsQ0FBVy9ELENBQVgsSUFBY0EsRUFBRWdFLEtBQUYsQ0FBUUgsQ0FBUixDQUFkLEdBQXlCcGEsRUFBRXVXLENBQUYsSUFBS3JXLEVBQUVXLEdBQUYsQ0FBTTBWLENBQU4sRUFBUXJXLEVBQUV5WCxRQUFWLENBQUwsR0FBeUJ6WCxFQUFFaVEsTUFBRixDQUFTb0csQ0FBVCxDQUEzRSxHQUF1RixFQUE5RjtBQUFpRyxHQUF2SCxFQUF3SHJXLEVBQUVzYSxJQUFGLEdBQU8sVUFBU2pFLENBQVQsRUFBVztBQUFDLFdBQU8sUUFBTUEsQ0FBTixHQUFRLENBQVIsR0FBVXZXLEVBQUV1VyxDQUFGLElBQUtBLEVBQUU1YyxNQUFQLEdBQWN1RyxFQUFFYixJQUFGLENBQU9rWCxDQUFQLEVBQVU1YyxNQUF6QztBQUFnRCxHQUEzTCxFQUE0THVHLEVBQUV1YSxTQUFGLEdBQVloWCxFQUFFLFVBQVM4UyxDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlO0FBQUNULE1BQUVTLElBQUUsQ0FBRixHQUFJLENBQU4sRUFBU2hXLElBQVQsQ0FBY3lWLENBQWQ7QUFBaUIsR0FBbkMsRUFBb0MsQ0FBQyxDQUFyQyxDQUF4TSxFQUFnUHZXLEVBQUV3YSxLQUFGLEdBQVF4YSxFQUFFeWEsSUFBRixHQUFPemEsRUFBRTBhLElBQUYsR0FBTyxVQUFTckUsQ0FBVCxFQUFXRSxDQUFYLEVBQWFPLENBQWIsRUFBZTtBQUFDLFdBQU8sUUFBTVQsQ0FBTixJQUFTQSxFQUFFNWMsTUFBRixHQUFTLENBQWxCLEdBQW9CLFFBQU04YyxDQUFOLEdBQVEsS0FBSyxDQUFiLEdBQWUsRUFBbkMsR0FBc0MsUUFBTUEsQ0FBTixJQUFTTyxDQUFULEdBQVdULEVBQUUsQ0FBRixDQUFYLEdBQWdCclcsRUFBRTJhLE9BQUYsQ0FBVXRFLENBQVYsRUFBWUEsRUFBRTVjLE1BQUYsR0FBUzhjLENBQXJCLENBQTdEO0FBQXFGLEdBQTNXLEVBQTRXdlcsRUFBRTJhLE9BQUYsR0FBVSxVQUFTdEUsQ0FBVCxFQUFXRSxDQUFYLEVBQWFPLENBQWIsRUFBZTtBQUFDLFdBQU9ILEVBQUU1VCxJQUFGLENBQU9zVCxDQUFQLEVBQVMsQ0FBVCxFQUFXelYsS0FBS21YLEdBQUwsQ0FBUyxDQUFULEVBQVcxQixFQUFFNWMsTUFBRixJQUFVLFFBQU04YyxDQUFOLElBQVNPLENBQVQsR0FBVyxDQUFYLEdBQWFQLENBQXZCLENBQVgsQ0FBWCxDQUFQO0FBQXlELEdBQS9iLEVBQWdjdlcsRUFBRTRhLElBQUYsR0FBTyxVQUFTdkUsQ0FBVCxFQUFXRSxDQUFYLEVBQWFPLENBQWIsRUFBZTtBQUFDLFdBQU8sUUFBTVQsQ0FBTixJQUFTQSxFQUFFNWMsTUFBRixHQUFTLENBQWxCLEdBQW9CLFFBQU04YyxDQUFOLEdBQVEsS0FBSyxDQUFiLEdBQWUsRUFBbkMsR0FBc0MsUUFBTUEsQ0FBTixJQUFTTyxDQUFULEdBQVdULEVBQUVBLEVBQUU1YyxNQUFGLEdBQVMsQ0FBWCxDQUFYLEdBQXlCdUcsRUFBRTZhLElBQUYsQ0FBT3hFLENBQVAsRUFBU3pWLEtBQUttWCxHQUFMLENBQVMsQ0FBVCxFQUFXMUIsRUFBRTVjLE1BQUYsR0FBUzhjLENBQXBCLENBQVQsQ0FBdEU7QUFBdUcsR0FBOWpCLEVBQStqQnZXLEVBQUU2YSxJQUFGLEdBQU83YSxFQUFFOGEsSUFBRixHQUFPOWEsRUFBRSthLElBQUYsR0FBTyxVQUFTMUUsQ0FBVCxFQUFXRSxDQUFYLEVBQWFPLENBQWIsRUFBZTtBQUFDLFdBQU9ILEVBQUU1VCxJQUFGLENBQU9zVCxDQUFQLEVBQVMsUUFBTUUsQ0FBTixJQUFTTyxDQUFULEdBQVcsQ0FBWCxHQUFhUCxDQUF0QixDQUFQO0FBQWdDLEdBQXBvQixFQUFxb0J2VyxFQUFFZ2IsT0FBRixHQUFVLFVBQVMzRSxDQUFULEVBQVc7QUFBQyxXQUFPclcsRUFBRU8sTUFBRixDQUFTOFYsQ0FBVCxFQUFXNEUsT0FBWCxDQUFQO0FBQTJCLEdBQXRyQixDQUF1ckIsSUFBSUMsSUFBRSxTQUFGQSxDQUFFLENBQVM3RSxDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlMUgsQ0FBZixFQUFpQjtBQUFDLFNBQUksSUFBSXNILElBQUUsQ0FBQ3RILElBQUVBLEtBQUcsRUFBTixFQUFVM1YsTUFBaEIsRUFBdUJELElBQUUsQ0FBekIsRUFBMkJnZCxJQUFFNEIsRUFBRS9CLENBQUYsQ0FBakMsRUFBc0M3YyxJQUFFZ2QsQ0FBeEMsRUFBMENoZCxHQUExQyxFQUE4QztBQUFDLFVBQUl1ZCxJQUFFVixFQUFFN2MsQ0FBRixDQUFOLENBQVcsSUFBR3NHLEVBQUVpWCxDQUFGLE1BQU8vVyxFQUFFTSxPQUFGLENBQVV5VyxDQUFWLEtBQWMvVyxFQUFFbWIsV0FBRixDQUFjcEUsQ0FBZCxDQUFyQixDQUFIO0FBQTBDLFlBQUdSLENBQUgsRUFBSyxLQUFJLElBQUlJLElBQUUsQ0FBTixFQUFRdlQsSUFBRTJULEVBQUV0ZCxNQUFoQixFQUF1QmtkLElBQUV2VCxDQUF6QjtBQUE0QmdNLFlBQUVzSCxHQUFGLElBQU9LLEVBQUVKLEdBQUYsQ0FBUDtBQUE1QixTQUFMLE1BQW9EdUUsRUFBRW5FLENBQUYsRUFBSVIsQ0FBSixFQUFNTyxDQUFOLEVBQVExSCxDQUFSLEdBQVdzSCxJQUFFdEgsRUFBRTNWLE1BQWY7QUFBOUYsYUFBeUhxZCxNQUFJMUgsRUFBRXNILEdBQUYsSUFBT0ssQ0FBWDtBQUFjLFlBQU8zSCxDQUFQO0FBQVMsR0FBbE8sQ0FBbU9wUCxFQUFFb2IsT0FBRixHQUFVLFVBQVMvRSxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFdBQU8yRSxFQUFFN0UsQ0FBRixFQUFJRSxDQUFKLEVBQU0sQ0FBQyxDQUFQLENBQVA7QUFBaUIsR0FBekMsRUFBMEN2VyxFQUFFcWIsT0FBRixHQUFVdkQsRUFBRSxVQUFTekIsQ0FBVCxFQUFXRSxDQUFYLEVBQWE7QUFBQyxXQUFPdlcsRUFBRXNiLFVBQUYsQ0FBYWpGLENBQWIsRUFBZUUsQ0FBZixDQUFQO0FBQXlCLEdBQXpDLENBQXBELEVBQStGdlcsRUFBRXViLElBQUYsR0FBT3ZiLEVBQUV3YixNQUFGLEdBQVMsVUFBU25GLENBQVQsRUFBV0UsQ0FBWCxFQUFhTyxDQUFiLEVBQWUxSCxDQUFmLEVBQWlCO0FBQUNwUCxNQUFFeWIsU0FBRixDQUFZbEYsQ0FBWixNQUFpQm5ILElBQUUwSCxDQUFGLEVBQUlBLElBQUVQLENBQU4sRUFBUUEsSUFBRSxDQUFDLENBQTVCLEdBQStCLFFBQU1PLENBQU4sS0FBVUEsSUFBRVMsRUFBRVQsQ0FBRixFQUFJMUgsQ0FBSixDQUFaLENBQS9CLENBQW1ELEtBQUksSUFBSXNILElBQUUsRUFBTixFQUFTbGQsSUFBRSxFQUFYLEVBQWNnZCxJQUFFLENBQWhCLEVBQWtCTyxJQUFFcUIsRUFBRS9CLENBQUYsQ0FBeEIsRUFBNkJHLElBQUVPLENBQS9CLEVBQWlDUCxHQUFqQyxFQUFxQztBQUFDLFVBQUlHLElBQUVOLEVBQUVHLENBQUYsQ0FBTjtBQUFBLFVBQVdwVCxJQUFFMFQsSUFBRUEsRUFBRUgsQ0FBRixFQUFJSCxDQUFKLEVBQU1ILENBQU4sQ0FBRixHQUFXTSxDQUF4QixDQUEwQkosS0FBRyxDQUFDTyxDQUFKLElBQU9OLEtBQUdoZCxNQUFJNEosQ0FBUCxJQUFVc1QsRUFBRTVWLElBQUYsQ0FBTzZWLENBQVAsQ0FBVixFQUFvQm5kLElBQUU0SixDQUE3QixJQUFnQzBULElBQUU5VyxFQUFFd1QsUUFBRixDQUFXaGEsQ0FBWCxFQUFhNEosQ0FBYixNQUFrQjVKLEVBQUVzSCxJQUFGLENBQU9zQyxDQUFQLEdBQVVzVCxFQUFFNVYsSUFBRixDQUFPNlYsQ0FBUCxDQUE1QixDQUFGLEdBQXlDM1csRUFBRXdULFFBQUYsQ0FBV2tELENBQVgsRUFBYUMsQ0FBYixLQUFpQkQsRUFBRTVWLElBQUYsQ0FBTzZWLENBQVAsQ0FBMUY7QUFBb0csWUFBT0QsQ0FBUDtBQUFTLEdBQWpXLEVBQWtXMVcsRUFBRTBiLEtBQUYsR0FBUTVELEVBQUUsVUFBU3pCLENBQVQsRUFBVztBQUFDLFdBQU9yVyxFQUFFdWIsSUFBRixDQUFPTCxFQUFFN0UsQ0FBRixFQUFJLENBQUMsQ0FBTCxFQUFPLENBQUMsQ0FBUixDQUFQLENBQVA7QUFBMEIsR0FBeEMsQ0FBMVcsRUFBb1pyVyxFQUFFMmIsWUFBRixHQUFlLFVBQVN0RixDQUFULEVBQVc7QUFBQyxTQUFJLElBQUlFLElBQUUsRUFBTixFQUFTTyxJQUFFOVQsVUFBVXZKLE1BQXJCLEVBQTRCMlYsSUFBRSxDQUE5QixFQUFnQ3NILElBQUUwQixFQUFFL0IsQ0FBRixDQUF0QyxFQUEyQ2pILElBQUVzSCxDQUE3QyxFQUErQ3RILEdBQS9DLEVBQW1EO0FBQUMsVUFBSTVWLElBQUU2YyxFQUFFakgsQ0FBRixDQUFOLENBQVcsSUFBRyxDQUFDcFAsRUFBRXdULFFBQUYsQ0FBVytDLENBQVgsRUFBYS9jLENBQWIsQ0FBSixFQUFvQjtBQUFDLFlBQUlnZCxDQUFKLENBQU0sS0FBSUEsSUFBRSxDQUFOLEVBQVFBLElBQUVNLENBQUYsSUFBSzlXLEVBQUV3VCxRQUFGLENBQVd4USxVQUFVd1QsQ0FBVixDQUFYLEVBQXdCaGQsQ0FBeEIsQ0FBYixFQUF3Q2dkLEdBQXhDLElBQTZDQSxNQUFJTSxDQUFKLElBQU9QLEVBQUV6VixJQUFGLENBQU90SCxDQUFQLENBQVA7QUFBaUI7QUFBQyxZQUFPK2MsQ0FBUDtBQUFTLEdBQWpsQixFQUFrbEJ2VyxFQUFFc2IsVUFBRixHQUFheEQsRUFBRSxVQUFTekIsQ0FBVCxFQUFXRSxDQUFYLEVBQWE7QUFBQyxXQUFPQSxJQUFFMkUsRUFBRTNFLENBQUYsRUFBSSxDQUFDLENBQUwsRUFBTyxDQUFDLENBQVIsQ0FBRixFQUFhdlcsRUFBRU8sTUFBRixDQUFTOFYsQ0FBVCxFQUFXLFVBQVNBLENBQVQsRUFBVztBQUFDLGFBQU0sQ0FBQ3JXLEVBQUV3VCxRQUFGLENBQVcrQyxDQUFYLEVBQWFGLENBQWIsQ0FBUDtBQUF1QixLQUE5QyxDQUFwQjtBQUFvRSxHQUFwRixDQUEvbEIsRUFBcXJCclcsRUFBRTRiLEtBQUYsR0FBUSxVQUFTdkYsQ0FBVCxFQUFXO0FBQUMsU0FBSSxJQUFJRSxJQUFFRixLQUFHclcsRUFBRStYLEdBQUYsQ0FBTTFCLENBQU4sRUFBUStCLENBQVIsRUFBVzNlLE1BQWQsSUFBc0IsQ0FBNUIsRUFBOEJxZCxJQUFFelcsTUFBTWtXLENBQU4sQ0FBaEMsRUFBeUNuSCxJQUFFLENBQS9DLEVBQWlEQSxJQUFFbUgsQ0FBbkQsRUFBcURuSCxHQUFyRDtBQUF5RDBILFFBQUUxSCxDQUFGLElBQUtwUCxFQUFFc1osS0FBRixDQUFRakQsQ0FBUixFQUFVakgsQ0FBVixDQUFMO0FBQXpELEtBQTJFLE9BQU8wSCxDQUFQO0FBQVMsR0FBN3hCLEVBQTh4QjlXLEVBQUU2YixHQUFGLEdBQU0vRCxFQUFFOVgsRUFBRTRiLEtBQUosQ0FBcHlCLEVBQSt5QjViLEVBQUVzQyxNQUFGLEdBQVMsVUFBUytULENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsU0FBSSxJQUFJTyxJQUFFLEVBQU4sRUFBUzFILElBQUUsQ0FBWCxFQUFhc0gsSUFBRTBCLEVBQUUvQixDQUFGLENBQW5CLEVBQXdCakgsSUFBRXNILENBQTFCLEVBQTRCdEgsR0FBNUI7QUFBZ0NtSCxVQUFFTyxFQUFFVCxFQUFFakgsQ0FBRixDQUFGLElBQVFtSCxFQUFFbkgsQ0FBRixDQUFWLEdBQWUwSCxFQUFFVCxFQUFFakgsQ0FBRixFQUFLLENBQUwsQ0FBRixJQUFXaUgsRUFBRWpILENBQUYsRUFBSyxDQUFMLENBQTFCO0FBQWhDLEtBQWtFLE9BQU8wSCxDQUFQO0FBQVMsR0FBajVCLENBQWs1QixJQUFJZ0YsSUFBRSxTQUFGQSxDQUFFLENBQVN0aUIsQ0FBVCxFQUFXO0FBQUMsV0FBTyxVQUFTNmMsQ0FBVCxFQUFXRSxDQUFYLEVBQWFPLENBQWIsRUFBZTtBQUFDUCxVQUFFZ0IsRUFBRWhCLENBQUYsRUFBSU8sQ0FBSixDQUFGLENBQVMsS0FBSSxJQUFJMUgsSUFBRWdKLEVBQUUvQixDQUFGLENBQU4sRUFBV0ssSUFBRSxJQUFFbGQsQ0FBRixHQUFJLENBQUosR0FBTTRWLElBQUUsQ0FBekIsRUFBMkIsS0FBR3NILENBQUgsSUFBTUEsSUFBRXRILENBQW5DLEVBQXFDc0gsS0FBR2xkLENBQXhDO0FBQTBDLFlBQUcrYyxFQUFFRixFQUFFSyxDQUFGLENBQUYsRUFBT0EsQ0FBUCxFQUFTTCxDQUFULENBQUgsRUFBZSxPQUFPSyxDQUFQO0FBQXpELE9BQWtFLE9BQU0sQ0FBQyxDQUFQO0FBQVMsS0FBM0c7QUFBNEcsR0FBOUgsQ0FBK0gxVyxFQUFFa0YsU0FBRixHQUFZNFcsRUFBRSxDQUFGLENBQVosRUFBaUI5YixFQUFFK2IsYUFBRixHQUFnQkQsRUFBRSxDQUFDLENBQUgsQ0FBakMsRUFBdUM5YixFQUFFZ2MsV0FBRixHQUFjLFVBQVMzRixDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlMUgsQ0FBZixFQUFpQjtBQUFDLFNBQUksSUFBSXNILElBQUUsQ0FBQ0ksSUFBRVMsRUFBRVQsQ0FBRixFQUFJMUgsQ0FBSixFQUFNLENBQU4sQ0FBSCxFQUFhbUgsQ0FBYixDQUFOLEVBQXNCL2MsSUFBRSxDQUF4QixFQUEwQmdkLElBQUU0QixFQUFFL0IsQ0FBRixDQUFoQyxFQUFxQzdjLElBQUVnZCxDQUF2QyxHQUEwQztBQUFDLFVBQUlPLElBQUVuVyxLQUFLc1YsS0FBTCxDQUFXLENBQUMxYyxJQUFFZ2QsQ0FBSCxJQUFNLENBQWpCLENBQU4sQ0FBMEJNLEVBQUVULEVBQUVVLENBQUYsQ0FBRixJQUFRTCxDQUFSLEdBQVVsZCxJQUFFdWQsSUFBRSxDQUFkLEdBQWdCUCxJQUFFTyxDQUFsQjtBQUFvQixZQUFPdmQsQ0FBUDtBQUFTLEdBQXpLLENBQTBLLElBQUl5aUIsSUFBRSxTQUFGQSxDQUFFLENBQVN6aUIsQ0FBVCxFQUFXZ2QsQ0FBWCxFQUFhTyxDQUFiLEVBQWU7QUFBQyxXQUFPLFVBQVNWLENBQVQsRUFBV0UsQ0FBWCxFQUFhTyxDQUFiLEVBQWU7QUFBQyxVQUFJMUgsSUFBRSxDQUFOO0FBQUEsVUFBUXNILElBQUUwQixFQUFFL0IsQ0FBRixDQUFWLENBQWUsSUFBRyxZQUFVLE9BQU9TLENBQXBCLEVBQXNCLElBQUV0ZCxDQUFGLEdBQUk0VixJQUFFLEtBQUcwSCxDQUFILEdBQUtBLENBQUwsR0FBT2xXLEtBQUttWCxHQUFMLENBQVNqQixJQUFFSixDQUFYLEVBQWF0SCxDQUFiLENBQWIsR0FBNkJzSCxJQUFFLEtBQUdJLENBQUgsR0FBS2xXLEtBQUs0WSxHQUFMLENBQVMxQyxJQUFFLENBQVgsRUFBYUosQ0FBYixDQUFMLEdBQXFCSSxJQUFFSixDQUFGLEdBQUksQ0FBeEQsQ0FBdEIsS0FBcUYsSUFBR0ssS0FBR0QsQ0FBSCxJQUFNSixDQUFULEVBQVcsT0FBT0wsRUFBRVMsSUFBRUMsRUFBRVYsQ0FBRixFQUFJRSxDQUFKLENBQUosTUFBY0EsQ0FBZCxHQUFnQk8sQ0FBaEIsR0FBa0IsQ0FBQyxDQUExQixDQUE0QixJQUFHUCxLQUFHQSxDQUFOLEVBQVEsT0FBTyxNQUFJTyxJQUFFTixFQUFFRyxFQUFFNVQsSUFBRixDQUFPc1QsQ0FBUCxFQUFTakgsQ0FBVCxFQUFXc0gsQ0FBWCxDQUFGLEVBQWdCMVcsRUFBRWxCLEtBQWxCLENBQU4sSUFBZ0NnWSxJQUFFMUgsQ0FBbEMsR0FBb0MsQ0FBQyxDQUE1QyxDQUE4QyxLQUFJMEgsSUFBRSxJQUFFdGQsQ0FBRixHQUFJNFYsQ0FBSixHQUFNc0gsSUFBRSxDQUFkLEVBQWdCLEtBQUdJLENBQUgsSUFBTUEsSUFBRUosQ0FBeEIsRUFBMEJJLEtBQUd0ZCxDQUE3QjtBQUErQixZQUFHNmMsRUFBRVMsQ0FBRixNQUFPUCxDQUFWLEVBQVksT0FBT08sQ0FBUDtBQUEzQyxPQUFvRCxPQUFNLENBQUMsQ0FBUDtBQUFTLEtBQXJSO0FBQXNSLEdBQTVTLENBQTZTOVcsRUFBRUwsT0FBRixHQUFVc2MsRUFBRSxDQUFGLEVBQUlqYyxFQUFFa0YsU0FBTixFQUFnQmxGLEVBQUVnYyxXQUFsQixDQUFWLEVBQXlDaGMsRUFBRThWLFdBQUYsR0FBY21HLEVBQUUsQ0FBQyxDQUFILEVBQUtqYyxFQUFFK2IsYUFBUCxDQUF2RCxFQUE2RS9iLEVBQUVrYyxLQUFGLEdBQVEsVUFBUzdGLENBQVQsRUFBV0UsQ0FBWCxFQUFhTyxDQUFiLEVBQWU7QUFBQyxZQUFNUCxDQUFOLEtBQVVBLElBQUVGLEtBQUcsQ0FBTCxFQUFPQSxJQUFFLENBQW5CLEdBQXNCUyxNQUFJQSxJQUFFUCxJQUFFRixDQUFGLEdBQUksQ0FBQyxDQUFMLEdBQU8sQ0FBYixDQUF0QixDQUFzQyxLQUFJLElBQUlqSCxJQUFFeE8sS0FBS21YLEdBQUwsQ0FBU25YLEtBQUt1YixJQUFMLENBQVUsQ0FBQzVGLElBQUVGLENBQUgsSUFBTVMsQ0FBaEIsQ0FBVCxFQUE0QixDQUE1QixDQUFOLEVBQXFDSixJQUFFclcsTUFBTStPLENBQU4sQ0FBdkMsRUFBZ0Q1VixJQUFFLENBQXRELEVBQXdEQSxJQUFFNFYsQ0FBMUQsRUFBNEQ1VixLQUFJNmMsS0FBR1MsQ0FBbkU7QUFBcUVKLFFBQUVsZCxDQUFGLElBQUs2YyxDQUFMO0FBQXJFLEtBQTRFLE9BQU9LLENBQVA7QUFBUyxHQUFoTyxFQUFpTzFXLEVBQUVvYyxLQUFGLEdBQVEsVUFBUy9GLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsUUFBRyxRQUFNQSxDQUFOLElBQVNBLElBQUUsQ0FBZCxFQUFnQixPQUFNLEVBQU4sQ0FBUyxLQUFJLElBQUlPLElBQUUsRUFBTixFQUFTMUgsSUFBRSxDQUFYLEVBQWFzSCxJQUFFTCxFQUFFNWMsTUFBckIsRUFBNEIyVixJQUFFc0gsQ0FBOUI7QUFBaUNJLFFBQUVoVyxJQUFGLENBQU82VixFQUFFNVQsSUFBRixDQUFPc1QsQ0FBUCxFQUFTakgsQ0FBVCxFQUFXQSxLQUFHbUgsQ0FBZCxDQUFQO0FBQWpDLEtBQTBELE9BQU9PLENBQVA7QUFBUyxHQUFuVixDQUFvVixJQUFJdUYsSUFBRSxTQUFGQSxDQUFFLENBQVNoRyxDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlMUgsQ0FBZixFQUFpQnNILENBQWpCLEVBQW1CO0FBQUMsUUFBRyxFQUFFdEgsYUFBYW1ILENBQWYsQ0FBSCxFQUFxQixPQUFPRixFQUFFdlQsS0FBRixDQUFRZ1UsQ0FBUixFQUFVSixDQUFWLENBQVAsQ0FBb0IsSUFBSWxkLElBQUV3ZSxFQUFFM0IsRUFBRWhTLFNBQUosQ0FBTjtBQUFBLFFBQXFCbVMsSUFBRUgsRUFBRXZULEtBQUYsQ0FBUXRKLENBQVIsRUFBVWtkLENBQVYsQ0FBdkIsQ0FBb0MsT0FBTzFXLEVBQUUyWCxRQUFGLENBQVduQixDQUFYLElBQWNBLENBQWQsR0FBZ0JoZCxDQUF2QjtBQUF5QixHQUFoSSxDQUFpSXdHLEVBQUVpTyxJQUFGLEdBQU82SixFQUFFLFVBQVN2QixDQUFULEVBQVdPLENBQVgsRUFBYTFILENBQWIsRUFBZTtBQUFDLFFBQUcsQ0FBQ3BQLEVBQUUwWCxVQUFGLENBQWFuQixDQUFiLENBQUosRUFBb0IsTUFBTSxJQUFJbEksU0FBSixDQUFjLG1DQUFkLENBQU4sQ0FBeUQsSUFBSXFJLElBQUVvQixFQUFFLFVBQVN6QixDQUFULEVBQVc7QUFBQyxhQUFPZ0csRUFBRTlGLENBQUYsRUFBSUcsQ0FBSixFQUFNSSxDQUFOLEVBQVEsSUFBUixFQUFhMUgsRUFBRWpELE1BQUYsQ0FBU2tLLENBQVQsQ0FBYixDQUFQO0FBQWlDLEtBQS9DLENBQU4sQ0FBdUQsT0FBT0ssQ0FBUDtBQUFTLEdBQS9KLENBQVAsRUFBd0sxVyxFQUFFc2MsT0FBRixHQUFVeEUsRUFBRSxVQUFTcEIsQ0FBVCxFQUFXbGQsQ0FBWCxFQUFhO0FBQUMsUUFBSWdkLElBQUV4VyxFQUFFc2MsT0FBRixDQUFVQyxXQUFoQjtBQUFBLFFBQTRCeEYsSUFBRSxTQUFGQSxDQUFFLEdBQVU7QUFBQyxXQUFJLElBQUlWLElBQUUsQ0FBTixFQUFRRSxJQUFFL2MsRUFBRUMsTUFBWixFQUFtQnFkLElBQUV6VyxNQUFNa1csQ0FBTixDQUFyQixFQUE4Qm5ILElBQUUsQ0FBcEMsRUFBc0NBLElBQUVtSCxDQUF4QyxFQUEwQ25ILEdBQTFDO0FBQThDMEgsVUFBRTFILENBQUYsSUFBSzVWLEVBQUU0VixDQUFGLE1BQU9vSCxDQUFQLEdBQVN4VCxVQUFVcVQsR0FBVixDQUFULEdBQXdCN2MsRUFBRTRWLENBQUYsQ0FBN0I7QUFBOUMsT0FBZ0YsT0FBS2lILElBQUVyVCxVQUFVdkosTUFBakI7QUFBeUJxZCxVQUFFaFcsSUFBRixDQUFPa0MsVUFBVXFULEdBQVYsQ0FBUDtBQUF6QixPQUFnRCxPQUFPZ0csRUFBRTNGLENBQUYsRUFBSUssQ0FBSixFQUFNLElBQU4sRUFBVyxJQUFYLEVBQWdCRCxDQUFoQixDQUFQO0FBQTBCLEtBQW5NLENBQW9NLE9BQU9DLENBQVA7QUFBUyxHQUE3TixDQUFsTCxFQUFpWixDQUFDL1csRUFBRXNjLE9BQUYsQ0FBVUMsV0FBVixHQUFzQnZjLENBQXZCLEVBQTBCd2MsT0FBMUIsR0FBa0MxRSxFQUFFLFVBQVN6QixDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFFBQUlPLElBQUUsQ0FBQ1AsSUFBRTJFLEVBQUUzRSxDQUFGLEVBQUksQ0FBQyxDQUFMLEVBQU8sQ0FBQyxDQUFSLENBQUgsRUFBZTljLE1BQXJCLENBQTRCLElBQUdxZCxJQUFFLENBQUwsRUFBTyxNQUFNLElBQUlqSyxLQUFKLENBQVUsdUNBQVYsQ0FBTixDQUF5RCxPQUFLaUssR0FBTCxHQUFVO0FBQUMsVUFBSTFILElBQUVtSCxFQUFFTyxDQUFGLENBQU4sQ0FBV1QsRUFBRWpILENBQUYsSUFBS3BQLEVBQUVpTyxJQUFGLENBQU9vSSxFQUFFakgsQ0FBRixDQUFQLEVBQVlpSCxDQUFaLENBQUw7QUFBb0I7QUFBQyxHQUF2SixDQUFuYixFQUE0a0JyVyxFQUFFeWMsT0FBRixHQUFVLFVBQVNyTixDQUFULEVBQVdzSCxDQUFYLEVBQWE7QUFBQyxRQUFJbGQsSUFBRSxTQUFGQSxDQUFFLENBQVM2YyxDQUFULEVBQVc7QUFBQyxVQUFJRSxJQUFFL2MsRUFBRWtqQixLQUFSO0FBQUEsVUFBYzVGLElBQUUsTUFBSUosSUFBRUEsRUFBRTVULEtBQUYsQ0FBUSxJQUFSLEVBQWFFLFNBQWIsQ0FBRixHQUEwQnFULENBQTlCLENBQWhCLENBQWlELE9BQU8vUyxFQUFFaVQsQ0FBRixFQUFJTyxDQUFKLE1BQVNQLEVBQUVPLENBQUYsSUFBSzFILEVBQUV0TSxLQUFGLENBQVEsSUFBUixFQUFhRSxTQUFiLENBQWQsR0FBdUN1VCxFQUFFTyxDQUFGLENBQTlDO0FBQW1ELEtBQXRILENBQXVILE9BQU90ZCxFQUFFa2pCLEtBQUYsR0FBUSxFQUFSLEVBQVdsakIsQ0FBbEI7QUFBb0IsR0FBL3VCLEVBQWd2QndHLEVBQUUyYyxLQUFGLEdBQVE3RSxFQUFFLFVBQVN6QixDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlO0FBQUMsV0FBT2pKLFdBQVcsWUFBVTtBQUFDLGFBQU93SSxFQUFFdlQsS0FBRixDQUFRLElBQVIsRUFBYWdVLENBQWIsQ0FBUDtBQUF1QixLQUE3QyxFQUE4Q1AsQ0FBOUMsQ0FBUDtBQUF3RCxHQUExRSxDQUF4dkIsRUFBbzBCdlcsRUFBRTRjLEtBQUYsR0FBUTVjLEVBQUVzYyxPQUFGLENBQVV0YyxFQUFFMmMsS0FBWixFQUFrQjNjLENBQWxCLEVBQW9CLENBQXBCLENBQTUwQixFQUFtMkJBLEVBQUU2YyxRQUFGLEdBQVcsVUFBUy9GLENBQVQsRUFBVzFILENBQVgsRUFBYXNILENBQWIsRUFBZTtBQUFDLFFBQUlsZCxDQUFKO0FBQUEsUUFBTWdkLENBQU47QUFBQSxRQUFRTyxDQUFSO0FBQUEsUUFBVUosQ0FBVjtBQUFBLFFBQVl2VCxJQUFFLENBQWQsQ0FBZ0JzVCxNQUFJQSxJQUFFLEVBQU4sRUFBVSxJQUFJTSxJQUFFLFNBQUZBLENBQUUsR0FBVTtBQUFDNVQsVUFBRSxDQUFDLENBQUQsS0FBS3NULEVBQUVvRyxPQUFQLEdBQWUsQ0FBZixHQUFpQjljLEVBQUUrYyxHQUFGLEVBQW5CLEVBQTJCdmpCLElBQUUsSUFBN0IsRUFBa0NtZCxJQUFFRyxFQUFFaFUsS0FBRixDQUFRMFQsQ0FBUixFQUFVTyxDQUFWLENBQXBDLEVBQWlEdmQsTUFBSWdkLElBQUVPLElBQUUsSUFBUixDQUFqRDtBQUErRCxLQUFoRjtBQUFBLFFBQWlGVixJQUFFLGFBQVU7QUFBQyxVQUFJQSxJQUFFclcsRUFBRStjLEdBQUYsRUFBTixDQUFjM1osS0FBRyxDQUFDLENBQUQsS0FBS3NULEVBQUVvRyxPQUFWLEtBQW9CMVosSUFBRWlULENBQXRCLEVBQXlCLElBQUlFLElBQUVuSCxLQUFHaUgsSUFBRWpULENBQUwsQ0FBTixDQUFjLE9BQU9vVCxJQUFFLElBQUYsRUFBT08sSUFBRS9ULFNBQVQsRUFBbUJ1VCxLQUFHLENBQUgsSUFBTW5ILElBQUVtSCxDQUFSLElBQVcvYyxNQUFJd2pCLGFBQWF4akIsQ0FBYixHQUFnQkEsSUFBRSxJQUF0QixHQUE0QjRKLElBQUVpVCxDQUE5QixFQUFnQ00sSUFBRUcsRUFBRWhVLEtBQUYsQ0FBUTBULENBQVIsRUFBVU8sQ0FBVixDQUFsQyxFQUErQ3ZkLE1BQUlnZCxJQUFFTyxJQUFFLElBQVIsQ0FBMUQsSUFBeUV2ZCxLQUFHLENBQUMsQ0FBRCxLQUFLa2QsRUFBRXVHLFFBQVYsS0FBcUJ6akIsSUFBRXFVLFdBQVdtSixDQUFYLEVBQWFULENBQWIsQ0FBdkIsQ0FBNUYsRUFBb0lJLENBQTNJO0FBQTZJLEtBQWhTLENBQWlTLE9BQU9OLEVBQUU2RyxNQUFGLEdBQVMsWUFBVTtBQUFDRixtQkFBYXhqQixDQUFiLEdBQWdCNEosSUFBRSxDQUFsQixFQUFvQjVKLElBQUVnZCxJQUFFTyxJQUFFLElBQTFCO0FBQStCLEtBQW5ELEVBQW9EVixDQUEzRDtBQUE2RCxHQUF0dkMsRUFBdXZDclcsRUFBRW1kLFFBQUYsR0FBVyxVQUFTckcsQ0FBVCxFQUFXMUgsQ0FBWCxFQUFhc0gsQ0FBYixFQUFlO0FBQUMsUUFBSWxkLENBQUo7QUFBQSxRQUFNZ2QsQ0FBTjtBQUFBLFFBQVFPLElBQUUsU0FBRkEsQ0FBRSxDQUFTVixDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDL2MsVUFBRSxJQUFGLEVBQU8rYyxNQUFJQyxJQUFFTSxFQUFFaFUsS0FBRixDQUFRdVQsQ0FBUixFQUFVRSxDQUFWLENBQU4sQ0FBUDtBQUEyQixLQUFuRDtBQUFBLFFBQW9ERixJQUFFeUIsRUFBRSxVQUFTekIsQ0FBVCxFQUFXO0FBQUMsVUFBRzdjLEtBQUd3akIsYUFBYXhqQixDQUFiLENBQUgsRUFBbUJrZCxDQUF0QixFQUF3QjtBQUFDLFlBQUlILElBQUUsQ0FBQy9jLENBQVAsQ0FBU0EsSUFBRXFVLFdBQVdrSixDQUFYLEVBQWEzSCxDQUFiLENBQUYsRUFBa0JtSCxNQUFJQyxJQUFFTSxFQUFFaFUsS0FBRixDQUFRLElBQVIsRUFBYXVULENBQWIsQ0FBTixDQUFsQjtBQUF5QyxPQUEzRSxNQUFnRjdjLElBQUV3RyxFQUFFMmMsS0FBRixDQUFRNUYsQ0FBUixFQUFVM0gsQ0FBVixFQUFZLElBQVosRUFBaUJpSCxDQUFqQixDQUFGLENBQXNCLE9BQU9HLENBQVA7QUFBUyxLQUE3SCxDQUF0RCxDQUFxTCxPQUFPSCxFQUFFNkcsTUFBRixHQUFTLFlBQVU7QUFBQ0YsbUJBQWF4akIsQ0FBYixHQUFnQkEsSUFBRSxJQUFsQjtBQUF1QixLQUEzQyxFQUE0QzZjLENBQW5EO0FBQXFELEdBQTUvQyxFQUE2L0NyVyxFQUFFb2QsSUFBRixHQUFPLFVBQVMvRyxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFdBQU92VyxFQUFFc2MsT0FBRixDQUFVL0YsQ0FBVixFQUFZRixDQUFaLENBQVA7QUFBc0IsR0FBeGlELEVBQXlpRHJXLEVBQUVnWixNQUFGLEdBQVMsVUFBUzNDLENBQVQsRUFBVztBQUFDLFdBQU8sWUFBVTtBQUFDLGFBQU0sQ0FBQ0EsRUFBRXZULEtBQUYsQ0FBUSxJQUFSLEVBQWFFLFNBQWIsQ0FBUDtBQUErQixLQUFqRDtBQUFrRCxHQUFobkQsRUFBaW5EaEQsRUFBRXFkLE9BQUYsR0FBVSxZQUFVO0FBQUMsUUFBSXZHLElBQUU5VCxTQUFOO0FBQUEsUUFBZ0JvTSxJQUFFMEgsRUFBRXJkLE1BQUYsR0FBUyxDQUEzQixDQUE2QixPQUFPLFlBQVU7QUFBQyxXQUFJLElBQUk0YyxJQUFFakgsQ0FBTixFQUFRbUgsSUFBRU8sRUFBRTFILENBQUYsRUFBS3RNLEtBQUwsQ0FBVyxJQUFYLEVBQWdCRSxTQUFoQixDQUFkLEVBQXlDcVQsR0FBekM7QUFBOENFLFlBQUVPLEVBQUVULENBQUYsRUFBS3RULElBQUwsQ0FBVSxJQUFWLEVBQWV3VCxDQUFmLENBQUY7QUFBOUMsT0FBa0UsT0FBT0EsQ0FBUDtBQUFTLEtBQTdGO0FBQThGLEdBQWp3RCxFQUFrd0R2VyxFQUFFc2QsS0FBRixHQUFRLFVBQVNqSCxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFdBQU8sWUFBVTtBQUFDLFVBQUcsRUFBRUYsQ0FBRixHQUFJLENBQVAsRUFBUyxPQUFPRSxFQUFFelQsS0FBRixDQUFRLElBQVIsRUFBYUUsU0FBYixDQUFQO0FBQStCLEtBQTFEO0FBQTJELEdBQW4xRCxFQUFvMURoRCxFQUFFdWQsTUFBRixHQUFTLFVBQVNsSCxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFFBQUlPLENBQUosQ0FBTSxPQUFPLFlBQVU7QUFBQyxhQUFPLElBQUUsRUFBRVQsQ0FBSixLQUFRUyxJQUFFUCxFQUFFelQsS0FBRixDQUFRLElBQVIsRUFBYUUsU0FBYixDQUFWLEdBQW1DcVQsS0FBRyxDQUFILEtBQU9FLElBQUUsSUFBVCxDQUFuQyxFQUFrRE8sQ0FBekQ7QUFBMkQsS0FBN0U7QUFBOEUsR0FBLzdELEVBQWc4RDlXLEVBQUV5RCxJQUFGLEdBQU96RCxFQUFFc2MsT0FBRixDQUFVdGMsRUFBRXVkLE1BQVosRUFBbUIsQ0FBbkIsQ0FBdjhELEVBQTY5RHZkLEVBQUV3ZCxhQUFGLEdBQWdCMUYsQ0FBNytELENBQSsrRCxJQUFJMkYsSUFBRSxDQUFDLEVBQUMvZCxVQUFTLElBQVYsR0FBZ0JnZSxvQkFBaEIsQ0FBcUMsVUFBckMsQ0FBUDtBQUFBLE1BQXdEQyxJQUFFLENBQUMsU0FBRCxFQUFXLGVBQVgsRUFBMkIsVUFBM0IsRUFBc0Msc0JBQXRDLEVBQTZELGdCQUE3RCxFQUE4RSxnQkFBOUUsQ0FBMUQ7QUFBQSxNQUEwSkMsSUFBRSxTQUFGQSxDQUFFLENBQVN2SCxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFFBQUlPLElBQUU2RyxFQUFFbGtCLE1BQVI7QUFBQSxRQUFlMlYsSUFBRWlILEVBQUU3SSxXQUFuQjtBQUFBLFFBQStCa0osSUFBRTFXLEVBQUUwWCxVQUFGLENBQWF0SSxDQUFiLEtBQWlCQSxFQUFFL0ssU0FBbkIsSUFBOEJtUyxDQUEvRDtBQUFBLFFBQWlFaGQsSUFBRSxhQUFuRSxDQUFpRixLQUFJOEosRUFBRStTLENBQUYsRUFBSTdjLENBQUosS0FBUSxDQUFDd0csRUFBRXdULFFBQUYsQ0FBVytDLENBQVgsRUFBYS9jLENBQWIsQ0FBVCxJQUEwQitjLEVBQUV6VixJQUFGLENBQU90SCxDQUFQLENBQTlCLEVBQXdDc2QsR0FBeEM7QUFBNkMsT0FBQ3RkLElBQUVta0IsRUFBRTdHLENBQUYsQ0FBSCxLQUFXVCxDQUFYLElBQWNBLEVBQUU3YyxDQUFGLE1BQU9rZCxFQUFFbGQsQ0FBRixDQUFyQixJQUEyQixDQUFDd0csRUFBRXdULFFBQUYsQ0FBVytDLENBQVgsRUFBYS9jLENBQWIsQ0FBNUIsSUFBNkMrYyxFQUFFelYsSUFBRixDQUFPdEgsQ0FBUCxDQUE3QztBQUE3QztBQUFvRyxHQUEvVixDQUFnV3dHLEVBQUViLElBQUYsR0FBTyxVQUFTa1gsQ0FBVCxFQUFXO0FBQUMsUUFBRyxDQUFDclcsRUFBRTJYLFFBQUYsQ0FBV3RCLENBQVgsQ0FBSixFQUFrQixPQUFNLEVBQU4sQ0FBUyxJQUFHVSxDQUFILEVBQUssT0FBT0EsRUFBRVYsQ0FBRixDQUFQLENBQVksSUFBSUUsSUFBRSxFQUFOLENBQVMsS0FBSSxJQUFJTyxDQUFSLElBQWFULENBQWI7QUFBZS9TLFFBQUUrUyxDQUFGLEVBQUlTLENBQUosS0FBUVAsRUFBRXpWLElBQUYsQ0FBT2dXLENBQVAsQ0FBUjtBQUFmLEtBQWlDLE9BQU8yRyxLQUFHRyxFQUFFdkgsQ0FBRixFQUFJRSxDQUFKLENBQUgsRUFBVUEsQ0FBakI7QUFBbUIsR0FBNUgsRUFBNkh2VyxFQUFFNmQsT0FBRixHQUFVLFVBQVN4SCxDQUFULEVBQVc7QUFBQyxRQUFHLENBQUNyVyxFQUFFMlgsUUFBRixDQUFXdEIsQ0FBWCxDQUFKLEVBQWtCLE9BQU0sRUFBTixDQUFTLElBQUlFLElBQUUsRUFBTixDQUFTLEtBQUksSUFBSU8sQ0FBUixJQUFhVCxDQUFiO0FBQWVFLFFBQUV6VixJQUFGLENBQU9nVyxDQUFQO0FBQWYsS0FBeUIsT0FBTzJHLEtBQUdHLEVBQUV2SCxDQUFGLEVBQUlFLENBQUosQ0FBSCxFQUFVQSxDQUFqQjtBQUFtQixHQUFuTyxFQUFvT3ZXLEVBQUVpUSxNQUFGLEdBQVMsVUFBU29HLENBQVQsRUFBVztBQUFDLFNBQUksSUFBSUUsSUFBRXZXLEVBQUViLElBQUYsQ0FBT2tYLENBQVAsQ0FBTixFQUFnQlMsSUFBRVAsRUFBRTljLE1BQXBCLEVBQTJCMlYsSUFBRS9PLE1BQU15VyxDQUFOLENBQTdCLEVBQXNDSixJQUFFLENBQTVDLEVBQThDQSxJQUFFSSxDQUFoRCxFQUFrREosR0FBbEQ7QUFBc0R0SCxRQUFFc0gsQ0FBRixJQUFLTCxFQUFFRSxFQUFFRyxDQUFGLENBQUYsQ0FBTDtBQUF0RCxLQUFtRSxPQUFPdEgsQ0FBUDtBQUFTLEdBQXJVLEVBQXNVcFAsRUFBRThkLFNBQUYsR0FBWSxVQUFTekgsQ0FBVCxFQUFXRSxDQUFYLEVBQWFPLENBQWIsRUFBZTtBQUFDUCxRQUFFZ0IsRUFBRWhCLENBQUYsRUFBSU8sQ0FBSixDQUFGLENBQVMsS0FBSSxJQUFJMUgsSUFBRXBQLEVBQUViLElBQUYsQ0FBT2tYLENBQVAsQ0FBTixFQUFnQkssSUFBRXRILEVBQUUzVixNQUFwQixFQUEyQkQsSUFBRSxFQUE3QixFQUFnQ2dkLElBQUUsQ0FBdEMsRUFBd0NBLElBQUVFLENBQTFDLEVBQTRDRixHQUE1QyxFQUFnRDtBQUFDLFVBQUlPLElBQUUzSCxFQUFFb0gsQ0FBRixDQUFOLENBQVdoZCxFQUFFdWQsQ0FBRixJQUFLUixFQUFFRixFQUFFVSxDQUFGLENBQUYsRUFBT0EsQ0FBUCxFQUFTVixDQUFULENBQUw7QUFBaUIsWUFBTzdjLENBQVA7QUFBUyxHQUFqYyxFQUFrY3dHLEVBQUUrZCxLQUFGLEdBQVEsVUFBUzFILENBQVQsRUFBVztBQUFDLFNBQUksSUFBSUUsSUFBRXZXLEVBQUViLElBQUYsQ0FBT2tYLENBQVAsQ0FBTixFQUFnQlMsSUFBRVAsRUFBRTljLE1BQXBCLEVBQTJCMlYsSUFBRS9PLE1BQU15VyxDQUFOLENBQTdCLEVBQXNDSixJQUFFLENBQTVDLEVBQThDQSxJQUFFSSxDQUFoRCxFQUFrREosR0FBbEQ7QUFBc0R0SCxRQUFFc0gsQ0FBRixJQUFLLENBQUNILEVBQUVHLENBQUYsQ0FBRCxFQUFNTCxFQUFFRSxFQUFFRyxDQUFGLENBQUYsQ0FBTixDQUFMO0FBQXRELEtBQTBFLE9BQU90SCxDQUFQO0FBQVMsR0FBemlCLEVBQTBpQnBQLEVBQUVnZSxNQUFGLEdBQVMsVUFBUzNILENBQVQsRUFBVztBQUFDLFNBQUksSUFBSUUsSUFBRSxFQUFOLEVBQVNPLElBQUU5VyxFQUFFYixJQUFGLENBQU9rWCxDQUFQLENBQVgsRUFBcUJqSCxJQUFFLENBQXZCLEVBQXlCc0gsSUFBRUksRUFBRXJkLE1BQWpDLEVBQXdDMlYsSUFBRXNILENBQTFDLEVBQTRDdEgsR0FBNUM7QUFBZ0RtSCxRQUFFRixFQUFFUyxFQUFFMUgsQ0FBRixDQUFGLENBQUYsSUFBVzBILEVBQUUxSCxDQUFGLENBQVg7QUFBaEQsS0FBZ0UsT0FBT21ILENBQVA7QUFBUyxHQUF4b0IsRUFBeW9CdlcsRUFBRWllLFNBQUYsR0FBWWplLEVBQUVrZSxPQUFGLEdBQVUsVUFBUzdILENBQVQsRUFBVztBQUFDLFFBQUlFLElBQUUsRUFBTixDQUFTLEtBQUksSUFBSU8sQ0FBUixJQUFhVCxDQUFiO0FBQWVyVyxRQUFFMFgsVUFBRixDQUFhckIsRUFBRVMsQ0FBRixDQUFiLEtBQW9CUCxFQUFFelYsSUFBRixDQUFPZ1csQ0FBUCxDQUFwQjtBQUFmLEtBQTZDLE9BQU9QLEVBQUV4VixJQUFGLEVBQVA7QUFBZ0IsR0FBanZCLENBQWt2QixJQUFJb2QsSUFBRSxTQUFGQSxDQUFFLENBQVN4SCxDQUFULEVBQVd2VCxDQUFYLEVBQWE7QUFBQyxXQUFPLFVBQVNpVCxDQUFULEVBQVc7QUFBQyxVQUFJRSxJQUFFdlQsVUFBVXZKLE1BQWhCLENBQXVCLElBQUcySixNQUFJaVQsSUFBRW5YLE9BQU9tWCxDQUFQLENBQU4sR0FBaUJFLElBQUUsQ0FBRixJQUFLLFFBQU1GLENBQS9CLEVBQWlDLE9BQU9BLENBQVAsQ0FBUyxLQUFJLElBQUlTLElBQUUsQ0FBVixFQUFZQSxJQUFFUCxDQUFkLEVBQWdCTyxHQUFoQjtBQUFvQixhQUFJLElBQUkxSCxJQUFFcE0sVUFBVThULENBQVYsQ0FBTixFQUFtQkosSUFBRUMsRUFBRXZILENBQUYsQ0FBckIsRUFBMEI1VixJQUFFa2QsRUFBRWpkLE1BQTlCLEVBQXFDK2MsSUFBRSxDQUEzQyxFQUE2Q0EsSUFBRWhkLENBQS9DLEVBQWlEZ2QsR0FBakQsRUFBcUQ7QUFBQyxjQUFJTyxJQUFFTCxFQUFFRixDQUFGLENBQU4sQ0FBV3BULEtBQUcsS0FBSyxDQUFMLEtBQVNpVCxFQUFFVSxDQUFGLENBQVosS0FBbUJWLEVBQUVVLENBQUYsSUFBSzNILEVBQUUySCxDQUFGLENBQXhCO0FBQThCO0FBQW5ILE9BQW1ILE9BQU9WLENBQVA7QUFBUyxLQUFoTjtBQUFpTixHQUFyTyxDQUFzT3JXLEVBQUVvZSxNQUFGLEdBQVNELEVBQUVuZSxFQUFFNmQsT0FBSixDQUFULEVBQXNCN2QsRUFBRXFlLFNBQUYsR0FBWXJlLEVBQUVzZSxNQUFGLEdBQVNILEVBQUVuZSxFQUFFYixJQUFKLENBQTNDLEVBQXFEYSxFQUFFOFksT0FBRixHQUFVLFVBQVN6QyxDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlO0FBQUNQLFFBQUVnQixFQUFFaEIsQ0FBRixFQUFJTyxDQUFKLENBQUYsQ0FBUyxLQUFJLElBQUkxSCxDQUFKLEVBQU1zSCxJQUFFMVcsRUFBRWIsSUFBRixDQUFPa1gsQ0FBUCxDQUFSLEVBQWtCN2MsSUFBRSxDQUFwQixFQUFzQmdkLElBQUVFLEVBQUVqZCxNQUE5QixFQUFxQ0QsSUFBRWdkLENBQXZDLEVBQXlDaGQsR0FBekM7QUFBNkMsVUFBRytjLEVBQUVGLEVBQUVqSCxJQUFFc0gsRUFBRWxkLENBQUYsQ0FBSixDQUFGLEVBQVk0VixDQUFaLEVBQWNpSCxDQUFkLENBQUgsRUFBb0IsT0FBT2pILENBQVA7QUFBakU7QUFBMEUsR0FBbEssQ0FBbUssSUFBSW1QLENBQUo7QUFBQSxNQUFNQyxDQUFOO0FBQUEsTUFBUUMsSUFBRSxTQUFGQSxDQUFFLENBQVNwSSxDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlO0FBQUMsV0FBT1AsS0FBS08sQ0FBWjtBQUFjLEdBQXhDLENBQXlDOVcsRUFBRWtCLElBQUYsR0FBTzRXLEVBQUUsVUFBU3pCLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsUUFBSU8sSUFBRSxFQUFOO0FBQUEsUUFBUzFILElBQUVtSCxFQUFFLENBQUYsQ0FBWCxDQUFnQixJQUFHLFFBQU1GLENBQVQsRUFBVyxPQUFPUyxDQUFQLENBQVM5VyxFQUFFMFgsVUFBRixDQUFhdEksQ0FBYixLQUFpQixJQUFFbUgsRUFBRTljLE1BQUosS0FBYTJWLElBQUVrSSxFQUFFbEksQ0FBRixFQUFJbUgsRUFBRSxDQUFGLENBQUosQ0FBZixHQUEwQkEsSUFBRXZXLEVBQUU2ZCxPQUFGLENBQVV4SCxDQUFWLENBQTdDLEtBQTREakgsSUFBRXFQLENBQUYsRUFBSWxJLElBQUUyRSxFQUFFM0UsQ0FBRixFQUFJLENBQUMsQ0FBTCxFQUFPLENBQUMsQ0FBUixDQUFOLEVBQWlCRixJQUFFblgsT0FBT21YLENBQVAsQ0FBL0UsRUFBMEYsS0FBSSxJQUFJSyxJQUFFLENBQU4sRUFBUWxkLElBQUUrYyxFQUFFOWMsTUFBaEIsRUFBdUJpZCxJQUFFbGQsQ0FBekIsRUFBMkJrZCxHQUEzQixFQUErQjtBQUFDLFVBQUlGLElBQUVELEVBQUVHLENBQUYsQ0FBTjtBQUFBLFVBQVdLLElBQUVWLEVBQUVHLENBQUYsQ0FBYixDQUFrQnBILEVBQUUySCxDQUFGLEVBQUlQLENBQUosRUFBTUgsQ0FBTixNQUFXUyxFQUFFTixDQUFGLElBQUtPLENBQWhCO0FBQW1CLFlBQU9ELENBQVA7QUFBUyxHQUE1TixDQUFQLEVBQXFPOVcsRUFBRTBlLElBQUYsR0FBTzVHLEVBQUUsVUFBU3pCLENBQVQsRUFBV1MsQ0FBWCxFQUFhO0FBQUMsUUFBSVAsQ0FBSjtBQUFBLFFBQU1uSCxJQUFFMEgsRUFBRSxDQUFGLENBQVIsQ0FBYSxPQUFPOVcsRUFBRTBYLFVBQUYsQ0FBYXRJLENBQWIsS0FBaUJBLElBQUVwUCxFQUFFZ1osTUFBRixDQUFTNUosQ0FBVCxDQUFGLEVBQWMsSUFBRTBILEVBQUVyZCxNQUFKLEtBQWE4YyxJQUFFTyxFQUFFLENBQUYsQ0FBZixDQUEvQixLQUFzREEsSUFBRTlXLEVBQUVXLEdBQUYsQ0FBTXVhLEVBQUVwRSxDQUFGLEVBQUksQ0FBQyxDQUFMLEVBQU8sQ0FBQyxDQUFSLENBQU4sRUFBaUI2SCxNQUFqQixDQUFGLEVBQTJCdlAsSUFBRSxXQUFTaUgsQ0FBVCxFQUFXRSxDQUFYLEVBQWE7QUFBQyxhQUFNLENBQUN2VyxFQUFFd1QsUUFBRixDQUFXc0QsQ0FBWCxFQUFhUCxDQUFiLENBQVA7QUFBdUIsS0FBeEgsR0FBMEh2VyxFQUFFa0IsSUFBRixDQUFPbVYsQ0FBUCxFQUFTakgsQ0FBVCxFQUFXbUgsQ0FBWCxDQUFqSTtBQUErSSxHQUE1SyxDQUE1TyxFQUEwWnZXLEVBQUU0ZSxRQUFGLEdBQVdULEVBQUVuZSxFQUFFNmQsT0FBSixFQUFZLENBQUMsQ0FBYixDQUFyYSxFQUFxYjdkLEVBQUV3USxNQUFGLEdBQVMsVUFBUzZGLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsUUFBSU8sSUFBRWtCLEVBQUUzQixDQUFGLENBQU4sQ0FBVyxPQUFPRSxLQUFHdlcsRUFBRXFlLFNBQUYsQ0FBWXZILENBQVosRUFBY1AsQ0FBZCxDQUFILEVBQW9CTyxDQUEzQjtBQUE2QixHQUFwZixFQUFxZjlXLEVBQUU0WixLQUFGLEdBQVEsVUFBU3ZELENBQVQsRUFBVztBQUFDLFdBQU9yVyxFQUFFMlgsUUFBRixDQUFXdEIsQ0FBWCxJQUFjclcsRUFBRU0sT0FBRixDQUFVK1YsQ0FBVixJQUFhQSxFQUFFOVcsS0FBRixFQUFiLEdBQXVCUyxFQUFFb2UsTUFBRixDQUFTLEVBQVQsRUFBWS9ILENBQVosQ0FBckMsR0FBb0RBLENBQTNEO0FBQTZELEdBQXRrQixFQUF1a0JyVyxFQUFFNmUsR0FBRixHQUFNLFVBQVN4SSxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFdBQU9BLEVBQUVGLENBQUYsR0FBS0EsQ0FBWjtBQUFjLEdBQXptQixFQUEwbUJyVyxFQUFFOGUsT0FBRixHQUFVLFVBQVN6SSxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFFBQUlPLElBQUU5VyxFQUFFYixJQUFGLENBQU9vWCxDQUFQLENBQU47QUFBQSxRQUFnQm5ILElBQUUwSCxFQUFFcmQsTUFBcEIsQ0FBMkIsSUFBRyxRQUFNNGMsQ0FBVCxFQUFXLE9BQU0sQ0FBQ2pILENBQVAsQ0FBUyxLQUFJLElBQUlzSCxJQUFFeFgsT0FBT21YLENBQVAsQ0FBTixFQUFnQjdjLElBQUUsQ0FBdEIsRUFBd0JBLElBQUU0VixDQUExQixFQUE0QjVWLEdBQTVCLEVBQWdDO0FBQUMsVUFBSWdkLElBQUVNLEVBQUV0ZCxDQUFGLENBQU4sQ0FBVyxJQUFHK2MsRUFBRUMsQ0FBRixNQUFPRSxFQUFFRixDQUFGLENBQVAsSUFBYSxFQUFFQSxLQUFLRSxDQUFQLENBQWhCLEVBQTBCLE9BQU0sQ0FBQyxDQUFQO0FBQVMsWUFBTSxDQUFDLENBQVA7QUFBUyxHQUF6d0IsRUFBMHdCNkgsSUFBRSxXQUFTbEksQ0FBVCxFQUFXRSxDQUFYLEVBQWFPLENBQWIsRUFBZTFILENBQWYsRUFBaUI7QUFBQyxRQUFHaUgsTUFBSUUsQ0FBUCxFQUFTLE9BQU8sTUFBSUYsQ0FBSixJQUFPLElBQUVBLENBQUYsSUFBSyxJQUFFRSxDQUFyQixDQUF1QixJQUFHLFFBQU1GLENBQU4sSUFBUyxRQUFNRSxDQUFsQixFQUFvQixPQUFNLENBQUMsQ0FBUCxDQUFTLElBQUdGLEtBQUdBLENBQU4sRUFBUSxPQUFPRSxLQUFHQSxDQUFWLENBQVksSUFBSUcsV0FBU0wsQ0FBVCx5Q0FBU0EsQ0FBVCxDQUFKLENBQWUsT0FBTSxDQUFDLGVBQWFLLENBQWIsSUFBZ0IsYUFBV0EsQ0FBM0IsSUFBOEIsb0JBQWlCSCxDQUFqQix5Q0FBaUJBLENBQWpCLEVBQS9CLEtBQW9EaUksRUFBRW5JLENBQUYsRUFBSUUsQ0FBSixFQUFNTyxDQUFOLEVBQVExSCxDQUFSLENBQTFEO0FBQXFFLEdBQW44QixFQUFvOEJvUCxJQUFFLFdBQVNuSSxDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlMUgsQ0FBZixFQUFpQjtBQUFDaUgsaUJBQWFyVyxDQUFiLEtBQWlCcVcsSUFBRUEsRUFBRVksUUFBckIsR0FBK0JWLGFBQWF2VyxDQUFiLEtBQWlCdVcsSUFBRUEsRUFBRVUsUUFBckIsQ0FBL0IsQ0FBOEQsSUFBSVAsSUFBRUUsRUFBRTdULElBQUYsQ0FBT3NULENBQVAsQ0FBTixDQUFnQixJQUFHSyxNQUFJRSxFQUFFN1QsSUFBRixDQUFPd1QsQ0FBUCxDQUFQLEVBQWlCLE9BQU0sQ0FBQyxDQUFQLENBQVMsUUFBT0csQ0FBUCxHQUFVLEtBQUksaUJBQUosQ0FBc0IsS0FBSSxpQkFBSjtBQUFzQixlQUFNLEtBQUdMLENBQUgsSUFBTSxLQUFHRSxDQUFmLENBQWlCLEtBQUksaUJBQUo7QUFBc0IsZUFBTSxDQUFDRixDQUFELElBQUksQ0FBQ0EsQ0FBTCxHQUFPLENBQUNFLENBQUQsSUFBSSxDQUFDQSxDQUFaLEdBQWMsS0FBRyxDQUFDRixDQUFKLEdBQU0sSUFBRSxDQUFDQSxDQUFILElBQU0sSUFBRUUsQ0FBZCxHQUFnQixDQUFDRixDQUFELElBQUksQ0FBQ0UsQ0FBekMsQ0FBMkMsS0FBSSxlQUFKLENBQW9CLEtBQUksa0JBQUo7QUFBdUIsZUFBTSxDQUFDRixDQUFELElBQUksQ0FBQ0UsQ0FBWCxDQUFhLEtBQUksaUJBQUo7QUFBc0IsZUFBT3RCLEVBQUU4SixPQUFGLENBQVVoYyxJQUFWLENBQWVzVCxDQUFmLE1BQW9CcEIsRUFBRThKLE9BQUYsQ0FBVWhjLElBQVYsQ0FBZXdULENBQWYsQ0FBM0IsQ0FBdE4sQ0FBbVEsSUFBSS9jLElBQUUscUJBQW1Ca2QsQ0FBekIsQ0FBMkIsSUFBRyxDQUFDbGQsQ0FBSixFQUFNO0FBQUMsVUFBRyxvQkFBaUI2YyxDQUFqQix5Q0FBaUJBLENBQWpCLE1BQW9CLG9CQUFpQkUsQ0FBakIseUNBQWlCQSxDQUFqQixFQUF2QixFQUEwQyxPQUFNLENBQUMsQ0FBUCxDQUFTLElBQUlDLElBQUVILEVBQUU3SSxXQUFSO0FBQUEsVUFBb0J1SixJQUFFUixFQUFFL0ksV0FBeEIsQ0FBb0MsSUFBR2dKLE1BQUlPLENBQUosSUFBTyxFQUFFL1csRUFBRTBYLFVBQUYsQ0FBYWxCLENBQWIsS0FBaUJBLGFBQWFBLENBQTlCLElBQWlDeFcsRUFBRTBYLFVBQUYsQ0FBYVgsQ0FBYixDQUFqQyxJQUFrREEsYUFBYUEsQ0FBakUsQ0FBUCxJQUE0RSxpQkFBZ0JWLENBQTVGLElBQStGLGlCQUFnQkUsQ0FBbEgsRUFBb0gsT0FBTSxDQUFDLENBQVA7QUFBUyxTQUFFbkgsS0FBRyxFQUFMLENBQVEsS0FBSSxJQUFJdUgsSUFBRSxDQUFDRyxJQUFFQSxLQUFHLEVBQU4sRUFBVXJkLE1BQXBCLEVBQTJCa2QsR0FBM0I7QUFBZ0MsVUFBR0csRUFBRUgsQ0FBRixNQUFPTixDQUFWLEVBQVksT0FBT2pILEVBQUV1SCxDQUFGLE1BQU9KLENBQWQ7QUFBNUMsS0FBNEQsSUFBR08sRUFBRWhXLElBQUYsQ0FBT3VWLENBQVAsR0FBVWpILEVBQUV0TyxJQUFGLENBQU95VixDQUFQLENBQVYsRUFBb0IvYyxDQUF2QixFQUF5QjtBQUFDLFVBQUcsQ0FBQ21kLElBQUVOLEVBQUU1YyxNQUFMLE1BQWU4YyxFQUFFOWMsTUFBcEIsRUFBMkIsT0FBTSxDQUFDLENBQVAsQ0FBUyxPQUFLa2QsR0FBTDtBQUFVLFlBQUcsQ0FBQzRILEVBQUVsSSxFQUFFTSxDQUFGLENBQUYsRUFBT0osRUFBRUksQ0FBRixDQUFQLEVBQVlHLENBQVosRUFBYzFILENBQWQsQ0FBSixFQUFxQixPQUFNLENBQUMsQ0FBUDtBQUEvQjtBQUF3QyxLQUF0RyxNQUEwRztBQUFDLFVBQUloTSxDQUFKO0FBQUEsVUFBTTRULElBQUVoWCxFQUFFYixJQUFGLENBQU9rWCxDQUFQLENBQVIsQ0FBa0IsSUFBR00sSUFBRUssRUFBRXZkLE1BQUosRUFBV3VHLEVBQUViLElBQUYsQ0FBT29YLENBQVAsRUFBVTljLE1BQVYsS0FBbUJrZCxDQUFqQyxFQUFtQyxPQUFNLENBQUMsQ0FBUCxDQUFTLE9BQUtBLEdBQUw7QUFBVSxZQUFHdlQsSUFBRTRULEVBQUVMLENBQUYsQ0FBRixFQUFPLENBQUNyVCxFQUFFaVQsQ0FBRixFQUFJblQsQ0FBSixDQUFELElBQVMsQ0FBQ21iLEVBQUVsSSxFQUFFalQsQ0FBRixDQUFGLEVBQU9tVCxFQUFFblQsQ0FBRixDQUFQLEVBQVkwVCxDQUFaLEVBQWMxSCxDQUFkLENBQXBCLEVBQXFDLE9BQU0sQ0FBQyxDQUFQO0FBQS9DO0FBQXdELFlBQU8wSCxFQUFFa0ksR0FBRixJQUFRNVAsRUFBRTRQLEdBQUYsRUFBUixFQUFnQixDQUFDLENBQXhCO0FBQTBCLEdBQXgzRCxFQUF5M0RoZixFQUFFaWYsT0FBRixHQUFVLFVBQVM1SSxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFdBQU9nSSxFQUFFbEksQ0FBRixFQUFJRSxDQUFKLENBQVA7QUFBYyxHQUEvNUQsRUFBZzZEdlcsRUFBRWtmLE9BQUYsR0FBVSxVQUFTN0ksQ0FBVCxFQUFXO0FBQUMsV0FBTyxRQUFNQSxDQUFOLEtBQVV2VyxFQUFFdVcsQ0FBRixNQUFPclcsRUFBRU0sT0FBRixDQUFVK1YsQ0FBVixLQUFjclcsRUFBRW9hLFFBQUYsQ0FBVy9ELENBQVgsQ0FBZCxJQUE2QnJXLEVBQUVtYixXQUFGLENBQWM5RSxDQUFkLENBQXBDLElBQXNELE1BQUlBLEVBQUU1YyxNQUE1RCxHQUFtRSxNQUFJdUcsRUFBRWIsSUFBRixDQUFPa1gsQ0FBUCxFQUFVNWMsTUFBM0YsQ0FBUDtBQUEwRyxHQUFoaUUsRUFBaWlFdUcsRUFBRWlTLFNBQUYsR0FBWSxVQUFTb0UsQ0FBVCxFQUFXO0FBQUMsV0FBTSxFQUFFLENBQUNBLENBQUQsSUFBSSxNQUFJQSxFQUFFbEYsUUFBWixDQUFOO0FBQTRCLEdBQXJsRSxFQUFzbEVuUixFQUFFTSxPQUFGLEdBQVV3VyxLQUFHLFVBQVNULENBQVQsRUFBVztBQUFDLFdBQU0scUJBQW1CTyxFQUFFN1QsSUFBRixDQUFPc1QsQ0FBUCxDQUF6QjtBQUFtQyxHQUFscEUsRUFBbXBFclcsRUFBRTJYLFFBQUYsR0FBVyxVQUFTdEIsQ0FBVCxFQUFXO0FBQUMsUUFBSUUsV0FBU0YsQ0FBVCx5Q0FBU0EsQ0FBVCxDQUFKLENBQWUsT0FBTSxlQUFhRSxDQUFiLElBQWdCLGFBQVdBLENBQVgsSUFBYyxDQUFDLENBQUNGLENBQXRDO0FBQXdDLEdBQWp1RSxFQUFrdUVyVyxFQUFFcVksSUFBRixDQUFPLENBQUMsV0FBRCxFQUFhLFVBQWIsRUFBd0IsUUFBeEIsRUFBaUMsUUFBakMsRUFBMEMsTUFBMUMsRUFBaUQsUUFBakQsRUFBMEQsT0FBMUQsRUFBa0UsUUFBbEUsRUFBMkUsS0FBM0UsRUFBaUYsU0FBakYsRUFBMkYsS0FBM0YsRUFBaUcsU0FBakcsQ0FBUCxFQUFtSCxVQUFTOUIsQ0FBVCxFQUFXO0FBQUN2VyxNQUFFLE9BQUt1VyxDQUFQLElBQVUsVUFBU0YsQ0FBVCxFQUFXO0FBQUMsYUFBT08sRUFBRTdULElBQUYsQ0FBT3NULENBQVAsTUFBWSxhQUFXRSxDQUFYLEdBQWEsR0FBaEM7QUFBb0MsS0FBMUQ7QUFBMkQsR0FBMUwsQ0FBbHVFLEVBQTg1RXZXLEVBQUVtYixXQUFGLENBQWNuWSxTQUFkLE1BQTJCaEQsRUFBRW1iLFdBQUYsR0FBYyxVQUFTOUUsQ0FBVCxFQUFXO0FBQUMsV0FBTy9TLEVBQUUrUyxDQUFGLEVBQUksUUFBSixDQUFQO0FBQXFCLEdBQTFFLENBQTk1RSxDQUEwK0UsSUFBSThJLElBQUU5SSxFQUFFNVAsUUFBRixJQUFZNFAsRUFBRTVQLFFBQUYsQ0FBVzJZLFVBQTdCLENBQXdDLGNBQVksT0FBTSxHQUFsQixJQUF1QixvQkFBaUJDLFNBQWpCLHlDQUFpQkEsU0FBakIsRUFBdkIsSUFBbUQsY0FBWSxPQUFPRixDQUF0RSxLQUEwRW5mLEVBQUUwWCxVQUFGLEdBQWEsVUFBU3JCLENBQVQsRUFBVztBQUFDLFdBQU0sY0FBWSxPQUFPQSxDQUFuQixJQUFzQixDQUFDLENBQTdCO0FBQStCLEdBQWxJLEdBQW9JclcsRUFBRXNmLFFBQUYsR0FBVyxVQUFTakosQ0FBVCxFQUFXO0FBQUMsV0FBTSxDQUFDclcsRUFBRXVmLFFBQUYsQ0FBV2xKLENBQVgsQ0FBRCxJQUFnQmlKLFNBQVNqSixDQUFULENBQWhCLElBQTZCLENBQUN2WCxNQUFNRSxXQUFXcVgsQ0FBWCxDQUFOLENBQXBDO0FBQXlELEdBQXBOLEVBQXFOclcsRUFBRWxCLEtBQUYsR0FBUSxVQUFTdVgsQ0FBVCxFQUFXO0FBQUMsV0FBT3JXLEVBQUVTLFFBQUYsQ0FBVzRWLENBQVgsS0FBZXZYLE1BQU11WCxDQUFOLENBQXRCO0FBQStCLEdBQXhRLEVBQXlRclcsRUFBRXliLFNBQUYsR0FBWSxVQUFTcEYsQ0FBVCxFQUFXO0FBQUMsV0FBTSxDQUFDLENBQUQsS0FBS0EsQ0FBTCxJQUFRLENBQUMsQ0FBRCxLQUFLQSxDQUFiLElBQWdCLHVCQUFxQk8sRUFBRTdULElBQUYsQ0FBT3NULENBQVAsQ0FBM0M7QUFBcUQsR0FBdFYsRUFBdVZyVyxFQUFFd2YsTUFBRixHQUFTLFVBQVNuSixDQUFULEVBQVc7QUFBQyxXQUFPLFNBQU9BLENBQWQ7QUFBZ0IsR0FBNVgsRUFBNlhyVyxFQUFFeWYsV0FBRixHQUFjLFVBQVNwSixDQUFULEVBQVc7QUFBQyxXQUFPLEtBQUssQ0FBTCxLQUFTQSxDQUFoQjtBQUFrQixHQUF6YSxFQUEwYXJXLEVBQUUwZixHQUFGLEdBQU0sVUFBU3JKLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsUUFBRyxDQUFDdlcsRUFBRU0sT0FBRixDQUFVaVcsQ0FBVixDQUFKLEVBQWlCLE9BQU9qVCxFQUFFK1MsQ0FBRixFQUFJRSxDQUFKLENBQVAsQ0FBYyxLQUFJLElBQUlPLElBQUVQLEVBQUU5YyxNQUFSLEVBQWUyVixJQUFFLENBQXJCLEVBQXVCQSxJQUFFMEgsQ0FBekIsRUFBMkIxSCxHQUEzQixFQUErQjtBQUFDLFVBQUlzSCxJQUFFSCxFQUFFbkgsQ0FBRixDQUFOLENBQVcsSUFBRyxRQUFNaUgsQ0FBTixJQUFTLENBQUM3YyxFQUFFdUosSUFBRixDQUFPc1QsQ0FBUCxFQUFTSyxDQUFULENBQWIsRUFBeUIsT0FBTSxDQUFDLENBQVAsQ0FBU0wsSUFBRUEsRUFBRUssQ0FBRixDQUFGO0FBQU8sWUFBTSxDQUFDLENBQUNJLENBQVI7QUFBVSxHQUEzakIsRUFBNGpCOVcsRUFBRTJmLFVBQUYsR0FBYSxZQUFVO0FBQUMsV0FBT3RKLEVBQUU3VixDQUFGLEdBQUkrVixDQUFKLEVBQU0sSUFBYjtBQUFrQixHQUF0bUIsRUFBdW1CdlcsRUFBRXlYLFFBQUYsR0FBVyxVQUFTcEIsQ0FBVCxFQUFXO0FBQUMsV0FBT0EsQ0FBUDtBQUFTLEdBQXZvQixFQUF3b0JyVyxFQUFFNGYsUUFBRixHQUFXLFVBQVN2SixDQUFULEVBQVc7QUFBQyxXQUFPLFlBQVU7QUFBQyxhQUFPQSxDQUFQO0FBQVMsS0FBM0I7QUFBNEIsR0FBM3JCLEVBQTRyQnJXLEVBQUVnTyxJQUFGLEdBQU8sWUFBVSxDQUFFLENBQS9zQixFQUFndEJoTyxFQUFFNlgsUUFBRixHQUFXLFVBQVN0QixDQUFULEVBQVc7QUFBQyxXQUFPdlcsRUFBRU0sT0FBRixDQUFVaVcsQ0FBVixJQUFhLFVBQVNGLENBQVQsRUFBVztBQUFDLGFBQU82QixFQUFFN0IsQ0FBRixFQUFJRSxDQUFKLENBQVA7QUFBYyxLQUF2QyxHQUF3QzBCLEVBQUUxQixDQUFGLENBQS9DO0FBQW9ELEdBQTN4QixFQUE0eEJ2VyxFQUFFNmYsVUFBRixHQUFhLFVBQVN0SixDQUFULEVBQVc7QUFBQyxXQUFPLFFBQU1BLENBQU4sR0FBUSxZQUFVLENBQUUsQ0FBcEIsR0FBcUIsVUFBU0YsQ0FBVCxFQUFXO0FBQUMsYUFBT3JXLEVBQUVNLE9BQUYsQ0FBVStWLENBQVYsSUFBYTZCLEVBQUUzQixDQUFGLEVBQUlGLENBQUosQ0FBYixHQUFvQkUsRUFBRUYsQ0FBRixDQUEzQjtBQUFnQyxLQUF4RTtBQUF5RSxHQUE5M0IsRUFBKzNCclcsRUFBRTRYLE9BQUYsR0FBVTVYLEVBQUVrVixPQUFGLEdBQVUsVUFBU3FCLENBQVQsRUFBVztBQUFDLFdBQU9BLElBQUV2VyxFQUFFcWUsU0FBRixDQUFZLEVBQVosRUFBZTlILENBQWYsQ0FBRixFQUFvQixVQUFTRixDQUFULEVBQVc7QUFBQyxhQUFPclcsRUFBRThlLE9BQUYsQ0FBVXpJLENBQVYsRUFBWUUsQ0FBWixDQUFQO0FBQXNCLEtBQTdEO0FBQThELEdBQTc5QixFQUE4OUJ2VyxFQUFFOGYsS0FBRixHQUFRLFVBQVN6SixDQUFULEVBQVdFLENBQVgsRUFBYU8sQ0FBYixFQUFlO0FBQUMsUUFBSTFILElBQUUvTyxNQUFNTyxLQUFLbVgsR0FBTCxDQUFTLENBQVQsRUFBVzFCLENBQVgsQ0FBTixDQUFOLENBQTJCRSxJQUFFZSxFQUFFZixDQUFGLEVBQUlPLENBQUosRUFBTSxDQUFOLENBQUYsQ0FBVyxLQUFJLElBQUlKLElBQUUsQ0FBVixFQUFZQSxJQUFFTCxDQUFkLEVBQWdCSyxHQUFoQjtBQUFvQnRILFFBQUVzSCxDQUFGLElBQUtILEVBQUVHLENBQUYsQ0FBTDtBQUFwQixLQUE4QixPQUFPdEgsQ0FBUDtBQUFTLEdBQW5rQyxFQUFva0NwUCxFQUFFMlosTUFBRixHQUFTLFVBQVN0RCxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFdBQU8sUUFBTUEsQ0FBTixLQUFVQSxJQUFFRixDQUFGLEVBQUlBLElBQUUsQ0FBaEIsR0FBbUJBLElBQUV6VixLQUFLc1YsS0FBTCxDQUFXdFYsS0FBSytZLE1BQUwsTUFBZXBELElBQUVGLENBQUYsR0FBSSxDQUFuQixDQUFYLENBQTVCO0FBQThELEdBQXpwQyxFQUEwcENyVyxFQUFFK2MsR0FBRixHQUFNZ0QsS0FBS2hELEdBQUwsSUFBVSxZQUFVO0FBQUMsV0FBTyxJQUFJZ0QsSUFBSixFQUFELENBQVdDLE9BQVgsRUFBTjtBQUEyQixHQUFodEMsQ0FBaXRDLElBQUlDLElBQUUsRUFBQyxLQUFJLE9BQUwsRUFBYSxLQUFJLE1BQWpCLEVBQXdCLEtBQUksTUFBNUIsRUFBbUMsS0FBSSxRQUF2QyxFQUFnRCxLQUFJLFFBQXBELEVBQTZELEtBQUksUUFBakUsRUFBTjtBQUFBLE1BQWlGQyxJQUFFbGdCLEVBQUVnZSxNQUFGLENBQVNpQyxDQUFULENBQW5GO0FBQUEsTUFBK0ZFLElBQUUsU0FBRkEsQ0FBRSxDQUFTNUosQ0FBVCxFQUFXO0FBQUMsUUFBSU8sSUFBRSxTQUFGQSxDQUFFLENBQVNULENBQVQsRUFBVztBQUFDLGFBQU9FLEVBQUVGLENBQUYsQ0FBUDtBQUFZLEtBQTlCO0FBQUEsUUFBK0JBLElBQUUsUUFBTXJXLEVBQUViLElBQUYsQ0FBT29YLENBQVAsRUFBVXpELElBQVYsQ0FBZSxHQUFmLENBQU4sR0FBMEIsR0FBM0Q7QUFBQSxRQUErRDFELElBQUV5RCxPQUFPd0QsQ0FBUCxDQUFqRTtBQUFBLFFBQTJFSyxJQUFFN0QsT0FBT3dELENBQVAsRUFBUyxHQUFULENBQTdFLENBQTJGLE9BQU8sVUFBU0EsQ0FBVCxFQUFXO0FBQUMsYUFBT0EsSUFBRSxRQUFNQSxDQUFOLEdBQVEsRUFBUixHQUFXLEtBQUdBLENBQWhCLEVBQWtCakgsRUFBRXhQLElBQUYsQ0FBT3lXLENBQVAsSUFBVUEsRUFBRTFLLE9BQUYsQ0FBVStLLENBQVYsRUFBWUksQ0FBWixDQUFWLEdBQXlCVCxDQUFsRDtBQUFvRCxLQUF2RTtBQUF3RSxHQUFoUixDQUFpUnJXLEVBQUVvZ0IsTUFBRixHQUFTRCxFQUFFRixDQUFGLENBQVQsRUFBY2pnQixFQUFFcWdCLFFBQUYsR0FBV0YsRUFBRUQsQ0FBRixDQUF6QixFQUE4QmxnQixFQUFFc2dCLE1BQUYsR0FBUyxVQUFTakssQ0FBVCxFQUFXRSxDQUFYLEVBQWFPLENBQWIsRUFBZTtBQUFDOVcsTUFBRU0sT0FBRixDQUFVaVcsQ0FBVixNQUFlQSxJQUFFLENBQUNBLENBQUQsQ0FBakIsRUFBc0IsSUFBSW5ILElBQUVtSCxFQUFFOWMsTUFBUixDQUFlLElBQUcsQ0FBQzJWLENBQUosRUFBTSxPQUFPcFAsRUFBRTBYLFVBQUYsQ0FBYVosQ0FBYixJQUFnQkEsRUFBRS9ULElBQUYsQ0FBT3NULENBQVAsQ0FBaEIsR0FBMEJTLENBQWpDLENBQW1DLEtBQUksSUFBSUosSUFBRSxDQUFWLEVBQVlBLElBQUV0SCxDQUFkLEVBQWdCc0gsR0FBaEIsRUFBb0I7QUFBQyxVQUFJbGQsSUFBRSxRQUFNNmMsQ0FBTixHQUFRLEtBQUssQ0FBYixHQUFlQSxFQUFFRSxFQUFFRyxDQUFGLENBQUYsQ0FBckIsQ0FBNkIsS0FBSyxDQUFMLEtBQVNsZCxDQUFULEtBQWFBLElBQUVzZCxDQUFGLEVBQUlKLElBQUV0SCxDQUFuQixHQUFzQmlILElBQUVyVyxFQUFFMFgsVUFBRixDQUFhbGUsQ0FBYixJQUFnQkEsRUFBRXVKLElBQUYsQ0FBT3NULENBQVAsQ0FBaEIsR0FBMEI3YyxDQUFsRDtBQUFvRCxZQUFPNmMsQ0FBUDtBQUFTLEdBQXBQLENBQXFQLElBQUlrSyxJQUFFLENBQU4sQ0FBUXZnQixFQUFFd2dCLFFBQUYsR0FBVyxVQUFTbkssQ0FBVCxFQUFXO0FBQUMsUUFBSUUsSUFBRSxFQUFFZ0ssQ0FBRixHQUFJLEVBQVYsQ0FBYSxPQUFPbEssSUFBRUEsSUFBRUUsQ0FBSixHQUFNQSxDQUFiO0FBQWUsR0FBbkQsRUFBb0R2VyxFQUFFeWdCLGdCQUFGLEdBQW1CLEVBQUNDLFVBQVMsaUJBQVYsRUFBNEJDLGFBQVksa0JBQXhDLEVBQTJEUCxRQUFPLGtCQUFsRSxFQUF2RSxDQUE2SixJQUFJUSxJQUFFLE1BQU47QUFBQSxNQUFhQyxJQUFFLEVBQUMsS0FBSSxHQUFMLEVBQVMsTUFBSyxJQUFkLEVBQW1CLE1BQUssR0FBeEIsRUFBNEIsTUFBSyxHQUFqQyxFQUFxQyxVQUFTLE9BQTlDLEVBQXNELFVBQVMsT0FBL0QsRUFBZjtBQUFBLE1BQXVGQyxJQUFFLDJCQUF6RjtBQUFBLE1BQXFIQyxJQUFFLFNBQUZBLENBQUUsQ0FBUzFLLENBQVQsRUFBVztBQUFDLFdBQU0sT0FBS3dLLEVBQUV4SyxDQUFGLENBQVg7QUFBZ0IsR0FBbkosQ0FBb0pyVyxFQUFFZ2hCLFFBQUYsR0FBVyxVQUFTeG5CLENBQVQsRUFBVzZjLENBQVgsRUFBYUUsQ0FBYixFQUFlO0FBQUMsS0FBQ0YsQ0FBRCxJQUFJRSxDQUFKLEtBQVFGLElBQUVFLENBQVYsR0FBYUYsSUFBRXJXLEVBQUU0ZSxRQUFGLENBQVcsRUFBWCxFQUFjdkksQ0FBZCxFQUFnQnJXLEVBQUV5Z0IsZ0JBQWxCLENBQWYsQ0FBbUQsSUFBSTNKLENBQUo7QUFBQSxRQUFNMUgsSUFBRXlELE9BQU8sQ0FBQyxDQUFDd0QsRUFBRStKLE1BQUYsSUFBVVEsQ0FBWCxFQUFjdGIsTUFBZixFQUFzQixDQUFDK1EsRUFBRXNLLFdBQUYsSUFBZUMsQ0FBaEIsRUFBbUJ0YixNQUF6QyxFQUFnRCxDQUFDK1EsRUFBRXFLLFFBQUYsSUFBWUUsQ0FBYixFQUFnQnRiLE1BQWhFLEVBQXdFd04sSUFBeEUsQ0FBNkUsR0FBN0UsSUFBa0YsSUFBekYsRUFBOEYsR0FBOUYsQ0FBUjtBQUFBLFFBQTJHMEQsSUFBRSxDQUE3RztBQUFBLFFBQStHTyxJQUFFLFFBQWpILENBQTBIdmQsRUFBRW1TLE9BQUYsQ0FBVXlELENBQVYsRUFBWSxVQUFTaUgsQ0FBVCxFQUFXRSxDQUFYLEVBQWFPLENBQWIsRUFBZTFILENBQWYsRUFBaUJzSCxDQUFqQixFQUFtQjtBQUFDLGFBQU9LLEtBQUd2ZCxFQUFFK0YsS0FBRixDQUFRaVgsQ0FBUixFQUFVRSxDQUFWLEVBQWEvSyxPQUFiLENBQXFCbVYsQ0FBckIsRUFBdUJDLENBQXZCLENBQUgsRUFBNkJ2SyxJQUFFRSxJQUFFTCxFQUFFNWMsTUFBbkMsRUFBMEM4YyxJQUFFUSxLQUFHLGdCQUFjUixDQUFkLEdBQWdCLGdDQUFyQixHQUFzRE8sSUFBRUMsS0FBRyxnQkFBY0QsQ0FBZCxHQUFnQixzQkFBckIsR0FBNEMxSCxNQUFJMkgsS0FBRyxTQUFPM0gsQ0FBUCxHQUFTLFVBQWhCLENBQTVJLEVBQXdLaUgsQ0FBL0s7QUFBaUwsS0FBak4sR0FBbU5VLEtBQUcsTUFBdE4sRUFBNk5WLEVBQUU0SyxRQUFGLEtBQWFsSyxJQUFFLHFCQUFtQkEsQ0FBbkIsR0FBcUIsS0FBcEMsQ0FBN04sRUFBd1FBLElBQUUsNkNBQTJDLG1EQUEzQyxHQUErRkEsQ0FBL0YsR0FBaUcsZUFBM1csQ0FBMlgsSUFBRztBQUFDRCxVQUFFLElBQUlvSyxRQUFKLENBQWE3SyxFQUFFNEssUUFBRixJQUFZLEtBQXpCLEVBQStCLEdBQS9CLEVBQW1DbEssQ0FBbkMsQ0FBRjtBQUF3QyxLQUE1QyxDQUE0QyxPQUFNVixDQUFOLEVBQVE7QUFBQyxZQUFNQSxFQUFFL1EsTUFBRixHQUFTeVIsQ0FBVCxFQUFXVixDQUFqQjtBQUFtQixTQUFJSyxJQUFFLFNBQUZBLENBQUUsQ0FBU0wsQ0FBVCxFQUFXO0FBQUMsYUFBT1MsRUFBRS9ULElBQUYsQ0FBTyxJQUFQLEVBQVlzVCxDQUFaLEVBQWNyVyxDQUFkLENBQVA7QUFBd0IsS0FBMUM7QUFBQSxRQUEyQzJXLElBQUVOLEVBQUU0SyxRQUFGLElBQVksS0FBekQsQ0FBK0QsT0FBT3ZLLEVBQUVwUixNQUFGLEdBQVMsY0FBWXFSLENBQVosR0FBYyxNQUFkLEdBQXFCSSxDQUFyQixHQUF1QixHQUFoQyxFQUFvQ0wsQ0FBM0M7QUFBNkMsR0FBdnZCLEVBQXd2QjFXLEVBQUVtaEIsS0FBRixHQUFRLFVBQVM5SyxDQUFULEVBQVc7QUFBQyxRQUFJRSxJQUFFdlcsRUFBRXFXLENBQUYsQ0FBTixDQUFXLE9BQU9FLEVBQUU2SyxNQUFGLEdBQVMsQ0FBQyxDQUFWLEVBQVk3SyxDQUFuQjtBQUFxQixHQUE1eUIsQ0FBNnlCLElBQUk4SyxJQUFFLFNBQUZBLENBQUUsQ0FBU2hMLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsV0FBT0YsRUFBRStLLE1BQUYsR0FBU3BoQixFQUFFdVcsQ0FBRixFQUFLNEssS0FBTCxFQUFULEdBQXNCNUssQ0FBN0I7QUFBK0IsR0FBbkQsQ0FBb0R2VyxFQUFFc2hCLEtBQUYsR0FBUSxVQUFTeEssQ0FBVCxFQUFXO0FBQUMsV0FBTzlXLEVBQUVxWSxJQUFGLENBQU9yWSxFQUFFaWUsU0FBRixDQUFZbkgsQ0FBWixDQUFQLEVBQXNCLFVBQVNULENBQVQsRUFBVztBQUFDLFVBQUlFLElBQUV2VyxFQUFFcVcsQ0FBRixJQUFLUyxFQUFFVCxDQUFGLENBQVgsQ0FBZ0JyVyxFQUFFcUUsU0FBRixDQUFZZ1MsQ0FBWixJQUFlLFlBQVU7QUFBQyxZQUFJQSxJQUFFLENBQUMsS0FBS1ksUUFBTixDQUFOLENBQXNCLE9BQU9QLEVBQUU1VCxLQUFGLENBQVF1VCxDQUFSLEVBQVVyVCxTQUFWLEdBQXFCcWUsRUFBRSxJQUFGLEVBQU85SyxFQUFFelQsS0FBRixDQUFROUMsQ0FBUixFQUFVcVcsQ0FBVixDQUFQLENBQTVCO0FBQWlELE9BQWpHO0FBQWtHLEtBQXBKLEdBQXNKclcsQ0FBN0o7QUFBK0osR0FBbkwsRUFBb0xBLEVBQUVzaEIsS0FBRixDQUFRdGhCLENBQVIsQ0FBcEwsRUFBK0xBLEVBQUVxWSxJQUFGLENBQU8sQ0FBQyxLQUFELEVBQU8sTUFBUCxFQUFjLFNBQWQsRUFBd0IsT0FBeEIsRUFBZ0MsTUFBaEMsRUFBdUMsUUFBdkMsRUFBZ0QsU0FBaEQsQ0FBUCxFQUFrRSxVQUFTOUIsQ0FBVCxFQUFXO0FBQUMsUUFBSU8sSUFBRTFILEVBQUVtSCxDQUFGLENBQU4sQ0FBV3ZXLEVBQUVxRSxTQUFGLENBQVlrUyxDQUFaLElBQWUsWUFBVTtBQUFDLFVBQUlGLElBQUUsS0FBS1ksUUFBWCxDQUFvQixPQUFPSCxFQUFFaFUsS0FBRixDQUFRdVQsQ0FBUixFQUFVclQsU0FBVixHQUFxQixZQUFVdVQsQ0FBVixJQUFhLGFBQVdBLENBQXhCLElBQTJCLE1BQUlGLEVBQUU1YyxNQUFqQyxJQUF5QyxPQUFPNGMsRUFBRSxDQUFGLENBQXJFLEVBQTBFZ0wsRUFBRSxJQUFGLEVBQU9oTCxDQUFQLENBQWpGO0FBQTJGLEtBQXpJO0FBQTBJLEdBQW5PLENBQS9MLEVBQW9hclcsRUFBRXFZLElBQUYsQ0FBTyxDQUFDLFFBQUQsRUFBVSxNQUFWLEVBQWlCLE9BQWpCLENBQVAsRUFBaUMsVUFBU2hDLENBQVQsRUFBVztBQUFDLFFBQUlFLElBQUVuSCxFQUFFaUgsQ0FBRixDQUFOLENBQVdyVyxFQUFFcUUsU0FBRixDQUFZZ1MsQ0FBWixJQUFlLFlBQVU7QUFBQyxhQUFPZ0wsRUFBRSxJQUFGLEVBQU85SyxFQUFFelQsS0FBRixDQUFRLEtBQUttVSxRQUFiLEVBQXNCalUsU0FBdEIsQ0FBUCxDQUFQO0FBQWdELEtBQTFFO0FBQTJFLEdBQW5JLENBQXBhLEVBQXlpQmhELEVBQUVxRSxTQUFGLENBQVlvSixLQUFaLEdBQWtCLFlBQVU7QUFBQyxXQUFPLEtBQUt3SixRQUFaO0FBQXFCLEdBQTNsQixFQUE0bEJqWCxFQUFFcUUsU0FBRixDQUFZMGEsT0FBWixHQUFvQi9lLEVBQUVxRSxTQUFGLENBQVlrZCxNQUFaLEdBQW1CdmhCLEVBQUVxRSxTQUFGLENBQVlvSixLQUEvb0IsRUFBcXBCek4sRUFBRXFFLFNBQUYsQ0FBWTNFLFFBQVosR0FBcUIsWUFBVTtBQUFDLFdBQU9pZixPQUFPLEtBQUsxSCxRQUFaLENBQVA7QUFBNkIsR0FBbHRCLEVBQW10QixjQUFZLFVBQVosSUFBMkIsZ0dBQTNCLElBQXVDLGlDQUFvQixFQUFwQixtQ0FBdUIsWUFBVTtBQUFDLFdBQU9qWCxDQUFQO0FBQVMsR0FBM0M7QUFBQSxvR0FBMXZCO0FBQXV5QixDQUExN2lCLEVBQUQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTs7QUFFTyxJQUFNd2hCLDBCQUFTLFNBQVRBLE1BQVMsQ0FBVTdhLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ3hDLFdBQVFELEtBQUtoSCxPQUFMLENBQWEsT0FBYixLQUF5QixDQUF6QixJQUE4QmlILFFBQVEsTUFBOUM7QUFDSCxDQUZNO0FBR0EsSUFBTTZhLDhCQUFXLFNBQVhBLFFBQVcsQ0FBVTlhLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQzFDLFFBQUdELElBQUgsRUFBUTtBQUNKLGVBQVFBLEtBQUtoSCxPQUFMLENBQWEsS0FBYixNQUF3QixDQUF4QixJQUE2QmdILEtBQUtoSCxPQUFMLENBQWEsTUFBYixNQUF5QixDQUF0RCxJQUEyRGlILFNBQVMsUUFBNUU7QUFDSDtBQUNELFdBQU8sS0FBUDtBQUNILENBTE07QUFNQSxJQUFNOGEsMEJBQVMsU0FBVEEsTUFBUyxDQUFVL2EsSUFBVixFQUFnQkMsSUFBaEIsRUFBc0I7QUFDeEMsV0FBU0EsU0FBUyxLQUFULElBQW1CQSxTQUFTLE1BQTVCLElBQXNDQSxTQUFTLHNCQUEvQyxJQUF5RSwrQkFBaUJELElBQWpCLEtBQTBCLEtBQTVHO0FBQ0gsQ0FGTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1hQOzs7O0FBSU8sSUFBTWdiLHdDQUFnQixTQUFoQkEsYUFBZ0IsQ0FBU0MsVUFBVCxFQUFxQjtBQUM5QyxRQUFNQyxVQUFVcGIsU0FBU3FiLG9CQUFULENBQThCLFFBQTlCLENBQWhCO0FBQ0EsU0FBSyxJQUFJdG9CLElBQUksQ0FBYixFQUFnQkEsSUFBSXFvQixRQUFRcG9CLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QztBQUNyQyxZQUFNdW9CLE1BQU1GLFFBQVFyb0IsQ0FBUixFQUFXdW9CLEdBQXZCO0FBQ0EsWUFBSUEsR0FBSixFQUFTO0FBQ0wsZ0JBQU1saUIsUUFBUWtpQixJQUFJak0sV0FBSixDQUFnQixNQUFNOEwsVUFBdEIsQ0FBZDtBQUNBLGdCQUFJL2hCLFNBQVMsQ0FBYixFQUFnQjtBQUNaLHVCQUFPa2lCLElBQUloaUIsTUFBSixDQUFXLENBQVgsRUFBY0YsUUFBUSxDQUF0QixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsV0FBTyxFQUFQO0FBQ0gsQ0FaTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0pQOzs7QUFHTyxJQUFNakgsNEJBQVUsa0JBQWhCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FQOzs7O0FBQ0E7Ozs7OztBQUpBOzs7QUFNQSxJQUFNb3BCLG1CQUFtQixTQUFuQkEsZ0JBQW1CLENBQVNDLFVBQVQsRUFBcUJDLEdBQXJCLEVBQXlCO0FBQzlDLFFBQU1DLFFBQVEsc0JBQUksTUFBSUQsSUFBSXJSLEtBQUosRUFBUixDQUFkO0FBQ0EsUUFBSXVSLGNBQWMsRUFBbEI7QUFBQSxRQUFzQkMsZ0JBQWdCLEVBQXRDO0FBQUEsUUFBMENDLGVBQWUsS0FBekQ7O0FBRUEsUUFBSUMsdUJBQXVCO0FBQ3ZCQyw0QkFBcUIsa0JBREU7QUFFdkJDLCtCQUF3QixxQkFGRDtBQUd2QkMsa0NBQTJCLHdCQUhKO0FBSXZCQyw0QkFBcUI7QUFKRSxLQUEzQjs7QUFPQSxRQUFJQyw0QkFBNEIsU0FBNUJBLHlCQUE0QixDQUFTaGdCLEtBQVQsRUFBZTtBQUMzQyxZQUFJaWdCLGtCQUFrQixTQUFsQkEsZUFBa0IsR0FBVTtBQUM1QixtQkFBT3BjLFNBQVNxYyxpQkFBVCxJQUE4QnJjLFNBQVNzYyx1QkFBdkMsSUFBa0V0YyxTQUFTdWMsb0JBQTNFLElBQW1HdmMsU0FBU3djLG1CQUFuSDtBQUNILFNBRkQ7O0FBSUEsWUFBSUosaUJBQUosRUFBdUI7QUFDbkJWLGtCQUFNN1AsUUFBTixDQUFlLGdCQUFmO0FBQ0FnUSwyQkFBZSxJQUFmO0FBQ0FGLHdCQUFZblAsSUFBWjtBQUNBb1AsMEJBQWN0UCxJQUFkO0FBQ0gsU0FMRCxNQUtPO0FBQ0hvUCxrQkFBTXZQLFdBQU4sQ0FBa0IsZ0JBQWxCO0FBQ0EwUCwyQkFBZSxLQUFmO0FBQ0FGLHdCQUFZclAsSUFBWjtBQUNBc1AsMEJBQWNwUCxJQUFkO0FBQ0g7QUFDSixLQWhCRDs7QUFrQkEsUUFBSWlRLG9CQUFvQixTQUFwQkEsaUJBQW9CLEdBQVk7QUFDaEMsWUFBSWYsTUFBTXpOLEdBQU4sR0FBWXlPLGlCQUFoQixFQUFtQztBQUMvQmhCLGtCQUFNek4sR0FBTixHQUFZeU8saUJBQVo7QUFDSCxTQUZELE1BRU8sSUFBSWhCLE1BQU16TixHQUFOLEdBQVkwTyx1QkFBaEIsRUFBeUM7QUFDNUNqQixrQkFBTXpOLEdBQU4sR0FBWTBPLHVCQUFaO0FBQ0gsU0FGTSxNQUVBLElBQUlqQixNQUFNek4sR0FBTixHQUFZMk8sb0JBQWhCLEVBQXNDO0FBQ3pDbEIsa0JBQU16TixHQUFOLEdBQVkyTyxvQkFBWjtBQUNILFNBRk0sTUFFQSxJQUFJbEIsTUFBTXpOLEdBQU4sR0FBWTRPLG1CQUFoQixFQUFxQztBQUN4Q25CLGtCQUFNek4sR0FBTixHQUFZNE8sbUJBQVo7QUFDSCxTQUZNLE1BRUE7QUFDSDtBQUNIO0FBQ0osS0FaRDtBQWFBLFFBQUlDLGlCQUFpQixTQUFqQkEsY0FBaUIsR0FBWTs7QUFFN0IsWUFBSTljLFNBQVMrYyxjQUFiLEVBQTZCO0FBQ3pCL2MscUJBQVMrYyxjQUFUO0FBQ0gsU0FGRCxNQUVPLElBQUkvYyxTQUFTZ2Qsb0JBQWIsRUFBbUM7QUFDdENoZCxxQkFBU2dkLG9CQUFUO0FBQ0gsU0FGTSxNQUVBLElBQUloZCxTQUFTaWQsbUJBQWIsRUFBa0M7QUFDckNqZCxxQkFBU2lkLG1CQUFUO0FBQ0gsU0FGTSxNQUVBLElBQUlqZCxTQUFTa2QsZ0JBQWIsRUFBK0I7QUFDbENsZCxxQkFBU2tkLGdCQUFUO0FBQ0gsU0FGTSxNQUVBO0FBQ0g7QUFDSDtBQUNKLEtBYkQ7QUFjQSxRQUFJQyxtQkFBbUIsU0FBbkJBLGdCQUFtQixHQUFZO0FBQy9CLFlBQUksQ0FBQ3RCLFlBQUwsRUFBbUI7QUFDZlk7QUFDSCxTQUZELE1BRU87QUFDSEs7QUFDSDtBQUNKLEtBTkQ7O0FBUUEsUUFBTU0sYUFBYSxTQUFiQSxVQUFhLENBQVNDLFFBQVQsRUFBbUI5QyxRQUFuQixFQUE0QjtBQUMzQ29CLHNCQUFjMEIsU0FBUzVSLElBQVQsQ0FBYyxtQ0FBZCxDQUFkO0FBQ0FtUSx3QkFBZ0J5QixTQUFTNVIsSUFBVCxDQUFjLHFDQUFkLENBQWhCOztBQUVBO0FBQ0FoVCxlQUFPQyxJQUFQLENBQVlvakIsb0JBQVosRUFBa0NuakIsT0FBbEMsQ0FBMEMscUJBQWE7QUFDbkQ7QUFDQTtBQUNBLGdCQUFHcUgsU0FBU3NkLFNBQVQsTUFBd0IsSUFBM0IsRUFBZ0M7QUFDNUJ0ZCx5QkFBU3VkLGdCQUFULENBQTBCekIscUJBQXFCd0IsU0FBckIsQ0FBMUIsRUFBMkRuQix5QkFBM0Q7QUFDSDtBQUVKLFNBUEQ7QUFTSCxLQWREO0FBZUEsUUFBTXFCLGNBQWMsU0FBZEEsV0FBYyxHQUFVO0FBQzFCO0FBQ0Eva0IsZUFBT0MsSUFBUCxDQUFZb2pCLG9CQUFaLEVBQWtDbmpCLE9BQWxDLENBQTBDLHFCQUFhO0FBQ25ELGdCQUFHcUgsU0FBU3NkLFNBQVQsTUFBd0IsSUFBM0IsRUFBZ0M7QUFDNUJ0ZCx5QkFBU3lkLG1CQUFULENBQTZCM0IscUJBQXFCd0IsU0FBckIsQ0FBN0IsRUFBOERuQix5QkFBOUQ7QUFDSDtBQUVKLFNBTEQ7QUFNSCxLQVJEO0FBU0EsUUFBTW5nQixTQUFTO0FBQ1gsd0NBQWlDLGtDQUFTRyxLQUFULEVBQWdCa2hCLFFBQWhCLEVBQTBCOUMsUUFBMUIsRUFBbUM7QUFDaEVwZSxrQkFBTXVoQixjQUFOO0FBQ0FQO0FBQ0g7QUFKVSxLQUFmOztBQU9BLFdBQU8sNEJBQWEzQixVQUFiLEVBQXlCLGtCQUF6QixFQUE2QyxJQUE3QyxFQUFtRHhmLE1BQW5ELEVBQTJEb2hCLFVBQTNELEVBQXVFSSxXQUF2RSxDQUFQO0FBRUgsQ0FqR0Q7O2tCQW1HZWpDLGdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDekdBLFlBQU07QUFDakIsV0FDSSxzREFDSSxrREFESixHQUVJLG9EQUZKLEdBR0EsV0FKSjtBQU1ILEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBWkE7OztBQWtCQSxJQUFNb0MsV0FBVyxTQUFYQSxRQUFXLENBQVNuQyxVQUFULEVBQXFCQyxHQUFyQixFQUF5QjtBQUN0QyxRQUFJbUMsZUFBZSxFQUFuQjtBQUFBLFFBQXVCQyxhQUFZLEVBQW5DO0FBQUEsUUFBdUNDLGNBQWMsRUFBckQ7QUFBQSxRQUF5REMsY0FBYyxFQUF2RTtBQUFBLFFBQTJFQyxtQkFBbUIsRUFBOUY7O0FBRUEsUUFBSUMsd0JBQXdCLFNBQXhCQSxxQkFBd0IsR0FBVTtBQUNsQyxZQUFJQyxRQUFRLEVBQUNDLE9BQVEsVUFBVCxFQUFxQkMsUUFBUyxJQUE5QixFQUFvQzlRLE1BQU8sRUFBM0MsRUFBWjtBQUNBLFlBQUdtTyxJQUFJOWxCLFdBQUosT0FBc0Iwb0IsUUFBekIsRUFBa0M7QUFDOUIsZ0JBQUkvUSxPQUFPO0FBQ1A2USx1QkFBUSxPQUREO0FBRVBuWCx1QkFBU3lVLElBQUk5a0IsZUFBSixPQUEwQixDQUExQixHQUE4QixRQUE5QixHQUF5QzhrQixJQUFJOWtCLGVBQUosRUFGM0M7QUFHUHdKLHNCQUFPO0FBSEEsYUFBWDtBQUtBK2Qsa0JBQU01USxJQUFOLENBQVdqVCxJQUFYLENBQWdCaVQsSUFBaEI7QUFDSDs7QUFFRCxZQUFJbU8sSUFBSWpuQixnQkFBSixHQUF1QnhCLE1BQXZCLEdBQWdDLENBQXBDLEVBQXVDO0FBQ25DLGdCQUFJc3JCLGdCQUFnQjdDLElBQUlqbkIsZ0JBQUosRUFBcEI7QUFDQSxnQkFBSUYsaUJBQWlCbW5CLElBQUlsbkIsaUJBQUosRUFBckI7O0FBRUEsZ0JBQUkrWSxRQUFPO0FBQ1A2USx1QkFBUSxRQUREO0FBRVBuWCx1QkFBUXNYLGNBQWNocUIsY0FBZCxJQUFnQ2dxQixjQUFjaHFCLGNBQWQsRUFBOEJuQixLQUE5RCxHQUFzRSxTQUZ2RTtBQUdQZ04sc0JBQU87QUFIQSxhQUFYOztBQU1BK2Qsa0JBQU01USxJQUFOLENBQVdqVCxJQUFYLENBQWdCaVQsS0FBaEI7QUFDSDtBQUNELGVBQU80USxLQUFQO0FBQ0gsS0F4QkQ7O0FBMEJBLFFBQU1kLGFBQWEsU0FBYkEsVUFBYSxDQUFTQyxRQUFULEVBQW1COUMsUUFBbkIsRUFBNEI7O0FBRTNDLFlBQUlnRSxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQVN4cUIsSUFBVCxFQUFjO0FBQ2hDLGdCQUFHZ3FCLFdBQUgsRUFBZTtBQUNYQSw0QkFBWXhxQixPQUFaO0FBQ0g7QUFDRHdxQiwwQkFBYywyQkFBWVYsU0FBUzVSLElBQVQsQ0FBYyxvQkFBZCxDQUFaLEVBQWlEZ1EsR0FBakQsRUFBc0QxbkIsSUFBdEQsQ0FBZDtBQUNILFNBTEQ7QUFNQSxZQUFJeXFCLGtCQUFrQixTQUFsQkEsZUFBa0IsR0FBVTtBQUM1QixnQkFBR1YsV0FBSCxFQUFlO0FBQ1hBLDRCQUFZdnFCLE9BQVo7QUFDSDtBQUNEdXFCLDBCQUFjLDJCQUFZVCxTQUFTNVIsSUFBVCxDQUFjLDRCQUFkLENBQVosRUFBeURnUSxHQUF6RCxDQUFkO0FBQ0gsU0FMRDs7QUFPQW9DLHFCQUFhLDBCQUFXUixTQUFTNVIsSUFBVCxDQUFjLG9CQUFkLENBQVgsRUFBZ0RnUSxHQUFoRCxDQUFiO0FBQ0FtQyx1QkFBZSw0QkFBYVAsU0FBUzVSLElBQVQsQ0FBYyxvQkFBZCxDQUFiLEVBQWtEZ1EsR0FBbEQsQ0FBZjtBQUNBdUMsMkJBQW1CLGdDQUFpQlgsU0FBUzVSLElBQVQsQ0FBYyxxQkFBZCxDQUFqQixFQUF1RGdRLEdBQXZELENBQW5COztBQUdBQSxZQUFJNW5CLEVBQUosQ0FBT3FQLHVCQUFQLEVBQXFCLFVBQVNuUCxJQUFULEVBQWU7QUFDaEN3cUIsNEJBQWdCeHFCLElBQWhCO0FBQ0EsZ0JBQUdBLEtBQUs0RyxRQUFMLEtBQWtCMGpCLFFBQXJCLEVBQThCO0FBQzFCO0FBQ0Esb0JBQUdQLFdBQUgsRUFBZTtBQUNYQSxnQ0FBWXZxQixPQUFaO0FBQ0g7QUFDSixhQUxELE1BS0s7QUFDRDtBQUNBaXJCO0FBQ0g7QUFDSixTQVhEO0FBWUEvQyxZQUFJNW5CLEVBQUosQ0FBT0ksZ0JBQVAsRUFBYyxVQUFTYyxLQUFULEVBQWdCO0FBQzFCd2xCLHFCQUFTaG5CLE9BQVQ7QUFDSCxTQUZEO0FBR0gsS0FuQ0Q7QUFvQ0EsUUFBTWlxQixjQUFjLFNBQWRBLFdBQWMsR0FBVTtBQUMxQjtBQUNILEtBRkQ7QUFHQSxRQUFNeGhCLFNBQVM7QUFDWCxvQ0FBNkIsK0JBQVNHLEtBQVQsRUFBZ0JraEIsUUFBaEIsRUFBMEI5QyxRQUExQixFQUFtQztBQUM1RHBlLGtCQUFNdWhCLGNBQU47O0FBRUFFLHlCQUFhYSxZQUFiLENBQTBCLEtBQTFCO0FBQ0FwQixxQkFBUzVSLElBQVQsQ0FBYyw4QkFBZCxFQUE4Q1UsV0FBOUMsQ0FBMEQsUUFBMUQ7QUFDSCxTQU5VO0FBT1gscUNBQThCLCtCQUFTaFEsS0FBVCxFQUFnQmtoQixRQUFoQixFQUEwQjlDLFFBQTFCLEVBQW1DO0FBQzdEcGUsa0JBQU11aEIsY0FBTjs7QUFFQTtBQUNBLGdCQUFHZ0IsMkJBQWlCMXJCLE1BQWpCLEdBQTBCLENBQTdCLEVBQStCO0FBQzNCO0FBQ0ErRyxxQ0FBRTZYLElBQUYsQ0FBTzhNLDBCQUFQLEVBQXlCLFVBQVNDLFlBQVQsRUFBc0I7QUFDM0NBLGlDQUFhcHJCLE9BQWI7QUFDSCxpQkFGRDtBQUdBbXJCLDJDQUFpQmxnQixNQUFqQixDQUF3QixDQUF4QixFQUEyQmtnQiwyQkFBaUIxckIsTUFBNUM7QUFDSCxhQU5ELE1BTUs7QUFDRDByQiwyQ0FBaUJya0IsSUFBakIsQ0FBc0IsNEJBQWFnakIsUUFBYixFQUF1QjVCLEdBQXZCLEVBQTRCd0MsdUJBQTVCLENBQXRCO0FBQ0g7QUFDSjtBQXBCVSxLQUFmOztBQTBCQSxXQUFPLDRCQUFhekMsVUFBYixFQUF5QixVQUF6QixFQUFzQyxJQUF0QyxFQUE2Q3hmLE1BQTdDLEVBQXFEb2hCLFVBQXJELEVBQWlFSSxXQUFqRSxDQUFQO0FBQ0gsQ0EvRkQ7O2tCQWlHZUcsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEhmLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxHQUFVO0FBQ3ZCLFlBQU8seUNBQ0YseUNBREUsR0FFRixnQ0FGRSxHQUdGLDZDQUhFLEdBSUYsWUFKRSxHQUtGLGdDQUxFLEdBTUYseUNBTkUsR0FPRixnQkFQRSxHQVFGLDBDQVJFLEdBU0YsK0dBVEUsR0FVRixnQkFWRSxHQVdGLFlBWEUsR0FZRixRQVpMO0FBYUE7QUFFSCxDQWhCRDs7a0JBb0JlQSxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQmY7Ozs7QUFDQTs7OztBQUpBOzs7QUFnQkEsSUFBTWlCLGFBQWEsU0FBYkEsVUFBYSxDQUFVcEQsVUFBVixFQUFzQkMsR0FBdEIsRUFBMkI7QUFDMUMsUUFBSW9ELFlBQVksRUFBaEI7QUFBQSxRQUNJQyxhQUFhLEVBRGpCO0FBQUEsUUFFSUMsY0FBYyxFQUZsQjs7QUFLQSxRQUFJQyxpQkFBaUIsU0FBakJBLGNBQWlCLENBQVMvb0IsS0FBVCxFQUFlO0FBQ2hDNG9CLGtCQUFVclMsSUFBVjtBQUNBc1MsbUJBQVd0UyxJQUFYO0FBQ0F1UyxvQkFBWXZTLElBQVo7O0FBRUEsWUFBR3ZXLFVBQVUwTCx3QkFBYixFQUEyQjtBQUN2Qm1kLHVCQUFXeFMsSUFBWDtBQUNILFNBRkQsTUFFTSxJQUFHclcsVUFBVXlMLHVCQUFiLEVBQTBCO0FBQzVCbWQsc0JBQVV2UyxJQUFWO0FBQ0gsU0FGSyxNQUVBLElBQUdyVyxVQUFVd0wseUJBQWIsRUFBNEI7QUFDOUJvZCxzQkFBVXZTLElBQVY7QUFDSCxTQUZLLE1BRUQ7QUFDRHVTLHNCQUFVdlMsSUFBVjtBQUNIO0FBRUosS0FmRDs7QUFtQkEsUUFBTThRLGFBQWEsU0FBYkEsVUFBYSxDQUFTQyxRQUFULEVBQW1COUMsUUFBbkIsRUFBNEI7QUFDM0NzRSxvQkFBWXhCLFNBQVM1UixJQUFULENBQWUsMkJBQWYsQ0FBWjtBQUNBcVQscUJBQWF6QixTQUFTNVIsSUFBVCxDQUFjLDRCQUFkLENBQWI7QUFDQXNULHNCQUFjMUIsU0FBUzVSLElBQVQsQ0FBYyw2QkFBZCxDQUFkOztBQUVBZ1EsWUFBSTVuQixFQUFKLENBQU80Tyx1QkFBUCxFQUFxQixVQUFTMU8sSUFBVCxFQUFjO0FBQy9CLGdCQUFHQSxRQUFRQSxLQUFLa3JCLFFBQWhCLEVBQXlCO0FBQ3JCRCwrQkFBZWpyQixLQUFLa3JCLFFBQXBCO0FBQ0g7QUFDSixTQUpEO0FBS0gsS0FWRDtBQVdBLFFBQU16QixjQUFjLFNBQWRBLFdBQWMsR0FBVTtBQUMxQjtBQUNILEtBRkQ7QUFHQSxRQUFNeGhCLFNBQVM7QUFDWCxrQ0FBMkIsNEJBQVNHLEtBQVQsRUFBZ0JraEIsUUFBaEIsRUFBMEI5QyxRQUExQixFQUFtQztBQUMxRHBlLGtCQUFNdWhCLGNBQU47QUFDQSxnQkFBTXdCLGVBQWV6RCxJQUFJdmtCLFFBQUosRUFBckI7QUFDQSxnQkFBSWdvQixpQkFBaUIxZCxxQkFBckIsRUFBaUM7QUFDN0JpYSxvQkFBSXBsQixJQUFKO0FBQ0gsYUFGRCxNQUVPLElBQUk2b0IsaUJBQWlCdmQsd0JBQXJCLEVBQW9DO0FBQ3ZDOFosb0JBQUlobkIsS0FBSjtBQUNILGFBRk0sTUFFQSxJQUFJeXFCLGlCQUFpQnhkLHVCQUFyQixFQUFtQztBQUN0QytaLG9CQUFJcGxCLElBQUo7QUFDSCxhQUZNLE1BRUEsSUFBSTZvQixpQkFBaUJ6ZCx5QkFBckIsRUFBcUM7QUFDeENnYSxvQkFBSXBsQixJQUFKO0FBQ0g7QUFDSjtBQWJVLEtBQWY7O0FBZ0JBLFdBQU8sNEJBQWFtbEIsVUFBYixFQUF5QixZQUF6QixFQUF1QyxJQUF2QyxFQUE2Q3hmLE1BQTdDLEVBQXFEb2hCLFVBQXJELEVBQWlFSSxXQUFqRSxDQUFQO0FBQ0gsQ0F4REQ7O2tCQTBEZW9CLFU7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkMxRUEsWUFBTTtBQUNqQixXQUNJLDhEQUNJLDBDQURKLEdBRUksMkNBRkosR0FHSSw0Q0FISixHQUlBLFdBTEo7QUFPSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMRDs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQU9BLElBQU1PLGNBQWMsU0FBZEEsV0FBYyxDQUFTM0QsVUFBVCxFQUFxQkMsR0FBckIsRUFBeUI7QUFDekMsUUFBTUMsUUFBUSxzQkFBSSxNQUFJRCxJQUFJclIsS0FBSixFQUFSLENBQWQ7QUFDQSxRQUFJZ1YseUJBQXlCLENBQTdCO0FBQ0EsUUFBSUMsMkJBQTJCLENBQS9CO0FBQ0EsUUFBSUMsMEJBQTBCLENBQTlCOztBQUVBLFFBQUlDLGNBQWMsS0FBbEI7QUFBQSxRQUF5QkMsWUFBWSxLQUFyQzs7QUFFQSxRQUFJQyxlQUFlLEVBQW5CO0FBQUEsUUFDSUMsZ0JBQWdCLEVBRHBCO0FBQUEsUUFFSUMsZ0JBQWdCLEVBRnBCO0FBQUEsUUFHSUMsaUJBQWlCLEVBSHJCO0FBQUEsUUFJSUMsaUJBQWlCLEVBSnJCO0FBQUEsUUFLSUMsUUFBUSxFQUxaO0FBQUEsUUFNSUMsWUFBWSxDQU5oQjtBQUFBLFFBT0lDLFFBQVEsRUFQWjs7QUFVQSxRQUFJQyxtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFVQyxVQUFWLEVBQXNCO0FBQ3pDLFlBQU1DLG1CQUFtQlYsYUFBYTNuQixLQUFiLEVBQXpCO0FBQ0EsWUFBTXZCLFdBQVc0cEIsbUJBQW1CRCxVQUFwQzs7QUFFQVAsc0JBQWNqVSxHQUFkLENBQWtCLE9BQWxCLEVBQTJCblYsV0FBVSxJQUFyQztBQUNBcXBCLHVCQUFlbFUsR0FBZixDQUFtQixNQUFuQixFQUEyQm5WLFdBQVUsSUFBckM7O0FBRUEsWUFBTTZwQixjQUFjLENBQUNELG1CQUFtQkosU0FBcEIsSUFBaUNHLFVBQXJEO0FBQ0FMLHVCQUFlblUsR0FBZixDQUFtQixNQUFuQixFQUEyQjBVLGNBQWEsSUFBeEM7O0FBRUFoQixpQ0FBeUI3b0IsUUFBekI7QUFDQThvQixtQ0FBMkJhLFVBQTNCO0FBQ0gsS0FaRDs7QUFjQSxRQUFJRyxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFVSCxVQUFWLEVBQXNCO0FBQzFDLFlBQU1DLG1CQUFtQlYsYUFBYTNuQixLQUFiLEVBQXpCO0FBQ0EsWUFBTXdvQixnQkFBZ0JILG1CQUFtQkQsVUFBekM7O0FBRUFOLHVCQUFlbFUsR0FBZixDQUFtQixPQUFuQixFQUE0QndVLGNBQWMsQ0FBZCxHQUFpQkEsVUFBakIsR0FBK0JJLGdCQUFnQmxCLHNCQUFqQixHQUEwQyxJQUFwRztBQUNILEtBTEQ7O0FBT0EsUUFBSW1CLG1CQUFtQixTQUFuQkEsZ0JBQW1CLENBQVNMLFVBQVQsRUFBcUI7QUFDeEMsWUFBTUMsbUJBQW1CVixhQUFhM25CLEtBQWIsRUFBekI7QUFDQSxZQUFNMG9CLGVBQWVMLG1CQUFtQkQsVUFBeEM7O0FBRUFSLHNCQUFjaFUsR0FBZCxDQUFrQixPQUFsQixFQUEyQjhVLGVBQWMsSUFBekM7QUFDQWxCLGtDQUEwQlksVUFBMUI7QUFDSCxLQU5EOztBQVFBLFFBQUlPLHNCQUFzQixTQUF0QkEsbUJBQXNCLENBQVV0a0IsS0FBVixFQUFpQjtBQUN2QyxZQUFNZ2tCLG1CQUFtQlYsYUFBYTNuQixLQUFiLEVBQXpCO0FBQ0EsWUFBTTRvQixxQkFBcUJqQixhQUFhdlMsTUFBYixHQUFzQk0sSUFBakQ7QUFDQSxZQUFNbVQsaUJBQWlCeGtCLE1BQU15a0IsS0FBN0I7O0FBRUEsWUFBTVYsYUFBYSxDQUFDUyxpQkFBaUJELGtCQUFsQixJQUF3Q1AsZ0JBQTNEOztBQUVBLFlBQUlELGFBQWEsQ0FBakIsRUFBb0I7QUFDaEIsbUJBQU8sQ0FBUDtBQUNIOztBQUVELFlBQUlBLGFBQWEsQ0FBakIsRUFBb0I7QUFDaEIsbUJBQU8sQ0FBUDtBQUNIOztBQUVELGVBQU9BLFVBQVA7QUFDSCxLQWhCRDs7QUFrQkEsUUFBSVcsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBVVgsVUFBVixFQUFzQi9qQixLQUF0QixFQUE2QjtBQUNsRCxZQUFHdWlCLDJCQUFpQjFyQixNQUFqQixHQUEwQixDQUE3QixFQUErQjtBQUMzQmd0QixrQkFBTXhULElBQU47QUFDQTtBQUNIOztBQUVBLFlBQU03UixXQUFXOGdCLElBQUk5bEIsV0FBSixFQUFqQjtBQUNBLFlBQU0yWixTQUFTM1UsV0FBV3VsQixVQUExQjs7QUFFQSxZQUFNWSxNQUFNLHlCQUFXeFIsTUFBWCxDQUFaOztBQUVBMFEsY0FBTXBULElBQU4sQ0FBV2tVLEdBQVg7O0FBRUEsWUFBTUMsZ0JBQWdCZixNQUFNbG9CLEtBQU4sRUFBdEI7QUFDQSxZQUFNcW9CLG1CQUFtQlYsYUFBYTNuQixLQUFiLEVBQXpCO0FBQ0EsWUFBTXZCLFdBQVc0cEIsbUJBQW1CRCxVQUFwQztBQUNBLFlBQU1jLGtCQUFrQjdrQixNQUFNeWtCLEtBQU4sR0FBY25CLGFBQWF2UyxNQUFiLEdBQXNCTSxJQUE1RDs7QUFFQSxZQUFNeVQsb0JBQW9CLFNBQXBCQSxpQkFBb0IsR0FBVTtBQUNoQyxnQkFBR0Qsa0JBQWtCRCxnQkFBZ0IsQ0FBckMsRUFBdUM7QUFDbkMsdUJBQU8sQ0FBUDtBQUNILGFBRkQsTUFFTSxJQUFHWixtQkFBaUJhLGVBQWpCLEdBQW9DRCxnQkFBZ0IsQ0FBdkQsRUFBeUQ7QUFDM0QsdUJBQU9aLG1CQUFtQlksYUFBMUI7QUFDSCxhQUZLLE1BRUQ7QUFDRCx1QkFBT3hxQixXQUFXd3FCLGdCQUFnQixDQUFsQztBQUNIO0FBQ0osU0FSRDs7QUFVQWYsY0FBTXRVLEdBQU4sQ0FBVSxNQUFWLEVBQWtCdVYsc0JBQXFCLElBQXZDO0FBQ0gsS0E3QkQ7O0FBK0JBLFFBQUkzcUIsT0FBTyxTQUFQQSxJQUFPLENBQVU0cEIsVUFBVixFQUFzQjtBQUM3QnpFLFlBQUlubEIsSUFBSixDQUFVLENBQUNtbEIsSUFBSTlsQixXQUFKLE1BQW1CLENBQXBCLElBQXlCdXFCLFVBQW5DO0FBQ0gsS0FGRDtBQUdBLFFBQU05QyxhQUFhLFNBQWJBLFVBQWEsQ0FBU0MsUUFBVCxFQUFtQjlDLFFBQW5CLEVBQTRCO0FBQzNDa0YsdUJBQWVwQyxRQUFmO0FBQ0FxQyx3QkFBZ0JyQyxTQUFTNVIsSUFBVCxDQUFjLG9CQUFkLENBQWhCO0FBQ0FrVSx3QkFBZ0J0QyxTQUFTNVIsSUFBVCxDQUFjLG9CQUFkLENBQWhCO0FBQ0FtVSx5QkFBaUJ2QyxTQUFTNVIsSUFBVCxDQUFjLHFCQUFkLENBQWpCO0FBQ0FvVSx5QkFBaUJ4QyxTQUFTNVIsSUFBVCxDQUFjLGlDQUFkLENBQWpCO0FBQ0FxVSxnQkFBUXpDLFNBQVM1UixJQUFULENBQWMsdUJBQWQsQ0FBUjtBQUNBc1Usb0JBQVlELE1BQU1ob0IsS0FBTixFQUFaO0FBQ0Frb0IsZ0JBQVEzQyxTQUFTNVIsSUFBVCxDQUFjLHVCQUFkLENBQVI7O0FBRUFnUSxZQUFJNW5CLEVBQUosQ0FBTyxNQUFQLEVBQWUsVUFBU0UsSUFBVCxFQUFlO0FBQzFCLGdCQUFHQSxRQUFRQSxLQUFLNEcsUUFBYixJQUF5QjVHLEtBQUt3QyxRQUFqQyxFQUEwQztBQUN0QzBwQixpQ0FBaUJsc0IsS0FBS3dDLFFBQUwsR0FBZ0J4QyxLQUFLNEcsUUFBdEM7QUFDSDtBQUNKLFNBSkQ7O0FBTUE4Z0IsWUFBSTVuQixFQUFKLENBQU8sZUFBUCxFQUF3QixVQUFTRSxJQUFULEVBQWU7QUFDbkMsZ0JBQUdBLFFBQVFBLEtBQUttdEIsYUFBaEIsRUFBOEI7QUFDMUJYLGlDQUFpQnhzQixLQUFLbXRCLGFBQUwsR0FBcUIsR0FBdEM7QUFDSDtBQUNKLFNBSkQ7QUFNSCxLQXRCRDtBQXVCQSxRQUFNMUQsY0FBYyxTQUFkQSxXQUFjLEdBQVUsQ0FFN0IsQ0FGRDtBQUdBLFFBQU14aEIsU0FBUztBQUNYLHlCQUFrQixzQkFBU0csS0FBVCxFQUFnQmtoQixRQUFoQixFQUEwQjlDLFFBQTFCLEVBQW1DO0FBQ2pEcGUsa0JBQU11aEIsY0FBTjs7QUFFQXVDLDZCQUFpQlosd0JBQWpCO0FBQ0FrQiw2QkFBaUJqQix1QkFBakI7QUFDSCxTQU5VO0FBT1gsdUNBQWdDLGtDQUFTbmpCLEtBQVQsRUFBZ0JraEIsUUFBaEIsRUFBMEI5QyxRQUExQixFQUFtQztBQUMvRHBlLGtCQUFNdWhCLGNBQU47O0FBRUE2QiwwQkFBYyxJQUFkO0FBQ0E3RCxrQkFBTTdQLFFBQU4sQ0FBZSx1QkFBZjtBQUNBbVUsa0JBQU0xVCxJQUFOO0FBQ0gsU0FiVTtBQWNYLHVDQUFnQyxrQ0FBU25RLEtBQVQsRUFBZ0JraEIsUUFBaEIsRUFBMEI5QyxRQUExQixFQUFtQztBQUMvRHBlLGtCQUFNdWhCLGNBQU47O0FBRUE2QiwwQkFBYyxLQUFkO0FBQ0EsZ0JBQUksQ0FBQ0EsV0FBTCxFQUFrQjtBQUNkN0Qsc0JBQU12UCxXQUFOLENBQWtCLHVCQUFsQjtBQUNBNlQsc0JBQU14VCxJQUFOO0FBQ0g7QUFDRDZULDhCQUFrQixDQUFsQjtBQUNILFNBdkJVO0FBd0JYLHNDQUErQixpQ0FBU2xrQixLQUFULEVBQWdCa2hCLFFBQWhCLEVBQTBCOUMsUUFBMUIsRUFBbUM7QUFDOURwZSxrQkFBTXVoQixjQUFOO0FBQ0E4Qix3QkFBWSxJQUFaO0FBQ0EsZ0JBQU1VLGFBQWFPLG9CQUFvQnRrQixLQUFwQixDQUFuQjtBQUNBOGpCLDZCQUFpQkMsVUFBakI7QUFDQUcsOEJBQWtCLENBQWxCO0FBQ0EvcEIsaUJBQUs0cEIsVUFBTDtBQUNILFNBL0JVO0FBZ0NYLHNDQUErQixpQ0FBUy9qQixLQUFULEVBQWdCa2hCLFFBQWhCLEVBQTBCOUMsUUFBMUIsRUFBbUM7QUFDOURwZSxrQkFBTXVoQixjQUFOOztBQUVBLGdCQUFJLENBQUM4QixTQUFMLEVBQWdCO0FBQ1osb0JBQU1VLGFBQWFPLG9CQUFvQnRrQixLQUFwQixDQUFuQjtBQUNBa2tCLGtDQUFrQkgsVUFBbEI7QUFDQVcsa0NBQWtCWCxVQUFsQixFQUE4Qi9qQixLQUE5QjtBQUNIO0FBQ0osU0F4Q1U7QUF5Q1gsOEJBQXVCLDJCQUFTQSxLQUFULEVBQWdCa2hCLFFBQWhCLEVBQTBCOUMsUUFBMUIsRUFBbUM7QUFDdERwZSxrQkFBTXVoQixjQUFOO0FBQ0EsZ0JBQUk4QixTQUFKLEVBQWU7QUFDWCxvQkFBTVUsYUFBYU8sb0JBQW9CdGtCLEtBQXBCLENBQW5CO0FBQ0E4akIsaUNBQWlCQyxVQUFqQjtBQUNBRyxrQ0FBa0IsQ0FBbEI7QUFDQS9wQixxQkFBSzRwQixVQUFMO0FBQ0FXLGtDQUFrQlgsVUFBbEIsRUFBOEIvakIsS0FBOUI7QUFDSDtBQUNKLFNBbERVO0FBbURYLDRCQUFxQix5QkFBU0EsS0FBVCxFQUFnQmtoQixRQUFoQixFQUEwQjlDLFFBQTFCLEVBQW1DO0FBQ3BEcGUsa0JBQU11aEIsY0FBTjs7QUFFQSxnQkFBRzhCLFNBQUgsRUFBYTtBQUNUQSw0QkFBWSxLQUFaO0FBQ0E5RCxzQkFBTXZQLFdBQU4sQ0FBa0IsdUJBQWxCO0FBQ0g7QUFFSjtBQTNEVSxLQUFmOztBQThEQSxXQUFPLDRCQUFhcVAsVUFBYixFQUF5QixhQUF6QixFQUF3QyxJQUF4QyxFQUE4Q3hmLE1BQTlDLEVBQXNEb2hCLFVBQXRELEVBQWtFSSxXQUFsRSxDQUFQO0FBQ0gsQ0E1TEQsQyxDQWRBOzs7a0JBNE1lMkIsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQzVNQSxZQUFNO0FBQ2pCLFdBQ0ksK0NBQ0ksNkNBREosR0FFSSxpQ0FGSixHQUdRLHVDQUhSLEdBSVEsaUVBSlIsR0FLUSx3Q0FMUixHQU1JLFFBTkosR0FPSSw4Q0FQSixHQVFRLG9FQVJSLEdBU0ksUUFUSixHQVVJLGdEQVZKLEdBV0EsUUFaSjtBQWNILEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFOQTs7O0FBT0EsSUFBTWdDLG9CQUFvQixHQUExQjtBQUNBLElBQU1DLGVBQWUsU0FBZkEsWUFBZSxDQUFTNUYsVUFBVCxFQUFxQkMsR0FBckIsRUFBMEIxbkIsSUFBMUIsRUFBK0I7QUFDaEQsUUFBTTJuQixRQUFRLHNCQUFJLE1BQUlELElBQUlyUixLQUFKLEVBQVIsQ0FBZDs7QUFFQSxRQUFJaVgsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBU0MsU0FBVCxFQUFtQjtBQUN0QyxZQUFJcEQsUUFBUSxFQUFDQyxPQUFRLEVBQVQsRUFBYTdRLE1BQU8sRUFBcEIsRUFBd0JuTixNQUFPbWhCLFNBQS9CLEVBQVo7O0FBRUEsWUFBR0EsY0FBYyxjQUFqQixFQUFnQztBQUM1QnBELGtCQUFNQyxLQUFOLEdBQWMsT0FBZDtBQUNBLGdCQUFJb0QsZ0JBQWdCOUYsSUFBSS9sQixTQUFKLEdBQWdCa0MsYUFBcEM7QUFDQSxnQkFBSTRwQixzQkFBc0IvRixJQUFJOWtCLGVBQUosRUFBMUI7QUFDQSxpQkFBSyxJQUFJNUQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJd3VCLGNBQWN2dUIsTUFBbEMsRUFBMENELEdBQTFDLEVBQWdEO0FBQzVDLG9CQUFJdWEsT0FBTztBQUNQNlEsMkJBQVNvRCxjQUFjeHVCLENBQWQsTUFBcUIsQ0FBckIsR0FBd0IsUUFBeEIsR0FBbUN3dUIsY0FBY3h1QixDQUFkLENBRHJDO0FBRVAwdUIsNkJBQVVELHdCQUF3QkQsY0FBY3h1QixDQUFkLENBRjNCO0FBR1BpVSwyQkFBUXVhLGNBQWN4dUIsQ0FBZDtBQUhELGlCQUFYO0FBS0FtckIsc0JBQU01USxJQUFOLENBQVdqVCxJQUFYLENBQWdCaVQsSUFBaEI7QUFDSDtBQUVKLFNBYkQsTUFhTSxJQUFHZ1UsY0FBYyxjQUFqQixFQUFnQztBQUNsQ3BELGtCQUFNQyxLQUFOLEdBQWMsUUFBZDs7QUFFQSxnQkFBSUcsZ0JBQWdCN0MsSUFBSWpuQixnQkFBSixFQUFwQjtBQUNBLGdCQUFJRixpQkFBaUJtbkIsSUFBSWxuQixpQkFBSixFQUFyQjs7QUFFQSxpQkFBSyxJQUFJeEIsS0FBSSxDQUFiLEVBQWdCQSxLQUFJdXJCLGNBQWN0ckIsTUFBbEMsRUFBMENELElBQTFDLEVBQWdEO0FBQzVDLG9CQUFJdWEsUUFBTztBQUNQNlEsMkJBQVFHLGNBQWN2ckIsRUFBZCxFQUFpQkksS0FEbEI7QUFFUHN1Qiw2QkFBVW50QixtQkFBbUJ2QixFQUZ0QjtBQUdQaVUsMkJBQVFqVTtBQUhELGlCQUFYO0FBS0FtckIsc0JBQU01USxJQUFOLENBQVdqVCxJQUFYLENBQWdCaVQsS0FBaEI7QUFDSDtBQUVKO0FBQ0QsZUFBTzRRLEtBQVA7QUFDSCxLQWpDRDs7QUFtQ0EsUUFBTWQsYUFBYSxTQUFiQSxVQUFhLENBQVNDLFFBQVQsRUFBbUI5QyxRQUFuQixFQUE0QjtBQUMzQyxZQUFHNEcsb0JBQW9CekYsTUFBTTNqQixNQUFOLEVBQXZCLEVBQXNDO0FBQ2xDMmpCLGtCQUFNalEsSUFBTixDQUFXLG9CQUFYLEVBQWlDQyxHQUFqQyxDQUFxQyxXQUFyQyxFQUFrRCxPQUFsRDtBQUNIO0FBQ0osS0FKRDtBQUtBLFFBQU04UixjQUFjLFNBQWRBLFdBQWMsR0FBVTtBQUMxQjtBQUNILEtBRkQ7QUFHQSxRQUFNeGhCLFNBQVM7QUFDWCx3Q0FBZ0MsaUNBQVVHLEtBQVYsRUFBaUJraEIsUUFBakIsRUFBMkI5QyxRQUEzQixFQUFxQztBQUNqRXBlLGtCQUFNdWhCLGNBQU47QUFDQSxnQkFBSTRELFlBQVksc0JBQUlubEIsTUFBTXVsQixhQUFWLEVBQXlCOVQsSUFBekIsQ0FBOEIsZ0JBQTlCLENBQWhCOztBQUVBO0FBQ0E4USx1Q0FBaUJya0IsSUFBakIsQ0FBc0IrbUIsYUFBYTVGLFVBQWIsRUFBeUJDLEdBQXpCLEVBQThCNEYsaUJBQWlCQyxTQUFqQixDQUE5QixDQUF0QjtBQUNILFNBUFU7QUFRWCxvQ0FBNkIsOEJBQVNubEIsS0FBVCxFQUFnQmtoQixRQUFoQixFQUEwQjlDLFFBQTFCLEVBQW1DO0FBQzVEcGUsa0JBQU11aEIsY0FBTjs7QUFFQTtBQUNBLGdCQUFJdkosT0FBT3VLLDJCQUFpQm5HLEdBQWpCLEVBQVg7QUFDQXBFLGlCQUFLNWdCLE9BQUw7QUFDSCxTQWRVO0FBZVgseUNBQWtDLGtDQUFTNEksS0FBVCxFQUFnQmtoQixRQUFoQixFQUEwQjlDLFFBQTFCLEVBQW1DO0FBQ2pFcGUsa0JBQU11aEIsY0FBTjs7QUFFQSxnQkFBSTRELFlBQVksc0JBQUlubEIsTUFBTXVsQixhQUFWLEVBQXlCOVQsSUFBekIsQ0FBOEIsZ0JBQTlCLENBQWhCO0FBQ0EsZ0JBQUk1RyxRQUFRLHNCQUFJN0ssTUFBTXVsQixhQUFWLEVBQXlCOVQsSUFBekIsQ0FBOEIsZ0JBQTlCLENBQVo7O0FBRUEsZ0JBQUcwVCxhQUFhdGEsS0FBaEIsRUFBc0I7QUFDbEIsb0JBQUdzYSxjQUFjLGNBQWpCLEVBQWdDO0FBQzVCN0Ysd0JBQUlqbEIsZUFBSixDQUFvQitCLFdBQVd5TyxLQUFYLENBQXBCO0FBQ0gsaUJBRkQsTUFFTSxJQUFHc2EsY0FBYyxjQUFqQixFQUFnQztBQUNsQzdGLHdCQUFJL21CLGlCQUFKLENBQXNCTixTQUFTNFMsS0FBVCxDQUF0QjtBQUNIOztBQUVEO0FBQ0FqTixxQ0FBRTZYLElBQUYsQ0FBTzhNLDBCQUFQLEVBQXlCLFVBQVNDLFlBQVQsRUFBc0I7QUFDM0NBLGlDQUFhcHJCLE9BQWI7QUFDSCxpQkFGRDtBQUdBbXJCLDJDQUFpQmxnQixNQUFqQixDQUF3QixDQUF4QixFQUEyQmtnQiwyQkFBaUIxckIsTUFBNUM7QUFDSDtBQUVKO0FBbkNVLEtBQWY7O0FBc0NBLFdBQU8sNEJBQWF3b0IsVUFBYixFQUF5QixjQUF6QixFQUF5Q3puQixJQUF6QyxFQUErQ2lJLE1BQS9DLEVBQXVEb2hCLFVBQXZELEVBQW1FSSxXQUFuRSxDQUFQO0FBRUgsQ0F0RkQ7O2tCQXdGZTRELFk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoR2Y7Ozs7OztrQkFFZSxVQUFDcnRCLElBQUQsRUFBVTtBQUNyQixRQUFJNHRCLFdBQVcsb0NBQWtDNXRCLEtBQUtxcUIsTUFBTCxHQUFjLGlCQUFkLEdBQWlDLEVBQW5FLElBQXVFLElBQXZFLEdBQ0ssMkNBREwsR0FFUyw4Q0FGVCxJQUdjcnFCLEtBQUtxcUIsTUFBTCxHQUFjLEVBQWQsR0FBbUIsc0RBSGpDLElBSWEsd0NBSmIsR0FJc0RycUIsS0FBS29xQixLQUozRCxHQUlpRSxTQUpqRSxHQUtTLFFBTFQsR0FNSyxRQU5MLEdBT0ssMENBUHBCO0FBUXdCcGtCLHlCQUFFcEIsT0FBRixDQUFVNUUsS0FBS3VaLElBQWYsRUFBcUIsVUFBU0EsSUFBVCxFQUFjO0FBQy9CLFlBQUd2WixLQUFLcXFCLE1BQVIsRUFBZTtBQUNYdUQsd0JBQVlDLG9CQUFvQnRVLEtBQUs2USxLQUF6QixFQUFnQzdRLEtBQUt0RyxLQUFyQyxFQUE0Q3NHLEtBQUtuTixJQUFqRCxDQUFaO0FBQ0gsU0FGRCxNQUVLO0FBQ0R3aEIsd0JBQVlFLHFCQUFxQnZVLEtBQUs2USxLQUExQixFQUFpQzdRLEtBQUt0RyxLQUF0QyxFQUE2Q2pULEtBQUtvTSxJQUFsRCxFQUF3RG1OLEtBQUttVSxPQUE3RCxDQUFaO0FBQ0g7QUFDSixLQU5EO0FBT3hCRSxnQkFBb0IsV0FDSixRQURoQjtBQUVBLFdBQU9BLFFBQVA7QUFDSCxDOztBQUVNLElBQU1DLG9EQUFzQixTQUF0QkEsbUJBQXNCLENBQUN6RCxLQUFELEVBQVFuWCxLQUFSLEVBQWU3RyxJQUFmLEVBQXdCO0FBQ3ZELFdBQ0kseUVBQXVFQSxJQUF2RSxHQUE0RSxJQUE1RSxHQUNJLHVDQURKLEdBQzRDZ2UsS0FENUMsR0FDa0QsU0FEbEQsR0FFSSxxREFGSixHQUdJLHVDQUhKLEdBRzRDblgsS0FINUMsR0FHa0QsU0FIbEQsR0FJQSxRQUxKO0FBT0gsQ0FSTTs7QUFVQSxJQUFNNmEsc0RBQXVCLFNBQXZCQSxvQkFBdUIsQ0FBQzFELEtBQUQsRUFBUW5YLEtBQVIsRUFBZTdHLElBQWYsRUFBcUJzaEIsT0FBckIsRUFBaUM7QUFDakUsV0FDSSwwRUFBd0V0aEIsSUFBeEUsR0FBNkUsb0JBQTdFLEdBQWtHNkcsS0FBbEcsR0FBd0csSUFBeEcsR0FDSSx3Q0FESixJQUM4Q3lhLFVBQVEsVUFBUixHQUFtQixFQURqRSxJQUNxRSxtQkFEckUsR0FFSSx1Q0FGSixHQUU0Q3RELEtBRjVDLEdBRWtELFNBRmxELEdBR0EsUUFKSjtBQU1ILENBUE0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJQOzs7O0FBQ0E7Ozs7QUFKQTs7O0FBTUEsSUFBTTJELGNBQWMsU0FBZEEsV0FBYyxDQUFTdEcsVUFBVCxFQUFxQkMsR0FBckIsRUFBMEIxbkIsSUFBMUIsRUFBK0I7O0FBRS9DLFFBQUlndUIsWUFBWSxFQUFoQjtBQUFBLFFBQW9CQyxZQUFZLEVBQWhDO0FBQ0EsUUFBSUMsc0JBQXNCLFNBQXRCQSxtQkFBc0IsQ0FBU0MsSUFBVCxFQUFjO0FBQ3BDLGVBQU8seUJBQVdBLElBQVgsQ0FBUDtBQUNILEtBRkQ7O0FBSUEsUUFBTTlFLGFBQWEsU0FBYkEsVUFBYSxDQUFTQyxRQUFULEVBQW1COUMsUUFBbkIsRUFBNEI7QUFDM0N3SCxvQkFBWTFFLFNBQVM1UixJQUFULENBQWMsbUJBQWQsQ0FBWjtBQUNBdVcsb0JBQVkzRSxTQUFTNVIsSUFBVCxDQUFjLG9CQUFkLENBQVo7O0FBRUEsWUFBRzFYLEtBQUs0RyxRQUFMLEtBQWtCMGpCLFFBQXJCLEVBQThCOztBQUUxQjJELHNCQUFVcFYsSUFBVixDQUFlcVYsb0JBQW9CbHVCLEtBQUs0RyxRQUF6QixDQUFmO0FBQ0E4Z0IsZ0JBQUk1bkIsRUFBSixDQUFPLE1BQVAsRUFBZSxVQUFTRSxJQUFULEVBQWU7QUFDMUJndUIsMEJBQVVuVixJQUFWLENBQWVxVixvQkFBb0JsdUIsS0FBS3dDLFFBQXpCLENBQWY7QUFDSCxhQUZEO0FBR0g7QUFFSixLQVpEO0FBYUEsUUFBTWluQixjQUFjLFNBQWRBLFdBQWMsR0FBVTtBQUMxQjtBQUNILEtBRkQ7QUFHQSxRQUFNeGhCLFNBQVMsRUFBZjs7QUFJQSxXQUFPLDRCQUFhd2YsVUFBYixFQUF5QixhQUF6QixFQUF3Q3puQixJQUF4QyxFQUE4Q2lJLE1BQTlDLEVBQXNEb2hCLFVBQXRELEVBQWtFSSxXQUFsRSxDQUFQO0FBQ0gsQ0E1QkQ7O2tCQStCZXNFLFc7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkNyQ0EsVUFBQy90QixJQUFELEVBQVU7QUFDckIsV0FDSSxvQ0FDS0EsS0FBSzRHLFFBQUwsS0FBa0IwakIsUUFBbEIsR0FFSSxvRUFDSXRxQixLQUFLb00sSUFBTCxJQUFZLFFBQVosR0FFRyxpRUFGSCxHQUlHLG1CQUxQLElBTUQsV0FSSCxHQVVJLCtDQUNHLDZDQURILEdBRUcsNkNBYlosSUFlQSxRQWhCSjtBQWtCSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a1FDbkJEOzs7OztBQUdBOzs7Ozs7QUFFQSxJQUFNZ2lCLGVBQWUsU0FBZkEsWUFBZSxDQUFTM0csVUFBVCxFQUFxQkMsR0FBckIsRUFBeUI7O0FBRTFDLFFBQUkyRyxtQkFBbUIsRUFBdkI7QUFBQSxRQUNJQyxVQUFVLEVBRGQ7QUFBQSxRQUVJQyxnQkFBZ0IsRUFGcEI7QUFBQSxRQUdJQyxlQUFlLEVBSG5CO0FBQUEsUUFJSUMsaUJBQWlCLEVBSnJCO0FBQUEsUUFLSUMsbUJBQW1CLEVBTHZCO0FBQUEsUUFNSUMsa0JBQWtCLEVBTnRCO0FBT0EsUUFBSWxELFlBQVksS0FBaEI7QUFDQSxRQUFJbUQsY0FBYyxFQUFsQjtBQUFBLFFBQXVCQyxjQUFjLENBQXJDO0FBQUEsUUFBd0NDLFdBQVcsQ0FBbkQ7QUFBQSxRQUFzREMsV0FBVyxDQUFqRTs7QUFHQTtBQUNBLFFBQUlDLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBUzdDLFVBQVQsRUFBcUI7QUFDckNzQyx1QkFBZWhXLElBQWY7QUFDQWlXLHlCQUFpQmpXLElBQWpCO0FBQ0FrVyx3QkFBZ0JsVyxJQUFoQjs7QUFFQSxZQUFJMFQsY0FBYyxFQUFsQixFQUFzQjtBQUNsQnNDLDJCQUFlbFcsSUFBZjtBQUNILFNBRkQsTUFFTyxJQUFJNFQsYUFBYSxFQUFiLElBQW1CQSxhQUFhLENBQXBDLEVBQXVDO0FBQzFDdUMsNkJBQWlCblcsSUFBakI7QUFDSCxTQUZNLE1BRUEsSUFBSTRULGNBQWMsQ0FBbEIsRUFBcUI7QUFDeEJ3Qyw0QkFBZ0JwVyxJQUFoQjtBQUNIO0FBQ0osS0FaRDs7QUFjQSxRQUFJMFcsY0FBYyxTQUFkQSxXQUFjLENBQVM5QyxVQUFULEVBQXFCO0FBQ25DLFlBQUl6RSxJQUFJdmxCLE9BQUosRUFBSixFQUFtQjtBQUNmZ3FCLHlCQUFhLENBQWI7QUFDSDs7QUFFRDZDLHNCQUFjN0MsVUFBZDs7QUFFQSxZQUFNK0MsaUJBQWlCSCxXQUFXNUMsVUFBWCxHQUF3QixHQUEvQzs7QUFFQW9DLHNCQUFjNVcsR0FBZCxDQUFrQixNQUFsQixFQUEwQnVYLGlCQUFnQixJQUExQztBQUNBVixxQkFBYTdXLEdBQWIsQ0FBaUIsT0FBakIsRUFBMEJ1WCxpQkFBZ0IsSUFBMUM7QUFDSCxLQVhEOztBQWFBLFFBQUl4QyxzQkFBc0IsU0FBdEJBLG1CQUFzQixDQUFVdGtCLEtBQVYsRUFBaUI7QUFDdkMsWUFBTSttQixZQUFZL21CLE1BQU15a0IsS0FBTixHQUFjeUIsUUFBUW5WLE1BQVIsR0FBaUJNLElBQWpEO0FBQ0EsWUFBSTBTLGFBQWFnRCxZQUFZUCxXQUFaLEdBQTBCLEdBQTNDOztBQUVBLFlBQUl6QyxhQUFhLENBQWpCLEVBQW9CO0FBQ2hCQSx5QkFBYSxDQUFiO0FBQ0g7O0FBRUQsWUFBSUEsYUFBYSxHQUFqQixFQUFzQjtBQUNsQkEseUJBQWEsR0FBYjtBQUNIOztBQUVELGVBQU9BLFVBQVA7QUFDSCxLQWJEOztBQWdCQSxRQUFNOUMsYUFBYSxTQUFiQSxVQUFhLENBQVNDLFFBQVQsRUFBbUI5QyxRQUFuQixFQUE0QjtBQUMzQzZILDJCQUFtQi9FLFNBQVM1UixJQUFULENBQWMsOEJBQWQsQ0FBbkI7QUFDQTRXLGtCQUFVaEYsU0FBUzVSLElBQVQsQ0FBYyxvQkFBZCxDQUFWO0FBQ0E2Vyx3QkFBZ0JqRixTQUFTNVIsSUFBVCxDQUFjLDJCQUFkLENBQWhCO0FBQ0E4Vyx1QkFBZWxGLFNBQVM1UixJQUFULENBQWMsMEJBQWQsQ0FBZjs7QUFFQStXLHlCQUFpQm5GLFNBQVM1UixJQUFULENBQWUsNEJBQWYsQ0FBakI7QUFDQWdYLDJCQUFtQnBGLFNBQVM1UixJQUFULENBQWMsOEJBQWQsQ0FBbkI7QUFDQWlYLDBCQUFrQnJGLFNBQVM1UixJQUFULENBQWMsNkJBQWQsQ0FBbEI7O0FBRUFtWCxzQkFBY04sY0FBY3hxQixLQUFkLEVBQWQ7QUFDQWdyQixtQkFBV0gsY0FBY0MsV0FBekI7O0FBRUFuSCxZQUFJNW5CLEVBQUosQ0FBTyxPQUFQLEVBQWdCLFlBQVc7QUFDdkJtdkIsd0JBQVl2SCxJQUFJNWxCLFNBQUosRUFBWjtBQUNILFNBRkQ7QUFHQTRsQixZQUFJNW5CLEVBQUosQ0FBTyxlQUFQLEVBQXdCLFVBQVNFLElBQVQsRUFBZTtBQUNuQ2l2Qix3QkFBWWp2QixLQUFLZ0MsTUFBakI7QUFDSCxTQUZEO0FBR0EwbEIsWUFBSTVuQixFQUFKLENBQU8sTUFBUCxFQUFlLFVBQVNFLElBQVQsRUFBZTtBQUMxQixnQkFBSUEsS0FBSzhELElBQVQsRUFBZTtBQUNYbXJCLDRCQUFZLENBQVo7QUFDSCxhQUZELE1BRU87QUFDSEEsNEJBQVl2SCxJQUFJNWxCLFNBQUosRUFBWjtBQUNIO0FBQ0osU0FORDtBQVFILEtBM0JEO0FBNEJBLFFBQU0ybkIsY0FBYyxTQUFkQSxXQUFjLEdBQVUsQ0FFN0IsQ0FGRDtBQUdBLFFBQU14aEIsU0FBUztBQUNYLG9DQUE2Qiw4QkFBU0csS0FBVCxFQUFnQmtoQixRQUFoQixFQUEwQjlDLFFBQTFCLEVBQW1DO0FBQzVEcGUsa0JBQU11aEIsY0FBTjs7QUFFQSxnQkFBSWpDLElBQUk1bEIsU0FBSixPQUFvQixDQUF4QixFQUEyQjtBQUN2QjRsQixvQkFBSXpsQixPQUFKLENBQVksS0FBWjtBQUNBeWxCLG9CQUFJM2xCLFNBQUosQ0FBYyxHQUFkO0FBQ0gsYUFIRCxNQUdPO0FBQ0gybEIsb0JBQUl6bEIsT0FBSjtBQUNIO0FBQ0osU0FWVTtBQVdYLHlDQUFrQyxtQ0FBU21HLEtBQVQsRUFBZ0JraEIsUUFBaEIsRUFBMEI5QyxRQUExQixFQUFtQztBQUNqRXBlLGtCQUFNdWhCLGNBQU47QUFDQTBFLDZCQUFpQnZXLFFBQWpCLENBQTBCLFFBQTFCO0FBQ0gsU0FkVTtBQWVYLHlDQUFrQyxtQ0FBUzFQLEtBQVQsRUFBZ0JraEIsUUFBaEIsRUFBMEI5QyxRQUExQixFQUFtQztBQUNqRXBlLGtCQUFNdWhCLGNBQU47O0FBRUE4Qix3QkFBWSxLQUFaO0FBQ0gsU0FuQlU7QUFvQlgsd0NBQWlDLGtDQUFTcmpCLEtBQVQsRUFBZ0JraEIsUUFBaEIsRUFBMEI5QyxRQUExQixFQUFtQztBQUNoRXBlLGtCQUFNdWhCLGNBQU47QUFDQThCLHdCQUFZLElBQVo7QUFDQS9ELGdCQUFJemxCLE9BQUosQ0FBWSxLQUFaO0FBQ0F5bEIsZ0JBQUkzbEIsU0FBSixDQUFjMnFCLG9CQUFvQnRrQixLQUFwQixDQUFkO0FBQ0gsU0F6QlU7QUEwQlgsc0NBQStCLGdDQUFTQSxLQUFULEVBQWdCa2hCLFFBQWhCLEVBQTBCOUMsUUFBMUIsRUFBbUM7QUFDOURwZSxrQkFBTXVoQixjQUFOO0FBQ0E4Qix3QkFBWSxLQUFaO0FBQ0gsU0E3QlU7QUE4Qlgsd0NBQWlDLGtDQUFTcmpCLEtBQVQsRUFBZ0JraEIsUUFBaEIsRUFBMEI5QyxRQUExQixFQUFtQztBQUNoRXBlLGtCQUFNdWhCLGNBQU47QUFDQSxnQkFBSSxDQUFDOEIsU0FBTCxFQUFnQjtBQUNaLHVCQUFPLEtBQVA7QUFDSDs7QUFFRC9ELGdCQUFJM2xCLFNBQUosQ0FBYzJxQixvQkFBb0J0a0IsS0FBcEIsQ0FBZDtBQUNIO0FBckNVLEtBQWY7O0FBd0NBLFdBQU8sU0FBYyw0QkFBYXFmLFVBQWIsRUFBeUIsY0FBekIsRUFBeUMsSUFBekMsRUFBK0N4ZixNQUEvQyxFQUF1RG9oQixVQUF2RCxFQUFtRUksV0FBbkUsQ0FBZCxFQUErRjtBQUNsR2lCLHNCQUFjLHNCQUFVeG9CLEtBQVYsRUFBaUI7QUFDM0J1cEIsd0JBQVl2cEIsS0FBWjtBQUNIO0FBSGlHLEtBQS9GLENBQVA7QUFLSCxDQXJJRDs7a0JBdUlla3NCLFk7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVJZjs7O2tCQUdlLFlBQU07QUFDakIsV0FDSSx3Q0FDSSwrQ0FESixHQUVRLDJDQUZSLEdBR1EsNkNBSFIsR0FJUSw0Q0FKUixHQUtJLFdBTEosR0FNSSwyQ0FOSixHQU9RLGlDQVBSLEdBUVksMENBUlosR0FTWSw2Q0FUWixHQVVZLDhDQVZaLEdBV1EsUUFYUixHQVlJLFFBWkosR0FhQSxRQWRKO0FBZ0JILEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCRDs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7Ozs7OztBQVdBLElBQU1nQixlQUFlLFNBQWZBLFlBQWUsQ0FBVXJ4QixTQUFWLEVBQXFCc3hCLFlBQXJCLEVBQW1DcnZCLElBQW5DLEVBQXlDaUksTUFBekMsRUFBaURvaEIsVUFBakQsRUFBNkRJLFdBQTdELEVBQTBFNkYsTUFBMUUsRUFBa0Y7QUFDbkcsUUFBSTdILGFBQWF6aEIscUJBQUV5UixTQUFGLENBQVkxWixTQUFaLElBQXlCLHNCQUFJQSxTQUFKLENBQXpCLEdBQTBDQSxTQUEzRDtBQUNBLFFBQUl3eEIsa0JBQUo7QUFDQSxRQUFJQyxhQUFhLEVBQWpCO0FBQ0EsUUFBSXZ4QixPQUFPLEVBQVg7O0FBRUEsUUFBSXd4Qix5QkFBeUIsU0FBekJBLHNCQUF5QixDQUFVelYsSUFBVixFQUFnQjtBQUN6QyxZQUFNMFYsYUFBYXpqQixTQUFTdk0sYUFBVCxDQUF1QixLQUF2QixDQUFuQjtBQUNBZ3dCLG1CQUFXOVcsU0FBWCxHQUF1Qm9CLElBQXZCOztBQUVBdVYsb0JBQVksc0JBQUlHLFdBQVdDLFVBQWYsQ0FBWjs7QUFFQSxlQUFPRCxXQUFXQyxVQUFsQjtBQUNILEtBUEQ7O0FBU0EsUUFBSUwsTUFBSixFQUFZO0FBQ1I3SCxtQkFBV3RXLE9BQVgsQ0FBbUJzZSx1QkFBdUJHLG9CQUFVUCxlQUFlLFVBQXpCLEVBQXFDcnZCLElBQXJDLENBQXZCLENBQW5CO0FBQ0gsS0FGRCxNQUVPO0FBQ0h5bkIsbUJBQVcvTyxNQUFYLENBQWtCK1csdUJBQXVCRyxvQkFBVVAsZUFBZSxVQUF6QixFQUFxQ3J2QixJQUFyQyxDQUF2QixDQUFsQjtBQUNIOztBQUVELFFBQUlxcEIsVUFBSixFQUFnQjtBQUNaQSxtQkFBV2tHLFNBQVgsRUFBc0J0eEIsSUFBdEI7QUFDSDs7QUFFRHlHLFdBQU9DLElBQVAsQ0FBWXNELE1BQVosRUFBb0JyRCxPQUFwQixDQUE0Qix1QkFBZTtBQUN2QyxZQUFJaXJCLGVBQWVDLFlBQVkzWCxLQUFaLENBQWtCLEdBQWxCLENBQW5CO0FBQ0EsWUFBSW9SLFlBQVlzRyxhQUFhLENBQWIsRUFBZ0IxZSxPQUFoQixDQUF3QixLQUF4QixFQUErQixFQUEvQixDQUFoQjtBQUNBLFlBQUk0ZSxTQUFTRixhQUFhLENBQWIsRUFBZ0IxZSxPQUFoQixDQUF3QixLQUF4QixFQUErQixFQUEvQixDQUFiOztBQUVBLFlBQUk2ZSxVQUFVLEVBQWQ7O0FBRUEsWUFBR0QsV0FBVyxVQUFYLElBQXlCQSxXQUFXLFFBQXZDLEVBQWdEO0FBQzVDQyxzQkFBVSxzQkFBSUQsTUFBSixDQUFWO0FBQ0gsU0FGRCxNQUVLO0FBQ0RDLHNCQUFVVCxVQUFVN1gsSUFBVixDQUFlcVksTUFBZixNQUEyQlIsVUFBVXhXLFFBQVYsQ0FBbUJnWCxPQUFPNWUsT0FBUCxDQUFlLEdBQWYsRUFBbUIsRUFBbkIsQ0FBbkIsSUFBNkNvZSxTQUE3QyxHQUF5RCxJQUFwRixDQUFWO0FBQ0g7O0FBR0QsWUFBSWhHLGFBQWF3RyxNQUFiLElBQXVCQyxPQUEzQixFQUFvQztBQUNoQyxnQkFBSTFaLEtBQUs1UixPQUFPQyxJQUFQLENBQVk2cUIsVUFBWixFQUF3QnZ3QixNQUF4QixFQUFUOztBQUVBO0FBQ0EsZ0JBQUlneEIsY0FBYyxTQUFkQSxXQUFjLENBQVU3bkIsS0FBVixFQUFpQjtBQUMvQix1QkFBT0gsT0FBTzZuQixXQUFQLEVBQW9CMW5CLEtBQXBCLEVBQTJCbW5CLFNBQTNCLEVBQXNDdHhCLElBQXRDLENBQVA7QUFDSCxhQUZEO0FBR0F1eEIsdUJBQVdsWixFQUFYLElBQWlCLEVBQUN2VyxNQUFNd3BCLFNBQVAsRUFBa0J3RyxRQUFRQSxNQUExQixFQUFrQ2hkLFVBQVVrZCxXQUE1QyxFQUFqQjs7QUFFQTtBQUNBLGdCQUFHRCxRQUFROVYsR0FBUixHQUFjdFYsT0FBakIsRUFBeUI7QUFDckJvckIsd0JBQVE5VixHQUFSLEdBQWN0VixPQUFkLENBQXNCLFVBQVNzckIsS0FBVCxFQUFlO0FBQ2pDQSwwQkFBTTFHLGdCQUFOLENBQXVCRCxTQUF2QixFQUFrQzBHLFdBQWxDO0FBQ0gsaUJBRkQ7QUFHSCxhQUpELE1BSUs7QUFDREQsd0JBQVE5VixHQUFSLEdBQWNzUCxnQkFBZCxDQUErQkQsU0FBL0IsRUFBMEMwRyxXQUExQztBQUNIO0FBR0osU0FuQkQsTUFtQk87QUFDSCxtQkFBTyxLQUFQO0FBQ0g7QUFDSixLQXBDRDs7QUFzQ0FoeUIsU0FBS3VCLE9BQUwsR0FBZSxZQUFZO0FBQ3ZCa0YsZUFBT0MsSUFBUCxDQUFZNnFCLFVBQVosRUFBd0I1cUIsT0FBeEIsQ0FBZ0MsY0FBTTtBQUNsQyxnQkFBSXdELFFBQVFvbkIsV0FBV2xaLEVBQVgsQ0FBWjtBQUNBLGdCQUFJMFosVUFBVSxFQUFkOztBQUVBLGdCQUFHNW5CLE1BQU0ybkIsTUFBTixLQUFpQixVQUFqQixJQUErQjNuQixNQUFNMm5CLE1BQU4sS0FBaUIsUUFBbkQsRUFBNEQ7QUFDeERDLDBCQUFVLHNCQUFJNW5CLE1BQU0ybkIsTUFBVixDQUFWO0FBQ0gsYUFGRCxNQUVLO0FBQ0RDLDBCQUFVVCxVQUFVN1gsSUFBVixDQUFldFAsTUFBTTJuQixNQUFyQixNQUFpQ1IsVUFBVXhXLFFBQVYsQ0FBbUIzUSxNQUFNMm5CLE1BQU4sQ0FBYTVlLE9BQWIsQ0FBcUIsR0FBckIsRUFBeUIsRUFBekIsQ0FBbkIsSUFBbURvZSxTQUFuRCxHQUErRCxJQUFoRyxDQUFWO0FBQ0g7O0FBRUQ7QUFDQSxnQkFBR1MsUUFBUTlWLEdBQVIsR0FBY3RWLE9BQWpCLEVBQXlCO0FBQ3JCb3JCLHdCQUFROVYsR0FBUixHQUFjdFYsT0FBZCxDQUFzQixVQUFTc3JCLEtBQVQsRUFBZTtBQUNqQ0EsMEJBQU14RyxtQkFBTixDQUEwQnRoQixNQUFNckksSUFBaEMsRUFBc0NxSSxNQUFNMkssUUFBNUM7QUFDSCxpQkFGRDtBQUdILGFBSkQsTUFJSztBQUNEaWQsd0JBQVE5VixHQUFSLEdBQWN3UCxtQkFBZCxDQUFrQ3RoQixNQUFNckksSUFBeEMsRUFBOENxSSxNQUFNMkssUUFBcEQ7QUFDSDs7QUFFRCxtQkFBT3ljLFdBQVdsWixFQUFYLENBQVA7QUFDSCxTQXBCRDs7QUFzQkEsWUFBR2laLFNBQUgsRUFBYTtBQUNUQSxzQkFBVWxzQixNQUFWO0FBQ0g7O0FBRUQsWUFBSW9tQixXQUFKLEVBQWlCO0FBQ2JBO0FBQ0g7QUFDSixLQTlCRDtBQStCQSxXQUFPeHJCLElBQVA7QUFFSCxDQWhHRCxDLENBbkJBOzs7O2tCQXNIZW14QixZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSGY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBakJBOzs7QUFtQkEsSUFBTVEsWUFBWTtBQUNkTyw0Q0FEYztBQUVkQyx3Q0FGYztBQUdkQywwQ0FIYztBQUlkQyxrREFKYztBQUtkQyxvREFMYztBQU1kQyw4Q0FOYztBQU9kQyx3REFQYzs7QUFTZEMsNENBVGM7QUFVZEMsd0RBVmM7QUFXZEMsc0RBWGM7QUFZZEMsb0RBWmM7QUFhZEMsc0RBYmM7QUFjZEMsZ0VBZGM7QUFlZEM7QUFmYyxDQUFsQjs7a0JBa0JlcEIsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ2Y7Ozs7QUFJQSxJQUFNTyxtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFTdFgsSUFBVCxFQUFjO0FBQ25DLFNBQU8sa0VBQ0ssTUFETCxHQUNZQSxJQURaLEdBQ2lCLE9BRGpCLEdBRUssK0NBRkwsR0FHQyxRQUhSO0FBSUgsQ0FMRDs7a0JBT2VzWCxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYZjs7O0FBR0EsSUFBTXhGLG1CQUFtQixFQUF6Qjs7a0JBRWVBLGdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGZjs7OztBQUNBOzs7O0FBSkE7OztBQVdBLElBQU1zRyxZQUFZLFNBQVpBLFNBQVksQ0FBU3hKLFVBQVQsRUFBcUJDLEdBQXJCLEVBQTBCd0osV0FBMUIsRUFBc0M7O0FBRXBELFFBQU03SCxhQUFhLFNBQWJBLFVBQWEsQ0FBUzVCLFVBQVQsRUFBcUI2QixRQUFyQixFQUErQjlDLFFBQS9CLEVBQXdDO0FBQ3ZEO0FBQ0gsS0FGRDtBQUdBLFFBQU1pRCxjQUFjLFNBQWRBLFdBQWMsR0FBVTtBQUMxQjtBQUNILEtBRkQ7QUFHQSxRQUFNeGhCLFNBQVM7QUFDWDs7Ozs7OztBQURXLEtBQWY7O0FBV0EsV0FBTyw0QkFBYXdmLFVBQWIsRUFBeUIsV0FBekIsRUFBc0N5SixXQUF0QyxFQUFtRGpwQixNQUFuRCxFQUEyRG9oQixVQUEzRCxFQUF1RUksV0FBdkUsQ0FBUDtBQUNILENBcEJEOztrQkFzQmV3SCxTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ2Y7O2tCQVdlLFVBQUNDLFdBQUQsRUFBaUI7QUFDNUIsV0FDSSw2Q0FBZ0Q7QUFDM0NBLG9CQUFnQnRqQix3QkFBaEIsR0FBZ0MsbURBQWhDLEdBQXNGLEVBRDNGLEtBRUtzakIsZ0JBQWdCdmpCLHVCQUFoQixHQUFnQyxrREFBaEMsR0FBcUYsRUFGMUYsS0FHS3VqQixnQkFBZ0J4akIseUJBQWhCLEdBQWlDLG9EQUFqQyxHQUF3RixFQUg3RixJQUlBLFFBTEo7QUFPSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkQ7Ozs7QUFDQTs7Ozs7O0FBSkE7OztBQU1BLElBQU15akIsZUFBZSxTQUFmQSxZQUFlLENBQVMxSixVQUFULEVBQXFCQyxHQUFyQixFQUEwQmxsQixRQUExQixFQUFtQztBQUNwRCxRQUFNbWxCLFFBQVEsc0JBQUksTUFBSUQsSUFBSXJSLEtBQUosRUFBUixDQUFkOztBQUVBLFFBQU1nVCxhQUFhLFNBQWJBLFVBQWEsQ0FBU0MsUUFBVCxFQUFtQjlDLFFBQW5CLEVBQTRCO0FBQzNDLFlBQU00SyxhQUFhOUgsU0FBU3ZsQixLQUFULEVBQW5CO0FBQ0EsWUFBTXN0QixjQUFjL0gsU0FBU3RsQixNQUFULEVBQXBCOztBQUVBLFlBQU0wWixJQUFJdFgsS0FBSzRZLEdBQUwsQ0FBU3hjLFNBQVNxcUIsS0FBVCxHQUFpQmxGLE1BQU14TyxNQUFOLEdBQWVNLElBQXpDLEVBQStDa08sTUFBTTVqQixLQUFOLEtBQWdCcXRCLFVBQS9ELENBQVY7QUFDQSxZQUFNdFUsSUFBSTFXLEtBQUs0WSxHQUFMLENBQVN4YyxTQUFTOHVCLEtBQVQsR0FBaUIzSixNQUFNeE8sTUFBTixHQUFlRyxHQUF6QyxFQUE4Q3FPLE1BQU0zakIsTUFBTixLQUFpQnF0QixXQUEvRCxDQUFWOztBQUVBL0gsaUJBQVMzUixHQUFULENBQWEsTUFBYixFQUFzQitGLElBQUksSUFBMUI7QUFDQTRMLGlCQUFTM1IsR0FBVCxDQUFhLEtBQWIsRUFBcUJtRixJQUFJLElBQXpCO0FBQ0gsS0FURDtBQVVBLFFBQU0yTSxjQUFjLFNBQWRBLFdBQWMsR0FBVTtBQUMxQjtBQUNILEtBRkQ7QUFHQSxRQUFNeGhCLFNBQVM7QUFDWCxtQ0FBNEIsNkJBQVNHLEtBQVQsRUFBZ0JraEIsUUFBaEIsRUFBMEI5QyxRQUExQixFQUFtQztBQUMzRHBlLGtCQUFNdWhCLGNBQU47O0FBRUFuZCxtQkFBTytrQixJQUFQLENBQ0kseUNBREosRUFFSSxRQUZKO0FBSUg7QUFSVSxLQUFmOztBQVdBLFdBQU8sNEJBQWE5SixVQUFiLEVBQXlCLGNBQXpCLEVBQXlDamxCLFFBQXpDLEVBQW1EeUYsTUFBbkQsRUFBMkRvaEIsVUFBM0QsRUFBdUVJLFdBQXZFLENBQVA7QUFFSCxDQTdCRDs7a0JBK0JlMEgsWTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNmOztrQkFDZSxZQUFNO0FBQ2pCLFdBQ0ksb0RBQ0ksNkNBREosR0FFUSxpREFGUixHQUdJLFFBSEosR0FJSSw2Q0FKSixHQUtRLHVEQUxSLEdBS2dFL3lCLGdCQUxoRSxHQUt3RSxTQUx4RSxHQU1JLFFBTkosR0FPQSxRQVJKO0FBVUgsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVEQ7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQWNBLElBQU1vekIsU0FBUyxTQUFUQSxNQUFTLENBQVMvSixVQUFULEVBQXFCQyxHQUFyQixFQUF5QjtBQUNwQyxRQUFJK0osWUFBWSxFQUFoQjtBQUFBLFFBQW9CQyxhQUFhLEVBQWpDO0FBQUEsUUFBcUNDLFVBQVUsRUFBL0M7O0FBSUEsUUFBTXRJLGFBQWEsU0FBYkEsVUFBYSxDQUFTQyxRQUFULEVBQW1COUMsUUFBbkIsRUFBNEI7QUFDM0MsWUFBSW9MLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBUzF2QixLQUFULEVBQWU7QUFDakMsZ0JBQUd1dkIsU0FBSCxFQUFhO0FBQ1RBLDBCQUFVanlCLE9BQVY7QUFDSDtBQUNEaXlCLHdCQUFZLHlCQUFVbkksUUFBVixFQUFvQjVCLEdBQXBCLEVBQXlCeGxCLEtBQXpCLENBQVo7QUFDSCxTQUxEO0FBTUEsWUFBSTJ2QixnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQVN6d0IsT0FBVCxFQUFrQjB3QixTQUFsQixFQUE0QjtBQUM1QyxnQkFBR0osVUFBSCxFQUFjO0FBQ1ZBLDJCQUFXbHlCLE9BQVg7QUFDSDtBQUNEa3lCLHlCQUFhLDBCQUFXcEksUUFBWCxFQUFxQjVCLEdBQXJCLEVBQTBCdG1CLE9BQTFCLEVBQW1DMHdCLFNBQW5DLENBQWI7QUFDSCxTQUxEO0FBTUFILGtCQUFVLHVCQUFRckksUUFBUixFQUFrQjVCLEdBQWxCLENBQVY7O0FBRUFBLFlBQUk1bkIsRUFBSixDQUFPZ0IsZ0JBQVAsRUFBYyxZQUFXO0FBQ3JCOHdCLDRCQUFnQmprQix1QkFBaEI7QUFDSCxTQUZEO0FBR0ErWixZQUFJNW5CLEVBQUosQ0FBTzRPLHVCQUFQLEVBQXFCLFVBQVMxTyxJQUFULEVBQWM7QUFDL0IsZ0JBQUdBLFFBQVFBLEtBQUtrckIsUUFBaEIsRUFBeUI7QUFDckIsb0JBQUdsckIsS0FBS2tyQixRQUFMLEtBQWtCdGQsd0JBQXJCLEVBQW1DO0FBQy9CNmpCLDhCQUFVanlCLE9BQVY7QUFDQW15Qiw0QkFBUXBaLElBQVIsQ0FBYSxLQUFiO0FBQ0gsaUJBSEQsTUFHSztBQUNEcVosb0NBQWdCNXhCLEtBQUtrckIsUUFBckI7QUFDQSx3QkFBR2xyQixLQUFLa3JCLFFBQUwsS0FBa0JuZCx3QkFBbEIsSUFBbUMvTixLQUFLa3JCLFFBQUwsS0FBa0JwZCx3QkFBeEQsRUFBdUU7QUFDbkU2akIsZ0NBQVFwWixJQUFSLENBQWEsSUFBYjtBQUNILHFCQUZELE1BRUs7QUFDRG9aLGdDQUFRcFosSUFBUixDQUFhLEtBQWI7QUFDSDtBQUNKO0FBQ0o7QUFDSixTQWREO0FBZUFtUCxZQUFJNW5CLEVBQUosQ0FBT0ksZ0JBQVAsRUFBYyxVQUFTYyxLQUFULEVBQWdCO0FBQzFCLGdCQUFJSSxVQUFVLEVBQWQ7O0FBRUEsZ0JBQUlKLE1BQU1iLElBQU4sS0FBZSxHQUFuQixFQUF3QjtBQUNwQmlCLDBCQUFVLHdCQUFWO0FBQ0gsYUFGRCxNQUVPLElBQUlKLE1BQU1iLElBQU4sS0FBZSxHQUFuQixFQUF3QjtBQUMzQmlCLDBCQUFVLDhCQUFWO0FBQ0gsYUFGTSxNQUVBLElBQUlKLE1BQU1iLElBQU4sS0FBZSxHQUFuQixFQUF3QjtBQUMzQmlCLDBCQUFVLG1FQUFWO0FBQ0gsYUFGTSxNQUVBLElBQUlKLE1BQU1iLElBQU4sS0FBZSxHQUFuQixFQUF3QjtBQUMzQmlCLDBCQUFVLHNHQUFWO0FBQ0gsYUFGTSxNQUVBLElBQUlKLE1BQU1iLElBQU4sS0FBZSxHQUFuQixFQUF3QjtBQUMzQmlCLDBCQUFVLHdJQUFWO0FBQ0gsYUFGTSxNQUVBLElBQUlmLFNBQVNXLE1BQU1iLElBQU4sR0FBVyxHQUFwQixNQUE2QixDQUFqQyxFQUFvQztBQUN2Q2lCLDBCQUFVLDRDQUFWO0FBQ0gsYUFGTSxNQUVBO0FBQ0hBLDBCQUFVLHNDQUFWO0FBQ0g7O0FBRUR5d0IsMEJBQWN6d0IsT0FBZCxFQUF1QixJQUF2QjtBQUNILFNBcEJEOztBQXNCQXNtQixZQUFJNW5CLEVBQUosQ0FBT1EsNEJBQVAsRUFBMEIsVUFBUzhILEtBQVQsRUFBZTtBQUNyQyxnQkFBSWhILFVBQVUsd0ZBQWQ7O0FBRUEsZ0JBQUdzbUIsSUFBSWxuQixpQkFBSixLQUF3QixDQUF4QixLQUErQmtuQixJQUFJam5CLGdCQUFKLEdBQXVCeEIsTUFBekQsRUFBZ0U7QUFDNURtQywwQkFBVSwrREFBVjtBQUNIOztBQUVEeXdCLDBCQUFjendCLE9BQWQsRUFBdUIsSUFBdkI7QUFDSCxTQVJEO0FBVUgsS0FqRUQ7QUFrRUEsUUFBTXFvQixjQUFjLFNBQWRBLFdBQWMsR0FBVTtBQUMxQjtBQUNILEtBRkQ7QUFHQSxRQUFNeGhCLFNBQVMsRUFBZjs7QUFJQSxXQUFPLDRCQUFhd2YsVUFBYixFQUF5QixRQUF6QixFQUFtQyxJQUFuQyxFQUF5Q3hmLE1BQXpDLEVBQWlEb2hCLFVBQWpELEVBQTZESSxXQUE3RCxDQUFQO0FBQ0gsQ0EvRUQsQyxDQXRCQTs7O2tCQXVHZStILE07Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkdmOzs7O0FBSUEsSUFBTW5CLGlCQUFpQixTQUFqQkEsY0FBaUIsQ0FBU3hYLElBQVQsRUFBYztBQUNqQyxTQUFPLDJDQUFQO0FBQ0gsQ0FGRDs7a0JBSWV3WCxjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMZjs7OztBQUNBOzs7O0FBSkE7OztBQVdBLElBQU0wQixhQUFhLFNBQWJBLFVBQWEsQ0FBU3RLLFVBQVQsRUFBcUJDLEdBQXJCLEVBQTBCdG1CLE9BQTFCLEVBQW1DMHdCLFNBQW5DLEVBQTZDOztBQUU1RCxRQUFJRSxtQkFBbUIsRUFBdkI7O0FBRUEsUUFBTTNJLGFBQWEsU0FBYkEsVUFBYSxDQUFTQyxRQUFULEVBQW1COUMsUUFBbkIsRUFBNEI7QUFDM0MsWUFBR3NMLFNBQUgsRUFBYTtBQUNURSwrQkFBbUIzZSxXQUFXLFlBQVU7QUFDcENtVCx5QkFBU2huQixPQUFUO0FBQ0gsYUFGa0IsRUFFaEJzeUIsYUFBVyxJQUZLLENBQW5CO0FBR0g7QUFDSixLQU5EO0FBT0EsUUFBTXJJLGNBQWMsU0FBZEEsV0FBYyxHQUFVLENBQzdCLENBREQ7QUFFQSxRQUFNeGhCLFNBQVM7QUFDWCxtQ0FBNEIsNkJBQVNHLEtBQVQsRUFBZ0JraEIsUUFBaEIsRUFBMEI5QyxRQUExQixFQUFtQztBQUMzRHBlLGtCQUFNdWhCLGNBQU47O0FBRUEsZ0JBQUdxSSxnQkFBSCxFQUFvQjtBQUNoQnhQLDZCQUFhd1AsZ0JBQWI7QUFDSDtBQUNEeEwscUJBQVNobkIsT0FBVDtBQUNIO0FBUlUsS0FBZjs7QUFXQSxXQUFPLDRCQUFhaW9CLFVBQWIsRUFBeUIsWUFBekIsRUFBdUNybUIsT0FBdkMsRUFBZ0Q2RyxNQUFoRCxFQUF3RG9oQixVQUF4RCxFQUFvRUksV0FBcEUsQ0FBUDtBQUNILENBekJEOztrQkE0QmVzSSxVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDdkNBLFVBQUMzd0IsT0FBRCxFQUFhO0FBQ3hCLFdBQ0ksaURBQ0kscUNBREosR0FFUSxpQ0FGUixHQUUwQ0EsT0FGMUMsR0FFa0QsU0FGbEQsR0FHSSxRQUhKLEdBSUEsUUFMSjtBQU9ILEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztrUUNSRDs7Ozs7QUFHQTs7Ozs7O0FBRUEsSUFBTTZ3QixVQUFVLFNBQVZBLE9BQVUsQ0FBU3hLLFVBQVQsRUFBcUJDLEdBQXJCLEVBQXlCO0FBQ3JDLFFBQUl3SyxXQUFXLEVBQWY7O0FBRUEsUUFBTTdJLGFBQWEsU0FBYkEsVUFBYSxDQUFTQyxRQUFULEVBQW1COUMsUUFBbkIsRUFBNEI7QUFDM0MwTCxtQkFBVzVJLFFBQVg7QUFDSCxLQUZEO0FBR0EsUUFBTUcsY0FBYyxTQUFkQSxXQUFjLEdBQVU7QUFDMUI7QUFDSCxLQUZEO0FBR0EsUUFBTXhoQixTQUFTLEVBQWY7O0FBRUEsV0FBTyxTQUFjLDRCQUFhd2YsVUFBYixFQUF5QixTQUF6QixFQUFvQyxJQUFwQyxFQUEwQ3hmLE1BQTFDLEVBQWtEb2hCLFVBQWxELEVBQThESSxXQUE5RCxDQUFkLEVBQTJGO0FBQzlGbFIsY0FBTSxjQUFVNFosTUFBVixFQUFrQjtBQUNwQixnQkFBR0EsTUFBSCxFQUFVO0FBQ05ELHlCQUFTM1osSUFBVDtBQUNILGFBRkQsTUFFSztBQUNEMloseUJBQVN6WixJQUFUO0FBQ0g7QUFDSjtBQVA2RixLQUEzRixDQUFQO0FBU0gsQ0FwQkQ7O2tCQXVCZXdaLE87Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkM1QkEsWUFBTTtBQUNqQixXQUFPLDJKQUFQO0FBQ0gsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tRQ0ZEOzs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFjQSxtQkFBQTlmLENBQVEsNERBQVI7O0FBRUEsSUFBTWlnQixPQUFPLFNBQVBBLElBQU8sQ0FBUzNLLFVBQVQsRUFBb0I7QUFDN0IsUUFBSTRLLFdBQVcsRUFBZjtBQUFBLFFBQW1CQyxTQUFTLEVBQTVCO0FBQUEsUUFBZ0NDLG9CQUFoQztBQUFBLFFBQTZDQyxlQUFlLEVBQTVEO0FBQUEsUUFBZ0U5SyxNQUFNLEVBQXRFO0FBQUEsUUFBMEUrSyxnQkFBZ0IsRUFBMUY7O0FBRUEsUUFBSUMsVUFBVSxTQUFWQSxPQUFVLENBQVVqYSxJQUFWLEVBQWdCa2EsUUFBaEIsRUFBMEI7O0FBRXBDLFlBQUlGLGFBQUosRUFBbUI7QUFDZmpRLHlCQUFhaVEsYUFBYjtBQUNBQSw0QkFBZ0IsSUFBaEI7QUFDSDs7QUFFRCxZQUFJaGEsSUFBSixFQUFVO0FBQ04sZ0JBQUdrUywyQkFBaUIxckIsTUFBakIsR0FBMEIsQ0FBN0IsRUFBK0I7QUFDM0IsdUJBQU8sS0FBUDtBQUNIO0FBQ0RzekIsd0JBQVl6YSxRQUFaLENBQXFCLGNBQXJCO0FBQ0gsU0FMRCxNQUtPO0FBQ0h5YSx3QkFBWW5hLFdBQVosQ0FBd0IsY0FBeEI7O0FBRUEsZ0JBQUl1YSxRQUFKLEVBQWM7QUFDVkYsZ0NBQWdCcGYsV0FBVyxZQUFXO0FBQ2xDLHdCQUFHc1gsMkJBQWlCMXJCLE1BQWpCLEdBQTBCLENBQTdCLEVBQStCO0FBQzNCLCtCQUFPLEtBQVA7QUFDSDtBQUNEc3pCLGdDQUFZemEsUUFBWixDQUFxQixjQUFyQjtBQUNILGlCQUxlLEVBS2IsSUFMYSxDQUFoQjtBQU1IO0FBQ0o7QUFDSixLQXhCRDtBQXlCQSxRQUFJOGEsa0JBQWtCLFNBQWxCQSxlQUFrQixHQUFZO0FBQzlCLFlBQU16SCxlQUFlekQsSUFBSXZrQixRQUFKLEVBQXJCOztBQUVBLFlBQUlnb0IsaUJBQWlCMWQscUJBQWpCLElBQStCMGQsaUJBQWlCeGQsdUJBQWhELElBQWdFd2QsaUJBQWlCemQseUJBQXJGLEVBQXFHO0FBQ2pHZ2EsZ0JBQUlwbEIsSUFBSjtBQUNILFNBRkQsTUFFTSxJQUFHNm9CLGlCQUFpQnZkLHdCQUFwQixFQUFrQztBQUNwQzhaLGdCQUFJaG5CLEtBQUo7QUFDSDtBQUNKLEtBUkQ7QUFTQSxRQUFJNkIsT0FBTyxTQUFQQSxJQUFPLENBQVVxWixPQUFWLEVBQW1CaVgsUUFBbkIsRUFBNkI7O0FBRXBDLFlBQU1qc0IsV0FBVzhnQixJQUFJOWxCLFdBQUosRUFBakI7QUFDQSxZQUFNa3hCLGtCQUFrQnBMLElBQUk3bEIsV0FBSixFQUF4QjtBQUNBLFlBQUlXLFdBQVcsQ0FBZjs7QUFFQSxZQUFHcXdCLFFBQUgsRUFBWTtBQUNScndCLHVCQUFXNEQsS0FBS21YLEdBQUwsQ0FBU3VWLGtCQUFrQmxYLE9BQTNCLEVBQW9DLENBQXBDLENBQVg7QUFDSCxTQUZELE1BRUs7QUFDRHBaLHVCQUFXNEQsS0FBSzRZLEdBQUwsQ0FBUzhULGtCQUFrQmxYLE9BQTNCLEVBQW9DaFYsUUFBcEMsQ0FBWDtBQUNIOztBQUVEOGdCLFlBQUlubEIsSUFBSixDQUFTQyxRQUFUO0FBQ0gsS0FiRDtBQWNBLFFBQUlSLFNBQVMsU0FBVEEsTUFBUyxDQUFTK3dCLElBQVQsRUFBYztBQUN2QixZQUFNQyxnQkFBZ0J0TCxJQUFJNWxCLFNBQUosRUFBdEI7QUFDQSxZQUFJbXhCLFlBQVksQ0FBaEI7QUFDQSxZQUFHRixJQUFILEVBQVE7QUFDSkUsd0JBQWE3c0IsS0FBSzRZLEdBQUwsQ0FBU2dVLGdCQUFnQixDQUF6QixFQUE0QixHQUE1QixDQUFiO0FBQ0gsU0FGRCxNQUVLO0FBQ0RDLHdCQUFZN3NCLEtBQUttWCxHQUFMLENBQVN5VixnQkFBZ0IsQ0FBekIsRUFBNEIsQ0FBNUIsQ0FBWjtBQUNIO0FBQ0R0TCxZQUFJM2xCLFNBQUosQ0FBY2t4QixTQUFkO0FBQ0gsS0FURDtBQVVBLFFBQUlDLHFCQUFxQixTQUFyQkEsa0JBQXFCLENBQVNyRyxLQUFULEVBQWdCeUUsS0FBaEIsRUFBc0I7QUFDM0MsWUFBR2tCLFlBQUgsRUFBZ0I7QUFDWkEseUJBQWFoekIsT0FBYjtBQUNBZ3pCLDJCQUFlLElBQWY7QUFDSDtBQUNEQSx1QkFBZSw0QkFBYUQsV0FBYixFQUEwQjdLLEdBQTFCLEVBQStCLEVBQUNtRixPQUFRQSxLQUFULEVBQWdCeUUsT0FBUUEsS0FBeEIsRUFBL0IsQ0FBZjtBQUNILEtBTkQ7O0FBUUEsUUFBTWpJLGFBQWEsU0FBYkEsVUFBYSxDQUFTQyxRQUFULEVBQW1COUMsUUFBbkIsRUFBNEI7QUFDM0MrTCxzQkFBY2pKLFFBQWQ7QUFDSCxLQUZEO0FBR0EsUUFBTUcsY0FBYyxTQUFkQSxXQUFjLEdBQVU7QUFDMUI7QUFDSCxLQUZEO0FBR0EsUUFBTXhoQixTQUFTO0FBQ1gsNkJBQXNCLHlCQUFTRyxLQUFULEVBQWdCa2hCLFFBQWhCLEVBQTBCOUMsUUFBMUIsRUFBbUM7QUFDckRwZSxrQkFBTXVoQixjQUFOOztBQUVBLGdCQUFHNkksWUFBSCxFQUFnQjtBQUNaQSw2QkFBYWh6QixPQUFiO0FBQ0FnekIsK0JBQWUsSUFBZjtBQUNBLHVCQUFPLEtBQVA7QUFDSDtBQUNELGdCQUFHLENBQUMsc0JBQUlwcUIsTUFBTTJuQixNQUFWLEVBQWtCNVYsT0FBbEIsQ0FBMEIsZUFBMUIsQ0FBRCxJQUNDLENBQUMsc0JBQUkvUixNQUFNMm5CLE1BQVYsRUFBa0I1VixPQUFsQixDQUEwQixvQkFBMUIsQ0FETCxFQUNxRDtBQUNqRHlZO0FBQ0g7QUFDRCxnQkFBRyxDQUFDLHNCQUFJeHFCLE1BQU0ybkIsTUFBVixFQUFrQjVWLE9BQWxCLENBQTBCLG9CQUExQixDQUFELElBQW9ELENBQUMsc0JBQUkvUixNQUFNMm5CLE1BQVYsRUFBa0I1VixPQUFsQixDQUEwQixxQkFBMUIsQ0FBckQsSUFBeUd3USwyQkFBaUIxckIsTUFBakIsR0FBMEIsQ0FBdEksRUFBd0k7QUFDcEk7QUFDQStHLHFDQUFFNlgsSUFBRixDQUFPOE0sMEJBQVAsRUFBeUIsVUFBU0MsWUFBVCxFQUFzQjtBQUMzQ0EsaUNBQWFwckIsT0FBYjtBQUNILGlCQUZEO0FBR0FtckIsMkNBQWlCbGdCLE1BQWpCLENBQXdCLENBQXhCLEVBQTJCa2dCLDJCQUFpQjFyQixNQUE1QztBQUNIO0FBQ0osU0FwQlU7QUFxQlgsa0NBQTJCLDhCQUFTbUosS0FBVCxFQUFnQmtoQixRQUFoQixFQUEwQjlDLFFBQTFCLEVBQW1DO0FBQzFEcGUsa0JBQU11aEIsY0FBTjs7QUFFQSxnQkFBSWpDLElBQUl2a0IsUUFBSixPQUFtQnlLLHdCQUF2QixFQUFzQztBQUNsQzhrQix3QkFBUSxLQUFSLEVBQWUsSUFBZjtBQUNILGFBRkQsTUFFTztBQUNIQSx3QkFBUSxLQUFSO0FBQ0g7QUFDSixTQTdCVTtBQThCWCxpQ0FBMEIsNkJBQVN0cUIsS0FBVCxFQUFnQmtoQixRQUFoQixFQUEwQjlDLFFBQTFCLEVBQW1DO0FBQ3pEcGUsa0JBQU11aEIsY0FBTjs7QUFFQSxnQkFBSWpDLElBQUl2a0IsUUFBSixPQUFtQnlLLHdCQUF2QixFQUFzQztBQUNsQzhrQix3QkFBUSxLQUFSLEVBQWUsSUFBZjtBQUNILGFBRkQsTUFFTztBQUNIQSx3QkFBUSxLQUFSO0FBQ0g7QUFDSixTQXRDVTtBQXVDWCxrQ0FBMkIsOEJBQVN0cUIsS0FBVCxFQUFnQmtoQixRQUFoQixFQUEwQjlDLFFBQTFCLEVBQW1DO0FBQzFEcGUsa0JBQU11aEIsY0FBTjs7QUFFQSxnQkFBR2pDLElBQUl2a0IsUUFBSixPQUFtQnlLLHdCQUF0QixFQUFvQztBQUNoQzhrQix3QkFBUSxJQUFSO0FBQ0g7QUFDSixTQTdDVTs7QUErQ1gsK0JBQXdCLDJCQUFTdHFCLEtBQVQsRUFBZ0JraEIsUUFBaEIsRUFBMEI5QyxRQUExQixFQUFtQztBQUN2RCxvQkFBT3BlLE1BQU0rcUIsT0FBYjtBQUNJLHFCQUFLLEVBQUw7QUFBWTtBQUNSL3FCLDBCQUFNdWhCLGNBQU47QUFDQWlKO0FBQ0E7QUFDSixxQkFBSyxFQUFMO0FBQVU7QUFDTnhxQiwwQkFBTXVoQixjQUFOO0FBQ0FwbkIseUJBQUssQ0FBTCxFQUFRLElBQVI7QUFDQTtBQUNKLHFCQUFLLEVBQUw7QUFBVTtBQUNONkYsMEJBQU11aEIsY0FBTjtBQUNBcG5CLHlCQUFLLENBQUwsRUFBUSxLQUFSO0FBQ0E7QUFDSixxQkFBSyxFQUFMO0FBQVU7QUFDTjZGLDBCQUFNdWhCLGNBQU47QUFDQTNuQiwyQkFBTyxJQUFQO0FBQ0E7QUFDSixxQkFBSyxFQUFMO0FBQVU7QUFDTm9HLDBCQUFNdWhCLGNBQU47QUFDQTNuQiwyQkFBTyxLQUFQO0FBQ0E7QUFwQlI7QUFzQkgsU0F0RVU7QUF1RVgsbUNBQTRCLCtCQUFTb0csS0FBVCxFQUFnQmtoQixRQUFoQixFQUEwQjlDLFFBQTFCLEVBQW1DO0FBQzNEcGUsa0JBQU11aEIsY0FBTjtBQUNBdUosK0JBQW1COXFCLE1BQU15a0IsS0FBekIsRUFBZ0N6a0IsTUFBTWtwQixLQUF0QztBQUNBLG1CQUFPLEtBQVA7QUFDSDtBQTNFVSxLQUFmOztBQStFQSxXQUFPLFNBQWMsNEJBQWE3SixVQUFiLEVBQXlCLE1BQXpCLEVBQWlDQSxXQUFXblIsRUFBNUMsRUFBZ0RyTyxNQUFoRCxFQUF3RG9oQixVQUF4RCxFQUFvRUksV0FBcEUsRUFBaUYsSUFBakYsQ0FBZCxFQUFzRztBQUN6R3JULGtDQUEwQixvQ0FBWTtBQUNsQyxtQkFBT21jLFlBQVk3YSxJQUFaLENBQWlCLDhCQUFqQixFQUFpRHdDLEdBQWpELEVBQVA7QUFDSCxTQUh3RztBQUl6RzNELGdCQUFRLGdCQUFVSixjQUFWLEVBQTBCO0FBQzlCdVIsa0JBQU12UixjQUFOO0FBQ0FtYyxxQkFBUyxvQkFBT0MsWUFBWTdhLElBQVosQ0FBaUIsU0FBakIsQ0FBUCxFQUFvQ3ZCLGNBQXBDLENBQVQ7QUFDQWtjLHVCQUFXLG9CQUFTRSxZQUFZN2EsSUFBWixDQUFpQixTQUFqQixDQUFULEVBQXNDdkIsY0FBdEMsQ0FBWDs7QUFHQXVSLGdCQUFJNW5CLEVBQUosQ0FBTzRPLHVCQUFQLEVBQXFCLFVBQVMxTyxJQUFULEVBQWM7QUFDL0Isb0JBQUdBLFFBQVFBLEtBQUtrckIsUUFBaEIsRUFBeUI7QUFDckIsd0JBQUdsckIsS0FBS2tyQixRQUFMLEtBQWtCdGQsd0JBQXJCLEVBQW1DO0FBQy9COGtCLGdDQUFRLEtBQVIsRUFBZSxJQUFmO0FBQ0gscUJBRkQsTUFFSztBQUNEQSxnQ0FBUSxLQUFSO0FBQ0g7QUFDSjtBQUNKLGFBUkQ7QUFTSDtBQW5Cd0csS0FBdEcsQ0FBUDtBQXFCSCxDQS9LRDs7a0JBbUxlTixJOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdNZjs7OztBQUlBLElBQU1oQyxlQUFlLFNBQWZBLFlBQWUsQ0FBUzlaLEVBQVQsRUFBWTtBQUM3QixXQUFPLHlFQUF1RUEsRUFBdkUsR0FBMEUsSUFBMUUsR0FDSywrQkFETCxHQUVLLDBCQUZMLEdBR1MsMkNBSFQsR0FJUyxRQUpULEdBS1Msc0JBTFQsR0FNUyxRQU5ULEdBT0ssUUFQTCxHQVFDLFFBUlI7QUFTSCxDQVZEO2tCQVdlOFosWSIsImZpbGUiOiJvdmVucGxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJvdmVucGxheWVyXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuaHRtbDVcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5odG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLmh0bWw1XCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLmh0bWw1XCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJyk7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9vdmVucGxheWVyLmpzXCIpO1xuIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGNoYXJzZXQgXFxcIlVURi04XFxcIjsub3ZwLXdyYXBwZXJ7cG9zaXRpb246cmVsYXRpdmU7bWF4LWhlaWdodDoxMDAlO292ZXJmbG93OmhpZGRlbjt6b29tOjEgIWltcG9ydGFudDt3aWR0aDoxMDAlO2Rpc3BsYXk6YmxvY2s7YmFja2dyb3VuZC1jb2xvcjojMDAwOy1tb3otYm94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveDtjb2xvcjojZWVlO2ZvbnQtZmFtaWx5OidOb3RvIFNhbnMnLHNhbnMtc2VyaWY7Zm9udC1zaXplOjExcHg7bGluZS1oZWlnaHQ6MS4zO2ZvbnQtd2VpZ2h0Om5vcm1hbDtvdXRsaW5lOjB9Lm92cC13cmFwcGVyOmJlZm9yZSwub3ZwLXdyYXBwZXI6YWZ0ZXJ7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94fS5vdnAtd3JhcHBlciAqLC5vdnAtd3JhcHBlciAqOmJlZm9yZSwub3ZwLXdyYXBwZXIgKjphZnRlcnstbW96LWJveC1zaXppbmc6Ym9yZGVyLWJveDstd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm92cC13cmFwcGVyLm92cC1mdWxsc2NyZWVue2hlaWdodDoxMDAlICFpbXBvcnRhbnR9Lm92cC13cmFwcGVyLm92cC1hdXRvaGlkZXtjdXJzb3I6bm9uZX0ub3ZwLXdyYXBwZXIub3ZwLWF1dG9oaWRlIC5vdnAtZ3JhZGllbnQtdG9wLC5vdnAtd3JhcHBlci5vdnAtYXV0b2hpZGUgLm92cC1ncmFkaWVudC1ib3R0b20sLm92cC13cmFwcGVyLm92cC1hdXRvaGlkZSAub3ZwLWJvdHRvbS1wYW5lbHtvcGFjaXR5OjB9Lm92cC13cmFwcGVyLm92cC1hdXRvaGlkZSAub3ZwLXByb2dyZXNzYmFyLWNvbnRhaW5lciwub3ZwLXdyYXBwZXIub3ZwLWF1dG9oaWRlIC5vdnAtY29udHJvbHMgLm92cC1idXR0b257Y3Vyc29yOm5vbmV9Lm92cC13cmFwcGVyLm92cC1hdXRvaGlkZSAub3ZwLWNhcHRpb24tdGV4dC1jb250YWluZXJ7Ym90dG9tOjI1cHh9Lm92cC13cmFwcGVyIC5vdnAtcmF0aW97cGFkZGluZy1ib3R0b206NTYuMjUlfS5vdnAtcGxheWVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO3dpZHRoOjEwMCV9Lm92cC1wbGF5ZXIgLm92cC1tZWRpYS1lbGVtZW50LWNvbnRhaW5lcntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9Lm92cC1wbGF5ZXIgLm92cC1tZWRpYS1lbGVtZW50LWNvbnRhaW5lcj4qe3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Lm92cC1wbGF5ZXIgLm92cC11aXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5vdnAtYnV0dG9ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO2JvcmRlcjpub25lO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7cGFkZGluZzowO2NvbG9yOmluaGVyaXQ7dGV4dC1hbGlnbjppbmhlcml0O292ZXJmbG93OmhpZGRlbjtmb250LXdlaWdodDoxMDB9Lm92cC1idXR0b246Zm9jdXMsLm92cC1idXR0b257b3V0bGluZTowfS5vdnAtZ3JhZGllbnQtdG9wLC5vdnAtZ3JhZGllbnQtYm90dG9te3dpZHRoOjEwMCU7cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1jb2xvcjojMTIxMjFjO3BvaW50ZXItZXZlbnRzOm5vbmU7b3BhY2l0eTouMzstbW96LXRyYW5zaXRpb246b3BhY2l0eSAuMjVzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpO3RyYW5zaXRpb246b3BhY2l0eSAuMjVzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSl9Lm92cC1ncmFkaWVudC1ib3R0b217aGVpZ2h0OjUwcHg7Ym90dG9tOjA7ei1pbmRleDoyMn0ub3ZwLXNwaW5uZXItY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2Rpc3BsYXk6bm9uZX0ub3ZwLXNwaW5uZXItY29udGFpbmVyIC5vdnAtc3Bpbm5lcnt3aWR0aDo3MHB4O2hlaWdodDoxOHB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7bWFyZ2luLXRvcDotOXB4O21hcmdpbi1sZWZ0Oi0zNXB4O3RleHQtYWxpZ246Y2VudGVyfS5vdnAtc3Bpbm5lci1jb250YWluZXIgLm92cC1zcGlubmVyPmRpdnt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6IzUwZTNjMjtib3JkZXItcmFkaXVzOjEwMCU7ZGlzcGxheTppbmxpbmUtYmxvY2s7LXdlYmtpdC1hbmltYXRpb246c2stYm91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO2FuaW1hdGlvbjpzay1ib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0IGJvdGh9Lm92cC1zcGlubmVyLWNvbnRhaW5lciAub3ZwLXNwaW5uZXIgLmJvdW5jZTF7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LTAuMzJzO2FuaW1hdGlvbi1kZWxheTotMC4zMnN9Lm92cC1zcGlubmVyLWNvbnRhaW5lciAub3ZwLXNwaW5uZXIgLmJvdW5jZTJ7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LTAuMTZzO2FuaW1hdGlvbi1kZWxheTotMC4xNnN9QC13ZWJraXQta2V5ZnJhbWVzIHNrLWJvdW5jZWRlbGF5ezAlLDgwJSwxMDAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApfTQwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxKX19QGtleWZyYW1lcyBzay1ib3VuY2VkZWxheXswJSw4MCUsMTAwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9NDAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX19Lm92cC1tZXNzYWdlLWJveHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0ub3ZwLW1lc3NhZ2UtYm94IC5vdnAtbWVzc2FnZS1jb250YWluZXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOjYwcHg7d2lkdGg6MTAwJTtwYWRkaW5nOjAgMTJweDt0ZXh0LWFsaWduOmNlbnRlcn0ub3ZwLW1lc3NhZ2UtYm94IC5vdnAtbWVzc2FnZS1jb250YWluZXIgLm92cC1tZXNzYWdlLXRleHR7Zm9udC1zaXplOjE0MCU7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLDAuNSk7Y29sb3I6I2ZmZjtwYWRkaW5nOi4xZW0gLjNlbTt3b3JkLXdyYXA6YnJlYWstd29yZDtsaW5lLWhlaWdodDoxLjVlbX0ub3ZwLWJpZ2J1dHRvbi1jb250YWluZXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Lm92cC1iaWdidXR0b24tY29udGFpbmVyIC5vdnAtYmlnYnV0dG9ue3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7d2lkdGg6ODBweDtoZWlnaHQ6ODBweDttYXJnaW4tdG9wOi00MHB4O21hcmdpbi1sZWZ0Oi00MHB4O3RleHQtYWxpZ246Y2VudGVyfS5vdnAtYmlnYnV0dG9uLWNvbnRhaW5lciAub3ZwLWJpZ2J1dHRvbi5vdnAtYmlnYnV0dG9uLXBsYXl7YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXBsYXktbGFyZ2Uuc3ZnXCIpKSArIFwiKTtiYWNrZ3JvdW5kLXNpemU6MTAwJX0ub3ZwLWJpZ2J1dHRvbi1jb250YWluZXIgLm92cC1iaWdidXR0b24ub3ZwLWJpZ2J1dHRvbi1wYXVzZXtiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItc3RvcC1sYXJnZS5zdmdcIikpICsgXCIpO2JhY2tncm91bmQtc2l6ZToxMDAlfS5vdnAtYmlnYnV0dG9uLWNvbnRhaW5lciAub3ZwLWJpZ2J1dHRvbi5vdnAtYmlnYnV0dG9uLXJlcGxheXtiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItcmUtbGFyZ2Uuc3ZnXCIpKSArIFwiKTtiYWNrZ3JvdW5kLXNpemU6MTAwJX0ub3ZwLXNldHRpbmctcGFuZWx7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjU1cHg7cmlnaHQ6MTJweDtvdmVyZmxvdy15OmF1dG87d2lkdGg6MjYwcHg7Zm9udC1zaXplOjEyMCU7dXNlci1zZWxlY3Q6bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjgsMjgsMjgsMC45KTt0ZXh0LXNoYWRvdzowIDAgMnB4IHJnYmEoMCwwLDAsMC41KX0ub3ZwLXNldHRpbmctcGFuZWwgLm92cC1zZXR0aW5nLXRpdGxlLC5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbXt3aWR0aDoxMDAlO2hlaWdodDozOHB4O2xpbmUtaGVpZ2h0OjM4cHg7Y29sb3I6I2VlZTtjdXJzb3I6cG9pbnRlcjtvdXRsaW5lOm5vbmV9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy10aXRsZS1jb250YWluZXIgLm92cC1zZXR0aW5nLXRpdGxlIC5vdnAtc2V0dGluZy10aXRsZS10aXRsZXtwYWRkaW5nLWxlZnQ6MTJweH0ub3ZwLXNldHRpbmctcGFuZWwgLm92cC1zZXR0aW5nLXRpdGxlLWNvbnRhaW5lciAub3ZwLXNldHRpbmctdGl0bGUgLm92cC1zZXR0aW5nLXRpdGxlLXByZXZpY29ue3BhZGRpbmc6MCAwIDAgMTJweDttYXJnaW4tcmlnaHQ6LTZweH0ub3ZwLXNldHRpbmctcGFuZWwgLm92cC1zZXR0aW5nLWl0ZW0tY29udGFpbmVyIC5vdnAtc2V0dGluZy1pdGVtOmhvdmVye2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwwLjEpfS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbS1jb250YWluZXIgLm92cC1zZXR0aW5nLWl0ZW0gLm92cC1zZXR0aW5nLWl0ZW0tdGl0bGV7cGFkZGluZy1sZWZ0OjEycHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lciAub3ZwLXNldHRpbmctaXRlbSAub3ZwLXNldHRpbmctaXRlbS1uZXh0aWNvbntmbG9hdDpyaWdodDtwYWRkaW5nLXJpZ2h0OjEycHg7bWFyZ2luLWxlZnQ6LTZweH0ub3ZwLXNldHRpbmctcGFuZWwgLm92cC1zZXR0aW5nLWl0ZW0tY29udGFpbmVyIC5vdnAtc2V0dGluZy1pdGVtIHNwYW4ub3ZwLXNldHRpbmctaXRlbS12YWx1ZXtmbG9hdDpyaWdodDtwYWRkaW5nLXJpZ2h0OjEycHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lciAub3ZwLXNldHRpbmctaXRlbS5vdnAtc2V0dGluZy1pdGVtLXZhbHVlIC5vdnAtc2V0dGluZy1pdGVtLXRpdGxle21hcmdpbi1sZWZ0Oi02cHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lciAub3ZwLXNldHRpbmctaXRlbS5vdnAtc2V0dGluZy1pdGVtLXZhbHVlIC5vdnAtc2V0dGluZy1pdGVtLWNoZWNrZWR7cGFkZGluZy1sZWZ0OjEycHg7dmlzaWJpbGl0eTpoaWRkZW59Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lciAub3ZwLXNldHRpbmctaXRlbS5vdnAtc2V0dGluZy1pdGVtLXZhbHVlIC5vdnAtc2V0dGluZy1pdGVtLWNoZWNrZWQub3ZwLXNob3d7dmlzaWJpbGl0eTp2aXNpYmxlfS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVse3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MHB4O3JpZ2h0OjBweDtib3R0b206MHB4O2hlaWdodDo1MHB4O3otaW5kZXg6NjA7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTt0cmFuc2l0aW9uOm9wYWNpdHkgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpfS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtcHJvZ3Jlc3NiYXItY29udGFpbmVye2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtib3R0b206NTBweDtoZWlnaHQ6NHB4O2N1cnNvcjpwb2ludGVyfS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtcHJvZ3Jlc3NiYXItY29udGFpbmVyIC5vdnAtcHJvZ3Jlc3NiYXItcGFkZGluZ3twb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlO2hlaWdodDoxNnB4O2JvdHRvbTowO3otaW5kZXg6Mjh9Lm92cC1jb250cm9scy1jb250YWluZXIgLm92cC1ib3R0b20tcGFuZWwgLm92cC1jb250cm9sc3twb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MDt3aWR0aDoxMDAlO2hlaWdodDo1MHB4O3RleHQtYWxpZ246bGVmdH0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLWNvbnRyb2xzIC5vdnAtYnV0dG9ue21pbi13aWR0aDozMHB4O2hlaWdodDozMHB4O2N1cnNvcjpwb2ludGVyfS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtY29udHJvbHMgLm92cC1sZWZ0LWNvbnRyb2xze2Zsb2F0OmxlZnQ7aGVpZ2h0OjEwMCV9Lm92cC1jb250cm9scy1jb250YWluZXIgLm92cC1ib3R0b20tcGFuZWwgLm92cC1jb250cm9scyAub3ZwLXJpZ2h0LWNvbnRyb2xze2Zsb2F0OnJpZ2h0O2hlaWdodDoxMDAlfS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtY29udHJvbHMgLm92cC1yaWdodC1jb250cm9scyAub3ZwLXNldHRpbmctYnV0dG9ue3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxMHB4O21hcmdpbi1yaWdodDoxMnB4fS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtY29udHJvbHMgLm92cC1yaWdodC1jb250cm9scyAub3ZwLXNldHRpbmctYnV0dG9uPml7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLXNpemU6MTAwJTtiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItc2V0dGluZy5zdmdcIikpICsgXCIpfS5vdnAtcHJvZ3Jlc3NiYXJ7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7ei1pbmRleDozMTtvdXRsaW5lOm5vbmV9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXBsYXktYmFja2dyb3VuZC1jb2xvcntiYWNrZ3JvdW5kLWNvbG9yOiM1MGUzYzJ9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzLWxpc3R7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LDAuMik7ei1pbmRleDozOX0ub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3MtbGlzdCAub3ZwLWxvYWQtcHJvZ3Jlc3MsLm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzLWxpc3QgLm92cC1wbGF5LXByb2dyZXNzLC5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzcy1saXN0IC5vdnAtaG92ZXItcHJvZ3Jlc3N7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO2JvdHRvbTowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7LW1vei10cmFuc2Zvcm0tb3JpZ2luOjAgMDstbXMtdHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMH0ub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3MtbGlzdCAub3ZwLXBsYXktcHJvZ3Jlc3N7d2lkdGg6MDt6LWluZGV4OjM0Oy13ZWJraXQtdHJhbnNpdGlvbjp3aWR0aCAuMXMgZWFzZTt0cmFuc2l0aW9uOndpZHRoIC4xcyBlYXNlfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzcy1saXN0IC5vdnAtbG9hZC1wcm9ncmVzc3t3aWR0aDowO3otaW5kZXg6MzM7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LDAuNSk7LXdlYmtpdC10cmFuc2l0aW9uOndpZHRoIC41cyBlYXNlO3RyYW5zaXRpb246d2lkdGggLjVzIGVhc2V9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzLWxpc3QgLm92cC1ob3Zlci1wcm9ncmVzc3tsZWZ0OjA7d2lkdGg6MDt6LWluZGV4OjM1O2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwwLjYpfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzc2Jhci1rbm9iLWNvbnRhaW5lcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTVweDtsZWZ0OjBweDt6LWluZGV4OjQzOy1tb3otdHJhbnNpdGlvbjotbW96LXRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKTstd2Via2l0LXRyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjFzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7LW1zLXRyYW5zaXRpb246LW1zLXRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKTstbW96LXRyYW5zZm9ybTpzY2FsZSgwKTstbXMtdHJhbnNmb3JtOnNjYWxlKDApOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX0ub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3NiYXIta25vYi1jb250YWluZXIgLm92cC1wcm9ncmVzc2Jhci1rbm9ie3dpZHRoOjE0cHg7aGVpZ2h0OjE0cHg7Ym9yZGVyLXJhZGl1czo3cHg7LXdlYmtpdC10cmFuc2l0aW9uOndpZHRoIC4xcyBlYXNlO3RyYW5zaXRpb246d2lkdGggLjFzIGVhc2V9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzYmFyLXRpbWV7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbToxNXB4O2xlZnQ6MDt3aWR0aDphdXRvO2JhY2tncm91bmQtY29sb3I6cmdiYSgyOCwyOCwyOCwwLjkpO2JvcmRlci1yYWRpdXM6MnB4O3BhZGRpbmc6NXB4IDlweDtmb250LXNpemU6MTE4JTtsaW5lLWhlaWdodDoxNXB4O3VzZXItc2VsZWN0Om5vbmV9Lm92cC1wcm9ncmVzc2Jhci1ob3ZlciAub3ZwLXByb2dyZXNzYmFyLWtub2ItY29udGFpbmVyey1tb3otdHJhbnNmb3JtOm5vbmU7LW1zLXRyYW5zZm9ybTpub25lOy13ZWJraXQtdHJhbnNmb3JtOm5vbmU7dHJhbnNmb3JtOm5vbmU7LW1vei10cmFuc2l0aW9uOi1tb3otdHJhbnNmb3JtIC4xcyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTstbXMtdHJhbnNpdGlvbjotbXMtdHJhbnNmb3JtIC4xcyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpO3RyYW5zaXRpb246dHJhbnNmb3JtIC4xcyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpfS5vdnAtcHJvZ3Jlc3NiYXItaG92ZXIgLm92cC1wcm9ncmVzc2Jhci10aW1le2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5vdnAtb24tZXJyb3IgLm92cC1wcm9ncmVzc2Jhci10aW1le2Rpc3BsYXk6bm9uZX0ub3ZwLXBsYXktYnV0dG9ue3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxMHB4O21hcmdpbi1sZWZ0OjE1cHh9Lm92cC1wbGF5LWJ1dHRvbj5pe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1zaXplOjEwMCV9Lm92cC1wbGF5LWJ1dHRvbiAub3ZwLXBsYXktYnV0dG9uLXBsYXlpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1wbGF5LnN2Z1wiKSkgKyBcIil9Lm92cC1wbGF5LWJ1dHRvbiAub3ZwLXBsYXktYnV0dG9uLXBhdXNlaWNvbntiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItc3RvcC5zdmdcIikpICsgXCIpfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7dG9wOjEwcHg7bWFyZ2luLWxlZnQ6MTJweDtoZWlnaHQ6MzBweH0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLWJ1dHRvbj5pe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1zaXplOjEwMCV9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1idXR0b24gLm92cC12b2x1bWUtYnV0dG9uLWJpZ2ljb257YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXZvbHVtZS5zdmdcIikpICsgXCIpfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtYnV0dG9uIC5vdnAtdm9sdW1lLWJ1dHRvbi1zbWFsbGljb257YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXZvbHVtZS0yLnN2Z1wiKSkgKyBcIil9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1idXR0b24gLm92cC12b2x1bWUtYnV0dG9uLW11dGVpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci12b2x1bWUtbXV0ZS5zdmdcIikpICsgXCIpfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lcntkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDowcHg7aGVpZ2h0OjEwMCU7b3ZlcmZsb3c6aGlkZGVuO2N1cnNvcjpwb2ludGVyO3VzZXItc2VsZWN0Om5vbmU7b3V0bGluZTpub25lOy1tb3otdHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSksd2lkdGggLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7LXdlYmtpdC10cmFuc2l0aW9uOm1hcmdpbiAuMnMgY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKSx3aWR0aCAuMnMgY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKTt0cmFuc2l0aW9uOm1hcmdpbiAuMnMgY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKSx3aWR0aCAuMnMgY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKX0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIuYWN0aXZle3dpZHRoOjcwcHg7bWFyZ2luLWxlZnQ6OHB4O21hcmdpbi1yaWdodDowOy1tb3otdHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSksd2lkdGggLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7LXdlYmtpdC10cmFuc2l0aW9uOm1hcmdpbiAuMnMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKSx3aWR0aCAuMnMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTt0cmFuc2l0aW9uOm1hcmdpbiAuMnMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKSx3aWR0aCAuMnMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKX0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVye2hlaWdodDoxMDAlO3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci1iZywub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci12YWx1ZXtwb3NpdGlvbjphYnNvbHV0ZTtkaXNwbGF5OmJsb2NrO2xlZnQ6MDt0b3A6NTAlO2hlaWdodDo0cHg7bWFyZ2luLXRvcDotMnB4O2JvcmRlci1yYWRpdXM6MTBweH0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci1iZ3t3aWR0aDoxMDAlO2JhY2tncm91bmQ6I2ZmZn0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci12YWx1ZXt3aWR0aDoxMDAlO2JhY2tncm91bmQ6IzUwZTNjMn0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci1oYW5kbGV7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjMwcHg7d2lkdGg6MTJweDtoZWlnaHQ6MTJweDtib3JkZXItcmFkaXVzOjZweDttYXJnaW4tdG9wOi02cHg7YmFja2dyb3VuZDojZmZmfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lciAub3ZwLXZvbHVtZS1zaWxkZXIgLm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZTpiZWZvcmUsLm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItaGFuZGxlOmFmdGVye2NvbnRlbnQ6Jyc7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpub25lO3RvcDo1MCU7aGVpZ2h0OjRweDttYXJnaW4tdG9wOi0ycHg7d2lkdGg6ODBweDt6LWluZGV4Oi0xfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lciAub3ZwLXZvbHVtZS1zaWxkZXIgLm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZTpiZWZvcmV7bGVmdDotNThweDtiYWNrZ3JvdW5kOiM1MGUzYzJ9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItaGFuZGxlOmFmdGVye2xlZnQ6NnB4O2JhY2tncm91bmQ6I2ZmZn0ub3ZwLXRpbWUtZGlzcGxheXtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTBweDttYXJnaW4tbGVmdDoxMnB4O2hlaWdodDozMHB4O3doaXRlLXNwYWNlOm5vd3JhcDtsaW5lLWhlaWdodDozMHB4O3ZlcnRpY2FsLWFsaWduOnRvcDtmb250LXNpemU6MTRweDt1c2VyLXNlbGVjdDpub25lfS5vdnAtdGltZS1kaXNwbGF5IC5vdnAtdGltZS1jdXJyZW50LC5vdnAtdGltZS1kaXNwbGF5IC5vdnAtdGltZS1zZXBhcmF0b3IsLm92cC10aW1lLWRpc3BsYXkgLm92cC10aW1lLWR1cmF0aW9ue2NvbG9yOiNmZmZ9Lm92cC10aW1lLWRpc3BsYXkgLm92cC1saXZlLWJhZGdle29wYWNpdHk6MTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDphdXRvO2ZvbnQtc2l6ZToxNHB4fS5vdnAtdGltZS1kaXNwbGF5IC5vdnAtbGl2ZS1iYWRnZTpiZWZvcmV7YmFja2dyb3VuZDojZmYwMDAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotMnB4O3dpZHRoOjZweDtoZWlnaHQ6NnB4O21hcmdpbi1yaWdodDo1cHg7Y29udGVudDonJztib3JkZXItcmFkaXVzOjZweH0ub3ZwLXRpbWUtZGlzcGxheSAub3ZwLWxpdmUtYmFkZ2UgLm92cC1saXZlLWJhZGdlLWxvd2xhdGVuY3l7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLXJpZ2h0OjVweH0ub3ZwLWNvbnRleHQtcGFuZWx7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94O2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7b3ZlcmZsb3c6aGlkZGVuO3dpZHRoOjIwMHB4O3BhZGRpbmc6NnB4IDA7YmFja2dyb3VuZDpyZ2JhKDI4LDI4LDI4LDAuOSk7dGV4dC1zaGFkb3c6MCAwIDJweCByZ2JhKDAsMCwwLDAuNSk7ei1pbmRleDoyMzAwO2ZvbnQtZmFtaWx5OlJvYm90byxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjtmb250LXNpemU6MTFweDtmb250LXdlaWdodDoxMDA7dXNlci1zZWxlY3Q6bm9uZX0ub3ZwLWNvbnRleHQtcGFuZWw6YmVmb3JlLC5vdnAtY29udGV4dC1wYW5lbDphZnRlcnstbW96LWJveC1zaXppbmc6Ym9yZGVyLWJveDstd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm92cC1jb250ZXh0LXBhbmVsICosLm92cC1jb250ZXh0LXBhbmVsICo6YmVmb3JlLC5vdnAtY29udGV4dC1wYW5lbCAqOmFmdGVyey1tb3otYm94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ub3ZwLWNvbnRleHQtcGFuZWwgLm92cC1jb250ZXh0LWl0ZW17d2lkdGg6MTAwJTtoZWlnaHQ6MzhweDtwYWRkaW5nLWxlZnQ6MTJweDtsaW5lLWhlaWdodDozOHB4O2NvbG9yOiNlZWU7Y3Vyc29yOnBvaW50ZXI7b3V0bGluZTpub25lO2ZvbnQtc2l6ZToxMjAlfS5vdnAtY29udGV4dC1wYW5lbCAub3ZwLWNvbnRleHQtaXRlbTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsMC4xKX0ub3ZwLWZ1bGxzY3JlZW4tYnV0dG9ue3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxMHB4O21hcmdpbi1yaWdodDoxNXB4fS5vdnAtZnVsbHNjcmVlbi1idXR0b24+aXtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JhY2tncm91bmQtc2l6ZToxMDAlfS5vdnAtZnVsbHNjcmVlbi1idXR0b24gLm92cC1mdWxsc2NyZWVuLWJ1dHRvbi1leHBhbmRpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1mdWxsc2NyZWVuLWV4cGFuZC5zdmdcIikpICsgXCIpfS5vdnAtZnVsbHNjcmVlbi1idXR0b24gLm92cC1mdWxsc2NyZWVuLWJ1dHRvbi1jb21wcmVzc2ljb257YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLWZ1bGxzY3JlZW4tY29tcHJlc3Muc3ZnXCIpKSArIFwiKX1Aa2V5ZnJhbWVzIGZhZGV7ZnJvbXtvcGFjaXR5Oi4zfTU1JXtvcGFjaXR5OjF9NzUle29wYWNpdHk6MX10b3tvcGFjaXR5Oi4zfX1ALXdlYmtpdC1rZXlmcmFtZXMgc2hha2V7ZnJvbSx0b3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLCAwLCAwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwgMCwgMCl9MTAlLDMwJSw1MCUsNzAlLDkwJXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKC0xMHB4LCAwLCAwKX0yMCUsNDAlLDYwJSw4MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTBweCwgMCwgMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwcHgsIDAsIDApfX1Aa2V5ZnJhbWVzIHNoYWtle2Zyb20sdG97LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwgMCwgMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsIDAsIDApfTEwJSwzMCUsNTAlLDcwJSw5MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCl9MjAlLDQwJSw2MCUsODAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwcHgsIDAsIDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKX19Lm92cC1wbGF5ZXIgLnNoYWtley13ZWJraXQtYW5pbWF0aW9uLW5hbWU6c2hha2U7YW5pbWF0aW9uLW5hbWU6c2hha2V9QC13ZWJraXQta2V5ZnJhbWVzIGJvdW5jZUlue2Zyb20sMjAlLDQwJSw2MCUsODAlLHRvey13ZWJraXQtYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoLjIxNSwgLjYxLCAuMzU1LCAxKTthbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOmN1YmljLWJlemllciguMjE1LCAuNjEsIC4zNTUsIDEpfTAle29wYWNpdHk6MDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKC41LCAuNSwgLjUpO3RyYW5zZm9ybTpzY2FsZTNkKC41LCAuNSwgLjUpfTIwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKDEuMSwgMS4xLCAxLjEpO3RyYW5zZm9ybTpzY2FsZTNkKDEuMSwgMS4xLCAxLjEpfTQwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKC45LCAuOSwgLjkpO3RyYW5zZm9ybTpzY2FsZTNkKC45LCAuOSwgLjkpfTYwJXtvcGFjaXR5OjE7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCgxLjAzLCAxLjAzLCAxLjAzKTt0cmFuc2Zvcm06c2NhbGUzZCgxLjAzLCAxLjAzLCAxLjAzKX04MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCguOTcsIC45NywgLjk3KTt0cmFuc2Zvcm06c2NhbGUzZCguOTcsIC45NywgLjk3KX10b3tvcGFjaXR5OjE7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCgxLCAxLCAxKTt0cmFuc2Zvcm06c2NhbGUzZCgxLCAxLCAxKX19QGtleWZyYW1lcyBib3VuY2VJbntmcm9tLDIwJSw0MCUsNjAlLDgwJSx0b3std2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246Y3ViaWMtYmV6aWVyKC4yMTUsIC42MSwgLjM1NSwgMSk7YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoLjIxNSwgLjYxLCAuMzU1LCAxKX0wJXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCguMywgLjMsIC4zKTt0cmFuc2Zvcm06c2NhbGUzZCguMywgLjMsIC4zKX0yMCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCgxLjEsIDEuMSwgMS4xKTt0cmFuc2Zvcm06c2NhbGUzZCgxLjEsIDEuMSwgMS4xKX00MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCguOSwgLjksIC45KTt0cmFuc2Zvcm06c2NhbGUzZCguOSwgLjksIC45KX02MCV7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoMS4wMywgMS4wMywgMS4wMyk7dHJhbnNmb3JtOnNjYWxlM2QoMS4wMywgMS4wMywgMS4wMyl9ODAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoLjk3LCAuOTcsIC45Nyk7dHJhbnNmb3JtOnNjYWxlM2QoLjk3LCAuOTcsIC45Nyl9dG97b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoMSwgMSwgMSk7dHJhbnNmb3JtOnNjYWxlM2QoMSwgMSwgMSl9fS5vdnAtcGxheWVyIC5ib3VuY2VJbnstd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjouNzVzO2FuaW1hdGlvbi1kdXJhdGlvbjouNzVzOy13ZWJraXQtYW5pbWF0aW9uLW5hbWU6Ym91bmNlSW47YW5pbWF0aW9uLW5hbWU6Ym91bmNlSW59QC13ZWJraXQta2V5ZnJhbWVzIGZhZGVJbntmcm9te29wYWNpdHk6MH10b3tvcGFjaXR5OjF9fUBrZXlmcmFtZXMgZmFkZUlue2Zyb217b3BhY2l0eTowfXRve29wYWNpdHk6MX19Lm92cC1wbGF5ZXIgLmZhZGVJbnstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmZhZGVJbjthbmltYXRpb24tbmFtZTpmYWRlSW59Lm92cC1wbGF5ZXIgLmFuaW1hdGVkey13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOjFzO2FuaW1hdGlvbi1kdXJhdGlvbjoxczstd2Via2l0LWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDthbmltYXRpb24tZmlsbC1tb2RlOmJvdGh9QG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uKXsub3ZwLXBsYXllciAuYW5pbWF0ZWR7LXdlYmtpdC1hbmltYXRpb246dW5zZXQgIWltcG9ydGFudDthbmltYXRpb246dW5zZXQgIWltcG9ydGFudDstd2Via2l0LXRyYW5zaXRpb246bm9uZSAhaW1wb3J0YW50O3RyYW5zaXRpb246bm9uZSAhaW1wb3J0YW50fX0ub3ZwLWNhcHRpb24tdmlld2Vye3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5vdnAtY2FwdGlvbi12aWV3ZXIgLm92cC1jYXB0aW9uLXRleHQtY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTo2MHB4O3dpZHRoOjEwMCU7cGFkZGluZzowIDEycHg7dGV4dC1hbGlnbjpjZW50ZXI7LW1vei10cmFuc2l0aW9uOmJvdHRvbSAuMjVzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7LXdlYmtpdC10cmFuc2l0aW9uOmJvdHRvbSAuMjVzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7dHJhbnNpdGlvbjpib3R0b20gLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpfS5vdnAtY2FwdGlvbi12aWV3ZXIgLm92cC1jYXB0aW9uLXRleHQtY29udGFpbmVyIC5vdnAtY2FwdGlvbi10ZXh0e2Rpc3BsYXk6bm9uZTtmb250LXNpemU6MjIwJTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoOCw4LDgsMC43NSk7Ym9yZGVyLXJhZGl1czozcHg7Y29sb3I6I2ZmZjtwYWRkaW5nOi4xZW0gLjNlbTt3b3JkLXdyYXA6YnJlYWstd29yZDtsaW5lLWhlaWdodDoxLjVlbTt1c2VyLXNlbGVjdDpub25lfS5vdnAtY2FwdGlvbi1idXR0b257d2lkdGg6MzZweH0ub3ZwLWNhcHRpb24tYnV0dG9uPml7Zm9udC1zaXplOjE4cHg7LW1vei10cmFuc2l0aW9uOmNvbG9yIC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTstd2Via2l0LXRyYW5zaXRpb246Y29sb3IgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpO3RyYW5zaXRpb246Y29sb3IgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpfS5vdnAtY2FwdGlvbi1hY3RpdmUgLm92cC1jYXB0aW9uLWJ1dHRvbj5pe2NvbG9yOiNGMzY0NDZ9XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlc2NhcGUodXJsKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB1cmxcbiAgICB9XG4gICAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gICAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gICAgfVxuICAgIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICAgIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSkge1xuICAgICAgICByZXR1cm4gJ1wiJyArIHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpICsgJ1wiJ1xuICAgIH1cblxuICAgIHJldHVybiB1cmxcbn1cbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCIvKiBnbG9iYWxzIF9fd2VicGFja19hbWRfb3B0aW9uc19fICovXHJcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwib3ZlbnBsYXllci9jc3MvMWE4MjU0ZTk1M2Q0ODMwNzFmMjM3NDc3NGU2YThiZWUuc3ZnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIm92ZW5wbGF5ZXIvY3NzL2IzYzdhNWU1MGE4NGQ4NjM3NWY0OWY0Y2M1MTBkMzNjLnN2Z1wiOyIsIm1vZHVsZS5leHBvcnRzID0gXCJvdmVucGxheWVyL2Nzcy9kYzI3OGU3ZTVjOGExNzJlNWU3ZjM0NTk1NmJkYmFkYS5zdmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwib3ZlbnBsYXllci9jc3MvMjAxMTFiZDIzYmQzMzYyMzExODdjNmZlNzI5ZmRjNTMuc3ZnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIm92ZW5wbGF5ZXIvY3NzLzgyNGY3YWZiMDM4OThkODg4ZDlmZDM5ZGRkYTQ5NGUwLnN2Z1wiOyIsIm1vZHVsZS5leHBvcnRzID0gXCJvdmVucGxheWVyL2Nzcy9iZDRhOGJlYjNjYTQ4Njk0MThkM2FmNThlMDhhNjliMS5zdmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwib3ZlbnBsYXllci9jc3MvYWMxZTUyZjliMzg2YThhNDlmMmY2ZDk5ZjJiZjI4YWMuc3ZnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIm92ZW5wbGF5ZXIvY3NzLzkxOGNhNmVmYTE4ZTIwZTg1ZGViOGVlODJmYzM5OTY3LnN2Z1wiOyIsIm1vZHVsZS5leHBvcnRzID0gXCJvdmVucGxheWVyL2Nzcy9jMTk2OTE2YWU5MTcwOWI5ODU3NjczZDQ0NWNjMjUxNC5zdmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwib3ZlbnBsYXllci9jc3MvYWQzNTZkNjJhZjY0NzJkMTY3YTUzODgwZjc2YTgxYmYuc3ZnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIm92ZW5wbGF5ZXIvY3NzLzZiMTJiMzhkYWEzMmVlZGMxMDYwM2RiM2FhNDZkZWVhLnN2Z1wiOyIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNS0yIS4vb3ZlbnBsYXllci5sZXNzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNS0yIS4vb3ZlbnBsYXllci5sZXNzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTUtMiEuL292ZW5wbGF5ZXIubGVzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIi8vaW1wb3J0IENhcHRpb25NYW5hZ2VyIGZyb20gXCJhcGkvY2FwdGlvbi9NYW5hZ2VyXCI7XG5pbXBvcnQgQ29uZmlndXJhdG9yIGZyb20gXCJhcGkvQ29uZmlndXJhdG9yXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgTGF6eUNvbW1hbmRFeGVjdXRvciBmcm9tIFwiYXBpL0xhenlDb21tYW5kRXhlY3V0b3JcIjtcbmltcG9ydCBMb2dNYW5hZ2VyIGZyb20gXCJ1dGlscy9sb2dnZXJcIjtcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XG5pbXBvcnQgUGxheWxpc3RNYW5hZ2VyIGZyb20gXCJhcGkvcGxheWxpc3QvTWFuYWdlclwiO1xuaW1wb3J0IFByb3ZpZGVyQ29udHJvbGxlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCBQcm9taXNlLCB7cmVzb2x2ZWR9IGZyb20gXCJhcGkvc2hpbXMvcHJvbWlzZVwiO1xuaW1wb3J0IHtSRUFEWSwgRVJST1IsIElOSVRfRVJST1IsIERFU1RST1ksIE5FVFdPUktfVU5TVEFCTEVELCBQTEFZRVJfRklMRV9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAndmVyc2lvbic7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBvYmplY3QgY29ubmVjdHMgVUkgdG8gdGhlIHByb3ZpZGVyLlxuICogQHBhcmFtICAge29iamVjdH0gICAgY29udGFpbmVyICBkb20gZWxlbWVudFxuICpcbiAqICovXG5cbmNvbnN0IEFwaSA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XG4gICAgbGV0IGxvZ01hbmFnZXIgPSBMb2dNYW5hZ2VyKCk7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltbT3ZlblBsYXllcl1dIHYuXCIrIHZlcnNpb24pO1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSBsb2FkZWQuXCIpO1xuICAgIC8vbGV0IGNhcHRpb25NYW5hZ2VyID0gQ2FwdGlvbk1hbmFnZXIodGhhdCk7XG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIpO1xuICAgIGxldCBwbGF5bGlzdE1hbmFnZXIgPSBQbGF5bGlzdE1hbmFnZXIoKTtcbiAgICBsZXQgcHJvdmlkZXJDb250cm9sbGVyID0gUHJvdmlkZXJDb250cm9sbGVyKCk7XG4gICAgbGV0IGN1cnJlbnRQcm92aWRlciA9IFwiXCI7XG4gICAgbGV0IHBsYXllckNvbmZpZyA9IFwiXCI7XG4gICAgbGV0IGxhenlRdWV1ZSA9IFwiXCI7XG5cbiAgICBjb25zdCBpbml0UHJvdmlkZXIgPSBmdW5jdGlvbihsYXN0UGxheVBvc2l0aW9uKXtcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHlGcm9tU291cmNlID0gKHNvdXJjZXMpID0+e1xuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSAwO1xuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBxdWFsaXR5O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBwcm92aWRlckNvbnRyb2xsZXIubG9hZFByb3ZpZGVycyhwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB2aWRlb0VsZW1lbnQgPSBtZWRpYU1hbmFnZXIuY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tRdWFsaXR5RnJvbVNvdXJjZShwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImN1cnJlbnQgc291cmNlIGluZGV4IDogXCIrIGN1cnJlbnRTb3VyY2VJbmRleCk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IFByb3ZpZGVyc1tjdXJyZW50U291cmNlSW5kZXhdKHZpZGVvRWxlbWVudCwgcGxheWVyQ29uZmlnKTtcblxuICAgICAgICAgICAgLy9UaGlzIHBhc3NlcyB0aGUgZXZlbnQgY3JlYXRlZCBieSB0aGUgUHJvdmlkZXIgdG8gQVBJLlxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLm9uKFwiYWxsXCIsIGZ1bmN0aW9uKG5hbWUsIGRhdGEpe1xuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihuYW1lLCBkYXRhKTtcblxuICAgICAgICAgICAgICAgIC8vQXV0byBuZXh0IHNvdXJjZSB3aGVuIHBsYXllciBsb2FkIHdhcyBmYWlsIGJ5IGFtaXNzIHNvdXJjZS5cbiAgICAgICAgICAgICAgICBpZiggKG5hbWUgPT09IEVSUk9SICYmIChkYXRhLmNvZGUgPT09IFBMQVlFUl9GSUxFX0VSUk9SIHx8IHBhcnNlSW50KGRhdGEuY29kZS8xMDApID09PSA1KSlcbiAgICAgICAgICAgICAgICAgICAgfHwgbmFtZSA9PT0gTkVUV09SS19VTlNUQUJMRUQgKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRRdWFsaXR5ID0gdGhhdC5nZXRDdXJyZW50UXVhbGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICBpZihjdXJyZW50UXVhbGl0eSsxIDwgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzKCkubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBzZXF1ZW50aWFsIGhhcyBhdmFpbGFibGUgc291cmNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eShjdXJyZW50UXVhbGl0eSsxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KS50aGVuKCgpPT57XG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIucHJlbG9hZChwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSwgbGFzdFBsYXlQb3NpdGlvbiApO1xuXG4gICAgICAgICAgICBsYXp5UXVldWUuZmx1c2goKTtcbiAgICAgICAgICAgIC8vVGhpcyBpcyBubyByZWFzb24gdG8gZXhpc3QgYW55bW9yZS5cbiAgICAgICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihSRUFEWSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JPYmplY3QgPSB7Y29kZSA6IElOSVRfRVJST1IsIHJlYXNvbiA6IFwiaW5pdCBlcnJvci5cIiwgbWVzc2FnZSA6IFwiUGxheWVyIGluaXQgZXJyb3IuXCIsIGVycm9yIDogZXJyb3J9O1xuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBlcnJvck9iamVjdCk7XG5cbiAgICAgICAgICAgIC8veHh4IDogSWYgeW91IGluaXQgZW1wdHkgc291cmNlcy4gKEkgdGhpbmsgdGhpcyBpcyBzdHJhbmdlIGNhc2UuKVxuICAgICAgICAgICAgLy9UaGlzIHdvcmtzIGZvciB0aGlzIGNhc2UuXG4gICAgICAgICAgICAvL3BsYXllciA9IE92ZW5QbGF5ZXIuY3JlYXRlKFwiZWxJZFwiLCB7fSk7XG4gICAgICAgICAgICAvL3BsYXllci5sb2FkKHNvcnVjZXMpO1xuICAgICAgICAgICAgbGF6eVF1ZXVlLnJlbW92ZUFuZEV4Y3V0ZU9uY2UoXCJsb2FkXCIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBBUEkg7LSI6riw7ZmUIO2VqOyImFxuICAgICAqIGluaXRcbiAgICAgKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zIHBsYXllciBpbml0aWFsIG9wdGlvbiB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuc1xuICAgICAqKi9cbiAgICB0aGF0LmluaXQgPSAob3B0aW9ucykgPT57XG4gICAgICAgIC8vSXQgY29sbGVjdHMgdGhlIGNvbW1hbmRzIGFuZCBleGVjdXRlcyB0aGVtIGF0IHRoZSB0aW1lIHdoZW4gdGhleSBhcmUgZXhlY3V0YWJsZS5cbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ2xvYWQnLCdwbGF5JywncGF1c2UnLCdzZWVrJywnc3RvcCcsICdnZXREdXJhdGlvbicsICdnZXRQb3NpdGlvbicsICdnZXRWb2x1bWUnLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnXSk7XG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zKTtcbiAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0RlYnVnKCkpe1xuICAgICAgICAgICAgbG9nTWFuYWdlci5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpXCIpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XG5cbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldFBsYXlsaXN0KHBsYXllckNvbmZpZy5nZXRQbGF5bGlzdCgpKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHNvdXJjZXMgOiBcIiAsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q29uZmlnKClcIiwgcGxheWVyQ29uZmlnLmdldENvbmZpZygpKTtcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRDb25maWcoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RHVyYXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBvc2l0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Vm9sdW1lKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRWb2x1bWUoKSBcIiArIHZvbHVtZSk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRWb2x1bWUodm9sdW1lKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRNdXRlKCkgXCIgKyBzdGF0ZSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0TXV0ZShzdGF0ZSk7XG4gICAgfTtcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldE11dGUoKSBcIiArIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChwbGF5bGlzdCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcblxuICAgICAgICBpZihwbGF5bGlzdCl7XG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkoMCk7XG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0UGxheWxpc3QocGxheWxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcblxuICAgIH07XG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwbGF5KCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGxheSgpO1xuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2VlaygpIFwiKyBwb3NpdGlvbik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZWVrKHBvc2l0aW9uKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFBsYXliYWNrUmF0ZSgpIFwiLCBwbGF5YmFja1JhdGUpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldFBsYXliYWNrUmF0ZShwbGF5ZXJDb25maWcuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZShwbGF5YmFja1JhdGUpKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXliYWNrUmF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFF1YWxpdHlMZXZlbHMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgcXVhbGl0eUluZGV4KTtcblxuICAgICAgICBsZXQgc291cmNlcyA9IHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpO1xuICAgICAgICBsZXQgY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbdGhhdC5nZXRDdXJyZW50UXVhbGl0eSgpXTtcbiAgICAgICAgbGV0IG5ld1NvdXJjZSA9IHNvdXJjZXNbcXVhbGl0eUluZGV4XTtcbiAgICAgICAgbGV0IGxhc3RQbGF5UG9zaXRpb24gPSB0aGF0LmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGxldCBpc1NhbWVQcm92aWRlciA9IHByb3ZpZGVyQ29udHJvbGxlci5pc1NhbWVQcm92aWRlcihjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpO1xuICAgICAgICAvLyBwcm92aWRlci5zZXJDdXJyZW50UXVhbGl0eSAtPiBwbGF5ZXJDb25maWcgc2V0dGluZyAtPiBsb2FkXG4gICAgICAgIGxldCByZXNRdWFsaXR5SW5kZXggPSBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkocXVhbGl0eUluZGV4LCBpc1NhbWVQcm92aWRlcik7XG5cbiAgICAgICAgaWYoIW5ld1NvdXJjZSl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgaXNTYW1lUHJvdmlkZXJcIiwgaXNTYW1lUHJvdmlkZXIpO1xuXG4gICAgICAgIGlmKCFpc1NhbWVQcm92aWRlcil7XG4gICAgICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheSddKTtcbiAgICAgICAgICAgIGluaXRQcm92aWRlcihsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNRdWFsaXR5SW5kZXg7XG4gICAgfTtcblxuICAgIC8qIENhcHRpb25zIDogVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IHZlcnNpb24uKi9cbiAgICAvKnRoYXQuc2V0Q3VycmVudENhcHRpb24gPSAoaW5kZXgpID0+e1xuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuc2V0Q3VycmVudENhcHRpb24oaW5kZXgpO1xuICAgIH1cbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT57XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpO1xuICAgIH1cbiAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKTtcbiAgICB9XG4gICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PiB7XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5hZGRDYXB0aW9uKCk7XG4gICAgfVxuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xuICAgIH0qL1xuXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEJ1ZmZlcigpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCkpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTdGF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKTtcbiAgICB9O1xuICAgIHRoYXQuc3RvcCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc3RvcCgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnN0b3AoKTtcbiAgICB9O1xuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSBcIik7XG4gICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XG4gICAgICAgIHByb3ZpZGVyQ29udHJvbGxlciA9IG51bGw7XG4gICAgICAgIHBsYXlsaXN0TWFuYWdlciA9IG51bGw7XG4gICAgICAgIHBsYXllckNvbmZpZyA9IG51bGw7XG5cbiAgICAgICAgdGhhdC50cmlnZ2VyKERFU1RST1kpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIC0gbGF6eVF1ZXVlLCBjdXJyZW50UHJvdmlkZXIsIHByb3ZpZGVyQ29udHJvbGxlciwgcGxheWxpc3RNYW5hZ2VyLCBwbGF5ZXJDb25maWcsIGFwaSBldmVudCBkZXN0cm9lZC4gXCIpO1xuICAgICAgICBsb2dNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgQXBpO1xuXG5cbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBpbml0aWFsaXplcyB0aGUgaW5wdXQgb3B0aW9ucy5cbiAqIEBwYXJhbSAgIG9wdGlvbnNcbiAqXG4gKiAqL1xuY29uc3QgQ29uZmlndXJhdG9yID0gZnVuY3Rpb24ob3B0aW9ucyl7XG5cbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgICAgICBjb25zdCBEZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGRlZmF1bHRQbGF5YmFja1JhdGU6IDEsXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVDb250cm9sczogZmFsc2UsXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzOiBbMC4yNSwgMC41LCAxLCAxLjUsIDJdLFxuICAgICAgICAgICAgbXV0ZTogZmFsc2UsXG4gICAgICAgICAgICB2b2x1bWU6IDkwLFxuICAgICAgICAgICAgd2lkdGg6IDY0MCxcbiAgICAgICAgICAgIGhlaWdodDogMzYwXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJjYXNlVmFsID0gdmFsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIodmFsKSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2lkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHNlcmlhbGl6ZShvcHRpb25zW2tleV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9ybWFsaXplU2l6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwuc2xpY2UgJiYgdmFsLnNsaWNlKC0yKSA9PT0gJ3B4Jykge1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbC5zbGljZSgwLCAtMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGV2YWx1YXRlQXNwZWN0UmF0aW8gPSBmdW5jdGlvbiAoYXIsIHdpZHRoKSB7XG4gICAgICAgICAgICBpZiAod2lkdGgudG9TdHJpbmcoKS5pbmRleE9mKCclJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyICE9PSAnc3RyaW5nJyB8fCAhYXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgvXlxcZCpcXC4/XFxkKyUkLy50ZXN0KGFyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYXIuaW5kZXhPZignOicpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdyA9IHBhcnNlRmxvYXQoYXIuc3Vic3RyKDAsIGluZGV4KSk7XG4gICAgICAgICAgICBjb25zdCBoID0gcGFyc2VGbG9hdChhci5zdWJzdHIoaW5kZXggKyAxKSk7XG4gICAgICAgICAgICBpZiAodyA8PSAwIHx8IGggPD0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChoIC8gdyAqIDEwMCkgKyAnJSc7XG4gICAgICAgIH1cbiAgICAgICAgZGVzZXJpYWxpemUob3B0aW9ucyk7XG4gICAgICAgIGxldCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgICAgIGNvbmZpZy53aWR0aCA9IG5vcm1hbGl6ZVNpemUoY29uZmlnLndpZHRoKTtcbiAgICAgICAgY29uZmlnLmhlaWdodCA9IG5vcm1hbGl6ZVNpemUoY29uZmlnLmhlaWdodCk7XG4gICAgICAgIGNvbmZpZy5hc3BlY3RyYXRpbyA9IGV2YWx1YXRlQXNwZWN0UmF0aW8oY29uZmlnLmFzcGVjdHJhdGlvLCBjb25maWcud2lkdGgpO1xuXG4gICAgICAgIGxldCByYXRlQ29udHJvbHMgPSBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHM7XG4gICAgICAgIGlmIChyYXRlQ29udHJvbHMpIHtcbiAgICAgICAgICAgIGxldCByYXRlcyA9IGNvbmZpZy5wbGF5YmFja1JhdGVzO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyYXRlQ29udHJvbHMpKSB7XG4gICAgICAgICAgICAgICAgcmF0ZXMgPSByYXRlQ29udHJvbHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYXRlcyA9IHJhdGVzLmZpbHRlcihyYXRlID0+IF8uaXNOdW1iZXIocmF0ZSkgJiYgcmF0ZSA+PSAwLjI1ICYmIHJhdGUgPD0gNClcbiAgICAgICAgICAgICAgICAubWFwKHJhdGUgPT4gTWF0aC5yb3VuZChyYXRlICogNCkgLyA0KTtcblxuICAgICAgICAgICAgaWYgKHJhdGVzLmluZGV4T2YoMSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgcmF0ZXMucHVzaCgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJhdGVzLnNvcnQoKTtcblxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGVzID0gcmF0ZXM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICghY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzIHx8IGNvbmZpZy5wbGF5YmFja1JhdGVzLmluZGV4T2YoY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUpIDwgMCkge1xuICAgICAgICAgICAgY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZSA9IGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlO1xuXG4gICAgICAgIGlmICghY29uZmlnLmFzcGVjdHJhdGlvKSB7XG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLmFzcGVjdHJhdGlvO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29uZmlnUGxheWxpc3QgPSBjb25maWcucGxheWxpc3Q7XG4gICAgICAgIGlmICghY29uZmlnUGxheWxpc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IF8ucGljayhjb25maWcsIFtcbiAgICAgICAgICAgICAgICAndGl0bGUnLFxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgJ3R5cGUnLFxuICAgICAgICAgICAgICAgICdtZWRpYWlkJyxcbiAgICAgICAgICAgICAgICAnaW1hZ2UnLFxuICAgICAgICAgICAgICAgICdmaWxlJyxcbiAgICAgICAgICAgICAgICAnc291cmNlcycsXG4gICAgICAgICAgICAgICAgJ3RyYWNrcycsXG4gICAgICAgICAgICAgICAgJ3ByZWxvYWQnLFxuICAgICAgICAgICAgICAgICdkdXJhdGlvbicsXG4gICAgICAgICAgICAgICAgJ2hvc3QnLFxuICAgICAgICAgICAgICAgICdhcHBsaWNhdGlvbicsXG4gICAgICAgICAgICAgICAgJ3N0cmVhbSdcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBbIG9iaiBdO1xuICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShjb25maWdQbGF5bGlzdC5wbGF5bGlzdCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5mZWVkRGF0YSA9IGNvbmZpZ1BsYXlsaXN0O1xuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gY29uZmlnUGxheWxpc3QucGxheWxpc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgY29uZmlnLmR1cmF0aW9uO1xuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH07XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ29uZmlndXJhdG9yIGxvYWRlZC5cIiwgb3B0aW9ucyk7XG4gICAgbGV0IGNvbmZpZyA9IGNvbXBvc2VTb3VyY2VPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgbGV0IGFzcGVjdHJhdGlvID0gY29uZmlnLmFzcGVjdHJhdGlvIHx8IFwiMTY6OVwiO1xuICAgIGxldCBkZWJ1ZyA9IGNvbmZpZy5kZWJ1ZztcbiAgICBsZXQgZGVmYXVsdFBsYXliYWNrUmF0ZSA9IGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlIHx8IDE7XG4gICAgbGV0IGltYWdlID0gY29uZmlnLmltYWdlO1xuICAgIGxldCBwbGF5YmFja1JhdGVDb250cm9scyA9IGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyB8fCB0cnVlO1xuICAgIGxldCBwbGF5YmFja1JhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXMgfHwgWzAuNSwgMSwgMS4yNSwgMS41LCAyXTtcbiAgICBsZXQgcGxheWxpc3QgPSBjb25maWcucGxheWxpc3QgfHwgW107XG4gICAgbGV0IHF1YWxpdHlMYWJlbCA9IGNvbmZpZy5xdWFsaXR5TGFiZWwgfHwgXCJcIjtcbiAgICBsZXQgcmVwZWF0ID0gY29uZmlnLnJlcGVhdCB8fCBmYWxzZTtcbiAgICBsZXQgc3RyZXRjaGluZyA9IGNvbmZpZy5zdHJldGNoaW5nIHx8ICd1bmlmb3JtJztcblxuXG5cbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7cmV0dXJuIGNvbmZpZzt9O1xuXG4gICAgdGhhdC5nZXRBc3BlY3RyYXRpbyA9KCk9PntyZXR1cm4gYXNwZWN0cmF0aW87fTtcbiAgICB0aGF0LnNldEFzcGVjdHJhdGlvID0oYXNwZWN0cmF0aW9fKT0+e2FzcGVjdHJhdGlvID0gYXNwZWN0cmF0aW9fO307XG5cbiAgICB0aGF0LmlzRGVidWcgPSgpPT57cmV0dXJuIGRlYnVnO307XG5cbiAgICB0aGF0LmdldERlZmF1bHRQbGF5YmFja1JhdGUgPSgpPT57cmV0dXJuIGRlZmF1bHRQbGF5YmFja1JhdGU7fTtcbiAgICB0aGF0LnNldERlZmF1bHRQbGF5YmFja1JhdGUgPShwbGF5YmFja1JhdGUpPT57ZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTsgcmV0dXJuIHBsYXliYWNrUmF0ZTt9O1xuXG4gICAgdGhhdC5nZXRRdWFsaXR5TGFiZWwgPSAoKSA9PiB7cmV0dXJuIHF1YWxpdHlMYWJlbDt9O1xuICAgIHRoYXQuc2V0UXVhbGl0eUxhYmVsID0gKG5ld0xhYmVsKSA9PiB7cXVhbGl0eUxhYmVsID0gbmV3TGFiZWw7fTtcblxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlcyA9KCk9PntyZXR1cm4gcGxheWJhY2tSYXRlczt9O1xuICAgIHRoYXQuaXNQbGF5YmFja1JhdGVDb250cm9scyA9KCk9PntyZXR1cm4gcGxheWJhY2tSYXRlQ29udHJvbHM7fTtcblxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSgpPT57cmV0dXJuIHBsYXlsaXN0O307XG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0XyApPT57XG4gICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdF8pKXtcbiAgICAgICAgICAgIHBsYXlsaXN0ID0gcGxheWxpc3RfO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHBsYXlsaXN0ID0gW3BsYXlsaXN0X107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0O1xuICAgIH07XG5cbiAgICB0aGF0LmlzUmVwZWF0ID0oKT0+e3JldHVybiByZXBlYXQ7fTtcblxuICAgIHRoYXQuZ2V0U3RyZXRjaGluZyA9KCk9PntyZXR1cm4gc3RyZXRjaGluZzt9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb25maWd1cmF0b3I7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAzLi5cbiAqL1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbW9kdWxlIHByb3ZpZGUgY3VzdG9tIGV2ZW50cy5cbiAqIEBwYXJhbSAgIG9iamVjdCAgICBBbiBvYmplY3QgdGhhdCByZXF1aXJlcyBjdXN0b20gZXZlbnRzLlxuICpcbiAqICovXG5cbmNvbnN0IEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgbGV0IHRoYXQgPSBvYmplY3Q7XG4gICAgbGV0IF9ldmVudHMgPVtdO1xuXG4gICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgY29udGV4dCl7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGxlbmd0aCA9IGV2ZW50cy5sZW5ndGg7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICBldmVudC5saXN0ZW5lci5hcHBseSggKCBldmVudC5jb250ZXh0IHx8IGNvbnRleHQgKSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgKF9ldmVudHNbbmFtZV0gfHwgKF9ldmVudHNbbmFtZV09W10pICkucHVzaCh7IGxpc3RlbmVyOiBsaXN0ZW5lciAgLCBjb250ZXh0IDogY29udGV4dH0pO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgY29uc3QgYWxsRXZlbnRzID0gX2V2ZW50cy5hbGw7XG5cbiAgICAgICAgaWYoZXZlbnRzKXtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgICAgICBpZihhbGxFdmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cywgdGhhdCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5hbWUgJiYgIWxpc3RlbmVyICYmICFjb250ZXh0KSAge1xuICAgICAgICAgICAgX2V2ZW50cyA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyhfZXZlbnRzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0YWluID0gX2V2ZW50c1tuYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciAgfHwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChsaXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLmxpc3RlbmVyICAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIuX2NhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8KGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZlbnQuY29udGV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgdGhhdC5vbmNlID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBjb25zdCBvbmNlQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjb3VudCsrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5vZmYobmFtZSwgb25jZUNhbGxiYWNrKTtcbiAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIG9uY2VDYWxsYmFjay5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoYXQub24obmFtZSwgb25jZUNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlcjsiLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcbiAqICovXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XG4gICAgfVxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XG4gICAgfVxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICB9XG5cbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgIH07XG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxuICogQHBhcmFtXG4gKiAqL1xuXG5jb25zdCBTdXBwb3J0Q2hlY2tlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XG4gICAgY29uc3Qgc3VwcG9ydExpc3QgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1vdjogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXG4gICAgICAgICAgICAgICAgICAgIG9ndjogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHZvcmJpczogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1ODogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgICAgIGlmKCF0eXBlKXtyZXR1cm4gZmFsc2U7fVxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghbWltZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3dlYnJ0YycsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgICAgICAgICAgfSgpO1xuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgICAgICAvL21wZCBhcHBsaWNhdGlvbi9kYXNoK3htbFxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXNoKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnaGxzJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICB9KCk7XG5cbiAgICAgICAgICAgICAgICAvL3RoaXMgbWV0aG9kIGZyb20gaGxzLmpzXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRNZWRpYVNvdXJjZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXIgPSB3aW5kb3cuU291cmNlQnVmZmVyIHx8IHdpbmRvdy5XZWJLaXRTb3VyY2VCdWZmZXI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1R5cGVTdXBwb3J0ZWQgPSBtZWRpYVNvdXJjZSAmJiB0eXBlb2YgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkID09PSAnZnVuY3Rpb24nICYmIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSxtcDRhLjQwLjJcIicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIFNvdXJjZUJ1ZmZlciBpcyBleHBvc2VkIGVuc3VyZSBpdHMgQVBJIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgIC8vIHNhZmFyaSBhbmQgb2xkIHZlcnNpb24gb2YgQ2hyb21lIGRvZSBub3QgZXhwb3NlIFNvdXJjZUJ1ZmZlciBnbG9iYWxseSBzbyBjaGVja2luZyBTb3VyY2VCdWZmZXIucHJvdG90eXBlIGlzIGltcG9zc2libGVcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWlzVHlwZVN1cHBvcnRlZCAmJiAhIXNvdXJjZUJ1ZmZlclZhbGlkQVBJO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKSAmJiAhIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXTtcblxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlID0gKHNvcnVjZV8pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoKVwiLCBzb3J1Y2VfKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdXBwb3J0TGlzdC5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgaWYoc3VwcG9ydExpc3RbaV0uY2hlY2tTdXBwb3J0KHNvdXJjZSkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCA9IChwbGF5bGlzdF8pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QoKVwiLCBwbGF5bGlzdF8pO1xuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gcGxheWxpc3RfW2ldO1xuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XG4gICAgICAgICAgICAgICAgc291cmNlID0gaXRlbS5zb3VyY2VzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwcG9ydE5hbWVzO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjsiLCIvLyBTVEFURVxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9ICdidWZmZXJpbmcnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0lETEUgPSAnaWRsZSc7XG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSAnY29tcGxldGUnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9ICdwYXVzZWQnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1BMQVlJTkcgPSAncGxheWluZyc7XG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSAnZXJyb3InO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSAnbG9hZGluZyc7XG5leHBvcnQgY29uc3QgU1RBVEVfU1RBTExFRCA9ICdzdGFsbGVkJztcblxuLy8gUFJPVklERVJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9ICdodG1sNSc7XG5leHBvcnQgY29uc3QgUFJPVklERVJfV0VCUlRDID0gJ3dlYnJ0Yyc7XG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9ICdkYXNoJztcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9ITFMgPSAnaGxzJztcblxuLy8gRVZFTlRTXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xuZXhwb3J0IGNvbnN0IFJFQURZID0gJ3JlYWR5JztcbmV4cG9ydCBjb25zdCBERVNUUk9ZID0gJ2Rlc3Ryb3knO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9ICdzZWVrJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUl9GVUxMID0gJ2J1ZmZlckZ1bGwnO1xuZXhwb3J0IGNvbnN0IERJU1BMQVlfQ0xJQ0sgPSAnZGlzcGxheUNsaWNrJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9ICdsb2FkZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gJ3NlZWtlZCc7XG5leHBvcnQgY29uc3QgTkVUV09SS19VTlNUQUJMRUQgPSAndW5zdGFibGVOZXR3b3JrJztcbmV4cG9ydCBjb25zdCBFUlJPUiA9ICdlcnJvcic7XG5cbi8vIFNUQVRFIE9GIFBMQVlFUlxuZXhwb3J0IGNvbnN0IFBMQVlFUl9TVEFURSA9ICdzdGF0ZUNoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9QQVVTRSA9ICdwYXVzZSc7XG5leHBvcnQgY29uc3QgUExBWUVSX1BMQVkgPSAncGxheSc7XG5cbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9ICdidWZmZXJDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUUgPSAndGltZSc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9SQVRFX0NIQU5HRSA9ICdyYXRlY2hhbmdlJztcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9ICd2b2x1bWVDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX01VVEUgPSAnbXV0ZSc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9NRVRBID0gJ21ldGFDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMUyA9ICdxdWFsaXR5TGV2ZWxDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMX0NIQU5HRUQgPSAnY3VycmVudFF1YWxpdHlMZXZlbENoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCA9ICdwbGF5YmFja1JhdGVDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQgPSAnY3VlQ2hhbmdlZCc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQgPSAnY2FwdGlvbkNoYW5nZWQnO1xuXG5cbmV4cG9ydCBjb25zdCBJTklUX0VSUk9SID0gMTAwO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0VSUk9SID0gMzAwO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiA9IDMwMTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SID0gMzAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiA9IDMwMztcbmV4cG9ydCBjb25zdCBQTEFZRVJfRklMRV9FUlJPUiA9IDMwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ0FQVElPTl9FUlJPUiA9IDMwNTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SID0gNTAxO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfQ0xPU0VEID0gNTAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiA9IDUwMztcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiA9IDUwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDU7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiA9IDUwNjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyA9IDUxMDtcbiIsIi8qKlxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxuICogQHBhcmFtICAge2VsZW1lbnR9ICAgY29udGFpbmVyICAgZG9tIGVsZW1lbnRcbiAqXG4gKiAqL1xuXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IG1lZGlhRWxlbWVudCA9IFwiXCI7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGxvYWRlZC5cIik7XG4gICAgY29uc3QgY3JlYXRlTWVkaWFFbGVtZW50ID0gZnVuY3Rpb24oKXtcblxuICAgICAgICBtZWRpYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlUmVtb3RlUGxheWJhY2snLCAnJyk7XG4gICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dlYmtpdC1wbGF5c2lubGluZScsICcnKTtcbiAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAnJyk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBtZWRpYUVsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQuY3JlYXRlRWxlbWVudCA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgY3JlYXRlRWxlbWVudCgpXCIpO1xuICAgICAgICBpZighbWVkaWFFbGVtZW50KXtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQobWVkaWFFbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7IiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcbmltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9uICx0cmltfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3RyaW5nc1wiO1xuaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCIuLi9TdXBwb3J0Q2hlY2tlclwiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBQbGF5bGlzdCBvciBTb3VyY2VzLlxuICogQHBhcmFtXG4gKlxuICogKi9cbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgY3VycmVudFBsYXlsaXN0ID0gW107XG4gICAgbGV0IHN1cHBvcnRDaGVja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgbWFrZVByZXR0eVNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZV8pe1xuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIHsgJ2RlZmF1bHQnOiBmYWxzZSB9LCBzb3VyY2VfKTtcbiAgICAgICAgc291cmNlLmZpbGUgPSB0cmltKCcnICsgc291cmNlLmZpbGUpO1xuXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcbiAgICAgICAgICAgIHNvdXJjZS5maWxlID0gc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL3N0cmVhbS9cIiArIHNvdXJjZS5zdHJlYW07XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmFwcGxpY2F0aW9uO1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5zdHJlYW07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtaW1ldHlwZVJlZ0V4ID0gL15bXi9dK1xcLyg/OngtKT8oW14vXSspJC87XG5cbiAgICAgICAgaWYgKG1pbWV0eXBlUmVnRXgudGVzdChzb3VyY2UudHlwZSkpIHtcbiAgICAgICAgICAgIC8vIGlmIHR5cGUgaXMgZ2l2ZW4gYXMgYSBtaW1ldHlwZVxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IHNvdXJjZS50eXBlLnJlcGxhY2UobWltZXR5cGVSZWdFeCwgJyQxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihpc1J0bXAoc291cmNlLmZpbGUpKXtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICB9ZWxzZSBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnd2VicnRjJztcbiAgICAgICAgfWVsc2UgaWYoaXNEYXNoKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnZGFzaCc7XG4gICAgICAgIH1lbHNlIGlmICghc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gZXh0cmFjdEV4dGVuc2lvbihzb3VyY2UuZmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3JtYWxpemUgdHlwZXNcbiAgICAgICAgc3dpdGNoIChzb3VyY2UudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XG4gICAgICAgICAgICBjYXNlICd2bmQuYXBwbGUubXBlZ3VybCc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnaGxzJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ200YSc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnYWFjJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NtaWwnOlxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBpZiAoc291cmNlW2tleV0gPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc291cmNlO1xuXG4gICAgfVxuXG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0KSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIHNldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgY29uc3QgcHJldHRpZWRQbGF5bGlzdCA9IChfLmlzQXJyYXkocGxheWxpc3QpID8gcGxheWxpc3QgOiBbcGxheWxpc3RdKS5tYXAoZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICBpZighXy5pc0FycmF5KGl0ZW0udHJhY2tzKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwbGF5bGlzdEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LHtcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgICAgICB0cmFja3M6IFtdXG4gICAgICAgICAgICB9LCBpdGVtICk7XG5cbiAgICAgICAgICAgIGlmKChwbGF5bGlzdEl0ZW0uc291cmNlcyA9PT0gT2JqZWN0KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkgJiYgIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykpIHtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IGl0ZW0ubGV2ZWxzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eVNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc291cmNlIGRvZXNuJ3QgaGF2ZSBhIGxhYmVsLCBudW1iZXIgaXRcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0udHlwZStcIi1cIitpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJldHR5U291cmNlID0gbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSk7XG4gICAgICAgICAgICAgICAgaWYoc3VwcG9ydENoZWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHByZXR0eVNvdXJjZSkpe1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IHByZXR0eVNvdXJjZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBwbGF5bGlzdEl0ZW0uc291cmNlcy5maWx0ZXIoc291cmNlID0+ICEhc291cmNlKTtcblxuICAgICAgICAgICAgLy8gZGVmYXVsdCDqsIAg7JeG7J2E65WMIHdlYnJ0Y+qwgCDsnojri6TrqbQgd2VicnRjIGRlZmF1bHQgOiB0cnVl66GcIOyekOuPmSDshKTsoJVcbiAgICAgICAgICAgIC8qbGV0IGhhdmVEZWZhdWx0ID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UuZGVmYXVsdCA9PSB0cnVlO30pO1xuICAgICAgICAgICAgbGV0IHdlYnJ0Y1NvdXJjZSA9IFtdO1xuICAgICAgICAgICAgaWYoIWhhdmVEZWZhdWx0KXtcbiAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS50eXBlID09IFwid2VicnRjXCI7fSk7XG4gICAgICAgICAgICAgICAgaWYod2VicnRjU291cmNlKXtcbiAgICAgICAgICAgICAgICAgICAgd2VicnRjU291cmNlLmRlZmF1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0qL1xuXG5cblxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0udHJhY2tzKSl7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5jYXB0aW9ucykpe1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLmNvbmNhdChwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBwbGF5bGlzdEl0ZW0uY2FwdGlvbnM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLm1hcChmdW5jdGlvbih0cmFjayl7XG4gICAgICAgICAgICAgICAgaWYoIXRyYWNrIHx8ICF0cmFjay5maWxlKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICAgICAgICAgICAgICAna2luZCc6ICdjYXB0aW9ucycsXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0JzogZmFsc2VcbiAgICAgICAgICAgICAgICB9LCB0cmFjayk7XG4gICAgICAgICAgICB9KS5maWx0ZXIodHJhY2sgPT4gISF0cmFjayk7XG5cbiAgICAgICAgICAgIHJldHVybiBwbGF5bGlzdEl0ZW07XG4gICAgICAgIH0pO1xuICAgICAgICBjdXJyZW50UGxheWxpc3QgPSBwcmV0dGllZFBsYXlsaXN0O1xuICAgICAgICByZXR1cm4gcHJldHRpZWRQbGF5bGlzdDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRQbGF5bGlzdCgpIFwiLCBjdXJyZW50UGxheWxpc3QpO1xuICAgICAgICByZXR1cm4gY3VycmVudFBsYXlsaXN0O1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgLy9XZSBkbyBub3Qgc3VwcG9ydCBcIlBMQVlMSVNUXCIgbm90IHlldC4gU28gdGhpcyByZXR1cm5zIHBsYXlsaXN0IG9mIDAuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRDdXJyZW50U291cmNlcygpIFwiLCBjdXJyZW50UGxheWxpc3RbMF0uc291cmNlcyk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UGxheWxpc3RbMF0uc291cmNlcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XG4iLCJpbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcImFwaS9TdXBwb3J0Q2hlY2tlclwiO1xuaW1wb3J0IFByb21pc2UsIHtyZXNvbHZlZH0gZnJvbSBcImFwaS9zaGltcy9wcm9taXNlXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIHByb3ZpZGVyLlxuICogQHBhcmFtXG4gKiAqL1xuY29uc3QgQ29udHJvbGxlciA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IHN1cHBvcnRDaGFja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcbiAgICBjb25zdCBQcm92aWRlcnMgPSB7fTtcblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZGVkLlwiKTtcblxuICAgIGNvbnN0IHJlZ2lzdGVQcm92aWRlciA9IChuYW1lLCBwcm92aWRlcikgPT57XG4gICAgICAgIGlmKFByb3ZpZGVyc1tuYW1lXSl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcbiAgICAgICAgUHJvdmlkZXJzW25hbWVdID0gcHJvdmlkZXI7XG4gICAgfTtcblxuICAgIGNvbnN0IFByb3ZpZGVyTG9hZGVyID17XG4gICAgICAgIGh0bWw1OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9IdG1sNSddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L0h0bWw1JykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiaHRtbDVcIiwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5odG1sNSdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIHdlYnJ0YyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvd2VicnRjL1dlYlJUQyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL3dlYnJ0Yy9XZWJSVEMnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJ3ZWJydGNcIiwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGRhc2ggOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2Rhc2gvRGFzaCddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2Rhc2gvRGFzaCcpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIFByb3ZpZGVyc1tcImRhc2hcIl0gPSBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiZGFzaFwiLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGhscyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaGxzL0hscyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2hscy9IbHMnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJobHNcIiwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQubG9hZFByb3ZpZGVycyA9IChwbGF5bGlzdCkgPT57XG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QocGxheWxpc3QpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZFByb3ZpZGVycygpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcy5maWx0ZXIoZnVuY3Rpb24ocHJvdmlkZXJOYW1lKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdO1xuICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSBQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgdGhhdC5maW5kQnlOYW1lID0gKG5hbWUpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGZpbmRCeU5hbWUoKSBcIiwgbmFtZSk7XG4gICAgICAgIHJldHVybiBQcm92aWRlcnNbbmFtZV07XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UHJvdmlkZXJCeVNvdXJjZSA9IChzb3VyY2UpID0+IHtcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBnZXRQcm92aWRlckJ5U291cmNlKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XG4gICAgICAgIHJldHVybiB0aGF0LmZpbmRCeU5hbWUoc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcbiAgICB9O1xuXG4gICAgdGhhdC5pc1NhbWVQcm92aWRlciA9IChjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGlzU2FtZVByb3ZpZGVyKCkgXCIsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSAsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpICk7XG4gICAgICAgIHJldHVybiBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgPT0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSk7XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xuIiwiLy8gICAgICBQcm9taXNlIFBvbHlmaWxsXG4vLyAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS90YXlsb3JoYWtlcy9wcm9taXNlLXBvbHlmaWxsXG4vLyAgICAgIENvcHlyaWdodCAoYykgMjAxNCBUYXlsb3IgSGFrZXNcbi8vICAgICAgQ29weXJpZ2h0IChjKSAyMDE0IEZvcmJlcyBMaW5kZXNheVxuLy8gICAgICB0YXlsb3JoYWtlcy9wcm9taXNlLXBvbHlmaWxsIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuXG5jb25zdCBwcm9taXNlRmluYWxseSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gdGhpcy50aGVuKFxuICAgICAgICBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yZWplY3QocmVhc29uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgKTtcbn07XG5cbi8vIFN0b3JlIHNldFRpbWVvdXQgcmVmZXJlbmNlIHNvIHByb21pc2UtcG9seWZpbGwgd2lsbCBiZSB1bmFmZmVjdGVkIGJ5XG4vLyBvdGhlciBjb2RlIG1vZGlmeWluZyBzZXRUaW1lb3V0IChsaWtlIHNpbm9uLnVzZUZha2VUaW1lcnMoKSlcbmNvbnN0IHNldFRpbWVvdXRGdW5jID0gd2luZG93LnNldFRpbWVvdXQ7XG5jb25zdCBzZXRJbW1lZGlhdGVGdW5jID0gd2luZG93LnNldEltbWVkaWF0ZTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8vIFBvbHlmaWxsIGZvciBGdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG5jb25zdCBQcm9taXNlU2hpbSA9IGZ1bmN0aW9uIChmbikge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQcm9taXNlKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZXMgbXVzdCBiZSBjb25zdHJ1Y3RlZCB2aWEgbmV3Jyk7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgZnVuY3Rpb24nKTtcbiAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgdGhpcy5faGFuZGxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3ZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2RlZmVycmVkcyA9IFtdO1xuXG4gICAgZG9SZXNvbHZlKGZuLCB0aGlzKTtcbn1cblxuY29uc3QgaGFuZGxlID0gZnVuY3Rpb24gKHNlbGYsIGRlZmVycmVkKSB7XG4gICAgd2hpbGUgKHNlbGYuX3N0YXRlID09PSAzKSB7XG4gICAgICAgIHNlbGYgPSBzZWxmLl92YWx1ZTtcbiAgICB9XG4gICAgaWYgKHNlbGYuX3N0YXRlID09PSAwKSB7XG4gICAgICAgIHNlbGYuX2RlZmVycmVkcy5wdXNoKGRlZmVycmVkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZWxmLl9oYW5kbGVkID0gdHJ1ZTtcbiAgICBQcm9taXNlLl9pbW1lZGlhdGVGbihmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNiID0gc2VsZi5fc3RhdGUgPT09IDEgPyBkZWZlcnJlZC5vbkZ1bGZpbGxlZCA6IGRlZmVycmVkLm9uUmVqZWN0ZWQ7XG4gICAgICAgIGlmIChjYiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgKHNlbGYuX3N0YXRlID09PSAxID8gcmVzb2x2ZSA6IHJlamVjdCkoZGVmZXJyZWQucHJvbWlzZSwgc2VsZi5fdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXQgPSBjYihzZWxmLl92YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChkZWZlcnJlZC5wcm9taXNlLCBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKGRlZmVycmVkLnByb21pc2UsIHJldCk7XG4gICAgfSk7XG59XG5cbmNvbnN0IHJlc29sdmUgPSBmdW5jdGlvbiAoc2VsZiwgbmV3VmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgICAvLyBQcm9taXNlIFJlc29sdXRpb24gUHJvY2VkdXJlOiBodHRwczovL2dpdGh1Yi5jb20vcHJvbWlzZXMtYXBsdXMvcHJvbWlzZXMtc3BlYyN0aGUtcHJvbWlzZS1yZXNvbHV0aW9uLXByb2NlZHVyZVxuICAgICAgICBpZiAobmV3VmFsdWUgPT09IHNlbGYpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIHByb21pc2UgY2Fubm90IGJlIHJlc29sdmVkIHdpdGggaXRzZWxmLicpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBuZXdWYWx1ZSAmJlxuICAgICAgICAgICAgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG5ld1ZhbHVlID09PSAnZnVuY3Rpb24nKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHZhciB0aGVuID0gbmV3VmFsdWUudGhlbjtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9zdGF0ZSA9IDM7XG4gICAgICAgICAgICAgICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICBmaW5hbGUoc2VsZik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGRvUmVzb2x2ZShiaW5kKHRoZW4sIG5ld1ZhbHVlKSwgc2VsZik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNlbGYuX3N0YXRlID0gMTtcbiAgICAgICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgZmluYWxlKHNlbGYpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KHNlbGYsIGUpO1xuICAgIH1cbn1cblxuY29uc3QgcmVqZWN0ID1mdW5jdGlvbiAoc2VsZiwgbmV3VmFsdWUpIHtcbiAgICBzZWxmLl9zdGF0ZSA9IDI7XG4gICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICBmaW5hbGUoc2VsZik7XG59XG5cbmNvbnN0IGZpbmFsZSA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gICAgaWYgKHNlbGYuX3N0YXRlID09PSAyICYmIHNlbGYuX2RlZmVycmVkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIXNlbGYuX2hhbmRsZWQpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlLl91bmhhbmRsZWRSZWplY3Rpb25GbihzZWxmLl92YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzZWxmLl9kZWZlcnJlZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaGFuZGxlKHNlbGYsIHNlbGYuX2RlZmVycmVkc1tpXSk7XG4gICAgfVxuICAgIHNlbGYuX2RlZmVycmVkcyA9IG51bGw7XG59XG5cbmNvbnN0IEhhbmRsZXIgPSBmdW5jdGlvbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb21pc2UpIHtcbiAgICB0aGlzLm9uRnVsZmlsbGVkID0gdHlwZW9mIG9uRnVsZmlsbGVkID09PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiBudWxsO1xuICAgIHRoaXMub25SZWplY3RlZCA9IHR5cGVvZiBvblJlamVjdGVkID09PSAnZnVuY3Rpb24nID8gb25SZWplY3RlZCA6IG51bGw7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbn1cblxuLyoqXG4gKiBUYWtlIGEgcG90ZW50aWFsbHkgbWlzYmVoYXZpbmcgcmVzb2x2ZXIgZnVuY3Rpb24gYW5kIG1ha2Ugc3VyZVxuICogb25GdWxmaWxsZWQgYW5kIG9uUmVqZWN0ZWQgYXJlIG9ubHkgY2FsbGVkIG9uY2UuXG4gKlxuICogTWFrZXMgbm8gZ3VhcmFudGVlcyBhYm91dCBhc3luY2hyb255LlxuICovXG5jb25zdCBkb1Jlc29sdmUgPSBmdW5jdGlvbiAoZm4sIHNlbGYpIHtcbiAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICAgIGZuKFxuICAgICAgICAgICAgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc2VsZiwgdmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHNlbGYsIHJlYXNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgIHJlamVjdChzZWxmLCBleCk7XG4gICAgfVxufVxuXG5Qcm9taXNlU2hpbS5wcm90b3R5cGVbJ2NhdGNoJ10gPSBmdW5jdGlvbihvblJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGVkKTtcbn07XG5cblByb21pc2VTaGltLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICB2YXIgcHJvbSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG5vb3ApO1xuXG4gICAgaGFuZGxlKHRoaXMsIG5ldyBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9tKSk7XG4gICAgcmV0dXJuIHByb207XG59O1xuXG5Qcm9taXNlU2hpbS5wcm90b3R5cGVbJ2ZpbmFsbHknXSA9IHByb21pc2VGaW5hbGx5O1xuXG5Qcm9taXNlU2hpbS5hbGwgPSBmdW5jdGlvbihhcnIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmICghYXJyIHx8IHR5cGVvZiBhcnIubGVuZ3RoID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2UuYWxsIGFjY2VwdHMgYW4gYXJyYXknKTtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpO1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKFtdKTtcbiAgICAgICAgdmFyIHJlbWFpbmluZyA9IGFyZ3MubGVuZ3RoO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcyhpLCB2YWwpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoZW4gPSB2YWwudGhlbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVuLmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMoaSwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcmdzW2ldID0gdmFsO1xuICAgICAgICAgICAgICAgIGlmICgtLXJlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzKGksIGFyZ3NbaV0pO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlU2hpbS5yZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlU2hpbS5yZWplY3QgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVqZWN0KHZhbHVlKTtcbiAgICB9KTtcbn07XG5cblByb21pc2VTaGltLnJhY2UgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB2YWx1ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhbHVlc1tpXS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbi8vIFVzZSBwb2x5ZmlsbCBmb3Igc2V0SW1tZWRpYXRlIGZvciBwZXJmb3JtYW5jZSBnYWluc1xuUHJvbWlzZVNoaW0uX2ltbWVkaWF0ZUZuID1cbiAgICAodHlwZW9mIHNldEltbWVkaWF0ZUZ1bmMgPT09ICdmdW5jdGlvbicgJiZcbiAgICBmdW5jdGlvbihmbikge1xuICAgICAgICBzZXRJbW1lZGlhdGVGdW5jKGZuKTtcbiAgICB9KSB8fFxuICAgIGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHNldEltbWVkaWF0ZUZ1bmMoZm4sIDApO1xuICAgIH07XG5cblByb21pc2VTaGltLl91bmhhbmRsZWRSZWplY3Rpb25GbiA9IGZ1bmN0aW9uIF91bmhhbmRsZWRSZWplY3Rpb25GbihlcnIpIHtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdQb3NzaWJsZSBVbmhhbmRsZWQgUHJvbWlzZSBSZWplY3Rpb246JywgZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxufTtcblxuY29uc3QgUHJvbWlzZSA9IHdpbmRvdy5Qcm9taXNlIHx8ICh3aW5kb3cuUHJvbWlzZSA9IFByb21pc2VTaGltKTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVkID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb21pc2U7IiwiaW1wb3J0IE92ZW5QbGF5ZXJTREssIHtjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnR9IGZyb20gJy4vb3ZlbnBsYXllci5zZGsnXG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcvdmlldyc7XG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xuXG5cbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5qcycpO1xuXG5jb25zdCBPdmVuUGxheWVyID0ge307XG53aW5kb3cuT3ZlblBsYXllciA9IE92ZW5QbGF5ZXI7XG5cblxuLyoqXG4gKiBDb3B5IHByb3BlcnRpZXMgZnJvbSBPdmVuUGxheWVyU0RLIG9iamVjdCB0byBPdmVuUGxheWVyIG9iamVjdFxuICovXG5PYmplY3QuYXNzaWduKE92ZW5QbGF5ZXIsIE92ZW5QbGF5ZXJTREspO1xuXG5PdmVuUGxheWVyLmNyZWF0ZSA9IGZ1bmN0aW9uIChjb250YWluZXIsIG9wdGlvbnMpIHtcblxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50KGNvbnRhaW5lcik7XG5cbiAgICAvKmNvbnN0IHZpZXcgPSBuZXcgVmlldygpO1xuXG4gICAgdmlldy5hcHBlbmRQbGF5ZXJNYXJrdXAoY29udGFpbmVyRWxlbWVudCk7XG5cbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IE92ZW5QbGF5ZXJTREsuY3JlYXRlKHZpZXcuZ2V0TWVkaWFFbGVtZW50Q29udGFpbmVyKCksIG9wdGlvbnMpO1xuXG5cbiAgICB2aWV3LmFkZENvbXBvbmVudHNBbmRGdW5jdGlvbnMocGxheWVySW5zdGFuY2UsIG9wdGlvbnMpOyovXG5cblxuICAgIHZhciBwbGF5ZXIgPSBWaWV3KGNvbnRhaW5lckVsZW1lbnQpO1xuXG5cbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IE92ZW5QbGF5ZXJTREsuY3JlYXRlKHBsYXllci5nZXRNZWRpYUVsZW1lbnRDb250YWluZXIoKSwgb3B0aW9ucyk7XG5cbiAgICBPYmplY3QuYXNzaWduKHBsYXllckluc3RhbmNlLCB7XG4gICAgICAgZ2V0SWQgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRWxlbWVudC5pZDtcbiAgICAgICB9XG4gICAgfSk7XG5cbiAgICBwbGF5ZXIuc2V0QXBpKHBsYXllckluc3RhbmNlKTtcblxuXG5cbiAgICAvL2NvbnNvbGUubG9nKGNvbnRhaW5lckVsZW1lbnQpO1xuXG5cbiAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XG59XG5cbiIsImltcG9ydCBBUEkgZnJvbSAnYXBpL0FwaSc7XG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tICd1dGlscy92YWxpZGF0b3InO1xuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xuXG5cbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5zZGsuanMnKTtcblxuLyoqXG4gKiBNYWluIE92ZW5QbGF5ZXJTREsgb2JqZWN0XG4gKi9cbmNvbnN0IE92ZW5QbGF5ZXJTREsgPSB3aW5kb3cuT3ZlblBsYXllclNESyA9IHt9O1xuXG5jb25zdCB2ZXJzaW9uID0gJzAuMC4xJztcblxuY29uc3QgcGxheWVyTGlzdCA9IE92ZW5QbGF5ZXJTREsucGxheWVyTGlzdCA9IFtdO1xuXG5leHBvcnQgY29uc3QgY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cbiAgICBpZiAoIWNvbnRhaW5lcikge1xuXG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuXG4gICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XG4gICAgfSBlbHNlIGlmIChjb250YWluZXIubm9kZVR5cGUpIHtcblxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XG59XG5cbi8qKlxuICogQ3JlYXRlIHBsYXllciBpbnN0YW5jZSBhbmQgcmV0dXJuIGl0LlxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmcgfCBkb20gZWxlbWVudH0gY29udGFpbmVyICBJZCBvZiBjb250YWluZXIgZWxlbWVudCBvciBjb250YWluZXIgZWxlbWVudFxuICogQHBhcmFtICAgICAge29iamVjdH0gb3B0aW9ucyAgVGhlIG9wdGlvbnNcbiAqL1xuT3ZlblBsYXllclNESy5jcmVhdGUgPSBmdW5jdGlvbihjb250YWluZXIsIG9wdGlvbnMpIHtcblxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50KGNvbnRhaW5lcik7XG5cbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IEFQSShjb250YWluZXJFbGVtZW50KTtcbiAgICBwbGF5ZXJJbnN0YW5jZS5pbml0KG9wdGlvbnMpO1xuXG4gICAgcGxheWVyTGlzdC5wdXNoKHBsYXllckluc3RhbmNlKTtcblxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGxpc3QuXG4gKlxuICogQHJldHVybiAgICAge2FycmF5fSAgVGhlIHBsYXllciBsaXN0LlxuICovXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QgPSBmdW5jdGlvbigpIHtcblxuICAgIHJldHVybiBwbGF5ZXJMaXN0O1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgY29udGFpbmVyIGlkLlxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9ICBjb250YWluZXJJZCAgVGhlIGNvbnRhaW5lciBpZGVudGlmaWVyXG4gKiBAcmV0dXJuICAgICB7b2JlamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxuICovXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5Q29udGFpbmVySWQgPSBmdW5jdGlvbihjb250YWluZXJJZCkge1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aCAtMTsgaSArKykge1xuXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmNvbnRhaW5lcklkID09PSBjb250YWluZXJJZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gcGxheWVyTGlzdFtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgaW5kZXguXG4gKlxuICogQHBhcmFtICAgICAge251bWJlcn0gIGluZGV4ICAgVGhlIGluZGV4XG4gKiBAcmV0dXJuICAgICB7b2JqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlJbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IHBsYXllckxpc3RbaW5kZXhdO1xuXG4gICAgaWYgKHBsYXllckluc3RhbmNlKSB7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB3ZWJydGMgc291cmNlIGZvciBwbGF5ZXIgc291cmNlIHR5cGUuXG4gKlxuICogQHBhcmFtICAgICAge09iamVjdCB8IEFycmF5fSAgc291cmNlICAgd2VicnRjIHNvdXJjZVxuICogQHJldHVybiAgICAge0FycmF5fSAgUGxheWVyIHNvdXJjZSBPYmVqY3QuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2VuZXJhdGVXZWJydGNVcmxzID0gZnVuY3Rpb24oc291cmNlcykge1xuICAgIHJldHVybiAoXy5pc0FycmF5KHNvdXJjZXMpID8gc291cmNlcyA6IFtzb3VyY2VzXSkubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpe1xuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBpc1dlYlJUQyhzb3VyY2UuaG9zdCkgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xuICAgICAgICAgICAgcmV0dXJuIHtmaWxlIDogc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL1wiICsgc291cmNlLnN0cmVhbSwgdHlwZSA6IFwid2VicnRjXCIsIGxhYmVsIDogc291cmNlLmxhYmVsID8gc291cmNlLmxhYmVsIDogXCJ3ZWJydGMtXCIrKGluZGV4KzEpIH07XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE92ZW5QbGF5ZXJTREs7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjMuLlxuICovXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuaW1wb3J0IGNsb3Nlc3QgZnJvbSAndXRpbHMvcG9seWZpbGxzL3VpJztcblxuLyoqXG4gKiBAYnJpZWYgICBJdCB3YXMgcmVwbGFjZSBqcXVlcnkncyBzZWxlY3Rvci4gSXQgT2Z0ZW4gdXNlZCBieSBPdmVuVGVtcGxhdGUuICgvdmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlLmpzKVxuICogQHBhcmFtICAgc2VsZWN0b3JPckVsZW1lbnQgIHN0cmluZyBvciBlbGVtZW50XG4gKlxuICogKi9cblxuY29uc3QgTGEkID0gZnVuY3Rpb24oc2VsZWN0b3JPckVsZW1lbnQpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBjb25zdCByZXR1cm5Ob2RlID0gZnVuY3Rpb24oJGVsZW1lbnQgLCBzZWxlY3Rvcil7XG4gICAgICAgIGxldCBub2RlTGlzdCA9ICAkZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgaWYobm9kZUxpc3QubGVuZ3RoID4gMSl7XG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3Q7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0WzBdO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbGV0ICRlbGVtZW50ID0gXCJcIjtcblxuICAgIGlmKCBfLmV2ZXJ5KHNlbGVjdG9yT3JFbGVtZW50LCBmdW5jdGlvbihpdGVtKXtyZXR1cm4gXy5pc0VsZW1lbnQoaXRlbSl9KSl7XG4gICAgICAgICRlbGVtZW50ID0gc2VsZWN0b3JPckVsZW1lbnQ7XG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwiZG9jdW1lbnRcIil7XG4gICAgICAgICRlbGVtZW50ID0gZG9jdW1lbnQ7XG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwid2luZG93XCIpe1xuICAgICAgICAkZWxlbWVudCA9IHdpbmRvdztcbiAgICB9ZWxzZXtcbiAgICAgICAgJGVsZW1lbnQgPSByZXR1cm5Ob2RlKGRvY3VtZW50LCBzZWxlY3Rvck9yRWxlbWVudCk7XG4gICAgfVxuXG5cbiAgICBpZighJGVsZW1lbnQpe1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0aGF0LmZpbmQgPSAoc2VsZWN0b3IpID0+e1xuICAgICAgICByZXR1cm4gTGEkKHJldHVybk5vZGUoJGVsZW1lbnQsIHNlbGVjdG9yKSk7XG4gICAgfTtcblxuICAgIHRoYXQuY3NzID0gKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgJGVsZW1lbnQuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KXtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5hZGRDbGFzcyA9IChuYW1lKSA9PntcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSAkZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgaWYoY2xhc3NOYW1lcy5pbmRleE9mKG5hbWUpID09PSAtMSl7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIFwiICsgbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHRoYXQucmVtb3ZlQ2xhc3MgPSAobmFtZSkgPT57XG4gICAgICAgIGlmICgkZWxlbWVudC5jbGFzc0xpc3Qpe1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgPSAkZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgbmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcblxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuc2hvdyA9ICgpID0+e1xuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9O1xuXG4gICAgdGhhdC5oaWRlID0gKCkgPT57XG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfTtcblxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWxDb2RlKSA9PntcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MICs9IGh0bWxDb2RlO1xuICAgIH07XG5cbiAgICB0aGF0LnRleHQgPSAodGV4dCkgPT4geyAvL0lFOCtcbiAgICAgICAgaWYodGV4dCl7XG4gICAgICAgICAgICAkZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuaGFzQ2xhc3MgPSAobmFtZSkgPT4geyAvL0lFOCtcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIG5hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KCRlbGVtZW50Lm5hbWUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuaXMgPSAoJHRhcmdldEVsZW1lbnQpID0+IHtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50ID09PSAkdGFyZ2V0RWxlbWVudDtcbiAgICB9O1xuXG4gICAgdGhhdC5vZmZzZXQgPSAoKSA9PnsgICAgLy9JRTgrXG4gICAgICAgIHZhciByZWN0ID0gJGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQud2lkdGggPSAoKSA9PiB7ICAgIC8vSUU4K1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgfTtcblxuICAgIHRoYXQuaGVpZ2h0ID0gKCkgPT4geyAgIC8vSUU4K1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIH07XG5cbiAgICB0aGF0LmF0dHIgPSAoYXR0cikgPT4ge1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpO1xuICAgIH07XG5cbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHsgICAvL0lFOCtcbiAgICAgICAgJGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkZWxlbWVudCk7XG4gICAgfTtcblxuICAgIHRoYXQucmVwbGFjZSA9IChodG1sKSA9PiB7XG4gICAgICAgICRlbGVtZW50LnJlcGxhY2VXaXRoKGh0bWwpO1xuICAgIH07XG5cbiAgICB0aGF0LmFwcGVuZCA9IChodG1sKSA9PiB7XG4gICAgICAgICRlbGVtZW50LmFwcGVuZENoaWxkKGh0bWwpO1xuICAgIH07XG5cbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQuY2xvc2VzdCA9IChzZWxlY3RvclN0cmluZykgPT4ge1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xvc2VzdChzZWxlY3RvclN0cmluZyk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGEkOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDI0Li5cbiAqL1xuXG5jb25zdCBsb2dnZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgcHJldkNvbnNvbGVMb2cgPSBudWxsO1xuXG4gICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0ge2xvZyA6IHdpbmRvd1snY29uc29sZSddWydsb2cnXX07XG5cbiAgICB0aGF0LmVuYWJsZSA9ICgpID0+e1xuICAgICAgICBpZihwcmV2Q29uc29sZUxvZyA9PSBudWxsKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBwcmV2Q29uc29sZUxvZztcbiAgICB9O1xuICAgIHRoYXQuZGlzYWJsZSA9ICgpID0+e1xuICAgICAgICBwcmV2Q29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBmdW5jdGlvbigpe307XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0gbnVsbDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAxLi5cbiAqL1xuY29uc3QgY2xvc2VzdCA9IGZ1bmN0aW9uKCl7XG4gICAgaWYgKHdpbmRvdy5FbGVtZW50ICYmICFFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0KSB7XG4gICAgICAgIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgPVxuICAgICAgICAgICAgZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gKHRoaXMuZG9jdW1lbnQgfHwgdGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHMpLFxuICAgICAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgICAgICBlbCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBpID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgtLWkgPj0gMCAmJiBtYXRjaGVzLml0ZW0oaSkgIT09IGVsKSB7fTtcbiAgICAgICAgICAgICAgICB9IHdoaWxlICgoaSA8IDApICYmIChlbCA9IGVsLnBhcmVudEVsZW1lbnQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgICAgICB9O1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsb3Nlc3Q7IiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbi8qKlxuICogZXh0cmFjdEV4dGVuc2lvblxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9IHBhdGggZm9yIHVybFxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxuICovXG5leHBvcnQgY29uc3QgZXh0cmFjdEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICBpZighcGF0aCB8fCBwYXRoLnN1YnN0cigwLDQpPT0ncnRtcCcpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKSB7XG4gICAgICAgIGxldCBleHRlbnNpb24gPSBcIlwiO1xuICAgICAgICBpZiAoKC9bKCxdZm9ybWF0PW1wZC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ21wZCc7XG4gICAgICAgIH1lbHNlIGlmICgoL1soLF1mb3JtYXQ9bTN1OC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ20zdTgnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbnNpb247XG4gICAgfVxuXG4gICAgbGV0IGF6dXJlZEZvcm1hdCA9IGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKTtcbiAgICBpZihhenVyZWRGb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGF6dXJlZEZvcm1hdDtcbiAgICB9XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xuICAgIGlmKHBhdGgubGFzdEluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxLCBwYXRoLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufTtcblxuXG4vKipcbiAqIG5hdHVyYWxIbXNcbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyIHwgc3RyaW5nfSAgc2Vjb25kICBUaGUgc2Vjb25kXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgZm9ybWF0dGVkIFN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbEhtcyhzZWNvbmQpIHtcbiAgICBsZXQgc2VjTnVtID0gcGFyc2VJbnQoc2Vjb25kLCAxMCk7XG4gICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xuICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjTnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuICAgIGxldCBzZWNvbmRzID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcblxuICAgIGlmIChob3VycyA+IDApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cblxuICAgIGlmIChob3VycyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH1cbn0iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjkuMVxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXG4vLyAgICAgKGMpIDIwMDktMjAxOCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4hZnVuY3Rpb24oKXt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZiYmc2VsZnx8XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbCYmZ2xvYmFsfHx0aGlzfHx7fSxyPW4uXyxlPUFycmF5LnByb3RvdHlwZSxvPU9iamVjdC5wcm90b3R5cGUscz1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sP1N5bWJvbC5wcm90b3R5cGU6bnVsbCx1PWUucHVzaCxjPWUuc2xpY2UscD1vLnRvU3RyaW5nLGk9by5oYXNPd25Qcm9wZXJ0eSx0PUFycmF5LmlzQXJyYXksYT1PYmplY3Qua2V5cyxsPU9iamVjdC5jcmVhdGUsZj1mdW5jdGlvbigpe30saD1mdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIGg/bjp0aGlzIGluc3RhbmNlb2YgaD92b2lkKHRoaXMuX3dyYXBwZWQ9bik6bmV3IGgobil9O1widW5kZWZpbmVkXCI9PXR5cGVvZiBleHBvcnRzfHxleHBvcnRzLm5vZGVUeXBlP24uXz1oOihcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUuZXhwb3J0cyYmKGV4cG9ydHM9bW9kdWxlLmV4cG9ydHM9aCksZXhwb3J0cy5fPWgpLGguVkVSU0lPTj1cIjEuOS4xXCI7dmFyIHYseT1mdW5jdGlvbih1LGksbil7aWYodm9pZCAwPT09aSlyZXR1cm4gdTtzd2l0Y2gobnVsbD09bj8zOm4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHUuY2FsbChpLG4pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gdS5jYWxsKGksbixyLHQpfTtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB1LmNhbGwoaSxuLHIsdCxlKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHUuYXBwbHkoaSxhcmd1bWVudHMpfX0sZD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguaXRlcmF0ZWUhPT12P2guaXRlcmF0ZWUobixyKTpudWxsPT1uP2guaWRlbnRpdHk6aC5pc0Z1bmN0aW9uKG4pP3kobixyLHQpOmguaXNPYmplY3QobikmJiFoLmlzQXJyYXkobik/aC5tYXRjaGVyKG4pOmgucHJvcGVydHkobil9O2guaXRlcmF0ZWU9dj1mdW5jdGlvbihuLHIpe3JldHVybiBkKG4sciwxLzApfTt2YXIgZz1mdW5jdGlvbih1LGkpe3JldHVybiBpPW51bGw9PWk/dS5sZW5ndGgtMToraSxmdW5jdGlvbigpe2Zvcih2YXIgbj1NYXRoLm1heChhcmd1bWVudHMubGVuZ3RoLWksMCkscj1BcnJheShuKSx0PTA7dDxuO3QrKylyW3RdPWFyZ3VtZW50c1t0K2ldO3N3aXRjaChpKXtjYXNlIDA6cmV0dXJuIHUuY2FsbCh0aGlzLHIpO2Nhc2UgMTpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLHIpO2Nhc2UgMjpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLGFyZ3VtZW50c1sxXSxyKX12YXIgZT1BcnJheShpKzEpO2Zvcih0PTA7dDxpO3QrKyllW3RdPWFyZ3VtZW50c1t0XTtyZXR1cm4gZVtpXT1yLHUuYXBwbHkodGhpcyxlKX19LG09ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJue307aWYobClyZXR1cm4gbChuKTtmLnByb3RvdHlwZT1uO3ZhciByPW5ldyBmO3JldHVybiBmLnByb3RvdHlwZT1udWxsLHJ9LGI9ZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP3ZvaWQgMDpuW3JdfX0saj1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsIT1uJiZpLmNhbGwobixyKX0seD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7aWYobnVsbD09bilyZXR1cm47bj1uW3JbZV1dfXJldHVybiB0P246dm9pZCAwfSxfPU1hdGgucG93KDIsNTMpLTEsQT1iKFwibGVuZ3RoXCIpLHc9ZnVuY3Rpb24obil7dmFyIHI9QShuKTtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgciYmMDw9ciYmcjw9X307aC5lYWNoPWguZm9yRWFjaD1mdW5jdGlvbihuLHIsdCl7dmFyIGUsdTtpZihyPXkocix0KSx3KG4pKWZvcihlPTAsdT1uLmxlbmd0aDtlPHU7ZSsrKXIobltlXSxlLG4pO2Vsc2V7dmFyIGk9aC5rZXlzKG4pO2ZvcihlPTAsdT1pLmxlbmd0aDtlPHU7ZSsrKXIobltpW2VdXSxpW2VdLG4pfXJldHVybiBufSxoLm1hcD1oLmNvbGxlY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPUFycmF5KHUpLG89MDtvPHU7bysrKXt2YXIgYT1lP2Vbb106bztpW29dPXIoblthXSxhLG4pfXJldHVybiBpfTt2YXIgTz1mdW5jdGlvbihjKXtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9Mzw9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9IXcobikmJmgua2V5cyhuKSxpPSh1fHxuKS5sZW5ndGgsbz0wPGM/MDppLTE7Zm9yKGV8fCh0PW5bdT91W29dOm9dLG8rPWMpOzA8PW8mJm88aTtvKz1jKXt2YXIgYT11P3Vbb106bzt0PXIodCxuW2FdLGEsbil9cmV0dXJuIHR9KG4seShyLGUsNCksdCx1KX19O2gucmVkdWNlPWguZm9sZGw9aC5pbmplY3Q9TygxKSxoLnJlZHVjZVJpZ2h0PWguZm9sZHI9TygtMSksaC5maW5kPWguZGV0ZWN0PWZ1bmN0aW9uKG4scix0KXt2YXIgZT0odyhuKT9oLmZpbmRJbmRleDpoLmZpbmRLZXkpKG4scix0KTtpZih2b2lkIDAhPT1lJiYtMSE9PWUpcmV0dXJuIG5bZV19LGguZmlsdGVyPWguc2VsZWN0PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT1bXTtyZXR1cm4gZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe2UobixyLHQpJiZ1LnB1c2gobil9KSx1fSxoLnJlamVjdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguZmlsdGVyKG4saC5uZWdhdGUoZChyKSksdCl9LGguZXZlcnk9aC5hbGw9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYoIXIobltvXSxvLG4pKXJldHVybiExfXJldHVybiEwfSxoLnNvbWU9aC5hbnk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYocihuW29dLG8sbikpcmV0dXJuITB9cmV0dXJuITF9LGguY29udGFpbnM9aC5pbmNsdWRlcz1oLmluY2x1ZGU9ZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSwoXCJudW1iZXJcIiE9dHlwZW9mIHR8fGUpJiYodD0wKSwwPD1oLmluZGV4T2YobixyLHQpfSxoLmludm9rZT1nKGZ1bmN0aW9uKG4sdCxlKXt2YXIgdSxpO3JldHVybiBoLmlzRnVuY3Rpb24odCk/aT10OmguaXNBcnJheSh0KSYmKHU9dC5zbGljZSgwLC0xKSx0PXRbdC5sZW5ndGgtMV0pLGgubWFwKG4sZnVuY3Rpb24obil7dmFyIHI9aTtpZighcil7aWYodSYmdS5sZW5ndGgmJihuPXgobix1KSksbnVsbD09bilyZXR1cm47cj1uW3RdfXJldHVybiBudWxsPT1yP3I6ci5hcHBseShuLGUpfSl9KSxoLnBsdWNrPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgubWFwKG4saC5wcm9wZXJ0eShyKSl9LGgud2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maWx0ZXIobixoLm1hdGNoZXIocikpfSxoLmZpbmRXaGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbmQobixoLm1hdGNoZXIocikpfSxoLm1heD1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPS0xLzAsbz0tMS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJmk8dCYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7dT1lKG4scix0KSwobzx1fHx1PT09LTEvMCYmaT09PS0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5taW49ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0xLzAsbz0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmdDxpJiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXsoKHU9ZShuLHIsdCkpPG98fHU9PT0xLzAmJmk9PT0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5zaHVmZmxlPWZ1bmN0aW9uKG4pe3JldHVybiBoLnNhbXBsZShuLDEvMCl9LGguc2FtcGxlPWZ1bmN0aW9uKG4scix0KXtpZihudWxsPT1yfHx0KXJldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksbltoLnJhbmRvbShuLmxlbmd0aC0xKV07dmFyIGU9dyhuKT9oLmNsb25lKG4pOmgudmFsdWVzKG4pLHU9QShlKTtyPU1hdGgubWF4KE1hdGgubWluKHIsdSksMCk7Zm9yKHZhciBpPXUtMSxvPTA7bzxyO28rKyl7dmFyIGE9aC5yYW5kb20obyxpKSxjPWVbb107ZVtvXT1lW2FdLGVbYV09Y31yZXR1cm4gZS5zbGljZSgwLHIpfSxoLnNvcnRCeT1mdW5jdGlvbihuLGUscil7dmFyIHU9MDtyZXR1cm4gZT1kKGUsciksaC5wbHVjayhoLm1hcChuLGZ1bmN0aW9uKG4scix0KXtyZXR1cm57dmFsdWU6bixpbmRleDp1KyssY3JpdGVyaWE6ZShuLHIsdCl9fSkuc29ydChmdW5jdGlvbihuLHIpe3ZhciB0PW4uY3JpdGVyaWEsZT1yLmNyaXRlcmlhO2lmKHQhPT1lKXtpZihlPHR8fHZvaWQgMD09PXQpcmV0dXJuIDE7aWYodDxlfHx2b2lkIDA9PT1lKXJldHVybi0xfXJldHVybiBuLmluZGV4LXIuaW5kZXh9KSxcInZhbHVlXCIpfTt2YXIgaz1mdW5jdGlvbihvLHIpe3JldHVybiBmdW5jdGlvbihlLHUsbil7dmFyIGk9cj9bW10sW11dOnt9O3JldHVybiB1PWQodSxuKSxoLmVhY2goZSxmdW5jdGlvbihuLHIpe3ZhciB0PXUobixyLGUpO28oaSxuLHQpfSksaX19O2guZ3JvdXBCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSksaC5pbmRleEJ5PWsoZnVuY3Rpb24obixyLHQpe25bdF09cn0pLGguY291bnRCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XSsrOm5bdF09MX0pO3ZhciBTPS9bXlxcdWQ4MDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkZmZmXS9nO2gudG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbj9oLmlzQXJyYXkobik/Yy5jYWxsKG4pOmguaXNTdHJpbmcobik/bi5tYXRjaChTKTp3KG4pP2gubWFwKG4saC5pZGVudGl0eSk6aC52YWx1ZXMobik6W119LGguc2l6ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj8wOncobik/bi5sZW5ndGg6aC5rZXlzKG4pLmxlbmd0aH0saC5wYXJ0aXRpb249ayhmdW5jdGlvbihuLHIsdCl7blt0PzA6MV0ucHVzaChyKX0sITApLGguZmlyc3Q9aC5oZWFkPWgudGFrZT1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uWzBdOmguaW5pdGlhbChuLG4ubGVuZ3RoLXIpfSxoLmluaXRpYWw9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobiwwLE1hdGgubWF4KDAsbi5sZW5ndGgtKG51bGw9PXJ8fHQ/MTpyKSkpfSxoLmxhc3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/bltuLmxlbmd0aC0xXTpoLnJlc3QobixNYXRoLm1heCgwLG4ubGVuZ3RoLXIpKX0saC5yZXN0PWgudGFpbD1oLmRyb3A9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobixudWxsPT1yfHx0PzE6cil9LGguY29tcGFjdD1mdW5jdGlvbihuKXtyZXR1cm4gaC5maWx0ZXIobixCb29sZWFuKX07dmFyIE09ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PShlPWV8fFtdKS5sZW5ndGgsaT0wLG89QShuKTtpPG87aSsrKXt2YXIgYT1uW2ldO2lmKHcoYSkmJihoLmlzQXJyYXkoYSl8fGguaXNBcmd1bWVudHMoYSkpKWlmKHIpZm9yKHZhciBjPTAsbD1hLmxlbmd0aDtjPGw7KWVbdSsrXT1hW2MrK107ZWxzZSBNKGEscix0LGUpLHU9ZS5sZW5ndGg7ZWxzZSB0fHwoZVt1KytdPWEpfXJldHVybiBlfTtoLmZsYXR0ZW49ZnVuY3Rpb24obixyKXtyZXR1cm4gTShuLHIsITEpfSxoLndpdGhvdXQ9ZyhmdW5jdGlvbihuLHIpe3JldHVybiBoLmRpZmZlcmVuY2UobixyKX0pLGgudW5pcT1oLnVuaXF1ZT1mdW5jdGlvbihuLHIsdCxlKXtoLmlzQm9vbGVhbihyKXx8KGU9dCx0PXIscj0hMSksbnVsbCE9dCYmKHQ9ZCh0LGUpKTtmb3IodmFyIHU9W10saT1bXSxvPTAsYT1BKG4pO288YTtvKyspe3ZhciBjPW5bb10sbD10P3QoYyxvLG4pOmM7ciYmIXQ/KG8mJmk9PT1sfHx1LnB1c2goYyksaT1sKTp0P2guY29udGFpbnMoaSxsKXx8KGkucHVzaChsKSx1LnB1c2goYykpOmguY29udGFpbnModSxjKXx8dS5wdXNoKGMpfXJldHVybiB1fSxoLnVuaW9uPWcoZnVuY3Rpb24obil7cmV0dXJuIGgudW5pcShNKG4sITAsITApKX0pLGguaW50ZXJzZWN0aW9uPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1bXSx0PWFyZ3VtZW50cy5sZW5ndGgsZT0wLHU9QShuKTtlPHU7ZSsrKXt2YXIgaT1uW2VdO2lmKCFoLmNvbnRhaW5zKHIsaSkpe3ZhciBvO2ZvcihvPTE7bzx0JiZoLmNvbnRhaW5zKGFyZ3VtZW50c1tvXSxpKTtvKyspO289PT10JiZyLnB1c2goaSl9fXJldHVybiByfSxoLmRpZmZlcmVuY2U9ZyhmdW5jdGlvbihuLHIpe3JldHVybiByPU0ociwhMCwhMCksaC5maWx0ZXIobixmdW5jdGlvbihuKXtyZXR1cm4haC5jb250YWlucyhyLG4pfSl9KSxoLnVuemlwPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1uJiZoLm1heChuLEEpLmxlbmd0aHx8MCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aC5wbHVjayhuLGUpO3JldHVybiB0fSxoLnppcD1nKGgudW56aXApLGgub2JqZWN0PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXt9LGU9MCx1PUEobik7ZTx1O2UrKylyP3RbbltlXV09cltlXTp0W25bZV1bMF1dPW5bZV1bMV07cmV0dXJuIHR9O3ZhciBGPWZ1bmN0aW9uKGkpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPUEobiksdT0wPGk/MDplLTE7MDw9dSYmdTxlO3UrPWkpaWYocihuW3VdLHUsbikpcmV0dXJuIHU7cmV0dXJuLTF9fTtoLmZpbmRJbmRleD1GKDEpLGguZmluZExhc3RJbmRleD1GKC0xKSxoLnNvcnRlZEluZGV4PWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0odD1kKHQsZSwxKSkociksaT0wLG89QShuKTtpPG87KXt2YXIgYT1NYXRoLmZsb29yKChpK28pLzIpO3QoblthXSk8dT9pPWErMTpvPWF9cmV0dXJuIGl9O3ZhciBFPWZ1bmN0aW9uKGksbyxhKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3ZhciBlPTAsdT1BKG4pO2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KTA8aT9lPTA8PXQ/dDpNYXRoLm1heCh0K3UsZSk6dT0wPD10P01hdGgubWluKHQrMSx1KTp0K3UrMTtlbHNlIGlmKGEmJnQmJnUpcmV0dXJuIG5bdD1hKG4scildPT09cj90Oi0xO2lmKHIhPXIpcmV0dXJuIDA8PSh0PW8oYy5jYWxsKG4sZSx1KSxoLmlzTmFOKSk/dCtlOi0xO2Zvcih0PTA8aT9lOnUtMTswPD10JiZ0PHU7dCs9aSlpZihuW3RdPT09cilyZXR1cm4gdDtyZXR1cm4tMX19O2guaW5kZXhPZj1FKDEsaC5maW5kSW5kZXgsaC5zb3J0ZWRJbmRleCksaC5sYXN0SW5kZXhPZj1FKC0xLGguZmluZExhc3RJbmRleCksaC5yYW5nZT1mdW5jdGlvbihuLHIsdCl7bnVsbD09ciYmKHI9bnx8MCxuPTApLHR8fCh0PXI8bj8tMToxKTtmb3IodmFyIGU9TWF0aC5tYXgoTWF0aC5jZWlsKChyLW4pL3QpLDApLHU9QXJyYXkoZSksaT0wO2k8ZTtpKyssbis9dCl1W2ldPW47cmV0dXJuIHV9LGguY2h1bms9ZnVuY3Rpb24obixyKXtpZihudWxsPT1yfHxyPDEpcmV0dXJuW107Zm9yKHZhciB0PVtdLGU9MCx1PW4ubGVuZ3RoO2U8dTspdC5wdXNoKGMuY2FsbChuLGUsZSs9cikpO3JldHVybiB0fTt2YXIgTj1mdW5jdGlvbihuLHIsdCxlLHUpe2lmKCEoZSBpbnN0YW5jZW9mIHIpKXJldHVybiBuLmFwcGx5KHQsdSk7dmFyIGk9bShuLnByb3RvdHlwZSksbz1uLmFwcGx5KGksdSk7cmV0dXJuIGguaXNPYmplY3Qobyk/bzppfTtoLmJpbmQ9ZyhmdW5jdGlvbihyLHQsZSl7aWYoIWguaXNGdW5jdGlvbihyKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uXCIpO3ZhciB1PWcoZnVuY3Rpb24obil7cmV0dXJuIE4ocix1LHQsdGhpcyxlLmNvbmNhdChuKSl9KTtyZXR1cm4gdX0pLGgucGFydGlhbD1nKGZ1bmN0aW9uKHUsaSl7dmFyIG89aC5wYXJ0aWFsLnBsYWNlaG9sZGVyLGE9ZnVuY3Rpb24oKXtmb3IodmFyIG49MCxyPWkubGVuZ3RoLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1pW2VdPT09bz9hcmd1bWVudHNbbisrXTppW2VdO2Zvcig7bjxhcmd1bWVudHMubGVuZ3RoOyl0LnB1c2goYXJndW1lbnRzW24rK10pO3JldHVybiBOKHUsYSx0aGlzLHRoaXMsdCl9O3JldHVybiBhfSksKGgucGFydGlhbC5wbGFjZWhvbGRlcj1oKS5iaW5kQWxsPWcoZnVuY3Rpb24obixyKXt2YXIgdD0ocj1NKHIsITEsITEpKS5sZW5ndGg7aWYodDwxKXRocm93IG5ldyBFcnJvcihcImJpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXNcIik7Zm9yKDt0LS07KXt2YXIgZT1yW3RdO25bZV09aC5iaW5kKG5bZV0sbil9fSksaC5tZW1vaXplPWZ1bmN0aW9uKGUsdSl7dmFyIGk9ZnVuY3Rpb24obil7dmFyIHI9aS5jYWNoZSx0PVwiXCIrKHU/dS5hcHBseSh0aGlzLGFyZ3VtZW50cyk6bik7cmV0dXJuIGoocix0KXx8KHJbdF09ZS5hcHBseSh0aGlzLGFyZ3VtZW50cykpLHJbdF19O3JldHVybiBpLmNhY2hlPXt9LGl9LGguZGVsYXk9ZyhmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gbi5hcHBseShudWxsLHQpfSxyKX0pLGguZGVmZXI9aC5wYXJ0aWFsKGguZGVsYXksaCwxKSxoLnRocm90dGxlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGEsYyxsPTA7dXx8KHU9e30pO3ZhciBmPWZ1bmN0aW9uKCl7bD0hMT09PXUubGVhZGluZz8wOmgubm93KCksaT1udWxsLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCl9LG49ZnVuY3Rpb24oKXt2YXIgbj1oLm5vdygpO2x8fCExIT09dS5sZWFkaW5nfHwobD1uKTt2YXIgcj1lLShuLWwpO3JldHVybiBvPXRoaXMsYT1hcmd1bWVudHMscjw9MHx8ZTxyPyhpJiYoY2xlYXJUaW1lb3V0KGkpLGk9bnVsbCksbD1uLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCkpOml8fCExPT09dS50cmFpbGluZ3x8KGk9c2V0VGltZW91dChmLHIpKSxjfTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksbD0wLGk9bz1hPW51bGx9LG59LGguZGVib3VuY2U9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYT1mdW5jdGlvbihuLHIpe2k9bnVsbCxyJiYobz10LmFwcGx5KG4scikpfSxuPWcoZnVuY3Rpb24obil7aWYoaSYmY2xlYXJUaW1lb3V0KGkpLHUpe3ZhciByPSFpO2k9c2V0VGltZW91dChhLGUpLHImJihvPXQuYXBwbHkodGhpcyxuKSl9ZWxzZSBpPWguZGVsYXkoYSxlLHRoaXMsbik7cmV0dXJuIG99KTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksaT1udWxsfSxufSxoLndyYXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5wYXJ0aWFsKHIsbil9LGgubmVnYXRlPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiFuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguY29tcG9zZT1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxlPXQubGVuZ3RoLTE7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPWUscj10W2VdLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtuLS07KXI9dFtuXS5jYWxsKHRoaXMscik7cmV0dXJuIHJ9fSxoLmFmdGVyPWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKCl7aWYoLS1uPDEpcmV0dXJuIHIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5iZWZvcmU9ZnVuY3Rpb24obixyKXt2YXIgdDtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gMDwtLW4mJih0PXIuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxuPD0xJiYocj1udWxsKSx0fX0saC5vbmNlPWgucGFydGlhbChoLmJlZm9yZSwyKSxoLnJlc3RBcmd1bWVudHM9Zzt2YXIgST0he3RvU3RyaW5nOm51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIiksVD1bXCJ2YWx1ZU9mXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJ0b1N0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImhhc093blByb3BlcnR5XCIsXCJ0b0xvY2FsZVN0cmluZ1wiXSxCPWZ1bmN0aW9uKG4scil7dmFyIHQ9VC5sZW5ndGgsZT1uLmNvbnN0cnVjdG9yLHU9aC5pc0Z1bmN0aW9uKGUpJiZlLnByb3RvdHlwZXx8byxpPVwiY29uc3RydWN0b3JcIjtmb3IoaihuLGkpJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSk7dC0tOykoaT1UW3RdKWluIG4mJm5baV0hPT11W2ldJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSl9O2gua2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTtpZihhKXJldHVybiBhKG4pO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWoobix0KSYmci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC5hbGxLZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKXIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGgudmFsdWVzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09bltyW3VdXTtyZXR1cm4gZX0saC5tYXBPYmplY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1oLmtleXMobiksdT1lLmxlbmd0aCxpPXt9LG89MDtvPHU7bysrKXt2YXIgYT1lW29dO2lbYV09cihuW2FdLGEsbil9cmV0dXJuIGl9LGgucGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1bclt1XSxuW3JbdV1dXTtyZXR1cm4gZX0saC5pbnZlcnQ9ZnVuY3Rpb24obil7Zm9yKHZhciByPXt9LHQ9aC5rZXlzKG4pLGU9MCx1PXQubGVuZ3RoO2U8dTtlKyspcltuW3RbZV1dXT10W2VdO3JldHVybiByfSxoLmZ1bmN0aW9ucz1oLm1ldGhvZHM9ZnVuY3Rpb24obil7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paC5pc0Z1bmN0aW9uKG5bdF0pJiZyLnB1c2godCk7cmV0dXJuIHIuc29ydCgpfTt2YXIgUj1mdW5jdGlvbihjLGwpe3JldHVybiBmdW5jdGlvbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO2lmKGwmJihuPU9iamVjdChuKSkscjwyfHxudWxsPT1uKXJldHVybiBuO2Zvcih2YXIgdD0xO3Q8cjt0KyspZm9yKHZhciBlPWFyZ3VtZW50c1t0XSx1PWMoZSksaT11Lmxlbmd0aCxvPTA7bzxpO28rKyl7dmFyIGE9dVtvXTtsJiZ2b2lkIDAhPT1uW2FdfHwoblthXT1lW2FdKX1yZXR1cm4gbn19O2guZXh0ZW5kPVIoaC5hbGxLZXlzKSxoLmV4dGVuZE93bj1oLmFzc2lnbj1SKGgua2V5cyksaC5maW5kS2V5PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGUsdT1oLmtleXMobiksaT0wLG89dS5sZW5ndGg7aTxvO2krKylpZihyKG5bZT11W2ldXSxlLG4pKXJldHVybiBlfTt2YXIgcSxLLHo9ZnVuY3Rpb24obixyLHQpe3JldHVybiByIGluIHR9O2gucGljaz1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9e30sZT1yWzBdO2lmKG51bGw9PW4pcmV0dXJuIHQ7aC5pc0Z1bmN0aW9uKGUpPygxPHIubGVuZ3RoJiYoZT15KGUsclsxXSkpLHI9aC5hbGxLZXlzKG4pKTooZT16LHI9TShyLCExLCExKSxuPU9iamVjdChuKSk7Zm9yKHZhciB1PTAsaT1yLmxlbmd0aDt1PGk7dSsrKXt2YXIgbz1yW3VdLGE9bltvXTtlKGEsbyxuKSYmKHRbb109YSl9cmV0dXJuIHR9KSxoLm9taXQ9ZyhmdW5jdGlvbihuLHQpe3ZhciByLGU9dFswXTtyZXR1cm4gaC5pc0Z1bmN0aW9uKGUpPyhlPWgubmVnYXRlKGUpLDE8dC5sZW5ndGgmJihyPXRbMV0pKToodD1oLm1hcChNKHQsITEsITEpLFN0cmluZyksZT1mdW5jdGlvbihuLHIpe3JldHVybiFoLmNvbnRhaW5zKHQscil9KSxoLnBpY2sobixlLHIpfSksaC5kZWZhdWx0cz1SKGguYWxsS2V5cywhMCksaC5jcmVhdGU9ZnVuY3Rpb24obixyKXt2YXIgdD1tKG4pO3JldHVybiByJiZoLmV4dGVuZE93bih0LHIpLHR9LGguY2xvbmU9ZnVuY3Rpb24obil7cmV0dXJuIGguaXNPYmplY3Qobik/aC5pc0FycmF5KG4pP24uc2xpY2UoKTpoLmV4dGVuZCh7fSxuKTpufSxoLnRhcD1mdW5jdGlvbihuLHIpe3JldHVybiByKG4pLG59LGguaXNNYXRjaD1mdW5jdGlvbihuLHIpe3ZhciB0PWgua2V5cyhyKSxlPXQubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKHZhciB1PU9iamVjdChuKSxpPTA7aTxlO2krKyl7dmFyIG89dFtpXTtpZihyW29dIT09dVtvXXx8IShvIGluIHUpKXJldHVybiExfXJldHVybiEwfSxxPWZ1bmN0aW9uKG4scix0LGUpe2lmKG49PT1yKXJldHVybiAwIT09bnx8MS9uPT0xL3I7aWYobnVsbD09bnx8bnVsbD09cilyZXR1cm4hMTtpZihuIT1uKXJldHVybiByIT1yO3ZhciB1PXR5cGVvZiBuO3JldHVybihcImZ1bmN0aW9uXCI9PT11fHxcIm9iamVjdFwiPT09dXx8XCJvYmplY3RcIj09dHlwZW9mIHIpJiZLKG4scix0LGUpfSxLPWZ1bmN0aW9uKG4scix0LGUpe24gaW5zdGFuY2VvZiBoJiYobj1uLl93cmFwcGVkKSxyIGluc3RhbmNlb2YgaCYmKHI9ci5fd3JhcHBlZCk7dmFyIHU9cC5jYWxsKG4pO2lmKHUhPT1wLmNhbGwocikpcmV0dXJuITE7c3dpdGNoKHUpe2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVyblwiXCIrbj09XCJcIityO2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybituIT0rbj8rciE9K3I6MD09K24/MS8rbj09MS9yOituPT0rcjtjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOnJldHVybituPT0rcjtjYXNlXCJbb2JqZWN0IFN5bWJvbF1cIjpyZXR1cm4gcy52YWx1ZU9mLmNhbGwobik9PT1zLnZhbHVlT2YuY2FsbChyKX12YXIgaT1cIltvYmplY3QgQXJyYXldXCI9PT11O2lmKCFpKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygbnx8XCJvYmplY3RcIiE9dHlwZW9mIHIpcmV0dXJuITE7dmFyIG89bi5jb25zdHJ1Y3RvcixhPXIuY29uc3RydWN0b3I7aWYobyE9PWEmJiEoaC5pc0Z1bmN0aW9uKG8pJiZvIGluc3RhbmNlb2YgbyYmaC5pc0Z1bmN0aW9uKGEpJiZhIGluc3RhbmNlb2YgYSkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHIpcmV0dXJuITF9ZT1lfHxbXTtmb3IodmFyIGM9KHQ9dHx8W10pLmxlbmd0aDtjLS07KWlmKHRbY109PT1uKXJldHVybiBlW2NdPT09cjtpZih0LnB1c2gobiksZS5wdXNoKHIpLGkpe2lmKChjPW4ubGVuZ3RoKSE9PXIubGVuZ3RoKXJldHVybiExO2Zvcig7Yy0tOylpZighcShuW2NdLHJbY10sdCxlKSlyZXR1cm4hMX1lbHNle3ZhciBsLGY9aC5rZXlzKG4pO2lmKGM9Zi5sZW5ndGgsaC5rZXlzKHIpLmxlbmd0aCE9PWMpcmV0dXJuITE7Zm9yKDtjLS07KWlmKGw9ZltjXSwhaihyLGwpfHwhcShuW2xdLHJbbF0sdCxlKSlyZXR1cm4hMX1yZXR1cm4gdC5wb3AoKSxlLnBvcCgpLCEwfSxoLmlzRXF1YWw9ZnVuY3Rpb24obixyKXtyZXR1cm4gcShuLHIpfSxoLmlzRW1wdHk9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW58fCh3KG4pJiYoaC5pc0FycmF5KG4pfHxoLmlzU3RyaW5nKG4pfHxoLmlzQXJndW1lbnRzKG4pKT8wPT09bi5sZW5ndGg6MD09PWgua2V5cyhuKS5sZW5ndGgpfSxoLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4hKCFufHwxIT09bi5ub2RlVHlwZSl9LGguaXNBcnJheT10fHxmdW5jdGlvbihuKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1wLmNhbGwobil9LGguaXNPYmplY3Q9ZnVuY3Rpb24obil7dmFyIHI9dHlwZW9mIG47cmV0dXJuXCJmdW5jdGlvblwiPT09cnx8XCJvYmplY3RcIj09PXImJiEhbn0saC5lYWNoKFtcIkFyZ3VtZW50c1wiLFwiRnVuY3Rpb25cIixcIlN0cmluZ1wiLFwiTnVtYmVyXCIsXCJEYXRlXCIsXCJSZWdFeHBcIixcIkVycm9yXCIsXCJTeW1ib2xcIixcIk1hcFwiLFwiV2Vha01hcFwiLFwiU2V0XCIsXCJXZWFrU2V0XCJdLGZ1bmN0aW9uKHIpe2hbXCJpc1wiK3JdPWZ1bmN0aW9uKG4pe3JldHVybiBwLmNhbGwobik9PT1cIltvYmplY3QgXCIrcitcIl1cIn19KSxoLmlzQXJndW1lbnRzKGFyZ3VtZW50cyl8fChoLmlzQXJndW1lbnRzPWZ1bmN0aW9uKG4pe3JldHVybiBqKG4sXCJjYWxsZWVcIil9KTt2YXIgRD1uLmRvY3VtZW50JiZuLmRvY3VtZW50LmNoaWxkTm9kZXM7XCJmdW5jdGlvblwiIT10eXBlb2YvLi8mJlwib2JqZWN0XCIhPXR5cGVvZiBJbnQ4QXJyYXkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIEQmJihoLmlzRnVuY3Rpb249ZnVuY3Rpb24obil7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbnx8ITF9KSxoLmlzRmluaXRlPWZ1bmN0aW9uKG4pe3JldHVybiFoLmlzU3ltYm9sKG4pJiZpc0Zpbml0ZShuKSYmIWlzTmFOKHBhcnNlRmxvYXQobikpfSxoLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTnVtYmVyKG4pJiZpc05hTihuKX0saC5pc0Jvb2xlYW49ZnVuY3Rpb24obil7cmV0dXJuITA9PT1ufHwhMT09PW58fFwiW29iamVjdCBCb29sZWFuXVwiPT09cC5jYWxsKG4pfSxoLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LGguaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIHZvaWQgMD09PW59LGguaGFzPWZ1bmN0aW9uKG4scil7aWYoIWguaXNBcnJheShyKSlyZXR1cm4gaihuLHIpO2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7dmFyIHU9cltlXTtpZihudWxsPT1ufHwhaS5jYWxsKG4sdSkpcmV0dXJuITE7bj1uW3VdfXJldHVybiEhdH0saC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4uXz1yLHRoaXN9LGguaWRlbnRpdHk9ZnVuY3Rpb24obil7cmV0dXJuIG59LGguY29uc3RhbnQ9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG59fSxoLm5vb3A9ZnVuY3Rpb24oKXt9LGgucHJvcGVydHk9ZnVuY3Rpb24ocil7cmV0dXJuIGguaXNBcnJheShyKT9mdW5jdGlvbihuKXtyZXR1cm4geChuLHIpfTpiKHIpfSxoLnByb3BlcnR5T2Y9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGw9PXI/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKG4pe3JldHVybiBoLmlzQXJyYXkobik/eChyLG4pOnJbbl19fSxoLm1hdGNoZXI9aC5tYXRjaGVzPWZ1bmN0aW9uKHIpe3JldHVybiByPWguZXh0ZW5kT3duKHt9LHIpLGZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTWF0Y2gobixyKX19LGgudGltZXM9ZnVuY3Rpb24obixyLHQpe3ZhciBlPUFycmF5KE1hdGgubWF4KDAsbikpO3I9eShyLHQsMSk7Zm9yKHZhciB1PTA7dTxuO3UrKyllW3VdPXIodSk7cmV0dXJuIGV9LGgucmFuZG9tPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGw9PXImJihyPW4sbj0wKSxuK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooci1uKzEpKX0saC5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9O3ZhciBMPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiN4Mjc7XCIsXCJgXCI6XCImI3g2MDtcIn0sUD1oLmludmVydChMKSxXPWZ1bmN0aW9uKHIpe3ZhciB0PWZ1bmN0aW9uKG4pe3JldHVybiByW25dfSxuPVwiKD86XCIraC5rZXlzKHIpLmpvaW4oXCJ8XCIpK1wiKVwiLGU9UmVnRXhwKG4pLHU9UmVnRXhwKG4sXCJnXCIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbj1udWxsPT1uP1wiXCI6XCJcIituLGUudGVzdChuKT9uLnJlcGxhY2UodSx0KTpufX07aC5lc2NhcGU9VyhMKSxoLnVuZXNjYXBlPVcoUCksaC5yZXN1bHQ9ZnVuY3Rpb24obixyLHQpe2guaXNBcnJheShyKXx8KHI9W3JdKTt2YXIgZT1yLmxlbmd0aDtpZighZSlyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP3QuY2FsbChuKTp0O2Zvcih2YXIgdT0wO3U8ZTt1Kyspe3ZhciBpPW51bGw9PW4/dm9pZCAwOm5bclt1XV07dm9pZCAwPT09aSYmKGk9dCx1PWUpLG49aC5pc0Z1bmN0aW9uKGkpP2kuY2FsbChuKTppfXJldHVybiBufTt2YXIgQz0wO2gudW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHI9KytDK1wiXCI7cmV0dXJuIG4/bityOnJ9LGgudGVtcGxhdGVTZXR0aW5ncz17ZXZhbHVhdGU6LzwlKFtcXHNcXFNdKz8pJT4vZyxpbnRlcnBvbGF0ZTovPCU9KFtcXHNcXFNdKz8pJT4vZyxlc2NhcGU6LzwlLShbXFxzXFxTXSs/KSU+L2d9O3ZhciBKPS8oLileLyxVPXtcIidcIjpcIidcIixcIlxcXFxcIjpcIlxcXFxcIixcIlxcclwiOlwiclwiLFwiXFxuXCI6XCJuXCIsXCJcXHUyMDI4XCI6XCJ1MjAyOFwiLFwiXFx1MjAyOVwiOlwidTIwMjlcIn0sVj0vXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2csJD1mdW5jdGlvbihuKXtyZXR1cm5cIlxcXFxcIitVW25dfTtoLnRlbXBsYXRlPWZ1bmN0aW9uKGksbixyKXshbiYmciYmKG49ciksbj1oLmRlZmF1bHRzKHt9LG4saC50ZW1wbGF0ZVNldHRpbmdzKTt2YXIgdCxlPVJlZ0V4cChbKG4uZXNjYXBlfHxKKS5zb3VyY2UsKG4uaW50ZXJwb2xhdGV8fEopLnNvdXJjZSwobi5ldmFsdWF0ZXx8Sikuc291cmNlXS5qb2luKFwifFwiKStcInwkXCIsXCJnXCIpLG89MCxhPVwiX19wKz0nXCI7aS5yZXBsYWNlKGUsZnVuY3Rpb24obixyLHQsZSx1KXtyZXR1cm4gYSs9aS5zbGljZShvLHUpLnJlcGxhY2UoViwkKSxvPXUrbi5sZW5ndGgscj9hKz1cIicrXFxuKChfX3Q9KFwiK3IrXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI6dD9hKz1cIicrXFxuKChfX3Q9KFwiK3QrXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjplJiYoYSs9XCInO1xcblwiK2UrXCJcXG5fX3ArPSdcIiksbn0pLGErPVwiJztcXG5cIixuLnZhcmlhYmxlfHwoYT1cIndpdGgob2JqfHx7fSl7XFxuXCIrYStcIn1cXG5cIiksYT1cInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIitcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIrYStcInJldHVybiBfX3A7XFxuXCI7dHJ5e3Q9bmV3IEZ1bmN0aW9uKG4udmFyaWFibGV8fFwib2JqXCIsXCJfXCIsYSl9Y2F0Y2gobil7dGhyb3cgbi5zb3VyY2U9YSxufXZhciB1PWZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwodGhpcyxuLGgpfSxjPW4udmFyaWFibGV8fFwib2JqXCI7cmV0dXJuIHUuc291cmNlPVwiZnVuY3Rpb24oXCIrYytcIil7XFxuXCIrYStcIn1cIix1fSxoLmNoYWluPWZ1bmN0aW9uKG4pe3ZhciByPWgobik7cmV0dXJuIHIuX2NoYWluPSEwLHJ9O3ZhciBHPWZ1bmN0aW9uKG4scil7cmV0dXJuIG4uX2NoYWluP2gocikuY2hhaW4oKTpyfTtoLm1peGluPWZ1bmN0aW9uKHQpe3JldHVybiBoLmVhY2goaC5mdW5jdGlvbnModCksZnVuY3Rpb24obil7dmFyIHI9aFtuXT10W25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49W3RoaXMuX3dyYXBwZWRdO3JldHVybiB1LmFwcGx5KG4sYXJndW1lbnRzKSxHKHRoaXMsci5hcHBseShoLG4pKX19KSxofSxoLm1peGluKGgpLGguZWFjaChbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJzcGxpY2VcIixcInVuc2hpZnRcIl0sZnVuY3Rpb24ocil7dmFyIHQ9ZVtyXTtoLnByb3RvdHlwZVtyXT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX3dyYXBwZWQ7cmV0dXJuIHQuYXBwbHkobixhcmd1bWVudHMpLFwic2hpZnRcIiE9PXImJlwic3BsaWNlXCIhPT1yfHwwIT09bi5sZW5ndGh8fGRlbGV0ZSBuWzBdLEcodGhpcyxuKX19KSxoLmVhY2goW1wiY29uY2F0XCIsXCJqb2luXCIsXCJzbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgcj1lW25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIEcodGhpcyxyLmFwcGx5KHRoaXMuX3dyYXBwZWQsYXJndW1lbnRzKSl9fSksaC5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcHBlZH0saC5wcm90b3R5cGUudmFsdWVPZj1oLnByb3RvdHlwZS50b0pTT049aC5wcm90b3R5cGUudmFsdWUsaC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gU3RyaW5nKHRoaXMuX3dyYXBwZWQpfSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShcInVuZGVyc2NvcmVcIixbXSxmdW5jdGlvbigpe3JldHVybiBofSl9KCk7XG4iLCJpbXBvcnQge2V4dHJhY3RFeHRlbnNpb259IGZyb20gXCJ1dGlscy9zdHJpbmdzXCI7XG5cbmV4cG9ydCBjb25zdCBpc1J0bXAgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCdydG1wOicpID09IDAgfHwgdHlwZSA9PSAncnRtcCcpO1xufTtcbmV4cG9ydCBjb25zdCBpc1dlYlJUQyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgaWYoZmlsZSl7XG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCd3czonKSA9PT0gMCB8fCBmaWxlLmluZGV4T2YoJ3dzczonKSA9PT0gMCB8fCB0eXBlID09PSAnd2VicnRjJyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5leHBvcnQgY29uc3QgaXNEYXNoID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICByZXR1cm4gKCB0eXBlID09PSAnbXBkJyB8fCAgdHlwZSA9PT0gJ2Rhc2gnIHx8IHR5cGUgPT09ICdhcHBsaWNhdGlvbi9kYXNoK3htbCcgfHwgZXh0cmFjdEV4dGVuc2lvbihmaWxlKSA9PSAnbXBkJyk7XG59O1xuIiwiLyoqXG4gKiB1dGlscyBmb3Igd2VicGFja1xuICovXG5cbmV4cG9ydCBjb25zdCBnZXRTY3JpcHRQYXRoID0gZnVuY3Rpb24oc2NyaXB0TmFtZSkge1xuICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHNjcmlwdHNbaV0uc3JjO1xuICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHNyYy5sYXN0SW5kZXhPZignLycgKyBzY3JpcHROYW1lKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHIoMCwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjkuLlxuICovXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IF9fVkVSU0lPTl9fO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjYuLlxuICovXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XG5cbmNvbnN0IEZ1bGxTY3JlZW5CdXR0b24gPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xuICAgIGNvbnN0ICRyb290ID0gTEEkKFwiI1wiK2FwaS5nZXRJZCgpKTtcbiAgICBsZXQgJGljb25FeHBhbmQgPSBcIlwiLCAkaWNvbkNvbXByZXNzID0gXCJcIiwgaXNGdWxsU2NyZWVuID0gZmFsc2U7XG5cbiAgICBsZXQgZnVsbFNjcmVlbkV2ZW50VHlwZXMgPSB7XG4gICAgICAgIG9uZnVsbHNjcmVlbmNoYW5nZSA6IFwiZnVsbHNjcmVlbmNoYW5nZVwiLFxuICAgICAgICBvbm1vemZ1bGxzY3JlZW5jaGFuZ2UgOiBcIm1vemZ1bGxzY3JlZW5jaGFuZ2VcIixcbiAgICAgICAgb253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIDogXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsXG4gICAgICAgIE1TRnVsbHNjcmVlbkNoYW5nZSA6IFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCJcbiAgICB9O1xuXG4gICAgbGV0IGZ1bGxTY3JlZW5DaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIGxldCBjaGVja0Z1bGxTY3JlZW4gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50IHx8IGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8IGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8IGRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGNoZWNrRnVsbFNjcmVlbigpKSB7XG4gICAgICAgICAgICAkcm9vdC5hZGRDbGFzcyhcIm92cC1mdWxsc2NyZWVuXCIpO1xuICAgICAgICAgICAgaXNGdWxsU2NyZWVuID0gdHJ1ZTtcbiAgICAgICAgICAgICRpY29uRXhwYW5kLmhpZGUoKTtcbiAgICAgICAgICAgICRpY29uQ29tcHJlc3Muc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHJvb3QucmVtb3ZlQ2xhc3MoXCJvdnAtZnVsbHNjcmVlblwiKTtcbiAgICAgICAgICAgIGlzRnVsbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICAgICAgJGljb25FeHBhbmQuc2hvdygpO1xuICAgICAgICAgICAgJGljb25Db21wcmVzcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IHJlcXVlc3RGdWxsU2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJHJvb3QuZ2V0KCkucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICRyb290LmdldCgpLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHJvb3QuZ2V0KCkud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICRyb290LmdldCgpLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHJvb3QuZ2V0KCkubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgICRyb290LmdldCgpLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHJvb3QuZ2V0KCkubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgJHJvb3QuZ2V0KCkubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVE9ETyhyb2NrKTogd2FybiBub3Qgc3VwcG9ydGVkXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxldCBleGl0RnVsbFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRPRE8ocm9jayk6IHdhcm4gbm90IHN1cHBvcnRlZFxuICAgICAgICB9XG4gICAgfVxuICAgIGxldCB0b2dnbGVGdWxsU2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWlzRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgcmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4aXRGdWxsU2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICRpY29uRXhwYW5kID0gJGN1cnJlbnQuZmluZCgnLm92cC1mdWxsc2NyZWVuLWJ1dHRvbi1leHBhbmRpY29uJyk7XG4gICAgICAgICRpY29uQ29tcHJlc3MgPSAkY3VycmVudC5maW5kKCcub3ZwLWZ1bGxzY3JlZW4tYnV0dG9uLWNvbXByZXNzaWNvbicpO1xuXG4gICAgICAgIC8vQmluZCBHbG9iYWwoZG9jdW1lbnQpIEV2ZW50XG4gICAgICAgIE9iamVjdC5rZXlzKGZ1bGxTY3JlZW5FdmVudFR5cGVzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICAvL0RpZmZlcmVuY2UgYmV0d2VlbiB1bmRlZmluZWQgYW5kIG51bGwuXG4gICAgICAgICAgICAvL3VuZGVmaW5lZCBpcyBub3Qgc3VwcG9ydC4gbnVsbCBpcyBzdXBwb3J0IGJ1dCBub3QgaW5pdGVkLlxuICAgICAgICAgICAgaWYoZG9jdW1lbnRbZXZlbnROYW1lXSA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihmdWxsU2NyZWVuRXZlbnRUeXBlc1tldmVudE5hbWVdLCBmdWxsU2NyZWVuQ2hhbmdlZENhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH07XG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAvL1VuYmluZCBHbG9iYWwoZG9jdW1lbnQpIEV2ZW50XG4gICAgICAgIE9iamVjdC5rZXlzKGZ1bGxTY3JlZW5FdmVudFR5cGVzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBpZihkb2N1bWVudFtldmVudE5hbWVdID09PSBudWxsKXtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGZ1bGxTY3JlZW5FdmVudFR5cGVzW2V2ZW50TmFtZV0sIGZ1bGxTY3JlZW5DaGFuZ2VkQ2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICBcImNsaWNrIC5vdnAtZnVsbHNjcmVlbi1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRvZ2dsZUZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiRnVsbFNjcmVlbkJ1dHRvblwiLCBudWxsLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZ1bGxTY3JlZW5CdXR0b247XG4iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgJzxidXR0b24gY2xhc3M9XCJvdnAtYnV0dG9uIG92cC1mdWxsc2NyZWVuLWJ1dHRvblwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLWZ1bGxzY3JlZW4tYnV0dG9uLWV4cGFuZGljb25cIj48L2k+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtZnVsbHNjcmVlbi1idXR0b24tY29tcHJlc3NpY29uXCI+PC9pPicgK1xuICAgICAgICAnPC9idXR0b24+J1xuICAgICk7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjAuLlxuICovXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XG5pbXBvcnQgUGxheUJ1dHRvbiBmcm9tICd2aWV3L2NvbnRyb2xzL3BsYXlCdXR0b24nO1xuaW1wb3J0IFZvbHVtZUJ1dHRvbiBmcm9tICd2aWV3L2NvbnRyb2xzL3ZvbHVtZUJ1dHRvbic7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAndmlldy9jb250cm9scy9wcm9ncmVzc0Jhcic7XG5pbXBvcnQgVGltZURpc3BsYXkgZnJvbSAndmlldy9jb250cm9scy90aW1lRGlzcGxheSc7XG5pbXBvcnQgRnVsbFNjcmVlbkJ1dHRvbiBmcm9tICd2aWV3L2NvbnRyb2xzL2Z1bGxTY3JlZW5CdXR0b24nO1xuaW1wb3J0IFNldHRpbmdQYW5lbCBmcm9tICd2aWV3L2NvbnRyb2xzL3NldHRpbmdQYW5lbCc7XG5pbXBvcnQgU2V0dGluZ1BhbmVsTGlzdCBmcm9tICd2aWV3L2dsb2JhbC9TZXR0aW5nUGFuZWxMaXN0JztcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xuaW1wb3J0IHtcbiAgICBSRUFEWSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgRVJST1Jcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgQ29udHJvbHMgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xuICAgIGxldCB2b2x1bWVCdXR0b24gPSBcIlwiLCBwbGF5QnV0dG9uPSBcIlwiLCBwcm9ncmVzc0JhciA9IFwiXCIsIHRpbWVEaXNwbGF5ID0gXCJcIiwgZnVsbFNjcmVlbkJ1dHRvbiA9IFwiXCI7XG5cbiAgICBsZXQgZ2VuZXJhdGVNYWluUGFuZWxEYXRhID0gZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IHBhbmVsID0ge3RpdGxlIDogXCJTZXR0aW5nc1wiLCBpc01haW4gOiB0cnVlLCBib2R5IDogW119O1xuICAgICAgICBpZihhcGkuZ2V0RHVyYXRpb24oKSAhPT0gSW5maW5pdHkpe1xuICAgICAgICAgICAgbGV0IGJvZHkgPSB7XG4gICAgICAgICAgICAgICAgdGl0bGUgOiBcIlNwZWVkXCIsXG4gICAgICAgICAgICAgICAgdmFsdWUgOiAgYXBpLmdldFBsYXliYWNrUmF0ZSgpID09PSAxID8gXCJOb3JtYWxcIiA6IGFwaS5nZXRQbGF5YmFja1JhdGUoKSxcbiAgICAgICAgICAgICAgICB0eXBlIDogXCJwbGF5YmFja3JhdGVcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhbmVsLmJvZHkucHVzaChib2R5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcGkuZ2V0UXVhbGl0eUxldmVscygpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBxdWFsaXR5TGV2ZWxzID0gYXBpLmdldFF1YWxpdHlMZXZlbHMoKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50UXVhbGl0eSA9IGFwaS5nZXRDdXJyZW50UXVhbGl0eSgpO1xuXG4gICAgICAgICAgICBsZXQgYm9keSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZSA6IFwiU291cmNlXCIsXG4gICAgICAgICAgICAgICAgdmFsdWUgOiBxdWFsaXR5TGV2ZWxzW2N1cnJlbnRRdWFsaXR5XSA/IHF1YWxpdHlMZXZlbHNbY3VycmVudFF1YWxpdHldLmxhYmVsIDogXCJEZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgdHlwZSA6IFwicXVhbGl0eWxldmVsXCJcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHBhbmVsLmJvZHkucHVzaChib2R5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFuZWw7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xuXG4gICAgICAgIGxldCBpbml0VGltZURpc3BsYXkgPSBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGlmKHRpbWVEaXNwbGF5KXtcbiAgICAgICAgICAgICAgICB0aW1lRGlzcGxheS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aW1lRGlzcGxheSA9IFRpbWVEaXNwbGF5KCRjdXJyZW50LmZpbmQoXCIub3ZwLWxlZnQtY29udHJvbHNcIiksIGFwaSwgZGF0YSk7XG4gICAgICAgIH07XG4gICAgICAgIGxldCBpbml0UHJvZ3Jlc3NCYXIgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYocHJvZ3Jlc3NCYXIpe1xuICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb2dyZXNzQmFyID0gUHJvZ3Jlc3NCYXIoJGN1cnJlbnQuZmluZChcIi5vdnAtcHJvZ3Jlc3NiYXItY29udGFpbmVyXCIpLCBhcGkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHBsYXlCdXR0b24gPSBQbGF5QnV0dG9uKCRjdXJyZW50LmZpbmQoXCIub3ZwLWxlZnQtY29udHJvbHNcIiksIGFwaSk7XG4gICAgICAgIHZvbHVtZUJ1dHRvbiA9IFZvbHVtZUJ1dHRvbigkY3VycmVudC5maW5kKFwiLm92cC1sZWZ0LWNvbnRyb2xzXCIpLCBhcGkpO1xuICAgICAgICBmdWxsU2NyZWVuQnV0dG9uID0gRnVsbFNjcmVlbkJ1dHRvbigkY3VycmVudC5maW5kKFwiLm92cC1yaWdodC1jb250cm9sc1wiKSwgYXBpKTtcblxuXG4gICAgICAgIGFwaS5vbihDT05URU5UX01FVEEsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGluaXRUaW1lRGlzcGxheShkYXRhKTtcbiAgICAgICAgICAgIGlmKGRhdGEuZHVyYXRpb24gPT09IEluZmluaXR5KXtcbiAgICAgICAgICAgICAgICAvL2xpdmVcbiAgICAgICAgICAgICAgICBpZihwcm9ncmVzc0Jhcil7XG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL3ZvZFxuICAgICAgICAgICAgICAgIGluaXRQcm9ncmVzc0JhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYXBpLm9uKEVSUk9SLCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgdGVtcGxhdGUuZGVzdHJveSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy9EbyBub3RoaW5nLlxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICBcIm1vdXNlbGVhdmUgLm92cC1jb250cm9sc1wiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB2b2x1bWVCdXR0b24uc2V0TW91c2VEb3duKGZhbHNlKTtcbiAgICAgICAgICAgICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICB9LFxuICAgICAgICBcImNsaWNrIC5vdnAtc2V0dGluZy1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy90b2dnbGVcbiAgICAgICAgICAgIGlmKFNldHRpbmdQYW5lbExpc3QubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgLy9jbGVhciBhbGwgU2V0dGluZ1BhbmVsVGVtcGxhdGVcbiAgICAgICAgICAgICAgICBfLmVhY2goU2V0dGluZ1BhbmVsTGlzdCwgZnVuY3Rpb24oc2V0dGluZ1BhbmVsKXtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ1BhbmVsLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBTZXR0aW5nUGFuZWxMaXN0LnNwbGljZSgwLCBTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBTZXR0aW5nUGFuZWxMaXN0LnB1c2goU2V0dGluZ1BhbmVsKCRjdXJyZW50LCBhcGksIGdlbmVyYXRlTWFpblBhbmVsRGF0YSgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cblxuXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIkNvbnRyb2xzXCIsICBudWxsICwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9scztcbiIsIlxuY29uc3QgQ29udHJvbHMgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIm92cC1jb250cm9scy1jb250YWluZXJcIj4nK1xuICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtZ3JhZGllbnQtYm90dG9tXCI+PC9kaXY+JyArXG4gICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1ib3R0b20tcGFuZWxcIj4nICtcbiAgICAgICAgICcgICAgPGRpdiBjbGFzcz1cIm92cC1wcm9ncmVzc2Jhci1jb250YWluZXJcIj4nICtcbiAgICAgICAgICcgICAgPC9kaXY+JyArXG4gICAgICAgICAnICAgIDxkaXYgY2xhc3M9XCJvdnAtY29udHJvbHNcIj4nICtcbiAgICAgICAgICcgICAgICAgIDxkaXYgY2xhc3M9XCJvdnAtbGVmdC1jb250cm9sc1wiPicgK1xuICAgICAgICAgJyAgICAgICAgPC9kaXY+JyArXG4gICAgICAgICAnICAgICAgICA8ZGl2IGNsYXNzPVwib3ZwLXJpZ2h0LWNvbnRyb2xzXCI+JyArXG4gICAgICAgICAnICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm92cC1idXR0b24gb3ZwLXNldHRpbmctYnV0dG9uXCI+PGkgY2xhc3M9XCJvdnAtc2V0dGluZy1idXR0b24taWNvblwiPjwvaT48L2J1dHRvbj4nICtcbiAgICAgICAgICcgICAgICAgIDwvZGl2PicgK1xuICAgICAgICAgJyAgICA8L2Rpdj4nICtcbiAgICAgICAgICc8L2Rpdj4nO1xuICAgICc8L2Rpdj4nO1xuXG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbHM7XG5cblxuXG5cblxuXG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI0Li5cbiAqL1xuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xuaW1wb3J0IHtcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEVcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgUGxheUJ1dHRvbiA9IGZ1bmN0aW9uICgkY29udGFpbmVyLCBhcGkpIHtcbiAgICBsZXQgJGljb25QbGF5ID0gXCJcIixcbiAgICAgICAgJGljb25QYXVzZSA9IFwiXCIsXG4gICAgICAgICRpY29uUmVwbGF5ID0gXCJcIjtcblxuXG4gICAgbGV0IHNldEJ1dHRvblN0YXRlID0gZnVuY3Rpb24oc3RhdGUpe1xuICAgICAgICAkaWNvblBsYXkuaGlkZSgpO1xuICAgICAgICAkaWNvblBhdXNlLmhpZGUoKTtcbiAgICAgICAgJGljb25SZXBsYXkuaGlkZSgpO1xuXG4gICAgICAgIGlmKHN0YXRlID09PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgICRpY29uUGF1c2Uuc2hvdygpO1xuICAgICAgICB9ZWxzZSBpZihzdGF0ZSA9PT0gU1RBVEVfUEFVU0VEKXtcbiAgICAgICAgICAgICRpY29uUGxheS5zaG93KCk7XG4gICAgICAgIH1lbHNlIGlmKHN0YXRlID09PSBTVEFURV9DT01QTEVURSl7XG4gICAgICAgICAgICAkaWNvblBsYXkuc2hvdygpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRpY29uUGxheS5zaG93KCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cblxuXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICRpY29uUGxheSA9ICRjdXJyZW50LmZpbmQoIFwiLm92cC1wbGF5LWJ1dHRvbi1wbGF5aWNvblwiKTtcbiAgICAgICAgJGljb25QYXVzZSA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXBsYXktYnV0dG9uLXBhdXNlaWNvblwiKTtcbiAgICAgICAgJGljb25SZXBsYXkgPSAkY3VycmVudC5maW5kKFwiLm92cC1wbGF5LWJ1dHRvbi1yZXBsYXlpY29uXCIpO1xuXG4gICAgICAgIGFwaS5vbihQTEFZRVJfU1RBVEUsIGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLm5ld3N0YXRlKXtcbiAgICAgICAgICAgICAgICBzZXRCdXR0b25TdGF0ZShkYXRhLm5ld3N0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vRG8gbm90aGluZy5cbiAgICB9O1xuICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgICAgXCJjbGljayAub3ZwLXBsYXktYnV0dG9uXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSBhcGkuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IFNUQVRFX0lETEUpIHtcbiAgICAgICAgICAgICAgICBhcGkucGxheSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgICAgICBhcGkucGF1c2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YXRlID09PSBTVEFURV9QQVVTRUQpIHtcbiAgICAgICAgICAgICAgICBhcGkucGxheSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFKSB7XG4gICAgICAgICAgICAgICAgYXBpLnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiUGxheUJ1dHRvblwiLCBudWxsLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5QnV0dG9uOyIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cIm92cC1idXR0b24gb3ZwLXBsYXktYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXBsYXktYnV0dG9uLXBsYXlpY29uXCI+PC9pPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXBsYXktYnV0dG9uLXBhdXNlaWNvblwiPjwvaT4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm92cC1wbGF5LWJ1dHRvbi1yZXBsYXlpY29uXCI+PC9pPicgK1xuICAgICAgICAnPC9idXR0b24+J1xuICAgICk7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjQuLlxuICovXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XG5pbXBvcnQgU2V0dGluZ1BhbmVsTGlzdCBmcm9tICd2aWV3L2dsb2JhbC9TZXR0aW5nUGFuZWxMaXN0JztcbmltcG9ydCB7bmF0dXJhbEhtc30gZnJvbSAndXRpbHMvc3RyaW5ncydcbmltcG9ydCBMQSQgZnJvbSAndXRpbHMvbGlrZUEkJztcbmltcG9ydCB7XG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX1BBVVNFRFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBQcm9ncmVzc0JhciA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSl7XG4gICAgY29uc3QgJHJvb3QgPSBMQSQoXCIjXCIrYXBpLmdldElkKCkpO1xuICAgIGxldCBjdXJyZW50UGxheWluZ1Bvc2l0aW9uID0gMDtcbiAgICBsZXQgY3VycmVudFBsYXlpbmdQZXJjZW50YWdlID0gMDtcbiAgICBsZXQgY3VycmVudExvYWRlZFBlcmNlbnRhZ2UgPSAwO1xuXG4gICAgbGV0IG1vdXNlSW5zaWRlID0gZmFsc2UsIG1vdXNlRG93biA9IGZhbHNlO1xuXG4gICAgbGV0ICRwcm9ncmVzc0JhciA9IFwiXCIsXG4gICAgICAgICRwcm9ncmVzc0xvYWQgPSBcIlwiLFxuICAgICAgICAkcHJvZ3Jlc3NQbGF5ID0gXCJcIixcbiAgICAgICAgJHByb2dyZXNzSG92ZXIgPSBcIlwiLFxuICAgICAgICAka25vYkNvbnRhaW5lciA9IFwiXCIsXG4gICAgICAgICRrbm9iID0gXCJcIixcbiAgICAgICAga25vYldpZHRoID0gMCxcbiAgICAgICAgJHRpbWUgPSBcIlwiO1xuXG5cbiAgICBsZXQgcG9zaXRpb25FbGVtZW50cyA9IGZ1bmN0aW9uIChwZXJjZW50YWdlKSB7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSAkcHJvZ3Jlc3NCYXIud2lkdGgoKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBwcm9ncmVzc0JhcldpZHRoICogcGVyY2VudGFnZTtcblxuICAgICAgICAkcHJvZ3Jlc3NQbGF5LmNzcygnd2lkdGgnLCBwb3NpdGlvbisgJ3B4Jyk7XG4gICAgICAgICRwcm9ncmVzc0hvdmVyLmNzcygnbGVmdCcsIHBvc2l0aW9uKyAncHgnKTtcblxuICAgICAgICBjb25zdCBrbm9iUG9zdGlvbiA9IChwcm9ncmVzc0JhcldpZHRoIC0ga25vYldpZHRoKSAqIHBlcmNlbnRhZ2U7XG4gICAgICAgICRrbm9iQ29udGFpbmVyLmNzcygnbGVmdCcsIGtub2JQb3N0aW9uKyAncHgnKTtcblxuICAgICAgICBjdXJyZW50UGxheWluZ1Bvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIGN1cnJlbnRQbGF5aW5nUGVyY2VudGFnZSA9IHBlcmNlbnRhZ2U7XG4gICAgfTtcblxuICAgIGxldCBkcmF3SG92ZXJQcm9ncmVzcyA9IGZ1bmN0aW9uIChwZXJjZW50YWdlKSB7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSAkcHJvZ3Jlc3NCYXIud2lkdGgoKTtcbiAgICAgICAgY29uc3QgaG92ZXJQb3NpdGlvbiA9IHByb2dyZXNzQmFyV2lkdGggKiBwZXJjZW50YWdlO1xuXG4gICAgICAgICRwcm9ncmVzc0hvdmVyLmNzcygnd2lkdGgnLCBwZXJjZW50YWdlID09IDA/IHBlcmNlbnRhZ2UgOiAoaG92ZXJQb3NpdGlvbiAtIGN1cnJlbnRQbGF5aW5nUG9zaXRpb24pKyAncHgnKTtcbiAgICB9O1xuXG4gICAgbGV0IGRyYXdMb2FkUHJvZ3Jlc3MgPSBmdW5jdGlvbihwZXJjZW50YWdlKSB7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSAkcHJvZ3Jlc3NCYXIud2lkdGgoKTtcbiAgICAgICAgY29uc3QgbG9hZFBvc2l0aW9uID0gcHJvZ3Jlc3NCYXJXaWR0aCAqIHBlcmNlbnRhZ2U7XG5cbiAgICAgICAgJHByb2dyZXNzTG9hZC5jc3MoJ3dpZHRoJywgbG9hZFBvc2l0aW9uKyAncHgnKTtcbiAgICAgICAgY3VycmVudExvYWRlZFBlcmNlbnRhZ2UgPSBwZXJjZW50YWdlO1xuICAgIH07XG5cbiAgICBsZXQgY2FsY3VsYXRlUGVyY2VudGFnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBjb25zdCBwcm9ncmVzc0JhcldpZHRoID0gJHByb2dyZXNzQmFyLndpZHRoKCk7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyT2Zmc2V0WCA9ICRwcm9ncmVzc0Jhci5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICBjb25zdCBwb2ludGVyT2Zmc2V0WCA9IGV2ZW50LnBhZ2VYO1xuXG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSAocG9pbnRlck9mZnNldFggLSBwcm9ncmVzc0Jhck9mZnNldFgpIC8gcHJvZ3Jlc3NCYXJXaWR0aDtcblxuICAgICAgICBpZiAocGVyY2VudGFnZSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBlcmNlbnRhZ2UgPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwZXJjZW50YWdlO1xuICAgIH07XG5cbiAgICBsZXQgZHJhd1RpbWVJbmRpY2F0b3IgPSBmdW5jdGlvbiAocGVyY2VudGFnZSwgZXZlbnQpIHtcbiAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAkdGltZS5oaWRlKCk7XG4gICAgICAgICAgIHJldHVybiA7XG4gICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gYXBpLmdldER1cmF0aW9uKCk7XG4gICAgICAgIGNvbnN0IHNlY29uZCA9IGR1cmF0aW9uICogcGVyY2VudGFnZTtcblxuICAgICAgICBjb25zdCBobXMgPSBuYXR1cmFsSG1zKHNlY29uZCk7XG5cbiAgICAgICAgJHRpbWUudGV4dChobXMpO1xuXG4gICAgICAgIGNvbnN0IHRpbWVFbGVtV2lkdGggPSAkdGltZS53aWR0aCgpO1xuICAgICAgICBjb25zdCBwcm9ncmVzc0JhcldpZHRoID0gJHByb2dyZXNzQmFyLndpZHRoKCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gcHJvZ3Jlc3NCYXJXaWR0aCAqIHBlcmNlbnRhZ2U7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uT2ZQaXhlbCA9IGV2ZW50LnBhZ2VYIC0gJHByb2dyZXNzQmFyLm9mZnNldCgpLmxlZnQ7XG5cbiAgICAgICAgY29uc3QgY2FsY3VsYXRlTWFnbmV0aWMgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYocG9zaXRpb25PZlBpeGVsIDwgdGltZUVsZW1XaWR0aCAvIDIpe1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfWVsc2UgaWYocHJvZ3Jlc3NCYXJXaWR0aC1wb3NpdGlvbk9mUGl4ZWwgIDwgdGltZUVsZW1XaWR0aCAvIDIpe1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9ncmVzc0JhcldpZHRoIC0gdGltZUVsZW1XaWR0aDtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbiAtIHRpbWVFbGVtV2lkdGggLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICR0aW1lLmNzcygnbGVmdCcsIGNhbGN1bGF0ZU1hZ25ldGljKCkrIFwicHhcIik7XG4gICAgfTtcblxuICAgIGxldCBzZWVrID0gZnVuY3Rpb24gKHBlcmNlbnRhZ2UpIHtcbiAgICAgICAgYXBpLnNlZWsoIChhcGkuZ2V0RHVyYXRpb24oKXx8MCkgKiBwZXJjZW50YWdlKTtcbiAgICB9O1xuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAkcHJvZ3Jlc3NCYXIgPSAkY3VycmVudDtcbiAgICAgICAgJHByb2dyZXNzTG9hZCA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLWxvYWQtcHJvZ3Jlc3NcIik7XG4gICAgICAgICRwcm9ncmVzc1BsYXkgPSAkY3VycmVudC5maW5kKFwiLm92cC1wbGF5LXByb2dyZXNzXCIpO1xuICAgICAgICAkcHJvZ3Jlc3NIb3ZlciA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLWhvdmVyLXByb2dyZXNzXCIpO1xuICAgICAgICAka25vYkNvbnRhaW5lciA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXByb2dyZXNzYmFyLWtub2ItY29udGFpbmVyXCIpO1xuICAgICAgICAka25vYiA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXByb2dyZXNzYmFyLWtub2JcIik7XG4gICAgICAgIGtub2JXaWR0aCA9ICRrbm9iLndpZHRoKCk7XG4gICAgICAgICR0aW1lID0gJGN1cnJlbnQuZmluZChcIi5vdnAtcHJvZ3Jlc3NiYXItdGltZVwiKTtcblxuICAgICAgICBhcGkub24oJ3RpbWUnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBpZihkYXRhICYmIGRhdGEuZHVyYXRpb24gJiYgZGF0YS5wb3NpdGlvbil7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25FbGVtZW50cyhkYXRhLnBvc2l0aW9uIC8gZGF0YS5kdXJhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFwaS5vbignYnVmZmVyQ2hhbmdlZCcsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGlmKGRhdGEgJiYgZGF0YS5idWZmZXJQZXJjZW50KXtcbiAgICAgICAgICAgICAgICBkcmF3TG9hZFByb2dyZXNzKGRhdGEuYnVmZmVyUGVyY2VudCAvIDEwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XG5cbiAgICB9O1xuICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgICAgXCJyZXNpemUgd2luZG93XCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMoY3VycmVudFBsYXlpbmdQZXJjZW50YWdlKTtcbiAgICAgICAgICAgIGRyYXdMb2FkUHJvZ3Jlc3MoY3VycmVudExvYWRlZFBlcmNlbnRhZ2UpO1xuICAgICAgICB9LFxuICAgICAgICBcIm1vdXNlZW50ZXIgLm92cC1wcm9ncmVzc2JhclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBtb3VzZUluc2lkZSA9IHRydWU7XG4gICAgICAgICAgICAkcm9vdC5hZGRDbGFzcyhcIm92cC1wcm9ncmVzc2Jhci1ob3ZlclwiKTtcbiAgICAgICAgICAgICR0aW1lLnNob3coKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZWxlYXZlIC5vdnAtcHJvZ3Jlc3NiYXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbW91c2VJbnNpZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICghbW91c2VJbnNpZGUpIHtcbiAgICAgICAgICAgICAgICAkcm9vdC5yZW1vdmVDbGFzcyhcIm92cC1wcm9ncmVzc2Jhci1ob3ZlclwiKTtcbiAgICAgICAgICAgICAgICAkdGltZS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkcmF3SG92ZXJQcm9ncmVzcygwKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZWRvd24gLm92cC1wcm9ncmVzc2JhclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbW91c2VEb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBjYWxjdWxhdGVQZXJjZW50YWdlKGV2ZW50KTtcbiAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMocGVyY2VudGFnZSk7XG4gICAgICAgICAgICBkcmF3SG92ZXJQcm9ncmVzcygwKTtcbiAgICAgICAgICAgIHNlZWsocGVyY2VudGFnZSk7XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2Vtb3ZlIC5vdnAtcHJvZ3Jlc3NiYXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKCFtb3VzZURvd24pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gY2FsY3VsYXRlUGVyY2VudGFnZShldmVudCk7XG4gICAgICAgICAgICAgICAgZHJhd0hvdmVyUHJvZ3Jlc3MocGVyY2VudGFnZSk7XG4gICAgICAgICAgICAgICAgZHJhd1RpbWVJbmRpY2F0b3IocGVyY2VudGFnZSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1vdXNlbW92ZSBkb2N1bWVudFwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKG1vdXNlRG93bikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBjYWxjdWxhdGVQZXJjZW50YWdlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKHBlcmNlbnRhZ2UpO1xuICAgICAgICAgICAgICAgIGRyYXdIb3ZlclByb2dyZXNzKDApO1xuICAgICAgICAgICAgICAgIHNlZWsocGVyY2VudGFnZSk7XG4gICAgICAgICAgICAgICAgZHJhd1RpbWVJbmRpY2F0b3IocGVyY2VudGFnZSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1vdXNldXAgZG9jdW1lbnRcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYobW91c2VEb3duKXtcbiAgICAgICAgICAgICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkcm9vdC5yZW1vdmVDbGFzcyhcIm92cC1wcm9ncmVzc2Jhci1ob3ZlclwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJQcm9ncmVzc0JhclwiLCBudWxsLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjsiLCJleHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXJcIiB0YWJpbmRleD1cIjBcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXByb2dyZXNzYmFyLXBhZGRpbmdcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXByb2dyZXNzLWxpc3RcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1sb2FkLXByb2dyZXNzXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcGxheS1wcm9ncmVzcyBvdnAtcGxheS1iYWNrZ3JvdW5kLWNvbG9yXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtaG92ZXItcHJvZ3Jlc3NcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXByb2dyZXNzYmFyLWtub2ItY29udGFpbmVyXCI+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXIta25vYiBvdnAtcGxheS1iYWNrZ3JvdW5kLWNvbG9yXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXItdGltZVwiPjA6MDA8L3NwYW4+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNi4uXG4gKi9cbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcbmltcG9ydCBTZXR0aW5nUGFuZWxMaXN0IGZyb20gJ3ZpZXcvZ2xvYmFsL1NldHRpbmdQYW5lbExpc3QnO1xuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5jb25zdCBQTEFZRVJfTUlOX0hFSUdIVCA9IDIyMDtcbmNvbnN0IFNldHRpbmdQYW5lbCA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSwgZGF0YSl7XG4gICAgY29uc3QgJHJvb3QgPSBMQSQoXCIjXCIrYXBpLmdldElkKCkpO1xuXG4gICAgbGV0IGV4dHJhY3RQYW5lbERhdGEgPSBmdW5jdGlvbihwYW5lbFR5cGUpe1xuICAgICAgICBsZXQgcGFuZWwgPSB7dGl0bGUgOiBcIlwiLCBib2R5IDogW10sIHR5cGUgOiBwYW5lbFR5cGV9O1xuXG4gICAgICAgIGlmKHBhbmVsVHlwZSA9PT0gXCJwbGF5YmFja3JhdGVcIil7XG4gICAgICAgICAgICBwYW5lbC50aXRsZSA9IFwiU3BlZWRcIjtcbiAgICAgICAgICAgIGxldCBwbGF5QmFja1JhdGVzID0gYXBpLmdldENvbmZpZygpLnBsYXliYWNrUmF0ZXM7XG4gICAgICAgICAgICBsZXQgY3VycmVudFBsYXliYWNrUmF0ZSA9IGFwaS5nZXRQbGF5YmFja1JhdGUoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheUJhY2tSYXRlcy5sZW5ndGg7IGkgKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiAocGxheUJhY2tSYXRlc1tpXSA9PT0gMT8gXCJOb3JtYWxcIiA6IHBsYXlCYWNrUmF0ZXNbaV0pLFxuICAgICAgICAgICAgICAgICAgICBpc0NoZWNrIDogY3VycmVudFBsYXliYWNrUmF0ZSA9PT0gcGxheUJhY2tSYXRlc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiBwbGF5QmFja1JhdGVzW2ldXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBwYW5lbC5ib2R5LnB1c2goYm9keSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWVsc2UgaWYocGFuZWxUeXBlID09PSBcInF1YWxpdHlsZXZlbFwiKXtcbiAgICAgICAgICAgIHBhbmVsLnRpdGxlID0gXCJTb3VyY2VcIjtcblxuICAgICAgICAgICAgbGV0IHF1YWxpdHlMZXZlbHMgPSBhcGkuZ2V0UXVhbGl0eUxldmVscygpO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRRdWFsaXR5ID0gYXBpLmdldEN1cnJlbnRRdWFsaXR5KCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVhbGl0eUxldmVscy5sZW5ndGg7IGkgKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiBxdWFsaXR5TGV2ZWxzW2ldLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBpc0NoZWNrIDogY3VycmVudFF1YWxpdHkgPT09IGksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlIDogaVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcGFuZWwuYm9keS5wdXNoKGJvZHkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhbmVsO1xuICAgIH07XG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgaWYoUExBWUVSX01JTl9IRUlHSFQgPiAkcm9vdC5oZWlnaHQoKSl7XG4gICAgICAgICAgICAkcm9vdC5maW5kKFwiLm92cC1zZXR0aW5nLXBhbmVsXCIpLmNzcyhcIm1heEhlaWdodFwiLCBcIjExNHB4XCIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vRG8gbm90aGluZy5cbiAgICB9O1xuICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgICAgXCJjbGljayAub3ZwLXNldHRpbmctbWFpbi1pdGVtXCI6IGZ1bmN0aW9uIChldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IHBhbmVsVHlwZSA9IExBJChldmVudC5jdXJyZW50VGFyZ2V0KS5hdHRyKFwib3ZwLXBhbmVsLXR5cGVcIik7XG5cbiAgICAgICAgICAgIC8vcGFyZW50IG11c3QgYmUgbm90ICRjdXJyZW50IVxuICAgICAgICAgICAgU2V0dGluZ1BhbmVsTGlzdC5wdXNoKFNldHRpbmdQYW5lbCgkY29udGFpbmVyLCBhcGksIGV4dHJhY3RQYW5lbERhdGEocGFuZWxUeXBlKSkpO1xuICAgICAgICB9LFxuICAgICAgICBcImNsaWNrIC5vdnAtc2V0dGluZy10aXRsZVwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvL1JlbW92ZSBDdXJyZW50IFBhbmVsXG4gICAgICAgICAgICBsZXQgbGFzdCA9IFNldHRpbmdQYW5lbExpc3QucG9wKCk7XG4gICAgICAgICAgICBsYXN0LmRlc3Ryb3koKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJjbGljayAub3ZwLXNldHRpbmctaXRlbS12YWx1ZVwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBsZXQgcGFuZWxUeXBlID0gTEEkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJvdnAtcGFuZWwtdHlwZVwiKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IExBJChldmVudC5jdXJyZW50VGFyZ2V0KS5hdHRyKFwib3ZwLWRhdGEtdmFsdWVcIik7XG5cbiAgICAgICAgICAgIGlmKHBhbmVsVHlwZSAmJiB2YWx1ZSl7XG4gICAgICAgICAgICAgICAgaWYocGFuZWxUeXBlID09PSBcInBsYXliYWNrcmF0ZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgYXBpLnNldFBsYXliYWNrUmF0ZShwYXJzZUZsb2F0KHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYocGFuZWxUeXBlID09PSBcInF1YWxpdHlsZXZlbFwiKXtcbiAgICAgICAgICAgICAgICAgICAgYXBpLnNldEN1cnJlbnRRdWFsaXR5KHBhcnNlSW50KHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9jbGVhciBhbGwgU2V0dGluZ1BhbmVsVGVtcGxhdGVcbiAgICAgICAgICAgICAgICBfLmVhY2goU2V0dGluZ1BhbmVsTGlzdCwgZnVuY3Rpb24oc2V0dGluZ1BhbmVsKXtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ1BhbmVsLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBTZXR0aW5nUGFuZWxMaXN0LnNwbGljZSgwLCBTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiU2V0dGluZ1BhbmVsXCIsIGRhdGEsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ1BhbmVsOyIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChkYXRhKSA9PiB7XG4gICAgbGV0IGVsZW1lbnRzID0gJzxkaXYgY2xhc3M9XCJvdnAtc2V0dGluZy1wYW5lbCAnKyhkYXRhLmlzTWFpbiA/ICdhbmltYXRlZCBmYWRlSW4nOiAnJykrJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtc2V0dGluZy10aXRsZS1jb250YWluZXJcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1zZXR0aW5nLXRpdGxlXCIgdGFiaW5kZXg9XCIwXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkYXRhLmlzTWFpbiA/ICcnIDogJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctdGl0bGUtcHJldmljb25cIj4mbHQ7PC9zcGFuPicpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctdGl0bGUtdGl0bGVcIj4nK2RhdGEudGl0bGUrJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbS1jb250YWluZXJcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChkYXRhLmJvZHksIGZ1bmN0aW9uKGJvZHkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmlzTWFpbil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyArPSBzZXR0aW5nSXRlbVRlbXBsYXRlKGJvZHkudGl0bGUsIGJvZHkudmFsdWUsIGJvZHkudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgKz0gc2V0dGluZ1ZhbHVlVGVtcGxhdGUoYm9keS50aXRsZSwgYm9keS52YWx1ZSwgZGF0YS50eXBlLCBib2R5LmlzQ2hlY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgZWxlbWVudHMrPSAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgIHJldHVybiBlbGVtZW50cztcbn07XG5cbmV4cG9ydCBjb25zdCBzZXR0aW5nSXRlbVRlbXBsYXRlID0gKHRpdGxlLCB2YWx1ZSwgdHlwZSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbSBvdnAtc2V0dGluZy1tYWluLWl0ZW1cIiBvdnAtcGFuZWwtdHlwZT1cIicrdHlwZSsnXCI+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtLXRpdGxlXCI+Jyt0aXRsZSsnPC9zcGFuPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbS1uZXh0aWNvblwiPiZndDs8L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtLXZhbHVlXCI+Jyt2YWx1ZSsnPC9zcGFuPicgK1xuICAgICAgICAnPC9kaXY+J1xuICAgICk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0dGluZ1ZhbHVlVGVtcGxhdGUgPSAodGl0bGUsIHZhbHVlLCB0eXBlLCBpc0NoZWNrKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtIG92cC1zZXR0aW5nLWl0ZW0tdmFsdWVcIiBvdnAtcGFuZWwtdHlwZT1cIicrdHlwZSsnXCIgb3ZwLWRhdGEtdmFsdWU9XCInK3ZhbHVlKydcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0tY2hlY2tlZCAnKyhpc0NoZWNrPydvdnAtc2hvdyc6JycpKydcIj4mI3gyNzEzOzwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0tdGl0bGVcIj4nK3RpdGxlKyc8L3NwYW4+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNS4uXG4gKi9cbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcbmltcG9ydCB7bmF0dXJhbEhtc30gZnJvbSAndXRpbHMvc3RyaW5ncyc7XG5cbmNvbnN0IFRpbWVEaXNwbGF5ID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpLCBkYXRhKXtcblxuICAgIGxldCAkcG9zaXRpb24gPSBcIlwiLCAkZHVyYXRpb24gPSBcIlwiO1xuICAgIGxldCBjb252ZXJ0SHVtYW5pemVUaW1lID0gZnVuY3Rpb24odGltZSl7XG4gICAgICAgIHJldHVybiBuYXR1cmFsSG1zKHRpbWUpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgJHBvc2l0aW9uID0gJGN1cnJlbnQuZmluZCgnLm92cC10aW1lLWN1cnJlbnQnKTtcbiAgICAgICAgJGR1cmF0aW9uID0gJGN1cnJlbnQuZmluZCgnLm92cC10aW1lLWR1cmF0aW9uJyk7XG5cbiAgICAgICAgaWYoZGF0YS5kdXJhdGlvbiAhPT0gSW5maW5pdHkpe1xuXG4gICAgICAgICAgICAkZHVyYXRpb24udGV4dChjb252ZXJ0SHVtYW5pemVUaW1lKGRhdGEuZHVyYXRpb24pKTtcbiAgICAgICAgICAgIGFwaS5vbigndGltZScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkcG9zaXRpb24udGV4dChjb252ZXJ0SHVtYW5pemVUaW1lKGRhdGEucG9zaXRpb24pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy9EbyBub3RoaW5nLlxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuXG4gICAgfTtcblxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJUaW1lRGlzcGxheVwiLCBkYXRhLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFRpbWVEaXNwbGF5OyIsImV4cG9ydCBkZWZhdWx0IChkYXRhKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdGltZS1kaXNwbGF5XCI+JytcbiAgICAgICAgICAgIChkYXRhLmR1cmF0aW9uID09PSBJbmZpbml0eVxuICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAoJzxidXR0b24gY2xhc3M9XCJvdnAtbGl2ZS1iYWRnZSBvdnAtYnV0dG9uXCIgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiPicgK1xuICAgICAgICAgICAgICAgICAgICAoZGF0YS50eXBlID09J3dlYnJ0YydcbiAgICAgICAgICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1saXZlLWJhZGdlLWxvd2xhdGVuY3lcIj5sb3cgbGF0ZW5jeSBsaXZlPC9zcGFuPidcbiAgICAgICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj5saXZlPC9zcGFuPicpICtcbiAgICAgICAgICAgICAgICAnPC9idXR0b24+JylcbiAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgKCc8c3BhbiBjbGFzcz1cIm92cC10aW1lLWN1cnJlbnRcIj4wOjAwPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtdGltZS1zZXBhcmF0b3JcIj4gLyA8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC10aW1lLWR1cmF0aW9uXCI+MDowMDwvc3Bhbj4nKVxuICAgICAgICAgICAgKSArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMC4uXG4gKi9cbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcblxuY29uc3QgVm9sdW1lQnV0dG9uID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpKXtcblxuICAgIGxldCAkc2xpZGVyQ29udGFpbmVyID0gXCJcIixcbiAgICAgICAgJHNsaWRlciA9IFwiXCIsXG4gICAgICAgICRzbGlkZXJIYW5kbGUgPSBcIlwiLFxuICAgICAgICAkc2xpZGVyVmFsdWUgPSBcIlwiLFxuICAgICAgICAkdm9sdW1lSWNvbkJpZyA9IFwiXCIsXG4gICAgICAgICR2b2x1bWVJY29uU21hbGwgPSBcIlwiLFxuICAgICAgICAkdm9sdW1lSWNvbk11dGUgPSBcIlwiO1xuICAgIGxldCBtb3VzZURvd24gPSBmYWxzZTtcbiAgICBsZXQgc2xpZGVyV2lkdGggPSA3MCwgIGhhbmRsZVdpZHRoID0gMCwgbWluUmFuZ2UgPSAwLCBtYXhSYW5nZSA9IDA7XG5cblxuICAgIC8qcHJpdmF0ZSBmdW5jdGlvbnMqL1xuICAgIGxldCBzZXRWb2x1bWVJY29uID0gZnVuY3Rpb24ocGVyY2VudGFnZSkge1xuICAgICAgICAkdm9sdW1lSWNvbkJpZy5oaWRlKCk7XG4gICAgICAgICR2b2x1bWVJY29uU21hbGwuaGlkZSgpO1xuICAgICAgICAkdm9sdW1lSWNvbk11dGUuaGlkZSgpO1xuXG4gICAgICAgIGlmIChwZXJjZW50YWdlID49IDUwKSB7XG4gICAgICAgICAgICAkdm9sdW1lSWNvbkJpZy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSBpZiAocGVyY2VudGFnZSA8IDUwICYmIHBlcmNlbnRhZ2UgPiAwKSB7XG4gICAgICAgICAgICAkdm9sdW1lSWNvblNtYWxsLnNob3coKTtcbiAgICAgICAgfSBlbHNlIGlmIChwZXJjZW50YWdlID09IDApIHtcbiAgICAgICAgICAgICR2b2x1bWVJY29uTXV0ZS5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgc2V0Vm9sdW1lVUkgPSBmdW5jdGlvbihwZXJjZW50YWdlKSB7XG4gICAgICAgIGlmIChhcGkuZ2V0TXV0ZSgpKSB7XG4gICAgICAgICAgICBwZXJjZW50YWdlID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFZvbHVtZUljb24ocGVyY2VudGFnZSk7XG5cbiAgICAgICAgY29uc3QgaGFuZGxlUG9zaXRpb24gPSBtYXhSYW5nZSAqIHBlcmNlbnRhZ2UgLyAxMDA7XG5cbiAgICAgICAgJHNsaWRlckhhbmRsZS5jc3MoJ2xlZnQnLCBoYW5kbGVQb3NpdGlvbisgJ3B4Jyk7XG4gICAgICAgICRzbGlkZXJWYWx1ZS5jc3MoJ3dpZHRoJywgaGFuZGxlUG9zaXRpb24rICdweCcpO1xuICAgIH1cblxuICAgIGxldCBjYWxjdWxhdGVQZXJjZW50YWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHJlbGF0aXZlWCA9IGV2ZW50LnBhZ2VYIC0gJHNsaWRlci5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICBsZXQgcGVyY2VudGFnZSA9IHJlbGF0aXZlWCAvIHNsaWRlcldpZHRoICogMTAwO1xuXG4gICAgICAgIGlmIChwZXJjZW50YWdlIDwgMCkge1xuICAgICAgICAgICAgcGVyY2VudGFnZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGVyY2VudGFnZSA+IDEwMCkge1xuICAgICAgICAgICAgcGVyY2VudGFnZSA9IDEwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwZXJjZW50YWdlO1xuICAgIH1cblxuXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICRzbGlkZXJDb250YWluZXIgPSAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lclwiKTtcbiAgICAgICAgJHNsaWRlciA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1zaWxkZXJcIik7XG4gICAgICAgICRzbGlkZXJIYW5kbGUgPSAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZVwiKTtcbiAgICAgICAgJHNsaWRlclZhbHVlID0gJGN1cnJlbnQuZmluZChcIi5vdnAtdm9sdW1lLXNsaWRlci12YWx1ZVwiKTtcblxuICAgICAgICAkdm9sdW1lSWNvbkJpZyA9ICRjdXJyZW50LmZpbmQoIFwiLm92cC12b2x1bWUtYnV0dG9uLWJpZ2ljb25cIik7XG4gICAgICAgICR2b2x1bWVJY29uU21hbGwgPSAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtYnV0dG9uLXNtYWxsaWNvblwiKTtcbiAgICAgICAgJHZvbHVtZUljb25NdXRlID0gJGN1cnJlbnQuZmluZChcIi5vdnAtdm9sdW1lLWJ1dHRvbi1tdXRlaWNvblwiKTtcblxuICAgICAgICBoYW5kbGVXaWR0aCA9ICRzbGlkZXJIYW5kbGUud2lkdGgoKTtcbiAgICAgICAgbWF4UmFuZ2UgPSBzbGlkZXJXaWR0aCAtIGhhbmRsZVdpZHRoO1xuXG4gICAgICAgIGFwaS5vbigncmVhZHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFZvbHVtZVVJKGFwaS5nZXRWb2x1bWUoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBhcGkub24oJ3ZvbHVtZUNoYW5nZWQnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBzZXRWb2x1bWVVSShkYXRhLnZvbHVtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBhcGkub24oJ211dGUnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5tdXRlKSB7XG4gICAgICAgICAgICAgICAgc2V0Vm9sdW1lVUkoMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFZvbHVtZVVJKGFwaS5nZXRWb2x1bWUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XG5cbiAgICB9O1xuICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgICAgXCJjbGljayAub3ZwLXZvbHVtZS1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKGFwaS5nZXRWb2x1bWUoKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGFwaS5zZXRNdXRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBhcGkuc2V0Vm9sdW1lKDEwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFwaS5zZXRNdXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2VlbnRlciAub3ZwLXZvbHVtZS1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICRzbGlkZXJDb250YWluZXIuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2VsZWF2ZSAub3ZwLXZvbHVtZS1zaWxkZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbW91c2VEb3duID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2Vkb3duIC5vdnAtdm9sdW1lLXNpbGRlclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbW91c2VEb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIGFwaS5zZXRNdXRlKGZhbHNlKTtcbiAgICAgICAgICAgIGFwaS5zZXRWb2x1bWUoY2FsY3VsYXRlUGVyY2VudGFnZShldmVudCkpO1xuICAgICAgICB9LFxuICAgICAgICBcIm1vdXNldXAgLm92cC12b2x1bWUtc2lsZGVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZW1vdmUgLm92cC12b2x1bWUtc2lsZGVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW1vdXNlRG93bikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXBpLnNldFZvbHVtZShjYWxjdWxhdGVQZXJjZW50YWdlKGV2ZW50KSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiVm9sdW1lQnV0dG9uXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQpLCB7XG4gICAgICAgIHNldE1vdXNlRG93bjogZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICBtb3VzZURvd24gPSBzdGF0ZTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVm9sdW1lQnV0dG9uO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjAuLlxuICovXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdm9sdW1lLWNvbnRyb2xsZXJcIj4nK1xuICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJvdnAtYnV0dG9uIG92cC12b2x1bWUtYnV0dG9uXCI+JyArXG4gICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXZvbHVtZS1idXR0b24tYmlnaWNvblwiPjwvaT4nICtcbiAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtdm9sdW1lLWJ1dHRvbi1zbWFsbGljb25cIj48L2k+JyArXG4gICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXZvbHVtZS1idXR0b24tbXV0ZWljb25cIj48L2k+JyArXG4gICAgICAgICAgICAnPC9idXR0b24+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lclwiPicgK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXZvbHVtZS1zaWxkZXJcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdm9sdW1lLXNsaWRlci1iZ1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC12b2x1bWUtc2xpZGVyLXZhbHVlXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXZvbHVtZS1zbGlkZXItaGFuZGxlXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAxOS4uXG4gKi9cblxuaW1wb3J0IFRlbXBsYXRlcyBmcm9tIFwidmlldy9lbmdpbmUvVGVtcGxhdGVzXCI7XG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgaXMgc2ltcGxlIHVpIHJlbmRlcmVyLiBUaGlzIHJldHVybnMgb25SZW5kZXJlZCBjYWxsYmFjaywgb25EZXN0cm95ZWQgY2FsbGJhY2sgb24gVGVtcGxhdGUuIEFuZCB0aGlzIGJpbmQgZXZlbnRzIGZvciBUZW1wbGF0ZXMuXG4gKiBAcGFyYW0gICBjb250YWluZXIgIGRvbSBlbGVtZW50IG9yIExBJCBvYmplY3RcbiAqIEBwYXJhbSAgIHRlbXBsYXRlTmFtZSAgICB0ZW1wbGF0ZU5hbWVcbiAqIEBwYXJhbSAgIGRhdGEgICAgcHJlbG9hZCBkYXRhXG4gKiBAcGFyYW0gICBldmVudHMgICAgVGVtcGxhdGUncyBldmVudHMuXG4gKiBAcGFyYW0gICBvblJlbmRlcmVkICAgIFRoaXMgY2FsbGJhY2sgb2NjdXJzIGFmdGVyIGFwcGVuZCB0ZW1wbGF0ZS5cbiAqIEBwYXJhbSAgIG9uRGVzdHJveWVkICAgIFRoaXMgY2FsbGJhY2sgb2NjdXJzIGFmdGVyIGRlc3Ryb3llZCB0ZW1wbGF0ZS5cbiAqIEBwYXJhbSAgIGlzUm9vdFxuICpcbiAqICovXG5jb25zdCBPdmVuVGVtcGxhdGUgPSBmdW5jdGlvbiAoY29udGFpbmVyLCB0ZW1wbGF0ZU5hbWUsIGRhdGEsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQsIGlzUm9vdCkge1xuICAgIGxldCAkY29udGFpbmVyID0gXy5pc0VsZW1lbnQoY29udGFpbmVyKSA/IExBJChjb250YWluZXIpIDogY29udGFpbmVyO1xuICAgIGxldCAkdGVtcGxhdGU7XG4gICAgbGV0IHZpZXdFdmVudHMgPSB7fTtcbiAgICBsZXQgdGhhdCA9IHt9O1xuXG4gICAgbGV0IGNyZWF0ZUFuZFNlbGVjdEVsZW1lbnQgPSBmdW5jdGlvbiAoaHRtbCkge1xuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5ld0VsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICAkdGVtcGxhdGUgPSBMQSQobmV3RWxlbWVudC5maXJzdENoaWxkKTtcblxuICAgICAgICByZXR1cm4gbmV3RWxlbWVudC5maXJzdENoaWxkO1xuICAgIH1cblxuICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgJGNvbnRhaW5lci5yZXBsYWNlKGNyZWF0ZUFuZFNlbGVjdEVsZW1lbnQoVGVtcGxhdGVzW3RlbXBsYXRlTmFtZSArIFwiVGVtcGxhdGVcIl0oZGF0YSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkY29udGFpbmVyLmFwcGVuZChjcmVhdGVBbmRTZWxlY3RFbGVtZW50KFRlbXBsYXRlc1t0ZW1wbGF0ZU5hbWUgKyBcIlRlbXBsYXRlXCJdKGRhdGEpKSk7XG4gICAgfVxuXG4gICAgaWYgKG9uUmVuZGVyZWQpIHtcbiAgICAgICAgb25SZW5kZXJlZCgkdGVtcGxhdGUsIHRoYXQpO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKGV2ZW50cykuZm9yRWFjaChldmVudFN0cmluZyA9PiB7XG4gICAgICAgIGxldCBleHBsb2RlZFRleHQgPSBldmVudFN0cmluZy5zcGxpdChcIiBcIik7XG4gICAgICAgIGxldCBldmVudE5hbWUgPSBleHBsb2RlZFRleHRbMF0ucmVwbGFjZSgvIC9naSwgXCJcIik7XG4gICAgICAgIGxldCB0YXJnZXQgPSBleHBsb2RlZFRleHRbMV0ucmVwbGFjZSgvIC9naSwgXCJcIik7XG5cbiAgICAgICAgbGV0ICR0YXJnZXQgPSBcIlwiO1xuXG4gICAgICAgIGlmKHRhcmdldCA9PT0gXCJkb2N1bWVudFwiIHx8IHRhcmdldCA9PT0gXCJ3aW5kb3dcIil7XG4gICAgICAgICAgICAkdGFyZ2V0ID0gTEEkKHRhcmdldCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJHRhcmdldCA9ICR0ZW1wbGF0ZS5maW5kKHRhcmdldCkgfHwgKCR0ZW1wbGF0ZS5oYXNDbGFzcyh0YXJnZXQucmVwbGFjZShcIi5cIixcIlwiKSkgPyAkdGVtcGxhdGUgOiBudWxsKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKGV2ZW50TmFtZSAmJiB0YXJnZXQgJiYgJHRhcmdldCkge1xuICAgICAgICAgICAgbGV0IGlkID0gT2JqZWN0LmtleXModmlld0V2ZW50cykubGVuZ3RoKys7XG5cbiAgICAgICAgICAgIC8vYmVjYXVzZSBJdCByZXR1bnMgYW5vdGhlciBkYXRhLlxuICAgICAgICAgICAgbGV0IHdyYXBwZWRGdW5jID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50c1tldmVudFN0cmluZ10oZXZlbnQsICR0ZW1wbGF0ZSwgdGhhdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmlld0V2ZW50c1tpZF0gPSB7bmFtZTogZXZlbnROYW1lLCB0YXJnZXQ6IHRhcmdldCwgY2FsbGJhY2s6IHdyYXBwZWRGdW5jfTtcblxuICAgICAgICAgICAgLy9zb21ldGltZXMgdGFyZ2V0IGlzIE5vZGVMaXN0XG4gICAgICAgICAgICBpZigkdGFyZ2V0LmdldCgpLmZvckVhY2gpe1xuICAgICAgICAgICAgICAgICR0YXJnZXQuZ2V0KCkuZm9yRWFjaChmdW5jdGlvbigkaXRlbSl7XG4gICAgICAgICAgICAgICAgICAgICRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB3cmFwcGVkRnVuYyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LmdldCgpLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB3cmFwcGVkRnVuYyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHZpZXdFdmVudHMpLmZvckVhY2goaWQgPT4ge1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gdmlld0V2ZW50c1tpZF07XG4gICAgICAgICAgICBsZXQgJHRhcmdldCA9IFwiXCI7XG5cbiAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldCA9PT0gXCJkb2N1bWVudFwiIHx8IGV2ZW50LnRhcmdldCA9PT0gXCJ3aW5kb3dcIil7XG4gICAgICAgICAgICAgICAgJHRhcmdldCA9IExBJChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHRhcmdldCA9ICR0ZW1wbGF0ZS5maW5kKGV2ZW50LnRhcmdldCkgfHwgKCR0ZW1wbGF0ZS5oYXNDbGFzcyhldmVudC50YXJnZXQucmVwbGFjZShcIi5cIixcIlwiKSkgPyAkdGVtcGxhdGUgOiBudWxsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9zb21ldGltZXMgdGFyZ2V0IGlzIE5vZGVMaXN0XG4gICAgICAgICAgICBpZigkdGFyZ2V0LmdldCgpLmZvckVhY2gpe1xuICAgICAgICAgICAgICAgICR0YXJnZXQuZ2V0KCkuZm9yRWFjaChmdW5jdGlvbigkaXRlbSl7XG4gICAgICAgICAgICAgICAgICAgICRpdGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQubmFtZSwgZXZlbnQuY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHRhcmdldC5nZXQoKS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50Lm5hbWUsIGV2ZW50LmNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsZXRlIHZpZXdFdmVudHNbaWRdO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZigkdGVtcGxhdGUpe1xuICAgICAgICAgICAgJHRlbXBsYXRlLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9uRGVzdHJveWVkKSB7XG4gICAgICAgICAgICBvbkRlc3Ryb3llZCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBPdmVuVGVtcGxhdGU7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjAuLlxuICovXG5pbXBvcnQgVGV4dFZpZXdUZW1wbGF0ZSBmcm9tICd2aWV3L2V4YW1wbGUvbWFpblRlbXBsYXRlJztcbmltcG9ydCBWaWV3VGVtcGxhdGUgZnJvbSAndmlldy92aWV3VGVtcGxhdGUnO1xuaW1wb3J0IEhlbHBlclRlbXBsYXRlIGZyb20gJ3ZpZXcvaGVscGVyL21haW5UZW1wbGF0ZSc7XG5pbXBvcnQgQmlnQnV0dG9uVGVtcGxhdGUgZnJvbSAndmlldy9oZWxwZXIvYmlnQnV0dG9uVGVtcGxhdGUnO1xuaW1wb3J0IE1lc3NhZ2VCb3hUZW1wbGF0ZSBmcm9tICd2aWV3L2hlbHBlci9tZXNzYWdlQm94VGVtcGxhdGUnO1xuaW1wb3J0IFNwaW5uZXJUZW1wbGF0ZSBmcm9tICd2aWV3L2hlbHBlci9zcGlubmVyVGVtcGxhdGUnO1xuaW1wb3J0IENvbnRleHRQYW5lbFRlbXBsYXRlIGZyb20gJ3ZpZXcvaGVscGVyL2NvbnRleHRQYW5lbFRlbXBsYXRlJztcblxuaW1wb3J0IENvbnRyb2xzVGVtcGxhdGUgZnJvbSAndmlldy9jb250cm9scy9tYWluVGVtcGxhdGUnO1xuaW1wb3J0IFZvbHVtZUJ1dHRvblRlbXBsYXRlIGZyb20gJ3ZpZXcvY29udHJvbHMvdm9sdW1lQnV0dG9uVGVtcGxhdGUnO1xuaW1wb3J0IFByb2dyZXNzQmFyVGVtcGxhdGUgZnJvbSAndmlldy9jb250cm9scy9wcm9ncmVzc0JhclRlbXBsYXRlJztcbmltcG9ydCBQbGF5QnV0dG9uVGVtcGxhdGUgZnJvbSAndmlldy9jb250cm9scy9wbGF5QnV0dG9uVGVtcGxhdGUnO1xuaW1wb3J0IFRpbWVEaXNwbGF5VGVtcGxhdGUgZnJvbSAndmlldy9jb250cm9scy90aW1lRGlzcGxheVRlbXBsYXRlJztcbmltcG9ydCBGdWxsU2NyZWVuQnV0dG9uVGVtcGxhdGUgZnJvbSAndmlldy9jb250cm9scy9mdWxsU2NyZWVuQnV0dG9uVGVtcGxhdGUnO1xuaW1wb3J0IFNldHRpbmdQYW5lbFRlbXBsYXRlIGZyb20gJ3ZpZXcvY29udHJvbHMvc2V0dGluZ1BhbmVsVGVtcGxhdGUnO1xuXG5jb25zdCBUZW1wbGF0ZXMgPSB7XG4gICAgVGV4dFZpZXdUZW1wbGF0ZSxcbiAgICBWaWV3VGVtcGxhdGUsXG4gICAgSGVscGVyVGVtcGxhdGUsXG4gICAgQmlnQnV0dG9uVGVtcGxhdGUsXG4gICAgTWVzc2FnZUJveFRlbXBsYXRlLFxuICAgIFNwaW5uZXJUZW1wbGF0ZSxcbiAgICBDb250ZXh0UGFuZWxUZW1wbGF0ZSxcblxuICAgIENvbnRyb2xzVGVtcGxhdGUsXG4gICAgVm9sdW1lQnV0dG9uVGVtcGxhdGUsXG4gICAgUHJvZ3Jlc3NCYXJUZW1wbGF0ZSxcbiAgICBQbGF5QnV0dG9uVGVtcGxhdGUsXG4gICAgVGltZURpc3BsYXlUZW1wbGF0ZSxcbiAgICBGdWxsU2NyZWVuQnV0dG9uVGVtcGxhdGUsXG4gICAgU2V0dGluZ1BhbmVsVGVtcGxhdGVcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRlbXBsYXRlczsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAxOS4uXG4gKi9cblxuY29uc3QgVGV4dFZpZXdUZW1wbGF0ZSA9IGZ1bmN0aW9uKHRleHQpe1xuICAgIHJldHVybiAnPGRpdiBjbGFzcz1cInRleHRWaWV3XCIgc3R5bGU9XCJwYWRkaW5nIDogNXB4OyBiYWNrZ3JvdW5kOiByZWRcIj4nICtcbiAgICAgICAgICAgICAgICAnPGgzPicrdGV4dCsnPC9oMz4nICtcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5cIj7ri6vquLA8L2J1dHRvbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVGV4dFZpZXdUZW1wbGF0ZTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNi4uXG4gKi9cbmNvbnN0IFNldHRpbmdQYW5lbExpc3QgPSBbXTtcblxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ1BhbmVsTGlzdDsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNC4uXG4gKi9cbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcbmltcG9ydCB7XG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX1BBVVNFRFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBCaWdCdXR0b24gPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGksIHBsYXllclN0YXRlKXtcblxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY29udGFpbmVyLCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAvL0RvIG5vdGhpbmchXG4gICAgfTtcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vRG8gbm90aGluZyFcbiAgICB9O1xuICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgICAgLypcImNsaWNrIC5vdnAtYmlnYnV0dG9uLWNvbnRhaW5lclwiIDogZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFN0YXRlID0gYXBpLmdldFN0YXRlKCk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFN0YXRlID09PSBTVEFURV9JRExFIHx8IGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfUEFVU0VEIHx8IGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfQ09NUExFVEUpIHtcbiAgICAgICAgICAgICAgICBhcGkucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ki9cbiAgICB9O1xuXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIkJpZ0J1dHRvblwiLCBwbGF5ZXJTdGF0ZSwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQmlnQnV0dG9uOyIsImltcG9ydCB7XG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1Jcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCAocGxheWVyU3RhdGUpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1iaWdidXR0b24tY29udGFpbmVyIFwiPicgKyAgICAgIC8vYW5pbWF0ZWQgYm91bmNlSW5cbiAgICAgICAgICAgIChwbGF5ZXJTdGF0ZSA9PT0gU1RBVEVfUExBWUlORyA/ICc8aSBjbGFzcz1cIm92cC1iaWdidXR0b24gb3ZwLWJpZ2J1dHRvbi1wYXVzZVwiPjwvaT4nIDogJycpICtcbiAgICAgICAgICAgIChwbGF5ZXJTdGF0ZSA9PT0gU1RBVEVfUEFVU0VEICA/ICc8aSBjbGFzcz1cIm92cC1iaWdidXR0b24gb3ZwLWJpZ2J1dHRvbi1wbGF5XCI+PC9pPicgOiAnJykgK1xuICAgICAgICAgICAgKHBsYXllclN0YXRlID09PSBTVEFURV9DT01QTEVURSA/ICc8aSBjbGFzcz1cIm92cC1iaWdidXR0b24gb3ZwLWJpZ2J1dHRvbi1yZXBsYXlcIj48L2k+JyA6ICcnKSArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMS4uXG4gKi9cbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcbmltcG9ydCBMQSQgZnJvbSAndXRpbHMvbGlrZUEkJztcblxuY29uc3QgQ29udGV4dFBhbmVsID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpLCBwb3NpdGlvbil7XG4gICAgY29uc3QgJHJvb3QgPSBMQSQoXCIjXCIrYXBpLmdldElkKCkpO1xuXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgIGNvbnN0IHBhbmVsV2lkdGggPSAkY3VycmVudC53aWR0aCgpO1xuICAgICAgICBjb25zdCBwYW5lbEhlaWdodCA9ICRjdXJyZW50LmhlaWdodCgpO1xuXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLm1pbihwb3NpdGlvbi5wYWdlWCAtICRyb290Lm9mZnNldCgpLmxlZnQsICRyb290LndpZHRoKCkgLSBwYW5lbFdpZHRoKTtcbiAgICAgICAgY29uc3QgeSA9IE1hdGgubWluKHBvc2l0aW9uLnBhZ2VZIC0gJHJvb3Qub2Zmc2V0KCkudG9wLCAkcm9vdC5oZWlnaHQoKSAtIHBhbmVsSGVpZ2h0KTtcblxuICAgICAgICAkY3VycmVudC5jc3MoXCJsZWZ0XCIgLCB4ICsgXCJweFwiKTtcbiAgICAgICAgJGN1cnJlbnQuY3NzKFwidG9wXCIgLCB5ICsgXCJweFwiKTtcbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy9EbyBub3RoaW5nLlxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICBcImNsaWNrIC5vdnAtY29udGV4dC1pdGVtXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKFxuICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vQWlyZW5Tb2Z0L092ZW5QbGF5ZXInLFxuICAgICAgICAgICAgICAgICdfYmxhbmsnXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJDb250ZXh0UGFuZWxcIiwgcG9zaXRpb24sIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udGV4dFBhbmVsOyIsImltcG9ydCB7dmVyc2lvbn0gZnJvbSAndmVyc2lvbic7XG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtY29udGV4dC1wYW5lbCBhbmltYXRlZCBmYWRlSW5cIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWNvbnRleHQtaXRlbVwiIHRhYmluZGV4PVwiMFwiPicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1jb250ZXh0LWl0ZW0tdGV4dFwiPkhlbHA8L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWNvbnRleHQtaXRlbVwiIHRhYmluZGV4PVwiMVwiPicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1jb250ZXh0LWl0ZW0tdGV4dFwiPkFib3V0IE92ZW5QbGF5ZXIgJyt2ZXJzaW9uKyc8L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZGl2PidcbiAgICApO1xufTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNC4uXG4gKi9cbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcbmltcG9ydCBCaWdCdXR0b24gZnJvbSAndmlldy9oZWxwZXIvYmlnQnV0dG9uJztcbmltcG9ydCBNZXNzYWdlQm94IGZyb20gJ3ZpZXcvaGVscGVyL21lc3NhZ2VCb3gnO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSAndmlldy9oZWxwZXIvc3Bpbm5lcic7XG5cbmltcG9ydCB7XG4gICAgUkVBRFksXG4gICAgRVJST1IsXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgUExBWUVSX1NUQVRFLFxuICAgIE5FVFdPUktfVU5TVEFCTEVEXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IEhlbHBlciA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSl7XG4gICAgbGV0IGJpZ0J1dHRvbiA9IFwiXCIsIG1lc3NhZ2VCb3ggPSBcIlwiLCBzcGlubmVyID0gXCJcIjtcblxuXG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgbGV0IGNyZWF0ZUJpZ0J1dHRvbiA9IGZ1bmN0aW9uKHN0YXRlKXtcbiAgICAgICAgICAgIGlmKGJpZ0J1dHRvbil7XG4gICAgICAgICAgICAgICAgYmlnQnV0dG9uLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpZ0J1dHRvbiA9IEJpZ0J1dHRvbigkY3VycmVudCwgYXBpLCBzdGF0ZSk7XG4gICAgICAgIH07XG4gICAgICAgIGxldCBjcmVhdGVNZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSwgd2l0aFRpbWVyKXtcbiAgICAgICAgICAgIGlmKG1lc3NhZ2VCb3gpe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VCb3guZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWVzc2FnZUJveCA9IE1lc3NhZ2VCb3goJGN1cnJlbnQsIGFwaSwgbWVzc2FnZSwgd2l0aFRpbWVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgc3Bpbm5lciA9IFNwaW5uZXIoJGN1cnJlbnQsIGFwaSk7XG5cbiAgICAgICAgYXBpLm9uKFJFQURZLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNyZWF0ZUJpZ0J1dHRvbihTVEFURV9QQVVTRUQpO1xuICAgICAgICB9KTtcbiAgICAgICAgYXBpLm9uKFBMQVlFUl9TVEFURSwgZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBpZihkYXRhICYmIGRhdGEubmV3c3RhdGUpe1xuICAgICAgICAgICAgICAgIGlmKGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgICAgICAgICBiaWdCdXR0b24uZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICBzcGlubmVyLnNob3coZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVCaWdCdXR0b24oZGF0YS5uZXdzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX1NUQUxMRUQgfHwgZGF0YS5uZXdzdGF0ZSA9PT0gU1RBVEVfTE9BRElORyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bpbm5lci5zaG93KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwaW5uZXIuc2hvdyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhcGkub24oRVJST1IsIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gMTAwKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdJbml0aWFsaXphdGlvbiBmYWlsZWQuJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IuY29kZSA9PT0gMzAxKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdNZWRpYSBwbGF5YmFjayB3YXMgY2FuY2VsZWQuJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IuY29kZSA9PT0gMzAyKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdTb21lIG9mIHRoZSBtZWRpYSBjb3VsZCBub3QgYmUgZG93bmxvYWRlZCBkdWUgdG8gYSBuZXR3b3JrIGVycm9yLic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLmNvZGUgPT09IDMwMykge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0Lic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLmNvZGUgPT09IDMwNCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnTWVkaWEgcGxheWJhY2sgaGFzIGJlZW4gY2FuY2VsZWQuIEl0IGxvb2tzIGxpa2UgeW91ciBtZWRpYSBpcyBjb3JydXB0ZWQgb3IgeW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIGZlYXR1cmVzIHlvdXIgbWVkaWEgdXNlcy4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJzZUludChlcnJvci5jb2RlLzEwMCkgPT09IDUpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ0Nvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeSBzZXJ2ZXIgZmFpbGVkLic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnQ2FuIG5vdCBwbGF5IGR1ZSB0byB1bmtub3duIHJlYXNvbnMuJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3JlYXRlTWVzc2FnZShtZXNzYWdlLCBudWxsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXBpLm9uKE5FVFdPUktfVU5TVEFCTEVELCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9ICdCZWNhdXNlIHRoZSBuZXR3b3JrIGNvbm5lY3Rpb24gaXMgdW5zdGFibGUsIHRoZSBmb2xsb3dpbmcgbWVkaWEgc291cmNlIHdpbGwgYmUgcGxheWVkLic7XG5cbiAgICAgICAgICAgIGlmKGFwaS5nZXRDdXJyZW50UXVhbGl0eSgpKzEgPT09ICBhcGkuZ2V0UXVhbGl0eUxldmVscygpLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdOZXR3b3JrIGNvbm5lY3Rpb24gaXMgdW5zdGFibGUuIENoZWNrIHRoZSBuZXR3b3JrIGNvbm5lY3Rpb24uJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3JlYXRlTWVzc2FnZShtZXNzYWdlLCA1MDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy9EbyBub3RoaW5nLlxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuXG4gICAgfTtcblxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJIZWxwZXJcIiwgbnVsbCwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSGVscGVyOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDE5Li5cbiAqL1xuXG5jb25zdCBIZWxwZXJUZW1wbGF0ZSA9IGZ1bmN0aW9uKHRleHQpe1xuICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIm92cC1oZWxwZXJzLWNvbnRhaW5lclwiPjwvZGl2Pic7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIZWxwZXJUZW1wbGF0ZTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI0Li5cbiAqL1xuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xuaW1wb3J0IHtcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VEXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IE1lc3NhZ2VCb3ggPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGksIG1lc3NhZ2UsIHdpdGhUaW1lcil7XG5cbiAgICBsZXQgYXV0b0Rlc3Ryb3lUaW1lciA9IFwiXCI7XG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgaWYod2l0aFRpbWVyKXtcbiAgICAgICAgICAgIGF1dG9EZXN0cm95VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfSwgd2l0aFRpbWVyfHw1MDAwKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICBcImNsaWNrIC5vdnAtbWVzc2FnZS10ZXh0XCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmKGF1dG9EZXN0cm95VGltZXIpe1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChhdXRvRGVzdHJveVRpbWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXBsYXRlLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiTWVzc2FnZUJveFwiLCBtZXNzYWdlLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VCb3g7IiwiZXhwb3J0IGRlZmF1bHQgKG1lc3NhZ2UpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1tZXNzYWdlLWJveCBhbmltYXRlZCBzaGFrZVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtbWVzc2FnZS1jb250YWluZXJcIj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtbWVzc2FnZS10ZXh0XCI+JyttZXNzYWdlKyc8L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjUuLlxuICovXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XG5cbmNvbnN0IFNwaW5uZXIgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xuICAgIGxldCAkc3Bpbm5lciA9IFwiXCI7XG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgJHNwaW5uZXIgPSAkY3VycmVudDtcbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy9EbyBub3RoaW5nLlxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJTcGlubmVyXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKSwge1xuICAgICAgICBzaG93OiBmdW5jdGlvbiAoaXNTaG93KSB7XG4gICAgICAgICAgICBpZihpc1Nob3cpe1xuICAgICAgICAgICAgICAgICRzcGlubmVyLnNob3coKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzcGlubmVyLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBTcGlubmVyOyIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJvdnAtc3Bpbm5lci1jb250YWluZXJcIj48ZGl2IGNsYXNzPVwib3ZwLXNwaW5uZXJcIj48ZGl2IGNsYXNzPVwiYm91bmNlMVwiPjwvZGl2PjxkaXYgY2xhc3M9XCJib3VuY2UyXCI+PC9kaXY+PGRpdiBjbGFzcz1cImJvdW5jZTNcIj48L2Rpdj48L2Rpdj48L2Rpdj4nO1xufTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIwLi5cbiAqL1xuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xuaW1wb3J0IEhlbHBlciBmcm9tICd2aWV3L2hlbHBlci9tYWluJztcbmltcG9ydCBDb250cm9scyBmcm9tICd2aWV3L2NvbnRyb2xzL21haW4nO1xuaW1wb3J0IFNldHRpbmdQYW5lbExpc3QgZnJvbSAndmlldy9nbG9iYWwvU2V0dGluZ1BhbmVsTGlzdCc7XG5pbXBvcnQgQ29udGV4dFBhbmVsIGZyb20gJ3ZpZXcvaGVscGVyL2NvbnRleHRQYW5lbCc7XG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcbmltcG9ydCB7XG4gICAgUkVBRFksXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBFUlJPUlxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5yZXF1aXJlKCcuLi8uLi9jc3Mvb3ZlbnBsYXllci5sZXNzJyk7XG5cbmNvbnN0IFZpZXcgPSBmdW5jdGlvbigkY29udGFpbmVyKXtcbiAgICBsZXQgY29udHJvbHMgPSBcIlwiLCBoZWxwZXIgPSBcIlwiLCAkcGxheWVyUm9vdCwgY29udGV4dFBhbmVsID0gXCJcIiwgYXBpID0gXCJcIiwgYXV0b0hpZGVUaW1lciA9IFwiXCI7XG5cbiAgICBsZXQgc2V0SGlkZSA9IGZ1bmN0aW9uIChoaWRlLCBhdXRvSGlkZSkge1xuXG4gICAgICAgIGlmIChhdXRvSGlkZVRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoYXV0b0hpZGVUaW1lcik7XG4gICAgICAgICAgICBhdXRvSGlkZVRpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoaWRlKSB7XG4gICAgICAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRwbGF5ZXJSb290LmFkZENsYXNzKFwib3ZwLWF1dG9oaWRlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHBsYXllclJvb3QucmVtb3ZlQ2xhc3MoXCJvdnAtYXV0b2hpZGVcIik7XG5cbiAgICAgICAgICAgIGlmIChhdXRvSGlkZSkge1xuICAgICAgICAgICAgICAgIGF1dG9IaWRlVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICRwbGF5ZXJSb290LmFkZENsYXNzKFwib3ZwLWF1dG9oaWRlXCIpO1xuICAgICAgICAgICAgICAgIH0sIDE4MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBsZXQgdG9nZ2xlUGxheVBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSBhcGkuZ2V0U3RhdGUoKTtcblxuICAgICAgICBpZiAoY3VycmVudFN0YXRlID09PSBTVEFURV9JRExFIHx8IGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfUEFVU0VEIHx8IGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfQ09NUExFVEUpIHtcbiAgICAgICAgICAgIGFwaS5wbGF5KCk7XG4gICAgICAgIH1lbHNlIGlmKGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBhcGkucGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbGV0IHNlZWsgPSBmdW5jdGlvbiAoc2Vjb25kcywgaXNSZXdpbmQpIHtcblxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IGFwaS5nZXREdXJhdGlvbigpO1xuICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSBhcGkuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gMDtcblxuICAgICAgICBpZihpc1Jld2luZCl7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IE1hdGgubWF4KGN1cnJlbnRQb3NpdGlvbiAtIHNlY29uZHMsIDApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gTWF0aC5taW4oY3VycmVudFBvc2l0aW9uICsgc2Vjb25kcywgZHVyYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBpLnNlZWsocG9zaXRpb24pO1xuICAgIH07XG4gICAgbGV0IHZvbHVtZSA9IGZ1bmN0aW9uKGlzVXApe1xuICAgICAgICBjb25zdCBjdXJyZW50Vm9sdW1uID0gYXBpLmdldFZvbHVtZSgpO1xuICAgICAgICBsZXQgbmV3Vm9sdW1lID0gMDtcbiAgICAgICAgaWYoaXNVcCl7XG4gICAgICAgICAgICBuZXdWb2x1bWUgPSAgTWF0aC5taW4oY3VycmVudFZvbHVtbiArIDUsIDEwMCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbmV3Vm9sdW1lID0gTWF0aC5tYXgoY3VycmVudFZvbHVtbiAtIDUsIDApO1xuICAgICAgICB9XG4gICAgICAgIGFwaS5zZXRWb2x1bWUobmV3Vm9sdW1lKTtcbiAgICB9O1xuICAgIGxldCBjcmVhdGVDb250ZXh0UGFuZWwgPSBmdW5jdGlvbihwYWdlWCwgcGFnZVkpe1xuICAgICAgICBpZihjb250ZXh0UGFuZWwpe1xuICAgICAgICAgICAgY29udGV4dFBhbmVsLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGNvbnRleHRQYW5lbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dFBhbmVsID0gQ29udGV4dFBhbmVsKCRwbGF5ZXJSb290LCBhcGksIHtwYWdlWCA6IHBhZ2VYLCBwYWdlWSA6IHBhZ2VZfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAkcGxheWVyUm9vdCA9ICRjdXJyZW50O1xuICAgIH07XG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAvL0RvIG5vdGhpbmcuXG4gICAgfTtcbiAgICBjb25zdCBldmVudHMgPSB7XG4gICAgICAgIFwiY2xpY2sgLm92ZW5wbGF5ZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYoY29udGV4dFBhbmVsKXtcbiAgICAgICAgICAgICAgICBjb250ZXh0UGFuZWwuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHRQYW5lbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIUxBJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIub3ZwLWNvbnRyb2xzXCIpICYmXG4gICAgICAgICAgICAgICAgIUxBJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIub3ZwLXNldHRpbmctcGFuZWxcIikpe1xuICAgICAgICAgICAgICAgIHRvZ2dsZVBsYXlQYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIUxBJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIub3ZwLXNldHRpbmctcGFuZWxcIikgJiYgIUxBJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIub3ZwLXNldHRpbmctYnV0dG9uXCIpICYmIFNldHRpbmdQYW5lbExpc3QubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgLy9jbGVhciBhbGwgU2V0dGluZ1BhbmVsVGVtcGxhdGVcbiAgICAgICAgICAgICAgICBfLmVhY2goU2V0dGluZ1BhbmVsTGlzdCwgZnVuY3Rpb24oc2V0dGluZ1BhbmVsKXtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ1BhbmVsLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBTZXR0aW5nUGFuZWxMaXN0LnNwbGljZSgwLCBTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2VlbnRlciAub3ZlbnBsYXllclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoYXBpLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgICAgICBzZXRIaWRlKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0SGlkZShmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2Vtb3ZlIC5vdmVucGxheWVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmIChhcGkuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgICAgIHNldEhpZGUoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRIaWRlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZWxlYXZlIC5vdmVucGxheWVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmKGFwaS5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgICAgICBzZXRIaWRlKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwia2V5ZG93biAub3ZlbnBsYXllclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAzMiA6ICAgLy9zYXBjZVxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVQbGF5UGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzNyA6IC8vYXJyb3cgbGVmdFxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWVrKDUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM5IDogLy9hcnJvdyByaWdodFxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWVrKDUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOCA6IC8vYXJyb3cgdXBcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdm9sdW1lKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQwIDogLy9hcnJvdyB1cFxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB2b2x1bWUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb250ZXh0bWVudSAub3ZlbnBsYXllclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY3JlYXRlQ29udGV4dFBhbmVsKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJWaWV3XCIsICRjb250YWluZXIuaWQsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQsIHRydWUpLCB7XG4gICAgICAgIGdldE1lZGlhRWxlbWVudENvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICRwbGF5ZXJSb290LmZpbmQoXCIub3ZwLW1lZGlhLWVsZW1lbnQtY29udGFpbmVyXCIpLmdldCgpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRBcGk6IGZ1bmN0aW9uIChwbGF5ZXJJbnN0YW5jZSkge1xuICAgICAgICAgICAgYXBpID0gcGxheWVySW5zdGFuY2U7XG4gICAgICAgICAgICBoZWxwZXIgPSBIZWxwZXIoJHBsYXllclJvb3QuZmluZChcIi5vdnAtdWlcIiksIHBsYXllckluc3RhbmNlKTtcbiAgICAgICAgICAgIGNvbnRyb2xzID0gQ29udHJvbHMoJHBsYXllclJvb3QuZmluZChcIi5vdnAtdWlcIiksIHBsYXllckluc3RhbmNlKTtcblxuXG4gICAgICAgICAgICBhcGkub24oUExBWUVSX1NUQVRFLCBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgICAgICBpZihkYXRhICYmIGRhdGEubmV3c3RhdGUpe1xuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLm5ld3N0YXRlID09PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEhpZGUoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEhpZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblxuXG5leHBvcnQgZGVmYXVsdCBWaWV3O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjAuLlxuICovXG5cbmNvbnN0IFZpZXdUZW1wbGF0ZSA9IGZ1bmN0aW9uKGlkKXtcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJvdmVucGxheWVyIG92cC13cmFwcGVyXCIgdGFiaW5kZXg9XCItMVwiIGFyaWEtbGFiZWw9XCJcIiBpZD1cIicraWQrJ1wiPicgK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXJhdGlvXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcGxheWVyXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLW1lZGlhLWVsZW1lbnQtY29udGFpbmVyXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdWlcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nXG59O1xuZXhwb3J0IGRlZmF1bHQgVmlld1RlbXBsYXRlOyJdLCJzb3VyY2VSb290IjoiIn0=