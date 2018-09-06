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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaUV4cGFuc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9Db25maWd1cmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvU3VwcG9ydENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wbGF5bGlzdC9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3NoaW1zL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9saWtlQSQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvc3RyaW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdW5kZXJzY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy93ZWJwYWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92ZXJzaW9uLmpzIl0sIm5hbWVzIjpbIkFwaSIsImNvbnRhaW5lciIsImxvZ01hbmFnZXIiLCJ0aGF0IiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ2ZXJzaW9uIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiaW5pdFByb3ZpZGVyIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImRlZmF1bHQiLCJnZXRRdWFsaXR5TGFiZWwiLCJsYWJlbCIsImxvYWRQcm92aWRlcnMiLCJnZXRQbGF5bGlzdCIsInRoZW4iLCJkZXN0cm95IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJQcm92aWRlcnMiLCJnZXROYW1lIiwiUFJPVklERVJfUlRNUCIsIm9uIiwibmFtZSIsImRhdGEiLCJ0cmlnZ2VyIiwiRVJST1IiLCJjb2RlIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJwYXJzZUludCIsIk5FVFdPUktfVU5TVEFCTEVEIiwiY3VycmVudFF1YWxpdHkiLCJnZXRDdXJyZW50UXVhbGl0eSIsImluZGV4IiwiZ2V0UXVhbGl0eUxldmVscyIsInBhdXNlIiwic2V0Q3VycmVudFF1YWxpdHkiLCJwcmVsb2FkIiwiZmx1c2giLCJSRUFEWSIsImNhdGNoIiwiZXJyb3IiLCJlcnJvck9iamVjdCIsIklOSVRfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImluaXQiLCJvcHRpb25zIiwiaXNEZWJ1ZyIsImRpc2FibGUiLCJzZXRQbGF5bGlzdCIsImdldENvbmZpZyIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJnZXRWb2x1bWUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInBsYXlsaXN0IiwicGxheSIsInNlZWsiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsInNldERlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJxdWFsaXR5SW5kZXgiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwiaXNTYW1lUHJvdmlkZXIiLCJyZXNRdWFsaXR5SW5kZXgiLCJnZXRCdWZmZXIiLCJnZXRTdGF0ZSIsInN0b3AiLCJyZW1vdmUiLCJERVNUUk9ZIiwib2ZmIiwiQXBpUnRtcEV4cGFuc2lvbiIsImV4dGVybmFsQ2FsbGJhY2tDcmVlcCIsInJlc3VsdCIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsIkNvbmZpZ3VyYXRvciIsImNvbXBvc2VTb3VyY2VPcHRpb25zIiwiRGVmYXVsdHMiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5YmFja1JhdGVzIiwibXV0ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2VyaWFsaXplIiwidmFsIiwidW5kZWZpbmVkIiwibG93ZXJjYXNlVmFsIiwidG9Mb3dlckNhc2UiLCJpc05hTiIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJkZXNlcmlhbGl6ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwibm9ybWFsaXplU2l6ZSIsInNsaWNlIiwiZXZhbHVhdGVBc3BlY3RSYXRpbyIsImFyIiwidG9TdHJpbmciLCJpbmRleE9mIiwidGVzdCIsInciLCJzdWJzdHIiLCJoIiwiY29uZmlnIiwiYXNwZWN0cmF0aW8iLCJyYXRlQ29udHJvbHMiLCJyYXRlcyIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsIl8iLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJwdXNoIiwic29ydCIsImNvbmZpZ1BsYXlsaXN0Iiwib2JqIiwicGljayIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJkZWJ1ZyIsImltYWdlIiwicXVhbGl0eUxhYmVsIiwicmVwZWF0Iiwic3RyZXRjaGluZyIsImdldEFzcGVjdHJhdGlvIiwic2V0QXNwZWN0cmF0aW8iLCJhc3BlY3RyYXRpb18iLCJnZXREZWZhdWx0UGxheWJhY2tSYXRlIiwic2V0UXVhbGl0eUxhYmVsIiwibmV3TGFiZWwiLCJnZXRQbGF5YmFja1JhdGVzIiwiaXNQbGF5YmFja1JhdGVDb250cm9scyIsInBsYXlsaXN0XyIsImlzUmVwZWF0IiwiZ2V0U3RyZXRjaGluZyIsIkV2ZW50RW1pdHRlciIsIm9iamVjdCIsIl9ldmVudHMiLCJ0cmlnZ2VyRXZlbnRzIiwiZXZlbnRzIiwiYXJncyIsImNvbnRleHQiLCJldmVudCIsImxpc3RlbmVyIiwiYXBwbHkiLCJjYWxsIiwiYXJndW1lbnRzIiwiYWxsRXZlbnRzIiwiYWxsIiwibmFtZXMiLCJsIiwicmV0YWluIiwiaiIsImsiLCJfY2FsbGJhY2siLCJvbmNlIiwiY291bnQiLCJvbmNlQ2FsbGJhY2siLCJfbGlzdGVuZXIiLCJMYXp5Q29tbWFuZEV4ZWN1dG9yIiwiaW5zdGFuY2UiLCJxdWV1ZWRDb21tYW5kcyIsImNvbW1hbmRRdWV1ZSIsInVuZGVjb3JhdGVkTWV0aG9kcyIsImV4ZWN1dGVNb2RlIiwiY29tbWFuZCIsIm1ldGhvZCIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwiY29tbWFuZF8iLCJjb21tYW5kUXVldWVJdGVtIiwiZmluZFdoZXJlIiwic3BsaWNlIiwiZmluZEluZGV4IiwiU3VwcG9ydENoZWNrZXIiLCJzdXBwb3J0TGlzdCIsImNoZWNrU3VwcG9ydCIsInNvdXJjZSIsIk1pbWVUeXBlcyIsImFhYyIsIm1wNCIsImY0diIsIm00diIsIm1vdiIsIm1wMyIsIm1wZWciLCJvZ3YiLCJvZ2ciLCJvZ2EiLCJ2b3JiaXMiLCJ3ZWJtIiwiZjRhIiwibTN1OCIsIm0zdSIsImhscyIsInZpZGVvIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2FuUGxheVR5cGUiLCJmaWxlIiwidHlwZSIsIm1pbWVUeXBlIiwiaXNIbHNTdXBwb3J0IiwiZ2V0TWVkaWFTb3VyY2UiLCJ3aW5kb3ciLCJNZWRpYVNvdXJjZSIsIldlYktpdE1lZGlhU291cmNlIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXIiLCJTb3VyY2VCdWZmZXIiLCJXZWJLaXRTb3VyY2VCdWZmZXIiLCJpc1R5cGVTdXBwb3J0ZWQiLCJzb3VyY2VCdWZmZXJWYWxpZEFQSSIsImFwcGVuZEJ1ZmZlciIsImZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSIsInNvcnVjZV8iLCJmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QiLCJzdXBwb3J0TmFtZXMiLCJpdGVtIiwic3VwcG9ydGVkIiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIlBST1ZJREVSX0RBU0giLCJQUk9WSURFUl9ITFMiLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIkNPTlRFTlRfU0VFS0VEIiwiUExBWUVSX1NUQVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfVElNRSIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfTEVWRUxTIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJQTEFZRVJfVU5LTldPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiTWFuYWdlciIsImN1cnJlbnRQbGF5bGlzdCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwicmVwbGFjZSIsInByZXR0aWVkUGxheWxpc3QiLCJ0cmFja3MiLCJwbGF5bGlzdEl0ZW0iLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwiY2FwdGlvbnMiLCJjb25jYXQiLCJ0cmFjayIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsInByb3ZpZGVyIiwiUHJvdmlkZXJMb2FkZXIiLCJodG1sNSIsInJlcXVpcmUiLCJlcnIiLCJFcnJvciIsIndlYnJ0YyIsImRhc2giLCJydG1wIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJwcm92aWRlck5hbWUiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsInByb21pc2VGaW5hbGx5IiwiY2FsbGJhY2siLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXRGdW5jIiwic2V0VGltZW91dCIsInNldEltbWVkaWF0ZUZ1bmMiLCJzZXRJbW1lZGlhdGUiLCJub29wIiwiYmluZCIsImZuIiwidGhpc0FyZyIsIlByb21pc2VTaGltIiwiVHlwZUVycm9yIiwiX3N0YXRlIiwiX2hhbmRsZWQiLCJfdmFsdWUiLCJfZGVmZXJyZWRzIiwiZG9SZXNvbHZlIiwiaGFuZGxlIiwic2VsZiIsImRlZmVycmVkIiwiX2ltbWVkaWF0ZUZuIiwiY2IiLCJvbkZ1bGZpbGxlZCIsIm9uUmVqZWN0ZWQiLCJwcm9taXNlIiwicmV0IiwiZSIsIm5ld1ZhbHVlIiwiZmluYWxlIiwiX3VuaGFuZGxlZFJlamVjdGlvbkZuIiwibGVuIiwiSGFuZGxlciIsImRvbmUiLCJleCIsInByb20iLCJhcnIiLCJyZW1haW5pbmciLCJyZXMiLCJyYWNlIiwidmFsdWVzIiwiY29uc29sZSIsIndhcm4iLCJyZXNvbHZlZCIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwiT3ZlblBsYXllclNESyIsInBsYXllckxpc3QiLCJjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQiLCJjb250YWluZXJFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub2RlVHlwZSIsImNyZWF0ZSIsInBsYXllckluc3RhbmNlIiwiZ2V0UGxheWVyTGlzdCIsImdldFBsYXllckJ5Q29udGFpbmVySWQiLCJjb250YWluZXJJZCIsIkxhJCIsImdldENvbnRhaW5lcklkIiwiZ2V0UGxheWVyQnlJbmRleCIsImdlbmVyYXRlV2VicnRjVXJscyIsInNlbGVjdG9yT3JFbGVtZW50IiwicmV0dXJuTm9kZSIsIiRlbGVtZW50Iiwic2VsZWN0b3IiLCJub2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsImlzRWxlbWVudCIsImZpbmQiLCJjc3MiLCJlbGVtZW50Iiwic3R5bGUiLCJhZGRDbGFzcyIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZXMiLCJjbGFzc05hbWUiLCJzcGxpdCIsInJlbW92ZUNsYXNzIiwiUmVnRXhwIiwiam9pbiIsInNob3ciLCJkaXNwbGF5IiwiaGlkZSIsImFwcGVuZCIsImh0bWxDb2RlIiwiaW5uZXJIVE1MIiwidGV4dCIsInRleHRDb250ZW50IiwiaGFzQ2xhc3MiLCJjb250YWlucyIsImlzIiwiJHRhcmdldEVsZW1lbnQiLCJvZmZzZXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwiYm9keSIsInNjcm9sbFRvcCIsImxlZnQiLCJzY3JvbGxMZWZ0IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJhdHRyIiwiZ2V0QXR0cmlidXRlIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiaHRtbCIsInJlcGxhY2VXaXRoIiwiYXBwZW5kQ2hpbGQiLCJnZXQiLCJjbG9zZXN0Iiwic2VsZWN0b3JTdHJpbmciLCJsb2dnZXIiLCJwcmV2Q29uc29sZUxvZyIsImVuYWJsZSIsInRyaW0iLCJuYXR1cmFsSG1zIiwic3RyaW5nIiwiZXh0cmFjdEV4dGVuc2lvbiIsInBhdGgiLCJnZXRBenVyZUZpbGVGb3JtYXQiLCJleHRlbnNpb24iLCJhenVyZWRGb3JtYXQiLCJsYXN0SW5kZXhPZiIsInNlY29uZCIsInNlY051bSIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsIm4iLCJnbG9iYWwiLCJyIiwibyIsInMiLCJTeW1ib2wiLCJ1IiwiYyIsInAiLCJoYXNPd25Qcm9wZXJ0eSIsInQiLCJhIiwiZiIsIl93cmFwcGVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIlZFUlNJT04iLCJ2IiwieSIsImQiLCJpdGVyYXRlZSIsImlkZW50aXR5IiwiaXNGdW5jdGlvbiIsImlzT2JqZWN0IiwibWF0Y2hlciIsInByb3BlcnR5IiwiZyIsIm1heCIsIm0iLCJiIiwieCIsInBvdyIsIkEiLCJlYWNoIiwiY29sbGVjdCIsIk8iLCJyZWR1Y2UiLCJmb2xkbCIsImluamVjdCIsInJlZHVjZVJpZ2h0IiwiZm9sZHIiLCJkZXRlY3QiLCJmaW5kS2V5Iiwic2VsZWN0IiwibmVnYXRlIiwic29tZSIsImFueSIsImluY2x1ZGVzIiwiaW5jbHVkZSIsImludm9rZSIsInBsdWNrIiwid2hlcmUiLCJtaW4iLCJzaHVmZmxlIiwic2FtcGxlIiwicmFuZG9tIiwiY2xvbmUiLCJzb3J0QnkiLCJjcml0ZXJpYSIsImdyb3VwQnkiLCJpbmRleEJ5IiwiY291bnRCeSIsIlMiLCJ0b0FycmF5IiwiaXNTdHJpbmciLCJtYXRjaCIsInNpemUiLCJwYXJ0aXRpb24iLCJmaXJzdCIsImhlYWQiLCJ0YWtlIiwiaW5pdGlhbCIsImxhc3QiLCJyZXN0IiwidGFpbCIsImRyb3AiLCJjb21wYWN0IiwiQm9vbGVhbiIsIk0iLCJpc0FyZ3VtZW50cyIsImZsYXR0ZW4iLCJ3aXRob3V0IiwiZGlmZmVyZW5jZSIsInVuaXEiLCJ1bmlxdWUiLCJpc0Jvb2xlYW4iLCJ1bmlvbiIsImludGVyc2VjdGlvbiIsInVuemlwIiwiemlwIiwiRiIsImZpbmRMYXN0SW5kZXgiLCJzb3J0ZWRJbmRleCIsIkUiLCJyYW5nZSIsImNlaWwiLCJjaHVuayIsIk4iLCJwYXJ0aWFsIiwicGxhY2Vob2xkZXIiLCJiaW5kQWxsIiwibWVtb2l6ZSIsImNhY2hlIiwiZGVsYXkiLCJkZWZlciIsInRocm90dGxlIiwibGVhZGluZyIsIm5vdyIsImNsZWFyVGltZW91dCIsInRyYWlsaW5nIiwiY2FuY2VsIiwiZGVib3VuY2UiLCJ3cmFwIiwiY29tcG9zZSIsImFmdGVyIiwiYmVmb3JlIiwicmVzdEFyZ3VtZW50cyIsIkkiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIlQiLCJCIiwiYWxsS2V5cyIsIm1hcE9iamVjdCIsInBhaXJzIiwiaW52ZXJ0IiwiZnVuY3Rpb25zIiwibWV0aG9kcyIsIlIiLCJleHRlbmQiLCJleHRlbmRPd24iLCJhc3NpZ24iLCJxIiwiSyIsInoiLCJvbWl0IiwiU3RyaW5nIiwiZGVmYXVsdHMiLCJ0YXAiLCJpc01hdGNoIiwidmFsdWVPZiIsInBvcCIsImlzRXF1YWwiLCJpc0VtcHR5IiwiRCIsImNoaWxkTm9kZXMiLCJJbnQ4QXJyYXkiLCJpc0Zpbml0ZSIsImlzU3ltYm9sIiwiaXNOdWxsIiwiaXNVbmRlZmluZWQiLCJoYXMiLCJub0NvbmZsaWN0IiwiY29uc3RhbnQiLCJwcm9wZXJ0eU9mIiwibWF0Y2hlcyIsInRpbWVzIiwiRGF0ZSIsImdldFRpbWUiLCJMIiwiUCIsIlciLCJlc2NhcGUiLCJ1bmVzY2FwZSIsIkMiLCJ1bmlxdWVJZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwiSiIsIlUiLCJWIiwiJCIsInRlbXBsYXRlIiwidmFyaWFibGUiLCJGdW5jdGlvbiIsImNoYWluIiwiX2NoYWluIiwiRyIsIm1peGluIiwidG9KU09OIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0Rhc2giLCJnZXRTY3JpcHRQYXRoIiwic2NyaXB0TmFtZSIsInNjcmlwdHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInNyYyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBLGlEQUF5QyxrakJBQWtqQjtBQUMzbEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBLHlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0EsYUFBSztB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VEEsTUFBUyxDQUFVbmEsSUFBVixFQUFnQkMsSUFBaEIsRUFBc0I7QUFDeEMsV0FBU0EsU0FBUyxLQUFULElBQW1CQSxTQUFTLE1BQTVCLElBQXNDQSxTQUFTLHNCQUEvQyxJQUF5RSwrQkFBaUJELElBQWpCLEtBQTBCLEtBQTVHO0FBQ0gsQ0FGTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1hQOzs7O0FBSU8sSUFBTW9hLHdDQUFnQixTQUFoQkEsYUFBZ0IsQ0FBU0MsVUFBVCxFQUFxQjtBQUM5QyxRQUFNQyxVQUFVemEsU0FBUzBhLG9CQUFULENBQThCLFFBQTlCLENBQWhCO0FBQ0EsU0FBSyxJQUFJL25CLElBQUksQ0FBYixFQUFnQkEsSUFBSThuQixRQUFRN25CLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QztBQUNyQyxZQUFNZ29CLE1BQU1GLFFBQVE5bkIsQ0FBUixFQUFXZ29CLEdBQXZCO0FBQ0EsWUFBSUEsR0FBSixFQUFTO0FBQ0wsZ0JBQU12bUIsUUFBUXVtQixJQUFJbE0sV0FBSixDQUFnQixNQUFNK0wsVUFBdEIsQ0FBZDtBQUNBLGdCQUFJcG1CLFNBQVMsQ0FBYixFQUFnQjtBQUNaLHVCQUFPdW1CLElBQUlyaEIsTUFBSixDQUFXLENBQVgsRUFBY2xGLFFBQVEsQ0FBdEIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU8sRUFBUDtBQUNILENBWk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKUDs7O0FBR08sSUFBTXBDLDRCQUFVLGtCQUFoQixDIiwiZmlsZSI6Im92ZW5wbGF5ZXIuc2RrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJvdmVucGxheWVyLnNka1wiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe1wib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZlwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZlwiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1XCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1XCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknKTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzXCIpO1xuIiwiLyogZ2xvYmFscyBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXyAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19hbWRfb3B0aW9uc19fO1xyXG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiLy9pbXBvcnQgQ2FwdGlvbk1hbmFnZXIgZnJvbSBcImFwaS9jYXB0aW9uL01hbmFnZXJcIjtcclxuaW1wb3J0IENvbmZpZ3VyYXRvciBmcm9tIFwiYXBpL0NvbmZpZ3VyYXRvclwiO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCBMYXp5Q29tbWFuZEV4ZWN1dG9yIGZyb20gXCJhcGkvTGF6eUNvbW1hbmRFeGVjdXRvclwiO1xyXG5pbXBvcnQgTG9nTWFuYWdlciBmcm9tIFwidXRpbHMvbG9nZ2VyXCI7XHJcbmltcG9ydCBQbGF5bGlzdE1hbmFnZXIgZnJvbSBcImFwaS9wbGF5bGlzdC9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlckNvbnRyb2xsZXIgZnJvbSBcImFwaS9wcm92aWRlci9Db250cm9sbGVyXCI7XHJcbmltcG9ydCBQcm9taXNlLCB7cmVzb2x2ZWR9IGZyb20gXCJhcGkvc2hpbXMvcHJvbWlzZVwiO1xyXG5pbXBvcnQge1JFQURZLCBFUlJPUiwgSU5JVF9FUlJPUiwgREVTVFJPWSwgTkVUV09SS19VTlNUQUJMRUQsIFBMQVlFUl9GSUxFX0VSUk9SLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAndmVyc2lvbic7XHJcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgb2JqZWN0IGNvbm5lY3RzIFVJIHRvIHRoZSBwcm92aWRlci5cclxuICogQHBhcmFtICAge29iamVjdH0gICAgY29udGFpbmVyICBkb20gZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuY29uc3QgQXBpID0gZnVuY3Rpb24oY29udGFpbmVyKXtcclxuICAgIGxldCBsb2dNYW5hZ2VyID0gTG9nTWFuYWdlcigpO1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltbT3ZlblBsYXllcl1dIHYuXCIrIHZlcnNpb24pO1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIGxvYWRlZC5cIik7XHJcbiAgICAvL2xldCBjYXB0aW9uTWFuYWdlciA9IENhcHRpb25NYW5hZ2VyKHRoYXQpO1xyXG4gICBcclxuICAgIGxldCBwbGF5bGlzdE1hbmFnZXIgPSBQbGF5bGlzdE1hbmFnZXIoKTtcclxuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcclxuICAgIGxldCBjdXJyZW50UHJvdmlkZXIgPSBcIlwiO1xyXG4gICAgbGV0IHBsYXllckNvbmZpZyA9IFwiXCI7XHJcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcclxuXHJcbiAgICBjb25zdCBpbml0UHJvdmlkZXIgPSBmdW5jdGlvbihsYXN0UGxheVBvc2l0aW9uKXtcclxuICAgICAgICBjb25zdCBwaWNrUXVhbGl0eUZyb21Tb3VyY2UgPSAoc291cmNlcykgPT57XHJcbiAgICAgICAgICAgIHZhciBxdWFsaXR5ID0gMDtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpKS50aGVuKFByb3ZpZGVycyA9PiB7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tRdWFsaXR5RnJvbVNvdXJjZShwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyggXCJjdXJyZW50IHNvdXJjZSBpbmRleCA6IFwiKyBjdXJyZW50U291cmNlSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy9DYWxsIFByb3ZpZGVyLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XShjb250YWluZXIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpID09PSBQUk9WSURFUl9SVE1QKXtcclxuICAgICAgICAgICAgICAgIC8vSWYgcHJvdmlkZXIgdHlwZSBpcyBSVE1QLCB3ZSBhY2NlcHRzIFJ0bXBFeHBhbnNpb24uXHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoYXQsIEFwaVJ0bXBFeHBhbnNpb24oY3VycmVudFByb3ZpZGVyKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vVGhpcyBwYXNzZXMgdGhlIGV2ZW50IGNyZWF0ZWQgYnkgdGhlIFByb3ZpZGVyIHRvIEFQSS5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLm9uKFwiYWxsXCIsIGZ1bmN0aW9uKG5hbWUsIGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vQXV0byBuZXh0IHNvdXJjZSB3aGVuIHBsYXllciBsb2FkIHdhcyBmYWlsIGJ5IGFtaXNzIHNvdXJjZS5cclxuICAgICAgICAgICAgICAgIGlmKCAobmFtZSA9PT0gRVJST1IgJiYgKGRhdGEuY29kZSA9PT0gUExBWUVSX0ZJTEVfRVJST1IgfHwgcGFyc2VJbnQoZGF0YS5jb2RlLzEwMCkgPT09IDUpKXx8IG5hbWUgPT09IE5FVFdPUktfVU5TVEFCTEVEICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRRdWFsaXR5ID0gdGhhdC5nZXRDdXJyZW50UXVhbGl0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRRdWFsaXR5LmluZGV4KzEgPCB0aGF0LmdldFF1YWxpdHlMZXZlbHMoKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMgc2VxdWVudGlhbCBoYXMgYXZhaWxhYmxlIHNvdXJjZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXVzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eShjdXJyZW50UXVhbGl0eS5pbmRleCsxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KS50aGVuKCgpPT57XHJcblxyXG4gICAgICAgICAgICAvL3Byb3ZpZGVyJ3MgcHJlbG9hZCgpIGhhdmUgdG8gbWFkZSBQcm9taXNlLiBDdXogaXQgb3ZlcmNvbWVzICdmbGFzaCBsb2FkaW5nIHRpbWluZyBwcm9ibGVtJy5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnByZWxvYWQocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCksIGxhc3RQbGF5UG9zaXRpb24gKS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZmx1c2goKTtcclxuICAgICAgICAgICAgICAgIC8vVGhpcyBpcyBubyByZWFzb24gdG8gZXhpc3QgYW55bW9yZS5cclxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFJFQURZKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yT2JqZWN0ID0ge2NvZGUgOiBJTklUX0VSUk9SLCByZWFzb24gOiBcImluaXQgZXJyb3IuXCIsIG1lc3NhZ2UgOiBcIlBsYXllciBpbml0IGVycm9yLlwiLCBlcnJvciA6IGVycm9yfTtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBlcnJvck9iamVjdCk7XHJcblxyXG4gICAgICAgICAgICAvL3h4eCA6IElmIHlvdSBpbml0IGVtcHR5IHNvdXJjZXMuIChJIHRoaW5rIHRoaXMgaXMgc3RyYW5nZSBjYXNlLilcclxuICAgICAgICAgICAgLy9UaGlzIHdvcmtzIGZvciB0aGlzIGNhc2UuXHJcbiAgICAgICAgICAgIC8vcGxheWVyID0gT3ZlblBsYXllci5jcmVhdGUoXCJlbElkXCIsIHt9KTtcclxuICAgICAgICAgICAgLy9wbGF5ZXIubG9hZChzb3J1Y2VzKTtcclxuICAgICAgICAgICAgbGF6eVF1ZXVlLnJlbW92ZUFuZEV4Y3V0ZU9uY2UoXCJsb2FkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBUEkg7LSI6riw7ZmUIO2VqOyImFxyXG4gICAgICogaW5pdFxyXG4gICAgICogQHBhcmFtICAgICAge29iamVjdH0gb3B0aW9ucyBwbGF5ZXIgaW5pdGlhbCBvcHRpb24gdmFsdWUuXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICoqL1xyXG4gICAgdGhhdC5pbml0ID0gKG9wdGlvbnMpID0+e1xyXG4gICAgICAgIC8vSXQgY29sbGVjdHMgdGhlIGNvbW1hbmRzIGFuZCBleGVjdXRlcyB0aGVtIGF0IHRoZSB0aW1lIHdoZW4gdGhleSBhcmUgZXhlY3V0YWJsZS5cclxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsnbG9hZCcsJ3BsYXknLCdwYXVzZScsJ3NlZWsnLCdzdG9wJywgJ2dldER1cmF0aW9uJywgJ2dldFBvc2l0aW9uJywgJ2dldFZvbHVtZScsICdnZXRNdXRlJywgJ2dldEJ1ZmZlcicsICdnZXRTdGF0ZSddKTtcclxuICAgICAgICBwbGF5ZXJDb25maWcgPSBDb25maWd1cmF0b3Iob3B0aW9ucyk7XHJcbiAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0RlYnVnKCkpe1xyXG4gICAgICAgICAgICBsb2dNYW5hZ2VyLmRpc2FibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpXCIpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBjb25maWcgOiBcIiwgcGxheWVyQ29uZmlnKTtcclxuXHJcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldFBsYXlsaXN0KHBsYXllckNvbmZpZy5nZXRQbGF5bGlzdCgpKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgc291cmNlcyA6IFwiICwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xyXG4gICAgICAgIGluaXRQcm92aWRlcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKnRoYXQuZ2V0Q29udGFpbmVySWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyLmlkO1xyXG4gICAgfTsqL1xyXG5cclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENvbmZpZygpXCIsIHBsYXllckNvbmZpZy5nZXRDb25maWcoKSk7XHJcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRDb25maWcoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldER1cmF0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UG9zaXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Vm9sdW1lKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Vm9sdW1lKCkgXCIgKyB2b2x1bWUpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRWb2x1bWUodm9sdW1lKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldE11dGUoKSBcIiArIHN0YXRlKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldE11dGUoc3RhdGUpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldE11dGUoKSBcIiArIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQubG9hZCA9IChwbGF5bGlzdCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGxvYWQoKSBcIiwgcGxheWxpc3QpO1xyXG4gICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlaycsJ3N0b3AnXSk7XHJcblxyXG4gICAgICAgIGlmKHBsYXlsaXN0KXtcclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eSgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0UGxheWxpc3QocGxheWxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5pdFByb3ZpZGVyKCk7XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQucGxheSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwbGF5KCkgXCIpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wbGF5KCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBhdXNlKCkgXCIpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wYXVzZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNlZWsoKSBcIisgcG9zaXRpb24pO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZWVrKHBvc2l0aW9uKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFBsYXliYWNrUmF0ZSgpIFwiLCBwbGF5YmFja1JhdGUpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0UGxheWJhY2tSYXRlKHBsYXllckNvbmZpZy5zZXREZWZhdWx0UGxheWJhY2tSYXRlKHBsYXliYWNrUmF0ZSkpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWJhY2tSYXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRRdWFsaXR5TGV2ZWxzKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBxdWFsaXR5SW5kZXgpO1xyXG5cclxuICAgICAgICBsZXQgc291cmNlcyA9IHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpO1xyXG4gICAgICAgIGxldCBjdXJyZW50U291cmNlID0gc291cmNlc1t0aGF0LmdldEN1cnJlbnRRdWFsaXR5KCkuaW5kZXhdO1xyXG4gICAgICAgIGxldCBuZXdTb3VyY2UgPSBzb3VyY2VzW3F1YWxpdHlJbmRleF07XHJcbiAgICAgICAgbGV0IGxhc3RQbGF5UG9zaXRpb24gPSB0aGF0LmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IGlzU2FtZVByb3ZpZGVyID0gcHJvdmlkZXJDb250cm9sbGVyLmlzU2FtZVByb3ZpZGVyKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSk7XHJcbiAgICAgICAgLy8gcHJvdmlkZXIuc2VyQ3VycmVudFF1YWxpdHkgLT4gcGxheWVyQ29uZmlnIHNldHRpbmcgLT4gbG9hZFxyXG4gICAgICAgIGxldCByZXNRdWFsaXR5SW5kZXggPSBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkocXVhbGl0eUluZGV4LCBpc1NhbWVQcm92aWRlcik7XHJcblxyXG4gICAgICAgIGlmKCFuZXdTb3VyY2Upe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgaXNTYW1lUHJvdmlkZXJcIiwgaXNTYW1lUHJvdmlkZXIpO1xyXG5cclxuICAgICAgICBpZighaXNTYW1lUHJvdmlkZXIpe1xyXG4gICAgICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheSddKTtcclxuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc1F1YWxpdHlJbmRleDtcclxuICAgIH07XHJcblxyXG4gICAgLyogQ2FwdGlvbnMgOiBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgdmVyc2lvbi4qL1xyXG4gICAgLyp0aGF0LnNldEN1cnJlbnRDYXB0aW9uID0gKGluZGV4KSA9PntcclxuICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuc2V0Q3VycmVudENhcHRpb24oaW5kZXgpO1xyXG4gICAgIH1cclxuICAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT57XHJcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCk7XHJcbiAgICAgfVxyXG4gICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XHJcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XHJcbiAgICAgfVxyXG4gICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT4ge1xyXG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5hZGRDYXB0aW9uKCk7XHJcbiAgICAgfVxyXG4gICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XHJcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XHJcbiAgICAgfSovXHJcblxyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0QnVmZmVyKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKSk7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTdGF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc3RvcCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzdG9wKCkgXCIpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zdG9wKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgXCIpO1xyXG4gICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xyXG4gICAgICAgIHByb3ZpZGVyQ29udHJvbGxlciA9IG51bGw7XHJcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBwbGF5ZXJDb25maWcgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGF0LnRyaWdnZXIoREVTVFJPWSk7XHJcbiAgICAgICAgdGhhdC5vZmYoKTtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgLSBsYXp5UXVldWUsIGN1cnJlbnRQcm92aWRlciwgcHJvdmlkZXJDb250cm9sbGVyLCBwbGF5bGlzdE1hbmFnZXIsIHBsYXllckNvbmZpZywgYXBpIGV2ZW50IGRlc3Ryb2VkLiBcIik7XHJcbiAgICAgICAgbG9nTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwaTtcclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgQXBpUnRtcEV4cGFuc2lvbiA9IGZ1bmN0aW9uKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGV4dGVybmFsQ2FsbGJhY2tDcmVlcCA6IChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgaWYocmVzdWx0Lm5hbWUgJiYgcmVzdWx0LmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci50cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwocmVzdWx0Lm5hbWUsIHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBpbml0aWFsaXplcyB0aGUgaW5wdXQgb3B0aW9ucy5cclxuICogQHBhcmFtICAgb3B0aW9uc1xyXG4gKlxyXG4gKiAqL1xyXG5jb25zdCBDb25maWd1cmF0b3IgPSBmdW5jdGlvbihvcHRpb25zKXtcclxuXHJcbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBkZWZhdWx0UGxheWJhY2tSYXRlOiAxLFxyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVDb250cm9sczogZmFsc2UsXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFswLjI1LCAwLjUsIDEsIDEuNSwgMl0sXHJcbiAgICAgICAgICAgIG11dGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2b2x1bWU6IDkwLFxyXG4gICAgICAgICAgICB3aWR0aDogNjQwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDM2MFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJjYXNlVmFsID0gdmFsLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIodmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2lkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHNlcmlhbGl6ZShvcHRpb25zW2tleV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplU2l6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbC5zbGljZSAmJiB2YWwuc2xpY2UoLTIpID09PSAncHgnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWwuc2xpY2UoMCwgLTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGV2YWx1YXRlQXNwZWN0UmF0aW8gPSBmdW5jdGlvbiAoYXIsIHdpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aWR0aC50b1N0cmluZygpLmluZGV4T2YoJyUnKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXIgIT09ICdzdHJpbmcnIHx8ICFhcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKC9eXFxkKlxcLj9cXGQrJSQvLnRlc3QoYXIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhci5pbmRleE9mKCc6Jyk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHcgPSBwYXJzZUZsb2F0KGFyLnN1YnN0cigwLCBpbmRleCkpO1xyXG4gICAgICAgICAgICBjb25zdCBoID0gcGFyc2VGbG9hdChhci5zdWJzdHIoaW5kZXggKyAxKSk7XHJcbiAgICAgICAgICAgIGlmICh3IDw9IDAgfHwgaCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKGggLyB3ICogMTAwKSArICclJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVzZXJpYWxpemUob3B0aW9ucyk7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgICAgICBjb25maWcud2lkdGggPSBub3JtYWxpemVTaXplKGNvbmZpZy53aWR0aCk7XHJcbiAgICAgICAgY29uZmlnLmhlaWdodCA9IG5vcm1hbGl6ZVNpemUoY29uZmlnLmhlaWdodCk7XHJcbiAgICAgICAgY29uZmlnLmFzcGVjdHJhdGlvID0gZXZhbHVhdGVBc3BlY3RSYXRpbyhjb25maWcuYXNwZWN0cmF0aW8sIGNvbmZpZy53aWR0aCk7XHJcblxyXG4gICAgICAgIGxldCByYXRlQ29udHJvbHMgPSBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHM7XHJcbiAgICAgICAgaWYgKHJhdGVDb250cm9scykge1xyXG4gICAgICAgICAgICBsZXQgcmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcztcclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhdGVDb250cm9scykpIHtcclxuICAgICAgICAgICAgICAgIHJhdGVzID0gcmF0ZUNvbnRyb2xzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJhdGVzID0gcmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KVxyXG4gICAgICAgICAgICAgICAgLm1hcChyYXRlID0+IE1hdGgucm91bmQocmF0ZSAqIDQpIC8gNCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmF0ZXMuaW5kZXhPZigxKSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJhdGVzLnB1c2goMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmF0ZXMuc29ydCgpO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSByYXRlcztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyB8fCBjb25maWcucGxheWJhY2tSYXRlcy5pbmRleE9mKGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlKSA8IDApIHtcclxuICAgICAgICAgICAgY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZSA9IGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlO1xyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5hc3BlY3RyYXRpbykge1xyXG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLmFzcGVjdHJhdGlvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29uZmlnUGxheWxpc3QgPSBjb25maWcucGxheWxpc3Q7XHJcbiAgICAgICAgaWYgKCFjb25maWdQbGF5bGlzdCkge1xyXG4gICAgICAgICAgICBjb25zdCBvYmogPSBfLnBpY2soY29uZmlnLCBbXHJcbiAgICAgICAgICAgICAgICAndGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyxcclxuICAgICAgICAgICAgICAgICdtZWRpYWlkJyxcclxuICAgICAgICAgICAgICAgICdpbWFnZScsXHJcbiAgICAgICAgICAgICAgICAnZmlsZScsXHJcbiAgICAgICAgICAgICAgICAnc291cmNlcycsXHJcbiAgICAgICAgICAgICAgICAndHJhY2tzJyxcclxuICAgICAgICAgICAgICAgICdwcmVsb2FkJyxcclxuICAgICAgICAgICAgICAgICdkdXJhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnaG9zdCcsXHJcbiAgICAgICAgICAgICAgICAnYXBwbGljYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3N0cmVhbSdcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBbIG9iaiBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0KSkge1xyXG4gICAgICAgICAgICBjb25maWcuZmVlZERhdGEgPSBjb25maWdQbGF5bGlzdDtcclxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gY29uZmlnUGxheWxpc3QucGxheWxpc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWxldGUgY29uZmlnLmR1cmF0aW9uO1xyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ29uZmlndXJhdG9yIGxvYWRlZC5cIiwgb3B0aW9ucyk7XHJcbiAgICBsZXQgY29uZmlnID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgbGV0IGFzcGVjdHJhdGlvID0gY29uZmlnLmFzcGVjdHJhdGlvIHx8IFwiMTY6OVwiO1xyXG4gICAgbGV0IGRlYnVnID0gY29uZmlnLmRlYnVnO1xyXG4gICAgbGV0IGRlZmF1bHRQbGF5YmFja1JhdGUgPSBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSB8fCAxO1xyXG4gICAgbGV0IGltYWdlID0gY29uZmlnLmltYWdlO1xyXG4gICAgbGV0IHBsYXliYWNrUmF0ZUNvbnRyb2xzID0gY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzIHx8IHRydWU7XHJcbiAgICBsZXQgcGxheWJhY2tSYXRlcyA9IGNvbmZpZy5wbGF5YmFja1JhdGVzIHx8IFswLjUsIDEsIDEuMjUsIDEuNSwgMl07XHJcbiAgICBsZXQgcGxheWxpc3QgPSBjb25maWcucGxheWxpc3QgfHwgW107XHJcbiAgICBsZXQgcXVhbGl0eUxhYmVsID0gY29uZmlnLnF1YWxpdHlMYWJlbCB8fCBcIlwiO1xyXG4gICAgbGV0IHJlcGVhdCA9IGNvbmZpZy5yZXBlYXQgfHwgZmFsc2U7XHJcbiAgICBsZXQgc3RyZXRjaGluZyA9IGNvbmZpZy5zdHJldGNoaW5nIHx8ICd1bmlmb3JtJztcclxuXHJcblxyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge3JldHVybiBjb25maWc7fTtcclxuXHJcbiAgICB0aGF0LmdldEFzcGVjdHJhdGlvID0oKT0+e3JldHVybiBhc3BlY3RyYXRpbzt9O1xyXG4gICAgdGhhdC5zZXRBc3BlY3RyYXRpbyA9KGFzcGVjdHJhdGlvXyk9Pnthc3BlY3RyYXRpbyA9IGFzcGVjdHJhdGlvXzt9O1xyXG5cclxuICAgIHRoYXQuaXNEZWJ1ZyA9KCk9PntyZXR1cm4gZGVidWc7fTtcclxuXHJcbiAgICB0aGF0LmdldERlZmF1bHRQbGF5YmFja1JhdGUgPSgpPT57cmV0dXJuIGRlZmF1bHRQbGF5YmFja1JhdGU7fTtcclxuICAgIHRoYXQuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KHBsYXliYWNrUmF0ZSk9PntkZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlOyByZXR1cm4gcGxheWJhY2tSYXRlO307XHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGFiZWwgPSAoKSA9PiB7cmV0dXJuIHF1YWxpdHlMYWJlbDt9O1xyXG4gICAgdGhhdC5zZXRRdWFsaXR5TGFiZWwgPSAobmV3TGFiZWwpID0+IHtxdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDt9O1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlcyA9KCk9PntyZXR1cm4gcGxheWJhY2tSYXRlczt9O1xyXG4gICAgdGhhdC5pc1BsYXliYWNrUmF0ZUNvbnRyb2xzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVDb250cm9sczt9O1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSgpPT57cmV0dXJuIHBsYXlsaXN0O307XHJcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3RfICk9PntcclxuICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RfKSl7XHJcbiAgICAgICAgICAgIHBsYXlsaXN0ID0gcGxheWxpc3RfO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwbGF5bGlzdCA9IFtwbGF5bGlzdF9dO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGxheWxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXNSZXBlYXQgPSgpPT57cmV0dXJuIHJlcGVhdDt9O1xyXG5cclxuICAgIHRoYXQuZ2V0U3RyZXRjaGluZyA9KCk9PntyZXR1cm4gc3RyZXRjaGluZzt9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdG9yO1xyXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAzLi5cbiAqL1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbW9kdWxlIHByb3ZpZGUgY3VzdG9tIGV2ZW50cy5cbiAqIEBwYXJhbSAgIG9iamVjdCAgICBBbiBvYmplY3QgdGhhdCByZXF1aXJlcyBjdXN0b20gZXZlbnRzLlxuICpcbiAqICovXG5cbmNvbnN0IEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgbGV0IHRoYXQgPSBvYmplY3Q7XG4gICAgbGV0IF9ldmVudHMgPVtdO1xuXG4gICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgY29udGV4dCl7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGxlbmd0aCA9IGV2ZW50cy5sZW5ndGg7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICBldmVudC5saXN0ZW5lci5hcHBseSggKCBldmVudC5jb250ZXh0IHx8IGNvbnRleHQgKSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgKF9ldmVudHNbbmFtZV0gfHwgKF9ldmVudHNbbmFtZV09W10pICkucHVzaCh7IGxpc3RlbmVyOiBsaXN0ZW5lciAgLCBjb250ZXh0IDogY29udGV4dH0pO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgY29uc3QgYWxsRXZlbnRzID0gX2V2ZW50cy5hbGw7XG5cbiAgICAgICAgaWYoZXZlbnRzKXtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgICAgICBpZihhbGxFdmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cywgdGhhdCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5hbWUgJiYgIWxpc3RlbmVyICYmICFjb250ZXh0KSAge1xuICAgICAgICAgICAgX2V2ZW50cyA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyhfZXZlbnRzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0YWluID0gX2V2ZW50c1tuYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciAgfHwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChsaXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLmxpc3RlbmVyICAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIuX2NhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8KGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZlbnQuY29udGV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgdGhhdC5vbmNlID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBjb25zdCBvbmNlQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjb3VudCsrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5vZmYobmFtZSwgb25jZUNhbGxiYWNrKTtcbiAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIG9uY2VDYWxsYmFjay5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoYXQub24obmFtZSwgb25jZUNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlcjsiLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcbiAqICovXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XG4gICAgfVxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XG4gICAgfVxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICB9XG5cbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgIH07XG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxyXG4gKiBAcGFyYW1cclxuICogKi9cclxuXHJcbmNvbnN0IFN1cHBvcnRDaGVja2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XHJcbiAgICBjb25zdCBzdXBwb3J0TGlzdCA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgTWltZVR5cGVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbXA0OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBmNHY6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbW92OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtcDM6ICdhdWRpby9tcGVnJyxcclxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2d2OiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ2c6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgdm9yYmlzOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICB3ZWJtOiAndmlkZW8vd2VibScsXHJcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcclxuICAgICAgICAgICAgICAgICAgICBtM3U4OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxyXG4gICAgICAgICAgICAgICAgICAgIG0zdTogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcclxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmKCF0eXBlKXtyZXR1cm4gZmFsc2U7fVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWltZVR5cGUgPSBzb3VyY2UubWltZVR5cGUgfHwgTWltZVR5cGVzW3R5cGVdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW1pbWVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnd2VicnRjJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbXBkIGFwcGxpY2F0aW9uL2Rhc2greG1sXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXNoKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2hscycsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy90aGlzIG1ldGhvZCBmcm9tIGhscy5qc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1lZGlhU291cmNlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlciA9IHdpbmRvdy5Tb3VyY2VCdWZmZXIgfHwgd2luZG93LldlYktpdFNvdXJjZUJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNUeXBlU3VwcG9ydGVkID0gbWVkaWFTb3VyY2UgJiYgdHlwZW9mIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUUsbXA0YS40MC4yXCInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgU291cmNlQnVmZmVyIGlzIGV4cG9zZWQgZW5zdXJlIGl0cyBBUEkgaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAvLyBzYWZhcmkgYW5kIG9sZCB2ZXJzaW9uIG9mIENocm9tZSBkb2Ugbm90IGV4cG9zZSBTb3VyY2VCdWZmZXIgZ2xvYmFsbHkgc28gY2hlY2tpbmcgU291cmNlQnVmZmVyLnByb3RvdHlwZSBpcyBpbXBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhaXNUeXBlU3VwcG9ydGVkICYmICEhc291cmNlQnVmZmVyVmFsaWRBUEk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzSGxzU3VwcG9ydCgpICYmICEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3J0bXAnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UgPSAoc29ydWNlXykgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKClcIiwgc29ydWNlXyk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHN1cHBvcnRMaXN0Lmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGlmKHN1cHBvcnRMaXN0W2ldLmNoZWNrU3VwcG9ydChzb3VyY2UpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0ID0gKHBsYXlsaXN0XykgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KClcIiwgcGxheWxpc3RfKTtcclxuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHBsYXlsaXN0Xy5sZW5ndGg7IGktLTspIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHBsYXlsaXN0X1tpXTtcclxuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBpdGVtLnNvdXJjZXMubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIHNvdXJjZSA9IGl0ZW0uc291cmNlc1tqXTtcclxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnROYW1lcztcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN1cHBvcnRDaGVja2VyO1xyXG4iLCIvLyBTVEFURVxyXG5leHBvcnQgY29uc3QgU1RBVEVfQlVGRkVSSU5HID0gJ2J1ZmZlcmluZyc7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9JRExFID0gJ2lkbGUnO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSAnY29tcGxldGUnO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfUEFVU0VEID0gJ3BhdXNlZCc7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9QTEFZSU5HID0gJ3BsYXlpbmcnO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSAnZXJyb3InO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfTE9BRElORyA9ICdsb2FkaW5nJztcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1NUQUxMRUQgPSAnc3RhbGxlZCc7XHJcblxyXG5cclxuLy8gUFJPVklERVJcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hUTUw1ID0gJ2h0bWw1JztcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1dFQlJUQyA9ICd3ZWJydGMnO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9ICdkYXNoJztcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hMUyA9ICdobHMnO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfUlRNUCA9ICdydG1wJztcclxuXHJcbi8vIEVWRU5UU1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xyXG5leHBvcnQgY29uc3QgUkVBRFkgPSAncmVhZHknO1xyXG5leHBvcnQgY29uc3QgREVTVFJPWSA9ICdkZXN0cm95JztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9ICdzZWVrJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSX0ZVTEwgPSAnYnVmZmVyRnVsbCc7XHJcbmV4cG9ydCBjb25zdCBESVNQTEFZX0NMSUNLID0gJ2Rpc3BsYXlDbGljayc7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9ICdsb2FkZWQnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLRUQgPSAnc2Vla2VkJztcclxuZXhwb3J0IGNvbnN0IE5FVFdPUktfVU5TVEFCTEVEID0gJ3Vuc3RhYmxlTmV0d29yayc7XHJcblxyXG5leHBvcnQgY29uc3QgRVJST1IgPSAnZXJyb3InO1xyXG5cclxuLy8gU1RBVEUgT0YgUExBWUVSXHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfU1RBVEUgPSAnc3RhdGVDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1BBVVNFID0gJ3BhdXNlJztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9QTEFZID0gJ3BsYXknO1xyXG5cclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSID0gJ2J1ZmZlckNoYW5nZWQnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9USU1FID0gJ3RpbWUnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9SQVRFX0NIQU5HRSA9ICdyYXRlY2hhbmdlJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVk9MVU1FID0gJ3ZvbHVtZUNoYW5nZWQnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9NVVRFID0gJ211dGUnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9NRVRBID0gJ21ldGFDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxTID0gJ3F1YWxpdHlMZXZlbENoYW5nZWQnO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9MRVZFTF9DSEFOR0VEID0gJ2N1cnJlbnRRdWFsaXR5TGV2ZWxDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCA9ICdwbGF5YmFja1JhdGVDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCA9ICdjdWVDaGFuZ2VkJztcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DSEFOR0VEID0gJ2NhcHRpb25DaGFuZ2VkJztcclxuXHJcblxyXG5leHBvcnQgY29uc3QgSU5JVF9FUlJPUiA9IDEwMDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0VSUk9SID0gMzAwO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SID0gMzAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiA9IDMwMjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiA9IDMwMztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9GSUxFX0VSUk9SID0gMzA0O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0NBUFRJT05fRVJST1IgPSAzMDU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SID0gNTAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19XU19DTE9TRUQgPSA1MDI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IgPSA1MDM7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiA9IDUwNDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiA9IDUwNTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IgPSA1MDY7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyA9IDUxMDtcclxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2ggfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XHJcbmltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbiAsdHJpbX0gZnJvbSBcIi4uLy4uL3V0aWxzL3N0cmluZ3NcIjtcclxuaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCIuLi9TdXBwb3J0Q2hlY2tlclwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBQbGF5bGlzdCBvciBTb3VyY2VzLlxyXG4gKiBAcGFyYW1cclxuICpcclxuICogKi9cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBsZXQgY3VycmVudFBsYXlsaXN0ID0gW107XHJcbiAgICBsZXQgc3VwcG9ydENoZWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xyXG5cclxuICAgIGNvbnN0IG1ha2VQcmV0dHlTb3VyY2UgPSBmdW5jdGlvbihzb3VyY2VfKXtcclxuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc291cmNlID0gT2JqZWN0LmFzc2lnbih7fSwgeyAnZGVmYXVsdCc6IGZhbHNlIH0sIHNvdXJjZV8pO1xyXG4gICAgICAgIHNvdXJjZS5maWxlID0gdHJpbSgnJyArIHNvdXJjZS5maWxlKTtcclxuXHJcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xyXG4gICAgICAgICAgICBzb3VyY2UuZmlsZSA9IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9zdHJlYW0vXCIgKyBzb3VyY2Uuc3RyZWFtO1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuYXBwbGljYXRpb247XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Uuc3RyZWFtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWltZXR5cGVSZWdFeCA9IC9eW14vXStcXC8oPzp4LSk/KFteL10rKSQvO1xyXG5cclxuICAgICAgICBpZiAobWltZXR5cGVSZWdFeC50ZXN0KHNvdXJjZS50eXBlKSkge1xyXG4gICAgICAgICAgICAvLyBpZiB0eXBlIGlzIGdpdmVuIGFzIGEgbWltZXR5cGVcclxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gc291cmNlLnR5cGUucmVwbGFjZShtaW1ldHlwZVJlZ0V4LCAnJDEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGlzUnRtcChzb3VyY2UuZmlsZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcclxuICAgICAgICB9ZWxzZSBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICd3ZWJydGMnO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzRGFzaChzb3VyY2UuZmlsZSwgc291cmNlLnR5cGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnZGFzaCc7XHJcbiAgICAgICAgfWVsc2UgaWYgKCFzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IGV4dHJhY3RFeHRlbnNpb24oc291cmNlLmZpbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBub3JtYWxpemUgdHlwZXNcclxuICAgICAgICBzd2l0Y2ggKHNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ20zdTgnOlxyXG4gICAgICAgICAgICBjYXNlICd2bmQuYXBwbGUubXBlZ3VybCc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdobHMnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ200YSc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdhYWMnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NtaWwnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2Vba2V5XSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Vba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc291cmNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3QpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBzZXRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdCk7XHJcbiAgICAgICAgY29uc3QgcHJldHRpZWRQbGF5bGlzdCA9IChfLmlzQXJyYXkocGxheWxpc3QpID8gcGxheWxpc3QgOiBbcGxheWxpc3RdKS5tYXAoZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkoaXRlbS50cmFja3MpKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgaXRlbS50cmFja3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0SXRlbSA9IE9iamVjdC5hc3NpZ24oe30se1xyXG4gICAgICAgICAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgICAgICAgICB0cmFja3M6IFtdXHJcbiAgICAgICAgICAgIH0sIGl0ZW0gKTtcclxuXHJcbiAgICAgICAgICAgIGlmKChwbGF5bGlzdEl0ZW0uc291cmNlcyA9PT0gT2JqZWN0KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkgJiYgIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykpIHtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtLnNvdXJjZXMpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykgfHwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5sZXZlbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IGl0ZW0ubGV2ZWxzO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKGl0ZW0pXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eVNvdXJjZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0U291cmNlID0gc291cmNlLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gKGRlZmF1bHRTb3VyY2UudG9TdHJpbmcoKSA9PT0gJ3RydWUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc291cmNlIGRvZXNuJ3QgaGF2ZSBhIGxhYmVsLCBudW1iZXIgaXRcclxuICAgICAgICAgICAgICAgIGlmICghcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLnR5cGUrXCItXCIraS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHByZXR0eVNvdXJjZSA9IG1ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtLnNvdXJjZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYoc3VwcG9ydENoZWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHByZXR0eVNvdXJjZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gcHJldHR5U291cmNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmZpbHRlcihzb3VyY2UgPT4gISFzb3VyY2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmYXVsdCDqsIAg7JeG7J2E65WMIHdlYnJ0Y+qwgCDsnojri6TrqbQgd2VicnRjIGRlZmF1bHQgOiB0cnVl66GcIOyekOuPmSDshKTsoJVcclxuICAgICAgICAgICAgLypsZXQgaGF2ZURlZmF1bHQgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS5kZWZhdWx0ID09IHRydWU7fSk7XHJcbiAgICAgICAgICAgIGxldCB3ZWJydGNTb3VyY2UgPSBbXTtcclxuICAgICAgICAgICAgaWYoIWhhdmVEZWZhdWx0KXtcclxuICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZSA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLnR5cGUgPT0gXCJ3ZWJydGNcIjt9KTtcclxuICAgICAgICAgICAgICAgIGlmKHdlYnJ0Y1NvdXJjZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VicnRjU291cmNlLmRlZmF1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9Ki9cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0udHJhY2tzKSl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5jYXB0aW9ucykpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MuY29uY2F0KHBsYXlsaXN0SXRlbS5jYXB0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgcGxheWxpc3RJdGVtLmNhcHRpb25zO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5tYXAoZnVuY3Rpb24odHJhY2spe1xyXG4gICAgICAgICAgICAgICAgaWYoIXRyYWNrIHx8ICF0cmFjay5maWxlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwge1xyXG4gICAgICAgICAgICAgICAgICAgICdraW5kJzogJ2NhcHRpb25zJyxcclxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCB0cmFjayk7XHJcbiAgICAgICAgICAgIH0pLmZpbHRlcih0cmFjayA9PiAhIXRyYWNrKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwbGF5bGlzdEl0ZW07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY3VycmVudFBsYXlsaXN0ID0gcHJldHRpZWRQbGF5bGlzdDtcclxuICAgICAgICByZXR1cm4gcHJldHRpZWRQbGF5bGlzdDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRQbGF5bGlzdCgpIFwiLCBjdXJyZW50UGxheWxpc3QpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UGxheWxpc3Q7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlcyA9ICgpID0+IHtcclxuICAgICAgICAvL1dlIGRvIG5vdCBzdXBwb3J0IFwiUExBWUxJU1RcIiBub3QgeWV0LiBTbyB0aGlzIHJldHVybnMgcGxheWxpc3Qgb2YgMC5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0Q3VycmVudFNvdXJjZXMoKSBcIiwgY3VycmVudFBsYXlsaXN0WzBdLnNvdXJjZXMpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UGxheWxpc3RbMF0uc291cmNlcztcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcclxuIiwiaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCJhcGkvU3VwcG9ydENoZWNrZXJcIjtcclxuaW1wb3J0IFByb21pc2UsIHtyZXNvbHZlZH0gZnJvbSBcImFwaS9zaGltcy9wcm9taXNlXCI7XHJcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBwcm92aWRlci5cclxuICogQHBhcmFtXHJcbiAqICovXHJcbmNvbnN0IENvbnRyb2xsZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHN1cHBvcnRDaGFja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcclxuICAgIGNvbnN0IFByb3ZpZGVycyA9IHt9O1xyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkZWQuXCIpO1xyXG5cclxuICAgIGNvbnN0IHJlZ2lzdGVQcm92aWRlciA9IChuYW1lLCBwcm92aWRlcikgPT57XHJcbiAgICAgICAgaWYoUHJvdmlkZXJzW25hbWVdKXtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIF9yZWdpc3RlclByb3ZpZGVyKCkgXCIsIG5hbWUpO1xyXG4gICAgICAgIFByb3ZpZGVyc1tuYW1lXSA9IHByb3ZpZGVyO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBQcm92aWRlckxvYWRlciA9e1xyXG4gICAgICAgIGh0bWw1OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L0h0bWw1J10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9IdG1sNScpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiaHRtbDVcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2VicnRjIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L1dlYlJUQyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvV2ViUlRDJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJ3ZWJydGNcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGFzaCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9EYXNoJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9EYXNoJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJkYXNoXCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBobHMgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvSGxzJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9IbHMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcImhsc1wiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydG1wIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2ZsYXNoL1J0bXAnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2ZsYXNoL1J0bXAnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcInJ0bXBcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmxvYWRQcm92aWRlcnMgPSAocGxheWxpc3QpID0+e1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QocGxheWxpc3QpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkUHJvdmlkZXJzKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcclxuICAgICAgICAgICAgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcy5maWx0ZXIoZnVuY3Rpb24ocHJvdmlkZXJOYW1lKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhIVByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV07XHJcbiAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbihwcm92aWRlck5hbWUpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSBQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5maW5kQnlOYW1lID0gKG5hbWUpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZmluZEJ5TmFtZSgpIFwiLCBuYW1lKTtcclxuICAgICAgICByZXR1cm4gUHJvdmlkZXJzW25hbWVdO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFByb3ZpZGVyQnlTb3VyY2UgPSAoc291cmNlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGdldFByb3ZpZGVyQnlTb3VyY2UoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhhdC5maW5kQnlOYW1lKHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXNTYW1lUHJvdmlkZXIgPSAoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGlzU2FtZVByb3ZpZGVyKCkgXCIsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSAsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpICk7XHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSA9PT0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7XHJcbiIsIi8vICAgICAgUHJvbWlzZSBQb2x5ZmlsbFxuLy8gICAgICBodHRwczovL2dpdGh1Yi5jb20vdGF5bG9yaGFrZXMvcHJvbWlzZS1wb2x5ZmlsbFxuLy8gICAgICBDb3B5cmlnaHQgKGMpIDIwMTQgVGF5bG9yIEhha2VzXG4vLyAgICAgIENvcHlyaWdodCAoYykgMjAxNCBGb3JiZXMgTGluZGVzYXlcbi8vICAgICAgdGF5bG9yaGFrZXMvcHJvbWlzZS1wb2x5ZmlsbCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcblxuY29uc3QgcHJvbWlzZUZpbmFsbHkgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIHRoaXMudGhlbihcbiAgICAgICAgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVqZWN0KHJlYXNvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICk7XG59O1xuXG4vLyBTdG9yZSBzZXRUaW1lb3V0IHJlZmVyZW5jZSBzbyBwcm9taXNlLXBvbHlmaWxsIHdpbGwgYmUgdW5hZmZlY3RlZCBieVxuLy8gb3RoZXIgY29kZSBtb2RpZnlpbmcgc2V0VGltZW91dCAobGlrZSBzaW5vbi51c2VGYWtlVGltZXJzKCkpXG5jb25zdCBzZXRUaW1lb3V0RnVuYyA9IHdpbmRvdy5zZXRUaW1lb3V0O1xuY29uc3Qgc2V0SW1tZWRpYXRlRnVuYyA9IHdpbmRvdy5zZXRJbW1lZGlhdGU7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vLyBQb2x5ZmlsbCBmb3IgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcbmZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxuY29uc3QgUHJvbWlzZVNoaW0gPSBmdW5jdGlvbiAoZm4pIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUHJvbWlzZSkpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2VzIG11c3QgYmUgY29uc3RydWN0ZWQgdmlhIG5ldycpO1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vdCBhIGZ1bmN0aW9uJyk7XG4gICAgdGhpcy5fc3RhdGUgPSAwO1xuICAgIHRoaXMuX2hhbmRsZWQgPSBmYWxzZTtcbiAgICB0aGlzLl92YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9kZWZlcnJlZHMgPSBbXTtcblxuICAgIGRvUmVzb2x2ZShmbiwgdGhpcyk7XG59XG5cbmNvbnN0IGhhbmRsZSA9IGZ1bmN0aW9uIChzZWxmLCBkZWZlcnJlZCkge1xuICAgIHdoaWxlIChzZWxmLl9zdGF0ZSA9PT0gMykge1xuICAgICAgICBzZWxmID0gc2VsZi5fdmFsdWU7XG4gICAgfVxuICAgIGlmIChzZWxmLl9zdGF0ZSA9PT0gMCkge1xuICAgICAgICBzZWxmLl9kZWZlcnJlZHMucHVzaChkZWZlcnJlZCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2VsZi5faGFuZGxlZCA9IHRydWU7XG4gICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjYiA9IHNlbGYuX3N0YXRlID09PSAxID8gZGVmZXJyZWQub25GdWxmaWxsZWQgOiBkZWZlcnJlZC5vblJlamVjdGVkO1xuICAgICAgICBpZiAoY2IgPT09IG51bGwpIHtcbiAgICAgICAgICAgIChzZWxmLl9zdGF0ZSA9PT0gMSA/IHJlc29sdmUgOiByZWplY3QpKGRlZmVycmVkLnByb21pc2UsIHNlbGYuX3ZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmV0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0ID0gY2Ioc2VsZi5fdmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZWplY3QoZGVmZXJyZWQucHJvbWlzZSwgZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShkZWZlcnJlZC5wcm9taXNlLCByZXQpO1xuICAgIH0pO1xufVxuXG5jb25zdCByZXNvbHZlID0gZnVuY3Rpb24gKHNlbGYsIG5ld1ZhbHVlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gUHJvbWlzZSBSZXNvbHV0aW9uIFByb2NlZHVyZTogaHR0cHM6Ly9naXRodWIuY29tL3Byb21pc2VzLWFwbHVzL3Byb21pc2VzLXNwZWMjdGhlLXByb21pc2UtcmVzb2x1dGlvbi1wcm9jZWR1cmVcbiAgICAgICAgaWYgKG5ld1ZhbHVlID09PSBzZWxmKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQSBwcm9taXNlIGNhbm5vdCBiZSByZXNvbHZlZCB3aXRoIGl0c2VsZi4nKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgbmV3VmFsdWUgJiZcbiAgICAgICAgICAgICh0eXBlb2YgbmV3VmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB2YXIgdGhlbiA9IG5ld1ZhbHVlLnRoZW47XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fc3RhdGUgPSAzO1xuICAgICAgICAgICAgICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgZmluYWxlKHNlbGYpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBkb1Jlc29sdmUoYmluZCh0aGVuLCBuZXdWYWx1ZSksIHNlbGYpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxmLl9zdGF0ZSA9IDE7XG4gICAgICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIGZpbmFsZShzZWxmKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlamVjdChzZWxmLCBlKTtcbiAgICB9XG59XG5cbmNvbnN0IHJlamVjdCA9ZnVuY3Rpb24gKHNlbGYsIG5ld1ZhbHVlKSB7XG4gICAgc2VsZi5fc3RhdGUgPSAyO1xuICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgZmluYWxlKHNlbGYpO1xufVxuXG5jb25zdCBmaW5hbGUgPSBmdW5jdGlvbiAoc2VsZikge1xuICAgIGlmIChzZWxmLl9zdGF0ZSA9PT0gMiAmJiBzZWxmLl9kZWZlcnJlZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIFByb21pc2UuX2ltbWVkaWF0ZUZuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFzZWxmLl9oYW5kbGVkKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5fdW5oYW5kbGVkUmVqZWN0aW9uRm4oc2VsZi5fdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc2VsZi5fZGVmZXJyZWRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGhhbmRsZShzZWxmLCBzZWxmLl9kZWZlcnJlZHNbaV0pO1xuICAgIH1cbiAgICBzZWxmLl9kZWZlcnJlZHMgPSBudWxsO1xufVxuXG5jb25zdCBIYW5kbGVyID0gZnVuY3Rpb24gKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9taXNlKSB7XG4gICAgdGhpcy5vbkZ1bGZpbGxlZCA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogbnVsbDtcbiAgICB0aGlzLm9uUmVqZWN0ZWQgPSB0eXBlb2Ygb25SZWplY3RlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uUmVqZWN0ZWQgOiBudWxsO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG59XG5cbi8qKlxuICogVGFrZSBhIHBvdGVudGlhbGx5IG1pc2JlaGF2aW5nIHJlc29sdmVyIGZ1bmN0aW9uIGFuZCBtYWtlIHN1cmVcbiAqIG9uRnVsZmlsbGVkIGFuZCBvblJlamVjdGVkIGFyZSBvbmx5IGNhbGxlZCBvbmNlLlxuICpcbiAqIE1ha2VzIG5vIGd1YXJhbnRlZXMgYWJvdXQgYXN5bmNocm9ueS5cbiAqL1xuY29uc3QgZG9SZXNvbHZlID0gZnVuY3Rpb24gKGZuLCBzZWxmKSB7XG4gICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICBmbihcbiAgICAgICAgICAgIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHNlbGYsIHZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlamVjdChzZWxmLCByZWFzb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICByZWplY3Qoc2VsZiwgZXgpO1xuICAgIH1cbn1cblxuUHJvbWlzZVNoaW0ucHJvdG90eXBlWydjYXRjaCddID0gZnVuY3Rpb24ob25SZWplY3RlZCkge1xuICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3RlZCk7XG59O1xuXG5Qcm9taXNlU2hpbS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgdmFyIHByb20gPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcihub29wKTtcblxuICAgIGhhbmRsZSh0aGlzLCBuZXcgSGFuZGxlcihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcHJvbSkpO1xuICAgIHJldHVybiBwcm9tO1xufTtcblxuUHJvbWlzZVNoaW0ucHJvdG90eXBlWydmaW5hbGx5J10gPSBwcm9taXNlRmluYWxseTtcblxuUHJvbWlzZVNoaW0uYWxsID0gZnVuY3Rpb24oYXJyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoIWFyciB8fCB0eXBlb2YgYXJyLmxlbmd0aCA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlLmFsbCBhY2NlcHRzIGFuIGFycmF5Jyk7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKTtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzb2x2ZShbXSk7XG4gICAgICAgIHZhciByZW1haW5pbmcgPSBhcmdzLmxlbmd0aDtcblxuICAgICAgICBmdW5jdGlvbiByZXMoaSwgdmFsKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGVuID0gdmFsLnRoZW47XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhlbi5jYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKGksIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJnc1tpXSA9IHZhbDtcbiAgICAgICAgICAgICAgICBpZiAoLS1yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIHJlamVjdChleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlcyhpLCBhcmdzW2ldKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuUHJvbWlzZVNoaW0ucmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgIH0pO1xufTtcblxuUHJvbWlzZVNoaW0ucmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHJlamVjdCh2YWx1ZSk7XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlU2hpbS5yYWNlID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsdWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZXNbaV0udGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG4vLyBVc2UgcG9seWZpbGwgZm9yIHNldEltbWVkaWF0ZSBmb3IgcGVyZm9ybWFuY2UgZ2FpbnNcblByb21pc2VTaGltLl9pbW1lZGlhdGVGbiA9XG4gICAgKHR5cGVvZiBzZXRJbW1lZGlhdGVGdW5jID09PSAnZnVuY3Rpb24nICYmXG4gICAgZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgc2V0SW1tZWRpYXRlRnVuYyhmbik7XG4gICAgfSkgfHxcbiAgICBmdW5jdGlvbihmbikge1xuICAgICAgICBzZXRJbW1lZGlhdGVGdW5jKGZuLCAwKTtcbiAgICB9O1xuXG5Qcm9taXNlU2hpbS5fdW5oYW5kbGVkUmVqZWN0aW9uRm4gPSBmdW5jdGlvbiBfdW5oYW5kbGVkUmVqZWN0aW9uRm4oZXJyKSB7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignUG9zc2libGUgVW5oYW5kbGVkIFByb21pc2UgUmVqZWN0aW9uOicsIGVycik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cbn07XG5cbmNvbnN0IFByb21pc2UgPSB3aW5kb3cuUHJvbWlzZSB8fCAod2luZG93LlByb21pc2UgPSBQcm9taXNlU2hpbSk7XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlZCA9IFByb21pc2UucmVzb2x2ZSgpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9taXNlOyIsImltcG9ydCBBUEkgZnJvbSAnYXBpL0FwaSc7XHJcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gJ3V0aWxzL3ZhbGlkYXRvcic7XHJcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xyXG5pbXBvcnQgTGEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcbmltcG9ydCB7Z2V0U2NyaXB0UGF0aH0gZnJvbSAndXRpbHMvd2VicGFjayc7XHJcblxyXG5cclxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSBnZXRTY3JpcHRQYXRoKCdvdmVucGxheWVyLnNkay5qcycpO1xyXG5cclxuLyoqXHJcbiAqIE1haW4gT3ZlblBsYXllclNESyBvYmplY3RcclxuICovXHJcbmNvbnN0IE92ZW5QbGF5ZXJTREsgPSB3aW5kb3cuT3ZlblBsYXllclNESyA9IHt9O1xyXG5cclxuY29uc3QgdmVyc2lvbiA9ICcwLjAuMSc7XHJcblxyXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblxyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuXHJcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XHJcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSkge1xyXG5cclxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgcGxheWVyIGluc3RhbmNlIGFuZCByZXR1cm4gaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmcgfCBkb20gZWxlbWVudH0gY29udGFpbmVyICBJZCBvZiBjb250YWluZXIgZWxlbWVudCBvciBjb250YWluZXIgZWxlbWVudFxyXG4gKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zICBUaGUgb3B0aW9uc1xyXG4gKi9cclxuT3ZlblBsYXllclNESy5jcmVhdGUgPSBmdW5jdGlvbihjb250YWluZXIsIG9wdGlvbnMpIHtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudChjb250YWluZXIpO1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gQVBJKGNvbnRhaW5lckVsZW1lbnQpO1xyXG4gICAgcGxheWVySW5zdGFuY2UuaW5pdChvcHRpb25zKTtcclxuXHJcbiAgICBwbGF5ZXJMaXN0LnB1c2gocGxheWVySW5zdGFuY2UpO1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgbGlzdC5cclxuICpcclxuICogQHJldHVybiAgICAge2FycmF5fSAgVGhlIHBsYXllciBsaXN0LlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckxpc3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGNvbnRhaW5lciBpZC5cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZ30gIGNvbnRhaW5lcklkICBUaGUgY29udGFpbmVyIGlkZW50aWZpZXJcclxuICogQHJldHVybiAgICAge29iZWplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlDb250YWluZXJJZCA9IGZ1bmN0aW9uKGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgTGEkXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGxheWVyTGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGluZGV4LlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcclxuICogQHJldHVybiAgICAge29iamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IHBsYXllckxpc3RbaW5kZXhdO1xyXG5cclxuICAgIGlmIChwbGF5ZXJJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSB3ZWJydGMgc291cmNlIGZvciBwbGF5ZXIgc291cmNlIHR5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtPYmplY3QgfCBBcnJheX0gIHNvdXJjZSAgIHdlYnJ0YyBzb3VyY2VcclxuICogQHJldHVybiAgICAge0FycmF5fSAgUGxheWVyIHNvdXJjZSBPYmVqY3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdlbmVyYXRlV2VicnRjVXJscyA9IGZ1bmN0aW9uKHNvdXJjZXMpIHtcclxuICAgIHJldHVybiAoXy5pc0FycmF5KHNvdXJjZXMpID8gc291cmNlcyA6IFtzb3VyY2VzXSkubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpe1xyXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIGlzV2ViUlRDKHNvdXJjZS5ob3N0KSAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XHJcbiAgICAgICAgICAgIHJldHVybiB7ZmlsZSA6IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9cIiArIHNvdXJjZS5zdHJlYW0sIHR5cGUgOiBcIndlYnJ0Y1wiLCBsYWJlbCA6IHNvdXJjZS5sYWJlbCA/IHNvdXJjZS5sYWJlbCA6IFwid2VicnRjLVwiKyhpbmRleCsxKSB9O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgT3ZlblBsYXllclNESztcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIEl0IHdhcyByZXBsYWNlIGpxdWVyeSdzIHNlbGVjdG9yLiBJdCBPZnRlbiB1c2VkIGJ5IE92ZW5UZW1wbGF0ZS4gKC92aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUuanMpXHJcbiAqIEBwYXJhbSAgIHNlbGVjdG9yT3JFbGVtZW50ICBzdHJpbmcgb3IgZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IExhJCA9IGZ1bmN0aW9uKHNlbGVjdG9yT3JFbGVtZW50KXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGNvbnN0IHJldHVybk5vZGUgPSBmdW5jdGlvbigkZWxlbWVudCAsIHNlbGVjdG9yKXtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSAgJGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgaWYobm9kZUxpc3QubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCAkZWxlbWVudCA9IFwiXCI7XHJcblxyXG4gICAgaWYoIF8uZXZlcnkoc2VsZWN0b3JPckVsZW1lbnQsIGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBfLmlzRWxlbWVudChpdGVtKX0pKXtcclxuICAgICAgICAkZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xyXG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwiZG9jdW1lbnRcIil7XHJcbiAgICAgICAgJGVsZW1lbnQgPSBkb2N1bWVudDtcclxuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcIndpbmRvd1wiKXtcclxuICAgICAgICAkZWxlbWVudCA9IHdpbmRvdztcclxuICAgIH1lbHNle1xyXG4gICAgICAgICRlbGVtZW50ID0gcmV0dXJuTm9kZShkb2N1bWVudCwgc2VsZWN0b3JPckVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZighJGVsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZmluZCA9IChzZWxlY3RvcikgPT57XHJcbiAgICAgICAgcmV0dXJuIExhJChyZXR1cm5Ob2RlKCRlbGVtZW50LCBzZWxlY3RvcikpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNzcyA9IChuYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hZGRDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9ICRlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGlmKGNsYXNzTmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIFwiICsgbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2xhc3MgPSAobmFtZSkgPT57XHJcbiAgICAgICAgaWYgKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSA9ICRlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBuYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2hvdyA9ICgpID0+e1xyXG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmhpZGUgPSAoKSA9PntcclxuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFwcGVuZCA9IChodG1sQ29kZSkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MICs9IGh0bWxDb2RlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnRleHQgPSAodGV4dCkgPT4geyAvL0lFOCtcclxuICAgICAgICBpZih0ZXh0KXtcclxuICAgICAgICAgICAgJGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0Lmhhc0NsYXNzID0gKG5hbWUpID0+IHsgLy9JRTgrXHJcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIG5hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KCRlbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pcyA9ICgkdGFyZ2V0RWxlbWVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudCA9PT0gJHRhcmdldEVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQub2Zmc2V0ID0gKCkgPT57ICAgIC8vSUU4K1xyXG4gICAgICAgIHZhciByZWN0ID0gJGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcclxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LndpZHRoID0gKCkgPT4geyAgICAvL0lFOCtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGVpZ2h0ID0gKCkgPT4geyAgIC8vSUU4K1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXR0ciA9IChhdHRyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7ICAgLy9JRTgrXHJcbiAgICAgICAgJGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkZWxlbWVudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVwbGFjZSA9IChodG1sKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVwbGFjZVdpdGgoaHRtbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWwpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5hcHBlbmRDaGlsZChodG1sKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jbG9zZXN0ID0gKHNlbGVjdG9yU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JTdHJpbmcpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhJDtcclxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMjQuLlxuICovXG5cbmNvbnN0IGxvZ2dlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBwcmV2Q29uc29sZUxvZyA9IG51bGw7XG5cbiAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogd2luZG93Wydjb25zb2xlJ11bJ2xvZyddfTtcblxuICAgIHRoYXQuZW5hYmxlID0gKCkgPT57XG4gICAgICAgIGlmKHByZXZDb25zb2xlTG9nID09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IHByZXZDb25zb2xlTG9nO1xuICAgIH07XG4gICAgdGhhdC5kaXNhYmxlID0gKCkgPT57XG4gICAgICAgIHByZXZDb25zb2xlTG9nID0gY29uc29sZS5sb2c7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IGZ1bmN0aW9uKCl7fTtcbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyOyIsImltcG9ydCBfIGZyb20gJy4vdW5kZXJzY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmltKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xufVxuXG4vKipcbiAqIGV4dHJhY3RFeHRlbnNpb25cbiAqXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSBwYXRoIGZvciB1cmxcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBFeHRlbnNpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHRlbnNpb24gPSBmdW5jdGlvbihwYXRoKSB7XG4gICAgaWYoIXBhdGggfHwgcGF0aC5zdWJzdHIoMCw0KT09J3J0bXAnKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCkge1xuICAgICAgICBsZXQgZXh0ZW5zaW9uID0gXCJcIjtcbiAgICAgICAgaWYgKCgvWygsXWZvcm1hdD1tcGQtL2kpLnRlc3QocGF0aCkpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtcGQnO1xuICAgICAgICB9ZWxzZSBpZiAoKC9bKCxdZm9ybWF0PW0zdTgtL2kpLnRlc3QocGF0aCkpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtM3U4JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uO1xuICAgIH1cblxuICAgIGxldCBhenVyZWRGb3JtYXQgPSBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCk7XG4gICAgaWYoYXp1cmVkRm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBhenVyZWRGb3JtYXQ7XG4gICAgfVxuICAgIHBhdGggPSBwYXRoLnNwbGl0KCc/JylbMF0uc3BsaXQoJyMnKVswXTtcbiAgICBpZihwYXRoLmxhc3RJbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLicpICsgMSwgcGF0aC5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbn07XG5cblxuLyoqXG4gKiBuYXR1cmFsSG1zXG4gKlxuICogQHBhcmFtICAgICAge251bWJlciB8IHN0cmluZ30gIHNlY29uZCAgVGhlIHNlY29uZFxuICogQHJldHVybiAgICAge3N0cmluZ30gIGZvcm1hdHRlZCBTdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5hdHVyYWxIbXMoc2Vjb25kKSB7XG4gICAgbGV0IHNlY051bSA9IHBhcnNlSW50KHNlY29uZCwgMTApO1xuICAgIGxldCBob3VycyAgID0gTWF0aC5mbG9vcihzZWNOdW0gLyAzNjAwKTtcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY051bSAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcbiAgICBsZXQgc2Vjb25kcyA9IHNlY051bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XG5cbiAgICBpZiAoaG91cnMgPiAwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxuICAgIGlmIChzZWNvbmRzIDwgMTApIHtzZWNvbmRzID0gXCIwXCIrc2Vjb25kczt9XG5cbiAgICBpZiAoaG91cnMgPiAwKSB7XG4gICAgICAgIHJldHVybiBob3VycysnOicrbWludXRlcysnOicrc2Vjb25kcztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWludXRlcysnOicrc2Vjb25kcztcbiAgICB9XG59IiwiLy8gICAgIFVuZGVyc2NvcmUuanMgMS45LjFcclxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXHJcbi8vICAgICAoYykgMjAwOS0yMDE4IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXHJcbi8vICAgICBVbmRlcnNjb3JlIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG4hZnVuY3Rpb24oKXt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZiYmc2VsZnx8XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbCYmZ2xvYmFsfHx0aGlzfHx7fSxyPW4uXyxlPUFycmF5LnByb3RvdHlwZSxvPU9iamVjdC5wcm90b3R5cGUscz1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sP1N5bWJvbC5wcm90b3R5cGU6bnVsbCx1PWUucHVzaCxjPWUuc2xpY2UscD1vLnRvU3RyaW5nLGk9by5oYXNPd25Qcm9wZXJ0eSx0PUFycmF5LmlzQXJyYXksYT1PYmplY3Qua2V5cyxsPU9iamVjdC5jcmVhdGUsZj1mdW5jdGlvbigpe30saD1mdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIGg/bjp0aGlzIGluc3RhbmNlb2YgaD92b2lkKHRoaXMuX3dyYXBwZWQ9bik6bmV3IGgobil9O1widW5kZWZpbmVkXCI9PXR5cGVvZiBleHBvcnRzfHxleHBvcnRzLm5vZGVUeXBlP24uXz1oOihcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUuZXhwb3J0cyYmKGV4cG9ydHM9bW9kdWxlLmV4cG9ydHM9aCksZXhwb3J0cy5fPWgpLGguVkVSU0lPTj1cIjEuOS4xXCI7dmFyIHYseT1mdW5jdGlvbih1LGksbil7aWYodm9pZCAwPT09aSlyZXR1cm4gdTtzd2l0Y2gobnVsbD09bj8zOm4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHUuY2FsbChpLG4pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gdS5jYWxsKGksbixyLHQpfTtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB1LmNhbGwoaSxuLHIsdCxlKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHUuYXBwbHkoaSxhcmd1bWVudHMpfX0sZD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguaXRlcmF0ZWUhPT12P2guaXRlcmF0ZWUobixyKTpudWxsPT1uP2guaWRlbnRpdHk6aC5pc0Z1bmN0aW9uKG4pP3kobixyLHQpOmguaXNPYmplY3QobikmJiFoLmlzQXJyYXkobik/aC5tYXRjaGVyKG4pOmgucHJvcGVydHkobil9O2guaXRlcmF0ZWU9dj1mdW5jdGlvbihuLHIpe3JldHVybiBkKG4sciwxLzApfTt2YXIgZz1mdW5jdGlvbih1LGkpe3JldHVybiBpPW51bGw9PWk/dS5sZW5ndGgtMToraSxmdW5jdGlvbigpe2Zvcih2YXIgbj1NYXRoLm1heChhcmd1bWVudHMubGVuZ3RoLWksMCkscj1BcnJheShuKSx0PTA7dDxuO3QrKylyW3RdPWFyZ3VtZW50c1t0K2ldO3N3aXRjaChpKXtjYXNlIDA6cmV0dXJuIHUuY2FsbCh0aGlzLHIpO2Nhc2UgMTpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLHIpO2Nhc2UgMjpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLGFyZ3VtZW50c1sxXSxyKX12YXIgZT1BcnJheShpKzEpO2Zvcih0PTA7dDxpO3QrKyllW3RdPWFyZ3VtZW50c1t0XTtyZXR1cm4gZVtpXT1yLHUuYXBwbHkodGhpcyxlKX19LG09ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJue307aWYobClyZXR1cm4gbChuKTtmLnByb3RvdHlwZT1uO3ZhciByPW5ldyBmO3JldHVybiBmLnByb3RvdHlwZT1udWxsLHJ9LGI9ZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP3ZvaWQgMDpuW3JdfX0saj1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsIT1uJiZpLmNhbGwobixyKX0seD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7aWYobnVsbD09bilyZXR1cm47bj1uW3JbZV1dfXJldHVybiB0P246dm9pZCAwfSxfPU1hdGgucG93KDIsNTMpLTEsQT1iKFwibGVuZ3RoXCIpLHc9ZnVuY3Rpb24obil7dmFyIHI9QShuKTtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgciYmMDw9ciYmcjw9X307aC5lYWNoPWguZm9yRWFjaD1mdW5jdGlvbihuLHIsdCl7dmFyIGUsdTtpZihyPXkocix0KSx3KG4pKWZvcihlPTAsdT1uLmxlbmd0aDtlPHU7ZSsrKXIobltlXSxlLG4pO2Vsc2V7dmFyIGk9aC5rZXlzKG4pO2ZvcihlPTAsdT1pLmxlbmd0aDtlPHU7ZSsrKXIobltpW2VdXSxpW2VdLG4pfXJldHVybiBufSxoLm1hcD1oLmNvbGxlY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPUFycmF5KHUpLG89MDtvPHU7bysrKXt2YXIgYT1lP2Vbb106bztpW29dPXIoblthXSxhLG4pfXJldHVybiBpfTt2YXIgTz1mdW5jdGlvbihjKXtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9Mzw9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9IXcobikmJmgua2V5cyhuKSxpPSh1fHxuKS5sZW5ndGgsbz0wPGM/MDppLTE7Zm9yKGV8fCh0PW5bdT91W29dOm9dLG8rPWMpOzA8PW8mJm88aTtvKz1jKXt2YXIgYT11P3Vbb106bzt0PXIodCxuW2FdLGEsbil9cmV0dXJuIHR9KG4seShyLGUsNCksdCx1KX19O2gucmVkdWNlPWguZm9sZGw9aC5pbmplY3Q9TygxKSxoLnJlZHVjZVJpZ2h0PWguZm9sZHI9TygtMSksaC5maW5kPWguZGV0ZWN0PWZ1bmN0aW9uKG4scix0KXt2YXIgZT0odyhuKT9oLmZpbmRJbmRleDpoLmZpbmRLZXkpKG4scix0KTtpZih2b2lkIDAhPT1lJiYtMSE9PWUpcmV0dXJuIG5bZV19LGguZmlsdGVyPWguc2VsZWN0PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT1bXTtyZXR1cm4gZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe2UobixyLHQpJiZ1LnB1c2gobil9KSx1fSxoLnJlamVjdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguZmlsdGVyKG4saC5uZWdhdGUoZChyKSksdCl9LGguZXZlcnk9aC5hbGw9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYoIXIobltvXSxvLG4pKXJldHVybiExfXJldHVybiEwfSxoLnNvbWU9aC5hbnk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYocihuW29dLG8sbikpcmV0dXJuITB9cmV0dXJuITF9LGguY29udGFpbnM9aC5pbmNsdWRlcz1oLmluY2x1ZGU9ZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSwoXCJudW1iZXJcIiE9dHlwZW9mIHR8fGUpJiYodD0wKSwwPD1oLmluZGV4T2YobixyLHQpfSxoLmludm9rZT1nKGZ1bmN0aW9uKG4sdCxlKXt2YXIgdSxpO3JldHVybiBoLmlzRnVuY3Rpb24odCk/aT10OmguaXNBcnJheSh0KSYmKHU9dC5zbGljZSgwLC0xKSx0PXRbdC5sZW5ndGgtMV0pLGgubWFwKG4sZnVuY3Rpb24obil7dmFyIHI9aTtpZighcil7aWYodSYmdS5sZW5ndGgmJihuPXgobix1KSksbnVsbD09bilyZXR1cm47cj1uW3RdfXJldHVybiBudWxsPT1yP3I6ci5hcHBseShuLGUpfSl9KSxoLnBsdWNrPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgubWFwKG4saC5wcm9wZXJ0eShyKSl9LGgud2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maWx0ZXIobixoLm1hdGNoZXIocikpfSxoLmZpbmRXaGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbmQobixoLm1hdGNoZXIocikpfSxoLm1heD1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPS0xLzAsbz0tMS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJmk8dCYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7dT1lKG4scix0KSwobzx1fHx1PT09LTEvMCYmaT09PS0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5taW49ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0xLzAsbz0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmdDxpJiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXsoKHU9ZShuLHIsdCkpPG98fHU9PT0xLzAmJmk9PT0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5zaHVmZmxlPWZ1bmN0aW9uKG4pe3JldHVybiBoLnNhbXBsZShuLDEvMCl9LGguc2FtcGxlPWZ1bmN0aW9uKG4scix0KXtpZihudWxsPT1yfHx0KXJldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksbltoLnJhbmRvbShuLmxlbmd0aC0xKV07dmFyIGU9dyhuKT9oLmNsb25lKG4pOmgudmFsdWVzKG4pLHU9QShlKTtyPU1hdGgubWF4KE1hdGgubWluKHIsdSksMCk7Zm9yKHZhciBpPXUtMSxvPTA7bzxyO28rKyl7dmFyIGE9aC5yYW5kb20obyxpKSxjPWVbb107ZVtvXT1lW2FdLGVbYV09Y31yZXR1cm4gZS5zbGljZSgwLHIpfSxoLnNvcnRCeT1mdW5jdGlvbihuLGUscil7dmFyIHU9MDtyZXR1cm4gZT1kKGUsciksaC5wbHVjayhoLm1hcChuLGZ1bmN0aW9uKG4scix0KXtyZXR1cm57dmFsdWU6bixpbmRleDp1KyssY3JpdGVyaWE6ZShuLHIsdCl9fSkuc29ydChmdW5jdGlvbihuLHIpe3ZhciB0PW4uY3JpdGVyaWEsZT1yLmNyaXRlcmlhO2lmKHQhPT1lKXtpZihlPHR8fHZvaWQgMD09PXQpcmV0dXJuIDE7aWYodDxlfHx2b2lkIDA9PT1lKXJldHVybi0xfXJldHVybiBuLmluZGV4LXIuaW5kZXh9KSxcInZhbHVlXCIpfTt2YXIgaz1mdW5jdGlvbihvLHIpe3JldHVybiBmdW5jdGlvbihlLHUsbil7dmFyIGk9cj9bW10sW11dOnt9O3JldHVybiB1PWQodSxuKSxoLmVhY2goZSxmdW5jdGlvbihuLHIpe3ZhciB0PXUobixyLGUpO28oaSxuLHQpfSksaX19O2guZ3JvdXBCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSksaC5pbmRleEJ5PWsoZnVuY3Rpb24obixyLHQpe25bdF09cn0pLGguY291bnRCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XSsrOm5bdF09MX0pO3ZhciBTPS9bXlxcdWQ4MDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkZmZmXS9nO2gudG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbj9oLmlzQXJyYXkobik/Yy5jYWxsKG4pOmguaXNTdHJpbmcobik/bi5tYXRjaChTKTp3KG4pP2gubWFwKG4saC5pZGVudGl0eSk6aC52YWx1ZXMobik6W119LGguc2l6ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj8wOncobik/bi5sZW5ndGg6aC5rZXlzKG4pLmxlbmd0aH0saC5wYXJ0aXRpb249ayhmdW5jdGlvbihuLHIsdCl7blt0PzA6MV0ucHVzaChyKX0sITApLGguZmlyc3Q9aC5oZWFkPWgudGFrZT1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uWzBdOmguaW5pdGlhbChuLG4ubGVuZ3RoLXIpfSxoLmluaXRpYWw9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobiwwLE1hdGgubWF4KDAsbi5sZW5ndGgtKG51bGw9PXJ8fHQ/MTpyKSkpfSxoLmxhc3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/bltuLmxlbmd0aC0xXTpoLnJlc3QobixNYXRoLm1heCgwLG4ubGVuZ3RoLXIpKX0saC5yZXN0PWgudGFpbD1oLmRyb3A9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobixudWxsPT1yfHx0PzE6cil9LGguY29tcGFjdD1mdW5jdGlvbihuKXtyZXR1cm4gaC5maWx0ZXIobixCb29sZWFuKX07dmFyIE09ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PShlPWV8fFtdKS5sZW5ndGgsaT0wLG89QShuKTtpPG87aSsrKXt2YXIgYT1uW2ldO2lmKHcoYSkmJihoLmlzQXJyYXkoYSl8fGguaXNBcmd1bWVudHMoYSkpKWlmKHIpZm9yKHZhciBjPTAsbD1hLmxlbmd0aDtjPGw7KWVbdSsrXT1hW2MrK107ZWxzZSBNKGEscix0LGUpLHU9ZS5sZW5ndGg7ZWxzZSB0fHwoZVt1KytdPWEpfXJldHVybiBlfTtoLmZsYXR0ZW49ZnVuY3Rpb24obixyKXtyZXR1cm4gTShuLHIsITEpfSxoLndpdGhvdXQ9ZyhmdW5jdGlvbihuLHIpe3JldHVybiBoLmRpZmZlcmVuY2UobixyKX0pLGgudW5pcT1oLnVuaXF1ZT1mdW5jdGlvbihuLHIsdCxlKXtoLmlzQm9vbGVhbihyKXx8KGU9dCx0PXIscj0hMSksbnVsbCE9dCYmKHQ9ZCh0LGUpKTtmb3IodmFyIHU9W10saT1bXSxvPTAsYT1BKG4pO288YTtvKyspe3ZhciBjPW5bb10sbD10P3QoYyxvLG4pOmM7ciYmIXQ/KG8mJmk9PT1sfHx1LnB1c2goYyksaT1sKTp0P2guY29udGFpbnMoaSxsKXx8KGkucHVzaChsKSx1LnB1c2goYykpOmguY29udGFpbnModSxjKXx8dS5wdXNoKGMpfXJldHVybiB1fSxoLnVuaW9uPWcoZnVuY3Rpb24obil7cmV0dXJuIGgudW5pcShNKG4sITAsITApKX0pLGguaW50ZXJzZWN0aW9uPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1bXSx0PWFyZ3VtZW50cy5sZW5ndGgsZT0wLHU9QShuKTtlPHU7ZSsrKXt2YXIgaT1uW2VdO2lmKCFoLmNvbnRhaW5zKHIsaSkpe3ZhciBvO2ZvcihvPTE7bzx0JiZoLmNvbnRhaW5zKGFyZ3VtZW50c1tvXSxpKTtvKyspO289PT10JiZyLnB1c2goaSl9fXJldHVybiByfSxoLmRpZmZlcmVuY2U9ZyhmdW5jdGlvbihuLHIpe3JldHVybiByPU0ociwhMCwhMCksaC5maWx0ZXIobixmdW5jdGlvbihuKXtyZXR1cm4haC5jb250YWlucyhyLG4pfSl9KSxoLnVuemlwPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1uJiZoLm1heChuLEEpLmxlbmd0aHx8MCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aC5wbHVjayhuLGUpO3JldHVybiB0fSxoLnppcD1nKGgudW56aXApLGgub2JqZWN0PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXt9LGU9MCx1PUEobik7ZTx1O2UrKylyP3RbbltlXV09cltlXTp0W25bZV1bMF1dPW5bZV1bMV07cmV0dXJuIHR9O3ZhciBGPWZ1bmN0aW9uKGkpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPUEobiksdT0wPGk/MDplLTE7MDw9dSYmdTxlO3UrPWkpaWYocihuW3VdLHUsbikpcmV0dXJuIHU7cmV0dXJuLTF9fTtoLmZpbmRJbmRleD1GKDEpLGguZmluZExhc3RJbmRleD1GKC0xKSxoLnNvcnRlZEluZGV4PWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0odD1kKHQsZSwxKSkociksaT0wLG89QShuKTtpPG87KXt2YXIgYT1NYXRoLmZsb29yKChpK28pLzIpO3QoblthXSk8dT9pPWErMTpvPWF9cmV0dXJuIGl9O3ZhciBFPWZ1bmN0aW9uKGksbyxhKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3ZhciBlPTAsdT1BKG4pO2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KTA8aT9lPTA8PXQ/dDpNYXRoLm1heCh0K3UsZSk6dT0wPD10P01hdGgubWluKHQrMSx1KTp0K3UrMTtlbHNlIGlmKGEmJnQmJnUpcmV0dXJuIG5bdD1hKG4scildPT09cj90Oi0xO2lmKHIhPXIpcmV0dXJuIDA8PSh0PW8oYy5jYWxsKG4sZSx1KSxoLmlzTmFOKSk/dCtlOi0xO2Zvcih0PTA8aT9lOnUtMTswPD10JiZ0PHU7dCs9aSlpZihuW3RdPT09cilyZXR1cm4gdDtyZXR1cm4tMX19O2guaW5kZXhPZj1FKDEsaC5maW5kSW5kZXgsaC5zb3J0ZWRJbmRleCksaC5sYXN0SW5kZXhPZj1FKC0xLGguZmluZExhc3RJbmRleCksaC5yYW5nZT1mdW5jdGlvbihuLHIsdCl7bnVsbD09ciYmKHI9bnx8MCxuPTApLHR8fCh0PXI8bj8tMToxKTtmb3IodmFyIGU9TWF0aC5tYXgoTWF0aC5jZWlsKChyLW4pL3QpLDApLHU9QXJyYXkoZSksaT0wO2k8ZTtpKyssbis9dCl1W2ldPW47cmV0dXJuIHV9LGguY2h1bms9ZnVuY3Rpb24obixyKXtpZihudWxsPT1yfHxyPDEpcmV0dXJuW107Zm9yKHZhciB0PVtdLGU9MCx1PW4ubGVuZ3RoO2U8dTspdC5wdXNoKGMuY2FsbChuLGUsZSs9cikpO3JldHVybiB0fTt2YXIgTj1mdW5jdGlvbihuLHIsdCxlLHUpe2lmKCEoZSBpbnN0YW5jZW9mIHIpKXJldHVybiBuLmFwcGx5KHQsdSk7dmFyIGk9bShuLnByb3RvdHlwZSksbz1uLmFwcGx5KGksdSk7cmV0dXJuIGguaXNPYmplY3Qobyk/bzppfTtoLmJpbmQ9ZyhmdW5jdGlvbihyLHQsZSl7aWYoIWguaXNGdW5jdGlvbihyKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uXCIpO3ZhciB1PWcoZnVuY3Rpb24obil7cmV0dXJuIE4ocix1LHQsdGhpcyxlLmNvbmNhdChuKSl9KTtyZXR1cm4gdX0pLGgucGFydGlhbD1nKGZ1bmN0aW9uKHUsaSl7dmFyIG89aC5wYXJ0aWFsLnBsYWNlaG9sZGVyLGE9ZnVuY3Rpb24oKXtmb3IodmFyIG49MCxyPWkubGVuZ3RoLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1pW2VdPT09bz9hcmd1bWVudHNbbisrXTppW2VdO2Zvcig7bjxhcmd1bWVudHMubGVuZ3RoOyl0LnB1c2goYXJndW1lbnRzW24rK10pO3JldHVybiBOKHUsYSx0aGlzLHRoaXMsdCl9O3JldHVybiBhfSksKGgucGFydGlhbC5wbGFjZWhvbGRlcj1oKS5iaW5kQWxsPWcoZnVuY3Rpb24obixyKXt2YXIgdD0ocj1NKHIsITEsITEpKS5sZW5ndGg7aWYodDwxKXRocm93IG5ldyBFcnJvcihcImJpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXNcIik7Zm9yKDt0LS07KXt2YXIgZT1yW3RdO25bZV09aC5iaW5kKG5bZV0sbil9fSksaC5tZW1vaXplPWZ1bmN0aW9uKGUsdSl7dmFyIGk9ZnVuY3Rpb24obil7dmFyIHI9aS5jYWNoZSx0PVwiXCIrKHU/dS5hcHBseSh0aGlzLGFyZ3VtZW50cyk6bik7cmV0dXJuIGoocix0KXx8KHJbdF09ZS5hcHBseSh0aGlzLGFyZ3VtZW50cykpLHJbdF19O3JldHVybiBpLmNhY2hlPXt9LGl9LGguZGVsYXk9ZyhmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gbi5hcHBseShudWxsLHQpfSxyKX0pLGguZGVmZXI9aC5wYXJ0aWFsKGguZGVsYXksaCwxKSxoLnRocm90dGxlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGEsYyxsPTA7dXx8KHU9e30pO3ZhciBmPWZ1bmN0aW9uKCl7bD0hMT09PXUubGVhZGluZz8wOmgubm93KCksaT1udWxsLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCl9LG49ZnVuY3Rpb24oKXt2YXIgbj1oLm5vdygpO2x8fCExIT09dS5sZWFkaW5nfHwobD1uKTt2YXIgcj1lLShuLWwpO3JldHVybiBvPXRoaXMsYT1hcmd1bWVudHMscjw9MHx8ZTxyPyhpJiYoY2xlYXJUaW1lb3V0KGkpLGk9bnVsbCksbD1uLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCkpOml8fCExPT09dS50cmFpbGluZ3x8KGk9c2V0VGltZW91dChmLHIpKSxjfTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksbD0wLGk9bz1hPW51bGx9LG59LGguZGVib3VuY2U9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYT1mdW5jdGlvbihuLHIpe2k9bnVsbCxyJiYobz10LmFwcGx5KG4scikpfSxuPWcoZnVuY3Rpb24obil7aWYoaSYmY2xlYXJUaW1lb3V0KGkpLHUpe3ZhciByPSFpO2k9c2V0VGltZW91dChhLGUpLHImJihvPXQuYXBwbHkodGhpcyxuKSl9ZWxzZSBpPWguZGVsYXkoYSxlLHRoaXMsbik7cmV0dXJuIG99KTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksaT1udWxsfSxufSxoLndyYXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5wYXJ0aWFsKHIsbil9LGgubmVnYXRlPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiFuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguY29tcG9zZT1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxlPXQubGVuZ3RoLTE7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPWUscj10W2VdLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtuLS07KXI9dFtuXS5jYWxsKHRoaXMscik7cmV0dXJuIHJ9fSxoLmFmdGVyPWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKCl7aWYoLS1uPDEpcmV0dXJuIHIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5iZWZvcmU9ZnVuY3Rpb24obixyKXt2YXIgdDtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gMDwtLW4mJih0PXIuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxuPD0xJiYocj1udWxsKSx0fX0saC5vbmNlPWgucGFydGlhbChoLmJlZm9yZSwyKSxoLnJlc3RBcmd1bWVudHM9Zzt2YXIgST0he3RvU3RyaW5nOm51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIiksVD1bXCJ2YWx1ZU9mXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJ0b1N0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImhhc093blByb3BlcnR5XCIsXCJ0b0xvY2FsZVN0cmluZ1wiXSxCPWZ1bmN0aW9uKG4scil7dmFyIHQ9VC5sZW5ndGgsZT1uLmNvbnN0cnVjdG9yLHU9aC5pc0Z1bmN0aW9uKGUpJiZlLnByb3RvdHlwZXx8byxpPVwiY29uc3RydWN0b3JcIjtmb3IoaihuLGkpJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSk7dC0tOykoaT1UW3RdKWluIG4mJm5baV0hPT11W2ldJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSl9O2gua2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTtpZihhKXJldHVybiBhKG4pO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWoobix0KSYmci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC5hbGxLZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKXIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGgudmFsdWVzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09bltyW3VdXTtyZXR1cm4gZX0saC5tYXBPYmplY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1oLmtleXMobiksdT1lLmxlbmd0aCxpPXt9LG89MDtvPHU7bysrKXt2YXIgYT1lW29dO2lbYV09cihuW2FdLGEsbil9cmV0dXJuIGl9LGgucGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1bclt1XSxuW3JbdV1dXTtyZXR1cm4gZX0saC5pbnZlcnQ9ZnVuY3Rpb24obil7Zm9yKHZhciByPXt9LHQ9aC5rZXlzKG4pLGU9MCx1PXQubGVuZ3RoO2U8dTtlKyspcltuW3RbZV1dXT10W2VdO3JldHVybiByfSxoLmZ1bmN0aW9ucz1oLm1ldGhvZHM9ZnVuY3Rpb24obil7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paC5pc0Z1bmN0aW9uKG5bdF0pJiZyLnB1c2godCk7cmV0dXJuIHIuc29ydCgpfTt2YXIgUj1mdW5jdGlvbihjLGwpe3JldHVybiBmdW5jdGlvbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO2lmKGwmJihuPU9iamVjdChuKSkscjwyfHxudWxsPT1uKXJldHVybiBuO2Zvcih2YXIgdD0xO3Q8cjt0KyspZm9yKHZhciBlPWFyZ3VtZW50c1t0XSx1PWMoZSksaT11Lmxlbmd0aCxvPTA7bzxpO28rKyl7dmFyIGE9dVtvXTtsJiZ2b2lkIDAhPT1uW2FdfHwoblthXT1lW2FdKX1yZXR1cm4gbn19O2guZXh0ZW5kPVIoaC5hbGxLZXlzKSxoLmV4dGVuZE93bj1oLmFzc2lnbj1SKGgua2V5cyksaC5maW5kS2V5PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGUsdT1oLmtleXMobiksaT0wLG89dS5sZW5ndGg7aTxvO2krKylpZihyKG5bZT11W2ldXSxlLG4pKXJldHVybiBlfTt2YXIgcSxLLHo9ZnVuY3Rpb24obixyLHQpe3JldHVybiByIGluIHR9O2gucGljaz1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9e30sZT1yWzBdO2lmKG51bGw9PW4pcmV0dXJuIHQ7aC5pc0Z1bmN0aW9uKGUpPygxPHIubGVuZ3RoJiYoZT15KGUsclsxXSkpLHI9aC5hbGxLZXlzKG4pKTooZT16LHI9TShyLCExLCExKSxuPU9iamVjdChuKSk7Zm9yKHZhciB1PTAsaT1yLmxlbmd0aDt1PGk7dSsrKXt2YXIgbz1yW3VdLGE9bltvXTtlKGEsbyxuKSYmKHRbb109YSl9cmV0dXJuIHR9KSxoLm9taXQ9ZyhmdW5jdGlvbihuLHQpe3ZhciByLGU9dFswXTtyZXR1cm4gaC5pc0Z1bmN0aW9uKGUpPyhlPWgubmVnYXRlKGUpLDE8dC5sZW5ndGgmJihyPXRbMV0pKToodD1oLm1hcChNKHQsITEsITEpLFN0cmluZyksZT1mdW5jdGlvbihuLHIpe3JldHVybiFoLmNvbnRhaW5zKHQscil9KSxoLnBpY2sobixlLHIpfSksaC5kZWZhdWx0cz1SKGguYWxsS2V5cywhMCksaC5jcmVhdGU9ZnVuY3Rpb24obixyKXt2YXIgdD1tKG4pO3JldHVybiByJiZoLmV4dGVuZE93bih0LHIpLHR9LGguY2xvbmU9ZnVuY3Rpb24obil7cmV0dXJuIGguaXNPYmplY3Qobik/aC5pc0FycmF5KG4pP24uc2xpY2UoKTpoLmV4dGVuZCh7fSxuKTpufSxoLnRhcD1mdW5jdGlvbihuLHIpe3JldHVybiByKG4pLG59LGguaXNNYXRjaD1mdW5jdGlvbihuLHIpe3ZhciB0PWgua2V5cyhyKSxlPXQubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKHZhciB1PU9iamVjdChuKSxpPTA7aTxlO2krKyl7dmFyIG89dFtpXTtpZihyW29dIT09dVtvXXx8IShvIGluIHUpKXJldHVybiExfXJldHVybiEwfSxxPWZ1bmN0aW9uKG4scix0LGUpe2lmKG49PT1yKXJldHVybiAwIT09bnx8MS9uPT0xL3I7aWYobnVsbD09bnx8bnVsbD09cilyZXR1cm4hMTtpZihuIT1uKXJldHVybiByIT1yO3ZhciB1PXR5cGVvZiBuO3JldHVybihcImZ1bmN0aW9uXCI9PT11fHxcIm9iamVjdFwiPT09dXx8XCJvYmplY3RcIj09dHlwZW9mIHIpJiZLKG4scix0LGUpfSxLPWZ1bmN0aW9uKG4scix0LGUpe24gaW5zdGFuY2VvZiBoJiYobj1uLl93cmFwcGVkKSxyIGluc3RhbmNlb2YgaCYmKHI9ci5fd3JhcHBlZCk7dmFyIHU9cC5jYWxsKG4pO2lmKHUhPT1wLmNhbGwocikpcmV0dXJuITE7c3dpdGNoKHUpe2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVyblwiXCIrbj09XCJcIityO2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybituIT0rbj8rciE9K3I6MD09K24/MS8rbj09MS9yOituPT0rcjtjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOnJldHVybituPT0rcjtjYXNlXCJbb2JqZWN0IFN5bWJvbF1cIjpyZXR1cm4gcy52YWx1ZU9mLmNhbGwobik9PT1zLnZhbHVlT2YuY2FsbChyKX12YXIgaT1cIltvYmplY3QgQXJyYXldXCI9PT11O2lmKCFpKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygbnx8XCJvYmplY3RcIiE9dHlwZW9mIHIpcmV0dXJuITE7dmFyIG89bi5jb25zdHJ1Y3RvcixhPXIuY29uc3RydWN0b3I7aWYobyE9PWEmJiEoaC5pc0Z1bmN0aW9uKG8pJiZvIGluc3RhbmNlb2YgbyYmaC5pc0Z1bmN0aW9uKGEpJiZhIGluc3RhbmNlb2YgYSkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHIpcmV0dXJuITF9ZT1lfHxbXTtmb3IodmFyIGM9KHQ9dHx8W10pLmxlbmd0aDtjLS07KWlmKHRbY109PT1uKXJldHVybiBlW2NdPT09cjtpZih0LnB1c2gobiksZS5wdXNoKHIpLGkpe2lmKChjPW4ubGVuZ3RoKSE9PXIubGVuZ3RoKXJldHVybiExO2Zvcig7Yy0tOylpZighcShuW2NdLHJbY10sdCxlKSlyZXR1cm4hMX1lbHNle3ZhciBsLGY9aC5rZXlzKG4pO2lmKGM9Zi5sZW5ndGgsaC5rZXlzKHIpLmxlbmd0aCE9PWMpcmV0dXJuITE7Zm9yKDtjLS07KWlmKGw9ZltjXSwhaihyLGwpfHwhcShuW2xdLHJbbF0sdCxlKSlyZXR1cm4hMX1yZXR1cm4gdC5wb3AoKSxlLnBvcCgpLCEwfSxoLmlzRXF1YWw9ZnVuY3Rpb24obixyKXtyZXR1cm4gcShuLHIpfSxoLmlzRW1wdHk9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW58fCh3KG4pJiYoaC5pc0FycmF5KG4pfHxoLmlzU3RyaW5nKG4pfHxoLmlzQXJndW1lbnRzKG4pKT8wPT09bi5sZW5ndGg6MD09PWgua2V5cyhuKS5sZW5ndGgpfSxoLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4hKCFufHwxIT09bi5ub2RlVHlwZSl9LGguaXNBcnJheT10fHxmdW5jdGlvbihuKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1wLmNhbGwobil9LGguaXNPYmplY3Q9ZnVuY3Rpb24obil7dmFyIHI9dHlwZW9mIG47cmV0dXJuXCJmdW5jdGlvblwiPT09cnx8XCJvYmplY3RcIj09PXImJiEhbn0saC5lYWNoKFtcIkFyZ3VtZW50c1wiLFwiRnVuY3Rpb25cIixcIlN0cmluZ1wiLFwiTnVtYmVyXCIsXCJEYXRlXCIsXCJSZWdFeHBcIixcIkVycm9yXCIsXCJTeW1ib2xcIixcIk1hcFwiLFwiV2Vha01hcFwiLFwiU2V0XCIsXCJXZWFrU2V0XCJdLGZ1bmN0aW9uKHIpe2hbXCJpc1wiK3JdPWZ1bmN0aW9uKG4pe3JldHVybiBwLmNhbGwobik9PT1cIltvYmplY3QgXCIrcitcIl1cIn19KSxoLmlzQXJndW1lbnRzKGFyZ3VtZW50cyl8fChoLmlzQXJndW1lbnRzPWZ1bmN0aW9uKG4pe3JldHVybiBqKG4sXCJjYWxsZWVcIil9KTt2YXIgRD1uLmRvY3VtZW50JiZuLmRvY3VtZW50LmNoaWxkTm9kZXM7XCJmdW5jdGlvblwiIT10eXBlb2YvLi8mJlwib2JqZWN0XCIhPXR5cGVvZiBJbnQ4QXJyYXkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIEQmJihoLmlzRnVuY3Rpb249ZnVuY3Rpb24obil7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbnx8ITF9KSxoLmlzRmluaXRlPWZ1bmN0aW9uKG4pe3JldHVybiFoLmlzU3ltYm9sKG4pJiZpc0Zpbml0ZShuKSYmIWlzTmFOKHBhcnNlRmxvYXQobikpfSxoLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTnVtYmVyKG4pJiZpc05hTihuKX0saC5pc0Jvb2xlYW49ZnVuY3Rpb24obil7cmV0dXJuITA9PT1ufHwhMT09PW58fFwiW29iamVjdCBCb29sZWFuXVwiPT09cC5jYWxsKG4pfSxoLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LGguaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIHZvaWQgMD09PW59LGguaGFzPWZ1bmN0aW9uKG4scil7aWYoIWguaXNBcnJheShyKSlyZXR1cm4gaihuLHIpO2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7dmFyIHU9cltlXTtpZihudWxsPT1ufHwhaS5jYWxsKG4sdSkpcmV0dXJuITE7bj1uW3VdfXJldHVybiEhdH0saC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4uXz1yLHRoaXN9LGguaWRlbnRpdHk9ZnVuY3Rpb24obil7cmV0dXJuIG59LGguY29uc3RhbnQ9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG59fSxoLm5vb3A9ZnVuY3Rpb24oKXt9LGgucHJvcGVydHk9ZnVuY3Rpb24ocil7cmV0dXJuIGguaXNBcnJheShyKT9mdW5jdGlvbihuKXtyZXR1cm4geChuLHIpfTpiKHIpfSxoLnByb3BlcnR5T2Y9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGw9PXI/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKG4pe3JldHVybiBoLmlzQXJyYXkobik/eChyLG4pOnJbbl19fSxoLm1hdGNoZXI9aC5tYXRjaGVzPWZ1bmN0aW9uKHIpe3JldHVybiByPWguZXh0ZW5kT3duKHt9LHIpLGZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTWF0Y2gobixyKX19LGgudGltZXM9ZnVuY3Rpb24obixyLHQpe3ZhciBlPUFycmF5KE1hdGgubWF4KDAsbikpO3I9eShyLHQsMSk7Zm9yKHZhciB1PTA7dTxuO3UrKyllW3VdPXIodSk7cmV0dXJuIGV9LGgucmFuZG9tPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGw9PXImJihyPW4sbj0wKSxuK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooci1uKzEpKX0saC5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9O3ZhciBMPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiN4Mjc7XCIsXCJgXCI6XCImI3g2MDtcIn0sUD1oLmludmVydChMKSxXPWZ1bmN0aW9uKHIpe3ZhciB0PWZ1bmN0aW9uKG4pe3JldHVybiByW25dfSxuPVwiKD86XCIraC5rZXlzKHIpLmpvaW4oXCJ8XCIpK1wiKVwiLGU9UmVnRXhwKG4pLHU9UmVnRXhwKG4sXCJnXCIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbj1udWxsPT1uP1wiXCI6XCJcIituLGUudGVzdChuKT9uLnJlcGxhY2UodSx0KTpufX07aC5lc2NhcGU9VyhMKSxoLnVuZXNjYXBlPVcoUCksaC5yZXN1bHQ9ZnVuY3Rpb24obixyLHQpe2guaXNBcnJheShyKXx8KHI9W3JdKTt2YXIgZT1yLmxlbmd0aDtpZighZSlyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP3QuY2FsbChuKTp0O2Zvcih2YXIgdT0wO3U8ZTt1Kyspe3ZhciBpPW51bGw9PW4/dm9pZCAwOm5bclt1XV07dm9pZCAwPT09aSYmKGk9dCx1PWUpLG49aC5pc0Z1bmN0aW9uKGkpP2kuY2FsbChuKTppfXJldHVybiBufTt2YXIgQz0wO2gudW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHI9KytDK1wiXCI7cmV0dXJuIG4/bityOnJ9LGgudGVtcGxhdGVTZXR0aW5ncz17ZXZhbHVhdGU6LzwlKFtcXHNcXFNdKz8pJT4vZyxpbnRlcnBvbGF0ZTovPCU9KFtcXHNcXFNdKz8pJT4vZyxlc2NhcGU6LzwlLShbXFxzXFxTXSs/KSU+L2d9O3ZhciBKPS8oLileLyxVPXtcIidcIjpcIidcIixcIlxcXFxcIjpcIlxcXFxcIixcIlxcclwiOlwiclwiLFwiXFxuXCI6XCJuXCIsXCJcXHUyMDI4XCI6XCJ1MjAyOFwiLFwiXFx1MjAyOVwiOlwidTIwMjlcIn0sVj0vXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2csJD1mdW5jdGlvbihuKXtyZXR1cm5cIlxcXFxcIitVW25dfTtoLnRlbXBsYXRlPWZ1bmN0aW9uKGksbixyKXshbiYmciYmKG49ciksbj1oLmRlZmF1bHRzKHt9LG4saC50ZW1wbGF0ZVNldHRpbmdzKTt2YXIgdCxlPVJlZ0V4cChbKG4uZXNjYXBlfHxKKS5zb3VyY2UsKG4uaW50ZXJwb2xhdGV8fEopLnNvdXJjZSwobi5ldmFsdWF0ZXx8Sikuc291cmNlXS5qb2luKFwifFwiKStcInwkXCIsXCJnXCIpLG89MCxhPVwiX19wKz0nXCI7aS5yZXBsYWNlKGUsZnVuY3Rpb24obixyLHQsZSx1KXtyZXR1cm4gYSs9aS5zbGljZShvLHUpLnJlcGxhY2UoViwkKSxvPXUrbi5sZW5ndGgscj9hKz1cIicrXFxuKChfX3Q9KFwiK3IrXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI6dD9hKz1cIicrXFxuKChfX3Q9KFwiK3QrXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjplJiYoYSs9XCInO1xcblwiK2UrXCJcXG5fX3ArPSdcIiksbn0pLGErPVwiJztcXG5cIixuLnZhcmlhYmxlfHwoYT1cIndpdGgob2JqfHx7fSl7XFxuXCIrYStcIn1cXG5cIiksYT1cInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIitcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIrYStcInJldHVybiBfX3A7XFxuXCI7dHJ5e3Q9bmV3IEZ1bmN0aW9uKG4udmFyaWFibGV8fFwib2JqXCIsXCJfXCIsYSl9Y2F0Y2gobil7dGhyb3cgbi5zb3VyY2U9YSxufXZhciB1PWZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwodGhpcyxuLGgpfSxjPW4udmFyaWFibGV8fFwib2JqXCI7cmV0dXJuIHUuc291cmNlPVwiZnVuY3Rpb24oXCIrYytcIil7XFxuXCIrYStcIn1cIix1fSxoLmNoYWluPWZ1bmN0aW9uKG4pe3ZhciByPWgobik7cmV0dXJuIHIuX2NoYWluPSEwLHJ9O3ZhciBHPWZ1bmN0aW9uKG4scil7cmV0dXJuIG4uX2NoYWluP2gocikuY2hhaW4oKTpyfTtoLm1peGluPWZ1bmN0aW9uKHQpe3JldHVybiBoLmVhY2goaC5mdW5jdGlvbnModCksZnVuY3Rpb24obil7dmFyIHI9aFtuXT10W25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49W3RoaXMuX3dyYXBwZWRdO3JldHVybiB1LmFwcGx5KG4sYXJndW1lbnRzKSxHKHRoaXMsci5hcHBseShoLG4pKX19KSxofSxoLm1peGluKGgpLGguZWFjaChbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJzcGxpY2VcIixcInVuc2hpZnRcIl0sZnVuY3Rpb24ocil7dmFyIHQ9ZVtyXTtoLnByb3RvdHlwZVtyXT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX3dyYXBwZWQ7cmV0dXJuIHQuYXBwbHkobixhcmd1bWVudHMpLFwic2hpZnRcIiE9PXImJlwic3BsaWNlXCIhPT1yfHwwIT09bi5sZW5ndGh8fGRlbGV0ZSBuWzBdLEcodGhpcyxuKX19KSxoLmVhY2goW1wiY29uY2F0XCIsXCJqb2luXCIsXCJzbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgcj1lW25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIEcodGhpcyxyLmFwcGx5KHRoaXMuX3dyYXBwZWQsYXJndW1lbnRzKSl9fSksaC5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcHBlZH0saC5wcm90b3R5cGUudmFsdWVPZj1oLnByb3RvdHlwZS50b0pTT049aC5wcm90b3R5cGUudmFsdWUsaC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gU3RyaW5nKHRoaXMuX3dyYXBwZWQpfSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShcInVuZGVyc2NvcmVcIixbXSxmdW5jdGlvbigpe3JldHVybiBofSl9KCk7XHJcbiIsImltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbn0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1J0bXAgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3J0bXA6JykgPT0gMCB8fCB0eXBlID09ICdydG1wJyk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc1dlYlJUQyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICBpZihmaWxlKXtcclxuICAgICAgICByZXR1cm4gKGZpbGUuaW5kZXhPZignd3M6JykgPT09IDAgfHwgZmlsZS5pbmRleE9mKCd3c3M6JykgPT09IDAgfHwgdHlwZSA9PT0gJ3dlYnJ0YycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgaXNEYXNoID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIHJldHVybiAoIHR5cGUgPT09ICdtcGQnIHx8ICB0eXBlID09PSAnZGFzaCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2Rhc2greG1sJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtcGQnKTtcclxufTtcclxuIiwiLyoqXG4gKiB1dGlscyBmb3Igd2VicGFja1xuICovXG5cbmV4cG9ydCBjb25zdCBnZXRTY3JpcHRQYXRoID0gZnVuY3Rpb24oc2NyaXB0TmFtZSkge1xuICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHNjcmlwdHNbaV0uc3JjO1xuICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHNyYy5sYXN0SW5kZXhPZignLycgKyBzY3JpcHROYW1lKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHIoMCwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjkuLlxuICovXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IF9fVkVSU0lPTl9fO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==