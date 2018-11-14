/*! OvenPlayerv0.7.71 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
                    if (playerConfig.getSourceLabel() && sources[i].label === playerConfig.getSourceLabel()) {
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
                    var _currentSourceIndex = that.getCurrentSource();
                    if (_currentSourceIndex + 1 < that.getSources().length) {
                        //this sequential has available source.
                        that.pause();

                        that.setCurrentSource(_currentSourceIndex + 1);
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
            lazyQueue.off();
            //lazyQueue.removeAndExcuteOnce("load");
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
        lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['load', 'play', 'pause', 'seek', 'stop', 'getDuration', 'getPosition', 'getVolume', 'getMute', 'getBuffer', 'getState', 'getQualityLevels']);
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
            return null;
        }
        OvenPlayerConsole.log("API : getDuration()", currentProvider.getDuration());
        return currentProvider.getDuration();
    };
    that.getPosition = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getPosition()", currentProvider.getPosition());
        return currentProvider.getPosition();
    };
    that.getVolume = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getVolume()", currentProvider.getVolume());
        return currentProvider.getVolume();
    };
    that.setVolume = function (volume) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setVolume() " + volume);
        currentProvider.setVolume(volume);
    };
    that.setMute = function (state) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setMute() " + state);
        return currentProvider.setMute(state);
    };
    that.getMute = function () {
        if (!currentProvider) {
            return null;
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
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : play() ");
        currentProvider.play();
    };
    that.pause = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : pause() ");
        currentProvider.pause();
    };
    that.seek = function (position) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : seek() " + position);
        currentProvider.seek(position);
    };
    that.setPlaybackRate = function (playbackRate) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setPlaybackRate() ", playbackRate);
        return currentProvider.setPlaybackRate(playerConfig.setDefaultPlaybackRate(playbackRate));
    };
    that.getPlaybackRate = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getPlaybackRate() ", currentProvider.getPlaybackRate());
        return currentProvider.getPlaybackRate();
    };

    that.getSources = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getSources() ", currentProvider.getSources());
        return currentProvider.getSources();
    };
    that.getCurrentSource = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getCurrentSource() ", currentProvider.getCurrentSource());
        return currentProvider.getCurrentSource();
    };
    that.setCurrentSource = function (sourceIndex) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setCurrentSource() ", sourceIndex);

        var sources = currentProvider.getSources();
        var currentSource = sources[currentProvider.getCurrentSource()];
        var newSource = sources[sourceIndex];
        var lastPlayPosition = currentProvider.getPosition();
        var isSameProvider = providerController.isSameProvider(currentSource, newSource);
        // provider.serCurrentQuality -> playerConfig setting -> load
        var resultSourceIndex = currentProvider.setCurrentSource(sourceIndex, isSameProvider);

        if (!newSource) {
            return null;
        }

        OvenPlayerConsole.log("API : setCurrentQuality() isSameProvider", isSameProvider);

        if (!isSameProvider) {
            lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['play']);
            initProvider(lastPlayPosition);
        }

        return resultSourceIndex;
    };

    that.getQualityLevels = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getQualityLevels() ", currentProvider.getQualityLevels());
        return currentProvider.getQualityLevels();
    };
    that.getCurrentQuality = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getCurrentQuality() ", currentProvider.getCurrentQuality());
        return currentProvider.getCurrentQuality();
    };
    that.setCurrentQuality = function (qualityIndex) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setCurrentQuality() ", qualityIndex);

        return currentProvider.setCurrentQuality(qualityIndex);
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
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getBuffer() ", currentProvider.getBuffer());
        currentProvider.getBuffer();
    };
    that.getState = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getState() ", currentProvider.getState());
        return currentProvider.getState();
    };
    that.stop = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : stop() ");
        currentProvider.stop();
    };
    that.remove = function () {
        if (!currentProvider) {
            return null;
        }

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
    var sourceLabel = config.sourceLabel || "";
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

    that.getSourceLabel = function () {
        return sourceLabel;
    };
    that.setSourceLabel = function (newLabel) {
        sourceLabel = newLabel;
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
//export const CONTENT_LEVELS = "qualityLevelChanged";
var CONTENT_SOURCE_CHANGED = exports.CONTENT_SOURCE_CHANGED = "sourceChanged";
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
                var provider = __webpack_require__(/*! api/provider/html5/providers/Html5 */ "./src/js/api/provider/html5/providers/Html5.js")["default"];
                registeProvider("html5", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        webrtc: function webrtc() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.WebRTCProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.WebRTCProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/providers/WebRTC */ "./src/js/api/provider/html5/providers/WebRTC.js")["default"];
                registeProvider("webrtc", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        dash: function dash() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.DashProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.DashProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/providers/Dash */ "./src/js/api/provider/html5/providers/Dash.js")["default"];
                registeProvider("dash", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        hls: function hls() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.HlsProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.HlsProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/providers/Hls */ "./src/js/api/provider/html5/providers/Hls.js")["default"];
                registeProvider("hls", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        rtmp: function rtmp() {
            return __webpack_require__.e(/*! require.ensure | ovenplayer.provider.RtmpProvider */ "ovenplayer.provider.RtmpProvider").then((function (require) {
                var provider = __webpack_require__(/*! api/provider/flash/providers/Rtmp */ "./src/js/api/provider/flash/providers/Rtmp.js")["default"];
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
    if (!second) {
        return "--:--";
    }
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
var version = exports.version = '0.7.71-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaUV4cGFuc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9Db25maWd1cmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvU3VwcG9ydENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wbGF5bGlzdC9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xpa2VBJC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvbG9nZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zdHJpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy91bmRlcnNjb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy92YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3dlYnBhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZlcnNpb24uanMiXSwibmFtZXMiOlsiQXBpIiwiY29udGFpbmVyIiwibG9nTWFuYWdlciIsInRoYXQiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsInZlcnNpb24iLCJwbGF5bGlzdE1hbmFnZXIiLCJwcm92aWRlckNvbnRyb2xsZXIiLCJjdXJyZW50UHJvdmlkZXIiLCJwbGF5ZXJDb25maWciLCJsYXp5UXVldWUiLCJpbml0UHJvdmlkZXIiLCJsYXN0UGxheVBvc2l0aW9uIiwicGlja1F1YWxpdHlGcm9tU291cmNlIiwic291cmNlcyIsInF1YWxpdHkiLCJpIiwibGVuZ3RoIiwiZ2V0U291cmNlTGFiZWwiLCJsYWJlbCIsImxvYWRQcm92aWRlcnMiLCJnZXRQbGF5bGlzdCIsInRoZW4iLCJkZXN0cm95IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJQcm92aWRlcnMiLCJnZXROYW1lIiwiUFJPVklERVJfUlRNUCIsIm9uIiwibmFtZSIsImRhdGEiLCJ0cmlnZ2VyIiwiRVJST1IiLCJwYXJzZUludCIsImNvZGUiLCJORVRXT1JLX1VOU1RBQkxFRCIsImdldEN1cnJlbnRTb3VyY2UiLCJnZXRTb3VyY2VzIiwicGF1c2UiLCJzZXRDdXJyZW50U291cmNlIiwicHJlbG9hZCIsImZsdXNoIiwiUkVBRFkiLCJlcnJvciIsImVycm9yT2JqZWN0IiwiSU5JVF9FUlJPUiIsInJlYXNvbiIsIm1lc3NhZ2UiLCJvZmYiLCJpbml0Iiwib3B0aW9ucyIsImlzRGVidWciLCJkaXNhYmxlIiwic2V0UGxheWxpc3QiLCJnZXRDb25maWciLCJnZXREdXJhdGlvbiIsImdldFBvc2l0aW9uIiwiZ2V0Vm9sdW1lIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwic2V0TXV0ZSIsInN0YXRlIiwiZ2V0TXV0ZSIsImxvYWQiLCJwbGF5bGlzdCIsInNldEN1cnJlbnRRdWFsaXR5IiwicGxheSIsInNlZWsiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsInNldERlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJzb3VyY2VJbmRleCIsImN1cnJlbnRTb3VyY2UiLCJuZXdTb3VyY2UiLCJpc1NhbWVQcm92aWRlciIsInJlc3VsdFNvdXJjZUluZGV4IiwiZ2V0UXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiZ2V0QnVmZmVyIiwiZ2V0U3RhdGUiLCJzdG9wIiwicmVtb3ZlIiwiREVTVFJPWSIsIk92ZW5QbGF5ZXJTREsiLCJyZW1vdmVQbGF5ZXIiLCJnZXRDb250YWluZXJJZCIsIkFwaVJ0bXBFeHBhbnNpb24iLCJleHRlcm5hbENhbGxiYWNrQ3JlZXAiLCJyZXN1bHQiLCJ0cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwiLCJDb25maWd1cmF0b3IiLCJjb21wb3NlU291cmNlT3B0aW9ucyIsIkRlZmF1bHRzIiwiZGVmYXVsdFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZUNvbnRyb2xzIiwicGxheWJhY2tSYXRlcyIsIm11dGUiLCJ3aWR0aCIsImhlaWdodCIsInNlcmlhbGl6ZSIsInZhbCIsInVuZGVmaW5lZCIsImxvd2VyY2FzZVZhbCIsInRvTG93ZXJDYXNlIiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwiZGVzZXJpYWxpemUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsIm5vcm1hbGl6ZVNpemUiLCJzbGljZSIsImV2YWx1YXRlQXNwZWN0UmF0aW8iLCJhciIsInRvU3RyaW5nIiwiaW5kZXhPZiIsInRlc3QiLCJpbmRleCIsInciLCJzdWJzdHIiLCJoIiwiY29uZmlnIiwiYXNwZWN0cmF0aW8iLCJyYXRlQ29udHJvbHMiLCJyYXRlcyIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsIl8iLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJwdXNoIiwic29ydCIsImNvbmZpZ1BsYXlsaXN0Iiwib2JqIiwicGljayIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJkZWJ1ZyIsImltYWdlIiwicXVhbGl0eUxhYmVsIiwic291cmNlTGFiZWwiLCJyZXBlYXQiLCJzdHJldGNoaW5nIiwiZ2V0QXNwZWN0cmF0aW8iLCJzZXRBc3BlY3RyYXRpbyIsImFzcGVjdHJhdGlvXyIsImdldERlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRRdWFsaXR5TGFiZWwiLCJzZXRRdWFsaXR5TGFiZWwiLCJuZXdMYWJlbCIsInNldFNvdXJjZUxhYmVsIiwiZ2V0UGxheWJhY2tSYXRlcyIsImlzUGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5bGlzdF8iLCJpc1JlcGVhdCIsImdldFN0cmV0Y2hpbmciLCJFdmVudEVtaXR0ZXIiLCJvYmplY3QiLCJfZXZlbnRzIiwidHJpZ2dlckV2ZW50cyIsImV2ZW50cyIsImFyZ3MiLCJjb250ZXh0IiwiZXZlbnQiLCJsaXN0ZW5lciIsImFwcGx5IiwiY2FsbCIsImFyZ3VtZW50cyIsImFsbEV2ZW50cyIsImFsbCIsIm5hbWVzIiwibCIsInJldGFpbiIsImoiLCJrIiwiX2xpc3RlbmVyIiwib25jZSIsImNvdW50Iiwib25jZUNhbGxiYWNrIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJwcm90b3R5cGUiLCJhZGRRdWV1ZSIsImV4ZWN1dGVRdWV1ZWRDb21tYW5kcyIsInNoaWZ0Iiwic2V0RXhlY3V0ZU1vZGUiLCJtb2RlIiwiZ2V0VW5kZWNvcmF0ZWRNZXRob2RzIiwiZ2V0UXVldWUiLCJlbXB0eSIsInJlbW92ZUFuZEV4Y3V0ZU9uY2UiLCJjb21tYW5kXyIsImNvbW1hbmRRdWV1ZUl0ZW0iLCJmaW5kV2hlcmUiLCJzcGxpY2UiLCJmaW5kSW5kZXgiLCJTdXBwb3J0Q2hlY2tlciIsInN1cHBvcnRMaXN0IiwiY2hlY2tTdXBwb3J0Iiwic291cmNlIiwiTWltZVR5cGVzIiwiYWFjIiwibXA0IiwiZjR2IiwibTR2IiwibW92IiwibXAzIiwibXBlZyIsIm9ndiIsIm9nZyIsIm9nYSIsInZvcmJpcyIsIndlYm0iLCJmNGEiLCJtM3U4IiwibTN1IiwiaGxzIiwidmlkZW8iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjYW5QbGF5VHlwZSIsImZpbGUiLCJ0eXBlIiwibWltZVR5cGUiLCJpc0hsc1N1cHBvcnQiLCJnZXRNZWRpYVNvdXJjZSIsIndpbmRvdyIsIk1lZGlhU291cmNlIiwiV2ViS2l0TWVkaWFTb3VyY2UiLCJtZWRpYVNvdXJjZSIsInNvdXJjZUJ1ZmZlciIsIlNvdXJjZUJ1ZmZlciIsIldlYktpdFNvdXJjZUJ1ZmZlciIsImlzVHlwZVN1cHBvcnRlZCIsInNvdXJjZUJ1ZmZlclZhbGlkQVBJIiwiYXBwZW5kQnVmZmVyIiwiZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlIiwic29ydWNlXyIsImZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCIsInN1cHBvcnROYW1lcyIsIml0ZW0iLCJzdXBwb3J0ZWQiLCJTVEFURV9CVUZGRVJJTkciLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJTVEFURV9QQVVTRUQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfRVJST1IiLCJTVEFURV9MT0FESU5HIiwiU1RBVEVfU1RBTExFRCIsIlBST1ZJREVSX0hUTUw1IiwiUFJPVklERVJfV0VCUlRDIiwiUFJPVklERVJfREFTSCIsIlBST1ZJREVSX0hMUyIsIkNPTlRFTlRfQ09NUExFVEUiLCJDT05URU5UX1NFRUsiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiRElTUExBWV9DTElDSyIsIkNPTlRFTlRfTE9BREVEIiwiQ09OVEVOVF9TRUVLRUQiLCJQTEFZRVJfU1RBVEUiLCJQTEFZRVJfQ09NUExFVEUiLCJQTEFZRVJfUEFVU0UiLCJQTEFZRVJfUExBWSIsIkNPTlRFTlRfQlVGRkVSIiwiQ09OVEVOVF9USU1FIiwiQ09OVEVOVF9SQVRFX0NIQU5HRSIsIkNPTlRFTlRfVk9MVU1FIiwiQ09OVEVOVF9NVVRFIiwiQ09OVEVOVF9NRVRBIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIkNPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCIsIkNPTlRFTlRfQ0FQVElPTl9DSEFOR0VEIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiTWFuYWdlciIsImN1cnJlbnRQbGF5bGlzdCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwicmVwbGFjZSIsInByZXR0aWVkUGxheWxpc3QiLCJ0cmFja3MiLCJwbGF5bGlzdEl0ZW0iLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwiY2FwdGlvbnMiLCJjb25jYXQiLCJ0cmFjayIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsInByb3ZpZGVyIiwiUHJvdmlkZXJMb2FkZXIiLCJodG1sNSIsInJlcXVpcmUiLCJlcnIiLCJFcnJvciIsIndlYnJ0YyIsImRhc2giLCJydG1wIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJwcm92aWRlck5hbWUiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwicGxheWVyTGlzdCIsImNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudCIsImNvbnRhaW5lckVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm5vZGVUeXBlIiwiY3JlYXRlIiwicGxheWVySW5zdGFuY2UiLCJnZXRQbGF5ZXJMaXN0IiwiZ2V0UGxheWVyQnlDb250YWluZXJJZCIsImNvbnRhaW5lcklkIiwiZ2V0UGxheWVyQnlJbmRleCIsInBsYXllcklkIiwiY29uc29sZSIsImdlbmVyYXRlV2VicnRjVXJscyIsIkxhJCIsInNlbGVjdG9yT3JFbGVtZW50IiwicmV0dXJuTm9kZSIsIiRlbGVtZW50Iiwic2VsZWN0b3IiLCJub2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsImlzRWxlbWVudCIsImZpbmQiLCJjc3MiLCJ2YWx1ZSIsImVsZW1lbnQiLCJzdHlsZSIsImFkZENsYXNzIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2xhc3NOYW1lcyIsImNsYXNzTmFtZSIsInNwbGl0IiwicmVtb3ZlQ2xhc3MiLCJSZWdFeHAiLCJqb2luIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0ck5hbWUiLCJzaG93IiwiZGlzcGxheSIsImhpZGUiLCJhcHBlbmQiLCJodG1sQ29kZSIsImlubmVySFRNTCIsInRleHQiLCJ0ZXh0Q29udGVudCIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJpcyIsIiR0YXJnZXRFbGVtZW50Iiwib2Zmc2V0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImJvZHkiLCJzY3JvbGxUb3AiLCJsZWZ0Iiwic2Nyb2xsTGVmdCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiYXR0ciIsImdldEF0dHJpYnV0ZSIsImh0bWwiLCJyZXBsYWNlV2l0aCIsImFwcGVuZENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJoYXNDaGlsZE5vZGVzIiwiZmlyc3RDaGlsZCIsImdldCIsImNsb3Nlc3QiLCJzZWxlY3RvclN0cmluZyIsImNsb3Nlc3RFbGVtZW50IiwibG9nZ2VyIiwicHJldkNvbnNvbGVMb2ciLCJlbmFibGUiLCJ0cmltIiwibmF0dXJhbEhtcyIsInN0cmluZyIsImV4dHJhY3RFeHRlbnNpb24iLCJwYXRoIiwiZ2V0QXp1cmVGaWxlRm9ybWF0IiwiZXh0ZW5zaW9uIiwiYXp1cmVkRm9ybWF0IiwibGFzdEluZGV4T2YiLCJzZWNvbmQiLCJzZWNOdW0iLCJob3VycyIsImZsb29yIiwibWludXRlcyIsInNlY29uZHMiLCJuIiwic2VsZiIsImdsb2JhbCIsInIiLCJlIiwibyIsInMiLCJTeW1ib2wiLCJ1IiwiYyIsInAiLCJoYXNPd25Qcm9wZXJ0eSIsInQiLCJhIiwiZiIsIl93cmFwcGVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIlZFUlNJT04iLCJ2IiwieSIsImQiLCJpdGVyYXRlZSIsImlkZW50aXR5IiwiaXNGdW5jdGlvbiIsImlzT2JqZWN0IiwibWF0Y2hlciIsInByb3BlcnR5IiwiZyIsIm1heCIsIm0iLCJiIiwieCIsInBvdyIsIkEiLCJlYWNoIiwiY29sbGVjdCIsIk8iLCJyZWR1Y2UiLCJmb2xkbCIsImluamVjdCIsInJlZHVjZVJpZ2h0IiwiZm9sZHIiLCJkZXRlY3QiLCJmaW5kS2V5Iiwic2VsZWN0IiwicmVqZWN0IiwibmVnYXRlIiwic29tZSIsImFueSIsImluY2x1ZGVzIiwiaW5jbHVkZSIsInZhbHVlcyIsImludm9rZSIsInBsdWNrIiwid2hlcmUiLCJtaW4iLCJzaHVmZmxlIiwic2FtcGxlIiwicmFuZG9tIiwiY2xvbmUiLCJzb3J0QnkiLCJjcml0ZXJpYSIsImdyb3VwQnkiLCJpbmRleEJ5IiwiY291bnRCeSIsIlMiLCJ0b0FycmF5IiwiaXNTdHJpbmciLCJtYXRjaCIsInNpemUiLCJwYXJ0aXRpb24iLCJmaXJzdCIsImhlYWQiLCJ0YWtlIiwiaW5pdGlhbCIsImxhc3QiLCJyZXN0IiwidGFpbCIsImRyb3AiLCJjb21wYWN0IiwiQm9vbGVhbiIsIk0iLCJpc0FyZ3VtZW50cyIsImZsYXR0ZW4iLCJ3aXRob3V0IiwiZGlmZmVyZW5jZSIsInVuaXEiLCJ1bmlxdWUiLCJpc0Jvb2xlYW4iLCJ1bmlvbiIsImludGVyc2VjdGlvbiIsInVuemlwIiwiemlwIiwiRiIsImZpbmRMYXN0SW5kZXgiLCJzb3J0ZWRJbmRleCIsIkUiLCJyYW5nZSIsImNlaWwiLCJjaHVuayIsIk4iLCJiaW5kIiwiVHlwZUVycm9yIiwicGFydGlhbCIsInBsYWNlaG9sZGVyIiwiYmluZEFsbCIsIm1lbW9pemUiLCJjYWNoZSIsImRlbGF5Iiwic2V0VGltZW91dCIsImRlZmVyIiwidGhyb3R0bGUiLCJsZWFkaW5nIiwibm93IiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJjYW5jZWwiLCJkZWJvdW5jZSIsIndyYXAiLCJjb21wb3NlIiwiYWZ0ZXIiLCJiZWZvcmUiLCJyZXN0QXJndW1lbnRzIiwiSSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiVCIsIkIiLCJjb25zdHJ1Y3RvciIsImFsbEtleXMiLCJtYXBPYmplY3QiLCJwYWlycyIsImludmVydCIsImZ1bmN0aW9ucyIsIm1ldGhvZHMiLCJSIiwiZXh0ZW5kIiwiZXh0ZW5kT3duIiwiYXNzaWduIiwicSIsIksiLCJ6Iiwib21pdCIsIlN0cmluZyIsImRlZmF1bHRzIiwidGFwIiwiaXNNYXRjaCIsInZhbHVlT2YiLCJwb3AiLCJpc0VxdWFsIiwiaXNFbXB0eSIsIkQiLCJjaGlsZE5vZGVzIiwiSW50OEFycmF5IiwiaXNGaW5pdGUiLCJpc1N5bWJvbCIsImlzTnVsbCIsImlzVW5kZWZpbmVkIiwiaGFzIiwibm9Db25mbGljdCIsImNvbnN0YW50Iiwibm9vcCIsInByb3BlcnR5T2YiLCJtYXRjaGVzIiwidGltZXMiLCJEYXRlIiwiZ2V0VGltZSIsIkwiLCJQIiwiVyIsImVzY2FwZSIsInVuZXNjYXBlIiwiQyIsInVuaXF1ZUlkIiwidGVtcGxhdGVTZXR0aW5ncyIsImV2YWx1YXRlIiwiaW50ZXJwb2xhdGUiLCJKIiwiVSIsIlYiLCIkIiwidGVtcGxhdGUiLCJ2YXJpYWJsZSIsIkZ1bmN0aW9uIiwiY2hhaW4iLCJfY2hhaW4iLCJHIiwibWl4aW4iLCJ0b0pTT04iLCJkZWZpbmUiLCJpc1J0bXAiLCJpc1dlYlJUQyIsImlzRGFzaCIsImdldFNjcmlwdFBhdGgiLCJzY3JpcHROYW1lIiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3JjIiwiX19WRVJTSU9OX18iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxpREFBeUMsa2pCQUFrakI7QUFDM2xCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQSx5Q0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUF3QixrQ0FBa0M7QUFDMUQsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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WSx3Q0FBZ0IsU0FBaEJBLGFBQWdCLENBQVNDLFVBQVQsRUFBcUI7QUFDOUMsUUFBTUMsVUFBVTFZLFNBQVMyWSxvQkFBVCxDQUE4QixRQUE5QixDQUFoQjtBQUNBLFNBQUssSUFBSXJtQixJQUFJLENBQWIsRUFBZ0JBLElBQUlvbUIsUUFBUW5tQixNQUE1QixFQUFvQ0QsR0FBcEMsRUFBeUM7QUFDckMsWUFBTXNtQixNQUFNRixRQUFRcG1CLENBQVIsRUFBV3NtQixHQUF2QjtBQUNBLFlBQUlBLEdBQUosRUFBUztBQUNMLGdCQUFNM2YsUUFBUTJmLElBQUk1TSxXQUFKLENBQWdCLE1BQU15TSxVQUF0QixDQUFkO0FBQ0EsZ0JBQUl4ZixTQUFTLENBQWIsRUFBZ0I7QUFDWix1QkFBTzJmLElBQUl6ZixNQUFKLENBQVcsQ0FBWCxFQUFjRixRQUFRLENBQXRCLENBQVA7QUFDSDtBQUNKO0FBQ0o7QUFDRCxXQUFPLEVBQVA7QUFDSCxDQVpNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSlA7OztBQUdPLElBQU10SCw0QkFBVWtuQixtQkFBaEIsQyIsImZpbGUiOiJvdmVucGxheWVyLnNkay5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdH07XG5cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwib3ZlbnBsYXllci5zZGtcIjogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHtcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJyk7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9vdmVucGxheWVyLnNkay5qc1wiKTtcbiIsIi8qIGdsb2JhbHMgX193ZWJwYWNrX2FtZF9vcHRpb25zX18gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXztcclxuIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsIGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaCAoZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcbiIsIi8vaW1wb3J0IENhcHRpb25NYW5hZ2VyIGZyb20gXCJhcGkvY2FwdGlvbi9NYW5hZ2VyXCI7XHJcbmltcG9ydCBDb25maWd1cmF0b3IgZnJvbSBcImFwaS9Db25maWd1cmF0b3JcIjtcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgTGF6eUNvbW1hbmRFeGVjdXRvciBmcm9tIFwiYXBpL0xhenlDb21tYW5kRXhlY3V0b3JcIjtcclxuaW1wb3J0IExvZ01hbmFnZXIgZnJvbSBcInV0aWxzL2xvZ2dlclwiO1xyXG5pbXBvcnQgUGxheWxpc3RNYW5hZ2VyIGZyb20gXCJhcGkvcGxheWxpc3QvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXJDb250cm9sbGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvQ29udHJvbGxlclwiO1xyXG5pbXBvcnQge1JFQURZLCBFUlJPUiwgSU5JVF9FUlJPUiwgREVTVFJPWSwgTkVUV09SS19VTlNUQUJMRUQsIFBMQVlFUl9GSUxFX0VSUk9SLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAndmVyc2lvbic7XHJcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgb2JqZWN0IGNvbm5lY3RzIFVJIHRvIHRoZSBwcm92aWRlci5cclxuICogQHBhcmFtICAge29iamVjdH0gICAgY29udGFpbmVyICBkb20gZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuY29uc3QgQXBpID0gZnVuY3Rpb24oY29udGFpbmVyKXtcclxuICAgIGxldCBsb2dNYW5hZ2VyID0gTG9nTWFuYWdlcigpO1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltbT3ZlblBsYXllcl1dIHYuXCIrIHZlcnNpb24pO1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIGxvYWRlZC5cIik7XHJcbiAgICAvL2xldCBjYXB0aW9uTWFuYWdlciA9IENhcHRpb25NYW5hZ2VyKHRoYXQpO1xyXG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcigpO1xyXG4gICAgbGV0IHByb3ZpZGVyQ29udHJvbGxlciA9IFByb3ZpZGVyQ29udHJvbGxlcigpO1xyXG4gICAgbGV0IGN1cnJlbnRQcm92aWRlciA9IFwiXCI7XHJcbiAgICBsZXQgcGxheWVyQ29uZmlnID0gXCJcIjtcclxuICAgIGxldCBsYXp5UXVldWUgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0IGluaXRQcm92aWRlciA9IGZ1bmN0aW9uKGxhc3RQbGF5UG9zaXRpb24pe1xyXG4gICAgICAgIGNvbnN0IHBpY2tRdWFsaXR5RnJvbVNvdXJjZSA9IChzb3VyY2VzKSA9PntcclxuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSAwO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpKS50aGVuKFByb3ZpZGVycyA9PiB7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tRdWFsaXR5RnJvbVNvdXJjZShwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyggXCJjdXJyZW50IHNvdXJjZSBpbmRleCA6IFwiKyBjdXJyZW50U291cmNlSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy9DYWxsIFByb3ZpZGVyLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XShjb250YWluZXIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpID09PSBQUk9WSURFUl9SVE1QKXtcclxuICAgICAgICAgICAgICAgIC8vSWYgcHJvdmlkZXIgdHlwZSBpcyBSVE1QLCB3ZSBhY2NlcHRzIFJ0bXBFeHBhbnNpb24uXHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoYXQsIEFwaVJ0bXBFeHBhbnNpb24oY3VycmVudFByb3ZpZGVyKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vVGhpcyBwYXNzZXMgdGhlIGV2ZW50IGNyZWF0ZWQgYnkgdGhlIFByb3ZpZGVyIHRvIEFQSS5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLm9uKFwiYWxsXCIsIGZ1bmN0aW9uKG5hbWUsIGRhdGEpe1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihuYW1lLCBkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0F1dG8gbmV4dCBzb3VyY2Ugd2hlbiBwbGF5ZXIgbG9hZCB3YXMgZmFpbCBieSBhbWlzcyBzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAvL2RhdGEuY29kZSA9PT0gUExBWUVSX0ZJTEVfRVJST1JcclxuICAgICAgICAgICAgICAgIGlmKCAobmFtZSA9PT0gRVJST1IgJiYgKHBhcnNlSW50KGRhdGEuY29kZS8xMDApID09PSAzIHx8IHBhcnNlSW50KGRhdGEuY29kZS8xMDApID09PSA1KSl8fCBuYW1lID09PSBORVRXT1JLX1VOU1RBQkxFRCApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50U291cmNlSW5kZXggPSB0aGF0LmdldEN1cnJlbnRTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjdXJyZW50U291cmNlSW5kZXgrMSA8IHRoYXQuZ2V0U291cmNlcygpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBzZXF1ZW50aWFsIGhhcyBhdmFpbGFibGUgc291cmNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UoY3VycmVudFNvdXJjZUluZGV4KzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pLnRoZW4oKCk9PntcclxuXHJcbiAgICAgICAgICAgIC8vcHJvdmlkZXIncyBwcmVsb2FkKCkgaGF2ZSB0byBtYWRlIFByb21pc2UuIEN1eiBpdCBvdmVyY29tZXMgJ2ZsYXNoIGxvYWRpbmcgdGltaW5nIHByb2JsZW0nLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIucHJlbG9hZChwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSwgbGFzdFBsYXlQb3NpdGlvbiApLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5mbHVzaCgpO1xyXG4gICAgICAgICAgICAgICAgLy9UaGlzIGlzIG5vIHJlYXNvbiB0byBleGlzdCBhbnltb3JlLlxyXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUkVBRFkpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yT2JqZWN0ID0ge2NvZGUgOiBJTklUX0VSUk9SLCByZWFzb24gOiBcImluaXQgZXJyb3IuXCIsIG1lc3NhZ2UgOiBcIlBsYXllciBpbml0IGVycm9yLlwiLCBlcnJvciA6IGVycm9yfTtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgZXJyb3JPYmplY3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3JPYmplY3QgPSB7Y29kZSA6IElOSVRfRVJST1IsIHJlYXNvbiA6IFwiaW5pdCBlcnJvci5cIiwgbWVzc2FnZSA6IFwiUGxheWVyIGluaXQgZXJyb3IuXCIsIGVycm9yIDogZXJyb3J9O1xyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIGVycm9yT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgIC8veHh4IDogSWYgeW91IGluaXQgZW1wdHkgc291cmNlcy4gKEkgdGhpbmsgdGhpcyBpcyBzdHJhbmdlIGNhc2UuKVxyXG4gICAgICAgICAgICAvL1RoaXMgd29ya3MgZm9yIHRoaXMgY2FzZS5cclxuICAgICAgICAgICAgLy9wbGF5ZXIgPSBPdmVuUGxheWVyLmNyZWF0ZShcImVsSWRcIiwge30pO1xyXG4gICAgICAgICAgICAvL3BsYXllci5sb2FkKHNvcnVjZXMpO1xyXG4gICAgICAgICAgICBsYXp5UXVldWUub2ZmKCk7XHJcbiAgICAgICAgICAgIC8vbGF6eVF1ZXVlLnJlbW92ZUFuZEV4Y3V0ZU9uY2UoXCJsb2FkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBUEkg7LSI6riw7ZmUIO2VqOyImFxyXG4gICAgICogaW5pdFxyXG4gICAgICogQHBhcmFtICAgICAge29iamVjdH0gb3B0aW9ucyBwbGF5ZXIgaW5pdGlhbCBvcHRpb24gdmFsdWUuXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICoqL1xyXG4gICAgdGhhdC5pbml0ID0gKG9wdGlvbnMpID0+e1xyXG4gICAgICAgIC8vSXQgY29sbGVjdHMgdGhlIGNvbW1hbmRzIGFuZCBleGVjdXRlcyB0aGVtIGF0IHRoZSB0aW1lIHdoZW4gdGhleSBhcmUgZXhlY3V0YWJsZS5cclxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFtcclxuICAgICAgICAgICAgJ2xvYWQnLCdwbGF5JywncGF1c2UnLCdzZWVrJywnc3RvcCcsICdnZXREdXJhdGlvbicsICdnZXRQb3NpdGlvbicsICdnZXRWb2x1bWUnXHJcbiAgICAgICAgICAgICwgJ2dldE11dGUnLCAnZ2V0QnVmZmVyJywgJ2dldFN0YXRlJyAsICdnZXRRdWFsaXR5TGV2ZWxzJ1xyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zKTtcclxuICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzRGVidWcoKSl7XHJcbiAgICAgICAgICAgIGxvZ01hbmFnZXIuZGlzYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KClcIik7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIGNvbmZpZyA6IFwiLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0UGxheWxpc3QocGxheWVyQ29uZmlnLmdldFBsYXlsaXN0KCkpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBzb3VyY2VzIDogXCIgLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XHJcbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qdGhhdC5nZXRDb250YWluZXJJZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXIuaWQ7XHJcbiAgICB9OyovXHJcblxyXG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q29uZmlnKClcIiwgcGxheWVyQ29uZmlnLmdldENvbmZpZygpKTtcclxuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldENvbmZpZygpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXREdXJhdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBvc2l0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFZvbHVtZSgpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFZvbHVtZSgpIFwiICsgdm9sdW1lKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRNdXRlKCkgXCIgKyBzdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRNdXRlKCkgXCIgKyBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAocGxheWxpc3QpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xyXG5cclxuICAgICAgICBpZihwbGF5bGlzdCl7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldFBsYXlsaXN0KHBsYXlsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluaXRQcm92aWRlcigpO1xyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwbGF5KCkgXCIpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wbGF5KCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGF1c2UoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrKCkgXCIrIHBvc2l0aW9uKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2Vlayhwb3NpdGlvbik7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFBsYXliYWNrUmF0ZSgpIFwiLCBwbGF5YmFja1JhdGUpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0UGxheWJhY2tSYXRlKHBsYXllckNvbmZpZy5zZXREZWZhdWx0UGxheWJhY2tSYXRlKHBsYXliYWNrUmF0ZSkpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQbGF5YmFja1JhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTb3VyY2VzKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFNvdXJjZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoc291cmNlSW5kZXgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFNvdXJjZSgpIFwiLCBzb3VyY2VJbmRleCk7XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VzID0gY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKTtcclxuICAgICAgICBsZXQgY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKV07XHJcbiAgICAgICAgbGV0IG5ld1NvdXJjZSA9IHNvdXJjZXNbc291cmNlSW5kZXhdO1xyXG4gICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IGlzU2FtZVByb3ZpZGVyID0gcHJvdmlkZXJDb250cm9sbGVyLmlzU2FtZVByb3ZpZGVyKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSk7XHJcbiAgICAgICAgLy8gcHJvdmlkZXIuc2VyQ3VycmVudFF1YWxpdHkgLT4gcGxheWVyQ29uZmlnIHNldHRpbmcgLT4gbG9hZFxyXG4gICAgICAgIGxldCByZXN1bHRTb3VyY2VJbmRleCA9IGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50U291cmNlKHNvdXJjZUluZGV4LCBpc1NhbWVQcm92aWRlcik7XHJcblxyXG4gICAgICAgIGlmKCFuZXdTb3VyY2Upe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgaXNTYW1lUHJvdmlkZXJcIiwgaXNTYW1lUHJvdmlkZXIpO1xyXG5cclxuICAgICAgICBpZighaXNTYW1lUHJvdmlkZXIpe1xyXG4gICAgICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheSddKTtcclxuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFNvdXJjZUluZGV4O1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UXVhbGl0eUxldmVscygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgXCIsIHF1YWxpdHlJbmRleCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkocXVhbGl0eUluZGV4KTtcclxuICAgIH07XHJcblxyXG4gICAgLyogQ2FwdGlvbnMgOiBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgdmVyc2lvbi4qL1xyXG4gICAgLyp0aGF0LnNldEN1cnJlbnRDYXB0aW9uID0gKGluZGV4KSA9PntcclxuICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuc2V0Q3VycmVudENhcHRpb24oaW5kZXgpO1xyXG4gICAgIH1cclxuICAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT57XHJcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCk7XHJcbiAgICAgfVxyXG4gICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XHJcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XHJcbiAgICAgfVxyXG4gICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT4ge1xyXG4gICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5hZGRDYXB0aW9uKCk7XHJcbiAgICAgfVxyXG4gICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XHJcbiAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XHJcbiAgICAgfSovXHJcblxyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRCdWZmZXIoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFN0YXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zdG9wID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc3RvcCgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgXCIpO1xyXG4gICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XHJcbiAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdmlkZXJDb250cm9sbGVyID0gbnVsbDtcclxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIHBsYXllckNvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgbGF6eVF1ZXVlID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhhdC50cmlnZ2VyKERFU1RST1kpO1xyXG4gICAgICAgIHRoYXQub2ZmKCk7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIC0gbGF6eVF1ZXVlLCBjdXJyZW50UHJvdmlkZXIsIHByb3ZpZGVyQ29udHJvbGxlciwgcGxheWxpc3RNYW5hZ2VyLCBwbGF5ZXJDb25maWcsIGFwaSBldmVudCBkZXN0cm9lZC4gXCIpO1xyXG4gICAgICAgIGxvZ01hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIGxvZ01hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyKHRoYXQuZ2V0Q29udGFpbmVySWQoKSk7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwaTtcclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgQXBpUnRtcEV4cGFuc2lvbiA9IGZ1bmN0aW9uKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGV4dGVybmFsQ2FsbGJhY2tDcmVlcCA6IChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgaWYocmVzdWx0Lm5hbWUgJiYgcmVzdWx0LmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci50cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwocmVzdWx0Lm5hbWUsIHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBpbml0aWFsaXplcyB0aGUgaW5wdXQgb3B0aW9ucy5cclxuICogQHBhcmFtICAgb3B0aW9uc1xyXG4gKlxyXG4gKiAqL1xyXG5jb25zdCBDb25maWd1cmF0b3IgPSBmdW5jdGlvbihvcHRpb25zKXtcclxuXHJcbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBkZWZhdWx0UGxheWJhY2tSYXRlOiAxLFxyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVDb250cm9sczogZmFsc2UsXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFswLjI1LCAwLjUsIDEsIDEuNSwgMl0sXHJcbiAgICAgICAgICAgIG11dGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2b2x1bWU6IDkwLFxyXG4gICAgICAgICAgICB3aWR0aDogNjQwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDM2MFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJjYXNlVmFsID0gdmFsLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIodmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2lkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHNlcmlhbGl6ZShvcHRpb25zW2tleV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplU2l6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbC5zbGljZSAmJiB2YWwuc2xpY2UoLTIpID09PSAncHgnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWwuc2xpY2UoMCwgLTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGV2YWx1YXRlQXNwZWN0UmF0aW8gPSBmdW5jdGlvbiAoYXIsIHdpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aWR0aC50b1N0cmluZygpLmluZGV4T2YoJyUnKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXIgIT09ICdzdHJpbmcnIHx8ICFhcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKC9eXFxkKlxcLj9cXGQrJSQvLnRlc3QoYXIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhci5pbmRleE9mKCc6Jyk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHcgPSBwYXJzZUZsb2F0KGFyLnN1YnN0cigwLCBpbmRleCkpO1xyXG4gICAgICAgICAgICBjb25zdCBoID0gcGFyc2VGbG9hdChhci5zdWJzdHIoaW5kZXggKyAxKSk7XHJcbiAgICAgICAgICAgIGlmICh3IDw9IDAgfHwgaCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKGggLyB3ICogMTAwKSArICclJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVzZXJpYWxpemUob3B0aW9ucyk7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgICAgICBjb25maWcud2lkdGggPSBub3JtYWxpemVTaXplKGNvbmZpZy53aWR0aCk7XHJcbiAgICAgICAgY29uZmlnLmhlaWdodCA9IG5vcm1hbGl6ZVNpemUoY29uZmlnLmhlaWdodCk7XHJcbiAgICAgICAgY29uZmlnLmFzcGVjdHJhdGlvID0gZXZhbHVhdGVBc3BlY3RSYXRpbyhjb25maWcuYXNwZWN0cmF0aW8sIGNvbmZpZy53aWR0aCk7XHJcblxyXG4gICAgICAgIGxldCByYXRlQ29udHJvbHMgPSBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHM7XHJcbiAgICAgICAgaWYgKHJhdGVDb250cm9scykge1xyXG4gICAgICAgICAgICBsZXQgcmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcztcclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhdGVDb250cm9scykpIHtcclxuICAgICAgICAgICAgICAgIHJhdGVzID0gcmF0ZUNvbnRyb2xzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJhdGVzID0gcmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KVxyXG4gICAgICAgICAgICAgICAgLm1hcChyYXRlID0+IE1hdGgucm91bmQocmF0ZSAqIDQpIC8gNCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmF0ZXMuaW5kZXhPZigxKSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJhdGVzLnB1c2goMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmF0ZXMuc29ydCgpO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSByYXRlcztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyB8fCBjb25maWcucGxheWJhY2tSYXRlcy5pbmRleE9mKGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlKSA8IDApIHtcclxuICAgICAgICAgICAgY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZSA9IGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlO1xyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5hc3BlY3RyYXRpbykge1xyXG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLmFzcGVjdHJhdGlvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29uZmlnUGxheWxpc3QgPSBjb25maWcucGxheWxpc3Q7XHJcbiAgICAgICAgaWYgKCFjb25maWdQbGF5bGlzdCkge1xyXG4gICAgICAgICAgICBjb25zdCBvYmogPSBfLnBpY2soY29uZmlnLCBbXHJcbiAgICAgICAgICAgICAgICAndGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyxcclxuICAgICAgICAgICAgICAgICdtZWRpYWlkJyxcclxuICAgICAgICAgICAgICAgICdpbWFnZScsXHJcbiAgICAgICAgICAgICAgICAnZmlsZScsXHJcbiAgICAgICAgICAgICAgICAnc291cmNlcycsXHJcbiAgICAgICAgICAgICAgICAndHJhY2tzJyxcclxuICAgICAgICAgICAgICAgICdwcmVsb2FkJyxcclxuICAgICAgICAgICAgICAgICdkdXJhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnaG9zdCcsXHJcbiAgICAgICAgICAgICAgICAnYXBwbGljYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3N0cmVhbSdcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBbIG9iaiBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0KSkge1xyXG4gICAgICAgICAgICBjb25maWcuZmVlZERhdGEgPSBjb25maWdQbGF5bGlzdDtcclxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gY29uZmlnUGxheWxpc3QucGxheWxpc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWxldGUgY29uZmlnLmR1cmF0aW9uO1xyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ29uZmlndXJhdG9yIGxvYWRlZC5cIiwgb3B0aW9ucyk7XHJcbiAgICBsZXQgY29uZmlnID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgbGV0IGFzcGVjdHJhdGlvID0gY29uZmlnLmFzcGVjdHJhdGlvIHx8IFwiMTY6OVwiO1xyXG4gICAgbGV0IGRlYnVnID0gY29uZmlnLmRlYnVnO1xyXG4gICAgbGV0IGRlZmF1bHRQbGF5YmFja1JhdGUgPSBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSB8fCAxO1xyXG4gICAgbGV0IGltYWdlID0gY29uZmlnLmltYWdlO1xyXG4gICAgbGV0IHBsYXliYWNrUmF0ZUNvbnRyb2xzID0gY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzIHx8IHRydWU7XHJcbiAgICBsZXQgcGxheWJhY2tSYXRlcyA9IGNvbmZpZy5wbGF5YmFja1JhdGVzIHx8IFswLjUsIDEsIDEuMjUsIDEuNSwgMl07XHJcbiAgICBsZXQgcGxheWxpc3QgPSBjb25maWcucGxheWxpc3QgfHwgW107XHJcbiAgICBsZXQgcXVhbGl0eUxhYmVsID0gY29uZmlnLnF1YWxpdHlMYWJlbCB8fCBcIlwiO1xyXG4gICAgbGV0IHNvdXJjZUxhYmVsID0gY29uZmlnLnNvdXJjZUxhYmVsIHx8IFwiXCI7XHJcbiAgICBsZXQgcmVwZWF0ID0gY29uZmlnLnJlcGVhdCB8fCBmYWxzZTtcclxuICAgIGxldCBzdHJldGNoaW5nID0gY29uZmlnLnN0cmV0Y2hpbmcgfHwgJ3VuaWZvcm0nO1xyXG5cclxuXHJcblxyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7cmV0dXJuIGNvbmZpZzt9O1xyXG5cclxuICAgIHRoYXQuZ2V0QXNwZWN0cmF0aW8gPSgpPT57cmV0dXJuIGFzcGVjdHJhdGlvO307XHJcbiAgICB0aGF0LnNldEFzcGVjdHJhdGlvID0oYXNwZWN0cmF0aW9fKT0+e2FzcGVjdHJhdGlvID0gYXNwZWN0cmF0aW9fO307XHJcblxyXG4gICAgdGhhdC5pc0RlYnVnID0oKT0+e3JldHVybiBkZWJ1Zzt9O1xyXG5cclxuICAgIHRoYXQuZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KCk9PntyZXR1cm4gZGVmYXVsdFBsYXliYWNrUmF0ZTt9O1xyXG4gICAgdGhhdC5zZXREZWZhdWx0UGxheWJhY2tSYXRlID0ocGxheWJhY2tSYXRlKT0+e2RlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7IHJldHVybiBwbGF5YmFja1JhdGU7fTtcclxuXHJcbiAgICB0aGF0LmdldFF1YWxpdHlMYWJlbCA9ICgpID0+IHtyZXR1cm4gcXVhbGl0eUxhYmVsO307XHJcbiAgICB0aGF0LnNldFF1YWxpdHlMYWJlbCA9IChuZXdMYWJlbCkgPT4ge3F1YWxpdHlMYWJlbCA9IG5ld0xhYmVsO307XHJcblxyXG4gICAgdGhhdC5nZXRTb3VyY2VMYWJlbCA9ICgpID0+IHtyZXR1cm4gc291cmNlTGFiZWw7fTtcclxuICAgIHRoYXQuc2V0U291cmNlTGFiZWwgPSAobmV3TGFiZWwpID0+IHtzb3VyY2VMYWJlbCA9IG5ld0xhYmVsO307XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGVzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVzO307XHJcbiAgICB0aGF0LmlzUGxheWJhY2tSYXRlQ29udHJvbHMgPSgpPT57cmV0dXJuIHBsYXliYWNrUmF0ZUNvbnRyb2xzO307XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9KCk9PntyZXR1cm4gcGxheWxpc3Q7fTtcclxuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdF8gKT0+e1xyXG4gICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdF8pKXtcclxuICAgICAgICAgICAgcGxheWxpc3QgPSBwbGF5bGlzdF87XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHBsYXlsaXN0ID0gW3BsYXlsaXN0X107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwbGF5bGlzdDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc1JlcGVhdCA9KCk9PntyZXR1cm4gcmVwZWF0O307XHJcblxyXG4gICAgdGhhdC5nZXRTdHJldGNoaW5nID0oKT0+e3JldHVybiBzdHJldGNoaW5nO307XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWd1cmF0b3I7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMy4uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbW9kdWxlIHByb3ZpZGUgY3VzdG9tIGV2ZW50cy5cclxuICogQHBhcmFtICAgb2JqZWN0ICAgIEFuIG9iamVjdCB0aGF0IHJlcXVpcmVzIGN1c3RvbSBldmVudHMuXHJcbiAqXHJcbiAqICovXHJcblxyXG5jb25zdCBFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbihvYmplY3Qpe1xyXG4gICAgbGV0IHRoYXQgPSBvYmplY3Q7XHJcbiAgICBsZXQgX2V2ZW50cyA9W107XHJcblxyXG4gICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgY29udGV4dCl7XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBldmVudHMubGVuZ3RoO1xyXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGxldCBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgZXZlbnQubGlzdGVuZXIuYXBwbHkoICggZXZlbnQuY29udGV4dCB8fCBjb250ZXh0ICksIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcclxuICAgICAgICAoX2V2ZW50c1tuYW1lXSB8fCAoX2V2ZW50c1tuYW1lXT1bXSkgKS5wdXNoKHsgbGlzdGVuZXI6IGxpc3RlbmVyICAsIGNvbnRleHQgOiBjb250ZXh0fSk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSl7XHJcbiAgICAgICAgaWYoIV9ldmVudHMpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcbiAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcclxuICAgICAgICBjb25zdCBhbGxFdmVudHMgPSBfZXZlbnRzLmFsbDtcclxuXHJcbiAgICAgICAgaWYoZXZlbnRzKXtcclxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MsIHRoYXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhbGxFdmVudHMpe1xyXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzLCB0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XHJcbiAgICAgICAgaWYoIV9ldmVudHMpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIW5hbWUgJiYgIWxpc3RlbmVyICYmICFjb250ZXh0KSAge1xyXG4gICAgICAgICAgICBfZXZlbnRzID0gW107XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogT2JqZWN0LmtleXMoX2V2ZW50cyk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmV0YWluID0gX2V2ZW50c1tuYW1lXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyICB8fCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIubGlzdGVuZXIgICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5fbGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2ZW50LmNvbnRleHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9ldmVudHNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5vbmNlID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgY29uc3Qgb25jZUNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudCsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5vZmYobmFtZSwgb25jZUNhbGxiYWNrKTtcclxuICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9uY2VDYWxsYmFjay5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICByZXR1cm4gdGhhdC5vbihuYW1lLCBvbmNlQ2FsbGJhY2ssIGNvbnRleHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnRFbWl0dGVyO1xyXG4iLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcbiAqICovXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XG4gICAgfVxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XG4gICAgfVxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICB9XG5cbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgIH07XG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxyXG4gKiBAcGFyYW1cclxuICogKi9cclxuXHJcbmNvbnN0IFN1cHBvcnRDaGVja2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XHJcbiAgICBjb25zdCBzdXBwb3J0TGlzdCA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgTWltZVR5cGVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbXA0OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBmNHY6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbW92OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtcDM6ICdhdWRpby9tcGVnJyxcclxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2d2OiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ2c6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgdm9yYmlzOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICB3ZWJtOiAndmlkZW8vd2VibScsXHJcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcclxuICAgICAgICAgICAgICAgICAgICBtM3U4OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxyXG4gICAgICAgICAgICAgICAgICAgIG0zdTogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcclxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmKCF0eXBlKXtyZXR1cm4gZmFsc2U7fVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWltZVR5cGUgPSBzb3VyY2UubWltZVR5cGUgfHwgTWltZVR5cGVzW3R5cGVdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW1pbWVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnd2VicnRjJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbXBkIGFwcGxpY2F0aW9uL2Rhc2greG1sXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXNoKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2hscycsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy90aGlzIG1ldGhvZCBmcm9tIGhscy5qc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1lZGlhU291cmNlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlciA9IHdpbmRvdy5Tb3VyY2VCdWZmZXIgfHwgd2luZG93LldlYktpdFNvdXJjZUJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNUeXBlU3VwcG9ydGVkID0gbWVkaWFTb3VyY2UgJiYgdHlwZW9mIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUUsbXA0YS40MC4yXCInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgU291cmNlQnVmZmVyIGlzIGV4cG9zZWQgZW5zdXJlIGl0cyBBUEkgaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAvLyBzYWZhcmkgYW5kIG9sZCB2ZXJzaW9uIG9mIENocm9tZSBkb2Ugbm90IGV4cG9zZSBTb3VyY2VCdWZmZXIgZ2xvYmFsbHkgc28gY2hlY2tpbmcgU291cmNlQnVmZmVyLnByb3RvdHlwZSBpcyBpbXBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhaXNUeXBlU3VwcG9ydGVkICYmICEhc291cmNlQnVmZmVyVmFsaWRBUEk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzSGxzU3VwcG9ydCgpICYmICEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3J0bXAnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UgPSAoc29ydWNlXykgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKClcIiwgc29ydWNlXyk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHN1cHBvcnRMaXN0Lmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGlmKHN1cHBvcnRMaXN0W2ldLmNoZWNrU3VwcG9ydChzb3VyY2UpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0ID0gKHBsYXlsaXN0XykgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KClcIiwgcGxheWxpc3RfKTtcclxuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHBsYXlsaXN0Xy5sZW5ndGg7IGktLTspIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHBsYXlsaXN0X1tpXTtcclxuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBpdGVtLnNvdXJjZXMubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIHNvdXJjZSA9IGl0ZW0uc291cmNlc1tqXTtcclxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnROYW1lcztcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN1cHBvcnRDaGVja2VyO1xyXG4iLCIvLyBTVEFURVxyXG5leHBvcnQgY29uc3QgU1RBVEVfQlVGRkVSSU5HID0gXCJidWZmZXJpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0lETEUgPSBcImlkbGVcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0NPTVBMRVRFID0gXCJjb21wbGV0ZVwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfUEFVU0VEID0gXCJwYXVzZWRcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1BMQVlJTkcgPSBcInBsYXlpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0VSUk9SID0gXCJlcnJvclwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfTE9BRElORyA9IFwibG9hZGluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfU1RBTExFRCA9IFwic3RhbGxlZFwiO1xyXG5cclxuXHJcbi8vIFBST1ZJREVSXHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9IFwiaHRtbDVcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1dFQlJUQyA9IFwid2VicnRjXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9EQVNIID0gXCJkYXNoXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9ITFMgPSBcImhsc1wiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfUlRNUCA9IFwicnRtcFwiO1xyXG5cclxuLy8gRVZFTlRTXHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XHJcbmV4cG9ydCBjb25zdCBSRUFEWSA9IFwicmVhZHlcIjtcclxuZXhwb3J0IGNvbnN0IERFU1RST1kgPSBcImRlc3Ryb3lcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9IFwic2Vla1wiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9CVUZGRVJfRlVMTCA9IFwiYnVmZmVyRnVsbFwiO1xyXG5leHBvcnQgY29uc3QgRElTUExBWV9DTElDSyA9IFwiZGlzcGxheUNsaWNrXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9IFwibG9hZGVkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NFRUtFRCA9IFwic2Vla2VkXCI7XHJcbmV4cG9ydCBjb25zdCBORVRXT1JLX1VOU1RBQkxFRCA9IFwidW5zdGFibGVOZXR3b3JrXCI7XHJcblxyXG5leHBvcnQgY29uc3QgRVJST1IgPSBcImVycm9yXCI7XHJcblxyXG4vLyBTVEFURSBPRiBQTEFZRVJcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9TVEFURSA9IFwic3RhdGVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9QQVVTRSA9IFwicGF1c2VcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9QTEFZID0gXCJwbGF5XCI7XHJcblxyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9CVUZGRVIgPSBcImJ1ZmZlckNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRSA9IFwidGltZVwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9SQVRFX0NIQU5HRSA9IFwicmF0ZWNoYW5nZVwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9WT0xVTUUgPSBcInZvbHVtZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTVVURSA9IFwibXV0ZVwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9NRVRBID0gXCJtZXRhQ2hhbmdlZFwiO1xyXG4vL2V4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMUyA9IFwicXVhbGl0eUxldmVsQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCA9IFwic291cmNlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9MRVZFTF9DSEFOR0VEID0gXCJjdXJyZW50UXVhbGl0eUxldmVsQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUJBQ0tfUkFURV9DSEFOR0VEID0gXCJwbGF5YmFja1JhdGVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQgPSBcImN1ZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DSEFOR0VEID0gXCJjYXB0aW9uQ2hhbmdlZFwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBJTklUX0VSUk9SID0gMTAwO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fRVJST1IgPSAzMDA7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IgPSAzMDE7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SID0gMzAyO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SID0gMzAzO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0ZJTEVfRVJST1IgPSAzMDQ7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ0FQVElPTl9FUlJPUiA9IDMwNTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfRVJST1IgPSA1MDE7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCA9IDUwMjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiA9IDUwMztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SID0gNTA0O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SID0gNTA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiA9IDUwNjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XID0gNTEwO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5pbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaCB9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9uICx0cmltfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3RyaW5nc1wiO1xyXG5pbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcIi4uL1N1cHBvcnRDaGVja2VyXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIFBsYXlsaXN0IG9yIFNvdXJjZXMuXHJcbiAqIEBwYXJhbVxyXG4gKlxyXG4gKiAqL1xyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCBjdXJyZW50UGxheWxpc3QgPSBbXTtcclxuICAgIGxldCBzdXBwb3J0Q2hlY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGxvYWRlZC5cIik7XHJcblxyXG4gICAgY29uc3QgbWFrZVByZXR0eVNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZV8pe1xyXG4gICAgICAgIGlmICghc291cmNlXyB8fCAhc291cmNlXy5maWxlICYmICEoc291cmNlXy5ob3N0IHx8IHNvdXJjZV8uYXBwbGljYXRpb24gfHwgc291cmNlXy5zdHJlYW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2UgPSBPYmplY3QuYXNzaWduKHt9LCB7ICdkZWZhdWx0JzogZmFsc2UgfSwgc291cmNlXyk7XHJcbiAgICAgICAgc291cmNlLmZpbGUgPSB0cmltKCcnICsgc291cmNlLmZpbGUpO1xyXG5cclxuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS5maWxlID0gc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL3N0cmVhbS9cIiArIHNvdXJjZS5zdHJlYW07XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuaG9zdDtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5hcHBsaWNhdGlvbjtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5zdHJlYW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtaW1ldHlwZVJlZ0V4ID0gL15bXi9dK1xcLyg/OngtKT8oW14vXSspJC87XHJcblxyXG4gICAgICAgIGlmIChtaW1ldHlwZVJlZ0V4LnRlc3Qoc291cmNlLnR5cGUpKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHR5cGUgaXMgZ2l2ZW4gYXMgYSBtaW1ldHlwZVxyXG4gICAgICAgICAgICBzb3VyY2UubWltZVR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBzb3VyY2UudHlwZS5yZXBsYWNlKG1pbWV0eXBlUmVnRXgsICckMScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaXNSdG1wKHNvdXJjZS5maWxlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzV2ViUlRDKHNvdXJjZS5maWxlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3dlYnJ0Yyc7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNEYXNoKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdkYXNoJztcclxuICAgICAgICB9ZWxzZSBpZiAoIXNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gZXh0cmFjdEV4dGVuc2lvbihzb3VyY2UuZmlsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG5vcm1hbGl6ZSB0eXBlc1xyXG4gICAgICAgIHN3aXRjaCAoc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZuZC5hcHBsZS5tcGVndXJsJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2hscyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbTRhJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2FhYyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc21pbCc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZVtrZXldID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzb3VyY2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIHNldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBjb25zdCBwcmV0dGllZFBsYXlsaXN0ID0gKF8uaXNBcnJheShwbGF5bGlzdCkgPyBwbGF5bGlzdCA6IFtwbGF5bGlzdF0pLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShpdGVtLnRyYWNrcykpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RJdGVtID0gT2JqZWN0LmFzc2lnbih7fSx7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcclxuICAgICAgICAgICAgICAgIHRyYWNrczogW11cclxuICAgICAgICAgICAgfSwgaXRlbSApO1xyXG5cclxuICAgICAgICAgICAgaWYoKHBsYXlsaXN0SXRlbS5zb3VyY2VzID09PSBPYmplY3QocGxheWxpc3RJdGVtLnNvdXJjZXMpKSAmJiAhXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlcyldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gaXRlbS5sZXZlbHM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5U291cmNlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSAoZGVmYXVsdFNvdXJjZS50b1N0cmluZygpID09PSAndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzb3VyY2UgZG9lc24ndCBoYXZlIGEgbGFiZWwsIG51bWJlciBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKCFwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0udHlwZStcIi1cIitpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJldHR5U291cmNlID0gbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0Q2hlY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UocHJldHR5U291cmNlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBwcmV0dHlTb3VyY2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gcGxheWxpc3RJdGVtLnNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhIXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZhdWx0IOqwgCDsl4bsnYTrlYwgd2VicnRj6rCAIOyeiOuLpOuptCB3ZWJydGMgZGVmYXVsdCA6IHRydWXroZwg7J6Q64+ZIOyEpOyglVxyXG4gICAgICAgICAgICAvKmxldCBoYXZlRGVmYXVsdCA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLmRlZmF1bHQgPT0gdHJ1ZTt9KTtcclxuICAgICAgICAgICAgbGV0IHdlYnJ0Y1NvdXJjZSA9IFtdO1xyXG4gICAgICAgICAgICBpZighaGF2ZURlZmF1bHQpe1xyXG4gICAgICAgICAgICAgICAgd2VicnRjU291cmNlID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UudHlwZSA9PSBcIndlYnJ0Y1wiO30pO1xyXG4gICAgICAgICAgICAgICAgaWYod2VicnRjU291cmNlKXtcclxuICAgICAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UuZGVmYXVsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0qL1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS50cmFja3MpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RJdGVtLmNhcHRpb25zKSl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5jb25jYXQocGxheWxpc3RJdGVtLmNhcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBwbGF5bGlzdEl0ZW0uY2FwdGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLm1hcChmdW5jdGlvbih0cmFjayl7XHJcbiAgICAgICAgICAgICAgICBpZighdHJhY2sgfHwgIXRyYWNrLmZpbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2tpbmQnOiAnY2FwdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0JzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sIHRyYWNrKTtcclxuICAgICAgICAgICAgfSkuZmlsdGVyKHRyYWNrID0+ICEhdHJhY2spO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBsYXlsaXN0SXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjdXJyZW50UGxheWxpc3QgPSBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgICAgIHJldHVybiBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldFBsYXlsaXN0KCkgXCIsIGN1cnJlbnRQbGF5bGlzdCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5bGlzdDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIC8vV2UgZG8gbm90IHN1cHBvcnQgXCJQTEFZTElTVFwiIG5vdCB5ZXQuIFNvIHRoaXMgcmV0dXJucyBwbGF5bGlzdCBvZiAwLlxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRDdXJyZW50U291cmNlcygpIFwiLCBjdXJyZW50UGxheWxpc3RbMF0uc291cmNlcyk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5bGlzdFswXS5zb3VyY2VzO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJpbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcImFwaS9TdXBwb3J0Q2hlY2tlclwiO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXHJcbiAqIEBwYXJhbVxyXG4gKiAqL1xyXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBzdXBwb3J0Q2hhY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XHJcbiAgICBjb25zdCBQcm92aWRlcnMgPSB7fTtcclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCByZWdpc3RlUHJvdmlkZXIgPSAobmFtZSwgcHJvdmlkZXIpID0+e1xyXG4gICAgICAgIGlmKFByb3ZpZGVyc1tuYW1lXSl7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcclxuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPXtcclxuICAgICAgICBodG1sNTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSHRtbDUnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNScpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiaHRtbDVcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2VicnRjIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcIndlYnJ0Y1wiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXNoIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvRGFzaCcpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiZGFzaFwiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGxzIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcImhsc1wiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydG1wIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcCcpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwicnRtcFwiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQubG9hZFByb3ZpZGVycyA9IChwbGF5bGlzdCkgPT57XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdChwbGF5bGlzdCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRQcm92aWRlcnMoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxyXG4gICAgICAgICAgICBzdXBwb3J0ZWRQcm92aWRlck5hbWVzLmZpbHRlcihmdW5jdGlvbihwcm92aWRlck5hbWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXTtcclxuICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IFByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV0oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmZpbmRCeU5hbWUgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBmaW5kQnlOYW1lKCkgXCIsIG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBQcm92aWRlcnNbbmFtZV07XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UHJvdmlkZXJCeVNvdXJjZSA9IChzb3VyY2UpID0+IHtcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWUgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZ2V0UHJvdmlkZXJCeVNvdXJjZSgpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGF0LmZpbmRCeU5hbWUoc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc1NhbWVQcm92aWRlciA9IChjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgaXNTYW1lUHJvdmlkZXIoKSBcIiwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpICwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSkgKTtcclxuICAgICAgICByZXR1cm4gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpID09PSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjtcclxuIiwiaW1wb3J0IEFQSSBmcm9tICdhcGkvQXBpJztcclxuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSAndXRpbHMvdmFsaWRhdG9yJztcclxuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XHJcbmltcG9ydCBMYSQgZnJvbSAndXRpbHMvbGlrZUEkJztcclxuaW1wb3J0IHtnZXRTY3JpcHRQYXRofSBmcm9tICd1dGlscy93ZWJwYWNrJztcclxuXHJcblxyXG5fX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuc2RrLmpzJyk7XHJcblxyXG4vKipcclxuICogTWFpbiBPdmVuUGxheWVyU0RLIG9iamVjdFxyXG4gKi9cclxuY29uc3QgT3ZlblBsYXllclNESyA9IHdpbmRvdy5PdmVuUGxheWVyU0RLID0ge307XHJcblxyXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblxyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuXHJcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XHJcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSkge1xyXG5cclxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgcGxheWVyIGluc3RhbmNlIGFuZCByZXR1cm4gaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmcgfCBkb20gZWxlbWVudH0gY29udGFpbmVyICBJZCBvZiBjb250YWluZXIgZWxlbWVudCBvciBjb250YWluZXIgZWxlbWVudFxyXG4gKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zICBUaGUgb3B0aW9uc1xyXG4gKi9cclxuT3ZlblBsYXllclNESy5jcmVhdGUgPSBmdW5jdGlvbihjb250YWluZXIsIG9wdGlvbnMpIHtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudChjb250YWluZXIpO1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gQVBJKGNvbnRhaW5lckVsZW1lbnQpO1xyXG4gICAgcGxheWVySW5zdGFuY2UuaW5pdChvcHRpb25zKTtcclxuXHJcbiAgICBwbGF5ZXJMaXN0LnB1c2gocGxheWVySW5zdGFuY2UpO1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgbGlzdC5cclxuICpcclxuICogQHJldHVybiAgICAge2FycmF5fSAgVGhlIHBsYXllciBsaXN0LlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckxpc3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGNvbnRhaW5lciBpZC5cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZ30gIGNvbnRhaW5lcklkICBUaGUgY29udGFpbmVyIGlkZW50aWZpZXJcclxuICogQHJldHVybiAgICAge29iZWplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlDb250YWluZXJJZCA9IGZ1bmN0aW9uKGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBjb250YWluZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBsYXllckxpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBpbmRleC5cclxuICpcclxuICogQHBhcmFtICAgICAge251bWJlcn0gIGluZGV4ICAgVGhlIGluZGV4XHJcbiAqIEByZXR1cm4gICAgIHtvYmplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlJbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcblxyXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBwbGF5ZXJMaXN0W2luZGV4XTtcclxuXHJcbiAgICBpZiAocGxheWVySW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgcGxheWVySWQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtwbGF5ZXJJZH0gIGlkXHJcbiAqIEByZXR1cm4gICAgIHtudWxsfVxyXG4gKi9cclxuT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIgPSBmdW5jdGlvbihwbGF5ZXJJZCkge1xyXG4gICAgY29uc29sZS5sb2cocGxheWVySWQpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBwbGF5ZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgcGxheWVyTGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSB3ZWJydGMgc291cmNlIGZvciBwbGF5ZXIgc291cmNlIHR5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtPYmplY3QgfCBBcnJheX0gIHNvdXJjZSAgIHdlYnJ0YyBzb3VyY2VcclxuICogQHJldHVybiAgICAge0FycmF5fSAgUGxheWVyIHNvdXJjZSBPYmVqY3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdlbmVyYXRlV2VicnRjVXJscyA9IGZ1bmN0aW9uKHNvdXJjZXMpIHtcclxuICAgIHJldHVybiAoXy5pc0FycmF5KHNvdXJjZXMpID8gc291cmNlcyA6IFtzb3VyY2VzXSkubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpe1xyXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIGlzV2ViUlRDKHNvdXJjZS5ob3N0KSAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XHJcbiAgICAgICAgICAgIHJldHVybiB7ZmlsZSA6IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9cIiArIHNvdXJjZS5zdHJlYW0sIHR5cGUgOiBcIndlYnJ0Y1wiLCBsYWJlbCA6IHNvdXJjZS5sYWJlbCA/IHNvdXJjZS5sYWJlbCA6IFwid2VicnRjLVwiKyhpbmRleCsxKSB9O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgT3ZlblBsYXllclNESztcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIEl0IHdhcyByZXBsYWNlIGpxdWVyeSdzIHNlbGVjdG9yLiBJdCBPZnRlbiB1c2VkIGJ5IE92ZW5UZW1wbGF0ZS4gKC92aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUuanMpXHJcbiAqIEBwYXJhbSAgIHNlbGVjdG9yT3JFbGVtZW50ICBzdHJpbmcgb3IgZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IExhJCA9IGZ1bmN0aW9uKHNlbGVjdG9yT3JFbGVtZW50KXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGNvbnN0IHJldHVybk5vZGUgPSBmdW5jdGlvbigkZWxlbWVudCAsIHNlbGVjdG9yKXtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSAgJGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgaWYobm9kZUxpc3QubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCAkZWxlbWVudCA9IFwiXCI7XHJcblxyXG4gICAgaWYoIF8uZXZlcnkoc2VsZWN0b3JPckVsZW1lbnQsIGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBfLmlzRWxlbWVudChpdGVtKX0pKXtcclxuICAgICAgICAkZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xyXG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwiZG9jdW1lbnRcIil7XHJcbiAgICAgICAgJGVsZW1lbnQgPSBkb2N1bWVudDtcclxuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcIndpbmRvd1wiKXtcclxuICAgICAgICAkZWxlbWVudCA9IHdpbmRvdztcclxuICAgIH1lbHNle1xyXG4gICAgICAgICRlbGVtZW50ID0gcmV0dXJuTm9kZShkb2N1bWVudCwgc2VsZWN0b3JPckVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZighJGVsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZmluZCA9IChzZWxlY3RvcikgPT57XHJcbiAgICAgICAgcmV0dXJuIExhJChyZXR1cm5Ob2RlKCRlbGVtZW50LCBzZWxlY3RvcikpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNzcyA9IChuYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hZGRDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9ICRlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGlmKGNsYXNzTmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIFwiICsgbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2xhc3MgPSAobmFtZSkgPT57XHJcbiAgICAgICAgaWYgKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSA9ICRlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBuYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQXR0cmlidXRlID0gKGF0dHJOYW1lKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zaG93ID0gKCkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGlkZSA9ICgpID0+e1xyXG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWxDb2RlKSA9PntcclxuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgKz0gaHRtbENvZGU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQudGV4dCA9ICh0ZXh0KSA9PiB7IC8vSUU4K1xyXG4gICAgICAgIGlmKHRleHQpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC50ZXh0Q29udGVudDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGFzQ2xhc3MgPSAobmFtZSkgPT4geyAvL0lFOCtcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgbmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoJGVsZW1lbnQubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzID0gKCR0YXJnZXRFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50ID09PSAkdGFyZ2V0RWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5vZmZzZXQgPSAoKSA9PnsgICAgLy9JRTgrXHJcbiAgICAgICAgdmFyIHJlY3QgPSAkZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wLFxyXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnRcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQud2lkdGggPSAoKSA9PiB7ICAgIC8vSUU4K1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5oZWlnaHQgPSAoKSA9PiB7ICAgLy9JRTgrXHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hdHRyID0gKGF0dHIpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlcGxhY2UgPSAoaHRtbCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LnJlcGxhY2VXaXRoKGh0bWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFwcGVuZCA9IChodG1sKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQuYXBwZW5kQ2hpbGQoaHRtbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlbW92ZUNoaWxkID0gKCkgPT4ge1xyXG4gICAgICAgIHdoaWxlICgkZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2hpbGQoJGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY2xvc2VzdCA9IChzZWxlY3RvclN0cmluZykgPT4ge1xyXG4gICAgICAgIGxldCBjbG9zZXN0RWxlbWVudCA9ICRlbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JTdHJpbmcpO1xyXG4gICAgICAgIGlmKGNsb3Nlc3RFbGVtZW50KXtcclxuICAgICAgICAgICAgcmV0dXJuIExhJChjbG9zZXN0RWxlbWVudCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMYSQ7XHJcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDI0Li5cbiAqL1xuXG5jb25zdCBsb2dnZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgcHJldkNvbnNvbGVMb2cgPSBudWxsO1xuXG4gICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0ge2xvZyA6IHdpbmRvd1snY29uc29sZSddWydsb2cnXX07XG5cbiAgICB0aGF0LmVuYWJsZSA9ICgpID0+e1xuICAgICAgICBpZihwcmV2Q29uc29sZUxvZyA9PSBudWxsKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBwcmV2Q29uc29sZUxvZztcbiAgICB9O1xuICAgIHRoYXQuZGlzYWJsZSA9ICgpID0+e1xuICAgICAgICBwcmV2Q29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBmdW5jdGlvbigpe307XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0gbnVsbDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjsiLCJpbXBvcnQgXyBmcm9tICcuL3VuZGVyc2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJpbShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbn1cblxuLyoqXG4gKiBleHRyYWN0RXh0ZW5zaW9uXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZ30gcGF0aCBmb3IgdXJsXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgRXh0ZW5zaW9uXG4gKi9cbmV4cG9ydCBjb25zdCBleHRyYWN0RXh0ZW5zaW9uID0gZnVuY3Rpb24ocGF0aCkge1xuICAgIGlmKCFwYXRoIHx8IHBhdGguc3Vic3RyKDAsNCk9PSdydG1wJykge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpIHtcbiAgICAgICAgbGV0IGV4dGVuc2lvbiA9IFwiXCI7XG4gICAgICAgIGlmICgoL1soLF1mb3JtYXQ9bXBkLS9pKS50ZXN0KHBhdGgpKSB7XG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbXBkJztcbiAgICAgICAgfWVsc2UgaWYgKCgvWygsXWZvcm1hdD1tM3U4LS9pKS50ZXN0KHBhdGgpKSB7XG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbTN1OCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgICB9XG5cbiAgICBsZXQgYXp1cmVkRm9ybWF0ID0gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpO1xuICAgIGlmKGF6dXJlZEZvcm1hdCkge1xuICAgICAgICByZXR1cm4gYXp1cmVkRm9ybWF0O1xuICAgIH1cbiAgICBwYXRoID0gcGF0aC5zcGxpdCgnPycpWzBdLnNwbGl0KCcjJylbMF07XG4gICAgaWYocGF0aC5sYXN0SW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy4nKSArIDEsIHBhdGgubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG59O1xuXG5cbi8qKlxuICogbmF0dXJhbEhtc1xuICpcbiAqIEBwYXJhbSAgICAgIHtudW1iZXIgfCBzdHJpbmd9ICBzZWNvbmQgIFRoZSBzZWNvbmRcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBmb3JtYXR0ZWQgU3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuYXR1cmFsSG1zKHNlY29uZCkge1xuICAgIGxldCBzZWNOdW0gPSBwYXJzZUludChzZWNvbmQsIDEwKTtcbiAgICBpZighc2Vjb25kKXtcbiAgICAgICAgcmV0dXJuIFwiLS06LS1cIjtcbiAgICB9XG4gICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xuICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjTnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuICAgIGxldCBzZWNvbmRzID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcblxuICAgIGlmIChob3VycyA+IDApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cblxuICAgIGlmIChob3VycyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH1cbn0iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjkuMVxyXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcclxuLy8gICAgIChjKSAyMDA5LTIwMTggSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcclxuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiFmdW5jdGlvbigpe3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmJiZzZWxmfHxcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsJiZnbG9iYWx8fHRoaXN8fHt9LHI9bi5fLGU9QXJyYXkucHJvdG90eXBlLG89T2JqZWN0LnByb3RvdHlwZSxzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2w/U3ltYm9sLnByb3RvdHlwZTpudWxsLHU9ZS5wdXNoLGM9ZS5zbGljZSxwPW8udG9TdHJpbmcsaT1vLmhhc093blByb3BlcnR5LHQ9QXJyYXkuaXNBcnJheSxhPU9iamVjdC5rZXlzLGw9T2JqZWN0LmNyZWF0ZSxmPWZ1bmN0aW9uKCl7fSxoPWZ1bmN0aW9uKG4pe3JldHVybiBuIGluc3RhbmNlb2YgaD9uOnRoaXMgaW5zdGFuY2VvZiBoP3ZvaWQodGhpcy5fd3JhcHBlZD1uKTpuZXcgaChuKX07XCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHN8fGV4cG9ydHMubm9kZVR5cGU/bi5fPWg6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGUmJm1vZHVsZS5leHBvcnRzJiYoZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1oKSxleHBvcnRzLl89aCksaC5WRVJTSU9OPVwiMS45LjFcIjt2YXIgdix5PWZ1bmN0aW9uKHUsaSxuKXtpZih2b2lkIDA9PT1pKXJldHVybiB1O3N3aXRjaChudWxsPT1uPzM6bil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdS5jYWxsKGksbil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLHQpe3JldHVybiB1LmNhbGwoaSxuLHIsdCl9O2Nhc2UgNDpyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHUuY2FsbChpLG4scix0LGUpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdS5hcHBseShpLGFyZ3VtZW50cyl9fSxkPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5pdGVyYXRlZSE9PXY/aC5pdGVyYXRlZShuLHIpOm51bGw9PW4/aC5pZGVudGl0eTpoLmlzRnVuY3Rpb24obik/eShuLHIsdCk6aC5pc09iamVjdChuKSYmIWguaXNBcnJheShuKT9oLm1hdGNoZXIobik6aC5wcm9wZXJ0eShuKX07aC5pdGVyYXRlZT12PWZ1bmN0aW9uKG4scil7cmV0dXJuIGQobixyLDEvMCl9O3ZhciBnPWZ1bmN0aW9uKHUsaSl7cmV0dXJuIGk9bnVsbD09aT91Lmxlbmd0aC0xOitpLGZ1bmN0aW9uKCl7Zm9yKHZhciBuPU1hdGgubWF4KGFyZ3VtZW50cy5sZW5ndGgtaSwwKSxyPUFycmF5KG4pLHQ9MDt0PG47dCsrKXJbdF09YXJndW1lbnRzW3QraV07c3dpdGNoKGkpe2Nhc2UgMDpyZXR1cm4gdS5jYWxsKHRoaXMscik7Y2FzZSAxOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0scik7Y2FzZSAyOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdLHIpfXZhciBlPUFycmF5KGkrMSk7Zm9yKHQ9MDt0PGk7dCsrKWVbdF09YXJndW1lbnRzW3RdO3JldHVybiBlW2ldPXIsdS5hcHBseSh0aGlzLGUpfX0sbT1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm57fTtpZihsKXJldHVybiBsKG4pO2YucHJvdG90eXBlPW47dmFyIHI9bmV3IGY7cmV0dXJuIGYucHJvdG90eXBlPW51bGwscn0sYj1mdW5jdGlvbihyKXtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/dm9pZCAwOm5bcl19fSxqPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGwhPW4mJmkuY2FsbChuLHIpfSx4PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXtpZihudWxsPT1uKXJldHVybjtuPW5bcltlXV19cmV0dXJuIHQ/bjp2b2lkIDB9LF89TWF0aC5wb3coMiw1MyktMSxBPWIoXCJsZW5ndGhcIiksdz1mdW5jdGlvbihuKXt2YXIgcj1BKG4pO3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiByJiYwPD1yJiZyPD1ffTtoLmVhY2g9aC5mb3JFYWNoPWZ1bmN0aW9uKG4scix0KXt2YXIgZSx1O2lmKHI9eShyLHQpLHcobikpZm9yKGU9MCx1PW4ubGVuZ3RoO2U8dTtlKyspcihuW2VdLGUsbik7ZWxzZXt2YXIgaT1oLmtleXMobik7Zm9yKGU9MCx1PWkubGVuZ3RoO2U8dTtlKyspcihuW2lbZV1dLGlbZV0sbil9cmV0dXJuIG59LGgubWFwPWguY29sbGVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9QXJyYXkodSksbz0wO288dTtvKyspe3ZhciBhPWU/ZVtvXTpvO2lbb109cihuW2FdLGEsbil9cmV0dXJuIGl9O3ZhciBPPWZ1bmN0aW9uKGMpe3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0zPD1hcmd1bWVudHMubGVuZ3RoO3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0hdyhuKSYmaC5rZXlzKG4pLGk9KHV8fG4pLmxlbmd0aCxvPTA8Yz8wOmktMTtmb3IoZXx8KHQ9blt1P3Vbb106b10sbys9Yyk7MDw9byYmbzxpO28rPWMpe3ZhciBhPXU/dVtvXTpvO3Q9cih0LG5bYV0sYSxuKX1yZXR1cm4gdH0obix5KHIsZSw0KSx0LHUpfX07aC5yZWR1Y2U9aC5mb2xkbD1oLmluamVjdD1PKDEpLGgucmVkdWNlUmlnaHQ9aC5mb2xkcj1PKC0xKSxoLmZpbmQ9aC5kZXRlY3Q9ZnVuY3Rpb24obixyLHQpe3ZhciBlPSh3KG4pP2guZmluZEluZGV4OmguZmluZEtleSkobixyLHQpO2lmKHZvaWQgMCE9PWUmJi0xIT09ZSlyZXR1cm4gbltlXX0saC5maWx0ZXI9aC5zZWxlY3Q9ZnVuY3Rpb24obixlLHIpe3ZhciB1PVtdO3JldHVybiBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7ZShuLHIsdCkmJnUucHVzaChuKX0pLHV9LGgucmVqZWN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5maWx0ZXIobixoLm5lZ2F0ZShkKHIpKSx0KX0saC5ldmVyeT1oLmFsbD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZighcihuW29dLG8sbikpcmV0dXJuITF9cmV0dXJuITB9LGguc29tZT1oLmFueT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZihyKG5bb10sbyxuKSlyZXR1cm4hMH1yZXR1cm4hMX0saC5jb250YWlucz1oLmluY2x1ZGVzPWguaW5jbHVkZT1mdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLChcIm51bWJlclwiIT10eXBlb2YgdHx8ZSkmJih0PTApLDA8PWguaW5kZXhPZihuLHIsdCl9LGguaW52b2tlPWcoZnVuY3Rpb24obix0LGUpe3ZhciB1LGk7cmV0dXJuIGguaXNGdW5jdGlvbih0KT9pPXQ6aC5pc0FycmF5KHQpJiYodT10LnNsaWNlKDAsLTEpLHQ9dFt0Lmxlbmd0aC0xXSksaC5tYXAobixmdW5jdGlvbihuKXt2YXIgcj1pO2lmKCFyKXtpZih1JiZ1Lmxlbmd0aCYmKG49eChuLHUpKSxudWxsPT1uKXJldHVybjtyPW5bdF19cmV0dXJuIG51bGw9PXI/cjpyLmFwcGx5KG4sZSl9KX0pLGgucGx1Y2s9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5tYXAobixoLnByb3BlcnR5KHIpKX0saC53aGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbHRlcihuLGgubWF0Y2hlcihyKSl9LGguZmluZFdoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmluZChuLGgubWF0Y2hlcihyKSl9LGgubWF4PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9LTEvMCxvPS0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmaTx0JiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXt1PWUobixyLHQpLChvPHV8fHU9PT0tMS8wJiZpPT09LTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLm1pbj1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPTEvMCxvPTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZ0PGkmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpeygodT1lKG4scix0KSk8b3x8dT09PTEvMCYmaT09PTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLnNodWZmbGU9ZnVuY3Rpb24obil7cmV0dXJuIGguc2FtcGxlKG4sMS8wKX0saC5zYW1wbGU9ZnVuY3Rpb24obixyLHQpe2lmKG51bGw9PXJ8fHQpcmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSxuW2gucmFuZG9tKG4ubGVuZ3RoLTEpXTt2YXIgZT13KG4pP2guY2xvbmUobik6aC52YWx1ZXMobiksdT1BKGUpO3I9TWF0aC5tYXgoTWF0aC5taW4ocix1KSwwKTtmb3IodmFyIGk9dS0xLG89MDtvPHI7bysrKXt2YXIgYT1oLnJhbmRvbShvLGkpLGM9ZVtvXTtlW29dPWVbYV0sZVthXT1jfXJldHVybiBlLnNsaWNlKDAscil9LGguc29ydEJ5PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT0wO3JldHVybiBlPWQoZSxyKSxoLnBsdWNrKGgubWFwKG4sZnVuY3Rpb24obixyLHQpe3JldHVybnt2YWx1ZTpuLGluZGV4OnUrKyxjcml0ZXJpYTplKG4scix0KX19KS5zb3J0KGZ1bmN0aW9uKG4scil7dmFyIHQ9bi5jcml0ZXJpYSxlPXIuY3JpdGVyaWE7aWYodCE9PWUpe2lmKGU8dHx8dm9pZCAwPT09dClyZXR1cm4gMTtpZih0PGV8fHZvaWQgMD09PWUpcmV0dXJuLTF9cmV0dXJuIG4uaW5kZXgtci5pbmRleH0pLFwidmFsdWVcIil9O3ZhciBrPWZ1bmN0aW9uKG8scil7cmV0dXJuIGZ1bmN0aW9uKGUsdSxuKXt2YXIgaT1yP1tbXSxbXV06e307cmV0dXJuIHU9ZCh1LG4pLGguZWFjaChlLGZ1bmN0aW9uKG4scil7dmFyIHQ9dShuLHIsZSk7byhpLG4sdCl9KSxpfX07aC5ncm91cEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdLnB1c2gocik6blt0XT1bcl19KSxoLmluZGV4Qnk9ayhmdW5jdGlvbihuLHIsdCl7blt0XT1yfSksaC5jb3VudEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdKys6blt0XT0xfSk7dmFyIFM9L1teXFx1ZDgwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkYmZmXVtcXHVkYzAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRmZmZdL2c7aC50b0FycmF5PWZ1bmN0aW9uKG4pe3JldHVybiBuP2guaXNBcnJheShuKT9jLmNhbGwobik6aC5pc1N0cmluZyhuKT9uLm1hdGNoKFMpOncobik/aC5tYXAobixoLmlkZW50aXR5KTpoLnZhbHVlcyhuKTpbXX0saC5zaXplPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPzA6dyhuKT9uLmxlbmd0aDpoLmtleXMobikubGVuZ3RofSxoLnBhcnRpdGlvbj1rKGZ1bmN0aW9uKG4scix0KXtuW3Q/MDoxXS5wdXNoKHIpfSwhMCksaC5maXJzdD1oLmhlYWQ9aC50YWtlPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bMF06aC5pbml0aWFsKG4sbi5sZW5ndGgtcil9LGguaW5pdGlhbD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLDAsTWF0aC5tYXgoMCxuLmxlbmd0aC0obnVsbD09cnx8dD8xOnIpKSl9LGgubGFzdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uW24ubGVuZ3RoLTFdOmgucmVzdChuLE1hdGgubWF4KDAsbi5sZW5ndGgtcikpfSxoLnJlc3Q9aC50YWlsPWguZHJvcD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLG51bGw9PXJ8fHQ/MTpyKX0saC5jb21wYWN0PWZ1bmN0aW9uKG4pe3JldHVybiBoLmZpbHRlcihuLEJvb2xlYW4pfTt2YXIgTT1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KGU9ZXx8W10pLmxlbmd0aCxpPTAsbz1BKG4pO2k8bztpKyspe3ZhciBhPW5baV07aWYodyhhKSYmKGguaXNBcnJheShhKXx8aC5pc0FyZ3VtZW50cyhhKSkpaWYocilmb3IodmFyIGM9MCxsPWEubGVuZ3RoO2M8bDspZVt1KytdPWFbYysrXTtlbHNlIE0oYSxyLHQsZSksdT1lLmxlbmd0aDtlbHNlIHR8fChlW3UrK109YSl9cmV0dXJuIGV9O2guZmxhdHRlbj1mdW5jdGlvbihuLHIpe3JldHVybiBNKG4sciwhMSl9LGgud2l0aG91dD1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIGguZGlmZmVyZW5jZShuLHIpfSksaC51bmlxPWgudW5pcXVlPWZ1bmN0aW9uKG4scix0LGUpe2guaXNCb29sZWFuKHIpfHwoZT10LHQ9cixyPSExKSxudWxsIT10JiYodD1kKHQsZSkpO2Zvcih2YXIgdT1bXSxpPVtdLG89MCxhPUEobik7bzxhO28rKyl7dmFyIGM9bltvXSxsPXQ/dChjLG8sbik6YztyJiYhdD8obyYmaT09PWx8fHUucHVzaChjKSxpPWwpOnQ/aC5jb250YWlucyhpLGwpfHwoaS5wdXNoKGwpLHUucHVzaChjKSk6aC5jb250YWlucyh1LGMpfHx1LnB1c2goYyl9cmV0dXJuIHV9LGgudW5pb249ZyhmdW5jdGlvbihuKXtyZXR1cm4gaC51bmlxKE0obiwhMCwhMCkpfSksaC5pbnRlcnNlY3Rpb249ZnVuY3Rpb24obil7Zm9yKHZhciByPVtdLHQ9YXJndW1lbnRzLmxlbmd0aCxlPTAsdT1BKG4pO2U8dTtlKyspe3ZhciBpPW5bZV07aWYoIWguY29udGFpbnMocixpKSl7dmFyIG87Zm9yKG89MTtvPHQmJmguY29udGFpbnMoYXJndW1lbnRzW29dLGkpO28rKyk7bz09PXQmJnIucHVzaChpKX19cmV0dXJuIHJ9LGguZGlmZmVyZW5jZT1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIHI9TShyLCEwLCEwKSxoLmZpbHRlcihuLGZ1bmN0aW9uKG4pe3JldHVybiFoLmNvbnRhaW5zKHIsbil9KX0pLGgudW56aXA9ZnVuY3Rpb24obil7Zm9yKHZhciByPW4mJmgubWF4KG4sQSkubGVuZ3RofHwwLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1oLnBsdWNrKG4sZSk7cmV0dXJuIHR9LGguemlwPWcoaC51bnppcCksaC5vYmplY3Q9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9e30sZT0wLHU9QShuKTtlPHU7ZSsrKXI/dFtuW2VdXT1yW2VdOnRbbltlXVswXV09bltlXVsxXTtyZXR1cm4gdH07dmFyIEY9ZnVuY3Rpb24oaSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9QShuKSx1PTA8aT8wOmUtMTswPD11JiZ1PGU7dSs9aSlpZihyKG5bdV0sdSxuKSlyZXR1cm4gdTtyZXR1cm4tMX19O2guZmluZEluZGV4PUYoMSksaC5maW5kTGFzdEluZGV4PUYoLTEpLGguc29ydGVkSW5kZXg9ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PSh0PWQodCxlLDEpKShyKSxpPTAsbz1BKG4pO2k8bzspe3ZhciBhPU1hdGguZmxvb3IoKGkrbykvMik7dChuW2FdKTx1P2k9YSsxOm89YX1yZXR1cm4gaX07dmFyIEU9ZnVuY3Rpb24oaSxvLGEpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7dmFyIGU9MCx1PUEobik7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpMDxpP2U9MDw9dD90Ok1hdGgubWF4KHQrdSxlKTp1PTA8PXQ/TWF0aC5taW4odCsxLHUpOnQrdSsxO2Vsc2UgaWYoYSYmdCYmdSlyZXR1cm4gblt0PWEobixyKV09PT1yP3Q6LTE7aWYociE9cilyZXR1cm4gMDw9KHQ9byhjLmNhbGwobixlLHUpLGguaXNOYU4pKT90K2U6LTE7Zm9yKHQ9MDxpP2U6dS0xOzA8PXQmJnQ8dTt0Kz1pKWlmKG5bdF09PT1yKXJldHVybiB0O3JldHVybi0xfX07aC5pbmRleE9mPUUoMSxoLmZpbmRJbmRleCxoLnNvcnRlZEluZGV4KSxoLmxhc3RJbmRleE9mPUUoLTEsaC5maW5kTGFzdEluZGV4KSxoLnJhbmdlPWZ1bmN0aW9uKG4scix0KXtudWxsPT1yJiYocj1ufHwwLG49MCksdHx8KHQ9cjxuPy0xOjEpO2Zvcih2YXIgZT1NYXRoLm1heChNYXRoLmNlaWwoKHItbikvdCksMCksdT1BcnJheShlKSxpPTA7aTxlO2krKyxuKz10KXVbaV09bjtyZXR1cm4gdX0saC5jaHVuaz1mdW5jdGlvbihuLHIpe2lmKG51bGw9PXJ8fHI8MSlyZXR1cm5bXTtmb3IodmFyIHQ9W10sZT0wLHU9bi5sZW5ndGg7ZTx1Oyl0LnB1c2goYy5jYWxsKG4sZSxlKz1yKSk7cmV0dXJuIHR9O3ZhciBOPWZ1bmN0aW9uKG4scix0LGUsdSl7aWYoIShlIGluc3RhbmNlb2YgcikpcmV0dXJuIG4uYXBwbHkodCx1KTt2YXIgaT1tKG4ucHJvdG90eXBlKSxvPW4uYXBwbHkoaSx1KTtyZXR1cm4gaC5pc09iamVjdChvKT9vOml9O2guYmluZD1nKGZ1bmN0aW9uKHIsdCxlKXtpZighaC5pc0Z1bmN0aW9uKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb25cIik7dmFyIHU9ZyhmdW5jdGlvbihuKXtyZXR1cm4gTihyLHUsdCx0aGlzLGUuY29uY2F0KG4pKX0pO3JldHVybiB1fSksaC5wYXJ0aWFsPWcoZnVuY3Rpb24odSxpKXt2YXIgbz1oLnBhcnRpYWwucGxhY2Vob2xkZXIsYT1mdW5jdGlvbigpe2Zvcih2YXIgbj0wLHI9aS5sZW5ndGgsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWlbZV09PT1vP2FyZ3VtZW50c1tuKytdOmlbZV07Zm9yKDtuPGFyZ3VtZW50cy5sZW5ndGg7KXQucHVzaChhcmd1bWVudHNbbisrXSk7cmV0dXJuIE4odSxhLHRoaXMsdGhpcyx0KX07cmV0dXJuIGF9KSwoaC5wYXJ0aWFsLnBsYWNlaG9sZGVyPWgpLmJpbmRBbGw9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PShyPU0ociwhMSwhMSkpLmxlbmd0aDtpZih0PDEpdGhyb3cgbmV3IEVycm9yKFwiYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lc1wiKTtmb3IoO3QtLTspe3ZhciBlPXJbdF07bltlXT1oLmJpbmQobltlXSxuKX19KSxoLm1lbW9pemU9ZnVuY3Rpb24oZSx1KXt2YXIgaT1mdW5jdGlvbihuKXt2YXIgcj1pLmNhY2hlLHQ9XCJcIisodT91LmFwcGx5KHRoaXMsYXJndW1lbnRzKTpuKTtyZXR1cm4gaihyLHQpfHwoclt0XT1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksclt0XX07cmV0dXJuIGkuY2FjaGU9e30saX0saC5kZWxheT1nKGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBuLmFwcGx5KG51bGwsdCl9LHIpfSksaC5kZWZlcj1oLnBhcnRpYWwoaC5kZWxheSxoLDEpLGgudGhyb3R0bGU9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYSxjLGw9MDt1fHwodT17fSk7dmFyIGY9ZnVuY3Rpb24oKXtsPSExPT09dS5sZWFkaW5nPzA6aC5ub3coKSxpPW51bGwsYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKX0sbj1mdW5jdGlvbigpe3ZhciBuPWgubm93KCk7bHx8ITEhPT11LmxlYWRpbmd8fChsPW4pO3ZhciByPWUtKG4tbCk7cmV0dXJuIG89dGhpcyxhPWFyZ3VtZW50cyxyPD0wfHxlPHI/KGkmJihjbGVhclRpbWVvdXQoaSksaT1udWxsKSxsPW4sYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKSk6aXx8ITE9PT11LnRyYWlsaW5nfHwoaT1zZXRUaW1lb3V0KGYscikpLGN9O3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxsPTAsaT1vPWE9bnVsbH0sbn0saC5kZWJvdW5jZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhPWZ1bmN0aW9uKG4scil7aT1udWxsLHImJihvPXQuYXBwbHkobixyKSl9LG49ZyhmdW5jdGlvbihuKXtpZihpJiZjbGVhclRpbWVvdXQoaSksdSl7dmFyIHI9IWk7aT1zZXRUaW1lb3V0KGEsZSksciYmKG89dC5hcHBseSh0aGlzLG4pKX1lbHNlIGk9aC5kZWxheShhLGUsdGhpcyxuKTtyZXR1cm4gb30pO3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxpPW51bGx9LG59LGgud3JhcD1mdW5jdGlvbihuLHIpe3JldHVybiBoLnBhcnRpYWwocixuKX0saC5uZWdhdGU9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5jb21wb3NlPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLGU9dC5sZW5ndGgtMTtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIG49ZSxyPXRbZV0uYXBwbHkodGhpcyxhcmd1bWVudHMpO24tLTspcj10W25dLmNhbGwodGhpcyxyKTtyZXR1cm4gcn19LGguYWZ0ZXI9ZnVuY3Rpb24obixyKXtyZXR1cm4gZnVuY3Rpb24oKXtpZigtLW48MSlyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmJlZm9yZT1mdW5jdGlvbihuLHIpe3ZhciB0O3JldHVybiBmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHQ9ci5hcHBseSh0aGlzLGFyZ3VtZW50cykpLG48PTEmJihyPW51bGwpLHR9fSxoLm9uY2U9aC5wYXJ0aWFsKGguYmVmb3JlLDIpLGgucmVzdEFyZ3VtZW50cz1nO3ZhciBJPSF7dG9TdHJpbmc6bnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoXCJ0b1N0cmluZ1wiKSxUPVtcInZhbHVlT2ZcIixcImlzUHJvdG90eXBlT2ZcIixcInRvU3RyaW5nXCIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFwiaGFzT3duUHJvcGVydHlcIixcInRvTG9jYWxlU3RyaW5nXCJdLEI9ZnVuY3Rpb24obixyKXt2YXIgdD1ULmxlbmd0aCxlPW4uY29uc3RydWN0b3IsdT1oLmlzRnVuY3Rpb24oZSkmJmUucHJvdG90eXBlfHxvLGk9XCJjb25zdHJ1Y3RvclwiO2ZvcihqKG4saSkmJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKTt0LS07KShpPVRbdF0paW4gbiYmbltpXSE9PXVbaV0mJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKX07aC5rZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO2lmKGEpcmV0dXJuIGEobik7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paihuLHQpJiZyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLmFsbEtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107dmFyIHI9W107Zm9yKHZhciB0IGluIG4pci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC52YWx1ZXM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1uW3JbdV1dO3JldHVybiBlfSxoLm1hcE9iamVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPWgua2V5cyhuKSx1PWUubGVuZ3RoLGk9e30sbz0wO288dTtvKyspe3ZhciBhPWVbb107aVthXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX0saC5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPVtyW3VdLG5bclt1XV1dO3JldHVybiBlfSxoLmludmVydD1mdW5jdGlvbihuKXtmb3IodmFyIHI9e30sdD1oLmtleXMobiksZT0wLHU9dC5sZW5ndGg7ZTx1O2UrKylyW25bdFtlXV1dPXRbZV07cmV0dXJuIHJ9LGguZnVuY3Rpb25zPWgubWV0aG9kcz1mdW5jdGlvbihuKXt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbiloLmlzRnVuY3Rpb24oblt0XSkmJnIucHVzaCh0KTtyZXR1cm4gci5zb3J0KCl9O3ZhciBSPWZ1bmN0aW9uKGMsbCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg7aWYobCYmKG49T2JqZWN0KG4pKSxyPDJ8fG51bGw9PW4pcmV0dXJuIG47Zm9yKHZhciB0PTE7dDxyO3QrKylmb3IodmFyIGU9YXJndW1lbnRzW3RdLHU9YyhlKSxpPXUubGVuZ3RoLG89MDtvPGk7bysrKXt2YXIgYT11W29dO2wmJnZvaWQgMCE9PW5bYV18fChuW2FdPWVbYV0pfXJldHVybiBufX07aC5leHRlbmQ9UihoLmFsbEtleXMpLGguZXh0ZW5kT3duPWguYXNzaWduPVIoaC5rZXlzKSxoLmZpbmRLZXk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZSx1PWgua2V5cyhuKSxpPTAsbz11Lmxlbmd0aDtpPG87aSsrKWlmKHIobltlPXVbaV1dLGUsbikpcmV0dXJuIGV9O3ZhciBxLEssej1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIHIgaW4gdH07aC5waWNrPWcoZnVuY3Rpb24obixyKXt2YXIgdD17fSxlPXJbMF07aWYobnVsbD09bilyZXR1cm4gdDtoLmlzRnVuY3Rpb24oZSk/KDE8ci5sZW5ndGgmJihlPXkoZSxyWzFdKSkscj1oLmFsbEtleXMobikpOihlPXoscj1NKHIsITEsITEpLG49T2JqZWN0KG4pKTtmb3IodmFyIHU9MCxpPXIubGVuZ3RoO3U8aTt1Kyspe3ZhciBvPXJbdV0sYT1uW29dO2UoYSxvLG4pJiYodFtvXT1hKX1yZXR1cm4gdH0pLGgub21pdD1nKGZ1bmN0aW9uKG4sdCl7dmFyIHIsZT10WzBdO3JldHVybiBoLmlzRnVuY3Rpb24oZSk/KGU9aC5uZWdhdGUoZSksMTx0Lmxlbmd0aCYmKHI9dFsxXSkpOih0PWgubWFwKE0odCwhMSwhMSksU3RyaW5nKSxlPWZ1bmN0aW9uKG4scil7cmV0dXJuIWguY29udGFpbnModCxyKX0pLGgucGljayhuLGUscil9KSxoLmRlZmF1bHRzPVIoaC5hbGxLZXlzLCEwKSxoLmNyZWF0ZT1mdW5jdGlvbihuLHIpe3ZhciB0PW0obik7cmV0dXJuIHImJmguZXh0ZW5kT3duKHQsciksdH0saC5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc09iamVjdChuKT9oLmlzQXJyYXkobik/bi5zbGljZSgpOmguZXh0ZW5kKHt9LG4pOm59LGgudGFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIHIobiksbn0saC5pc01hdGNoPWZ1bmN0aW9uKG4scil7dmFyIHQ9aC5rZXlzKHIpLGU9dC5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3IodmFyIHU9T2JqZWN0KG4pLGk9MDtpPGU7aSsrKXt2YXIgbz10W2ldO2lmKHJbb10hPT11W29dfHwhKG8gaW4gdSkpcmV0dXJuITF9cmV0dXJuITB9LHE9ZnVuY3Rpb24obixyLHQsZSl7aWYobj09PXIpcmV0dXJuIDAhPT1ufHwxL249PTEvcjtpZihudWxsPT1ufHxudWxsPT1yKXJldHVybiExO2lmKG4hPW4pcmV0dXJuIHIhPXI7dmFyIHU9dHlwZW9mIG47cmV0dXJuKFwiZnVuY3Rpb25cIj09PXV8fFwib2JqZWN0XCI9PT11fHxcIm9iamVjdFwiPT10eXBlb2YgcikmJksobixyLHQsZSl9LEs9ZnVuY3Rpb24obixyLHQsZSl7biBpbnN0YW5jZW9mIGgmJihuPW4uX3dyYXBwZWQpLHIgaW5zdGFuY2VvZiBoJiYocj1yLl93cmFwcGVkKTt2YXIgdT1wLmNhbGwobik7aWYodSE9PXAuY2FsbChyKSlyZXR1cm4hMTtzd2l0Y2godSl7Y2FzZVwiW29iamVjdCBSZWdFeHBdXCI6Y2FzZVwiW29iamVjdCBTdHJpbmddXCI6cmV0dXJuXCJcIituPT1cIlwiK3I7Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cmV0dXJuK24hPStuPytyIT0rcjowPT0rbj8xLytuPT0xL3I6K249PStyO2Nhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6cmV0dXJuK249PStyO2Nhc2VcIltvYmplY3QgU3ltYm9sXVwiOnJldHVybiBzLnZhbHVlT2YuY2FsbChuKT09PXMudmFsdWVPZi5jYWxsKHIpfXZhciBpPVwiW29iamVjdCBBcnJheV1cIj09PXU7aWYoIWkpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBufHxcIm9iamVjdFwiIT10eXBlb2YgcilyZXR1cm4hMTt2YXIgbz1uLmNvbnN0cnVjdG9yLGE9ci5jb25zdHJ1Y3RvcjtpZihvIT09YSYmIShoLmlzRnVuY3Rpb24obykmJm8gaW5zdGFuY2VvZiBvJiZoLmlzRnVuY3Rpb24oYSkmJmEgaW5zdGFuY2VvZiBhKSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gcilyZXR1cm4hMX1lPWV8fFtdO2Zvcih2YXIgYz0odD10fHxbXSkubGVuZ3RoO2MtLTspaWYodFtjXT09PW4pcmV0dXJuIGVbY109PT1yO2lmKHQucHVzaChuKSxlLnB1c2gociksaSl7aWYoKGM9bi5sZW5ndGgpIT09ci5sZW5ndGgpcmV0dXJuITE7Zm9yKDtjLS07KWlmKCFxKG5bY10scltjXSx0LGUpKXJldHVybiExfWVsc2V7dmFyIGwsZj1oLmtleXMobik7aWYoYz1mLmxlbmd0aCxoLmtleXMocikubGVuZ3RoIT09YylyZXR1cm4hMTtmb3IoO2MtLTspaWYobD1mW2NdLCFqKHIsbCl8fCFxKG5bbF0scltsXSx0LGUpKXJldHVybiExfXJldHVybiB0LnBvcCgpLGUucG9wKCksITB9LGguaXNFcXVhbD1mdW5jdGlvbihuLHIpe3JldHVybiBxKG4scil9LGguaXNFbXB0eT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bnx8KHcobikmJihoLmlzQXJyYXkobil8fGguaXNTdHJpbmcobil8fGguaXNBcmd1bWVudHMobikpPzA9PT1uLmxlbmd0aDowPT09aC5rZXlzKG4pLmxlbmd0aCl9LGguaXNFbGVtZW50PWZ1bmN0aW9uKG4pe3JldHVybiEoIW58fDEhPT1uLm5vZGVUeXBlKX0saC5pc0FycmF5PXR8fGZ1bmN0aW9uKG4pe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXAuY2FsbChuKX0saC5pc09iamVjdD1mdW5jdGlvbihuKXt2YXIgcj10eXBlb2YgbjtyZXR1cm5cImZ1bmN0aW9uXCI9PT1yfHxcIm9iamVjdFwiPT09ciYmISFufSxoLmVhY2goW1wiQXJndW1lbnRzXCIsXCJGdW5jdGlvblwiLFwiU3RyaW5nXCIsXCJOdW1iZXJcIixcIkRhdGVcIixcIlJlZ0V4cFwiLFwiRXJyb3JcIixcIlN5bWJvbFwiLFwiTWFwXCIsXCJXZWFrTWFwXCIsXCJTZXRcIixcIldlYWtTZXRcIl0sZnVuY3Rpb24ocil7aFtcImlzXCIrcl09ZnVuY3Rpb24obil7cmV0dXJuIHAuY2FsbChuKT09PVwiW29iamVjdCBcIityK1wiXVwifX0pLGguaXNBcmd1bWVudHMoYXJndW1lbnRzKXx8KGguaXNBcmd1bWVudHM9ZnVuY3Rpb24obil7cmV0dXJuIGoobixcImNhbGxlZVwiKX0pO3ZhciBEPW4uZG9jdW1lbnQmJm4uZG9jdW1lbnQuY2hpbGROb2RlcztcImZ1bmN0aW9uXCIhPXR5cGVvZi8uLyYmXCJvYmplY3RcIiE9dHlwZW9mIEludDhBcnJheSYmXCJmdW5jdGlvblwiIT10eXBlb2YgRCYmKGguaXNGdW5jdGlvbj1mdW5jdGlvbihuKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBufHwhMX0pLGguaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIWguaXNTeW1ib2wobikmJmlzRmluaXRlKG4pJiYhaXNOYU4ocGFyc2VGbG9hdChuKSl9LGguaXNOYU49ZnVuY3Rpb24obil7cmV0dXJuIGguaXNOdW1iZXIobikmJmlzTmFOKG4pfSxoLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4hMD09PW58fCExPT09bnx8XCJbb2JqZWN0IEJvb2xlYW5dXCI9PT1wLmNhbGwobil9LGguaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0saC5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gdm9pZCAwPT09bn0saC5oYXM9ZnVuY3Rpb24obixyKXtpZighaC5pc0FycmF5KHIpKXJldHVybiBqKG4scik7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXt2YXIgdT1yW2VdO2lmKG51bGw9PW58fCFpLmNhbGwobix1KSlyZXR1cm4hMTtuPW5bdV19cmV0dXJuISF0fSxoLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbi5fPXIsdGhpc30saC5pZGVudGl0eT1mdW5jdGlvbihuKXtyZXR1cm4gbn0saC5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LGgubm9vcD1mdW5jdGlvbigpe30saC5wcm9wZXJ0eT1mdW5jdGlvbihyKXtyZXR1cm4gaC5pc0FycmF5KHIpP2Z1bmN0aW9uKG4pe3JldHVybiB4KG4scil9OmIocil9LGgucHJvcGVydHlPZj1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbD09cj9mdW5jdGlvbigpe306ZnVuY3Rpb24obil7cmV0dXJuIGguaXNBcnJheShuKT94KHIsbik6cltuXX19LGgubWF0Y2hlcj1oLm1hdGNoZXM9ZnVuY3Rpb24ocil7cmV0dXJuIHI9aC5leHRlbmRPd24oe30sciksZnVuY3Rpb24obil7cmV0dXJuIGguaXNNYXRjaChuLHIpfX0saC50aW1lcz1mdW5jdGlvbihuLHIsdCl7dmFyIGU9QXJyYXkoTWF0aC5tYXgoMCxuKSk7cj15KHIsdCwxKTtmb3IodmFyIHU9MDt1PG47dSsrKWVbdV09cih1KTtyZXR1cm4gZX0saC5yYW5kb209ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbD09ciYmKHI9bixuPTApLG4rTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihyLW4rMSkpfSxoLm5vdz1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX07dmFyIEw9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImI3gyNztcIixcImBcIjpcIiYjeDYwO1wifSxQPWguaW52ZXJ0KEwpLFc9ZnVuY3Rpb24ocil7dmFyIHQ9ZnVuY3Rpb24obil7cmV0dXJuIHJbbl19LG49XCIoPzpcIitoLmtleXMocikuam9pbihcInxcIikrXCIpXCIsZT1SZWdFeHAobiksdT1SZWdFeHAobixcImdcIik7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBuPW51bGw9PW4/XCJcIjpcIlwiK24sZS50ZXN0KG4pP24ucmVwbGFjZSh1LHQpOm59fTtoLmVzY2FwZT1XKEwpLGgudW5lc2NhcGU9VyhQKSxoLnJlc3VsdD1mdW5jdGlvbihuLHIsdCl7aC5pc0FycmF5KHIpfHwocj1bcl0pO3ZhciBlPXIubGVuZ3RoO2lmKCFlKXJldHVybiBoLmlzRnVuY3Rpb24odCk/dC5jYWxsKG4pOnQ7Zm9yKHZhciB1PTA7dTxlO3UrKyl7dmFyIGk9bnVsbD09bj92b2lkIDA6bltyW3VdXTt2b2lkIDA9PT1pJiYoaT10LHU9ZSksbj1oLmlzRnVuY3Rpb24oaSk/aS5jYWxsKG4pOml9cmV0dXJuIG59O3ZhciBDPTA7aC51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgcj0rK0MrXCJcIjtyZXR1cm4gbj9uK3I6cn0saC50ZW1wbGF0ZVNldHRpbmdzPXtldmFsdWF0ZTovPCUoW1xcc1xcU10rPyklPi9nLGludGVycG9sYXRlOi88JT0oW1xcc1xcU10rPyklPi9nLGVzY2FwZTovPCUtKFtcXHNcXFNdKz8pJT4vZ307dmFyIEo9LyguKV4vLFU9e1wiJ1wiOlwiJ1wiLFwiXFxcXFwiOlwiXFxcXFwiLFwiXFxyXCI6XCJyXCIsXCJcXG5cIjpcIm5cIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSxWPS9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZywkPWZ1bmN0aW9uKG4pe3JldHVyblwiXFxcXFwiK1Vbbl19O2gudGVtcGxhdGU9ZnVuY3Rpb24oaSxuLHIpeyFuJiZyJiYobj1yKSxuPWguZGVmYXVsdHMoe30sbixoLnRlbXBsYXRlU2V0dGluZ3MpO3ZhciB0LGU9UmVnRXhwKFsobi5lc2NhcGV8fEopLnNvdXJjZSwobi5pbnRlcnBvbGF0ZXx8Sikuc291cmNlLChuLmV2YWx1YXRlfHxKKS5zb3VyY2VdLmpvaW4oXCJ8XCIpK1wifCRcIixcImdcIiksbz0wLGE9XCJfX3ArPSdcIjtpLnJlcGxhY2UoZSxmdW5jdGlvbihuLHIsdCxlLHUpe3JldHVybiBhKz1pLnNsaWNlKG8sdSkucmVwbGFjZShWLCQpLG89dStuLmxlbmd0aCxyP2ErPVwiJytcXG4oKF9fdD0oXCIrcitcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjp0P2ErPVwiJytcXG4oKF9fdD0oXCIrdCtcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiOmUmJihhKz1cIic7XFxuXCIrZStcIlxcbl9fcCs9J1wiKSxufSksYSs9XCInO1xcblwiLG4udmFyaWFibGV8fChhPVwid2l0aChvYmp8fHt9KXtcXG5cIithK1wifVxcblwiKSxhPVwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiK1wicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIithK1wicmV0dXJuIF9fcDtcXG5cIjt0cnl7dD1uZXcgRnVuY3Rpb24obi52YXJpYWJsZXx8XCJvYmpcIixcIl9cIixhKX1jYXRjaChuKXt0aHJvdyBuLnNvdXJjZT1hLG59dmFyIHU9ZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbCh0aGlzLG4saCl9LGM9bi52YXJpYWJsZXx8XCJvYmpcIjtyZXR1cm4gdS5zb3VyY2U9XCJmdW5jdGlvbihcIitjK1wiKXtcXG5cIithK1wifVwiLHV9LGguY2hhaW49ZnVuY3Rpb24obil7dmFyIHI9aChuKTtyZXR1cm4gci5fY2hhaW49ITAscn07dmFyIEc9ZnVuY3Rpb24obixyKXtyZXR1cm4gbi5fY2hhaW4/aChyKS5jaGFpbigpOnJ9O2gubWl4aW49ZnVuY3Rpb24odCl7cmV0dXJuIGguZWFjaChoLmZ1bmN0aW9ucyh0KSxmdW5jdGlvbihuKXt2YXIgcj1oW25dPXRbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1bdGhpcy5fd3JhcHBlZF07cmV0dXJuIHUuYXBwbHkobixhcmd1bWVudHMpLEcodGhpcyxyLmFwcGx5KGgsbikpfX0pLGh9LGgubWl4aW4oaCksaC5lYWNoKFtcInBvcFwiLFwicHVzaFwiLFwicmV2ZXJzZVwiLFwic2hpZnRcIixcInNvcnRcIixcInNwbGljZVwiLFwidW5zaGlmdFwiXSxmdW5jdGlvbihyKXt2YXIgdD1lW3JdO2gucHJvdG90eXBlW3JdPWZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fd3JhcHBlZDtyZXR1cm4gdC5hcHBseShuLGFyZ3VtZW50cyksXCJzaGlmdFwiIT09ciYmXCJzcGxpY2VcIiE9PXJ8fDAhPT1uLmxlbmd0aHx8ZGVsZXRlIG5bMF0sRyh0aGlzLG4pfX0pLGguZWFjaChbXCJjb25jYXRcIixcImpvaW5cIixcInNsaWNlXCJdLGZ1bmN0aW9uKG4pe3ZhciByPWVbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXtyZXR1cm4gRyh0aGlzLHIuYXBwbHkodGhpcy5fd3JhcHBlZCxhcmd1bWVudHMpKX19KSxoLnByb3RvdHlwZS52YWx1ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl93cmFwcGVkfSxoLnByb3RvdHlwZS52YWx1ZU9mPWgucHJvdG90eXBlLnRvSlNPTj1oLnByb3RvdHlwZS52YWx1ZSxoLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBTdHJpbmcodGhpcy5fd3JhcHBlZCl9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFwidW5kZXJzY29yZVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIGh9KX0oKTtcclxuIiwiaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9ufSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzUnRtcCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICByZXR1cm4gKGZpbGUuaW5kZXhPZigncnRtcDonKSA9PSAwIHx8IHR5cGUgPT0gJ3J0bXAnKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGlzV2ViUlRDID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIGlmKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCd3czonKSA9PT0gMCB8fCBmaWxlLmluZGV4T2YoJ3dzczonKSA9PT0gMCB8fCB0eXBlID09PSAnd2VicnRjJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc0Rhc2ggPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgcmV0dXJuICggdHlwZSA9PT0gJ21wZCcgfHwgIHR5cGUgPT09ICdkYXNoJyB8fCB0eXBlID09PSAnYXBwbGljYXRpb24vZGFzaCt4bWwnIHx8IGV4dHJhY3RFeHRlbnNpb24oZmlsZSkgPT0gJ21wZCcpO1xyXG59O1xyXG4iLCIvKipcbiAqIHV0aWxzIGZvciB3ZWJwYWNrXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldFNjcmlwdFBhdGggPSBmdW5jdGlvbihzY3JpcHROYW1lKSB7XG4gICAgY29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3JjID0gc2NyaXB0c1tpXS5zcmM7XG4gICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3JjLmxhc3RJbmRleE9mKCcvJyArIHNjcmlwdE5hbWUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cigwLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyOS4uXG4gKi9cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gX19WRVJTSU9OX187XG4iXSwic291cmNlUm9vdCI6IiJ9