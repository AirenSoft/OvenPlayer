/*! OvenPlayerv0.7.3 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
var version = exports.version = '0.7.3-localbuild';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9vdmVucGxheWVyLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLWZ1bGxzY3JlZW4tY29tcHJlc3Muc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1mdWxsc2NyZWVuLWV4cGFuZC5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXBsYXktbGFyZ2Uuc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1wbGF5LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItcmUtbGFyZ2Uuc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1zZXR0aW5nLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItc3RvcC1sYXJnZS5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXN0b3Auc3ZnIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci12b2x1bWUtMi5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXZvbHVtZS1tdXRlLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItdm9sdW1lLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvY3NzL292ZW5wbGF5ZXIubGVzcz83MTVmIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvc2hpbXMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xpa2VBJC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvbG9nZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9wb2x5ZmlsbHMvZG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zdHJpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy91bmRlcnNjb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy92YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3dlYnBhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvZnVsbFNjcmVlbkJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9mdWxsU2NyZWVuQnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9tYWluVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcGxheUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9wbGF5QnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcHJvZ3Jlc3NCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcHJvZ3Jlc3NCYXJUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9zZXR0aW5nUGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvc2V0dGluZ1BhbmVsVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdGltZURpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdGltZURpc3BsYXlUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy92b2x1bWVCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdm9sdW1lQnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9lbmdpbmUvVGVtcGxhdGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2V4YW1wbGUvbWFpblRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2dsb2JhbC9TZXR0aW5nUGFuZWxMaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9iaWdCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL2JpZ0J1dHRvblRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9jb250ZXh0UGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL2NvbnRleHRQYW5lbFRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9tYWluVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL21lc3NhZ2VCb3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL21lc3NhZ2VCb3hUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9oZWxwZXIvc3Bpbm5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9oZWxwZXIvc3Bpbm5lclRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvdmlld1RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbIkFwaSIsImNvbnRhaW5lciIsImxvZ01hbmFnZXIiLCJ0aGF0IiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ2ZXJzaW9uIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiaW5pdFByb3ZpZGVyIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImRlZmF1bHQiLCJnZXRRdWFsaXR5TGFiZWwiLCJsYWJlbCIsImxvYWRQcm92aWRlcnMiLCJnZXRQbGF5bGlzdCIsInRoZW4iLCJkZXN0cm95IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJQcm92aWRlcnMiLCJnZXROYW1lIiwiUFJPVklERVJfUlRNUCIsIm9uIiwibmFtZSIsImRhdGEiLCJ0cmlnZ2VyIiwiRVJST1IiLCJjb2RlIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJwYXJzZUludCIsIk5FVFdPUktfVU5TVEFCTEVEIiwiY3VycmVudFF1YWxpdHkiLCJnZXRDdXJyZW50UXVhbGl0eSIsImluZGV4IiwiZ2V0UXVhbGl0eUxldmVscyIsInBhdXNlIiwic2V0Q3VycmVudFF1YWxpdHkiLCJwcmVsb2FkIiwiZmx1c2giLCJSRUFEWSIsImNhdGNoIiwiZXJyb3IiLCJlcnJvck9iamVjdCIsIklOSVRfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImluaXQiLCJvcHRpb25zIiwiaXNEZWJ1ZyIsImRpc2FibGUiLCJzZXRQbGF5bGlzdCIsImdldENvbmZpZyIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJnZXRWb2x1bWUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInBsYXlsaXN0IiwicGxheSIsInNlZWsiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsInNldERlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJxdWFsaXR5SW5kZXgiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwiaXNTYW1lUHJvdmlkZXIiLCJyZXNRdWFsaXR5SW5kZXgiLCJnZXRCdWZmZXIiLCJnZXRTdGF0ZSIsInN0b3AiLCJyZW1vdmUiLCJERVNUUk9ZIiwib2ZmIiwiQXBpUnRtcEV4cGFuc2lvbiIsImV4dGVybmFsQ2FsbGJhY2tDcmVlcCIsInJlc3VsdCIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsIkNvbmZpZ3VyYXRvciIsImNvbXBvc2VTb3VyY2VPcHRpb25zIiwiRGVmYXVsdHMiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5YmFja1JhdGVzIiwibXV0ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2VyaWFsaXplIiwidmFsIiwidW5kZWZpbmVkIiwibG93ZXJjYXNlVmFsIiwidG9Mb3dlckNhc2UiLCJpc05hTiIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJkZXNlcmlhbGl6ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwibm9ybWFsaXplU2l6ZSIsInNsaWNlIiwiZXZhbHVhdGVBc3BlY3RSYXRpbyIsImFyIiwidG9TdHJpbmciLCJpbmRleE9mIiwidGVzdCIsInciLCJzdWJzdHIiLCJoIiwiY29uZmlnIiwiYXNwZWN0cmF0aW8iLCJyYXRlQ29udHJvbHMiLCJyYXRlcyIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsIl8iLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJwdXNoIiwic29ydCIsImNvbmZpZ1BsYXlsaXN0Iiwib2JqIiwicGljayIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJkZWJ1ZyIsImltYWdlIiwicXVhbGl0eUxhYmVsIiwicmVwZWF0Iiwic3RyZXRjaGluZyIsImdldEFzcGVjdHJhdGlvIiwic2V0QXNwZWN0cmF0aW8iLCJhc3BlY3RyYXRpb18iLCJnZXREZWZhdWx0UGxheWJhY2tSYXRlIiwic2V0UXVhbGl0eUxhYmVsIiwibmV3TGFiZWwiLCJnZXRQbGF5YmFja1JhdGVzIiwiaXNQbGF5YmFja1JhdGVDb250cm9scyIsInBsYXlsaXN0XyIsImlzUmVwZWF0IiwiZ2V0U3RyZXRjaGluZyIsIkV2ZW50RW1pdHRlciIsIm9iamVjdCIsIl9ldmVudHMiLCJ0cmlnZ2VyRXZlbnRzIiwiZXZlbnRzIiwiYXJncyIsImNvbnRleHQiLCJldmVudCIsImxpc3RlbmVyIiwiYXBwbHkiLCJjYWxsIiwiYXJndW1lbnRzIiwiYWxsRXZlbnRzIiwiYWxsIiwibmFtZXMiLCJsIiwicmV0YWluIiwiaiIsImsiLCJfY2FsbGJhY2siLCJvbmNlIiwiY291bnQiLCJvbmNlQ2FsbGJhY2siLCJfbGlzdGVuZXIiLCJMYXp5Q29tbWFuZEV4ZWN1dG9yIiwiaW5zdGFuY2UiLCJxdWV1ZWRDb21tYW5kcyIsImNvbW1hbmRRdWV1ZSIsInVuZGVjb3JhdGVkTWV0aG9kcyIsImV4ZWN1dGVNb2RlIiwiY29tbWFuZCIsIm1ldGhvZCIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwiY29tbWFuZF8iLCJjb21tYW5kUXVldWVJdGVtIiwiZmluZFdoZXJlIiwic3BsaWNlIiwiZmluZEluZGV4IiwiU3VwcG9ydENoZWNrZXIiLCJzdXBwb3J0TGlzdCIsImNoZWNrU3VwcG9ydCIsInNvdXJjZSIsIk1pbWVUeXBlcyIsImFhYyIsIm1wNCIsImY0diIsIm00diIsIm1vdiIsIm1wMyIsIm1wZWciLCJvZ3YiLCJvZ2ciLCJvZ2EiLCJ2b3JiaXMiLCJ3ZWJtIiwiZjRhIiwibTN1OCIsIm0zdSIsImhscyIsInZpZGVvIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2FuUGxheVR5cGUiLCJmaWxlIiwidHlwZSIsIm1pbWVUeXBlIiwiaXNIbHNTdXBwb3J0IiwiZ2V0TWVkaWFTb3VyY2UiLCJ3aW5kb3ciLCJNZWRpYVNvdXJjZSIsIldlYktpdE1lZGlhU291cmNlIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXIiLCJTb3VyY2VCdWZmZXIiLCJXZWJLaXRTb3VyY2VCdWZmZXIiLCJpc1R5cGVTdXBwb3J0ZWQiLCJzb3VyY2VCdWZmZXJWYWxpZEFQSSIsImFwcGVuZEJ1ZmZlciIsImZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSIsInNvcnVjZV8iLCJmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QiLCJzdXBwb3J0TmFtZXMiLCJpdGVtIiwic3VwcG9ydGVkIiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIlBST1ZJREVSX0RBU0giLCJQUk9WSURFUl9ITFMiLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIkNPTlRFTlRfU0VFS0VEIiwiUExBWUVSX1NUQVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfVElNRSIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfTEVWRUxTIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJQTEFZRVJfVU5LTldPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiTWFuYWdlciIsImN1cnJlbnRQbGF5bGlzdCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwicmVwbGFjZSIsInByZXR0aWVkUGxheWxpc3QiLCJ0cmFja3MiLCJwbGF5bGlzdEl0ZW0iLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwiY2FwdGlvbnMiLCJjb25jYXQiLCJ0cmFjayIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsInByb3ZpZGVyIiwiUHJvdmlkZXJMb2FkZXIiLCJodG1sNSIsInJlcXVpcmUiLCJlcnIiLCJFcnJvciIsIndlYnJ0YyIsImRhc2giLCJydG1wIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJwcm92aWRlck5hbWUiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsInByb21pc2VGaW5hbGx5IiwiY2FsbGJhY2siLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXRGdW5jIiwic2V0VGltZW91dCIsInNldEltbWVkaWF0ZUZ1bmMiLCJzZXRJbW1lZGlhdGUiLCJub29wIiwiYmluZCIsImZuIiwidGhpc0FyZyIsIlByb21pc2VTaGltIiwiVHlwZUVycm9yIiwiX3N0YXRlIiwiX2hhbmRsZWQiLCJfdmFsdWUiLCJfZGVmZXJyZWRzIiwiZG9SZXNvbHZlIiwiaGFuZGxlIiwic2VsZiIsImRlZmVycmVkIiwiX2ltbWVkaWF0ZUZuIiwiY2IiLCJvbkZ1bGZpbGxlZCIsIm9uUmVqZWN0ZWQiLCJwcm9taXNlIiwicmV0IiwiZSIsIm5ld1ZhbHVlIiwiZmluYWxlIiwiX3VuaGFuZGxlZFJlamVjdGlvbkZuIiwibGVuIiwiSGFuZGxlciIsImRvbmUiLCJleCIsInByb20iLCJhcnIiLCJyZW1haW5pbmciLCJyZXMiLCJyYWNlIiwidmFsdWVzIiwiY29uc29sZSIsIndhcm4iLCJyZXNvbHZlZCIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwiT3ZlblBsYXllciIsIk92ZW5QbGF5ZXJTREsiLCJjcmVhdGUiLCJicm93c2VyTmFtZSIsImNvbnRhaW5lckVsZW1lbnQiLCJwbGF5ZXIiLCJwbGF5ZXJJbnN0YW5jZSIsImdldE1lZGlhRWxlbWVudENvbnRhaW5lciIsImdldENvbnRhaW5lcklkIiwiaWQiLCJzZXRBcGkiLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub2RlVHlwZSIsImdldFBsYXllckxpc3QiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJMYSQiLCJnZXRQbGF5ZXJCeUluZGV4IiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwiZ2V0QnJvd3NlciIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1zaWUiLCJhdmlnYXRvciIsImRvY3VtZW50TW9kZSIsIm1hdGNoIiwidWEiLCJzdWJzdHJpbmciLCJzZWxlY3Rvck9yRWxlbWVudCIsInJldHVybk5vZGUiLCIkZWxlbWVudCIsInNlbGVjdG9yIiwibm9kZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlcnkiLCJpc0VsZW1lbnQiLCJmaW5kIiwiY3NzIiwiZWxlbWVudCIsInN0eWxlIiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGFzc05hbWVzIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJyZW1vdmVDbGFzcyIsIlJlZ0V4cCIsImpvaW4iLCJzaG93IiwiZGlzcGxheSIsImhpZGUiLCJhcHBlbmQiLCJodG1sQ29kZSIsImlubmVySFRNTCIsInRleHQiLCJ0ZXh0Q29udGVudCIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJpcyIsIiR0YXJnZXRFbGVtZW50Iiwib2Zmc2V0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImJvZHkiLCJzY3JvbGxUb3AiLCJsZWZ0Iiwic2Nyb2xsTGVmdCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiYXR0ciIsImdldEF0dHJpYnV0ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImh0bWwiLCJyZXBsYWNlV2l0aCIsImFwcGVuZENoaWxkIiwiZ2V0IiwiY2xvc2VzdCIsInNlbGVjdG9yU3RyaW5nIiwibG9nZ2VyIiwicHJldkNvbnNvbGVMb2ciLCJlbmFibGUiLCJnbG9iYWwiLCJzZWxlY3RvcnMiLCJlbGVtZW50cyIsImRvY3VtZW50RWxlbWVudCIsImZpcnN0Q2hpbGQiLCJfcXNhIiwic3R5bGVTaGVldCIsImNzc1RleHQiLCJzY3JvbGxCeSIsInJlbW92ZUF0dHJpYnV0ZSIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiU3RyaW5nIiwiTm9kZSIsInAiLCJET01FeGNlcHRpb24iLCJFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRlZmluZVByb3BlcnR5IiwiRXZlbnQiLCJDQVBUVVJJTkdfUEhBU0UiLCJBVF9UQVJHRVQiLCJCVUJCTElOR19QSEFTRSIsImRlZmluZVByb3BlcnRpZXMiLCJ0YXJnZXQiLCJzcmNFbGVtZW50IiwiY3VycmVudFRhcmdldCIsIl9jdXJyZW50VGFyZ2V0IiwiZXZlbnRQaGFzZSIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwidGltZVN0YW1wIiwiX3RpbWVTdGFtcCIsInN0b3BQcm9wYWdhdGlvbiIsImNhbmNlbEJ1YmJsZSIsInByZXZlbnREZWZhdWx0IiwicmV0dXJuVmFsdWUiLCJkZWZhdWx0UHJldmVudGVkIiwidXNlQ2FwdHVyZSIsImYiLCJEYXRlIiwibm93IiwiYXR0YWNoRXZlbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGV0YWNoRXZlbnQiLCJXaW5kb3ciLCJIVE1MRG9jdW1lbnQiLCJvIiwiQ3VzdG9tRXZlbnQiLCJwYXJhbXMiLCJkZXRhaWwiLCJldnQiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImFkZEV2ZW50IiwicmVtb3ZlRXZlbnQiLCJET01Ub2tlbkxpc3RTaGltIiwicyIsInJlbW92ZVRva2VuRnJvbVN0cmluZyIsInRva2VuIiwic3RyaW5nIiwidG9rZW5zIiwiaWR4IiwiU3ludGF4RXJyb3IiLCJzb21lIiwidW5kZXJseWluZ19zdHJpbmciLCJ0b2tlbl9saXN0IiwidG9nZ2xlIiwiZm9yY2UiLCJuIiwiYWRkVG9FbGVtZW50UHJvdG90eXBlIiwiZ2V0Q2xhc3NMaXN0IiwiZWxlbSIsImdldFJlbExpc3QiLCJyZWxMaXN0IiwiRE9NVG9rZW5MaXN0IiwicHJldmlvdXNTaWJsaW5nIiwiRUxFTUVOVF9OT0RFIiwibmV4dFNpYmxpbmciLCJtYXRjaGVzIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJvTWF0Y2hlc1NlbGVjdG9yIiwibW96TWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwib3duZXJEb2N1bWVudCIsImVsIiwicGFyZW50RWxlbWVudCIsIm1peGluIiwicHMiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJjb252ZXJ0Tm9kZXNJbnRvQU5vZGUiLCJub2RlcyIsIm5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJQYXJlbnROb2RlIiwicHJlcGVuZCIsImluc2VydEJlZm9yZSIsIkRvY3VtZW50IiwiRG9jdW1lbnRGcmFnbWVudCIsIkNoaWxkTm9kZSIsImJlZm9yZSIsInBhcmVudCIsInZpYWJsZVByZXZpb3VzU2libGluZyIsImFmdGVyIiwidmlhYmxlTmV4dFNpYmxpbmciLCJyZXBsYWNlQ2hpbGQiLCJEb2N1bWVudFR5cGUiLCJDaGFyYWN0ZXJEYXRhIiwidHJpbSIsIm5hdHVyYWxIbXMiLCJleHRyYWN0RXh0ZW5zaW9uIiwicGF0aCIsImdldEF6dXJlRmlsZUZvcm1hdCIsImV4dGVuc2lvbiIsImF6dXJlZEZvcm1hdCIsImxhc3RJbmRleE9mIiwic2Vjb25kIiwic2VjTnVtIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiciIsIlN5bWJvbCIsInUiLCJjIiwiaGFzT3duUHJvcGVydHkiLCJ0IiwiYSIsIl93cmFwcGVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIlZFUlNJT04iLCJ2IiwieSIsImQiLCJpdGVyYXRlZSIsImlkZW50aXR5IiwiaXNGdW5jdGlvbiIsImlzT2JqZWN0IiwibWF0Y2hlciIsInByb3BlcnR5IiwiZyIsIm1heCIsIm0iLCJiIiwieCIsInBvdyIsIkEiLCJlYWNoIiwiY29sbGVjdCIsIk8iLCJyZWR1Y2UiLCJmb2xkbCIsImluamVjdCIsInJlZHVjZVJpZ2h0IiwiZm9sZHIiLCJkZXRlY3QiLCJmaW5kS2V5Iiwic2VsZWN0IiwibmVnYXRlIiwiYW55IiwiaW5jbHVkZXMiLCJpbmNsdWRlIiwiaW52b2tlIiwicGx1Y2siLCJ3aGVyZSIsIm1pbiIsInNodWZmbGUiLCJzYW1wbGUiLCJyYW5kb20iLCJjbG9uZSIsInNvcnRCeSIsImNyaXRlcmlhIiwiZ3JvdXBCeSIsImluZGV4QnkiLCJjb3VudEJ5IiwiUyIsInRvQXJyYXkiLCJpc1N0cmluZyIsInNpemUiLCJwYXJ0aXRpb24iLCJmaXJzdCIsImhlYWQiLCJ0YWtlIiwiaW5pdGlhbCIsImxhc3QiLCJyZXN0IiwidGFpbCIsImRyb3AiLCJjb21wYWN0IiwiQm9vbGVhbiIsIk0iLCJpc0FyZ3VtZW50cyIsImZsYXR0ZW4iLCJ3aXRob3V0IiwiZGlmZmVyZW5jZSIsInVuaXEiLCJ1bmlxdWUiLCJpc0Jvb2xlYW4iLCJ1bmlvbiIsImludGVyc2VjdGlvbiIsInVuemlwIiwiemlwIiwiRiIsImZpbmRMYXN0SW5kZXgiLCJzb3J0ZWRJbmRleCIsIkUiLCJyYW5nZSIsImNlaWwiLCJjaHVuayIsIk4iLCJwYXJ0aWFsIiwicGxhY2Vob2xkZXIiLCJiaW5kQWxsIiwibWVtb2l6ZSIsImNhY2hlIiwiZGVsYXkiLCJkZWZlciIsInRocm90dGxlIiwibGVhZGluZyIsImNsZWFyVGltZW91dCIsInRyYWlsaW5nIiwiY2FuY2VsIiwiZGVib3VuY2UiLCJ3cmFwIiwiY29tcG9zZSIsInJlc3RBcmd1bWVudHMiLCJJIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJUIiwiQiIsImFsbEtleXMiLCJtYXBPYmplY3QiLCJwYWlycyIsImludmVydCIsImZ1bmN0aW9ucyIsIm1ldGhvZHMiLCJSIiwiZXh0ZW5kIiwiZXh0ZW5kT3duIiwiYXNzaWduIiwicSIsIksiLCJ6Iiwib21pdCIsImRlZmF1bHRzIiwidGFwIiwiaXNNYXRjaCIsInZhbHVlT2YiLCJwb3AiLCJpc0VxdWFsIiwiaXNFbXB0eSIsIkQiLCJjaGlsZE5vZGVzIiwiSW50OEFycmF5IiwiaXNGaW5pdGUiLCJpc1N5bWJvbCIsImlzTnVsbCIsImlzVW5kZWZpbmVkIiwiaGFzIiwibm9Db25mbGljdCIsImNvbnN0YW50IiwicHJvcGVydHlPZiIsInRpbWVzIiwiZ2V0VGltZSIsIkwiLCJQIiwiVyIsImVzY2FwZSIsInVuZXNjYXBlIiwiQyIsInVuaXF1ZUlkIiwidGVtcGxhdGVTZXR0aW5ncyIsImV2YWx1YXRlIiwiaW50ZXJwb2xhdGUiLCJKIiwiVSIsIlYiLCIkIiwidGVtcGxhdGUiLCJ2YXJpYWJsZSIsIkZ1bmN0aW9uIiwiY2hhaW4iLCJfY2hhaW4iLCJHIiwidG9KU09OIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0Rhc2giLCJnZXRTY3JpcHRQYXRoIiwic2NyaXB0TmFtZSIsInNjcmlwdHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInNyYyIsIkZ1bGxTY3JlZW5CdXR0b24iLCIkY29udGFpbmVyIiwiYXBpIiwiJHJvb3QiLCIkaWNvbkV4cGFuZCIsIiRpY29uQ29tcHJlc3MiLCJpc0Z1bGxTY3JlZW4iLCJmdWxsU2NyZWVuRXZlbnRUeXBlcyIsIm9uZnVsbHNjcmVlbmNoYW5nZSIsIm9ubW96ZnVsbHNjcmVlbmNoYW5nZSIsIm9ud2Via2l0ZnVsbHNjcmVlbmNoYW5nZSIsIk1TRnVsbHNjcmVlbkNoYW5nZSIsImZ1bGxTY3JlZW5DaGFuZ2VkQ2FsbGJhY2siLCJjaGVja0Z1bGxTY3JlZW4iLCJmdWxsc2NyZWVuRWxlbWVudCIsIndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IiwibW96RnVsbFNjcmVlbkVsZW1lbnQiLCJtc0Z1bGxzY3JlZW5FbGVtZW50IiwicmVxdWVzdEZ1bGxTY3JlZW4iLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwibW96UmVxdWVzdEZ1bGxTY3JlZW4iLCJtc1JlcXVlc3RGdWxsc2NyZWVuIiwiZXhpdEZ1bGxTY3JlZW4iLCJleGl0RnVsbHNjcmVlbiIsIndlYmtpdEV4aXRGdWxsc2NyZWVuIiwibW96Q2FuY2VsRnVsbFNjcmVlbiIsIm1zRXhpdEZ1bGxzY3JlZW4iLCJ0b2dnbGVGdWxsU2NyZWVuIiwib25SZW5kZXJlZCIsIiRjdXJyZW50IiwiZXZlbnROYW1lIiwib25EZXN0cm95ZWQiLCJDb250cm9scyIsInZvbHVtZUJ1dHRvbiIsInBsYXlCdXR0b24iLCJwcm9ncmVzc0JhciIsInRpbWVEaXNwbGF5IiwiZnVsbFNjcmVlbkJ1dHRvbiIsImdlbmVyYXRlTWFpblBhbmVsRGF0YSIsInBhbmVsIiwidGl0bGUiLCJpc01haW4iLCJJbmZpbml0eSIsImluaXRUaW1lRGlzcGxheSIsImluaXRQcm9ncmVzc0JhciIsInNldE1vdXNlRG93biIsIlNldHRpbmdQYW5lbExpc3QiLCJzZXR0aW5nUGFuZWwiLCJQbGF5QnV0dG9uIiwiJGljb25QbGF5IiwiJGljb25QYXVzZSIsIiRpY29uUmVwbGF5Iiwic2V0QnV0dG9uU3RhdGUiLCJuZXdzdGF0ZSIsImN1cnJlbnRTdGF0ZSIsIlByb2dyZXNzQmFyIiwiY3VycmVudFBsYXlpbmdQb3NpdGlvbiIsImN1cnJlbnRQbGF5aW5nUGVyY2VudGFnZSIsImN1cnJlbnRMb2FkZWRQZXJjZW50YWdlIiwibW91c2VJbnNpZGUiLCJtb3VzZURvd24iLCIkcHJvZ3Jlc3NCYXIiLCIkcHJvZ3Jlc3NMb2FkIiwiJHByb2dyZXNzUGxheSIsIiRwcm9ncmVzc0hvdmVyIiwiJGtub2JDb250YWluZXIiLCIka25vYiIsImtub2JXaWR0aCIsIiR0aW1lIiwicG9zaXRpb25FbGVtZW50cyIsInBlcmNlbnRhZ2UiLCJwcm9ncmVzc0JhcldpZHRoIiwia25vYlBvc3Rpb24iLCJkcmF3SG92ZXJQcm9ncmVzcyIsImhvdmVyUG9zaXRpb24iLCJkcmF3TG9hZFByb2dyZXNzIiwibG9hZFBvc2l0aW9uIiwiY2FsY3VsYXRlUGVyY2VudGFnZSIsInByb2dyZXNzQmFyT2Zmc2V0WCIsInBvaW50ZXJPZmZzZXRYIiwicGFnZVgiLCJkcmF3VGltZUluZGljYXRvciIsImhtcyIsInRpbWVFbGVtV2lkdGgiLCJwb3NpdGlvbk9mUGl4ZWwiLCJjYWxjdWxhdGVNYWduZXRpYyIsIm1hZ25ldGljUG9zaXRpb24iLCJidWZmZXJQZXJjZW50IiwiUExBWUVSX01JTl9IRUlHSFQiLCJTZXR0aW5nUGFuZWwiLCJleHRyYWN0UGFuZWxEYXRhIiwicGFuZWxUeXBlIiwicGxheUJhY2tSYXRlcyIsImN1cnJlbnRQbGF5YmFja1JhdGUiLCJpc0NoZWNrIiwicXVhbGl0eUxldmVscyIsInNldHRpbmdJdGVtVGVtcGxhdGUiLCJzZXR0aW5nVmFsdWVUZW1wbGF0ZSIsIlRpbWVEaXNwbGF5IiwiJHBvc2l0aW9uIiwiJGR1cmF0aW9uIiwiY29udmVydEh1bWFuaXplVGltZSIsInRpbWUiLCJWb2x1bWVCdXR0b24iLCIkc2xpZGVyQ29udGFpbmVyIiwiJHNsaWRlciIsIiRzbGlkZXJIYW5kbGUiLCIkc2xpZGVyVmFsdWUiLCIkdm9sdW1lSWNvbkJpZyIsIiR2b2x1bWVJY29uU21hbGwiLCIkdm9sdW1lSWNvbk11dGUiLCJzbGlkZXJXaWR0aCIsImhhbmRsZVdpZHRoIiwibWluUmFuZ2UiLCJtYXhSYW5nZSIsInNldFZvbHVtZUljb24iLCJzZXRWb2x1bWVVSSIsImhhbmRsZVBvc2l0aW9uIiwicmVsYXRpdmVYIiwiT3ZlblRlbXBsYXRlIiwidGVtcGxhdGVOYW1lIiwiaXNSb290IiwiJHRlbXBsYXRlIiwidmlld0V2ZW50cyIsImNyZWF0ZUFuZFNlbGVjdEVsZW1lbnQiLCJuZXdFbGVtZW50IiwiVGVtcGxhdGVzIiwiZXhwbG9kZWRUZXh0IiwiZXZlbnRTdHJpbmciLCIkdGFyZ2V0Iiwid3JhcHBlZEZ1bmMiLCJub2RlTGVuZ3RoIiwiVGV4dFZpZXdUZW1wbGF0ZSIsIlZpZXdUZW1wbGF0ZSIsIkhlbHBlclRlbXBsYXRlIiwiQmlnQnV0dG9uVGVtcGxhdGUiLCJNZXNzYWdlQm94VGVtcGxhdGUiLCJTcGlubmVyVGVtcGxhdGUiLCJDb250ZXh0UGFuZWxUZW1wbGF0ZSIsIkNvbnRyb2xzVGVtcGxhdGUiLCJWb2x1bWVCdXR0b25UZW1wbGF0ZSIsIlByb2dyZXNzQmFyVGVtcGxhdGUiLCJQbGF5QnV0dG9uVGVtcGxhdGUiLCJUaW1lRGlzcGxheVRlbXBsYXRlIiwiRnVsbFNjcmVlbkJ1dHRvblRlbXBsYXRlIiwiU2V0dGluZ1BhbmVsVGVtcGxhdGUiLCJCaWdCdXR0b24iLCJwbGF5ZXJTdGF0ZSIsIkNvbnRleHRQYW5lbCIsInBhbmVsV2lkdGgiLCJwYW5lbEhlaWdodCIsInBhZ2VZIiwib3BlbiIsIkhlbHBlciIsImJpZ0J1dHRvbiIsIm1lc3NhZ2VCb3giLCJzcGlubmVyIiwiY3JlYXRlQmlnQnV0dG9uIiwiY3JlYXRlTWVzc2FnZSIsIndpdGhUaW1lciIsIk1lc3NhZ2VCb3giLCJhdXRvRGVzdHJveVRpbWVyIiwiU3Bpbm5lciIsIiRzcGlubmVyIiwiaXNTaG93IiwiVmlldyIsImNvbnRyb2xzIiwiaGVscGVyIiwiJHBsYXllclJvb3QiLCJjb250ZXh0UGFuZWwiLCJhdXRvSGlkZVRpbWVyIiwic2V0SGlkZSIsImF1dG9IaWRlIiwidG9nZ2xlUGxheVBhdXNlIiwiaXNSZXdpbmQiLCJjdXJyZW50UG9zaXRpb24iLCJpc1VwIiwiY3VycmVudFZvbHVtbiIsIm5ld1ZvbHVtZSIsImNyZWF0ZUNvbnRleHRQYW5lbCIsImtleUNvZGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxpREFBeUMsa2pCQUFrakI7QUFDM2xCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQSx5Q0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUF3QixrQ0FBa0M7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RUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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dXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdH07XG5cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwib3ZlbnBsYXllclwiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe1wib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZlwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZlwiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1XCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1XCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknKTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL292ZW5wbGF5ZXIuanNcIik7XG4iLCJ2YXIgZXNjYXBlID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzXCIpO1xuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJAY2hhcnNldCBcXFwiVVRGLThcXFwiOy5vdnAtd3JhcHBlcntwb3NpdGlvbjpyZWxhdGl2ZTttYXgtaGVpZ2h0OjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3pvb206MSAhaW1wb3J0YW50O3dpZHRoOjEwMCU7ZGlzcGxheTpibG9jaztiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94O2NvbG9yOiNlZWU7Zm9udC1mYW1pbHk6J05vdG8gU2Fucycsc2Fucy1zZXJpZjtmb250LXNpemU6MTFweDtsaW5lLWhlaWdodDoxLjM7Zm9udC13ZWlnaHQ6bm9ybWFsO291dGxpbmU6MH0ub3ZwLXdyYXBwZXIgb2JqZWN0e3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Lm92cC13cmFwcGVyOmJlZm9yZSwub3ZwLXdyYXBwZXI6YWZ0ZXJ7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94fS5vdnAtd3JhcHBlciAqLC5vdnAtd3JhcHBlciAqOmJlZm9yZSwub3ZwLXdyYXBwZXIgKjphZnRlcnstbW96LWJveC1zaXppbmc6Ym9yZGVyLWJveDstd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm92cC13cmFwcGVyLm92cC1mdWxsc2NyZWVue2hlaWdodDoxMDAlICFpbXBvcnRhbnR9Lm92cC13cmFwcGVyLm92cC1hdXRvaGlkZXtjdXJzb3I6bm9uZX0ub3ZwLXdyYXBwZXIub3ZwLWF1dG9oaWRlIC5vdnAtZ3JhZGllbnQtdG9wLC5vdnAtd3JhcHBlci5vdnAtYXV0b2hpZGUgLm92cC1ncmFkaWVudC1ib3R0b20sLm92cC13cmFwcGVyLm92cC1hdXRvaGlkZSAub3ZwLWJvdHRvbS1wYW5lbHtvcGFjaXR5OjB9Lm92cC13cmFwcGVyLm92cC1hdXRvaGlkZSAub3ZwLXByb2dyZXNzYmFyLWNvbnRhaW5lciwub3ZwLXdyYXBwZXIub3ZwLWF1dG9oaWRlIC5vdnAtY29udHJvbHMgLm92cC1idXR0b257Y3Vyc29yOm5vbmV9Lm92cC13cmFwcGVyLm92cC1hdXRvaGlkZSAub3ZwLWNhcHRpb24tdGV4dC1jb250YWluZXJ7Ym90dG9tOjI1cHh9Lm92cC13cmFwcGVyIC5vdnAtcmF0aW97cGFkZGluZy1ib3R0b206NTYuMjUlfS5vdnAtcGxheWVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO3dpZHRoOjEwMCV9Lm92cC1wbGF5ZXIgLm92cC1tZWRpYS1lbGVtZW50LWNvbnRhaW5lcntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9Lm92cC1wbGF5ZXIgLm92cC1tZWRpYS1lbGVtZW50LWNvbnRhaW5lcj4qe3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Lm92cC1wbGF5ZXIgLm92cC11aXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5vdnAtYnV0dG9ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO2JvcmRlcjpub25lO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7cGFkZGluZzowO2NvbG9yOmluaGVyaXQ7dGV4dC1hbGlnbjppbmhlcml0O292ZXJmbG93OmhpZGRlbjtmb250LXdlaWdodDoxMDB9Lm92cC1idXR0b246Zm9jdXMsLm92cC1idXR0b257b3V0bGluZTowfS5vdnAtZ3JhZGllbnQtdG9wLC5vdnAtZ3JhZGllbnQtYm90dG9te3dpZHRoOjEwMCU7cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1jb2xvcjojMTIxMjFjO3BvaW50ZXItZXZlbnRzOm5vbmU7b3BhY2l0eTouMzstbW96LXRyYW5zaXRpb246b3BhY2l0eSAuMjVzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpO3RyYW5zaXRpb246b3BhY2l0eSAuMjVzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSl9Lm92cC1ncmFkaWVudC1ib3R0b217aGVpZ2h0OjUwcHg7Ym90dG9tOjA7ei1pbmRleDoyMn0ub3ZwLXNwaW5uZXItY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2Rpc3BsYXk6bm9uZX0ub3ZwLXNwaW5uZXItY29udGFpbmVyIC5vdnAtc3Bpbm5lcnt3aWR0aDo3MHB4O2hlaWdodDoxOHB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7bWFyZ2luLXRvcDotOXB4O21hcmdpbi1sZWZ0Oi0zNXB4O3RleHQtYWxpZ246Y2VudGVyfS5vdnAtc3Bpbm5lci1jb250YWluZXIgLm92cC1zcGlubmVyPmRpdnt3aWR0aDoxOHB4O2hlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6IzUwZTNjMjtib3JkZXItcmFkaXVzOjEwMCU7ZGlzcGxheTppbmxpbmUtYmxvY2s7LXdlYmtpdC1hbmltYXRpb246c2stYm91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO2FuaW1hdGlvbjpzay1ib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0IGJvdGh9Lm92cC1zcGlubmVyLWNvbnRhaW5lciAub3ZwLXNwaW5uZXIgLmJvdW5jZTF7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LTAuMzJzO2FuaW1hdGlvbi1kZWxheTotMC4zMnN9Lm92cC1zcGlubmVyLWNvbnRhaW5lciAub3ZwLXNwaW5uZXIgLmJvdW5jZTJ7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LTAuMTZzO2FuaW1hdGlvbi1kZWxheTotMC4xNnN9QC13ZWJraXQta2V5ZnJhbWVzIHNrLWJvdW5jZWRlbGF5ezAlLDgwJSwxMDAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApfTQwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxKX19QGtleWZyYW1lcyBzay1ib3VuY2VkZWxheXswJSw4MCUsMTAwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCl9NDAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX19Lm92cC1tZXNzYWdlLWJveHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0ub3ZwLW1lc3NhZ2UtYm94IC5vdnAtbWVzc2FnZS1jb250YWluZXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOjYwcHg7d2lkdGg6MTAwJTtwYWRkaW5nOjAgMTJweDt0ZXh0LWFsaWduOmNlbnRlcn0ub3ZwLW1lc3NhZ2UtYm94IC5vdnAtbWVzc2FnZS1jb250YWluZXIgLm92cC1tZXNzYWdlLXRleHR7Zm9udC1zaXplOjE0MCU7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLDAuNSk7Y29sb3I6I2ZmZjtwYWRkaW5nOi4xZW0gLjNlbTt3b3JkLXdyYXA6YnJlYWstd29yZDtsaW5lLWhlaWdodDoxLjVlbX0ub3ZwLWJpZ2J1dHRvbi1jb250YWluZXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Lm92cC1iaWdidXR0b24tY29udGFpbmVyIC5vdnAtYmlnYnV0dG9ue3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7d2lkdGg6ODBweDtoZWlnaHQ6ODBweDttYXJnaW4tdG9wOi00MHB4O21hcmdpbi1sZWZ0Oi00MHB4O3RleHQtYWxpZ246Y2VudGVyfS5vdnAtYmlnYnV0dG9uLWNvbnRhaW5lciAub3ZwLWJpZ2J1dHRvbi5vdnAtYmlnYnV0dG9uLXBsYXl7YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXBsYXktbGFyZ2Uuc3ZnXCIpKSArIFwiKTtiYWNrZ3JvdW5kLXNpemU6MTAwJX0ub3ZwLWJpZ2J1dHRvbi1jb250YWluZXIgLm92cC1iaWdidXR0b24ub3ZwLWJpZ2J1dHRvbi1wYXVzZXtiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItc3RvcC1sYXJnZS5zdmdcIikpICsgXCIpO2JhY2tncm91bmQtc2l6ZToxMDAlfS5vdnAtYmlnYnV0dG9uLWNvbnRhaW5lciAub3ZwLWJpZ2J1dHRvbi5vdnAtYmlnYnV0dG9uLXJlcGxheXtiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItcmUtbGFyZ2Uuc3ZnXCIpKSArIFwiKTtiYWNrZ3JvdW5kLXNpemU6MTAwJX0ub3ZwLXNldHRpbmctcGFuZWx7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjU1cHg7cmlnaHQ6MTJweDtvdmVyZmxvdy15OmF1dG87d2lkdGg6MjYwcHg7Zm9udC1zaXplOjEyMCU7dXNlci1zZWxlY3Q6bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjgsMjgsMjgsMC45KTt0ZXh0LXNoYWRvdzowIDAgMnB4IHJnYmEoMCwwLDAsMC41KX0ub3ZwLXNldHRpbmctcGFuZWwgLm92cC1zZXR0aW5nLXRpdGxlLC5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbXt3aWR0aDoxMDAlO2hlaWdodDozOHB4O2xpbmUtaGVpZ2h0OjM4cHg7Y29sb3I6I2VlZTtjdXJzb3I6cG9pbnRlcjtvdXRsaW5lOm5vbmV9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy10aXRsZS1jb250YWluZXIgLm92cC1zZXR0aW5nLXRpdGxlIC5vdnAtc2V0dGluZy10aXRsZS10aXRsZXtwYWRkaW5nLWxlZnQ6MTJweH0ub3ZwLXNldHRpbmctcGFuZWwgLm92cC1zZXR0aW5nLXRpdGxlLWNvbnRhaW5lciAub3ZwLXNldHRpbmctdGl0bGUgLm92cC1zZXR0aW5nLXRpdGxlLXByZXZpY29ue3BhZGRpbmc6MCAwIDAgMTJweDttYXJnaW4tcmlnaHQ6LTZweH0ub3ZwLXNldHRpbmctcGFuZWwgLm92cC1zZXR0aW5nLWl0ZW0tY29udGFpbmVyIC5vdnAtc2V0dGluZy1pdGVtOmhvdmVye2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwwLjEpfS5vdnAtc2V0dGluZy1wYW5lbCAub3ZwLXNldHRpbmctaXRlbS1jb250YWluZXIgLm92cC1zZXR0aW5nLWl0ZW0gLm92cC1zZXR0aW5nLWl0ZW0tdGl0bGV7cGFkZGluZy1sZWZ0OjEycHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lciAub3ZwLXNldHRpbmctaXRlbSAub3ZwLXNldHRpbmctaXRlbS1uZXh0aWNvbntmbG9hdDpyaWdodDtwYWRkaW5nLXJpZ2h0OjEycHg7bWFyZ2luLWxlZnQ6LTZweH0ub3ZwLXNldHRpbmctcGFuZWwgLm92cC1zZXR0aW5nLWl0ZW0tY29udGFpbmVyIC5vdnAtc2V0dGluZy1pdGVtIHNwYW4ub3ZwLXNldHRpbmctaXRlbS12YWx1ZXtmbG9hdDpyaWdodDtwYWRkaW5nLXJpZ2h0OjEycHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lciAub3ZwLXNldHRpbmctaXRlbS5vdnAtc2V0dGluZy1pdGVtLXZhbHVlIC5vdnAtc2V0dGluZy1pdGVtLXRpdGxle21hcmdpbi1sZWZ0Oi02cHh9Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lciAub3ZwLXNldHRpbmctaXRlbS5vdnAtc2V0dGluZy1pdGVtLXZhbHVlIC5vdnAtc2V0dGluZy1pdGVtLWNoZWNrZWR7cGFkZGluZy1sZWZ0OjEycHg7dmlzaWJpbGl0eTpoaWRkZW59Lm92cC1zZXR0aW5nLXBhbmVsIC5vdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lciAub3ZwLXNldHRpbmctaXRlbS5vdnAtc2V0dGluZy1pdGVtLXZhbHVlIC5vdnAtc2V0dGluZy1pdGVtLWNoZWNrZWQub3ZwLXNob3d7dmlzaWJpbGl0eTp2aXNpYmxlfS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVse3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MHB4O3JpZ2h0OjBweDtib3R0b206MHB4O2hlaWdodDo1MHB4O3otaW5kZXg6NjA7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTt0cmFuc2l0aW9uOm9wYWNpdHkgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpfS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtcHJvZ3Jlc3NiYXItY29udGFpbmVye2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtib3R0b206NTBweDtoZWlnaHQ6NHB4O2N1cnNvcjpwb2ludGVyfS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtcHJvZ3Jlc3NiYXItY29udGFpbmVyIC5vdnAtcHJvZ3Jlc3NiYXItcGFkZGluZ3twb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlO2hlaWdodDoxNnB4O2JvdHRvbTowO3otaW5kZXg6Mjh9Lm92cC1jb250cm9scy1jb250YWluZXIgLm92cC1ib3R0b20tcGFuZWwgLm92cC1jb250cm9sc3twb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MDt3aWR0aDoxMDAlO2hlaWdodDo1MHB4O3RleHQtYWxpZ246bGVmdH0ub3ZwLWNvbnRyb2xzLWNvbnRhaW5lciAub3ZwLWJvdHRvbS1wYW5lbCAub3ZwLWNvbnRyb2xzIC5vdnAtYnV0dG9ue21pbi13aWR0aDozMHB4O2hlaWdodDozMHB4O2N1cnNvcjpwb2ludGVyfS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtY29udHJvbHMgLm92cC1sZWZ0LWNvbnRyb2xze2Zsb2F0OmxlZnQ7aGVpZ2h0OjEwMCV9Lm92cC1jb250cm9scy1jb250YWluZXIgLm92cC1ib3R0b20tcGFuZWwgLm92cC1jb250cm9scyAub3ZwLXJpZ2h0LWNvbnRyb2xze2Zsb2F0OnJpZ2h0O2hlaWdodDoxMDAlfS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtY29udHJvbHMgLm92cC1yaWdodC1jb250cm9scyAub3ZwLXNldHRpbmctYnV0dG9ue3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxMHB4O21hcmdpbi1yaWdodDoxMnB4fS5vdnAtY29udHJvbHMtY29udGFpbmVyIC5vdnAtYm90dG9tLXBhbmVsIC5vdnAtY29udHJvbHMgLm92cC1yaWdodC1jb250cm9scyAub3ZwLXNldHRpbmctYnV0dG9uPml7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLXNpemU6MTAwJTtiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItc2V0dGluZy5zdmdcIikpICsgXCIpfS5vdnAtcHJvZ3Jlc3NiYXJ7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7ei1pbmRleDozMTtvdXRsaW5lOm5vbmV9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXBsYXktYmFja2dyb3VuZC1jb2xvcntiYWNrZ3JvdW5kLWNvbG9yOiM1MGUzYzJ9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzLWxpc3R7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LDAuMik7ei1pbmRleDozOX0ub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3MtbGlzdCAub3ZwLWxvYWQtcHJvZ3Jlc3MsLm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzLWxpc3QgLm92cC1wbGF5LXByb2dyZXNzLC5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzcy1saXN0IC5vdnAtaG92ZXItcHJvZ3Jlc3N7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO2JvdHRvbTowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7LW1vei10cmFuc2Zvcm0tb3JpZ2luOjAgMDstbXMtdHJhbnNmb3JtLW9yaWdpbjowIDA7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjAgMDt0cmFuc2Zvcm0tb3JpZ2luOjAgMH0ub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3MtbGlzdCAub3ZwLXBsYXktcHJvZ3Jlc3N7d2lkdGg6MDt6LWluZGV4OjM0Oy13ZWJraXQtdHJhbnNpdGlvbjp3aWR0aCAuMXMgZWFzZTt0cmFuc2l0aW9uOndpZHRoIC4xcyBlYXNlfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzcy1saXN0IC5vdnAtbG9hZC1wcm9ncmVzc3t3aWR0aDowO3otaW5kZXg6MzM7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LDAuNSk7LXdlYmtpdC10cmFuc2l0aW9uOndpZHRoIC41cyBlYXNlO3RyYW5zaXRpb246d2lkdGggLjVzIGVhc2V9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzLWxpc3QgLm92cC1ob3Zlci1wcm9ncmVzc3tsZWZ0OjA7d2lkdGg6MDt6LWluZGV4OjM1O2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwwLjYpfS5vdnAtcHJvZ3Jlc3NiYXIgLm92cC1wcm9ncmVzc2Jhci1rbm9iLWNvbnRhaW5lcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTVweDtsZWZ0OjBweDt6LWluZGV4OjQzOy1tb3otdHJhbnNpdGlvbjotbW96LXRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKTstd2Via2l0LXRyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjFzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7LW1zLXRyYW5zaXRpb246LW1zLXRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKTstbW96LXRyYW5zZm9ybTpzY2FsZSgwKTstbXMtdHJhbnNmb3JtOnNjYWxlKDApOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX0ub3ZwLXByb2dyZXNzYmFyIC5vdnAtcHJvZ3Jlc3NiYXIta25vYi1jb250YWluZXIgLm92cC1wcm9ncmVzc2Jhci1rbm9ie3dpZHRoOjE0cHg7aGVpZ2h0OjE0cHg7Ym9yZGVyLXJhZGl1czo3cHg7LXdlYmtpdC10cmFuc2l0aW9uOndpZHRoIC4xcyBlYXNlO3RyYW5zaXRpb246d2lkdGggLjFzIGVhc2V9Lm92cC1wcm9ncmVzc2JhciAub3ZwLXByb2dyZXNzYmFyLXRpbWV7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbToxNXB4O2xlZnQ6YXV0bzt3aWR0aDphdXRvO2JhY2tncm91bmQtY29sb3I6cmdiYSgyOCwyOCwyOCwwLjkpO2JvcmRlci1yYWRpdXM6MnB4O3BhZGRpbmc6NXB4IDlweDtmb250LXNpemU6MTE4JTtsaW5lLWhlaWdodDoxNXB4O3VzZXItc2VsZWN0Om5vbmV9Lm92cC1wcm9ncmVzc2Jhci1ob3ZlciAub3ZwLXByb2dyZXNzYmFyLWtub2ItY29udGFpbmVyey1tb3otdHJhbnNmb3JtOm5vbmU7LW1zLXRyYW5zZm9ybTpub25lOy13ZWJraXQtdHJhbnNmb3JtOm5vbmU7dHJhbnNmb3JtOm5vbmU7LW1vei10cmFuc2l0aW9uOi1tb3otdHJhbnNmb3JtIC4xcyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpOy13ZWJraXQtdHJhbnNpdGlvbjotd2Via2l0LXRyYW5zZm9ybSAuMXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTstbXMtdHJhbnNpdGlvbjotbXMtdHJhbnNmb3JtIC4xcyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpO3RyYW5zaXRpb246dHJhbnNmb3JtIC4xcyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpfS5vdnAtcHJvZ3Jlc3NiYXItaG92ZXIgLm92cC1wcm9ncmVzc2Jhci10aW1le2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5vdnAtb24tZXJyb3IgLm92cC1wcm9ncmVzc2Jhci10aW1le2Rpc3BsYXk6bm9uZX0ub3ZwLXBsYXktYnV0dG9ue3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxMHB4O21hcmdpbi1sZWZ0OjE1cHh9Lm92cC1wbGF5LWJ1dHRvbj5pe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1zaXplOjEwMCV9Lm92cC1wbGF5LWJ1dHRvbiAub3ZwLXBsYXktYnV0dG9uLXBsYXlpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1wbGF5LnN2Z1wiKSkgKyBcIil9Lm92cC1wbGF5LWJ1dHRvbiAub3ZwLXBsYXktYnV0dG9uLXBhdXNlaWNvbntiYWNrZ3JvdW5kOnVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vYXNzZXRzL2ltYWdlcy9pYy1wbGF5ZXItc3RvcC5zdmdcIikpICsgXCIpfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmU7dG9wOjEwcHg7bWFyZ2luLWxlZnQ6MTJweDtoZWlnaHQ6MzBweH0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLWJ1dHRvbj5pe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1zaXplOjEwMCV9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1idXR0b24gLm92cC12b2x1bWUtYnV0dG9uLWJpZ2ljb257YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXZvbHVtZS5zdmdcIikpICsgXCIpfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtYnV0dG9uIC5vdnAtdm9sdW1lLWJ1dHRvbi1zbWFsbGljb257YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLXZvbHVtZS0yLnN2Z1wiKSkgKyBcIil9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1idXR0b24gLm92cC12b2x1bWUtYnV0dG9uLW11dGVpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci12b2x1bWUtbXV0ZS5zdmdcIikpICsgXCIpfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lcntkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDowcHg7aGVpZ2h0OjEwMCU7b3ZlcmZsb3c6aGlkZGVuO2N1cnNvcjpwb2ludGVyO3VzZXItc2VsZWN0Om5vbmU7b3V0bGluZTpub25lOy1tb3otdHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSksd2lkdGggLjJzIGN1YmljLWJlemllciguNCwgMCwgMSwgMSk7LXdlYmtpdC10cmFuc2l0aW9uOm1hcmdpbiAuMnMgY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKSx3aWR0aCAuMnMgY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKTt0cmFuc2l0aW9uOm1hcmdpbiAuMnMgY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKSx3aWR0aCAuMnMgY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKX0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIuYWN0aXZle3dpZHRoOjcwcHg7bWFyZ2luLWxlZnQ6OHB4O21hcmdpbi1yaWdodDowOy1tb3otdHJhbnNpdGlvbjptYXJnaW4gLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSksd2lkdGggLjJzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7LXdlYmtpdC10cmFuc2l0aW9uOm1hcmdpbiAuMnMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKSx3aWR0aCAuMnMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTt0cmFuc2l0aW9uOm1hcmdpbiAuMnMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKSx3aWR0aCAuMnMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKX0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVye2hlaWdodDoxMDAlO3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci1iZywub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci12YWx1ZXtwb3NpdGlvbjphYnNvbHV0ZTtkaXNwbGF5OmJsb2NrO2xlZnQ6MDt0b3A6NTAlO2hlaWdodDo0cHg7bWFyZ2luLXRvcDotMnB4O2JvcmRlci1yYWRpdXM6MTBweH0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci1iZ3t3aWR0aDoxMDAlO2JhY2tncm91bmQ6I2ZmZn0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci12YWx1ZXt3aWR0aDoxMDAlO2JhY2tncm91bmQ6IzUwZTNjMn0ub3ZwLXZvbHVtZS1jb250cm9sbGVyIC5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXIgLm92cC12b2x1bWUtc2lsZGVyIC5vdnAtdm9sdW1lLXNsaWRlci1oYW5kbGV7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjMwcHg7d2lkdGg6MTJweDtoZWlnaHQ6MTJweDtib3JkZXItcmFkaXVzOjZweDttYXJnaW4tdG9wOi02cHg7YmFja2dyb3VuZDojZmZmfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lciAub3ZwLXZvbHVtZS1zaWxkZXIgLm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZTpiZWZvcmUsLm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItaGFuZGxlOmFmdGVye2NvbnRlbnQ6Jyc7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpub25lO3RvcDo1MCU7aGVpZ2h0OjRweDttYXJnaW4tdG9wOi0ycHg7d2lkdGg6ODBweDt6LWluZGV4Oi0xfS5vdnAtdm9sdW1lLWNvbnRyb2xsZXIgLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lciAub3ZwLXZvbHVtZS1zaWxkZXIgLm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZTpiZWZvcmV7bGVmdDotNThweDtiYWNrZ3JvdW5kOiM1MGUzYzJ9Lm92cC12b2x1bWUtY29udHJvbGxlciAub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyIC5vdnAtdm9sdW1lLXNpbGRlciAub3ZwLXZvbHVtZS1zbGlkZXItaGFuZGxlOmFmdGVye2xlZnQ6NnB4O2JhY2tncm91bmQ6I2ZmZn0ub3ZwLXRpbWUtZGlzcGxheXtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MTBweDttYXJnaW4tbGVmdDoxMnB4O2hlaWdodDozMHB4O3doaXRlLXNwYWNlOm5vd3JhcDtsaW5lLWhlaWdodDozMHB4O3ZlcnRpY2FsLWFsaWduOnRvcDtmb250LXNpemU6MTRweDt1c2VyLXNlbGVjdDpub25lfS5vdnAtdGltZS1kaXNwbGF5IC5vdnAtdGltZS1jdXJyZW50LC5vdnAtdGltZS1kaXNwbGF5IC5vdnAtdGltZS1zZXBhcmF0b3IsLm92cC10aW1lLWRpc3BsYXkgLm92cC10aW1lLWR1cmF0aW9ue2NvbG9yOiNmZmZ9Lm92cC10aW1lLWRpc3BsYXkgLm92cC1saXZlLWJhZGdle29wYWNpdHk6MTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDphdXRvO2ZvbnQtc2l6ZToxNHB4fS5vdnAtdGltZS1kaXNwbGF5IC5vdnAtbGl2ZS1iYWRnZTpiZWZvcmV7YmFja2dyb3VuZDojZmYwMDAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotMnB4O3dpZHRoOjZweDtoZWlnaHQ6NnB4O21hcmdpbi1yaWdodDo1cHg7Y29udGVudDonJztib3JkZXItcmFkaXVzOjZweH0ub3ZwLXRpbWUtZGlzcGxheSAub3ZwLWxpdmUtYmFkZ2UgLm92cC1saXZlLWJhZGdlLWxvd2xhdGVuY3l7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLXJpZ2h0OjVweH0ub3ZwLWNvbnRleHQtcGFuZWx7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94O2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7b3ZlcmZsb3c6aGlkZGVuO3dpZHRoOjIwMHB4O3BhZGRpbmc6NnB4IDA7YmFja2dyb3VuZDpyZ2JhKDI4LDI4LDI4LDAuOSk7dGV4dC1zaGFkb3c6MCAwIDJweCByZ2JhKDAsMCwwLDAuNSk7ei1pbmRleDoyMzAwO2ZvbnQtZmFtaWx5OlJvYm90byxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZjtmb250LXNpemU6MTFweDtmb250LXdlaWdodDoxMDA7dXNlci1zZWxlY3Q6bm9uZX0ub3ZwLWNvbnRleHQtcGFuZWw6YmVmb3JlLC5vdnAtY29udGV4dC1wYW5lbDphZnRlcnstbW96LWJveC1zaXppbmc6Ym9yZGVyLWJveDstd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm92cC1jb250ZXh0LXBhbmVsICosLm92cC1jb250ZXh0LXBhbmVsICo6YmVmb3JlLC5vdnAtY29udGV4dC1wYW5lbCAqOmFmdGVyey1tb3otYm94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ub3ZwLWNvbnRleHQtcGFuZWwgLm92cC1jb250ZXh0LWl0ZW17d2lkdGg6MTAwJTtoZWlnaHQ6MzhweDtwYWRkaW5nLWxlZnQ6MTJweDtsaW5lLWhlaWdodDozOHB4O2NvbG9yOiNlZWU7Y3Vyc29yOnBvaW50ZXI7b3V0bGluZTpub25lO2ZvbnQtc2l6ZToxMjAlfS5vdnAtY29udGV4dC1wYW5lbCAub3ZwLWNvbnRleHQtaXRlbTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsMC4xKX0ub3ZwLWZ1bGxzY3JlZW4tYnV0dG9ue3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxMHB4O21hcmdpbi1yaWdodDoxNXB4fS5vdnAtZnVsbHNjcmVlbi1idXR0b24+aXtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JhY2tncm91bmQtc2l6ZToxMDAlfS5vdnAtZnVsbHNjcmVlbi1idXR0b24gLm92cC1mdWxsc2NyZWVuLWJ1dHRvbi1leHBhbmRpY29ue2JhY2tncm91bmQ6dXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9hc3NldHMvaW1hZ2VzL2ljLXBsYXllci1mdWxsc2NyZWVuLWV4cGFuZC5zdmdcIikpICsgXCIpfS5vdnAtZnVsbHNjcmVlbi1idXR0b24gLm92cC1mdWxsc2NyZWVuLWJ1dHRvbi1jb21wcmVzc2ljb257YmFja2dyb3VuZDp1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2Fzc2V0cy9pbWFnZXMvaWMtcGxheWVyLWZ1bGxzY3JlZW4tY29tcHJlc3Muc3ZnXCIpKSArIFwiKX1Aa2V5ZnJhbWVzIGZhZGV7ZnJvbXtvcGFjaXR5Oi4zfTU1JXtvcGFjaXR5OjF9NzUle29wYWNpdHk6MX10b3tvcGFjaXR5Oi4zfX1ALXdlYmtpdC1rZXlmcmFtZXMgc2hha2V7ZnJvbSx0b3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLCAwLCAwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwgMCwgMCl9MTAlLDMwJSw1MCUsNzAlLDkwJXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKC0xMHB4LCAwLCAwKX0yMCUsNDAlLDYwJSw4MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTBweCwgMCwgMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwcHgsIDAsIDApfX1Aa2V5ZnJhbWVzIHNoYWtle2Zyb20sdG97LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwgMCwgMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsIDAsIDApfTEwJSwzMCUsNTAlLDcwJSw5MCV7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCl9MjAlLDQwJSw2MCUsODAley13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwcHgsIDAsIDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKX19Lm92cC1wbGF5ZXIgLnNoYWtley13ZWJraXQtYW5pbWF0aW9uLW5hbWU6c2hha2U7YW5pbWF0aW9uLW5hbWU6c2hha2V9QC13ZWJraXQta2V5ZnJhbWVzIGJvdW5jZUlue2Zyb20sMjAlLDQwJSw2MCUsODAlLHRvey13ZWJraXQtYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoLjIxNSwgLjYxLCAuMzU1LCAxKTthbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOmN1YmljLWJlemllciguMjE1LCAuNjEsIC4zNTUsIDEpfTAle29wYWNpdHk6MDstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKC41LCAuNSwgLjUpO3RyYW5zZm9ybTpzY2FsZTNkKC41LCAuNSwgLjUpfTIwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKDEuMSwgMS4xLCAxLjEpO3RyYW5zZm9ybTpzY2FsZTNkKDEuMSwgMS4xLCAxLjEpfTQwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZTNkKC45LCAuOSwgLjkpO3RyYW5zZm9ybTpzY2FsZTNkKC45LCAuOSwgLjkpfTYwJXtvcGFjaXR5OjE7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCgxLjAzLCAxLjAzLCAxLjAzKTt0cmFuc2Zvcm06c2NhbGUzZCgxLjAzLCAxLjAzLCAxLjAzKX04MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCguOTcsIC45NywgLjk3KTt0cmFuc2Zvcm06c2NhbGUzZCguOTcsIC45NywgLjk3KX10b3tvcGFjaXR5OjE7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCgxLCAxLCAxKTt0cmFuc2Zvcm06c2NhbGUzZCgxLCAxLCAxKX19QGtleWZyYW1lcyBib3VuY2VJbntmcm9tLDIwJSw0MCUsNjAlLDgwJSx0b3std2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246Y3ViaWMtYmV6aWVyKC4yMTUsIC42MSwgLjM1NSwgMSk7YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoLjIxNSwgLjYxLCAuMzU1LCAxKX0wJXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCguMywgLjMsIC4zKTt0cmFuc2Zvcm06c2NhbGUzZCguMywgLjMsIC4zKX0yMCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCgxLjEsIDEuMSwgMS4xKTt0cmFuc2Zvcm06c2NhbGUzZCgxLjEsIDEuMSwgMS4xKX00MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUzZCguOSwgLjksIC45KTt0cmFuc2Zvcm06c2NhbGUzZCguOSwgLjksIC45KX02MCV7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoMS4wMywgMS4wMywgMS4wMyk7dHJhbnNmb3JtOnNjYWxlM2QoMS4wMywgMS4wMywgMS4wMyl9ODAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoLjk3LCAuOTcsIC45Nyk7dHJhbnNmb3JtOnNjYWxlM2QoLjk3LCAuOTcsIC45Nyl9dG97b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlM2QoMSwgMSwgMSk7dHJhbnNmb3JtOnNjYWxlM2QoMSwgMSwgMSl9fS5vdnAtcGxheWVyIC5ib3VuY2VJbnstd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjouNzVzO2FuaW1hdGlvbi1kdXJhdGlvbjouNzVzOy13ZWJraXQtYW5pbWF0aW9uLW5hbWU6Ym91bmNlSW47YW5pbWF0aW9uLW5hbWU6Ym91bmNlSW59QC13ZWJraXQta2V5ZnJhbWVzIGZhZGVJbntmcm9te29wYWNpdHk6MH10b3tvcGFjaXR5OjF9fUBrZXlmcmFtZXMgZmFkZUlue2Zyb217b3BhY2l0eTowfXRve29wYWNpdHk6MX19Lm92cC1wbGF5ZXIgLmZhZGVJbnstd2Via2l0LWFuaW1hdGlvbi1uYW1lOmZhZGVJbjthbmltYXRpb24tbmFtZTpmYWRlSW59Lm92cC1wbGF5ZXIgLmFuaW1hdGVkey13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOjFzO2FuaW1hdGlvbi1kdXJhdGlvbjoxczstd2Via2l0LWFuaW1hdGlvbi1maWxsLW1vZGU6Ym90aDthbmltYXRpb24tZmlsbC1tb2RlOmJvdGh9QG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uKXsub3ZwLXBsYXllciAuYW5pbWF0ZWR7LXdlYmtpdC1hbmltYXRpb246dW5zZXQgIWltcG9ydGFudDthbmltYXRpb246dW5zZXQgIWltcG9ydGFudDstd2Via2l0LXRyYW5zaXRpb246bm9uZSAhaW1wb3J0YW50O3RyYW5zaXRpb246bm9uZSAhaW1wb3J0YW50fX0ub3ZwLWNhcHRpb24tdmlld2Vye3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5vdnAtY2FwdGlvbi12aWV3ZXIgLm92cC1jYXB0aW9uLXRleHQtY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTo2MHB4O3dpZHRoOjEwMCU7cGFkZGluZzowIDEycHg7dGV4dC1hbGlnbjpjZW50ZXI7LW1vei10cmFuc2l0aW9uOmJvdHRvbSAuMjVzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7LXdlYmtpdC10cmFuc2l0aW9uOmJvdHRvbSAuMjVzIGN1YmljLWJlemllcigwLCAwLCAuMiwgMSk7dHJhbnNpdGlvbjpib3R0b20gLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpfS5vdnAtY2FwdGlvbi12aWV3ZXIgLm92cC1jYXB0aW9uLXRleHQtY29udGFpbmVyIC5vdnAtY2FwdGlvbi10ZXh0e2Rpc3BsYXk6bm9uZTtmb250LXNpemU6MjIwJTtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoOCw4LDgsMC43NSk7Ym9yZGVyLXJhZGl1czozcHg7Y29sb3I6I2ZmZjtwYWRkaW5nOi4xZW0gLjNlbTt3b3JkLXdyYXA6YnJlYWstd29yZDtsaW5lLWhlaWdodDoxLjVlbTt1c2VyLXNlbGVjdDpub25lfS5vdnAtY2FwdGlvbi1idXR0b257d2lkdGg6MzZweH0ub3ZwLWNhcHRpb24tYnV0dG9uPml7Zm9udC1zaXplOjE4cHg7LW1vei10cmFuc2l0aW9uOmNvbG9yIC4yNXMgY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKTstd2Via2l0LXRyYW5zaXRpb246Y29sb3IgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpO3RyYW5zaXRpb246Y29sb3IgLjI1cyBjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpfS5vdnAtY2FwdGlvbi1hY3RpdmUgLm92cC1jYXB0aW9uLWJ1dHRvbj5pe2NvbG9yOiNGMzY0NDZ9XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlc2NhcGUodXJsKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB1cmxcbiAgICB9XG4gICAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gICAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gICAgfVxuICAgIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICAgIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSkge1xuICAgICAgICByZXR1cm4gJ1wiJyArIHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpICsgJ1wiJ1xuICAgIH1cblxuICAgIHJldHVybiB1cmxcbn1cbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCIvKiBnbG9iYWxzIF9fd2VicGFja19hbWRfb3B0aW9uc19fICovXHJcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l6TUNJZ2FHVnBaMmgwUFNJek1DSWdkbWxsZDBKdmVEMGlNQ0F3SURNd0lETXdJajRLSUNBZ0lEeG5JR1pwYkd3OUltNXZibVVpSUdacGJHd3RjblZzWlQwaVpYWmxibTlrWkNJZ2MzUnliMnRsUFNJalJrWkdJaUJ6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlITjBjbTlyWlMxc2FXNWxhbTlwYmowaWNtOTFibVFpSUhOMGNtOXJaUzEzYVdSMGFEMGlNaUkrQ2lBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRjZ01UZG9OblkyVFRJeklERXphQzAyVmpkTk1UY2dNVE5zTnkwM1RUWWdNalJzTnkwM0lpOCtDaUFnSUNBOEwyYytDand2YzNablBnbz1cIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXpNQ0lnYUdWcFoyaDBQU0l6TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRE13SURNd0lqNEtJQ0FnSUR4bklHWnBiR3c5SW01dmJtVWlJR1pwYkd3dGNuVnNaVDBpWlhabGJtOWtaQ0lnYzNSeWIydGxQU0lqUmtaR0lpQnpkSEp2YTJVdGJHbHVaV05oY0QwaWNtOTFibVFpSUhOMGNtOXJaUzFzYVc1bGFtOXBiajBpY205MWJtUWlJSE4wY205clpTMTNhV1IwYUQwaU1pSStDaUFnSUNBZ0lDQWdQSEJoZEdnZ1pEMGlUVEU0SURab05uWTJUVEV5SURJMFNEWjJMVFpOTWpRZ05td3ROeUEzVFRZZ01qUnNOeTAzSWk4K0NpQWdJQ0E4TDJjK0Nqd3ZjM1puUGdvPVwiIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE1EQWlJR2hsYVdkb2REMGlNVEF3SWlCMmFXVjNRbTk0UFNJd0lEQWdNVEF3SURFd01DSStDaUFnSUNBOFp5Qm1hV3hzUFNKdWIyNWxJaUJtYVd4c0xYSjFiR1U5SW1WMlpXNXZaR1FpUGdvZ0lDQWdJQ0FnSUR4amFYSmpiR1VnWTNnOUlqVXdJaUJqZVQwaU5UQWlJSEk5SWpRNUlpQnpkSEp2YTJVOUlpTkdSa1lpSUhOMGNtOXJaUzEzYVdSMGFEMGlNaUl2UGdvZ0lDQWdJQ0FnSUR4d1lYUm9JR1pwYkd3OUlpTkdSa1lpSUdROUlrMDNOU0ExTUV3ek5TQTNOVll5TlhvaUx6NEtJQ0FnSUR3dlp6NEtQQzl6ZG1jK0NnPT1cIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXpNQ0lnYUdWcFoyaDBQU0l6TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRE13SURNd0lqNEtJQ0FnSUR4d1lYUm9JR1pwYkd3OUltNXZibVVpSUdacGJHd3RjblZzWlQwaVpYWmxibTlrWkNJZ2MzUnliMnRsUFNJalJrWkdJaUJ6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlITjBjbTlyWlMxc2FXNWxhbTlwYmowaWNtOTFibVFpSUhOMGNtOXJaUzEzYVdSMGFEMGlNaUlnWkQwaVRUa2dObXd4TkNBNUxURTBJRGw2SWk4K0Nqd3ZjM1puUGdvPVwiIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJNE1DSWdhR1ZwWjJoMFBTSTRNQ0lnZG1sbGQwSnZlRDBpTUNBd0lEZ3dJRGd3SWo0TkNpQWdJQ0E4WnlCbWFXeHNQU0p1YjI1bElpQm1hV3hzTFhKMWJHVTlJbVYyWlc1dlpHUWlJSE4wY205clpUMGlJMFpHUmlJZ2MzUnliMnRsTFd4cGJtVmpZWEE5SW5KdmRXNWtJaUJ6ZEhKdmEyVXRiR2x1WldwdmFXNDlJbkp2ZFc1a0lpQnpkSEp2YTJVdGQybGtkR2c5SWpRaVBnMEtJQ0FnSUNBZ0lDQThjR0YwYUNCa1BTSk5NVFVnTWpFdU0zWXhNeTQ0YURFekxqZ2lMejROQ2lBZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRJd0xqYzNNeUEwTmk0MllUSXdMamNnTWpBdU55QXdJREVnTUNBMExqZzVPUzB5TVM0MU1qaE1NVFVnTXpVdU1TSXZQZzBLSUNBZ0lEd3ZaejROQ2p3dmMzWm5QZzBLXCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l6TUNJZ2FHVnBaMmgwUFNJek1DSWdkbWxsZDBKdmVEMGlNQ0F3SURNd0lETXdJajRLSUNBZ0lEeG5JR1pwYkd3OUltNXZibVVpSUdacGJHd3RjblZzWlQwaVpYWmxibTlrWkNJZ2MzUnliMnRsUFNJalJrWkdJaUJ6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlITjBjbTlyWlMxc2FXNWxhbTlwYmowaWNtOTFibVFpSUhOMGNtOXJaUzEzYVdSMGFEMGlNaUlnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb05DQTBLU0krQ2lBZ0lDQWdJQ0FnUEdOcGNtTnNaU0JqZUQwaU1URWlJR041UFNJeE1TSWdjajBpTXlJdlBnb2dJQ0FnSUNBZ0lEeHdZWFJvSUdROUlrMHhPQzQwSURFMFlURXVOalVnTVM0Mk5TQXdJREFnTUNBdU16TWdNUzQ0TW13dU1EWXVNRFpoTWlBeUlEQWdNU0F4TFRJdU9ETWdNaTQ0TTJ3dExqQTJMUzR3Tm1FeExqWTFJREV1TmpVZ01DQXdJREF0TVM0NE1pMHVNek1nTVM0Mk5TQXhMalkxSURBZ01DQXdMVEVnTVM0MU1WWXlNR0V5SURJZ01DQXhJREV0TkNBd2RpMHVNRGxCTVM0Mk5TQXhMalkxSURBZ01DQXdJRGdnTVRndU5HRXhMalkxSURFdU5qVWdNQ0F3SURBdE1TNDRNaTR6TTJ3dExqQTJMakEyWVRJZ01pQXdJREVnTVMweUxqZ3pMVEl1T0ROc0xqQTJMUzR3Tm1FeExqWTFJREV1TmpVZ01DQXdJREFnTGpNekxURXVPRElnTVM0Mk5TQXhMalkxSURBZ01DQXdMVEV1TlRFdE1VZ3lZVElnTWlBd0lERWdNU0F3TFRSb0xqQTVRVEV1TmpVZ01TNDJOU0F3SURBZ01DQXpMallnT0dFeExqWTFJREV1TmpVZ01DQXdJREF0TGpNekxURXVPREpzTFM0d05pMHVNRFpoTWlBeUlEQWdNU0F4SURJdU9ETXRNaTQ0TTJ3dU1EWXVNRFpoTVM0Mk5TQXhMalkxSURBZ01DQXdJREV1T0RJdU16TklPR0V4TGpZMUlERXVOalVnTUNBd0lEQWdNUzB4TGpVeFZqSmhNaUF5SURBZ01TQXhJRFFnTUhZdU1EbGhNUzQyTlNBeExqWTFJREFnTUNBd0lERWdNUzQxTVNBeExqWTFJREV1TmpVZ01DQXdJREFnTVM0NE1pMHVNek5zTGpBMkxTNHdObUV5SURJZ01DQXhJREVnTWk0NE15QXlMamd6YkMwdU1EWXVNRFpoTVM0Mk5TQXhMalkxSURBZ01DQXdMUzR6TXlBeExqZ3lWamhqTGpJMkxqWXdOQzQ0TlRJdU9UazNJREV1TlRFZ01VZ3lNR0V5SURJZ01DQXhJREVnTUNBMGFDMHVNRGxoTVM0Mk5TQXhMalkxSURBZ01DQXdMVEV1TlRFZ01Yb2lMejRLSUNBZ0lEd3ZaejRLUEM5emRtYytDZz09XCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l4TURBaUlHaGxhV2RvZEQwaU1UQXdJaUIyYVdWM1FtOTRQU0l3SURBZ01UQXdJREV3TUNJK0NpQWdJQ0E4WnlCbWFXeHNQU0p1YjI1bElpQm1hV3hzTFhKMWJHVTlJbVYyWlc1dlpHUWlQZ29nSUNBZ0lDQWdJRHhqYVhKamJHVWdZM2c5SWpVd0lpQmplVDBpTlRBaUlISTlJalE1SWlCemRISnZhMlU5SWlOR1JrWWlJSE4wY205clpTMTNhV1IwYUQwaU1pSXZQZ29nSUNBZ0lDQWdJRHh3WVhSb0lHWnBiR3c5SWlOR1JrWWlJR1E5SWswek5TQXlPV2czZGpReWFDMDNlazAxT0NBeU9XZzNkalF5YUMwM2VpSXZQZ29nSUNBZ1BDOW5QZ284TDNOMlp6NEtcIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXpNQ0lnYUdWcFoyaDBQU0l6TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRE13SURNd0lqNEtJQ0FnSUR4bklHWnBiR3c5SW01dmJtVWlJR1pwYkd3dGNuVnNaVDBpWlhabGJtOWtaQ0lnYzNSeWIydGxQU0lqUmtaR0lpQnpkSEp2YTJVdGJHbHVaV05oY0QwaWNtOTFibVFpSUhOMGNtOXJaUzFzYVc1bGFtOXBiajBpY205MWJtUWlJSE4wY205clpTMTNhV1IwYUQwaU1pSStDaUFnSUNBZ0lDQWdQSEJoZEdnZ1pEMGlUVEV3SURaMk1UaE5NakFnTm5ZeE9DSXZQZ29nSUNBZ1BDOW5QZ284TDNOMlp6NEtcIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXpNQ0lnYUdWcFoyaDBQU0l6TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRE13SURNd0lqNE5DaUFnSUNBOFp5Qm1hV3hzUFNKdWIyNWxJaUJtYVd4c0xYSjFiR1U5SW1WMlpXNXZaR1FpSUhOMGNtOXJaVDBpSTBaR1JpSWdjM1J5YjJ0bExXeHBibVZqWVhBOUluSnZkVzVrSWlCemRISnZhMlV0YkdsdVpXcHZhVzQ5SW5KdmRXNWtJaUJ6ZEhKdmEyVXRkMmxrZEdnOUlqSWlQZzBLSUNBZ0lDQWdJQ0E4Y0dGMGFDQmtQU0pOT1NBeE1VZzFkamhvTkd3MklEVldObnBOTVRrdU5UUWdNVEV1TkRaaE5TQTFJREFnTUNBeElEQWdOeTR3TnlJdlBnMEtJQ0FnSUR3dlp6NE5Dand2YzNablBnMEtcIiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXpNQ0lnYUdWcFoyaDBQU0l6TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRE13SURNd0lqNEtJQ0FnSUR4bklHWnBiR3c5SW01dmJtVWlJR1pwYkd3dGNuVnNaVDBpWlhabGJtOWtaQ0lnYzNSeWIydGxQU0lqUmtaR0lpQnpkSEp2YTJVdGJHbHVaV05oY0QwaWNtOTFibVFpSUhOMGNtOXJaUzFzYVc1bGFtOXBiajBpY205MWJtUWlJSE4wY205clpTMTNhV1IwYUQwaU1pSStDaUFnSUNBZ0lDQWdQSEJoZEdnZ1pEMGlUVGtnTVRGSU5YWTRhRFJzTmlBMVZqWjZUVEkySURFeWJDMDJJRFpOTWpBZ01USnNOaUEySWk4K0NpQWdJQ0E4TDJjK0Nqd3ZjM1puUGdvPVwiIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJek1DSWdhR1ZwWjJoMFBTSXpNQ0lnZG1sbGQwSnZlRDBpTUNBd0lETXdJRE13SWo0S0lDQWdJRHhuSUdacGJHdzlJbTV2Ym1VaUlHWnBiR3d0Y25Wc1pUMGlaWFpsYm05a1pDSWdjM1J5YjJ0bFBTSWpSa1pHSWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUlITjBjbTlyWlMxM2FXUjBhRDBpTWlJK0NpQWdJQ0FnSUNBZ1BIQmhkR2dnWkQwaVRUa2dNVEZJTlhZNGFEUnNOaUExVmpaNlRUSXpMakEzSURjdU9UTmpNeTQ1TURRZ015NDVNRFVnTXk0NU1EUWdNVEF1TWpNMUlEQWdNVFF1TVRSdExUTXVOVE10TVRBdU5qRmhOU0ExSURBZ01DQXhJREFnTnk0d055SXZQZ29nSUNBZ1BDOW5QZ284TDNOMlp6NEtcIiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNS0yIS4vb3ZlbnBsYXllci5sZXNzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNS0yIS4vb3ZlbnBsYXllci5sZXNzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTUtMiEuL292ZW5wbGF5ZXIubGVzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIi8vaW1wb3J0IENhcHRpb25NYW5hZ2VyIGZyb20gXCJhcGkvY2FwdGlvbi9NYW5hZ2VyXCI7XHJcbmltcG9ydCBDb25maWd1cmF0b3IgZnJvbSBcImFwaS9Db25maWd1cmF0b3JcIjtcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgTGF6eUNvbW1hbmRFeGVjdXRvciBmcm9tIFwiYXBpL0xhenlDb21tYW5kRXhlY3V0b3JcIjtcclxuaW1wb3J0IExvZ01hbmFnZXIgZnJvbSBcInV0aWxzL2xvZ2dlclwiO1xyXG5pbXBvcnQgUGxheWxpc3RNYW5hZ2VyIGZyb20gXCJhcGkvcGxheWxpc3QvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXJDb250cm9sbGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgUHJvbWlzZSwge3Jlc29sdmVkfSBmcm9tIFwiYXBpL3NoaW1zL3Byb21pc2VcIjtcclxuaW1wb3J0IHtSRUFEWSwgRVJST1IsIElOSVRfRVJST1IsIERFU1RST1ksIE5FVFdPUktfVU5TVEFCTEVELCBQTEFZRVJfRklMRV9FUlJPUiwgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG9iamVjdCBjb25uZWN0cyBVSSB0byB0aGUgcHJvdmlkZXIuXHJcbiAqIEBwYXJhbSAgIHtvYmplY3R9ICAgIGNvbnRhaW5lciAgZG9tIGVsZW1lbnRcclxuICpcclxuICogKi9cclxuXHJcbmNvbnN0IEFwaSA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XHJcbiAgICBsZXQgbG9nTWFuYWdlciA9IExvZ01hbmFnZXIoKTtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbW092ZW5QbGF5ZXJdXSB2LlwiKyB2ZXJzaW9uKTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSBsb2FkZWQuXCIpO1xyXG4gICAgLy9sZXQgY2FwdGlvbk1hbmFnZXIgPSBDYXB0aW9uTWFuYWdlcih0aGF0KTtcclxuICAgXHJcbiAgICBsZXQgcGxheWxpc3RNYW5hZ2VyID0gUGxheWxpc3RNYW5hZ2VyKCk7XHJcbiAgICBsZXQgcHJvdmlkZXJDb250cm9sbGVyID0gUHJvdmlkZXJDb250cm9sbGVyKCk7XHJcbiAgICBsZXQgY3VycmVudFByb3ZpZGVyID0gXCJcIjtcclxuICAgIGxldCBwbGF5ZXJDb25maWcgPSBcIlwiO1xyXG4gICAgbGV0IGxhenlRdWV1ZSA9IFwiXCI7XHJcblxyXG4gICAgY29uc3QgaW5pdFByb3ZpZGVyID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XHJcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHlGcm9tU291cmNlID0gKHNvdXJjZXMpID0+e1xyXG4gICAgICAgICAgICB2YXIgcXVhbGl0eSA9IDA7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBxdWFsaXR5O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBwcm92aWRlckNvbnRyb2xsZXIubG9hZFByb3ZpZGVycyhwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U291cmNlSW5kZXggPSBwaWNrUXVhbGl0eUZyb21Tb3VyY2UocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coIFwiY3VycmVudCBzb3VyY2UgaW5kZXggOiBcIisgY3VycmVudFNvdXJjZUluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIC8vQ2FsbCBQcm92aWRlci5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyLmdldE5hbWUoKSA9PT0gUFJPVklERVJfUlRNUCl7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHByb3ZpZGVyIHR5cGUgaXMgUlRNUCwgd2UgYWNjZXB0cyBSdG1wRXhwYW5zaW9uLlxyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGF0LCBBcGlSdG1wRXhwYW5zaW9uKGN1cnJlbnRQcm92aWRlcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1RoaXMgcGFzc2VzIHRoZSBldmVudCBjcmVhdGVkIGJ5IHRoZSBQcm92aWRlciB0byBBUEkuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5vbihcImFsbFwiLCBmdW5jdGlvbihuYW1lLCBkYXRhKXtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihuYW1lLCBkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0F1dG8gbmV4dCBzb3VyY2Ugd2hlbiBwbGF5ZXIgbG9hZCB3YXMgZmFpbCBieSBhbWlzcyBzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICBpZiggKG5hbWUgPT09IEVSUk9SICYmIChkYXRhLmNvZGUgPT09IFBMQVlFUl9GSUxFX0VSUk9SIHx8IHBhcnNlSW50KGRhdGEuY29kZS8xMDApID09PSA1KSl8fCBuYW1lID09PSBORVRXT1JLX1VOU1RBQkxFRCApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UXVhbGl0eSA9IHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjdXJyZW50UXVhbGl0eS5pbmRleCsxIDwgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzKCkubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIHNlcXVlbnRpYWwgaGFzIGF2YWlsYWJsZSBzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkoY3VycmVudFF1YWxpdHkuaW5kZXgrMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSkudGhlbigoKT0+e1xyXG5cclxuICAgICAgICAgICAgLy9wcm92aWRlcidzIHByZWxvYWQoKSBoYXZlIHRvIG1hZGUgUHJvbWlzZS4gQ3V6IGl0IG92ZXJjb21lcyAnZmxhc2ggbG9hZGluZyB0aW1pbmcgcHJvYmxlbScuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5wcmVsb2FkKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpLCBsYXN0UGxheVBvc2l0aW9uICkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmZsdXNoKCk7XHJcbiAgICAgICAgICAgICAgICAvL1RoaXMgaXMgbm8gcmVhc29uIHRvIGV4aXN0IGFueW1vcmUuXHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihSRUFEWSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvck9iamVjdCA9IHtjb2RlIDogSU5JVF9FUlJPUiwgcmVhc29uIDogXCJpbml0IGVycm9yLlwiLCBtZXNzYWdlIDogXCJQbGF5ZXIgaW5pdCBlcnJvci5cIiwgZXJyb3IgOiBlcnJvcn07XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgZXJyb3JPYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgLy94eHggOiBJZiB5b3UgaW5pdCBlbXB0eSBzb3VyY2VzLiAoSSB0aGluayB0aGlzIGlzIHN0cmFuZ2UgY2FzZS4pXHJcbiAgICAgICAgICAgIC8vVGhpcyB3b3JrcyBmb3IgdGhpcyBjYXNlLlxyXG4gICAgICAgICAgICAvL3BsYXllciA9IE92ZW5QbGF5ZXIuY3JlYXRlKFwiZWxJZFwiLCB7fSk7XHJcbiAgICAgICAgICAgIC8vcGxheWVyLmxvYWQoc29ydWNlcyk7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZS5yZW1vdmVBbmRFeGN1dGVPbmNlKFwibG9hZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIOy0iOq4sO2ZlCDtlajsiJhcclxuICAgICAqIGluaXRcclxuICAgICAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgcGxheWVyIGluaXRpYWwgb3B0aW9uIHZhbHVlLlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqKi9cclxuICAgIHRoYXQuaW5pdCA9IChvcHRpb25zKSA9PntcclxuICAgICAgICAvL0l0IGNvbGxlY3RzIHRoZSBjb21tYW5kcyBhbmQgZXhlY3V0ZXMgdGhlbSBhdCB0aGUgdGltZSB3aGVuIHRoZXkgYXJlIGV4ZWN1dGFibGUuXHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ2xvYWQnLCdwbGF5JywncGF1c2UnLCdzZWVrJywnc3RvcCcsICdnZXREdXJhdGlvbicsICdnZXRQb3NpdGlvbicsICdnZXRWb2x1bWUnLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnXSk7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnID0gQ29uZmlndXJhdG9yKG9wdGlvbnMpO1xyXG4gICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNEZWJ1ZygpKXtcclxuICAgICAgICAgICAgbG9nTWFuYWdlci5kaXNhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKVwiKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgIHBsYXlsaXN0TWFuYWdlci5zZXRQbGF5bGlzdChwbGF5ZXJDb25maWcuZ2V0UGxheWxpc3QoKSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHNvdXJjZXMgOiBcIiAsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcclxuICAgICAgICBpbml0UHJvdmlkZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyp0aGF0LmdldENvbnRhaW5lcklkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5pZDtcclxuICAgIH07Ki9cclxuXHJcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDb25maWcoKVwiLCBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkpO1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXREdXJhdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBvc2l0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFZvbHVtZSgpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFZvbHVtZSgpIFwiICsgdm9sdW1lKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRNdXRlKCkgXCIgKyBzdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRNdXRlKCkgXCIgKyBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAocGxheWxpc3QpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xyXG5cclxuICAgICAgICBpZihwbGF5bGlzdCl7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldFBsYXlsaXN0KHBsYXlsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluaXRQcm92aWRlcigpO1xyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGxheSgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGxheSgpO1xyXG4gICAgfVxyXG4gICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGF1c2UoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrKCkgXCIrIHBvc2l0aW9uKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2Vlayhwb3NpdGlvbik7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRQbGF5YmFja1JhdGUoKSBcIiwgcGxheWJhY2tSYXRlKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldFBsYXliYWNrUmF0ZShwbGF5ZXJDb25maWcuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZShwbGF5YmFja1JhdGUpKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXliYWNrUmF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UXVhbGl0eUxldmVscygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgcXVhbGl0eUluZGV4KTtcclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKTtcclxuICAgICAgICBsZXQgY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbdGhhdC5nZXRDdXJyZW50UXVhbGl0eSgpLmluZGV4XTtcclxuICAgICAgICBsZXQgbmV3U291cmNlID0gc291cmNlc1txdWFsaXR5SW5kZXhdO1xyXG4gICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gdGhhdC5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBpc1NhbWVQcm92aWRlciA9IHByb3ZpZGVyQ29udHJvbGxlci5pc1NhbWVQcm92aWRlcihjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpO1xyXG4gICAgICAgIC8vIHByb3ZpZGVyLnNlckN1cnJlbnRRdWFsaXR5IC0+IHBsYXllckNvbmZpZyBzZXR0aW5nIC0+IGxvYWRcclxuICAgICAgICBsZXQgcmVzUXVhbGl0eUluZGV4ID0gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KHF1YWxpdHlJbmRleCwgaXNTYW1lUHJvdmlkZXIpO1xyXG5cclxuICAgICAgICBpZighbmV3U291cmNlKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIGlzU2FtZVByb3ZpZGVyXCIsIGlzU2FtZVByb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgaWYoIWlzU2FtZVByb3ZpZGVyKXtcclxuICAgICAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknXSk7XHJcbiAgICAgICAgICAgIGluaXRQcm92aWRlcihsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXNRdWFsaXR5SW5kZXg7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIENhcHRpb25zIDogVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IHZlcnNpb24uKi9cclxuICAgIC8qdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChpbmRleCkgPT57XHJcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLnNldEN1cnJlbnRDYXB0aW9uKGluZGV4KTtcclxuICAgICB9XHJcbiAgICAgdGhhdC5nZXRDdXJyZW50Q2FwdGlvbiA9ICgpID0+e1xyXG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpO1xyXG4gICAgIH1cclxuICAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT4ge1xyXG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xyXG4gICAgIH1cclxuICAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+IHtcclxuICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuYWRkQ2FwdGlvbigpO1xyXG4gICAgIH1cclxuICAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT4ge1xyXG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xyXG4gICAgIH0qL1xyXG5cclxuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEJ1ZmZlcigpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCkpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U3RhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnN0b3AgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc3RvcCgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIFwiKTtcclxuICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcclxuICAgICAgICBwcm92aWRlckNvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgICAgIHBsYXlsaXN0TWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhhdC50cmlnZ2VyKERFU1RST1kpO1xyXG4gICAgICAgIHRoYXQub2ZmKCk7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIC0gbGF6eVF1ZXVlLCBjdXJyZW50UHJvdmlkZXIsIHByb3ZpZGVyQ29udHJvbGxlciwgcGxheWxpc3RNYW5hZ2VyLCBwbGF5ZXJDb25maWcsIGFwaSBldmVudCBkZXN0cm9lZC4gXCIpO1xyXG4gICAgICAgIGxvZ01hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcGk7XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwaVJ0bXBFeHBhbnNpb24gPSBmdW5jdGlvbihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBleHRlcm5hbENhbGxiYWNrQ3JlZXAgOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5uYW1lICYmIHJlc3VsdC5kYXRhKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsKHJlc3VsdC5uYW1lLCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgaW5pdGlhbGl6ZXMgdGhlIGlucHV0IG9wdGlvbnMuXHJcbiAqIEBwYXJhbSAgIG9wdGlvbnNcclxuICpcclxuICogKi9cclxuY29uc3QgQ29uZmlndXJhdG9yID0gZnVuY3Rpb24ob3B0aW9ucyl7XHJcblxyXG4gICAgY29uc3QgY29tcG9zZVNvdXJjZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKXtcclxuICAgICAgICBjb25zdCBEZWZhdWx0cyA9IHtcclxuICAgICAgICAgICAgZGVmYXVsdFBsYXliYWNrUmF0ZTogMSxcclxuICAgICAgICAgICAgcGxheWJhY2tSYXRlQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzOiBbMC4yNSwgMC41LCAxLCAxLjUsIDJdLFxyXG4gICAgICAgICAgICBtdXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgdm9sdW1lOiA5MCxcclxuICAgICAgICAgICAgd2lkdGg6IDY0MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAzNjBcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VyY2FzZVZhbCA9IHZhbC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIodmFsKSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdpZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBzZXJpYWxpemUob3B0aW9uc1trZXldKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZVNpemUgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWwuc2xpY2UgJiYgdmFsLnNsaWNlKC0yKSA9PT0gJ3B4Jykge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdmFsLnNsaWNlKDAsIC0yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBldmFsdWF0ZUFzcGVjdFJhdGlvID0gZnVuY3Rpb24gKGFyLCB3aWR0aCkge1xyXG4gICAgICAgICAgICBpZiAod2lkdGgudG9TdHJpbmcoKS5pbmRleE9mKCclJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyICE9PSAnc3RyaW5nJyB8fCAhYXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgvXlxcZCpcXC4/XFxkKyUkLy50ZXN0KGFyKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYXIuaW5kZXhPZignOicpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB3ID0gcGFyc2VGbG9hdChhci5zdWJzdHIoMCwgaW5kZXgpKTtcclxuICAgICAgICAgICAgY29uc3QgaCA9IHBhcnNlRmxvYXQoYXIuc3Vic3RyKGluZGV4ICsgMSkpO1xyXG4gICAgICAgICAgICBpZiAodyA8PSAwIHx8IGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChoIC8gdyAqIDEwMCkgKyAnJSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlc2VyaWFsaXplKG9wdGlvbnMpO1xyXG4gICAgICAgIGxldCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0cywgb3B0aW9ucyk7XHJcbiAgICAgICAgY29uZmlnLndpZHRoID0gbm9ybWFsaXplU2l6ZShjb25maWcud2lkdGgpO1xyXG4gICAgICAgIGNvbmZpZy5oZWlnaHQgPSBub3JtYWxpemVTaXplKGNvbmZpZy5oZWlnaHQpO1xyXG4gICAgICAgIGNvbmZpZy5hc3BlY3RyYXRpbyA9IGV2YWx1YXRlQXNwZWN0UmF0aW8oY29uZmlnLmFzcGVjdHJhdGlvLCBjb25maWcud2lkdGgpO1xyXG5cclxuICAgICAgICBsZXQgcmF0ZUNvbnRyb2xzID0gY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzO1xyXG4gICAgICAgIGlmIChyYXRlQ29udHJvbHMpIHtcclxuICAgICAgICAgICAgbGV0IHJhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyYXRlQ29udHJvbHMpKSB7XHJcbiAgICAgICAgICAgICAgICByYXRlcyA9IHJhdGVDb250cm9scztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByYXRlcyA9IHJhdGVzLmZpbHRlcihyYXRlID0+IF8uaXNOdW1iZXIocmF0ZSkgJiYgcmF0ZSA+PSAwLjI1ICYmIHJhdGUgPD0gNClcclxuICAgICAgICAgICAgICAgIC5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJhdGVzLmluZGV4T2YoMSkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByYXRlcy5wdXNoKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJhdGVzLnNvcnQoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGVzID0gcmF0ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgfHwgY29uZmlnLnBsYXliYWNrUmF0ZXMuaW5kZXhPZihjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSkgPCAwKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGUgPSBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZTtcclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcuYXNwZWN0cmF0aW8pIHtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5hc3BlY3RyYXRpbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZpZ1BsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0O1xyXG4gICAgICAgIGlmICghY29uZmlnUGxheWxpc3QpIHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqID0gXy5waWNrKGNvbmZpZywgW1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICAgICAgICAndHlwZScsXHJcbiAgICAgICAgICAgICAgICAnbWVkaWFpZCcsXHJcbiAgICAgICAgICAgICAgICAnaW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgJ3NvdXJjZXMnLFxyXG4gICAgICAgICAgICAgICAgJ3RyYWNrcycsXHJcbiAgICAgICAgICAgICAgICAncHJlbG9hZCcsXHJcbiAgICAgICAgICAgICAgICAnZHVyYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ2hvc3QnLFxyXG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyxcclxuICAgICAgICAgICAgICAgICdzdHJlYW0nXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gWyBvYmogXTtcclxuICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShjb25maWdQbGF5bGlzdC5wbGF5bGlzdCkpIHtcclxuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5kdXJhdGlvbjtcclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNvbmZpZ3VyYXRvciBsb2FkZWQuXCIsIG9wdGlvbnMpO1xyXG4gICAgbGV0IGNvbmZpZyA9IGNvbXBvc2VTb3VyY2VPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIGxldCBhc3BlY3RyYXRpbyA9IGNvbmZpZy5hc3BlY3RyYXRpbyB8fCBcIjE2OjlcIjtcclxuICAgIGxldCBkZWJ1ZyA9IGNvbmZpZy5kZWJ1ZztcclxuICAgIGxldCBkZWZhdWx0UGxheWJhY2tSYXRlID0gY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgfHwgMTtcclxuICAgIGxldCBpbWFnZSA9IGNvbmZpZy5pbWFnZTtcclxuICAgIGxldCBwbGF5YmFja1JhdGVDb250cm9scyA9IGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyB8fCB0cnVlO1xyXG4gICAgbGV0IHBsYXliYWNrUmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcyB8fCBbMC41LCAxLCAxLjI1LCAxLjUsIDJdO1xyXG4gICAgbGV0IHBsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0IHx8IFtdO1xyXG4gICAgbGV0IHF1YWxpdHlMYWJlbCA9IGNvbmZpZy5xdWFsaXR5TGFiZWwgfHwgXCJcIjtcclxuICAgIGxldCByZXBlYXQgPSBjb25maWcucmVwZWF0IHx8IGZhbHNlO1xyXG4gICAgbGV0IHN0cmV0Y2hpbmcgPSBjb25maWcuc3RyZXRjaGluZyB8fCAndW5pZm9ybSc7XHJcblxyXG5cclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtyZXR1cm4gY29uZmlnO307XHJcblxyXG4gICAgdGhhdC5nZXRBc3BlY3RyYXRpbyA9KCk9PntyZXR1cm4gYXNwZWN0cmF0aW87fTtcclxuICAgIHRoYXQuc2V0QXNwZWN0cmF0aW8gPShhc3BlY3RyYXRpb18pPT57YXNwZWN0cmF0aW8gPSBhc3BlY3RyYXRpb187fTtcclxuXHJcbiAgICB0aGF0LmlzRGVidWcgPSgpPT57cmV0dXJuIGRlYnVnO307XHJcblxyXG4gICAgdGhhdC5nZXREZWZhdWx0UGxheWJhY2tSYXRlID0oKT0+e3JldHVybiBkZWZhdWx0UGxheWJhY2tSYXRlO307XHJcbiAgICB0aGF0LnNldERlZmF1bHRQbGF5YmFja1JhdGUgPShwbGF5YmFja1JhdGUpPT57ZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTsgcmV0dXJuIHBsYXliYWNrUmF0ZTt9O1xyXG5cclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxhYmVsID0gKCkgPT4ge3JldHVybiBxdWFsaXR5TGFiZWw7fTtcclxuICAgIHRoYXQuc2V0UXVhbGl0eUxhYmVsID0gKG5ld0xhYmVsKSA9PiB7cXVhbGl0eUxhYmVsID0gbmV3TGFiZWw7fTtcclxuXHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZXMgPSgpPT57cmV0dXJuIHBsYXliYWNrUmF0ZXM7fTtcclxuICAgIHRoYXQuaXNQbGF5YmFja1JhdGVDb250cm9scyA9KCk9PntyZXR1cm4gcGxheWJhY2tSYXRlQ29udHJvbHM7fTtcclxuXHJcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0oKT0+e3JldHVybiBwbGF5bGlzdDt9O1xyXG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0XyApPT57XHJcbiAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0Xykpe1xyXG4gICAgICAgICAgICBwbGF5bGlzdCA9IHBsYXlsaXN0XztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcGxheWxpc3QgPSBbcGxheWxpc3RfXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzUmVwZWF0ID0oKT0+e3JldHVybiByZXBlYXQ7fTtcclxuXHJcbiAgICB0aGF0LmdldFN0cmV0Y2hpbmcgPSgpPT57cmV0dXJuIHN0cmV0Y2hpbmc7fTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRvcjtcclxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMy4uXG4gKi9cblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1vZHVsZSBwcm92aWRlIGN1c3RvbSBldmVudHMuXG4gKiBAcGFyYW0gICBvYmplY3QgICAgQW4gb2JqZWN0IHRoYXQgcmVxdWlyZXMgY3VzdG9tIGV2ZW50cy5cbiAqXG4gKiAqL1xuXG5jb25zdCBFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbihvYmplY3Qpe1xuICAgIGxldCB0aGF0ID0gb2JqZWN0O1xuICAgIGxldCBfZXZlbnRzID1bXTtcblxuICAgIGNvbnN0IHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MsIGNvbnRleHQpe1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGxldCBsZW5ndGggPSBldmVudHMubGVuZ3RoO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gZXZlbnRzW2ldO1xuICAgICAgICAgICAgZXZlbnQubGlzdGVuZXIuYXBwbHkoICggZXZlbnQuY29udGV4dCB8fCBjb250ZXh0ICksIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQub24gPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIChfZXZlbnRzW25hbWVdIHx8IChfZXZlbnRzW25hbWVdPVtdKSApLnB1c2goeyBsaXN0ZW5lcjogbGlzdGVuZXIgICwgY29udGV4dCA6IGNvbnRleHR9KTtcbiAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgfTtcbiAgICB0aGF0LnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lKXtcbiAgICAgICAgaWYoIV9ldmVudHMpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XG4gICAgICAgIGNvbnN0IGFsbEV2ZW50cyA9IF9ldmVudHMuYWxsO1xuXG4gICAgICAgIGlmKGV2ZW50cyl7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGV2ZW50cywgYXJncywgdGhhdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYWxsRXZlbnRzKXtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoYWxsRXZlbnRzLCBhcmd1bWVudHMsIHRoYXQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgaWYoIV9ldmVudHMpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFuYW1lICYmICFsaXN0ZW5lciAmJiAhY29udGV4dCkgIHtcbiAgICAgICAgICAgIF9ldmVudHMgPSBbXTtcbiAgICAgICAgICAgIHJldHVybiB0aGF0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogT2JqZWN0LmtleXMoX2V2ZW50cyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IF9ldmVudHNbbmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgIHx8IGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5saXN0ZW5lciAgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLl9jYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2ZW50LmNvbnRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQub25jZSA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgY29uc3Qgb25jZUNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY291bnQrKykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQub2ZmKG5hbWUsIG9uY2VDYWxsYmFjayk7XG4gICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICBvbmNlQ2FsbGJhY2suX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGF0Lm9uKG5hbWUsIG9uY2VDYWxsYmFjaywgY29udGV4dCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7IiwiaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBleGVjdXRlcyB0aGUgaW5wdXQgY29tbWFuZHMgYXQgYSBzcGVjaWZpYyBwb2ludCBpbiB0aW1lLlxuICogQHBhcmFtICAgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHF1ZXVlZENvbW1hbmRzXG4gKiAqL1xuY29uc3QgTGF6eUNvbW1hbmRFeGVjdXRvciA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgcXVldWVkQ29tbWFuZHMpIHtcbiAgICBsZXQgY29tbWFuZFF1ZXVlID0gW107XG4gICAgbGV0IHVuZGVjb3JhdGVkTWV0aG9kcyA9IHt9O1xuICAgIGxldCBleGVjdXRlTW9kZSA9IGZhbHNlO1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciBsb2FkZWQuXCIpO1xuICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gaW5zdGFuY2VbY29tbWFuZF07XG4gICAgICAgIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSA9IG1ldGhvZCB8fCBmdW5jdGlvbigpe307XG5cbiAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICAgICAgICBpZiAoIWV4ZWN1dGVNb2RlKSB7XG4gICAgICAgICAgICAgICAgLy9jb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgICAgICAgICAgICAgdGhhdC5hZGRRdWV1ZShjb21tYW5kLCBhcmdzKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZC5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgdmFyIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2hpbGUgKGNvbW1hbmRRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNvbW1hbmQsIGFyZ3MgfSA9IGNvbW1hbmRRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgKHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSB8fCBpbnN0YW5jZVtjb21tYW5kXSkuYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhhdC5zZXRFeGVjdXRlTW9kZSA9IChtb2RlKSA9PiB7XG4gICAgICAgIGV4ZWN1dGVNb2RlID0gbW9kZTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHNldEV4ZWN1dGVNb2RlKClcIiwgbW9kZSk7XG4gICAgfTtcbiAgICB0aGF0LmdldFVuZGVjb3JhdGVkTWV0aG9kcyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRVbmRlY29yYXRlZE1ldGhvZHMoKVwiLCB1bmRlY29yYXRlZE1ldGhvZHMpO1xuICAgICAgICByZXR1cm4gdW5kZWNvcmF0ZWRNZXRob2RzO1xuICAgIH1cbiAgICB0aGF0LmdldFF1ZXVlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFF1ZXVlKClcIiwgZ2V0UXVldWUpO1xuICAgICAgICByZXR1cm4gY29tbWFuZFF1ZXVlO1xuICAgIH1cbiAgICB0aGF0LmFkZFF1ZXVlID0gZnVuY3Rpb24oY29tbWFuZCwgYXJncyl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBhZGRRdWV1ZSgpXCIsIGNvbW1hbmQsIGFyZ3MpO1xuICAgICAgICBjb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgfVxuXG4gICAgdGhhdC5mbHVzaCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBmbHVzaCgpXCIpO1xuICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcbiAgICB9O1xuICAgIHRoYXQuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGVtcHR5KClcIik7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5sZW5ndGggPSAwO1xuICAgIH07XG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IG9mZigpXCIpO1xuICAgICAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XG4gICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgLy9SdW4gb25jZSBhdCB0aGUgZW5kXG4gICAgdGhhdC5yZW1vdmVBbmRFeGN1dGVPbmNlID0gZnVuY3Rpb24oY29tbWFuZF8pe1xuICAgICAgICBsZXQgY29tbWFuZFF1ZXVlSXRlbSA9IF8uZmluZFdoZXJlKGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogcmVtb3ZlQW5kRXhjdXRlT25jZSgpXCIsIGNvbW1hbmRfKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLnNwbGljZShfLmZpbmRJbmRleChjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KSwgMSk7XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcbiAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicmVtb3ZlQ29tbWFuZCgpXCIpO1xuICAgICAgICAgICAgaWYoY29tbWFuZFF1ZXVlSXRlbSl7XG4gICAgICAgICAgICAgICAgKG1ldGhvZHx8IGluc3RhbmNlW2NvbW1hbmRfXSkuYXBwbHkoaW5zdGFuY2UsIGNvbW1hbmRRdWV1ZUl0ZW0uYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kX10gPSBtZXRob2Q7XG4gICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgdGhhdC5vZmYoKTtcbiAgICAgICAgdGhhdC5lbXB0eSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IExhenlDb21tYW5kRXhlY3V0b3I7IiwiaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2h9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGZpbmRzIHRoZSBwcm92aWRlciB0aGF0IG1hdGNoZXMgdGhlIGlucHV0IHNvdXJjZS5cclxuICogQHBhcmFtXHJcbiAqICovXHJcblxyXG5jb25zdCBTdXBwb3J0Q2hlY2tlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciBsb2FkZWQuXCIpO1xyXG4gICAgY29uc3Qgc3VwcG9ydExpc3QgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnaHRtbDUnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IE1pbWVUeXBlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhYWM6ICdhdWRpby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZjR2OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtNHY6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdjogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbXAzOiAnYXVkaW8vbXBlZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbXBlZzogJ2F1ZGlvL21wZWcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9ndjogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2dnOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ2E6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZvcmJpczogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgd2VibTogJ3ZpZGVvL3dlYm0nLFxyXG4gICAgICAgICAgICAgICAgICAgIGY0YTogJ3ZpZGVvL2FhYycsXHJcbiAgICAgICAgICAgICAgICAgICAgbTN1ODogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcclxuICAgICAgICAgICAgICAgICAgICBtM3U6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGxzOiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZighdHlwZSl7cmV0dXJuIGZhbHNlO31cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFtaW1lVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISF2aWRlby5jYW5QbGF5VHlwZShtaW1lVHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3dlYnJ0YycsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2Rhc2gnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL21wZCBhcHBsaWNhdGlvbi9kYXNoK3htbFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRGFzaChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdobHMnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdGhpcyBtZXRob2QgZnJvbSBobHMuanNcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzSGxzU3VwcG9ydCA9ICgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRNZWRpYVNvdXJjZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Lk1lZGlhU291cmNlIHx8IHdpbmRvdy5XZWJLaXRNZWRpYVNvdXJjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVkaWFTb3VyY2UgPSBnZXRNZWRpYVNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXIgPSB3aW5kb3cuU291cmNlQnVmZmVyIHx8IHdpbmRvdy5XZWJLaXRTb3VyY2VCdWZmZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzVHlwZVN1cHBvcnRlZCA9IG1lZGlhU291cmNlICYmIHR5cGVvZiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQgPT09ICdmdW5jdGlvbicgJiYgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFLG1wNGEuNDAuMlwiJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIFNvdXJjZUJ1ZmZlciBpcyBleHBvc2VkIGVuc3VyZSBpdHMgQVBJIGlzIHZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2FmYXJpIGFuZCBvbGQgdmVyc2lvbiBvZiBDaHJvbWUgZG9lIG5vdCBleHBvc2UgU291cmNlQnVmZmVyIGdsb2JhbGx5IHNvIGNoZWNraW5nIFNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgaXMgaW1wb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXJWYWxpZEFQSSA9ICFzb3VyY2VCdWZmZXIgfHwgc291cmNlQnVmZmVyLnByb3RvdHlwZSAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5hcHBlbmRCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUucmVtb3ZlID09PSAnZnVuY3Rpb24nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWlzVHlwZVN1cHBvcnRlZCAmJiAhIXNvdXJjZUJ1ZmZlclZhbGlkQVBJO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIHRoaXMgJyEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyknIGlmIHlvdSB3YW50IHRvIHVzZSBobHNqcy5cclxuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKSAmJiAhIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdydG1wJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBdO1xyXG5cclxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlID0gKHNvcnVjZV8pID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSgpXCIsIHNvcnVjZV8pO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IChzb3J1Y2VfID09PSBPYmplY3Qoc29ydWNlXykpID8gc29ydWNlXyA6IHt9O1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdXBwb3J0TGlzdC5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBpZihzdXBwb3J0TGlzdFtpXS5jaGVja1N1cHBvcnQoc291cmNlKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydExpc3RbaV0ubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCA9IChwbGF5bGlzdF8pID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCgpXCIsIHBsYXlsaXN0Xyk7XHJcbiAgICAgICAgbGV0IHN1cHBvcnROYW1lcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBwbGF5bGlzdF9baV07XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2UgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSBpdGVtLnNvdXJjZXNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnROYW1lcy5wdXNoKHN1cHBvcnRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdXBwb3J0TmFtZXM7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjtcclxuIiwiLy8gU1RBVEVcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9ICdidWZmZXJpbmcnO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfSURMRSA9ICdpZGxlJztcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0NPTVBMRVRFID0gJ2NvbXBsZXRlJztcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9ICdwYXVzZWQnO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfUExBWUlORyA9ICdwbGF5aW5nJztcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0VSUk9SID0gJ2Vycm9yJztcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSAnbG9hZGluZyc7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9TVEFMTEVEID0gJ3N0YWxsZWQnO1xyXG5cclxuXHJcbi8vIFBST1ZJREVSXHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9ICdodG1sNSc7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9XRUJSVEMgPSAnd2VicnRjJztcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0RBU0ggPSAnZGFzaCc7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9ITFMgPSAnaGxzJztcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1JUTVAgPSAncnRtcCc7XHJcblxyXG4vLyBFVkVOVFNcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcclxuZXhwb3J0IGNvbnN0IFJFQURZID0gJ3JlYWR5JztcclxuZXhwb3J0IGNvbnN0IERFU1RST1kgPSAnZGVzdHJveSc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NFRUsgPSAnc2Vlayc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUl9GVUxMID0gJ2J1ZmZlckZ1bGwnO1xyXG5leHBvcnQgY29uc3QgRElTUExBWV9DTElDSyA9ICdkaXNwbGF5Q2xpY2snO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9MT0FERUQgPSAnbG9hZGVkJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gJ3NlZWtlZCc7XHJcbmV4cG9ydCBjb25zdCBORVRXT1JLX1VOU1RBQkxFRCA9ICd1bnN0YWJsZU5ldHdvcmsnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVSUk9SID0gJ2Vycm9yJztcclxuXHJcbi8vIFNUQVRFIE9GIFBMQVlFUlxyXG5leHBvcnQgY29uc3QgUExBWUVSX1NUQVRFID0gJ3N0YXRlQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9QQVVTRSA9ICdwYXVzZSc7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfUExBWSA9ICdwbGF5JztcclxuXHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9ICdidWZmZXJDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRSA9ICd0aW1lJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfUkFURV9DSEFOR0UgPSAncmF0ZWNoYW5nZSc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9ICd2b2x1bWVDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTVVURSA9ICdtdXRlJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTUVUQSA9ICdtZXRhQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMUyA9ICdxdWFsaXR5TGV2ZWxDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxfQ0hBTkdFRCA9ICdjdXJyZW50UXVhbGl0eUxldmVsQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBQTEFZQkFDS19SQVRFX0NIQU5HRUQgPSAncGxheWJhY2tSYXRlQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQgPSAnY3VlQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRCA9ICdjYXB0aW9uQ2hhbmdlZCc7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IElOSVRfRVJST1IgPSAxMDA7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9FUlJPUiA9IDMwMDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiA9IDMwMTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IgPSAzMDI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IgPSAzMDM7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfRklMRV9FUlJPUiA9IDMwNDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DQVBUSU9OX0VSUk9SID0gMzA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19XU19FUlJPUiA9IDUwMTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfQ0xPU0VEID0gNTAyO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAzO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IgPSA1MDQ7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA2O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1cgPSA1MTA7XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2V4dHJhY3RFeHRlbnNpb24gLHRyaW19IGZyb20gXCIuLi8uLi91dGlscy9zdHJpbmdzXCI7XHJcbmltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiLi4vU3VwcG9ydENoZWNrZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgUGxheWxpc3Qgb3IgU291cmNlcy5cclxuICogQHBhcmFtXHJcbiAqXHJcbiAqICovXHJcbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGN1cnJlbnRQbGF5bGlzdCA9IFtdO1xyXG4gICAgbGV0IHN1cHBvcnRDaGVja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCBtYWtlUHJldHR5U291cmNlID0gZnVuY3Rpb24oc291cmNlXyl7XHJcbiAgICAgICAgaWYgKCFzb3VyY2VfIHx8ICFzb3VyY2VfLmZpbGUgJiYgIShzb3VyY2VfLmhvc3QgfHwgc291cmNlXy5hcHBsaWNhdGlvbiB8fCBzb3VyY2VfLnN0cmVhbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIHsgJ2RlZmF1bHQnOiBmYWxzZSB9LCBzb3VyY2VfKTtcclxuICAgICAgICBzb3VyY2UuZmlsZSA9IHRyaW0oJycgKyBzb3VyY2UuZmlsZSk7XHJcblxyXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcclxuICAgICAgICAgICAgc291cmNlLmZpbGUgPSBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvc3RyZWFtL1wiICsgc291cmNlLnN0cmVhbTtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5ob3N0O1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmFwcGxpY2F0aW9uO1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLnN0cmVhbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1pbWV0eXBlUmVnRXggPSAvXlteL10rXFwvKD86eC0pPyhbXi9dKykkLztcclxuXHJcbiAgICAgICAgaWYgKG1pbWV0eXBlUmVnRXgudGVzdChzb3VyY2UudHlwZSkpIHtcclxuICAgICAgICAgICAgLy8gaWYgdHlwZSBpcyBnaXZlbiBhcyBhIG1pbWV0eXBlXHJcbiAgICAgICAgICAgIHNvdXJjZS5taW1lVHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IHNvdXJjZS50eXBlLnJlcGxhY2UobWltZXR5cGVSZWdFeCwgJyQxJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihpc1J0bXAoc291cmNlLmZpbGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnd2VicnRjJztcclxuICAgICAgICB9ZWxzZSBpZihpc0Rhc2goc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2Rhc2gnO1xyXG4gICAgICAgIH1lbHNlIGlmICghc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBleHRyYWN0RXh0ZW5zaW9uKHNvdXJjZS5maWxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbm9ybWFsaXplIHR5cGVzXHJcbiAgICAgICAgc3dpdGNoIChzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdtM3U4JzpcclxuICAgICAgICAgICAgY2FzZSAndm5kLmFwcGxlLm1wZWd1cmwnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnaGxzJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtNGEnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnYWFjJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzbWlsJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlW2tleV0gPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgc291cmNlW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0KSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgc2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3QpO1xyXG4gICAgICAgIGNvbnN0IHByZXR0aWVkUGxheWxpc3QgPSAoXy5pc0FycmF5KHBsYXlsaXN0KSA/IHBsYXlsaXN0IDogW3BsYXlsaXN0XSkubWFwKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KGl0ZW0udHJhY2tzKSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0udHJhY2tzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwbGF5bGlzdEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tzOiBbXVxyXG4gICAgICAgICAgICB9LCBpdGVtICk7XHJcblxyXG4gICAgICAgICAgICBpZigocGxheWxpc3RJdGVtLnNvdXJjZXMgPT09IE9iamVjdChwbGF5bGlzdEl0ZW0uc291cmNlcykpICYmICFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzKV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBpdGVtLmxldmVscztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShpdGVtKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBwcmV0dHlTb3VyY2UgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdFNvdXJjZSA9IHNvdXJjZS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNvdXJjZSBkb2Vzbid0IGhhdmUgYSBsYWJlbCwgbnVtYmVyIGl0XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS50eXBlK1wiLVwiK2kudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlTb3VyY2UgPSBtYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmKHN1cHBvcnRDaGVja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShwcmV0dHlTb3VyY2UpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IHByZXR0eVNvdXJjZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBwbGF5bGlzdEl0ZW0uc291cmNlcy5maWx0ZXIoc291cmNlID0+ICEhc291cmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmF1bHQg6rCAIOyXhuydhOuVjCB3ZWJydGPqsIAg7J6I64uk66m0IHdlYnJ0YyBkZWZhdWx0IDogdHJ1ZeuhnCDsnpDrj5kg7ISk7KCVXHJcbiAgICAgICAgICAgIC8qbGV0IGhhdmVEZWZhdWx0ID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UuZGVmYXVsdCA9PSB0cnVlO30pO1xyXG4gICAgICAgICAgICBsZXQgd2VicnRjU291cmNlID0gW107XHJcbiAgICAgICAgICAgIGlmKCFoYXZlRGVmYXVsdCl7XHJcbiAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS50eXBlID09IFwid2VicnRjXCI7fSk7XHJcbiAgICAgICAgICAgICAgICBpZih3ZWJydGNTb3VyY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZS5kZWZhdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSovXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnRyYWNrcykpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLmNvbmNhdChwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHBsYXlsaXN0SXRlbS5jYXB0aW9ucztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MubWFwKGZ1bmN0aW9uKHRyYWNrKXtcclxuICAgICAgICAgICAgICAgIGlmKCF0cmFjayB8fCAhdHJhY2suZmlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHtcclxuICAgICAgICAgICAgICAgICAgICAna2luZCc6ICdjYXB0aW9ucycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgdHJhY2spO1xyXG4gICAgICAgICAgICB9KS5maWx0ZXIodHJhY2sgPT4gISF0cmFjayk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGxheWxpc3RJdGVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGN1cnJlbnRQbGF5bGlzdCA9IHByZXR0aWVkUGxheWxpc3Q7XHJcbiAgICAgICAgcmV0dXJuIHByZXR0aWVkUGxheWxpc3Q7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0UGxheWxpc3QoKSBcIiwgY3VycmVudFBsYXlsaXN0KTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9XZSBkbyBub3Qgc3VwcG9ydCBcIlBMQVlMSVNUXCIgbm90IHlldC4gU28gdGhpcyByZXR1cm5zIHBsYXlsaXN0IG9mIDAuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldEN1cnJlbnRTb3VyY2VzKCkgXCIsIGN1cnJlbnRQbGF5bGlzdFswXS5zb3VyY2VzKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFBsYXlsaXN0WzBdLnNvdXJjZXM7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsImltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiYXBpL1N1cHBvcnRDaGVja2VyXCI7XHJcbmltcG9ydCBQcm9taXNlLCB7cmVzb2x2ZWR9IGZyb20gXCJhcGkvc2hpbXMvcHJvbWlzZVwiO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXHJcbiAqIEBwYXJhbVxyXG4gKiAqL1xyXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBzdXBwb3J0Q2hhY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XHJcbiAgICBjb25zdCBQcm92aWRlcnMgPSB7fTtcclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCByZWdpc3RlUHJvdmlkZXIgPSAobmFtZSwgcHJvdmlkZXIpID0+e1xyXG4gICAgICAgIGlmKFByb3ZpZGVyc1tuYW1lXSl7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcclxuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPXtcclxuICAgICAgICBodG1sNTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9IdG1sNSddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvSHRtbDUnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcImh0bWw1XCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5IdG1sNSdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdlYnJ0YyA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9XZWJSVEMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L1dlYlJUQycpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwid2VicnRjXCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhc2ggOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvRGFzaCddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvRGFzaCcpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiZGFzaFwiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGxzIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L0hscyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvSGxzJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJobHNcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnRtcCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9mbGFzaC9SdG1wJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9mbGFzaC9SdG1wJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJydG1wXCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhhdC5sb2FkUHJvdmlkZXJzID0gKHBsYXlsaXN0KSA9PntcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KHBsYXlsaXN0KTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZFByb3ZpZGVycygpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzKTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXHJcbiAgICAgICAgICAgIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMuZmlsdGVyKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISFQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdO1xyXG4gICAgICAgICAgICB9KS5tYXAoZnVuY3Rpb24ocHJvdmlkZXJOYW1lKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZmluZEJ5TmFtZSA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGZpbmRCeU5hbWUoKSBcIiwgbmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZSA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBnZXRQcm92aWRlckJ5U291cmNlKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBpc1NhbWVQcm92aWRlcigpIFwiLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKSApO1xyXG4gICAgICAgIHJldHVybiBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgPT09IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xyXG4iLCIvLyAgICAgIFByb21pc2UgUG9seWZpbGxcbi8vICAgICAgaHR0cHM6Ly9naXRodWIuY29tL3RheWxvcmhha2VzL3Byb21pc2UtcG9seWZpbGxcbi8vICAgICAgQ29weXJpZ2h0IChjKSAyMDE0IFRheWxvciBIYWtlc1xuLy8gICAgICBDb3B5cmlnaHQgKGMpIDIwMTQgRm9yYmVzIExpbmRlc2F5XG4vLyAgICAgIHRheWxvcmhha2VzL3Byb21pc2UtcG9seWZpbGwgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG5cbmNvbnN0IHByb21pc2VGaW5hbGx5ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB2YXIgY29uc3RydWN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiB0aGlzLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICApO1xufTtcblxuLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gcHJvbWlzZS1wb2x5ZmlsbCB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcbi8vIG90aGVyIGNvZGUgbW9kaWZ5aW5nIHNldFRpbWVvdXQgKGxpa2Ugc2lub24udXNlRmFrZVRpbWVycygpKVxuY29uc3Qgc2V0VGltZW91dEZ1bmMgPSB3aW5kb3cuc2V0VGltZW91dDtcbmNvbnN0IHNldEltbWVkaWF0ZUZ1bmMgPSB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuLy8gUG9seWZpbGwgZm9yIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG5mdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbmNvbnN0IFByb21pc2VTaGltID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb21pc2UpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlcyBtdXN0IGJlIGNvbnN0cnVjdGVkIHZpYSBuZXcnKTtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSBmdW5jdGlvbicpO1xuICAgIHRoaXMuX3N0YXRlID0gMDtcbiAgICB0aGlzLl9oYW5kbGVkID0gZmFsc2U7XG4gICAgdGhpcy5fdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZGVmZXJyZWRzID0gW107XG5cbiAgICBkb1Jlc29sdmUoZm4sIHRoaXMpO1xufVxuXG5jb25zdCBoYW5kbGUgPSBmdW5jdGlvbiAoc2VsZiwgZGVmZXJyZWQpIHtcbiAgICB3aGlsZSAoc2VsZi5fc3RhdGUgPT09IDMpIHtcbiAgICAgICAgc2VsZiA9IHNlbGYuX3ZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDApIHtcbiAgICAgICAgc2VsZi5fZGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNlbGYuX2hhbmRsZWQgPSB0cnVlO1xuICAgIFByb21pc2UuX2ltbWVkaWF0ZUZuKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2IgPSBzZWxmLl9zdGF0ZSA9PT0gMSA/IGRlZmVycmVkLm9uRnVsZmlsbGVkIDogZGVmZXJyZWQub25SZWplY3RlZDtcbiAgICAgICAgaWYgKGNiID09PSBudWxsKSB7XG4gICAgICAgICAgICAoc2VsZi5fc3RhdGUgPT09IDEgPyByZXNvbHZlIDogcmVqZWN0KShkZWZlcnJlZC5wcm9taXNlLCBzZWxmLl92YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJldDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldCA9IGNiKHNlbGYuX3ZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGRlZmVycmVkLnByb21pc2UsIGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoZGVmZXJyZWQucHJvbWlzZSwgcmV0KTtcbiAgICB9KTtcbn1cblxuY29uc3QgcmVzb2x2ZSA9IGZ1bmN0aW9uIChzZWxmLCBuZXdWYWx1ZSkge1xuICAgIHRyeSB7XG4gICAgICAgIC8vIFByb21pc2UgUmVzb2x1dGlvbiBQcm9jZWR1cmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9wcm9taXNlcy1hcGx1cy9wcm9taXNlcy1zcGVjI3RoZS1wcm9taXNlLXJlc29sdXRpb24tcHJvY2VkdXJlXG4gICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gc2VsZilcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZSBjYW5ub3QgYmUgcmVzb2x2ZWQgd2l0aCBpdHNlbGYuJyk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG5ld1ZhbHVlICYmXG4gICAgICAgICAgICAodHlwZW9mIG5ld1ZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgbmV3VmFsdWUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdmFyIHRoZW4gPSBuZXdWYWx1ZS50aGVuO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuX3N0YXRlID0gMztcbiAgICAgICAgICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIGZpbmFsZShzZWxmKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZG9SZXNvbHZlKGJpbmQodGhlbiwgbmV3VmFsdWUpLCBzZWxmKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5fc3RhdGUgPSAxO1xuICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICBmaW5hbGUoc2VsZik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3Qoc2VsZiwgZSk7XG4gICAgfVxufVxuXG5jb25zdCByZWplY3QgPWZ1bmN0aW9uIChzZWxmLCBuZXdWYWx1ZSkge1xuICAgIHNlbGYuX3N0YXRlID0gMjtcbiAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIGZpbmFsZShzZWxmKTtcbn1cblxuY29uc3QgZmluYWxlID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDIgJiYgc2VsZi5fZGVmZXJyZWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBQcm9taXNlLl9pbW1lZGlhdGVGbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5faGFuZGxlZCkge1xuICAgICAgICAgICAgICAgIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuKHNlbGYuX3ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlbGYuX2RlZmVycmVkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBoYW5kbGUoc2VsZiwgc2VsZi5fZGVmZXJyZWRzW2ldKTtcbiAgICB9XG4gICAgc2VsZi5fZGVmZXJyZWRzID0gbnVsbDtcbn1cblxuY29uc3QgSGFuZGxlciA9IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcHJvbWlzZSkge1xuICAgIHRoaXMub25GdWxmaWxsZWQgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IG51bGw7XG4gICAgdGhpcy5vblJlamVjdGVkID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT09ICdmdW5jdGlvbicgPyBvblJlamVjdGVkIDogbnVsbDtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xufVxuXG4vKipcbiAqIFRha2UgYSBwb3RlbnRpYWxseSBtaXNiZWhhdmluZyByZXNvbHZlciBmdW5jdGlvbiBhbmQgbWFrZSBzdXJlXG4gKiBvbkZ1bGZpbGxlZCBhbmQgb25SZWplY3RlZCBhcmUgb25seSBjYWxsZWQgb25jZS5cbiAqXG4gKiBNYWtlcyBubyBndWFyYW50ZWVzIGFib3V0IGFzeW5jaHJvbnkuXG4gKi9cbmNvbnN0IGRvUmVzb2x2ZSA9IGZ1bmN0aW9uIChmbiwgc2VsZikge1xuICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgZm4oXG4gICAgICAgICAgICBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzZWxmLCB2YWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZWplY3Qoc2VsZiwgcmVhc29uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgcmVqZWN0KHNlbGYsIGV4KTtcbiAgICB9XG59XG5cblByb21pc2VTaGltLnByb3RvdHlwZVsnY2F0Y2gnXSA9IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0ZWQpO1xufTtcblxuUHJvbWlzZVNoaW0ucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgIHZhciBwcm9tID0gbmV3IHRoaXMuY29uc3RydWN0b3Iobm9vcCk7XG5cbiAgICBoYW5kbGUodGhpcywgbmV3IEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb20pKTtcbiAgICByZXR1cm4gcHJvbTtcbn07XG5cblByb21pc2VTaGltLnByb3RvdHlwZVsnZmluYWxseSddID0gcHJvbWlzZUZpbmFsbHk7XG5cblByb21pc2VTaGltLmFsbCA9IGZ1bmN0aW9uKGFycikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKCFhcnIgfHwgdHlwZW9mIGFyci5sZW5ndGggPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZS5hbGwgYWNjZXB0cyBhbiBhcnJheScpO1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJlc29sdmUoW10pO1xuICAgICAgICB2YXIgcmVtYWluaW5nID0gYXJncy5sZW5ndGg7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVzKGksIHZhbCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsICYmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhlbiA9IHZhbC50aGVuO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW4uY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyhpLCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyZ3NbaV0gPSB2YWw7XG4gICAgICAgICAgICAgICAgaWYgKC0tcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXMoaSwgYXJnc1tpXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblByb21pc2VTaGltLnJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICB9KTtcbn07XG5cblByb21pc2VTaGltLnJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZWplY3QodmFsdWUpO1xuICAgIH0pO1xufTtcblxuUHJvbWlzZVNoaW0ucmFjZSA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHZhbHVlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFsdWVzW2ldLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuLy8gVXNlIHBvbHlmaWxsIGZvciBzZXRJbW1lZGlhdGUgZm9yIHBlcmZvcm1hbmNlIGdhaW5zXG5Qcm9taXNlU2hpbS5faW1tZWRpYXRlRm4gPVxuICAgICh0eXBlb2Ygc2V0SW1tZWRpYXRlRnVuYyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHNldEltbWVkaWF0ZUZ1bmMoZm4pO1xuICAgIH0pIHx8XG4gICAgZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgc2V0SW1tZWRpYXRlRnVuYyhmbiwgMCk7XG4gICAgfTtcblxuUHJvbWlzZVNoaW0uX3VuaGFuZGxlZFJlamVjdGlvbkZuID0gZnVuY3Rpb24gX3VuaGFuZGxlZFJlamVjdGlvbkZuKGVycikge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1Bvc3NpYmxlIFVuaGFuZGxlZCBQcm9taXNlIFJlamVjdGlvbjonLCBlcnIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG59O1xuXG5jb25zdCBQcm9taXNlID0gd2luZG93LlByb21pc2UgfHwgKHdpbmRvdy5Qcm9taXNlID0gUHJvbWlzZVNoaW0pO1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZWQgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvbWlzZTsiLCJpbXBvcnQgT3ZlblBsYXllclNESywge2NoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudH0gZnJvbSAnLi9vdmVucGxheWVyLnNkaydcclxuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3L3ZpZXcnO1xyXG5pbXBvcnQgZG9tIGZyb20gJy4vdXRpbHMvcG9seWZpbGxzL2RvbS5qcyc7XHJcbmltcG9ydCB7Z2V0U2NyaXB0UGF0aH0gZnJvbSAndXRpbHMvd2VicGFjayc7XHJcbmltcG9ydCB7Z2V0QnJvd3Nlcn0gZnJvbSAndXRpbHMvYnJvd3Nlcic7XHJcblxyXG5cclxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSBnZXRTY3JpcHRQYXRoKCdvdmVucGxheWVyLmpzJyk7XHJcblxyXG5jb25zdCBPdmVuUGxheWVyID0ge307XHJcbndpbmRvdy5PdmVuUGxheWVyID0gT3ZlblBsYXllcjtcclxuXHJcblxyXG4vKipcclxuICogQ29weSBwcm9wZXJ0aWVzIGZyb20gT3ZlblBsYXllclNESyBvYmplY3QgdG8gT3ZlblBsYXllciBvYmplY3RcclxuICovXHJcbk9iamVjdC5hc3NpZ24oT3ZlblBsYXllciwgT3ZlblBsYXllclNESyk7XHJcblxyXG5PdmVuUGxheWVyLmNyZWF0ZSA9IGZ1bmN0aW9uIChjb250YWluZXIsIG9wdGlvbnMpIHtcclxuICAgIGxldCBicm93c2VyTmFtZSA9IGdldEJyb3dzZXIoKTtcclxuICAgIGlmKGJyb3dzZXJOYW1lID09PSBcImllXCIpe1xyXG5cclxuICAgIH1cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50KGNvbnRhaW5lcik7XHJcbiAgICAvKmNvbnN0IHZpZXcgPSBuZXcgVmlldygpO1xyXG5cclxuICAgIHZpZXcuYXBwZW5kUGxheWVyTWFya3VwKGNvbnRhaW5lckVsZW1lbnQpO1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gT3ZlblBsYXllclNESy5jcmVhdGUodmlldy5nZXRNZWRpYUVsZW1lbnRDb250YWluZXIoKSwgb3B0aW9ucyk7XHJcblxyXG5cclxuICAgIHZpZXcuYWRkQ29tcG9uZW50c0FuZEZ1bmN0aW9ucyhwbGF5ZXJJbnN0YW5jZSwgb3B0aW9ucyk7Ki9cclxuXHJcblxyXG4gICAgdmFyIHBsYXllciA9IFZpZXcoY29udGFpbmVyRWxlbWVudCk7XHJcblxyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gT3ZlblBsYXllclNESy5jcmVhdGUocGxheWVyLmdldE1lZGlhRWxlbWVudENvbnRhaW5lcigpLCBvcHRpb25zKTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKHBsYXllckluc3RhbmNlLCB7XHJcbiAgICAgICAgZ2V0Q29udGFpbmVySWQgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgIHJldHVybiBjb250YWluZXJFbGVtZW50LmlkO1xyXG4gICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcGxheWVyLnNldEFwaShwbGF5ZXJJbnN0YW5jZSk7XHJcblxyXG5cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKGNvbnRhaW5lckVsZW1lbnQpO1xyXG5cclxuXHJcbiAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XHJcbn1cclxuXHJcbiIsImltcG9ydCBBUEkgZnJvbSAnYXBpL0FwaSc7XHJcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gJ3V0aWxzL3ZhbGlkYXRvcic7XHJcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xyXG5pbXBvcnQgTGEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcbmltcG9ydCB7Z2V0U2NyaXB0UGF0aH0gZnJvbSAndXRpbHMvd2VicGFjayc7XHJcblxyXG5cclxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSBnZXRTY3JpcHRQYXRoKCdvdmVucGxheWVyLnNkay5qcycpO1xyXG5cclxuLyoqXHJcbiAqIE1haW4gT3ZlblBsYXllclNESyBvYmplY3RcclxuICovXHJcbmNvbnN0IE92ZW5QbGF5ZXJTREsgPSB3aW5kb3cuT3ZlblBsYXllclNESyA9IHt9O1xyXG5cclxuY29uc3QgdmVyc2lvbiA9ICcwLjAuMSc7XHJcblxyXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblxyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuXHJcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XHJcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSkge1xyXG5cclxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgcGxheWVyIGluc3RhbmNlIGFuZCByZXR1cm4gaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmcgfCBkb20gZWxlbWVudH0gY29udGFpbmVyICBJZCBvZiBjb250YWluZXIgZWxlbWVudCBvciBjb250YWluZXIgZWxlbWVudFxyXG4gKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zICBUaGUgb3B0aW9uc1xyXG4gKi9cclxuT3ZlblBsYXllclNESy5jcmVhdGUgPSBmdW5jdGlvbihjb250YWluZXIsIG9wdGlvbnMpIHtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudChjb250YWluZXIpO1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gQVBJKGNvbnRhaW5lckVsZW1lbnQpO1xyXG4gICAgcGxheWVySW5zdGFuY2UuaW5pdChvcHRpb25zKTtcclxuXHJcbiAgICBwbGF5ZXJMaXN0LnB1c2gocGxheWVySW5zdGFuY2UpO1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgbGlzdC5cclxuICpcclxuICogQHJldHVybiAgICAge2FycmF5fSAgVGhlIHBsYXllciBsaXN0LlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckxpc3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGNvbnRhaW5lciBpZC5cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZ30gIGNvbnRhaW5lcklkICBUaGUgY29udGFpbmVyIGlkZW50aWZpZXJcclxuICogQHJldHVybiAgICAge29iZWplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlDb250YWluZXJJZCA9IGZ1bmN0aW9uKGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgTGEkXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGxheWVyTGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGluZGV4LlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcclxuICogQHJldHVybiAgICAge29iamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IHBsYXllckxpc3RbaW5kZXhdO1xyXG5cclxuICAgIGlmIChwbGF5ZXJJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSB3ZWJydGMgc291cmNlIGZvciBwbGF5ZXIgc291cmNlIHR5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtPYmplY3QgfCBBcnJheX0gIHNvdXJjZSAgIHdlYnJ0YyBzb3VyY2VcclxuICogQHJldHVybiAgICAge0FycmF5fSAgUGxheWVyIHNvdXJjZSBPYmVqY3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdlbmVyYXRlV2VicnRjVXJscyA9IGZ1bmN0aW9uKHNvdXJjZXMpIHtcclxuICAgIHJldHVybiAoXy5pc0FycmF5KHNvdXJjZXMpID8gc291cmNlcyA6IFtzb3VyY2VzXSkubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpe1xyXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIGlzV2ViUlRDKHNvdXJjZS5ob3N0KSAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XHJcbiAgICAgICAgICAgIHJldHVybiB7ZmlsZSA6IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9cIiArIHNvdXJjZS5zdHJlYW0sIHR5cGUgOiBcIndlYnJ0Y1wiLCBsYWJlbCA6IHNvdXJjZS5sYWJlbCA/IHNvdXJjZS5sYWJlbCA6IFwid2VicnRjLVwiKyhpbmRleCsxKSB9O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgT3ZlblBsYXllclNESztcclxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxuICovXG5cblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXIgPSBmdW5jdGlvbigpe1xuICAgIGlmKChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPcGVyYVwiKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUicpKSAhPSAtMSApe1xuICAgICAgICByZXR1cm4gJ29wZXJhJztcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIikgIT0gLTEgKXtcbiAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlNhZmFyaVwiKSAhPSAtMSl7XG4gICAgICAgIHJldHVybiAnc2FmYXJpJztcbiAgICB9ZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpICE9IC0xICl7XG4gICAgICAgIHJldHVybiAnZmlyZWZveCc7XG4gICAgfWVsc2UgaWYoKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIikgIT0gLTEgKSl7XG4gICAgICAgIGxldCBtc2llID0gYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpO1xuICAgICAgICBpZighIWRvY3VtZW50LmRvY3VtZW50TW9kZSA9PSB0cnVlICl7XG4gICAgICAgICAgICByZXR1cm4gJ2llJztcbiAgICAgICAgfWVsc2UgaWYoISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LipydlxcOjExXFwuLykpe1xuICAgICAgICAgICAgaWYgKCFpc05hTihwYXJzZUludCh1YS5zdWJzdHJpbmcobXNpZSArIDUsIHVhLmluZGV4T2YoXCIuXCIsIG1zaWUpKSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpZSc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XG4gICAgICAgIH1cblxuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xuICAgIH1cblxufTtcblxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIEl0IHdhcyByZXBsYWNlIGpxdWVyeSdzIHNlbGVjdG9yLiBJdCBPZnRlbiB1c2VkIGJ5IE92ZW5UZW1wbGF0ZS4gKC92aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUuanMpXHJcbiAqIEBwYXJhbSAgIHNlbGVjdG9yT3JFbGVtZW50ICBzdHJpbmcgb3IgZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IExhJCA9IGZ1bmN0aW9uKHNlbGVjdG9yT3JFbGVtZW50KXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGNvbnN0IHJldHVybk5vZGUgPSBmdW5jdGlvbigkZWxlbWVudCAsIHNlbGVjdG9yKXtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSAgJGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgaWYobm9kZUxpc3QubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCAkZWxlbWVudCA9IFwiXCI7XHJcblxyXG4gICAgaWYoIF8uZXZlcnkoc2VsZWN0b3JPckVsZW1lbnQsIGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBfLmlzRWxlbWVudChpdGVtKX0pKXtcclxuICAgICAgICAkZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xyXG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwiZG9jdW1lbnRcIil7XHJcbiAgICAgICAgJGVsZW1lbnQgPSBkb2N1bWVudDtcclxuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcIndpbmRvd1wiKXtcclxuICAgICAgICAkZWxlbWVudCA9IHdpbmRvdztcclxuICAgIH1lbHNle1xyXG4gICAgICAgICRlbGVtZW50ID0gcmV0dXJuTm9kZShkb2N1bWVudCwgc2VsZWN0b3JPckVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZighJGVsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZmluZCA9IChzZWxlY3RvcikgPT57XHJcbiAgICAgICAgcmV0dXJuIExhJChyZXR1cm5Ob2RlKCRlbGVtZW50LCBzZWxlY3RvcikpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNzcyA9IChuYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hZGRDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9ICRlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGlmKGNsYXNzTmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIFwiICsgbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2xhc3MgPSAobmFtZSkgPT57XHJcbiAgICAgICAgaWYgKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSA9ICRlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBuYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2hvdyA9ICgpID0+e1xyXG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmhpZGUgPSAoKSA9PntcclxuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFwcGVuZCA9IChodG1sQ29kZSkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MICs9IGh0bWxDb2RlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnRleHQgPSAodGV4dCkgPT4geyAvL0lFOCtcclxuICAgICAgICBpZih0ZXh0KXtcclxuICAgICAgICAgICAgJGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0Lmhhc0NsYXNzID0gKG5hbWUpID0+IHsgLy9JRTgrXHJcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIG5hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KCRlbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pcyA9ICgkdGFyZ2V0RWxlbWVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudCA9PT0gJHRhcmdldEVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQub2Zmc2V0ID0gKCkgPT57ICAgIC8vSUU4K1xyXG4gICAgICAgIHZhciByZWN0ID0gJGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcclxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LndpZHRoID0gKCkgPT4geyAgICAvL0lFOCtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGVpZ2h0ID0gKCkgPT4geyAgIC8vSUU4K1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXR0ciA9IChhdHRyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7ICAgLy9JRTgrXHJcbiAgICAgICAgJGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkZWxlbWVudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVwbGFjZSA9IChodG1sKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVwbGFjZVdpdGgoaHRtbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWwpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5hcHBlbmRDaGlsZChodG1sKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jbG9zZXN0ID0gKHNlbGVjdG9yU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JTdHJpbmcpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhJDtcclxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMjQuLlxuICovXG5cbmNvbnN0IGxvZ2dlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBwcmV2Q29uc29sZUxvZyA9IG51bGw7XG5cbiAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogd2luZG93Wydjb25zb2xlJ11bJ2xvZyddfTtcblxuICAgIHRoYXQuZW5hYmxlID0gKCkgPT57XG4gICAgICAgIGlmKHByZXZDb25zb2xlTG9nID09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IHByZXZDb25zb2xlTG9nO1xuICAgIH07XG4gICAgdGhhdC5kaXNhYmxlID0gKCkgPT57XG4gICAgICAgIHByZXZDb25zb2xlTG9nID0gY29uc29sZS5sb2c7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IGZ1bmN0aW9uKCl7fTtcbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyOyIsIi8qXHJcbiogQ29weXJpZ2h0IDIwMTggSm9zaHVhIEJlbGxcclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxyXG4qICovXHJcblxyXG4oZnVuY3Rpb24oZ2xvYmFsKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBpZiAoISgnd2luZG93JyBpbiBnbG9iYWwgJiYgJ2RvY3VtZW50JyBpbiBnbG9iYWwpKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vXHJcbiAgICAvLyBET01cclxuICAgIC8vIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy9cclxuICAgIC8vXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLyBEb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsIG1ldGhvZFxyXG4gICAgLy8gaHR0cDovL2FqYXhpYW4uY29tL2FyY2hpdmVzL2NyZWF0aW5nLWEtcXVlcnlzZWxlY3Rvci1mb3ItaWUtdGhhdC1ydW5zLWF0LW5hdGl2ZS1zcGVlZFxyXG4gICAgLy8gTmVlZGVkIGZvcjogSUU3LVxyXG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCA9IGZ1bmN0aW9uKHNlbGVjdG9ycykge1xyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpLCBlbGVtZW50cyA9IFtdLCBlbGVtZW50O1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZmlyc3RDaGlsZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50Ll9xc2EgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHNlbGVjdG9ycyArICd7eC1xc2E6ZXhwcmVzc2lvbihkb2N1bWVudC5fcXNhICYmIGRvY3VtZW50Ll9xc2EucHVzaCh0aGlzKSl9JztcclxuICAgICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIDApO1xyXG4gICAgICAgICAgICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChkb2N1bWVudC5fcXNhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50Ll9xc2Euc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlQXR0cmlidXRlKCd4LXFzYScpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChlbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb2N1bWVudC5fcXNhID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRG9jdW1lbnQucXVlcnlTZWxlY3RvciBtZXRob2RcclxuICAgIC8vIE5lZWRlZCBmb3I6IElFNy1cclxuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3Rvcikge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgPSBmdW5jdGlvbihzZWxlY3RvcnMpIHtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGVsZW1lbnRzLmxlbmd0aCkgPyBlbGVtZW50c1swXSA6IG51bGw7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lIG1ldGhvZFxyXG4gICAgLy8gTmVlZGVkIGZvcjogSUU4LVxyXG4gICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IGZ1bmN0aW9uKGNsYXNzTmFtZXMpIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lcyA9IFN0cmluZyhjbGFzc05hbWVzKS5yZXBsYWNlKC9efFxccysvZywgJy4nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2xhc3NOYW1lcyk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBOb2RlIGludGVyZmFjZSBjb25zdGFudHNcclxuICAgIC8vIE5lZWRlZCBmb3I6IElFOC1cclxuICAgIGdsb2JhbC5Ob2RlID0gZ2xvYmFsLk5vZGUgfHwgZnVuY3Rpb24oKSB7IHRocm93IFR5cGVFcnJvcihcIklsbGVnYWwgY29uc3RydWN0b3JcIik7IH07XHJcbiAgICBbXHJcbiAgICAgICAgWydFTEVNRU5UX05PREUnLCAxXSxcclxuICAgICAgICBbJ0FUVFJJQlVURV9OT0RFJywgMl0sXHJcbiAgICAgICAgWydURVhUX05PREUnLCAzXSxcclxuICAgICAgICBbJ0NEQVRBX1NFQ1RJT05fTk9ERScsIDRdLFxyXG4gICAgICAgIFsnRU5USVRZX1JFRkVSRU5DRV9OT0RFJywgNV0sXHJcbiAgICAgICAgWydFTlRJVFlfTk9ERScsIDZdLFxyXG4gICAgICAgIFsnUFJPQ0VTU0lOR19JTlNUUlVDVElPTl9OT0RFJywgN10sXHJcbiAgICAgICAgWydDT01NRU5UX05PREUnLCA4XSxcclxuICAgICAgICBbJ0RPQ1VNRU5UX05PREUnLCA5XSxcclxuICAgICAgICBbJ0RPQ1VNRU5UX1RZUEVfTk9ERScsIDEwXSxcclxuICAgICAgICBbJ0RPQ1VNRU5UX0ZSQUdNRU5UX05PREUnLCAxMV0sXHJcbiAgICAgICAgWydOT1RBVElPTl9OT0RFJywgMTJdXHJcbiAgICBdLmZvckVhY2goZnVuY3Rpb24ocCkgeyBpZiAoIShwWzBdIGluIGdsb2JhbC5Ob2RlKSkgZ2xvYmFsLk5vZGVbcFswXV0gPSBwWzFdOyB9KTtcclxuXHJcbiAgICAvLyBET01FeGNlcHRpb24gY29uc3RhbnRzXHJcbiAgICAvLyBOZWVkZWQgZm9yOiBJRTgtXHJcbiAgICBnbG9iYWwuRE9NRXhjZXB0aW9uID0gZ2xvYmFsLkRPTUV4Y2VwdGlvbiB8fCBmdW5jdGlvbigpIHsgdGhyb3cgVHlwZUVycm9yKFwiSWxsZWdhbCBjb25zdHJ1Y3RvclwiKTsgfTtcclxuICAgIFtcclxuICAgICAgICBbJ0lOREVYX1NJWkVfRVJSJywgMV0sXHJcbiAgICAgICAgWydET01TVFJJTkdfU0laRV9FUlInLCAyXSxcclxuICAgICAgICBbJ0hJRVJBUkNIWV9SRVFVRVNUX0VSUicsIDNdLFxyXG4gICAgICAgIFsnV1JPTkdfRE9DVU1FTlRfRVJSJywgNF0sXHJcbiAgICAgICAgWydJTlZBTElEX0NIQVJBQ1RFUl9FUlInLCA1XSxcclxuICAgICAgICBbJ05PX0RBVEFfQUxMT1dFRF9FUlInLCA2XSxcclxuICAgICAgICBbJ05PX01PRElGSUNBVElPTl9BTExPV0VEX0VSUicsIDddLFxyXG4gICAgICAgIFsnTk9UX0ZPVU5EX0VSUicsIDhdLFxyXG4gICAgICAgIFsnTk9UX1NVUFBPUlRFRF9FUlInLCA5XSxcclxuICAgICAgICBbJ0lOVVNFX0FUVFJJQlVURV9FUlInLCAxMF0sXHJcbiAgICAgICAgWydJTlZBTElEX1NUQVRFX0VSUicsIDExXSxcclxuICAgICAgICBbJ1NZTlRBWF9FUlInLCAxMl0sXHJcbiAgICAgICAgWydJTlZBTElEX01PRElGSUNBVElPTl9FUlInLCAxM10sXHJcbiAgICAgICAgWydOQU1FU1BBQ0VfRVJSJywgMTRdLFxyXG4gICAgICAgIFsnSU5WQUxJRF9BQ0NFU1NfRVJSJywgMTVdXHJcbiAgICBdLmZvckVhY2goZnVuY3Rpb24ocCkgeyBpZiAoIShwWzBdIGluIGdsb2JhbC5ET01FeGNlcHRpb24pKSBnbG9iYWwuRE9NRXhjZXB0aW9uW3BbMF1dID0gcFsxXTsgfSk7XHJcblxyXG4gICAgLy8gRXZlbnQgYW5kIEV2ZW50VGFyZ2V0cyBpbnRlcmZhY2VzXHJcbiAgICAvLyBOZWVkZWQgZm9yOiBJRThcclxuICAgIChmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmICghKCdFbGVtZW50JyBpbiBnbG9iYWwpIHx8IEVsZW1lbnQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgfHwgIU9iamVjdC5kZWZpbmVQcm9wZXJ0eSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBpbnRlcmZhY2UgRXZlbnRcclxuXHJcbiAgICAgICAgLy8gUGhhc2VUeXBlIChjb25zdCB1bnNpZ25lZCBzaG9ydClcclxuICAgICAgICBFdmVudC5DQVBUVVJJTkdfUEhBU0UgPSAxO1xyXG4gICAgICAgIEV2ZW50LkFUX1RBUkdFVCAgICAgICA9IDI7XHJcbiAgICAgICAgRXZlbnQuQlVCQkxJTkdfUEhBU0UgID0gMztcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoRXZlbnQucHJvdG90eXBlLCB7XHJcbiAgICAgICAgICAgIENBUFRVUklOR19QSEFTRTogeyBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gMTsgfSB9LFxyXG4gICAgICAgICAgICBBVF9UQVJHRVQ6ICAgICAgIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIDI7IH0gfSxcclxuICAgICAgICAgICAgQlVCQkxJTkdfUEhBU0U6ICAgeyBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gMzsgfSB9LFxyXG4gICAgICAgICAgICB0YXJnZXQ6IHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3JjRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIH19LFxyXG4gICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgfX0sXHJcbiAgICAgICAgICAgIGV2ZW50UGhhc2U6IHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLnNyY0VsZW1lbnQgPT09IHRoaXMuY3VycmVudFRhcmdldCkgPyBFdmVudC5BVF9UQVJHRVQgOiBFdmVudC5CVUJCTElOR19QSEFTRTtcclxuICAgICAgICAgICAgICAgIH19LFxyXG4gICAgICAgICAgICBidWJibGVzOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1vdXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGJsY2xpY2snOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZXVwJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2VvdmVyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW91c2VvdXQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZXdoZWVsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gS2V5Ym9hcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAna2V5ZG93bic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2tleXByZXNzJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAna2V5dXAnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGcmFtZS9PYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVzaXplJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2Nyb2xsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZWxlY3QnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjaGFuZ2UnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdWJtaXQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXNldCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfX0sXHJcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTW91c2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2xpY2snOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkYmxjbGljayc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNlZG93bic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNldXAnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZW92ZXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb3VzZW91dCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNld2hlZWwnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBLZXlib2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdrZXlkb3duJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAna2V5cHJlc3MnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdrZXl1cCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3VibWl0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9fSxcclxuICAgICAgICAgICAgdGltZVN0YW1wOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90aW1lU3RhbXA7XHJcbiAgICAgICAgICAgICAgICB9fSxcclxuICAgICAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfX0sXHJcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfX0sXHJcbiAgICAgICAgICAgIGRlZmF1bHRQcmV2ZW50ZWQ6IHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmV0dXJuVmFsdWUgPT09IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gaW50ZXJmYWNlIEV2ZW50VGFyZ2V0XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ0RPTUNvbnRlbnRMb2FkZWQnKSB0eXBlID0gJ2xvYWQnO1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGYgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLl90aW1lU3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgZS5fY3VycmVudFRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmNhbGwodGhpcywgZSk7XHJcbiAgICAgICAgICAgICAgICBlLl9jdXJyZW50VGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpc1snXycgKyB0eXBlICsgbGlzdGVuZXJdID0gZjtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdET01Db250ZW50TG9hZGVkJykgdHlwZSA9ICdsb2FkJztcclxuICAgICAgICAgICAgdmFyIGYgPSB0aGlzWydfJyArIHR5cGUgKyBsaXN0ZW5lcl07XHJcbiAgICAgICAgICAgIGlmIChmKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCBmKTtcclxuICAgICAgICAgICAgICAgIHRoaXNbJ18nICsgdHlwZSArIGxpc3RlbmVyXSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFtXaW5kb3csIEhUTUxEb2N1bWVudCwgRWxlbWVudF0uZm9yRWFjaChmdW5jdGlvbihvKSB7XHJcbiAgICAgICAgICAgIG8ucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBhZGRFdmVudExpc3RlbmVyO1xyXG4gICAgICAgICAgICBvLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gcmVtb3ZlRXZlbnRMaXN0ZW5lcjtcclxuICAgICAgICB9KTtcclxuICAgIH0oKSk7XHJcblxyXG4gICAgLy8gQ3VzdG9tRXZlbnRcclxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudC9DdXN0b21FdmVudFxyXG4gICAgLy8gTmVlZGVkIGZvcjogSUVcclxuICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCdDdXN0b21FdmVudCcgaW4gZ2xvYmFsICYmIHR5cGVvZiBnbG9iYWwuQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGZ1bmN0aW9uIEN1c3RvbUV2ZW50ICggZXZlbnQsIHBhcmFtcyApIHtcclxuICAgICAgICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZCB9O1xyXG4gICAgICAgICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoICdDdXN0b21FdmVudCcgKTtcclxuICAgICAgICAgICAgZXZ0LmluaXRDdXN0b21FdmVudCggZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCApO1xyXG4gICAgICAgICAgICByZXR1cm4gZXZ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSBnbG9iYWwuRXZlbnQucHJvdG90eXBlO1xyXG4gICAgICAgIGdsb2JhbC5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvLyBTaGltIGZvciBET00gRXZlbnRzIGZvciBJRTctXHJcbiAgICAvLyBodHRwOi8vd3d3LnF1aXJrc21vZGUub3JnL2Jsb2cvYXJjaGl2ZXMvMjAwNS8xMC9fYW5kX3RoZV93aW5uZXJfMS5odG1sXHJcbiAgICAvLyBVc2UgYWRkRXZlbnQob2JqZWN0LCBldmVudCwgaGFuZGxlcikgaW5zdGVhZCBvZiBvYmplY3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcilcclxuICAgIHdpbmRvdy5hZGRFdmVudCA9IGZ1bmN0aW9uKG9iaiwgdHlwZSwgZm4pIHtcclxuICAgICAgICBpZiAob2JqLmFkZEV2ZW50TGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgb2JqLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG9iai5hdHRhY2hFdmVudCkge1xyXG4gICAgICAgICAgICBvYmpbXCJlXCIgKyB0eXBlICsgZm5dID0gZm47XHJcbiAgICAgICAgICAgIG9ialt0eXBlICsgZm5dID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSA9IHdpbmRvdy5ldmVudDtcclxuICAgICAgICAgICAgICAgIGUuY3VycmVudFRhcmdldCA9IG9iajtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbigpIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9O1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24gPSBmdW5jdGlvbigpIHsgZS5jYW5jZWxCdWJibGUgPSB0cnVlOyB9O1xyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQgPSBlLnNyY0VsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBlLnRpbWVTdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICBvYmpbXCJlXCIgKyB0eXBlICsgZm5dLmNhbGwodGhpcywgZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG9iai5hdHRhY2hFdmVudChcIm9uXCIgKyB0eXBlLCBvYmpbdHlwZSArIGZuXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihvYmosIHR5cGUsIGZuKSB7XHJcbiAgICAgICAgaWYgKG9iai5yZW1vdmVFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIG9iai5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChvYmouZGV0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgb2JqLmRldGFjaEV2ZW50KFwib25cIiArIHR5cGUsIG9ialt0eXBlICsgZm5dKTtcclxuICAgICAgICAgICAgb2JqW3R5cGUgKyBmbl0gPSBudWxsO1xyXG4gICAgICAgICAgICBvYmpbXCJlXCIgKyB0eXBlICsgZm5dID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERPTVRva2VuTGlzdCBpbnRlcmZhY2UgYW5kIEVsZW1lbnQuY2xhc3NMaXN0IC8gRWxlbWVudC5yZWxMaXN0XHJcbiAgICAvLyBOZWVkZWQgZm9yOiBJRTktXHJcbiAgICAvLyBVc2UgZ2V0Q2xhc3NMaXN0KGVsZW0pIGluc3RlYWQgb2YgZWxlbS5jbGFzc0xpc3QoKSBpZiBJRTctIHN1cHBvcnQgaXMgbmVlZGVkXHJcbiAgICAvLyBVc2UgZ2V0UmVsTGlzdChlbGVtKSBpbnN0ZWFkIG9mIGVsZW0ucmVsTGlzdCgpIGlmIElFNy0gc3VwcG9ydCBpcyBuZWVkZWRcclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICBmdW5jdGlvbiBET01Ub2tlbkxpc3RTaGltKG8sIHApIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gc3BsaXQocykgeyByZXR1cm4gcy5sZW5ndGggPyBzLnNwbGl0KC9cXHMrL2cpIDogW107IH1cclxuXHJcbiAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgZG9lcyBub3QgZXhhY3RseSBtYXRjaCB0aGUgc3BlYy5cclxuICAgICAgICAgICAgZnVuY3Rpb24gcmVtb3ZlVG9rZW5Gcm9tU3RyaW5nKHRva2VuLCBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBzcGxpdChzdHJpbmcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gdG9rZW5zLmluZGV4T2YodG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2Vucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2Vucy5qb2luKCcgJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFxyXG4gICAgICAgICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHNwbGl0KG9bcF0pLmxlbmd0aDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKGlkeCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IHNwbGl0KG9bcF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDAgPD0gaWR4ICYmIGlkeCA8IHRva2Vucy5sZW5ndGggPyB0b2tlbnNbaWR4XSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb250YWluczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24odG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gU3RyaW5nKHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi5sZW5ndGggPT09IDApIHsgdGhyb3cgU3ludGF4RXJyb3IoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9cXHMvLnRlc3QodG9rZW4pKSB7IHRocm93IEVycm9yKFwiSW52YWxpZENoYXJhY3RlckVycm9yXCIpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gc3BsaXQob1twXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2Vucy5pbmRleE9mKHRva2VuKSAhPT0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhZGQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKC8qdG9rZW5zLi4uKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLm1hcChTdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2Vucy5zb21lKGZ1bmN0aW9uKHRva2VuKSB7IHJldHVybiB0b2tlbi5sZW5ndGggPT09IDA7IH0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgU3ludGF4RXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbnMuc29tZShmdW5jdGlvbih0b2tlbikgeyByZXR1cm4gKC9cXHMvKS50ZXN0KHRva2VuKTsgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIkludmFsaWRDaGFyYWN0ZXJFcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1bmRlcmx5aW5nX3N0cmluZyA9IG9bcF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuX2xpc3QgPSBzcGxpdCh1bmRlcmx5aW5nX3N0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5zID0gdG9rZW5zLmZpbHRlcihmdW5jdGlvbih0b2tlbikgeyByZXR1cm4gdG9rZW5fbGlzdC5pbmRleE9mKHRva2VuKSA9PT0gLTE7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVuZGVybHlpbmdfc3RyaW5nLmxlbmd0aCAhPT0gMCAmJiAhKC9cXHMkLykudGVzdCh1bmRlcmx5aW5nX3N0cmluZykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZXJseWluZ19zdHJpbmcgKz0gJyAnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlcmx5aW5nX3N0cmluZyArPSB0b2tlbnMuam9pbignICcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bcF0gPSB1bmRlcmx5aW5nX3N0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHNwbGl0KG9bcF0pLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggIT09IGxlbmd0aCkgeyB0aGlzLmxlbmd0aCA9IGxlbmd0aDsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbigvKnRva2Vucy4uLiovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5tYXAoU3RyaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbnMuc29tZShmdW5jdGlvbih0b2tlbikgeyByZXR1cm4gdG9rZW4ubGVuZ3RoID09PSAwOyB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFN5bnRheEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5zLnNvbWUoZnVuY3Rpb24odG9rZW4pIHsgcmV0dXJuICgvXFxzLykudGVzdCh0b2tlbik7IH0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJJbnZhbGlkQ2hhcmFjdGVyRXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdW5kZXJseWluZ19zdHJpbmcgPSBvW3BdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2Vucy5mb3JFYWNoKGZ1bmN0aW9uKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybHlpbmdfc3RyaW5nID0gcmVtb3ZlVG9rZW5Gcm9tU3RyaW5nKHRva2VuLCB1bmRlcmx5aW5nX3N0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb1twXSA9IHVuZGVybHlpbmdfc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gc3BsaXQob1twXSkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCAhPT0gbGVuZ3RoKSB7IHRoaXMubGVuZ3RoID0gbGVuZ3RoOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKHRva2VuLyosIGZvcmNlKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JjZSA9IGFyZ3VtZW50c1sxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBTdHJpbmcodG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi5sZW5ndGggPT09IDApIHsgdGhyb3cgU3ludGF4RXJyb3IoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvXFxzLy50ZXN0KHRva2VuKSkgeyB0aHJvdyBFcnJvcihcIkludmFsaWRDaGFyYWN0ZXJFcnJvclwiKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBzcGxpdChvW3BdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB0b2tlbnMuaW5kZXhPZih0b2tlbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEgJiYgKCFmb3JjZSB8fCBmb3JjZSA9PT0gKHZvaWQgMCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bcF0gPSByZW1vdmVUb2tlbkZyb21TdHJpbmcodG9rZW4sIG9bcF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEgJiYgZm9yY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1bmRlcmx5aW5nX3N0cmluZyA9IG9bcF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVuZGVybHlpbmdfc3RyaW5nLmxlbmd0aCAhPT0gMCAmJiAhL1xccyQvLnRlc3QodW5kZXJseWluZ19zdHJpbmcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVybHlpbmdfc3RyaW5nICs9ICcgJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZXJseWluZ19zdHJpbmcgKz0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb1twXSA9IHVuZGVybHlpbmdfc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gc3BsaXQob1twXSkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCAhPT0gbGVuZ3RoKSB7IHRoaXMubGVuZ3RoID0gbGVuZ3RoOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b1N0cmluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb1twXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoISgnbGVuZ3RoJyBpbiB0aGlzKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSW4gY2FzZSBnZXR0ZXJzIGFyZSBub3Qgc3VwcG9ydGVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IHNwbGl0KG9bcF0pLmxlbmd0aDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZXkgYXJlLCBzaGltIGluIGluZGV4IGdldHRlcnMgKHVwIHRvIDEwMClcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTAwOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgU3RyaW5nKGkpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldDogKGZ1bmN0aW9uKG4pIHsgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5pdGVtKG4pOyB9OyB9KGkpKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRUb0VsZW1lbnRQcm90b3R5cGUocCwgZikge1xyXG4gICAgICAgICAgICBpZiAoJ0VsZW1lbnQnIGluIGdsb2JhbCAmJiBFbGVtZW50LnByb3RvdHlwZSAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFbGVtZW50LnByb3RvdHlwZSwgcCwgeyBnZXQ6IGYgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEhUTUwgLSBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnXHJcbiAgICAgICAgLy8gRWxlbWVudC5jbGFzc0xpc3RcclxuICAgICAgICBpZiAoJ2NsYXNzTGlzdCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5nZXRDbGFzc0xpc3QgPSBmdW5jdGlvbihlbGVtKSB7IHJldHVybiBlbGVtLmNsYXNzTGlzdDsgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cuZ2V0Q2xhc3NMaXN0ID0gZnVuY3Rpb24oZWxlbSkgeyByZXR1cm4gbmV3IERPTVRva2VuTGlzdFNoaW0oZWxlbSwgJ2NsYXNzTmFtZScpOyB9O1xyXG4gICAgICAgICAgICBhZGRUb0VsZW1lbnRQcm90b3R5cGUoJ2NsYXNzTGlzdCcsIGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3IERPTVRva2VuTGlzdFNoaW0odGhpcywgJ2NsYXNzTmFtZScpOyB9ICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBIVE1MIC0gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZ1xyXG4gICAgICAgIC8vIEhUTUxBbmNob3JFbGVtZW50LnJlbExpc3RcclxuICAgICAgICAvLyBIVE1MTGlua0VsZW1lbnQucmVsTGlzdFxyXG4gICAgICAgIGlmICgncmVsTGlzdCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5nZXRSZWxMaXN0ID0gZnVuY3Rpb24oZWxlbSkgeyByZXR1cm4gZWxlbS5yZWxMaXN0OyB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5nZXRSZWxMaXN0ID0gZnVuY3Rpb24oZWxlbSkgeyByZXR1cm4gbmV3IERPTVRva2VuTGlzdFNoaW0oZWxlbSwgJ3JlbCcpOyB9O1xyXG4gICAgICAgICAgICBhZGRUb0VsZW1lbnRQcm90b3R5cGUoJ3JlbExpc3QnLCBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBET01Ub2tlbkxpc3RTaGltKHRoaXMsICdyZWwnKTsgfSApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIHNlY29uZCBhcmd1bWVudCB0byBuYXRpdmUgRE9NVG9rZW5MaXN0LnRvZ2dsZSgpIGlmIG5lY2Vzc2FyeVxyXG4gICAgICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCEoJ0RPTVRva2VuTGlzdCcgaW4gZ2xvYmFsKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgaWYgKCEoJ2NsYXNzTGlzdCcgaW4gZSkpIHJldHVybjtcclxuICAgICAgICAgICAgZS5jbGFzc0xpc3QudG9nZ2xlKCd4JywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoIWUuY2xhc3NMaXN0LmNvbnRhaW5zKCd4JykpIHJldHVybjtcclxuICAgICAgICAgICAgZ2xvYmFsLkRPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gdG9nZ2xlKHRva2VuLyosIGZvcmNlKi8pIHtcclxuICAgICAgICAgICAgICAgIHZhciBmb3JjZSA9IGFyZ3VtZW50c1sxXTtcclxuICAgICAgICAgICAgICAgIGlmIChmb3JjZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFkZCA9ICF0aGlzLmNvbnRhaW5zKHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2FkZCA/ICdhZGQnIDogJ3JlbW92ZSddKHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWRkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yY2UgPSAhIWZvcmNlO1xyXG4gICAgICAgICAgICAgICAgdGhpc1tmb3JjZSA/ICdhZGQnIDogJ3JlbW92ZSddKHRva2VuKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JjZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KCkpO1xyXG5cclxuXHJcbiAgICAgICAgLy8gRE9NIC0gSW50ZXJmYWNlIE5vbkRvY3VtZW50VHlwZUNoaWxkTm9kZVxyXG4gICAgICAgIC8vIEludGVyZmFjZSBOb25Eb2N1bWVudFR5cGVDaGlsZE5vZGVcclxuICAgICAgICAvLyBwcmV2aW91c0VsZW1lbnRTaWJsaW5nIC8gbmV4dEVsZW1lbnRTaWJsaW5nIC0gZm9yIElFOFxyXG5cclxuICAgICAgICBpZiAoISgncHJldmlvdXNFbGVtZW50U2libGluZycgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICBhZGRUb0VsZW1lbnRQcm90b3R5cGUoJ3ByZXZpb3VzRWxlbWVudFNpYmxpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuID0gdGhpcy5wcmV2aW91c1NpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobiAmJiBuLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSlcclxuICAgICAgICAgICAgICAgICAgICBuID0gbi5wcmV2aW91c1NpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoISgnbmV4dEVsZW1lbnRTaWJsaW5nJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIGFkZFRvRWxlbWVudFByb3RvdHlwZSgnbmV4dEVsZW1lbnRTaWJsaW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbiA9IHRoaXMubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobiAmJiBuLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSlcclxuICAgICAgICAgICAgICAgICAgICBuID0gbi5uZXh0U2libGluZztcclxuICAgICAgICAgICAgICAgIHJldHVybiBuO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KCkpO1xyXG5cclxuICAgIC8vIEVsZW1lbnQubWF0Y2hlc1xyXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvQVBJL0VsZW1lbnQvbWF0Y2hlc1xyXG4gICAgLy8gTmVlZGVkIGZvcjogSUUsIEZpcmVmb3ggMy42LCBlYXJseSBXZWJraXQgYW5kIE9wZXJhIDE1LjBcclxuICAgIC8vIFVzZSBtc01hdGNoZXNTZWxlY3RvcihzZWxlY3RvcikgZm9yIElFXHJcbiAgICAvLyBVc2Ugb01hdGNoZXNTZWxlY3RvcihzZWxlY3RvcikgZm9yIE9wZXJhIDE1LjBcclxuICAgIC8vIFVzZSBtb3pNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpIGZvciBGaXJlZm94IDMuNlxyXG4gICAgLy8gVXNlIHdlYmtpdE1hdGNoZXNTZWxlY3RvcihzZWxlY3RvcikgZm9yIGVhcmx5IFdlYmtpdFxyXG4gICAgLy8gVXNlIHBvbHlmaWxsIGlmIG5vIG1hdGNoZXMoKSBzdXBwb3J0LCBidXQgcXVlcnlTZWxlY3RvckFsbCgpIHN1cHBvcnRcclxuICAgIGlmICgnRWxlbWVudCcgaW4gZ2xvYmFsICYmICFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XHJcbiAgICAgICAgaWYgKEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvcjtcclxuICAgICAgICB9IGVsc2UgaWYgKEVsZW1lbnQucHJvdG90eXBlLm9NYXRjaGVzU2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLm9NYXRjaGVzU2VsZWN0b3I7XHJcbiAgICAgICAgfSBlbHNlIGlmIChFbGVtZW50LnByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvcjtcclxuICAgICAgICB9IGVsc2UgaWYgKEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCkge1xyXG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gZnVuY3Rpb24gbWF0Y2hlcyhzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSAodGhpcy5kb2N1bWVudCB8fCB0aGlzLm93bmVyRG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLFxyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBtYXRjaGVzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHdoaWxlICgtLWkgPj0gMCAmJiBtYXRjaGVzLml0ZW0oaSkgIT09IHRoaXMpIHt9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaSA+IC0xO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBFbGVtZW50LmNsb3Nlc3RcclxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2Nsb3Nlc3RcclxuICAgIGlmICh3aW5kb3cuRWxlbWVudCAmJiAhRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCkge1xyXG4gICAgICAgIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgPSBmdW5jdGlvbihzKSB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaGVzID0gKHRoaXMuZG9jdW1lbnQgfHwgdGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHMpLFxyXG4gICAgICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgICAgIGVsID0gdGhpcztcclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgaSA9IG1hdGNoZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKC0taSA+PSAwICYmIG1hdGNoZXMuaXRlbShpKSAhPT0gZWwpIHt9O1xyXG4gICAgICAgICAgICB9IHdoaWxlICgoaSA8IDApICYmIChlbCA9IGVsLnBhcmVudEVsZW1lbnQpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWl4aW4obywgcHMpIHtcclxuICAgICAgICBpZiAoIW8pIHJldHVybjtcclxuICAgICAgICBPYmplY3Qua2V5cyhwcykuZm9yRWFjaChmdW5jdGlvbihwKSB7XHJcbiAgICAgICAgICAgIGlmICgocCBpbiBvKSB8fCAocCBpbiBvLnByb3RvdHlwZSkpIHJldHVybjtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcclxuICAgICAgICAgICAgICAgICAgICBvLnByb3RvdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBwLFxyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHMsIHApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChleCkge1xyXG4gICAgICAgICAgICAgICAgLy8gVGhyb3dzIGluIElFODsganVzdCBjb3B5IGl0XHJcbiAgICAgICAgICAgICAgICBvW3BdID0gcHNbcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNaXhpbiBQYXJlbnROb2RlXHJcbiAgICAvLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2ludGVyZmFjZS1wYXJlbnRub2RlXHJcblxyXG4gICAgZnVuY3Rpb24gY29udmVydE5vZGVzSW50b0FOb2RlKG5vZGVzKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xyXG4gICAgICAgIG5vZGVzID0gbm9kZXMubWFwKGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEobm9kZSBpbnN0YW5jZW9mIE5vZGUpID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZSkgOiBub2RlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChub2Rlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGVzWzBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgICAgIG5vZGVzLmZvckVhY2goZnVuY3Rpb24obikgeyBub2RlLmFwcGVuZENoaWxkKG4pOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIFBhcmVudE5vZGUgPSB7XHJcbiAgICAgICAgcHJlcGVuZDogZnVuY3Rpb24oLyouLi5ub2RlcyovKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgbm9kZXMgPSBjb252ZXJ0Tm9kZXNJbnRvQU5vZGUobm9kZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmluc2VydEJlZm9yZShub2RlcywgdGhpcy5maXJzdENoaWxkKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFwcGVuZDogZnVuY3Rpb24oLyouLi5ub2RlcyovKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgbm9kZXMgPSBjb252ZXJ0Tm9kZXNJbnRvQU5vZGUobm9kZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKG5vZGVzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIG1peGluKGdsb2JhbC5Eb2N1bWVudCB8fCBnbG9iYWwuSFRNTERvY3VtZW50LCBQYXJlbnROb2RlKTsgLy8gSFRNTERvY3VtZW50IGZvciBJRThcclxuICAgIG1peGluKGdsb2JhbC5Eb2N1bWVudEZyYWdtZW50LCBQYXJlbnROb2RlKTtcclxuICAgIG1peGluKGdsb2JhbC5FbGVtZW50LCBQYXJlbnROb2RlKTtcclxuXHJcbiAgICAvLyBNaXhpbiBDaGlsZE5vZGVcclxuICAgIC8vIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jaW50ZXJmYWNlLWNoaWxkbm9kZVxyXG5cclxuICAgIHZhciBDaGlsZE5vZGUgPSB7XHJcbiAgICAgICAgYmVmb3JlOiBmdW5jdGlvbigvKi4uLm5vZGVzKi8pIHtcclxuICAgICAgICAgICAgdmFyIG5vZGVzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBpZiAoIXBhcmVudCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgdmlhYmxlUHJldmlvdXNTaWJsaW5nID0gdGhpcy5wcmV2aW91c1NpYmxpbmc7XHJcbiAgICAgICAgICAgIHdoaWxlIChub2Rlcy5pbmRleE9mKHZpYWJsZVByZXZpb3VzU2libGluZykgIT09IC0xKVxyXG4gICAgICAgICAgICAgICAgdmlhYmxlUHJldmlvdXNTaWJsaW5nID0gdmlhYmxlUHJldmlvdXNTaWJsaW5nLnByZXZpb3VzU2libGluZztcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjb252ZXJ0Tm9kZXNJbnRvQU5vZGUobm9kZXMpO1xyXG4gICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHZpYWJsZVByZXZpb3VzU2libGluZyA/XHJcbiAgICAgICAgICAgICAgICB2aWFibGVQcmV2aW91c1NpYmxpbmcubmV4dFNpYmxpbmcgOiBwYXJlbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZnRlcjogZnVuY3Rpb24oLyouLi5ub2RlcyovKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgaWYgKCFwYXJlbnQpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIHZpYWJsZU5leHRTaWJsaW5nID0gdGhpcy5uZXh0U2libGluZztcclxuICAgICAgICAgICAgd2hpbGUgKG5vZGVzLmluZGV4T2YodmlhYmxlTmV4dFNpYmxpbmcpICE9PSAtMSlcclxuICAgICAgICAgICAgICAgIHZpYWJsZU5leHRTaWJsaW5nID0gdmlhYmxlTmV4dFNpYmxpbmcubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY29udmVydE5vZGVzSW50b0FOb2RlKG5vZGVzKTtcclxuICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShub2RlLCB2aWFibGVOZXh0U2libGluZyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXBsYWNlV2l0aDogZnVuY3Rpb24oLyouLi5ub2RlcyovKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgaWYgKCFwYXJlbnQpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIHZpYWJsZU5leHRTaWJsaW5nID0gdGhpcy5uZXh0U2libGluZztcclxuICAgICAgICAgICAgd2hpbGUgKG5vZGVzLmluZGV4T2YodmlhYmxlTmV4dFNpYmxpbmcpICE9PSAtMSlcclxuICAgICAgICAgICAgICAgIHZpYWJsZU5leHRTaWJsaW5nID0gdmlhYmxlTmV4dFNpYmxpbmcubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY29udmVydE5vZGVzSW50b0FOb2RlKG5vZGVzKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUgPT09IHBhcmVudClcclxuICAgICAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobm9kZSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgdmlhYmxlTmV4dFNpYmxpbmcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBhcmVudE5vZGUpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbWl4aW4oZ2xvYmFsLkRvY3VtZW50VHlwZSwgQ2hpbGROb2RlKTtcclxuICAgIG1peGluKGdsb2JhbC5FbGVtZW50LCBDaGlsZE5vZGUpO1xyXG4gICAgbWl4aW4oZ2xvYmFsLkNoYXJhY3RlckRhdGEsIENoaWxkTm9kZSk7XHJcblxyXG59KHNlbGYpKTsiLCJpbXBvcnQgXyBmcm9tICcuL3VuZGVyc2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJpbShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbn1cblxuLyoqXG4gKiBleHRyYWN0RXh0ZW5zaW9uXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZ30gcGF0aCBmb3IgdXJsXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgRXh0ZW5zaW9uXG4gKi9cbmV4cG9ydCBjb25zdCBleHRyYWN0RXh0ZW5zaW9uID0gZnVuY3Rpb24ocGF0aCkge1xuICAgIGlmKCFwYXRoIHx8IHBhdGguc3Vic3RyKDAsNCk9PSdydG1wJykge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpIHtcbiAgICAgICAgbGV0IGV4dGVuc2lvbiA9IFwiXCI7XG4gICAgICAgIGlmICgoL1soLF1mb3JtYXQ9bXBkLS9pKS50ZXN0KHBhdGgpKSB7XG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbXBkJztcbiAgICAgICAgfWVsc2UgaWYgKCgvWygsXWZvcm1hdD1tM3U4LS9pKS50ZXN0KHBhdGgpKSB7XG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbTN1OCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgICB9XG5cbiAgICBsZXQgYXp1cmVkRm9ybWF0ID0gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpO1xuICAgIGlmKGF6dXJlZEZvcm1hdCkge1xuICAgICAgICByZXR1cm4gYXp1cmVkRm9ybWF0O1xuICAgIH1cbiAgICBwYXRoID0gcGF0aC5zcGxpdCgnPycpWzBdLnNwbGl0KCcjJylbMF07XG4gICAgaWYocGF0aC5sYXN0SW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy4nKSArIDEsIHBhdGgubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG59O1xuXG5cbi8qKlxuICogbmF0dXJhbEhtc1xuICpcbiAqIEBwYXJhbSAgICAgIHtudW1iZXIgfCBzdHJpbmd9ICBzZWNvbmQgIFRoZSBzZWNvbmRcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBmb3JtYXR0ZWQgU3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuYXR1cmFsSG1zKHNlY29uZCkge1xuICAgIGxldCBzZWNOdW0gPSBwYXJzZUludChzZWNvbmQsIDEwKTtcbiAgICBsZXQgaG91cnMgICA9IE1hdGguZmxvb3Ioc2VjTnVtIC8gMzYwMCk7XG4gICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XG4gICAgbGV0IHNlY29uZHMgPSBzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSAtIChtaW51dGVzICogNjApO1xuXG4gICAgaWYgKGhvdXJzID4gMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cbiAgICBpZiAoc2Vjb25kcyA8IDEwKSB7c2Vjb25kcyA9IFwiMFwiK3NlY29uZHM7fVxuXG4gICAgaWYgKGhvdXJzID4gMCkge1xuICAgICAgICByZXR1cm4gaG91cnMrJzonK21pbnV0ZXMrJzonK3NlY29uZHM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1pbnV0ZXMrJzonK3NlY29uZHM7XG4gICAgfVxufSIsIi8vICAgICBVbmRlcnNjb3JlLmpzIDEuOS4xXHJcbi8vICAgICBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xyXG4vLyAgICAgKGMpIDIwMDktMjAxOCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xyXG4vLyAgICAgVW5kZXJzY29yZSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cclxuIWZ1bmN0aW9uKCl7dmFyIG49XCJvYmplY3RcIj09dHlwZW9mIHNlbGYmJnNlbGYuc2VsZj09PXNlbGYmJnNlbGZ8fFwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWwmJmdsb2JhbC5nbG9iYWw9PT1nbG9iYWwmJmdsb2JhbHx8dGhpc3x8e30scj1uLl8sZT1BcnJheS5wcm90b3R5cGUsbz1PYmplY3QucHJvdG90eXBlLHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbD9TeW1ib2wucHJvdG90eXBlOm51bGwsdT1lLnB1c2gsYz1lLnNsaWNlLHA9by50b1N0cmluZyxpPW8uaGFzT3duUHJvcGVydHksdD1BcnJheS5pc0FycmF5LGE9T2JqZWN0LmtleXMsbD1PYmplY3QuY3JlYXRlLGY9ZnVuY3Rpb24oKXt9LGg9ZnVuY3Rpb24obil7cmV0dXJuIG4gaW5zdGFuY2VvZiBoP246dGhpcyBpbnN0YW5jZW9mIGg/dm9pZCh0aGlzLl93cmFwcGVkPW4pOm5ldyBoKG4pfTtcInVuZGVmaW5lZFwiPT10eXBlb2YgZXhwb3J0c3x8ZXhwb3J0cy5ub2RlVHlwZT9uLl89aDooXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmIW1vZHVsZS5ub2RlVHlwZSYmbW9kdWxlLmV4cG9ydHMmJihleHBvcnRzPW1vZHVsZS5leHBvcnRzPWgpLGV4cG9ydHMuXz1oKSxoLlZFUlNJT049XCIxLjkuMVwiO3ZhciB2LHk9ZnVuY3Rpb24odSxpLG4pe2lmKHZvaWQgMD09PWkpcmV0dXJuIHU7c3dpdGNoKG51bGw9PW4/MzpuKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiB1LmNhbGwoaSxuKX07Y2FzZSAzOnJldHVybiBmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHUuY2FsbChpLG4scix0KX07Y2FzZSA0OnJldHVybiBmdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdS5jYWxsKGksbixyLHQsZSl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiB1LmFwcGx5KGksYXJndW1lbnRzKX19LGQ9ZnVuY3Rpb24obixyLHQpe3JldHVybiBoLml0ZXJhdGVlIT09dj9oLml0ZXJhdGVlKG4scik6bnVsbD09bj9oLmlkZW50aXR5OmguaXNGdW5jdGlvbihuKT95KG4scix0KTpoLmlzT2JqZWN0KG4pJiYhaC5pc0FycmF5KG4pP2gubWF0Y2hlcihuKTpoLnByb3BlcnR5KG4pfTtoLml0ZXJhdGVlPXY9ZnVuY3Rpb24obixyKXtyZXR1cm4gZChuLHIsMS8wKX07dmFyIGc9ZnVuY3Rpb24odSxpKXtyZXR1cm4gaT1udWxsPT1pP3UubGVuZ3RoLTE6K2ksZnVuY3Rpb24oKXtmb3IodmFyIG49TWF0aC5tYXgoYXJndW1lbnRzLmxlbmd0aC1pLDApLHI9QXJyYXkobiksdD0wO3Q8bjt0Kyspclt0XT1hcmd1bWVudHNbdCtpXTtzd2l0Y2goaSl7Y2FzZSAwOnJldHVybiB1LmNhbGwodGhpcyxyKTtjYXNlIDE6cmV0dXJuIHUuY2FsbCh0aGlzLGFyZ3VtZW50c1swXSxyKTtjYXNlIDI6cmV0dXJuIHUuY2FsbCh0aGlzLGFyZ3VtZW50c1swXSxhcmd1bWVudHNbMV0scil9dmFyIGU9QXJyYXkoaSsxKTtmb3IodD0wO3Q8aTt0KyspZVt0XT1hcmd1bWVudHNbdF07cmV0dXJuIGVbaV09cix1LmFwcGx5KHRoaXMsZSl9fSxtPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybnt9O2lmKGwpcmV0dXJuIGwobik7Zi5wcm90b3R5cGU9bjt2YXIgcj1uZXcgZjtyZXR1cm4gZi5wcm90b3R5cGU9bnVsbCxyfSxiPWZ1bmN0aW9uKHIpe3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj92b2lkIDA6bltyXX19LGo9ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbCE9biYmaS5jYWxsKG4scil9LHg9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9ci5sZW5ndGgsZT0wO2U8dDtlKyspe2lmKG51bGw9PW4pcmV0dXJuO249bltyW2VdXX1yZXR1cm4gdD9uOnZvaWQgMH0sXz1NYXRoLnBvdygyLDUzKS0xLEE9YihcImxlbmd0aFwiKSx3PWZ1bmN0aW9uKG4pe3ZhciByPUEobik7cmV0dXJuXCJudW1iZXJcIj09dHlwZW9mIHImJjA8PXImJnI8PV99O2guZWFjaD1oLmZvckVhY2g9ZnVuY3Rpb24obixyLHQpe3ZhciBlLHU7aWYocj15KHIsdCksdyhuKSlmb3IoZT0wLHU9bi5sZW5ndGg7ZTx1O2UrKylyKG5bZV0sZSxuKTtlbHNle3ZhciBpPWgua2V5cyhuKTtmb3IoZT0wLHU9aS5sZW5ndGg7ZTx1O2UrKylyKG5baVtlXV0saVtlXSxuKX1yZXR1cm4gbn0saC5tYXA9aC5jb2xsZWN0PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT1BcnJheSh1KSxvPTA7bzx1O28rKyl7dmFyIGE9ZT9lW29dOm87aVtvXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX07dmFyIE89ZnVuY3Rpb24oYyl7cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3ZhciB1PTM8PWFyZ3VtZW50cy5sZW5ndGg7cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3ZhciB1PSF3KG4pJiZoLmtleXMobiksaT0odXx8bikubGVuZ3RoLG89MDxjPzA6aS0xO2ZvcihlfHwodD1uW3U/dVtvXTpvXSxvKz1jKTswPD1vJiZvPGk7bys9Yyl7dmFyIGE9dT91W29dOm87dD1yKHQsblthXSxhLG4pfXJldHVybiB0fShuLHkocixlLDQpLHQsdSl9fTtoLnJlZHVjZT1oLmZvbGRsPWguaW5qZWN0PU8oMSksaC5yZWR1Y2VSaWdodD1oLmZvbGRyPU8oLTEpLGguZmluZD1oLmRldGVjdD1mdW5jdGlvbihuLHIsdCl7dmFyIGU9KHcobik/aC5maW5kSW5kZXg6aC5maW5kS2V5KShuLHIsdCk7aWYodm9pZCAwIT09ZSYmLTEhPT1lKXJldHVybiBuW2VdfSxoLmZpbHRlcj1oLnNlbGVjdD1mdW5jdGlvbihuLGUscil7dmFyIHU9W107cmV0dXJuIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXtlKG4scix0KSYmdS5wdXNoKG4pfSksdX0saC5yZWplY3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBoLmZpbHRlcihuLGgubmVnYXRlKGQocikpLHQpfSxoLmV2ZXJ5PWguYWxsPWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT0wO2k8dTtpKyspe3ZhciBvPWU/ZVtpXTppO2lmKCFyKG5bb10sbyxuKSlyZXR1cm4hMX1yZXR1cm4hMH0saC5zb21lPWguYW55PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT0wO2k8dTtpKyspe3ZhciBvPWU/ZVtpXTppO2lmKHIobltvXSxvLG4pKXJldHVybiEwfXJldHVybiExfSxoLmNvbnRhaW5zPWguaW5jbHVkZXM9aC5pbmNsdWRlPWZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksKFwibnVtYmVyXCIhPXR5cGVvZiB0fHxlKSYmKHQ9MCksMDw9aC5pbmRleE9mKG4scix0KX0saC5pbnZva2U9ZyhmdW5jdGlvbihuLHQsZSl7dmFyIHUsaTtyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP2k9dDpoLmlzQXJyYXkodCkmJih1PXQuc2xpY2UoMCwtMSksdD10W3QubGVuZ3RoLTFdKSxoLm1hcChuLGZ1bmN0aW9uKG4pe3ZhciByPWk7aWYoIXIpe2lmKHUmJnUubGVuZ3RoJiYobj14KG4sdSkpLG51bGw9PW4pcmV0dXJuO3I9blt0XX1yZXR1cm4gbnVsbD09cj9yOnIuYXBwbHkobixlKX0pfSksaC5wbHVjaz1mdW5jdGlvbihuLHIpe3JldHVybiBoLm1hcChuLGgucHJvcGVydHkocikpfSxoLndoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmlsdGVyKG4saC5tYXRjaGVyKHIpKX0saC5maW5kV2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maW5kKG4saC5tYXRjaGVyKHIpKX0saC5tYXg9ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0tMS8wLG89LTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZpPHQmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe3U9ZShuLHIsdCksKG88dXx8dT09PS0xLzAmJmk9PT0tMS8wKSYmKGk9bixvPXUpfSk7cmV0dXJuIGl9LGgubWluPWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9MS8wLG89MS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJnQ8aSYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7KCh1PWUobixyLHQpKTxvfHx1PT09MS8wJiZpPT09MS8wKSYmKGk9bixvPXUpfSk7cmV0dXJuIGl9LGguc2h1ZmZsZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5zYW1wbGUobiwxLzApfSxoLnNhbXBsZT1mdW5jdGlvbihuLHIsdCl7aWYobnVsbD09cnx8dClyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLG5baC5yYW5kb20obi5sZW5ndGgtMSldO3ZhciBlPXcobik/aC5jbG9uZShuKTpoLnZhbHVlcyhuKSx1PUEoZSk7cj1NYXRoLm1heChNYXRoLm1pbihyLHUpLDApO2Zvcih2YXIgaT11LTEsbz0wO288cjtvKyspe3ZhciBhPWgucmFuZG9tKG8saSksYz1lW29dO2Vbb109ZVthXSxlW2FdPWN9cmV0dXJuIGUuc2xpY2UoMCxyKX0saC5zb3J0Qnk9ZnVuY3Rpb24obixlLHIpe3ZhciB1PTA7cmV0dXJuIGU9ZChlLHIpLGgucGx1Y2soaC5tYXAobixmdW5jdGlvbihuLHIsdCl7cmV0dXJue3ZhbHVlOm4saW5kZXg6dSsrLGNyaXRlcmlhOmUobixyLHQpfX0pLnNvcnQoZnVuY3Rpb24obixyKXt2YXIgdD1uLmNyaXRlcmlhLGU9ci5jcml0ZXJpYTtpZih0IT09ZSl7aWYoZTx0fHx2b2lkIDA9PT10KXJldHVybiAxO2lmKHQ8ZXx8dm9pZCAwPT09ZSlyZXR1cm4tMX1yZXR1cm4gbi5pbmRleC1yLmluZGV4fSksXCJ2YWx1ZVwiKX07dmFyIGs9ZnVuY3Rpb24obyxyKXtyZXR1cm4gZnVuY3Rpb24oZSx1LG4pe3ZhciBpPXI/W1tdLFtdXTp7fTtyZXR1cm4gdT1kKHUsbiksaC5lYWNoKGUsZnVuY3Rpb24obixyKXt2YXIgdD11KG4scixlKTtvKGksbix0KX0pLGl9fTtoLmdyb3VwQnk9ayhmdW5jdGlvbihuLHIsdCl7aihuLHQpP25bdF0ucHVzaChyKTpuW3RdPVtyXX0pLGguaW5kZXhCeT1rKGZ1bmN0aW9uKG4scix0KXtuW3RdPXJ9KSxoLmNvdW50Qnk9ayhmdW5jdGlvbihuLHIsdCl7aihuLHQpP25bdF0rKzpuW3RdPTF9KTt2YXIgUz0vW15cXHVkODAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRiZmZdW1xcdWRjMDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGZmZl0vZztoLnRvQXJyYXk9ZnVuY3Rpb24obil7cmV0dXJuIG4/aC5pc0FycmF5KG4pP2MuY2FsbChuKTpoLmlzU3RyaW5nKG4pP24ubWF0Y2goUyk6dyhuKT9oLm1hcChuLGguaWRlbnRpdHkpOmgudmFsdWVzKG4pOltdfSxoLnNpemU9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/MDp3KG4pP24ubGVuZ3RoOmgua2V5cyhuKS5sZW5ndGh9LGgucGFydGl0aW9uPWsoZnVuY3Rpb24obixyLHQpe25bdD8wOjFdLnB1c2gocil9LCEwKSxoLmZpcnN0PWguaGVhZD1oLnRha2U9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/blswXTpoLmluaXRpYWwobixuLmxlbmd0aC1yKX0saC5pbml0aWFsPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gYy5jYWxsKG4sMCxNYXRoLm1heCgwLG4ubGVuZ3RoLShudWxsPT1yfHx0PzE6cikpKX0saC5sYXN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bbi5sZW5ndGgtMV06aC5yZXN0KG4sTWF0aC5tYXgoMCxuLmxlbmd0aC1yKSl9LGgucmVzdD1oLnRhaWw9aC5kcm9wPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gYy5jYWxsKG4sbnVsbD09cnx8dD8xOnIpfSxoLmNvbXBhY3Q9ZnVuY3Rpb24obil7cmV0dXJuIGguZmlsdGVyKG4sQm9vbGVhbil9O3ZhciBNPWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0oZT1lfHxbXSkubGVuZ3RoLGk9MCxvPUEobik7aTxvO2krKyl7dmFyIGE9bltpXTtpZih3KGEpJiYoaC5pc0FycmF5KGEpfHxoLmlzQXJndW1lbnRzKGEpKSlpZihyKWZvcih2YXIgYz0wLGw9YS5sZW5ndGg7YzxsOyllW3UrK109YVtjKytdO2Vsc2UgTShhLHIsdCxlKSx1PWUubGVuZ3RoO2Vsc2UgdHx8KGVbdSsrXT1hKX1yZXR1cm4gZX07aC5mbGF0dGVuPWZ1bmN0aW9uKG4scil7cmV0dXJuIE0obixyLCExKX0saC53aXRob3V0PWcoZnVuY3Rpb24obixyKXtyZXR1cm4gaC5kaWZmZXJlbmNlKG4scil9KSxoLnVuaXE9aC51bmlxdWU9ZnVuY3Rpb24obixyLHQsZSl7aC5pc0Jvb2xlYW4ocil8fChlPXQsdD1yLHI9ITEpLG51bGwhPXQmJih0PWQodCxlKSk7Zm9yKHZhciB1PVtdLGk9W10sbz0wLGE9QShuKTtvPGE7bysrKXt2YXIgYz1uW29dLGw9dD90KGMsbyxuKTpjO3ImJiF0PyhvJiZpPT09bHx8dS5wdXNoKGMpLGk9bCk6dD9oLmNvbnRhaW5zKGksbCl8fChpLnB1c2gobCksdS5wdXNoKGMpKTpoLmNvbnRhaW5zKHUsYyl8fHUucHVzaChjKX1yZXR1cm4gdX0saC51bmlvbj1nKGZ1bmN0aW9uKG4pe3JldHVybiBoLnVuaXEoTShuLCEwLCEwKSl9KSxoLmludGVyc2VjdGlvbj1mdW5jdGlvbihuKXtmb3IodmFyIHI9W10sdD1hcmd1bWVudHMubGVuZ3RoLGU9MCx1PUEobik7ZTx1O2UrKyl7dmFyIGk9bltlXTtpZighaC5jb250YWlucyhyLGkpKXt2YXIgbztmb3Iobz0xO288dCYmaC5jb250YWlucyhhcmd1bWVudHNbb10saSk7bysrKTtvPT09dCYmci5wdXNoKGkpfX1yZXR1cm4gcn0saC5kaWZmZXJlbmNlPWcoZnVuY3Rpb24obixyKXtyZXR1cm4gcj1NKHIsITAsITApLGguZmlsdGVyKG4sZnVuY3Rpb24obil7cmV0dXJuIWguY29udGFpbnMocixuKX0pfSksaC51bnppcD1mdW5jdGlvbihuKXtmb3IodmFyIHI9biYmaC5tYXgobixBKS5sZW5ndGh8fDAsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWgucGx1Y2sobixlKTtyZXR1cm4gdH0saC56aXA9ZyhoLnVuemlwKSxoLm9iamVjdD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD17fSxlPTAsdT1BKG4pO2U8dTtlKyspcj90W25bZV1dPXJbZV06dFtuW2VdWzBdXT1uW2VdWzFdO3JldHVybiB0fTt2YXIgRj1mdW5jdGlvbihpKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1BKG4pLHU9MDxpPzA6ZS0xOzA8PXUmJnU8ZTt1Kz1pKWlmKHIoblt1XSx1LG4pKXJldHVybiB1O3JldHVybi0xfX07aC5maW5kSW5kZXg9RigxKSxoLmZpbmRMYXN0SW5kZXg9RigtMSksaC5zb3J0ZWRJbmRleD1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KHQ9ZCh0LGUsMSkpKHIpLGk9MCxvPUEobik7aTxvOyl7dmFyIGE9TWF0aC5mbG9vcigoaStvKS8yKTt0KG5bYV0pPHU/aT1hKzE6bz1hfXJldHVybiBpfTt2YXIgRT1mdW5jdGlvbihpLG8sYSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXt2YXIgZT0wLHU9QShuKTtpZihcIm51bWJlclwiPT10eXBlb2YgdCkwPGk/ZT0wPD10P3Q6TWF0aC5tYXgodCt1LGUpOnU9MDw9dD9NYXRoLm1pbih0KzEsdSk6dCt1KzE7ZWxzZSBpZihhJiZ0JiZ1KXJldHVybiBuW3Q9YShuLHIpXT09PXI/dDotMTtpZihyIT1yKXJldHVybiAwPD0odD1vKGMuY2FsbChuLGUsdSksaC5pc05hTikpP3QrZTotMTtmb3IodD0wPGk/ZTp1LTE7MDw9dCYmdDx1O3QrPWkpaWYoblt0XT09PXIpcmV0dXJuIHQ7cmV0dXJuLTF9fTtoLmluZGV4T2Y9RSgxLGguZmluZEluZGV4LGguc29ydGVkSW5kZXgpLGgubGFzdEluZGV4T2Y9RSgtMSxoLmZpbmRMYXN0SW5kZXgpLGgucmFuZ2U9ZnVuY3Rpb24obixyLHQpe251bGw9PXImJihyPW58fDAsbj0wKSx0fHwodD1yPG4/LTE6MSk7Zm9yKHZhciBlPU1hdGgubWF4KE1hdGguY2VpbCgoci1uKS90KSwwKSx1PUFycmF5KGUpLGk9MDtpPGU7aSsrLG4rPXQpdVtpXT1uO3JldHVybiB1fSxoLmNodW5rPWZ1bmN0aW9uKG4scil7aWYobnVsbD09cnx8cjwxKXJldHVybltdO2Zvcih2YXIgdD1bXSxlPTAsdT1uLmxlbmd0aDtlPHU7KXQucHVzaChjLmNhbGwobixlLGUrPXIpKTtyZXR1cm4gdH07dmFyIE49ZnVuY3Rpb24obixyLHQsZSx1KXtpZighKGUgaW5zdGFuY2VvZiByKSlyZXR1cm4gbi5hcHBseSh0LHUpO3ZhciBpPW0obi5wcm90b3R5cGUpLG89bi5hcHBseShpLHUpO3JldHVybiBoLmlzT2JqZWN0KG8pP286aX07aC5iaW5kPWcoZnVuY3Rpb24ocix0LGUpe2lmKCFoLmlzRnVuY3Rpb24ocikpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkJpbmQgbXVzdCBiZSBjYWxsZWQgb24gYSBmdW5jdGlvblwiKTt2YXIgdT1nKGZ1bmN0aW9uKG4pe3JldHVybiBOKHIsdSx0LHRoaXMsZS5jb25jYXQobikpfSk7cmV0dXJuIHV9KSxoLnBhcnRpYWw9ZyhmdW5jdGlvbih1LGkpe3ZhciBvPWgucGFydGlhbC5wbGFjZWhvbGRlcixhPWZ1bmN0aW9uKCl7Zm9yKHZhciBuPTAscj1pLmxlbmd0aCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aVtlXT09PW8/YXJndW1lbnRzW24rK106aVtlXTtmb3IoO248YXJndW1lbnRzLmxlbmd0aDspdC5wdXNoKGFyZ3VtZW50c1tuKytdKTtyZXR1cm4gTih1LGEsdGhpcyx0aGlzLHQpfTtyZXR1cm4gYX0pLChoLnBhcnRpYWwucGxhY2Vob2xkZXI9aCkuYmluZEFsbD1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9KHI9TShyLCExLCExKSkubGVuZ3RoO2lmKHQ8MSl0aHJvdyBuZXcgRXJyb3IoXCJiaW5kQWxsIG11c3QgYmUgcGFzc2VkIGZ1bmN0aW9uIG5hbWVzXCIpO2Zvcig7dC0tOyl7dmFyIGU9clt0XTtuW2VdPWguYmluZChuW2VdLG4pfX0pLGgubWVtb2l6ZT1mdW5jdGlvbihlLHUpe3ZhciBpPWZ1bmN0aW9uKG4pe3ZhciByPWkuY2FjaGUsdD1cIlwiKyh1P3UuYXBwbHkodGhpcyxhcmd1bWVudHMpOm4pO3JldHVybiBqKHIsdCl8fChyW3RdPWUuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxyW3RdfTtyZXR1cm4gaS5jYWNoZT17fSxpfSxoLmRlbGF5PWcoZnVuY3Rpb24obixyLHQpe3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIG4uYXBwbHkobnVsbCx0KX0scil9KSxoLmRlZmVyPWgucGFydGlhbChoLmRlbGF5LGgsMSksaC50aHJvdHRsZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhLGMsbD0wO3V8fCh1PXt9KTt2YXIgZj1mdW5jdGlvbigpe2w9ITE9PT11LmxlYWRpbmc/MDpoLm5vdygpLGk9bnVsbCxjPXQuYXBwbHkobyxhKSxpfHwobz1hPW51bGwpfSxuPWZ1bmN0aW9uKCl7dmFyIG49aC5ub3coKTtsfHwhMSE9PXUubGVhZGluZ3x8KGw9bik7dmFyIHI9ZS0obi1sKTtyZXR1cm4gbz10aGlzLGE9YXJndW1lbnRzLHI8PTB8fGU8cj8oaSYmKGNsZWFyVGltZW91dChpKSxpPW51bGwpLGw9bixjPXQuYXBwbHkobyxhKSxpfHwobz1hPW51bGwpKTppfHwhMT09PXUudHJhaWxpbmd8fChpPXNldFRpbWVvdXQoZixyKSksY307cmV0dXJuIG4uY2FuY2VsPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KGkpLGw9MCxpPW89YT1udWxsfSxufSxoLmRlYm91bmNlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGE9ZnVuY3Rpb24obixyKXtpPW51bGwsciYmKG89dC5hcHBseShuLHIpKX0sbj1nKGZ1bmN0aW9uKG4pe2lmKGkmJmNsZWFyVGltZW91dChpKSx1KXt2YXIgcj0haTtpPXNldFRpbWVvdXQoYSxlKSxyJiYobz10LmFwcGx5KHRoaXMsbikpfWVsc2UgaT1oLmRlbGF5KGEsZSx0aGlzLG4pO3JldHVybiBvfSk7cmV0dXJuIG4uY2FuY2VsPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KGkpLGk9bnVsbH0sbn0saC53cmFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgucGFydGlhbChyLG4pfSxoLm5lZ2F0ZT1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4hbi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmNvbXBvc2U9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMsZT10Lmxlbmd0aC0xO3JldHVybiBmdW5jdGlvbigpe2Zvcih2YXIgbj1lLHI9dFtlXS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7bi0tOylyPXRbbl0uY2FsbCh0aGlzLHIpO3JldHVybiByfX0saC5hZnRlcj1mdW5jdGlvbihuLHIpe3JldHVybiBmdW5jdGlvbigpe2lmKC0tbjwxKXJldHVybiByLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguYmVmb3JlPWZ1bmN0aW9uKG4scil7dmFyIHQ7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIDA8LS1uJiYodD1yLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksbjw9MSYmKHI9bnVsbCksdH19LGgub25jZT1oLnBhcnRpYWwoaC5iZWZvcmUsMiksaC5yZXN0QXJndW1lbnRzPWc7dmFyIEk9IXt0b1N0cmluZzpudWxsfS5wcm9wZXJ0eUlzRW51bWVyYWJsZShcInRvU3RyaW5nXCIpLFQ9W1widmFsdWVPZlwiLFwiaXNQcm90b3R5cGVPZlwiLFwidG9TdHJpbmdcIixcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsXCJoYXNPd25Qcm9wZXJ0eVwiLFwidG9Mb2NhbGVTdHJpbmdcIl0sQj1mdW5jdGlvbihuLHIpe3ZhciB0PVQubGVuZ3RoLGU9bi5jb25zdHJ1Y3Rvcix1PWguaXNGdW5jdGlvbihlKSYmZS5wcm90b3R5cGV8fG8saT1cImNvbnN0cnVjdG9yXCI7Zm9yKGoobixpKSYmIWguY29udGFpbnMocixpKSYmci5wdXNoKGkpO3QtLTspKGk9VFt0XSlpbiBuJiZuW2ldIT09dVtpXSYmIWguY29udGFpbnMocixpKSYmci5wdXNoKGkpfTtoLmtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107aWYoYSlyZXR1cm4gYShuKTt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbilqKG4sdCkmJnIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGguYWxsS2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbilyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLnZhbHVlcz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPW5bclt1XV07cmV0dXJuIGV9LGgubWFwT2JqZWN0PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9aC5rZXlzKG4pLHU9ZS5sZW5ndGgsaT17fSxvPTA7bzx1O28rKyl7dmFyIGE9ZVtvXTtpW2FdPXIoblthXSxhLG4pfXJldHVybiBpfSxoLnBhaXJzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09W3JbdV0sbltyW3VdXV07cmV0dXJuIGV9LGguaW52ZXJ0PWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj17fSx0PWgua2V5cyhuKSxlPTAsdT10Lmxlbmd0aDtlPHU7ZSsrKXJbblt0W2VdXV09dFtlXTtyZXR1cm4gcn0saC5mdW5jdGlvbnM9aC5tZXRob2RzPWZ1bmN0aW9uKG4pe3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWguaXNGdW5jdGlvbihuW3RdKSYmci5wdXNoKHQpO3JldHVybiByLnNvcnQoKX07dmFyIFI9ZnVuY3Rpb24oYyxsKXtyZXR1cm4gZnVuY3Rpb24obil7dmFyIHI9YXJndW1lbnRzLmxlbmd0aDtpZihsJiYobj1PYmplY3QobikpLHI8Mnx8bnVsbD09bilyZXR1cm4gbjtmb3IodmFyIHQ9MTt0PHI7dCsrKWZvcih2YXIgZT1hcmd1bWVudHNbdF0sdT1jKGUpLGk9dS5sZW5ndGgsbz0wO288aTtvKyspe3ZhciBhPXVbb107bCYmdm9pZCAwIT09blthXXx8KG5bYV09ZVthXSl9cmV0dXJuIG59fTtoLmV4dGVuZD1SKGguYWxsS2V5cyksaC5leHRlbmRPd249aC5hc3NpZ249UihoLmtleXMpLGguZmluZEtleT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlLHU9aC5rZXlzKG4pLGk9MCxvPXUubGVuZ3RoO2k8bztpKyspaWYocihuW2U9dVtpXV0sZSxuKSlyZXR1cm4gZX07dmFyIHEsSyx6PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gciBpbiB0fTtoLnBpY2s9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PXt9LGU9clswXTtpZihudWxsPT1uKXJldHVybiB0O2guaXNGdW5jdGlvbihlKT8oMTxyLmxlbmd0aCYmKGU9eShlLHJbMV0pKSxyPWguYWxsS2V5cyhuKSk6KGU9eixyPU0ociwhMSwhMSksbj1PYmplY3QobikpO2Zvcih2YXIgdT0wLGk9ci5sZW5ndGg7dTxpO3UrKyl7dmFyIG89clt1XSxhPW5bb107ZShhLG8sbikmJih0W29dPWEpfXJldHVybiB0fSksaC5vbWl0PWcoZnVuY3Rpb24obix0KXt2YXIgcixlPXRbMF07cmV0dXJuIGguaXNGdW5jdGlvbihlKT8oZT1oLm5lZ2F0ZShlKSwxPHQubGVuZ3RoJiYocj10WzFdKSk6KHQ9aC5tYXAoTSh0LCExLCExKSxTdHJpbmcpLGU9ZnVuY3Rpb24obixyKXtyZXR1cm4haC5jb250YWlucyh0LHIpfSksaC5waWNrKG4sZSxyKX0pLGguZGVmYXVsdHM9UihoLmFsbEtleXMsITApLGguY3JlYXRlPWZ1bmN0aW9uKG4scil7dmFyIHQ9bShuKTtyZXR1cm4gciYmaC5leHRlbmRPd24odCxyKSx0fSxoLmNsb25lPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzT2JqZWN0KG4pP2guaXNBcnJheShuKT9uLnNsaWNlKCk6aC5leHRlbmQoe30sbik6bn0saC50YXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gcihuKSxufSxoLmlzTWF0Y2g9ZnVuY3Rpb24obixyKXt2YXIgdD1oLmtleXMociksZT10Lmxlbmd0aDtpZihudWxsPT1uKXJldHVybiFlO2Zvcih2YXIgdT1PYmplY3QobiksaT0wO2k8ZTtpKyspe3ZhciBvPXRbaV07aWYocltvXSE9PXVbb118fCEobyBpbiB1KSlyZXR1cm4hMX1yZXR1cm4hMH0scT1mdW5jdGlvbihuLHIsdCxlKXtpZihuPT09cilyZXR1cm4gMCE9PW58fDEvbj09MS9yO2lmKG51bGw9PW58fG51bGw9PXIpcmV0dXJuITE7aWYobiE9bilyZXR1cm4gciE9cjt2YXIgdT10eXBlb2YgbjtyZXR1cm4oXCJmdW5jdGlvblwiPT09dXx8XCJvYmplY3RcIj09PXV8fFwib2JqZWN0XCI9PXR5cGVvZiByKSYmSyhuLHIsdCxlKX0sSz1mdW5jdGlvbihuLHIsdCxlKXtuIGluc3RhbmNlb2YgaCYmKG49bi5fd3JhcHBlZCksciBpbnN0YW5jZW9mIGgmJihyPXIuX3dyYXBwZWQpO3ZhciB1PXAuY2FsbChuKTtpZih1IT09cC5jYWxsKHIpKXJldHVybiExO3N3aXRjaCh1KXtjYXNlXCJbb2JqZWN0IFJlZ0V4cF1cIjpjYXNlXCJbb2JqZWN0IFN0cmluZ11cIjpyZXR1cm5cIlwiK249PVwiXCIrcjtjYXNlXCJbb2JqZWN0IE51bWJlcl1cIjpyZXR1cm4rbiE9K24/K3IhPStyOjA9PStuPzEvK249PTEvcjorbj09K3I7Y2FzZVwiW29iamVjdCBEYXRlXVwiOmNhc2VcIltvYmplY3QgQm9vbGVhbl1cIjpyZXR1cm4rbj09K3I7Y2FzZVwiW29iamVjdCBTeW1ib2xdXCI6cmV0dXJuIHMudmFsdWVPZi5jYWxsKG4pPT09cy52YWx1ZU9mLmNhbGwocil9dmFyIGk9XCJbb2JqZWN0IEFycmF5XVwiPT09dTtpZighaSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIG58fFwib2JqZWN0XCIhPXR5cGVvZiByKXJldHVybiExO3ZhciBvPW4uY29uc3RydWN0b3IsYT1yLmNvbnN0cnVjdG9yO2lmKG8hPT1hJiYhKGguaXNGdW5jdGlvbihvKSYmbyBpbnN0YW5jZW9mIG8mJmguaXNGdW5jdGlvbihhKSYmYSBpbnN0YW5jZW9mIGEpJiZcImNvbnN0cnVjdG9yXCJpbiBuJiZcImNvbnN0cnVjdG9yXCJpbiByKXJldHVybiExfWU9ZXx8W107Zm9yKHZhciBjPSh0PXR8fFtdKS5sZW5ndGg7Yy0tOylpZih0W2NdPT09bilyZXR1cm4gZVtjXT09PXI7aWYodC5wdXNoKG4pLGUucHVzaChyKSxpKXtpZigoYz1uLmxlbmd0aCkhPT1yLmxlbmd0aClyZXR1cm4hMTtmb3IoO2MtLTspaWYoIXEobltjXSxyW2NdLHQsZSkpcmV0dXJuITF9ZWxzZXt2YXIgbCxmPWgua2V5cyhuKTtpZihjPWYubGVuZ3RoLGgua2V5cyhyKS5sZW5ndGghPT1jKXJldHVybiExO2Zvcig7Yy0tOylpZihsPWZbY10sIWoocixsKXx8IXEobltsXSxyW2xdLHQsZSkpcmV0dXJuITF9cmV0dXJuIHQucG9wKCksZS5wb3AoKSwhMH0saC5pc0VxdWFsPWZ1bmN0aW9uKG4scil7cmV0dXJuIHEobixyKX0saC5pc0VtcHR5PWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1ufHwodyhuKSYmKGguaXNBcnJheShuKXx8aC5pc1N0cmluZyhuKXx8aC5pc0FyZ3VtZW50cyhuKSk/MD09PW4ubGVuZ3RoOjA9PT1oLmtleXMobikubGVuZ3RoKX0saC5pc0VsZW1lbnQ9ZnVuY3Rpb24obil7cmV0dXJuISghbnx8MSE9PW4ubm9kZVR5cGUpfSxoLmlzQXJyYXk9dHx8ZnVuY3Rpb24obil7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09cC5jYWxsKG4pfSxoLmlzT2JqZWN0PWZ1bmN0aW9uKG4pe3ZhciByPXR5cGVvZiBuO3JldHVyblwiZnVuY3Rpb25cIj09PXJ8fFwib2JqZWN0XCI9PT1yJiYhIW59LGguZWFjaChbXCJBcmd1bWVudHNcIixcIkZ1bmN0aW9uXCIsXCJTdHJpbmdcIixcIk51bWJlclwiLFwiRGF0ZVwiLFwiUmVnRXhwXCIsXCJFcnJvclwiLFwiU3ltYm9sXCIsXCJNYXBcIixcIldlYWtNYXBcIixcIlNldFwiLFwiV2Vha1NldFwiXSxmdW5jdGlvbihyKXtoW1wiaXNcIityXT1mdW5jdGlvbihuKXtyZXR1cm4gcC5jYWxsKG4pPT09XCJbb2JqZWN0IFwiK3IrXCJdXCJ9fSksaC5pc0FyZ3VtZW50cyhhcmd1bWVudHMpfHwoaC5pc0FyZ3VtZW50cz1mdW5jdGlvbihuKXtyZXR1cm4gaihuLFwiY2FsbGVlXCIpfSk7dmFyIEQ9bi5kb2N1bWVudCYmbi5kb2N1bWVudC5jaGlsZE5vZGVzO1wiZnVuY3Rpb25cIiE9dHlwZW9mLy4vJiZcIm9iamVjdFwiIT10eXBlb2YgSW50OEFycmF5JiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBEJiYoaC5pc0Z1bmN0aW9uPWZ1bmN0aW9uKG4pe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG58fCExfSksaC5pc0Zpbml0ZT1mdW5jdGlvbihuKXtyZXR1cm4haC5pc1N5bWJvbChuKSYmaXNGaW5pdGUobikmJiFpc05hTihwYXJzZUZsb2F0KG4pKX0saC5pc05hTj1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc051bWJlcihuKSYmaXNOYU4obil9LGguaXNCb29sZWFuPWZ1bmN0aW9uKG4pe3JldHVybiEwPT09bnx8ITE9PT1ufHxcIltvYmplY3QgQm9vbGVhbl1cIj09PXAuY2FsbChuKX0saC5pc051bGw9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PT1ufSxoLmlzVW5kZWZpbmVkPWZ1bmN0aW9uKG4pe3JldHVybiB2b2lkIDA9PT1ufSxoLmhhcz1mdW5jdGlvbihuLHIpe2lmKCFoLmlzQXJyYXkocikpcmV0dXJuIGoobixyKTtmb3IodmFyIHQ9ci5sZW5ndGgsZT0wO2U8dDtlKyspe3ZhciB1PXJbZV07aWYobnVsbD09bnx8IWkuY2FsbChuLHUpKXJldHVybiExO249blt1XX1yZXR1cm4hIXR9LGgubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBuLl89cix0aGlzfSxoLmlkZW50aXR5PWZ1bmN0aW9uKG4pe3JldHVybiBufSxoLmNvbnN0YW50PWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiBufX0saC5ub29wPWZ1bmN0aW9uKCl7fSxoLnByb3BlcnR5PWZ1bmN0aW9uKHIpe3JldHVybiBoLmlzQXJyYXkocik/ZnVuY3Rpb24obil7cmV0dXJuIHgobixyKX06YihyKX0saC5wcm9wZXJ0eU9mPWZ1bmN0aW9uKHIpe3JldHVybiBudWxsPT1yP2Z1bmN0aW9uKCl7fTpmdW5jdGlvbihuKXtyZXR1cm4gaC5pc0FycmF5KG4pP3gocixuKTpyW25dfX0saC5tYXRjaGVyPWgubWF0Y2hlcz1mdW5jdGlvbihyKXtyZXR1cm4gcj1oLmV4dGVuZE93bih7fSxyKSxmdW5jdGlvbihuKXtyZXR1cm4gaC5pc01hdGNoKG4scil9fSxoLnRpbWVzPWZ1bmN0aW9uKG4scix0KXt2YXIgZT1BcnJheShNYXRoLm1heCgwLG4pKTtyPXkocix0LDEpO2Zvcih2YXIgdT0wO3U8bjt1KyspZVt1XT1yKHUpO3JldHVybiBlfSxoLnJhbmRvbT1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsPT1yJiYocj1uLG49MCksbitNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHItbisxKSl9LGgubm93PURhdGUubm93fHxmdW5jdGlvbigpe3JldHVybihuZXcgRGF0ZSkuZ2V0VGltZSgpfTt2YXIgTD17XCImXCI6XCImYW1wO1wiLFwiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiYjeDI3O1wiLFwiYFwiOlwiJiN4NjA7XCJ9LFA9aC5pbnZlcnQoTCksVz1mdW5jdGlvbihyKXt2YXIgdD1mdW5jdGlvbihuKXtyZXR1cm4gcltuXX0sbj1cIig/OlwiK2gua2V5cyhyKS5qb2luKFwifFwiKStcIilcIixlPVJlZ0V4cChuKSx1PVJlZ0V4cChuLFwiZ1wiKTtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG49bnVsbD09bj9cIlwiOlwiXCIrbixlLnRlc3Qobik/bi5yZXBsYWNlKHUsdCk6bn19O2guZXNjYXBlPVcoTCksaC51bmVzY2FwZT1XKFApLGgucmVzdWx0PWZ1bmN0aW9uKG4scix0KXtoLmlzQXJyYXkocil8fChyPVtyXSk7dmFyIGU9ci5sZW5ndGg7aWYoIWUpcmV0dXJuIGguaXNGdW5jdGlvbih0KT90LmNhbGwobik6dDtmb3IodmFyIHU9MDt1PGU7dSsrKXt2YXIgaT1udWxsPT1uP3ZvaWQgMDpuW3JbdV1dO3ZvaWQgMD09PWkmJihpPXQsdT1lKSxuPWguaXNGdW5jdGlvbihpKT9pLmNhbGwobik6aX1yZXR1cm4gbn07dmFyIEM9MDtoLnVuaXF1ZUlkPWZ1bmN0aW9uKG4pe3ZhciByPSsrQytcIlwiO3JldHVybiBuP24rcjpyfSxoLnRlbXBsYXRlU2V0dGluZ3M9e2V2YWx1YXRlOi88JShbXFxzXFxTXSs/KSU+L2csaW50ZXJwb2xhdGU6LzwlPShbXFxzXFxTXSs/KSU+L2csZXNjYXBlOi88JS0oW1xcc1xcU10rPyklPi9nfTt2YXIgSj0vKC4pXi8sVT17XCInXCI6XCInXCIsXCJcXFxcXCI6XCJcXFxcXCIsXCJcXHJcIjpcInJcIixcIlxcblwiOlwiblwiLFwiXFx1MjAyOFwiOlwidTIwMjhcIixcIlxcdTIwMjlcIjpcInUyMDI5XCJ9LFY9L1xcXFx8J3xcXHJ8XFxufFxcdTIwMjh8XFx1MjAyOS9nLCQ9ZnVuY3Rpb24obil7cmV0dXJuXCJcXFxcXCIrVVtuXX07aC50ZW1wbGF0ZT1mdW5jdGlvbihpLG4scil7IW4mJnImJihuPXIpLG49aC5kZWZhdWx0cyh7fSxuLGgudGVtcGxhdGVTZXR0aW5ncyk7dmFyIHQsZT1SZWdFeHAoWyhuLmVzY2FwZXx8Sikuc291cmNlLChuLmludGVycG9sYXRlfHxKKS5zb3VyY2UsKG4uZXZhbHVhdGV8fEopLnNvdXJjZV0uam9pbihcInxcIikrXCJ8JFwiLFwiZ1wiKSxvPTAsYT1cIl9fcCs9J1wiO2kucmVwbGFjZShlLGZ1bmN0aW9uKG4scix0LGUsdSl7cmV0dXJuIGErPWkuc2xpY2Uobyx1KS5yZXBsYWNlKFYsJCksbz11K24ubGVuZ3RoLHI/YSs9XCInK1xcbigoX190PShcIityK1wiKSk9PW51bGw/Jyc6Xy5lc2NhcGUoX190KSkrXFxuJ1wiOnQ/YSs9XCInK1xcbigoX190PShcIit0K1wiKSk9PW51bGw/Jyc6X190KStcXG4nXCI6ZSYmKGErPVwiJztcXG5cIitlK1wiXFxuX19wKz0nXCIpLG59KSxhKz1cIic7XFxuXCIsbi52YXJpYWJsZXx8KGE9XCJ3aXRoKG9ianx8e30pe1xcblwiK2ErXCJ9XFxuXCIpLGE9XCJ2YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4sXCIrXCJwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xcblwiK2ErXCJyZXR1cm4gX19wO1xcblwiO3RyeXt0PW5ldyBGdW5jdGlvbihuLnZhcmlhYmxlfHxcIm9ialwiLFwiX1wiLGEpfWNhdGNoKG4pe3Rocm93IG4uc291cmNlPWEsbn12YXIgdT1mdW5jdGlvbihuKXtyZXR1cm4gdC5jYWxsKHRoaXMsbixoKX0sYz1uLnZhcmlhYmxlfHxcIm9ialwiO3JldHVybiB1LnNvdXJjZT1cImZ1bmN0aW9uKFwiK2MrXCIpe1xcblwiK2ErXCJ9XCIsdX0saC5jaGFpbj1mdW5jdGlvbihuKXt2YXIgcj1oKG4pO3JldHVybiByLl9jaGFpbj0hMCxyfTt2YXIgRz1mdW5jdGlvbihuLHIpe3JldHVybiBuLl9jaGFpbj9oKHIpLmNoYWluKCk6cn07aC5taXhpbj1mdW5jdGlvbih0KXtyZXR1cm4gaC5lYWNoKGguZnVuY3Rpb25zKHQpLGZ1bmN0aW9uKG4pe3ZhciByPWhbbl09dFtuXTtoLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3ZhciBuPVt0aGlzLl93cmFwcGVkXTtyZXR1cm4gdS5hcHBseShuLGFyZ3VtZW50cyksRyh0aGlzLHIuYXBwbHkoaCxuKSl9fSksaH0saC5taXhpbihoKSxoLmVhY2goW1wicG9wXCIsXCJwdXNoXCIsXCJyZXZlcnNlXCIsXCJzaGlmdFwiLFwic29ydFwiLFwic3BsaWNlXCIsXCJ1bnNoaWZ0XCJdLGZ1bmN0aW9uKHIpe3ZhciB0PWVbcl07aC5wcm90b3R5cGVbcl09ZnVuY3Rpb24oKXt2YXIgbj10aGlzLl93cmFwcGVkO3JldHVybiB0LmFwcGx5KG4sYXJndW1lbnRzKSxcInNoaWZ0XCIhPT1yJiZcInNwbGljZVwiIT09cnx8MCE9PW4ubGVuZ3RofHxkZWxldGUgblswXSxHKHRoaXMsbil9fSksaC5lYWNoKFtcImNvbmNhdFwiLFwiam9pblwiLFwic2xpY2VcIl0sZnVuY3Rpb24obil7dmFyIHI9ZVtuXTtoLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3JldHVybiBHKHRoaXMsci5hcHBseSh0aGlzLl93cmFwcGVkLGFyZ3VtZW50cykpfX0pLGgucHJvdG90eXBlLnZhbHVlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3dyYXBwZWR9LGgucHJvdG90eXBlLnZhbHVlT2Y9aC5wcm90b3R5cGUudG9KU09OPWgucHJvdG90eXBlLnZhbHVlLGgucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIFN0cmluZyh0aGlzLl93cmFwcGVkKX0sXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kJiZkZWZpbmUoXCJ1bmRlcnNjb3JlXCIsW10sZnVuY3Rpb24oKXtyZXR1cm4gaH0pfSgpO1xyXG4iLCJpbXBvcnQge2V4dHJhY3RFeHRlbnNpb259IGZyb20gXCJ1dGlscy9zdHJpbmdzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgaXNSdG1wID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCdydG1wOicpID09IDAgfHwgdHlwZSA9PSAncnRtcCcpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgaXNXZWJSVEMgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgaWYoZmlsZSl7XHJcbiAgICAgICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3dzOicpID09PSAwIHx8IGZpbGUuaW5kZXhPZignd3NzOicpID09PSAwIHx8IHR5cGUgPT09ICd3ZWJydGMnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGlzRGFzaCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICByZXR1cm4gKCB0eXBlID09PSAnbXBkJyB8fCAgdHlwZSA9PT0gJ2Rhc2gnIHx8IHR5cGUgPT09ICdhcHBsaWNhdGlvbi9kYXNoK3htbCcgfHwgZXh0cmFjdEV4dGVuc2lvbihmaWxlKSA9PSAnbXBkJyk7XHJcbn07XHJcbiIsIi8qKlxuICogdXRpbHMgZm9yIHdlYnBhY2tcbiAqL1xuXG5leHBvcnQgY29uc3QgZ2V0U2NyaXB0UGF0aCA9IGZ1bmN0aW9uKHNjcmlwdE5hbWUpIHtcbiAgICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzcmMgPSBzY3JpcHRzW2ldLnNyYztcbiAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzcmMubGFzdEluZGV4T2YoJy8nICsgc2NyaXB0TmFtZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzcmMuc3Vic3RyKDAsIGluZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xufTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI5Li5cbiAqL1xuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSBfX1ZFUlNJT05fXztcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjYuLlxyXG4gKi9cclxuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xyXG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcblxyXG5jb25zdCBGdWxsU2NyZWVuQnV0dG9uID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpKXtcclxuICAgIGNvbnN0ICRyb290ID0gTEEkKFwiI1wiK2FwaS5nZXRDb250YWluZXJJZCgpKTtcclxuICAgIGxldCAkaWNvbkV4cGFuZCA9IFwiXCIsICRpY29uQ29tcHJlc3MgPSBcIlwiLCBpc0Z1bGxTY3JlZW4gPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgZnVsbFNjcmVlbkV2ZW50VHlwZXMgPSB7XHJcbiAgICAgICAgb25mdWxsc2NyZWVuY2hhbmdlIDogXCJmdWxsc2NyZWVuY2hhbmdlXCIsXHJcbiAgICAgICAgb25tb3pmdWxsc2NyZWVuY2hhbmdlIDogXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIsXHJcbiAgICAgICAgb253ZWJraXRmdWxsc2NyZWVuY2hhbmdlIDogXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsXHJcbiAgICAgICAgTVNGdWxsc2NyZWVuQ2hhbmdlIDogXCJNU0Z1bGxzY3JlZW5DaGFuZ2VcIlxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZnVsbFNjcmVlbkNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBsZXQgY2hlY2tGdWxsU2NyZWVuID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50IHx8IGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8IGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8IGRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGNoZWNrRnVsbFNjcmVlbigpKSB7XHJcbiAgICAgICAgICAgICRyb290LmFkZENsYXNzKFwib3ZwLWZ1bGxzY3JlZW5cIik7XHJcbiAgICAgICAgICAgIGlzRnVsbFNjcmVlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICRpY29uRXhwYW5kLmhpZGUoKTtcclxuICAgICAgICAgICAgJGljb25Db21wcmVzcy5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHJvb3QucmVtb3ZlQ2xhc3MoXCJvdnAtZnVsbHNjcmVlblwiKTtcclxuICAgICAgICAgICAgaXNGdWxsU2NyZWVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICRpY29uRXhwYW5kLnNob3coKTtcclxuICAgICAgICAgICAgJGljb25Db21wcmVzcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcmVxdWVzdEZ1bGxTY3JlZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCRyb290LmdldCgpLnJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgICRyb290LmdldCgpLnJlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgkcm9vdC5nZXQoKS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICAkcm9vdC5nZXQoKS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoJHJvb3QuZ2V0KCkubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgJHJvb3QuZ2V0KCkubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCRyb290LmdldCgpLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgJHJvb3QuZ2V0KCkubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8ocm9jayk6IHdhcm4gbm90IHN1cHBvcnRlZFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBsZXQgZXhpdEZ1bGxTY3JlZW4gPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVE9ETyhyb2NrKTogd2FybiBub3Qgc3VwcG9ydGVkXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IHRvZ2dsZUZ1bGxTY3JlZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCFpc0Z1bGxTY3JlZW4pIHtcclxuICAgICAgICAgICAgcmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBleGl0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgJGljb25FeHBhbmQgPSAkY3VycmVudC5maW5kKCcub3ZwLWZ1bGxzY3JlZW4tYnV0dG9uLWV4cGFuZGljb24nKTtcclxuICAgICAgICAkaWNvbkNvbXByZXNzID0gJGN1cnJlbnQuZmluZCgnLm92cC1mdWxsc2NyZWVuLWJ1dHRvbi1jb21wcmVzc2ljb24nKTtcclxuXHJcbiAgICAgICAgLy9CaW5kIEdsb2JhbChkb2N1bWVudCkgRXZlbnRcclxuICAgICAgICBPYmplY3Qua2V5cyhmdWxsU2NyZWVuRXZlbnRUeXBlcykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xyXG4gICAgICAgICAgICAvL0RpZmZlcmVuY2UgYmV0d2VlbiB1bmRlZmluZWQgYW5kIG51bGwuXHJcbiAgICAgICAgICAgIC8vdW5kZWZpbmVkIGlzIG5vdCBzdXBwb3J0LiBudWxsIGlzIHN1cHBvcnQgYnV0IG5vdCBpbml0ZWQuXHJcbiAgICAgICAgICAgIGlmKGRvY3VtZW50W2V2ZW50TmFtZV0gPT09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihmdWxsU2NyZWVuRXZlbnRUeXBlc1tldmVudE5hbWVdLCBmdWxsU2NyZWVuQ2hhbmdlZENhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vVW5iaW5kIEdsb2JhbChkb2N1bWVudCkgRXZlbnRcclxuICAgICAgICBPYmplY3Qua2V5cyhmdWxsU2NyZWVuRXZlbnRUeXBlcykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xyXG4gICAgICAgICAgICBpZihkb2N1bWVudFtldmVudE5hbWVdID09PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZnVsbFNjcmVlbkV2ZW50VHlwZXNbZXZlbnROYW1lXSwgZnVsbFNjcmVlbkNoYW5nZWRDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgZXZlbnRzID0ge1xyXG4gICAgICAgIFwiY2xpY2sgLm92cC1mdWxsc2NyZWVuLWJ1dHRvblwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRvZ2dsZUZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJGdWxsU2NyZWVuQnV0dG9uXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGdWxsU2NyZWVuQnV0dG9uO1xyXG4iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgICc8YnV0dG9uIGNsYXNzPVwib3ZwLWJ1dHRvbiBvdnAtZnVsbHNjcmVlbi1idXR0b25cIj4nICtcclxuICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLWZ1bGxzY3JlZW4tYnV0dG9uLWV4cGFuZGljb25cIj48L2k+JyArXHJcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm92cC1mdWxsc2NyZWVuLWJ1dHRvbi1jb21wcmVzc2ljb25cIj48L2k+JyArXHJcbiAgICAgICAgJzwvYnV0dG9uPidcclxuICAgICk7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjAuLlxyXG4gKi9cclxuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xyXG5pbXBvcnQgUGxheUJ1dHRvbiBmcm9tICd2aWV3L2NvbnRyb2xzL3BsYXlCdXR0b24nO1xyXG5pbXBvcnQgVm9sdW1lQnV0dG9uIGZyb20gJ3ZpZXcvY29udHJvbHMvdm9sdW1lQnV0dG9uJztcclxuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ3ZpZXcvY29udHJvbHMvcHJvZ3Jlc3NCYXInO1xyXG5pbXBvcnQgVGltZURpc3BsYXkgZnJvbSAndmlldy9jb250cm9scy90aW1lRGlzcGxheSc7XHJcbmltcG9ydCBGdWxsU2NyZWVuQnV0dG9uIGZyb20gJ3ZpZXcvY29udHJvbHMvZnVsbFNjcmVlbkJ1dHRvbic7XHJcbmltcG9ydCBTZXR0aW5nUGFuZWwgZnJvbSAndmlldy9jb250cm9scy9zZXR0aW5nUGFuZWwnO1xyXG5pbXBvcnQgU2V0dGluZ1BhbmVsTGlzdCBmcm9tICd2aWV3L2dsb2JhbC9TZXR0aW5nUGFuZWxMaXN0JztcclxuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBSRUFEWSxcclxuICAgIENPTlRFTlRfTUVUQSxcclxuICAgIFBST1ZJREVSX1JUTVAsXHJcbiAgICBFUlJPUlxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCBDb250cm9scyA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSl7XHJcbiAgICBsZXQgdm9sdW1lQnV0dG9uID0gXCJcIiwgcGxheUJ1dHRvbj0gXCJcIiwgcHJvZ3Jlc3NCYXIgPSBcIlwiLCB0aW1lRGlzcGxheSA9IFwiXCIsIGZ1bGxTY3JlZW5CdXR0b24gPSBcIlwiO1xyXG5cclxuICAgIGxldCBnZW5lcmF0ZU1haW5QYW5lbERhdGEgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBwYW5lbCA9IHt0aXRsZSA6IFwiU2V0dGluZ3NcIiwgaXNNYWluIDogdHJ1ZSwgYm9keSA6IFtdfTtcclxuICAgICAgICBsZXQgY3VycmVudFNvdXJjZSA9IGFwaS5nZXRDdXJyZW50UXVhbGl0eSgpO1xyXG4gICAgICAgIGlmKGFwaS5nZXREdXJhdGlvbigpICE9PSBJbmZpbml0eSAmJiBjdXJyZW50U291cmNlLnR5cGUgIT09IFBST1ZJREVSX1JUTVApe1xyXG4gICAgICAgICAgICBsZXQgYm9keSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlIDogXCJTcGVlZFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgOiAgYXBpLmdldFBsYXliYWNrUmF0ZSgpID09PSAxID8gXCJOb3JtYWxcIiA6IGFwaS5nZXRQbGF5YmFja1JhdGUoKSxcclxuICAgICAgICAgICAgICAgIHR5cGUgOiBcInBsYXliYWNrcmF0ZVwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHBhbmVsLmJvZHkucHVzaChib2R5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhcGkuZ2V0UXVhbGl0eUxldmVscygpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRRdWFsaXR5ID0gYXBpLmdldEN1cnJlbnRRdWFsaXR5KCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgYm9keSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlIDogXCJTb3VyY2VcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlIDogY3VycmVudFF1YWxpdHkgPyBjdXJyZW50UXVhbGl0eS5sYWJlbCA6IFwiRGVmYXVsdFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZSA6IFwicXVhbGl0eWxldmVsXCJcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHBhbmVsLmJvZHkucHVzaChib2R5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhbmVsO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuXHJcbiAgICAgICAgbGV0IGluaXRUaW1lRGlzcGxheSA9IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICBpZih0aW1lRGlzcGxheSl7XHJcbiAgICAgICAgICAgICAgICB0aW1lRGlzcGxheS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGltZURpc3BsYXkgPSBUaW1lRGlzcGxheSgkY3VycmVudC5maW5kKFwiLm92cC1sZWZ0LWNvbnRyb2xzXCIpLCBhcGksIGRhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGluaXRQcm9ncmVzc0JhciA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHByb2dyZXNzQmFyKXtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9ncmVzc0JhciA9IFByb2dyZXNzQmFyKCRjdXJyZW50LmZpbmQoXCIub3ZwLXByb2dyZXNzYmFyLWNvbnRhaW5lclwiKSwgYXBpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwbGF5QnV0dG9uID0gUGxheUJ1dHRvbigkY3VycmVudC5maW5kKFwiLm92cC1sZWZ0LWNvbnRyb2xzXCIpLCBhcGkpO1xyXG4gICAgICAgIHZvbHVtZUJ1dHRvbiA9IFZvbHVtZUJ1dHRvbigkY3VycmVudC5maW5kKFwiLm92cC1sZWZ0LWNvbnRyb2xzXCIpLCBhcGkpO1xyXG4gICAgICAgIGZ1bGxTY3JlZW5CdXR0b24gPSBGdWxsU2NyZWVuQnV0dG9uKCRjdXJyZW50LmZpbmQoXCIub3ZwLXJpZ2h0LWNvbnRyb2xzXCIpLCBhcGkpO1xyXG5cclxuXHJcbiAgICAgICAgYXBpLm9uKENPTlRFTlRfTUVUQSwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpbml0VGltZURpc3BsYXkoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuZHVyYXRpb24gPT09IEluZmluaXR5KXtcclxuICAgICAgICAgICAgICAgIC8vbGl2ZVxyXG4gICAgICAgICAgICAgICAgaWYocHJvZ3Jlc3NCYXIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL3ZvZFxyXG4gICAgICAgICAgICAgICAgaW5pdFByb2dyZXNzQmFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBhcGkub24oRVJST1IsIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlLmRlc3Ryb3koKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nLlxyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuICAgICAgICBcIm1vdXNlbGVhdmUgLm92cC1jb250cm9sc1wiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB2b2x1bWVCdXR0b24uc2V0TW91c2VEb3duKGZhbHNlKTtcclxuICAgICAgICAgICAgJGN1cnJlbnQuZmluZChcIi5vdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXJcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImNsaWNrIC5vdnAtc2V0dGluZy1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgLy90b2dnbGVcclxuICAgICAgICAgICAgaWYoU2V0dGluZ1BhbmVsTGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIC8vY2xlYXIgYWxsIFNldHRpbmdQYW5lbFRlbXBsYXRlXHJcbiAgICAgICAgICAgICAgICBfLmVhY2goU2V0dGluZ1BhbmVsTGlzdCwgZnVuY3Rpb24oc2V0dGluZ1BhbmVsKXtcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBTZXR0aW5nUGFuZWxMaXN0LnNwbGljZSgwLCBTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgU2V0dGluZ1BhbmVsTGlzdC5wdXNoKFNldHRpbmdQYW5lbCgkY3VycmVudCwgYXBpLCBnZW5lcmF0ZU1haW5QYW5lbERhdGEoKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuXHJcbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiQ29udHJvbHNcIiwgIG51bGwgLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xzO1xyXG4iLCJcclxuY29uc3QgQ29udHJvbHMgPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwib3ZwLWNvbnRyb2xzLWNvbnRhaW5lclwiPicrXHJcbiAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWdyYWRpZW50LWJvdHRvbVwiPjwvZGl2PicgK1xyXG4gICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1ib3R0b20tcGFuZWxcIj4nICtcclxuICAgICAgICAgJyAgICA8ZGl2IGNsYXNzPVwib3ZwLXByb2dyZXNzYmFyLWNvbnRhaW5lclwiPicgK1xyXG4gICAgICAgICAnICAgIDwvZGl2PicgK1xyXG4gICAgICAgICAnICAgIDxkaXYgY2xhc3M9XCJvdnAtY29udHJvbHNcIj4nICtcclxuICAgICAgICAgJyAgICAgICAgPGRpdiBjbGFzcz1cIm92cC1sZWZ0LWNvbnRyb2xzXCI+JyArXHJcbiAgICAgICAgICcgICAgICAgIDwvZGl2PicgK1xyXG4gICAgICAgICAnICAgICAgICA8ZGl2IGNsYXNzPVwib3ZwLXJpZ2h0LWNvbnRyb2xzXCI+JyArXHJcbiAgICAgICAgICcgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwib3ZwLWJ1dHRvbiBvdnAtc2V0dGluZy1idXR0b25cIj48aSBjbGFzcz1cIm92cC1zZXR0aW5nLWJ1dHRvbi1pY29uXCI+PC9pPjwvYnV0dG9uPicgK1xyXG4gICAgICAgICAnICAgICAgICA8L2Rpdj4nICtcclxuICAgICAgICAgJyAgICA8L2Rpdj4nICtcclxuICAgICAgICAgJzwvZGl2Pic7XHJcbiAgICAnPC9kaXY+JztcclxuXHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xzO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNC4uXHJcbiAqL1xyXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XHJcbmltcG9ydCB7XHJcbiAgICBFUlJPUixcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX1BBVVNFRCxcclxuICAgIFNUQVRFX0VSUk9SLFxyXG4gICAgUExBWUVSX1NUQVRFXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbmNvbnN0IFBsYXlCdXR0b24gPSBmdW5jdGlvbiAoJGNvbnRhaW5lciwgYXBpKSB7XHJcbiAgICBsZXQgJGljb25QbGF5ID0gXCJcIixcclxuICAgICAgICAkaWNvblBhdXNlID0gXCJcIixcclxuICAgICAgICAkaWNvblJlcGxheSA9IFwiXCI7XHJcblxyXG5cclxuICAgIGxldCBzZXRCdXR0b25TdGF0ZSA9IGZ1bmN0aW9uKHN0YXRlKXtcclxuICAgICAgICAkaWNvblBsYXkuaGlkZSgpO1xyXG4gICAgICAgICRpY29uUGF1c2UuaGlkZSgpO1xyXG4gICAgICAgICRpY29uUmVwbGF5LmhpZGUoKTtcclxuXHJcbiAgICAgICAgaWYoc3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICAkaWNvblBhdXNlLnNob3coKTtcclxuICAgICAgICB9ZWxzZSBpZihzdGF0ZSA9PT0gU1RBVEVfUEFVU0VEKXtcclxuICAgICAgICAgICAgJGljb25QbGF5LnNob3coKTtcclxuICAgICAgICB9ZWxzZSBpZihzdGF0ZSA9PT0gU1RBVEVfQ09NUExFVEUpe1xyXG4gICAgICAgICAgICAkaWNvblBsYXkuc2hvdygpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkaWNvblBsYXkuc2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgJGljb25QbGF5ID0gJGN1cnJlbnQuZmluZCggXCIub3ZwLXBsYXktYnV0dG9uLXBsYXlpY29uXCIpO1xyXG4gICAgICAgICRpY29uUGF1c2UgPSAkY3VycmVudC5maW5kKFwiLm92cC1wbGF5LWJ1dHRvbi1wYXVzZWljb25cIik7XHJcbiAgICAgICAgJGljb25SZXBsYXkgPSAkY3VycmVudC5maW5kKFwiLm92cC1wbGF5LWJ1dHRvbi1yZXBsYXlpY29uXCIpO1xyXG5cclxuICAgICAgICBhcGkub24oUExBWUVSX1NUQVRFLCBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLm5ld3N0YXRlKXtcclxuICAgICAgICAgICAgICAgIHNldEJ1dHRvblN0YXRlKGRhdGEubmV3c3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vRG8gbm90aGluZy5cclxuICAgIH07XHJcbiAgICBjb25zdCBldmVudHMgPSB7XHJcbiAgICAgICAgXCJjbGljayAub3ZwLXBsYXktYnV0dG9uXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudFN0YXRlID0gYXBpLmdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IFNUQVRFX0lETEUpIHtcclxuICAgICAgICAgICAgICAgIGFwaS5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YXRlID09PSBTVEFURV9QTEFZSU5HKSB7XHJcbiAgICAgICAgICAgICAgICBhcGkucGF1c2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhdGUgPT09IFNUQVRFX1BBVVNFRCkge1xyXG4gICAgICAgICAgICAgICAgYXBpLnBsYXkoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFKSB7XHJcbiAgICAgICAgICAgICAgICBhcGkucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiUGxheUJ1dHRvblwiLCBudWxsLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5QnV0dG9uOyIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgJzxidXR0b24gY2xhc3M9XCJvdnAtYnV0dG9uIG92cC1wbGF5LWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIj4nICtcclxuICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXBsYXktYnV0dG9uLXBsYXlpY29uXCI+PC9pPicgK1xyXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtcGxheS1idXR0b24tcGF1c2VpY29uXCI+PC9pPicgK1xyXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtcGxheS1idXR0b24tcmVwbGF5aWNvblwiPjwvaT4nICtcclxuICAgICAgICAnPC9idXR0b24+J1xyXG4gICAgKTtcclxufTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNC4uXHJcbiAqL1xyXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XHJcbmltcG9ydCBTZXR0aW5nUGFuZWxMaXN0IGZyb20gJ3ZpZXcvZ2xvYmFsL1NldHRpbmdQYW5lbExpc3QnO1xyXG5pbXBvcnQge25hdHVyYWxIbXN9IGZyb20gJ3V0aWxzL3N0cmluZ3MnXHJcbmltcG9ydCBMQSQgZnJvbSAndXRpbHMvbGlrZUEkJztcclxuaW1wb3J0IHtcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfQ09NUExFVEUsXHJcbiAgICBTVEFURV9QQVVTRURcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuY29uc3QgUHJvZ3Jlc3NCYXIgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xyXG4gICAgY29uc3QgJHJvb3QgPSBMQSQoXCIjXCIrYXBpLmdldENvbnRhaW5lcklkKCkpO1xyXG4gICAgbGV0IGN1cnJlbnRQbGF5aW5nUG9zaXRpb24gPSAwO1xyXG4gICAgbGV0IGN1cnJlbnRQbGF5aW5nUGVyY2VudGFnZSA9IDA7XHJcbiAgICBsZXQgY3VycmVudExvYWRlZFBlcmNlbnRhZ2UgPSAwO1xyXG5cclxuICAgIGxldCBtb3VzZUluc2lkZSA9IGZhbHNlLCBtb3VzZURvd24gPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgJHByb2dyZXNzQmFyID0gXCJcIixcclxuICAgICAgICAkcHJvZ3Jlc3NMb2FkID0gXCJcIixcclxuICAgICAgICAkcHJvZ3Jlc3NQbGF5ID0gXCJcIixcclxuICAgICAgICAkcHJvZ3Jlc3NIb3ZlciA9IFwiXCIsXHJcbiAgICAgICAgJGtub2JDb250YWluZXIgPSBcIlwiLFxyXG4gICAgICAgICRrbm9iID0gXCJcIixcclxuICAgICAgICBrbm9iV2lkdGggPSAwLFxyXG4gICAgICAgICR0aW1lID0gXCJcIjtcclxuXHJcblxyXG4gICAgbGV0IHBvc2l0aW9uRWxlbWVudHMgPSBmdW5jdGlvbiAocGVyY2VudGFnZSkge1xyXG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSAkcHJvZ3Jlc3NCYXIud2lkdGgoKTtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHByb2dyZXNzQmFyV2lkdGggKiBwZXJjZW50YWdlO1xyXG5cclxuICAgICAgICAkcHJvZ3Jlc3NQbGF5LmNzcygnd2lkdGgnLCBwb3NpdGlvbisgJ3B4Jyk7XHJcbiAgICAgICAgJHByb2dyZXNzSG92ZXIuY3NzKCdsZWZ0JywgcG9zaXRpb24rICdweCcpO1xyXG5cclxuICAgICAgICBjb25zdCBrbm9iUG9zdGlvbiA9IChwcm9ncmVzc0JhcldpZHRoIC0ga25vYldpZHRoKSAqIHBlcmNlbnRhZ2U7XHJcbiAgICAgICAgJGtub2JDb250YWluZXIuY3NzKCdsZWZ0Jywga25vYlBvc3Rpb24rICdweCcpO1xyXG5cclxuICAgICAgICBjdXJyZW50UGxheWluZ1Bvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgY3VycmVudFBsYXlpbmdQZXJjZW50YWdlID0gcGVyY2VudGFnZTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGRyYXdIb3ZlclByb2dyZXNzID0gZnVuY3Rpb24gKHBlcmNlbnRhZ2UpIHtcclxuICAgICAgICBjb25zdCBwcm9ncmVzc0JhcldpZHRoID0gJHByb2dyZXNzQmFyLndpZHRoKCk7XHJcbiAgICAgICAgY29uc3QgaG92ZXJQb3NpdGlvbiA9IHByb2dyZXNzQmFyV2lkdGggKiBwZXJjZW50YWdlO1xyXG5cclxuICAgICAgICAkcHJvZ3Jlc3NIb3Zlci5jc3MoJ3dpZHRoJywgcGVyY2VudGFnZSA9PSAwPyBwZXJjZW50YWdlIDogKGhvdmVyUG9zaXRpb24gLSBjdXJyZW50UGxheWluZ1Bvc2l0aW9uKSsgJ3B4Jyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBkcmF3TG9hZFByb2dyZXNzID0gZnVuY3Rpb24ocGVyY2VudGFnZSkge1xyXG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSAkcHJvZ3Jlc3NCYXIud2lkdGgoKTtcclxuICAgICAgICBjb25zdCBsb2FkUG9zaXRpb24gPSBwcm9ncmVzc0JhcldpZHRoICogcGVyY2VudGFnZTtcclxuXHJcbiAgICAgICAgJHByb2dyZXNzTG9hZC5jc3MoJ3dpZHRoJywgbG9hZFBvc2l0aW9uKyAncHgnKTtcclxuICAgICAgICBjdXJyZW50TG9hZGVkUGVyY2VudGFnZSA9IHBlcmNlbnRhZ2U7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBjYWxjdWxhdGVQZXJjZW50YWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXJXaWR0aCA9ICRwcm9ncmVzc0Jhci53aWR0aCgpO1xyXG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyT2Zmc2V0WCA9ICRwcm9ncmVzc0Jhci5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgIGNvbnN0IHBvaW50ZXJPZmZzZXRYID0gZXZlbnQucGFnZVg7XHJcblxyXG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSAocG9pbnRlck9mZnNldFggLSBwcm9ncmVzc0Jhck9mZnNldFgpIC8gcHJvZ3Jlc3NCYXJXaWR0aDtcclxuXHJcbiAgICAgICAgaWYgKHBlcmNlbnRhZ2UgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBlcmNlbnRhZ2UgPiAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBlcmNlbnRhZ2U7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBkcmF3VGltZUluZGljYXRvciA9IGZ1bmN0aW9uIChwZXJjZW50YWdlLCBldmVudCkge1xyXG4gICAgICAgaWYoU2V0dGluZ1BhbmVsTGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAkdGltZS5oaWRlKCk7XHJcbiAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBhcGkuZ2V0RHVyYXRpb24oKTtcclxuICAgICAgICBjb25zdCBzZWNvbmQgPSBkdXJhdGlvbiAqIHBlcmNlbnRhZ2U7XHJcblxyXG4gICAgICAgIGNvbnN0IGhtcyA9IG5hdHVyYWxIbXMoc2Vjb25kKTtcclxuXHJcbiAgICAgICAgJHRpbWUudGV4dChobXMpO1xyXG5cclxuICAgICAgICBjb25zdCB0aW1lRWxlbVdpZHRoID0gJHRpbWUud2lkdGgoKTtcclxuICAgICAgICBjb25zdCBwcm9ncmVzc0JhcldpZHRoID0gJHByb2dyZXNzQmFyLndpZHRoKCk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBwcm9ncmVzc0JhcldpZHRoICogcGVyY2VudGFnZTtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbk9mUGl4ZWwgPSBldmVudC5wYWdlWCAtICRwcm9ncmVzc0Jhci5vZmZzZXQoKS5sZWZ0O1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlTWFnbmV0aWMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZihwb3NpdGlvbk9mUGl4ZWwgPCB0aW1lRWxlbVdpZHRoIC8gMil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfWVsc2UgaWYocHJvZ3Jlc3NCYXJXaWR0aC1wb3NpdGlvbk9mUGl4ZWwgIDwgdGltZUVsZW1XaWR0aCAvIDIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2dyZXNzQmFyV2lkdGggLSB0aW1lRWxlbVdpZHRoO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbiAtIHRpbWVFbGVtV2lkdGggLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgbWFnbmV0aWNQb3NpdGlvbiA9IGNhbGN1bGF0ZU1hZ25ldGljKCk7XHJcbiAgICAgICAgJHRpbWUuY3NzKCdsZWZ0JywgbWFnbmV0aWNQb3NpdGlvbisgXCJweFwiKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHNlZWsgPSBmdW5jdGlvbiAocGVyY2VudGFnZSkge1xyXG4gICAgICAgIGFwaS5zZWVrKCAoYXBpLmdldER1cmF0aW9uKCl8fDApICogcGVyY2VudGFnZSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgJHByb2dyZXNzQmFyID0gJGN1cnJlbnQ7XHJcbiAgICAgICAgJHByb2dyZXNzTG9hZCA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLWxvYWQtcHJvZ3Jlc3NcIik7XHJcbiAgICAgICAgJHByb2dyZXNzUGxheSA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXBsYXktcHJvZ3Jlc3NcIik7XHJcbiAgICAgICAgJHByb2dyZXNzSG92ZXIgPSAkY3VycmVudC5maW5kKFwiLm92cC1ob3Zlci1wcm9ncmVzc1wiKTtcclxuICAgICAgICAka25vYkNvbnRhaW5lciA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXByb2dyZXNzYmFyLWtub2ItY29udGFpbmVyXCIpO1xyXG4gICAgICAgICRrbm9iID0gJGN1cnJlbnQuZmluZChcIi5vdnAtcHJvZ3Jlc3NiYXIta25vYlwiKTtcclxuICAgICAgICBrbm9iV2lkdGggPSAka25vYi53aWR0aCgpO1xyXG4gICAgICAgICR0aW1lID0gJGN1cnJlbnQuZmluZChcIi5vdnAtcHJvZ3Jlc3NiYXItdGltZVwiKTtcclxuXHJcbiAgICAgICAgYXBpLm9uKCd0aW1lJywgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZihkYXRhICYmIGRhdGEuZHVyYXRpb24gJiYgZGF0YS5wb3NpdGlvbil7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKGRhdGEucG9zaXRpb24gLyBkYXRhLmR1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhcGkub24oJ2J1ZmZlckNoYW5nZWQnLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmKGRhdGEgJiYgZGF0YS5idWZmZXJQZXJjZW50KXtcclxuICAgICAgICAgICAgICAgIGRyYXdMb2FkUHJvZ3Jlc3MoZGF0YS5idWZmZXJQZXJjZW50IC8gMTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuICAgICAgICBcInJlc2l6ZSB3aW5kb3dcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgcG9zaXRpb25FbGVtZW50cyhjdXJyZW50UGxheWluZ1BlcmNlbnRhZ2UpO1xyXG4gICAgICAgICAgICBkcmF3TG9hZFByb2dyZXNzKGN1cnJlbnRMb2FkZWRQZXJjZW50YWdlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW91c2VlbnRlciAub3ZwLXByb2dyZXNzYmFyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIG1vdXNlSW5zaWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgJHRpbWUuc2hvdygpO1xyXG4gICAgICAgICAgICAkcm9vdC5hZGRDbGFzcyhcIm92cC1wcm9ncmVzc2Jhci1ob3ZlclwiKTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vdXNlbGVhdmUgLm92cC1wcm9ncmVzc2JhclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBtb3VzZUluc2lkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIW1vdXNlSW5zaWRlKSB7XHJcbiAgICAgICAgICAgICAgICAkcm9vdC5yZW1vdmVDbGFzcyhcIm92cC1wcm9ncmVzc2Jhci1ob3ZlclwiKTtcclxuICAgICAgICAgICAgICAgICR0aW1lLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkcmF3SG92ZXJQcm9ncmVzcygwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW91c2Vkb3duIC5vdnAtcHJvZ3Jlc3NiYXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBtb3VzZURvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gY2FsY3VsYXRlUGVyY2VudGFnZShldmVudCk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMocGVyY2VudGFnZSk7XHJcbiAgICAgICAgICAgIGRyYXdIb3ZlclByb2dyZXNzKDApO1xyXG4gICAgICAgICAgICBzZWVrKHBlcmNlbnRhZ2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb3VzZW1vdmUgLm92cC1wcm9ncmVzc2JhclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW1vdXNlRG93bikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IGNhbGN1bGF0ZVBlcmNlbnRhZ2UoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgZHJhd0hvdmVyUHJvZ3Jlc3MocGVyY2VudGFnZSk7XHJcbiAgICAgICAgICAgICAgICBkcmF3VGltZUluZGljYXRvcihwZXJjZW50YWdlLCBldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW91c2Vtb3ZlIGRvY3VtZW50XCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKG1vdXNlRG93bikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IGNhbGN1bGF0ZVBlcmNlbnRhZ2UoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25FbGVtZW50cyhwZXJjZW50YWdlKTtcclxuICAgICAgICAgICAgICAgIGRyYXdIb3ZlclByb2dyZXNzKDApO1xyXG4gICAgICAgICAgICAgICAgc2VlayhwZXJjZW50YWdlKTtcclxuICAgICAgICAgICAgICAgIGRyYXdUaW1lSW5kaWNhdG9yKHBlcmNlbnRhZ2UsIGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb3VzZXVwIGRvY3VtZW50XCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKG1vdXNlRG93bil7XHJcbiAgICAgICAgICAgICAgICBtb3VzZURvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICRyb290LnJlbW92ZUNsYXNzKFwib3ZwLXByb2dyZXNzYmFyLWhvdmVyXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIlByb2dyZXNzQmFyXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzQmFyO1xyXG4iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXByb2dyZXNzYmFyXCIgdGFiaW5kZXg9XCIwXCI+JyArXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXByb2dyZXNzYmFyLXBhZGRpbmdcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcHJvZ3Jlc3MtbGlzdFwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtbG9hZC1wcm9ncmVzc1wiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcGxheS1wcm9ncmVzcyBvdnAtcGxheS1iYWNrZ3JvdW5kLWNvbG9yXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1ob3Zlci1wcm9ncmVzc1wiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXByb2dyZXNzYmFyLWtub2ItY29udGFpbmVyXCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1wcm9ncmVzc2Jhci1rbm9iIG92cC1wbGF5LWJhY2tncm91bmQtY29sb3JcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXItdGltZVwiPjA6MDA8L3NwYW4+JyArXHJcbiAgICAgICAgJzwvZGl2PidcclxuICAgICk7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjYuLlxyXG4gKi9cclxuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xyXG5pbXBvcnQgU2V0dGluZ1BhbmVsTGlzdCBmcm9tICd2aWV3L2dsb2JhbC9TZXR0aW5nUGFuZWxMaXN0JztcclxuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcclxuY29uc3QgUExBWUVSX01JTl9IRUlHSFQgPSAyMjA7XHJcbmNvbnN0IFNldHRpbmdQYW5lbCA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSwgZGF0YSl7XHJcbiAgICBjb25zdCAkcm9vdCA9IExBJChcIiNcIithcGkuZ2V0Q29udGFpbmVySWQoKSk7XHJcblxyXG4gICAgbGV0IGV4dHJhY3RQYW5lbERhdGEgPSBmdW5jdGlvbihwYW5lbFR5cGUpe1xyXG4gICAgICAgIGxldCBwYW5lbCA9IHt0aXRsZSA6IFwiXCIsIGJvZHkgOiBbXSwgdHlwZSA6IHBhbmVsVHlwZX07XHJcblxyXG4gICAgICAgIGlmKHBhbmVsVHlwZSA9PT0gXCJwbGF5YmFja3JhdGVcIil7XHJcbiAgICAgICAgICAgIHBhbmVsLnRpdGxlID0gXCJTcGVlZFwiO1xyXG4gICAgICAgICAgICBsZXQgcGxheUJhY2tSYXRlcyA9IGFwaS5nZXRDb25maWcoKS5wbGF5YmFja1JhdGVzO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFBsYXliYWNrUmF0ZSA9IGFwaS5nZXRQbGF5YmFja1JhdGUoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5QmFja1JhdGVzLmxlbmd0aDsgaSArKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiAocGxheUJhY2tSYXRlc1tpXSA9PT0gMT8gXCJOb3JtYWxcIiA6IHBsYXlCYWNrUmF0ZXNbaV0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2hlY2sgOiBjdXJyZW50UGxheWJhY2tSYXRlID09PSBwbGF5QmFja1JhdGVzW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlIDogcGxheUJhY2tSYXRlc1tpXVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHBhbmVsLmJvZHkucHVzaChib2R5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9ZWxzZSBpZihwYW5lbFR5cGUgPT09IFwicXVhbGl0eWxldmVsXCIpe1xyXG4gICAgICAgICAgICBwYW5lbC50aXRsZSA9IFwiU291cmNlXCI7XHJcblxyXG4gICAgICAgICAgICBsZXQgcXVhbGl0eUxldmVscyA9IGFwaS5nZXRRdWFsaXR5TGV2ZWxzKCk7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UXVhbGl0eSA9IGFwaS5nZXRDdXJyZW50UXVhbGl0eSgpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWFsaXR5TGV2ZWxzLmxlbmd0aDsgaSArKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgOiBxdWFsaXR5TGV2ZWxzW2ldLmxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2hlY2sgOiBjdXJyZW50UXVhbGl0eS5pbmRleCA9PT0gaSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IGlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBwYW5lbC5ib2R5LnB1c2goYm9keSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYW5lbDtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgaWYoUExBWUVSX01JTl9IRUlHSFQgPiAkcm9vdC5oZWlnaHQoKSl7XHJcbiAgICAgICAgICAgICRyb290LmZpbmQoXCIub3ZwLXNldHRpbmctcGFuZWxcIikuY3NzKFwibWF4SGVpZ2h0XCIsIFwiMTE0cHhcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvL0RvIG5vdGhpbmcuXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZXZlbnRzID0ge1xyXG4gICAgICAgIFwiY2xpY2sgLm92cC1zZXR0aW5nLW1haW4taXRlbVwiOiBmdW5jdGlvbiAoZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBsZXQgcGFuZWxUeXBlID0gTEEkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJvdnAtcGFuZWwtdHlwZVwiKTtcclxuICAgICAgICAgICAgLy9wYXJlbnQgbXVzdCBiZSBub3QgJGN1cnJlbnQhXHJcbiAgICAgICAgICAgIFNldHRpbmdQYW5lbExpc3QucHVzaChTZXR0aW5nUGFuZWwoJGNvbnRhaW5lciwgYXBpLCBleHRyYWN0UGFuZWxEYXRhKHBhbmVsVHlwZSkpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiY2xpY2sgLm92cC1zZXR0aW5nLXRpdGxlXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vUmVtb3ZlIEN1cnJlbnQgUGFuZWxcclxuICAgICAgICAgICAgbGV0IGxhc3QgPSBTZXR0aW5nUGFuZWxMaXN0LnBvcCgpO1xyXG4gICAgICAgICAgICBsYXN0LmRlc3Ryb3koKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiY2xpY2sgLm92cC1zZXR0aW5nLWl0ZW0tdmFsdWVcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBhbmVsVHlwZSA9IExBJChldmVudC5jdXJyZW50VGFyZ2V0KS5hdHRyKFwib3ZwLXBhbmVsLXR5cGVcIik7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IExBJChldmVudC5jdXJyZW50VGFyZ2V0KS5hdHRyKFwib3ZwLWRhdGEtdmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICBpZihwYW5lbFR5cGUgJiYgdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgaWYocGFuZWxUeXBlID09PSBcInBsYXliYWNrcmF0ZVwiKXtcclxuICAgICAgICAgICAgICAgICAgICBhcGkuc2V0UGxheWJhY2tSYXRlKHBhcnNlRmxvYXQodmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHBhbmVsVHlwZSA9PT0gXCJxdWFsaXR5bGV2ZWxcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBpLnNldEN1cnJlbnRRdWFsaXR5KHBhcnNlSW50KHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jbGVhciBhbGwgU2V0dGluZ1BhbmVsVGVtcGxhdGVcclxuICAgICAgICAgICAgICAgIF8uZWFjaChTZXR0aW5nUGFuZWxMaXN0LCBmdW5jdGlvbihzZXR0aW5nUGFuZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdQYW5lbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFNldHRpbmdQYW5lbExpc3Quc3BsaWNlKDAsIFNldHRpbmdQYW5lbExpc3QubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJTZXR0aW5nUGFuZWxcIiwgZGF0YSwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldHRpbmdQYW5lbDtcclxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChkYXRhKSA9PiB7XHJcbiAgICBsZXQgZWxlbWVudHMgPSAnPGRpdiBjbGFzcz1cIm92cC1zZXR0aW5nLXBhbmVsICcrKGRhdGEuaXNNYWluID8gJ2FuaW1hdGVkIGZhZGVJbic6ICcnKSsnXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXNldHRpbmctdGl0bGUtY29udGFpbmVyXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1zZXR0aW5nLXRpdGxlXCIgdGFiaW5kZXg9XCIwXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRhdGEuaXNNYWluID8gJycgOiAnPHNwYW4gY2xhc3M9XCJvdnAtc2V0dGluZy10aXRsZS1wcmV2aWNvblwiPiZsdDs8L3NwYW4+JykgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1zZXR0aW5nLXRpdGxlLXRpdGxlXCI+JytkYXRhLnRpdGxlKyc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0tY29udGFpbmVyXCI+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChkYXRhLmJvZHksIGZ1bmN0aW9uKGJvZHkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuaXNNYWluKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgKz0gc2V0dGluZ0l0ZW1UZW1wbGF0ZShib2R5LnRpdGxlLCBib2R5LnZhbHVlLCBib2R5LnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyArPSBzZXR0aW5nVmFsdWVUZW1wbGF0ZShib2R5LnRpdGxlLCBib2R5LnZhbHVlLCBkYXRhLnR5cGUsIGJvZHkuaXNDaGVjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICBlbGVtZW50cys9ICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcclxuICAgIHJldHVybiBlbGVtZW50cztcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXR0aW5nSXRlbVRlbXBsYXRlID0gKHRpdGxlLCB2YWx1ZSwgdHlwZSkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0gb3ZwLXNldHRpbmctbWFpbi1pdGVtXCIgb3ZwLXBhbmVsLXR5cGU9XCInK3R5cGUrJ1wiPicgK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtLXRpdGxlXCI+Jyt0aXRsZSsnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtLW5leHRpY29uXCI+Jmd0Ozwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbS12YWx1ZVwiPicrdmFsdWUrJzwvc3Bhbj4nICtcclxuICAgICAgICAnPC9kaXY+J1xyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXR0aW5nVmFsdWVUZW1wbGF0ZSA9ICh0aXRsZSwgdmFsdWUsIHR5cGUsIGlzQ2hlY2spID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtIG92cC1zZXR0aW5nLWl0ZW0tdmFsdWVcIiBvdnAtcGFuZWwtdHlwZT1cIicrdHlwZSsnXCIgb3ZwLWRhdGEtdmFsdWU9XCInK3ZhbHVlKydcIj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbS1jaGVja2VkICcrKGlzQ2hlY2s/J292cC1zaG93JzonJykrJ1wiPiYjeDI3MTM7PC9zcGFuPicgK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtLXRpdGxlXCI+Jyt0aXRsZSsnPC9zcGFuPicgK1xyXG4gICAgICAgICc8L2Rpdj4nXHJcbiAgICApO1xyXG59O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI1Li5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuaW1wb3J0IHtuYXR1cmFsSG1zfSBmcm9tICd1dGlscy9zdHJpbmdzJztcclxuXHJcbmNvbnN0IFRpbWVEaXNwbGF5ID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpLCBkYXRhKXtcclxuXHJcbiAgICBsZXQgJHBvc2l0aW9uID0gXCJcIiwgJGR1cmF0aW9uID0gXCJcIjtcclxuICAgIGxldCBjb252ZXJ0SHVtYW5pemVUaW1lID0gZnVuY3Rpb24odGltZSl7XHJcbiAgICAgICAgcmV0dXJuIG5hdHVyYWxIbXModGltZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICRwb3NpdGlvbiA9ICRjdXJyZW50LmZpbmQoJy5vdnAtdGltZS1jdXJyZW50Jyk7XHJcbiAgICAgICAgJGR1cmF0aW9uID0gJGN1cnJlbnQuZmluZCgnLm92cC10aW1lLWR1cmF0aW9uJyk7XHJcblxyXG4gICAgICAgIGlmKGRhdGEuZHVyYXRpb24gIT09IEluZmluaXR5KXtcclxuXHJcbiAgICAgICAgICAgICRkdXJhdGlvbi50ZXh0KGNvbnZlcnRIdW1hbml6ZVRpbWUoZGF0YS5kdXJhdGlvbikpO1xyXG4gICAgICAgICAgICBhcGkub24oJ3RpbWUnLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAkcG9zaXRpb24udGV4dChjb252ZXJ0SHVtYW5pemVUaW1lKGRhdGEucG9zaXRpb24pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nLlxyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJUaW1lRGlzcGxheVwiLCBkYXRhLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGltZURpc3BsYXk7IiwiZXhwb3J0IGRlZmF1bHQgKGRhdGEpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdGltZS1kaXNwbGF5XCI+JytcclxuICAgICAgICAgICAgKGRhdGEuZHVyYXRpb24gPT09IEluZmluaXR5XHJcbiAgICAgICAgICAgICAgICA/XHJcbiAgICAgICAgICAgICAgICAoJzxidXR0b24gY2xhc3M9XCJvdnAtbGl2ZS1iYWRnZSBvdnAtYnV0dG9uXCIgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgIChkYXRhLnR5cGUgPT0nd2VicnRjJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1saXZlLWJhZGdlLWxvd2xhdGVuY3lcIj5sb3cgbGF0ZW5jeSBsaXZlPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+bGl2ZTwvc3Bhbj4nKSArXHJcbiAgICAgICAgICAgICAgICAnPC9idXR0b24+JylcclxuICAgICAgICAgICAgICAgIDpcclxuICAgICAgICAgICAgICAgICgnPHNwYW4gY2xhc3M9XCJvdnAtdGltZS1jdXJyZW50XCI+MDowMDwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtdGltZS1zZXBhcmF0b3JcIj4gLyA8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXRpbWUtZHVyYXRpb25cIj4wOjAwPC9zcGFuPicpXHJcbiAgICAgICAgICAgICkgK1xyXG4gICAgICAgICc8L2Rpdj4nXHJcbiAgICApO1xyXG59O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIwLi5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuXHJcbmNvbnN0IFZvbHVtZUJ1dHRvbiA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSl7XHJcblxyXG4gICAgbGV0ICRzbGlkZXJDb250YWluZXIgPSBcIlwiLFxyXG4gICAgICAgICRzbGlkZXIgPSBcIlwiLFxyXG4gICAgICAgICRzbGlkZXJIYW5kbGUgPSBcIlwiLFxyXG4gICAgICAgICRzbGlkZXJWYWx1ZSA9IFwiXCIsXHJcbiAgICAgICAgJHZvbHVtZUljb25CaWcgPSBcIlwiLFxyXG4gICAgICAgICR2b2x1bWVJY29uU21hbGwgPSBcIlwiLFxyXG4gICAgICAgICR2b2x1bWVJY29uTXV0ZSA9IFwiXCI7XHJcbiAgICBsZXQgbW91c2VEb3duID0gZmFsc2U7XHJcbiAgICBsZXQgc2xpZGVyV2lkdGggPSA3MCwgIGhhbmRsZVdpZHRoID0gMCwgbWluUmFuZ2UgPSAwLCBtYXhSYW5nZSA9IDA7XHJcblxyXG5cclxuICAgIC8qcHJpdmF0ZSBmdW5jdGlvbnMqL1xyXG4gICAgbGV0IHNldFZvbHVtZUljb24gPSBmdW5jdGlvbihwZXJjZW50YWdlKSB7XHJcbiAgICAgICAgJHZvbHVtZUljb25CaWcuaGlkZSgpO1xyXG4gICAgICAgICR2b2x1bWVJY29uU21hbGwuaGlkZSgpO1xyXG4gICAgICAgICR2b2x1bWVJY29uTXV0ZS5oaWRlKCk7XHJcblxyXG4gICAgICAgIGlmIChwZXJjZW50YWdlID49IDcwKSB7XHJcbiAgICAgICAgICAgICR2b2x1bWVJY29uQmlnLnNob3coKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBlcmNlbnRhZ2UgPCA3MCAmJiBwZXJjZW50YWdlID4gMCkge1xyXG4gICAgICAgICAgICAkdm9sdW1lSWNvblNtYWxsLnNob3coKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBlcmNlbnRhZ2UgPT0gMCkge1xyXG4gICAgICAgICAgICAkdm9sdW1lSWNvbk11dGUuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2V0Vm9sdW1lVUkgPSBmdW5jdGlvbihwZXJjZW50YWdlKSB7XHJcbiAgICAgICAgaWYgKGFwaS5nZXRNdXRlKCkpIHtcclxuICAgICAgICAgICAgcGVyY2VudGFnZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRWb2x1bWVJY29uKHBlcmNlbnRhZ2UpO1xyXG5cclxuICAgICAgICBjb25zdCBoYW5kbGVQb3NpdGlvbiA9IG1heFJhbmdlICogcGVyY2VudGFnZSAvIDEwMDtcclxuXHJcbiAgICAgICAgJHNsaWRlckhhbmRsZS5jc3MoJ2xlZnQnLCBoYW5kbGVQb3NpdGlvbisgJ3B4Jyk7XHJcbiAgICAgICAgJHNsaWRlclZhbHVlLmNzcygnd2lkdGgnLCBoYW5kbGVQb3NpdGlvbisgJ3B4Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNhbGN1bGF0ZVBlcmNlbnRhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCByZWxhdGl2ZVggPSBldmVudC5wYWdlWCAtICRzbGlkZXIub2Zmc2V0KCkubGVmdDtcclxuICAgICAgICBsZXQgcGVyY2VudGFnZSA9IHJlbGF0aXZlWCAvIHNsaWRlcldpZHRoICogMTAwO1xyXG5cclxuICAgICAgICBpZiAocGVyY2VudGFnZSA8IDApIHtcclxuICAgICAgICAgICAgcGVyY2VudGFnZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGVyY2VudGFnZSA+IDEwMCkge1xyXG4gICAgICAgICAgICBwZXJjZW50YWdlID0gMTAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBlcmNlbnRhZ2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICRzbGlkZXJDb250YWluZXIgPSAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lclwiKTtcclxuICAgICAgICAkc2xpZGVyID0gJGN1cnJlbnQuZmluZChcIi5vdnAtdm9sdW1lLXNpbGRlclwiKTtcclxuICAgICAgICAkc2xpZGVySGFuZGxlID0gJGN1cnJlbnQuZmluZChcIi5vdnAtdm9sdW1lLXNsaWRlci1oYW5kbGVcIik7XHJcbiAgICAgICAgJHNsaWRlclZhbHVlID0gJGN1cnJlbnQuZmluZChcIi5vdnAtdm9sdW1lLXNsaWRlci12YWx1ZVwiKTtcclxuXHJcbiAgICAgICAgJHZvbHVtZUljb25CaWcgPSAkY3VycmVudC5maW5kKCBcIi5vdnAtdm9sdW1lLWJ1dHRvbi1iaWdpY29uXCIpO1xyXG4gICAgICAgICR2b2x1bWVJY29uU21hbGwgPSAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtYnV0dG9uLXNtYWxsaWNvblwiKTtcclxuICAgICAgICAkdm9sdW1lSWNvbk11dGUgPSAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtYnV0dG9uLW11dGVpY29uXCIpO1xyXG5cclxuICAgICAgICBoYW5kbGVXaWR0aCA9ICRzbGlkZXJIYW5kbGUud2lkdGgoKTtcclxuICAgICAgICBtYXhSYW5nZSA9IHNsaWRlcldpZHRoIC0gaGFuZGxlV2lkdGg7XHJcblxyXG4gICAgICAgIGFwaS5vbigncmVhZHknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0Vm9sdW1lVUkoYXBpLmdldFZvbHVtZSgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcGkub24oJ3ZvbHVtZUNoYW5nZWQnLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHNldFZvbHVtZVVJKGRhdGEudm9sdW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcGkub24oJ211dGUnLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLm11dGUpIHtcclxuICAgICAgICAgICAgICAgIHNldFZvbHVtZVVJKDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0Vm9sdW1lVUkoYXBpLmdldFZvbHVtZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuICAgICAgICBcImNsaWNrIC5vdnAtdm9sdW1lLWJ1dHRvblwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXBpLmdldFZvbHVtZSgpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBhcGkuc2V0TXV0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBhcGkuc2V0Vm9sdW1lKDEwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhcGkuc2V0TXV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vdXNlZW50ZXIgLm92cC12b2x1bWUtYnV0dG9uXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJHNsaWRlckNvbnRhaW5lci5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW91c2VsZWF2ZSAub3ZwLXZvbHVtZS1zaWxkZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgbW91c2VEb3duID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm1vdXNlZG93biAub3ZwLXZvbHVtZS1zaWxkZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBtb3VzZURvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICBhcGkuc2V0TXV0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGFwaS5zZXRWb2x1bWUoY2FsY3VsYXRlUGVyY2VudGFnZShldmVudCkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb3VzZXVwIC5vdnAtdm9sdW1lLXNpbGRlclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb3VzZW1vdmUgLm92cC12b2x1bWUtc2lsZGVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKCFtb3VzZURvd24pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXBpLnNldFZvbHVtZShjYWxjdWxhdGVQZXJjZW50YWdlKGV2ZW50KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJWb2x1bWVCdXR0b25cIiwgbnVsbCwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCksIHtcclxuICAgICAgICBzZXRNb3VzZURvd246IGZ1bmN0aW9uIChzdGF0ZSkge1xyXG4gICAgICAgICAgICBtb3VzZURvd24gPSBzdGF0ZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZvbHVtZUJ1dHRvbjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMC4uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXZvbHVtZS1jb250cm9sbGVyXCI+JytcclxuICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJvdnAtYnV0dG9uIG92cC12b2x1bWUtYnV0dG9uXCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtdm9sdW1lLWJ1dHRvbi1iaWdpY29uXCI+PC9pPicgK1xyXG4gICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXZvbHVtZS1idXR0b24tc21hbGxpY29uXCI+PC9pPicgK1xyXG4gICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXZvbHVtZS1idXR0b24tbXV0ZWljb25cIj48L2k+JyArXHJcbiAgICAgICAgICAgICc8L2J1dHRvbj4nICtcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXJcIj4nICtcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXZvbHVtZS1zaWxkZXJcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC12b2x1bWUtc2xpZGVyLWJnXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdm9sdW1lLXNsaWRlci12YWx1ZVwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXZvbHVtZS1zbGlkZXItaGFuZGxlXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICc8L2Rpdj4nXHJcbiAgICApO1xyXG59O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDE5Li5cclxuICovXHJcblxyXG5pbXBvcnQgVGVtcGxhdGVzIGZyb20gXCJ2aWV3L2VuZ2luZS9UZW1wbGF0ZXNcIjtcclxuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgaXMgc2ltcGxlIHVpIHJlbmRlcmVyLiBUaGlzIHJldHVybnMgb25SZW5kZXJlZCBjYWxsYmFjaywgb25EZXN0cm95ZWQgY2FsbGJhY2sgb24gVGVtcGxhdGUuIEFuZCB0aGlzIGJpbmQgZXZlbnRzIGZvciBUZW1wbGF0ZXMuXHJcbiAqIEBwYXJhbSAgIGNvbnRhaW5lciAgZG9tIGVsZW1lbnQgb3IgTEEkIG9iamVjdFxyXG4gKiBAcGFyYW0gICB0ZW1wbGF0ZU5hbWUgICAgdGVtcGxhdGVOYW1lXHJcbiAqIEBwYXJhbSAgIGRhdGEgICAgcHJlbG9hZCBkYXRhXHJcbiAqIEBwYXJhbSAgIGV2ZW50cyAgICBUZW1wbGF0ZSdzIGV2ZW50cy5cclxuICogQHBhcmFtICAgb25SZW5kZXJlZCAgICBUaGlzIGNhbGxiYWNrIG9jY3VycyBhZnRlciBhcHBlbmQgdGVtcGxhdGUuXHJcbiAqIEBwYXJhbSAgIG9uRGVzdHJveWVkICAgIFRoaXMgY2FsbGJhY2sgb2NjdXJzIGFmdGVyIGRlc3Ryb3llZCB0ZW1wbGF0ZS5cclxuICogQHBhcmFtICAgaXNSb290XHJcbiAqXHJcbiAqICovXHJcbmNvbnN0IE92ZW5UZW1wbGF0ZSA9IGZ1bmN0aW9uIChjb250YWluZXIsIHRlbXBsYXRlTmFtZSwgZGF0YSwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCwgaXNSb290KSB7XHJcbiAgICBsZXQgJGNvbnRhaW5lciA9IF8uaXNFbGVtZW50KGNvbnRhaW5lcikgPyBMQSQoY29udGFpbmVyKSA6IGNvbnRhaW5lcjtcclxuICAgIGxldCAkdGVtcGxhdGU7XHJcbiAgICBsZXQgdmlld0V2ZW50cyA9IHt9O1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuXHJcbiAgICBsZXQgY3JlYXRlQW5kU2VsZWN0RWxlbWVudCA9IGZ1bmN0aW9uIChodG1sKSB7XHJcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG5ld0VsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcbiAgICAgICAgJHRlbXBsYXRlID0gTEEkKG5ld0VsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50LmZpcnN0Q2hpbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzUm9vdCkge1xyXG4gICAgICAgICRjb250YWluZXIucmVwbGFjZShjcmVhdGVBbmRTZWxlY3RFbGVtZW50KFRlbXBsYXRlc1t0ZW1wbGF0ZU5hbWUgKyBcIlRlbXBsYXRlXCJdKGRhdGEpKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKGNyZWF0ZUFuZFNlbGVjdEVsZW1lbnQoVGVtcGxhdGVzW3RlbXBsYXRlTmFtZSArIFwiVGVtcGxhdGVcIl0oZGF0YSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob25SZW5kZXJlZCkge1xyXG4gICAgICAgIG9uUmVuZGVyZWQoJHRlbXBsYXRlLCB0aGF0KTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3Qua2V5cyhldmVudHMpLmZvckVhY2goZXZlbnRTdHJpbmcgPT4ge1xyXG4gICAgICAgIGxldCBleHBsb2RlZFRleHQgPSBldmVudFN0cmluZy5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGV4cGxvZGVkVGV4dFswXS5yZXBsYWNlKC8gL2dpLCBcIlwiKTtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXhwbG9kZWRUZXh0WzFdLnJlcGxhY2UoLyAvZ2ksIFwiXCIpO1xyXG5cclxuICAgICAgICBsZXQgJHRhcmdldCA9IFwiXCI7XHJcblxyXG4gICAgICAgIGlmKHRhcmdldCA9PT0gXCJkb2N1bWVudFwiIHx8IHRhcmdldCA9PT0gXCJ3aW5kb3dcIil7XHJcbiAgICAgICAgICAgICR0YXJnZXQgPSBMQSQodGFyZ2V0KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJHRhcmdldCA9ICR0ZW1wbGF0ZS5maW5kKHRhcmdldCkgfHwgKCR0ZW1wbGF0ZS5oYXNDbGFzcyh0YXJnZXQucmVwbGFjZShcIi5cIixcIlwiKSkgPyAkdGVtcGxhdGUgOiBudWxsKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoZXZlbnROYW1lICYmIHRhcmdldCAmJiAkdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IE9iamVjdC5rZXlzKHZpZXdFdmVudHMpLmxlbmd0aCsrO1xyXG5cclxuICAgICAgICAgICAgLy9iZWNhdXNlIEl0IHJldHVucyBhbm90aGVyIGRhdGEuXHJcbiAgICAgICAgICAgIGxldCB3cmFwcGVkRnVuYyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50c1tldmVudFN0cmluZ10oZXZlbnQsICR0ZW1wbGF0ZSwgdGhhdCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZpZXdFdmVudHNbaWRdID0ge25hbWU6IGV2ZW50TmFtZSwgdGFyZ2V0OiB0YXJnZXQsIGNhbGxiYWNrOiB3cmFwcGVkRnVuY307XHJcblxyXG4gICAgICAgICAgICAvL3NvbWV0aW1lcyB0YXJnZXQgaXMgTm9kZUxpc3RcclxuICAgICAgICAgICAgbGV0IG5vZGVMZW5ndGggPSAkdGFyZ2V0LmdldCgpLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYobm9kZUxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGVMaXN0ID0gJHRhcmdldC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBub2RlTGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgd3JhcHBlZEZ1bmMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9JRSBOb2RlTGlzdCBkb2Vzbid0IGhhdmUgZm9yRWFjaC4gSXQncyB3YWNrLlxyXG4gICAgICAgICAgICAgICAgLyokdGFyZ2V0LmdldCgpLmZvckVhY2goZnVuY3Rpb24oJGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB3cmFwcGVkRnVuYyk7XHJcbiAgICAgICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICR0YXJnZXQuZ2V0KCkuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHdyYXBwZWRGdW5jKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh2aWV3RXZlbnRzKS5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgbGV0IGV2ZW50ID0gdmlld0V2ZW50c1tpZF07XHJcbiAgICAgICAgICAgIGxldCAkdGFyZ2V0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldCA9PT0gXCJkb2N1bWVudFwiIHx8IGV2ZW50LnRhcmdldCA9PT0gXCJ3aW5kb3dcIil7XHJcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gTEEkKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJHRhcmdldCA9ICR0ZW1wbGF0ZS5maW5kKGV2ZW50LnRhcmdldCkgfHwgKCR0ZW1wbGF0ZS5oYXNDbGFzcyhldmVudC50YXJnZXQucmVwbGFjZShcIi5cIixcIlwiKSkgPyAkdGVtcGxhdGUgOiBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9zb21ldGltZXMgdGFyZ2V0IGlzIE5vZGVMaXN0XHJcbiAgICAgICAgICAgIGxldCBub2RlTGVuZ3RoID0gJHRhcmdldC5nZXQoKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmKG5vZGVMZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlTGlzdCA9ICR0YXJnZXQuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZUxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZUxpc3RbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudC5uYW1lLCBldmVudC5jYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvKiR0YXJnZXQuZ2V0KCkuZm9yRWFjaChmdW5jdGlvbigkaXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudC5uYW1lLCBldmVudC5jYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICR0YXJnZXQuZ2V0KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudC5uYW1lLCBldmVudC5jYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlbGV0ZSB2aWV3RXZlbnRzW2lkXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYoJHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgJHRlbXBsYXRlLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9uRGVzdHJveWVkKSB7XHJcbiAgICAgICAgICAgIG9uRGVzdHJveWVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG5cclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPdmVuVGVtcGxhdGU7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjAuLlxyXG4gKi9cclxuaW1wb3J0IFRleHRWaWV3VGVtcGxhdGUgZnJvbSAndmlldy9leGFtcGxlL21haW5UZW1wbGF0ZSc7XHJcbmltcG9ydCBWaWV3VGVtcGxhdGUgZnJvbSAndmlldy92aWV3VGVtcGxhdGUnO1xyXG5pbXBvcnQgSGVscGVyVGVtcGxhdGUgZnJvbSAndmlldy9oZWxwZXIvbWFpblRlbXBsYXRlJztcclxuaW1wb3J0IEJpZ0J1dHRvblRlbXBsYXRlIGZyb20gJ3ZpZXcvaGVscGVyL2JpZ0J1dHRvblRlbXBsYXRlJztcclxuaW1wb3J0IE1lc3NhZ2VCb3hUZW1wbGF0ZSBmcm9tICd2aWV3L2hlbHBlci9tZXNzYWdlQm94VGVtcGxhdGUnO1xyXG5pbXBvcnQgU3Bpbm5lclRlbXBsYXRlIGZyb20gJ3ZpZXcvaGVscGVyL3NwaW5uZXJUZW1wbGF0ZSc7XHJcbmltcG9ydCBDb250ZXh0UGFuZWxUZW1wbGF0ZSBmcm9tICd2aWV3L2hlbHBlci9jb250ZXh0UGFuZWxUZW1wbGF0ZSc7XHJcblxyXG5pbXBvcnQgQ29udHJvbHNUZW1wbGF0ZSBmcm9tICd2aWV3L2NvbnRyb2xzL21haW5UZW1wbGF0ZSc7XHJcbmltcG9ydCBWb2x1bWVCdXR0b25UZW1wbGF0ZSBmcm9tICd2aWV3L2NvbnRyb2xzL3ZvbHVtZUJ1dHRvblRlbXBsYXRlJztcclxuaW1wb3J0IFByb2dyZXNzQmFyVGVtcGxhdGUgZnJvbSAndmlldy9jb250cm9scy9wcm9ncmVzc0JhclRlbXBsYXRlJztcclxuaW1wb3J0IFBsYXlCdXR0b25UZW1wbGF0ZSBmcm9tICd2aWV3L2NvbnRyb2xzL3BsYXlCdXR0b25UZW1wbGF0ZSc7XHJcbmltcG9ydCBUaW1lRGlzcGxheVRlbXBsYXRlIGZyb20gJ3ZpZXcvY29udHJvbHMvdGltZURpc3BsYXlUZW1wbGF0ZSc7XHJcbmltcG9ydCBGdWxsU2NyZWVuQnV0dG9uVGVtcGxhdGUgZnJvbSAndmlldy9jb250cm9scy9mdWxsU2NyZWVuQnV0dG9uVGVtcGxhdGUnO1xyXG5pbXBvcnQgU2V0dGluZ1BhbmVsVGVtcGxhdGUgZnJvbSAndmlldy9jb250cm9scy9zZXR0aW5nUGFuZWxUZW1wbGF0ZSc7XHJcblxyXG5jb25zdCBUZW1wbGF0ZXMgPSB7XHJcbiAgICBUZXh0Vmlld1RlbXBsYXRlLFxyXG4gICAgVmlld1RlbXBsYXRlLFxyXG4gICAgSGVscGVyVGVtcGxhdGUsXHJcbiAgICBCaWdCdXR0b25UZW1wbGF0ZSxcclxuICAgIE1lc3NhZ2VCb3hUZW1wbGF0ZSxcclxuICAgIFNwaW5uZXJUZW1wbGF0ZSxcclxuICAgIENvbnRleHRQYW5lbFRlbXBsYXRlLFxyXG5cclxuICAgIENvbnRyb2xzVGVtcGxhdGUsXHJcbiAgICBWb2x1bWVCdXR0b25UZW1wbGF0ZSxcclxuICAgIFByb2dyZXNzQmFyVGVtcGxhdGUsXHJcbiAgICBQbGF5QnV0dG9uVGVtcGxhdGUsXHJcbiAgICBUaW1lRGlzcGxheVRlbXBsYXRlLFxyXG4gICAgRnVsbFNjcmVlbkJ1dHRvblRlbXBsYXRlLFxyXG4gICAgU2V0dGluZ1BhbmVsVGVtcGxhdGVcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRlbXBsYXRlczsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDE5Li5cclxuICovXHJcblxyXG5jb25zdCBUZXh0Vmlld1RlbXBsYXRlID0gZnVuY3Rpb24odGV4dCl7XHJcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJ0ZXh0Vmlld1wiIHN0eWxlPVwicGFkZGluZyA6IDVweDsgYmFja2dyb3VuZDogcmVkXCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPGgzPicrdGV4dCsnPC9oMz4nICtcclxuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0blwiPuuLq+q4sDwvYnV0dG9uPicgK1xyXG4gICAgICAgICAgICAnPC9kaXY+JztcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRleHRWaWV3VGVtcGxhdGU7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNi4uXHJcbiAqL1xyXG5jb25zdCBTZXR0aW5nUGFuZWxMaXN0ID0gW107XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nUGFuZWxMaXN0OyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjQuLlxyXG4gKi9cclxuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xyXG5pbXBvcnQge1xyXG4gICAgU1RBVEVfSURMRSxcclxuICAgIFNUQVRFX1BMQVlJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX1BBVVNFRFxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCBCaWdCdXR0b24gPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGksIHBsYXllclN0YXRlKXtcclxuXHJcbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAvL0RvIG5vdGhpbmchXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vRG8gbm90aGluZyFcclxuICAgIH07XHJcbiAgICBjb25zdCBldmVudHMgPSB7XHJcbiAgICAgICAgLypcImNsaWNrIC5vdnAtYmlnYnV0dG9uLWNvbnRhaW5lclwiIDogZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY3VycmVudFN0YXRlID0gYXBpLmdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IFNUQVRFX0lETEUgfHwgY3VycmVudFN0YXRlID09PSBTVEFURV9QQVVTRUQgfHwgY3VycmVudFN0YXRlID09PSBTVEFURV9DT01QTEVURSkge1xyXG4gICAgICAgICAgICAgICAgYXBpLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0qL1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiQmlnQnV0dG9uXCIsIHBsYXllclN0YXRlLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCaWdCdXR0b247IiwiaW1wb3J0IHtcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX1BBVVNFRCxcclxuICAgIFNUQVRFX0VSUk9SXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCAocGxheWVyU3RhdGUpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtYmlnYnV0dG9uLWNvbnRhaW5lciBcIj4nICsgICAgICAvL2FuaW1hdGVkIGJvdW5jZUluXHJcbiAgICAgICAgICAgIChwbGF5ZXJTdGF0ZSA9PT0gU1RBVEVfUExBWUlORyA/ICc8aSBjbGFzcz1cIm92cC1iaWdidXR0b24gb3ZwLWJpZ2J1dHRvbi1wYXVzZVwiPjwvaT4nIDogJycpICtcclxuICAgICAgICAgICAgKHBsYXllclN0YXRlID09PSBTVEFURV9QQVVTRUQgID8gJzxpIGNsYXNzPVwib3ZwLWJpZ2J1dHRvbiBvdnAtYmlnYnV0dG9uLXBsYXlcIj48L2k+JyA6ICcnKSArXHJcbiAgICAgICAgICAgIChwbGF5ZXJTdGF0ZSA9PT0gU1RBVEVfQ09NUExFVEUgPyAnPGkgY2xhc3M9XCJvdnAtYmlnYnV0dG9uIG92cC1iaWdidXR0b24tcmVwbGF5XCI+PC9pPicgOiAnJykgK1xyXG4gICAgICAgICc8L2Rpdj4nXHJcbiAgICApO1xyXG59OyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMS4uXHJcbiAqL1xyXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XHJcbmltcG9ydCBMQSQgZnJvbSAndXRpbHMvbGlrZUEkJztcclxuXHJcbmNvbnN0IENvbnRleHRQYW5lbCA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSwgcG9zaXRpb24pe1xyXG4gICAgY29uc3QgJHJvb3QgPSBMQSQoXCIjXCIrYXBpLmdldENvbnRhaW5lcklkKCkpO1xyXG5cclxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgIGNvbnN0IHBhbmVsV2lkdGggPSAkY3VycmVudC53aWR0aCgpO1xyXG4gICAgICAgIGNvbnN0IHBhbmVsSGVpZ2h0ID0gJGN1cnJlbnQuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLm1pbihwb3NpdGlvbi5wYWdlWCAtICRyb290Lm9mZnNldCgpLmxlZnQsICRyb290LndpZHRoKCkgLSBwYW5lbFdpZHRoKTtcclxuICAgICAgICBjb25zdCB5ID0gTWF0aC5taW4ocG9zaXRpb24ucGFnZVkgLSAkcm9vdC5vZmZzZXQoKS50b3AsICRyb290LmhlaWdodCgpIC0gcGFuZWxIZWlnaHQpO1xyXG5cclxuICAgICAgICAkY3VycmVudC5jc3MoXCJsZWZ0XCIgLCB4ICsgXCJweFwiKTtcclxuICAgICAgICAkY3VycmVudC5jc3MoXCJ0b3BcIiAsIHkgKyBcInB4XCIpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvL0RvIG5vdGhpbmcuXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZXZlbnRzID0ge1xyXG4gICAgICAgIFwiY2xpY2sgLm92cC1jb250ZXh0LWl0ZW1cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgd2luZG93Lm9wZW4oXHJcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL0FpcmVuU29mdC9PdmVuUGxheWVyJyxcclxuICAgICAgICAgICAgICAgICdfYmxhbmsnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiQ29udGV4dFBhbmVsXCIsIHBvc2l0aW9uLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udGV4dFBhbmVsO1xyXG4iLCJpbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWNvbnRleHQtcGFuZWwgYW5pbWF0ZWQgZmFkZUluXCI+JyArXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWNvbnRleHQtaXRlbVwiIHRhYmluZGV4PVwiMFwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLWNvbnRleHQtaXRlbS10ZXh0XCI+SGVscDwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWNvbnRleHQtaXRlbVwiIHRhYmluZGV4PVwiMVwiPicgK1xyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLWNvbnRleHQtaXRlbS10ZXh0XCI+QWJvdXQgT3ZlblBsYXllciAnK3ZlcnNpb24rJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgJzwvZGl2PidcclxuICAgICk7XHJcbn07IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNC4uXHJcbiAqL1xyXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XHJcbmltcG9ydCBCaWdCdXR0b24gZnJvbSAndmlldy9oZWxwZXIvYmlnQnV0dG9uJztcclxuaW1wb3J0IE1lc3NhZ2VCb3ggZnJvbSAndmlldy9oZWxwZXIvbWVzc2FnZUJveCc7XHJcbmltcG9ydCBTcGlubmVyIGZyb20gJ3ZpZXcvaGVscGVyL3NwaW5uZXInO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIFJFQURZLFxyXG4gICAgRVJST1IsXHJcbiAgICBTVEFURV9JRExFLFxyXG4gICAgU1RBVEVfUExBWUlORyxcclxuICAgIFNUQVRFX1NUQUxMRUQsXHJcbiAgICBTVEFURV9MT0FESU5HLFxyXG4gICAgU1RBVEVfQ09NUExFVEUsXHJcbiAgICBTVEFURV9QQVVTRUQsXHJcbiAgICBTVEFURV9FUlJPUixcclxuICAgIFBMQVlFUl9TVEFURSxcclxuICAgIE5FVFdPUktfVU5TVEFCTEVEXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbmNvbnN0IEhlbHBlciA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSl7XHJcbiAgICBsZXQgYmlnQnV0dG9uID0gXCJcIiwgbWVzc2FnZUJveCA9IFwiXCIsIHNwaW5uZXIgPSBcIlwiO1xyXG5cclxuXHJcblxyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgbGV0IGNyZWF0ZUJpZ0J1dHRvbiA9IGZ1bmN0aW9uKHN0YXRlKXtcclxuICAgICAgICAgICAgaWYoYmlnQnV0dG9uKXtcclxuICAgICAgICAgICAgICAgIGJpZ0J1dHRvbi5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmlnQnV0dG9uID0gQmlnQnV0dG9uKCRjdXJyZW50LCBhcGksIHN0YXRlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBjcmVhdGVNZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSwgd2l0aFRpbWVyKXtcclxuICAgICAgICAgICAgaWYobWVzc2FnZUJveCl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlQm94LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZXNzYWdlQm94ID0gTWVzc2FnZUJveCgkY3VycmVudCwgYXBpLCBtZXNzYWdlLCB3aXRoVGltZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3Bpbm5lciA9IFNwaW5uZXIoJGN1cnJlbnQsIGFwaSk7XHJcblxyXG4gICAgICAgIGFwaS5vbihSRUFEWSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUJpZ0J1dHRvbihTVEFURV9QQVVTRUQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwaS5vbihQTEFZRVJfU1RBVEUsIGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICBpZihkYXRhICYmIGRhdGEubmV3c3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5uZXdzdGF0ZSA9PT0gU1RBVEVfUExBWUlORyl7XHJcbiAgICAgICAgICAgICAgICAgICAgYmlnQnV0dG9uLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICBzcGlubmVyLnNob3coZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQmlnQnV0dG9uKGRhdGEubmV3c3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX1NUQUxMRUQgfHwgZGF0YS5uZXdzdGF0ZSA9PT0gU1RBVEVfTE9BRElORyApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGlubmVyLnNob3codHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwaW5uZXIuc2hvdyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXBpLm9uKEVSUk9SLCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9ICcnO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdJbml0aWFsaXphdGlvbiBmYWlsZWQuJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5jb2RlID09PSAzMDEpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnTWVkaWEgcGxheWJhY2sgd2FzIGNhbmNlbGVkLic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IuY29kZSA9PT0gMzAyKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1NvbWUgb2YgdGhlIG1lZGlhIGNvdWxkIG5vdCBiZSBkb3dubG9hZGVkIGR1ZSB0byBhIG5ldHdvcmsgZXJyb3IuJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5jb2RlID09PSAzMDMpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0Lic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IuY29kZSA9PT0gMzA0KSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ01lZGlhIHBsYXliYWNrIGhhcyBiZWVuIGNhbmNlbGVkLiBJdCBsb29rcyBsaWtlIHlvdXIgbWVkaWEgaXMgY29ycnVwdGVkIG9yIHlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBmZWF0dXJlcyB5b3VyIG1lZGlhIHVzZXMuJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJzZUludChlcnJvci5jb2RlLzEwMCkgPT09IDUpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5IHNlcnZlciBmYWlsZWQuJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnQ2FuIG5vdCBwbGF5IGR1ZSB0byB1bmtub3duIHJlYXNvbnMuJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3JlYXRlTWVzc2FnZShtZXNzYWdlLCBudWxsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYXBpLm9uKE5FVFdPUktfVU5TVEFCTEVELCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJ0JlY2F1c2UgdGhlIG5ldHdvcmsgY29ubmVjdGlvbiBpcyB1bnN0YWJsZSwgdGhlIGZvbGxvd2luZyBtZWRpYSBzb3VyY2Ugd2lsbCBiZSBwbGF5ZWQuJztcclxuXHJcbiAgICAgICAgICAgIGlmKGFwaS5nZXRDdXJyZW50UXVhbGl0eSgpLmluZGV4KzEgPT09ICBhcGkuZ2V0UXVhbGl0eUxldmVscygpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ05ldHdvcmsgY29ubmVjdGlvbiBpcyB1bnN0YWJsZS4gQ2hlY2sgdGhlIG5ldHdvcmsgY29ubmVjdGlvbi4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjcmVhdGVNZXNzYWdlKG1lc3NhZ2UsIDUwMDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nLlxyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJIZWxwZXJcIiwgbnVsbCwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVscGVyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDE5Li5cclxuICovXHJcblxyXG5jb25zdCBIZWxwZXJUZW1wbGF0ZSA9IGZ1bmN0aW9uKHRleHQpe1xyXG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwib3ZwLWhlbHBlcnMtY29udGFpbmVyXCI+PC9kaXY+JztcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlbHBlclRlbXBsYXRlO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI0Li5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuaW1wb3J0IHtcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfQ09NUExFVEUsXHJcbiAgICBTVEFURV9QQVVTRURcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuY29uc3QgTWVzc2FnZUJveCA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSwgbWVzc2FnZSwgd2l0aFRpbWVyKXtcclxuXHJcbiAgICBsZXQgYXV0b0Rlc3Ryb3lUaW1lciA9IFwiXCI7XHJcblxyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgaWYod2l0aFRpbWVyKXtcclxuICAgICAgICAgICAgYXV0b0Rlc3Ryb3lUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSwgd2l0aFRpbWVyfHw1MDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuICAgICAgICBcImNsaWNrIC5vdnAtbWVzc2FnZS10ZXh0XCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGF1dG9EZXN0cm95VGltZXIpe1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGF1dG9EZXN0cm95VGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRlbXBsYXRlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJNZXNzYWdlQm94XCIsIG1lc3NhZ2UsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlQm94OyIsImV4cG9ydCBkZWZhdWx0IChtZXNzYWdlKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLW1lc3NhZ2UtYm94IGFuaW1hdGVkIHNoYWtlXCI+JyArXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLW1lc3NhZ2UtY29udGFpbmVyXCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtbWVzc2FnZS10ZXh0XCI+JyttZXNzYWdlKyc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAnPC9kaXY+J1xyXG4gICAgKTtcclxufTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI1Li5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuXHJcbmNvbnN0IFNwaW5uZXIgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xyXG4gICAgbGV0ICRzcGlubmVyID0gXCJcIjtcclxuXHJcbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAkc3Bpbm5lciA9ICRjdXJyZW50O1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvL0RvIG5vdGhpbmcuXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZXZlbnRzID0ge307XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiU3Bpbm5lclwiLCBudWxsLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICksIHtcclxuICAgICAgICBzaG93OiBmdW5jdGlvbiAoaXNTaG93KSB7XHJcbiAgICAgICAgICAgIGlmKGlzU2hvdyl7XHJcbiAgICAgICAgICAgICAgICAkc3Bpbm5lci5zaG93KCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJHNwaW5uZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3Bpbm5lcjsiLCJleHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJvdnAtc3Bpbm5lci1jb250YWluZXJcIj48ZGl2IGNsYXNzPVwib3ZwLXNwaW5uZXJcIj48ZGl2IGNsYXNzPVwiYm91bmNlMVwiPjwvZGl2PjxkaXYgY2xhc3M9XCJib3VuY2UyXCI+PC9kaXY+PGRpdiBjbGFzcz1cImJvdW5jZTNcIj48L2Rpdj48L2Rpdj48L2Rpdj4nO1xyXG59O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIwLi5cclxuICovXHJcbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcclxuaW1wb3J0IEhlbHBlciBmcm9tICd2aWV3L2hlbHBlci9tYWluJztcclxuaW1wb3J0IENvbnRyb2xzIGZyb20gJ3ZpZXcvY29udHJvbHMvbWFpbic7XHJcbmltcG9ydCBTZXR0aW5nUGFuZWxMaXN0IGZyb20gJ3ZpZXcvZ2xvYmFsL1NldHRpbmdQYW5lbExpc3QnO1xyXG5pbXBvcnQgQ29udGV4dFBhbmVsIGZyb20gJ3ZpZXcvaGVscGVyL2NvbnRleHRQYW5lbCc7XHJcbmltcG9ydCBMQSQgZnJvbSAndXRpbHMvbGlrZUEkJztcclxuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBSRUFEWSxcclxuICAgIFNUQVRFX0lETEUsXHJcbiAgICBTVEFURV9QTEFZSU5HLFxyXG4gICAgU1RBVEVfU1RBTExFRCxcclxuICAgIFNUQVRFX0xPQURJTkcsXHJcbiAgICBTVEFURV9DT01QTEVURSxcclxuICAgIFNUQVRFX1BBVVNFRCxcclxuICAgIFNUQVRFX0VSUk9SLFxyXG4gICAgQ09OVEVOVF9NRVRBLFxyXG4gICAgUExBWUVSX1NUQVRFLFxyXG4gICAgRVJST1JcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxucmVxdWlyZSgnLi4vLi4vY3NzL292ZW5wbGF5ZXIubGVzcycpO1xyXG5cclxuY29uc3QgVmlldyA9IGZ1bmN0aW9uKCRjb250YWluZXIpe1xyXG4gICAgbGV0IGNvbnRyb2xzID0gXCJcIiwgaGVscGVyID0gXCJcIiwgJHBsYXllclJvb3QsIGNvbnRleHRQYW5lbCA9IFwiXCIsIGFwaSA9IFwiXCIsIGF1dG9IaWRlVGltZXIgPSBcIlwiO1xyXG5cclxuICAgIGxldCBzZXRIaWRlID0gZnVuY3Rpb24gKGhpZGUsIGF1dG9IaWRlKSB7XHJcblxyXG4gICAgICAgIGlmIChhdXRvSGlkZVRpbWVyKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChhdXRvSGlkZVRpbWVyKTtcclxuICAgICAgICAgICAgYXV0b0hpZGVUaW1lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGlkZSkge1xyXG4gICAgICAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRwbGF5ZXJSb290LmFkZENsYXNzKFwib3ZwLWF1dG9oaWRlXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRwbGF5ZXJSb290LnJlbW92ZUNsYXNzKFwib3ZwLWF1dG9oaWRlXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGF1dG9IaWRlKSB7XHJcbiAgICAgICAgICAgICAgICBhdXRvSGlkZVRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICRwbGF5ZXJSb290LmFkZENsYXNzKFwib3ZwLWF1dG9oaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTgwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgbGV0IHRvZ2dsZVBsYXlQYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSBhcGkuZ2V0U3RhdGUoKTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfSURMRSB8fCBjdXJyZW50U3RhdGUgPT09IFNUQVRFX1BBVVNFRCB8fCBjdXJyZW50U3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFKSB7XHJcbiAgICAgICAgICAgIGFwaS5wbGF5KCk7XHJcbiAgICAgICAgfWVsc2UgaWYoY3VycmVudFN0YXRlID09PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgYXBpLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGxldCBzZWVrID0gZnVuY3Rpb24gKHNlY29uZHMsIGlzUmV3aW5kKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gYXBpLmdldER1cmF0aW9uKCk7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gYXBpLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gMDtcclxuXHJcbiAgICAgICAgaWYoaXNSZXdpbmQpe1xyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IE1hdGgubWF4KGN1cnJlbnRQb3NpdGlvbiAtIHNlY29uZHMsIDApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IE1hdGgubWluKGN1cnJlbnRQb3NpdGlvbiArIHNlY29uZHMsIGR1cmF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFwaS5zZWVrKHBvc2l0aW9uKTtcclxuICAgIH07XHJcbiAgICBsZXQgdm9sdW1lID0gZnVuY3Rpb24oaXNVcCl7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFZvbHVtbiA9IGFwaS5nZXRWb2x1bWUoKTtcclxuICAgICAgICBsZXQgbmV3Vm9sdW1lID0gMDtcclxuICAgICAgICBpZihpc1VwKXtcclxuICAgICAgICAgICAgbmV3Vm9sdW1lID0gIE1hdGgubWluKGN1cnJlbnRWb2x1bW4gKyA1LCAxMDApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBuZXdWb2x1bWUgPSBNYXRoLm1heChjdXJyZW50Vm9sdW1uIC0gNSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwaS5zZXRWb2x1bWUobmV3Vm9sdW1lKTtcclxuICAgIH07XHJcbiAgICBsZXQgY3JlYXRlQ29udGV4dFBhbmVsID0gZnVuY3Rpb24ocGFnZVgsIHBhZ2VZKXtcclxuICAgICAgICBpZihjb250ZXh0UGFuZWwpe1xyXG4gICAgICAgICAgICBjb250ZXh0UGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBjb250ZXh0UGFuZWwgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZXh0UGFuZWwgPSBDb250ZXh0UGFuZWwoJHBsYXllclJvb3QsIGFwaSwge3BhZ2VYIDogcGFnZVgsIHBhZ2VZIDogcGFnZVl9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgJHBsYXllclJvb3QgPSAkY3VycmVudDtcclxuICAgIH07XHJcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy9EbyBub3RoaW5nLlxyXG4gICAgfTtcclxuICAgIGNvbnN0IGV2ZW50cyA9IHtcclxuICAgICAgICBcImNsaWNrIC5vdmVucGxheWVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGNvbnRleHRQYW5lbCl7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0UGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dFBhbmVsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighTEEkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChcIi5vdnAtYm90dG9tLXBhbmVsXCIpICYmXHJcbiAgICAgICAgICAgICAgICAhTEEkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChcIi5vdnAtc2V0dGluZy1wYW5lbFwiKSl7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVQbGF5UGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighTEEkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChcIi5vdnAtc2V0dGluZy1wYW5lbFwiKSAmJiAhTEEkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChcIi5vdnAtc2V0dGluZy1idXR0b25cIikgJiYgU2V0dGluZ1BhbmVsTGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIC8vY2xlYXIgYWxsIFNldHRpbmdQYW5lbFRlbXBsYXRlXHJcbiAgICAgICAgICAgICAgICBfLmVhY2goU2V0dGluZ1BhbmVsTGlzdCwgZnVuY3Rpb24oc2V0dGluZ1BhbmVsKXtcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBTZXR0aW5nUGFuZWxMaXN0LnNwbGljZSgwLCBTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW91c2VlbnRlciAub3ZlbnBsYXllclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXBpLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcclxuICAgICAgICAgICAgICAgIHNldEhpZGUoZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0SGlkZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW91c2Vtb3ZlIC5vdmVucGxheWVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhcGkuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORykge1xyXG4gICAgICAgICAgICAgICAgc2V0SGlkZShmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXRIaWRlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb3VzZWxlYXZlIC5vdmVucGxheWVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGFwaS5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcclxuICAgICAgICAgICAgICAgIHNldEhpZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcImtleWRvd24gLm92ZW5wbGF5ZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMyIDogICAvL3NhcGNlXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVQbGF5UGF1c2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzcgOiAvL2Fycm93IGxlZnRcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlZWsoNSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM5IDogLy9hcnJvdyByaWdodFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vlayg1LCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM4IDogLy9hcnJvdyB1cFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdm9sdW1lKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0MCA6IC8vYXJyb3cgdXBcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZvbHVtZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiY29udGV4dG1lbnUgLm92ZW5wbGF5ZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjcmVhdGVDb250ZXh0UGFuZWwoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIlZpZXdcIiwgJGNvbnRhaW5lci5pZCwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCwgdHJ1ZSksIHtcclxuICAgICAgICBnZXRNZWRpYUVsZW1lbnRDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRwbGF5ZXJSb290LmZpbmQoXCIub3ZwLW1lZGlhLWVsZW1lbnQtY29udGFpbmVyXCIpLmdldCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0QXBpOiBmdW5jdGlvbiAocGxheWVySW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgYXBpID0gcGxheWVySW5zdGFuY2U7XHJcbiAgICAgICAgICAgIGhlbHBlciA9IEhlbHBlcigkcGxheWVyUm9vdC5maW5kKFwiLm92cC11aVwiKSwgcGxheWVySW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBjb250cm9scyA9IENvbnRyb2xzKCRwbGF5ZXJSb290LmZpbmQoXCIub3ZwLXVpXCIpLCBwbGF5ZXJJbnN0YW5jZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgYXBpLm9uKFBMQVlFUl9TVEFURSwgZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhICYmIGRhdGEubmV3c3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRIaWRlKGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SGlkZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmlldztcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMC4uXHJcbiAqL1xyXG5cclxuY29uc3QgVmlld1RlbXBsYXRlID0gZnVuY3Rpb24oaWQpe1xyXG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwib3ZlbnBsYXllciBvdnAtd3JhcHBlclwiIHRhYmluZGV4PVwiLTFcIiBhcmlhLWxhYmVsPVwiXCIgaWQ9XCInK2lkKydcIj4nICtcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXJhdGlvXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1wbGF5ZXJcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1tZWRpYS1lbGVtZW50LWNvbnRhaW5lclwiIGRhdGEtcGFyZW50LWlkPVwiJytpZCsnXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXVpXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPC9kaXY+J1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBWaWV3VGVtcGxhdGU7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=