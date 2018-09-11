/*! OvenPlayerv0.7.5 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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


exports.__esModule = true;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */

var Api = function Api(container) {
    var logManager = (0, _logger2["default"])();
    var that = {};
    (0, _EventEmitter2["default"])(that);

    OvenPlayerConsole.log("[[OvenPlayer]] v." + _version.version);
    OvenPlayerConsole.log("API loaded.");
    //let captionManager = CaptionManager(that);

    var playlistManager = (0, _Manager2["default"])();
    var providerController = (0, _Controller2["default"])();
    var currentProvider = "";
    var playerConfig = "";
    var lazyQueue = "";

    var initProvider = function initProvider(lastPlayPosition) {
        var pickQualityFromSource = function pickQualityFromSource(sources) {
            var quality = 0;
            if (sources) {
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]["default"]) {
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
                //data.code === PLAYER_FILE_ERROR
                if (name === _constants.ERROR && (parseInt(data.code / 100) === 3 || parseInt(data.code / 100) === 5) || name === _constants.NETWORK_UNSTABLED) {
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
        })["catch"](function (error) {
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
        lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['load', 'play', 'pause', 'seek', 'stop', 'getDuration', 'getPosition', 'getVolume', 'getMute', 'getBuffer', 'getState']);
        playerConfig = (0, _Configurator2["default"])(options);
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
        lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['play', 'seek', 'stop']);

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
            lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['play']);
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
        if (currentProvider) {
            currentProvider.destroy();
            currentProvider = null;
        }
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

exports["default"] = Api;

/***/ }),

/***/ "./src/js/api/ApiExpansions.js":
/*!*************************************!*\
  !*** ./src/js/api/ApiExpansions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
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


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
                return _underscore2['default'].isNumber(rate) && rate >= 0.25 && rate <= 4;
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
            var obj = _underscore2['default'].pick(config, ['title', 'description', 'type', 'mediaid', 'image', 'file', 'sources', 'tracks', 'preload', 'duration', 'host', 'application', 'stream']);

            config.playlist = [obj];
        } else if (_underscore2['default'].isArray(configPlaylist.playlist)) {
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
        if (_underscore2['default'].isArray(playlist_)) {
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

exports['default'] = Configurator;

/***/ }),

/***/ "./src/js/api/EventEmitter.js":
/*!************************************!*\
  !*** ./src/js/api/EventEmitter.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
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

exports["default"] = EventEmitter;

/***/ }),

/***/ "./src/js/api/LazyCommandExecutor.js":
/*!*******************************************!*\
  !*** ./src/js/api/LazyCommandExecutor.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
        var commandQueueItem = _underscore2["default"].findWhere(commandQueue, { command: command_ });
        OvenPlayerConsole.log("LazyCommandExecutor : removeAndExcuteOnce()", command_);
        commandQueue.splice(_underscore2["default"].findIndex(commandQueue, { command: command_ }), 1);

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

exports["default"] = LazyCommandExecutor;

/***/ }),

/***/ "./src/js/api/SupportChecker.js":
/*!**************************************!*\
  !*** ./src/js/api/SupportChecker.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

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

exports["default"] = SupportChecker;

/***/ }),

/***/ "./src/js/api/constants.js":
/*!*********************************!*\
  !*** ./src/js/api/constants.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
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


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

var _strings = __webpack_require__(/*! ../../utils/strings */ "./src/js/utils/strings.js");

var _SupportChecker = __webpack_require__(/*! ../SupportChecker */ "./src/js/api/SupportChecker.js");

var _SupportChecker2 = _interopRequireDefault(_SupportChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This manages Playlist or Sources.
 * @param
 *
 * */
var Manager = function Manager() {
    var that = {};
    var currentPlaylist = [];
    var supportChecker = (0, _SupportChecker2["default"])();

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
        var prettiedPlaylist = (_underscore2["default"].isArray(playlist) ? playlist : [playlist]).map(function (item) {
            if (!_underscore2["default"].isArray(item.tracks)) {
                delete item.tracks;
            }
            var playlistItem = _extends({}, {
                sources: [],
                tracks: []
            }, item);

            if (playlistItem.sources === Object(playlistItem.sources) && !_underscore2["default"].isArray(playlistItem.sources)) {
                playlistItem.sources = [makePrettySource(playlistItem.sources)];
            }

            if (!_underscore2["default"].isArray(playlistItem.sources) || playlistItem.sources.length === 0) {
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

                var defaultSource = source["default"];
                if (defaultSource) {
                    source["default"] = defaultSource.toString() === 'true';
                } else {
                    source["default"] = false;
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

            if (!_underscore2["default"].isArray(playlistItem.tracks)) {
                playlistItem.tracks = [];
            }
            if (_underscore2["default"].isArray(playlistItem.captions)) {
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

exports["default"] = Manager;

/***/ }),

/***/ "./src/js/api/provider/Controller.js":
/*!*******************************************!*\
  !*** ./src/js/api/provider/Controller.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _SupportChecker = __webpack_require__(/*! api/SupportChecker */ "./src/js/api/SupportChecker.js");

var _SupportChecker2 = _interopRequireDefault(_SupportChecker);

var _promise = __webpack_require__(/*! api/shims/promise */ "./src/js/api/shims/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _ApiExpansions = __webpack_require__(/*! api/ApiExpansions */ "./src/js/api/ApiExpansions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This manages provider.
 * @param
 * */
var Controller = function Controller() {
    var supportChacker = (0, _SupportChecker2["default"])();
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
                var provider = __webpack_require__(/*! api/provider/html5/Html5 */ "./src/js/api/provider/html5/Html5.js")["default"];
                registeProvider("html5", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        webrtc: function webrtc() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.WebRTCProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.WebRTCProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/WebRTC */ "./src/js/api/provider/html5/WebRTC.js")["default"];
                registeProvider("webrtc", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        dash: function dash() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.DashProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.DashProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/Dash */ "./src/js/api/provider/html5/Dash.js")["default"];
                registeProvider("dash", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        hls: function hls() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.HlsProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.HlsProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/Hls */ "./src/js/api/provider/html5/Hls.js")["default"];
                registeProvider("hls", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        rtmp: function rtmp() {
            return __webpack_require__.e(/*! require.ensure | ovenplayer.provider.RtmpProvider */ "ovenplayer.provider.RtmpProvider").then((function (require) {
                var provider = __webpack_require__(/*! api/provider/flash/Rtmp */ "./src/js/api/provider/flash/Rtmp.js")["default"];
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
        return _promise2["default"].all(supportedProviderNames.filter(function (providerName) {
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

exports["default"] = Controller;

/***/ }),

/***/ "./src/js/api/shims/promise.js":
/*!*************************************!*\
  !*** ./src/js/api/shims/promise.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

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
    setTimeoutFunc(fn, 0);
};

PromiseShim._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
        console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
};

var Promise = window.Promise || (window.Promise = PromiseShim);

var resolved = exports.resolved = Promise.resolve();

exports['default'] = Promise;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

__webpack_require__.p = (0, _webpack.getScriptPath)('ovenplayer.js');

var OvenPlayer = {};
window.OvenPlayer = OvenPlayer;

/**
 * Copy properties from OvenPlayerSDK object to OvenPlayer object
 */
_extends(OvenPlayer, _ovenplayer2['default']);

OvenPlayer.create = function (container, options) {
    var browserName = (0, _browser.getBrowser)();
    if (browserName === "ie") {}
    var containerElement = (0, _ovenplayer.checkAndGetContainerElement)(container);

    var player = (0, _view2['default'])(containerElement);

    var playerInstance = _ovenplayer2['default'].create(player.getMediaElementContainer(), options);

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


exports.__esModule = true;
exports.checkAndGetContainerElement = undefined;

var _Api = __webpack_require__(/*! api/Api */ "./src/js/api/Api.js");

var _Api2 = _interopRequireDefault(_Api);

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _webpack = __webpack_require__(/*! utils/webpack */ "./src/js/utils/webpack.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

    var playerInstance = (0, _Api2['default'])(containerElement);
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
    return (_underscore2['default'].isArray(sources) ? sources : [sources]).map(function (source, index) {
        if (source.host && (0, _validator.isWebRTC)(source.host) && source.application && source.stream) {
            return { file: source.host + "/" + source.application + "/" + source.stream, type: "webrtc", label: source.label ? source.label : "webrtc-" + (index + 1) };
        }
    });
};

exports['default'] = OvenPlayerSDK;

/***/ }),

/***/ "./src/js/utils/browser.js":
/*!*********************************!*\
  !*** ./src/js/utils/browser.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
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
        var msie = navigator.userAgent.indexOf("MSIE");
        /*if(!!document.documentMode == true ){
            return 'ie';
        }else if(!!navigator.userAgent.match(/Trident.*rv\:11\./)){
            if (!isNaN(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))))) {
                return 'ie';
            }else{
                return 'unknown';
            }
        }else{
            return 'unknown';
        }*/
        var ie = function () {

            var undef,
                v = 3,
                div = document.createElement('div'),
                all = div.getElementsByTagName('i');

            while (div.innerHTML = '<!--[if gt IE ' + ++v + ']><i></i><![endif]-->', all[0]) {}

            return v > 4 ? v : undef;
        }();
        if (ie < 9) {
            return 'oldIE';
        } else {
            return 'modernIE';
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


exports.__esModule = true;

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

    if (_underscore2["default"].every(selectorOrElement, function (item) {
        return _underscore2["default"].isElement(item);
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
exports["default"] = La$;

/***/ }),

/***/ "./src/js/utils/logger.js":
/*!********************************!*\
  !*** ./src/js/utils/logger.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
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

exports['default'] = logger;

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


exports.__esModule = true;
exports.extractExtension = undefined;
exports.trim = trim;
exports.naturalHms = naturalHms;

var _underscore = __webpack_require__(/*! ./underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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


exports.__esModule = true;
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


exports.__esModule = true;
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


exports.__esModule = true;
/**
 * Created by hoho on 2018. 6. 29..
 */
var version = exports.version = '0.7.5-localbuild';

/***/ }),

/***/ "./src/js/view/controls/fullScreenButton.js":
/*!**************************************************!*\
  !*** ./src/js/view/controls/fullScreenButton.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Created by hoho on 2018. 7. 26..
 */
var FullScreenButton = function FullScreenButton($container, api) {
    var $root = (0, _likeA$2['default'])("#" + api.getContainerId());
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

    return (0, _OvenTemplate2['default'])($container, "FullScreenButton", null, events, onRendered, onDestroyed);
};

exports['default'] = FullScreenButton;

/***/ }),

/***/ "./src/js/view/controls/fullScreenButtonTemplate.js":
/*!**********************************************************!*\
  !*** ./src/js/view/controls/fullScreenButtonTemplate.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function () {
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


exports.__esModule = true;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
            timeDisplay = (0, _timeDisplay2['default'])($current.find(".ovp-left-controls"), api, data);
        };
        var initProgressBar = function initProgressBar() {
            if (progressBar) {
                progressBar.destroy();
            }
            progressBar = (0, _progressBar2['default'])($current.find(".ovp-progressbar-container"), api);
        };

        playButton = (0, _playButton2['default'])($current.find(".ovp-left-controls"), api);
        volumeButton = (0, _volumeButton2['default'])($current.find(".ovp-left-controls"), api);
        fullScreenButton = (0, _fullScreenButton2['default'])($current.find(".ovp-right-controls"), api);

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
            if (_SettingPanelList2['default'].length > 0) {
                //clear all SettingPanelTemplate
                _underscore2['default'].each(_SettingPanelList2['default'], function (settingPanel) {
                    settingPanel.destroy();
                });
                _SettingPanelList2['default'].splice(0, _SettingPanelList2['default'].length);
            } else {
                _SettingPanelList2['default'].push((0, _settingPanel2['default'])($current, api, generateMainPanelData()));
            }
        }
    };

    return (0, _OvenTemplate2['default'])($container, "Controls", null, events, onRendered, onDestroyed);
};

exports['default'] = Controls;

/***/ }),

/***/ "./src/js/view/controls/mainTemplate.js":
/*!**********************************************!*\
  !*** ./src/js/view/controls/mainTemplate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var Controls = function Controls() {
     return '<div class="ovp-controls-container">' + '<div class="ovp-gradient-bottom"></div>' + '<div class="ovp-bottom-panel">' + '    <div class="ovp-progressbar-container">' + '    </div>' + '    <div class="ovp-controls">' + '        <div class="ovp-left-controls">' + '        </div>' + '        <div class="ovp-right-controls">' + '               <button class="ovp-button ovp-setting-button"><i class="ovp-setting-button-icon"></i></button>' + '        </div>' + '    </div>' + '</div>';
     '</div>';
};

exports['default'] = Controls;

/***/ }),

/***/ "./src/js/view/controls/playButton.js":
/*!********************************************!*\
  !*** ./src/js/view/controls/playButton.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

    return (0, _OvenTemplate2["default"])($container, "PlayButton", null, events, onRendered, onDestroyed);
};

exports["default"] = PlayButton;

/***/ }),

/***/ "./src/js/view/controls/playButtonTemplate.js":
/*!****************************************************!*\
  !*** ./src/js/view/controls/playButtonTemplate.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function () {
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


exports.__esModule = true;

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _SettingPanelList = __webpack_require__(/*! view/global/SettingPanelList */ "./src/js/view/global/SettingPanelList.js");

var _SettingPanelList2 = _interopRequireDefault(_SettingPanelList);

var _strings = __webpack_require__(/*! utils/strings */ "./src/js/utils/strings.js");

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ProgressBar = function ProgressBar($container, api) {
    var $root = (0, _likeA$2['default'])("#" + api.getContainerId());
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
        if (_SettingPanelList2['default'].length > 0) {
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

    return (0, _OvenTemplate2['default'])($container, "ProgressBar", null, events, onRendered, onDestroyed);
}; /**
    * Created by hoho on 2018. 7. 24..
    */
exports['default'] = ProgressBar;

/***/ }),

/***/ "./src/js/view/controls/progressBarTemplate.js":
/*!*****************************************************!*\
  !*** ./src/js/view/controls/progressBarTemplate.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function () {
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


exports.__esModule = true;

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _SettingPanelList = __webpack_require__(/*! view/global/SettingPanelList */ "./src/js/view/global/SettingPanelList.js");

var _SettingPanelList2 = _interopRequireDefault(_SettingPanelList);

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Created by hoho on 2018. 7. 26..
 */
var PLAYER_MIN_HEIGHT = 220;
var SettingPanel = function SettingPanel($container, api, data) {
    var $root = (0, _likeA$2['default'])("#" + api.getContainerId());

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
            var panelType = (0, _likeA$2['default'])(event.currentTarget).attr("ovp-panel-type");
            //parent must be not $current!
            _SettingPanelList2['default'].push(SettingPanel($container, api, extractPanelData(panelType)));
        },
        "click .ovp-setting-title": function clickOvpSettingTitle(event, $current, template) {
            event.preventDefault();

            //Remove Current Panel
            var last = _SettingPanelList2['default'].pop();
            last.destroy();
        },
        "click .ovp-setting-item-value": function clickOvpSettingItemValue(event, $current, template) {
            event.preventDefault();

            var panelType = (0, _likeA$2['default'])(event.currentTarget).attr("ovp-panel-type");
            var value = (0, _likeA$2['default'])(event.currentTarget).attr("ovp-data-value");

            if (panelType && value) {
                if (panelType === "playbackrate") {
                    api.setPlaybackRate(parseFloat(value));
                } else if (panelType === "qualitylevel") {
                    api.setCurrentQuality(parseInt(value));
                }

                //clear all SettingPanelTemplate
                _underscore2['default'].each(_SettingPanelList2['default'], function (settingPanel) {
                    settingPanel.destroy();
                });
                _SettingPanelList2['default'].splice(0, _SettingPanelList2['default'].length);
            }
        }
    };

    return (0, _OvenTemplate2['default'])($container, "SettingPanel", data, events, onRendered, onDestroyed);
};

exports['default'] = SettingPanel;

/***/ }),

/***/ "./src/js/view/controls/settingPanelTemplate.js":
/*!******************************************************!*\
  !*** ./src/js/view/controls/settingPanelTemplate.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.settingValueTemplate = exports.settingItemTemplate = undefined;

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (data) {
    var elements = '<div class="ovp-setting-panel ' + (data.isMain ? 'animated fadeIn' : '') + '">' + '<div class="ovp-setting-title-container">' + '<div class="ovp-setting-title" tabindex="0">' + (data.isMain ? '' : '<span class="ovp-setting-title-previcon">&lt;</span>') + '<span class="ovp-setting-title-title">' + data.title + '</span>' + '</div>' + '</div>' + '<div class="ovp-setting-item-container">';
    _underscore2['default'].forEach(data.body, function (body) {
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


exports.__esModule = true;

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _strings = __webpack_require__(/*! utils/strings */ "./src/js/utils/strings.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

    return (0, _OvenTemplate2['default'])($container, "TimeDisplay", data, events, onRendered, onDestroyed);
};

exports['default'] = TimeDisplay;

/***/ }),

/***/ "./src/js/view/controls/timeDisplayTemplate.js":
/*!*****************************************************!*\
  !*** ./src/js/view/controls/timeDisplayTemplate.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (data) {
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


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by hoho on 2018. 7. 20..
                                                                                                                                                                                                                                                                   */


var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

    return _extends((0, _OvenTemplate2["default"])($container, "VolumeButton", null, events, onRendered, onDestroyed), {
        setMouseDown: function setMouseDown(state) {
            mouseDown = state;
        }
    });
};

exports["default"] = VolumeButton;

/***/ }),

/***/ "./src/js/view/controls/volumeButtonTemplate.js":
/*!******************************************************!*\
  !*** ./src/js/view/controls/volumeButtonTemplate.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

/**
 * Created by hoho on 2018. 7. 20..
 */
exports['default'] = function () {
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


exports.__esModule = true;

var _Templates = __webpack_require__(/*! view/engine/Templates */ "./src/js/view/engine/Templates.js");

var _Templates2 = _interopRequireDefault(_Templates);

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    var $container = _underscore2["default"].isElement(container) ? (0, _likeA$2["default"])(container) : container;
    var $template = void 0;
    var viewEvents = {};
    var that = {};

    var createAndSelectElement = function createAndSelectElement(html) {
        var newElement = document.createElement('div');
        newElement.innerHTML = html;

        $template = (0, _likeA$2["default"])(newElement.firstChild);

        return newElement.firstChild;
    };

    if (isRoot) {
        $container.replace(createAndSelectElement(_Templates2["default"][templateName + "Template"](data)));
    } else {
        $container.append(createAndSelectElement(_Templates2["default"][templateName + "Template"](data)));
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
            $target = (0, _likeA$2["default"])(target);
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
                $target = (0, _likeA$2["default"])(event.target);
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
            if (isRoot) {
                $template.removeChild();
                $template.removeAttribute("class");
            } else {
                $template.remove();
            }
        }

        if (onDestroyed) {
            onDestroyed();
        }
    };
    return that;
}; /**
    * Created by hoho on 2018. 7. 19..
    */

exports["default"] = OvenTemplate;

/***/ }),

/***/ "./src/js/view/engine/Templates.js":
/*!*****************************************!*\
  !*** ./src/js/view/engine/Templates.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Created by hoho on 2018. 7. 20..
 */
var Templates = {
    TextViewTemplate: _mainTemplate2['default'],
    ViewTemplate: _viewTemplate2['default'],
    HelperTemplate: _mainTemplate4['default'],
    BigButtonTemplate: _bigButtonTemplate2['default'],
    MessageBoxTemplate: _messageBoxTemplate2['default'],
    SpinnerTemplate: _spinnerTemplate2['default'],
    ContextPanelTemplate: _contextPanelTemplate2['default'],

    ControlsTemplate: _mainTemplate6['default'],
    VolumeButtonTemplate: _volumeButtonTemplate2['default'],
    ProgressBarTemplate: _progressBarTemplate2['default'],
    PlayButtonTemplate: _playButtonTemplate2['default'],
    TimeDisplayTemplate: _timeDisplayTemplate2['default'],
    FullScreenButtonTemplate: _fullScreenButtonTemplate2['default'],
    SettingPanelTemplate: _settingPanelTemplate2['default']
};

exports['default'] = Templates;

/***/ }),

/***/ "./src/js/view/example/mainTemplate.js":
/*!*********************************************!*\
  !*** ./src/js/view/example/mainTemplate.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Created by hoho on 2018. 7. 19..
 */

var TextViewTemplate = function TextViewTemplate(text) {
  return '<div class="textView" style="padding : 5px; background: red">' + '<h3>' + text + '</h3>' + '<button type="button" class="btn">닫기</button>' + '</div>';
};

exports['default'] = TextViewTemplate;

/***/ }),

/***/ "./src/js/view/global/SettingPanelList.js":
/*!************************************************!*\
  !*** ./src/js/view/global/SettingPanelList.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Created by hoho on 2018. 7. 26..
 */
var SettingPanelList = [];

exports["default"] = SettingPanelList;

/***/ }),

/***/ "./src/js/view/helper/bigButton.js":
/*!*****************************************!*\
  !*** ./src/js/view/helper/bigButton.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

    return (0, _OvenTemplate2["default"])($container, "BigButton", playerState, events, onRendered, onDestroyed);
};

exports["default"] = BigButton;

/***/ }),

/***/ "./src/js/view/helper/bigButtonTemplate.js":
/*!*************************************************!*\
  !*** ./src/js/view/helper/bigButtonTemplate.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

exports['default'] = function (playerState) {
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


exports.__esModule = true;

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Created by hoho on 2018. 8. 1..
 */
var ContextPanel = function ContextPanel($container, api, position) {
    var $root = (0, _likeA$2['default'])("#" + api.getContainerId());

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

    return (0, _OvenTemplate2['default'])($container, "ContextPanel", position, events, onRendered, onDestroyed);
};

exports['default'] = ContextPanel;

/***/ }),

/***/ "./src/js/view/helper/contextPanelTemplate.js":
/*!****************************************************!*\
  !*** ./src/js/view/helper/contextPanelTemplate.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _version = __webpack_require__(/*! version */ "./src/js/version.js");

exports['default'] = function () {
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


exports.__esModule = true;

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _bigButton = __webpack_require__(/*! view/helper/bigButton */ "./src/js/view/helper/bigButton.js");

var _bigButton2 = _interopRequireDefault(_bigButton);

var _messageBox = __webpack_require__(/*! view/helper/messageBox */ "./src/js/view/helper/messageBox.js");

var _messageBox2 = _interopRequireDefault(_messageBox);

var _spinner = __webpack_require__(/*! view/helper/spinner */ "./src/js/view/helper/spinner.js");

var _spinner2 = _interopRequireDefault(_spinner);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Helper = function Helper($container, api) {
    var bigButton = "",
        messageBox = "",
        spinner = "";

    var onRendered = function onRendered($current, template) {
        var createBigButton = function createBigButton(state) {
            if (bigButton) {
                bigButton.destroy();
            }
            bigButton = (0, _bigButton2['default'])($current, api, state);
        };
        var createMessage = function createMessage(message, withTimer) {
            if (messageBox) {
                messageBox.destroy();
            }
            messageBox = (0, _messageBox2['default'])($current, api, message, withTimer);
        };
        spinner = (0, _spinner2['default'])($current, api);

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

    return (0, _OvenTemplate2['default'])($container, "Helper", null, events, onRendered, onDestroyed);
}; /**
    * Created by hoho on 2018. 7. 24..
    */
exports['default'] = Helper;

/***/ }),

/***/ "./src/js/view/helper/mainTemplate.js":
/*!********************************************!*\
  !*** ./src/js/view/helper/mainTemplate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Created by hoho on 2018. 7. 19..
 */

var HelperTemplate = function HelperTemplate(text) {
  return '<div class="ovp-helpers-container"></div>';
};

exports['default'] = HelperTemplate;

/***/ }),

/***/ "./src/js/view/helper/messageBox.js":
/*!******************************************!*\
  !*** ./src/js/view/helper/messageBox.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

    return (0, _OvenTemplate2["default"])($container, "MessageBox", message, events, onRendered, onDestroyed);
};

exports["default"] = MessageBox;

/***/ }),

/***/ "./src/js/view/helper/messageBoxTemplate.js":
/*!**************************************************!*\
  !*** ./src/js/view/helper/messageBoxTemplate.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (message) {
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


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by hoho on 2018. 7. 25..
                                                                                                                                                                                                                                                                   */


var _OvenTemplate = __webpack_require__(/*! view/engine/OvenTemplate */ "./src/js/view/engine/OvenTemplate.js");

var _OvenTemplate2 = _interopRequireDefault(_OvenTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Spinner = function Spinner($container, api) {
    var $spinner = "";

    var onRendered = function onRendered($current, template) {
        $spinner = $current;
    };
    var onDestroyed = function onDestroyed() {
        //Do nothing.
    };
    var events = {};

    return _extends((0, _OvenTemplate2["default"])($container, "Spinner", null, events, onRendered, onDestroyed), {
        show: function show(isShow) {
            if (isShow) {
                $spinner.show();
            } else {
                $spinner.hide();
            }
        }
    });
};

exports["default"] = Spinner;

/***/ }),

/***/ "./src/js/view/helper/spinnerTemplate.js":
/*!***********************************************!*\
  !*** ./src/js/view/helper/spinnerTemplate.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function () {
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


exports.__esModule = true;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
            if (_SettingPanelList2['default'].length > 0) {
                return false;
            }
            $playerRoot.addClass("ovp-autohide");
        } else {
            $playerRoot.removeClass("ovp-autohide");

            if (autoHide) {
                autoHideTimer = setTimeout(function () {
                    if (_SettingPanelList2['default'].length > 0) {
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
        contextPanel = (0, _contextPanel2['default'])($playerRoot, api, { pageX: pageX, pageY: pageY });
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
            if (!(0, _likeA$2['default'])(event.target).closest(".ovp-bottom-panel") && !(0, _likeA$2['default'])(event.target).closest(".ovp-setting-panel") && !(0, _likeA$2['default'])(event.target).closest(".ovp-message-container")) {
                togglePlayPause();
            }
            if (!(0, _likeA$2['default'])(event.target).closest(".ovp-setting-panel") && !(0, _likeA$2['default'])(event.target).closest(".ovp-setting-button") && _SettingPanelList2['default'].length > 0) {
                //clear all SettingPanelTemplate
                _underscore2['default'].each(_SettingPanelList2['default'], function (settingPanel) {
                    settingPanel.destroy();
                });
                _SettingPanelList2['default'].splice(0, _SettingPanelList2['default'].length);
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

    return _extends((0, _OvenTemplate2['default'])($container, "View", $container.id, events, onRendered, onDestroyed, true), {
        getMediaElementContainer: function getMediaElementContainer() {
            return $playerRoot.find(".ovp-media-element-container").get();
        },
        setApi: function setApi(playerInstance) {
            api = playerInstance;
            helper = (0, _main2['default'])($playerRoot.find(".ovp-ui"), playerInstance);
            controls = (0, _main4['default'])($playerRoot.find(".ovp-ui"), playerInstance);
            api.on(_constants.CONTENT_META, function (error) {
                if (!controls) {
                    controls = (0, _main4['default'])($playerRoot.find(".ovp-ui"), playerInstance);
                }
            });
            api.on(_constants.ERROR, function (error) {
                controls.destroy();
                controls = null;
            });

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

exports['default'] = View;

/***/ }),

/***/ "./src/js/view/viewTemplate.js":
/*!*************************************!*\
  !*** ./src/js/view/viewTemplate.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Created by hoho on 2018. 7. 20..
 */

var ViewTemplate = function ViewTemplate(id) {
    return '<div class="ovenplayer ovp-wrapper" tabindex="-1" aria-label="" id="' + id + '">' + '<div class="ovp-ratio"></div>' + '<div class="ovp-player">' + '<div class="ovp-media-element-container" data-parent-id="' + id + '">' + '</div>' + '<div class="ovp-ui">' + '</div>' + '</div>' + '</div>';
};
exports['default'] = ViewTemplate;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9vdmVucGxheWVyLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLWZ1bGxzY3JlZW4tY29tcHJlc3Muc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1mdWxsc2NyZWVuLWV4cGFuZC5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXBsYXktbGFyZ2Uuc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1wbGF5LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItcmUtbGFyZ2Uuc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1zZXR0aW5nLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItc3RvcC1sYXJnZS5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXN0b3Auc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci12b2x1bWUtMi5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXZvbHVtZS1tdXRlLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItdm9sdW1lLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvY3NzL292ZW5wbGF5ZXIubGVzcz83MTVmIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvc2hpbXMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xpa2VBJC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvbG9nZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9wb2x5ZmlsbHMvZG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zdHJpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy91bmRlcnNjb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy92YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3dlYnBhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvZnVsbFNjcmVlbkJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9mdWxsU2NyZWVuQnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9tYWluVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcGxheUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9wbGF5QnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcHJvZ3Jlc3NCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcHJvZ3Jlc3NCYXJUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9zZXR0aW5nUGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvc2V0dGluZ1BhbmVsVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdGltZURpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdGltZURpc3BsYXlUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy92b2x1bWVCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdm9sdW1lQnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9lbmdpbmUvVGVtcGxhdGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2V4YW1wbGUvbWFpblRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2dsb2JhbC9TZXR0aW5nUGFuZWxMaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9iaWdCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL2JpZ0J1dHRvblRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9jb250ZXh0UGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL2NvbnRleHRQYW5lbFRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9tYWluVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL21lc3NhZ2VCb3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL21lc3NhZ2VCb3hUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9oZWxwZXIvc3Bpbm5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9oZWxwZXIvc3Bpbm5lclRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvdmlld1RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbIkFwaSIsImNvbnRhaW5lciIsImxvZ01hbmFnZXIiLCJ0aGF0IiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ2ZXJzaW9uIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiaW5pdFByb3ZpZGVyIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImdldFF1YWxpdHlMYWJlbCIsImxhYmVsIiwibG9hZFByb3ZpZGVycyIsImdldFBsYXlsaXN0IiwidGhlbiIsImRlc3Ryb3kiLCJjdXJyZW50U291cmNlSW5kZXgiLCJnZXRDdXJyZW50U291cmNlcyIsIlByb3ZpZGVycyIsImdldE5hbWUiLCJQUk9WSURFUl9SVE1QIiwib24iLCJuYW1lIiwiZGF0YSIsInRyaWdnZXIiLCJFUlJPUiIsInBhcnNlSW50IiwiY29kZSIsIk5FVFdPUktfVU5TVEFCTEVEIiwiY3VycmVudFF1YWxpdHkiLCJnZXRDdXJyZW50UXVhbGl0eSIsImluZGV4IiwiZ2V0UXVhbGl0eUxldmVscyIsInBhdXNlIiwic2V0Q3VycmVudFF1YWxpdHkiLCJwcmVsb2FkIiwiZmx1c2giLCJSRUFEWSIsImVycm9yIiwiZXJyb3JPYmplY3QiLCJJTklUX0VSUk9SIiwicmVhc29uIiwibWVzc2FnZSIsInJlbW92ZUFuZEV4Y3V0ZU9uY2UiLCJpbml0Iiwib3B0aW9ucyIsImlzRGVidWciLCJkaXNhYmxlIiwic2V0UGxheWxpc3QiLCJnZXRDb25maWciLCJnZXREdXJhdGlvbiIsImdldFBvc2l0aW9uIiwiZ2V0Vm9sdW1lIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwic2V0TXV0ZSIsInN0YXRlIiwiZ2V0TXV0ZSIsImxvYWQiLCJwbGF5bGlzdCIsInBsYXkiLCJzZWVrIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJzZXREZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwicXVhbGl0eUluZGV4IiwiY3VycmVudFNvdXJjZSIsIm5ld1NvdXJjZSIsImlzU2FtZVByb3ZpZGVyIiwicmVzUXVhbGl0eUluZGV4IiwiZ2V0QnVmZmVyIiwiZ2V0U3RhdGUiLCJzdG9wIiwicmVtb3ZlIiwiREVTVFJPWSIsIm9mZiIsIk92ZW5QbGF5ZXJTREsiLCJyZW1vdmVQbGF5ZXIiLCJnZXRDb250YWluZXJJZCIsIkFwaVJ0bXBFeHBhbnNpb24iLCJleHRlcm5hbENhbGxiYWNrQ3JlZXAiLCJyZXN1bHQiLCJ0cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwiLCJDb25maWd1cmF0b3IiLCJjb21wb3NlU291cmNlT3B0aW9ucyIsIkRlZmF1bHRzIiwiZGVmYXVsdFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZUNvbnRyb2xzIiwicGxheWJhY2tSYXRlcyIsIm11dGUiLCJ3aWR0aCIsImhlaWdodCIsInNlcmlhbGl6ZSIsInZhbCIsInVuZGVmaW5lZCIsImxvd2VyY2FzZVZhbCIsInRvTG93ZXJDYXNlIiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwiZGVzZXJpYWxpemUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsIm5vcm1hbGl6ZVNpemUiLCJzbGljZSIsImV2YWx1YXRlQXNwZWN0UmF0aW8iLCJhciIsInRvU3RyaW5nIiwiaW5kZXhPZiIsInRlc3QiLCJ3Iiwic3Vic3RyIiwiaCIsImNvbmZpZyIsImFzcGVjdHJhdGlvIiwicmF0ZUNvbnRyb2xzIiwicmF0ZXMiLCJBcnJheSIsImlzQXJyYXkiLCJmaWx0ZXIiLCJfIiwiaXNOdW1iZXIiLCJyYXRlIiwibWFwIiwiTWF0aCIsInJvdW5kIiwicHVzaCIsInNvcnQiLCJjb25maWdQbGF5bGlzdCIsIm9iaiIsInBpY2siLCJmZWVkRGF0YSIsImR1cmF0aW9uIiwiZGVidWciLCJpbWFnZSIsInF1YWxpdHlMYWJlbCIsInJlcGVhdCIsInN0cmV0Y2hpbmciLCJnZXRBc3BlY3RyYXRpbyIsInNldEFzcGVjdHJhdGlvIiwiYXNwZWN0cmF0aW9fIiwiZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSIsInNldFF1YWxpdHlMYWJlbCIsIm5ld0xhYmVsIiwiZ2V0UGxheWJhY2tSYXRlcyIsImlzUGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5bGlzdF8iLCJpc1JlcGVhdCIsImdldFN0cmV0Y2hpbmciLCJFdmVudEVtaXR0ZXIiLCJvYmplY3QiLCJfZXZlbnRzIiwidHJpZ2dlckV2ZW50cyIsImV2ZW50cyIsImFyZ3MiLCJjb250ZXh0IiwiZXZlbnQiLCJsaXN0ZW5lciIsImFwcGx5IiwiY2FsbCIsImFyZ3VtZW50cyIsImFsbEV2ZW50cyIsImFsbCIsIm5hbWVzIiwibCIsInJldGFpbiIsImoiLCJrIiwiX2NhbGxiYWNrIiwib25jZSIsImNvdW50Iiwib25jZUNhbGxiYWNrIiwiX2xpc3RlbmVyIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJwcm90b3R5cGUiLCJhZGRRdWV1ZSIsImV4ZWN1dGVRdWV1ZWRDb21tYW5kcyIsInNoaWZ0Iiwic2V0RXhlY3V0ZU1vZGUiLCJtb2RlIiwiZ2V0VW5kZWNvcmF0ZWRNZXRob2RzIiwiZ2V0UXVldWUiLCJlbXB0eSIsImNvbW1hbmRfIiwiY29tbWFuZFF1ZXVlSXRlbSIsImZpbmRXaGVyZSIsInNwbGljZSIsImZpbmRJbmRleCIsIlN1cHBvcnRDaGVja2VyIiwic3VwcG9ydExpc3QiLCJjaGVja1N1cHBvcnQiLCJzb3VyY2UiLCJNaW1lVHlwZXMiLCJhYWMiLCJtcDQiLCJmNHYiLCJtNHYiLCJtb3YiLCJtcDMiLCJtcGVnIiwib2d2Iiwib2dnIiwib2dhIiwidm9yYmlzIiwid2VibSIsImY0YSIsIm0zdTgiLCJtM3UiLCJobHMiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsImlzSGxzU3VwcG9ydCIsImdldE1lZGlhU291cmNlIiwid2luZG93IiwiTWVkaWFTb3VyY2UiLCJXZWJLaXRNZWRpYVNvdXJjZSIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVyIiwiU291cmNlQnVmZmVyIiwiV2ViS2l0U291cmNlQnVmZmVyIiwiaXNUeXBlU3VwcG9ydGVkIiwic291cmNlQnVmZmVyVmFsaWRBUEkiLCJhcHBlbmRCdWZmZXIiLCJmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UiLCJzb3J1Y2VfIiwiZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0Iiwic3VwcG9ydE5hbWVzIiwiaXRlbSIsInN1cHBvcnRlZCIsIlNUQVRFX0JVRkZFUklORyIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsIlNUQVRFX1BBVVNFRCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9FUlJPUiIsIlNUQVRFX0xPQURJTkciLCJTVEFURV9TVEFMTEVEIiwiUFJPVklERVJfSFRNTDUiLCJQUk9WSURFUl9XRUJSVEMiLCJQUk9WSURFUl9EQVNIIiwiUFJPVklERVJfSExTIiwiQ09OVEVOVF9DT01QTEVURSIsIkNPTlRFTlRfU0VFSyIsIkNPTlRFTlRfQlVGRkVSX0ZVTEwiLCJESVNQTEFZX0NMSUNLIiwiQ09OVEVOVF9MT0FERUQiLCJDT05URU5UX1NFRUtFRCIsIlBMQVlFUl9TVEFURSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIlBMQVlFUl9QTEFZIiwiQ09OVEVOVF9CVUZGRVIiLCJDT05URU5UX1RJTUUiLCJDT05URU5UX1JBVEVfQ0hBTkdFIiwiQ09OVEVOVF9WT0xVTUUiLCJDT05URU5UX01VVEUiLCJDT05URU5UX01FVEEiLCJDT05URU5UX0xFVkVMUyIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIkNPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCIsIkNPTlRFTlRfQ0FQVElPTl9DSEFOR0VEIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiTWFuYWdlciIsImN1cnJlbnRQbGF5bGlzdCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwicmVwbGFjZSIsInByZXR0aWVkUGxheWxpc3QiLCJ0cmFja3MiLCJwbGF5bGlzdEl0ZW0iLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwiY2FwdGlvbnMiLCJjb25jYXQiLCJ0cmFjayIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsInByb3ZpZGVyIiwiUHJvdmlkZXJMb2FkZXIiLCJodG1sNSIsInJlcXVpcmUiLCJlcnIiLCJFcnJvciIsIndlYnJ0YyIsImRhc2giLCJydG1wIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJwcm92aWRlck5hbWUiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsInByb21pc2VGaW5hbGx5IiwiY2FsbGJhY2siLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXRGdW5jIiwic2V0VGltZW91dCIsInNldEltbWVkaWF0ZUZ1bmMiLCJzZXRJbW1lZGlhdGUiLCJub29wIiwiYmluZCIsImZuIiwidGhpc0FyZyIsIlByb21pc2VTaGltIiwiVHlwZUVycm9yIiwiX3N0YXRlIiwiX2hhbmRsZWQiLCJfdmFsdWUiLCJfZGVmZXJyZWRzIiwiZG9SZXNvbHZlIiwiaGFuZGxlIiwic2VsZiIsImRlZmVycmVkIiwiX2ltbWVkaWF0ZUZuIiwiY2IiLCJvbkZ1bGZpbGxlZCIsIm9uUmVqZWN0ZWQiLCJwcm9taXNlIiwicmV0IiwiZSIsIm5ld1ZhbHVlIiwiZmluYWxlIiwiX3VuaGFuZGxlZFJlamVjdGlvbkZuIiwibGVuIiwiSGFuZGxlciIsImRvbmUiLCJleCIsInByb20iLCJhcnIiLCJyZW1haW5pbmciLCJyZXMiLCJyYWNlIiwidmFsdWVzIiwiY29uc29sZSIsIndhcm4iLCJyZXNvbHZlZCIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwiT3ZlblBsYXllciIsImNyZWF0ZSIsImJyb3dzZXJOYW1lIiwiY29udGFpbmVyRWxlbWVudCIsInBsYXllciIsInBsYXllckluc3RhbmNlIiwiZ2V0TWVkaWFFbGVtZW50Q29udGFpbmVyIiwiaWQiLCJzZXRBcGkiLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub2RlVHlwZSIsImdldFBsYXllckxpc3QiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJnZXRQbGF5ZXJCeUluZGV4IiwicGxheWVySWQiLCJnZW5lcmF0ZVdlYnJ0Y1VybHMiLCJnZXRCcm93c2VyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibXNpZSIsImllIiwidW5kZWYiLCJ2IiwiZGl2IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbm5lckhUTUwiLCJMYSQiLCJzZWxlY3Rvck9yRWxlbWVudCIsInJldHVybk5vZGUiLCIkZWxlbWVudCIsInNlbGVjdG9yIiwibm9kZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlcnkiLCJpc0VsZW1lbnQiLCJmaW5kIiwiY3NzIiwiZWxlbWVudCIsInN0eWxlIiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGFzc05hbWVzIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJyZW1vdmVDbGFzcyIsIlJlZ0V4cCIsImpvaW4iLCJyZW1vdmVBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInNob3ciLCJkaXNwbGF5IiwiaGlkZSIsImFwcGVuZCIsImh0bWxDb2RlIiwidGV4dCIsInRleHRDb250ZW50IiwiaGFzQ2xhc3MiLCJjb250YWlucyIsImlzIiwiJHRhcmdldEVsZW1lbnQiLCJvZmZzZXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwiYm9keSIsInNjcm9sbFRvcCIsImxlZnQiLCJzY3JvbGxMZWZ0IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJhdHRyIiwiZ2V0QXR0cmlidXRlIiwiaHRtbCIsInJlcGxhY2VXaXRoIiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVDaGlsZCIsImhhc0NoaWxkTm9kZXMiLCJmaXJzdENoaWxkIiwiZ2V0IiwiY2xvc2VzdCIsInNlbGVjdG9yU3RyaW5nIiwibG9nZ2VyIiwicHJldkNvbnNvbGVMb2ciLCJlbmFibGUiLCJnbG9iYWwiLCJzZWxlY3RvcnMiLCJlbGVtZW50cyIsImRvY3VtZW50RWxlbWVudCIsIl9xc2EiLCJzdHlsZVNoZWV0IiwiY3NzVGV4dCIsInNjcm9sbEJ5IiwicGFyZW50Tm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiU3RyaW5nIiwiTm9kZSIsInAiLCJET01FeGNlcHRpb24iLCJFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRlZmluZVByb3BlcnR5IiwiRXZlbnQiLCJDQVBUVVJJTkdfUEhBU0UiLCJBVF9UQVJHRVQiLCJCVUJCTElOR19QSEFTRSIsImRlZmluZVByb3BlcnRpZXMiLCJ0YXJnZXQiLCJzcmNFbGVtZW50IiwiY3VycmVudFRhcmdldCIsIl9jdXJyZW50VGFyZ2V0IiwiZXZlbnRQaGFzZSIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwidGltZVN0YW1wIiwiX3RpbWVTdGFtcCIsInN0b3BQcm9wYWdhdGlvbiIsImNhbmNlbEJ1YmJsZSIsInByZXZlbnREZWZhdWx0IiwicmV0dXJuVmFsdWUiLCJkZWZhdWx0UHJldmVudGVkIiwidXNlQ2FwdHVyZSIsImYiLCJEYXRlIiwibm93IiwiYXR0YWNoRXZlbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGV0YWNoRXZlbnQiLCJXaW5kb3ciLCJIVE1MRG9jdW1lbnQiLCJvIiwiQ3VzdG9tRXZlbnQiLCJwYXJhbXMiLCJkZXRhaWwiLCJldnQiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImFkZEV2ZW50IiwicmVtb3ZlRXZlbnQiLCJET01Ub2tlbkxpc3RTaGltIiwicyIsInJlbW92ZVRva2VuRnJvbVN0cmluZyIsInRva2VuIiwic3RyaW5nIiwidG9rZW5zIiwiaWR4IiwiU3ludGF4RXJyb3IiLCJzb21lIiwidW5kZXJseWluZ19zdHJpbmciLCJ0b2tlbl9saXN0IiwidG9nZ2xlIiwiZm9yY2UiLCJuIiwiYWRkVG9FbGVtZW50UHJvdG90eXBlIiwiZ2V0Q2xhc3NMaXN0IiwiZWxlbSIsImdldFJlbExpc3QiLCJyZWxMaXN0IiwiRE9NVG9rZW5MaXN0IiwicHJldmlvdXNTaWJsaW5nIiwiRUxFTUVOVF9OT0RFIiwibmV4dFNpYmxpbmciLCJtYXRjaGVzIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJvTWF0Y2hlc1NlbGVjdG9yIiwibW96TWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwib3duZXJEb2N1bWVudCIsImVsIiwicGFyZW50RWxlbWVudCIsIm1peGluIiwicHMiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJjb252ZXJ0Tm9kZXNJbnRvQU5vZGUiLCJub2RlcyIsIm5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJQYXJlbnROb2RlIiwicHJlcGVuZCIsImluc2VydEJlZm9yZSIsIkRvY3VtZW50IiwiRG9jdW1lbnRGcmFnbWVudCIsIkNoaWxkTm9kZSIsImJlZm9yZSIsInBhcmVudCIsInZpYWJsZVByZXZpb3VzU2libGluZyIsImFmdGVyIiwidmlhYmxlTmV4dFNpYmxpbmciLCJyZXBsYWNlQ2hpbGQiLCJEb2N1bWVudFR5cGUiLCJDaGFyYWN0ZXJEYXRhIiwidHJpbSIsIm5hdHVyYWxIbXMiLCJleHRyYWN0RXh0ZW5zaW9uIiwicGF0aCIsImdldEF6dXJlRmlsZUZvcm1hdCIsImV4dGVuc2lvbiIsImF6dXJlZEZvcm1hdCIsImxhc3RJbmRleE9mIiwic2Vjb25kIiwic2VjTnVtIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiciIsIlN5bWJvbCIsInUiLCJjIiwiaGFzT3duUHJvcGVydHkiLCJ0IiwiYSIsIl93cmFwcGVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIlZFUlNJT04iLCJ5IiwiZCIsIml0ZXJhdGVlIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwicHJvcGVydHkiLCJnIiwibWF4IiwibSIsImIiLCJ4IiwicG93IiwiQSIsImVhY2giLCJjb2xsZWN0IiwiTyIsInJlZHVjZSIsImZvbGRsIiwiaW5qZWN0IiwicmVkdWNlUmlnaHQiLCJmb2xkciIsImRldGVjdCIsImZpbmRLZXkiLCJzZWxlY3QiLCJuZWdhdGUiLCJhbnkiLCJpbmNsdWRlcyIsImluY2x1ZGUiLCJpbnZva2UiLCJwbHVjayIsIndoZXJlIiwibWluIiwic2h1ZmZsZSIsInNhbXBsZSIsInJhbmRvbSIsImNsb25lIiwic29ydEJ5IiwiY3JpdGVyaWEiLCJncm91cEJ5IiwiaW5kZXhCeSIsImNvdW50QnkiLCJTIiwidG9BcnJheSIsImlzU3RyaW5nIiwibWF0Y2giLCJzaXplIiwicGFydGl0aW9uIiwiZmlyc3QiLCJoZWFkIiwidGFrZSIsImluaXRpYWwiLCJsYXN0IiwicmVzdCIsInRhaWwiLCJkcm9wIiwiY29tcGFjdCIsIkJvb2xlYW4iLCJNIiwiaXNBcmd1bWVudHMiLCJmbGF0dGVuIiwid2l0aG91dCIsImRpZmZlcmVuY2UiLCJ1bmlxIiwidW5pcXVlIiwiaXNCb29sZWFuIiwidW5pb24iLCJpbnRlcnNlY3Rpb24iLCJ1bnppcCIsInppcCIsIkYiLCJmaW5kTGFzdEluZGV4Iiwic29ydGVkSW5kZXgiLCJFIiwicmFuZ2UiLCJjZWlsIiwiY2h1bmsiLCJOIiwicGFydGlhbCIsInBsYWNlaG9sZGVyIiwiYmluZEFsbCIsIm1lbW9pemUiLCJjYWNoZSIsImRlbGF5IiwiZGVmZXIiLCJ0aHJvdHRsZSIsImxlYWRpbmciLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsImNhbmNlbCIsImRlYm91bmNlIiwid3JhcCIsImNvbXBvc2UiLCJyZXN0QXJndW1lbnRzIiwiSSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiVCIsIkIiLCJhbGxLZXlzIiwibWFwT2JqZWN0IiwicGFpcnMiLCJpbnZlcnQiLCJmdW5jdGlvbnMiLCJtZXRob2RzIiwiUiIsImV4dGVuZCIsImV4dGVuZE93biIsImFzc2lnbiIsInEiLCJLIiwieiIsIm9taXQiLCJkZWZhdWx0cyIsInRhcCIsImlzTWF0Y2giLCJ2YWx1ZU9mIiwicG9wIiwiaXNFcXVhbCIsImlzRW1wdHkiLCJEIiwiY2hpbGROb2RlcyIsIkludDhBcnJheSIsImlzRmluaXRlIiwiaXNTeW1ib2wiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsImhhcyIsIm5vQ29uZmxpY3QiLCJjb25zdGFudCIsInByb3BlcnR5T2YiLCJ0aW1lcyIsImdldFRpbWUiLCJMIiwiUCIsIlciLCJlc2NhcGUiLCJ1bmVzY2FwZSIsIkMiLCJ1bmlxdWVJZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwiSiIsIlUiLCJWIiwiJCIsInRlbXBsYXRlIiwidmFyaWFibGUiLCJGdW5jdGlvbiIsImNoYWluIiwiX2NoYWluIiwiRyIsInRvSlNPTiIsImlzUnRtcCIsImlzV2ViUlRDIiwiaXNEYXNoIiwiZ2V0U2NyaXB0UGF0aCIsInNjcmlwdE5hbWUiLCJzY3JpcHRzIiwic3JjIiwiRnVsbFNjcmVlbkJ1dHRvbiIsIiRjb250YWluZXIiLCJhcGkiLCIkcm9vdCIsIiRpY29uRXhwYW5kIiwiJGljb25Db21wcmVzcyIsImlzRnVsbFNjcmVlbiIsImZ1bGxTY3JlZW5FdmVudFR5cGVzIiwib25mdWxsc2NyZWVuY2hhbmdlIiwib25tb3pmdWxsc2NyZWVuY2hhbmdlIiwib253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIiwiTVNGdWxsc2NyZWVuQ2hhbmdlIiwiZnVsbFNjcmVlbkNoYW5nZWRDYWxsYmFjayIsImNoZWNrRnVsbFNjcmVlbiIsImZ1bGxzY3JlZW5FbGVtZW50Iiwid2Via2l0RnVsbHNjcmVlbkVsZW1lbnQiLCJtb3pGdWxsU2NyZWVuRWxlbWVudCIsIm1zRnVsbHNjcmVlbkVsZW1lbnQiLCJyZXF1ZXN0RnVsbFNjcmVlbiIsInJlcXVlc3RGdWxsc2NyZWVuIiwid2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4iLCJtb3pSZXF1ZXN0RnVsbFNjcmVlbiIsIm1zUmVxdWVzdEZ1bGxzY3JlZW4iLCJleGl0RnVsbFNjcmVlbiIsImV4aXRGdWxsc2NyZWVuIiwid2Via2l0RXhpdEZ1bGxzY3JlZW4iLCJtb3pDYW5jZWxGdWxsU2NyZWVuIiwibXNFeGl0RnVsbHNjcmVlbiIsInRvZ2dsZUZ1bGxTY3JlZW4iLCJvblJlbmRlcmVkIiwiJGN1cnJlbnQiLCJldmVudE5hbWUiLCJvbkRlc3Ryb3llZCIsIkNvbnRyb2xzIiwidm9sdW1lQnV0dG9uIiwicGxheUJ1dHRvbiIsInByb2dyZXNzQmFyIiwidGltZURpc3BsYXkiLCJmdWxsU2NyZWVuQnV0dG9uIiwiZ2VuZXJhdGVNYWluUGFuZWxEYXRhIiwicGFuZWwiLCJ0aXRsZSIsImlzTWFpbiIsIkluZmluaXR5IiwiaW5pdFRpbWVEaXNwbGF5IiwiaW5pdFByb2dyZXNzQmFyIiwic2V0TW91c2VEb3duIiwiU2V0dGluZ1BhbmVsTGlzdCIsInNldHRpbmdQYW5lbCIsIlBsYXlCdXR0b24iLCIkaWNvblBsYXkiLCIkaWNvblBhdXNlIiwiJGljb25SZXBsYXkiLCJzZXRCdXR0b25TdGF0ZSIsIm5ld3N0YXRlIiwiY3VycmVudFN0YXRlIiwiUHJvZ3Jlc3NCYXIiLCJjdXJyZW50UGxheWluZ1Bvc2l0aW9uIiwiY3VycmVudFBsYXlpbmdQZXJjZW50YWdlIiwiY3VycmVudExvYWRlZFBlcmNlbnRhZ2UiLCJtb3VzZUluc2lkZSIsIm1vdXNlRG93biIsIiRwcm9ncmVzc0JhciIsIiRwcm9ncmVzc0xvYWQiLCIkcHJvZ3Jlc3NQbGF5IiwiJHByb2dyZXNzSG92ZXIiLCIka25vYkNvbnRhaW5lciIsIiRrbm9iIiwia25vYldpZHRoIiwiJHRpbWUiLCJwb3NpdGlvbkVsZW1lbnRzIiwicGVyY2VudGFnZSIsInByb2dyZXNzQmFyV2lkdGgiLCJrbm9iUG9zdGlvbiIsImRyYXdIb3ZlclByb2dyZXNzIiwiaG92ZXJQb3NpdGlvbiIsImRyYXdMb2FkUHJvZ3Jlc3MiLCJsb2FkUG9zaXRpb24iLCJjYWxjdWxhdGVQZXJjZW50YWdlIiwicHJvZ3Jlc3NCYXJPZmZzZXRYIiwicG9pbnRlck9mZnNldFgiLCJwYWdlWCIsImRyYXdUaW1lSW5kaWNhdG9yIiwiaG1zIiwidGltZUVsZW1XaWR0aCIsInBvc2l0aW9uT2ZQaXhlbCIsImNhbGN1bGF0ZU1hZ25ldGljIiwibWFnbmV0aWNQb3NpdGlvbiIsImJ1ZmZlclBlcmNlbnQiLCJQTEFZRVJfTUlOX0hFSUdIVCIsIlNldHRpbmdQYW5lbCIsImV4dHJhY3RQYW5lbERhdGEiLCJwYW5lbFR5cGUiLCJwbGF5QmFja1JhdGVzIiwiY3VycmVudFBsYXliYWNrUmF0ZSIsImlzQ2hlY2siLCJxdWFsaXR5TGV2ZWxzIiwic2V0dGluZ0l0ZW1UZW1wbGF0ZSIsInNldHRpbmdWYWx1ZVRlbXBsYXRlIiwiVGltZURpc3BsYXkiLCIkcG9zaXRpb24iLCIkZHVyYXRpb24iLCJjb252ZXJ0SHVtYW5pemVUaW1lIiwidGltZSIsIlZvbHVtZUJ1dHRvbiIsIiRzbGlkZXJDb250YWluZXIiLCIkc2xpZGVyIiwiJHNsaWRlckhhbmRsZSIsIiRzbGlkZXJWYWx1ZSIsIiR2b2x1bWVJY29uQmlnIiwiJHZvbHVtZUljb25TbWFsbCIsIiR2b2x1bWVJY29uTXV0ZSIsInNsaWRlcldpZHRoIiwiaGFuZGxlV2lkdGgiLCJtaW5SYW5nZSIsIm1heFJhbmdlIiwic2V0Vm9sdW1lSWNvbiIsInNldFZvbHVtZVVJIiwiaGFuZGxlUG9zaXRpb24iLCJyZWxhdGl2ZVgiLCJPdmVuVGVtcGxhdGUiLCJ0ZW1wbGF0ZU5hbWUiLCJpc1Jvb3QiLCIkdGVtcGxhdGUiLCJ2aWV3RXZlbnRzIiwiY3JlYXRlQW5kU2VsZWN0RWxlbWVudCIsIm5ld0VsZW1lbnQiLCJUZW1wbGF0ZXMiLCJleHBsb2RlZFRleHQiLCJldmVudFN0cmluZyIsIiR0YXJnZXQiLCJ3cmFwcGVkRnVuYyIsIm5vZGVMZW5ndGgiLCJUZXh0Vmlld1RlbXBsYXRlIiwiVmlld1RlbXBsYXRlIiwiSGVscGVyVGVtcGxhdGUiLCJCaWdCdXR0b25UZW1wbGF0ZSIsIk1lc3NhZ2VCb3hUZW1wbGF0ZSIsIlNwaW5uZXJUZW1wbGF0ZSIsIkNvbnRleHRQYW5lbFRlbXBsYXRlIiwiQ29udHJvbHNUZW1wbGF0ZSIsIlZvbHVtZUJ1dHRvblRlbXBsYXRlIiwiUHJvZ3Jlc3NCYXJUZW1wbGF0ZSIsIlBsYXlCdXR0b25UZW1wbGF0ZSIsIlRpbWVEaXNwbGF5VGVtcGxhdGUiLCJGdWxsU2NyZWVuQnV0dG9uVGVtcGxhdGUiLCJTZXR0aW5nUGFuZWxUZW1wbGF0ZSIsIkJpZ0J1dHRvbiIsInBsYXllclN0YXRlIiwiQ29udGV4dFBhbmVsIiwicGFuZWxXaWR0aCIsInBhbmVsSGVpZ2h0IiwicGFnZVkiLCJvcGVuIiwiSGVscGVyIiwiYmlnQnV0dG9uIiwibWVzc2FnZUJveCIsInNwaW5uZXIiLCJjcmVhdGVCaWdCdXR0b24iLCJjcmVhdGVNZXNzYWdlIiwid2l0aFRpbWVyIiwiTWVzc2FnZUJveCIsImF1dG9EZXN0cm95VGltZXIiLCJTcGlubmVyIiwiJHNwaW5uZXIiLCJpc1Nob3ciLCJWaWV3Iiwidmlld1RlbXBsYXRlIiwiY29udHJvbHMiLCJoZWxwZXIiLCIkcGxheWVyUm9vdCIsImNvbnRleHRQYW5lbCIsImF1dG9IaWRlVGltZXIiLCJzZXRIaWRlIiwiYXV0b0hpZGUiLCJ0b2dnbGVQbGF5UGF1c2UiLCJpc1Jld2luZCIsImN1cnJlbnRQb3NpdGlvbiIsImlzVXAiLCJjdXJyZW50Vm9sdW1uIiwibmV3Vm9sdW1lIiwiY3JlYXRlQ29udGV4dFBhbmVsIiwia2V5Q29kZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBLGlEQUF5QyxrakJBQWtqQjtBQUMzbEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBLHlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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OztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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O0FBQ2pDLG9CQUFHLENBQUN3M0IsUUFBSixFQUFhO0FBQ1RBLCtCQUFXLHVCQUFTRSxZQUFZbGdCLElBQVosQ0FBaUIsU0FBakIsQ0FBVCxFQUFzQ2pDLGNBQXRDLENBQVg7QUFDSDtBQUNKLGFBSkQ7QUFLQTJYLGdCQUFJbnVCLEVBQUosQ0FBT0ksZ0JBQVAsRUFBYyxVQUFTYSxLQUFULEVBQWdCO0FBQzFCdzNCLHlCQUFTLzRCLE9BQVQ7QUFDQSs0QiwyQkFBVyxJQUFYO0FBQ0gsYUFIRDs7QUFLQXRLLGdCQUFJbnVCLEVBQUosQ0FBT3VELGtCQUFQLEVBQWdCLFVBQVNyRCxJQUFULEVBQWU7QUFDM0JzNEIsNkJBQWE5NEIsT0FBYjtBQUNILGFBRkQ7O0FBSUF5dUIsZ0JBQUludUIsRUFBSixDQUFPa1AsdUJBQVAsRUFBcUIsVUFBU2hQLElBQVQsRUFBYztBQUMvQixvQkFBR0EsUUFBUUEsS0FBS3F4QixRQUFoQixFQUF5QjtBQUNyQix3QkFBR3J4QixLQUFLcXhCLFFBQUwsS0FBa0JuakIsd0JBQXJCLEVBQW1DO0FBQy9CMHFCLGdDQUFRLEtBQVIsRUFBZSxJQUFmO0FBQ0gscUJBRkQsTUFFSztBQUNEQSxnQ0FBUSxLQUFSO0FBQ0g7QUFDSjtBQUNKLGFBUkQ7QUFTSDtBQS9Cd0csS0FBdEcsQ0FBUDtBQWlDSCxDQWhNRDs7cUJBb01lUCxJOzs7Ozs7Ozs7Ozs7Ozs7QUMvTmY7Ozs7QUFJQSxJQUFNaEMsZUFBZSxTQUFmQSxZQUFlLENBQVM3ZixFQUFULEVBQVk7QUFDN0IsV0FBTyx5RUFBdUVBLEVBQXZFLEdBQTBFLElBQTFFLEdBQ0ssK0JBREwsR0FFSywwQkFGTCxHQUdTLDJEQUhULEdBR3FFQSxFQUhyRSxHQUd3RSxJQUh4RSxHQUlTLFFBSlQsR0FLUyxzQkFMVCxHQU1TLFFBTlQsR0FPSyxRQVBMLEdBUUMsUUFSUjtBQVNILENBVkQ7cUJBV2U2ZixZIiwiZmlsZSI6Im92ZW5wbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXJcIjogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHtcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJyk7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9vdmVucGxheWVyLmpzXCIpO1xuIiwidmFyIGVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qc1wiKTtcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGNoYXJzZXQgXFxcIlVURi04XFxcIjsub3ZwLXdyYXBwZXJ7cG9zaXRpb246cmVsYXRpdmU7bWF4LWhlaWdodDoxMDAlO292ZXJmbG93OmhpZGRlbjt6b29tOjEgIWltcG9ydGFudDt3aWR0aDoxMDAlO2Rpc3BsYXk6YmxvY2s7YmFja2dyb3VuZC1jb2xvcjojMDAwOy1tb3otYm94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveDtjb2xvcjojZWVlO2ZvbnQtZmFtaWx5OidOb3RvIFNhbnMnLHNhbnMtc2VyaWY7Zm9udC1zaXplOjExcHg7bGluZS1oZWlnaHQ6MS4zO2ZvbnQtd2VpZ2h0Om5vcm1hbDtvdXRsaW5lOjB9Lm92cC13cmFwcGVyIG9iamVjdHt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5vdnAtd3JhcHBlcjpiZWZvcmUsLm92cC13cmFwcGVyOmFmdGVyey1tb3otYm94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ub3ZwLXdyYXBwZXIgKiwub3ZwLXdyYXBwZXIgKjpiZWZvcmUsLm92cC13cmFwcGVyICo6YWZ0ZXJ7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94fS5vdnAtd3JhcHBlci5vdnAtZnVsbHNjcmVlbntoZWlnaHQ6MTAwJSAhaW1wb3J0YW50fS5vdnAtd3JhcHBlci5vdnAtYXV0b2hpZGV7Y3Vyc29yOm5vbmV9Lm92cC13cmFwcGVyLm92cC1hdXRvaGlkZSAub3ZwLWdyYWRpZW50LXRvcCwub3ZwLXdyYXBwZXIub3ZwLWF1dG9oaWRlIC5vdnAtZ3JhZGllbnQtYm90dG9tLC5vdnAtd3JhcHBlci5vdnAtYXV0b2hpZGUgLm92cC1ib3R0b20tcGFuZWx7b3BhY2l0eTowfS5vdnAtd3JhcHBlci5vdnAtYXV0b2hpZGUgLm92cC1wcm9ncmVzc2Jhci1jb250YWluZXIsLm92cC13cmFwcGVyLm92cC1hdXRvaGlkZSAub3ZwLWNvbnRyb2xzIC5vdnAtYnV0dG9ue2N1cnNvcjpub25lfS5vdnAtd3JhcHBlci5vdnAtYXV0b2hpZGUgLm92cC1jYXB0aW9uLXRleHQtY29udGFpbmVye2JvdHRvbToyNXB4fS5vdnAtd3JhcHBlciAub3ZwLXJhdGlve3BhZGRpbmctYm90dG9tOjU2LjI1JX0ub3ZwLXBsYXllcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDt3aWR0aDoxMDAlfS5vdnAtcGxheWVyIC5vdnAtbWVkaWEtZWxlbWVudC1jb250YWluZXJ7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlfS5vdnAtcGxheWVyIC5vdnAtbWVkaWEtZWxlbWVudC1jb250YWluZXI+Knt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5vdnAtcGxheWVyIC5vdnAtdWl7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0ub3ZwLWJ1dHRvbntkaXNwbGF5OmlubGluZS1ibG9jaztib3JkZXI6bm9uZTtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50O3BhZGRpbmc6MDtjb2xvcjppbmhlcml0O3RleHQtYWxpZ246aW5oZXJpdDtvdmVyZmxvdzpoaWRkZW47Zm9udC13ZWlnaHQ6MTAwfS5vdnAtYnV0dG9uOmZvY3VzLC5vdnAtYnV0dG9ue291dGxpbmU6MH0ub3ZwLWdyYWRpZW50LXRvcCwub3ZwLWdyYWRpZW50LWJvdHRvbXt3aWR0aDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtY29sb3I6IzEyMTIxYztwb2ludGVyLWV2ZW50czpub25lO29wYWNpdHk6LjM7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTt0cmFuc2l0aW9uOm9wYWNpdHkgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpfS5vdnAtZ3JhZGllbnQtYm90dG9te2hlaWdodDo1MHB4O2JvdHRvbTowO3otaW5kZXg6MjJ9Lm92cC1zcGlubmVyLWNvbnRhaW5lcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtkaXNwbGF5Om5vbmV9Lm92cC1zcGlubmVyLWNvbnRhaW5lciAub3ZwLXNwaW5uZXJ7d2lkdGg6NzBweDtoZWlnaHQ6MThweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlO21hcmdpbi10b3A6LTlweDttYXJnaW4tbGVmdDotMzVweDt0ZXh0LWFsaWduOmNlbnRlcn0ub3ZwLXNwaW5uZXItY29udGFpbmVyIC5vdnAtc3Bpbm5lcj5kaXZ7d2lkdGg6MThweDtoZWlnaHQ6MThweDtiYWNrZ3JvdW5kLWNvbG9yOiM1MGUzYzI7Ym9yZGVyLXJhZGl1czoxMDAlO2Rpc3BsYXk6aW5saW5lLWJsb2NrOy13ZWJraXQtYW5pbWF0aW9uOnNrLWJvdW5jZWRlbGF5IDEuNHMgaW5maW5pdGUgZWFzZS1pbi1vdXQgYm90aDthbmltYXRpb246c2stYm91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RofS5vdnAtc3Bpbm5lci1jb250YWluZXIgLm92cC1zcGlubmVyIC5ib3VuY2Uxey13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0wLjMyczthbmltYXRpb24tZGVsYXk6LTAuMzJzfS5vdnAtc3Bpbm5lci1jb250YWluZXIgLm92cC1zcGlubmVyIC5ib3VuY2Uyey13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi0wLjE2czthbmltYXRpb24tZGVsYXk6LTAuMTZzfUAtd2Via2l0LWtleWZyYW1lcyBzay1ib3VuY2VkZWxheXswJSw4MCUsMTAwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKX00MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSl9fUBrZXlmcmFtZXMgc2stYm91bmNlZGVsYXl7MCUsODAlLDEwMCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfTQwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9fS5vdnAtbWVzc2FnZS1ib3h7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Lm92cC1tZXNzYWdlLWJveCAub3ZwLW1lc3NhZ2UtY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDo2MHB4O3dpZHRoOjEwMCU7cGFkZGluZzowIDEycHg7dGV4dC1hbGlnbjpjZW50ZXJ9Lm92cC1tZXNzYWdlLWJveCAub3ZwLW1lc3NhZ2UtY29udGFpbmVyIC5vdnAtbWVzc2FnZS10ZXh0e2ZvbnQtc2l6ZToxNDAlO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwwLjUpO2NvbG9yOiNmZmY7cGFkZGluZzouMWVtIC4zZW07d29yZC13cmFwOmJyZWFrLXdvcmQ7bGluZS1oZWlnaHQ6MS41ZW19Lm92cC1iaWdidXR0b24tY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5vdnAtYmlnYnV0dG9uLWNvbnRhaW5lciAub3ZwLWJpZ2J1dHRvbntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlO3dpZHRoOjgwcHg7aGVpZ2h0OjgwcHg7bWFyZ2luLXRvcDotNDBweDttYXJnaW4tbGVmdDotNDBweDt0ZXh0LWFsaWduOmNlbnRlcn0ub3ZwLWJpZ2J1dHRvbi1jb250YWluZXIgLm92cC1iaWdidXR0b24ub3ZwLWJpZ2J1dHRvbi1wbGF5e2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1wbGF5LWxhcmdlLnN2Z1wiKSkgKyBcIik7YmFja2dyb3VuZC1zaXplOjEwMCV9Lm92cC1iaWdidXR0b24tY29udGFpbmVyIC5vdnAtYmlnYnV0dG9uLm92cC1iaWdidXR0b24tcGF1c2V7YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXN0b3AtbGFyZ2Uuc3ZnXCIpKSArIFwiKTtiYWNrZ3JvdW5kLXNpemU6MTAwJX0ub3ZwLWJpZ2J1dHRvbi1jb250YWluZXIgLm92cC1iaWdidXR0b24ub3ZwLWJpZ2J1dHRvbi1yZXBsYXl7YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXJlLWxhcmdlLnN2Z1wiKSkgKyBcIik7YmFja2dyb3VuZC1zaXplOjEwMCV9Lm92cC1zZXR0aW5nLXBhbmVse3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTo1NXB4O3JpZ2h0OjEycHg7b3ZlcmZsb3cteTphdXRvO3dpZHRoOjI2MHB4O2ZvbnQtc2l6ZToxMjAlO3VzZXItc2VsZWN0Om5vbmU7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI4LDI4LDI4LDAuOSk7dGV4dC1zaGFkb3c6MCAwIDJweCByZ2JhKDAsMCwwLDAuNSl9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy10aXRsZSwub3ZwLXNldHRpbmctcGFuZWwgLm92cC1zZXR0aW5nLWl0ZW17d2lkdGg6MTAwJTtoZWlnaHQ6MzhweDtsaW5lLWhlaWdodDozOHB4O2NvbG9yOiNlZWU7Y3Vyc29yOnBvaW50ZXI7b3V0bGluZTpub25lfS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctdGl0bGUtY29udGFpbmVyIC5vdnAtc2V0dGluZy10aXRsZSAub3ZwLXNldHRpbmctdGl0bGUtdGl0bGV7cGFkZGluZy1sZWZ0OjEycHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy10aXRsZS1jb250YWluZXIgLm92cC1zZXR0aW5nLXRpdGxlIC5vdnAtc2V0dGluZy10aXRsZS1wcmV2aWNvbntwYWRkaW5nOjAgMCAwIDEycHg7bWFyZ2luLXJpZ2h0Oi02cHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lciAub3ZwLXNldHRpbmctaXRlbTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsMC4xKX0ub3ZwLXNldHRpbmctcGFuZWwgLm92cC1zZXR0aW5nLWl0ZW0tY29udGFpbmVyIC5vdnAtc2V0dGluZy1pdGVtIC5vdnAtc2V0dGluZy1pdGVtLXRpdGxle3BhZGRpbmctbGVmdDoxMnB4fS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbS1jb250YWluZXIgLm92cC1zZXR0aW5nLWl0ZW0gLm92cC1zZXR0aW5nLWl0ZW0tbmV4dGljb257ZmxvYXQ6cmlnaHQ7cGFkZGluZy1yaWdodDoxMnB4O21hcmdpbi1sZWZ0Oi02cHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lciAub3ZwLXNldHRpbmctaXRlbSBzcGFuLm92cC1zZXR0aW5nLWl0ZW0tdmFsdWV7ZmxvYXQ6cmlnaHQ7cGFkZGluZy1yaWdodDoxMnB4fS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbS1jb250YWluZXIgLm92cC1zZXR0aW5nLWl0ZW0ub3ZwLXNldHRpbmctaXRlbS12YWx1ZSAub3ZwLXNldHRpbmctaXRlbS10aXRsZXttYXJnaW4tbGVmdDotNnB4fS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbS1jb250YWluZXIgLm92cC1zZXR0aW5nLWl0ZW0ub3ZwLXNldHRpbmctaXRlbS12YWx1ZSAub3ZwLXNldHRpbmctaXRlbS1jaGVja2Vke3BhZGRpbmctbGVmdDoxMnB4O3Zpc2liaWxpdHk6aGlkZGVufS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbS1jb250YWluZXIgLm92cC1zZXR0aW5nLWl0ZW0ub3ZwLXNldHRpbmctaXRlbS12YWx1ZSAub3ZwLXNldHRpbmctaXRlbS1jaGVja2VkLm92cC1zaG93e3Zpc2liaWxpdHk6dmlzaWJsZX0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbHtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjBweDtyaWdodDowcHg7Ym90dG9tOjBweDtoZWlnaHQ6NTBweDt6LWluZGV4OjYwOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuMjVzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7dHJhbnNpdGlvbjpvcGFjaXR5IC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKX0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLXByb2dyZXNzYmFyLWNvbnRhaW5lcntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCU7Ym90dG9tOjUwcHg7aGVpZ2h0OjRweDtjdXJzb3I6cG9pbnRlcn0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLXByb2dyZXNzYmFyLWNvbnRhaW5lciAub3ZwLXByb2dyZXNzYmFyLXBhZGRpbmd7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtoZWlnaHQ6MTZweDtib3R0b206MDt6LWluZGV4OjI4fS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtY29udHJvbHN7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7d2lkdGg6MTAwJTtoZWlnaHQ6NTBweDt0ZXh0LWFsaWduOmxlZnR9Lm92cC1jb250cm9scy1jb250YWluZXIgLm92cC1ib3R0b20tcGFuZWwgLm92cC1jb250cm9scyAub3ZwLWJ1dHRvbnttaW4td2lkdGg6MzBweDtoZWlnaHQ6MzBweDtjdXJzb3I6cG9pbnRlcn0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLWNvbnRyb2xzIC5vdnAtbGVmdC1jb250cm9sc3tmbG9hdDpsZWZ0O2hlaWdodDoxMDAlfS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtY29udHJvbHMgLm92cC1yaWdodC1jb250cm9sc3tmbG9hdDpyaWdodDtoZWlnaHQ6MTAwJX0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLWNvbnRyb2xzIC5vdnAtcmlnaHQtY29udHJvbHMgLm92cC1zZXR0aW5nLWJ1dHRvbntwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTBweDttYXJnaW4tcmlnaHQ6MTJweH0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLWNvbnRyb2xzIC5vdnAtcmlnaHQtY29udHJvbHMgLm92cC1zZXR0aW5nLWJ1dHRvbj5pe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1zaXplOjEwMCU7YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXNldHRpbmcuc3ZnXCIpKSArIFwiKX0ub3ZwLXByb2dyZXNzYmFye3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3otaW5kZXg6MzE7b3V0bGluZTpub25lfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wbGF5LWJhY2tncm91bmQtY29sb3J7YmFja2dyb3VuZC1jb2xvcjojNTBlM2MyfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzcy1saXN0e3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoxMDAlO2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwwLjIpO3otaW5kZXg6Mzl9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzLWxpc3QgLm92cC1sb2FkLXByb2dyZXNzLC5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzcy1saXN0IC5vdnAtcGxheS1wcm9ncmVzcywub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3MtbGlzdCAub3ZwLWhvdmVyLXByb2dyZXNze3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDtib3R0b206MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlOy1tb3otdHJhbnNmb3JtLW9yaWdpbjowIDA7LW1zLXRyYW5zZm9ybS1vcmlnaW46MCAwOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDA7dHJhbnNmb3JtLW9yaWdpbjowIDB9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzLWxpc3QgLm92cC1wbGF5LXByb2dyZXNze3dpZHRoOjA7ei1pbmRleDozNDstd2Via2l0LXRyYW5zaXRpb246d2lkdGggLjFzIGVhc2U7dHJhbnNpdGlvbjp3aWR0aCAuMXMgZWFzZX0ub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3MtbGlzdCAub3ZwLWxvYWQtcHJvZ3Jlc3N7d2lkdGg6MDt6LWluZGV4OjMzO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwwLjUpOy13ZWJraXQtdHJhbnNpdGlvbjp3aWR0aCAuNXMgZWFzZTt0cmFuc2l0aW9uOndpZHRoIC41cyBlYXNlfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzcy1saXN0IC5vdnAtaG92ZXItcHJvZ3Jlc3N7bGVmdDowO3dpZHRoOjA7ei1pbmRleDozNTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsMC42KX0ub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3NiYXIta25vYi1jb250YWluZXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOi01cHg7bGVmdDowcHg7ei1pbmRleDo0MzstbW96LXRyYW5zaXRpb246LW1vei10cmFuc2Zvcm0gLjFzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7LXdlYmtpdC10cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4xcyBjdWJpYy1iZXppZXIoLjQsIDAsIDEsIDEpOy1tcy10cmFuc2l0aW9uOi1tcy10cmFuc2Zvcm0gLjFzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjFzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7LW1vei10cmFuc2Zvcm06c2NhbGUoMCk7LW1zLXRyYW5zZm9ybTpzY2FsZSgwKTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzYmFyLWtub2ItY29udGFpbmVyIC5vdnAtcHJvZ3Jlc3NiYXIta25vYnt3aWR0aDoxNHB4O2hlaWdodDoxNHB4O2JvcmRlci1yYWRpdXM6N3B4Oy13ZWJraXQtdHJhbnNpdGlvbjp3aWR0aCAuMXMgZWFzZTt0cmFuc2l0aW9uOndpZHRoIC4xcyBlYXNlfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzc2Jhci10aW1le2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MTVweDtsZWZ0OmF1dG87d2lkdGg6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjgsMjgsMjgsMC45KTtib3JkZXItcmFkaXVzOjJweDtwYWRkaW5nOjVweCA5cHg7Zm9udC1zaXplOjExOCU7bGluZS1oZWlnaHQ6MTVweDt1c2VyLXNlbGVjdDpub25lfS5vdnAtcHJvZ3Jlc3NiYXItaG92ZXIgLm92cC1wcm9ncmVzc2Jhci1rbm9iLWNvbnRhaW5lcnstbW96LXRyYW5zZm9ybTpub25lOy1tcy10cmFuc2Zvcm06bm9uZTstd2Via2l0LXRyYW5zZm9ybTpub25lO3RyYW5zZm9ybTpub25lOy1tb3otdHJhbnNpdGlvbjotbW96LXRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTstd2Via2l0LXRyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjFzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7LW1zLXRyYW5zaXRpb246LW1zLXRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKX0ub3ZwLXByb2dyZXNzYmFyLWhvdmVyIC5vdnAtcHJvZ3Jlc3NiYXItdGltZXtkaXNwbGF5OmlubGluZS1ibG9ja30ub3ZwLW9uLWVycm9yIC5vdnAtcHJvZ3Jlc3NiYXItdGltZXtkaXNwbGF5Om5vbmV9Lm92cC1wbGF5LWJ1dHRvbntwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTBweDttYXJnaW4tbGVmdDoxNXB4fS5vdnAtcGxheS1idXR0b24+aXtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JhY2tncm91bmQtc2l6ZToxMDAlfS5vdnAtcGxheS1idXR0b24gLm92cC1wbGF5LWJ1dHRvbi1wbGF5aWNvbntiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItcGxheS5zdmdcIikpICsgXCIpfS5vdnAtcGxheS1idXR0b24gLm92cC1wbGF5LWJ1dHRvbi1wYXVzZWljb257YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXN0b3Auc3ZnXCIpKSArIFwiKX0ub3ZwLXZvbHVtZS1jb250cm9sbGVye2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxMHB4O21hcmdpbi1sZWZ0OjEycHg7aGVpZ2h0OjMwcHh9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1idXR0b24+aXtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JhY2tncm91bmQtc2l6ZToxMDAlfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtYnV0dG9uIC5vdnAtdm9sdW1lLWJ1dHRvbi1iaWdpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci12b2x1bWUuc3ZnXCIpKSArIFwiKX0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLWJ1dHRvbiAub3ZwLXZvbHVtZS1idXR0b24tc21hbGxpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci12b2x1bWUtMi5zdmdcIikpICsgXCIpfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtYnV0dG9uIC5vdnAtdm9sdW1lLWJ1dHRvbi1tdXRlaWNvbntiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItdm9sdW1lLW11dGUuc3ZnXCIpKSArIFwiKX0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MHB4O2hlaWdodDoxMDAlO292ZXJmbG93OmhpZGRlbjtjdXJzb3I6cG9pbnRlcjt1c2VyLXNlbGVjdDpub25lO291dGxpbmU6bm9uZTstbW96LXRyYW5zaXRpb246bWFyZ2luIC4ycyBjdWJpYy1iZXppZXIoLjQsIDAsIDEsIDEpLHdpZHRoIC4ycyBjdWJpYy1iZXppZXIoLjQsIDAsIDEsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSksd2lkdGggLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7dHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSksd2lkdGggLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSl9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyLmFjdGl2ZXt3aWR0aDo3MHB4O21hcmdpbi1sZWZ0OjhweDttYXJnaW4tcmlnaHQ6MDstbW96LXRyYW5zaXRpb246bWFyZ2luIC4ycyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpLHdpZHRoIC4ycyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSksd2lkdGggLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7dHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSksd2lkdGggLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSl9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlcntoZWlnaHQ6MTAwJTtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItYmcsLm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItdmFsdWV7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpibG9jaztsZWZ0OjA7dG9wOjUwJTtoZWlnaHQ6NHB4O21hcmdpbi10b3A6LTJweDtib3JkZXItcmFkaXVzOjEwcHh9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItYmd7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kOiNmZmZ9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItdmFsdWV7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kOiM1MGUzYzJ9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItaGFuZGxle3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDozMHB4O3dpZHRoOjEycHg7aGVpZ2h0OjEycHg7Ym9yZGVyLXJhZGl1czo2cHg7bWFyZ2luLXRvcDotNnB4O2JhY2tncm91bmQ6I2ZmZn0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci1oYW5kbGU6YmVmb3JlLC5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lciAub3ZwLXZvbHVtZS1zaWxkZXIgLm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZTphZnRlcntjb250ZW50OicnO3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6bm9uZTt0b3A6NTAlO2hlaWdodDo0cHg7bWFyZ2luLXRvcDotMnB4O3dpZHRoOjgwcHg7ei1pbmRleDotMX0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci1oYW5kbGU6YmVmb3Jle2xlZnQ6LTU4cHg7YmFja2dyb3VuZDojNTBlM2MyfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lciAub3ZwLXZvbHVtZS1zaWxkZXIgLm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZTphZnRlcntsZWZ0OjZweDtiYWNrZ3JvdW5kOiNmZmZ9Lm92cC10aW1lLWRpc3BsYXl7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7dG9wOjEwcHg7bWFyZ2luLWxlZnQ6MTJweDtoZWlnaHQ6MzBweDt3aGl0ZS1zcGFjZTpub3dyYXA7bGluZS1oZWlnaHQ6MzBweDt2ZXJ0aWNhbC1hbGlnbjp0b3A7Zm9udC1zaXplOjE0cHg7dXNlci1zZWxlY3Q6bm9uZX0ub3ZwLXRpbWUtZGlzcGxheSAub3ZwLXRpbWUtY3VycmVudCwub3ZwLXRpbWUtZGlzcGxheSAub3ZwLXRpbWUtc2VwYXJhdG9yLC5vdnAtdGltZS1kaXNwbGF5IC5vdnAtdGltZS1kdXJhdGlvbntjb2xvcjojZmZmfS5vdnAtdGltZS1kaXNwbGF5IC5vdnAtbGl2ZS1iYWRnZXtvcGFjaXR5OjE7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6YXV0bztmb250LXNpemU6MTRweH0ub3ZwLXRpbWUtZGlzcGxheSAub3ZwLWxpdmUtYmFkZ2U6YmVmb3Jle2JhY2tncm91bmQ6I2ZmMDAwMDtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LTJweDt3aWR0aDo2cHg7aGVpZ2h0OjZweDttYXJnaW4tcmlnaHQ6NXB4O2NvbnRlbnQ6Jyc7Ym9yZGVyLXJhZGl1czo2cHh9Lm92cC10aW1lLWRpc3BsYXkgLm92cC1saXZlLWJhZGdlIC5vdnAtbGl2ZS1iYWRnZS1sb3dsYXRlbmN5e2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1yaWdodDo1cHh9Lm92cC1jb250ZXh0LXBhbmVsey1tb3otYm94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveDtkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO292ZXJmbG93OmhpZGRlbjt3aWR0aDoyMDBweDtwYWRkaW5nOjZweCAwO2JhY2tncm91bmQ6cmdiYSgyOCwyOCwyOCwwLjkpO3RleHQtc2hhZG93OjAgMCAycHggcmdiYSgwLDAsMCwwLjUpO3otaW5kZXg6MjMwMDtmb250LWZhbWlseTpSb2JvdG8sQXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6MTAwO3VzZXItc2VsZWN0Om5vbmV9Lm92cC1jb250ZXh0LXBhbmVsOmJlZm9yZSwub3ZwLWNvbnRleHQtcGFuZWw6YWZ0ZXJ7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94fS5vdnAtY29udGV4dC1wYW5lbCAqLC5vdnAtY29udGV4dC1wYW5lbCAqOmJlZm9yZSwub3ZwLWNvbnRleHQtcGFuZWwgKjphZnRlcnstbW96LWJveC1zaXppbmc6Ym9yZGVyLWJveDstd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm92cC1jb250ZXh0LXBhbmVsIC5vdnAtY29udGV4dC1pdGVte3dpZHRoOjEwMCU7aGVpZ2h0OjM4cHg7cGFkZGluZy1sZWZ0OjEycHg7bGluZS1oZWlnaHQ6MzhweDtjb2xvcjojZWVlO2N1cnNvcjpwb2ludGVyO291dGxpbmU6bm9uZTtmb250LXNpemU6MTIwJX0ub3ZwLWNvbnRleHQtcGFuZWwgLm92cC1jb250ZXh0LWl0ZW06aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LDAuMSl9Lm92cC1mdWxsc2NyZWVuLWJ1dHRvbntwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTBweDttYXJnaW4tcmlnaHQ6MTVweH0ub3ZwLWZ1bGxzY3JlZW4tYnV0dG9uPml7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLXNpemU6MTAwJX0ub3ZwLWZ1bGxzY3JlZW4tYnV0dG9uIC5vdnAtZnVsbHNjcmVlbi1idXR0b24tZXhwYW5kaWNvbntiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItZnVsbHNjcmVlbi1leHBhbmQuc3ZnXCIpKSArIFwiKX0ub3ZwLWZ1bGxzY3JlZW4tYnV0dG9uIC5vdnAtZnVsbHNjcmVlbi1idXR0b24tY29tcHJlc3NpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1mdWxsc2NyZWVuLWNvbXByZXNzLnN2Z1wiKSkgKyBcIil9QGtleWZyYW1lcyBmYWRle2Zyb217b3BhY2l0eTouM301NSV7b3BhY2l0eToxfTc1JXtvcGFjaXR5OjF9dG97b3BhY2l0eTouM319QC13ZWJraXQta2V5ZnJhbWVzIHNoYWtle2Zyb20sdG97LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwgMCwgMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsIDAsIDApfTEwJSwzMCUsNTAlLDcwJSw5MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCl9MjAlLDQwJSw2MCUsODAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwcHgsIDAsIDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKX19QGtleWZyYW1lcyBzaGFrZXtmcm9tLHRvey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsIDAsIDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLCAwLCAwKX0xMCUsMzAlLDUwJSw3MCUsOTAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKC0xMHB4LCAwLCAwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApfTIwJSw0MCUsNjAlLDgwJXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTBweCwgMCwgMCl9fS5vdnAtcGxheWVyIC5zaGFrZXstd2Via2l0LWFuaW1hdGlvbi1uYW1lOnNoYWtlO2FuaW1hdGlvbi1uYW1lOnNoYWtlfUAtd2Via2l0LWtleWZyYW1lcyBib3VuY2VJbntmcm9tLDIwJSw0MCUsNjAlLDgwJSx0b3std2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246Y3ViaWMtYmV6aWVyKC4yMTUsIC42MSwgLjM1NSwgMSk7YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoLjIxNSwgLjYxLCAuMzU1LCAxKX0wJXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCguNSwgLjUsIC41KTt0cmFuc2Zvcm06c2NhbGUzZCguNSwgLjUsIC41KX0yMCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCgxLjEsIDEuMSwgMS4xKTt0cmFuc2Zvcm06c2NhbGUzZCgxLjEsIDEuMSwgMS4xKX00MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCguOSwgLjksIC45KTt0cmFuc2Zvcm06c2NhbGUzZCguOSwgLjksIC45KX02MCV7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoMS4wMywgMS4wMywgMS4wMyk7dHJhbnNmb3JtOnNjYWxlM2QoMS4wMywgMS4wMywgMS4wMyl9ODAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoLjk3LCAuOTcsIC45Nyk7dHJhbnNmb3JtOnNjYWxlM2QoLjk3LCAuOTcsIC45Nyl9dG97b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoMSwgMSwgMSk7dHJhbnNmb3JtOnNjYWxlM2QoMSwgMSwgMSl9fUBrZXlmcmFtZXMgYm91bmNlSW57ZnJvbSwyMCUsNDAlLDYwJSw4MCUsdG97LXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOmN1YmljLWJlemllciguMjE1LCAuNjEsIC4zNTUsIDEpO2FuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246Y3ViaWMtYmV6aWVyKC4yMTUsIC42MSwgLjM1NSwgMSl9MCV7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoLjMsIC4zLCAuMyk7dHJhbnNmb3JtOnNjYWxlM2QoLjMsIC4zLCAuMyl9MjAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoMS4xLCAxLjEsIDEuMSk7dHJhbnNmb3JtOnNjYWxlM2QoMS4xLCAxLjEsIDEuMSl9NDAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoLjksIC45LCAuOSk7dHJhbnNmb3JtOnNjYWxlM2QoLjksIC45LCAuOSl9NjAle29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKDEuMDMsIDEuMDMsIDEuMDMpO3RyYW5zZm9ybTpzY2FsZTNkKDEuMDMsIDEuMDMsIDEuMDMpfTgwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKC45NywgLjk3LCAuOTcpO3RyYW5zZm9ybTpzY2FsZTNkKC45NywgLjk3LCAuOTcpfXRve29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKDEsIDEsIDEpO3RyYW5zZm9ybTpzY2FsZTNkKDEsIDEsIDEpfX0ub3ZwLXBsYXllciAuYm91bmNlSW57LXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb246Ljc1czthbmltYXRpb24tZHVyYXRpb246Ljc1czstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmJvdW5jZUluO2FuaW1hdGlvbi1uYW1lOmJvdW5jZUlufUAtd2Via2l0LWtleWZyYW1lcyBmYWRlSW57ZnJvbXtvcGFjaXR5OjB9dG97b3BhY2l0eToxfX1Aa2V5ZnJhbWVzIGZhZGVJbntmcm9te29wYWNpdHk6MH10b3tvcGFjaXR5OjF9fS5vdnAtcGxheWVyIC5mYWRlSW57LXdlYmtpdC1hbmltYXRpb24tbmFtZTpmYWRlSW47YW5pbWF0aW9uLW5hbWU6ZmFkZUlufS5vdnAtcGxheWVyIC5hbmltYXRlZHstd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjoxczthbmltYXRpb24tZHVyYXRpb246MXM7LXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOmJvdGg7YW5pbWF0aW9uLWZpbGwtbW9kZTpib3RofUBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbil7Lm92cC1wbGF5ZXIgLmFuaW1hdGVkey13ZWJraXQtYW5pbWF0aW9uOnVuc2V0ICFpbXBvcnRhbnQ7YW5pbWF0aW9uOnVuc2V0ICFpbXBvcnRhbnQ7LXdlYmtpdC10cmFuc2l0aW9uOm5vbmUgIWltcG9ydGFudDt0cmFuc2l0aW9uOm5vbmUgIWltcG9ydGFudH19Lm92cC1jYXB0aW9uLXZpZXdlcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0ub3ZwLWNhcHRpb24tdmlld2VyIC5vdnAtY2FwdGlvbi10ZXh0LWNvbnRhaW5lcntwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206NjBweDt3aWR0aDoxMDAlO3BhZGRpbmc6MCAxMnB4O3RleHQtYWxpZ246Y2VudGVyOy1tb3otdHJhbnNpdGlvbjpib3R0b20gLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjpib3R0b20gLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpO3RyYW5zaXRpb246Ym90dG9tIC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKX0ub3ZwLWNhcHRpb24tdmlld2VyIC5vdnAtY2FwdGlvbi10ZXh0LWNvbnRhaW5lciAub3ZwLWNhcHRpb24tdGV4dHtkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjIyMCU7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDgsOCw4LDAuNzUpO2JvcmRlci1yYWRpdXM6M3B4O2NvbG9yOiNmZmY7cGFkZGluZzouMWVtIC4zZW07d29yZC13cmFwOmJyZWFrLXdvcmQ7bGluZS1oZWlnaHQ6MS41ZW07dXNlci1zZWxlY3Q6bm9uZX0ub3ZwLWNhcHRpb24tYnV0dG9ue3dpZHRoOjM2cHh9Lm92cC1jYXB0aW9uLWJ1dHRvbj5pe2ZvbnQtc2l6ZToxOHB4Oy1tb3otdHJhbnNpdGlvbjpjb2xvciAuMjVzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7LXdlYmtpdC10cmFuc2l0aW9uOmNvbG9yIC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTt0cmFuc2l0aW9uOmNvbG9yIC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKX0ub3ZwLWNhcHRpb24tYWN0aXZlIC5vdnAtY2FwdGlvbi1idXR0b24+aXtjb2xvcjojRjM2NDQ2fVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXNjYXBlKHVybCkge1xuICAgIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdXJsXG4gICAgfVxuICAgIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICAgIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgICAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICAgIH1cbiAgICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gICAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgICBpZiAoL1tcIicoKSBcXHRcXG5dLy50ZXN0KHVybCkpIHtcbiAgICAgICAgcmV0dXJuICdcIicgKyB1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKSArICdcIidcbiAgICB9XG5cbiAgICByZXR1cm4gdXJsXG59XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHBhc3NpbmcgZnVuY3Rpb24gaW4gb3B0aW9ucywgdGhlbiB1c2UgaXQgZm9yIHJlc29sdmUgXCJoZWFkXCIgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvLyBVc2VmdWwgZm9yIFNoYWRvdyBSb290IHN0eWxlIGkuZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgIGluc2VydEludG86IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vXCIpLnNoYWRvd1Jvb3QgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0VGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cbiIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvfFxccyokKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuIiwiLyogZ2xvYmFscyBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXyAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19hbWRfb3B0aW9uc19fO1xyXG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJek1DSWdhR1ZwWjJoMFBTSXpNQ0lnZG1sbGQwSnZlRDBpTUNBd0lETXdJRE13SWo0S0lDQWdJRHhuSUdacGJHdzlJbTV2Ym1VaUlHWnBiR3d0Y25Wc1pUMGlaWFpsYm05a1pDSWdjM1J5YjJ0bFBTSWpSa1pHSWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUlITjBjbTlyWlMxM2FXUjBhRDBpTWlJK0NpQWdJQ0FnSUNBZ1BIQmhkR2dnWkQwaVRUY2dNVGRvTm5ZMlRUSXpJREV6YUMwMlZqZE5NVGNnTVROc055MDNUVFlnTWpSc055MDNJaTgrQ2lBZ0lDQThMMmMrQ2p3dmMzWm5QZ289XCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l6TUNJZ2FHVnBaMmgwUFNJek1DSWdkbWxsZDBKdmVEMGlNQ0F3SURNd0lETXdJajRLSUNBZ0lEeG5JR1pwYkd3OUltNXZibVVpSUdacGJHd3RjblZzWlQwaVpYWmxibTlrWkNJZ2MzUnliMnRsUFNJalJrWkdJaUJ6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlITjBjbTlyWlMxc2FXNWxhbTlwYmowaWNtOTFibVFpSUhOMGNtOXJaUzEzYVdSMGFEMGlNaUkrQ2lBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRFNElEWm9OblkyVFRFeUlESTBTRFoyTFRaTk1qUWdObXd0TnlBM1RUWWdNalJzTnkwM0lpOCtDaUFnSUNBOEwyYytDand2YzNablBnbz1cIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXhNREFpSUdobGFXZG9kRDBpTVRBd0lpQjJhV1YzUW05NFBTSXdJREFnTVRBd0lERXdNQ0krQ2lBZ0lDQThaeUJtYVd4c1BTSnViMjVsSWlCbWFXeHNMWEoxYkdVOUltVjJaVzV2WkdRaVBnb2dJQ0FnSUNBZ0lEeGphWEpqYkdVZ1kzZzlJalV3SWlCamVUMGlOVEFpSUhJOUlqUTVJaUJ6ZEhKdmEyVTlJaU5HUmtZaUlITjBjbTlyWlMxM2FXUjBhRDBpTWlJdlBnb2dJQ0FnSUNBZ0lEeHdZWFJvSUdacGJHdzlJaU5HUmtZaUlHUTlJazAzTlNBMU1Fd3pOU0EzTlZZeU5Yb2lMejRLSUNBZ0lEd3ZaejRLUEM5emRtYytDZz09XCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l6TUNJZ2FHVnBaMmgwUFNJek1DSWdkbWxsZDBKdmVEMGlNQ0F3SURNd0lETXdJajRLSUNBZ0lEeHdZWFJvSUdacGJHdzlJbTV2Ym1VaUlHWnBiR3d0Y25Wc1pUMGlaWFpsYm05a1pDSWdjM1J5YjJ0bFBTSWpSa1pHSWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUlITjBjbTlyWlMxM2FXUjBhRDBpTWlJZ1pEMGlUVGtnTm13eE5DQTVMVEUwSURsNklpOCtDand2YzNablBnbz1cIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSTRNQ0lnYUdWcFoyaDBQU0k0TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRGd3SURnd0lqNE5DaUFnSUNBOFp5Qm1hV3hzUFNKdWIyNWxJaUJtYVd4c0xYSjFiR1U5SW1WMlpXNXZaR1FpSUhOMGNtOXJaVDBpSTBaR1JpSWdjM1J5YjJ0bExXeHBibVZqWVhBOUluSnZkVzVrSWlCemRISnZhMlV0YkdsdVpXcHZhVzQ5SW5KdmRXNWtJaUJ6ZEhKdmEyVXRkMmxrZEdnOUlqUWlQZzBLSUNBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOTVRVZ01qRXVNM1l4TXk0NGFERXpMamdpTHo0TkNpQWdJQ0FnSUNBZ1BIQmhkR2dnWkQwaVRUSXdMamMzTXlBME5pNDJZVEl3TGpjZ01qQXVOeUF3SURFZ01DQTBMamc1T1MweU1TNDFNamhNTVRVZ016VXVNU0l2UGcwS0lDQWdJRHd2Wno0TkNqd3ZjM1puUGcwS1wiIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJek1DSWdhR1ZwWjJoMFBTSXpNQ0lnZG1sbGQwSnZlRDBpTUNBd0lETXdJRE13SWo0S0lDQWdJRHhuSUdacGJHdzlJbTV2Ym1VaUlHWnBiR3d0Y25Wc1pUMGlaWFpsYm05a1pDSWdjM1J5YjJ0bFBTSWpSa1pHSWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUlITjBjbTlyWlMxM2FXUjBhRDBpTWlJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9OQ0EwS1NJK0NpQWdJQ0FnSUNBZ1BHTnBjbU5zWlNCamVEMGlNVEVpSUdONVBTSXhNU0lnY2owaU15SXZQZ29nSUNBZ0lDQWdJRHh3WVhSb0lHUTlJazB4T0M0MElERTBZVEV1TmpVZ01TNDJOU0F3SURBZ01DQXVNek1nTVM0NE1td3VNRFl1TURaaE1pQXlJREFnTVNBeExUSXVPRE1nTWk0NE0yd3RMakEyTFM0d05tRXhMalkxSURFdU5qVWdNQ0F3SURBdE1TNDRNaTB1TXpNZ01TNDJOU0F4TGpZMUlEQWdNQ0F3TFRFZ01TNDFNVll5TUdFeUlESWdNQ0F4SURFdE5DQXdkaTB1TURsQk1TNDJOU0F4TGpZMUlEQWdNQ0F3SURnZ01UZ3VOR0V4TGpZMUlERXVOalVnTUNBd0lEQXRNUzQ0TWk0ek0yd3RMakEyTGpBMllUSWdNaUF3SURFZ01TMHlMamd6TFRJdU9ETnNMakEyTFM0d05tRXhMalkxSURFdU5qVWdNQ0F3SURBZ0xqTXpMVEV1T0RJZ01TNDJOU0F4TGpZMUlEQWdNQ0F3TFRFdU5URXRNVWd5WVRJZ01pQXdJREVnTVNBd0xUUm9MakE1UVRFdU5qVWdNUzQyTlNBd0lEQWdNQ0F6TGpZZ09HRXhMalkxSURFdU5qVWdNQ0F3SURBdExqTXpMVEV1T0RKc0xTNHdOaTB1TURaaE1pQXlJREFnTVNBeElESXVPRE10TWk0NE0yd3VNRFl1TURaaE1TNDJOU0F4TGpZMUlEQWdNQ0F3SURFdU9ESXVNek5JT0dFeExqWTFJREV1TmpVZ01DQXdJREFnTVMweExqVXhWakpoTWlBeUlEQWdNU0F4SURRZ01IWXVNRGxoTVM0Mk5TQXhMalkxSURBZ01DQXdJREVnTVM0MU1TQXhMalkxSURFdU5qVWdNQ0F3SURBZ01TNDRNaTB1TXpOc0xqQTJMUzR3Tm1FeUlESWdNQ0F4SURFZ01pNDRNeUF5TGpnemJDMHVNRFl1TURaaE1TNDJOU0F4TGpZMUlEQWdNQ0F3TFM0ek15QXhMamd5VmpoakxqSTJMall3TkM0NE5USXVPVGszSURFdU5URWdNVWd5TUdFeUlESWdNQ0F4SURFZ01DQTBhQzB1TURsaE1TNDJOU0F4TGpZMUlEQWdNQ0F3TFRFdU5URWdNWG9pTHo0S0lDQWdJRHd2Wno0S1BDOXpkbWMrQ2c9PVwiIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE1EQWlJR2hsYVdkb2REMGlNVEF3SWlCMmFXVjNRbTk0UFNJd0lEQWdNVEF3SURFd01DSStDaUFnSUNBOFp5Qm1hV3hzUFNKdWIyNWxJaUJtYVd4c0xYSjFiR1U5SW1WMlpXNXZaR1FpUGdvZ0lDQWdJQ0FnSUR4amFYSmpiR1VnWTNnOUlqVXdJaUJqZVQwaU5UQWlJSEk5SWpRNUlpQnpkSEp2YTJVOUlpTkdSa1lpSUhOMGNtOXJaUzEzYVdSMGFEMGlNaUl2UGdvZ0lDQWdJQ0FnSUR4d1lYUm9JR1pwYkd3OUlpTkdSa1lpSUdROUlrMHpOU0F5T1dnM2RqUXlhQzAzZWswMU9DQXlPV2czZGpReWFDMDNlaUl2UGdvZ0lDQWdQQzluUGdvOEwzTjJaejRLXCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l6TUNJZ2FHVnBaMmgwUFNJek1DSWdkbWxsZDBKdmVEMGlNQ0F3SURNd0lETXdJajRLSUNBZ0lEeG5JR1pwYkd3OUltNXZibVVpSUdacGJHd3RjblZzWlQwaVpYWmxibTlrWkNJZ2MzUnliMnRsUFNJalJrWkdJaUJ6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlITjBjbTlyWlMxc2FXNWxhbTlwYmowaWNtOTFibVFpSUhOMGNtOXJaUzEzYVdSMGFEMGlNaUkrQ2lBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRFd0lEWjJNVGhOTWpBZ05uWXhPQ0l2UGdvZ0lDQWdQQzluUGdvOEwzTjJaejRLXCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l6TUNJZ2FHVnBaMmgwUFNJek1DSWdkbWxsZDBKdmVEMGlNQ0F3SURNd0lETXdJajROQ2lBZ0lDQThaeUJtYVd4c1BTSnViMjVsSWlCbWFXeHNMWEoxYkdVOUltVjJaVzV2WkdRaUlITjBjbTlyWlQwaUkwWkdSaUlnYzNSeWIydGxMV3hwYm1WallYQTlJbkp2ZFc1a0lpQnpkSEp2YTJVdGJHbHVaV3B2YVc0OUluSnZkVzVrSWlCemRISnZhMlV0ZDJsa2RHZzlJaklpUGcwS0lDQWdJQ0FnSUNBOGNHRjBhQ0JrUFNKTk9TQXhNVWcxZGpob05HdzJJRFZXTm5wTk1Ua3VOVFFnTVRFdU5EWmhOU0ExSURBZ01DQXhJREFnTnk0d055SXZQZzBLSUNBZ0lEd3ZaejROQ2p3dmMzWm5QZzBLXCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l6TUNJZ2FHVnBaMmgwUFNJek1DSWdkbWxsZDBKdmVEMGlNQ0F3SURNd0lETXdJajRLSUNBZ0lEeG5JR1pwYkd3OUltNXZibVVpSUdacGJHd3RjblZzWlQwaVpYWmxibTlrWkNJZ2MzUnliMnRsUFNJalJrWkdJaUJ6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlITjBjbTlyWlMxc2FXNWxhbTlwYmowaWNtOTFibVFpSUhOMGNtOXJaUzEzYVdSMGFEMGlNaUkrQ2lBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRrZ01URklOWFk0YURSc05pQTFWalo2VFRJMklERXliQzAySURaTk1qQWdNVEpzTmlBMklpOCtDaUFnSUNBOEwyYytDand2YzNablBnbz1cIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXpNQ0lnYUdWcFoyaDBQU0l6TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRE13SURNd0lqNEtJQ0FnSUR4bklHWnBiR3c5SW01dmJtVWlJR1pwYkd3dGNuVnNaVDBpWlhabGJtOWtaQ0lnYzNSeWIydGxQU0lqUmtaR0lpQnpkSEp2YTJVdGJHbHVaV05oY0QwaWNtOTFibVFpSUhOMGNtOXJaUzFzYVc1bGFtOXBiajBpY205MWJtUWlJSE4wY205clpTMTNhV1IwYUQwaU1pSStDaUFnSUNBZ0lDQWdQSEJoZEdnZ1pEMGlUVGtnTVRGSU5YWTRhRFJzTmlBMVZqWjZUVEl6TGpBM0lEY3VPVE5qTXk0NU1EUWdNeTQ1TURVZ015NDVNRFFnTVRBdU1qTTFJREFnTVRRdU1UUnRMVE11TlRNdE1UQXVOakZoTlNBMUlEQWdNQ0F4SURBZ055NHdOeUl2UGdvZ0lDQWdQQzluUGdvOEwzTjJaejRLXCIiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTUtMiEuL292ZW5wbGF5ZXIubGVzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTUtMiEuL292ZW5wbGF5ZXIubGVzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS01LTIhLi9vdmVucGxheWVyLmxlc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCIvL2ltcG9ydCBDYXB0aW9uTWFuYWdlciBmcm9tIFwiYXBpL2NhcHRpb24vTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29uZmlndXJhdG9yIGZyb20gXCJhcGkvQ29uZmlndXJhdG9yXCI7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IExhenlDb21tYW5kRXhlY3V0b3IgZnJvbSBcImFwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yXCI7XHJcbmltcG9ydCBMb2dNYW5hZ2VyIGZyb20gXCJ1dGlscy9sb2dnZXJcIjtcclxuaW1wb3J0IFBsYXlsaXN0TWFuYWdlciBmcm9tIFwiYXBpL3BsYXlsaXN0L01hbmFnZXJcIjtcclxuaW1wb3J0IFByb3ZpZGVyQ29udHJvbGxlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL0NvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFByb21pc2UsIHtyZXNvbHZlZH0gZnJvbSBcImFwaS9zaGltcy9wcm9taXNlXCI7XHJcbmltcG9ydCB7UkVBRFksIEVSUk9SLCBJTklUX0VSUk9SLCBERVNUUk9ZLCBORVRXT1JLX1VOU1RBQkxFRCwgUExBWUVSX0ZJTEVfRVJST1IsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcclxuaW1wb3J0IHtBcGlSdG1wRXhwYW5zaW9ufSBmcm9tICdhcGkvQXBpRXhwYW5zaW9ucyc7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBvYmplY3QgY29ubmVjdHMgVUkgdG8gdGhlIHByb3ZpZGVyLlxyXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb250YWluZXIgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcblxyXG5jb25zdCBBcGkgPSBmdW5jdGlvbihjb250YWluZXIpe1xyXG4gICAgbGV0IGxvZ01hbmFnZXIgPSBMb2dNYW5hZ2VyKCk7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiW1tPdmVuUGxheWVyXV0gdi5cIisgdmVyc2lvbik7XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgbG9hZGVkLlwiKTtcclxuICAgIC8vbGV0IGNhcHRpb25NYW5hZ2VyID0gQ2FwdGlvbk1hbmFnZXIodGhhdCk7XHJcbiAgIFxyXG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcigpO1xyXG4gICAgbGV0IHByb3ZpZGVyQ29udHJvbGxlciA9IFByb3ZpZGVyQ29udHJvbGxlcigpO1xyXG4gICAgbGV0IGN1cnJlbnRQcm92aWRlciA9IFwiXCI7XHJcbiAgICBsZXQgcGxheWVyQ29uZmlnID0gXCJcIjtcclxuICAgIGxldCBsYXp5UXVldWUgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0IGluaXRQcm92aWRlciA9IGZ1bmN0aW9uKGxhc3RQbGF5UG9zaXRpb24pe1xyXG4gICAgICAgIGNvbnN0IHBpY2tRdWFsaXR5RnJvbVNvdXJjZSA9IChzb3VyY2VzKSA9PntcclxuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSAwO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcXVhbGl0eTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gcHJvdmlkZXJDb250cm9sbGVyLmxvYWRQcm92aWRlcnMocGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCkpLnRoZW4oUHJvdmlkZXJzID0+IHtcclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgY3VycmVudFNvdXJjZUluZGV4ID0gcGlja1F1YWxpdHlGcm9tU291cmNlKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCBcImN1cnJlbnQgc291cmNlIGluZGV4IDogXCIrIGN1cnJlbnRTb3VyY2VJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAvL0NhbGwgUHJvdmlkZXIuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IFByb3ZpZGVyc1tjdXJyZW50U291cmNlSW5kZXhdKGNvbnRhaW5lciwgcGxheWVyQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlci5nZXROYW1lKCkgPT09IFBST1ZJREVSX1JUTVApe1xyXG4gICAgICAgICAgICAgICAgLy9JZiBwcm92aWRlciB0eXBlIGlzIFJUTVAsIHdlIGFjY2VwdHMgUnRtcEV4cGFuc2lvbi5cclxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhhdCwgQXBpUnRtcEV4cGFuc2lvbihjdXJyZW50UHJvdmlkZXIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9UaGlzIHBhc3NlcyB0aGUgZXZlbnQgY3JlYXRlZCBieSB0aGUgUHJvdmlkZXIgdG8gQVBJLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIub24oXCJhbGxcIiwgZnVuY3Rpb24obmFtZSwgZGF0YSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIobmFtZSwgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9BdXRvIG5leHQgc291cmNlIHdoZW4gcGxheWVyIGxvYWQgd2FzIGZhaWwgYnkgYW1pc3Mgc291cmNlLlxyXG4gICAgICAgICAgICAgICAgLy9kYXRhLmNvZGUgPT09IFBMQVlFUl9GSUxFX0VSUk9SXHJcbiAgICAgICAgICAgICAgICBpZiggKG5hbWUgPT09IEVSUk9SICYmIChwYXJzZUludChkYXRhLmNvZGUvMTAwKSA9PT0gMyB8fCBwYXJzZUludChkYXRhLmNvZGUvMTAwKSA9PT0gNSkpfHwgbmFtZSA9PT0gTkVUV09SS19VTlNUQUJMRUQgKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFF1YWxpdHkgPSB0aGF0LmdldEN1cnJlbnRRdWFsaXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY3VycmVudFF1YWxpdHkuaW5kZXgrMSA8IHRoYXQuZ2V0UXVhbGl0eUxldmVscygpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBzZXF1ZW50aWFsIGhhcyBhdmFpbGFibGUgc291cmNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5KGN1cnJlbnRRdWFsaXR5LmluZGV4KzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pLnRoZW4oKCk9PntcclxuXHJcbiAgICAgICAgICAgIC8vcHJvdmlkZXIncyBwcmVsb2FkKCkgaGF2ZSB0byBtYWRlIFByb21pc2UuIEN1eiBpdCBvdmVyY29tZXMgJ2ZsYXNoIGxvYWRpbmcgdGltaW5nIHByb2JsZW0nLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIucHJlbG9hZChwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSwgbGFzdFBsYXlQb3NpdGlvbiApLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5mbHVzaCgpO1xyXG4gICAgICAgICAgICAgICAgLy9UaGlzIGlzIG5vIHJlYXNvbiB0byBleGlzdCBhbnltb3JlLlxyXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUkVBRFkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3JPYmplY3QgPSB7Y29kZSA6IElOSVRfRVJST1IsIHJlYXNvbiA6IFwiaW5pdCBlcnJvci5cIiwgbWVzc2FnZSA6IFwiUGxheWVyIGluaXQgZXJyb3IuXCIsIGVycm9yIDogZXJyb3J9O1xyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIGVycm9yT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgIC8veHh4IDogSWYgeW91IGluaXQgZW1wdHkgc291cmNlcy4gKEkgdGhpbmsgdGhpcyBpcyBzdHJhbmdlIGNhc2UuKVxyXG4gICAgICAgICAgICAvL1RoaXMgd29ya3MgZm9yIHRoaXMgY2FzZS5cclxuICAgICAgICAgICAgLy9wbGF5ZXIgPSBPdmVuUGxheWVyLmNyZWF0ZShcImVsSWRcIiwge30pO1xyXG4gICAgICAgICAgICAvL3BsYXllci5sb2FkKHNvcnVjZXMpO1xyXG4gICAgICAgICAgICBsYXp5UXVldWUucmVtb3ZlQW5kRXhjdXRlT25jZShcImxvYWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFQSSDstIjquLDtmZQg7ZWo7IiYXHJcbiAgICAgKiBpbml0XHJcbiAgICAgKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zIHBsYXllciBpbml0aWFsIG9wdGlvbiB2YWx1ZS5cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiovXHJcbiAgICB0aGF0LmluaXQgPSAob3B0aW9ucykgPT57XHJcbiAgICAgICAgLy9JdCBjb2xsZWN0cyB0aGUgY29tbWFuZHMgYW5kIGV4ZWN1dGVzIHRoZW0gYXQgdGhlIHRpbWUgd2hlbiB0aGV5IGFyZSBleGVjdXRhYmxlLlxyXG4gICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydsb2FkJywncGxheScsJ3BhdXNlJywnc2VlaycsJ3N0b3AnLCAnZ2V0RHVyYXRpb24nLCAnZ2V0UG9zaXRpb24nLCAnZ2V0Vm9sdW1lJywgJ2dldE11dGUnLCAnZ2V0QnVmZmVyJywgJ2dldFN0YXRlJ10pO1xyXG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zKTtcclxuICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzRGVidWcoKSl7XHJcbiAgICAgICAgICAgIGxvZ01hbmFnZXIuZGlzYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KClcIik7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIGNvbmZpZyA6IFwiLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0UGxheWxpc3QocGxheWVyQ29uZmlnLmdldFBsYXlsaXN0KCkpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBzb3VyY2VzIDogXCIgLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XHJcbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qdGhhdC5nZXRDb250YWluZXJJZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXIuaWQ7XHJcbiAgICB9OyovXHJcblxyXG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q29uZmlnKClcIiwgcGxheWVyQ29uZmlnLmdldENvbmZpZygpKTtcclxuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldENvbmZpZygpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RHVyYXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQb3NpdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRWb2x1bWUoKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRWb2x1bWUoKSBcIiArIHZvbHVtZSk7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldFZvbHVtZSh2b2x1bWUpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0TXV0ZSgpIFwiICsgc3RhdGUpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0TXV0ZShzdGF0ZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0TXV0ZSgpIFwiICsgY3VycmVudFByb3ZpZGVyLmdldE11dGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5sb2FkID0gKHBsYXlsaXN0KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogbG9hZCgpIFwiLCBwbGF5bGlzdCk7XHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcclxuXHJcbiAgICAgICAgaWYocGxheWxpc3Qpe1xyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5zZXRQbGF5bGlzdChwbGF5bGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBsYXkoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBsYXkoKTtcclxuICAgIH1cclxuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGF1c2UoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2VlaygpIFwiKyBwb3NpdGlvbik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNlZWsocG9zaXRpb24pO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRQbGF5YmFja1JhdGUocGxheWVyQ29uZmlnLnNldERlZmF1bHRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQbGF5YmFja1JhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFF1YWxpdHlMZXZlbHMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRRdWFsaXR5KCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgXCIsIHF1YWxpdHlJbmRleCk7XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VzID0gcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW3RoYXQuZ2V0Q3VycmVudFF1YWxpdHkoKS5pbmRleF07XHJcbiAgICAgICAgbGV0IG5ld1NvdXJjZSA9IHNvdXJjZXNbcXVhbGl0eUluZGV4XTtcclxuICAgICAgICBsZXQgbGFzdFBsYXlQb3NpdGlvbiA9IHRoYXQuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgaXNTYW1lUHJvdmlkZXIgPSBwcm92aWRlckNvbnRyb2xsZXIuaXNTYW1lUHJvdmlkZXIoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKTtcclxuICAgICAgICAvLyBwcm92aWRlci5zZXJDdXJyZW50UXVhbGl0eSAtPiBwbGF5ZXJDb25maWcgc2V0dGluZyAtPiBsb2FkXHJcbiAgICAgICAgbGV0IHJlc1F1YWxpdHlJbmRleCA9IGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eShxdWFsaXR5SW5kZXgsIGlzU2FtZVByb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgaWYoIW5ld1NvdXJjZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBpc1NhbWVQcm92aWRlclwiLCBpc1NhbWVQcm92aWRlcik7XHJcblxyXG4gICAgICAgIGlmKCFpc1NhbWVQcm92aWRlcil7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5J10pO1xyXG4gICAgICAgICAgICBpbml0UHJvdmlkZXIobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzUXVhbGl0eUluZGV4O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiBDYXB0aW9ucyA6IFRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCB2ZXJzaW9uLiovXHJcbiAgICAvKnRoYXQuc2V0Q3VycmVudENhcHRpb24gPSAoaW5kZXgpID0+e1xyXG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5zZXRDdXJyZW50Q2FwdGlvbihpbmRleCk7XHJcbiAgICAgfVxyXG4gICAgIHRoYXQuZ2V0Q3VycmVudENhcHRpb24gPSAoKSA9PntcclxuICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q3VycmVudENhcHRpb24oKTtcclxuICAgICB9XHJcbiAgICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+IHtcclxuICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKTtcclxuICAgICB9XHJcbiAgICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PiB7XHJcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmFkZENhcHRpb24oKTtcclxuICAgICB9XHJcbiAgICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+IHtcclxuICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKTtcclxuICAgICB9Ki9cclxuXHJcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRCdWZmZXIoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFN0YXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zdG9wID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHN0b3AoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnN0b3AoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSBcIik7XHJcbiAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcclxuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm92aWRlckNvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgICAgIHBsYXlsaXN0TWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnID0gbnVsbDtcclxuICAgICAgICBsYXp5UXVldWUgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGF0LnRyaWdnZXIoREVTVFJPWSk7XHJcbiAgICAgICAgdGhhdC5vZmYoKTtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgLSBsYXp5UXVldWUsIGN1cnJlbnRQcm92aWRlciwgcHJvdmlkZXJDb250cm9sbGVyLCBwbGF5bGlzdE1hbmFnZXIsIHBsYXllckNvbmZpZywgYXBpIGV2ZW50IGRlc3Ryb2VkLiBcIik7XHJcbiAgICAgICAgbG9nTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgbG9nTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIodGhhdC5nZXRDb250YWluZXJJZCgpKTtcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBpO1xyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBBcGlSdG1wRXhwYW5zaW9uID0gZnVuY3Rpb24oY3VycmVudFByb3ZpZGVyKXtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZXh0ZXJuYWxDYWxsYmFja0NyZWVwIDogKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBpZihyZXN1bHQubmFtZSAmJiByZXN1bHQuZGF0YSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbChyZXN1bHQubmFtZSwgcmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGluaXRpYWxpemVzIHRoZSBpbnB1dCBvcHRpb25zLlxyXG4gKiBAcGFyYW0gICBvcHRpb25zXHJcbiAqXHJcbiAqICovXHJcbmNvbnN0IENvbmZpZ3VyYXRvciA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG5cclxuICAgIGNvbnN0IGNvbXBvc2VTb3VyY2VPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucyl7XHJcbiAgICAgICAgY29uc3QgRGVmYXVsdHMgPSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRQbGF5YmFja1JhdGU6IDEsXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZUNvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgICAgICAgcGxheWJhY2tSYXRlczogWzAuMjUsIDAuNSwgMSwgMS41LCAyXSxcclxuICAgICAgICAgICAgbXV0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZvbHVtZTogOTAsXHJcbiAgICAgICAgICAgIHdpZHRoOiA2NDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMzYwXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemUgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPCA2KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VWYWwgPSB2YWwudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ2ZhbHNlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oTnVtYmVyKHZhbCkpICYmICFpc05hTihwYXJzZUZsb2F0KHZhbCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcih2YWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRlc2VyaWFsaXplID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnaWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gc2VyaWFsaXplKG9wdGlvbnNba2V5XSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBub3JtYWxpemVTaXplID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICBpZiAodmFsLnNsaWNlICYmIHZhbC5zbGljZSgtMikgPT09ICdweCcpIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IHZhbC5zbGljZSgwLCAtMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZXZhbHVhdGVBc3BlY3RSYXRpbyA9IGZ1bmN0aW9uIChhciwgd2lkdGgpIHtcclxuICAgICAgICAgICAgaWYgKHdpZHRoLnRvU3RyaW5nKCkuaW5kZXhPZignJScpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhciAhPT0gJ3N0cmluZycgfHwgIWFyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoL15cXGQqXFwuP1xcZCslJC8udGVzdChhcikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFyLmluZGV4T2YoJzonKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgdyA9IHBhcnNlRmxvYXQoYXIuc3Vic3RyKDAsIGluZGV4KSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGggPSBwYXJzZUZsb2F0KGFyLnN1YnN0cihpbmRleCArIDEpKTtcclxuICAgICAgICAgICAgaWYgKHcgPD0gMCB8fCBoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAoaCAvIHcgKiAxMDApICsgJyUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZXNlcmlhbGl6ZShvcHRpb25zKTtcclxuICAgICAgICBsZXQgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdHMsIG9wdGlvbnMpO1xyXG4gICAgICAgIGNvbmZpZy53aWR0aCA9IG5vcm1hbGl6ZVNpemUoY29uZmlnLndpZHRoKTtcclxuICAgICAgICBjb25maWcuaGVpZ2h0ID0gbm9ybWFsaXplU2l6ZShjb25maWcuaGVpZ2h0KTtcclxuICAgICAgICBjb25maWcuYXNwZWN0cmF0aW8gPSBldmFsdWF0ZUFzcGVjdFJhdGlvKGNvbmZpZy5hc3BlY3RyYXRpbywgY29uZmlnLndpZHRoKTtcclxuXHJcbiAgICAgICAgbGV0IHJhdGVDb250cm9scyA9IGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scztcclxuICAgICAgICBpZiAocmF0ZUNvbnRyb2xzKSB7XHJcbiAgICAgICAgICAgIGxldCByYXRlcyA9IGNvbmZpZy5wbGF5YmFja1JhdGVzO1xyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmF0ZUNvbnRyb2xzKSkge1xyXG4gICAgICAgICAgICAgICAgcmF0ZXMgPSByYXRlQ29udHJvbHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmF0ZXMgPSByYXRlcy5maWx0ZXIocmF0ZSA9PiBfLmlzTnVtYmVyKHJhdGUpICYmIHJhdGUgPj0gMC4yNSAmJiByYXRlIDw9IDQpXHJcbiAgICAgICAgICAgICAgICAubWFwKHJhdGUgPT4gTWF0aC5yb3VuZChyYXRlICogNCkgLyA0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyYXRlcy5pbmRleE9mKDEpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmF0ZXMucHVzaCgxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByYXRlcy5zb3J0KCk7XHJcblxyXG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlcyA9IHJhdGVzO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICghY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzIHx8IGNvbmZpZy5wbGF5YmFja1JhdGVzLmluZGV4T2YoY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUpIDwgMCkge1xyXG4gICAgICAgICAgICBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25maWcucGxheWJhY2tSYXRlID0gY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGU7XHJcblxyXG4gICAgICAgIGlmICghY29uZmlnLmFzcGVjdHJhdGlvKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWcuYXNwZWN0cmF0aW87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb25maWdQbGF5bGlzdCA9IGNvbmZpZy5wbGF5bGlzdDtcclxuICAgICAgICBpZiAoIWNvbmZpZ1BsYXlsaXN0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IF8ucGljayhjb25maWcsIFtcclxuICAgICAgICAgICAgICAgICd0aXRsZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3R5cGUnLFxyXG4gICAgICAgICAgICAgICAgJ21lZGlhaWQnLFxyXG4gICAgICAgICAgICAgICAgJ2ltYWdlJyxcclxuICAgICAgICAgICAgICAgICdmaWxlJyxcclxuICAgICAgICAgICAgICAgICdzb3VyY2VzJyxcclxuICAgICAgICAgICAgICAgICd0cmFja3MnLFxyXG4gICAgICAgICAgICAgICAgJ3ByZWxvYWQnLFxyXG4gICAgICAgICAgICAgICAgJ2R1cmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICdob3N0JyxcclxuICAgICAgICAgICAgICAgICdhcHBsaWNhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnc3RyZWFtJ1xyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IFsgb2JqIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoY29uZmlnUGxheWxpc3QucGxheWxpc3QpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5mZWVkRGF0YSA9IGNvbmZpZ1BsYXlsaXN0O1xyXG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBjb25maWdQbGF5bGlzdC5wbGF5bGlzdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlbGV0ZSBjb25maWcuZHVyYXRpb247XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH07XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDb25maWd1cmF0b3IgbG9hZGVkLlwiLCBvcHRpb25zKTtcclxuICAgIGxldCBjb25maWcgPSBjb21wb3NlU291cmNlT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICBsZXQgYXNwZWN0cmF0aW8gPSBjb25maWcuYXNwZWN0cmF0aW8gfHwgXCIxNjo5XCI7XHJcbiAgICBsZXQgZGVidWcgPSBjb25maWcuZGVidWc7XHJcbiAgICBsZXQgZGVmYXVsdFBsYXliYWNrUmF0ZSA9IGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlIHx8IDE7XHJcbiAgICBsZXQgaW1hZ2UgPSBjb25maWcuaW1hZ2U7XHJcbiAgICBsZXQgcGxheWJhY2tSYXRlQ29udHJvbHMgPSBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgfHwgdHJ1ZTtcclxuICAgIGxldCBwbGF5YmFja1JhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXMgfHwgWzAuNSwgMSwgMS4yNSwgMS41LCAyXTtcclxuICAgIGxldCBwbGF5bGlzdCA9IGNvbmZpZy5wbGF5bGlzdCB8fCBbXTtcclxuICAgIGxldCBxdWFsaXR5TGFiZWwgPSBjb25maWcucXVhbGl0eUxhYmVsIHx8IFwiXCI7XHJcbiAgICBsZXQgcmVwZWF0ID0gY29uZmlnLnJlcGVhdCB8fCBmYWxzZTtcclxuICAgIGxldCBzdHJldGNoaW5nID0gY29uZmlnLnN0cmV0Y2hpbmcgfHwgJ3VuaWZvcm0nO1xyXG5cclxuXHJcblxyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7cmV0dXJuIGNvbmZpZzt9O1xyXG5cclxuICAgIHRoYXQuZ2V0QXNwZWN0cmF0aW8gPSgpPT57cmV0dXJuIGFzcGVjdHJhdGlvO307XHJcbiAgICB0aGF0LnNldEFzcGVjdHJhdGlvID0oYXNwZWN0cmF0aW9fKT0+e2FzcGVjdHJhdGlvID0gYXNwZWN0cmF0aW9fO307XHJcblxyXG4gICAgdGhhdC5pc0RlYnVnID0oKT0+e3JldHVybiBkZWJ1Zzt9O1xyXG5cclxuICAgIHRoYXQuZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KCk9PntyZXR1cm4gZGVmYXVsdFBsYXliYWNrUmF0ZTt9O1xyXG4gICAgdGhhdC5zZXREZWZhdWx0UGxheWJhY2tSYXRlID0ocGxheWJhY2tSYXRlKT0+e2RlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7IHJldHVybiBwbGF5YmFja1JhdGU7fTtcclxuXHJcbiAgICB0aGF0LmdldFF1YWxpdHlMYWJlbCA9ICgpID0+IHtyZXR1cm4gcXVhbGl0eUxhYmVsO307XHJcbiAgICB0aGF0LnNldFF1YWxpdHlMYWJlbCA9IChuZXdMYWJlbCkgPT4ge3F1YWxpdHlMYWJlbCA9IG5ld0xhYmVsO307XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGVzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVzO307XHJcbiAgICB0aGF0LmlzUGxheWJhY2tSYXRlQ29udHJvbHMgPSgpPT57cmV0dXJuIHBsYXliYWNrUmF0ZUNvbnRyb2xzO307XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9KCk9PntyZXR1cm4gcGxheWxpc3Q7fTtcclxuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdF8gKT0+e1xyXG4gICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdF8pKXtcclxuICAgICAgICAgICAgcGxheWxpc3QgPSBwbGF5bGlzdF87XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHBsYXlsaXN0ID0gW3BsYXlsaXN0X107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwbGF5bGlzdDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc1JlcGVhdCA9KCk9PntyZXR1cm4gcmVwZWF0O307XHJcblxyXG4gICAgdGhhdC5nZXRTdHJldGNoaW5nID0oKT0+e3JldHVybiBzdHJldGNoaW5nO307XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWd1cmF0b3I7XHJcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDMuLlxuICovXG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBtb2R1bGUgcHJvdmlkZSBjdXN0b20gZXZlbnRzLlxuICogQHBhcmFtICAgb2JqZWN0ICAgIEFuIG9iamVjdCB0aGF0IHJlcXVpcmVzIGN1c3RvbSBldmVudHMuXG4gKlxuICogKi9cblxuY29uc3QgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24ob2JqZWN0KXtcbiAgICBsZXQgdGhhdCA9IG9iamVjdDtcbiAgICBsZXQgX2V2ZW50cyA9W107XG5cbiAgICBjb25zdCB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzLCBjb250ZXh0KXtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgbGVuZ3RoID0gZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgIGxldCBldmVudCA9IGV2ZW50c1tpXTtcbiAgICAgICAgICAgIGV2ZW50Lmxpc3RlbmVyLmFwcGx5KCAoIGV2ZW50LmNvbnRleHQgfHwgY29udGV4dCApLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0Lm9uID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICAoX2V2ZW50c1tuYW1lXSB8fCAoX2V2ZW50c1tuYW1lXT1bXSkgKS5wdXNoKHsgbGlzdGVuZXI6IGxpc3RlbmVyICAsIGNvbnRleHQgOiBjb250ZXh0fSk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgdGhhdC50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSl7XG4gICAgICAgIGlmKCFfZXZlbnRzKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xuICAgICAgICBjb25zdCBhbGxFdmVudHMgPSBfZXZlbnRzLmFsbDtcblxuICAgICAgICBpZihldmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MsIHRoYXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGFsbEV2ZW50cyl7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIGlmKCFfZXZlbnRzKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbmFtZSAmJiAhbGlzdGVuZXIgJiYgIWNvbnRleHQpICB7XG4gICAgICAgICAgICBfZXZlbnRzID0gW107XG4gICAgICAgICAgICByZXR1cm4gdGhhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5hbWVzID0gbmFtZSA/IFtuYW1lXSA6IE9iamVjdC5rZXlzKF9ldmVudHMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXRhaW4gPSBfZXZlbnRzW25hbWVdID0gW107XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyICB8fCBjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIubGlzdGVuZXIgICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5fY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldmVudC5jb250ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgfTtcbiAgICB0aGF0Lm9uY2UgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IG9uY2VDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGNvdW50KyspIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0Lm9mZihuYW1lLCBvbmNlQ2FsbGJhY2spO1xuICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgICAgb25jZUNhbGxiYWNrLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhhdC5vbihuYW1lLCBvbmNlQ2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRFbWl0dGVyOyIsImltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgZXhlY3V0ZXMgdGhlIGlucHV0IGNvbW1hbmRzIGF0IGEgc3BlY2lmaWMgcG9pbnQgaW4gdGltZS5cbiAqIEBwYXJhbSAgIGluc3RhbmNlXG4gKiBAcGFyYW0gICBxdWV1ZWRDb21tYW5kc1xuICogKi9cbmNvbnN0IExhenlDb21tYW5kRXhlY3V0b3IgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIHF1ZXVlZENvbW1hbmRzKSB7XG4gICAgbGV0IGNvbW1hbmRRdWV1ZSA9IFtdO1xuICAgIGxldCB1bmRlY29yYXRlZE1ldGhvZHMgPSB7fTtcbiAgICBsZXQgZXhlY3V0ZU1vZGUgPSBmYWxzZTtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgbG9hZGVkLlwiKTtcbiAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IGluc3RhbmNlW2NvbW1hbmRdO1xuICAgICAgICB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF0gPSBtZXRob2QgfHwgZnVuY3Rpb24oKXt9O1xuXG4gICAgICAgIGluc3RhbmNlW2NvbW1hbmRdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgICAgICAgaWYgKCFleGVjdXRlTW9kZSkge1xuICAgICAgICAgICAgICAgIC8vY29tbWFuZFF1ZXVlLnB1c2goeyBjb21tYW5kLCBhcmdzIH0pO1xuICAgICAgICAgICAgICAgIHRoYXQuYWRkUXVldWUoY29tbWFuZCwgYXJncylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzKCk7XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2QuYXBwbHkodGhhdCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuICAgIHZhciBleGVjdXRlUXVldWVkQ29tbWFuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdoaWxlIChjb21tYW5kUXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgeyBjb21tYW5kLCBhcmdzIH0gPSBjb21tYW5kUXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICh1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF0gfHwgaW5zdGFuY2VbY29tbWFuZF0pLmFwcGx5KGluc3RhbmNlLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoYXQuc2V0RXhlY3V0ZU1vZGUgPSAobW9kZSkgPT4ge1xuICAgICAgICBleGVjdXRlTW9kZSA9IG1vZGU7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBzZXRFeGVjdXRlTW9kZSgpXCIsIG1vZGUpO1xuICAgIH07XG4gICAgdGhhdC5nZXRVbmRlY29yYXRlZE1ldGhvZHMgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0VW5kZWNvcmF0ZWRNZXRob2RzKClcIiwgdW5kZWNvcmF0ZWRNZXRob2RzKTtcbiAgICAgICAgcmV0dXJuIHVuZGVjb3JhdGVkTWV0aG9kcztcbiAgICB9XG4gICAgdGhhdC5nZXRRdWV1ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRRdWV1ZSgpXCIsIGdldFF1ZXVlKTtcbiAgICAgICAgcmV0dXJuIGNvbW1hbmRRdWV1ZTtcbiAgICB9XG4gICAgdGhhdC5hZGRRdWV1ZSA9IGZ1bmN0aW9uKGNvbW1hbmQsIGFyZ3Mpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogYWRkUXVldWUoKVwiLCBjb21tYW5kLCBhcmdzKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLnB1c2goeyBjb21tYW5kLCBhcmdzIH0pO1xuICAgIH1cblxuICAgIHRoYXQuZmx1c2ggPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZmx1c2goKVwiKTtcbiAgICAgICAgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzKCk7XG4gICAgfTtcbiAgICB0aGF0LmVtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBlbXB0eSgpXCIpO1xuICAgICAgICBjb21tYW5kUXVldWUubGVuZ3RoID0gMDtcbiAgICB9O1xuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBvZmYoKVwiKTtcbiAgICAgICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRdID0gbWV0aG9kO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIC8vUnVuIG9uY2UgYXQgdGhlIGVuZFxuICAgIHRoYXQucmVtb3ZlQW5kRXhjdXRlT25jZSA9IGZ1bmN0aW9uKGNvbW1hbmRfKXtcbiAgICAgICAgbGV0IGNvbW1hbmRRdWV1ZUl0ZW0gPSBfLmZpbmRXaGVyZShjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHJlbW92ZUFuZEV4Y3V0ZU9uY2UoKVwiLCBjb21tYW5kXyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5zcGxpY2UoXy5maW5kSW5kZXgoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSksIDEpO1xuXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kX107XG4gICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInJlbW92ZUNvbW1hbmQoKVwiKTtcbiAgICAgICAgICAgIGlmKGNvbW1hbmRRdWV1ZUl0ZW0pe1xuICAgICAgICAgICAgICAgIChtZXRob2R8fCBpbnN0YW5jZVtjb21tYW5kX10pLmFwcGx5KGluc3RhbmNlLCBjb21tYW5kUXVldWVJdGVtLmFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF9dID0gbWV0aG9kO1xuICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kX107XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBkZXN0cm95KClcIik7XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgICAgIHRoYXQuZW1wdHkoKTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBMYXp5Q29tbWFuZEV4ZWN1dG9yOyIsImltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNofSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBmaW5kcyB0aGUgcHJvdmlkZXIgdGhhdCBtYXRjaGVzIHRoZSBpbnB1dCBzb3VyY2UuXHJcbiAqIEBwYXJhbVxyXG4gKiAqL1xyXG5cclxuY29uc3QgU3VwcG9ydENoZWNrZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgbG9hZGVkLlwiKTtcclxuICAgIGNvbnN0IHN1cHBvcnRMaXN0ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2h0bWw1JyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWFjOiAnYXVkaW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtcDQ6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbTR2OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtb3Y6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wZWc6ICdhdWRpby9tcGVnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ3Y6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2dhOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICB2b3JiaXM6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcclxuICAgICAgICAgICAgICAgICAgICBmNGE6ICd2aWRlby9hYWMnLFxyXG4gICAgICAgICAgICAgICAgICAgIG0zdTg6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhsczogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgaWYoIXR5cGUpe3JldHVybiBmYWxzZTt9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IHNvdXJjZS5taW1lVHlwZSB8fCBNaW1lVHlwZXNbdHlwZV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbWltZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdmlkZW8uY2FuUGxheVR5cGUobWltZVR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd3ZWJydGMnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdkYXNoJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9tcGQgYXBwbGljYXRpb24vZGFzaCt4bWxcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0Rhc2goZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnaGxzJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgbWV0aG9kIGZyb20gaGxzLmpzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0hsc1N1cHBvcnQgPSAoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TWVkaWFTb3VyY2UoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5NZWRpYVNvdXJjZSB8fCB3aW5kb3cuV2ViS2l0TWVkaWFTb3VyY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lZGlhU291cmNlID0gZ2V0TWVkaWFTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyID0gd2luZG93LlNvdXJjZUJ1ZmZlciB8fCB3aW5kb3cuV2ViS2l0U291cmNlQnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1R5cGVTdXBwb3J0ZWQgPSBtZWRpYVNvdXJjZSAmJiB0eXBlb2YgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkID09PSAnZnVuY3Rpb24nICYmIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSxtcDRhLjQwLjJcIicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBTb3VyY2VCdWZmZXIgaXMgZXhwb3NlZCBlbnN1cmUgaXRzIEFQSSBpcyB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNhZmFyaSBhbmQgb2xkIHZlcnNpb24gb2YgQ2hyb21lIGRvZSBub3QgZXhwb3NlIFNvdXJjZUJ1ZmZlciBnbG9iYWxseSBzbyBjaGVja2luZyBTb3VyY2VCdWZmZXIucHJvdG90eXBlIGlzIGltcG9zc2libGVcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyVmFsaWRBUEkgPSAhc291cmNlQnVmZmVyIHx8IHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUuYXBwZW5kQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLnJlbW92ZSA9PT0gJ2Z1bmN0aW9uJztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFpc1R5cGVTdXBwb3J0ZWQgJiYgISFzb3VyY2VCdWZmZXJWYWxpZEFQSTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSB0aGlzICchIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpJyBpZiB5b3Ugd2FudCB0byB1c2UgaGxzanMuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNIbHNTdXBwb3J0KCkgJiYgISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAncnRtcCcsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSA9IChzb3J1Y2VfKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoKVwiLCBzb3J1Y2VfKTtcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSAoc29ydWNlXyA9PT0gT2JqZWN0KHNvcnVjZV8pKSA/IHNvcnVjZV8gOiB7fTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3VwcG9ydExpc3QubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgaWYoc3VwcG9ydExpc3RbaV0uY2hlY2tTdXBwb3J0KHNvdXJjZSkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRMaXN0W2ldLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QgPSAocGxheWxpc3RfKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QoKVwiLCBwbGF5bGlzdF8pO1xyXG4gICAgICAgIGxldCBzdXBwb3J0TmFtZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gcGxheWxpc3RfLmxlbmd0aDsgaS0tOykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gcGxheWxpc3RfW2ldO1xyXG4gICAgICAgICAgICBsZXQgc291cmNlID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGl0ZW0uc291cmNlcy5sZW5ndGg7IGogKyspe1xyXG4gICAgICAgICAgICAgICAgc291cmNlID0gaXRlbS5zb3VyY2VzW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0TmFtZXMucHVzaChzdXBwb3J0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3VwcG9ydE5hbWVzO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3VwcG9ydENoZWNrZXI7XHJcbiIsIi8vIFNUQVRFXHJcbmV4cG9ydCBjb25zdCBTVEFURV9CVUZGRVJJTkcgPSAnYnVmZmVyaW5nJztcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0lETEUgPSAnaWRsZSc7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9DT01QTEVURSA9ICdjb21wbGV0ZSc7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9QQVVTRUQgPSAncGF1c2VkJztcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1BMQVlJTkcgPSAncGxheWluZyc7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9FUlJPUiA9ICdlcnJvcic7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9MT0FESU5HID0gJ2xvYWRpbmcnO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfU1RBTExFRCA9ICdzdGFsbGVkJztcclxuXHJcblxyXG4vLyBQUk9WSURFUlxyXG5leHBvcnQgY29uc3QgUFJPVklERVJfSFRNTDUgPSAnaHRtbDUnO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfV0VCUlRDID0gJ3dlYnJ0Yyc7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9EQVNIID0gJ2Rhc2gnO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfSExTID0gJ2hscyc7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9SVE1QID0gJ3J0bXAnO1xyXG5cclxuLy8gRVZFTlRTXHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XHJcbmV4cG9ydCBjb25zdCBSRUFEWSA9ICdyZWFkeSc7XHJcbmV4cG9ydCBjb25zdCBERVNUUk9ZID0gJ2Rlc3Ryb3knO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLID0gJ3NlZWsnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9CVUZGRVJfRlVMTCA9ICdidWZmZXJGdWxsJztcclxuZXhwb3J0IGNvbnN0IERJU1BMQVlfQ0xJQ0sgPSAnZGlzcGxheUNsaWNrJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTE9BREVEID0gJ2xvYWRlZCc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NFRUtFRCA9ICdzZWVrZWQnO1xyXG5leHBvcnQgY29uc3QgTkVUV09SS19VTlNUQUJMRUQgPSAndW5zdGFibGVOZXR3b3JrJztcclxuXHJcbmV4cG9ydCBjb25zdCBFUlJPUiA9ICdlcnJvcic7XHJcblxyXG4vLyBTVEFURSBPRiBQTEFZRVJcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9TVEFURSA9ICdzdGF0ZUNoYW5nZWQnO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfUEFVU0UgPSAncGF1c2UnO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1BMQVkgPSAncGxheSc7XHJcblxyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9CVUZGRVIgPSAnYnVmZmVyQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUUgPSAndGltZSc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1JBVEVfQ0hBTkdFID0gJ3JhdGVjaGFuZ2UnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9WT0xVTUUgPSAndm9sdW1lQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX01VVEUgPSAnbXV0ZSc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX01FVEEgPSAnbWV0YUNoYW5nZWQnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9MRVZFTFMgPSAncXVhbGl0eUxldmVsQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMX0NIQU5HRUQgPSAnY3VycmVudFF1YWxpdHlMZXZlbENoYW5nZWQnO1xyXG5leHBvcnQgY29uc3QgUExBWUJBQ0tfUkFURV9DSEFOR0VEID0gJ3BsYXliYWNrUmF0ZUNoYW5nZWQnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEID0gJ2N1ZUNoYW5nZWQnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQgPSAnY2FwdGlvbkNoYW5nZWQnO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBJTklUX0VSUk9SID0gMTAwO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fRVJST1IgPSAzMDA7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IgPSAzMDE7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SID0gMzAyO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SID0gMzAzO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0ZJTEVfRVJST1IgPSAzMDQ7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ0FQVElPTl9FUlJPUiA9IDMwNTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfRVJST1IgPSA1MDE7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCA9IDUwMjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiA9IDUwMztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SID0gNTA0O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SID0gNTA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiA9IDUwNjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XID0gNTEwO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5pbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaCB9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9uICx0cmltfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3RyaW5nc1wiO1xyXG5pbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcIi4uL1N1cHBvcnRDaGVja2VyXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIFBsYXlsaXN0IG9yIFNvdXJjZXMuXHJcbiAqIEBwYXJhbVxyXG4gKlxyXG4gKiAqL1xyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCBjdXJyZW50UGxheWxpc3QgPSBbXTtcclxuICAgIGxldCBzdXBwb3J0Q2hlY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGxvYWRlZC5cIik7XHJcblxyXG4gICAgY29uc3QgbWFrZVByZXR0eVNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZV8pe1xyXG4gICAgICAgIGlmICghc291cmNlXyB8fCAhc291cmNlXy5maWxlICYmICEoc291cmNlXy5ob3N0IHx8IHNvdXJjZV8uYXBwbGljYXRpb24gfHwgc291cmNlXy5zdHJlYW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2UgPSBPYmplY3QuYXNzaWduKHt9LCB7ICdkZWZhdWx0JzogZmFsc2UgfSwgc291cmNlXyk7XHJcbiAgICAgICAgc291cmNlLmZpbGUgPSB0cmltKCcnICsgc291cmNlLmZpbGUpO1xyXG5cclxuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS5maWxlID0gc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL3N0cmVhbS9cIiArIHNvdXJjZS5zdHJlYW07XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuaG9zdDtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5hcHBsaWNhdGlvbjtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5zdHJlYW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtaW1ldHlwZVJlZ0V4ID0gL15bXi9dK1xcLyg/OngtKT8oW14vXSspJC87XHJcblxyXG4gICAgICAgIGlmIChtaW1ldHlwZVJlZ0V4LnRlc3Qoc291cmNlLnR5cGUpKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHR5cGUgaXMgZ2l2ZW4gYXMgYSBtaW1ldHlwZVxyXG4gICAgICAgICAgICBzb3VyY2UubWltZVR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBzb3VyY2UudHlwZS5yZXBsYWNlKG1pbWV0eXBlUmVnRXgsICckMScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaXNSdG1wKHNvdXJjZS5maWxlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzV2ViUlRDKHNvdXJjZS5maWxlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3dlYnJ0Yyc7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNEYXNoKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdkYXNoJztcclxuICAgICAgICB9ZWxzZSBpZiAoIXNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gZXh0cmFjdEV4dGVuc2lvbihzb3VyY2UuZmlsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG5vcm1hbGl6ZSB0eXBlc1xyXG4gICAgICAgIHN3aXRjaCAoc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZuZC5hcHBsZS5tcGVndXJsJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2hscyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbTRhJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2FhYyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc21pbCc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZVtrZXldID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzb3VyY2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIHNldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBjb25zdCBwcmV0dGllZFBsYXlsaXN0ID0gKF8uaXNBcnJheShwbGF5bGlzdCkgPyBwbGF5bGlzdCA6IFtwbGF5bGlzdF0pLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShpdGVtLnRyYWNrcykpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RJdGVtID0gT2JqZWN0LmFzc2lnbih7fSx7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcclxuICAgICAgICAgICAgICAgIHRyYWNrczogW11cclxuICAgICAgICAgICAgfSwgaXRlbSApO1xyXG5cclxuICAgICAgICAgICAgaWYoKHBsYXlsaXN0SXRlbS5zb3VyY2VzID09PSBPYmplY3QocGxheWxpc3RJdGVtLnNvdXJjZXMpKSAmJiAhXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlcyldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gaXRlbS5sZXZlbHM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5U291cmNlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSAoZGVmYXVsdFNvdXJjZS50b1N0cmluZygpID09PSAndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzb3VyY2UgZG9lc24ndCBoYXZlIGEgbGFiZWwsIG51bWJlciBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKCFwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0udHlwZStcIi1cIitpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJldHR5U291cmNlID0gbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0Q2hlY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UocHJldHR5U291cmNlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBwcmV0dHlTb3VyY2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gcGxheWxpc3RJdGVtLnNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhIXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZhdWx0IOqwgCDsl4bsnYTrlYwgd2VicnRj6rCAIOyeiOuLpOuptCB3ZWJydGMgZGVmYXVsdCA6IHRydWXroZwg7J6Q64+ZIOyEpOyglVxyXG4gICAgICAgICAgICAvKmxldCBoYXZlRGVmYXVsdCA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLmRlZmF1bHQgPT0gdHJ1ZTt9KTtcclxuICAgICAgICAgICAgbGV0IHdlYnJ0Y1NvdXJjZSA9IFtdO1xyXG4gICAgICAgICAgICBpZighaGF2ZURlZmF1bHQpe1xyXG4gICAgICAgICAgICAgICAgd2VicnRjU291cmNlID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UudHlwZSA9PSBcIndlYnJ0Y1wiO30pO1xyXG4gICAgICAgICAgICAgICAgaWYod2VicnRjU291cmNlKXtcclxuICAgICAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UuZGVmYXVsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0qL1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS50cmFja3MpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RJdGVtLmNhcHRpb25zKSl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5jb25jYXQocGxheWxpc3RJdGVtLmNhcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBwbGF5bGlzdEl0ZW0uY2FwdGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLm1hcChmdW5jdGlvbih0cmFjayl7XHJcbiAgICAgICAgICAgICAgICBpZighdHJhY2sgfHwgIXRyYWNrLmZpbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2tpbmQnOiAnY2FwdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0JzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sIHRyYWNrKTtcclxuICAgICAgICAgICAgfSkuZmlsdGVyKHRyYWNrID0+ICEhdHJhY2spO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBsYXlsaXN0SXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjdXJyZW50UGxheWxpc3QgPSBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgICAgIHJldHVybiBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldFBsYXlsaXN0KCkgXCIsIGN1cnJlbnRQbGF5bGlzdCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5bGlzdDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIC8vV2UgZG8gbm90IHN1cHBvcnQgXCJQTEFZTElTVFwiIG5vdCB5ZXQuIFNvIHRoaXMgcmV0dXJucyBwbGF5bGlzdCBvZiAwLlxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRDdXJyZW50U291cmNlcygpIFwiLCBjdXJyZW50UGxheWxpc3RbMF0uc291cmNlcyk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5bGlzdFswXS5zb3VyY2VzO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJpbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcImFwaS9TdXBwb3J0Q2hlY2tlclwiO1xyXG5pbXBvcnQgUHJvbWlzZSwge3Jlc29sdmVkfSBmcm9tIFwiYXBpL3NoaW1zL3Byb21pc2VcIjtcclxuaW1wb3J0IHtBcGlSdG1wRXhwYW5zaW9ufSBmcm9tICdhcGkvQXBpRXhwYW5zaW9ucyc7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIHByb3ZpZGVyLlxyXG4gKiBAcGFyYW1cclxuICogKi9cclxuY29uc3QgQ29udHJvbGxlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgc3VwcG9ydENoYWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xyXG4gICAgY29uc3QgUHJvdmlkZXJzID0ge307XHJcblxyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRlZC5cIik7XHJcblxyXG4gICAgY29uc3QgcmVnaXN0ZVByb3ZpZGVyID0gKG5hbWUsIHByb3ZpZGVyKSA9PntcclxuICAgICAgICBpZihQcm92aWRlcnNbbmFtZV0pe1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgX3JlZ2lzdGVyUHJvdmlkZXIoKSBcIiwgbmFtZSk7XHJcbiAgICAgICAgUHJvdmlkZXJzW25hbWVdID0gcHJvdmlkZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IFByb3ZpZGVyTG9hZGVyID17XHJcbiAgICAgICAgaHRtbDU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvSHRtbDUnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L0h0bWw1JykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJodG1sNVwiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDUnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB3ZWJydGMgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvV2ViUlRDJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9XZWJSVEMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcIndlYnJ0Y1wiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXNoIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L0Rhc2gnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L0Rhc2gnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcImRhc2hcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhscyA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9IbHMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L0hscycpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiaGxzXCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ0bXAgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvZmxhc2gvUnRtcCddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvZmxhc2gvUnRtcCcpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwicnRtcFwiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQubG9hZFByb3ZpZGVycyA9IChwbGF5bGlzdCkgPT57XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdChwbGF5bGlzdCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRQcm92aWRlcnMoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxyXG4gICAgICAgICAgICBzdXBwb3J0ZWRQcm92aWRlck5hbWVzLmZpbHRlcihmdW5jdGlvbihwcm92aWRlck5hbWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXTtcclxuICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IFByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV0oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmZpbmRCeU5hbWUgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBmaW5kQnlOYW1lKCkgXCIsIG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBQcm92aWRlcnNbbmFtZV07XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UHJvdmlkZXJCeVNvdXJjZSA9IChzb3VyY2UpID0+IHtcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWUgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZ2V0UHJvdmlkZXJCeVNvdXJjZSgpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGF0LmZpbmRCeU5hbWUoc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc1NhbWVQcm92aWRlciA9IChjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgaXNTYW1lUHJvdmlkZXIoKSBcIiwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpICwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSkgKTtcclxuICAgICAgICByZXR1cm4gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpID09PSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjtcclxuIiwiLy8gICAgICBQcm9taXNlIFBvbHlmaWxsXHJcbi8vICAgICAgaHR0cHM6Ly9naXRodWIuY29tL3RheWxvcmhha2VzL3Byb21pc2UtcG9seWZpbGxcclxuLy8gICAgICBDb3B5cmlnaHQgKGMpIDIwMTQgVGF5bG9yIEhha2VzXHJcbi8vICAgICAgQ29weXJpZ2h0IChjKSAyMDE0IEZvcmJlcyBMaW5kZXNheVxyXG4vLyAgICAgIHRheWxvcmhha2VzL3Byb21pc2UtcG9seWZpbGwgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcblxyXG5jb25zdCBwcm9taXNlRmluYWxseSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgY29uc3RydWN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xyXG4gICAgcmV0dXJuIHRoaXMudGhlbihcclxuICAgICAgICBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlamVjdChyZWFzb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG59O1xyXG5cclxuLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gcHJvbWlzZS1wb2x5ZmlsbCB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcclxuLy8gb3RoZXIgY29kZSBtb2RpZnlpbmcgc2V0VGltZW91dCAobGlrZSBzaW5vbi51c2VGYWtlVGltZXJzKCkpXHJcbmNvbnN0IHNldFRpbWVvdXRGdW5jID0gd2luZG93LnNldFRpbWVvdXQ7XHJcbmNvbnN0IHNldEltbWVkaWF0ZUZ1bmMgPSB3aW5kb3cuc2V0SW1tZWRpYXRlO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG5vb3AoKSB7fVxyXG5cclxuLy8gUG9seWZpbGwgZm9yIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXHJcbmZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxufVxyXG5cclxuY29uc3QgUHJvbWlzZVNoaW0gPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQcm9taXNlKSlcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlcyBtdXN0IGJlIGNvbnN0cnVjdGVkIHZpYSBuZXcnKTtcclxuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vdCBhIGZ1bmN0aW9uJyk7XHJcbiAgICB0aGlzLl9zdGF0ZSA9IDA7XHJcbiAgICB0aGlzLl9oYW5kbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuX2RlZmVycmVkcyA9IFtdO1xyXG5cclxuICAgIGRvUmVzb2x2ZShmbiwgdGhpcyk7XHJcbn1cclxuXHJcbmNvbnN0IGhhbmRsZSA9IGZ1bmN0aW9uIChzZWxmLCBkZWZlcnJlZCkge1xyXG4gICAgd2hpbGUgKHNlbGYuX3N0YXRlID09PSAzKSB7XHJcbiAgICAgICAgc2VsZiA9IHNlbGYuX3ZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHNlbGYuX3N0YXRlID09PSAwKSB7XHJcbiAgICAgICAgc2VsZi5fZGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHNlbGYuX2hhbmRsZWQgPSB0cnVlO1xyXG4gICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGNiID0gc2VsZi5fc3RhdGUgPT09IDEgPyBkZWZlcnJlZC5vbkZ1bGZpbGxlZCA6IGRlZmVycmVkLm9uUmVqZWN0ZWQ7XHJcbiAgICAgICAgaWYgKGNiID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIChzZWxmLl9zdGF0ZSA9PT0gMSA/IHJlc29sdmUgOiByZWplY3QpKGRlZmVycmVkLnByb21pc2UsIHNlbGYuX3ZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmV0O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldCA9IGNiKHNlbGYuX3ZhbHVlKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChkZWZlcnJlZC5wcm9taXNlLCBlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXNvbHZlKGRlZmVycmVkLnByb21pc2UsIHJldCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3QgcmVzb2x2ZSA9IGZ1bmN0aW9uIChzZWxmLCBuZXdWYWx1ZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyBQcm9taXNlIFJlc29sdXRpb24gUHJvY2VkdXJlOiBodHRwczovL2dpdGh1Yi5jb20vcHJvbWlzZXMtYXBsdXMvcHJvbWlzZXMtc3BlYyN0aGUtcHJvbWlzZS1yZXNvbHV0aW9uLXByb2NlZHVyZVxyXG4gICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gc2VsZilcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQSBwcm9taXNlIGNhbm5vdCBiZSByZXNvbHZlZCB3aXRoIGl0c2VsZi4nKTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIG5ld1ZhbHVlICYmXHJcbiAgICAgICAgICAgICh0eXBlb2YgbmV3VmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdmFyIHRoZW4gPSBuZXdWYWx1ZS50aGVuO1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9zdGF0ZSA9IDM7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZmluYWxlKHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBkb1Jlc29sdmUoYmluZCh0aGVuLCBuZXdWYWx1ZSksIHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuX3N0YXRlID0gMTtcclxuICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIGZpbmFsZShzZWxmKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZWplY3Qoc2VsZiwgZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHJlamVjdCA9ZnVuY3Rpb24gKHNlbGYsIG5ld1ZhbHVlKSB7XHJcbiAgICBzZWxmLl9zdGF0ZSA9IDI7XHJcbiAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgZmluYWxlKHNlbGYpO1xyXG59XHJcblxyXG5jb25zdCBmaW5hbGUgPSBmdW5jdGlvbiAoc2VsZikge1xyXG4gICAgaWYgKHNlbGYuX3N0YXRlID09PSAyICYmIHNlbGYuX2RlZmVycmVkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBQcm9taXNlLl9pbW1lZGlhdGVGbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCFzZWxmLl9oYW5kbGVkKSB7XHJcbiAgICAgICAgICAgICAgICBQcm9taXNlLl91bmhhbmRsZWRSZWplY3Rpb25GbihzZWxmLl92YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc2VsZi5fZGVmZXJyZWRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgaGFuZGxlKHNlbGYsIHNlbGYuX2RlZmVycmVkc1tpXSk7XHJcbiAgICB9XHJcbiAgICBzZWxmLl9kZWZlcnJlZHMgPSBudWxsO1xyXG59XHJcblxyXG5jb25zdCBIYW5kbGVyID0gZnVuY3Rpb24gKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9taXNlKSB7XHJcbiAgICB0aGlzLm9uRnVsZmlsbGVkID0gdHlwZW9mIG9uRnVsZmlsbGVkID09PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiBudWxsO1xyXG4gICAgdGhpcy5vblJlamVjdGVkID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT09ICdmdW5jdGlvbicgPyBvblJlamVjdGVkIDogbnVsbDtcclxuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUYWtlIGEgcG90ZW50aWFsbHkgbWlzYmVoYXZpbmcgcmVzb2x2ZXIgZnVuY3Rpb24gYW5kIG1ha2Ugc3VyZVxyXG4gKiBvbkZ1bGZpbGxlZCBhbmQgb25SZWplY3RlZCBhcmUgb25seSBjYWxsZWQgb25jZS5cclxuICpcclxuICogTWFrZXMgbm8gZ3VhcmFudGVlcyBhYm91dCBhc3luY2hyb255LlxyXG4gKi9cclxuY29uc3QgZG9SZXNvbHZlID0gZnVuY3Rpb24gKGZuLCBzZWxmKSB7XHJcbiAgICB2YXIgZG9uZSA9IGZhbHNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBmbihcclxuICAgICAgICAgICAgZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkb25lKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoc2VsZiwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbihyZWFzb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkb25lKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChzZWxmLCByZWFzb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcclxuICAgICAgICBkb25lID0gdHJ1ZTtcclxuICAgICAgICByZWplY3Qoc2VsZiwgZXgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5Qcm9taXNlU2hpbS5wcm90b3R5cGVbJ2NhdGNoJ10gPSBmdW5jdGlvbihvblJlamVjdGVkKSB7XHJcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0ZWQpO1xyXG59O1xyXG5cclxuUHJvbWlzZVNoaW0ucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xyXG4gICAgdmFyIHByb20gPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcihub29wKTtcclxuXHJcbiAgICBoYW5kbGUodGhpcywgbmV3IEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb20pKTtcclxuICAgIHJldHVybiBwcm9tO1xyXG59O1xyXG5cclxuUHJvbWlzZVNoaW0ucHJvdG90eXBlWydmaW5hbGx5J10gPSBwcm9taXNlRmluYWxseTtcclxuXHJcblByb21pc2VTaGltLmFsbCA9IGZ1bmN0aW9uKGFycikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGlmICghYXJyIHx8IHR5cGVvZiBhcnIubGVuZ3RoID09PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZS5hbGwgYWNjZXB0cyBhbiBhcnJheScpO1xyXG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKTtcclxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKFtdKTtcclxuICAgICAgICB2YXIgcmVtYWluaW5nID0gYXJncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlcyhpLCB2YWwpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoZW4gPSB2YWwudGhlbjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlbi5jYWxsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKGksIHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhcmdzW2ldID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgaWYgKC0tcmVtYWluaW5nID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShhcmdzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByZXMoaSwgYXJnc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5Qcm9taXNlU2hpbS5yZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblByb21pc2VTaGltLnJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgcmVqZWN0KHZhbHVlKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuUHJvbWlzZVNoaW0ucmFjZSA9IGZ1bmN0aW9uKHZhbHVlcykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB2YWx1ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgdmFsdWVzW2ldLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8vIFVzZSBwb2x5ZmlsbCBmb3Igc2V0SW1tZWRpYXRlIGZvciBwZXJmb3JtYW5jZSBnYWluc1xyXG5Qcm9taXNlU2hpbS5faW1tZWRpYXRlRm4gPVxyXG4gICAgKHR5cGVvZiBzZXRJbW1lZGlhdGVGdW5jID09PSAnZnVuY3Rpb24nICYmXHJcbiAgICBmdW5jdGlvbihmbikge1xyXG4gICAgICAgIHNldEltbWVkaWF0ZUZ1bmMoZm4pO1xyXG4gICAgfSkgfHxcclxuICAgIGZ1bmN0aW9uKGZuKSB7XHJcbiAgICAgICAgc2V0VGltZW91dEZ1bmMoZm4sIDApO1xyXG4gICAgfTtcclxuXHJcblByb21pc2VTaGltLl91bmhhbmRsZWRSZWplY3Rpb25GbiA9IGZ1bmN0aW9uIF91bmhhbmRsZWRSZWplY3Rpb25GbihlcnIpIHtcclxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignUG9zc2libGUgVW5oYW5kbGVkIFByb21pc2UgUmVqZWN0aW9uOicsIGVycik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgUHJvbWlzZSA9IHdpbmRvdy5Qcm9taXNlIHx8ICh3aW5kb3cuUHJvbWlzZSA9IFByb21pc2VTaGltKTtcclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlZCA9IFByb21pc2UucmVzb2x2ZSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvbWlzZTtcclxuIiwiaW1wb3J0IE92ZW5QbGF5ZXJTREssIHtjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnR9IGZyb20gJy4vb3ZlbnBsYXllci5zZGsnXHJcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldy92aWV3JztcclxuaW1wb3J0IGRvbSBmcm9tICcuL3V0aWxzL3BvbHlmaWxscy9kb20uanMnO1xyXG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xyXG5pbXBvcnQge2dldEJyb3dzZXJ9IGZyb20gJ3V0aWxzL2Jyb3dzZXInO1xyXG5cclxuXHJcbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5qcycpO1xyXG5cclxuY29uc3QgT3ZlblBsYXllciA9IHt9O1xyXG53aW5kb3cuT3ZlblBsYXllciA9IE92ZW5QbGF5ZXI7XHJcblxyXG5cclxuLyoqXHJcbiAqIENvcHkgcHJvcGVydGllcyBmcm9tIE92ZW5QbGF5ZXJTREsgb2JqZWN0IHRvIE92ZW5QbGF5ZXIgb2JqZWN0XHJcbiAqL1xyXG5PYmplY3QuYXNzaWduKE92ZW5QbGF5ZXIsIE92ZW5QbGF5ZXJTREspO1xyXG5cclxuT3ZlblBsYXllci5jcmVhdGUgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBvcHRpb25zKSB7XHJcbiAgICBsZXQgYnJvd3Nlck5hbWUgPSBnZXRCcm93c2VyKCk7XHJcbiAgICBpZihicm93c2VyTmFtZSA9PT0gXCJpZVwiKXtcclxuXHJcbiAgICB9XHJcbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudChjb250YWluZXIpO1xyXG5cclxuICAgIHZhciBwbGF5ZXIgPSBWaWV3KGNvbnRhaW5lckVsZW1lbnQpO1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gT3ZlblBsYXllclNESy5jcmVhdGUocGxheWVyLmdldE1lZGlhRWxlbWVudENvbnRhaW5lcigpLCBvcHRpb25zKTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKHBsYXllckluc3RhbmNlLCB7XHJcbiAgICAgICAgZ2V0Q29udGFpbmVySWQgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgIHJldHVybiBjb250YWluZXJFbGVtZW50LmlkO1xyXG4gICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcGxheWVyLnNldEFwaShwbGF5ZXJJbnN0YW5jZSk7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xyXG59XHJcblxyXG4iLCJpbXBvcnQgQVBJIGZyb20gJ2FwaS9BcGknO1xyXG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tICd1dGlscy92YWxpZGF0b3InO1xyXG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcclxuaW1wb3J0IExhJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xyXG5cclxuXHJcbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5zZGsuanMnKTtcclxuXHJcbi8qKlxyXG4gKiBNYWluIE92ZW5QbGF5ZXJTREsgb2JqZWN0XHJcbiAqL1xyXG5jb25zdCBPdmVuUGxheWVyU0RLID0gd2luZG93Lk92ZW5QbGF5ZXJTREsgPSB7fTtcclxuXHJcbmNvbnN0IHBsYXllckxpc3QgPSBPdmVuUGxheWVyU0RLLnBsYXllckxpc3QgPSBbXTtcclxuXHJcbmV4cG9ydCBjb25zdCBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcclxuXHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG5cclxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xyXG5cclxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVyKTtcclxuICAgIH0gZWxzZSBpZiAoY29udGFpbmVyLm5vZGVUeXBlKSB7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyRWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBwbGF5ZXIgaW5zdGFuY2UgYW5kIHJldHVybiBpdC5cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZyB8IGRvbSBlbGVtZW50fSBjb250YWluZXIgIElkIG9mIGNvbnRhaW5lciBlbGVtZW50IG9yIGNvbnRhaW5lciBlbGVtZW50XHJcbiAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgIFRoZSBvcHRpb25zXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmNyZWF0ZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgb3B0aW9ucykge1xyXG5cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBBUEkoY29udGFpbmVyRWxlbWVudCk7XHJcbiAgICBwbGF5ZXJJbnN0YW5jZS5pbml0KG9wdGlvbnMpO1xyXG5cclxuICAgIHBsYXllckxpc3QucHVzaChwbGF5ZXJJbnN0YW5jZSk7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBsaXN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuICAgICB7YXJyYXl9ICBUaGUgcGxheWVyIGxpc3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4gcGxheWVyTGlzdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgY29udGFpbmVyIGlkLlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSAgY29udGFpbmVySWQgIFRoZSBjb250YWluZXIgaWRlbnRpZmllclxyXG4gKiBAcmV0dXJuICAgICB7b2JlamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUNvbnRhaW5lcklkID0gZnVuY3Rpb24oY29udGFpbmVySWQpIHtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGxheWVyTGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGluZGV4LlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcclxuICogQHJldHVybiAgICAge29iamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IHBsYXllckxpc3RbaW5kZXhdO1xyXG5cclxuICAgIGlmIChwbGF5ZXJJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIHBsYXllciBpbnN0YW5jZSBieSBwbGF5ZXJJZC5cclxuICpcclxuICogQHBhcmFtICAgICAge3BsYXllcklkfSAgaWRcclxuICogQHJldHVybiAgICAge251bGx9XHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLnJlbW92ZVBsYXllciA9IGZ1bmN0aW9uKHBsYXllcklkKSB7XHJcbiAgICBjb25zb2xlLmxvZyhwbGF5ZXJJZCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IHBsYXllcklkKSB7XHJcblxyXG4gICAgICAgICAgICBwbGF5ZXJMaXN0LnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIHdlYnJ0YyBzb3VyY2UgZm9yIHBsYXllciBzb3VyY2UgdHlwZS5cclxuICpcclxuICogQHBhcmFtICAgICAge09iamVjdCB8IEFycmF5fSAgc291cmNlICAgd2VicnRjIHNvdXJjZVxyXG4gKiBAcmV0dXJuICAgICB7QXJyYXl9ICBQbGF5ZXIgc291cmNlIE9iZWpjdC5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2VuZXJhdGVXZWJydGNVcmxzID0gZnVuY3Rpb24oc291cmNlcykge1xyXG4gICAgcmV0dXJuIChfLmlzQXJyYXkoc291cmNlcykgPyBzb3VyY2VzIDogW3NvdXJjZXNdKS5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCl7XHJcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgaXNXZWJSVEMoc291cmNlLmhvc3QpICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcclxuICAgICAgICAgICAgcmV0dXJuIHtmaWxlIDogc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL1wiICsgc291cmNlLnN0cmVhbSwgdHlwZSA6IFwid2VicnRjXCIsIGxhYmVsIDogc291cmNlLmxhYmVsID8gc291cmNlLmxhYmVsIDogXCJ3ZWJydGMtXCIrKGluZGV4KzEpIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPdmVuUGxheWVyU0RLO1xyXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXG4gKi9cblxuXG5leHBvcnQgY29uc3QgZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCl7XG4gICAgaWYoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk9wZXJhXCIpIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignT1BSJykpICE9IC0xICl7XG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKSAhPSAtMSApe1xuICAgICAgICByZXR1cm4gJ2Nocm9tZSc7XG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpICE9IC0xKXtcbiAgICAgICAgcmV0dXJuICdzYWZhcmknO1xuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIikgIT0gLTEgKXtcbiAgICAgICAgcmV0dXJuICdmaXJlZm94JztcbiAgICB9ZWxzZSBpZigobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKSAhPSAtMSApKXtcbiAgICAgICAgbGV0IG1zaWUgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpO1xuICAgICAgICAvKmlmKCEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09IHRydWUgKXtcbiAgICAgICAgICAgIHJldHVybiAnaWUnO1xuICAgICAgICB9ZWxzZSBpZighIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1RyaWRlbnQuKnJ2XFw6MTFcXC4vKSl7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llICsgNSwgdWEuaW5kZXhPZihcIi5cIiwgbXNpZSkpKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuICd1bmtub3duJztcbiAgICAgICAgfSovXG4gICAgICAgIHZhciBpZSA9IChmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB2YXIgdW5kZWYsXG4gICAgICAgICAgICAgICAgdiA9IDMsXG4gICAgICAgICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICAgICAgYWxsID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJyk7XG5cbiAgICAgICAgICAgIHdoaWxlIChcbiAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgZ3QgSUUgJyArICgrK3YpICsgJ10+PGk+PC9pPjwhW2VuZGlmXS0tPicsXG4gICAgICAgICAgICAgICAgICAgIGFsbFswXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiB2ID4gNCA/IHYgOiB1bmRlZjtcblxuICAgICAgICB9KCkpO1xuICAgICAgICBpZihpZSA8IDkpe1xuICAgICAgICAgICAgcmV0dXJuICdvbGRJRSc7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuICdtb2Rlcm5JRSc7XG4gICAgICAgIH1cblxuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgIH1cblxufTtcblxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIEl0IHdhcyByZXBsYWNlIGpxdWVyeSdzIHNlbGVjdG9yLiBJdCBPZnRlbiB1c2VkIGJ5IE92ZW5UZW1wbGF0ZS4gKC92aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUuanMpXHJcbiAqIEBwYXJhbSAgIHNlbGVjdG9yT3JFbGVtZW50ICBzdHJpbmcgb3IgZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IExhJCA9IGZ1bmN0aW9uKHNlbGVjdG9yT3JFbGVtZW50KXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGNvbnN0IHJldHVybk5vZGUgPSBmdW5jdGlvbigkZWxlbWVudCAsIHNlbGVjdG9yKXtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSAgJGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgaWYobm9kZUxpc3QubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCAkZWxlbWVudCA9IFwiXCI7XHJcblxyXG4gICAgaWYoIF8uZXZlcnkoc2VsZWN0b3JPckVsZW1lbnQsIGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBfLmlzRWxlbWVudChpdGVtKX0pKXtcclxuICAgICAgICAkZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xyXG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwiZG9jdW1lbnRcIil7XHJcbiAgICAgICAgJGVsZW1lbnQgPSBkb2N1bWVudDtcclxuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcIndpbmRvd1wiKXtcclxuICAgICAgICAkZWxlbWVudCA9IHdpbmRvdztcclxuICAgIH1lbHNle1xyXG4gICAgICAgICRlbGVtZW50ID0gcmV0dXJuTm9kZShkb2N1bWVudCwgc2VsZWN0b3JPckVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZighJGVsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZmluZCA9IChzZWxlY3RvcikgPT57XHJcbiAgICAgICAgcmV0dXJuIExhJChyZXR1cm5Ob2RlKCRlbGVtZW50LCBzZWxlY3RvcikpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNzcyA9IChuYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hZGRDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9ICRlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGlmKGNsYXNzTmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIFwiICsgbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2xhc3MgPSAobmFtZSkgPT57XHJcbiAgICAgICAgaWYgKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSA9ICRlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBuYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQXR0cmlidXRlID0gKGF0dHJOYW1lKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zaG93ID0gKCkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGlkZSA9ICgpID0+e1xyXG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWxDb2RlKSA9PntcclxuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgKz0gaHRtbENvZGU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQudGV4dCA9ICh0ZXh0KSA9PiB7IC8vSUU4K1xyXG4gICAgICAgIGlmKHRleHQpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC50ZXh0Q29udGVudDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGFzQ2xhc3MgPSAobmFtZSkgPT4geyAvL0lFOCtcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgbmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoJGVsZW1lbnQubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzID0gKCR0YXJnZXRFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50ID09PSAkdGFyZ2V0RWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5vZmZzZXQgPSAoKSA9PnsgICAgLy9JRTgrXHJcbiAgICAgICAgdmFyIHJlY3QgPSAkZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wLFxyXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnRcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQud2lkdGggPSAoKSA9PiB7ICAgIC8vSUU4K1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5oZWlnaHQgPSAoKSA9PiB7ICAgLy9JRTgrXHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hdHRyID0gKGF0dHIpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlcGxhY2UgPSAoaHRtbCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LnJlcGxhY2VXaXRoKGh0bWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFwcGVuZCA9IChodG1sKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQuYXBwZW5kQ2hpbGQoaHRtbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlbW92ZUNoaWxkID0gKCkgPT4ge1xyXG4gICAgICAgIHdoaWxlICgkZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2hpbGQoJGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY2xvc2VzdCA9IChzZWxlY3RvclN0cmluZykgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yU3RyaW5nKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMYSQ7XHJcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDI0Li5cbiAqL1xuXG5jb25zdCBsb2dnZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgcHJldkNvbnNvbGVMb2cgPSBudWxsO1xuXG4gICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0ge2xvZyA6IHdpbmRvd1snY29uc29sZSddWydsb2cnXX07XG5cbiAgICB0aGF0LmVuYWJsZSA9ICgpID0+e1xuICAgICAgICBpZihwcmV2Q29uc29sZUxvZyA9PSBudWxsKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBwcmV2Q29uc29sZUxvZztcbiAgICB9O1xuICAgIHRoYXQuZGlzYWJsZSA9ICgpID0+e1xuICAgICAgICBwcmV2Q29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBmdW5jdGlvbigpe307XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0gbnVsbDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjsiLCIvKlxyXG4qIENvcHlyaWdodCAyMDE4IEpvc2h1YSBCZWxsXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cclxuKiAqL1xyXG5cclxuKGZ1bmN0aW9uKGdsb2JhbCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgaWYgKCEoJ3dpbmRvdycgaW4gZ2xvYmFsICYmICdkb2N1bWVudCcgaW4gZ2xvYmFsKSlcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvL1xyXG4gICAgLy8gRE9NXHJcbiAgICAvLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvXHJcbiAgICAvL1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gRG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCBtZXRob2RcclxuICAgIC8vIGh0dHA6Ly9hamF4aWFuLmNvbS9hcmNoaXZlcy9jcmVhdGluZy1hLXF1ZXJ5c2VsZWN0b3ItZm9yLWllLXRoYXQtcnVucy1hdC1uYXRpdmUtc3BlZWRcclxuICAgIC8vIE5lZWRlZCBmb3I6IElFNy1cclxuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgPSBmdW5jdGlvbihzZWxlY3RvcnMpIHtcclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSwgZWxlbWVudHMgPSBbXSwgZWxlbWVudDtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmZpcnN0Q2hpbGQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5fcXNhID0gW107XHJcblxyXG4gICAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBzZWxlY3RvcnMgKyAne3gtcXNhOmV4cHJlc3Npb24oZG9jdW1lbnQuX3FzYSAmJiBkb2N1bWVudC5fcXNhLnB1c2godGhpcykpfSc7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxCeSgwLCAwKTtcclxuICAgICAgICAgICAgc3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoZG9jdW1lbnQuX3FzYS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5fcXNhLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZUF0dHJpYnV0ZSgneC1xc2EnKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG9jdW1lbnQuX3FzYSA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50cztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgbWV0aG9kXHJcbiAgICAvLyBOZWVkZWQgZm9yOiBJRTctXHJcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yID0gZnVuY3Rpb24oc2VsZWN0b3JzKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JzKTtcclxuICAgICAgICAgICAgcmV0dXJuIChlbGVtZW50cy5sZW5ndGgpID8gZWxlbWVudHNbMF0gOiBudWxsO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSBtZXRob2RcclxuICAgIC8vIE5lZWRlZCBmb3I6IElFOC1cclxuICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBmdW5jdGlvbihjbGFzc05hbWVzKSB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgPSBTdHJpbmcoY2xhc3NOYW1lcykucmVwbGFjZSgvXnxcXHMrL2csICcuJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNsYXNzTmFtZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTm9kZSBpbnRlcmZhY2UgY29uc3RhbnRzXHJcbiAgICAvLyBOZWVkZWQgZm9yOiBJRTgtXHJcbiAgICBnbG9iYWwuTm9kZSA9IGdsb2JhbC5Ob2RlIHx8IGZ1bmN0aW9uKCkgeyB0aHJvdyBUeXBlRXJyb3IoXCJJbGxlZ2FsIGNvbnN0cnVjdG9yXCIpOyB9O1xyXG4gICAgW1xyXG4gICAgICAgIFsnRUxFTUVOVF9OT0RFJywgMV0sXHJcbiAgICAgICAgWydBVFRSSUJVVEVfTk9ERScsIDJdLFxyXG4gICAgICAgIFsnVEVYVF9OT0RFJywgM10sXHJcbiAgICAgICAgWydDREFUQV9TRUNUSU9OX05PREUnLCA0XSxcclxuICAgICAgICBbJ0VOVElUWV9SRUZFUkVOQ0VfTk9ERScsIDVdLFxyXG4gICAgICAgIFsnRU5USVRZX05PREUnLCA2XSxcclxuICAgICAgICBbJ1BST0NFU1NJTkdfSU5TVFJVQ1RJT05fTk9ERScsIDddLFxyXG4gICAgICAgIFsnQ09NTUVOVF9OT0RFJywgOF0sXHJcbiAgICAgICAgWydET0NVTUVOVF9OT0RFJywgOV0sXHJcbiAgICAgICAgWydET0NVTUVOVF9UWVBFX05PREUnLCAxMF0sXHJcbiAgICAgICAgWydET0NVTUVOVF9GUkFHTUVOVF9OT0RFJywgMTFdLFxyXG4gICAgICAgIFsnTk9UQVRJT05fTk9ERScsIDEyXVxyXG4gICAgXS5mb3JFYWNoKGZ1bmN0aW9uKHApIHsgaWYgKCEocFswXSBpbiBnbG9iYWwuTm9kZSkpIGdsb2JhbC5Ob2RlW3BbMF1dID0gcFsxXTsgfSk7XHJcblxyXG4gICAgLy8gRE9NRXhjZXB0aW9uIGNvbnN0YW50c1xyXG4gICAgLy8gTmVlZGVkIGZvcjogSUU4LVxyXG4gICAgZ2xvYmFsLkRPTUV4Y2VwdGlvbiA9IGdsb2JhbC5ET01FeGNlcHRpb24gfHwgZnVuY3Rpb24oKSB7IHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgY29uc3RydWN0b3JcIik7IH07XHJcbiAgICBbXHJcbiAgICAgICAgWydJTkRFWF9TSVpFX0VSUicsIDFdLFxyXG4gICAgICAgIFsnRE9NU1RSSU5HX1NJWkVfRVJSJywgMl0sXHJcbiAgICAgICAgWydISUVSQVJDSFlfUkVRVUVTVF9FUlInLCAzXSxcclxuICAgICAgICBbJ1dST05HX0RPQ1VNRU5UX0VSUicsIDRdLFxyXG4gICAgICAgIFsnSU5WQUxJRF9DSEFSQUNURVJfRVJSJywgNV0sXHJcbiAgICAgICAgWydOT19EQVRBX0FMTE9XRURfRVJSJywgNl0sXHJcbiAgICAgICAgWydOT19NT0RJRklDQVRJT05fQUxMT1dFRF9FUlInLCA3XSxcclxuICAgICAgICBbJ05PVF9GT1VORF9FUlInLCA4XSxcclxuICAgICAgICBbJ05PVF9TVVBQT1JURURfRVJSJywgOV0sXHJcbiAgICAgICAgWydJTlVTRV9BVFRSSUJVVEVfRVJSJywgMTBdLFxyXG4gICAgICAgIFsnSU5WQUxJRF9TVEFURV9FUlInLCAxMV0sXHJcbiAgICAgICAgWydTWU5UQVhfRVJSJywgMTJdLFxyXG4gICAgICAgIFsnSU5WQUxJRF9NT0RJRklDQVRJT05fRVJSJywgMTNdLFxyXG4gICAgICAgIFsnTkFNRVNQQUNFX0VSUicsIDE0XSxcclxuICAgICAgICBbJ0lOVkFMSURfQUNDRVNTX0VSUicsIDE1XVxyXG4gICAgXS5mb3JFYWNoKGZ1bmN0aW9uKHApIHsgaWYgKCEocFswXSBpbiBnbG9iYWwuRE9NRXhjZXB0aW9uKSkgZ2xvYmFsLkRPTUV4Y2VwdGlvbltwWzBdXSA9IHBbMV07IH0pO1xyXG5cclxuICAgIC8vIEV2ZW50IGFuZCBFdmVudFRhcmdldHMgaW50ZXJmYWNlc1xyXG4gICAgLy8gTmVlZGVkIGZvcjogSUU4XHJcbiAgICAoZnVuY3Rpb24oKXtcclxuICAgICAgICBpZiAoISgnRWxlbWVudCcgaW4gZ2xvYmFsKSB8fCBFbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyIHx8ICFPYmplY3QuZGVmaW5lUHJvcGVydHkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gaW50ZXJmYWNlIEV2ZW50XHJcblxyXG4gICAgICAgIC8vIFBoYXNlVHlwZSAoY29uc3QgdW5zaWduZWQgc2hvcnQpXHJcbiAgICAgICAgRXZlbnQuQ0FQVFVSSU5HX1BIQVNFID0gMTtcclxuICAgICAgICBFdmVudC5BVF9UQVJHRVQgICAgICAgPSAyO1xyXG4gICAgICAgIEV2ZW50LkJVQkJMSU5HX1BIQVNFICA9IDM7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEV2ZW50LnByb3RvdHlwZSwge1xyXG4gICAgICAgICAgICBDQVBUVVJJTkdfUEhBU0U6IHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIDE7IH0gfSxcclxuICAgICAgICAgICAgQVRfVEFSR0VUOiAgICAgICB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiAyOyB9IH0sXHJcbiAgICAgICAgICAgIEJVQkJMSU5HX1BIQVNFOiAgIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIDM7IH0gfSxcclxuICAgICAgICAgICAgdGFyZ2V0OiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNyY0VsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB9fSxcclxuICAgICAgICAgICAgY3VycmVudFRhcmdldDoge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFRhcmdldDtcclxuICAgICAgICAgICAgICAgIH19LFxyXG4gICAgICAgICAgICBldmVudFBoYXNlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5zcmNFbGVtZW50ID09PSB0aGlzLmN1cnJlbnRUYXJnZXQpID8gRXZlbnQuQVRfVEFSR0VUIDogRXZlbnQuQlVCQkxJTkdfUEhBU0U7XHJcbiAgICAgICAgICAgICAgICB9fSxcclxuICAgICAgICAgICAgYnViYmxlczoge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNb3VzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjbGljayc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RibGNsaWNrJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2Vkb3duJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2V1cCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNlb3Zlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNlbW92ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNlb3V0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2V3aGVlbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEtleWJvYXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2tleWRvd24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdrZXlwcmVzcyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2tleXVwJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRnJhbWUvT2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Jlc2l6ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Njcm9sbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VsZWN0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2hhbmdlJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3VibWl0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVzZXQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH19LFxyXG4gICAgICAgICAgICBjYW5jZWxhYmxlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1vdXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGJsY2xpY2snOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZXVwJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2VvdmVyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2VvdXQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZXdoZWVsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gS2V5Ym9hcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAna2V5ZG93bic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2tleXByZXNzJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAna2V5dXAnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N1Ym1pdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfX0sXHJcbiAgICAgICAgICAgIHRpbWVTdGFtcDoge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGltZVN0YW1wO1xyXG4gICAgICAgICAgICAgICAgfX0sXHJcbiAgICAgICAgICAgIHN0b3BQcm9wYWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH19LFxyXG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH19LFxyXG4gICAgICAgICAgICBkZWZhdWx0UHJldmVudGVkOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJldHVyblZhbHVlID09PSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGludGVyZmFjZSBFdmVudFRhcmdldFxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdET01Db250ZW50TG9hZGVkJykgdHlwZSA9ICdsb2FkJztcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5fdGltZVN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgICAgIGUuX2N1cnJlbnRUYXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGUpO1xyXG4gICAgICAgICAgICAgICAgZS5fY3VycmVudFRhcmdldCA9IG51bGw7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXNbJ18nICsgdHlwZSArIGxpc3RlbmVyXSA9IGY7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnRE9NQ29udGVudExvYWRlZCcpIHR5cGUgPSAnbG9hZCc7XHJcbiAgICAgICAgICAgIHZhciBmID0gdGhpc1snXycgKyB0eXBlICsgbGlzdGVuZXJdO1xyXG4gICAgICAgICAgICBpZiAoZikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhY2hFdmVudCgnb24nICsgdHlwZSwgZik7XHJcbiAgICAgICAgICAgICAgICB0aGlzWydfJyArIHR5cGUgKyBsaXN0ZW5lcl0gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBbV2luZG93LCBIVE1MRG9jdW1lbnQsIEVsZW1lbnRdLmZvckVhY2goZnVuY3Rpb24obykge1xyXG4gICAgICAgICAgICBvLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lcjtcclxuICAgICAgICAgICAgby5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJlbW92ZUV2ZW50TGlzdGVuZXI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KCkpO1xyXG5cclxuICAgIC8vIEN1c3RvbUV2ZW50XHJcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnQvQ3VzdG9tRXZlbnRcclxuICAgIC8vIE5lZWRlZCBmb3I6IElFXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgnQ3VzdG9tRXZlbnQnIGluIGdsb2JhbCAmJiB0eXBlb2YgZ2xvYmFsLkN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBmdW5jdGlvbiBDdXN0b21FdmVudCAoIGV2ZW50LCBwYXJhbXMgKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiB1bmRlZmluZWQgfTtcclxuICAgICAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCAnQ3VzdG9tRXZlbnQnICk7XHJcbiAgICAgICAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoIGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwgKTtcclxuICAgICAgICAgICAgcmV0dXJuIGV2dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gZ2xvYmFsLkV2ZW50LnByb3RvdHlwZTtcclxuICAgICAgICBnbG9iYWwuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgLy8gU2hpbSBmb3IgRE9NIEV2ZW50cyBmb3IgSUU3LVxyXG4gICAgLy8gaHR0cDovL3d3dy5xdWlya3Ntb2RlLm9yZy9ibG9nL2FyY2hpdmVzLzIwMDUvMTAvX2FuZF90aGVfd2lubmVyXzEuaHRtbFxyXG4gICAgLy8gVXNlIGFkZEV2ZW50KG9iamVjdCwgZXZlbnQsIGhhbmRsZXIpIGluc3RlYWQgb2Ygb2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpXHJcbiAgICB3aW5kb3cuYWRkRXZlbnQgPSBmdW5jdGlvbihvYmosIHR5cGUsIGZuKSB7XHJcbiAgICAgICAgaWYgKG9iai5hZGRFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIG9iai5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChvYmouYXR0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgb2JqW1wiZVwiICsgdHlwZSArIGZuXSA9IGZuO1xyXG4gICAgICAgICAgICBvYmpbdHlwZSArIGZuXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGUgPSB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQgPSBvYmo7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7IGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgfTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24oKSB7IGUuY2FuY2VsQnViYmxlID0gdHJ1ZTsgfTtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0ID0gZS5zcmNFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgZS50aW1lU3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgb2JqW1wiZVwiICsgdHlwZSArIGZuXS5jYWxsKHRoaXMsIGUpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBvYmouYXR0YWNoRXZlbnQoXCJvblwiICsgdHlwZSwgb2JqW3R5cGUgKyBmbl0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24ob2JqLCB0eXBlLCBmbikge1xyXG4gICAgICAgIGlmIChvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob2JqLmRldGFjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgIG9iai5kZXRhY2hFdmVudChcIm9uXCIgKyB0eXBlLCBvYmpbdHlwZSArIGZuXSk7XHJcbiAgICAgICAgICAgIG9ialt0eXBlICsgZm5dID0gbnVsbDtcclxuICAgICAgICAgICAgb2JqW1wiZVwiICsgdHlwZSArIGZuXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBET01Ub2tlbkxpc3QgaW50ZXJmYWNlIGFuZCBFbGVtZW50LmNsYXNzTGlzdCAvIEVsZW1lbnQucmVsTGlzdFxyXG4gICAgLy8gTmVlZGVkIGZvcjogSUU5LVxyXG4gICAgLy8gVXNlIGdldENsYXNzTGlzdChlbGVtKSBpbnN0ZWFkIG9mIGVsZW0uY2xhc3NMaXN0KCkgaWYgSUU3LSBzdXBwb3J0IGlzIG5lZWRlZFxyXG4gICAgLy8gVXNlIGdldFJlbExpc3QoZWxlbSkgaW5zdGVhZCBvZiBlbGVtLnJlbExpc3QoKSBpZiBJRTctIHN1cHBvcnQgaXMgbmVlZGVkXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gRE9NVG9rZW5MaXN0U2hpbShvLCBwKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNwbGl0KHMpIHsgcmV0dXJuIHMubGVuZ3RoID8gcy5zcGxpdCgvXFxzKy9nKSA6IFtdOyB9XHJcblxyXG4gICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGRvZXMgbm90IGV4YWN0bHkgbWF0Y2ggdGhlIHNwZWMuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZVRva2VuRnJvbVN0cmluZyh0b2tlbiwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gc3BsaXQoc3RyaW5nKSxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHRva2Vucy5pbmRleE9mKHRva2VuKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbnMuam9pbignICcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhcclxuICAgICAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBzcGxpdChvW3BdKS5sZW5ndGg7IH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbihpZHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBzcGxpdChvW3BdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwIDw9IGlkeCAmJiBpZHggPCB0b2tlbnMubGVuZ3RoID8gdG9rZW5zW2lkeF0gOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IFN0cmluZyh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4ubGVuZ3RoID09PSAwKSB7IHRocm93IFN5bnRheEVycm9yKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvXFxzLy50ZXN0KHRva2VuKSkgeyB0aHJvdyBFcnJvcihcIkludmFsaWRDaGFyYWN0ZXJFcnJvclwiKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IHNwbGl0KG9bcF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbnMuaW5kZXhPZih0b2tlbikgIT09IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbigvKnRva2Vucy4uLiovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5tYXAoU3RyaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbnMuc29tZShmdW5jdGlvbih0b2tlbikgeyByZXR1cm4gdG9rZW4ubGVuZ3RoID09PSAwOyB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFN5bnRheEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5zLnNvbWUoZnVuY3Rpb24odG9rZW4pIHsgcmV0dXJuICgvXFxzLykudGVzdCh0b2tlbik7IH0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJJbnZhbGlkQ2hhcmFjdGVyRXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdW5kZXJseWluZ19zdHJpbmcgPSBvW3BdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbl9saXN0ID0gc3BsaXQodW5kZXJseWluZ19zdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VucyA9IHRva2Vucy5maWx0ZXIoZnVuY3Rpb24odG9rZW4pIHsgcmV0dXJuIHRva2VuX2xpc3QuaW5kZXhPZih0b2tlbikgPT09IC0xOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1bmRlcmx5aW5nX3N0cmluZy5sZW5ndGggIT09IDAgJiYgISgvXFxzJC8pLnRlc3QodW5kZXJseWluZ19zdHJpbmcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybHlpbmdfc3RyaW5nICs9ICcgJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZXJseWluZ19zdHJpbmcgKz0gdG9rZW5zLmpvaW4oJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW3BdID0gdW5kZXJseWluZ19zdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSBzcGxpdChvW3BdKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoICE9PSBsZW5ndGgpIHsgdGhpcy5sZW5ndGggPSBsZW5ndGg7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oLyp0b2tlbnMuLi4qLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykubWFwKFN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5zLnNvbWUoZnVuY3Rpb24odG9rZW4pIHsgcmV0dXJuIHRva2VuLmxlbmd0aCA9PT0gMDsgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBTeW50YXhFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2Vucy5zb21lKGZ1bmN0aW9uKHRva2VuKSB7IHJldHVybiAoL1xccy8pLnRlc3QodG9rZW4pOyB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwiSW52YWxpZENoYXJhY3RlckVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVuZGVybHlpbmdfc3RyaW5nID0gb1twXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMuZm9yRWFjaChmdW5jdGlvbih0b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlcmx5aW5nX3N0cmluZyA9IHJlbW92ZVRva2VuRnJvbVN0cmluZyh0b2tlbiwgdW5kZXJseWluZ19zdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bcF0gPSB1bmRlcmx5aW5nX3N0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHNwbGl0KG9bcF0pLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggIT09IGxlbmd0aCkgeyB0aGlzLmxlbmd0aCA9IGxlbmd0aDsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbih0b2tlbi8qLCBmb3JjZSovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9yY2UgPSBhcmd1bWVudHNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gU3RyaW5nKHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4ubGVuZ3RoID09PSAwKSB7IHRocm93IFN5bnRheEVycm9yKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoL1xccy8udGVzdCh0b2tlbikpIHsgdGhyb3cgRXJyb3IoXCJJbnZhbGlkQ2hhcmFjdGVyRXJyb3JcIik7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gc3BsaXQob1twXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gdG9rZW5zLmluZGV4T2YodG9rZW4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xICYmICghZm9yY2UgfHwgZm9yY2UgPT09ICh2b2lkIDApKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW3BdID0gcmVtb3ZlVG9rZW5Gcm9tU3RyaW5nKHRva2VuLCBvW3BdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xICYmIGZvcmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdW5kZXJseWluZ19zdHJpbmcgPSBvW3BdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1bmRlcmx5aW5nX3N0cmluZy5sZW5ndGggIT09IDAgJiYgIS9cXHMkLy50ZXN0KHVuZGVybHlpbmdfc3RyaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlcmx5aW5nX3N0cmluZyArPSAnICc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybHlpbmdfc3RyaW5nICs9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bcF0gPSB1bmRlcmx5aW5nX3N0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHNwbGl0KG9bcF0pLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggIT09IGxlbmd0aCkgeyB0aGlzLmxlbmd0aCA9IGxlbmd0aDsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG9TdHJpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9bcF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKCEoJ2xlbmd0aCcgaW4gdGhpcykpIHtcclxuICAgICAgICAgICAgICAgIC8vIEluIGNhc2UgZ2V0dGVycyBhcmUgbm90IHN1cHBvcnRlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBzcGxpdChvW3BdKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGV5IGFyZSwgc2hpbSBpbiBpbmRleCBnZXR0ZXJzICh1cCB0byAxMDApXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFN0cmluZyhpKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IChmdW5jdGlvbihuKSB7IHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuaXRlbShuKTsgfTsgfShpKSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkVG9FbGVtZW50UHJvdG90eXBlKHAsIGYpIHtcclxuICAgICAgICAgICAgaWYgKCdFbGVtZW50JyBpbiBnbG9iYWwgJiYgRWxlbWVudC5wcm90b3R5cGUgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRWxlbWVudC5wcm90b3R5cGUsIHAsIHsgZ2V0OiBmIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBIVE1MIC0gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZ1xyXG4gICAgICAgIC8vIEVsZW1lbnQuY2xhc3NMaXN0XHJcbiAgICAgICAgaWYgKCdjbGFzc0xpc3QnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuZ2V0Q2xhc3NMaXN0ID0gZnVuY3Rpb24oZWxlbSkgeyByZXR1cm4gZWxlbS5jbGFzc0xpc3Q7IH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmdldENsYXNzTGlzdCA9IGZ1bmN0aW9uKGVsZW0pIHsgcmV0dXJuIG5ldyBET01Ub2tlbkxpc3RTaGltKGVsZW0sICdjbGFzc05hbWUnKTsgfTtcclxuICAgICAgICAgICAgYWRkVG9FbGVtZW50UHJvdG90eXBlKCdjbGFzc0xpc3QnLCBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBET01Ub2tlbkxpc3RTaGltKHRoaXMsICdjbGFzc05hbWUnKTsgfSApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSFRNTCAtIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmdcclxuICAgICAgICAvLyBIVE1MQW5jaG9yRWxlbWVudC5yZWxMaXN0XHJcbiAgICAgICAgLy8gSFRNTExpbmtFbGVtZW50LnJlbExpc3RcclxuICAgICAgICBpZiAoJ3JlbExpc3QnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuZ2V0UmVsTGlzdCA9IGZ1bmN0aW9uKGVsZW0pIHsgcmV0dXJuIGVsZW0ucmVsTGlzdDsgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cuZ2V0UmVsTGlzdCA9IGZ1bmN0aW9uKGVsZW0pIHsgcmV0dXJuIG5ldyBET01Ub2tlbkxpc3RTaGltKGVsZW0sICdyZWwnKTsgfTtcclxuICAgICAgICAgICAgYWRkVG9FbGVtZW50UHJvdG90eXBlKCdyZWxMaXN0JywgZnVuY3Rpb24oKSB7IHJldHVybiBuZXcgRE9NVG9rZW5MaXN0U2hpbSh0aGlzLCAncmVsJyk7IH0gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBzZWNvbmQgYXJndW1lbnQgdG8gbmF0aXZlIERPTVRva2VuTGlzdC50b2dnbGUoKSBpZiBuZWNlc3NhcnlcclxuICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghKCdET01Ub2tlbkxpc3QnIGluIGdsb2JhbCkpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIGlmICghKCdjbGFzc0xpc3QnIGluIGUpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGUuY2xhc3NMaXN0LnRvZ2dsZSgneCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKCFlLmNsYXNzTGlzdC5jb250YWlucygneCcpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGdsb2JhbC5ET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIHRvZ2dsZSh0b2tlbi8qLCBmb3JjZSovKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZm9yY2UgPSBhcmd1bWVudHNbMV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2UgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhZGQgPSAhdGhpcy5jb250YWlucyh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1thZGQgPyAnYWRkJyA6ICdyZW1vdmUnXSh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFkZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvcmNlID0gISFmb3JjZTtcclxuICAgICAgICAgICAgICAgIHRoaXNbZm9yY2UgPyAnYWRkJyA6ICdyZW1vdmUnXSh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9yY2U7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSgpKTtcclxuXHJcblxyXG4gICAgICAgIC8vIERPTSAtIEludGVyZmFjZSBOb25Eb2N1bWVudFR5cGVDaGlsZE5vZGVcclxuICAgICAgICAvLyBJbnRlcmZhY2UgTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlXHJcbiAgICAgICAgLy8gcHJldmlvdXNFbGVtZW50U2libGluZyAvIG5leHRFbGVtZW50U2libGluZyAtIGZvciBJRThcclxuXHJcbiAgICAgICAgaWYgKCEoJ3ByZXZpb3VzRWxlbWVudFNpYmxpbmcnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkpIHtcclxuICAgICAgICAgICAgYWRkVG9FbGVtZW50UHJvdG90eXBlKCdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbiA9IHRoaXMucHJldmlvdXNTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG4gJiYgbi5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUpXHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IG4ucHJldmlvdXNTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG47XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCEoJ25leHRFbGVtZW50U2libGluZycgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICBhZGRUb0VsZW1lbnRQcm90b3R5cGUoJ25leHRFbGVtZW50U2libGluZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG4gPSB0aGlzLm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG4gJiYgbi5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUpXHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IG4ubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSgpKTtcclxuXHJcbiAgICAvLyBFbGVtZW50Lm1hdGNoZXNcclxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0FQSS9FbGVtZW50L21hdGNoZXNcclxuICAgIC8vIE5lZWRlZCBmb3I6IElFLCBGaXJlZm94IDMuNiwgZWFybHkgV2Via2l0IGFuZCBPcGVyYSAxNS4wXHJcbiAgICAvLyBVc2UgbXNNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpIGZvciBJRVxyXG4gICAgLy8gVXNlIG9NYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpIGZvciBPcGVyYSAxNS4wXHJcbiAgICAvLyBVc2UgbW96TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKSBmb3IgRmlyZWZveCAzLjZcclxuICAgIC8vIFVzZSB3ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpIGZvciBlYXJseSBXZWJraXRcclxuICAgIC8vIFVzZSBwb2x5ZmlsbCBpZiBubyBtYXRjaGVzKCkgc3VwcG9ydCwgYnV0IHF1ZXJ5U2VsZWN0b3JBbGwoKSBzdXBwb3J0XHJcbiAgICBpZiAoJ0VsZW1lbnQnIGluIGdsb2JhbCAmJiAhRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xyXG4gICAgICAgIGlmIChFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3I7XHJcbiAgICAgICAgfSBlbHNlIGlmIChFbGVtZW50LnByb3RvdHlwZS5vTWF0Y2hlc1NlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSBFbGVtZW50LnByb3RvdHlwZS5vTWF0Y2hlc1NlbGVjdG9yO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoRWxlbWVudC5wcm90b3R5cGUubW96TWF0Y2hlc1NlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSBFbGVtZW50LnByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3I7XHJcbiAgICAgICAgfSBlbHNlIGlmIChFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcclxuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwpIHtcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IGZ1bmN0aW9uIG1hdGNoZXMoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gKHRoaXMuZG9jdW1lbnQgfHwgdGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSxcclxuICAgICAgICAgICAgICAgICAgICBpID0gbWF0Y2hlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoLS1pID49IDAgJiYgbWF0Y2hlcy5pdGVtKGkpICE9PSB0aGlzKSB7fVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgPiAtMTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRWxlbWVudC5jbG9zZXN0XHJcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9jbG9zZXN0XHJcbiAgICBpZiAod2luZG93LkVsZW1lbnQgJiYgIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcclxuICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2hlcyA9ICh0aGlzLmRvY3VtZW50IHx8IHRoaXMub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzKSxcclxuICAgICAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgICAgICBlbCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIGkgPSBtYXRjaGVzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHdoaWxlICgtLWkgPj0gMCAmJiBtYXRjaGVzLml0ZW0oaSkgIT09IGVsKSB7fTtcclxuICAgICAgICAgICAgfSB3aGlsZSAoKGkgPCAwKSAmJiAoZWwgPSBlbC5wYXJlbnRFbGVtZW50KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1peGluKG8sIHBzKSB7XHJcbiAgICAgICAgaWYgKCFvKSByZXR1cm47XHJcbiAgICAgICAgT2JqZWN0LmtleXMocHMpLmZvckVhY2goZnVuY3Rpb24ocCkge1xyXG4gICAgICAgICAgICBpZiAoKHAgaW4gbykgfHwgKHAgaW4gby5wcm90b3R5cGUpKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoXHJcbiAgICAgICAgICAgICAgICAgICAgby5wcm90b3R5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgcCxcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHBzLCBwKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRocm93cyBpbiBJRTg7IGp1c3QgY29weSBpdFxyXG4gICAgICAgICAgICAgICAgb1twXSA9IHBzW3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWl4aW4gUGFyZW50Tm9kZVxyXG4gICAgLy8gaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNpbnRlcmZhY2UtcGFyZW50bm9kZVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbnZlcnROb2Rlc0ludG9BTm9kZShub2Rlcykge1xyXG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcclxuICAgICAgICBub2RlcyA9IG5vZGVzLm1hcChmdW5jdGlvbihub2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhKG5vZGUgaW5zdGFuY2VvZiBOb2RlKSA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpIDogbm9kZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAobm9kZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2Rlc1swXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG4pIHsgbm9kZS5hcHBlbmRDaGlsZChuKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBQYXJlbnROb2RlID0ge1xyXG4gICAgICAgIHByZXBlbmQ6IGZ1bmN0aW9uKC8qLi4ubm9kZXMqLykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIG5vZGVzID0gY29udmVydE5vZGVzSW50b0FOb2RlKG5vZGVzKTtcclxuICAgICAgICAgICAgdGhpcy5pbnNlcnRCZWZvcmUobm9kZXMsIHRoaXMuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhcHBlbmQ6IGZ1bmN0aW9uKC8qLi4ubm9kZXMqLykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIG5vZGVzID0gY29udmVydE5vZGVzSW50b0FOb2RlKG5vZGVzKTtcclxuICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChub2Rlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBtaXhpbihnbG9iYWwuRG9jdW1lbnQgfHwgZ2xvYmFsLkhUTUxEb2N1bWVudCwgUGFyZW50Tm9kZSk7IC8vIEhUTUxEb2N1bWVudCBmb3IgSUU4XHJcbiAgICBtaXhpbihnbG9iYWwuRG9jdW1lbnRGcmFnbWVudCwgUGFyZW50Tm9kZSk7XHJcbiAgICBtaXhpbihnbG9iYWwuRWxlbWVudCwgUGFyZW50Tm9kZSk7XHJcblxyXG4gICAgLy8gTWl4aW4gQ2hpbGROb2RlXHJcbiAgICAvLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2ludGVyZmFjZS1jaGlsZG5vZGVcclxuXHJcbiAgICB2YXIgQ2hpbGROb2RlID0ge1xyXG4gICAgICAgIGJlZm9yZTogZnVuY3Rpb24oLyouLi5ub2RlcyovKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgaWYgKCFwYXJlbnQpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIHZpYWJsZVByZXZpb3VzU2libGluZyA9IHRoaXMucHJldmlvdXNTaWJsaW5nO1xyXG4gICAgICAgICAgICB3aGlsZSAobm9kZXMuaW5kZXhPZih2aWFibGVQcmV2aW91c1NpYmxpbmcpICE9PSAtMSlcclxuICAgICAgICAgICAgICAgIHZpYWJsZVByZXZpb3VzU2libGluZyA9IHZpYWJsZVByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmc7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY29udmVydE5vZGVzSW50b0FOb2RlKG5vZGVzKTtcclxuICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShub2RlLCB2aWFibGVQcmV2aW91c1NpYmxpbmcgP1xyXG4gICAgICAgICAgICAgICAgdmlhYmxlUHJldmlvdXNTaWJsaW5nLm5leHRTaWJsaW5nIDogcGFyZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWZ0ZXI6IGZ1bmN0aW9uKC8qLi4ubm9kZXMqLykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIGlmICghcGFyZW50KSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciB2aWFibGVOZXh0U2libGluZyA9IHRoaXMubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgICAgIHdoaWxlIChub2Rlcy5pbmRleE9mKHZpYWJsZU5leHRTaWJsaW5nKSAhPT0gLTEpXHJcbiAgICAgICAgICAgICAgICB2aWFibGVOZXh0U2libGluZyA9IHZpYWJsZU5leHRTaWJsaW5nLm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNvbnZlcnROb2Rlc0ludG9BTm9kZShub2Rlcyk7XHJcbiAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgdmlhYmxlTmV4dFNpYmxpbmcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVwbGFjZVdpdGg6IGZ1bmN0aW9uKC8qLi4ubm9kZXMqLykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIGlmICghcGFyZW50KSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciB2aWFibGVOZXh0U2libGluZyA9IHRoaXMubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgICAgIHdoaWxlIChub2Rlcy5pbmRleE9mKHZpYWJsZU5leHRTaWJsaW5nKSAhPT0gLTEpXHJcbiAgICAgICAgICAgICAgICB2aWFibGVOZXh0U2libGluZyA9IHZpYWJsZU5leHRTaWJsaW5nLm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNvbnZlcnROb2Rlc0ludG9BTm9kZShub2Rlcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlID09PSBwYXJlbnQpXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKG5vZGUsIHRoaXMpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHZpYWJsZU5leHRTaWJsaW5nKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wYXJlbnROb2RlKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIG1peGluKGdsb2JhbC5Eb2N1bWVudFR5cGUsIENoaWxkTm9kZSk7XHJcbiAgICBtaXhpbihnbG9iYWwuRWxlbWVudCwgQ2hpbGROb2RlKTtcclxuICAgIG1peGluKGdsb2JhbC5DaGFyYWN0ZXJEYXRhLCBDaGlsZE5vZGUpO1xyXG5cclxufShzZWxmKSk7IiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbi8qKlxuICogZXh0cmFjdEV4dGVuc2lvblxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9IHBhdGggZm9yIHVybFxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxuICovXG5leHBvcnQgY29uc3QgZXh0cmFjdEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICBpZighcGF0aCB8fCBwYXRoLnN1YnN0cigwLDQpPT0ncnRtcCcpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKSB7XG4gICAgICAgIGxldCBleHRlbnNpb24gPSBcIlwiO1xuICAgICAgICBpZiAoKC9bKCxdZm9ybWF0PW1wZC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ21wZCc7XG4gICAgICAgIH1lbHNlIGlmICgoL1soLF1mb3JtYXQ9bTN1OC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ20zdTgnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbnNpb247XG4gICAgfVxuXG4gICAgbGV0IGF6dXJlZEZvcm1hdCA9IGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKTtcbiAgICBpZihhenVyZWRGb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGF6dXJlZEZvcm1hdDtcbiAgICB9XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xuICAgIGlmKHBhdGgubGFzdEluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxLCBwYXRoLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufTtcblxuXG4vKipcbiAqIG5hdHVyYWxIbXNcbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyIHwgc3RyaW5nfSAgc2Vjb25kICBUaGUgc2Vjb25kXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgZm9ybWF0dGVkIFN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbEhtcyhzZWNvbmQpIHtcbiAgICBsZXQgc2VjTnVtID0gcGFyc2VJbnQoc2Vjb25kLCAxMCk7XG4gICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xuICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjTnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuICAgIGxldCBzZWNvbmRzID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcblxuICAgIGlmIChob3VycyA+IDApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cblxuICAgIGlmIChob3VycyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH1cbn0iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjkuMVxyXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcclxuLy8gICAgIChjKSAyMDA5LTIwMTggSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcclxuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiFmdW5jdGlvbigpe3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmJiZzZWxmfHxcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsJiZnbG9iYWx8fHRoaXN8fHt9LHI9bi5fLGU9QXJyYXkucHJvdG90eXBlLG89T2JqZWN0LnByb3RvdHlwZSxzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2w/U3ltYm9sLnByb3RvdHlwZTpudWxsLHU9ZS5wdXNoLGM9ZS5zbGljZSxwPW8udG9TdHJpbmcsaT1vLmhhc093blByb3BlcnR5LHQ9QXJyYXkuaXNBcnJheSxhPU9iamVjdC5rZXlzLGw9T2JqZWN0LmNyZWF0ZSxmPWZ1bmN0aW9uKCl7fSxoPWZ1bmN0aW9uKG4pe3JldHVybiBuIGluc3RhbmNlb2YgaD9uOnRoaXMgaW5zdGFuY2VvZiBoP3ZvaWQodGhpcy5fd3JhcHBlZD1uKTpuZXcgaChuKX07XCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHN8fGV4cG9ydHMubm9kZVR5cGU/bi5fPWg6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGUmJm1vZHVsZS5leHBvcnRzJiYoZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1oKSxleHBvcnRzLl89aCksaC5WRVJTSU9OPVwiMS45LjFcIjt2YXIgdix5PWZ1bmN0aW9uKHUsaSxuKXtpZih2b2lkIDA9PT1pKXJldHVybiB1O3N3aXRjaChudWxsPT1uPzM6bil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdS5jYWxsKGksbil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLHQpe3JldHVybiB1LmNhbGwoaSxuLHIsdCl9O2Nhc2UgNDpyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHUuY2FsbChpLG4scix0LGUpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdS5hcHBseShpLGFyZ3VtZW50cyl9fSxkPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5pdGVyYXRlZSE9PXY/aC5pdGVyYXRlZShuLHIpOm51bGw9PW4/aC5pZGVudGl0eTpoLmlzRnVuY3Rpb24obik/eShuLHIsdCk6aC5pc09iamVjdChuKSYmIWguaXNBcnJheShuKT9oLm1hdGNoZXIobik6aC5wcm9wZXJ0eShuKX07aC5pdGVyYXRlZT12PWZ1bmN0aW9uKG4scil7cmV0dXJuIGQobixyLDEvMCl9O3ZhciBnPWZ1bmN0aW9uKHUsaSl7cmV0dXJuIGk9bnVsbD09aT91Lmxlbmd0aC0xOitpLGZ1bmN0aW9uKCl7Zm9yKHZhciBuPU1hdGgubWF4KGFyZ3VtZW50cy5sZW5ndGgtaSwwKSxyPUFycmF5KG4pLHQ9MDt0PG47dCsrKXJbdF09YXJndW1lbnRzW3QraV07c3dpdGNoKGkpe2Nhc2UgMDpyZXR1cm4gdS5jYWxsKHRoaXMscik7Y2FzZSAxOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0scik7Y2FzZSAyOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdLHIpfXZhciBlPUFycmF5KGkrMSk7Zm9yKHQ9MDt0PGk7dCsrKWVbdF09YXJndW1lbnRzW3RdO3JldHVybiBlW2ldPXIsdS5hcHBseSh0aGlzLGUpfX0sbT1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm57fTtpZihsKXJldHVybiBsKG4pO2YucHJvdG90eXBlPW47dmFyIHI9bmV3IGY7cmV0dXJuIGYucHJvdG90eXBlPW51bGwscn0sYj1mdW5jdGlvbihyKXtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/dm9pZCAwOm5bcl19fSxqPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGwhPW4mJmkuY2FsbChuLHIpfSx4PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXtpZihudWxsPT1uKXJldHVybjtuPW5bcltlXV19cmV0dXJuIHQ/bjp2b2lkIDB9LF89TWF0aC5wb3coMiw1MyktMSxBPWIoXCJsZW5ndGhcIiksdz1mdW5jdGlvbihuKXt2YXIgcj1BKG4pO3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiByJiYwPD1yJiZyPD1ffTtoLmVhY2g9aC5mb3JFYWNoPWZ1bmN0aW9uKG4scix0KXt2YXIgZSx1O2lmKHI9eShyLHQpLHcobikpZm9yKGU9MCx1PW4ubGVuZ3RoO2U8dTtlKyspcihuW2VdLGUsbik7ZWxzZXt2YXIgaT1oLmtleXMobik7Zm9yKGU9MCx1PWkubGVuZ3RoO2U8dTtlKyspcihuW2lbZV1dLGlbZV0sbil9cmV0dXJuIG59LGgubWFwPWguY29sbGVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9QXJyYXkodSksbz0wO288dTtvKyspe3ZhciBhPWU/ZVtvXTpvO2lbb109cihuW2FdLGEsbil9cmV0dXJuIGl9O3ZhciBPPWZ1bmN0aW9uKGMpe3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0zPD1hcmd1bWVudHMubGVuZ3RoO3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0hdyhuKSYmaC5rZXlzKG4pLGk9KHV8fG4pLmxlbmd0aCxvPTA8Yz8wOmktMTtmb3IoZXx8KHQ9blt1P3Vbb106b10sbys9Yyk7MDw9byYmbzxpO28rPWMpe3ZhciBhPXU/dVtvXTpvO3Q9cih0LG5bYV0sYSxuKX1yZXR1cm4gdH0obix5KHIsZSw0KSx0LHUpfX07aC5yZWR1Y2U9aC5mb2xkbD1oLmluamVjdD1PKDEpLGgucmVkdWNlUmlnaHQ9aC5mb2xkcj1PKC0xKSxoLmZpbmQ9aC5kZXRlY3Q9ZnVuY3Rpb24obixyLHQpe3ZhciBlPSh3KG4pP2guZmluZEluZGV4OmguZmluZEtleSkobixyLHQpO2lmKHZvaWQgMCE9PWUmJi0xIT09ZSlyZXR1cm4gbltlXX0saC5maWx0ZXI9aC5zZWxlY3Q9ZnVuY3Rpb24obixlLHIpe3ZhciB1PVtdO3JldHVybiBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7ZShuLHIsdCkmJnUucHVzaChuKX0pLHV9LGgucmVqZWN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5maWx0ZXIobixoLm5lZ2F0ZShkKHIpKSx0KX0saC5ldmVyeT1oLmFsbD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZighcihuW29dLG8sbikpcmV0dXJuITF9cmV0dXJuITB9LGguc29tZT1oLmFueT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZihyKG5bb10sbyxuKSlyZXR1cm4hMH1yZXR1cm4hMX0saC5jb250YWlucz1oLmluY2x1ZGVzPWguaW5jbHVkZT1mdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLChcIm51bWJlclwiIT10eXBlb2YgdHx8ZSkmJih0PTApLDA8PWguaW5kZXhPZihuLHIsdCl9LGguaW52b2tlPWcoZnVuY3Rpb24obix0LGUpe3ZhciB1LGk7cmV0dXJuIGguaXNGdW5jdGlvbih0KT9pPXQ6aC5pc0FycmF5KHQpJiYodT10LnNsaWNlKDAsLTEpLHQ9dFt0Lmxlbmd0aC0xXSksaC5tYXAobixmdW5jdGlvbihuKXt2YXIgcj1pO2lmKCFyKXtpZih1JiZ1Lmxlbmd0aCYmKG49eChuLHUpKSxudWxsPT1uKXJldHVybjtyPW5bdF19cmV0dXJuIG51bGw9PXI/cjpyLmFwcGx5KG4sZSl9KX0pLGgucGx1Y2s9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5tYXAobixoLnByb3BlcnR5KHIpKX0saC53aGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbHRlcihuLGgubWF0Y2hlcihyKSl9LGguZmluZFdoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmluZChuLGgubWF0Y2hlcihyKSl9LGgubWF4PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9LTEvMCxvPS0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmaTx0JiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXt1PWUobixyLHQpLChvPHV8fHU9PT0tMS8wJiZpPT09LTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLm1pbj1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPTEvMCxvPTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZ0PGkmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpeygodT1lKG4scix0KSk8b3x8dT09PTEvMCYmaT09PTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLnNodWZmbGU9ZnVuY3Rpb24obil7cmV0dXJuIGguc2FtcGxlKG4sMS8wKX0saC5zYW1wbGU9ZnVuY3Rpb24obixyLHQpe2lmKG51bGw9PXJ8fHQpcmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSxuW2gucmFuZG9tKG4ubGVuZ3RoLTEpXTt2YXIgZT13KG4pP2guY2xvbmUobik6aC52YWx1ZXMobiksdT1BKGUpO3I9TWF0aC5tYXgoTWF0aC5taW4ocix1KSwwKTtmb3IodmFyIGk9dS0xLG89MDtvPHI7bysrKXt2YXIgYT1oLnJhbmRvbShvLGkpLGM9ZVtvXTtlW29dPWVbYV0sZVthXT1jfXJldHVybiBlLnNsaWNlKDAscil9LGguc29ydEJ5PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT0wO3JldHVybiBlPWQoZSxyKSxoLnBsdWNrKGgubWFwKG4sZnVuY3Rpb24obixyLHQpe3JldHVybnt2YWx1ZTpuLGluZGV4OnUrKyxjcml0ZXJpYTplKG4scix0KX19KS5zb3J0KGZ1bmN0aW9uKG4scil7dmFyIHQ9bi5jcml0ZXJpYSxlPXIuY3JpdGVyaWE7aWYodCE9PWUpe2lmKGU8dHx8dm9pZCAwPT09dClyZXR1cm4gMTtpZih0PGV8fHZvaWQgMD09PWUpcmV0dXJuLTF9cmV0dXJuIG4uaW5kZXgtci5pbmRleH0pLFwidmFsdWVcIil9O3ZhciBrPWZ1bmN0aW9uKG8scil7cmV0dXJuIGZ1bmN0aW9uKGUsdSxuKXt2YXIgaT1yP1tbXSxbXV06e307cmV0dXJuIHU9ZCh1LG4pLGguZWFjaChlLGZ1bmN0aW9uKG4scil7dmFyIHQ9dShuLHIsZSk7byhpLG4sdCl9KSxpfX07aC5ncm91cEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdLnB1c2gocik6blt0XT1bcl19KSxoLmluZGV4Qnk9ayhmdW5jdGlvbihuLHIsdCl7blt0XT1yfSksaC5jb3VudEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdKys6blt0XT0xfSk7dmFyIFM9L1teXFx1ZDgwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkYmZmXVtcXHVkYzAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRmZmZdL2c7aC50b0FycmF5PWZ1bmN0aW9uKG4pe3JldHVybiBuP2guaXNBcnJheShuKT9jLmNhbGwobik6aC5pc1N0cmluZyhuKT9uLm1hdGNoKFMpOncobik/aC5tYXAobixoLmlkZW50aXR5KTpoLnZhbHVlcyhuKTpbXX0saC5zaXplPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPzA6dyhuKT9uLmxlbmd0aDpoLmtleXMobikubGVuZ3RofSxoLnBhcnRpdGlvbj1rKGZ1bmN0aW9uKG4scix0KXtuW3Q/MDoxXS5wdXNoKHIpfSwhMCksaC5maXJzdD1oLmhlYWQ9aC50YWtlPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bMF06aC5pbml0aWFsKG4sbi5sZW5ndGgtcil9LGguaW5pdGlhbD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLDAsTWF0aC5tYXgoMCxuLmxlbmd0aC0obnVsbD09cnx8dD8xOnIpKSl9LGgubGFzdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uW24ubGVuZ3RoLTFdOmgucmVzdChuLE1hdGgubWF4KDAsbi5sZW5ndGgtcikpfSxoLnJlc3Q9aC50YWlsPWguZHJvcD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLG51bGw9PXJ8fHQ/MTpyKX0saC5jb21wYWN0PWZ1bmN0aW9uKG4pe3JldHVybiBoLmZpbHRlcihuLEJvb2xlYW4pfTt2YXIgTT1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KGU9ZXx8W10pLmxlbmd0aCxpPTAsbz1BKG4pO2k8bztpKyspe3ZhciBhPW5baV07aWYodyhhKSYmKGguaXNBcnJheShhKXx8aC5pc0FyZ3VtZW50cyhhKSkpaWYocilmb3IodmFyIGM9MCxsPWEubGVuZ3RoO2M8bDspZVt1KytdPWFbYysrXTtlbHNlIE0oYSxyLHQsZSksdT1lLmxlbmd0aDtlbHNlIHR8fChlW3UrK109YSl9cmV0dXJuIGV9O2guZmxhdHRlbj1mdW5jdGlvbihuLHIpe3JldHVybiBNKG4sciwhMSl9LGgud2l0aG91dD1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIGguZGlmZmVyZW5jZShuLHIpfSksaC51bmlxPWgudW5pcXVlPWZ1bmN0aW9uKG4scix0LGUpe2guaXNCb29sZWFuKHIpfHwoZT10LHQ9cixyPSExKSxudWxsIT10JiYodD1kKHQsZSkpO2Zvcih2YXIgdT1bXSxpPVtdLG89MCxhPUEobik7bzxhO28rKyl7dmFyIGM9bltvXSxsPXQ/dChjLG8sbik6YztyJiYhdD8obyYmaT09PWx8fHUucHVzaChjKSxpPWwpOnQ/aC5jb250YWlucyhpLGwpfHwoaS5wdXNoKGwpLHUucHVzaChjKSk6aC5jb250YWlucyh1LGMpfHx1LnB1c2goYyl9cmV0dXJuIHV9LGgudW5pb249ZyhmdW5jdGlvbihuKXtyZXR1cm4gaC51bmlxKE0obiwhMCwhMCkpfSksaC5pbnRlcnNlY3Rpb249ZnVuY3Rpb24obil7Zm9yKHZhciByPVtdLHQ9YXJndW1lbnRzLmxlbmd0aCxlPTAsdT1BKG4pO2U8dTtlKyspe3ZhciBpPW5bZV07aWYoIWguY29udGFpbnMocixpKSl7dmFyIG87Zm9yKG89MTtvPHQmJmguY29udGFpbnMoYXJndW1lbnRzW29dLGkpO28rKyk7bz09PXQmJnIucHVzaChpKX19cmV0dXJuIHJ9LGguZGlmZmVyZW5jZT1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIHI9TShyLCEwLCEwKSxoLmZpbHRlcihuLGZ1bmN0aW9uKG4pe3JldHVybiFoLmNvbnRhaW5zKHIsbil9KX0pLGgudW56aXA9ZnVuY3Rpb24obil7Zm9yKHZhciByPW4mJmgubWF4KG4sQSkubGVuZ3RofHwwLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1oLnBsdWNrKG4sZSk7cmV0dXJuIHR9LGguemlwPWcoaC51bnppcCksaC5vYmplY3Q9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9e30sZT0wLHU9QShuKTtlPHU7ZSsrKXI/dFtuW2VdXT1yW2VdOnRbbltlXVswXV09bltlXVsxXTtyZXR1cm4gdH07dmFyIEY9ZnVuY3Rpb24oaSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9QShuKSx1PTA8aT8wOmUtMTswPD11JiZ1PGU7dSs9aSlpZihyKG5bdV0sdSxuKSlyZXR1cm4gdTtyZXR1cm4tMX19O2guZmluZEluZGV4PUYoMSksaC5maW5kTGFzdEluZGV4PUYoLTEpLGguc29ydGVkSW5kZXg9ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PSh0PWQodCxlLDEpKShyKSxpPTAsbz1BKG4pO2k8bzspe3ZhciBhPU1hdGguZmxvb3IoKGkrbykvMik7dChuW2FdKTx1P2k9YSsxOm89YX1yZXR1cm4gaX07dmFyIEU9ZnVuY3Rpb24oaSxvLGEpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7dmFyIGU9MCx1PUEobik7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpMDxpP2U9MDw9dD90Ok1hdGgubWF4KHQrdSxlKTp1PTA8PXQ/TWF0aC5taW4odCsxLHUpOnQrdSsxO2Vsc2UgaWYoYSYmdCYmdSlyZXR1cm4gblt0PWEobixyKV09PT1yP3Q6LTE7aWYociE9cilyZXR1cm4gMDw9KHQ9byhjLmNhbGwobixlLHUpLGguaXNOYU4pKT90K2U6LTE7Zm9yKHQ9MDxpP2U6dS0xOzA8PXQmJnQ8dTt0Kz1pKWlmKG5bdF09PT1yKXJldHVybiB0O3JldHVybi0xfX07aC5pbmRleE9mPUUoMSxoLmZpbmRJbmRleCxoLnNvcnRlZEluZGV4KSxoLmxhc3RJbmRleE9mPUUoLTEsaC5maW5kTGFzdEluZGV4KSxoLnJhbmdlPWZ1bmN0aW9uKG4scix0KXtudWxsPT1yJiYocj1ufHwwLG49MCksdHx8KHQ9cjxuPy0xOjEpO2Zvcih2YXIgZT1NYXRoLm1heChNYXRoLmNlaWwoKHItbikvdCksMCksdT1BcnJheShlKSxpPTA7aTxlO2krKyxuKz10KXVbaV09bjtyZXR1cm4gdX0saC5jaHVuaz1mdW5jdGlvbihuLHIpe2lmKG51bGw9PXJ8fHI8MSlyZXR1cm5bXTtmb3IodmFyIHQ9W10sZT0wLHU9bi5sZW5ndGg7ZTx1Oyl0LnB1c2goYy5jYWxsKG4sZSxlKz1yKSk7cmV0dXJuIHR9O3ZhciBOPWZ1bmN0aW9uKG4scix0LGUsdSl7aWYoIShlIGluc3RhbmNlb2YgcikpcmV0dXJuIG4uYXBwbHkodCx1KTt2YXIgaT1tKG4ucHJvdG90eXBlKSxvPW4uYXBwbHkoaSx1KTtyZXR1cm4gaC5pc09iamVjdChvKT9vOml9O2guYmluZD1nKGZ1bmN0aW9uKHIsdCxlKXtpZighaC5pc0Z1bmN0aW9uKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb25cIik7dmFyIHU9ZyhmdW5jdGlvbihuKXtyZXR1cm4gTihyLHUsdCx0aGlzLGUuY29uY2F0KG4pKX0pO3JldHVybiB1fSksaC5wYXJ0aWFsPWcoZnVuY3Rpb24odSxpKXt2YXIgbz1oLnBhcnRpYWwucGxhY2Vob2xkZXIsYT1mdW5jdGlvbigpe2Zvcih2YXIgbj0wLHI9aS5sZW5ndGgsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWlbZV09PT1vP2FyZ3VtZW50c1tuKytdOmlbZV07Zm9yKDtuPGFyZ3VtZW50cy5sZW5ndGg7KXQucHVzaChhcmd1bWVudHNbbisrXSk7cmV0dXJuIE4odSxhLHRoaXMsdGhpcyx0KX07cmV0dXJuIGF9KSwoaC5wYXJ0aWFsLnBsYWNlaG9sZGVyPWgpLmJpbmRBbGw9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PShyPU0ociwhMSwhMSkpLmxlbmd0aDtpZih0PDEpdGhyb3cgbmV3IEVycm9yKFwiYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lc1wiKTtmb3IoO3QtLTspe3ZhciBlPXJbdF07bltlXT1oLmJpbmQobltlXSxuKX19KSxoLm1lbW9pemU9ZnVuY3Rpb24oZSx1KXt2YXIgaT1mdW5jdGlvbihuKXt2YXIgcj1pLmNhY2hlLHQ9XCJcIisodT91LmFwcGx5KHRoaXMsYXJndW1lbnRzKTpuKTtyZXR1cm4gaihyLHQpfHwoclt0XT1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksclt0XX07cmV0dXJuIGkuY2FjaGU9e30saX0saC5kZWxheT1nKGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBuLmFwcGx5KG51bGwsdCl9LHIpfSksaC5kZWZlcj1oLnBhcnRpYWwoaC5kZWxheSxoLDEpLGgudGhyb3R0bGU9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYSxjLGw9MDt1fHwodT17fSk7dmFyIGY9ZnVuY3Rpb24oKXtsPSExPT09dS5sZWFkaW5nPzA6aC5ub3coKSxpPW51bGwsYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKX0sbj1mdW5jdGlvbigpe3ZhciBuPWgubm93KCk7bHx8ITEhPT11LmxlYWRpbmd8fChsPW4pO3ZhciByPWUtKG4tbCk7cmV0dXJuIG89dGhpcyxhPWFyZ3VtZW50cyxyPD0wfHxlPHI/KGkmJihjbGVhclRpbWVvdXQoaSksaT1udWxsKSxsPW4sYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKSk6aXx8ITE9PT11LnRyYWlsaW5nfHwoaT1zZXRUaW1lb3V0KGYscikpLGN9O3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxsPTAsaT1vPWE9bnVsbH0sbn0saC5kZWJvdW5jZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhPWZ1bmN0aW9uKG4scil7aT1udWxsLHImJihvPXQuYXBwbHkobixyKSl9LG49ZyhmdW5jdGlvbihuKXtpZihpJiZjbGVhclRpbWVvdXQoaSksdSl7dmFyIHI9IWk7aT1zZXRUaW1lb3V0KGEsZSksciYmKG89dC5hcHBseSh0aGlzLG4pKX1lbHNlIGk9aC5kZWxheShhLGUsdGhpcyxuKTtyZXR1cm4gb30pO3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxpPW51bGx9LG59LGgud3JhcD1mdW5jdGlvbihuLHIpe3JldHVybiBoLnBhcnRpYWwocixuKX0saC5uZWdhdGU9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5jb21wb3NlPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLGU9dC5sZW5ndGgtMTtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIG49ZSxyPXRbZV0uYXBwbHkodGhpcyxhcmd1bWVudHMpO24tLTspcj10W25dLmNhbGwodGhpcyxyKTtyZXR1cm4gcn19LGguYWZ0ZXI9ZnVuY3Rpb24obixyKXtyZXR1cm4gZnVuY3Rpb24oKXtpZigtLW48MSlyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmJlZm9yZT1mdW5jdGlvbihuLHIpe3ZhciB0O3JldHVybiBmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHQ9ci5hcHBseSh0aGlzLGFyZ3VtZW50cykpLG48PTEmJihyPW51bGwpLHR9fSxoLm9uY2U9aC5wYXJ0aWFsKGguYmVmb3JlLDIpLGgucmVzdEFyZ3VtZW50cz1nO3ZhciBJPSF7dG9TdHJpbmc6bnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoXCJ0b1N0cmluZ1wiKSxUPVtcInZhbHVlT2ZcIixcImlzUHJvdG90eXBlT2ZcIixcInRvU3RyaW5nXCIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFwiaGFzT3duUHJvcGVydHlcIixcInRvTG9jYWxlU3RyaW5nXCJdLEI9ZnVuY3Rpb24obixyKXt2YXIgdD1ULmxlbmd0aCxlPW4uY29uc3RydWN0b3IsdT1oLmlzRnVuY3Rpb24oZSkmJmUucHJvdG90eXBlfHxvLGk9XCJjb25zdHJ1Y3RvclwiO2ZvcihqKG4saSkmJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKTt0LS07KShpPVRbdF0paW4gbiYmbltpXSE9PXVbaV0mJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKX07aC5rZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO2lmKGEpcmV0dXJuIGEobik7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paihuLHQpJiZyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLmFsbEtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107dmFyIHI9W107Zm9yKHZhciB0IGluIG4pci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC52YWx1ZXM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1uW3JbdV1dO3JldHVybiBlfSxoLm1hcE9iamVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPWgua2V5cyhuKSx1PWUubGVuZ3RoLGk9e30sbz0wO288dTtvKyspe3ZhciBhPWVbb107aVthXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX0saC5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPVtyW3VdLG5bclt1XV1dO3JldHVybiBlfSxoLmludmVydD1mdW5jdGlvbihuKXtmb3IodmFyIHI9e30sdD1oLmtleXMobiksZT0wLHU9dC5sZW5ndGg7ZTx1O2UrKylyW25bdFtlXV1dPXRbZV07cmV0dXJuIHJ9LGguZnVuY3Rpb25zPWgubWV0aG9kcz1mdW5jdGlvbihuKXt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbiloLmlzRnVuY3Rpb24oblt0XSkmJnIucHVzaCh0KTtyZXR1cm4gci5zb3J0KCl9O3ZhciBSPWZ1bmN0aW9uKGMsbCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg7aWYobCYmKG49T2JqZWN0KG4pKSxyPDJ8fG51bGw9PW4pcmV0dXJuIG47Zm9yKHZhciB0PTE7dDxyO3QrKylmb3IodmFyIGU9YXJndW1lbnRzW3RdLHU9YyhlKSxpPXUubGVuZ3RoLG89MDtvPGk7bysrKXt2YXIgYT11W29dO2wmJnZvaWQgMCE9PW5bYV18fChuW2FdPWVbYV0pfXJldHVybiBufX07aC5leHRlbmQ9UihoLmFsbEtleXMpLGguZXh0ZW5kT3duPWguYXNzaWduPVIoaC5rZXlzKSxoLmZpbmRLZXk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZSx1PWgua2V5cyhuKSxpPTAsbz11Lmxlbmd0aDtpPG87aSsrKWlmKHIobltlPXVbaV1dLGUsbikpcmV0dXJuIGV9O3ZhciBxLEssej1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIHIgaW4gdH07aC5waWNrPWcoZnVuY3Rpb24obixyKXt2YXIgdD17fSxlPXJbMF07aWYobnVsbD09bilyZXR1cm4gdDtoLmlzRnVuY3Rpb24oZSk/KDE8ci5sZW5ndGgmJihlPXkoZSxyWzFdKSkscj1oLmFsbEtleXMobikpOihlPXoscj1NKHIsITEsITEpLG49T2JqZWN0KG4pKTtmb3IodmFyIHU9MCxpPXIubGVuZ3RoO3U8aTt1Kyspe3ZhciBvPXJbdV0sYT1uW29dO2UoYSxvLG4pJiYodFtvXT1hKX1yZXR1cm4gdH0pLGgub21pdD1nKGZ1bmN0aW9uKG4sdCl7dmFyIHIsZT10WzBdO3JldHVybiBoLmlzRnVuY3Rpb24oZSk/KGU9aC5uZWdhdGUoZSksMTx0Lmxlbmd0aCYmKHI9dFsxXSkpOih0PWgubWFwKE0odCwhMSwhMSksU3RyaW5nKSxlPWZ1bmN0aW9uKG4scil7cmV0dXJuIWguY29udGFpbnModCxyKX0pLGgucGljayhuLGUscil9KSxoLmRlZmF1bHRzPVIoaC5hbGxLZXlzLCEwKSxoLmNyZWF0ZT1mdW5jdGlvbihuLHIpe3ZhciB0PW0obik7cmV0dXJuIHImJmguZXh0ZW5kT3duKHQsciksdH0saC5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc09iamVjdChuKT9oLmlzQXJyYXkobik/bi5zbGljZSgpOmguZXh0ZW5kKHt9LG4pOm59LGgudGFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIHIobiksbn0saC5pc01hdGNoPWZ1bmN0aW9uKG4scil7dmFyIHQ9aC5rZXlzKHIpLGU9dC5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3IodmFyIHU9T2JqZWN0KG4pLGk9MDtpPGU7aSsrKXt2YXIgbz10W2ldO2lmKHJbb10hPT11W29dfHwhKG8gaW4gdSkpcmV0dXJuITF9cmV0dXJuITB9LHE9ZnVuY3Rpb24obixyLHQsZSl7aWYobj09PXIpcmV0dXJuIDAhPT1ufHwxL249PTEvcjtpZihudWxsPT1ufHxudWxsPT1yKXJldHVybiExO2lmKG4hPW4pcmV0dXJuIHIhPXI7dmFyIHU9dHlwZW9mIG47cmV0dXJuKFwiZnVuY3Rpb25cIj09PXV8fFwib2JqZWN0XCI9PT11fHxcIm9iamVjdFwiPT10eXBlb2YgcikmJksobixyLHQsZSl9LEs9ZnVuY3Rpb24obixyLHQsZSl7biBpbnN0YW5jZW9mIGgmJihuPW4uX3dyYXBwZWQpLHIgaW5zdGFuY2VvZiBoJiYocj1yLl93cmFwcGVkKTt2YXIgdT1wLmNhbGwobik7aWYodSE9PXAuY2FsbChyKSlyZXR1cm4hMTtzd2l0Y2godSl7Y2FzZVwiW29iamVjdCBSZWdFeHBdXCI6Y2FzZVwiW29iamVjdCBTdHJpbmddXCI6cmV0dXJuXCJcIituPT1cIlwiK3I7Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cmV0dXJuK24hPStuPytyIT0rcjowPT0rbj8xLytuPT0xL3I6K249PStyO2Nhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6cmV0dXJuK249PStyO2Nhc2VcIltvYmplY3QgU3ltYm9sXVwiOnJldHVybiBzLnZhbHVlT2YuY2FsbChuKT09PXMudmFsdWVPZi5jYWxsKHIpfXZhciBpPVwiW29iamVjdCBBcnJheV1cIj09PXU7aWYoIWkpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBufHxcIm9iamVjdFwiIT10eXBlb2YgcilyZXR1cm4hMTt2YXIgbz1uLmNvbnN0cnVjdG9yLGE9ci5jb25zdHJ1Y3RvcjtpZihvIT09YSYmIShoLmlzRnVuY3Rpb24obykmJm8gaW5zdGFuY2VvZiBvJiZoLmlzRnVuY3Rpb24oYSkmJmEgaW5zdGFuY2VvZiBhKSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gcilyZXR1cm4hMX1lPWV8fFtdO2Zvcih2YXIgYz0odD10fHxbXSkubGVuZ3RoO2MtLTspaWYodFtjXT09PW4pcmV0dXJuIGVbY109PT1yO2lmKHQucHVzaChuKSxlLnB1c2gociksaSl7aWYoKGM9bi5sZW5ndGgpIT09ci5sZW5ndGgpcmV0dXJuITE7Zm9yKDtjLS07KWlmKCFxKG5bY10scltjXSx0LGUpKXJldHVybiExfWVsc2V7dmFyIGwsZj1oLmtleXMobik7aWYoYz1mLmxlbmd0aCxoLmtleXMocikubGVuZ3RoIT09YylyZXR1cm4hMTtmb3IoO2MtLTspaWYobD1mW2NdLCFqKHIsbCl8fCFxKG5bbF0scltsXSx0LGUpKXJldHVybiExfXJldHVybiB0LnBvcCgpLGUucG9wKCksITB9LGguaXNFcXVhbD1mdW5jdGlvbihuLHIpe3JldHVybiBxKG4scil9LGguaXNFbXB0eT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bnx8KHcobikmJihoLmlzQXJyYXkobil8fGguaXNTdHJpbmcobil8fGguaXNBcmd1bWVudHMobikpPzA9PT1uLmxlbmd0aDowPT09aC5rZXlzKG4pLmxlbmd0aCl9LGguaXNFbGVtZW50PWZ1bmN0aW9uKG4pe3JldHVybiEoIW58fDEhPT1uLm5vZGVUeXBlKX0saC5pc0FycmF5PXR8fGZ1bmN0aW9uKG4pe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXAuY2FsbChuKX0saC5pc09iamVjdD1mdW5jdGlvbihuKXt2YXIgcj10eXBlb2YgbjtyZXR1cm5cImZ1bmN0aW9uXCI9PT1yfHxcIm9iamVjdFwiPT09ciYmISFufSxoLmVhY2goW1wiQXJndW1lbnRzXCIsXCJGdW5jdGlvblwiLFwiU3RyaW5nXCIsXCJOdW1iZXJcIixcIkRhdGVcIixcIlJlZ0V4cFwiLFwiRXJyb3JcIixcIlN5bWJvbFwiLFwiTWFwXCIsXCJXZWFrTWFwXCIsXCJTZXRcIixcIldlYWtTZXRcIl0sZnVuY3Rpb24ocil7aFtcImlzXCIrcl09ZnVuY3Rpb24obil7cmV0dXJuIHAuY2FsbChuKT09PVwiW29iamVjdCBcIityK1wiXVwifX0pLGguaXNBcmd1bWVudHMoYXJndW1lbnRzKXx8KGguaXNBcmd1bWVudHM9ZnVuY3Rpb24obil7cmV0dXJuIGoobixcImNhbGxlZVwiKX0pO3ZhciBEPW4uZG9jdW1lbnQmJm4uZG9jdW1lbnQuY2hpbGROb2RlcztcImZ1bmN0aW9uXCIhPXR5cGVvZi8uLyYmXCJvYmplY3RcIiE9dHlwZW9mIEludDhBcnJheSYmXCJmdW5jdGlvblwiIT10eXBlb2YgRCYmKGguaXNGdW5jdGlvbj1mdW5jdGlvbihuKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBufHwhMX0pLGguaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIWguaXNTeW1ib2wobikmJmlzRmluaXRlKG4pJiYhaXNOYU4ocGFyc2VGbG9hdChuKSl9LGguaXNOYU49ZnVuY3Rpb24obil7cmV0dXJuIGguaXNOdW1iZXIobikmJmlzTmFOKG4pfSxoLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4hMD09PW58fCExPT09bnx8XCJbb2JqZWN0IEJvb2xlYW5dXCI9PT1wLmNhbGwobil9LGguaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0saC5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gdm9pZCAwPT09bn0saC5oYXM9ZnVuY3Rpb24obixyKXtpZighaC5pc0FycmF5KHIpKXJldHVybiBqKG4scik7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXt2YXIgdT1yW2VdO2lmKG51bGw9PW58fCFpLmNhbGwobix1KSlyZXR1cm4hMTtuPW5bdV19cmV0dXJuISF0fSxoLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbi5fPXIsdGhpc30saC5pZGVudGl0eT1mdW5jdGlvbihuKXtyZXR1cm4gbn0saC5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LGgubm9vcD1mdW5jdGlvbigpe30saC5wcm9wZXJ0eT1mdW5jdGlvbihyKXtyZXR1cm4gaC5pc0FycmF5KHIpP2Z1bmN0aW9uKG4pe3JldHVybiB4KG4scil9OmIocil9LGgucHJvcGVydHlPZj1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbD09cj9mdW5jdGlvbigpe306ZnVuY3Rpb24obil7cmV0dXJuIGguaXNBcnJheShuKT94KHIsbik6cltuXX19LGgubWF0Y2hlcj1oLm1hdGNoZXM9ZnVuY3Rpb24ocil7cmV0dXJuIHI9aC5leHRlbmRPd24oe30sciksZnVuY3Rpb24obil7cmV0dXJuIGguaXNNYXRjaChuLHIpfX0saC50aW1lcz1mdW5jdGlvbihuLHIsdCl7dmFyIGU9QXJyYXkoTWF0aC5tYXgoMCxuKSk7cj15KHIsdCwxKTtmb3IodmFyIHU9MDt1PG47dSsrKWVbdV09cih1KTtyZXR1cm4gZX0saC5yYW5kb209ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbD09ciYmKHI9bixuPTApLG4rTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihyLW4rMSkpfSxoLm5vdz1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX07dmFyIEw9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImI3gyNztcIixcImBcIjpcIiYjeDYwO1wifSxQPWguaW52ZXJ0KEwpLFc9ZnVuY3Rpb24ocil7dmFyIHQ9ZnVuY3Rpb24obil7cmV0dXJuIHJbbl19LG49XCIoPzpcIitoLmtleXMocikuam9pbihcInxcIikrXCIpXCIsZT1SZWdFeHAobiksdT1SZWdFeHAobixcImdcIik7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBuPW51bGw9PW4/XCJcIjpcIlwiK24sZS50ZXN0KG4pP24ucmVwbGFjZSh1LHQpOm59fTtoLmVzY2FwZT1XKEwpLGgudW5lc2NhcGU9VyhQKSxoLnJlc3VsdD1mdW5jdGlvbihuLHIsdCl7aC5pc0FycmF5KHIpfHwocj1bcl0pO3ZhciBlPXIubGVuZ3RoO2lmKCFlKXJldHVybiBoLmlzRnVuY3Rpb24odCk/dC5jYWxsKG4pOnQ7Zm9yKHZhciB1PTA7dTxlO3UrKyl7dmFyIGk9bnVsbD09bj92b2lkIDA6bltyW3VdXTt2b2lkIDA9PT1pJiYoaT10LHU9ZSksbj1oLmlzRnVuY3Rpb24oaSk/aS5jYWxsKG4pOml9cmV0dXJuIG59O3ZhciBDPTA7aC51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgcj0rK0MrXCJcIjtyZXR1cm4gbj9uK3I6cn0saC50ZW1wbGF0ZVNldHRpbmdzPXtldmFsdWF0ZTovPCUoW1xcc1xcU10rPyklPi9nLGludGVycG9sYXRlOi88JT0oW1xcc1xcU10rPyklPi9nLGVzY2FwZTovPCUtKFtcXHNcXFNdKz8pJT4vZ307dmFyIEo9LyguKV4vLFU9e1wiJ1wiOlwiJ1wiLFwiXFxcXFwiOlwiXFxcXFwiLFwiXFxyXCI6XCJyXCIsXCJcXG5cIjpcIm5cIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSxWPS9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZywkPWZ1bmN0aW9uKG4pe3JldHVyblwiXFxcXFwiK1Vbbl19O2gudGVtcGxhdGU9ZnVuY3Rpb24oaSxuLHIpeyFuJiZyJiYobj1yKSxuPWguZGVmYXVsdHMoe30sbixoLnRlbXBsYXRlU2V0dGluZ3MpO3ZhciB0LGU9UmVnRXhwKFsobi5lc2NhcGV8fEopLnNvdXJjZSwobi5pbnRlcnBvbGF0ZXx8Sikuc291cmNlLChuLmV2YWx1YXRlfHxKKS5zb3VyY2VdLmpvaW4oXCJ8XCIpK1wifCRcIixcImdcIiksbz0wLGE9XCJfX3ArPSdcIjtpLnJlcGxhY2UoZSxmdW5jdGlvbihuLHIsdCxlLHUpe3JldHVybiBhKz1pLnNsaWNlKG8sdSkucmVwbGFjZShWLCQpLG89dStuLmxlbmd0aCxyP2ErPVwiJytcXG4oKF9fdD0oXCIrcitcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjp0P2ErPVwiJytcXG4oKF9fdD0oXCIrdCtcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiOmUmJihhKz1cIic7XFxuXCIrZStcIlxcbl9fcCs9J1wiKSxufSksYSs9XCInO1xcblwiLG4udmFyaWFibGV8fChhPVwid2l0aChvYmp8fHt9KXtcXG5cIithK1wifVxcblwiKSxhPVwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiK1wicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIithK1wicmV0dXJuIF9fcDtcXG5cIjt0cnl7dD1uZXcgRnVuY3Rpb24obi52YXJpYWJsZXx8XCJvYmpcIixcIl9cIixhKX1jYXRjaChuKXt0aHJvdyBuLnNvdXJjZT1hLG59dmFyIHU9ZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbCh0aGlzLG4saCl9LGM9bi52YXJpYWJsZXx8XCJvYmpcIjtyZXR1cm4gdS5zb3VyY2U9XCJmdW5jdGlvbihcIitjK1wiKXtcXG5cIithK1wifVwiLHV9LGguY2hhaW49ZnVuY3Rpb24obil7dmFyIHI9aChuKTtyZXR1cm4gci5fY2hhaW49ITAscn07dmFyIEc9ZnVuY3Rpb24obixyKXtyZXR1cm4gbi5fY2hhaW4/aChyKS5jaGFpbigpOnJ9O2gubWl4aW49ZnVuY3Rpb24odCl7cmV0dXJuIGguZWFjaChoLmZ1bmN0aW9ucyh0KSxmdW5jdGlvbihuKXt2YXIgcj1oW25dPXRbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1bdGhpcy5fd3JhcHBlZF07cmV0dXJuIHUuYXBwbHkobixhcmd1bWVudHMpLEcodGhpcyxyLmFwcGx5KGgsbikpfX0pLGh9LGgubWl4aW4oaCksaC5lYWNoKFtcInBvcFwiLFwicHVzaFwiLFwicmV2ZXJzZVwiLFwic2hpZnRcIixcInNvcnRcIixcInNwbGljZVwiLFwidW5zaGlmdFwiXSxmdW5jdGlvbihyKXt2YXIgdD1lW3JdO2gucHJvdG90eXBlW3JdPWZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fd3JhcHBlZDtyZXR1cm4gdC5hcHBseShuLGFyZ3VtZW50cyksXCJzaGlmdFwiIT09ciYmXCJzcGxpY2VcIiE9PXJ8fDAhPT1uLmxlbmd0aHx8ZGVsZXRlIG5bMF0sRyh0aGlzLG4pfX0pLGguZWFjaChbXCJjb25jYXRcIixcImpvaW5cIixcInNsaWNlXCJdLGZ1bmN0aW9uKG4pe3ZhciByPWVbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXtyZXR1cm4gRyh0aGlzLHIuYXBwbHkodGhpcy5fd3JhcHBlZCxhcmd1bWVudHMpKX19KSxoLnByb3RvdHlwZS52YWx1ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl93cmFwcGVkfSxoLnByb3RvdHlwZS52YWx1ZU9mPWgucHJvdG90eXBlLnRvSlNPTj1oLnByb3RvdHlwZS52YWx1ZSxoLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBTdHJpbmcodGhpcy5fd3JhcHBlZCl9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFwidW5kZXJzY29yZVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIGh9KX0oKTtcclxuIiwiaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9ufSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzUnRtcCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICByZXR1cm4gKGZpbGUuaW5kZXhPZigncnRtcDonKSA9PSAwIHx8IHR5cGUgPT0gJ3J0bXAnKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGlzV2ViUlRDID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIGlmKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCd3czonKSA9PT0gMCB8fCBmaWxlLmluZGV4T2YoJ3dzczonKSA9PT0gMCB8fCB0eXBlID09PSAnd2VicnRjJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc0Rhc2ggPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgcmV0dXJuICggdHlwZSA9PT0gJ21wZCcgfHwgIHR5cGUgPT09ICdkYXNoJyB8fCB0eXBlID09PSAnYXBwbGljYXRpb24vZGFzaCt4bWwnIHx8IGV4dHJhY3RFeHRlbnNpb24oZmlsZSkgPT0gJ21wZCcpO1xyXG59O1xyXG4iLCIvKipcbiAqIHV0aWxzIGZvciB3ZWJwYWNrXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldFNjcmlwdFBhdGggPSBmdW5jdGlvbihzY3JpcHROYW1lKSB7XG4gICAgY29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3JjID0gc2NyaXB0c1tpXS5zcmM7XG4gICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3JjLmxhc3RJbmRleE9mKCcvJyArIHNjcmlwdE5hbWUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cigwLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyOS4uXG4gKi9cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gX19WRVJTSU9OX187XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI2Li5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5cclxuY29uc3QgRnVsbFNjcmVlbkJ1dHRvbiA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSl7XHJcbiAgICBjb25zdCAkcm9vdCA9IExBJChcIiNcIithcGkuZ2V0Q29udGFpbmVySWQoKSk7XHJcbiAgICBsZXQgJGljb25FeHBhbmQgPSBcIlwiLCAkaWNvbkNvbXByZXNzID0gXCJcIiwgaXNGdWxsU2NyZWVuID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IGZ1bGxTY3JlZW5FdmVudFR5cGVzID0ge1xyXG4gICAgICAgIG9uZnVsbHNjcmVlbmNoYW5nZSA6IFwiZnVsbHNjcmVlbmNoYW5nZVwiLFxyXG4gICAgICAgIG9ubW96ZnVsbHNjcmVlbmNoYW5nZSA6IFwibW96ZnVsbHNjcmVlbmNoYW5nZVwiLFxyXG4gICAgICAgIG9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSA6IFwid2Via2l0ZnVsbHNjcmVlbmNoYW5nZVwiLFxyXG4gICAgICAgIE1TRnVsbHNjcmVlbkNoYW5nZSA6IFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCJcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGZ1bGxTY3JlZW5DaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgbGV0IGNoZWNrRnVsbFNjcmVlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCB8fCBkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCB8fCBkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCB8fCBkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChjaGVja0Z1bGxTY3JlZW4oKSkge1xyXG4gICAgICAgICAgICAkcm9vdC5hZGRDbGFzcyhcIm92cC1mdWxsc2NyZWVuXCIpO1xyXG4gICAgICAgICAgICBpc0Z1bGxTY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAkaWNvbkV4cGFuZC5oaWRlKCk7XHJcbiAgICAgICAgICAgICRpY29uQ29tcHJlc3Muc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRyb290LnJlbW92ZUNsYXNzKFwib3ZwLWZ1bGxzY3JlZW5cIik7XHJcbiAgICAgICAgICAgIGlzRnVsbFNjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkaWNvbkV4cGFuZC5zaG93KCk7XHJcbiAgICAgICAgICAgICRpY29uQ29tcHJlc3MuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IHJlcXVlc3RGdWxsU2NyZWVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkcm9vdC5nZXQoKS5yZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICAkcm9vdC5nZXQoKS5yZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoJHJvb3QuZ2V0KCkud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgJHJvb3QuZ2V0KCkud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCRyb290LmdldCgpLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgICRyb290LmdldCgpLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgkcm9vdC5nZXQoKS5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgICRyb290LmdldCgpLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPKHJvY2spOiB3YXJuIG5vdCBzdXBwb3J0ZWRcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgbGV0IGV4aXRGdWxsU2NyZWVuID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8ocm9jayk6IHdhcm4gbm90IHN1cHBvcnRlZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCB0b2dnbGVGdWxsU2NyZWVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghaXNGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXhpdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICRpY29uRXhwYW5kID0gJGN1cnJlbnQuZmluZCgnLm92cC1mdWxsc2NyZWVuLWJ1dHRvbi1leHBhbmRpY29uJyk7XHJcbiAgICAgICAgJGljb25Db21wcmVzcyA9ICRjdXJyZW50LmZpbmQoJy5vdnAtZnVsbHNjcmVlbi1idXR0b24tY29tcHJlc3NpY29uJyk7XHJcblxyXG4gICAgICAgIC8vQmluZCBHbG9iYWwoZG9jdW1lbnQpIEV2ZW50XHJcbiAgICAgICAgT2JqZWN0LmtleXMoZnVsbFNjcmVlbkV2ZW50VHlwZXMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICAgICAgLy9EaWZmZXJlbmNlIGJldHdlZW4gdW5kZWZpbmVkIGFuZCBudWxsLlxyXG4gICAgICAgICAgICAvL3VuZGVmaW5lZCBpcyBub3Qgc3VwcG9ydC4gbnVsbCBpcyBzdXBwb3J0IGJ1dCBub3QgaW5pdGVkLlxyXG4gICAgICAgICAgICBpZihkb2N1bWVudFtldmVudE5hbWVdID09PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZnVsbFNjcmVlbkV2ZW50VHlwZXNbZXZlbnROYW1lXSwgZnVsbFNjcmVlbkNoYW5nZWRDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvL1VuYmluZCBHbG9iYWwoZG9jdW1lbnQpIEV2ZW50XHJcbiAgICAgICAgT2JqZWN0LmtleXMoZnVsbFNjcmVlbkV2ZW50VHlwZXMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICAgICAgaWYoZG9jdW1lbnRbZXZlbnROYW1lXSA9PT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGZ1bGxTY3JlZW5FdmVudFR5cGVzW2V2ZW50TmFtZV0sIGZ1bGxTY3JlZW5DaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuICAgICAgICBcImNsaWNrIC5vdnAtZnVsbHNjcmVlbi1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0b2dnbGVGdWxsU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiRnVsbFNjcmVlbkJ1dHRvblwiLCBudWxsLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRnVsbFNjcmVlbkJ1dHRvbjtcclxuIiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cIm92cC1idXR0b24gb3ZwLWZ1bGxzY3JlZW4tYnV0dG9uXCI+JyArXHJcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm92cC1mdWxsc2NyZWVuLWJ1dHRvbi1leHBhbmRpY29uXCI+PC9pPicgK1xyXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtZnVsbHNjcmVlbi1idXR0b24tY29tcHJlc3NpY29uXCI+PC9pPicgK1xyXG4gICAgICAgICc8L2J1dHRvbj4nXHJcbiAgICApO1xyXG59O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIwLi5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuaW1wb3J0IFBsYXlCdXR0b24gZnJvbSAndmlldy9jb250cm9scy9wbGF5QnV0dG9uJztcclxuaW1wb3J0IFZvbHVtZUJ1dHRvbiBmcm9tICd2aWV3L2NvbnRyb2xzL3ZvbHVtZUJ1dHRvbic7XHJcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICd2aWV3L2NvbnRyb2xzL3Byb2dyZXNzQmFyJztcclxuaW1wb3J0IFRpbWVEaXNwbGF5IGZyb20gJ3ZpZXcvY29udHJvbHMvdGltZURpc3BsYXknO1xyXG5pbXBvcnQgRnVsbFNjcmVlbkJ1dHRvbiBmcm9tICd2aWV3L2NvbnRyb2xzL2Z1bGxTY3JlZW5CdXR0b24nO1xyXG5pbXBvcnQgU2V0dGluZ1BhbmVsIGZyb20gJ3ZpZXcvY29udHJvbHMvc2V0dGluZ1BhbmVsJztcclxuaW1wb3J0IFNldHRpbmdQYW5lbExpc3QgZnJvbSAndmlldy9nbG9iYWwvU2V0dGluZ1BhbmVsTGlzdCc7XHJcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgUkVBRFksXHJcbiAgICBDT05URU5UX01FVEEsXHJcbiAgICBQUk9WSURFUl9SVE1QLFxyXG4gICAgRVJST1JcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuY29uc3QgQ29udHJvbHMgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xyXG4gICAgbGV0IHZvbHVtZUJ1dHRvbiA9IFwiXCIsIHBsYXlCdXR0b249IFwiXCIsIHByb2dyZXNzQmFyID0gXCJcIiwgdGltZURpc3BsYXkgPSBcIlwiLCBmdWxsU2NyZWVuQnV0dG9uID0gXCJcIjtcclxuXHJcbiAgICBsZXQgZ2VuZXJhdGVNYWluUGFuZWxEYXRhID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgcGFuZWwgPSB7dGl0bGUgOiBcIlNldHRpbmdzXCIsIGlzTWFpbiA6IHRydWUsIGJvZHkgOiBbXX07XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2UgPSBhcGkuZ2V0Q3VycmVudFF1YWxpdHkoKTtcclxuICAgICAgICBpZihhcGkuZ2V0RHVyYXRpb24oKSAhPT0gSW5maW5pdHkgJiYgY3VycmVudFNvdXJjZS50eXBlICE9PSBQUk9WSURFUl9SVE1QKXtcclxuICAgICAgICAgICAgbGV0IGJvZHkgPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSA6IFwiU3BlZWRcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlIDogIGFwaS5nZXRQbGF5YmFja1JhdGUoKSA9PT0gMSA/IFwiTm9ybWFsXCIgOiBhcGkuZ2V0UGxheWJhY2tSYXRlKCksXHJcbiAgICAgICAgICAgICAgICB0eXBlIDogXCJwbGF5YmFja3JhdGVcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBwYW5lbC5ib2R5LnB1c2goYm9keSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYXBpLmdldFF1YWxpdHlMZXZlbHMoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UXVhbGl0eSA9IGFwaS5nZXRDdXJyZW50UXVhbGl0eSgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGJvZHkgPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSA6IFwiU291cmNlXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA6IGN1cnJlbnRRdWFsaXR5ID8gY3VycmVudFF1YWxpdHkubGFiZWwgOiBcIkRlZmF1bHRcIixcclxuICAgICAgICAgICAgICAgIHR5cGUgOiBcInF1YWxpdHlsZXZlbFwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwYW5lbC5ib2R5LnB1c2goYm9keSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYW5lbDtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcblxyXG4gICAgICAgIGxldCBpbml0VGltZURpc3BsYXkgPSBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgaWYodGltZURpc3BsYXkpe1xyXG4gICAgICAgICAgICAgICAgdGltZURpc3BsYXkuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRpbWVEaXNwbGF5ID0gVGltZURpc3BsYXkoJGN1cnJlbnQuZmluZChcIi5vdnAtbGVmdC1jb250cm9sc1wiKSwgYXBpLCBkYXRhKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBpbml0UHJvZ3Jlc3NCYXIgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZihwcm9ncmVzc0Jhcil7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0Jhci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIgPSBQcm9ncmVzc0JhcigkY3VycmVudC5maW5kKFwiLm92cC1wcm9ncmVzc2Jhci1jb250YWluZXJcIiksIGFwaSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcGxheUJ1dHRvbiA9IFBsYXlCdXR0b24oJGN1cnJlbnQuZmluZChcIi5vdnAtbGVmdC1jb250cm9sc1wiKSwgYXBpKTtcclxuICAgICAgICB2b2x1bWVCdXR0b24gPSBWb2x1bWVCdXR0b24oJGN1cnJlbnQuZmluZChcIi5vdnAtbGVmdC1jb250cm9sc1wiKSwgYXBpKTtcclxuICAgICAgICBmdWxsU2NyZWVuQnV0dG9uID0gRnVsbFNjcmVlbkJ1dHRvbigkY3VycmVudC5maW5kKFwiLm92cC1yaWdodC1jb250cm9sc1wiKSwgYXBpKTtcclxuXHJcblxyXG4gICAgICAgIGFwaS5vbihDT05URU5UX01FVEEsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaW5pdFRpbWVEaXNwbGF5KGRhdGEpO1xyXG4gICAgICAgICAgICBpZihkYXRhLmR1cmF0aW9uID09PSBJbmZpbml0eSl7XHJcbiAgICAgICAgICAgICAgICAvL2xpdmVcclxuICAgICAgICAgICAgICAgIGlmKHByb2dyZXNzQmFyKXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0Jhci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy92b2RcclxuICAgICAgICAgICAgICAgIGluaXRQcm9ncmVzc0JhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvL0RvIG5vdGhpbmcuXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZXZlbnRzID0ge1xyXG4gICAgICAgIFwibW91c2VsZWF2ZSAub3ZwLWNvbnRyb2xzXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHZvbHVtZUJ1dHRvbi5zZXRNb3VzZURvd24oZmFsc2UpO1xyXG4gICAgICAgICAgICAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lclwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiY2xpY2sgLm92cC1zZXR0aW5nLWJ1dHRvblwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAvL3RvZ2dsZVxyXG4gICAgICAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgLy9jbGVhciBhbGwgU2V0dGluZ1BhbmVsVGVtcGxhdGVcclxuICAgICAgICAgICAgICAgIF8uZWFjaChTZXR0aW5nUGFuZWxMaXN0LCBmdW5jdGlvbihzZXR0aW5nUGFuZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdQYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFNldHRpbmdQYW5lbExpc3Quc3BsaWNlKDAsIFNldHRpbmdQYW5lbExpc3QubGVuZ3RoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBTZXR0aW5nUGFuZWxMaXN0LnB1c2goU2V0dGluZ1BhbmVsKCRjdXJyZW50LCBhcGksIGdlbmVyYXRlTWFpblBhbmVsRGF0YSgpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG5cclxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJDb250cm9sc1wiLCAgbnVsbCAsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbHM7XHJcbiIsIlxyXG5jb25zdCBDb250cm9scyA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJvdnAtY29udHJvbHMtY29udGFpbmVyXCI+JytcclxuICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtZ3JhZGllbnQtYm90dG9tXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWJvdHRvbS1wYW5lbFwiPicgK1xyXG4gICAgICAgICAnICAgIDxkaXYgY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXItY29udGFpbmVyXCI+JyArXHJcbiAgICAgICAgICcgICAgPC9kaXY+JyArXHJcbiAgICAgICAgICcgICAgPGRpdiBjbGFzcz1cIm92cC1jb250cm9sc1wiPicgK1xyXG4gICAgICAgICAnICAgICAgICA8ZGl2IGNsYXNzPVwib3ZwLWxlZnQtY29udHJvbHNcIj4nICtcclxuICAgICAgICAgJyAgICAgICAgPC9kaXY+JyArXHJcbiAgICAgICAgICcgICAgICAgIDxkaXYgY2xhc3M9XCJvdnAtcmlnaHQtY29udHJvbHNcIj4nICtcclxuICAgICAgICAgJyAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJvdnAtYnV0dG9uIG92cC1zZXR0aW5nLWJ1dHRvblwiPjxpIGNsYXNzPVwib3ZwLXNldHRpbmctYnV0dG9uLWljb25cIj48L2k+PC9idXR0b24+JyArXHJcbiAgICAgICAgICcgICAgICAgIDwvZGl2PicgK1xyXG4gICAgICAgICAnICAgIDwvZGl2PicgK1xyXG4gICAgICAgICAnPC9kaXY+JztcclxuICAgICc8L2Rpdj4nO1xyXG5cclxufTtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbHM7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI0Li5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuaW1wb3J0IHtcclxuICAgIEVSUk9SLFxyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9TVEFMTEVELFxyXG4gICAgU1RBVEVfTE9BRElORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfUEFVU0VELFxyXG4gICAgU1RBVEVfRVJST1IsXHJcbiAgICBQTEFZRVJfU1RBVEVcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuY29uc3QgUGxheUJ1dHRvbiA9IGZ1bmN0aW9uICgkY29udGFpbmVyLCBhcGkpIHtcclxuICAgIGxldCAkaWNvblBsYXkgPSBcIlwiLFxyXG4gICAgICAgICRpY29uUGF1c2UgPSBcIlwiLFxyXG4gICAgICAgICRpY29uUmVwbGF5ID0gXCJcIjtcclxuXHJcblxyXG4gICAgbGV0IHNldEJ1dHRvblN0YXRlID0gZnVuY3Rpb24oc3RhdGUpe1xyXG4gICAgICAgICRpY29uUGxheS5oaWRlKCk7XHJcbiAgICAgICAgJGljb25QYXVzZS5oaWRlKCk7XHJcbiAgICAgICAgJGljb25SZXBsYXkuaGlkZSgpO1xyXG5cclxuICAgICAgICBpZihzdGF0ZSA9PT0gU1RBVEVfUExBWUlORyl7XHJcbiAgICAgICAgICAgICRpY29uUGF1c2Uuc2hvdygpO1xyXG4gICAgICAgIH1lbHNlIGlmKHN0YXRlID09PSBTVEFURV9QQVVTRUQpe1xyXG4gICAgICAgICAgICAkaWNvblBsYXkuc2hvdygpO1xyXG4gICAgICAgIH1lbHNlIGlmKHN0YXRlID09PSBTVEFURV9DT01QTEVURSl7XHJcbiAgICAgICAgICAgICRpY29uUGxheS5zaG93KCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRpY29uUGxheS5zaG93KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAkaWNvblBsYXkgPSAkY3VycmVudC5maW5kKCBcIi5vdnAtcGxheS1idXR0b24tcGxheWljb25cIik7XHJcbiAgICAgICAgJGljb25QYXVzZSA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXBsYXktYnV0dG9uLXBhdXNlaWNvblwiKTtcclxuICAgICAgICAkaWNvblJlcGxheSA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXBsYXktYnV0dG9uLXJlcGxheWljb25cIik7XHJcblxyXG4gICAgICAgIGFwaS5vbihQTEFZRVJfU1RBVEUsIGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICBpZihkYXRhICYmIGRhdGEubmV3c3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgc2V0QnV0dG9uU3RhdGUoZGF0YS5uZXdzdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nLlxyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuICAgICAgICBcImNsaWNrIC5vdnAtcGxheS1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSBhcGkuZ2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfSURMRSkge1xyXG4gICAgICAgICAgICAgICAgYXBpLnBsYXkoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpIHtcclxuICAgICAgICAgICAgICAgIGFwaS5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfUEFVU0VEKSB7XHJcbiAgICAgICAgICAgICAgICBhcGkucGxheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfQ09NUExFVEUpIHtcclxuICAgICAgICAgICAgICAgIGFwaS5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJQbGF5QnV0dG9uXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYXlCdXR0b247IiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cIm92cC1idXR0b24gb3ZwLXBsYXktYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiPicgK1xyXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtcGxheS1idXR0b24tcGxheWljb25cIj48L2k+JyArXHJcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm92cC1wbGF5LWJ1dHRvbi1wYXVzZWljb25cIj48L2k+JyArXHJcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm92cC1wbGF5LWJ1dHRvbi1yZXBsYXlpY29uXCI+PC9pPicgK1xyXG4gICAgICAgICc8L2J1dHRvbj4nXHJcbiAgICApO1xyXG59O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI0Li5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuaW1wb3J0IFNldHRpbmdQYW5lbExpc3QgZnJvbSAndmlldy9nbG9iYWwvU2V0dGluZ1BhbmVsTGlzdCc7XHJcbmltcG9ydCB7bmF0dXJhbEhtc30gZnJvbSAndXRpbHMvc3RyaW5ncydcclxuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5pbXBvcnQge1xyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX1BBVVNFRFxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCBQcm9ncmVzc0JhciA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSl7XHJcbiAgICBjb25zdCAkcm9vdCA9IExBJChcIiNcIithcGkuZ2V0Q29udGFpbmVySWQoKSk7XHJcbiAgICBsZXQgY3VycmVudFBsYXlpbmdQb3NpdGlvbiA9IDA7XHJcbiAgICBsZXQgY3VycmVudFBsYXlpbmdQZXJjZW50YWdlID0gMDtcclxuICAgIGxldCBjdXJyZW50TG9hZGVkUGVyY2VudGFnZSA9IDA7XHJcblxyXG4gICAgbGV0IG1vdXNlSW5zaWRlID0gZmFsc2UsIG1vdXNlRG93biA9IGZhbHNlO1xyXG5cclxuICAgIGxldCAkcHJvZ3Jlc3NCYXIgPSBcIlwiLFxyXG4gICAgICAgICRwcm9ncmVzc0xvYWQgPSBcIlwiLFxyXG4gICAgICAgICRwcm9ncmVzc1BsYXkgPSBcIlwiLFxyXG4gICAgICAgICRwcm9ncmVzc0hvdmVyID0gXCJcIixcclxuICAgICAgICAka25vYkNvbnRhaW5lciA9IFwiXCIsXHJcbiAgICAgICAgJGtub2IgPSBcIlwiLFxyXG4gICAgICAgIGtub2JXaWR0aCA9IDAsXHJcbiAgICAgICAgJHRpbWUgPSBcIlwiO1xyXG5cclxuXHJcbiAgICBsZXQgcG9zaXRpb25FbGVtZW50cyA9IGZ1bmN0aW9uIChwZXJjZW50YWdlKSB7XHJcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXJXaWR0aCA9ICRwcm9ncmVzc0Jhci53aWR0aCgpO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gcHJvZ3Jlc3NCYXJXaWR0aCAqIHBlcmNlbnRhZ2U7XHJcblxyXG4gICAgICAgICRwcm9ncmVzc1BsYXkuY3NzKCd3aWR0aCcsIHBvc2l0aW9uKyAncHgnKTtcclxuICAgICAgICAkcHJvZ3Jlc3NIb3Zlci5jc3MoJ2xlZnQnLCBwb3NpdGlvbisgJ3B4Jyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGtub2JQb3N0aW9uID0gKHByb2dyZXNzQmFyV2lkdGggLSBrbm9iV2lkdGgpICogcGVyY2VudGFnZTtcclxuICAgICAgICAka25vYkNvbnRhaW5lci5jc3MoJ2xlZnQnLCBrbm9iUG9zdGlvbisgJ3B4Jyk7XHJcblxyXG4gICAgICAgIGN1cnJlbnRQbGF5aW5nUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICBjdXJyZW50UGxheWluZ1BlcmNlbnRhZ2UgPSBwZXJjZW50YWdlO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZHJhd0hvdmVyUHJvZ3Jlc3MgPSBmdW5jdGlvbiAocGVyY2VudGFnZSkge1xyXG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSAkcHJvZ3Jlc3NCYXIud2lkdGgoKTtcclxuICAgICAgICBjb25zdCBob3ZlclBvc2l0aW9uID0gcHJvZ3Jlc3NCYXJXaWR0aCAqIHBlcmNlbnRhZ2U7XHJcblxyXG4gICAgICAgICRwcm9ncmVzc0hvdmVyLmNzcygnd2lkdGgnLCBwZXJjZW50YWdlID09IDA/IHBlcmNlbnRhZ2UgOiAoaG92ZXJQb3NpdGlvbiAtIGN1cnJlbnRQbGF5aW5nUG9zaXRpb24pKyAncHgnKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGRyYXdMb2FkUHJvZ3Jlc3MgPSBmdW5jdGlvbihwZXJjZW50YWdlKSB7XHJcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXJXaWR0aCA9ICRwcm9ncmVzc0Jhci53aWR0aCgpO1xyXG4gICAgICAgIGNvbnN0IGxvYWRQb3NpdGlvbiA9IHByb2dyZXNzQmFyV2lkdGggKiBwZXJjZW50YWdlO1xyXG5cclxuICAgICAgICAkcHJvZ3Jlc3NMb2FkLmNzcygnd2lkdGgnLCBsb2FkUG9zaXRpb24rICdweCcpO1xyXG4gICAgICAgIGN1cnJlbnRMb2FkZWRQZXJjZW50YWdlID0gcGVyY2VudGFnZTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGNhbGN1bGF0ZVBlcmNlbnRhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBwcm9ncmVzc0JhcldpZHRoID0gJHByb2dyZXNzQmFyLndpZHRoKCk7XHJcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXJPZmZzZXRYID0gJHByb2dyZXNzQmFyLm9mZnNldCgpLmxlZnQ7XHJcbiAgICAgICAgY29uc3QgcG9pbnRlck9mZnNldFggPSBldmVudC5wYWdlWDtcclxuXHJcbiAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IChwb2ludGVyT2Zmc2V0WCAtIHByb2dyZXNzQmFyT2Zmc2V0WCkgLyBwcm9ncmVzc0JhcldpZHRoO1xyXG5cclxuICAgICAgICBpZiAocGVyY2VudGFnZSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGVyY2VudGFnZSA+IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGVyY2VudGFnZTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGRyYXdUaW1lSW5kaWNhdG9yID0gZnVuY3Rpb24gKHBlcmNlbnRhZ2UsIGV2ZW50KSB7XHJcbiAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICR0aW1lLmhpZGUoKTtcclxuICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IGFwaS5nZXREdXJhdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IHNlY29uZCA9IGR1cmF0aW9uICogcGVyY2VudGFnZTtcclxuXHJcbiAgICAgICAgY29uc3QgaG1zID0gbmF0dXJhbEhtcyhzZWNvbmQpO1xyXG5cclxuICAgICAgICAkdGltZS50ZXh0KGhtcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRpbWVFbGVtV2lkdGggPSAkdGltZS53aWR0aCgpO1xyXG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSAkcHJvZ3Jlc3NCYXIud2lkdGgoKTtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHByb2dyZXNzQmFyV2lkdGggKiBwZXJjZW50YWdlO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uT2ZQaXhlbCA9IGV2ZW50LnBhZ2VYIC0gJHByb2dyZXNzQmFyLm9mZnNldCgpLmxlZnQ7XHJcblxyXG5cclxuICAgICAgICBjb25zdCBjYWxjdWxhdGVNYWduZXRpYyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHBvc2l0aW9uT2ZQaXhlbCA8IHRpbWVFbGVtV2lkdGggLyAyKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihwcm9ncmVzc0JhcldpZHRoLXBvc2l0aW9uT2ZQaXhlbCAgPCB0aW1lRWxlbVdpZHRoIC8gMil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvZ3Jlc3NCYXJXaWR0aCAtIHRpbWVFbGVtV2lkdGg7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uIC0gdGltZUVsZW1XaWR0aCAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBtYWduZXRpY1Bvc2l0aW9uID0gY2FsY3VsYXRlTWFnbmV0aWMoKTtcclxuICAgICAgICAkdGltZS5jc3MoJ2xlZnQnLCBtYWduZXRpY1Bvc2l0aW9uKyBcInB4XCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgc2VlayA9IGZ1bmN0aW9uIChwZXJjZW50YWdlKSB7XHJcbiAgICAgICAgYXBpLnNlZWsoIChhcGkuZ2V0RHVyYXRpb24oKXx8MCkgKiBwZXJjZW50YWdlKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAkcHJvZ3Jlc3NCYXIgPSAkY3VycmVudDtcclxuICAgICAgICAkcHJvZ3Jlc3NMb2FkID0gJGN1cnJlbnQuZmluZChcIi5vdnAtbG9hZC1wcm9ncmVzc1wiKTtcclxuICAgICAgICAkcHJvZ3Jlc3NQbGF5ID0gJGN1cnJlbnQuZmluZChcIi5vdnAtcGxheS1wcm9ncmVzc1wiKTtcclxuICAgICAgICAkcHJvZ3Jlc3NIb3ZlciA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLWhvdmVyLXByb2dyZXNzXCIpO1xyXG4gICAgICAgICRrbm9iQ29udGFpbmVyID0gJGN1cnJlbnQuZmluZChcIi5vdnAtcHJvZ3Jlc3NiYXIta25vYi1jb250YWluZXJcIik7XHJcbiAgICAgICAgJGtub2IgPSAkY3VycmVudC5maW5kKFwiLm92cC1wcm9ncmVzc2Jhci1rbm9iXCIpO1xyXG4gICAgICAgIGtub2JXaWR0aCA9ICRrbm9iLndpZHRoKCk7XHJcbiAgICAgICAgJHRpbWUgPSAkY3VycmVudC5maW5kKFwiLm92cC1wcm9ncmVzc2Jhci10aW1lXCIpO1xyXG5cclxuICAgICAgICBhcGkub24oJ3RpbWUnLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmKGRhdGEgJiYgZGF0YS5kdXJhdGlvbiAmJiBkYXRhLnBvc2l0aW9uKXtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMoZGF0YS5wb3NpdGlvbiAvIGRhdGEuZHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGFwaS5vbignYnVmZmVyQ2hhbmdlZCcsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLmJ1ZmZlclBlcmNlbnQpe1xyXG4gICAgICAgICAgICAgICAgZHJhd0xvYWRQcm9ncmVzcyhkYXRhLmJ1ZmZlclBlcmNlbnQgLyAxMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZXZlbnRzID0ge1xyXG4gICAgICAgIFwicmVzaXplIHdpbmRvd1wiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKGN1cnJlbnRQbGF5aW5nUGVyY2VudGFnZSk7XHJcbiAgICAgICAgICAgIGRyYXdMb2FkUHJvZ3Jlc3MoY3VycmVudExvYWRlZFBlcmNlbnRhZ2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb3VzZWVudGVyIC5vdnAtcHJvZ3Jlc3NiYXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgbW91c2VJbnNpZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAkdGltZS5zaG93KCk7XHJcbiAgICAgICAgICAgICRyb290LmFkZENsYXNzKFwib3ZwLXByb2dyZXNzYmFyLWhvdmVyXCIpO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW91c2VsZWF2ZSAub3ZwLXByb2dyZXNzYmFyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIG1vdXNlSW5zaWRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghbW91c2VJbnNpZGUpIHtcclxuICAgICAgICAgICAgICAgICRyb290LnJlbW92ZUNsYXNzKFwib3ZwLXByb2dyZXNzYmFyLWhvdmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgJHRpbWUuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRyYXdIb3ZlclByb2dyZXNzKDApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb3VzZWRvd24gLm92cC1wcm9ncmVzc2JhclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIG1vdXNlRG93biA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBjYWxjdWxhdGVQZXJjZW50YWdlKGV2ZW50KTtcclxuICAgICAgICAgICAgcG9zaXRpb25FbGVtZW50cyhwZXJjZW50YWdlKTtcclxuICAgICAgICAgICAgZHJhd0hvdmVyUHJvZ3Jlc3MoMCk7XHJcbiAgICAgICAgICAgIHNlZWsocGVyY2VudGFnZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vdXNlbW92ZSAub3ZwLXByb2dyZXNzYmFyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbW91c2VEb3duKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gY2FsY3VsYXRlUGVyY2VudGFnZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICBkcmF3SG92ZXJQcm9ncmVzcyhwZXJjZW50YWdlKTtcclxuICAgICAgICAgICAgICAgIGRyYXdUaW1lSW5kaWNhdG9yKHBlcmNlbnRhZ2UsIGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb3VzZW1vdmUgZG9jdW1lbnRcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAobW91c2VEb3duKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gY2FsY3VsYXRlUGVyY2VudGFnZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKHBlcmNlbnRhZ2UpO1xyXG4gICAgICAgICAgICAgICAgZHJhd0hvdmVyUHJvZ3Jlc3MoMCk7XHJcbiAgICAgICAgICAgICAgICBzZWVrKHBlcmNlbnRhZ2UpO1xyXG4gICAgICAgICAgICAgICAgZHJhd1RpbWVJbmRpY2F0b3IocGVyY2VudGFnZSwgZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vdXNldXAgZG9jdW1lbnRcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYobW91c2VEb3duKXtcclxuICAgICAgICAgICAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHJvb3QucmVtb3ZlQ2xhc3MoXCJvdnAtcHJvZ3Jlc3NiYXItaG92ZXJcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiUHJvZ3Jlc3NCYXJcIiwgbnVsbCwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NCYXI7XHJcbiIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXJcIiB0YWJpbmRleD1cIjBcIj4nICtcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXItcGFkZGluZ1wiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1wcm9ncmVzcy1saXN0XCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1sb2FkLXByb2dyZXNzXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1wbGF5LXByb2dyZXNzIG92cC1wbGF5LWJhY2tncm91bmQtY29sb3JcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWhvdmVyLXByb2dyZXNzXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXIta25vYi1jb250YWluZXJcIj4nICtcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXByb2dyZXNzYmFyLWtub2Igb3ZwLXBsYXktYmFja2dyb3VuZC1jb2xvclwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1wcm9ncmVzc2Jhci10aW1lXCI+MDowMDwvc3Bhbj4nICtcclxuICAgICAgICAnPC9kaXY+J1xyXG4gICAgKTtcclxufTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNi4uXHJcbiAqL1xyXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XHJcbmltcG9ydCBTZXR0aW5nUGFuZWxMaXN0IGZyb20gJ3ZpZXcvZ2xvYmFsL1NldHRpbmdQYW5lbExpc3QnO1xyXG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xyXG5jb25zdCBQTEFZRVJfTUlOX0hFSUdIVCA9IDIyMDtcclxuY29uc3QgU2V0dGluZ1BhbmVsID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpLCBkYXRhKXtcclxuICAgIGNvbnN0ICRyb290ID0gTEEkKFwiI1wiK2FwaS5nZXRDb250YWluZXJJZCgpKTtcclxuXHJcbiAgICBsZXQgZXh0cmFjdFBhbmVsRGF0YSA9IGZ1bmN0aW9uKHBhbmVsVHlwZSl7XHJcbiAgICAgICAgbGV0IHBhbmVsID0ge3RpdGxlIDogXCJcIiwgYm9keSA6IFtdLCB0eXBlIDogcGFuZWxUeXBlfTtcclxuXHJcbiAgICAgICAgaWYocGFuZWxUeXBlID09PSBcInBsYXliYWNrcmF0ZVwiKXtcclxuICAgICAgICAgICAgcGFuZWwudGl0bGUgPSBcIlNwZWVkXCI7XHJcbiAgICAgICAgICAgIGxldCBwbGF5QmFja1JhdGVzID0gYXBpLmdldENvbmZpZygpLnBsYXliYWNrUmF0ZXM7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UGxheWJhY2tSYXRlID0gYXBpLmdldFBsYXliYWNrUmF0ZSgpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXlCYWNrUmF0ZXMubGVuZ3RoOyBpICsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZSA6IChwbGF5QmFja1JhdGVzW2ldID09PSAxPyBcIk5vcm1hbFwiIDogcGxheUJhY2tSYXRlc1tpXSksXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDaGVjayA6IGN1cnJlbnRQbGF5YmFja1JhdGUgPT09IHBsYXlCYWNrUmF0ZXNbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiBwbGF5QmFja1JhdGVzW2ldXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcGFuZWwuYm9keS5wdXNoKGJvZHkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1lbHNlIGlmKHBhbmVsVHlwZSA9PT0gXCJxdWFsaXR5bGV2ZWxcIil7XHJcbiAgICAgICAgICAgIHBhbmVsLnRpdGxlID0gXCJTb3VyY2VcIjtcclxuXHJcbiAgICAgICAgICAgIGxldCBxdWFsaXR5TGV2ZWxzID0gYXBpLmdldFF1YWxpdHlMZXZlbHMoKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRRdWFsaXR5ID0gYXBpLmdldEN1cnJlbnRRdWFsaXR5KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1YWxpdHlMZXZlbHMubGVuZ3RoOyBpICsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZSA6IHF1YWxpdHlMZXZlbHNbaV0ubGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDaGVjayA6IGN1cnJlbnRRdWFsaXR5LmluZGV4ID09PSBpLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlIDogaVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHBhbmVsLmJvZHkucHVzaChib2R5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhbmVsO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICBpZihQTEFZRVJfTUlOX0hFSUdIVCA+ICRyb290LmhlaWdodCgpKXtcclxuICAgICAgICAgICAgJHJvb3QuZmluZChcIi5vdnAtc2V0dGluZy1wYW5lbFwiKS5jc3MoXCJtYXhIZWlnaHRcIiwgXCIxMTRweFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vRG8gbm90aGluZy5cclxuICAgIH07XHJcbiAgICBjb25zdCBldmVudHMgPSB7XHJcbiAgICAgICAgXCJjbGljayAub3ZwLXNldHRpbmctbWFpbi1pdGVtXCI6IGZ1bmN0aW9uIChldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGxldCBwYW5lbFR5cGUgPSBMQSQoZXZlbnQuY3VycmVudFRhcmdldCkuYXR0cihcIm92cC1wYW5lbC10eXBlXCIpO1xyXG4gICAgICAgICAgICAvL3BhcmVudCBtdXN0IGJlIG5vdCAkY3VycmVudCFcclxuICAgICAgICAgICAgU2V0dGluZ1BhbmVsTGlzdC5wdXNoKFNldHRpbmdQYW5lbCgkY29udGFpbmVyLCBhcGksIGV4dHJhY3RQYW5lbERhdGEocGFuZWxUeXBlKSkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjbGljayAub3ZwLXNldHRpbmctdGl0bGVcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgLy9SZW1vdmUgQ3VycmVudCBQYW5lbFxyXG4gICAgICAgICAgICBsZXQgbGFzdCA9IFNldHRpbmdQYW5lbExpc3QucG9wKCk7XHJcbiAgICAgICAgICAgIGxhc3QuZGVzdHJveSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjbGljayAub3ZwLXNldHRpbmctaXRlbS12YWx1ZVwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGFuZWxUeXBlID0gTEEkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJvdnAtcGFuZWwtdHlwZVwiKTtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gTEEkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJvdnAtZGF0YS12YWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHBhbmVsVHlwZSAmJiB2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICBpZihwYW5lbFR5cGUgPT09IFwicGxheWJhY2tyYXRlXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFwaS5zZXRQbGF5YmFja1JhdGUocGFyc2VGbG9hdCh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYocGFuZWxUeXBlID09PSBcInF1YWxpdHlsZXZlbFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBhcGkuc2V0Q3VycmVudFF1YWxpdHkocGFyc2VJbnQodmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2NsZWFyIGFsbCBTZXR0aW5nUGFuZWxUZW1wbGF0ZVxyXG4gICAgICAgICAgICAgICAgXy5lYWNoKFNldHRpbmdQYW5lbExpc3QsIGZ1bmN0aW9uKHNldHRpbmdQYW5lbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ1BhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgU2V0dGluZ1BhbmVsTGlzdC5zcGxpY2UoMCwgU2V0dGluZ1BhbmVsTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIlNldHRpbmdQYW5lbFwiLCBkYXRhLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ1BhbmVsO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKGRhdGEpID0+IHtcclxuICAgIGxldCBlbGVtZW50cyA9ICc8ZGl2IGNsYXNzPVwib3ZwLXNldHRpbmctcGFuZWwgJysoZGF0YS5pc01haW4gPyAnYW5pbWF0ZWQgZmFkZUluJzogJycpKydcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtc2V0dGluZy10aXRsZS1jb250YWluZXJcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXNldHRpbmctdGl0bGVcIiB0YWJpbmRleD1cIjBcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGF0YS5pc01haW4gPyAnJyA6ICc8c3BhbiBjbGFzcz1cIm92cC1zZXR0aW5nLXRpdGxlLXByZXZpY29uXCI+Jmx0Ozwvc3Bhbj4nKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctdGl0bGUtdGl0bGVcIj4nK2RhdGEudGl0bGUrJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbS1jb250YWluZXJcIj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKGRhdGEuYm9keSwgZnVuY3Rpb24oYm9keSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5pc01haW4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyArPSBzZXR0aW5nSXRlbVRlbXBsYXRlKGJvZHkudGl0bGUsIGJvZHkudmFsdWUsIGJvZHkudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzICs9IHNldHRpbmdWYWx1ZVRlbXBsYXRlKGJvZHkudGl0bGUsIGJvZHkudmFsdWUsIGRhdGEudHlwZSwgYm9keS5pc0NoZWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgIGVsZW1lbnRzKz0gICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xyXG4gICAgcmV0dXJuIGVsZW1lbnRzO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldHRpbmdJdGVtVGVtcGxhdGUgPSAodGl0bGUsIHZhbHVlLCB0eXBlKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbSBvdnAtc2V0dGluZy1tYWluLWl0ZW1cIiBvdnAtcGFuZWwtdHlwZT1cIicrdHlwZSsnXCI+JyArXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0tdGl0bGVcIj4nK3RpdGxlKyc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0tbmV4dGljb25cIj4mZ3Q7PC9zcGFuPicgK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtLXZhbHVlXCI+Jyt2YWx1ZSsnPC9zcGFuPicgK1xyXG4gICAgICAgICc8L2Rpdj4nXHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldHRpbmdWYWx1ZVRlbXBsYXRlID0gKHRpdGxlLCB2YWx1ZSwgdHlwZSwgaXNDaGVjaykgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0gb3ZwLXNldHRpbmctaXRlbS12YWx1ZVwiIG92cC1wYW5lbC10eXBlPVwiJyt0eXBlKydcIiBvdnAtZGF0YS12YWx1ZT1cIicrdmFsdWUrJ1wiPicgK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtLWNoZWNrZWQgJysoaXNDaGVjaz8nb3ZwLXNob3cnOicnKSsnXCI+JiN4MjcxMzs8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0tdGl0bGVcIj4nK3RpdGxlKyc8L3NwYW4+JyArXHJcbiAgICAgICAgJzwvZGl2PidcclxuICAgICk7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjUuLlxyXG4gKi9cclxuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xyXG5pbXBvcnQge25hdHVyYWxIbXN9IGZyb20gJ3V0aWxzL3N0cmluZ3MnO1xyXG5cclxuY29uc3QgVGltZURpc3BsYXkgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGksIGRhdGEpe1xyXG5cclxuICAgIGxldCAkcG9zaXRpb24gPSBcIlwiLCAkZHVyYXRpb24gPSBcIlwiO1xyXG4gICAgbGV0IGNvbnZlcnRIdW1hbml6ZVRpbWUgPSBmdW5jdGlvbih0aW1lKXtcclxuICAgICAgICByZXR1cm4gbmF0dXJhbEhtcyh0aW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgJHBvc2l0aW9uID0gJGN1cnJlbnQuZmluZCgnLm92cC10aW1lLWN1cnJlbnQnKTtcclxuICAgICAgICAkZHVyYXRpb24gPSAkY3VycmVudC5maW5kKCcub3ZwLXRpbWUtZHVyYXRpb24nKTtcclxuXHJcbiAgICAgICAgaWYoZGF0YS5kdXJhdGlvbiAhPT0gSW5maW5pdHkpe1xyXG5cclxuICAgICAgICAgICAgJGR1cmF0aW9uLnRleHQoY29udmVydEh1bWFuaXplVGltZShkYXRhLmR1cmF0aW9uKSk7XHJcbiAgICAgICAgICAgIGFwaS5vbigndGltZScsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICRwb3NpdGlvbi50ZXh0KGNvbnZlcnRIdW1hbml6ZVRpbWUoZGF0YS5wb3NpdGlvbikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvL0RvIG5vdGhpbmcuXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZXZlbnRzID0ge1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIlRpbWVEaXNwbGF5XCIsIGRhdGEsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaW1lRGlzcGxheTsiLCJleHBvcnQgZGVmYXVsdCAoZGF0YSkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC10aW1lLWRpc3BsYXlcIj4nK1xyXG4gICAgICAgICAgICAoZGF0YS5kdXJhdGlvbiA9PT0gSW5maW5pdHlcclxuICAgICAgICAgICAgICAgID9cclxuICAgICAgICAgICAgICAgICgnPGJ1dHRvbiBjbGFzcz1cIm92cC1saXZlLWJhZGdlIG92cC1idXR0b25cIiBkaXNhYmxlZD1cImRpc2FibGVkXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgKGRhdGEudHlwZSA9PSd3ZWJydGMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLWxpdmUtYmFkZ2UtbG93bGF0ZW5jeVwiPmxvdyBsYXRlbmN5IGxpdmU8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj5saXZlPC9zcGFuPicpICtcclxuICAgICAgICAgICAgICAgICc8L2J1dHRvbj4nKVxyXG4gICAgICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICAgICAgKCc8c3BhbiBjbGFzcz1cIm92cC10aW1lLWN1cnJlbnRcIj4wOjAwPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC10aW1lLXNlcGFyYXRvclwiPiAvIDwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtdGltZS1kdXJhdGlvblwiPjA6MDA8L3NwYW4+JylcclxuICAgICAgICAgICAgKSArXHJcbiAgICAgICAgJzwvZGl2PidcclxuICAgICk7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjAuLlxyXG4gKi9cclxuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xyXG5cclxuY29uc3QgVm9sdW1lQnV0dG9uID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpKXtcclxuXHJcbiAgICBsZXQgJHNsaWRlckNvbnRhaW5lciA9IFwiXCIsXHJcbiAgICAgICAgJHNsaWRlciA9IFwiXCIsXHJcbiAgICAgICAgJHNsaWRlckhhbmRsZSA9IFwiXCIsXHJcbiAgICAgICAgJHNsaWRlclZhbHVlID0gXCJcIixcclxuICAgICAgICAkdm9sdW1lSWNvbkJpZyA9IFwiXCIsXHJcbiAgICAgICAgJHZvbHVtZUljb25TbWFsbCA9IFwiXCIsXHJcbiAgICAgICAgJHZvbHVtZUljb25NdXRlID0gXCJcIjtcclxuICAgIGxldCBtb3VzZURvd24gPSBmYWxzZTtcclxuICAgIGxldCBzbGlkZXJXaWR0aCA9IDcwLCAgaGFuZGxlV2lkdGggPSAwLCBtaW5SYW5nZSA9IDAsIG1heFJhbmdlID0gMDtcclxuXHJcblxyXG4gICAgLypwcml2YXRlIGZ1bmN0aW9ucyovXHJcbiAgICBsZXQgc2V0Vm9sdW1lSWNvbiA9IGZ1bmN0aW9uKHBlcmNlbnRhZ2UpIHtcclxuICAgICAgICAkdm9sdW1lSWNvbkJpZy5oaWRlKCk7XHJcbiAgICAgICAgJHZvbHVtZUljb25TbWFsbC5oaWRlKCk7XHJcbiAgICAgICAgJHZvbHVtZUljb25NdXRlLmhpZGUoKTtcclxuXHJcbiAgICAgICAgaWYgKHBlcmNlbnRhZ2UgPj0gNzApIHtcclxuICAgICAgICAgICAgJHZvbHVtZUljb25CaWcuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGVyY2VudGFnZSA8IDcwICYmIHBlcmNlbnRhZ2UgPiAwKSB7XHJcbiAgICAgICAgICAgICR2b2x1bWVJY29uU21hbGwuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGVyY2VudGFnZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICR2b2x1bWVJY29uTXV0ZS5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBzZXRWb2x1bWVVSSA9IGZ1bmN0aW9uKHBlcmNlbnRhZ2UpIHtcclxuICAgICAgICBpZiAoYXBpLmdldE11dGUoKSkge1xyXG4gICAgICAgICAgICBwZXJjZW50YWdlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFZvbHVtZUljb24ocGVyY2VudGFnZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGhhbmRsZVBvc2l0aW9uID0gbWF4UmFuZ2UgKiBwZXJjZW50YWdlIC8gMTAwO1xyXG5cclxuICAgICAgICAkc2xpZGVySGFuZGxlLmNzcygnbGVmdCcsIGhhbmRsZVBvc2l0aW9uKyAncHgnKTtcclxuICAgICAgICAkc2xpZGVyVmFsdWUuY3NzKCd3aWR0aCcsIGhhbmRsZVBvc2l0aW9uKyAncHgnKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY2FsY3VsYXRlUGVyY2VudGFnZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlWCA9IGV2ZW50LnBhZ2VYIC0gJHNsaWRlci5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgIGxldCBwZXJjZW50YWdlID0gcmVsYXRpdmVYIC8gc2xpZGVyV2lkdGggKiAxMDA7XHJcblxyXG4gICAgICAgIGlmIChwZXJjZW50YWdlIDwgMCkge1xyXG4gICAgICAgICAgICBwZXJjZW50YWdlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwZXJjZW50YWdlID4gMTAwKSB7XHJcbiAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSAxMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGVyY2VudGFnZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgJHNsaWRlckNvbnRhaW5lciA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyXCIpO1xyXG4gICAgICAgICRzbGlkZXIgPSAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtc2lsZGVyXCIpO1xyXG4gICAgICAgICRzbGlkZXJIYW5kbGUgPSAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZVwiKTtcclxuICAgICAgICAkc2xpZGVyVmFsdWUgPSAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtc2xpZGVyLXZhbHVlXCIpO1xyXG5cclxuICAgICAgICAkdm9sdW1lSWNvbkJpZyA9ICRjdXJyZW50LmZpbmQoIFwiLm92cC12b2x1bWUtYnV0dG9uLWJpZ2ljb25cIik7XHJcbiAgICAgICAgJHZvbHVtZUljb25TbWFsbCA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1idXR0b24tc21hbGxpY29uXCIpO1xyXG4gICAgICAgICR2b2x1bWVJY29uTXV0ZSA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1idXR0b24tbXV0ZWljb25cIik7XHJcblxyXG4gICAgICAgIGhhbmRsZVdpZHRoID0gJHNsaWRlckhhbmRsZS53aWR0aCgpO1xyXG4gICAgICAgIG1heFJhbmdlID0gc2xpZGVyV2lkdGggLSBoYW5kbGVXaWR0aDtcclxuXHJcbiAgICAgICAgYXBpLm9uKCdyZWFkeScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRWb2x1bWVVSShhcGkuZ2V0Vm9sdW1lKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwaS5vbigndm9sdW1lQ2hhbmdlZCcsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgc2V0Vm9sdW1lVUkoZGF0YS52b2x1bWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwaS5vbignbXV0ZScsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEubXV0ZSkge1xyXG4gICAgICAgICAgICAgICAgc2V0Vm9sdW1lVUkoMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXRWb2x1bWVVSShhcGkuZ2V0Vm9sdW1lKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZXZlbnRzID0ge1xyXG4gICAgICAgIFwiY2xpY2sgLm92cC12b2x1bWUtYnV0dG9uXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhcGkuZ2V0Vm9sdW1lKCkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGFwaS5zZXRNdXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGFwaS5zZXRWb2x1bWUoMTAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFwaS5zZXRNdXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW91c2VlbnRlciAub3ZwLXZvbHVtZS1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkc2xpZGVyQ29udGFpbmVyLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb3VzZWxlYXZlIC5vdnAtdm9sdW1lLXNpbGRlclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBtb3VzZURvd24gPSBmYWxzZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW91c2Vkb3duIC5vdnAtdm9sdW1lLXNpbGRlclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIG1vdXNlRG93biA9IHRydWU7XHJcbiAgICAgICAgICAgIGFwaS5zZXRNdXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgYXBpLnNldFZvbHVtZShjYWxjdWxhdGVQZXJjZW50YWdlKGV2ZW50KSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vdXNldXAgLm92cC12b2x1bWUtc2lsZGVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbW91c2VEb3duID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vdXNlbW92ZSAub3ZwLXZvbHVtZS1zaWxkZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAoIW1vdXNlRG93bikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhcGkuc2V0Vm9sdW1lKGNhbGN1bGF0ZVBlcmNlbnRhZ2UoZXZlbnQpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIlZvbHVtZUJ1dHRvblwiLCBudWxsLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkKSwge1xyXG4gICAgICAgIHNldE1vdXNlRG93bjogZnVuY3Rpb24gKHN0YXRlKSB7XHJcbiAgICAgICAgICAgIG1vdXNlRG93biA9IHN0YXRlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVm9sdW1lQnV0dG9uO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIwLi5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdm9sdW1lLWNvbnRyb2xsZXJcIj4nK1xyXG4gICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cIm92cC1idXR0b24gb3ZwLXZvbHVtZS1idXR0b25cIj4nICtcclxuICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cIm92cC12b2x1bWUtYnV0dG9uLWJpZ2ljb25cIj48L2k+JyArXHJcbiAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtdm9sdW1lLWJ1dHRvbi1zbWFsbGljb25cIj48L2k+JyArXHJcbiAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtdm9sdW1lLWJ1dHRvbi1tdXRlaWNvblwiPjwvaT4nICtcclxuICAgICAgICAgICAgJzwvYnV0dG9uPicgK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lclwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdm9sdW1lLXNpbGRlclwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXZvbHVtZS1zbGlkZXItYmdcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC12b2x1bWUtc2xpZGVyLXZhbHVlXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdm9sdW1lLXNsaWRlci1oYW5kbGVcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgJzwvZGl2PidcclxuICAgICk7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMTkuLlxyXG4gKi9cclxuXHJcbmltcG9ydCBUZW1wbGF0ZXMgZnJvbSBcInZpZXcvZW5naW5lL1RlbXBsYXRlc1wiO1xyXG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBpcyBzaW1wbGUgdWkgcmVuZGVyZXIuIFRoaXMgcmV0dXJucyBvblJlbmRlcmVkIGNhbGxiYWNrLCBvbkRlc3Ryb3llZCBjYWxsYmFjayBvbiBUZW1wbGF0ZS4gQW5kIHRoaXMgYmluZCBldmVudHMgZm9yIFRlbXBsYXRlcy5cclxuICogQHBhcmFtICAgY29udGFpbmVyICBkb20gZWxlbWVudCBvciBMQSQgb2JqZWN0XHJcbiAqIEBwYXJhbSAgIHRlbXBsYXRlTmFtZSAgICB0ZW1wbGF0ZU5hbWVcclxuICogQHBhcmFtICAgZGF0YSAgICBwcmVsb2FkIGRhdGFcclxuICogQHBhcmFtICAgZXZlbnRzICAgIFRlbXBsYXRlJ3MgZXZlbnRzLlxyXG4gKiBAcGFyYW0gICBvblJlbmRlcmVkICAgIFRoaXMgY2FsbGJhY2sgb2NjdXJzIGFmdGVyIGFwcGVuZCB0ZW1wbGF0ZS5cclxuICogQHBhcmFtICAgb25EZXN0cm95ZWQgICAgVGhpcyBjYWxsYmFjayBvY2N1cnMgYWZ0ZXIgZGVzdHJveWVkIHRlbXBsYXRlLlxyXG4gKiBAcGFyYW0gICBpc1Jvb3RcclxuICpcclxuICogKi9cclxuY29uc3QgT3ZlblRlbXBsYXRlID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgdGVtcGxhdGVOYW1lLCBkYXRhLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkLCBpc1Jvb3QpIHtcclxuICAgIGxldCAkY29udGFpbmVyID0gXy5pc0VsZW1lbnQoY29udGFpbmVyKSA/IExBJChjb250YWluZXIpIDogY29udGFpbmVyO1xyXG4gICAgbGV0ICR0ZW1wbGF0ZTtcclxuICAgIGxldCB2aWV3RXZlbnRzID0ge307XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG5cclxuICAgIGxldCBjcmVhdGVBbmRTZWxlY3RFbGVtZW50ID0gZnVuY3Rpb24gKGh0bWwpIHtcclxuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbmV3RWxlbWVudC5pbm5lckhUTUwgPSBodG1sO1xyXG5cclxuICAgICAgICAkdGVtcGxhdGUgPSBMQSQobmV3RWxlbWVudC5maXJzdENoaWxkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQuZmlyc3RDaGlsZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNSb290KSB7XHJcbiAgICAgICAgJGNvbnRhaW5lci5yZXBsYWNlKGNyZWF0ZUFuZFNlbGVjdEVsZW1lbnQoVGVtcGxhdGVzW3RlbXBsYXRlTmFtZSArIFwiVGVtcGxhdGVcIl0oZGF0YSkpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoY3JlYXRlQW5kU2VsZWN0RWxlbWVudChUZW1wbGF0ZXNbdGVtcGxhdGVOYW1lICsgXCJUZW1wbGF0ZVwiXShkYXRhKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvblJlbmRlcmVkKSB7XHJcbiAgICAgICAgb25SZW5kZXJlZCgkdGVtcGxhdGUsIHRoYXQpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5rZXlzKGV2ZW50cykuZm9yRWFjaChldmVudFN0cmluZyA9PiB7XHJcbiAgICAgICAgbGV0IGV4cGxvZGVkVGV4dCA9IGV2ZW50U3RyaW5nLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICBsZXQgZXZlbnROYW1lID0gZXhwbG9kZWRUZXh0WzBdLnJlcGxhY2UoLyAvZ2ksIFwiXCIpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBleHBsb2RlZFRleHRbMV0ucmVwbGFjZSgvIC9naSwgXCJcIik7XHJcblxyXG4gICAgICAgIGxldCAkdGFyZ2V0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgaWYodGFyZ2V0ID09PSBcImRvY3VtZW50XCIgfHwgdGFyZ2V0ID09PSBcIndpbmRvd1wiKXtcclxuICAgICAgICAgICAgJHRhcmdldCA9IExBJCh0YXJnZXQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkdGFyZ2V0ID0gJHRlbXBsYXRlLmZpbmQodGFyZ2V0KSB8fCAoJHRlbXBsYXRlLmhhc0NsYXNzKHRhcmdldC5yZXBsYWNlKFwiLlwiLFwiXCIpKSA/ICR0ZW1wbGF0ZSA6IG51bGwpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmIChldmVudE5hbWUgJiYgdGFyZ2V0ICYmICR0YXJnZXQpIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gT2JqZWN0LmtleXModmlld0V2ZW50cykubGVuZ3RoKys7XHJcblxyXG4gICAgICAgICAgICAvL2JlY2F1c2UgSXQgcmV0dW5zIGFub3RoZXIgZGF0YS5cclxuICAgICAgICAgICAgbGV0IHdyYXBwZWRGdW5jID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnRzW2V2ZW50U3RyaW5nXShldmVudCwgJHRlbXBsYXRlLCB0aGF0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmlld0V2ZW50c1tpZF0gPSB7bmFtZTogZXZlbnROYW1lLCB0YXJnZXQ6IHRhcmdldCwgY2FsbGJhY2s6IHdyYXBwZWRGdW5jfTtcclxuXHJcbiAgICAgICAgICAgIC8vc29tZXRpbWVzIHRhcmdldCBpcyBOb2RlTGlzdFxyXG4gICAgICAgICAgICBsZXQgbm9kZUxlbmd0aCA9ICR0YXJnZXQuZ2V0KCkubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZihub2RlTGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZUxpc3QgPSAkdGFyZ2V0LmdldCgpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG5vZGVMZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB3cmFwcGVkRnVuYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL0lFIE5vZGVMaXN0IGRvZXNuJ3QgaGF2ZSBmb3JFYWNoLiBJdCdzIHdhY2suXHJcbiAgICAgICAgICAgICAgICAvKiR0YXJnZXQuZ2V0KCkuZm9yRWFjaChmdW5jdGlvbigkaXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHdyYXBwZWRGdW5jKTtcclxuICAgICAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJHRhcmdldC5nZXQoKS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgd3JhcHBlZEZ1bmMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHZpZXdFdmVudHMpLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZXZlbnQgPSB2aWV3RXZlbnRzW2lkXTtcclxuICAgICAgICAgICAgbGV0ICR0YXJnZXQgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgaWYoZXZlbnQudGFyZ2V0ID09PSBcImRvY3VtZW50XCIgfHwgZXZlbnQudGFyZ2V0ID09PSBcIndpbmRvd1wiKXtcclxuICAgICAgICAgICAgICAgICR0YXJnZXQgPSBMQSQoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gJHRlbXBsYXRlLmZpbmQoZXZlbnQudGFyZ2V0KSB8fCAoJHRlbXBsYXRlLmhhc0NsYXNzKGV2ZW50LnRhcmdldC5yZXBsYWNlKFwiLlwiLFwiXCIpKSA/ICR0ZW1wbGF0ZSA6IG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3NvbWV0aW1lcyB0YXJnZXQgaXMgTm9kZUxpc3RcclxuICAgICAgICAgICAgbGV0IG5vZGVMZW5ndGggPSAkdGFyZ2V0LmdldCgpLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYobm9kZUxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGVMaXN0ID0gJHRhcmdldC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBub2RlTGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50Lm5hbWUsIGV2ZW50LmNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8qJHRhcmdldC5nZXQoKS5mb3JFYWNoKGZ1bmN0aW9uKCRpdGVtKXtcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50Lm5hbWUsIGV2ZW50LmNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJHRhcmdldC5nZXQoKS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50Lm5hbWUsIGV2ZW50LmNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGVsZXRlIHZpZXdFdmVudHNbaWRdO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZigkdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBpZihpc1Jvb3Qpe1xyXG4gICAgICAgICAgICAgICAgJHRlbXBsYXRlLnJlbW92ZUNoaWxkKCk7XHJcbiAgICAgICAgICAgICAgICAkdGVtcGxhdGUucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJHRlbXBsYXRlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob25EZXN0cm95ZWQpIHtcclxuICAgICAgICAgICAgb25EZXN0cm95ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcblxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE92ZW5UZW1wbGF0ZTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMC4uXHJcbiAqL1xyXG5pbXBvcnQgVGV4dFZpZXdUZW1wbGF0ZSBmcm9tICd2aWV3L2V4YW1wbGUvbWFpblRlbXBsYXRlJztcclxuaW1wb3J0IFZpZXdUZW1wbGF0ZSBmcm9tICd2aWV3L3ZpZXdUZW1wbGF0ZSc7XHJcbmltcG9ydCBIZWxwZXJUZW1wbGF0ZSBmcm9tICd2aWV3L2hlbHBlci9tYWluVGVtcGxhdGUnO1xyXG5pbXBvcnQgQmlnQnV0dG9uVGVtcGxhdGUgZnJvbSAndmlldy9oZWxwZXIvYmlnQnV0dG9uVGVtcGxhdGUnO1xyXG5pbXBvcnQgTWVzc2FnZUJveFRlbXBsYXRlIGZyb20gJ3ZpZXcvaGVscGVyL21lc3NhZ2VCb3hUZW1wbGF0ZSc7XHJcbmltcG9ydCBTcGlubmVyVGVtcGxhdGUgZnJvbSAndmlldy9oZWxwZXIvc3Bpbm5lclRlbXBsYXRlJztcclxuaW1wb3J0IENvbnRleHRQYW5lbFRlbXBsYXRlIGZyb20gJ3ZpZXcvaGVscGVyL2NvbnRleHRQYW5lbFRlbXBsYXRlJztcclxuXHJcbmltcG9ydCBDb250cm9sc1RlbXBsYXRlIGZyb20gJ3ZpZXcvY29udHJvbHMvbWFpblRlbXBsYXRlJztcclxuaW1wb3J0IFZvbHVtZUJ1dHRvblRlbXBsYXRlIGZyb20gJ3ZpZXcvY29udHJvbHMvdm9sdW1lQnV0dG9uVGVtcGxhdGUnO1xyXG5pbXBvcnQgUHJvZ3Jlc3NCYXJUZW1wbGF0ZSBmcm9tICd2aWV3L2NvbnRyb2xzL3Byb2dyZXNzQmFyVGVtcGxhdGUnO1xyXG5pbXBvcnQgUGxheUJ1dHRvblRlbXBsYXRlIGZyb20gJ3ZpZXcvY29udHJvbHMvcGxheUJ1dHRvblRlbXBsYXRlJztcclxuaW1wb3J0IFRpbWVEaXNwbGF5VGVtcGxhdGUgZnJvbSAndmlldy9jb250cm9scy90aW1lRGlzcGxheVRlbXBsYXRlJztcclxuaW1wb3J0IEZ1bGxTY3JlZW5CdXR0b25UZW1wbGF0ZSBmcm9tICd2aWV3L2NvbnRyb2xzL2Z1bGxTY3JlZW5CdXR0b25UZW1wbGF0ZSc7XHJcbmltcG9ydCBTZXR0aW5nUGFuZWxUZW1wbGF0ZSBmcm9tICd2aWV3L2NvbnRyb2xzL3NldHRpbmdQYW5lbFRlbXBsYXRlJztcclxuXHJcbmNvbnN0IFRlbXBsYXRlcyA9IHtcclxuICAgIFRleHRWaWV3VGVtcGxhdGUsXHJcbiAgICBWaWV3VGVtcGxhdGUsXHJcbiAgICBIZWxwZXJUZW1wbGF0ZSxcclxuICAgIEJpZ0J1dHRvblRlbXBsYXRlLFxyXG4gICAgTWVzc2FnZUJveFRlbXBsYXRlLFxyXG4gICAgU3Bpbm5lclRlbXBsYXRlLFxyXG4gICAgQ29udGV4dFBhbmVsVGVtcGxhdGUsXHJcblxyXG4gICAgQ29udHJvbHNUZW1wbGF0ZSxcclxuICAgIFZvbHVtZUJ1dHRvblRlbXBsYXRlLFxyXG4gICAgUHJvZ3Jlc3NCYXJUZW1wbGF0ZSxcclxuICAgIFBsYXlCdXR0b25UZW1wbGF0ZSxcclxuICAgIFRpbWVEaXNwbGF5VGVtcGxhdGUsXHJcbiAgICBGdWxsU2NyZWVuQnV0dG9uVGVtcGxhdGUsXHJcbiAgICBTZXR0aW5nUGFuZWxUZW1wbGF0ZVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGVtcGxhdGVzOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMTkuLlxyXG4gKi9cclxuXHJcbmNvbnN0IFRleHRWaWV3VGVtcGxhdGUgPSBmdW5jdGlvbih0ZXh0KXtcclxuICAgIHJldHVybiAnPGRpdiBjbGFzcz1cInRleHRWaWV3XCIgc3R5bGU9XCJwYWRkaW5nIDogNXB4OyBiYWNrZ3JvdW5kOiByZWRcIj4nICtcclxuICAgICAgICAgICAgICAgICc8aDM+Jyt0ZXh0Kyc8L2gzPicgK1xyXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuXCI+64ur6riwPC9idXR0b24+JyArXHJcbiAgICAgICAgICAgICc8L2Rpdj4nO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGV4dFZpZXdUZW1wbGF0ZTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI2Li5cclxuICovXHJcbmNvbnN0IFNldHRpbmdQYW5lbExpc3QgPSBbXTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldHRpbmdQYW5lbExpc3Q7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNC4uXHJcbiAqL1xyXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XHJcbmltcG9ydCB7XHJcbiAgICBTVEFURV9JRExFLFxyXG4gICAgU1RBVEVfUExBWUlORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfUEFVU0VEXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbmNvbnN0IEJpZ0J1dHRvbiA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSwgcGxheWVyU3RhdGUpe1xyXG5cclxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY29udGFpbmVyLCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgIC8vRG8gbm90aGluZyFcclxuICAgIH07XHJcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nIVxyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuICAgICAgICAvKlwiY2xpY2sgLm92cC1iaWdidXR0b24tY29udGFpbmVyXCIgOiBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSBhcGkuZ2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfSURMRSB8fCBjdXJyZW50U3RhdGUgPT09IFNUQVRFX1BBVVNFRCB8fCBjdXJyZW50U3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFKSB7XHJcbiAgICAgICAgICAgICAgICBhcGkucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSovXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJCaWdCdXR0b25cIiwgcGxheWVyU3RhdGUsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJpZ0J1dHRvbjsiLCJpbXBvcnQge1xyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9TVEFMTEVELFxyXG4gICAgU1RBVEVfTE9BRElORyxcclxuICAgIFNUQVRFX0NPTVBMRVRFLFxyXG4gICAgU1RBVEVfUEFVU0VELFxyXG4gICAgU1RBVEVfRVJST1JcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IChwbGF5ZXJTdGF0ZSkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1iaWdidXR0b24tY29udGFpbmVyIFwiPicgKyAgICAgIC8vYW5pbWF0ZWQgYm91bmNlSW5cclxuICAgICAgICAgICAgKHBsYXllclN0YXRlID09PSBTVEFURV9QTEFZSU5HID8gJzxpIGNsYXNzPVwib3ZwLWJpZ2J1dHRvbiBvdnAtYmlnYnV0dG9uLXBhdXNlXCI+PC9pPicgOiAnJykgK1xyXG4gICAgICAgICAgICAocGxheWVyU3RhdGUgPT09IFNUQVRFX1BBVVNFRCAgPyAnPGkgY2xhc3M9XCJvdnAtYmlnYnV0dG9uIG92cC1iaWdidXR0b24tcGxheVwiPjwvaT4nIDogJycpICtcclxuICAgICAgICAgICAgKHBsYXllclN0YXRlID09PSBTVEFURV9DT01QTEVURSA/ICc8aSBjbGFzcz1cIm92cC1iaWdidXR0b24gb3ZwLWJpZ2J1dHRvbi1yZXBsYXlcIj48L2k+JyA6ICcnKSArXHJcbiAgICAgICAgJzwvZGl2PidcclxuICAgICk7XHJcbn07IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAxLi5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5cclxuY29uc3QgQ29udGV4dFBhbmVsID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpLCBwb3NpdGlvbil7XHJcbiAgICBjb25zdCAkcm9vdCA9IExBJChcIiNcIithcGkuZ2V0Q29udGFpbmVySWQoKSk7XHJcblxyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgY29uc3QgcGFuZWxXaWR0aCA9ICRjdXJyZW50LndpZHRoKCk7XHJcbiAgICAgICAgY29uc3QgcGFuZWxIZWlnaHQgPSAkY3VycmVudC5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgeCA9IE1hdGgubWluKHBvc2l0aW9uLnBhZ2VYIC0gJHJvb3Qub2Zmc2V0KCkubGVmdCwgJHJvb3Qud2lkdGgoKSAtIHBhbmVsV2lkdGgpO1xyXG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLm1pbihwb3NpdGlvbi5wYWdlWSAtICRyb290Lm9mZnNldCgpLnRvcCwgJHJvb3QuaGVpZ2h0KCkgLSBwYW5lbEhlaWdodCk7XHJcblxyXG4gICAgICAgICRjdXJyZW50LmNzcyhcImxlZnRcIiAsIHggKyBcInB4XCIpO1xyXG4gICAgICAgICRjdXJyZW50LmNzcyhcInRvcFwiICwgeSArIFwicHhcIik7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vRG8gbm90aGluZy5cclxuICAgIH07XHJcbiAgICBjb25zdCBldmVudHMgPSB7XHJcbiAgICAgICAgXCJjbGljayAub3ZwLWNvbnRleHQtaXRlbVwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihcclxuICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vQWlyZW5Tb2Z0L092ZW5QbGF5ZXInLFxyXG4gICAgICAgICAgICAgICAgJ19ibGFuaydcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJDb250ZXh0UGFuZWxcIiwgcG9zaXRpb24sIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250ZXh0UGFuZWw7XHJcbiIsImltcG9ydCB7dmVyc2lvbn0gZnJvbSAndmVyc2lvbic7XHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtY29udGV4dC1wYW5lbCBhbmltYXRlZCBmYWRlSW5cIj4nICtcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtY29udGV4dC1pdGVtXCIgdGFiaW5kZXg9XCIwXCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtY29udGV4dC1pdGVtLXRleHRcIj5IZWxwPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtY29udGV4dC1pdGVtXCIgdGFiaW5kZXg9XCIxXCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtY29udGV4dC1pdGVtLXRleHRcIj5BYm91dCBPdmVuUGxheWVyICcrdmVyc2lvbisnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAnPC9kaXY+J1xyXG4gICAgKTtcclxufTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI0Li5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuaW1wb3J0IEJpZ0J1dHRvbiBmcm9tICd2aWV3L2hlbHBlci9iaWdCdXR0b24nO1xyXG5pbXBvcnQgTWVzc2FnZUJveCBmcm9tICd2aWV3L2hlbHBlci9tZXNzYWdlQm94JztcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSAndmlldy9oZWxwZXIvc3Bpbm5lcic7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgUkVBRFksXHJcbiAgICBFUlJPUixcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX1BBVVNFRCxcclxuICAgIFNUQVRFX0VSUk9SLFxyXG4gICAgUExBWUVSX1NUQVRFLFxyXG4gICAgTkVUV09SS19VTlNUQUJMRURcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuY29uc3QgSGVscGVyID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpKXtcclxuICAgIGxldCBiaWdCdXR0b24gPSBcIlwiLCBtZXNzYWdlQm94ID0gXCJcIiwgc3Bpbm5lciA9IFwiXCI7XHJcblxyXG5cclxuXHJcbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICBsZXQgY3JlYXRlQmlnQnV0dG9uID0gZnVuY3Rpb24oc3RhdGUpe1xyXG4gICAgICAgICAgICBpZihiaWdCdXR0b24pe1xyXG4gICAgICAgICAgICAgICAgYmlnQnV0dG9uLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiaWdCdXR0b24gPSBCaWdCdXR0b24oJGN1cnJlbnQsIGFwaSwgc3RhdGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGNyZWF0ZU1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlLCB3aXRoVGltZXIpe1xyXG4gICAgICAgICAgICBpZihtZXNzYWdlQm94KXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VCb3guZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lc3NhZ2VCb3ggPSBNZXNzYWdlQm94KCRjdXJyZW50LCBhcGksIG1lc3NhZ2UsIHdpdGhUaW1lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzcGlubmVyID0gU3Bpbm5lcigkY3VycmVudCwgYXBpKTtcclxuXHJcbiAgICAgICAgYXBpLm9uKFJFQURZLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3JlYXRlQmlnQnV0dG9uKFNUQVRFX1BBVVNFRCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXBpLm9uKFBMQVlFUl9TVEFURSwgZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIGlmKGRhdGEgJiYgZGF0YS5uZXdzdGF0ZSl7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLm5ld3N0YXRlID09PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgICAgICAgICBiaWdCdXR0b24uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwaW5uZXIuc2hvdyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVCaWdCdXR0b24oZGF0YS5uZXdzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5uZXdzdGF0ZSA9PT0gU1RBVEVfU1RBTExFRCB8fCBkYXRhLm5ld3N0YXRlID09PSBTVEFURV9MT0FESU5HICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwaW5uZXIuc2hvdyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Bpbm5lci5zaG93KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBhcGkub24oRVJST1IsIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ0luaXRpYWxpemF0aW9uIGZhaWxlZC4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLmNvZGUgPT09IDMwMSkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdNZWRpYSBwbGF5YmFjayB3YXMgY2FuY2VsZWQuJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5jb2RlID09PSAzMDIpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnU29tZSBvZiB0aGUgbWVkaWEgY291bGQgbm90IGJlIGRvd25sb2FkZWQgZHVlIHRvIGEgbmV0d29yayBlcnJvci4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLmNvZGUgPT09IDMwMykge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdVbmFibGUgdG8gbG9hZCBtZWRpYS4gVGhpcyBtYXkgYmUgZHVlIHRvIGEgc2VydmVyIG9yIG5ldHdvcmsgZXJyb3IsIG9yIGR1ZSB0byBhbiB1bnN1cHBvcnRlZCBmb3JtYXQuJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5jb2RlID09PSAzMDQpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnTWVkaWEgcGxheWJhY2sgaGFzIGJlZW4gY2FuY2VsZWQuIEl0IGxvb2tzIGxpa2UgeW91ciBtZWRpYSBpcyBjb3JydXB0ZWQgb3IgeW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIGZlYXR1cmVzIHlvdXIgbWVkaWEgdXNlcy4nO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KGVycm9yLmNvZGUvMTAwKSA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3kgc2VydmVyIGZhaWxlZC4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdDYW4gbm90IHBsYXkgZHVlIHRvIHVua25vd24gcmVhc29ucy4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjcmVhdGVNZXNzYWdlKG1lc3NhZ2UsIG51bGwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhcGkub24oTkVUV09SS19VTlNUQUJMRUQsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnQmVjYXVzZSB0aGUgbmV0d29yayBjb25uZWN0aW9uIGlzIHVuc3RhYmxlLCB0aGUgZm9sbG93aW5nIG1lZGlhIHNvdXJjZSB3aWxsIGJlIHBsYXllZC4nO1xyXG5cclxuICAgICAgICAgICAgaWYoYXBpLmdldEN1cnJlbnRRdWFsaXR5KCkuaW5kZXgrMSA9PT0gIGFwaS5nZXRRdWFsaXR5TGV2ZWxzKCkubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnTmV0d29yayBjb25uZWN0aW9uIGlzIHVuc3RhYmxlLiBDaGVjayB0aGUgbmV0d29yayBjb25uZWN0aW9uLic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZU1lc3NhZ2UobWVzc2FnZSwgNTAwMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvL0RvIG5vdGhpbmcuXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZXZlbnRzID0ge1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIkhlbHBlclwiLCBudWxsLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZWxwZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMTkuLlxyXG4gKi9cclxuXHJcbmNvbnN0IEhlbHBlclRlbXBsYXRlID0gZnVuY3Rpb24odGV4dCl7XHJcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJvdnAtaGVscGVycy1jb250YWluZXJcIj48L2Rpdj4nO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVscGVyVGVtcGxhdGU7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjQuLlxyXG4gKi9cclxuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xyXG5pbXBvcnQge1xyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX1BBVVNFRFxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCBNZXNzYWdlQm94ID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpLCBtZXNzYWdlLCB3aXRoVGltZXIpe1xyXG5cclxuICAgIGxldCBhdXRvRGVzdHJveVRpbWVyID0gXCJcIjtcclxuXHJcbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICBpZih3aXRoVGltZXIpe1xyXG4gICAgICAgICAgICBhdXRvRGVzdHJveVRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9LCB3aXRoVGltZXJ8fDUwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgZXZlbnRzID0ge1xyXG4gICAgICAgIFwiY2xpY2sgLm92cC1tZXNzYWdlLXRleHRcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYoYXV0b0Rlc3Ryb3lUaW1lcil7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoYXV0b0Rlc3Ryb3lUaW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGVtcGxhdGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIk1lc3NhZ2VCb3hcIiwgbWVzc2FnZSwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VCb3g7IiwiZXhwb3J0IGRlZmF1bHQgKG1lc3NhZ2UpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtbWVzc2FnZS1ib3ggYW5pbWF0ZWQgc2hha2VcIj4nICtcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtbWVzc2FnZS1jb250YWluZXJcIj4nICtcclxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1tZXNzYWdlLXRleHRcIj4nK21lc3NhZ2UrJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICc8L2Rpdj4nXHJcbiAgICApO1xyXG59OyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjUuLlxyXG4gKi9cclxuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xyXG5cclxuY29uc3QgU3Bpbm5lciA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSl7XHJcbiAgICBsZXQgJHNwaW5uZXIgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICRzcGlubmVyID0gJGN1cnJlbnQ7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vRG8gbm90aGluZy5cclxuICAgIH07XHJcbiAgICBjb25zdCBldmVudHMgPSB7fTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJTcGlubmVyXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKSwge1xyXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uIChpc1Nob3cpIHtcclxuICAgICAgICAgICAgaWYoaXNTaG93KXtcclxuICAgICAgICAgICAgICAgICRzcGlubmVyLnNob3coKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkc3Bpbm5lci5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcGlubmVyOyIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIm92cC1zcGlubmVyLWNvbnRhaW5lclwiPjxkaXYgY2xhc3M9XCJvdnAtc3Bpbm5lclwiPjxkaXYgY2xhc3M9XCJib3VuY2UxXCI+PC9kaXY+PGRpdiBjbGFzcz1cImJvdW5jZTJcIj48L2Rpdj48ZGl2IGNsYXNzPVwiYm91bmNlM1wiPjwvZGl2PjwvZGl2PjwvZGl2Pic7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjAuLlxyXG4gKi9cclxuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xyXG5pbXBvcnQgSGVscGVyIGZyb20gJ3ZpZXcvaGVscGVyL21haW4nO1xyXG5pbXBvcnQgQ29udHJvbHMgZnJvbSAndmlldy9jb250cm9scy9tYWluJztcclxuaW1wb3J0IFNldHRpbmdQYW5lbExpc3QgZnJvbSAndmlldy9nbG9iYWwvU2V0dGluZ1BhbmVsTGlzdCc7XHJcbmltcG9ydCBDb250ZXh0UGFuZWwgZnJvbSAndmlldy9oZWxwZXIvY29udGV4dFBhbmVsJztcclxuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcclxuaW1wb3J0IHtcclxuICAgIFJFQURZLFxyXG4gICAgREVTVFJPWSxcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX1BBVVNFRCxcclxuICAgIFNUQVRFX0VSUk9SLFxyXG4gICAgQ09OVEVOVF9NRVRBLFxyXG4gICAgUExBWUVSX1NUQVRFLFxyXG4gICAgRVJST1JcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxucmVxdWlyZSgnLi4vLi4vY3NzL292ZW5wbGF5ZXIubGVzcycpO1xyXG5cclxuY29uc3QgVmlldyA9IGZ1bmN0aW9uKCRjb250YWluZXIpe1xyXG4gICAgbGV0IHZpZXdUZW1wbGF0ZSA9IFwiXCIsIGNvbnRyb2xzID0gXCJcIiwgaGVscGVyID0gXCJcIiwgJHBsYXllclJvb3QsIGNvbnRleHRQYW5lbCA9IFwiXCIsIGFwaSA9IFwiXCIsIGF1dG9IaWRlVGltZXIgPSBcIlwiO1xyXG5cclxuICAgIGxldCBzZXRIaWRlID0gZnVuY3Rpb24gKGhpZGUsIGF1dG9IaWRlKSB7XHJcblxyXG4gICAgICAgIGlmIChhdXRvSGlkZVRpbWVyKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChhdXRvSGlkZVRpbWVyKTtcclxuICAgICAgICAgICAgYXV0b0hpZGVUaW1lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGlkZSkge1xyXG4gICAgICAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRwbGF5ZXJSb290LmFkZENsYXNzKFwib3ZwLWF1dG9oaWRlXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRwbGF5ZXJSb290LnJlbW92ZUNsYXNzKFwib3ZwLWF1dG9oaWRlXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGF1dG9IaWRlKSB7XHJcbiAgICAgICAgICAgICAgICBhdXRvSGlkZVRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICRwbGF5ZXJSb290LmFkZENsYXNzKFwib3ZwLWF1dG9oaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTgwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgbGV0IHRvZ2dsZVBsYXlQYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSBhcGkuZ2V0U3RhdGUoKTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfSURMRSB8fCBjdXJyZW50U3RhdGUgPT09IFNUQVRFX1BBVVNFRCB8fCBjdXJyZW50U3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFKSB7XHJcbiAgICAgICAgICAgIGFwaS5wbGF5KCk7XHJcbiAgICAgICAgfWVsc2UgaWYoY3VycmVudFN0YXRlID09PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgYXBpLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGxldCBzZWVrID0gZnVuY3Rpb24gKHNlY29uZHMsIGlzUmV3aW5kKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gYXBpLmdldER1cmF0aW9uKCk7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gYXBpLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gMDtcclxuXHJcbiAgICAgICAgaWYoaXNSZXdpbmQpe1xyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IE1hdGgubWF4KGN1cnJlbnRQb3NpdGlvbiAtIHNlY29uZHMsIDApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IE1hdGgubWluKGN1cnJlbnRQb3NpdGlvbiArIHNlY29uZHMsIGR1cmF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFwaS5zZWVrKHBvc2l0aW9uKTtcclxuICAgIH07XHJcbiAgICBsZXQgdm9sdW1lID0gZnVuY3Rpb24oaXNVcCl7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFZvbHVtbiA9IGFwaS5nZXRWb2x1bWUoKTtcclxuICAgICAgICBsZXQgbmV3Vm9sdW1lID0gMDtcclxuICAgICAgICBpZihpc1VwKXtcclxuICAgICAgICAgICAgbmV3Vm9sdW1lID0gIE1hdGgubWluKGN1cnJlbnRWb2x1bW4gKyA1LCAxMDApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBuZXdWb2x1bWUgPSBNYXRoLm1heChjdXJyZW50Vm9sdW1uIC0gNSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwaS5zZXRWb2x1bWUobmV3Vm9sdW1lKTtcclxuICAgIH07XHJcbiAgICBsZXQgY3JlYXRlQ29udGV4dFBhbmVsID0gZnVuY3Rpb24ocGFnZVgsIHBhZ2VZKXtcclxuICAgICAgICBpZihjb250ZXh0UGFuZWwpe1xyXG4gICAgICAgICAgICBjb250ZXh0UGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBjb250ZXh0UGFuZWwgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZXh0UGFuZWwgPSBDb250ZXh0UGFuZWwoJHBsYXllclJvb3QsIGFwaSwge3BhZ2VYIDogcGFnZVgsIHBhZ2VZIDogcGFnZVl9KTtcclxuICAgIH07XHJcblxyXG5cclxuXHJcblxyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgJHBsYXllclJvb3QgPSAkY3VycmVudDtcclxuICAgICAgICB2aWV3VGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgIH07XHJcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nLlxyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuICAgICAgICBcImNsaWNrIC5vdmVucGxheWVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGNvbnRleHRQYW5lbCl7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0UGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dFBhbmVsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighTEEkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChcIi5vdnAtYm90dG9tLXBhbmVsXCIpICYmXHJcbiAgICAgICAgICAgICAgICAhTEEkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChcIi5vdnAtc2V0dGluZy1wYW5lbFwiKSYmXHJcbiAgICAgICAgICAgICAgICAhTEEkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChcIi5vdnAtbWVzc2FnZS1jb250YWluZXJcIikpe1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlUGxheVBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIUxBJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIub3ZwLXNldHRpbmctcGFuZWxcIikgJiYgIUxBJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIub3ZwLXNldHRpbmctYnV0dG9uXCIpICYmIFNldHRpbmdQYW5lbExpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAvL2NsZWFyIGFsbCBTZXR0aW5nUGFuZWxUZW1wbGF0ZVxyXG4gICAgICAgICAgICAgICAgXy5lYWNoKFNldHRpbmdQYW5lbExpc3QsIGZ1bmN0aW9uKHNldHRpbmdQYW5lbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ1BhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgU2V0dGluZ1BhbmVsTGlzdC5zcGxpY2UoMCwgU2V0dGluZ1BhbmVsTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vdXNlZW50ZXIgLm92ZW5wbGF5ZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFwaS5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRIaWRlKGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNldEhpZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vdXNlbW92ZSAub3ZlbnBsYXllclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXBpLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcclxuICAgICAgICAgICAgICAgIHNldEhpZGUoZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0SGlkZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW91c2VsZWF2ZSAub3ZlbnBsYXllclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZihhcGkuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORyl7XHJcbiAgICAgICAgICAgICAgICBzZXRIaWRlKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJrZXlkb3duIC5vdmVucGxheWVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzMiA6ICAgLy9zYXBjZVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUGxheVBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM3IDogLy9hcnJvdyBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWVrKDUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOSA6IC8vYXJyb3cgcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlZWsoNSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOCA6IC8vYXJyb3cgdXBcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZvbHVtZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDAgOiAvL2Fycm93IHVwXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB2b2x1bWUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImNvbnRleHRtZW51IC5vdmVucGxheWVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY3JlYXRlQ29udGV4dFBhbmVsKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJWaWV3XCIsICRjb250YWluZXIuaWQsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQsIHRydWUpLCB7XHJcbiAgICAgICAgZ2V0TWVkaWFFbGVtZW50Q29udGFpbmVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkcGxheWVyUm9vdC5maW5kKFwiLm92cC1tZWRpYS1lbGVtZW50LWNvbnRhaW5lclwiKS5nZXQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldEFwaTogZnVuY3Rpb24gKHBsYXllckluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGFwaSA9IHBsYXllckluc3RhbmNlO1xyXG4gICAgICAgICAgICBoZWxwZXIgPSBIZWxwZXIoJHBsYXllclJvb3QuZmluZChcIi5vdnAtdWlcIiksIHBsYXllckluc3RhbmNlKTtcclxuICAgICAgICAgICAgY29udHJvbHMgPSBDb250cm9scygkcGxheWVyUm9vdC5maW5kKFwiLm92cC11aVwiKSwgcGxheWVySW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBhcGkub24oQ09OVEVOVF9NRVRBLCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaWYoIWNvbnRyb2xzKXtcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9scyA9IENvbnRyb2xzKCRwbGF5ZXJSb290LmZpbmQoXCIub3ZwLXVpXCIpLCBwbGF5ZXJJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhcGkub24oRVJST1IsIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9scy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBjb250cm9scyA9IG51bGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYXBpLm9uKERFU1RST1ksIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZpZXdUZW1wbGF0ZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYXBpLm9uKFBMQVlFUl9TVEFURSwgZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhICYmIGRhdGEubmV3c3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRIaWRlKGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SGlkZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmlldztcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMC4uXHJcbiAqL1xyXG5cclxuY29uc3QgVmlld1RlbXBsYXRlID0gZnVuY3Rpb24oaWQpe1xyXG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwib3ZlbnBsYXllciBvdnAtd3JhcHBlclwiIHRhYmluZGV4PVwiLTFcIiBhcmlhLWxhYmVsPVwiXCIgaWQ9XCInK2lkKydcIj4nICtcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXJhdGlvXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1wbGF5ZXJcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1tZWRpYS1lbGVtZW50LWNvbnRhaW5lclwiIGRhdGEtcGFyZW50LWlkPVwiJytpZCsnXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXVpXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPC9kaXY+J1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBWaWV3VGVtcGxhdGU7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=