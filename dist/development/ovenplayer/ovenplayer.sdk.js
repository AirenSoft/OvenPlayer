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
/******/ 		"ovenplayer.sdk": 0
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/ovenplayer.sdk.js");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaUV4cGFuc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9Db25maWd1cmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvU3VwcG9ydENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wbGF5bGlzdC9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3NoaW1zL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9saWtlQSQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvc3RyaW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdW5kZXJzY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy93ZWJwYWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92ZXJzaW9uLmpzIl0sIm5hbWVzIjpbIkFwaSIsImNvbnRhaW5lciIsImxvZ01hbmFnZXIiLCJ0aGF0IiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ2ZXJzaW9uIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiaW5pdFByb3ZpZGVyIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImdldFF1YWxpdHlMYWJlbCIsImxhYmVsIiwibG9hZFByb3ZpZGVycyIsImdldFBsYXlsaXN0IiwidGhlbiIsImRlc3Ryb3kiLCJjdXJyZW50U291cmNlSW5kZXgiLCJnZXRDdXJyZW50U291cmNlcyIsIlByb3ZpZGVycyIsImdldE5hbWUiLCJQUk9WSURFUl9SVE1QIiwib24iLCJuYW1lIiwiZGF0YSIsInRyaWdnZXIiLCJFUlJPUiIsInBhcnNlSW50IiwiY29kZSIsIk5FVFdPUktfVU5TVEFCTEVEIiwiY3VycmVudFF1YWxpdHkiLCJnZXRDdXJyZW50UXVhbGl0eSIsImluZGV4IiwiZ2V0UXVhbGl0eUxldmVscyIsInBhdXNlIiwic2V0Q3VycmVudFF1YWxpdHkiLCJwcmVsb2FkIiwiZmx1c2giLCJSRUFEWSIsImVycm9yIiwiZXJyb3JPYmplY3QiLCJJTklUX0VSUk9SIiwicmVhc29uIiwibWVzc2FnZSIsInJlbW92ZUFuZEV4Y3V0ZU9uY2UiLCJpbml0Iiwib3B0aW9ucyIsImlzRGVidWciLCJkaXNhYmxlIiwic2V0UGxheWxpc3QiLCJnZXRDb25maWciLCJnZXREdXJhdGlvbiIsImdldFBvc2l0aW9uIiwiZ2V0Vm9sdW1lIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwic2V0TXV0ZSIsInN0YXRlIiwiZ2V0TXV0ZSIsImxvYWQiLCJwbGF5bGlzdCIsInBsYXkiLCJzZWVrIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJzZXREZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwicXVhbGl0eUluZGV4IiwiY3VycmVudFNvdXJjZSIsIm5ld1NvdXJjZSIsImlzU2FtZVByb3ZpZGVyIiwicmVzUXVhbGl0eUluZGV4IiwiZ2V0QnVmZmVyIiwiZ2V0U3RhdGUiLCJzdG9wIiwicmVtb3ZlIiwiREVTVFJPWSIsIm9mZiIsIk92ZW5QbGF5ZXJTREsiLCJyZW1vdmVQbGF5ZXIiLCJnZXRDb250YWluZXJJZCIsIkFwaVJ0bXBFeHBhbnNpb24iLCJleHRlcm5hbENhbGxiYWNrQ3JlZXAiLCJyZXN1bHQiLCJ0cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwiLCJDb25maWd1cmF0b3IiLCJjb21wb3NlU291cmNlT3B0aW9ucyIsIkRlZmF1bHRzIiwiZGVmYXVsdFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZUNvbnRyb2xzIiwicGxheWJhY2tSYXRlcyIsIm11dGUiLCJ3aWR0aCIsImhlaWdodCIsInNlcmlhbGl6ZSIsInZhbCIsInVuZGVmaW5lZCIsImxvd2VyY2FzZVZhbCIsInRvTG93ZXJDYXNlIiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwiZGVzZXJpYWxpemUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsIm5vcm1hbGl6ZVNpemUiLCJzbGljZSIsImV2YWx1YXRlQXNwZWN0UmF0aW8iLCJhciIsInRvU3RyaW5nIiwiaW5kZXhPZiIsInRlc3QiLCJ3Iiwic3Vic3RyIiwiaCIsImNvbmZpZyIsImFzcGVjdHJhdGlvIiwicmF0ZUNvbnRyb2xzIiwicmF0ZXMiLCJBcnJheSIsImlzQXJyYXkiLCJmaWx0ZXIiLCJfIiwiaXNOdW1iZXIiLCJyYXRlIiwibWFwIiwiTWF0aCIsInJvdW5kIiwicHVzaCIsInNvcnQiLCJjb25maWdQbGF5bGlzdCIsIm9iaiIsInBpY2siLCJmZWVkRGF0YSIsImR1cmF0aW9uIiwiZGVidWciLCJpbWFnZSIsInF1YWxpdHlMYWJlbCIsInJlcGVhdCIsInN0cmV0Y2hpbmciLCJnZXRBc3BlY3RyYXRpbyIsInNldEFzcGVjdHJhdGlvIiwiYXNwZWN0cmF0aW9fIiwiZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSIsInNldFF1YWxpdHlMYWJlbCIsIm5ld0xhYmVsIiwiZ2V0UGxheWJhY2tSYXRlcyIsImlzUGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5bGlzdF8iLCJpc1JlcGVhdCIsImdldFN0cmV0Y2hpbmciLCJFdmVudEVtaXR0ZXIiLCJvYmplY3QiLCJfZXZlbnRzIiwidHJpZ2dlckV2ZW50cyIsImV2ZW50cyIsImFyZ3MiLCJjb250ZXh0IiwiZXZlbnQiLCJsaXN0ZW5lciIsImFwcGx5IiwiY2FsbCIsImFyZ3VtZW50cyIsImFsbEV2ZW50cyIsImFsbCIsIm5hbWVzIiwibCIsInJldGFpbiIsImoiLCJrIiwiX2NhbGxiYWNrIiwib25jZSIsImNvdW50Iiwib25jZUNhbGxiYWNrIiwiX2xpc3RlbmVyIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJwcm90b3R5cGUiLCJhZGRRdWV1ZSIsImV4ZWN1dGVRdWV1ZWRDb21tYW5kcyIsInNoaWZ0Iiwic2V0RXhlY3V0ZU1vZGUiLCJtb2RlIiwiZ2V0VW5kZWNvcmF0ZWRNZXRob2RzIiwiZ2V0UXVldWUiLCJlbXB0eSIsImNvbW1hbmRfIiwiY29tbWFuZFF1ZXVlSXRlbSIsImZpbmRXaGVyZSIsInNwbGljZSIsImZpbmRJbmRleCIsIlN1cHBvcnRDaGVja2VyIiwic3VwcG9ydExpc3QiLCJjaGVja1N1cHBvcnQiLCJzb3VyY2UiLCJNaW1lVHlwZXMiLCJhYWMiLCJtcDQiLCJmNHYiLCJtNHYiLCJtb3YiLCJtcDMiLCJtcGVnIiwib2d2Iiwib2dnIiwib2dhIiwidm9yYmlzIiwid2VibSIsImY0YSIsIm0zdTgiLCJtM3UiLCJobHMiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsImlzSGxzU3VwcG9ydCIsImdldE1lZGlhU291cmNlIiwid2luZG93IiwiTWVkaWFTb3VyY2UiLCJXZWJLaXRNZWRpYVNvdXJjZSIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVyIiwiU291cmNlQnVmZmVyIiwiV2ViS2l0U291cmNlQnVmZmVyIiwiaXNUeXBlU3VwcG9ydGVkIiwic291cmNlQnVmZmVyVmFsaWRBUEkiLCJhcHBlbmRCdWZmZXIiLCJmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UiLCJzb3J1Y2VfIiwiZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0Iiwic3VwcG9ydE5hbWVzIiwiaXRlbSIsInN1cHBvcnRlZCIsIlNUQVRFX0JVRkZFUklORyIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsIlNUQVRFX1BBVVNFRCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9FUlJPUiIsIlNUQVRFX0xPQURJTkciLCJTVEFURV9TVEFMTEVEIiwiUFJPVklERVJfSFRNTDUiLCJQUk9WSURFUl9XRUJSVEMiLCJQUk9WSURFUl9EQVNIIiwiUFJPVklERVJfSExTIiwiQ09OVEVOVF9DT01QTEVURSIsIkNPTlRFTlRfU0VFSyIsIkNPTlRFTlRfQlVGRkVSX0ZVTEwiLCJESVNQTEFZX0NMSUNLIiwiQ09OVEVOVF9MT0FERUQiLCJDT05URU5UX1NFRUtFRCIsIlBMQVlFUl9TVEFURSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIlBMQVlFUl9QTEFZIiwiQ09OVEVOVF9CVUZGRVIiLCJDT05URU5UX1RJTUUiLCJDT05URU5UX1JBVEVfQ0hBTkdFIiwiQ09OVEVOVF9WT0xVTUUiLCJDT05URU5UX01VVEUiLCJDT05URU5UX01FVEEiLCJDT05URU5UX0xFVkVMUyIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIkNPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCIsIkNPTlRFTlRfQ0FQVElPTl9DSEFOR0VEIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiTWFuYWdlciIsImN1cnJlbnRQbGF5bGlzdCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwicmVwbGFjZSIsInByZXR0aWVkUGxheWxpc3QiLCJ0cmFja3MiLCJwbGF5bGlzdEl0ZW0iLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwiY2FwdGlvbnMiLCJjb25jYXQiLCJ0cmFjayIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsInByb3ZpZGVyIiwiUHJvdmlkZXJMb2FkZXIiLCJodG1sNSIsInJlcXVpcmUiLCJlcnIiLCJFcnJvciIsIndlYnJ0YyIsImRhc2giLCJydG1wIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJwcm92aWRlck5hbWUiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsInByb21pc2VGaW5hbGx5IiwiY2FsbGJhY2siLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXRGdW5jIiwic2V0VGltZW91dCIsInNldEltbWVkaWF0ZUZ1bmMiLCJzZXRJbW1lZGlhdGUiLCJub29wIiwiYmluZCIsImZuIiwidGhpc0FyZyIsIlByb21pc2VTaGltIiwiVHlwZUVycm9yIiwiX3N0YXRlIiwiX2hhbmRsZWQiLCJfdmFsdWUiLCJfZGVmZXJyZWRzIiwiZG9SZXNvbHZlIiwiaGFuZGxlIiwic2VsZiIsImRlZmVycmVkIiwiX2ltbWVkaWF0ZUZuIiwiY2IiLCJvbkZ1bGZpbGxlZCIsIm9uUmVqZWN0ZWQiLCJwcm9taXNlIiwicmV0IiwiZSIsIm5ld1ZhbHVlIiwiZmluYWxlIiwiX3VuaGFuZGxlZFJlamVjdGlvbkZuIiwibGVuIiwiSGFuZGxlciIsImRvbmUiLCJleCIsInByb20iLCJhcnIiLCJyZW1haW5pbmciLCJyZXMiLCJyYWNlIiwidmFsdWVzIiwiY29uc29sZSIsIndhcm4iLCJyZXNvbHZlZCIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwicGxheWVyTGlzdCIsImNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudCIsImNvbnRhaW5lckVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm5vZGVUeXBlIiwiY3JlYXRlIiwicGxheWVySW5zdGFuY2UiLCJnZXRQbGF5ZXJMaXN0IiwiZ2V0UGxheWVyQnlDb250YWluZXJJZCIsImNvbnRhaW5lcklkIiwiZ2V0UGxheWVyQnlJbmRleCIsInBsYXllcklkIiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwiTGEkIiwic2VsZWN0b3JPckVsZW1lbnQiLCJyZXR1cm5Ob2RlIiwiJGVsZW1lbnQiLCJzZWxlY3RvciIsIm5vZGVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsImV2ZXJ5IiwiaXNFbGVtZW50IiwiZmluZCIsImNzcyIsImVsZW1lbnQiLCJzdHlsZSIsImFkZENsYXNzIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2xhc3NOYW1lcyIsImNsYXNzTmFtZSIsInNwbGl0IiwicmVtb3ZlQ2xhc3MiLCJSZWdFeHAiLCJqb2luIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0ck5hbWUiLCJzaG93IiwiZGlzcGxheSIsImhpZGUiLCJhcHBlbmQiLCJodG1sQ29kZSIsImlubmVySFRNTCIsInRleHQiLCJ0ZXh0Q29udGVudCIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJpcyIsIiR0YXJnZXRFbGVtZW50Iiwib2Zmc2V0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImJvZHkiLCJzY3JvbGxUb3AiLCJsZWZ0Iiwic2Nyb2xsTGVmdCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiYXR0ciIsImdldEF0dHJpYnV0ZSIsImh0bWwiLCJyZXBsYWNlV2l0aCIsImFwcGVuZENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJoYXNDaGlsZE5vZGVzIiwiZmlyc3RDaGlsZCIsImdldCIsImNsb3Nlc3QiLCJzZWxlY3RvclN0cmluZyIsImxvZ2dlciIsInByZXZDb25zb2xlTG9nIiwiZW5hYmxlIiwidHJpbSIsIm5hdHVyYWxIbXMiLCJzdHJpbmciLCJleHRyYWN0RXh0ZW5zaW9uIiwicGF0aCIsImdldEF6dXJlRmlsZUZvcm1hdCIsImV4dGVuc2lvbiIsImF6dXJlZEZvcm1hdCIsImxhc3RJbmRleE9mIiwic2Vjb25kIiwic2VjTnVtIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwibiIsImdsb2JhbCIsInIiLCJvIiwicyIsIlN5bWJvbCIsInUiLCJjIiwicCIsImhhc093blByb3BlcnR5IiwidCIsImEiLCJmIiwiX3dyYXBwZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiVkVSU0lPTiIsInYiLCJ5IiwiZCIsIml0ZXJhdGVlIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwicHJvcGVydHkiLCJnIiwibWF4IiwibSIsImIiLCJ4IiwicG93IiwiQSIsImVhY2giLCJjb2xsZWN0IiwiTyIsInJlZHVjZSIsImZvbGRsIiwiaW5qZWN0IiwicmVkdWNlUmlnaHQiLCJmb2xkciIsImRldGVjdCIsImZpbmRLZXkiLCJzZWxlY3QiLCJuZWdhdGUiLCJzb21lIiwiYW55IiwiaW5jbHVkZXMiLCJpbmNsdWRlIiwiaW52b2tlIiwicGx1Y2siLCJ3aGVyZSIsIm1pbiIsInNodWZmbGUiLCJzYW1wbGUiLCJyYW5kb20iLCJjbG9uZSIsInNvcnRCeSIsImNyaXRlcmlhIiwiZ3JvdXBCeSIsImluZGV4QnkiLCJjb3VudEJ5IiwiUyIsInRvQXJyYXkiLCJpc1N0cmluZyIsIm1hdGNoIiwic2l6ZSIsInBhcnRpdGlvbiIsImZpcnN0IiwiaGVhZCIsInRha2UiLCJpbml0aWFsIiwibGFzdCIsInJlc3QiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJCb29sZWFuIiwiTSIsImlzQXJndW1lbnRzIiwiZmxhdHRlbiIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzQm9vbGVhbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwidW56aXAiLCJ6aXAiLCJGIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwiRSIsInJhbmdlIiwiY2VpbCIsImNodW5rIiwiTiIsInBhcnRpYWwiLCJwbGFjZWhvbGRlciIsImJpbmRBbGwiLCJtZW1vaXplIiwiY2FjaGUiLCJkZWxheSIsImRlZmVyIiwidGhyb3R0bGUiLCJsZWFkaW5nIiwibm93IiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJjYW5jZWwiLCJkZWJvdW5jZSIsIndyYXAiLCJjb21wb3NlIiwiYWZ0ZXIiLCJiZWZvcmUiLCJyZXN0QXJndW1lbnRzIiwiSSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiVCIsIkIiLCJhbGxLZXlzIiwibWFwT2JqZWN0IiwicGFpcnMiLCJpbnZlcnQiLCJmdW5jdGlvbnMiLCJtZXRob2RzIiwiUiIsImV4dGVuZCIsImV4dGVuZE93biIsImFzc2lnbiIsInEiLCJLIiwieiIsIm9taXQiLCJTdHJpbmciLCJkZWZhdWx0cyIsInRhcCIsImlzTWF0Y2giLCJ2YWx1ZU9mIiwicG9wIiwiaXNFcXVhbCIsImlzRW1wdHkiLCJEIiwiY2hpbGROb2RlcyIsIkludDhBcnJheSIsImlzRmluaXRlIiwiaXNTeW1ib2wiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsImhhcyIsIm5vQ29uZmxpY3QiLCJjb25zdGFudCIsInByb3BlcnR5T2YiLCJtYXRjaGVzIiwidGltZXMiLCJEYXRlIiwiZ2V0VGltZSIsIkwiLCJQIiwiVyIsImVzY2FwZSIsInVuZXNjYXBlIiwiQyIsInVuaXF1ZUlkIiwidGVtcGxhdGVTZXR0aW5ncyIsImV2YWx1YXRlIiwiaW50ZXJwb2xhdGUiLCJKIiwiVSIsIlYiLCIkIiwidGVtcGxhdGUiLCJ2YXJpYWJsZSIsIkZ1bmN0aW9uIiwiY2hhaW4iLCJfY2hhaW4iLCJHIiwibWl4aW4iLCJ0b0pTT04iLCJpc1J0bXAiLCJpc1dlYlJUQyIsImlzRGFzaCIsImdldFNjcmlwdFBhdGgiLCJzY3JpcHROYW1lIiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3JjIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0EsaURBQXlDLGtqQkFBa2pCO0FBQzNsQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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QUNBLGdCQUFJem1CLFNBQVMsQ0FBYixFQUFnQjtBQUNaLHVCQUFPNG1CLElBQUl4aEIsTUFBSixDQUFXLENBQVgsRUFBY3BGLFFBQVEsQ0FBdEIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU8sRUFBUDtBQUNILENBWk0sQzs7Ozs7Ozs7Ozs7Ozs7O0FDSlA7OztBQUdPLElBQU1sQyw0QkFBVSxrQkFBaEIsQyIsImZpbGUiOiJvdmVucGxheWVyLnNkay5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdH07XG5cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwib3ZlbnBsYXllci5zZGtcIjogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHtcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJyk7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9vdmVucGxheWVyLnNkay5qc1wiKTtcbiIsIi8qIGdsb2JhbHMgX193ZWJwYWNrX2FtZF9vcHRpb25zX18gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXztcclxuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsIGV2YWwpKFwidGhpc1wiKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsIi8vaW1wb3J0IENhcHRpb25NYW5hZ2VyIGZyb20gXCJhcGkvY2FwdGlvbi9NYW5hZ2VyXCI7XHJcbmltcG9ydCBDb25maWd1cmF0b3IgZnJvbSBcImFwaS9Db25maWd1cmF0b3JcIjtcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgTGF6eUNvbW1hbmRFeGVjdXRvciBmcm9tIFwiYXBpL0xhenlDb21tYW5kRXhlY3V0b3JcIjtcclxuaW1wb3J0IExvZ01hbmFnZXIgZnJvbSBcInV0aWxzL2xvZ2dlclwiO1xyXG5pbXBvcnQgUGxheWxpc3RNYW5hZ2VyIGZyb20gXCJhcGkvcGxheWxpc3QvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXJDb250cm9sbGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgUHJvbWlzZSwge3Jlc29sdmVkfSBmcm9tIFwiYXBpL3NoaW1zL3Byb21pc2VcIjtcclxuaW1wb3J0IHtSRUFEWSwgRVJST1IsIElOSVRfRVJST1IsIERFU1RST1ksIE5FVFdPUktfVU5TVEFCTEVELCBQTEFZRVJfRklMRV9FUlJPUiwgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG9iamVjdCBjb25uZWN0cyBVSSB0byB0aGUgcHJvdmlkZXIuXHJcbiAqIEBwYXJhbSAgIHtvYmplY3R9ICAgIGNvbnRhaW5lciAgZG9tIGVsZW1lbnRcclxuICpcclxuICogKi9cclxuXHJcbmNvbnN0IEFwaSA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XHJcbiAgICBsZXQgbG9nTWFuYWdlciA9IExvZ01hbmFnZXIoKTtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbW092ZW5QbGF5ZXJdXSB2LlwiKyB2ZXJzaW9uKTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSBsb2FkZWQuXCIpO1xyXG4gICAgLy9sZXQgY2FwdGlvbk1hbmFnZXIgPSBDYXB0aW9uTWFuYWdlcih0aGF0KTtcclxuICAgXHJcbiAgICBsZXQgcGxheWxpc3RNYW5hZ2VyID0gUGxheWxpc3RNYW5hZ2VyKCk7XHJcbiAgICBsZXQgcHJvdmlkZXJDb250cm9sbGVyID0gUHJvdmlkZXJDb250cm9sbGVyKCk7XHJcbiAgICBsZXQgY3VycmVudFByb3ZpZGVyID0gXCJcIjtcclxuICAgIGxldCBwbGF5ZXJDb25maWcgPSBcIlwiO1xyXG4gICAgbGV0IGxhenlRdWV1ZSA9IFwiXCI7XHJcblxyXG4gICAgY29uc3QgaW5pdFByb3ZpZGVyID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XHJcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHlGcm9tU291cmNlID0gKHNvdXJjZXMpID0+e1xyXG4gICAgICAgICAgICB2YXIgcXVhbGl0eSA9IDA7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBxdWFsaXR5O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBwcm92aWRlckNvbnRyb2xsZXIubG9hZFByb3ZpZGVycyhwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U291cmNlSW5kZXggPSBwaWNrUXVhbGl0eUZyb21Tb3VyY2UocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coIFwiY3VycmVudCBzb3VyY2UgaW5kZXggOiBcIisgY3VycmVudFNvdXJjZUluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIC8vQ2FsbCBQcm92aWRlci5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyLmdldE5hbWUoKSA9PT0gUFJPVklERVJfUlRNUCl7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHByb3ZpZGVyIHR5cGUgaXMgUlRNUCwgd2UgYWNjZXB0cyBSdG1wRXhwYW5zaW9uLlxyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGF0LCBBcGlSdG1wRXhwYW5zaW9uKGN1cnJlbnRQcm92aWRlcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1RoaXMgcGFzc2VzIHRoZSBldmVudCBjcmVhdGVkIGJ5IHRoZSBQcm92aWRlciB0byBBUEkuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5vbihcImFsbFwiLCBmdW5jdGlvbihuYW1lLCBkYXRhKXtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihuYW1lLCBkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0F1dG8gbmV4dCBzb3VyY2Ugd2hlbiBwbGF5ZXIgbG9hZCB3YXMgZmFpbCBieSBhbWlzcyBzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAvL2RhdGEuY29kZSA9PT0gUExBWUVSX0ZJTEVfRVJST1JcclxuICAgICAgICAgICAgICAgIGlmKCAobmFtZSA9PT0gRVJST1IgJiYgKHBhcnNlSW50KGRhdGEuY29kZS8xMDApID09PSAzIHx8IHBhcnNlSW50KGRhdGEuY29kZS8xMDApID09PSA1KSl8fCBuYW1lID09PSBORVRXT1JLX1VOU1RBQkxFRCApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UXVhbGl0eSA9IHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjdXJyZW50UXVhbGl0eS5pbmRleCsxIDwgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzKCkubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIHNlcXVlbnRpYWwgaGFzIGF2YWlsYWJsZSBzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkoY3VycmVudFF1YWxpdHkuaW5kZXgrMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSkudGhlbigoKT0+e1xyXG5cclxuICAgICAgICAgICAgLy9wcm92aWRlcidzIHByZWxvYWQoKSBoYXZlIHRvIG1hZGUgUHJvbWlzZS4gQ3V6IGl0IG92ZXJjb21lcyAnZmxhc2ggbG9hZGluZyB0aW1pbmcgcHJvYmxlbScuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5wcmVsb2FkKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpLCBsYXN0UGxheVBvc2l0aW9uICkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmZsdXNoKCk7XHJcbiAgICAgICAgICAgICAgICAvL1RoaXMgaXMgbm8gcmVhc29uIHRvIGV4aXN0IGFueW1vcmUuXHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihSRUFEWSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvck9iamVjdCA9IHtjb2RlIDogSU5JVF9FUlJPUiwgcmVhc29uIDogXCJpbml0IGVycm9yLlwiLCBtZXNzYWdlIDogXCJQbGF5ZXIgaW5pdCBlcnJvci5cIiwgZXJyb3IgOiBlcnJvcn07XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgZXJyb3JPYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgLy94eHggOiBJZiB5b3UgaW5pdCBlbXB0eSBzb3VyY2VzLiAoSSB0aGluayB0aGlzIGlzIHN0cmFuZ2UgY2FzZS4pXHJcbiAgICAgICAgICAgIC8vVGhpcyB3b3JrcyBmb3IgdGhpcyBjYXNlLlxyXG4gICAgICAgICAgICAvL3BsYXllciA9IE92ZW5QbGF5ZXIuY3JlYXRlKFwiZWxJZFwiLCB7fSk7XHJcbiAgICAgICAgICAgIC8vcGxheWVyLmxvYWQoc29ydWNlcyk7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZS5yZW1vdmVBbmRFeGN1dGVPbmNlKFwibG9hZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIOy0iOq4sO2ZlCDtlajsiJhcclxuICAgICAqIGluaXRcclxuICAgICAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgcGxheWVyIGluaXRpYWwgb3B0aW9uIHZhbHVlLlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqKi9cclxuICAgIHRoYXQuaW5pdCA9IChvcHRpb25zKSA9PntcclxuICAgICAgICAvL0l0IGNvbGxlY3RzIHRoZSBjb21tYW5kcyBhbmQgZXhlY3V0ZXMgdGhlbSBhdCB0aGUgdGltZSB3aGVuIHRoZXkgYXJlIGV4ZWN1dGFibGUuXHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ2xvYWQnLCdwbGF5JywncGF1c2UnLCdzZWVrJywnc3RvcCcsICdnZXREdXJhdGlvbicsICdnZXRQb3NpdGlvbicsICdnZXRWb2x1bWUnLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnXSk7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnID0gQ29uZmlndXJhdG9yKG9wdGlvbnMpO1xyXG4gICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNEZWJ1ZygpKXtcclxuICAgICAgICAgICAgbG9nTWFuYWdlci5kaXNhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKVwiKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgIHBsYXlsaXN0TWFuYWdlci5zZXRQbGF5bGlzdChwbGF5ZXJDb25maWcuZ2V0UGxheWxpc3QoKSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHNvdXJjZXMgOiBcIiAsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcclxuICAgICAgICBpbml0UHJvdmlkZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyp0aGF0LmdldENvbnRhaW5lcklkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5pZDtcclxuICAgIH07Ki9cclxuXHJcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDb25maWcoKVwiLCBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkpO1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXREdXJhdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBvc2l0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFZvbHVtZSgpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFZvbHVtZSgpIFwiICsgdm9sdW1lKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRNdXRlKCkgXCIgKyBzdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRNdXRlKCkgXCIgKyBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAocGxheWxpc3QpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xyXG5cclxuICAgICAgICBpZihwbGF5bGlzdCl7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldFBsYXlsaXN0KHBsYXlsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluaXRQcm92aWRlcigpO1xyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGxheSgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGxheSgpO1xyXG4gICAgfVxyXG4gICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGF1c2UoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrKCkgXCIrIHBvc2l0aW9uKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2Vlayhwb3NpdGlvbik7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRQbGF5YmFja1JhdGUoKSBcIiwgcGxheWJhY2tSYXRlKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldFBsYXliYWNrUmF0ZShwbGF5ZXJDb25maWcuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZShwbGF5YmFja1JhdGUpKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXliYWNrUmF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UXVhbGl0eUxldmVscygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgcXVhbGl0eUluZGV4KTtcclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKTtcclxuICAgICAgICBsZXQgY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbdGhhdC5nZXRDdXJyZW50UXVhbGl0eSgpLmluZGV4XTtcclxuICAgICAgICBsZXQgbmV3U291cmNlID0gc291cmNlc1txdWFsaXR5SW5kZXhdO1xyXG4gICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gdGhhdC5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBpc1NhbWVQcm92aWRlciA9IHByb3ZpZGVyQ29udHJvbGxlci5pc1NhbWVQcm92aWRlcihjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpO1xyXG4gICAgICAgIC8vIHByb3ZpZGVyLnNlckN1cnJlbnRRdWFsaXR5IC0+IHBsYXllckNvbmZpZyBzZXR0aW5nIC0+IGxvYWRcclxuICAgICAgICBsZXQgcmVzUXVhbGl0eUluZGV4ID0gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KHF1YWxpdHlJbmRleCwgaXNTYW1lUHJvdmlkZXIpO1xyXG5cclxuICAgICAgICBpZighbmV3U291cmNlKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIGlzU2FtZVByb3ZpZGVyXCIsIGlzU2FtZVByb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgaWYoIWlzU2FtZVByb3ZpZGVyKXtcclxuICAgICAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknXSk7XHJcbiAgICAgICAgICAgIGluaXRQcm92aWRlcihsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXNRdWFsaXR5SW5kZXg7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIENhcHRpb25zIDogVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IHZlcnNpb24uKi9cclxuICAgIC8qdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChpbmRleCkgPT57XHJcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLnNldEN1cnJlbnRDYXB0aW9uKGluZGV4KTtcclxuICAgICB9XHJcbiAgICAgdGhhdC5nZXRDdXJyZW50Q2FwdGlvbiA9ICgpID0+e1xyXG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpO1xyXG4gICAgIH1cclxuICAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT4ge1xyXG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xyXG4gICAgIH1cclxuICAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+IHtcclxuICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuYWRkQ2FwdGlvbigpO1xyXG4gICAgIH1cclxuICAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT4ge1xyXG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xyXG4gICAgIH0qL1xyXG5cclxuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEJ1ZmZlcigpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCkpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U3RhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnN0b3AgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc3RvcCgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIFwiKTtcclxuICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xyXG4gICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3ZpZGVyQ29udHJvbGxlciA9IG51bGw7XHJcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBwbGF5ZXJDb25maWcgPSBudWxsO1xyXG4gICAgICAgIGxhenlRdWV1ZSA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoYXQudHJpZ2dlcihERVNUUk9ZKTtcclxuICAgICAgICB0aGF0Lm9mZigpO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSAtIGxhenlRdWV1ZSwgY3VycmVudFByb3ZpZGVyLCBwcm92aWRlckNvbnRyb2xsZXIsIHBsYXlsaXN0TWFuYWdlciwgcGxheWVyQ29uZmlnLCBhcGkgZXZlbnQgZGVzdHJvZWQuIFwiKTtcclxuICAgICAgICBsb2dNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICBsb2dNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBPdmVuUGxheWVyU0RLLnJlbW92ZVBsYXllcih0aGF0LmdldENvbnRhaW5lcklkKCkpO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcGk7XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwaVJ0bXBFeHBhbnNpb24gPSBmdW5jdGlvbihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBleHRlcm5hbENhbGxiYWNrQ3JlZXAgOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5uYW1lICYmIHJlc3VsdC5kYXRhKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsKHJlc3VsdC5uYW1lLCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgaW5pdGlhbGl6ZXMgdGhlIGlucHV0IG9wdGlvbnMuXHJcbiAqIEBwYXJhbSAgIG9wdGlvbnNcclxuICpcclxuICogKi9cclxuY29uc3QgQ29uZmlndXJhdG9yID0gZnVuY3Rpb24ob3B0aW9ucyl7XHJcblxyXG4gICAgY29uc3QgY29tcG9zZVNvdXJjZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKXtcclxuICAgICAgICBjb25zdCBEZWZhdWx0cyA9IHtcclxuICAgICAgICAgICAgZGVmYXVsdFBsYXliYWNrUmF0ZTogMSxcclxuICAgICAgICAgICAgcGxheWJhY2tSYXRlQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzOiBbMC4yNSwgMC41LCAxLCAxLjUsIDJdLFxyXG4gICAgICAgICAgICBtdXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgdm9sdW1lOiA5MCxcclxuICAgICAgICAgICAgd2lkdGg6IDY0MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAzNjBcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VyY2FzZVZhbCA9IHZhbC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIodmFsKSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdpZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBzZXJpYWxpemUob3B0aW9uc1trZXldKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZVNpemUgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWwuc2xpY2UgJiYgdmFsLnNsaWNlKC0yKSA9PT0gJ3B4Jykge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdmFsLnNsaWNlKDAsIC0yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBldmFsdWF0ZUFzcGVjdFJhdGlvID0gZnVuY3Rpb24gKGFyLCB3aWR0aCkge1xyXG4gICAgICAgICAgICBpZiAod2lkdGgudG9TdHJpbmcoKS5pbmRleE9mKCclJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyICE9PSAnc3RyaW5nJyB8fCAhYXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgvXlxcZCpcXC4/XFxkKyUkLy50ZXN0KGFyKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYXIuaW5kZXhPZignOicpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB3ID0gcGFyc2VGbG9hdChhci5zdWJzdHIoMCwgaW5kZXgpKTtcclxuICAgICAgICAgICAgY29uc3QgaCA9IHBhcnNlRmxvYXQoYXIuc3Vic3RyKGluZGV4ICsgMSkpO1xyXG4gICAgICAgICAgICBpZiAodyA8PSAwIHx8IGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChoIC8gdyAqIDEwMCkgKyAnJSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlc2VyaWFsaXplKG9wdGlvbnMpO1xyXG4gICAgICAgIGxldCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0cywgb3B0aW9ucyk7XHJcbiAgICAgICAgY29uZmlnLndpZHRoID0gbm9ybWFsaXplU2l6ZShjb25maWcud2lkdGgpO1xyXG4gICAgICAgIGNvbmZpZy5oZWlnaHQgPSBub3JtYWxpemVTaXplKGNvbmZpZy5oZWlnaHQpO1xyXG4gICAgICAgIGNvbmZpZy5hc3BlY3RyYXRpbyA9IGV2YWx1YXRlQXNwZWN0UmF0aW8oY29uZmlnLmFzcGVjdHJhdGlvLCBjb25maWcud2lkdGgpO1xyXG5cclxuICAgICAgICBsZXQgcmF0ZUNvbnRyb2xzID0gY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzO1xyXG4gICAgICAgIGlmIChyYXRlQ29udHJvbHMpIHtcclxuICAgICAgICAgICAgbGV0IHJhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyYXRlQ29udHJvbHMpKSB7XHJcbiAgICAgICAgICAgICAgICByYXRlcyA9IHJhdGVDb250cm9scztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByYXRlcyA9IHJhdGVzLmZpbHRlcihyYXRlID0+IF8uaXNOdW1iZXIocmF0ZSkgJiYgcmF0ZSA+PSAwLjI1ICYmIHJhdGUgPD0gNClcclxuICAgICAgICAgICAgICAgIC5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJhdGVzLmluZGV4T2YoMSkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByYXRlcy5wdXNoKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJhdGVzLnNvcnQoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGVzID0gcmF0ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgfHwgY29uZmlnLnBsYXliYWNrUmF0ZXMuaW5kZXhPZihjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSkgPCAwKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGUgPSBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZTtcclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcuYXNwZWN0cmF0aW8pIHtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5hc3BlY3RyYXRpbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZpZ1BsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0O1xyXG4gICAgICAgIGlmICghY29uZmlnUGxheWxpc3QpIHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqID0gXy5waWNrKGNvbmZpZywgW1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICAgICAgICAndHlwZScsXHJcbiAgICAgICAgICAgICAgICAnbWVkaWFpZCcsXHJcbiAgICAgICAgICAgICAgICAnaW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgJ3NvdXJjZXMnLFxyXG4gICAgICAgICAgICAgICAgJ3RyYWNrcycsXHJcbiAgICAgICAgICAgICAgICAncHJlbG9hZCcsXHJcbiAgICAgICAgICAgICAgICAnZHVyYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ2hvc3QnLFxyXG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyxcclxuICAgICAgICAgICAgICAgICdzdHJlYW0nXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gWyBvYmogXTtcclxuICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShjb25maWdQbGF5bGlzdC5wbGF5bGlzdCkpIHtcclxuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5kdXJhdGlvbjtcclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNvbmZpZ3VyYXRvciBsb2FkZWQuXCIsIG9wdGlvbnMpO1xyXG4gICAgbGV0IGNvbmZpZyA9IGNvbXBvc2VTb3VyY2VPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIGxldCBhc3BlY3RyYXRpbyA9IGNvbmZpZy5hc3BlY3RyYXRpbyB8fCBcIjE2OjlcIjtcclxuICAgIGxldCBkZWJ1ZyA9IGNvbmZpZy5kZWJ1ZztcclxuICAgIGxldCBkZWZhdWx0UGxheWJhY2tSYXRlID0gY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgfHwgMTtcclxuICAgIGxldCBpbWFnZSA9IGNvbmZpZy5pbWFnZTtcclxuICAgIGxldCBwbGF5YmFja1JhdGVDb250cm9scyA9IGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyB8fCB0cnVlO1xyXG4gICAgbGV0IHBsYXliYWNrUmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcyB8fCBbMC41LCAxLCAxLjI1LCAxLjUsIDJdO1xyXG4gICAgbGV0IHBsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0IHx8IFtdO1xyXG4gICAgbGV0IHF1YWxpdHlMYWJlbCA9IGNvbmZpZy5xdWFsaXR5TGFiZWwgfHwgXCJcIjtcclxuICAgIGxldCByZXBlYXQgPSBjb25maWcucmVwZWF0IHx8IGZhbHNlO1xyXG4gICAgbGV0IHN0cmV0Y2hpbmcgPSBjb25maWcuc3RyZXRjaGluZyB8fCAndW5pZm9ybSc7XHJcblxyXG5cclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtyZXR1cm4gY29uZmlnO307XHJcblxyXG4gICAgdGhhdC5nZXRBc3BlY3RyYXRpbyA9KCk9PntyZXR1cm4gYXNwZWN0cmF0aW87fTtcclxuICAgIHRoYXQuc2V0QXNwZWN0cmF0aW8gPShhc3BlY3RyYXRpb18pPT57YXNwZWN0cmF0aW8gPSBhc3BlY3RyYXRpb187fTtcclxuXHJcbiAgICB0aGF0LmlzRGVidWcgPSgpPT57cmV0dXJuIGRlYnVnO307XHJcblxyXG4gICAgdGhhdC5nZXREZWZhdWx0UGxheWJhY2tSYXRlID0oKT0+e3JldHVybiBkZWZhdWx0UGxheWJhY2tSYXRlO307XHJcbiAgICB0aGF0LnNldERlZmF1bHRQbGF5YmFja1JhdGUgPShwbGF5YmFja1JhdGUpPT57ZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTsgcmV0dXJuIHBsYXliYWNrUmF0ZTt9O1xyXG5cclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxhYmVsID0gKCkgPT4ge3JldHVybiBxdWFsaXR5TGFiZWw7fTtcclxuICAgIHRoYXQuc2V0UXVhbGl0eUxhYmVsID0gKG5ld0xhYmVsKSA9PiB7cXVhbGl0eUxhYmVsID0gbmV3TGFiZWw7fTtcclxuXHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZXMgPSgpPT57cmV0dXJuIHBsYXliYWNrUmF0ZXM7fTtcclxuICAgIHRoYXQuaXNQbGF5YmFja1JhdGVDb250cm9scyA9KCk9PntyZXR1cm4gcGxheWJhY2tSYXRlQ29udHJvbHM7fTtcclxuXHJcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0oKT0+e3JldHVybiBwbGF5bGlzdDt9O1xyXG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0XyApPT57XHJcbiAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0Xykpe1xyXG4gICAgICAgICAgICBwbGF5bGlzdCA9IHBsYXlsaXN0XztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcGxheWxpc3QgPSBbcGxheWxpc3RfXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzUmVwZWF0ID0oKT0+e3JldHVybiByZXBlYXQ7fTtcclxuXHJcbiAgICB0aGF0LmdldFN0cmV0Y2hpbmcgPSgpPT57cmV0dXJuIHN0cmV0Y2hpbmc7fTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRvcjtcclxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMy4uXG4gKi9cblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1vZHVsZSBwcm92aWRlIGN1c3RvbSBldmVudHMuXG4gKiBAcGFyYW0gICBvYmplY3QgICAgQW4gb2JqZWN0IHRoYXQgcmVxdWlyZXMgY3VzdG9tIGV2ZW50cy5cbiAqXG4gKiAqL1xuXG5jb25zdCBFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbihvYmplY3Qpe1xuICAgIGxldCB0aGF0ID0gb2JqZWN0O1xuICAgIGxldCBfZXZlbnRzID1bXTtcblxuICAgIGNvbnN0IHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MsIGNvbnRleHQpe1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGxldCBsZW5ndGggPSBldmVudHMubGVuZ3RoO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gZXZlbnRzW2ldO1xuICAgICAgICAgICAgZXZlbnQubGlzdGVuZXIuYXBwbHkoICggZXZlbnQuY29udGV4dCB8fCBjb250ZXh0ICksIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQub24gPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIChfZXZlbnRzW25hbWVdIHx8IChfZXZlbnRzW25hbWVdPVtdKSApLnB1c2goeyBsaXN0ZW5lcjogbGlzdGVuZXIgICwgY29udGV4dCA6IGNvbnRleHR9KTtcbiAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgfTtcbiAgICB0aGF0LnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lKXtcbiAgICAgICAgaWYoIV9ldmVudHMpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XG4gICAgICAgIGNvbnN0IGFsbEV2ZW50cyA9IF9ldmVudHMuYWxsO1xuXG4gICAgICAgIGlmKGV2ZW50cyl7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGV2ZW50cywgYXJncywgdGhhdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYWxsRXZlbnRzKXtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoYWxsRXZlbnRzLCBhcmd1bWVudHMsIHRoYXQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgaWYoIV9ldmVudHMpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFuYW1lICYmICFsaXN0ZW5lciAmJiAhY29udGV4dCkgIHtcbiAgICAgICAgICAgIF9ldmVudHMgPSBbXTtcbiAgICAgICAgICAgIHJldHVybiB0aGF0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogT2JqZWN0LmtleXMoX2V2ZW50cyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IF9ldmVudHNbbmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgIHx8IGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5saXN0ZW5lciAgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLl9jYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2ZW50LmNvbnRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQub25jZSA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgY29uc3Qgb25jZUNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY291bnQrKykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQub2ZmKG5hbWUsIG9uY2VDYWxsYmFjayk7XG4gICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICBvbmNlQ2FsbGJhY2suX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGF0Lm9uKG5hbWUsIG9uY2VDYWxsYmFjaywgY29udGV4dCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7IiwiaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBleGVjdXRlcyB0aGUgaW5wdXQgY29tbWFuZHMgYXQgYSBzcGVjaWZpYyBwb2ludCBpbiB0aW1lLlxuICogQHBhcmFtICAgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHF1ZXVlZENvbW1hbmRzXG4gKiAqL1xuY29uc3QgTGF6eUNvbW1hbmRFeGVjdXRvciA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgcXVldWVkQ29tbWFuZHMpIHtcbiAgICBsZXQgY29tbWFuZFF1ZXVlID0gW107XG4gICAgbGV0IHVuZGVjb3JhdGVkTWV0aG9kcyA9IHt9O1xuICAgIGxldCBleGVjdXRlTW9kZSA9IGZhbHNlO1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciBsb2FkZWQuXCIpO1xuICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gaW5zdGFuY2VbY29tbWFuZF07XG4gICAgICAgIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSA9IG1ldGhvZCB8fCBmdW5jdGlvbigpe307XG5cbiAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICAgICAgICBpZiAoIWV4ZWN1dGVNb2RlKSB7XG4gICAgICAgICAgICAgICAgLy9jb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgICAgICAgICAgICAgdGhhdC5hZGRRdWV1ZShjb21tYW5kLCBhcmdzKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZC5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgdmFyIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2hpbGUgKGNvbW1hbmRRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNvbW1hbmQsIGFyZ3MgfSA9IGNvbW1hbmRRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgKHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSB8fCBpbnN0YW5jZVtjb21tYW5kXSkuYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhhdC5zZXRFeGVjdXRlTW9kZSA9IChtb2RlKSA9PiB7XG4gICAgICAgIGV4ZWN1dGVNb2RlID0gbW9kZTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHNldEV4ZWN1dGVNb2RlKClcIiwgbW9kZSk7XG4gICAgfTtcbiAgICB0aGF0LmdldFVuZGVjb3JhdGVkTWV0aG9kcyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRVbmRlY29yYXRlZE1ldGhvZHMoKVwiLCB1bmRlY29yYXRlZE1ldGhvZHMpO1xuICAgICAgICByZXR1cm4gdW5kZWNvcmF0ZWRNZXRob2RzO1xuICAgIH1cbiAgICB0aGF0LmdldFF1ZXVlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFF1ZXVlKClcIiwgZ2V0UXVldWUpO1xuICAgICAgICByZXR1cm4gY29tbWFuZFF1ZXVlO1xuICAgIH1cbiAgICB0aGF0LmFkZFF1ZXVlID0gZnVuY3Rpb24oY29tbWFuZCwgYXJncyl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBhZGRRdWV1ZSgpXCIsIGNvbW1hbmQsIGFyZ3MpO1xuICAgICAgICBjb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgfVxuXG4gICAgdGhhdC5mbHVzaCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBmbHVzaCgpXCIpO1xuICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcbiAgICB9O1xuICAgIHRoYXQuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGVtcHR5KClcIik7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5sZW5ndGggPSAwO1xuICAgIH07XG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IG9mZigpXCIpO1xuICAgICAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XG4gICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgLy9SdW4gb25jZSBhdCB0aGUgZW5kXG4gICAgdGhhdC5yZW1vdmVBbmRFeGN1dGVPbmNlID0gZnVuY3Rpb24oY29tbWFuZF8pe1xuICAgICAgICBsZXQgY29tbWFuZFF1ZXVlSXRlbSA9IF8uZmluZFdoZXJlKGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogcmVtb3ZlQW5kRXhjdXRlT25jZSgpXCIsIGNvbW1hbmRfKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLnNwbGljZShfLmZpbmRJbmRleChjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KSwgMSk7XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcbiAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicmVtb3ZlQ29tbWFuZCgpXCIpO1xuICAgICAgICAgICAgaWYoY29tbWFuZFF1ZXVlSXRlbSl7XG4gICAgICAgICAgICAgICAgKG1ldGhvZHx8IGluc3RhbmNlW2NvbW1hbmRfXSkuYXBwbHkoaW5zdGFuY2UsIGNvbW1hbmRRdWV1ZUl0ZW0uYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kX10gPSBtZXRob2Q7XG4gICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgdGhhdC5vZmYoKTtcbiAgICAgICAgdGhhdC5lbXB0eSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IExhenlDb21tYW5kRXhlY3V0b3I7IiwiaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2h9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGZpbmRzIHRoZSBwcm92aWRlciB0aGF0IG1hdGNoZXMgdGhlIGlucHV0IHNvdXJjZS5cclxuICogQHBhcmFtXHJcbiAqICovXHJcblxyXG5jb25zdCBTdXBwb3J0Q2hlY2tlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciBsb2FkZWQuXCIpO1xyXG4gICAgY29uc3Qgc3VwcG9ydExpc3QgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnaHRtbDUnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IE1pbWVUeXBlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhYWM6ICdhdWRpby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZjR2OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtNHY6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdjogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbXAzOiAnYXVkaW8vbXBlZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbXBlZzogJ2F1ZGlvL21wZWcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9ndjogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2dnOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ2E6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZvcmJpczogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgd2VibTogJ3ZpZGVvL3dlYm0nLFxyXG4gICAgICAgICAgICAgICAgICAgIGY0YTogJ3ZpZGVvL2FhYycsXHJcbiAgICAgICAgICAgICAgICAgICAgbTN1ODogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcclxuICAgICAgICAgICAgICAgICAgICBtM3U6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGxzOiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZighdHlwZSl7cmV0dXJuIGZhbHNlO31cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFtaW1lVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISF2aWRlby5jYW5QbGF5VHlwZShtaW1lVHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3dlYnJ0YycsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2Rhc2gnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL21wZCBhcHBsaWNhdGlvbi9kYXNoK3htbFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRGFzaChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdobHMnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdGhpcyBtZXRob2QgZnJvbSBobHMuanNcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzSGxzU3VwcG9ydCA9ICgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRNZWRpYVNvdXJjZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Lk1lZGlhU291cmNlIHx8IHdpbmRvdy5XZWJLaXRNZWRpYVNvdXJjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVkaWFTb3VyY2UgPSBnZXRNZWRpYVNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXIgPSB3aW5kb3cuU291cmNlQnVmZmVyIHx8IHdpbmRvdy5XZWJLaXRTb3VyY2VCdWZmZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzVHlwZVN1cHBvcnRlZCA9IG1lZGlhU291cmNlICYmIHR5cGVvZiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQgPT09ICdmdW5jdGlvbicgJiYgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFLG1wNGEuNDAuMlwiJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIFNvdXJjZUJ1ZmZlciBpcyBleHBvc2VkIGVuc3VyZSBpdHMgQVBJIGlzIHZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2FmYXJpIGFuZCBvbGQgdmVyc2lvbiBvZiBDaHJvbWUgZG9lIG5vdCBleHBvc2UgU291cmNlQnVmZmVyIGdsb2JhbGx5IHNvIGNoZWNraW5nIFNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgaXMgaW1wb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXJWYWxpZEFQSSA9ICFzb3VyY2VCdWZmZXIgfHwgc291cmNlQnVmZmVyLnByb3RvdHlwZSAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5hcHBlbmRCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUucmVtb3ZlID09PSAnZnVuY3Rpb24nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWlzVHlwZVN1cHBvcnRlZCAmJiAhIXNvdXJjZUJ1ZmZlclZhbGlkQVBJO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIHRoaXMgJyEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyknIGlmIHlvdSB3YW50IHRvIHVzZSBobHNqcy5cclxuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKSAmJiAhIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdydG1wJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBdO1xyXG5cclxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlID0gKHNvcnVjZV8pID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSgpXCIsIHNvcnVjZV8pO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IChzb3J1Y2VfID09PSBPYmplY3Qoc29ydWNlXykpID8gc29ydWNlXyA6IHt9O1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdXBwb3J0TGlzdC5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBpZihzdXBwb3J0TGlzdFtpXS5jaGVja1N1cHBvcnQoc291cmNlKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydExpc3RbaV0ubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCA9IChwbGF5bGlzdF8pID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCgpXCIsIHBsYXlsaXN0Xyk7XHJcbiAgICAgICAgbGV0IHN1cHBvcnROYW1lcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBwbGF5bGlzdF9baV07XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2UgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSBpdGVtLnNvdXJjZXNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnROYW1lcy5wdXNoKHN1cHBvcnRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdXBwb3J0TmFtZXM7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjtcclxuIiwiLy8gU1RBVEVcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9ICdidWZmZXJpbmcnO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfSURMRSA9ICdpZGxlJztcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0NPTVBMRVRFID0gJ2NvbXBsZXRlJztcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9ICdwYXVzZWQnO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfUExBWUlORyA9ICdwbGF5aW5nJztcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0VSUk9SID0gJ2Vycm9yJztcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSAnbG9hZGluZyc7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9TVEFMTEVEID0gJ3N0YWxsZWQnO1xyXG5cclxuXHJcbi8vIFBST1ZJREVSXHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9ICdodG1sNSc7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9XRUJSVEMgPSAnd2VicnRjJztcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0RBU0ggPSAnZGFzaCc7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9ITFMgPSAnaGxzJztcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1JUTVAgPSAncnRtcCc7XHJcblxyXG4vLyBFVkVOVFNcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcclxuZXhwb3J0IGNvbnN0IFJFQURZID0gJ3JlYWR5JztcclxuZXhwb3J0IGNvbnN0IERFU1RST1kgPSAnZGVzdHJveSc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NFRUsgPSAnc2Vlayc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUl9GVUxMID0gJ2J1ZmZlckZ1bGwnO1xyXG5leHBvcnQgY29uc3QgRElTUExBWV9DTElDSyA9ICdkaXNwbGF5Q2xpY2snO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9MT0FERUQgPSAnbG9hZGVkJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gJ3NlZWtlZCc7XHJcbmV4cG9ydCBjb25zdCBORVRXT1JLX1VOU1RBQkxFRCA9ICd1bnN0YWJsZU5ldHdvcmsnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVSUk9SID0gJ2Vycm9yJztcclxuXHJcbi8vIFNUQVRFIE9GIFBMQVlFUlxyXG5leHBvcnQgY29uc3QgUExBWUVSX1NUQVRFID0gJ3N0YXRlQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9QQVVTRSA9ICdwYXVzZSc7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfUExBWSA9ICdwbGF5JztcclxuXHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9ICdidWZmZXJDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRSA9ICd0aW1lJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfUkFURV9DSEFOR0UgPSAncmF0ZWNoYW5nZSc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9ICd2b2x1bWVDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTVVURSA9ICdtdXRlJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTUVUQSA9ICdtZXRhQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMUyA9ICdxdWFsaXR5TGV2ZWxDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxfQ0hBTkdFRCA9ICdjdXJyZW50UXVhbGl0eUxldmVsQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBQTEFZQkFDS19SQVRFX0NIQU5HRUQgPSAncGxheWJhY2tSYXRlQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQgPSAnY3VlQ2hhbmdlZCc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRCA9ICdjYXB0aW9uQ2hhbmdlZCc7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IElOSVRfRVJST1IgPSAxMDA7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9FUlJPUiA9IDMwMDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiA9IDMwMTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IgPSAzMDI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IgPSAzMDM7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfRklMRV9FUlJPUiA9IDMwNDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DQVBUSU9OX0VSUk9SID0gMzA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19XU19FUlJPUiA9IDUwMTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfQ0xPU0VEID0gNTAyO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAzO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IgPSA1MDQ7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA2O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1cgPSA1MTA7XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2V4dHJhY3RFeHRlbnNpb24gLHRyaW19IGZyb20gXCIuLi8uLi91dGlscy9zdHJpbmdzXCI7XHJcbmltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiLi4vU3VwcG9ydENoZWNrZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgUGxheWxpc3Qgb3IgU291cmNlcy5cclxuICogQHBhcmFtXHJcbiAqXHJcbiAqICovXHJcbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGN1cnJlbnRQbGF5bGlzdCA9IFtdO1xyXG4gICAgbGV0IHN1cHBvcnRDaGVja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCBtYWtlUHJldHR5U291cmNlID0gZnVuY3Rpb24oc291cmNlXyl7XHJcbiAgICAgICAgaWYgKCFzb3VyY2VfIHx8ICFzb3VyY2VfLmZpbGUgJiYgIShzb3VyY2VfLmhvc3QgfHwgc291cmNlXy5hcHBsaWNhdGlvbiB8fCBzb3VyY2VfLnN0cmVhbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIHsgJ2RlZmF1bHQnOiBmYWxzZSB9LCBzb3VyY2VfKTtcclxuICAgICAgICBzb3VyY2UuZmlsZSA9IHRyaW0oJycgKyBzb3VyY2UuZmlsZSk7XHJcblxyXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcclxuICAgICAgICAgICAgc291cmNlLmZpbGUgPSBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvc3RyZWFtL1wiICsgc291cmNlLnN0cmVhbTtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5ob3N0O1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmFwcGxpY2F0aW9uO1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLnN0cmVhbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1pbWV0eXBlUmVnRXggPSAvXlteL10rXFwvKD86eC0pPyhbXi9dKykkLztcclxuXHJcbiAgICAgICAgaWYgKG1pbWV0eXBlUmVnRXgudGVzdChzb3VyY2UudHlwZSkpIHtcclxuICAgICAgICAgICAgLy8gaWYgdHlwZSBpcyBnaXZlbiBhcyBhIG1pbWV0eXBlXHJcbiAgICAgICAgICAgIHNvdXJjZS5taW1lVHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IHNvdXJjZS50eXBlLnJlcGxhY2UobWltZXR5cGVSZWdFeCwgJyQxJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihpc1J0bXAoc291cmNlLmZpbGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnd2VicnRjJztcclxuICAgICAgICB9ZWxzZSBpZihpc0Rhc2goc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2Rhc2gnO1xyXG4gICAgICAgIH1lbHNlIGlmICghc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBleHRyYWN0RXh0ZW5zaW9uKHNvdXJjZS5maWxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbm9ybWFsaXplIHR5cGVzXHJcbiAgICAgICAgc3dpdGNoIChzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdtM3U4JzpcclxuICAgICAgICAgICAgY2FzZSAndm5kLmFwcGxlLm1wZWd1cmwnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnaGxzJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtNGEnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnYWFjJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzbWlsJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlW2tleV0gPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgc291cmNlW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0KSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgc2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3QpO1xyXG4gICAgICAgIGNvbnN0IHByZXR0aWVkUGxheWxpc3QgPSAoXy5pc0FycmF5KHBsYXlsaXN0KSA/IHBsYXlsaXN0IDogW3BsYXlsaXN0XSkubWFwKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KGl0ZW0udHJhY2tzKSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0udHJhY2tzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwbGF5bGlzdEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tzOiBbXVxyXG4gICAgICAgICAgICB9LCBpdGVtICk7XHJcblxyXG4gICAgICAgICAgICBpZigocGxheWxpc3RJdGVtLnNvdXJjZXMgPT09IE9iamVjdChwbGF5bGlzdEl0ZW0uc291cmNlcykpICYmICFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzKV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBpdGVtLmxldmVscztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShpdGVtKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBwcmV0dHlTb3VyY2UgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdFNvdXJjZSA9IHNvdXJjZS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNvdXJjZSBkb2Vzbid0IGhhdmUgYSBsYWJlbCwgbnVtYmVyIGl0XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS50eXBlK1wiLVwiK2kudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlTb3VyY2UgPSBtYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmKHN1cHBvcnRDaGVja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShwcmV0dHlTb3VyY2UpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IHByZXR0eVNvdXJjZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBwbGF5bGlzdEl0ZW0uc291cmNlcy5maWx0ZXIoc291cmNlID0+ICEhc291cmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmF1bHQg6rCAIOyXhuydhOuVjCB3ZWJydGPqsIAg7J6I64uk66m0IHdlYnJ0YyBkZWZhdWx0IDogdHJ1ZeuhnCDsnpDrj5kg7ISk7KCVXHJcbiAgICAgICAgICAgIC8qbGV0IGhhdmVEZWZhdWx0ID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UuZGVmYXVsdCA9PSB0cnVlO30pO1xyXG4gICAgICAgICAgICBsZXQgd2VicnRjU291cmNlID0gW107XHJcbiAgICAgICAgICAgIGlmKCFoYXZlRGVmYXVsdCl7XHJcbiAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS50eXBlID09IFwid2VicnRjXCI7fSk7XHJcbiAgICAgICAgICAgICAgICBpZih3ZWJydGNTb3VyY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZS5kZWZhdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSovXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnRyYWNrcykpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLmNvbmNhdChwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHBsYXlsaXN0SXRlbS5jYXB0aW9ucztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MubWFwKGZ1bmN0aW9uKHRyYWNrKXtcclxuICAgICAgICAgICAgICAgIGlmKCF0cmFjayB8fCAhdHJhY2suZmlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHtcclxuICAgICAgICAgICAgICAgICAgICAna2luZCc6ICdjYXB0aW9ucycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgdHJhY2spO1xyXG4gICAgICAgICAgICB9KS5maWx0ZXIodHJhY2sgPT4gISF0cmFjayk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGxheWxpc3RJdGVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGN1cnJlbnRQbGF5bGlzdCA9IHByZXR0aWVkUGxheWxpc3Q7XHJcbiAgICAgICAgcmV0dXJuIHByZXR0aWVkUGxheWxpc3Q7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0UGxheWxpc3QoKSBcIiwgY3VycmVudFBsYXlsaXN0KTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9XZSBkbyBub3Qgc3VwcG9ydCBcIlBMQVlMSVNUXCIgbm90IHlldC4gU28gdGhpcyByZXR1cm5zIHBsYXlsaXN0IG9mIDAuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldEN1cnJlbnRTb3VyY2VzKCkgXCIsIGN1cnJlbnRQbGF5bGlzdFswXS5zb3VyY2VzKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFBsYXlsaXN0WzBdLnNvdXJjZXM7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsImltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiYXBpL1N1cHBvcnRDaGVja2VyXCI7XHJcbmltcG9ydCBQcm9taXNlLCB7cmVzb2x2ZWR9IGZyb20gXCJhcGkvc2hpbXMvcHJvbWlzZVwiO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXHJcbiAqIEBwYXJhbVxyXG4gKiAqL1xyXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBzdXBwb3J0Q2hhY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XHJcbiAgICBjb25zdCBQcm92aWRlcnMgPSB7fTtcclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCByZWdpc3RlUHJvdmlkZXIgPSAobmFtZSwgcHJvdmlkZXIpID0+e1xyXG4gICAgICAgIGlmKFByb3ZpZGVyc1tuYW1lXSl7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcclxuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPXtcclxuICAgICAgICBodG1sNTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9IdG1sNSddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvSHRtbDUnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcImh0bWw1XCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5IdG1sNSdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdlYnJ0YyA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9XZWJSVEMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L1dlYlJUQycpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwid2VicnRjXCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhc2ggOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvRGFzaCddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvRGFzaCcpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiZGFzaFwiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGxzIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L0hscyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvSGxzJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJobHNcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnRtcCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9mbGFzaC9SdG1wJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9mbGFzaC9SdG1wJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJydG1wXCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhhdC5sb2FkUHJvdmlkZXJzID0gKHBsYXlsaXN0KSA9PntcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KHBsYXlsaXN0KTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZFByb3ZpZGVycygpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzKTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXHJcbiAgICAgICAgICAgIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMuZmlsdGVyKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISFQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdO1xyXG4gICAgICAgICAgICB9KS5tYXAoZnVuY3Rpb24ocHJvdmlkZXJOYW1lKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZmluZEJ5TmFtZSA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGZpbmRCeU5hbWUoKSBcIiwgbmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZSA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBnZXRQcm92aWRlckJ5U291cmNlKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBpc1NhbWVQcm92aWRlcigpIFwiLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKSApO1xyXG4gICAgICAgIHJldHVybiBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgPT09IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xyXG4iLCIvLyAgICAgIFByb21pc2UgUG9seWZpbGxcclxuLy8gICAgICBodHRwczovL2dpdGh1Yi5jb20vdGF5bG9yaGFrZXMvcHJvbWlzZS1wb2x5ZmlsbFxyXG4vLyAgICAgIENvcHlyaWdodCAoYykgMjAxNCBUYXlsb3IgSGFrZXNcclxuLy8gICAgICBDb3B5cmlnaHQgKGMpIDIwMTQgRm9yYmVzIExpbmRlc2F5XHJcbi8vICAgICAgdGF5bG9yaGFrZXMvcHJvbWlzZS1wb2x5ZmlsbCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuXHJcbmNvbnN0IHByb21pc2VGaW5hbGx5ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgIHZhciBjb25zdHJ1Y3RvciA9IHRoaXMuY29uc3RydWN0b3I7XHJcbiAgICByZXR1cm4gdGhpcy50aGVuKFxyXG4gICAgICAgIGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVqZWN0KHJlYXNvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn07XHJcblxyXG4vLyBTdG9yZSBzZXRUaW1lb3V0IHJlZmVyZW5jZSBzbyBwcm9taXNlLXBvbHlmaWxsIHdpbGwgYmUgdW5hZmZlY3RlZCBieVxyXG4vLyBvdGhlciBjb2RlIG1vZGlmeWluZyBzZXRUaW1lb3V0IChsaWtlIHNpbm9uLnVzZUZha2VUaW1lcnMoKSlcclxuY29uc3Qgc2V0VGltZW91dEZ1bmMgPSB3aW5kb3cuc2V0VGltZW91dDtcclxuY29uc3Qgc2V0SW1tZWRpYXRlRnVuYyA9IHdpbmRvdy5zZXRJbW1lZGlhdGU7XHJcblxyXG5cclxuZnVuY3Rpb24gbm9vcCgpIHt9XHJcblxyXG4vLyBQb2x5ZmlsbCBmb3IgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcclxuZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5jb25zdCBQcm9taXNlU2hpbSA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb21pc2UpKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2VzIG11c3QgYmUgY29uc3RydWN0ZWQgdmlhIG5ldycpO1xyXG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgZnVuY3Rpb24nKTtcclxuICAgIHRoaXMuX3N0YXRlID0gMDtcclxuICAgIHRoaXMuX2hhbmRsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuX3ZhbHVlID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5fZGVmZXJyZWRzID0gW107XHJcblxyXG4gICAgZG9SZXNvbHZlKGZuLCB0aGlzKTtcclxufVxyXG5cclxuY29uc3QgaGFuZGxlID0gZnVuY3Rpb24gKHNlbGYsIGRlZmVycmVkKSB7XHJcbiAgICB3aGlsZSAoc2VsZi5fc3RhdGUgPT09IDMpIHtcclxuICAgICAgICBzZWxmID0gc2VsZi5fdmFsdWU7XHJcbiAgICB9XHJcbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDApIHtcclxuICAgICAgICBzZWxmLl9kZWZlcnJlZHMucHVzaChkZWZlcnJlZCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgc2VsZi5faGFuZGxlZCA9IHRydWU7XHJcbiAgICBQcm9taXNlLl9pbW1lZGlhdGVGbihmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY2IgPSBzZWxmLl9zdGF0ZSA9PT0gMSA/IGRlZmVycmVkLm9uRnVsZmlsbGVkIDogZGVmZXJyZWQub25SZWplY3RlZDtcclxuICAgICAgICBpZiAoY2IgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgKHNlbGYuX3N0YXRlID09PSAxID8gcmVzb2x2ZSA6IHJlamVjdCkoZGVmZXJyZWQucHJvbWlzZSwgc2VsZi5fdmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXQ7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0ID0gY2Ioc2VsZi5fdmFsdWUpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGRlZmVycmVkLnByb21pc2UsIGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc29sdmUoZGVmZXJyZWQucHJvbWlzZSwgcmV0KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5jb25zdCByZXNvbHZlID0gZnVuY3Rpb24gKHNlbGYsIG5ld1ZhbHVlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIFByb21pc2UgUmVzb2x1dGlvbiBQcm9jZWR1cmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9wcm9taXNlcy1hcGx1cy9wcm9taXNlcy1zcGVjI3RoZS1wcm9taXNlLXJlc29sdXRpb24tcHJvY2VkdXJlXHJcbiAgICAgICAgaWYgKG5ld1ZhbHVlID09PSBzZWxmKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIHByb21pc2UgY2Fubm90IGJlIHJlc29sdmVkIHdpdGggaXRzZWxmLicpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgbmV3VmFsdWUgJiZcclxuICAgICAgICAgICAgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG5ld1ZhbHVlID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB2YXIgdGhlbiA9IG5ld1ZhbHVlLnRoZW47XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX3N0YXRlID0gMztcclxuICAgICAgICAgICAgICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgICAgICBmaW5hbGUoc2VsZik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGRvUmVzb2x2ZShiaW5kKHRoZW4sIG5ld1ZhbHVlKSwgc2VsZik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5fc3RhdGUgPSAxO1xyXG4gICAgICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgZmluYWxlKHNlbGYpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJlamVjdChzZWxmLCBlKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgcmVqZWN0ID1mdW5jdGlvbiAoc2VsZiwgbmV3VmFsdWUpIHtcclxuICAgIHNlbGYuX3N0YXRlID0gMjtcclxuICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICBmaW5hbGUoc2VsZik7XHJcbn1cclxuXHJcbmNvbnN0IGZpbmFsZSA9IGZ1bmN0aW9uIChzZWxmKSB7XHJcbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDIgJiYgc2VsZi5fZGVmZXJyZWRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIFByb21pc2UuX2ltbWVkaWF0ZUZuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuX2hhbmRsZWQpIHtcclxuICAgICAgICAgICAgICAgIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuKHNlbGYuX3ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzZWxmLl9kZWZlcnJlZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBoYW5kbGUoc2VsZiwgc2VsZi5fZGVmZXJyZWRzW2ldKTtcclxuICAgIH1cclxuICAgIHNlbGYuX2RlZmVycmVkcyA9IG51bGw7XHJcbn1cclxuXHJcbmNvbnN0IEhhbmRsZXIgPSBmdW5jdGlvbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb21pc2UpIHtcclxuICAgIHRoaXMub25GdWxmaWxsZWQgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IG51bGw7XHJcbiAgICB0aGlzLm9uUmVqZWN0ZWQgPSB0eXBlb2Ygb25SZWplY3RlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uUmVqZWN0ZWQgOiBudWxsO1xyXG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRha2UgYSBwb3RlbnRpYWxseSBtaXNiZWhhdmluZyByZXNvbHZlciBmdW5jdGlvbiBhbmQgbWFrZSBzdXJlXHJcbiAqIG9uRnVsZmlsbGVkIGFuZCBvblJlamVjdGVkIGFyZSBvbmx5IGNhbGxlZCBvbmNlLlxyXG4gKlxyXG4gKiBNYWtlcyBubyBndWFyYW50ZWVzIGFib3V0IGFzeW5jaHJvbnkuXHJcbiAqL1xyXG5jb25zdCBkb1Jlc29sdmUgPSBmdW5jdGlvbiAoZm4sIHNlbGYpIHtcclxuICAgIHZhciBkb25lID0gZmFsc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGZuKFxyXG4gICAgICAgICAgICBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzZWxmLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KHNlbGYsIHJlYXNvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xyXG4gICAgICAgIGRvbmUgPSB0cnVlO1xyXG4gICAgICAgIHJlamVjdChzZWxmLCBleCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblByb21pc2VTaGltLnByb3RvdHlwZVsnY2F0Y2gnXSA9IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpIHtcclxuICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3RlZCk7XHJcbn07XHJcblxyXG5Qcm9taXNlU2hpbS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XHJcbiAgICB2YXIgcHJvbSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG5vb3ApO1xyXG5cclxuICAgIGhhbmRsZSh0aGlzLCBuZXcgSGFuZGxlcihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcHJvbSkpO1xyXG4gICAgcmV0dXJuIHByb207XHJcbn07XHJcblxyXG5Qcm9taXNlU2hpbS5wcm90b3R5cGVbJ2ZpbmFsbHknXSA9IHByb21pc2VGaW5hbGx5O1xyXG5cclxuUHJvbWlzZVNoaW0uYWxsID0gZnVuY3Rpb24oYXJyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgaWYgKCFhcnIgfHwgdHlwZW9mIGFyci5sZW5ndGggPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlLmFsbCBhY2NlcHRzIGFuIGFycmF5Jyk7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpO1xyXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJlc29sdmUoW10pO1xyXG4gICAgICAgIHZhciByZW1haW5pbmcgPSBhcmdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVzKGksIHZhbCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhlbiA9IHZhbC50aGVuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVuLmNhbGwoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMoaSwgdmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFyZ3NbaV0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgICBpZiAoLS1yZW1haW5pbmcgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChleCkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlcyhpLCBhcmdzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcblByb21pc2VTaGltLnJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcclxuICAgICAgICByZXNvbHZlKHZhbHVlKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuUHJvbWlzZVNoaW0ucmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICByZWplY3QodmFsdWUpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5Qcm9taXNlU2hpbS5yYWNlID0gZnVuY3Rpb24odmFsdWVzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHZhbHVlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB2YWx1ZXNbaV0udGhlbihyZXNvbHZlLCByZWplY3QpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy8gVXNlIHBvbHlmaWxsIGZvciBzZXRJbW1lZGlhdGUgZm9yIHBlcmZvcm1hbmNlIGdhaW5zXHJcblByb21pc2VTaGltLl9pbW1lZGlhdGVGbiA9XHJcbiAgICAodHlwZW9mIHNldEltbWVkaWF0ZUZ1bmMgPT09ICdmdW5jdGlvbicgJiZcclxuICAgIGZ1bmN0aW9uKGZuKSB7XHJcbiAgICAgICAgc2V0SW1tZWRpYXRlRnVuYyhmbik7XHJcbiAgICB9KSB8fFxyXG4gICAgZnVuY3Rpb24oZm4pIHtcclxuICAgICAgICBzZXRUaW1lb3V0RnVuYyhmbiwgMCk7XHJcbiAgICB9O1xyXG5cclxuUHJvbWlzZVNoaW0uX3VuaGFuZGxlZFJlamVjdGlvbkZuID0gZnVuY3Rpb24gX3VuaGFuZGxlZFJlamVjdGlvbkZuKGVycikge1xyXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdQb3NzaWJsZSBVbmhhbmRsZWQgUHJvbWlzZSBSZWplY3Rpb246JywgZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBQcm9taXNlID0gd2luZG93LlByb21pc2UgfHwgKHdpbmRvdy5Qcm9taXNlID0gUHJvbWlzZVNoaW0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVkID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9taXNlO1xyXG4iLCJpbXBvcnQgQVBJIGZyb20gJ2FwaS9BcGknO1xyXG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tICd1dGlscy92YWxpZGF0b3InO1xyXG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcclxuaW1wb3J0IExhJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xyXG5cclxuXHJcbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5zZGsuanMnKTtcclxuXHJcbi8qKlxyXG4gKiBNYWluIE92ZW5QbGF5ZXJTREsgb2JqZWN0XHJcbiAqL1xyXG5jb25zdCBPdmVuUGxheWVyU0RLID0gd2luZG93Lk92ZW5QbGF5ZXJTREsgPSB7fTtcclxuXHJcbmNvbnN0IHBsYXllckxpc3QgPSBPdmVuUGxheWVyU0RLLnBsYXllckxpc3QgPSBbXTtcclxuXHJcbmV4cG9ydCBjb25zdCBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcclxuXHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG5cclxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xyXG5cclxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVyKTtcclxuICAgIH0gZWxzZSBpZiAoY29udGFpbmVyLm5vZGVUeXBlKSB7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyRWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBwbGF5ZXIgaW5zdGFuY2UgYW5kIHJldHVybiBpdC5cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZyB8IGRvbSBlbGVtZW50fSBjb250YWluZXIgIElkIG9mIGNvbnRhaW5lciBlbGVtZW50IG9yIGNvbnRhaW5lciBlbGVtZW50XHJcbiAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgIFRoZSBvcHRpb25zXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmNyZWF0ZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgb3B0aW9ucykge1xyXG5cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBBUEkoY29udGFpbmVyRWxlbWVudCk7XHJcbiAgICBwbGF5ZXJJbnN0YW5jZS5pbml0KG9wdGlvbnMpO1xyXG5cclxuICAgIHBsYXllckxpc3QucHVzaChwbGF5ZXJJbnN0YW5jZSk7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBsaXN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuICAgICB7YXJyYXl9ICBUaGUgcGxheWVyIGxpc3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4gcGxheWVyTGlzdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgY29udGFpbmVyIGlkLlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSAgY29udGFpbmVySWQgIFRoZSBjb250YWluZXIgaWRlbnRpZmllclxyXG4gKiBAcmV0dXJuICAgICB7b2JlamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUNvbnRhaW5lcklkID0gZnVuY3Rpb24oY29udGFpbmVySWQpIHtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGxheWVyTGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGluZGV4LlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcclxuICogQHJldHVybiAgICAge29iamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IHBsYXllckxpc3RbaW5kZXhdO1xyXG5cclxuICAgIGlmIChwbGF5ZXJJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIHBsYXllciBpbnN0YW5jZSBieSBwbGF5ZXJJZC5cclxuICpcclxuICogQHBhcmFtICAgICAge3BsYXllcklkfSAgaWRcclxuICogQHJldHVybiAgICAge251bGx9XHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLnJlbW92ZVBsYXllciA9IGZ1bmN0aW9uKHBsYXllcklkKSB7XHJcbiAgICBjb25zb2xlLmxvZyhwbGF5ZXJJZCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IHBsYXllcklkKSB7XHJcblxyXG4gICAgICAgICAgICBwbGF5ZXJMaXN0LnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIHdlYnJ0YyBzb3VyY2UgZm9yIHBsYXllciBzb3VyY2UgdHlwZS5cclxuICpcclxuICogQHBhcmFtICAgICAge09iamVjdCB8IEFycmF5fSAgc291cmNlICAgd2VicnRjIHNvdXJjZVxyXG4gKiBAcmV0dXJuICAgICB7QXJyYXl9ICBQbGF5ZXIgc291cmNlIE9iZWpjdC5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2VuZXJhdGVXZWJydGNVcmxzID0gZnVuY3Rpb24oc291cmNlcykge1xyXG4gICAgcmV0dXJuIChfLmlzQXJyYXkoc291cmNlcykgPyBzb3VyY2VzIDogW3NvdXJjZXNdKS5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCl7XHJcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgaXNXZWJSVEMoc291cmNlLmhvc3QpICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcclxuICAgICAgICAgICAgcmV0dXJuIHtmaWxlIDogc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL1wiICsgc291cmNlLnN0cmVhbSwgdHlwZSA6IFwid2VicnRjXCIsIGxhYmVsIDogc291cmNlLmxhYmVsID8gc291cmNlLmxhYmVsIDogXCJ3ZWJydGMtXCIrKGluZGV4KzEpIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPdmVuUGxheWVyU0RLO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIzLi5cclxuICovXHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgSXQgd2FzIHJlcGxhY2UganF1ZXJ5J3Mgc2VsZWN0b3IuIEl0IE9mdGVuIHVzZWQgYnkgT3ZlblRlbXBsYXRlLiAoL3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZS5qcylcclxuICogQHBhcmFtICAgc2VsZWN0b3JPckVsZW1lbnQgIHN0cmluZyBvciBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgTGEkID0gZnVuY3Rpb24oc2VsZWN0b3JPckVsZW1lbnQpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgY29uc3QgcmV0dXJuTm9kZSA9IGZ1bmN0aW9uKCRlbGVtZW50ICwgc2VsZWN0b3Ipe1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9ICAkZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICBpZihub2RlTGlzdC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3RbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgbGV0ICRlbGVtZW50ID0gXCJcIjtcclxuXHJcbiAgICBpZiggXy5ldmVyeShzZWxlY3Rvck9yRWxlbWVudCwgZnVuY3Rpb24oaXRlbSl7cmV0dXJuIF8uaXNFbGVtZW50KGl0ZW0pfSkpe1xyXG4gICAgICAgICRlbGVtZW50ID0gc2VsZWN0b3JPckVsZW1lbnQ7XHJcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJkb2N1bWVudFwiKXtcclxuICAgICAgICAkZWxlbWVudCA9IGRvY3VtZW50O1xyXG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwid2luZG93XCIpe1xyXG4gICAgICAgICRlbGVtZW50ID0gd2luZG93O1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgJGVsZW1lbnQgPSByZXR1cm5Ob2RlKGRvY3VtZW50LCBzZWxlY3Rvck9yRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmKCEkZWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5maW5kID0gKHNlbGVjdG9yKSA9PntcclxuICAgICAgICByZXR1cm4gTGEkKHJldHVybk5vZGUoJGVsZW1lbnQsIHNlbGVjdG9yKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY3NzID0gKG5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgaWYoJGVsZW1lbnQubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFkZENsYXNzID0gKG5hbWUpID0+e1xyXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWVzID0gJGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgaWYoY2xhc3NOYW1lcy5pbmRleE9mKG5hbWUpID09PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBuYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmVDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZiAoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lID0gJGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIG5hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmVBdHRyaWJ1dGUgPSAoYXR0ck5hbWUpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNob3cgPSAoKSA9PntcclxuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5oaWRlID0gKCkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hcHBlbmQgPSAoaHRtbENvZGUpID0+e1xyXG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCArPSBodG1sQ29kZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC50ZXh0ID0gKHRleHQpID0+IHsgLy9JRTgrXHJcbiAgICAgICAgaWYodGV4dCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LnRleHRDb250ZW50O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5oYXNDbGFzcyA9IChuYW1lKSA9PiB7IC8vSUU4K1xyXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBuYW1lICsgJyggfCQpJywgJ2dpJykudGVzdCgkZWxlbWVudC5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXMgPSAoJHRhcmdldEVsZW1lbnQpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQgPT09ICR0YXJnZXRFbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0Lm9mZnNldCA9ICgpID0+eyAgICAvL0lFOCtcclxuICAgICAgICB2YXIgcmVjdCA9ICRlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC53aWR0aCA9ICgpID0+IHsgICAgLy9JRTgrXHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmhlaWdodCA9ICgpID0+IHsgICAvL0lFOCtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmF0dHIgPSAoYXR0cikgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVwbGFjZSA9IChodG1sKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVwbGFjZVdpdGgoaHRtbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWwpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5hcHBlbmRDaGlsZChodG1sKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2hpbGQgPSAoKSA9PiB7XHJcbiAgICAgICAgd2hpbGUgKCRlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDaGlsZCgkZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jbG9zZXN0ID0gKHNlbGVjdG9yU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JTdHJpbmcpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhJDtcclxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMjQuLlxuICovXG5cbmNvbnN0IGxvZ2dlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBwcmV2Q29uc29sZUxvZyA9IG51bGw7XG5cbiAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogd2luZG93Wydjb25zb2xlJ11bJ2xvZyddfTtcblxuICAgIHRoYXQuZW5hYmxlID0gKCkgPT57XG4gICAgICAgIGlmKHByZXZDb25zb2xlTG9nID09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IHByZXZDb25zb2xlTG9nO1xuICAgIH07XG4gICAgdGhhdC5kaXNhYmxlID0gKCkgPT57XG4gICAgICAgIHByZXZDb25zb2xlTG9nID0gY29uc29sZS5sb2c7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IGZ1bmN0aW9uKCl7fTtcbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyOyIsImltcG9ydCBfIGZyb20gJy4vdW5kZXJzY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmltKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xufVxuXG4vKipcbiAqIGV4dHJhY3RFeHRlbnNpb25cbiAqXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSBwYXRoIGZvciB1cmxcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBFeHRlbnNpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHRlbnNpb24gPSBmdW5jdGlvbihwYXRoKSB7XG4gICAgaWYoIXBhdGggfHwgcGF0aC5zdWJzdHIoMCw0KT09J3J0bXAnKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCkge1xuICAgICAgICBsZXQgZXh0ZW5zaW9uID0gXCJcIjtcbiAgICAgICAgaWYgKCgvWygsXWZvcm1hdD1tcGQtL2kpLnRlc3QocGF0aCkpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtcGQnO1xuICAgICAgICB9ZWxzZSBpZiAoKC9bKCxdZm9ybWF0PW0zdTgtL2kpLnRlc3QocGF0aCkpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtM3U4JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uO1xuICAgIH1cblxuICAgIGxldCBhenVyZWRGb3JtYXQgPSBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCk7XG4gICAgaWYoYXp1cmVkRm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBhenVyZWRGb3JtYXQ7XG4gICAgfVxuICAgIHBhdGggPSBwYXRoLnNwbGl0KCc/JylbMF0uc3BsaXQoJyMnKVswXTtcbiAgICBpZihwYXRoLmxhc3RJbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLicpICsgMSwgcGF0aC5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbn07XG5cblxuLyoqXG4gKiBuYXR1cmFsSG1zXG4gKlxuICogQHBhcmFtICAgICAge251bWJlciB8IHN0cmluZ30gIHNlY29uZCAgVGhlIHNlY29uZFxuICogQHJldHVybiAgICAge3N0cmluZ30gIGZvcm1hdHRlZCBTdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5hdHVyYWxIbXMoc2Vjb25kKSB7XG4gICAgbGV0IHNlY051bSA9IHBhcnNlSW50KHNlY29uZCwgMTApO1xuICAgIGxldCBob3VycyAgID0gTWF0aC5mbG9vcihzZWNOdW0gLyAzNjAwKTtcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY051bSAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcbiAgICBsZXQgc2Vjb25kcyA9IHNlY051bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XG5cbiAgICBpZiAoaG91cnMgPiAwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxuICAgIGlmIChzZWNvbmRzIDwgMTApIHtzZWNvbmRzID0gXCIwXCIrc2Vjb25kczt9XG5cbiAgICBpZiAoaG91cnMgPiAwKSB7XG4gICAgICAgIHJldHVybiBob3VycysnOicrbWludXRlcysnOicrc2Vjb25kcztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWludXRlcysnOicrc2Vjb25kcztcbiAgICB9XG59IiwiLy8gICAgIFVuZGVyc2NvcmUuanMgMS45LjFcclxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXHJcbi8vICAgICAoYykgMjAwOS0yMDE4IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXHJcbi8vICAgICBVbmRlcnNjb3JlIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG4hZnVuY3Rpb24oKXt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZiYmc2VsZnx8XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbCYmZ2xvYmFsfHx0aGlzfHx7fSxyPW4uXyxlPUFycmF5LnByb3RvdHlwZSxvPU9iamVjdC5wcm90b3R5cGUscz1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sP1N5bWJvbC5wcm90b3R5cGU6bnVsbCx1PWUucHVzaCxjPWUuc2xpY2UscD1vLnRvU3RyaW5nLGk9by5oYXNPd25Qcm9wZXJ0eSx0PUFycmF5LmlzQXJyYXksYT1PYmplY3Qua2V5cyxsPU9iamVjdC5jcmVhdGUsZj1mdW5jdGlvbigpe30saD1mdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIGg/bjp0aGlzIGluc3RhbmNlb2YgaD92b2lkKHRoaXMuX3dyYXBwZWQ9bik6bmV3IGgobil9O1widW5kZWZpbmVkXCI9PXR5cGVvZiBleHBvcnRzfHxleHBvcnRzLm5vZGVUeXBlP24uXz1oOihcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUuZXhwb3J0cyYmKGV4cG9ydHM9bW9kdWxlLmV4cG9ydHM9aCksZXhwb3J0cy5fPWgpLGguVkVSU0lPTj1cIjEuOS4xXCI7dmFyIHYseT1mdW5jdGlvbih1LGksbil7aWYodm9pZCAwPT09aSlyZXR1cm4gdTtzd2l0Y2gobnVsbD09bj8zOm4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHUuY2FsbChpLG4pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gdS5jYWxsKGksbixyLHQpfTtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB1LmNhbGwoaSxuLHIsdCxlKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHUuYXBwbHkoaSxhcmd1bWVudHMpfX0sZD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguaXRlcmF0ZWUhPT12P2guaXRlcmF0ZWUobixyKTpudWxsPT1uP2guaWRlbnRpdHk6aC5pc0Z1bmN0aW9uKG4pP3kobixyLHQpOmguaXNPYmplY3QobikmJiFoLmlzQXJyYXkobik/aC5tYXRjaGVyKG4pOmgucHJvcGVydHkobil9O2guaXRlcmF0ZWU9dj1mdW5jdGlvbihuLHIpe3JldHVybiBkKG4sciwxLzApfTt2YXIgZz1mdW5jdGlvbih1LGkpe3JldHVybiBpPW51bGw9PWk/dS5sZW5ndGgtMToraSxmdW5jdGlvbigpe2Zvcih2YXIgbj1NYXRoLm1heChhcmd1bWVudHMubGVuZ3RoLWksMCkscj1BcnJheShuKSx0PTA7dDxuO3QrKylyW3RdPWFyZ3VtZW50c1t0K2ldO3N3aXRjaChpKXtjYXNlIDA6cmV0dXJuIHUuY2FsbCh0aGlzLHIpO2Nhc2UgMTpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLHIpO2Nhc2UgMjpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLGFyZ3VtZW50c1sxXSxyKX12YXIgZT1BcnJheShpKzEpO2Zvcih0PTA7dDxpO3QrKyllW3RdPWFyZ3VtZW50c1t0XTtyZXR1cm4gZVtpXT1yLHUuYXBwbHkodGhpcyxlKX19LG09ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJue307aWYobClyZXR1cm4gbChuKTtmLnByb3RvdHlwZT1uO3ZhciByPW5ldyBmO3JldHVybiBmLnByb3RvdHlwZT1udWxsLHJ9LGI9ZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP3ZvaWQgMDpuW3JdfX0saj1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsIT1uJiZpLmNhbGwobixyKX0seD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7aWYobnVsbD09bilyZXR1cm47bj1uW3JbZV1dfXJldHVybiB0P246dm9pZCAwfSxfPU1hdGgucG93KDIsNTMpLTEsQT1iKFwibGVuZ3RoXCIpLHc9ZnVuY3Rpb24obil7dmFyIHI9QShuKTtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgciYmMDw9ciYmcjw9X307aC5lYWNoPWguZm9yRWFjaD1mdW5jdGlvbihuLHIsdCl7dmFyIGUsdTtpZihyPXkocix0KSx3KG4pKWZvcihlPTAsdT1uLmxlbmd0aDtlPHU7ZSsrKXIobltlXSxlLG4pO2Vsc2V7dmFyIGk9aC5rZXlzKG4pO2ZvcihlPTAsdT1pLmxlbmd0aDtlPHU7ZSsrKXIobltpW2VdXSxpW2VdLG4pfXJldHVybiBufSxoLm1hcD1oLmNvbGxlY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPUFycmF5KHUpLG89MDtvPHU7bysrKXt2YXIgYT1lP2Vbb106bztpW29dPXIoblthXSxhLG4pfXJldHVybiBpfTt2YXIgTz1mdW5jdGlvbihjKXtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9Mzw9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9IXcobikmJmgua2V5cyhuKSxpPSh1fHxuKS5sZW5ndGgsbz0wPGM/MDppLTE7Zm9yKGV8fCh0PW5bdT91W29dOm9dLG8rPWMpOzA8PW8mJm88aTtvKz1jKXt2YXIgYT11P3Vbb106bzt0PXIodCxuW2FdLGEsbil9cmV0dXJuIHR9KG4seShyLGUsNCksdCx1KX19O2gucmVkdWNlPWguZm9sZGw9aC5pbmplY3Q9TygxKSxoLnJlZHVjZVJpZ2h0PWguZm9sZHI9TygtMSksaC5maW5kPWguZGV0ZWN0PWZ1bmN0aW9uKG4scix0KXt2YXIgZT0odyhuKT9oLmZpbmRJbmRleDpoLmZpbmRLZXkpKG4scix0KTtpZih2b2lkIDAhPT1lJiYtMSE9PWUpcmV0dXJuIG5bZV19LGguZmlsdGVyPWguc2VsZWN0PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT1bXTtyZXR1cm4gZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe2UobixyLHQpJiZ1LnB1c2gobil9KSx1fSxoLnJlamVjdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguZmlsdGVyKG4saC5uZWdhdGUoZChyKSksdCl9LGguZXZlcnk9aC5hbGw9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYoIXIobltvXSxvLG4pKXJldHVybiExfXJldHVybiEwfSxoLnNvbWU9aC5hbnk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYocihuW29dLG8sbikpcmV0dXJuITB9cmV0dXJuITF9LGguY29udGFpbnM9aC5pbmNsdWRlcz1oLmluY2x1ZGU9ZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSwoXCJudW1iZXJcIiE9dHlwZW9mIHR8fGUpJiYodD0wKSwwPD1oLmluZGV4T2YobixyLHQpfSxoLmludm9rZT1nKGZ1bmN0aW9uKG4sdCxlKXt2YXIgdSxpO3JldHVybiBoLmlzRnVuY3Rpb24odCk/aT10OmguaXNBcnJheSh0KSYmKHU9dC5zbGljZSgwLC0xKSx0PXRbdC5sZW5ndGgtMV0pLGgubWFwKG4sZnVuY3Rpb24obil7dmFyIHI9aTtpZighcil7aWYodSYmdS5sZW5ndGgmJihuPXgobix1KSksbnVsbD09bilyZXR1cm47cj1uW3RdfXJldHVybiBudWxsPT1yP3I6ci5hcHBseShuLGUpfSl9KSxoLnBsdWNrPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgubWFwKG4saC5wcm9wZXJ0eShyKSl9LGgud2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maWx0ZXIobixoLm1hdGNoZXIocikpfSxoLmZpbmRXaGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbmQobixoLm1hdGNoZXIocikpfSxoLm1heD1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPS0xLzAsbz0tMS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJmk8dCYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7dT1lKG4scix0KSwobzx1fHx1PT09LTEvMCYmaT09PS0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5taW49ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0xLzAsbz0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmdDxpJiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXsoKHU9ZShuLHIsdCkpPG98fHU9PT0xLzAmJmk9PT0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5zaHVmZmxlPWZ1bmN0aW9uKG4pe3JldHVybiBoLnNhbXBsZShuLDEvMCl9LGguc2FtcGxlPWZ1bmN0aW9uKG4scix0KXtpZihudWxsPT1yfHx0KXJldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksbltoLnJhbmRvbShuLmxlbmd0aC0xKV07dmFyIGU9dyhuKT9oLmNsb25lKG4pOmgudmFsdWVzKG4pLHU9QShlKTtyPU1hdGgubWF4KE1hdGgubWluKHIsdSksMCk7Zm9yKHZhciBpPXUtMSxvPTA7bzxyO28rKyl7dmFyIGE9aC5yYW5kb20obyxpKSxjPWVbb107ZVtvXT1lW2FdLGVbYV09Y31yZXR1cm4gZS5zbGljZSgwLHIpfSxoLnNvcnRCeT1mdW5jdGlvbihuLGUscil7dmFyIHU9MDtyZXR1cm4gZT1kKGUsciksaC5wbHVjayhoLm1hcChuLGZ1bmN0aW9uKG4scix0KXtyZXR1cm57dmFsdWU6bixpbmRleDp1KyssY3JpdGVyaWE6ZShuLHIsdCl9fSkuc29ydChmdW5jdGlvbihuLHIpe3ZhciB0PW4uY3JpdGVyaWEsZT1yLmNyaXRlcmlhO2lmKHQhPT1lKXtpZihlPHR8fHZvaWQgMD09PXQpcmV0dXJuIDE7aWYodDxlfHx2b2lkIDA9PT1lKXJldHVybi0xfXJldHVybiBuLmluZGV4LXIuaW5kZXh9KSxcInZhbHVlXCIpfTt2YXIgaz1mdW5jdGlvbihvLHIpe3JldHVybiBmdW5jdGlvbihlLHUsbil7dmFyIGk9cj9bW10sW11dOnt9O3JldHVybiB1PWQodSxuKSxoLmVhY2goZSxmdW5jdGlvbihuLHIpe3ZhciB0PXUobixyLGUpO28oaSxuLHQpfSksaX19O2guZ3JvdXBCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSksaC5pbmRleEJ5PWsoZnVuY3Rpb24obixyLHQpe25bdF09cn0pLGguY291bnRCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XSsrOm5bdF09MX0pO3ZhciBTPS9bXlxcdWQ4MDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkZmZmXS9nO2gudG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbj9oLmlzQXJyYXkobik/Yy5jYWxsKG4pOmguaXNTdHJpbmcobik/bi5tYXRjaChTKTp3KG4pP2gubWFwKG4saC5pZGVudGl0eSk6aC52YWx1ZXMobik6W119LGguc2l6ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj8wOncobik/bi5sZW5ndGg6aC5rZXlzKG4pLmxlbmd0aH0saC5wYXJ0aXRpb249ayhmdW5jdGlvbihuLHIsdCl7blt0PzA6MV0ucHVzaChyKX0sITApLGguZmlyc3Q9aC5oZWFkPWgudGFrZT1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uWzBdOmguaW5pdGlhbChuLG4ubGVuZ3RoLXIpfSxoLmluaXRpYWw9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobiwwLE1hdGgubWF4KDAsbi5sZW5ndGgtKG51bGw9PXJ8fHQ/MTpyKSkpfSxoLmxhc3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/bltuLmxlbmd0aC0xXTpoLnJlc3QobixNYXRoLm1heCgwLG4ubGVuZ3RoLXIpKX0saC5yZXN0PWgudGFpbD1oLmRyb3A9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobixudWxsPT1yfHx0PzE6cil9LGguY29tcGFjdD1mdW5jdGlvbihuKXtyZXR1cm4gaC5maWx0ZXIobixCb29sZWFuKX07dmFyIE09ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PShlPWV8fFtdKS5sZW5ndGgsaT0wLG89QShuKTtpPG87aSsrKXt2YXIgYT1uW2ldO2lmKHcoYSkmJihoLmlzQXJyYXkoYSl8fGguaXNBcmd1bWVudHMoYSkpKWlmKHIpZm9yKHZhciBjPTAsbD1hLmxlbmd0aDtjPGw7KWVbdSsrXT1hW2MrK107ZWxzZSBNKGEscix0LGUpLHU9ZS5sZW5ndGg7ZWxzZSB0fHwoZVt1KytdPWEpfXJldHVybiBlfTtoLmZsYXR0ZW49ZnVuY3Rpb24obixyKXtyZXR1cm4gTShuLHIsITEpfSxoLndpdGhvdXQ9ZyhmdW5jdGlvbihuLHIpe3JldHVybiBoLmRpZmZlcmVuY2UobixyKX0pLGgudW5pcT1oLnVuaXF1ZT1mdW5jdGlvbihuLHIsdCxlKXtoLmlzQm9vbGVhbihyKXx8KGU9dCx0PXIscj0hMSksbnVsbCE9dCYmKHQ9ZCh0LGUpKTtmb3IodmFyIHU9W10saT1bXSxvPTAsYT1BKG4pO288YTtvKyspe3ZhciBjPW5bb10sbD10P3QoYyxvLG4pOmM7ciYmIXQ/KG8mJmk9PT1sfHx1LnB1c2goYyksaT1sKTp0P2guY29udGFpbnMoaSxsKXx8KGkucHVzaChsKSx1LnB1c2goYykpOmguY29udGFpbnModSxjKXx8dS5wdXNoKGMpfXJldHVybiB1fSxoLnVuaW9uPWcoZnVuY3Rpb24obil7cmV0dXJuIGgudW5pcShNKG4sITAsITApKX0pLGguaW50ZXJzZWN0aW9uPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1bXSx0PWFyZ3VtZW50cy5sZW5ndGgsZT0wLHU9QShuKTtlPHU7ZSsrKXt2YXIgaT1uW2VdO2lmKCFoLmNvbnRhaW5zKHIsaSkpe3ZhciBvO2ZvcihvPTE7bzx0JiZoLmNvbnRhaW5zKGFyZ3VtZW50c1tvXSxpKTtvKyspO289PT10JiZyLnB1c2goaSl9fXJldHVybiByfSxoLmRpZmZlcmVuY2U9ZyhmdW5jdGlvbihuLHIpe3JldHVybiByPU0ociwhMCwhMCksaC5maWx0ZXIobixmdW5jdGlvbihuKXtyZXR1cm4haC5jb250YWlucyhyLG4pfSl9KSxoLnVuemlwPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1uJiZoLm1heChuLEEpLmxlbmd0aHx8MCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aC5wbHVjayhuLGUpO3JldHVybiB0fSxoLnppcD1nKGgudW56aXApLGgub2JqZWN0PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXt9LGU9MCx1PUEobik7ZTx1O2UrKylyP3RbbltlXV09cltlXTp0W25bZV1bMF1dPW5bZV1bMV07cmV0dXJuIHR9O3ZhciBGPWZ1bmN0aW9uKGkpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPUEobiksdT0wPGk/MDplLTE7MDw9dSYmdTxlO3UrPWkpaWYocihuW3VdLHUsbikpcmV0dXJuIHU7cmV0dXJuLTF9fTtoLmZpbmRJbmRleD1GKDEpLGguZmluZExhc3RJbmRleD1GKC0xKSxoLnNvcnRlZEluZGV4PWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0odD1kKHQsZSwxKSkociksaT0wLG89QShuKTtpPG87KXt2YXIgYT1NYXRoLmZsb29yKChpK28pLzIpO3QoblthXSk8dT9pPWErMTpvPWF9cmV0dXJuIGl9O3ZhciBFPWZ1bmN0aW9uKGksbyxhKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3ZhciBlPTAsdT1BKG4pO2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KTA8aT9lPTA8PXQ/dDpNYXRoLm1heCh0K3UsZSk6dT0wPD10P01hdGgubWluKHQrMSx1KTp0K3UrMTtlbHNlIGlmKGEmJnQmJnUpcmV0dXJuIG5bdD1hKG4scildPT09cj90Oi0xO2lmKHIhPXIpcmV0dXJuIDA8PSh0PW8oYy5jYWxsKG4sZSx1KSxoLmlzTmFOKSk/dCtlOi0xO2Zvcih0PTA8aT9lOnUtMTswPD10JiZ0PHU7dCs9aSlpZihuW3RdPT09cilyZXR1cm4gdDtyZXR1cm4tMX19O2guaW5kZXhPZj1FKDEsaC5maW5kSW5kZXgsaC5zb3J0ZWRJbmRleCksaC5sYXN0SW5kZXhPZj1FKC0xLGguZmluZExhc3RJbmRleCksaC5yYW5nZT1mdW5jdGlvbihuLHIsdCl7bnVsbD09ciYmKHI9bnx8MCxuPTApLHR8fCh0PXI8bj8tMToxKTtmb3IodmFyIGU9TWF0aC5tYXgoTWF0aC5jZWlsKChyLW4pL3QpLDApLHU9QXJyYXkoZSksaT0wO2k8ZTtpKyssbis9dCl1W2ldPW47cmV0dXJuIHV9LGguY2h1bms9ZnVuY3Rpb24obixyKXtpZihudWxsPT1yfHxyPDEpcmV0dXJuW107Zm9yKHZhciB0PVtdLGU9MCx1PW4ubGVuZ3RoO2U8dTspdC5wdXNoKGMuY2FsbChuLGUsZSs9cikpO3JldHVybiB0fTt2YXIgTj1mdW5jdGlvbihuLHIsdCxlLHUpe2lmKCEoZSBpbnN0YW5jZW9mIHIpKXJldHVybiBuLmFwcGx5KHQsdSk7dmFyIGk9bShuLnByb3RvdHlwZSksbz1uLmFwcGx5KGksdSk7cmV0dXJuIGguaXNPYmplY3Qobyk/bzppfTtoLmJpbmQ9ZyhmdW5jdGlvbihyLHQsZSl7aWYoIWguaXNGdW5jdGlvbihyKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uXCIpO3ZhciB1PWcoZnVuY3Rpb24obil7cmV0dXJuIE4ocix1LHQsdGhpcyxlLmNvbmNhdChuKSl9KTtyZXR1cm4gdX0pLGgucGFydGlhbD1nKGZ1bmN0aW9uKHUsaSl7dmFyIG89aC5wYXJ0aWFsLnBsYWNlaG9sZGVyLGE9ZnVuY3Rpb24oKXtmb3IodmFyIG49MCxyPWkubGVuZ3RoLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1pW2VdPT09bz9hcmd1bWVudHNbbisrXTppW2VdO2Zvcig7bjxhcmd1bWVudHMubGVuZ3RoOyl0LnB1c2goYXJndW1lbnRzW24rK10pO3JldHVybiBOKHUsYSx0aGlzLHRoaXMsdCl9O3JldHVybiBhfSksKGgucGFydGlhbC5wbGFjZWhvbGRlcj1oKS5iaW5kQWxsPWcoZnVuY3Rpb24obixyKXt2YXIgdD0ocj1NKHIsITEsITEpKS5sZW5ndGg7aWYodDwxKXRocm93IG5ldyBFcnJvcihcImJpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXNcIik7Zm9yKDt0LS07KXt2YXIgZT1yW3RdO25bZV09aC5iaW5kKG5bZV0sbil9fSksaC5tZW1vaXplPWZ1bmN0aW9uKGUsdSl7dmFyIGk9ZnVuY3Rpb24obil7dmFyIHI9aS5jYWNoZSx0PVwiXCIrKHU/dS5hcHBseSh0aGlzLGFyZ3VtZW50cyk6bik7cmV0dXJuIGoocix0KXx8KHJbdF09ZS5hcHBseSh0aGlzLGFyZ3VtZW50cykpLHJbdF19O3JldHVybiBpLmNhY2hlPXt9LGl9LGguZGVsYXk9ZyhmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gbi5hcHBseShudWxsLHQpfSxyKX0pLGguZGVmZXI9aC5wYXJ0aWFsKGguZGVsYXksaCwxKSxoLnRocm90dGxlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGEsYyxsPTA7dXx8KHU9e30pO3ZhciBmPWZ1bmN0aW9uKCl7bD0hMT09PXUubGVhZGluZz8wOmgubm93KCksaT1udWxsLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCl9LG49ZnVuY3Rpb24oKXt2YXIgbj1oLm5vdygpO2x8fCExIT09dS5sZWFkaW5nfHwobD1uKTt2YXIgcj1lLShuLWwpO3JldHVybiBvPXRoaXMsYT1hcmd1bWVudHMscjw9MHx8ZTxyPyhpJiYoY2xlYXJUaW1lb3V0KGkpLGk9bnVsbCksbD1uLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCkpOml8fCExPT09dS50cmFpbGluZ3x8KGk9c2V0VGltZW91dChmLHIpKSxjfTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksbD0wLGk9bz1hPW51bGx9LG59LGguZGVib3VuY2U9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYT1mdW5jdGlvbihuLHIpe2k9bnVsbCxyJiYobz10LmFwcGx5KG4scikpfSxuPWcoZnVuY3Rpb24obil7aWYoaSYmY2xlYXJUaW1lb3V0KGkpLHUpe3ZhciByPSFpO2k9c2V0VGltZW91dChhLGUpLHImJihvPXQuYXBwbHkodGhpcyxuKSl9ZWxzZSBpPWguZGVsYXkoYSxlLHRoaXMsbik7cmV0dXJuIG99KTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksaT1udWxsfSxufSxoLndyYXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5wYXJ0aWFsKHIsbil9LGgubmVnYXRlPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiFuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguY29tcG9zZT1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxlPXQubGVuZ3RoLTE7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPWUscj10W2VdLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtuLS07KXI9dFtuXS5jYWxsKHRoaXMscik7cmV0dXJuIHJ9fSxoLmFmdGVyPWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKCl7aWYoLS1uPDEpcmV0dXJuIHIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5iZWZvcmU9ZnVuY3Rpb24obixyKXt2YXIgdDtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gMDwtLW4mJih0PXIuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxuPD0xJiYocj1udWxsKSx0fX0saC5vbmNlPWgucGFydGlhbChoLmJlZm9yZSwyKSxoLnJlc3RBcmd1bWVudHM9Zzt2YXIgST0he3RvU3RyaW5nOm51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIiksVD1bXCJ2YWx1ZU9mXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJ0b1N0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImhhc093blByb3BlcnR5XCIsXCJ0b0xvY2FsZVN0cmluZ1wiXSxCPWZ1bmN0aW9uKG4scil7dmFyIHQ9VC5sZW5ndGgsZT1uLmNvbnN0cnVjdG9yLHU9aC5pc0Z1bmN0aW9uKGUpJiZlLnByb3RvdHlwZXx8byxpPVwiY29uc3RydWN0b3JcIjtmb3IoaihuLGkpJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSk7dC0tOykoaT1UW3RdKWluIG4mJm5baV0hPT11W2ldJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSl9O2gua2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTtpZihhKXJldHVybiBhKG4pO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWoobix0KSYmci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC5hbGxLZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKXIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGgudmFsdWVzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09bltyW3VdXTtyZXR1cm4gZX0saC5tYXBPYmplY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1oLmtleXMobiksdT1lLmxlbmd0aCxpPXt9LG89MDtvPHU7bysrKXt2YXIgYT1lW29dO2lbYV09cihuW2FdLGEsbil9cmV0dXJuIGl9LGgucGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1bclt1XSxuW3JbdV1dXTtyZXR1cm4gZX0saC5pbnZlcnQ9ZnVuY3Rpb24obil7Zm9yKHZhciByPXt9LHQ9aC5rZXlzKG4pLGU9MCx1PXQubGVuZ3RoO2U8dTtlKyspcltuW3RbZV1dXT10W2VdO3JldHVybiByfSxoLmZ1bmN0aW9ucz1oLm1ldGhvZHM9ZnVuY3Rpb24obil7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paC5pc0Z1bmN0aW9uKG5bdF0pJiZyLnB1c2godCk7cmV0dXJuIHIuc29ydCgpfTt2YXIgUj1mdW5jdGlvbihjLGwpe3JldHVybiBmdW5jdGlvbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO2lmKGwmJihuPU9iamVjdChuKSkscjwyfHxudWxsPT1uKXJldHVybiBuO2Zvcih2YXIgdD0xO3Q8cjt0KyspZm9yKHZhciBlPWFyZ3VtZW50c1t0XSx1PWMoZSksaT11Lmxlbmd0aCxvPTA7bzxpO28rKyl7dmFyIGE9dVtvXTtsJiZ2b2lkIDAhPT1uW2FdfHwoblthXT1lW2FdKX1yZXR1cm4gbn19O2guZXh0ZW5kPVIoaC5hbGxLZXlzKSxoLmV4dGVuZE93bj1oLmFzc2lnbj1SKGgua2V5cyksaC5maW5kS2V5PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGUsdT1oLmtleXMobiksaT0wLG89dS5sZW5ndGg7aTxvO2krKylpZihyKG5bZT11W2ldXSxlLG4pKXJldHVybiBlfTt2YXIgcSxLLHo9ZnVuY3Rpb24obixyLHQpe3JldHVybiByIGluIHR9O2gucGljaz1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9e30sZT1yWzBdO2lmKG51bGw9PW4pcmV0dXJuIHQ7aC5pc0Z1bmN0aW9uKGUpPygxPHIubGVuZ3RoJiYoZT15KGUsclsxXSkpLHI9aC5hbGxLZXlzKG4pKTooZT16LHI9TShyLCExLCExKSxuPU9iamVjdChuKSk7Zm9yKHZhciB1PTAsaT1yLmxlbmd0aDt1PGk7dSsrKXt2YXIgbz1yW3VdLGE9bltvXTtlKGEsbyxuKSYmKHRbb109YSl9cmV0dXJuIHR9KSxoLm9taXQ9ZyhmdW5jdGlvbihuLHQpe3ZhciByLGU9dFswXTtyZXR1cm4gaC5pc0Z1bmN0aW9uKGUpPyhlPWgubmVnYXRlKGUpLDE8dC5sZW5ndGgmJihyPXRbMV0pKToodD1oLm1hcChNKHQsITEsITEpLFN0cmluZyksZT1mdW5jdGlvbihuLHIpe3JldHVybiFoLmNvbnRhaW5zKHQscil9KSxoLnBpY2sobixlLHIpfSksaC5kZWZhdWx0cz1SKGguYWxsS2V5cywhMCksaC5jcmVhdGU9ZnVuY3Rpb24obixyKXt2YXIgdD1tKG4pO3JldHVybiByJiZoLmV4dGVuZE93bih0LHIpLHR9LGguY2xvbmU9ZnVuY3Rpb24obil7cmV0dXJuIGguaXNPYmplY3Qobik/aC5pc0FycmF5KG4pP24uc2xpY2UoKTpoLmV4dGVuZCh7fSxuKTpufSxoLnRhcD1mdW5jdGlvbihuLHIpe3JldHVybiByKG4pLG59LGguaXNNYXRjaD1mdW5jdGlvbihuLHIpe3ZhciB0PWgua2V5cyhyKSxlPXQubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKHZhciB1PU9iamVjdChuKSxpPTA7aTxlO2krKyl7dmFyIG89dFtpXTtpZihyW29dIT09dVtvXXx8IShvIGluIHUpKXJldHVybiExfXJldHVybiEwfSxxPWZ1bmN0aW9uKG4scix0LGUpe2lmKG49PT1yKXJldHVybiAwIT09bnx8MS9uPT0xL3I7aWYobnVsbD09bnx8bnVsbD09cilyZXR1cm4hMTtpZihuIT1uKXJldHVybiByIT1yO3ZhciB1PXR5cGVvZiBuO3JldHVybihcImZ1bmN0aW9uXCI9PT11fHxcIm9iamVjdFwiPT09dXx8XCJvYmplY3RcIj09dHlwZW9mIHIpJiZLKG4scix0LGUpfSxLPWZ1bmN0aW9uKG4scix0LGUpe24gaW5zdGFuY2VvZiBoJiYobj1uLl93cmFwcGVkKSxyIGluc3RhbmNlb2YgaCYmKHI9ci5fd3JhcHBlZCk7dmFyIHU9cC5jYWxsKG4pO2lmKHUhPT1wLmNhbGwocikpcmV0dXJuITE7c3dpdGNoKHUpe2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVyblwiXCIrbj09XCJcIityO2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybituIT0rbj8rciE9K3I6MD09K24/MS8rbj09MS9yOituPT0rcjtjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOnJldHVybituPT0rcjtjYXNlXCJbb2JqZWN0IFN5bWJvbF1cIjpyZXR1cm4gcy52YWx1ZU9mLmNhbGwobik9PT1zLnZhbHVlT2YuY2FsbChyKX12YXIgaT1cIltvYmplY3QgQXJyYXldXCI9PT11O2lmKCFpKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygbnx8XCJvYmplY3RcIiE9dHlwZW9mIHIpcmV0dXJuITE7dmFyIG89bi5jb25zdHJ1Y3RvcixhPXIuY29uc3RydWN0b3I7aWYobyE9PWEmJiEoaC5pc0Z1bmN0aW9uKG8pJiZvIGluc3RhbmNlb2YgbyYmaC5pc0Z1bmN0aW9uKGEpJiZhIGluc3RhbmNlb2YgYSkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHIpcmV0dXJuITF9ZT1lfHxbXTtmb3IodmFyIGM9KHQ9dHx8W10pLmxlbmd0aDtjLS07KWlmKHRbY109PT1uKXJldHVybiBlW2NdPT09cjtpZih0LnB1c2gobiksZS5wdXNoKHIpLGkpe2lmKChjPW4ubGVuZ3RoKSE9PXIubGVuZ3RoKXJldHVybiExO2Zvcig7Yy0tOylpZighcShuW2NdLHJbY10sdCxlKSlyZXR1cm4hMX1lbHNle3ZhciBsLGY9aC5rZXlzKG4pO2lmKGM9Zi5sZW5ndGgsaC5rZXlzKHIpLmxlbmd0aCE9PWMpcmV0dXJuITE7Zm9yKDtjLS07KWlmKGw9ZltjXSwhaihyLGwpfHwhcShuW2xdLHJbbF0sdCxlKSlyZXR1cm4hMX1yZXR1cm4gdC5wb3AoKSxlLnBvcCgpLCEwfSxoLmlzRXF1YWw9ZnVuY3Rpb24obixyKXtyZXR1cm4gcShuLHIpfSxoLmlzRW1wdHk9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW58fCh3KG4pJiYoaC5pc0FycmF5KG4pfHxoLmlzU3RyaW5nKG4pfHxoLmlzQXJndW1lbnRzKG4pKT8wPT09bi5sZW5ndGg6MD09PWgua2V5cyhuKS5sZW5ndGgpfSxoLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4hKCFufHwxIT09bi5ub2RlVHlwZSl9LGguaXNBcnJheT10fHxmdW5jdGlvbihuKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1wLmNhbGwobil9LGguaXNPYmplY3Q9ZnVuY3Rpb24obil7dmFyIHI9dHlwZW9mIG47cmV0dXJuXCJmdW5jdGlvblwiPT09cnx8XCJvYmplY3RcIj09PXImJiEhbn0saC5lYWNoKFtcIkFyZ3VtZW50c1wiLFwiRnVuY3Rpb25cIixcIlN0cmluZ1wiLFwiTnVtYmVyXCIsXCJEYXRlXCIsXCJSZWdFeHBcIixcIkVycm9yXCIsXCJTeW1ib2xcIixcIk1hcFwiLFwiV2Vha01hcFwiLFwiU2V0XCIsXCJXZWFrU2V0XCJdLGZ1bmN0aW9uKHIpe2hbXCJpc1wiK3JdPWZ1bmN0aW9uKG4pe3JldHVybiBwLmNhbGwobik9PT1cIltvYmplY3QgXCIrcitcIl1cIn19KSxoLmlzQXJndW1lbnRzKGFyZ3VtZW50cyl8fChoLmlzQXJndW1lbnRzPWZ1bmN0aW9uKG4pe3JldHVybiBqKG4sXCJjYWxsZWVcIil9KTt2YXIgRD1uLmRvY3VtZW50JiZuLmRvY3VtZW50LmNoaWxkTm9kZXM7XCJmdW5jdGlvblwiIT10eXBlb2YvLi8mJlwib2JqZWN0XCIhPXR5cGVvZiBJbnQ4QXJyYXkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIEQmJihoLmlzRnVuY3Rpb249ZnVuY3Rpb24obil7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbnx8ITF9KSxoLmlzRmluaXRlPWZ1bmN0aW9uKG4pe3JldHVybiFoLmlzU3ltYm9sKG4pJiZpc0Zpbml0ZShuKSYmIWlzTmFOKHBhcnNlRmxvYXQobikpfSxoLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTnVtYmVyKG4pJiZpc05hTihuKX0saC5pc0Jvb2xlYW49ZnVuY3Rpb24obil7cmV0dXJuITA9PT1ufHwhMT09PW58fFwiW29iamVjdCBCb29sZWFuXVwiPT09cC5jYWxsKG4pfSxoLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LGguaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIHZvaWQgMD09PW59LGguaGFzPWZ1bmN0aW9uKG4scil7aWYoIWguaXNBcnJheShyKSlyZXR1cm4gaihuLHIpO2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7dmFyIHU9cltlXTtpZihudWxsPT1ufHwhaS5jYWxsKG4sdSkpcmV0dXJuITE7bj1uW3VdfXJldHVybiEhdH0saC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4uXz1yLHRoaXN9LGguaWRlbnRpdHk9ZnVuY3Rpb24obil7cmV0dXJuIG59LGguY29uc3RhbnQ9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG59fSxoLm5vb3A9ZnVuY3Rpb24oKXt9LGgucHJvcGVydHk9ZnVuY3Rpb24ocil7cmV0dXJuIGguaXNBcnJheShyKT9mdW5jdGlvbihuKXtyZXR1cm4geChuLHIpfTpiKHIpfSxoLnByb3BlcnR5T2Y9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGw9PXI/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKG4pe3JldHVybiBoLmlzQXJyYXkobik/eChyLG4pOnJbbl19fSxoLm1hdGNoZXI9aC5tYXRjaGVzPWZ1bmN0aW9uKHIpe3JldHVybiByPWguZXh0ZW5kT3duKHt9LHIpLGZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTWF0Y2gobixyKX19LGgudGltZXM9ZnVuY3Rpb24obixyLHQpe3ZhciBlPUFycmF5KE1hdGgubWF4KDAsbikpO3I9eShyLHQsMSk7Zm9yKHZhciB1PTA7dTxuO3UrKyllW3VdPXIodSk7cmV0dXJuIGV9LGgucmFuZG9tPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGw9PXImJihyPW4sbj0wKSxuK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooci1uKzEpKX0saC5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9O3ZhciBMPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiN4Mjc7XCIsXCJgXCI6XCImI3g2MDtcIn0sUD1oLmludmVydChMKSxXPWZ1bmN0aW9uKHIpe3ZhciB0PWZ1bmN0aW9uKG4pe3JldHVybiByW25dfSxuPVwiKD86XCIraC5rZXlzKHIpLmpvaW4oXCJ8XCIpK1wiKVwiLGU9UmVnRXhwKG4pLHU9UmVnRXhwKG4sXCJnXCIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbj1udWxsPT1uP1wiXCI6XCJcIituLGUudGVzdChuKT9uLnJlcGxhY2UodSx0KTpufX07aC5lc2NhcGU9VyhMKSxoLnVuZXNjYXBlPVcoUCksaC5yZXN1bHQ9ZnVuY3Rpb24obixyLHQpe2guaXNBcnJheShyKXx8KHI9W3JdKTt2YXIgZT1yLmxlbmd0aDtpZighZSlyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP3QuY2FsbChuKTp0O2Zvcih2YXIgdT0wO3U8ZTt1Kyspe3ZhciBpPW51bGw9PW4/dm9pZCAwOm5bclt1XV07dm9pZCAwPT09aSYmKGk9dCx1PWUpLG49aC5pc0Z1bmN0aW9uKGkpP2kuY2FsbChuKTppfXJldHVybiBufTt2YXIgQz0wO2gudW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHI9KytDK1wiXCI7cmV0dXJuIG4/bityOnJ9LGgudGVtcGxhdGVTZXR0aW5ncz17ZXZhbHVhdGU6LzwlKFtcXHNcXFNdKz8pJT4vZyxpbnRlcnBvbGF0ZTovPCU9KFtcXHNcXFNdKz8pJT4vZyxlc2NhcGU6LzwlLShbXFxzXFxTXSs/KSU+L2d9O3ZhciBKPS8oLileLyxVPXtcIidcIjpcIidcIixcIlxcXFxcIjpcIlxcXFxcIixcIlxcclwiOlwiclwiLFwiXFxuXCI6XCJuXCIsXCJcXHUyMDI4XCI6XCJ1MjAyOFwiLFwiXFx1MjAyOVwiOlwidTIwMjlcIn0sVj0vXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2csJD1mdW5jdGlvbihuKXtyZXR1cm5cIlxcXFxcIitVW25dfTtoLnRlbXBsYXRlPWZ1bmN0aW9uKGksbixyKXshbiYmciYmKG49ciksbj1oLmRlZmF1bHRzKHt9LG4saC50ZW1wbGF0ZVNldHRpbmdzKTt2YXIgdCxlPVJlZ0V4cChbKG4uZXNjYXBlfHxKKS5zb3VyY2UsKG4uaW50ZXJwb2xhdGV8fEopLnNvdXJjZSwobi5ldmFsdWF0ZXx8Sikuc291cmNlXS5qb2luKFwifFwiKStcInwkXCIsXCJnXCIpLG89MCxhPVwiX19wKz0nXCI7aS5yZXBsYWNlKGUsZnVuY3Rpb24obixyLHQsZSx1KXtyZXR1cm4gYSs9aS5zbGljZShvLHUpLnJlcGxhY2UoViwkKSxvPXUrbi5sZW5ndGgscj9hKz1cIicrXFxuKChfX3Q9KFwiK3IrXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI6dD9hKz1cIicrXFxuKChfX3Q9KFwiK3QrXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjplJiYoYSs9XCInO1xcblwiK2UrXCJcXG5fX3ArPSdcIiksbn0pLGErPVwiJztcXG5cIixuLnZhcmlhYmxlfHwoYT1cIndpdGgob2JqfHx7fSl7XFxuXCIrYStcIn1cXG5cIiksYT1cInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIitcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIrYStcInJldHVybiBfX3A7XFxuXCI7dHJ5e3Q9bmV3IEZ1bmN0aW9uKG4udmFyaWFibGV8fFwib2JqXCIsXCJfXCIsYSl9Y2F0Y2gobil7dGhyb3cgbi5zb3VyY2U9YSxufXZhciB1PWZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwodGhpcyxuLGgpfSxjPW4udmFyaWFibGV8fFwib2JqXCI7cmV0dXJuIHUuc291cmNlPVwiZnVuY3Rpb24oXCIrYytcIil7XFxuXCIrYStcIn1cIix1fSxoLmNoYWluPWZ1bmN0aW9uKG4pe3ZhciByPWgobik7cmV0dXJuIHIuX2NoYWluPSEwLHJ9O3ZhciBHPWZ1bmN0aW9uKG4scil7cmV0dXJuIG4uX2NoYWluP2gocikuY2hhaW4oKTpyfTtoLm1peGluPWZ1bmN0aW9uKHQpe3JldHVybiBoLmVhY2goaC5mdW5jdGlvbnModCksZnVuY3Rpb24obil7dmFyIHI9aFtuXT10W25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49W3RoaXMuX3dyYXBwZWRdO3JldHVybiB1LmFwcGx5KG4sYXJndW1lbnRzKSxHKHRoaXMsci5hcHBseShoLG4pKX19KSxofSxoLm1peGluKGgpLGguZWFjaChbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJzcGxpY2VcIixcInVuc2hpZnRcIl0sZnVuY3Rpb24ocil7dmFyIHQ9ZVtyXTtoLnByb3RvdHlwZVtyXT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX3dyYXBwZWQ7cmV0dXJuIHQuYXBwbHkobixhcmd1bWVudHMpLFwic2hpZnRcIiE9PXImJlwic3BsaWNlXCIhPT1yfHwwIT09bi5sZW5ndGh8fGRlbGV0ZSBuWzBdLEcodGhpcyxuKX19KSxoLmVhY2goW1wiY29uY2F0XCIsXCJqb2luXCIsXCJzbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgcj1lW25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIEcodGhpcyxyLmFwcGx5KHRoaXMuX3dyYXBwZWQsYXJndW1lbnRzKSl9fSksaC5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcHBlZH0saC5wcm90b3R5cGUudmFsdWVPZj1oLnByb3RvdHlwZS50b0pTT049aC5wcm90b3R5cGUudmFsdWUsaC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gU3RyaW5nKHRoaXMuX3dyYXBwZWQpfSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShcInVuZGVyc2NvcmVcIixbXSxmdW5jdGlvbigpe3JldHVybiBofSl9KCk7XHJcbiIsImltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbn0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1J0bXAgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3J0bXA6JykgPT0gMCB8fCB0eXBlID09ICdydG1wJyk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc1dlYlJUQyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICBpZihmaWxlKXtcclxuICAgICAgICByZXR1cm4gKGZpbGUuaW5kZXhPZignd3M6JykgPT09IDAgfHwgZmlsZS5pbmRleE9mKCd3c3M6JykgPT09IDAgfHwgdHlwZSA9PT0gJ3dlYnJ0YycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgaXNEYXNoID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIHJldHVybiAoIHR5cGUgPT09ICdtcGQnIHx8ICB0eXBlID09PSAnZGFzaCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2Rhc2greG1sJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtcGQnKTtcclxufTtcclxuIiwiLyoqXG4gKiB1dGlscyBmb3Igd2VicGFja1xuICovXG5cbmV4cG9ydCBjb25zdCBnZXRTY3JpcHRQYXRoID0gZnVuY3Rpb24oc2NyaXB0TmFtZSkge1xuICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHNjcmlwdHNbaV0uc3JjO1xuICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHNyYy5sYXN0SW5kZXhPZignLycgKyBzY3JpcHROYW1lKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHIoMCwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjkuLlxuICovXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IF9fVkVSU0lPTl9fO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==