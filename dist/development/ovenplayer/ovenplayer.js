/*! OvenPlayerv0.7.4 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
/******/ 		return __webpack_require__.p + "" + ({"ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf":"ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf","ovenplayer.provider.DashProvider":"ovenplayer.provider.DashProvider","ovenplayer.provider.HlsProvider":"ovenplayer.provider.HlsProvider","ovenplayer.provider.Html5":"ovenplayer.provider.Html5","ovenplayer.provider.WebRTCProvider":"ovenplayer.provider.WebRTCProvider","ovenplayer.provider.RtmpProvider":"ovenplayer.provider.RtmpProvider"}[chunkId]||chunkId) + ".js"
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
exports.push([module.i, "@charset \"UTF-8\";.ovp-wrapper{position:relative;max-height:100%;overflow:hidden;zoom:1 !important;width:100%;display:block;background-color:#000;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;color:#eee;font-family:'Noto Sans',sans-serif;font-size:11px;line-height:1.3;font-weight:normal;outline:0}.ovp-wrapper object{width:100%;height:100%}.ovp-wrapper:before,.ovp-wrapper:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ovp-wrapper *,.ovp-wrapper *:before,.ovp-wrapper *:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ovp-wrapper.ovp-fullscreen{height:100% !important}.ovp-wrapper.ovp-autohide{cursor:none}.ovp-wrapper.ovp-autohide .ovp-gradient-top,.ovp-wrapper.ovp-autohide .ovp-gradient-bottom,.ovp-wrapper.ovp-autohide .ovp-bottom-panel{opacity:0}.ovp-wrapper.ovp-autohide .ovp-progressbar-container,.ovp-wrapper.ovp-autohide .ovp-controls .ovp-button{cursor:none}.ovp-wrapper.ovp-autohide .ovp-caption-text-container{bottom:25px}.ovp-wrapper .ovp-ratio{padding-bottom:56.25%}.ovp-player{position:absolute;top:0;bottom:0;width:100%}.ovp-player .ovp-media-element-container{display:block;position:absolute;top:0;bottom:0;left:0;right:0;height:100%;width:100%}.ovp-player .ovp-media-element-container>*{width:100%;height:100%}.ovp-player .ovp-ui{position:absolute;top:0;width:100%;height:100%}.ovp-button{display:inline-block;border:none;background:transparent;padding:0;color:inherit;text-align:inherit;overflow:hidden;font-weight:100}.ovp-button:focus,.ovp-button{outline:0}.ovp-gradient-top,.ovp-gradient-bottom{width:100%;position:absolute;background-color:#12121c;pointer-events:none;opacity:.3;-moz-transition:opacity .25s cubic-bezier(0, 0, .2, 1);-webkit-transition:opacity .25s cubic-bezier(0, 0, .2, 1);transition:opacity .25s cubic-bezier(0, 0, .2, 1)}.ovp-gradient-bottom{height:50px;bottom:0;z-index:22}.ovp-spinner-container{position:absolute;top:0;left:0;width:100%;height:100%;display:none}.ovp-spinner-container .ovp-spinner{width:70px;height:18px;position:absolute;top:50%;left:50%;margin-top:-9px;margin-left:-35px;text-align:center}.ovp-spinner-container .ovp-spinner>div{width:18px;height:18px;background-color:#50e3c2;border-radius:100%;display:inline-block;-webkit-animation:sk-bouncedelay 1.4s infinite ease-in-out both;animation:sk-bouncedelay 1.4s infinite ease-in-out both}.ovp-spinner-container .ovp-spinner .bounce1{-webkit-animation-delay:-0.32s;animation-delay:-0.32s}.ovp-spinner-container .ovp-spinner .bounce2{-webkit-animation-delay:-0.16s;animation-delay:-0.16s}@-webkit-keyframes sk-bouncedelay{0%,80%,100%{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}@keyframes sk-bouncedelay{0%,80%,100%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}.ovp-message-box{position:absolute;top:0;left:0;width:100%;height:100%}.ovp-message-box .ovp-message-container{position:absolute;top:60px;width:100%;padding:0 12px;text-align:center}.ovp-message-box .ovp-message-container .ovp-message-text{font-size:140%;background-color:rgba(0,0,0,0.5);color:#fff;padding:.1em .3em;word-wrap:break-word;line-height:1.5em}.ovp-bigbutton-container{position:absolute;top:0;left:0;width:100%;height:100%}.ovp-bigbutton-container .ovp-bigbutton{position:absolute;top:50%;left:50%;width:80px;height:80px;margin-top:-40px;margin-left:-40px;text-align:center}.ovp-bigbutton-container .ovp-bigbutton.ovp-bigbutton-play{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-play-large.svg */ "./src/assets/images/ic-player-play-large.svg")) + ");background-size:100%}.ovp-bigbutton-container .ovp-bigbutton.ovp-bigbutton-pause{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-stop-large.svg */ "./src/assets/images/ic-player-stop-large.svg")) + ");background-size:100%}.ovp-bigbutton-container .ovp-bigbutton.ovp-bigbutton-replay{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-re-large.svg */ "./src/assets/images/ic-player-re-large.svg")) + ");background-size:100%}.ovp-setting-panel{position:absolute;bottom:55px;right:12px;overflow-y:auto;width:260px;font-size:120%;user-select:none;background-color:rgba(28,28,28,0.9);text-shadow:0 0 2px rgba(0,0,0,0.5)}.ovp-setting-panel .ovp-setting-title,.ovp-setting-panel .ovp-setting-item{width:100%;height:38px;line-height:38px;color:#eee;cursor:pointer;outline:none}.ovp-setting-panel .ovp-setting-title-container .ovp-setting-title .ovp-setting-title-title{padding-left:12px}.ovp-setting-panel .ovp-setting-title-container .ovp-setting-title .ovp-setting-title-previcon{padding:0 0 0 12px;margin-right:-6px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item:hover{background-color:rgba(255,255,255,0.1)}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item .ovp-setting-item-title{padding-left:12px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item .ovp-setting-item-nexticon{float:right;padding-right:12px;margin-left:-6px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item span.ovp-setting-item-value{float:right;padding-right:12px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item.ovp-setting-item-value .ovp-setting-item-title{margin-left:-6px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item.ovp-setting-item-value .ovp-setting-item-checked{padding-left:12px;visibility:hidden}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item.ovp-setting-item-value .ovp-setting-item-checked.ovp-show{visibility:visible}.ovp-controls-container .ovp-bottom-panel{position:absolute;left:0px;right:0px;bottom:0px;height:50px;z-index:60;-moz-transition:opacity .25s cubic-bezier(0, 0, .2, 1);-webkit-transition:opacity .25s cubic-bezier(0, 0, .2, 1);transition:opacity .25s cubic-bezier(0, 0, .2, 1)}.ovp-controls-container .ovp-bottom-panel .ovp-progressbar-container{display:block;position:absolute;width:100%;bottom:50px;height:4px;cursor:pointer}.ovp-controls-container .ovp-bottom-panel .ovp-progressbar-container .ovp-progressbar-padding{position:absolute;width:100%;height:16px;bottom:0;z-index:28}.ovp-controls-container .ovp-bottom-panel .ovp-controls{position:absolute;bottom:0;width:100%;height:50px;text-align:left}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-button{min-width:30px;height:30px;cursor:pointer}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-left-controls{float:left;height:100%}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-right-controls{float:right;height:100%}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-right-controls .ovp-setting-button{position:relative;top:10px;margin-right:12px}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-right-controls .ovp-setting-button>i{display:inline-block;width:100%;height:100%;background-size:100%;background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-setting.svg */ "./src/assets/images/ic-player-setting.svg")) + ")}.ovp-progressbar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:31;outline:none}.ovp-progressbar .ovp-play-background-color{background-color:#50e3c2}.ovp-progressbar .ovp-progress-list{position:relative;height:100%;background:rgba(255,255,255,0.2);z-index:39}.ovp-progressbar .ovp-progress-list .ovp-load-progress,.ovp-progressbar .ovp-progress-list .ovp-play-progress,.ovp-progressbar .ovp-progress-list .ovp-hover-progress{position:absolute;left:0;bottom:0;width:100%;height:100%;-moz-transform-origin:0 0;-ms-transform-origin:0 0;-webkit-transform-origin:0 0;transform-origin:0 0}.ovp-progressbar .ovp-progress-list .ovp-play-progress{width:0;z-index:34;-webkit-transition:width .1s ease;transition:width .1s ease}.ovp-progressbar .ovp-progress-list .ovp-load-progress{width:0;z-index:33;background-color:rgba(255,255,255,0.5);-webkit-transition:width .5s ease;transition:width .5s ease}.ovp-progressbar .ovp-progress-list .ovp-hover-progress{left:0;width:0;z-index:35;background-color:rgba(255,255,255,0.6)}.ovp-progressbar .ovp-progressbar-knob-container{position:absolute;top:-5px;left:0px;z-index:43;-moz-transition:-moz-transform .1s cubic-bezier(.4, 0, 1, 1);-webkit-transition:-webkit-transform .1s cubic-bezier(.4, 0, 1, 1);-ms-transition:-ms-transform .1s cubic-bezier(.4, 0, 1, 1);transition:transform .1s cubic-bezier(.4, 0, 1, 1);-moz-transform:scale(0);-ms-transform:scale(0);-webkit-transform:scale(0);transform:scale(0)}.ovp-progressbar .ovp-progressbar-knob-container .ovp-progressbar-knob{width:14px;height:14px;border-radius:7px;-webkit-transition:width .1s ease;transition:width .1s ease}.ovp-progressbar .ovp-progressbar-time{display:none;position:absolute;bottom:15px;left:auto;width:auto;background-color:rgba(28,28,28,0.9);border-radius:2px;padding:5px 9px;font-size:118%;line-height:15px;user-select:none}.ovp-progressbar-hover .ovp-progressbar-knob-container{-moz-transform:none;-ms-transform:none;-webkit-transform:none;transform:none;-moz-transition:-moz-transform .1s cubic-bezier(0, 0, .2, 1);-webkit-transition:-webkit-transform .1s cubic-bezier(0, 0, .2, 1);-ms-transition:-ms-transform .1s cubic-bezier(0, 0, .2, 1);transition:transform .1s cubic-bezier(0, 0, .2, 1)}.ovp-progressbar-hover .ovp-progressbar-time{display:inline-block}.ovp-on-error .ovp-progressbar-time{display:none}.ovp-play-button{position:relative;top:10px;margin-left:15px}.ovp-play-button>i{display:inline-block;width:100%;height:100%;background-size:100%}.ovp-play-button .ovp-play-button-playicon{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-play.svg */ "./src/assets/images/ic-player-play.svg")) + ")}.ovp-play-button .ovp-play-button-pauseicon{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-stop.svg */ "./src/assets/images/ic-player-stop.svg")) + ")}.ovp-volume-controller{display:inline-block;position:relative;top:10px;margin-left:12px;height:30px}.ovp-volume-controller .ovp-volume-button>i{display:inline-block;width:100%;height:100%;background-size:100%}.ovp-volume-controller .ovp-volume-button .ovp-volume-button-bigicon{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-volume.svg */ "./src/assets/images/ic-player-volume.svg")) + ")}.ovp-volume-controller .ovp-volume-button .ovp-volume-button-smallicon{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-volume-2.svg */ "./src/assets/images/ic-player-volume-2.svg")) + ")}.ovp-volume-controller .ovp-volume-button .ovp-volume-button-muteicon{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-volume-mute.svg */ "./src/assets/images/ic-player-volume-mute.svg")) + ")}.ovp-volume-controller .ovp-volume-slider-container{display:inline-block;position:relative;width:0px;height:100%;overflow:hidden;cursor:pointer;user-select:none;outline:none;-moz-transition:margin .2s cubic-bezier(.4, 0, 1, 1),width .2s cubic-bezier(.4, 0, 1, 1);-webkit-transition:margin .2s cubic-bezier(.4, 0, 1, 1),width .2s cubic-bezier(.4, 0, 1, 1);transition:margin .2s cubic-bezier(.4, 0, 1, 1),width .2s cubic-bezier(.4, 0, 1, 1)}.ovp-volume-controller .ovp-volume-slider-container.active{width:70px;margin-left:8px;margin-right:0;-moz-transition:margin .2s cubic-bezier(0, 0, .2, 1),width .2s cubic-bezier(0, 0, .2, 1);-webkit-transition:margin .2s cubic-bezier(0, 0, .2, 1),width .2s cubic-bezier(0, 0, .2, 1);transition:margin .2s cubic-bezier(0, 0, .2, 1),width .2s cubic-bezier(0, 0, .2, 1)}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder{height:100%;position:relative;overflow:hidden}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-bg,.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-value{position:absolute;display:block;left:0;top:50%;height:4px;margin-top:-2px;border-radius:10px}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-bg{width:100%;background:#fff}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-value{width:100%;background:#50e3c2}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle{position:absolute;top:50%;left:30px;width:12px;height:12px;border-radius:6px;margin-top:-6px;background:#fff}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle:before,.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle:after{content:'';position:absolute;display:none;top:50%;height:4px;margin-top:-2px;width:80px;z-index:-1}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle:before{left:-58px;background:#50e3c2}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle:after{left:6px;background:#fff}.ovp-time-display{display:inline-block;position:relative;top:10px;margin-left:12px;height:30px;white-space:nowrap;line-height:30px;vertical-align:top;font-size:14px;user-select:none}.ovp-time-display .ovp-time-current,.ovp-time-display .ovp-time-separator,.ovp-time-display .ovp-time-duration{color:#fff}.ovp-time-display .ovp-live-badge{opacity:1;display:inline-block;width:auto;font-size:14px}.ovp-time-display .ovp-live-badge:before{background:#ff0000;display:inline-block;position:relative;top:-2px;width:6px;height:6px;margin-right:5px;content:'';border-radius:6px}.ovp-time-display .ovp-live-badge .ovp-live-badge-lowlatency{display:inline-block;margin-right:5px}.ovp-context-panel{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;position:absolute;overflow:hidden;width:200px;padding:6px 0;background:rgba(28,28,28,0.9);text-shadow:0 0 2px rgba(0,0,0,0.5);z-index:2300;font-family:Roboto,Arial,Helvetica,sans-serif;font-size:11px;font-weight:100;user-select:none}.ovp-context-panel:before,.ovp-context-panel:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ovp-context-panel *,.ovp-context-panel *:before,.ovp-context-panel *:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ovp-context-panel .ovp-context-item{width:100%;height:38px;padding-left:12px;line-height:38px;color:#eee;cursor:pointer;outline:none;font-size:120%}.ovp-context-panel .ovp-context-item:hover{background-color:rgba(255,255,255,0.1)}.ovp-fullscreen-button{position:relative;top:10px;margin-right:15px}.ovp-fullscreen-button>i{display:inline-block;width:100%;height:100%;background-size:100%}.ovp-fullscreen-button .ovp-fullscreen-button-expandicon{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-fullscreen-expand.svg */ "./src/assets/images/ic-player-fullscreen-expand.svg")) + ")}.ovp-fullscreen-button .ovp-fullscreen-button-compressicon{background:url(" + escape(__webpack_require__(/*! ../assets/images/ic-player-fullscreen-compress.svg */ "./src/assets/images/ic-player-fullscreen-compress.svg")) + ")}@keyframes fade{from{opacity:.3}55%{opacity:1}75%{opacity:1}to{opacity:.3}}@-webkit-keyframes shake{from,to{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px, 0, 0);transform:translate3d(-10px, 0, 0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px, 0, 0);transform:translate3d(10px, 0, 0)}}@keyframes shake{from,to{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px, 0, 0);transform:translate3d(-10px, 0, 0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px, 0, 0);transform:translate3d(10px, 0, 0)}}.ovp-player .shake{-webkit-animation-name:shake;animation-name:shake}@-webkit-keyframes bounceIn{from,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215, .61, .355, 1);animation-timing-function:cubic-bezier(.215, .61, .355, 1)}0%{opacity:0;-webkit-transform:scale3d(.5, .5, .5);transform:scale3d(.5, .5, .5)}20%{-webkit-transform:scale3d(1.1, 1.1, 1.1);transform:scale3d(1.1, 1.1, 1.1)}40%{-webkit-transform:scale3d(.9, .9, .9);transform:scale3d(.9, .9, .9)}60%{opacity:1;-webkit-transform:scale3d(1.03, 1.03, 1.03);transform:scale3d(1.03, 1.03, 1.03)}80%{-webkit-transform:scale3d(.97, .97, .97);transform:scale3d(.97, .97, .97)}to{opacity:1;-webkit-transform:scale3d(1, 1, 1);transform:scale3d(1, 1, 1)}}@keyframes bounceIn{from,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215, .61, .355, 1);animation-timing-function:cubic-bezier(.215, .61, .355, 1)}0%{opacity:0;-webkit-transform:scale3d(.3, .3, .3);transform:scale3d(.3, .3, .3)}20%{-webkit-transform:scale3d(1.1, 1.1, 1.1);transform:scale3d(1.1, 1.1, 1.1)}40%{-webkit-transform:scale3d(.9, .9, .9);transform:scale3d(.9, .9, .9)}60%{opacity:1;-webkit-transform:scale3d(1.03, 1.03, 1.03);transform:scale3d(1.03, 1.03, 1.03)}80%{-webkit-transform:scale3d(.97, .97, .97);transform:scale3d(.97, .97, .97)}to{opacity:1;-webkit-transform:scale3d(1, 1, 1);transform:scale3d(1, 1, 1)}}.ovp-player .bounceIn{-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-name:bounceIn;animation-name:bounceIn}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.ovp-player .fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn}.ovp-player .animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@media (prefers-reduced-motion){.ovp-player .animated{-webkit-animation:unset !important;animation:unset !important;-webkit-transition:none !important;transition:none !important}}.ovp-caption-viewer{position:absolute;top:0;left:0;width:100%;height:100%}.ovp-caption-viewer .ovp-caption-text-container{position:absolute;bottom:60px;width:100%;padding:0 12px;text-align:center;-moz-transition:bottom .25s cubic-bezier(0, 0, .2, 1);-webkit-transition:bottom .25s cubic-bezier(0, 0, .2, 1);transition:bottom .25s cubic-bezier(0, 0, .2, 1)}.ovp-caption-viewer .ovp-caption-text-container .ovp-caption-text{display:none;font-size:220%;background-color:rgba(8,8,8,0.75);border-radius:3px;color:#fff;padding:.1em .3em;word-wrap:break-word;line-height:1.5em;user-select:none}.ovp-caption-button{width:36px}.ovp-caption-button>i{font-size:18px;-moz-transition:color .25s cubic-bezier(0, 0, .2, 1);-webkit-transition:color .25s cubic-bezier(0, 0, .2, 1);transition:color .25s cubic-bezier(0, 0, .2, 1)}.ovp-caption-active .ovp-caption-button>i{color:#F36446}", ""]);

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

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+CiAgICAgICAgPHBhdGggZD0iTTcgMTdoNnY2TTIzIDEzaC02VjdNMTcgMTNsNy03TTYgMjRsNy03Ii8+CiAgICA8L2c+Cjwvc3ZnPgo="

/***/ }),

/***/ "./src/assets/images/ic-player-fullscreen-expand.svg":
/*!***********************************************************!*\
  !*** ./src/assets/images/ic-player-fullscreen-expand.svg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+CiAgICAgICAgPHBhdGggZD0iTTE4IDZoNnY2TTEyIDI0SDZ2LTZNMjQgNmwtNyA3TTYgMjRsNy03Ii8+CiAgICA8L2c+Cjwvc3ZnPgo="

/***/ }),

/***/ "./src/assets/images/ic-player-play-large.svg":
/*!****************************************************!*\
  !*** ./src/assets/images/ic-player-play-large.svg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQ5IiBzdHJva2U9IiNGRkYiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik03NSA1MEwzNSA3NVYyNXoiLz4KICAgIDwvZz4KPC9zdmc+Cg=="

/***/ }),

/***/ "./src/assets/images/ic-player-play.svg":
/*!**********************************************!*\
  !*** ./src/assets/images/ic-player-play.svg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj4KICAgIDxwYXRoIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTkgNmwxNCA5LTE0IDl6Ii8+Cjwvc3ZnPgo="

/***/ }),

/***/ "./src/assets/images/ic-player-re-large.svg":
/*!**************************************************!*\
  !*** ./src/assets/images/ic-player-re-large.svg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj4NCiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiPg0KICAgICAgICA8cGF0aCBkPSJNMTUgMjEuM3YxMy44aDEzLjgiLz4NCiAgICAgICAgPHBhdGggZD0iTTIwLjc3MyA0Ni42YTIwLjcgMjAuNyAwIDEgMCA0Ljg5OS0yMS41MjhMMTUgMzUuMSIvPg0KICAgIDwvZz4NCjwvc3ZnPg0K"

/***/ }),

/***/ "./src/assets/images/ic-player-setting.svg":
/*!*************************************************!*\
  !*** ./src/assets/images/ic-player-setting.svg ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNCA0KSI+CiAgICAgICAgPGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iMyIvPgogICAgICAgIDxwYXRoIGQ9Ik0xOC40IDE0YTEuNjUgMS42NSAwIDAgMCAuMzMgMS44MmwuMDYuMDZhMiAyIDAgMSAxLTIuODMgMi44M2wtLjA2LS4wNmExLjY1IDEuNjUgMCAwIDAtMS44Mi0uMzMgMS42NSAxLjY1IDAgMCAwLTEgMS41MVYyMGEyIDIgMCAxIDEtNCAwdi0uMDlBMS42NSAxLjY1IDAgMCAwIDggMTguNGExLjY1IDEuNjUgMCAwIDAtMS44Mi4zM2wtLjA2LjA2YTIgMiAwIDEgMS0yLjgzLTIuODNsLjA2LS4wNmExLjY1IDEuNjUgMCAwIDAgLjMzLTEuODIgMS42NSAxLjY1IDAgMCAwLTEuNTEtMUgyYTIgMiAwIDEgMSAwLTRoLjA5QTEuNjUgMS42NSAwIDAgMCAzLjYgOGExLjY1IDEuNjUgMCAwIDAtLjMzLTEuODJsLS4wNi0uMDZhMiAyIDAgMSAxIDIuODMtMi44M2wuMDYuMDZhMS42NSAxLjY1IDAgMCAwIDEuODIuMzNIOGExLjY1IDEuNjUgMCAwIDAgMS0xLjUxVjJhMiAyIDAgMSAxIDQgMHYuMDlhMS42NSAxLjY1IDAgMCAwIDEgMS41MSAxLjY1IDEuNjUgMCAwIDAgMS44Mi0uMzNsLjA2LS4wNmEyIDIgMCAxIDEgMi44MyAyLjgzbC0uMDYuMDZhMS42NSAxLjY1IDAgMCAwLS4zMyAxLjgyVjhjLjI2LjYwNC44NTIuOTk3IDEuNTEgMUgyMGEyIDIgMCAxIDEgMCA0aC0uMDlhMS42NSAxLjY1IDAgMCAwLTEuNTEgMXoiLz4KICAgIDwvZz4KPC9zdmc+Cg=="

/***/ }),

/***/ "./src/assets/images/ic-player-stop-large.svg":
/*!****************************************************!*\
  !*** ./src/assets/images/ic-player-stop-large.svg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQ5IiBzdHJva2U9IiNGRkYiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zNSAyOWg3djQyaC03ek01OCAyOWg3djQyaC03eiIvPgogICAgPC9nPgo8L3N2Zz4K"

/***/ }),

/***/ "./src/assets/images/ic-player-stop.svg":
/*!**********************************************!*\
  !*** ./src/assets/images/ic-player-stop.svg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+CiAgICAgICAgPHBhdGggZD0iTTEwIDZ2MThNMjAgNnYxOCIvPgogICAgPC9nPgo8L3N2Zz4K"

/***/ }),

/***/ "./src/assets/images/ic-player-volume-2.svg":
/*!**************************************************!*\
  !*** ./src/assets/images/ic-player-volume-2.svg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj4NCiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPg0KICAgICAgICA8cGF0aCBkPSJNOSAxMUg1djhoNGw2IDVWNnpNMTkuNTQgMTEuNDZhNSA1IDAgMCAxIDAgNy4wNyIvPg0KICAgIDwvZz4NCjwvc3ZnPg0K"

/***/ }),

/***/ "./src/assets/images/ic-player-volume-mute.svg":
/*!*****************************************************!*\
  !*** ./src/assets/images/ic-player-volume-mute.svg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+CiAgICAgICAgPHBhdGggZD0iTTkgMTFINXY4aDRsNiA1VjZ6TTI2IDEybC02IDZNMjAgMTJsNiA2Ii8+CiAgICA8L2c+Cjwvc3ZnPgo="

/***/ }),

/***/ "./src/assets/images/ic-player-volume.svg":
/*!************************************************!*\
  !*** ./src/assets/images/ic-player-volume.svg ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+CiAgICAgICAgPHBhdGggZD0iTTkgMTFINXY4aDRsNiA1VjZ6TTIzLjA3IDcuOTNjMy45MDQgMy45MDUgMy45MDQgMTAuMjM1IDAgMTQuMTRtLTMuNTMtMTAuNjFhNSA1IDAgMCAxIDAgNy4wNyIvPgogICAgPC9nPgo8L3N2Zz4K"

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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //import CaptionManager from "api/caption/Manager";


var _Configurator = __webpack_require__(/*! api/Configurator */ "./src/js/api/Configurator.js");

var _Configurator2 = _interopRequireDefault(_Configurator);

var _EventEmitter = __webpack_require__(/*! api/EventEmitter */ "./src/js/api/EventEmitter.js");

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _LazyCommandExecutor = __webpack_require__(/*! api/LazyCommandExecutor */ "./src/js/api/LazyCommandExecutor.js");

var _LazyCommandExecutor2 = _interopRequireDefault(_LazyCommandExecutor);

var _logger = __webpack_require__(/*! utils/logger */ "./src/js/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

var _Manager = __webpack_require__(/*! api/playlist/Manager */ "./src/js/api/playlist/Manager.js");

var _Manager2 = _interopRequireDefault(_Manager);

var _Controller = __webpack_require__(/*! api/provider/Controller */ "./src/js/api/provider/Controller.js");

var _Controller2 = _interopRequireDefault(_Controller);

var _promise = __webpack_require__(/*! api/shims/promise */ "./src/js/api/shims/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _version = __webpack_require__(/*! version */ "./src/js/version.js");

var _ApiExpansions = __webpack_require__(/*! api/ApiExpansions */ "./src/js/api/ApiExpansions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */

var Api = function Api(container) {
    var logManager = (0, _logger2.default)();
    var that = {};
    (0, _EventEmitter2.default)(that);

    OvenPlayerConsole.log("[[OvenPlayer]] v." + _version.version);
    OvenPlayerConsole.log("API loaded.");
    //let captionManager = CaptionManager(that);

    var playlistManager = (0, _Manager2.default)();
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

            var currentSourceIndex = pickQualityFromSource(playlistManager.getCurrentSources());
            OvenPlayerConsole.log("current source index : " + currentSourceIndex);

            //Call Provider.
            currentProvider = Providers[currentSourceIndex](container, playerConfig);

            if (currentProvider.getName() === _constants.PROVIDER_RTMP) {
                //If provider type is RTMP, we accepts RtmpExpansion.
                _extends(that, (0, _ApiExpansions.ApiRtmpExpansion)(currentProvider));
            }

            //This passes the event created by the Provider to API.
            currentProvider.on("all", function (name, data) {
                that.trigger(name, data);

                //Auto next source when player load was fail by amiss source.
                if (name === _constants.ERROR && (data.code === _constants.PLAYER_FILE_ERROR || parseInt(data.code / 100) === 5) || name === _constants.NETWORK_UNSTABLED) {
                    var currentQuality = that.getCurrentQuality();
                    if (currentQuality.index + 1 < that.getQualityLevels().length) {
                        //this sequential has available source.
                        that.pause();

                        that.setCurrentQuality(currentQuality.index + 1);
                    }
                }
            });
        }).then(function () {

            //provider's preload() have to made Promise. Cuz it overcomes 'flash loading timing problem'.
            currentProvider.preload(playlistManager.getCurrentSources(), lastPlayPosition).then(function () {
                lazyQueue.flush();
                //This is no reason to exist anymore.
                lazyQueue.destroy();

                that.trigger(_constants.READY);
            });
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

    /*that.getContainerId = () =>{
        return container.id;
    };*/

    that.getConfig = function () {
        OvenPlayerConsole.log("API : getConfig()", playerConfig.getConfig());
        return playerConfig.getConfig();
    };

    that.getDuration = function () {
        if (!currentProvider) {
            return;
        }
        OvenPlayerConsole.log("API : getDuration()", currentProvider.getDuration());
        return currentProvider.getDuration();
    };
    that.getPosition = function () {
        if (!currentProvider) {
            return;
        }
        OvenPlayerConsole.log("API : getPosition()", currentProvider.getPosition());
        return currentProvider.getPosition();
    };
    that.getVolume = function () {
        if (!currentProvider) {
            return;
        }
        OvenPlayerConsole.log("API : getVolume()", currentProvider.getVolume());
        return currentProvider.getVolume();
    };
    that.setVolume = function (volume) {
        if (!currentProvider) {
            return;
        }
        OvenPlayerConsole.log("API : setVolume() " + volume);
        currentProvider.setVolume(volume);
    };
    that.setMute = function (state) {
        if (!currentProvider) {
            return;
        }
        OvenPlayerConsole.log("API : setMute() " + state);
        return currentProvider.setMute(state);
    };
    that.getMute = function () {
        if (!currentProvider) {
            return;
        }
        OvenPlayerConsole.log("API : getMute() " + currentProvider.getMute());
        return currentProvider.getMute();
    };
    that.load = function (playlist) {
        OvenPlayerConsole.log("API : load() ", playlist);
        lazyQueue = (0, _LazyCommandExecutor2.default)(that, ['play', 'seek', 'stop']);

        if (playlist) {
            if (currentProvider) {
                currentProvider.setCurrentQuality(0);
            }
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
        var currentSource = sources[that.getCurrentQuality().index];
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
        if (!currentProvider) {
            return;
        }
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
        lazyQueue = null;

        that.trigger(_constants.DESTROY);
        that.off();

        OvenPlayerConsole.log("API : remove() - lazyQueue, currentProvider, providerController, playlistManager, playerConfig, api event destroed. ");
        logManager.destroy();
        logManager = null;
        OvenPlayerSDK.removePlayer(that.getContainerId());
    };

    return that;
};

exports.default = Api;

/***/ }),

/***/ "./src/js/api/ApiExpansions.js":
/*!*************************************!*\
  !*** ./src/js/api/ApiExpansions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 8. 24..
 */

var ApiRtmpExpansion = exports.ApiRtmpExpansion = function ApiRtmpExpansion(currentProvider) {
    return {
        externalCallbackCreep: function externalCallbackCreep(result) {
            if (result.name && result.data) {
                return currentProvider.triggerEventFromExternal(result.name, result.data);
            } else {
                return null;
            }
        }
    };
};

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
    }, {
        name: 'rtmp',
        checkSupport: function checkSupport(source) {
            var file = source.file;
            var type = source.type;
            if ((0, _validator.isRtmp)(file, type)) {
                return true;
            } else {
                return false;
            }
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
var PROVIDER_RTMP = exports.PROVIDER_RTMP = 'rtmp';

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

var _ApiExpansions = __webpack_require__(/*! api/ApiExpansions */ "./src/js/api/ApiExpansions.js");

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
            return Promise.all(/*! require.ensure | ovenplayer.provider.Html5 */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.Html5")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/Html5 */ "./src/js/api/provider/html5/Html5.js").default;
                registeProvider("html5", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        webrtc: function webrtc() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.WebRTCProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.WebRTCProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/WebRTC */ "./src/js/api/provider/html5/WebRTC.js").default;
                registeProvider("webrtc", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        dash: function dash() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.DashProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.DashProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/Dash */ "./src/js/api/provider/html5/Dash.js").default;
                registeProvider("dash", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        hls: function hls() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.HlsProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.HlsProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/Hls */ "./src/js/api/provider/html5/Hls.js").default;
                registeProvider("hls", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        rtmp: function rtmp() {
            return __webpack_require__.e(/*! require.ensure | ovenplayer.provider.RtmpProvider */ "ovenplayer.provider.RtmpProvider").then((function (require) {
                var provider = __webpack_require__(/*! api/provider/flash/Rtmp */ "./src/js/api/provider/flash/Rtmp.js").default;
                registeProvider("rtmp", provider);
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
        return supportChacker.findProviderNameBySource(currentSource) === supportChacker.findProviderNameBySource(newSource);
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

var _dom = __webpack_require__(/*! ./utils/polyfills/dom.js */ "./src/js/utils/polyfills/dom.js");

var _dom2 = _interopRequireDefault(_dom);

var _webpack = __webpack_require__(/*! utils/webpack */ "./src/js/utils/webpack.js");

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__.p = (0, _webpack.getScriptPath)('ovenplayer.js');

var OvenPlayer = {};
window.OvenPlayer = OvenPlayer;

/**
 * Copy properties from OvenPlayerSDK object to OvenPlayer object
 */
_extends(OvenPlayer, _ovenplayer2.default);

OvenPlayer.create = function (container, options) {
    var browserName = (0, _browser.getBrowser)();
    if (browserName === "ie") {}
    var containerElement = (0, _ovenplayer.checkAndGetContainerElement)(container);

    var player = (0, _view2.default)(containerElement);

    var playerInstance = _ovenplayer2.default.create(player.getMediaElementContainer(), options);

    _extends(playerInstance, {
        getContainerId: function getContainerId() {
            return containerElement.id;
        }
    });

    player.setApi(playerInstance);

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

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _webpack = __webpack_require__(/*! utils/webpack */ "./src/js/utils/webpack.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__.p = (0, _webpack.getScriptPath)('ovenplayer.sdk.js');

/**
 * Main OvenPlayerSDK object
 */
var OvenPlayerSDK = window.OvenPlayerSDK = {};

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

    for (var i = 0; i < playerList.length; i++) {

        if (playerList[i].getContainerId() === containerId) {

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
 * Remove the player instance by playerId.
 *
 * @param      {playerId}  id
 * @return     {null}
 */
OvenPlayerSDK.removePlayer = function (playerId) {
    console.log(playerId);
    for (var i = 0; i < playerList.length; i++) {

        if (playerList[i].getContainerId() === playerId) {

            playerList.splice(i, 1);
        }
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

/***/ "./src/js/utils/browser.js":
/*!*********************************!*\
  !*** ./src/js/utils/browser.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 8. 24..
 */

var getBrowser = exports.getBrowser = function getBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return 'opera';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return 'safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'firefox';
    } else if (navigator.userAgent.indexOf("MSIE") != -1) {
        var msie = avigator.userAgent.indexOf("MSIE");
        if (!!document.documentMode == true) {
            return 'ie';
        } else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            if (!isNaN(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))))) {
                return 'ie';
            } else {
                return 'unknown';
            }
        } else {
            return 'unknown';
        }
    } else {
        return 'unknown';
    }
};

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   It was replace jquery's selector. It Often used by OvenTemplate. (/view/engine/OvenTemplate.js)
 * @param   selectorOrElement  string or element
 *
 * */

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

    that.removeAttribute = function (attrName) {
        $element.removeAttribute(attrName);
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

    that.replace = function (html) {
        $element.replaceWith(html);
    };

    that.append = function (html) {
        $element.appendChild(html);
    };

    that.remove = function () {
        $element.remove();
    };

    that.removeChild = function () {
        while ($element.hasChildNodes()) {
            $element.removeChild($element.firstChild);
        }
    };

    that.get = function () {
        return $element;
    };

    that.closest = function (selectorString) {
        return $element.closest(selectorString);
    };

    return that;
}; /**
    * Created by hoho on 2018. 7. 23..
    */
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

/***/ "./src/js/utils/polyfills/dom.js":
/*!***************************************!*\
  !*** ./src/js/utils/polyfills/dom.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
* Copyright 2018 Joshua Bell

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
* */

(function (global) {
    'use strict';

    if (!('window' in global && 'document' in global)) return;

    //----------------------------------------------------------------------
    //
    // DOM
    // https://dom.spec.whatwg.org/
    //
    //----------------------------------------------------------------------

    // Document.querySelectorAll method
    // http://ajaxian.com/archives/creating-a-queryselector-for-ie-that-runs-at-native-speed
    // Needed for: IE7-
    if (!document.querySelectorAll) {
        document.querySelectorAll = function (selectors) {
            var style = document.createElement('style'),
                elements = [],
                element;
            document.documentElement.firstChild.appendChild(style);
            document._qsa = [];

            style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
            window.scrollBy(0, 0);
            style.parentNode.removeChild(style);

            while (document._qsa.length) {
                element = document._qsa.shift();
                element.style.removeAttribute('x-qsa');
                elements.push(element);
            }
            document._qsa = null;
            return elements;
        };
    }

    // Document.querySelector method
    // Needed for: IE7-
    if (!document.querySelector) {
        document.querySelector = function (selectors) {
            var elements = document.querySelectorAll(selectors);
            return elements.length ? elements[0] : null;
        };
    }

    // Document.getElementsByClassName method
    // Needed for: IE8-
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (classNames) {
            classNames = String(classNames).replace(/^|\s+/g, '.');
            return document.querySelectorAll(classNames);
        };
    }

    // Node interface constants
    // Needed for: IE8-
    global.Node = global.Node || function () {
        throw TypeError("Illegal constructor");
    };
    [['ELEMENT_NODE', 1], ['ATTRIBUTE_NODE', 2], ['TEXT_NODE', 3], ['CDATA_SECTION_NODE', 4], ['ENTITY_REFERENCE_NODE', 5], ['ENTITY_NODE', 6], ['PROCESSING_INSTRUCTION_NODE', 7], ['COMMENT_NODE', 8], ['DOCUMENT_NODE', 9], ['DOCUMENT_TYPE_NODE', 10], ['DOCUMENT_FRAGMENT_NODE', 11], ['NOTATION_NODE', 12]].forEach(function (p) {
        if (!(p[0] in global.Node)) global.Node[p[0]] = p[1];
    });

    // DOMException constants
    // Needed for: IE8-
    global.DOMException = global.DOMException || function () {
        throw TypeError("Illegal constructor");
    };
    [['INDEX_SIZE_ERR', 1], ['DOMSTRING_SIZE_ERR', 2], ['HIERARCHY_REQUEST_ERR', 3], ['WRONG_DOCUMENT_ERR', 4], ['INVALID_CHARACTER_ERR', 5], ['NO_DATA_ALLOWED_ERR', 6], ['NO_MODIFICATION_ALLOWED_ERR', 7], ['NOT_FOUND_ERR', 8], ['NOT_SUPPORTED_ERR', 9], ['INUSE_ATTRIBUTE_ERR', 10], ['INVALID_STATE_ERR', 11], ['SYNTAX_ERR', 12], ['INVALID_MODIFICATION_ERR', 13], ['NAMESPACE_ERR', 14], ['INVALID_ACCESS_ERR', 15]].forEach(function (p) {
        if (!(p[0] in global.DOMException)) global.DOMException[p[0]] = p[1];
    });

    // Event and EventTargets interfaces
    // Needed for: IE8
    (function () {
        if (!('Element' in global) || Element.prototype.addEventListener || !Object.defineProperty) return;

        // interface Event

        // PhaseType (const unsigned short)
        Event.CAPTURING_PHASE = 1;
        Event.AT_TARGET = 2;
        Event.BUBBLING_PHASE = 3;

        Object.defineProperties(Event.prototype, {
            CAPTURING_PHASE: { get: function get() {
                    return 1;
                } },
            AT_TARGET: { get: function get() {
                    return 2;
                } },
            BUBBLING_PHASE: { get: function get() {
                    return 3;
                } },
            target: {
                get: function get() {
                    return this.srcElement;
                } },
            currentTarget: {
                get: function get() {
                    return this._currentTarget;
                } },
            eventPhase: {
                get: function get() {
                    return this.srcElement === this.currentTarget ? Event.AT_TARGET : Event.BUBBLING_PHASE;
                } },
            bubbles: {
                get: function get() {
                    switch (this.type) {
                        // Mouse
                        case 'click':
                        case 'dblclick':
                        case 'mousedown':
                        case 'mouseup':
                        case 'mouseover':
                        case 'mousemove':
                        case 'mouseout':
                        case 'mousewheel':
                        // Keyboard
                        case 'keydown':
                        case 'keypress':
                        case 'keyup':
                        // Frame/Object
                        case 'resize':
                        case 'scroll':
                        // Form
                        case 'select':
                        case 'change':
                        case 'submit':
                        case 'reset':
                            return true;
                    }
                    return false;
                } },
            cancelable: {
                get: function get() {
                    switch (this.type) {
                        // Mouse
                        case 'click':
                        case 'dblclick':
                        case 'mousedown':
                        case 'mouseup':
                        case 'mouseover':
                        case 'mouseout':
                        case 'mousewheel':
                        // Keyboard
                        case 'keydown':
                        case 'keypress':
                        case 'keyup':
                        // Form
                        case 'submit':
                            return true;
                    }
                    return false;
                } },
            timeStamp: {
                get: function get() {
                    return this._timeStamp;
                } },
            stopPropagation: {
                value: function value() {
                    this.cancelBubble = true;
                } },
            preventDefault: {
                value: function value() {
                    this.returnValue = false;
                } },
            defaultPrevented: {
                get: function get() {
                    return this.returnValue === false;
                } }
        });

        // interface EventTarget

        function addEventListener(type, listener, useCapture) {
            if (typeof listener !== 'function') return;
            if (type === 'DOMContentLoaded') type = 'load';
            var target = this;
            var f = function f(e) {
                e._timeStamp = Date.now();
                e._currentTarget = target;
                listener.call(this, e);
                e._currentTarget = null;
            };
            this['_' + type + listener] = f;
            this.attachEvent('on' + type, f);
        }

        function removeEventListener(type, listener, useCapture) {
            if (typeof listener !== 'function') return;
            if (type === 'DOMContentLoaded') type = 'load';
            var f = this['_' + type + listener];
            if (f) {
                this.detachEvent('on' + type, f);
                this['_' + type + listener] = null;
            }
        }

        [Window, HTMLDocument, Element].forEach(function (o) {
            o.prototype.addEventListener = addEventListener;
            o.prototype.removeEventListener = removeEventListener;
        });
    })();

    // CustomEvent
    // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
    // Needed for: IE
    (function () {
        if ('CustomEvent' in global && typeof global.CustomEvent === "function") return;
        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
        CustomEvent.prototype = global.Event.prototype;
        global.CustomEvent = CustomEvent;
    })();

    // Shim for DOM Events for IE7-
    // http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
    // Use addEvent(object, event, handler) instead of object.addEventListener(event, handler)
    window.addEvent = function (obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
            obj["e" + type + fn] = fn;
            obj[type + fn] = function () {
                var e = window.event;
                e.currentTarget = obj;
                e.preventDefault = function () {
                    e.returnValue = false;
                };
                e.stopPropagation = function () {
                    e.cancelBubble = true;
                };
                e.target = e.srcElement;
                e.timeStamp = Date.now();
                obj["e" + type + fn].call(this, e);
            };
            obj.attachEvent("on" + type, obj[type + fn]);
        }
    };

    window.removeEvent = function (obj, type, fn) {
        if (obj.removeEventListener) {
            obj.removeEventListener(type, fn, false);
        } else if (obj.detachEvent) {
            obj.detachEvent("on" + type, obj[type + fn]);
            obj[type + fn] = null;
            obj["e" + type + fn] = null;
        }
    };

    // DOMTokenList interface and Element.classList / Element.relList
    // Needed for: IE9-
    // Use getClassList(elem) instead of elem.classList() if IE7- support is needed
    // Use getRelList(elem) instead of elem.relList() if IE7- support is needed
    (function () {
        function DOMTokenListShim(o, p) {
            function split(s) {
                return s.length ? s.split(/\s+/g) : [];
            }

            // NOTE: This does not exactly match the spec.
            function removeTokenFromString(token, string) {
                var tokens = split(string),
                    index = tokens.indexOf(token);
                if (index !== -1) {
                    tokens.splice(index, 1);
                }
                return tokens.join(' ');
            }

            Object.defineProperties(this, {
                length: {
                    get: function get() {
                        return split(o[p]).length;
                    }
                },

                item: {
                    value: function value(idx) {
                        var tokens = split(o[p]);
                        return 0 <= idx && idx < tokens.length ? tokens[idx] : null;
                    }
                },

                contains: {
                    value: function value(token) {
                        token = String(token);
                        if (token.length === 0) {
                            throw SyntaxError();
                        }
                        if (/\s/.test(token)) {
                            throw Error("InvalidCharacterError");
                        }
                        var tokens = split(o[p]);

                        return tokens.indexOf(token) !== -1;
                    }
                },

                add: {
                    value: function value() /*tokens...*/{
                        var tokens = Array.prototype.slice.call(arguments).map(String);
                        if (tokens.some(function (token) {
                            return token.length === 0;
                        })) {
                            throw SyntaxError();
                        }
                        if (tokens.some(function (token) {
                            return (/\s/.test(token)
                            );
                        })) {
                            throw Error("InvalidCharacterError");
                        }

                        try {
                            var underlying_string = o[p];
                            var token_list = split(underlying_string);
                            tokens = tokens.filter(function (token) {
                                return token_list.indexOf(token) === -1;
                            });
                            if (tokens.length === 0) {
                                return;
                            }
                            if (underlying_string.length !== 0 && !/\s$/.test(underlying_string)) {
                                underlying_string += ' ';
                            }
                            underlying_string += tokens.join(' ');
                            o[p] = underlying_string;
                        } finally {
                            var length = split(o[p]).length;
                            if (this.length !== length) {
                                this.length = length;
                            }
                        }
                    }
                },

                remove: {
                    value: function value() /*tokens...*/{
                        var tokens = Array.prototype.slice.call(arguments).map(String);
                        if (tokens.some(function (token) {
                            return token.length === 0;
                        })) {
                            throw SyntaxError();
                        }
                        if (tokens.some(function (token) {
                            return (/\s/.test(token)
                            );
                        })) {
                            throw Error("InvalidCharacterError");
                        }

                        try {
                            var underlying_string = o[p];
                            tokens.forEach(function (token) {
                                underlying_string = removeTokenFromString(token, underlying_string);
                            });
                            o[p] = underlying_string;
                        } finally {
                            var length = split(o[p]).length;
                            if (this.length !== length) {
                                this.length = length;
                            }
                        }
                    }
                },

                toggle: {
                    value: function value(token /*, force*/) {
                        var force = arguments[1];
                        try {
                            token = String(token);
                            if (token.length === 0) {
                                throw SyntaxError();
                            }
                            if (/\s/.test(token)) {
                                throw Error("InvalidCharacterError");
                            }
                            var tokens = split(o[p]),
                                index = tokens.indexOf(token);

                            if (index !== -1 && (!force || force === void 0)) {
                                o[p] = removeTokenFromString(token, o[p]);
                                return false;
                            }
                            if (index !== -1 && force) {
                                return true;
                            }
                            var underlying_string = o[p];
                            if (underlying_string.length !== 0 && !/\s$/.test(underlying_string)) {
                                underlying_string += ' ';
                            }
                            underlying_string += token;
                            o[p] = underlying_string;
                            return true;
                        } finally {
                            var length = split(o[p]).length;
                            if (this.length !== length) {
                                this.length = length;
                            }
                        }
                    }
                },

                toString: {
                    value: function value() {
                        return o[p];
                    }
                }
            });
            if (!('length' in this)) {
                // In case getters are not supported
                this.length = split(o[p]).length;
            } else {
                // If they are, shim in index getters (up to 100)
                for (var i = 0; i < 100; ++i) {
                    Object.defineProperty(this, String(i), {
                        get: function (n) {
                            return function () {
                                return this.item(n);
                            };
                        }(i)
                    });
                }
            }
        }

        function addToElementPrototype(p, f) {
            if ('Element' in global && Element.prototype && Object.defineProperty) {
                Object.defineProperty(Element.prototype, p, { get: f });
            }
        }

        // HTML - https://html.spec.whatwg.org
        // Element.classList
        if ('classList' in document.createElement('span')) {
            window.getClassList = function (elem) {
                return elem.classList;
            };
        } else {
            window.getClassList = function (elem) {
                return new DOMTokenListShim(elem, 'className');
            };
            addToElementPrototype('classList', function () {
                return new DOMTokenListShim(this, 'className');
            });
        }

        // HTML - https://html.spec.whatwg.org
        // HTMLAnchorElement.relList
        // HTMLLinkElement.relList
        if ('relList' in document.createElement('link')) {
            window.getRelList = function (elem) {
                return elem.relList;
            };
        } else {
            window.getRelList = function (elem) {
                return new DOMTokenListShim(elem, 'rel');
            };
            addToElementPrototype('relList', function () {
                return new DOMTokenListShim(this, 'rel');
            });
        }

        // Add second argument to native DOMTokenList.toggle() if necessary
        (function () {
            if (!('DOMTokenList' in global)) return;
            var e = document.createElement('span');
            if (!('classList' in e)) return;
            e.classList.toggle('x', false);
            if (!e.classList.contains('x')) return;
            global.DOMTokenList.prototype.toggle = function toggle(token /*, force*/) {
                var force = arguments[1];
                if (force === undefined) {
                    var add = !this.contains(token);
                    this[add ? 'add' : 'remove'](token);
                    return add;
                }
                force = !!force;
                this[force ? 'add' : 'remove'](token);
                return force;
            };
        })();

        // DOM - Interface NonDocumentTypeChildNode
        // Interface NonDocumentTypeChildNode
        // previousElementSibling / nextElementSibling - for IE8

        if (!('previousElementSibling' in document.documentElement)) {
            addToElementPrototype('previousElementSibling', function () {
                var n = this.previousSibling;
                while (n && n.nodeType !== Node.ELEMENT_NODE) {
                    n = n.previousSibling;
                }return n;
            });
        }

        if (!('nextElementSibling' in document.documentElement)) {
            addToElementPrototype('nextElementSibling', function () {
                var n = this.nextSibling;
                while (n && n.nodeType !== Node.ELEMENT_NODE) {
                    n = n.nextSibling;
                }return n;
            });
        }
    })();

    // Element.matches
    // https://developer.mozilla.org/en/docs/Web/API/Element/matches
    // Needed for: IE, Firefox 3.6, early Webkit and Opera 15.0
    // Use msMatchesSelector(selector) for IE
    // Use oMatchesSelector(selector) for Opera 15.0
    // Use mozMatchesSelector(selector) for Firefox 3.6
    // Use webkitMatchesSelector(selector) for early Webkit
    // Use polyfill if no matches() support, but querySelectorAll() support
    if ('Element' in global && !Element.prototype.matches) {
        if (Element.prototype.msMatchesSelector) {
            Element.prototype.matches = Element.prototype.msMatchesSelector;
        } else if (Element.prototype.oMatchesSelector) {
            Element.prototype.matches = Element.prototype.oMatchesSelector;
        } else if (Element.prototype.mozMatchesSelector) {
            Element.prototype.matches = Element.prototype.mozMatchesSelector;
        } else if (Element.prototype.webkitMatchesSelector) {
            Element.prototype.matches = Element.prototype.webkitMatchesSelector;
        } else if (document.querySelectorAll) {
            Element.prototype.matches = function matches(selector) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(selector),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
        }
    }

    // Element.closest
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
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

    function mixin(o, ps) {
        if (!o) return;
        Object.keys(ps).forEach(function (p) {
            if (p in o || p in o.prototype) return;
            try {
                Object.defineProperty(o.prototype, p, Object.getOwnPropertyDescriptor(ps, p));
            } catch (ex) {
                // Throws in IE8; just copy it
                o[p] = ps[p];
            }
        });
    }

    // Mixin ParentNode
    // https://dom.spec.whatwg.org/#interface-parentnode

    function convertNodesIntoANode(nodes) {
        var node = null;
        nodes = nodes.map(function (node) {
            return !(node instanceof Node) ? document.createTextNode(node) : node;
        });
        if (nodes.length === 1) {
            node = nodes[0];
        } else {
            node = document.createDocumentFragment();
            nodes.forEach(function (n) {
                node.appendChild(n);
            });
        }
        return node;
    }

    var ParentNode = {
        prepend: function prepend() /*...nodes*/{
            var nodes = [].slice.call(arguments);
            nodes = convertNodesIntoANode(nodes);
            this.insertBefore(nodes, this.firstChild);
        },
        append: function append() /*...nodes*/{
            var nodes = [].slice.call(arguments);
            nodes = convertNodesIntoANode(nodes);
            this.appendChild(nodes);
        }
    };

    mixin(global.Document || global.HTMLDocument, ParentNode); // HTMLDocument for IE8
    mixin(global.DocumentFragment, ParentNode);
    mixin(global.Element, ParentNode);

    // Mixin ChildNode
    // https://dom.spec.whatwg.org/#interface-childnode

    var ChildNode = {
        before: function before() /*...nodes*/{
            var nodes = [].slice.call(arguments);
            var parent = this.parentNode;
            if (!parent) return;
            var viablePreviousSibling = this.previousSibling;
            while (nodes.indexOf(viablePreviousSibling) !== -1) {
                viablePreviousSibling = viablePreviousSibling.previousSibling;
            }var node = convertNodesIntoANode(nodes);
            parent.insertBefore(node, viablePreviousSibling ? viablePreviousSibling.nextSibling : parent.firstChild);
        },
        after: function after() /*...nodes*/{
            var nodes = [].slice.call(arguments);
            var parent = this.parentNode;
            if (!parent) return;
            var viableNextSibling = this.nextSibling;
            while (nodes.indexOf(viableNextSibling) !== -1) {
                viableNextSibling = viableNextSibling.nextSibling;
            }var node = convertNodesIntoANode(nodes);
            parent.insertBefore(node, viableNextSibling);
        },
        replaceWith: function replaceWith() /*...nodes*/{
            var nodes = [].slice.call(arguments);
            var parent = this.parentNode;
            if (!parent) return;
            var viableNextSibling = this.nextSibling;
            while (nodes.indexOf(viableNextSibling) !== -1) {
                viableNextSibling = viableNextSibling.nextSibling;
            }var node = convertNodesIntoANode(nodes);

            if (this.parentNode === parent) parent.replaceChild(node, this);else parent.insertBefore(node, viableNextSibling);
        },
        remove: function remove() {
            if (!this.parentNode) return;
            this.parentNode.removeChild(this);
        }
    };

    mixin(global.DocumentType, ChildNode);
    mixin(global.Element, ChildNode);
    mixin(global.CharacterData, ChildNode);
})(self);

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
var version = exports.version = '0.7.4-localbuild';

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
    var $root = (0, _likeA$2.default)("#" + api.getContainerId());
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
        var currentSource = api.getCurrentQuality();
        if (api.getDuration() !== Infinity && currentSource.type !== _constants.PROVIDER_RTMP) {
            var body = {
                title: "Speed",
                value: api.getPlaybackRate() === 1 ? "Normal" : api.getPlaybackRate(),
                type: "playbackrate"
            };
            panel.body.push(body);
        }

        if (api.getQualityLevels().length > 0) {
            var currentQuality = api.getCurrentQuality();

            var _body = {
                title: "Source",
                value: currentQuality ? currentQuality.label : "Default",
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
    var $root = (0, _likeA$2.default)("#" + api.getContainerId());
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
        var magneticPosition = calculateMagnetic();
        $time.css('left', magneticPosition + "px");
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
            $time.show();
            $root.addClass("ovp-progressbar-hover");
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
    var $root = (0, _likeA$2.default)("#" + api.getContainerId());

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
                    isCheck: currentQuality.index === _i,
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

        if (percentage >= 70) {
            $volumeIconBig.show();
        } else if (percentage < 70 && percentage > 0) {
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
            var nodeLength = $target.get().length;
            if (nodeLength > 1) {
                var nodeList = $target.get();
                for (var i = 0; i < nodeLength; i++) {
                    nodeList[i].addEventListener(eventName, wrappedFunc);
                }
                //IE NodeList doesn't have forEach. It's wack.
                /*$target.get().forEach(function($item){
                    $item.addEventListener(eventName, wrappedFunc);
                });*/
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
            var nodeLength = $target.get().length;
            if (nodeLength > 1) {
                var nodeList = $target.get();
                for (var i = 0; i < nodeLength; i++) {
                    nodeList[i].removeEventListener(event.name, event.callback);
                }
                /*$target.get().forEach(function($item){
                    $item.removeEventListener(event.name, event.callback);
                });*/
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
    var $root = (0, _likeA$2.default)("#" + api.getContainerId());

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

            if (api.getCurrentQuality().index + 1 === api.getQualityLevels().length) {
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
    var viewTemplate = "",
        controls = "",
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
        viewTemplate = template;
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
            if (!(0, _likeA$2.default)(event.target).closest(".ovp-bottom-panel") && !(0, _likeA$2.default)(event.target).closest(".ovp-setting-panel")) {
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

            api.on(_constants.DESTROY, function (data) {
                viewTemplate.destroy();
            });

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
    return '<div class="ovenplayer ovp-wrapper" tabindex="-1" aria-label="" id="' + id + '">' + '<div class="ovp-ratio"></div>' + '<div class="ovp-player">' + '<div class="ovp-media-element-container" data-parent-id="' + id + '">' + '</div>' + '<div class="ovp-ui">' + '</div>' + '</div>' + '</div>';
};
exports.default = ViewTemplate;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9vdmVucGxheWVyLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLWZ1bGxzY3JlZW4tY29tcHJlc3Muc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1mdWxsc2NyZWVuLWV4cGFuZC5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXBsYXktbGFyZ2Uuc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1wbGF5LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItcmUtbGFyZ2Uuc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1zZXR0aW5nLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItc3RvcC1sYXJnZS5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXN0b3Auc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci12b2x1bWUtMi5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXZvbHVtZS1tdXRlLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItdm9sdW1lLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvY3NzL292ZW5wbGF5ZXIubGVzcz83MTVmIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvc2hpbXMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xpa2VBJC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvbG9nZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9wb2x5ZmlsbHMvZG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zdHJpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy91bmRlcnNjb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy92YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3dlYnBhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvZnVsbFNjcmVlbkJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9mdWxsU2NyZWVuQnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9tYWluVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcGxheUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9wbGF5QnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcHJvZ3Jlc3NCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcHJvZ3Jlc3NCYXJUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9zZXR0aW5nUGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvc2V0dGluZ1BhbmVsVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdGltZURpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdGltZURpc3BsYXlUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy92b2x1bWVCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdm9sdW1lQnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9lbmdpbmUvVGVtcGxhdGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2V4YW1wbGUvbWFpblRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2dsb2JhbC9TZXR0aW5nUGFuZWxMaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9iaWdCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL2JpZ0J1dHRvblRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9jb250ZXh0UGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL2NvbnRleHRQYW5lbFRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9tYWluVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL21lc3NhZ2VCb3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL21lc3NhZ2VCb3hUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9oZWxwZXIvc3Bpbm5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9oZWxwZXIvc3Bpbm5lclRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvdmlld1RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbIkFwaSIsImNvbnRhaW5lciIsImxvZ01hbmFnZXIiLCJ0aGF0IiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ2ZXJzaW9uIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiaW5pdFByb3ZpZGVyIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImRlZmF1bHQiLCJnZXRRdWFsaXR5TGFiZWwiLCJsYWJlbCIsImxvYWRQcm92aWRlcnMiLCJnZXRQbGF5bGlzdCIsInRoZW4iLCJkZXN0cm95IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJQcm92aWRlcnMiLCJnZXROYW1lIiwiUFJPVklERVJfUlRNUCIsIm9uIiwibmFtZSIsImRhdGEiLCJ0cmlnZ2VyIiwiRVJST1IiLCJjb2RlIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJwYXJzZUludCIsIk5FVFdPUktfVU5TVEFCTEVEIiwiY3VycmVudFF1YWxpdHkiLCJnZXRDdXJyZW50UXVhbGl0eSIsImluZGV4IiwiZ2V0UXVhbGl0eUxldmVscyIsInBhdXNlIiwic2V0Q3VycmVudFF1YWxpdHkiLCJwcmVsb2FkIiwiZmx1c2giLCJSRUFEWSIsImNhdGNoIiwiZXJyb3IiLCJlcnJvck9iamVjdCIsIklOSVRfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImluaXQiLCJvcHRpb25zIiwiaXNEZWJ1ZyIsImRpc2FibGUiLCJzZXRQbGF5bGlzdCIsImdldENvbmZpZyIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJnZXRWb2x1bWUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInBsYXlsaXN0IiwicGxheSIsInNlZWsiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsInNldERlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJxdWFsaXR5SW5kZXgiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwiaXNTYW1lUHJvdmlkZXIiLCJyZXNRdWFsaXR5SW5kZXgiLCJnZXRCdWZmZXIiLCJnZXRTdGF0ZSIsInN0b3AiLCJyZW1vdmUiLCJERVNUUk9ZIiwib2ZmIiwiT3ZlblBsYXllclNESyIsInJlbW92ZVBsYXllciIsImdldENvbnRhaW5lcklkIiwiQXBpUnRtcEV4cGFuc2lvbiIsImV4dGVybmFsQ2FsbGJhY2tDcmVlcCIsInJlc3VsdCIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsIkNvbmZpZ3VyYXRvciIsImNvbXBvc2VTb3VyY2VPcHRpb25zIiwiRGVmYXVsdHMiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5YmFja1JhdGVzIiwibXV0ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2VyaWFsaXplIiwidmFsIiwidW5kZWZpbmVkIiwibG93ZXJjYXNlVmFsIiwidG9Mb3dlckNhc2UiLCJpc05hTiIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJkZXNlcmlhbGl6ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwibm9ybWFsaXplU2l6ZSIsInNsaWNlIiwiZXZhbHVhdGVBc3BlY3RSYXRpbyIsImFyIiwidG9TdHJpbmciLCJpbmRleE9mIiwidGVzdCIsInciLCJzdWJzdHIiLCJoIiwiY29uZmlnIiwiYXNwZWN0cmF0aW8iLCJyYXRlQ29udHJvbHMiLCJyYXRlcyIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsIl8iLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJwdXNoIiwic29ydCIsImNvbmZpZ1BsYXlsaXN0Iiwib2JqIiwicGljayIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJkZWJ1ZyIsImltYWdlIiwicXVhbGl0eUxhYmVsIiwicmVwZWF0Iiwic3RyZXRjaGluZyIsImdldEFzcGVjdHJhdGlvIiwic2V0QXNwZWN0cmF0aW8iLCJhc3BlY3RyYXRpb18iLCJnZXREZWZhdWx0UGxheWJhY2tSYXRlIiwic2V0UXVhbGl0eUxhYmVsIiwibmV3TGFiZWwiLCJnZXRQbGF5YmFja1JhdGVzIiwiaXNQbGF5YmFja1JhdGVDb250cm9scyIsInBsYXlsaXN0XyIsImlzUmVwZWF0IiwiZ2V0U3RyZXRjaGluZyIsIkV2ZW50RW1pdHRlciIsIm9iamVjdCIsIl9ldmVudHMiLCJ0cmlnZ2VyRXZlbnRzIiwiZXZlbnRzIiwiYXJncyIsImNvbnRleHQiLCJldmVudCIsImxpc3RlbmVyIiwiYXBwbHkiLCJjYWxsIiwiYXJndW1lbnRzIiwiYWxsRXZlbnRzIiwiYWxsIiwibmFtZXMiLCJsIiwicmV0YWluIiwiaiIsImsiLCJfY2FsbGJhY2siLCJvbmNlIiwiY291bnQiLCJvbmNlQ2FsbGJhY2siLCJfbGlzdGVuZXIiLCJMYXp5Q29tbWFuZEV4ZWN1dG9yIiwiaW5zdGFuY2UiLCJxdWV1ZWRDb21tYW5kcyIsImNvbW1hbmRRdWV1ZSIsInVuZGVjb3JhdGVkTWV0aG9kcyIsImV4ZWN1dGVNb2RlIiwiY29tbWFuZCIsIm1ldGhvZCIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwiY29tbWFuZF8iLCJjb21tYW5kUXVldWVJdGVtIiwiZmluZFdoZXJlIiwic3BsaWNlIiwiZmluZEluZGV4IiwiU3VwcG9ydENoZWNrZXIiLCJzdXBwb3J0TGlzdCIsImNoZWNrU3VwcG9ydCIsInNvdXJjZSIsIk1pbWVUeXBlcyIsImFhYyIsIm1wNCIsImY0diIsIm00diIsIm1vdiIsIm1wMyIsIm1wZWciLCJvZ3YiLCJvZ2ciLCJvZ2EiLCJ2b3JiaXMiLCJ3ZWJtIiwiZjRhIiwibTN1OCIsIm0zdSIsImhscyIsInZpZGVvIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2FuUGxheVR5cGUiLCJmaWxlIiwidHlwZSIsIm1pbWVUeXBlIiwiaXNIbHNTdXBwb3J0IiwiZ2V0TWVkaWFTb3VyY2UiLCJ3aW5kb3ciLCJNZWRpYVNvdXJjZSIsIldlYktpdE1lZGlhU291cmNlIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXIiLCJTb3VyY2VCdWZmZXIiLCJXZWJLaXRTb3VyY2VCdWZmZXIiLCJpc1R5cGVTdXBwb3J0ZWQiLCJzb3VyY2VCdWZmZXJWYWxpZEFQSSIsImFwcGVuZEJ1ZmZlciIsImZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSIsInNvcnVjZV8iLCJmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QiLCJzdXBwb3J0TmFtZXMiLCJpdGVtIiwic3VwcG9ydGVkIiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIlBST1ZJREVSX0RBU0giLCJQUk9WSURFUl9ITFMiLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIkNPTlRFTlRfU0VFS0VEIiwiUExBWUVSX1NUQVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfVElNRSIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfTEVWRUxTIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJQTEFZRVJfVU5LTldPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiTWFuYWdlciIsImN1cnJlbnRQbGF5bGlzdCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwicmVwbGFjZSIsInByZXR0aWVkUGxheWxpc3QiLCJ0cmFja3MiLCJwbGF5bGlzdEl0ZW0iLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwiY2FwdGlvbnMiLCJjb25jYXQiLCJ0cmFjayIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsInByb3ZpZGVyIiwiUHJvdmlkZXJMb2FkZXIiLCJodG1sNSIsInJlcXVpcmUiLCJlcnIiLCJFcnJvciIsIndlYnJ0YyIsImRhc2giLCJydG1wIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJwcm92aWRlck5hbWUiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsInByb21pc2VGaW5hbGx5IiwiY2FsbGJhY2siLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXRGdW5jIiwic2V0VGltZW91dCIsInNldEltbWVkaWF0ZUZ1bmMiLCJzZXRJbW1lZGlhdGUiLCJub29wIiwiYmluZCIsImZuIiwidGhpc0FyZyIsIlByb21pc2VTaGltIiwiVHlwZUVycm9yIiwiX3N0YXRlIiwiX2hhbmRsZWQiLCJfdmFsdWUiLCJfZGVmZXJyZWRzIiwiZG9SZXNvbHZlIiwiaGFuZGxlIiwic2VsZiIsImRlZmVycmVkIiwiX2ltbWVkaWF0ZUZuIiwiY2IiLCJvbkZ1bGZpbGxlZCIsIm9uUmVqZWN0ZWQiLCJwcm9taXNlIiwicmV0IiwiZSIsIm5ld1ZhbHVlIiwiZmluYWxlIiwiX3VuaGFuZGxlZFJlamVjdGlvbkZuIiwibGVuIiwiSGFuZGxlciIsImRvbmUiLCJleCIsInByb20iLCJhcnIiLCJyZW1haW5pbmciLCJyZXMiLCJyYWNlIiwidmFsdWVzIiwiY29uc29sZSIsIndhcm4iLCJyZXNvbHZlZCIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwiT3ZlblBsYXllciIsImNyZWF0ZSIsImJyb3dzZXJOYW1lIiwiY29udGFpbmVyRWxlbWVudCIsInBsYXllciIsInBsYXllckluc3RhbmNlIiwiZ2V0TWVkaWFFbGVtZW50Q29udGFpbmVyIiwiaWQiLCJzZXRBcGkiLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub2RlVHlwZSIsImdldFBsYXllckxpc3QiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJnZXRQbGF5ZXJCeUluZGV4IiwicGxheWVySWQiLCJnZW5lcmF0ZVdlYnJ0Y1VybHMiLCJnZXRCcm93c2VyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibXNpZSIsImF2aWdhdG9yIiwiZG9jdW1lbnRNb2RlIiwibWF0Y2giLCJ1YSIsInN1YnN0cmluZyIsIkxhJCIsInNlbGVjdG9yT3JFbGVtZW50IiwicmV0dXJuTm9kZSIsIiRlbGVtZW50Iiwic2VsZWN0b3IiLCJub2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsImlzRWxlbWVudCIsImZpbmQiLCJjc3MiLCJlbGVtZW50Iiwic3R5bGUiLCJhZGRDbGFzcyIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZXMiLCJjbGFzc05hbWUiLCJzcGxpdCIsInJlbW92ZUNsYXNzIiwiUmVnRXhwIiwiam9pbiIsInJlbW92ZUF0dHJpYnV0ZSIsImF0dHJOYW1lIiwic2hvdyIsImRpc3BsYXkiLCJoaWRlIiwiYXBwZW5kIiwiaHRtbENvZGUiLCJpbm5lckhUTUwiLCJ0ZXh0IiwidGV4dENvbnRlbnQiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiaXMiLCIkdGFyZ2V0RWxlbWVudCIsIm9mZnNldCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJib2R5Iiwic2Nyb2xsVG9wIiwibGVmdCIsInNjcm9sbExlZnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImF0dHIiLCJnZXRBdHRyaWJ1dGUiLCJodG1sIiwicmVwbGFjZVdpdGgiLCJhcHBlbmRDaGlsZCIsInJlbW92ZUNoaWxkIiwiaGFzQ2hpbGROb2RlcyIsImZpcnN0Q2hpbGQiLCJnZXQiLCJjbG9zZXN0Iiwic2VsZWN0b3JTdHJpbmciLCJsb2dnZXIiLCJwcmV2Q29uc29sZUxvZyIsImVuYWJsZSIsImdsb2JhbCIsInNlbGVjdG9ycyIsImVsZW1lbnRzIiwiZG9jdW1lbnRFbGVtZW50IiwiX3FzYSIsInN0eWxlU2hlZXQiLCJjc3NUZXh0Iiwic2Nyb2xsQnkiLCJwYXJlbnROb2RlIiwicXVlcnlTZWxlY3RvciIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJTdHJpbmciLCJOb2RlIiwicCIsIkRPTUV4Y2VwdGlvbiIsIkVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVmaW5lUHJvcGVydHkiLCJFdmVudCIsIkNBUFRVUklOR19QSEFTRSIsIkFUX1RBUkdFVCIsIkJVQkJMSU5HX1BIQVNFIiwiZGVmaW5lUHJvcGVydGllcyIsInRhcmdldCIsInNyY0VsZW1lbnQiLCJjdXJyZW50VGFyZ2V0IiwiX2N1cnJlbnRUYXJnZXQiLCJldmVudFBoYXNlIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJ0aW1lU3RhbXAiLCJfdGltZVN0YW1wIiwic3RvcFByb3BhZ2F0aW9uIiwiY2FuY2VsQnViYmxlIiwicHJldmVudERlZmF1bHQiLCJyZXR1cm5WYWx1ZSIsImRlZmF1bHRQcmV2ZW50ZWQiLCJ1c2VDYXB0dXJlIiwiZiIsIkRhdGUiLCJub3ciLCJhdHRhY2hFdmVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkZXRhY2hFdmVudCIsIldpbmRvdyIsIkhUTUxEb2N1bWVudCIsIm8iLCJDdXN0b21FdmVudCIsInBhcmFtcyIsImRldGFpbCIsImV2dCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiYWRkRXZlbnQiLCJyZW1vdmVFdmVudCIsIkRPTVRva2VuTGlzdFNoaW0iLCJzIiwicmVtb3ZlVG9rZW5Gcm9tU3RyaW5nIiwidG9rZW4iLCJzdHJpbmciLCJ0b2tlbnMiLCJpZHgiLCJTeW50YXhFcnJvciIsInNvbWUiLCJ1bmRlcmx5aW5nX3N0cmluZyIsInRva2VuX2xpc3QiLCJ0b2dnbGUiLCJmb3JjZSIsIm4iLCJhZGRUb0VsZW1lbnRQcm90b3R5cGUiLCJnZXRDbGFzc0xpc3QiLCJlbGVtIiwiZ2V0UmVsTGlzdCIsInJlbExpc3QiLCJET01Ub2tlbkxpc3QiLCJwcmV2aW91c1NpYmxpbmciLCJFTEVNRU5UX05PREUiLCJuZXh0U2libGluZyIsIm1hdGNoZXMiLCJtc01hdGNoZXNTZWxlY3RvciIsIm9NYXRjaGVzU2VsZWN0b3IiLCJtb3pNYXRjaGVzU2VsZWN0b3IiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJvd25lckRvY3VtZW50IiwiZWwiLCJwYXJlbnRFbGVtZW50IiwibWl4aW4iLCJwcyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImNvbnZlcnROb2Rlc0ludG9BTm9kZSIsIm5vZGVzIiwibm9kZSIsImNyZWF0ZVRleHROb2RlIiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsIlBhcmVudE5vZGUiLCJwcmVwZW5kIiwiaW5zZXJ0QmVmb3JlIiwiRG9jdW1lbnQiLCJEb2N1bWVudEZyYWdtZW50IiwiQ2hpbGROb2RlIiwiYmVmb3JlIiwicGFyZW50IiwidmlhYmxlUHJldmlvdXNTaWJsaW5nIiwiYWZ0ZXIiLCJ2aWFibGVOZXh0U2libGluZyIsInJlcGxhY2VDaGlsZCIsIkRvY3VtZW50VHlwZSIsIkNoYXJhY3RlckRhdGEiLCJ0cmltIiwibmF0dXJhbEhtcyIsImV4dHJhY3RFeHRlbnNpb24iLCJwYXRoIiwiZ2V0QXp1cmVGaWxlRm9ybWF0IiwiZXh0ZW5zaW9uIiwiYXp1cmVkRm9ybWF0IiwibGFzdEluZGV4T2YiLCJzZWNvbmQiLCJzZWNOdW0iLCJob3VycyIsImZsb29yIiwibWludXRlcyIsInNlY29uZHMiLCJyIiwiU3ltYm9sIiwidSIsImMiLCJoYXNPd25Qcm9wZXJ0eSIsInQiLCJhIiwiX3dyYXBwZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiVkVSU0lPTiIsInYiLCJ5IiwiZCIsIml0ZXJhdGVlIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwicHJvcGVydHkiLCJnIiwibWF4IiwibSIsImIiLCJ4IiwicG93IiwiQSIsImVhY2giLCJjb2xsZWN0IiwiTyIsInJlZHVjZSIsImZvbGRsIiwiaW5qZWN0IiwicmVkdWNlUmlnaHQiLCJmb2xkciIsImRldGVjdCIsImZpbmRLZXkiLCJzZWxlY3QiLCJuZWdhdGUiLCJhbnkiLCJpbmNsdWRlcyIsImluY2x1ZGUiLCJpbnZva2UiLCJwbHVjayIsIndoZXJlIiwibWluIiwic2h1ZmZsZSIsInNhbXBsZSIsInJhbmRvbSIsImNsb25lIiwic29ydEJ5IiwiY3JpdGVyaWEiLCJncm91cEJ5IiwiaW5kZXhCeSIsImNvdW50QnkiLCJTIiwidG9BcnJheSIsImlzU3RyaW5nIiwic2l6ZSIsInBhcnRpdGlvbiIsImZpcnN0IiwiaGVhZCIsInRha2UiLCJpbml0aWFsIiwibGFzdCIsInJlc3QiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJCb29sZWFuIiwiTSIsImlzQXJndW1lbnRzIiwiZmxhdHRlbiIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzQm9vbGVhbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwidW56aXAiLCJ6aXAiLCJGIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwiRSIsInJhbmdlIiwiY2VpbCIsImNodW5rIiwiTiIsInBhcnRpYWwiLCJwbGFjZWhvbGRlciIsImJpbmRBbGwiLCJtZW1vaXplIiwiY2FjaGUiLCJkZWxheSIsImRlZmVyIiwidGhyb3R0bGUiLCJsZWFkaW5nIiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJjYW5jZWwiLCJkZWJvdW5jZSIsIndyYXAiLCJjb21wb3NlIiwicmVzdEFyZ3VtZW50cyIsIkkiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIlQiLCJCIiwiYWxsS2V5cyIsIm1hcE9iamVjdCIsInBhaXJzIiwiaW52ZXJ0IiwiZnVuY3Rpb25zIiwibWV0aG9kcyIsIlIiLCJleHRlbmQiLCJleHRlbmRPd24iLCJhc3NpZ24iLCJxIiwiSyIsInoiLCJvbWl0IiwiZGVmYXVsdHMiLCJ0YXAiLCJpc01hdGNoIiwidmFsdWVPZiIsInBvcCIsImlzRXF1YWwiLCJpc0VtcHR5IiwiRCIsImNoaWxkTm9kZXMiLCJJbnQ4QXJyYXkiLCJpc0Zpbml0ZSIsImlzU3ltYm9sIiwiaXNOdWxsIiwiaXNVbmRlZmluZWQiLCJoYXMiLCJub0NvbmZsaWN0IiwiY29uc3RhbnQiLCJwcm9wZXJ0eU9mIiwidGltZXMiLCJnZXRUaW1lIiwiTCIsIlAiLCJXIiwiZXNjYXBlIiwidW5lc2NhcGUiLCJDIiwidW5pcXVlSWQiLCJ0ZW1wbGF0ZVNldHRpbmdzIiwiZXZhbHVhdGUiLCJpbnRlcnBvbGF0ZSIsIkoiLCJVIiwiViIsIiQiLCJ0ZW1wbGF0ZSIsInZhcmlhYmxlIiwiRnVuY3Rpb24iLCJjaGFpbiIsIl9jaGFpbiIsIkciLCJ0b0pTT04iLCJpc1J0bXAiLCJpc1dlYlJUQyIsImlzRGFzaCIsImdldFNjcmlwdFBhdGgiLCJzY3JpcHROYW1lIiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3JjIiwiRnVsbFNjcmVlbkJ1dHRvbiIsIiRjb250YWluZXIiLCJhcGkiLCIkcm9vdCIsIiRpY29uRXhwYW5kIiwiJGljb25Db21wcmVzcyIsImlzRnVsbFNjcmVlbiIsImZ1bGxTY3JlZW5FdmVudFR5cGVzIiwib25mdWxsc2NyZWVuY2hhbmdlIiwib25tb3pmdWxsc2NyZWVuY2hhbmdlIiwib253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIiwiTVNGdWxsc2NyZWVuQ2hhbmdlIiwiZnVsbFNjcmVlbkNoYW5nZWRDYWxsYmFjayIsImNoZWNrRnVsbFNjcmVlbiIsImZ1bGxzY3JlZW5FbGVtZW50Iiwid2Via2l0RnVsbHNjcmVlbkVsZW1lbnQiLCJtb3pGdWxsU2NyZWVuRWxlbWVudCIsIm1zRnVsbHNjcmVlbkVsZW1lbnQiLCJyZXF1ZXN0RnVsbFNjcmVlbiIsInJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4iLCJtb3pSZXF1ZXN0RnVsbFNjcmVlbiIsIm1zUmVxdWVzdEZ1bGxzY3JlZW4iLCJleGl0RnVsbFNjcmVlbiIsImV4aXRGdWxsc2NyZWVuIiwid2Via2l0RXhpdEZ1bGxzY3JlZW4iLCJtb3pDYW5jZWxGdWxsU2NyZWVuIiwibXNFeGl0RnVsbHNjcmVlbiIsInRvZ2dsZUZ1bGxTY3JlZW4iLCJvblJlbmRlcmVkIiwiJGN1cnJlbnQiLCJldmVudE5hbWUiLCJvbkRlc3Ryb3llZCIsIkNvbnRyb2xzIiwidm9sdW1lQnV0dG9uIiwicGxheUJ1dHRvbiIsInByb2dyZXNzQmFyIiwidGltZURpc3BsYXkiLCJmdWxsU2NyZWVuQnV0dG9uIiwiZ2VuZXJhdGVNYWluUGFuZWxEYXRhIiwicGFuZWwiLCJ0aXRsZSIsImlzTWFpbiIsIkluZmluaXR5IiwiaW5pdFRpbWVEaXNwbGF5IiwiaW5pdFByb2dyZXNzQmFyIiwic2V0TW91c2VEb3duIiwiU2V0dGluZ1BhbmVsTGlzdCIsInNldHRpbmdQYW5lbCIsIlBsYXlCdXR0b24iLCIkaWNvblBsYXkiLCIkaWNvblBhdXNlIiwiJGljb25SZXBsYXkiLCJzZXRCdXR0b25TdGF0ZSIsIm5ld3N0YXRlIiwiY3VycmVudFN0YXRlIiwiUHJvZ3Jlc3NCYXIiLCJjdXJyZW50UGxheWluZ1Bvc2l0aW9uIiwiY3VycmVudFBsYXlpbmdQZXJjZW50YWdlIiwiY3VycmVudExvYWRlZFBlcmNlbnRhZ2UiLCJtb3VzZUluc2lkZSIsIm1vdXNlRG93biIsIiRwcm9ncmVzc0JhciIsIiRwcm9ncmVzc0xvYWQiLCIkcHJvZ3Jlc3NQbGF5IiwiJHByb2dyZXNzSG92ZXIiLCIka25vYkNvbnRhaW5lciIsIiRrbm9iIiwia25vYldpZHRoIiwiJHRpbWUiLCJwb3NpdGlvbkVsZW1lbnRzIiwicGVyY2VudGFnZSIsInByb2dyZXNzQmFyV2lkdGgiLCJrbm9iUG9zdGlvbiIsImRyYXdIb3ZlclByb2dyZXNzIiwiaG92ZXJQb3NpdGlvbiIsImRyYXdMb2FkUHJvZ3Jlc3MiLCJsb2FkUG9zaXRpb24iLCJjYWxjdWxhdGVQZXJjZW50YWdlIiwicHJvZ3Jlc3NCYXJPZmZzZXRYIiwicG9pbnRlck9mZnNldFgiLCJwYWdlWCIsImRyYXdUaW1lSW5kaWNhdG9yIiwiaG1zIiwidGltZUVsZW1XaWR0aCIsInBvc2l0aW9uT2ZQaXhlbCIsImNhbGN1bGF0ZU1hZ25ldGljIiwibWFnbmV0aWNQb3NpdGlvbiIsImJ1ZmZlclBlcmNlbnQiLCJQTEFZRVJfTUlOX0hFSUdIVCIsIlNldHRpbmdQYW5lbCIsImV4dHJhY3RQYW5lbERhdGEiLCJwYW5lbFR5cGUiLCJwbGF5QmFja1JhdGVzIiwiY3VycmVudFBsYXliYWNrUmF0ZSIsImlzQ2hlY2siLCJxdWFsaXR5TGV2ZWxzIiwic2V0dGluZ0l0ZW1UZW1wbGF0ZSIsInNldHRpbmdWYWx1ZVRlbXBsYXRlIiwiVGltZURpc3BsYXkiLCIkcG9zaXRpb24iLCIkZHVyYXRpb24iLCJjb252ZXJ0SHVtYW5pemVUaW1lIiwidGltZSIsIlZvbHVtZUJ1dHRvbiIsIiRzbGlkZXJDb250YWluZXIiLCIkc2xpZGVyIiwiJHNsaWRlckhhbmRsZSIsIiRzbGlkZXJWYWx1ZSIsIiR2b2x1bWVJY29uQmlnIiwiJHZvbHVtZUljb25TbWFsbCIsIiR2b2x1bWVJY29uTXV0ZSIsInNsaWRlcldpZHRoIiwiaGFuZGxlV2lkdGgiLCJtaW5SYW5nZSIsIm1heFJhbmdlIiwic2V0Vm9sdW1lSWNvbiIsInNldFZvbHVtZVVJIiwiaGFuZGxlUG9zaXRpb24iLCJyZWxhdGl2ZVgiLCJPdmVuVGVtcGxhdGUiLCJ0ZW1wbGF0ZU5hbWUiLCJpc1Jvb3QiLCIkdGVtcGxhdGUiLCJ2aWV3RXZlbnRzIiwiY3JlYXRlQW5kU2VsZWN0RWxlbWVudCIsIm5ld0VsZW1lbnQiLCJUZW1wbGF0ZXMiLCJleHBsb2RlZFRleHQiLCJldmVudFN0cmluZyIsIiR0YXJnZXQiLCJ3cmFwcGVkRnVuYyIsIm5vZGVMZW5ndGgiLCJUZXh0Vmlld1RlbXBsYXRlIiwiVmlld1RlbXBsYXRlIiwiSGVscGVyVGVtcGxhdGUiLCJCaWdCdXR0b25UZW1wbGF0ZSIsIk1lc3NhZ2VCb3hUZW1wbGF0ZSIsIlNwaW5uZXJUZW1wbGF0ZSIsIkNvbnRleHRQYW5lbFRlbXBsYXRlIiwiQ29udHJvbHNUZW1wbGF0ZSIsIlZvbHVtZUJ1dHRvblRlbXBsYXRlIiwiUHJvZ3Jlc3NCYXJUZW1wbGF0ZSIsIlBsYXlCdXR0b25UZW1wbGF0ZSIsIlRpbWVEaXNwbGF5VGVtcGxhdGUiLCJGdWxsU2NyZWVuQnV0dG9uVGVtcGxhdGUiLCJTZXR0aW5nUGFuZWxUZW1wbGF0ZSIsIkJpZ0J1dHRvbiIsInBsYXllclN0YXRlIiwiQ29udGV4dFBhbmVsIiwicGFuZWxXaWR0aCIsInBhbmVsSGVpZ2h0IiwicGFnZVkiLCJvcGVuIiwiSGVscGVyIiwiYmlnQnV0dG9uIiwibWVzc2FnZUJveCIsInNwaW5uZXIiLCJjcmVhdGVCaWdCdXR0b24iLCJjcmVhdGVNZXNzYWdlIiwid2l0aFRpbWVyIiwiTWVzc2FnZUJveCIsImF1dG9EZXN0cm95VGltZXIiLCJTcGlubmVyIiwiJHNwaW5uZXIiLCJpc1Nob3ciLCJWaWV3Iiwidmlld1RlbXBsYXRlIiwiY29udHJvbHMiLCJoZWxwZXIiLCIkcGxheWVyUm9vdCIsImNvbnRleHRQYW5lbCIsImF1dG9IaWRlVGltZXIiLCJzZXRIaWRlIiwiYXV0b0hpZGUiLCJ0b2dnbGVQbGF5UGF1c2UiLCJpc1Jld2luZCIsImN1cnJlbnRQb3NpdGlvbiIsImlzVXAiLCJjdXJyZW50Vm9sdW1uIiwibmV3Vm9sdW1lIiwiY3JlYXRlQ29udGV4dFBhbmVsIiwia2V5Q29kZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBLGlEQUF5QyxrakJBQWtqQjtBQUMzbEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBLHlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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QUFZcGdCLElBQVosQ0FBaUIsU0FBakIsQ0FBVCxFQUFzQ2hDLGNBQXRDLENBQVg7O0FBRUE0WCxnQkFBSXJ1QixFQUFKLENBQU95RCxrQkFBUCxFQUFnQixVQUFTdkQsSUFBVCxFQUFlO0FBQzNCdzRCLDZCQUFhaDVCLE9BQWI7QUFDSCxhQUZEOztBQUlBMnVCLGdCQUFJcnVCLEVBQUosQ0FBT29QLHVCQUFQLEVBQXFCLFVBQVNsUCxJQUFULEVBQWM7QUFDL0Isb0JBQUdBLFFBQVFBLEtBQUt1eEIsUUFBaEIsRUFBeUI7QUFDckIsd0JBQUd2eEIsS0FBS3V4QixRQUFMLEtBQWtCbmpCLHdCQUFyQixFQUFtQztBQUMvQjBxQixnQ0FBUSxLQUFSLEVBQWUsSUFBZjtBQUNILHFCQUZELE1BRUs7QUFDREEsZ0NBQVEsS0FBUjtBQUNIO0FBQ0o7QUFDSixhQVJEO0FBU0g7QUF0QndHLEtBQXRHLENBQVA7QUF3QkgsQ0F0TEQ7O2tCQTBMZVAsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyTmY7Ozs7QUFJQSxJQUFNaEMsZUFBZSxTQUFmQSxZQUFlLENBQVM5ZixFQUFULEVBQVk7QUFDN0IsV0FBTyx5RUFBdUVBLEVBQXZFLEdBQTBFLElBQTFFLEdBQ0ssK0JBREwsR0FFSywwQkFGTCxHQUdTLDJEQUhULEdBR3FFQSxFQUhyRSxHQUd3RSxJQUh4RSxHQUlTLFFBSlQsR0FLUyxzQkFMVCxHQU1TLFFBTlQsR0FPSyxRQVBMLEdBUUMsUUFSUjtBQVNILENBVkQ7a0JBV2U4ZixZIiwiZmlsZSI6Im92ZW5wbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXJcIjogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHtcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJyk7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9vdmVucGxheWVyLmpzXCIpO1xuIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGNoYXJzZXQgXFxcIlVURi04XFxcIjsub3ZwLXdyYXBwZXJ7cG9zaXRpb246cmVsYXRpdmU7bWF4LWhlaWdodDoxMDAlO292ZXJmbG93OmhpZGRlbjt6b29tOjEgIWltcG9ydGFudDt3aWR0aDoxMDAlO2Rpc3BsYXk6YmxvY2s7YmFja2dyb3VuZC1jb2xvcjojMDAwOy1tb3otYm94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveDtjb2xvcjojZWVlO2ZvbnQtZmFtaWx5OidOb3RvIFNhbnMnLHNhbnMtc2VyaWY7Zm9udC1zaXplOjExcHg7bGluZS1oZWlnaHQ6MS4zO2ZvbnQtd2VpZ2h0Om5vcm1hbDtvdXRsaW5lOjB9Lm92cC13cmFwcGVyIG9iamVjdHt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5vdnAtd3JhcHBlcjpiZWZvcmUsLm92cC13cmFwcGVyOmFmdGVyey1tb3otYm94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ub3ZwLXdyYXBwZXIgKiwub3ZwLXdyYXBwZXIgKjpiZWZvcmUsLm92cC13cmFwcGVyICo6YWZ0ZXJ7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94fS5vdnAtd3JhcHBlci5vdnAtZnVsbHNjcmVlbntoZWlnaHQ6MTAwJSAhaW1wb3J0YW50fS5vdnAtd3JhcHBlci5vdnAtYXV0b2hpZGV7Y3Vyc29yOm5vbmV9Lm92cC13cmFwcGVyLm92cC1hdXRvaGlkZSAub3ZwLWdyYWRpZW50LXRvcCwub3ZwLXdyYXBwZXIub3ZwLWF1dG9oaWRlIC5vdnAtZ3JhZGllbnQtYm90dG9tLC5vdnAtd3JhcHBlci5vdnAtYXV0b2hpZGUgLm92cC1ib3R0b20tcGFuZWx7b3BhY2l0eTowfS5vdnAtd3JhcHBlci5vdnAtYXV0b2hpZGUgLm92cC1wcm9ncmVzc2Jhci1jb250YWluZXIsLm92cC13cmFwcGVyLm92cC1hdXRvaGlkZSAub3ZwLWNvbnRyb2xzIC5vdnAtYnV0dG9ue2N1cnNvcjpub25lfS5vdnAtd3JhcHBlci5vdnAtYXV0b2hpZGUgLm92cC1jYXB0aW9uLXRleHQtY29udGFpbmVye2JvdHRvbToyNXB4fS5vdnAtd3JhcHBlciAub3ZwLXJhdGlve3BhZGRpbmctYm90dG9tOjU2LjI1JX0ub3ZwLXBsYXllcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDt3aWR0aDoxMDAlfS5vdnAtcGxheWVyIC5vdnAtbWVkaWEtZWxlbWVudC1jb250YWluZXJ7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5vdnAtcGxheWVyIC5vdnAtbWVkaWEtZWxlbWVudC1jb250YWluZXI+Knt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5vdnAtcGxheWVyIC5vdnAtdWl7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0ub3ZwLWJ1dHRvbntkaXNwbGF5OmlubGluZS1ibG9jaztib3JkZXI6bm9uZTtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50O3BhZGRpbmc6MDtjb2xvcjppbmhlcml0O3RleHQtYWxpZ246aW5oZXJpdDtvdmVyZmxvdzpoaWRkZW47Zm9udC13ZWlnaHQ6MTAwfS5vdnAtYnV0dG9uOmZvY3VzLC5vdnAtYnV0dG9ue291dGxpbmU6MH0ub3ZwLWdyYWRpZW50LXRvcCwub3ZwLWdyYWRpZW50LWJvdHRvbXt3aWR0aDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtY29sb3I6IzEyMTIxYztwb2ludGVyLWV2ZW50czpub25lO29wYWNpdHk6LjM7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTt0cmFuc2l0aW9uOm9wYWNpdHkgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpfS5vdnAtZ3JhZGllbnQtYm90dG9te2hlaWdodDo1MHB4O2JvdHRvbTowO3otaW5kZXg6MjJ9Lm92cC1zcGlubmVyLWNvbnRhaW5lcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtkaXNwbGF5Om5vbmV9Lm92cC1zcGlubmVyLWNvbnRhaW5lciAub3ZwLXNwaW5uZXJ7d2lkdGg6NzBweDtoZWlnaHQ6MThweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlO21hcmdpbi10b3A6LTlweDttYXJnaW4tbGVmdDotMzVweDt0ZXh0LWFsaWduOmNlbnRlcn0ub3ZwLXNwaW5uZXItY29udGFpbmVyIC5vdnAtc3Bpbm5lcj5kaXZ7d2lkdGg6MThweDtoZWlnaHQ6MThweDtiYWNrZ3JvdW5kLWNvbG9yOiM1MGUzYzI7Ym9yZGVyLXJhZGl1czoxMDAlO2Rpc3BsYXk6aW5saW5lLWJsb2NrOy13ZWJraXQtYW5pbWF0aW9uOnNrLWJvdW5jZWRlbGF5IDEuNHMgaW5maW5pdGUgZWFzZS1pbi1vdXQgYm90aDthbmltYXRpb246c2stYm91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RofS5vdnAtc3Bpbm5lci1jb250YWluZXIgLm92cC1zcGlubmVyIC5ib3VuY2Uxey13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0wLjMyczthbmltYXRpb24tZGVsYXk6LTAuMzJzfS5vdnAtc3Bpbm5lci1jb250YWluZXIgLm92cC1zcGlubmVyIC5ib3VuY2Uyey13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0wLjE2czthbmltYXRpb24tZGVsYXk6LTAuMTZzfUAtd2Via2l0LWtleWZyYW1lcyBzay1ib3VuY2VkZWxheXswJSw4MCUsMTAwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKX00MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSl9fUBrZXlmcmFtZXMgc2stYm91bmNlZGVsYXl7MCUsODAlLDEwMCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfTQwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9fS5vdnAtbWVzc2FnZS1ib3h7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Lm92cC1tZXNzYWdlLWJveCAub3ZwLW1lc3NhZ2UtY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDo2MHB4O3dpZHRoOjEwMCU7cGFkZGluZzowIDEycHg7dGV4dC1hbGlnbjpjZW50ZXJ9Lm92cC1tZXNzYWdlLWJveCAub3ZwLW1lc3NhZ2UtY29udGFpbmVyIC5vdnAtbWVzc2FnZS10ZXh0e2ZvbnQtc2l6ZToxNDAlO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwwLjUpO2NvbG9yOiNmZmY7cGFkZGluZzouMWVtIC4zZW07d29yZC13cmFwOmJyZWFrLXdvcmQ7bGluZS1oZWlnaHQ6MS41ZW19Lm92cC1iaWdidXR0b24tY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5vdnAtYmlnYnV0dG9uLWNvbnRhaW5lciAub3ZwLWJpZ2J1dHRvbntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlO3dpZHRoOjgwcHg7aGVpZ2h0OjgwcHg7bWFyZ2luLXRvcDotNDBweDttYXJnaW4tbGVmdDotNDBweDt0ZXh0LWFsaWduOmNlbnRlcn0ub3ZwLWJpZ2J1dHRvbi1jb250YWluZXIgLm92cC1iaWdidXR0b24ub3ZwLWJpZ2J1dHRvbi1wbGF5e2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1wbGF5LWxhcmdlLnN2Z1wiKSkgKyBcIik7YmFja2dyb3VuZC1zaXplOjEwMCV9Lm92cC1iaWdidXR0b24tY29udGFpbmVyIC5vdnAtYmlnYnV0dG9uLm92cC1iaWdidXR0b24tcGF1c2V7YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXN0b3AtbGFyZ2Uuc3ZnXCIpKSArIFwiKTtiYWNrZ3JvdW5kLXNpemU6MTAwJX0ub3ZwLWJpZ2J1dHRvbi1jb250YWluZXIgLm92cC1iaWdidXR0b24ub3ZwLWJpZ2J1dHRvbi1yZXBsYXl7YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXJlLWxhcmdlLnN2Z1wiKSkgKyBcIik7YmFja2dyb3VuZC1zaXplOjEwMCV9Lm92cC1zZXR0aW5nLXBhbmVse3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTo1NXB4O3JpZ2h0OjEycHg7b3ZlcmZsb3cteTphdXRvO3dpZHRoOjI2MHB4O2ZvbnQtc2l6ZToxMjAlO3VzZXItc2VsZWN0Om5vbmU7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI4LDI4LDI4LDAuOSk7dGV4dC1zaGFkb3c6MCAwIDJweCByZ2JhKDAsMCwwLDAuNSl9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy10aXRsZSwub3ZwLXNldHRpbmctcGFuZWwgLm92cC1zZXR0aW5nLWl0ZW17d2lkdGg6MTAwJTtoZWlnaHQ6MzhweDtsaW5lLWhlaWdodDozOHB4O2NvbG9yOiNlZWU7Y3Vyc29yOnBvaW50ZXI7b3V0bGluZTpub25lfS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctdGl0bGUtY29udGFpbmVyIC5vdnAtc2V0dGluZy10aXRsZSAub3ZwLXNldHRpbmctdGl0bGUtdGl0bGV7cGFkZGluZy1sZWZ0OjEycHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy10aXRsZS1jb250YWluZXIgLm92cC1zZXR0aW5nLXRpdGxlIC5vdnAtc2V0dGluZy10aXRsZS1wcmV2aWNvbntwYWRkaW5nOjAgMCAwIDEycHg7bWFyZ2luLXJpZ2h0Oi02cHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lciAub3ZwLXNldHRpbmctaXRlbTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsMC4xKX0ub3ZwLXNldHRpbmctcGFuZWwgLm92cC1zZXR0aW5nLWl0ZW0tY29udGFpbmVyIC5vdnAtc2V0dGluZy1pdGVtIC5vdnAtc2V0dGluZy1pdGVtLXRpdGxle3BhZGRpbmctbGVmdDoxMnB4fS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbS1jb250YWluZXIgLm92cC1zZXR0aW5nLWl0ZW0gLm92cC1zZXR0aW5nLWl0ZW0tbmV4dGljb257ZmxvYXQ6cmlnaHQ7cGFkZGluZy1yaWdodDoxMnB4O21hcmdpbi1sZWZ0Oi02cHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lciAub3ZwLXNldHRpbmctaXRlbSBzcGFuLm92cC1zZXR0aW5nLWl0ZW0tdmFsdWV7ZmxvYXQ6cmlnaHQ7cGFkZGluZy1yaWdodDoxMnB4fS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbS1jb250YWluZXIgLm92cC1zZXR0aW5nLWl0ZW0ub3ZwLXNldHRpbmctaXRlbS12YWx1ZSAub3ZwLXNldHRpbmctaXRlbS10aXRsZXttYXJnaW4tbGVmdDotNnB4fS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbS1jb250YWluZXIgLm92cC1zZXR0aW5nLWl0ZW0ub3ZwLXNldHRpbmctaXRlbS12YWx1ZSAub3ZwLXNldHRpbmctaXRlbS1jaGVja2Vke3BhZGRpbmctbGVmdDoxMnB4O3Zpc2liaWxpdHk6aGlkZGVufS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbS1jb250YWluZXIgLm92cC1zZXR0aW5nLWl0ZW0ub3ZwLXNldHRpbmctaXRlbS12YWx1ZSAub3ZwLXNldHRpbmctaXRlbS1jaGVja2VkLm92cC1zaG93e3Zpc2liaWxpdHk6dmlzaWJsZX0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbHtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjBweDtyaWdodDowcHg7Ym90dG9tOjBweDtoZWlnaHQ6NTBweDt6LWluZGV4OjYwOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuMjVzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7dHJhbnNpdGlvbjpvcGFjaXR5IC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKX0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLXByb2dyZXNzYmFyLWNvbnRhaW5lcntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCU7Ym90dG9tOjUwcHg7aGVpZ2h0OjRweDtjdXJzb3I6cG9pbnRlcn0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLXByb2dyZXNzYmFyLWNvbnRhaW5lciAub3ZwLXByb2dyZXNzYmFyLXBhZGRpbmd7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtoZWlnaHQ6MTZweDtib3R0b206MDt6LWluZGV4OjI4fS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtY29udHJvbHN7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7d2lkdGg6MTAwJTtoZWlnaHQ6NTBweDt0ZXh0LWFsaWduOmxlZnR9Lm92cC1jb250cm9scy1jb250YWluZXIgLm92cC1ib3R0b20tcGFuZWwgLm92cC1jb250cm9scyAub3ZwLWJ1dHRvbnttaW4td2lkdGg6MzBweDtoZWlnaHQ6MzBweDtjdXJzb3I6cG9pbnRlcn0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLWNvbnRyb2xzIC5vdnAtbGVmdC1jb250cm9sc3tmbG9hdDpsZWZ0O2hlaWdodDoxMDAlfS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtY29udHJvbHMgLm92cC1yaWdodC1jb250cm9sc3tmbG9hdDpyaWdodDtoZWlnaHQ6MTAwJX0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLWNvbnRyb2xzIC5vdnAtcmlnaHQtY29udHJvbHMgLm92cC1zZXR0aW5nLWJ1dHRvbntwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTBweDttYXJnaW4tcmlnaHQ6MTJweH0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLWNvbnRyb2xzIC5vdnAtcmlnaHQtY29udHJvbHMgLm92cC1zZXR0aW5nLWJ1dHRvbj5pe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1zaXplOjEwMCU7YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXNldHRpbmcuc3ZnXCIpKSArIFwiKX0ub3ZwLXByb2dyZXNzYmFye3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3otaW5kZXg6MzE7b3V0bGluZTpub25lfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wbGF5LWJhY2tncm91bmQtY29sb3J7YmFja2dyb3VuZC1jb2xvcjojNTBlM2MyfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzcy1saXN0e3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoxMDAlO2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwwLjIpO3otaW5kZXg6Mzl9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzLWxpc3QgLm92cC1sb2FkLXByb2dyZXNzLC5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzcy1saXN0IC5vdnAtcGxheS1wcm9ncmVzcywub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3MtbGlzdCAub3ZwLWhvdmVyLXByb2dyZXNze3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtib3R0b206MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlOy1tb3otdHJhbnNmb3JtLW9yaWdpbjowIDA7LW1zLXRyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDB9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzLWxpc3QgLm92cC1wbGF5LXByb2dyZXNze3dpZHRoOjA7ei1pbmRleDozNDstd2Via2l0LXRyYW5zaXRpb246d2lkdGggLjFzIGVhc2U7dHJhbnNpdGlvbjp3aWR0aCAuMXMgZWFzZX0ub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3MtbGlzdCAub3ZwLWxvYWQtcHJvZ3Jlc3N7d2lkdGg6MDt6LWluZGV4OjMzO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwwLjUpOy13ZWJraXQtdHJhbnNpdGlvbjp3aWR0aCAuNXMgZWFzZTt0cmFuc2l0aW9uOndpZHRoIC41cyBlYXNlfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzcy1saXN0IC5vdnAtaG92ZXItcHJvZ3Jlc3N7bGVmdDowO3dpZHRoOjA7ei1pbmRleDozNTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsMC42KX0ub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3NiYXIta25vYi1jb250YWluZXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOi01cHg7bGVmdDowcHg7ei1pbmRleDo0MzstbW96LXRyYW5zaXRpb246LW1vei10cmFuc2Zvcm0gLjFzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7LXdlYmtpdC10cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4xcyBjdWJpYy1iZXppZXIoLjQsIDAsIDEsIDEpOy1tcy10cmFuc2l0aW9uOi1tcy10cmFuc2Zvcm0gLjFzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjFzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7LW1vei10cmFuc2Zvcm06c2NhbGUoMCk7LW1zLXRyYW5zZm9ybTpzY2FsZSgwKTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzYmFyLWtub2ItY29udGFpbmVyIC5vdnAtcHJvZ3Jlc3NiYXIta25vYnt3aWR0aDoxNHB4O2hlaWdodDoxNHB4O2JvcmRlci1yYWRpdXM6N3B4Oy13ZWJraXQtdHJhbnNpdGlvbjp3aWR0aCAuMXMgZWFzZTt0cmFuc2l0aW9uOndpZHRoIC4xcyBlYXNlfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzc2Jhci10aW1le2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MTVweDtsZWZ0OmF1dG87d2lkdGg6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjgsMjgsMjgsMC45KTtib3JkZXItcmFkaXVzOjJweDtwYWRkaW5nOjVweCA5cHg7Zm9udC1zaXplOjExOCU7bGluZS1oZWlnaHQ6MTVweDt1c2VyLXNlbGVjdDpub25lfS5vdnAtcHJvZ3Jlc3NiYXItaG92ZXIgLm92cC1wcm9ncmVzc2Jhci1rbm9iLWNvbnRhaW5lcnstbW96LXRyYW5zZm9ybTpub25lOy1tcy10cmFuc2Zvcm06bm9uZTstd2Via2l0LXRyYW5zZm9ybTpub25lO3RyYW5zZm9ybTpub25lOy1tb3otdHJhbnNpdGlvbjotbW96LXRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTstd2Via2l0LXRyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjFzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7LW1zLXRyYW5zaXRpb246LW1zLXRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKX0ub3ZwLXByb2dyZXNzYmFyLWhvdmVyIC5vdnAtcHJvZ3Jlc3NiYXItdGltZXtkaXNwbGF5OmlubGluZS1ibG9ja30ub3ZwLW9uLWVycm9yIC5vdnAtcHJvZ3Jlc3NiYXItdGltZXtkaXNwbGF5Om5vbmV9Lm92cC1wbGF5LWJ1dHRvbntwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTBweDttYXJnaW4tbGVmdDoxNXB4fS5vdnAtcGxheS1idXR0b24+aXtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JhY2tncm91bmQtc2l6ZToxMDAlfS5vdnAtcGxheS1idXR0b24gLm92cC1wbGF5LWJ1dHRvbi1wbGF5aWNvbntiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItcGxheS5zdmdcIikpICsgXCIpfS5vdnAtcGxheS1idXR0b24gLm92cC1wbGF5LWJ1dHRvbi1wYXVzZWljb257YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXN0b3Auc3ZnXCIpKSArIFwiKX0ub3ZwLXZvbHVtZS1jb250cm9sbGVye2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxMHB4O21hcmdpbi1sZWZ0OjEycHg7aGVpZ2h0OjMwcHh9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1idXR0b24+aXtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JhY2tncm91bmQtc2l6ZToxMDAlfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtYnV0dG9uIC5vdnAtdm9sdW1lLWJ1dHRvbi1iaWdpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci12b2x1bWUuc3ZnXCIpKSArIFwiKX0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLWJ1dHRvbiAub3ZwLXZvbHVtZS1idXR0b24tc21hbGxpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci12b2x1bWUtMi5zdmdcIikpICsgXCIpfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtYnV0dG9uIC5vdnAtdm9sdW1lLWJ1dHRvbi1tdXRlaWNvbntiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItdm9sdW1lLW11dGUuc3ZnXCIpKSArIFwiKX0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MHB4O2hlaWdodDoxMDAlO292ZXJmbG93OmhpZGRlbjtjdXJzb3I6cG9pbnRlcjt1c2VyLXNlbGVjdDpub25lO291dGxpbmU6bm9uZTstbW96LXRyYW5zaXRpb246bWFyZ2luIC4ycyBjdWJpYy1iZXppZXIoLjQsIDAsIDEsIDEpLHdpZHRoIC4ycyBjdWJpYy1iZXppZXIoLjQsIDAsIDEsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSksd2lkdGggLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7dHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSksd2lkdGggLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSl9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyLmFjdGl2ZXt3aWR0aDo3MHB4O21hcmdpbi1sZWZ0OjhweDttYXJnaW4tcmlnaHQ6MDstbW96LXRyYW5zaXRpb246bWFyZ2luIC4ycyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpLHdpZHRoIC4ycyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSksd2lkdGggLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7dHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSksd2lkdGggLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSl9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlcntoZWlnaHQ6MTAwJTtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItYmcsLm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItdmFsdWV7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpibG9jaztsZWZ0OjA7dG9wOjUwJTtoZWlnaHQ6NHB4O21hcmdpbi10b3A6LTJweDtib3JkZXItcmFkaXVzOjEwcHh9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItYmd7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kOiNmZmZ9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItdmFsdWV7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kOiM1MGUzYzJ9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItaGFuZGxle3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDozMHB4O3dpZHRoOjEycHg7aGVpZ2h0OjEycHg7Ym9yZGVyLXJhZGl1czo2cHg7bWFyZ2luLXRvcDotNnB4O2JhY2tncm91bmQ6I2ZmZn0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci1oYW5kbGU6YmVmb3JlLC5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lciAub3ZwLXZvbHVtZS1zaWxkZXIgLm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZTphZnRlcntjb250ZW50OicnO3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6bm9uZTt0b3A6NTAlO2hlaWdodDo0cHg7bWFyZ2luLXRvcDotMnB4O3dpZHRoOjgwcHg7ei1pbmRleDotMX0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci1oYW5kbGU6YmVmb3Jle2xlZnQ6LTU4cHg7YmFja2dyb3VuZDojNTBlM2MyfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lciAub3ZwLXZvbHVtZS1zaWxkZXIgLm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZTphZnRlcntsZWZ0OjZweDtiYWNrZ3JvdW5kOiNmZmZ9Lm92cC10aW1lLWRpc3BsYXl7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7dG9wOjEwcHg7bWFyZ2luLWxlZnQ6MTJweDtoZWlnaHQ6MzBweDt3aGl0ZS1zcGFjZTpub3dyYXA7bGluZS1oZWlnaHQ6MzBweDt2ZXJ0aWNhbC1hbGlnbjp0b3A7Zm9udC1zaXplOjE0cHg7dXNlci1zZWxlY3Q6bm9uZX0ub3ZwLXRpbWUtZGlzcGxheSAub3ZwLXRpbWUtY3VycmVudCwub3ZwLXRpbWUtZGlzcGxheSAub3ZwLXRpbWUtc2VwYXJhdG9yLC5vdnAtdGltZS1kaXNwbGF5IC5vdnAtdGltZS1kdXJhdGlvbntjb2xvcjojZmZmfS5vdnAtdGltZS1kaXNwbGF5IC5vdnAtbGl2ZS1iYWRnZXtvcGFjaXR5OjE7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6YXV0bztmb250LXNpemU6MTRweH0ub3ZwLXRpbWUtZGlzcGxheSAub3ZwLWxpdmUtYmFkZ2U6YmVmb3Jle2JhY2tncm91bmQ6I2ZmMDAwMDtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LTJweDt3aWR0aDo2cHg7aGVpZ2h0OjZweDttYXJnaW4tcmlnaHQ6NXB4O2NvbnRlbnQ6Jyc7Ym9yZGVyLXJhZGl1czo2cHh9Lm92cC10aW1lLWRpc3BsYXkgLm92cC1saXZlLWJhZGdlIC5vdnAtbGl2ZS1iYWRnZS1sb3dsYXRlbmN5e2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1yaWdodDo1cHh9Lm92cC1jb250ZXh0LXBhbmVsey1tb3otYm94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveDtkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO292ZXJmbG93OmhpZGRlbjt3aWR0aDoyMDBweDtwYWRkaW5nOjZweCAwO2JhY2tncm91bmQ6cmdiYSgyOCwyOCwyOCwwLjkpO3RleHQtc2hhZG93OjAgMCAycHggcmdiYSgwLDAsMCwwLjUpO3otaW5kZXg6MjMwMDtmb250LWZhbWlseTpSb2JvdG8sQXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6MTAwO3VzZXItc2VsZWN0Om5vbmV9Lm92cC1jb250ZXh0LXBhbmVsOmJlZm9yZSwub3ZwLWNvbnRleHQtcGFuZWw6YWZ0ZXJ7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94fS5vdnAtY29udGV4dC1wYW5lbCAqLC5vdnAtY29udGV4dC1wYW5lbCAqOmJlZm9yZSwub3ZwLWNvbnRleHQtcGFuZWwgKjphZnRlcnstbW96LWJveC1zaXppbmc6Ym9yZGVyLWJveDstd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm92cC1jb250ZXh0LXBhbmVsIC5vdnAtY29udGV4dC1pdGVte3dpZHRoOjEwMCU7aGVpZ2h0OjM4cHg7cGFkZGluZy1sZWZ0OjEycHg7bGluZS1oZWlnaHQ6MzhweDtjb2xvcjojZWVlO2N1cnNvcjpwb2ludGVyO291dGxpbmU6bm9uZTtmb250LXNpemU6MTIwJX0ub3ZwLWNvbnRleHQtcGFuZWwgLm92cC1jb250ZXh0LWl0ZW06aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LDAuMSl9Lm92cC1mdWxsc2NyZWVuLWJ1dHRvbntwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTBweDttYXJnaW4tcmlnaHQ6MTVweH0ub3ZwLWZ1bGxzY3JlZW4tYnV0dG9uPml7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLXNpemU6MTAwJX0ub3ZwLWZ1bGxzY3JlZW4tYnV0dG9uIC5vdnAtZnVsbHNjcmVlbi1idXR0b24tZXhwYW5kaWNvbntiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItZnVsbHNjcmVlbi1leHBhbmQuc3ZnXCIpKSArIFwiKX0ub3ZwLWZ1bGxzY3JlZW4tYnV0dG9uIC5vdnAtZnVsbHNjcmVlbi1idXR0b24tY29tcHJlc3NpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1mdWxsc2NyZWVuLWNvbXByZXNzLnN2Z1wiKSkgKyBcIil9QGtleWZyYW1lcyBmYWRle2Zyb217b3BhY2l0eTouM301NSV7b3BhY2l0eToxfTc1JXtvcGFjaXR5OjF9dG97b3BhY2l0eTouM319QC13ZWJraXQta2V5ZnJhbWVzIHNoYWtle2Zyb20sdG97LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwgMCwgMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsIDAsIDApfTEwJSwzMCUsNTAlLDcwJSw5MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCl9MjAlLDQwJSw2MCUsODAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwcHgsIDAsIDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKX19QGtleWZyYW1lcyBzaGFrZXtmcm9tLHRvey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsIDAsIDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLCAwLCAwKX0xMCUsMzAlLDUwJSw3MCUsOTAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKC0xMHB4LCAwLCAwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApfTIwJSw0MCUsNjAlLDgwJXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTBweCwgMCwgMCl9fS5vdnAtcGxheWVyIC5zaGFrZXstd2Via2l0LWFuaW1hdGlvbi1uYW1lOnNoYWtlO2FuaW1hdGlvbi1uYW1lOnNoYWtlfUAtd2Via2l0LWtleWZyYW1lcyBib3VuY2VJbntmcm9tLDIwJSw0MCUsNjAlLDgwJSx0b3std2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246Y3ViaWMtYmV6aWVyKC4yMTUsIC42MSwgLjM1NSwgMSk7YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoLjIxNSwgLjYxLCAuMzU1LCAxKX0wJXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCguNSwgLjUsIC41KTt0cmFuc2Zvcm06c2NhbGUzZCguNSwgLjUsIC41KX0yMCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCgxLjEsIDEuMSwgMS4xKTt0cmFuc2Zvcm06c2NhbGUzZCgxLjEsIDEuMSwgMS4xKX00MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCguOSwgLjksIC45KTt0cmFuc2Zvcm06c2NhbGUzZCguOSwgLjksIC45KX02MCV7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoMS4wMywgMS4wMywgMS4wMyk7dHJhbnNmb3JtOnNjYWxlM2QoMS4wMywgMS4wMywgMS4wMyl9ODAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoLjk3LCAuOTcsIC45Nyk7dHJhbnNmb3JtOnNjYWxlM2QoLjk3LCAuOTcsIC45Nyl9dG97b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoMSwgMSwgMSk7dHJhbnNmb3JtOnNjYWxlM2QoMSwgMSwgMSl9fUBrZXlmcmFtZXMgYm91bmNlSW57ZnJvbSwyMCUsNDAlLDYwJSw4MCUsdG97LXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOmN1YmljLWJlemllciguMjE1LCAuNjEsIC4zNTUsIDEpO2FuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246Y3ViaWMtYmV6aWVyKC4yMTUsIC42MSwgLjM1NSwgMSl9MCV7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoLjMsIC4zLCAuMyk7dHJhbnNmb3JtOnNjYWxlM2QoLjMsIC4zLCAuMyl9MjAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoMS4xLCAxLjEsIDEuMSk7dHJhbnNmb3JtOnNjYWxlM2QoMS4xLCAxLjEsIDEuMSl9NDAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoLjksIC45LCAuOSk7dHJhbnNmb3JtOnNjYWxlM2QoLjksIC45LCAuOSl9NjAle29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKDEuMDMsIDEuMDMsIDEuMDMpO3RyYW5zZm9ybTpzY2FsZTNkKDEuMDMsIDEuMDMsIDEuMDMpfTgwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKC45NywgLjk3LCAuOTcpO3RyYW5zZm9ybTpzY2FsZTNkKC45NywgLjk3LCAuOTcpfXRve29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKDEsIDEsIDEpO3RyYW5zZm9ybTpzY2FsZTNkKDEsIDEsIDEpfX0ub3ZwLXBsYXllciAuYm91bmNlSW57LXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246Ljc1czthbmltYXRpb24tZHVyYXRpb246Ljc1czstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmJvdW5jZUluO2FuaW1hdGlvbi1uYW1lOmJvdW5jZUlufUAtd2Via2l0LWtleWZyYW1lcyBmYWRlSW57ZnJvbXtvcGFjaXR5OjB9dG97b3BhY2l0eToxfX1Aa2V5ZnJhbWVzIGZhZGVJbntmcm9te29wYWNpdHk6MH10b3tvcGFjaXR5OjF9fS5vdnAtcGxheWVyIC5mYWRlSW57LXdlYmtpdC1hbmltYXRpb24tbmFtZTpmYWRlSW47YW5pbWF0aW9uLW5hbWU6ZmFkZUlufS5vdnAtcGxheWVyIC5hbmltYXRlZHstd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjoxczthbmltYXRpb24tZHVyYXRpb246MXM7LXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOmJvdGg7YW5pbWF0aW9uLWZpbGwtbW9kZTpib3RofUBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbil7Lm92cC1wbGF5ZXIgLmFuaW1hdGVkey13ZWJraXQtYW5pbWF0aW9uOnVuc2V0ICFpbXBvcnRhbnQ7YW5pbWF0aW9uOnVuc2V0ICFpbXBvcnRhbnQ7LXdlYmtpdC10cmFuc2l0aW9uOm5vbmUgIWltcG9ydGFudDt0cmFuc2l0aW9uOm5vbmUgIWltcG9ydGFudH19Lm92cC1jYXB0aW9uLXZpZXdlcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0ub3ZwLWNhcHRpb24tdmlld2VyIC5vdnAtY2FwdGlvbi10ZXh0LWNvbnRhaW5lcntwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206NjBweDt3aWR0aDoxMDAlO3BhZGRpbmc6MCAxMnB4O3RleHQtYWxpZ246Y2VudGVyOy1tb3otdHJhbnNpdGlvbjpib3R0b20gLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjpib3R0b20gLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpO3RyYW5zaXRpb246Ym90dG9tIC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKX0ub3ZwLWNhcHRpb24tdmlld2VyIC5vdnAtY2FwdGlvbi10ZXh0LWNvbnRhaW5lciAub3ZwLWNhcHRpb24tdGV4dHtkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjIyMCU7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDgsOCw4LDAuNzUpO2JvcmRlci1yYWRpdXM6M3B4O2NvbG9yOiNmZmY7cGFkZGluZzouMWVtIC4zZW07d29yZC13cmFwOmJyZWFrLXdvcmQ7bGluZS1oZWlnaHQ6MS41ZW07dXNlci1zZWxlY3Q6bm9uZX0ub3ZwLWNhcHRpb24tYnV0dG9ue3dpZHRoOjM2cHh9Lm92cC1jYXB0aW9uLWJ1dHRvbj5pe2ZvbnQtc2l6ZToxOHB4Oy1tb3otdHJhbnNpdGlvbjpjb2xvciAuMjVzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7LXdlYmtpdC10cmFuc2l0aW9uOmNvbG9yIC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTt0cmFuc2l0aW9uOmNvbG9yIC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKX0ub3ZwLWNhcHRpb24tYWN0aXZlIC5vdnAtY2FwdGlvbi1idXR0b24+aXtjb2xvcjojRjM2NDQ2fVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXNjYXBlKHVybCkge1xuICAgIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdXJsXG4gICAgfVxuICAgIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICAgIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgICAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICAgIH1cbiAgICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gICAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgICBpZiAoL1tcIicoKSBcXHRcXG5dLy50ZXN0KHVybCkpIHtcbiAgICAgICAgcmV0dXJuICdcIicgKyB1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKSArICdcIidcbiAgICB9XG5cbiAgICByZXR1cm4gdXJsXG59XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHBhc3NpbmcgZnVuY3Rpb24gaW4gb3B0aW9ucywgdGhlbiB1c2UgaXQgZm9yIHJlc29sdmUgXCJoZWFkXCIgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvLyBVc2VmdWwgZm9yIFNoYWRvdyBSb290IHN0eWxlIGkuZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgIGluc2VydEludG86IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vXCIpLnNoYWRvd1Jvb3QgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0VGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cbiIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvfFxccyokKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuIiwiLyogZ2xvYmFscyBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXyAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19hbWRfb3B0aW9uc19fO1xyXG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJek1DSWdhR1ZwWjJoMFBTSXpNQ0lnZG1sbGQwSnZlRDBpTUNBd0lETXdJRE13SWo0S0lDQWdJRHhuSUdacGJHdzlJbTV2Ym1VaUlHWnBiR3d0Y25Wc1pUMGlaWFpsYm05a1pDSWdjM1J5YjJ0bFBTSWpSa1pHSWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUlITjBjbTlyWlMxM2FXUjBhRDBpTWlJK0NpQWdJQ0FnSUNBZ1BIQmhkR2dnWkQwaVRUY2dNVGRvTm5ZMlRUSXpJREV6YUMwMlZqZE5NVGNnTVROc055MDNUVFlnTWpSc055MDNJaTgrQ2lBZ0lDQThMMmMrQ2p3dmMzWm5QZ289XCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l6TUNJZ2FHVnBaMmgwUFNJek1DSWdkbWxsZDBKdmVEMGlNQ0F3SURNd0lETXdJajRLSUNBZ0lEeG5JR1pwYkd3OUltNXZibVVpSUdacGJHd3RjblZzWlQwaVpYWmxibTlrWkNJZ2MzUnliMnRsUFNJalJrWkdJaUJ6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlITjBjbTlyWlMxc2FXNWxhbTlwYmowaWNtOTFibVFpSUhOMGNtOXJaUzEzYVdSMGFEMGlNaUkrQ2lBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRFNElEWm9OblkyVFRFeUlESTBTRFoyTFRaTk1qUWdObXd0TnlBM1RUWWdNalJzTnkwM0lpOCtDaUFnSUNBOEwyYytDand2YzNablBnbz1cIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXhNREFpSUdobGFXZG9kRDBpTVRBd0lpQjJhV1YzUW05NFBTSXdJREFnTVRBd0lERXdNQ0krQ2lBZ0lDQThaeUJtYVd4c1BTSnViMjVsSWlCbWFXeHNMWEoxYkdVOUltVjJaVzV2WkdRaVBnb2dJQ0FnSUNBZ0lEeGphWEpqYkdVZ1kzZzlJalV3SWlCamVUMGlOVEFpSUhJOUlqUTVJaUJ6ZEhKdmEyVTlJaU5HUmtZaUlITjBjbTlyWlMxM2FXUjBhRDBpTWlJdlBnb2dJQ0FnSUNBZ0lEeHdZWFJvSUdacGJHdzlJaU5HUmtZaUlHUTlJazAzTlNBMU1Fd3pOU0EzTlZZeU5Yb2lMejRLSUNBZ0lEd3ZaejRLUEM5emRtYytDZz09XCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l6TUNJZ2FHVnBaMmgwUFNJek1DSWdkbWxsZDBKdmVEMGlNQ0F3SURNd0lETXdJajRLSUNBZ0lEeHdZWFJvSUdacGJHdzlJbTV2Ym1VaUlHWnBiR3d0Y25Wc1pUMGlaWFpsYm05a1pDSWdjM1J5YjJ0bFBTSWpSa1pHSWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUlITjBjbTlyWlMxM2FXUjBhRDBpTWlJZ1pEMGlUVGtnTm13eE5DQTVMVEUwSURsNklpOCtDand2YzNablBnbz1cIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSTRNQ0lnYUdWcFoyaDBQU0k0TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRGd3SURnd0lqNE5DaUFnSUNBOFp5Qm1hV3hzUFNKdWIyNWxJaUJtYVd4c0xYSjFiR1U5SW1WMlpXNXZaR1FpSUhOMGNtOXJaVDBpSTBaR1JpSWdjM1J5YjJ0bExXeHBibVZqWVhBOUluSnZkVzVrSWlCemRISnZhMlV0YkdsdVpXcHZhVzQ5SW5KdmRXNWtJaUJ6ZEhKdmEyVXRkMmxrZEdnOUlqUWlQZzBLSUNBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOTVRVZ01qRXVNM1l4TXk0NGFERXpMamdpTHo0TkNpQWdJQ0FnSUNBZ1BIQmhkR2dnWkQwaVRUSXdMamMzTXlBME5pNDJZVEl3TGpjZ01qQXVOeUF3SURFZ01DQTBMamc1T1MweU1TNDFNamhNTVRVZ016VXVNU0l2UGcwS0lDQWdJRHd2Wno0TkNqd3ZjM1puUGcwS1wiIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJek1DSWdhR1ZwWjJoMFBTSXpNQ0lnZG1sbGQwSnZlRDBpTUNBd0lETXdJRE13SWo0S0lDQWdJRHhuSUdacGJHdzlJbTV2Ym1VaUlHWnBiR3d0Y25Wc1pUMGlaWFpsYm05a1pDSWdjM1J5YjJ0bFBTSWpSa1pHSWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUlITjBjbTlyWlMxM2FXUjBhRDBpTWlJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9OQ0EwS1NJK0NpQWdJQ0FnSUNBZ1BHTnBjbU5zWlNCamVEMGlNVEVpSUdONVBTSXhNU0lnY2owaU15SXZQZ29nSUNBZ0lDQWdJRHh3WVhSb0lHUTlJazB4T0M0MElERTBZVEV1TmpVZ01TNDJOU0F3SURBZ01DQXVNek1nTVM0NE1td3VNRFl1TURaaE1pQXlJREFnTVNBeExUSXVPRE1nTWk0NE0yd3RMakEyTFM0d05tRXhMalkxSURFdU5qVWdNQ0F3SURBdE1TNDRNaTB1TXpNZ01TNDJOU0F4TGpZMUlEQWdNQ0F3TFRFZ01TNDFNVll5TUdFeUlESWdNQ0F4SURFdE5DQXdkaTB1TURsQk1TNDJOU0F4TGpZMUlEQWdNQ0F3SURnZ01UZ3VOR0V4TGpZMUlERXVOalVnTUNBd0lEQXRNUzQ0TWk0ek0yd3RMakEyTGpBMllUSWdNaUF3SURFZ01TMHlMamd6TFRJdU9ETnNMakEyTFM0d05tRXhMalkxSURFdU5qVWdNQ0F3SURBZ0xqTXpMVEV1T0RJZ01TNDJOU0F4TGpZMUlEQWdNQ0F3TFRFdU5URXRNVWd5WVRJZ01pQXdJREVnTVNBd0xUUm9MakE1UVRFdU5qVWdNUzQyTlNBd0lEQWdNQ0F6TGpZZ09HRXhMalkxSURFdU5qVWdNQ0F3SURBdExqTXpMVEV1T0RKc0xTNHdOaTB1TURaaE1pQXlJREFnTVNBeElESXVPRE10TWk0NE0yd3VNRFl1TURaaE1TNDJOU0F4TGpZMUlEQWdNQ0F3SURFdU9ESXVNek5JT0dFeExqWTFJREV1TmpVZ01DQXdJREFnTVMweExqVXhWakpoTWlBeUlEQWdNU0F4SURRZ01IWXVNRGxoTVM0Mk5TQXhMalkxSURBZ01DQXdJREVnTVM0MU1TQXhMalkxSURFdU5qVWdNQ0F3SURBZ01TNDRNaTB1TXpOc0xqQTJMUzR3Tm1FeUlESWdNQ0F4SURFZ01pNDRNeUF5TGpnemJDMHVNRFl1TURaaE1TNDJOU0F4TGpZMUlEQWdNQ0F3TFM0ek15QXhMamd5VmpoakxqSTJMall3TkM0NE5USXVPVGszSURFdU5URWdNVWd5TUdFeUlESWdNQ0F4SURFZ01DQTBhQzB1TURsaE1TNDJOU0F4TGpZMUlEQWdNQ0F3TFRFdU5URWdNWG9pTHo0S0lDQWdJRHd2Wno0S1BDOXpkbWMrQ2c9PVwiIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE1EQWlJR2hsYVdkb2REMGlNVEF3SWlCMmFXVjNRbTk0UFNJd0lEQWdNVEF3SURFd01DSStDaUFnSUNBOFp5Qm1hV3hzUFNKdWIyNWxJaUJtYVd4c0xYSjFiR1U5SW1WMlpXNXZaR1FpUGdvZ0lDQWdJQ0FnSUR4amFYSmpiR1VnWTNnOUlqVXdJaUJqZVQwaU5UQWlJSEk5SWpRNUlpQnpkSEp2YTJVOUlpTkdSa1lpSUhOMGNtOXJaUzEzYVdSMGFEMGlNaUl2UGdvZ0lDQWdJQ0FnSUR4d1lYUm9JR1pwYkd3OUlpTkdSa1lpSUdROUlrMHpOU0F5T1dnM2RqUXlhQzAzZWswMU9DQXlPV2czZGpReWFDMDNlaUl2UGdvZ0lDQWdQQzluUGdvOEwzTjJaejRLXCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l6TUNJZ2FHVnBaMmgwUFNJek1DSWdkbWxsZDBKdmVEMGlNQ0F3SURNd0lETXdJajRLSUNBZ0lEeG5JR1pwYkd3OUltNXZibVVpSUdacGJHd3RjblZzWlQwaVpYWmxibTlrWkNJZ2MzUnliMnRsUFNJalJrWkdJaUJ6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlITjBjbTlyWlMxc2FXNWxhbTlwYmowaWNtOTFibVFpSUhOMGNtOXJaUzEzYVdSMGFEMGlNaUkrQ2lBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRFd0lEWjJNVGhOTWpBZ05uWXhPQ0l2UGdvZ0lDQWdQQzluUGdvOEwzTjJaejRLXCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l6TUNJZ2FHVnBaMmgwUFNJek1DSWdkbWxsZDBKdmVEMGlNQ0F3SURNd0lETXdJajROQ2lBZ0lDQThaeUJtYVd4c1BTSnViMjVsSWlCbWFXeHNMWEoxYkdVOUltVjJaVzV2WkdRaUlITjBjbTlyWlQwaUkwWkdSaUlnYzNSeWIydGxMV3hwYm1WallYQTlJbkp2ZFc1a0lpQnpkSEp2YTJVdGJHbHVaV3B2YVc0OUluSnZkVzVrSWlCemRISnZhMlV0ZDJsa2RHZzlJaklpUGcwS0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk9TQXhNVWcxZGpob05HdzJJRFZXTm5wTk1Ua3VOVFFnTVRFdU5EWmhOU0ExSURBZ01DQXhJREFnTnk0d055SXZQZzBLSUNBZ0lEd3ZaejROQ2p3dmMzWm5QZzBLXCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l6TUNJZ2FHVnBaMmgwUFNJek1DSWdkbWxsZDBKdmVEMGlNQ0F3SURNd0lETXdJajRLSUNBZ0lEeG5JR1pwYkd3OUltNXZibVVpSUdacGJHd3RjblZzWlQwaVpYWmxibTlrWkNJZ2MzUnliMnRsUFNJalJrWkdJaUJ6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlITjBjbTlyWlMxc2FXNWxhbTlwYmowaWNtOTFibVFpSUhOMGNtOXJaUzEzYVdSMGFEMGlNaUkrQ2lBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRrZ01URklOWFk0YURSc05pQTFWalo2VFRJMklERXliQzAySURaTk1qQWdNVEpzTmlBMklpOCtDaUFnSUNBOEwyYytDand2YzNablBnbz1cIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXpNQ0lnYUdWcFoyaDBQU0l6TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRE13SURNd0lqNEtJQ0FnSUR4bklHWnBiR3c5SW01dmJtVWlJR1pwYkd3dGNuVnNaVDBpWlhabGJtOWtaQ0lnYzNSeWIydGxQU0lqUmtaR0lpQnpkSEp2YTJVdGJHbHVaV05oY0QwaWNtOTFibVFpSUhOMGNtOXJaUzFzYVc1bGFtOXBiajBpY205MWJtUWlJSE4wY205clpTMTNhV1IwYUQwaU1pSStDaUFnSUNBZ0lDQWdQSEJoZEdnZ1pEMGlUVGtnTVRGSU5YWTRhRFJzTmlBMVZqWjZUVEl6TGpBM0lEY3VPVE5qTXk0NU1EUWdNeTQ1TURVZ015NDVNRFFnTVRBdU1qTTFJREFnTVRRdU1UUnRMVE11TlRNdE1UQXVOakZoTlNBMUlEQWdNQ0F4SURBZ055NHdOeUl2UGdvZ0lDQWdQQzluUGdvOEwzTjJaejRLXCIiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTUtMiEuL292ZW5wbGF5ZXIubGVzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTUtMiEuL292ZW5wbGF5ZXIubGVzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS01LTIhLi9vdmVucGxheWVyLmxlc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCIvL2ltcG9ydCBDYXB0aW9uTWFuYWdlciBmcm9tIFwiYXBpL2NhcHRpb24vTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29uZmlndXJhdG9yIGZyb20gXCJhcGkvQ29uZmlndXJhdG9yXCI7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IExhenlDb21tYW5kRXhlY3V0b3IgZnJvbSBcImFwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yXCI7XHJcbmltcG9ydCBMb2dNYW5hZ2VyIGZyb20gXCJ1dGlscy9sb2dnZXJcIjtcclxuaW1wb3J0IFBsYXlsaXN0TWFuYWdlciBmcm9tIFwiYXBpL3BsYXlsaXN0L01hbmFnZXJcIjtcclxuaW1wb3J0IFByb3ZpZGVyQ29udHJvbGxlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL0NvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFByb21pc2UsIHtyZXNvbHZlZH0gZnJvbSBcImFwaS9zaGltcy9wcm9taXNlXCI7XHJcbmltcG9ydCB7UkVBRFksIEVSUk9SLCBJTklUX0VSUk9SLCBERVNUUk9ZLCBORVRXT1JLX1VOU1RBQkxFRCwgUExBWUVSX0ZJTEVfRVJST1IsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcclxuaW1wb3J0IHtBcGlSdG1wRXhwYW5zaW9ufSBmcm9tICdhcGkvQXBpRXhwYW5zaW9ucyc7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBvYmplY3QgY29ubmVjdHMgVUkgdG8gdGhlIHByb3ZpZGVyLlxyXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb250YWluZXIgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcblxyXG5jb25zdCBBcGkgPSBmdW5jdGlvbihjb250YWluZXIpe1xyXG4gICAgbGV0IGxvZ01hbmFnZXIgPSBMb2dNYW5hZ2VyKCk7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiW1tPdmVuUGxheWVyXV0gdi5cIisgdmVyc2lvbik7XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgbG9hZGVkLlwiKTtcclxuICAgIC8vbGV0IGNhcHRpb25NYW5hZ2VyID0gQ2FwdGlvbk1hbmFnZXIodGhhdCk7XHJcbiAgIFxyXG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcigpO1xyXG4gICAgbGV0IHByb3ZpZGVyQ29udHJvbGxlciA9IFByb3ZpZGVyQ29udHJvbGxlcigpO1xyXG4gICAgbGV0IGN1cnJlbnRQcm92aWRlciA9IFwiXCI7XHJcbiAgICBsZXQgcGxheWVyQ29uZmlnID0gXCJcIjtcclxuICAgIGxldCBsYXp5UXVldWUgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0IGluaXRQcm92aWRlciA9IGZ1bmN0aW9uKGxhc3RQbGF5UG9zaXRpb24pe1xyXG4gICAgICAgIGNvbnN0IHBpY2tRdWFsaXR5RnJvbVNvdXJjZSA9IChzb3VyY2VzKSA9PntcclxuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSAwO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcXVhbGl0eTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gcHJvdmlkZXJDb250cm9sbGVyLmxvYWRQcm92aWRlcnMocGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCkpLnRoZW4oUHJvdmlkZXJzID0+IHtcclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgY3VycmVudFNvdXJjZUluZGV4ID0gcGlja1F1YWxpdHlGcm9tU291cmNlKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCBcImN1cnJlbnQgc291cmNlIGluZGV4IDogXCIrIGN1cnJlbnRTb3VyY2VJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAvL0NhbGwgUHJvdmlkZXIuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IFByb3ZpZGVyc1tjdXJyZW50U291cmNlSW5kZXhdKGNvbnRhaW5lciwgcGxheWVyQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlci5nZXROYW1lKCkgPT09IFBST1ZJREVSX1JUTVApe1xyXG4gICAgICAgICAgICAgICAgLy9JZiBwcm92aWRlciB0eXBlIGlzIFJUTVAsIHdlIGFjY2VwdHMgUnRtcEV4cGFuc2lvbi5cclxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhhdCwgQXBpUnRtcEV4cGFuc2lvbihjdXJyZW50UHJvdmlkZXIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9UaGlzIHBhc3NlcyB0aGUgZXZlbnQgY3JlYXRlZCBieSB0aGUgUHJvdmlkZXIgdG8gQVBJLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIub24oXCJhbGxcIiwgZnVuY3Rpb24obmFtZSwgZGF0YSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIobmFtZSwgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9BdXRvIG5leHQgc291cmNlIHdoZW4gcGxheWVyIGxvYWQgd2FzIGZhaWwgYnkgYW1pc3Mgc291cmNlLlxyXG4gICAgICAgICAgICAgICAgaWYoIChuYW1lID09PSBFUlJPUiAmJiAoZGF0YS5jb2RlID09PSBQTEFZRVJfRklMRV9FUlJPUiB8fCBwYXJzZUludChkYXRhLmNvZGUvMTAwKSA9PT0gNSkpfHwgbmFtZSA9PT0gTkVUV09SS19VTlNUQUJMRUQgKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFF1YWxpdHkgPSB0aGF0LmdldEN1cnJlbnRRdWFsaXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY3VycmVudFF1YWxpdHkuaW5kZXgrMSA8IHRoYXQuZ2V0UXVhbGl0eUxldmVscygpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBzZXF1ZW50aWFsIGhhcyBhdmFpbGFibGUgc291cmNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5KGN1cnJlbnRRdWFsaXR5LmluZGV4KzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pLnRoZW4oKCk9PntcclxuXHJcbiAgICAgICAgICAgIC8vcHJvdmlkZXIncyBwcmVsb2FkKCkgaGF2ZSB0byBtYWRlIFByb21pc2UuIEN1eiBpdCBvdmVyY29tZXMgJ2ZsYXNoIGxvYWRpbmcgdGltaW5nIHByb2JsZW0nLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIucHJlbG9hZChwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSwgbGFzdFBsYXlQb3NpdGlvbiApLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5mbHVzaCgpO1xyXG4gICAgICAgICAgICAgICAgLy9UaGlzIGlzIG5vIHJlYXNvbiB0byBleGlzdCBhbnltb3JlLlxyXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUkVBRFkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3JPYmplY3QgPSB7Y29kZSA6IElOSVRfRVJST1IsIHJlYXNvbiA6IFwiaW5pdCBlcnJvci5cIiwgbWVzc2FnZSA6IFwiUGxheWVyIGluaXQgZXJyb3IuXCIsIGVycm9yIDogZXJyb3J9O1xyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIGVycm9yT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgIC8veHh4IDogSWYgeW91IGluaXQgZW1wdHkgc291cmNlcy4gKEkgdGhpbmsgdGhpcyBpcyBzdHJhbmdlIGNhc2UuKVxyXG4gICAgICAgICAgICAvL1RoaXMgd29ya3MgZm9yIHRoaXMgY2FzZS5cclxuICAgICAgICAgICAgLy9wbGF5ZXIgPSBPdmVuUGxheWVyLmNyZWF0ZShcImVsSWRcIiwge30pO1xyXG4gICAgICAgICAgICAvL3BsYXllci5sb2FkKHNvcnVjZXMpO1xyXG4gICAgICAgICAgICBsYXp5UXVldWUucmVtb3ZlQW5kRXhjdXRlT25jZShcImxvYWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFQSSDstIjquLDtmZQg7ZWo7IiYXHJcbiAgICAgKiBpbml0XHJcbiAgICAgKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zIHBsYXllciBpbml0aWFsIG9wdGlvbiB2YWx1ZS5cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiovXHJcbiAgICB0aGF0LmluaXQgPSAob3B0aW9ucykgPT57XHJcbiAgICAgICAgLy9JdCBjb2xsZWN0cyB0aGUgY29tbWFuZHMgYW5kIGV4ZWN1dGVzIHRoZW0gYXQgdGhlIHRpbWUgd2hlbiB0aGV5IGFyZSBleGVjdXRhYmxlLlxyXG4gICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydsb2FkJywncGxheScsJ3BhdXNlJywnc2VlaycsJ3N0b3AnLCAnZ2V0RHVyYXRpb24nLCAnZ2V0UG9zaXRpb24nLCAnZ2V0Vm9sdW1lJywgJ2dldE11dGUnLCAnZ2V0QnVmZmVyJywgJ2dldFN0YXRlJ10pO1xyXG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zKTtcclxuICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzRGVidWcoKSl7XHJcbiAgICAgICAgICAgIGxvZ01hbmFnZXIuZGlzYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KClcIik7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIGNvbmZpZyA6IFwiLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0UGxheWxpc3QocGxheWVyQ29uZmlnLmdldFBsYXlsaXN0KCkpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBzb3VyY2VzIDogXCIgLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XHJcbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qdGhhdC5nZXRDb250YWluZXJJZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXIuaWQ7XHJcbiAgICB9OyovXHJcblxyXG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q29uZmlnKClcIiwgcGxheWVyQ29uZmlnLmdldENvbmZpZygpKTtcclxuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldENvbmZpZygpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RHVyYXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQb3NpdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRWb2x1bWUoKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRWb2x1bWUoKSBcIiArIHZvbHVtZSk7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldFZvbHVtZSh2b2x1bWUpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0TXV0ZSgpIFwiICsgc3RhdGUpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0TXV0ZShzdGF0ZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0TXV0ZSgpIFwiICsgY3VycmVudFByb3ZpZGVyLmdldE11dGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5sb2FkID0gKHBsYXlsaXN0KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogbG9hZCgpIFwiLCBwbGF5bGlzdCk7XHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcclxuXHJcbiAgICAgICAgaWYocGxheWxpc3Qpe1xyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5zZXRQbGF5bGlzdChwbGF5bGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBsYXkoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBsYXkoKTtcclxuICAgIH1cclxuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGF1c2UoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2VlaygpIFwiKyBwb3NpdGlvbik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNlZWsocG9zaXRpb24pO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRQbGF5YmFja1JhdGUocGxheWVyQ29uZmlnLnNldERlZmF1bHRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQbGF5YmFja1JhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFF1YWxpdHlMZXZlbHMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRRdWFsaXR5KCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgXCIsIHF1YWxpdHlJbmRleCk7XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VzID0gcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW3RoYXQuZ2V0Q3VycmVudFF1YWxpdHkoKS5pbmRleF07XHJcbiAgICAgICAgbGV0IG5ld1NvdXJjZSA9IHNvdXJjZXNbcXVhbGl0eUluZGV4XTtcclxuICAgICAgICBsZXQgbGFzdFBsYXlQb3NpdGlvbiA9IHRoYXQuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgaXNTYW1lUHJvdmlkZXIgPSBwcm92aWRlckNvbnRyb2xsZXIuaXNTYW1lUHJvdmlkZXIoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKTtcclxuICAgICAgICAvLyBwcm92aWRlci5zZXJDdXJyZW50UXVhbGl0eSAtPiBwbGF5ZXJDb25maWcgc2V0dGluZyAtPiBsb2FkXHJcbiAgICAgICAgbGV0IHJlc1F1YWxpdHlJbmRleCA9IGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eShxdWFsaXR5SW5kZXgsIGlzU2FtZVByb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgaWYoIW5ld1NvdXJjZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBpc1NhbWVQcm92aWRlclwiLCBpc1NhbWVQcm92aWRlcik7XHJcblxyXG4gICAgICAgIGlmKCFpc1NhbWVQcm92aWRlcil7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5J10pO1xyXG4gICAgICAgICAgICBpbml0UHJvdmlkZXIobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzUXVhbGl0eUluZGV4O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiBDYXB0aW9ucyA6IFRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCB2ZXJzaW9uLiovXHJcbiAgICAvKnRoYXQuc2V0Q3VycmVudENhcHRpb24gPSAoaW5kZXgpID0+e1xyXG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5zZXRDdXJyZW50Q2FwdGlvbihpbmRleCk7XHJcbiAgICAgfVxyXG4gICAgIHRoYXQuZ2V0Q3VycmVudENhcHRpb24gPSAoKSA9PntcclxuICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q3VycmVudENhcHRpb24oKTtcclxuICAgICB9XHJcbiAgICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+IHtcclxuICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKTtcclxuICAgICB9XHJcbiAgICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PiB7XHJcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmFkZENhcHRpb24oKTtcclxuICAgICB9XHJcbiAgICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+IHtcclxuICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKTtcclxuICAgICB9Ki9cclxuXHJcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRCdWZmZXIoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFN0YXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zdG9wID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHN0b3AoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnN0b3AoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSBcIik7XHJcbiAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XHJcbiAgICAgICAgcHJvdmlkZXJDb250cm9sbGVyID0gbnVsbDtcclxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIHBsYXllckNvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgbGF6eVF1ZXVlID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhhdC50cmlnZ2VyKERFU1RST1kpO1xyXG4gICAgICAgIHRoYXQub2ZmKCk7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIC0gbGF6eVF1ZXVlLCBjdXJyZW50UHJvdmlkZXIsIHByb3ZpZGVyQ29udHJvbGxlciwgcGxheWxpc3RNYW5hZ2VyLCBwbGF5ZXJDb25maWcsIGFwaSBldmVudCBkZXN0cm9lZC4gXCIpO1xyXG4gICAgICAgIGxvZ01hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIGxvZ01hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyKHRoYXQuZ2V0Q29udGFpbmVySWQoKSk7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwaTtcclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgQXBpUnRtcEV4cGFuc2lvbiA9IGZ1bmN0aW9uKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGV4dGVybmFsQ2FsbGJhY2tDcmVlcCA6IChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgaWYocmVzdWx0Lm5hbWUgJiYgcmVzdWx0LmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci50cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwocmVzdWx0Lm5hbWUsIHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBpbml0aWFsaXplcyB0aGUgaW5wdXQgb3B0aW9ucy5cclxuICogQHBhcmFtICAgb3B0aW9uc1xyXG4gKlxyXG4gKiAqL1xyXG5jb25zdCBDb25maWd1cmF0b3IgPSBmdW5jdGlvbihvcHRpb25zKXtcclxuXHJcbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBkZWZhdWx0UGxheWJhY2tSYXRlOiAxLFxyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVDb250cm9sczogZmFsc2UsXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFswLjI1LCAwLjUsIDEsIDEuNSwgMl0sXHJcbiAgICAgICAgICAgIG11dGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2b2x1bWU6IDkwLFxyXG4gICAgICAgICAgICB3aWR0aDogNjQwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDM2MFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJjYXNlVmFsID0gdmFsLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIodmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2lkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHNlcmlhbGl6ZShvcHRpb25zW2tleV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplU2l6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbC5zbGljZSAmJiB2YWwuc2xpY2UoLTIpID09PSAncHgnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWwuc2xpY2UoMCwgLTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGV2YWx1YXRlQXNwZWN0UmF0aW8gPSBmdW5jdGlvbiAoYXIsIHdpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aWR0aC50b1N0cmluZygpLmluZGV4T2YoJyUnKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXIgIT09ICdzdHJpbmcnIHx8ICFhcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKC9eXFxkKlxcLj9cXGQrJSQvLnRlc3QoYXIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhci5pbmRleE9mKCc6Jyk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHcgPSBwYXJzZUZsb2F0KGFyLnN1YnN0cigwLCBpbmRleCkpO1xyXG4gICAgICAgICAgICBjb25zdCBoID0gcGFyc2VGbG9hdChhci5zdWJzdHIoaW5kZXggKyAxKSk7XHJcbiAgICAgICAgICAgIGlmICh3IDw9IDAgfHwgaCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKGggLyB3ICogMTAwKSArICclJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVzZXJpYWxpemUob3B0aW9ucyk7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgICAgICBjb25maWcud2lkdGggPSBub3JtYWxpemVTaXplKGNvbmZpZy53aWR0aCk7XHJcbiAgICAgICAgY29uZmlnLmhlaWdodCA9IG5vcm1hbGl6ZVNpemUoY29uZmlnLmhlaWdodCk7XHJcbiAgICAgICAgY29uZmlnLmFzcGVjdHJhdGlvID0gZXZhbHVhdGVBc3BlY3RSYXRpbyhjb25maWcuYXNwZWN0cmF0aW8sIGNvbmZpZy53aWR0aCk7XHJcblxyXG4gICAgICAgIGxldCByYXRlQ29udHJvbHMgPSBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHM7XHJcbiAgICAgICAgaWYgKHJhdGVDb250cm9scykge1xyXG4gICAgICAgICAgICBsZXQgcmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcztcclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhdGVDb250cm9scykpIHtcclxuICAgICAgICAgICAgICAgIHJhdGVzID0gcmF0ZUNvbnRyb2xzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJhdGVzID0gcmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KVxyXG4gICAgICAgICAgICAgICAgLm1hcChyYXRlID0+IE1hdGgucm91bmQocmF0ZSAqIDQpIC8gNCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmF0ZXMuaW5kZXhPZigxKSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJhdGVzLnB1c2goMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmF0ZXMuc29ydCgpO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSByYXRlcztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyB8fCBjb25maWcucGxheWJhY2tSYXRlcy5pbmRleE9mKGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlKSA8IDApIHtcclxuICAgICAgICAgICAgY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZSA9IGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlO1xyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5hc3BlY3RyYXRpbykge1xyXG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLmFzcGVjdHJhdGlvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29uZmlnUGxheWxpc3QgPSBjb25maWcucGxheWxpc3Q7XHJcbiAgICAgICAgaWYgKCFjb25maWdQbGF5bGlzdCkge1xyXG4gICAgICAgICAgICBjb25zdCBvYmogPSBfLnBpY2soY29uZmlnLCBbXHJcbiAgICAgICAgICAgICAgICAndGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyxcclxuICAgICAgICAgICAgICAgICdtZWRpYWlkJyxcclxuICAgICAgICAgICAgICAgICdpbWFnZScsXHJcbiAgICAgICAgICAgICAgICAnZmlsZScsXHJcbiAgICAgICAgICAgICAgICAnc291cmNlcycsXHJcbiAgICAgICAgICAgICAgICAndHJhY2tzJyxcclxuICAgICAgICAgICAgICAgICdwcmVsb2FkJyxcclxuICAgICAgICAgICAgICAgICdkdXJhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnaG9zdCcsXHJcbiAgICAgICAgICAgICAgICAnYXBwbGljYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3N0cmVhbSdcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBbIG9iaiBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0KSkge1xyXG4gICAgICAgICAgICBjb25maWcuZmVlZERhdGEgPSBjb25maWdQbGF5bGlzdDtcclxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gY29uZmlnUGxheWxpc3QucGxheWxpc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWxldGUgY29uZmlnLmR1cmF0aW9uO1xyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ29uZmlndXJhdG9yIGxvYWRlZC5cIiwgb3B0aW9ucyk7XHJcbiAgICBsZXQgY29uZmlnID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgbGV0IGFzcGVjdHJhdGlvID0gY29uZmlnLmFzcGVjdHJhdGlvIHx8IFwiMTY6OVwiO1xyXG4gICAgbGV0IGRlYnVnID0gY29uZmlnLmRlYnVnO1xyXG4gICAgbGV0IGRlZmF1bHRQbGF5YmFja1JhdGUgPSBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSB8fCAxO1xyXG4gICAgbGV0IGltYWdlID0gY29uZmlnLmltYWdlO1xyXG4gICAgbGV0IHBsYXliYWNrUmF0ZUNvbnRyb2xzID0gY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzIHx8IHRydWU7XHJcbiAgICBsZXQgcGxheWJhY2tSYXRlcyA9IGNvbmZpZy5wbGF5YmFja1JhdGVzIHx8IFswLjUsIDEsIDEuMjUsIDEuNSwgMl07XHJcbiAgICBsZXQgcGxheWxpc3QgPSBjb25maWcucGxheWxpc3QgfHwgW107XHJcbiAgICBsZXQgcXVhbGl0eUxhYmVsID0gY29uZmlnLnF1YWxpdHlMYWJlbCB8fCBcIlwiO1xyXG4gICAgbGV0IHJlcGVhdCA9IGNvbmZpZy5yZXBlYXQgfHwgZmFsc2U7XHJcbiAgICBsZXQgc3RyZXRjaGluZyA9IGNvbmZpZy5zdHJldGNoaW5nIHx8ICd1bmlmb3JtJztcclxuXHJcblxyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge3JldHVybiBjb25maWc7fTtcclxuXHJcbiAgICB0aGF0LmdldEFzcGVjdHJhdGlvID0oKT0+e3JldHVybiBhc3BlY3RyYXRpbzt9O1xyXG4gICAgdGhhdC5zZXRBc3BlY3RyYXRpbyA9KGFzcGVjdHJhdGlvXyk9Pnthc3BlY3RyYXRpbyA9IGFzcGVjdHJhdGlvXzt9O1xyXG5cclxuICAgIHRoYXQuaXNEZWJ1ZyA9KCk9PntyZXR1cm4gZGVidWc7fTtcclxuXHJcbiAgICB0aGF0LmdldERlZmF1bHRQbGF5YmFja1JhdGUgPSgpPT57cmV0dXJuIGRlZmF1bHRQbGF5YmFja1JhdGU7fTtcclxuICAgIHRoYXQuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KHBsYXliYWNrUmF0ZSk9PntkZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlOyByZXR1cm4gcGxheWJhY2tSYXRlO307XHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGFiZWwgPSAoKSA9PiB7cmV0dXJuIHF1YWxpdHlMYWJlbDt9O1xyXG4gICAgdGhhdC5zZXRRdWFsaXR5TGFiZWwgPSAobmV3TGFiZWwpID0+IHtxdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDt9O1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlcyA9KCk9PntyZXR1cm4gcGxheWJhY2tSYXRlczt9O1xyXG4gICAgdGhhdC5pc1BsYXliYWNrUmF0ZUNvbnRyb2xzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVDb250cm9sczt9O1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSgpPT57cmV0dXJuIHBsYXlsaXN0O307XHJcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3RfICk9PntcclxuICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RfKSl7XHJcbiAgICAgICAgICAgIHBsYXlsaXN0ID0gcGxheWxpc3RfO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwbGF5bGlzdCA9IFtwbGF5bGlzdF9dO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGxheWxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXNSZXBlYXQgPSgpPT57cmV0dXJuIHJlcGVhdDt9O1xyXG5cclxuICAgIHRoYXQuZ2V0U3RyZXRjaGluZyA9KCk9PntyZXR1cm4gc3RyZXRjaGluZzt9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdG9yO1xyXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAzLi5cbiAqL1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbW9kdWxlIHByb3ZpZGUgY3VzdG9tIGV2ZW50cy5cbiAqIEBwYXJhbSAgIG9iamVjdCAgICBBbiBvYmplY3QgdGhhdCByZXF1aXJlcyBjdXN0b20gZXZlbnRzLlxuICpcbiAqICovXG5cbmNvbnN0IEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgbGV0IHRoYXQgPSBvYmplY3Q7XG4gICAgbGV0IF9ldmVudHMgPVtdO1xuXG4gICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgY29udGV4dCl7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGxlbmd0aCA9IGV2ZW50cy5sZW5ndGg7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICBldmVudC5saXN0ZW5lci5hcHBseSggKCBldmVudC5jb250ZXh0IHx8IGNvbnRleHQgKSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgKF9ldmVudHNbbmFtZV0gfHwgKF9ldmVudHNbbmFtZV09W10pICkucHVzaCh7IGxpc3RlbmVyOiBsaXN0ZW5lciAgLCBjb250ZXh0IDogY29udGV4dH0pO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgY29uc3QgYWxsRXZlbnRzID0gX2V2ZW50cy5hbGw7XG5cbiAgICAgICAgaWYoZXZlbnRzKXtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgICAgICBpZihhbGxFdmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cywgdGhhdCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5hbWUgJiYgIWxpc3RlbmVyICYmICFjb250ZXh0KSAge1xuICAgICAgICAgICAgX2V2ZW50cyA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyhfZXZlbnRzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0YWluID0gX2V2ZW50c1tuYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciAgfHwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChsaXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLmxpc3RlbmVyICAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIuX2NhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8KGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZlbnQuY29udGV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgdGhhdC5vbmNlID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBjb25zdCBvbmNlQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjb3VudCsrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5vZmYobmFtZSwgb25jZUNhbGxiYWNrKTtcbiAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIG9uY2VDYWxsYmFjay5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoYXQub24obmFtZSwgb25jZUNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlcjsiLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcbiAqICovXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XG4gICAgfVxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XG4gICAgfVxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICB9XG5cbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgIH07XG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxyXG4gKiBAcGFyYW1cclxuICogKi9cclxuXHJcbmNvbnN0IFN1cHBvcnRDaGVja2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XHJcbiAgICBjb25zdCBzdXBwb3J0TGlzdCA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgTWltZVR5cGVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbXA0OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBmNHY6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbW92OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtcDM6ICdhdWRpby9tcGVnJyxcclxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2d2OiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ2c6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgdm9yYmlzOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICB3ZWJtOiAndmlkZW8vd2VibScsXHJcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcclxuICAgICAgICAgICAgICAgICAgICBtM3U4OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxyXG4gICAgICAgICAgICAgICAgICAgIG0zdTogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcclxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmKCF0eXBlKXtyZXR1cm4gZmFsc2U7fVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWltZVR5cGUgPSBzb3VyY2UubWltZVR5cGUgfHwgTWltZVR5cGVzW3R5cGVdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW1pbWVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnd2VicnRjJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbXBkIGFwcGxpY2F0aW9uL2Rhc2greG1sXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXNoKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2hscycsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy90aGlzIG1ldGhvZCBmcm9tIGhscy5qc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1lZGlhU291cmNlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlciA9IHdpbmRvdy5Tb3VyY2VCdWZmZXIgfHwgd2luZG93LldlYktpdFNvdXJjZUJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNUeXBlU3VwcG9ydGVkID0gbWVkaWFTb3VyY2UgJiYgdHlwZW9mIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUUsbXA0YS40MC4yXCInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgU291cmNlQnVmZmVyIGlzIGV4cG9zZWQgZW5zdXJlIGl0cyBBUEkgaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAvLyBzYWZhcmkgYW5kIG9sZCB2ZXJzaW9uIG9mIENocm9tZSBkb2Ugbm90IGV4cG9zZSBTb3VyY2VCdWZmZXIgZ2xvYmFsbHkgc28gY2hlY2tpbmcgU291cmNlQnVmZmVyLnByb3RvdHlwZSBpcyBpbXBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhaXNUeXBlU3VwcG9ydGVkICYmICEhc291cmNlQnVmZmVyVmFsaWRBUEk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzSGxzU3VwcG9ydCgpICYmICEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3J0bXAnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UgPSAoc29ydWNlXykgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKClcIiwgc29ydWNlXyk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHN1cHBvcnRMaXN0Lmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGlmKHN1cHBvcnRMaXN0W2ldLmNoZWNrU3VwcG9ydChzb3VyY2UpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0ID0gKHBsYXlsaXN0XykgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KClcIiwgcGxheWxpc3RfKTtcclxuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHBsYXlsaXN0Xy5sZW5ndGg7IGktLTspIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHBsYXlsaXN0X1tpXTtcclxuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBpdGVtLnNvdXJjZXMubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIHNvdXJjZSA9IGl0ZW0uc291cmNlc1tqXTtcclxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnROYW1lcztcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN1cHBvcnRDaGVja2VyO1xyXG4iLCIvLyBTVEFURVxyXG5leHBvcnQgY29uc3QgU1RBVEVfQlVGRkVSSU5HID0gJ2J1ZmZlcmluZyc7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9JRExFID0gJ2lkbGUnO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSAnY29tcGxldGUnO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfUEFVU0VEID0gJ3BhdXNlZCc7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9QTEFZSU5HID0gJ3BsYXlpbmcnO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSAnZXJyb3InO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfTE9BRElORyA9ICdsb2FkaW5nJztcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1NUQUxMRUQgPSAnc3RhbGxlZCc7XHJcblxyXG5cclxuLy8gUFJPVklERVJcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hUTUw1ID0gJ2h0bWw1JztcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1dFQlJUQyA9ICd3ZWJydGMnO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9ICdkYXNoJztcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hMUyA9ICdobHMnO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfUlRNUCA9ICdydG1wJztcclxuXHJcbi8vIEVWRU5UU1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xyXG5leHBvcnQgY29uc3QgUkVBRFkgPSAncmVhZHknO1xyXG5leHBvcnQgY29uc3QgREVTVFJPWSA9ICdkZXN0cm95JztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9ICdzZWVrJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSX0ZVTEwgPSAnYnVmZmVyRnVsbCc7XHJcbmV4cG9ydCBjb25zdCBESVNQTEFZX0NMSUNLID0gJ2Rpc3BsYXlDbGljayc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9ICdsb2FkZWQnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLRUQgPSAnc2Vla2VkJztcclxuZXhwb3J0IGNvbnN0IE5FVFdPUktfVU5TVEFCTEVEID0gJ3Vuc3RhYmxlTmV0d29yayc7XHJcblxyXG5leHBvcnQgY29uc3QgRVJST1IgPSAnZXJyb3InO1xyXG5cclxuLy8gU1RBVEUgT0YgUExBWUVSXHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfU1RBVEUgPSAnc3RhdGVDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1BBVVNFID0gJ3BhdXNlJztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9QTEFZID0gJ3BsYXknO1xyXG5cclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSID0gJ2J1ZmZlckNoYW5nZWQnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9USU1FID0gJ3RpbWUnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9SQVRFX0NIQU5HRSA9ICdyYXRlY2hhbmdlJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVk9MVU1FID0gJ3ZvbHVtZUNoYW5nZWQnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9NVVRFID0gJ211dGUnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9NRVRBID0gJ21ldGFDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxTID0gJ3F1YWxpdHlMZXZlbENoYW5nZWQnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9MRVZFTF9DSEFOR0VEID0gJ2N1cnJlbnRRdWFsaXR5TGV2ZWxDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCA9ICdwbGF5YmFja1JhdGVDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCA9ICdjdWVDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DSEFOR0VEID0gJ2NhcHRpb25DaGFuZ2VkJztcclxuXHJcblxyXG5leHBvcnQgY29uc3QgSU5JVF9FUlJPUiA9IDEwMDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0VSUk9SID0gMzAwO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SID0gMzAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiA9IDMwMjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiA9IDMwMztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9GSUxFX0VSUk9SID0gMzA0O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0NBUFRJT05fRVJST1IgPSAzMDU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SID0gNTAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19XU19DTE9TRUQgPSA1MDI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IgPSA1MDM7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiA9IDUwNDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiA9IDUwNTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IgPSA1MDY7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyA9IDUxMDtcclxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2ggfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XHJcbmltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbiAsdHJpbX0gZnJvbSBcIi4uLy4uL3V0aWxzL3N0cmluZ3NcIjtcclxuaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCIuLi9TdXBwb3J0Q2hlY2tlclwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBQbGF5bGlzdCBvciBTb3VyY2VzLlxyXG4gKiBAcGFyYW1cclxuICpcclxuICogKi9cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBsZXQgY3VycmVudFBsYXlsaXN0ID0gW107XHJcbiAgICBsZXQgc3VwcG9ydENoZWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xyXG5cclxuICAgIGNvbnN0IG1ha2VQcmV0dHlTb3VyY2UgPSBmdW5jdGlvbihzb3VyY2VfKXtcclxuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc291cmNlID0gT2JqZWN0LmFzc2lnbih7fSwgeyAnZGVmYXVsdCc6IGZhbHNlIH0sIHNvdXJjZV8pO1xyXG4gICAgICAgIHNvdXJjZS5maWxlID0gdHJpbSgnJyArIHNvdXJjZS5maWxlKTtcclxuXHJcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xyXG4gICAgICAgICAgICBzb3VyY2UuZmlsZSA9IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9zdHJlYW0vXCIgKyBzb3VyY2Uuc3RyZWFtO1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuYXBwbGljYXRpb247XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Uuc3RyZWFtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWltZXR5cGVSZWdFeCA9IC9eW14vXStcXC8oPzp4LSk/KFteL10rKSQvO1xyXG5cclxuICAgICAgICBpZiAobWltZXR5cGVSZWdFeC50ZXN0KHNvdXJjZS50eXBlKSkge1xyXG4gICAgICAgICAgICAvLyBpZiB0eXBlIGlzIGdpdmVuIGFzIGEgbWltZXR5cGVcclxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gc291cmNlLnR5cGUucmVwbGFjZShtaW1ldHlwZVJlZ0V4LCAnJDEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGlzUnRtcChzb3VyY2UuZmlsZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcclxuICAgICAgICB9ZWxzZSBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICd3ZWJydGMnO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzRGFzaChzb3VyY2UuZmlsZSwgc291cmNlLnR5cGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnZGFzaCc7XHJcbiAgICAgICAgfWVsc2UgaWYgKCFzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IGV4dHJhY3RFeHRlbnNpb24oc291cmNlLmZpbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBub3JtYWxpemUgdHlwZXNcclxuICAgICAgICBzd2l0Y2ggKHNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ20zdTgnOlxyXG4gICAgICAgICAgICBjYXNlICd2bmQuYXBwbGUubXBlZ3VybCc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdobHMnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ200YSc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdhYWMnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NtaWwnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2Vba2V5XSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Vba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc291cmNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3QpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBzZXRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdCk7XHJcbiAgICAgICAgY29uc3QgcHJldHRpZWRQbGF5bGlzdCA9IChfLmlzQXJyYXkocGxheWxpc3QpID8gcGxheWxpc3QgOiBbcGxheWxpc3RdKS5tYXAoZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkoaXRlbS50cmFja3MpKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgaXRlbS50cmFja3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0SXRlbSA9IE9iamVjdC5hc3NpZ24oe30se1xyXG4gICAgICAgICAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgICAgICAgICB0cmFja3M6IFtdXHJcbiAgICAgICAgICAgIH0sIGl0ZW0gKTtcclxuXHJcbiAgICAgICAgICAgIGlmKChwbGF5bGlzdEl0ZW0uc291cmNlcyA9PT0gT2JqZWN0KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkgJiYgIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykpIHtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtLnNvdXJjZXMpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykgfHwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5sZXZlbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IGl0ZW0ubGV2ZWxzO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKGl0ZW0pXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eVNvdXJjZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0U291cmNlID0gc291cmNlLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gKGRlZmF1bHRTb3VyY2UudG9TdHJpbmcoKSA9PT0gJ3RydWUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc291cmNlIGRvZXNuJ3QgaGF2ZSBhIGxhYmVsLCBudW1iZXIgaXRcclxuICAgICAgICAgICAgICAgIGlmICghcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLnR5cGUrXCItXCIraS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHByZXR0eVNvdXJjZSA9IG1ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtLnNvdXJjZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYoc3VwcG9ydENoZWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHByZXR0eVNvdXJjZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gcHJldHR5U291cmNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmZpbHRlcihzb3VyY2UgPT4gISFzb3VyY2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmYXVsdCDqsIAg7JeG7J2E65WMIHdlYnJ0Y+qwgCDsnojri6TrqbQgd2VicnRjIGRlZmF1bHQgOiB0cnVl66GcIOyekOuPmSDshKTsoJVcclxuICAgICAgICAgICAgLypsZXQgaGF2ZURlZmF1bHQgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS5kZWZhdWx0ID09IHRydWU7fSk7XHJcbiAgICAgICAgICAgIGxldCB3ZWJydGNTb3VyY2UgPSBbXTtcclxuICAgICAgICAgICAgaWYoIWhhdmVEZWZhdWx0KXtcclxuICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZSA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLnR5cGUgPT0gXCJ3ZWJydGNcIjt9KTtcclxuICAgICAgICAgICAgICAgIGlmKHdlYnJ0Y1NvdXJjZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VicnRjU291cmNlLmRlZmF1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9Ki9cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0udHJhY2tzKSl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5jYXB0aW9ucykpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MuY29uY2F0KHBsYXlsaXN0SXRlbS5jYXB0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgcGxheWxpc3RJdGVtLmNhcHRpb25zO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5tYXAoZnVuY3Rpb24odHJhY2spe1xyXG4gICAgICAgICAgICAgICAgaWYoIXRyYWNrIHx8ICF0cmFjay5maWxlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwge1xyXG4gICAgICAgICAgICAgICAgICAgICdraW5kJzogJ2NhcHRpb25zJyxcclxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCB0cmFjayk7XHJcbiAgICAgICAgICAgIH0pLmZpbHRlcih0cmFjayA9PiAhIXRyYWNrKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwbGF5bGlzdEl0ZW07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY3VycmVudFBsYXlsaXN0ID0gcHJldHRpZWRQbGF5bGlzdDtcclxuICAgICAgICByZXR1cm4gcHJldHRpZWRQbGF5bGlzdDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRQbGF5bGlzdCgpIFwiLCBjdXJyZW50UGxheWxpc3QpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UGxheWxpc3Q7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlcyA9ICgpID0+IHtcclxuICAgICAgICAvL1dlIGRvIG5vdCBzdXBwb3J0IFwiUExBWUxJU1RcIiBub3QgeWV0LiBTbyB0aGlzIHJldHVybnMgcGxheWxpc3Qgb2YgMC5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0Q3VycmVudFNvdXJjZXMoKSBcIiwgY3VycmVudFBsYXlsaXN0WzBdLnNvdXJjZXMpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UGxheWxpc3RbMF0uc291cmNlcztcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcclxuIiwiaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCJhcGkvU3VwcG9ydENoZWNrZXJcIjtcclxuaW1wb3J0IFByb21pc2UsIHtyZXNvbHZlZH0gZnJvbSBcImFwaS9zaGltcy9wcm9taXNlXCI7XHJcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBwcm92aWRlci5cclxuICogQHBhcmFtXHJcbiAqICovXHJcbmNvbnN0IENvbnRyb2xsZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHN1cHBvcnRDaGFja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcclxuICAgIGNvbnN0IFByb3ZpZGVycyA9IHt9O1xyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkZWQuXCIpO1xyXG5cclxuICAgIGNvbnN0IHJlZ2lzdGVQcm92aWRlciA9IChuYW1lLCBwcm92aWRlcikgPT57XHJcbiAgICAgICAgaWYoUHJvdmlkZXJzW25hbWVdKXtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIF9yZWdpc3RlclByb3ZpZGVyKCkgXCIsIG5hbWUpO1xyXG4gICAgICAgIFByb3ZpZGVyc1tuYW1lXSA9IHByb3ZpZGVyO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBQcm92aWRlckxvYWRlciA9e1xyXG4gICAgICAgIGh0bWw1OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L0h0bWw1J10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9IdG1sNScpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiaHRtbDVcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2VicnRjIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L1dlYlJUQyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvV2ViUlRDJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJ3ZWJydGNcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGFzaCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9EYXNoJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9EYXNoJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJkYXNoXCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBobHMgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvSGxzJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9IbHMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcImhsc1wiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydG1wIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2ZsYXNoL1J0bXAnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2ZsYXNoL1J0bXAnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcInJ0bXBcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmxvYWRQcm92aWRlcnMgPSAocGxheWxpc3QpID0+e1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QocGxheWxpc3QpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkUHJvdmlkZXJzKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcclxuICAgICAgICAgICAgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcy5maWx0ZXIoZnVuY3Rpb24ocHJvdmlkZXJOYW1lKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhIVByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV07XHJcbiAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbihwcm92aWRlck5hbWUpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSBQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5maW5kQnlOYW1lID0gKG5hbWUpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZmluZEJ5TmFtZSgpIFwiLCBuYW1lKTtcclxuICAgICAgICByZXR1cm4gUHJvdmlkZXJzW25hbWVdO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFByb3ZpZGVyQnlTb3VyY2UgPSAoc291cmNlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGdldFByb3ZpZGVyQnlTb3VyY2UoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhhdC5maW5kQnlOYW1lKHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXNTYW1lUHJvdmlkZXIgPSAoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGlzU2FtZVByb3ZpZGVyKCkgXCIsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSAsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpICk7XHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSA9PT0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7XHJcbiIsIi8vICAgICAgUHJvbWlzZSBQb2x5ZmlsbFxuLy8gICAgICBodHRwczovL2dpdGh1Yi5jb20vdGF5bG9yaGFrZXMvcHJvbWlzZS1wb2x5ZmlsbFxuLy8gICAgICBDb3B5cmlnaHQgKGMpIDIwMTQgVGF5bG9yIEhha2VzXG4vLyAgICAgIENvcHlyaWdodCAoYykgMjAxNCBGb3JiZXMgTGluZGVzYXlcbi8vICAgICAgdGF5bG9yaGFrZXMvcHJvbWlzZS1wb2x5ZmlsbCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcblxuY29uc3QgcHJvbWlzZUZpbmFsbHkgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIHRoaXMudGhlbihcbiAgICAgICAgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVqZWN0KHJlYXNvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICk7XG59O1xuXG4vLyBTdG9yZSBzZXRUaW1lb3V0IHJlZmVyZW5jZSBzbyBwcm9taXNlLXBvbHlmaWxsIHdpbGwgYmUgdW5hZmZlY3RlZCBieVxuLy8gb3RoZXIgY29kZSBtb2RpZnlpbmcgc2V0VGltZW91dCAobGlrZSBzaW5vbi51c2VGYWtlVGltZXJzKCkpXG5jb25zdCBzZXRUaW1lb3V0RnVuYyA9IHdpbmRvdy5zZXRUaW1lb3V0O1xuY29uc3Qgc2V0SW1tZWRpYXRlRnVuYyA9IHdpbmRvdy5zZXRJbW1lZGlhdGU7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vLyBQb2x5ZmlsbCBmb3IgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcbmZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxuY29uc3QgUHJvbWlzZVNoaW0gPSBmdW5jdGlvbiAoZm4pIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUHJvbWlzZSkpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2VzIG11c3QgYmUgY29uc3RydWN0ZWQgdmlhIG5ldycpO1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vdCBhIGZ1bmN0aW9uJyk7XG4gICAgdGhpcy5fc3RhdGUgPSAwO1xuICAgIHRoaXMuX2hhbmRsZWQgPSBmYWxzZTtcbiAgICB0aGlzLl92YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9kZWZlcnJlZHMgPSBbXTtcblxuICAgIGRvUmVzb2x2ZShmbiwgdGhpcyk7XG59XG5cbmNvbnN0IGhhbmRsZSA9IGZ1bmN0aW9uIChzZWxmLCBkZWZlcnJlZCkge1xuICAgIHdoaWxlIChzZWxmLl9zdGF0ZSA9PT0gMykge1xuICAgICAgICBzZWxmID0gc2VsZi5fdmFsdWU7XG4gICAgfVxuICAgIGlmIChzZWxmLl9zdGF0ZSA9PT0gMCkge1xuICAgICAgICBzZWxmLl9kZWZlcnJlZHMucHVzaChkZWZlcnJlZCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2VsZi5faGFuZGxlZCA9IHRydWU7XG4gICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjYiA9IHNlbGYuX3N0YXRlID09PSAxID8gZGVmZXJyZWQub25GdWxmaWxsZWQgOiBkZWZlcnJlZC5vblJlamVjdGVkO1xuICAgICAgICBpZiAoY2IgPT09IG51bGwpIHtcbiAgICAgICAgICAgIChzZWxmLl9zdGF0ZSA9PT0gMSA/IHJlc29sdmUgOiByZWplY3QpKGRlZmVycmVkLnByb21pc2UsIHNlbGYuX3ZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmV0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0ID0gY2Ioc2VsZi5fdmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZWplY3QoZGVmZXJyZWQucHJvbWlzZSwgZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShkZWZlcnJlZC5wcm9taXNlLCByZXQpO1xuICAgIH0pO1xufVxuXG5jb25zdCByZXNvbHZlID0gZnVuY3Rpb24gKHNlbGYsIG5ld1ZhbHVlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gUHJvbWlzZSBSZXNvbHV0aW9uIFByb2NlZHVyZTogaHR0cHM6Ly9naXRodWIuY29tL3Byb21pc2VzLWFwbHVzL3Byb21pc2VzLXNwZWMjdGhlLXByb21pc2UtcmVzb2x1dGlvbi1wcm9jZWR1cmVcbiAgICAgICAgaWYgKG5ld1ZhbHVlID09PSBzZWxmKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQSBwcm9taXNlIGNhbm5vdCBiZSByZXNvbHZlZCB3aXRoIGl0c2VsZi4nKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgbmV3VmFsdWUgJiZcbiAgICAgICAgICAgICh0eXBlb2YgbmV3VmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB2YXIgdGhlbiA9IG5ld1ZhbHVlLnRoZW47XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fc3RhdGUgPSAzO1xuICAgICAgICAgICAgICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgZmluYWxlKHNlbGYpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBkb1Jlc29sdmUoYmluZCh0aGVuLCBuZXdWYWx1ZSksIHNlbGYpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxmLl9zdGF0ZSA9IDE7XG4gICAgICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIGZpbmFsZShzZWxmKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlamVjdChzZWxmLCBlKTtcbiAgICB9XG59XG5cbmNvbnN0IHJlamVjdCA9ZnVuY3Rpb24gKHNlbGYsIG5ld1ZhbHVlKSB7XG4gICAgc2VsZi5fc3RhdGUgPSAyO1xuICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgZmluYWxlKHNlbGYpO1xufVxuXG5jb25zdCBmaW5hbGUgPSBmdW5jdGlvbiAoc2VsZikge1xuICAgIGlmIChzZWxmLl9zdGF0ZSA9PT0gMiAmJiBzZWxmLl9kZWZlcnJlZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIFByb21pc2UuX2ltbWVkaWF0ZUZuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFzZWxmLl9oYW5kbGVkKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5fdW5oYW5kbGVkUmVqZWN0aW9uRm4oc2VsZi5fdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc2VsZi5fZGVmZXJyZWRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGhhbmRsZShzZWxmLCBzZWxmLl9kZWZlcnJlZHNbaV0pO1xuICAgIH1cbiAgICBzZWxmLl9kZWZlcnJlZHMgPSBudWxsO1xufVxuXG5jb25zdCBIYW5kbGVyID0gZnVuY3Rpb24gKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9taXNlKSB7XG4gICAgdGhpcy5vbkZ1bGZpbGxlZCA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogbnVsbDtcbiAgICB0aGlzLm9uUmVqZWN0ZWQgPSB0eXBlb2Ygb25SZWplY3RlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uUmVqZWN0ZWQgOiBudWxsO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG59XG5cbi8qKlxuICogVGFrZSBhIHBvdGVudGlhbGx5IG1pc2JlaGF2aW5nIHJlc29sdmVyIGZ1bmN0aW9uIGFuZCBtYWtlIHN1cmVcbiAqIG9uRnVsZmlsbGVkIGFuZCBvblJlamVjdGVkIGFyZSBvbmx5IGNhbGxlZCBvbmNlLlxuICpcbiAqIE1ha2VzIG5vIGd1YXJhbnRlZXMgYWJvdXQgYXN5bmNocm9ueS5cbiAqL1xuY29uc3QgZG9SZXNvbHZlID0gZnVuY3Rpb24gKGZuLCBzZWxmKSB7XG4gICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICBmbihcbiAgICAgICAgICAgIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHNlbGYsIHZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlamVjdChzZWxmLCByZWFzb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICByZWplY3Qoc2VsZiwgZXgpO1xuICAgIH1cbn1cblxuUHJvbWlzZVNoaW0ucHJvdG90eXBlWydjYXRjaCddID0gZnVuY3Rpb24ob25SZWplY3RlZCkge1xuICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3RlZCk7XG59O1xuXG5Qcm9taXNlU2hpbS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgdmFyIHByb20gPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcihub29wKTtcblxuICAgIGhhbmRsZSh0aGlzLCBuZXcgSGFuZGxlcihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcHJvbSkpO1xuICAgIHJldHVybiBwcm9tO1xufTtcblxuUHJvbWlzZVNoaW0ucHJvdG90eXBlWydmaW5hbGx5J10gPSBwcm9taXNlRmluYWxseTtcblxuUHJvbWlzZVNoaW0uYWxsID0gZnVuY3Rpb24oYXJyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoIWFyciB8fCB0eXBlb2YgYXJyLmxlbmd0aCA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlLmFsbCBhY2NlcHRzIGFuIGFycmF5Jyk7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKTtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzb2x2ZShbXSk7XG4gICAgICAgIHZhciByZW1haW5pbmcgPSBhcmdzLmxlbmd0aDtcblxuICAgICAgICBmdW5jdGlvbiByZXMoaSwgdmFsKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGVuID0gdmFsLnRoZW47XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhlbi5jYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKGksIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJnc1tpXSA9IHZhbDtcbiAgICAgICAgICAgICAgICBpZiAoLS1yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIHJlamVjdChleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlcyhpLCBhcmdzW2ldKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuUHJvbWlzZVNoaW0ucmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgIH0pO1xufTtcblxuUHJvbWlzZVNoaW0ucmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHJlamVjdCh2YWx1ZSk7XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlU2hpbS5yYWNlID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsdWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZXNbaV0udGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG4vLyBVc2UgcG9seWZpbGwgZm9yIHNldEltbWVkaWF0ZSBmb3IgcGVyZm9ybWFuY2UgZ2FpbnNcblByb21pc2VTaGltLl9pbW1lZGlhdGVGbiA9XG4gICAgKHR5cGVvZiBzZXRJbW1lZGlhdGVGdW5jID09PSAnZnVuY3Rpb24nICYmXG4gICAgZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgc2V0SW1tZWRpYXRlRnVuYyhmbik7XG4gICAgfSkgfHxcbiAgICBmdW5jdGlvbihmbikge1xuICAgICAgICBzZXRJbW1lZGlhdGVGdW5jKGZuLCAwKTtcbiAgICB9O1xuXG5Qcm9taXNlU2hpbS5fdW5oYW5kbGVkUmVqZWN0aW9uRm4gPSBmdW5jdGlvbiBfdW5oYW5kbGVkUmVqZWN0aW9uRm4oZXJyKSB7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignUG9zc2libGUgVW5oYW5kbGVkIFByb21pc2UgUmVqZWN0aW9uOicsIGVycik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cbn07XG5cbmNvbnN0IFByb21pc2UgPSB3aW5kb3cuUHJvbWlzZSB8fCAod2luZG93LlByb21pc2UgPSBQcm9taXNlU2hpbSk7XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlZCA9IFByb21pc2UucmVzb2x2ZSgpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9taXNlOyIsImltcG9ydCBPdmVuUGxheWVyU0RLLCB7Y2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50fSBmcm9tICcuL292ZW5wbGF5ZXIuc2RrJ1xyXG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcvdmlldyc7XHJcbmltcG9ydCBkb20gZnJvbSAnLi91dGlscy9wb2x5ZmlsbHMvZG9tLmpzJztcclxuaW1wb3J0IHtnZXRTY3JpcHRQYXRofSBmcm9tICd1dGlscy93ZWJwYWNrJztcclxuaW1wb3J0IHtnZXRCcm93c2VyfSBmcm9tICd1dGlscy9icm93c2VyJztcclxuXHJcblxyXG5fX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuanMnKTtcclxuXHJcbmNvbnN0IE92ZW5QbGF5ZXIgPSB7fTtcclxud2luZG93Lk92ZW5QbGF5ZXIgPSBPdmVuUGxheWVyO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDb3B5IHByb3BlcnRpZXMgZnJvbSBPdmVuUGxheWVyU0RLIG9iamVjdCB0byBPdmVuUGxheWVyIG9iamVjdFxyXG4gKi9cclxuT2JqZWN0LmFzc2lnbihPdmVuUGxheWVyLCBPdmVuUGxheWVyU0RLKTtcclxuXHJcbk92ZW5QbGF5ZXIuY3JlYXRlID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgb3B0aW9ucykge1xyXG4gICAgbGV0IGJyb3dzZXJOYW1lID0gZ2V0QnJvd3NlcigpO1xyXG4gICAgaWYoYnJvd3Nlck5hbWUgPT09IFwiaWVcIil7XHJcblxyXG4gICAgfVxyXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICB2YXIgcGxheWVyID0gVmlldyhjb250YWluZXJFbGVtZW50KTtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IE92ZW5QbGF5ZXJTREsuY3JlYXRlKHBsYXllci5nZXRNZWRpYUVsZW1lbnRDb250YWluZXIoKSwgb3B0aW9ucyk7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbihwbGF5ZXJJbnN0YW5jZSwge1xyXG4gICAgICAgIGdldENvbnRhaW5lcklkIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRWxlbWVudC5pZDtcclxuICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHBsYXllci5zZXRBcGkocGxheWVySW5zdGFuY2UpO1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcclxufVxyXG5cclxuIiwiaW1wb3J0IEFQSSBmcm9tICdhcGkvQXBpJztcclxuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSAndXRpbHMvdmFsaWRhdG9yJztcclxuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XHJcbmltcG9ydCBMYSQgZnJvbSAndXRpbHMvbGlrZUEkJztcclxuaW1wb3J0IHtnZXRTY3JpcHRQYXRofSBmcm9tICd1dGlscy93ZWJwYWNrJztcclxuXHJcblxyXG5fX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuc2RrLmpzJyk7XHJcblxyXG4vKipcclxuICogTWFpbiBPdmVuUGxheWVyU0RLIG9iamVjdFxyXG4gKi9cclxuY29uc3QgT3ZlblBsYXllclNESyA9IHdpbmRvdy5PdmVuUGxheWVyU0RLID0ge307XHJcblxyXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblxyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuXHJcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XHJcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSkge1xyXG5cclxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgcGxheWVyIGluc3RhbmNlIGFuZCByZXR1cm4gaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmcgfCBkb20gZWxlbWVudH0gY29udGFpbmVyICBJZCBvZiBjb250YWluZXIgZWxlbWVudCBvciBjb250YWluZXIgZWxlbWVudFxyXG4gKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zICBUaGUgb3B0aW9uc1xyXG4gKi9cclxuT3ZlblBsYXllclNESy5jcmVhdGUgPSBmdW5jdGlvbihjb250YWluZXIsIG9wdGlvbnMpIHtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudChjb250YWluZXIpO1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gQVBJKGNvbnRhaW5lckVsZW1lbnQpO1xyXG4gICAgcGxheWVySW5zdGFuY2UuaW5pdChvcHRpb25zKTtcclxuXHJcbiAgICBwbGF5ZXJMaXN0LnB1c2gocGxheWVySW5zdGFuY2UpO1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgbGlzdC5cclxuICpcclxuICogQHJldHVybiAgICAge2FycmF5fSAgVGhlIHBsYXllciBsaXN0LlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckxpc3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGNvbnRhaW5lciBpZC5cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZ30gIGNvbnRhaW5lcklkICBUaGUgY29udGFpbmVyIGlkZW50aWZpZXJcclxuICogQHJldHVybiAgICAge29iZWplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlDb250YWluZXJJZCA9IGZ1bmN0aW9uKGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBjb250YWluZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBsYXllckxpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBpbmRleC5cclxuICpcclxuICogQHBhcmFtICAgICAge251bWJlcn0gIGluZGV4ICAgVGhlIGluZGV4XHJcbiAqIEByZXR1cm4gICAgIHtvYmplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlJbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcblxyXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBwbGF5ZXJMaXN0W2luZGV4XTtcclxuXHJcbiAgICBpZiAocGxheWVySW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgcGxheWVySWQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtwbGF5ZXJJZH0gIGlkXHJcbiAqIEByZXR1cm4gICAgIHtudWxsfVxyXG4gKi9cclxuT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIgPSBmdW5jdGlvbihwbGF5ZXJJZCkge1xyXG4gICAgY29uc29sZS5sb2cocGxheWVySWQpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBwbGF5ZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgcGxheWVyTGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSB3ZWJydGMgc291cmNlIGZvciBwbGF5ZXIgc291cmNlIHR5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtPYmplY3QgfCBBcnJheX0gIHNvdXJjZSAgIHdlYnJ0YyBzb3VyY2VcclxuICogQHJldHVybiAgICAge0FycmF5fSAgUGxheWVyIHNvdXJjZSBPYmVqY3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdlbmVyYXRlV2VicnRjVXJscyA9IGZ1bmN0aW9uKHNvdXJjZXMpIHtcclxuICAgIHJldHVybiAoXy5pc0FycmF5KHNvdXJjZXMpID8gc291cmNlcyA6IFtzb3VyY2VzXSkubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpe1xyXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIGlzV2ViUlRDKHNvdXJjZS5ob3N0KSAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XHJcbiAgICAgICAgICAgIHJldHVybiB7ZmlsZSA6IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9cIiArIHNvdXJjZS5zdHJlYW0sIHR5cGUgOiBcIndlYnJ0Y1wiLCBsYWJlbCA6IHNvdXJjZS5sYWJlbCA/IHNvdXJjZS5sYWJlbCA6IFwid2VicnRjLVwiKyhpbmRleCsxKSB9O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgT3ZlblBsYXllclNESztcclxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxuICovXG5cblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXIgPSBmdW5jdGlvbigpe1xuICAgIGlmKChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPcGVyYVwiKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpKSAhPSAtMSApe1xuICAgICAgICByZXR1cm4gJ29wZXJhJztcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIikgIT0gLTEgKXtcbiAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlNhZmFyaVwiKSAhPSAtMSl7XG4gICAgICAgIHJldHVybiAnc2FmYXJpJztcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpICE9IC0xICl7XG4gICAgICAgIHJldHVybiAnZmlyZWZveCc7XG4gICAgfWVsc2UgaWYoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIikgIT0gLTEgKSl7XG4gICAgICAgIGxldCBtc2llID0gYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpO1xuICAgICAgICBpZighIWRvY3VtZW50LmRvY3VtZW50TW9kZSA9PSB0cnVlICl7XG4gICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgfWVsc2UgaWYoISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LipydlxcOjExXFwuLykpe1xuICAgICAgICAgICAgaWYgKCFpc05hTihwYXJzZUludCh1YS5zdWJzdHJpbmcobXNpZSArIDUsIHVhLmluZGV4T2YoXCIuXCIsIG1zaWUpKSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpZSc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XG4gICAgICAgIH1cblxuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgIH1cblxufTtcblxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIEl0IHdhcyByZXBsYWNlIGpxdWVyeSdzIHNlbGVjdG9yLiBJdCBPZnRlbiB1c2VkIGJ5IE92ZW5UZW1wbGF0ZS4gKC92aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUuanMpXHJcbiAqIEBwYXJhbSAgIHNlbGVjdG9yT3JFbGVtZW50ICBzdHJpbmcgb3IgZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IExhJCA9IGZ1bmN0aW9uKHNlbGVjdG9yT3JFbGVtZW50KXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGNvbnN0IHJldHVybk5vZGUgPSBmdW5jdGlvbigkZWxlbWVudCAsIHNlbGVjdG9yKXtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSAgJGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgaWYobm9kZUxpc3QubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCAkZWxlbWVudCA9IFwiXCI7XHJcblxyXG4gICAgaWYoIF8uZXZlcnkoc2VsZWN0b3JPckVsZW1lbnQsIGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBfLmlzRWxlbWVudChpdGVtKX0pKXtcclxuICAgICAgICAkZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xyXG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwiZG9jdW1lbnRcIil7XHJcbiAgICAgICAgJGVsZW1lbnQgPSBkb2N1bWVudDtcclxuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcIndpbmRvd1wiKXtcclxuICAgICAgICAkZWxlbWVudCA9IHdpbmRvdztcclxuICAgIH1lbHNle1xyXG4gICAgICAgICRlbGVtZW50ID0gcmV0dXJuTm9kZShkb2N1bWVudCwgc2VsZWN0b3JPckVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZighJGVsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZmluZCA9IChzZWxlY3RvcikgPT57XHJcbiAgICAgICAgcmV0dXJuIExhJChyZXR1cm5Ob2RlKCRlbGVtZW50LCBzZWxlY3RvcikpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNzcyA9IChuYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hZGRDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9ICRlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGlmKGNsYXNzTmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIFwiICsgbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2xhc3MgPSAobmFtZSkgPT57XHJcbiAgICAgICAgaWYgKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSA9ICRlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBuYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQXR0cmlidXRlID0gKGF0dHJOYW1lKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zaG93ID0gKCkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGlkZSA9ICgpID0+e1xyXG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWxDb2RlKSA9PntcclxuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgKz0gaHRtbENvZGU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQudGV4dCA9ICh0ZXh0KSA9PiB7IC8vSUU4K1xyXG4gICAgICAgIGlmKHRleHQpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC50ZXh0Q29udGVudDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGFzQ2xhc3MgPSAobmFtZSkgPT4geyAvL0lFOCtcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgbmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoJGVsZW1lbnQubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzID0gKCR0YXJnZXRFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50ID09PSAkdGFyZ2V0RWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5vZmZzZXQgPSAoKSA9PnsgICAgLy9JRTgrXHJcbiAgICAgICAgdmFyIHJlY3QgPSAkZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wLFxyXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnRcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQud2lkdGggPSAoKSA9PiB7ICAgIC8vSUU4K1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5oZWlnaHQgPSAoKSA9PiB7ICAgLy9JRTgrXHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hdHRyID0gKGF0dHIpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlcGxhY2UgPSAoaHRtbCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LnJlcGxhY2VXaXRoKGh0bWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFwcGVuZCA9IChodG1sKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQuYXBwZW5kQ2hpbGQoaHRtbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlbW92ZUNoaWxkID0gKCkgPT4ge1xyXG4gICAgICAgIHdoaWxlICgkZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2hpbGQoJGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY2xvc2VzdCA9IChzZWxlY3RvclN0cmluZykgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yU3RyaW5nKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMYSQ7XHJcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDI0Li5cbiAqL1xuXG5jb25zdCBsb2dnZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgcHJldkNvbnNvbGVMb2cgPSBudWxsO1xuXG4gICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0ge2xvZyA6IHdpbmRvd1snY29uc29sZSddWydsb2cnXX07XG5cbiAgICB0aGF0LmVuYWJsZSA9ICgpID0+e1xuICAgICAgICBpZihwcmV2Q29uc29sZUxvZyA9PSBudWxsKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBwcmV2Q29uc29sZUxvZztcbiAgICB9O1xuICAgIHRoYXQuZGlzYWJsZSA9ICgpID0+e1xuICAgICAgICBwcmV2Q29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBmdW5jdGlvbigpe307XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0gbnVsbDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjsiLCIvKlxyXG4qIENvcHlyaWdodCAyMDE4IEpvc2h1YSBCZWxsXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cclxuKiAqL1xyXG5cclxuKGZ1bmN0aW9uKGdsb2JhbCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgaWYgKCEoJ3dpbmRvdycgaW4gZ2xvYmFsICYmICdkb2N1bWVudCcgaW4gZ2xvYmFsKSlcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvL1xyXG4gICAgLy8gRE9NXHJcbiAgICAvLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvXHJcbiAgICAvL1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gRG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCBtZXRob2RcclxuICAgIC8vIGh0dHA6Ly9hamF4aWFuLmNvbS9hcmNoaXZlcy9jcmVhdGluZy1hLXF1ZXJ5c2VsZWN0b3ItZm9yLWllLXRoYXQtcnVucy1hdC1uYXRpdmUtc3BlZWRcclxuICAgIC8vIE5lZWRlZCBmb3I6IElFNy1cclxuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgPSBmdW5jdGlvbihzZWxlY3RvcnMpIHtcclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSwgZWxlbWVudHMgPSBbXSwgZWxlbWVudDtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmZpcnN0Q2hpbGQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5fcXNhID0gW107XHJcblxyXG4gICAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBzZWxlY3RvcnMgKyAne3gtcXNhOmV4cHJlc3Npb24oZG9jdW1lbnQuX3FzYSAmJiBkb2N1bWVudC5fcXNhLnB1c2godGhpcykpfSc7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxCeSgwLCAwKTtcclxuICAgICAgICAgICAgc3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoZG9jdW1lbnQuX3FzYS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5fcXNhLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZUF0dHJpYnV0ZSgneC1xc2EnKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG9jdW1lbnQuX3FzYSA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50cztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgbWV0aG9kXHJcbiAgICAvLyBOZWVkZWQgZm9yOiBJRTctXHJcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yID0gZnVuY3Rpb24oc2VsZWN0b3JzKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JzKTtcclxuICAgICAgICAgICAgcmV0dXJuIChlbGVtZW50cy5sZW5ndGgpID8gZWxlbWVudHNbMF0gOiBudWxsO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSBtZXRob2RcclxuICAgIC8vIE5lZWRlZCBmb3I6IElFOC1cclxuICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBmdW5jdGlvbihjbGFzc05hbWVzKSB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgPSBTdHJpbmcoY2xhc3NOYW1lcykucmVwbGFjZSgvXnxcXHMrL2csICcuJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNsYXNzTmFtZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTm9kZSBpbnRlcmZhY2UgY29uc3RhbnRzXHJcbiAgICAvLyBOZWVkZWQgZm9yOiBJRTgtXHJcbiAgICBnbG9iYWwuTm9kZSA9IGdsb2JhbC5Ob2RlIHx8IGZ1bmN0aW9uKCkgeyB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIGNvbnN0cnVjdG9yXCIpOyB9O1xyXG4gICAgW1xyXG4gICAgICAgIFsnRUxFTUVOVF9OT0RFJywgMV0sXHJcbiAgICAgICAgWydBVFRSSUJVVEVfTk9ERScsIDJdLFxyXG4gICAgICAgIFsnVEVYVF9OT0RFJywgM10sXHJcbiAgICAgICAgWydDREFUQV9TRUNUSU9OX05PREUnLCA0XSxcclxuICAgICAgICBbJ0VOVElUWV9SRUZFUkVOQ0VfTk9ERScsIDVdLFxyXG4gICAgICAgIFsnRU5USVRZX05PREUnLCA2XSxcclxuICAgICAgICBbJ1BST0NFU1NJTkdfSU5TVFJVQ1RJT05fTk9ERScsIDddLFxyXG4gICAgICAgIFsnQ09NTUVOVF9OT0RFJywgOF0sXHJcbiAgICAgICAgWydET0NVTUVOVF9OT0RFJywgOV0sXHJcbiAgICAgICAgWydET0NVTUVOVF9UWVBFX05PREUnLCAxMF0sXHJcbiAgICAgICAgWydET0NVTUVOVF9GUkFHTUVOVF9OT0RFJywgMTFdLFxyXG4gICAgICAgIFsnTk9UQVRJT05fTk9ERScsIDEyXVxyXG4gICAgXS5mb3JFYWNoKGZ1bmN0aW9uKHApIHsgaWYgKCEocFswXSBpbiBnbG9iYWwuTm9kZSkpIGdsb2JhbC5Ob2RlW3BbMF1dID0gcFsxXTsgfSk7XHJcblxyXG4gICAgLy8gRE9NRXhjZXB0aW9uIGNvbnN0YW50c1xyXG4gICAgLy8gTmVlZGVkIGZvcjogSUU4LVxyXG4gICAgZ2xvYmFsLkRPTUV4Y2VwdGlvbiA9IGdsb2JhbC5ET01FeGNlcHRpb24gfHwgZnVuY3Rpb24oKSB7IHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgY29uc3RydWN0b3JcIik7IH07XHJcbiAgICBbXHJcbiAgICAgICAgWydJTkRFWF9TSVpFX0VSUicsIDFdLFxyXG4gICAgICAgIFsnRE9NU1RSSU5HX1NJWkVfRVJSJywgMl0sXHJcbiAgICAgICAgWydISUVSQVJDSFlfUkVRVUVTVF9FUlInLCAzXSxcclxuICAgICAgICBbJ1dST05HX0RPQ1VNRU5UX0VSUicsIDRdLFxyXG4gICAgICAgIFsnSU5WQUxJRF9DSEFSQUNURVJfRVJSJywgNV0sXHJcbiAgICAgICAgWydOT19EQVRBX0FMTE9XRURfRVJSJywgNl0sXHJcbiAgICAgICAgWydOT19NT0RJRklDQVRJT05fQUxMT1dFRF9FUlInLCA3XSxcclxuICAgICAgICBbJ05PVF9GT1VORF9FUlInLCA4XSxcclxuICAgICAgICBbJ05PVF9TVVBQT1JURURfRVJSJywgOV0sXHJcbiAgICAgICAgWydJTlVTRV9BVFRSSUJVVEVfRVJSJywgMTBdLFxyXG4gICAgICAgIFsnSU5WQUxJRF9TVEFURV9FUlInLCAxMV0sXHJcbiAgICAgICAgWydTWU5UQVhfRVJSJywgMTJdLFxyXG4gICAgICAgIFsnSU5WQUxJRF9NT0RJRklDQVRJT05fRVJSJywgMTNdLFxyXG4gICAgICAgIFsnTkFNRVNQQUNFX0VSUicsIDE0XSxcclxuICAgICAgICBbJ0lOVkFMSURfQUNDRVNTX0VSUicsIDE1XVxyXG4gICAgXS5mb3JFYWNoKGZ1bmN0aW9uKHApIHsgaWYgKCEocFswXSBpbiBnbG9iYWwuRE9NRXhjZXB0aW9uKSkgZ2xvYmFsLkRPTUV4Y2VwdGlvbltwWzBdXSA9IHBbMV07IH0pO1xyXG5cclxuICAgIC8vIEV2ZW50IGFuZCBFdmVudFRhcmdldHMgaW50ZXJmYWNlc1xyXG4gICAgLy8gTmVlZGVkIGZvcjogSUU4XHJcbiAgICAoZnVuY3Rpb24oKXtcclxuICAgICAgICBpZiAoISgnRWxlbWVudCcgaW4gZ2xvYmFsKSB8fCBFbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyIHx8ICFPYmplY3QuZGVmaW5lUHJvcGVydHkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gaW50ZXJmYWNlIEV2ZW50XHJcblxyXG4gICAgICAgIC8vIFBoYXNlVHlwZSAoY29uc3QgdW5zaWduZWQgc2hvcnQpXHJcbiAgICAgICAgRXZlbnQuQ0FQVFVSSU5HX1BIQVNFID0gMTtcclxuICAgICAgICBFdmVudC5BVF9UQVJHRVQgICAgICAgPSAyO1xyXG4gICAgICAgIEV2ZW50LkJVQkJMSU5HX1BIQVNFICA9IDM7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEV2ZW50LnByb3RvdHlwZSwge1xyXG4gICAgICAgICAgICBDQVBUVVJJTkdfUEhBU0U6IHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIDE7IH0gfSxcclxuICAgICAgICAgICAgQVRfVEFSR0VUOiAgICAgICB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiAyOyB9IH0sXHJcbiAgICAgICAgICAgIEJVQkJMSU5HX1BIQVNFOiAgIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIDM7IH0gfSxcclxuICAgICAgICAgICAgdGFyZ2V0OiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNyY0VsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB9fSxcclxuICAgICAgICAgICAgY3VycmVudFRhcmdldDoge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFRhcmdldDtcclxuICAgICAgICAgICAgICAgIH19LFxyXG4gICAgICAgICAgICBldmVudFBoYXNlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5zcmNFbGVtZW50ID09PSB0aGlzLmN1cnJlbnRUYXJnZXQpID8gRXZlbnQuQVRfVEFSR0VUIDogRXZlbnQuQlVCQkxJTkdfUEhBU0U7XHJcbiAgICAgICAgICAgICAgICB9fSxcclxuICAgICAgICAgICAgYnViYmxlczoge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNb3VzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjbGljayc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RibGNsaWNrJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2Vkb3duJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2V1cCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNlb3Zlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNlbW92ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNlb3V0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2V3aGVlbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEtleWJvYXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2tleWRvd24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdrZXlwcmVzcyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2tleXVwJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRnJhbWUvT2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Jlc2l6ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Njcm9sbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VsZWN0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2hhbmdlJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3VibWl0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVzZXQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH19LFxyXG4gICAgICAgICAgICBjYW5jZWxhYmxlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1vdXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGJsY2xpY2snOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZXVwJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2VvdmVyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2VvdXQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZXdoZWVsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gS2V5Ym9hcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAna2V5ZG93bic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2tleXByZXNzJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAna2V5dXAnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N1Ym1pdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfX0sXHJcbiAgICAgICAgICAgIHRpbWVTdGFtcDoge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGltZVN0YW1wO1xyXG4gICAgICAgICAgICAgICAgfX0sXHJcbiAgICAgICAgICAgIHN0b3BQcm9wYWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH19LFxyXG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH19LFxyXG4gICAgICAgICAgICBkZWZhdWx0UHJldmVudGVkOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJldHVyblZhbHVlID09PSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGludGVyZmFjZSBFdmVudFRhcmdldFxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdET01Db250ZW50TG9hZGVkJykgdHlwZSA9ICdsb2FkJztcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5fdGltZVN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgICAgIGUuX2N1cnJlbnRUYXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGUpO1xyXG4gICAgICAgICAgICAgICAgZS5fY3VycmVudFRhcmdldCA9IG51bGw7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXNbJ18nICsgdHlwZSArIGxpc3RlbmVyXSA9IGY7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnRE9NQ29udGVudExvYWRlZCcpIHR5cGUgPSAnbG9hZCc7XHJcbiAgICAgICAgICAgIHZhciBmID0gdGhpc1snXycgKyB0eXBlICsgbGlzdGVuZXJdO1xyXG4gICAgICAgICAgICBpZiAoZikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhY2hFdmVudCgnb24nICsgdHlwZSwgZik7XHJcbiAgICAgICAgICAgICAgICB0aGlzWydfJyArIHR5cGUgKyBsaXN0ZW5lcl0gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBbV2luZG93LCBIVE1MRG9jdW1lbnQsIEVsZW1lbnRdLmZvckVhY2goZnVuY3Rpb24obykge1xyXG4gICAgICAgICAgICBvLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lcjtcclxuICAgICAgICAgICAgby5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJlbW92ZUV2ZW50TGlzdGVuZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KCkpO1xyXG5cclxuICAgIC8vIEN1c3RvbUV2ZW50XHJcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnQvQ3VzdG9tRXZlbnRcclxuICAgIC8vIE5lZWRlZCBmb3I6IElFXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgnQ3VzdG9tRXZlbnQnIGluIGdsb2JhbCAmJiB0eXBlb2YgZ2xvYmFsLkN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBmdW5jdGlvbiBDdXN0b21FdmVudCAoIGV2ZW50LCBwYXJhbXMgKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiB1bmRlZmluZWQgfTtcclxuICAgICAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCAnQ3VzdG9tRXZlbnQnICk7XHJcbiAgICAgICAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoIGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwgKTtcclxuICAgICAgICAgICAgcmV0dXJuIGV2dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gZ2xvYmFsLkV2ZW50LnByb3RvdHlwZTtcclxuICAgICAgICBnbG9iYWwuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgLy8gU2hpbSBmb3IgRE9NIEV2ZW50cyBmb3IgSUU3LVxyXG4gICAgLy8gaHR0cDovL3d3dy5xdWlya3Ntb2RlLm9yZy9ibG9nL2FyY2hpdmVzLzIwMDUvMTAvX2FuZF90aGVfd2lubmVyXzEuaHRtbFxyXG4gICAgLy8gVXNlIGFkZEV2ZW50KG9iamVjdCwgZXZlbnQsIGhhbmRsZXIpIGluc3RlYWQgb2Ygb2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpXHJcbiAgICB3aW5kb3cuYWRkRXZlbnQgPSBmdW5jdGlvbihvYmosIHR5cGUsIGZuKSB7XHJcbiAgICAgICAgaWYgKG9iai5hZGRFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIG9iai5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChvYmouYXR0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgb2JqW1wiZVwiICsgdHlwZSArIGZuXSA9IGZuO1xyXG4gICAgICAgICAgICBvYmpbdHlwZSArIGZuXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGUgPSB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQgPSBvYmo7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7IGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgfTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24oKSB7IGUuY2FuY2VsQnViYmxlID0gdHJ1ZTsgfTtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0ID0gZS5zcmNFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgZS50aW1lU3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgb2JqW1wiZVwiICsgdHlwZSArIGZuXS5jYWxsKHRoaXMsIGUpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBvYmouYXR0YWNoRXZlbnQoXCJvblwiICsgdHlwZSwgb2JqW3R5cGUgKyBmbl0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24ob2JqLCB0eXBlLCBmbikge1xyXG4gICAgICAgIGlmIChvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob2JqLmRldGFjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgIG9iai5kZXRhY2hFdmVudChcIm9uXCIgKyB0eXBlLCBvYmpbdHlwZSArIGZuXSk7XHJcbiAgICAgICAgICAgIG9ialt0eXBlICsgZm5dID0gbnVsbDtcclxuICAgICAgICAgICAgb2JqW1wiZVwiICsgdHlwZSArIGZuXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBET01Ub2tlbkxpc3QgaW50ZXJmYWNlIGFuZCBFbGVtZW50LmNsYXNzTGlzdCAvIEVsZW1lbnQucmVsTGlzdFxyXG4gICAgLy8gTmVlZGVkIGZvcjogSUU5LVxyXG4gICAgLy8gVXNlIGdldENsYXNzTGlzdChlbGVtKSBpbnN0ZWFkIG9mIGVsZW0uY2xhc3NMaXN0KCkgaWYgSUU3LSBzdXBwb3J0IGlzIG5lZWRlZFxyXG4gICAgLy8gVXNlIGdldFJlbExpc3QoZWxlbSkgaW5zdGVhZCBvZiBlbGVtLnJlbExpc3QoKSBpZiBJRTctIHN1cHBvcnQgaXMgbmVlZGVkXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gRE9NVG9rZW5MaXN0U2hpbShvLCBwKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNwbGl0KHMpIHsgcmV0dXJuIHMubGVuZ3RoID8gcy5zcGxpdCgvXFxzKy9nKSA6IFtdOyB9XHJcblxyXG4gICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGRvZXMgbm90IGV4YWN0bHkgbWF0Y2ggdGhlIHNwZWMuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZVRva2VuRnJvbVN0cmluZyh0b2tlbiwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gc3BsaXQoc3RyaW5nKSxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHRva2Vucy5pbmRleE9mKHRva2VuKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbnMuam9pbignICcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhcclxuICAgICAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBzcGxpdChvW3BdKS5sZW5ndGg7IH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbihpZHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBzcGxpdChvW3BdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwIDw9IGlkeCAmJiBpZHggPCB0b2tlbnMubGVuZ3RoID8gdG9rZW5zW2lkeF0gOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IFN0cmluZyh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4ubGVuZ3RoID09PSAwKSB7IHRocm93IFN5bnRheEVycm9yKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvXFxzLy50ZXN0KHRva2VuKSkgeyB0aHJvdyBFcnJvcihcIkludmFsaWRDaGFyYWN0ZXJFcnJvclwiKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IHNwbGl0KG9bcF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbnMuaW5kZXhPZih0b2tlbikgIT09IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbigvKnRva2Vucy4uLiovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5tYXAoU3RyaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbnMuc29tZShmdW5jdGlvbih0b2tlbikgeyByZXR1cm4gdG9rZW4ubGVuZ3RoID09PSAwOyB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFN5bnRheEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5zLnNvbWUoZnVuY3Rpb24odG9rZW4pIHsgcmV0dXJuICgvXFxzLykudGVzdCh0b2tlbik7IH0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJJbnZhbGlkQ2hhcmFjdGVyRXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdW5kZXJseWluZ19zdHJpbmcgPSBvW3BdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbl9saXN0ID0gc3BsaXQodW5kZXJseWluZ19zdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VucyA9IHRva2Vucy5maWx0ZXIoZnVuY3Rpb24odG9rZW4pIHsgcmV0dXJuIHRva2VuX2xpc3QuaW5kZXhPZih0b2tlbikgPT09IC0xOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1bmRlcmx5aW5nX3N0cmluZy5sZW5ndGggIT09IDAgJiYgISgvXFxzJC8pLnRlc3QodW5kZXJseWluZ19zdHJpbmcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybHlpbmdfc3RyaW5nICs9ICcgJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZXJseWluZ19zdHJpbmcgKz0gdG9rZW5zLmpvaW4oJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW3BdID0gdW5kZXJseWluZ19zdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSBzcGxpdChvW3BdKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoICE9PSBsZW5ndGgpIHsgdGhpcy5sZW5ndGggPSBsZW5ndGg7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oLyp0b2tlbnMuLi4qLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykubWFwKFN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5zLnNvbWUoZnVuY3Rpb24odG9rZW4pIHsgcmV0dXJuIHRva2VuLmxlbmd0aCA9PT0gMDsgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBTeW50YXhFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2Vucy5zb21lKGZ1bmN0aW9uKHRva2VuKSB7IHJldHVybiAoL1xccy8pLnRlc3QodG9rZW4pOyB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwiSW52YWxpZENoYXJhY3RlckVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVuZGVybHlpbmdfc3RyaW5nID0gb1twXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMuZm9yRWFjaChmdW5jdGlvbih0b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlcmx5aW5nX3N0cmluZyA9IHJlbW92ZVRva2VuRnJvbVN0cmluZyh0b2tlbiwgdW5kZXJseWluZ19zdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bcF0gPSB1bmRlcmx5aW5nX3N0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHNwbGl0KG9bcF0pLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggIT09IGxlbmd0aCkgeyB0aGlzLmxlbmd0aCA9IGxlbmd0aDsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbih0b2tlbi8qLCBmb3JjZSovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9yY2UgPSBhcmd1bWVudHNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gU3RyaW5nKHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4ubGVuZ3RoID09PSAwKSB7IHRocm93IFN5bnRheEVycm9yKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoL1xccy8udGVzdCh0b2tlbikpIHsgdGhyb3cgRXJyb3IoXCJJbnZhbGlkQ2hhcmFjdGVyRXJyb3JcIik7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gc3BsaXQob1twXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gdG9rZW5zLmluZGV4T2YodG9rZW4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xICYmICghZm9yY2UgfHwgZm9yY2UgPT09ICh2b2lkIDApKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW3BdID0gcmVtb3ZlVG9rZW5Gcm9tU3RyaW5nKHRva2VuLCBvW3BdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xICYmIGZvcmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdW5kZXJseWluZ19zdHJpbmcgPSBvW3BdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1bmRlcmx5aW5nX3N0cmluZy5sZW5ndGggIT09IDAgJiYgIS9cXHMkLy50ZXN0KHVuZGVybHlpbmdfc3RyaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlcmx5aW5nX3N0cmluZyArPSAnICc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybHlpbmdfc3RyaW5nICs9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bcF0gPSB1bmRlcmx5aW5nX3N0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHNwbGl0KG9bcF0pLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggIT09IGxlbmd0aCkgeyB0aGlzLmxlbmd0aCA9IGxlbmd0aDsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG9TdHJpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9bcF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKCEoJ2xlbmd0aCcgaW4gdGhpcykpIHtcclxuICAgICAgICAgICAgICAgIC8vIEluIGNhc2UgZ2V0dGVycyBhcmUgbm90IHN1cHBvcnRlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBzcGxpdChvW3BdKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGV5IGFyZSwgc2hpbSBpbiBpbmRleCBnZXR0ZXJzICh1cCB0byAxMDApXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFN0cmluZyhpKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IChmdW5jdGlvbihuKSB7IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuaXRlbShuKTsgfTsgfShpKSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkVG9FbGVtZW50UHJvdG90eXBlKHAsIGYpIHtcclxuICAgICAgICAgICAgaWYgKCdFbGVtZW50JyBpbiBnbG9iYWwgJiYgRWxlbWVudC5wcm90b3R5cGUgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRWxlbWVudC5wcm90b3R5cGUsIHAsIHsgZ2V0OiBmIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBIVE1MIC0gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZ1xyXG4gICAgICAgIC8vIEVsZW1lbnQuY2xhc3NMaXN0XHJcbiAgICAgICAgaWYgKCdjbGFzc0xpc3QnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuZ2V0Q2xhc3NMaXN0ID0gZnVuY3Rpb24oZWxlbSkgeyByZXR1cm4gZWxlbS5jbGFzc0xpc3Q7IH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmdldENsYXNzTGlzdCA9IGZ1bmN0aW9uKGVsZW0pIHsgcmV0dXJuIG5ldyBET01Ub2tlbkxpc3RTaGltKGVsZW0sICdjbGFzc05hbWUnKTsgfTtcclxuICAgICAgICAgICAgYWRkVG9FbGVtZW50UHJvdG90eXBlKCdjbGFzc0xpc3QnLCBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBET01Ub2tlbkxpc3RTaGltKHRoaXMsICdjbGFzc05hbWUnKTsgfSApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSFRNTCAtIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmdcclxuICAgICAgICAvLyBIVE1MQW5jaG9yRWxlbWVudC5yZWxMaXN0XHJcbiAgICAgICAgLy8gSFRNTExpbmtFbGVtZW50LnJlbExpc3RcclxuICAgICAgICBpZiAoJ3JlbExpc3QnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuZ2V0UmVsTGlzdCA9IGZ1bmN0aW9uKGVsZW0pIHsgcmV0dXJuIGVsZW0ucmVsTGlzdDsgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cuZ2V0UmVsTGlzdCA9IGZ1bmN0aW9uKGVsZW0pIHsgcmV0dXJuIG5ldyBET01Ub2tlbkxpc3RTaGltKGVsZW0sICdyZWwnKTsgfTtcclxuICAgICAgICAgICAgYWRkVG9FbGVtZW50UHJvdG90eXBlKCdyZWxMaXN0JywgZnVuY3Rpb24oKSB7IHJldHVybiBuZXcgRE9NVG9rZW5MaXN0U2hpbSh0aGlzLCAncmVsJyk7IH0gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBzZWNvbmQgYXJndW1lbnQgdG8gbmF0aXZlIERPTVRva2VuTGlzdC50b2dnbGUoKSBpZiBuZWNlc3NhcnlcclxuICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghKCdET01Ub2tlbkxpc3QnIGluIGdsb2JhbCkpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIGlmICghKCdjbGFzc0xpc3QnIGluIGUpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGUuY2xhc3NMaXN0LnRvZ2dsZSgneCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKCFlLmNsYXNzTGlzdC5jb250YWlucygneCcpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGdsb2JhbC5ET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIHRvZ2dsZSh0b2tlbi8qLCBmb3JjZSovKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZm9yY2UgPSBhcmd1bWVudHNbMV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhZGQgPSAhdGhpcy5jb250YWlucyh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1thZGQgPyAnYWRkJyA6ICdyZW1vdmUnXSh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFkZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvcmNlID0gISFmb3JjZTtcclxuICAgICAgICAgICAgICAgIHRoaXNbZm9yY2UgPyAnYWRkJyA6ICdyZW1vdmUnXSh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9yY2U7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSgpKTtcclxuXHJcblxyXG4gICAgICAgIC8vIERPTSAtIEludGVyZmFjZSBOb25Eb2N1bWVudFR5cGVDaGlsZE5vZGVcclxuICAgICAgICAvLyBJbnRlcmZhY2UgTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlXHJcbiAgICAgICAgLy8gcHJldmlvdXNFbGVtZW50U2libGluZyAvIG5leHRFbGVtZW50U2libGluZyAtIGZvciBJRThcclxuXHJcbiAgICAgICAgaWYgKCEoJ3ByZXZpb3VzRWxlbWVudFNpYmxpbmcnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpIHtcclxuICAgICAgICAgICAgYWRkVG9FbGVtZW50UHJvdG90eXBlKCdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbiA9IHRoaXMucHJldmlvdXNTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG4gJiYgbi5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUpXHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IG4ucHJldmlvdXNTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG47XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCEoJ25leHRFbGVtZW50U2libGluZycgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICBhZGRUb0VsZW1lbnRQcm90b3R5cGUoJ25leHRFbGVtZW50U2libGluZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG4gPSB0aGlzLm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG4gJiYgbi5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUpXHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IG4ubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSgpKTtcclxuXHJcbiAgICAvLyBFbGVtZW50Lm1hdGNoZXNcclxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0FQSS9FbGVtZW50L21hdGNoZXNcclxuICAgIC8vIE5lZWRlZCBmb3I6IElFLCBGaXJlZm94IDMuNiwgZWFybHkgV2Via2l0IGFuZCBPcGVyYSAxNS4wXHJcbiAgICAvLyBVc2UgbXNNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpIGZvciBJRVxyXG4gICAgLy8gVXNlIG9NYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpIGZvciBPcGVyYSAxNS4wXHJcbiAgICAvLyBVc2UgbW96TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKSBmb3IgRmlyZWZveCAzLjZcclxuICAgIC8vIFVzZSB3ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpIGZvciBlYXJseSBXZWJraXRcclxuICAgIC8vIFVzZSBwb2x5ZmlsbCBpZiBubyBtYXRjaGVzKCkgc3VwcG9ydCwgYnV0IHF1ZXJ5U2VsZWN0b3JBbGwoKSBzdXBwb3J0XHJcbiAgICBpZiAoJ0VsZW1lbnQnIGluIGdsb2JhbCAmJiAhRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xyXG4gICAgICAgIGlmIChFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3I7XHJcbiAgICAgICAgfSBlbHNlIGlmIChFbGVtZW50LnByb3RvdHlwZS5vTWF0Y2hlc1NlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSBFbGVtZW50LnByb3RvdHlwZS5vTWF0Y2hlc1NlbGVjdG9yO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoRWxlbWVudC5wcm90b3R5cGUubW96TWF0Y2hlc1NlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSBFbGVtZW50LnByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3I7XHJcbiAgICAgICAgfSBlbHNlIGlmIChFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcclxuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwpIHtcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IGZ1bmN0aW9uIG1hdGNoZXMoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gKHRoaXMuZG9jdW1lbnQgfHwgdGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSxcclxuICAgICAgICAgICAgICAgICAgICBpID0gbWF0Y2hlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoLS1pID49IDAgJiYgbWF0Y2hlcy5pdGVtKGkpICE9PSB0aGlzKSB7fVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgPiAtMTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRWxlbWVudC5jbG9zZXN0XHJcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9jbG9zZXN0XHJcbiAgICBpZiAod2luZG93LkVsZW1lbnQgJiYgIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcclxuICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2hlcyA9ICh0aGlzLmRvY3VtZW50IHx8IHRoaXMub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzKSxcclxuICAgICAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgICAgICBlbCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIGkgPSBtYXRjaGVzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHdoaWxlICgtLWkgPj0gMCAmJiBtYXRjaGVzLml0ZW0oaSkgIT09IGVsKSB7fTtcclxuICAgICAgICAgICAgfSB3aGlsZSAoKGkgPCAwKSAmJiAoZWwgPSBlbC5wYXJlbnRFbGVtZW50KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1peGluKG8sIHBzKSB7XHJcbiAgICAgICAgaWYgKCFvKSByZXR1cm47XHJcbiAgICAgICAgT2JqZWN0LmtleXMocHMpLmZvckVhY2goZnVuY3Rpb24ocCkge1xyXG4gICAgICAgICAgICBpZiAoKHAgaW4gbykgfHwgKHAgaW4gby5wcm90b3R5cGUpKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoXHJcbiAgICAgICAgICAgICAgICAgICAgby5wcm90b3R5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgcCxcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHBzLCBwKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRocm93cyBpbiBJRTg7IGp1c3QgY29weSBpdFxyXG4gICAgICAgICAgICAgICAgb1twXSA9IHBzW3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWl4aW4gUGFyZW50Tm9kZVxyXG4gICAgLy8gaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNpbnRlcmZhY2UtcGFyZW50bm9kZVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbnZlcnROb2Rlc0ludG9BTm9kZShub2Rlcykge1xyXG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcclxuICAgICAgICBub2RlcyA9IG5vZGVzLm1hcChmdW5jdGlvbihub2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhKG5vZGUgaW5zdGFuY2VvZiBOb2RlKSA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpIDogbm9kZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAobm9kZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2Rlc1swXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG4pIHsgbm9kZS5hcHBlbmRDaGlsZChuKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBQYXJlbnROb2RlID0ge1xyXG4gICAgICAgIHByZXBlbmQ6IGZ1bmN0aW9uKC8qLi4ubm9kZXMqLykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIG5vZGVzID0gY29udmVydE5vZGVzSW50b0FOb2RlKG5vZGVzKTtcclxuICAgICAgICAgICAgdGhpcy5pbnNlcnRCZWZvcmUobm9kZXMsIHRoaXMuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhcHBlbmQ6IGZ1bmN0aW9uKC8qLi4ubm9kZXMqLykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIG5vZGVzID0gY29udmVydE5vZGVzSW50b0FOb2RlKG5vZGVzKTtcclxuICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChub2Rlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBtaXhpbihnbG9iYWwuRG9jdW1lbnQgfHwgZ2xvYmFsLkhUTUxEb2N1bWVudCwgUGFyZW50Tm9kZSk7IC8vIEhUTUxEb2N1bWVudCBmb3IgSUU4XHJcbiAgICBtaXhpbihnbG9iYWwuRG9jdW1lbnRGcmFnbWVudCwgUGFyZW50Tm9kZSk7XHJcbiAgICBtaXhpbihnbG9iYWwuRWxlbWVudCwgUGFyZW50Tm9kZSk7XHJcblxyXG4gICAgLy8gTWl4aW4gQ2hpbGROb2RlXHJcbiAgICAvLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2ludGVyZmFjZS1jaGlsZG5vZGVcclxuXHJcbiAgICB2YXIgQ2hpbGROb2RlID0ge1xyXG4gICAgICAgIGJlZm9yZTogZnVuY3Rpb24oLyouLi5ub2RlcyovKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgaWYgKCFwYXJlbnQpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIHZpYWJsZVByZXZpb3VzU2libGluZyA9IHRoaXMucHJldmlvdXNTaWJsaW5nO1xyXG4gICAgICAgICAgICB3aGlsZSAobm9kZXMuaW5kZXhPZih2aWFibGVQcmV2aW91c1NpYmxpbmcpICE9PSAtMSlcclxuICAgICAgICAgICAgICAgIHZpYWJsZVByZXZpb3VzU2libGluZyA9IHZpYWJsZVByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmc7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY29udmVydE5vZGVzSW50b0FOb2RlKG5vZGVzKTtcclxuICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShub2RlLCB2aWFibGVQcmV2aW91c1NpYmxpbmcgP1xyXG4gICAgICAgICAgICAgICAgdmlhYmxlUHJldmlvdXNTaWJsaW5nLm5leHRTaWJsaW5nIDogcGFyZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWZ0ZXI6IGZ1bmN0aW9uKC8qLi4ubm9kZXMqLykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIGlmICghcGFyZW50KSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciB2aWFibGVOZXh0U2libGluZyA9IHRoaXMubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgICAgIHdoaWxlIChub2Rlcy5pbmRleE9mKHZpYWJsZU5leHRTaWJsaW5nKSAhPT0gLTEpXHJcbiAgICAgICAgICAgICAgICB2aWFibGVOZXh0U2libGluZyA9IHZpYWJsZU5leHRTaWJsaW5nLm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNvbnZlcnROb2Rlc0ludG9BTm9kZShub2Rlcyk7XHJcbiAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgdmlhYmxlTmV4dFNpYmxpbmcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVwbGFjZVdpdGg6IGZ1bmN0aW9uKC8qLi4ubm9kZXMqLykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIGlmICghcGFyZW50KSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciB2aWFibGVOZXh0U2libGluZyA9IHRoaXMubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgICAgIHdoaWxlIChub2Rlcy5pbmRleE9mKHZpYWJsZU5leHRTaWJsaW5nKSAhPT0gLTEpXHJcbiAgICAgICAgICAgICAgICB2aWFibGVOZXh0U2libGluZyA9IHZpYWJsZU5leHRTaWJsaW5nLm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNvbnZlcnROb2Rlc0ludG9BTm9kZShub2Rlcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlID09PSBwYXJlbnQpXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKG5vZGUsIHRoaXMpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHZpYWJsZU5leHRTaWJsaW5nKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wYXJlbnROb2RlKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIG1peGluKGdsb2JhbC5Eb2N1bWVudFR5cGUsIENoaWxkTm9kZSk7XHJcbiAgICBtaXhpbihnbG9iYWwuRWxlbWVudCwgQ2hpbGROb2RlKTtcclxuICAgIG1peGluKGdsb2JhbC5DaGFyYWN0ZXJEYXRhLCBDaGlsZE5vZGUpO1xyXG5cclxufShzZWxmKSk7IiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbi8qKlxuICogZXh0cmFjdEV4dGVuc2lvblxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9IHBhdGggZm9yIHVybFxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxuICovXG5leHBvcnQgY29uc3QgZXh0cmFjdEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICBpZighcGF0aCB8fCBwYXRoLnN1YnN0cigwLDQpPT0ncnRtcCcpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKSB7XG4gICAgICAgIGxldCBleHRlbnNpb24gPSBcIlwiO1xuICAgICAgICBpZiAoKC9bKCxdZm9ybWF0PW1wZC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ21wZCc7XG4gICAgICAgIH1lbHNlIGlmICgoL1soLF1mb3JtYXQ9bTN1OC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ20zdTgnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbnNpb247XG4gICAgfVxuXG4gICAgbGV0IGF6dXJlZEZvcm1hdCA9IGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKTtcbiAgICBpZihhenVyZWRGb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGF6dXJlZEZvcm1hdDtcbiAgICB9XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xuICAgIGlmKHBhdGgubGFzdEluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxLCBwYXRoLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufTtcblxuXG4vKipcbiAqIG5hdHVyYWxIbXNcbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyIHwgc3RyaW5nfSAgc2Vjb25kICBUaGUgc2Vjb25kXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgZm9ybWF0dGVkIFN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbEhtcyhzZWNvbmQpIHtcbiAgICBsZXQgc2VjTnVtID0gcGFyc2VJbnQoc2Vjb25kLCAxMCk7XG4gICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xuICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjTnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuICAgIGxldCBzZWNvbmRzID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcblxuICAgIGlmIChob3VycyA+IDApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cblxuICAgIGlmIChob3VycyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH1cbn0iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjkuMVxyXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcclxuLy8gICAgIChjKSAyMDA5LTIwMTggSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcclxuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiFmdW5jdGlvbigpe3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmJiZzZWxmfHxcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsJiZnbG9iYWx8fHRoaXN8fHt9LHI9bi5fLGU9QXJyYXkucHJvdG90eXBlLG89T2JqZWN0LnByb3RvdHlwZSxzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2w/U3ltYm9sLnByb3RvdHlwZTpudWxsLHU9ZS5wdXNoLGM9ZS5zbGljZSxwPW8udG9TdHJpbmcsaT1vLmhhc093blByb3BlcnR5LHQ9QXJyYXkuaXNBcnJheSxhPU9iamVjdC5rZXlzLGw9T2JqZWN0LmNyZWF0ZSxmPWZ1bmN0aW9uKCl7fSxoPWZ1bmN0aW9uKG4pe3JldHVybiBuIGluc3RhbmNlb2YgaD9uOnRoaXMgaW5zdGFuY2VvZiBoP3ZvaWQodGhpcy5fd3JhcHBlZD1uKTpuZXcgaChuKX07XCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHN8fGV4cG9ydHMubm9kZVR5cGU/bi5fPWg6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGUmJm1vZHVsZS5leHBvcnRzJiYoZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1oKSxleHBvcnRzLl89aCksaC5WRVJTSU9OPVwiMS45LjFcIjt2YXIgdix5PWZ1bmN0aW9uKHUsaSxuKXtpZih2b2lkIDA9PT1pKXJldHVybiB1O3N3aXRjaChudWxsPT1uPzM6bil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdS5jYWxsKGksbil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLHQpe3JldHVybiB1LmNhbGwoaSxuLHIsdCl9O2Nhc2UgNDpyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHUuY2FsbChpLG4scix0LGUpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdS5hcHBseShpLGFyZ3VtZW50cyl9fSxkPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5pdGVyYXRlZSE9PXY/aC5pdGVyYXRlZShuLHIpOm51bGw9PW4/aC5pZGVudGl0eTpoLmlzRnVuY3Rpb24obik/eShuLHIsdCk6aC5pc09iamVjdChuKSYmIWguaXNBcnJheShuKT9oLm1hdGNoZXIobik6aC5wcm9wZXJ0eShuKX07aC5pdGVyYXRlZT12PWZ1bmN0aW9uKG4scil7cmV0dXJuIGQobixyLDEvMCl9O3ZhciBnPWZ1bmN0aW9uKHUsaSl7cmV0dXJuIGk9bnVsbD09aT91Lmxlbmd0aC0xOitpLGZ1bmN0aW9uKCl7Zm9yKHZhciBuPU1hdGgubWF4KGFyZ3VtZW50cy5sZW5ndGgtaSwwKSxyPUFycmF5KG4pLHQ9MDt0PG47dCsrKXJbdF09YXJndW1lbnRzW3QraV07c3dpdGNoKGkpe2Nhc2UgMDpyZXR1cm4gdS5jYWxsKHRoaXMscik7Y2FzZSAxOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0scik7Y2FzZSAyOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdLHIpfXZhciBlPUFycmF5KGkrMSk7Zm9yKHQ9MDt0PGk7dCsrKWVbdF09YXJndW1lbnRzW3RdO3JldHVybiBlW2ldPXIsdS5hcHBseSh0aGlzLGUpfX0sbT1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm57fTtpZihsKXJldHVybiBsKG4pO2YucHJvdG90eXBlPW47dmFyIHI9bmV3IGY7cmV0dXJuIGYucHJvdG90eXBlPW51bGwscn0sYj1mdW5jdGlvbihyKXtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/dm9pZCAwOm5bcl19fSxqPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGwhPW4mJmkuY2FsbChuLHIpfSx4PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXtpZihudWxsPT1uKXJldHVybjtuPW5bcltlXV19cmV0dXJuIHQ/bjp2b2lkIDB9LF89TWF0aC5wb3coMiw1MyktMSxBPWIoXCJsZW5ndGhcIiksdz1mdW5jdGlvbihuKXt2YXIgcj1BKG4pO3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiByJiYwPD1yJiZyPD1ffTtoLmVhY2g9aC5mb3JFYWNoPWZ1bmN0aW9uKG4scix0KXt2YXIgZSx1O2lmKHI9eShyLHQpLHcobikpZm9yKGU9MCx1PW4ubGVuZ3RoO2U8dTtlKyspcihuW2VdLGUsbik7ZWxzZXt2YXIgaT1oLmtleXMobik7Zm9yKGU9MCx1PWkubGVuZ3RoO2U8dTtlKyspcihuW2lbZV1dLGlbZV0sbil9cmV0dXJuIG59LGgubWFwPWguY29sbGVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9QXJyYXkodSksbz0wO288dTtvKyspe3ZhciBhPWU/ZVtvXTpvO2lbb109cihuW2FdLGEsbil9cmV0dXJuIGl9O3ZhciBPPWZ1bmN0aW9uKGMpe3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0zPD1hcmd1bWVudHMubGVuZ3RoO3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0hdyhuKSYmaC5rZXlzKG4pLGk9KHV8fG4pLmxlbmd0aCxvPTA8Yz8wOmktMTtmb3IoZXx8KHQ9blt1P3Vbb106b10sbys9Yyk7MDw9byYmbzxpO28rPWMpe3ZhciBhPXU/dVtvXTpvO3Q9cih0LG5bYV0sYSxuKX1yZXR1cm4gdH0obix5KHIsZSw0KSx0LHUpfX07aC5yZWR1Y2U9aC5mb2xkbD1oLmluamVjdD1PKDEpLGgucmVkdWNlUmlnaHQ9aC5mb2xkcj1PKC0xKSxoLmZpbmQ9aC5kZXRlY3Q9ZnVuY3Rpb24obixyLHQpe3ZhciBlPSh3KG4pP2guZmluZEluZGV4OmguZmluZEtleSkobixyLHQpO2lmKHZvaWQgMCE9PWUmJi0xIT09ZSlyZXR1cm4gbltlXX0saC5maWx0ZXI9aC5zZWxlY3Q9ZnVuY3Rpb24obixlLHIpe3ZhciB1PVtdO3JldHVybiBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7ZShuLHIsdCkmJnUucHVzaChuKX0pLHV9LGgucmVqZWN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5maWx0ZXIobixoLm5lZ2F0ZShkKHIpKSx0KX0saC5ldmVyeT1oLmFsbD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZighcihuW29dLG8sbikpcmV0dXJuITF9cmV0dXJuITB9LGguc29tZT1oLmFueT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZihyKG5bb10sbyxuKSlyZXR1cm4hMH1yZXR1cm4hMX0saC5jb250YWlucz1oLmluY2x1ZGVzPWguaW5jbHVkZT1mdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLChcIm51bWJlclwiIT10eXBlb2YgdHx8ZSkmJih0PTApLDA8PWguaW5kZXhPZihuLHIsdCl9LGguaW52b2tlPWcoZnVuY3Rpb24obix0LGUpe3ZhciB1LGk7cmV0dXJuIGguaXNGdW5jdGlvbih0KT9pPXQ6aC5pc0FycmF5KHQpJiYodT10LnNsaWNlKDAsLTEpLHQ9dFt0Lmxlbmd0aC0xXSksaC5tYXAobixmdW5jdGlvbihuKXt2YXIgcj1pO2lmKCFyKXtpZih1JiZ1Lmxlbmd0aCYmKG49eChuLHUpKSxudWxsPT1uKXJldHVybjtyPW5bdF19cmV0dXJuIG51bGw9PXI/cjpyLmFwcGx5KG4sZSl9KX0pLGgucGx1Y2s9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5tYXAobixoLnByb3BlcnR5KHIpKX0saC53aGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbHRlcihuLGgubWF0Y2hlcihyKSl9LGguZmluZFdoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmluZChuLGgubWF0Y2hlcihyKSl9LGgubWF4PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9LTEvMCxvPS0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmaTx0JiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXt1PWUobixyLHQpLChvPHV8fHU9PT0tMS8wJiZpPT09LTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLm1pbj1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPTEvMCxvPTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZ0PGkmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpeygodT1lKG4scix0KSk8b3x8dT09PTEvMCYmaT09PTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLnNodWZmbGU9ZnVuY3Rpb24obil7cmV0dXJuIGguc2FtcGxlKG4sMS8wKX0saC5zYW1wbGU9ZnVuY3Rpb24obixyLHQpe2lmKG51bGw9PXJ8fHQpcmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSxuW2gucmFuZG9tKG4ubGVuZ3RoLTEpXTt2YXIgZT13KG4pP2guY2xvbmUobik6aC52YWx1ZXMobiksdT1BKGUpO3I9TWF0aC5tYXgoTWF0aC5taW4ocix1KSwwKTtmb3IodmFyIGk9dS0xLG89MDtvPHI7bysrKXt2YXIgYT1oLnJhbmRvbShvLGkpLGM9ZVtvXTtlW29dPWVbYV0sZVthXT1jfXJldHVybiBlLnNsaWNlKDAscil9LGguc29ydEJ5PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT0wO3JldHVybiBlPWQoZSxyKSxoLnBsdWNrKGgubWFwKG4sZnVuY3Rpb24obixyLHQpe3JldHVybnt2YWx1ZTpuLGluZGV4OnUrKyxjcml0ZXJpYTplKG4scix0KX19KS5zb3J0KGZ1bmN0aW9uKG4scil7dmFyIHQ9bi5jcml0ZXJpYSxlPXIuY3JpdGVyaWE7aWYodCE9PWUpe2lmKGU8dHx8dm9pZCAwPT09dClyZXR1cm4gMTtpZih0PGV8fHZvaWQgMD09PWUpcmV0dXJuLTF9cmV0dXJuIG4uaW5kZXgtci5pbmRleH0pLFwidmFsdWVcIil9O3ZhciBrPWZ1bmN0aW9uKG8scil7cmV0dXJuIGZ1bmN0aW9uKGUsdSxuKXt2YXIgaT1yP1tbXSxbXV06e307cmV0dXJuIHU9ZCh1LG4pLGguZWFjaChlLGZ1bmN0aW9uKG4scil7dmFyIHQ9dShuLHIsZSk7byhpLG4sdCl9KSxpfX07aC5ncm91cEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdLnB1c2gocik6blt0XT1bcl19KSxoLmluZGV4Qnk9ayhmdW5jdGlvbihuLHIsdCl7blt0XT1yfSksaC5jb3VudEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdKys6blt0XT0xfSk7dmFyIFM9L1teXFx1ZDgwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkYmZmXVtcXHVkYzAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRmZmZdL2c7aC50b0FycmF5PWZ1bmN0aW9uKG4pe3JldHVybiBuP2guaXNBcnJheShuKT9jLmNhbGwobik6aC5pc1N0cmluZyhuKT9uLm1hdGNoKFMpOncobik/aC5tYXAobixoLmlkZW50aXR5KTpoLnZhbHVlcyhuKTpbXX0saC5zaXplPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPzA6dyhuKT9uLmxlbmd0aDpoLmtleXMobikubGVuZ3RofSxoLnBhcnRpdGlvbj1rKGZ1bmN0aW9uKG4scix0KXtuW3Q/MDoxXS5wdXNoKHIpfSwhMCksaC5maXJzdD1oLmhlYWQ9aC50YWtlPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bMF06aC5pbml0aWFsKG4sbi5sZW5ndGgtcil9LGguaW5pdGlhbD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLDAsTWF0aC5tYXgoMCxuLmxlbmd0aC0obnVsbD09cnx8dD8xOnIpKSl9LGgubGFzdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uW24ubGVuZ3RoLTFdOmgucmVzdChuLE1hdGgubWF4KDAsbi5sZW5ndGgtcikpfSxoLnJlc3Q9aC50YWlsPWguZHJvcD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLG51bGw9PXJ8fHQ/MTpyKX0saC5jb21wYWN0PWZ1bmN0aW9uKG4pe3JldHVybiBoLmZpbHRlcihuLEJvb2xlYW4pfTt2YXIgTT1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KGU9ZXx8W10pLmxlbmd0aCxpPTAsbz1BKG4pO2k8bztpKyspe3ZhciBhPW5baV07aWYodyhhKSYmKGguaXNBcnJheShhKXx8aC5pc0FyZ3VtZW50cyhhKSkpaWYocilmb3IodmFyIGM9MCxsPWEubGVuZ3RoO2M8bDspZVt1KytdPWFbYysrXTtlbHNlIE0oYSxyLHQsZSksdT1lLmxlbmd0aDtlbHNlIHR8fChlW3UrK109YSl9cmV0dXJuIGV9O2guZmxhdHRlbj1mdW5jdGlvbihuLHIpe3JldHVybiBNKG4sciwhMSl9LGgud2l0aG91dD1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIGguZGlmZmVyZW5jZShuLHIpfSksaC51bmlxPWgudW5pcXVlPWZ1bmN0aW9uKG4scix0LGUpe2guaXNCb29sZWFuKHIpfHwoZT10LHQ9cixyPSExKSxudWxsIT10JiYodD1kKHQsZSkpO2Zvcih2YXIgdT1bXSxpPVtdLG89MCxhPUEobik7bzxhO28rKyl7dmFyIGM9bltvXSxsPXQ/dChjLG8sbik6YztyJiYhdD8obyYmaT09PWx8fHUucHVzaChjKSxpPWwpOnQ/aC5jb250YWlucyhpLGwpfHwoaS5wdXNoKGwpLHUucHVzaChjKSk6aC5jb250YWlucyh1LGMpfHx1LnB1c2goYyl9cmV0dXJuIHV9LGgudW5pb249ZyhmdW5jdGlvbihuKXtyZXR1cm4gaC51bmlxKE0obiwhMCwhMCkpfSksaC5pbnRlcnNlY3Rpb249ZnVuY3Rpb24obil7Zm9yKHZhciByPVtdLHQ9YXJndW1lbnRzLmxlbmd0aCxlPTAsdT1BKG4pO2U8dTtlKyspe3ZhciBpPW5bZV07aWYoIWguY29udGFpbnMocixpKSl7dmFyIG87Zm9yKG89MTtvPHQmJmguY29udGFpbnMoYXJndW1lbnRzW29dLGkpO28rKyk7bz09PXQmJnIucHVzaChpKX19cmV0dXJuIHJ9LGguZGlmZmVyZW5jZT1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIHI9TShyLCEwLCEwKSxoLmZpbHRlcihuLGZ1bmN0aW9uKG4pe3JldHVybiFoLmNvbnRhaW5zKHIsbil9KX0pLGgudW56aXA9ZnVuY3Rpb24obil7Zm9yKHZhciByPW4mJmgubWF4KG4sQSkubGVuZ3RofHwwLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1oLnBsdWNrKG4sZSk7cmV0dXJuIHR9LGguemlwPWcoaC51bnppcCksaC5vYmplY3Q9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9e30sZT0wLHU9QShuKTtlPHU7ZSsrKXI/dFtuW2VdXT1yW2VdOnRbbltlXVswXV09bltlXVsxXTtyZXR1cm4gdH07dmFyIEY9ZnVuY3Rpb24oaSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9QShuKSx1PTA8aT8wOmUtMTswPD11JiZ1PGU7dSs9aSlpZihyKG5bdV0sdSxuKSlyZXR1cm4gdTtyZXR1cm4tMX19O2guZmluZEluZGV4PUYoMSksaC5maW5kTGFzdEluZGV4PUYoLTEpLGguc29ydGVkSW5kZXg9ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PSh0PWQodCxlLDEpKShyKSxpPTAsbz1BKG4pO2k8bzspe3ZhciBhPU1hdGguZmxvb3IoKGkrbykvMik7dChuW2FdKTx1P2k9YSsxOm89YX1yZXR1cm4gaX07dmFyIEU9ZnVuY3Rpb24oaSxvLGEpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7dmFyIGU9MCx1PUEobik7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpMDxpP2U9MDw9dD90Ok1hdGgubWF4KHQrdSxlKTp1PTA8PXQ/TWF0aC5taW4odCsxLHUpOnQrdSsxO2Vsc2UgaWYoYSYmdCYmdSlyZXR1cm4gblt0PWEobixyKV09PT1yP3Q6LTE7aWYociE9cilyZXR1cm4gMDw9KHQ9byhjLmNhbGwobixlLHUpLGguaXNOYU4pKT90K2U6LTE7Zm9yKHQ9MDxpP2U6dS0xOzA8PXQmJnQ8dTt0Kz1pKWlmKG5bdF09PT1yKXJldHVybiB0O3JldHVybi0xfX07aC5pbmRleE9mPUUoMSxoLmZpbmRJbmRleCxoLnNvcnRlZEluZGV4KSxoLmxhc3RJbmRleE9mPUUoLTEsaC5maW5kTGFzdEluZGV4KSxoLnJhbmdlPWZ1bmN0aW9uKG4scix0KXtudWxsPT1yJiYocj1ufHwwLG49MCksdHx8KHQ9cjxuPy0xOjEpO2Zvcih2YXIgZT1NYXRoLm1heChNYXRoLmNlaWwoKHItbikvdCksMCksdT1BcnJheShlKSxpPTA7aTxlO2krKyxuKz10KXVbaV09bjtyZXR1cm4gdX0saC5jaHVuaz1mdW5jdGlvbihuLHIpe2lmKG51bGw9PXJ8fHI8MSlyZXR1cm5bXTtmb3IodmFyIHQ9W10sZT0wLHU9bi5sZW5ndGg7ZTx1Oyl0LnB1c2goYy5jYWxsKG4sZSxlKz1yKSk7cmV0dXJuIHR9O3ZhciBOPWZ1bmN0aW9uKG4scix0LGUsdSl7aWYoIShlIGluc3RhbmNlb2YgcikpcmV0dXJuIG4uYXBwbHkodCx1KTt2YXIgaT1tKG4ucHJvdG90eXBlKSxvPW4uYXBwbHkoaSx1KTtyZXR1cm4gaC5pc09iamVjdChvKT9vOml9O2guYmluZD1nKGZ1bmN0aW9uKHIsdCxlKXtpZighaC5pc0Z1bmN0aW9uKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb25cIik7dmFyIHU9ZyhmdW5jdGlvbihuKXtyZXR1cm4gTihyLHUsdCx0aGlzLGUuY29uY2F0KG4pKX0pO3JldHVybiB1fSksaC5wYXJ0aWFsPWcoZnVuY3Rpb24odSxpKXt2YXIgbz1oLnBhcnRpYWwucGxhY2Vob2xkZXIsYT1mdW5jdGlvbigpe2Zvcih2YXIgbj0wLHI9aS5sZW5ndGgsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWlbZV09PT1vP2FyZ3VtZW50c1tuKytdOmlbZV07Zm9yKDtuPGFyZ3VtZW50cy5sZW5ndGg7KXQucHVzaChhcmd1bWVudHNbbisrXSk7cmV0dXJuIE4odSxhLHRoaXMsdGhpcyx0KX07cmV0dXJuIGF9KSwoaC5wYXJ0aWFsLnBsYWNlaG9sZGVyPWgpLmJpbmRBbGw9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PShyPU0ociwhMSwhMSkpLmxlbmd0aDtpZih0PDEpdGhyb3cgbmV3IEVycm9yKFwiYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lc1wiKTtmb3IoO3QtLTspe3ZhciBlPXJbdF07bltlXT1oLmJpbmQobltlXSxuKX19KSxoLm1lbW9pemU9ZnVuY3Rpb24oZSx1KXt2YXIgaT1mdW5jdGlvbihuKXt2YXIgcj1pLmNhY2hlLHQ9XCJcIisodT91LmFwcGx5KHRoaXMsYXJndW1lbnRzKTpuKTtyZXR1cm4gaihyLHQpfHwoclt0XT1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksclt0XX07cmV0dXJuIGkuY2FjaGU9e30saX0saC5kZWxheT1nKGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBuLmFwcGx5KG51bGwsdCl9LHIpfSksaC5kZWZlcj1oLnBhcnRpYWwoaC5kZWxheSxoLDEpLGgudGhyb3R0bGU9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYSxjLGw9MDt1fHwodT17fSk7dmFyIGY9ZnVuY3Rpb24oKXtsPSExPT09dS5sZWFkaW5nPzA6aC5ub3coKSxpPW51bGwsYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKX0sbj1mdW5jdGlvbigpe3ZhciBuPWgubm93KCk7bHx8ITEhPT11LmxlYWRpbmd8fChsPW4pO3ZhciByPWUtKG4tbCk7cmV0dXJuIG89dGhpcyxhPWFyZ3VtZW50cyxyPD0wfHxlPHI/KGkmJihjbGVhclRpbWVvdXQoaSksaT1udWxsKSxsPW4sYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKSk6aXx8ITE9PT11LnRyYWlsaW5nfHwoaT1zZXRUaW1lb3V0KGYscikpLGN9O3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxsPTAsaT1vPWE9bnVsbH0sbn0saC5kZWJvdW5jZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhPWZ1bmN0aW9uKG4scil7aT1udWxsLHImJihvPXQuYXBwbHkobixyKSl9LG49ZyhmdW5jdGlvbihuKXtpZihpJiZjbGVhclRpbWVvdXQoaSksdSl7dmFyIHI9IWk7aT1zZXRUaW1lb3V0KGEsZSksciYmKG89dC5hcHBseSh0aGlzLG4pKX1lbHNlIGk9aC5kZWxheShhLGUsdGhpcyxuKTtyZXR1cm4gb30pO3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxpPW51bGx9LG59LGgud3JhcD1mdW5jdGlvbihuLHIpe3JldHVybiBoLnBhcnRpYWwocixuKX0saC5uZWdhdGU9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5jb21wb3NlPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLGU9dC5sZW5ndGgtMTtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIG49ZSxyPXRbZV0uYXBwbHkodGhpcyxhcmd1bWVudHMpO24tLTspcj10W25dLmNhbGwodGhpcyxyKTtyZXR1cm4gcn19LGguYWZ0ZXI9ZnVuY3Rpb24obixyKXtyZXR1cm4gZnVuY3Rpb24oKXtpZigtLW48MSlyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmJlZm9yZT1mdW5jdGlvbihuLHIpe3ZhciB0O3JldHVybiBmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHQ9ci5hcHBseSh0aGlzLGFyZ3VtZW50cykpLG48PTEmJihyPW51bGwpLHR9fSxoLm9uY2U9aC5wYXJ0aWFsKGguYmVmb3JlLDIpLGgucmVzdEFyZ3VtZW50cz1nO3ZhciBJPSF7dG9TdHJpbmc6bnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoXCJ0b1N0cmluZ1wiKSxUPVtcInZhbHVlT2ZcIixcImlzUHJvdG90eXBlT2ZcIixcInRvU3RyaW5nXCIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFwiaGFzT3duUHJvcGVydHlcIixcInRvTG9jYWxlU3RyaW5nXCJdLEI9ZnVuY3Rpb24obixyKXt2YXIgdD1ULmxlbmd0aCxlPW4uY29uc3RydWN0b3IsdT1oLmlzRnVuY3Rpb24oZSkmJmUucHJvdG90eXBlfHxvLGk9XCJjb25zdHJ1Y3RvclwiO2ZvcihqKG4saSkmJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKTt0LS07KShpPVRbdF0paW4gbiYmbltpXSE9PXVbaV0mJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKX07aC5rZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO2lmKGEpcmV0dXJuIGEobik7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paihuLHQpJiZyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLmFsbEtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107dmFyIHI9W107Zm9yKHZhciB0IGluIG4pci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC52YWx1ZXM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1uW3JbdV1dO3JldHVybiBlfSxoLm1hcE9iamVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPWgua2V5cyhuKSx1PWUubGVuZ3RoLGk9e30sbz0wO288dTtvKyspe3ZhciBhPWVbb107aVthXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX0saC5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPVtyW3VdLG5bclt1XV1dO3JldHVybiBlfSxoLmludmVydD1mdW5jdGlvbihuKXtmb3IodmFyIHI9e30sdD1oLmtleXMobiksZT0wLHU9dC5sZW5ndGg7ZTx1O2UrKylyW25bdFtlXV1dPXRbZV07cmV0dXJuIHJ9LGguZnVuY3Rpb25zPWgubWV0aG9kcz1mdW5jdGlvbihuKXt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbiloLmlzRnVuY3Rpb24oblt0XSkmJnIucHVzaCh0KTtyZXR1cm4gci5zb3J0KCl9O3ZhciBSPWZ1bmN0aW9uKGMsbCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg7aWYobCYmKG49T2JqZWN0KG4pKSxyPDJ8fG51bGw9PW4pcmV0dXJuIG47Zm9yKHZhciB0PTE7dDxyO3QrKylmb3IodmFyIGU9YXJndW1lbnRzW3RdLHU9YyhlKSxpPXUubGVuZ3RoLG89MDtvPGk7bysrKXt2YXIgYT11W29dO2wmJnZvaWQgMCE9PW5bYV18fChuW2FdPWVbYV0pfXJldHVybiBufX07aC5leHRlbmQ9UihoLmFsbEtleXMpLGguZXh0ZW5kT3duPWguYXNzaWduPVIoaC5rZXlzKSxoLmZpbmRLZXk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZSx1PWgua2V5cyhuKSxpPTAsbz11Lmxlbmd0aDtpPG87aSsrKWlmKHIobltlPXVbaV1dLGUsbikpcmV0dXJuIGV9O3ZhciBxLEssej1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIHIgaW4gdH07aC5waWNrPWcoZnVuY3Rpb24obixyKXt2YXIgdD17fSxlPXJbMF07aWYobnVsbD09bilyZXR1cm4gdDtoLmlzRnVuY3Rpb24oZSk/KDE8ci5sZW5ndGgmJihlPXkoZSxyWzFdKSkscj1oLmFsbEtleXMobikpOihlPXoscj1NKHIsITEsITEpLG49T2JqZWN0KG4pKTtmb3IodmFyIHU9MCxpPXIubGVuZ3RoO3U8aTt1Kyspe3ZhciBvPXJbdV0sYT1uW29dO2UoYSxvLG4pJiYodFtvXT1hKX1yZXR1cm4gdH0pLGgub21pdD1nKGZ1bmN0aW9uKG4sdCl7dmFyIHIsZT10WzBdO3JldHVybiBoLmlzRnVuY3Rpb24oZSk/KGU9aC5uZWdhdGUoZSksMTx0Lmxlbmd0aCYmKHI9dFsxXSkpOih0PWgubWFwKE0odCwhMSwhMSksU3RyaW5nKSxlPWZ1bmN0aW9uKG4scil7cmV0dXJuIWguY29udGFpbnModCxyKX0pLGgucGljayhuLGUscil9KSxoLmRlZmF1bHRzPVIoaC5hbGxLZXlzLCEwKSxoLmNyZWF0ZT1mdW5jdGlvbihuLHIpe3ZhciB0PW0obik7cmV0dXJuIHImJmguZXh0ZW5kT3duKHQsciksdH0saC5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc09iamVjdChuKT9oLmlzQXJyYXkobik/bi5zbGljZSgpOmguZXh0ZW5kKHt9LG4pOm59LGgudGFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIHIobiksbn0saC5pc01hdGNoPWZ1bmN0aW9uKG4scil7dmFyIHQ9aC5rZXlzKHIpLGU9dC5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3IodmFyIHU9T2JqZWN0KG4pLGk9MDtpPGU7aSsrKXt2YXIgbz10W2ldO2lmKHJbb10hPT11W29dfHwhKG8gaW4gdSkpcmV0dXJuITF9cmV0dXJuITB9LHE9ZnVuY3Rpb24obixyLHQsZSl7aWYobj09PXIpcmV0dXJuIDAhPT1ufHwxL249PTEvcjtpZihudWxsPT1ufHxudWxsPT1yKXJldHVybiExO2lmKG4hPW4pcmV0dXJuIHIhPXI7dmFyIHU9dHlwZW9mIG47cmV0dXJuKFwiZnVuY3Rpb25cIj09PXV8fFwib2JqZWN0XCI9PT11fHxcIm9iamVjdFwiPT10eXBlb2YgcikmJksobixyLHQsZSl9LEs9ZnVuY3Rpb24obixyLHQsZSl7biBpbnN0YW5jZW9mIGgmJihuPW4uX3dyYXBwZWQpLHIgaW5zdGFuY2VvZiBoJiYocj1yLl93cmFwcGVkKTt2YXIgdT1wLmNhbGwobik7aWYodSE9PXAuY2FsbChyKSlyZXR1cm4hMTtzd2l0Y2godSl7Y2FzZVwiW29iamVjdCBSZWdFeHBdXCI6Y2FzZVwiW29iamVjdCBTdHJpbmddXCI6cmV0dXJuXCJcIituPT1cIlwiK3I7Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cmV0dXJuK24hPStuPytyIT0rcjowPT0rbj8xLytuPT0xL3I6K249PStyO2Nhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6cmV0dXJuK249PStyO2Nhc2VcIltvYmplY3QgU3ltYm9sXVwiOnJldHVybiBzLnZhbHVlT2YuY2FsbChuKT09PXMudmFsdWVPZi5jYWxsKHIpfXZhciBpPVwiW29iamVjdCBBcnJheV1cIj09PXU7aWYoIWkpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBufHxcIm9iamVjdFwiIT10eXBlb2YgcilyZXR1cm4hMTt2YXIgbz1uLmNvbnN0cnVjdG9yLGE9ci5jb25zdHJ1Y3RvcjtpZihvIT09YSYmIShoLmlzRnVuY3Rpb24obykmJm8gaW5zdGFuY2VvZiBvJiZoLmlzRnVuY3Rpb24oYSkmJmEgaW5zdGFuY2VvZiBhKSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gcilyZXR1cm4hMX1lPWV8fFtdO2Zvcih2YXIgYz0odD10fHxbXSkubGVuZ3RoO2MtLTspaWYodFtjXT09PW4pcmV0dXJuIGVbY109PT1yO2lmKHQucHVzaChuKSxlLnB1c2gociksaSl7aWYoKGM9bi5sZW5ndGgpIT09ci5sZW5ndGgpcmV0dXJuITE7Zm9yKDtjLS07KWlmKCFxKG5bY10scltjXSx0LGUpKXJldHVybiExfWVsc2V7dmFyIGwsZj1oLmtleXMobik7aWYoYz1mLmxlbmd0aCxoLmtleXMocikubGVuZ3RoIT09YylyZXR1cm4hMTtmb3IoO2MtLTspaWYobD1mW2NdLCFqKHIsbCl8fCFxKG5bbF0scltsXSx0LGUpKXJldHVybiExfXJldHVybiB0LnBvcCgpLGUucG9wKCksITB9LGguaXNFcXVhbD1mdW5jdGlvbihuLHIpe3JldHVybiBxKG4scil9LGguaXNFbXB0eT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bnx8KHcobikmJihoLmlzQXJyYXkobil8fGguaXNTdHJpbmcobil8fGguaXNBcmd1bWVudHMobikpPzA9PT1uLmxlbmd0aDowPT09aC5rZXlzKG4pLmxlbmd0aCl9LGguaXNFbGVtZW50PWZ1bmN0aW9uKG4pe3JldHVybiEoIW58fDEhPT1uLm5vZGVUeXBlKX0saC5pc0FycmF5PXR8fGZ1bmN0aW9uKG4pe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXAuY2FsbChuKX0saC5pc09iamVjdD1mdW5jdGlvbihuKXt2YXIgcj10eXBlb2YgbjtyZXR1cm5cImZ1bmN0aW9uXCI9PT1yfHxcIm9iamVjdFwiPT09ciYmISFufSxoLmVhY2goW1wiQXJndW1lbnRzXCIsXCJGdW5jdGlvblwiLFwiU3RyaW5nXCIsXCJOdW1iZXJcIixcIkRhdGVcIixcIlJlZ0V4cFwiLFwiRXJyb3JcIixcIlN5bWJvbFwiLFwiTWFwXCIsXCJXZWFrTWFwXCIsXCJTZXRcIixcIldlYWtTZXRcIl0sZnVuY3Rpb24ocil7aFtcImlzXCIrcl09ZnVuY3Rpb24obil7cmV0dXJuIHAuY2FsbChuKT09PVwiW29iamVjdCBcIityK1wiXVwifX0pLGguaXNBcmd1bWVudHMoYXJndW1lbnRzKXx8KGguaXNBcmd1bWVudHM9ZnVuY3Rpb24obil7cmV0dXJuIGoobixcImNhbGxlZVwiKX0pO3ZhciBEPW4uZG9jdW1lbnQmJm4uZG9jdW1lbnQuY2hpbGROb2RlcztcImZ1bmN0aW9uXCIhPXR5cGVvZi8uLyYmXCJvYmplY3RcIiE9dHlwZW9mIEludDhBcnJheSYmXCJmdW5jdGlvblwiIT10eXBlb2YgRCYmKGguaXNGdW5jdGlvbj1mdW5jdGlvbihuKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBufHwhMX0pLGguaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIWguaXNTeW1ib2wobikmJmlzRmluaXRlKG4pJiYhaXNOYU4ocGFyc2VGbG9hdChuKSl9LGguaXNOYU49ZnVuY3Rpb24obil7cmV0dXJuIGguaXNOdW1iZXIobikmJmlzTmFOKG4pfSxoLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4hMD09PW58fCExPT09bnx8XCJbb2JqZWN0IEJvb2xlYW5dXCI9PT1wLmNhbGwobil9LGguaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0saC5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gdm9pZCAwPT09bn0saC5oYXM9ZnVuY3Rpb24obixyKXtpZighaC5pc0FycmF5KHIpKXJldHVybiBqKG4scik7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXt2YXIgdT1yW2VdO2lmKG51bGw9PW58fCFpLmNhbGwobix1KSlyZXR1cm4hMTtuPW5bdV19cmV0dXJuISF0fSxoLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbi5fPXIsdGhpc30saC5pZGVudGl0eT1mdW5jdGlvbihuKXtyZXR1cm4gbn0saC5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LGgubm9vcD1mdW5jdGlvbigpe30saC5wcm9wZXJ0eT1mdW5jdGlvbihyKXtyZXR1cm4gaC5pc0FycmF5KHIpP2Z1bmN0aW9uKG4pe3JldHVybiB4KG4scil9OmIocil9LGgucHJvcGVydHlPZj1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbD09cj9mdW5jdGlvbigpe306ZnVuY3Rpb24obil7cmV0dXJuIGguaXNBcnJheShuKT94KHIsbik6cltuXX19LGgubWF0Y2hlcj1oLm1hdGNoZXM9ZnVuY3Rpb24ocil7cmV0dXJuIHI9aC5leHRlbmRPd24oe30sciksZnVuY3Rpb24obil7cmV0dXJuIGguaXNNYXRjaChuLHIpfX0saC50aW1lcz1mdW5jdGlvbihuLHIsdCl7dmFyIGU9QXJyYXkoTWF0aC5tYXgoMCxuKSk7cj15KHIsdCwxKTtmb3IodmFyIHU9MDt1PG47dSsrKWVbdV09cih1KTtyZXR1cm4gZX0saC5yYW5kb209ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbD09ciYmKHI9bixuPTApLG4rTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihyLW4rMSkpfSxoLm5vdz1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX07dmFyIEw9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImI3gyNztcIixcImBcIjpcIiYjeDYwO1wifSxQPWguaW52ZXJ0KEwpLFc9ZnVuY3Rpb24ocil7dmFyIHQ9ZnVuY3Rpb24obil7cmV0dXJuIHJbbl19LG49XCIoPzpcIitoLmtleXMocikuam9pbihcInxcIikrXCIpXCIsZT1SZWdFeHAobiksdT1SZWdFeHAobixcImdcIik7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBuPW51bGw9PW4/XCJcIjpcIlwiK24sZS50ZXN0KG4pP24ucmVwbGFjZSh1LHQpOm59fTtoLmVzY2FwZT1XKEwpLGgudW5lc2NhcGU9VyhQKSxoLnJlc3VsdD1mdW5jdGlvbihuLHIsdCl7aC5pc0FycmF5KHIpfHwocj1bcl0pO3ZhciBlPXIubGVuZ3RoO2lmKCFlKXJldHVybiBoLmlzRnVuY3Rpb24odCk/dC5jYWxsKG4pOnQ7Zm9yKHZhciB1PTA7dTxlO3UrKyl7dmFyIGk9bnVsbD09bj92b2lkIDA6bltyW3VdXTt2b2lkIDA9PT1pJiYoaT10LHU9ZSksbj1oLmlzRnVuY3Rpb24oaSk/aS5jYWxsKG4pOml9cmV0dXJuIG59O3ZhciBDPTA7aC51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgcj0rK0MrXCJcIjtyZXR1cm4gbj9uK3I6cn0saC50ZW1wbGF0ZVNldHRpbmdzPXtldmFsdWF0ZTovPCUoW1xcc1xcU10rPyklPi9nLGludGVycG9sYXRlOi88JT0oW1xcc1xcU10rPyklPi9nLGVzY2FwZTovPCUtKFtcXHNcXFNdKz8pJT4vZ307dmFyIEo9LyguKV4vLFU9e1wiJ1wiOlwiJ1wiLFwiXFxcXFwiOlwiXFxcXFwiLFwiXFxyXCI6XCJyXCIsXCJcXG5cIjpcIm5cIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSxWPS9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZywkPWZ1bmN0aW9uKG4pe3JldHVyblwiXFxcXFwiK1Vbbl19O2gudGVtcGxhdGU9ZnVuY3Rpb24oaSxuLHIpeyFuJiZyJiYobj1yKSxuPWguZGVmYXVsdHMoe30sbixoLnRlbXBsYXRlU2V0dGluZ3MpO3ZhciB0LGU9UmVnRXhwKFsobi5lc2NhcGV8fEopLnNvdXJjZSwobi5pbnRlcnBvbGF0ZXx8Sikuc291cmNlLChuLmV2YWx1YXRlfHxKKS5zb3VyY2VdLmpvaW4oXCJ8XCIpK1wifCRcIixcImdcIiksbz0wLGE9XCJfX3ArPSdcIjtpLnJlcGxhY2UoZSxmdW5jdGlvbihuLHIsdCxlLHUpe3JldHVybiBhKz1pLnNsaWNlKG8sdSkucmVwbGFjZShWLCQpLG89dStuLmxlbmd0aCxyP2ErPVwiJytcXG4oKF9fdD0oXCIrcitcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjp0P2ErPVwiJytcXG4oKF9fdD0oXCIrdCtcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiOmUmJihhKz1cIic7XFxuXCIrZStcIlxcbl9fcCs9J1wiKSxufSksYSs9XCInO1xcblwiLG4udmFyaWFibGV8fChhPVwid2l0aChvYmp8fHt9KXtcXG5cIithK1wifVxcblwiKSxhPVwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiK1wicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIithK1wicmV0dXJuIF9fcDtcXG5cIjt0cnl7dD1uZXcgRnVuY3Rpb24obi52YXJpYWJsZXx8XCJvYmpcIixcIl9cIixhKX1jYXRjaChuKXt0aHJvdyBuLnNvdXJjZT1hLG59dmFyIHU9ZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbCh0aGlzLG4saCl9LGM9bi52YXJpYWJsZXx8XCJvYmpcIjtyZXR1cm4gdS5zb3VyY2U9XCJmdW5jdGlvbihcIitjK1wiKXtcXG5cIithK1wifVwiLHV9LGguY2hhaW49ZnVuY3Rpb24obil7dmFyIHI9aChuKTtyZXR1cm4gci5fY2hhaW49ITAscn07dmFyIEc9ZnVuY3Rpb24obixyKXtyZXR1cm4gbi5fY2hhaW4/aChyKS5jaGFpbigpOnJ9O2gubWl4aW49ZnVuY3Rpb24odCl7cmV0dXJuIGguZWFjaChoLmZ1bmN0aW9ucyh0KSxmdW5jdGlvbihuKXt2YXIgcj1oW25dPXRbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1bdGhpcy5fd3JhcHBlZF07cmV0dXJuIHUuYXBwbHkobixhcmd1bWVudHMpLEcodGhpcyxyLmFwcGx5KGgsbikpfX0pLGh9LGgubWl4aW4oaCksaC5lYWNoKFtcInBvcFwiLFwicHVzaFwiLFwicmV2ZXJzZVwiLFwic2hpZnRcIixcInNvcnRcIixcInNwbGljZVwiLFwidW5zaGlmdFwiXSxmdW5jdGlvbihyKXt2YXIgdD1lW3JdO2gucHJvdG90eXBlW3JdPWZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fd3JhcHBlZDtyZXR1cm4gdC5hcHBseShuLGFyZ3VtZW50cyksXCJzaGlmdFwiIT09ciYmXCJzcGxpY2VcIiE9PXJ8fDAhPT1uLmxlbmd0aHx8ZGVsZXRlIG5bMF0sRyh0aGlzLG4pfX0pLGguZWFjaChbXCJjb25jYXRcIixcImpvaW5cIixcInNsaWNlXCJdLGZ1bmN0aW9uKG4pe3ZhciByPWVbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXtyZXR1cm4gRyh0aGlzLHIuYXBwbHkodGhpcy5fd3JhcHBlZCxhcmd1bWVudHMpKX19KSxoLnByb3RvdHlwZS52YWx1ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl93cmFwcGVkfSxoLnByb3RvdHlwZS52YWx1ZU9mPWgucHJvdG90eXBlLnRvSlNPTj1oLnByb3RvdHlwZS52YWx1ZSxoLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBTdHJpbmcodGhpcy5fd3JhcHBlZCl9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFwidW5kZXJzY29yZVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIGh9KX0oKTtcclxuIiwiaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9ufSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzUnRtcCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICByZXR1cm4gKGZpbGUuaW5kZXhPZigncnRtcDonKSA9PSAwIHx8IHR5cGUgPT0gJ3J0bXAnKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGlzV2ViUlRDID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIGlmKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCd3czonKSA9PT0gMCB8fCBmaWxlLmluZGV4T2YoJ3dzczonKSA9PT0gMCB8fCB0eXBlID09PSAnd2VicnRjJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc0Rhc2ggPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgcmV0dXJuICggdHlwZSA9PT0gJ21wZCcgfHwgIHR5cGUgPT09ICdkYXNoJyB8fCB0eXBlID09PSAnYXBwbGljYXRpb24vZGFzaCt4bWwnIHx8IGV4dHJhY3RFeHRlbnNpb24oZmlsZSkgPT0gJ21wZCcpO1xyXG59O1xyXG4iLCIvKipcbiAqIHV0aWxzIGZvciB3ZWJwYWNrXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldFNjcmlwdFBhdGggPSBmdW5jdGlvbihzY3JpcHROYW1lKSB7XG4gICAgY29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3JjID0gc2NyaXB0c1tpXS5zcmM7XG4gICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3JjLmxhc3RJbmRleE9mKCcvJyArIHNjcmlwdE5hbWUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cigwLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyOS4uXG4gKi9cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gX19WRVJTSU9OX187XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI2Li5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5cclxuY29uc3QgRnVsbFNjcmVlbkJ1dHRvbiA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSl7XHJcbiAgICBjb25zdCAkcm9vdCA9IExBJChcIiNcIithcGkuZ2V0Q29udGFpbmVySWQoKSk7XHJcbiAgICBsZXQgJGljb25FeHBhbmQgPSBcIlwiLCAkaWNvbkNvbXByZXNzID0gXCJcIiwgaXNGdWxsU2NyZWVuID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IGZ1bGxTY3JlZW5FdmVudFR5cGVzID0ge1xyXG4gICAgICAgIG9uZnVsbHNjcmVlbmNoYW5nZSA6IFwiZnVsbHNjcmVlbmNoYW5nZVwiLFxyXG4gICAgICAgIG9ubW96ZnVsbHNjcmVlbmNoYW5nZSA6IFwibW96ZnVsbHNjcmVlbmNoYW5nZVwiLFxyXG4gICAgICAgIG9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA6IFwid2Via2l0ZnVsbHNjcmVlbmNoYW5nZVwiLFxyXG4gICAgICAgIE1TRnVsbHNjcmVlbkNoYW5nZSA6IFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCJcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGZ1bGxTY3JlZW5DaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgbGV0IGNoZWNrRnVsbFNjcmVlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCB8fCBkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCB8fCBkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCB8fCBkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChjaGVja0Z1bGxTY3JlZW4oKSkge1xyXG4gICAgICAgICAgICAkcm9vdC5hZGRDbGFzcyhcIm92cC1mdWxsc2NyZWVuXCIpO1xyXG4gICAgICAgICAgICBpc0Z1bGxTY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAkaWNvbkV4cGFuZC5oaWRlKCk7XHJcbiAgICAgICAgICAgICRpY29uQ29tcHJlc3Muc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRyb290LnJlbW92ZUNsYXNzKFwib3ZwLWZ1bGxzY3JlZW5cIik7XHJcbiAgICAgICAgICAgIGlzRnVsbFNjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkaWNvbkV4cGFuZC5zaG93KCk7XHJcbiAgICAgICAgICAgICRpY29uQ29tcHJlc3MuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IHJlcXVlc3RGdWxsU2NyZWVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkcm9vdC5nZXQoKS5yZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICAkcm9vdC5nZXQoKS5yZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoJHJvb3QuZ2V0KCkud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgJHJvb3QuZ2V0KCkud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCRyb290LmdldCgpLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgICRyb290LmdldCgpLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgkcm9vdC5nZXQoKS5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgICRyb290LmdldCgpLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPKHJvY2spOiB3YXJuIG5vdCBzdXBwb3J0ZWRcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgbGV0IGV4aXRGdWxsU2NyZWVuID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8ocm9jayk6IHdhcm4gbm90IHN1cHBvcnRlZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCB0b2dnbGVGdWxsU2NyZWVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghaXNGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXhpdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICRpY29uRXhwYW5kID0gJGN1cnJlbnQuZmluZCgnLm92cC1mdWxsc2NyZWVuLWJ1dHRvbi1leHBhbmRpY29uJyk7XHJcbiAgICAgICAgJGljb25Db21wcmVzcyA9ICRjdXJyZW50LmZpbmQoJy5vdnAtZnVsbHNjcmVlbi1idXR0b24tY29tcHJlc3NpY29uJyk7XHJcblxyXG4gICAgICAgIC8vQmluZCBHbG9iYWwoZG9jdW1lbnQpIEV2ZW50XHJcbiAgICAgICAgT2JqZWN0LmtleXMoZnVsbFNjcmVlbkV2ZW50VHlwZXMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICAgICAgLy9EaWZmZXJlbmNlIGJldHdlZW4gdW5kZWZpbmVkIGFuZCBudWxsLlxyXG4gICAgICAgICAgICAvL3VuZGVmaW5lZCBpcyBub3Qgc3VwcG9ydC4gbnVsbCBpcyBzdXBwb3J0IGJ1dCBub3QgaW5pdGVkLlxyXG4gICAgICAgICAgICBpZihkb2N1bWVudFtldmVudE5hbWVdID09PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZnVsbFNjcmVlbkV2ZW50VHlwZXNbZXZlbnROYW1lXSwgZnVsbFNjcmVlbkNoYW5nZWRDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvL1VuYmluZCBHbG9iYWwoZG9jdW1lbnQpIEV2ZW50XHJcbiAgICAgICAgT2JqZWN0LmtleXMoZnVsbFNjcmVlbkV2ZW50VHlwZXMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnRbZXZlbnROYW1lXSA9PT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGZ1bGxTY3JlZW5FdmVudFR5cGVzW2V2ZW50TmFtZV0sIGZ1bGxTY3JlZW5DaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuICAgICAgICBcImNsaWNrIC5vdnAtZnVsbHNjcmVlbi1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0b2dnbGVGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiRnVsbFNjcmVlbkJ1dHRvblwiLCBudWxsLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRnVsbFNjcmVlbkJ1dHRvbjtcclxuIiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cIm92cC1idXR0b24gb3ZwLWZ1bGxzY3JlZW4tYnV0dG9uXCI+JyArXHJcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm92cC1mdWxsc2NyZWVuLWJ1dHRvbi1leHBhbmRpY29uXCI+PC9pPicgK1xyXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtZnVsbHNjcmVlbi1idXR0b24tY29tcHJlc3NpY29uXCI+PC9pPicgK1xyXG4gICAgICAgICc8L2J1dHRvbj4nXHJcbiAgICApO1xyXG59O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIwLi5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuaW1wb3J0IFBsYXlCdXR0b24gZnJvbSAndmlldy9jb250cm9scy9wbGF5QnV0dG9uJztcclxuaW1wb3J0IFZvbHVtZUJ1dHRvbiBmcm9tICd2aWV3L2NvbnRyb2xzL3ZvbHVtZUJ1dHRvbic7XHJcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICd2aWV3L2NvbnRyb2xzL3Byb2dyZXNzQmFyJztcclxuaW1wb3J0IFRpbWVEaXNwbGF5IGZyb20gJ3ZpZXcvY29udHJvbHMvdGltZURpc3BsYXknO1xyXG5pbXBvcnQgRnVsbFNjcmVlbkJ1dHRvbiBmcm9tICd2aWV3L2NvbnRyb2xzL2Z1bGxTY3JlZW5CdXR0b24nO1xyXG5pbXBvcnQgU2V0dGluZ1BhbmVsIGZyb20gJ3ZpZXcvY29udHJvbHMvc2V0dGluZ1BhbmVsJztcclxuaW1wb3J0IFNldHRpbmdQYW5lbExpc3QgZnJvbSAndmlldy9nbG9iYWwvU2V0dGluZ1BhbmVsTGlzdCc7XHJcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgUkVBRFksXHJcbiAgICBDT05URU5UX01FVEEsXHJcbiAgICBQUk9WSURFUl9SVE1QLFxyXG4gICAgRVJST1JcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuY29uc3QgQ29udHJvbHMgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xyXG4gICAgbGV0IHZvbHVtZUJ1dHRvbiA9IFwiXCIsIHBsYXlCdXR0b249IFwiXCIsIHByb2dyZXNzQmFyID0gXCJcIiwgdGltZURpc3BsYXkgPSBcIlwiLCBmdWxsU2NyZWVuQnV0dG9uID0gXCJcIjtcclxuXHJcbiAgICBsZXQgZ2VuZXJhdGVNYWluUGFuZWxEYXRhID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgcGFuZWwgPSB7dGl0bGUgOiBcIlNldHRpbmdzXCIsIGlzTWFpbiA6IHRydWUsIGJvZHkgOiBbXX07XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2UgPSBhcGkuZ2V0Q3VycmVudFF1YWxpdHkoKTtcclxuICAgICAgICBpZihhcGkuZ2V0RHVyYXRpb24oKSAhPT0gSW5maW5pdHkgJiYgY3VycmVudFNvdXJjZS50eXBlICE9PSBQUk9WSURFUl9SVE1QKXtcclxuICAgICAgICAgICAgbGV0IGJvZHkgPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSA6IFwiU3BlZWRcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlIDogIGFwaS5nZXRQbGF5YmFja1JhdGUoKSA9PT0gMSA/IFwiTm9ybWFsXCIgOiBhcGkuZ2V0UGxheWJhY2tSYXRlKCksXHJcbiAgICAgICAgICAgICAgICB0eXBlIDogXCJwbGF5YmFja3JhdGVcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBwYW5lbC5ib2R5LnB1c2goYm9keSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYXBpLmdldFF1YWxpdHlMZXZlbHMoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UXVhbGl0eSA9IGFwaS5nZXRDdXJyZW50UXVhbGl0eSgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGJvZHkgPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSA6IFwiU291cmNlXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA6IGN1cnJlbnRRdWFsaXR5ID8gY3VycmVudFF1YWxpdHkubGFiZWwgOiBcIkRlZmF1bHRcIixcclxuICAgICAgICAgICAgICAgIHR5cGUgOiBcInF1YWxpdHlsZXZlbFwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwYW5lbC5ib2R5LnB1c2goYm9keSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYW5lbDtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcblxyXG4gICAgICAgIGxldCBpbml0VGltZURpc3BsYXkgPSBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgaWYodGltZURpc3BsYXkpe1xyXG4gICAgICAgICAgICAgICAgdGltZURpc3BsYXkuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRpbWVEaXNwbGF5ID0gVGltZURpc3BsYXkoJGN1cnJlbnQuZmluZChcIi5vdnAtbGVmdC1jb250cm9sc1wiKSwgYXBpLCBkYXRhKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBpbml0UHJvZ3Jlc3NCYXIgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZihwcm9ncmVzc0Jhcil7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0Jhci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIgPSBQcm9ncmVzc0JhcigkY3VycmVudC5maW5kKFwiLm92cC1wcm9ncmVzc2Jhci1jb250YWluZXJcIiksIGFwaSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcGxheUJ1dHRvbiA9IFBsYXlCdXR0b24oJGN1cnJlbnQuZmluZChcIi5vdnAtbGVmdC1jb250cm9sc1wiKSwgYXBpKTtcclxuICAgICAgICB2b2x1bWVCdXR0b24gPSBWb2x1bWVCdXR0b24oJGN1cnJlbnQuZmluZChcIi5vdnAtbGVmdC1jb250cm9sc1wiKSwgYXBpKTtcclxuICAgICAgICBmdWxsU2NyZWVuQnV0dG9uID0gRnVsbFNjcmVlbkJ1dHRvbigkY3VycmVudC5maW5kKFwiLm92cC1yaWdodC1jb250cm9sc1wiKSwgYXBpKTtcclxuXHJcblxyXG4gICAgICAgIGFwaS5vbihDT05URU5UX01FVEEsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaW5pdFRpbWVEaXNwbGF5KGRhdGEpO1xyXG4gICAgICAgICAgICBpZihkYXRhLmR1cmF0aW9uID09PSBJbmZpbml0eSl7XHJcbiAgICAgICAgICAgICAgICAvL2xpdmVcclxuICAgICAgICAgICAgICAgIGlmKHByb2dyZXNzQmFyKXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0Jhci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy92b2RcclxuICAgICAgICAgICAgICAgIGluaXRQcm9ncmVzc0JhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXBpLm9uKEVSUk9SLCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vRG8gbm90aGluZy5cclxuICAgIH07XHJcbiAgICBjb25zdCBldmVudHMgPSB7XHJcbiAgICAgICAgXCJtb3VzZWxlYXZlIC5vdnAtY29udHJvbHNcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgdm9sdW1lQnV0dG9uLnNldE1vdXNlRG93bihmYWxzZSk7XHJcbiAgICAgICAgICAgICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjbGljayAub3ZwLXNldHRpbmctYnV0dG9uXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vdG9nZ2xlXHJcbiAgICAgICAgICAgIGlmKFNldHRpbmdQYW5lbExpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAvL2NsZWFyIGFsbCBTZXR0aW5nUGFuZWxUZW1wbGF0ZVxyXG4gICAgICAgICAgICAgICAgXy5lYWNoKFNldHRpbmdQYW5lbExpc3QsIGZ1bmN0aW9uKHNldHRpbmdQYW5lbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ1BhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgU2V0dGluZ1BhbmVsTGlzdC5zcGxpY2UoMCwgU2V0dGluZ1BhbmVsTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIFNldHRpbmdQYW5lbExpc3QucHVzaChTZXR0aW5nUGFuZWwoJGN1cnJlbnQsIGFwaSwgZ2VuZXJhdGVNYWluUGFuZWxEYXRhKCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuXHJcblxyXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIkNvbnRyb2xzXCIsICBudWxsICwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9scztcclxuIiwiXHJcbmNvbnN0IENvbnRyb2xzID0gZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIm92cC1jb250cm9scy1jb250YWluZXJcIj4nK1xyXG4gICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1ncmFkaWVudC1ib3R0b21cIj48L2Rpdj4nICtcclxuICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtYm90dG9tLXBhbmVsXCI+JyArXHJcbiAgICAgICAgICcgICAgPGRpdiBjbGFzcz1cIm92cC1wcm9ncmVzc2Jhci1jb250YWluZXJcIj4nICtcclxuICAgICAgICAgJyAgICA8L2Rpdj4nICtcclxuICAgICAgICAgJyAgICA8ZGl2IGNsYXNzPVwib3ZwLWNvbnRyb2xzXCI+JyArXHJcbiAgICAgICAgICcgICAgICAgIDxkaXYgY2xhc3M9XCJvdnAtbGVmdC1jb250cm9sc1wiPicgK1xyXG4gICAgICAgICAnICAgICAgICA8L2Rpdj4nICtcclxuICAgICAgICAgJyAgICAgICAgPGRpdiBjbGFzcz1cIm92cC1yaWdodC1jb250cm9sc1wiPicgK1xyXG4gICAgICAgICAnICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm92cC1idXR0b24gb3ZwLXNldHRpbmctYnV0dG9uXCI+PGkgY2xhc3M9XCJvdnAtc2V0dGluZy1idXR0b24taWNvblwiPjwvaT48L2J1dHRvbj4nICtcclxuICAgICAgICAgJyAgICAgICAgPC9kaXY+JyArXHJcbiAgICAgICAgICcgICAgPC9kaXY+JyArXHJcbiAgICAgICAgICc8L2Rpdj4nO1xyXG4gICAgJzwvZGl2Pic7XHJcblxyXG59O1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9scztcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjQuLlxyXG4gKi9cclxuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xyXG5pbXBvcnQge1xyXG4gICAgRVJST1IsXHJcbiAgICBTVEFURV9JRExFLFxyXG4gICAgU1RBVEVfUExBWUlORyxcclxuICAgIFNUQVRFX1NUQUxMRUQsXHJcbiAgICBTVEFURV9MT0FESU5HLFxyXG4gICAgU1RBVEVfQ09NUExFVEUsXHJcbiAgICBTVEFURV9QQVVTRUQsXHJcbiAgICBTVEFURV9FUlJPUixcclxuICAgIFBMQVlFUl9TVEFURVxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCBQbGF5QnV0dG9uID0gZnVuY3Rpb24gKCRjb250YWluZXIsIGFwaSkge1xyXG4gICAgbGV0ICRpY29uUGxheSA9IFwiXCIsXHJcbiAgICAgICAgJGljb25QYXVzZSA9IFwiXCIsXHJcbiAgICAgICAgJGljb25SZXBsYXkgPSBcIlwiO1xyXG5cclxuXHJcbiAgICBsZXQgc2V0QnV0dG9uU3RhdGUgPSBmdW5jdGlvbihzdGF0ZSl7XHJcbiAgICAgICAgJGljb25QbGF5LmhpZGUoKTtcclxuICAgICAgICAkaWNvblBhdXNlLmhpZGUoKTtcclxuICAgICAgICAkaWNvblJlcGxheS5oaWRlKCk7XHJcblxyXG4gICAgICAgIGlmKHN0YXRlID09PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgJGljb25QYXVzZS5zaG93KCk7XHJcbiAgICAgICAgfWVsc2UgaWYoc3RhdGUgPT09IFNUQVRFX1BBVVNFRCl7XHJcbiAgICAgICAgICAgICRpY29uUGxheS5zaG93KCk7XHJcbiAgICAgICAgfWVsc2UgaWYoc3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFKXtcclxuICAgICAgICAgICAgJGljb25QbGF5LnNob3coKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGljb25QbGF5LnNob3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICRpY29uUGxheSA9ICRjdXJyZW50LmZpbmQoIFwiLm92cC1wbGF5LWJ1dHRvbi1wbGF5aWNvblwiKTtcclxuICAgICAgICAkaWNvblBhdXNlID0gJGN1cnJlbnQuZmluZChcIi5vdnAtcGxheS1idXR0b24tcGF1c2VpY29uXCIpO1xyXG4gICAgICAgICRpY29uUmVwbGF5ID0gJGN1cnJlbnQuZmluZChcIi5vdnAtcGxheS1idXR0b24tcmVwbGF5aWNvblwiKTtcclxuXHJcbiAgICAgICAgYXBpLm9uKFBMQVlFUl9TVEFURSwgZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIGlmKGRhdGEgJiYgZGF0YS5uZXdzdGF0ZSl7XHJcbiAgICAgICAgICAgICAgICBzZXRCdXR0b25TdGF0ZShkYXRhLm5ld3N0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvL0RvIG5vdGhpbmcuXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZXZlbnRzID0ge1xyXG4gICAgICAgIFwiY2xpY2sgLm92cC1wbGF5LWJ1dHRvblwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IGFwaS5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFN0YXRlID09PSBTVEFURV9JRExFKSB7XHJcbiAgICAgICAgICAgICAgICBhcGkucGxheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfUExBWUlORykge1xyXG4gICAgICAgICAgICAgICAgYXBpLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YXRlID09PSBTVEFURV9QQVVTRUQpIHtcclxuICAgICAgICAgICAgICAgIGFwaS5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YXRlID09PSBTVEFURV9DT01QTEVURSkge1xyXG4gICAgICAgICAgICAgICAgYXBpLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIlBsYXlCdXR0b25cIiwgbnVsbCwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheUJ1dHRvbjsiLCJleHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgICc8YnV0dG9uIGNsYXNzPVwib3ZwLWJ1dHRvbiBvdnAtcGxheS1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCI+JyArXHJcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm92cC1wbGF5LWJ1dHRvbi1wbGF5aWNvblwiPjwvaT4nICtcclxuICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXBsYXktYnV0dG9uLXBhdXNlaWNvblwiPjwvaT4nICtcclxuICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXBsYXktYnV0dG9uLXJlcGxheWljb25cIj48L2k+JyArXHJcbiAgICAgICAgJzwvYnV0dG9uPidcclxuICAgICk7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjQuLlxyXG4gKi9cclxuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xyXG5pbXBvcnQgU2V0dGluZ1BhbmVsTGlzdCBmcm9tICd2aWV3L2dsb2JhbC9TZXR0aW5nUGFuZWxMaXN0JztcclxuaW1wb3J0IHtuYXR1cmFsSG1zfSBmcm9tICd1dGlscy9zdHJpbmdzJ1xyXG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcbmltcG9ydCB7XHJcbiAgICBTVEFURV9JRExFLFxyXG4gICAgU1RBVEVfUExBWUlORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfUEFVU0VEXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbmNvbnN0IFByb2dyZXNzQmFyID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpKXtcclxuICAgIGNvbnN0ICRyb290ID0gTEEkKFwiI1wiK2FwaS5nZXRDb250YWluZXJJZCgpKTtcclxuICAgIGxldCBjdXJyZW50UGxheWluZ1Bvc2l0aW9uID0gMDtcclxuICAgIGxldCBjdXJyZW50UGxheWluZ1BlcmNlbnRhZ2UgPSAwO1xyXG4gICAgbGV0IGN1cnJlbnRMb2FkZWRQZXJjZW50YWdlID0gMDtcclxuXHJcbiAgICBsZXQgbW91c2VJbnNpZGUgPSBmYWxzZSwgbW91c2VEb3duID0gZmFsc2U7XHJcblxyXG4gICAgbGV0ICRwcm9ncmVzc0JhciA9IFwiXCIsXHJcbiAgICAgICAgJHByb2dyZXNzTG9hZCA9IFwiXCIsXHJcbiAgICAgICAgJHByb2dyZXNzUGxheSA9IFwiXCIsXHJcbiAgICAgICAgJHByb2dyZXNzSG92ZXIgPSBcIlwiLFxyXG4gICAgICAgICRrbm9iQ29udGFpbmVyID0gXCJcIixcclxuICAgICAgICAka25vYiA9IFwiXCIsXHJcbiAgICAgICAga25vYldpZHRoID0gMCxcclxuICAgICAgICAkdGltZSA9IFwiXCI7XHJcblxyXG5cclxuICAgIGxldCBwb3NpdGlvbkVsZW1lbnRzID0gZnVuY3Rpb24gKHBlcmNlbnRhZ2UpIHtcclxuICAgICAgICBjb25zdCBwcm9ncmVzc0JhcldpZHRoID0gJHByb2dyZXNzQmFyLndpZHRoKCk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBwcm9ncmVzc0JhcldpZHRoICogcGVyY2VudGFnZTtcclxuXHJcbiAgICAgICAgJHByb2dyZXNzUGxheS5jc3MoJ3dpZHRoJywgcG9zaXRpb24rICdweCcpO1xyXG4gICAgICAgICRwcm9ncmVzc0hvdmVyLmNzcygnbGVmdCcsIHBvc2l0aW9uKyAncHgnKTtcclxuXHJcbiAgICAgICAgY29uc3Qga25vYlBvc3Rpb24gPSAocHJvZ3Jlc3NCYXJXaWR0aCAtIGtub2JXaWR0aCkgKiBwZXJjZW50YWdlO1xyXG4gICAgICAgICRrbm9iQ29udGFpbmVyLmNzcygnbGVmdCcsIGtub2JQb3N0aW9uKyAncHgnKTtcclxuXHJcbiAgICAgICAgY3VycmVudFBsYXlpbmdQb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIGN1cnJlbnRQbGF5aW5nUGVyY2VudGFnZSA9IHBlcmNlbnRhZ2U7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBkcmF3SG92ZXJQcm9ncmVzcyA9IGZ1bmN0aW9uIChwZXJjZW50YWdlKSB7XHJcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXJXaWR0aCA9ICRwcm9ncmVzc0Jhci53aWR0aCgpO1xyXG4gICAgICAgIGNvbnN0IGhvdmVyUG9zaXRpb24gPSBwcm9ncmVzc0JhcldpZHRoICogcGVyY2VudGFnZTtcclxuXHJcbiAgICAgICAgJHByb2dyZXNzSG92ZXIuY3NzKCd3aWR0aCcsIHBlcmNlbnRhZ2UgPT0gMD8gcGVyY2VudGFnZSA6IChob3ZlclBvc2l0aW9uIC0gY3VycmVudFBsYXlpbmdQb3NpdGlvbikrICdweCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZHJhd0xvYWRQcm9ncmVzcyA9IGZ1bmN0aW9uKHBlcmNlbnRhZ2UpIHtcclxuICAgICAgICBjb25zdCBwcm9ncmVzc0JhcldpZHRoID0gJHByb2dyZXNzQmFyLndpZHRoKCk7XHJcbiAgICAgICAgY29uc3QgbG9hZFBvc2l0aW9uID0gcHJvZ3Jlc3NCYXJXaWR0aCAqIHBlcmNlbnRhZ2U7XHJcblxyXG4gICAgICAgICRwcm9ncmVzc0xvYWQuY3NzKCd3aWR0aCcsIGxvYWRQb3NpdGlvbisgJ3B4Jyk7XHJcbiAgICAgICAgY3VycmVudExvYWRlZFBlcmNlbnRhZ2UgPSBwZXJjZW50YWdlO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgY2FsY3VsYXRlUGVyY2VudGFnZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSAkcHJvZ3Jlc3NCYXIud2lkdGgoKTtcclxuICAgICAgICBjb25zdCBwcm9ncmVzc0Jhck9mZnNldFggPSAkcHJvZ3Jlc3NCYXIub2Zmc2V0KCkubGVmdDtcclxuICAgICAgICBjb25zdCBwb2ludGVyT2Zmc2V0WCA9IGV2ZW50LnBhZ2VYO1xyXG5cclxuICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gKHBvaW50ZXJPZmZzZXRYIC0gcHJvZ3Jlc3NCYXJPZmZzZXRYKSAvIHByb2dyZXNzQmFyV2lkdGg7XHJcblxyXG4gICAgICAgIGlmIChwZXJjZW50YWdlIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwZXJjZW50YWdlID4gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwZXJjZW50YWdlO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZHJhd1RpbWVJbmRpY2F0b3IgPSBmdW5jdGlvbiAocGVyY2VudGFnZSwgZXZlbnQpIHtcclxuICAgICAgIGlmKFNldHRpbmdQYW5lbExpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgJHRpbWUuaGlkZSgpO1xyXG4gICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gYXBpLmdldER1cmF0aW9uKCk7XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kID0gZHVyYXRpb24gKiBwZXJjZW50YWdlO1xyXG5cclxuICAgICAgICBjb25zdCBobXMgPSBuYXR1cmFsSG1zKHNlY29uZCk7XHJcblxyXG4gICAgICAgICR0aW1lLnRleHQoaG1zKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGltZUVsZW1XaWR0aCA9ICR0aW1lLndpZHRoKCk7XHJcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXJXaWR0aCA9ICRwcm9ncmVzc0Jhci53aWR0aCgpO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gcHJvZ3Jlc3NCYXJXaWR0aCAqIHBlcmNlbnRhZ2U7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25PZlBpeGVsID0gZXZlbnQucGFnZVggLSAkcHJvZ3Jlc3NCYXIub2Zmc2V0KCkubGVmdDtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZU1hZ25ldGljID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYocG9zaXRpb25PZlBpeGVsIDwgdGltZUVsZW1XaWR0aCAvIDIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHByb2dyZXNzQmFyV2lkdGgtcG9zaXRpb25PZlBpeGVsICA8IHRpbWVFbGVtV2lkdGggLyAyKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9ncmVzc0JhcldpZHRoIC0gdGltZUVsZW1XaWR0aDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24gLSB0aW1lRWxlbVdpZHRoIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IG1hZ25ldGljUG9zaXRpb24gPSBjYWxjdWxhdGVNYWduZXRpYygpO1xyXG4gICAgICAgICR0aW1lLmNzcygnbGVmdCcsIG1hZ25ldGljUG9zaXRpb24rIFwicHhcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBzZWVrID0gZnVuY3Rpb24gKHBlcmNlbnRhZ2UpIHtcclxuICAgICAgICBhcGkuc2VlayggKGFwaS5nZXREdXJhdGlvbigpfHwwKSAqIHBlcmNlbnRhZ2UpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICRwcm9ncmVzc0JhciA9ICRjdXJyZW50O1xyXG4gICAgICAgICRwcm9ncmVzc0xvYWQgPSAkY3VycmVudC5maW5kKFwiLm92cC1sb2FkLXByb2dyZXNzXCIpO1xyXG4gICAgICAgICRwcm9ncmVzc1BsYXkgPSAkY3VycmVudC5maW5kKFwiLm92cC1wbGF5LXByb2dyZXNzXCIpO1xyXG4gICAgICAgICRwcm9ncmVzc0hvdmVyID0gJGN1cnJlbnQuZmluZChcIi5vdnAtaG92ZXItcHJvZ3Jlc3NcIik7XHJcbiAgICAgICAgJGtub2JDb250YWluZXIgPSAkY3VycmVudC5maW5kKFwiLm92cC1wcm9ncmVzc2Jhci1rbm9iLWNvbnRhaW5lclwiKTtcclxuICAgICAgICAka25vYiA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXByb2dyZXNzYmFyLWtub2JcIik7XHJcbiAgICAgICAga25vYldpZHRoID0gJGtub2Iud2lkdGgoKTtcclxuICAgICAgICAkdGltZSA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXByb2dyZXNzYmFyLXRpbWVcIik7XHJcblxyXG4gICAgICAgIGFwaS5vbigndGltZScsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLmR1cmF0aW9uICYmIGRhdGEucG9zaXRpb24pe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25FbGVtZW50cyhkYXRhLnBvc2l0aW9uIC8gZGF0YS5kdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYXBpLm9uKCdidWZmZXJDaGFuZ2VkJywgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZihkYXRhICYmIGRhdGEuYnVmZmVyUGVyY2VudCl7XHJcbiAgICAgICAgICAgICAgICBkcmF3TG9hZFByb2dyZXNzKGRhdGEuYnVmZmVyUGVyY2VudCAvIDEwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xyXG5cclxuICAgIH07XHJcbiAgICBjb25zdCBldmVudHMgPSB7XHJcbiAgICAgICAgXCJyZXNpemUgd2luZG93XCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMoY3VycmVudFBsYXlpbmdQZXJjZW50YWdlKTtcclxuICAgICAgICAgICAgZHJhd0xvYWRQcm9ncmVzcyhjdXJyZW50TG9hZGVkUGVyY2VudGFnZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vdXNlZW50ZXIgLm92cC1wcm9ncmVzc2JhclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBtb3VzZUluc2lkZSA9IHRydWU7XHJcbiAgICAgICAgICAgICR0aW1lLnNob3coKTtcclxuICAgICAgICAgICAgJHJvb3QuYWRkQ2xhc3MoXCJvdnAtcHJvZ3Jlc3NiYXItaG92ZXJcIik7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb3VzZWxlYXZlIC5vdnAtcHJvZ3Jlc3NiYXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgbW91c2VJbnNpZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCFtb3VzZUluc2lkZSkge1xyXG4gICAgICAgICAgICAgICAgJHJvb3QucmVtb3ZlQ2xhc3MoXCJvdnAtcHJvZ3Jlc3NiYXItaG92ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAkdGltZS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZHJhd0hvdmVyUHJvZ3Jlc3MoMCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vdXNlZG93biAub3ZwLXByb2dyZXNzYmFyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbW91c2VEb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IGNhbGN1bGF0ZVBlcmNlbnRhZ2UoZXZlbnQpO1xyXG4gICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKHBlcmNlbnRhZ2UpO1xyXG4gICAgICAgICAgICBkcmF3SG92ZXJQcm9ncmVzcygwKTtcclxuICAgICAgICAgICAgc2VlayhwZXJjZW50YWdlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW91c2Vtb3ZlIC5vdnAtcHJvZ3Jlc3NiYXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFtb3VzZURvd24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBjYWxjdWxhdGVQZXJjZW50YWdlKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGRyYXdIb3ZlclByb2dyZXNzKHBlcmNlbnRhZ2UpO1xyXG4gICAgICAgICAgICAgICAgZHJhd1RpbWVJbmRpY2F0b3IocGVyY2VudGFnZSwgZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vdXNlbW92ZSBkb2N1bWVudFwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmIChtb3VzZURvd24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBjYWxjdWxhdGVQZXJjZW50YWdlKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMocGVyY2VudGFnZSk7XHJcbiAgICAgICAgICAgICAgICBkcmF3SG92ZXJQcm9ncmVzcygwKTtcclxuICAgICAgICAgICAgICAgIHNlZWsocGVyY2VudGFnZSk7XHJcbiAgICAgICAgICAgICAgICBkcmF3VGltZUluZGljYXRvcihwZXJjZW50YWdlLCBldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW91c2V1cCBkb2N1bWVudFwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZihtb3VzZURvd24pe1xyXG4gICAgICAgICAgICAgICAgbW91c2VEb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAkcm9vdC5yZW1vdmVDbGFzcyhcIm92cC1wcm9ncmVzc2Jhci1ob3ZlclwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJQcm9ncmVzc0JhclwiLCBudWxsLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjtcclxuIiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1wcm9ncmVzc2JhclwiIHRhYmluZGV4PVwiMFwiPicgK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1wcm9ncmVzc2Jhci1wYWRkaW5nXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXByb2dyZXNzLWxpc3RcIj4nICtcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWxvYWQtcHJvZ3Jlc3NcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXBsYXktcHJvZ3Jlc3Mgb3ZwLXBsYXktYmFja2dyb3VuZC1jb2xvclwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtaG92ZXItcHJvZ3Jlc3NcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1wcm9ncmVzc2Jhci1rbm9iLWNvbnRhaW5lclwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXIta25vYiBvdnAtcGxheS1iYWNrZ3JvdW5kLWNvbG9yXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXByb2dyZXNzYmFyLXRpbWVcIj4wOjAwPC9zcGFuPicgK1xyXG4gICAgICAgICc8L2Rpdj4nXHJcbiAgICApO1xyXG59O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI2Li5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuaW1wb3J0IFNldHRpbmdQYW5lbExpc3QgZnJvbSAndmlldy9nbG9iYWwvU2V0dGluZ1BhbmVsTGlzdCc7XHJcbmltcG9ydCBMQSQgZnJvbSAndXRpbHMvbGlrZUEkJztcclxuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XHJcbmNvbnN0IFBMQVlFUl9NSU5fSEVJR0hUID0gMjIwO1xyXG5jb25zdCBTZXR0aW5nUGFuZWwgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGksIGRhdGEpe1xyXG4gICAgY29uc3QgJHJvb3QgPSBMQSQoXCIjXCIrYXBpLmdldENvbnRhaW5lcklkKCkpO1xyXG5cclxuICAgIGxldCBleHRyYWN0UGFuZWxEYXRhID0gZnVuY3Rpb24ocGFuZWxUeXBlKXtcclxuICAgICAgICBsZXQgcGFuZWwgPSB7dGl0bGUgOiBcIlwiLCBib2R5IDogW10sIHR5cGUgOiBwYW5lbFR5cGV9O1xyXG5cclxuICAgICAgICBpZihwYW5lbFR5cGUgPT09IFwicGxheWJhY2tyYXRlXCIpe1xyXG4gICAgICAgICAgICBwYW5lbC50aXRsZSA9IFwiU3BlZWRcIjtcclxuICAgICAgICAgICAgbGV0IHBsYXlCYWNrUmF0ZXMgPSBhcGkuZ2V0Q29uZmlnKCkucGxheWJhY2tSYXRlcztcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRQbGF5YmFja1JhdGUgPSBhcGkuZ2V0UGxheWJhY2tSYXRlKCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheUJhY2tSYXRlcy5sZW5ndGg7IGkgKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBib2R5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlIDogKHBsYXlCYWNrUmF0ZXNbaV0gPT09IDE/IFwiTm9ybWFsXCIgOiBwbGF5QmFja1JhdGVzW2ldKSxcclxuICAgICAgICAgICAgICAgICAgICBpc0NoZWNrIDogY3VycmVudFBsYXliYWNrUmF0ZSA9PT0gcGxheUJhY2tSYXRlc1tpXSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IHBsYXlCYWNrUmF0ZXNbaV1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBwYW5lbC5ib2R5LnB1c2goYm9keSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfWVsc2UgaWYocGFuZWxUeXBlID09PSBcInF1YWxpdHlsZXZlbFwiKXtcclxuICAgICAgICAgICAgcGFuZWwudGl0bGUgPSBcIlNvdXJjZVwiO1xyXG5cclxuICAgICAgICAgICAgbGV0IHF1YWxpdHlMZXZlbHMgPSBhcGkuZ2V0UXVhbGl0eUxldmVscygpO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFF1YWxpdHkgPSBhcGkuZ2V0Q3VycmVudFF1YWxpdHkoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVhbGl0eUxldmVscy5sZW5ndGg7IGkgKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBib2R5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlIDogcXVhbGl0eUxldmVsc1tpXS5sYWJlbCxcclxuICAgICAgICAgICAgICAgICAgICBpc0NoZWNrIDogY3VycmVudFF1YWxpdHkuaW5kZXggPT09IGksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiBpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcGFuZWwuYm9keS5wdXNoKGJvZHkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFuZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgIGlmKFBMQVlFUl9NSU5fSEVJR0hUID4gJHJvb3QuaGVpZ2h0KCkpe1xyXG4gICAgICAgICAgICAkcm9vdC5maW5kKFwiLm92cC1zZXR0aW5nLXBhbmVsXCIpLmNzcyhcIm1heEhlaWdodFwiLCBcIjExNHB4XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nLlxyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuICAgICAgICBcImNsaWNrIC5vdnAtc2V0dGluZy1tYWluLWl0ZW1cIjogZnVuY3Rpb24gKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbGV0IHBhbmVsVHlwZSA9IExBJChldmVudC5jdXJyZW50VGFyZ2V0KS5hdHRyKFwib3ZwLXBhbmVsLXR5cGVcIik7XHJcbiAgICAgICAgICAgIC8vcGFyZW50IG11c3QgYmUgbm90ICRjdXJyZW50IVxyXG4gICAgICAgICAgICBTZXR0aW5nUGFuZWxMaXN0LnB1c2goU2V0dGluZ1BhbmVsKCRjb250YWluZXIsIGFwaSwgZXh0cmFjdFBhbmVsRGF0YShwYW5lbFR5cGUpKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImNsaWNrIC5vdnAtc2V0dGluZy10aXRsZVwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAvL1JlbW92ZSBDdXJyZW50IFBhbmVsXHJcbiAgICAgICAgICAgIGxldCBsYXN0ID0gU2V0dGluZ1BhbmVsTGlzdC5wb3AoKTtcclxuICAgICAgICAgICAgbGFzdC5kZXN0cm95KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImNsaWNrIC5vdnAtc2V0dGluZy1pdGVtLXZhbHVlXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYW5lbFR5cGUgPSBMQSQoZXZlbnQuY3VycmVudFRhcmdldCkuYXR0cihcIm92cC1wYW5lbC10eXBlXCIpO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBMQSQoZXZlbnQuY3VycmVudFRhcmdldCkuYXR0cihcIm92cC1kYXRhLXZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYocGFuZWxUeXBlICYmIHZhbHVlKXtcclxuICAgICAgICAgICAgICAgIGlmKHBhbmVsVHlwZSA9PT0gXCJwbGF5YmFja3JhdGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBpLnNldFBsYXliYWNrUmF0ZShwYXJzZUZsb2F0KHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihwYW5lbFR5cGUgPT09IFwicXVhbGl0eWxldmVsXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFwaS5zZXRDdXJyZW50UXVhbGl0eShwYXJzZUludCh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vY2xlYXIgYWxsIFNldHRpbmdQYW5lbFRlbXBsYXRlXHJcbiAgICAgICAgICAgICAgICBfLmVhY2goU2V0dGluZ1BhbmVsTGlzdCwgZnVuY3Rpb24oc2V0dGluZ1BhbmVsKXtcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBTZXR0aW5nUGFuZWxMaXN0LnNwbGljZSgwLCBTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiU2V0dGluZ1BhbmVsXCIsIGRhdGEsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nUGFuZWw7XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoZGF0YSkgPT4ge1xyXG4gICAgbGV0IGVsZW1lbnRzID0gJzxkaXYgY2xhc3M9XCJvdnAtc2V0dGluZy1wYW5lbCAnKyhkYXRhLmlzTWFpbiA/ICdhbmltYXRlZCBmYWRlSW4nOiAnJykrJ1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1zZXR0aW5nLXRpdGxlLWNvbnRhaW5lclwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtc2V0dGluZy10aXRsZVwiIHRhYmluZGV4PVwiMFwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkYXRhLmlzTWFpbiA/ICcnIDogJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctdGl0bGUtcHJldmljb25cIj4mbHQ7PC9zcGFuPicpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtc2V0dGluZy10aXRsZS10aXRsZVwiPicrZGF0YS50aXRsZSsnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lclwiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2goZGF0YS5ib2R5LCBmdW5jdGlvbihib2R5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmlzTWFpbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzICs9IHNldHRpbmdJdGVtVGVtcGxhdGUoYm9keS50aXRsZSwgYm9keS52YWx1ZSwgYm9keS50eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgKz0gc2V0dGluZ1ZhbHVlVGVtcGxhdGUoYm9keS50aXRsZSwgYm9keS52YWx1ZSwgZGF0YS50eXBlLCBib2R5LmlzQ2hlY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgZWxlbWVudHMrPSAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XHJcbiAgICByZXR1cm4gZWxlbWVudHM7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0dGluZ0l0ZW1UZW1wbGF0ZSA9ICh0aXRsZSwgdmFsdWUsIHR5cGUpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtIG92cC1zZXR0aW5nLW1haW4taXRlbVwiIG92cC1wYW5lbC10eXBlPVwiJyt0eXBlKydcIj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbS10aXRsZVwiPicrdGl0bGUrJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbS1uZXh0aWNvblwiPiZndDs8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0tdmFsdWVcIj4nK3ZhbHVlKyc8L3NwYW4+JyArXHJcbiAgICAgICAgJzwvZGl2PidcclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0dGluZ1ZhbHVlVGVtcGxhdGUgPSAodGl0bGUsIHZhbHVlLCB0eXBlLCBpc0NoZWNrKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbSBvdnAtc2V0dGluZy1pdGVtLXZhbHVlXCIgb3ZwLXBhbmVsLXR5cGU9XCInK3R5cGUrJ1wiIG92cC1kYXRhLXZhbHVlPVwiJyt2YWx1ZSsnXCI+JyArXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0tY2hlY2tlZCAnKyhpc0NoZWNrPydvdnAtc2hvdyc6JycpKydcIj4mI3gyNzEzOzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbS10aXRsZVwiPicrdGl0bGUrJzwvc3Bhbj4nICtcclxuICAgICAgICAnPC9kaXY+J1xyXG4gICAgKTtcclxufTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNS4uXHJcbiAqL1xyXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XHJcbmltcG9ydCB7bmF0dXJhbEhtc30gZnJvbSAndXRpbHMvc3RyaW5ncyc7XHJcblxyXG5jb25zdCBUaW1lRGlzcGxheSA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSwgZGF0YSl7XHJcblxyXG4gICAgbGV0ICRwb3NpdGlvbiA9IFwiXCIsICRkdXJhdGlvbiA9IFwiXCI7XHJcbiAgICBsZXQgY29udmVydEh1bWFuaXplVGltZSA9IGZ1bmN0aW9uKHRpbWUpe1xyXG4gICAgICAgIHJldHVybiBuYXR1cmFsSG1zKHRpbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAkcG9zaXRpb24gPSAkY3VycmVudC5maW5kKCcub3ZwLXRpbWUtY3VycmVudCcpO1xyXG4gICAgICAgICRkdXJhdGlvbiA9ICRjdXJyZW50LmZpbmQoJy5vdnAtdGltZS1kdXJhdGlvbicpO1xyXG5cclxuICAgICAgICBpZihkYXRhLmR1cmF0aW9uICE9PSBJbmZpbml0eSl7XHJcblxyXG4gICAgICAgICAgICAkZHVyYXRpb24udGV4dChjb252ZXJ0SHVtYW5pemVUaW1lKGRhdGEuZHVyYXRpb24pKTtcclxuICAgICAgICAgICAgYXBpLm9uKCd0aW1lJywgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgJHBvc2l0aW9uLnRleHQoY29udmVydEh1bWFuaXplVGltZShkYXRhLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vRG8gbm90aGluZy5cclxuICAgIH07XHJcbiAgICBjb25zdCBldmVudHMgPSB7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiVGltZURpc3BsYXlcIiwgZGF0YSwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRpbWVEaXNwbGF5OyIsImV4cG9ydCBkZWZhdWx0IChkYXRhKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXRpbWUtZGlzcGxheVwiPicrXHJcbiAgICAgICAgICAgIChkYXRhLmR1cmF0aW9uID09PSBJbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgP1xyXG4gICAgICAgICAgICAgICAgKCc8YnV0dG9uIGNsYXNzPVwib3ZwLWxpdmUtYmFkZ2Ugb3ZwLWJ1dHRvblwiIGRpc2FibGVkPVwiZGlzYWJsZWRcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAoZGF0YS50eXBlID09J3dlYnJ0YydcclxuICAgICAgICAgICAgICAgICAgICAgICAgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtbGl2ZS1iYWRnZS1sb3dsYXRlbmN5XCI+bG93IGxhdGVuY3kgbGl2ZTwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPmxpdmU8L3NwYW4+JykgK1xyXG4gICAgICAgICAgICAgICAgJzwvYnV0dG9uPicpXHJcbiAgICAgICAgICAgICAgICA6XHJcbiAgICAgICAgICAgICAgICAoJzxzcGFuIGNsYXNzPVwib3ZwLXRpbWUtY3VycmVudFwiPjA6MDA8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXRpbWUtc2VwYXJhdG9yXCI+IC8gPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC10aW1lLWR1cmF0aW9uXCI+MDowMDwvc3Bhbj4nKVxyXG4gICAgICAgICAgICApICtcclxuICAgICAgICAnPC9kaXY+J1xyXG4gICAgKTtcclxufTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMC4uXHJcbiAqL1xyXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XHJcblxyXG5jb25zdCBWb2x1bWVCdXR0b24gPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xyXG5cclxuICAgIGxldCAkc2xpZGVyQ29udGFpbmVyID0gXCJcIixcclxuICAgICAgICAkc2xpZGVyID0gXCJcIixcclxuICAgICAgICAkc2xpZGVySGFuZGxlID0gXCJcIixcclxuICAgICAgICAkc2xpZGVyVmFsdWUgPSBcIlwiLFxyXG4gICAgICAgICR2b2x1bWVJY29uQmlnID0gXCJcIixcclxuICAgICAgICAkdm9sdW1lSWNvblNtYWxsID0gXCJcIixcclxuICAgICAgICAkdm9sdW1lSWNvbk11dGUgPSBcIlwiO1xyXG4gICAgbGV0IG1vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgbGV0IHNsaWRlcldpZHRoID0gNzAsICBoYW5kbGVXaWR0aCA9IDAsIG1pblJhbmdlID0gMCwgbWF4UmFuZ2UgPSAwO1xyXG5cclxuXHJcbiAgICAvKnByaXZhdGUgZnVuY3Rpb25zKi9cclxuICAgIGxldCBzZXRWb2x1bWVJY29uID0gZnVuY3Rpb24ocGVyY2VudGFnZSkge1xyXG4gICAgICAgICR2b2x1bWVJY29uQmlnLmhpZGUoKTtcclxuICAgICAgICAkdm9sdW1lSWNvblNtYWxsLmhpZGUoKTtcclxuICAgICAgICAkdm9sdW1lSWNvbk11dGUuaGlkZSgpO1xyXG5cclxuICAgICAgICBpZiAocGVyY2VudGFnZSA+PSA3MCkge1xyXG4gICAgICAgICAgICAkdm9sdW1lSWNvbkJpZy5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwZXJjZW50YWdlIDwgNzAgJiYgcGVyY2VudGFnZSA+IDApIHtcclxuICAgICAgICAgICAgJHZvbHVtZUljb25TbWFsbC5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwZXJjZW50YWdlID09IDApIHtcclxuICAgICAgICAgICAgJHZvbHVtZUljb25NdXRlLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHNldFZvbHVtZVVJID0gZnVuY3Rpb24ocGVyY2VudGFnZSkge1xyXG4gICAgICAgIGlmIChhcGkuZ2V0TXV0ZSgpKSB7XHJcbiAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0Vm9sdW1lSWNvbihwZXJjZW50YWdlKTtcclxuXHJcbiAgICAgICAgY29uc3QgaGFuZGxlUG9zaXRpb24gPSBtYXhSYW5nZSAqIHBlcmNlbnRhZ2UgLyAxMDA7XHJcblxyXG4gICAgICAgICRzbGlkZXJIYW5kbGUuY3NzKCdsZWZ0JywgaGFuZGxlUG9zaXRpb24rICdweCcpO1xyXG4gICAgICAgICRzbGlkZXJWYWx1ZS5jc3MoJ3dpZHRoJywgaGFuZGxlUG9zaXRpb24rICdweCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjYWxjdWxhdGVQZXJjZW50YWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVYID0gZXZlbnQucGFnZVggLSAkc2xpZGVyLm9mZnNldCgpLmxlZnQ7XHJcbiAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSByZWxhdGl2ZVggLyBzbGlkZXJXaWR0aCAqIDEwMDtcclxuXHJcbiAgICAgICAgaWYgKHBlcmNlbnRhZ2UgPCAwKSB7XHJcbiAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBlcmNlbnRhZ2UgPiAxMDApIHtcclxuICAgICAgICAgICAgcGVyY2VudGFnZSA9IDEwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwZXJjZW50YWdlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAkc2xpZGVyQ29udGFpbmVyID0gJGN1cnJlbnQuZmluZChcIi5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXJcIik7XHJcbiAgICAgICAgJHNsaWRlciA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1zaWxkZXJcIik7XHJcbiAgICAgICAgJHNsaWRlckhhbmRsZSA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1zbGlkZXItaGFuZGxlXCIpO1xyXG4gICAgICAgICRzbGlkZXJWYWx1ZSA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1zbGlkZXItdmFsdWVcIik7XHJcblxyXG4gICAgICAgICR2b2x1bWVJY29uQmlnID0gJGN1cnJlbnQuZmluZCggXCIub3ZwLXZvbHVtZS1idXR0b24tYmlnaWNvblwiKTtcclxuICAgICAgICAkdm9sdW1lSWNvblNtYWxsID0gJGN1cnJlbnQuZmluZChcIi5vdnAtdm9sdW1lLWJ1dHRvbi1zbWFsbGljb25cIik7XHJcbiAgICAgICAgJHZvbHVtZUljb25NdXRlID0gJGN1cnJlbnQuZmluZChcIi5vdnAtdm9sdW1lLWJ1dHRvbi1tdXRlaWNvblwiKTtcclxuXHJcbiAgICAgICAgaGFuZGxlV2lkdGggPSAkc2xpZGVySGFuZGxlLndpZHRoKCk7XHJcbiAgICAgICAgbWF4UmFuZ2UgPSBzbGlkZXJXaWR0aCAtIGhhbmRsZVdpZHRoO1xyXG5cclxuICAgICAgICBhcGkub24oJ3JlYWR5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFZvbHVtZVVJKGFwaS5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXBpLm9uKCd2b2x1bWVDaGFuZ2VkJywgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBzZXRWb2x1bWVVSShkYXRhLnZvbHVtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXBpLm9uKCdtdXRlJywgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5tdXRlKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRWb2x1bWVVSSgwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNldFZvbHVtZVVJKGFwaS5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xyXG5cclxuICAgIH07XHJcbiAgICBjb25zdCBldmVudHMgPSB7XHJcbiAgICAgICAgXCJjbGljayAub3ZwLXZvbHVtZS1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFwaS5nZXRWb2x1bWUoKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgYXBpLnNldE11dGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYXBpLnNldFZvbHVtZSgxMDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXBpLnNldE11dGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb3VzZWVudGVyIC5vdnAtdm9sdW1lLWJ1dHRvblwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICRzbGlkZXJDb250YWluZXIuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vdXNlbGVhdmUgLm92cC12b2x1bWUtc2lsZGVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb3VzZWRvd24gLm92cC12b2x1bWUtc2lsZGVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbW91c2VEb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgYXBpLnNldE11dGUoZmFsc2UpO1xyXG4gICAgICAgICAgICBhcGkuc2V0Vm9sdW1lKGNhbGN1bGF0ZVBlcmNlbnRhZ2UoZXZlbnQpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW91c2V1cCAub3ZwLXZvbHVtZS1zaWxkZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBtb3VzZURvd24gPSBmYWxzZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW91c2Vtb3ZlIC5vdnAtdm9sdW1lLXNpbGRlclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmICghbW91c2VEb3duKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFwaS5zZXRWb2x1bWUoY2FsY3VsYXRlUGVyY2VudGFnZShldmVudCkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiVm9sdW1lQnV0dG9uXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQpLCB7XHJcbiAgICAgICAgc2V0TW91c2VEb3duOiBmdW5jdGlvbiAoc3RhdGUpIHtcclxuICAgICAgICAgICAgbW91c2VEb3duID0gc3RhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWb2x1bWVCdXR0b247XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjAuLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC12b2x1bWUtY29udHJvbGxlclwiPicrXHJcbiAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwib3ZwLWJ1dHRvbiBvdnAtdm9sdW1lLWJ1dHRvblwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXZvbHVtZS1idXR0b24tYmlnaWNvblwiPjwvaT4nICtcclxuICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cIm92cC12b2x1bWUtYnV0dG9uLXNtYWxsaWNvblwiPjwvaT4nICtcclxuICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cIm92cC12b2x1bWUtYnV0dG9uLW11dGVpY29uXCI+PC9pPicgK1xyXG4gICAgICAgICAgICAnPC9idXR0b24+JyArXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyXCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC12b2x1bWUtc2lsZGVyXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdm9sdW1lLXNsaWRlci1iZ1wiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXZvbHVtZS1zbGlkZXItdmFsdWVcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZVwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAnPC9kaXY+J1xyXG4gICAgKTtcclxufTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAxOS4uXHJcbiAqL1xyXG5cclxuaW1wb3J0IFRlbXBsYXRlcyBmcm9tIFwidmlldy9lbmdpbmUvVGVtcGxhdGVzXCI7XHJcbmltcG9ydCBMQSQgZnJvbSAndXRpbHMvbGlrZUEkJztcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGlzIHNpbXBsZSB1aSByZW5kZXJlci4gVGhpcyByZXR1cm5zIG9uUmVuZGVyZWQgY2FsbGJhY2ssIG9uRGVzdHJveWVkIGNhbGxiYWNrIG9uIFRlbXBsYXRlLiBBbmQgdGhpcyBiaW5kIGV2ZW50cyBmb3IgVGVtcGxhdGVzLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgIGRvbSBlbGVtZW50IG9yIExBJCBvYmplY3RcclxuICogQHBhcmFtICAgdGVtcGxhdGVOYW1lICAgIHRlbXBsYXRlTmFtZVxyXG4gKiBAcGFyYW0gICBkYXRhICAgIHByZWxvYWQgZGF0YVxyXG4gKiBAcGFyYW0gICBldmVudHMgICAgVGVtcGxhdGUncyBldmVudHMuXHJcbiAqIEBwYXJhbSAgIG9uUmVuZGVyZWQgICAgVGhpcyBjYWxsYmFjayBvY2N1cnMgYWZ0ZXIgYXBwZW5kIHRlbXBsYXRlLlxyXG4gKiBAcGFyYW0gICBvbkRlc3Ryb3llZCAgICBUaGlzIGNhbGxiYWNrIG9jY3VycyBhZnRlciBkZXN0cm95ZWQgdGVtcGxhdGUuXHJcbiAqIEBwYXJhbSAgIGlzUm9vdFxyXG4gKlxyXG4gKiAqL1xyXG5jb25zdCBPdmVuVGVtcGxhdGUgPSBmdW5jdGlvbiAoY29udGFpbmVyLCB0ZW1wbGF0ZU5hbWUsIGRhdGEsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQsIGlzUm9vdCkge1xyXG4gICAgbGV0ICRjb250YWluZXIgPSBfLmlzRWxlbWVudChjb250YWluZXIpID8gTEEkKGNvbnRhaW5lcikgOiBjb250YWluZXI7XHJcbiAgICBsZXQgJHRlbXBsYXRlO1xyXG4gICAgbGV0IHZpZXdFdmVudHMgPSB7fTtcclxuICAgIGxldCB0aGF0ID0ge307XHJcblxyXG4gICAgbGV0IGNyZWF0ZUFuZFNlbGVjdEVsZW1lbnQgPSBmdW5jdGlvbiAoaHRtbCkge1xyXG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBuZXdFbGVtZW50LmlubmVySFRNTCA9IGh0bWw7XHJcblxyXG4gICAgICAgICR0ZW1wbGF0ZSA9IExBJChuZXdFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3RWxlbWVudC5maXJzdENoaWxkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc1Jvb3QpIHtcclxuICAgICAgICAkY29udGFpbmVyLnJlcGxhY2UoY3JlYXRlQW5kU2VsZWN0RWxlbWVudChUZW1wbGF0ZXNbdGVtcGxhdGVOYW1lICsgXCJUZW1wbGF0ZVwiXShkYXRhKSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZChjcmVhdGVBbmRTZWxlY3RFbGVtZW50KFRlbXBsYXRlc1t0ZW1wbGF0ZU5hbWUgKyBcIlRlbXBsYXRlXCJdKGRhdGEpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9uUmVuZGVyZWQpIHtcclxuICAgICAgICBvblJlbmRlcmVkKCR0ZW1wbGF0ZSwgdGhhdCk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmtleXMoZXZlbnRzKS5mb3JFYWNoKGV2ZW50U3RyaW5nID0+IHtcclxuICAgICAgICBsZXQgZXhwbG9kZWRUZXh0ID0gZXZlbnRTdHJpbmcuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgIGxldCBldmVudE5hbWUgPSBleHBsb2RlZFRleHRbMF0ucmVwbGFjZSgvIC9naSwgXCJcIik7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV4cGxvZGVkVGV4dFsxXS5yZXBsYWNlKC8gL2dpLCBcIlwiKTtcclxuXHJcbiAgICAgICAgbGV0ICR0YXJnZXQgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZih0YXJnZXQgPT09IFwiZG9jdW1lbnRcIiB8fCB0YXJnZXQgPT09IFwid2luZG93XCIpe1xyXG4gICAgICAgICAgICAkdGFyZ2V0ID0gTEEkKHRhcmdldCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICR0YXJnZXQgPSAkdGVtcGxhdGUuZmluZCh0YXJnZXQpIHx8ICgkdGVtcGxhdGUuaGFzQ2xhc3ModGFyZ2V0LnJlcGxhY2UoXCIuXCIsXCJcIikpID8gJHRlbXBsYXRlIDogbnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKGV2ZW50TmFtZSAmJiB0YXJnZXQgJiYgJHRhcmdldCkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBPYmplY3Qua2V5cyh2aWV3RXZlbnRzKS5sZW5ndGgrKztcclxuXHJcbiAgICAgICAgICAgIC8vYmVjYXVzZSBJdCByZXR1bnMgYW5vdGhlciBkYXRhLlxyXG4gICAgICAgICAgICBsZXQgd3JhcHBlZEZ1bmMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudHNbZXZlbnRTdHJpbmddKGV2ZW50LCAkdGVtcGxhdGUsIHRoYXQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2aWV3RXZlbnRzW2lkXSA9IHtuYW1lOiBldmVudE5hbWUsIHRhcmdldDogdGFyZ2V0LCBjYWxsYmFjazogd3JhcHBlZEZ1bmN9O1xyXG5cclxuICAgICAgICAgICAgLy9zb21ldGltZXMgdGFyZ2V0IGlzIE5vZGVMaXN0XHJcbiAgICAgICAgICAgIGxldCBub2RlTGVuZ3RoID0gJHRhcmdldC5nZXQoKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmKG5vZGVMZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlTGlzdCA9ICR0YXJnZXQuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZUxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZUxpc3RbaV0uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHdyYXBwZWRGdW5jKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vSUUgTm9kZUxpc3QgZG9lc24ndCBoYXZlIGZvckVhY2guIEl0J3Mgd2Fjay5cclxuICAgICAgICAgICAgICAgIC8qJHRhcmdldC5nZXQoKS5mb3JFYWNoKGZ1bmN0aW9uKCRpdGVtKXtcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgd3JhcHBlZEZ1bmMpO1xyXG4gICAgICAgICAgICAgICAgfSk7Ki9cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LmdldCgpLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB3cmFwcGVkRnVuYyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModmlld0V2ZW50cykuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBldmVudCA9IHZpZXdFdmVudHNbaWRdO1xyXG4gICAgICAgICAgICBsZXQgJHRhcmdldCA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQgPT09IFwiZG9jdW1lbnRcIiB8fCBldmVudC50YXJnZXQgPT09IFwid2luZG93XCIpe1xyXG4gICAgICAgICAgICAgICAgJHRhcmdldCA9IExBJChldmVudC50YXJnZXQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICR0YXJnZXQgPSAkdGVtcGxhdGUuZmluZChldmVudC50YXJnZXQpIHx8ICgkdGVtcGxhdGUuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LnJlcGxhY2UoXCIuXCIsXCJcIikpID8gJHRlbXBsYXRlIDogbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vc29tZXRpbWVzIHRhcmdldCBpcyBOb2RlTGlzdFxyXG4gICAgICAgICAgICBsZXQgbm9kZUxlbmd0aCA9ICR0YXJnZXQuZ2V0KCkubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZihub2RlTGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZUxpc3QgPSAkdGFyZ2V0LmdldCgpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGVMZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQubmFtZSwgZXZlbnQuY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLyokdGFyZ2V0LmdldCgpLmZvckVhY2goZnVuY3Rpb24oJGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQubmFtZSwgZXZlbnQuY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfSk7Ki9cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LmdldCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQubmFtZSwgZXZlbnQuY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZWxldGUgdmlld0V2ZW50c1tpZF07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmKCR0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgICR0ZW1wbGF0ZS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvbkRlc3Ryb3llZCkge1xyXG4gICAgICAgICAgICBvbkRlc3Ryb3llZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxuXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT3ZlblRlbXBsYXRlO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIwLi5cclxuICovXHJcbmltcG9ydCBUZXh0Vmlld1RlbXBsYXRlIGZyb20gJ3ZpZXcvZXhhbXBsZS9tYWluVGVtcGxhdGUnO1xyXG5pbXBvcnQgVmlld1RlbXBsYXRlIGZyb20gJ3ZpZXcvdmlld1RlbXBsYXRlJztcclxuaW1wb3J0IEhlbHBlclRlbXBsYXRlIGZyb20gJ3ZpZXcvaGVscGVyL21haW5UZW1wbGF0ZSc7XHJcbmltcG9ydCBCaWdCdXR0b25UZW1wbGF0ZSBmcm9tICd2aWV3L2hlbHBlci9iaWdCdXR0b25UZW1wbGF0ZSc7XHJcbmltcG9ydCBNZXNzYWdlQm94VGVtcGxhdGUgZnJvbSAndmlldy9oZWxwZXIvbWVzc2FnZUJveFRlbXBsYXRlJztcclxuaW1wb3J0IFNwaW5uZXJUZW1wbGF0ZSBmcm9tICd2aWV3L2hlbHBlci9zcGlubmVyVGVtcGxhdGUnO1xyXG5pbXBvcnQgQ29udGV4dFBhbmVsVGVtcGxhdGUgZnJvbSAndmlldy9oZWxwZXIvY29udGV4dFBhbmVsVGVtcGxhdGUnO1xyXG5cclxuaW1wb3J0IENvbnRyb2xzVGVtcGxhdGUgZnJvbSAndmlldy9jb250cm9scy9tYWluVGVtcGxhdGUnO1xyXG5pbXBvcnQgVm9sdW1lQnV0dG9uVGVtcGxhdGUgZnJvbSAndmlldy9jb250cm9scy92b2x1bWVCdXR0b25UZW1wbGF0ZSc7XHJcbmltcG9ydCBQcm9ncmVzc0JhclRlbXBsYXRlIGZyb20gJ3ZpZXcvY29udHJvbHMvcHJvZ3Jlc3NCYXJUZW1wbGF0ZSc7XHJcbmltcG9ydCBQbGF5QnV0dG9uVGVtcGxhdGUgZnJvbSAndmlldy9jb250cm9scy9wbGF5QnV0dG9uVGVtcGxhdGUnO1xyXG5pbXBvcnQgVGltZURpc3BsYXlUZW1wbGF0ZSBmcm9tICd2aWV3L2NvbnRyb2xzL3RpbWVEaXNwbGF5VGVtcGxhdGUnO1xyXG5pbXBvcnQgRnVsbFNjcmVlbkJ1dHRvblRlbXBsYXRlIGZyb20gJ3ZpZXcvY29udHJvbHMvZnVsbFNjcmVlbkJ1dHRvblRlbXBsYXRlJztcclxuaW1wb3J0IFNldHRpbmdQYW5lbFRlbXBsYXRlIGZyb20gJ3ZpZXcvY29udHJvbHMvc2V0dGluZ1BhbmVsVGVtcGxhdGUnO1xyXG5cclxuY29uc3QgVGVtcGxhdGVzID0ge1xyXG4gICAgVGV4dFZpZXdUZW1wbGF0ZSxcclxuICAgIFZpZXdUZW1wbGF0ZSxcclxuICAgIEhlbHBlclRlbXBsYXRlLFxyXG4gICAgQmlnQnV0dG9uVGVtcGxhdGUsXHJcbiAgICBNZXNzYWdlQm94VGVtcGxhdGUsXHJcbiAgICBTcGlubmVyVGVtcGxhdGUsXHJcbiAgICBDb250ZXh0UGFuZWxUZW1wbGF0ZSxcclxuXHJcbiAgICBDb250cm9sc1RlbXBsYXRlLFxyXG4gICAgVm9sdW1lQnV0dG9uVGVtcGxhdGUsXHJcbiAgICBQcm9ncmVzc0JhclRlbXBsYXRlLFxyXG4gICAgUGxheUJ1dHRvblRlbXBsYXRlLFxyXG4gICAgVGltZURpc3BsYXlUZW1wbGF0ZSxcclxuICAgIEZ1bGxTY3JlZW5CdXR0b25UZW1wbGF0ZSxcclxuICAgIFNldHRpbmdQYW5lbFRlbXBsYXRlXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZW1wbGF0ZXM7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAxOS4uXHJcbiAqL1xyXG5cclxuY29uc3QgVGV4dFZpZXdUZW1wbGF0ZSA9IGZ1bmN0aW9uKHRleHQpe1xyXG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwidGV4dFZpZXdcIiBzdHlsZT1cInBhZGRpbmcgOiA1cHg7IGJhY2tncm91bmQ6IHJlZFwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxoMz4nK3RleHQrJzwvaDM+JyArXHJcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5cIj7ri6vquLA8L2J1dHRvbj4nICtcclxuICAgICAgICAgICAgJzwvZGl2Pic7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0Vmlld1RlbXBsYXRlOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjYuLlxyXG4gKi9cclxuY29uc3QgU2V0dGluZ1BhbmVsTGlzdCA9IFtdO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ1BhbmVsTGlzdDsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI0Li5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuaW1wb3J0IHtcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfQ09NUExFVEUsXHJcbiAgICBTVEFURV9QQVVTRURcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuY29uc3QgQmlnQnV0dG9uID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpLCBwbGF5ZXJTdGF0ZSl7XHJcblxyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjb250YWluZXIsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nIVxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvL0RvIG5vdGhpbmchXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZXZlbnRzID0ge1xyXG4gICAgICAgIC8qXCJjbGljayAub3ZwLWJpZ2J1dHRvbi1jb250YWluZXJcIiA6IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IGFwaS5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFN0YXRlID09PSBTVEFURV9JRExFIHx8IGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfUEFVU0VEIHx8IGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfQ09NUExFVEUpIHtcclxuICAgICAgICAgICAgICAgIGFwaS5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9Ki9cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIkJpZ0J1dHRvblwiLCBwbGF5ZXJTdGF0ZSwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmlnQnV0dG9uOyIsImltcG9ydCB7XHJcbiAgICBTVEFURV9JRExFLFxyXG4gICAgU1RBVEVfUExBWUlORyxcclxuICAgIFNUQVRFX1NUQUxMRUQsXHJcbiAgICBTVEFURV9MT0FESU5HLFxyXG4gICAgU1RBVEVfQ09NUExFVEUsXHJcbiAgICBTVEFURV9QQVVTRUQsXHJcbiAgICBTVEFURV9FUlJPUlxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHBsYXllclN0YXRlKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWJpZ2J1dHRvbi1jb250YWluZXIgXCI+JyArICAgICAgLy9hbmltYXRlZCBib3VuY2VJblxyXG4gICAgICAgICAgICAocGxheWVyU3RhdGUgPT09IFNUQVRFX1BMQVlJTkcgPyAnPGkgY2xhc3M9XCJvdnAtYmlnYnV0dG9uIG92cC1iaWdidXR0b24tcGF1c2VcIj48L2k+JyA6ICcnKSArXHJcbiAgICAgICAgICAgIChwbGF5ZXJTdGF0ZSA9PT0gU1RBVEVfUEFVU0VEICA/ICc8aSBjbGFzcz1cIm92cC1iaWdidXR0b24gb3ZwLWJpZ2J1dHRvbi1wbGF5XCI+PC9pPicgOiAnJykgK1xyXG4gICAgICAgICAgICAocGxheWVyU3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFID8gJzxpIGNsYXNzPVwib3ZwLWJpZ2J1dHRvbiBvdnAtYmlnYnV0dG9uLXJlcGxheVwiPjwvaT4nIDogJycpICtcclxuICAgICAgICAnPC9kaXY+J1xyXG4gICAgKTtcclxufTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDEuLlxyXG4gKi9cclxuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xyXG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcblxyXG5jb25zdCBDb250ZXh0UGFuZWwgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGksIHBvc2l0aW9uKXtcclxuICAgIGNvbnN0ICRyb290ID0gTEEkKFwiI1wiK2FwaS5nZXRDb250YWluZXJJZCgpKTtcclxuXHJcbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICBjb25zdCBwYW5lbFdpZHRoID0gJGN1cnJlbnQud2lkdGgoKTtcclxuICAgICAgICBjb25zdCBwYW5lbEhlaWdodCA9ICRjdXJyZW50LmhlaWdodCgpO1xyXG5cclxuICAgICAgICBjb25zdCB4ID0gTWF0aC5taW4ocG9zaXRpb24ucGFnZVggLSAkcm9vdC5vZmZzZXQoKS5sZWZ0LCAkcm9vdC53aWR0aCgpIC0gcGFuZWxXaWR0aCk7XHJcbiAgICAgICAgY29uc3QgeSA9IE1hdGgubWluKHBvc2l0aW9uLnBhZ2VZIC0gJHJvb3Qub2Zmc2V0KCkudG9wLCAkcm9vdC5oZWlnaHQoKSAtIHBhbmVsSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgJGN1cnJlbnQuY3NzKFwibGVmdFwiICwgeCArIFwicHhcIik7XHJcbiAgICAgICAgJGN1cnJlbnQuY3NzKFwidG9wXCIgLCB5ICsgXCJweFwiKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nLlxyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuICAgICAgICBcImNsaWNrIC5vdnAtY29udGV4dC1pdGVtXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKFxyXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9BaXJlblNvZnQvT3ZlblBsYXllcicsXHJcbiAgICAgICAgICAgICAgICAnX2JsYW5rJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIkNvbnRleHRQYW5lbFwiLCBwb3NpdGlvbiwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRleHRQYW5lbDtcclxuIiwiaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1jb250ZXh0LXBhbmVsIGFuaW1hdGVkIGZhZGVJblwiPicgK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1jb250ZXh0LWl0ZW1cIiB0YWJpbmRleD1cIjBcIj4nICtcclxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1jb250ZXh0LWl0ZW0tdGV4dFwiPkhlbHA8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1jb250ZXh0LWl0ZW1cIiB0YWJpbmRleD1cIjFcIj4nICtcclxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1jb250ZXh0LWl0ZW0tdGV4dFwiPkFib3V0IE92ZW5QbGF5ZXIgJyt2ZXJzaW9uKyc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICc8L2Rpdj4nXHJcbiAgICApO1xyXG59OyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjQuLlxyXG4gKi9cclxuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xyXG5pbXBvcnQgQmlnQnV0dG9uIGZyb20gJ3ZpZXcvaGVscGVyL2JpZ0J1dHRvbic7XHJcbmltcG9ydCBNZXNzYWdlQm94IGZyb20gJ3ZpZXcvaGVscGVyL21lc3NhZ2VCb3gnO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tICd2aWV3L2hlbHBlci9zcGlubmVyJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBSRUFEWSxcclxuICAgIEVSUk9SLFxyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9TVEFMTEVELFxyXG4gICAgU1RBVEVfTE9BRElORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfUEFVU0VELFxyXG4gICAgU1RBVEVfRVJST1IsXHJcbiAgICBQTEFZRVJfU1RBVEUsXHJcbiAgICBORVRXT1JLX1VOU1RBQkxFRFxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCBIZWxwZXIgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xyXG4gICAgbGV0IGJpZ0J1dHRvbiA9IFwiXCIsIG1lc3NhZ2VCb3ggPSBcIlwiLCBzcGlubmVyID0gXCJcIjtcclxuXHJcblxyXG5cclxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgIGxldCBjcmVhdGVCaWdCdXR0b24gPSBmdW5jdGlvbihzdGF0ZSl7XHJcbiAgICAgICAgICAgIGlmKGJpZ0J1dHRvbil7XHJcbiAgICAgICAgICAgICAgICBiaWdCdXR0b24uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJpZ0J1dHRvbiA9IEJpZ0J1dHRvbigkY3VycmVudCwgYXBpLCBzdGF0ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgY3JlYXRlTWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHdpdGhUaW1lcil7XHJcbiAgICAgICAgICAgIGlmKG1lc3NhZ2VCb3gpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZUJveC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVzc2FnZUJveCA9IE1lc3NhZ2VCb3goJGN1cnJlbnQsIGFwaSwgbWVzc2FnZSwgd2l0aFRpbWVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNwaW5uZXIgPSBTcGlubmVyKCRjdXJyZW50LCBhcGkpO1xyXG5cclxuICAgICAgICBhcGkub24oUkVBRFksIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjcmVhdGVCaWdCdXR0b24oU1RBVEVfUEFVU0VEKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcGkub24oUExBWUVSX1NUQVRFLCBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLm5ld3N0YXRlKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGJpZ0J1dHRvbi5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Bpbm5lci5zaG93KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUJpZ0J1dHRvbihkYXRhLm5ld3N0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLm5ld3N0YXRlID09PSBTVEFURV9TVEFMTEVEIHx8IGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX0xPQURJTkcgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Bpbm5lci5zaG93KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGlubmVyLnNob3coZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwaS5vbihFUlJPUiwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSAxMDApIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnSW5pdGlhbGl6YXRpb24gZmFpbGVkLic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IuY29kZSA9PT0gMzAxKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ01lZGlhIHBsYXliYWNrIHdhcyBjYW5jZWxlZC4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLmNvZGUgPT09IDMwMikge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdTb21lIG9mIHRoZSBtZWRpYSBjb3VsZCBub3QgYmUgZG93bmxvYWRlZCBkdWUgdG8gYSBuZXR3b3JrIGVycm9yLic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IuY29kZSA9PT0gMzAzKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1VuYWJsZSB0byBsb2FkIG1lZGlhLiBUaGlzIG1heSBiZSBkdWUgdG8gYSBzZXJ2ZXIgb3IgbmV0d29yayBlcnJvciwgb3IgZHVlIHRvIGFuIHVuc3VwcG9ydGVkIGZvcm1hdC4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLmNvZGUgPT09IDMwNCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdNZWRpYSBwbGF5YmFjayBoYXMgYmVlbiBjYW5jZWxlZC4gSXQgbG9va3MgbGlrZSB5b3VyIG1lZGlhIGlzIGNvcnJ1cHRlZCBvciB5b3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgZmVhdHVyZXMgeW91ciBtZWRpYSB1c2VzLic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoZXJyb3IuY29kZS8xMDApID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ0Nvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeSBzZXJ2ZXIgZmFpbGVkLic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ0NhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZU1lc3NhZ2UobWVzc2FnZSwgbnVsbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGFwaS5vbihORVRXT1JLX1VOU1RBQkxFRCwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9ICdCZWNhdXNlIHRoZSBuZXR3b3JrIGNvbm5lY3Rpb24gaXMgdW5zdGFibGUsIHRoZSBmb2xsb3dpbmcgbWVkaWEgc291cmNlIHdpbGwgYmUgcGxheWVkLic7XHJcblxyXG4gICAgICAgICAgICBpZihhcGkuZ2V0Q3VycmVudFF1YWxpdHkoKS5pbmRleCsxID09PSAgYXBpLmdldFF1YWxpdHlMZXZlbHMoKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdOZXR3b3JrIGNvbm5lY3Rpb24gaXMgdW5zdGFibGUuIENoZWNrIHRoZSBuZXR3b3JrIGNvbm5lY3Rpb24uJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3JlYXRlTWVzc2FnZShtZXNzYWdlLCA1MDAwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vRG8gbm90aGluZy5cclxuICAgIH07XHJcbiAgICBjb25zdCBldmVudHMgPSB7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiSGVscGVyXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlbHBlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAxOS4uXHJcbiAqL1xyXG5cclxuY29uc3QgSGVscGVyVGVtcGxhdGUgPSBmdW5jdGlvbih0ZXh0KXtcclxuICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIm92cC1oZWxwZXJzLWNvbnRhaW5lclwiPjwvZGl2Pic7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZWxwZXJUZW1wbGF0ZTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNC4uXHJcbiAqL1xyXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XHJcbmltcG9ydCB7XHJcbiAgICBTVEFURV9JRExFLFxyXG4gICAgU1RBVEVfUExBWUlORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfUEFVU0VEXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbmNvbnN0IE1lc3NhZ2VCb3ggPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGksIG1lc3NhZ2UsIHdpdGhUaW1lcil7XHJcblxyXG4gICAgbGV0IGF1dG9EZXN0cm95VGltZXIgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgIGlmKHdpdGhUaW1lcil7XHJcbiAgICAgICAgICAgIGF1dG9EZXN0cm95VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0sIHdpdGhUaW1lcnx8NTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcclxuICAgIH07XHJcbiAgICBjb25zdCBldmVudHMgPSB7XHJcbiAgICAgICAgXCJjbGljayAub3ZwLW1lc3NhZ2UtdGV4dFwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZihhdXRvRGVzdHJveVRpbWVyKXtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChhdXRvRGVzdHJveVRpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wbGF0ZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiTWVzc2FnZUJveFwiLCBtZXNzYWdlLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZUJveDsiLCJleHBvcnQgZGVmYXVsdCAobWVzc2FnZSkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1tZXNzYWdlLWJveCBhbmltYXRlZCBzaGFrZVwiPicgK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1tZXNzYWdlLWNvbnRhaW5lclwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLW1lc3NhZ2UtdGV4dFwiPicrbWVzc2FnZSsnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgJzwvZGl2PidcclxuICAgICk7XHJcbn07IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNS4uXHJcbiAqL1xyXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XHJcblxyXG5jb25zdCBTcGlubmVyID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpKXtcclxuICAgIGxldCAkc3Bpbm5lciA9IFwiXCI7XHJcblxyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgJHNwaW5uZXIgPSAkY3VycmVudDtcclxuICAgIH07XHJcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nLlxyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHt9O1xyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIlNwaW5uZXJcIiwgbnVsbCwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApLCB7XHJcbiAgICAgICAgc2hvdzogZnVuY3Rpb24gKGlzU2hvdykge1xyXG4gICAgICAgICAgICBpZihpc1Nob3cpe1xyXG4gICAgICAgICAgICAgICAgJHNwaW5uZXIuc2hvdygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICRzcGlubmVyLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwaW5uZXI7IiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwib3ZwLXNwaW5uZXItY29udGFpbmVyXCI+PGRpdiBjbGFzcz1cIm92cC1zcGlubmVyXCI+PGRpdiBjbGFzcz1cImJvdW5jZTFcIj48L2Rpdj48ZGl2IGNsYXNzPVwiYm91bmNlMlwiPjwvZGl2PjxkaXYgY2xhc3M9XCJib3VuY2UzXCI+PC9kaXY+PC9kaXY+PC9kaXY+JztcclxufTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMC4uXHJcbiAqL1xyXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XHJcbmltcG9ydCBIZWxwZXIgZnJvbSAndmlldy9oZWxwZXIvbWFpbic7XHJcbmltcG9ydCBDb250cm9scyBmcm9tICd2aWV3L2NvbnRyb2xzL21haW4nO1xyXG5pbXBvcnQgU2V0dGluZ1BhbmVsTGlzdCBmcm9tICd2aWV3L2dsb2JhbC9TZXR0aW5nUGFuZWxMaXN0JztcclxuaW1wb3J0IENvbnRleHRQYW5lbCBmcm9tICd2aWV3L2hlbHBlci9jb250ZXh0UGFuZWwnO1xyXG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgUkVBRFksXHJcbiAgICBERVNUUk9ZLFxyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9TVEFMTEVELFxyXG4gICAgU1RBVEVfTE9BRElORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfUEFVU0VELFxyXG4gICAgU1RBVEVfRVJST1IsXHJcbiAgICBDT05URU5UX01FVEEsXHJcbiAgICBQTEFZRVJfU1RBVEUsXHJcbiAgICBFUlJPUlxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5yZXF1aXJlKCcuLi8uLi9jc3Mvb3ZlbnBsYXllci5sZXNzJyk7XHJcblxyXG5jb25zdCBWaWV3ID0gZnVuY3Rpb24oJGNvbnRhaW5lcil7XHJcbiAgICBsZXQgdmlld1RlbXBsYXRlID0gXCJcIiwgY29udHJvbHMgPSBcIlwiLCBoZWxwZXIgPSBcIlwiLCAkcGxheWVyUm9vdCwgY29udGV4dFBhbmVsID0gXCJcIiwgYXBpID0gXCJcIiwgYXV0b0hpZGVUaW1lciA9IFwiXCI7XHJcblxyXG4gICAgbGV0IHNldEhpZGUgPSBmdW5jdGlvbiAoaGlkZSwgYXV0b0hpZGUpIHtcclxuXHJcbiAgICAgICAgaWYgKGF1dG9IaWRlVGltZXIpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGF1dG9IaWRlVGltZXIpO1xyXG4gICAgICAgICAgICBhdXRvSGlkZVRpbWVyID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoaWRlKSB7XHJcbiAgICAgICAgICAgIGlmKFNldHRpbmdQYW5lbExpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHBsYXllclJvb3QuYWRkQ2xhc3MoXCJvdnAtYXV0b2hpZGVcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHBsYXllclJvb3QucmVtb3ZlQ2xhc3MoXCJvdnAtYXV0b2hpZGVcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXV0b0hpZGUpIHtcclxuICAgICAgICAgICAgICAgIGF1dG9IaWRlVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKFNldHRpbmdQYW5lbExpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJHBsYXllclJvb3QuYWRkQ2xhc3MoXCJvdnAtYXV0b2hpZGVcIik7XHJcbiAgICAgICAgICAgICAgICB9LCAxODAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBsZXQgdG9nZ2xlUGxheVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IGFwaS5nZXRTdGF0ZSgpO1xyXG5cclxuICAgICAgICBpZiAoY3VycmVudFN0YXRlID09PSBTVEFURV9JRExFIHx8IGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfUEFVU0VEIHx8IGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfQ09NUExFVEUpIHtcclxuICAgICAgICAgICAgYXBpLnBsYXkoKTtcclxuICAgICAgICB9ZWxzZSBpZihjdXJyZW50U3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICBhcGkucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgbGV0IHNlZWsgPSBmdW5jdGlvbiAoc2Vjb25kcywgaXNSZXdpbmQpIHtcclxuXHJcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBhcGkuZ2V0RHVyYXRpb24oKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSBhcGkuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSAwO1xyXG5cclxuICAgICAgICBpZihpc1Jld2luZCl7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gTWF0aC5tYXgoY3VycmVudFBvc2l0aW9uIC0gc2Vjb25kcywgMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gTWF0aC5taW4oY3VycmVudFBvc2l0aW9uICsgc2Vjb25kcywgZHVyYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXBpLnNlZWsocG9zaXRpb24pO1xyXG4gICAgfTtcclxuICAgIGxldCB2b2x1bWUgPSBmdW5jdGlvbihpc1VwKXtcclxuICAgICAgICBjb25zdCBjdXJyZW50Vm9sdW1uID0gYXBpLmdldFZvbHVtZSgpO1xyXG4gICAgICAgIGxldCBuZXdWb2x1bWUgPSAwO1xyXG4gICAgICAgIGlmKGlzVXApe1xyXG4gICAgICAgICAgICBuZXdWb2x1bWUgPSAgTWF0aC5taW4oY3VycmVudFZvbHVtbiArIDUsIDEwMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIG5ld1ZvbHVtZSA9IE1hdGgubWF4KGN1cnJlbnRWb2x1bW4gLSA1LCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXBpLnNldFZvbHVtZShuZXdWb2x1bWUpO1xyXG4gICAgfTtcclxuICAgIGxldCBjcmVhdGVDb250ZXh0UGFuZWwgPSBmdW5jdGlvbihwYWdlWCwgcGFnZVkpe1xyXG4gICAgICAgIGlmKGNvbnRleHRQYW5lbCl7XHJcbiAgICAgICAgICAgIGNvbnRleHRQYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGNvbnRleHRQYW5lbCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRleHRQYW5lbCA9IENvbnRleHRQYW5lbCgkcGxheWVyUm9vdCwgYXBpLCB7cGFnZVggOiBwYWdlWCwgcGFnZVkgOiBwYWdlWX0pO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuXHJcbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAkcGxheWVyUm9vdCA9ICRjdXJyZW50O1xyXG4gICAgICAgIHZpZXdUZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvL0RvIG5vdGhpbmcuXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZXZlbnRzID0ge1xyXG4gICAgICAgIFwiY2xpY2sgLm92ZW5wbGF5ZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYoY29udGV4dFBhbmVsKXtcclxuICAgICAgICAgICAgICAgIGNvbnRleHRQYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0UGFuZWwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFMQSQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFwiLm92cC1ib3R0b20tcGFuZWxcIikgJiZcclxuICAgICAgICAgICAgICAgICFMQSQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFwiLm92cC1zZXR0aW5nLXBhbmVsXCIpKXtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZVBsYXlQYXVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFMQSQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFwiLm92cC1zZXR0aW5nLXBhbmVsXCIpICYmICFMQSQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFwiLm92cC1zZXR0aW5nLWJ1dHRvblwiKSAmJiBTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgLy9jbGVhciBhbGwgU2V0dGluZ1BhbmVsVGVtcGxhdGVcclxuICAgICAgICAgICAgICAgIF8uZWFjaChTZXR0aW5nUGFuZWxMaXN0LCBmdW5jdGlvbihzZXR0aW5nUGFuZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdQYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFNldHRpbmdQYW5lbExpc3Quc3BsaWNlKDAsIFNldHRpbmdQYW5lbExpc3QubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb3VzZWVudGVyIC5vdmVucGxheWVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhcGkuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORykge1xyXG4gICAgICAgICAgICAgICAgc2V0SGlkZShmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXRIaWRlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb3VzZW1vdmUgLm92ZW5wbGF5ZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFwaS5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRIaWRlKGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNldEhpZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vdXNlbGVhdmUgLm92ZW5wbGF5ZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYoYXBpLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICAgICAgc2V0SGlkZSh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwia2V5ZG93biAub3ZlbnBsYXllclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIHN3aXRjaChldmVudC5rZXlDb2RlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgMzIgOiAgIC8vc2FwY2VcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVBsYXlQYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzNyA6IC8vYXJyb3cgbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vlayg1LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzkgOiAvL2Fycm93IHJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWVrKDUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzggOiAvL2Fycm93IHVwXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB2b2x1bWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQwIDogLy9hcnJvdyB1cFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdm9sdW1lKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjb250ZXh0bWVudSAub3ZlbnBsYXllclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRleHRQYW5lbChldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiVmlld1wiLCAkY29udGFpbmVyLmlkLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkLCB0cnVlKSwge1xyXG4gICAgICAgIGdldE1lZGlhRWxlbWVudENvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHBsYXllclJvb3QuZmluZChcIi5vdnAtbWVkaWEtZWxlbWVudC1jb250YWluZXJcIikuZ2V0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRBcGk6IGZ1bmN0aW9uIChwbGF5ZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBhcGkgPSBwbGF5ZXJJbnN0YW5jZTtcclxuICAgICAgICAgICAgaGVscGVyID0gSGVscGVyKCRwbGF5ZXJSb290LmZpbmQoXCIub3ZwLXVpXCIpLCBwbGF5ZXJJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIGNvbnRyb2xzID0gQ29udHJvbHMoJHBsYXllclJvb3QuZmluZChcIi5vdnAtdWlcIiksIHBsYXllckluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIGFwaS5vbihERVNUUk9ZLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2aWV3VGVtcGxhdGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGFwaS5vbihQTEFZRVJfU1RBVEUsIGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLm5ld3N0YXRlKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLm5ld3N0YXRlID09PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SGlkZShmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEhpZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpZXc7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjAuLlxyXG4gKi9cclxuXHJcbmNvbnN0IFZpZXdUZW1wbGF0ZSA9IGZ1bmN0aW9uKGlkKXtcclxuICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIm92ZW5wbGF5ZXIgb3ZwLXdyYXBwZXJcIiB0YWJpbmRleD1cIi0xXCIgYXJpYS1sYWJlbD1cIlwiIGlkPVwiJytpZCsnXCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1yYXRpb1wiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcGxheWVyXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtbWVkaWEtZWxlbWVudC1jb250YWluZXJcIiBkYXRhLXBhcmVudC1pZD1cIicraWQrJ1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC11aVwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgJzwvZGl2PidcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgVmlld1RlbXBsYXRlO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9