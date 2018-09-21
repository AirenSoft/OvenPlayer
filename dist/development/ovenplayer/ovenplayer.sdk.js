/*! OvenPlayerv0.7.6 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
var version = exports.version = '0.7.6-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaUV4cGFuc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9Db25maWd1cmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvU3VwcG9ydENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wbGF5bGlzdC9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xpa2VBJC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvbG9nZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zdHJpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy91bmRlcnNjb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy92YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3dlYnBhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZlcnNpb24uanMiXSwibmFtZXMiOlsiQXBpIiwiY29udGFpbmVyIiwibG9nTWFuYWdlciIsInRoYXQiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsInZlcnNpb24iLCJwbGF5bGlzdE1hbmFnZXIiLCJwcm92aWRlckNvbnRyb2xsZXIiLCJjdXJyZW50UHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJsYXp5UXVldWUiLCJpbml0UHJvdmlkZXIiLCJsYXN0UGxheVBvc2l0aW9uIiwicGlja1F1YWxpdHlGcm9tU291cmNlIiwic291cmNlcyIsInF1YWxpdHkiLCJpIiwibGVuZ3RoIiwiZ2V0UXVhbGl0eUxhYmVsIiwibGFiZWwiLCJsb2FkUHJvdmlkZXJzIiwiZ2V0UGxheWxpc3QiLCJ0aGVuIiwiZGVzdHJveSIsImN1cnJlbnRTb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2VzIiwiUHJvdmlkZXJzIiwiZ2V0TmFtZSIsIlBST1ZJREVSX1JUTVAiLCJvbiIsIm5hbWUiLCJkYXRhIiwidHJpZ2dlciIsIkVSUk9SIiwicGFyc2VJbnQiLCJjb2RlIiwiTkVUV09SS19VTlNUQUJMRUQiLCJjdXJyZW50UXVhbGl0eSIsImdldEN1cnJlbnRRdWFsaXR5IiwiaW5kZXgiLCJnZXRRdWFsaXR5TGV2ZWxzIiwicGF1c2UiLCJzZXRDdXJyZW50UXVhbGl0eSIsInByZWxvYWQiLCJmbHVzaCIsIlJFQURZIiwiZXJyb3IiLCJlcnJvck9iamVjdCIsIklOSVRfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImluaXQiLCJvcHRpb25zIiwiaXNEZWJ1ZyIsImRpc2FibGUiLCJzZXRQbGF5bGlzdCIsImdldENvbmZpZyIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJnZXRWb2x1bWUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInBsYXlsaXN0IiwicGxheSIsInNlZWsiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsInNldERlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJxdWFsaXR5SW5kZXgiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwiaXNTYW1lUHJvdmlkZXIiLCJyZXNRdWFsaXR5SW5kZXgiLCJnZXRCdWZmZXIiLCJnZXRTdGF0ZSIsInN0b3AiLCJyZW1vdmUiLCJERVNUUk9ZIiwib2ZmIiwiT3ZlblBsYXllclNESyIsInJlbW92ZVBsYXllciIsImdldENvbnRhaW5lcklkIiwiQXBpUnRtcEV4cGFuc2lvbiIsImV4dGVybmFsQ2FsbGJhY2tDcmVlcCIsInJlc3VsdCIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsIkNvbmZpZ3VyYXRvciIsImNvbXBvc2VTb3VyY2VPcHRpb25zIiwiRGVmYXVsdHMiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5YmFja1JhdGVzIiwibXV0ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2VyaWFsaXplIiwidmFsIiwidW5kZWZpbmVkIiwibG93ZXJjYXNlVmFsIiwidG9Mb3dlckNhc2UiLCJpc05hTiIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJkZXNlcmlhbGl6ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwibm9ybWFsaXplU2l6ZSIsInNsaWNlIiwiZXZhbHVhdGVBc3BlY3RSYXRpbyIsImFyIiwidG9TdHJpbmciLCJpbmRleE9mIiwidGVzdCIsInciLCJzdWJzdHIiLCJoIiwiY29uZmlnIiwiYXNwZWN0cmF0aW8iLCJyYXRlQ29udHJvbHMiLCJyYXRlcyIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsIl8iLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJwdXNoIiwic29ydCIsImNvbmZpZ1BsYXlsaXN0Iiwib2JqIiwicGljayIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJkZWJ1ZyIsImltYWdlIiwicXVhbGl0eUxhYmVsIiwicmVwZWF0Iiwic3RyZXRjaGluZyIsImdldEFzcGVjdHJhdGlvIiwic2V0QXNwZWN0cmF0aW8iLCJhc3BlY3RyYXRpb18iLCJnZXREZWZhdWx0UGxheWJhY2tSYXRlIiwic2V0UXVhbGl0eUxhYmVsIiwibmV3TGFiZWwiLCJnZXRQbGF5YmFja1JhdGVzIiwiaXNQbGF5YmFja1JhdGVDb250cm9scyIsInBsYXlsaXN0XyIsImlzUmVwZWF0IiwiZ2V0U3RyZXRjaGluZyIsIkV2ZW50RW1pdHRlciIsIm9iamVjdCIsIl9ldmVudHMiLCJ0cmlnZ2VyRXZlbnRzIiwiZXZlbnRzIiwiYXJncyIsImNvbnRleHQiLCJldmVudCIsImxpc3RlbmVyIiwiYXBwbHkiLCJjYWxsIiwiYXJndW1lbnRzIiwiYWxsRXZlbnRzIiwiYWxsIiwibmFtZXMiLCJsIiwicmV0YWluIiwiaiIsImsiLCJfbGlzdGVuZXIiLCJvbmNlIiwiY291bnQiLCJvbmNlQ2FsbGJhY2siLCJMYXp5Q29tbWFuZEV4ZWN1dG9yIiwiaW5zdGFuY2UiLCJxdWV1ZWRDb21tYW5kcyIsImNvbW1hbmRRdWV1ZSIsInVuZGVjb3JhdGVkTWV0aG9kcyIsImV4ZWN1dGVNb2RlIiwiY29tbWFuZCIsIm1ldGhvZCIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwiY29tbWFuZF8iLCJjb21tYW5kUXVldWVJdGVtIiwiZmluZFdoZXJlIiwic3BsaWNlIiwiZmluZEluZGV4IiwiU3VwcG9ydENoZWNrZXIiLCJzdXBwb3J0TGlzdCIsImNoZWNrU3VwcG9ydCIsInNvdXJjZSIsIk1pbWVUeXBlcyIsImFhYyIsIm1wNCIsImY0diIsIm00diIsIm1vdiIsIm1wMyIsIm1wZWciLCJvZ3YiLCJvZ2ciLCJvZ2EiLCJ2b3JiaXMiLCJ3ZWJtIiwiZjRhIiwibTN1OCIsIm0zdSIsImhscyIsInZpZGVvIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2FuUGxheVR5cGUiLCJmaWxlIiwidHlwZSIsIm1pbWVUeXBlIiwiaXNIbHNTdXBwb3J0IiwiZ2V0TWVkaWFTb3VyY2UiLCJ3aW5kb3ciLCJNZWRpYVNvdXJjZSIsIldlYktpdE1lZGlhU291cmNlIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXIiLCJTb3VyY2VCdWZmZXIiLCJXZWJLaXRTb3VyY2VCdWZmZXIiLCJpc1R5cGVTdXBwb3J0ZWQiLCJzb3VyY2VCdWZmZXJWYWxpZEFQSSIsImFwcGVuZEJ1ZmZlciIsImZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSIsInNvcnVjZV8iLCJmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QiLCJzdXBwb3J0TmFtZXMiLCJpdGVtIiwic3VwcG9ydGVkIiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIlBST1ZJREVSX0RBU0giLCJQUk9WSURFUl9ITFMiLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIkNPTlRFTlRfU0VFS0VEIiwiUExBWUVSX1NUQVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfVElNRSIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfTEVWRUxTIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJQTEFZRVJfVU5LTldPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfRklMRV9FUlJPUiIsIlBMQVlFUl9DQVBUSU9OX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfQ0xPU0VEIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1ciLCJNYW5hZ2VyIiwiY3VycmVudFBsYXlsaXN0Iiwic3VwcG9ydENoZWNrZXIiLCJtYWtlUHJldHR5U291cmNlIiwic291cmNlXyIsImhvc3QiLCJhcHBsaWNhdGlvbiIsInN0cmVhbSIsIm1pbWV0eXBlUmVnRXgiLCJyZXBsYWNlIiwicHJldHRpZWRQbGF5bGlzdCIsInRyYWNrcyIsInBsYXlsaXN0SXRlbSIsImxldmVscyIsInByZXR0eVNvdXJjZSIsImRlZmF1bHRTb3VyY2UiLCJjYXB0aW9ucyIsImNvbmNhdCIsInRyYWNrIiwiQ29udHJvbGxlciIsInN1cHBvcnRDaGFja2VyIiwicmVnaXN0ZVByb3ZpZGVyIiwicHJvdmlkZXIiLCJQcm92aWRlckxvYWRlciIsImh0bWw1IiwicmVxdWlyZSIsImVyciIsIkVycm9yIiwid2VicnRjIiwiZGFzaCIsInJ0bXAiLCJzdXBwb3J0ZWRQcm92aWRlck5hbWVzIiwiUHJvbWlzZSIsInByb3ZpZGVyTmFtZSIsImZpbmRCeU5hbWUiLCJnZXRQcm92aWRlckJ5U291cmNlIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lIiwiX193ZWJwYWNrX3B1YmxpY19wYXRoX18iLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiY29udGFpbmVyRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwibm9kZVR5cGUiLCJjcmVhdGUiLCJwbGF5ZXJJbnN0YW5jZSIsImdldFBsYXllckxpc3QiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJnZXRQbGF5ZXJCeUluZGV4IiwicGxheWVySWQiLCJjb25zb2xlIiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwiTGEkIiwic2VsZWN0b3JPckVsZW1lbnQiLCJyZXR1cm5Ob2RlIiwiJGVsZW1lbnQiLCJzZWxlY3RvciIsIm5vZGVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsImV2ZXJ5IiwiaXNFbGVtZW50IiwiZmluZCIsImNzcyIsInZhbHVlIiwiZWxlbWVudCIsInN0eWxlIiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGFzc05hbWVzIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJyZW1vdmVDbGFzcyIsIlJlZ0V4cCIsImpvaW4iLCJyZW1vdmVBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInNob3ciLCJkaXNwbGF5IiwiaGlkZSIsImFwcGVuZCIsImh0bWxDb2RlIiwiaW5uZXJIVE1MIiwidGV4dCIsInRleHRDb250ZW50IiwiaGFzQ2xhc3MiLCJjb250YWlucyIsImlzIiwiJHRhcmdldEVsZW1lbnQiLCJvZmZzZXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwiYm9keSIsInNjcm9sbFRvcCIsImxlZnQiLCJzY3JvbGxMZWZ0IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJhdHRyIiwiZ2V0QXR0cmlidXRlIiwiaHRtbCIsInJlcGxhY2VXaXRoIiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVDaGlsZCIsImhhc0NoaWxkTm9kZXMiLCJmaXJzdENoaWxkIiwiZ2V0IiwiY2xvc2VzdCIsInNlbGVjdG9yU3RyaW5nIiwiY2xvc2VzdEVsZW1lbnQiLCJsb2dnZXIiLCJwcmV2Q29uc29sZUxvZyIsImVuYWJsZSIsInRyaW0iLCJuYXR1cmFsSG1zIiwic3RyaW5nIiwiZXh0cmFjdEV4dGVuc2lvbiIsInBhdGgiLCJnZXRBenVyZUZpbGVGb3JtYXQiLCJleHRlbnNpb24iLCJhenVyZWRGb3JtYXQiLCJsYXN0SW5kZXhPZiIsInNlY29uZCIsInNlY051bSIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsIm4iLCJzZWxmIiwiZ2xvYmFsIiwiciIsImUiLCJvIiwicyIsIlN5bWJvbCIsInUiLCJjIiwicCIsImhhc093blByb3BlcnR5IiwidCIsImEiLCJmIiwiX3dyYXBwZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiVkVSU0lPTiIsInYiLCJ5IiwiZCIsIml0ZXJhdGVlIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwicHJvcGVydHkiLCJnIiwibWF4IiwibSIsImIiLCJ4IiwicG93IiwiQSIsImVhY2giLCJjb2xsZWN0IiwiTyIsInJlZHVjZSIsImZvbGRsIiwiaW5qZWN0IiwicmVkdWNlUmlnaHQiLCJmb2xkciIsImRldGVjdCIsImZpbmRLZXkiLCJzZWxlY3QiLCJyZWplY3QiLCJuZWdhdGUiLCJzb21lIiwiYW55IiwiaW5jbHVkZXMiLCJpbmNsdWRlIiwidmFsdWVzIiwiaW52b2tlIiwicGx1Y2siLCJ3aGVyZSIsIm1pbiIsInNodWZmbGUiLCJzYW1wbGUiLCJyYW5kb20iLCJjbG9uZSIsInNvcnRCeSIsImNyaXRlcmlhIiwiZ3JvdXBCeSIsImluZGV4QnkiLCJjb3VudEJ5IiwiUyIsInRvQXJyYXkiLCJpc1N0cmluZyIsIm1hdGNoIiwic2l6ZSIsInBhcnRpdGlvbiIsImZpcnN0IiwiaGVhZCIsInRha2UiLCJpbml0aWFsIiwibGFzdCIsInJlc3QiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJCb29sZWFuIiwiTSIsImlzQXJndW1lbnRzIiwiZmxhdHRlbiIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzQm9vbGVhbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwidW56aXAiLCJ6aXAiLCJGIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwiRSIsInJhbmdlIiwiY2VpbCIsImNodW5rIiwiTiIsImJpbmQiLCJUeXBlRXJyb3IiLCJwYXJ0aWFsIiwicGxhY2Vob2xkZXIiLCJiaW5kQWxsIiwibWVtb2l6ZSIsImNhY2hlIiwiZGVsYXkiLCJzZXRUaW1lb3V0IiwiZGVmZXIiLCJ0aHJvdHRsZSIsImxlYWRpbmciLCJub3ciLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsImNhbmNlbCIsImRlYm91bmNlIiwid3JhcCIsImNvbXBvc2UiLCJhZnRlciIsImJlZm9yZSIsInJlc3RBcmd1bWVudHMiLCJJIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJUIiwiQiIsImNvbnN0cnVjdG9yIiwiYWxsS2V5cyIsIm1hcE9iamVjdCIsInBhaXJzIiwiaW52ZXJ0IiwiZnVuY3Rpb25zIiwibWV0aG9kcyIsIlIiLCJleHRlbmQiLCJleHRlbmRPd24iLCJhc3NpZ24iLCJxIiwiSyIsInoiLCJvbWl0IiwiU3RyaW5nIiwiZGVmYXVsdHMiLCJ0YXAiLCJpc01hdGNoIiwidmFsdWVPZiIsInBvcCIsImlzRXF1YWwiLCJpc0VtcHR5IiwiRCIsImNoaWxkTm9kZXMiLCJJbnQ4QXJyYXkiLCJpc0Zpbml0ZSIsImlzU3ltYm9sIiwiaXNOdWxsIiwiaXNVbmRlZmluZWQiLCJoYXMiLCJub0NvbmZsaWN0IiwiY29uc3RhbnQiLCJub29wIiwicHJvcGVydHlPZiIsIm1hdGNoZXMiLCJ0aW1lcyIsIkRhdGUiLCJnZXRUaW1lIiwiTCIsIlAiLCJXIiwiZXNjYXBlIiwidW5lc2NhcGUiLCJDIiwidW5pcXVlSWQiLCJ0ZW1wbGF0ZVNldHRpbmdzIiwiZXZhbHVhdGUiLCJpbnRlcnBvbGF0ZSIsIkoiLCJVIiwiViIsIiQiLCJ0ZW1wbGF0ZSIsInZhcmlhYmxlIiwiRnVuY3Rpb24iLCJjaGFpbiIsIl9jaGFpbiIsIkciLCJtaXhpbiIsInRvSlNPTiIsImlzUnRtcCIsImlzV2ViUlRDIiwiaXNEYXNoIiwiZ2V0U2NyaXB0UGF0aCIsInNjcmlwdE5hbWUiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzcmMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxpREFBeUMsa2pCQUFrakI7QUFDM2xCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQSx5Q0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUF3QixrQ0FBa0M7QUFDMUQsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFF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YixNQUF5QixDQUF0RCxJQUEyRGdILFNBQVMsUUFBNUU7QUFDSDtBQUNELFdBQU8sS0FBUDtBQUNILENBTE07QUFNQSxJQUFNa1ksMEJBQVMsU0FBVEEsTUFBUyxDQUFVblksSUFBVixFQUFnQkMsSUFBaEIsRUFBc0I7QUFDeEMsV0FBU0EsU0FBUyxLQUFULElBQW1CQSxTQUFTLE1BQTVCLElBQXNDQSxTQUFTLHNCQUEvQyxJQUF5RSwrQkFBaUJELElBQWpCLEtBQTBCLEtBQTVHO0FBQ0gsQ0FGTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1hQOzs7O0FBSU8sSUFBTW9ZLHdDQUFnQixTQUFoQkEsYUFBZ0IsQ0FBU0MsVUFBVCxFQUFxQjtBQUM5QyxRQUFNQyxVQUFVelksU0FBUzBZLG9CQUFULENBQThCLFFBQTlCLENBQWhCO0FBQ0EsU0FBSyxJQUFJOWxCLElBQUksQ0FBYixFQUFnQkEsSUFBSTZsQixRQUFRNWxCLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QztBQUNyQyxZQUFNK2xCLE1BQU1GLFFBQVE3bEIsQ0FBUixFQUFXK2xCLEdBQXZCO0FBQ0EsWUFBSUEsR0FBSixFQUFTO0FBQ0wsZ0JBQU14a0IsUUFBUXdrQixJQUFJM00sV0FBSixDQUFnQixNQUFNd00sVUFBdEIsQ0FBZDtBQUNBLGdCQUFJcmtCLFNBQVMsQ0FBYixFQUFnQjtBQUNaLHVCQUFPd2tCLElBQUlwZixNQUFKLENBQVcsQ0FBWCxFQUFjcEYsUUFBUSxDQUF0QixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsV0FBTyxFQUFQO0FBQ0gsQ0FaTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0pQOzs7QUFHTyxJQUFNbEMsNEJBQVUsa0JBQWhCLEMiLCJmaWxlIjoib3ZlbnBsYXllci5zZGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXIuc2RrXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcignTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKScpO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanNcIik7XG4iLCIvKiBnbG9iYWxzIF9fd2VicGFja19hbWRfb3B0aW9uc19fICovXHJcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCIvL2ltcG9ydCBDYXB0aW9uTWFuYWdlciBmcm9tIFwiYXBpL2NhcHRpb24vTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29uZmlndXJhdG9yIGZyb20gXCJhcGkvQ29uZmlndXJhdG9yXCI7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IExhenlDb21tYW5kRXhlY3V0b3IgZnJvbSBcImFwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yXCI7XHJcbmltcG9ydCBMb2dNYW5hZ2VyIGZyb20gXCJ1dGlscy9sb2dnZXJcIjtcclxuaW1wb3J0IFBsYXlsaXN0TWFuYWdlciBmcm9tIFwiYXBpL3BsYXlsaXN0L01hbmFnZXJcIjtcclxuaW1wb3J0IFByb3ZpZGVyQ29udHJvbGxlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL0NvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHtSRUFEWSwgRVJST1IsIElOSVRfRVJST1IsIERFU1RST1ksIE5FVFdPUktfVU5TVEFCTEVELCBQTEFZRVJfRklMRV9FUlJPUiwgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG9iamVjdCBjb25uZWN0cyBVSSB0byB0aGUgcHJvdmlkZXIuXHJcbiAqIEBwYXJhbSAgIHtvYmplY3R9ICAgIGNvbnRhaW5lciAgZG9tIGVsZW1lbnRcclxuICpcclxuICogKi9cclxuXHJcbmNvbnN0IEFwaSA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XHJcbiAgICBsZXQgbG9nTWFuYWdlciA9IExvZ01hbmFnZXIoKTtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbW092ZW5QbGF5ZXJdXSB2LlwiKyB2ZXJzaW9uKTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSBsb2FkZWQuXCIpO1xyXG4gICAgLy9sZXQgY2FwdGlvbk1hbmFnZXIgPSBDYXB0aW9uTWFuYWdlcih0aGF0KTtcclxuICAgIGxldCBwbGF5bGlzdE1hbmFnZXIgPSBQbGF5bGlzdE1hbmFnZXIoKTtcclxuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcclxuICAgIGxldCBjdXJyZW50UHJvdmlkZXIgPSBcIlwiO1xyXG4gICAgbGV0IHBsYXllckNvbmZpZyA9IFwiXCI7XHJcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcclxuXHJcbiAgICBjb25zdCBpbml0UHJvdmlkZXIgPSBmdW5jdGlvbihsYXN0UGxheVBvc2l0aW9uKXtcclxuICAgICAgICBjb25zdCBwaWNrUXVhbGl0eUZyb21Tb3VyY2UgPSAoc291cmNlcykgPT57XHJcbiAgICAgICAgICAgIHZhciBxdWFsaXR5ID0gMDtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpKS50aGVuKFByb3ZpZGVycyA9PiB7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tRdWFsaXR5RnJvbVNvdXJjZShwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyggXCJjdXJyZW50IHNvdXJjZSBpbmRleCA6IFwiKyBjdXJyZW50U291cmNlSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy9DYWxsIFByb3ZpZGVyLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XShjb250YWluZXIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpID09PSBQUk9WSURFUl9SVE1QKXtcclxuICAgICAgICAgICAgICAgIC8vSWYgcHJvdmlkZXIgdHlwZSBpcyBSVE1QLCB3ZSBhY2NlcHRzIFJ0bXBFeHBhbnNpb24uXHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoYXQsIEFwaVJ0bXBFeHBhbnNpb24oY3VycmVudFByb3ZpZGVyKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vVGhpcyBwYXNzZXMgdGhlIGV2ZW50IGNyZWF0ZWQgYnkgdGhlIFByb3ZpZGVyIHRvIEFQSS5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLm9uKFwiYWxsXCIsIGZ1bmN0aW9uKG5hbWUsIGRhdGEpe1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihuYW1lLCBkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0F1dG8gbmV4dCBzb3VyY2Ugd2hlbiBwbGF5ZXIgbG9hZCB3YXMgZmFpbCBieSBhbWlzcyBzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAvL2RhdGEuY29kZSA9PT0gUExBWUVSX0ZJTEVfRVJST1JcclxuICAgICAgICAgICAgICAgIGlmKCAobmFtZSA9PT0gRVJST1IgJiYgKHBhcnNlSW50KGRhdGEuY29kZS8xMDApID09PSAzIHx8IHBhcnNlSW50KGRhdGEuY29kZS8xMDApID09PSA1KSl8fCBuYW1lID09PSBORVRXT1JLX1VOU1RBQkxFRCApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UXVhbGl0eSA9IHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjdXJyZW50UXVhbGl0eS5pbmRleCsxIDwgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzKCkubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIHNlcXVlbnRpYWwgaGFzIGF2YWlsYWJsZSBzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkoY3VycmVudFF1YWxpdHkuaW5kZXgrMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSkudGhlbigoKT0+e1xyXG5cclxuICAgICAgICAgICAgLy9wcm92aWRlcidzIHByZWxvYWQoKSBoYXZlIHRvIG1hZGUgUHJvbWlzZS4gQ3V6IGl0IG92ZXJjb21lcyAnZmxhc2ggbG9hZGluZyB0aW1pbmcgcHJvYmxlbScuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5wcmVsb2FkKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpLCBsYXN0UGxheVBvc2l0aW9uICkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmZsdXNoKCk7XHJcbiAgICAgICAgICAgICAgICAvL1RoaXMgaXMgbm8gcmVhc29uIHRvIGV4aXN0IGFueW1vcmUuXHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihSRUFEWSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JPYmplY3QgPSB7Y29kZSA6IElOSVRfRVJST1IsIHJlYXNvbiA6IFwiaW5pdCBlcnJvci5cIiwgbWVzc2FnZSA6IFwiUGxheWVyIGluaXQgZXJyb3IuXCIsIGVycm9yIDogZXJyb3J9O1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBlcnJvck9iamVjdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvck9iamVjdCA9IHtjb2RlIDogSU5JVF9FUlJPUiwgcmVhc29uIDogXCJpbml0IGVycm9yLlwiLCBtZXNzYWdlIDogXCJQbGF5ZXIgaW5pdCBlcnJvci5cIiwgZXJyb3IgOiBlcnJvcn07XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgZXJyb3JPYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgLy94eHggOiBJZiB5b3UgaW5pdCBlbXB0eSBzb3VyY2VzLiAoSSB0aGluayB0aGlzIGlzIHN0cmFuZ2UgY2FzZS4pXHJcbiAgICAgICAgICAgIC8vVGhpcyB3b3JrcyBmb3IgdGhpcyBjYXNlLlxyXG4gICAgICAgICAgICAvL3BsYXllciA9IE92ZW5QbGF5ZXIuY3JlYXRlKFwiZWxJZFwiLCB7fSk7XHJcbiAgICAgICAgICAgIC8vcGxheWVyLmxvYWQoc29ydWNlcyk7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZS5yZW1vdmVBbmRFeGN1dGVPbmNlKFwibG9hZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIOy0iOq4sO2ZlCDtlajsiJhcclxuICAgICAqIGluaXRcclxuICAgICAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgcGxheWVyIGluaXRpYWwgb3B0aW9uIHZhbHVlLlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqKi9cclxuICAgIHRoYXQuaW5pdCA9IChvcHRpb25zKSA9PntcclxuICAgICAgICAvL0l0IGNvbGxlY3RzIHRoZSBjb21tYW5kcyBhbmQgZXhlY3V0ZXMgdGhlbSBhdCB0aGUgdGltZSB3aGVuIHRoZXkgYXJlIGV4ZWN1dGFibGUuXHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ2xvYWQnLCdwbGF5JywncGF1c2UnLCdzZWVrJywnc3RvcCcsICdnZXREdXJhdGlvbicsICdnZXRQb3NpdGlvbicsICdnZXRWb2x1bWUnLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnXSk7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnID0gQ29uZmlndXJhdG9yKG9wdGlvbnMpO1xyXG4gICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNEZWJ1ZygpKXtcclxuICAgICAgICAgICAgbG9nTWFuYWdlci5kaXNhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKVwiKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgIHBsYXlsaXN0TWFuYWdlci5zZXRQbGF5bGlzdChwbGF5ZXJDb25maWcuZ2V0UGxheWxpc3QoKSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHNvdXJjZXMgOiBcIiAsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcclxuICAgICAgICBpbml0UHJvdmlkZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyp0aGF0LmdldENvbnRhaW5lcklkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5pZDtcclxuICAgIH07Ki9cclxuXHJcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDb25maWcoKVwiLCBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkpO1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXREdXJhdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBvc2l0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFZvbHVtZSgpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm47fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFZvbHVtZSgpIFwiICsgdm9sdW1lKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRNdXRlKCkgXCIgKyBzdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRNdXRlKCkgXCIgKyBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAocGxheWxpc3QpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xyXG5cclxuICAgICAgICBpZihwbGF5bGlzdCl7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldFBsYXlsaXN0KHBsYXlsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluaXRQcm92aWRlcigpO1xyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGxheSgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGxheSgpO1xyXG4gICAgfVxyXG4gICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGF1c2UoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrKCkgXCIrIHBvc2l0aW9uKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2Vlayhwb3NpdGlvbik7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRQbGF5YmFja1JhdGUoKSBcIiwgcGxheWJhY2tSYXRlKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldFBsYXliYWNrUmF0ZShwbGF5ZXJDb25maWcuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZShwbGF5YmFja1JhdGUpKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXliYWNrUmF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UXVhbGl0eUxldmVscygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgcXVhbGl0eUluZGV4KTtcclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKTtcclxuICAgICAgICBsZXQgY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbdGhhdC5nZXRDdXJyZW50UXVhbGl0eSgpLmluZGV4XTtcclxuICAgICAgICBsZXQgbmV3U291cmNlID0gc291cmNlc1txdWFsaXR5SW5kZXhdO1xyXG4gICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gdGhhdC5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBpc1NhbWVQcm92aWRlciA9IHByb3ZpZGVyQ29udHJvbGxlci5pc1NhbWVQcm92aWRlcihjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpO1xyXG4gICAgICAgIC8vIHByb3ZpZGVyLnNlckN1cnJlbnRRdWFsaXR5IC0+IHBsYXllckNvbmZpZyBzZXR0aW5nIC0+IGxvYWRcclxuICAgICAgICBsZXQgcmVzUXVhbGl0eUluZGV4ID0gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KHF1YWxpdHlJbmRleCwgaXNTYW1lUHJvdmlkZXIpO1xyXG5cclxuICAgICAgICBpZighbmV3U291cmNlKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIGlzU2FtZVByb3ZpZGVyXCIsIGlzU2FtZVByb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgLy9jYXB0aW9uTWFuYWdlci5mbHVzaENhcHRpb25MaXN0KGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCkpO1xyXG5cclxuICAgICAgICBpZighaXNTYW1lUHJvdmlkZXIpe1xyXG4gICAgICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheSddKTtcclxuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc1F1YWxpdHlJbmRleDtcclxuICAgIH07XHJcblxyXG4gICAgLyogQ2FwdGlvbnMgOiBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgdmVyc2lvbi4qL1xyXG4gICAgLyp0aGF0LnNldEN1cnJlbnRDYXB0aW9uID0gKGluZGV4KSA9PntcclxuICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuc2V0Q3VycmVudENhcHRpb24oaW5kZXgpO1xyXG4gICAgIH1cclxuICAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT57XHJcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCk7XHJcbiAgICAgfVxyXG4gICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XHJcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XHJcbiAgICAgfVxyXG4gICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT4ge1xyXG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5hZGRDYXB0aW9uKCk7XHJcbiAgICAgfVxyXG4gICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XHJcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XHJcbiAgICAgfSovXHJcblxyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0QnVmZmVyKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKSk7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTdGF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc3RvcCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzdG9wKCkgXCIpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zdG9wKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgXCIpO1xyXG4gICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XHJcbiAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdmlkZXJDb250cm9sbGVyID0gbnVsbDtcclxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIHBsYXllckNvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgbGF6eVF1ZXVlID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhhdC50cmlnZ2VyKERFU1RST1kpO1xyXG4gICAgICAgIHRoYXQub2ZmKCk7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIC0gbGF6eVF1ZXVlLCBjdXJyZW50UHJvdmlkZXIsIHByb3ZpZGVyQ29udHJvbGxlciwgcGxheWxpc3RNYW5hZ2VyLCBwbGF5ZXJDb25maWcsIGFwaSBldmVudCBkZXN0cm9lZC4gXCIpO1xyXG4gICAgICAgIGxvZ01hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIGxvZ01hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyKHRoYXQuZ2V0Q29udGFpbmVySWQoKSk7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwaTtcclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgQXBpUnRtcEV4cGFuc2lvbiA9IGZ1bmN0aW9uKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGV4dGVybmFsQ2FsbGJhY2tDcmVlcCA6IChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgaWYocmVzdWx0Lm5hbWUgJiYgcmVzdWx0LmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci50cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwocmVzdWx0Lm5hbWUsIHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBpbml0aWFsaXplcyB0aGUgaW5wdXQgb3B0aW9ucy5cclxuICogQHBhcmFtICAgb3B0aW9uc1xyXG4gKlxyXG4gKiAqL1xyXG5jb25zdCBDb25maWd1cmF0b3IgPSBmdW5jdGlvbihvcHRpb25zKXtcclxuXHJcbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBkZWZhdWx0UGxheWJhY2tSYXRlOiAxLFxyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVDb250cm9sczogZmFsc2UsXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFswLjI1LCAwLjUsIDEsIDEuNSwgMl0sXHJcbiAgICAgICAgICAgIG11dGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2b2x1bWU6IDkwLFxyXG4gICAgICAgICAgICB3aWR0aDogNjQwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDM2MFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJjYXNlVmFsID0gdmFsLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIodmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2lkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHNlcmlhbGl6ZShvcHRpb25zW2tleV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplU2l6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbC5zbGljZSAmJiB2YWwuc2xpY2UoLTIpID09PSAncHgnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWwuc2xpY2UoMCwgLTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGV2YWx1YXRlQXNwZWN0UmF0aW8gPSBmdW5jdGlvbiAoYXIsIHdpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aWR0aC50b1N0cmluZygpLmluZGV4T2YoJyUnKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXIgIT09ICdzdHJpbmcnIHx8ICFhcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKC9eXFxkKlxcLj9cXGQrJSQvLnRlc3QoYXIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhci5pbmRleE9mKCc6Jyk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHcgPSBwYXJzZUZsb2F0KGFyLnN1YnN0cigwLCBpbmRleCkpO1xyXG4gICAgICAgICAgICBjb25zdCBoID0gcGFyc2VGbG9hdChhci5zdWJzdHIoaW5kZXggKyAxKSk7XHJcbiAgICAgICAgICAgIGlmICh3IDw9IDAgfHwgaCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKGggLyB3ICogMTAwKSArICclJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVzZXJpYWxpemUob3B0aW9ucyk7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgICAgICBjb25maWcud2lkdGggPSBub3JtYWxpemVTaXplKGNvbmZpZy53aWR0aCk7XHJcbiAgICAgICAgY29uZmlnLmhlaWdodCA9IG5vcm1hbGl6ZVNpemUoY29uZmlnLmhlaWdodCk7XHJcbiAgICAgICAgY29uZmlnLmFzcGVjdHJhdGlvID0gZXZhbHVhdGVBc3BlY3RSYXRpbyhjb25maWcuYXNwZWN0cmF0aW8sIGNvbmZpZy53aWR0aCk7XHJcblxyXG4gICAgICAgIGxldCByYXRlQ29udHJvbHMgPSBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHM7XHJcbiAgICAgICAgaWYgKHJhdGVDb250cm9scykge1xyXG4gICAgICAgICAgICBsZXQgcmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcztcclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhdGVDb250cm9scykpIHtcclxuICAgICAgICAgICAgICAgIHJhdGVzID0gcmF0ZUNvbnRyb2xzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJhdGVzID0gcmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KVxyXG4gICAgICAgICAgICAgICAgLm1hcChyYXRlID0+IE1hdGgucm91bmQocmF0ZSAqIDQpIC8gNCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmF0ZXMuaW5kZXhPZigxKSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJhdGVzLnB1c2goMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmF0ZXMuc29ydCgpO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSByYXRlcztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyB8fCBjb25maWcucGxheWJhY2tSYXRlcy5pbmRleE9mKGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlKSA8IDApIHtcclxuICAgICAgICAgICAgY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZSA9IGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlO1xyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5hc3BlY3RyYXRpbykge1xyXG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLmFzcGVjdHJhdGlvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29uZmlnUGxheWxpc3QgPSBjb25maWcucGxheWxpc3Q7XHJcbiAgICAgICAgaWYgKCFjb25maWdQbGF5bGlzdCkge1xyXG4gICAgICAgICAgICBjb25zdCBvYmogPSBfLnBpY2soY29uZmlnLCBbXHJcbiAgICAgICAgICAgICAgICAndGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyxcclxuICAgICAgICAgICAgICAgICdtZWRpYWlkJyxcclxuICAgICAgICAgICAgICAgICdpbWFnZScsXHJcbiAgICAgICAgICAgICAgICAnZmlsZScsXHJcbiAgICAgICAgICAgICAgICAnc291cmNlcycsXHJcbiAgICAgICAgICAgICAgICAndHJhY2tzJyxcclxuICAgICAgICAgICAgICAgICdwcmVsb2FkJyxcclxuICAgICAgICAgICAgICAgICdkdXJhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnaG9zdCcsXHJcbiAgICAgICAgICAgICAgICAnYXBwbGljYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3N0cmVhbSdcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBbIG9iaiBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0KSkge1xyXG4gICAgICAgICAgICBjb25maWcuZmVlZERhdGEgPSBjb25maWdQbGF5bGlzdDtcclxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gY29uZmlnUGxheWxpc3QucGxheWxpc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWxldGUgY29uZmlnLmR1cmF0aW9uO1xyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ29uZmlndXJhdG9yIGxvYWRlZC5cIiwgb3B0aW9ucyk7XHJcbiAgICBsZXQgY29uZmlnID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgbGV0IGFzcGVjdHJhdGlvID0gY29uZmlnLmFzcGVjdHJhdGlvIHx8IFwiMTY6OVwiO1xyXG4gICAgbGV0IGRlYnVnID0gY29uZmlnLmRlYnVnO1xyXG4gICAgbGV0IGRlZmF1bHRQbGF5YmFja1JhdGUgPSBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSB8fCAxO1xyXG4gICAgbGV0IGltYWdlID0gY29uZmlnLmltYWdlO1xyXG4gICAgbGV0IHBsYXliYWNrUmF0ZUNvbnRyb2xzID0gY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzIHx8IHRydWU7XHJcbiAgICBsZXQgcGxheWJhY2tSYXRlcyA9IGNvbmZpZy5wbGF5YmFja1JhdGVzIHx8IFswLjUsIDEsIDEuMjUsIDEuNSwgMl07XHJcbiAgICBsZXQgcGxheWxpc3QgPSBjb25maWcucGxheWxpc3QgfHwgW107XHJcbiAgICBsZXQgcXVhbGl0eUxhYmVsID0gY29uZmlnLnF1YWxpdHlMYWJlbCB8fCBcIlwiO1xyXG4gICAgbGV0IHJlcGVhdCA9IGNvbmZpZy5yZXBlYXQgfHwgZmFsc2U7XHJcbiAgICBsZXQgc3RyZXRjaGluZyA9IGNvbmZpZy5zdHJldGNoaW5nIHx8ICd1bmlmb3JtJztcclxuXHJcblxyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge3JldHVybiBjb25maWc7fTtcclxuXHJcbiAgICB0aGF0LmdldEFzcGVjdHJhdGlvID0oKT0+e3JldHVybiBhc3BlY3RyYXRpbzt9O1xyXG4gICAgdGhhdC5zZXRBc3BlY3RyYXRpbyA9KGFzcGVjdHJhdGlvXyk9Pnthc3BlY3RyYXRpbyA9IGFzcGVjdHJhdGlvXzt9O1xyXG5cclxuICAgIHRoYXQuaXNEZWJ1ZyA9KCk9PntyZXR1cm4gZGVidWc7fTtcclxuXHJcbiAgICB0aGF0LmdldERlZmF1bHRQbGF5YmFja1JhdGUgPSgpPT57cmV0dXJuIGRlZmF1bHRQbGF5YmFja1JhdGU7fTtcclxuICAgIHRoYXQuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KHBsYXliYWNrUmF0ZSk9PntkZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlOyByZXR1cm4gcGxheWJhY2tSYXRlO307XHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGFiZWwgPSAoKSA9PiB7cmV0dXJuIHF1YWxpdHlMYWJlbDt9O1xyXG4gICAgdGhhdC5zZXRRdWFsaXR5TGFiZWwgPSAobmV3TGFiZWwpID0+IHtxdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDt9O1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlcyA9KCk9PntyZXR1cm4gcGxheWJhY2tSYXRlczt9O1xyXG4gICAgdGhhdC5pc1BsYXliYWNrUmF0ZUNvbnRyb2xzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVDb250cm9sczt9O1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSgpPT57cmV0dXJuIHBsYXlsaXN0O307XHJcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3RfICk9PntcclxuICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RfKSl7XHJcbiAgICAgICAgICAgIHBsYXlsaXN0ID0gcGxheWxpc3RfO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwbGF5bGlzdCA9IFtwbGF5bGlzdF9dO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGxheWxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXNSZXBlYXQgPSgpPT57cmV0dXJuIHJlcGVhdDt9O1xyXG5cclxuICAgIHRoYXQuZ2V0U3RyZXRjaGluZyA9KCk9PntyZXR1cm4gc3RyZXRjaGluZzt9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdG9yO1xyXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAzLi5cbiAqL1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbW9kdWxlIHByb3ZpZGUgY3VzdG9tIGV2ZW50cy5cbiAqIEBwYXJhbSAgIG9iamVjdCAgICBBbiBvYmplY3QgdGhhdCByZXF1aXJlcyBjdXN0b20gZXZlbnRzLlxuICpcbiAqICovXG5cbmNvbnN0IEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgbGV0IHRoYXQgPSBvYmplY3Q7XG4gICAgbGV0IF9ldmVudHMgPVtdO1xuXG4gICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgY29udGV4dCl7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGxlbmd0aCA9IGV2ZW50cy5sZW5ndGg7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICBldmVudC5saXN0ZW5lci5hcHBseSggKCBldmVudC5jb250ZXh0IHx8IGNvbnRleHQgKSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgKF9ldmVudHNbbmFtZV0gfHwgKF9ldmVudHNbbmFtZV09W10pICkucHVzaCh7IGxpc3RlbmVyOiBsaXN0ZW5lciAgLCBjb250ZXh0IDogY29udGV4dH0pO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgY29uc3QgYWxsRXZlbnRzID0gX2V2ZW50cy5hbGw7XG5cbiAgICAgICAgaWYoZXZlbnRzKXtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgICAgICBpZihhbGxFdmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cywgdGhhdCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5hbWUgJiYgIWxpc3RlbmVyICYmICFjb250ZXh0KSAge1xuICAgICAgICAgICAgX2V2ZW50cyA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyhfZXZlbnRzKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXRhaW4gPSBfZXZlbnRzW25hbWVdID0gW107XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyICB8fCBjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIubGlzdGVuZXIgICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5fbGlzdGVuZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldmVudC5jb250ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgfTtcbiAgICB0aGF0Lm9uY2UgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IG9uY2VDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGNvdW50KyspIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0Lm9mZihuYW1lLCBvbmNlQ2FsbGJhY2spO1xuICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgICAgb25jZUNhbGxiYWNrLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhhdC5vbihuYW1lLCBvbmNlQ2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRFbWl0dGVyO1xuIiwiaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBleGVjdXRlcyB0aGUgaW5wdXQgY29tbWFuZHMgYXQgYSBzcGVjaWZpYyBwb2ludCBpbiB0aW1lLlxuICogQHBhcmFtICAgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHF1ZXVlZENvbW1hbmRzXG4gKiAqL1xuY29uc3QgTGF6eUNvbW1hbmRFeGVjdXRvciA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgcXVldWVkQ29tbWFuZHMpIHtcbiAgICBsZXQgY29tbWFuZFF1ZXVlID0gW107XG4gICAgbGV0IHVuZGVjb3JhdGVkTWV0aG9kcyA9IHt9O1xuICAgIGxldCBleGVjdXRlTW9kZSA9IGZhbHNlO1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciBsb2FkZWQuXCIpO1xuICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gaW5zdGFuY2VbY29tbWFuZF07XG4gICAgICAgIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSA9IG1ldGhvZCB8fCBmdW5jdGlvbigpe307XG5cbiAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICAgICAgICBpZiAoIWV4ZWN1dGVNb2RlKSB7XG4gICAgICAgICAgICAgICAgLy9jb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgICAgICAgICAgICAgdGhhdC5hZGRRdWV1ZShjb21tYW5kLCBhcmdzKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZC5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgdmFyIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2hpbGUgKGNvbW1hbmRRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNvbW1hbmQsIGFyZ3MgfSA9IGNvbW1hbmRRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgKHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSB8fCBpbnN0YW5jZVtjb21tYW5kXSkuYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhhdC5zZXRFeGVjdXRlTW9kZSA9IChtb2RlKSA9PiB7XG4gICAgICAgIGV4ZWN1dGVNb2RlID0gbW9kZTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHNldEV4ZWN1dGVNb2RlKClcIiwgbW9kZSk7XG4gICAgfTtcbiAgICB0aGF0LmdldFVuZGVjb3JhdGVkTWV0aG9kcyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRVbmRlY29yYXRlZE1ldGhvZHMoKVwiLCB1bmRlY29yYXRlZE1ldGhvZHMpO1xuICAgICAgICByZXR1cm4gdW5kZWNvcmF0ZWRNZXRob2RzO1xuICAgIH1cbiAgICB0aGF0LmdldFF1ZXVlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFF1ZXVlKClcIiwgZ2V0UXVldWUpO1xuICAgICAgICByZXR1cm4gY29tbWFuZFF1ZXVlO1xuICAgIH1cbiAgICB0aGF0LmFkZFF1ZXVlID0gZnVuY3Rpb24oY29tbWFuZCwgYXJncyl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBhZGRRdWV1ZSgpXCIsIGNvbW1hbmQsIGFyZ3MpO1xuICAgICAgICBjb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgfVxuXG4gICAgdGhhdC5mbHVzaCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBmbHVzaCgpXCIpO1xuICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcbiAgICB9O1xuICAgIHRoYXQuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGVtcHR5KClcIik7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5sZW5ndGggPSAwO1xuICAgIH07XG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IG9mZigpXCIpO1xuICAgICAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XG4gICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgLy9SdW4gb25jZSBhdCB0aGUgZW5kXG4gICAgdGhhdC5yZW1vdmVBbmRFeGN1dGVPbmNlID0gZnVuY3Rpb24oY29tbWFuZF8pe1xuICAgICAgICBsZXQgY29tbWFuZFF1ZXVlSXRlbSA9IF8uZmluZFdoZXJlKGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogcmVtb3ZlQW5kRXhjdXRlT25jZSgpXCIsIGNvbW1hbmRfKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLnNwbGljZShfLmZpbmRJbmRleChjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KSwgMSk7XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcbiAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicmVtb3ZlQ29tbWFuZCgpXCIpO1xuICAgICAgICAgICAgaWYoY29tbWFuZFF1ZXVlSXRlbSl7XG4gICAgICAgICAgICAgICAgKG1ldGhvZHx8IGluc3RhbmNlW2NvbW1hbmRfXSkuYXBwbHkoaW5zdGFuY2UsIGNvbW1hbmRRdWV1ZUl0ZW0uYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kX10gPSBtZXRob2Q7XG4gICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgdGhhdC5vZmYoKTtcbiAgICAgICAgdGhhdC5lbXB0eSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IExhenlDb21tYW5kRXhlY3V0b3I7IiwiaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2h9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGZpbmRzIHRoZSBwcm92aWRlciB0aGF0IG1hdGNoZXMgdGhlIGlucHV0IHNvdXJjZS5cclxuICogQHBhcmFtXHJcbiAqICovXHJcblxyXG5jb25zdCBTdXBwb3J0Q2hlY2tlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciBsb2FkZWQuXCIpO1xyXG4gICAgY29uc3Qgc3VwcG9ydExpc3QgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnaHRtbDUnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IE1pbWVUeXBlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhYWM6ICdhdWRpby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZjR2OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtNHY6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdjogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbXAzOiAnYXVkaW8vbXBlZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbXBlZzogJ2F1ZGlvL21wZWcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9ndjogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2dnOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ2E6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZvcmJpczogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgd2VibTogJ3ZpZGVvL3dlYm0nLFxyXG4gICAgICAgICAgICAgICAgICAgIGY0YTogJ3ZpZGVvL2FhYycsXHJcbiAgICAgICAgICAgICAgICAgICAgbTN1ODogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcclxuICAgICAgICAgICAgICAgICAgICBtM3U6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGxzOiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZighdHlwZSl7cmV0dXJuIGZhbHNlO31cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFtaW1lVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISF2aWRlby5jYW5QbGF5VHlwZShtaW1lVHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3dlYnJ0YycsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2Rhc2gnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL21wZCBhcHBsaWNhdGlvbi9kYXNoK3htbFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRGFzaChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdobHMnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdGhpcyBtZXRob2QgZnJvbSBobHMuanNcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzSGxzU3VwcG9ydCA9ICgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRNZWRpYVNvdXJjZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Lk1lZGlhU291cmNlIHx8IHdpbmRvdy5XZWJLaXRNZWRpYVNvdXJjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVkaWFTb3VyY2UgPSBnZXRNZWRpYVNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXIgPSB3aW5kb3cuU291cmNlQnVmZmVyIHx8IHdpbmRvdy5XZWJLaXRTb3VyY2VCdWZmZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzVHlwZVN1cHBvcnRlZCA9IG1lZGlhU291cmNlICYmIHR5cGVvZiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQgPT09ICdmdW5jdGlvbicgJiYgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFLG1wNGEuNDAuMlwiJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIFNvdXJjZUJ1ZmZlciBpcyBleHBvc2VkIGVuc3VyZSBpdHMgQVBJIGlzIHZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2FmYXJpIGFuZCBvbGQgdmVyc2lvbiBvZiBDaHJvbWUgZG9lIG5vdCBleHBvc2UgU291cmNlQnVmZmVyIGdsb2JhbGx5IHNvIGNoZWNraW5nIFNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgaXMgaW1wb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXJWYWxpZEFQSSA9ICFzb3VyY2VCdWZmZXIgfHwgc291cmNlQnVmZmVyLnByb3RvdHlwZSAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5hcHBlbmRCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUucmVtb3ZlID09PSAnZnVuY3Rpb24nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWlzVHlwZVN1cHBvcnRlZCAmJiAhIXNvdXJjZUJ1ZmZlclZhbGlkQVBJO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIHRoaXMgJyEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyknIGlmIHlvdSB3YW50IHRvIHVzZSBobHNqcy5cclxuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKSAmJiAhIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdydG1wJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBdO1xyXG5cclxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlID0gKHNvcnVjZV8pID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSgpXCIsIHNvcnVjZV8pO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IChzb3J1Y2VfID09PSBPYmplY3Qoc29ydWNlXykpID8gc29ydWNlXyA6IHt9O1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdXBwb3J0TGlzdC5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBpZihzdXBwb3J0TGlzdFtpXS5jaGVja1N1cHBvcnQoc291cmNlKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydExpc3RbaV0ubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCA9IChwbGF5bGlzdF8pID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCgpXCIsIHBsYXlsaXN0Xyk7XHJcbiAgICAgICAgbGV0IHN1cHBvcnROYW1lcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBwbGF5bGlzdF9baV07XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2UgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSBpdGVtLnNvdXJjZXNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnROYW1lcy5wdXNoKHN1cHBvcnRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdXBwb3J0TmFtZXM7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjtcclxuIiwiLy8gU1RBVEVcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9IFwiYnVmZmVyaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9JRExFID0gXCJpZGxlXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9DT01QTEVURSA9IFwiY29tcGxldGVcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9IFwicGF1c2VkXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9QTEFZSU5HID0gXCJwbGF5aW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9FUlJPUiA9IFwiZXJyb3JcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSBcImxvYWRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1NUQUxMRUQgPSBcInN0YWxsZWRcIjtcclxuXHJcblxyXG4vLyBQUk9WSURFUlxyXG5leHBvcnQgY29uc3QgUFJPVklERVJfSFRNTDUgPSBcImh0bWw1XCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9XRUJSVEMgPSBcIndlYnJ0Y1wiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9IFwiZGFzaFwiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfSExTID0gXCJobHNcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1JUTVAgPSBcInJ0bXBcIjtcclxuXHJcbi8vIEVWRU5UU1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xyXG5leHBvcnQgY29uc3QgUkVBRFkgPSBcInJlYWR5XCI7XHJcbmV4cG9ydCBjb25zdCBERVNUUk9ZID0gXCJkZXN0cm95XCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NFRUsgPSBcInNlZWtcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSX0ZVTEwgPSBcImJ1ZmZlckZ1bGxcIjtcclxuZXhwb3J0IGNvbnN0IERJU1BMQVlfQ0xJQ0sgPSBcImRpc3BsYXlDbGlja1wiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9MT0FERUQgPSBcImxvYWRlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLRUQgPSBcInNlZWtlZFwiO1xyXG5leHBvcnQgY29uc3QgTkVUV09SS19VTlNUQUJMRUQgPSBcInVuc3RhYmxlTmV0d29ya1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVSUk9SID0gXCJlcnJvclwiO1xyXG5cclxuLy8gU1RBVEUgT0YgUExBWUVSXHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfU1RBVEUgPSBcInN0YXRlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfUEFVU0UgPSBcInBhdXNlXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfUExBWSA9IFwicGxheVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSID0gXCJidWZmZXJDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUUgPSBcInRpbWVcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfUkFURV9DSEFOR0UgPSBcInJhdGVjaGFuZ2VcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVk9MVU1FID0gXCJ2b2x1bWVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX01VVEUgPSBcIm11dGVcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTUVUQSA9IFwibWV0YUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxTID0gXCJxdWFsaXR5TGV2ZWxDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMX0NIQU5HRUQgPSBcImN1cnJlbnRRdWFsaXR5TGV2ZWxDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZQkFDS19SQVRFX0NIQU5HRUQgPSBcInBsYXliYWNrUmF0ZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCA9IFwiY3VlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQgPSBcImNhcHRpb25DaGFuZ2VkXCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IElOSVRfRVJST1IgPSAxMDA7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9FUlJPUiA9IDMwMDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiA9IDMwMTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IgPSAzMDI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IgPSAzMDM7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfRklMRV9FUlJPUiA9IDMwNDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DQVBUSU9OX0VSUk9SID0gMzA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19XU19FUlJPUiA9IDUwMTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfQ0xPU0VEID0gNTAyO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAzO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IgPSA1MDQ7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA2O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1cgPSA1MTA7XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2V4dHJhY3RFeHRlbnNpb24gLHRyaW19IGZyb20gXCIuLi8uLi91dGlscy9zdHJpbmdzXCI7XHJcbmltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiLi4vU3VwcG9ydENoZWNrZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgUGxheWxpc3Qgb3IgU291cmNlcy5cclxuICogQHBhcmFtXHJcbiAqXHJcbiAqICovXHJcbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGN1cnJlbnRQbGF5bGlzdCA9IFtdO1xyXG4gICAgbGV0IHN1cHBvcnRDaGVja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCBtYWtlUHJldHR5U291cmNlID0gZnVuY3Rpb24oc291cmNlXyl7XHJcbiAgICAgICAgaWYgKCFzb3VyY2VfIHx8ICFzb3VyY2VfLmZpbGUgJiYgIShzb3VyY2VfLmhvc3QgfHwgc291cmNlXy5hcHBsaWNhdGlvbiB8fCBzb3VyY2VfLnN0cmVhbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIHsgJ2RlZmF1bHQnOiBmYWxzZSB9LCBzb3VyY2VfKTtcclxuICAgICAgICBzb3VyY2UuZmlsZSA9IHRyaW0oJycgKyBzb3VyY2UuZmlsZSk7XHJcblxyXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcclxuICAgICAgICAgICAgc291cmNlLmZpbGUgPSBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvc3RyZWFtL1wiICsgc291cmNlLnN0cmVhbTtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5ob3N0O1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmFwcGxpY2F0aW9uO1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLnN0cmVhbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1pbWV0eXBlUmVnRXggPSAvXlteL10rXFwvKD86eC0pPyhbXi9dKykkLztcclxuXHJcbiAgICAgICAgaWYgKG1pbWV0eXBlUmVnRXgudGVzdChzb3VyY2UudHlwZSkpIHtcclxuICAgICAgICAgICAgLy8gaWYgdHlwZSBpcyBnaXZlbiBhcyBhIG1pbWV0eXBlXHJcbiAgICAgICAgICAgIHNvdXJjZS5taW1lVHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IHNvdXJjZS50eXBlLnJlcGxhY2UobWltZXR5cGVSZWdFeCwgJyQxJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihpc1J0bXAoc291cmNlLmZpbGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnd2VicnRjJztcclxuICAgICAgICB9ZWxzZSBpZihpc0Rhc2goc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2Rhc2gnO1xyXG4gICAgICAgIH1lbHNlIGlmICghc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBleHRyYWN0RXh0ZW5zaW9uKHNvdXJjZS5maWxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbm9ybWFsaXplIHR5cGVzXHJcbiAgICAgICAgc3dpdGNoIChzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdtM3U4JzpcclxuICAgICAgICAgICAgY2FzZSAndm5kLmFwcGxlLm1wZWd1cmwnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnaGxzJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtNGEnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnYWFjJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzbWlsJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlW2tleV0gPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgc291cmNlW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0KSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgc2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3QpO1xyXG4gICAgICAgIGNvbnN0IHByZXR0aWVkUGxheWxpc3QgPSAoXy5pc0FycmF5KHBsYXlsaXN0KSA/IHBsYXlsaXN0IDogW3BsYXlsaXN0XSkubWFwKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KGl0ZW0udHJhY2tzKSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0udHJhY2tzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwbGF5bGlzdEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tzOiBbXVxyXG4gICAgICAgICAgICB9LCBpdGVtICk7XHJcblxyXG4gICAgICAgICAgICBpZigocGxheWxpc3RJdGVtLnNvdXJjZXMgPT09IE9iamVjdChwbGF5bGlzdEl0ZW0uc291cmNlcykpICYmICFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzKV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBpdGVtLmxldmVscztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShpdGVtKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBwcmV0dHlTb3VyY2UgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdFNvdXJjZSA9IHNvdXJjZS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNvdXJjZSBkb2Vzbid0IGhhdmUgYSBsYWJlbCwgbnVtYmVyIGl0XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS50eXBlK1wiLVwiK2kudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlTb3VyY2UgPSBtYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmKHN1cHBvcnRDaGVja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShwcmV0dHlTb3VyY2UpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IHByZXR0eVNvdXJjZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBwbGF5bGlzdEl0ZW0uc291cmNlcy5maWx0ZXIoc291cmNlID0+ICEhc291cmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmF1bHQg6rCAIOyXhuydhOuVjCB3ZWJydGPqsIAg7J6I64uk66m0IHdlYnJ0YyBkZWZhdWx0IDogdHJ1ZeuhnCDsnpDrj5kg7ISk7KCVXHJcbiAgICAgICAgICAgIC8qbGV0IGhhdmVEZWZhdWx0ID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UuZGVmYXVsdCA9PSB0cnVlO30pO1xyXG4gICAgICAgICAgICBsZXQgd2VicnRjU291cmNlID0gW107XHJcbiAgICAgICAgICAgIGlmKCFoYXZlRGVmYXVsdCl7XHJcbiAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS50eXBlID09IFwid2VicnRjXCI7fSk7XHJcbiAgICAgICAgICAgICAgICBpZih3ZWJydGNTb3VyY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZS5kZWZhdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSovXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnRyYWNrcykpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLmNvbmNhdChwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHBsYXlsaXN0SXRlbS5jYXB0aW9ucztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MubWFwKGZ1bmN0aW9uKHRyYWNrKXtcclxuICAgICAgICAgICAgICAgIGlmKCF0cmFjayB8fCAhdHJhY2suZmlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHtcclxuICAgICAgICAgICAgICAgICAgICAna2luZCc6ICdjYXB0aW9ucycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgdHJhY2spO1xyXG4gICAgICAgICAgICB9KS5maWx0ZXIodHJhY2sgPT4gISF0cmFjayk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGxheWxpc3RJdGVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGN1cnJlbnRQbGF5bGlzdCA9IHByZXR0aWVkUGxheWxpc3Q7XHJcbiAgICAgICAgcmV0dXJuIHByZXR0aWVkUGxheWxpc3Q7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0UGxheWxpc3QoKSBcIiwgY3VycmVudFBsYXlsaXN0KTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9XZSBkbyBub3Qgc3VwcG9ydCBcIlBMQVlMSVNUXCIgbm90IHlldC4gU28gdGhpcyByZXR1cm5zIHBsYXlsaXN0IG9mIDAuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldEN1cnJlbnRTb3VyY2VzKCkgXCIsIGN1cnJlbnRQbGF5bGlzdFswXS5zb3VyY2VzKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFBsYXlsaXN0WzBdLnNvdXJjZXM7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsImltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiYXBpL1N1cHBvcnRDaGVja2VyXCI7XHJcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBwcm92aWRlci5cclxuICogQHBhcmFtXHJcbiAqICovXHJcbmNvbnN0IENvbnRyb2xsZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHN1cHBvcnRDaGFja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcclxuICAgIGNvbnN0IFByb3ZpZGVycyA9IHt9O1xyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkZWQuXCIpO1xyXG5cclxuICAgIGNvbnN0IHJlZ2lzdGVQcm92aWRlciA9IChuYW1lLCBwcm92aWRlcikgPT57XHJcbiAgICAgICAgaWYoUHJvdmlkZXJzW25hbWVdKXtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIF9yZWdpc3RlclByb3ZpZGVyKCkgXCIsIG5hbWUpO1xyXG4gICAgICAgIFByb3ZpZGVyc1tuYW1lXSA9IHByb3ZpZGVyO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBQcm92aWRlckxvYWRlciA9e1xyXG4gICAgICAgIGh0bWw1OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L0h0bWw1J10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9IdG1sNScpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiaHRtbDVcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2VicnRjIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L1dlYlJUQyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvV2ViUlRDJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJ3ZWJydGNcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGFzaCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9EYXNoJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9EYXNoJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJkYXNoXCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBobHMgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvSGxzJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9IbHMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcImhsc1wiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydG1wIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2ZsYXNoL1J0bXAnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2ZsYXNoL1J0bXAnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcInJ0bXBcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmxvYWRQcm92aWRlcnMgPSAocGxheWxpc3QpID0+e1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QocGxheWxpc3QpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkUHJvdmlkZXJzKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcclxuICAgICAgICAgICAgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcy5maWx0ZXIoZnVuY3Rpb24ocHJvdmlkZXJOYW1lKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhIVByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV07XHJcbiAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbihwcm92aWRlck5hbWUpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSBQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5maW5kQnlOYW1lID0gKG5hbWUpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZmluZEJ5TmFtZSgpIFwiLCBuYW1lKTtcclxuICAgICAgICByZXR1cm4gUHJvdmlkZXJzW25hbWVdO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFByb3ZpZGVyQnlTb3VyY2UgPSAoc291cmNlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGdldFByb3ZpZGVyQnlTb3VyY2UoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhhdC5maW5kQnlOYW1lKHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXNTYW1lUHJvdmlkZXIgPSAoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGlzU2FtZVByb3ZpZGVyKCkgXCIsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSAsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpICk7XHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSA9PT0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7XHJcbiIsImltcG9ydCBBUEkgZnJvbSAnYXBpL0FwaSc7XHJcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gJ3V0aWxzL3ZhbGlkYXRvcic7XHJcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xyXG5pbXBvcnQgTGEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcbmltcG9ydCB7Z2V0U2NyaXB0UGF0aH0gZnJvbSAndXRpbHMvd2VicGFjayc7XHJcblxyXG5cclxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSBnZXRTY3JpcHRQYXRoKCdvdmVucGxheWVyLnNkay5qcycpO1xyXG5cclxuLyoqXHJcbiAqIE1haW4gT3ZlblBsYXllclNESyBvYmplY3RcclxuICovXHJcbmNvbnN0IE92ZW5QbGF5ZXJTREsgPSB3aW5kb3cuT3ZlblBsYXllclNESyA9IHt9O1xyXG5cclxuY29uc3QgcGxheWVyTGlzdCA9IE92ZW5QbGF5ZXJTREsucGxheWVyTGlzdCA9IFtdO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudCA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xyXG5cclxuICAgIGlmICghY29udGFpbmVyKSB7XHJcblxyXG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXIpO1xyXG4gICAgfSBlbHNlIGlmIChjb250YWluZXIubm9kZVR5cGUpIHtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb250YWluZXJFbGVtZW50O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHBsYXllciBpbnN0YW5jZSBhbmQgcmV0dXJuIGl0LlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nIHwgZG9tIGVsZW1lbnR9IGNvbnRhaW5lciAgSWQgb2YgY29udGFpbmVyIGVsZW1lbnQgb3IgY29udGFpbmVyIGVsZW1lbnRcclxuICogQHBhcmFtICAgICAge29iamVjdH0gb3B0aW9ucyAgVGhlIG9wdGlvbnNcclxuICovXHJcbk92ZW5QbGF5ZXJTREsuY3JlYXRlID0gZnVuY3Rpb24oY29udGFpbmVyLCBvcHRpb25zKSB7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IEFQSShjb250YWluZXJFbGVtZW50KTtcclxuICAgIHBsYXllckluc3RhbmNlLmluaXQob3B0aW9ucyk7XHJcblxyXG4gICAgcGxheWVyTGlzdC5wdXNoKHBsYXllckluc3RhbmNlKTtcclxuXHJcbiAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGxpc3QuXHJcbiAqXHJcbiAqIEByZXR1cm4gICAgIHthcnJheX0gIFRoZSBwbGF5ZXIgbGlzdC5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXJMaXN0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBjb250YWluZXIgaWQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9ICBjb250YWluZXJJZCAgVGhlIGNvbnRhaW5lciBpZGVudGlmaWVyXHJcbiAqIEByZXR1cm4gICAgIHtvYmVqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5Q29udGFpbmVySWQgPSBmdW5jdGlvbihjb250YWluZXJJZCkge1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkgKyspIHtcclxuXHJcbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uZ2V0Q29udGFpbmVySWQoKSA9PT0gY29udGFpbmVySWQpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJMaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgaW5kZXguXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtudW1iZXJ9ICBpbmRleCAgIFRoZSBpbmRleFxyXG4gKiBAcmV0dXJuICAgICB7b2JqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5SW5kZXggPSBmdW5jdGlvbihpbmRleCkge1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gcGxheWVyTGlzdFtpbmRleF07XHJcblxyXG4gICAgaWYgKHBsYXllckluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IHBsYXllcklkLlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7cGxheWVySWR9ICBpZFxyXG4gKiBAcmV0dXJuICAgICB7bnVsbH1cclxuICovXHJcbk92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyID0gZnVuY3Rpb24ocGxheWVySWQpIHtcclxuICAgIGNvbnNvbGUubG9nKHBsYXllcklkKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkgKyspIHtcclxuXHJcbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uZ2V0Q29udGFpbmVySWQoKSA9PT0gcGxheWVySWQpIHtcclxuXHJcbiAgICAgICAgICAgIHBsYXllckxpc3Quc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgd2VicnRjIHNvdXJjZSBmb3IgcGxheWVyIHNvdXJjZSB0eXBlLlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7T2JqZWN0IHwgQXJyYXl9ICBzb3VyY2UgICB3ZWJydGMgc291cmNlXHJcbiAqIEByZXR1cm4gICAgIHtBcnJheX0gIFBsYXllciBzb3VyY2UgT2JlamN0LlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZW5lcmF0ZVdlYnJ0Y1VybHMgPSBmdW5jdGlvbihzb3VyY2VzKSB7XHJcbiAgICByZXR1cm4gKF8uaXNBcnJheShzb3VyY2VzKSA/IHNvdXJjZXMgOiBbc291cmNlc10pLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KXtcclxuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBpc1dlYlJUQyhzb3VyY2UuaG9zdCkgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xyXG4gICAgICAgICAgICByZXR1cm4ge2ZpbGUgOiBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvXCIgKyBzb3VyY2Uuc3RyZWFtLCB0eXBlIDogXCJ3ZWJydGNcIiwgbGFiZWwgOiBzb3VyY2UubGFiZWwgPyBzb3VyY2UubGFiZWwgOiBcIndlYnJ0Yy1cIisoaW5kZXgrMSkgfTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE92ZW5QbGF5ZXJTREs7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjMuLlxyXG4gKi9cclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBJdCB3YXMgcmVwbGFjZSBqcXVlcnkncyBzZWxlY3Rvci4gSXQgT2Z0ZW4gdXNlZCBieSBPdmVuVGVtcGxhdGUuICgvdmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlLmpzKVxyXG4gKiBAcGFyYW0gICBzZWxlY3Rvck9yRWxlbWVudCAgc3RyaW5nIG9yIGVsZW1lbnRcclxuICpcclxuICogKi9cclxuXHJcblxyXG5jb25zdCBMYSQgPSBmdW5jdGlvbihzZWxlY3Rvck9yRWxlbWVudCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBjb25zdCByZXR1cm5Ob2RlID0gZnVuY3Rpb24oJGVsZW1lbnQgLCBzZWxlY3Rvcil7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gICRlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgICAgIGlmKG5vZGVMaXN0Lmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3Q7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdFswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgJGVsZW1lbnQgPSBcIlwiO1xyXG5cclxuICAgIGlmKCBfLmV2ZXJ5KHNlbGVjdG9yT3JFbGVtZW50LCBmdW5jdGlvbihpdGVtKXtyZXR1cm4gXy5pc0VsZW1lbnQoaXRlbSl9KSl7XHJcbiAgICAgICAgJGVsZW1lbnQgPSBzZWxlY3Rvck9yRWxlbWVudDtcclxuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcImRvY3VtZW50XCIpe1xyXG4gICAgICAgICRlbGVtZW50ID0gZG9jdW1lbnQ7XHJcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJ3aW5kb3dcIil7XHJcbiAgICAgICAgJGVsZW1lbnQgPSB3aW5kb3c7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICAkZWxlbWVudCA9IHJldHVybk5vZGUoZG9jdW1lbnQsIHNlbGVjdG9yT3JFbGVtZW50KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYoISRlbGVtZW50KXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmZpbmQgPSAoc2VsZWN0b3IpID0+e1xyXG4gICAgICAgIHJldHVybiBMYSQocmV0dXJuTm9kZSgkZWxlbWVudCwgc2VsZWN0b3IpKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jc3MgPSAobmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICBpZigkZWxlbWVudC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYWRkQ2xhc3MgPSAobmFtZSkgPT57XHJcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSAkZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgICAgICBpZihjbGFzc05hbWVzLmluZGV4T2YobmFtZSkgPT09IC0xKXtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSArPSBcIiBcIiArIG5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlbW92ZUNsYXNzID0gKG5hbWUpID0+e1xyXG4gICAgICAgIGlmICgkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgPSAkZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgbmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlbW92ZUF0dHJpYnV0ZSA9IChhdHRyTmFtZSkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuc2hvdyA9ICgpID0+e1xyXG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmhpZGUgPSAoKSA9PntcclxuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFwcGVuZCA9IChodG1sQ29kZSkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MICs9IGh0bWxDb2RlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnRleHQgPSAodGV4dCkgPT4geyAvL0lFOCtcclxuICAgICAgICBpZih0ZXh0KXtcclxuICAgICAgICAgICAgJGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0Lmhhc0NsYXNzID0gKG5hbWUpID0+IHsgLy9JRTgrXHJcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIG5hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KCRlbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pcyA9ICgkdGFyZ2V0RWxlbWVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudCA9PT0gJHRhcmdldEVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQub2Zmc2V0ID0gKCkgPT57ICAgIC8vSUU4K1xyXG4gICAgICAgIHZhciByZWN0ID0gJGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcclxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LndpZHRoID0gKCkgPT4geyAgICAvL0lFOCtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGVpZ2h0ID0gKCkgPT4geyAgIC8vSUU4K1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXR0ciA9IChhdHRyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZXBsYWNlID0gKGh0bWwpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5yZXBsYWNlV2l0aChodG1sKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hcHBlbmQgPSAoaHRtbCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LmFwcGVuZENoaWxkKGh0bWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmVDaGlsZCA9ICgpID0+IHtcclxuICAgICAgICB3aGlsZSAoJGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNoaWxkKCRlbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNsb3Nlc3QgPSAoc2VsZWN0b3JTdHJpbmcpID0+IHtcclxuICAgICAgICBsZXQgY2xvc2VzdEVsZW1lbnQgPSAkZWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yU3RyaW5nKTtcclxuICAgICAgICBpZihjbG9zZXN0RWxlbWVudCl7XHJcbiAgICAgICAgICAgIHJldHVybiBMYSQoY2xvc2VzdEVsZW1lbnQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGEkO1xyXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAyNC4uXG4gKi9cblxuY29uc3QgbG9nZ2VyID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IHByZXZDb25zb2xlTG9nID0gbnVsbDtcblxuICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IHtsb2cgOiB3aW5kb3dbJ2NvbnNvbGUnXVsnbG9nJ119O1xuXG4gICAgdGhhdC5lbmFibGUgPSAoKSA9PntcbiAgICAgICAgaWYocHJldkNvbnNvbGVMb2cgPT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGVbJ2xvZyddID0gcHJldkNvbnNvbGVMb2c7XG4gICAgfTtcbiAgICB0aGF0LmRpc2FibGUgPSAoKSA9PntcbiAgICAgICAgcHJldkNvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGVbJ2xvZyddID0gZnVuY3Rpb24oKXt9O1xuICAgIH07XG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IG51bGw7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBsb2dnZXI7IiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbi8qKlxuICogZXh0cmFjdEV4dGVuc2lvblxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9IHBhdGggZm9yIHVybFxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxuICovXG5leHBvcnQgY29uc3QgZXh0cmFjdEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICBpZighcGF0aCB8fCBwYXRoLnN1YnN0cigwLDQpPT0ncnRtcCcpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKSB7XG4gICAgICAgIGxldCBleHRlbnNpb24gPSBcIlwiO1xuICAgICAgICBpZiAoKC9bKCxdZm9ybWF0PW1wZC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ21wZCc7XG4gICAgICAgIH1lbHNlIGlmICgoL1soLF1mb3JtYXQ9bTN1OC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ20zdTgnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbnNpb247XG4gICAgfVxuXG4gICAgbGV0IGF6dXJlZEZvcm1hdCA9IGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKTtcbiAgICBpZihhenVyZWRGb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGF6dXJlZEZvcm1hdDtcbiAgICB9XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xuICAgIGlmKHBhdGgubGFzdEluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxLCBwYXRoLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufTtcblxuXG4vKipcbiAqIG5hdHVyYWxIbXNcbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyIHwgc3RyaW5nfSAgc2Vjb25kICBUaGUgc2Vjb25kXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgZm9ybWF0dGVkIFN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbEhtcyhzZWNvbmQpIHtcbiAgICBsZXQgc2VjTnVtID0gcGFyc2VJbnQoc2Vjb25kLCAxMCk7XG4gICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xuICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjTnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuICAgIGxldCBzZWNvbmRzID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcblxuICAgIGlmIChob3VycyA+IDApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cblxuICAgIGlmIChob3VycyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH1cbn0iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjkuMVxyXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcclxuLy8gICAgIChjKSAyMDA5LTIwMTggSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcclxuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiFmdW5jdGlvbigpe3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmJiZzZWxmfHxcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsJiZnbG9iYWx8fHRoaXN8fHt9LHI9bi5fLGU9QXJyYXkucHJvdG90eXBlLG89T2JqZWN0LnByb3RvdHlwZSxzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2w/U3ltYm9sLnByb3RvdHlwZTpudWxsLHU9ZS5wdXNoLGM9ZS5zbGljZSxwPW8udG9TdHJpbmcsaT1vLmhhc093blByb3BlcnR5LHQ9QXJyYXkuaXNBcnJheSxhPU9iamVjdC5rZXlzLGw9T2JqZWN0LmNyZWF0ZSxmPWZ1bmN0aW9uKCl7fSxoPWZ1bmN0aW9uKG4pe3JldHVybiBuIGluc3RhbmNlb2YgaD9uOnRoaXMgaW5zdGFuY2VvZiBoP3ZvaWQodGhpcy5fd3JhcHBlZD1uKTpuZXcgaChuKX07XCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHN8fGV4cG9ydHMubm9kZVR5cGU/bi5fPWg6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGUmJm1vZHVsZS5leHBvcnRzJiYoZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1oKSxleHBvcnRzLl89aCksaC5WRVJTSU9OPVwiMS45LjFcIjt2YXIgdix5PWZ1bmN0aW9uKHUsaSxuKXtpZih2b2lkIDA9PT1pKXJldHVybiB1O3N3aXRjaChudWxsPT1uPzM6bil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdS5jYWxsKGksbil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLHQpe3JldHVybiB1LmNhbGwoaSxuLHIsdCl9O2Nhc2UgNDpyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHUuY2FsbChpLG4scix0LGUpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdS5hcHBseShpLGFyZ3VtZW50cyl9fSxkPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5pdGVyYXRlZSE9PXY/aC5pdGVyYXRlZShuLHIpOm51bGw9PW4/aC5pZGVudGl0eTpoLmlzRnVuY3Rpb24obik/eShuLHIsdCk6aC5pc09iamVjdChuKSYmIWguaXNBcnJheShuKT9oLm1hdGNoZXIobik6aC5wcm9wZXJ0eShuKX07aC5pdGVyYXRlZT12PWZ1bmN0aW9uKG4scil7cmV0dXJuIGQobixyLDEvMCl9O3ZhciBnPWZ1bmN0aW9uKHUsaSl7cmV0dXJuIGk9bnVsbD09aT91Lmxlbmd0aC0xOitpLGZ1bmN0aW9uKCl7Zm9yKHZhciBuPU1hdGgubWF4KGFyZ3VtZW50cy5sZW5ndGgtaSwwKSxyPUFycmF5KG4pLHQ9MDt0PG47dCsrKXJbdF09YXJndW1lbnRzW3QraV07c3dpdGNoKGkpe2Nhc2UgMDpyZXR1cm4gdS5jYWxsKHRoaXMscik7Y2FzZSAxOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0scik7Y2FzZSAyOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdLHIpfXZhciBlPUFycmF5KGkrMSk7Zm9yKHQ9MDt0PGk7dCsrKWVbdF09YXJndW1lbnRzW3RdO3JldHVybiBlW2ldPXIsdS5hcHBseSh0aGlzLGUpfX0sbT1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm57fTtpZihsKXJldHVybiBsKG4pO2YucHJvdG90eXBlPW47dmFyIHI9bmV3IGY7cmV0dXJuIGYucHJvdG90eXBlPW51bGwscn0sYj1mdW5jdGlvbihyKXtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/dm9pZCAwOm5bcl19fSxqPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGwhPW4mJmkuY2FsbChuLHIpfSx4PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXtpZihudWxsPT1uKXJldHVybjtuPW5bcltlXV19cmV0dXJuIHQ/bjp2b2lkIDB9LF89TWF0aC5wb3coMiw1MyktMSxBPWIoXCJsZW5ndGhcIiksdz1mdW5jdGlvbihuKXt2YXIgcj1BKG4pO3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiByJiYwPD1yJiZyPD1ffTtoLmVhY2g9aC5mb3JFYWNoPWZ1bmN0aW9uKG4scix0KXt2YXIgZSx1O2lmKHI9eShyLHQpLHcobikpZm9yKGU9MCx1PW4ubGVuZ3RoO2U8dTtlKyspcihuW2VdLGUsbik7ZWxzZXt2YXIgaT1oLmtleXMobik7Zm9yKGU9MCx1PWkubGVuZ3RoO2U8dTtlKyspcihuW2lbZV1dLGlbZV0sbil9cmV0dXJuIG59LGgubWFwPWguY29sbGVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9QXJyYXkodSksbz0wO288dTtvKyspe3ZhciBhPWU/ZVtvXTpvO2lbb109cihuW2FdLGEsbil9cmV0dXJuIGl9O3ZhciBPPWZ1bmN0aW9uKGMpe3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0zPD1hcmd1bWVudHMubGVuZ3RoO3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0hdyhuKSYmaC5rZXlzKG4pLGk9KHV8fG4pLmxlbmd0aCxvPTA8Yz8wOmktMTtmb3IoZXx8KHQ9blt1P3Vbb106b10sbys9Yyk7MDw9byYmbzxpO28rPWMpe3ZhciBhPXU/dVtvXTpvO3Q9cih0LG5bYV0sYSxuKX1yZXR1cm4gdH0obix5KHIsZSw0KSx0LHUpfX07aC5yZWR1Y2U9aC5mb2xkbD1oLmluamVjdD1PKDEpLGgucmVkdWNlUmlnaHQ9aC5mb2xkcj1PKC0xKSxoLmZpbmQ9aC5kZXRlY3Q9ZnVuY3Rpb24obixyLHQpe3ZhciBlPSh3KG4pP2guZmluZEluZGV4OmguZmluZEtleSkobixyLHQpO2lmKHZvaWQgMCE9PWUmJi0xIT09ZSlyZXR1cm4gbltlXX0saC5maWx0ZXI9aC5zZWxlY3Q9ZnVuY3Rpb24obixlLHIpe3ZhciB1PVtdO3JldHVybiBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7ZShuLHIsdCkmJnUucHVzaChuKX0pLHV9LGgucmVqZWN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5maWx0ZXIobixoLm5lZ2F0ZShkKHIpKSx0KX0saC5ldmVyeT1oLmFsbD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZighcihuW29dLG8sbikpcmV0dXJuITF9cmV0dXJuITB9LGguc29tZT1oLmFueT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZihyKG5bb10sbyxuKSlyZXR1cm4hMH1yZXR1cm4hMX0saC5jb250YWlucz1oLmluY2x1ZGVzPWguaW5jbHVkZT1mdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLChcIm51bWJlclwiIT10eXBlb2YgdHx8ZSkmJih0PTApLDA8PWguaW5kZXhPZihuLHIsdCl9LGguaW52b2tlPWcoZnVuY3Rpb24obix0LGUpe3ZhciB1LGk7cmV0dXJuIGguaXNGdW5jdGlvbih0KT9pPXQ6aC5pc0FycmF5KHQpJiYodT10LnNsaWNlKDAsLTEpLHQ9dFt0Lmxlbmd0aC0xXSksaC5tYXAobixmdW5jdGlvbihuKXt2YXIgcj1pO2lmKCFyKXtpZih1JiZ1Lmxlbmd0aCYmKG49eChuLHUpKSxudWxsPT1uKXJldHVybjtyPW5bdF19cmV0dXJuIG51bGw9PXI/cjpyLmFwcGx5KG4sZSl9KX0pLGgucGx1Y2s9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5tYXAobixoLnByb3BlcnR5KHIpKX0saC53aGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbHRlcihuLGgubWF0Y2hlcihyKSl9LGguZmluZFdoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmluZChuLGgubWF0Y2hlcihyKSl9LGgubWF4PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9LTEvMCxvPS0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmaTx0JiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXt1PWUobixyLHQpLChvPHV8fHU9PT0tMS8wJiZpPT09LTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLm1pbj1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPTEvMCxvPTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZ0PGkmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpeygodT1lKG4scix0KSk8b3x8dT09PTEvMCYmaT09PTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLnNodWZmbGU9ZnVuY3Rpb24obil7cmV0dXJuIGguc2FtcGxlKG4sMS8wKX0saC5zYW1wbGU9ZnVuY3Rpb24obixyLHQpe2lmKG51bGw9PXJ8fHQpcmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSxuW2gucmFuZG9tKG4ubGVuZ3RoLTEpXTt2YXIgZT13KG4pP2guY2xvbmUobik6aC52YWx1ZXMobiksdT1BKGUpO3I9TWF0aC5tYXgoTWF0aC5taW4ocix1KSwwKTtmb3IodmFyIGk9dS0xLG89MDtvPHI7bysrKXt2YXIgYT1oLnJhbmRvbShvLGkpLGM9ZVtvXTtlW29dPWVbYV0sZVthXT1jfXJldHVybiBlLnNsaWNlKDAscil9LGguc29ydEJ5PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT0wO3JldHVybiBlPWQoZSxyKSxoLnBsdWNrKGgubWFwKG4sZnVuY3Rpb24obixyLHQpe3JldHVybnt2YWx1ZTpuLGluZGV4OnUrKyxjcml0ZXJpYTplKG4scix0KX19KS5zb3J0KGZ1bmN0aW9uKG4scil7dmFyIHQ9bi5jcml0ZXJpYSxlPXIuY3JpdGVyaWE7aWYodCE9PWUpe2lmKGU8dHx8dm9pZCAwPT09dClyZXR1cm4gMTtpZih0PGV8fHZvaWQgMD09PWUpcmV0dXJuLTF9cmV0dXJuIG4uaW5kZXgtci5pbmRleH0pLFwidmFsdWVcIil9O3ZhciBrPWZ1bmN0aW9uKG8scil7cmV0dXJuIGZ1bmN0aW9uKGUsdSxuKXt2YXIgaT1yP1tbXSxbXV06e307cmV0dXJuIHU9ZCh1LG4pLGguZWFjaChlLGZ1bmN0aW9uKG4scil7dmFyIHQ9dShuLHIsZSk7byhpLG4sdCl9KSxpfX07aC5ncm91cEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdLnB1c2gocik6blt0XT1bcl19KSxoLmluZGV4Qnk9ayhmdW5jdGlvbihuLHIsdCl7blt0XT1yfSksaC5jb3VudEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdKys6blt0XT0xfSk7dmFyIFM9L1teXFx1ZDgwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkYmZmXVtcXHVkYzAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRmZmZdL2c7aC50b0FycmF5PWZ1bmN0aW9uKG4pe3JldHVybiBuP2guaXNBcnJheShuKT9jLmNhbGwobik6aC5pc1N0cmluZyhuKT9uLm1hdGNoKFMpOncobik/aC5tYXAobixoLmlkZW50aXR5KTpoLnZhbHVlcyhuKTpbXX0saC5zaXplPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPzA6dyhuKT9uLmxlbmd0aDpoLmtleXMobikubGVuZ3RofSxoLnBhcnRpdGlvbj1rKGZ1bmN0aW9uKG4scix0KXtuW3Q/MDoxXS5wdXNoKHIpfSwhMCksaC5maXJzdD1oLmhlYWQ9aC50YWtlPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bMF06aC5pbml0aWFsKG4sbi5sZW5ndGgtcil9LGguaW5pdGlhbD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLDAsTWF0aC5tYXgoMCxuLmxlbmd0aC0obnVsbD09cnx8dD8xOnIpKSl9LGgubGFzdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uW24ubGVuZ3RoLTFdOmgucmVzdChuLE1hdGgubWF4KDAsbi5sZW5ndGgtcikpfSxoLnJlc3Q9aC50YWlsPWguZHJvcD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLG51bGw9PXJ8fHQ/MTpyKX0saC5jb21wYWN0PWZ1bmN0aW9uKG4pe3JldHVybiBoLmZpbHRlcihuLEJvb2xlYW4pfTt2YXIgTT1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KGU9ZXx8W10pLmxlbmd0aCxpPTAsbz1BKG4pO2k8bztpKyspe3ZhciBhPW5baV07aWYodyhhKSYmKGguaXNBcnJheShhKXx8aC5pc0FyZ3VtZW50cyhhKSkpaWYocilmb3IodmFyIGM9MCxsPWEubGVuZ3RoO2M8bDspZVt1KytdPWFbYysrXTtlbHNlIE0oYSxyLHQsZSksdT1lLmxlbmd0aDtlbHNlIHR8fChlW3UrK109YSl9cmV0dXJuIGV9O2guZmxhdHRlbj1mdW5jdGlvbihuLHIpe3JldHVybiBNKG4sciwhMSl9LGgud2l0aG91dD1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIGguZGlmZmVyZW5jZShuLHIpfSksaC51bmlxPWgudW5pcXVlPWZ1bmN0aW9uKG4scix0LGUpe2guaXNCb29sZWFuKHIpfHwoZT10LHQ9cixyPSExKSxudWxsIT10JiYodD1kKHQsZSkpO2Zvcih2YXIgdT1bXSxpPVtdLG89MCxhPUEobik7bzxhO28rKyl7dmFyIGM9bltvXSxsPXQ/dChjLG8sbik6YztyJiYhdD8obyYmaT09PWx8fHUucHVzaChjKSxpPWwpOnQ/aC5jb250YWlucyhpLGwpfHwoaS5wdXNoKGwpLHUucHVzaChjKSk6aC5jb250YWlucyh1LGMpfHx1LnB1c2goYyl9cmV0dXJuIHV9LGgudW5pb249ZyhmdW5jdGlvbihuKXtyZXR1cm4gaC51bmlxKE0obiwhMCwhMCkpfSksaC5pbnRlcnNlY3Rpb249ZnVuY3Rpb24obil7Zm9yKHZhciByPVtdLHQ9YXJndW1lbnRzLmxlbmd0aCxlPTAsdT1BKG4pO2U8dTtlKyspe3ZhciBpPW5bZV07aWYoIWguY29udGFpbnMocixpKSl7dmFyIG87Zm9yKG89MTtvPHQmJmguY29udGFpbnMoYXJndW1lbnRzW29dLGkpO28rKyk7bz09PXQmJnIucHVzaChpKX19cmV0dXJuIHJ9LGguZGlmZmVyZW5jZT1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIHI9TShyLCEwLCEwKSxoLmZpbHRlcihuLGZ1bmN0aW9uKG4pe3JldHVybiFoLmNvbnRhaW5zKHIsbil9KX0pLGgudW56aXA9ZnVuY3Rpb24obil7Zm9yKHZhciByPW4mJmgubWF4KG4sQSkubGVuZ3RofHwwLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1oLnBsdWNrKG4sZSk7cmV0dXJuIHR9LGguemlwPWcoaC51bnppcCksaC5vYmplY3Q9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9e30sZT0wLHU9QShuKTtlPHU7ZSsrKXI/dFtuW2VdXT1yW2VdOnRbbltlXVswXV09bltlXVsxXTtyZXR1cm4gdH07dmFyIEY9ZnVuY3Rpb24oaSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9QShuKSx1PTA8aT8wOmUtMTswPD11JiZ1PGU7dSs9aSlpZihyKG5bdV0sdSxuKSlyZXR1cm4gdTtyZXR1cm4tMX19O2guZmluZEluZGV4PUYoMSksaC5maW5kTGFzdEluZGV4PUYoLTEpLGguc29ydGVkSW5kZXg9ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PSh0PWQodCxlLDEpKShyKSxpPTAsbz1BKG4pO2k8bzspe3ZhciBhPU1hdGguZmxvb3IoKGkrbykvMik7dChuW2FdKTx1P2k9YSsxOm89YX1yZXR1cm4gaX07dmFyIEU9ZnVuY3Rpb24oaSxvLGEpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7dmFyIGU9MCx1PUEobik7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpMDxpP2U9MDw9dD90Ok1hdGgubWF4KHQrdSxlKTp1PTA8PXQ/TWF0aC5taW4odCsxLHUpOnQrdSsxO2Vsc2UgaWYoYSYmdCYmdSlyZXR1cm4gblt0PWEobixyKV09PT1yP3Q6LTE7aWYociE9cilyZXR1cm4gMDw9KHQ9byhjLmNhbGwobixlLHUpLGguaXNOYU4pKT90K2U6LTE7Zm9yKHQ9MDxpP2U6dS0xOzA8PXQmJnQ8dTt0Kz1pKWlmKG5bdF09PT1yKXJldHVybiB0O3JldHVybi0xfX07aC5pbmRleE9mPUUoMSxoLmZpbmRJbmRleCxoLnNvcnRlZEluZGV4KSxoLmxhc3RJbmRleE9mPUUoLTEsaC5maW5kTGFzdEluZGV4KSxoLnJhbmdlPWZ1bmN0aW9uKG4scix0KXtudWxsPT1yJiYocj1ufHwwLG49MCksdHx8KHQ9cjxuPy0xOjEpO2Zvcih2YXIgZT1NYXRoLm1heChNYXRoLmNlaWwoKHItbikvdCksMCksdT1BcnJheShlKSxpPTA7aTxlO2krKyxuKz10KXVbaV09bjtyZXR1cm4gdX0saC5jaHVuaz1mdW5jdGlvbihuLHIpe2lmKG51bGw9PXJ8fHI8MSlyZXR1cm5bXTtmb3IodmFyIHQ9W10sZT0wLHU9bi5sZW5ndGg7ZTx1Oyl0LnB1c2goYy5jYWxsKG4sZSxlKz1yKSk7cmV0dXJuIHR9O3ZhciBOPWZ1bmN0aW9uKG4scix0LGUsdSl7aWYoIShlIGluc3RhbmNlb2YgcikpcmV0dXJuIG4uYXBwbHkodCx1KTt2YXIgaT1tKG4ucHJvdG90eXBlKSxvPW4uYXBwbHkoaSx1KTtyZXR1cm4gaC5pc09iamVjdChvKT9vOml9O2guYmluZD1nKGZ1bmN0aW9uKHIsdCxlKXtpZighaC5pc0Z1bmN0aW9uKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb25cIik7dmFyIHU9ZyhmdW5jdGlvbihuKXtyZXR1cm4gTihyLHUsdCx0aGlzLGUuY29uY2F0KG4pKX0pO3JldHVybiB1fSksaC5wYXJ0aWFsPWcoZnVuY3Rpb24odSxpKXt2YXIgbz1oLnBhcnRpYWwucGxhY2Vob2xkZXIsYT1mdW5jdGlvbigpe2Zvcih2YXIgbj0wLHI9aS5sZW5ndGgsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWlbZV09PT1vP2FyZ3VtZW50c1tuKytdOmlbZV07Zm9yKDtuPGFyZ3VtZW50cy5sZW5ndGg7KXQucHVzaChhcmd1bWVudHNbbisrXSk7cmV0dXJuIE4odSxhLHRoaXMsdGhpcyx0KX07cmV0dXJuIGF9KSwoaC5wYXJ0aWFsLnBsYWNlaG9sZGVyPWgpLmJpbmRBbGw9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PShyPU0ociwhMSwhMSkpLmxlbmd0aDtpZih0PDEpdGhyb3cgbmV3IEVycm9yKFwiYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lc1wiKTtmb3IoO3QtLTspe3ZhciBlPXJbdF07bltlXT1oLmJpbmQobltlXSxuKX19KSxoLm1lbW9pemU9ZnVuY3Rpb24oZSx1KXt2YXIgaT1mdW5jdGlvbihuKXt2YXIgcj1pLmNhY2hlLHQ9XCJcIisodT91LmFwcGx5KHRoaXMsYXJndW1lbnRzKTpuKTtyZXR1cm4gaihyLHQpfHwoclt0XT1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksclt0XX07cmV0dXJuIGkuY2FjaGU9e30saX0saC5kZWxheT1nKGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBuLmFwcGx5KG51bGwsdCl9LHIpfSksaC5kZWZlcj1oLnBhcnRpYWwoaC5kZWxheSxoLDEpLGgudGhyb3R0bGU9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYSxjLGw9MDt1fHwodT17fSk7dmFyIGY9ZnVuY3Rpb24oKXtsPSExPT09dS5sZWFkaW5nPzA6aC5ub3coKSxpPW51bGwsYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKX0sbj1mdW5jdGlvbigpe3ZhciBuPWgubm93KCk7bHx8ITEhPT11LmxlYWRpbmd8fChsPW4pO3ZhciByPWUtKG4tbCk7cmV0dXJuIG89dGhpcyxhPWFyZ3VtZW50cyxyPD0wfHxlPHI/KGkmJihjbGVhclRpbWVvdXQoaSksaT1udWxsKSxsPW4sYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKSk6aXx8ITE9PT11LnRyYWlsaW5nfHwoaT1zZXRUaW1lb3V0KGYscikpLGN9O3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxsPTAsaT1vPWE9bnVsbH0sbn0saC5kZWJvdW5jZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhPWZ1bmN0aW9uKG4scil7aT1udWxsLHImJihvPXQuYXBwbHkobixyKSl9LG49ZyhmdW5jdGlvbihuKXtpZihpJiZjbGVhclRpbWVvdXQoaSksdSl7dmFyIHI9IWk7aT1zZXRUaW1lb3V0KGEsZSksciYmKG89dC5hcHBseSh0aGlzLG4pKX1lbHNlIGk9aC5kZWxheShhLGUsdGhpcyxuKTtyZXR1cm4gb30pO3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxpPW51bGx9LG59LGgud3JhcD1mdW5jdGlvbihuLHIpe3JldHVybiBoLnBhcnRpYWwocixuKX0saC5uZWdhdGU9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5jb21wb3NlPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLGU9dC5sZW5ndGgtMTtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIG49ZSxyPXRbZV0uYXBwbHkodGhpcyxhcmd1bWVudHMpO24tLTspcj10W25dLmNhbGwodGhpcyxyKTtyZXR1cm4gcn19LGguYWZ0ZXI9ZnVuY3Rpb24obixyKXtyZXR1cm4gZnVuY3Rpb24oKXtpZigtLW48MSlyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmJlZm9yZT1mdW5jdGlvbihuLHIpe3ZhciB0O3JldHVybiBmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHQ9ci5hcHBseSh0aGlzLGFyZ3VtZW50cykpLG48PTEmJihyPW51bGwpLHR9fSxoLm9uY2U9aC5wYXJ0aWFsKGguYmVmb3JlLDIpLGgucmVzdEFyZ3VtZW50cz1nO3ZhciBJPSF7dG9TdHJpbmc6bnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoXCJ0b1N0cmluZ1wiKSxUPVtcInZhbHVlT2ZcIixcImlzUHJvdG90eXBlT2ZcIixcInRvU3RyaW5nXCIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFwiaGFzT3duUHJvcGVydHlcIixcInRvTG9jYWxlU3RyaW5nXCJdLEI9ZnVuY3Rpb24obixyKXt2YXIgdD1ULmxlbmd0aCxlPW4uY29uc3RydWN0b3IsdT1oLmlzRnVuY3Rpb24oZSkmJmUucHJvdG90eXBlfHxvLGk9XCJjb25zdHJ1Y3RvclwiO2ZvcihqKG4saSkmJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKTt0LS07KShpPVRbdF0paW4gbiYmbltpXSE9PXVbaV0mJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKX07aC5rZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO2lmKGEpcmV0dXJuIGEobik7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paihuLHQpJiZyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLmFsbEtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107dmFyIHI9W107Zm9yKHZhciB0IGluIG4pci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC52YWx1ZXM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1uW3JbdV1dO3JldHVybiBlfSxoLm1hcE9iamVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPWgua2V5cyhuKSx1PWUubGVuZ3RoLGk9e30sbz0wO288dTtvKyspe3ZhciBhPWVbb107aVthXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX0saC5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPVtyW3VdLG5bclt1XV1dO3JldHVybiBlfSxoLmludmVydD1mdW5jdGlvbihuKXtmb3IodmFyIHI9e30sdD1oLmtleXMobiksZT0wLHU9dC5sZW5ndGg7ZTx1O2UrKylyW25bdFtlXV1dPXRbZV07cmV0dXJuIHJ9LGguZnVuY3Rpb25zPWgubWV0aG9kcz1mdW5jdGlvbihuKXt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbiloLmlzRnVuY3Rpb24oblt0XSkmJnIucHVzaCh0KTtyZXR1cm4gci5zb3J0KCl9O3ZhciBSPWZ1bmN0aW9uKGMsbCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg7aWYobCYmKG49T2JqZWN0KG4pKSxyPDJ8fG51bGw9PW4pcmV0dXJuIG47Zm9yKHZhciB0PTE7dDxyO3QrKylmb3IodmFyIGU9YXJndW1lbnRzW3RdLHU9YyhlKSxpPXUubGVuZ3RoLG89MDtvPGk7bysrKXt2YXIgYT11W29dO2wmJnZvaWQgMCE9PW5bYV18fChuW2FdPWVbYV0pfXJldHVybiBufX07aC5leHRlbmQ9UihoLmFsbEtleXMpLGguZXh0ZW5kT3duPWguYXNzaWduPVIoaC5rZXlzKSxoLmZpbmRLZXk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZSx1PWgua2V5cyhuKSxpPTAsbz11Lmxlbmd0aDtpPG87aSsrKWlmKHIobltlPXVbaV1dLGUsbikpcmV0dXJuIGV9O3ZhciBxLEssej1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIHIgaW4gdH07aC5waWNrPWcoZnVuY3Rpb24obixyKXt2YXIgdD17fSxlPXJbMF07aWYobnVsbD09bilyZXR1cm4gdDtoLmlzRnVuY3Rpb24oZSk/KDE8ci5sZW5ndGgmJihlPXkoZSxyWzFdKSkscj1oLmFsbEtleXMobikpOihlPXoscj1NKHIsITEsITEpLG49T2JqZWN0KG4pKTtmb3IodmFyIHU9MCxpPXIubGVuZ3RoO3U8aTt1Kyspe3ZhciBvPXJbdV0sYT1uW29dO2UoYSxvLG4pJiYodFtvXT1hKX1yZXR1cm4gdH0pLGgub21pdD1nKGZ1bmN0aW9uKG4sdCl7dmFyIHIsZT10WzBdO3JldHVybiBoLmlzRnVuY3Rpb24oZSk/KGU9aC5uZWdhdGUoZSksMTx0Lmxlbmd0aCYmKHI9dFsxXSkpOih0PWgubWFwKE0odCwhMSwhMSksU3RyaW5nKSxlPWZ1bmN0aW9uKG4scil7cmV0dXJuIWguY29udGFpbnModCxyKX0pLGgucGljayhuLGUscil9KSxoLmRlZmF1bHRzPVIoaC5hbGxLZXlzLCEwKSxoLmNyZWF0ZT1mdW5jdGlvbihuLHIpe3ZhciB0PW0obik7cmV0dXJuIHImJmguZXh0ZW5kT3duKHQsciksdH0saC5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc09iamVjdChuKT9oLmlzQXJyYXkobik/bi5zbGljZSgpOmguZXh0ZW5kKHt9LG4pOm59LGgudGFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIHIobiksbn0saC5pc01hdGNoPWZ1bmN0aW9uKG4scil7dmFyIHQ9aC5rZXlzKHIpLGU9dC5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3IodmFyIHU9T2JqZWN0KG4pLGk9MDtpPGU7aSsrKXt2YXIgbz10W2ldO2lmKHJbb10hPT11W29dfHwhKG8gaW4gdSkpcmV0dXJuITF9cmV0dXJuITB9LHE9ZnVuY3Rpb24obixyLHQsZSl7aWYobj09PXIpcmV0dXJuIDAhPT1ufHwxL249PTEvcjtpZihudWxsPT1ufHxudWxsPT1yKXJldHVybiExO2lmKG4hPW4pcmV0dXJuIHIhPXI7dmFyIHU9dHlwZW9mIG47cmV0dXJuKFwiZnVuY3Rpb25cIj09PXV8fFwib2JqZWN0XCI9PT11fHxcIm9iamVjdFwiPT10eXBlb2YgcikmJksobixyLHQsZSl9LEs9ZnVuY3Rpb24obixyLHQsZSl7biBpbnN0YW5jZW9mIGgmJihuPW4uX3dyYXBwZWQpLHIgaW5zdGFuY2VvZiBoJiYocj1yLl93cmFwcGVkKTt2YXIgdT1wLmNhbGwobik7aWYodSE9PXAuY2FsbChyKSlyZXR1cm4hMTtzd2l0Y2godSl7Y2FzZVwiW29iamVjdCBSZWdFeHBdXCI6Y2FzZVwiW29iamVjdCBTdHJpbmddXCI6cmV0dXJuXCJcIituPT1cIlwiK3I7Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cmV0dXJuK24hPStuPytyIT0rcjowPT0rbj8xLytuPT0xL3I6K249PStyO2Nhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6cmV0dXJuK249PStyO2Nhc2VcIltvYmplY3QgU3ltYm9sXVwiOnJldHVybiBzLnZhbHVlT2YuY2FsbChuKT09PXMudmFsdWVPZi5jYWxsKHIpfXZhciBpPVwiW29iamVjdCBBcnJheV1cIj09PXU7aWYoIWkpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBufHxcIm9iamVjdFwiIT10eXBlb2YgcilyZXR1cm4hMTt2YXIgbz1uLmNvbnN0cnVjdG9yLGE9ci5jb25zdHJ1Y3RvcjtpZihvIT09YSYmIShoLmlzRnVuY3Rpb24obykmJm8gaW5zdGFuY2VvZiBvJiZoLmlzRnVuY3Rpb24oYSkmJmEgaW5zdGFuY2VvZiBhKSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gcilyZXR1cm4hMX1lPWV8fFtdO2Zvcih2YXIgYz0odD10fHxbXSkubGVuZ3RoO2MtLTspaWYodFtjXT09PW4pcmV0dXJuIGVbY109PT1yO2lmKHQucHVzaChuKSxlLnB1c2gociksaSl7aWYoKGM9bi5sZW5ndGgpIT09ci5sZW5ndGgpcmV0dXJuITE7Zm9yKDtjLS07KWlmKCFxKG5bY10scltjXSx0LGUpKXJldHVybiExfWVsc2V7dmFyIGwsZj1oLmtleXMobik7aWYoYz1mLmxlbmd0aCxoLmtleXMocikubGVuZ3RoIT09YylyZXR1cm4hMTtmb3IoO2MtLTspaWYobD1mW2NdLCFqKHIsbCl8fCFxKG5bbF0scltsXSx0LGUpKXJldHVybiExfXJldHVybiB0LnBvcCgpLGUucG9wKCksITB9LGguaXNFcXVhbD1mdW5jdGlvbihuLHIpe3JldHVybiBxKG4scil9LGguaXNFbXB0eT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bnx8KHcobikmJihoLmlzQXJyYXkobil8fGguaXNTdHJpbmcobil8fGguaXNBcmd1bWVudHMobikpPzA9PT1uLmxlbmd0aDowPT09aC5rZXlzKG4pLmxlbmd0aCl9LGguaXNFbGVtZW50PWZ1bmN0aW9uKG4pe3JldHVybiEoIW58fDEhPT1uLm5vZGVUeXBlKX0saC5pc0FycmF5PXR8fGZ1bmN0aW9uKG4pe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXAuY2FsbChuKX0saC5pc09iamVjdD1mdW5jdGlvbihuKXt2YXIgcj10eXBlb2YgbjtyZXR1cm5cImZ1bmN0aW9uXCI9PT1yfHxcIm9iamVjdFwiPT09ciYmISFufSxoLmVhY2goW1wiQXJndW1lbnRzXCIsXCJGdW5jdGlvblwiLFwiU3RyaW5nXCIsXCJOdW1iZXJcIixcIkRhdGVcIixcIlJlZ0V4cFwiLFwiRXJyb3JcIixcIlN5bWJvbFwiLFwiTWFwXCIsXCJXZWFrTWFwXCIsXCJTZXRcIixcIldlYWtTZXRcIl0sZnVuY3Rpb24ocil7aFtcImlzXCIrcl09ZnVuY3Rpb24obil7cmV0dXJuIHAuY2FsbChuKT09PVwiW29iamVjdCBcIityK1wiXVwifX0pLGguaXNBcmd1bWVudHMoYXJndW1lbnRzKXx8KGguaXNBcmd1bWVudHM9ZnVuY3Rpb24obil7cmV0dXJuIGoobixcImNhbGxlZVwiKX0pO3ZhciBEPW4uZG9jdW1lbnQmJm4uZG9jdW1lbnQuY2hpbGROb2RlcztcImZ1bmN0aW9uXCIhPXR5cGVvZi8uLyYmXCJvYmplY3RcIiE9dHlwZW9mIEludDhBcnJheSYmXCJmdW5jdGlvblwiIT10eXBlb2YgRCYmKGguaXNGdW5jdGlvbj1mdW5jdGlvbihuKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBufHwhMX0pLGguaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIWguaXNTeW1ib2wobikmJmlzRmluaXRlKG4pJiYhaXNOYU4ocGFyc2VGbG9hdChuKSl9LGguaXNOYU49ZnVuY3Rpb24obil7cmV0dXJuIGguaXNOdW1iZXIobikmJmlzTmFOKG4pfSxoLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4hMD09PW58fCExPT09bnx8XCJbb2JqZWN0IEJvb2xlYW5dXCI9PT1wLmNhbGwobil9LGguaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0saC5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gdm9pZCAwPT09bn0saC5oYXM9ZnVuY3Rpb24obixyKXtpZighaC5pc0FycmF5KHIpKXJldHVybiBqKG4scik7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXt2YXIgdT1yW2VdO2lmKG51bGw9PW58fCFpLmNhbGwobix1KSlyZXR1cm4hMTtuPW5bdV19cmV0dXJuISF0fSxoLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbi5fPXIsdGhpc30saC5pZGVudGl0eT1mdW5jdGlvbihuKXtyZXR1cm4gbn0saC5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LGgubm9vcD1mdW5jdGlvbigpe30saC5wcm9wZXJ0eT1mdW5jdGlvbihyKXtyZXR1cm4gaC5pc0FycmF5KHIpP2Z1bmN0aW9uKG4pe3JldHVybiB4KG4scil9OmIocil9LGgucHJvcGVydHlPZj1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbD09cj9mdW5jdGlvbigpe306ZnVuY3Rpb24obil7cmV0dXJuIGguaXNBcnJheShuKT94KHIsbik6cltuXX19LGgubWF0Y2hlcj1oLm1hdGNoZXM9ZnVuY3Rpb24ocil7cmV0dXJuIHI9aC5leHRlbmRPd24oe30sciksZnVuY3Rpb24obil7cmV0dXJuIGguaXNNYXRjaChuLHIpfX0saC50aW1lcz1mdW5jdGlvbihuLHIsdCl7dmFyIGU9QXJyYXkoTWF0aC5tYXgoMCxuKSk7cj15KHIsdCwxKTtmb3IodmFyIHU9MDt1PG47dSsrKWVbdV09cih1KTtyZXR1cm4gZX0saC5yYW5kb209ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbD09ciYmKHI9bixuPTApLG4rTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihyLW4rMSkpfSxoLm5vdz1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX07dmFyIEw9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImI3gyNztcIixcImBcIjpcIiYjeDYwO1wifSxQPWguaW52ZXJ0KEwpLFc9ZnVuY3Rpb24ocil7dmFyIHQ9ZnVuY3Rpb24obil7cmV0dXJuIHJbbl19LG49XCIoPzpcIitoLmtleXMocikuam9pbihcInxcIikrXCIpXCIsZT1SZWdFeHAobiksdT1SZWdFeHAobixcImdcIik7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBuPW51bGw9PW4/XCJcIjpcIlwiK24sZS50ZXN0KG4pP24ucmVwbGFjZSh1LHQpOm59fTtoLmVzY2FwZT1XKEwpLGgudW5lc2NhcGU9VyhQKSxoLnJlc3VsdD1mdW5jdGlvbihuLHIsdCl7aC5pc0FycmF5KHIpfHwocj1bcl0pO3ZhciBlPXIubGVuZ3RoO2lmKCFlKXJldHVybiBoLmlzRnVuY3Rpb24odCk/dC5jYWxsKG4pOnQ7Zm9yKHZhciB1PTA7dTxlO3UrKyl7dmFyIGk9bnVsbD09bj92b2lkIDA6bltyW3VdXTt2b2lkIDA9PT1pJiYoaT10LHU9ZSksbj1oLmlzRnVuY3Rpb24oaSk/aS5jYWxsKG4pOml9cmV0dXJuIG59O3ZhciBDPTA7aC51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgcj0rK0MrXCJcIjtyZXR1cm4gbj9uK3I6cn0saC50ZW1wbGF0ZVNldHRpbmdzPXtldmFsdWF0ZTovPCUoW1xcc1xcU10rPyklPi9nLGludGVycG9sYXRlOi88JT0oW1xcc1xcU10rPyklPi9nLGVzY2FwZTovPCUtKFtcXHNcXFNdKz8pJT4vZ307dmFyIEo9LyguKV4vLFU9e1wiJ1wiOlwiJ1wiLFwiXFxcXFwiOlwiXFxcXFwiLFwiXFxyXCI6XCJyXCIsXCJcXG5cIjpcIm5cIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSxWPS9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZywkPWZ1bmN0aW9uKG4pe3JldHVyblwiXFxcXFwiK1Vbbl19O2gudGVtcGxhdGU9ZnVuY3Rpb24oaSxuLHIpeyFuJiZyJiYobj1yKSxuPWguZGVmYXVsdHMoe30sbixoLnRlbXBsYXRlU2V0dGluZ3MpO3ZhciB0LGU9UmVnRXhwKFsobi5lc2NhcGV8fEopLnNvdXJjZSwobi5pbnRlcnBvbGF0ZXx8Sikuc291cmNlLChuLmV2YWx1YXRlfHxKKS5zb3VyY2VdLmpvaW4oXCJ8XCIpK1wifCRcIixcImdcIiksbz0wLGE9XCJfX3ArPSdcIjtpLnJlcGxhY2UoZSxmdW5jdGlvbihuLHIsdCxlLHUpe3JldHVybiBhKz1pLnNsaWNlKG8sdSkucmVwbGFjZShWLCQpLG89dStuLmxlbmd0aCxyP2ErPVwiJytcXG4oKF9fdD0oXCIrcitcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjp0P2ErPVwiJytcXG4oKF9fdD0oXCIrdCtcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiOmUmJihhKz1cIic7XFxuXCIrZStcIlxcbl9fcCs9J1wiKSxufSksYSs9XCInO1xcblwiLG4udmFyaWFibGV8fChhPVwid2l0aChvYmp8fHt9KXtcXG5cIithK1wifVxcblwiKSxhPVwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiK1wicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIithK1wicmV0dXJuIF9fcDtcXG5cIjt0cnl7dD1uZXcgRnVuY3Rpb24obi52YXJpYWJsZXx8XCJvYmpcIixcIl9cIixhKX1jYXRjaChuKXt0aHJvdyBuLnNvdXJjZT1hLG59dmFyIHU9ZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbCh0aGlzLG4saCl9LGM9bi52YXJpYWJsZXx8XCJvYmpcIjtyZXR1cm4gdS5zb3VyY2U9XCJmdW5jdGlvbihcIitjK1wiKXtcXG5cIithK1wifVwiLHV9LGguY2hhaW49ZnVuY3Rpb24obil7dmFyIHI9aChuKTtyZXR1cm4gci5fY2hhaW49ITAscn07dmFyIEc9ZnVuY3Rpb24obixyKXtyZXR1cm4gbi5fY2hhaW4/aChyKS5jaGFpbigpOnJ9O2gubWl4aW49ZnVuY3Rpb24odCl7cmV0dXJuIGguZWFjaChoLmZ1bmN0aW9ucyh0KSxmdW5jdGlvbihuKXt2YXIgcj1oW25dPXRbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1bdGhpcy5fd3JhcHBlZF07cmV0dXJuIHUuYXBwbHkobixhcmd1bWVudHMpLEcodGhpcyxyLmFwcGx5KGgsbikpfX0pLGh9LGgubWl4aW4oaCksaC5lYWNoKFtcInBvcFwiLFwicHVzaFwiLFwicmV2ZXJzZVwiLFwic2hpZnRcIixcInNvcnRcIixcInNwbGljZVwiLFwidW5zaGlmdFwiXSxmdW5jdGlvbihyKXt2YXIgdD1lW3JdO2gucHJvdG90eXBlW3JdPWZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fd3JhcHBlZDtyZXR1cm4gdC5hcHBseShuLGFyZ3VtZW50cyksXCJzaGlmdFwiIT09ciYmXCJzcGxpY2VcIiE9PXJ8fDAhPT1uLmxlbmd0aHx8ZGVsZXRlIG5bMF0sRyh0aGlzLG4pfX0pLGguZWFjaChbXCJjb25jYXRcIixcImpvaW5cIixcInNsaWNlXCJdLGZ1bmN0aW9uKG4pe3ZhciByPWVbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXtyZXR1cm4gRyh0aGlzLHIuYXBwbHkodGhpcy5fd3JhcHBlZCxhcmd1bWVudHMpKX19KSxoLnByb3RvdHlwZS52YWx1ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl93cmFwcGVkfSxoLnByb3RvdHlwZS52YWx1ZU9mPWgucHJvdG90eXBlLnRvSlNPTj1oLnByb3RvdHlwZS52YWx1ZSxoLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBTdHJpbmcodGhpcy5fd3JhcHBlZCl9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFwidW5kZXJzY29yZVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIGh9KX0oKTtcclxuIiwiaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9ufSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzUnRtcCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICByZXR1cm4gKGZpbGUuaW5kZXhPZigncnRtcDonKSA9PSAwIHx8IHR5cGUgPT0gJ3J0bXAnKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGlzV2ViUlRDID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIGlmKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCd3czonKSA9PT0gMCB8fCBmaWxlLmluZGV4T2YoJ3dzczonKSA9PT0gMCB8fCB0eXBlID09PSAnd2VicnRjJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc0Rhc2ggPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgcmV0dXJuICggdHlwZSA9PT0gJ21wZCcgfHwgIHR5cGUgPT09ICdkYXNoJyB8fCB0eXBlID09PSAnYXBwbGljYXRpb24vZGFzaCt4bWwnIHx8IGV4dHJhY3RFeHRlbnNpb24oZmlsZSkgPT0gJ21wZCcpO1xyXG59O1xyXG4iLCIvKipcbiAqIHV0aWxzIGZvciB3ZWJwYWNrXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldFNjcmlwdFBhdGggPSBmdW5jdGlvbihzY3JpcHROYW1lKSB7XG4gICAgY29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3JjID0gc2NyaXB0c1tpXS5zcmM7XG4gICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3JjLmxhc3RJbmRleE9mKCcvJyArIHNjcmlwdE5hbWUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cigwLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyOS4uXG4gKi9cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gX19WRVJTSU9OX187XG4iXSwic291cmNlUm9vdCI6IiJ9