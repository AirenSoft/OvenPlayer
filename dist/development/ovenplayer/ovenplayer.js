/*! OvenPlayerv0.7.2 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

        that.trigger(_constants.DESTROY);
        that.off();

        OvenPlayerConsole.log("API : remove() - lazyQueue, currentProvider, providerController, playlistManager, playerConfig, api event destroed. ");
        logManager.destroy();
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
    /*const view = new View();
     view.appendPlayerMarkup(containerElement);
     const playerInstance = OvenPlayerSDK.create(view.getMediaElementContainer(), options);
      view.addComponentsAndFunctions(playerInstance, options);*/

    var player = (0, _view2.default)(containerElement);

    var playerInstance = _ovenplayer2.default.create(player.getMediaElementContainer(), options);

    _extends(playerInstance, {
        getContainerId: function getContainerId() {
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

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

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

    _likeA$2.default;
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
var version = exports.version = '0.7.2-localbuild';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9vdmVucGxheWVyLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLWZ1bGxzY3JlZW4tY29tcHJlc3Muc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1mdWxsc2NyZWVuLWV4cGFuZC5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXBsYXktbGFyZ2Uuc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1wbGF5LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItcmUtbGFyZ2Uuc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1zZXR0aW5nLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItc3RvcC1sYXJnZS5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXN0b3Auc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci12b2x1bWUtMi5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXZvbHVtZS1tdXRlLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItdm9sdW1lLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvY3NzL292ZW5wbGF5ZXIubGVzcz83MTVmIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvc2hpbXMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xpa2VBJC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvbG9nZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9wb2x5ZmlsbHMvZG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zdHJpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy91bmRlcnNjb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy92YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3dlYnBhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvZnVsbFNjcmVlbkJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9mdWxsU2NyZWVuQnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9tYWluVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcGxheUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9wbGF5QnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcHJvZ3Jlc3NCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcHJvZ3Jlc3NCYXJUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9zZXR0aW5nUGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvc2V0dGluZ1BhbmVsVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdGltZURpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdGltZURpc3BsYXlUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy92b2x1bWVCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdm9sdW1lQnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9lbmdpbmUvVGVtcGxhdGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2V4YW1wbGUvbWFpblRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2dsb2JhbC9TZXR0aW5nUGFuZWxMaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9iaWdCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL2JpZ0J1dHRvblRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9jb250ZXh0UGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL2NvbnRleHRQYW5lbFRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9tYWluVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL21lc3NhZ2VCb3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL21lc3NhZ2VCb3hUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9oZWxwZXIvc3Bpbm5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9oZWxwZXIvc3Bpbm5lclRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvdmlld1RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbIkFwaSIsImNvbnRhaW5lciIsImxvZ01hbmFnZXIiLCJ0aGF0IiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ2ZXJzaW9uIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiaW5pdFByb3ZpZGVyIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImRlZmF1bHQiLCJnZXRRdWFsaXR5TGFiZWwiLCJsYWJlbCIsImxvYWRQcm92aWRlcnMiLCJnZXRQbGF5bGlzdCIsInRoZW4iLCJkZXN0cm95IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJQcm92aWRlcnMiLCJnZXROYW1lIiwiUFJPVklERVJfUlRNUCIsIm9uIiwibmFtZSIsImRhdGEiLCJ0cmlnZ2VyIiwiRVJST1IiLCJjb2RlIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJwYXJzZUludCIsIk5FVFdPUktfVU5TVEFCTEVEIiwiY3VycmVudFF1YWxpdHkiLCJnZXRDdXJyZW50UXVhbGl0eSIsImluZGV4IiwiZ2V0UXVhbGl0eUxldmVscyIsInBhdXNlIiwic2V0Q3VycmVudFF1YWxpdHkiLCJwcmVsb2FkIiwiZmx1c2giLCJSRUFEWSIsImNhdGNoIiwiZXJyb3IiLCJlcnJvck9iamVjdCIsIklOSVRfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImluaXQiLCJvcHRpb25zIiwiaXNEZWJ1ZyIsImRpc2FibGUiLCJzZXRQbGF5bGlzdCIsImdldENvbmZpZyIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJnZXRWb2x1bWUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInBsYXlsaXN0IiwicGxheSIsInNlZWsiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsInNldERlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJxdWFsaXR5SW5kZXgiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwiaXNTYW1lUHJvdmlkZXIiLCJyZXNRdWFsaXR5SW5kZXgiLCJnZXRCdWZmZXIiLCJnZXRTdGF0ZSIsInN0b3AiLCJyZW1vdmUiLCJERVNUUk9ZIiwib2ZmIiwiQXBpUnRtcEV4cGFuc2lvbiIsImV4dGVybmFsQ2FsbGJhY2tDcmVlcCIsInJlc3VsdCIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsIkNvbmZpZ3VyYXRvciIsImNvbXBvc2VTb3VyY2VPcHRpb25zIiwiRGVmYXVsdHMiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5YmFja1JhdGVzIiwibXV0ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2VyaWFsaXplIiwidmFsIiwidW5kZWZpbmVkIiwibG93ZXJjYXNlVmFsIiwidG9Mb3dlckNhc2UiLCJpc05hTiIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJkZXNlcmlhbGl6ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwibm9ybWFsaXplU2l6ZSIsInNsaWNlIiwiZXZhbHVhdGVBc3BlY3RSYXRpbyIsImFyIiwidG9TdHJpbmciLCJpbmRleE9mIiwidGVzdCIsInciLCJzdWJzdHIiLCJoIiwiY29uZmlnIiwiYXNwZWN0cmF0aW8iLCJyYXRlQ29udHJvbHMiLCJyYXRlcyIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsIl8iLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJwdXNoIiwic29ydCIsImNvbmZpZ1BsYXlsaXN0Iiwib2JqIiwicGljayIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJkZWJ1ZyIsImltYWdlIiwicXVhbGl0eUxhYmVsIiwicmVwZWF0Iiwic3RyZXRjaGluZyIsImdldEFzcGVjdHJhdGlvIiwic2V0QXNwZWN0cmF0aW8iLCJhc3BlY3RyYXRpb18iLCJnZXREZWZhdWx0UGxheWJhY2tSYXRlIiwic2V0UXVhbGl0eUxhYmVsIiwibmV3TGFiZWwiLCJnZXRQbGF5YmFja1JhdGVzIiwiaXNQbGF5YmFja1JhdGVDb250cm9scyIsInBsYXlsaXN0XyIsImlzUmVwZWF0IiwiZ2V0U3RyZXRjaGluZyIsIkV2ZW50RW1pdHRlciIsIm9iamVjdCIsIl9ldmVudHMiLCJ0cmlnZ2VyRXZlbnRzIiwiZXZlbnRzIiwiYXJncyIsImNvbnRleHQiLCJldmVudCIsImxpc3RlbmVyIiwiYXBwbHkiLCJjYWxsIiwiYXJndW1lbnRzIiwiYWxsRXZlbnRzIiwiYWxsIiwibmFtZXMiLCJsIiwicmV0YWluIiwiaiIsImsiLCJfY2FsbGJhY2siLCJvbmNlIiwiY291bnQiLCJvbmNlQ2FsbGJhY2siLCJfbGlzdGVuZXIiLCJMYXp5Q29tbWFuZEV4ZWN1dG9yIiwiaW5zdGFuY2UiLCJxdWV1ZWRDb21tYW5kcyIsImNvbW1hbmRRdWV1ZSIsInVuZGVjb3JhdGVkTWV0aG9kcyIsImV4ZWN1dGVNb2RlIiwiY29tbWFuZCIsIm1ldGhvZCIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwiY29tbWFuZF8iLCJjb21tYW5kUXVldWVJdGVtIiwiZmluZFdoZXJlIiwic3BsaWNlIiwiZmluZEluZGV4IiwiU3VwcG9ydENoZWNrZXIiLCJzdXBwb3J0TGlzdCIsImNoZWNrU3VwcG9ydCIsInNvdXJjZSIsIk1pbWVUeXBlcyIsImFhYyIsIm1wNCIsImY0diIsIm00diIsIm1vdiIsIm1wMyIsIm1wZWciLCJvZ3YiLCJvZ2ciLCJvZ2EiLCJ2b3JiaXMiLCJ3ZWJtIiwiZjRhIiwibTN1OCIsIm0zdSIsImhscyIsInZpZGVvIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2FuUGxheVR5cGUiLCJmaWxlIiwidHlwZSIsIm1pbWVUeXBlIiwiaXNIbHNTdXBwb3J0IiwiZ2V0TWVkaWFTb3VyY2UiLCJ3aW5kb3ciLCJNZWRpYVNvdXJjZSIsIldlYktpdE1lZGlhU291cmNlIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXIiLCJTb3VyY2VCdWZmZXIiLCJXZWJLaXRTb3VyY2VCdWZmZXIiLCJpc1R5cGVTdXBwb3J0ZWQiLCJzb3VyY2VCdWZmZXJWYWxpZEFQSSIsImFwcGVuZEJ1ZmZlciIsImZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSIsInNvcnVjZV8iLCJmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QiLCJzdXBwb3J0TmFtZXMiLCJpdGVtIiwic3VwcG9ydGVkIiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIlBST1ZJREVSX0RBU0giLCJQUk9WSURFUl9ITFMiLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIkNPTlRFTlRfU0VFS0VEIiwiUExBWUVSX1NUQVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfVElNRSIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfTEVWRUxTIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJQTEFZRVJfVU5LTldPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiTWFuYWdlciIsImN1cnJlbnRQbGF5bGlzdCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwicmVwbGFjZSIsInByZXR0aWVkUGxheWxpc3QiLCJ0cmFja3MiLCJwbGF5bGlzdEl0ZW0iLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwiY2FwdGlvbnMiLCJjb25jYXQiLCJ0cmFjayIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsInByb3ZpZGVyIiwiUHJvdmlkZXJMb2FkZXIiLCJodG1sNSIsInJlcXVpcmUiLCJlcnIiLCJFcnJvciIsIndlYnJ0YyIsImRhc2giLCJydG1wIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJwcm92aWRlck5hbWUiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsInByb21pc2VGaW5hbGx5IiwiY2FsbGJhY2siLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXRGdW5jIiwic2V0VGltZW91dCIsInNldEltbWVkaWF0ZUZ1bmMiLCJzZXRJbW1lZGlhdGUiLCJub29wIiwiYmluZCIsImZuIiwidGhpc0FyZyIsIlByb21pc2VTaGltIiwiVHlwZUVycm9yIiwiX3N0YXRlIiwiX2hhbmRsZWQiLCJfdmFsdWUiLCJfZGVmZXJyZWRzIiwiZG9SZXNvbHZlIiwiaGFuZGxlIiwic2VsZiIsImRlZmVycmVkIiwiX2ltbWVkaWF0ZUZuIiwiY2IiLCJvbkZ1bGZpbGxlZCIsIm9uUmVqZWN0ZWQiLCJwcm9taXNlIiwicmV0IiwiZSIsIm5ld1ZhbHVlIiwiZmluYWxlIiwiX3VuaGFuZGxlZFJlamVjdGlvbkZuIiwibGVuIiwiSGFuZGxlciIsImRvbmUiLCJleCIsInByb20iLCJhcnIiLCJyZW1haW5pbmciLCJyZXMiLCJyYWNlIiwidmFsdWVzIiwiY29uc29sZSIsIndhcm4iLCJyZXNvbHZlZCIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwiT3ZlblBsYXllciIsIk92ZW5QbGF5ZXJTREsiLCJjcmVhdGUiLCJicm93c2VyTmFtZSIsImNvbnRhaW5lckVsZW1lbnQiLCJwbGF5ZXIiLCJwbGF5ZXJJbnN0YW5jZSIsImdldE1lZGlhRWxlbWVudENvbnRhaW5lciIsImdldENvbnRhaW5lcklkIiwiaWQiLCJzZXRBcGkiLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub2RlVHlwZSIsImdldFBsYXllckxpc3QiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJMYSQiLCJnZXRQbGF5ZXJCeUluZGV4IiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwiZ2V0QnJvd3NlciIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1zaWUiLCJhdmlnYXRvciIsImRvY3VtZW50TW9kZSIsIm1hdGNoIiwidWEiLCJzdWJzdHJpbmciLCJzZWxlY3Rvck9yRWxlbWVudCIsInJldHVybk5vZGUiLCIkZWxlbWVudCIsInNlbGVjdG9yIiwibm9kZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlcnkiLCJpc0VsZW1lbnQiLCJmaW5kIiwiY3NzIiwiZWxlbWVudCIsInN0eWxlIiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGFzc05hbWVzIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJyZW1vdmVDbGFzcyIsIlJlZ0V4cCIsImpvaW4iLCJzaG93IiwiZGlzcGxheSIsImhpZGUiLCJhcHBlbmQiLCJodG1sQ29kZSIsImlubmVySFRNTCIsInRleHQiLCJ0ZXh0Q29udGVudCIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJpcyIsIiR0YXJnZXRFbGVtZW50Iiwib2Zmc2V0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImJvZHkiLCJzY3JvbGxUb3AiLCJsZWZ0Iiwic2Nyb2xsTGVmdCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiYXR0ciIsImdldEF0dHJpYnV0ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImh0bWwiLCJyZXBsYWNlV2l0aCIsImFwcGVuZENoaWxkIiwiZ2V0IiwiY2xvc2VzdCIsInNlbGVjdG9yU3RyaW5nIiwibG9nZ2VyIiwicHJldkNvbnNvbGVMb2ciLCJlbmFibGUiLCJnbG9iYWwiLCJzZWxlY3RvcnMiLCJlbGVtZW50cyIsImRvY3VtZW50RWxlbWVudCIsImZpcnN0Q2hpbGQiLCJfcXNhIiwic3R5bGVTaGVldCIsImNzc1RleHQiLCJzY3JvbGxCeSIsInJlbW92ZUF0dHJpYnV0ZSIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiU3RyaW5nIiwiTm9kZSIsInAiLCJET01FeGNlcHRpb24iLCJFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRlZmluZVByb3BlcnR5IiwiRXZlbnQiLCJDQVBUVVJJTkdfUEhBU0UiLCJBVF9UQVJHRVQiLCJCVUJCTElOR19QSEFTRSIsImRlZmluZVByb3BlcnRpZXMiLCJ0YXJnZXQiLCJzcmNFbGVtZW50IiwiY3VycmVudFRhcmdldCIsIl9jdXJyZW50VGFyZ2V0IiwiZXZlbnRQaGFzZSIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwidGltZVN0YW1wIiwiX3RpbWVTdGFtcCIsInN0b3BQcm9wYWdhdGlvbiIsImNhbmNlbEJ1YmJsZSIsInByZXZlbnREZWZhdWx0IiwicmV0dXJuVmFsdWUiLCJkZWZhdWx0UHJldmVudGVkIiwidXNlQ2FwdHVyZSIsImYiLCJEYXRlIiwibm93IiwiYXR0YWNoRXZlbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGV0YWNoRXZlbnQiLCJXaW5kb3ciLCJIVE1MRG9jdW1lbnQiLCJvIiwiQ3VzdG9tRXZlbnQiLCJwYXJhbXMiLCJkZXRhaWwiLCJldnQiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImFkZEV2ZW50IiwicmVtb3ZlRXZlbnQiLCJET01Ub2tlbkxpc3RTaGltIiwicyIsInJlbW92ZVRva2VuRnJvbVN0cmluZyIsInRva2VuIiwic3RyaW5nIiwidG9rZW5zIiwiaWR4IiwiU3ludGF4RXJyb3IiLCJzb21lIiwidW5kZXJseWluZ19zdHJpbmciLCJ0b2tlbl9saXN0IiwidG9nZ2xlIiwiZm9yY2UiLCJuIiwiYWRkVG9FbGVtZW50UHJvdG90eXBlIiwiZ2V0Q2xhc3NMaXN0IiwiZWxlbSIsImdldFJlbExpc3QiLCJyZWxMaXN0IiwiRE9NVG9rZW5MaXN0IiwicHJldmlvdXNTaWJsaW5nIiwiRUxFTUVOVF9OT0RFIiwibmV4dFNpYmxpbmciLCJtYXRjaGVzIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJvTWF0Y2hlc1NlbGVjdG9yIiwibW96TWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwib3duZXJEb2N1bWVudCIsImVsIiwicGFyZW50RWxlbWVudCIsIm1peGluIiwicHMiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJjb252ZXJ0Tm9kZXNJbnRvQU5vZGUiLCJub2RlcyIsIm5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJQYXJlbnROb2RlIiwicHJlcGVuZCIsImluc2VydEJlZm9yZSIsIkRvY3VtZW50IiwiRG9jdW1lbnRGcmFnbWVudCIsIkNoaWxkTm9kZSIsImJlZm9yZSIsInBhcmVudCIsInZpYWJsZVByZXZpb3VzU2libGluZyIsImFmdGVyIiwidmlhYmxlTmV4dFNpYmxpbmciLCJyZXBsYWNlQ2hpbGQiLCJEb2N1bWVudFR5cGUiLCJDaGFyYWN0ZXJEYXRhIiwidHJpbSIsIm5hdHVyYWxIbXMiLCJleHRyYWN0RXh0ZW5zaW9uIiwicGF0aCIsImdldEF6dXJlRmlsZUZvcm1hdCIsImV4dGVuc2lvbiIsImF6dXJlZEZvcm1hdCIsImxhc3RJbmRleE9mIiwic2Vjb25kIiwic2VjTnVtIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiciIsIlN5bWJvbCIsInUiLCJjIiwiaGFzT3duUHJvcGVydHkiLCJ0IiwiYSIsIl93cmFwcGVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIlZFUlNJT04iLCJ2IiwieSIsImQiLCJpdGVyYXRlZSIsImlkZW50aXR5IiwiaXNGdW5jdGlvbiIsImlzT2JqZWN0IiwibWF0Y2hlciIsInByb3BlcnR5IiwiZyIsIm1heCIsIm0iLCJiIiwieCIsInBvdyIsIkEiLCJlYWNoIiwiY29sbGVjdCIsIk8iLCJyZWR1Y2UiLCJmb2xkbCIsImluamVjdCIsInJlZHVjZVJpZ2h0IiwiZm9sZHIiLCJkZXRlY3QiLCJmaW5kS2V5Iiwic2VsZWN0IiwibmVnYXRlIiwiYW55IiwiaW5jbHVkZXMiLCJpbmNsdWRlIiwiaW52b2tlIiwicGx1Y2siLCJ3aGVyZSIsIm1pbiIsInNodWZmbGUiLCJzYW1wbGUiLCJyYW5kb20iLCJjbG9uZSIsInNvcnRCeSIsImNyaXRlcmlhIiwiZ3JvdXBCeSIsImluZGV4QnkiLCJjb3VudEJ5IiwiUyIsInRvQXJyYXkiLCJpc1N0cmluZyIsInNpemUiLCJwYXJ0aXRpb24iLCJmaXJzdCIsImhlYWQiLCJ0YWtlIiwiaW5pdGlhbCIsImxhc3QiLCJyZXN0IiwidGFpbCIsImRyb3AiLCJjb21wYWN0IiwiQm9vbGVhbiIsIk0iLCJpc0FyZ3VtZW50cyIsImZsYXR0ZW4iLCJ3aXRob3V0IiwiZGlmZmVyZW5jZSIsInVuaXEiLCJ1bmlxdWUiLCJpc0Jvb2xlYW4iLCJ1bmlvbiIsImludGVyc2VjdGlvbiIsInVuemlwIiwiemlwIiwiRiIsImZpbmRMYXN0SW5kZXgiLCJzb3J0ZWRJbmRleCIsIkUiLCJyYW5nZSIsImNlaWwiLCJjaHVuayIsIk4iLCJwYXJ0aWFsIiwicGxhY2Vob2xkZXIiLCJiaW5kQWxsIiwibWVtb2l6ZSIsImNhY2hlIiwiZGVsYXkiLCJkZWZlciIsInRocm90dGxlIiwibGVhZGluZyIsImNsZWFyVGltZW91dCIsInRyYWlsaW5nIiwiY2FuY2VsIiwiZGVib3VuY2UiLCJ3cmFwIiwiY29tcG9zZSIsInJlc3RBcmd1bWVudHMiLCJJIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJUIiwiQiIsImFsbEtleXMiLCJtYXBPYmplY3QiLCJwYWlycyIsImludmVydCIsImZ1bmN0aW9ucyIsIm1ldGhvZHMiLCJSIiwiZXh0ZW5kIiwiZXh0ZW5kT3duIiwiYXNzaWduIiwicSIsIksiLCJ6Iiwib21pdCIsImRlZmF1bHRzIiwidGFwIiwiaXNNYXRjaCIsInZhbHVlT2YiLCJwb3AiLCJpc0VxdWFsIiwiaXNFbXB0eSIsIkQiLCJjaGlsZE5vZGVzIiwiSW50OEFycmF5IiwiaXNGaW5pdGUiLCJpc1N5bWJvbCIsImlzTnVsbCIsImlzVW5kZWZpbmVkIiwiaGFzIiwibm9Db25mbGljdCIsImNvbnN0YW50IiwicHJvcGVydHlPZiIsInRpbWVzIiwiZ2V0VGltZSIsIkwiLCJQIiwiVyIsImVzY2FwZSIsInVuZXNjYXBlIiwiQyIsInVuaXF1ZUlkIiwidGVtcGxhdGVTZXR0aW5ncyIsImV2YWx1YXRlIiwiaW50ZXJwb2xhdGUiLCJKIiwiVSIsIlYiLCIkIiwidGVtcGxhdGUiLCJ2YXJpYWJsZSIsIkZ1bmN0aW9uIiwiY2hhaW4iLCJfY2hhaW4iLCJHIiwidG9KU09OIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0Rhc2giLCJnZXRTY3JpcHRQYXRoIiwic2NyaXB0TmFtZSIsInNjcmlwdHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInNyYyIsIkZ1bGxTY3JlZW5CdXR0b24iLCIkY29udGFpbmVyIiwiYXBpIiwiJHJvb3QiLCIkaWNvbkV4cGFuZCIsIiRpY29uQ29tcHJlc3MiLCJpc0Z1bGxTY3JlZW4iLCJmdWxsU2NyZWVuRXZlbnRUeXBlcyIsIm9uZnVsbHNjcmVlbmNoYW5nZSIsIm9ubW96ZnVsbHNjcmVlbmNoYW5nZSIsIm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSIsIk1TRnVsbHNjcmVlbkNoYW5nZSIsImZ1bGxTY3JlZW5DaGFuZ2VkQ2FsbGJhY2siLCJjaGVja0Z1bGxTY3JlZW4iLCJmdWxsc2NyZWVuRWxlbWVudCIsIndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IiwibW96RnVsbFNjcmVlbkVsZW1lbnQiLCJtc0Z1bGxzY3JlZW5FbGVtZW50IiwicmVxdWVzdEZ1bGxTY3JlZW4iLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwibW96UmVxdWVzdEZ1bGxTY3JlZW4iLCJtc1JlcXVlc3RGdWxsc2NyZWVuIiwiZXhpdEZ1bGxTY3JlZW4iLCJleGl0RnVsbHNjcmVlbiIsIndlYmtpdEV4aXRGdWxsc2NyZWVuIiwibW96Q2FuY2VsRnVsbFNjcmVlbiIsIm1zRXhpdEZ1bGxzY3JlZW4iLCJ0b2dnbGVGdWxsU2NyZWVuIiwib25SZW5kZXJlZCIsIiRjdXJyZW50IiwiZXZlbnROYW1lIiwib25EZXN0cm95ZWQiLCJDb250cm9scyIsInZvbHVtZUJ1dHRvbiIsInBsYXlCdXR0b24iLCJwcm9ncmVzc0JhciIsInRpbWVEaXNwbGF5IiwiZnVsbFNjcmVlbkJ1dHRvbiIsImdlbmVyYXRlTWFpblBhbmVsRGF0YSIsInBhbmVsIiwidGl0bGUiLCJpc01haW4iLCJJbmZpbml0eSIsImluaXRUaW1lRGlzcGxheSIsImluaXRQcm9ncmVzc0JhciIsInNldE1vdXNlRG93biIsIlNldHRpbmdQYW5lbExpc3QiLCJzZXR0aW5nUGFuZWwiLCJQbGF5QnV0dG9uIiwiJGljb25QbGF5IiwiJGljb25QYXVzZSIsIiRpY29uUmVwbGF5Iiwic2V0QnV0dG9uU3RhdGUiLCJuZXdzdGF0ZSIsImN1cnJlbnRTdGF0ZSIsIlByb2dyZXNzQmFyIiwiY3VycmVudFBsYXlpbmdQb3NpdGlvbiIsImN1cnJlbnRQbGF5aW5nUGVyY2VudGFnZSIsImN1cnJlbnRMb2FkZWRQZXJjZW50YWdlIiwibW91c2VJbnNpZGUiLCJtb3VzZURvd24iLCIkcHJvZ3Jlc3NCYXIiLCIkcHJvZ3Jlc3NMb2FkIiwiJHByb2dyZXNzUGxheSIsIiRwcm9ncmVzc0hvdmVyIiwiJGtub2JDb250YWluZXIiLCIka25vYiIsImtub2JXaWR0aCIsIiR0aW1lIiwicG9zaXRpb25FbGVtZW50cyIsInBlcmNlbnRhZ2UiLCJwcm9ncmVzc0JhcldpZHRoIiwia25vYlBvc3Rpb24iLCJkcmF3SG92ZXJQcm9ncmVzcyIsImhvdmVyUG9zaXRpb24iLCJkcmF3TG9hZFByb2dyZXNzIiwibG9hZFBvc2l0aW9uIiwiY2FsY3VsYXRlUGVyY2VudGFnZSIsInByb2dyZXNzQmFyT2Zmc2V0WCIsInBvaW50ZXJPZmZzZXRYIiwicGFnZVgiLCJkcmF3VGltZUluZGljYXRvciIsImhtcyIsInRpbWVFbGVtV2lkdGgiLCJwb3NpdGlvbk9mUGl4ZWwiLCJjYWxjdWxhdGVNYWduZXRpYyIsIm1hZ25ldGljUG9zaXRpb24iLCJidWZmZXJQZXJjZW50IiwiUExBWUVSX01JTl9IRUlHSFQiLCJTZXR0aW5nUGFuZWwiLCJleHRyYWN0UGFuZWxEYXRhIiwicGFuZWxUeXBlIiwicGxheUJhY2tSYXRlcyIsImN1cnJlbnRQbGF5YmFja1JhdGUiLCJpc0NoZWNrIiwicXVhbGl0eUxldmVscyIsInNldHRpbmdJdGVtVGVtcGxhdGUiLCJzZXR0aW5nVmFsdWVUZW1wbGF0ZSIsIlRpbWVEaXNwbGF5IiwiJHBvc2l0aW9uIiwiJGR1cmF0aW9uIiwiY29udmVydEh1bWFuaXplVGltZSIsInRpbWUiLCJWb2x1bWVCdXR0b24iLCIkc2xpZGVyQ29udGFpbmVyIiwiJHNsaWRlciIsIiRzbGlkZXJIYW5kbGUiLCIkc2xpZGVyVmFsdWUiLCIkdm9sdW1lSWNvbkJpZyIsIiR2b2x1bWVJY29uU21hbGwiLCIkdm9sdW1lSWNvbk11dGUiLCJzbGlkZXJXaWR0aCIsImhhbmRsZVdpZHRoIiwibWluUmFuZ2UiLCJtYXhSYW5nZSIsInNldFZvbHVtZUljb24iLCJzZXRWb2x1bWVVSSIsImhhbmRsZVBvc2l0aW9uIiwicmVsYXRpdmVYIiwiT3ZlblRlbXBsYXRlIiwidGVtcGxhdGVOYW1lIiwiaXNSb290IiwiJHRlbXBsYXRlIiwidmlld0V2ZW50cyIsImNyZWF0ZUFuZFNlbGVjdEVsZW1lbnQiLCJuZXdFbGVtZW50IiwiVGVtcGxhdGVzIiwiZXhwbG9kZWRUZXh0IiwiZXZlbnRTdHJpbmciLCIkdGFyZ2V0Iiwid3JhcHBlZEZ1bmMiLCJub2RlTGVuZ3RoIiwiVGV4dFZpZXdUZW1wbGF0ZSIsIlZpZXdUZW1wbGF0ZSIsIkhlbHBlclRlbXBsYXRlIiwiQmlnQnV0dG9uVGVtcGxhdGUiLCJNZXNzYWdlQm94VGVtcGxhdGUiLCJTcGlubmVyVGVtcGxhdGUiLCJDb250ZXh0UGFuZWxUZW1wbGF0ZSIsIkNvbnRyb2xzVGVtcGxhdGUiLCJWb2x1bWVCdXR0b25UZW1wbGF0ZSIsIlByb2dyZXNzQmFyVGVtcGxhdGUiLCJQbGF5QnV0dG9uVGVtcGxhdGUiLCJUaW1lRGlzcGxheVRlbXBsYXRlIiwiRnVsbFNjcmVlbkJ1dHRvblRlbXBsYXRlIiwiU2V0dGluZ1BhbmVsVGVtcGxhdGUiLCJCaWdCdXR0b24iLCJwbGF5ZXJTdGF0ZSIsIkNvbnRleHRQYW5lbCIsInBhbmVsV2lkdGgiLCJwYW5lbEhlaWdodCIsInBhZ2VZIiwib3BlbiIsIkhlbHBlciIsImJpZ0J1dHRvbiIsIm1lc3NhZ2VCb3giLCJzcGlubmVyIiwiY3JlYXRlQmlnQnV0dG9uIiwiY3JlYXRlTWVzc2FnZSIsIndpdGhUaW1lciIsIk1lc3NhZ2VCb3giLCJhdXRvRGVzdHJveVRpbWVyIiwiU3Bpbm5lciIsIiRzcGlubmVyIiwiaXNTaG93IiwiVmlldyIsImNvbnRyb2xzIiwiaGVscGVyIiwiJHBsYXllclJvb3QiLCJjb250ZXh0UGFuZWwiLCJhdXRvSGlkZVRpbWVyIiwic2V0SGlkZSIsImF1dG9IaWRlIiwidG9nZ2xlUGxheVBhdXNlIiwiaXNSZXdpbmQiLCJjdXJyZW50UG9zaXRpb24iLCJpc1VwIiwiY3VycmVudFZvbHVtbiIsIm5ld1ZvbHVtZSIsImNyZWF0ZUNvbnRleHRQYW5lbCIsImtleUNvZGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxpREFBeUMsa2pCQUFrakI7QUFDM2xCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQSx5Q0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUF3QixrQ0FBa0M7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RUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeEZBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JCQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7QUNBQSx1RTs7Ozs7Ozs7Ozs7O0FDQ0E7O0FBRUE7O0FBRUE7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a1FDbkJBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7OztBQU1BLElBQU1BLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxTQUFULEVBQW1CO0FBQzNCLFFBQUlDLGFBQWEsdUJBQWpCO0FBQ0EsUUFBTUMsT0FBTyxFQUFiO0FBQ0EsZ0NBQWFBLElBQWI7O0FBRUFDLHNCQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXFCQyxnQkFBM0M7QUFDQUYsc0JBQWtCQyxHQUFsQixDQUFzQixhQUF0QjtBQUNBOztBQUVBLFFBQUlFLGtCQUFrQix3QkFBdEI7QUFDQSxRQUFJQyxxQkFBcUIsMkJBQXpCO0FBQ0EsUUFBSUMsa0JBQWtCLEVBQXRCO0FBQ0EsUUFBSUMsZUFBZSxFQUFuQjtBQUNBLFFBQUlDLFlBQVksRUFBaEI7O0FBRUEsUUFBTUMsZUFBZSxTQUFmQSxZQUFlLENBQVNDLGdCQUFULEVBQTBCO0FBQzNDLFlBQU1DLHdCQUF3QixTQUF4QkEscUJBQXdCLENBQUNDLE9BQUQsRUFBWTtBQUN0QyxnQkFBSUMsVUFBVSxDQUFkO0FBQ0EsZ0JBQUlELE9BQUosRUFBYTtBQUNULHFCQUFLLElBQUlFLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsUUFBUUcsTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLHdCQUFJRixRQUFRRSxDQUFSLEVBQVdFLE9BQWYsRUFBd0I7QUFDcEJILGtDQUFVQyxDQUFWO0FBQ0g7QUFDRCx3QkFBSVAsYUFBYVUsZUFBYixNQUFrQ0wsUUFBUUUsQ0FBUixFQUFXSSxLQUFYLEtBQXFCWCxhQUFhVSxlQUFiLEVBQTNELEVBQTRGO0FBQ3hGLCtCQUFPSCxDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsbUJBQU9ELE9BQVA7QUFDSCxTQWJEOztBQWVBLGVBQU9SLG1CQUFtQmMsYUFBbkIsQ0FBaUNmLGdCQUFnQmdCLFdBQWhCLEVBQWpDLEVBQWdFQyxJQUFoRSxDQUFxRSxxQkFBYTtBQUNyRixnQkFBR2YsZUFBSCxFQUFtQjtBQUNmQSxnQ0FBZ0JnQixPQUFoQjtBQUNBaEIsa0NBQWtCLElBQWxCO0FBQ0g7O0FBRUQsZ0JBQUlpQixxQkFBcUJaLHNCQUFzQlAsZ0JBQWdCb0IsaUJBQWhCLEVBQXRCLENBQXpCO0FBQ0F2Qiw4QkFBa0JDLEdBQWxCLENBQXVCLDRCQUEyQnFCLGtCQUFsRDs7QUFFQTtBQUNBakIsOEJBQWtCbUIsVUFBVUYsa0JBQVYsRUFBOEJ6QixTQUE5QixFQUF5Q1MsWUFBekMsQ0FBbEI7O0FBRUEsZ0JBQUdELGdCQUFnQm9CLE9BQWhCLE9BQThCQyx3QkFBakMsRUFBK0M7QUFDM0M7QUFDQSx5QkFBYzNCLElBQWQsRUFBb0IscUNBQWlCTSxlQUFqQixDQUFwQjtBQUNIOztBQUVEO0FBQ0FBLDRCQUFnQnNCLEVBQWhCLENBQW1CLEtBQW5CLEVBQTBCLFVBQVNDLElBQVQsRUFBZUMsSUFBZixFQUFvQjtBQUMxQzlCLHFCQUFLK0IsT0FBTCxDQUFhRixJQUFiLEVBQW1CQyxJQUFuQjs7QUFFQTtBQUNBLG9CQUFLRCxTQUFTRyxnQkFBVCxLQUFtQkYsS0FBS0csSUFBTCxLQUFjQyw0QkFBZCxJQUFtQ0MsU0FBU0wsS0FBS0csSUFBTCxHQUFVLEdBQW5CLE1BQTRCLENBQWxGLENBQUQsSUFBeUZKLFNBQVNPLDRCQUF0RyxFQUF5SDtBQUNySCx3QkFBSUMsaUJBQWlCckMsS0FBS3NDLGlCQUFMLEVBQXJCO0FBQ0Esd0JBQUdELGVBQWVFLEtBQWYsR0FBcUIsQ0FBckIsR0FBeUJ2QyxLQUFLd0MsZ0JBQUwsR0FBd0J6QixNQUFwRCxFQUEyRDtBQUN2RDtBQUNBZiw2QkFBS3lDLEtBQUw7O0FBRUF6Qyw2QkFBSzBDLGlCQUFMLENBQXVCTCxlQUFlRSxLQUFmLEdBQXFCLENBQTVDO0FBQ0g7QUFDSjtBQUNKLGFBYkQ7QUFlSCxTQWpDTSxFQWlDSmxCLElBakNJLENBaUNDLFlBQUk7O0FBRVI7QUFDQWYsNEJBQWdCcUMsT0FBaEIsQ0FBd0J2QyxnQkFBZ0JvQixpQkFBaEIsRUFBeEIsRUFBNkRkLGdCQUE3RCxFQUFnRlcsSUFBaEYsQ0FBcUYsWUFBVTtBQUMzRmIsMEJBQVVvQyxLQUFWO0FBQ0E7QUFDQXBDLDBCQUFVYyxPQUFWOztBQUVBdEIscUJBQUsrQixPQUFMLENBQWFjLGdCQUFiO0FBQ0gsYUFORDtBQU9ILFNBM0NNLEVBMkNKQyxLQTNDSSxDQTJDRSxVQUFDQyxLQUFELEVBQVc7QUFDaEIsZ0JBQU1DLGNBQWMsRUFBQ2YsTUFBT2dCLHFCQUFSLEVBQW9CQyxRQUFTLGFBQTdCLEVBQTRDQyxTQUFVLG9CQUF0RCxFQUE0RUosT0FBUUEsS0FBcEYsRUFBcEI7QUFDQS9DLGlCQUFLK0IsT0FBTCxDQUFhQyxnQkFBYixFQUFvQmdCLFdBQXBCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0F4QyxzQkFBVTRDLG1CQUFWLENBQThCLE1BQTlCO0FBQ0gsU0FwRE0sQ0FBUDtBQXFESCxLQXJFRDs7QUF3RUE7Ozs7OztBQU1BcEQsU0FBS3FELElBQUwsR0FBWSxVQUFDQyxPQUFELEVBQVk7QUFDcEI7QUFDQTlDLG9CQUFZLG1DQUFvQlIsSUFBcEIsRUFBMEIsQ0FBQyxNQUFELEVBQVEsTUFBUixFQUFlLE9BQWYsRUFBdUIsTUFBdkIsRUFBOEIsTUFBOUIsRUFBc0MsYUFBdEMsRUFBcUQsYUFBckQsRUFBb0UsV0FBcEUsRUFBaUYsU0FBakYsRUFBNEYsV0FBNUYsRUFBeUcsVUFBekcsQ0FBMUIsQ0FBWjtBQUNBTyx1QkFBZSw0QkFBYStDLE9BQWIsQ0FBZjtBQUNBLFlBQUcsQ0FBQy9DLGFBQWFnRCxPQUFiLEVBQUosRUFBMkI7QUFDdkJ4RCx1QkFBV3lELE9BQVg7QUFDSDtBQUNEdkQsMEJBQWtCQyxHQUFsQixDQUFzQixjQUF0QjtBQUNBRCwwQkFBa0JDLEdBQWxCLENBQXNCLHdCQUF0QixFQUFnREssWUFBaEQ7O0FBRUFILHdCQUFnQnFELFdBQWhCLENBQTRCbEQsYUFBYWEsV0FBYixFQUE1QjtBQUNBbkIsMEJBQWtCQyxHQUFsQixDQUFzQix5QkFBdEIsRUFBa0RFLGdCQUFnQm9CLGlCQUFoQixFQUFsRDtBQUNBZjtBQUNILEtBYkQ7O0FBZUE7Ozs7QUFJQVQsU0FBSzBELFNBQUwsR0FBaUIsWUFBTTtBQUNuQnpELDBCQUFrQkMsR0FBbEIsQ0FBc0IsbUJBQXRCLEVBQTJDSyxhQUFhbUQsU0FBYixFQUEzQztBQUNBLGVBQU9uRCxhQUFhbUQsU0FBYixFQUFQO0FBQ0gsS0FIRDs7QUFLQTFELFNBQUsyRCxXQUFMLEdBQW1CLFlBQU07QUFDckIsWUFBRyxDQUFDckQsZUFBSixFQUFvQjtBQUFDO0FBQVE7QUFDN0JMLDBCQUFrQkMsR0FBbEIsQ0FBc0IscUJBQXRCLEVBQTZDSSxnQkFBZ0JxRCxXQUFoQixFQUE3QztBQUNBLGVBQU9yRCxnQkFBZ0JxRCxXQUFoQixFQUFQO0FBQ0gsS0FKRDtBQUtBM0QsU0FBSzRELFdBQUwsR0FBbUIsWUFBTTtBQUNyQixZQUFHLENBQUN0RCxlQUFKLEVBQW9CO0FBQUM7QUFBUTtBQUM3QkwsMEJBQWtCQyxHQUFsQixDQUFzQixxQkFBdEIsRUFBNkNJLGdCQUFnQnNELFdBQWhCLEVBQTdDO0FBQ0EsZUFBT3RELGdCQUFnQnNELFdBQWhCLEVBQVA7QUFDSCxLQUpEO0FBS0E1RCxTQUFLNkQsU0FBTCxHQUFpQixZQUFNO0FBQ25CLFlBQUcsQ0FBQ3ZELGVBQUosRUFBb0I7QUFBQztBQUFRO0FBQzdCTCwwQkFBa0JDLEdBQWxCLENBQXNCLG1CQUF0QixFQUEyQ0ksZ0JBQWdCdUQsU0FBaEIsRUFBM0M7QUFDQSxlQUFPdkQsZ0JBQWdCdUQsU0FBaEIsRUFBUDtBQUNILEtBSkQ7QUFLQTdELFNBQUs4RCxTQUFMLEdBQWlCLFVBQUNDLE1BQUQsRUFBWTtBQUN6QixZQUFHLENBQUN6RCxlQUFKLEVBQW9CO0FBQUM7QUFBUTtBQUM3QkwsMEJBQWtCQyxHQUFsQixDQUFzQix1QkFBdUI2RCxNQUE3QztBQUNBekQsd0JBQWdCd0QsU0FBaEIsQ0FBMEJDLE1BQTFCO0FBQ0gsS0FKRDtBQUtBL0QsU0FBS2dFLE9BQUwsR0FBZSxVQUFDQyxLQUFELEVBQVc7QUFDdEIsWUFBRyxDQUFDM0QsZUFBSixFQUFvQjtBQUFDO0FBQVE7QUFDN0JMLDBCQUFrQkMsR0FBbEIsQ0FBc0IscUJBQXFCK0QsS0FBM0M7QUFDQSxlQUFPM0QsZ0JBQWdCMEQsT0FBaEIsQ0FBd0JDLEtBQXhCLENBQVA7QUFDSCxLQUpEO0FBS0FqRSxTQUFLa0UsT0FBTCxHQUFlLFlBQU07QUFDakIsWUFBRyxDQUFDNUQsZUFBSixFQUFvQjtBQUFDO0FBQVE7QUFDN0JMLDBCQUFrQkMsR0FBbEIsQ0FBc0IscUJBQXFCSSxnQkFBZ0I0RCxPQUFoQixFQUEzQztBQUNBLGVBQU81RCxnQkFBZ0I0RCxPQUFoQixFQUFQO0FBQ0gsS0FKRDtBQUtBbEUsU0FBS21FLElBQUwsR0FBWSxVQUFDQyxRQUFELEVBQWM7QUFDdEJuRSwwQkFBa0JDLEdBQWxCLENBQXNCLGVBQXRCLEVBQXVDa0UsUUFBdkM7QUFDQTVELG9CQUFZLG1DQUFvQlIsSUFBcEIsRUFBMEIsQ0FBQyxNQUFELEVBQVEsTUFBUixFQUFlLE1BQWYsQ0FBMUIsQ0FBWjs7QUFFQSxZQUFHb0UsUUFBSCxFQUFZO0FBQ1IsZ0JBQUc5RCxlQUFILEVBQW1CO0FBQ2ZBLGdDQUFnQm9DLGlCQUFoQixDQUFrQyxDQUFsQztBQUNIO0FBQ0R0Qyw0QkFBZ0JxRCxXQUFoQixDQUE0QlcsUUFBNUI7QUFDSDtBQUNELGVBQU8zRCxjQUFQO0FBRUgsS0FaRDtBQWFBVCxTQUFLcUUsSUFBTCxHQUFZLFlBQU07QUFDZHBFLDBCQUFrQkMsR0FBbEIsQ0FBc0IsZUFBdEI7QUFDQUksd0JBQWdCK0QsSUFBaEI7QUFDSCxLQUhEO0FBSUFyRSxTQUFLeUMsS0FBTCxHQUFhLFlBQU07QUFDZnhDLDBCQUFrQkMsR0FBbEIsQ0FBc0IsZ0JBQXRCO0FBQ0FJLHdCQUFnQm1DLEtBQWhCO0FBQ0gsS0FIRDtBQUlBekMsU0FBS3NFLElBQUwsR0FBWSxVQUFDQyxRQUFELEVBQWM7QUFDdEJ0RSwwQkFBa0JDLEdBQWxCLENBQXNCLGtCQUFpQnFFLFFBQXZDO0FBQ0FqRSx3QkFBZ0JnRSxJQUFoQixDQUFxQkMsUUFBckI7QUFDSCxLQUhEO0FBSUF2RSxTQUFLd0UsZUFBTCxHQUF1QixVQUFDQyxZQUFELEVBQWlCO0FBQ3BDeEUsMEJBQWtCQyxHQUFsQixDQUFzQiwwQkFBdEIsRUFBa0R1RSxZQUFsRDtBQUNBLGVBQU9uRSxnQkFBZ0JrRSxlQUFoQixDQUFnQ2pFLGFBQWFtRSxzQkFBYixDQUFvQ0QsWUFBcEMsQ0FBaEMsQ0FBUDtBQUNILEtBSEQ7QUFJQXpFLFNBQUsyRSxlQUFMLEdBQXVCLFlBQUs7QUFDeEIxRSwwQkFBa0JDLEdBQWxCLENBQXNCLDBCQUF0QixFQUFrREksZ0JBQWdCcUUsZUFBaEIsRUFBbEQ7QUFDQSxlQUFPckUsZ0JBQWdCcUUsZUFBaEIsRUFBUDtBQUNILEtBSEQ7QUFJQTNFLFNBQUt3QyxnQkFBTCxHQUF3QixZQUFLO0FBQ3pCdkMsMEJBQWtCQyxHQUFsQixDQUFzQiwyQkFBdEIsRUFBbURJLGdCQUFnQmtDLGdCQUFoQixFQUFuRDtBQUNBLGVBQU9sQyxnQkFBZ0JrQyxnQkFBaEIsRUFBUDtBQUNILEtBSEQ7QUFJQXhDLFNBQUtzQyxpQkFBTCxHQUF5QixZQUFLO0FBQzFCckMsMEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEIsRUFBb0RJLGdCQUFnQmdDLGlCQUFoQixFQUFwRDtBQUNBLGVBQU9oQyxnQkFBZ0JnQyxpQkFBaEIsRUFBUDtBQUNILEtBSEQ7QUFJQXRDLFNBQUswQyxpQkFBTCxHQUF5QixVQUFDa0MsWUFBRCxFQUFpQjtBQUN0QzNFLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCLEVBQW9EMEUsWUFBcEQ7O0FBRUEsWUFBSWhFLFVBQVVSLGdCQUFnQm9CLGlCQUFoQixFQUFkO0FBQ0EsWUFBSXFELGdCQUFnQmpFLFFBQVFaLEtBQUtzQyxpQkFBTCxHQUF5QkMsS0FBakMsQ0FBcEI7QUFDQSxZQUFJdUMsWUFBWWxFLFFBQVFnRSxZQUFSLENBQWhCO0FBQ0EsWUFBSWxFLG1CQUFtQlYsS0FBSzRELFdBQUwsRUFBdkI7QUFDQSxZQUFJbUIsaUJBQWlCMUUsbUJBQW1CMEUsY0FBbkIsQ0FBa0NGLGFBQWxDLEVBQWlEQyxTQUFqRCxDQUFyQjtBQUNBO0FBQ0EsWUFBSUUsa0JBQWtCMUUsZ0JBQWdCb0MsaUJBQWhCLENBQWtDa0MsWUFBbEMsRUFBZ0RHLGNBQWhELENBQXRCOztBQUVBLFlBQUcsQ0FBQ0QsU0FBSixFQUFjO0FBQ1YsbUJBQU8sSUFBUDtBQUNIOztBQUVEN0UsMEJBQWtCQyxHQUFsQixDQUFzQiwwQ0FBdEIsRUFBa0U2RSxjQUFsRTs7QUFFQSxZQUFHLENBQUNBLGNBQUosRUFBbUI7QUFDZnZFLHdCQUFZLG1DQUFvQlIsSUFBcEIsRUFBMEIsQ0FBQyxNQUFELENBQTFCLENBQVo7QUFDQVMseUJBQWFDLGdCQUFiO0FBQ0g7O0FBRUQsZUFBT3NFLGVBQVA7QUFDSCxLQXZCRDs7QUF5QkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQWhGLFNBQUtpRixTQUFMLEdBQWlCLFlBQU07QUFDbkJoRiwwQkFBa0JDLEdBQWxCLENBQXNCLG9CQUF0QixFQUE0Q0ksZ0JBQWdCMkUsU0FBaEIsRUFBNUM7QUFDQTNFLHdCQUFnQjJFLFNBQWhCO0FBQ0gsS0FIRDtBQUlBakYsU0FBS2tGLFFBQUwsR0FBZ0IsWUFBTTtBQUNsQixZQUFHLENBQUM1RSxlQUFKLEVBQW9CO0FBQUM7QUFBUTtBQUM3QkwsMEJBQWtCQyxHQUFsQixDQUFzQixtQkFBdEIsRUFBMkNJLGdCQUFnQjRFLFFBQWhCLEVBQTNDO0FBQ0EsZUFBTzVFLGdCQUFnQjRFLFFBQWhCLEVBQVA7QUFDSCxLQUpEO0FBS0FsRixTQUFLbUYsSUFBTCxHQUFZLFlBQU07QUFDZGxGLDBCQUFrQkMsR0FBbEIsQ0FBc0IsZUFBdEI7QUFDQUksd0JBQWdCNkUsSUFBaEI7QUFDSCxLQUhEO0FBSUFuRixTQUFLb0YsTUFBTCxHQUFjLFlBQU07QUFDaEJuRiwwQkFBa0JDLEdBQWxCLENBQXNCLGlCQUF0QjtBQUNBTSxrQkFBVWMsT0FBVjtBQUNBaEIsd0JBQWdCZ0IsT0FBaEI7QUFDQWhCLDBCQUFrQixJQUFsQjtBQUNBRCw2QkFBcUIsSUFBckI7QUFDQUQsMEJBQWtCLElBQWxCO0FBQ0FHLHVCQUFlLElBQWY7O0FBRUFQLGFBQUsrQixPQUFMLENBQWFzRCxrQkFBYjtBQUNBckYsYUFBS3NGLEdBQUw7O0FBRUFyRiwwQkFBa0JDLEdBQWxCLENBQXNCLHNIQUF0QjtBQUNBSCxtQkFBV3VCLE9BQVg7QUFDSCxLQWREOztBQWtCQSxXQUFPdEIsSUFBUDtBQUNILENBdFFEOztrQkEwUWVILEc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNVJmOzs7O0FBSU8sSUFBTTBGLDhDQUFtQixTQUFuQkEsZ0JBQW1CLENBQVNqRixlQUFULEVBQXlCO0FBQ3JELFdBQU87QUFDSGtGLCtCQUF3QiwrQkFBQ0MsTUFBRCxFQUFZO0FBQ2hDLGdCQUFHQSxPQUFPNUQsSUFBUCxJQUFlNEQsT0FBTzNELElBQXpCLEVBQThCO0FBQzFCLHVCQUFPeEIsZ0JBQWdCb0Ysd0JBQWhCLENBQXlDRCxPQUFPNUQsSUFBaEQsRUFBc0Q0RCxPQUFPM0QsSUFBN0QsQ0FBUDtBQUNILGFBRkQsTUFFSztBQUNELHVCQUFPLElBQVA7QUFDSDtBQUNKO0FBUEUsS0FBUDtBQVNILENBVk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKUDs7Ozs7O0FBRUE7Ozs7O0FBS0EsSUFBTTZELGVBQWUsU0FBZkEsWUFBZSxDQUFTckMsT0FBVCxFQUFpQjs7QUFFbEMsUUFBTXNDLHVCQUF1QixTQUF2QkEsb0JBQXVCLENBQVN0QyxPQUFULEVBQWlCO0FBQzFDLFlBQU11QyxXQUFXO0FBQ2JDLGlDQUFxQixDQURSO0FBRWJDLGtDQUFzQixLQUZUO0FBR2JDLDJCQUFlLENBQUMsSUFBRCxFQUFPLEdBQVAsRUFBWSxDQUFaLEVBQWUsR0FBZixFQUFvQixDQUFwQixDQUhGO0FBSWJDLGtCQUFNLEtBSk87QUFLYmxDLG9CQUFRLEVBTEs7QUFNYm1DLG1CQUFPLEdBTk07QUFPYkMsb0JBQVE7QUFQSyxTQUFqQjtBQVNBLFlBQU1DLFlBQVksU0FBWkEsU0FBWSxDQUFVQyxHQUFWLEVBQWU7QUFDN0IsZ0JBQUlBLFFBQVFDLFNBQVosRUFBdUI7QUFDbkIsdUJBQU8sSUFBUDtBQUNIO0FBQ0QsZ0JBQUksT0FBT0QsR0FBUCxLQUFlLFFBQWYsSUFBMkJBLElBQUl0RixNQUFKLEdBQWEsQ0FBNUMsRUFBK0M7QUFDM0Msb0JBQU13RixlQUFlRixJQUFJRyxXQUFKLEVBQXJCO0FBQ0Esb0JBQUlELGlCQUFpQixNQUFyQixFQUE2QjtBQUN6QiwyQkFBTyxJQUFQO0FBQ0g7QUFDRCxvQkFBSUEsaUJBQWlCLE9BQXJCLEVBQThCO0FBQzFCLDJCQUFPLEtBQVA7QUFDSDtBQUNELG9CQUFJLENBQUNFLE1BQU1DLE9BQU9MLEdBQVAsQ0FBTixDQUFELElBQXVCLENBQUNJLE1BQU1FLFdBQVdOLEdBQVgsQ0FBTixDQUE1QixFQUFvRDtBQUNoRCwyQkFBT0ssT0FBT0wsR0FBUCxDQUFQO0FBQ0g7QUFDSjtBQUNELG1CQUFPQSxHQUFQO0FBQ0gsU0FqQkQ7QUFrQkEsWUFBTU8sY0FBYyxTQUFkQSxXQUFjLENBQVV0RCxPQUFWLEVBQW1CO0FBQ25DdUQsbUJBQU9DLElBQVAsQ0FBWXhELE9BQVosRUFBcUJ5RCxPQUFyQixDQUE2QixVQUFDQyxHQUFELEVBQVM7QUFDbEMsb0JBQUlBLFFBQVEsSUFBWixFQUFrQjtBQUNkO0FBQ0g7QUFDRDFELHdCQUFRMEQsR0FBUixJQUFlWixVQUFVOUMsUUFBUTBELEdBQVIsQ0FBVixDQUFmO0FBQ0gsYUFMRDtBQU1ILFNBUEQ7QUFRQSxZQUFNQyxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQVVaLEdBQVYsRUFBZTtBQUNqQyxnQkFBSUEsSUFBSWEsS0FBSixJQUFhYixJQUFJYSxLQUFKLENBQVUsQ0FBQyxDQUFYLE1BQWtCLElBQW5DLEVBQXlDO0FBQ3JDYixzQkFBTUEsSUFBSWEsS0FBSixDQUFVLENBQVYsRUFBYSxDQUFDLENBQWQsQ0FBTjtBQUNIO0FBQ0QsbUJBQU9iLEdBQVA7QUFDSCxTQUxEO0FBTUEsWUFBTWMsc0JBQXNCLFNBQXRCQSxtQkFBc0IsQ0FBVUMsRUFBVixFQUFjbEIsS0FBZCxFQUFxQjtBQUM3QyxnQkFBSUEsTUFBTW1CLFFBQU4sR0FBaUJDLE9BQWpCLENBQXlCLEdBQXpCLE1BQWtDLENBQUMsQ0FBdkMsRUFBMEM7QUFDdEMsdUJBQU8sQ0FBUDtBQUNIO0FBQ0QsZ0JBQUksT0FBT0YsRUFBUCxLQUFjLFFBQWQsSUFBMEIsQ0FBQ0EsRUFBL0IsRUFBbUM7QUFDL0IsdUJBQU8sQ0FBUDtBQUNIO0FBQ0QsZ0JBQUksZUFBZUcsSUFBZixDQUFvQkgsRUFBcEIsQ0FBSixFQUE2QjtBQUN6Qix1QkFBT0EsRUFBUDtBQUNIO0FBQ0QsZ0JBQU03RSxRQUFRNkUsR0FBR0UsT0FBSCxDQUFXLEdBQVgsQ0FBZDtBQUNBLGdCQUFJL0UsVUFBVSxDQUFDLENBQWYsRUFBa0I7QUFDZCx1QkFBTyxDQUFQO0FBQ0g7QUFDRCxnQkFBTWlGLElBQUliLFdBQVdTLEdBQUdLLE1BQUgsQ0FBVSxDQUFWLEVBQWFsRixLQUFiLENBQVgsQ0FBVjtBQUNBLGdCQUFNbUYsSUFBSWYsV0FBV1MsR0FBR0ssTUFBSCxDQUFVbEYsUUFBUSxDQUFsQixDQUFYLENBQVY7QUFDQSxnQkFBSWlGLEtBQUssQ0FBTCxJQUFVRSxLQUFLLENBQW5CLEVBQXNCO0FBQ2xCLHVCQUFPLENBQVA7QUFDSDtBQUNELG1CQUFRQSxJQUFJRixDQUFKLEdBQVEsR0FBVCxHQUFnQixHQUF2QjtBQUNILFNBcEJEO0FBcUJBWixvQkFBWXRELE9BQVo7QUFDQSxZQUFJcUUsU0FBUyxTQUFjLEVBQWQsRUFBa0I5QixRQUFsQixFQUE0QnZDLE9BQTVCLENBQWI7QUFDQXFFLGVBQU96QixLQUFQLEdBQWVlLGNBQWNVLE9BQU96QixLQUFyQixDQUFmO0FBQ0F5QixlQUFPeEIsTUFBUCxHQUFnQmMsY0FBY1UsT0FBT3hCLE1BQXJCLENBQWhCO0FBQ0F3QixlQUFPQyxXQUFQLEdBQXFCVCxvQkFBb0JRLE9BQU9DLFdBQTNCLEVBQXdDRCxPQUFPekIsS0FBL0MsQ0FBckI7O0FBRUEsWUFBSTJCLGVBQWVGLE9BQU81QixvQkFBMUI7QUFDQSxZQUFJOEIsWUFBSixFQUFrQjtBQUNkLGdCQUFJQyxRQUFRSCxPQUFPM0IsYUFBbkI7O0FBRUEsZ0JBQUkrQixNQUFNQyxPQUFOLENBQWNILFlBQWQsQ0FBSixFQUFpQztBQUM3QkMsd0JBQVFELFlBQVI7QUFDSDtBQUNEQyxvQkFBUUEsTUFBTUcsTUFBTixDQUFhO0FBQUEsdUJBQVFDLHFCQUFFQyxRQUFGLENBQVdDLElBQVgsS0FBb0JBLFFBQVEsSUFBNUIsSUFBb0NBLFFBQVEsQ0FBcEQ7QUFBQSxhQUFiLEVBQ0hDLEdBREcsQ0FDQztBQUFBLHVCQUFRQyxLQUFLQyxLQUFMLENBQVdILE9BQU8sQ0FBbEIsSUFBdUIsQ0FBL0I7QUFBQSxhQURELENBQVI7O0FBR0EsZ0JBQUlOLE1BQU1SLE9BQU4sQ0FBYyxDQUFkLElBQW1CLENBQXZCLEVBQTBCO0FBQ3RCUSxzQkFBTVUsSUFBTixDQUFXLENBQVg7QUFDSDtBQUNEVixrQkFBTVcsSUFBTjs7QUFFQWQsbUJBQU81QixvQkFBUCxHQUE4QixJQUE5QjtBQUNBNEIsbUJBQU8zQixhQUFQLEdBQXVCOEIsS0FBdkI7QUFDSDs7QUFHRCxZQUFJLENBQUNILE9BQU81QixvQkFBUixJQUFnQzRCLE9BQU8zQixhQUFQLENBQXFCc0IsT0FBckIsQ0FBNkJLLE9BQU83QixtQkFBcEMsSUFBMkQsQ0FBL0YsRUFBa0c7QUFDOUY2QixtQkFBTzdCLG1CQUFQLEdBQTZCLENBQTdCO0FBQ0g7O0FBRUQ2QixlQUFPbEQsWUFBUCxHQUFzQmtELE9BQU83QixtQkFBN0I7O0FBRUEsWUFBSSxDQUFDNkIsT0FBT0MsV0FBWixFQUF5QjtBQUNyQixtQkFBT0QsT0FBT0MsV0FBZDtBQUNIOztBQUVELFlBQU1jLGlCQUFpQmYsT0FBT3ZELFFBQTlCO0FBQ0EsWUFBSSxDQUFDc0UsY0FBTCxFQUFxQjtBQUNqQixnQkFBTUMsTUFBTVQscUJBQUVVLElBQUYsQ0FBT2pCLE1BQVAsRUFBZSxDQUN2QixPQUR1QixFQUV2QixhQUZ1QixFQUd2QixNQUh1QixFQUl2QixTQUp1QixFQUt2QixPQUx1QixFQU12QixNQU51QixFQU92QixTQVB1QixFQVF2QixRQVJ1QixFQVN2QixTQVR1QixFQVV2QixVQVZ1QixFQVd2QixNQVh1QixFQVl2QixhQVp1QixFQWF2QixRQWJ1QixDQUFmLENBQVo7O0FBZ0JBQSxtQkFBT3ZELFFBQVAsR0FBa0IsQ0FBRXVFLEdBQUYsQ0FBbEI7QUFDSCxTQWxCRCxNQWtCTyxJQUFJVCxxQkFBRUYsT0FBRixDQUFVVSxlQUFldEUsUUFBekIsQ0FBSixFQUF3QztBQUMzQ3VELG1CQUFPa0IsUUFBUCxHQUFrQkgsY0FBbEI7QUFDQWYsbUJBQU92RCxRQUFQLEdBQWtCc0UsZUFBZXRFLFFBQWpDO0FBQ0g7O0FBRUQsZUFBT3VELE9BQU9tQixRQUFkO0FBQ0EsZUFBT25CLE1BQVA7QUFDSCxLQTdIRDtBQThIQTFILHNCQUFrQkMsR0FBbEIsQ0FBc0Isc0JBQXRCLEVBQThDb0QsT0FBOUM7QUFDQSxRQUFJcUUsU0FBUy9CLHFCQUFxQnRDLE9BQXJCLENBQWI7O0FBRUEsUUFBSXNFLGNBQWNELE9BQU9DLFdBQVAsSUFBc0IsTUFBeEM7QUFDQSxRQUFJbUIsUUFBUXBCLE9BQU9vQixLQUFuQjtBQUNBLFFBQUlqRCxzQkFBc0I2QixPQUFPN0IsbUJBQVAsSUFBOEIsQ0FBeEQ7QUFDQSxRQUFJa0QsUUFBUXJCLE9BQU9xQixLQUFuQjtBQUNBLFFBQUlqRCx1QkFBdUI0QixPQUFPNUIsb0JBQVAsSUFBK0IsSUFBMUQ7QUFDQSxRQUFJQyxnQkFBZ0IyQixPQUFPM0IsYUFBUCxJQUF3QixDQUFDLEdBQUQsRUFBTSxDQUFOLEVBQVMsSUFBVCxFQUFlLEdBQWYsRUFBb0IsQ0FBcEIsQ0FBNUM7QUFDQSxRQUFJNUIsV0FBV3VELE9BQU92RCxRQUFQLElBQW1CLEVBQWxDO0FBQ0EsUUFBSTZFLGVBQWV0QixPQUFPc0IsWUFBUCxJQUF1QixFQUExQztBQUNBLFFBQUlDLFNBQVN2QixPQUFPdUIsTUFBUCxJQUFpQixLQUE5QjtBQUNBLFFBQUlDLGFBQWF4QixPQUFPd0IsVUFBUCxJQUFxQixTQUF0Qzs7QUFJQSxRQUFNbkosT0FBTyxFQUFiO0FBQ0FBLFNBQUswRCxTQUFMLEdBQWlCLFlBQU07QUFBQyxlQUFPaUUsTUFBUDtBQUFlLEtBQXZDOztBQUVBM0gsU0FBS29KLGNBQUwsR0FBcUIsWUFBSTtBQUFDLGVBQU94QixXQUFQO0FBQW9CLEtBQTlDO0FBQ0E1SCxTQUFLcUosY0FBTCxHQUFxQixVQUFDQyxZQUFELEVBQWdCO0FBQUMxQixzQkFBYzBCLFlBQWQ7QUFBNEIsS0FBbEU7O0FBRUF0SixTQUFLdUQsT0FBTCxHQUFjLFlBQUk7QUFBQyxlQUFPd0YsS0FBUDtBQUFjLEtBQWpDOztBQUVBL0ksU0FBS3VKLHNCQUFMLEdBQTZCLFlBQUk7QUFBQyxlQUFPekQsbUJBQVA7QUFBNEIsS0FBOUQ7QUFDQTlGLFNBQUswRSxzQkFBTCxHQUE2QixVQUFDRCxZQUFELEVBQWdCO0FBQUNxQiw4QkFBc0JyQixZQUF0QixDQUFvQyxPQUFPQSxZQUFQO0FBQXFCLEtBQXZHOztBQUVBekUsU0FBS2lCLGVBQUwsR0FBdUIsWUFBTTtBQUFDLGVBQU9nSSxZQUFQO0FBQXFCLEtBQW5EO0FBQ0FqSixTQUFLd0osZUFBTCxHQUF1QixVQUFDQyxRQUFELEVBQWM7QUFBQ1IsdUJBQWVRLFFBQWY7QUFBeUIsS0FBL0Q7O0FBRUF6SixTQUFLMEosZ0JBQUwsR0FBdUIsWUFBSTtBQUFDLGVBQU8xRCxhQUFQO0FBQXNCLEtBQWxEO0FBQ0FoRyxTQUFLMkosc0JBQUwsR0FBNkIsWUFBSTtBQUFDLGVBQU81RCxvQkFBUDtBQUE2QixLQUEvRDs7QUFFQS9GLFNBQUtvQixXQUFMLEdBQWtCLFlBQUk7QUFBQyxlQUFPZ0QsUUFBUDtBQUFpQixLQUF4QztBQUNBcEUsU0FBS3lELFdBQUwsR0FBa0IsVUFBQ21HLFNBQUQsRUFBYztBQUM1QixZQUFHMUIscUJBQUVGLE9BQUYsQ0FBVTRCLFNBQVYsQ0FBSCxFQUF3QjtBQUNwQnhGLHVCQUFXd0YsU0FBWDtBQUNILFNBRkQsTUFFSztBQUNEeEYsdUJBQVcsQ0FBQ3dGLFNBQUQsQ0FBWDtBQUNIO0FBQ0QsZUFBT3hGLFFBQVA7QUFDSCxLQVBEOztBQVNBcEUsU0FBSzZKLFFBQUwsR0FBZSxZQUFJO0FBQUMsZUFBT1gsTUFBUDtBQUFlLEtBQW5DOztBQUVBbEosU0FBSzhKLGFBQUwsR0FBb0IsWUFBSTtBQUFDLGVBQU9YLFVBQVA7QUFBbUIsS0FBNUM7O0FBRUEsV0FBT25KLElBQVA7QUFDSCxDQWhMRDs7a0JBa0xlMkYsWTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6TGY7Ozs7QUFJQTs7Ozs7O0FBTUEsSUFBTW9FLGVBQWUsU0FBZkEsWUFBZSxDQUFTQyxNQUFULEVBQWdCO0FBQ2pDLFFBQUloSyxPQUFPZ0ssTUFBWDtBQUNBLFFBQUlDLFVBQVMsRUFBYjs7QUFFQSxRQUFNQyxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQVNDLE1BQVQsRUFBaUJDLElBQWpCLEVBQXVCQyxPQUF2QixFQUErQjtBQUNqRCxZQUFJdkosSUFBSSxDQUFSO0FBQ0EsWUFBSUMsU0FBU29KLE9BQU9wSixNQUFwQjtBQUNBLGFBQUlELElBQUksQ0FBUixFQUFXQSxJQUFJQyxNQUFmLEVBQXVCRCxHQUF2QixFQUE0QjtBQUN4QixnQkFBSXdKLFFBQVFILE9BQU9ySixDQUFQLENBQVo7QUFDQXdKLGtCQUFNQyxRQUFOLENBQWVDLEtBQWYsQ0FBd0JGLE1BQU1ELE9BQU4sSUFBaUJBLE9BQXpDLEVBQW9ERCxJQUFwRDtBQUNIO0FBQ0osS0FQRDs7QUFTQXBLLFNBQUs0QixFQUFMLEdBQVUsVUFBU0MsSUFBVCxFQUFlMEksUUFBZixFQUF5QkYsT0FBekIsRUFBaUM7QUFDdkMsU0FBQ0osUUFBUXBJLElBQVIsTUFBa0JvSSxRQUFRcEksSUFBUixJQUFjLEVBQWhDLENBQUQsRUFBdUMyRyxJQUF2QyxDQUE0QyxFQUFFK0IsVUFBVUEsUUFBWixFQUF3QkYsU0FBVUEsT0FBbEMsRUFBNUM7QUFDQSxlQUFPckssSUFBUDtBQUNILEtBSEQ7QUFJQUEsU0FBSytCLE9BQUwsR0FBZSxVQUFTRixJQUFULEVBQWM7QUFDekIsWUFBRyxDQUFDb0ksT0FBSixFQUFZO0FBQ1IsbUJBQU8sS0FBUDtBQUNIO0FBQ0QsWUFBTUcsT0FBTyxHQUFHbEQsS0FBSCxDQUFTdUQsSUFBVCxDQUFjQyxTQUFkLEVBQXlCLENBQXpCLENBQWI7QUFDQSxZQUFNUCxTQUFTRixRQUFRcEksSUFBUixDQUFmO0FBQ0EsWUFBTThJLFlBQVlWLFFBQVFXLEdBQTFCOztBQUVBLFlBQUdULE1BQUgsRUFBVTtBQUNORCwwQkFBY0MsTUFBZCxFQUFzQkMsSUFBdEIsRUFBNEJwSyxJQUE1QjtBQUNIO0FBQ0QsWUFBRzJLLFNBQUgsRUFBYTtBQUNUVCwwQkFBY1MsU0FBZCxFQUF5QkQsU0FBekIsRUFBb0MxSyxJQUFwQztBQUNIO0FBQ0osS0FkRDtBQWVBQSxTQUFLc0YsR0FBTCxHQUFXLFVBQVN6RCxJQUFULEVBQWUwSSxRQUFmLEVBQXlCRixPQUF6QixFQUFpQztBQUN4QyxZQUFHLENBQUNKLE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDs7QUFFRCxZQUFJLENBQUNwSSxJQUFELElBQVMsQ0FBQzBJLFFBQVYsSUFBc0IsQ0FBQ0YsT0FBM0IsRUFBcUM7QUFDakNKLHNCQUFVLEVBQVY7QUFDQSxtQkFBT2pLLElBQVA7QUFDSDs7QUFFRCxZQUFNNkssUUFBUWhKLE9BQU8sQ0FBQ0EsSUFBRCxDQUFQLEdBQWdCZ0YsT0FBT0MsSUFBUCxDQUFZbUQsT0FBWixDQUE5QjtBQUNBLGFBQUssSUFBSW5KLElBQUksQ0FBUixFQUFXZ0ssSUFBSUQsTUFBTTlKLE1BQTFCLEVBQWtDRCxJQUFJZ0ssQ0FBdEMsRUFBeUNoSyxHQUF6QyxFQUE4QztBQUMxQ2UsbUJBQU9nSixNQUFNL0osQ0FBTixDQUFQO0FBQ0EsZ0JBQU1xSixTQUFTRixRQUFRcEksSUFBUixDQUFmO0FBQ0EsZ0JBQUlzSSxNQUFKLEVBQVk7QUFDUixvQkFBTVksU0FBU2QsUUFBUXBJLElBQVIsSUFBZ0IsRUFBL0I7QUFDQSxvQkFBSTBJLFlBQWFGLE9BQWpCLEVBQTBCO0FBQ3RCLHlCQUFLLElBQUlXLElBQUksQ0FBUixFQUFXQyxJQUFJZCxPQUFPcEosTUFBM0IsRUFBbUNpSyxJQUFJQyxDQUF2QyxFQUEwQ0QsR0FBMUMsRUFBK0M7QUFDM0MsNEJBQU1WLFFBQVFILE9BQU9hLENBQVAsQ0FBZDtBQUNBLDRCQUFLVCxZQUFZQSxhQUFhRCxNQUFNQyxRQUEvQixJQUEyQ0EsYUFBYUQsTUFBTUMsUUFBTixDQUFlQSxRQUF2RSxJQUFvRkEsYUFBYUQsTUFBTUMsUUFBTixDQUFlVyxTQUFqSCxJQUNHYixXQUFXQSxZQUFZQyxNQUFNRCxPQURwQyxFQUVFO0FBQ0VVLG1DQUFPdkMsSUFBUCxDQUFZOEIsS0FBWjtBQUNIO0FBQ0o7QUFDSjtBQUNELG9CQUFJLENBQUNTLE9BQU9oSyxNQUFaLEVBQW9CO0FBQ2hCLDJCQUFPa0osUUFBUXBJLElBQVIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELGVBQU83QixJQUFQO0FBQ0gsS0FoQ0Q7QUFpQ0FBLFNBQUttTCxJQUFMLEdBQVksVUFBU3RKLElBQVQsRUFBZTBJLFFBQWYsRUFBeUJGLE9BQXpCLEVBQWlDO0FBQ3pDLFlBQUllLFFBQVEsQ0FBWjtBQUNBLFlBQU1DLGVBQWUsU0FBZkEsWUFBZSxHQUFXO0FBQzVCLGdCQUFJRCxPQUFKLEVBQWE7QUFDVDtBQUNIO0FBQ0RwTCxpQkFBS3NGLEdBQUwsQ0FBU3pELElBQVQsRUFBZXdKLFlBQWY7QUFDQWQscUJBQVNDLEtBQVQsQ0FBZXhLLElBQWYsRUFBcUIwSyxTQUFyQjtBQUNILFNBTkQ7QUFPQVcscUJBQWFDLFNBQWIsR0FBeUJmLFFBQXpCO0FBQ0EsZUFBT3ZLLEtBQUs0QixFQUFMLENBQVFDLElBQVIsRUFBY3dKLFlBQWQsRUFBNEJoQixPQUE1QixDQUFQO0FBQ0gsS0FYRDs7QUFhQSxXQUFPckssSUFBUDtBQUNILENBL0VEOztrQkFpRmUrSixZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRmY7Ozs7OztBQUVBOzs7OztBQUtBLElBQU13QixzQkFBc0IsU0FBdEJBLG1CQUFzQixDQUFVQyxRQUFWLEVBQW9CQyxjQUFwQixFQUFvQztBQUM1RCxRQUFJQyxlQUFlLEVBQW5CO0FBQ0EsUUFBSUMscUJBQXFCLEVBQXpCO0FBQ0EsUUFBSUMsY0FBYyxLQUFsQjtBQUNBLFFBQUk1TCxPQUFPLEVBQVg7QUFDQUMsc0JBQWtCQyxHQUFsQixDQUFzQiw2QkFBdEI7QUFDQXVMLG1CQUFlMUUsT0FBZixDQUF1QixVQUFDOEUsT0FBRCxFQUFhO0FBQ2hDLFlBQU1DLFNBQVNOLFNBQVNLLE9BQVQsQ0FBZjtBQUNBRiwyQkFBbUJFLE9BQW5CLElBQThCQyxVQUFVLFlBQVUsQ0FBRSxDQUFwRDs7QUFFQU4saUJBQVNLLE9BQVQsSUFBb0IsWUFBVztBQUMzQixnQkFBTXpCLE9BQU9yQyxNQUFNZ0UsU0FBTixDQUFnQjdFLEtBQWhCLENBQXNCdUQsSUFBdEIsQ0FBMkJDLFNBQTNCLEVBQXNDLENBQXRDLENBQWI7QUFDRSxnQkFBSSxDQUFDa0IsV0FBTCxFQUFrQjtBQUNoQjtBQUNBNUwscUJBQUtnTSxRQUFMLENBQWNILE9BQWQsRUFBdUJ6QixJQUF2QjtBQUNILGFBSEMsTUFHSztBQUNINkI7QUFDQSxvQkFBSUgsTUFBSixFQUFZO0FBQ1JBLDJCQUFPdEIsS0FBUCxDQUFheEssSUFBYixFQUFtQm9LLElBQW5CO0FBQ0g7QUFDSjtBQUNKLFNBWEQ7QUFZSCxLQWhCRDtBQWlCQSxRQUFJNkIsd0JBQXdCLFNBQXhCQSxxQkFBd0IsR0FBWTtBQUNwQyxlQUFPUCxhQUFhM0ssTUFBYixHQUFzQixDQUE3QixFQUFnQztBQUFBLHNDQUNGMkssYUFBYVEsS0FBYixFQURFO0FBQUEsZ0JBQ3BCTCxPQURvQix1QkFDcEJBLE9BRG9CO0FBQUEsZ0JBQ1h6QixJQURXLHVCQUNYQSxJQURXOztBQUU1QixhQUFDdUIsbUJBQW1CRSxPQUFuQixLQUErQkwsU0FBU0ssT0FBVCxDQUFoQyxFQUFtRHJCLEtBQW5ELENBQXlEZ0IsUUFBekQsRUFBbUVwQixJQUFuRTtBQUNIO0FBQ0osS0FMRDs7QUFPQXBLLFNBQUttTSxjQUFMLEdBQXNCLFVBQUNDLElBQUQsRUFBVTtBQUM1QlIsc0JBQWNRLElBQWQ7QUFDQW5NLDBCQUFrQkMsR0FBbEIsQ0FBc0Isd0NBQXRCLEVBQWdFa00sSUFBaEU7QUFDSCxLQUhEO0FBSUFwTSxTQUFLcU0scUJBQUwsR0FBNkIsWUFBVTtBQUNuQ3BNLDBCQUFrQkMsR0FBbEIsQ0FBc0IsK0NBQXRCLEVBQXVFeUwsa0JBQXZFO0FBQ0EsZUFBT0Esa0JBQVA7QUFDSCxLQUhEO0FBSUEzTCxTQUFLc00sUUFBTCxHQUFnQixZQUFVO0FBQ3RCck0sMEJBQWtCQyxHQUFsQixDQUFzQixrQ0FBdEIsRUFBMERvTSxRQUExRDtBQUNBLGVBQU9aLFlBQVA7QUFDSCxLQUhEO0FBSUExTCxTQUFLZ00sUUFBTCxHQUFnQixVQUFTSCxPQUFULEVBQWtCekIsSUFBbEIsRUFBdUI7QUFDbkNuSywwQkFBa0JDLEdBQWxCLENBQXNCLGtDQUF0QixFQUEwRDJMLE9BQTFELEVBQW1FekIsSUFBbkU7QUFDQXNCLHFCQUFhbEQsSUFBYixDQUFrQixFQUFFcUQsZ0JBQUYsRUFBV3pCLFVBQVgsRUFBbEI7QUFDSCxLQUhEOztBQUtBcEssU0FBSzRDLEtBQUwsR0FBYSxZQUFVO0FBQ25CM0MsMEJBQWtCQyxHQUFsQixDQUFzQiwrQkFBdEI7QUFDQStMO0FBQ0gsS0FIRDtBQUlBak0sU0FBS3VNLEtBQUwsR0FBYSxZQUFXO0FBQ3BCdE0sMEJBQWtCQyxHQUFsQixDQUFzQiwrQkFBdEI7QUFDQXdMLHFCQUFhM0ssTUFBYixHQUFzQixDQUF0QjtBQUNILEtBSEQ7QUFJQWYsU0FBS3NGLEdBQUwsR0FBVyxZQUFXO0FBQ2xCckYsMEJBQWtCQyxHQUFsQixDQUFzQiw2QkFBdEI7QUFDQXVMLHVCQUFlMUUsT0FBZixDQUF1QixVQUFDOEUsT0FBRCxFQUFhO0FBQ2hDLGdCQUFNQyxTQUFTSCxtQkFBbUJFLE9BQW5CLENBQWY7QUFDQSxnQkFBSUMsTUFBSixFQUFZO0FBQ1JOLHlCQUFTSyxPQUFULElBQW9CQyxNQUFwQjtBQUNBLHVCQUFPSCxtQkFBbUJFLE9BQW5CLENBQVA7QUFDSDtBQUNKLFNBTkQ7QUFPSCxLQVREOztBQVlBO0FBQ0E3TCxTQUFLb0QsbUJBQUwsR0FBMkIsVUFBU29KLFFBQVQsRUFBa0I7QUFDekMsWUFBSUMsbUJBQW1CdkUscUJBQUV3RSxTQUFGLENBQVloQixZQUFaLEVBQTBCLEVBQUNHLFNBQVVXLFFBQVgsRUFBMUIsQ0FBdkI7QUFDQXZNLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNkNBQXRCLEVBQXFFc00sUUFBckU7QUFDQWQscUJBQWFpQixNQUFiLENBQW9CekUscUJBQUUwRSxTQUFGLENBQVlsQixZQUFaLEVBQTBCLEVBQUNHLFNBQVVXLFFBQVgsRUFBMUIsQ0FBcEIsRUFBcUUsQ0FBckU7O0FBRUEsWUFBTVYsU0FBU0gsbUJBQW1CYSxRQUFuQixDQUFmO0FBQ0EsWUFBSVYsTUFBSixFQUFZO0FBQ1I3TCw4QkFBa0JDLEdBQWxCLENBQXNCLGlCQUF0QjtBQUNBLGdCQUFHdU0sZ0JBQUgsRUFBb0I7QUFDaEIsaUJBQUNYLFVBQVNOLFNBQVNnQixRQUFULENBQVYsRUFBOEJoQyxLQUE5QixDQUFvQ2dCLFFBQXBDLEVBQThDaUIsaUJBQWlCckMsSUFBL0Q7QUFDSDtBQUNEb0IscUJBQVNnQixRQUFULElBQXFCVixNQUFyQjtBQUNBLG1CQUFPSCxtQkFBbUJhLFFBQW5CLENBQVA7QUFDSDtBQUNKLEtBZEQ7O0FBZ0JBeE0sU0FBS3NCLE9BQUwsR0FBZSxZQUFXO0FBQ3RCckIsMEJBQWtCQyxHQUFsQixDQUFzQixpQ0FBdEI7QUFDQUYsYUFBS3NGLEdBQUw7QUFDQXRGLGFBQUt1TSxLQUFMO0FBQ0gsS0FKRDtBQUtBLFdBQU92TSxJQUFQO0FBQ0gsQ0ExRkQ7O2tCQTRGZXVMLG1COzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuR2Y7O0FBRUE7Ozs7O0FBS0EsSUFBTXNCLGlCQUFpQixTQUFqQkEsY0FBaUIsR0FBVTtBQUM3QixRQUFNN00sT0FBTyxFQUFiO0FBQ0FDLHNCQUFrQkMsR0FBbEIsQ0FBc0Isd0JBQXRCO0FBQ0EsUUFBTTRNLGNBQWMsQ0FDaEI7QUFDSWpMLGNBQU0sT0FEVjtBQUVJa0wsc0JBQWMsc0JBQVVDLE1BQVYsRUFBa0I7QUFDNUIsZ0JBQU1DLFlBQVk7QUFDZEMscUJBQUssV0FEUztBQUVkQyxxQkFBSyxXQUZTO0FBR2RDLHFCQUFLLFdBSFM7QUFJZEMscUJBQUssV0FKUztBQUtkQyxxQkFBSyxXQUxTO0FBTWRDLHFCQUFLLFlBTlM7QUFPZEMsc0JBQU0sWUFQUTtBQVFkQyxxQkFBSyxXQVJTO0FBU2RDLHFCQUFLLFdBVFM7QUFVZEMscUJBQUssV0FWUztBQVdkQyx3QkFBUSxXQVhNO0FBWWRDLHNCQUFNLFlBWlE7QUFhZEMscUJBQUssV0FiUztBQWNkQyxzQkFBTSwrQkFkUTtBQWVkQyxxQkFBSywrQkFmUztBQWdCZEMscUJBQUs7QUFoQlMsYUFBbEI7O0FBbUJBLGdCQUFNQyxRQUFRLFlBQVU7QUFDcEIsdUJBQU9DLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUDtBQUNILGFBRmEsRUFBZDtBQUdBLGdCQUFJLENBQUNGLE1BQU1HLFdBQVgsRUFBd0I7QUFDcEIsdUJBQU8sS0FBUDtBQUNIOztBQUVELGdCQUFNQyxPQUFPdEIsT0FBT3NCLElBQXBCO0FBQ0EsZ0JBQU1DLE9BQU92QixPQUFPdUIsSUFBcEI7QUFDQSxnQkFBRyxDQUFDQSxJQUFKLEVBQVM7QUFBQyx1QkFBTyxLQUFQO0FBQWM7QUFDeEIsZ0JBQU1DLFdBQVd4QixPQUFPd0IsUUFBUCxJQUFtQnZCLFVBQVVzQixJQUFWLENBQXBDOztBQUVBLGdCQUFJLHVCQUFPRCxJQUFQLEVBQWFDLElBQWIsQ0FBSixFQUF3QjtBQUNwQix1QkFBTyxLQUFQO0FBQ0g7O0FBRUQsZ0JBQUcseUJBQVNELElBQVQsRUFBZUMsSUFBZixDQUFILEVBQXdCO0FBQ3BCLHVCQUFPLEtBQVA7QUFDSDs7QUFFRCxnQkFBSSxDQUFDQyxRQUFMLEVBQWU7QUFDWCx1QkFBTyxLQUFQO0FBQ0g7O0FBRUQsbUJBQU8sQ0FBQyxDQUFDTixNQUFNRyxXQUFOLENBQWtCRyxRQUFsQixDQUFUO0FBQ0g7QUEvQ0wsS0FEZ0IsRUFrRGhCO0FBQ0kzTSxjQUFNLFFBRFY7QUFFSWtMLHNCQUFjLHNCQUFVQyxNQUFWLEVBQWtCO0FBQzVCLGdCQUFNa0IsUUFBUSxZQUFVO0FBQ3BCLHVCQUFPQyxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQVA7QUFDSCxhQUZhLEVBQWQ7QUFHQSxnQkFBSSxDQUFDRixNQUFNRyxXQUFYLEVBQXdCO0FBQ3BCLHVCQUFPLEtBQVA7QUFDSDs7QUFFRCxnQkFBTUMsT0FBT3RCLE9BQU9zQixJQUFwQjtBQUNBLGdCQUFNQyxPQUFPdkIsT0FBT3VCLElBQXBCOztBQUVBLGdCQUFHLHlCQUFTRCxJQUFULEVBQWVDLElBQWYsQ0FBSCxFQUF3QjtBQUNwQix1QkFBTyxJQUFQO0FBQ0gsYUFGRCxNQUVLO0FBQ0QsdUJBQU8sS0FBUDtBQUNIO0FBQ0o7QUFsQkwsS0FsRGdCLEVBc0VoQjtBQUNJMU0sY0FBTSxNQURWO0FBRUlrTCxzQkFBYyxzQkFBVUMsTUFBVixFQUFrQjtBQUM1QixnQkFBTXNCLE9BQU90QixPQUFPc0IsSUFBcEI7O0FBRUE7QUFDQSxnQkFBTUMsT0FBT3ZCLE9BQU91QixJQUFwQjtBQUNBLGdCQUFJLHVCQUFPRCxJQUFQLEVBQWFDLElBQWIsQ0FBSixFQUF3QjtBQUNwQix1QkFBTyxJQUFQO0FBQ0gsYUFGRCxNQUVLO0FBQ0QsdUJBQU8sS0FBUDtBQUNIO0FBQ0o7QUFaTCxLQXRFZ0IsRUFvRmhCO0FBQ0kxTSxjQUFNLEtBRFY7QUFFSWtMLHNCQUFjLHNCQUFVQyxNQUFWLEVBQWtCO0FBQzVCLGdCQUFNa0IsUUFBUSxZQUFVO0FBQ3BCLHVCQUFPQyxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQVA7QUFDSCxhQUZhLEVBQWQ7O0FBSUE7QUFDQSxnQkFBTUssZUFBZSxTQUFmQSxZQUFlLEdBQUs7QUFDckIseUJBQVNDLGNBQVQsR0FBMEI7QUFDdkIsd0JBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztBQUMvQiwrQkFBT0EsT0FBT0MsV0FBUCxJQUFzQkQsT0FBT0UsaUJBQXBDO0FBQ0g7QUFDSjtBQUNELG9CQUFJQyxjQUFjSixnQkFBbEI7QUFDQSxvQkFBSUssZUFBZUosT0FBT0ssWUFBUCxJQUF1QkwsT0FBT00sa0JBQWpEO0FBQ0Esb0JBQUlDLGtCQUFrQkosZUFBZSxPQUFPQSxZQUFZSSxlQUFuQixLQUF1QyxVQUF0RCxJQUFvRUosWUFBWUksZUFBWixDQUE0QiwyQ0FBNUIsQ0FBMUY7O0FBRUE7QUFDQTtBQUNBLG9CQUFJQyx1QkFBdUIsQ0FBQ0osWUFBRCxJQUFpQkEsYUFBYWhELFNBQWIsSUFBMEIsT0FBT2dELGFBQWFoRCxTQUFiLENBQXVCcUQsWUFBOUIsS0FBK0MsVUFBekUsSUFBdUYsT0FBT0wsYUFBYWhELFNBQWIsQ0FBdUIzRyxNQUE5QixLQUF5QyxVQUE1SztBQUNBLHVCQUFPLENBQUMsQ0FBQzhKLGVBQUYsSUFBcUIsQ0FBQyxDQUFDQyxvQkFBOUI7QUFDSCxhQWREO0FBZUE7QUFDQSxtQkFBT1Ysa0JBQWtCLENBQUMsQ0FBQ1AsTUFBTUcsV0FBTixDQUFrQiwrQkFBbEIsQ0FBM0I7QUFDSDtBQXpCTCxLQXBGZ0IsRUErR2hCO0FBQ0l4TSxjQUFNLE1BRFY7QUFFSWtMLHNCQUFjLHNCQUFVQyxNQUFWLEVBQWtCO0FBQzVCLGdCQUFNc0IsT0FBT3RCLE9BQU9zQixJQUFwQjtBQUNBLGdCQUFNQyxPQUFPdkIsT0FBT3VCLElBQXBCO0FBQ0EsZ0JBQUksdUJBQU9ELElBQVAsRUFBYUMsSUFBYixDQUFKLEVBQXdCO0FBQ3BCLHVCQUFPLElBQVA7QUFDSCxhQUZELE1BRUs7QUFDRCx1QkFBTyxLQUFQO0FBQ0g7QUFDSjtBQVZMLEtBL0dnQixDQUFwQjs7QUE2SEF2TyxTQUFLcVAsd0JBQUwsR0FBZ0MsVUFBQ0MsT0FBRCxFQUFhO0FBQ3pDclAsMEJBQWtCQyxHQUFsQixDQUFzQiw2Q0FBdEIsRUFBcUVvUCxPQUFyRTtBQUNBLFlBQU10QyxTQUFVc0MsWUFBWXpJLE9BQU95SSxPQUFQLENBQWIsR0FBZ0NBLE9BQWhDLEdBQTBDLEVBQXpEO0FBQ0EsYUFBSSxJQUFJeE8sSUFBSSxDQUFaLEVBQWVBLElBQUlnTSxZQUFZL0wsTUFBL0IsRUFBdUNELEdBQXZDLEVBQTRDO0FBQ3hDLGdCQUFHZ00sWUFBWWhNLENBQVosRUFBZWlNLFlBQWYsQ0FBNEJDLE1BQTVCLENBQUgsRUFBdUM7QUFDbkMsdUJBQU9GLFlBQVloTSxDQUFaLEVBQWVlLElBQXRCO0FBQ0g7QUFDSjtBQUNKLEtBUkQ7QUFTQTdCLFNBQUt1UCwyQkFBTCxHQUFtQyxVQUFDM0YsU0FBRCxFQUFlO0FBQzlDM0osMEJBQWtCQyxHQUFsQixDQUFzQixnREFBdEIsRUFBd0UwSixTQUF4RTtBQUNBLFlBQUk0RixlQUFlLEVBQW5CO0FBQ0EsYUFBSyxJQUFJMU8sSUFBSThJLFVBQVU3SSxNQUF2QixFQUErQkQsR0FBL0IsR0FBcUM7QUFDakMsZ0JBQU0yTyxPQUFPN0YsVUFBVTlJLENBQVYsQ0FBYjtBQUNBLGdCQUFJa00sU0FBUyxFQUFiO0FBQ0EsaUJBQUksSUFBSWhDLElBQUksQ0FBWixFQUFlQSxJQUFJeUUsS0FBSzdPLE9BQUwsQ0FBYUcsTUFBaEMsRUFBd0NpSyxHQUF4QyxFQUE2QztBQUN6Q2dDLHlCQUFTeUMsS0FBSzdPLE9BQUwsQ0FBYW9LLENBQWIsQ0FBVDtBQUNBLG9CQUFJZ0MsTUFBSixFQUFZO0FBQ1Isd0JBQU0wQyxZQUFZMVAsS0FBS3FQLHdCQUFMLENBQThCckMsTUFBOUIsQ0FBbEI7QUFDQSx3QkFBSTBDLFNBQUosRUFBZTtBQUNYRixxQ0FBYWhILElBQWIsQ0FBa0JrSCxTQUFsQjtBQUNIO0FBQ0o7QUFDSjtBQUdKOztBQUVELGVBQU9GLFlBQVA7QUFDSCxLQXBCRDtBQXFCQSxXQUFPeFAsSUFBUDtBQUNILENBL0pEOztrQkFpS2U2TSxjOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hLZjtBQUNPLElBQU04Qyw0Q0FBa0IsV0FBeEI7QUFDQSxJQUFNQyxrQ0FBYSxNQUFuQjtBQUNBLElBQU1DLDBDQUFpQixVQUF2QjtBQUNBLElBQU1DLHNDQUFlLFFBQXJCO0FBQ0EsSUFBTUMsd0NBQWdCLFNBQXRCO0FBQ0EsSUFBTUMsb0NBQWMsT0FBcEI7QUFDQSxJQUFNQyx3Q0FBZ0IsU0FBdEI7QUFDQSxJQUFNQyx3Q0FBZ0IsU0FBdEI7O0FBR1A7QUFDTyxJQUFNQywwQ0FBaUIsT0FBdkI7QUFDQSxJQUFNQyw0Q0FBa0IsUUFBeEI7QUFDQSxJQUFNQyx3Q0FBZ0IsTUFBdEI7QUFDQSxJQUFNQyxzQ0FBZSxLQUFyQjtBQUNBLElBQU0zTyx3Q0FBZ0IsTUFBdEI7O0FBRVA7QUFDTyxJQUFNNE8sOENBQW1CVixjQUF6QjtBQUNBLElBQU1oTix3QkFBUSxPQUFkO0FBQ0EsSUFBTXdDLDRCQUFVLFNBQWhCO0FBQ0EsSUFBTW1MLHNDQUFlLE1BQXJCO0FBQ0EsSUFBTUMsb0RBQXNCLFlBQTVCO0FBQ0EsSUFBTUMsd0NBQWdCLGNBQXRCO0FBQ0EsSUFBTUMsMENBQWlCLFFBQXZCO0FBQ0EsSUFBTUMsMENBQWlCLFFBQXZCO0FBQ0EsSUFBTXhPLGdEQUFvQixpQkFBMUI7O0FBRUEsSUFBTUosd0JBQVEsT0FBZDs7QUFFUDtBQUNPLElBQU02TyxzQ0FBZSxjQUFyQjtBQUNBLElBQU1DLDRDQUFrQmpCLGNBQXhCO0FBQ0EsSUFBTWtCLHNDQUFlLE9BQXJCO0FBQ0EsSUFBTUMsb0NBQWMsTUFBcEI7O0FBRUEsSUFBTUMsMENBQWlCLGVBQXZCO0FBQ0EsSUFBTUMsc0NBQWUsTUFBckI7QUFDQSxJQUFNQyxvREFBc0IsWUFBNUI7QUFDQSxJQUFNQywwQ0FBaUIsZUFBdkI7QUFDQSxJQUFNQyxzQ0FBZSxNQUFyQjtBQUNBLElBQU1DLHNDQUFlLGFBQXJCO0FBQ0EsSUFBTUMsMENBQWlCLHFCQUF2QjtBQUNBLElBQU1DLHdEQUF3Qiw0QkFBOUI7QUFDQSxJQUFNQyx3REFBd0IscUJBQTlCO0FBQ0EsSUFBTUMsb0VBQThCLFlBQXBDO0FBQ0EsSUFBTUMsNERBQTBCLGdCQUFoQzs7QUFHQSxJQUFNMU8sa0NBQWEsR0FBbkI7QUFDQSxJQUFNMk8sc0RBQXVCLEdBQTdCO0FBQ0EsSUFBTUMsMEVBQWlDLEdBQXZDO0FBQ0EsSUFBTUMsc0VBQStCLEdBQXJDO0FBQ0EsSUFBTUMsb0VBQThCLEdBQXBDO0FBQ0EsSUFBTTdQLGdEQUFvQixHQUExQjtBQUNBLElBQU04UCxzREFBdUIsR0FBN0I7QUFDQSxJQUFNQywwREFBeUIsR0FBL0I7QUFDQSxJQUFNQyw0REFBMEIsR0FBaEM7QUFDQSxJQUFNQyxzRkFBdUMsR0FBN0M7QUFDQSxJQUFNQyxvRkFBc0MsR0FBNUM7QUFDQSxJQUFNQyxnRkFBb0MsR0FBMUM7QUFDQSxJQUFNQyxrRkFBcUMsR0FBM0M7QUFDQSxJQUFNQyxrRUFBNkIsR0FBbkMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRFA7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7Ozs7O0FBS0EsSUFBTUMsVUFBVSxTQUFWQSxPQUFVLEdBQVU7QUFDdEIsUUFBTXhTLE9BQU8sRUFBYjtBQUNBLFFBQUl5UyxrQkFBa0IsRUFBdEI7QUFDQSxRQUFJQyxpQkFBaUIsK0JBQXJCOztBQUVBelMsc0JBQWtCQyxHQUFsQixDQUFzQix5QkFBdEI7O0FBRUEsUUFBTXlTLG1CQUFtQixTQUFuQkEsZ0JBQW1CLENBQVNDLE9BQVQsRUFBaUI7QUFDdEMsWUFBSSxDQUFDQSxPQUFELElBQVksQ0FBQ0EsUUFBUXRFLElBQVQsSUFBaUIsRUFBRXNFLFFBQVFDLElBQVIsSUFBZ0JELFFBQVFFLFdBQXhCLElBQXVDRixRQUFRRyxNQUFqRCxDQUFqQyxFQUEyRjtBQUN2RjtBQUNIOztBQUVELFlBQUkvRixTQUFTLFNBQWMsRUFBZCxFQUFrQixFQUFFLFdBQVcsS0FBYixFQUFsQixFQUF3QzRGLE9BQXhDLENBQWI7QUFDQTVGLGVBQU9zQixJQUFQLEdBQWMsbUJBQUssS0FBS3RCLE9BQU9zQixJQUFqQixDQUFkOztBQUVBLFlBQUd0QixPQUFPNkYsSUFBUCxJQUFlN0YsT0FBTzhGLFdBQXRCLElBQXFDOUYsT0FBTytGLE1BQS9DLEVBQXNEO0FBQ2xEL0YsbUJBQU9zQixJQUFQLEdBQWN0QixPQUFPNkYsSUFBUCxHQUFjLEdBQWQsR0FBb0I3RixPQUFPOEYsV0FBM0IsR0FBeUMsVUFBekMsR0FBc0Q5RixPQUFPK0YsTUFBM0U7QUFDQSxtQkFBTy9GLE9BQU82RixJQUFkO0FBQ0EsbUJBQU83RixPQUFPOEYsV0FBZDtBQUNBLG1CQUFPOUYsT0FBTytGLE1BQWQ7QUFDSDs7QUFFRCxZQUFNQyxnQkFBZ0IseUJBQXRCOztBQUVBLFlBQUlBLGNBQWN6TCxJQUFkLENBQW1CeUYsT0FBT3VCLElBQTFCLENBQUosRUFBcUM7QUFDakM7QUFDQXZCLG1CQUFPd0IsUUFBUCxHQUFrQnhCLE9BQU91QixJQUF6QjtBQUNBdkIsbUJBQU91QixJQUFQLEdBQWN2QixPQUFPdUIsSUFBUCxDQUFZMEUsT0FBWixDQUFvQkQsYUFBcEIsRUFBbUMsSUFBbkMsQ0FBZDtBQUNIOztBQUVELFlBQUcsdUJBQU9oRyxPQUFPc0IsSUFBZCxDQUFILEVBQXVCO0FBQ25CdEIsbUJBQU91QixJQUFQLEdBQWMsTUFBZDtBQUNILFNBRkQsTUFFTSxJQUFHLHlCQUFTdkIsT0FBT3NCLElBQWhCLENBQUgsRUFBeUI7QUFDM0J0QixtQkFBT3VCLElBQVAsR0FBYyxRQUFkO0FBQ0gsU0FGSyxNQUVBLElBQUcsdUJBQU92QixPQUFPc0IsSUFBZCxFQUFvQnRCLE9BQU91QixJQUEzQixDQUFILEVBQW9DO0FBQ3RDdkIsbUJBQU91QixJQUFQLEdBQWMsTUFBZDtBQUNILFNBRkssTUFFQSxJQUFJLENBQUN2QixPQUFPdUIsSUFBWixFQUFrQjtBQUNwQnZCLG1CQUFPdUIsSUFBUCxHQUFjLCtCQUFpQnZCLE9BQU9zQixJQUF4QixDQUFkO0FBQ0g7O0FBRUQsWUFBSSxDQUFDdEIsT0FBT3VCLElBQVosRUFBa0I7QUFDZDtBQUNIOztBQUVEO0FBQ0EsZ0JBQVF2QixPQUFPdUIsSUFBZjtBQUNJLGlCQUFLLE1BQUw7QUFDQSxpQkFBSyxtQkFBTDtBQUNJdkIsdUJBQU91QixJQUFQLEdBQWMsS0FBZDtBQUNBO0FBQ0osaUJBQUssS0FBTDtBQUNJdkIsdUJBQU91QixJQUFQLEdBQWMsS0FBZDtBQUNBO0FBQ0osaUJBQUssTUFBTDtBQUNJdkIsdUJBQU91QixJQUFQLEdBQWMsTUFBZDtBQUNBO0FBQ0o7QUFDSTtBQVpSO0FBY0ExSCxlQUFPQyxJQUFQLENBQVlrRyxNQUFaLEVBQW9CakcsT0FBcEIsQ0FBNEIsVUFBU0MsR0FBVCxFQUFjO0FBQ3RDLGdCQUFJZ0csT0FBT2hHLEdBQVAsTUFBZ0IsRUFBcEIsRUFBd0I7QUFDcEIsdUJBQU9nRyxPQUFPaEcsR0FBUCxDQUFQO0FBQ0g7QUFDSixTQUpEOztBQU1BLGVBQU9nRyxNQUFQO0FBRUgsS0E1REQ7O0FBOERBaE4sU0FBS3lELFdBQUwsR0FBa0IsVUFBQ1csUUFBRCxFQUFhO0FBQzNCbkUsMEJBQWtCQyxHQUFsQixDQUFzQixnQ0FBdEIsRUFBd0RrRSxRQUF4RDtBQUNBLFlBQU04TyxtQkFBbUIsQ0FBQ2hMLHFCQUFFRixPQUFGLENBQVU1RCxRQUFWLElBQXNCQSxRQUF0QixHQUFpQyxDQUFDQSxRQUFELENBQWxDLEVBQThDaUUsR0FBOUMsQ0FBa0QsVUFBU29ILElBQVQsRUFBYztBQUNyRixnQkFBRyxDQUFDdkgscUJBQUVGLE9BQUYsQ0FBVXlILEtBQUswRCxNQUFmLENBQUosRUFBNEI7QUFDeEIsdUJBQU8xRCxLQUFLMEQsTUFBWjtBQUNIO0FBQ0QsZ0JBQUlDLGVBQWUsU0FBYyxFQUFkLEVBQWlCO0FBQ2hDeFMseUJBQVMsRUFEdUI7QUFFaEN1Uyx3QkFBUTtBQUZ3QixhQUFqQixFQUdoQjFELElBSGdCLENBQW5COztBQUtBLGdCQUFJMkQsYUFBYXhTLE9BQWIsS0FBeUJpRyxPQUFPdU0sYUFBYXhTLE9BQXBCLENBQTFCLElBQTJELENBQUNzSCxxQkFBRUYsT0FBRixDQUFVb0wsYUFBYXhTLE9BQXZCLENBQS9ELEVBQWdHO0FBQzVGd1MsNkJBQWF4UyxPQUFiLEdBQXVCLENBQUMrUixpQkFBaUJTLGFBQWF4UyxPQUE5QixDQUFELENBQXZCO0FBQ0g7O0FBRUQsZ0JBQUcsQ0FBQ3NILHFCQUFFRixPQUFGLENBQVVvTCxhQUFheFMsT0FBdkIsQ0FBRCxJQUFvQ3dTLGFBQWF4UyxPQUFiLENBQXFCRyxNQUFyQixLQUFnQyxDQUF2RSxFQUEwRTtBQUN0RSxvQkFBSTBPLEtBQUs0RCxNQUFULEVBQWlCO0FBQ2JELGlDQUFheFMsT0FBYixHQUF1QjZPLEtBQUs0RCxNQUE1QjtBQUNILGlCQUZELE1BRU87QUFDSEQsaUNBQWF4UyxPQUFiLEdBQXVCLENBQUMrUixpQkFBaUJsRCxJQUFqQixDQUFELENBQXZCO0FBQ0g7QUFDSjs7QUFHRCxpQkFBSSxJQUFJM08sSUFBSSxDQUFaLEVBQWVBLElBQUlzUyxhQUFheFMsT0FBYixDQUFxQkcsTUFBeEMsRUFBZ0RELEdBQWhELEVBQXFEO0FBQ2pELG9CQUFJa00sU0FBU29HLGFBQWF4UyxPQUFiLENBQXFCRSxDQUFyQixDQUFiO0FBQ0Esb0JBQUl3UyxlQUFlLEVBQW5CO0FBQ0Esb0JBQUksQ0FBQ3RHLE1BQUwsRUFBYTtBQUNUO0FBQ0g7O0FBRUQsb0JBQUl1RyxnQkFBZ0J2RyxPQUFPaE0sT0FBM0I7QUFDQSxvQkFBSXVTLGFBQUosRUFBbUI7QUFDZnZHLDJCQUFPaE0sT0FBUCxHQUFrQnVTLGNBQWNsTSxRQUFkLE9BQTZCLE1BQS9DO0FBQ0gsaUJBRkQsTUFFTztBQUNIMkYsMkJBQU9oTSxPQUFQLEdBQWlCLEtBQWpCO0FBQ0g7O0FBRUQ7QUFDQSxvQkFBSSxDQUFDb1MsYUFBYXhTLE9BQWIsQ0FBcUJFLENBQXJCLEVBQXdCSSxLQUE3QixFQUFvQztBQUNoQ2tTLGlDQUFheFMsT0FBYixDQUFxQkUsQ0FBckIsRUFBd0JJLEtBQXhCLEdBQWdDa1MsYUFBYXhTLE9BQWIsQ0FBcUJFLENBQXJCLEVBQXdCeU4sSUFBeEIsR0FBNkIsR0FBN0IsR0FBaUN6TixFQUFFdUcsUUFBRixFQUFqRTtBQUNIOztBQUVEaU0sK0JBQWVYLGlCQUFpQlMsYUFBYXhTLE9BQWIsQ0FBcUJFLENBQXJCLENBQWpCLENBQWY7QUFDQSxvQkFBRzRSLGVBQWVyRCx3QkFBZixDQUF3Q2lFLFlBQXhDLENBQUgsRUFBeUQ7QUFDckRGLGlDQUFheFMsT0FBYixDQUFxQkUsQ0FBckIsSUFBMEJ3UyxZQUExQjtBQUNILGlCQUZELE1BRUs7QUFDREYsaUNBQWF4UyxPQUFiLENBQXFCRSxDQUFyQixJQUEwQixJQUExQjtBQUNIO0FBQ0o7O0FBRURzUyx5QkFBYXhTLE9BQWIsR0FBdUJ3UyxhQUFheFMsT0FBYixDQUFxQnFILE1BQXJCLENBQTRCO0FBQUEsdUJBQVUsQ0FBQyxDQUFDK0UsTUFBWjtBQUFBLGFBQTVCLENBQXZCOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQVdBLGdCQUFHLENBQUM5RSxxQkFBRUYsT0FBRixDQUFVb0wsYUFBYUQsTUFBdkIsQ0FBSixFQUFtQztBQUMvQkMsNkJBQWFELE1BQWIsR0FBc0IsRUFBdEI7QUFDSDtBQUNELGdCQUFHakwscUJBQUVGLE9BQUYsQ0FBVW9MLGFBQWFJLFFBQXZCLENBQUgsRUFBb0M7QUFDaENKLDZCQUFhRCxNQUFiLEdBQXNCQyxhQUFhRCxNQUFiLENBQW9CTSxNQUFwQixDQUEyQkwsYUFBYUksUUFBeEMsQ0FBdEI7QUFDQSx1QkFBT0osYUFBYUksUUFBcEI7QUFDSDs7QUFFREoseUJBQWFELE1BQWIsR0FBc0JDLGFBQWFELE1BQWIsQ0FBb0I5SyxHQUFwQixDQUF3QixVQUFTcUwsS0FBVCxFQUFlO0FBQ3pELG9CQUFHLENBQUNBLEtBQUQsSUFBVSxDQUFDQSxNQUFNcEYsSUFBcEIsRUFBeUI7QUFDckIsMkJBQU8sS0FBUDtBQUNIO0FBQ0QsdUJBQU8sU0FBYyxFQUFkLEVBQWtCO0FBQ3JCLDRCQUFRLFVBRGE7QUFFckIsK0JBQVc7QUFGVSxpQkFBbEIsRUFHSm9GLEtBSEksQ0FBUDtBQUlILGFBUnFCLEVBUW5CekwsTUFSbUIsQ0FRWjtBQUFBLHVCQUFTLENBQUMsQ0FBQ3lMLEtBQVg7QUFBQSxhQVJZLENBQXRCOztBQVVBLG1CQUFPTixZQUFQO0FBQ0gsU0FsRndCLENBQXpCO0FBbUZBWCwwQkFBa0JTLGdCQUFsQjtBQUNBLGVBQU9BLGdCQUFQO0FBQ0gsS0F2RkQ7QUF3RkFsVCxTQUFLb0IsV0FBTCxHQUFtQixZQUFNO0FBQ3JCbkIsMEJBQWtCQyxHQUFsQixDQUFzQixnQ0FBdEIsRUFBd0R1UyxlQUF4RDtBQUNBLGVBQU9BLGVBQVA7QUFDSCxLQUhEO0FBSUF6UyxTQUFLd0IsaUJBQUwsR0FBeUIsWUFBTTtBQUMzQjtBQUNBdkIsMEJBQWtCQyxHQUFsQixDQUFzQixzQ0FBdEIsRUFBOER1UyxnQkFBZ0IsQ0FBaEIsRUFBbUI3UixPQUFqRjtBQUNBLGVBQU82UixnQkFBZ0IsQ0FBaEIsRUFBbUI3UixPQUExQjtBQUNILEtBSkQ7O0FBTUEsV0FBT1osSUFBUDtBQUNILENBeEtEOztrQkEyS2V3UyxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyTGY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFJQSxJQUFNbUIsYUFBYSxTQUFiQSxVQUFhLEdBQVU7QUFDekIsUUFBSUMsaUJBQWlCLCtCQUFyQjtBQUNBLFFBQU1uUyxZQUFZLEVBQWxCOztBQUVBLFFBQU16QixPQUFPLEVBQWI7QUFDQUMsc0JBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7O0FBRUEsUUFBTTJULGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ2hTLElBQUQsRUFBT2lTLFFBQVAsRUFBbUI7QUFDdkMsWUFBR3JTLFVBQVVJLElBQVYsQ0FBSCxFQUFtQjtBQUNmO0FBQ0g7QUFDRDVCLDBCQUFrQkMsR0FBbEIsQ0FBc0IseUNBQXRCLEVBQWlFMkIsSUFBakU7QUFDQUosa0JBQVVJLElBQVYsSUFBa0JpUyxRQUFsQjtBQUNILEtBTkQ7O0FBUUEsUUFBTUMsaUJBQWdCO0FBQ2xCQyxlQUFPLGlCQUFXO0FBQ2QsbUJBQU8saVFBQTZDLFVBQVNDLE9BQVQsRUFBa0I7QUFDOUQsb0JBQU1ILFdBQVcsbUJBQUFHLENBQVEsc0VBQVIsRUFBb0NqVCxPQUFyRDtBQUNBNlMsZ0NBQWdCLE9BQWhCLEVBQXlCQyxRQUF6QjtBQUNBLHVCQUFPQSxRQUFQO0FBQ0gsYUFKRSx5Q0FJQSxVQUFTSSxHQUFULEVBQWE7QUFDWixzQkFBTSxJQUFJQyxLQUFKLENBQVUsZUFBVixDQUFOO0FBQ0gsYUFORSxDQUFQO0FBUUgsU0FWaUI7QUFXbEJDLGdCQUFTLGtCQUFVO0FBQ2YsbUJBQU8sbVJBQThDLFVBQVNILE9BQVQsRUFBa0I7QUFDL0Qsb0JBQU1ILFdBQVcsbUJBQUFHLENBQVEsd0VBQVIsRUFBcUNqVCxPQUF0RDtBQUNBNlMsZ0NBQWdCLFFBQWhCLEVBQTBCQyxRQUExQjtBQUNBLHVCQUFPQSxRQUFQO0FBQ0gsYUFKRSx5Q0FJQSxVQUFTSSxHQUFULEVBQWE7QUFDWixzQkFBTSxJQUFJQyxLQUFKLENBQVUsZUFBVixDQUFOO0FBQ0gsYUFORSxDQUFQO0FBUUgsU0FwQmlCO0FBcUJsQkUsY0FBTyxnQkFBVTtBQUNiLG1CQUFPLCtRQUE0QyxVQUFTSixPQUFULEVBQWtCO0FBQzdELG9CQUFNSCxXQUFXLG1CQUFBRyxDQUFRLG9FQUFSLEVBQW1DalQsT0FBcEQ7QUFDQTZTLGdDQUFnQixNQUFoQixFQUF3QkMsUUFBeEI7QUFDQSx1QkFBT0EsUUFBUDtBQUNILGFBSkUseUNBSUEsVUFBU0ksR0FBVCxFQUFhO0FBQ1osc0JBQU0sSUFBSUMsS0FBSixDQUFVLGVBQVYsQ0FBTjtBQUNILGFBTkUsQ0FBUDtBQVFILFNBOUJpQjtBQStCbEJsRyxhQUFNLGVBQVU7QUFDWixtQkFBTyw2UUFBMkMsVUFBU2dHLE9BQVQsRUFBa0I7QUFDNUQsb0JBQU1ILFdBQVcsbUJBQUFHLENBQVEsa0VBQVIsRUFBa0NqVCxPQUFuRDtBQUNBNlMsZ0NBQWdCLEtBQWhCLEVBQXVCQyxRQUF2QjtBQUNBLHVCQUFPQSxRQUFQO0FBQ0gsYUFKRSx5Q0FJQSxVQUFTSSxHQUFULEVBQWE7QUFDWixzQkFBTSxJQUFJQyxLQUFKLENBQVUsZUFBVixDQUFOO0FBQ0gsYUFORSxDQUFQO0FBUUgsU0F4Q2lCO0FBeUNsQkcsY0FBTyxnQkFBVTtBQUNiLG1CQUFPLHlIQUE0QyxVQUFTTCxPQUFULEVBQWtCO0FBQzdELG9CQUFNSCxXQUFXLG1CQUFBRyxDQUFRLG9FQUFSLEVBQW1DalQsT0FBcEQ7QUFDQTZTLGdDQUFnQixNQUFoQixFQUF3QkMsUUFBeEI7QUFDQSx1QkFBT0EsUUFBUDtBQUNILGFBSkUseUNBSUEsVUFBU0ksR0FBVCxFQUFhO0FBQ1osc0JBQU0sSUFBSUMsS0FBSixDQUFVLGVBQVYsQ0FBTjtBQUNILGFBTkUsQ0FBUDtBQVFIO0FBbERpQixLQUF0Qjs7QUFzREFuVSxTQUFLbUIsYUFBTCxHQUFxQixVQUFDaUQsUUFBRCxFQUFhO0FBQzlCLFlBQU1tUSx5QkFBeUJYLGVBQWVyRSwyQkFBZixDQUEyQ25MLFFBQTNDLENBQS9CO0FBQ0FuRSwwQkFBa0JDLEdBQWxCLENBQXNCLHFDQUF0QixFQUE2RHFVLHNCQUE3RDtBQUNBLGVBQU9DLGtCQUFRNUosR0FBUixDQUNIMkosdUJBQXVCdE0sTUFBdkIsQ0FBOEIsVUFBU3dNLFlBQVQsRUFBc0I7QUFDaEQsbUJBQU8sQ0FBQyxDQUFDVixlQUFlVSxZQUFmLENBQVQ7QUFDSCxTQUZELEVBRUdwTSxHQUZILENBRU8sVUFBU29NLFlBQVQsRUFBc0I7QUFDekIsZ0JBQU1YLFdBQVdDLGVBQWVVLFlBQWYsR0FBakI7QUFDQSxtQkFBT1gsUUFBUDtBQUNILFNBTEQsQ0FERyxDQUFQO0FBUUgsS0FYRDs7QUFhQTlULFNBQUswVSxVQUFMLEdBQWtCLFVBQUM3UyxJQUFELEVBQVU7QUFDeEI1QiwwQkFBa0JDLEdBQWxCLENBQXNCLGtDQUF0QixFQUEwRDJCLElBQTFEO0FBQ0EsZUFBT0osVUFBVUksSUFBVixDQUFQO0FBQ0gsS0FIRDs7QUFLQTdCLFNBQUsyVSxtQkFBTCxHQUEyQixVQUFDM0gsTUFBRCxFQUFZO0FBQ25DLFlBQU00SCx3QkFBd0JoQixlQUFldkUsd0JBQWYsQ0FBd0NyQyxNQUF4QyxDQUE5QjtBQUNBL00sMEJBQWtCQyxHQUFsQixDQUFzQiwyQ0FBdEIsRUFBbUUwVSxxQkFBbkU7QUFDQSxlQUFPNVUsS0FBSzBVLFVBQUwsQ0FBZ0JFLHFCQUFoQixDQUFQO0FBQ0gsS0FKRDs7QUFNQTVVLFNBQUsrRSxjQUFMLEdBQXNCLFVBQUNGLGFBQUQsRUFBZ0JDLFNBQWhCLEVBQThCO0FBQ2hEN0UsMEJBQWtCQyxHQUFsQixDQUFzQixzQ0FBdEIsRUFBOEQwVCxlQUFldkUsd0JBQWYsQ0FBd0N4SyxhQUF4QyxDQUE5RCxFQUF1SCtPLGVBQWV2RSx3QkFBZixDQUF3Q3ZLLFNBQXhDLENBQXZIO0FBQ0EsZUFBTzhPLGVBQWV2RSx3QkFBZixDQUF3Q3hLLGFBQXhDLE1BQTJEK08sZUFBZXZFLHdCQUFmLENBQXdDdkssU0FBeEMsQ0FBbEU7QUFFSCxLQUpEOztBQU1BLFdBQU85RSxJQUFQO0FBQ0gsQ0FwR0Q7O2tCQXNHZTJULFU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUdmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTWtCLGlCQUFpQixTQUFqQkEsY0FBaUIsQ0FBU0MsUUFBVCxFQUFtQjtBQUN0QyxRQUFJQyxjQUFjLEtBQUtBLFdBQXZCO0FBQ0EsV0FBTyxLQUFLMVQsSUFBTCxDQUNILFVBQVMyVCxLQUFULEVBQWdCO0FBQ1osZUFBT0QsWUFBWUUsT0FBWixDQUFvQkgsVUFBcEIsRUFBZ0N6VCxJQUFoQyxDQUFxQyxZQUFXO0FBQ25ELG1CQUFPMlQsS0FBUDtBQUNILFNBRk0sQ0FBUDtBQUdILEtBTEUsRUFNSCxVQUFTOVIsTUFBVCxFQUFpQjtBQUNiLGVBQU82UixZQUFZRSxPQUFaLENBQW9CSCxVQUFwQixFQUFnQ3pULElBQWhDLENBQXFDLFlBQVc7QUFDbkQsbUJBQU8wVCxZQUFZRyxNQUFaLENBQW1CaFMsTUFBbkIsQ0FBUDtBQUNILFNBRk0sQ0FBUDtBQUdILEtBVkUsQ0FBUDtBQVlILENBZEQ7O0FBZ0JBO0FBQ0E7QUFDQSxJQUFNaVMsaUJBQWlCeEcsT0FBT3lHLFVBQTlCO0FBQ0EsSUFBTUMsbUJBQW1CMUcsT0FBTzJHLFlBQWhDOztBQUVBLFNBQVNDLElBQVQsR0FBZ0IsQ0FBRTs7QUFFbEI7QUFDQSxTQUFTQyxJQUFULENBQWNDLEVBQWQsRUFBa0JDLE9BQWxCLEVBQTJCO0FBQ3ZCLFdBQU8sWUFBVztBQUNkRCxXQUFHakwsS0FBSCxDQUFTa0wsT0FBVCxFQUFrQmhMLFNBQWxCO0FBQ0gsS0FGRDtBQUdIOztBQUVELElBQU1pTCxjQUFjLFNBQWRBLFdBQWMsQ0FBVUYsRUFBVixFQUFjO0FBQzlCLFFBQUksRUFBRSxnQkFBZ0JqQixPQUFsQixDQUFKLEVBQ0ksTUFBTSxJQUFJb0IsU0FBSixDQUFjLHNDQUFkLENBQU47QUFDSixRQUFJLE9BQU9ILEVBQVAsS0FBYyxVQUFsQixFQUE4QixNQUFNLElBQUlHLFNBQUosQ0FBYyxnQkFBZCxDQUFOO0FBQzlCLFNBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNBLFNBQUtDLE1BQUwsR0FBY3pQLFNBQWQ7QUFDQSxTQUFLMFAsVUFBTCxHQUFrQixFQUFsQjs7QUFFQUMsY0FBVVIsRUFBVixFQUFjLElBQWQ7QUFDSCxDQVZEOztBQVlBLElBQU1TLFNBQVMsU0FBVEEsTUFBUyxDQUFVQyxJQUFWLEVBQWdCQyxRQUFoQixFQUEwQjtBQUNyQyxXQUFPRCxLQUFLTixNQUFMLEtBQWdCLENBQXZCLEVBQTBCO0FBQ3RCTSxlQUFPQSxLQUFLSixNQUFaO0FBQ0g7QUFDRCxRQUFJSSxLQUFLTixNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ25CTSxhQUFLSCxVQUFMLENBQWdCeE4sSUFBaEIsQ0FBcUI0TixRQUFyQjtBQUNBO0FBQ0g7QUFDREQsU0FBS0wsUUFBTCxHQUFnQixJQUFoQjtBQUNBdEIsWUFBUTZCLFlBQVIsQ0FBcUIsWUFBVztBQUM1QixZQUFJQyxLQUFLSCxLQUFLTixNQUFMLEtBQWdCLENBQWhCLEdBQW9CTyxTQUFTRyxXQUE3QixHQUEyQ0gsU0FBU0ksVUFBN0Q7QUFDQSxZQUFJRixPQUFPLElBQVgsRUFBaUI7QUFDYixhQUFDSCxLQUFLTixNQUFMLEtBQWdCLENBQWhCLEdBQW9CWixPQUFwQixHQUE4QkMsTUFBL0IsRUFBdUNrQixTQUFTSyxPQUFoRCxFQUF5RE4sS0FBS0osTUFBOUQ7QUFDQTtBQUNIO0FBQ0QsWUFBSVcsR0FBSjtBQUNBLFlBQUk7QUFDQUEsa0JBQU1KLEdBQUdILEtBQUtKLE1BQVIsQ0FBTjtBQUNILFNBRkQsQ0FFRSxPQUFPWSxDQUFQLEVBQVU7QUFDUnpCLG1CQUFPa0IsU0FBU0ssT0FBaEIsRUFBeUJFLENBQXpCO0FBQ0E7QUFDSDtBQUNEMUIsZ0JBQVFtQixTQUFTSyxPQUFqQixFQUEwQkMsR0FBMUI7QUFDSCxLQWREO0FBZUgsQ0F4QkQ7O0FBMEJBLElBQU16QixVQUFVLFNBQVZBLE9BQVUsQ0FBVWtCLElBQVYsRUFBZ0JTLFFBQWhCLEVBQTBCO0FBQ3RDLFFBQUk7QUFDQTtBQUNBLFlBQUlBLGFBQWFULElBQWpCLEVBQ0ksTUFBTSxJQUFJUCxTQUFKLENBQWMsMkNBQWQsQ0FBTjtBQUNKLFlBQ0lnQixhQUNDLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsT0FBb0IsUUFBcEIsSUFBZ0MsT0FBT0EsUUFBUCxLQUFvQixVQURyRCxDQURKLEVBR0U7QUFDRSxnQkFBSXZWLE9BQU91VixTQUFTdlYsSUFBcEI7QUFDQSxnQkFBSXVWLG9CQUFvQnBDLE9BQXhCLEVBQWlDO0FBQzdCMkIscUJBQUtOLE1BQUwsR0FBYyxDQUFkO0FBQ0FNLHFCQUFLSixNQUFMLEdBQWNhLFFBQWQ7QUFDQUMsdUJBQU9WLElBQVA7QUFDQTtBQUNILGFBTEQsTUFLTyxJQUFJLE9BQU85VSxJQUFQLEtBQWdCLFVBQXBCLEVBQWdDO0FBQ25DNFUsMEJBQVVULEtBQUtuVSxJQUFMLEVBQVd1VixRQUFYLENBQVYsRUFBZ0NULElBQWhDO0FBQ0E7QUFDSDtBQUNKO0FBQ0RBLGFBQUtOLE1BQUwsR0FBYyxDQUFkO0FBQ0FNLGFBQUtKLE1BQUwsR0FBY2EsUUFBZDtBQUNBQyxlQUFPVixJQUFQO0FBQ0gsS0F0QkQsQ0FzQkUsT0FBT1EsQ0FBUCxFQUFVO0FBQ1J6QixlQUFPaUIsSUFBUCxFQUFhUSxDQUFiO0FBQ0g7QUFDSixDQTFCRDs7QUE0QkEsSUFBTXpCLFNBQVEsU0FBUkEsTUFBUSxDQUFVaUIsSUFBVixFQUFnQlMsUUFBaEIsRUFBMEI7QUFDcENULFNBQUtOLE1BQUwsR0FBYyxDQUFkO0FBQ0FNLFNBQUtKLE1BQUwsR0FBY2EsUUFBZDtBQUNBQyxXQUFPVixJQUFQO0FBQ0gsQ0FKRDs7QUFNQSxJQUFNVSxTQUFTLFNBQVRBLE1BQVMsQ0FBVVYsSUFBVixFQUFnQjtBQUMzQixRQUFJQSxLQUFLTixNQUFMLEtBQWdCLENBQWhCLElBQXFCTSxLQUFLSCxVQUFMLENBQWdCalYsTUFBaEIsS0FBMkIsQ0FBcEQsRUFBdUQ7QUFDbkR5VCxnQkFBUTZCLFlBQVIsQ0FBcUIsWUFBVztBQUM1QixnQkFBSSxDQUFDRixLQUFLTCxRQUFWLEVBQW9CO0FBQ2hCdEIsd0JBQVFzQyxxQkFBUixDQUE4QlgsS0FBS0osTUFBbkM7QUFDSDtBQUNKLFNBSkQ7QUFLSDs7QUFFRCxTQUFLLElBQUlqVixJQUFJLENBQVIsRUFBV2lXLE1BQU1aLEtBQUtILFVBQUwsQ0FBZ0JqVixNQUF0QyxFQUE4Q0QsSUFBSWlXLEdBQWxELEVBQXVEalcsR0FBdkQsRUFBNEQ7QUFDeERvVixlQUFPQyxJQUFQLEVBQWFBLEtBQUtILFVBQUwsQ0FBZ0JsVixDQUFoQixDQUFiO0FBQ0g7QUFDRHFWLFNBQUtILFVBQUwsR0FBa0IsSUFBbEI7QUFDSCxDQWJEOztBQWVBLElBQU1nQixVQUFVLFNBQVZBLE9BQVUsQ0FBVVQsV0FBVixFQUF1QkMsVUFBdkIsRUFBbUNDLE9BQW5DLEVBQTRDO0FBQ3hELFNBQUtGLFdBQUwsR0FBbUIsT0FBT0EsV0FBUCxLQUF1QixVQUF2QixHQUFvQ0EsV0FBcEMsR0FBa0QsSUFBckU7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLE9BQU9BLFVBQVAsS0FBc0IsVUFBdEIsR0FBbUNBLFVBQW5DLEdBQWdELElBQWxFO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0gsQ0FKRDs7QUFNQTs7Ozs7O0FBTUEsSUFBTVIsWUFBWSxTQUFaQSxTQUFZLENBQVVSLEVBQVYsRUFBY1UsSUFBZCxFQUFvQjtBQUNsQyxRQUFJYyxPQUFPLEtBQVg7QUFDQSxRQUFJO0FBQ0F4QixXQUNJLFVBQVNULEtBQVQsRUFBZ0I7QUFDWixnQkFBSWlDLElBQUosRUFBVTtBQUNWQSxtQkFBTyxJQUFQO0FBQ0FoQyxvQkFBUWtCLElBQVIsRUFBY25CLEtBQWQ7QUFDSCxTQUxMLEVBTUksVUFBUzlSLE1BQVQsRUFBaUI7QUFDYixnQkFBSStULElBQUosRUFBVTtBQUNWQSxtQkFBTyxJQUFQO0FBQ0EvQixtQkFBT2lCLElBQVAsRUFBYWpULE1BQWI7QUFDSCxTQVZMO0FBWUgsS0FiRCxDQWFFLE9BQU9nVSxFQUFQLEVBQVc7QUFDVCxZQUFJRCxJQUFKLEVBQVU7QUFDVkEsZUFBTyxJQUFQO0FBQ0EvQixlQUFPaUIsSUFBUCxFQUFhZSxFQUFiO0FBQ0g7QUFDSixDQXBCRDs7QUFzQkF2QixZQUFZNUosU0FBWixDQUFzQixPQUF0QixJQUFpQyxVQUFTeUssVUFBVCxFQUFxQjtBQUNsRCxXQUFPLEtBQUtuVixJQUFMLENBQVUsSUFBVixFQUFnQm1WLFVBQWhCLENBQVA7QUFDSCxDQUZEOztBQUlBYixZQUFZNUosU0FBWixDQUFzQjFLLElBQXRCLEdBQTZCLFVBQVNrVixXQUFULEVBQXNCQyxVQUF0QixFQUFrQztBQUMzRCxRQUFJVyxPQUFPLElBQUksS0FBS3BDLFdBQVQsQ0FBcUJRLElBQXJCLENBQVg7O0FBRUFXLFdBQU8sSUFBUCxFQUFhLElBQUljLE9BQUosQ0FBWVQsV0FBWixFQUF5QkMsVUFBekIsRUFBcUNXLElBQXJDLENBQWI7QUFDQSxXQUFPQSxJQUFQO0FBQ0gsQ0FMRDs7QUFPQXhCLFlBQVk1SixTQUFaLENBQXNCLFNBQXRCLElBQW1DOEksY0FBbkM7O0FBRUFjLFlBQVkvSyxHQUFaLEdBQWtCLFVBQVN3TSxHQUFULEVBQWM7QUFDNUIsV0FBTyxJQUFJNUMsT0FBSixDQUFZLFVBQVNTLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQ3pDLFlBQUksQ0FBQ2tDLEdBQUQsSUFBUSxPQUFPQSxJQUFJclcsTUFBWCxLQUFzQixXQUFsQyxFQUNJLE1BQU0sSUFBSTZVLFNBQUosQ0FBYyw4QkFBZCxDQUFOO0FBQ0osWUFBSXhMLE9BQU9yQyxNQUFNZ0UsU0FBTixDQUFnQjdFLEtBQWhCLENBQXNCdUQsSUFBdEIsQ0FBMkIyTSxHQUEzQixDQUFYO0FBQ0EsWUFBSWhOLEtBQUtySixNQUFMLEtBQWdCLENBQXBCLEVBQXVCLE9BQU9rVSxRQUFRLEVBQVIsQ0FBUDtBQUN2QixZQUFJb0MsWUFBWWpOLEtBQUtySixNQUFyQjs7QUFFQSxpQkFBU3VXLEdBQVQsQ0FBYXhXLENBQWIsRUFBZ0J1RixHQUFoQixFQUFxQjtBQUNqQixnQkFBSTtBQUNBLG9CQUFJQSxRQUFRLFFBQU9BLEdBQVAseUNBQU9BLEdBQVAsT0FBZSxRQUFmLElBQTJCLE9BQU9BLEdBQVAsS0FBZSxVQUFsRCxDQUFKLEVBQW1FO0FBQy9ELHdCQUFJaEYsT0FBT2dGLElBQUloRixJQUFmO0FBQ0Esd0JBQUksT0FBT0EsSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM1QkEsNkJBQUtvSixJQUFMLENBQ0lwRSxHQURKLEVBRUksVUFBU0EsR0FBVCxFQUFjO0FBQ1ZpUixnQ0FBSXhXLENBQUosRUFBT3VGLEdBQVA7QUFDSCx5QkFKTCxFQUtJNk8sTUFMSjtBQU9BO0FBQ0g7QUFDSjtBQUNEOUsscUJBQUt0SixDQUFMLElBQVV1RixHQUFWO0FBQ0Esb0JBQUksRUFBRWdSLFNBQUYsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkJwQyw0QkFBUTdLLElBQVI7QUFDSDtBQUNKLGFBbEJELENBa0JFLE9BQU84TSxFQUFQLEVBQVc7QUFDVGhDLHVCQUFPZ0MsRUFBUDtBQUNIO0FBQ0o7O0FBRUQsYUFBSyxJQUFJcFcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJc0osS0FBS3JKLE1BQXpCLEVBQWlDRCxHQUFqQyxFQUFzQztBQUNsQ3dXLGdCQUFJeFcsQ0FBSixFQUFPc0osS0FBS3RKLENBQUwsQ0FBUDtBQUNIO0FBQ0osS0FsQ00sQ0FBUDtBQW1DSCxDQXBDRDs7QUFzQ0E2VSxZQUFZVixPQUFaLEdBQXNCLFVBQVNELEtBQVQsRUFBZ0I7QUFDbEMsUUFBSUEsU0FBUyxRQUFPQSxLQUFQLHlDQUFPQSxLQUFQLE9BQWlCLFFBQTFCLElBQXNDQSxNQUFNRCxXQUFOLEtBQXNCUCxPQUFoRSxFQUF5RTtBQUNyRSxlQUFPUSxLQUFQO0FBQ0g7O0FBRUQsV0FBTyxJQUFJUixPQUFKLENBQVksVUFBU1MsT0FBVCxFQUFrQjtBQUNqQ0EsZ0JBQVFELEtBQVI7QUFDSCxLQUZNLENBQVA7QUFHSCxDQVJEOztBQVVBVyxZQUFZVCxNQUFaLEdBQXFCLFVBQVNGLEtBQVQsRUFBZ0I7QUFDakMsV0FBTyxJQUFJUixPQUFKLENBQVksVUFBU1MsT0FBVCxFQUFrQkMsTUFBbEIsRUFBMEI7QUFDekNBLGVBQU9GLEtBQVA7QUFDSCxLQUZNLENBQVA7QUFHSCxDQUpEOztBQU1BVyxZQUFZNEIsSUFBWixHQUFtQixVQUFTQyxNQUFULEVBQWlCO0FBQ2hDLFdBQU8sSUFBSWhELE9BQUosQ0FBWSxVQUFTUyxPQUFULEVBQWtCQyxNQUFsQixFQUEwQjtBQUN6QyxhQUFLLElBQUlwVSxJQUFJLENBQVIsRUFBV2lXLE1BQU1TLE9BQU96VyxNQUE3QixFQUFxQ0QsSUFBSWlXLEdBQXpDLEVBQThDalcsR0FBOUMsRUFBbUQ7QUFDL0MwVyxtQkFBTzFXLENBQVAsRUFBVU8sSUFBVixDQUFlNFQsT0FBZixFQUF3QkMsTUFBeEI7QUFDSDtBQUNKLEtBSk0sQ0FBUDtBQUtILENBTkQ7O0FBUUE7QUFDQVMsWUFBWVUsWUFBWixHQUNLLE9BQU9oQixnQkFBUCxLQUE0QixVQUE1QixJQUNELFVBQVNJLEVBQVQsRUFBYTtBQUNUSixxQkFBaUJJLEVBQWpCO0FBQ0gsQ0FIRCxJQUlBLFVBQVNBLEVBQVQsRUFBYTtBQUNUSixxQkFBaUJJLEVBQWpCLEVBQXFCLENBQXJCO0FBQ0gsQ0FQTDs7QUFTQUUsWUFBWW1CLHFCQUFaLEdBQW9DLFNBQVNBLHFCQUFULENBQStCNUMsR0FBL0IsRUFBb0M7QUFDcEUsUUFBSSxPQUFPdUQsT0FBUCxLQUFtQixXQUFuQixJQUFrQ0EsT0FBdEMsRUFBK0M7QUFDM0NBLGdCQUFRQyxJQUFSLENBQWEsdUNBQWIsRUFBc0R4RCxHQUF0RCxFQUQyQyxDQUNpQjtBQUMvRDtBQUNKLENBSkQ7O0FBTUEsSUFBTU0sVUFBVTdGLE9BQU82RixPQUFQLEtBQW1CN0YsT0FBTzZGLE9BQVAsR0FBaUJtQixXQUFwQyxDQUFoQjs7QUFFTyxJQUFNZ0MsOEJBQVduRCxRQUFRUyxPQUFSLEVBQWpCOztrQkFFUVQsTzs7Ozs7Ozs7Ozs7Ozs7OztBQzVQZjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUdBLHFCQUFBb0QsR0FBMEIsNEJBQWMsZUFBZCxDQUExQjs7QUFFQSxJQUFNQyxhQUFhLEVBQW5CO0FBQ0FsSixPQUFPa0osVUFBUCxHQUFvQkEsVUFBcEI7O0FBR0E7OztBQUdBLFNBQWNBLFVBQWQsRUFBMEJDLG9CQUExQjs7QUFFQUQsV0FBV0UsTUFBWCxHQUFvQixVQUFValksU0FBVixFQUFxQndELE9BQXJCLEVBQThCO0FBQzlDLFFBQUkwVSxjQUFjLDBCQUFsQjtBQUNBLFFBQUdBLGdCQUFnQixJQUFuQixFQUF3QixDQUV2QjtBQUNELFFBQUlDLG1CQUFtQiw2Q0FBNEJuWSxTQUE1QixDQUF2QjtBQUNBOzs7OztBQVVBLFFBQUlvWSxTQUFTLG9CQUFLRCxnQkFBTCxDQUFiOztBQUdBLFFBQU1FLGlCQUFpQkwscUJBQWNDLE1BQWQsQ0FBcUJHLE9BQU9FLHdCQUFQLEVBQXJCLEVBQXdEOVUsT0FBeEQsQ0FBdkI7O0FBRUEsYUFBYzZVLGNBQWQsRUFBOEI7QUFDMUJFLHdCQUFpQiwwQkFBVTtBQUN4QixtQkFBT0osaUJBQWlCSyxFQUF4QjtBQUNIO0FBSDBCLEtBQTlCOztBQU1BSixXQUFPSyxNQUFQLENBQWNKLGNBQWQ7O0FBSUE7OztBQUdBLFdBQU9BLGNBQVA7QUFDSCxDQW5DRCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0EscUJBQUFQLEdBQTBCLDRCQUFjLG1CQUFkLENBQTFCOztBQUVBOzs7QUFHQSxJQUFNRSxnQkFBZ0JuSixPQUFPbUosYUFBUCxHQUF1QixFQUE3Qzs7QUFFQSxJQUFNM1gsVUFBVSxPQUFoQjs7QUFFQSxJQUFNcVksYUFBYVYsY0FBY1UsVUFBZCxHQUEyQixFQUE5Qzs7QUFFTyxJQUFNQyxvRUFBOEIsU0FBOUJBLDJCQUE4QixDQUFTM1ksU0FBVCxFQUFvQjs7QUFFM0QsUUFBSSxDQUFDQSxTQUFMLEVBQWdCOztBQUVaO0FBQ0EsZUFBTyxJQUFQO0FBQ0g7O0FBRUQsUUFBSW1ZLG1CQUFtQixJQUF2Qjs7QUFFQSxRQUFJLE9BQU9uWSxTQUFQLEtBQXFCLFFBQXpCLEVBQW1DOztBQUUvQm1ZLDJCQUFtQjlKLFNBQVN1SyxjQUFULENBQXdCNVksU0FBeEIsQ0FBbkI7QUFDSCxLQUhELE1BR08sSUFBSUEsVUFBVTZZLFFBQWQsRUFBd0I7O0FBRTNCViwyQkFBbUJuWSxTQUFuQjtBQUNILEtBSE0sTUFHQTtBQUNIO0FBQ0EsZUFBTyxJQUFQO0FBQ0g7O0FBRUQsV0FBT21ZLGdCQUFQO0FBQ0gsQ0F0Qk07O0FBd0JQOzs7Ozs7QUFNQUgsY0FBY0MsTUFBZCxHQUF1QixVQUFTalksU0FBVCxFQUFvQndELE9BQXBCLEVBQTZCOztBQUVoRCxRQUFJMlUsbUJBQW1CUSw0QkFBNEIzWSxTQUE1QixDQUF2Qjs7QUFFQSxRQUFNcVksaUJBQWlCLG1CQUFJRixnQkFBSixDQUF2QjtBQUNBRSxtQkFBZTlVLElBQWYsQ0FBb0JDLE9BQXBCOztBQUVBa1YsZUFBV2hRLElBQVgsQ0FBZ0IyUCxjQUFoQjs7QUFFQSxXQUFPQSxjQUFQO0FBQ0gsQ0FWRDs7QUFZQTs7Ozs7QUFLQUwsY0FBY2MsYUFBZCxHQUE4QixZQUFXOztBQUVyQyxXQUFPSixVQUFQO0FBQ0gsQ0FIRDs7QUFLQTs7Ozs7O0FBTUFWLGNBQWNlLHNCQUFkLEdBQXVDLFVBQVNDLFdBQVQsRUFBc0I7O0FBRXpEQztBQUNBLFNBQUssSUFBSWpZLElBQUksQ0FBYixFQUFnQkEsSUFBSTBYLFdBQVd6WCxNQUEvQixFQUF1Q0QsR0FBdkMsRUFBNkM7O0FBRXpDLFlBQUkwWCxXQUFXMVgsQ0FBWCxFQUFjdVgsY0FBZCxPQUFtQ1MsV0FBdkMsRUFBb0Q7O0FBRWhELG1CQUFPTixXQUFXMVgsQ0FBWCxDQUFQO0FBQ0g7QUFDSjs7QUFFRCxXQUFPLElBQVA7QUFDSCxDQVpEOztBQWNBOzs7Ozs7QUFNQWdYLGNBQWNrQixnQkFBZCxHQUFpQyxVQUFTelcsS0FBVCxFQUFnQjs7QUFFN0MsUUFBTTRWLGlCQUFpQkssV0FBV2pXLEtBQVgsQ0FBdkI7O0FBRUEsUUFBSTRWLGNBQUosRUFBb0I7O0FBRWhCLGVBQU9BLGNBQVA7QUFDSCxLQUhELE1BR087O0FBRUgsZUFBTyxJQUFQO0FBQ0g7QUFDSixDQVhEOztBQWFBOzs7Ozs7QUFNQUwsY0FBY21CLGtCQUFkLEdBQW1DLFVBQVNyWSxPQUFULEVBQWtCO0FBQ2pELFdBQU8sQ0FBQ3NILHFCQUFFRixPQUFGLENBQVVwSCxPQUFWLElBQXFCQSxPQUFyQixHQUErQixDQUFDQSxPQUFELENBQWhDLEVBQTJDeUgsR0FBM0MsQ0FBK0MsVUFBUzJFLE1BQVQsRUFBaUJ6SyxLQUFqQixFQUF1QjtBQUN6RSxZQUFHeUssT0FBTzZGLElBQVAsSUFBZSx5QkFBUzdGLE9BQU82RixJQUFoQixDQUFmLElBQXdDN0YsT0FBTzhGLFdBQS9DLElBQThEOUYsT0FBTytGLE1BQXhFLEVBQStFO0FBQzNFLG1CQUFPLEVBQUN6RSxNQUFPdEIsT0FBTzZGLElBQVAsR0FBYyxHQUFkLEdBQW9CN0YsT0FBTzhGLFdBQTNCLEdBQXlDLEdBQXpDLEdBQStDOUYsT0FBTytGLE1BQTlELEVBQXNFeEUsTUFBTyxRQUE3RSxFQUF1RnJOLE9BQVE4TCxPQUFPOUwsS0FBUCxHQUFlOEwsT0FBTzlMLEtBQXRCLEdBQThCLGFBQVdxQixRQUFNLENBQWpCLENBQTdILEVBQVA7QUFDSDtBQUNKLEtBSk0sQ0FBUDtBQUtILENBTkQ7O2tCQVFldVYsYTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzSGY7Ozs7QUFLTyxJQUFNb0Isa0NBQWEsU0FBYkEsVUFBYSxHQUFVO0FBQ2hDLFFBQUcsQ0FBQ0MsVUFBVUMsU0FBVixDQUFvQjlSLE9BQXBCLENBQTRCLE9BQTVCLEtBQXdDNlIsVUFBVUMsU0FBVixDQUFvQjlSLE9BQXBCLENBQTRCLEtBQTVCLENBQXpDLEtBQWdGLENBQUMsQ0FBcEYsRUFBdUY7QUFDbkYsZUFBTyxPQUFQO0FBQ0gsS0FGRCxNQUVNLElBQUc2UixVQUFVQyxTQUFWLENBQW9COVIsT0FBcEIsQ0FBNEIsUUFBNUIsS0FBeUMsQ0FBQyxDQUE3QyxFQUFnRDtBQUNsRCxlQUFPLFFBQVA7QUFDSCxLQUZLLE1BRUEsSUFBRzZSLFVBQVVDLFNBQVYsQ0FBb0I5UixPQUFwQixDQUE0QixRQUE1QixLQUF5QyxDQUFDLENBQTdDLEVBQStDO0FBQ2pELGVBQU8sUUFBUDtBQUNILEtBRkssTUFFQSxJQUFHNlIsVUFBVUMsU0FBVixDQUFvQjlSLE9BQXBCLENBQTRCLFNBQTVCLEtBQTBDLENBQUMsQ0FBOUMsRUFBaUQ7QUFDbkQsZUFBTyxTQUFQO0FBQ0gsS0FGSyxNQUVBLElBQUk2UixVQUFVQyxTQUFWLENBQW9COVIsT0FBcEIsQ0FBNEIsTUFBNUIsS0FBdUMsQ0FBQyxDQUE1QyxFQUFnRDtBQUNsRCxZQUFJK1IsT0FBT0MsU0FBU0YsU0FBVCxDQUFtQjlSLE9BQW5CLENBQTJCLE1BQTNCLENBQVg7QUFDQSxZQUFHLENBQUMsQ0FBQzZHLFNBQVNvTCxZQUFYLElBQTJCLElBQTlCLEVBQW9DO0FBQ2hDLG1CQUFPLElBQVA7QUFDSCxTQUZELE1BRU0sSUFBRyxDQUFDLENBQUNKLFVBQVVDLFNBQVYsQ0FBb0JJLEtBQXBCLENBQTBCLG1CQUExQixDQUFMLEVBQW9EO0FBQ3RELGdCQUFJLENBQUMvUyxNQUFNdEUsU0FBU3NYLEdBQUdDLFNBQUgsQ0FBYUwsT0FBTyxDQUFwQixFQUF1QkksR0FBR25TLE9BQUgsQ0FBVyxHQUFYLEVBQWdCK1IsSUFBaEIsQ0FBdkIsQ0FBVCxDQUFOLENBQUwsRUFBcUU7QUFDakUsdUJBQU8sSUFBUDtBQUNILGFBRkQsTUFFSztBQUNELHVCQUFPLFNBQVA7QUFDSDtBQUNKLFNBTkssTUFNRDtBQUNELG1CQUFPLFNBQVA7QUFDSDtBQUVKLEtBZEssTUFjRDtBQUNELGVBQU8sU0FBUDtBQUNIO0FBRUosQ0EzQk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRlA7Ozs7OztBQUVBOzs7Ozs7QUFPQSxJQUFNTixNQUFNLFNBQU5BLEdBQU0sQ0FBU1ksaUJBQVQsRUFBMkI7QUFDbkMsUUFBTTNaLE9BQU8sRUFBYjtBQUNBLFFBQU00WixhQUFhLFNBQWJBLFVBQWEsQ0FBU0MsUUFBVCxFQUFvQkMsUUFBcEIsRUFBNkI7QUFDNUMsWUFBSUMsV0FBWUYsU0FBU0csZ0JBQVQsQ0FBMEJGLFFBQTFCLENBQWhCO0FBQ0EsWUFBR0MsU0FBU2haLE1BQVQsR0FBa0IsQ0FBckIsRUFBdUI7QUFDbkIsbUJBQU9nWixRQUFQO0FBQ0gsU0FGRCxNQUVLO0FBQ0QsbUJBQU9BLFNBQVMsQ0FBVCxDQUFQO0FBQ0g7QUFFSixLQVJEOztBQVVBLFFBQUlGLFdBQVcsRUFBZjs7QUFFQSxRQUFJM1IscUJBQUUrUixLQUFGLENBQVFOLGlCQUFSLEVBQTJCLFVBQVNsSyxJQUFULEVBQWM7QUFBQyxlQUFPdkgscUJBQUVnUyxTQUFGLENBQVl6SyxJQUFaLENBQVA7QUFBeUIsS0FBbkUsQ0FBSixFQUF5RTtBQUNyRW9LLG1CQUFXRixpQkFBWDtBQUNILEtBRkQsTUFFTSxJQUFHQSxzQkFBc0IsVUFBekIsRUFBb0M7QUFDdENFLG1CQUFXMUwsUUFBWDtBQUNILEtBRkssTUFFQSxJQUFHd0wsc0JBQXNCLFFBQXpCLEVBQWtDO0FBQ3BDRSxtQkFBV2xMLE1BQVg7QUFDSCxLQUZLLE1BRUQ7QUFDRGtMLG1CQUFXRCxXQUFXekwsUUFBWCxFQUFxQndMLGlCQUFyQixDQUFYO0FBQ0g7O0FBR0QsUUFBRyxDQUFDRSxRQUFKLEVBQWE7QUFDVCxlQUFPLElBQVA7QUFDSDs7QUFFRDdaLFNBQUttYSxJQUFMLEdBQVksVUFBQ0wsUUFBRCxFQUFhO0FBQ3JCLGVBQU9mLElBQUlhLFdBQVdDLFFBQVgsRUFBcUJDLFFBQXJCLENBQUosQ0FBUDtBQUNILEtBRkQ7O0FBSUE5WixTQUFLb2EsR0FBTCxHQUFXLFVBQUN2WSxJQUFELEVBQU9tVCxLQUFQLEVBQWlCO0FBQ3hCLFlBQUc2RSxTQUFTOVksTUFBVCxHQUFrQixDQUFyQixFQUF1QjtBQUNuQjhZLHFCQUFTOVMsT0FBVCxDQUFpQixVQUFTc1QsT0FBVCxFQUFpQjtBQUM5QkEsd0JBQVFDLEtBQVIsQ0FBY3pZLElBQWQsSUFBc0JtVCxLQUF0QjtBQUNILGFBRkQ7QUFHSCxTQUpELE1BSUs7QUFDRDZFLHFCQUFTUyxLQUFULENBQWV6WSxJQUFmLElBQXVCbVQsS0FBdkI7QUFDSDtBQUNKLEtBUkQ7O0FBVUFoVixTQUFLdWEsUUFBTCxHQUFnQixVQUFDMVksSUFBRCxFQUFTO0FBQ3JCLFlBQUdnWSxTQUFTVyxTQUFaLEVBQXNCO0FBQ2xCWCxxQkFBU1csU0FBVCxDQUFtQkMsR0FBbkIsQ0FBdUI1WSxJQUF2QjtBQUNILFNBRkQsTUFFSztBQUNELGdCQUFJNlksYUFBYWIsU0FBU2MsU0FBVCxDQUFtQkMsS0FBbkIsQ0FBeUIsR0FBekIsQ0FBakI7QUFDQSxnQkFBR0YsV0FBV3BULE9BQVgsQ0FBbUJ6RixJQUFuQixNQUE2QixDQUFDLENBQWpDLEVBQW1DO0FBQy9CZ1kseUJBQVNjLFNBQVQsSUFBc0IsTUFBTTlZLElBQTVCO0FBQ0g7QUFDSjtBQUVKLEtBVkQ7O0FBWUE3QixTQUFLNmEsV0FBTCxHQUFtQixVQUFDaFosSUFBRCxFQUFTO0FBQ3hCLFlBQUlnWSxTQUFTVyxTQUFiLEVBQXVCO0FBQ25CWCxxQkFBU1csU0FBVCxDQUFtQnBWLE1BQW5CLENBQTBCdkQsSUFBMUI7QUFDSCxTQUZELE1BRUs7QUFDRGdZLHFCQUFTYyxTQUFULEdBQXFCZCxTQUFTYyxTQUFULENBQW1CMUgsT0FBbkIsQ0FBMkIsSUFBSTZILE1BQUosQ0FBVyxZQUFZalosS0FBSytZLEtBQUwsQ0FBVyxHQUFYLEVBQWdCRyxJQUFoQixDQUFxQixHQUFyQixDQUFaLEdBQXdDLFNBQW5ELEVBQThELElBQTlELENBQTNCLEVBQWdHLEdBQWhHLENBQXJCO0FBRUg7QUFDSixLQVBEOztBQVNBL2EsU0FBS2diLElBQUwsR0FBWSxZQUFLO0FBQ2JuQixpQkFBU1MsS0FBVCxDQUFlVyxPQUFmLEdBQXlCLE9BQXpCO0FBQ0gsS0FGRDs7QUFJQWpiLFNBQUtrYixJQUFMLEdBQVksWUFBSztBQUNickIsaUJBQVNTLEtBQVQsQ0FBZVcsT0FBZixHQUF5QixNQUF6QjtBQUNILEtBRkQ7O0FBSUFqYixTQUFLbWIsTUFBTCxHQUFjLFVBQUNDLFFBQUQsRUFBYTtBQUN2QnZCLGlCQUFTd0IsU0FBVCxJQUFzQkQsUUFBdEI7QUFDSCxLQUZEOztBQUlBcGIsU0FBS3NiLElBQUwsR0FBWSxVQUFDQSxJQUFELEVBQVU7QUFBRTtBQUNwQixZQUFHQSxJQUFILEVBQVE7QUFDSnpCLHFCQUFTMEIsV0FBVCxHQUF1QkQsSUFBdkI7QUFDSCxTQUZELE1BRUs7QUFDRCxtQkFBT3pCLFNBQVMwQixXQUFoQjtBQUNIO0FBQ0osS0FORDs7QUFRQXZiLFNBQUt3YixRQUFMLEdBQWdCLFVBQUMzWixJQUFELEVBQVU7QUFBRTtBQUN4QixZQUFHZ1ksU0FBU1csU0FBWixFQUFzQjtBQUNsQixtQkFBT1gsU0FBU1csU0FBVCxDQUFtQmlCLFFBQW5CLENBQTRCNVosSUFBNUIsQ0FBUDtBQUNILFNBRkQsTUFFSztBQUNELG1CQUFPLElBQUlpWixNQUFKLENBQVcsVUFBVWpaLElBQVYsR0FBaUIsT0FBNUIsRUFBcUMsSUFBckMsRUFBMkMwRixJQUEzQyxDQUFnRHNTLFNBQVNoWSxJQUF6RCxDQUFQO0FBQ0g7QUFDSixLQU5EOztBQVFBN0IsU0FBSzBiLEVBQUwsR0FBVSxVQUFDQyxjQUFELEVBQW9CO0FBQzFCLGVBQU85QixhQUFhOEIsY0FBcEI7QUFDSCxLQUZEOztBQUlBM2IsU0FBSzRiLE1BQUwsR0FBYyxZQUFLO0FBQUs7QUFDcEIsWUFBSUMsT0FBT2hDLFNBQVNpQyxxQkFBVCxFQUFYOztBQUVBLGVBQU87QUFDSEMsaUJBQUtGLEtBQUtFLEdBQUwsR0FBVzVOLFNBQVM2TixJQUFULENBQWNDLFNBRDNCO0FBRUhDLGtCQUFNTCxLQUFLSyxJQUFMLEdBQVkvTixTQUFTNk4sSUFBVCxDQUFjRztBQUY3QixTQUFQO0FBSUgsS0FQRDs7QUFTQW5jLFNBQUtrRyxLQUFMLEdBQWEsWUFBTTtBQUFLO0FBQ3BCLGVBQU8yVCxTQUFTdUMsV0FBaEI7QUFDSCxLQUZEOztBQUlBcGMsU0FBS21HLE1BQUwsR0FBYyxZQUFNO0FBQUk7QUFDcEIsZUFBTzBULFNBQVN3QyxZQUFoQjtBQUNILEtBRkQ7O0FBSUFyYyxTQUFLc2MsSUFBTCxHQUFZLFVBQUNBLElBQUQsRUFBVTtBQUNsQixlQUFPekMsU0FBUzBDLFlBQVQsQ0FBc0JELElBQXRCLENBQVA7QUFDSCxLQUZEOztBQUlBdGMsU0FBS29GLE1BQUwsR0FBYyxZQUFNO0FBQUk7QUFDcEJ5VSxpQkFBUzJDLFVBQVQsQ0FBb0JDLFdBQXBCLENBQWdDNUMsUUFBaEM7QUFDSCxLQUZEOztBQUlBN1osU0FBS2lULE9BQUwsR0FBZSxVQUFDeUosSUFBRCxFQUFVO0FBQ3JCN0MsaUJBQVM4QyxXQUFULENBQXFCRCxJQUFyQjtBQUNILEtBRkQ7O0FBSUExYyxTQUFLbWIsTUFBTCxHQUFjLFVBQUN1QixJQUFELEVBQVU7QUFDcEI3QyxpQkFBUytDLFdBQVQsQ0FBcUJGLElBQXJCO0FBQ0gsS0FGRDs7QUFJQTFjLFNBQUtvRixNQUFMLEdBQWMsWUFBTTtBQUNoQnlVLGlCQUFTelUsTUFBVDtBQUNILEtBRkQ7O0FBSUFwRixTQUFLNmMsR0FBTCxHQUFXLFlBQU07QUFDYixlQUFPaEQsUUFBUDtBQUNILEtBRkQ7O0FBSUE3WixTQUFLOGMsT0FBTCxHQUFlLFVBQUNDLGNBQUQsRUFBb0I7QUFDL0IsZUFBT2xELFNBQVNpRCxPQUFULENBQWlCQyxjQUFqQixDQUFQO0FBQ0gsS0FGRDs7QUFJQSxXQUFPL2MsSUFBUDtBQUNILENBOUlELEMsQ0FaQTs7O2tCQTRKZStZLEc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUpmOzs7O0FBSUEsSUFBTWlFLFNBQVMsU0FBVEEsTUFBUyxHQUFVO0FBQ3JCLFFBQU1oZCxPQUFPLEVBQWI7QUFDQSxRQUFJaWQsaUJBQWlCLElBQXJCOztBQUVBdE8sV0FBTzFPLGlCQUFQLEdBQTJCLEVBQUNDLEtBQU15TyxPQUFPLFNBQVAsRUFBa0IsS0FBbEIsQ0FBUCxFQUEzQjs7QUFFQTNPLFNBQUtrZCxNQUFMLEdBQWMsWUFBSztBQUNmLFlBQUdELGtCQUFrQixJQUFyQixFQUEwQjtBQUN0QjtBQUNIO0FBQ0RoZCwwQkFBa0IsS0FBbEIsSUFBMkJnZCxjQUEzQjtBQUNILEtBTEQ7QUFNQWpkLFNBQUt3RCxPQUFMLEdBQWUsWUFBSztBQUNoQnlaLHlCQUFpQnhGLFFBQVF2WCxHQUF6QjtBQUNBRCwwQkFBa0IsS0FBbEIsSUFBMkIsWUFBVSxDQUFFLENBQXZDO0FBQ0gsS0FIRDtBQUlBRCxTQUFLc0IsT0FBTCxHQUFlLFlBQUs7QUFDaEJxTixlQUFPMU8saUJBQVAsR0FBMkIsSUFBM0I7QUFDSCxLQUZEOztBQUlBLFdBQU9ELElBQVA7QUFDSCxDQXJCRDs7a0JBd0JlZ2QsTTs7Ozs7Ozs7Ozs7Ozs7QUM1QmY7Ozs7Ozs7Ozs7QUFVQyxXQUFTRyxNQUFULEVBQWlCO0FBQ2Q7O0FBQ0EsUUFBSSxFQUFFLFlBQVlBLE1BQVosSUFBc0IsY0FBY0EsTUFBdEMsQ0FBSixFQUNJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFJLENBQUNoUCxTQUFTNkwsZ0JBQWQsRUFBZ0M7QUFDNUI3TCxpQkFBUzZMLGdCQUFULEdBQTRCLFVBQVNvRCxTQUFULEVBQW9CO0FBQzVDLGdCQUFJOUMsUUFBUW5NLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWjtBQUFBLGdCQUE2Q2lQLFdBQVcsRUFBeEQ7QUFBQSxnQkFBNERoRCxPQUE1RDtBQUNBbE0scUJBQVNtUCxlQUFULENBQXlCQyxVQUF6QixDQUFvQ1gsV0FBcEMsQ0FBZ0R0QyxLQUFoRDtBQUNBbk0scUJBQVNxUCxJQUFULEdBQWdCLEVBQWhCOztBQUVBbEQsa0JBQU1tRCxVQUFOLENBQWlCQyxPQUFqQixHQUEyQk4sWUFBWSwrREFBdkM7QUFDQXpPLG1CQUFPZ1AsUUFBUCxDQUFnQixDQUFoQixFQUFtQixDQUFuQjtBQUNBckQsa0JBQU1rQyxVQUFOLENBQWlCQyxXQUFqQixDQUE2Qm5DLEtBQTdCOztBQUVBLG1CQUFPbk0sU0FBU3FQLElBQVQsQ0FBY3pjLE1BQXJCLEVBQTZCO0FBQ3pCc1osMEJBQVVsTSxTQUFTcVAsSUFBVCxDQUFjdFIsS0FBZCxFQUFWO0FBQ0FtTyx3QkFBUUMsS0FBUixDQUFjc0QsZUFBZCxDQUE4QixPQUE5QjtBQUNBUCx5QkFBUzdVLElBQVQsQ0FBYzZSLE9BQWQ7QUFDSDtBQUNEbE0scUJBQVNxUCxJQUFULEdBQWdCLElBQWhCO0FBQ0EsbUJBQU9ILFFBQVA7QUFDSCxTQWhCRDtBQWlCSDs7QUFFRDtBQUNBO0FBQ0EsUUFBSSxDQUFDbFAsU0FBUzBQLGFBQWQsRUFBNkI7QUFDekIxUCxpQkFBUzBQLGFBQVQsR0FBeUIsVUFBU1QsU0FBVCxFQUFvQjtBQUN6QyxnQkFBSUMsV0FBV2xQLFNBQVM2TCxnQkFBVCxDQUEwQm9ELFNBQTFCLENBQWY7QUFDQSxtQkFBUUMsU0FBU3RjLE1BQVYsR0FBb0JzYyxTQUFTLENBQVQsQ0FBcEIsR0FBa0MsSUFBekM7QUFDSCxTQUhEO0FBSUg7O0FBRUQ7QUFDQTtBQUNBLFFBQUksQ0FBQ2xQLFNBQVMyUCxzQkFBZCxFQUFzQztBQUNsQzNQLGlCQUFTMlAsc0JBQVQsR0FBa0MsVUFBU3BELFVBQVQsRUFBcUI7QUFDbkRBLHlCQUFhcUQsT0FBT3JELFVBQVAsRUFBbUJ6SCxPQUFuQixDQUEyQixRQUEzQixFQUFxQyxHQUFyQyxDQUFiO0FBQ0EsbUJBQU85RSxTQUFTNkwsZ0JBQVQsQ0FBMEJVLFVBQTFCLENBQVA7QUFDSCxTQUhEO0FBSUg7O0FBRUQ7QUFDQTtBQUNBeUMsV0FBT2EsSUFBUCxHQUFjYixPQUFPYSxJQUFQLElBQWUsWUFBVztBQUFFLGNBQU1wSSxVQUFVLHFCQUFWLENBQU47QUFBeUMsS0FBbkY7QUFDQSxLQUNJLENBQUMsY0FBRCxFQUFpQixDQUFqQixDQURKLEVBRUksQ0FBQyxnQkFBRCxFQUFtQixDQUFuQixDQUZKLEVBR0ksQ0FBQyxXQUFELEVBQWMsQ0FBZCxDQUhKLEVBSUksQ0FBQyxvQkFBRCxFQUF1QixDQUF2QixDQUpKLEVBS0ksQ0FBQyx1QkFBRCxFQUEwQixDQUExQixDQUxKLEVBTUksQ0FBQyxhQUFELEVBQWdCLENBQWhCLENBTkosRUFPSSxDQUFDLDZCQUFELEVBQWdDLENBQWhDLENBUEosRUFRSSxDQUFDLGNBQUQsRUFBaUIsQ0FBakIsQ0FSSixFQVNJLENBQUMsZUFBRCxFQUFrQixDQUFsQixDQVRKLEVBVUksQ0FBQyxvQkFBRCxFQUF1QixFQUF2QixDQVZKLEVBV0ksQ0FBQyx3QkFBRCxFQUEyQixFQUEzQixDQVhKLEVBWUksQ0FBQyxlQUFELEVBQWtCLEVBQWxCLENBWkosRUFhRTdPLE9BYkYsQ0FhVSxVQUFTa1gsQ0FBVCxFQUFZO0FBQUUsWUFBSSxFQUFFQSxFQUFFLENBQUYsS0FBUWQsT0FBT2EsSUFBakIsQ0FBSixFQUE0QmIsT0FBT2EsSUFBUCxDQUFZQyxFQUFFLENBQUYsQ0FBWixJQUFvQkEsRUFBRSxDQUFGLENBQXBCO0FBQTJCLEtBYi9FOztBQWVBO0FBQ0E7QUFDQWQsV0FBT2UsWUFBUCxHQUFzQmYsT0FBT2UsWUFBUCxJQUF1QixZQUFXO0FBQUUsY0FBTXRJLFVBQVUscUJBQVYsQ0FBTjtBQUF5QyxLQUFuRztBQUNBLEtBQ0ksQ0FBQyxnQkFBRCxFQUFtQixDQUFuQixDQURKLEVBRUksQ0FBQyxvQkFBRCxFQUF1QixDQUF2QixDQUZKLEVBR0ksQ0FBQyx1QkFBRCxFQUEwQixDQUExQixDQUhKLEVBSUksQ0FBQyxvQkFBRCxFQUF1QixDQUF2QixDQUpKLEVBS0ksQ0FBQyx1QkFBRCxFQUEwQixDQUExQixDQUxKLEVBTUksQ0FBQyxxQkFBRCxFQUF3QixDQUF4QixDQU5KLEVBT0ksQ0FBQyw2QkFBRCxFQUFnQyxDQUFoQyxDQVBKLEVBUUksQ0FBQyxlQUFELEVBQWtCLENBQWxCLENBUkosRUFTSSxDQUFDLG1CQUFELEVBQXNCLENBQXRCLENBVEosRUFVSSxDQUFDLHFCQUFELEVBQXdCLEVBQXhCLENBVkosRUFXSSxDQUFDLG1CQUFELEVBQXNCLEVBQXRCLENBWEosRUFZSSxDQUFDLFlBQUQsRUFBZSxFQUFmLENBWkosRUFhSSxDQUFDLDBCQUFELEVBQTZCLEVBQTdCLENBYkosRUFjSSxDQUFDLGVBQUQsRUFBa0IsRUFBbEIsQ0FkSixFQWVJLENBQUMsb0JBQUQsRUFBdUIsRUFBdkIsQ0FmSixFQWdCRTdPLE9BaEJGLENBZ0JVLFVBQVNrWCxDQUFULEVBQVk7QUFBRSxZQUFJLEVBQUVBLEVBQUUsQ0FBRixLQUFRZCxPQUFPZSxZQUFqQixDQUFKLEVBQW9DZixPQUFPZSxZQUFQLENBQW9CRCxFQUFFLENBQUYsQ0FBcEIsSUFBNEJBLEVBQUUsQ0FBRixDQUE1QjtBQUFtQyxLQWhCL0Y7O0FBa0JBO0FBQ0E7QUFDQyxpQkFBVTtBQUNQLFlBQUksRUFBRSxhQUFhZCxNQUFmLEtBQTBCZ0IsUUFBUXBTLFNBQVIsQ0FBa0JxUyxnQkFBNUMsSUFBZ0UsQ0FBQ3ZYLE9BQU93WCxjQUE1RSxFQUNJOztBQUVKOztBQUVBO0FBQ0FDLGNBQU1DLGVBQU4sR0FBd0IsQ0FBeEI7QUFDQUQsY0FBTUUsU0FBTixHQUF3QixDQUF4QjtBQUNBRixjQUFNRyxjQUFOLEdBQXdCLENBQXhCOztBQUVBNVgsZUFBTzZYLGdCQUFQLENBQXdCSixNQUFNdlMsU0FBOUIsRUFBeUM7QUFDckN3Uyw2QkFBaUIsRUFBRTFCLEtBQUssZUFBVztBQUFFLDJCQUFPLENBQVA7QUFBVyxpQkFBL0IsRUFEb0I7QUFFckMyQix1QkFBaUIsRUFBRTNCLEtBQUssZUFBVztBQUFFLDJCQUFPLENBQVA7QUFBVyxpQkFBL0IsRUFGb0I7QUFHckM0Qiw0QkFBa0IsRUFBRTVCLEtBQUssZUFBVztBQUFFLDJCQUFPLENBQVA7QUFBVyxpQkFBL0IsRUFIbUI7QUFJckM4QixvQkFBUTtBQUNKOUIscUJBQUssZUFBVztBQUNaLDJCQUFPLEtBQUsrQixVQUFaO0FBQ0gsaUJBSEcsRUFKNkI7QUFRckNDLDJCQUFlO0FBQ1hoQyxxQkFBSyxlQUFXO0FBQ1osMkJBQU8sS0FBS2lDLGNBQVo7QUFDSCxpQkFIVSxFQVJzQjtBQVlyQ0Msd0JBQVk7QUFDUmxDLHFCQUFLLGVBQVc7QUFDWiwyQkFBUSxLQUFLK0IsVUFBTCxLQUFvQixLQUFLQyxhQUExQixHQUEyQ1AsTUFBTUUsU0FBakQsR0FBNkRGLE1BQU1HLGNBQTFFO0FBQ0gsaUJBSE8sRUFaeUI7QUFnQnJDTyxxQkFBUztBQUNMbkMscUJBQUssZUFBVztBQUNaLDRCQUFRLEtBQUt0TyxJQUFiO0FBQ0k7QUFDQSw2QkFBSyxPQUFMO0FBQ0EsNkJBQUssVUFBTDtBQUNBLDZCQUFLLFdBQUw7QUFDQSw2QkFBSyxTQUFMO0FBQ0EsNkJBQUssV0FBTDtBQUNBLDZCQUFLLFdBQUw7QUFDQSw2QkFBSyxVQUFMO0FBQ0EsNkJBQUssWUFBTDtBQUNBO0FBQ0EsNkJBQUssU0FBTDtBQUNBLDZCQUFLLFVBQUw7QUFDQSw2QkFBSyxPQUFMO0FBQ0E7QUFDQSw2QkFBSyxRQUFMO0FBQ0EsNkJBQUssUUFBTDtBQUNBO0FBQ0EsNkJBQUssUUFBTDtBQUNBLDZCQUFLLFFBQUw7QUFDQSw2QkFBSyxRQUFMO0FBQ0EsNkJBQUssT0FBTDtBQUNJLG1DQUFPLElBQVA7QUF0QlI7QUF3QkEsMkJBQU8sS0FBUDtBQUNILGlCQTNCSSxFQWhCNEI7QUE0Q3JDMFEsd0JBQVk7QUFDUnBDLHFCQUFLLGVBQVc7QUFDWiw0QkFBUSxLQUFLdE8sSUFBYjtBQUNJO0FBQ0EsNkJBQUssT0FBTDtBQUNBLDZCQUFLLFVBQUw7QUFDQSw2QkFBSyxXQUFMO0FBQ0EsNkJBQUssU0FBTDtBQUNBLDZCQUFLLFdBQUw7QUFDQSw2QkFBSyxVQUFMO0FBQ0EsNkJBQUssWUFBTDtBQUNBO0FBQ0EsNkJBQUssU0FBTDtBQUNBLDZCQUFLLFVBQUw7QUFDQSw2QkFBSyxPQUFMO0FBQ0E7QUFDQSw2QkFBSyxRQUFMO0FBQ0ksbUNBQU8sSUFBUDtBQWZSO0FBaUJBLDJCQUFPLEtBQVA7QUFDSCxpQkFwQk8sRUE1Q3lCO0FBaUVyQzJRLHVCQUFXO0FBQ1ByQyxxQkFBSyxlQUFXO0FBQ1osMkJBQU8sS0FBS3NDLFVBQVo7QUFDSCxpQkFITSxFQWpFMEI7QUFxRXJDQyw2QkFBaUI7QUFDYnBLLHVCQUFPLGlCQUFXO0FBQ2QseUJBQUtxSyxZQUFMLEdBQW9CLElBQXBCO0FBQ0gsaUJBSFksRUFyRW9CO0FBeUVyQ0MsNEJBQWdCO0FBQ1p0Syx1QkFBTyxpQkFBVztBQUNkLHlCQUFLdUssV0FBTCxHQUFtQixLQUFuQjtBQUNILGlCQUhXLEVBekVxQjtBQTZFckNDLDhCQUFrQjtBQUNkM0MscUJBQUssZUFBVztBQUNaLDJCQUFPLEtBQUswQyxXQUFMLEtBQXFCLEtBQTVCO0FBQ0gsaUJBSGE7QUE3RW1CLFNBQXpDOztBQW1GQTs7QUFFQSxpQkFBU25CLGdCQUFULENBQTBCN1AsSUFBMUIsRUFBZ0NoRSxRQUFoQyxFQUEwQ2tWLFVBQTFDLEVBQXNEO0FBQ2xELGdCQUFJLE9BQU9sVixRQUFQLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ3BDLGdCQUFJZ0UsU0FBUyxrQkFBYixFQUFpQ0EsT0FBTyxNQUFQO0FBQ2pDLGdCQUFJb1EsU0FBUyxJQUFiO0FBQ0EsZ0JBQUllLElBQUksU0FBSkEsQ0FBSSxDQUFTL0ksQ0FBVCxFQUFZO0FBQ2hCQSxrQkFBRXdJLFVBQUYsR0FBZVEsS0FBS0MsR0FBTCxFQUFmO0FBQ0FqSixrQkFBRW1JLGNBQUYsR0FBbUJILE1BQW5CO0FBQ0FwVSx5QkFBU0UsSUFBVCxDQUFjLElBQWQsRUFBb0JrTSxDQUFwQjtBQUNBQSxrQkFBRW1JLGNBQUYsR0FBbUIsSUFBbkI7QUFDSCxhQUxEO0FBTUEsaUJBQUssTUFBTXZRLElBQU4sR0FBYWhFLFFBQWxCLElBQThCbVYsQ0FBOUI7QUFDQSxpQkFBS0csV0FBTCxDQUFpQixPQUFPdFIsSUFBeEIsRUFBOEJtUixDQUE5QjtBQUNIOztBQUVELGlCQUFTSSxtQkFBVCxDQUE2QnZSLElBQTdCLEVBQW1DaEUsUUFBbkMsRUFBNkNrVixVQUE3QyxFQUF5RDtBQUNyRCxnQkFBSSxPQUFPbFYsUUFBUCxLQUFvQixVQUF4QixFQUFvQztBQUNwQyxnQkFBSWdFLFNBQVMsa0JBQWIsRUFBaUNBLE9BQU8sTUFBUDtBQUNqQyxnQkFBSW1SLElBQUksS0FBSyxNQUFNblIsSUFBTixHQUFhaEUsUUFBbEIsQ0FBUjtBQUNBLGdCQUFJbVYsQ0FBSixFQUFPO0FBQ0gscUJBQUtLLFdBQUwsQ0FBaUIsT0FBT3hSLElBQXhCLEVBQThCbVIsQ0FBOUI7QUFDQSxxQkFBSyxNQUFNblIsSUFBTixHQUFhaEUsUUFBbEIsSUFBOEIsSUFBOUI7QUFDSDtBQUNKOztBQUVELFNBQUN5VixNQUFELEVBQVNDLFlBQVQsRUFBdUI5QixPQUF2QixFQUFnQ3BYLE9BQWhDLENBQXdDLFVBQVNtWixDQUFULEVBQVk7QUFDaERBLGNBQUVuVSxTQUFGLENBQVlxUyxnQkFBWixHQUErQkEsZ0JBQS9CO0FBQ0E4QixjQUFFblUsU0FBRixDQUFZK1QsbUJBQVosR0FBa0NBLG1CQUFsQztBQUNILFNBSEQ7QUFJSCxLQTVIQSxHQUFEOztBQThIQTtBQUNBO0FBQ0E7QUFDQSxLQUFDLFlBQVk7QUFDVCxZQUFJLGlCQUFpQjNDLE1BQWpCLElBQTJCLE9BQU9BLE9BQU9nRCxXQUFkLEtBQThCLFVBQTdELEVBQ0k7QUFDSixpQkFBU0EsV0FBVCxDQUF1QjdWLEtBQXZCLEVBQThCOFYsTUFBOUIsRUFBdUM7QUFDbkNBLHFCQUFTQSxVQUFVLEVBQUVwQixTQUFTLEtBQVgsRUFBa0JDLFlBQVksS0FBOUIsRUFBcUNvQixRQUFRL1osU0FBN0MsRUFBbkI7QUFDQSxnQkFBSWdhLE1BQU1uUyxTQUFTb1MsV0FBVCxDQUFzQixhQUF0QixDQUFWO0FBQ0FELGdCQUFJRSxlQUFKLENBQXFCbFcsS0FBckIsRUFBNEI4VixPQUFPcEIsT0FBbkMsRUFBNENvQixPQUFPbkIsVUFBbkQsRUFBK0RtQixPQUFPQyxNQUF0RTtBQUNBLG1CQUFPQyxHQUFQO0FBQ0g7QUFDREgsb0JBQVlwVSxTQUFaLEdBQXdCb1IsT0FBT21CLEtBQVAsQ0FBYXZTLFNBQXJDO0FBQ0FvUixlQUFPZ0QsV0FBUCxHQUFxQkEsV0FBckI7QUFDSCxLQVhEOztBQWFBO0FBQ0E7QUFDQTtBQUNBeFIsV0FBTzhSLFFBQVAsR0FBa0IsVUFBUzlYLEdBQVQsRUFBYzRGLElBQWQsRUFBb0JrSCxFQUFwQixFQUF3QjtBQUN0QyxZQUFJOU0sSUFBSXlWLGdCQUFSLEVBQTBCO0FBQ3RCelYsZ0JBQUl5VixnQkFBSixDQUFxQjdQLElBQXJCLEVBQTJCa0gsRUFBM0IsRUFBK0IsS0FBL0I7QUFDSCxTQUZELE1BRU8sSUFBSTlNLElBQUlrWCxXQUFSLEVBQXFCO0FBQ3hCbFgsZ0JBQUksTUFBTTRGLElBQU4sR0FBYWtILEVBQWpCLElBQXVCQSxFQUF2QjtBQUNBOU0sZ0JBQUk0RixPQUFPa0gsRUFBWCxJQUFpQixZQUFXO0FBQ3hCLG9CQUFJa0IsSUFBSWhJLE9BQU9yRSxLQUFmO0FBQ0FxTSxrQkFBRWtJLGFBQUYsR0FBa0JsVyxHQUFsQjtBQUNBZ08sa0JBQUUySSxjQUFGLEdBQW1CLFlBQVc7QUFBRTNJLHNCQUFFNEksV0FBRixHQUFnQixLQUFoQjtBQUF3QixpQkFBeEQ7QUFDQTVJLGtCQUFFeUksZUFBRixHQUFvQixZQUFXO0FBQUV6SSxzQkFBRTBJLFlBQUYsR0FBaUIsSUFBakI7QUFBd0IsaUJBQXpEO0FBQ0ExSSxrQkFBRWdJLE1BQUYsR0FBV2hJLEVBQUVpSSxVQUFiO0FBQ0FqSSxrQkFBRXVJLFNBQUYsR0FBY1MsS0FBS0MsR0FBTCxFQUFkO0FBQ0FqWCxvQkFBSSxNQUFNNEYsSUFBTixHQUFha0gsRUFBakIsRUFBcUJoTCxJQUFyQixDQUEwQixJQUExQixFQUFnQ2tNLENBQWhDO0FBQ0gsYUFSRDtBQVNBaE8sZ0JBQUlrWCxXQUFKLENBQWdCLE9BQU90UixJQUF2QixFQUE2QjVGLElBQUk0RixPQUFPa0gsRUFBWCxDQUE3QjtBQUNIO0FBQ0osS0FoQkQ7O0FBa0JBOUcsV0FBTytSLFdBQVAsR0FBcUIsVUFBUy9YLEdBQVQsRUFBYzRGLElBQWQsRUFBb0JrSCxFQUFwQixFQUF3QjtBQUN6QyxZQUFJOU0sSUFBSW1YLG1CQUFSLEVBQTZCO0FBQ3pCblgsZ0JBQUltWCxtQkFBSixDQUF3QnZSLElBQXhCLEVBQThCa0gsRUFBOUIsRUFBa0MsS0FBbEM7QUFDSCxTQUZELE1BRU8sSUFBSTlNLElBQUlvWCxXQUFSLEVBQXFCO0FBQ3hCcFgsZ0JBQUlvWCxXQUFKLENBQWdCLE9BQU94UixJQUF2QixFQUE2QjVGLElBQUk0RixPQUFPa0gsRUFBWCxDQUE3QjtBQUNBOU0sZ0JBQUk0RixPQUFPa0gsRUFBWCxJQUFpQixJQUFqQjtBQUNBOU0sZ0JBQUksTUFBTTRGLElBQU4sR0FBYWtILEVBQWpCLElBQXVCLElBQXZCO0FBQ0g7QUFDSixLQVJEOztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0MsaUJBQVc7QUFDUixpQkFBU2tMLGdCQUFULENBQTBCVCxDQUExQixFQUE2QmpDLENBQTdCLEVBQWdDO0FBQzVCLHFCQUFTckQsS0FBVCxDQUFlZ0csQ0FBZixFQUFrQjtBQUFFLHVCQUFPQSxFQUFFN2YsTUFBRixHQUFXNmYsRUFBRWhHLEtBQUYsQ0FBUSxNQUFSLENBQVgsR0FBNkIsRUFBcEM7QUFBeUM7O0FBRTdEO0FBQ0EscUJBQVNpRyxxQkFBVCxDQUErQkMsS0FBL0IsRUFBc0NDLE1BQXRDLEVBQThDO0FBQzFDLG9CQUFJQyxTQUFTcEcsTUFBTW1HLE1BQU4sQ0FBYjtBQUFBLG9CQUNJeGUsUUFBUXllLE9BQU8xWixPQUFQLENBQWV3WixLQUFmLENBRFo7QUFFQSxvQkFBSXZlLFVBQVUsQ0FBQyxDQUFmLEVBQWtCO0FBQ2R5ZSwyQkFBT3JVLE1BQVAsQ0FBY3BLLEtBQWQsRUFBcUIsQ0FBckI7QUFDSDtBQUNELHVCQUFPeWUsT0FBT2pHLElBQVAsQ0FBWSxHQUFaLENBQVA7QUFDSDs7QUFFRGxVLG1CQUFPNlgsZ0JBQVAsQ0FDSSxJQURKLEVBRUk7QUFDSTNkLHdCQUFRO0FBQ0o4Yix5QkFBSyxlQUFXO0FBQUUsK0JBQU9qQyxNQUFNc0YsRUFBRWpDLENBQUYsQ0FBTixFQUFZbGQsTUFBbkI7QUFBNEI7QUFEMUMsaUJBRFo7O0FBS0kwTyxzQkFBTTtBQUNGdUYsMkJBQU8sZUFBU2lNLEdBQVQsRUFBYztBQUNqQiw0QkFBSUQsU0FBU3BHLE1BQU1zRixFQUFFakMsQ0FBRixDQUFOLENBQWI7QUFDQSwrQkFBTyxLQUFLZ0QsR0FBTCxJQUFZQSxNQUFNRCxPQUFPamdCLE1BQXpCLEdBQWtDaWdCLE9BQU9DLEdBQVAsQ0FBbEMsR0FBZ0QsSUFBdkQ7QUFDSDtBQUpDLGlCQUxWOztBQVlJeEYsMEJBQVU7QUFDTnpHLDJCQUFPLGVBQVM4TCxLQUFULEVBQWdCO0FBQ25CQSxnQ0FBUS9DLE9BQU8rQyxLQUFQLENBQVI7QUFDQSw0QkFBSUEsTUFBTS9mLE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFBRSxrQ0FBTW1nQixhQUFOO0FBQXNCO0FBQ2hELDRCQUFJLEtBQUszWixJQUFMLENBQVV1WixLQUFWLENBQUosRUFBc0I7QUFBRSxrQ0FBTTNNLE1BQU0sdUJBQU4sQ0FBTjtBQUF1QztBQUMvRCw0QkFBSTZNLFNBQVNwRyxNQUFNc0YsRUFBRWpDLENBQUYsQ0FBTixDQUFiOztBQUVBLCtCQUFPK0MsT0FBTzFaLE9BQVAsQ0FBZXdaLEtBQWYsTUFBMEIsQ0FBQyxDQUFsQztBQUNIO0FBUkssaUJBWmQ7O0FBdUJJckcscUJBQUs7QUFDRHpGLDJCQUFPLGlCQUFTLGFBQWU7QUFDM0IsNEJBQUlnTSxTQUFTalosTUFBTWdFLFNBQU4sQ0FBZ0I3RSxLQUFoQixDQUFzQnVELElBQXRCLENBQTJCQyxTQUEzQixFQUFzQ3JDLEdBQXRDLENBQTBDMFYsTUFBMUMsQ0FBYjtBQUNBLDRCQUFJaUQsT0FBT0csSUFBUCxDQUFZLFVBQVNMLEtBQVQsRUFBZ0I7QUFBRSxtQ0FBT0EsTUFBTS9mLE1BQU4sS0FBaUIsQ0FBeEI7QUFBNEIseUJBQTFELENBQUosRUFBaUU7QUFDN0Qsa0NBQU1tZ0IsYUFBTjtBQUNIO0FBQ0QsNEJBQUlGLE9BQU9HLElBQVAsQ0FBWSxVQUFTTCxLQUFULEVBQWdCO0FBQUUsbUNBQVEsS0FBRCxDQUFPdlosSUFBUCxDQUFZdVosS0FBWjtBQUFQO0FBQTRCLHlCQUExRCxDQUFKLEVBQWlFO0FBQzdELGtDQUFNM00sTUFBTSx1QkFBTixDQUFOO0FBQ0g7O0FBRUQsNEJBQUk7QUFDQSxnQ0FBSWlOLG9CQUFvQmxCLEVBQUVqQyxDQUFGLENBQXhCO0FBQ0EsZ0NBQUlvRCxhQUFhekcsTUFBTXdHLGlCQUFOLENBQWpCO0FBQ0FKLHFDQUFTQSxPQUFPL1ksTUFBUCxDQUFjLFVBQVM2WSxLQUFULEVBQWdCO0FBQUUsdUNBQU9PLFdBQVcvWixPQUFYLENBQW1Cd1osS0FBbkIsTUFBOEIsQ0FBQyxDQUF0QztBQUEwQyw2QkFBMUUsQ0FBVDtBQUNBLGdDQUFJRSxPQUFPamdCLE1BQVAsS0FBa0IsQ0FBdEIsRUFBeUI7QUFDckI7QUFDSDtBQUNELGdDQUFJcWdCLGtCQUFrQnJnQixNQUFsQixLQUE2QixDQUE3QixJQUFrQyxDQUFFLEtBQUQsQ0FBUXdHLElBQVIsQ0FBYTZaLGlCQUFiLENBQXZDLEVBQXdFO0FBQ3BFQSxxREFBcUIsR0FBckI7QUFDSDtBQUNEQSxpREFBcUJKLE9BQU9qRyxJQUFQLENBQVksR0FBWixDQUFyQjtBQUNBbUYsOEJBQUVqQyxDQUFGLElBQU9tRCxpQkFBUDtBQUNILHlCQVpELFNBWVU7QUFDTixnQ0FBSXJnQixTQUFTNlosTUFBTXNGLEVBQUVqQyxDQUFGLENBQU4sRUFBWWxkLE1BQXpCO0FBQ0EsZ0NBQUksS0FBS0EsTUFBTCxLQUFnQkEsTUFBcEIsRUFBNEI7QUFBRSxxQ0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQXVCO0FBQ3hEO0FBQ0o7QUExQkEsaUJBdkJUOztBQW9ESXFFLHdCQUFRO0FBQ0o0UCwyQkFBTyxpQkFBUyxhQUFlO0FBQzNCLDRCQUFJZ00sU0FBU2paLE1BQU1nRSxTQUFOLENBQWdCN0UsS0FBaEIsQ0FBc0J1RCxJQUF0QixDQUEyQkMsU0FBM0IsRUFBc0NyQyxHQUF0QyxDQUEwQzBWLE1BQTFDLENBQWI7QUFDQSw0QkFBSWlELE9BQU9HLElBQVAsQ0FBWSxVQUFTTCxLQUFULEVBQWdCO0FBQUUsbUNBQU9BLE1BQU0vZixNQUFOLEtBQWlCLENBQXhCO0FBQTRCLHlCQUExRCxDQUFKLEVBQWlFO0FBQzdELGtDQUFNbWdCLGFBQU47QUFDSDtBQUNELDRCQUFJRixPQUFPRyxJQUFQLENBQVksVUFBU0wsS0FBVCxFQUFnQjtBQUFFLG1DQUFRLEtBQUQsQ0FBT3ZaLElBQVAsQ0FBWXVaLEtBQVo7QUFBUDtBQUE0Qix5QkFBMUQsQ0FBSixFQUFpRTtBQUM3RCxrQ0FBTTNNLE1BQU0sdUJBQU4sQ0FBTjtBQUNIOztBQUVELDRCQUFJO0FBQ0EsZ0NBQUlpTixvQkFBb0JsQixFQUFFakMsQ0FBRixDQUF4QjtBQUNBK0MsbUNBQU9qYSxPQUFQLENBQWUsVUFBUytaLEtBQVQsRUFBZ0I7QUFDM0JNLG9EQUFvQlAsc0JBQXNCQyxLQUF0QixFQUE2Qk0saUJBQTdCLENBQXBCO0FBQ0gsNkJBRkQ7QUFHQWxCLDhCQUFFakMsQ0FBRixJQUFPbUQsaUJBQVA7QUFDSCx5QkFORCxTQU1VO0FBQ04sZ0NBQUlyZ0IsU0FBUzZaLE1BQU1zRixFQUFFakMsQ0FBRixDQUFOLEVBQVlsZCxNQUF6QjtBQUNBLGdDQUFJLEtBQUtBLE1BQUwsS0FBZ0JBLE1BQXBCLEVBQTRCO0FBQUUscUNBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUF1QjtBQUN4RDtBQUNKO0FBcEJHLGlCQXBEWjs7QUEyRUl1Z0Isd0JBQVE7QUFDSnRNLDJCQUFPLGVBQVM4TCxLQUFULENBQWMsV0FBZCxFQUEyQjtBQUM5Qiw0QkFBSVMsUUFBUTdXLFVBQVUsQ0FBVixDQUFaO0FBQ0EsNEJBQUk7QUFDQW9XLG9DQUFRL0MsT0FBTytDLEtBQVAsQ0FBUjtBQUNBLGdDQUFJQSxNQUFNL2YsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUFFLHNDQUFNbWdCLGFBQU47QUFBc0I7QUFDaEQsZ0NBQUksS0FBSzNaLElBQUwsQ0FBVXVaLEtBQVYsQ0FBSixFQUFzQjtBQUFFLHNDQUFNM00sTUFBTSx1QkFBTixDQUFOO0FBQXVDO0FBQy9ELGdDQUFJNk0sU0FBU3BHLE1BQU1zRixFQUFFakMsQ0FBRixDQUFOLENBQWI7QUFBQSxnQ0FDSTFiLFFBQVF5ZSxPQUFPMVosT0FBUCxDQUFld1osS0FBZixDQURaOztBQUdBLGdDQUFJdmUsVUFBVSxDQUFDLENBQVgsS0FBaUIsQ0FBQ2dmLEtBQUQsSUFBVUEsVUFBVyxLQUFLLENBQTNDLENBQUosRUFBb0Q7QUFDaERyQixrQ0FBRWpDLENBQUYsSUFBTzRDLHNCQUFzQkMsS0FBdEIsRUFBNkJaLEVBQUVqQyxDQUFGLENBQTdCLENBQVA7QUFDQSx1Q0FBTyxLQUFQO0FBQ0g7QUFDRCxnQ0FBSTFiLFVBQVUsQ0FBQyxDQUFYLElBQWdCZ2YsS0FBcEIsRUFBMkI7QUFDdkIsdUNBQU8sSUFBUDtBQUNIO0FBQ0QsZ0NBQUlILG9CQUFvQmxCLEVBQUVqQyxDQUFGLENBQXhCO0FBQ0EsZ0NBQUltRCxrQkFBa0JyZ0IsTUFBbEIsS0FBNkIsQ0FBN0IsSUFBa0MsQ0FBQyxNQUFNd0csSUFBTixDQUFXNlosaUJBQVgsQ0FBdkMsRUFBc0U7QUFDbEVBLHFEQUFxQixHQUFyQjtBQUNIO0FBQ0RBLGlEQUFxQk4sS0FBckI7QUFDQVosOEJBQUVqQyxDQUFGLElBQU9tRCxpQkFBUDtBQUNBLG1DQUFPLElBQVA7QUFDSCx5QkFyQkQsU0FxQlU7QUFDTixnQ0FBSXJnQixTQUFTNlosTUFBTXNGLEVBQUVqQyxDQUFGLENBQU4sRUFBWWxkLE1BQXpCO0FBQ0EsZ0NBQUksS0FBS0EsTUFBTCxLQUFnQkEsTUFBcEIsRUFBNEI7QUFBRSxxQ0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQXVCO0FBQ3hEO0FBQ0o7QUE1QkcsaUJBM0VaOztBQTBHSXNHLDBCQUFVO0FBQ04yTiwyQkFBTyxpQkFBVztBQUNkLCtCQUFPa0wsRUFBRWpDLENBQUYsQ0FBUDtBQUNIO0FBSEs7QUExR2QsYUFGSjtBQWtIQSxnQkFBSSxFQUFFLFlBQVksSUFBZCxDQUFKLEVBQXlCO0FBQ3JCO0FBQ0EscUJBQUtsZCxNQUFMLEdBQWM2WixNQUFNc0YsRUFBRWpDLENBQUYsQ0FBTixFQUFZbGQsTUFBMUI7QUFDSCxhQUhELE1BR087QUFDSDtBQUNBLHFCQUFLLElBQUlELElBQUksQ0FBYixFQUFnQkEsSUFBSSxHQUFwQixFQUF5QixFQUFFQSxDQUEzQixFQUE4QjtBQUMxQitGLDJCQUFPd1gsY0FBUCxDQUFzQixJQUF0QixFQUE0Qk4sT0FBT2pkLENBQVAsQ0FBNUIsRUFBdUM7QUFDbkMrYiw2QkFBTSxVQUFTMkUsQ0FBVCxFQUFZO0FBQUUsbUNBQU8sWUFBVztBQUFFLHVDQUFPLEtBQUsvUixJQUFMLENBQVUrUixDQUFWLENBQVA7QUFBc0IsNkJBQTFDO0FBQTZDLHlCQUEzRCxDQUE0RDFnQixDQUE1RDtBQUQ2QixxQkFBdkM7QUFHSDtBQUNKO0FBQ0o7O0FBRUQsaUJBQVMyZ0IscUJBQVQsQ0FBK0J4RCxDQUEvQixFQUFrQ3lCLENBQWxDLEVBQXFDO0FBQ2pDLGdCQUFJLGFBQWF2QyxNQUFiLElBQXVCZ0IsUUFBUXBTLFNBQS9CLElBQTRDbEYsT0FBT3dYLGNBQXZELEVBQXVFO0FBQ25FeFgsdUJBQU93WCxjQUFQLENBQXNCRixRQUFRcFMsU0FBOUIsRUFBeUNrUyxDQUF6QyxFQUE0QyxFQUFFcEIsS0FBSzZDLENBQVAsRUFBNUM7QUFDSDtBQUNKOztBQUVEO0FBQ0E7QUFDQSxZQUFJLGVBQWV2UixTQUFTQyxhQUFULENBQXVCLE1BQXZCLENBQW5CLEVBQW1EO0FBQy9DTyxtQkFBTytTLFlBQVAsR0FBc0IsVUFBU0MsSUFBVCxFQUFlO0FBQUUsdUJBQU9BLEtBQUtuSCxTQUFaO0FBQXdCLGFBQS9EO0FBQ0gsU0FGRCxNQUVPO0FBQ0g3TCxtQkFBTytTLFlBQVAsR0FBc0IsVUFBU0MsSUFBVCxFQUFlO0FBQUUsdUJBQU8sSUFBSWhCLGdCQUFKLENBQXFCZ0IsSUFBckIsRUFBMkIsV0FBM0IsQ0FBUDtBQUFpRCxhQUF4RjtBQUNBRixrQ0FBc0IsV0FBdEIsRUFBbUMsWUFBVztBQUFFLHVCQUFPLElBQUlkLGdCQUFKLENBQXFCLElBQXJCLEVBQTJCLFdBQTNCLENBQVA7QUFBaUQsYUFBakc7QUFDSDs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxZQUFJLGFBQWF4UyxTQUFTQyxhQUFULENBQXVCLE1BQXZCLENBQWpCLEVBQWlEO0FBQzdDTyxtQkFBT2lULFVBQVAsR0FBb0IsVUFBU0QsSUFBVCxFQUFlO0FBQUUsdUJBQU9BLEtBQUtFLE9BQVo7QUFBc0IsYUFBM0Q7QUFDSCxTQUZELE1BRU87QUFDSGxULG1CQUFPaVQsVUFBUCxHQUFvQixVQUFTRCxJQUFULEVBQWU7QUFBRSx1QkFBTyxJQUFJaEIsZ0JBQUosQ0FBcUJnQixJQUFyQixFQUEyQixLQUEzQixDQUFQO0FBQTJDLGFBQWhGO0FBQ0FGLGtDQUFzQixTQUF0QixFQUFpQyxZQUFXO0FBQUUsdUJBQU8sSUFBSWQsZ0JBQUosQ0FBcUIsSUFBckIsRUFBMkIsS0FBM0IsQ0FBUDtBQUEyQyxhQUF6RjtBQUNIOztBQUVEO0FBQ0MscUJBQVc7QUFDUixnQkFBSSxFQUFFLGtCQUFrQnhELE1BQXBCLENBQUosRUFBaUM7QUFDakMsZ0JBQUl4RyxJQUFJeEksU0FBU0MsYUFBVCxDQUF1QixNQUF2QixDQUFSO0FBQ0EsZ0JBQUksRUFBRSxlQUFldUksQ0FBakIsQ0FBSixFQUF5QjtBQUN6QkEsY0FBRTZELFNBQUYsQ0FBWThHLE1BQVosQ0FBbUIsR0FBbkIsRUFBd0IsS0FBeEI7QUFDQSxnQkFBSSxDQUFDM0ssRUFBRTZELFNBQUYsQ0FBWWlCLFFBQVosQ0FBcUIsR0FBckIsQ0FBTCxFQUFnQztBQUNoQzBCLG1CQUFPMkUsWUFBUCxDQUFvQi9WLFNBQXBCLENBQThCdVYsTUFBOUIsR0FBdUMsU0FBU0EsTUFBVCxDQUFnQlIsS0FBaEIsQ0FBcUIsV0FBckIsRUFBa0M7QUFDckUsb0JBQUlTLFFBQVE3VyxVQUFVLENBQVYsQ0FBWjtBQUNBLG9CQUFJNlcsVUFBVWpiLFNBQWQsRUFBeUI7QUFDckIsd0JBQUltVSxNQUFNLENBQUMsS0FBS2dCLFFBQUwsQ0FBY3FGLEtBQWQsQ0FBWDtBQUNBLHlCQUFLckcsTUFBTSxLQUFOLEdBQWMsUUFBbkIsRUFBNkJxRyxLQUE3QjtBQUNBLDJCQUFPckcsR0FBUDtBQUNIO0FBQ0Q4Ryx3QkFBUSxDQUFDLENBQUNBLEtBQVY7QUFDQSxxQkFBS0EsUUFBUSxLQUFSLEdBQWdCLFFBQXJCLEVBQStCVCxLQUEvQjtBQUNBLHVCQUFPUyxLQUFQO0FBQ0gsYUFWRDtBQVdILFNBakJBLEdBQUQ7O0FBb0JBO0FBQ0E7QUFDQTs7QUFFQSxZQUFJLEVBQUUsNEJBQTRCcFQsU0FBU21QLGVBQXZDLENBQUosRUFBNkQ7QUFDekRtRSxrQ0FBc0Isd0JBQXRCLEVBQWdELFlBQVc7QUFDdkQsb0JBQUlELElBQUksS0FBS08sZUFBYjtBQUNBLHVCQUFPUCxLQUFLQSxFQUFFN0ksUUFBRixLQUFlcUYsS0FBS2dFLFlBQWhDO0FBQ0lSLHdCQUFJQSxFQUFFTyxlQUFOO0FBREosaUJBRUEsT0FBT1AsQ0FBUDtBQUNILGFBTEQ7QUFNSDs7QUFFRCxZQUFJLEVBQUUsd0JBQXdCclQsU0FBU21QLGVBQW5DLENBQUosRUFBeUQ7QUFDckRtRSxrQ0FBc0Isb0JBQXRCLEVBQTRDLFlBQVc7QUFDbkQsb0JBQUlELElBQUksS0FBS1MsV0FBYjtBQUNBLHVCQUFPVCxLQUFLQSxFQUFFN0ksUUFBRixLQUFlcUYsS0FBS2dFLFlBQWhDO0FBQ0lSLHdCQUFJQSxFQUFFUyxXQUFOO0FBREosaUJBRUEsT0FBT1QsQ0FBUDtBQUNILGFBTEQ7QUFNSDtBQUNKLEtBaE5BLEdBQUQ7O0FBa05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFJLGFBQWFyRSxNQUFiLElBQXVCLENBQUNnQixRQUFRcFMsU0FBUixDQUFrQm1XLE9BQTlDLEVBQXVEO0FBQ25ELFlBQUkvRCxRQUFRcFMsU0FBUixDQUFrQm9XLGlCQUF0QixFQUF5QztBQUNyQ2hFLG9CQUFRcFMsU0FBUixDQUFrQm1XLE9BQWxCLEdBQTRCL0QsUUFBUXBTLFNBQVIsQ0FBa0JvVyxpQkFBOUM7QUFDSCxTQUZELE1BRU8sSUFBSWhFLFFBQVFwUyxTQUFSLENBQWtCcVcsZ0JBQXRCLEVBQXdDO0FBQzNDakUsb0JBQVFwUyxTQUFSLENBQWtCbVcsT0FBbEIsR0FBNEIvRCxRQUFRcFMsU0FBUixDQUFrQnFXLGdCQUE5QztBQUNILFNBRk0sTUFFQSxJQUFJakUsUUFBUXBTLFNBQVIsQ0FBa0JzVyxrQkFBdEIsRUFBMEM7QUFDN0NsRSxvQkFBUXBTLFNBQVIsQ0FBa0JtVyxPQUFsQixHQUE0Qi9ELFFBQVFwUyxTQUFSLENBQWtCc1csa0JBQTlDO0FBQ0gsU0FGTSxNQUVBLElBQUlsRSxRQUFRcFMsU0FBUixDQUFrQnVXLHFCQUF0QixFQUE2QztBQUNoRG5FLG9CQUFRcFMsU0FBUixDQUFrQm1XLE9BQWxCLEdBQTRCL0QsUUFBUXBTLFNBQVIsQ0FBa0J1VyxxQkFBOUM7QUFDSCxTQUZNLE1BRUEsSUFBSW5VLFNBQVM2TCxnQkFBYixFQUErQjtBQUNsQ21FLG9CQUFRcFMsU0FBUixDQUFrQm1XLE9BQWxCLEdBQTRCLFNBQVNBLE9BQVQsQ0FBaUJwSSxRQUFqQixFQUEyQjtBQUNuRCxvQkFBSW9JLFVBQVUsQ0FBQyxLQUFLL1QsUUFBTCxJQUFpQixLQUFLb1UsYUFBdkIsRUFBc0N2SSxnQkFBdEMsQ0FBdURGLFFBQXZELENBQWQ7QUFBQSxvQkFDSWhaLElBQUlvaEIsUUFBUW5oQixNQURoQjtBQUVBLHVCQUFPLEVBQUVELENBQUYsSUFBTyxDQUFQLElBQVlvaEIsUUFBUXpTLElBQVIsQ0FBYTNPLENBQWIsTUFBb0IsSUFBdkMsRUFBNkMsQ0FBRTtBQUMvQyx1QkFBT0EsSUFBSSxDQUFDLENBQVo7QUFDSCxhQUxEO0FBTUg7QUFDSjs7QUFFRDtBQUNBO0FBQ0EsUUFBSTZOLE9BQU93UCxPQUFQLElBQWtCLENBQUNBLFFBQVFwUyxTQUFSLENBQWtCK1EsT0FBekMsRUFBa0Q7QUFDOUNxQixnQkFBUXBTLFNBQVIsQ0FBa0IrUSxPQUFsQixHQUE0QixVQUFTOEQsQ0FBVCxFQUFZO0FBQ3BDLGdCQUFJc0IsVUFBVSxDQUFDLEtBQUsvVCxRQUFMLElBQWlCLEtBQUtvVSxhQUF2QixFQUFzQ3ZJLGdCQUF0QyxDQUF1RDRHLENBQXZELENBQWQ7QUFBQSxnQkFDSTlmLENBREo7QUFBQSxnQkFFSTBoQixLQUFLLElBRlQ7QUFHQSxlQUFHO0FBQ0MxaEIsb0JBQUlvaEIsUUFBUW5oQixNQUFaO0FBQ0EsdUJBQU8sRUFBRUQsQ0FBRixJQUFPLENBQVAsSUFBWW9oQixRQUFRelMsSUFBUixDQUFhM08sQ0FBYixNQUFvQjBoQixFQUF2QyxFQUEyQyxDQUFFO0FBQ2hELGFBSEQsUUFHVTFoQixJQUFJLENBQUwsS0FBWTBoQixLQUFLQSxHQUFHQyxhQUFwQixDQUhUO0FBSUEsbUJBQU9ELEVBQVA7QUFDSCxTQVREO0FBVUg7O0FBRUQsYUFBU0UsS0FBVCxDQUFleEMsQ0FBZixFQUFrQnlDLEVBQWxCLEVBQXNCO0FBQ2xCLFlBQUksQ0FBQ3pDLENBQUwsRUFBUTtBQUNSclosZUFBT0MsSUFBUCxDQUFZNmIsRUFBWixFQUFnQjViLE9BQWhCLENBQXdCLFVBQVNrWCxDQUFULEVBQVk7QUFDaEMsZ0JBQUtBLEtBQUtpQyxDQUFOLElBQWFqQyxLQUFLaUMsRUFBRW5VLFNBQXhCLEVBQW9DO0FBQ3BDLGdCQUFJO0FBQ0FsRix1QkFBT3dYLGNBQVAsQ0FDSTZCLEVBQUVuVSxTQUROLEVBRUlrUyxDQUZKLEVBR0lwWCxPQUFPK2Isd0JBQVAsQ0FBZ0NELEVBQWhDLEVBQW9DMUUsQ0FBcEMsQ0FISjtBQUtILGFBTkQsQ0FNRSxPQUFPL0csRUFBUCxFQUFXO0FBQ1Q7QUFDQWdKLGtCQUFFakMsQ0FBRixJQUFPMEUsR0FBRzFFLENBQUgsQ0FBUDtBQUNIO0FBQ0osU0FaRDtBQWFIOztBQUVEO0FBQ0E7O0FBRUEsYUFBUzRFLHFCQUFULENBQStCQyxLQUEvQixFQUFzQztBQUNsQyxZQUFJQyxPQUFPLElBQVg7QUFDQUQsZ0JBQVFBLE1BQU16YSxHQUFOLENBQVUsVUFBUzBhLElBQVQsRUFBZTtBQUM3QixtQkFBTyxFQUFFQSxnQkFBZ0IvRSxJQUFsQixJQUEwQjdQLFNBQVM2VSxjQUFULENBQXdCRCxJQUF4QixDQUExQixHQUEwREEsSUFBakU7QUFDSCxTQUZPLENBQVI7QUFHQSxZQUFJRCxNQUFNL2hCLE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDcEJnaUIsbUJBQU9ELE1BQU0sQ0FBTixDQUFQO0FBQ0gsU0FGRCxNQUVPO0FBQ0hDLG1CQUFPNVUsU0FBUzhVLHNCQUFULEVBQVA7QUFDQUgsa0JBQU0vYixPQUFOLENBQWMsVUFBU3lhLENBQVQsRUFBWTtBQUFFdUIscUJBQUtuRyxXQUFMLENBQWlCNEUsQ0FBakI7QUFBc0IsYUFBbEQ7QUFDSDtBQUNELGVBQU91QixJQUFQO0FBQ0g7O0FBRUQsUUFBSUcsYUFBYTtBQUNiQyxpQkFBUyxtQkFBUyxZQUFjO0FBQzVCLGdCQUFJTCxRQUFRLEdBQUc1YixLQUFILENBQVN1RCxJQUFULENBQWNDLFNBQWQsQ0FBWjtBQUNBb1ksb0JBQVFELHNCQUFzQkMsS0FBdEIsQ0FBUjtBQUNBLGlCQUFLTSxZQUFMLENBQWtCTixLQUFsQixFQUF5QixLQUFLdkYsVUFBOUI7QUFDSCxTQUxZO0FBTWJwQyxnQkFBUSxrQkFBUyxZQUFjO0FBQzNCLGdCQUFJMkgsUUFBUSxHQUFHNWIsS0FBSCxDQUFTdUQsSUFBVCxDQUFjQyxTQUFkLENBQVo7QUFDQW9ZLG9CQUFRRCxzQkFBc0JDLEtBQXRCLENBQVI7QUFDQSxpQkFBS2xHLFdBQUwsQ0FBaUJrRyxLQUFqQjtBQUNIO0FBVlksS0FBakI7O0FBYUFKLFVBQU12RixPQUFPa0csUUFBUCxJQUFtQmxHLE9BQU84QyxZQUFoQyxFQUE4Q2lELFVBQTlDLEVBMWpCYyxDQTBqQjZDO0FBQzNEUixVQUFNdkYsT0FBT21HLGdCQUFiLEVBQStCSixVQUEvQjtBQUNBUixVQUFNdkYsT0FBT2dCLE9BQWIsRUFBc0IrRSxVQUF0Qjs7QUFFQTtBQUNBOztBQUVBLFFBQUlLLFlBQVk7QUFDWkMsZ0JBQVEsa0JBQVMsWUFBYztBQUMzQixnQkFBSVYsUUFBUSxHQUFHNWIsS0FBSCxDQUFTdUQsSUFBVCxDQUFjQyxTQUFkLENBQVo7QUFDQSxnQkFBSStZLFNBQVMsS0FBS2pILFVBQWxCO0FBQ0EsZ0JBQUksQ0FBQ2lILE1BQUwsRUFBYTtBQUNiLGdCQUFJQyx3QkFBd0IsS0FBSzNCLGVBQWpDO0FBQ0EsbUJBQU9lLE1BQU14YixPQUFOLENBQWNvYyxxQkFBZCxNQUF5QyxDQUFDLENBQWpEO0FBQ0lBLHdDQUF3QkEsc0JBQXNCM0IsZUFBOUM7QUFESixhQUVBLElBQUlnQixPQUFPRixzQkFBc0JDLEtBQXRCLENBQVg7QUFDQVcsbUJBQU9MLFlBQVAsQ0FBb0JMLElBQXBCLEVBQTBCVyx3QkFDdEJBLHNCQUFzQnpCLFdBREEsR0FDY3dCLE9BQU9sRyxVQUQvQztBQUVILFNBWFc7QUFZWm9HLGVBQU8saUJBQVMsWUFBYztBQUMxQixnQkFBSWIsUUFBUSxHQUFHNWIsS0FBSCxDQUFTdUQsSUFBVCxDQUFjQyxTQUFkLENBQVo7QUFDQSxnQkFBSStZLFNBQVMsS0FBS2pILFVBQWxCO0FBQ0EsZ0JBQUksQ0FBQ2lILE1BQUwsRUFBYTtBQUNiLGdCQUFJRyxvQkFBb0IsS0FBSzNCLFdBQTdCO0FBQ0EsbUJBQU9hLE1BQU14YixPQUFOLENBQWNzYyxpQkFBZCxNQUFxQyxDQUFDLENBQTdDO0FBQ0lBLG9DQUFvQkEsa0JBQWtCM0IsV0FBdEM7QUFESixhQUVBLElBQUljLE9BQU9GLHNCQUFzQkMsS0FBdEIsQ0FBWDtBQUNBVyxtQkFBT0wsWUFBUCxDQUFvQkwsSUFBcEIsRUFBMEJhLGlCQUExQjtBQUNILFNBckJXO0FBc0JaakgscUJBQWEsdUJBQVMsWUFBYztBQUNoQyxnQkFBSW1HLFFBQVEsR0FBRzViLEtBQUgsQ0FBU3VELElBQVQsQ0FBY0MsU0FBZCxDQUFaO0FBQ0EsZ0JBQUkrWSxTQUFTLEtBQUtqSCxVQUFsQjtBQUNBLGdCQUFJLENBQUNpSCxNQUFMLEVBQWE7QUFDYixnQkFBSUcsb0JBQW9CLEtBQUszQixXQUE3QjtBQUNBLG1CQUFPYSxNQUFNeGIsT0FBTixDQUFjc2MsaUJBQWQsTUFBcUMsQ0FBQyxDQUE3QztBQUNJQSxvQ0FBb0JBLGtCQUFrQjNCLFdBQXRDO0FBREosYUFFQSxJQUFJYyxPQUFPRixzQkFBc0JDLEtBQXRCLENBQVg7O0FBRUEsZ0JBQUksS0FBS3RHLFVBQUwsS0FBb0JpSCxNQUF4QixFQUNJQSxPQUFPSSxZQUFQLENBQW9CZCxJQUFwQixFQUEwQixJQUExQixFQURKLEtBR0lVLE9BQU9MLFlBQVAsQ0FBb0JMLElBQXBCLEVBQTBCYSxpQkFBMUI7QUFDUCxTQW5DVztBQW9DWnhlLGdCQUFRLGtCQUFXO0FBQ2YsZ0JBQUksQ0FBQyxLQUFLb1gsVUFBVixFQUFzQjtBQUN0QixpQkFBS0EsVUFBTCxDQUFnQkMsV0FBaEIsQ0FBNEIsSUFBNUI7QUFDSDtBQXZDVyxLQUFoQjs7QUEwQ0FpRyxVQUFNdkYsT0FBTzJHLFlBQWIsRUFBMkJQLFNBQTNCO0FBQ0FiLFVBQU12RixPQUFPZ0IsT0FBYixFQUFzQm9GLFNBQXRCO0FBQ0FiLFVBQU12RixPQUFPNEcsYUFBYixFQUE0QlIsU0FBNUI7QUFFSCxDQS9tQkEsRUErbUJDcE4sSUEvbUJELENBQUQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FDUmdCNk4sSSxHQUFBQSxJO1FBMkNBQyxVLEdBQUFBLFU7O0FBN0NoQjs7Ozs7O0FBRU8sU0FBU0QsSUFBVCxDQUFjakQsTUFBZCxFQUFzQjtBQUN6QixXQUFPQSxPQUFPOU4sT0FBUCxDQUFlLFlBQWYsRUFBNkIsRUFBN0IsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7QUFNTyxJQUFNaVIsOENBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBU0MsSUFBVCxFQUFlO0FBQzNDLFFBQUcsQ0FBQ0EsSUFBRCxJQUFTQSxLQUFLMWMsTUFBTCxDQUFZLENBQVosRUFBYyxDQUFkLEtBQWtCLE1BQTlCLEVBQXNDO0FBQ2xDLGVBQU8sRUFBUDtBQUNIO0FBQ0QsYUFBUzJjLGtCQUFULENBQTRCRCxJQUE1QixFQUFrQztBQUM5QixZQUFJRSxZQUFZLEVBQWhCO0FBQ0EsWUFBSyxrQkFBRCxDQUFxQjljLElBQXJCLENBQTBCNGMsSUFBMUIsQ0FBSixFQUFxQztBQUNqQ0Usd0JBQVksS0FBWjtBQUNILFNBRkQsTUFFTSxJQUFLLG1CQUFELENBQXNCOWMsSUFBdEIsQ0FBMkI0YyxJQUEzQixDQUFKLEVBQXNDO0FBQ3hDRSx3QkFBWSxNQUFaO0FBQ0g7QUFDRCxlQUFPQSxTQUFQO0FBQ0g7O0FBRUQsUUFBSUMsZUFBZUYsbUJBQW1CRCxJQUFuQixDQUFuQjtBQUNBLFFBQUdHLFlBQUgsRUFBaUI7QUFDYixlQUFPQSxZQUFQO0FBQ0g7QUFDREgsV0FBT0EsS0FBS3ZKLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLEVBQW1CQSxLQUFuQixDQUF5QixHQUF6QixFQUE4QixDQUE5QixDQUFQO0FBQ0EsUUFBR3VKLEtBQUtJLFdBQUwsQ0FBaUIsR0FBakIsSUFBd0IsQ0FBQyxDQUE1QixFQUErQjtBQUMzQixlQUFPSixLQUFLMWMsTUFBTCxDQUFZMGMsS0FBS0ksV0FBTCxDQUFpQixHQUFqQixJQUF3QixDQUFwQyxFQUF1Q0osS0FBS3BqQixNQUE1QyxFQUFvRHlGLFdBQXBELEVBQVA7QUFDSCxLQUZELE1BRUs7QUFDRCxlQUFPLEVBQVA7QUFDSDtBQUNKLENBeEJNOztBQTJCUDs7Ozs7O0FBTU8sU0FBU3lkLFVBQVQsQ0FBb0JPLE1BQXBCLEVBQTRCO0FBQy9CLFFBQUlDLFNBQVN0aUIsU0FBU3FpQixNQUFULEVBQWlCLEVBQWpCLENBQWI7QUFDQSxRQUFJRSxRQUFVcGMsS0FBS3FjLEtBQUwsQ0FBV0YsU0FBUyxJQUFwQixDQUFkO0FBQ0EsUUFBSUcsVUFBVXRjLEtBQUtxYyxLQUFMLENBQVcsQ0FBQ0YsU0FBVUMsUUFBUSxJQUFuQixJQUE0QixFQUF2QyxDQUFkO0FBQ0EsUUFBSUcsVUFBVUosU0FBVUMsUUFBUSxJQUFsQixHQUEyQkUsVUFBVSxFQUFuRDs7QUFFQSxRQUFJRixRQUFRLENBQVosRUFBZTtBQUFDRSxrQkFBVSxNQUFJQSxPQUFkO0FBQXVCO0FBQ3ZDLFFBQUlDLFVBQVUsRUFBZCxFQUFrQjtBQUFDQSxrQkFBVSxNQUFJQSxPQUFkO0FBQXVCOztBQUUxQyxRQUFJSCxRQUFRLENBQVosRUFBZTtBQUNYLGVBQU9BLFFBQU0sR0FBTixHQUFVRSxPQUFWLEdBQWtCLEdBQWxCLEdBQXNCQyxPQUE3QjtBQUNILEtBRkQsTUFFTztBQUNILGVBQU9ELFVBQVEsR0FBUixHQUFZQyxPQUFuQjtBQUNIO0FBQ0osQzs7Ozs7Ozs7Ozs7Ozs7OztBQzNERDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsWUFBVTtBQUFDLE1BQUlyRCxJQUFFLG9CQUFpQnJMLElBQWpCLHlDQUFpQkEsSUFBakIsTUFBdUJBLEtBQUtBLElBQUwsS0FBWUEsSUFBbkMsSUFBeUNBLElBQXpDLElBQStDLG9CQUFpQmdILE1BQWpCLHlDQUFpQkEsTUFBakIsTUFBeUJBLE9BQU9BLE1BQVAsS0FBZ0JBLE1BQXpDLElBQWlEQSxNQUFoRyxJQUF3RyxJQUF4RyxJQUE4RyxFQUFwSDtBQUFBLE1BQXVIMkgsSUFBRXRELEVBQUV0WixDQUEzSDtBQUFBLE1BQTZIeU8sSUFBRTVPLE1BQU1nRSxTQUFySTtBQUFBLE1BQStJbVUsSUFBRXJaLE9BQU9rRixTQUF4SjtBQUFBLE1BQWtLNlUsSUFBRSxlQUFhLE9BQU9tRSxNQUFwQixHQUEyQkEsT0FBT2haLFNBQWxDLEdBQTRDLElBQWhOO0FBQUEsTUFBcU5pWixJQUFFck8sRUFBRW5PLElBQXpOO0FBQUEsTUFBOE55YyxJQUFFdE8sRUFBRXpQLEtBQWxPO0FBQUEsTUFBd08rVyxJQUFFaUMsRUFBRTdZLFFBQTVPO0FBQUEsTUFBcVB2RyxJQUFFb2YsRUFBRWdGLGNBQXpQO0FBQUEsTUFBd1FDLElBQUVwZCxNQUFNQyxPQUFoUjtBQUFBLE1BQXdSb2QsSUFBRXZlLE9BQU9DLElBQWpTO0FBQUEsTUFBc1NnRSxJQUFFakUsT0FBT2tSLE1BQS9TO0FBQUEsTUFBc1QySCxJQUFFLFNBQUZBLENBQUUsR0FBVSxDQUFFLENBQXBVO0FBQUEsTUFBcVVoWSxJQUFFLFNBQUZBLENBQUUsQ0FBUzhaLENBQVQsRUFBVztBQUFDLFdBQU9BLGFBQWE5WixDQUFiLEdBQWU4WixDQUFmLEdBQWlCLGdCQUFnQjlaLENBQWhCLEdBQWtCLE1BQUssS0FBSzJkLFFBQUwsR0FBYzdELENBQW5CLENBQWxCLEdBQXdDLElBQUk5WixDQUFKLENBQU04WixDQUFOLENBQWhFO0FBQXlFLEdBQTVaLENBQTZaLGVBQWEsT0FBTzhELE9BQXBCLElBQTZCQSxRQUFRM00sUUFBckMsR0FBOEM2SSxFQUFFdFosQ0FBRixHQUFJUixDQUFsRCxJQUFxRCxlQUFhLE9BQU82ZCxNQUFwQixJQUE0QixDQUFDQSxPQUFPNU0sUUFBcEMsSUFBOEM0TSxPQUFPRCxPQUFyRCxLQUErREEsVUFBUUMsT0FBT0QsT0FBUCxHQUFlNWQsQ0FBdEYsR0FBeUY0ZCxRQUFRcGQsQ0FBUixHQUFVUixDQUF4SixHQUEySkEsRUFBRThkLE9BQUYsR0FBVSxPQUFySyxDQUE2SyxJQUFJQyxDQUFKO0FBQUEsTUFBTUMsSUFBRSxTQUFGQSxDQUFFLENBQVNWLENBQVQsRUFBV2xrQixDQUFYLEVBQWEwZ0IsQ0FBYixFQUFlO0FBQUMsUUFBRyxLQUFLLENBQUwsS0FBUzFnQixDQUFaLEVBQWMsT0FBT2trQixDQUFQLENBQVMsUUFBTyxRQUFNeEQsQ0FBTixHQUFRLENBQVIsR0FBVUEsQ0FBakIsR0FBb0IsS0FBSyxDQUFMO0FBQU8sZUFBTyxVQUFTQSxDQUFULEVBQVc7QUFBQyxpQkFBT3dELEVBQUV2YSxJQUFGLENBQU8zSixDQUFQLEVBQVMwZ0IsQ0FBVCxDQUFQO0FBQW1CLFNBQXRDLENBQXVDLEtBQUssQ0FBTDtBQUFPLGVBQU8sVUFBU0EsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWU7QUFBQyxpQkFBT0gsRUFBRXZhLElBQUYsQ0FBTzNKLENBQVAsRUFBUzBnQixDQUFULEVBQVdzRCxDQUFYLEVBQWFLLENBQWIsQ0FBUDtBQUF1QixTQUE5QyxDQUErQyxLQUFLLENBQUw7QUFBTyxlQUFPLFVBQVMzRCxDQUFULEVBQVdzRCxDQUFYLEVBQWFLLENBQWIsRUFBZXhPLENBQWYsRUFBaUI7QUFBQyxpQkFBT3FPLEVBQUV2YSxJQUFGLENBQU8zSixDQUFQLEVBQVMwZ0IsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWV4TyxDQUFmLENBQVA7QUFBeUIsU0FBbEQsQ0FBL0gsQ0FBa0wsT0FBTyxZQUFVO0FBQUMsYUFBT3FPLEVBQUV4YSxLQUFGLENBQVExSixDQUFSLEVBQVU0SixTQUFWLENBQVA7QUFBNEIsS0FBOUM7QUFBK0MsR0FBaFI7QUFBQSxNQUFpUmliLElBQUUsU0FBRkEsQ0FBRSxDQUFTbkUsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWU7QUFBQyxXQUFPemQsRUFBRWtlLFFBQUYsS0FBYUgsQ0FBYixHQUFlL2QsRUFBRWtlLFFBQUYsQ0FBV3BFLENBQVgsRUFBYXNELENBQWIsQ0FBZixHQUErQixRQUFNdEQsQ0FBTixHQUFROVosRUFBRW1lLFFBQVYsR0FBbUJuZSxFQUFFb2UsVUFBRixDQUFhdEUsQ0FBYixJQUFnQmtFLEVBQUVsRSxDQUFGLEVBQUlzRCxDQUFKLEVBQU1LLENBQU4sQ0FBaEIsR0FBeUJ6ZCxFQUFFcWUsUUFBRixDQUFXdkUsQ0FBWCxLQUFlLENBQUM5WixFQUFFTSxPQUFGLENBQVV3WixDQUFWLENBQWhCLEdBQTZCOVosRUFBRXNlLE9BQUYsQ0FBVXhFLENBQVYsQ0FBN0IsR0FBMEM5WixFQUFFdWUsUUFBRixDQUFXekUsQ0FBWCxDQUE1SDtBQUEwSSxHQUE3YSxDQUE4YTlaLEVBQUVrZSxRQUFGLEdBQVdILElBQUUsV0FBU2pFLENBQVQsRUFBV3NELENBQVgsRUFBYTtBQUFDLFdBQU9hLEVBQUVuRSxDQUFGLEVBQUlzRCxDQUFKLEVBQU0sSUFBRSxDQUFSLENBQVA7QUFBa0IsR0FBN0MsQ0FBOEMsSUFBSW9CLElBQUUsU0FBRkEsQ0FBRSxDQUFTbEIsQ0FBVCxFQUFXbGtCLENBQVgsRUFBYTtBQUFDLFdBQU9BLElBQUUsUUFBTUEsQ0FBTixHQUFRa2tCLEVBQUVqa0IsTUFBRixHQUFTLENBQWpCLEdBQW1CLENBQUNELENBQXRCLEVBQXdCLFlBQVU7QUFBQyxXQUFJLElBQUkwZ0IsSUFBRWxaLEtBQUs2ZCxHQUFMLENBQVN6YixVQUFVM0osTUFBVixHQUFpQkQsQ0FBMUIsRUFBNEIsQ0FBNUIsQ0FBTixFQUFxQ2drQixJQUFFL2MsTUFBTXlaLENBQU4sQ0FBdkMsRUFBZ0QyRCxJQUFFLENBQXRELEVBQXdEQSxJQUFFM0QsQ0FBMUQsRUFBNEQyRCxHQUE1RDtBQUFnRUwsVUFBRUssQ0FBRixJQUFLemEsVUFBVXlhLElBQUVya0IsQ0FBWixDQUFMO0FBQWhFLE9BQW9GLFFBQU9BLENBQVAsR0FBVSxLQUFLLENBQUw7QUFBTyxpQkFBT2trQixFQUFFdmEsSUFBRixDQUFPLElBQVAsRUFBWXFhLENBQVosQ0FBUCxDQUFzQixLQUFLLENBQUw7QUFBTyxpQkFBT0UsRUFBRXZhLElBQUYsQ0FBTyxJQUFQLEVBQVlDLFVBQVUsQ0FBVixDQUFaLEVBQXlCb2EsQ0FBekIsQ0FBUCxDQUFtQyxLQUFLLENBQUw7QUFBTyxpQkFBT0UsRUFBRXZhLElBQUYsQ0FBTyxJQUFQLEVBQVlDLFVBQVUsQ0FBVixDQUFaLEVBQXlCQSxVQUFVLENBQVYsQ0FBekIsRUFBc0NvYSxDQUF0QyxDQUFQLENBQXhGLENBQXdJLElBQUluTyxJQUFFNU8sTUFBTWpILElBQUUsQ0FBUixDQUFOLENBQWlCLEtBQUlxa0IsSUFBRSxDQUFOLEVBQVFBLElBQUVya0IsQ0FBVixFQUFZcWtCLEdBQVo7QUFBZ0J4TyxVQUFFd08sQ0FBRixJQUFLemEsVUFBVXlhLENBQVYsQ0FBTDtBQUFoQixPQUFrQyxPQUFPeE8sRUFBRTdWLENBQUYsSUFBS2drQixDQUFMLEVBQU9FLEVBQUV4YSxLQUFGLENBQVEsSUFBUixFQUFhbU0sQ0FBYixDQUFkO0FBQThCLEtBQXZWO0FBQXdWLEdBQTVXO0FBQUEsTUFBNld5UCxJQUFFLFNBQUZBLENBQUUsQ0FBUzVFLENBQVQsRUFBVztBQUFDLFFBQUcsQ0FBQzlaLEVBQUVxZSxRQUFGLENBQVd2RSxDQUFYLENBQUosRUFBa0IsT0FBTSxFQUFOLENBQVMsSUFBRzFXLENBQUgsRUFBSyxPQUFPQSxFQUFFMFcsQ0FBRixDQUFQLENBQVk5QixFQUFFM1QsU0FBRixHQUFZeVYsQ0FBWixDQUFjLElBQUlzRCxJQUFFLElBQUlwRixDQUFKLEVBQU4sQ0FBWSxPQUFPQSxFQUFFM1QsU0FBRixHQUFZLElBQVosRUFBaUIrWSxDQUF4QjtBQUEwQixHQUEzZDtBQUFBLE1BQTRkdUIsSUFBRSxTQUFGQSxDQUFFLENBQVN2QixDQUFULEVBQVc7QUFBQyxXQUFPLFVBQVN0RCxDQUFULEVBQVc7QUFBQyxhQUFPLFFBQU1BLENBQU4sR0FBUSxLQUFLLENBQWIsR0FBZUEsRUFBRXNELENBQUYsQ0FBdEI7QUFBMkIsS0FBOUM7QUFBK0MsR0FBemhCO0FBQUEsTUFBMGhCOVosSUFBRSxTQUFGQSxDQUFFLENBQVN3VyxDQUFULEVBQVdzRCxDQUFYLEVBQWE7QUFBQyxXQUFPLFFBQU10RCxDQUFOLElBQVMxZ0IsRUFBRTJKLElBQUYsQ0FBTytXLENBQVAsRUFBU3NELENBQVQsQ0FBaEI7QUFBNEIsR0FBdGtCO0FBQUEsTUFBdWtCd0IsSUFBRSxTQUFGQSxDQUFFLENBQVM5RSxDQUFULEVBQVdzRCxDQUFYLEVBQWE7QUFBQyxTQUFJLElBQUlLLElBQUVMLEVBQUUvakIsTUFBUixFQUFlNFYsSUFBRSxDQUFyQixFQUF1QkEsSUFBRXdPLENBQXpCLEVBQTJCeE8sR0FBM0IsRUFBK0I7QUFBQyxVQUFHLFFBQU02SyxDQUFULEVBQVcsT0FBT0EsSUFBRUEsRUFBRXNELEVBQUVuTyxDQUFGLENBQUYsQ0FBRjtBQUFVLFlBQU93TyxJQUFFM0QsQ0FBRixHQUFJLEtBQUssQ0FBaEI7QUFBa0IsR0FBcnFCO0FBQUEsTUFBc3FCdFosSUFBRUksS0FBS2llLEdBQUwsQ0FBUyxDQUFULEVBQVcsRUFBWCxJQUFlLENBQXZyQjtBQUFBLE1BQXlyQkMsSUFBRUgsRUFBRSxRQUFGLENBQTNyQjtBQUFBLE1BQXVzQjdlLElBQUUsU0FBRkEsQ0FBRSxDQUFTZ2EsQ0FBVCxFQUFXO0FBQUMsUUFBSXNELElBQUUwQixFQUFFaEYsQ0FBRixDQUFOLENBQVcsT0FBTSxZQUFVLE9BQU9zRCxDQUFqQixJQUFvQixLQUFHQSxDQUF2QixJQUEwQkEsS0FBRzVjLENBQW5DO0FBQXFDLEdBQXJ3QixDQUFzd0JSLEVBQUUrZSxJQUFGLEdBQU8vZSxFQUFFWCxPQUFGLEdBQVUsVUFBU3lhLENBQVQsRUFBV3NELENBQVgsRUFBYUssQ0FBYixFQUFlO0FBQUMsUUFBSXhPLENBQUosRUFBTXFPLENBQU4sQ0FBUSxJQUFHRixJQUFFWSxFQUFFWixDQUFGLEVBQUlLLENBQUosQ0FBRixFQUFTM2QsRUFBRWdhLENBQUYsQ0FBWixFQUFpQixLQUFJN0ssSUFBRSxDQUFGLEVBQUlxTyxJQUFFeEQsRUFBRXpnQixNQUFaLEVBQW1CNFYsSUFBRXFPLENBQXJCLEVBQXVCck8sR0FBdkI7QUFBMkJtTyxRQUFFdEQsRUFBRTdLLENBQUYsQ0FBRixFQUFPQSxDQUFQLEVBQVM2SyxDQUFUO0FBQTNCLEtBQWpCLE1BQTREO0FBQUMsVUFBSTFnQixJQUFFNEcsRUFBRVosSUFBRixDQUFPMGEsQ0FBUCxDQUFOLENBQWdCLEtBQUk3SyxJQUFFLENBQUYsRUFBSXFPLElBQUVsa0IsRUFBRUMsTUFBWixFQUFtQjRWLElBQUVxTyxDQUFyQixFQUF1QnJPLEdBQXZCO0FBQTJCbU8sVUFBRXRELEVBQUUxZ0IsRUFBRTZWLENBQUYsQ0FBRixDQUFGLEVBQVU3VixFQUFFNlYsQ0FBRixDQUFWLEVBQWU2SyxDQUFmO0FBQTNCO0FBQTZDLFlBQU9BLENBQVA7QUFBUyxHQUE1SyxFQUE2SzlaLEVBQUVXLEdBQUYsR0FBTVgsRUFBRWdmLE9BQUYsR0FBVSxVQUFTbEYsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWU7QUFBQ0wsUUFBRWEsRUFBRWIsQ0FBRixFQUFJSyxDQUFKLENBQUYsQ0FBUyxLQUFJLElBQUl4TyxJQUFFLENBQUNuUCxFQUFFZ2EsQ0FBRixDQUFELElBQU85WixFQUFFWixJQUFGLENBQU8wYSxDQUFQLENBQWIsRUFBdUJ3RCxJQUFFLENBQUNyTyxLQUFHNkssQ0FBSixFQUFPemdCLE1BQWhDLEVBQXVDRCxJQUFFaUgsTUFBTWlkLENBQU4sQ0FBekMsRUFBa0Q5RSxJQUFFLENBQXhELEVBQTBEQSxJQUFFOEUsQ0FBNUQsRUFBOEQ5RSxHQUE5RCxFQUFrRTtBQUFDLFVBQUlrRixJQUFFek8sSUFBRUEsRUFBRXVKLENBQUYsQ0FBRixHQUFPQSxDQUFiLENBQWVwZixFQUFFb2YsQ0FBRixJQUFLNEUsRUFBRXRELEVBQUU0RCxDQUFGLENBQUYsRUFBT0EsQ0FBUCxFQUFTNUQsQ0FBVCxDQUFMO0FBQWlCLFlBQU8xZ0IsQ0FBUDtBQUFTLEdBQWxVLENBQW1VLElBQUk2bEIsSUFBRSxTQUFGQSxDQUFFLENBQVMxQixDQUFULEVBQVc7QUFBQyxXQUFPLFVBQVN6RCxDQUFULEVBQVdzRCxDQUFYLEVBQWFLLENBQWIsRUFBZXhPLENBQWYsRUFBaUI7QUFBQyxVQUFJcU8sSUFBRSxLQUFHdGEsVUFBVTNKLE1BQW5CLENBQTBCLE9BQU8sVUFBU3lnQixDQUFULEVBQVdzRCxDQUFYLEVBQWFLLENBQWIsRUFBZXhPLENBQWYsRUFBaUI7QUFBQyxZQUFJcU8sSUFBRSxDQUFDeGQsRUFBRWdhLENBQUYsQ0FBRCxJQUFPOVosRUFBRVosSUFBRixDQUFPMGEsQ0FBUCxDQUFiO0FBQUEsWUFBdUIxZ0IsSUFBRSxDQUFDa2tCLEtBQUd4RCxDQUFKLEVBQU96Z0IsTUFBaEM7QUFBQSxZQUF1Q21mLElBQUUsSUFBRStFLENBQUYsR0FBSSxDQUFKLEdBQU1ua0IsSUFBRSxDQUFqRCxDQUFtRCxLQUFJNlYsTUFBSXdPLElBQUUzRCxFQUFFd0QsSUFBRUEsRUFBRTlFLENBQUYsQ0FBRixHQUFPQSxDQUFULENBQUYsRUFBY0EsS0FBRytFLENBQXJCLENBQUosRUFBNEIsS0FBRy9FLENBQUgsSUFBTUEsSUFBRXBmLENBQXBDLEVBQXNDb2YsS0FBRytFLENBQXpDLEVBQTJDO0FBQUMsY0FBSUcsSUFBRUosSUFBRUEsRUFBRTlFLENBQUYsQ0FBRixHQUFPQSxDQUFiLENBQWVpRixJQUFFTCxFQUFFSyxDQUFGLEVBQUkzRCxFQUFFNEQsQ0FBRixDQUFKLEVBQVNBLENBQVQsRUFBVzVELENBQVgsQ0FBRjtBQUFnQixnQkFBTzJELENBQVA7QUFBUyxPQUF6SixDQUEwSjNELENBQTFKLEVBQTRKa0UsRUFBRVosQ0FBRixFQUFJbk8sQ0FBSixFQUFNLENBQU4sQ0FBNUosRUFBcUt3TyxDQUFySyxFQUF1S0gsQ0FBdkssQ0FBUDtBQUFpTCxLQUFwTztBQUFxTyxHQUF2UCxDQUF3UHRkLEVBQUVrZixNQUFGLEdBQVNsZixFQUFFbWYsS0FBRixHQUFRbmYsRUFBRW9mLE1BQUYsR0FBU0gsRUFBRSxDQUFGLENBQTFCLEVBQStCamYsRUFBRXFmLFdBQUYsR0FBY3JmLEVBQUVzZixLQUFGLEdBQVFMLEVBQUUsQ0FBQyxDQUFILENBQXJELEVBQTJEamYsRUFBRXlTLElBQUYsR0FBT3pTLEVBQUV1ZixNQUFGLEdBQVMsVUFBU3pGLENBQVQsRUFBV3NELENBQVgsRUFBYUssQ0FBYixFQUFlO0FBQUMsUUFBSXhPLElBQUUsQ0FBQ25QLEVBQUVnYSxDQUFGLElBQUs5WixFQUFFa0YsU0FBUCxHQUFpQmxGLEVBQUV3ZixPQUFwQixFQUE2QjFGLENBQTdCLEVBQStCc0QsQ0FBL0IsRUFBaUNLLENBQWpDLENBQU4sQ0FBMEMsSUFBRyxLQUFLLENBQUwsS0FBU3hPLENBQVQsSUFBWSxDQUFDLENBQUQsS0FBS0EsQ0FBcEIsRUFBc0IsT0FBTzZLLEVBQUU3SyxDQUFGLENBQVA7QUFBWSxHQUF2SyxFQUF3S2pQLEVBQUVPLE1BQUYsR0FBU1AsRUFBRXlmLE1BQUYsR0FBUyxVQUFTM0YsQ0FBVCxFQUFXN0ssQ0FBWCxFQUFhbU8sQ0FBYixFQUFlO0FBQUMsUUFBSUUsSUFBRSxFQUFOLENBQVMsT0FBT3JPLElBQUVnUCxFQUFFaFAsQ0FBRixFQUFJbU8sQ0FBSixDQUFGLEVBQVNwZCxFQUFFK2UsSUFBRixDQUFPakYsQ0FBUCxFQUFTLFVBQVNBLENBQVQsRUFBV3NELENBQVgsRUFBYUssQ0FBYixFQUFlO0FBQUN4TyxRQUFFNkssQ0FBRixFQUFJc0QsQ0FBSixFQUFNSyxDQUFOLEtBQVVILEVBQUV4YyxJQUFGLENBQU9nWixDQUFQLENBQVY7QUFBb0IsS0FBN0MsQ0FBVCxFQUF3RHdELENBQS9EO0FBQWlFLEdBQXBSLEVBQXFSdGQsRUFBRXdOLE1BQUYsR0FBUyxVQUFTc00sQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWU7QUFBQyxXQUFPemQsRUFBRU8sTUFBRixDQUFTdVosQ0FBVCxFQUFXOVosRUFBRTBmLE1BQUYsQ0FBU3pCLEVBQUViLENBQUYsQ0FBVCxDQUFYLEVBQTBCSyxDQUExQixDQUFQO0FBQW9DLEdBQWxWLEVBQW1WemQsRUFBRXVTLEtBQUYsR0FBUXZTLEVBQUVrRCxHQUFGLEdBQU0sVUFBUzRXLENBQVQsRUFBV3NELENBQVgsRUFBYUssQ0FBYixFQUFlO0FBQUNMLFFBQUVhLEVBQUViLENBQUYsRUFBSUssQ0FBSixDQUFGLENBQVMsS0FBSSxJQUFJeE8sSUFBRSxDQUFDblAsRUFBRWdhLENBQUYsQ0FBRCxJQUFPOVosRUFBRVosSUFBRixDQUFPMGEsQ0FBUCxDQUFiLEVBQXVCd0QsSUFBRSxDQUFDck8sS0FBRzZLLENBQUosRUFBT3pnQixNQUFoQyxFQUF1Q0QsSUFBRSxDQUE3QyxFQUErQ0EsSUFBRWtrQixDQUFqRCxFQUFtRGxrQixHQUFuRCxFQUF1RDtBQUFDLFVBQUlvZixJQUFFdkosSUFBRUEsRUFBRTdWLENBQUYsQ0FBRixHQUFPQSxDQUFiLENBQWUsSUFBRyxDQUFDZ2tCLEVBQUV0RCxFQUFFdEIsQ0FBRixDQUFGLEVBQU9BLENBQVAsRUFBU3NCLENBQVQsQ0FBSixFQUFnQixPQUFNLENBQUMsQ0FBUDtBQUFTLFlBQU0sQ0FBQyxDQUFQO0FBQVMsR0FBbmUsRUFBb2U5WixFQUFFeVosSUFBRixHQUFPelosRUFBRTJmLEdBQUYsR0FBTSxVQUFTN0YsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWU7QUFBQ0wsUUFBRWEsRUFBRWIsQ0FBRixFQUFJSyxDQUFKLENBQUYsQ0FBUyxLQUFJLElBQUl4TyxJQUFFLENBQUNuUCxFQUFFZ2EsQ0FBRixDQUFELElBQU85WixFQUFFWixJQUFGLENBQU8wYSxDQUFQLENBQWIsRUFBdUJ3RCxJQUFFLENBQUNyTyxLQUFHNkssQ0FBSixFQUFPemdCLE1BQWhDLEVBQXVDRCxJQUFFLENBQTdDLEVBQStDQSxJQUFFa2tCLENBQWpELEVBQW1EbGtCLEdBQW5ELEVBQXVEO0FBQUMsVUFBSW9mLElBQUV2SixJQUFFQSxFQUFFN1YsQ0FBRixDQUFGLEdBQU9BLENBQWIsQ0FBZSxJQUFHZ2tCLEVBQUV0RCxFQUFFdEIsQ0FBRixDQUFGLEVBQU9BLENBQVAsRUFBU3NCLENBQVQsQ0FBSCxFQUFlLE9BQU0sQ0FBQyxDQUFQO0FBQVMsWUFBTSxDQUFDLENBQVA7QUFBUyxHQUFsbkIsRUFBbW5COVosRUFBRStULFFBQUYsR0FBVy9ULEVBQUU0ZixRQUFGLEdBQVc1ZixFQUFFNmYsT0FBRixHQUFVLFVBQVMvRixDQUFULEVBQVdzRCxDQUFYLEVBQWFLLENBQWIsRUFBZXhPLENBQWYsRUFBaUI7QUFBQyxXQUFPblAsRUFBRWdhLENBQUYsTUFBT0EsSUFBRTlaLEVBQUU4UCxNQUFGLENBQVNnSyxDQUFULENBQVQsR0FBc0IsQ0FBQyxZQUFVLE9BQU8yRCxDQUFqQixJQUFvQnhPLENBQXJCLE1BQTBCd08sSUFBRSxDQUE1QixDQUF0QixFQUFxRCxLQUFHemQsRUFBRUosT0FBRixDQUFVa2EsQ0FBVixFQUFZc0QsQ0FBWixFQUFjSyxDQUFkLENBQS9EO0FBQWdGLEdBQXJ2QixFQUFzdkJ6ZCxFQUFFOGYsTUFBRixHQUFTdEIsRUFBRSxVQUFTMUUsQ0FBVCxFQUFXMkQsQ0FBWCxFQUFheE8sQ0FBYixFQUFlO0FBQUMsUUFBSXFPLENBQUosRUFBTWxrQixDQUFOLENBQVEsT0FBTzRHLEVBQUVvZSxVQUFGLENBQWFYLENBQWIsSUFBZ0Jya0IsSUFBRXFrQixDQUFsQixHQUFvQnpkLEVBQUVNLE9BQUYsQ0FBVW1kLENBQVYsTUFBZUgsSUFBRUcsRUFBRWplLEtBQUYsQ0FBUSxDQUFSLEVBQVUsQ0FBQyxDQUFYLENBQUYsRUFBZ0JpZSxJQUFFQSxFQUFFQSxFQUFFcGtCLE1BQUYsR0FBUyxDQUFYLENBQWpDLENBQXBCLEVBQW9FMkcsRUFBRVcsR0FBRixDQUFNbVosQ0FBTixFQUFRLFVBQVNBLENBQVQsRUFBVztBQUFDLFVBQUlzRCxJQUFFaGtCLENBQU4sQ0FBUSxJQUFHLENBQUNna0IsQ0FBSixFQUFNO0FBQUMsWUFBR0UsS0FBR0EsRUFBRWprQixNQUFMLEtBQWN5Z0IsSUFBRThFLEVBQUU5RSxDQUFGLEVBQUl3RCxDQUFKLENBQWhCLEdBQXdCLFFBQU14RCxDQUFqQyxFQUFtQyxPQUFPc0QsSUFBRXRELEVBQUUyRCxDQUFGLENBQUY7QUFBTyxjQUFPLFFBQU1MLENBQU4sR0FBUUEsQ0FBUixHQUFVQSxFQUFFdGEsS0FBRixDQUFRZ1gsQ0FBUixFQUFVN0ssQ0FBVixDQUFqQjtBQUE4QixLQUFsSCxDQUEzRTtBQUErTCxHQUF6TixDQUEvdkIsRUFBMDlCalAsRUFBRStmLEtBQUYsR0FBUSxVQUFTakcsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhO0FBQUMsV0FBT3BkLEVBQUVXLEdBQUYsQ0FBTW1aLENBQU4sRUFBUTlaLEVBQUV1ZSxRQUFGLENBQVduQixDQUFYLENBQVIsQ0FBUDtBQUE4QixHQUE5Z0MsRUFBK2dDcGQsRUFBRWdnQixLQUFGLEdBQVEsVUFBU2xHLENBQVQsRUFBV3NELENBQVgsRUFBYTtBQUFDLFdBQU9wZCxFQUFFTyxNQUFGLENBQVN1WixDQUFULEVBQVc5WixFQUFFc2UsT0FBRixDQUFVbEIsQ0FBVixDQUFYLENBQVA7QUFBZ0MsR0FBcmtDLEVBQXNrQ3BkLEVBQUVnRixTQUFGLEdBQVksVUFBUzhVLENBQVQsRUFBV3NELENBQVgsRUFBYTtBQUFDLFdBQU9wZCxFQUFFeVMsSUFBRixDQUFPcUgsQ0FBUCxFQUFTOVosRUFBRXNlLE9BQUYsQ0FBVWxCLENBQVYsQ0FBVCxDQUFQO0FBQThCLEdBQTluQyxFQUErbkNwZCxFQUFFeWUsR0FBRixHQUFNLFVBQVMzRSxDQUFULEVBQVc3SyxDQUFYLEVBQWFtTyxDQUFiLEVBQWU7QUFBQyxRQUFJSyxDQUFKO0FBQUEsUUFBTUgsQ0FBTjtBQUFBLFFBQVFsa0IsSUFBRSxDQUFDLENBQUQsR0FBRyxDQUFiO0FBQUEsUUFBZW9mLElBQUUsQ0FBQyxDQUFELEdBQUcsQ0FBcEIsQ0FBc0IsSUFBRyxRQUFNdkosQ0FBTixJQUFTLFlBQVUsT0FBT0EsQ0FBakIsSUFBb0Isb0JBQWlCNkssRUFBRSxDQUFGLENBQWpCLENBQXBCLElBQTJDLFFBQU1BLENBQTdELEVBQStELEtBQUksSUFBSTRELElBQUUsQ0FBTixFQUFRSCxJQUFFLENBQUN6RCxJQUFFaGEsRUFBRWdhLENBQUYsSUFBS0EsQ0FBTCxHQUFPOVosRUFBRThQLE1BQUYsQ0FBU2dLLENBQVQsQ0FBVixFQUF1QnpnQixNQUFyQyxFQUE0Q3FrQixJQUFFSCxDQUE5QyxFQUFnREcsR0FBaEQ7QUFBb0QsZUFBT0QsSUFBRTNELEVBQUU0RCxDQUFGLENBQVQsS0FBZ0J0a0IsSUFBRXFrQixDQUFsQixLQUFzQnJrQixJQUFFcWtCLENBQXhCO0FBQXBELEtBQS9ELE1BQW1KeE8sSUFBRWdQLEVBQUVoUCxDQUFGLEVBQUltTyxDQUFKLENBQUYsRUFBU3BkLEVBQUUrZSxJQUFGLENBQU9qRixDQUFQLEVBQVMsVUFBU0EsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWU7QUFBQ0gsVUFBRXJPLEVBQUU2SyxDQUFGLEVBQUlzRCxDQUFKLEVBQU1LLENBQU4sQ0FBRixFQUFXLENBQUNqRixJQUFFOEUsQ0FBRixJQUFLQSxNQUFJLENBQUMsQ0FBRCxHQUFHLENBQVAsSUFBVWxrQixNQUFJLENBQUMsQ0FBRCxHQUFHLENBQXZCLE1BQTRCQSxJQUFFMGdCLENBQUYsRUFBSXRCLElBQUU4RSxDQUFsQyxDQUFYO0FBQWdELEtBQXpFLENBQVQsQ0FBb0YsT0FBT2xrQixDQUFQO0FBQVMsR0FBMzVDLEVBQTQ1QzRHLEVBQUVpZ0IsR0FBRixHQUFNLFVBQVNuRyxDQUFULEVBQVc3SyxDQUFYLEVBQWFtTyxDQUFiLEVBQWU7QUFBQyxRQUFJSyxDQUFKO0FBQUEsUUFBTUgsQ0FBTjtBQUFBLFFBQVFsa0IsSUFBRSxJQUFFLENBQVo7QUFBQSxRQUFjb2YsSUFBRSxJQUFFLENBQWxCLENBQW9CLElBQUcsUUFBTXZKLENBQU4sSUFBUyxZQUFVLE9BQU9BLENBQWpCLElBQW9CLG9CQUFpQjZLLEVBQUUsQ0FBRixDQUFqQixDQUFwQixJQUEyQyxRQUFNQSxDQUE3RCxFQUErRCxLQUFJLElBQUk0RCxJQUFFLENBQU4sRUFBUUgsSUFBRSxDQUFDekQsSUFBRWhhLEVBQUVnYSxDQUFGLElBQUtBLENBQUwsR0FBTzlaLEVBQUU4UCxNQUFGLENBQVNnSyxDQUFULENBQVYsRUFBdUJ6Z0IsTUFBckMsRUFBNENxa0IsSUFBRUgsQ0FBOUMsRUFBZ0RHLEdBQWhEO0FBQW9ELGVBQU9ELElBQUUzRCxFQUFFNEQsQ0FBRixDQUFULEtBQWdCRCxJQUFFcmtCLENBQWxCLEtBQXNCQSxJQUFFcWtCLENBQXhCO0FBQXBELEtBQS9ELE1BQW1KeE8sSUFBRWdQLEVBQUVoUCxDQUFGLEVBQUltTyxDQUFKLENBQUYsRUFBU3BkLEVBQUUrZSxJQUFGLENBQU9qRixDQUFQLEVBQVMsVUFBU0EsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWU7QUFBQyxPQUFDLENBQUNILElBQUVyTyxFQUFFNkssQ0FBRixFQUFJc0QsQ0FBSixFQUFNSyxDQUFOLENBQUgsSUFBYWpGLENBQWIsSUFBZ0I4RSxNQUFJLElBQUUsQ0FBTixJQUFTbGtCLE1BQUksSUFBRSxDQUFoQyxNQUFxQ0EsSUFBRTBnQixDQUFGLEVBQUl0QixJQUFFOEUsQ0FBM0M7QUFBOEMsS0FBdkUsQ0FBVCxDQUFrRixPQUFPbGtCLENBQVA7QUFBUyxHQUFwckQsRUFBcXJENEcsRUFBRWtnQixPQUFGLEdBQVUsVUFBU3BHLENBQVQsRUFBVztBQUFDLFdBQU85WixFQUFFbWdCLE1BQUYsQ0FBU3JHLENBQVQsRUFBVyxJQUFFLENBQWIsQ0FBUDtBQUF1QixHQUFsdUQsRUFBbXVEOVosRUFBRW1nQixNQUFGLEdBQVMsVUFBU3JHLENBQVQsRUFBV3NELENBQVgsRUFBYUssQ0FBYixFQUFlO0FBQUMsUUFBRyxRQUFNTCxDQUFOLElBQVNLLENBQVosRUFBYyxPQUFPM2QsRUFBRWdhLENBQUYsTUFBT0EsSUFBRTlaLEVBQUU4UCxNQUFGLENBQVNnSyxDQUFULENBQVQsR0FBc0JBLEVBQUU5WixFQUFFb2dCLE1BQUYsQ0FBU3RHLEVBQUV6Z0IsTUFBRixHQUFTLENBQWxCLENBQUYsQ0FBN0IsQ0FBcUQsSUFBSTRWLElBQUVuUCxFQUFFZ2EsQ0FBRixJQUFLOVosRUFBRXFnQixLQUFGLENBQVF2RyxDQUFSLENBQUwsR0FBZ0I5WixFQUFFOFAsTUFBRixDQUFTZ0ssQ0FBVCxDQUF0QjtBQUFBLFFBQWtDd0QsSUFBRXdCLEVBQUU3UCxDQUFGLENBQXBDLENBQXlDbU8sSUFBRXhjLEtBQUs2ZCxHQUFMLENBQVM3ZCxLQUFLcWYsR0FBTCxDQUFTN0MsQ0FBVCxFQUFXRSxDQUFYLENBQVQsRUFBdUIsQ0FBdkIsQ0FBRixDQUE0QixLQUFJLElBQUlsa0IsSUFBRWtrQixJQUFFLENBQVIsRUFBVTlFLElBQUUsQ0FBaEIsRUFBa0JBLElBQUU0RSxDQUFwQixFQUFzQjVFLEdBQXRCLEVBQTBCO0FBQUMsVUFBSWtGLElBQUUxZCxFQUFFb2dCLE1BQUYsQ0FBUzVILENBQVQsRUFBV3BmLENBQVgsQ0FBTjtBQUFBLFVBQW9CbWtCLElBQUV0TyxFQUFFdUosQ0FBRixDQUF0QixDQUEyQnZKLEVBQUV1SixDQUFGLElBQUt2SixFQUFFeU8sQ0FBRixDQUFMLEVBQVV6TyxFQUFFeU8sQ0FBRixJQUFLSCxDQUFmO0FBQWlCLFlBQU90TyxFQUFFelAsS0FBRixDQUFRLENBQVIsRUFBVTRkLENBQVYsQ0FBUDtBQUFvQixHQUEvOUQsRUFBZytEcGQsRUFBRXNnQixNQUFGLEdBQVMsVUFBU3hHLENBQVQsRUFBVzdLLENBQVgsRUFBYW1PLENBQWIsRUFBZTtBQUFDLFFBQUlFLElBQUUsQ0FBTixDQUFRLE9BQU9yTyxJQUFFZ1AsRUFBRWhQLENBQUYsRUFBSW1PLENBQUosQ0FBRixFQUFTcGQsRUFBRStmLEtBQUYsQ0FBUS9mLEVBQUVXLEdBQUYsQ0FBTW1aLENBQU4sRUFBUSxVQUFTQSxDQUFULEVBQVdzRCxDQUFYLEVBQWFLLENBQWIsRUFBZTtBQUFDLGFBQU0sRUFBQ25RLE9BQU13TSxDQUFQLEVBQVNqZixPQUFNeWlCLEdBQWYsRUFBbUJpRCxVQUFTdFIsRUFBRTZLLENBQUYsRUFBSXNELENBQUosRUFBTUssQ0FBTixDQUE1QixFQUFOO0FBQTRDLEtBQXBFLEVBQXNFMWMsSUFBdEUsQ0FBMkUsVUFBUytZLENBQVQsRUFBV3NELENBQVgsRUFBYTtBQUFDLFVBQUlLLElBQUUzRCxFQUFFeUcsUUFBUjtBQUFBLFVBQWlCdFIsSUFBRW1PLEVBQUVtRCxRQUFyQixDQUE4QixJQUFHOUMsTUFBSXhPLENBQVAsRUFBUztBQUFDLFlBQUdBLElBQUV3TyxDQUFGLElBQUssS0FBSyxDQUFMLEtBQVNBLENBQWpCLEVBQW1CLE9BQU8sQ0FBUCxDQUFTLElBQUdBLElBQUV4TyxDQUFGLElBQUssS0FBSyxDQUFMLEtBQVNBLENBQWpCLEVBQW1CLE9BQU0sQ0FBQyxDQUFQO0FBQVMsY0FBTzZLLEVBQUVqZixLQUFGLEdBQVF1aUIsRUFBRXZpQixLQUFqQjtBQUF1QixLQUFoTixDQUFSLEVBQTBOLE9BQTFOLENBQWhCO0FBQW1QLEdBQXB2RSxDQUFxdkUsSUFBSTBJLElBQUUsU0FBRkEsQ0FBRSxDQUFTaVYsQ0FBVCxFQUFXNEUsQ0FBWCxFQUFhO0FBQUMsV0FBTyxVQUFTbk8sQ0FBVCxFQUFXcU8sQ0FBWCxFQUFheEQsQ0FBYixFQUFlO0FBQUMsVUFBSTFnQixJQUFFZ2tCLElBQUUsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFGLEdBQVUsRUFBaEIsQ0FBbUIsT0FBT0UsSUFBRVcsRUFBRVgsQ0FBRixFQUFJeEQsQ0FBSixDQUFGLEVBQVM5WixFQUFFK2UsSUFBRixDQUFPOVAsQ0FBUCxFQUFTLFVBQVM2SyxDQUFULEVBQVdzRCxDQUFYLEVBQWE7QUFBQyxZQUFJSyxJQUFFSCxFQUFFeEQsQ0FBRixFQUFJc0QsQ0FBSixFQUFNbk8sQ0FBTixDQUFOLENBQWV1SixFQUFFcGYsQ0FBRixFQUFJMGdCLENBQUosRUFBTTJELENBQU47QUFBUyxPQUEvQyxDQUFULEVBQTBEcmtCLENBQWpFO0FBQW1FLEtBQTdHO0FBQThHLEdBQWxJLENBQW1JNEcsRUFBRXdnQixPQUFGLEdBQVVqZCxFQUFFLFVBQVN1VyxDQUFULEVBQVdzRCxDQUFYLEVBQWFLLENBQWIsRUFBZTtBQUFDbmEsTUFBRXdXLENBQUYsRUFBSTJELENBQUosSUFBTzNELEVBQUUyRCxDQUFGLEVBQUszYyxJQUFMLENBQVVzYyxDQUFWLENBQVAsR0FBb0J0RCxFQUFFMkQsQ0FBRixJQUFLLENBQUNMLENBQUQsQ0FBekI7QUFBNkIsR0FBL0MsQ0FBVixFQUEyRHBkLEVBQUV5Z0IsT0FBRixHQUFVbGQsRUFBRSxVQUFTdVcsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWU7QUFBQzNELE1BQUUyRCxDQUFGLElBQUtMLENBQUw7QUFBTyxHQUF6QixDQUFyRSxFQUFnR3BkLEVBQUUwZ0IsT0FBRixHQUFVbmQsRUFBRSxVQUFTdVcsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWU7QUFBQ25hLE1BQUV3VyxDQUFGLEVBQUkyRCxDQUFKLElBQU8zRCxFQUFFMkQsQ0FBRixHQUFQLEdBQWMzRCxFQUFFMkQsQ0FBRixJQUFLLENBQW5CO0FBQXFCLEdBQXZDLENBQTFHLENBQW1KLElBQUlrRCxJQUFFLGtFQUFOLENBQXlFM2dCLEVBQUU0Z0IsT0FBRixHQUFVLFVBQVM5RyxDQUFULEVBQVc7QUFBQyxXQUFPQSxJQUFFOVosRUFBRU0sT0FBRixDQUFVd1osQ0FBVixJQUFheUQsRUFBRXhhLElBQUYsQ0FBTytXLENBQVAsQ0FBYixHQUF1QjlaLEVBQUU2Z0IsUUFBRixDQUFXL0csQ0FBWCxJQUFjQSxFQUFFaEksS0FBRixDQUFRNk8sQ0FBUixDQUFkLEdBQXlCN2dCLEVBQUVnYSxDQUFGLElBQUs5WixFQUFFVyxHQUFGLENBQU1tWixDQUFOLEVBQVE5WixFQUFFbWUsUUFBVixDQUFMLEdBQXlCbmUsRUFBRThQLE1BQUYsQ0FBU2dLLENBQVQsQ0FBM0UsR0FBdUYsRUFBOUY7QUFBaUcsR0FBdkgsRUFBd0g5WixFQUFFOGdCLElBQUYsR0FBTyxVQUFTaEgsQ0FBVCxFQUFXO0FBQUMsV0FBTyxRQUFNQSxDQUFOLEdBQVEsQ0FBUixHQUFVaGEsRUFBRWdhLENBQUYsSUFBS0EsRUFBRXpnQixNQUFQLEdBQWMyRyxFQUFFWixJQUFGLENBQU8wYSxDQUFQLEVBQVV6Z0IsTUFBekM7QUFBZ0QsR0FBM0wsRUFBNEwyRyxFQUFFK2dCLFNBQUYsR0FBWXhkLEVBQUUsVUFBU3VXLENBQVQsRUFBV3NELENBQVgsRUFBYUssQ0FBYixFQUFlO0FBQUMzRCxNQUFFMkQsSUFBRSxDQUFGLEdBQUksQ0FBTixFQUFTM2MsSUFBVCxDQUFjc2MsQ0FBZDtBQUFpQixHQUFuQyxFQUFvQyxDQUFDLENBQXJDLENBQXhNLEVBQWdQcGQsRUFBRWdoQixLQUFGLEdBQVFoaEIsRUFBRWloQixJQUFGLEdBQU9qaEIsRUFBRWtoQixJQUFGLEdBQU8sVUFBU3BILENBQVQsRUFBV3NELENBQVgsRUFBYUssQ0FBYixFQUFlO0FBQUMsV0FBTyxRQUFNM0QsQ0FBTixJQUFTQSxFQUFFemdCLE1BQUYsR0FBUyxDQUFsQixHQUFvQixRQUFNK2pCLENBQU4sR0FBUSxLQUFLLENBQWIsR0FBZSxFQUFuQyxHQUFzQyxRQUFNQSxDQUFOLElBQVNLLENBQVQsR0FBVzNELEVBQUUsQ0FBRixDQUFYLEdBQWdCOVosRUFBRW1oQixPQUFGLENBQVVySCxDQUFWLEVBQVlBLEVBQUV6Z0IsTUFBRixHQUFTK2pCLENBQXJCLENBQTdEO0FBQXFGLEdBQTNXLEVBQTRXcGQsRUFBRW1oQixPQUFGLEdBQVUsVUFBU3JILENBQVQsRUFBV3NELENBQVgsRUFBYUssQ0FBYixFQUFlO0FBQUMsV0FBT0YsRUFBRXhhLElBQUYsQ0FBTytXLENBQVAsRUFBUyxDQUFULEVBQVdsWixLQUFLNmQsR0FBTCxDQUFTLENBQVQsRUFBVzNFLEVBQUV6Z0IsTUFBRixJQUFVLFFBQU0rakIsQ0FBTixJQUFTSyxDQUFULEdBQVcsQ0FBWCxHQUFhTCxDQUF2QixDQUFYLENBQVgsQ0FBUDtBQUF5RCxHQUEvYixFQUFnY3BkLEVBQUVvaEIsSUFBRixHQUFPLFVBQVN0SCxDQUFULEVBQVdzRCxDQUFYLEVBQWFLLENBQWIsRUFBZTtBQUFDLFdBQU8sUUFBTTNELENBQU4sSUFBU0EsRUFBRXpnQixNQUFGLEdBQVMsQ0FBbEIsR0FBb0IsUUFBTStqQixDQUFOLEdBQVEsS0FBSyxDQUFiLEdBQWUsRUFBbkMsR0FBc0MsUUFBTUEsQ0FBTixJQUFTSyxDQUFULEdBQVczRCxFQUFFQSxFQUFFemdCLE1BQUYsR0FBUyxDQUFYLENBQVgsR0FBeUIyRyxFQUFFcWhCLElBQUYsQ0FBT3ZILENBQVAsRUFBU2xaLEtBQUs2ZCxHQUFMLENBQVMsQ0FBVCxFQUFXM0UsRUFBRXpnQixNQUFGLEdBQVMrakIsQ0FBcEIsQ0FBVCxDQUF0RTtBQUF1RyxHQUE5akIsRUFBK2pCcGQsRUFBRXFoQixJQUFGLEdBQU9yaEIsRUFBRXNoQixJQUFGLEdBQU90aEIsRUFBRXVoQixJQUFGLEdBQU8sVUFBU3pILENBQVQsRUFBV3NELENBQVgsRUFBYUssQ0FBYixFQUFlO0FBQUMsV0FBT0YsRUFBRXhhLElBQUYsQ0FBTytXLENBQVAsRUFBUyxRQUFNc0QsQ0FBTixJQUFTSyxDQUFULEdBQVcsQ0FBWCxHQUFhTCxDQUF0QixDQUFQO0FBQWdDLEdBQXBvQixFQUFxb0JwZCxFQUFFd2hCLE9BQUYsR0FBVSxVQUFTMUgsQ0FBVCxFQUFXO0FBQUMsV0FBTzlaLEVBQUVPLE1BQUYsQ0FBU3VaLENBQVQsRUFBVzJILE9BQVgsQ0FBUDtBQUEyQixHQUF0ckIsQ0FBdXJCLElBQUlDLElBQUUsU0FBRkEsQ0FBRSxDQUFTNUgsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWV4TyxDQUFmLEVBQWlCO0FBQUMsU0FBSSxJQUFJcU8sSUFBRSxDQUFDck8sSUFBRUEsS0FBRyxFQUFOLEVBQVU1VixNQUFoQixFQUF1QkQsSUFBRSxDQUF6QixFQUEyQm9mLElBQUVzRyxFQUFFaEYsQ0FBRixDQUFqQyxFQUFzQzFnQixJQUFFb2YsQ0FBeEMsRUFBMENwZixHQUExQyxFQUE4QztBQUFDLFVBQUlza0IsSUFBRTVELEVBQUUxZ0IsQ0FBRixDQUFOLENBQVcsSUFBRzBHLEVBQUU0ZCxDQUFGLE1BQU8xZCxFQUFFTSxPQUFGLENBQVVvZCxDQUFWLEtBQWMxZCxFQUFFMmhCLFdBQUYsQ0FBY2pFLENBQWQsQ0FBckIsQ0FBSDtBQUEwQyxZQUFHTixDQUFILEVBQUssS0FBSSxJQUFJRyxJQUFFLENBQU4sRUFBUW5hLElBQUVzYSxFQUFFcmtCLE1BQWhCLEVBQXVCa2tCLElBQUVuYSxDQUF6QjtBQUE0QjZMLFlBQUVxTyxHQUFGLElBQU9JLEVBQUVILEdBQUYsQ0FBUDtBQUE1QixTQUFMLE1BQW9EbUUsRUFBRWhFLENBQUYsRUFBSU4sQ0FBSixFQUFNSyxDQUFOLEVBQVF4TyxDQUFSLEdBQVdxTyxJQUFFck8sRUFBRTVWLE1BQWY7QUFBOUYsYUFBeUhva0IsTUFBSXhPLEVBQUVxTyxHQUFGLElBQU9JLENBQVg7QUFBYyxZQUFPek8sQ0FBUDtBQUFTLEdBQWxPLENBQW1PalAsRUFBRTRoQixPQUFGLEdBQVUsVUFBUzlILENBQVQsRUFBV3NELENBQVgsRUFBYTtBQUFDLFdBQU9zRSxFQUFFNUgsQ0FBRixFQUFJc0QsQ0FBSixFQUFNLENBQUMsQ0FBUCxDQUFQO0FBQWlCLEdBQXpDLEVBQTBDcGQsRUFBRTZoQixPQUFGLEdBQVVyRCxFQUFFLFVBQVMxRSxDQUFULEVBQVdzRCxDQUFYLEVBQWE7QUFBQyxXQUFPcGQsRUFBRThoQixVQUFGLENBQWFoSSxDQUFiLEVBQWVzRCxDQUFmLENBQVA7QUFBeUIsR0FBekMsQ0FBcEQsRUFBK0ZwZCxFQUFFK2hCLElBQUYsR0FBTy9oQixFQUFFZ2lCLE1BQUYsR0FBUyxVQUFTbEksQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWV4TyxDQUFmLEVBQWlCO0FBQUNqUCxNQUFFaWlCLFNBQUYsQ0FBWTdFLENBQVosTUFBaUJuTyxJQUFFd08sQ0FBRixFQUFJQSxJQUFFTCxDQUFOLEVBQVFBLElBQUUsQ0FBQyxDQUE1QixHQUErQixRQUFNSyxDQUFOLEtBQVVBLElBQUVRLEVBQUVSLENBQUYsRUFBSXhPLENBQUosQ0FBWixDQUEvQixDQUFtRCxLQUFJLElBQUlxTyxJQUFFLEVBQU4sRUFBU2xrQixJQUFFLEVBQVgsRUFBY29mLElBQUUsQ0FBaEIsRUFBa0JrRixJQUFFb0IsRUFBRWhGLENBQUYsQ0FBeEIsRUFBNkJ0QixJQUFFa0YsQ0FBL0IsRUFBaUNsRixHQUFqQyxFQUFxQztBQUFDLFVBQUkrRSxJQUFFekQsRUFBRXRCLENBQUYsQ0FBTjtBQUFBLFVBQVdwVixJQUFFcWEsSUFBRUEsRUFBRUYsQ0FBRixFQUFJL0UsQ0FBSixFQUFNc0IsQ0FBTixDQUFGLEdBQVd5RCxDQUF4QixDQUEwQkgsS0FBRyxDQUFDSyxDQUFKLElBQU9qRixLQUFHcGYsTUFBSWdLLENBQVAsSUFBVWthLEVBQUV4YyxJQUFGLENBQU95YyxDQUFQLENBQVYsRUFBb0Jua0IsSUFBRWdLLENBQTdCLElBQWdDcWEsSUFBRXpkLEVBQUUrVCxRQUFGLENBQVczYSxDQUFYLEVBQWFnSyxDQUFiLE1BQWtCaEssRUFBRTBILElBQUYsQ0FBT3NDLENBQVAsR0FBVWthLEVBQUV4YyxJQUFGLENBQU95YyxDQUFQLENBQTVCLENBQUYsR0FBeUN2ZCxFQUFFK1QsUUFBRixDQUFXdUosQ0FBWCxFQUFhQyxDQUFiLEtBQWlCRCxFQUFFeGMsSUFBRixDQUFPeWMsQ0FBUCxDQUExRjtBQUFvRyxZQUFPRCxDQUFQO0FBQVMsR0FBalcsRUFBa1d0ZCxFQUFFa2lCLEtBQUYsR0FBUTFELEVBQUUsVUFBUzFFLENBQVQsRUFBVztBQUFDLFdBQU85WixFQUFFK2hCLElBQUYsQ0FBT0wsRUFBRTVILENBQUYsRUFBSSxDQUFDLENBQUwsRUFBTyxDQUFDLENBQVIsQ0FBUCxDQUFQO0FBQTBCLEdBQXhDLENBQTFXLEVBQW9aOVosRUFBRW1pQixZQUFGLEdBQWUsVUFBU3JJLENBQVQsRUFBVztBQUFDLFNBQUksSUFBSXNELElBQUUsRUFBTixFQUFTSyxJQUFFemEsVUFBVTNKLE1BQXJCLEVBQTRCNFYsSUFBRSxDQUE5QixFQUFnQ3FPLElBQUV3QixFQUFFaEYsQ0FBRixDQUF0QyxFQUEyQzdLLElBQUVxTyxDQUE3QyxFQUErQ3JPLEdBQS9DLEVBQW1EO0FBQUMsVUFBSTdWLElBQUUwZ0IsRUFBRTdLLENBQUYsQ0FBTixDQUFXLElBQUcsQ0FBQ2pQLEVBQUUrVCxRQUFGLENBQVdxSixDQUFYLEVBQWFoa0IsQ0FBYixDQUFKLEVBQW9CO0FBQUMsWUFBSW9mLENBQUosQ0FBTSxLQUFJQSxJQUFFLENBQU4sRUFBUUEsSUFBRWlGLENBQUYsSUFBS3pkLEVBQUUrVCxRQUFGLENBQVcvUSxVQUFVd1YsQ0FBVixDQUFYLEVBQXdCcGYsQ0FBeEIsQ0FBYixFQUF3Q29mLEdBQXhDLElBQTZDQSxNQUFJaUYsQ0FBSixJQUFPTCxFQUFFdGMsSUFBRixDQUFPMUgsQ0FBUCxDQUFQO0FBQWlCO0FBQUMsWUFBT2drQixDQUFQO0FBQVMsR0FBamxCLEVBQWtsQnBkLEVBQUU4aEIsVUFBRixHQUFhdEQsRUFBRSxVQUFTMUUsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhO0FBQUMsV0FBT0EsSUFBRXNFLEVBQUV0RSxDQUFGLEVBQUksQ0FBQyxDQUFMLEVBQU8sQ0FBQyxDQUFSLENBQUYsRUFBYXBkLEVBQUVPLE1BQUYsQ0FBU3VaLENBQVQsRUFBVyxVQUFTQSxDQUFULEVBQVc7QUFBQyxhQUFNLENBQUM5WixFQUFFK1QsUUFBRixDQUFXcUosQ0FBWCxFQUFhdEQsQ0FBYixDQUFQO0FBQXVCLEtBQTlDLENBQXBCO0FBQW9FLEdBQXBGLENBQS9sQixFQUFxckI5WixFQUFFb2lCLEtBQUYsR0FBUSxVQUFTdEksQ0FBVCxFQUFXO0FBQUMsU0FBSSxJQUFJc0QsSUFBRXRELEtBQUc5WixFQUFFeWUsR0FBRixDQUFNM0UsQ0FBTixFQUFRZ0YsQ0FBUixFQUFXemxCLE1BQWQsSUFBc0IsQ0FBNUIsRUFBOEJva0IsSUFBRXBkLE1BQU0rYyxDQUFOLENBQWhDLEVBQXlDbk8sSUFBRSxDQUEvQyxFQUFpREEsSUFBRW1PLENBQW5ELEVBQXFEbk8sR0FBckQ7QUFBeUR3TyxRQUFFeE8sQ0FBRixJQUFLalAsRUFBRStmLEtBQUYsQ0FBUWpHLENBQVIsRUFBVTdLLENBQVYsQ0FBTDtBQUF6RCxLQUEyRSxPQUFPd08sQ0FBUDtBQUFTLEdBQTd4QixFQUE4eEJ6ZCxFQUFFcWlCLEdBQUYsR0FBTTdELEVBQUV4ZSxFQUFFb2lCLEtBQUosQ0FBcHlCLEVBQSt5QnBpQixFQUFFc0MsTUFBRixHQUFTLFVBQVN3WCxDQUFULEVBQVdzRCxDQUFYLEVBQWE7QUFBQyxTQUFJLElBQUlLLElBQUUsRUFBTixFQUFTeE8sSUFBRSxDQUFYLEVBQWFxTyxJQUFFd0IsRUFBRWhGLENBQUYsQ0FBbkIsRUFBd0I3SyxJQUFFcU8sQ0FBMUIsRUFBNEJyTyxHQUE1QjtBQUFnQ21PLFVBQUVLLEVBQUUzRCxFQUFFN0ssQ0FBRixDQUFGLElBQVFtTyxFQUFFbk8sQ0FBRixDQUFWLEdBQWV3TyxFQUFFM0QsRUFBRTdLLENBQUYsRUFBSyxDQUFMLENBQUYsSUFBVzZLLEVBQUU3SyxDQUFGLEVBQUssQ0FBTCxDQUExQjtBQUFoQyxLQUFrRSxPQUFPd08sQ0FBUDtBQUFTLEdBQWo1QixDQUFrNUIsSUFBSTZFLElBQUUsU0FBRkEsQ0FBRSxDQUFTbHBCLENBQVQsRUFBVztBQUFDLFdBQU8sVUFBUzBnQixDQUFULEVBQVdzRCxDQUFYLEVBQWFLLENBQWIsRUFBZTtBQUFDTCxVQUFFYSxFQUFFYixDQUFGLEVBQUlLLENBQUosQ0FBRixDQUFTLEtBQUksSUFBSXhPLElBQUU2UCxFQUFFaEYsQ0FBRixDQUFOLEVBQVd3RCxJQUFFLElBQUVsa0IsQ0FBRixHQUFJLENBQUosR0FBTTZWLElBQUUsQ0FBekIsRUFBMkIsS0FBR3FPLENBQUgsSUFBTUEsSUFBRXJPLENBQW5DLEVBQXFDcU8sS0FBR2xrQixDQUF4QztBQUEwQyxZQUFHZ2tCLEVBQUV0RCxFQUFFd0QsQ0FBRixDQUFGLEVBQU9BLENBQVAsRUFBU3hELENBQVQsQ0FBSCxFQUFlLE9BQU93RCxDQUFQO0FBQXpELE9BQWtFLE9BQU0sQ0FBQyxDQUFQO0FBQVMsS0FBM0c7QUFBNEcsR0FBOUgsQ0FBK0h0ZCxFQUFFa0YsU0FBRixHQUFZb2QsRUFBRSxDQUFGLENBQVosRUFBaUJ0aUIsRUFBRXVpQixhQUFGLEdBQWdCRCxFQUFFLENBQUMsQ0FBSCxDQUFqQyxFQUF1Q3RpQixFQUFFd2lCLFdBQUYsR0FBYyxVQUFTMUksQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWV4TyxDQUFmLEVBQWlCO0FBQUMsU0FBSSxJQUFJcU8sSUFBRSxDQUFDRyxJQUFFUSxFQUFFUixDQUFGLEVBQUl4TyxDQUFKLEVBQU0sQ0FBTixDQUFILEVBQWFtTyxDQUFiLENBQU4sRUFBc0Joa0IsSUFBRSxDQUF4QixFQUEwQm9mLElBQUVzRyxFQUFFaEYsQ0FBRixDQUFoQyxFQUFxQzFnQixJQUFFb2YsQ0FBdkMsR0FBMEM7QUFBQyxVQUFJa0YsSUFBRTljLEtBQUtxYyxLQUFMLENBQVcsQ0FBQzdqQixJQUFFb2YsQ0FBSCxJQUFNLENBQWpCLENBQU4sQ0FBMEJpRixFQUFFM0QsRUFBRTRELENBQUYsQ0FBRixJQUFRSixDQUFSLEdBQVVsa0IsSUFBRXNrQixJQUFFLENBQWQsR0FBZ0JsRixJQUFFa0YsQ0FBbEI7QUFBb0IsWUFBT3RrQixDQUFQO0FBQVMsR0FBekssQ0FBMEssSUFBSXFwQixJQUFFLFNBQUZBLENBQUUsQ0FBU3JwQixDQUFULEVBQVdvZixDQUFYLEVBQWFrRixDQUFiLEVBQWU7QUFBQyxXQUFPLFVBQVM1RCxDQUFULEVBQVdzRCxDQUFYLEVBQWFLLENBQWIsRUFBZTtBQUFDLFVBQUl4TyxJQUFFLENBQU47QUFBQSxVQUFRcU8sSUFBRXdCLEVBQUVoRixDQUFGLENBQVYsQ0FBZSxJQUFHLFlBQVUsT0FBTzJELENBQXBCLEVBQXNCLElBQUVya0IsQ0FBRixHQUFJNlYsSUFBRSxLQUFHd08sQ0FBSCxHQUFLQSxDQUFMLEdBQU83YyxLQUFLNmQsR0FBTCxDQUFTaEIsSUFBRUgsQ0FBWCxFQUFhck8sQ0FBYixDQUFiLEdBQTZCcU8sSUFBRSxLQUFHRyxDQUFILEdBQUs3YyxLQUFLcWYsR0FBTCxDQUFTeEMsSUFBRSxDQUFYLEVBQWFILENBQWIsQ0FBTCxHQUFxQkcsSUFBRUgsQ0FBRixHQUFJLENBQXhELENBQXRCLEtBQXFGLElBQUdJLEtBQUdELENBQUgsSUFBTUgsQ0FBVCxFQUFXLE9BQU94RCxFQUFFMkQsSUFBRUMsRUFBRTVELENBQUYsRUFBSXNELENBQUosQ0FBSixNQUFjQSxDQUFkLEdBQWdCSyxDQUFoQixHQUFrQixDQUFDLENBQTFCLENBQTRCLElBQUdMLEtBQUdBLENBQU4sRUFBUSxPQUFPLE1BQUlLLElBQUVqRixFQUFFK0UsRUFBRXhhLElBQUYsQ0FBTytXLENBQVAsRUFBUzdLLENBQVQsRUFBV3FPLENBQVgsQ0FBRixFQUFnQnRkLEVBQUVqQixLQUFsQixDQUFOLElBQWdDMGUsSUFBRXhPLENBQWxDLEdBQW9DLENBQUMsQ0FBNUMsQ0FBOEMsS0FBSXdPLElBQUUsSUFBRXJrQixDQUFGLEdBQUk2VixDQUFKLEdBQU1xTyxJQUFFLENBQWQsRUFBZ0IsS0FBR0csQ0FBSCxJQUFNQSxJQUFFSCxDQUF4QixFQUEwQkcsS0FBR3JrQixDQUE3QjtBQUErQixZQUFHMGdCLEVBQUUyRCxDQUFGLE1BQU9MLENBQVYsRUFBWSxPQUFPSyxDQUFQO0FBQTNDLE9BQW9ELE9BQU0sQ0FBQyxDQUFQO0FBQVMsS0FBclI7QUFBc1IsR0FBNVMsQ0FBNlN6ZCxFQUFFSixPQUFGLEdBQVU2aUIsRUFBRSxDQUFGLEVBQUl6aUIsRUFBRWtGLFNBQU4sRUFBZ0JsRixFQUFFd2lCLFdBQWxCLENBQVYsRUFBeUN4aUIsRUFBRTZjLFdBQUYsR0FBYzRGLEVBQUUsQ0FBQyxDQUFILEVBQUt6aUIsRUFBRXVpQixhQUFQLENBQXZELEVBQTZFdmlCLEVBQUUwaUIsS0FBRixHQUFRLFVBQVM1SSxDQUFULEVBQVdzRCxDQUFYLEVBQWFLLENBQWIsRUFBZTtBQUFDLFlBQU1MLENBQU4sS0FBVUEsSUFBRXRELEtBQUcsQ0FBTCxFQUFPQSxJQUFFLENBQW5CLEdBQXNCMkQsTUFBSUEsSUFBRUwsSUFBRXRELENBQUYsR0FBSSxDQUFDLENBQUwsR0FBTyxDQUFiLENBQXRCLENBQXNDLEtBQUksSUFBSTdLLElBQUVyTyxLQUFLNmQsR0FBTCxDQUFTN2QsS0FBSytoQixJQUFMLENBQVUsQ0FBQ3ZGLElBQUV0RCxDQUFILElBQU0yRCxDQUFoQixDQUFULEVBQTRCLENBQTVCLENBQU4sRUFBcUNILElBQUVqZCxNQUFNNE8sQ0FBTixDQUF2QyxFQUFnRDdWLElBQUUsQ0FBdEQsRUFBd0RBLElBQUU2VixDQUExRCxFQUE0RDdWLEtBQUkwZ0IsS0FBRzJELENBQW5FO0FBQXFFSCxRQUFFbGtCLENBQUYsSUFBSzBnQixDQUFMO0FBQXJFLEtBQTRFLE9BQU93RCxDQUFQO0FBQVMsR0FBaE8sRUFBaU90ZCxFQUFFNGlCLEtBQUYsR0FBUSxVQUFTOUksQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhO0FBQUMsUUFBRyxRQUFNQSxDQUFOLElBQVNBLElBQUUsQ0FBZCxFQUFnQixPQUFNLEVBQU4sQ0FBUyxLQUFJLElBQUlLLElBQUUsRUFBTixFQUFTeE8sSUFBRSxDQUFYLEVBQWFxTyxJQUFFeEQsRUFBRXpnQixNQUFyQixFQUE0QjRWLElBQUVxTyxDQUE5QjtBQUFpQ0csUUFBRTNjLElBQUYsQ0FBT3ljLEVBQUV4YSxJQUFGLENBQU8rVyxDQUFQLEVBQVM3SyxDQUFULEVBQVdBLEtBQUdtTyxDQUFkLENBQVA7QUFBakMsS0FBMEQsT0FBT0ssQ0FBUDtBQUFTLEdBQW5WLENBQW9WLElBQUlvRixJQUFFLFNBQUZBLENBQUUsQ0FBUy9JLENBQVQsRUFBV3NELENBQVgsRUFBYUssQ0FBYixFQUFleE8sQ0FBZixFQUFpQnFPLENBQWpCLEVBQW1CO0FBQUMsUUFBRyxFQUFFck8sYUFBYW1PLENBQWYsQ0FBSCxFQUFxQixPQUFPdEQsRUFBRWhYLEtBQUYsQ0FBUTJhLENBQVIsRUFBVUgsQ0FBVixDQUFQLENBQW9CLElBQUlsa0IsSUFBRXNsQixFQUFFNUUsRUFBRXpWLFNBQUosQ0FBTjtBQUFBLFFBQXFCbVUsSUFBRXNCLEVBQUVoWCxLQUFGLENBQVExSixDQUFSLEVBQVVra0IsQ0FBVixDQUF2QixDQUFvQyxPQUFPdGQsRUFBRXFlLFFBQUYsQ0FBVzdGLENBQVgsSUFBY0EsQ0FBZCxHQUFnQnBmLENBQXZCO0FBQXlCLEdBQWhJLENBQWlJNEcsRUFBRThOLElBQUYsR0FBTzBRLEVBQUUsVUFBU3BCLENBQVQsRUFBV0ssQ0FBWCxFQUFheE8sQ0FBYixFQUFlO0FBQUMsUUFBRyxDQUFDalAsRUFBRW9lLFVBQUYsQ0FBYWhCLENBQWIsQ0FBSixFQUFvQixNQUFNLElBQUlsUCxTQUFKLENBQWMsbUNBQWQsQ0FBTixDQUF5RCxJQUFJb1AsSUFBRWtCLEVBQUUsVUFBUzFFLENBQVQsRUFBVztBQUFDLGFBQU8rSSxFQUFFekYsQ0FBRixFQUFJRSxDQUFKLEVBQU1HLENBQU4sRUFBUSxJQUFSLEVBQWF4TyxFQUFFbEQsTUFBRixDQUFTK04sQ0FBVCxDQUFiLENBQVA7QUFBaUMsS0FBL0MsQ0FBTixDQUF1RCxPQUFPd0QsQ0FBUDtBQUFTLEdBQS9KLENBQVAsRUFBd0t0ZCxFQUFFOGlCLE9BQUYsR0FBVXRFLEVBQUUsVUFBU2xCLENBQVQsRUFBV2xrQixDQUFYLEVBQWE7QUFBQyxRQUFJb2YsSUFBRXhZLEVBQUU4aUIsT0FBRixDQUFVQyxXQUFoQjtBQUFBLFFBQTRCckYsSUFBRSxTQUFGQSxDQUFFLEdBQVU7QUFBQyxXQUFJLElBQUk1RCxJQUFFLENBQU4sRUFBUXNELElBQUVoa0IsRUFBRUMsTUFBWixFQUFtQm9rQixJQUFFcGQsTUFBTStjLENBQU4sQ0FBckIsRUFBOEJuTyxJQUFFLENBQXBDLEVBQXNDQSxJQUFFbU8sQ0FBeEMsRUFBMENuTyxHQUExQztBQUE4Q3dPLFVBQUV4TyxDQUFGLElBQUs3VixFQUFFNlYsQ0FBRixNQUFPdUosQ0FBUCxHQUFTeFYsVUFBVThXLEdBQVYsQ0FBVCxHQUF3QjFnQixFQUFFNlYsQ0FBRixDQUE3QjtBQUE5QyxPQUFnRixPQUFLNkssSUFBRTlXLFVBQVUzSixNQUFqQjtBQUF5Qm9rQixVQUFFM2MsSUFBRixDQUFPa0MsVUFBVThXLEdBQVYsQ0FBUDtBQUF6QixPQUFnRCxPQUFPK0ksRUFBRXZGLENBQUYsRUFBSUksQ0FBSixFQUFNLElBQU4sRUFBVyxJQUFYLEVBQWdCRCxDQUFoQixDQUFQO0FBQTBCLEtBQW5NLENBQW9NLE9BQU9DLENBQVA7QUFBUyxHQUE3TixDQUFsTCxFQUFpWixDQUFDMWQsRUFBRThpQixPQUFGLENBQVVDLFdBQVYsR0FBc0IvaUIsQ0FBdkIsRUFBMEJnakIsT0FBMUIsR0FBa0N4RSxFQUFFLFVBQVMxRSxDQUFULEVBQVdzRCxDQUFYLEVBQWE7QUFBQyxRQUFJSyxJQUFFLENBQUNMLElBQUVzRSxFQUFFdEUsQ0FBRixFQUFJLENBQUMsQ0FBTCxFQUFPLENBQUMsQ0FBUixDQUFILEVBQWUvakIsTUFBckIsQ0FBNEIsSUFBR29rQixJQUFFLENBQUwsRUFBTyxNQUFNLElBQUloUixLQUFKLENBQVUsdUNBQVYsQ0FBTixDQUF5RCxPQUFLZ1IsR0FBTCxHQUFVO0FBQUMsVUFBSXhPLElBQUVtTyxFQUFFSyxDQUFGLENBQU4sQ0FBVzNELEVBQUU3SyxDQUFGLElBQUtqUCxFQUFFOE4sSUFBRixDQUFPZ00sRUFBRTdLLENBQUYsQ0FBUCxFQUFZNkssQ0FBWixDQUFMO0FBQW9CO0FBQUMsR0FBdkosQ0FBbmIsRUFBNGtCOVosRUFBRWlqQixPQUFGLEdBQVUsVUFBU2hVLENBQVQsRUFBV3FPLENBQVgsRUFBYTtBQUFDLFFBQUlsa0IsSUFBRSxTQUFGQSxDQUFFLENBQVMwZ0IsQ0FBVCxFQUFXO0FBQUMsVUFBSXNELElBQUVoa0IsRUFBRThwQixLQUFSO0FBQUEsVUFBY3pGLElBQUUsTUFBSUgsSUFBRUEsRUFBRXhhLEtBQUYsQ0FBUSxJQUFSLEVBQWFFLFNBQWIsQ0FBRixHQUEwQjhXLENBQTlCLENBQWhCLENBQWlELE9BQU94VyxFQUFFOFosQ0FBRixFQUFJSyxDQUFKLE1BQVNMLEVBQUVLLENBQUYsSUFBS3hPLEVBQUVuTSxLQUFGLENBQVEsSUFBUixFQUFhRSxTQUFiLENBQWQsR0FBdUNvYSxFQUFFSyxDQUFGLENBQTlDO0FBQW1ELEtBQXRILENBQXVILE9BQU9ya0IsRUFBRThwQixLQUFGLEdBQVEsRUFBUixFQUFXOXBCLENBQWxCO0FBQW9CLEdBQS91QixFQUFndkI0RyxFQUFFbWpCLEtBQUYsR0FBUTNFLEVBQUUsVUFBUzFFLENBQVQsRUFBV3NELENBQVgsRUFBYUssQ0FBYixFQUFlO0FBQUMsV0FBTy9QLFdBQVcsWUFBVTtBQUFDLGFBQU9vTSxFQUFFaFgsS0FBRixDQUFRLElBQVIsRUFBYTJhLENBQWIsQ0FBUDtBQUF1QixLQUE3QyxFQUE4Q0wsQ0FBOUMsQ0FBUDtBQUF3RCxHQUExRSxDQUF4dkIsRUFBbzBCcGQsRUFBRW9qQixLQUFGLEdBQVFwakIsRUFBRThpQixPQUFGLENBQVU5aUIsRUFBRW1qQixLQUFaLEVBQWtCbmpCLENBQWxCLEVBQW9CLENBQXBCLENBQTUwQixFQUFtMkJBLEVBQUVxakIsUUFBRixHQUFXLFVBQVM1RixDQUFULEVBQVd4TyxDQUFYLEVBQWFxTyxDQUFiLEVBQWU7QUFBQyxRQUFJbGtCLENBQUo7QUFBQSxRQUFNb2YsQ0FBTjtBQUFBLFFBQVFrRixDQUFSO0FBQUEsUUFBVUgsQ0FBVjtBQUFBLFFBQVluYSxJQUFFLENBQWQsQ0FBZ0JrYSxNQUFJQSxJQUFFLEVBQU4sRUFBVSxJQUFJdEYsSUFBRSxTQUFGQSxDQUFFLEdBQVU7QUFBQzVVLFVBQUUsQ0FBQyxDQUFELEtBQUtrYSxFQUFFZ0csT0FBUCxHQUFlLENBQWYsR0FBaUJ0akIsRUFBRWtZLEdBQUYsRUFBbkIsRUFBMkI5ZSxJQUFFLElBQTdCLEVBQWtDbWtCLElBQUVFLEVBQUUzYSxLQUFGLENBQVEwVixDQUFSLEVBQVVrRixDQUFWLENBQXBDLEVBQWlEdGtCLE1BQUlvZixJQUFFa0YsSUFBRSxJQUFSLENBQWpEO0FBQStELEtBQWhGO0FBQUEsUUFBaUY1RCxJQUFFLGFBQVU7QUFBQyxVQUFJQSxJQUFFOVosRUFBRWtZLEdBQUYsRUFBTixDQUFjOVUsS0FBRyxDQUFDLENBQUQsS0FBS2thLEVBQUVnRyxPQUFWLEtBQW9CbGdCLElBQUUwVyxDQUF0QixFQUF5QixJQUFJc0QsSUFBRW5PLEtBQUc2SyxJQUFFMVcsQ0FBTCxDQUFOLENBQWMsT0FBT29WLElBQUUsSUFBRixFQUFPa0YsSUFBRTFhLFNBQVQsRUFBbUJvYSxLQUFHLENBQUgsSUFBTW5PLElBQUVtTyxDQUFSLElBQVdoa0IsTUFBSW1xQixhQUFhbnFCLENBQWIsR0FBZ0JBLElBQUUsSUFBdEIsR0FBNEJnSyxJQUFFMFcsQ0FBOUIsRUFBZ0N5RCxJQUFFRSxFQUFFM2EsS0FBRixDQUFRMFYsQ0FBUixFQUFVa0YsQ0FBVixDQUFsQyxFQUErQ3RrQixNQUFJb2YsSUFBRWtGLElBQUUsSUFBUixDQUExRCxJQUF5RXRrQixLQUFHLENBQUMsQ0FBRCxLQUFLa2tCLEVBQUVrRyxRQUFWLEtBQXFCcHFCLElBQUVzVSxXQUFXc0ssQ0FBWCxFQUFhb0YsQ0FBYixDQUF2QixDQUE1RixFQUFvSUcsQ0FBM0k7QUFBNkksS0FBaFMsQ0FBaVMsT0FBT3pELEVBQUUySixNQUFGLEdBQVMsWUFBVTtBQUFDRixtQkFBYW5xQixDQUFiLEdBQWdCZ0ssSUFBRSxDQUFsQixFQUFvQmhLLElBQUVvZixJQUFFa0YsSUFBRSxJQUExQjtBQUErQixLQUFuRCxFQUFvRDVELENBQTNEO0FBQTZELEdBQXR2QyxFQUF1dkM5WixFQUFFMGpCLFFBQUYsR0FBVyxVQUFTakcsQ0FBVCxFQUFXeE8sQ0FBWCxFQUFhcU8sQ0FBYixFQUFlO0FBQUMsUUFBSWxrQixDQUFKO0FBQUEsUUFBTW9mLENBQU47QUFBQSxRQUFRa0YsSUFBRSxTQUFGQSxDQUFFLENBQVM1RCxDQUFULEVBQVdzRCxDQUFYLEVBQWE7QUFBQ2hrQixVQUFFLElBQUYsRUFBT2drQixNQUFJNUUsSUFBRWlGLEVBQUUzYSxLQUFGLENBQVFnWCxDQUFSLEVBQVVzRCxDQUFWLENBQU4sQ0FBUDtBQUEyQixLQUFuRDtBQUFBLFFBQW9EdEQsSUFBRTBFLEVBQUUsVUFBUzFFLENBQVQsRUFBVztBQUFDLFVBQUcxZ0IsS0FBR21xQixhQUFhbnFCLENBQWIsQ0FBSCxFQUFtQmtrQixDQUF0QixFQUF3QjtBQUFDLFlBQUlGLElBQUUsQ0FBQ2hrQixDQUFQLENBQVNBLElBQUVzVSxXQUFXZ1EsQ0FBWCxFQUFhek8sQ0FBYixDQUFGLEVBQWtCbU8sTUFBSTVFLElBQUVpRixFQUFFM2EsS0FBRixDQUFRLElBQVIsRUFBYWdYLENBQWIsQ0FBTixDQUFsQjtBQUF5QyxPQUEzRSxNQUFnRjFnQixJQUFFNEcsRUFBRW1qQixLQUFGLENBQVF6RixDQUFSLEVBQVV6TyxDQUFWLEVBQVksSUFBWixFQUFpQjZLLENBQWpCLENBQUYsQ0FBc0IsT0FBT3RCLENBQVA7QUFBUyxLQUE3SCxDQUF0RCxDQUFxTCxPQUFPc0IsRUFBRTJKLE1BQUYsR0FBUyxZQUFVO0FBQUNGLG1CQUFhbnFCLENBQWIsR0FBZ0JBLElBQUUsSUFBbEI7QUFBdUIsS0FBM0MsRUFBNEMwZ0IsQ0FBbkQ7QUFBcUQsR0FBNS9DLEVBQTYvQzlaLEVBQUUyakIsSUFBRixHQUFPLFVBQVM3SixDQUFULEVBQVdzRCxDQUFYLEVBQWE7QUFBQyxXQUFPcGQsRUFBRThpQixPQUFGLENBQVUxRixDQUFWLEVBQVl0RCxDQUFaLENBQVA7QUFBc0IsR0FBeGlELEVBQXlpRDlaLEVBQUUwZixNQUFGLEdBQVMsVUFBUzVGLENBQVQsRUFBVztBQUFDLFdBQU8sWUFBVTtBQUFDLGFBQU0sQ0FBQ0EsRUFBRWhYLEtBQUYsQ0FBUSxJQUFSLEVBQWFFLFNBQWIsQ0FBUDtBQUErQixLQUFqRDtBQUFrRCxHQUFobkQsRUFBaW5EaEQsRUFBRTRqQixPQUFGLEdBQVUsWUFBVTtBQUFDLFFBQUluRyxJQUFFemEsU0FBTjtBQUFBLFFBQWdCaU0sSUFBRXdPLEVBQUVwa0IsTUFBRixHQUFTLENBQTNCLENBQTZCLE9BQU8sWUFBVTtBQUFDLFdBQUksSUFBSXlnQixJQUFFN0ssQ0FBTixFQUFRbU8sSUFBRUssRUFBRXhPLENBQUYsRUFBS25NLEtBQUwsQ0FBVyxJQUFYLEVBQWdCRSxTQUFoQixDQUFkLEVBQXlDOFcsR0FBekM7QUFBOENzRCxZQUFFSyxFQUFFM0QsQ0FBRixFQUFLL1csSUFBTCxDQUFVLElBQVYsRUFBZXFhLENBQWYsQ0FBRjtBQUE5QyxPQUFrRSxPQUFPQSxDQUFQO0FBQVMsS0FBN0Y7QUFBOEYsR0FBandELEVBQWt3RHBkLEVBQUVpYyxLQUFGLEdBQVEsVUFBU25DLENBQVQsRUFBV3NELENBQVgsRUFBYTtBQUFDLFdBQU8sWUFBVTtBQUFDLFVBQUcsRUFBRXRELENBQUYsR0FBSSxDQUFQLEVBQVMsT0FBT3NELEVBQUV0YSxLQUFGLENBQVEsSUFBUixFQUFhRSxTQUFiLENBQVA7QUFBK0IsS0FBMUQ7QUFBMkQsR0FBbjFELEVBQW8xRGhELEVBQUU4YixNQUFGLEdBQVMsVUFBU2hDLENBQVQsRUFBV3NELENBQVgsRUFBYTtBQUFDLFFBQUlLLENBQUosQ0FBTSxPQUFPLFlBQVU7QUFBQyxhQUFPLElBQUUsRUFBRTNELENBQUosS0FBUTJELElBQUVMLEVBQUV0YSxLQUFGLENBQVEsSUFBUixFQUFhRSxTQUFiLENBQVYsR0FBbUM4VyxLQUFHLENBQUgsS0FBT3NELElBQUUsSUFBVCxDQUFuQyxFQUFrREssQ0FBekQ7QUFBMkQsS0FBN0U7QUFBOEUsR0FBLzdELEVBQWc4RHpkLEVBQUV5RCxJQUFGLEdBQU96RCxFQUFFOGlCLE9BQUYsQ0FBVTlpQixFQUFFOGIsTUFBWixFQUFtQixDQUFuQixDQUF2OEQsRUFBNjlEOWIsRUFBRTZqQixhQUFGLEdBQWdCckYsQ0FBNytELENBQSsrRCxJQUFJc0YsSUFBRSxDQUFDLEVBQUNua0IsVUFBUyxJQUFWLEdBQWdCb2tCLG9CQUFoQixDQUFxQyxVQUFyQyxDQUFQO0FBQUEsTUFBd0RDLElBQUUsQ0FBQyxTQUFELEVBQVcsZUFBWCxFQUEyQixVQUEzQixFQUFzQyxzQkFBdEMsRUFBNkQsZ0JBQTdELEVBQThFLGdCQUE5RSxDQUExRDtBQUFBLE1BQTBKQyxJQUFFLFNBQUZBLENBQUUsQ0FBU25LLENBQVQsRUFBV3NELENBQVgsRUFBYTtBQUFDLFFBQUlLLElBQUV1RyxFQUFFM3FCLE1BQVI7QUFBQSxRQUFlNFYsSUFBRTZLLEVBQUV6TSxXQUFuQjtBQUFBLFFBQStCaVEsSUFBRXRkLEVBQUVvZSxVQUFGLENBQWFuUCxDQUFiLEtBQWlCQSxFQUFFNUssU0FBbkIsSUFBOEJtVSxDQUEvRDtBQUFBLFFBQWlFcGYsSUFBRSxhQUFuRSxDQUFpRixLQUFJa0ssRUFBRXdXLENBQUYsRUFBSTFnQixDQUFKLEtBQVEsQ0FBQzRHLEVBQUUrVCxRQUFGLENBQVdxSixDQUFYLEVBQWFoa0IsQ0FBYixDQUFULElBQTBCZ2tCLEVBQUV0YyxJQUFGLENBQU8xSCxDQUFQLENBQTlCLEVBQXdDcWtCLEdBQXhDO0FBQTZDLE9BQUNya0IsSUFBRTRxQixFQUFFdkcsQ0FBRixDQUFILEtBQVczRCxDQUFYLElBQWNBLEVBQUUxZ0IsQ0FBRixNQUFPa2tCLEVBQUVsa0IsQ0FBRixDQUFyQixJQUEyQixDQUFDNEcsRUFBRStULFFBQUYsQ0FBV3FKLENBQVgsRUFBYWhrQixDQUFiLENBQTVCLElBQTZDZ2tCLEVBQUV0YyxJQUFGLENBQU8xSCxDQUFQLENBQTdDO0FBQTdDO0FBQW9HLEdBQS9WLENBQWdXNEcsRUFBRVosSUFBRixHQUFPLFVBQVMwYSxDQUFULEVBQVc7QUFBQyxRQUFHLENBQUM5WixFQUFFcWUsUUFBRixDQUFXdkUsQ0FBWCxDQUFKLEVBQWtCLE9BQU0sRUFBTixDQUFTLElBQUc0RCxDQUFILEVBQUssT0FBT0EsRUFBRTVELENBQUYsQ0FBUCxDQUFZLElBQUlzRCxJQUFFLEVBQU4sQ0FBUyxLQUFJLElBQUlLLENBQVIsSUFBYTNELENBQWI7QUFBZXhXLFFBQUV3VyxDQUFGLEVBQUkyRCxDQUFKLEtBQVFMLEVBQUV0YyxJQUFGLENBQU8yYyxDQUFQLENBQVI7QUFBZixLQUFpQyxPQUFPcUcsS0FBR0csRUFBRW5LLENBQUYsRUFBSXNELENBQUosQ0FBSCxFQUFVQSxDQUFqQjtBQUFtQixHQUE1SCxFQUE2SHBkLEVBQUVra0IsT0FBRixHQUFVLFVBQVNwSyxDQUFULEVBQVc7QUFBQyxRQUFHLENBQUM5WixFQUFFcWUsUUFBRixDQUFXdkUsQ0FBWCxDQUFKLEVBQWtCLE9BQU0sRUFBTixDQUFTLElBQUlzRCxJQUFFLEVBQU4sQ0FBUyxLQUFJLElBQUlLLENBQVIsSUFBYTNELENBQWI7QUFBZXNELFFBQUV0YyxJQUFGLENBQU8yYyxDQUFQO0FBQWYsS0FBeUIsT0FBT3FHLEtBQUdHLEVBQUVuSyxDQUFGLEVBQUlzRCxDQUFKLENBQUgsRUFBVUEsQ0FBakI7QUFBbUIsR0FBbk8sRUFBb09wZCxFQUFFOFAsTUFBRixHQUFTLFVBQVNnSyxDQUFULEVBQVc7QUFBQyxTQUFJLElBQUlzRCxJQUFFcGQsRUFBRVosSUFBRixDQUFPMGEsQ0FBUCxDQUFOLEVBQWdCMkQsSUFBRUwsRUFBRS9qQixNQUFwQixFQUEyQjRWLElBQUU1TyxNQUFNb2QsQ0FBTixDQUE3QixFQUFzQ0gsSUFBRSxDQUE1QyxFQUE4Q0EsSUFBRUcsQ0FBaEQsRUFBa0RILEdBQWxEO0FBQXNEck8sUUFBRXFPLENBQUYsSUFBS3hELEVBQUVzRCxFQUFFRSxDQUFGLENBQUYsQ0FBTDtBQUF0RCxLQUFtRSxPQUFPck8sQ0FBUDtBQUFTLEdBQXJVLEVBQXNValAsRUFBRW1rQixTQUFGLEdBQVksVUFBU3JLLENBQVQsRUFBV3NELENBQVgsRUFBYUssQ0FBYixFQUFlO0FBQUNMLFFBQUVhLEVBQUViLENBQUYsRUFBSUssQ0FBSixDQUFGLENBQVMsS0FBSSxJQUFJeE8sSUFBRWpQLEVBQUVaLElBQUYsQ0FBTzBhLENBQVAsQ0FBTixFQUFnQndELElBQUVyTyxFQUFFNVYsTUFBcEIsRUFBMkJELElBQUUsRUFBN0IsRUFBZ0NvZixJQUFFLENBQXRDLEVBQXdDQSxJQUFFOEUsQ0FBMUMsRUFBNEM5RSxHQUE1QyxFQUFnRDtBQUFDLFVBQUlrRixJQUFFek8sRUFBRXVKLENBQUYsQ0FBTixDQUFXcGYsRUFBRXNrQixDQUFGLElBQUtOLEVBQUV0RCxFQUFFNEQsQ0FBRixDQUFGLEVBQU9BLENBQVAsRUFBUzVELENBQVQsQ0FBTDtBQUFpQixZQUFPMWdCLENBQVA7QUFBUyxHQUFqYyxFQUFrYzRHLEVBQUVva0IsS0FBRixHQUFRLFVBQVN0SyxDQUFULEVBQVc7QUFBQyxTQUFJLElBQUlzRCxJQUFFcGQsRUFBRVosSUFBRixDQUFPMGEsQ0FBUCxDQUFOLEVBQWdCMkQsSUFBRUwsRUFBRS9qQixNQUFwQixFQUEyQjRWLElBQUU1TyxNQUFNb2QsQ0FBTixDQUE3QixFQUFzQ0gsSUFBRSxDQUE1QyxFQUE4Q0EsSUFBRUcsQ0FBaEQsRUFBa0RILEdBQWxEO0FBQXNEck8sUUFBRXFPLENBQUYsSUFBSyxDQUFDRixFQUFFRSxDQUFGLENBQUQsRUFBTXhELEVBQUVzRCxFQUFFRSxDQUFGLENBQUYsQ0FBTixDQUFMO0FBQXRELEtBQTBFLE9BQU9yTyxDQUFQO0FBQVMsR0FBemlCLEVBQTBpQmpQLEVBQUVxa0IsTUFBRixHQUFTLFVBQVN2SyxDQUFULEVBQVc7QUFBQyxTQUFJLElBQUlzRCxJQUFFLEVBQU4sRUFBU0ssSUFBRXpkLEVBQUVaLElBQUYsQ0FBTzBhLENBQVAsQ0FBWCxFQUFxQjdLLElBQUUsQ0FBdkIsRUFBeUJxTyxJQUFFRyxFQUFFcGtCLE1BQWpDLEVBQXdDNFYsSUFBRXFPLENBQTFDLEVBQTRDck8sR0FBNUM7QUFBZ0RtTyxRQUFFdEQsRUFBRTJELEVBQUV4TyxDQUFGLENBQUYsQ0FBRixJQUFXd08sRUFBRXhPLENBQUYsQ0FBWDtBQUFoRCxLQUFnRSxPQUFPbU8sQ0FBUDtBQUFTLEdBQXhvQixFQUF5b0JwZCxFQUFFc2tCLFNBQUYsR0FBWXRrQixFQUFFdWtCLE9BQUYsR0FBVSxVQUFTekssQ0FBVCxFQUFXO0FBQUMsUUFBSXNELElBQUUsRUFBTixDQUFTLEtBQUksSUFBSUssQ0FBUixJQUFhM0QsQ0FBYjtBQUFlOVosUUFBRW9lLFVBQUYsQ0FBYXRFLEVBQUUyRCxDQUFGLENBQWIsS0FBb0JMLEVBQUV0YyxJQUFGLENBQU8yYyxDQUFQLENBQXBCO0FBQWYsS0FBNkMsT0FBT0wsRUFBRXJjLElBQUYsRUFBUDtBQUFnQixHQUFqdkIsQ0FBa3ZCLElBQUl5akIsSUFBRSxTQUFGQSxDQUFFLENBQVNqSCxDQUFULEVBQVduYSxDQUFYLEVBQWE7QUFBQyxXQUFPLFVBQVMwVyxDQUFULEVBQVc7QUFBQyxVQUFJc0QsSUFBRXBhLFVBQVUzSixNQUFoQixDQUF1QixJQUFHK0osTUFBSTBXLElBQUUzYSxPQUFPMmEsQ0FBUCxDQUFOLEdBQWlCc0QsSUFBRSxDQUFGLElBQUssUUFBTXRELENBQS9CLEVBQWlDLE9BQU9BLENBQVAsQ0FBUyxLQUFJLElBQUkyRCxJQUFFLENBQVYsRUFBWUEsSUFBRUwsQ0FBZCxFQUFnQkssR0FBaEI7QUFBb0IsYUFBSSxJQUFJeE8sSUFBRWpNLFVBQVV5YSxDQUFWLENBQU4sRUFBbUJILElBQUVDLEVBQUV0TyxDQUFGLENBQXJCLEVBQTBCN1YsSUFBRWtrQixFQUFFamtCLE1BQTlCLEVBQXFDbWYsSUFBRSxDQUEzQyxFQUE2Q0EsSUFBRXBmLENBQS9DLEVBQWlEb2YsR0FBakQsRUFBcUQ7QUFBQyxjQUFJa0YsSUFBRUosRUFBRTlFLENBQUYsQ0FBTixDQUFXcFYsS0FBRyxLQUFLLENBQUwsS0FBUzBXLEVBQUU0RCxDQUFGLENBQVosS0FBbUI1RCxFQUFFNEQsQ0FBRixJQUFLek8sRUFBRXlPLENBQUYsQ0FBeEI7QUFBOEI7QUFBbkgsT0FBbUgsT0FBTzVELENBQVA7QUFBUyxLQUFoTjtBQUFpTixHQUFyTyxDQUFzTzlaLEVBQUV5a0IsTUFBRixHQUFTRCxFQUFFeGtCLEVBQUVra0IsT0FBSixDQUFULEVBQXNCbGtCLEVBQUUwa0IsU0FBRixHQUFZMWtCLEVBQUUya0IsTUFBRixHQUFTSCxFQUFFeGtCLEVBQUVaLElBQUosQ0FBM0MsRUFBcURZLEVBQUV3ZixPQUFGLEdBQVUsVUFBUzFGLENBQVQsRUFBV3NELENBQVgsRUFBYUssQ0FBYixFQUFlO0FBQUNMLFFBQUVhLEVBQUViLENBQUYsRUFBSUssQ0FBSixDQUFGLENBQVMsS0FBSSxJQUFJeE8sQ0FBSixFQUFNcU8sSUFBRXRkLEVBQUVaLElBQUYsQ0FBTzBhLENBQVAsQ0FBUixFQUFrQjFnQixJQUFFLENBQXBCLEVBQXNCb2YsSUFBRThFLEVBQUVqa0IsTUFBOUIsRUFBcUNELElBQUVvZixDQUF2QyxFQUF5Q3BmLEdBQXpDO0FBQTZDLFVBQUdna0IsRUFBRXRELEVBQUU3SyxJQUFFcU8sRUFBRWxrQixDQUFGLENBQUosQ0FBRixFQUFZNlYsQ0FBWixFQUFjNkssQ0FBZCxDQUFILEVBQW9CLE9BQU83SyxDQUFQO0FBQWpFO0FBQTBFLEdBQWxLLENBQW1LLElBQUkyVixDQUFKO0FBQUEsTUFBTUMsQ0FBTjtBQUFBLE1BQVFDLElBQUUsU0FBRkEsQ0FBRSxDQUFTaEwsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWU7QUFBQyxXQUFPTCxLQUFLSyxDQUFaO0FBQWMsR0FBeEMsQ0FBeUN6ZCxFQUFFa0IsSUFBRixHQUFPc2QsRUFBRSxVQUFTMUUsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhO0FBQUMsUUFBSUssSUFBRSxFQUFOO0FBQUEsUUFBU3hPLElBQUVtTyxFQUFFLENBQUYsQ0FBWCxDQUFnQixJQUFHLFFBQU10RCxDQUFULEVBQVcsT0FBTzJELENBQVAsQ0FBU3pkLEVBQUVvZSxVQUFGLENBQWFuUCxDQUFiLEtBQWlCLElBQUVtTyxFQUFFL2pCLE1BQUosS0FBYTRWLElBQUUrTyxFQUFFL08sQ0FBRixFQUFJbU8sRUFBRSxDQUFGLENBQUosQ0FBZixHQUEwQkEsSUFBRXBkLEVBQUVra0IsT0FBRixDQUFVcEssQ0FBVixDQUE3QyxLQUE0RDdLLElBQUU2VixDQUFGLEVBQUkxSCxJQUFFc0UsRUFBRXRFLENBQUYsRUFBSSxDQUFDLENBQUwsRUFBTyxDQUFDLENBQVIsQ0FBTixFQUFpQnRELElBQUUzYSxPQUFPMmEsQ0FBUCxDQUEvRSxFQUEwRixLQUFJLElBQUl3RCxJQUFFLENBQU4sRUFBUWxrQixJQUFFZ2tCLEVBQUUvakIsTUFBaEIsRUFBdUJpa0IsSUFBRWxrQixDQUF6QixFQUEyQmtrQixHQUEzQixFQUErQjtBQUFDLFVBQUk5RSxJQUFFNEUsRUFBRUUsQ0FBRixDQUFOO0FBQUEsVUFBV0ksSUFBRTVELEVBQUV0QixDQUFGLENBQWIsQ0FBa0J2SixFQUFFeU8sQ0FBRixFQUFJbEYsQ0FBSixFQUFNc0IsQ0FBTixNQUFXMkQsRUFBRWpGLENBQUYsSUFBS2tGLENBQWhCO0FBQW1CLFlBQU9ELENBQVA7QUFBUyxHQUE1TixDQUFQLEVBQXFPemQsRUFBRStrQixJQUFGLEdBQU92RyxFQUFFLFVBQVMxRSxDQUFULEVBQVcyRCxDQUFYLEVBQWE7QUFBQyxRQUFJTCxDQUFKO0FBQUEsUUFBTW5PLElBQUV3TyxFQUFFLENBQUYsQ0FBUixDQUFhLE9BQU96ZCxFQUFFb2UsVUFBRixDQUFhblAsQ0FBYixLQUFpQkEsSUFBRWpQLEVBQUUwZixNQUFGLENBQVN6USxDQUFULENBQUYsRUFBYyxJQUFFd08sRUFBRXBrQixNQUFKLEtBQWErakIsSUFBRUssRUFBRSxDQUFGLENBQWYsQ0FBL0IsS0FBc0RBLElBQUV6ZCxFQUFFVyxHQUFGLENBQU0rZ0IsRUFBRWpFLENBQUYsRUFBSSxDQUFDLENBQUwsRUFBTyxDQUFDLENBQVIsQ0FBTixFQUFpQnBILE1BQWpCLENBQUYsRUFBMkJwSCxJQUFFLFdBQVM2SyxDQUFULEVBQVdzRCxDQUFYLEVBQWE7QUFBQyxhQUFNLENBQUNwZCxFQUFFK1QsUUFBRixDQUFXMEosQ0FBWCxFQUFhTCxDQUFiLENBQVA7QUFBdUIsS0FBeEgsR0FBMEhwZCxFQUFFa0IsSUFBRixDQUFPNFksQ0FBUCxFQUFTN0ssQ0FBVCxFQUFXbU8sQ0FBWCxDQUFqSTtBQUErSSxHQUE1SyxDQUE1TyxFQUEwWnBkLEVBQUVnbEIsUUFBRixHQUFXUixFQUFFeGtCLEVBQUVra0IsT0FBSixFQUFZLENBQUMsQ0FBYixDQUFyYSxFQUFxYmxrQixFQUFFcVEsTUFBRixHQUFTLFVBQVN5SixDQUFULEVBQVdzRCxDQUFYLEVBQWE7QUFBQyxRQUFJSyxJQUFFaUIsRUFBRTVFLENBQUYsQ0FBTixDQUFXLE9BQU9zRCxLQUFHcGQsRUFBRTBrQixTQUFGLENBQVlqSCxDQUFaLEVBQWNMLENBQWQsQ0FBSCxFQUFvQkssQ0FBM0I7QUFBNkIsR0FBcGYsRUFBcWZ6ZCxFQUFFcWdCLEtBQUYsR0FBUSxVQUFTdkcsQ0FBVCxFQUFXO0FBQUMsV0FBTzlaLEVBQUVxZSxRQUFGLENBQVd2RSxDQUFYLElBQWM5WixFQUFFTSxPQUFGLENBQVV3WixDQUFWLElBQWFBLEVBQUV0YSxLQUFGLEVBQWIsR0FBdUJRLEVBQUV5a0IsTUFBRixDQUFTLEVBQVQsRUFBWTNLLENBQVosQ0FBckMsR0FBb0RBLENBQTNEO0FBQTZELEdBQXRrQixFQUF1a0I5WixFQUFFaWxCLEdBQUYsR0FBTSxVQUFTbkwsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhO0FBQUMsV0FBT0EsRUFBRXRELENBQUYsR0FBS0EsQ0FBWjtBQUFjLEdBQXptQixFQUEwbUI5WixFQUFFa2xCLE9BQUYsR0FBVSxVQUFTcEwsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhO0FBQUMsUUFBSUssSUFBRXpkLEVBQUVaLElBQUYsQ0FBT2dlLENBQVAsQ0FBTjtBQUFBLFFBQWdCbk8sSUFBRXdPLEVBQUVwa0IsTUFBcEIsQ0FBMkIsSUFBRyxRQUFNeWdCLENBQVQsRUFBVyxPQUFNLENBQUM3SyxDQUFQLENBQVMsS0FBSSxJQUFJcU8sSUFBRW5lLE9BQU8yYSxDQUFQLENBQU4sRUFBZ0IxZ0IsSUFBRSxDQUF0QixFQUF3QkEsSUFBRTZWLENBQTFCLEVBQTRCN1YsR0FBNUIsRUFBZ0M7QUFBQyxVQUFJb2YsSUFBRWlGLEVBQUVya0IsQ0FBRixDQUFOLENBQVcsSUFBR2drQixFQUFFNUUsQ0FBRixNQUFPOEUsRUFBRTlFLENBQUYsQ0FBUCxJQUFhLEVBQUVBLEtBQUs4RSxDQUFQLENBQWhCLEVBQTBCLE9BQU0sQ0FBQyxDQUFQO0FBQVMsWUFBTSxDQUFDLENBQVA7QUFBUyxHQUF6d0IsRUFBMHdCc0gsSUFBRSxXQUFTOUssQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWV4TyxDQUFmLEVBQWlCO0FBQUMsUUFBRzZLLE1BQUlzRCxDQUFQLEVBQVMsT0FBTyxNQUFJdEQsQ0FBSixJQUFPLElBQUVBLENBQUYsSUFBSyxJQUFFc0QsQ0FBckIsQ0FBdUIsSUFBRyxRQUFNdEQsQ0FBTixJQUFTLFFBQU1zRCxDQUFsQixFQUFvQixPQUFNLENBQUMsQ0FBUCxDQUFTLElBQUd0RCxLQUFHQSxDQUFOLEVBQVEsT0FBT3NELEtBQUdBLENBQVYsQ0FBWSxJQUFJRSxXQUFTeEQsQ0FBVCx5Q0FBU0EsQ0FBVCxDQUFKLENBQWUsT0FBTSxDQUFDLGVBQWF3RCxDQUFiLElBQWdCLGFBQVdBLENBQTNCLElBQThCLG9CQUFpQkYsQ0FBakIseUNBQWlCQSxDQUFqQixFQUEvQixLQUFvRHlILEVBQUUvSyxDQUFGLEVBQUlzRCxDQUFKLEVBQU1LLENBQU4sRUFBUXhPLENBQVIsQ0FBMUQ7QUFBcUUsR0FBbjhCLEVBQW84QjRWLElBQUUsV0FBUy9LLENBQVQsRUFBV3NELENBQVgsRUFBYUssQ0FBYixFQUFleE8sQ0FBZixFQUFpQjtBQUFDNkssaUJBQWE5WixDQUFiLEtBQWlCOFosSUFBRUEsRUFBRTZELFFBQXJCLEdBQStCUCxhQUFhcGQsQ0FBYixLQUFpQm9kLElBQUVBLEVBQUVPLFFBQXJCLENBQS9CLENBQThELElBQUlMLElBQUUvRyxFQUFFeFQsSUFBRixDQUFPK1csQ0FBUCxDQUFOLENBQWdCLElBQUd3RCxNQUFJL0csRUFBRXhULElBQUYsQ0FBT3FhLENBQVAsQ0FBUCxFQUFpQixPQUFNLENBQUMsQ0FBUCxDQUFTLFFBQU9FLENBQVAsR0FBVSxLQUFJLGlCQUFKLENBQXNCLEtBQUksaUJBQUo7QUFBc0IsZUFBTSxLQUFHeEQsQ0FBSCxJQUFNLEtBQUdzRCxDQUFmLENBQWlCLEtBQUksaUJBQUo7QUFBc0IsZUFBTSxDQUFDdEQsQ0FBRCxJQUFJLENBQUNBLENBQUwsR0FBTyxDQUFDc0QsQ0FBRCxJQUFJLENBQUNBLENBQVosR0FBYyxLQUFHLENBQUN0RCxDQUFKLEdBQU0sSUFBRSxDQUFDQSxDQUFILElBQU0sSUFBRXNELENBQWQsR0FBZ0IsQ0FBQ3RELENBQUQsSUFBSSxDQUFDc0QsQ0FBekMsQ0FBMkMsS0FBSSxlQUFKLENBQW9CLEtBQUksa0JBQUo7QUFBdUIsZUFBTSxDQUFDdEQsQ0FBRCxJQUFJLENBQUNzRCxDQUFYLENBQWEsS0FBSSxpQkFBSjtBQUFzQixlQUFPbEUsRUFBRWlNLE9BQUYsQ0FBVXBpQixJQUFWLENBQWUrVyxDQUFmLE1BQW9CWixFQUFFaU0sT0FBRixDQUFVcGlCLElBQVYsQ0FBZXFhLENBQWYsQ0FBM0IsQ0FBdE4sQ0FBbVEsSUFBSWhrQixJQUFFLHFCQUFtQmtrQixDQUF6QixDQUEyQixJQUFHLENBQUNsa0IsQ0FBSixFQUFNO0FBQUMsVUFBRyxvQkFBaUIwZ0IsQ0FBakIseUNBQWlCQSxDQUFqQixNQUFvQixvQkFBaUJzRCxDQUFqQix5Q0FBaUJBLENBQWpCLEVBQXZCLEVBQTBDLE9BQU0sQ0FBQyxDQUFQLENBQVMsSUFBSTVFLElBQUVzQixFQUFFek0sV0FBUjtBQUFBLFVBQW9CcVEsSUFBRU4sRUFBRS9QLFdBQXhCLENBQW9DLElBQUdtTCxNQUFJa0YsQ0FBSixJQUFPLEVBQUUxZCxFQUFFb2UsVUFBRixDQUFhNUYsQ0FBYixLQUFpQkEsYUFBYUEsQ0FBOUIsSUFBaUN4WSxFQUFFb2UsVUFBRixDQUFhVixDQUFiLENBQWpDLElBQWtEQSxhQUFhQSxDQUFqRSxDQUFQLElBQTRFLGlCQUFnQjVELENBQTVGLElBQStGLGlCQUFnQnNELENBQWxILEVBQW9ILE9BQU0sQ0FBQyxDQUFQO0FBQVMsU0FBRW5PLEtBQUcsRUFBTCxDQUFRLEtBQUksSUFBSXNPLElBQUUsQ0FBQ0UsSUFBRUEsS0FBRyxFQUFOLEVBQVVwa0IsTUFBcEIsRUFBMkJra0IsR0FBM0I7QUFBZ0MsVUFBR0UsRUFBRUYsQ0FBRixNQUFPekQsQ0FBVixFQUFZLE9BQU83SyxFQUFFc08sQ0FBRixNQUFPSCxDQUFkO0FBQTVDLEtBQTRELElBQUdLLEVBQUUzYyxJQUFGLENBQU9nWixDQUFQLEdBQVU3SyxFQUFFbk8sSUFBRixDQUFPc2MsQ0FBUCxDQUFWLEVBQW9CaGtCLENBQXZCLEVBQXlCO0FBQUMsVUFBRyxDQUFDbWtCLElBQUV6RCxFQUFFemdCLE1BQUwsTUFBZStqQixFQUFFL2pCLE1BQXBCLEVBQTJCLE9BQU0sQ0FBQyxDQUFQLENBQVMsT0FBS2trQixHQUFMO0FBQVUsWUFBRyxDQUFDcUgsRUFBRTlLLEVBQUV5RCxDQUFGLENBQUYsRUFBT0gsRUFBRUcsQ0FBRixDQUFQLEVBQVlFLENBQVosRUFBY3hPLENBQWQsQ0FBSixFQUFxQixPQUFNLENBQUMsQ0FBUDtBQUEvQjtBQUF3QyxLQUF0RyxNQUEwRztBQUFDLFVBQUk3TCxDQUFKO0FBQUEsVUFBTTRVLElBQUVoWSxFQUFFWixJQUFGLENBQU8wYSxDQUFQLENBQVIsQ0FBa0IsSUFBR3lELElBQUV2RixFQUFFM2UsTUFBSixFQUFXMkcsRUFBRVosSUFBRixDQUFPZ2UsQ0FBUCxFQUFVL2pCLE1BQVYsS0FBbUJra0IsQ0FBakMsRUFBbUMsT0FBTSxDQUFDLENBQVAsQ0FBUyxPQUFLQSxHQUFMO0FBQVUsWUFBR25hLElBQUU0VSxFQUFFdUYsQ0FBRixDQUFGLEVBQU8sQ0FBQ2phLEVBQUU4WixDQUFGLEVBQUloYSxDQUFKLENBQUQsSUFBUyxDQUFDd2hCLEVBQUU5SyxFQUFFMVcsQ0FBRixDQUFGLEVBQU9nYSxFQUFFaGEsQ0FBRixDQUFQLEVBQVlxYSxDQUFaLEVBQWN4TyxDQUFkLENBQXBCLEVBQXFDLE9BQU0sQ0FBQyxDQUFQO0FBQS9DO0FBQXdELFlBQU93TyxFQUFFMkgsR0FBRixJQUFRblcsRUFBRW1XLEdBQUYsRUFBUixFQUFnQixDQUFDLENBQXhCO0FBQTBCLEdBQXgzRCxFQUF5M0RwbEIsRUFBRXFsQixPQUFGLEdBQVUsVUFBU3ZMLENBQVQsRUFBV3NELENBQVgsRUFBYTtBQUFDLFdBQU93SCxFQUFFOUssQ0FBRixFQUFJc0QsQ0FBSixDQUFQO0FBQWMsR0FBLzVELEVBQWc2RHBkLEVBQUVzbEIsT0FBRixHQUFVLFVBQVN4TCxDQUFULEVBQVc7QUFBQyxXQUFPLFFBQU1BLENBQU4sS0FBVWhhLEVBQUVnYSxDQUFGLE1BQU85WixFQUFFTSxPQUFGLENBQVV3WixDQUFWLEtBQWM5WixFQUFFNmdCLFFBQUYsQ0FBVy9HLENBQVgsQ0FBZCxJQUE2QjlaLEVBQUUyaEIsV0FBRixDQUFjN0gsQ0FBZCxDQUFwQyxJQUFzRCxNQUFJQSxFQUFFemdCLE1BQTVELEdBQW1FLE1BQUkyRyxFQUFFWixJQUFGLENBQU8wYSxDQUFQLEVBQVV6Z0IsTUFBM0YsQ0FBUDtBQUEwRyxHQUFoaUUsRUFBaWlFMkcsRUFBRXdTLFNBQUYsR0FBWSxVQUFTc0gsQ0FBVCxFQUFXO0FBQUMsV0FBTSxFQUFFLENBQUNBLENBQUQsSUFBSSxNQUFJQSxFQUFFN0ksUUFBWixDQUFOO0FBQTRCLEdBQXJsRSxFQUFzbEVqUixFQUFFTSxPQUFGLEdBQVVtZCxLQUFHLFVBQVMzRCxDQUFULEVBQVc7QUFBQyxXQUFNLHFCQUFtQnZELEVBQUV4VCxJQUFGLENBQU8rVyxDQUFQLENBQXpCO0FBQW1DLEdBQWxwRSxFQUFtcEU5WixFQUFFcWUsUUFBRixHQUFXLFVBQVN2RSxDQUFULEVBQVc7QUFBQyxRQUFJc0QsV0FBU3RELENBQVQseUNBQVNBLENBQVQsQ0FBSixDQUFlLE9BQU0sZUFBYXNELENBQWIsSUFBZ0IsYUFBV0EsQ0FBWCxJQUFjLENBQUMsQ0FBQ3RELENBQXRDO0FBQXdDLEdBQWp1RSxFQUFrdUU5WixFQUFFK2UsSUFBRixDQUFPLENBQUMsV0FBRCxFQUFhLFVBQWIsRUFBd0IsUUFBeEIsRUFBaUMsUUFBakMsRUFBMEMsTUFBMUMsRUFBaUQsUUFBakQsRUFBMEQsT0FBMUQsRUFBa0UsUUFBbEUsRUFBMkUsS0FBM0UsRUFBaUYsU0FBakYsRUFBMkYsS0FBM0YsRUFBaUcsU0FBakcsQ0FBUCxFQUFtSCxVQUFTM0IsQ0FBVCxFQUFXO0FBQUNwZCxNQUFFLE9BQUtvZCxDQUFQLElBQVUsVUFBU3RELENBQVQsRUFBVztBQUFDLGFBQU92RCxFQUFFeFQsSUFBRixDQUFPK1csQ0FBUCxNQUFZLGFBQVdzRCxDQUFYLEdBQWEsR0FBaEM7QUFBb0MsS0FBMUQ7QUFBMkQsR0FBMUwsQ0FBbHVFLEVBQTg1RXBkLEVBQUUyaEIsV0FBRixDQUFjM2UsU0FBZCxNQUEyQmhELEVBQUUyaEIsV0FBRixHQUFjLFVBQVM3SCxDQUFULEVBQVc7QUFBQyxXQUFPeFcsRUFBRXdXLENBQUYsRUFBSSxRQUFKLENBQVA7QUFBcUIsR0FBMUUsQ0FBOTVFLENBQTArRSxJQUFJeUwsSUFBRXpMLEVBQUVyVCxRQUFGLElBQVlxVCxFQUFFclQsUUFBRixDQUFXK2UsVUFBN0IsQ0FBd0MsY0FBWSxPQUFNLEdBQWxCLElBQXVCLG9CQUFpQkMsU0FBakIseUNBQWlCQSxTQUFqQixFQUF2QixJQUFtRCxjQUFZLE9BQU9GLENBQXRFLEtBQTBFdmxCLEVBQUVvZSxVQUFGLEdBQWEsVUFBU3RFLENBQVQsRUFBVztBQUFDLFdBQU0sY0FBWSxPQUFPQSxDQUFuQixJQUFzQixDQUFDLENBQTdCO0FBQStCLEdBQWxJLEdBQW9JOVosRUFBRTBsQixRQUFGLEdBQVcsVUFBUzVMLENBQVQsRUFBVztBQUFDLFdBQU0sQ0FBQzlaLEVBQUUybEIsUUFBRixDQUFXN0wsQ0FBWCxDQUFELElBQWdCNEwsU0FBUzVMLENBQVQsQ0FBaEIsSUFBNkIsQ0FBQy9hLE1BQU1FLFdBQVc2YSxDQUFYLENBQU4sQ0FBcEM7QUFBeUQsR0FBcE4sRUFBcU45WixFQUFFakIsS0FBRixHQUFRLFVBQVMrYSxDQUFULEVBQVc7QUFBQyxXQUFPOVosRUFBRVMsUUFBRixDQUFXcVosQ0FBWCxLQUFlL2EsTUFBTSthLENBQU4sQ0FBdEI7QUFBK0IsR0FBeFEsRUFBeVE5WixFQUFFaWlCLFNBQUYsR0FBWSxVQUFTbkksQ0FBVCxFQUFXO0FBQUMsV0FBTSxDQUFDLENBQUQsS0FBS0EsQ0FBTCxJQUFRLENBQUMsQ0FBRCxLQUFLQSxDQUFiLElBQWdCLHVCQUFxQnZELEVBQUV4VCxJQUFGLENBQU8rVyxDQUFQLENBQTNDO0FBQXFELEdBQXRWLEVBQXVWOVosRUFBRTRsQixNQUFGLEdBQVMsVUFBUzlMLENBQVQsRUFBVztBQUFDLFdBQU8sU0FBT0EsQ0FBZDtBQUFnQixHQUE1WCxFQUE2WDlaLEVBQUU2bEIsV0FBRixHQUFjLFVBQVMvTCxDQUFULEVBQVc7QUFBQyxXQUFPLEtBQUssQ0FBTCxLQUFTQSxDQUFoQjtBQUFrQixHQUF6YSxFQUEwYTlaLEVBQUU4bEIsR0FBRixHQUFNLFVBQVNoTSxDQUFULEVBQVdzRCxDQUFYLEVBQWE7QUFBQyxRQUFHLENBQUNwZCxFQUFFTSxPQUFGLENBQVU4YyxDQUFWLENBQUosRUFBaUIsT0FBTzlaLEVBQUV3VyxDQUFGLEVBQUlzRCxDQUFKLENBQVAsQ0FBYyxLQUFJLElBQUlLLElBQUVMLEVBQUUvakIsTUFBUixFQUFlNFYsSUFBRSxDQUFyQixFQUF1QkEsSUFBRXdPLENBQXpCLEVBQTJCeE8sR0FBM0IsRUFBK0I7QUFBQyxVQUFJcU8sSUFBRUYsRUFBRW5PLENBQUYsQ0FBTixDQUFXLElBQUcsUUFBTTZLLENBQU4sSUFBUyxDQUFDMWdCLEVBQUUySixJQUFGLENBQU8rVyxDQUFQLEVBQVN3RCxDQUFULENBQWIsRUFBeUIsT0FBTSxDQUFDLENBQVAsQ0FBU3hELElBQUVBLEVBQUV3RCxDQUFGLENBQUY7QUFBTyxZQUFNLENBQUMsQ0FBQ0csQ0FBUjtBQUFVLEdBQTNqQixFQUE0akJ6ZCxFQUFFK2xCLFVBQUYsR0FBYSxZQUFVO0FBQUMsV0FBT2pNLEVBQUV0WixDQUFGLEdBQUk0YyxDQUFKLEVBQU0sSUFBYjtBQUFrQixHQUF0bUIsRUFBdW1CcGQsRUFBRW1lLFFBQUYsR0FBVyxVQUFTckUsQ0FBVCxFQUFXO0FBQUMsV0FBT0EsQ0FBUDtBQUFTLEdBQXZvQixFQUF3b0I5WixFQUFFZ21CLFFBQUYsR0FBVyxVQUFTbE0sQ0FBVCxFQUFXO0FBQUMsV0FBTyxZQUFVO0FBQUMsYUFBT0EsQ0FBUDtBQUFTLEtBQTNCO0FBQTRCLEdBQTNyQixFQUE0ckI5WixFQUFFNk4sSUFBRixHQUFPLFlBQVUsQ0FBRSxDQUEvc0IsRUFBZ3RCN04sRUFBRXVlLFFBQUYsR0FBVyxVQUFTbkIsQ0FBVCxFQUFXO0FBQUMsV0FBT3BkLEVBQUVNLE9BQUYsQ0FBVThjLENBQVYsSUFBYSxVQUFTdEQsQ0FBVCxFQUFXO0FBQUMsYUFBTzhFLEVBQUU5RSxDQUFGLEVBQUlzRCxDQUFKLENBQVA7QUFBYyxLQUF2QyxHQUF3Q3VCLEVBQUV2QixDQUFGLENBQS9DO0FBQW9ELEdBQTN4QixFQUE0eEJwZCxFQUFFaW1CLFVBQUYsR0FBYSxVQUFTN0ksQ0FBVCxFQUFXO0FBQUMsV0FBTyxRQUFNQSxDQUFOLEdBQVEsWUFBVSxDQUFFLENBQXBCLEdBQXFCLFVBQVN0RCxDQUFULEVBQVc7QUFBQyxhQUFPOVosRUFBRU0sT0FBRixDQUFVd1osQ0FBVixJQUFhOEUsRUFBRXhCLENBQUYsRUFBSXRELENBQUosQ0FBYixHQUFvQnNELEVBQUV0RCxDQUFGLENBQTNCO0FBQWdDLEtBQXhFO0FBQXlFLEdBQTkzQixFQUErM0I5WixFQUFFc2UsT0FBRixHQUFVdGUsRUFBRXdhLE9BQUYsR0FBVSxVQUFTNEMsQ0FBVCxFQUFXO0FBQUMsV0FBT0EsSUFBRXBkLEVBQUUwa0IsU0FBRixDQUFZLEVBQVosRUFBZXRILENBQWYsQ0FBRixFQUFvQixVQUFTdEQsQ0FBVCxFQUFXO0FBQUMsYUFBTzlaLEVBQUVrbEIsT0FBRixDQUFVcEwsQ0FBVixFQUFZc0QsQ0FBWixDQUFQO0FBQXNCLEtBQTdEO0FBQThELEdBQTc5QixFQUE4OUJwZCxFQUFFa21CLEtBQUYsR0FBUSxVQUFTcE0sQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWU7QUFBQyxRQUFJeE8sSUFBRTVPLE1BQU1PLEtBQUs2ZCxHQUFMLENBQVMsQ0FBVCxFQUFXM0UsQ0FBWCxDQUFOLENBQU4sQ0FBMkJzRCxJQUFFWSxFQUFFWixDQUFGLEVBQUlLLENBQUosRUFBTSxDQUFOLENBQUYsQ0FBVyxLQUFJLElBQUlILElBQUUsQ0FBVixFQUFZQSxJQUFFeEQsQ0FBZCxFQUFnQndELEdBQWhCO0FBQW9Cck8sUUFBRXFPLENBQUYsSUFBS0YsRUFBRUUsQ0FBRixDQUFMO0FBQXBCLEtBQThCLE9BQU9yTyxDQUFQO0FBQVMsR0FBbmtDLEVBQW9rQ2pQLEVBQUVvZ0IsTUFBRixHQUFTLFVBQVN0RyxDQUFULEVBQVdzRCxDQUFYLEVBQWE7QUFBQyxXQUFPLFFBQU1BLENBQU4sS0FBVUEsSUFBRXRELENBQUYsRUFBSUEsSUFBRSxDQUFoQixHQUFtQkEsSUFBRWxaLEtBQUtxYyxLQUFMLENBQVdyYyxLQUFLd2YsTUFBTCxNQUFlaEQsSUFBRXRELENBQUYsR0FBSSxDQUFuQixDQUFYLENBQTVCO0FBQThELEdBQXpwQyxFQUEwcEM5WixFQUFFa1ksR0FBRixHQUFNRCxLQUFLQyxHQUFMLElBQVUsWUFBVTtBQUFDLFdBQU8sSUFBSUQsSUFBSixFQUFELENBQVdrTyxPQUFYLEVBQU47QUFBMkIsR0FBaHRDLENBQWl0QyxJQUFJQyxJQUFFLEVBQUMsS0FBSSxPQUFMLEVBQWEsS0FBSSxNQUFqQixFQUF3QixLQUFJLE1BQTVCLEVBQW1DLEtBQUksUUFBdkMsRUFBZ0QsS0FBSSxRQUFwRCxFQUE2RCxLQUFJLFFBQWpFLEVBQU47QUFBQSxNQUFpRkMsSUFBRXJtQixFQUFFcWtCLE1BQUYsQ0FBUytCLENBQVQsQ0FBbkY7QUFBQSxNQUErRkUsSUFBRSxTQUFGQSxDQUFFLENBQVNsSixDQUFULEVBQVc7QUFBQyxRQUFJSyxJQUFFLFNBQUZBLENBQUUsQ0FBUzNELENBQVQsRUFBVztBQUFDLGFBQU9zRCxFQUFFdEQsQ0FBRixDQUFQO0FBQVksS0FBOUI7QUFBQSxRQUErQkEsSUFBRSxRQUFNOVosRUFBRVosSUFBRixDQUFPZ2UsQ0FBUCxFQUFVL0osSUFBVixDQUFlLEdBQWYsQ0FBTixHQUEwQixHQUEzRDtBQUFBLFFBQStEcEUsSUFBRW1FLE9BQU8wRyxDQUFQLENBQWpFO0FBQUEsUUFBMkV3RCxJQUFFbEssT0FBTzBHLENBQVAsRUFBUyxHQUFULENBQTdFLENBQTJGLE9BQU8sVUFBU0EsQ0FBVCxFQUFXO0FBQUMsYUFBT0EsSUFBRSxRQUFNQSxDQUFOLEdBQVEsRUFBUixHQUFXLEtBQUdBLENBQWhCLEVBQWtCN0ssRUFBRXBQLElBQUYsQ0FBT2lhLENBQVAsSUFBVUEsRUFBRXZPLE9BQUYsQ0FBVStSLENBQVYsRUFBWUcsQ0FBWixDQUFWLEdBQXlCM0QsQ0FBbEQ7QUFBb0QsS0FBdkU7QUFBd0UsR0FBaFIsQ0FBaVI5WixFQUFFdW1CLE1BQUYsR0FBU0QsRUFBRUYsQ0FBRixDQUFULEVBQWNwbUIsRUFBRXdtQixRQUFGLEdBQVdGLEVBQUVELENBQUYsQ0FBekIsRUFBOEJybUIsRUFBRWpDLE1BQUYsR0FBUyxVQUFTK2IsQ0FBVCxFQUFXc0QsQ0FBWCxFQUFhSyxDQUFiLEVBQWU7QUFBQ3pkLE1BQUVNLE9BQUYsQ0FBVThjLENBQVYsTUFBZUEsSUFBRSxDQUFDQSxDQUFELENBQWpCLEVBQXNCLElBQUluTyxJQUFFbU8sRUFBRS9qQixNQUFSLENBQWUsSUFBRyxDQUFDNFYsQ0FBSixFQUFNLE9BQU9qUCxFQUFFb2UsVUFBRixDQUFhWCxDQUFiLElBQWdCQSxFQUFFMWEsSUFBRixDQUFPK1csQ0FBUCxDQUFoQixHQUEwQjJELENBQWpDLENBQW1DLEtBQUksSUFBSUgsSUFBRSxDQUFWLEVBQVlBLElBQUVyTyxDQUFkLEVBQWdCcU8sR0FBaEIsRUFBb0I7QUFBQyxVQUFJbGtCLElBQUUsUUFBTTBnQixDQUFOLEdBQVEsS0FBSyxDQUFiLEdBQWVBLEVBQUVzRCxFQUFFRSxDQUFGLENBQUYsQ0FBckIsQ0FBNkIsS0FBSyxDQUFMLEtBQVNsa0IsQ0FBVCxLQUFhQSxJQUFFcWtCLENBQUYsRUFBSUgsSUFBRXJPLENBQW5CLEdBQXNCNkssSUFBRTlaLEVBQUVvZSxVQUFGLENBQWFobEIsQ0FBYixJQUFnQkEsRUFBRTJKLElBQUYsQ0FBTytXLENBQVAsQ0FBaEIsR0FBMEIxZ0IsQ0FBbEQ7QUFBb0QsWUFBTzBnQixDQUFQO0FBQVMsR0FBcFAsQ0FBcVAsSUFBSTJNLElBQUUsQ0FBTixDQUFRem1CLEVBQUUwbUIsUUFBRixHQUFXLFVBQVM1TSxDQUFULEVBQVc7QUFBQyxRQUFJc0QsSUFBRSxFQUFFcUosQ0FBRixHQUFJLEVBQVYsQ0FBYSxPQUFPM00sSUFBRUEsSUFBRXNELENBQUosR0FBTUEsQ0FBYjtBQUFlLEdBQW5ELEVBQW9EcGQsRUFBRTJtQixnQkFBRixHQUFtQixFQUFDQyxVQUFTLGlCQUFWLEVBQTRCQyxhQUFZLGtCQUF4QyxFQUEyRE4sUUFBTyxrQkFBbEUsRUFBdkUsQ0FBNkosSUFBSU8sSUFBRSxNQUFOO0FBQUEsTUFBYUMsSUFBRSxFQUFDLEtBQUksR0FBTCxFQUFTLE1BQUssSUFBZCxFQUFtQixNQUFLLEdBQXhCLEVBQTRCLE1BQUssR0FBakMsRUFBcUMsVUFBUyxPQUE5QyxFQUFzRCxVQUFTLE9BQS9ELEVBQWY7QUFBQSxNQUF1RkMsSUFBRSwyQkFBekY7QUFBQSxNQUFxSEMsSUFBRSxTQUFGQSxDQUFFLENBQVNuTixDQUFULEVBQVc7QUFBQyxXQUFNLE9BQUtpTixFQUFFak4sQ0FBRixDQUFYO0FBQWdCLEdBQW5KLENBQW9KOVosRUFBRWtuQixRQUFGLEdBQVcsVUFBUzl0QixDQUFULEVBQVcwZ0IsQ0FBWCxFQUFhc0QsQ0FBYixFQUFlO0FBQUMsS0FBQ3RELENBQUQsSUFBSXNELENBQUosS0FBUXRELElBQUVzRCxDQUFWLEdBQWF0RCxJQUFFOVosRUFBRWdsQixRQUFGLENBQVcsRUFBWCxFQUFjbEwsQ0FBZCxFQUFnQjlaLEVBQUUybUIsZ0JBQWxCLENBQWYsQ0FBbUQsSUFBSWxKLENBQUo7QUFBQSxRQUFNeE8sSUFBRW1FLE9BQU8sQ0FBQyxDQUFDMEcsRUFBRXlNLE1BQUYsSUFBVU8sQ0FBWCxFQUFjeGhCLE1BQWYsRUFBc0IsQ0FBQ3dVLEVBQUUrTSxXQUFGLElBQWVDLENBQWhCLEVBQW1CeGhCLE1BQXpDLEVBQWdELENBQUN3VSxFQUFFOE0sUUFBRixJQUFZRSxDQUFiLEVBQWdCeGhCLE1BQWhFLEVBQXdFK04sSUFBeEUsQ0FBNkUsR0FBN0UsSUFBa0YsSUFBekYsRUFBOEYsR0FBOUYsQ0FBUjtBQUFBLFFBQTJHbUYsSUFBRSxDQUE3RztBQUFBLFFBQStHa0YsSUFBRSxRQUFqSCxDQUEwSHRrQixFQUFFbVMsT0FBRixDQUFVMEQsQ0FBVixFQUFZLFVBQVM2SyxDQUFULEVBQVdzRCxDQUFYLEVBQWFLLENBQWIsRUFBZXhPLENBQWYsRUFBaUJxTyxDQUFqQixFQUFtQjtBQUFDLGFBQU9JLEtBQUd0a0IsRUFBRW9HLEtBQUYsQ0FBUWdaLENBQVIsRUFBVThFLENBQVYsRUFBYS9SLE9BQWIsQ0FBcUJ5YixDQUFyQixFQUF1QkMsQ0FBdkIsQ0FBSCxFQUE2QnpPLElBQUU4RSxJQUFFeEQsRUFBRXpnQixNQUFuQyxFQUEwQytqQixJQUFFTSxLQUFHLGdCQUFjTixDQUFkLEdBQWdCLGdDQUFyQixHQUFzREssSUFBRUMsS0FBRyxnQkFBY0QsQ0FBZCxHQUFnQixzQkFBckIsR0FBNEN4TyxNQUFJeU8sS0FBRyxTQUFPek8sQ0FBUCxHQUFTLFVBQWhCLENBQTVJLEVBQXdLNkssQ0FBL0s7QUFBaUwsS0FBak4sR0FBbU40RCxLQUFHLE1BQXROLEVBQTZONUQsRUFBRXFOLFFBQUYsS0FBYXpKLElBQUUscUJBQW1CQSxDQUFuQixHQUFxQixLQUFwQyxDQUE3TixFQUF3UUEsSUFBRSw2Q0FBMkMsbURBQTNDLEdBQStGQSxDQUEvRixHQUFpRyxlQUEzVyxDQUEyWCxJQUFHO0FBQUNELFVBQUUsSUFBSTJKLFFBQUosQ0FBYXROLEVBQUVxTixRQUFGLElBQVksS0FBekIsRUFBK0IsR0FBL0IsRUFBbUN6SixDQUFuQyxDQUFGO0FBQXdDLEtBQTVDLENBQTRDLE9BQU01RCxDQUFOLEVBQVE7QUFBQyxZQUFNQSxFQUFFeFUsTUFBRixHQUFTb1ksQ0FBVCxFQUFXNUQsQ0FBakI7QUFBbUIsU0FBSXdELElBQUUsU0FBRkEsQ0FBRSxDQUFTeEQsQ0FBVCxFQUFXO0FBQUMsYUFBTzJELEVBQUUxYSxJQUFGLENBQU8sSUFBUCxFQUFZK1csQ0FBWixFQUFjOVosQ0FBZCxDQUFQO0FBQXdCLEtBQTFDO0FBQUEsUUFBMkN1ZCxJQUFFekQsRUFBRXFOLFFBQUYsSUFBWSxLQUF6RCxDQUErRCxPQUFPN0osRUFBRWhZLE1BQUYsR0FBUyxjQUFZaVksQ0FBWixHQUFjLE1BQWQsR0FBcUJHLENBQXJCLEdBQXVCLEdBQWhDLEVBQW9DSixDQUEzQztBQUE2QyxHQUF2dkIsRUFBd3ZCdGQsRUFBRXFuQixLQUFGLEdBQVEsVUFBU3ZOLENBQVQsRUFBVztBQUFDLFFBQUlzRCxJQUFFcGQsRUFBRThaLENBQUYsQ0FBTixDQUFXLE9BQU9zRCxFQUFFa0ssTUFBRixHQUFTLENBQUMsQ0FBVixFQUFZbEssQ0FBbkI7QUFBcUIsR0FBNXlCLENBQTZ5QixJQUFJbUssSUFBRSxTQUFGQSxDQUFFLENBQVN6TixDQUFULEVBQVdzRCxDQUFYLEVBQWE7QUFBQyxXQUFPdEQsRUFBRXdOLE1BQUYsR0FBU3RuQixFQUFFb2QsQ0FBRixFQUFLaUssS0FBTCxFQUFULEdBQXNCakssQ0FBN0I7QUFBK0IsR0FBbkQsQ0FBb0RwZCxFQUFFZ2IsS0FBRixHQUFRLFVBQVN5QyxDQUFULEVBQVc7QUFBQyxXQUFPemQsRUFBRStlLElBQUYsQ0FBTy9lLEVBQUVza0IsU0FBRixDQUFZN0csQ0FBWixDQUFQLEVBQXNCLFVBQVMzRCxDQUFULEVBQVc7QUFBQyxVQUFJc0QsSUFBRXBkLEVBQUU4WixDQUFGLElBQUsyRCxFQUFFM0QsQ0FBRixDQUFYLENBQWdCOVosRUFBRXFFLFNBQUYsQ0FBWXlWLENBQVosSUFBZSxZQUFVO0FBQUMsWUFBSUEsSUFBRSxDQUFDLEtBQUs2RCxRQUFOLENBQU4sQ0FBc0IsT0FBT0wsRUFBRXhhLEtBQUYsQ0FBUWdYLENBQVIsRUFBVTlXLFNBQVYsR0FBcUJ1a0IsRUFBRSxJQUFGLEVBQU9uSyxFQUFFdGEsS0FBRixDQUFROUMsQ0FBUixFQUFVOFosQ0FBVixDQUFQLENBQTVCO0FBQWlELE9BQWpHO0FBQWtHLEtBQXBKLEdBQXNKOVosQ0FBN0o7QUFBK0osR0FBbkwsRUFBb0xBLEVBQUVnYixLQUFGLENBQVFoYixDQUFSLENBQXBMLEVBQStMQSxFQUFFK2UsSUFBRixDQUFPLENBQUMsS0FBRCxFQUFPLE1BQVAsRUFBYyxTQUFkLEVBQXdCLE9BQXhCLEVBQWdDLE1BQWhDLEVBQXVDLFFBQXZDLEVBQWdELFNBQWhELENBQVAsRUFBa0UsVUFBUzNCLENBQVQsRUFBVztBQUFDLFFBQUlLLElBQUV4TyxFQUFFbU8sQ0FBRixDQUFOLENBQVdwZCxFQUFFcUUsU0FBRixDQUFZK1ksQ0FBWixJQUFlLFlBQVU7QUFBQyxVQUFJdEQsSUFBRSxLQUFLNkQsUUFBWCxDQUFvQixPQUFPRixFQUFFM2EsS0FBRixDQUFRZ1gsQ0FBUixFQUFVOVcsU0FBVixHQUFxQixZQUFVb2EsQ0FBVixJQUFhLGFBQVdBLENBQXhCLElBQTJCLE1BQUl0RCxFQUFFemdCLE1BQWpDLElBQXlDLE9BQU95Z0IsRUFBRSxDQUFGLENBQXJFLEVBQTBFeU4sRUFBRSxJQUFGLEVBQU96TixDQUFQLENBQWpGO0FBQTJGLEtBQXpJO0FBQTBJLEdBQW5PLENBQS9MLEVBQW9hOVosRUFBRStlLElBQUYsQ0FBTyxDQUFDLFFBQUQsRUFBVSxNQUFWLEVBQWlCLE9BQWpCLENBQVAsRUFBaUMsVUFBU2pGLENBQVQsRUFBVztBQUFDLFFBQUlzRCxJQUFFbk8sRUFBRTZLLENBQUYsQ0FBTixDQUFXOVosRUFBRXFFLFNBQUYsQ0FBWXlWLENBQVosSUFBZSxZQUFVO0FBQUMsYUFBT3lOLEVBQUUsSUFBRixFQUFPbkssRUFBRXRhLEtBQUYsQ0FBUSxLQUFLNmEsUUFBYixFQUFzQjNhLFNBQXRCLENBQVAsQ0FBUDtBQUFnRCxLQUExRTtBQUEyRSxHQUFuSSxDQUFwYSxFQUF5aUJoRCxFQUFFcUUsU0FBRixDQUFZaUosS0FBWixHQUFrQixZQUFVO0FBQUMsV0FBTyxLQUFLcVEsUUFBWjtBQUFxQixHQUEzbEIsRUFBNGxCM2QsRUFBRXFFLFNBQUYsQ0FBWThnQixPQUFaLEdBQW9CbmxCLEVBQUVxRSxTQUFGLENBQVltakIsTUFBWixHQUFtQnhuQixFQUFFcUUsU0FBRixDQUFZaUosS0FBL29CLEVBQXFwQnROLEVBQUVxRSxTQUFGLENBQVkxRSxRQUFaLEdBQXFCLFlBQVU7QUFBQyxXQUFPMFcsT0FBTyxLQUFLc0gsUUFBWixDQUFQO0FBQTZCLEdBQWx0QixFQUFtdEIsY0FBWSxVQUFaLElBQTJCLGdHQUEzQixJQUF1QyxpQ0FBb0IsRUFBcEIsbUNBQXVCLFlBQVU7QUFBQyxXQUFPM2QsQ0FBUDtBQUFTLEdBQTNDO0FBQUEsb0dBQTF2QjtBQUF1eUIsQ0FBMTdpQixFQUFELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7O0FBRU8sSUFBTXluQiwwQkFBUyxTQUFUQSxNQUFTLENBQVU3Z0IsSUFBVixFQUFnQkMsSUFBaEIsRUFBc0I7QUFDeEMsV0FBUUQsS0FBS2hILE9BQUwsQ0FBYSxPQUFiLEtBQXlCLENBQXpCLElBQThCaUgsUUFBUSxNQUE5QztBQUNILENBRk07QUFHQSxJQUFNNmdCLDhCQUFXLFNBQVhBLFFBQVcsQ0FBVTlnQixJQUFWLEVBQWdCQyxJQUFoQixFQUFzQjtBQUMxQyxRQUFHRCxJQUFILEVBQVE7QUFDSixlQUFRQSxLQUFLaEgsT0FBTCxDQUFhLEtBQWIsTUFBd0IsQ0FBeEIsSUFBNkJnSCxLQUFLaEgsT0FBTCxDQUFhLE1BQWIsTUFBeUIsQ0FBdEQsSUFBMkRpSCxTQUFTLFFBQTVFO0FBQ0g7QUFDRCxXQUFPLEtBQVA7QUFDSCxDQUxNO0FBTUEsSUFBTThnQiwwQkFBUyxTQUFUQSxNQUFTLENBQVUvZ0IsSUFBVixFQUFnQkMsSUFBaEIsRUFBc0I7QUFDeEMsV0FBU0EsU0FBUyxLQUFULElBQW1CQSxTQUFTLE1BQTVCLElBQXNDQSxTQUFTLHNCQUEvQyxJQUF5RSwrQkFBaUJELElBQWpCLEtBQTBCLEtBQTVHO0FBQ0gsQ0FGTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1hQOzs7O0FBSU8sSUFBTWdoQix3Q0FBZ0IsU0FBaEJBLGFBQWdCLENBQVNDLFVBQVQsRUFBcUI7QUFDOUMsUUFBTUMsVUFBVXJoQixTQUFTc2hCLG9CQUFULENBQThCLFFBQTlCLENBQWhCO0FBQ0EsU0FBSyxJQUFJM3VCLElBQUksQ0FBYixFQUFnQkEsSUFBSTB1QixRQUFRenVCLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QztBQUNyQyxZQUFNNHVCLE1BQU1GLFFBQVExdUIsQ0FBUixFQUFXNHVCLEdBQXZCO0FBQ0EsWUFBSUEsR0FBSixFQUFTO0FBQ0wsZ0JBQU1udEIsUUFBUW10QixJQUFJbkwsV0FBSixDQUFnQixNQUFNZ0wsVUFBdEIsQ0FBZDtBQUNBLGdCQUFJaHRCLFNBQVMsQ0FBYixFQUFnQjtBQUNaLHVCQUFPbXRCLElBQUlqb0IsTUFBSixDQUFXLENBQVgsRUFBY2xGLFFBQVEsQ0FBdEIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU8sRUFBUDtBQUNILENBWk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKUDs7O0FBR08sSUFBTXBDLDRCQUFVLGtCQUFoQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBUDs7OztBQUNBOzs7Ozs7QUFKQTs7O0FBTUEsSUFBTXd2QixtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFTQyxVQUFULEVBQXFCQyxHQUFyQixFQUF5QjtBQUM5QyxRQUFNQyxRQUFRLHNCQUFJLE1BQUlELElBQUl4WCxjQUFKLEVBQVIsQ0FBZDtBQUNBLFFBQUkwWCxjQUFjLEVBQWxCO0FBQUEsUUFBc0JDLGdCQUFnQixFQUF0QztBQUFBLFFBQTBDQyxlQUFlLEtBQXpEOztBQUVBLFFBQUlDLHVCQUF1QjtBQUN2QkMsNEJBQXFCLGtCQURFO0FBRXZCQywrQkFBd0IscUJBRkQ7QUFHdkJDLGtDQUEyQix3QkFISjtBQUl2QkMsNEJBQXFCO0FBSkUsS0FBM0I7O0FBT0EsUUFBSUMsNEJBQTRCLFNBQTVCQSx5QkFBNEIsQ0FBU2ptQixLQUFULEVBQWU7QUFDM0MsWUFBSWttQixrQkFBa0IsU0FBbEJBLGVBQWtCLEdBQVU7QUFDNUIsbUJBQU9yaUIsU0FBU3NpQixpQkFBVCxJQUE4QnRpQixTQUFTdWlCLHVCQUF2QyxJQUFrRXZpQixTQUFTd2lCLG9CQUEzRSxJQUFtR3hpQixTQUFTeWlCLG1CQUFuSDtBQUNILFNBRkQ7O0FBSUEsWUFBSUosaUJBQUosRUFBdUI7QUFDbkJWLGtCQUFNdlYsUUFBTixDQUFlLGdCQUFmO0FBQ0EwViwyQkFBZSxJQUFmO0FBQ0FGLHdCQUFZN1UsSUFBWjtBQUNBOFUsMEJBQWNoVixJQUFkO0FBQ0gsU0FMRCxNQUtPO0FBQ0g4VSxrQkFBTWpWLFdBQU4sQ0FBa0IsZ0JBQWxCO0FBQ0FvViwyQkFBZSxLQUFmO0FBQ0FGLHdCQUFZL1UsSUFBWjtBQUNBZ1YsMEJBQWM5VSxJQUFkO0FBQ0g7QUFDSixLQWhCRDs7QUFrQkEsUUFBSTJWLG9CQUFvQixTQUFwQkEsaUJBQW9CLEdBQVk7QUFDaEMsWUFBSWYsTUFBTWpULEdBQU4sR0FBWWlVLGlCQUFoQixFQUFtQztBQUMvQmhCLGtCQUFNalQsR0FBTixHQUFZaVUsaUJBQVo7QUFDSCxTQUZELE1BRU8sSUFBSWhCLE1BQU1qVCxHQUFOLEdBQVlrVSx1QkFBaEIsRUFBeUM7QUFDNUNqQixrQkFBTWpULEdBQU4sR0FBWWtVLHVCQUFaO0FBQ0gsU0FGTSxNQUVBLElBQUlqQixNQUFNalQsR0FBTixHQUFZbVUsb0JBQWhCLEVBQXNDO0FBQ3pDbEIsa0JBQU1qVCxHQUFOLEdBQVltVSxvQkFBWjtBQUNILFNBRk0sTUFFQSxJQUFJbEIsTUFBTWpULEdBQU4sR0FBWW9VLG1CQUFoQixFQUFxQztBQUN4Q25CLGtCQUFNalQsR0FBTixHQUFZb1UsbUJBQVo7QUFDSCxTQUZNLE1BRUE7QUFDSDtBQUNIO0FBQ0osS0FaRDtBQWFBLFFBQUlDLGlCQUFpQixTQUFqQkEsY0FBaUIsR0FBWTs7QUFFN0IsWUFBSS9pQixTQUFTZ2pCLGNBQWIsRUFBNkI7QUFDekJoakIscUJBQVNnakIsY0FBVDtBQUNILFNBRkQsTUFFTyxJQUFJaGpCLFNBQVNpakIsb0JBQWIsRUFBbUM7QUFDdENqakIscUJBQVNpakIsb0JBQVQ7QUFDSCxTQUZNLE1BRUEsSUFBSWpqQixTQUFTa2pCLG1CQUFiLEVBQWtDO0FBQ3JDbGpCLHFCQUFTa2pCLG1CQUFUO0FBQ0gsU0FGTSxNQUVBLElBQUlsakIsU0FBU21qQixnQkFBYixFQUErQjtBQUNsQ25qQixxQkFBU21qQixnQkFBVDtBQUNILFNBRk0sTUFFQTtBQUNIO0FBQ0g7QUFDSixLQWJEO0FBY0EsUUFBSUMsbUJBQW1CLFNBQW5CQSxnQkFBbUIsR0FBWTtBQUMvQixZQUFJLENBQUN0QixZQUFMLEVBQW1CO0FBQ2ZZO0FBQ0gsU0FGRCxNQUVPO0FBQ0hLO0FBQ0g7QUFDSixLQU5EOztBQVFBLFFBQU1NLGFBQWEsU0FBYkEsVUFBYSxDQUFTQyxRQUFULEVBQW1CN0MsUUFBbkIsRUFBNEI7QUFDM0NtQixzQkFBYzBCLFNBQVN0WCxJQUFULENBQWMsbUNBQWQsQ0FBZDtBQUNBNlYsd0JBQWdCeUIsU0FBU3RYLElBQVQsQ0FBYyxxQ0FBZCxDQUFoQjs7QUFFQTtBQUNBdFQsZUFBT0MsSUFBUCxDQUFZb3BCLG9CQUFaLEVBQWtDbnBCLE9BQWxDLENBQTBDLHFCQUFhO0FBQ25EO0FBQ0E7QUFDQSxnQkFBR29ILFNBQVN1akIsU0FBVCxNQUF3QixJQUEzQixFQUFnQztBQUM1QnZqQix5QkFBU2lRLGdCQUFULENBQTBCOFIscUJBQXFCd0IsU0FBckIsQ0FBMUIsRUFBMkRuQix5QkFBM0Q7QUFDSDtBQUVKLFNBUEQ7QUFTSCxLQWREO0FBZUEsUUFBTW9CLGNBQWMsU0FBZEEsV0FBYyxHQUFVO0FBQzFCO0FBQ0E5cUIsZUFBT0MsSUFBUCxDQUFZb3BCLG9CQUFaLEVBQWtDbnBCLE9BQWxDLENBQTBDLHFCQUFhO0FBQ25ELGdCQUFHb0gsU0FBU3VqQixTQUFULE1BQXdCLElBQTNCLEVBQWdDO0FBQzVCdmpCLHlCQUFTMlIsbUJBQVQsQ0FBNkJvUSxxQkFBcUJ3QixTQUFyQixDQUE3QixFQUE4RG5CLHlCQUE5RDtBQUNIO0FBRUosU0FMRDtBQU1ILEtBUkQ7QUFTQSxRQUFNcG1CLFNBQVM7QUFDWCx3Q0FBaUMsa0NBQVNHLEtBQVQsRUFBZ0JtbkIsUUFBaEIsRUFBMEI3QyxRQUExQixFQUFtQztBQUNoRXRrQixrQkFBTWdWLGNBQU47QUFDQWlTO0FBQ0g7QUFKVSxLQUFmOztBQU9BLFdBQU8sNEJBQWEzQixVQUFiLEVBQXlCLGtCQUF6QixFQUE2QyxJQUE3QyxFQUFtRHpsQixNQUFuRCxFQUEyRHFuQixVQUEzRCxFQUF1RUcsV0FBdkUsQ0FBUDtBQUVILENBakdEOztrQkFtR2VoQyxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQ3pHQSxZQUFNO0FBQ2pCLFdBQ0ksc0RBQ0ksa0RBREosR0FFSSxvREFGSixHQUdBLFdBSko7QUFNSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKRDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQVpBOzs7QUFtQkEsSUFBTWlDLFdBQVcsU0FBWEEsUUFBVyxDQUFTaEMsVUFBVCxFQUFxQkMsR0FBckIsRUFBeUI7QUFDdEMsUUFBSWdDLGVBQWUsRUFBbkI7QUFBQSxRQUF1QkMsYUFBWSxFQUFuQztBQUFBLFFBQXVDQyxjQUFjLEVBQXJEO0FBQUEsUUFBeURDLGNBQWMsRUFBdkU7QUFBQSxRQUEyRUMsbUJBQW1CLEVBQTlGOztBQUVBLFFBQUlDLHdCQUF3QixTQUF4QkEscUJBQXdCLEdBQVU7QUFDbEMsWUFBSUMsUUFBUSxFQUFDQyxPQUFRLFVBQVQsRUFBcUJDLFFBQVMsSUFBOUIsRUFBb0NyVyxNQUFPLEVBQTNDLEVBQVo7QUFDQSxZQUFJblgsZ0JBQWdCZ3JCLElBQUl2dEIsaUJBQUosRUFBcEI7QUFDQSxZQUFHdXRCLElBQUlsc0IsV0FBSixPQUFzQjJ1QixRQUF0QixJQUFrQ3p0QixjQUFjMEosSUFBZCxLQUF1QjVNLHdCQUE1RCxFQUEwRTtBQUN0RSxnQkFBSXFhLE9BQU87QUFDUG9XLHVCQUFRLE9BREQ7QUFFUHBkLHVCQUFTNmEsSUFBSWxyQixlQUFKLE9BQTBCLENBQTFCLEdBQThCLFFBQTlCLEdBQXlDa3JCLElBQUlsckIsZUFBSixFQUYzQztBQUdQNEosc0JBQU87QUFIQSxhQUFYO0FBS0E0akIsa0JBQU1uVyxJQUFOLENBQVd4VCxJQUFYLENBQWdCd1QsSUFBaEI7QUFDSDs7QUFFRCxZQUFJNlQsSUFBSXJ0QixnQkFBSixHQUF1QnpCLE1BQXZCLEdBQWdDLENBQXBDLEVBQXVDO0FBQ25DLGdCQUFJc0IsaUJBQWlCd3RCLElBQUl2dEIsaUJBQUosRUFBckI7O0FBRUEsZ0JBQUkwWixRQUFPO0FBQ1BvVyx1QkFBUSxRQUREO0FBRVBwZCx1QkFBUTNTLGlCQUFpQkEsZUFBZW5CLEtBQWhDLEdBQXdDLFNBRnpDO0FBR1BxTixzQkFBTztBQUhBLGFBQVg7O0FBTUE0akIsa0JBQU1uVyxJQUFOLENBQVd4VCxJQUFYLENBQWdCd1QsS0FBaEI7QUFDSDtBQUNELGVBQU9tVyxLQUFQO0FBQ0gsS0F4QkQ7O0FBMEJBLFFBQU1YLGFBQWEsU0FBYkEsVUFBYSxDQUFTQyxRQUFULEVBQW1CN0MsUUFBbkIsRUFBNEI7O0FBRTNDLFlBQUkyRCxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQVN6d0IsSUFBVCxFQUFjO0FBQ2hDLGdCQUFHa3dCLFdBQUgsRUFBZTtBQUNYQSw0QkFBWTF3QixPQUFaO0FBQ0g7QUFDRDB3QiwwQkFBYywyQkFBWVAsU0FBU3RYLElBQVQsQ0FBYyxvQkFBZCxDQUFaLEVBQWlEMFYsR0FBakQsRUFBc0QvdEIsSUFBdEQsQ0FBZDtBQUNILFNBTEQ7QUFNQSxZQUFJMHdCLGtCQUFrQixTQUFsQkEsZUFBa0IsR0FBVTtBQUM1QixnQkFBR1QsV0FBSCxFQUFlO0FBQ1hBLDRCQUFZendCLE9BQVo7QUFDSDtBQUNEeXdCLDBCQUFjLDJCQUFZTixTQUFTdFgsSUFBVCxDQUFjLDRCQUFkLENBQVosRUFBeUQwVixHQUF6RCxDQUFkO0FBQ0gsU0FMRDs7QUFPQWlDLHFCQUFhLDBCQUFXTCxTQUFTdFgsSUFBVCxDQUFjLG9CQUFkLENBQVgsRUFBZ0QwVixHQUFoRCxDQUFiO0FBQ0FnQyx1QkFBZSw0QkFBYUosU0FBU3RYLElBQVQsQ0FBYyxvQkFBZCxDQUFiLEVBQWtEMFYsR0FBbEQsQ0FBZjtBQUNBb0MsMkJBQW1CLGdDQUFpQlIsU0FBU3RYLElBQVQsQ0FBYyxxQkFBZCxDQUFqQixFQUF1RDBWLEdBQXZELENBQW5COztBQUdBQSxZQUFJanVCLEVBQUosQ0FBTzBQLHVCQUFQLEVBQXFCLFVBQVN4UCxJQUFULEVBQWU7QUFDaEN5d0IsNEJBQWdCendCLElBQWhCO0FBQ0EsZ0JBQUdBLEtBQUtnSCxRQUFMLEtBQWtCd3BCLFFBQXJCLEVBQThCO0FBQzFCO0FBQ0Esb0JBQUdQLFdBQUgsRUFBZTtBQUNYQSxnQ0FBWXp3QixPQUFaO0FBQ0g7QUFDSixhQUxELE1BS0s7QUFDRDtBQUNBa3hCO0FBQ0g7QUFDSixTQVhEO0FBWUEzQyxZQUFJanVCLEVBQUosQ0FBT0ksZ0JBQVAsRUFBYyxVQUFTZSxLQUFULEVBQWdCO0FBQzFCNnJCLHFCQUFTdHRCLE9BQVQ7QUFDSCxTQUZEO0FBR0gsS0FuQ0Q7QUFvQ0EsUUFBTXF3QixjQUFjLFNBQWRBLFdBQWMsR0FBVTtBQUMxQjtBQUNILEtBRkQ7QUFHQSxRQUFNeG5CLFNBQVM7QUFDWCxvQ0FBNkIsK0JBQVNHLEtBQVQsRUFBZ0JtbkIsUUFBaEIsRUFBMEI3QyxRQUExQixFQUFtQztBQUM1RHRrQixrQkFBTWdWLGNBQU47O0FBRUF1Uyx5QkFBYVksWUFBYixDQUEwQixLQUExQjtBQUNBaEIscUJBQVN0WCxJQUFULENBQWMsOEJBQWQsRUFBOENVLFdBQTlDLENBQTBELFFBQTFEO0FBQ0gsU0FOVTtBQU9YLHFDQUE4QiwrQkFBU3ZRLEtBQVQsRUFBZ0JtbkIsUUFBaEIsRUFBMEI3QyxRQUExQixFQUFtQztBQUM3RHRrQixrQkFBTWdWLGNBQU47O0FBRUE7QUFDQSxnQkFBR29ULDJCQUFpQjN4QixNQUFqQixHQUEwQixDQUE3QixFQUErQjtBQUMzQjtBQUNBbUgscUNBQUV1ZSxJQUFGLENBQU9pTSwwQkFBUCxFQUF5QixVQUFTQyxZQUFULEVBQXNCO0FBQzNDQSxpQ0FBYXJ4QixPQUFiO0FBQ0gsaUJBRkQ7QUFHQW94QiwyQ0FBaUIvbEIsTUFBakIsQ0FBd0IsQ0FBeEIsRUFBMkIrbEIsMkJBQWlCM3hCLE1BQTVDO0FBQ0gsYUFORCxNQU1LO0FBQ0QyeEIsMkNBQWlCbHFCLElBQWpCLENBQXNCLDRCQUFhaXBCLFFBQWIsRUFBdUI1QixHQUF2QixFQUE0QnFDLHVCQUE1QixDQUF0QjtBQUNIO0FBQ0o7QUFwQlUsS0FBZjs7QUEwQkEsV0FBTyw0QkFBYXRDLFVBQWIsRUFBeUIsVUFBekIsRUFBc0MsSUFBdEMsRUFBNkN6bEIsTUFBN0MsRUFBcURxbkIsVUFBckQsRUFBaUVHLFdBQWpFLENBQVA7QUFDSCxDQS9GRDs7a0JBaUdlQyxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSGYsSUFBTUEsV0FBVyxTQUFYQSxRQUFXLEdBQVU7QUFDdkIsWUFBTyx5Q0FDRix5Q0FERSxHQUVGLGdDQUZFLEdBR0YsNkNBSEUsR0FJRixZQUpFLEdBS0YsZ0NBTEUsR0FNRix5Q0FORSxHQU9GLGdCQVBFLEdBUUYsMENBUkUsR0FTRiwrR0FURSxHQVVGLGdCQVZFLEdBV0YsWUFYRSxHQVlGLFFBWkw7QUFhQTtBQUVILENBaEJEOztrQkFvQmVBLFE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCZjs7OztBQUNBOzs7O0FBSkE7OztBQWdCQSxJQUFNZ0IsYUFBYSxTQUFiQSxVQUFhLENBQVVoRCxVQUFWLEVBQXNCQyxHQUF0QixFQUEyQjtBQUMxQyxRQUFJZ0QsWUFBWSxFQUFoQjtBQUFBLFFBQ0lDLGFBQWEsRUFEakI7QUFBQSxRQUVJQyxjQUFjLEVBRmxCOztBQUtBLFFBQUlDLGlCQUFpQixTQUFqQkEsY0FBaUIsQ0FBUy91QixLQUFULEVBQWU7QUFDaEM0dUIsa0JBQVUzWCxJQUFWO0FBQ0E0WCxtQkFBVzVYLElBQVg7QUFDQTZYLG9CQUFZN1gsSUFBWjs7QUFFQSxZQUFHalgsVUFBVThMLHdCQUFiLEVBQTJCO0FBQ3ZCK2lCLHVCQUFXOVgsSUFBWDtBQUNILFNBRkQsTUFFTSxJQUFHL1csVUFBVTZMLHVCQUFiLEVBQTBCO0FBQzVCK2lCLHNCQUFVN1gsSUFBVjtBQUNILFNBRkssTUFFQSxJQUFHL1csVUFBVTRMLHlCQUFiLEVBQTRCO0FBQzlCZ2pCLHNCQUFVN1gsSUFBVjtBQUNILFNBRkssTUFFRDtBQUNENlgsc0JBQVU3WCxJQUFWO0FBQ0g7QUFFSixLQWZEOztBQW1CQSxRQUFNd1csYUFBYSxTQUFiQSxVQUFhLENBQVNDLFFBQVQsRUFBbUI3QyxRQUFuQixFQUE0QjtBQUMzQ2lFLG9CQUFZcEIsU0FBU3RYLElBQVQsQ0FBZSwyQkFBZixDQUFaO0FBQ0EyWSxxQkFBYXJCLFNBQVN0WCxJQUFULENBQWMsNEJBQWQsQ0FBYjtBQUNBNFksc0JBQWN0QixTQUFTdFgsSUFBVCxDQUFjLDZCQUFkLENBQWQ7O0FBRUEwVixZQUFJanVCLEVBQUosQ0FBT2lQLHVCQUFQLEVBQXFCLFVBQVMvTyxJQUFULEVBQWM7QUFDL0IsZ0JBQUdBLFFBQVFBLEtBQUtteEIsUUFBaEIsRUFBeUI7QUFDckJELCtCQUFlbHhCLEtBQUtteEIsUUFBcEI7QUFDSDtBQUNKLFNBSkQ7QUFLSCxLQVZEO0FBV0EsUUFBTXRCLGNBQWMsU0FBZEEsV0FBYyxHQUFVO0FBQzFCO0FBQ0gsS0FGRDtBQUdBLFFBQU14bkIsU0FBUztBQUNYLGtDQUEyQiw0QkFBU0csS0FBVCxFQUFnQm1uQixRQUFoQixFQUEwQjdDLFFBQTFCLEVBQW1DO0FBQzFEdGtCLGtCQUFNZ1YsY0FBTjtBQUNBLGdCQUFNNFQsZUFBZXJELElBQUkzcUIsUUFBSixFQUFyQjtBQUNBLGdCQUFJZ3VCLGlCQUFpQnRqQixxQkFBckIsRUFBaUM7QUFDN0JpZ0Isb0JBQUl4ckIsSUFBSjtBQUNILGFBRkQsTUFFTyxJQUFJNnVCLGlCQUFpQm5qQix3QkFBckIsRUFBb0M7QUFDdkM4ZixvQkFBSXB0QixLQUFKO0FBQ0gsYUFGTSxNQUVBLElBQUl5d0IsaUJBQWlCcGpCLHVCQUFyQixFQUFtQztBQUN0QytmLG9CQUFJeHJCLElBQUo7QUFDSCxhQUZNLE1BRUEsSUFBSTZ1QixpQkFBaUJyakIseUJBQXJCLEVBQXFDO0FBQ3hDZ2dCLG9CQUFJeHJCLElBQUo7QUFDSDtBQUNKO0FBYlUsS0FBZjs7QUFnQkEsV0FBTyw0QkFBYXVyQixVQUFiLEVBQXlCLFlBQXpCLEVBQXVDLElBQXZDLEVBQTZDemxCLE1BQTdDLEVBQXFEcW5CLFVBQXJELEVBQWlFRyxXQUFqRSxDQUFQO0FBQ0gsQ0F4REQ7O2tCQTBEZWlCLFU7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkMxRUEsWUFBTTtBQUNqQixXQUNJLDhEQUNJLDBDQURKLEdBRUksMkNBRkosR0FHSSw0Q0FISixHQUlBLFdBTEo7QUFPSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMRDs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQU9BLElBQU1PLGNBQWMsU0FBZEEsV0FBYyxDQUFTdkQsVUFBVCxFQUFxQkMsR0FBckIsRUFBeUI7QUFDekMsUUFBTUMsUUFBUSxzQkFBSSxNQUFJRCxJQUFJeFgsY0FBSixFQUFSLENBQWQ7QUFDQSxRQUFJK2EseUJBQXlCLENBQTdCO0FBQ0EsUUFBSUMsMkJBQTJCLENBQS9CO0FBQ0EsUUFBSUMsMEJBQTBCLENBQTlCOztBQUVBLFFBQUlDLGNBQWMsS0FBbEI7QUFBQSxRQUF5QkMsWUFBWSxLQUFyQzs7QUFFQSxRQUFJQyxlQUFlLEVBQW5CO0FBQUEsUUFDSUMsZ0JBQWdCLEVBRHBCO0FBQUEsUUFFSUMsZ0JBQWdCLEVBRnBCO0FBQUEsUUFHSUMsaUJBQWlCLEVBSHJCO0FBQUEsUUFJSUMsaUJBQWlCLEVBSnJCO0FBQUEsUUFLSUMsUUFBUSxFQUxaO0FBQUEsUUFNSUMsWUFBWSxDQU5oQjtBQUFBLFFBT0lDLFFBQVEsRUFQWjs7QUFVQSxRQUFJQyxtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFVQyxVQUFWLEVBQXNCO0FBQ3pDLFlBQU1DLG1CQUFtQlYsYUFBYXZ0QixLQUFiLEVBQXpCO0FBQ0EsWUFBTTNCLFdBQVc0dkIsbUJBQW1CRCxVQUFwQzs7QUFFQVAsc0JBQWN2WixHQUFkLENBQWtCLE9BQWxCLEVBQTJCN1YsV0FBVSxJQUFyQztBQUNBcXZCLHVCQUFleFosR0FBZixDQUFtQixNQUFuQixFQUEyQjdWLFdBQVUsSUFBckM7O0FBRUEsWUFBTTZ2QixjQUFjLENBQUNELG1CQUFtQkosU0FBcEIsSUFBaUNHLFVBQXJEO0FBQ0FMLHVCQUFlelosR0FBZixDQUFtQixNQUFuQixFQUEyQmdhLGNBQWEsSUFBeEM7O0FBRUFoQixpQ0FBeUI3dUIsUUFBekI7QUFDQTh1QixtQ0FBMkJhLFVBQTNCO0FBQ0gsS0FaRDs7QUFjQSxRQUFJRyxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFVSCxVQUFWLEVBQXNCO0FBQzFDLFlBQU1DLG1CQUFtQlYsYUFBYXZ0QixLQUFiLEVBQXpCO0FBQ0EsWUFBTW91QixnQkFBZ0JILG1CQUFtQkQsVUFBekM7O0FBRUFOLHVCQUFleFosR0FBZixDQUFtQixPQUFuQixFQUE0QjhaLGNBQWMsQ0FBZCxHQUFpQkEsVUFBakIsR0FBK0JJLGdCQUFnQmxCLHNCQUFqQixHQUEwQyxJQUFwRztBQUNILEtBTEQ7O0FBT0EsUUFBSW1CLG1CQUFtQixTQUFuQkEsZ0JBQW1CLENBQVNMLFVBQVQsRUFBcUI7QUFDeEMsWUFBTUMsbUJBQW1CVixhQUFhdnRCLEtBQWIsRUFBekI7QUFDQSxZQUFNc3VCLGVBQWVMLG1CQUFtQkQsVUFBeEM7O0FBRUFSLHNCQUFjdFosR0FBZCxDQUFrQixPQUFsQixFQUEyQm9hLGVBQWMsSUFBekM7QUFDQWxCLGtDQUEwQlksVUFBMUI7QUFDSCxLQU5EOztBQVFBLFFBQUlPLHNCQUFzQixTQUF0QkEsbUJBQXNCLENBQVVucUIsS0FBVixFQUFpQjtBQUN2QyxZQUFNNnBCLG1CQUFtQlYsYUFBYXZ0QixLQUFiLEVBQXpCO0FBQ0EsWUFBTXd1QixxQkFBcUJqQixhQUFhN1gsTUFBYixHQUFzQk0sSUFBakQ7QUFDQSxZQUFNeVksaUJBQWlCcnFCLE1BQU1zcUIsS0FBN0I7O0FBRUEsWUFBTVYsYUFBYSxDQUFDUyxpQkFBaUJELGtCQUFsQixJQUF3Q1AsZ0JBQTNEOztBQUVBLFlBQUlELGFBQWEsQ0FBakIsRUFBb0I7QUFDaEIsbUJBQU8sQ0FBUDtBQUNIOztBQUVELFlBQUlBLGFBQWEsQ0FBakIsRUFBb0I7QUFDaEIsbUJBQU8sQ0FBUDtBQUNIOztBQUVELGVBQU9BLFVBQVA7QUFDSCxLQWhCRDs7QUFrQkEsUUFBSVcsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBVVgsVUFBVixFQUFzQjVwQixLQUF0QixFQUE2QjtBQUNsRCxZQUFHb29CLDJCQUFpQjN4QixNQUFqQixHQUEwQixDQUE3QixFQUErQjtBQUMzQml6QixrQkFBTTlZLElBQU47QUFDQTtBQUNIOztBQUVBLFlBQU1wUyxXQUFXK21CLElBQUlsc0IsV0FBSixFQUFqQjtBQUNBLFlBQU02Z0IsU0FBUzFiLFdBQVdvckIsVUFBMUI7O0FBRUEsWUFBTVksTUFBTSx5QkFBV3RRLE1BQVgsQ0FBWjs7QUFFQXdQLGNBQU0xWSxJQUFOLENBQVd3WixHQUFYOztBQUVBLFlBQU1DLGdCQUFnQmYsTUFBTTl0QixLQUFOLEVBQXRCO0FBQ0EsWUFBTWl1QixtQkFBbUJWLGFBQWF2dEIsS0FBYixFQUF6QjtBQUNBLFlBQU0zQixXQUFXNHZCLG1CQUFtQkQsVUFBcEM7QUFDQSxZQUFNYyxrQkFBa0IxcUIsTUFBTXNxQixLQUFOLEdBQWNuQixhQUFhN1gsTUFBYixHQUFzQk0sSUFBNUQ7O0FBR0EsWUFBTStZLG9CQUFvQixTQUFwQkEsaUJBQW9CLEdBQVU7QUFDaEMsZ0JBQUdELGtCQUFrQkQsZ0JBQWdCLENBQXJDLEVBQXVDO0FBQ25DLHVCQUFPLENBQVA7QUFDSCxhQUZELE1BRU0sSUFBR1osbUJBQWlCYSxlQUFqQixHQUFvQ0QsZ0JBQWdCLENBQXZELEVBQXlEO0FBQzNELHVCQUFPWixtQkFBbUJZLGFBQTFCO0FBQ0gsYUFGSyxNQUVEO0FBQ0QsdUJBQU94d0IsV0FBV3d3QixnQkFBZ0IsQ0FBbEM7QUFDSDtBQUNKLFNBUkQ7QUFTQSxZQUFJRyxtQkFBbUJELG1CQUF2QjtBQUNBakIsY0FBTTVaLEdBQU4sQ0FBVSxNQUFWLEVBQWtCOGEsbUJBQWtCLElBQXBDO0FBQ0gsS0E5QkQ7O0FBZ0NBLFFBQUk1d0IsT0FBTyxTQUFQQSxJQUFPLENBQVU0dkIsVUFBVixFQUFzQjtBQUM3QnJFLFlBQUl2ckIsSUFBSixDQUFVLENBQUN1ckIsSUFBSWxzQixXQUFKLE1BQW1CLENBQXBCLElBQXlCdXdCLFVBQW5DO0FBQ0gsS0FGRDtBQUdBLFFBQU0xQyxhQUFhLFNBQWJBLFVBQWEsQ0FBU0MsUUFBVCxFQUFtQjdDLFFBQW5CLEVBQTRCO0FBQzNDNkUsdUJBQWVoQyxRQUFmO0FBQ0FpQyx3QkFBZ0JqQyxTQUFTdFgsSUFBVCxDQUFjLG9CQUFkLENBQWhCO0FBQ0F3Wix3QkFBZ0JsQyxTQUFTdFgsSUFBVCxDQUFjLG9CQUFkLENBQWhCO0FBQ0F5Wix5QkFBaUJuQyxTQUFTdFgsSUFBVCxDQUFjLHFCQUFkLENBQWpCO0FBQ0EwWix5QkFBaUJwQyxTQUFTdFgsSUFBVCxDQUFjLGlDQUFkLENBQWpCO0FBQ0EyWixnQkFBUXJDLFNBQVN0WCxJQUFULENBQWMsdUJBQWQsQ0FBUjtBQUNBNFosb0JBQVlELE1BQU01dEIsS0FBTixFQUFaO0FBQ0E4dEIsZ0JBQVF2QyxTQUFTdFgsSUFBVCxDQUFjLHVCQUFkLENBQVI7O0FBRUEwVixZQUFJanVCLEVBQUosQ0FBTyxNQUFQLEVBQWUsVUFBU0UsSUFBVCxFQUFlO0FBQzFCLGdCQUFHQSxRQUFRQSxLQUFLZ0gsUUFBYixJQUF5QmhILEtBQUt5QyxRQUFqQyxFQUEwQztBQUN0QzB2QixpQ0FBaUJueUIsS0FBS3lDLFFBQUwsR0FBZ0J6QyxLQUFLZ0gsUUFBdEM7QUFDSDtBQUNKLFNBSkQ7O0FBTUErbUIsWUFBSWp1QixFQUFKLENBQU8sZUFBUCxFQUF3QixVQUFTRSxJQUFULEVBQWU7QUFDbkMsZ0JBQUdBLFFBQVFBLEtBQUtxekIsYUFBaEIsRUFBOEI7QUFDMUJaLGlDQUFpQnp5QixLQUFLcXpCLGFBQUwsR0FBcUIsR0FBdEM7QUFDSDtBQUNKLFNBSkQ7QUFNSCxLQXRCRDtBQXVCQSxRQUFNeEQsY0FBYyxTQUFkQSxXQUFjLEdBQVUsQ0FFN0IsQ0FGRDtBQUdBLFFBQU14bkIsU0FBUztBQUNYLHlCQUFrQixzQkFBU0csS0FBVCxFQUFnQm1uQixRQUFoQixFQUEwQjdDLFFBQTFCLEVBQW1DO0FBQ2pEdGtCLGtCQUFNZ1YsY0FBTjs7QUFFQTJVLDZCQUFpQlosd0JBQWpCO0FBQ0FrQiw2QkFBaUJqQix1QkFBakI7QUFDSCxTQU5VO0FBT1gsdUNBQWdDLGtDQUFTaHBCLEtBQVQsRUFBZ0JtbkIsUUFBaEIsRUFBMEI3QyxRQUExQixFQUFtQztBQUMvRHRrQixrQkFBTWdWLGNBQU47O0FBRUFpVSwwQkFBYyxJQUFkO0FBQ0FTLGtCQUFNaFosSUFBTjtBQUNBOFUsa0JBQU12VixRQUFOLENBQWUsdUJBQWY7QUFFSCxTQWRVO0FBZVgsdUNBQWdDLGtDQUFTalEsS0FBVCxFQUFnQm1uQixRQUFoQixFQUEwQjdDLFFBQTFCLEVBQW1DO0FBQy9EdGtCLGtCQUFNZ1YsY0FBTjs7QUFFQWlVLDBCQUFjLEtBQWQ7QUFDQSxnQkFBSSxDQUFDQSxXQUFMLEVBQWtCO0FBQ2R6RCxzQkFBTWpWLFdBQU4sQ0FBa0IsdUJBQWxCO0FBQ0FtWixzQkFBTTlZLElBQU47QUFDSDtBQUNEbVosOEJBQWtCLENBQWxCO0FBQ0gsU0F4QlU7QUF5Qlgsc0NBQStCLGlDQUFTL3BCLEtBQVQsRUFBZ0JtbkIsUUFBaEIsRUFBMEI3QyxRQUExQixFQUFtQztBQUM5RHRrQixrQkFBTWdWLGNBQU47QUFDQWtVLHdCQUFZLElBQVo7QUFDQSxnQkFBTVUsYUFBYU8sb0JBQW9CbnFCLEtBQXBCLENBQW5CO0FBQ0EycEIsNkJBQWlCQyxVQUFqQjtBQUNBRyw4QkFBa0IsQ0FBbEI7QUFDQS92QixpQkFBSzR2QixVQUFMO0FBQ0gsU0FoQ1U7QUFpQ1gsc0NBQStCLGlDQUFTNXBCLEtBQVQsRUFBZ0JtbkIsUUFBaEIsRUFBMEI3QyxRQUExQixFQUFtQztBQUM5RHRrQixrQkFBTWdWLGNBQU47O0FBRUEsZ0JBQUksQ0FBQ2tVLFNBQUwsRUFBZ0I7QUFDWixvQkFBTVUsYUFBYU8sb0JBQW9CbnFCLEtBQXBCLENBQW5CO0FBQ0ErcEIsa0NBQWtCSCxVQUFsQjtBQUNBVyxrQ0FBa0JYLFVBQWxCLEVBQThCNXBCLEtBQTlCO0FBQ0g7QUFDSixTQXpDVTtBQTBDWCw4QkFBdUIsMkJBQVNBLEtBQVQsRUFBZ0JtbkIsUUFBaEIsRUFBMEI3QyxRQUExQixFQUFtQztBQUN0RHRrQixrQkFBTWdWLGNBQU47QUFDQSxnQkFBSWtVLFNBQUosRUFBZTtBQUNYLG9CQUFNVSxhQUFhTyxvQkFBb0JucUIsS0FBcEIsQ0FBbkI7QUFDQTJwQixpQ0FBaUJDLFVBQWpCO0FBQ0FHLGtDQUFrQixDQUFsQjtBQUNBL3ZCLHFCQUFLNHZCLFVBQUw7QUFDQVcsa0NBQWtCWCxVQUFsQixFQUE4QjVwQixLQUE5QjtBQUNIO0FBQ0osU0FuRFU7QUFvRFgsNEJBQXFCLHlCQUFTQSxLQUFULEVBQWdCbW5CLFFBQWhCLEVBQTBCN0MsUUFBMUIsRUFBbUM7QUFDcER0a0Isa0JBQU1nVixjQUFOOztBQUVBLGdCQUFHa1UsU0FBSCxFQUFhO0FBQ1RBLDRCQUFZLEtBQVo7QUFDQTFELHNCQUFNalYsV0FBTixDQUFrQix1QkFBbEI7QUFDSDtBQUVKO0FBNURVLEtBQWY7O0FBK0RBLFdBQU8sNEJBQWErVSxVQUFiLEVBQXlCLGFBQXpCLEVBQXdDLElBQXhDLEVBQThDemxCLE1BQTlDLEVBQXNEcW5CLFVBQXRELEVBQWtFRyxXQUFsRSxDQUFQO0FBQ0gsQ0E5TEQsQyxDQWRBOzs7a0JBOE1ld0IsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQzlNQSxZQUFNO0FBQ2pCLFdBQ0ksK0NBQ0ksNkNBREosR0FFSSxpQ0FGSixHQUdRLHVDQUhSLEdBSVEsaUVBSlIsR0FLUSx3Q0FMUixHQU1JLFFBTkosR0FPSSw4Q0FQSixHQVFRLG9FQVJSLEdBU0ksUUFUSixHQVVJLGdEQVZKLEdBV0EsUUFaSjtBQWNILEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFOQTs7O0FBT0EsSUFBTWlDLG9CQUFvQixHQUExQjtBQUNBLElBQU1DLGVBQWUsU0FBZkEsWUFBZSxDQUFTekYsVUFBVCxFQUFxQkMsR0FBckIsRUFBMEIvdEIsSUFBMUIsRUFBK0I7QUFDaEQsUUFBTWd1QixRQUFRLHNCQUFJLE1BQUlELElBQUl4WCxjQUFKLEVBQVIsQ0FBZDs7QUFFQSxRQUFJaWQsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBU0MsU0FBVCxFQUFtQjtBQUN0QyxZQUFJcEQsUUFBUSxFQUFDQyxPQUFRLEVBQVQsRUFBYXBXLE1BQU8sRUFBcEIsRUFBd0J6TixNQUFPZ25CLFNBQS9CLEVBQVo7O0FBRUEsWUFBR0EsY0FBYyxjQUFqQixFQUFnQztBQUM1QnBELGtCQUFNQyxLQUFOLEdBQWMsT0FBZDtBQUNBLGdCQUFJb0QsZ0JBQWdCM0YsSUFBSW5zQixTQUFKLEdBQWdCc0MsYUFBcEM7QUFDQSxnQkFBSXl2QixzQkFBc0I1RixJQUFJbHJCLGVBQUosRUFBMUI7QUFDQSxpQkFBSyxJQUFJN0QsSUFBSSxDQUFiLEVBQWdCQSxJQUFJMDBCLGNBQWN6MEIsTUFBbEMsRUFBMENELEdBQTFDLEVBQWdEO0FBQzVDLG9CQUFJa2IsT0FBTztBQUNQb1csMkJBQVNvRCxjQUFjMTBCLENBQWQsTUFBcUIsQ0FBckIsR0FBd0IsUUFBeEIsR0FBbUMwMEIsY0FBYzEwQixDQUFkLENBRHJDO0FBRVA0MEIsNkJBQVVELHdCQUF3QkQsY0FBYzEwQixDQUFkLENBRjNCO0FBR1BrVSwyQkFBUXdnQixjQUFjMTBCLENBQWQ7QUFIRCxpQkFBWDtBQUtBcXhCLHNCQUFNblcsSUFBTixDQUFXeFQsSUFBWCxDQUFnQndULElBQWhCO0FBQ0g7QUFFSixTQWJELE1BYU0sSUFBR3VaLGNBQWMsY0FBakIsRUFBZ0M7QUFDbENwRCxrQkFBTUMsS0FBTixHQUFjLFFBQWQ7O0FBRUEsZ0JBQUl1RCxnQkFBZ0I5RixJQUFJcnRCLGdCQUFKLEVBQXBCO0FBQ0EsZ0JBQUlILGlCQUFpQnd0QixJQUFJdnRCLGlCQUFKLEVBQXJCOztBQUVBLGlCQUFLLElBQUl4QixLQUFJLENBQWIsRUFBZ0JBLEtBQUk2MEIsY0FBYzUwQixNQUFsQyxFQUEwQ0QsSUFBMUMsRUFBZ0Q7QUFDNUMsb0JBQUlrYixRQUFPO0FBQ1BvVywyQkFBUXVELGNBQWM3MEIsRUFBZCxFQUFpQkksS0FEbEI7QUFFUHcwQiw2QkFBVXJ6QixlQUFlRSxLQUFmLEtBQXlCekIsRUFGNUI7QUFHUGtVLDJCQUFRbFU7QUFIRCxpQkFBWDtBQUtBcXhCLHNCQUFNblcsSUFBTixDQUFXeFQsSUFBWCxDQUFnQndULEtBQWhCO0FBQ0g7QUFFSjtBQUNELGVBQU9tVyxLQUFQO0FBQ0gsS0FqQ0Q7O0FBbUNBLFFBQU1YLGFBQWEsU0FBYkEsVUFBYSxDQUFTQyxRQUFULEVBQW1CN0MsUUFBbkIsRUFBNEI7QUFDM0MsWUFBR3dHLG9CQUFvQnRGLE1BQU0zcEIsTUFBTixFQUF2QixFQUFzQztBQUNsQzJwQixrQkFBTTNWLElBQU4sQ0FBVyxvQkFBWCxFQUFpQ0MsR0FBakMsQ0FBcUMsV0FBckMsRUFBa0QsT0FBbEQ7QUFDSDtBQUNKLEtBSkQ7QUFLQSxRQUFNdVgsY0FBYyxTQUFkQSxXQUFjLEdBQVU7QUFDMUI7QUFDSCxLQUZEO0FBR0EsUUFBTXhuQixTQUFTO0FBQ1gsd0NBQWdDLGlDQUFVRyxLQUFWLEVBQWlCbW5CLFFBQWpCLEVBQTJCN0MsUUFBM0IsRUFBcUM7QUFDakV0a0Isa0JBQU1nVixjQUFOO0FBQ0EsZ0JBQUlpVyxZQUFZLHNCQUFJanJCLE1BQU11VSxhQUFWLEVBQXlCdkMsSUFBekIsQ0FBOEIsZ0JBQTlCLENBQWhCO0FBQ0E7QUFDQW9XLHVDQUFpQmxxQixJQUFqQixDQUFzQjZzQixhQUFhekYsVUFBYixFQUF5QkMsR0FBekIsRUFBOEJ5RixpQkFBaUJDLFNBQWpCLENBQTlCLENBQXRCO0FBQ0gsU0FOVTtBQU9YLG9DQUE2Qiw4QkFBU2pyQixLQUFULEVBQWdCbW5CLFFBQWhCLEVBQTBCN0MsUUFBMUIsRUFBbUM7QUFDNUR0a0Isa0JBQU1nVixjQUFOOztBQUVBO0FBQ0EsZ0JBQUl3SixPQUFPNEosMkJBQWlCNUYsR0FBakIsRUFBWDtBQUNBaEUsaUJBQUt4bkIsT0FBTDtBQUNILFNBYlU7QUFjWCx5Q0FBa0Msa0NBQVNnSixLQUFULEVBQWdCbW5CLFFBQWhCLEVBQTBCN0MsUUFBMUIsRUFBbUM7QUFDakV0a0Isa0JBQU1nVixjQUFOOztBQUVBLGdCQUFJaVcsWUFBWSxzQkFBSWpyQixNQUFNdVUsYUFBVixFQUF5QnZDLElBQXpCLENBQThCLGdCQUE5QixDQUFoQjtBQUNBLGdCQUFJdEgsUUFBUSxzQkFBSTFLLE1BQU11VSxhQUFWLEVBQXlCdkMsSUFBekIsQ0FBOEIsZ0JBQTlCLENBQVo7O0FBRUEsZ0JBQUdpWixhQUFhdmdCLEtBQWhCLEVBQXNCO0FBQ2xCLG9CQUFHdWdCLGNBQWMsY0FBakIsRUFBZ0M7QUFDNUIxRix3QkFBSXJyQixlQUFKLENBQW9CbUMsV0FBV3FPLEtBQVgsQ0FBcEI7QUFDSCxpQkFGRCxNQUVNLElBQUd1Z0IsY0FBYyxjQUFqQixFQUFnQztBQUNsQzFGLHdCQUFJbnRCLGlCQUFKLENBQXNCUCxTQUFTNlMsS0FBVCxDQUF0QjtBQUNIOztBQUVEO0FBQ0E5TSxxQ0FBRXVlLElBQUYsQ0FBT2lNLDBCQUFQLEVBQXlCLFVBQVNDLFlBQVQsRUFBc0I7QUFDM0NBLGlDQUFhcnhCLE9BQWI7QUFDSCxpQkFGRDtBQUdBb3hCLDJDQUFpQi9sQixNQUFqQixDQUF3QixDQUF4QixFQUEyQitsQiwyQkFBaUIzeEIsTUFBNUM7QUFDSDtBQUVKO0FBbENVLEtBQWY7O0FBcUNBLFdBQU8sNEJBQWE2dUIsVUFBYixFQUF5QixjQUF6QixFQUF5Qzl0QixJQUF6QyxFQUErQ3FJLE1BQS9DLEVBQXVEcW5CLFVBQXZELEVBQW1FRyxXQUFuRSxDQUFQO0FBRUgsQ0FyRkQ7O2tCQXVGZTBELFk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRmY7Ozs7OztrQkFFZSxVQUFDdnpCLElBQUQsRUFBVTtBQUNyQixRQUFJdWIsV0FBVyxvQ0FBa0N2YixLQUFLdXdCLE1BQUwsR0FBYyxpQkFBZCxHQUFpQyxFQUFuRSxJQUF1RSxJQUF2RSxHQUNLLDJDQURMLEdBRVMsOENBRlQsSUFHY3Z3QixLQUFLdXdCLE1BQUwsR0FBYyxFQUFkLEdBQW1CLHNEQUhqQyxJQUlhLHdDQUpiLEdBSXNEdndCLEtBQUtzd0IsS0FKM0QsR0FJaUUsU0FKakUsR0FLUyxRQUxULEdBTUssUUFOTCxHQU9LLDBDQVBwQjtBQVF3QmxxQix5QkFBRW5CLE9BQUYsQ0FBVWpGLEtBQUtrYSxJQUFmLEVBQXFCLFVBQVNBLElBQVQsRUFBYztBQUMvQixZQUFHbGEsS0FBS3V3QixNQUFSLEVBQWU7QUFDWGhWLHdCQUFZdVksb0JBQW9CNVosS0FBS29XLEtBQXpCLEVBQWdDcFcsS0FBS2hILEtBQXJDLEVBQTRDZ0gsS0FBS3pOLElBQWpELENBQVo7QUFDSCxTQUZELE1BRUs7QUFDRDhPLHdCQUFZd1kscUJBQXFCN1osS0FBS29XLEtBQTFCLEVBQWlDcFcsS0FBS2hILEtBQXRDLEVBQTZDbFQsS0FBS3lNLElBQWxELEVBQXdEeU4sS0FBSzBaLE9BQTdELENBQVo7QUFDSDtBQUNKLEtBTkQ7QUFPeEJyWSxnQkFBb0IsV0FDSixRQURoQjtBQUVBLFdBQU9BLFFBQVA7QUFDSCxDOztBQUVNLElBQU11WSxvREFBc0IsU0FBdEJBLG1CQUFzQixDQUFDeEQsS0FBRCxFQUFRcGQsS0FBUixFQUFlekcsSUFBZixFQUF3QjtBQUN2RCxXQUNJLHlFQUF1RUEsSUFBdkUsR0FBNEUsSUFBNUUsR0FDSSx1Q0FESixHQUM0QzZqQixLQUQ1QyxHQUNrRCxTQURsRCxHQUVJLHFEQUZKLEdBR0ksdUNBSEosR0FHNENwZCxLQUg1QyxHQUdrRCxTQUhsRCxHQUlBLFFBTEo7QUFPSCxDQVJNOztBQVVBLElBQU02Z0Isc0RBQXVCLFNBQXZCQSxvQkFBdUIsQ0FBQ3pELEtBQUQsRUFBUXBkLEtBQVIsRUFBZXpHLElBQWYsRUFBcUJtbkIsT0FBckIsRUFBaUM7QUFDakUsV0FDSSwwRUFBd0VubkIsSUFBeEUsR0FBNkUsb0JBQTdFLEdBQWtHeUcsS0FBbEcsR0FBd0csSUFBeEcsR0FDSSx3Q0FESixJQUM4QzBnQixVQUFRLFVBQVIsR0FBbUIsRUFEakUsSUFDcUUsbUJBRHJFLEdBRUksdUNBRkosR0FFNEN0RCxLQUY1QyxHQUVrRCxTQUZsRCxHQUdBLFFBSko7QUFNSCxDQVBNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlCUDs7OztBQUNBOzs7O0FBSkE7OztBQU1BLElBQU0wRCxjQUFjLFNBQWRBLFdBQWMsQ0FBU2xHLFVBQVQsRUFBcUJDLEdBQXJCLEVBQTBCL3RCLElBQTFCLEVBQStCOztBQUUvQyxRQUFJaTBCLFlBQVksRUFBaEI7QUFBQSxRQUFvQkMsWUFBWSxFQUFoQztBQUNBLFFBQUlDLHNCQUFzQixTQUF0QkEsbUJBQXNCLENBQVNDLElBQVQsRUFBYztBQUNwQyxlQUFPLHlCQUFXQSxJQUFYLENBQVA7QUFDSCxLQUZEOztBQUlBLFFBQU0xRSxhQUFhLFNBQWJBLFVBQWEsQ0FBU0MsUUFBVCxFQUFtQjdDLFFBQW5CLEVBQTRCO0FBQzNDbUgsb0JBQVl0RSxTQUFTdFgsSUFBVCxDQUFjLG1CQUFkLENBQVo7QUFDQTZiLG9CQUFZdkUsU0FBU3RYLElBQVQsQ0FBYyxvQkFBZCxDQUFaOztBQUVBLFlBQUdyWSxLQUFLZ0gsUUFBTCxLQUFrQndwQixRQUFyQixFQUE4Qjs7QUFFMUIwRCxzQkFBVTFhLElBQVYsQ0FBZTJhLG9CQUFvQm4wQixLQUFLZ0gsUUFBekIsQ0FBZjtBQUNBK21CLGdCQUFJanVCLEVBQUosQ0FBTyxNQUFQLEVBQWUsVUFBU0UsSUFBVCxFQUFlO0FBQzFCaTBCLDBCQUFVemEsSUFBVixDQUFlMmEsb0JBQW9CbjBCLEtBQUt5QyxRQUF6QixDQUFmO0FBQ0gsYUFGRDtBQUdIO0FBRUosS0FaRDtBQWFBLFFBQU1vdEIsY0FBYyxTQUFkQSxXQUFjLEdBQVU7QUFDMUI7QUFDSCxLQUZEO0FBR0EsUUFBTXhuQixTQUFTLEVBQWY7O0FBSUEsV0FBTyw0QkFBYXlsQixVQUFiLEVBQXlCLGFBQXpCLEVBQXdDOXRCLElBQXhDLEVBQThDcUksTUFBOUMsRUFBc0RxbkIsVUFBdEQsRUFBa0VHLFdBQWxFLENBQVA7QUFDSCxDQTVCRDs7a0JBK0JlbUUsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQ3JDQSxVQUFDaDBCLElBQUQsRUFBVTtBQUNyQixXQUNJLG9DQUNLQSxLQUFLZ0gsUUFBTCxLQUFrQndwQixRQUFsQixHQUVJLG9FQUNJeHdCLEtBQUt5TSxJQUFMLElBQVksUUFBWixHQUVHLGlFQUZILEdBSUcsbUJBTFAsSUFNRCxXQVJILEdBVUksK0NBQ0csNkNBREgsR0FFRyw2Q0FiWixJQWVBLFFBaEJKO0FBa0JILEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztrUUNuQkQ7Ozs7O0FBR0E7Ozs7OztBQUVBLElBQU00bkIsZUFBZSxTQUFmQSxZQUFlLENBQVN2RyxVQUFULEVBQXFCQyxHQUFyQixFQUF5Qjs7QUFFMUMsUUFBSXVHLG1CQUFtQixFQUF2QjtBQUFBLFFBQ0lDLFVBQVUsRUFEZDtBQUFBLFFBRUlDLGdCQUFnQixFQUZwQjtBQUFBLFFBR0lDLGVBQWUsRUFIbkI7QUFBQSxRQUlJQyxpQkFBaUIsRUFKckI7QUFBQSxRQUtJQyxtQkFBbUIsRUFMdkI7QUFBQSxRQU1JQyxrQkFBa0IsRUFOdEI7QUFPQSxRQUFJbEQsWUFBWSxLQUFoQjtBQUNBLFFBQUltRCxjQUFjLEVBQWxCO0FBQUEsUUFBdUJDLGNBQWMsQ0FBckM7QUFBQSxRQUF3Q0MsV0FBVyxDQUFuRDtBQUFBLFFBQXNEQyxXQUFXLENBQWpFOztBQUdBO0FBQ0EsUUFBSUMsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFTN0MsVUFBVCxFQUFxQjtBQUNyQ3NDLHVCQUFldGIsSUFBZjtBQUNBdWIseUJBQWlCdmIsSUFBakI7QUFDQXdiLHdCQUFnQnhiLElBQWhCOztBQUVBLFlBQUlnWixjQUFjLEVBQWxCLEVBQXNCO0FBQ2xCc0MsMkJBQWV4YixJQUFmO0FBQ0gsU0FGRCxNQUVPLElBQUlrWixhQUFhLEVBQWIsSUFBbUJBLGFBQWEsQ0FBcEMsRUFBdUM7QUFDMUN1Qyw2QkFBaUJ6YixJQUFqQjtBQUNILFNBRk0sTUFFQSxJQUFJa1osY0FBYyxDQUFsQixFQUFxQjtBQUN4QndDLDRCQUFnQjFiLElBQWhCO0FBQ0g7QUFDSixLQVpEOztBQWNBLFFBQUlnYyxjQUFjLFNBQWRBLFdBQWMsQ0FBUzlDLFVBQVQsRUFBcUI7QUFDbkMsWUFBSXJFLElBQUkzckIsT0FBSixFQUFKLEVBQW1CO0FBQ2Znd0IseUJBQWEsQ0FBYjtBQUNIOztBQUVENkMsc0JBQWM3QyxVQUFkOztBQUVBLFlBQU0rQyxpQkFBaUJILFdBQVc1QyxVQUFYLEdBQXdCLEdBQS9DOztBQUVBb0Msc0JBQWNsYyxHQUFkLENBQWtCLE1BQWxCLEVBQTBCNmMsaUJBQWdCLElBQTFDO0FBQ0FWLHFCQUFhbmMsR0FBYixDQUFpQixPQUFqQixFQUEwQjZjLGlCQUFnQixJQUExQztBQUNILEtBWEQ7O0FBYUEsUUFBSXhDLHNCQUFzQixTQUF0QkEsbUJBQXNCLENBQVVucUIsS0FBVixFQUFpQjtBQUN2QyxZQUFNNHNCLFlBQVk1c0IsTUFBTXNxQixLQUFOLEdBQWN5QixRQUFRemEsTUFBUixHQUFpQk0sSUFBakQ7QUFDQSxZQUFJZ1ksYUFBYWdELFlBQVlQLFdBQVosR0FBMEIsR0FBM0M7O0FBRUEsWUFBSXpDLGFBQWEsQ0FBakIsRUFBb0I7QUFDaEJBLHlCQUFhLENBQWI7QUFDSDs7QUFFRCxZQUFJQSxhQUFhLEdBQWpCLEVBQXNCO0FBQ2xCQSx5QkFBYSxHQUFiO0FBQ0g7O0FBRUQsZUFBT0EsVUFBUDtBQUNILEtBYkQ7O0FBZ0JBLFFBQU0xQyxhQUFhLFNBQWJBLFVBQWEsQ0FBU0MsUUFBVCxFQUFtQjdDLFFBQW5CLEVBQTRCO0FBQzNDd0gsMkJBQW1CM0UsU0FBU3RYLElBQVQsQ0FBYyw4QkFBZCxDQUFuQjtBQUNBa2Msa0JBQVU1RSxTQUFTdFgsSUFBVCxDQUFjLG9CQUFkLENBQVY7QUFDQW1jLHdCQUFnQjdFLFNBQVN0WCxJQUFULENBQWMsMkJBQWQsQ0FBaEI7QUFDQW9jLHVCQUFlOUUsU0FBU3RYLElBQVQsQ0FBYywwQkFBZCxDQUFmOztBQUVBcWMseUJBQWlCL0UsU0FBU3RYLElBQVQsQ0FBZSw0QkFBZixDQUFqQjtBQUNBc2MsMkJBQW1CaEYsU0FBU3RYLElBQVQsQ0FBYyw4QkFBZCxDQUFuQjtBQUNBdWMsMEJBQWtCakYsU0FBU3RYLElBQVQsQ0FBYyw2QkFBZCxDQUFsQjs7QUFFQXljLHNCQUFjTixjQUFjcHdCLEtBQWQsRUFBZDtBQUNBNHdCLG1CQUFXSCxjQUFjQyxXQUF6Qjs7QUFFQS9HLFlBQUlqdUIsRUFBSixDQUFPLE9BQVAsRUFBZ0IsWUFBVztBQUN2Qm8xQix3QkFBWW5ILElBQUloc0IsU0FBSixFQUFaO0FBQ0gsU0FGRDtBQUdBZ3NCLFlBQUlqdUIsRUFBSixDQUFPLGVBQVAsRUFBd0IsVUFBU0UsSUFBVCxFQUFlO0FBQ25DazFCLHdCQUFZbDFCLEtBQUtpQyxNQUFqQjtBQUNILFNBRkQ7QUFHQThyQixZQUFJanVCLEVBQUosQ0FBTyxNQUFQLEVBQWUsVUFBU0UsSUFBVCxFQUFlO0FBQzFCLGdCQUFJQSxLQUFLbUUsSUFBVCxFQUFlO0FBQ1grd0IsNEJBQVksQ0FBWjtBQUNILGFBRkQsTUFFTztBQUNIQSw0QkFBWW5ILElBQUloc0IsU0FBSixFQUFaO0FBQ0g7QUFDSixTQU5EO0FBUUgsS0EzQkQ7QUE0QkEsUUFBTTh0QixjQUFjLFNBQWRBLFdBQWMsR0FBVSxDQUU3QixDQUZEO0FBR0EsUUFBTXhuQixTQUFTO0FBQ1gsb0NBQTZCLDhCQUFTRyxLQUFULEVBQWdCbW5CLFFBQWhCLEVBQTBCN0MsUUFBMUIsRUFBbUM7QUFDNUR0a0Isa0JBQU1nVixjQUFOOztBQUVBLGdCQUFJdVEsSUFBSWhzQixTQUFKLE9BQW9CLENBQXhCLEVBQTJCO0FBQ3ZCZ3NCLG9CQUFJN3JCLE9BQUosQ0FBWSxLQUFaO0FBQ0E2ckIsb0JBQUkvckIsU0FBSixDQUFjLEdBQWQ7QUFDSCxhQUhELE1BR087QUFDSCtyQixvQkFBSTdyQixPQUFKO0FBQ0g7QUFDSixTQVZVO0FBV1gseUNBQWtDLG1DQUFTc0csS0FBVCxFQUFnQm1uQixRQUFoQixFQUEwQjdDLFFBQTFCLEVBQW1DO0FBQ2pFdGtCLGtCQUFNZ1YsY0FBTjtBQUNBOFcsNkJBQWlCN2IsUUFBakIsQ0FBMEIsUUFBMUI7QUFDSCxTQWRVO0FBZVgseUNBQWtDLG1DQUFTalEsS0FBVCxFQUFnQm1uQixRQUFoQixFQUEwQjdDLFFBQTFCLEVBQW1DO0FBQ2pFdGtCLGtCQUFNZ1YsY0FBTjs7QUFFQWtVLHdCQUFZLEtBQVo7QUFDSCxTQW5CVTtBQW9CWCx3Q0FBaUMsa0NBQVNscEIsS0FBVCxFQUFnQm1uQixRQUFoQixFQUEwQjdDLFFBQTFCLEVBQW1DO0FBQ2hFdGtCLGtCQUFNZ1YsY0FBTjtBQUNBa1Usd0JBQVksSUFBWjtBQUNBM0QsZ0JBQUk3ckIsT0FBSixDQUFZLEtBQVo7QUFDQTZyQixnQkFBSS9yQixTQUFKLENBQWMyd0Isb0JBQW9CbnFCLEtBQXBCLENBQWQ7QUFDSCxTQXpCVTtBQTBCWCxzQ0FBK0IsZ0NBQVNBLEtBQVQsRUFBZ0JtbkIsUUFBaEIsRUFBMEI3QyxRQUExQixFQUFtQztBQUM5RHRrQixrQkFBTWdWLGNBQU47QUFDQWtVLHdCQUFZLEtBQVo7QUFDSCxTQTdCVTtBQThCWCx3Q0FBaUMsa0NBQVNscEIsS0FBVCxFQUFnQm1uQixRQUFoQixFQUEwQjdDLFFBQTFCLEVBQW1DO0FBQ2hFdGtCLGtCQUFNZ1YsY0FBTjtBQUNBLGdCQUFJLENBQUNrVSxTQUFMLEVBQWdCO0FBQ1osdUJBQU8sS0FBUDtBQUNIOztBQUVEM0QsZ0JBQUkvckIsU0FBSixDQUFjMndCLG9CQUFvQm5xQixLQUFwQixDQUFkO0FBQ0g7QUFyQ1UsS0FBZjs7QUF3Q0EsV0FBTyxTQUFjLDRCQUFhc2xCLFVBQWIsRUFBeUIsY0FBekIsRUFBeUMsSUFBekMsRUFBK0N6bEIsTUFBL0MsRUFBdURxbkIsVUFBdkQsRUFBbUVHLFdBQW5FLENBQWQsRUFBK0Y7QUFDbEdjLHNCQUFjLHNCQUFVeHVCLEtBQVYsRUFBaUI7QUFDM0J1dkIsd0JBQVl2dkIsS0FBWjtBQUNIO0FBSGlHLEtBQS9GLENBQVA7QUFLSCxDQXJJRDs7a0JBdUlla3lCLFk7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVJZjs7O2tCQUdlLFlBQU07QUFDakIsV0FDSSx3Q0FDSSwrQ0FESixHQUVRLDJDQUZSLEdBR1EsNkNBSFIsR0FJUSw0Q0FKUixHQUtJLFdBTEosR0FNSSwyQ0FOSixHQU9RLGlDQVBSLEdBUVksMENBUlosR0FTWSw2Q0FUWixHQVVZLDhDQVZaLEdBV1EsUUFYUixHQVlJLFFBWkosR0FhQSxRQWRKO0FBZ0JILEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCRDs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7Ozs7OztBQVdBLElBQU1nQixlQUFlLFNBQWZBLFlBQWUsQ0FBVXIzQixTQUFWLEVBQXFCczNCLFlBQXJCLEVBQW1DdDFCLElBQW5DLEVBQXlDcUksTUFBekMsRUFBaURxbkIsVUFBakQsRUFBNkRHLFdBQTdELEVBQTBFMEYsTUFBMUUsRUFBa0Y7QUFDbkcsUUFBSXpILGFBQWExbkIscUJBQUVnUyxTQUFGLENBQVlwYSxTQUFaLElBQXlCLHNCQUFJQSxTQUFKLENBQXpCLEdBQTBDQSxTQUEzRDtBQUNBLFFBQUl3M0Isa0JBQUo7QUFDQSxRQUFJQyxhQUFhLEVBQWpCO0FBQ0EsUUFBSXYzQixPQUFPLEVBQVg7O0FBRUEsUUFBSXczQix5QkFBeUIsU0FBekJBLHNCQUF5QixDQUFVOWEsSUFBVixFQUFnQjtBQUN6QyxZQUFNK2EsYUFBYXRwQixTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQW5CO0FBQ0FxcEIsbUJBQVdwYyxTQUFYLEdBQXVCcUIsSUFBdkI7O0FBRUE0YSxvQkFBWSxzQkFBSUcsV0FBV2xhLFVBQWYsQ0FBWjs7QUFFQSxlQUFPa2EsV0FBV2xhLFVBQWxCO0FBQ0gsS0FQRDs7QUFTQSxRQUFJOFosTUFBSixFQUFZO0FBQ1J6SCxtQkFBVzNjLE9BQVgsQ0FBbUJ1a0IsdUJBQXVCRSxvQkFBVU4sZUFBZSxVQUF6QixFQUFxQ3QxQixJQUFyQyxDQUF2QixDQUFuQjtBQUNILEtBRkQsTUFFTztBQUNIOHRCLG1CQUFXelUsTUFBWCxDQUFrQnFjLHVCQUF1QkUsb0JBQVVOLGVBQWUsVUFBekIsRUFBcUN0MUIsSUFBckMsQ0FBdkIsQ0FBbEI7QUFDSDs7QUFFRCxRQUFJMHZCLFVBQUosRUFBZ0I7QUFDWkEsbUJBQVc4RixTQUFYLEVBQXNCdDNCLElBQXRCO0FBQ0g7O0FBRUQ2RyxXQUFPQyxJQUFQLENBQVlxRCxNQUFaLEVBQW9CcEQsT0FBcEIsQ0FBNEIsdUJBQWU7QUFDdkMsWUFBSTR3QixlQUFlQyxZQUFZaGQsS0FBWixDQUFrQixHQUFsQixDQUFuQjtBQUNBLFlBQUk4VyxZQUFZaUcsYUFBYSxDQUFiLEVBQWdCMWtCLE9BQWhCLENBQXdCLEtBQXhCLEVBQStCLEVBQS9CLENBQWhCO0FBQ0EsWUFBSTBMLFNBQVNnWixhQUFhLENBQWIsRUFBZ0Ixa0IsT0FBaEIsQ0FBd0IsS0FBeEIsRUFBK0IsRUFBL0IsQ0FBYjs7QUFFQSxZQUFJNGtCLFVBQVUsRUFBZDs7QUFFQSxZQUFHbFosV0FBVyxVQUFYLElBQXlCQSxXQUFXLFFBQXZDLEVBQWdEO0FBQzVDa1osc0JBQVUsc0JBQUlsWixNQUFKLENBQVY7QUFDSCxTQUZELE1BRUs7QUFDRGtaLHNCQUFVUCxVQUFVbmQsSUFBVixDQUFld0UsTUFBZixNQUEyQjJZLFVBQVU5YixRQUFWLENBQW1CbUQsT0FBTzFMLE9BQVAsQ0FBZSxHQUFmLEVBQW1CLEVBQW5CLENBQW5CLElBQTZDcWtCLFNBQTdDLEdBQXlELElBQXBGLENBQVY7QUFDSDs7QUFHRCxZQUFJNUYsYUFBYS9TLE1BQWIsSUFBdUJrWixPQUEzQixFQUFvQztBQUNoQyxnQkFBSXZmLEtBQUt6UixPQUFPQyxJQUFQLENBQVl5d0IsVUFBWixFQUF3QngyQixNQUF4QixFQUFUOztBQUVBO0FBQ0EsZ0JBQUkrMkIsY0FBYyxTQUFkQSxXQUFjLENBQVV4dEIsS0FBVixFQUFpQjtBQUMvQix1QkFBT0gsT0FBT3l0QixXQUFQLEVBQW9CdHRCLEtBQXBCLEVBQTJCZ3RCLFNBQTNCLEVBQXNDdDNCLElBQXRDLENBQVA7QUFDSCxhQUZEO0FBR0F1M0IsdUJBQVdqZixFQUFYLElBQWlCLEVBQUN6VyxNQUFNNnZCLFNBQVAsRUFBa0IvUyxRQUFRQSxNQUExQixFQUFrQzdKLFVBQVVnakIsV0FBNUMsRUFBakI7O0FBRUE7QUFDQSxnQkFBSUMsYUFBYUYsUUFBUWhiLEdBQVIsR0FBYzliLE1BQS9CO0FBQ0EsZ0JBQUdnM0IsYUFBYSxDQUFoQixFQUFrQjtBQUNkLG9CQUFJaGUsV0FBVzhkLFFBQVFoYixHQUFSLEVBQWY7QUFDQSxxQkFBSSxJQUFJL2IsSUFBSSxDQUFaLEVBQWVBLElBQUlpM0IsVUFBbkIsRUFBK0JqM0IsR0FBL0IsRUFBb0M7QUFDaENpWiw2QkFBU2paLENBQVQsRUFBWXNkLGdCQUFaLENBQTZCc1QsU0FBN0IsRUFBd0NvRyxXQUF4QztBQUNIO0FBQ0Q7QUFDQTs7O0FBR0gsYUFURCxNQVNLO0FBQ0RELHdCQUFRaGIsR0FBUixHQUFjdUIsZ0JBQWQsQ0FBK0JzVCxTQUEvQixFQUEwQ29HLFdBQTFDO0FBQ0g7QUFHSixTQXpCRCxNQXlCTztBQUNILG1CQUFPLEtBQVA7QUFDSDtBQUNKLEtBMUNEOztBQTRDQTkzQixTQUFLc0IsT0FBTCxHQUFlLFlBQVk7QUFDdkJ1RixlQUFPQyxJQUFQLENBQVl5d0IsVUFBWixFQUF3Qnh3QixPQUF4QixDQUFnQyxjQUFNO0FBQ2xDLGdCQUFJdUQsUUFBUWl0QixXQUFXamYsRUFBWCxDQUFaO0FBQ0EsZ0JBQUl1ZixVQUFVLEVBQWQ7O0FBRUEsZ0JBQUd2dEIsTUFBTXFVLE1BQU4sS0FBaUIsVUFBakIsSUFBK0JyVSxNQUFNcVUsTUFBTixLQUFpQixRQUFuRCxFQUE0RDtBQUN4RGtaLDBCQUFVLHNCQUFJdnRCLE1BQU1xVSxNQUFWLENBQVY7QUFDSCxhQUZELE1BRUs7QUFDRGtaLDBCQUFVUCxVQUFVbmQsSUFBVixDQUFlN1AsTUFBTXFVLE1BQXJCLE1BQWlDMlksVUFBVTliLFFBQVYsQ0FBbUJsUixNQUFNcVUsTUFBTixDQUFhMUwsT0FBYixDQUFxQixHQUFyQixFQUF5QixFQUF6QixDQUFuQixJQUFtRHFrQixTQUFuRCxHQUErRCxJQUFoRyxDQUFWO0FBQ0g7O0FBRUQ7QUFDQSxnQkFBSVMsYUFBYUYsUUFBUWhiLEdBQVIsR0FBYzliLE1BQS9CO0FBQ0EsZ0JBQUdnM0IsYUFBYSxDQUFoQixFQUFrQjtBQUNkLG9CQUFJaGUsV0FBVzhkLFFBQVFoYixHQUFSLEVBQWY7QUFDQSxxQkFBSSxJQUFJL2IsSUFBSSxDQUFaLEVBQWVBLElBQUlpM0IsVUFBbkIsRUFBK0JqM0IsR0FBL0IsRUFBb0M7QUFDaENpWiw2QkFBU2paLENBQVQsRUFBWWdmLG1CQUFaLENBQWdDeFYsTUFBTXpJLElBQXRDLEVBQTRDeUksTUFBTXdLLFFBQWxEO0FBQ0g7QUFDRDs7O0FBR0gsYUFSRCxNQVFLO0FBQ0QraUIsd0JBQVFoYixHQUFSLEdBQWNpRCxtQkFBZCxDQUFrQ3hWLE1BQU16SSxJQUF4QyxFQUE4Q3lJLE1BQU13SyxRQUFwRDtBQUNIOztBQUVELG1CQUFPeWlCLFdBQVdqZixFQUFYLENBQVA7QUFDSCxTQXpCRDs7QUEyQkEsWUFBR2dmLFNBQUgsRUFBYTtBQUNUQSxzQkFBVWx5QixNQUFWO0FBQ0g7O0FBRUQsWUFBSXVzQixXQUFKLEVBQWlCO0FBQ2JBO0FBQ0g7QUFDSixLQW5DRDtBQW9DQSxXQUFPM3hCLElBQVA7QUFFSCxDQTNHRCxDLENBbkJBOzs7O2tCQWlJZW0zQixZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5SGY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBakJBOzs7QUFtQkEsSUFBTU8sWUFBWTtBQUNkTSw0Q0FEYztBQUVkQyx3Q0FGYztBQUdkQywwQ0FIYztBQUlkQyxrREFKYztBQUtkQyxvREFMYztBQU1kQyw4Q0FOYztBQU9kQyx3REFQYzs7QUFTZEMsNENBVGM7QUFVZEMsd0RBVmM7QUFXZEMsc0RBWGM7QUFZZEMsb0RBWmM7QUFhZEMsc0RBYmM7QUFjZEMsZ0VBZGM7QUFlZEM7QUFmYyxDQUFsQjs7a0JBa0JlbkIsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ2Y7Ozs7QUFJQSxJQUFNTSxtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFTMWMsSUFBVCxFQUFjO0FBQ25DLFNBQU8sa0VBQ0ssTUFETCxHQUNZQSxJQURaLEdBQ2lCLE9BRGpCLEdBRUssK0NBRkwsR0FHQyxRQUhSO0FBSUgsQ0FMRDs7a0JBT2UwYyxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYZjs7O0FBR0EsSUFBTXRGLG1CQUFtQixFQUF6Qjs7a0JBRWVBLGdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGZjs7OztBQUNBOzs7O0FBSkE7OztBQVdBLElBQU1vRyxZQUFZLFNBQVpBLFNBQVksQ0FBU2xKLFVBQVQsRUFBcUJDLEdBQXJCLEVBQTBCa0osV0FBMUIsRUFBc0M7O0FBRXBELFFBQU12SCxhQUFhLFNBQWJBLFVBQWEsQ0FBUzVCLFVBQVQsRUFBcUI2QixRQUFyQixFQUErQjdDLFFBQS9CLEVBQXdDO0FBQ3ZEO0FBQ0gsS0FGRDtBQUdBLFFBQU0rQyxjQUFjLFNBQWRBLFdBQWMsR0FBVTtBQUMxQjtBQUNILEtBRkQ7QUFHQSxRQUFNeG5CLFNBQVM7QUFDWDs7Ozs7OztBQURXLEtBQWY7O0FBV0EsV0FBTyw0QkFBYXlsQixVQUFiLEVBQXlCLFdBQXpCLEVBQXNDbUosV0FBdEMsRUFBbUQ1dUIsTUFBbkQsRUFBMkRxbkIsVUFBM0QsRUFBdUVHLFdBQXZFLENBQVA7QUFDSCxDQXBCRDs7a0JBc0JlbUgsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakNmOztrQkFXZSxVQUFDQyxXQUFELEVBQWlCO0FBQzVCLFdBQ0ksNkNBQWdEO0FBQzNDQSxvQkFBZ0JocEIsd0JBQWhCLEdBQWdDLG1EQUFoQyxHQUFzRixFQUQzRixLQUVLZ3BCLGdCQUFnQmpwQix1QkFBaEIsR0FBZ0Msa0RBQWhDLEdBQXFGLEVBRjFGLEtBR0tpcEIsZ0JBQWdCbHBCLHlCQUFoQixHQUFpQyxvREFBakMsR0FBd0YsRUFIN0YsSUFJQSxRQUxKO0FBT0gsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEJEOzs7O0FBQ0E7Ozs7OztBQUpBOzs7QUFNQSxJQUFNbXBCLGVBQWUsU0FBZkEsWUFBZSxDQUFTcEosVUFBVCxFQUFxQkMsR0FBckIsRUFBMEJ0ckIsUUFBMUIsRUFBbUM7QUFDcEQsUUFBTXVyQixRQUFRLHNCQUFJLE1BQUlELElBQUl4WCxjQUFKLEVBQVIsQ0FBZDs7QUFFQSxRQUFNbVosYUFBYSxTQUFiQSxVQUFhLENBQVNDLFFBQVQsRUFBbUI3QyxRQUFuQixFQUE0QjtBQUMzQyxZQUFNcUssYUFBYXhILFNBQVN2ckIsS0FBVCxFQUFuQjtBQUNBLFlBQU1nekIsY0FBY3pILFNBQVN0ckIsTUFBVCxFQUFwQjs7QUFFQSxZQUFNbWdCLElBQUloZSxLQUFLcWYsR0FBTCxDQUFTcGpCLFNBQVNxd0IsS0FBVCxHQUFpQjlFLE1BQU1sVSxNQUFOLEdBQWVNLElBQXpDLEVBQStDNFQsTUFBTTVwQixLQUFOLEtBQWdCK3lCLFVBQS9ELENBQVY7QUFDQSxZQUFNdlQsSUFBSXBkLEtBQUtxZixHQUFMLENBQVNwakIsU0FBUzQwQixLQUFULEdBQWlCckosTUFBTWxVLE1BQU4sR0FBZUcsR0FBekMsRUFBOEMrVCxNQUFNM3BCLE1BQU4sS0FBaUIreUIsV0FBL0QsQ0FBVjs7QUFFQXpILGlCQUFTclgsR0FBVCxDQUFhLE1BQWIsRUFBc0JrTSxJQUFJLElBQTFCO0FBQ0FtTCxpQkFBU3JYLEdBQVQsQ0FBYSxLQUFiLEVBQXFCc0wsSUFBSSxJQUF6QjtBQUNILEtBVEQ7QUFVQSxRQUFNaU0sY0FBYyxTQUFkQSxXQUFjLEdBQVU7QUFDMUI7QUFDSCxLQUZEO0FBR0EsUUFBTXhuQixTQUFTO0FBQ1gsbUNBQTRCLDZCQUFTRyxLQUFULEVBQWdCbW5CLFFBQWhCLEVBQTBCN0MsUUFBMUIsRUFBbUM7QUFDM0R0a0Isa0JBQU1nVixjQUFOOztBQUVBM1EsbUJBQU95cUIsSUFBUCxDQUNJLHlDQURKLEVBRUksUUFGSjtBQUlIO0FBUlUsS0FBZjs7QUFXQSxXQUFPLDRCQUFheEosVUFBYixFQUF5QixjQUF6QixFQUF5Q3JyQixRQUF6QyxFQUFtRDRGLE1BQW5ELEVBQTJEcW5CLFVBQTNELEVBQXVFRyxXQUF2RSxDQUFQO0FBRUgsQ0E3QkQ7O2tCQStCZXFILFk7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDZjs7a0JBQ2UsWUFBTTtBQUNqQixXQUNJLG9EQUNJLDZDQURKLEdBRVEsaURBRlIsR0FHSSxRQUhKLEdBSUksNkNBSkosR0FLUSx1REFMUixHQUtnRTc0QixnQkFMaEUsR0FLd0UsU0FMeEUsR0FNSSxRQU5KLEdBT0EsUUFSSjtBQVVILEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1REOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFjQSxJQUFNazVCLFNBQVMsU0FBVEEsTUFBUyxDQUFTekosVUFBVCxFQUFxQkMsR0FBckIsRUFBeUI7QUFDcEMsUUFBSXlKLFlBQVksRUFBaEI7QUFBQSxRQUFvQkMsYUFBYSxFQUFqQztBQUFBLFFBQXFDQyxVQUFVLEVBQS9DOztBQUlBLFFBQU1oSSxhQUFhLFNBQWJBLFVBQWEsQ0FBU0MsUUFBVCxFQUFtQjdDLFFBQW5CLEVBQTRCO0FBQzNDLFlBQUk2SyxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQVN4MUIsS0FBVCxFQUFlO0FBQ2pDLGdCQUFHcTFCLFNBQUgsRUFBYTtBQUNUQSwwQkFBVWg0QixPQUFWO0FBQ0g7QUFDRGc0Qix3QkFBWSx5QkFBVTdILFFBQVYsRUFBb0I1QixHQUFwQixFQUF5QjVyQixLQUF6QixDQUFaO0FBQ0gsU0FMRDtBQU1BLFlBQUl5MUIsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFTdjJCLE9BQVQsRUFBa0J3MkIsU0FBbEIsRUFBNEI7QUFDNUMsZ0JBQUdKLFVBQUgsRUFBYztBQUNWQSwyQkFBV2o0QixPQUFYO0FBQ0g7QUFDRGk0Qix5QkFBYSwwQkFBVzlILFFBQVgsRUFBcUI1QixHQUFyQixFQUEwQjFzQixPQUExQixFQUFtQ3cyQixTQUFuQyxDQUFiO0FBQ0gsU0FMRDtBQU1BSCxrQkFBVSx1QkFBUS9ILFFBQVIsRUFBa0I1QixHQUFsQixDQUFWOztBQUVBQSxZQUFJanVCLEVBQUosQ0FBT2lCLGdCQUFQLEVBQWMsWUFBVztBQUNyQjQyQiw0QkFBZ0IzcEIsdUJBQWhCO0FBQ0gsU0FGRDtBQUdBK2YsWUFBSWp1QixFQUFKLENBQU9pUCx1QkFBUCxFQUFxQixVQUFTL08sSUFBVCxFQUFjO0FBQy9CLGdCQUFHQSxRQUFRQSxLQUFLbXhCLFFBQWhCLEVBQXlCO0FBQ3JCLG9CQUFHbnhCLEtBQUtteEIsUUFBTCxLQUFrQmxqQix3QkFBckIsRUFBbUM7QUFDL0J1cEIsOEJBQVVoNEIsT0FBVjtBQUNBazRCLDRCQUFReGUsSUFBUixDQUFhLEtBQWI7QUFDSCxpQkFIRCxNQUdLO0FBQ0R5ZSxvQ0FBZ0IzM0IsS0FBS214QixRQUFyQjtBQUNBLHdCQUFHbnhCLEtBQUtteEIsUUFBTCxLQUFrQi9pQix3QkFBbEIsSUFBbUNwTyxLQUFLbXhCLFFBQUwsS0FBa0JoakIsd0JBQXhELEVBQXVFO0FBQ25FdXBCLGdDQUFReGUsSUFBUixDQUFhLElBQWI7QUFDSCxxQkFGRCxNQUVLO0FBQ0R3ZSxnQ0FBUXhlLElBQVIsQ0FBYSxLQUFiO0FBQ0g7QUFDSjtBQUNKO0FBQ0osU0FkRDtBQWVBNlUsWUFBSWp1QixFQUFKLENBQU9JLGdCQUFQLEVBQWMsVUFBU2UsS0FBVCxFQUFnQjtBQUMxQixnQkFBSUksVUFBVSxFQUFkOztBQUVBLGdCQUFJSixNQUFNZCxJQUFOLEtBQWUsR0FBbkIsRUFBd0I7QUFDcEJrQiwwQkFBVSx3QkFBVjtBQUNILGFBRkQsTUFFTyxJQUFJSixNQUFNZCxJQUFOLEtBQWUsR0FBbkIsRUFBd0I7QUFDM0JrQiwwQkFBVSw4QkFBVjtBQUNILGFBRk0sTUFFQSxJQUFJSixNQUFNZCxJQUFOLEtBQWUsR0FBbkIsRUFBd0I7QUFDM0JrQiwwQkFBVSxtRUFBVjtBQUNILGFBRk0sTUFFQSxJQUFJSixNQUFNZCxJQUFOLEtBQWUsR0FBbkIsRUFBd0I7QUFDM0JrQiwwQkFBVSxzR0FBVjtBQUNILGFBRk0sTUFFQSxJQUFJSixNQUFNZCxJQUFOLEtBQWUsR0FBbkIsRUFBd0I7QUFDM0JrQiwwQkFBVSx3SUFBVjtBQUNILGFBRk0sTUFFQSxJQUFJaEIsU0FBU1ksTUFBTWQsSUFBTixHQUFXLEdBQXBCLE1BQTZCLENBQWpDLEVBQW9DO0FBQ3ZDa0IsMEJBQVUsNENBQVY7QUFDSCxhQUZNLE1BRUE7QUFDSEEsMEJBQVUsc0NBQVY7QUFDSDs7QUFFRHUyQiwwQkFBY3YyQixPQUFkLEVBQXVCLElBQXZCO0FBQ0gsU0FwQkQ7O0FBc0JBMHNCLFlBQUlqdUIsRUFBSixDQUFPUSw0QkFBUCxFQUEwQixVQUFTa0ksS0FBVCxFQUFlO0FBQ3JDLGdCQUFJbkgsVUFBVSx3RkFBZDs7QUFFQSxnQkFBRzBzQixJQUFJdnRCLGlCQUFKLEdBQXdCQyxLQUF4QixHQUE4QixDQUE5QixLQUFxQ3N0QixJQUFJcnRCLGdCQUFKLEdBQXVCekIsTUFBL0QsRUFBc0U7QUFDbEVvQywwQkFBVSwrREFBVjtBQUNIOztBQUVEdTJCLDBCQUFjdjJCLE9BQWQsRUFBdUIsSUFBdkI7QUFDSCxTQVJEO0FBVUgsS0FqRUQ7QUFrRUEsUUFBTXd1QixjQUFjLFNBQWRBLFdBQWMsR0FBVTtBQUMxQjtBQUNILEtBRkQ7QUFHQSxRQUFNeG5CLFNBQVMsRUFBZjs7QUFJQSxXQUFPLDRCQUFheWxCLFVBQWIsRUFBeUIsUUFBekIsRUFBbUMsSUFBbkMsRUFBeUN6bEIsTUFBekMsRUFBaURxbkIsVUFBakQsRUFBNkRHLFdBQTdELENBQVA7QUFDSCxDQS9FRCxDLENBdEJBOzs7a0JBdUdlMEgsTTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2R2Y7Ozs7QUFJQSxJQUFNbkIsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFTNWMsSUFBVCxFQUFjO0FBQ2pDLFNBQU8sMkNBQVA7QUFDSCxDQUZEOztrQkFJZTRjLGM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xmOzs7O0FBQ0E7Ozs7QUFKQTs7O0FBV0EsSUFBTTBCLGFBQWEsU0FBYkEsVUFBYSxDQUFTaEssVUFBVCxFQUFxQkMsR0FBckIsRUFBMEIxc0IsT0FBMUIsRUFBbUN3MkIsU0FBbkMsRUFBNkM7O0FBRTVELFFBQUlFLG1CQUFtQixFQUF2Qjs7QUFFQSxRQUFNckksYUFBYSxTQUFiQSxVQUFhLENBQVNDLFFBQVQsRUFBbUI3QyxRQUFuQixFQUE0QjtBQUMzQyxZQUFHK0ssU0FBSCxFQUFhO0FBQ1RFLCtCQUFtQnprQixXQUFXLFlBQVU7QUFDcEN3Wix5QkFBU3R0QixPQUFUO0FBQ0gsYUFGa0IsRUFFaEJxNEIsYUFBVyxJQUZLLENBQW5CO0FBR0g7QUFDSixLQU5EO0FBT0EsUUFBTWhJLGNBQWMsU0FBZEEsV0FBYyxHQUFVLENBQzdCLENBREQ7QUFFQSxRQUFNeG5CLFNBQVM7QUFDWCxtQ0FBNEIsNkJBQVNHLEtBQVQsRUFBZ0JtbkIsUUFBaEIsRUFBMEI3QyxRQUExQixFQUFtQztBQUMzRHRrQixrQkFBTWdWLGNBQU47O0FBRUEsZ0JBQUd1YSxnQkFBSCxFQUFvQjtBQUNoQjVPLDZCQUFhNE8sZ0JBQWI7QUFDSDtBQUNEakwscUJBQVN0dEIsT0FBVDtBQUNIO0FBUlUsS0FBZjs7QUFXQSxXQUFPLDRCQUFhc3VCLFVBQWIsRUFBeUIsWUFBekIsRUFBdUN6c0IsT0FBdkMsRUFBZ0RnSCxNQUFoRCxFQUF3RHFuQixVQUF4RCxFQUFvRUcsV0FBcEUsQ0FBUDtBQUNILENBekJEOztrQkE0QmVpSSxVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDdkNBLFVBQUN6MkIsT0FBRCxFQUFhO0FBQ3hCLFdBQ0ksaURBQ0kscUNBREosR0FFUSxpQ0FGUixHQUUwQ0EsT0FGMUMsR0FFa0QsU0FGbEQsR0FHSSxRQUhKLEdBSUEsUUFMSjtBQU9ILEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztrUUNSRDs7Ozs7QUFHQTs7Ozs7O0FBRUEsSUFBTTIyQixVQUFVLFNBQVZBLE9BQVUsQ0FBU2xLLFVBQVQsRUFBcUJDLEdBQXJCLEVBQXlCO0FBQ3JDLFFBQUlrSyxXQUFXLEVBQWY7O0FBRUEsUUFBTXZJLGFBQWEsU0FBYkEsVUFBYSxDQUFTQyxRQUFULEVBQW1CN0MsUUFBbkIsRUFBNEI7QUFDM0NtTCxtQkFBV3RJLFFBQVg7QUFDSCxLQUZEO0FBR0EsUUFBTUUsY0FBYyxTQUFkQSxXQUFjLEdBQVU7QUFDMUI7QUFDSCxLQUZEO0FBR0EsUUFBTXhuQixTQUFTLEVBQWY7O0FBRUEsV0FBTyxTQUFjLDRCQUFheWxCLFVBQWIsRUFBeUIsU0FBekIsRUFBb0MsSUFBcEMsRUFBMEN6bEIsTUFBMUMsRUFBa0RxbkIsVUFBbEQsRUFBOERHLFdBQTlELENBQWQsRUFBMkY7QUFDOUYzVyxjQUFNLGNBQVVnZixNQUFWLEVBQWtCO0FBQ3BCLGdCQUFHQSxNQUFILEVBQVU7QUFDTkQseUJBQVMvZSxJQUFUO0FBQ0gsYUFGRCxNQUVLO0FBQ0QrZSx5QkFBUzdlLElBQVQ7QUFDSDtBQUNKO0FBUDZGLEtBQTNGLENBQVA7QUFTSCxDQXBCRDs7a0JBdUJlNGUsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQzVCQSxZQUFNO0FBQ2pCLFdBQU8sMkpBQVA7QUFDSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a1FDRkQ7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQWNBLG1CQUFBN2xCLENBQVEsNERBQVI7O0FBRUEsSUFBTWdtQixPQUFPLFNBQVBBLElBQU8sQ0FBU3JLLFVBQVQsRUFBb0I7QUFDN0IsUUFBSXNLLFdBQVcsRUFBZjtBQUFBLFFBQW1CQyxTQUFTLEVBQTVCO0FBQUEsUUFBZ0NDLG9CQUFoQztBQUFBLFFBQTZDQyxlQUFlLEVBQTVEO0FBQUEsUUFBZ0V4SyxNQUFNLEVBQXRFO0FBQUEsUUFBMEV5SyxnQkFBZ0IsRUFBMUY7O0FBRUEsUUFBSUMsVUFBVSxTQUFWQSxPQUFVLENBQVVyZixJQUFWLEVBQWdCc2YsUUFBaEIsRUFBMEI7O0FBRXBDLFlBQUlGLGFBQUosRUFBbUI7QUFDZnJQLHlCQUFhcVAsYUFBYjtBQUNBQSw0QkFBZ0IsSUFBaEI7QUFDSDs7QUFFRCxZQUFJcGYsSUFBSixFQUFVO0FBQ04sZ0JBQUd3WCwyQkFBaUIzeEIsTUFBakIsR0FBMEIsQ0FBN0IsRUFBK0I7QUFDM0IsdUJBQU8sS0FBUDtBQUNIO0FBQ0RxNUIsd0JBQVk3ZixRQUFaLENBQXFCLGNBQXJCO0FBQ0gsU0FMRCxNQUtPO0FBQ0g2Zix3QkFBWXZmLFdBQVosQ0FBd0IsY0FBeEI7O0FBRUEsZ0JBQUkyZixRQUFKLEVBQWM7QUFDVkYsZ0NBQWdCbGxCLFdBQVcsWUFBVztBQUNsQyx3QkFBR3NkLDJCQUFpQjN4QixNQUFqQixHQUEwQixDQUE3QixFQUErQjtBQUMzQiwrQkFBTyxLQUFQO0FBQ0g7QUFDRHE1QixnQ0FBWTdmLFFBQVosQ0FBcUIsY0FBckI7QUFDSCxpQkFMZSxFQUtiLElBTGEsQ0FBaEI7QUFNSDtBQUNKO0FBQ0osS0F4QkQ7QUF5QkEsUUFBSWtnQixrQkFBa0IsU0FBbEJBLGVBQWtCLEdBQVk7QUFDOUIsWUFBTXZILGVBQWVyRCxJQUFJM3FCLFFBQUosRUFBckI7O0FBRUEsWUFBSWd1QixpQkFBaUJ0akIscUJBQWpCLElBQStCc2pCLGlCQUFpQnBqQix1QkFBaEQsSUFBZ0VvakIsaUJBQWlCcmpCLHlCQUFyRixFQUFxRztBQUNqR2dnQixnQkFBSXhyQixJQUFKO0FBQ0gsU0FGRCxNQUVNLElBQUc2dUIsaUJBQWlCbmpCLHdCQUFwQixFQUFrQztBQUNwQzhmLGdCQUFJcHRCLEtBQUo7QUFDSDtBQUNKLEtBUkQ7QUFTQSxRQUFJNkIsT0FBTyxTQUFQQSxJQUFPLENBQVV1Z0IsT0FBVixFQUFtQjZWLFFBQW5CLEVBQTZCOztBQUVwQyxZQUFNNXhCLFdBQVcrbUIsSUFBSWxzQixXQUFKLEVBQWpCO0FBQ0EsWUFBTWczQixrQkFBa0I5SyxJQUFJanNCLFdBQUosRUFBeEI7QUFDQSxZQUFJVyxXQUFXLENBQWY7O0FBRUEsWUFBR20yQixRQUFILEVBQVk7QUFDUm4yQix1QkFBVytELEtBQUs2ZCxHQUFMLENBQVN3VSxrQkFBa0I5VixPQUEzQixFQUFvQyxDQUFwQyxDQUFYO0FBQ0gsU0FGRCxNQUVLO0FBQ0R0Z0IsdUJBQVcrRCxLQUFLcWYsR0FBTCxDQUFTZ1Qsa0JBQWtCOVYsT0FBM0IsRUFBb0MvYixRQUFwQyxDQUFYO0FBQ0g7O0FBRUQrbUIsWUFBSXZyQixJQUFKLENBQVNDLFFBQVQ7QUFDSCxLQWJEO0FBY0EsUUFBSVIsU0FBUyxTQUFUQSxNQUFTLENBQVM2MkIsSUFBVCxFQUFjO0FBQ3ZCLFlBQU1DLGdCQUFnQmhMLElBQUloc0IsU0FBSixFQUF0QjtBQUNBLFlBQUlpM0IsWUFBWSxDQUFoQjtBQUNBLFlBQUdGLElBQUgsRUFBUTtBQUNKRSx3QkFBYXh5QixLQUFLcWYsR0FBTCxDQUFTa1QsZ0JBQWdCLENBQXpCLEVBQTRCLEdBQTVCLENBQWI7QUFDSCxTQUZELE1BRUs7QUFDREMsd0JBQVl4eUIsS0FBSzZkLEdBQUwsQ0FBUzBVLGdCQUFnQixDQUF6QixFQUE0QixDQUE1QixDQUFaO0FBQ0g7QUFDRGhMLFlBQUkvckIsU0FBSixDQUFjZzNCLFNBQWQ7QUFDSCxLQVREO0FBVUEsUUFBSUMscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBU25HLEtBQVQsRUFBZ0J1RSxLQUFoQixFQUFzQjtBQUMzQyxZQUFHa0IsWUFBSCxFQUFnQjtBQUNaQSx5QkFBYS80QixPQUFiO0FBQ0ErNEIsMkJBQWUsSUFBZjtBQUNIO0FBQ0RBLHVCQUFlLDRCQUFhRCxXQUFiLEVBQTBCdkssR0FBMUIsRUFBK0IsRUFBQytFLE9BQVFBLEtBQVQsRUFBZ0J1RSxPQUFRQSxLQUF4QixFQUEvQixDQUFmO0FBQ0gsS0FORDs7QUFRQSxRQUFNM0gsYUFBYSxTQUFiQSxVQUFhLENBQVNDLFFBQVQsRUFBbUI3QyxRQUFuQixFQUE0QjtBQUMzQ3dMLHNCQUFjM0ksUUFBZDtBQUNILEtBRkQ7QUFHQSxRQUFNRSxjQUFjLFNBQWRBLFdBQWMsR0FBVTtBQUMxQjtBQUNILEtBRkQ7QUFHQSxRQUFNeG5CLFNBQVM7QUFDWCw2QkFBc0IseUJBQVNHLEtBQVQsRUFBZ0JtbkIsUUFBaEIsRUFBMEI3QyxRQUExQixFQUFtQztBQUNyRHRrQixrQkFBTWdWLGNBQU47O0FBRUEsZ0JBQUcrYSxZQUFILEVBQWdCO0FBQ1pBLDZCQUFhLzRCLE9BQWI7QUFDQSs0QiwrQkFBZSxJQUFmO0FBQ0EsdUJBQU8sS0FBUDtBQUNIO0FBQ0QsZ0JBQUcsQ0FBQyxzQkFBSS92QixNQUFNcVUsTUFBVixFQUFrQjdCLE9BQWxCLENBQTBCLG1CQUExQixDQUFELElBQ0MsQ0FBQyxzQkFBSXhTLE1BQU1xVSxNQUFWLEVBQWtCN0IsT0FBbEIsQ0FBMEIsb0JBQTFCLENBREwsRUFDcUQ7QUFDakQyZDtBQUNIO0FBQ0QsZ0JBQUcsQ0FBQyxzQkFBSW53QixNQUFNcVUsTUFBVixFQUFrQjdCLE9BQWxCLENBQTBCLG9CQUExQixDQUFELElBQW9ELENBQUMsc0JBQUl4UyxNQUFNcVUsTUFBVixFQUFrQjdCLE9BQWxCLENBQTBCLHFCQUExQixDQUFyRCxJQUF5RzRWLDJCQUFpQjN4QixNQUFqQixHQUEwQixDQUF0SSxFQUF3STtBQUNwSTtBQUNBbUgscUNBQUV1ZSxJQUFGLENBQU9pTSwwQkFBUCxFQUF5QixVQUFTQyxZQUFULEVBQXNCO0FBQzNDQSxpQ0FBYXJ4QixPQUFiO0FBQ0gsaUJBRkQ7QUFHQW94QiwyQ0FBaUIvbEIsTUFBakIsQ0FBd0IsQ0FBeEIsRUFBMkIrbEIsMkJBQWlCM3hCLE1BQTVDO0FBQ0g7QUFDSixTQXBCVTtBQXFCWCxrQ0FBMkIsOEJBQVN1SixLQUFULEVBQWdCbW5CLFFBQWhCLEVBQTBCN0MsUUFBMUIsRUFBbUM7QUFDMUR0a0Isa0JBQU1nVixjQUFOOztBQUVBLGdCQUFJdVEsSUFBSTNxQixRQUFKLE9BQW1CNkssd0JBQXZCLEVBQXNDO0FBQ2xDd3FCLHdCQUFRLEtBQVIsRUFBZSxJQUFmO0FBQ0gsYUFGRCxNQUVPO0FBQ0hBLHdCQUFRLEtBQVI7QUFDSDtBQUNKLFNBN0JVO0FBOEJYLGlDQUEwQiw2QkFBU2p3QixLQUFULEVBQWdCbW5CLFFBQWhCLEVBQTBCN0MsUUFBMUIsRUFBbUM7QUFDekR0a0Isa0JBQU1nVixjQUFOOztBQUVBLGdCQUFJdVEsSUFBSTNxQixRQUFKLE9BQW1CNkssd0JBQXZCLEVBQXNDO0FBQ2xDd3FCLHdCQUFRLEtBQVIsRUFBZSxJQUFmO0FBQ0gsYUFGRCxNQUVPO0FBQ0hBLHdCQUFRLEtBQVI7QUFDSDtBQUNKLFNBdENVO0FBdUNYLGtDQUEyQiw4QkFBU2p3QixLQUFULEVBQWdCbW5CLFFBQWhCLEVBQTBCN0MsUUFBMUIsRUFBbUM7QUFDMUR0a0Isa0JBQU1nVixjQUFOOztBQUVBLGdCQUFHdVEsSUFBSTNxQixRQUFKLE9BQW1CNkssd0JBQXRCLEVBQW9DO0FBQ2hDd3FCLHdCQUFRLElBQVI7QUFDSDtBQUNKLFNBN0NVOztBQStDWCwrQkFBd0IsMkJBQVNqd0IsS0FBVCxFQUFnQm1uQixRQUFoQixFQUEwQjdDLFFBQTFCLEVBQW1DO0FBQ3ZELG9CQUFPdGtCLE1BQU0wd0IsT0FBYjtBQUNJLHFCQUFLLEVBQUw7QUFBWTtBQUNSMXdCLDBCQUFNZ1YsY0FBTjtBQUNBbWI7QUFDQTtBQUNKLHFCQUFLLEVBQUw7QUFBVTtBQUNObndCLDBCQUFNZ1YsY0FBTjtBQUNBaGIseUJBQUssQ0FBTCxFQUFRLElBQVI7QUFDQTtBQUNKLHFCQUFLLEVBQUw7QUFBVTtBQUNOZ0csMEJBQU1nVixjQUFOO0FBQ0FoYix5QkFBSyxDQUFMLEVBQVEsS0FBUjtBQUNBO0FBQ0oscUJBQUssRUFBTDtBQUFVO0FBQ05nRywwQkFBTWdWLGNBQU47QUFDQXZiLDJCQUFPLElBQVA7QUFDQTtBQUNKLHFCQUFLLEVBQUw7QUFBVTtBQUNOdUcsMEJBQU1nVixjQUFOO0FBQ0F2YiwyQkFBTyxLQUFQO0FBQ0E7QUFwQlI7QUFzQkgsU0F0RVU7QUF1RVgsbUNBQTRCLCtCQUFTdUcsS0FBVCxFQUFnQm1uQixRQUFoQixFQUEwQjdDLFFBQTFCLEVBQW1DO0FBQzNEdGtCLGtCQUFNZ1YsY0FBTjtBQUNBeWIsK0JBQW1CendCLE1BQU1zcUIsS0FBekIsRUFBZ0N0cUIsTUFBTTZ1QixLQUF0QztBQUNBLG1CQUFPLEtBQVA7QUFDSDtBQTNFVSxLQUFmOztBQStFQSxXQUFPLFNBQWMsNEJBQWF2SixVQUFiLEVBQXlCLE1BQXpCLEVBQWlDQSxXQUFXdFgsRUFBNUMsRUFBZ0RuTyxNQUFoRCxFQUF3RHFuQixVQUF4RCxFQUFvRUcsV0FBcEUsRUFBaUYsSUFBakYsQ0FBZCxFQUFzRztBQUN6R3ZaLGtDQUEwQixvQ0FBWTtBQUNsQyxtQkFBT2dpQixZQUFZamdCLElBQVosQ0FBaUIsOEJBQWpCLEVBQWlEMEMsR0FBakQsRUFBUDtBQUNILFNBSHdHO0FBSXpHdEUsZ0JBQVEsZ0JBQVVKLGNBQVYsRUFBMEI7QUFDOUIwWCxrQkFBTTFYLGNBQU47QUFDQWdpQixxQkFBUyxvQkFBT0MsWUFBWWpnQixJQUFaLENBQWlCLFNBQWpCLENBQVAsRUFBb0NoQyxjQUFwQyxDQUFUO0FBQ0EraEIsdUJBQVcsb0JBQVNFLFlBQVlqZ0IsSUFBWixDQUFpQixTQUFqQixDQUFULEVBQXNDaEMsY0FBdEMsQ0FBWDs7QUFHQTBYLGdCQUFJanVCLEVBQUosQ0FBT2lQLHVCQUFQLEVBQXFCLFVBQVMvTyxJQUFULEVBQWM7QUFDL0Isb0JBQUdBLFFBQVFBLEtBQUtteEIsUUFBaEIsRUFBeUI7QUFDckIsd0JBQUdueEIsS0FBS214QixRQUFMLEtBQWtCbGpCLHdCQUFyQixFQUFtQztBQUMvQndxQixnQ0FBUSxLQUFSLEVBQWUsSUFBZjtBQUNILHFCQUZELE1BRUs7QUFDREEsZ0NBQVEsS0FBUjtBQUNIO0FBQ0o7QUFDSixhQVJEO0FBU0g7QUFuQndHLEtBQXRHLENBQVA7QUFxQkgsQ0EvS0Q7O2tCQW1MZU4sSTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3TWY7Ozs7QUFJQSxJQUFNaEMsZUFBZSxTQUFmQSxZQUFlLENBQVMzZixFQUFULEVBQVk7QUFDN0IsV0FBTyx5RUFBdUVBLEVBQXZFLEdBQTBFLElBQTFFLEdBQ0ssK0JBREwsR0FFSywwQkFGTCxHQUdTLDJEQUhULEdBR3FFQSxFQUhyRSxHQUd3RSxJQUh4RSxHQUlTLFFBSlQsR0FLUyxzQkFMVCxHQU1TLFFBTlQsR0FPSyxRQVBMLEdBUUMsUUFSUjtBQVNILENBVkQ7a0JBV2UyZixZIiwiZmlsZSI6Im92ZW5wbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXJcIjogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHtcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJyk7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9vdmVucGxheWVyLmpzXCIpO1xuIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGNoYXJzZXQgXFxcIlVURi04XFxcIjsub3ZwLXdyYXBwZXJ7cG9zaXRpb246cmVsYXRpdmU7bWF4LWhlaWdodDoxMDAlO292ZXJmbG93OmhpZGRlbjt6b29tOjEgIWltcG9ydGFudDt3aWR0aDoxMDAlO2Rpc3BsYXk6YmxvY2s7YmFja2dyb3VuZC1jb2xvcjojMDAwOy1tb3otYm94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveDtjb2xvcjojZWVlO2ZvbnQtZmFtaWx5OidOb3RvIFNhbnMnLHNhbnMtc2VyaWY7Zm9udC1zaXplOjExcHg7bGluZS1oZWlnaHQ6MS4zO2ZvbnQtd2VpZ2h0Om5vcm1hbDtvdXRsaW5lOjB9Lm92cC13cmFwcGVyIG9iamVjdHt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5vdnAtd3JhcHBlcjpiZWZvcmUsLm92cC13cmFwcGVyOmFmdGVyey1tb3otYm94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ub3ZwLXdyYXBwZXIgKiwub3ZwLXdyYXBwZXIgKjpiZWZvcmUsLm92cC13cmFwcGVyICo6YWZ0ZXJ7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94fS5vdnAtd3JhcHBlci5vdnAtZnVsbHNjcmVlbntoZWlnaHQ6MTAwJSAhaW1wb3J0YW50fS5vdnAtd3JhcHBlci5vdnAtYXV0b2hpZGV7Y3Vyc29yOm5vbmV9Lm92cC13cmFwcGVyLm92cC1hdXRvaGlkZSAub3ZwLWdyYWRpZW50LXRvcCwub3ZwLXdyYXBwZXIub3ZwLWF1dG9oaWRlIC5vdnAtZ3JhZGllbnQtYm90dG9tLC5vdnAtd3JhcHBlci5vdnAtYXV0b2hpZGUgLm92cC1ib3R0b20tcGFuZWx7b3BhY2l0eTowfS5vdnAtd3JhcHBlci5vdnAtYXV0b2hpZGUgLm92cC1wcm9ncmVzc2Jhci1jb250YWluZXIsLm92cC13cmFwcGVyLm92cC1hdXRvaGlkZSAub3ZwLWNvbnRyb2xzIC5vdnAtYnV0dG9ue2N1cnNvcjpub25lfS5vdnAtd3JhcHBlci5vdnAtYXV0b2hpZGUgLm92cC1jYXB0aW9uLXRleHQtY29udGFpbmVye2JvdHRvbToyNXB4fS5vdnAtd3JhcHBlciAub3ZwLXJhdGlve3BhZGRpbmctYm90dG9tOjU2LjI1JX0ub3ZwLXBsYXllcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDt3aWR0aDoxMDAlfS5vdnAtcGxheWVyIC5vdnAtbWVkaWEtZWxlbWVudC1jb250YWluZXJ7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5vdnAtcGxheWVyIC5vdnAtbWVkaWEtZWxlbWVudC1jb250YWluZXI+Knt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5vdnAtcGxheWVyIC5vdnAtdWl7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0ub3ZwLWJ1dHRvbntkaXNwbGF5OmlubGluZS1ibG9jaztib3JkZXI6bm9uZTtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50O3BhZGRpbmc6MDtjb2xvcjppbmhlcml0O3RleHQtYWxpZ246aW5oZXJpdDtvdmVyZmxvdzpoaWRkZW47Zm9udC13ZWlnaHQ6MTAwfS5vdnAtYnV0dG9uOmZvY3VzLC5vdnAtYnV0dG9ue291dGxpbmU6MH0ub3ZwLWdyYWRpZW50LXRvcCwub3ZwLWdyYWRpZW50LWJvdHRvbXt3aWR0aDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtY29sb3I6IzEyMTIxYztwb2ludGVyLWV2ZW50czpub25lO29wYWNpdHk6LjM7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTt0cmFuc2l0aW9uOm9wYWNpdHkgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpfS5vdnAtZ3JhZGllbnQtYm90dG9te2hlaWdodDo1MHB4O2JvdHRvbTowO3otaW5kZXg6MjJ9Lm92cC1zcGlubmVyLWNvbnRhaW5lcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtkaXNwbGF5Om5vbmV9Lm92cC1zcGlubmVyLWNvbnRhaW5lciAub3ZwLXNwaW5uZXJ7d2lkdGg6NzBweDtoZWlnaHQ6MThweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlO21hcmdpbi10b3A6LTlweDttYXJnaW4tbGVmdDotMzVweDt0ZXh0LWFsaWduOmNlbnRlcn0ub3ZwLXNwaW5uZXItY29udGFpbmVyIC5vdnAtc3Bpbm5lcj5kaXZ7d2lkdGg6MThweDtoZWlnaHQ6MThweDtiYWNrZ3JvdW5kLWNvbG9yOiM1MGUzYzI7Ym9yZGVyLXJhZGl1czoxMDAlO2Rpc3BsYXk6aW5saW5lLWJsb2NrOy13ZWJraXQtYW5pbWF0aW9uOnNrLWJvdW5jZWRlbGF5IDEuNHMgaW5maW5pdGUgZWFzZS1pbi1vdXQgYm90aDthbmltYXRpb246c2stYm91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RofS5vdnAtc3Bpbm5lci1jb250YWluZXIgLm92cC1zcGlubmVyIC5ib3VuY2Uxey13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0wLjMyczthbmltYXRpb24tZGVsYXk6LTAuMzJzfS5vdnAtc3Bpbm5lci1jb250YWluZXIgLm92cC1zcGlubmVyIC5ib3VuY2Uyey13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0wLjE2czthbmltYXRpb24tZGVsYXk6LTAuMTZzfUAtd2Via2l0LWtleWZyYW1lcyBzay1ib3VuY2VkZWxheXswJSw4MCUsMTAwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKX00MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSl9fUBrZXlmcmFtZXMgc2stYm91bmNlZGVsYXl7MCUsODAlLDEwMCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfTQwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9fS5vdnAtbWVzc2FnZS1ib3h7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Lm92cC1tZXNzYWdlLWJveCAub3ZwLW1lc3NhZ2UtY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDo2MHB4O3dpZHRoOjEwMCU7cGFkZGluZzowIDEycHg7dGV4dC1hbGlnbjpjZW50ZXJ9Lm92cC1tZXNzYWdlLWJveCAub3ZwLW1lc3NhZ2UtY29udGFpbmVyIC5vdnAtbWVzc2FnZS10ZXh0e2ZvbnQtc2l6ZToxNDAlO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwwLjUpO2NvbG9yOiNmZmY7cGFkZGluZzouMWVtIC4zZW07d29yZC13cmFwOmJyZWFrLXdvcmQ7bGluZS1oZWlnaHQ6MS41ZW19Lm92cC1iaWdidXR0b24tY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5vdnAtYmlnYnV0dG9uLWNvbnRhaW5lciAub3ZwLWJpZ2J1dHRvbntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlO3dpZHRoOjgwcHg7aGVpZ2h0OjgwcHg7bWFyZ2luLXRvcDotNDBweDttYXJnaW4tbGVmdDotNDBweDt0ZXh0LWFsaWduOmNlbnRlcn0ub3ZwLWJpZ2J1dHRvbi1jb250YWluZXIgLm92cC1iaWdidXR0b24ub3ZwLWJpZ2J1dHRvbi1wbGF5e2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1wbGF5LWxhcmdlLnN2Z1wiKSkgKyBcIik7YmFja2dyb3VuZC1zaXplOjEwMCV9Lm92cC1iaWdidXR0b24tY29udGFpbmVyIC5vdnAtYmlnYnV0dG9uLm92cC1iaWdidXR0b24tcGF1c2V7YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXN0b3AtbGFyZ2Uuc3ZnXCIpKSArIFwiKTtiYWNrZ3JvdW5kLXNpemU6MTAwJX0ub3ZwLWJpZ2J1dHRvbi1jb250YWluZXIgLm92cC1iaWdidXR0b24ub3ZwLWJpZ2J1dHRvbi1yZXBsYXl7YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXJlLWxhcmdlLnN2Z1wiKSkgKyBcIik7YmFja2dyb3VuZC1zaXplOjEwMCV9Lm92cC1zZXR0aW5nLXBhbmVse3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTo1NXB4O3JpZ2h0OjEycHg7b3ZlcmZsb3cteTphdXRvO3dpZHRoOjI2MHB4O2ZvbnQtc2l6ZToxMjAlO3VzZXItc2VsZWN0Om5vbmU7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI4LDI4LDI4LDAuOSk7dGV4dC1zaGFkb3c6MCAwIDJweCByZ2JhKDAsMCwwLDAuNSl9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy10aXRsZSwub3ZwLXNldHRpbmctcGFuZWwgLm92cC1zZXR0aW5nLWl0ZW17d2lkdGg6MTAwJTtoZWlnaHQ6MzhweDtsaW5lLWhlaWdodDozOHB4O2NvbG9yOiNlZWU7Y3Vyc29yOnBvaW50ZXI7b3V0bGluZTpub25lfS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctdGl0bGUtY29udGFpbmVyIC5vdnAtc2V0dGluZy10aXRsZSAub3ZwLXNldHRpbmctdGl0bGUtdGl0bGV7cGFkZGluZy1sZWZ0OjEycHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy10aXRsZS1jb250YWluZXIgLm92cC1zZXR0aW5nLXRpdGxlIC5vdnAtc2V0dGluZy10aXRsZS1wcmV2aWNvbntwYWRkaW5nOjAgMCAwIDEycHg7bWFyZ2luLXJpZ2h0Oi02cHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lciAub3ZwLXNldHRpbmctaXRlbTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsMC4xKX0ub3ZwLXNldHRpbmctcGFuZWwgLm92cC1zZXR0aW5nLWl0ZW0tY29udGFpbmVyIC5vdnAtc2V0dGluZy1pdGVtIC5vdnAtc2V0dGluZy1pdGVtLXRpdGxle3BhZGRpbmctbGVmdDoxMnB4fS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbS1jb250YWluZXIgLm92cC1zZXR0aW5nLWl0ZW0gLm92cC1zZXR0aW5nLWl0ZW0tbmV4dGljb257ZmxvYXQ6cmlnaHQ7cGFkZGluZy1yaWdodDoxMnB4O21hcmdpbi1sZWZ0Oi02cHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lciAub3ZwLXNldHRpbmctaXRlbSBzcGFuLm92cC1zZXR0aW5nLWl0ZW0tdmFsdWV7ZmxvYXQ6cmlnaHQ7cGFkZGluZy1yaWdodDoxMnB4fS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbS1jb250YWluZXIgLm92cC1zZXR0aW5nLWl0ZW0ub3ZwLXNldHRpbmctaXRlbS12YWx1ZSAub3ZwLXNldHRpbmctaXRlbS10aXRsZXttYXJnaW4tbGVmdDotNnB4fS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbS1jb250YWluZXIgLm92cC1zZXR0aW5nLWl0ZW0ub3ZwLXNldHRpbmctaXRlbS12YWx1ZSAub3ZwLXNldHRpbmctaXRlbS1jaGVja2Vke3BhZGRpbmctbGVmdDoxMnB4O3Zpc2liaWxpdHk6aGlkZGVufS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbS1jb250YWluZXIgLm92cC1zZXR0aW5nLWl0ZW0ub3ZwLXNldHRpbmctaXRlbS12YWx1ZSAub3ZwLXNldHRpbmctaXRlbS1jaGVja2VkLm92cC1zaG93e3Zpc2liaWxpdHk6dmlzaWJsZX0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbHtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjBweDtyaWdodDowcHg7Ym90dG9tOjBweDtoZWlnaHQ6NTBweDt6LWluZGV4OjYwOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuMjVzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7dHJhbnNpdGlvbjpvcGFjaXR5IC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKX0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLXByb2dyZXNzYmFyLWNvbnRhaW5lcntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCU7Ym90dG9tOjUwcHg7aGVpZ2h0OjRweDtjdXJzb3I6cG9pbnRlcn0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLXByb2dyZXNzYmFyLWNvbnRhaW5lciAub3ZwLXByb2dyZXNzYmFyLXBhZGRpbmd7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtoZWlnaHQ6MTZweDtib3R0b206MDt6LWluZGV4OjI4fS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtY29udHJvbHN7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7d2lkdGg6MTAwJTtoZWlnaHQ6NTBweDt0ZXh0LWFsaWduOmxlZnR9Lm92cC1jb250cm9scy1jb250YWluZXIgLm92cC1ib3R0b20tcGFuZWwgLm92cC1jb250cm9scyAub3ZwLWJ1dHRvbnttaW4td2lkdGg6MzBweDtoZWlnaHQ6MzBweDtjdXJzb3I6cG9pbnRlcn0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLWNvbnRyb2xzIC5vdnAtbGVmdC1jb250cm9sc3tmbG9hdDpsZWZ0O2hlaWdodDoxMDAlfS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtY29udHJvbHMgLm92cC1yaWdodC1jb250cm9sc3tmbG9hdDpyaWdodDtoZWlnaHQ6MTAwJX0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLWNvbnRyb2xzIC5vdnAtcmlnaHQtY29udHJvbHMgLm92cC1zZXR0aW5nLWJ1dHRvbntwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTBweDttYXJnaW4tcmlnaHQ6MTJweH0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLWNvbnRyb2xzIC5vdnAtcmlnaHQtY29udHJvbHMgLm92cC1zZXR0aW5nLWJ1dHRvbj5pe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1zaXplOjEwMCU7YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXNldHRpbmcuc3ZnXCIpKSArIFwiKX0ub3ZwLXByb2dyZXNzYmFye3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3otaW5kZXg6MzE7b3V0bGluZTpub25lfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wbGF5LWJhY2tncm91bmQtY29sb3J7YmFja2dyb3VuZC1jb2xvcjojNTBlM2MyfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzcy1saXN0e3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoxMDAlO2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwwLjIpO3otaW5kZXg6Mzl9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzLWxpc3QgLm92cC1sb2FkLXByb2dyZXNzLC5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzcy1saXN0IC5vdnAtcGxheS1wcm9ncmVzcywub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3MtbGlzdCAub3ZwLWhvdmVyLXByb2dyZXNze3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtib3R0b206MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlOy1tb3otdHJhbnNmb3JtLW9yaWdpbjowIDA7LW1zLXRyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDB9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzLWxpc3QgLm92cC1wbGF5LXByb2dyZXNze3dpZHRoOjA7ei1pbmRleDozNDstd2Via2l0LXRyYW5zaXRpb246d2lkdGggLjFzIGVhc2U7dHJhbnNpdGlvbjp3aWR0aCAuMXMgZWFzZX0ub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3MtbGlzdCAub3ZwLWxvYWQtcHJvZ3Jlc3N7d2lkdGg6MDt6LWluZGV4OjMzO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwwLjUpOy13ZWJraXQtdHJhbnNpdGlvbjp3aWR0aCAuNXMgZWFzZTt0cmFuc2l0aW9uOndpZHRoIC41cyBlYXNlfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzcy1saXN0IC5vdnAtaG92ZXItcHJvZ3Jlc3N7bGVmdDowO3dpZHRoOjA7ei1pbmRleDozNTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsMC42KX0ub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3NiYXIta25vYi1jb250YWluZXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOi01cHg7bGVmdDowcHg7ei1pbmRleDo0MzstbW96LXRyYW5zaXRpb246LW1vei10cmFuc2Zvcm0gLjFzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7LXdlYmtpdC10cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4xcyBjdWJpYy1iZXppZXIoLjQsIDAsIDEsIDEpOy1tcy10cmFuc2l0aW9uOi1tcy10cmFuc2Zvcm0gLjFzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjFzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7LW1vei10cmFuc2Zvcm06c2NhbGUoMCk7LW1zLXRyYW5zZm9ybTpzY2FsZSgwKTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzYmFyLWtub2ItY29udGFpbmVyIC5vdnAtcHJvZ3Jlc3NiYXIta25vYnt3aWR0aDoxNHB4O2hlaWdodDoxNHB4O2JvcmRlci1yYWRpdXM6N3B4Oy13ZWJraXQtdHJhbnNpdGlvbjp3aWR0aCAuMXMgZWFzZTt0cmFuc2l0aW9uOndpZHRoIC4xcyBlYXNlfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzc2Jhci10aW1le2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MTVweDtsZWZ0OmF1dG87d2lkdGg6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjgsMjgsMjgsMC45KTtib3JkZXItcmFkaXVzOjJweDtwYWRkaW5nOjVweCA5cHg7Zm9udC1zaXplOjExOCU7bGluZS1oZWlnaHQ6MTVweDt1c2VyLXNlbGVjdDpub25lfS5vdnAtcHJvZ3Jlc3NiYXItaG92ZXIgLm92cC1wcm9ncmVzc2Jhci1rbm9iLWNvbnRhaW5lcnstbW96LXRyYW5zZm9ybTpub25lOy1tcy10cmFuc2Zvcm06bm9uZTstd2Via2l0LXRyYW5zZm9ybTpub25lO3RyYW5zZm9ybTpub25lOy1tb3otdHJhbnNpdGlvbjotbW96LXRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTstd2Via2l0LXRyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjFzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7LW1zLXRyYW5zaXRpb246LW1zLXRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKX0ub3ZwLXByb2dyZXNzYmFyLWhvdmVyIC5vdnAtcHJvZ3Jlc3NiYXItdGltZXtkaXNwbGF5OmlubGluZS1ibG9ja30ub3ZwLW9uLWVycm9yIC5vdnAtcHJvZ3Jlc3NiYXItdGltZXtkaXNwbGF5Om5vbmV9Lm92cC1wbGF5LWJ1dHRvbntwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTBweDttYXJnaW4tbGVmdDoxNXB4fS5vdnAtcGxheS1idXR0b24+aXtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JhY2tncm91bmQtc2l6ZToxMDAlfS5vdnAtcGxheS1idXR0b24gLm92cC1wbGF5LWJ1dHRvbi1wbGF5aWNvbntiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItcGxheS5zdmdcIikpICsgXCIpfS5vdnAtcGxheS1idXR0b24gLm92cC1wbGF5LWJ1dHRvbi1wYXVzZWljb257YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXN0b3Auc3ZnXCIpKSArIFwiKX0ub3ZwLXZvbHVtZS1jb250cm9sbGVye2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxMHB4O21hcmdpbi1sZWZ0OjEycHg7aGVpZ2h0OjMwcHh9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1idXR0b24+aXtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JhY2tncm91bmQtc2l6ZToxMDAlfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtYnV0dG9uIC5vdnAtdm9sdW1lLWJ1dHRvbi1iaWdpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci12b2x1bWUuc3ZnXCIpKSArIFwiKX0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLWJ1dHRvbiAub3ZwLXZvbHVtZS1idXR0b24tc21hbGxpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci12b2x1bWUtMi5zdmdcIikpICsgXCIpfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtYnV0dG9uIC5vdnAtdm9sdW1lLWJ1dHRvbi1tdXRlaWNvbntiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItdm9sdW1lLW11dGUuc3ZnXCIpKSArIFwiKX0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MHB4O2hlaWdodDoxMDAlO292ZXJmbG93OmhpZGRlbjtjdXJzb3I6cG9pbnRlcjt1c2VyLXNlbGVjdDpub25lO291dGxpbmU6bm9uZTstbW96LXRyYW5zaXRpb246bWFyZ2luIC4ycyBjdWJpYy1iZXppZXIoLjQsIDAsIDEsIDEpLHdpZHRoIC4ycyBjdWJpYy1iZXppZXIoLjQsIDAsIDEsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSksd2lkdGggLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7dHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSksd2lkdGggLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSl9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyLmFjdGl2ZXt3aWR0aDo3MHB4O21hcmdpbi1sZWZ0OjhweDttYXJnaW4tcmlnaHQ6MDstbW96LXRyYW5zaXRpb246bWFyZ2luIC4ycyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpLHdpZHRoIC4ycyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSksd2lkdGggLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7dHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSksd2lkdGggLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSl9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlcntoZWlnaHQ6MTAwJTtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItYmcsLm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItdmFsdWV7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpibG9jaztsZWZ0OjA7dG9wOjUwJTtoZWlnaHQ6NHB4O21hcmdpbi10b3A6LTJweDtib3JkZXItcmFkaXVzOjEwcHh9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItYmd7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kOiNmZmZ9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItdmFsdWV7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kOiM1MGUzYzJ9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItaGFuZGxle3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDozMHB4O3dpZHRoOjEycHg7aGVpZ2h0OjEycHg7Ym9yZGVyLXJhZGl1czo2cHg7bWFyZ2luLXRvcDotNnB4O2JhY2tncm91bmQ6I2ZmZn0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci1oYW5kbGU6YmVmb3JlLC5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lciAub3ZwLXZvbHVtZS1zaWxkZXIgLm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZTphZnRlcntjb250ZW50OicnO3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6bm9uZTt0b3A6NTAlO2hlaWdodDo0cHg7bWFyZ2luLXRvcDotMnB4O3dpZHRoOjgwcHg7ei1pbmRleDotMX0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci1oYW5kbGU6YmVmb3Jle2xlZnQ6LTU4cHg7YmFja2dyb3VuZDojNTBlM2MyfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lciAub3ZwLXZvbHVtZS1zaWxkZXIgLm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZTphZnRlcntsZWZ0OjZweDtiYWNrZ3JvdW5kOiNmZmZ9Lm92cC10aW1lLWRpc3BsYXl7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7dG9wOjEwcHg7bWFyZ2luLWxlZnQ6MTJweDtoZWlnaHQ6MzBweDt3aGl0ZS1zcGFjZTpub3dyYXA7bGluZS1oZWlnaHQ6MzBweDt2ZXJ0aWNhbC1hbGlnbjp0b3A7Zm9udC1zaXplOjE0cHg7dXNlci1zZWxlY3Q6bm9uZX0ub3ZwLXRpbWUtZGlzcGxheSAub3ZwLXRpbWUtY3VycmVudCwub3ZwLXRpbWUtZGlzcGxheSAub3ZwLXRpbWUtc2VwYXJhdG9yLC5vdnAtdGltZS1kaXNwbGF5IC5vdnAtdGltZS1kdXJhdGlvbntjb2xvcjojZmZmfS5vdnAtdGltZS1kaXNwbGF5IC5vdnAtbGl2ZS1iYWRnZXtvcGFjaXR5OjE7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6YXV0bztmb250LXNpemU6MTRweH0ub3ZwLXRpbWUtZGlzcGxheSAub3ZwLWxpdmUtYmFkZ2U6YmVmb3Jle2JhY2tncm91bmQ6I2ZmMDAwMDtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LTJweDt3aWR0aDo2cHg7aGVpZ2h0OjZweDttYXJnaW4tcmlnaHQ6NXB4O2NvbnRlbnQ6Jyc7Ym9yZGVyLXJhZGl1czo2cHh9Lm92cC10aW1lLWRpc3BsYXkgLm92cC1saXZlLWJhZGdlIC5vdnAtbGl2ZS1iYWRnZS1sb3dsYXRlbmN5e2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1yaWdodDo1cHh9Lm92cC1jb250ZXh0LXBhbmVsey1tb3otYm94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveDtkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO292ZXJmbG93OmhpZGRlbjt3aWR0aDoyMDBweDtwYWRkaW5nOjZweCAwO2JhY2tncm91bmQ6cmdiYSgyOCwyOCwyOCwwLjkpO3RleHQtc2hhZG93OjAgMCAycHggcmdiYSgwLDAsMCwwLjUpO3otaW5kZXg6MjMwMDtmb250LWZhbWlseTpSb2JvdG8sQXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6MTAwO3VzZXItc2VsZWN0Om5vbmV9Lm92cC1jb250ZXh0LXBhbmVsOmJlZm9yZSwub3ZwLWNvbnRleHQtcGFuZWw6YWZ0ZXJ7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94fS5vdnAtY29udGV4dC1wYW5lbCAqLC5vdnAtY29udGV4dC1wYW5lbCAqOmJlZm9yZSwub3ZwLWNvbnRleHQtcGFuZWwgKjphZnRlcnstbW96LWJveC1zaXppbmc6Ym9yZGVyLWJveDstd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm92cC1jb250ZXh0LXBhbmVsIC5vdnAtY29udGV4dC1pdGVte3dpZHRoOjEwMCU7aGVpZ2h0OjM4cHg7cGFkZGluZy1sZWZ0OjEycHg7bGluZS1oZWlnaHQ6MzhweDtjb2xvcjojZWVlO2N1cnNvcjpwb2ludGVyO291dGxpbmU6bm9uZTtmb250LXNpemU6MTIwJX0ub3ZwLWNvbnRleHQtcGFuZWwgLm92cC1jb250ZXh0LWl0ZW06aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LDAuMSl9Lm92cC1mdWxsc2NyZWVuLWJ1dHRvbntwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTBweDttYXJnaW4tcmlnaHQ6MTVweH0ub3ZwLWZ1bGxzY3JlZW4tYnV0dG9uPml7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLXNpemU6MTAwJX0ub3ZwLWZ1bGxzY3JlZW4tYnV0dG9uIC5vdnAtZnVsbHNjcmVlbi1idXR0b24tZXhwYW5kaWNvbntiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItZnVsbHNjcmVlbi1leHBhbmQuc3ZnXCIpKSArIFwiKX0ub3ZwLWZ1bGxzY3JlZW4tYnV0dG9uIC5vdnAtZnVsbHNjcmVlbi1idXR0b24tY29tcHJlc3NpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1mdWxsc2NyZWVuLWNvbXByZXNzLnN2Z1wiKSkgKyBcIil9QGtleWZyYW1lcyBmYWRle2Zyb217b3BhY2l0eTouM301NSV7b3BhY2l0eToxfTc1JXtvcGFjaXR5OjF9dG97b3BhY2l0eTouM319QC13ZWJraXQta2V5ZnJhbWVzIHNoYWtle2Zyb20sdG97LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwgMCwgMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsIDAsIDApfTEwJSwzMCUsNTAlLDcwJSw5MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCl9MjAlLDQwJSw2MCUsODAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwcHgsIDAsIDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKX19QGtleWZyYW1lcyBzaGFrZXtmcm9tLHRvey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsIDAsIDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLCAwLCAwKX0xMCUsMzAlLDUwJSw3MCUsOTAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKC0xMHB4LCAwLCAwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApfTIwJSw0MCUsNjAlLDgwJXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTBweCwgMCwgMCl9fS5vdnAtcGxheWVyIC5zaGFrZXstd2Via2l0LWFuaW1hdGlvbi1uYW1lOnNoYWtlO2FuaW1hdGlvbi1uYW1lOnNoYWtlfUAtd2Via2l0LWtleWZyYW1lcyBib3VuY2VJbntmcm9tLDIwJSw0MCUsNjAlLDgwJSx0b3std2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246Y3ViaWMtYmV6aWVyKC4yMTUsIC42MSwgLjM1NSwgMSk7YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoLjIxNSwgLjYxLCAuMzU1LCAxKX0wJXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCguNSwgLjUsIC41KTt0cmFuc2Zvcm06c2NhbGUzZCguNSwgLjUsIC41KX0yMCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCgxLjEsIDEuMSwgMS4xKTt0cmFuc2Zvcm06c2NhbGUzZCgxLjEsIDEuMSwgMS4xKX00MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCguOSwgLjksIC45KTt0cmFuc2Zvcm06c2NhbGUzZCguOSwgLjksIC45KX02MCV7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoMS4wMywgMS4wMywgMS4wMyk7dHJhbnNmb3JtOnNjYWxlM2QoMS4wMywgMS4wMywgMS4wMyl9ODAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoLjk3LCAuOTcsIC45Nyk7dHJhbnNmb3JtOnNjYWxlM2QoLjk3LCAuOTcsIC45Nyl9dG97b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoMSwgMSwgMSk7dHJhbnNmb3JtOnNjYWxlM2QoMSwgMSwgMSl9fUBrZXlmcmFtZXMgYm91bmNlSW57ZnJvbSwyMCUsNDAlLDYwJSw4MCUsdG97LXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOmN1YmljLWJlemllciguMjE1LCAuNjEsIC4zNTUsIDEpO2FuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246Y3ViaWMtYmV6aWVyKC4yMTUsIC42MSwgLjM1NSwgMSl9MCV7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoLjMsIC4zLCAuMyk7dHJhbnNmb3JtOnNjYWxlM2QoLjMsIC4zLCAuMyl9MjAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoMS4xLCAxLjEsIDEuMSk7dHJhbnNmb3JtOnNjYWxlM2QoMS4xLCAxLjEsIDEuMSl9NDAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoLjksIC45LCAuOSk7dHJhbnNmb3JtOnNjYWxlM2QoLjksIC45LCAuOSl9NjAle29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKDEuMDMsIDEuMDMsIDEuMDMpO3RyYW5zZm9ybTpzY2FsZTNkKDEuMDMsIDEuMDMsIDEuMDMpfTgwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKC45NywgLjk3LCAuOTcpO3RyYW5zZm9ybTpzY2FsZTNkKC45NywgLjk3LCAuOTcpfXRve29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKDEsIDEsIDEpO3RyYW5zZm9ybTpzY2FsZTNkKDEsIDEsIDEpfX0ub3ZwLXBsYXllciAuYm91bmNlSW57LXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246Ljc1czthbmltYXRpb24tZHVyYXRpb246Ljc1czstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmJvdW5jZUluO2FuaW1hdGlvbi1uYW1lOmJvdW5jZUlufUAtd2Via2l0LWtleWZyYW1lcyBmYWRlSW57ZnJvbXtvcGFjaXR5OjB9dG97b3BhY2l0eToxfX1Aa2V5ZnJhbWVzIGZhZGVJbntmcm9te29wYWNpdHk6MH10b3tvcGFjaXR5OjF9fS5vdnAtcGxheWVyIC5mYWRlSW57LXdlYmtpdC1hbmltYXRpb24tbmFtZTpmYWRlSW47YW5pbWF0aW9uLW5hbWU6ZmFkZUlufS5vdnAtcGxheWVyIC5hbmltYXRlZHstd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjoxczthbmltYXRpb24tZHVyYXRpb246MXM7LXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOmJvdGg7YW5pbWF0aW9uLWZpbGwtbW9kZTpib3RofUBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbil7Lm92cC1wbGF5ZXIgLmFuaW1hdGVkey13ZWJraXQtYW5pbWF0aW9uOnVuc2V0ICFpbXBvcnRhbnQ7YW5pbWF0aW9uOnVuc2V0ICFpbXBvcnRhbnQ7LXdlYmtpdC10cmFuc2l0aW9uOm5vbmUgIWltcG9ydGFudDt0cmFuc2l0aW9uOm5vbmUgIWltcG9ydGFudH19Lm92cC1jYXB0aW9uLXZpZXdlcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0ub3ZwLWNhcHRpb24tdmlld2VyIC5vdnAtY2FwdGlvbi10ZXh0LWNvbnRhaW5lcntwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206NjBweDt3aWR0aDoxMDAlO3BhZGRpbmc6MCAxMnB4O3RleHQtYWxpZ246Y2VudGVyOy1tb3otdHJhbnNpdGlvbjpib3R0b20gLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjpib3R0b20gLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpO3RyYW5zaXRpb246Ym90dG9tIC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKX0ub3ZwLWNhcHRpb24tdmlld2VyIC5vdnAtY2FwdGlvbi10ZXh0LWNvbnRhaW5lciAub3ZwLWNhcHRpb24tdGV4dHtkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjIyMCU7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDgsOCw4LDAuNzUpO2JvcmRlci1yYWRpdXM6M3B4O2NvbG9yOiNmZmY7cGFkZGluZzouMWVtIC4zZW07d29yZC13cmFwOmJyZWFrLXdvcmQ7bGluZS1oZWlnaHQ6MS41ZW07dXNlci1zZWxlY3Q6bm9uZX0ub3ZwLWNhcHRpb24tYnV0dG9ue3dpZHRoOjM2cHh9Lm92cC1jYXB0aW9uLWJ1dHRvbj5pe2ZvbnQtc2l6ZToxOHB4Oy1tb3otdHJhbnNpdGlvbjpjb2xvciAuMjVzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7LXdlYmtpdC10cmFuc2l0aW9uOmNvbG9yIC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTt0cmFuc2l0aW9uOmNvbG9yIC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKX0ub3ZwLWNhcHRpb24tYWN0aXZlIC5vdnAtY2FwdGlvbi1idXR0b24+aXtjb2xvcjojRjM2NDQ2fVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXNjYXBlKHVybCkge1xuICAgIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdXJsXG4gICAgfVxuICAgIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICAgIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgICAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICAgIH1cbiAgICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gICAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgICBpZiAoL1tcIicoKSBcXHRcXG5dLy50ZXN0KHVybCkpIHtcbiAgICAgICAgcmV0dXJuICdcIicgKyB1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKSArICdcIidcbiAgICB9XG5cbiAgICByZXR1cm4gdXJsXG59XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHBhc3NpbmcgZnVuY3Rpb24gaW4gb3B0aW9ucywgdGhlbiB1c2UgaXQgZm9yIHJlc29sdmUgXCJoZWFkXCIgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvLyBVc2VmdWwgZm9yIFNoYWRvdyBSb290IHN0eWxlIGkuZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgIGluc2VydEludG86IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vXCIpLnNoYWRvd1Jvb3QgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0VGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cbiIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvfFxccyokKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuIiwiLyogZ2xvYmFscyBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXyAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19hbWRfb3B0aW9uc19fO1xyXG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIm92ZW5wbGF5ZXIvY3NzLzFhODI1NGU5NTNkNDgzMDcxZjIzNzQ3NzRlNmE4YmVlLnN2Z1wiOyIsIm1vZHVsZS5leHBvcnRzID0gXCJvdmVucGxheWVyL2Nzcy9iM2M3YTVlNTBhODRkODYzNzVmNDlmNGNjNTEwZDMzYy5zdmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwib3ZlbnBsYXllci9jc3MvZGMyNzhlN2U1YzhhMTcyZTVlN2YzNDU5NTZiZGJhZGEuc3ZnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIm92ZW5wbGF5ZXIvY3NzLzIwMTExYmQyM2JkMzM2MjMxMTg3YzZmZTcyOWZkYzUzLnN2Z1wiOyIsIm1vZHVsZS5leHBvcnRzID0gXCJvdmVucGxheWVyL2Nzcy84MjRmN2FmYjAzODk4ZDg4OGQ5ZmQzOWRkZGE0OTRlMC5zdmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwib3ZlbnBsYXllci9jc3MvYmQ0YThiZWIzY2E0ODY5NDE4ZDNhZjU4ZTA4YTY5YjEuc3ZnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIm92ZW5wbGF5ZXIvY3NzL2FjMWU1MmY5YjM4NmE4YTQ5ZjJmNmQ5OWYyYmYyOGFjLnN2Z1wiOyIsIm1vZHVsZS5leHBvcnRzID0gXCJvdmVucGxheWVyL2Nzcy85MThjYTZlZmExOGUyMGU4NWRlYjhlZTgyZmMzOTk2Ny5zdmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwib3ZlbnBsYXllci9jc3MvYzE5NjkxNmFlOTE3MDliOTg1NzY3M2Q0NDVjYzI1MTQuc3ZnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIm92ZW5wbGF5ZXIvY3NzL2FkMzU2ZDYyYWY2NDcyZDE2N2E1Mzg4MGY3NmE4MWJmLnN2Z1wiOyIsIm1vZHVsZS5leHBvcnRzID0gXCJvdmVucGxheWVyL2Nzcy82YjEyYjM4ZGFhMzJlZWRjMTA2MDNkYjNhYTQ2ZGVlYS5zdmdcIjsiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTUtMiEuL292ZW5wbGF5ZXIubGVzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTUtMiEuL292ZW5wbGF5ZXIubGVzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS01LTIhLi9vdmVucGxheWVyLmxlc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCIvL2ltcG9ydCBDYXB0aW9uTWFuYWdlciBmcm9tIFwiYXBpL2NhcHRpb24vTWFuYWdlclwiO1xuaW1wb3J0IENvbmZpZ3VyYXRvciBmcm9tIFwiYXBpL0NvbmZpZ3VyYXRvclwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IExhenlDb21tYW5kRXhlY3V0b3IgZnJvbSBcImFwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yXCI7XG5pbXBvcnQgTG9nTWFuYWdlciBmcm9tIFwidXRpbHMvbG9nZ2VyXCI7XG5pbXBvcnQgUGxheWxpc3RNYW5hZ2VyIGZyb20gXCJhcGkvcGxheWxpc3QvTWFuYWdlclwiO1xuaW1wb3J0IFByb3ZpZGVyQ29udHJvbGxlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCBQcm9taXNlLCB7cmVzb2x2ZWR9IGZyb20gXCJhcGkvc2hpbXMvcHJvbWlzZVwiO1xuaW1wb3J0IHtSRUFEWSwgRVJST1IsIElOSVRfRVJST1IsIERFU1RST1ksIE5FVFdPUktfVU5TVEFCTEVELCBQTEFZRVJfRklMRV9FUlJPUiwgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgb2JqZWN0IGNvbm5lY3RzIFVJIHRvIHRoZSBwcm92aWRlci5cbiAqIEBwYXJhbSAgIHtvYmplY3R9ICAgIGNvbnRhaW5lciAgZG9tIGVsZW1lbnRcbiAqXG4gKiAqL1xuXG5jb25zdCBBcGkgPSBmdW5jdGlvbihjb250YWluZXIpe1xuICAgIGxldCBsb2dNYW5hZ2VyID0gTG9nTWFuYWdlcigpO1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbW092ZW5QbGF5ZXJdXSB2LlwiKyB2ZXJzaW9uKTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgbG9hZGVkLlwiKTtcbiAgICAvL2xldCBjYXB0aW9uTWFuYWdlciA9IENhcHRpb25NYW5hZ2VyKHRoYXQpO1xuICAgXG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcigpO1xuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcbiAgICBsZXQgY3VycmVudFByb3ZpZGVyID0gXCJcIjtcbiAgICBsZXQgcGxheWVyQ29uZmlnID0gXCJcIjtcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcblxuICAgIGNvbnN0IGluaXRQcm92aWRlciA9IGZ1bmN0aW9uKGxhc3RQbGF5UG9zaXRpb24pe1xuICAgICAgICBjb25zdCBwaWNrUXVhbGl0eUZyb21Tb3VyY2UgPSAoc291cmNlcykgPT57XG4gICAgICAgICAgICB2YXIgcXVhbGl0eSA9IDA7XG4gICAgICAgICAgICBpZiAoc291cmNlcykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpKS50aGVuKFByb3ZpZGVycyA9PiB7XG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tRdWFsaXR5RnJvbVNvdXJjZShwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coIFwiY3VycmVudCBzb3VyY2UgaW5kZXggOiBcIisgY3VycmVudFNvdXJjZUluZGV4KTtcblxuICAgICAgICAgICAgLy9DYWxsIFByb3ZpZGVyLlxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpO1xuXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpID09PSBQUk9WSURFUl9SVE1QKXtcbiAgICAgICAgICAgICAgICAvL0lmIHByb3ZpZGVyIHR5cGUgaXMgUlRNUCwgd2UgYWNjZXB0cyBSdG1wRXhwYW5zaW9uLlxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhhdCwgQXBpUnRtcEV4cGFuc2lvbihjdXJyZW50UHJvdmlkZXIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9UaGlzIHBhc3NlcyB0aGUgZXZlbnQgY3JlYXRlZCBieSB0aGUgUHJvdmlkZXIgdG8gQVBJLlxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLm9uKFwiYWxsXCIsIGZ1bmN0aW9uKG5hbWUsIGRhdGEpe1xuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihuYW1lLCBkYXRhKTtcblxuICAgICAgICAgICAgICAgIC8vQXV0byBuZXh0IHNvdXJjZSB3aGVuIHBsYXllciBsb2FkIHdhcyBmYWlsIGJ5IGFtaXNzIHNvdXJjZS5cbiAgICAgICAgICAgICAgICBpZiggKG5hbWUgPT09IEVSUk9SICYmIChkYXRhLmNvZGUgPT09IFBMQVlFUl9GSUxFX0VSUk9SIHx8IHBhcnNlSW50KGRhdGEuY29kZS8xMDApID09PSA1KSl8fCBuYW1lID09PSBORVRXT1JLX1VOU1RBQkxFRCApe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFF1YWxpdHkgPSB0aGF0LmdldEN1cnJlbnRRdWFsaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRRdWFsaXR5LmluZGV4KzEgPCB0aGF0LmdldFF1YWxpdHlMZXZlbHMoKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIHNlcXVlbnRpYWwgaGFzIGF2YWlsYWJsZSBzb3VyY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkoY3VycmVudFF1YWxpdHkuaW5kZXgrMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KS50aGVuKCgpPT57XG5cbiAgICAgICAgICAgIC8vcHJvdmlkZXIncyBwcmVsb2FkKCkgaGF2ZSB0byBtYWRlIFByb21pc2UuIEN1eiBpdCBvdmVyY29tZXMgJ2ZsYXNoIGxvYWRpbmcgdGltaW5nIHByb2JsZW0nLlxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnByZWxvYWQocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCksIGxhc3RQbGF5UG9zaXRpb24gKS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgLy9UaGlzIGlzIG5vIHJlYXNvbiB0byBleGlzdCBhbnltb3JlLlxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUkVBRFkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JPYmplY3QgPSB7Y29kZSA6IElOSVRfRVJST1IsIHJlYXNvbiA6IFwiaW5pdCBlcnJvci5cIiwgbWVzc2FnZSA6IFwiUGxheWVyIGluaXQgZXJyb3IuXCIsIGVycm9yIDogZXJyb3J9O1xuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBlcnJvck9iamVjdCk7XG5cbiAgICAgICAgICAgIC8veHh4IDogSWYgeW91IGluaXQgZW1wdHkgc291cmNlcy4gKEkgdGhpbmsgdGhpcyBpcyBzdHJhbmdlIGNhc2UuKVxuICAgICAgICAgICAgLy9UaGlzIHdvcmtzIGZvciB0aGlzIGNhc2UuXG4gICAgICAgICAgICAvL3BsYXllciA9IE92ZW5QbGF5ZXIuY3JlYXRlKFwiZWxJZFwiLCB7fSk7XG4gICAgICAgICAgICAvL3BsYXllci5sb2FkKHNvcnVjZXMpO1xuICAgICAgICAgICAgbGF6eVF1ZXVlLnJlbW92ZUFuZEV4Y3V0ZU9uY2UoXCJsb2FkXCIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBBUEkg7LSI6riw7ZmUIO2VqOyImFxuICAgICAqIGluaXRcbiAgICAgKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zIHBsYXllciBpbml0aWFsIG9wdGlvbiB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuc1xuICAgICAqKi9cbiAgICB0aGF0LmluaXQgPSAob3B0aW9ucykgPT57XG4gICAgICAgIC8vSXQgY29sbGVjdHMgdGhlIGNvbW1hbmRzIGFuZCBleGVjdXRlcyB0aGVtIGF0IHRoZSB0aW1lIHdoZW4gdGhleSBhcmUgZXhlY3V0YWJsZS5cbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ2xvYWQnLCdwbGF5JywncGF1c2UnLCdzZWVrJywnc3RvcCcsICdnZXREdXJhdGlvbicsICdnZXRQb3NpdGlvbicsICdnZXRWb2x1bWUnLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnXSk7XG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zKTtcbiAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0RlYnVnKCkpe1xuICAgICAgICAgICAgbG9nTWFuYWdlci5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpXCIpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XG5cbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldFBsYXlsaXN0KHBsYXllckNvbmZpZy5nZXRQbGF5bGlzdCgpKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHNvdXJjZXMgOiBcIiAsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XG4gICAgfTtcblxuICAgIC8qdGhhdC5nZXRDb250YWluZXJJZCA9ICgpID0+e1xuICAgICAgICByZXR1cm4gY29udGFpbmVyLmlkO1xuICAgIH07Ki9cblxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDb25maWcoKVwiLCBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkpO1xuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldENvbmZpZygpO1xuICAgIH07XG5cbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXREdXJhdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpO1xuICAgIH07XG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UG9zaXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRWb2x1bWUoKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFZvbHVtZSgpIFwiICsgdm9sdW1lKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICAgIH07XG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldE11dGUoKSBcIiArIHN0YXRlKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0TXV0ZSgpIFwiICsgY3VycmVudFByb3ZpZGVyLmdldE11dGUoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHBsYXlsaXN0KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGxvYWQoKSBcIiwgcGxheWxpc3QpO1xuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xuXG4gICAgICAgIGlmKHBsYXlsaXN0KXtcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldFBsYXlsaXN0KHBsYXlsaXN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5pdFByb3ZpZGVyKCk7XG5cbiAgICB9O1xuICAgIHRoYXQucGxheSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGxheSgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBsYXkoKTtcbiAgICB9XG4gICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGF1c2UoKSBcIik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wYXVzZSgpO1xuICAgIH07XG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNlZWsoKSBcIisgcG9zaXRpb24pO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2Vlayhwb3NpdGlvbik7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRQbGF5YmFja1JhdGUoKSBcIiwgcGxheWJhY2tSYXRlKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRQbGF5YmFja1JhdGUocGxheWVyQ29uZmlnLnNldERlZmF1bHRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKSk7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQbGF5YmFja1JhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRRdWFsaXR5TGV2ZWxzKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCk7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgXCIsIHF1YWxpdHlJbmRleCk7XG5cbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKTtcbiAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW3RoYXQuZ2V0Q3VycmVudFF1YWxpdHkoKS5pbmRleF07XG4gICAgICAgIGxldCBuZXdTb3VyY2UgPSBzb3VyY2VzW3F1YWxpdHlJbmRleF07XG4gICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gdGhhdC5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgaXNTYW1lUHJvdmlkZXIgPSBwcm92aWRlckNvbnRyb2xsZXIuaXNTYW1lUHJvdmlkZXIoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKTtcbiAgICAgICAgLy8gcHJvdmlkZXIuc2VyQ3VycmVudFF1YWxpdHkgLT4gcGxheWVyQ29uZmlnIHNldHRpbmcgLT4gbG9hZFxuICAgICAgICBsZXQgcmVzUXVhbGl0eUluZGV4ID0gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KHF1YWxpdHlJbmRleCwgaXNTYW1lUHJvdmlkZXIpO1xuXG4gICAgICAgIGlmKCFuZXdTb3VyY2Upe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIGlzU2FtZVByb3ZpZGVyXCIsIGlzU2FtZVByb3ZpZGVyKTtcblxuICAgICAgICBpZighaXNTYW1lUHJvdmlkZXIpe1xuICAgICAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknXSk7XG4gICAgICAgICAgICBpbml0UHJvdmlkZXIobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzUXVhbGl0eUluZGV4O1xuICAgIH07XG5cbiAgICAvKiBDYXB0aW9ucyA6IFRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCB2ZXJzaW9uLiovXG4gICAgLyp0aGF0LnNldEN1cnJlbnRDYXB0aW9uID0gKGluZGV4KSA9PntcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLnNldEN1cnJlbnRDYXB0aW9uKGluZGV4KTtcbiAgICAgfVxuICAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT57XG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpO1xuICAgICB9XG4gICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xuICAgICB9XG4gICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT4ge1xuICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuYWRkQ2FwdGlvbigpO1xuICAgICB9XG4gICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xuICAgICB9Ki9cblxuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRCdWZmZXIoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpO1xuICAgIH07XG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U3RhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCk7XG4gICAgfTtcbiAgICB0aGF0LnN0b3AgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHN0b3AoKSBcIik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zdG9wKCk7XG4gICAgfTtcbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgXCIpO1xuICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xuICAgICAgICBwcm92aWRlckNvbnRyb2xsZXIgPSBudWxsO1xuICAgICAgICBwbGF5bGlzdE1hbmFnZXIgPSBudWxsO1xuICAgICAgICBwbGF5ZXJDb25maWcgPSBudWxsO1xuXG4gICAgICAgIHRoYXQudHJpZ2dlcihERVNUUk9ZKTtcbiAgICAgICAgdGhhdC5vZmYoKTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSAtIGxhenlRdWV1ZSwgY3VycmVudFByb3ZpZGVyLCBwcm92aWRlckNvbnRyb2xsZXIsIHBsYXlsaXN0TWFuYWdlciwgcGxheWVyQ29uZmlnLCBhcGkgZXZlbnQgZGVzdHJvZWQuIFwiKTtcbiAgICAgICAgbG9nTWFuYWdlci5kZXN0cm95KCk7XG4gICAgfTtcblxuXG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuXG5leHBvcnQgZGVmYXVsdCBBcGk7XG5cblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxuICovXG5cbmV4cG9ydCBjb25zdCBBcGlSdG1wRXhwYW5zaW9uID0gZnVuY3Rpb24oY3VycmVudFByb3ZpZGVyKXtcbiAgICByZXR1cm4ge1xuICAgICAgICBleHRlcm5hbENhbGxiYWNrQ3JlZXAgOiAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZihyZXN1bHQubmFtZSAmJiByZXN1bHQuZGF0YSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci50cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwocmVzdWx0Lm5hbWUsIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn07XG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgaW5pdGlhbGl6ZXMgdGhlIGlucHV0IG9wdGlvbnMuXG4gKiBAcGFyYW0gICBvcHRpb25zXG4gKlxuICogKi9cbmNvbnN0IENvbmZpZ3VyYXRvciA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXG4gICAgY29uc3QgY29tcG9zZVNvdXJjZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgICAgICAgY29uc3QgRGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBkZWZhdWx0UGxheWJhY2tSYXRlOiAxLFxuICAgICAgICAgICAgcGxheWJhY2tSYXRlQ29udHJvbHM6IGZhbHNlLFxuICAgICAgICAgICAgcGxheWJhY2tSYXRlczogWzAuMjUsIDAuNSwgMSwgMS41LCAyXSxcbiAgICAgICAgICAgIG11dGU6IGZhbHNlLFxuICAgICAgICAgICAgdm9sdW1lOiA5MCxcbiAgICAgICAgICAgIHdpZHRoOiA2NDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDM2MFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzZXJpYWxpemUgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoIDwgNikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VyY2FzZVZhbCA9IHZhbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oTnVtYmVyKHZhbCkpICYmICFpc05hTihwYXJzZUZsb2F0KHZhbCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIodmFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlc2VyaWFsaXplID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdpZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBzZXJpYWxpemUob3B0aW9uc1trZXldKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZVNpemUgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsLnNsaWNlICYmIHZhbC5zbGljZSgtMikgPT09ICdweCcpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWwuc2xpY2UoMCwgLTIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBldmFsdWF0ZUFzcGVjdFJhdGlvID0gZnVuY3Rpb24gKGFyLCB3aWR0aCkge1xuICAgICAgICAgICAgaWYgKHdpZHRoLnRvU3RyaW5nKCkuaW5kZXhPZignJScpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhciAhPT0gJ3N0cmluZycgfHwgIWFyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoL15cXGQqXFwuP1xcZCslJC8udGVzdChhcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFyLmluZGV4T2YoJzonKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHcgPSBwYXJzZUZsb2F0KGFyLnN1YnN0cigwLCBpbmRleCkpO1xuICAgICAgICAgICAgY29uc3QgaCA9IHBhcnNlRmxvYXQoYXIuc3Vic3RyKGluZGV4ICsgMSkpO1xuICAgICAgICAgICAgaWYgKHcgPD0gMCB8fCBoIDw9IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoaCAvIHcgKiAxMDApICsgJyUnO1xuICAgICAgICB9XG4gICAgICAgIGRlc2VyaWFsaXplKG9wdGlvbnMpO1xuICAgICAgICBsZXQgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgICAgICBjb25maWcud2lkdGggPSBub3JtYWxpemVTaXplKGNvbmZpZy53aWR0aCk7XG4gICAgICAgIGNvbmZpZy5oZWlnaHQgPSBub3JtYWxpemVTaXplKGNvbmZpZy5oZWlnaHQpO1xuICAgICAgICBjb25maWcuYXNwZWN0cmF0aW8gPSBldmFsdWF0ZUFzcGVjdFJhdGlvKGNvbmZpZy5hc3BlY3RyYXRpbywgY29uZmlnLndpZHRoKTtcblxuICAgICAgICBsZXQgcmF0ZUNvbnRyb2xzID0gY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzO1xuICAgICAgICBpZiAocmF0ZUNvbnRyb2xzKSB7XG4gICAgICAgICAgICBsZXQgcmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcztcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmF0ZUNvbnRyb2xzKSkge1xuICAgICAgICAgICAgICAgIHJhdGVzID0gcmF0ZUNvbnRyb2xzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmF0ZXMgPSByYXRlcy5maWx0ZXIocmF0ZSA9PiBfLmlzTnVtYmVyKHJhdGUpICYmIHJhdGUgPj0gMC4yNSAmJiByYXRlIDw9IDQpXG4gICAgICAgICAgICAgICAgLm1hcChyYXRlID0+IE1hdGgucm91bmQocmF0ZSAqIDQpIC8gNCk7XG5cbiAgICAgICAgICAgIGlmIChyYXRlcy5pbmRleE9mKDEpIDwgMCkge1xuICAgICAgICAgICAgICAgIHJhdGVzLnB1c2goMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYXRlcy5zb3J0KCk7XG5cbiAgICAgICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyA9IHRydWU7XG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlcyA9IHJhdGVzO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoIWNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyB8fCBjb25maWcucGxheWJhY2tSYXRlcy5pbmRleE9mKGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlKSA8IDApIHtcbiAgICAgICAgICAgIGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGUgPSBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZTtcblxuICAgICAgICBpZiAoIWNvbmZpZy5hc3BlY3RyYXRpbykge1xuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5hc3BlY3RyYXRpbztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmZpZ1BsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0O1xuICAgICAgICBpZiAoIWNvbmZpZ1BsYXlsaXN0KSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBfLnBpY2soY29uZmlnLCBbXG4gICAgICAgICAgICAgICAgJ3RpdGxlJyxcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgICd0eXBlJyxcbiAgICAgICAgICAgICAgICAnbWVkaWFpZCcsXG4gICAgICAgICAgICAgICAgJ2ltYWdlJyxcbiAgICAgICAgICAgICAgICAnZmlsZScsXG4gICAgICAgICAgICAgICAgJ3NvdXJjZXMnLFxuICAgICAgICAgICAgICAgICd0cmFja3MnLFxuICAgICAgICAgICAgICAgICdwcmVsb2FkJyxcbiAgICAgICAgICAgICAgICAnZHVyYXRpb24nLFxuICAgICAgICAgICAgICAgICdob3N0JyxcbiAgICAgICAgICAgICAgICAnYXBwbGljYXRpb24nLFxuICAgICAgICAgICAgICAgICdzdHJlYW0nXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gWyBvYmogXTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoY29uZmlnUGxheWxpc3QucGxheWxpc3QpKSB7XG4gICAgICAgICAgICBjb25maWcuZmVlZERhdGEgPSBjb25maWdQbGF5bGlzdDtcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIGNvbmZpZy5kdXJhdGlvbjtcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNvbmZpZ3VyYXRvciBsb2FkZWQuXCIsIG9wdGlvbnMpO1xuICAgIGxldCBjb25maWcgPSBjb21wb3NlU291cmNlT3B0aW9ucyhvcHRpb25zKTtcblxuICAgIGxldCBhc3BlY3RyYXRpbyA9IGNvbmZpZy5hc3BlY3RyYXRpbyB8fCBcIjE2OjlcIjtcbiAgICBsZXQgZGVidWcgPSBjb25maWcuZGVidWc7XG4gICAgbGV0IGRlZmF1bHRQbGF5YmFja1JhdGUgPSBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSB8fCAxO1xuICAgIGxldCBpbWFnZSA9IGNvbmZpZy5pbWFnZTtcbiAgICBsZXQgcGxheWJhY2tSYXRlQ29udHJvbHMgPSBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgfHwgdHJ1ZTtcbiAgICBsZXQgcGxheWJhY2tSYXRlcyA9IGNvbmZpZy5wbGF5YmFja1JhdGVzIHx8IFswLjUsIDEsIDEuMjUsIDEuNSwgMl07XG4gICAgbGV0IHBsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0IHx8IFtdO1xuICAgIGxldCBxdWFsaXR5TGFiZWwgPSBjb25maWcucXVhbGl0eUxhYmVsIHx8IFwiXCI7XG4gICAgbGV0IHJlcGVhdCA9IGNvbmZpZy5yZXBlYXQgfHwgZmFsc2U7XG4gICAgbGV0IHN0cmV0Y2hpbmcgPSBjb25maWcuc3RyZXRjaGluZyB8fCAndW5pZm9ybSc7XG5cblxuXG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge3JldHVybiBjb25maWc7fTtcblxuICAgIHRoYXQuZ2V0QXNwZWN0cmF0aW8gPSgpPT57cmV0dXJuIGFzcGVjdHJhdGlvO307XG4gICAgdGhhdC5zZXRBc3BlY3RyYXRpbyA9KGFzcGVjdHJhdGlvXyk9Pnthc3BlY3RyYXRpbyA9IGFzcGVjdHJhdGlvXzt9O1xuXG4gICAgdGhhdC5pc0RlYnVnID0oKT0+e3JldHVybiBkZWJ1Zzt9O1xuXG4gICAgdGhhdC5nZXREZWZhdWx0UGxheWJhY2tSYXRlID0oKT0+e3JldHVybiBkZWZhdWx0UGxheWJhY2tSYXRlO307XG4gICAgdGhhdC5zZXREZWZhdWx0UGxheWJhY2tSYXRlID0ocGxheWJhY2tSYXRlKT0+e2RlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7IHJldHVybiBwbGF5YmFja1JhdGU7fTtcblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxhYmVsID0gKCkgPT4ge3JldHVybiBxdWFsaXR5TGFiZWw7fTtcbiAgICB0aGF0LnNldFF1YWxpdHlMYWJlbCA9IChuZXdMYWJlbCkgPT4ge3F1YWxpdHlMYWJlbCA9IG5ld0xhYmVsO307XG5cbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZXMgPSgpPT57cmV0dXJuIHBsYXliYWNrUmF0ZXM7fTtcbiAgICB0aGF0LmlzUGxheWJhY2tSYXRlQ29udHJvbHMgPSgpPT57cmV0dXJuIHBsYXliYWNrUmF0ZUNvbnRyb2xzO307XG5cbiAgICB0aGF0LmdldFBsYXlsaXN0ID0oKT0+e3JldHVybiBwbGF5bGlzdDt9O1xuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdF8gKT0+e1xuICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RfKSl7XG4gICAgICAgICAgICBwbGF5bGlzdCA9IHBsYXlsaXN0XztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBwbGF5bGlzdCA9IFtwbGF5bGlzdF9dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwbGF5bGlzdDtcbiAgICB9O1xuXG4gICAgdGhhdC5pc1JlcGVhdCA9KCk9PntyZXR1cm4gcmVwZWF0O307XG5cbiAgICB0aGF0LmdldFN0cmV0Y2hpbmcgPSgpPT57cmV0dXJuIHN0cmV0Y2hpbmc7fTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdG9yO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMy4uXG4gKi9cblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1vZHVsZSBwcm92aWRlIGN1c3RvbSBldmVudHMuXG4gKiBAcGFyYW0gICBvYmplY3QgICAgQW4gb2JqZWN0IHRoYXQgcmVxdWlyZXMgY3VzdG9tIGV2ZW50cy5cbiAqXG4gKiAqL1xuXG5jb25zdCBFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbihvYmplY3Qpe1xuICAgIGxldCB0aGF0ID0gb2JqZWN0O1xuICAgIGxldCBfZXZlbnRzID1bXTtcblxuICAgIGNvbnN0IHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MsIGNvbnRleHQpe1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGxldCBsZW5ndGggPSBldmVudHMubGVuZ3RoO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gZXZlbnRzW2ldO1xuICAgICAgICAgICAgZXZlbnQubGlzdGVuZXIuYXBwbHkoICggZXZlbnQuY29udGV4dCB8fCBjb250ZXh0ICksIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQub24gPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIChfZXZlbnRzW25hbWVdIHx8IChfZXZlbnRzW25hbWVdPVtdKSApLnB1c2goeyBsaXN0ZW5lcjogbGlzdGVuZXIgICwgY29udGV4dCA6IGNvbnRleHR9KTtcbiAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgfTtcbiAgICB0aGF0LnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lKXtcbiAgICAgICAgaWYoIV9ldmVudHMpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XG4gICAgICAgIGNvbnN0IGFsbEV2ZW50cyA9IF9ldmVudHMuYWxsO1xuXG4gICAgICAgIGlmKGV2ZW50cyl7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGV2ZW50cywgYXJncywgdGhhdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYWxsRXZlbnRzKXtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoYWxsRXZlbnRzLCBhcmd1bWVudHMsIHRoYXQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgaWYoIV9ldmVudHMpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFuYW1lICYmICFsaXN0ZW5lciAmJiAhY29udGV4dCkgIHtcbiAgICAgICAgICAgIF9ldmVudHMgPSBbXTtcbiAgICAgICAgICAgIHJldHVybiB0aGF0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogT2JqZWN0LmtleXMoX2V2ZW50cyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IF9ldmVudHNbbmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgIHx8IGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5saXN0ZW5lciAgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLl9jYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2ZW50LmNvbnRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQub25jZSA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgY29uc3Qgb25jZUNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY291bnQrKykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQub2ZmKG5hbWUsIG9uY2VDYWxsYmFjayk7XG4gICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICBvbmNlQ2FsbGJhY2suX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGF0Lm9uKG5hbWUsIG9uY2VDYWxsYmFjaywgY29udGV4dCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7IiwiaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBleGVjdXRlcyB0aGUgaW5wdXQgY29tbWFuZHMgYXQgYSBzcGVjaWZpYyBwb2ludCBpbiB0aW1lLlxuICogQHBhcmFtICAgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHF1ZXVlZENvbW1hbmRzXG4gKiAqL1xuY29uc3QgTGF6eUNvbW1hbmRFeGVjdXRvciA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgcXVldWVkQ29tbWFuZHMpIHtcbiAgICBsZXQgY29tbWFuZFF1ZXVlID0gW107XG4gICAgbGV0IHVuZGVjb3JhdGVkTWV0aG9kcyA9IHt9O1xuICAgIGxldCBleGVjdXRlTW9kZSA9IGZhbHNlO1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciBsb2FkZWQuXCIpO1xuICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gaW5zdGFuY2VbY29tbWFuZF07XG4gICAgICAgIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSA9IG1ldGhvZCB8fCBmdW5jdGlvbigpe307XG5cbiAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICAgICAgICBpZiAoIWV4ZWN1dGVNb2RlKSB7XG4gICAgICAgICAgICAgICAgLy9jb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgICAgICAgICAgICAgdGhhdC5hZGRRdWV1ZShjb21tYW5kLCBhcmdzKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZC5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgdmFyIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2hpbGUgKGNvbW1hbmRRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNvbW1hbmQsIGFyZ3MgfSA9IGNvbW1hbmRRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgKHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSB8fCBpbnN0YW5jZVtjb21tYW5kXSkuYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhhdC5zZXRFeGVjdXRlTW9kZSA9IChtb2RlKSA9PiB7XG4gICAgICAgIGV4ZWN1dGVNb2RlID0gbW9kZTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHNldEV4ZWN1dGVNb2RlKClcIiwgbW9kZSk7XG4gICAgfTtcbiAgICB0aGF0LmdldFVuZGVjb3JhdGVkTWV0aG9kcyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRVbmRlY29yYXRlZE1ldGhvZHMoKVwiLCB1bmRlY29yYXRlZE1ldGhvZHMpO1xuICAgICAgICByZXR1cm4gdW5kZWNvcmF0ZWRNZXRob2RzO1xuICAgIH1cbiAgICB0aGF0LmdldFF1ZXVlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFF1ZXVlKClcIiwgZ2V0UXVldWUpO1xuICAgICAgICByZXR1cm4gY29tbWFuZFF1ZXVlO1xuICAgIH1cbiAgICB0aGF0LmFkZFF1ZXVlID0gZnVuY3Rpb24oY29tbWFuZCwgYXJncyl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBhZGRRdWV1ZSgpXCIsIGNvbW1hbmQsIGFyZ3MpO1xuICAgICAgICBjb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgfVxuXG4gICAgdGhhdC5mbHVzaCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBmbHVzaCgpXCIpO1xuICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcbiAgICB9O1xuICAgIHRoYXQuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGVtcHR5KClcIik7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5sZW5ndGggPSAwO1xuICAgIH07XG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IG9mZigpXCIpO1xuICAgICAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XG4gICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgLy9SdW4gb25jZSBhdCB0aGUgZW5kXG4gICAgdGhhdC5yZW1vdmVBbmRFeGN1dGVPbmNlID0gZnVuY3Rpb24oY29tbWFuZF8pe1xuICAgICAgICBsZXQgY29tbWFuZFF1ZXVlSXRlbSA9IF8uZmluZFdoZXJlKGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogcmVtb3ZlQW5kRXhjdXRlT25jZSgpXCIsIGNvbW1hbmRfKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLnNwbGljZShfLmZpbmRJbmRleChjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KSwgMSk7XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcbiAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicmVtb3ZlQ29tbWFuZCgpXCIpO1xuICAgICAgICAgICAgaWYoY29tbWFuZFF1ZXVlSXRlbSl7XG4gICAgICAgICAgICAgICAgKG1ldGhvZHx8IGluc3RhbmNlW2NvbW1hbmRfXSkuYXBwbHkoaW5zdGFuY2UsIGNvbW1hbmRRdWV1ZUl0ZW0uYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kX10gPSBtZXRob2Q7XG4gICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgdGhhdC5vZmYoKTtcbiAgICAgICAgdGhhdC5lbXB0eSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IExhenlDb21tYW5kRXhlY3V0b3I7IiwiaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2h9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGZpbmRzIHRoZSBwcm92aWRlciB0aGF0IG1hdGNoZXMgdGhlIGlucHV0IHNvdXJjZS5cbiAqIEBwYXJhbVxuICogKi9cblxuY29uc3QgU3VwcG9ydENoZWNrZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciBsb2FkZWQuXCIpO1xuICAgIGNvbnN0IHN1cHBvcnRMaXN0ID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnaHRtbDUnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgTWltZVR5cGVzID0ge1xuICAgICAgICAgICAgICAgICAgICBhYWM6ICdhdWRpby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBtcDQ6ICd2aWRlby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBmNHY6ICd2aWRlby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBtNHY6ICd2aWRlby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBtb3Y6ICd2aWRlby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBtcDM6ICdhdWRpby9tcGVnJyxcbiAgICAgICAgICAgICAgICAgICAgbXBlZzogJ2F1ZGlvL21wZWcnLFxuICAgICAgICAgICAgICAgICAgICBvZ3Y6ICd2aWRlby9vZ2cnLFxuICAgICAgICAgICAgICAgICAgICBvZ2c6ICd2aWRlby9vZ2cnLFxuICAgICAgICAgICAgICAgICAgICBvZ2E6ICd2aWRlby9vZ2cnLFxuICAgICAgICAgICAgICAgICAgICB2b3JiaXM6ICd2aWRlby9vZ2cnLFxuICAgICAgICAgICAgICAgICAgICB3ZWJtOiAndmlkZW8vd2VibScsXG4gICAgICAgICAgICAgICAgICAgIGY0YTogJ3ZpZGVvL2FhYycsXG4gICAgICAgICAgICAgICAgICAgIG0zdTg6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXG4gICAgICAgICAgICAgICAgICAgIG0zdTogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcbiAgICAgICAgICAgICAgICAgICAgaGxzOiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICB9KCk7XG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgICAgICBpZighdHlwZSl7cmV0dXJuIGZhbHNlO31cbiAgICAgICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IHNvdXJjZS5taW1lVHlwZSB8fCBNaW1lVHlwZXNbdHlwZV07XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1pbWVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gISF2aWRlby5jYW5QbGF5VHlwZShtaW1lVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICd3ZWJydGMnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2Rhc2gnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xuXG4gICAgICAgICAgICAgICAgLy9tcGQgYXBwbGljYXRpb24vZGFzaCt4bWxcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGFzaChmaWxlLCB0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2hscycsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgICAgICAgICAgfSgpO1xuXG4gICAgICAgICAgICAgICAgLy90aGlzIG1ldGhvZCBmcm9tIGhscy5qc1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzSGxzU3VwcG9ydCA9ICgpID0+e1xuICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TWVkaWFTb3VyY2UoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Lk1lZGlhU291cmNlIHx8IHdpbmRvdy5XZWJLaXRNZWRpYVNvdXJjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVkaWFTb3VyY2UgPSBnZXRNZWRpYVNvdXJjZSgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyID0gd2luZG93LlNvdXJjZUJ1ZmZlciB8fCB3aW5kb3cuV2ViS2l0U291cmNlQnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNUeXBlU3VwcG9ydGVkID0gbWVkaWFTb3VyY2UgJiYgdHlwZW9mIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUUsbXA0YS40MC4yXCInKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBTb3VyY2VCdWZmZXIgaXMgZXhwb3NlZCBlbnN1cmUgaXRzIEFQSSBpcyB2YWxpZFxuICAgICAgICAgICAgICAgICAgICAvLyBzYWZhcmkgYW5kIG9sZCB2ZXJzaW9uIG9mIENocm9tZSBkb2Ugbm90IGV4cG9zZSBTb3VyY2VCdWZmZXIgZ2xvYmFsbHkgc28gY2hlY2tpbmcgU291cmNlQnVmZmVyLnByb3RvdHlwZSBpcyBpbXBvc3NpYmxlXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXJWYWxpZEFQSSA9ICFzb3VyY2VCdWZmZXIgfHwgc291cmNlQnVmZmVyLnByb3RvdHlwZSAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5hcHBlbmRCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUucmVtb3ZlID09PSAnZnVuY3Rpb24nO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFpc1R5cGVTdXBwb3J0ZWQgJiYgISFzb3VyY2VCdWZmZXJWYWxpZEFQSTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIHRoaXMgJyEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyknIGlmIHlvdSB3YW50IHRvIHVzZSBobHNqcy5cbiAgICAgICAgICAgICAgICByZXR1cm4gaXNIbHNTdXBwb3J0KCkgJiYgISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3J0bXAnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXTtcblxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlID0gKHNvcnVjZV8pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoKVwiLCBzb3J1Y2VfKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdXBwb3J0TGlzdC5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgaWYoc3VwcG9ydExpc3RbaV0uY2hlY2tTdXBwb3J0KHNvdXJjZSkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCA9IChwbGF5bGlzdF8pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QoKVwiLCBwbGF5bGlzdF8pO1xuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gcGxheWxpc3RfW2ldO1xuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XG4gICAgICAgICAgICAgICAgc291cmNlID0gaXRlbS5zb3VyY2VzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwcG9ydE5hbWVzO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjtcbiIsIi8vIFNUQVRFXG5leHBvcnQgY29uc3QgU1RBVEVfQlVGRkVSSU5HID0gJ2J1ZmZlcmluZyc7XG5leHBvcnQgY29uc3QgU1RBVEVfSURMRSA9ICdpZGxlJztcbmV4cG9ydCBjb25zdCBTVEFURV9DT01QTEVURSA9ICdjb21wbGV0ZSc7XG5leHBvcnQgY29uc3QgU1RBVEVfUEFVU0VEID0gJ3BhdXNlZCc7XG5leHBvcnQgY29uc3QgU1RBVEVfUExBWUlORyA9ICdwbGF5aW5nJztcbmV4cG9ydCBjb25zdCBTVEFURV9FUlJPUiA9ICdlcnJvcic7XG5leHBvcnQgY29uc3QgU1RBVEVfTE9BRElORyA9ICdsb2FkaW5nJztcbmV4cG9ydCBjb25zdCBTVEFURV9TVEFMTEVEID0gJ3N0YWxsZWQnO1xuXG5cbi8vIFBST1ZJREVSXG5leHBvcnQgY29uc3QgUFJPVklERVJfSFRNTDUgPSAnaHRtbDUnO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1dFQlJUQyA9ICd3ZWJydGMnO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0RBU0ggPSAnZGFzaCc7XG5leHBvcnQgY29uc3QgUFJPVklERVJfSExTID0gJ2hscyc7XG5leHBvcnQgY29uc3QgUFJPVklERVJfUlRNUCA9ICdydG1wJztcblxuLy8gRVZFTlRTXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xuZXhwb3J0IGNvbnN0IFJFQURZID0gJ3JlYWR5JztcbmV4cG9ydCBjb25zdCBERVNUUk9ZID0gJ2Rlc3Ryb3knO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9ICdzZWVrJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUl9GVUxMID0gJ2J1ZmZlckZ1bGwnO1xuZXhwb3J0IGNvbnN0IERJU1BMQVlfQ0xJQ0sgPSAnZGlzcGxheUNsaWNrJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9ICdsb2FkZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gJ3NlZWtlZCc7XG5leHBvcnQgY29uc3QgTkVUV09SS19VTlNUQUJMRUQgPSAndW5zdGFibGVOZXR3b3JrJztcblxuZXhwb3J0IGNvbnN0IEVSUk9SID0gJ2Vycm9yJztcblxuLy8gU1RBVEUgT0YgUExBWUVSXG5leHBvcnQgY29uc3QgUExBWUVSX1NUQVRFID0gJ3N0YXRlQ2hhbmdlZCc7XG5leHBvcnQgY29uc3QgUExBWUVSX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XG5leHBvcnQgY29uc3QgUExBWUVSX1BBVVNFID0gJ3BhdXNlJztcbmV4cG9ydCBjb25zdCBQTEFZRVJfUExBWSA9ICdwbGF5JztcblxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSID0gJ2J1ZmZlckNoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRSA9ICd0aW1lJztcbmV4cG9ydCBjb25zdCBDT05URU5UX1JBVEVfQ0hBTkdFID0gJ3JhdGVjaGFuZ2UnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfVk9MVU1FID0gJ3ZvbHVtZUNoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTVVURSA9ICdtdXRlJztcbmV4cG9ydCBjb25zdCBDT05URU5UX01FVEEgPSAnbWV0YUNoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxTID0gJ3F1YWxpdHlMZXZlbENoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxfQ0hBTkdFRCA9ICdjdXJyZW50UXVhbGl0eUxldmVsQ2hhbmdlZCc7XG5leHBvcnQgY29uc3QgUExBWUJBQ0tfUkFURV9DSEFOR0VEID0gJ3BsYXliYWNrUmF0ZUNoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCA9ICdjdWVDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRCA9ICdjYXB0aW9uQ2hhbmdlZCc7XG5cblxuZXhwb3J0IGNvbnN0IElOSVRfRVJST1IgPSAxMDA7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fRVJST1IgPSAzMDA7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SID0gMzAxO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IgPSAzMDI7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SID0gMzAzO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9GSUxFX0VSUk9SID0gMzA0O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9DQVBUSU9OX0VSUk9SID0gMzA1O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfRVJST1IgPSA1MDE7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19XU19DTE9TRUQgPSA1MDI7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAzO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SID0gNTA0O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiA9IDUwNTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA2O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XID0gNTEwO1xuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcbmltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9uICx0cmltfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3RyaW5nc1wiO1xuaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCIuLi9TdXBwb3J0Q2hlY2tlclwiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBQbGF5bGlzdCBvciBTb3VyY2VzLlxuICogQHBhcmFtXG4gKlxuICogKi9cbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgY3VycmVudFBsYXlsaXN0ID0gW107XG4gICAgbGV0IHN1cHBvcnRDaGVja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgbWFrZVByZXR0eVNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZV8pe1xuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIHsgJ2RlZmF1bHQnOiBmYWxzZSB9LCBzb3VyY2VfKTtcbiAgICAgICAgc291cmNlLmZpbGUgPSB0cmltKCcnICsgc291cmNlLmZpbGUpO1xuXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcbiAgICAgICAgICAgIHNvdXJjZS5maWxlID0gc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL3N0cmVhbS9cIiArIHNvdXJjZS5zdHJlYW07XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmFwcGxpY2F0aW9uO1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5zdHJlYW07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtaW1ldHlwZVJlZ0V4ID0gL15bXi9dK1xcLyg/OngtKT8oW14vXSspJC87XG5cbiAgICAgICAgaWYgKG1pbWV0eXBlUmVnRXgudGVzdChzb3VyY2UudHlwZSkpIHtcbiAgICAgICAgICAgIC8vIGlmIHR5cGUgaXMgZ2l2ZW4gYXMgYSBtaW1ldHlwZVxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IHNvdXJjZS50eXBlLnJlcGxhY2UobWltZXR5cGVSZWdFeCwgJyQxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihpc1J0bXAoc291cmNlLmZpbGUpKXtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICB9ZWxzZSBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnd2VicnRjJztcbiAgICAgICAgfWVsc2UgaWYoaXNEYXNoKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnZGFzaCc7XG4gICAgICAgIH1lbHNlIGlmICghc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gZXh0cmFjdEV4dGVuc2lvbihzb3VyY2UuZmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3JtYWxpemUgdHlwZXNcbiAgICAgICAgc3dpdGNoIChzb3VyY2UudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XG4gICAgICAgICAgICBjYXNlICd2bmQuYXBwbGUubXBlZ3VybCc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnaGxzJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ200YSc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnYWFjJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NtaWwnOlxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBpZiAoc291cmNlW2tleV0gPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc291cmNlO1xuXG4gICAgfVxuXG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0KSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIHNldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgY29uc3QgcHJldHRpZWRQbGF5bGlzdCA9IChfLmlzQXJyYXkocGxheWxpc3QpID8gcGxheWxpc3QgOiBbcGxheWxpc3RdKS5tYXAoZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICBpZighXy5pc0FycmF5KGl0ZW0udHJhY2tzKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwbGF5bGlzdEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LHtcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgICAgICB0cmFja3M6IFtdXG4gICAgICAgICAgICB9LCBpdGVtICk7XG5cbiAgICAgICAgICAgIGlmKChwbGF5bGlzdEl0ZW0uc291cmNlcyA9PT0gT2JqZWN0KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkgJiYgIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykpIHtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IGl0ZW0ubGV2ZWxzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eVNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc291cmNlIGRvZXNuJ3QgaGF2ZSBhIGxhYmVsLCBudW1iZXIgaXRcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0udHlwZStcIi1cIitpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJldHR5U291cmNlID0gbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSk7XG4gICAgICAgICAgICAgICAgaWYoc3VwcG9ydENoZWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHByZXR0eVNvdXJjZSkpe1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IHByZXR0eVNvdXJjZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBwbGF5bGlzdEl0ZW0uc291cmNlcy5maWx0ZXIoc291cmNlID0+ICEhc291cmNlKTtcblxuICAgICAgICAgICAgLy8gZGVmYXVsdCDqsIAg7JeG7J2E65WMIHdlYnJ0Y+qwgCDsnojri6TrqbQgd2VicnRjIGRlZmF1bHQgOiB0cnVl66GcIOyekOuPmSDshKTsoJVcbiAgICAgICAgICAgIC8qbGV0IGhhdmVEZWZhdWx0ID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UuZGVmYXVsdCA9PSB0cnVlO30pO1xuICAgICAgICAgICAgbGV0IHdlYnJ0Y1NvdXJjZSA9IFtdO1xuICAgICAgICAgICAgaWYoIWhhdmVEZWZhdWx0KXtcbiAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS50eXBlID09IFwid2VicnRjXCI7fSk7XG4gICAgICAgICAgICAgICAgaWYod2VicnRjU291cmNlKXtcbiAgICAgICAgICAgICAgICAgICAgd2VicnRjU291cmNlLmRlZmF1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0qL1xuXG5cblxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0udHJhY2tzKSl7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5jYXB0aW9ucykpe1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLmNvbmNhdChwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBwbGF5bGlzdEl0ZW0uY2FwdGlvbnM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLm1hcChmdW5jdGlvbih0cmFjayl7XG4gICAgICAgICAgICAgICAgaWYoIXRyYWNrIHx8ICF0cmFjay5maWxlKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICAgICAgICAgICAgICAna2luZCc6ICdjYXB0aW9ucycsXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0JzogZmFsc2VcbiAgICAgICAgICAgICAgICB9LCB0cmFjayk7XG4gICAgICAgICAgICB9KS5maWx0ZXIodHJhY2sgPT4gISF0cmFjayk7XG5cbiAgICAgICAgICAgIHJldHVybiBwbGF5bGlzdEl0ZW07XG4gICAgICAgIH0pO1xuICAgICAgICBjdXJyZW50UGxheWxpc3QgPSBwcmV0dGllZFBsYXlsaXN0O1xuICAgICAgICByZXR1cm4gcHJldHRpZWRQbGF5bGlzdDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRQbGF5bGlzdCgpIFwiLCBjdXJyZW50UGxheWxpc3QpO1xuICAgICAgICByZXR1cm4gY3VycmVudFBsYXlsaXN0O1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgLy9XZSBkbyBub3Qgc3VwcG9ydCBcIlBMQVlMSVNUXCIgbm90IHlldC4gU28gdGhpcyByZXR1cm5zIHBsYXlsaXN0IG9mIDAuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRDdXJyZW50U291cmNlcygpIFwiLCBjdXJyZW50UGxheWxpc3RbMF0uc291cmNlcyk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UGxheWxpc3RbMF0uc291cmNlcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XG4iLCJpbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcImFwaS9TdXBwb3J0Q2hlY2tlclwiO1xuaW1wb3J0IFByb21pc2UsIHtyZXNvbHZlZH0gZnJvbSBcImFwaS9zaGltcy9wcm9taXNlXCI7XG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXG4gKiBAcGFyYW1cbiAqICovXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgc3VwcG9ydENoYWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xuICAgIGNvbnN0IFByb3ZpZGVycyA9IHt9O1xuXG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgcmVnaXN0ZVByb3ZpZGVyID0gKG5hbWUsIHByb3ZpZGVyKSA9PntcbiAgICAgICAgaWYoUHJvdmlkZXJzW25hbWVdKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIF9yZWdpc3RlclByb3ZpZGVyKCkgXCIsIG5hbWUpO1xuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcbiAgICB9O1xuXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPXtcbiAgICAgICAgaHRtbDU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L0h0bWw1J10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvSHRtbDUnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJodG1sNVwiLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2VicnRjIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9XZWJSVEMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9XZWJSVEMnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJ3ZWJydGNcIiwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGRhc2ggOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L0Rhc2gnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9EYXNoJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiZGFzaFwiLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGhscyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvSGxzJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvSGxzJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiaGxzXCIsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXInXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBydG1wIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9mbGFzaC9SdG1wJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvZmxhc2gvUnRtcCcpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcInJ0bXBcIiwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXInXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdGhhdC5sb2FkUHJvdmlkZXJzID0gKHBsYXlsaXN0KSA9PntcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdChwbGF5bGlzdCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkUHJvdmlkZXJzKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICBzdXBwb3J0ZWRQcm92aWRlck5hbWVzLmZpbHRlcihmdW5jdGlvbihwcm92aWRlck5hbWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiAhIVByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV07XG4gICAgICAgICAgICB9KS5tYXAoZnVuY3Rpb24ocHJvdmlkZXJOYW1lKXtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IFByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV0oKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICB0aGF0LmZpbmRCeU5hbWUgPSAobmFtZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZmluZEJ5TmFtZSgpIFwiLCBuYW1lKTtcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWUgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGdldFByb3ZpZGVyQnlTb3VyY2UoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xuICAgIH07XG5cbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgaXNTYW1lUHJvdmlkZXIoKSBcIiwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpICwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSkgKTtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSA9PT0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSk7XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xuIiwiLy8gICAgICBQcm9taXNlIFBvbHlmaWxsXG4vLyAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS90YXlsb3JoYWtlcy9wcm9taXNlLXBvbHlmaWxsXG4vLyAgICAgIENvcHlyaWdodCAoYykgMjAxNCBUYXlsb3IgSGFrZXNcbi8vICAgICAgQ29weXJpZ2h0IChjKSAyMDE0IEZvcmJlcyBMaW5kZXNheVxuLy8gICAgICB0YXlsb3JoYWtlcy9wcm9taXNlLXBvbHlmaWxsIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuXG5jb25zdCBwcm9taXNlRmluYWxseSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gdGhpcy50aGVuKFxuICAgICAgICBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yZWplY3QocmVhc29uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgKTtcbn07XG5cbi8vIFN0b3JlIHNldFRpbWVvdXQgcmVmZXJlbmNlIHNvIHByb21pc2UtcG9seWZpbGwgd2lsbCBiZSB1bmFmZmVjdGVkIGJ5XG4vLyBvdGhlciBjb2RlIG1vZGlmeWluZyBzZXRUaW1lb3V0IChsaWtlIHNpbm9uLnVzZUZha2VUaW1lcnMoKSlcbmNvbnN0IHNldFRpbWVvdXRGdW5jID0gd2luZG93LnNldFRpbWVvdXQ7XG5jb25zdCBzZXRJbW1lZGlhdGVGdW5jID0gd2luZG93LnNldEltbWVkaWF0ZTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8vIFBvbHlmaWxsIGZvciBGdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG5jb25zdCBQcm9taXNlU2hpbSA9IGZ1bmN0aW9uIChmbikge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQcm9taXNlKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZXMgbXVzdCBiZSBjb25zdHJ1Y3RlZCB2aWEgbmV3Jyk7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgZnVuY3Rpb24nKTtcbiAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgdGhpcy5faGFuZGxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3ZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2RlZmVycmVkcyA9IFtdO1xuXG4gICAgZG9SZXNvbHZlKGZuLCB0aGlzKTtcbn1cblxuY29uc3QgaGFuZGxlID0gZnVuY3Rpb24gKHNlbGYsIGRlZmVycmVkKSB7XG4gICAgd2hpbGUgKHNlbGYuX3N0YXRlID09PSAzKSB7XG4gICAgICAgIHNlbGYgPSBzZWxmLl92YWx1ZTtcbiAgICB9XG4gICAgaWYgKHNlbGYuX3N0YXRlID09PSAwKSB7XG4gICAgICAgIHNlbGYuX2RlZmVycmVkcy5wdXNoKGRlZmVycmVkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZWxmLl9oYW5kbGVkID0gdHJ1ZTtcbiAgICBQcm9taXNlLl9pbW1lZGlhdGVGbihmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNiID0gc2VsZi5fc3RhdGUgPT09IDEgPyBkZWZlcnJlZC5vbkZ1bGZpbGxlZCA6IGRlZmVycmVkLm9uUmVqZWN0ZWQ7XG4gICAgICAgIGlmIChjYiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgKHNlbGYuX3N0YXRlID09PSAxID8gcmVzb2x2ZSA6IHJlamVjdCkoZGVmZXJyZWQucHJvbWlzZSwgc2VsZi5fdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXQgPSBjYihzZWxmLl92YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChkZWZlcnJlZC5wcm9taXNlLCBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKGRlZmVycmVkLnByb21pc2UsIHJldCk7XG4gICAgfSk7XG59XG5cbmNvbnN0IHJlc29sdmUgPSBmdW5jdGlvbiAoc2VsZiwgbmV3VmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgICAvLyBQcm9taXNlIFJlc29sdXRpb24gUHJvY2VkdXJlOiBodHRwczovL2dpdGh1Yi5jb20vcHJvbWlzZXMtYXBsdXMvcHJvbWlzZXMtc3BlYyN0aGUtcHJvbWlzZS1yZXNvbHV0aW9uLXByb2NlZHVyZVxuICAgICAgICBpZiAobmV3VmFsdWUgPT09IHNlbGYpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIHByb21pc2UgY2Fubm90IGJlIHJlc29sdmVkIHdpdGggaXRzZWxmLicpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBuZXdWYWx1ZSAmJlxuICAgICAgICAgICAgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG5ld1ZhbHVlID09PSAnZnVuY3Rpb24nKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHZhciB0aGVuID0gbmV3VmFsdWUudGhlbjtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9zdGF0ZSA9IDM7XG4gICAgICAgICAgICAgICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICBmaW5hbGUoc2VsZik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGRvUmVzb2x2ZShiaW5kKHRoZW4sIG5ld1ZhbHVlKSwgc2VsZik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNlbGYuX3N0YXRlID0gMTtcbiAgICAgICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgZmluYWxlKHNlbGYpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KHNlbGYsIGUpO1xuICAgIH1cbn1cblxuY29uc3QgcmVqZWN0ID1mdW5jdGlvbiAoc2VsZiwgbmV3VmFsdWUpIHtcbiAgICBzZWxmLl9zdGF0ZSA9IDI7XG4gICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICBmaW5hbGUoc2VsZik7XG59XG5cbmNvbnN0IGZpbmFsZSA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gICAgaWYgKHNlbGYuX3N0YXRlID09PSAyICYmIHNlbGYuX2RlZmVycmVkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIXNlbGYuX2hhbmRsZWQpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlLl91bmhhbmRsZWRSZWplY3Rpb25GbihzZWxmLl92YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzZWxmLl9kZWZlcnJlZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaGFuZGxlKHNlbGYsIHNlbGYuX2RlZmVycmVkc1tpXSk7XG4gICAgfVxuICAgIHNlbGYuX2RlZmVycmVkcyA9IG51bGw7XG59XG5cbmNvbnN0IEhhbmRsZXIgPSBmdW5jdGlvbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb21pc2UpIHtcbiAgICB0aGlzLm9uRnVsZmlsbGVkID0gdHlwZW9mIG9uRnVsZmlsbGVkID09PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiBudWxsO1xuICAgIHRoaXMub25SZWplY3RlZCA9IHR5cGVvZiBvblJlamVjdGVkID09PSAnZnVuY3Rpb24nID8gb25SZWplY3RlZCA6IG51bGw7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbn1cblxuLyoqXG4gKiBUYWtlIGEgcG90ZW50aWFsbHkgbWlzYmVoYXZpbmcgcmVzb2x2ZXIgZnVuY3Rpb24gYW5kIG1ha2Ugc3VyZVxuICogb25GdWxmaWxsZWQgYW5kIG9uUmVqZWN0ZWQgYXJlIG9ubHkgY2FsbGVkIG9uY2UuXG4gKlxuICogTWFrZXMgbm8gZ3VhcmFudGVlcyBhYm91dCBhc3luY2hyb255LlxuICovXG5jb25zdCBkb1Jlc29sdmUgPSBmdW5jdGlvbiAoZm4sIHNlbGYpIHtcbiAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICAgIGZuKFxuICAgICAgICAgICAgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc2VsZiwgdmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHNlbGYsIHJlYXNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgIHJlamVjdChzZWxmLCBleCk7XG4gICAgfVxufVxuXG5Qcm9taXNlU2hpbS5wcm90b3R5cGVbJ2NhdGNoJ10gPSBmdW5jdGlvbihvblJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGVkKTtcbn07XG5cblByb21pc2VTaGltLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICB2YXIgcHJvbSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG5vb3ApO1xuXG4gICAgaGFuZGxlKHRoaXMsIG5ldyBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9tKSk7XG4gICAgcmV0dXJuIHByb207XG59O1xuXG5Qcm9taXNlU2hpbS5wcm90b3R5cGVbJ2ZpbmFsbHknXSA9IHByb21pc2VGaW5hbGx5O1xuXG5Qcm9taXNlU2hpbS5hbGwgPSBmdW5jdGlvbihhcnIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmICghYXJyIHx8IHR5cGVvZiBhcnIubGVuZ3RoID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2UuYWxsIGFjY2VwdHMgYW4gYXJyYXknKTtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpO1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKFtdKTtcbiAgICAgICAgdmFyIHJlbWFpbmluZyA9IGFyZ3MubGVuZ3RoO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcyhpLCB2YWwpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoZW4gPSB2YWwudGhlbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVuLmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMoaSwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcmdzW2ldID0gdmFsO1xuICAgICAgICAgICAgICAgIGlmICgtLXJlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzKGksIGFyZ3NbaV0pO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlU2hpbS5yZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlU2hpbS5yZWplY3QgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVqZWN0KHZhbHVlKTtcbiAgICB9KTtcbn07XG5cblByb21pc2VTaGltLnJhY2UgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB2YWx1ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhbHVlc1tpXS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbi8vIFVzZSBwb2x5ZmlsbCBmb3Igc2V0SW1tZWRpYXRlIGZvciBwZXJmb3JtYW5jZSBnYWluc1xuUHJvbWlzZVNoaW0uX2ltbWVkaWF0ZUZuID1cbiAgICAodHlwZW9mIHNldEltbWVkaWF0ZUZ1bmMgPT09ICdmdW5jdGlvbicgJiZcbiAgICBmdW5jdGlvbihmbikge1xuICAgICAgICBzZXRJbW1lZGlhdGVGdW5jKGZuKTtcbiAgICB9KSB8fFxuICAgIGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHNldEltbWVkaWF0ZUZ1bmMoZm4sIDApO1xuICAgIH07XG5cblByb21pc2VTaGltLl91bmhhbmRsZWRSZWplY3Rpb25GbiA9IGZ1bmN0aW9uIF91bmhhbmRsZWRSZWplY3Rpb25GbihlcnIpIHtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdQb3NzaWJsZSBVbmhhbmRsZWQgUHJvbWlzZSBSZWplY3Rpb246JywgZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxufTtcblxuY29uc3QgUHJvbWlzZSA9IHdpbmRvdy5Qcm9taXNlIHx8ICh3aW5kb3cuUHJvbWlzZSA9IFByb21pc2VTaGltKTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVkID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb21pc2U7IiwiaW1wb3J0IE92ZW5QbGF5ZXJTREssIHtjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnR9IGZyb20gJy4vb3ZlbnBsYXllci5zZGsnXG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcvdmlldyc7XG5pbXBvcnQgZG9tIGZyb20gJy4vdXRpbHMvcG9seWZpbGxzL2RvbS5qcyc7XG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xuaW1wb3J0IHtnZXRCcm93c2VyfSBmcm9tICd1dGlscy9icm93c2VyJztcblxuXG5fX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuanMnKTtcblxuY29uc3QgT3ZlblBsYXllciA9IHt9O1xud2luZG93Lk92ZW5QbGF5ZXIgPSBPdmVuUGxheWVyO1xuXG5cbi8qKlxuICogQ29weSBwcm9wZXJ0aWVzIGZyb20gT3ZlblBsYXllclNESyBvYmplY3QgdG8gT3ZlblBsYXllciBvYmplY3RcbiAqL1xuT2JqZWN0LmFzc2lnbihPdmVuUGxheWVyLCBPdmVuUGxheWVyU0RLKTtcblxuT3ZlblBsYXllci5jcmVhdGUgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBvcHRpb25zKSB7XG4gICAgbGV0IGJyb3dzZXJOYW1lID0gZ2V0QnJvd3NlcigpO1xuICAgIGlmKGJyb3dzZXJOYW1lID09PSBcImllXCIpe1xuXG4gICAgfVxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50KGNvbnRhaW5lcik7XG4gICAgLypjb25zdCB2aWV3ID0gbmV3IFZpZXcoKTtcblxuICAgIHZpZXcuYXBwZW5kUGxheWVyTWFya3VwKGNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBPdmVuUGxheWVyU0RLLmNyZWF0ZSh2aWV3LmdldE1lZGlhRWxlbWVudENvbnRhaW5lcigpLCBvcHRpb25zKTtcblxuXG4gICAgdmlldy5hZGRDb21wb25lbnRzQW5kRnVuY3Rpb25zKHBsYXllckluc3RhbmNlLCBvcHRpb25zKTsqL1xuXG5cbiAgICB2YXIgcGxheWVyID0gVmlldyhjb250YWluZXJFbGVtZW50KTtcblxuXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBPdmVuUGxheWVyU0RLLmNyZWF0ZShwbGF5ZXIuZ2V0TWVkaWFFbGVtZW50Q29udGFpbmVyKCksIG9wdGlvbnMpO1xuXG4gICAgT2JqZWN0LmFzc2lnbihwbGF5ZXJJbnN0YW5jZSwge1xuICAgICAgICBnZXRDb250YWluZXJJZCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgIHJldHVybiBjb250YWluZXJFbGVtZW50LmlkO1xuICAgICAgIH1cbiAgICB9KTtcblxuICAgIHBsYXllci5zZXRBcGkocGxheWVySW5zdGFuY2UpO1xuXG5cblxuICAgIC8vY29uc29sZS5sb2coY29udGFpbmVyRWxlbWVudCk7XG5cblxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcbn1cblxuIiwiaW1wb3J0IEFQSSBmcm9tICdhcGkvQXBpJztcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gJ3V0aWxzL3ZhbGlkYXRvcic7XG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcbmltcG9ydCBMYSQgZnJvbSAndXRpbHMvbGlrZUEkJztcbmltcG9ydCB7Z2V0U2NyaXB0UGF0aH0gZnJvbSAndXRpbHMvd2VicGFjayc7XG5cblxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSBnZXRTY3JpcHRQYXRoKCdvdmVucGxheWVyLnNkay5qcycpO1xuXG4vKipcbiAqIE1haW4gT3ZlblBsYXllclNESyBvYmplY3RcbiAqL1xuY29uc3QgT3ZlblBsYXllclNESyA9IHdpbmRvdy5PdmVuUGxheWVyU0RLID0ge307XG5cbmNvbnN0IHZlcnNpb24gPSAnMC4wLjEnO1xuXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XG5cbmV4cG9ydCBjb25zdCBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcblxuICAgIGlmICghY29udGFpbmVyKSB7XG5cbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVyKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSkge1xuXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGFpbmVyRWxlbWVudDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgcGxheWVyIGluc3RhbmNlIGFuZCByZXR1cm4gaXQuXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZyB8IGRvbSBlbGVtZW50fSBjb250YWluZXIgIElkIG9mIGNvbnRhaW5lciBlbGVtZW50IG9yIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zICBUaGUgb3B0aW9uc1xuICovXG5PdmVuUGxheWVyU0RLLmNyZWF0ZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgb3B0aW9ucykge1xuXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQoY29udGFpbmVyKTtcblxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gQVBJKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgIHBsYXllckluc3RhbmNlLmluaXQob3B0aW9ucyk7XG5cbiAgICBwbGF5ZXJMaXN0LnB1c2gocGxheWVySW5zdGFuY2UpO1xuXG4gICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgbGlzdC5cbiAqXG4gKiBAcmV0dXJuICAgICB7YXJyYXl9ICBUaGUgcGxheWVyIGxpc3QuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgcmV0dXJuIHBsYXllckxpc3Q7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBjb250YWluZXIgaWQuXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZ30gIGNvbnRhaW5lcklkICBUaGUgY29udGFpbmVyIGlkZW50aWZpZXJcbiAqIEByZXR1cm4gICAgIHtvYmVqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlDb250YWluZXJJZCA9IGZ1bmN0aW9uKGNvbnRhaW5lcklkKSB7XG5cbiAgICBMYSRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XG5cbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uZ2V0Q29udGFpbmVySWQoKSA9PT0gY29udGFpbmVySWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHBsYXllckxpc3RbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGluZGV4LlxuICpcbiAqIEBwYXJhbSAgICAgIHtudW1iZXJ9ICBpbmRleCAgIFRoZSBpbmRleFxuICogQHJldHVybiAgICAge29iamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxuICovXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5SW5kZXggPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBwbGF5ZXJMaXN0W2luZGV4XTtcblxuICAgIGlmIChwbGF5ZXJJbnN0YW5jZSkge1xuXG4gICAgICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn07XG5cbi8qKlxuICogR2VuZXJhdGUgd2VicnRjIHNvdXJjZSBmb3IgcGxheWVyIHNvdXJjZSB0eXBlLlxuICpcbiAqIEBwYXJhbSAgICAgIHtPYmplY3QgfCBBcnJheX0gIHNvdXJjZSAgIHdlYnJ0YyBzb3VyY2VcbiAqIEByZXR1cm4gICAgIHtBcnJheX0gIFBsYXllciBzb3VyY2UgT2JlamN0LlxuICovXG5PdmVuUGxheWVyU0RLLmdlbmVyYXRlV2VicnRjVXJscyA9IGZ1bmN0aW9uKHNvdXJjZXMpIHtcbiAgICByZXR1cm4gKF8uaXNBcnJheShzb3VyY2VzKSA/IHNvdXJjZXMgOiBbc291cmNlc10pLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KXtcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgaXNXZWJSVEMoc291cmNlLmhvc3QpICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcbiAgICAgICAgICAgIHJldHVybiB7ZmlsZSA6IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9cIiArIHNvdXJjZS5zdHJlYW0sIHR5cGUgOiBcIndlYnJ0Y1wiLCBsYWJlbCA6IHNvdXJjZS5sYWJlbCA/IHNvdXJjZS5sYWJlbCA6IFwid2VicnRjLVwiKyhpbmRleCsxKSB9O1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBPdmVuUGxheWVyU0RLO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxuICovXG5cblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXIgPSBmdW5jdGlvbigpe1xuICAgIGlmKChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPcGVyYVwiKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpKSAhPSAtMSApe1xuICAgICAgICByZXR1cm4gJ29wZXJhJztcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIikgIT0gLTEgKXtcbiAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlNhZmFyaVwiKSAhPSAtMSl7XG4gICAgICAgIHJldHVybiAnc2FmYXJpJztcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpICE9IC0xICl7XG4gICAgICAgIHJldHVybiAnZmlyZWZveCc7XG4gICAgfWVsc2UgaWYoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIikgIT0gLTEgKSl7XG4gICAgICAgIGxldCBtc2llID0gYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpO1xuICAgICAgICBpZighIWRvY3VtZW50LmRvY3VtZW50TW9kZSA9PSB0cnVlICl7XG4gICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgfWVsc2UgaWYoISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LipydlxcOjExXFwuLykpe1xuICAgICAgICAgICAgaWYgKCFpc05hTihwYXJzZUludCh1YS5zdWJzdHJpbmcobXNpZSArIDUsIHVhLmluZGV4T2YoXCIuXCIsIG1zaWUpKSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpZSc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XG4gICAgICAgIH1cblxuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgIH1cblxufTtcblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjMuLlxuICovXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG4vKipcbiAqIEBicmllZiAgIEl0IHdhcyByZXBsYWNlIGpxdWVyeSdzIHNlbGVjdG9yLiBJdCBPZnRlbiB1c2VkIGJ5IE92ZW5UZW1wbGF0ZS4gKC92aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUuanMpXG4gKiBAcGFyYW0gICBzZWxlY3Rvck9yRWxlbWVudCAgc3RyaW5nIG9yIGVsZW1lbnRcbiAqXG4gKiAqL1xuXG5cbmNvbnN0IExhJCA9IGZ1bmN0aW9uKHNlbGVjdG9yT3JFbGVtZW50KXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgY29uc3QgcmV0dXJuTm9kZSA9IGZ1bmN0aW9uKCRlbGVtZW50ICwgc2VsZWN0b3Ipe1xuICAgICAgICBsZXQgbm9kZUxpc3QgPSAgJGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgIGlmKG5vZGVMaXN0Lmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdFswXTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGxldCAkZWxlbWVudCA9IFwiXCI7XG5cbiAgICBpZiggXy5ldmVyeShzZWxlY3Rvck9yRWxlbWVudCwgZnVuY3Rpb24oaXRlbSl7cmV0dXJuIF8uaXNFbGVtZW50KGl0ZW0pfSkpe1xuICAgICAgICAkZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcImRvY3VtZW50XCIpe1xuICAgICAgICAkZWxlbWVudCA9IGRvY3VtZW50O1xuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcIndpbmRvd1wiKXtcbiAgICAgICAgJGVsZW1lbnQgPSB3aW5kb3c7XG4gICAgfWVsc2V7XG4gICAgICAgICRlbGVtZW50ID0gcmV0dXJuTm9kZShkb2N1bWVudCwgc2VsZWN0b3JPckVsZW1lbnQpO1xuICAgIH1cblxuXG4gICAgaWYoISRlbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdGhhdC5maW5kID0gKHNlbGVjdG9yKSA9PntcbiAgICAgICAgcmV0dXJuIExhJChyZXR1cm5Ob2RlKCRlbGVtZW50LCBzZWxlY3RvcikpO1xuICAgIH07XG5cbiAgICB0aGF0LmNzcyA9IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZigkZWxlbWVudC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICRlbGVtZW50LmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuYWRkQ2xhc3MgPSAobmFtZSkgPT57XG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWVzID0gJGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICAgIGlmKGNsYXNzTmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpe1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSArPSBcIiBcIiArIG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LnJlbW92ZUNsYXNzID0gKG5hbWUpID0+e1xuICAgICAgICBpZiAoJGVsZW1lbnQuY2xhc3NMaXN0KXtcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lID0gJGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIG5hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XG5cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LnNob3cgPSAoKSA9PntcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfTtcblxuICAgIHRoYXQuaGlkZSA9ICgpID0+e1xuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH07XG5cbiAgICB0aGF0LmFwcGVuZCA9IChodG1sQ29kZSkgPT57XG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCArPSBodG1sQ29kZTtcbiAgICB9O1xuXG4gICAgdGhhdC50ZXh0ID0gKHRleHQpID0+IHsgLy9JRTgrXG4gICAgICAgIGlmKHRleHQpe1xuICAgICAgICAgICAgJGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0Lmhhc0NsYXNzID0gKG5hbWUpID0+IHsgLy9JRTgrXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBuYW1lICsgJyggfCQpJywgJ2dpJykudGVzdCgkZWxlbWVudC5uYW1lKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmlzID0gKCR0YXJnZXRFbGVtZW50KSA9PiB7XG4gICAgICAgIHJldHVybiAkZWxlbWVudCA9PT0gJHRhcmdldEVsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQub2Zmc2V0ID0gKCkgPT57ICAgIC8vSUU4K1xuICAgICAgICB2YXIgcmVjdCA9ICRlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnRcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LndpZHRoID0gKCkgPT4geyAgICAvL0lFOCtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIH07XG5cbiAgICB0aGF0LmhlaWdodCA9ICgpID0+IHsgICAvL0lFOCtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICB9O1xuXG4gICAgdGhhdC5hdHRyID0gKGF0dHIpID0+IHtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKTtcbiAgICB9O1xuXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7ICAgLy9JRTgrXG4gICAgICAgICRlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJGVsZW1lbnQpO1xuICAgIH07XG5cbiAgICB0aGF0LnJlcGxhY2UgPSAoaHRtbCkgPT4ge1xuICAgICAgICAkZWxlbWVudC5yZXBsYWNlV2l0aChodG1sKTtcbiAgICB9O1xuXG4gICAgdGhhdC5hcHBlbmQgPSAoaHRtbCkgPT4ge1xuICAgICAgICAkZWxlbWVudC5hcHBlbmRDaGlsZChodG1sKTtcbiAgICB9O1xuXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgICRlbGVtZW50LnJlbW92ZSgpO1xuICAgIH07XG5cbiAgICB0aGF0LmdldCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50O1xuICAgIH07XG5cbiAgICB0aGF0LmNsb3Nlc3QgPSAoc2VsZWN0b3JTdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JTdHJpbmcpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExhJDtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDI0Li5cbiAqL1xuXG5jb25zdCBsb2dnZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgcHJldkNvbnNvbGVMb2cgPSBudWxsO1xuXG4gICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0ge2xvZyA6IHdpbmRvd1snY29uc29sZSddWydsb2cnXX07XG5cbiAgICB0aGF0LmVuYWJsZSA9ICgpID0+e1xuICAgICAgICBpZihwcmV2Q29uc29sZUxvZyA9PSBudWxsKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBwcmV2Q29uc29sZUxvZztcbiAgICB9O1xuICAgIHRoYXQuZGlzYWJsZSA9ICgpID0+e1xuICAgICAgICBwcmV2Q29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBmdW5jdGlvbigpe307XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0gbnVsbDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjsiLCIvKlxuKiBDb3B5cmlnaHQgMjAxOCBKb3NodWEgQmVsbFxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4qICovXG5cbihmdW5jdGlvbihnbG9iYWwpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaWYgKCEoJ3dpbmRvdycgaW4gZ2xvYmFsICYmICdkb2N1bWVudCcgaW4gZ2xvYmFsKSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy9cbiAgICAvLyBET01cbiAgICAvLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvXG4gICAgLy9cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIERvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgbWV0aG9kXG4gICAgLy8gaHR0cDovL2FqYXhpYW4uY29tL2FyY2hpdmVzL2NyZWF0aW5nLWEtcXVlcnlzZWxlY3Rvci1mb3ItaWUtdGhhdC1ydW5zLWF0LW5hdGl2ZS1zcGVlZFxuICAgIC8vIE5lZWRlZCBmb3I6IElFNy1cbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCA9IGZ1bmN0aW9uKHNlbGVjdG9ycykge1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSwgZWxlbWVudHMgPSBbXSwgZWxlbWVudDtcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5maXJzdENoaWxkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgICAgIGRvY3VtZW50Ll9xc2EgPSBbXTtcblxuICAgICAgICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gc2VsZWN0b3JzICsgJ3t4LXFzYTpleHByZXNzaW9uKGRvY3VtZW50Ll9xc2EgJiYgZG9jdW1lbnQuX3FzYS5wdXNoKHRoaXMpKX0nO1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIDApO1xuICAgICAgICAgICAgc3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cbiAgICAgICAgICAgIHdoaWxlIChkb2N1bWVudC5fcXNhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5fcXNhLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ3gtcXNhJyk7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50Ll9xc2EgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIERvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgbWV0aG9kXG4gICAgLy8gTmVlZGVkIGZvcjogSUU3LVxuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3Rvcikge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yID0gZnVuY3Rpb24oc2VsZWN0b3JzKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ycyk7XG4gICAgICAgICAgICByZXR1cm4gKGVsZW1lbnRzLmxlbmd0aCkgPyBlbGVtZW50c1swXSA6IG51bGw7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gRG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSBtZXRob2RcbiAgICAvLyBOZWVkZWQgZm9yOiBJRTgtXG4gICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBmdW5jdGlvbihjbGFzc05hbWVzKSB7XG4gICAgICAgICAgICBjbGFzc05hbWVzID0gU3RyaW5nKGNsYXNzTmFtZXMpLnJlcGxhY2UoL158XFxzKy9nLCAnLicpO1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xhc3NOYW1lcyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gTm9kZSBpbnRlcmZhY2UgY29uc3RhbnRzXG4gICAgLy8gTmVlZGVkIGZvcjogSUU4LVxuICAgIGdsb2JhbC5Ob2RlID0gZ2xvYmFsLk5vZGUgfHwgZnVuY3Rpb24oKSB7IHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgY29uc3RydWN0b3JcIik7IH07XG4gICAgW1xuICAgICAgICBbJ0VMRU1FTlRfTk9ERScsIDFdLFxuICAgICAgICBbJ0FUVFJJQlVURV9OT0RFJywgMl0sXG4gICAgICAgIFsnVEVYVF9OT0RFJywgM10sXG4gICAgICAgIFsnQ0RBVEFfU0VDVElPTl9OT0RFJywgNF0sXG4gICAgICAgIFsnRU5USVRZX1JFRkVSRU5DRV9OT0RFJywgNV0sXG4gICAgICAgIFsnRU5USVRZX05PREUnLCA2XSxcbiAgICAgICAgWydQUk9DRVNTSU5HX0lOU1RSVUNUSU9OX05PREUnLCA3XSxcbiAgICAgICAgWydDT01NRU5UX05PREUnLCA4XSxcbiAgICAgICAgWydET0NVTUVOVF9OT0RFJywgOV0sXG4gICAgICAgIFsnRE9DVU1FTlRfVFlQRV9OT0RFJywgMTBdLFxuICAgICAgICBbJ0RPQ1VNRU5UX0ZSQUdNRU5UX05PREUnLCAxMV0sXG4gICAgICAgIFsnTk9UQVRJT05fTk9ERScsIDEyXVxuICAgIF0uZm9yRWFjaChmdW5jdGlvbihwKSB7IGlmICghKHBbMF0gaW4gZ2xvYmFsLk5vZGUpKSBnbG9iYWwuTm9kZVtwWzBdXSA9IHBbMV07IH0pO1xuXG4gICAgLy8gRE9NRXhjZXB0aW9uIGNvbnN0YW50c1xuICAgIC8vIE5lZWRlZCBmb3I6IElFOC1cbiAgICBnbG9iYWwuRE9NRXhjZXB0aW9uID0gZ2xvYmFsLkRPTUV4Y2VwdGlvbiB8fCBmdW5jdGlvbigpIHsgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBjb25zdHJ1Y3RvclwiKTsgfTtcbiAgICBbXG4gICAgICAgIFsnSU5ERVhfU0laRV9FUlInLCAxXSxcbiAgICAgICAgWydET01TVFJJTkdfU0laRV9FUlInLCAyXSxcbiAgICAgICAgWydISUVSQVJDSFlfUkVRVUVTVF9FUlInLCAzXSxcbiAgICAgICAgWydXUk9OR19ET0NVTUVOVF9FUlInLCA0XSxcbiAgICAgICAgWydJTlZBTElEX0NIQVJBQ1RFUl9FUlInLCA1XSxcbiAgICAgICAgWydOT19EQVRBX0FMTE9XRURfRVJSJywgNl0sXG4gICAgICAgIFsnTk9fTU9ESUZJQ0FUSU9OX0FMTE9XRURfRVJSJywgN10sXG4gICAgICAgIFsnTk9UX0ZPVU5EX0VSUicsIDhdLFxuICAgICAgICBbJ05PVF9TVVBQT1JURURfRVJSJywgOV0sXG4gICAgICAgIFsnSU5VU0VfQVRUUklCVVRFX0VSUicsIDEwXSxcbiAgICAgICAgWydJTlZBTElEX1NUQVRFX0VSUicsIDExXSxcbiAgICAgICAgWydTWU5UQVhfRVJSJywgMTJdLFxuICAgICAgICBbJ0lOVkFMSURfTU9ESUZJQ0FUSU9OX0VSUicsIDEzXSxcbiAgICAgICAgWydOQU1FU1BBQ0VfRVJSJywgMTRdLFxuICAgICAgICBbJ0lOVkFMSURfQUNDRVNTX0VSUicsIDE1XVxuICAgIF0uZm9yRWFjaChmdW5jdGlvbihwKSB7IGlmICghKHBbMF0gaW4gZ2xvYmFsLkRPTUV4Y2VwdGlvbikpIGdsb2JhbC5ET01FeGNlcHRpb25bcFswXV0gPSBwWzFdOyB9KTtcblxuICAgIC8vIEV2ZW50IGFuZCBFdmVudFRhcmdldHMgaW50ZXJmYWNlc1xuICAgIC8vIE5lZWRlZCBmb3I6IElFOFxuICAgIChmdW5jdGlvbigpe1xuICAgICAgICBpZiAoISgnRWxlbWVudCcgaW4gZ2xvYmFsKSB8fCBFbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyIHx8ICFPYmplY3QuZGVmaW5lUHJvcGVydHkpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgLy8gaW50ZXJmYWNlIEV2ZW50XG5cbiAgICAgICAgLy8gUGhhc2VUeXBlIChjb25zdCB1bnNpZ25lZCBzaG9ydClcbiAgICAgICAgRXZlbnQuQ0FQVFVSSU5HX1BIQVNFID0gMTtcbiAgICAgICAgRXZlbnQuQVRfVEFSR0VUICAgICAgID0gMjtcbiAgICAgICAgRXZlbnQuQlVCQkxJTkdfUEhBU0UgID0gMztcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhFdmVudC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIENBUFRVUklOR19QSEFTRTogeyBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gMTsgfSB9LFxuICAgICAgICAgICAgQVRfVEFSR0VUOiAgICAgICB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiAyOyB9IH0sXG4gICAgICAgICAgICBCVUJCTElOR19QSEFTRTogICB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiAzOyB9IH0sXG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zcmNFbGVtZW50O1xuICAgICAgICAgICAgICAgIH19LFxuICAgICAgICAgICAgY3VycmVudFRhcmdldDoge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VGFyZ2V0O1xuICAgICAgICAgICAgICAgIH19LFxuICAgICAgICAgICAgZXZlbnRQaGFzZToge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5zcmNFbGVtZW50ID09PSB0aGlzLmN1cnJlbnRUYXJnZXQpID8gRXZlbnQuQVRfVEFSR0VUIDogRXZlbnQuQlVCQkxJTkdfUEhBU0U7XG4gICAgICAgICAgICAgICAgfX0sXG4gICAgICAgICAgICBidWJibGVzOiB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1vdXNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkYmxjbGljayc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZW92ZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNlb3V0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNld2hlZWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gS2V5Ym9hcmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2tleWRvd24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAna2V5cHJlc3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAna2V5dXAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRnJhbWUvT2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXNpemUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2Nyb2xsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjaGFuZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3VibWl0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Jlc2V0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfX0sXG4gICAgICAgICAgICBjYW5jZWxhYmxlOiB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1vdXNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkYmxjbGljayc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZW92ZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2VvdXQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2V3aGVlbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBLZXlib2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAna2V5ZG93bic6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdrZXlwcmVzcyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdrZXl1cCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdWJtaXQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9fSxcbiAgICAgICAgICAgIHRpbWVTdGFtcDoge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90aW1lU3RhbXA7XG4gICAgICAgICAgICAgICAgfX0sXG4gICAgICAgICAgICBzdG9wUHJvcGFnYXRpb246IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9fSxcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfX0sXG4gICAgICAgICAgICBkZWZhdWx0UHJldmVudGVkOiB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmV0dXJuVmFsdWUgPT09IGZhbHNlO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGludGVyZmFjZSBFdmVudFRhcmdldFxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHJldHVybjtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnRE9NQ29udGVudExvYWRlZCcpIHR5cGUgPSAnbG9hZCc7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcztcbiAgICAgICAgICAgIHZhciBmID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUuX3RpbWVTdGFtcCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgZS5fY3VycmVudFRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGUpO1xuICAgICAgICAgICAgICAgIGUuX2N1cnJlbnRUYXJnZXQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXNbJ18nICsgdHlwZSArIGxpc3RlbmVyXSA9IGY7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCBmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHJldHVybjtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnRE9NQ29udGVudExvYWRlZCcpIHR5cGUgPSAnbG9hZCc7XG4gICAgICAgICAgICB2YXIgZiA9IHRoaXNbJ18nICsgdHlwZSArIGxpc3RlbmVyXTtcbiAgICAgICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhY2hFdmVudCgnb24nICsgdHlwZSwgZik7XG4gICAgICAgICAgICAgICAgdGhpc1snXycgKyB0eXBlICsgbGlzdGVuZXJdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIFtXaW5kb3csIEhUTUxEb2N1bWVudCwgRWxlbWVudF0uZm9yRWFjaChmdW5jdGlvbihvKSB7XG4gICAgICAgICAgICBvLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lcjtcbiAgICAgICAgICAgIG8ucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyO1xuICAgICAgICB9KTtcbiAgICB9KCkpO1xuXG4gICAgLy8gQ3VzdG9tRXZlbnRcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnQvQ3VzdG9tRXZlbnRcbiAgICAvLyBOZWVkZWQgZm9yOiBJRVxuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgnQ3VzdG9tRXZlbnQnIGluIGdsb2JhbCAmJiB0eXBlb2YgZ2xvYmFsLkN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGZ1bmN0aW9uIEN1c3RvbUV2ZW50ICggZXZlbnQsIHBhcmFtcyApIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiB1bmRlZmluZWQgfTtcbiAgICAgICAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCggJ0N1c3RvbUV2ZW50JyApO1xuICAgICAgICAgICAgZXZ0LmluaXRDdXN0b21FdmVudCggZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCApO1xuICAgICAgICAgICAgcmV0dXJuIGV2dDtcbiAgICAgICAgfVxuICAgICAgICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSBnbG9iYWwuRXZlbnQucHJvdG90eXBlO1xuICAgICAgICBnbG9iYWwuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDtcbiAgICB9KSgpO1xuXG4gICAgLy8gU2hpbSBmb3IgRE9NIEV2ZW50cyBmb3IgSUU3LVxuICAgIC8vIGh0dHA6Ly93d3cucXVpcmtzbW9kZS5vcmcvYmxvZy9hcmNoaXZlcy8yMDA1LzEwL19hbmRfdGhlX3dpbm5lcl8xLmh0bWxcbiAgICAvLyBVc2UgYWRkRXZlbnQob2JqZWN0LCBldmVudCwgaGFuZGxlcikgaW5zdGVhZCBvZiBvYmplY3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcilcbiAgICB3aW5kb3cuYWRkRXZlbnQgPSBmdW5jdGlvbihvYmosIHR5cGUsIGZuKSB7XG4gICAgICAgIGlmIChvYmouYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgb2JqLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmIChvYmouYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgIG9ialtcImVcIiArIHR5cGUgKyBmbl0gPSBmbjtcbiAgICAgICAgICAgIG9ialt0eXBlICsgZm5dID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGUgPSB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0ID0gb2JqO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbigpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24oKSB7IGUuY2FuY2VsQnViYmxlID0gdHJ1ZTsgfTtcbiAgICAgICAgICAgICAgICBlLnRhcmdldCA9IGUuc3JjRWxlbWVudDtcbiAgICAgICAgICAgICAgICBlLnRpbWVTdGFtcCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgb2JqW1wiZVwiICsgdHlwZSArIGZuXS5jYWxsKHRoaXMsIGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG9iai5hdHRhY2hFdmVudChcIm9uXCIgKyB0eXBlLCBvYmpbdHlwZSArIGZuXSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24ob2JqLCB0eXBlLCBmbikge1xuICAgICAgICBpZiAob2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9iai5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAob2JqLmRldGFjaEV2ZW50KSB7XG4gICAgICAgICAgICBvYmouZGV0YWNoRXZlbnQoXCJvblwiICsgdHlwZSwgb2JqW3R5cGUgKyBmbl0pO1xuICAgICAgICAgICAgb2JqW3R5cGUgKyBmbl0gPSBudWxsO1xuICAgICAgICAgICAgb2JqW1wiZVwiICsgdHlwZSArIGZuXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gRE9NVG9rZW5MaXN0IGludGVyZmFjZSBhbmQgRWxlbWVudC5jbGFzc0xpc3QgLyBFbGVtZW50LnJlbExpc3RcbiAgICAvLyBOZWVkZWQgZm9yOiBJRTktXG4gICAgLy8gVXNlIGdldENsYXNzTGlzdChlbGVtKSBpbnN0ZWFkIG9mIGVsZW0uY2xhc3NMaXN0KCkgaWYgSUU3LSBzdXBwb3J0IGlzIG5lZWRlZFxuICAgIC8vIFVzZSBnZXRSZWxMaXN0KGVsZW0pIGluc3RlYWQgb2YgZWxlbS5yZWxMaXN0KCkgaWYgSUU3LSBzdXBwb3J0IGlzIG5lZWRlZFxuICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gRE9NVG9rZW5MaXN0U2hpbShvLCBwKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBzcGxpdChzKSB7IHJldHVybiBzLmxlbmd0aCA/IHMuc3BsaXQoL1xccysvZykgOiBbXTsgfVxuXG4gICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGRvZXMgbm90IGV4YWN0bHkgbWF0Y2ggdGhlIHNwZWMuXG4gICAgICAgICAgICBmdW5jdGlvbiByZW1vdmVUb2tlbkZyb21TdHJpbmcodG9rZW4sIHN0cmluZykge1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBzcGxpdChzdHJpbmcpLFxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHRva2Vucy5pbmRleE9mKHRva2VuKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2Vucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5zLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoXG4gICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHNwbGl0KG9bcF0pLmxlbmd0aDsgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbihpZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gc3BsaXQob1twXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDAgPD0gaWR4ICYmIGlkeCA8IHRva2Vucy5sZW5ndGggPyB0b2tlbnNbaWR4XSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgY29udGFpbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gU3RyaW5nKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4ubGVuZ3RoID09PSAwKSB7IHRocm93IFN5bnRheEVycm9yKCk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoL1xccy8udGVzdCh0b2tlbikpIHsgdGhyb3cgRXJyb3IoXCJJbnZhbGlkQ2hhcmFjdGVyRXJyb3JcIik7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gc3BsaXQob1twXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5zLmluZGV4T2YodG9rZW4pICE9PSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBhZGQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbigvKnRva2Vucy4uLiovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykubWFwKFN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2Vucy5zb21lKGZ1bmN0aW9uKHRva2VuKSB7IHJldHVybiB0b2tlbi5sZW5ndGggPT09IDA7IH0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFN5bnRheEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbnMuc29tZShmdW5jdGlvbih0b2tlbikgeyByZXR1cm4gKC9cXHMvKS50ZXN0KHRva2VuKTsgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJJbnZhbGlkQ2hhcmFjdGVyRXJyb3JcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVuZGVybHlpbmdfc3RyaW5nID0gb1twXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuX2xpc3QgPSBzcGxpdCh1bmRlcmx5aW5nX3N0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VucyA9IHRva2Vucy5maWx0ZXIoZnVuY3Rpb24odG9rZW4pIHsgcmV0dXJuIHRva2VuX2xpc3QuaW5kZXhPZih0b2tlbikgPT09IC0xOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5kZXJseWluZ19zdHJpbmcubGVuZ3RoICE9PSAwICYmICEoL1xccyQvKS50ZXN0KHVuZGVybHlpbmdfc3RyaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZXJseWluZ19zdHJpbmcgKz0gJyAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybHlpbmdfc3RyaW5nICs9IHRva2Vucy5qb2luKCcgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bcF0gPSB1bmRlcmx5aW5nX3N0cmluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gc3BsaXQob1twXSkubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggIT09IGxlbmd0aCkgeyB0aGlzLmxlbmd0aCA9IGxlbmd0aDsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICByZW1vdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbigvKnRva2Vucy4uLiovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykubWFwKFN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2Vucy5zb21lKGZ1bmN0aW9uKHRva2VuKSB7IHJldHVybiB0b2tlbi5sZW5ndGggPT09IDA7IH0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFN5bnRheEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbnMuc29tZShmdW5jdGlvbih0b2tlbikgeyByZXR1cm4gKC9cXHMvKS50ZXN0KHRva2VuKTsgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJJbnZhbGlkQ2hhcmFjdGVyRXJyb3JcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVuZGVybHlpbmdfc3RyaW5nID0gb1twXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5zLmZvckVhY2goZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybHlpbmdfc3RyaW5nID0gcmVtb3ZlVG9rZW5Gcm9tU3RyaW5nKHRva2VuLCB1bmRlcmx5aW5nX3N0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW3BdID0gdW5kZXJseWluZ19zdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHNwbGl0KG9bcF0pLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoICE9PSBsZW5ndGgpIHsgdGhpcy5sZW5ndGggPSBsZW5ndGg7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24odG9rZW4vKiwgZm9yY2UqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JjZSA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IFN0cmluZyh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi5sZW5ndGggPT09IDApIHsgdGhyb3cgU3ludGF4RXJyb3IoKTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoL1xccy8udGVzdCh0b2tlbikpIHsgdGhyb3cgRXJyb3IoXCJJbnZhbGlkQ2hhcmFjdGVyRXJyb3JcIik7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IHNwbGl0KG9bcF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB0b2tlbnMuaW5kZXhPZih0b2tlbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSAmJiAoIWZvcmNlIHx8IGZvcmNlID09PSAodm9pZCAwKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bcF0gPSByZW1vdmVUb2tlbkZyb21TdHJpbmcodG9rZW4sIG9bcF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEgJiYgZm9yY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1bmRlcmx5aW5nX3N0cmluZyA9IG9bcF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1bmRlcmx5aW5nX3N0cmluZy5sZW5ndGggIT09IDAgJiYgIS9cXHMkLy50ZXN0KHVuZGVybHlpbmdfc3RyaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZXJseWluZ19zdHJpbmcgKz0gJyAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybHlpbmdfc3RyaW5nICs9IHRva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW3BdID0gdW5kZXJseWluZ19zdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSBzcGxpdChvW3BdKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCAhPT0gbGVuZ3RoKSB7IHRoaXMubGVuZ3RoID0gbGVuZ3RoOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIHRvU3RyaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9bcF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghKCdsZW5ndGgnIGluIHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgLy8gSW4gY2FzZSBnZXR0ZXJzIGFyZSBub3Qgc3VwcG9ydGVkXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBzcGxpdChvW3BdKS5sZW5ndGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXkgYXJlLCBzaGltIGluIGluZGV4IGdldHRlcnMgKHVwIHRvIDEwMClcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBTdHJpbmcoaSksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldDogKGZ1bmN0aW9uKG4pIHsgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5pdGVtKG4pOyB9OyB9KGkpKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRUb0VsZW1lbnRQcm90b3R5cGUocCwgZikge1xuICAgICAgICAgICAgaWYgKCdFbGVtZW50JyBpbiBnbG9iYWwgJiYgRWxlbWVudC5wcm90b3R5cGUgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEVsZW1lbnQucHJvdG90eXBlLCBwLCB7IGdldDogZiB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhUTUwgLSBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnXG4gICAgICAgIC8vIEVsZW1lbnQuY2xhc3NMaXN0XG4gICAgICAgIGlmICgnY2xhc3NMaXN0JyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJykpIHtcbiAgICAgICAgICAgIHdpbmRvdy5nZXRDbGFzc0xpc3QgPSBmdW5jdGlvbihlbGVtKSB7IHJldHVybiBlbGVtLmNsYXNzTGlzdDsgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5nZXRDbGFzc0xpc3QgPSBmdW5jdGlvbihlbGVtKSB7IHJldHVybiBuZXcgRE9NVG9rZW5MaXN0U2hpbShlbGVtLCAnY2xhc3NOYW1lJyk7IH07XG4gICAgICAgICAgICBhZGRUb0VsZW1lbnRQcm90b3R5cGUoJ2NsYXNzTGlzdCcsIGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3IERPTVRva2VuTGlzdFNoaW0odGhpcywgJ2NsYXNzTmFtZScpOyB9ICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIVE1MIC0gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZ1xuICAgICAgICAvLyBIVE1MQW5jaG9yRWxlbWVudC5yZWxMaXN0XG4gICAgICAgIC8vIEhUTUxMaW5rRWxlbWVudC5yZWxMaXN0XG4gICAgICAgIGlmICgncmVsTGlzdCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpKSB7XG4gICAgICAgICAgICB3aW5kb3cuZ2V0UmVsTGlzdCA9IGZ1bmN0aW9uKGVsZW0pIHsgcmV0dXJuIGVsZW0ucmVsTGlzdDsgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5nZXRSZWxMaXN0ID0gZnVuY3Rpb24oZWxlbSkgeyByZXR1cm4gbmV3IERPTVRva2VuTGlzdFNoaW0oZWxlbSwgJ3JlbCcpOyB9O1xuICAgICAgICAgICAgYWRkVG9FbGVtZW50UHJvdG90eXBlKCdyZWxMaXN0JywgZnVuY3Rpb24oKSB7IHJldHVybiBuZXcgRE9NVG9rZW5MaXN0U2hpbSh0aGlzLCAncmVsJyk7IH0gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBzZWNvbmQgYXJndW1lbnQgdG8gbmF0aXZlIERPTVRva2VuTGlzdC50b2dnbGUoKSBpZiBuZWNlc3NhcnlcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCEoJ0RPTVRva2VuTGlzdCcgaW4gZ2xvYmFsKSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBpZiAoISgnY2xhc3NMaXN0JyBpbiBlKSkgcmV0dXJuO1xuICAgICAgICAgICAgZS5jbGFzc0xpc3QudG9nZ2xlKCd4JywgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKCFlLmNsYXNzTGlzdC5jb250YWlucygneCcpKSByZXR1cm47XG4gICAgICAgICAgICBnbG9iYWwuRE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiB0b2dnbGUodG9rZW4vKiwgZm9yY2UqLykge1xuICAgICAgICAgICAgICAgIHZhciBmb3JjZSA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWRkID0gIXRoaXMuY29udGFpbnModG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2FkZCA/ICdhZGQnIDogJ3JlbW92ZSddKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFkZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yY2UgPSAhIWZvcmNlO1xuICAgICAgICAgICAgICAgIHRoaXNbZm9yY2UgPyAnYWRkJyA6ICdyZW1vdmUnXSh0b2tlbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcmNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSgpKTtcblxuXG4gICAgICAgIC8vIERPTSAtIEludGVyZmFjZSBOb25Eb2N1bWVudFR5cGVDaGlsZE5vZGVcbiAgICAgICAgLy8gSW50ZXJmYWNlIE5vbkRvY3VtZW50VHlwZUNoaWxkTm9kZVxuICAgICAgICAvLyBwcmV2aW91c0VsZW1lbnRTaWJsaW5nIC8gbmV4dEVsZW1lbnRTaWJsaW5nIC0gZm9yIElFOFxuXG4gICAgICAgIGlmICghKCdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpKSB7XG4gICAgICAgICAgICBhZGRUb0VsZW1lbnRQcm90b3R5cGUoJ3ByZXZpb3VzRWxlbWVudFNpYmxpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IHRoaXMucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAgICAgICAgIHdoaWxlIChuICYmIG4ubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFKVxuICAgICAgICAgICAgICAgICAgICBuID0gbi5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG47XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKCduZXh0RWxlbWVudFNpYmxpbmcnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpIHtcbiAgICAgICAgICAgIGFkZFRvRWxlbWVudFByb3RvdHlwZSgnbmV4dEVsZW1lbnRTaWJsaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSB0aGlzLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIHdoaWxlIChuICYmIG4ubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFKVxuICAgICAgICAgICAgICAgICAgICBuID0gbi5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICByZXR1cm4gbjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSgpKTtcblxuICAgIC8vIEVsZW1lbnQubWF0Y2hlc1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0FQSS9FbGVtZW50L21hdGNoZXNcbiAgICAvLyBOZWVkZWQgZm9yOiBJRSwgRmlyZWZveCAzLjYsIGVhcmx5IFdlYmtpdCBhbmQgT3BlcmEgMTUuMFxuICAgIC8vIFVzZSBtc01hdGNoZXNTZWxlY3RvcihzZWxlY3RvcikgZm9yIElFXG4gICAgLy8gVXNlIG9NYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpIGZvciBPcGVyYSAxNS4wXG4gICAgLy8gVXNlIG1vek1hdGNoZXNTZWxlY3RvcihzZWxlY3RvcikgZm9yIEZpcmVmb3ggMy42XG4gICAgLy8gVXNlIHdlYmtpdE1hdGNoZXNTZWxlY3RvcihzZWxlY3RvcikgZm9yIGVhcmx5IFdlYmtpdFxuICAgIC8vIFVzZSBwb2x5ZmlsbCBpZiBubyBtYXRjaGVzKCkgc3VwcG9ydCwgYnV0IHF1ZXJ5U2VsZWN0b3JBbGwoKSBzdXBwb3J0XG4gICAgaWYgKCdFbGVtZW50JyBpbiBnbG9iYWwgJiYgIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcbiAgICAgICAgaWYgKEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yKSB7XG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3I7XG4gICAgICAgIH0gZWxzZSBpZiAoRWxlbWVudC5wcm90b3R5cGUub01hdGNoZXNTZWxlY3Rvcikge1xuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLm9NYXRjaGVzU2VsZWN0b3I7XG4gICAgICAgIH0gZWxzZSBpZiAoRWxlbWVudC5wcm90b3R5cGUubW96TWF0Y2hlc1NlbGVjdG9yKSB7XG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUubW96TWF0Y2hlc1NlbGVjdG9yO1xuICAgICAgICB9IGVsc2UgaWYgKEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3Rvcikge1xuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKSB7XG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gZnVuY3Rpb24gbWF0Y2hlcyhzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gKHRoaXMuZG9jdW1lbnQgfHwgdGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSxcbiAgICAgICAgICAgICAgICAgICAgaSA9IG1hdGNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlICgtLWkgPj0gMCAmJiBtYXRjaGVzLml0ZW0oaSkgIT09IHRoaXMpIHt9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgPiAtMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFbGVtZW50LmNsb3Nlc3RcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9jbG9zZXN0XG4gICAgaWYgKHdpbmRvdy5FbGVtZW50ICYmICFFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0KSB7XG4gICAgICAgIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgPSBmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hlcyA9ICh0aGlzLmRvY3VtZW50IHx8IHRoaXMub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzKSxcbiAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgIGVsID0gdGhpcztcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBpID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKC0taSA+PSAwICYmIG1hdGNoZXMuaXRlbShpKSAhPT0gZWwpIHt9O1xuICAgICAgICAgICAgfSB3aGlsZSAoKGkgPCAwKSAmJiAoZWwgPSBlbC5wYXJlbnRFbGVtZW50KSk7XG4gICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWl4aW4obywgcHMpIHtcbiAgICAgICAgaWYgKCFvKSByZXR1cm47XG4gICAgICAgIE9iamVjdC5rZXlzKHBzKS5mb3JFYWNoKGZ1bmN0aW9uKHApIHtcbiAgICAgICAgICAgIGlmICgocCBpbiBvKSB8fCAocCBpbiBvLnByb3RvdHlwZSkpIHJldHVybjtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAgICAgICAgICAgICAgICAgICBvLnByb3RvdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgcCxcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcywgcClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICAvLyBUaHJvd3MgaW4gSUU4OyBqdXN0IGNvcHkgaXRcbiAgICAgICAgICAgICAgICBvW3BdID0gcHNbcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE1peGluIFBhcmVudE5vZGVcbiAgICAvLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2ludGVyZmFjZS1wYXJlbnRub2RlXG5cbiAgICBmdW5jdGlvbiBjb252ZXJ0Tm9kZXNJbnRvQU5vZGUobm9kZXMpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xuICAgICAgICBub2RlcyA9IG5vZGVzLm1hcChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gIShub2RlIGluc3RhbmNlb2YgTm9kZSkgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKSA6IG5vZGU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobm9kZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBub2RlID0gbm9kZXNbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbihuKSB7IG5vZGUuYXBwZW5kQ2hpbGQobik7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIHZhciBQYXJlbnROb2RlID0ge1xuICAgICAgICBwcmVwZW5kOiBmdW5jdGlvbigvKi4uLm5vZGVzKi8pIHtcbiAgICAgICAgICAgIHZhciBub2RlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIG5vZGVzID0gY29udmVydE5vZGVzSW50b0FOb2RlKG5vZGVzKTtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0QmVmb3JlKG5vZGVzLCB0aGlzLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9LFxuICAgICAgICBhcHBlbmQ6IGZ1bmN0aW9uKC8qLi4ubm9kZXMqLykge1xuICAgICAgICAgICAgdmFyIG5vZGVzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgbm9kZXMgPSBjb252ZXJ0Tm9kZXNJbnRvQU5vZGUobm9kZXMpO1xuICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChub2Rlcyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbWl4aW4oZ2xvYmFsLkRvY3VtZW50IHx8IGdsb2JhbC5IVE1MRG9jdW1lbnQsIFBhcmVudE5vZGUpOyAvLyBIVE1MRG9jdW1lbnQgZm9yIElFOFxuICAgIG1peGluKGdsb2JhbC5Eb2N1bWVudEZyYWdtZW50LCBQYXJlbnROb2RlKTtcbiAgICBtaXhpbihnbG9iYWwuRWxlbWVudCwgUGFyZW50Tm9kZSk7XG5cbiAgICAvLyBNaXhpbiBDaGlsZE5vZGVcbiAgICAvLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2ludGVyZmFjZS1jaGlsZG5vZGVcblxuICAgIHZhciBDaGlsZE5vZGUgPSB7XG4gICAgICAgIGJlZm9yZTogZnVuY3Rpb24oLyouLi5ub2RlcyovKSB7XG4gICAgICAgICAgICB2YXIgbm9kZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICAgICAgICAgICAgaWYgKCFwYXJlbnQpIHJldHVybjtcbiAgICAgICAgICAgIHZhciB2aWFibGVQcmV2aW91c1NpYmxpbmcgPSB0aGlzLnByZXZpb3VzU2libGluZztcbiAgICAgICAgICAgIHdoaWxlIChub2Rlcy5pbmRleE9mKHZpYWJsZVByZXZpb3VzU2libGluZykgIT09IC0xKVxuICAgICAgICAgICAgICAgIHZpYWJsZVByZXZpb3VzU2libGluZyA9IHZpYWJsZVByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNvbnZlcnROb2Rlc0ludG9BTm9kZShub2Rlcyk7XG4gICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHZpYWJsZVByZXZpb3VzU2libGluZyA/XG4gICAgICAgICAgICAgICAgdmlhYmxlUHJldmlvdXNTaWJsaW5nLm5leHRTaWJsaW5nIDogcGFyZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9LFxuICAgICAgICBhZnRlcjogZnVuY3Rpb24oLyouLi5ub2RlcyovKSB7XG4gICAgICAgICAgICB2YXIgbm9kZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICAgICAgICAgICAgaWYgKCFwYXJlbnQpIHJldHVybjtcbiAgICAgICAgICAgIHZhciB2aWFibGVOZXh0U2libGluZyA9IHRoaXMubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB3aGlsZSAobm9kZXMuaW5kZXhPZih2aWFibGVOZXh0U2libGluZykgIT09IC0xKVxuICAgICAgICAgICAgICAgIHZpYWJsZU5leHRTaWJsaW5nID0gdmlhYmxlTmV4dFNpYmxpbmcubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNvbnZlcnROb2Rlc0ludG9BTm9kZShub2Rlcyk7XG4gICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHZpYWJsZU5leHRTaWJsaW5nKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVwbGFjZVdpdGg6IGZ1bmN0aW9uKC8qLi4ubm9kZXMqLykge1xuICAgICAgICAgICAgdmFyIG5vZGVzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGlmICghcGFyZW50KSByZXR1cm47XG4gICAgICAgICAgICB2YXIgdmlhYmxlTmV4dFNpYmxpbmcgPSB0aGlzLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgd2hpbGUgKG5vZGVzLmluZGV4T2YodmlhYmxlTmV4dFNpYmxpbmcpICE9PSAtMSlcbiAgICAgICAgICAgICAgICB2aWFibGVOZXh0U2libGluZyA9IHZpYWJsZU5leHRTaWJsaW5nLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBjb252ZXJ0Tm9kZXNJbnRvQU5vZGUobm9kZXMpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlID09PSBwYXJlbnQpXG4gICAgICAgICAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChub2RlLCB0aGlzKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHZpYWJsZU5leHRTaWJsaW5nKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wYXJlbnROb2RlKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbWl4aW4oZ2xvYmFsLkRvY3VtZW50VHlwZSwgQ2hpbGROb2RlKTtcbiAgICBtaXhpbihnbG9iYWwuRWxlbWVudCwgQ2hpbGROb2RlKTtcbiAgICBtaXhpbihnbG9iYWwuQ2hhcmFjdGVyRGF0YSwgQ2hpbGROb2RlKTtcblxufShzZWxmKSk7IiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbi8qKlxuICogZXh0cmFjdEV4dGVuc2lvblxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9IHBhdGggZm9yIHVybFxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxuICovXG5leHBvcnQgY29uc3QgZXh0cmFjdEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICBpZighcGF0aCB8fCBwYXRoLnN1YnN0cigwLDQpPT0ncnRtcCcpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKSB7XG4gICAgICAgIGxldCBleHRlbnNpb24gPSBcIlwiO1xuICAgICAgICBpZiAoKC9bKCxdZm9ybWF0PW1wZC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ21wZCc7XG4gICAgICAgIH1lbHNlIGlmICgoL1soLF1mb3JtYXQ9bTN1OC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ20zdTgnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbnNpb247XG4gICAgfVxuXG4gICAgbGV0IGF6dXJlZEZvcm1hdCA9IGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKTtcbiAgICBpZihhenVyZWRGb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGF6dXJlZEZvcm1hdDtcbiAgICB9XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xuICAgIGlmKHBhdGgubGFzdEluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxLCBwYXRoLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufTtcblxuXG4vKipcbiAqIG5hdHVyYWxIbXNcbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyIHwgc3RyaW5nfSAgc2Vjb25kICBUaGUgc2Vjb25kXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgZm9ybWF0dGVkIFN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbEhtcyhzZWNvbmQpIHtcbiAgICBsZXQgc2VjTnVtID0gcGFyc2VJbnQoc2Vjb25kLCAxMCk7XG4gICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xuICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjTnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuICAgIGxldCBzZWNvbmRzID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcblxuICAgIGlmIChob3VycyA+IDApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cblxuICAgIGlmIChob3VycyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH1cbn0iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjkuMVxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXG4vLyAgICAgKGMpIDIwMDktMjAxOCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4hZnVuY3Rpb24oKXt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZiYmc2VsZnx8XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbCYmZ2xvYmFsfHx0aGlzfHx7fSxyPW4uXyxlPUFycmF5LnByb3RvdHlwZSxvPU9iamVjdC5wcm90b3R5cGUscz1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sP1N5bWJvbC5wcm90b3R5cGU6bnVsbCx1PWUucHVzaCxjPWUuc2xpY2UscD1vLnRvU3RyaW5nLGk9by5oYXNPd25Qcm9wZXJ0eSx0PUFycmF5LmlzQXJyYXksYT1PYmplY3Qua2V5cyxsPU9iamVjdC5jcmVhdGUsZj1mdW5jdGlvbigpe30saD1mdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIGg/bjp0aGlzIGluc3RhbmNlb2YgaD92b2lkKHRoaXMuX3dyYXBwZWQ9bik6bmV3IGgobil9O1widW5kZWZpbmVkXCI9PXR5cGVvZiBleHBvcnRzfHxleHBvcnRzLm5vZGVUeXBlP24uXz1oOihcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUuZXhwb3J0cyYmKGV4cG9ydHM9bW9kdWxlLmV4cG9ydHM9aCksZXhwb3J0cy5fPWgpLGguVkVSU0lPTj1cIjEuOS4xXCI7dmFyIHYseT1mdW5jdGlvbih1LGksbil7aWYodm9pZCAwPT09aSlyZXR1cm4gdTtzd2l0Y2gobnVsbD09bj8zOm4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHUuY2FsbChpLG4pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gdS5jYWxsKGksbixyLHQpfTtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB1LmNhbGwoaSxuLHIsdCxlKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHUuYXBwbHkoaSxhcmd1bWVudHMpfX0sZD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguaXRlcmF0ZWUhPT12P2guaXRlcmF0ZWUobixyKTpudWxsPT1uP2guaWRlbnRpdHk6aC5pc0Z1bmN0aW9uKG4pP3kobixyLHQpOmguaXNPYmplY3QobikmJiFoLmlzQXJyYXkobik/aC5tYXRjaGVyKG4pOmgucHJvcGVydHkobil9O2guaXRlcmF0ZWU9dj1mdW5jdGlvbihuLHIpe3JldHVybiBkKG4sciwxLzApfTt2YXIgZz1mdW5jdGlvbih1LGkpe3JldHVybiBpPW51bGw9PWk/dS5sZW5ndGgtMToraSxmdW5jdGlvbigpe2Zvcih2YXIgbj1NYXRoLm1heChhcmd1bWVudHMubGVuZ3RoLWksMCkscj1BcnJheShuKSx0PTA7dDxuO3QrKylyW3RdPWFyZ3VtZW50c1t0K2ldO3N3aXRjaChpKXtjYXNlIDA6cmV0dXJuIHUuY2FsbCh0aGlzLHIpO2Nhc2UgMTpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLHIpO2Nhc2UgMjpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLGFyZ3VtZW50c1sxXSxyKX12YXIgZT1BcnJheShpKzEpO2Zvcih0PTA7dDxpO3QrKyllW3RdPWFyZ3VtZW50c1t0XTtyZXR1cm4gZVtpXT1yLHUuYXBwbHkodGhpcyxlKX19LG09ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJue307aWYobClyZXR1cm4gbChuKTtmLnByb3RvdHlwZT1uO3ZhciByPW5ldyBmO3JldHVybiBmLnByb3RvdHlwZT1udWxsLHJ9LGI9ZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP3ZvaWQgMDpuW3JdfX0saj1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsIT1uJiZpLmNhbGwobixyKX0seD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7aWYobnVsbD09bilyZXR1cm47bj1uW3JbZV1dfXJldHVybiB0P246dm9pZCAwfSxfPU1hdGgucG93KDIsNTMpLTEsQT1iKFwibGVuZ3RoXCIpLHc9ZnVuY3Rpb24obil7dmFyIHI9QShuKTtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgciYmMDw9ciYmcjw9X307aC5lYWNoPWguZm9yRWFjaD1mdW5jdGlvbihuLHIsdCl7dmFyIGUsdTtpZihyPXkocix0KSx3KG4pKWZvcihlPTAsdT1uLmxlbmd0aDtlPHU7ZSsrKXIobltlXSxlLG4pO2Vsc2V7dmFyIGk9aC5rZXlzKG4pO2ZvcihlPTAsdT1pLmxlbmd0aDtlPHU7ZSsrKXIobltpW2VdXSxpW2VdLG4pfXJldHVybiBufSxoLm1hcD1oLmNvbGxlY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPUFycmF5KHUpLG89MDtvPHU7bysrKXt2YXIgYT1lP2Vbb106bztpW29dPXIoblthXSxhLG4pfXJldHVybiBpfTt2YXIgTz1mdW5jdGlvbihjKXtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9Mzw9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9IXcobikmJmgua2V5cyhuKSxpPSh1fHxuKS5sZW5ndGgsbz0wPGM/MDppLTE7Zm9yKGV8fCh0PW5bdT91W29dOm9dLG8rPWMpOzA8PW8mJm88aTtvKz1jKXt2YXIgYT11P3Vbb106bzt0PXIodCxuW2FdLGEsbil9cmV0dXJuIHR9KG4seShyLGUsNCksdCx1KX19O2gucmVkdWNlPWguZm9sZGw9aC5pbmplY3Q9TygxKSxoLnJlZHVjZVJpZ2h0PWguZm9sZHI9TygtMSksaC5maW5kPWguZGV0ZWN0PWZ1bmN0aW9uKG4scix0KXt2YXIgZT0odyhuKT9oLmZpbmRJbmRleDpoLmZpbmRLZXkpKG4scix0KTtpZih2b2lkIDAhPT1lJiYtMSE9PWUpcmV0dXJuIG5bZV19LGguZmlsdGVyPWguc2VsZWN0PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT1bXTtyZXR1cm4gZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe2UobixyLHQpJiZ1LnB1c2gobil9KSx1fSxoLnJlamVjdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguZmlsdGVyKG4saC5uZWdhdGUoZChyKSksdCl9LGguZXZlcnk9aC5hbGw9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYoIXIobltvXSxvLG4pKXJldHVybiExfXJldHVybiEwfSxoLnNvbWU9aC5hbnk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYocihuW29dLG8sbikpcmV0dXJuITB9cmV0dXJuITF9LGguY29udGFpbnM9aC5pbmNsdWRlcz1oLmluY2x1ZGU9ZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSwoXCJudW1iZXJcIiE9dHlwZW9mIHR8fGUpJiYodD0wKSwwPD1oLmluZGV4T2YobixyLHQpfSxoLmludm9rZT1nKGZ1bmN0aW9uKG4sdCxlKXt2YXIgdSxpO3JldHVybiBoLmlzRnVuY3Rpb24odCk/aT10OmguaXNBcnJheSh0KSYmKHU9dC5zbGljZSgwLC0xKSx0PXRbdC5sZW5ndGgtMV0pLGgubWFwKG4sZnVuY3Rpb24obil7dmFyIHI9aTtpZighcil7aWYodSYmdS5sZW5ndGgmJihuPXgobix1KSksbnVsbD09bilyZXR1cm47cj1uW3RdfXJldHVybiBudWxsPT1yP3I6ci5hcHBseShuLGUpfSl9KSxoLnBsdWNrPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgubWFwKG4saC5wcm9wZXJ0eShyKSl9LGgud2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maWx0ZXIobixoLm1hdGNoZXIocikpfSxoLmZpbmRXaGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbmQobixoLm1hdGNoZXIocikpfSxoLm1heD1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPS0xLzAsbz0tMS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJmk8dCYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7dT1lKG4scix0KSwobzx1fHx1PT09LTEvMCYmaT09PS0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5taW49ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0xLzAsbz0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmdDxpJiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXsoKHU9ZShuLHIsdCkpPG98fHU9PT0xLzAmJmk9PT0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5zaHVmZmxlPWZ1bmN0aW9uKG4pe3JldHVybiBoLnNhbXBsZShuLDEvMCl9LGguc2FtcGxlPWZ1bmN0aW9uKG4scix0KXtpZihudWxsPT1yfHx0KXJldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksbltoLnJhbmRvbShuLmxlbmd0aC0xKV07dmFyIGU9dyhuKT9oLmNsb25lKG4pOmgudmFsdWVzKG4pLHU9QShlKTtyPU1hdGgubWF4KE1hdGgubWluKHIsdSksMCk7Zm9yKHZhciBpPXUtMSxvPTA7bzxyO28rKyl7dmFyIGE9aC5yYW5kb20obyxpKSxjPWVbb107ZVtvXT1lW2FdLGVbYV09Y31yZXR1cm4gZS5zbGljZSgwLHIpfSxoLnNvcnRCeT1mdW5jdGlvbihuLGUscil7dmFyIHU9MDtyZXR1cm4gZT1kKGUsciksaC5wbHVjayhoLm1hcChuLGZ1bmN0aW9uKG4scix0KXtyZXR1cm57dmFsdWU6bixpbmRleDp1KyssY3JpdGVyaWE6ZShuLHIsdCl9fSkuc29ydChmdW5jdGlvbihuLHIpe3ZhciB0PW4uY3JpdGVyaWEsZT1yLmNyaXRlcmlhO2lmKHQhPT1lKXtpZihlPHR8fHZvaWQgMD09PXQpcmV0dXJuIDE7aWYodDxlfHx2b2lkIDA9PT1lKXJldHVybi0xfXJldHVybiBuLmluZGV4LXIuaW5kZXh9KSxcInZhbHVlXCIpfTt2YXIgaz1mdW5jdGlvbihvLHIpe3JldHVybiBmdW5jdGlvbihlLHUsbil7dmFyIGk9cj9bW10sW11dOnt9O3JldHVybiB1PWQodSxuKSxoLmVhY2goZSxmdW5jdGlvbihuLHIpe3ZhciB0PXUobixyLGUpO28oaSxuLHQpfSksaX19O2guZ3JvdXBCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSksaC5pbmRleEJ5PWsoZnVuY3Rpb24obixyLHQpe25bdF09cn0pLGguY291bnRCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XSsrOm5bdF09MX0pO3ZhciBTPS9bXlxcdWQ4MDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkZmZmXS9nO2gudG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbj9oLmlzQXJyYXkobik/Yy5jYWxsKG4pOmguaXNTdHJpbmcobik/bi5tYXRjaChTKTp3KG4pP2gubWFwKG4saC5pZGVudGl0eSk6aC52YWx1ZXMobik6W119LGguc2l6ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj8wOncobik/bi5sZW5ndGg6aC5rZXlzKG4pLmxlbmd0aH0saC5wYXJ0aXRpb249ayhmdW5jdGlvbihuLHIsdCl7blt0PzA6MV0ucHVzaChyKX0sITApLGguZmlyc3Q9aC5oZWFkPWgudGFrZT1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uWzBdOmguaW5pdGlhbChuLG4ubGVuZ3RoLXIpfSxoLmluaXRpYWw9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobiwwLE1hdGgubWF4KDAsbi5sZW5ndGgtKG51bGw9PXJ8fHQ/MTpyKSkpfSxoLmxhc3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/bltuLmxlbmd0aC0xXTpoLnJlc3QobixNYXRoLm1heCgwLG4ubGVuZ3RoLXIpKX0saC5yZXN0PWgudGFpbD1oLmRyb3A9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobixudWxsPT1yfHx0PzE6cil9LGguY29tcGFjdD1mdW5jdGlvbihuKXtyZXR1cm4gaC5maWx0ZXIobixCb29sZWFuKX07dmFyIE09ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PShlPWV8fFtdKS5sZW5ndGgsaT0wLG89QShuKTtpPG87aSsrKXt2YXIgYT1uW2ldO2lmKHcoYSkmJihoLmlzQXJyYXkoYSl8fGguaXNBcmd1bWVudHMoYSkpKWlmKHIpZm9yKHZhciBjPTAsbD1hLmxlbmd0aDtjPGw7KWVbdSsrXT1hW2MrK107ZWxzZSBNKGEscix0LGUpLHU9ZS5sZW5ndGg7ZWxzZSB0fHwoZVt1KytdPWEpfXJldHVybiBlfTtoLmZsYXR0ZW49ZnVuY3Rpb24obixyKXtyZXR1cm4gTShuLHIsITEpfSxoLndpdGhvdXQ9ZyhmdW5jdGlvbihuLHIpe3JldHVybiBoLmRpZmZlcmVuY2UobixyKX0pLGgudW5pcT1oLnVuaXF1ZT1mdW5jdGlvbihuLHIsdCxlKXtoLmlzQm9vbGVhbihyKXx8KGU9dCx0PXIscj0hMSksbnVsbCE9dCYmKHQ9ZCh0LGUpKTtmb3IodmFyIHU9W10saT1bXSxvPTAsYT1BKG4pO288YTtvKyspe3ZhciBjPW5bb10sbD10P3QoYyxvLG4pOmM7ciYmIXQ/KG8mJmk9PT1sfHx1LnB1c2goYyksaT1sKTp0P2guY29udGFpbnMoaSxsKXx8KGkucHVzaChsKSx1LnB1c2goYykpOmguY29udGFpbnModSxjKXx8dS5wdXNoKGMpfXJldHVybiB1fSxoLnVuaW9uPWcoZnVuY3Rpb24obil7cmV0dXJuIGgudW5pcShNKG4sITAsITApKX0pLGguaW50ZXJzZWN0aW9uPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1bXSx0PWFyZ3VtZW50cy5sZW5ndGgsZT0wLHU9QShuKTtlPHU7ZSsrKXt2YXIgaT1uW2VdO2lmKCFoLmNvbnRhaW5zKHIsaSkpe3ZhciBvO2ZvcihvPTE7bzx0JiZoLmNvbnRhaW5zKGFyZ3VtZW50c1tvXSxpKTtvKyspO289PT10JiZyLnB1c2goaSl9fXJldHVybiByfSxoLmRpZmZlcmVuY2U9ZyhmdW5jdGlvbihuLHIpe3JldHVybiByPU0ociwhMCwhMCksaC5maWx0ZXIobixmdW5jdGlvbihuKXtyZXR1cm4haC5jb250YWlucyhyLG4pfSl9KSxoLnVuemlwPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1uJiZoLm1heChuLEEpLmxlbmd0aHx8MCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aC5wbHVjayhuLGUpO3JldHVybiB0fSxoLnppcD1nKGgudW56aXApLGgub2JqZWN0PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXt9LGU9MCx1PUEobik7ZTx1O2UrKylyP3RbbltlXV09cltlXTp0W25bZV1bMF1dPW5bZV1bMV07cmV0dXJuIHR9O3ZhciBGPWZ1bmN0aW9uKGkpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPUEobiksdT0wPGk/MDplLTE7MDw9dSYmdTxlO3UrPWkpaWYocihuW3VdLHUsbikpcmV0dXJuIHU7cmV0dXJuLTF9fTtoLmZpbmRJbmRleD1GKDEpLGguZmluZExhc3RJbmRleD1GKC0xKSxoLnNvcnRlZEluZGV4PWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0odD1kKHQsZSwxKSkociksaT0wLG89QShuKTtpPG87KXt2YXIgYT1NYXRoLmZsb29yKChpK28pLzIpO3QoblthXSk8dT9pPWErMTpvPWF9cmV0dXJuIGl9O3ZhciBFPWZ1bmN0aW9uKGksbyxhKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3ZhciBlPTAsdT1BKG4pO2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KTA8aT9lPTA8PXQ/dDpNYXRoLm1heCh0K3UsZSk6dT0wPD10P01hdGgubWluKHQrMSx1KTp0K3UrMTtlbHNlIGlmKGEmJnQmJnUpcmV0dXJuIG5bdD1hKG4scildPT09cj90Oi0xO2lmKHIhPXIpcmV0dXJuIDA8PSh0PW8oYy5jYWxsKG4sZSx1KSxoLmlzTmFOKSk/dCtlOi0xO2Zvcih0PTA8aT9lOnUtMTswPD10JiZ0PHU7dCs9aSlpZihuW3RdPT09cilyZXR1cm4gdDtyZXR1cm4tMX19O2guaW5kZXhPZj1FKDEsaC5maW5kSW5kZXgsaC5zb3J0ZWRJbmRleCksaC5sYXN0SW5kZXhPZj1FKC0xLGguZmluZExhc3RJbmRleCksaC5yYW5nZT1mdW5jdGlvbihuLHIsdCl7bnVsbD09ciYmKHI9bnx8MCxuPTApLHR8fCh0PXI8bj8tMToxKTtmb3IodmFyIGU9TWF0aC5tYXgoTWF0aC5jZWlsKChyLW4pL3QpLDApLHU9QXJyYXkoZSksaT0wO2k8ZTtpKyssbis9dCl1W2ldPW47cmV0dXJuIHV9LGguY2h1bms9ZnVuY3Rpb24obixyKXtpZihudWxsPT1yfHxyPDEpcmV0dXJuW107Zm9yKHZhciB0PVtdLGU9MCx1PW4ubGVuZ3RoO2U8dTspdC5wdXNoKGMuY2FsbChuLGUsZSs9cikpO3JldHVybiB0fTt2YXIgTj1mdW5jdGlvbihuLHIsdCxlLHUpe2lmKCEoZSBpbnN0YW5jZW9mIHIpKXJldHVybiBuLmFwcGx5KHQsdSk7dmFyIGk9bShuLnByb3RvdHlwZSksbz1uLmFwcGx5KGksdSk7cmV0dXJuIGguaXNPYmplY3Qobyk/bzppfTtoLmJpbmQ9ZyhmdW5jdGlvbihyLHQsZSl7aWYoIWguaXNGdW5jdGlvbihyKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uXCIpO3ZhciB1PWcoZnVuY3Rpb24obil7cmV0dXJuIE4ocix1LHQsdGhpcyxlLmNvbmNhdChuKSl9KTtyZXR1cm4gdX0pLGgucGFydGlhbD1nKGZ1bmN0aW9uKHUsaSl7dmFyIG89aC5wYXJ0aWFsLnBsYWNlaG9sZGVyLGE9ZnVuY3Rpb24oKXtmb3IodmFyIG49MCxyPWkubGVuZ3RoLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1pW2VdPT09bz9hcmd1bWVudHNbbisrXTppW2VdO2Zvcig7bjxhcmd1bWVudHMubGVuZ3RoOyl0LnB1c2goYXJndW1lbnRzW24rK10pO3JldHVybiBOKHUsYSx0aGlzLHRoaXMsdCl9O3JldHVybiBhfSksKGgucGFydGlhbC5wbGFjZWhvbGRlcj1oKS5iaW5kQWxsPWcoZnVuY3Rpb24obixyKXt2YXIgdD0ocj1NKHIsITEsITEpKS5sZW5ndGg7aWYodDwxKXRocm93IG5ldyBFcnJvcihcImJpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXNcIik7Zm9yKDt0LS07KXt2YXIgZT1yW3RdO25bZV09aC5iaW5kKG5bZV0sbil9fSksaC5tZW1vaXplPWZ1bmN0aW9uKGUsdSl7dmFyIGk9ZnVuY3Rpb24obil7dmFyIHI9aS5jYWNoZSx0PVwiXCIrKHU/dS5hcHBseSh0aGlzLGFyZ3VtZW50cyk6bik7cmV0dXJuIGoocix0KXx8KHJbdF09ZS5hcHBseSh0aGlzLGFyZ3VtZW50cykpLHJbdF19O3JldHVybiBpLmNhY2hlPXt9LGl9LGguZGVsYXk9ZyhmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gbi5hcHBseShudWxsLHQpfSxyKX0pLGguZGVmZXI9aC5wYXJ0aWFsKGguZGVsYXksaCwxKSxoLnRocm90dGxlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGEsYyxsPTA7dXx8KHU9e30pO3ZhciBmPWZ1bmN0aW9uKCl7bD0hMT09PXUubGVhZGluZz8wOmgubm93KCksaT1udWxsLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCl9LG49ZnVuY3Rpb24oKXt2YXIgbj1oLm5vdygpO2x8fCExIT09dS5sZWFkaW5nfHwobD1uKTt2YXIgcj1lLShuLWwpO3JldHVybiBvPXRoaXMsYT1hcmd1bWVudHMscjw9MHx8ZTxyPyhpJiYoY2xlYXJUaW1lb3V0KGkpLGk9bnVsbCksbD1uLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCkpOml8fCExPT09dS50cmFpbGluZ3x8KGk9c2V0VGltZW91dChmLHIpKSxjfTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksbD0wLGk9bz1hPW51bGx9LG59LGguZGVib3VuY2U9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYT1mdW5jdGlvbihuLHIpe2k9bnVsbCxyJiYobz10LmFwcGx5KG4scikpfSxuPWcoZnVuY3Rpb24obil7aWYoaSYmY2xlYXJUaW1lb3V0KGkpLHUpe3ZhciByPSFpO2k9c2V0VGltZW91dChhLGUpLHImJihvPXQuYXBwbHkodGhpcyxuKSl9ZWxzZSBpPWguZGVsYXkoYSxlLHRoaXMsbik7cmV0dXJuIG99KTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksaT1udWxsfSxufSxoLndyYXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5wYXJ0aWFsKHIsbil9LGgubmVnYXRlPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiFuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguY29tcG9zZT1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxlPXQubGVuZ3RoLTE7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPWUscj10W2VdLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtuLS07KXI9dFtuXS5jYWxsKHRoaXMscik7cmV0dXJuIHJ9fSxoLmFmdGVyPWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKCl7aWYoLS1uPDEpcmV0dXJuIHIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5iZWZvcmU9ZnVuY3Rpb24obixyKXt2YXIgdDtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gMDwtLW4mJih0PXIuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxuPD0xJiYocj1udWxsKSx0fX0saC5vbmNlPWgucGFydGlhbChoLmJlZm9yZSwyKSxoLnJlc3RBcmd1bWVudHM9Zzt2YXIgST0he3RvU3RyaW5nOm51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIiksVD1bXCJ2YWx1ZU9mXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJ0b1N0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImhhc093blByb3BlcnR5XCIsXCJ0b0xvY2FsZVN0cmluZ1wiXSxCPWZ1bmN0aW9uKG4scil7dmFyIHQ9VC5sZW5ndGgsZT1uLmNvbnN0cnVjdG9yLHU9aC5pc0Z1bmN0aW9uKGUpJiZlLnByb3RvdHlwZXx8byxpPVwiY29uc3RydWN0b3JcIjtmb3IoaihuLGkpJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSk7dC0tOykoaT1UW3RdKWluIG4mJm5baV0hPT11W2ldJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSl9O2gua2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTtpZihhKXJldHVybiBhKG4pO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWoobix0KSYmci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC5hbGxLZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKXIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGgudmFsdWVzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09bltyW3VdXTtyZXR1cm4gZX0saC5tYXBPYmplY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1oLmtleXMobiksdT1lLmxlbmd0aCxpPXt9LG89MDtvPHU7bysrKXt2YXIgYT1lW29dO2lbYV09cihuW2FdLGEsbil9cmV0dXJuIGl9LGgucGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1bclt1XSxuW3JbdV1dXTtyZXR1cm4gZX0saC5pbnZlcnQ9ZnVuY3Rpb24obil7Zm9yKHZhciByPXt9LHQ9aC5rZXlzKG4pLGU9MCx1PXQubGVuZ3RoO2U8dTtlKyspcltuW3RbZV1dXT10W2VdO3JldHVybiByfSxoLmZ1bmN0aW9ucz1oLm1ldGhvZHM9ZnVuY3Rpb24obil7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paC5pc0Z1bmN0aW9uKG5bdF0pJiZyLnB1c2godCk7cmV0dXJuIHIuc29ydCgpfTt2YXIgUj1mdW5jdGlvbihjLGwpe3JldHVybiBmdW5jdGlvbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO2lmKGwmJihuPU9iamVjdChuKSkscjwyfHxudWxsPT1uKXJldHVybiBuO2Zvcih2YXIgdD0xO3Q8cjt0KyspZm9yKHZhciBlPWFyZ3VtZW50c1t0XSx1PWMoZSksaT11Lmxlbmd0aCxvPTA7bzxpO28rKyl7dmFyIGE9dVtvXTtsJiZ2b2lkIDAhPT1uW2FdfHwoblthXT1lW2FdKX1yZXR1cm4gbn19O2guZXh0ZW5kPVIoaC5hbGxLZXlzKSxoLmV4dGVuZE93bj1oLmFzc2lnbj1SKGgua2V5cyksaC5maW5kS2V5PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGUsdT1oLmtleXMobiksaT0wLG89dS5sZW5ndGg7aTxvO2krKylpZihyKG5bZT11W2ldXSxlLG4pKXJldHVybiBlfTt2YXIgcSxLLHo9ZnVuY3Rpb24obixyLHQpe3JldHVybiByIGluIHR9O2gucGljaz1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9e30sZT1yWzBdO2lmKG51bGw9PW4pcmV0dXJuIHQ7aC5pc0Z1bmN0aW9uKGUpPygxPHIubGVuZ3RoJiYoZT15KGUsclsxXSkpLHI9aC5hbGxLZXlzKG4pKTooZT16LHI9TShyLCExLCExKSxuPU9iamVjdChuKSk7Zm9yKHZhciB1PTAsaT1yLmxlbmd0aDt1PGk7dSsrKXt2YXIgbz1yW3VdLGE9bltvXTtlKGEsbyxuKSYmKHRbb109YSl9cmV0dXJuIHR9KSxoLm9taXQ9ZyhmdW5jdGlvbihuLHQpe3ZhciByLGU9dFswXTtyZXR1cm4gaC5pc0Z1bmN0aW9uKGUpPyhlPWgubmVnYXRlKGUpLDE8dC5sZW5ndGgmJihyPXRbMV0pKToodD1oLm1hcChNKHQsITEsITEpLFN0cmluZyksZT1mdW5jdGlvbihuLHIpe3JldHVybiFoLmNvbnRhaW5zKHQscil9KSxoLnBpY2sobixlLHIpfSksaC5kZWZhdWx0cz1SKGguYWxsS2V5cywhMCksaC5jcmVhdGU9ZnVuY3Rpb24obixyKXt2YXIgdD1tKG4pO3JldHVybiByJiZoLmV4dGVuZE93bih0LHIpLHR9LGguY2xvbmU9ZnVuY3Rpb24obil7cmV0dXJuIGguaXNPYmplY3Qobik/aC5pc0FycmF5KG4pP24uc2xpY2UoKTpoLmV4dGVuZCh7fSxuKTpufSxoLnRhcD1mdW5jdGlvbihuLHIpe3JldHVybiByKG4pLG59LGguaXNNYXRjaD1mdW5jdGlvbihuLHIpe3ZhciB0PWgua2V5cyhyKSxlPXQubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKHZhciB1PU9iamVjdChuKSxpPTA7aTxlO2krKyl7dmFyIG89dFtpXTtpZihyW29dIT09dVtvXXx8IShvIGluIHUpKXJldHVybiExfXJldHVybiEwfSxxPWZ1bmN0aW9uKG4scix0LGUpe2lmKG49PT1yKXJldHVybiAwIT09bnx8MS9uPT0xL3I7aWYobnVsbD09bnx8bnVsbD09cilyZXR1cm4hMTtpZihuIT1uKXJldHVybiByIT1yO3ZhciB1PXR5cGVvZiBuO3JldHVybihcImZ1bmN0aW9uXCI9PT11fHxcIm9iamVjdFwiPT09dXx8XCJvYmplY3RcIj09dHlwZW9mIHIpJiZLKG4scix0LGUpfSxLPWZ1bmN0aW9uKG4scix0LGUpe24gaW5zdGFuY2VvZiBoJiYobj1uLl93cmFwcGVkKSxyIGluc3RhbmNlb2YgaCYmKHI9ci5fd3JhcHBlZCk7dmFyIHU9cC5jYWxsKG4pO2lmKHUhPT1wLmNhbGwocikpcmV0dXJuITE7c3dpdGNoKHUpe2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVyblwiXCIrbj09XCJcIityO2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybituIT0rbj8rciE9K3I6MD09K24/MS8rbj09MS9yOituPT0rcjtjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOnJldHVybituPT0rcjtjYXNlXCJbb2JqZWN0IFN5bWJvbF1cIjpyZXR1cm4gcy52YWx1ZU9mLmNhbGwobik9PT1zLnZhbHVlT2YuY2FsbChyKX12YXIgaT1cIltvYmplY3QgQXJyYXldXCI9PT11O2lmKCFpKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygbnx8XCJvYmplY3RcIiE9dHlwZW9mIHIpcmV0dXJuITE7dmFyIG89bi5jb25zdHJ1Y3RvcixhPXIuY29uc3RydWN0b3I7aWYobyE9PWEmJiEoaC5pc0Z1bmN0aW9uKG8pJiZvIGluc3RhbmNlb2YgbyYmaC5pc0Z1bmN0aW9uKGEpJiZhIGluc3RhbmNlb2YgYSkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHIpcmV0dXJuITF9ZT1lfHxbXTtmb3IodmFyIGM9KHQ9dHx8W10pLmxlbmd0aDtjLS07KWlmKHRbY109PT1uKXJldHVybiBlW2NdPT09cjtpZih0LnB1c2gobiksZS5wdXNoKHIpLGkpe2lmKChjPW4ubGVuZ3RoKSE9PXIubGVuZ3RoKXJldHVybiExO2Zvcig7Yy0tOylpZighcShuW2NdLHJbY10sdCxlKSlyZXR1cm4hMX1lbHNle3ZhciBsLGY9aC5rZXlzKG4pO2lmKGM9Zi5sZW5ndGgsaC5rZXlzKHIpLmxlbmd0aCE9PWMpcmV0dXJuITE7Zm9yKDtjLS07KWlmKGw9ZltjXSwhaihyLGwpfHwhcShuW2xdLHJbbF0sdCxlKSlyZXR1cm4hMX1yZXR1cm4gdC5wb3AoKSxlLnBvcCgpLCEwfSxoLmlzRXF1YWw9ZnVuY3Rpb24obixyKXtyZXR1cm4gcShuLHIpfSxoLmlzRW1wdHk9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW58fCh3KG4pJiYoaC5pc0FycmF5KG4pfHxoLmlzU3RyaW5nKG4pfHxoLmlzQXJndW1lbnRzKG4pKT8wPT09bi5sZW5ndGg6MD09PWgua2V5cyhuKS5sZW5ndGgpfSxoLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4hKCFufHwxIT09bi5ub2RlVHlwZSl9LGguaXNBcnJheT10fHxmdW5jdGlvbihuKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1wLmNhbGwobil9LGguaXNPYmplY3Q9ZnVuY3Rpb24obil7dmFyIHI9dHlwZW9mIG47cmV0dXJuXCJmdW5jdGlvblwiPT09cnx8XCJvYmplY3RcIj09PXImJiEhbn0saC5lYWNoKFtcIkFyZ3VtZW50c1wiLFwiRnVuY3Rpb25cIixcIlN0cmluZ1wiLFwiTnVtYmVyXCIsXCJEYXRlXCIsXCJSZWdFeHBcIixcIkVycm9yXCIsXCJTeW1ib2xcIixcIk1hcFwiLFwiV2Vha01hcFwiLFwiU2V0XCIsXCJXZWFrU2V0XCJdLGZ1bmN0aW9uKHIpe2hbXCJpc1wiK3JdPWZ1bmN0aW9uKG4pe3JldHVybiBwLmNhbGwobik9PT1cIltvYmplY3QgXCIrcitcIl1cIn19KSxoLmlzQXJndW1lbnRzKGFyZ3VtZW50cyl8fChoLmlzQXJndW1lbnRzPWZ1bmN0aW9uKG4pe3JldHVybiBqKG4sXCJjYWxsZWVcIil9KTt2YXIgRD1uLmRvY3VtZW50JiZuLmRvY3VtZW50LmNoaWxkTm9kZXM7XCJmdW5jdGlvblwiIT10eXBlb2YvLi8mJlwib2JqZWN0XCIhPXR5cGVvZiBJbnQ4QXJyYXkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIEQmJihoLmlzRnVuY3Rpb249ZnVuY3Rpb24obil7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbnx8ITF9KSxoLmlzRmluaXRlPWZ1bmN0aW9uKG4pe3JldHVybiFoLmlzU3ltYm9sKG4pJiZpc0Zpbml0ZShuKSYmIWlzTmFOKHBhcnNlRmxvYXQobikpfSxoLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTnVtYmVyKG4pJiZpc05hTihuKX0saC5pc0Jvb2xlYW49ZnVuY3Rpb24obil7cmV0dXJuITA9PT1ufHwhMT09PW58fFwiW29iamVjdCBCb29sZWFuXVwiPT09cC5jYWxsKG4pfSxoLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LGguaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIHZvaWQgMD09PW59LGguaGFzPWZ1bmN0aW9uKG4scil7aWYoIWguaXNBcnJheShyKSlyZXR1cm4gaihuLHIpO2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7dmFyIHU9cltlXTtpZihudWxsPT1ufHwhaS5jYWxsKG4sdSkpcmV0dXJuITE7bj1uW3VdfXJldHVybiEhdH0saC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4uXz1yLHRoaXN9LGguaWRlbnRpdHk9ZnVuY3Rpb24obil7cmV0dXJuIG59LGguY29uc3RhbnQ9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG59fSxoLm5vb3A9ZnVuY3Rpb24oKXt9LGgucHJvcGVydHk9ZnVuY3Rpb24ocil7cmV0dXJuIGguaXNBcnJheShyKT9mdW5jdGlvbihuKXtyZXR1cm4geChuLHIpfTpiKHIpfSxoLnByb3BlcnR5T2Y9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGw9PXI/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKG4pe3JldHVybiBoLmlzQXJyYXkobik/eChyLG4pOnJbbl19fSxoLm1hdGNoZXI9aC5tYXRjaGVzPWZ1bmN0aW9uKHIpe3JldHVybiByPWguZXh0ZW5kT3duKHt9LHIpLGZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTWF0Y2gobixyKX19LGgudGltZXM9ZnVuY3Rpb24obixyLHQpe3ZhciBlPUFycmF5KE1hdGgubWF4KDAsbikpO3I9eShyLHQsMSk7Zm9yKHZhciB1PTA7dTxuO3UrKyllW3VdPXIodSk7cmV0dXJuIGV9LGgucmFuZG9tPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGw9PXImJihyPW4sbj0wKSxuK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooci1uKzEpKX0saC5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9O3ZhciBMPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiN4Mjc7XCIsXCJgXCI6XCImI3g2MDtcIn0sUD1oLmludmVydChMKSxXPWZ1bmN0aW9uKHIpe3ZhciB0PWZ1bmN0aW9uKG4pe3JldHVybiByW25dfSxuPVwiKD86XCIraC5rZXlzKHIpLmpvaW4oXCJ8XCIpK1wiKVwiLGU9UmVnRXhwKG4pLHU9UmVnRXhwKG4sXCJnXCIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbj1udWxsPT1uP1wiXCI6XCJcIituLGUudGVzdChuKT9uLnJlcGxhY2UodSx0KTpufX07aC5lc2NhcGU9VyhMKSxoLnVuZXNjYXBlPVcoUCksaC5yZXN1bHQ9ZnVuY3Rpb24obixyLHQpe2guaXNBcnJheShyKXx8KHI9W3JdKTt2YXIgZT1yLmxlbmd0aDtpZighZSlyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP3QuY2FsbChuKTp0O2Zvcih2YXIgdT0wO3U8ZTt1Kyspe3ZhciBpPW51bGw9PW4/dm9pZCAwOm5bclt1XV07dm9pZCAwPT09aSYmKGk9dCx1PWUpLG49aC5pc0Z1bmN0aW9uKGkpP2kuY2FsbChuKTppfXJldHVybiBufTt2YXIgQz0wO2gudW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHI9KytDK1wiXCI7cmV0dXJuIG4/bityOnJ9LGgudGVtcGxhdGVTZXR0aW5ncz17ZXZhbHVhdGU6LzwlKFtcXHNcXFNdKz8pJT4vZyxpbnRlcnBvbGF0ZTovPCU9KFtcXHNcXFNdKz8pJT4vZyxlc2NhcGU6LzwlLShbXFxzXFxTXSs/KSU+L2d9O3ZhciBKPS8oLileLyxVPXtcIidcIjpcIidcIixcIlxcXFxcIjpcIlxcXFxcIixcIlxcclwiOlwiclwiLFwiXFxuXCI6XCJuXCIsXCJcXHUyMDI4XCI6XCJ1MjAyOFwiLFwiXFx1MjAyOVwiOlwidTIwMjlcIn0sVj0vXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2csJD1mdW5jdGlvbihuKXtyZXR1cm5cIlxcXFxcIitVW25dfTtoLnRlbXBsYXRlPWZ1bmN0aW9uKGksbixyKXshbiYmciYmKG49ciksbj1oLmRlZmF1bHRzKHt9LG4saC50ZW1wbGF0ZVNldHRpbmdzKTt2YXIgdCxlPVJlZ0V4cChbKG4uZXNjYXBlfHxKKS5zb3VyY2UsKG4uaW50ZXJwb2xhdGV8fEopLnNvdXJjZSwobi5ldmFsdWF0ZXx8Sikuc291cmNlXS5qb2luKFwifFwiKStcInwkXCIsXCJnXCIpLG89MCxhPVwiX19wKz0nXCI7aS5yZXBsYWNlKGUsZnVuY3Rpb24obixyLHQsZSx1KXtyZXR1cm4gYSs9aS5zbGljZShvLHUpLnJlcGxhY2UoViwkKSxvPXUrbi5sZW5ndGgscj9hKz1cIicrXFxuKChfX3Q9KFwiK3IrXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI6dD9hKz1cIicrXFxuKChfX3Q9KFwiK3QrXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjplJiYoYSs9XCInO1xcblwiK2UrXCJcXG5fX3ArPSdcIiksbn0pLGErPVwiJztcXG5cIixuLnZhcmlhYmxlfHwoYT1cIndpdGgob2JqfHx7fSl7XFxuXCIrYStcIn1cXG5cIiksYT1cInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIitcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIrYStcInJldHVybiBfX3A7XFxuXCI7dHJ5e3Q9bmV3IEZ1bmN0aW9uKG4udmFyaWFibGV8fFwib2JqXCIsXCJfXCIsYSl9Y2F0Y2gobil7dGhyb3cgbi5zb3VyY2U9YSxufXZhciB1PWZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwodGhpcyxuLGgpfSxjPW4udmFyaWFibGV8fFwib2JqXCI7cmV0dXJuIHUuc291cmNlPVwiZnVuY3Rpb24oXCIrYytcIil7XFxuXCIrYStcIn1cIix1fSxoLmNoYWluPWZ1bmN0aW9uKG4pe3ZhciByPWgobik7cmV0dXJuIHIuX2NoYWluPSEwLHJ9O3ZhciBHPWZ1bmN0aW9uKG4scil7cmV0dXJuIG4uX2NoYWluP2gocikuY2hhaW4oKTpyfTtoLm1peGluPWZ1bmN0aW9uKHQpe3JldHVybiBoLmVhY2goaC5mdW5jdGlvbnModCksZnVuY3Rpb24obil7dmFyIHI9aFtuXT10W25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49W3RoaXMuX3dyYXBwZWRdO3JldHVybiB1LmFwcGx5KG4sYXJndW1lbnRzKSxHKHRoaXMsci5hcHBseShoLG4pKX19KSxofSxoLm1peGluKGgpLGguZWFjaChbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJzcGxpY2VcIixcInVuc2hpZnRcIl0sZnVuY3Rpb24ocil7dmFyIHQ9ZVtyXTtoLnByb3RvdHlwZVtyXT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX3dyYXBwZWQ7cmV0dXJuIHQuYXBwbHkobixhcmd1bWVudHMpLFwic2hpZnRcIiE9PXImJlwic3BsaWNlXCIhPT1yfHwwIT09bi5sZW5ndGh8fGRlbGV0ZSBuWzBdLEcodGhpcyxuKX19KSxoLmVhY2goW1wiY29uY2F0XCIsXCJqb2luXCIsXCJzbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgcj1lW25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIEcodGhpcyxyLmFwcGx5KHRoaXMuX3dyYXBwZWQsYXJndW1lbnRzKSl9fSksaC5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcHBlZH0saC5wcm90b3R5cGUudmFsdWVPZj1oLnByb3RvdHlwZS50b0pTT049aC5wcm90b3R5cGUudmFsdWUsaC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gU3RyaW5nKHRoaXMuX3dyYXBwZWQpfSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShcInVuZGVyc2NvcmVcIixbXSxmdW5jdGlvbigpe3JldHVybiBofSl9KCk7XG4iLCJpbXBvcnQge2V4dHJhY3RFeHRlbnNpb259IGZyb20gXCJ1dGlscy9zdHJpbmdzXCI7XG5cbmV4cG9ydCBjb25zdCBpc1J0bXAgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCdydG1wOicpID09IDAgfHwgdHlwZSA9PSAncnRtcCcpO1xufTtcbmV4cG9ydCBjb25zdCBpc1dlYlJUQyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgaWYoZmlsZSl7XG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCd3czonKSA9PT0gMCB8fCBmaWxlLmluZGV4T2YoJ3dzczonKSA9PT0gMCB8fCB0eXBlID09PSAnd2VicnRjJyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5leHBvcnQgY29uc3QgaXNEYXNoID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICByZXR1cm4gKCB0eXBlID09PSAnbXBkJyB8fCAgdHlwZSA9PT0gJ2Rhc2gnIHx8IHR5cGUgPT09ICdhcHBsaWNhdGlvbi9kYXNoK3htbCcgfHwgZXh0cmFjdEV4dGVuc2lvbihmaWxlKSA9PSAnbXBkJyk7XG59O1xuIiwiLyoqXG4gKiB1dGlscyBmb3Igd2VicGFja1xuICovXG5cbmV4cG9ydCBjb25zdCBnZXRTY3JpcHRQYXRoID0gZnVuY3Rpb24oc2NyaXB0TmFtZSkge1xuICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHNjcmlwdHNbaV0uc3JjO1xuICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHNyYy5sYXN0SW5kZXhPZignLycgKyBzY3JpcHROYW1lKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHIoMCwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjkuLlxuICovXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IF9fVkVSU0lPTl9fO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjYuLlxuICovXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XG5cbmNvbnN0IEZ1bGxTY3JlZW5CdXR0b24gPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xuICAgIGNvbnN0ICRyb290ID0gTEEkKFwiI1wiK2FwaS5nZXRDb250YWluZXJJZCgpKTtcbiAgICBsZXQgJGljb25FeHBhbmQgPSBcIlwiLCAkaWNvbkNvbXByZXNzID0gXCJcIiwgaXNGdWxsU2NyZWVuID0gZmFsc2U7XG5cbiAgICBsZXQgZnVsbFNjcmVlbkV2ZW50VHlwZXMgPSB7XG4gICAgICAgIG9uZnVsbHNjcmVlbmNoYW5nZSA6IFwiZnVsbHNjcmVlbmNoYW5nZVwiLFxuICAgICAgICBvbm1vemZ1bGxzY3JlZW5jaGFuZ2UgOiBcIm1vemZ1bGxzY3JlZW5jaGFuZ2VcIixcbiAgICAgICAgb253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIDogXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsXG4gICAgICAgIE1TRnVsbHNjcmVlbkNoYW5nZSA6IFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCJcbiAgICB9O1xuXG4gICAgbGV0IGZ1bGxTY3JlZW5DaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIGxldCBjaGVja0Z1bGxTY3JlZW4gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50IHx8IGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8IGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8IGRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGNoZWNrRnVsbFNjcmVlbigpKSB7XG4gICAgICAgICAgICAkcm9vdC5hZGRDbGFzcyhcIm92cC1mdWxsc2NyZWVuXCIpO1xuICAgICAgICAgICAgaXNGdWxsU2NyZWVuID0gdHJ1ZTtcbiAgICAgICAgICAgICRpY29uRXhwYW5kLmhpZGUoKTtcbiAgICAgICAgICAgICRpY29uQ29tcHJlc3Muc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHJvb3QucmVtb3ZlQ2xhc3MoXCJvdnAtZnVsbHNjcmVlblwiKTtcbiAgICAgICAgICAgIGlzRnVsbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICAgICAgJGljb25FeHBhbmQuc2hvdygpO1xuICAgICAgICAgICAgJGljb25Db21wcmVzcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IHJlcXVlc3RGdWxsU2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJHJvb3QuZ2V0KCkucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICRyb290LmdldCgpLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHJvb3QuZ2V0KCkud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICRyb290LmdldCgpLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHJvb3QuZ2V0KCkubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgICRyb290LmdldCgpLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHJvb3QuZ2V0KCkubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgJHJvb3QuZ2V0KCkubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVE9ETyhyb2NrKTogd2FybiBub3Qgc3VwcG9ydGVkXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxldCBleGl0RnVsbFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRPRE8ocm9jayk6IHdhcm4gbm90IHN1cHBvcnRlZFxuICAgICAgICB9XG4gICAgfVxuICAgIGxldCB0b2dnbGVGdWxsU2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWlzRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgcmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4aXRGdWxsU2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICRpY29uRXhwYW5kID0gJGN1cnJlbnQuZmluZCgnLm92cC1mdWxsc2NyZWVuLWJ1dHRvbi1leHBhbmRpY29uJyk7XG4gICAgICAgICRpY29uQ29tcHJlc3MgPSAkY3VycmVudC5maW5kKCcub3ZwLWZ1bGxzY3JlZW4tYnV0dG9uLWNvbXByZXNzaWNvbicpO1xuXG4gICAgICAgIC8vQmluZCBHbG9iYWwoZG9jdW1lbnQpIEV2ZW50XG4gICAgICAgIE9iamVjdC5rZXlzKGZ1bGxTY3JlZW5FdmVudFR5cGVzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICAvL0RpZmZlcmVuY2UgYmV0d2VlbiB1bmRlZmluZWQgYW5kIG51bGwuXG4gICAgICAgICAgICAvL3VuZGVmaW5lZCBpcyBub3Qgc3VwcG9ydC4gbnVsbCBpcyBzdXBwb3J0IGJ1dCBub3QgaW5pdGVkLlxuICAgICAgICAgICAgaWYoZG9jdW1lbnRbZXZlbnROYW1lXSA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihmdWxsU2NyZWVuRXZlbnRUeXBlc1tldmVudE5hbWVdLCBmdWxsU2NyZWVuQ2hhbmdlZENhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH07XG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAvL1VuYmluZCBHbG9iYWwoZG9jdW1lbnQpIEV2ZW50XG4gICAgICAgIE9iamVjdC5rZXlzKGZ1bGxTY3JlZW5FdmVudFR5cGVzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgICBpZihkb2N1bWVudFtldmVudE5hbWVdID09PSBudWxsKXtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGZ1bGxTY3JlZW5FdmVudFR5cGVzW2V2ZW50TmFtZV0sIGZ1bGxTY3JlZW5DaGFuZ2VkQ2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICBcImNsaWNrIC5vdnAtZnVsbHNjcmVlbi1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRvZ2dsZUZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiRnVsbFNjcmVlbkJ1dHRvblwiLCBudWxsLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZ1bGxTY3JlZW5CdXR0b247XG4iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgJzxidXR0b24gY2xhc3M9XCJvdnAtYnV0dG9uIG92cC1mdWxsc2NyZWVuLWJ1dHRvblwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLWZ1bGxzY3JlZW4tYnV0dG9uLWV4cGFuZGljb25cIj48L2k+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtZnVsbHNjcmVlbi1idXR0b24tY29tcHJlc3NpY29uXCI+PC9pPicgK1xuICAgICAgICAnPC9idXR0b24+J1xuICAgICk7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjAuLlxuICovXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XG5pbXBvcnQgUGxheUJ1dHRvbiBmcm9tICd2aWV3L2NvbnRyb2xzL3BsYXlCdXR0b24nO1xuaW1wb3J0IFZvbHVtZUJ1dHRvbiBmcm9tICd2aWV3L2NvbnRyb2xzL3ZvbHVtZUJ1dHRvbic7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAndmlldy9jb250cm9scy9wcm9ncmVzc0Jhcic7XG5pbXBvcnQgVGltZURpc3BsYXkgZnJvbSAndmlldy9jb250cm9scy90aW1lRGlzcGxheSc7XG5pbXBvcnQgRnVsbFNjcmVlbkJ1dHRvbiBmcm9tICd2aWV3L2NvbnRyb2xzL2Z1bGxTY3JlZW5CdXR0b24nO1xuaW1wb3J0IFNldHRpbmdQYW5lbCBmcm9tICd2aWV3L2NvbnRyb2xzL3NldHRpbmdQYW5lbCc7XG5pbXBvcnQgU2V0dGluZ1BhbmVsTGlzdCBmcm9tICd2aWV3L2dsb2JhbC9TZXR0aW5nUGFuZWxMaXN0JztcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xuaW1wb3J0IHtcbiAgICBSRUFEWSxcbiAgICBDT05URU5UX01FVEEsXG4gICAgUFJPVklERVJfUlRNUCxcbiAgICBFUlJPUlxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBDb250cm9scyA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSl7XG4gICAgbGV0IHZvbHVtZUJ1dHRvbiA9IFwiXCIsIHBsYXlCdXR0b249IFwiXCIsIHByb2dyZXNzQmFyID0gXCJcIiwgdGltZURpc3BsYXkgPSBcIlwiLCBmdWxsU2NyZWVuQnV0dG9uID0gXCJcIjtcblxuICAgIGxldCBnZW5lcmF0ZU1haW5QYW5lbERhdGEgPSBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgcGFuZWwgPSB7dGl0bGUgOiBcIlNldHRpbmdzXCIsIGlzTWFpbiA6IHRydWUsIGJvZHkgOiBbXX07XG4gICAgICAgIGxldCBjdXJyZW50U291cmNlID0gYXBpLmdldEN1cnJlbnRRdWFsaXR5KCk7XG4gICAgICAgIGlmKGFwaS5nZXREdXJhdGlvbigpICE9PSBJbmZpbml0eSAmJiBjdXJyZW50U291cmNlLnR5cGUgIT09IFBST1ZJREVSX1JUTVApe1xuICAgICAgICAgICAgbGV0IGJvZHkgPSB7XG4gICAgICAgICAgICAgICAgdGl0bGUgOiBcIlNwZWVkXCIsXG4gICAgICAgICAgICAgICAgdmFsdWUgOiAgYXBpLmdldFBsYXliYWNrUmF0ZSgpID09PSAxID8gXCJOb3JtYWxcIiA6IGFwaS5nZXRQbGF5YmFja1JhdGUoKSxcbiAgICAgICAgICAgICAgICB0eXBlIDogXCJwbGF5YmFja3JhdGVcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhbmVsLmJvZHkucHVzaChib2R5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcGkuZ2V0UXVhbGl0eUxldmVscygpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50UXVhbGl0eSA9IGFwaS5nZXRDdXJyZW50UXVhbGl0eSgpO1xuXG4gICAgICAgICAgICBsZXQgYm9keSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZSA6IFwiU291cmNlXCIsXG4gICAgICAgICAgICAgICAgdmFsdWUgOiBjdXJyZW50UXVhbGl0eSA/IGN1cnJlbnRRdWFsaXR5LmxhYmVsIDogXCJEZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgdHlwZSA6IFwicXVhbGl0eWxldmVsXCJcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHBhbmVsLmJvZHkucHVzaChib2R5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFuZWw7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xuXG4gICAgICAgIGxldCBpbml0VGltZURpc3BsYXkgPSBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGlmKHRpbWVEaXNwbGF5KXtcbiAgICAgICAgICAgICAgICB0aW1lRGlzcGxheS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aW1lRGlzcGxheSA9IFRpbWVEaXNwbGF5KCRjdXJyZW50LmZpbmQoXCIub3ZwLWxlZnQtY29udHJvbHNcIiksIGFwaSwgZGF0YSk7XG4gICAgICAgIH07XG4gICAgICAgIGxldCBpbml0UHJvZ3Jlc3NCYXIgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYocHJvZ3Jlc3NCYXIpe1xuICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb2dyZXNzQmFyID0gUHJvZ3Jlc3NCYXIoJGN1cnJlbnQuZmluZChcIi5vdnAtcHJvZ3Jlc3NiYXItY29udGFpbmVyXCIpLCBhcGkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHBsYXlCdXR0b24gPSBQbGF5QnV0dG9uKCRjdXJyZW50LmZpbmQoXCIub3ZwLWxlZnQtY29udHJvbHNcIiksIGFwaSk7XG4gICAgICAgIHZvbHVtZUJ1dHRvbiA9IFZvbHVtZUJ1dHRvbigkY3VycmVudC5maW5kKFwiLm92cC1sZWZ0LWNvbnRyb2xzXCIpLCBhcGkpO1xuICAgICAgICBmdWxsU2NyZWVuQnV0dG9uID0gRnVsbFNjcmVlbkJ1dHRvbigkY3VycmVudC5maW5kKFwiLm92cC1yaWdodC1jb250cm9sc1wiKSwgYXBpKTtcblxuXG4gICAgICAgIGFwaS5vbihDT05URU5UX01FVEEsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGluaXRUaW1lRGlzcGxheShkYXRhKTtcbiAgICAgICAgICAgIGlmKGRhdGEuZHVyYXRpb24gPT09IEluZmluaXR5KXtcbiAgICAgICAgICAgICAgICAvL2xpdmVcbiAgICAgICAgICAgICAgICBpZihwcm9ncmVzc0Jhcil7XG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL3ZvZFxuICAgICAgICAgICAgICAgIGluaXRQcm9ncmVzc0JhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYXBpLm9uKEVSUk9SLCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgdGVtcGxhdGUuZGVzdHJveSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy9EbyBub3RoaW5nLlxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICBcIm1vdXNlbGVhdmUgLm92cC1jb250cm9sc1wiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB2b2x1bWVCdXR0b24uc2V0TW91c2VEb3duKGZhbHNlKTtcbiAgICAgICAgICAgICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICB9LFxuICAgICAgICBcImNsaWNrIC5vdnAtc2V0dGluZy1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy90b2dnbGVcbiAgICAgICAgICAgIGlmKFNldHRpbmdQYW5lbExpc3QubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgLy9jbGVhciBhbGwgU2V0dGluZ1BhbmVsVGVtcGxhdGVcbiAgICAgICAgICAgICAgICBfLmVhY2goU2V0dGluZ1BhbmVsTGlzdCwgZnVuY3Rpb24oc2V0dGluZ1BhbmVsKXtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ1BhbmVsLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBTZXR0aW5nUGFuZWxMaXN0LnNwbGljZSgwLCBTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBTZXR0aW5nUGFuZWxMaXN0LnB1c2goU2V0dGluZ1BhbmVsKCRjdXJyZW50LCBhcGksIGdlbmVyYXRlTWFpblBhbmVsRGF0YSgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cblxuXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIkNvbnRyb2xzXCIsICBudWxsICwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9scztcbiIsIlxuY29uc3QgQ29udHJvbHMgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIm92cC1jb250cm9scy1jb250YWluZXJcIj4nK1xuICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtZ3JhZGllbnQtYm90dG9tXCI+PC9kaXY+JyArXG4gICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1ib3R0b20tcGFuZWxcIj4nICtcbiAgICAgICAgICcgICAgPGRpdiBjbGFzcz1cIm92cC1wcm9ncmVzc2Jhci1jb250YWluZXJcIj4nICtcbiAgICAgICAgICcgICAgPC9kaXY+JyArXG4gICAgICAgICAnICAgIDxkaXYgY2xhc3M9XCJvdnAtY29udHJvbHNcIj4nICtcbiAgICAgICAgICcgICAgICAgIDxkaXYgY2xhc3M9XCJvdnAtbGVmdC1jb250cm9sc1wiPicgK1xuICAgICAgICAgJyAgICAgICAgPC9kaXY+JyArXG4gICAgICAgICAnICAgICAgICA8ZGl2IGNsYXNzPVwib3ZwLXJpZ2h0LWNvbnRyb2xzXCI+JyArXG4gICAgICAgICAnICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm92cC1idXR0b24gb3ZwLXNldHRpbmctYnV0dG9uXCI+PGkgY2xhc3M9XCJvdnAtc2V0dGluZy1idXR0b24taWNvblwiPjwvaT48L2J1dHRvbj4nICtcbiAgICAgICAgICcgICAgICAgIDwvZGl2PicgK1xuICAgICAgICAgJyAgICA8L2Rpdj4nICtcbiAgICAgICAgICc8L2Rpdj4nO1xuICAgICc8L2Rpdj4nO1xuXG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbHM7XG5cblxuXG5cblxuXG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI0Li5cbiAqL1xuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xuaW1wb3J0IHtcbiAgICBFUlJPUixcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUixcbiAgICBQTEFZRVJfU1RBVEVcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgUGxheUJ1dHRvbiA9IGZ1bmN0aW9uICgkY29udGFpbmVyLCBhcGkpIHtcbiAgICBsZXQgJGljb25QbGF5ID0gXCJcIixcbiAgICAgICAgJGljb25QYXVzZSA9IFwiXCIsXG4gICAgICAgICRpY29uUmVwbGF5ID0gXCJcIjtcblxuXG4gICAgbGV0IHNldEJ1dHRvblN0YXRlID0gZnVuY3Rpb24oc3RhdGUpe1xuICAgICAgICAkaWNvblBsYXkuaGlkZSgpO1xuICAgICAgICAkaWNvblBhdXNlLmhpZGUoKTtcbiAgICAgICAgJGljb25SZXBsYXkuaGlkZSgpO1xuXG4gICAgICAgIGlmKHN0YXRlID09PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgICRpY29uUGF1c2Uuc2hvdygpO1xuICAgICAgICB9ZWxzZSBpZihzdGF0ZSA9PT0gU1RBVEVfUEFVU0VEKXtcbiAgICAgICAgICAgICRpY29uUGxheS5zaG93KCk7XG4gICAgICAgIH1lbHNlIGlmKHN0YXRlID09PSBTVEFURV9DT01QTEVURSl7XG4gICAgICAgICAgICAkaWNvblBsYXkuc2hvdygpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRpY29uUGxheS5zaG93KCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cblxuXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICRpY29uUGxheSA9ICRjdXJyZW50LmZpbmQoIFwiLm92cC1wbGF5LWJ1dHRvbi1wbGF5aWNvblwiKTtcbiAgICAgICAgJGljb25QYXVzZSA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXBsYXktYnV0dG9uLXBhdXNlaWNvblwiKTtcbiAgICAgICAgJGljb25SZXBsYXkgPSAkY3VycmVudC5maW5kKFwiLm92cC1wbGF5LWJ1dHRvbi1yZXBsYXlpY29uXCIpO1xuXG4gICAgICAgIGFwaS5vbihQTEFZRVJfU1RBVEUsIGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLm5ld3N0YXRlKXtcbiAgICAgICAgICAgICAgICBzZXRCdXR0b25TdGF0ZShkYXRhLm5ld3N0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vRG8gbm90aGluZy5cbiAgICB9O1xuICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgICAgXCJjbGljayAub3ZwLXBsYXktYnV0dG9uXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSBhcGkuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IFNUQVRFX0lETEUpIHtcbiAgICAgICAgICAgICAgICBhcGkucGxheSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgICAgICBhcGkucGF1c2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YXRlID09PSBTVEFURV9QQVVTRUQpIHtcbiAgICAgICAgICAgICAgICBhcGkucGxheSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFKSB7XG4gICAgICAgICAgICAgICAgYXBpLnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiUGxheUJ1dHRvblwiLCBudWxsLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5QnV0dG9uOyIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cIm92cC1idXR0b24gb3ZwLXBsYXktYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXBsYXktYnV0dG9uLXBsYXlpY29uXCI+PC9pPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXBsYXktYnV0dG9uLXBhdXNlaWNvblwiPjwvaT4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm92cC1wbGF5LWJ1dHRvbi1yZXBsYXlpY29uXCI+PC9pPicgK1xuICAgICAgICAnPC9idXR0b24+J1xuICAgICk7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjQuLlxuICovXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XG5pbXBvcnQgU2V0dGluZ1BhbmVsTGlzdCBmcm9tICd2aWV3L2dsb2JhbC9TZXR0aW5nUGFuZWxMaXN0JztcbmltcG9ydCB7bmF0dXJhbEhtc30gZnJvbSAndXRpbHMvc3RyaW5ncydcbmltcG9ydCBMQSQgZnJvbSAndXRpbHMvbGlrZUEkJztcbmltcG9ydCB7XG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX1BBVVNFRFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBQcm9ncmVzc0JhciA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSl7XG4gICAgY29uc3QgJHJvb3QgPSBMQSQoXCIjXCIrYXBpLmdldENvbnRhaW5lcklkKCkpO1xuICAgIGxldCBjdXJyZW50UGxheWluZ1Bvc2l0aW9uID0gMDtcbiAgICBsZXQgY3VycmVudFBsYXlpbmdQZXJjZW50YWdlID0gMDtcbiAgICBsZXQgY3VycmVudExvYWRlZFBlcmNlbnRhZ2UgPSAwO1xuXG4gICAgbGV0IG1vdXNlSW5zaWRlID0gZmFsc2UsIG1vdXNlRG93biA9IGZhbHNlO1xuXG4gICAgbGV0ICRwcm9ncmVzc0JhciA9IFwiXCIsXG4gICAgICAgICRwcm9ncmVzc0xvYWQgPSBcIlwiLFxuICAgICAgICAkcHJvZ3Jlc3NQbGF5ID0gXCJcIixcbiAgICAgICAgJHByb2dyZXNzSG92ZXIgPSBcIlwiLFxuICAgICAgICAka25vYkNvbnRhaW5lciA9IFwiXCIsXG4gICAgICAgICRrbm9iID0gXCJcIixcbiAgICAgICAga25vYldpZHRoID0gMCxcbiAgICAgICAgJHRpbWUgPSBcIlwiO1xuXG5cbiAgICBsZXQgcG9zaXRpb25FbGVtZW50cyA9IGZ1bmN0aW9uIChwZXJjZW50YWdlKSB7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSAkcHJvZ3Jlc3NCYXIud2lkdGgoKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBwcm9ncmVzc0JhcldpZHRoICogcGVyY2VudGFnZTtcblxuICAgICAgICAkcHJvZ3Jlc3NQbGF5LmNzcygnd2lkdGgnLCBwb3NpdGlvbisgJ3B4Jyk7XG4gICAgICAgICRwcm9ncmVzc0hvdmVyLmNzcygnbGVmdCcsIHBvc2l0aW9uKyAncHgnKTtcblxuICAgICAgICBjb25zdCBrbm9iUG9zdGlvbiA9IChwcm9ncmVzc0JhcldpZHRoIC0ga25vYldpZHRoKSAqIHBlcmNlbnRhZ2U7XG4gICAgICAgICRrbm9iQ29udGFpbmVyLmNzcygnbGVmdCcsIGtub2JQb3N0aW9uKyAncHgnKTtcblxuICAgICAgICBjdXJyZW50UGxheWluZ1Bvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIGN1cnJlbnRQbGF5aW5nUGVyY2VudGFnZSA9IHBlcmNlbnRhZ2U7XG4gICAgfTtcblxuICAgIGxldCBkcmF3SG92ZXJQcm9ncmVzcyA9IGZ1bmN0aW9uIChwZXJjZW50YWdlKSB7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSAkcHJvZ3Jlc3NCYXIud2lkdGgoKTtcbiAgICAgICAgY29uc3QgaG92ZXJQb3NpdGlvbiA9IHByb2dyZXNzQmFyV2lkdGggKiBwZXJjZW50YWdlO1xuXG4gICAgICAgICRwcm9ncmVzc0hvdmVyLmNzcygnd2lkdGgnLCBwZXJjZW50YWdlID09IDA/IHBlcmNlbnRhZ2UgOiAoaG92ZXJQb3NpdGlvbiAtIGN1cnJlbnRQbGF5aW5nUG9zaXRpb24pKyAncHgnKTtcbiAgICB9O1xuXG4gICAgbGV0IGRyYXdMb2FkUHJvZ3Jlc3MgPSBmdW5jdGlvbihwZXJjZW50YWdlKSB7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSAkcHJvZ3Jlc3NCYXIud2lkdGgoKTtcbiAgICAgICAgY29uc3QgbG9hZFBvc2l0aW9uID0gcHJvZ3Jlc3NCYXJXaWR0aCAqIHBlcmNlbnRhZ2U7XG5cbiAgICAgICAgJHByb2dyZXNzTG9hZC5jc3MoJ3dpZHRoJywgbG9hZFBvc2l0aW9uKyAncHgnKTtcbiAgICAgICAgY3VycmVudExvYWRlZFBlcmNlbnRhZ2UgPSBwZXJjZW50YWdlO1xuICAgIH07XG5cbiAgICBsZXQgY2FsY3VsYXRlUGVyY2VudGFnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBjb25zdCBwcm9ncmVzc0JhcldpZHRoID0gJHByb2dyZXNzQmFyLndpZHRoKCk7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyT2Zmc2V0WCA9ICRwcm9ncmVzc0Jhci5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICBjb25zdCBwb2ludGVyT2Zmc2V0WCA9IGV2ZW50LnBhZ2VYO1xuXG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSAocG9pbnRlck9mZnNldFggLSBwcm9ncmVzc0Jhck9mZnNldFgpIC8gcHJvZ3Jlc3NCYXJXaWR0aDtcblxuICAgICAgICBpZiAocGVyY2VudGFnZSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBlcmNlbnRhZ2UgPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwZXJjZW50YWdlO1xuICAgIH07XG5cbiAgICBsZXQgZHJhd1RpbWVJbmRpY2F0b3IgPSBmdW5jdGlvbiAocGVyY2VudGFnZSwgZXZlbnQpIHtcbiAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAkdGltZS5oaWRlKCk7XG4gICAgICAgICAgIHJldHVybiA7XG4gICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gYXBpLmdldER1cmF0aW9uKCk7XG4gICAgICAgIGNvbnN0IHNlY29uZCA9IGR1cmF0aW9uICogcGVyY2VudGFnZTtcblxuICAgICAgICBjb25zdCBobXMgPSBuYXR1cmFsSG1zKHNlY29uZCk7XG5cbiAgICAgICAgJHRpbWUudGV4dChobXMpO1xuXG4gICAgICAgIGNvbnN0IHRpbWVFbGVtV2lkdGggPSAkdGltZS53aWR0aCgpO1xuICAgICAgICBjb25zdCBwcm9ncmVzc0JhcldpZHRoID0gJHByb2dyZXNzQmFyLndpZHRoKCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gcHJvZ3Jlc3NCYXJXaWR0aCAqIHBlcmNlbnRhZ2U7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uT2ZQaXhlbCA9IGV2ZW50LnBhZ2VYIC0gJHByb2dyZXNzQmFyLm9mZnNldCgpLmxlZnQ7XG5cblxuICAgICAgICBjb25zdCBjYWxjdWxhdGVNYWduZXRpYyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZihwb3NpdGlvbk9mUGl4ZWwgPCB0aW1lRWxlbVdpZHRoIC8gMil7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9ZWxzZSBpZihwcm9ncmVzc0JhcldpZHRoLXBvc2l0aW9uT2ZQaXhlbCAgPCB0aW1lRWxlbVdpZHRoIC8gMil7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2dyZXNzQmFyV2lkdGggLSB0aW1lRWxlbVdpZHRoO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uIC0gdGltZUVsZW1XaWR0aCAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGxldCBtYWduZXRpY1Bvc2l0aW9uID0gY2FsY3VsYXRlTWFnbmV0aWMoKTtcbiAgICAgICAgJHRpbWUuY3NzKCdsZWZ0JywgbWFnbmV0aWNQb3NpdGlvbisgXCJweFwiKTtcbiAgICB9O1xuXG4gICAgbGV0IHNlZWsgPSBmdW5jdGlvbiAocGVyY2VudGFnZSkge1xuICAgICAgICBhcGkuc2VlayggKGFwaS5nZXREdXJhdGlvbigpfHwwKSAqIHBlcmNlbnRhZ2UpO1xuICAgIH07XG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICRwcm9ncmVzc0JhciA9ICRjdXJyZW50O1xuICAgICAgICAkcHJvZ3Jlc3NMb2FkID0gJGN1cnJlbnQuZmluZChcIi5vdnAtbG9hZC1wcm9ncmVzc1wiKTtcbiAgICAgICAgJHByb2dyZXNzUGxheSA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXBsYXktcHJvZ3Jlc3NcIik7XG4gICAgICAgICRwcm9ncmVzc0hvdmVyID0gJGN1cnJlbnQuZmluZChcIi5vdnAtaG92ZXItcHJvZ3Jlc3NcIik7XG4gICAgICAgICRrbm9iQ29udGFpbmVyID0gJGN1cnJlbnQuZmluZChcIi5vdnAtcHJvZ3Jlc3NiYXIta25vYi1jb250YWluZXJcIik7XG4gICAgICAgICRrbm9iID0gJGN1cnJlbnQuZmluZChcIi5vdnAtcHJvZ3Jlc3NiYXIta25vYlwiKTtcbiAgICAgICAga25vYldpZHRoID0gJGtub2Iud2lkdGgoKTtcbiAgICAgICAgJHRpbWUgPSAkY3VycmVudC5maW5kKFwiLm92cC1wcm9ncmVzc2Jhci10aW1lXCIpO1xuXG4gICAgICAgIGFwaS5vbigndGltZScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGlmKGRhdGEgJiYgZGF0YS5kdXJhdGlvbiAmJiBkYXRhLnBvc2l0aW9uKXtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKGRhdGEucG9zaXRpb24gLyBkYXRhLmR1cmF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXBpLm9uKCdidWZmZXJDaGFuZ2VkJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLmJ1ZmZlclBlcmNlbnQpe1xuICAgICAgICAgICAgICAgIGRyYXdMb2FkUHJvZ3Jlc3MoZGF0YS5idWZmZXJQZXJjZW50IC8gMTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcblxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICBcInJlc2l6ZSB3aW5kb3dcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgcG9zaXRpb25FbGVtZW50cyhjdXJyZW50UGxheWluZ1BlcmNlbnRhZ2UpO1xuICAgICAgICAgICAgZHJhd0xvYWRQcm9ncmVzcyhjdXJyZW50TG9hZGVkUGVyY2VudGFnZSk7XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2VlbnRlciAub3ZwLXByb2dyZXNzYmFyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1vdXNlSW5zaWRlID0gdHJ1ZTtcbiAgICAgICAgICAgICR0aW1lLnNob3coKTtcbiAgICAgICAgICAgICRyb290LmFkZENsYXNzKFwib3ZwLXByb2dyZXNzYmFyLWhvdmVyXCIpO1xuXG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2VsZWF2ZSAub3ZwLXByb2dyZXNzYmFyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1vdXNlSW5zaWRlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIW1vdXNlSW5zaWRlKSB7XG4gICAgICAgICAgICAgICAgJHJvb3QucmVtb3ZlQ2xhc3MoXCJvdnAtcHJvZ3Jlc3NiYXItaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgJHRpbWUuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZHJhd0hvdmVyUHJvZ3Jlc3MoMCk7XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2Vkb3duIC5vdnAtcHJvZ3Jlc3NiYXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIG1vdXNlRG93biA9IHRydWU7XG4gICAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gY2FsY3VsYXRlUGVyY2VudGFnZShldmVudCk7XG4gICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKHBlcmNlbnRhZ2UpO1xuICAgICAgICAgICAgZHJhd0hvdmVyUHJvZ3Jlc3MoMCk7XG4gICAgICAgICAgICBzZWVrKHBlcmNlbnRhZ2UpO1xuICAgICAgICB9LFxuICAgICAgICBcIm1vdXNlbW92ZSAub3ZwLXByb2dyZXNzYmFyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmICghbW91c2VEb3duKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IGNhbGN1bGF0ZVBlcmNlbnRhZ2UoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGRyYXdIb3ZlclByb2dyZXNzKHBlcmNlbnRhZ2UpO1xuICAgICAgICAgICAgICAgIGRyYXdUaW1lSW5kaWNhdG9yKHBlcmNlbnRhZ2UsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZW1vdmUgZG9jdW1lbnRcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChtb3VzZURvd24pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gY2FsY3VsYXRlUGVyY2VudGFnZShldmVudCk7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25FbGVtZW50cyhwZXJjZW50YWdlKTtcbiAgICAgICAgICAgICAgICBkcmF3SG92ZXJQcm9ncmVzcygwKTtcbiAgICAgICAgICAgICAgICBzZWVrKHBlcmNlbnRhZ2UpO1xuICAgICAgICAgICAgICAgIGRyYXdUaW1lSW5kaWNhdG9yKHBlcmNlbnRhZ2UsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZXVwIGRvY3VtZW50XCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmKG1vdXNlRG93bil7XG4gICAgICAgICAgICAgICAgbW91c2VEb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHJvb3QucmVtb3ZlQ2xhc3MoXCJvdnAtcHJvZ3Jlc3NiYXItaG92ZXJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiUHJvZ3Jlc3NCYXJcIiwgbnVsbCwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NCYXI7XG4iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXJcIiB0YWJpbmRleD1cIjBcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXByb2dyZXNzYmFyLXBhZGRpbmdcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXByb2dyZXNzLWxpc3RcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1sb2FkLXByb2dyZXNzXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcGxheS1wcm9ncmVzcyBvdnAtcGxheS1iYWNrZ3JvdW5kLWNvbG9yXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtaG92ZXItcHJvZ3Jlc3NcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXByb2dyZXNzYmFyLWtub2ItY29udGFpbmVyXCI+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXIta25vYiBvdnAtcGxheS1iYWNrZ3JvdW5kLWNvbG9yXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXItdGltZVwiPjA6MDA8L3NwYW4+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNi4uXG4gKi9cbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcbmltcG9ydCBTZXR0aW5nUGFuZWxMaXN0IGZyb20gJ3ZpZXcvZ2xvYmFsL1NldHRpbmdQYW5lbExpc3QnO1xuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5jb25zdCBQTEFZRVJfTUlOX0hFSUdIVCA9IDIyMDtcbmNvbnN0IFNldHRpbmdQYW5lbCA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSwgZGF0YSl7XG4gICAgY29uc3QgJHJvb3QgPSBMQSQoXCIjXCIrYXBpLmdldENvbnRhaW5lcklkKCkpO1xuXG4gICAgbGV0IGV4dHJhY3RQYW5lbERhdGEgPSBmdW5jdGlvbihwYW5lbFR5cGUpe1xuICAgICAgICBsZXQgcGFuZWwgPSB7dGl0bGUgOiBcIlwiLCBib2R5IDogW10sIHR5cGUgOiBwYW5lbFR5cGV9O1xuXG4gICAgICAgIGlmKHBhbmVsVHlwZSA9PT0gXCJwbGF5YmFja3JhdGVcIil7XG4gICAgICAgICAgICBwYW5lbC50aXRsZSA9IFwiU3BlZWRcIjtcbiAgICAgICAgICAgIGxldCBwbGF5QmFja1JhdGVzID0gYXBpLmdldENvbmZpZygpLnBsYXliYWNrUmF0ZXM7XG4gICAgICAgICAgICBsZXQgY3VycmVudFBsYXliYWNrUmF0ZSA9IGFwaS5nZXRQbGF5YmFja1JhdGUoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheUJhY2tSYXRlcy5sZW5ndGg7IGkgKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiAocGxheUJhY2tSYXRlc1tpXSA9PT0gMT8gXCJOb3JtYWxcIiA6IHBsYXlCYWNrUmF0ZXNbaV0pLFxuICAgICAgICAgICAgICAgICAgICBpc0NoZWNrIDogY3VycmVudFBsYXliYWNrUmF0ZSA9PT0gcGxheUJhY2tSYXRlc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiBwbGF5QmFja1JhdGVzW2ldXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBwYW5lbC5ib2R5LnB1c2goYm9keSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWVsc2UgaWYocGFuZWxUeXBlID09PSBcInF1YWxpdHlsZXZlbFwiKXtcbiAgICAgICAgICAgIHBhbmVsLnRpdGxlID0gXCJTb3VyY2VcIjtcblxuICAgICAgICAgICAgbGV0IHF1YWxpdHlMZXZlbHMgPSBhcGkuZ2V0UXVhbGl0eUxldmVscygpO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRRdWFsaXR5ID0gYXBpLmdldEN1cnJlbnRRdWFsaXR5KCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVhbGl0eUxldmVscy5sZW5ndGg7IGkgKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiBxdWFsaXR5TGV2ZWxzW2ldLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBpc0NoZWNrIDogY3VycmVudFF1YWxpdHkuaW5kZXggPT09IGksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlIDogaVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcGFuZWwuYm9keS5wdXNoKGJvZHkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhbmVsO1xuICAgIH07XG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgaWYoUExBWUVSX01JTl9IRUlHSFQgPiAkcm9vdC5oZWlnaHQoKSl7XG4gICAgICAgICAgICAkcm9vdC5maW5kKFwiLm92cC1zZXR0aW5nLXBhbmVsXCIpLmNzcyhcIm1heEhlaWdodFwiLCBcIjExNHB4XCIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vRG8gbm90aGluZy5cbiAgICB9O1xuICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgICAgXCJjbGljayAub3ZwLXNldHRpbmctbWFpbi1pdGVtXCI6IGZ1bmN0aW9uIChldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IHBhbmVsVHlwZSA9IExBJChldmVudC5jdXJyZW50VGFyZ2V0KS5hdHRyKFwib3ZwLXBhbmVsLXR5cGVcIik7XG4gICAgICAgICAgICAvL3BhcmVudCBtdXN0IGJlIG5vdCAkY3VycmVudCFcbiAgICAgICAgICAgIFNldHRpbmdQYW5lbExpc3QucHVzaChTZXR0aW5nUGFuZWwoJGNvbnRhaW5lciwgYXBpLCBleHRyYWN0UGFuZWxEYXRhKHBhbmVsVHlwZSkpKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJjbGljayAub3ZwLXNldHRpbmctdGl0bGVcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy9SZW1vdmUgQ3VycmVudCBQYW5lbFxuICAgICAgICAgICAgbGV0IGxhc3QgPSBTZXR0aW5nUGFuZWxMaXN0LnBvcCgpO1xuICAgICAgICAgICAgbGFzdC5kZXN0cm95KCk7XG4gICAgICAgIH0sXG4gICAgICAgIFwiY2xpY2sgLm92cC1zZXR0aW5nLWl0ZW0tdmFsdWVcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbGV0IHBhbmVsVHlwZSA9IExBJChldmVudC5jdXJyZW50VGFyZ2V0KS5hdHRyKFwib3ZwLXBhbmVsLXR5cGVcIik7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBMQSQoZXZlbnQuY3VycmVudFRhcmdldCkuYXR0cihcIm92cC1kYXRhLXZhbHVlXCIpO1xuXG4gICAgICAgICAgICBpZihwYW5lbFR5cGUgJiYgdmFsdWUpe1xuICAgICAgICAgICAgICAgIGlmKHBhbmVsVHlwZSA9PT0gXCJwbGF5YmFja3JhdGVcIil7XG4gICAgICAgICAgICAgICAgICAgIGFwaS5zZXRQbGF5YmFja1JhdGUocGFyc2VGbG9hdCh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHBhbmVsVHlwZSA9PT0gXCJxdWFsaXR5bGV2ZWxcIil7XG4gICAgICAgICAgICAgICAgICAgIGFwaS5zZXRDdXJyZW50UXVhbGl0eShwYXJzZUludCh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vY2xlYXIgYWxsIFNldHRpbmdQYW5lbFRlbXBsYXRlXG4gICAgICAgICAgICAgICAgXy5lYWNoKFNldHRpbmdQYW5lbExpc3QsIGZ1bmN0aW9uKHNldHRpbmdQYW5lbCl7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdQYW5lbC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgU2V0dGluZ1BhbmVsTGlzdC5zcGxpY2UoMCwgU2V0dGluZ1BhbmVsTGlzdC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIlNldHRpbmdQYW5lbFwiLCBkYXRhLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNldHRpbmdQYW5lbDtcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChkYXRhKSA9PiB7XG4gICAgbGV0IGVsZW1lbnRzID0gJzxkaXYgY2xhc3M9XCJvdnAtc2V0dGluZy1wYW5lbCAnKyhkYXRhLmlzTWFpbiA/ICdhbmltYXRlZCBmYWRlSW4nOiAnJykrJ1wiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtc2V0dGluZy10aXRsZS1jb250YWluZXJcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1zZXR0aW5nLXRpdGxlXCIgdGFiaW5kZXg9XCIwXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkYXRhLmlzTWFpbiA/ICcnIDogJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctdGl0bGUtcHJldmljb25cIj4mbHQ7PC9zcGFuPicpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctdGl0bGUtdGl0bGVcIj4nK2RhdGEudGl0bGUrJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbS1jb250YWluZXJcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChkYXRhLmJvZHksIGZ1bmN0aW9uKGJvZHkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmlzTWFpbil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyArPSBzZXR0aW5nSXRlbVRlbXBsYXRlKGJvZHkudGl0bGUsIGJvZHkudmFsdWUsIGJvZHkudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgKz0gc2V0dGluZ1ZhbHVlVGVtcGxhdGUoYm9keS50aXRsZSwgYm9keS52YWx1ZSwgZGF0YS50eXBlLCBib2R5LmlzQ2hlY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgZWxlbWVudHMrPSAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgIHJldHVybiBlbGVtZW50cztcbn07XG5cbmV4cG9ydCBjb25zdCBzZXR0aW5nSXRlbVRlbXBsYXRlID0gKHRpdGxlLCB2YWx1ZSwgdHlwZSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbSBvdnAtc2V0dGluZy1tYWluLWl0ZW1cIiBvdnAtcGFuZWwtdHlwZT1cIicrdHlwZSsnXCI+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtLXRpdGxlXCI+Jyt0aXRsZSsnPC9zcGFuPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbS1uZXh0aWNvblwiPiZndDs8L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtLXZhbHVlXCI+Jyt2YWx1ZSsnPC9zcGFuPicgK1xuICAgICAgICAnPC9kaXY+J1xuICAgICk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0dGluZ1ZhbHVlVGVtcGxhdGUgPSAodGl0bGUsIHZhbHVlLCB0eXBlLCBpc0NoZWNrKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtIG92cC1zZXR0aW5nLWl0ZW0tdmFsdWVcIiBvdnAtcGFuZWwtdHlwZT1cIicrdHlwZSsnXCIgb3ZwLWRhdGEtdmFsdWU9XCInK3ZhbHVlKydcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0tY2hlY2tlZCAnKyhpc0NoZWNrPydvdnAtc2hvdyc6JycpKydcIj4mI3gyNzEzOzwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0tdGl0bGVcIj4nK3RpdGxlKyc8L3NwYW4+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNS4uXG4gKi9cbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcbmltcG9ydCB7bmF0dXJhbEhtc30gZnJvbSAndXRpbHMvc3RyaW5ncyc7XG5cbmNvbnN0IFRpbWVEaXNwbGF5ID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpLCBkYXRhKXtcblxuICAgIGxldCAkcG9zaXRpb24gPSBcIlwiLCAkZHVyYXRpb24gPSBcIlwiO1xuICAgIGxldCBjb252ZXJ0SHVtYW5pemVUaW1lID0gZnVuY3Rpb24odGltZSl7XG4gICAgICAgIHJldHVybiBuYXR1cmFsSG1zKHRpbWUpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgJHBvc2l0aW9uID0gJGN1cnJlbnQuZmluZCgnLm92cC10aW1lLWN1cnJlbnQnKTtcbiAgICAgICAgJGR1cmF0aW9uID0gJGN1cnJlbnQuZmluZCgnLm92cC10aW1lLWR1cmF0aW9uJyk7XG5cbiAgICAgICAgaWYoZGF0YS5kdXJhdGlvbiAhPT0gSW5maW5pdHkpe1xuXG4gICAgICAgICAgICAkZHVyYXRpb24udGV4dChjb252ZXJ0SHVtYW5pemVUaW1lKGRhdGEuZHVyYXRpb24pKTtcbiAgICAgICAgICAgIGFwaS5vbigndGltZScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkcG9zaXRpb24udGV4dChjb252ZXJ0SHVtYW5pemVUaW1lKGRhdGEucG9zaXRpb24pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy9EbyBub3RoaW5nLlxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuXG4gICAgfTtcblxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJUaW1lRGlzcGxheVwiLCBkYXRhLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFRpbWVEaXNwbGF5OyIsImV4cG9ydCBkZWZhdWx0IChkYXRhKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdGltZS1kaXNwbGF5XCI+JytcbiAgICAgICAgICAgIChkYXRhLmR1cmF0aW9uID09PSBJbmZpbml0eVxuICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAoJzxidXR0b24gY2xhc3M9XCJvdnAtbGl2ZS1iYWRnZSBvdnAtYnV0dG9uXCIgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiPicgK1xuICAgICAgICAgICAgICAgICAgICAoZGF0YS50eXBlID09J3dlYnJ0YydcbiAgICAgICAgICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1saXZlLWJhZGdlLWxvd2xhdGVuY3lcIj5sb3cgbGF0ZW5jeSBsaXZlPC9zcGFuPidcbiAgICAgICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj5saXZlPC9zcGFuPicpICtcbiAgICAgICAgICAgICAgICAnPC9idXR0b24+JylcbiAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgKCc8c3BhbiBjbGFzcz1cIm92cC10aW1lLWN1cnJlbnRcIj4wOjAwPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtdGltZS1zZXBhcmF0b3JcIj4gLyA8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC10aW1lLWR1cmF0aW9uXCI+MDowMDwvc3Bhbj4nKVxuICAgICAgICAgICAgKSArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMC4uXG4gKi9cbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcblxuY29uc3QgVm9sdW1lQnV0dG9uID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpKXtcblxuICAgIGxldCAkc2xpZGVyQ29udGFpbmVyID0gXCJcIixcbiAgICAgICAgJHNsaWRlciA9IFwiXCIsXG4gICAgICAgICRzbGlkZXJIYW5kbGUgPSBcIlwiLFxuICAgICAgICAkc2xpZGVyVmFsdWUgPSBcIlwiLFxuICAgICAgICAkdm9sdW1lSWNvbkJpZyA9IFwiXCIsXG4gICAgICAgICR2b2x1bWVJY29uU21hbGwgPSBcIlwiLFxuICAgICAgICAkdm9sdW1lSWNvbk11dGUgPSBcIlwiO1xuICAgIGxldCBtb3VzZURvd24gPSBmYWxzZTtcbiAgICBsZXQgc2xpZGVyV2lkdGggPSA3MCwgIGhhbmRsZVdpZHRoID0gMCwgbWluUmFuZ2UgPSAwLCBtYXhSYW5nZSA9IDA7XG5cblxuICAgIC8qcHJpdmF0ZSBmdW5jdGlvbnMqL1xuICAgIGxldCBzZXRWb2x1bWVJY29uID0gZnVuY3Rpb24ocGVyY2VudGFnZSkge1xuICAgICAgICAkdm9sdW1lSWNvbkJpZy5oaWRlKCk7XG4gICAgICAgICR2b2x1bWVJY29uU21hbGwuaGlkZSgpO1xuICAgICAgICAkdm9sdW1lSWNvbk11dGUuaGlkZSgpO1xuXG4gICAgICAgIGlmIChwZXJjZW50YWdlID49IDcwKSB7XG4gICAgICAgICAgICAkdm9sdW1lSWNvbkJpZy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSBpZiAocGVyY2VudGFnZSA8IDcwICYmIHBlcmNlbnRhZ2UgPiAwKSB7XG4gICAgICAgICAgICAkdm9sdW1lSWNvblNtYWxsLnNob3coKTtcbiAgICAgICAgfSBlbHNlIGlmIChwZXJjZW50YWdlID09IDApIHtcbiAgICAgICAgICAgICR2b2x1bWVJY29uTXV0ZS5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgc2V0Vm9sdW1lVUkgPSBmdW5jdGlvbihwZXJjZW50YWdlKSB7XG4gICAgICAgIGlmIChhcGkuZ2V0TXV0ZSgpKSB7XG4gICAgICAgICAgICBwZXJjZW50YWdlID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFZvbHVtZUljb24ocGVyY2VudGFnZSk7XG5cbiAgICAgICAgY29uc3QgaGFuZGxlUG9zaXRpb24gPSBtYXhSYW5nZSAqIHBlcmNlbnRhZ2UgLyAxMDA7XG5cbiAgICAgICAgJHNsaWRlckhhbmRsZS5jc3MoJ2xlZnQnLCBoYW5kbGVQb3NpdGlvbisgJ3B4Jyk7XG4gICAgICAgICRzbGlkZXJWYWx1ZS5jc3MoJ3dpZHRoJywgaGFuZGxlUG9zaXRpb24rICdweCcpO1xuICAgIH1cblxuICAgIGxldCBjYWxjdWxhdGVQZXJjZW50YWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHJlbGF0aXZlWCA9IGV2ZW50LnBhZ2VYIC0gJHNsaWRlci5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICBsZXQgcGVyY2VudGFnZSA9IHJlbGF0aXZlWCAvIHNsaWRlcldpZHRoICogMTAwO1xuXG4gICAgICAgIGlmIChwZXJjZW50YWdlIDwgMCkge1xuICAgICAgICAgICAgcGVyY2VudGFnZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGVyY2VudGFnZSA+IDEwMCkge1xuICAgICAgICAgICAgcGVyY2VudGFnZSA9IDEwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwZXJjZW50YWdlO1xuICAgIH1cblxuXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICRzbGlkZXJDb250YWluZXIgPSAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lclwiKTtcbiAgICAgICAgJHNsaWRlciA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1zaWxkZXJcIik7XG4gICAgICAgICRzbGlkZXJIYW5kbGUgPSAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZVwiKTtcbiAgICAgICAgJHNsaWRlclZhbHVlID0gJGN1cnJlbnQuZmluZChcIi5vdnAtdm9sdW1lLXNsaWRlci12YWx1ZVwiKTtcblxuICAgICAgICAkdm9sdW1lSWNvbkJpZyA9ICRjdXJyZW50LmZpbmQoIFwiLm92cC12b2x1bWUtYnV0dG9uLWJpZ2ljb25cIik7XG4gICAgICAgICR2b2x1bWVJY29uU21hbGwgPSAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtYnV0dG9uLXNtYWxsaWNvblwiKTtcbiAgICAgICAgJHZvbHVtZUljb25NdXRlID0gJGN1cnJlbnQuZmluZChcIi5vdnAtdm9sdW1lLWJ1dHRvbi1tdXRlaWNvblwiKTtcblxuICAgICAgICBoYW5kbGVXaWR0aCA9ICRzbGlkZXJIYW5kbGUud2lkdGgoKTtcbiAgICAgICAgbWF4UmFuZ2UgPSBzbGlkZXJXaWR0aCAtIGhhbmRsZVdpZHRoO1xuXG4gICAgICAgIGFwaS5vbigncmVhZHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFZvbHVtZVVJKGFwaS5nZXRWb2x1bWUoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBhcGkub24oJ3ZvbHVtZUNoYW5nZWQnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBzZXRWb2x1bWVVSShkYXRhLnZvbHVtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBhcGkub24oJ211dGUnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5tdXRlKSB7XG4gICAgICAgICAgICAgICAgc2V0Vm9sdW1lVUkoMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFZvbHVtZVVJKGFwaS5nZXRWb2x1bWUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XG5cbiAgICB9O1xuICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgICAgXCJjbGljayAub3ZwLXZvbHVtZS1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKGFwaS5nZXRWb2x1bWUoKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGFwaS5zZXRNdXRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBhcGkuc2V0Vm9sdW1lKDEwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFwaS5zZXRNdXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2VlbnRlciAub3ZwLXZvbHVtZS1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICRzbGlkZXJDb250YWluZXIuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2VsZWF2ZSAub3ZwLXZvbHVtZS1zaWxkZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbW91c2VEb3duID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2Vkb3duIC5vdnAtdm9sdW1lLXNpbGRlclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbW91c2VEb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIGFwaS5zZXRNdXRlKGZhbHNlKTtcbiAgICAgICAgICAgIGFwaS5zZXRWb2x1bWUoY2FsY3VsYXRlUGVyY2VudGFnZShldmVudCkpO1xuICAgICAgICB9LFxuICAgICAgICBcIm1vdXNldXAgLm92cC12b2x1bWUtc2lsZGVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZW1vdmUgLm92cC12b2x1bWUtc2lsZGVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW1vdXNlRG93bikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXBpLnNldFZvbHVtZShjYWxjdWxhdGVQZXJjZW50YWdlKGV2ZW50KSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiVm9sdW1lQnV0dG9uXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQpLCB7XG4gICAgICAgIHNldE1vdXNlRG93bjogZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICBtb3VzZURvd24gPSBzdGF0ZTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVm9sdW1lQnV0dG9uO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjAuLlxuICovXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdm9sdW1lLWNvbnRyb2xsZXJcIj4nK1xuICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJvdnAtYnV0dG9uIG92cC12b2x1bWUtYnV0dG9uXCI+JyArXG4gICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXZvbHVtZS1idXR0b24tYmlnaWNvblwiPjwvaT4nICtcbiAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtdm9sdW1lLWJ1dHRvbi1zbWFsbGljb25cIj48L2k+JyArXG4gICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXZvbHVtZS1idXR0b24tbXV0ZWljb25cIj48L2k+JyArXG4gICAgICAgICAgICAnPC9idXR0b24+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lclwiPicgK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXZvbHVtZS1zaWxkZXJcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdm9sdW1lLXNsaWRlci1iZ1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC12b2x1bWUtc2xpZGVyLXZhbHVlXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXZvbHVtZS1zbGlkZXItaGFuZGxlXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAxOS4uXG4gKi9cblxuaW1wb3J0IFRlbXBsYXRlcyBmcm9tIFwidmlldy9lbmdpbmUvVGVtcGxhdGVzXCI7XG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgaXMgc2ltcGxlIHVpIHJlbmRlcmVyLiBUaGlzIHJldHVybnMgb25SZW5kZXJlZCBjYWxsYmFjaywgb25EZXN0cm95ZWQgY2FsbGJhY2sgb24gVGVtcGxhdGUuIEFuZCB0aGlzIGJpbmQgZXZlbnRzIGZvciBUZW1wbGF0ZXMuXG4gKiBAcGFyYW0gICBjb250YWluZXIgIGRvbSBlbGVtZW50IG9yIExBJCBvYmplY3RcbiAqIEBwYXJhbSAgIHRlbXBsYXRlTmFtZSAgICB0ZW1wbGF0ZU5hbWVcbiAqIEBwYXJhbSAgIGRhdGEgICAgcHJlbG9hZCBkYXRhXG4gKiBAcGFyYW0gICBldmVudHMgICAgVGVtcGxhdGUncyBldmVudHMuXG4gKiBAcGFyYW0gICBvblJlbmRlcmVkICAgIFRoaXMgY2FsbGJhY2sgb2NjdXJzIGFmdGVyIGFwcGVuZCB0ZW1wbGF0ZS5cbiAqIEBwYXJhbSAgIG9uRGVzdHJveWVkICAgIFRoaXMgY2FsbGJhY2sgb2NjdXJzIGFmdGVyIGRlc3Ryb3llZCB0ZW1wbGF0ZS5cbiAqIEBwYXJhbSAgIGlzUm9vdFxuICpcbiAqICovXG5jb25zdCBPdmVuVGVtcGxhdGUgPSBmdW5jdGlvbiAoY29udGFpbmVyLCB0ZW1wbGF0ZU5hbWUsIGRhdGEsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQsIGlzUm9vdCkge1xuICAgIGxldCAkY29udGFpbmVyID0gXy5pc0VsZW1lbnQoY29udGFpbmVyKSA/IExBJChjb250YWluZXIpIDogY29udGFpbmVyO1xuICAgIGxldCAkdGVtcGxhdGU7XG4gICAgbGV0IHZpZXdFdmVudHMgPSB7fTtcbiAgICBsZXQgdGhhdCA9IHt9O1xuXG4gICAgbGV0IGNyZWF0ZUFuZFNlbGVjdEVsZW1lbnQgPSBmdW5jdGlvbiAoaHRtbCkge1xuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5ld0VsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICAkdGVtcGxhdGUgPSBMQSQobmV3RWxlbWVudC5maXJzdENoaWxkKTtcblxuICAgICAgICByZXR1cm4gbmV3RWxlbWVudC5maXJzdENoaWxkO1xuICAgIH1cblxuICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgJGNvbnRhaW5lci5yZXBsYWNlKGNyZWF0ZUFuZFNlbGVjdEVsZW1lbnQoVGVtcGxhdGVzW3RlbXBsYXRlTmFtZSArIFwiVGVtcGxhdGVcIl0oZGF0YSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkY29udGFpbmVyLmFwcGVuZChjcmVhdGVBbmRTZWxlY3RFbGVtZW50KFRlbXBsYXRlc1t0ZW1wbGF0ZU5hbWUgKyBcIlRlbXBsYXRlXCJdKGRhdGEpKSk7XG4gICAgfVxuXG4gICAgaWYgKG9uUmVuZGVyZWQpIHtcbiAgICAgICAgb25SZW5kZXJlZCgkdGVtcGxhdGUsIHRoYXQpO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKGV2ZW50cykuZm9yRWFjaChldmVudFN0cmluZyA9PiB7XG4gICAgICAgIGxldCBleHBsb2RlZFRleHQgPSBldmVudFN0cmluZy5zcGxpdChcIiBcIik7XG4gICAgICAgIGxldCBldmVudE5hbWUgPSBleHBsb2RlZFRleHRbMF0ucmVwbGFjZSgvIC9naSwgXCJcIik7XG4gICAgICAgIGxldCB0YXJnZXQgPSBleHBsb2RlZFRleHRbMV0ucmVwbGFjZSgvIC9naSwgXCJcIik7XG5cbiAgICAgICAgbGV0ICR0YXJnZXQgPSBcIlwiO1xuXG4gICAgICAgIGlmKHRhcmdldCA9PT0gXCJkb2N1bWVudFwiIHx8IHRhcmdldCA9PT0gXCJ3aW5kb3dcIil7XG4gICAgICAgICAgICAkdGFyZ2V0ID0gTEEkKHRhcmdldCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJHRhcmdldCA9ICR0ZW1wbGF0ZS5maW5kKHRhcmdldCkgfHwgKCR0ZW1wbGF0ZS5oYXNDbGFzcyh0YXJnZXQucmVwbGFjZShcIi5cIixcIlwiKSkgPyAkdGVtcGxhdGUgOiBudWxsKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKGV2ZW50TmFtZSAmJiB0YXJnZXQgJiYgJHRhcmdldCkge1xuICAgICAgICAgICAgbGV0IGlkID0gT2JqZWN0LmtleXModmlld0V2ZW50cykubGVuZ3RoKys7XG5cbiAgICAgICAgICAgIC8vYmVjYXVzZSBJdCByZXR1bnMgYW5vdGhlciBkYXRhLlxuICAgICAgICAgICAgbGV0IHdyYXBwZWRGdW5jID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50c1tldmVudFN0cmluZ10oZXZlbnQsICR0ZW1wbGF0ZSwgdGhhdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmlld0V2ZW50c1tpZF0gPSB7bmFtZTogZXZlbnROYW1lLCB0YXJnZXQ6IHRhcmdldCwgY2FsbGJhY2s6IHdyYXBwZWRGdW5jfTtcblxuICAgICAgICAgICAgLy9zb21ldGltZXMgdGFyZ2V0IGlzIE5vZGVMaXN0XG4gICAgICAgICAgICBsZXQgbm9kZUxlbmd0aCA9ICR0YXJnZXQuZ2V0KCkubGVuZ3RoO1xuICAgICAgICAgICAgaWYobm9kZUxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgICAgIGxldCBub2RlTGlzdCA9ICR0YXJnZXQuZ2V0KCk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGVMZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgd3JhcHBlZEZ1bmMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0lFIE5vZGVMaXN0IGRvZXNuJ3QgaGF2ZSBmb3JFYWNoLiBJdCdzIHdhY2suXG4gICAgICAgICAgICAgICAgLyokdGFyZ2V0LmdldCgpLmZvckVhY2goZnVuY3Rpb24oJGl0ZW0pe1xuICAgICAgICAgICAgICAgICAgICAkaXRlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgd3JhcHBlZEZ1bmMpO1xuICAgICAgICAgICAgICAgIH0pOyovXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LmdldCgpLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB3cmFwcGVkRnVuYyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHZpZXdFdmVudHMpLmZvckVhY2goaWQgPT4ge1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gdmlld0V2ZW50c1tpZF07XG4gICAgICAgICAgICBsZXQgJHRhcmdldCA9IFwiXCI7XG5cbiAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldCA9PT0gXCJkb2N1bWVudFwiIHx8IGV2ZW50LnRhcmdldCA9PT0gXCJ3aW5kb3dcIil7XG4gICAgICAgICAgICAgICAgJHRhcmdldCA9IExBJChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHRhcmdldCA9ICR0ZW1wbGF0ZS5maW5kKGV2ZW50LnRhcmdldCkgfHwgKCR0ZW1wbGF0ZS5oYXNDbGFzcyhldmVudC50YXJnZXQucmVwbGFjZShcIi5cIixcIlwiKSkgPyAkdGVtcGxhdGUgOiBudWxsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9zb21ldGltZXMgdGFyZ2V0IGlzIE5vZGVMaXN0XG4gICAgICAgICAgICBsZXQgbm9kZUxlbmd0aCA9ICR0YXJnZXQuZ2V0KCkubGVuZ3RoO1xuICAgICAgICAgICAgaWYobm9kZUxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgICAgIGxldCBub2RlTGlzdCA9ICR0YXJnZXQuZ2V0KCk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGVMZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50Lm5hbWUsIGV2ZW50LmNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyokdGFyZ2V0LmdldCgpLmZvckVhY2goZnVuY3Rpb24oJGl0ZW0pe1xuICAgICAgICAgICAgICAgICAgICAkaXRlbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50Lm5hbWUsIGV2ZW50LmNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9KTsqL1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHRhcmdldC5nZXQoKS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50Lm5hbWUsIGV2ZW50LmNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsZXRlIHZpZXdFdmVudHNbaWRdO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZigkdGVtcGxhdGUpe1xuICAgICAgICAgICAgJHRlbXBsYXRlLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9uRGVzdHJveWVkKSB7XG4gICAgICAgICAgICBvbkRlc3Ryb3llZCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcblxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBPdmVuVGVtcGxhdGU7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMC4uXG4gKi9cbmltcG9ydCBUZXh0Vmlld1RlbXBsYXRlIGZyb20gJ3ZpZXcvZXhhbXBsZS9tYWluVGVtcGxhdGUnO1xuaW1wb3J0IFZpZXdUZW1wbGF0ZSBmcm9tICd2aWV3L3ZpZXdUZW1wbGF0ZSc7XG5pbXBvcnQgSGVscGVyVGVtcGxhdGUgZnJvbSAndmlldy9oZWxwZXIvbWFpblRlbXBsYXRlJztcbmltcG9ydCBCaWdCdXR0b25UZW1wbGF0ZSBmcm9tICd2aWV3L2hlbHBlci9iaWdCdXR0b25UZW1wbGF0ZSc7XG5pbXBvcnQgTWVzc2FnZUJveFRlbXBsYXRlIGZyb20gJ3ZpZXcvaGVscGVyL21lc3NhZ2VCb3hUZW1wbGF0ZSc7XG5pbXBvcnQgU3Bpbm5lclRlbXBsYXRlIGZyb20gJ3ZpZXcvaGVscGVyL3NwaW5uZXJUZW1wbGF0ZSc7XG5pbXBvcnQgQ29udGV4dFBhbmVsVGVtcGxhdGUgZnJvbSAndmlldy9oZWxwZXIvY29udGV4dFBhbmVsVGVtcGxhdGUnO1xuXG5pbXBvcnQgQ29udHJvbHNUZW1wbGF0ZSBmcm9tICd2aWV3L2NvbnRyb2xzL21haW5UZW1wbGF0ZSc7XG5pbXBvcnQgVm9sdW1lQnV0dG9uVGVtcGxhdGUgZnJvbSAndmlldy9jb250cm9scy92b2x1bWVCdXR0b25UZW1wbGF0ZSc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXJUZW1wbGF0ZSBmcm9tICd2aWV3L2NvbnRyb2xzL3Byb2dyZXNzQmFyVGVtcGxhdGUnO1xuaW1wb3J0IFBsYXlCdXR0b25UZW1wbGF0ZSBmcm9tICd2aWV3L2NvbnRyb2xzL3BsYXlCdXR0b25UZW1wbGF0ZSc7XG5pbXBvcnQgVGltZURpc3BsYXlUZW1wbGF0ZSBmcm9tICd2aWV3L2NvbnRyb2xzL3RpbWVEaXNwbGF5VGVtcGxhdGUnO1xuaW1wb3J0IEZ1bGxTY3JlZW5CdXR0b25UZW1wbGF0ZSBmcm9tICd2aWV3L2NvbnRyb2xzL2Z1bGxTY3JlZW5CdXR0b25UZW1wbGF0ZSc7XG5pbXBvcnQgU2V0dGluZ1BhbmVsVGVtcGxhdGUgZnJvbSAndmlldy9jb250cm9scy9zZXR0aW5nUGFuZWxUZW1wbGF0ZSc7XG5cbmNvbnN0IFRlbXBsYXRlcyA9IHtcbiAgICBUZXh0Vmlld1RlbXBsYXRlLFxuICAgIFZpZXdUZW1wbGF0ZSxcbiAgICBIZWxwZXJUZW1wbGF0ZSxcbiAgICBCaWdCdXR0b25UZW1wbGF0ZSxcbiAgICBNZXNzYWdlQm94VGVtcGxhdGUsXG4gICAgU3Bpbm5lclRlbXBsYXRlLFxuICAgIENvbnRleHRQYW5lbFRlbXBsYXRlLFxuXG4gICAgQ29udHJvbHNUZW1wbGF0ZSxcbiAgICBWb2x1bWVCdXR0b25UZW1wbGF0ZSxcbiAgICBQcm9ncmVzc0JhclRlbXBsYXRlLFxuICAgIFBsYXlCdXR0b25UZW1wbGF0ZSxcbiAgICBUaW1lRGlzcGxheVRlbXBsYXRlLFxuICAgIEZ1bGxTY3JlZW5CdXR0b25UZW1wbGF0ZSxcbiAgICBTZXR0aW5nUGFuZWxUZW1wbGF0ZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGVtcGxhdGVzOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDE5Li5cbiAqL1xuXG5jb25zdCBUZXh0Vmlld1RlbXBsYXRlID0gZnVuY3Rpb24odGV4dCl7XG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwidGV4dFZpZXdcIiBzdHlsZT1cInBhZGRpbmcgOiA1cHg7IGJhY2tncm91bmQ6IHJlZFwiPicgK1xuICAgICAgICAgICAgICAgICc8aDM+Jyt0ZXh0Kyc8L2gzPicgK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0blwiPuuLq+q4sDwvYnV0dG9uPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUZXh0Vmlld1RlbXBsYXRlOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI2Li5cbiAqL1xuY29uc3QgU2V0dGluZ1BhbmVsTGlzdCA9IFtdO1xuXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nUGFuZWxMaXN0OyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI0Li5cbiAqL1xuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xuaW1wb3J0IHtcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VEXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IEJpZ0J1dHRvbiA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSwgcGxheWVyU3RhdGUpe1xuXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjb250YWluZXIsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgIC8vRG8gbm90aGluZyFcbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy9EbyBub3RoaW5nIVxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICAvKlwiY2xpY2sgLm92cC1iaWdidXR0b24tY29udGFpbmVyXCIgOiBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSBhcGkuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IFNUQVRFX0lETEUgfHwgY3VycmVudFN0YXRlID09PSBTVEFURV9QQVVTRUQgfHwgY3VycmVudFN0YXRlID09PSBTVEFURV9DT01QTEVURSkge1xuICAgICAgICAgICAgICAgIGFwaS5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0qL1xuICAgIH07XG5cbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiQmlnQnV0dG9uXCIsIHBsYXllclN0YXRlLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCaWdCdXR0b247IiwiaW1wb3J0IHtcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfU1RBTExFRCxcbiAgICBTVEFURV9MT0FESU5HLFxuICAgIFNUQVRFX0NPTVBMRVRFLFxuICAgIFNUQVRFX1BBVVNFRCxcbiAgICBTVEFURV9FUlJPUlxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChwbGF5ZXJTdGF0ZSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWJpZ2J1dHRvbi1jb250YWluZXIgXCI+JyArICAgICAgLy9hbmltYXRlZCBib3VuY2VJblxuICAgICAgICAgICAgKHBsYXllclN0YXRlID09PSBTVEFURV9QTEFZSU5HID8gJzxpIGNsYXNzPVwib3ZwLWJpZ2J1dHRvbiBvdnAtYmlnYnV0dG9uLXBhdXNlXCI+PC9pPicgOiAnJykgK1xuICAgICAgICAgICAgKHBsYXllclN0YXRlID09PSBTVEFURV9QQVVTRUQgID8gJzxpIGNsYXNzPVwib3ZwLWJpZ2J1dHRvbiBvdnAtYmlnYnV0dG9uLXBsYXlcIj48L2k+JyA6ICcnKSArXG4gICAgICAgICAgICAocGxheWVyU3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFID8gJzxpIGNsYXNzPVwib3ZwLWJpZ2J1dHRvbiBvdnAtYmlnYnV0dG9uLXJlcGxheVwiPjwvaT4nIDogJycpICtcbiAgICAgICAgJzwvZGl2PidcbiAgICApO1xufTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAxLi5cbiAqL1xuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xuXG5jb25zdCBDb250ZXh0UGFuZWwgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGksIHBvc2l0aW9uKXtcbiAgICBjb25zdCAkcm9vdCA9IExBJChcIiNcIithcGkuZ2V0Q29udGFpbmVySWQoKSk7XG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgY29uc3QgcGFuZWxXaWR0aCA9ICRjdXJyZW50LndpZHRoKCk7XG4gICAgICAgIGNvbnN0IHBhbmVsSGVpZ2h0ID0gJGN1cnJlbnQuaGVpZ2h0KCk7XG5cbiAgICAgICAgY29uc3QgeCA9IE1hdGgubWluKHBvc2l0aW9uLnBhZ2VYIC0gJHJvb3Qub2Zmc2V0KCkubGVmdCwgJHJvb3Qud2lkdGgoKSAtIHBhbmVsV2lkdGgpO1xuICAgICAgICBjb25zdCB5ID0gTWF0aC5taW4ocG9zaXRpb24ucGFnZVkgLSAkcm9vdC5vZmZzZXQoKS50b3AsICRyb290LmhlaWdodCgpIC0gcGFuZWxIZWlnaHQpO1xuXG4gICAgICAgICRjdXJyZW50LmNzcyhcImxlZnRcIiAsIHggKyBcInB4XCIpO1xuICAgICAgICAkY3VycmVudC5jc3MoXCJ0b3BcIiAsIHkgKyBcInB4XCIpO1xuICAgIH07XG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAvL0RvIG5vdGhpbmcuXG4gICAgfTtcbiAgICBjb25zdCBldmVudHMgPSB7XG4gICAgICAgIFwiY2xpY2sgLm92cC1jb250ZXh0LWl0ZW1cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgd2luZG93Lm9wZW4oXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9BaXJlblNvZnQvT3ZlblBsYXllcicsXG4gICAgICAgICAgICAgICAgJ19ibGFuaydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIkNvbnRleHRQYW5lbFwiLCBwb3NpdGlvbiwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250ZXh0UGFuZWw7XG4iLCJpbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWNvbnRleHQtcGFuZWwgYW5pbWF0ZWQgZmFkZUluXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1jb250ZXh0LWl0ZW1cIiB0YWJpbmRleD1cIjBcIj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtY29udGV4dC1pdGVtLXRleHRcIj5IZWxwPC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1jb250ZXh0LWl0ZW1cIiB0YWJpbmRleD1cIjFcIj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtY29udGV4dC1pdGVtLXRleHRcIj5BYm91dCBPdmVuUGxheWVyICcrdmVyc2lvbisnPC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjQuLlxuICovXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XG5pbXBvcnQgQmlnQnV0dG9uIGZyb20gJ3ZpZXcvaGVscGVyL2JpZ0J1dHRvbic7XG5pbXBvcnQgTWVzc2FnZUJveCBmcm9tICd2aWV3L2hlbHBlci9tZXNzYWdlQm94JztcbmltcG9ydCBTcGlubmVyIGZyb20gJ3ZpZXcvaGVscGVyL3NwaW5uZXInO1xuXG5pbXBvcnQge1xuICAgIFJFQURZLFxuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBORVRXT1JLX1VOU1RBQkxFRFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBIZWxwZXIgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xuICAgIGxldCBiaWdCdXR0b24gPSBcIlwiLCBtZXNzYWdlQm94ID0gXCJcIiwgc3Bpbm5lciA9IFwiXCI7XG5cblxuXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgIGxldCBjcmVhdGVCaWdCdXR0b24gPSBmdW5jdGlvbihzdGF0ZSl7XG4gICAgICAgICAgICBpZihiaWdCdXR0b24pe1xuICAgICAgICAgICAgICAgIGJpZ0J1dHRvbi5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiaWdCdXR0b24gPSBCaWdCdXR0b24oJGN1cnJlbnQsIGFwaSwgc3RhdGUpO1xuICAgICAgICB9O1xuICAgICAgICBsZXQgY3JlYXRlTWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHdpdGhUaW1lcil7XG4gICAgICAgICAgICBpZihtZXNzYWdlQm94KXtcbiAgICAgICAgICAgICAgICBtZXNzYWdlQm94LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1lc3NhZ2VCb3ggPSBNZXNzYWdlQm94KCRjdXJyZW50LCBhcGksIG1lc3NhZ2UsIHdpdGhUaW1lcik7XG4gICAgICAgIH07XG4gICAgICAgIHNwaW5uZXIgPSBTcGlubmVyKCRjdXJyZW50LCBhcGkpO1xuXG4gICAgICAgIGFwaS5vbihSRUFEWSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVCaWdCdXR0b24oU1RBVEVfUEFVU0VEKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFwaS5vbihQTEFZRVJfU1RBVEUsIGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLm5ld3N0YXRlKXtcbiAgICAgICAgICAgICAgICBpZihkYXRhLm5ld3N0YXRlID09PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgICAgICAgICAgYmlnQnV0dG9uLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgc3Bpbm5lci5zaG93KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQmlnQnV0dG9uKGRhdGEubmV3c3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLm5ld3N0YXRlID09PSBTVEFURV9TVEFMTEVEIHx8IGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX0xPQURJTkcgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwaW5uZXIuc2hvdyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGlubmVyLnNob3coZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYXBpLm9uKEVSUk9SLCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcblxuICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09IDEwMCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnSW5pdGlhbGl6YXRpb24gZmFpbGVkLic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLmNvZGUgPT09IDMwMSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnTWVkaWEgcGxheWJhY2sgd2FzIGNhbmNlbGVkLic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLmNvZGUgPT09IDMwMikge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnU29tZSBvZiB0aGUgbWVkaWEgY291bGQgbm90IGJlIGRvd25sb2FkZWQgZHVlIHRvIGEgbmV0d29yayBlcnJvci4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5jb2RlID09PSAzMDMpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1VuYWJsZSB0byBsb2FkIG1lZGlhLiBUaGlzIG1heSBiZSBkdWUgdG8gYSBzZXJ2ZXIgb3IgbmV0d29yayBlcnJvciwgb3IgZHVlIHRvIGFuIHVuc3VwcG9ydGVkIGZvcm1hdC4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5jb2RlID09PSAzMDQpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ01lZGlhIHBsYXliYWNrIGhhcyBiZWVuIGNhbmNlbGVkLiBJdCBsb29rcyBsaWtlIHlvdXIgbWVkaWEgaXMgY29ycnVwdGVkIG9yIHlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBmZWF0dXJlcyB5b3VyIG1lZGlhIHVzZXMuJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoZXJyb3IuY29kZS8xMDApID09PSA1KSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3kgc2VydmVyIGZhaWxlZC4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ0NhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNyZWF0ZU1lc3NhZ2UobWVzc2FnZSwgbnVsbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFwaS5vbihORVRXT1JLX1VOU1RBQkxFRCwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnQmVjYXVzZSB0aGUgbmV0d29yayBjb25uZWN0aW9uIGlzIHVuc3RhYmxlLCB0aGUgZm9sbG93aW5nIG1lZGlhIHNvdXJjZSB3aWxsIGJlIHBsYXllZC4nO1xuXG4gICAgICAgICAgICBpZihhcGkuZ2V0Q3VycmVudFF1YWxpdHkoKS5pbmRleCsxID09PSAgYXBpLmdldFF1YWxpdHlMZXZlbHMoKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnTmV0d29yayBjb25uZWN0aW9uIGlzIHVuc3RhYmxlLiBDaGVjayB0aGUgbmV0d29yayBjb25uZWN0aW9uLic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNyZWF0ZU1lc3NhZ2UobWVzc2FnZSwgNTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vRG8gbm90aGluZy5cbiAgICB9O1xuICAgIGNvbnN0IGV2ZW50cyA9IHtcblxuICAgIH07XG5cbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiSGVscGVyXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhlbHBlcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDE5Li5cbiAqL1xuXG5jb25zdCBIZWxwZXJUZW1wbGF0ZSA9IGZ1bmN0aW9uKHRleHQpe1xuICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIm92cC1oZWxwZXJzLWNvbnRhaW5lclwiPjwvZGl2Pic7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIZWxwZXJUZW1wbGF0ZTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI0Li5cbiAqL1xuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xuaW1wb3J0IHtcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VEXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IE1lc3NhZ2VCb3ggPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGksIG1lc3NhZ2UsIHdpdGhUaW1lcil7XG5cbiAgICBsZXQgYXV0b0Rlc3Ryb3lUaW1lciA9IFwiXCI7XG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgaWYod2l0aFRpbWVyKXtcbiAgICAgICAgICAgIGF1dG9EZXN0cm95VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfSwgd2l0aFRpbWVyfHw1MDAwKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICBcImNsaWNrIC5vdnAtbWVzc2FnZS10ZXh0XCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmKGF1dG9EZXN0cm95VGltZXIpe1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChhdXRvRGVzdHJveVRpbWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXBsYXRlLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiTWVzc2FnZUJveFwiLCBtZXNzYWdlLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VCb3g7IiwiZXhwb3J0IGRlZmF1bHQgKG1lc3NhZ2UpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1tZXNzYWdlLWJveCBhbmltYXRlZCBzaGFrZVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtbWVzc2FnZS1jb250YWluZXJcIj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtbWVzc2FnZS10ZXh0XCI+JyttZXNzYWdlKyc8L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjUuLlxuICovXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XG5cbmNvbnN0IFNwaW5uZXIgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xuICAgIGxldCAkc3Bpbm5lciA9IFwiXCI7XG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgJHNwaW5uZXIgPSAkY3VycmVudDtcbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy9EbyBub3RoaW5nLlxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJTcGlubmVyXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKSwge1xuICAgICAgICBzaG93OiBmdW5jdGlvbiAoaXNTaG93KSB7XG4gICAgICAgICAgICBpZihpc1Nob3cpe1xuICAgICAgICAgICAgICAgICRzcGlubmVyLnNob3coKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzcGlubmVyLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBTcGlubmVyOyIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJvdnAtc3Bpbm5lci1jb250YWluZXJcIj48ZGl2IGNsYXNzPVwib3ZwLXNwaW5uZXJcIj48ZGl2IGNsYXNzPVwiYm91bmNlMVwiPjwvZGl2PjxkaXYgY2xhc3M9XCJib3VuY2UyXCI+PC9kaXY+PGRpdiBjbGFzcz1cImJvdW5jZTNcIj48L2Rpdj48L2Rpdj48L2Rpdj4nO1xufTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIwLi5cbiAqL1xuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xuaW1wb3J0IEhlbHBlciBmcm9tICd2aWV3L2hlbHBlci9tYWluJztcbmltcG9ydCBDb250cm9scyBmcm9tICd2aWV3L2NvbnRyb2xzL21haW4nO1xuaW1wb3J0IFNldHRpbmdQYW5lbExpc3QgZnJvbSAndmlldy9nbG9iYWwvU2V0dGluZ1BhbmVsTGlzdCc7XG5pbXBvcnQgQ29udGV4dFBhbmVsIGZyb20gJ3ZpZXcvaGVscGVyL2NvbnRleHRQYW5lbCc7XG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcbmltcG9ydCB7XG4gICAgUkVBRFksXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBFUlJPUlxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5yZXF1aXJlKCcuLi8uLi9jc3Mvb3ZlbnBsYXllci5sZXNzJyk7XG5cbmNvbnN0IFZpZXcgPSBmdW5jdGlvbigkY29udGFpbmVyKXtcbiAgICBsZXQgY29udHJvbHMgPSBcIlwiLCBoZWxwZXIgPSBcIlwiLCAkcGxheWVyUm9vdCwgY29udGV4dFBhbmVsID0gXCJcIiwgYXBpID0gXCJcIiwgYXV0b0hpZGVUaW1lciA9IFwiXCI7XG5cbiAgICBsZXQgc2V0SGlkZSA9IGZ1bmN0aW9uIChoaWRlLCBhdXRvSGlkZSkge1xuXG4gICAgICAgIGlmIChhdXRvSGlkZVRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoYXV0b0hpZGVUaW1lcik7XG4gICAgICAgICAgICBhdXRvSGlkZVRpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoaWRlKSB7XG4gICAgICAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRwbGF5ZXJSb290LmFkZENsYXNzKFwib3ZwLWF1dG9oaWRlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHBsYXllclJvb3QucmVtb3ZlQ2xhc3MoXCJvdnAtYXV0b2hpZGVcIik7XG5cbiAgICAgICAgICAgIGlmIChhdXRvSGlkZSkge1xuICAgICAgICAgICAgICAgIGF1dG9IaWRlVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICRwbGF5ZXJSb290LmFkZENsYXNzKFwib3ZwLWF1dG9oaWRlXCIpO1xuICAgICAgICAgICAgICAgIH0sIDE4MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBsZXQgdG9nZ2xlUGxheVBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSBhcGkuZ2V0U3RhdGUoKTtcblxuICAgICAgICBpZiAoY3VycmVudFN0YXRlID09PSBTVEFURV9JRExFIHx8IGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfUEFVU0VEIHx8IGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfQ09NUExFVEUpIHtcbiAgICAgICAgICAgIGFwaS5wbGF5KCk7XG4gICAgICAgIH1lbHNlIGlmKGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBhcGkucGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbGV0IHNlZWsgPSBmdW5jdGlvbiAoc2Vjb25kcywgaXNSZXdpbmQpIHtcblxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IGFwaS5nZXREdXJhdGlvbigpO1xuICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSBhcGkuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gMDtcblxuICAgICAgICBpZihpc1Jld2luZCl7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IE1hdGgubWF4KGN1cnJlbnRQb3NpdGlvbiAtIHNlY29uZHMsIDApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gTWF0aC5taW4oY3VycmVudFBvc2l0aW9uICsgc2Vjb25kcywgZHVyYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBpLnNlZWsocG9zaXRpb24pO1xuICAgIH07XG4gICAgbGV0IHZvbHVtZSA9IGZ1bmN0aW9uKGlzVXApe1xuICAgICAgICBjb25zdCBjdXJyZW50Vm9sdW1uID0gYXBpLmdldFZvbHVtZSgpO1xuICAgICAgICBsZXQgbmV3Vm9sdW1lID0gMDtcbiAgICAgICAgaWYoaXNVcCl7XG4gICAgICAgICAgICBuZXdWb2x1bWUgPSAgTWF0aC5taW4oY3VycmVudFZvbHVtbiArIDUsIDEwMCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbmV3Vm9sdW1lID0gTWF0aC5tYXgoY3VycmVudFZvbHVtbiAtIDUsIDApO1xuICAgICAgICB9XG4gICAgICAgIGFwaS5zZXRWb2x1bWUobmV3Vm9sdW1lKTtcbiAgICB9O1xuICAgIGxldCBjcmVhdGVDb250ZXh0UGFuZWwgPSBmdW5jdGlvbihwYWdlWCwgcGFnZVkpe1xuICAgICAgICBpZihjb250ZXh0UGFuZWwpe1xuICAgICAgICAgICAgY29udGV4dFBhbmVsLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGNvbnRleHRQYW5lbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dFBhbmVsID0gQ29udGV4dFBhbmVsKCRwbGF5ZXJSb290LCBhcGksIHtwYWdlWCA6IHBhZ2VYLCBwYWdlWSA6IHBhZ2VZfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAkcGxheWVyUm9vdCA9ICRjdXJyZW50O1xuICAgIH07XG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAvL0RvIG5vdGhpbmcuXG4gICAgfTtcbiAgICBjb25zdCBldmVudHMgPSB7XG4gICAgICAgIFwiY2xpY2sgLm92ZW5wbGF5ZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYoY29udGV4dFBhbmVsKXtcbiAgICAgICAgICAgICAgICBjb250ZXh0UGFuZWwuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHRQYW5lbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIUxBJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIub3ZwLWJvdHRvbS1wYW5lbFwiKSAmJlxuICAgICAgICAgICAgICAgICFMQSQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFwiLm92cC1zZXR0aW5nLXBhbmVsXCIpKXtcbiAgICAgICAgICAgICAgICB0b2dnbGVQbGF5UGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCFMQSQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFwiLm92cC1zZXR0aW5nLXBhbmVsXCIpICYmICFMQSQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFwiLm92cC1zZXR0aW5nLWJ1dHRvblwiKSAmJiBTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIC8vY2xlYXIgYWxsIFNldHRpbmdQYW5lbFRlbXBsYXRlXG4gICAgICAgICAgICAgICAgXy5lYWNoKFNldHRpbmdQYW5lbExpc3QsIGZ1bmN0aW9uKHNldHRpbmdQYW5lbCl7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdQYW5lbC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgU2V0dGluZ1BhbmVsTGlzdC5zcGxpY2UoMCwgU2V0dGluZ1BhbmVsTGlzdC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1vdXNlZW50ZXIgLm92ZW5wbGF5ZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKGFwaS5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XG4gICAgICAgICAgICAgICAgc2V0SGlkZShmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldEhpZGUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1vdXNlbW92ZSAub3ZlbnBsYXllclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoYXBpLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgICAgICBzZXRIaWRlKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0SGlkZShmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2VsZWF2ZSAub3ZlbnBsYXllclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZihhcGkuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICAgICAgc2V0SGlkZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcImtleWRvd24gLm92ZW5wbGF5ZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpe1xuICAgICAgICAgICAgICAgIGNhc2UgMzIgOiAgIC8vc2FwY2VcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUGxheVBhdXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzcgOiAvL2Fycm93IGxlZnRcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgc2Vlayg1LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOSA6IC8vYXJyb3cgcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgc2Vlayg1LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzggOiAvL2Fycm93IHVwXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHZvbHVtZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0MCA6IC8vYXJyb3cgdXBcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdm9sdW1lKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGV4dG1lbnUgLm92ZW5wbGF5ZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRleHRQYW5lbChldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiVmlld1wiLCAkY29udGFpbmVyLmlkLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkLCB0cnVlKSwge1xuICAgICAgICBnZXRNZWRpYUVsZW1lbnRDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkcGxheWVyUm9vdC5maW5kKFwiLm92cC1tZWRpYS1lbGVtZW50LWNvbnRhaW5lclwiKS5nZXQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0QXBpOiBmdW5jdGlvbiAocGxheWVySW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGFwaSA9IHBsYXllckluc3RhbmNlO1xuICAgICAgICAgICAgaGVscGVyID0gSGVscGVyKCRwbGF5ZXJSb290LmZpbmQoXCIub3ZwLXVpXCIpLCBwbGF5ZXJJbnN0YW5jZSk7XG4gICAgICAgICAgICBjb250cm9scyA9IENvbnRyb2xzKCRwbGF5ZXJSb290LmZpbmQoXCIub3ZwLXVpXCIpLCBwbGF5ZXJJbnN0YW5jZSk7XG5cblxuICAgICAgICAgICAgYXBpLm9uKFBMQVlFUl9TVEFURSwgZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLm5ld3N0YXRlKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5uZXdzdGF0ZSA9PT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRIaWRlKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRIaWRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgVmlldztcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIwLi5cbiAqL1xuXG5jb25zdCBWaWV3VGVtcGxhdGUgPSBmdW5jdGlvbihpZCl7XG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwib3ZlbnBsYXllciBvdnAtd3JhcHBlclwiIHRhYmluZGV4PVwiLTFcIiBhcmlhLWxhYmVsPVwiXCIgaWQ9XCInK2lkKydcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1yYXRpb1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXBsYXllclwiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1tZWRpYS1lbGVtZW50LWNvbnRhaW5lclwiIGRhdGEtcGFyZW50LWlkPVwiJytpZCsnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdWlcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nXG59O1xuZXhwb3J0IGRlZmF1bHQgVmlld1RlbXBsYXRlO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==