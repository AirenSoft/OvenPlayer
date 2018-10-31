/*! OvenPlayerv0.7.62 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
            })["catch"](function (error) {
                var errorObject = { code: _constants.INIT_ERROR, reason: "init error.", message: "Player init error.", error: error };
                that.trigger(_constants.ERROR, errorObject);
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

        //captionManager.flushCaptionList(captionManager.getCurrentCaption());

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
                        if (listener && listener !== event.listener && listener !== event.listener.listener && listener !== event.listener._listener || context && context !== event.context) {
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


Object.defineProperty(exports, "__esModule", {
    value: true
});

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

exports["default"] = SupportChecker;

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
var STATE_BUFFERING = exports.STATE_BUFFERING = "buffering";
var STATE_IDLE = exports.STATE_IDLE = "idle";
var STATE_COMPLETE = exports.STATE_COMPLETE = "complete";
var STATE_PAUSED = exports.STATE_PAUSED = "paused";
var STATE_PLAYING = exports.STATE_PLAYING = "playing";
var STATE_ERROR = exports.STATE_ERROR = "error";
var STATE_LOADING = exports.STATE_LOADING = "loading";
var STATE_STALLED = exports.STATE_STALLED = "stalled";

// PROVIDER
var PROVIDER_HTML5 = exports.PROVIDER_HTML5 = "html5";
var PROVIDER_WEBRTC = exports.PROVIDER_WEBRTC = "webrtc";
var PROVIDER_DASH = exports.PROVIDER_DASH = "dash";
var PROVIDER_HLS = exports.PROVIDER_HLS = "hls";
var PROVIDER_RTMP = exports.PROVIDER_RTMP = "rtmp";

// EVENTS
var CONTENT_COMPLETE = exports.CONTENT_COMPLETE = STATE_COMPLETE;
var READY = exports.READY = "ready";
var DESTROY = exports.DESTROY = "destroy";
var CONTENT_SEEK = exports.CONTENT_SEEK = "seek";
var CONTENT_BUFFER_FULL = exports.CONTENT_BUFFER_FULL = "bufferFull";
var DISPLAY_CLICK = exports.DISPLAY_CLICK = "displayClick";
var CONTENT_LOADED = exports.CONTENT_LOADED = "loaded";
var CONTENT_SEEKED = exports.CONTENT_SEEKED = "seeked";
var NETWORK_UNSTABLED = exports.NETWORK_UNSTABLED = "unstableNetwork";

var ERROR = exports.ERROR = "error";

// STATE OF PLAYER
var PLAYER_STATE = exports.PLAYER_STATE = "stateChanged";
var PLAYER_COMPLETE = exports.PLAYER_COMPLETE = STATE_COMPLETE;
var PLAYER_PAUSE = exports.PLAYER_PAUSE = "pause";
var PLAYER_PLAY = exports.PLAYER_PLAY = "play";

var CONTENT_BUFFER = exports.CONTENT_BUFFER = "bufferChanged";
var CONTENT_TIME = exports.CONTENT_TIME = "time";
var CONTENT_RATE_CHANGE = exports.CONTENT_RATE_CHANGE = "ratechange";
var CONTENT_VOLUME = exports.CONTENT_VOLUME = "volumeChanged";
var CONTENT_MUTE = exports.CONTENT_MUTE = "mute";
var CONTENT_META = exports.CONTENT_META = "metaChanged";
var CONTENT_LEVELS = exports.CONTENT_LEVELS = "qualityLevelChanged";
var CONTENT_LEVEL_CHANGED = exports.CONTENT_LEVEL_CHANGED = "currentQualityLevelChanged";
var PLAYBACK_RATE_CHANGED = exports.PLAYBACK_RATE_CHANGED = "playbackRateChanged";
var CONTENT_CAPTION_CUE_CHANGED = exports.CONTENT_CAPTION_CUE_CHANGED = "cueChanged";
var CONTENT_CAPTION_CHANGED = exports.CONTENT_CAPTION_CHANGED = "captionChanged";

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


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SupportChecker = __webpack_require__(/*! api/SupportChecker */ "./src/js/api/SupportChecker.js");

var _SupportChecker2 = _interopRequireDefault(_SupportChecker);

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
        return Promise.all(supportedProviderNames.filter(function (providerName) {
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


Object.defineProperty(exports, "__esModule", {
    value: true
});

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
        var closestElement = $element.closest(selectorString);
        if (closestElement) {
            return La$(closestElement);
        } else {
            return null;
        }
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

exports['default'] = logger;

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
var version = exports.version = '0.7.62-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaUV4cGFuc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9Db25maWd1cmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvU3VwcG9ydENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wbGF5bGlzdC9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xpa2VBJC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvbG9nZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zdHJpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy91bmRlcnNjb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy92YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3dlYnBhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZlcnNpb24uanMiXSwibmFtZXMiOlsiQXBpIiwiY29udGFpbmVyIiwibG9nTWFuYWdlciIsInRoYXQiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsInZlcnNpb24iLCJwbGF5bGlzdE1hbmFnZXIiLCJwcm92aWRlckNvbnRyb2xsZXIiLCJjdXJyZW50UHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJsYXp5UXVldWUiLCJpbml0UHJvdmlkZXIiLCJsYXN0UGxheVBvc2l0aW9uIiwicGlja1F1YWxpdHlGcm9tU291cmNlIiwic291cmNlcyIsInF1YWxpdHkiLCJpIiwibGVuZ3RoIiwiZ2V0UXVhbGl0eUxhYmVsIiwibGFiZWwiLCJsb2FkUHJvdmlkZXJzIiwiZ2V0UGxheWxpc3QiLCJ0aGVuIiwiZGVzdHJveSIsImN1cnJlbnRTb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2VzIiwiUHJvdmlkZXJzIiwiZ2V0TmFtZSIsIlBST1ZJREVSX1JUTVAiLCJvbiIsIm5hbWUiLCJkYXRhIiwidHJpZ2dlciIsIkVSUk9SIiwicGFyc2VJbnQiLCJjb2RlIiwiTkVUV09SS19VTlNUQUJMRUQiLCJjdXJyZW50UXVhbGl0eSIsImdldEN1cnJlbnRRdWFsaXR5IiwiaW5kZXgiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicGF1c2UiLCJzZXRDdXJyZW50UXVhbGl0eSIsInByZWxvYWQiLCJmbHVzaCIsIlJFQURZIiwiZXJyb3IiLCJlcnJvck9iamVjdCIsIklOSVRfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImluaXQiLCJvcHRpb25zIiwiaXNEZWJ1ZyIsImRpc2FibGUiLCJzZXRQbGF5bGlzdCIsImdldENvbmZpZyIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJnZXRWb2x1bWUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInBsYXlsaXN0IiwicGxheSIsInNlZWsiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsInNldERlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJxdWFsaXR5SW5kZXgiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwiaXNTYW1lUHJvdmlkZXIiLCJyZXNRdWFsaXR5SW5kZXgiLCJnZXRCdWZmZXIiLCJnZXRTdGF0ZSIsInN0b3AiLCJyZW1vdmUiLCJERVNUUk9ZIiwib2ZmIiwiT3ZlblBsYXllclNESyIsInJlbW92ZVBsYXllciIsImdldENvbnRhaW5lcklkIiwiQXBpUnRtcEV4cGFuc2lvbiIsImV4dGVybmFsQ2FsbGJhY2tDcmVlcCIsInJlc3VsdCIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsIkNvbmZpZ3VyYXRvciIsImNvbXBvc2VTb3VyY2VPcHRpb25zIiwiRGVmYXVsdHMiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5YmFja1JhdGVzIiwibXV0ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2VyaWFsaXplIiwidmFsIiwidW5kZWZpbmVkIiwibG93ZXJjYXNlVmFsIiwidG9Mb3dlckNhc2UiLCJpc05hTiIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJkZXNlcmlhbGl6ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwibm9ybWFsaXplU2l6ZSIsInNsaWNlIiwiZXZhbHVhdGVBc3BlY3RSYXRpbyIsImFyIiwidG9TdHJpbmciLCJpbmRleE9mIiwidGVzdCIsInciLCJzdWJzdHIiLCJoIiwiY29uZmlnIiwiYXNwZWN0cmF0aW8iLCJyYXRlQ29udHJvbHMiLCJyYXRlcyIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsIl8iLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJwdXNoIiwic29ydCIsImNvbmZpZ1BsYXlsaXN0Iiwib2JqIiwicGljayIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJkZWJ1ZyIsImltYWdlIiwicXVhbGl0eUxhYmVsIiwicmVwZWF0Iiwic3RyZXRjaGluZyIsImdldEFzcGVjdHJhdGlvIiwic2V0QXNwZWN0cmF0aW8iLCJhc3BlY3RyYXRpb18iLCJnZXREZWZhdWx0UGxheWJhY2tSYXRlIiwic2V0UXVhbGl0eUxhYmVsIiwibmV3TGFiZWwiLCJnZXRQbGF5YmFja1JhdGVzIiwiaXNQbGF5YmFja1JhdGVDb250cm9scyIsInBsYXlsaXN0XyIsImlzUmVwZWF0IiwiZ2V0U3RyZXRjaGluZyIsIkV2ZW50RW1pdHRlciIsIm9iamVjdCIsIl9ldmVudHMiLCJ0cmlnZ2VyRXZlbnRzIiwiZXZlbnRzIiwiYXJncyIsImNvbnRleHQiLCJldmVudCIsImxpc3RlbmVyIiwiYXBwbHkiLCJjYWxsIiwiYXJndW1lbnRzIiwiYWxsRXZlbnRzIiwiYWxsIiwibmFtZXMiLCJsIiwicmV0YWluIiwiaiIsImsiLCJfbGlzdGVuZXIiLCJvbmNlIiwiY291bnQiLCJvbmNlQ2FsbGJhY2siLCJMYXp5Q29tbWFuZEV4ZWN1dG9yIiwiaW5zdGFuY2UiLCJxdWV1ZWRDb21tYW5kcyIsImNvbW1hbmRRdWV1ZSIsInVuZGVjb3JhdGVkTWV0aG9kcyIsImV4ZWN1dGVNb2RlIiwiY29tbWFuZCIsIm1ldGhvZCIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwiY29tbWFuZF8iLCJjb21tYW5kUXVldWVJdGVtIiwiZmluZFdoZXJlIiwic3BsaWNlIiwiZmluZEluZGV4IiwiU3VwcG9ydENoZWNrZXIiLCJzdXBwb3J0TGlzdCIsImNoZWNrU3VwcG9ydCIsInNvdXJjZSIsIk1pbWVUeXBlcyIsImFhYyIsIm1wNCIsImY0diIsIm00diIsIm1vdiIsIm1wMyIsIm1wZWciLCJvZ3YiLCJvZ2ciLCJvZ2EiLCJ2b3JiaXMiLCJ3ZWJtIiwiZjRhIiwibTN1OCIsIm0zdSIsImhscyIsInZpZGVvIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2FuUGxheVR5cGUiLCJmaWxlIiwidHlwZSIsIm1pbWVUeXBlIiwiaXNIbHNTdXBwb3J0IiwiZ2V0TWVkaWFTb3VyY2UiLCJ3aW5kb3ciLCJNZWRpYVNvdXJjZSIsIldlYktpdE1lZGlhU291cmNlIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXIiLCJTb3VyY2VCdWZmZXIiLCJXZWJLaXRTb3VyY2VCdWZmZXIiLCJpc1R5cGVTdXBwb3J0ZWQiLCJzb3VyY2VCdWZmZXJWYWxpZEFQSSIsImFwcGVuZEJ1ZmZlciIsImZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSIsInNvcnVjZV8iLCJmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QiLCJzdXBwb3J0TmFtZXMiLCJpdGVtIiwic3VwcG9ydGVkIiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIlBST1ZJREVSX0RBU0giLCJQUk9WSURFUl9ITFMiLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIkNPTlRFTlRfU0VFS0VEIiwiUExBWUVSX1NUQVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfVElNRSIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfTEVWRUxTIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJQTEFZRVJfVU5LTldPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfRklMRV9FUlJPUiIsIlBMQVlFUl9DQVBUSU9OX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfQ0xPU0VEIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1ciLCJNYW5hZ2VyIiwiY3VycmVudFBsYXlsaXN0Iiwic3VwcG9ydENoZWNrZXIiLCJtYWtlUHJldHR5U291cmNlIiwic291cmNlXyIsImhvc3QiLCJhcHBsaWNhdGlvbiIsInN0cmVhbSIsIm1pbWV0eXBlUmVnRXgiLCJyZXBsYWNlIiwicHJldHRpZWRQbGF5bGlzdCIsInRyYWNrcyIsInBsYXlsaXN0SXRlbSIsImxldmVscyIsInByZXR0eVNvdXJjZSIsImRlZmF1bHRTb3VyY2UiLCJjYXB0aW9ucyIsImNvbmNhdCIsInRyYWNrIiwiQ29udHJvbGxlciIsInN1cHBvcnRDaGFja2VyIiwicmVnaXN0ZVByb3ZpZGVyIiwicHJvdmlkZXIiLCJQcm92aWRlckxvYWRlciIsImh0bWw1IiwicmVxdWlyZSIsImVyciIsIkVycm9yIiwid2VicnRjIiwiZGFzaCIsInJ0bXAiLCJzdXBwb3J0ZWRQcm92aWRlck5hbWVzIiwiUHJvbWlzZSIsInByb3ZpZGVyTmFtZSIsImZpbmRCeU5hbWUiLCJnZXRQcm92aWRlckJ5U291cmNlIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lIiwiX193ZWJwYWNrX3B1YmxpY19wYXRoX18iLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiY29udGFpbmVyRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwibm9kZVR5cGUiLCJjcmVhdGUiLCJwbGF5ZXJJbnN0YW5jZSIsImdldFBsYXllckxpc3QiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJnZXRQbGF5ZXJCeUluZGV4IiwicGxheWVySWQiLCJjb25zb2xlIiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwiTGEkIiwic2VsZWN0b3JPckVsZW1lbnQiLCJyZXR1cm5Ob2RlIiwiJGVsZW1lbnQiLCJzZWxlY3RvciIsIm5vZGVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsImV2ZXJ5IiwiaXNFbGVtZW50IiwiZmluZCIsImNzcyIsInZhbHVlIiwiZWxlbWVudCIsInN0eWxlIiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGFzc05hbWVzIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJyZW1vdmVDbGFzcyIsIlJlZ0V4cCIsImpvaW4iLCJyZW1vdmVBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInNob3ciLCJkaXNwbGF5IiwiaGlkZSIsImFwcGVuZCIsImh0bWxDb2RlIiwiaW5uZXJIVE1MIiwidGV4dCIsInRleHRDb250ZW50IiwiaGFzQ2xhc3MiLCJjb250YWlucyIsImlzIiwiJHRhcmdldEVsZW1lbnQiLCJvZmZzZXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwiYm9keSIsInNjcm9sbFRvcCIsImxlZnQiLCJzY3JvbGxMZWZ0IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJhdHRyIiwiZ2V0QXR0cmlidXRlIiwiaHRtbCIsInJlcGxhY2VXaXRoIiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVDaGlsZCIsImhhc0NoaWxkTm9kZXMiLCJmaXJzdENoaWxkIiwiZ2V0IiwiY2xvc2VzdCIsInNlbGVjdG9yU3RyaW5nIiwiY2xvc2VzdEVsZW1lbnQiLCJsb2dnZXIiLCJwcmV2Q29uc29sZUxvZyIsImVuYWJsZSIsInRyaW0iLCJuYXR1cmFsSG1zIiwic3RyaW5nIiwiZXh0cmFjdEV4dGVuc2lvbiIsInBhdGgiLCJnZXRBenVyZUZpbGVGb3JtYXQiLCJleHRlbnNpb24iLCJhenVyZWRGb3JtYXQiLCJsYXN0SW5kZXhPZiIsInNlY29uZCIsInNlY051bSIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsIm4iLCJzZWxmIiwiZ2xvYmFsIiwiciIsImUiLCJvIiwicyIsIlN5bWJvbCIsInUiLCJjIiwicCIsImhhc093blByb3BlcnR5IiwidCIsImEiLCJmIiwiX3dyYXBwZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiVkVSU0lPTiIsInYiLCJ5IiwiZCIsIml0ZXJhdGVlIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwicHJvcGVydHkiLCJnIiwibWF4IiwibSIsImIiLCJ4IiwicG93IiwiQSIsImVhY2giLCJjb2xsZWN0IiwiTyIsInJlZHVjZSIsImZvbGRsIiwiaW5qZWN0IiwicmVkdWNlUmlnaHQiLCJmb2xkciIsImRldGVjdCIsImZpbmRLZXkiLCJzZWxlY3QiLCJyZWplY3QiLCJuZWdhdGUiLCJzb21lIiwiYW55IiwiaW5jbHVkZXMiLCJpbmNsdWRlIiwidmFsdWVzIiwiaW52b2tlIiwicGx1Y2siLCJ3aGVyZSIsIm1pbiIsInNodWZmbGUiLCJzYW1wbGUiLCJyYW5kb20iLCJjbG9uZSIsInNvcnRCeSIsImNyaXRlcmlhIiwiZ3JvdXBCeSIsImluZGV4QnkiLCJjb3VudEJ5IiwiUyIsInRvQXJyYXkiLCJpc1N0cmluZyIsIm1hdGNoIiwic2l6ZSIsInBhcnRpdGlvbiIsImZpcnN0IiwiaGVhZCIsInRha2UiLCJpbml0aWFsIiwibGFzdCIsInJlc3QiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJCb29sZWFuIiwiTSIsImlzQXJndW1lbnRzIiwiZmxhdHRlbiIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzQm9vbGVhbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwidW56aXAiLCJ6aXAiLCJGIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwiRSIsInJhbmdlIiwiY2VpbCIsImNodW5rIiwiTiIsImJpbmQiLCJUeXBlRXJyb3IiLCJwYXJ0aWFsIiwicGxhY2Vob2xkZXIiLCJiaW5kQWxsIiwibWVtb2l6ZSIsImNhY2hlIiwiZGVsYXkiLCJzZXRUaW1lb3V0IiwiZGVmZXIiLCJ0aHJvdHRsZSIsImxlYWRpbmciLCJub3ciLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsImNhbmNlbCIsImRlYm91bmNlIiwid3JhcCIsImNvbXBvc2UiLCJhZnRlciIsImJlZm9yZSIsInJlc3RBcmd1bWVudHMiLCJJIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJUIiwiQiIsImNvbnN0cnVjdG9yIiwiYWxsS2V5cyIsIm1hcE9iamVjdCIsInBhaXJzIiwiaW52ZXJ0IiwiZnVuY3Rpb25zIiwibWV0aG9kcyIsIlIiLCJleHRlbmQiLCJleHRlbmRPd24iLCJhc3NpZ24iLCJxIiwiSyIsInoiLCJvbWl0IiwiU3RyaW5nIiwiZGVmYXVsdHMiLCJ0YXAiLCJpc01hdGNoIiwidmFsdWVPZiIsInBvcCIsImlzRXF1YWwiLCJpc0VtcHR5IiwiRCIsImNoaWxkTm9kZXMiLCJJbnQ4QXJyYXkiLCJpc0Zpbml0ZSIsImlzU3ltYm9sIiwiaXNOdWxsIiwiaXNVbmRlZmluZWQiLCJoYXMiLCJub0NvbmZsaWN0IiwiY29uc3RhbnQiLCJub29wIiwicHJvcGVydHlPZiIsIm1hdGNoZXMiLCJ0aW1lcyIsIkRhdGUiLCJnZXRUaW1lIiwiTCIsIlAiLCJXIiwiZXNjYXBlIiwidW5lc2NhcGUiLCJDIiwidW5pcXVlSWQiLCJ0ZW1wbGF0ZVNldHRpbmdzIiwiZXZhbHVhdGUiLCJpbnRlcnBvbGF0ZSIsIkoiLCJVIiwiViIsIiQiLCJ0ZW1wbGF0ZSIsInZhcmlhYmxlIiwiRnVuY3Rpb24iLCJjaGFpbiIsIl9jaGFpbiIsIkciLCJtaXhpbiIsInRvSlNPTiIsImRlZmluZSIsImlzUnRtcCIsImlzV2ViUlRDIiwiaXNEYXNoIiwiZ2V0U2NyaXB0UGF0aCIsInNjcmlwdE5hbWUiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzcmMiLCJfX1ZFUlNJT05fXyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBLGlEQUF5QyxrakJBQWtqQjtBQUMzbEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBLHlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQXdCLGtDQUFrQztBQUMxRCxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNB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d0IsQ0FBeEIsSUFBNkIrRyxLQUFLL0csT0FBTCxDQUFhLE1BQWIsTUFBeUIsQ0FBdEQsSUFBMkRnSCxTQUFTLFFBQTVFO0FBQ0g7QUFDRCxXQUFPLEtBQVA7QUFDSCxDQUxNO0FBTUEsSUFBTW1ZLDBCQUFTLFNBQVRBLE1BQVMsQ0FBVXBZLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ3hDLFdBQVNBLFNBQVMsS0FBVCxJQUFtQkEsU0FBUyxNQUE1QixJQUFzQ0EsU0FBUyxzQkFBL0MsSUFBeUUsK0JBQWlCRCxJQUFqQixLQUEwQixLQUE1RztBQUNILENBRk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYUDs7OztBQUlPLElBQU1xWSx3Q0FBZ0IsU0FBaEJBLGFBQWdCLENBQVNDLFVBQVQsRUFBcUI7QUFDOUMsUUFBTUMsVUFBVTFZLFNBQVMyWSxvQkFBVCxDQUE4QixRQUE5QixDQUFoQjtBQUNBLFNBQUssSUFBSS9sQixJQUFJLENBQWIsRUFBZ0JBLElBQUk4bEIsUUFBUTdsQixNQUE1QixFQUFvQ0QsR0FBcEMsRUFBeUM7QUFDckMsWUFBTWdtQixNQUFNRixRQUFROWxCLENBQVIsRUFBV2dtQixHQUF2QjtBQUNBLFlBQUlBLEdBQUosRUFBUztBQUNMLGdCQUFNemtCLFFBQVF5a0IsSUFBSTVNLFdBQUosQ0FBZ0IsTUFBTXlNLFVBQXRCLENBQWQ7QUFDQSxnQkFBSXRrQixTQUFTLENBQWIsRUFBZ0I7QUFDWix1QkFBT3lrQixJQUFJcmYsTUFBSixDQUFXLENBQVgsRUFBY3BGLFFBQVEsQ0FBdEIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU8sRUFBUDtBQUNILENBWk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKUDs7O0FBR08sSUFBTWxDLDRCQUFVNG1CLG1CQUFoQixDIiwiZmlsZSI6Im92ZW5wbGF5ZXIuc2RrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJvdmVucGxheWVyLnNka1wiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe1wib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZlwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZlwiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1XCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1XCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknKTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzXCIpO1xuIiwiLyogZ2xvYmFscyBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXyAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19hbWRfb3B0aW9uc19fO1xyXG4iLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoIChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuIiwiLy9pbXBvcnQgQ2FwdGlvbk1hbmFnZXIgZnJvbSBcImFwaS9jYXB0aW9uL01hbmFnZXJcIjtcclxuaW1wb3J0IENvbmZpZ3VyYXRvciBmcm9tIFwiYXBpL0NvbmZpZ3VyYXRvclwiO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCBMYXp5Q29tbWFuZEV4ZWN1dG9yIGZyb20gXCJhcGkvTGF6eUNvbW1hbmRFeGVjdXRvclwiO1xyXG5pbXBvcnQgTG9nTWFuYWdlciBmcm9tIFwidXRpbHMvbG9nZ2VyXCI7XHJcbmltcG9ydCBQbGF5bGlzdE1hbmFnZXIgZnJvbSBcImFwaS9wbGF5bGlzdC9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlckNvbnRyb2xsZXIgZnJvbSBcImFwaS9wcm92aWRlci9Db250cm9sbGVyXCI7XHJcbmltcG9ydCB7UkVBRFksIEVSUk9SLCBJTklUX0VSUk9SLCBERVNUUk9ZLCBORVRXT1JLX1VOU1RBQkxFRCwgUExBWUVSX0ZJTEVfRVJST1IsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcclxuaW1wb3J0IHtBcGlSdG1wRXhwYW5zaW9ufSBmcm9tICdhcGkvQXBpRXhwYW5zaW9ucyc7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBvYmplY3QgY29ubmVjdHMgVUkgdG8gdGhlIHByb3ZpZGVyLlxyXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb250YWluZXIgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcblxyXG5jb25zdCBBcGkgPSBmdW5jdGlvbihjb250YWluZXIpe1xyXG4gICAgbGV0IGxvZ01hbmFnZXIgPSBMb2dNYW5hZ2VyKCk7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiW1tPdmVuUGxheWVyXV0gdi5cIisgdmVyc2lvbik7XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgbG9hZGVkLlwiKTtcclxuICAgIC8vbGV0IGNhcHRpb25NYW5hZ2VyID0gQ2FwdGlvbk1hbmFnZXIodGhhdCk7XHJcbiAgICBsZXQgcGxheWxpc3RNYW5hZ2VyID0gUGxheWxpc3RNYW5hZ2VyKCk7XHJcbiAgICBsZXQgcHJvdmlkZXJDb250cm9sbGVyID0gUHJvdmlkZXJDb250cm9sbGVyKCk7XHJcbiAgICBsZXQgY3VycmVudFByb3ZpZGVyID0gXCJcIjtcclxuICAgIGxldCBwbGF5ZXJDb25maWcgPSBcIlwiO1xyXG4gICAgbGV0IGxhenlRdWV1ZSA9IFwiXCI7XHJcblxyXG4gICAgY29uc3QgaW5pdFByb3ZpZGVyID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XHJcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHlGcm9tU291cmNlID0gKHNvdXJjZXMpID0+e1xyXG4gICAgICAgICAgICB2YXIgcXVhbGl0eSA9IDA7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBxdWFsaXR5O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBwcm92aWRlckNvbnRyb2xsZXIubG9hZFByb3ZpZGVycyhwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U291cmNlSW5kZXggPSBwaWNrUXVhbGl0eUZyb21Tb3VyY2UocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coIFwiY3VycmVudCBzb3VyY2UgaW5kZXggOiBcIisgY3VycmVudFNvdXJjZUluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIC8vQ2FsbCBQcm92aWRlci5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyLmdldE5hbWUoKSA9PT0gUFJPVklERVJfUlRNUCl7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHByb3ZpZGVyIHR5cGUgaXMgUlRNUCwgd2UgYWNjZXB0cyBSdG1wRXhwYW5zaW9uLlxyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGF0LCBBcGlSdG1wRXhwYW5zaW9uKGN1cnJlbnRQcm92aWRlcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1RoaXMgcGFzc2VzIHRoZSBldmVudCBjcmVhdGVkIGJ5IHRoZSBQcm92aWRlciB0byBBUEkuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5vbihcImFsbFwiLCBmdW5jdGlvbihuYW1lLCBkYXRhKXtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIobmFtZSwgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9BdXRvIG5leHQgc291cmNlIHdoZW4gcGxheWVyIGxvYWQgd2FzIGZhaWwgYnkgYW1pc3Mgc291cmNlLlxyXG4gICAgICAgICAgICAgICAgLy9kYXRhLmNvZGUgPT09IFBMQVlFUl9GSUxFX0VSUk9SXHJcbiAgICAgICAgICAgICAgICBpZiggKG5hbWUgPT09IEVSUk9SICYmIChwYXJzZUludChkYXRhLmNvZGUvMTAwKSA9PT0gMyB8fCBwYXJzZUludChkYXRhLmNvZGUvMTAwKSA9PT0gNSkpfHwgbmFtZSA9PT0gTkVUV09SS19VTlNUQUJMRUQgKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFF1YWxpdHkgPSB0aGF0LmdldEN1cnJlbnRRdWFsaXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY3VycmVudFF1YWxpdHkuaW5kZXgrMSA8IHRoYXQuZ2V0UXVhbGl0eUxldmVscygpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBzZXF1ZW50aWFsIGhhcyBhdmFpbGFibGUgc291cmNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5KGN1cnJlbnRRdWFsaXR5LmluZGV4KzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pLnRoZW4oKCk9PntcclxuXHJcbiAgICAgICAgICAgIC8vcHJvdmlkZXIncyBwcmVsb2FkKCkgaGF2ZSB0byBtYWRlIFByb21pc2UuIEN1eiBpdCBvdmVyY29tZXMgJ2ZsYXNoIGxvYWRpbmcgdGltaW5nIHByb2JsZW0nLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIucHJlbG9hZChwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSwgbGFzdFBsYXlQb3NpdGlvbiApLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5mbHVzaCgpO1xyXG4gICAgICAgICAgICAgICAgLy9UaGlzIGlzIG5vIHJlYXNvbiB0byBleGlzdCBhbnltb3JlLlxyXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUkVBRFkpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yT2JqZWN0ID0ge2NvZGUgOiBJTklUX0VSUk9SLCByZWFzb24gOiBcImluaXQgZXJyb3IuXCIsIG1lc3NhZ2UgOiBcIlBsYXllciBpbml0IGVycm9yLlwiLCBlcnJvciA6IGVycm9yfTtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgZXJyb3JPYmplY3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3JPYmplY3QgPSB7Y29kZSA6IElOSVRfRVJST1IsIHJlYXNvbiA6IFwiaW5pdCBlcnJvci5cIiwgbWVzc2FnZSA6IFwiUGxheWVyIGluaXQgZXJyb3IuXCIsIGVycm9yIDogZXJyb3J9O1xyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIGVycm9yT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgIC8veHh4IDogSWYgeW91IGluaXQgZW1wdHkgc291cmNlcy4gKEkgdGhpbmsgdGhpcyBpcyBzdHJhbmdlIGNhc2UuKVxyXG4gICAgICAgICAgICAvL1RoaXMgd29ya3MgZm9yIHRoaXMgY2FzZS5cclxuICAgICAgICAgICAgLy9wbGF5ZXIgPSBPdmVuUGxheWVyLmNyZWF0ZShcImVsSWRcIiwge30pO1xyXG4gICAgICAgICAgICAvL3BsYXllci5sb2FkKHNvcnVjZXMpO1xyXG4gICAgICAgICAgICBsYXp5UXVldWUucmVtb3ZlQW5kRXhjdXRlT25jZShcImxvYWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFQSSDstIjquLDtmZQg7ZWo7IiYXHJcbiAgICAgKiBpbml0XHJcbiAgICAgKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zIHBsYXllciBpbml0aWFsIG9wdGlvbiB2YWx1ZS5cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiovXHJcbiAgICB0aGF0LmluaXQgPSAob3B0aW9ucykgPT57XHJcbiAgICAgICAgLy9JdCBjb2xsZWN0cyB0aGUgY29tbWFuZHMgYW5kIGV4ZWN1dGVzIHRoZW0gYXQgdGhlIHRpbWUgd2hlbiB0aGV5IGFyZSBleGVjdXRhYmxlLlxyXG4gICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydsb2FkJywncGxheScsJ3BhdXNlJywnc2VlaycsJ3N0b3AnLCAnZ2V0RHVyYXRpb24nLCAnZ2V0UG9zaXRpb24nLCAnZ2V0Vm9sdW1lJywgJ2dldE11dGUnLCAnZ2V0QnVmZmVyJywgJ2dldFN0YXRlJ10pO1xyXG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zKTtcclxuICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzRGVidWcoKSl7XHJcbiAgICAgICAgICAgIGxvZ01hbmFnZXIuZGlzYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KClcIik7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIGNvbmZpZyA6IFwiLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0UGxheWxpc3QocGxheWVyQ29uZmlnLmdldFBsYXlsaXN0KCkpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBzb3VyY2VzIDogXCIgLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XHJcbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qdGhhdC5nZXRDb250YWluZXJJZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXIuaWQ7XHJcbiAgICB9OyovXHJcblxyXG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q29uZmlnKClcIiwgcGxheWVyQ29uZmlnLmdldENvbmZpZygpKTtcclxuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldENvbmZpZygpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RHVyYXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQb3NpdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRWb2x1bWUoKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRWb2x1bWUoKSBcIiArIHZvbHVtZSk7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldFZvbHVtZSh2b2x1bWUpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0TXV0ZSgpIFwiICsgc3RhdGUpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0TXV0ZShzdGF0ZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0TXV0ZSgpIFwiICsgY3VycmVudFByb3ZpZGVyLmdldE11dGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5sb2FkID0gKHBsYXlsaXN0KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogbG9hZCgpIFwiLCBwbGF5bGlzdCk7XHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcclxuXHJcbiAgICAgICAgaWYocGxheWxpc3Qpe1xyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5zZXRQbGF5bGlzdChwbGF5bGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBsYXkoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBsYXkoKTtcclxuICAgIH1cclxuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGF1c2UoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2VlaygpIFwiKyBwb3NpdGlvbik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNlZWsocG9zaXRpb24pO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRQbGF5YmFja1JhdGUocGxheWVyQ29uZmlnLnNldERlZmF1bHRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQbGF5YmFja1JhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFF1YWxpdHlMZXZlbHMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRRdWFsaXR5KCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgXCIsIHF1YWxpdHlJbmRleCk7XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VzID0gcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW3RoYXQuZ2V0Q3VycmVudFF1YWxpdHkoKS5pbmRleF07XHJcbiAgICAgICAgbGV0IG5ld1NvdXJjZSA9IHNvdXJjZXNbcXVhbGl0eUluZGV4XTtcclxuICAgICAgICBsZXQgbGFzdFBsYXlQb3NpdGlvbiA9IHRoYXQuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgaXNTYW1lUHJvdmlkZXIgPSBwcm92aWRlckNvbnRyb2xsZXIuaXNTYW1lUHJvdmlkZXIoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKTtcclxuICAgICAgICAvLyBwcm92aWRlci5zZXJDdXJyZW50UXVhbGl0eSAtPiBwbGF5ZXJDb25maWcgc2V0dGluZyAtPiBsb2FkXHJcbiAgICAgICAgbGV0IHJlc1F1YWxpdHlJbmRleCA9IGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eShxdWFsaXR5SW5kZXgsIGlzU2FtZVByb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgaWYoIW5ld1NvdXJjZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBpc1NhbWVQcm92aWRlclwiLCBpc1NhbWVQcm92aWRlcik7XHJcblxyXG4gICAgICAgIC8vY2FwdGlvbk1hbmFnZXIuZmx1c2hDYXB0aW9uTGlzdChjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpKTtcclxuXHJcbiAgICAgICAgaWYoIWlzU2FtZVByb3ZpZGVyKXtcclxuICAgICAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknXSk7XHJcbiAgICAgICAgICAgIGluaXRQcm92aWRlcihsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXNRdWFsaXR5SW5kZXg7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qIENhcHRpb25zIDogVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IHZlcnNpb24uKi9cclxuICAgIC8qdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChpbmRleCkgPT57XHJcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLnNldEN1cnJlbnRDYXB0aW9uKGluZGV4KTtcclxuICAgICB9XHJcbiAgICAgdGhhdC5nZXRDdXJyZW50Q2FwdGlvbiA9ICgpID0+e1xyXG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpO1xyXG4gICAgIH1cclxuICAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT4ge1xyXG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xyXG4gICAgIH1cclxuICAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+IHtcclxuICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuYWRkQ2FwdGlvbigpO1xyXG4gICAgIH1cclxuICAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT4ge1xyXG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xyXG4gICAgIH0qL1xyXG5cclxuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEJ1ZmZlcigpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCkpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybjt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U3RhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnN0b3AgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc3RvcCgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIFwiKTtcclxuICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xyXG4gICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3ZpZGVyQ29udHJvbGxlciA9IG51bGw7XHJcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBwbGF5ZXJDb25maWcgPSBudWxsO1xyXG4gICAgICAgIGxhenlRdWV1ZSA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoYXQudHJpZ2dlcihERVNUUk9ZKTtcclxuICAgICAgICB0aGF0Lm9mZigpO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSAtIGxhenlRdWV1ZSwgY3VycmVudFByb3ZpZGVyLCBwcm92aWRlckNvbnRyb2xsZXIsIHBsYXlsaXN0TWFuYWdlciwgcGxheWVyQ29uZmlnLCBhcGkgZXZlbnQgZGVzdHJvZWQuIFwiKTtcclxuICAgICAgICBsb2dNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICBsb2dNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBPdmVuUGxheWVyU0RLLnJlbW92ZVBsYXllcih0aGF0LmdldENvbnRhaW5lcklkKCkpO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcGk7XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwaVJ0bXBFeHBhbnNpb24gPSBmdW5jdGlvbihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBleHRlcm5hbENhbGxiYWNrQ3JlZXAgOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5uYW1lICYmIHJlc3VsdC5kYXRhKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsKHJlc3VsdC5uYW1lLCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgaW5pdGlhbGl6ZXMgdGhlIGlucHV0IG9wdGlvbnMuXHJcbiAqIEBwYXJhbSAgIG9wdGlvbnNcclxuICpcclxuICogKi9cclxuY29uc3QgQ29uZmlndXJhdG9yID0gZnVuY3Rpb24ob3B0aW9ucyl7XHJcblxyXG4gICAgY29uc3QgY29tcG9zZVNvdXJjZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKXtcclxuICAgICAgICBjb25zdCBEZWZhdWx0cyA9IHtcclxuICAgICAgICAgICAgZGVmYXVsdFBsYXliYWNrUmF0ZTogMSxcclxuICAgICAgICAgICAgcGxheWJhY2tSYXRlQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzOiBbMC4yNSwgMC41LCAxLCAxLjUsIDJdLFxyXG4gICAgICAgICAgICBtdXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgdm9sdW1lOiA5MCxcclxuICAgICAgICAgICAgd2lkdGg6IDY0MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAzNjBcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VyY2FzZVZhbCA9IHZhbC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIodmFsKSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdpZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBzZXJpYWxpemUob3B0aW9uc1trZXldKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZVNpemUgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWwuc2xpY2UgJiYgdmFsLnNsaWNlKC0yKSA9PT0gJ3B4Jykge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdmFsLnNsaWNlKDAsIC0yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBldmFsdWF0ZUFzcGVjdFJhdGlvID0gZnVuY3Rpb24gKGFyLCB3aWR0aCkge1xyXG4gICAgICAgICAgICBpZiAod2lkdGgudG9TdHJpbmcoKS5pbmRleE9mKCclJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyICE9PSAnc3RyaW5nJyB8fCAhYXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgvXlxcZCpcXC4/XFxkKyUkLy50ZXN0KGFyKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYXIuaW5kZXhPZignOicpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB3ID0gcGFyc2VGbG9hdChhci5zdWJzdHIoMCwgaW5kZXgpKTtcclxuICAgICAgICAgICAgY29uc3QgaCA9IHBhcnNlRmxvYXQoYXIuc3Vic3RyKGluZGV4ICsgMSkpO1xyXG4gICAgICAgICAgICBpZiAodyA8PSAwIHx8IGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChoIC8gdyAqIDEwMCkgKyAnJSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlc2VyaWFsaXplKG9wdGlvbnMpO1xyXG4gICAgICAgIGxldCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0cywgb3B0aW9ucyk7XHJcbiAgICAgICAgY29uZmlnLndpZHRoID0gbm9ybWFsaXplU2l6ZShjb25maWcud2lkdGgpO1xyXG4gICAgICAgIGNvbmZpZy5oZWlnaHQgPSBub3JtYWxpemVTaXplKGNvbmZpZy5oZWlnaHQpO1xyXG4gICAgICAgIGNvbmZpZy5hc3BlY3RyYXRpbyA9IGV2YWx1YXRlQXNwZWN0UmF0aW8oY29uZmlnLmFzcGVjdHJhdGlvLCBjb25maWcud2lkdGgpO1xyXG5cclxuICAgICAgICBsZXQgcmF0ZUNvbnRyb2xzID0gY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzO1xyXG4gICAgICAgIGlmIChyYXRlQ29udHJvbHMpIHtcclxuICAgICAgICAgICAgbGV0IHJhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyYXRlQ29udHJvbHMpKSB7XHJcbiAgICAgICAgICAgICAgICByYXRlcyA9IHJhdGVDb250cm9scztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByYXRlcyA9IHJhdGVzLmZpbHRlcihyYXRlID0+IF8uaXNOdW1iZXIocmF0ZSkgJiYgcmF0ZSA+PSAwLjI1ICYmIHJhdGUgPD0gNClcclxuICAgICAgICAgICAgICAgIC5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJhdGVzLmluZGV4T2YoMSkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByYXRlcy5wdXNoKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJhdGVzLnNvcnQoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGVzID0gcmF0ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgfHwgY29uZmlnLnBsYXliYWNrUmF0ZXMuaW5kZXhPZihjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSkgPCAwKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGUgPSBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZTtcclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcuYXNwZWN0cmF0aW8pIHtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5hc3BlY3RyYXRpbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZpZ1BsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0O1xyXG4gICAgICAgIGlmICghY29uZmlnUGxheWxpc3QpIHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqID0gXy5waWNrKGNvbmZpZywgW1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICAgICAgICAndHlwZScsXHJcbiAgICAgICAgICAgICAgICAnbWVkaWFpZCcsXHJcbiAgICAgICAgICAgICAgICAnaW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgJ3NvdXJjZXMnLFxyXG4gICAgICAgICAgICAgICAgJ3RyYWNrcycsXHJcbiAgICAgICAgICAgICAgICAncHJlbG9hZCcsXHJcbiAgICAgICAgICAgICAgICAnZHVyYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ2hvc3QnLFxyXG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyxcclxuICAgICAgICAgICAgICAgICdzdHJlYW0nXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gWyBvYmogXTtcclxuICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShjb25maWdQbGF5bGlzdC5wbGF5bGlzdCkpIHtcclxuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5kdXJhdGlvbjtcclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNvbmZpZ3VyYXRvciBsb2FkZWQuXCIsIG9wdGlvbnMpO1xyXG4gICAgbGV0IGNvbmZpZyA9IGNvbXBvc2VTb3VyY2VPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIGxldCBhc3BlY3RyYXRpbyA9IGNvbmZpZy5hc3BlY3RyYXRpbyB8fCBcIjE2OjlcIjtcclxuICAgIGxldCBkZWJ1ZyA9IGNvbmZpZy5kZWJ1ZztcclxuICAgIGxldCBkZWZhdWx0UGxheWJhY2tSYXRlID0gY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgfHwgMTtcclxuICAgIGxldCBpbWFnZSA9IGNvbmZpZy5pbWFnZTtcclxuICAgIGxldCBwbGF5YmFja1JhdGVDb250cm9scyA9IGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyB8fCB0cnVlO1xyXG4gICAgbGV0IHBsYXliYWNrUmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcyB8fCBbMC41LCAxLCAxLjI1LCAxLjUsIDJdO1xyXG4gICAgbGV0IHBsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0IHx8IFtdO1xyXG4gICAgbGV0IHF1YWxpdHlMYWJlbCA9IGNvbmZpZy5xdWFsaXR5TGFiZWwgfHwgXCJcIjtcclxuICAgIGxldCByZXBlYXQgPSBjb25maWcucmVwZWF0IHx8IGZhbHNlO1xyXG4gICAgbGV0IHN0cmV0Y2hpbmcgPSBjb25maWcuc3RyZXRjaGluZyB8fCAndW5pZm9ybSc7XHJcblxyXG5cclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtyZXR1cm4gY29uZmlnO307XHJcblxyXG4gICAgdGhhdC5nZXRBc3BlY3RyYXRpbyA9KCk9PntyZXR1cm4gYXNwZWN0cmF0aW87fTtcclxuICAgIHRoYXQuc2V0QXNwZWN0cmF0aW8gPShhc3BlY3RyYXRpb18pPT57YXNwZWN0cmF0aW8gPSBhc3BlY3RyYXRpb187fTtcclxuXHJcbiAgICB0aGF0LmlzRGVidWcgPSgpPT57cmV0dXJuIGRlYnVnO307XHJcblxyXG4gICAgdGhhdC5nZXREZWZhdWx0UGxheWJhY2tSYXRlID0oKT0+e3JldHVybiBkZWZhdWx0UGxheWJhY2tSYXRlO307XHJcbiAgICB0aGF0LnNldERlZmF1bHRQbGF5YmFja1JhdGUgPShwbGF5YmFja1JhdGUpPT57ZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTsgcmV0dXJuIHBsYXliYWNrUmF0ZTt9O1xyXG5cclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxhYmVsID0gKCkgPT4ge3JldHVybiBxdWFsaXR5TGFiZWw7fTtcclxuICAgIHRoYXQuc2V0UXVhbGl0eUxhYmVsID0gKG5ld0xhYmVsKSA9PiB7cXVhbGl0eUxhYmVsID0gbmV3TGFiZWw7fTtcclxuXHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZXMgPSgpPT57cmV0dXJuIHBsYXliYWNrUmF0ZXM7fTtcclxuICAgIHRoYXQuaXNQbGF5YmFja1JhdGVDb250cm9scyA9KCk9PntyZXR1cm4gcGxheWJhY2tSYXRlQ29udHJvbHM7fTtcclxuXHJcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0oKT0+e3JldHVybiBwbGF5bGlzdDt9O1xyXG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0XyApPT57XHJcbiAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0Xykpe1xyXG4gICAgICAgICAgICBwbGF5bGlzdCA9IHBsYXlsaXN0XztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcGxheWxpc3QgPSBbcGxheWxpc3RfXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzUmVwZWF0ID0oKT0+e3JldHVybiByZXBlYXQ7fTtcclxuXHJcbiAgICB0aGF0LmdldFN0cmV0Y2hpbmcgPSgpPT57cmV0dXJuIHN0cmV0Y2hpbmc7fTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRvcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAzLi5cclxuICovXHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBtb2R1bGUgcHJvdmlkZSBjdXN0b20gZXZlbnRzLlxyXG4gKiBAcGFyYW0gICBvYmplY3QgICAgQW4gb2JqZWN0IHRoYXQgcmVxdWlyZXMgY3VzdG9tIGV2ZW50cy5cclxuICpcclxuICogKi9cclxuXHJcbmNvbnN0IEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKG9iamVjdCl7XHJcbiAgICBsZXQgdGhhdCA9IG9iamVjdDtcclxuICAgIGxldCBfZXZlbnRzID1bXTtcclxuXHJcbiAgICBjb25zdCB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzLCBjb250ZXh0KXtcclxuICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IGV2ZW50cy5sZW5ndGg7XHJcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgbGV0IGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBldmVudC5saXN0ZW5lci5hcHBseSggKCBldmVudC5jb250ZXh0IHx8IGNvbnRleHQgKSwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0Lm9uID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xyXG4gICAgICAgIChfZXZlbnRzW25hbWVdIHx8IChfZXZlbnRzW25hbWVdPVtdKSApLnB1c2goeyBsaXN0ZW5lcjogbGlzdGVuZXIgICwgY29udGV4dCA6IGNvbnRleHR9KTtcclxuICAgICAgICByZXR1cm4gdGhhdDtcclxuICAgIH07XHJcbiAgICB0aGF0LnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lKXtcclxuICAgICAgICBpZighX2V2ZW50cyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xyXG4gICAgICAgIGNvbnN0IGFsbEV2ZW50cyA9IF9ldmVudHMuYWxsO1xyXG5cclxuICAgICAgICBpZihldmVudHMpe1xyXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGV2ZW50cywgYXJncywgdGhhdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFsbEV2ZW50cyl7XHJcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoYWxsRXZlbnRzLCBhcmd1bWVudHMsIHRoYXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcclxuICAgICAgICBpZighX2V2ZW50cyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghbmFtZSAmJiAhbGlzdGVuZXIgJiYgIWNvbnRleHQpICB7XHJcbiAgICAgICAgICAgIF9ldmVudHMgPSBbXTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyhfZXZlbnRzKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xyXG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXRhaW4gPSBfZXZlbnRzW25hbWVdID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgIHx8IGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5saXN0ZW5lciAgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLl9saXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8KGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZlbnQuY29udGV4dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgX2V2ZW50c1tuYW1lXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhhdDtcclxuICAgIH07XHJcbiAgICB0aGF0Lm9uY2UgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBjb25zdCBvbmNlQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50KyspIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0Lm9mZihuYW1lLCBvbmNlQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgb25jZUNhbGxiYWNrLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgICAgIHJldHVybiB0aGF0Lm9uKG5hbWUsIG9uY2VDYWxsYmFjaywgY29udGV4dCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7XHJcbiIsImltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgZXhlY3V0ZXMgdGhlIGlucHV0IGNvbW1hbmRzIGF0IGEgc3BlY2lmaWMgcG9pbnQgaW4gdGltZS5cbiAqIEBwYXJhbSAgIGluc3RhbmNlXG4gKiBAcGFyYW0gICBxdWV1ZWRDb21tYW5kc1xuICogKi9cbmNvbnN0IExhenlDb21tYW5kRXhlY3V0b3IgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIHF1ZXVlZENvbW1hbmRzKSB7XG4gICAgbGV0IGNvbW1hbmRRdWV1ZSA9IFtdO1xuICAgIGxldCB1bmRlY29yYXRlZE1ldGhvZHMgPSB7fTtcbiAgICBsZXQgZXhlY3V0ZU1vZGUgPSBmYWxzZTtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgbG9hZGVkLlwiKTtcbiAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IGluc3RhbmNlW2NvbW1hbmRdO1xuICAgICAgICB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF0gPSBtZXRob2QgfHwgZnVuY3Rpb24oKXt9O1xuXG4gICAgICAgIGluc3RhbmNlW2NvbW1hbmRdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgICAgICAgaWYgKCFleGVjdXRlTW9kZSkge1xuICAgICAgICAgICAgICAgIC8vY29tbWFuZFF1ZXVlLnB1c2goeyBjb21tYW5kLCBhcmdzIH0pO1xuICAgICAgICAgICAgICAgIHRoYXQuYWRkUXVldWUoY29tbWFuZCwgYXJncylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzKCk7XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2QuYXBwbHkodGhhdCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuICAgIHZhciBleGVjdXRlUXVldWVkQ29tbWFuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdoaWxlIChjb21tYW5kUXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgeyBjb21tYW5kLCBhcmdzIH0gPSBjb21tYW5kUXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICh1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF0gfHwgaW5zdGFuY2VbY29tbWFuZF0pLmFwcGx5KGluc3RhbmNlLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoYXQuc2V0RXhlY3V0ZU1vZGUgPSAobW9kZSkgPT4ge1xuICAgICAgICBleGVjdXRlTW9kZSA9IG1vZGU7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBzZXRFeGVjdXRlTW9kZSgpXCIsIG1vZGUpO1xuICAgIH07XG4gICAgdGhhdC5nZXRVbmRlY29yYXRlZE1ldGhvZHMgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0VW5kZWNvcmF0ZWRNZXRob2RzKClcIiwgdW5kZWNvcmF0ZWRNZXRob2RzKTtcbiAgICAgICAgcmV0dXJuIHVuZGVjb3JhdGVkTWV0aG9kcztcbiAgICB9XG4gICAgdGhhdC5nZXRRdWV1ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRRdWV1ZSgpXCIsIGdldFF1ZXVlKTtcbiAgICAgICAgcmV0dXJuIGNvbW1hbmRRdWV1ZTtcbiAgICB9XG4gICAgdGhhdC5hZGRRdWV1ZSA9IGZ1bmN0aW9uKGNvbW1hbmQsIGFyZ3Mpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogYWRkUXVldWUoKVwiLCBjb21tYW5kLCBhcmdzKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLnB1c2goeyBjb21tYW5kLCBhcmdzIH0pO1xuICAgIH1cblxuICAgIHRoYXQuZmx1c2ggPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZmx1c2goKVwiKTtcbiAgICAgICAgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzKCk7XG4gICAgfTtcbiAgICB0aGF0LmVtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBlbXB0eSgpXCIpO1xuICAgICAgICBjb21tYW5kUXVldWUubGVuZ3RoID0gMDtcbiAgICB9O1xuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBvZmYoKVwiKTtcbiAgICAgICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRdID0gbWV0aG9kO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIC8vUnVuIG9uY2UgYXQgdGhlIGVuZFxuICAgIHRoYXQucmVtb3ZlQW5kRXhjdXRlT25jZSA9IGZ1bmN0aW9uKGNvbW1hbmRfKXtcbiAgICAgICAgbGV0IGNvbW1hbmRRdWV1ZUl0ZW0gPSBfLmZpbmRXaGVyZShjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHJlbW92ZUFuZEV4Y3V0ZU9uY2UoKVwiLCBjb21tYW5kXyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5zcGxpY2UoXy5maW5kSW5kZXgoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSksIDEpO1xuXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kX107XG4gICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInJlbW92ZUNvbW1hbmQoKVwiKTtcbiAgICAgICAgICAgIGlmKGNvbW1hbmRRdWV1ZUl0ZW0pe1xuICAgICAgICAgICAgICAgIChtZXRob2R8fCBpbnN0YW5jZVtjb21tYW5kX10pLmFwcGx5KGluc3RhbmNlLCBjb21tYW5kUXVldWVJdGVtLmFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF9dID0gbWV0aG9kO1xuICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kX107XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBkZXN0cm95KClcIik7XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgICAgIHRoYXQuZW1wdHkoKTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBMYXp5Q29tbWFuZEV4ZWN1dG9yOyIsImltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNofSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBmaW5kcyB0aGUgcHJvdmlkZXIgdGhhdCBtYXRjaGVzIHRoZSBpbnB1dCBzb3VyY2UuXHJcbiAqIEBwYXJhbVxyXG4gKiAqL1xyXG5cclxuY29uc3QgU3VwcG9ydENoZWNrZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgbG9hZGVkLlwiKTtcclxuICAgIGNvbnN0IHN1cHBvcnRMaXN0ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2h0bWw1JyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWFjOiAnYXVkaW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtcDQ6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbTR2OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtb3Y6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wZWc6ICdhdWRpby9tcGVnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ3Y6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2dhOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICB2b3JiaXM6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcclxuICAgICAgICAgICAgICAgICAgICBmNGE6ICd2aWRlby9hYWMnLFxyXG4gICAgICAgICAgICAgICAgICAgIG0zdTg6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhsczogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgaWYoIXR5cGUpe3JldHVybiBmYWxzZTt9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IHNvdXJjZS5taW1lVHlwZSB8fCBNaW1lVHlwZXNbdHlwZV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbWltZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdmlkZW8uY2FuUGxheVR5cGUobWltZVR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd3ZWJydGMnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdkYXNoJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9tcGQgYXBwbGljYXRpb24vZGFzaCt4bWxcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0Rhc2goZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnaGxzJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgbWV0aG9kIGZyb20gaGxzLmpzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0hsc1N1cHBvcnQgPSAoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TWVkaWFTb3VyY2UoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5NZWRpYVNvdXJjZSB8fCB3aW5kb3cuV2ViS2l0TWVkaWFTb3VyY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lZGlhU291cmNlID0gZ2V0TWVkaWFTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyID0gd2luZG93LlNvdXJjZUJ1ZmZlciB8fCB3aW5kb3cuV2ViS2l0U291cmNlQnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1R5cGVTdXBwb3J0ZWQgPSBtZWRpYVNvdXJjZSAmJiB0eXBlb2YgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkID09PSAnZnVuY3Rpb24nICYmIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSxtcDRhLjQwLjJcIicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBTb3VyY2VCdWZmZXIgaXMgZXhwb3NlZCBlbnN1cmUgaXRzIEFQSSBpcyB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNhZmFyaSBhbmQgb2xkIHZlcnNpb24gb2YgQ2hyb21lIGRvZSBub3QgZXhwb3NlIFNvdXJjZUJ1ZmZlciBnbG9iYWxseSBzbyBjaGVja2luZyBTb3VyY2VCdWZmZXIucHJvdG90eXBlIGlzIGltcG9zc2libGVcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyVmFsaWRBUEkgPSAhc291cmNlQnVmZmVyIHx8IHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUuYXBwZW5kQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLnJlbW92ZSA9PT0gJ2Z1bmN0aW9uJztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFpc1R5cGVTdXBwb3J0ZWQgJiYgISFzb3VyY2VCdWZmZXJWYWxpZEFQSTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSB0aGlzICchIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpJyBpZiB5b3Ugd2FudCB0byB1c2UgaGxzanMuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNIbHNTdXBwb3J0KCkgJiYgISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAncnRtcCcsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSA9IChzb3J1Y2VfKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoKVwiLCBzb3J1Y2VfKTtcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSAoc29ydWNlXyA9PT0gT2JqZWN0KHNvcnVjZV8pKSA/IHNvcnVjZV8gOiB7fTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3VwcG9ydExpc3QubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgaWYoc3VwcG9ydExpc3RbaV0uY2hlY2tTdXBwb3J0KHNvdXJjZSkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRMaXN0W2ldLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QgPSAocGxheWxpc3RfKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QoKVwiLCBwbGF5bGlzdF8pO1xyXG4gICAgICAgIGxldCBzdXBwb3J0TmFtZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gcGxheWxpc3RfLmxlbmd0aDsgaS0tOykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gcGxheWxpc3RfW2ldO1xyXG4gICAgICAgICAgICBsZXQgc291cmNlID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGl0ZW0uc291cmNlcy5sZW5ndGg7IGogKyspe1xyXG4gICAgICAgICAgICAgICAgc291cmNlID0gaXRlbS5zb3VyY2VzW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0TmFtZXMucHVzaChzdXBwb3J0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3VwcG9ydE5hbWVzO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3VwcG9ydENoZWNrZXI7XHJcbiIsIi8vIFNUQVRFXHJcbmV4cG9ydCBjb25zdCBTVEFURV9CVUZGRVJJTkcgPSBcImJ1ZmZlcmluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfSURMRSA9IFwiaWRsZVwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSBcImNvbXBsZXRlXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9QQVVTRUQgPSBcInBhdXNlZFwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfUExBWUlORyA9IFwicGxheWluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSBcImVycm9yXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9MT0FESU5HID0gXCJsb2FkaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9TVEFMTEVEID0gXCJzdGFsbGVkXCI7XHJcblxyXG5cclxuLy8gUFJPVklERVJcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hUTUw1ID0gXCJodG1sNVwiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfV0VCUlRDID0gXCJ3ZWJydGNcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0RBU0ggPSBcImRhc2hcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hMUyA9IFwiaGxzXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9SVE1QID0gXCJydG1wXCI7XHJcblxyXG4vLyBFVkVOVFNcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcclxuZXhwb3J0IGNvbnN0IFJFQURZID0gXCJyZWFkeVwiO1xyXG5leHBvcnQgY29uc3QgREVTVFJPWSA9IFwiZGVzdHJveVwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLID0gXCJzZWVrXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUl9GVUxMID0gXCJidWZmZXJGdWxsXCI7XHJcbmV4cG9ydCBjb25zdCBESVNQTEFZX0NMSUNLID0gXCJkaXNwbGF5Q2xpY2tcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTE9BREVEID0gXCJsb2FkZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gXCJzZWVrZWRcIjtcclxuZXhwb3J0IGNvbnN0IE5FVFdPUktfVU5TVEFCTEVEID0gXCJ1bnN0YWJsZU5ldHdvcmtcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBFUlJPUiA9IFwiZXJyb3JcIjtcclxuXHJcbi8vIFNUQVRFIE9GIFBMQVlFUlxyXG5leHBvcnQgY29uc3QgUExBWUVSX1NUQVRFID0gXCJzdGF0ZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1BBVVNFID0gXCJwYXVzZVwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1BMQVkgPSBcInBsYXlcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9IFwiYnVmZmVyQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9USU1FID0gXCJ0aW1lXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1JBVEVfQ0hBTkdFID0gXCJyYXRlY2hhbmdlXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9IFwidm9sdW1lQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9NVVRFID0gXCJtdXRlXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX01FVEEgPSBcIm1ldGFDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMUyA9IFwicXVhbGl0eUxldmVsQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9MRVZFTF9DSEFOR0VEID0gXCJjdXJyZW50UXVhbGl0eUxldmVsQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUJBQ0tfUkFURV9DSEFOR0VEID0gXCJwbGF5YmFja1JhdGVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQgPSBcImN1ZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DSEFOR0VEID0gXCJjYXB0aW9uQ2hhbmdlZFwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBJTklUX0VSUk9SID0gMTAwO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fRVJST1IgPSAzMDA7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IgPSAzMDE7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SID0gMzAyO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SID0gMzAzO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0ZJTEVfRVJST1IgPSAzMDQ7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ0FQVElPTl9FUlJPUiA9IDMwNTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfRVJST1IgPSA1MDE7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCA9IDUwMjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiA9IDUwMztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SID0gNTA0O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SID0gNTA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiA9IDUwNjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XID0gNTEwO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5pbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaCB9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9uICx0cmltfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3RyaW5nc1wiO1xyXG5pbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcIi4uL1N1cHBvcnRDaGVja2VyXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIFBsYXlsaXN0IG9yIFNvdXJjZXMuXHJcbiAqIEBwYXJhbVxyXG4gKlxyXG4gKiAqL1xyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCBjdXJyZW50UGxheWxpc3QgPSBbXTtcclxuICAgIGxldCBzdXBwb3J0Q2hlY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGxvYWRlZC5cIik7XHJcblxyXG4gICAgY29uc3QgbWFrZVByZXR0eVNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZV8pe1xyXG4gICAgICAgIGlmICghc291cmNlXyB8fCAhc291cmNlXy5maWxlICYmICEoc291cmNlXy5ob3N0IHx8IHNvdXJjZV8uYXBwbGljYXRpb24gfHwgc291cmNlXy5zdHJlYW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2UgPSBPYmplY3QuYXNzaWduKHt9LCB7ICdkZWZhdWx0JzogZmFsc2UgfSwgc291cmNlXyk7XHJcbiAgICAgICAgc291cmNlLmZpbGUgPSB0cmltKCcnICsgc291cmNlLmZpbGUpO1xyXG5cclxuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS5maWxlID0gc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL3N0cmVhbS9cIiArIHNvdXJjZS5zdHJlYW07XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuaG9zdDtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5hcHBsaWNhdGlvbjtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5zdHJlYW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtaW1ldHlwZVJlZ0V4ID0gL15bXi9dK1xcLyg/OngtKT8oW14vXSspJC87XHJcblxyXG4gICAgICAgIGlmIChtaW1ldHlwZVJlZ0V4LnRlc3Qoc291cmNlLnR5cGUpKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHR5cGUgaXMgZ2l2ZW4gYXMgYSBtaW1ldHlwZVxyXG4gICAgICAgICAgICBzb3VyY2UubWltZVR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBzb3VyY2UudHlwZS5yZXBsYWNlKG1pbWV0eXBlUmVnRXgsICckMScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaXNSdG1wKHNvdXJjZS5maWxlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzV2ViUlRDKHNvdXJjZS5maWxlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3dlYnJ0Yyc7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNEYXNoKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdkYXNoJztcclxuICAgICAgICB9ZWxzZSBpZiAoIXNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gZXh0cmFjdEV4dGVuc2lvbihzb3VyY2UuZmlsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG5vcm1hbGl6ZSB0eXBlc1xyXG4gICAgICAgIHN3aXRjaCAoc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZuZC5hcHBsZS5tcGVndXJsJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2hscyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbTRhJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2FhYyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc21pbCc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZVtrZXldID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzb3VyY2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIHNldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBjb25zdCBwcmV0dGllZFBsYXlsaXN0ID0gKF8uaXNBcnJheShwbGF5bGlzdCkgPyBwbGF5bGlzdCA6IFtwbGF5bGlzdF0pLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShpdGVtLnRyYWNrcykpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RJdGVtID0gT2JqZWN0LmFzc2lnbih7fSx7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcclxuICAgICAgICAgICAgICAgIHRyYWNrczogW11cclxuICAgICAgICAgICAgfSwgaXRlbSApO1xyXG5cclxuICAgICAgICAgICAgaWYoKHBsYXlsaXN0SXRlbS5zb3VyY2VzID09PSBPYmplY3QocGxheWxpc3RJdGVtLnNvdXJjZXMpKSAmJiAhXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlcyldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gaXRlbS5sZXZlbHM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5U291cmNlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSAoZGVmYXVsdFNvdXJjZS50b1N0cmluZygpID09PSAndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzb3VyY2UgZG9lc24ndCBoYXZlIGEgbGFiZWwsIG51bWJlciBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKCFwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0udHlwZStcIi1cIitpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJldHR5U291cmNlID0gbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0Q2hlY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UocHJldHR5U291cmNlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBwcmV0dHlTb3VyY2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gcGxheWxpc3RJdGVtLnNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhIXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZhdWx0IOqwgCDsl4bsnYTrlYwgd2VicnRj6rCAIOyeiOuLpOuptCB3ZWJydGMgZGVmYXVsdCA6IHRydWXroZwg7J6Q64+ZIOyEpOyglVxyXG4gICAgICAgICAgICAvKmxldCBoYXZlRGVmYXVsdCA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLmRlZmF1bHQgPT0gdHJ1ZTt9KTtcclxuICAgICAgICAgICAgbGV0IHdlYnJ0Y1NvdXJjZSA9IFtdO1xyXG4gICAgICAgICAgICBpZighaGF2ZURlZmF1bHQpe1xyXG4gICAgICAgICAgICAgICAgd2VicnRjU291cmNlID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UudHlwZSA9PSBcIndlYnJ0Y1wiO30pO1xyXG4gICAgICAgICAgICAgICAgaWYod2VicnRjU291cmNlKXtcclxuICAgICAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UuZGVmYXVsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0qL1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS50cmFja3MpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RJdGVtLmNhcHRpb25zKSl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5jb25jYXQocGxheWxpc3RJdGVtLmNhcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBwbGF5bGlzdEl0ZW0uY2FwdGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLm1hcChmdW5jdGlvbih0cmFjayl7XHJcbiAgICAgICAgICAgICAgICBpZighdHJhY2sgfHwgIXRyYWNrLmZpbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2tpbmQnOiAnY2FwdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0JzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sIHRyYWNrKTtcclxuICAgICAgICAgICAgfSkuZmlsdGVyKHRyYWNrID0+ICEhdHJhY2spO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBsYXlsaXN0SXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjdXJyZW50UGxheWxpc3QgPSBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgICAgIHJldHVybiBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldFBsYXlsaXN0KCkgXCIsIGN1cnJlbnRQbGF5bGlzdCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5bGlzdDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIC8vV2UgZG8gbm90IHN1cHBvcnQgXCJQTEFZTElTVFwiIG5vdCB5ZXQuIFNvIHRoaXMgcmV0dXJucyBwbGF5bGlzdCBvZiAwLlxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRDdXJyZW50U291cmNlcygpIFwiLCBjdXJyZW50UGxheWxpc3RbMF0uc291cmNlcyk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5bGlzdFswXS5zb3VyY2VzO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJpbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcImFwaS9TdXBwb3J0Q2hlY2tlclwiO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXHJcbiAqIEBwYXJhbVxyXG4gKiAqL1xyXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBzdXBwb3J0Q2hhY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XHJcbiAgICBjb25zdCBQcm92aWRlcnMgPSB7fTtcclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCByZWdpc3RlUHJvdmlkZXIgPSAobmFtZSwgcHJvdmlkZXIpID0+e1xyXG4gICAgICAgIGlmKFByb3ZpZGVyc1tuYW1lXSl7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcclxuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPXtcclxuICAgICAgICBodG1sNTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9IdG1sNSddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvSHRtbDUnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcImh0bWw1XCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5IdG1sNSdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdlYnJ0YyA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9XZWJSVEMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L1dlYlJUQycpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwid2VicnRjXCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhc2ggOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvRGFzaCddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvRGFzaCcpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiZGFzaFwiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGxzIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L0hscyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvSGxzJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJobHNcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnRtcCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9mbGFzaC9SdG1wJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9mbGFzaC9SdG1wJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJydG1wXCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhhdC5sb2FkUHJvdmlkZXJzID0gKHBsYXlsaXN0KSA9PntcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KHBsYXlsaXN0KTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZFByb3ZpZGVycygpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzKTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXHJcbiAgICAgICAgICAgIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMuZmlsdGVyKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISFQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdO1xyXG4gICAgICAgICAgICB9KS5tYXAoZnVuY3Rpb24ocHJvdmlkZXJOYW1lKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZmluZEJ5TmFtZSA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGZpbmRCeU5hbWUoKSBcIiwgbmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZSA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBnZXRQcm92aWRlckJ5U291cmNlKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBpc1NhbWVQcm92aWRlcigpIFwiLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKSApO1xyXG4gICAgICAgIHJldHVybiBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgPT09IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xyXG4iLCJpbXBvcnQgQVBJIGZyb20gJ2FwaS9BcGknO1xyXG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tICd1dGlscy92YWxpZGF0b3InO1xyXG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcclxuaW1wb3J0IExhJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xyXG5cclxuXHJcbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5zZGsuanMnKTtcclxuXHJcbi8qKlxyXG4gKiBNYWluIE92ZW5QbGF5ZXJTREsgb2JqZWN0XHJcbiAqL1xyXG5jb25zdCBPdmVuUGxheWVyU0RLID0gd2luZG93Lk92ZW5QbGF5ZXJTREsgPSB7fTtcclxuXHJcbmNvbnN0IHBsYXllckxpc3QgPSBPdmVuUGxheWVyU0RLLnBsYXllckxpc3QgPSBbXTtcclxuXHJcbmV4cG9ydCBjb25zdCBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcclxuXHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG5cclxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xyXG5cclxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVyKTtcclxuICAgIH0gZWxzZSBpZiAoY29udGFpbmVyLm5vZGVUeXBlKSB7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyRWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBwbGF5ZXIgaW5zdGFuY2UgYW5kIHJldHVybiBpdC5cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZyB8IGRvbSBlbGVtZW50fSBjb250YWluZXIgIElkIG9mIGNvbnRhaW5lciBlbGVtZW50IG9yIGNvbnRhaW5lciBlbGVtZW50XHJcbiAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgIFRoZSBvcHRpb25zXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmNyZWF0ZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgb3B0aW9ucykge1xyXG5cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBBUEkoY29udGFpbmVyRWxlbWVudCk7XHJcbiAgICBwbGF5ZXJJbnN0YW5jZS5pbml0KG9wdGlvbnMpO1xyXG5cclxuICAgIHBsYXllckxpc3QucHVzaChwbGF5ZXJJbnN0YW5jZSk7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBsaXN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuICAgICB7YXJyYXl9ICBUaGUgcGxheWVyIGxpc3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4gcGxheWVyTGlzdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgY29udGFpbmVyIGlkLlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSAgY29udGFpbmVySWQgIFRoZSBjb250YWluZXIgaWRlbnRpZmllclxyXG4gKiBAcmV0dXJuICAgICB7b2JlamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUNvbnRhaW5lcklkID0gZnVuY3Rpb24oY29udGFpbmVySWQpIHtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGxheWVyTGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGluZGV4LlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcclxuICogQHJldHVybiAgICAge29iamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IHBsYXllckxpc3RbaW5kZXhdO1xyXG5cclxuICAgIGlmIChwbGF5ZXJJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIHBsYXllciBpbnN0YW5jZSBieSBwbGF5ZXJJZC5cclxuICpcclxuICogQHBhcmFtICAgICAge3BsYXllcklkfSAgaWRcclxuICogQHJldHVybiAgICAge251bGx9XHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLnJlbW92ZVBsYXllciA9IGZ1bmN0aW9uKHBsYXllcklkKSB7XHJcbiAgICBjb25zb2xlLmxvZyhwbGF5ZXJJZCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IHBsYXllcklkKSB7XHJcblxyXG4gICAgICAgICAgICBwbGF5ZXJMaXN0LnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIHdlYnJ0YyBzb3VyY2UgZm9yIHBsYXllciBzb3VyY2UgdHlwZS5cclxuICpcclxuICogQHBhcmFtICAgICAge09iamVjdCB8IEFycmF5fSAgc291cmNlICAgd2VicnRjIHNvdXJjZVxyXG4gKiBAcmV0dXJuICAgICB7QXJyYXl9ICBQbGF5ZXIgc291cmNlIE9iZWpjdC5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2VuZXJhdGVXZWJydGNVcmxzID0gZnVuY3Rpb24oc291cmNlcykge1xyXG4gICAgcmV0dXJuIChfLmlzQXJyYXkoc291cmNlcykgPyBzb3VyY2VzIDogW3NvdXJjZXNdKS5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCl7XHJcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgaXNXZWJSVEMoc291cmNlLmhvc3QpICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcclxuICAgICAgICAgICAgcmV0dXJuIHtmaWxlIDogc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL1wiICsgc291cmNlLnN0cmVhbSwgdHlwZSA6IFwid2VicnRjXCIsIGxhYmVsIDogc291cmNlLmxhYmVsID8gc291cmNlLmxhYmVsIDogXCJ3ZWJydGMtXCIrKGluZGV4KzEpIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPdmVuUGxheWVyU0RLO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIzLi5cclxuICovXHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgSXQgd2FzIHJlcGxhY2UganF1ZXJ5J3Mgc2VsZWN0b3IuIEl0IE9mdGVuIHVzZWQgYnkgT3ZlblRlbXBsYXRlLiAoL3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZS5qcylcclxuICogQHBhcmFtICAgc2VsZWN0b3JPckVsZW1lbnQgIHN0cmluZyBvciBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgTGEkID0gZnVuY3Rpb24oc2VsZWN0b3JPckVsZW1lbnQpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgY29uc3QgcmV0dXJuTm9kZSA9IGZ1bmN0aW9uKCRlbGVtZW50ICwgc2VsZWN0b3Ipe1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9ICAkZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICBpZihub2RlTGlzdC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3RbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgbGV0ICRlbGVtZW50ID0gXCJcIjtcclxuXHJcbiAgICBpZiggXy5ldmVyeShzZWxlY3Rvck9yRWxlbWVudCwgZnVuY3Rpb24oaXRlbSl7cmV0dXJuIF8uaXNFbGVtZW50KGl0ZW0pfSkpe1xyXG4gICAgICAgICRlbGVtZW50ID0gc2VsZWN0b3JPckVsZW1lbnQ7XHJcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJkb2N1bWVudFwiKXtcclxuICAgICAgICAkZWxlbWVudCA9IGRvY3VtZW50O1xyXG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwid2luZG93XCIpe1xyXG4gICAgICAgICRlbGVtZW50ID0gd2luZG93O1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgJGVsZW1lbnQgPSByZXR1cm5Ob2RlKGRvY3VtZW50LCBzZWxlY3Rvck9yRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmKCEkZWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5maW5kID0gKHNlbGVjdG9yKSA9PntcclxuICAgICAgICByZXR1cm4gTGEkKHJldHVybk5vZGUoJGVsZW1lbnQsIHNlbGVjdG9yKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY3NzID0gKG5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgaWYoJGVsZW1lbnQubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFkZENsYXNzID0gKG5hbWUpID0+e1xyXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWVzID0gJGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgaWYoY2xhc3NOYW1lcy5pbmRleE9mKG5hbWUpID09PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBuYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmVDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZiAoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lID0gJGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIG5hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmVBdHRyaWJ1dGUgPSAoYXR0ck5hbWUpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNob3cgPSAoKSA9PntcclxuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5oaWRlID0gKCkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hcHBlbmQgPSAoaHRtbENvZGUpID0+e1xyXG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCArPSBodG1sQ29kZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC50ZXh0ID0gKHRleHQpID0+IHsgLy9JRTgrXHJcbiAgICAgICAgaWYodGV4dCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LnRleHRDb250ZW50O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5oYXNDbGFzcyA9IChuYW1lKSA9PiB7IC8vSUU4K1xyXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBuYW1lICsgJyggfCQpJywgJ2dpJykudGVzdCgkZWxlbWVudC5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXMgPSAoJHRhcmdldEVsZW1lbnQpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQgPT09ICR0YXJnZXRFbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0Lm9mZnNldCA9ICgpID0+eyAgICAvL0lFOCtcclxuICAgICAgICB2YXIgcmVjdCA9ICRlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC53aWR0aCA9ICgpID0+IHsgICAgLy9JRTgrXHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmhlaWdodCA9ICgpID0+IHsgICAvL0lFOCtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmF0dHIgPSAoYXR0cikgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVwbGFjZSA9IChodG1sKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVwbGFjZVdpdGgoaHRtbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWwpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5hcHBlbmRDaGlsZChodG1sKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2hpbGQgPSAoKSA9PiB7XHJcbiAgICAgICAgd2hpbGUgKCRlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDaGlsZCgkZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jbG9zZXN0ID0gKHNlbGVjdG9yU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgbGV0IGNsb3Nlc3RFbGVtZW50ID0gJGVsZW1lbnQuY2xvc2VzdChzZWxlY3RvclN0cmluZyk7XHJcbiAgICAgICAgaWYoY2xvc2VzdEVsZW1lbnQpe1xyXG4gICAgICAgICAgICByZXR1cm4gTGEkKGNsb3Nlc3RFbGVtZW50KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhJDtcclxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMjQuLlxuICovXG5cbmNvbnN0IGxvZ2dlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBwcmV2Q29uc29sZUxvZyA9IG51bGw7XG5cbiAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogd2luZG93Wydjb25zb2xlJ11bJ2xvZyddfTtcblxuICAgIHRoYXQuZW5hYmxlID0gKCkgPT57XG4gICAgICAgIGlmKHByZXZDb25zb2xlTG9nID09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IHByZXZDb25zb2xlTG9nO1xuICAgIH07XG4gICAgdGhhdC5kaXNhYmxlID0gKCkgPT57XG4gICAgICAgIHByZXZDb25zb2xlTG9nID0gY29uc29sZS5sb2c7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IGZ1bmN0aW9uKCl7fTtcbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyOyIsImltcG9ydCBfIGZyb20gJy4vdW5kZXJzY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmltKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xufVxuXG4vKipcbiAqIGV4dHJhY3RFeHRlbnNpb25cbiAqXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSBwYXRoIGZvciB1cmxcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBFeHRlbnNpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHRlbnNpb24gPSBmdW5jdGlvbihwYXRoKSB7XG4gICAgaWYoIXBhdGggfHwgcGF0aC5zdWJzdHIoMCw0KT09J3J0bXAnKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCkge1xuICAgICAgICBsZXQgZXh0ZW5zaW9uID0gXCJcIjtcbiAgICAgICAgaWYgKCgvWygsXWZvcm1hdD1tcGQtL2kpLnRlc3QocGF0aCkpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtcGQnO1xuICAgICAgICB9ZWxzZSBpZiAoKC9bKCxdZm9ybWF0PW0zdTgtL2kpLnRlc3QocGF0aCkpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtM3U4JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uO1xuICAgIH1cblxuICAgIGxldCBhenVyZWRGb3JtYXQgPSBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCk7XG4gICAgaWYoYXp1cmVkRm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBhenVyZWRGb3JtYXQ7XG4gICAgfVxuICAgIHBhdGggPSBwYXRoLnNwbGl0KCc/JylbMF0uc3BsaXQoJyMnKVswXTtcbiAgICBpZihwYXRoLmxhc3RJbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLicpICsgMSwgcGF0aC5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbn07XG5cblxuLyoqXG4gKiBuYXR1cmFsSG1zXG4gKlxuICogQHBhcmFtICAgICAge251bWJlciB8IHN0cmluZ30gIHNlY29uZCAgVGhlIHNlY29uZFxuICogQHJldHVybiAgICAge3N0cmluZ30gIGZvcm1hdHRlZCBTdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5hdHVyYWxIbXMoc2Vjb25kKSB7XG4gICAgbGV0IHNlY051bSA9IHBhcnNlSW50KHNlY29uZCwgMTApO1xuICAgIGxldCBob3VycyAgID0gTWF0aC5mbG9vcihzZWNOdW0gLyAzNjAwKTtcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY051bSAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcbiAgICBsZXQgc2Vjb25kcyA9IHNlY051bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XG5cbiAgICBpZiAoaG91cnMgPiAwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxuICAgIGlmIChzZWNvbmRzIDwgMTApIHtzZWNvbmRzID0gXCIwXCIrc2Vjb25kczt9XG5cbiAgICBpZiAoaG91cnMgPiAwKSB7XG4gICAgICAgIHJldHVybiBob3VycysnOicrbWludXRlcysnOicrc2Vjb25kcztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWludXRlcysnOicrc2Vjb25kcztcbiAgICB9XG59IiwiLy8gICAgIFVuZGVyc2NvcmUuanMgMS45LjFcclxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXHJcbi8vICAgICAoYykgMjAwOS0yMDE4IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXHJcbi8vICAgICBVbmRlcnNjb3JlIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG4hZnVuY3Rpb24oKXt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZiYmc2VsZnx8XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbCYmZ2xvYmFsfHx0aGlzfHx7fSxyPW4uXyxlPUFycmF5LnByb3RvdHlwZSxvPU9iamVjdC5wcm90b3R5cGUscz1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sP1N5bWJvbC5wcm90b3R5cGU6bnVsbCx1PWUucHVzaCxjPWUuc2xpY2UscD1vLnRvU3RyaW5nLGk9by5oYXNPd25Qcm9wZXJ0eSx0PUFycmF5LmlzQXJyYXksYT1PYmplY3Qua2V5cyxsPU9iamVjdC5jcmVhdGUsZj1mdW5jdGlvbigpe30saD1mdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIGg/bjp0aGlzIGluc3RhbmNlb2YgaD92b2lkKHRoaXMuX3dyYXBwZWQ9bik6bmV3IGgobil9O1widW5kZWZpbmVkXCI9PXR5cGVvZiBleHBvcnRzfHxleHBvcnRzLm5vZGVUeXBlP24uXz1oOihcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUuZXhwb3J0cyYmKGV4cG9ydHM9bW9kdWxlLmV4cG9ydHM9aCksZXhwb3J0cy5fPWgpLGguVkVSU0lPTj1cIjEuOS4xXCI7dmFyIHYseT1mdW5jdGlvbih1LGksbil7aWYodm9pZCAwPT09aSlyZXR1cm4gdTtzd2l0Y2gobnVsbD09bj8zOm4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHUuY2FsbChpLG4pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gdS5jYWxsKGksbixyLHQpfTtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB1LmNhbGwoaSxuLHIsdCxlKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHUuYXBwbHkoaSxhcmd1bWVudHMpfX0sZD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguaXRlcmF0ZWUhPT12P2guaXRlcmF0ZWUobixyKTpudWxsPT1uP2guaWRlbnRpdHk6aC5pc0Z1bmN0aW9uKG4pP3kobixyLHQpOmguaXNPYmplY3QobikmJiFoLmlzQXJyYXkobik/aC5tYXRjaGVyKG4pOmgucHJvcGVydHkobil9O2guaXRlcmF0ZWU9dj1mdW5jdGlvbihuLHIpe3JldHVybiBkKG4sciwxLzApfTt2YXIgZz1mdW5jdGlvbih1LGkpe3JldHVybiBpPW51bGw9PWk/dS5sZW5ndGgtMToraSxmdW5jdGlvbigpe2Zvcih2YXIgbj1NYXRoLm1heChhcmd1bWVudHMubGVuZ3RoLWksMCkscj1BcnJheShuKSx0PTA7dDxuO3QrKylyW3RdPWFyZ3VtZW50c1t0K2ldO3N3aXRjaChpKXtjYXNlIDA6cmV0dXJuIHUuY2FsbCh0aGlzLHIpO2Nhc2UgMTpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLHIpO2Nhc2UgMjpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLGFyZ3VtZW50c1sxXSxyKX12YXIgZT1BcnJheShpKzEpO2Zvcih0PTA7dDxpO3QrKyllW3RdPWFyZ3VtZW50c1t0XTtyZXR1cm4gZVtpXT1yLHUuYXBwbHkodGhpcyxlKX19LG09ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJue307aWYobClyZXR1cm4gbChuKTtmLnByb3RvdHlwZT1uO3ZhciByPW5ldyBmO3JldHVybiBmLnByb3RvdHlwZT1udWxsLHJ9LGI9ZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP3ZvaWQgMDpuW3JdfX0saj1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsIT1uJiZpLmNhbGwobixyKX0seD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7aWYobnVsbD09bilyZXR1cm47bj1uW3JbZV1dfXJldHVybiB0P246dm9pZCAwfSxfPU1hdGgucG93KDIsNTMpLTEsQT1iKFwibGVuZ3RoXCIpLHc9ZnVuY3Rpb24obil7dmFyIHI9QShuKTtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgciYmMDw9ciYmcjw9X307aC5lYWNoPWguZm9yRWFjaD1mdW5jdGlvbihuLHIsdCl7dmFyIGUsdTtpZihyPXkocix0KSx3KG4pKWZvcihlPTAsdT1uLmxlbmd0aDtlPHU7ZSsrKXIobltlXSxlLG4pO2Vsc2V7dmFyIGk9aC5rZXlzKG4pO2ZvcihlPTAsdT1pLmxlbmd0aDtlPHU7ZSsrKXIobltpW2VdXSxpW2VdLG4pfXJldHVybiBufSxoLm1hcD1oLmNvbGxlY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPUFycmF5KHUpLG89MDtvPHU7bysrKXt2YXIgYT1lP2Vbb106bztpW29dPXIoblthXSxhLG4pfXJldHVybiBpfTt2YXIgTz1mdW5jdGlvbihjKXtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9Mzw9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9IXcobikmJmgua2V5cyhuKSxpPSh1fHxuKS5sZW5ndGgsbz0wPGM/MDppLTE7Zm9yKGV8fCh0PW5bdT91W29dOm9dLG8rPWMpOzA8PW8mJm88aTtvKz1jKXt2YXIgYT11P3Vbb106bzt0PXIodCxuW2FdLGEsbil9cmV0dXJuIHR9KG4seShyLGUsNCksdCx1KX19O2gucmVkdWNlPWguZm9sZGw9aC5pbmplY3Q9TygxKSxoLnJlZHVjZVJpZ2h0PWguZm9sZHI9TygtMSksaC5maW5kPWguZGV0ZWN0PWZ1bmN0aW9uKG4scix0KXt2YXIgZT0odyhuKT9oLmZpbmRJbmRleDpoLmZpbmRLZXkpKG4scix0KTtpZih2b2lkIDAhPT1lJiYtMSE9PWUpcmV0dXJuIG5bZV19LGguZmlsdGVyPWguc2VsZWN0PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT1bXTtyZXR1cm4gZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe2UobixyLHQpJiZ1LnB1c2gobil9KSx1fSxoLnJlamVjdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguZmlsdGVyKG4saC5uZWdhdGUoZChyKSksdCl9LGguZXZlcnk9aC5hbGw9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYoIXIobltvXSxvLG4pKXJldHVybiExfXJldHVybiEwfSxoLnNvbWU9aC5hbnk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYocihuW29dLG8sbikpcmV0dXJuITB9cmV0dXJuITF9LGguY29udGFpbnM9aC5pbmNsdWRlcz1oLmluY2x1ZGU9ZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSwoXCJudW1iZXJcIiE9dHlwZW9mIHR8fGUpJiYodD0wKSwwPD1oLmluZGV4T2YobixyLHQpfSxoLmludm9rZT1nKGZ1bmN0aW9uKG4sdCxlKXt2YXIgdSxpO3JldHVybiBoLmlzRnVuY3Rpb24odCk/aT10OmguaXNBcnJheSh0KSYmKHU9dC5zbGljZSgwLC0xKSx0PXRbdC5sZW5ndGgtMV0pLGgubWFwKG4sZnVuY3Rpb24obil7dmFyIHI9aTtpZighcil7aWYodSYmdS5sZW5ndGgmJihuPXgobix1KSksbnVsbD09bilyZXR1cm47cj1uW3RdfXJldHVybiBudWxsPT1yP3I6ci5hcHBseShuLGUpfSl9KSxoLnBsdWNrPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgubWFwKG4saC5wcm9wZXJ0eShyKSl9LGgud2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maWx0ZXIobixoLm1hdGNoZXIocikpfSxoLmZpbmRXaGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbmQobixoLm1hdGNoZXIocikpfSxoLm1heD1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPS0xLzAsbz0tMS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJmk8dCYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7dT1lKG4scix0KSwobzx1fHx1PT09LTEvMCYmaT09PS0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5taW49ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0xLzAsbz0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmdDxpJiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXsoKHU9ZShuLHIsdCkpPG98fHU9PT0xLzAmJmk9PT0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5zaHVmZmxlPWZ1bmN0aW9uKG4pe3JldHVybiBoLnNhbXBsZShuLDEvMCl9LGguc2FtcGxlPWZ1bmN0aW9uKG4scix0KXtpZihudWxsPT1yfHx0KXJldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksbltoLnJhbmRvbShuLmxlbmd0aC0xKV07dmFyIGU9dyhuKT9oLmNsb25lKG4pOmgudmFsdWVzKG4pLHU9QShlKTtyPU1hdGgubWF4KE1hdGgubWluKHIsdSksMCk7Zm9yKHZhciBpPXUtMSxvPTA7bzxyO28rKyl7dmFyIGE9aC5yYW5kb20obyxpKSxjPWVbb107ZVtvXT1lW2FdLGVbYV09Y31yZXR1cm4gZS5zbGljZSgwLHIpfSxoLnNvcnRCeT1mdW5jdGlvbihuLGUscil7dmFyIHU9MDtyZXR1cm4gZT1kKGUsciksaC5wbHVjayhoLm1hcChuLGZ1bmN0aW9uKG4scix0KXtyZXR1cm57dmFsdWU6bixpbmRleDp1KyssY3JpdGVyaWE6ZShuLHIsdCl9fSkuc29ydChmdW5jdGlvbihuLHIpe3ZhciB0PW4uY3JpdGVyaWEsZT1yLmNyaXRlcmlhO2lmKHQhPT1lKXtpZihlPHR8fHZvaWQgMD09PXQpcmV0dXJuIDE7aWYodDxlfHx2b2lkIDA9PT1lKXJldHVybi0xfXJldHVybiBuLmluZGV4LXIuaW5kZXh9KSxcInZhbHVlXCIpfTt2YXIgaz1mdW5jdGlvbihvLHIpe3JldHVybiBmdW5jdGlvbihlLHUsbil7dmFyIGk9cj9bW10sW11dOnt9O3JldHVybiB1PWQodSxuKSxoLmVhY2goZSxmdW5jdGlvbihuLHIpe3ZhciB0PXUobixyLGUpO28oaSxuLHQpfSksaX19O2guZ3JvdXBCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSksaC5pbmRleEJ5PWsoZnVuY3Rpb24obixyLHQpe25bdF09cn0pLGguY291bnRCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XSsrOm5bdF09MX0pO3ZhciBTPS9bXlxcdWQ4MDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkZmZmXS9nO2gudG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbj9oLmlzQXJyYXkobik/Yy5jYWxsKG4pOmguaXNTdHJpbmcobik/bi5tYXRjaChTKTp3KG4pP2gubWFwKG4saC5pZGVudGl0eSk6aC52YWx1ZXMobik6W119LGguc2l6ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj8wOncobik/bi5sZW5ndGg6aC5rZXlzKG4pLmxlbmd0aH0saC5wYXJ0aXRpb249ayhmdW5jdGlvbihuLHIsdCl7blt0PzA6MV0ucHVzaChyKX0sITApLGguZmlyc3Q9aC5oZWFkPWgudGFrZT1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uWzBdOmguaW5pdGlhbChuLG4ubGVuZ3RoLXIpfSxoLmluaXRpYWw9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobiwwLE1hdGgubWF4KDAsbi5sZW5ndGgtKG51bGw9PXJ8fHQ/MTpyKSkpfSxoLmxhc3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/bltuLmxlbmd0aC0xXTpoLnJlc3QobixNYXRoLm1heCgwLG4ubGVuZ3RoLXIpKX0saC5yZXN0PWgudGFpbD1oLmRyb3A9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobixudWxsPT1yfHx0PzE6cil9LGguY29tcGFjdD1mdW5jdGlvbihuKXtyZXR1cm4gaC5maWx0ZXIobixCb29sZWFuKX07dmFyIE09ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PShlPWV8fFtdKS5sZW5ndGgsaT0wLG89QShuKTtpPG87aSsrKXt2YXIgYT1uW2ldO2lmKHcoYSkmJihoLmlzQXJyYXkoYSl8fGguaXNBcmd1bWVudHMoYSkpKWlmKHIpZm9yKHZhciBjPTAsbD1hLmxlbmd0aDtjPGw7KWVbdSsrXT1hW2MrK107ZWxzZSBNKGEscix0LGUpLHU9ZS5sZW5ndGg7ZWxzZSB0fHwoZVt1KytdPWEpfXJldHVybiBlfTtoLmZsYXR0ZW49ZnVuY3Rpb24obixyKXtyZXR1cm4gTShuLHIsITEpfSxoLndpdGhvdXQ9ZyhmdW5jdGlvbihuLHIpe3JldHVybiBoLmRpZmZlcmVuY2UobixyKX0pLGgudW5pcT1oLnVuaXF1ZT1mdW5jdGlvbihuLHIsdCxlKXtoLmlzQm9vbGVhbihyKXx8KGU9dCx0PXIscj0hMSksbnVsbCE9dCYmKHQ9ZCh0LGUpKTtmb3IodmFyIHU9W10saT1bXSxvPTAsYT1BKG4pO288YTtvKyspe3ZhciBjPW5bb10sbD10P3QoYyxvLG4pOmM7ciYmIXQ/KG8mJmk9PT1sfHx1LnB1c2goYyksaT1sKTp0P2guY29udGFpbnMoaSxsKXx8KGkucHVzaChsKSx1LnB1c2goYykpOmguY29udGFpbnModSxjKXx8dS5wdXNoKGMpfXJldHVybiB1fSxoLnVuaW9uPWcoZnVuY3Rpb24obil7cmV0dXJuIGgudW5pcShNKG4sITAsITApKX0pLGguaW50ZXJzZWN0aW9uPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1bXSx0PWFyZ3VtZW50cy5sZW5ndGgsZT0wLHU9QShuKTtlPHU7ZSsrKXt2YXIgaT1uW2VdO2lmKCFoLmNvbnRhaW5zKHIsaSkpe3ZhciBvO2ZvcihvPTE7bzx0JiZoLmNvbnRhaW5zKGFyZ3VtZW50c1tvXSxpKTtvKyspO289PT10JiZyLnB1c2goaSl9fXJldHVybiByfSxoLmRpZmZlcmVuY2U9ZyhmdW5jdGlvbihuLHIpe3JldHVybiByPU0ociwhMCwhMCksaC5maWx0ZXIobixmdW5jdGlvbihuKXtyZXR1cm4haC5jb250YWlucyhyLG4pfSl9KSxoLnVuemlwPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1uJiZoLm1heChuLEEpLmxlbmd0aHx8MCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aC5wbHVjayhuLGUpO3JldHVybiB0fSxoLnppcD1nKGgudW56aXApLGgub2JqZWN0PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXt9LGU9MCx1PUEobik7ZTx1O2UrKylyP3RbbltlXV09cltlXTp0W25bZV1bMF1dPW5bZV1bMV07cmV0dXJuIHR9O3ZhciBGPWZ1bmN0aW9uKGkpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPUEobiksdT0wPGk/MDplLTE7MDw9dSYmdTxlO3UrPWkpaWYocihuW3VdLHUsbikpcmV0dXJuIHU7cmV0dXJuLTF9fTtoLmZpbmRJbmRleD1GKDEpLGguZmluZExhc3RJbmRleD1GKC0xKSxoLnNvcnRlZEluZGV4PWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0odD1kKHQsZSwxKSkociksaT0wLG89QShuKTtpPG87KXt2YXIgYT1NYXRoLmZsb29yKChpK28pLzIpO3QoblthXSk8dT9pPWErMTpvPWF9cmV0dXJuIGl9O3ZhciBFPWZ1bmN0aW9uKGksbyxhKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3ZhciBlPTAsdT1BKG4pO2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KTA8aT9lPTA8PXQ/dDpNYXRoLm1heCh0K3UsZSk6dT0wPD10P01hdGgubWluKHQrMSx1KTp0K3UrMTtlbHNlIGlmKGEmJnQmJnUpcmV0dXJuIG5bdD1hKG4scildPT09cj90Oi0xO2lmKHIhPXIpcmV0dXJuIDA8PSh0PW8oYy5jYWxsKG4sZSx1KSxoLmlzTmFOKSk/dCtlOi0xO2Zvcih0PTA8aT9lOnUtMTswPD10JiZ0PHU7dCs9aSlpZihuW3RdPT09cilyZXR1cm4gdDtyZXR1cm4tMX19O2guaW5kZXhPZj1FKDEsaC5maW5kSW5kZXgsaC5zb3J0ZWRJbmRleCksaC5sYXN0SW5kZXhPZj1FKC0xLGguZmluZExhc3RJbmRleCksaC5yYW5nZT1mdW5jdGlvbihuLHIsdCl7bnVsbD09ciYmKHI9bnx8MCxuPTApLHR8fCh0PXI8bj8tMToxKTtmb3IodmFyIGU9TWF0aC5tYXgoTWF0aC5jZWlsKChyLW4pL3QpLDApLHU9QXJyYXkoZSksaT0wO2k8ZTtpKyssbis9dCl1W2ldPW47cmV0dXJuIHV9LGguY2h1bms9ZnVuY3Rpb24obixyKXtpZihudWxsPT1yfHxyPDEpcmV0dXJuW107Zm9yKHZhciB0PVtdLGU9MCx1PW4ubGVuZ3RoO2U8dTspdC5wdXNoKGMuY2FsbChuLGUsZSs9cikpO3JldHVybiB0fTt2YXIgTj1mdW5jdGlvbihuLHIsdCxlLHUpe2lmKCEoZSBpbnN0YW5jZW9mIHIpKXJldHVybiBuLmFwcGx5KHQsdSk7dmFyIGk9bShuLnByb3RvdHlwZSksbz1uLmFwcGx5KGksdSk7cmV0dXJuIGguaXNPYmplY3Qobyk/bzppfTtoLmJpbmQ9ZyhmdW5jdGlvbihyLHQsZSl7aWYoIWguaXNGdW5jdGlvbihyKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uXCIpO3ZhciB1PWcoZnVuY3Rpb24obil7cmV0dXJuIE4ocix1LHQsdGhpcyxlLmNvbmNhdChuKSl9KTtyZXR1cm4gdX0pLGgucGFydGlhbD1nKGZ1bmN0aW9uKHUsaSl7dmFyIG89aC5wYXJ0aWFsLnBsYWNlaG9sZGVyLGE9ZnVuY3Rpb24oKXtmb3IodmFyIG49MCxyPWkubGVuZ3RoLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1pW2VdPT09bz9hcmd1bWVudHNbbisrXTppW2VdO2Zvcig7bjxhcmd1bWVudHMubGVuZ3RoOyl0LnB1c2goYXJndW1lbnRzW24rK10pO3JldHVybiBOKHUsYSx0aGlzLHRoaXMsdCl9O3JldHVybiBhfSksKGgucGFydGlhbC5wbGFjZWhvbGRlcj1oKS5iaW5kQWxsPWcoZnVuY3Rpb24obixyKXt2YXIgdD0ocj1NKHIsITEsITEpKS5sZW5ndGg7aWYodDwxKXRocm93IG5ldyBFcnJvcihcImJpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXNcIik7Zm9yKDt0LS07KXt2YXIgZT1yW3RdO25bZV09aC5iaW5kKG5bZV0sbil9fSksaC5tZW1vaXplPWZ1bmN0aW9uKGUsdSl7dmFyIGk9ZnVuY3Rpb24obil7dmFyIHI9aS5jYWNoZSx0PVwiXCIrKHU/dS5hcHBseSh0aGlzLGFyZ3VtZW50cyk6bik7cmV0dXJuIGoocix0KXx8KHJbdF09ZS5hcHBseSh0aGlzLGFyZ3VtZW50cykpLHJbdF19O3JldHVybiBpLmNhY2hlPXt9LGl9LGguZGVsYXk9ZyhmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gbi5hcHBseShudWxsLHQpfSxyKX0pLGguZGVmZXI9aC5wYXJ0aWFsKGguZGVsYXksaCwxKSxoLnRocm90dGxlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGEsYyxsPTA7dXx8KHU9e30pO3ZhciBmPWZ1bmN0aW9uKCl7bD0hMT09PXUubGVhZGluZz8wOmgubm93KCksaT1udWxsLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCl9LG49ZnVuY3Rpb24oKXt2YXIgbj1oLm5vdygpO2x8fCExIT09dS5sZWFkaW5nfHwobD1uKTt2YXIgcj1lLShuLWwpO3JldHVybiBvPXRoaXMsYT1hcmd1bWVudHMscjw9MHx8ZTxyPyhpJiYoY2xlYXJUaW1lb3V0KGkpLGk9bnVsbCksbD1uLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCkpOml8fCExPT09dS50cmFpbGluZ3x8KGk9c2V0VGltZW91dChmLHIpKSxjfTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksbD0wLGk9bz1hPW51bGx9LG59LGguZGVib3VuY2U9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYT1mdW5jdGlvbihuLHIpe2k9bnVsbCxyJiYobz10LmFwcGx5KG4scikpfSxuPWcoZnVuY3Rpb24obil7aWYoaSYmY2xlYXJUaW1lb3V0KGkpLHUpe3ZhciByPSFpO2k9c2V0VGltZW91dChhLGUpLHImJihvPXQuYXBwbHkodGhpcyxuKSl9ZWxzZSBpPWguZGVsYXkoYSxlLHRoaXMsbik7cmV0dXJuIG99KTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksaT1udWxsfSxufSxoLndyYXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5wYXJ0aWFsKHIsbil9LGgubmVnYXRlPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiFuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguY29tcG9zZT1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxlPXQubGVuZ3RoLTE7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPWUscj10W2VdLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtuLS07KXI9dFtuXS5jYWxsKHRoaXMscik7cmV0dXJuIHJ9fSxoLmFmdGVyPWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKCl7aWYoLS1uPDEpcmV0dXJuIHIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5iZWZvcmU9ZnVuY3Rpb24obixyKXt2YXIgdDtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gMDwtLW4mJih0PXIuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxuPD0xJiYocj1udWxsKSx0fX0saC5vbmNlPWgucGFydGlhbChoLmJlZm9yZSwyKSxoLnJlc3RBcmd1bWVudHM9Zzt2YXIgST0he3RvU3RyaW5nOm51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIiksVD1bXCJ2YWx1ZU9mXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJ0b1N0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImhhc093blByb3BlcnR5XCIsXCJ0b0xvY2FsZVN0cmluZ1wiXSxCPWZ1bmN0aW9uKG4scil7dmFyIHQ9VC5sZW5ndGgsZT1uLmNvbnN0cnVjdG9yLHU9aC5pc0Z1bmN0aW9uKGUpJiZlLnByb3RvdHlwZXx8byxpPVwiY29uc3RydWN0b3JcIjtmb3IoaihuLGkpJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSk7dC0tOykoaT1UW3RdKWluIG4mJm5baV0hPT11W2ldJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSl9O2gua2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTtpZihhKXJldHVybiBhKG4pO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWoobix0KSYmci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC5hbGxLZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKXIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGgudmFsdWVzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09bltyW3VdXTtyZXR1cm4gZX0saC5tYXBPYmplY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1oLmtleXMobiksdT1lLmxlbmd0aCxpPXt9LG89MDtvPHU7bysrKXt2YXIgYT1lW29dO2lbYV09cihuW2FdLGEsbil9cmV0dXJuIGl9LGgucGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1bclt1XSxuW3JbdV1dXTtyZXR1cm4gZX0saC5pbnZlcnQ9ZnVuY3Rpb24obil7Zm9yKHZhciByPXt9LHQ9aC5rZXlzKG4pLGU9MCx1PXQubGVuZ3RoO2U8dTtlKyspcltuW3RbZV1dXT10W2VdO3JldHVybiByfSxoLmZ1bmN0aW9ucz1oLm1ldGhvZHM9ZnVuY3Rpb24obil7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paC5pc0Z1bmN0aW9uKG5bdF0pJiZyLnB1c2godCk7cmV0dXJuIHIuc29ydCgpfTt2YXIgUj1mdW5jdGlvbihjLGwpe3JldHVybiBmdW5jdGlvbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO2lmKGwmJihuPU9iamVjdChuKSkscjwyfHxudWxsPT1uKXJldHVybiBuO2Zvcih2YXIgdD0xO3Q8cjt0KyspZm9yKHZhciBlPWFyZ3VtZW50c1t0XSx1PWMoZSksaT11Lmxlbmd0aCxvPTA7bzxpO28rKyl7dmFyIGE9dVtvXTtsJiZ2b2lkIDAhPT1uW2FdfHwoblthXT1lW2FdKX1yZXR1cm4gbn19O2guZXh0ZW5kPVIoaC5hbGxLZXlzKSxoLmV4dGVuZE93bj1oLmFzc2lnbj1SKGgua2V5cyksaC5maW5kS2V5PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGUsdT1oLmtleXMobiksaT0wLG89dS5sZW5ndGg7aTxvO2krKylpZihyKG5bZT11W2ldXSxlLG4pKXJldHVybiBlfTt2YXIgcSxLLHo9ZnVuY3Rpb24obixyLHQpe3JldHVybiByIGluIHR9O2gucGljaz1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9e30sZT1yWzBdO2lmKG51bGw9PW4pcmV0dXJuIHQ7aC5pc0Z1bmN0aW9uKGUpPygxPHIubGVuZ3RoJiYoZT15KGUsclsxXSkpLHI9aC5hbGxLZXlzKG4pKTooZT16LHI9TShyLCExLCExKSxuPU9iamVjdChuKSk7Zm9yKHZhciB1PTAsaT1yLmxlbmd0aDt1PGk7dSsrKXt2YXIgbz1yW3VdLGE9bltvXTtlKGEsbyxuKSYmKHRbb109YSl9cmV0dXJuIHR9KSxoLm9taXQ9ZyhmdW5jdGlvbihuLHQpe3ZhciByLGU9dFswXTtyZXR1cm4gaC5pc0Z1bmN0aW9uKGUpPyhlPWgubmVnYXRlKGUpLDE8dC5sZW5ndGgmJihyPXRbMV0pKToodD1oLm1hcChNKHQsITEsITEpLFN0cmluZyksZT1mdW5jdGlvbihuLHIpe3JldHVybiFoLmNvbnRhaW5zKHQscil9KSxoLnBpY2sobixlLHIpfSksaC5kZWZhdWx0cz1SKGguYWxsS2V5cywhMCksaC5jcmVhdGU9ZnVuY3Rpb24obixyKXt2YXIgdD1tKG4pO3JldHVybiByJiZoLmV4dGVuZE93bih0LHIpLHR9LGguY2xvbmU9ZnVuY3Rpb24obil7cmV0dXJuIGguaXNPYmplY3Qobik/aC5pc0FycmF5KG4pP24uc2xpY2UoKTpoLmV4dGVuZCh7fSxuKTpufSxoLnRhcD1mdW5jdGlvbihuLHIpe3JldHVybiByKG4pLG59LGguaXNNYXRjaD1mdW5jdGlvbihuLHIpe3ZhciB0PWgua2V5cyhyKSxlPXQubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKHZhciB1PU9iamVjdChuKSxpPTA7aTxlO2krKyl7dmFyIG89dFtpXTtpZihyW29dIT09dVtvXXx8IShvIGluIHUpKXJldHVybiExfXJldHVybiEwfSxxPWZ1bmN0aW9uKG4scix0LGUpe2lmKG49PT1yKXJldHVybiAwIT09bnx8MS9uPT0xL3I7aWYobnVsbD09bnx8bnVsbD09cilyZXR1cm4hMTtpZihuIT1uKXJldHVybiByIT1yO3ZhciB1PXR5cGVvZiBuO3JldHVybihcImZ1bmN0aW9uXCI9PT11fHxcIm9iamVjdFwiPT09dXx8XCJvYmplY3RcIj09dHlwZW9mIHIpJiZLKG4scix0LGUpfSxLPWZ1bmN0aW9uKG4scix0LGUpe24gaW5zdGFuY2VvZiBoJiYobj1uLl93cmFwcGVkKSxyIGluc3RhbmNlb2YgaCYmKHI9ci5fd3JhcHBlZCk7dmFyIHU9cC5jYWxsKG4pO2lmKHUhPT1wLmNhbGwocikpcmV0dXJuITE7c3dpdGNoKHUpe2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVyblwiXCIrbj09XCJcIityO2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybituIT0rbj8rciE9K3I6MD09K24/MS8rbj09MS9yOituPT0rcjtjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOnJldHVybituPT0rcjtjYXNlXCJbb2JqZWN0IFN5bWJvbF1cIjpyZXR1cm4gcy52YWx1ZU9mLmNhbGwobik9PT1zLnZhbHVlT2YuY2FsbChyKX12YXIgaT1cIltvYmplY3QgQXJyYXldXCI9PT11O2lmKCFpKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygbnx8XCJvYmplY3RcIiE9dHlwZW9mIHIpcmV0dXJuITE7dmFyIG89bi5jb25zdHJ1Y3RvcixhPXIuY29uc3RydWN0b3I7aWYobyE9PWEmJiEoaC5pc0Z1bmN0aW9uKG8pJiZvIGluc3RhbmNlb2YgbyYmaC5pc0Z1bmN0aW9uKGEpJiZhIGluc3RhbmNlb2YgYSkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHIpcmV0dXJuITF9ZT1lfHxbXTtmb3IodmFyIGM9KHQ9dHx8W10pLmxlbmd0aDtjLS07KWlmKHRbY109PT1uKXJldHVybiBlW2NdPT09cjtpZih0LnB1c2gobiksZS5wdXNoKHIpLGkpe2lmKChjPW4ubGVuZ3RoKSE9PXIubGVuZ3RoKXJldHVybiExO2Zvcig7Yy0tOylpZighcShuW2NdLHJbY10sdCxlKSlyZXR1cm4hMX1lbHNle3ZhciBsLGY9aC5rZXlzKG4pO2lmKGM9Zi5sZW5ndGgsaC5rZXlzKHIpLmxlbmd0aCE9PWMpcmV0dXJuITE7Zm9yKDtjLS07KWlmKGw9ZltjXSwhaihyLGwpfHwhcShuW2xdLHJbbF0sdCxlKSlyZXR1cm4hMX1yZXR1cm4gdC5wb3AoKSxlLnBvcCgpLCEwfSxoLmlzRXF1YWw9ZnVuY3Rpb24obixyKXtyZXR1cm4gcShuLHIpfSxoLmlzRW1wdHk9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW58fCh3KG4pJiYoaC5pc0FycmF5KG4pfHxoLmlzU3RyaW5nKG4pfHxoLmlzQXJndW1lbnRzKG4pKT8wPT09bi5sZW5ndGg6MD09PWgua2V5cyhuKS5sZW5ndGgpfSxoLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4hKCFufHwxIT09bi5ub2RlVHlwZSl9LGguaXNBcnJheT10fHxmdW5jdGlvbihuKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1wLmNhbGwobil9LGguaXNPYmplY3Q9ZnVuY3Rpb24obil7dmFyIHI9dHlwZW9mIG47cmV0dXJuXCJmdW5jdGlvblwiPT09cnx8XCJvYmplY3RcIj09PXImJiEhbn0saC5lYWNoKFtcIkFyZ3VtZW50c1wiLFwiRnVuY3Rpb25cIixcIlN0cmluZ1wiLFwiTnVtYmVyXCIsXCJEYXRlXCIsXCJSZWdFeHBcIixcIkVycm9yXCIsXCJTeW1ib2xcIixcIk1hcFwiLFwiV2Vha01hcFwiLFwiU2V0XCIsXCJXZWFrU2V0XCJdLGZ1bmN0aW9uKHIpe2hbXCJpc1wiK3JdPWZ1bmN0aW9uKG4pe3JldHVybiBwLmNhbGwobik9PT1cIltvYmplY3QgXCIrcitcIl1cIn19KSxoLmlzQXJndW1lbnRzKGFyZ3VtZW50cyl8fChoLmlzQXJndW1lbnRzPWZ1bmN0aW9uKG4pe3JldHVybiBqKG4sXCJjYWxsZWVcIil9KTt2YXIgRD1uLmRvY3VtZW50JiZuLmRvY3VtZW50LmNoaWxkTm9kZXM7XCJmdW5jdGlvblwiIT10eXBlb2YvLi8mJlwib2JqZWN0XCIhPXR5cGVvZiBJbnQ4QXJyYXkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIEQmJihoLmlzRnVuY3Rpb249ZnVuY3Rpb24obil7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbnx8ITF9KSxoLmlzRmluaXRlPWZ1bmN0aW9uKG4pe3JldHVybiFoLmlzU3ltYm9sKG4pJiZpc0Zpbml0ZShuKSYmIWlzTmFOKHBhcnNlRmxvYXQobikpfSxoLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTnVtYmVyKG4pJiZpc05hTihuKX0saC5pc0Jvb2xlYW49ZnVuY3Rpb24obil7cmV0dXJuITA9PT1ufHwhMT09PW58fFwiW29iamVjdCBCb29sZWFuXVwiPT09cC5jYWxsKG4pfSxoLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LGguaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIHZvaWQgMD09PW59LGguaGFzPWZ1bmN0aW9uKG4scil7aWYoIWguaXNBcnJheShyKSlyZXR1cm4gaihuLHIpO2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7dmFyIHU9cltlXTtpZihudWxsPT1ufHwhaS5jYWxsKG4sdSkpcmV0dXJuITE7bj1uW3VdfXJldHVybiEhdH0saC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4uXz1yLHRoaXN9LGguaWRlbnRpdHk9ZnVuY3Rpb24obil7cmV0dXJuIG59LGguY29uc3RhbnQ9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG59fSxoLm5vb3A9ZnVuY3Rpb24oKXt9LGgucHJvcGVydHk9ZnVuY3Rpb24ocil7cmV0dXJuIGguaXNBcnJheShyKT9mdW5jdGlvbihuKXtyZXR1cm4geChuLHIpfTpiKHIpfSxoLnByb3BlcnR5T2Y9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGw9PXI/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKG4pe3JldHVybiBoLmlzQXJyYXkobik/eChyLG4pOnJbbl19fSxoLm1hdGNoZXI9aC5tYXRjaGVzPWZ1bmN0aW9uKHIpe3JldHVybiByPWguZXh0ZW5kT3duKHt9LHIpLGZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTWF0Y2gobixyKX19LGgudGltZXM9ZnVuY3Rpb24obixyLHQpe3ZhciBlPUFycmF5KE1hdGgubWF4KDAsbikpO3I9eShyLHQsMSk7Zm9yKHZhciB1PTA7dTxuO3UrKyllW3VdPXIodSk7cmV0dXJuIGV9LGgucmFuZG9tPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGw9PXImJihyPW4sbj0wKSxuK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooci1uKzEpKX0saC5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9O3ZhciBMPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiN4Mjc7XCIsXCJgXCI6XCImI3g2MDtcIn0sUD1oLmludmVydChMKSxXPWZ1bmN0aW9uKHIpe3ZhciB0PWZ1bmN0aW9uKG4pe3JldHVybiByW25dfSxuPVwiKD86XCIraC5rZXlzKHIpLmpvaW4oXCJ8XCIpK1wiKVwiLGU9UmVnRXhwKG4pLHU9UmVnRXhwKG4sXCJnXCIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbj1udWxsPT1uP1wiXCI6XCJcIituLGUudGVzdChuKT9uLnJlcGxhY2UodSx0KTpufX07aC5lc2NhcGU9VyhMKSxoLnVuZXNjYXBlPVcoUCksaC5yZXN1bHQ9ZnVuY3Rpb24obixyLHQpe2guaXNBcnJheShyKXx8KHI9W3JdKTt2YXIgZT1yLmxlbmd0aDtpZighZSlyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP3QuY2FsbChuKTp0O2Zvcih2YXIgdT0wO3U8ZTt1Kyspe3ZhciBpPW51bGw9PW4/dm9pZCAwOm5bclt1XV07dm9pZCAwPT09aSYmKGk9dCx1PWUpLG49aC5pc0Z1bmN0aW9uKGkpP2kuY2FsbChuKTppfXJldHVybiBufTt2YXIgQz0wO2gudW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHI9KytDK1wiXCI7cmV0dXJuIG4/bityOnJ9LGgudGVtcGxhdGVTZXR0aW5ncz17ZXZhbHVhdGU6LzwlKFtcXHNcXFNdKz8pJT4vZyxpbnRlcnBvbGF0ZTovPCU9KFtcXHNcXFNdKz8pJT4vZyxlc2NhcGU6LzwlLShbXFxzXFxTXSs/KSU+L2d9O3ZhciBKPS8oLileLyxVPXtcIidcIjpcIidcIixcIlxcXFxcIjpcIlxcXFxcIixcIlxcclwiOlwiclwiLFwiXFxuXCI6XCJuXCIsXCJcXHUyMDI4XCI6XCJ1MjAyOFwiLFwiXFx1MjAyOVwiOlwidTIwMjlcIn0sVj0vXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2csJD1mdW5jdGlvbihuKXtyZXR1cm5cIlxcXFxcIitVW25dfTtoLnRlbXBsYXRlPWZ1bmN0aW9uKGksbixyKXshbiYmciYmKG49ciksbj1oLmRlZmF1bHRzKHt9LG4saC50ZW1wbGF0ZVNldHRpbmdzKTt2YXIgdCxlPVJlZ0V4cChbKG4uZXNjYXBlfHxKKS5zb3VyY2UsKG4uaW50ZXJwb2xhdGV8fEopLnNvdXJjZSwobi5ldmFsdWF0ZXx8Sikuc291cmNlXS5qb2luKFwifFwiKStcInwkXCIsXCJnXCIpLG89MCxhPVwiX19wKz0nXCI7aS5yZXBsYWNlKGUsZnVuY3Rpb24obixyLHQsZSx1KXtyZXR1cm4gYSs9aS5zbGljZShvLHUpLnJlcGxhY2UoViwkKSxvPXUrbi5sZW5ndGgscj9hKz1cIicrXFxuKChfX3Q9KFwiK3IrXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI6dD9hKz1cIicrXFxuKChfX3Q9KFwiK3QrXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjplJiYoYSs9XCInO1xcblwiK2UrXCJcXG5fX3ArPSdcIiksbn0pLGErPVwiJztcXG5cIixuLnZhcmlhYmxlfHwoYT1cIndpdGgob2JqfHx7fSl7XFxuXCIrYStcIn1cXG5cIiksYT1cInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIitcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIrYStcInJldHVybiBfX3A7XFxuXCI7dHJ5e3Q9bmV3IEZ1bmN0aW9uKG4udmFyaWFibGV8fFwib2JqXCIsXCJfXCIsYSl9Y2F0Y2gobil7dGhyb3cgbi5zb3VyY2U9YSxufXZhciB1PWZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwodGhpcyxuLGgpfSxjPW4udmFyaWFibGV8fFwib2JqXCI7cmV0dXJuIHUuc291cmNlPVwiZnVuY3Rpb24oXCIrYytcIil7XFxuXCIrYStcIn1cIix1fSxoLmNoYWluPWZ1bmN0aW9uKG4pe3ZhciByPWgobik7cmV0dXJuIHIuX2NoYWluPSEwLHJ9O3ZhciBHPWZ1bmN0aW9uKG4scil7cmV0dXJuIG4uX2NoYWluP2gocikuY2hhaW4oKTpyfTtoLm1peGluPWZ1bmN0aW9uKHQpe3JldHVybiBoLmVhY2goaC5mdW5jdGlvbnModCksZnVuY3Rpb24obil7dmFyIHI9aFtuXT10W25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49W3RoaXMuX3dyYXBwZWRdO3JldHVybiB1LmFwcGx5KG4sYXJndW1lbnRzKSxHKHRoaXMsci5hcHBseShoLG4pKX19KSxofSxoLm1peGluKGgpLGguZWFjaChbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJzcGxpY2VcIixcInVuc2hpZnRcIl0sZnVuY3Rpb24ocil7dmFyIHQ9ZVtyXTtoLnByb3RvdHlwZVtyXT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX3dyYXBwZWQ7cmV0dXJuIHQuYXBwbHkobixhcmd1bWVudHMpLFwic2hpZnRcIiE9PXImJlwic3BsaWNlXCIhPT1yfHwwIT09bi5sZW5ndGh8fGRlbGV0ZSBuWzBdLEcodGhpcyxuKX19KSxoLmVhY2goW1wiY29uY2F0XCIsXCJqb2luXCIsXCJzbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgcj1lW25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIEcodGhpcyxyLmFwcGx5KHRoaXMuX3dyYXBwZWQsYXJndW1lbnRzKSl9fSksaC5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcHBlZH0saC5wcm90b3R5cGUudmFsdWVPZj1oLnByb3RvdHlwZS50b0pTT049aC5wcm90b3R5cGUudmFsdWUsaC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gU3RyaW5nKHRoaXMuX3dyYXBwZWQpfSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShcInVuZGVyc2NvcmVcIixbXSxmdW5jdGlvbigpe3JldHVybiBofSl9KCk7XHJcbiIsImltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbn0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1J0bXAgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3J0bXA6JykgPT0gMCB8fCB0eXBlID09ICdydG1wJyk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc1dlYlJUQyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICBpZihmaWxlKXtcclxuICAgICAgICByZXR1cm4gKGZpbGUuaW5kZXhPZignd3M6JykgPT09IDAgfHwgZmlsZS5pbmRleE9mKCd3c3M6JykgPT09IDAgfHwgdHlwZSA9PT0gJ3dlYnJ0YycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgaXNEYXNoID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIHJldHVybiAoIHR5cGUgPT09ICdtcGQnIHx8ICB0eXBlID09PSAnZGFzaCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2Rhc2greG1sJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtcGQnKTtcclxufTtcclxuIiwiLyoqXG4gKiB1dGlscyBmb3Igd2VicGFja1xuICovXG5cbmV4cG9ydCBjb25zdCBnZXRTY3JpcHRQYXRoID0gZnVuY3Rpb24oc2NyaXB0TmFtZSkge1xuICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHNjcmlwdHNbaV0uc3JjO1xuICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHNyYy5sYXN0SW5kZXhPZignLycgKyBzY3JpcHROYW1lKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHIoMCwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjkuLlxuICovXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IF9fVkVSU0lPTl9fO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==