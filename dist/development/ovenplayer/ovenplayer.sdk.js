/*! OvenPlayerv0.7.78 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
/******/ 		return __webpack_require__.p + "" + ({"ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf":"ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf","ovenplayer.provider.DashProvider":"ovenplayer.provider.DashProvider","ovenplayer.provider.HlsProvider":"ovenplayer.provider.HlsProvider","ovenplayer.provider.Html5":"ovenplayer.provider.Html5","ovenplayer.provider.WebRTCProvider":"ovenplayer.provider.WebRTCProvider","ovenplayer.provider.RtmpProvider":"ovenplayer.provider.RtmpProvider","vttparser":"vttparser"}[chunkId]||chunkId) + ".js"
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Manager = __webpack_require__(/*! api/caption/Manager */ "./src/js/api/caption/Manager.js");

var _Manager2 = _interopRequireDefault(_Manager);

var _Configurator = __webpack_require__(/*! api/Configurator */ "./src/js/api/Configurator.js");

var _Configurator2 = _interopRequireDefault(_Configurator);

var _EventEmitter = __webpack_require__(/*! api/EventEmitter */ "./src/js/api/EventEmitter.js");

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _LazyCommandExecutor = __webpack_require__(/*! api/LazyCommandExecutor */ "./src/js/api/LazyCommandExecutor.js");

var _LazyCommandExecutor2 = _interopRequireDefault(_LazyCommandExecutor);

var _logger = __webpack_require__(/*! utils/logger */ "./src/js/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

var _Manager3 = __webpack_require__(/*! api/playlist/Manager */ "./src/js/api/playlist/Manager.js");

var _Manager4 = _interopRequireDefault(_Manager3);

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
    var captionManager = (0, _Manager2["default"])(that);
    var playlistManager = (0, _Manager4["default"])();
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
    that.isAutoQuality = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : isAutoQuality()");
        return currentProvider.isAutoQuality();
    };
    that.setAutoQuality = function (isAuto) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setAutoQuality() ", isAuto);
        return currentProvider.setAutoQuality(isAuto);
    };

    that.getCaptionList = function () {
        OvenPlayerConsole.log("API : getCaptionList() ", captionManager.getCaptionList());
        return captionManager.getCaptionList();
    };
    that.getCurrentCaption = function () {
        OvenPlayerConsole.log("API : getCurrentCaption() ", captionManager.getCurrentCaption());
        return captionManager.getCurrentCaption();
    };
    that.setCurrentCaption = function (index) {
        OvenPlayerConsole.log("API : setCurrentCaption() ", index);
        captionManager.setCurrentCaption(index);
    };
    that.addCaption = function (track) {
        OvenPlayerConsole.log("API : addCaption() ");
        return captionManager.addCaption(track);
    };
    that.removeCaption = function (index) {
        OvenPlayerConsole.log("API : removeCaption() ", index);
        return captionManager.removeCaption(index);
    };

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

/***/ "./src/js/api/caption/Loader.js":
/*!**************************************!*\
  !*** ./src/js/api/caption/Loader.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ajax = __webpack_require__(/*! utils/ajax.min */ "./src/js/utils/ajax.min.js");

var _ajax2 = _interopRequireDefault(_ajax);

var _SrtParser = __webpack_require__(/*! api/caption/parser/SrtParser */ "./src/js/api/caption/parser/SrtParser.js");

var _SrtParser2 = _interopRequireDefault(_SrtParser);

var _SmiParser = __webpack_require__(/*! api/caption/parser/SmiParser */ "./src/js/api/caption/parser/SmiParser.js");

var _SmiParser2 = _interopRequireDefault(_SmiParser);

var _vttCue = __webpack_require__(/*! utils/captions/vttCue */ "./src/js/utils/captions/vttCue.js");

var _vttCue2 = _interopRequireDefault(_vttCue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hoho on 2018. 7. 4..
 */
var Loader = function Loader() {
    var that = {};

    //for test. dst_type : webvtt, srt, sami
    var convertVTTUrl = function convertVTTUrl(trackUrl) {

        return "https://subtitles.ovencloud.com:8453/v1/subtitles?url=" + escape(trackUrl) + "&src_type=srt&dst_type=webvtt&file_name=ovenplayer2018";
    };
    var convertToVTTCues = function convertToVTTCues(cues) {
        return cues.map(function (cue) {
            return new _vttCue2["default"](cue.start, cue.end, cue.text);
        });
    };

    that.load = function (track, successCallback, errorCallback) {
        (0, _ajax2["default"])().get(track.file).then(function (response, xhr) {
            var cues = [];
            var vttCues = [];
            OvenPlayerConsole.log("AJAX");
            OvenPlayerConsole.log(xhr);
            try {
                var responseText = xhr.responseText;
                if (responseText.indexOf('WEBVTT') >= 0) {
                    OvenPlayerConsole.log("WEBVTT LOADED");
                    loadVttParser().then(function (WebVTT) {
                        var parser = new WebVTT.Parser(window, WebVTT.StringDecoder());
                        vttCues = [];
                        parser.oncue = function (cue) {
                            vttCues.push(cue);
                        };
                        parser.onflush = function () {
                            //delete track.xhr;
                            successCallback(vttCues);
                        };
                        // Parse calls onflush internally
                        parser.parse(responseText);
                    })["catch"](function (error) {
                        //delete track.xhr;
                        errorCallback(error);
                    });
                } else if (responseText.indexOf('SAMI') >= 0) {
                    OvenPlayerConsole.log("SAMI LOADED");
                    var parsedData = (0, _SmiParser2["default"])(responseText, {});
                    vttCues = convertToVTTCues(parsedData.result);
                    successCallback(vttCues);
                } else {
                    OvenPlayerConsole.log("SRT LOADED");
                    cues = (0, _SrtParser2["default"])(responseText);
                    vttCues = convertToVTTCues(cues);
                    successCallback(vttCues);
                }
            } catch (error) {
                //delete track.xhr;
                errorCallback(error);
            }
        });
    };

    return that;
};
function loadVttParser() {
    return __webpack_require__.e(/*! require.ensure | vttparser */ "vttparser").then((function (require) {
        return __webpack_require__(/*! api/caption/parser/VttParser */ "./src/js/api/caption/parser/VttParser.js")["default"];
    }).bind(null, __webpack_require__)).catch(function (err) {
        console.log(err);
    });
}

exports["default"] = Loader;

/***/ }),

/***/ "./src/js/api/caption/Manager.js":
/*!***************************************!*\
  !*** ./src/js/api/caption/Manager.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Loader = __webpack_require__(/*! api/caption/Loader */ "./src/js/api/caption/Loader.js");

var _Loader2 = _interopRequireDefault(_Loader);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isSupport = function isSupport(kind) {
    return kind === 'subtitles' || kind === 'captions';
}; /**
    * Created by hoho on 2018. 5. 17..
    */


var Manager = function Manager(api) {

    var that = {};
    var captionList = [];
    var currentCaptionIndex = -1;

    var captionLoader = (0, _Loader2["default"])();
    var isFisrtLoad = true;
    var isShowing = false;

    OvenPlayerConsole.log("Caption Manager >> ");

    var bindTrack = function bindTrack(track, vttCues) {
        track.data = vttCues || [];
        track.name = track.label || track.name || track.language;
        track.id = function (track, tracksCount) {
            var trackId;
            var prefix = track.kind || 'cc';
            if (track["default"] || track.defaulttrack) {
                trackId = 'default';
            } else {
                trackId = track.id || prefix + tracksCount;
            }
            if (isFisrtLoad) {
                //This execute only on. and then use flushCaptionList(lastCaptionIndex);
                changeCurrentCaption(captionList.length || 0);
                isFisrtLoad = false;
            }
            return trackId;
        }(track, captionList.length);

        captionList.push(track);
        return track.id;
    };
    var changeCurrentCaption = function changeCurrentCaption(index) {
        currentCaptionIndex = index;
        api.trigger(_constants.CONTENT_CAPTION_CHANGED, currentCaptionIndex);
    };

    api.on(_constants.READY, function () {
        if (api.getConfig().playlist && api.getConfig().playlist.length > 0) {
            var playlist = api.getConfig().playlist[0];
            if (playlist && playlist.tracks && playlist.tracks.length > 0) {
                console.log("Original Tracks : ", playlist.tracks, playlist.tracks.length);

                var _loop = function _loop(i) {
                    var track = playlist.tracks[i];
                    console.log(i);
                    if (isSupport(track.kind) && !_underscore2["default"].findWhere(track, { file: track.file })) {
                        captionLoader.load(track, function (vttCues) {
                            if (vttCues && vttCues.length > 0) {
                                var captionId = bindTrack(track, vttCues);
                                console.log("Bined Track : ", captionId);
                            }
                        }, function (error) {
                            api.trigger(_constants.ERROR, { code: _constants.PLAYER_CAPTION_ERROR, reason: "caption load error.", message: "caption load error.", error: error });
                        });
                    }
                };

                for (var i = 0; i < playlist.tracks.length; i++) {
                    _loop(i);
                }
            }
        }
    });
    api.on(_constants.CONTENT_TIME, function (meta) {
        var position = meta.position;
        if (currentCaptionIndex > -1 && captionList[currentCaptionIndex]) {
            var currentCues = _underscore2["default"].filter(captionList[currentCaptionIndex].data, function (cue) {
                return position >= cue.startTime && (!cue.endTime || position) <= cue.endTime;
            });
            if (currentCues && currentCues.length > 0) {
                api.trigger(_constants.CONTENT_CAPTION_CUE_CHANGED, currentCues[0]);
            }
        }
    });
    that.flushCaptionList = function (lastCaptionIndex) {
        captionList = [];
        changeCurrentCaption(lastCaptionIndex);
        //currentCaptionIndex = lastCaptionIndex;
    };
    that.getCaptionList = function () {
        console.log("captionList :", captionList, captionList.length);
        return captionList || [];
    };
    that.getCurrentCaption = function () {
        return currentCaptionIndex;
    };
    that.setCurrentCaption = function (_index) {
        if (_index > -2 && _index < captionList.length) {
            changeCurrentCaption(_index);
        } else {
            return null;
        }
    };
    that.addCaption = function (track) {
        if (isSupport(track.kind) && !_underscore2["default"].findWhere(captionLoader, { file: track.file })) {
            captionLoader.load(track, function (vttCues) {
                if (vttCues && vttCues.length > 0) {
                    bindTrack(track, vttCues);
                }
            }, function (error) {
                api.trigger(_constants.ERROR, { code: _constants.PLAYER_CAPTION_ERROR, reason: "caption load error.", message: "caption load error.", error: error });
            });
        }
    };
    that.removeCaption = function (index) {
        if (index > -1 && index < captionList.length) {
            captionList.splice(index, 1);
            return captionList;
        } else {
            return null;
        }
    };

    return that;
};

exports["default"] = Manager;

/***/ }),

/***/ "./src/js/api/caption/parser/SmiParser.js":
/*!************************************************!*\
  !*** ./src/js/api/caption/parser/SmiParser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 *  sami-parser
 *  The MIT License (MIT)
 *
 *  Copyright (c) 2013 Constantine Kim <elegantcoder@gmail.com>
 *  https://github.com/elegantcoder/sami-parser
 *
 */

var langCodes = ["ab", "aa", "af", "ak", "sq", "am", "ar", "an", "hy", "as", "av", "ae", "ay", "az", "bm", "ba", "eu", "be", "bn", "bh", "bi", "nb", "bs", "br", "bg", "my", "es", "ca", "km", "ch", "ce", "ny", "ny", "zh", "za", "cu", "cu", "cv", "kw", "co", "cr", "hr", "cs", "da", "dv", "dv", "nl", "dz", "en", "eo", "et", "ee", "fo", "fj", "fi", "nl", "fr", "ff", "gd", "gl", "lg", "ka", "de", "ki", "el", "kl", "gn", "gu", "ht", "ht", "ha", "he", "hz", "hi", "ho", "hu", "is", "io", "ig", "id", "ia", "ie", "iu", "ik", "ga", "it", "ja", "jv", "kl", "kn", "kr", "ks", "kk", "ki", "rw", "ky", "kv", "kg", "ko", "kj", "ku", "kj", "ky", "lo", "la", "lv", "lb", "li", "li", "li", "ln", "lt", "lu", "lb", "mk", "mg", "ms", "ml", "dv", "mt", "gv", "mi", "mr", "mh", "ro", "ro", "mn", "na", "nv", "nv", "nd", "nr", "ng", "ne", "nd", "se", "no", "nb", "nn", "ii", "ny", "nn", "ie", "oc", "oj", "cu", "cu", "cu", "or", "om", "os", "os", "pi", "pa", "ps", "fa", "pl", "pt", "pa", "ps", "qu", "ro", "rm", "rn", "ru", "sm", "sg", "sa", "sc", "gd", "sr", "sn", "ii", "sd", "si", "si", "sk", "sl", "so", "st", "nr", "es", "su", "sw", "ss", "sv", "tl", "ty", "tg", "ta", "tt", "te", "th", "bo", "ti", "to", "ts", "tn", "tr", "tk", "tw", "ug", "uk", "ur", "ug", "uz", "ca", "ve", "vi", "vo", "wa", "cy", "fy", "wo", "xh", "yi", "yo", "za", "zu"];

var reOpenSync = /<sync/i;

var reCloseSync = /<sync|<\/body|<\/sami/i;

var reLineEnding = /\r\n?|\n/g;

var reBrokenTag = /<[a-z]*[^>]*<[a-z]*/g;

var reStartTime = /<sync[^>]+?start[^=]*=[^0-9]*([0-9]*)["^0-9"]*/i;

var reBr = /<br[^>]*>/ig;

var reStyle = /<style[^>]*>([\s\S]*?)<\/style[^>]*>/i;

var reComment = /(<!--|-->)/g;

var clone = function clone(obj) {
    var flags, key, newInstance;
    if (obj == null || (typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object') {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    if (obj instanceof RegExp) {
        flags = '';
        if (obj.global != null) {
            flags += 'g';
        }
        if (obj.ignoreCase != null) {
            flags += 'i';
        }
        if (obj.multiline != null) {
            flags += 'm';
        }
        if (obj.sticky != null) {
            flags += 'y';
        }
        return new RegExp(obj.source, flags);
    }
    newInstance = new obj.constructor();
    for (key in obj) {
        newInstance[key] = clone(obj[key]);
    }
    return newInstance;
};

var strip_tags = function strip_tags(input, allowed) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Luke Godfrey
    // +      input by: Pul
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Alex
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Marc Palau
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Eric Nagel
    // +      input by: Bobby Drake
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Tomasz Wesolowski
    // +      input by: Evertjan Garretsen
    // +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
    // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    // *     example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
    // *     returns 2: '<p>Kevin van Zonneveld</p>'
    // *     example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
    // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
    // *     example 4: strip_tags('1 < 5 5 > 1');
    // *     returns 4: '1 < 5 5 > 1'
    // *     example 5: strip_tags('1 <br/> 1');
    // *     returns 5: '1  1'
    // *     example 6: strip_tags('1 <br/> 1', '<br>');
    // *     returns 6: '1  1'
    // *     example 7: strip_tags('1 <br/> 1', '<br><br/>');
    // *     returns 7: '1 <br/> 1'
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};

var _sort = function _sort(langItem) {
    return langItem.sort(function (a, b) {
        var res;
        if ((res = a.start - b.start) === 0) {
            return a.end - b.end;
        } else {
            return res;
        }
    });
};

var _mergeMultiLanguages = function _mergeMultiLanguages(arr) {
    var content, dict, i, idx, key, lang, ret, val, _i, _len, _ref;
    dict = {};
    i = arr.length;
    ret = [];
    for (i = _i = 0, _len = arr.length; _i < _len; i = ++_i) {
        val = arr[i];
        key = val.startTime + ',' + val.endTime;
        if ((idx = dict[key]) !== void 0) {
            _ref = val.languages;
            for (lang in _ref) {
                content = _ref[lang];
                ret[idx].languages[lang] = content;
            }
        } else {
            ret.push(val);
            dict[key] = ret.length - 1;
        }
    }
    return ret;
};

var SmiParser = function SmiParser(sami, options) {
    var definedLangs, duration, errors, getDefinedLangs, getLanguage, key, makeEndTime, parse, result, value, _ref;
    parse = function parse() {
        var element, error, innerText, isBroken, item, lang, langItem, lineNum, nextStartTagIdx, ret, startTagIdx, startTime, str, tempRet, _ref, _ref1, _ref2;
        error = function error(_error2) {
            var e;
            e = new Error(_error2);
            e.line = lineNum;
            e.context = element;
            return errors.push(e);
        };
        lineNum = 1;
        ret = [];
        tempRet = {};
        str = sami;
        while (true) {
            startTagIdx = str.search();
            if (nextStartTagIdx <= 0 || startTagIdx < 0) {
                break;
            }
            nextStartTagIdx = str.slice(startTagIdx + 1).search(reCloseSync) + 1;
            if (nextStartTagIdx > 0) {
                element = str.slice(startTagIdx, startTagIdx + nextStartTagIdx);
            } else {
                element = str.slice(startTagIdx);
            }
            lineNum += ((_ref = str.slice(0, startTagIdx).match(reLineEnding)) != null ? _ref.length : void 0) || 0;
            if (isBroken = reBrokenTag.test(element)) {
                error('ERROR_BROKEN_TAGS');
            }
            str = str.slice(startTagIdx + nextStartTagIdx);
            startTime = +((_ref1 = element.match(reStartTime)) != null ? _ref1[1] / 1000 : void 0); //HSLEE ms -> s 로 변경
            if (startTime === null || startTime < 0) {
                error('ERROR_INVALID_TIME');
            }
            //HSLEE : 20180530 - 우린 랭기지 구분이 필요 없다. 있는거 그대로 보여줄뿐
            lang = getLanguage(element);
            /*if (!lang) {
                error('ERROR_INVALID_LANGUAGE');
            }*/
            lineNum += ((_ref2 = element.match(reLineEnding)) != null ? _ref2.length : void 0) || 0;
            element = element.replace(reLineEnding, '');
            element = element.replace(reBr, "\n");
            innerText = strip_tags(element).trim();
            //HSLEE : 20180530 - 우린 랭기지 구분이 필요 없다. 있는거 그대로 보여줄뿐
            item = {
                start: startTime,
                //languages: {},
                language: lang,
                text: "",
                contents: innerText
            };
            //HSLEE : 20180530 - 우린 랭기지 구분이 필요 없다. 있는거 그대로 보여줄뿐
            if (lang) {
                //item.languages[lang] = innerText;
                item.text = innerText;
            }
            tempRet[lang] || (tempRet[lang] = []);
            if (item.start) {
                tempRet[lang].push(item);
            }
        }
        //HSLEE : 20180530 - 우린 랭기지 구분이 필요 없다. 있는거 그대로 보여줄뿐
        for (lang in tempRet) {
            langItem = tempRet[lang];
            langItem = _sort(langItem);
            langItem = makeEndTime(langItem);
            //HSLEE : 이왕이면 SRT 파서와 포맷을 맞추자
            //langItem.start = langItem.start / 1000;
            //langItem.end = langItem.end / 1000;
            ret = ret.concat(langItem);
        }
        //HSLEE : 20180530 - 우린 랭기지 구분이 필요 없다. 있는거 그대로 보여줄뿐
        //ret = _mergeMultiLanguages(ret);
        ret = _sort(ret);
        return ret;
    };
    getLanguage = function getLanguage(element) {
        var className, lang;
        if (!element) {
            return;
        }
        for (className in definedLangs) {
            lang = definedLangs[className];
            if (lang.reClassName.test(element)) {
                return lang.lang;
            }
        }
    };
    getDefinedLangs = function getDefinedLangs() {
        var className, declaration, e, error, lang, matched, parsed, rule, selector, _i, _len, _ref, _ref1, _results;
        try {
            matched = ((_ref = sami.match(reStyle)) != null ? _ref[1] : void 0) || '';
            matched = matched.replace(reComment, '');
            parsed = cssParse(matched);
            _ref1 = parsed.stylesheet.rules;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                rule = _ref1[_i];
                selector = rule.selectors[0];
                if ((selector != null ? selector[0] : void 0) === '.') {
                    _results.push(function () {
                        var _j, _len1, _ref2, _results1;
                        _ref2 = rule.declarations;
                        _results1 = [];
                        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                            declaration = _ref2[_j];
                            if (declaration.property.toLowerCase() === 'lang') {
                                className = selector.slice(1);
                                lang = declaration.value.slice(0, 2);
                                if (~langCodes.indexOf(lang)) {
                                    _results1.push(definedLangs[className] = {
                                        lang: lang,
                                        reClassName: new RegExp("class[^=]*?=[\"'\S]*(" + className + ")['\"\S]?", 'i')
                                    });
                                } else {
                                    throw Error();
                                }
                            } else {
                                _results1.push(void 0);
                            }
                        }
                        return _results1;
                    }());
                } else {
                    _results.push(void 0);
                }
            }
            return _results;
        } catch (_error) {
            e = _error;
            errors.push(error = new Error('ERROR_INVALID_LANGUAGE_DEFINITION'));
        }
    };
    makeEndTime = function makeEndTime(langItem) {
        var i, item, _ref;
        i = langItem.length;
        while (i--) {
            item = langItem[i];
            if ((_ref = langItem[i - 1]) != null) {
                //HSLEE : 이왕이면 SRT 파서와 포맷을 맞추자
                _ref.end = item.start;
            }
            if (!item.contents || item.contents === '&nbsp;') {
                langItem.splice(i, 1);
            } else {
                delete langItem[i].contents;
                if (!item.end) {
                    item.end = item.start + duration;
                }
            }
        }
        return langItem;
    };
    errors = [];
    definedLangs = {
        KRCC: {
            lang: 'ko',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(KRCC)['\"\S]?", 'i')
        },
        KR: {
            lang: 'ko',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(KR)['\"\S]?", 'i')
        },
        ENCC: {
            lang: 'en',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(ENCC)['\"\S]?", 'i')
        },
        EGCC: {
            lang: 'en',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(EGCC)['\"\S]?", 'i')
        },
        EN: {
            lang: 'en',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(EN)['\"\S]?", 'i')
        },
        JPCC: {
            lang: 'ja',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(JPCC)['\"\S]?", 'i')
        }
    };
    if (options != null ? options.definedLangs : void 0) {
        _ref = options.definedLangs;
        for (key in _ref) {
            value = _ref[key];
            definedLangs[key] = value;
        }
    }
    duration = (options != null ? options.duration : void 0) || 10; //HSLEE ms -> s 로 변경
    sami = sami.trim();
    //getDefinedLangs();
    result = parse();
    return {
        result: result,
        errors: errors
    };
};

exports["default"] = SmiParser;

/***/ }),

/***/ "./src/js/api/caption/parser/SrtParser.js":
/*!************************************************!*\
  !*** ./src/js/api/caption/parser/SrtParser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _strings = __webpack_require__(/*! utils/strings */ "./src/js/utils/strings.js");

function _entry(data) {
    var entry = {};
    var array = data.split('\r\n');
    if (array.length === 1) {
        array = data.split('\n');
    }
    var idx = 1;
    if (array[0].indexOf(' --> ') > 0) {
        idx = 0;
    }
    if (array.length > idx + 1 && array[idx + 1]) {
        // This line contains the start and end.
        var line = array[idx];
        var index = line.indexOf(' --> ');
        if (index > 0) {
            entry.start = (0, _strings.hmsToSecond)(line.substr(0, index));
            entry.end = (0, _strings.hmsToSecond)(line.substr(index + 5));
            entry.text = array.slice(idx + 1).join('\r\n');
        }
    }
    return entry;
} /**
   * Created by hoho on 2018. 5. 29..
   */


var SrtParser = function SrtParser(data) {
    var captions = [];

    data = (0, _strings.trim)(data);

    var list = data.split('\r\n\r\n');
    if (list.length === 1) {
        list = data.split('\n\n');
    }

    for (var i = 0; i < list.length; i++) {
        if (list[i] === 'WEBVTT') {
            continue;
        }
        var entry = _entry(list[i]);
        if (entry.text) {
            captions.push(entry);
        }
    }

    return captions;
};

exports['default'] = SrtParser;

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
var CONTENT_SOURCE_CHANGED = exports.CONTENT_SOURCE_CHANGED = "sourceChanged";
var CONTENT_LEVEL_CHANGED = exports.CONTENT_LEVEL_CHANGED = "qualityLevelChanged";
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

/***/ "./src/js/utils/ajax.min.js":
/*!**********************************!*\
  !*** ./src/js/utils/ajax.min.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**!
 * ajax - v2.3.0
 * Ajax module in Vanilla JS
 * https://github.com/fdaciuk/ajax

 * Sun Jul 23 2017 10:55:09 GMT-0300 (BRT)
 * MIT (c) Fernando Daciuk
 */
!function (e, t) {
  "use strict";
   true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(undefined, function () {
  "use strict";
  function e(e) {
    var r = ["get", "post", "put", "delete"];return e = e || {}, e.baseUrl = e.baseUrl || "", e.method && e.url ? n(e.method, e.baseUrl + e.url, t(e.data), e) : r.reduce(function (r, o) {
      return r[o] = function (r, u) {
        return n(o, e.baseUrl + r, t(u), e);
      }, r;
    }, {});
  }function t(e) {
    return e || null;
  }function n(e, t, n, u) {
    var c = ["then", "catch", "always"],
        i = c.reduce(function (e, t) {
      return e[t] = function (n) {
        return e[t] = n, e;
      }, e;
    }, {}),
        f = new XMLHttpRequest(),
        d = r(t, n, e);return f.open(e, d, !0), f.withCredentials = u.hasOwnProperty("withCredentials"), o(f, u.headers), f.addEventListener("readystatechange", a(i, f), !1), f.send(s(n)), i.abort = function () {
      return f.abort();
    }, i;
  }function r(e, t, n) {
    if ("get" !== n.toLowerCase() || !t) return e;var r = s(t),
        o = e.indexOf("?") > -1 ? "&" : "?";return e + o + r;
  }function o(e, t) {
    t = t || {}, u(t) || (t["Content-Type"] = "application/x-www-form-urlencoded"), Object.keys(t).forEach(function (n) {
      t[n] && e.setRequestHeader(n, t[n]);
    });
  }function u(e) {
    return Object.keys(e).some(function (e) {
      return "content-type" === e.toLowerCase();
    });
  }function a(e, t) {
    return function n() {
      t.readyState === t.DONE && (t.removeEventListener("readystatechange", n, !1), e.always.apply(e, c(t)), t.status >= 200 && t.status < 300 ? e.then.apply(e, c(t)) : e["catch"].apply(e, c(t)));
    };
  }function c(e) {
    var t;try {
      t = JSON.parse(e.responseText);
    } catch (n) {
      t = e.responseText;
    }return [t, e];
  }function s(e) {
    return i(e) ? f(e) : e;
  }function i(e) {
    return "[object Object]" === Object.prototype.toString.call(e);
  }function f(e) {
    return Object.keys(e).reduce(function (t, n) {
      var r = t ? t + "&" : "";return r + d(n) + "=" + d(e[n]);
    }, "");
  }function d(e) {
    return encodeURIComponent(e);
  }return e;
});

/***/ }),

/***/ "./src/js/utils/captions/vttCue.js":
/*!*****************************************!*\
  !*** ./src/js/utils/captions/vttCue.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var VTTCue = window.VTTCue;

var autoKeyword = "auto";
var directionSetting = {
    "": true,
    "lr": true,
    "rl": true
};
var alignSetting = {
    "start": true,
    "middle": true,
    "end": true,
    "left": true,
    "right": true
};

function findDirectionSetting(value) {
    if (typeof value !== "string") {
        return false;
    }
    var dir = directionSetting[value.toLowerCase()];
    return dir ? value.toLowerCase() : false;
}

function findAlignSetting(value) {
    if (typeof value !== "string") {
        return false;
    }
    var align = alignSetting[value.toLowerCase()];
    return align ? value.toLowerCase() : false;
}

function extend(obj) {
    var i = 1;
    for (; i < arguments.length; i++) {
        var cobj = arguments[i];
        for (var p in cobj) {
            obj[p] = cobj[p];
        }
    }

    return obj;
}
if (!VTTCue) {
    VTTCue = function VTTCue(startTime, endTime, text) {
        var cue = this;
        var isIE8 = /MSIE\s8\.0/.test(navigator.userAgent);
        var baseObj = {};

        if (isIE8) {
            cue = document.createElement('custom');
        } else {
            baseObj.enumerable = true;
        }

        /**
         * Shim implementation specific properties. These properties are not in
         * the spec.
         */

        // Lets us know when the VTTCue's data has changed in such a way that we need
        // to recompute its display state. This lets us compute its display state
        // lazily.
        cue.hasBeenReset = false;

        /**
         * VTTCue and TextTrackCue properties
         * http://dev.w3.org/html5/webvtt/#vttcue-interface
         */

        var _id = "";
        var _pauseOnExit = false;
        var _startTime = startTime;
        var _endTime = endTime;
        var _text = text;
        var _region = null;
        var _vertical = "";
        var _snapToLines = true;
        var _line = "auto";
        var _lineAlign = "start";
        var _position = 50;
        var _positionAlign = "middle";
        var _size = 50;
        var _align = "middle";

        Object.defineProperty(cue, "id", extend({}, baseObj, {
            get: function get() {
                return _id;
            },
            set: function set(value) {
                _id = "" + value;
            }
        }));

        Object.defineProperty(cue, "pauseOnExit", extend({}, baseObj, {
            get: function get() {
                return _pauseOnExit;
            },
            set: function set(value) {
                _pauseOnExit = !!value;
            }
        }));

        Object.defineProperty(cue, "startTime", extend({}, baseObj, {
            get: function get() {
                return _startTime;
            },
            set: function set(value) {
                if (typeof value !== "number") {
                    throw new TypeError("Start time must be set to a number.");
                }
                _startTime = value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "endTime", extend({}, baseObj, {
            get: function get() {
                return _endTime;
            },
            set: function set(value) {
                if (typeof value !== "number") {
                    throw new TypeError("End time must be set to a number.");
                }
                _endTime = value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "text", extend({}, baseObj, {
            get: function get() {
                return _text;
            },
            set: function set(value) {
                _text = "" + value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "region", extend({}, baseObj, {
            get: function get() {
                return _region;
            },
            set: function set(value) {
                _region = value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "vertical", extend({}, baseObj, {
            get: function get() {
                return _vertical;
            },
            set: function set(value) {
                var setting = findDirectionSetting(value);
                // Have to check for false because the setting an be an empty string.
                if (setting === false) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _vertical = setting;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "snapToLines", extend({}, baseObj, {
            get: function get() {
                return _snapToLines;
            },
            set: function set(value) {
                _snapToLines = !!value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "line", extend({}, baseObj, {
            get: function get() {
                return _line;
            },
            set: function set(value) {
                if (typeof value !== "number" && value !== autoKeyword) {
                    throw new SyntaxError("An invalid number or illegal string was specified.");
                }
                _line = value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "lineAlign", extend({}, baseObj, {
            get: function get() {
                return _lineAlign;
            },
            set: function set(value) {
                var setting = findAlignSetting(value);
                if (!setting) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _lineAlign = setting;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "position", extend({}, baseObj, {
            get: function get() {
                return _position;
            },
            set: function set(value) {
                if (value < 0 || value > 100) {
                    throw new Error("Position must be between 0 and 100.");
                }
                _position = value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "positionAlign", extend({}, baseObj, {
            get: function get() {
                return _positionAlign;
            },
            set: function set(value) {
                var setting = findAlignSetting(value);
                if (!setting) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _positionAlign = setting;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "size", extend({}, baseObj, {
            get: function get() {
                return _size;
            },
            set: function set(value) {
                if (value < 0 || value > 100) {
                    throw new Error("Size must be between 0 and 100.");
                }
                _size = value;
                this.hasBeenReset = true;
            }
        }));

        Object.defineProperty(cue, "align", extend({}, baseObj, {
            get: function get() {
                return _align;
            },
            set: function set(value) {
                var setting = findAlignSetting(value);
                if (!setting) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _align = setting;
                this.hasBeenReset = true;
            }
        }));

        /**
         * Other <track> spec defined properties
         */

        // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#text-track-cue-display-state
        cue.displayState = undefined;

        if (isIE8) {
            return cue;
        }
    };

    /**
     * VTTCue methods
     */

    VTTCue.prototype.getCueAsHTML = function () {
        // Assume WebVTT.convertCueToDOMTree is on the global.
        return WebVTT.convertCueToDOMTree(window, this.text);
    };
};

exports["default"] = VTTCue;

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
        if (text === undefined) {
            return $element.textContent;
        } else {
            $element.textContent = text;
        }
    };
    that.html = function (text) {
        $element.innerHTML = text;
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
exports.hmsToSecond = hmsToSecond;

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

function hmsToSecond(str, frameRate) {
    if (!str) {
        return 0;
    }
    if (_underscore2['default'].isNumber(str) && !_underscore2['default'].isNaN(str)) {
        return str;
    }
    str = str.replace(',', '.');
    var arr = str.split(':');
    var arrLength = arr.length;
    var sec = 0;
    if (str.slice(-1) === 's') {
        sec = parseFloat(str);
    } else if (str.slice(-1) === 'm') {
        sec = parseFloat(str) * 60;
    } else if (str.slice(-1) === 'h') {
        sec = parseFloat(str) * 3600;
    } else if (arrLength > 1) {
        var secIndex = arrLength - 1;
        if (arrLength === 4) {
            if (frameRate) {
                sec = parseFloat(arr[secIndex]) / frameRate;
            }
            secIndex -= 1;
        }
        sec += parseFloat(arr[secIndex]);
        sec += parseFloat(arr[secIndex - 1]) * 60;
        if (arrLength >= 3) {
            sec += parseFloat(arr[secIndex - 2]) * 3600;
        }
    } else {
        sec = parseFloat(str);
    }
    if (_underscore2['default'].isNaN(sec)) {
        return 0;
    }
    return sec;
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
var version = exports.version = '0.7.78-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaUV4cGFuc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9Db25maWd1cmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvU3VwcG9ydENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9jYXB0aW9uL0xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1NydFBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9vdmVucGxheWVyLnNkay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYWpheC5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2NhcHRpb25zL3Z0dEN1ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvbGlrZUEkLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3VuZGVyc2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVyc2lvbi5qcyJdLCJuYW1lcyI6WyJBcGkiLCJjb250YWluZXIiLCJsb2dNYW5hZ2VyIiwidGhhdCIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidmVyc2lvbiIsImNhcHRpb25NYW5hZ2VyIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiaW5pdFByb3ZpZGVyIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImdldFNvdXJjZUxhYmVsIiwibGFiZWwiLCJsb2FkUHJvdmlkZXJzIiwiZ2V0UGxheWxpc3QiLCJ0aGVuIiwiZGVzdHJveSIsImN1cnJlbnRTb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2VzIiwiUHJvdmlkZXJzIiwiZ2V0TmFtZSIsIlBST1ZJREVSX1JUTVAiLCJvbiIsIm5hbWUiLCJkYXRhIiwidHJpZ2dlciIsIkVSUk9SIiwicGFyc2VJbnQiLCJjb2RlIiwiTkVUV09SS19VTlNUQUJMRUQiLCJnZXRDdXJyZW50U291cmNlIiwiZ2V0U291cmNlcyIsInBhdXNlIiwic2V0Q3VycmVudFNvdXJjZSIsInByZWxvYWQiLCJmbHVzaCIsIlJFQURZIiwiZXJyb3IiLCJlcnJvck9iamVjdCIsIklOSVRfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwib2ZmIiwiaW5pdCIsIm9wdGlvbnMiLCJpc0RlYnVnIiwiZGlzYWJsZSIsInNldFBsYXlsaXN0IiwiZ2V0Q29uZmlnIiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsImdldFZvbHVtZSIsInNldFZvbHVtZSIsInZvbHVtZSIsInNldE11dGUiLCJzdGF0ZSIsImdldE11dGUiLCJsb2FkIiwicGxheWxpc3QiLCJzZXRDdXJyZW50UXVhbGl0eSIsInBsYXkiLCJzZWVrIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJzZXREZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwic291cmNlSW5kZXgiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwiaXNTYW1lUHJvdmlkZXIiLCJyZXN1bHRTb3VyY2VJbmRleCIsImdldFF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldENhcHRpb25MaXN0IiwiZ2V0Q3VycmVudENhcHRpb24iLCJzZXRDdXJyZW50Q2FwdGlvbiIsImluZGV4IiwiYWRkQ2FwdGlvbiIsInRyYWNrIiwicmVtb3ZlQ2FwdGlvbiIsImdldEJ1ZmZlciIsImdldFN0YXRlIiwic3RvcCIsInJlbW92ZSIsIkRFU1RST1kiLCJPdmVuUGxheWVyU0RLIiwicmVtb3ZlUGxheWVyIiwiZ2V0Q29udGFpbmVySWQiLCJBcGlSdG1wRXhwYW5zaW9uIiwiZXh0ZXJuYWxDYWxsYmFja0NyZWVwIiwicmVzdWx0IiwidHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsIiwiQ29uZmlndXJhdG9yIiwiY29tcG9zZVNvdXJjZU9wdGlvbnMiLCJEZWZhdWx0cyIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGVDb250cm9scyIsInBsYXliYWNrUmF0ZXMiLCJtdXRlIiwid2lkdGgiLCJoZWlnaHQiLCJzZXJpYWxpemUiLCJ2YWwiLCJ1bmRlZmluZWQiLCJsb3dlcmNhc2VWYWwiLCJ0b0xvd2VyQ2FzZSIsImlzTmFOIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsImRlc2VyaWFsaXplIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJub3JtYWxpemVTaXplIiwic2xpY2UiLCJldmFsdWF0ZUFzcGVjdFJhdGlvIiwiYXIiLCJ0b1N0cmluZyIsImluZGV4T2YiLCJ0ZXN0IiwidyIsInN1YnN0ciIsImgiLCJjb25maWciLCJhc3BlY3RyYXRpbyIsInJhdGVDb250cm9scyIsInJhdGVzIiwiQXJyYXkiLCJpc0FycmF5IiwiZmlsdGVyIiwiXyIsImlzTnVtYmVyIiwicmF0ZSIsIm1hcCIsIk1hdGgiLCJyb3VuZCIsInB1c2giLCJzb3J0IiwiY29uZmlnUGxheWxpc3QiLCJvYmoiLCJwaWNrIiwiZmVlZERhdGEiLCJkdXJhdGlvbiIsImRlYnVnIiwiaW1hZ2UiLCJxdWFsaXR5TGFiZWwiLCJzb3VyY2VMYWJlbCIsInJlcGVhdCIsInN0cmV0Y2hpbmciLCJnZXRBc3BlY3RyYXRpbyIsInNldEFzcGVjdHJhdGlvIiwiYXNwZWN0cmF0aW9fIiwiZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSIsImdldFF1YWxpdHlMYWJlbCIsInNldFF1YWxpdHlMYWJlbCIsIm5ld0xhYmVsIiwic2V0U291cmNlTGFiZWwiLCJnZXRQbGF5YmFja1JhdGVzIiwiaXNQbGF5YmFja1JhdGVDb250cm9scyIsInBsYXlsaXN0XyIsImlzUmVwZWF0IiwiZ2V0U3RyZXRjaGluZyIsIkV2ZW50RW1pdHRlciIsIm9iamVjdCIsIl9ldmVudHMiLCJ0cmlnZ2VyRXZlbnRzIiwiZXZlbnRzIiwiYXJncyIsImNvbnRleHQiLCJldmVudCIsImxpc3RlbmVyIiwiYXBwbHkiLCJjYWxsIiwiYXJndW1lbnRzIiwiYWxsRXZlbnRzIiwiYWxsIiwibmFtZXMiLCJsIiwicmV0YWluIiwiaiIsImsiLCJfbGlzdGVuZXIiLCJvbmNlIiwiY291bnQiLCJvbmNlQ2FsbGJhY2siLCJMYXp5Q29tbWFuZEV4ZWN1dG9yIiwiaW5zdGFuY2UiLCJxdWV1ZWRDb21tYW5kcyIsImNvbW1hbmRRdWV1ZSIsInVuZGVjb3JhdGVkTWV0aG9kcyIsImV4ZWN1dGVNb2RlIiwiY29tbWFuZCIsIm1ldGhvZCIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImNvbW1hbmRfIiwiY29tbWFuZFF1ZXVlSXRlbSIsImZpbmRXaGVyZSIsInNwbGljZSIsImZpbmRJbmRleCIsIlN1cHBvcnRDaGVja2VyIiwic3VwcG9ydExpc3QiLCJjaGVja1N1cHBvcnQiLCJzb3VyY2UiLCJNaW1lVHlwZXMiLCJhYWMiLCJtcDQiLCJmNHYiLCJtNHYiLCJtb3YiLCJtcDMiLCJtcGVnIiwib2d2Iiwib2dnIiwib2dhIiwidm9yYmlzIiwid2VibSIsImY0YSIsIm0zdTgiLCJtM3UiLCJobHMiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsImlzSGxzU3VwcG9ydCIsImdldE1lZGlhU291cmNlIiwid2luZG93IiwiTWVkaWFTb3VyY2UiLCJXZWJLaXRNZWRpYVNvdXJjZSIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVyIiwiU291cmNlQnVmZmVyIiwiV2ViS2l0U291cmNlQnVmZmVyIiwiaXNUeXBlU3VwcG9ydGVkIiwic291cmNlQnVmZmVyVmFsaWRBUEkiLCJhcHBlbmRCdWZmZXIiLCJmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UiLCJzb3J1Y2VfIiwiZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0Iiwic3VwcG9ydE5hbWVzIiwiaXRlbSIsInN1cHBvcnRlZCIsIkxvYWRlciIsImNvbnZlcnRWVFRVcmwiLCJ0cmFja1VybCIsImVzY2FwZSIsImNvbnZlcnRUb1ZUVEN1ZXMiLCJjdWVzIiwiVlRUQ3VlIiwiY3VlIiwic3RhcnQiLCJlbmQiLCJ0ZXh0Iiwic3VjY2Vzc0NhbGxiYWNrIiwiZXJyb3JDYWxsYmFjayIsImdldCIsInJlc3BvbnNlIiwieGhyIiwidnR0Q3VlcyIsInJlc3BvbnNlVGV4dCIsImxvYWRWdHRQYXJzZXIiLCJwYXJzZXIiLCJXZWJWVFQiLCJQYXJzZXIiLCJTdHJpbmdEZWNvZGVyIiwib25jdWUiLCJvbmZsdXNoIiwicGFyc2UiLCJwYXJzZWREYXRhIiwicmVxdWlyZSIsImVyciIsImNvbnNvbGUiLCJpc1N1cHBvcnQiLCJraW5kIiwiTWFuYWdlciIsImFwaSIsImNhcHRpb25MaXN0IiwiY3VycmVudENhcHRpb25JbmRleCIsImNhcHRpb25Mb2FkZXIiLCJpc0Zpc3J0TG9hZCIsImlzU2hvd2luZyIsImJpbmRUcmFjayIsImxhbmd1YWdlIiwiaWQiLCJ0cmFja3NDb3VudCIsInRyYWNrSWQiLCJwcmVmaXgiLCJkZWZhdWx0dHJhY2siLCJjaGFuZ2VDdXJyZW50Q2FwdGlvbiIsIkNPTlRFTlRfQ0FQVElPTl9DSEFOR0VEIiwidHJhY2tzIiwiY2FwdGlvbklkIiwiUExBWUVSX0NBUFRJT05fRVJST1IiLCJDT05URU5UX1RJTUUiLCJtZXRhIiwiY3VycmVudEN1ZXMiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEIiwiZmx1c2hDYXB0aW9uTGlzdCIsImxhc3RDYXB0aW9uSW5kZXgiLCJfaW5kZXgiLCJsYW5nQ29kZXMiLCJyZU9wZW5TeW5jIiwicmVDbG9zZVN5bmMiLCJyZUxpbmVFbmRpbmciLCJyZUJyb2tlblRhZyIsInJlU3RhcnRUaW1lIiwicmVCciIsInJlU3R5bGUiLCJyZUNvbW1lbnQiLCJjbG9uZSIsImZsYWdzIiwibmV3SW5zdGFuY2UiLCJEYXRlIiwiZ2V0VGltZSIsIlJlZ0V4cCIsImdsb2JhbCIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJzdGlja3kiLCJjb25zdHJ1Y3RvciIsInN0cmlwX3RhZ3MiLCJpbnB1dCIsImFsbG93ZWQiLCJtYXRjaCIsImpvaW4iLCJ0YWdzIiwiY29tbWVudHNBbmRQaHBUYWdzIiwicmVwbGFjZSIsIiQwIiwiJDEiLCJfc29ydCIsImxhbmdJdGVtIiwiYSIsImIiLCJyZXMiLCJfbWVyZ2VNdWx0aUxhbmd1YWdlcyIsImFyciIsImNvbnRlbnQiLCJkaWN0IiwiaWR4IiwibGFuZyIsInJldCIsIl9pIiwiX2xlbiIsIl9yZWYiLCJsYW5ndWFnZXMiLCJTbWlQYXJzZXIiLCJzYW1pIiwiZGVmaW5lZExhbmdzIiwiZXJyb3JzIiwiZ2V0RGVmaW5lZExhbmdzIiwiZ2V0TGFuZ3VhZ2UiLCJtYWtlRW5kVGltZSIsInZhbHVlIiwiZWxlbWVudCIsImlubmVyVGV4dCIsImlzQnJva2VuIiwibGluZU51bSIsIm5leHRTdGFydFRhZ0lkeCIsInN0YXJ0VGFnSWR4Iiwic3RyIiwidGVtcFJldCIsIl9yZWYxIiwiX3JlZjIiLCJlIiwiRXJyb3IiLCJsaW5lIiwic2VhcmNoIiwidHJpbSIsImNvbnRlbnRzIiwiY29uY2F0IiwiY2xhc3NOYW1lIiwicmVDbGFzc05hbWUiLCJkZWNsYXJhdGlvbiIsIm1hdGNoZWQiLCJwYXJzZWQiLCJydWxlIiwic2VsZWN0b3IiLCJfcmVzdWx0cyIsImNzc1BhcnNlIiwic3R5bGVzaGVldCIsInJ1bGVzIiwic2VsZWN0b3JzIiwiX2oiLCJfbGVuMSIsIl9yZXN1bHRzMSIsImRlY2xhcmF0aW9ucyIsInByb3BlcnR5IiwiX2Vycm9yIiwiS1JDQyIsIktSIiwiRU5DQyIsIkVHQ0MiLCJFTiIsIkpQQ0MiLCJfZW50cnkiLCJlbnRyeSIsImFycmF5Iiwic3BsaXQiLCJTcnRQYXJzZXIiLCJjYXB0aW9ucyIsImxpc3QiLCJTVEFURV9CVUZGRVJJTkciLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJTVEFURV9QQVVTRUQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfRVJST1IiLCJTVEFURV9MT0FESU5HIiwiU1RBVEVfU1RBTExFRCIsIlBST1ZJREVSX0hUTUw1IiwiUFJPVklERVJfV0VCUlRDIiwiUFJPVklERVJfREFTSCIsIlBST1ZJREVSX0hMUyIsIkNPTlRFTlRfQ09NUExFVEUiLCJDT05URU5UX1NFRUsiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiRElTUExBWV9DTElDSyIsIkNPTlRFTlRfTE9BREVEIiwiQ09OVEVOVF9TRUVLRUQiLCJQTEFZRVJfU1RBVEUiLCJQTEFZRVJfQ09NUExFVEUiLCJQTEFZRVJfUEFVU0UiLCJQTEFZRVJfUExBWSIsIkNPTlRFTlRfQlVGRkVSIiwiQ09OVEVOVF9SQVRFX0NIQU5HRSIsIkNPTlRFTlRfVk9MVU1FIiwiQ09OVEVOVF9NVVRFIiwiQ09OVEVOVF9NRVRBIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfQ0xPU0VEIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1ciLCJjdXJyZW50UGxheWxpc3QiLCJzdXBwb3J0Q2hlY2tlciIsIm1ha2VQcmV0dHlTb3VyY2UiLCJzb3VyY2VfIiwiaG9zdCIsImFwcGxpY2F0aW9uIiwic3RyZWFtIiwibWltZXR5cGVSZWdFeCIsInByZXR0aWVkUGxheWxpc3QiLCJwbGF5bGlzdEl0ZW0iLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwiQ29udHJvbGxlciIsInN1cHBvcnRDaGFja2VyIiwicmVnaXN0ZVByb3ZpZGVyIiwicHJvdmlkZXIiLCJQcm92aWRlckxvYWRlciIsImh0bWw1Iiwid2VicnRjIiwiZGFzaCIsInJ0bXAiLCJzdXBwb3J0ZWRQcm92aWRlck5hbWVzIiwiUHJvbWlzZSIsInByb3ZpZGVyTmFtZSIsImZpbmRCeU5hbWUiLCJnZXRQcm92aWRlckJ5U291cmNlIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lIiwiX193ZWJwYWNrX3B1YmxpY19wYXRoX18iLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiY29udGFpbmVyRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwibm9kZVR5cGUiLCJjcmVhdGUiLCJwbGF5ZXJJbnN0YW5jZSIsImdldFBsYXllckxpc3QiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJnZXRQbGF5ZXJCeUluZGV4IiwicGxheWVySWQiLCJnZW5lcmF0ZVdlYnJ0Y1VybHMiLCJ0IiwiZGVmaW5lIiwiciIsImJhc2VVcmwiLCJ1cmwiLCJuIiwicmVkdWNlIiwibyIsInUiLCJjIiwiZiIsIlhNTEh0dHBSZXF1ZXN0IiwiZCIsIm9wZW4iLCJ3aXRoQ3JlZGVudGlhbHMiLCJoYXNPd25Qcm9wZXJ0eSIsImhlYWRlcnMiLCJhZGRFdmVudExpc3RlbmVyIiwic2VuZCIsInMiLCJhYm9ydCIsInNldFJlcXVlc3RIZWFkZXIiLCJzb21lIiwicmVhZHlTdGF0ZSIsIkRPTkUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWx3YXlzIiwic3RhdHVzIiwiSlNPTiIsImVuY29kZVVSSUNvbXBvbmVudCIsImF1dG9LZXl3b3JkIiwiZGlyZWN0aW9uU2V0dGluZyIsImFsaWduU2V0dGluZyIsImZpbmREaXJlY3Rpb25TZXR0aW5nIiwiZGlyIiwiZmluZEFsaWduU2V0dGluZyIsImFsaWduIiwiZXh0ZW5kIiwiY29iaiIsInAiLCJpc0lFOCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImJhc2VPYmoiLCJlbnVtZXJhYmxlIiwiaGFzQmVlblJlc2V0IiwiX2lkIiwiX3BhdXNlT25FeGl0IiwiX3N0YXJ0VGltZSIsIl9lbmRUaW1lIiwiX3RleHQiLCJfcmVnaW9uIiwiX3ZlcnRpY2FsIiwiX3NuYXBUb0xpbmVzIiwiX2xpbmUiLCJfbGluZUFsaWduIiwiX3Bvc2l0aW9uIiwiX3Bvc2l0aW9uQWxpZ24iLCJfc2l6ZSIsIl9hbGlnbiIsImRlZmluZVByb3BlcnR5Iiwic2V0IiwiVHlwZUVycm9yIiwic2V0dGluZyIsIlN5bnRheEVycm9yIiwiZGlzcGxheVN0YXRlIiwiZ2V0Q3VlQXNIVE1MIiwiY29udmVydEN1ZVRvRE9NVHJlZSIsIkxhJCIsInNlbGVjdG9yT3JFbGVtZW50IiwicmV0dXJuTm9kZSIsIiRlbGVtZW50Iiwibm9kZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlcnkiLCJpc0VsZW1lbnQiLCJmaW5kIiwiY3NzIiwic3R5bGUiLCJhZGRDbGFzcyIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZXMiLCJyZW1vdmVDbGFzcyIsInJlbW92ZUF0dHJpYnV0ZSIsImF0dHJOYW1lIiwic2hvdyIsImRpc3BsYXkiLCJoaWRlIiwiYXBwZW5kIiwiaHRtbENvZGUiLCJpbm5lckhUTUwiLCJ0ZXh0Q29udGVudCIsImh0bWwiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiaXMiLCIkdGFyZ2V0RWxlbWVudCIsIm9mZnNldCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJib2R5Iiwic2Nyb2xsVG9wIiwibGVmdCIsInNjcm9sbExlZnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImF0dHIiLCJnZXRBdHRyaWJ1dGUiLCJyZXBsYWNlV2l0aCIsImFwcGVuZENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJoYXNDaGlsZE5vZGVzIiwiZmlyc3RDaGlsZCIsImNsb3Nlc3QiLCJzZWxlY3RvclN0cmluZyIsImNsb3Nlc3RFbGVtZW50IiwibG9nZ2VyIiwicHJldkNvbnNvbGVMb2ciLCJlbmFibGUiLCJuYXR1cmFsSG1zIiwiaG1zVG9TZWNvbmQiLCJzdHJpbmciLCJleHRyYWN0RXh0ZW5zaW9uIiwicGF0aCIsImdldEF6dXJlRmlsZUZvcm1hdCIsImV4dGVuc2lvbiIsImF6dXJlZEZvcm1hdCIsImxhc3RJbmRleE9mIiwic2Vjb25kIiwic2VjTnVtIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiZnJhbWVSYXRlIiwiYXJyTGVuZ3RoIiwic2VjIiwic2VjSW5kZXgiLCJzZWxmIiwiU3ltYm9sIiwiX3dyYXBwZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiVkVSU0lPTiIsInYiLCJ5IiwiaXRlcmF0ZWUiLCJpZGVudGl0eSIsImlzRnVuY3Rpb24iLCJpc09iamVjdCIsIm1hdGNoZXIiLCJnIiwibWF4IiwibSIsIngiLCJwb3ciLCJBIiwiZWFjaCIsImNvbGxlY3QiLCJPIiwiZm9sZGwiLCJpbmplY3QiLCJyZWR1Y2VSaWdodCIsImZvbGRyIiwiZGV0ZWN0IiwiZmluZEtleSIsInNlbGVjdCIsInJlamVjdCIsIm5lZ2F0ZSIsImFueSIsImluY2x1ZGVzIiwiaW5jbHVkZSIsInZhbHVlcyIsImludm9rZSIsInBsdWNrIiwid2hlcmUiLCJtaW4iLCJzaHVmZmxlIiwic2FtcGxlIiwicmFuZG9tIiwic29ydEJ5IiwiY3JpdGVyaWEiLCJncm91cEJ5IiwiaW5kZXhCeSIsImNvdW50QnkiLCJTIiwidG9BcnJheSIsImlzU3RyaW5nIiwic2l6ZSIsInBhcnRpdGlvbiIsImZpcnN0IiwiaGVhZCIsInRha2UiLCJpbml0aWFsIiwibGFzdCIsInJlc3QiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJCb29sZWFuIiwiTSIsImlzQXJndW1lbnRzIiwiZmxhdHRlbiIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzQm9vbGVhbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwidW56aXAiLCJ6aXAiLCJGIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwiRSIsInJhbmdlIiwiY2VpbCIsImNodW5rIiwiTiIsImJpbmQiLCJwYXJ0aWFsIiwicGxhY2Vob2xkZXIiLCJiaW5kQWxsIiwibWVtb2l6ZSIsImNhY2hlIiwiZGVsYXkiLCJzZXRUaW1lb3V0IiwiZGVmZXIiLCJ0aHJvdHRsZSIsImxlYWRpbmciLCJub3ciLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsImNhbmNlbCIsImRlYm91bmNlIiwid3JhcCIsImNvbXBvc2UiLCJhZnRlciIsImJlZm9yZSIsInJlc3RBcmd1bWVudHMiLCJJIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJUIiwiQiIsImFsbEtleXMiLCJtYXBPYmplY3QiLCJwYWlycyIsImludmVydCIsImZ1bmN0aW9ucyIsIm1ldGhvZHMiLCJSIiwiZXh0ZW5kT3duIiwiYXNzaWduIiwicSIsIksiLCJ6Iiwib21pdCIsIlN0cmluZyIsImRlZmF1bHRzIiwidGFwIiwiaXNNYXRjaCIsInZhbHVlT2YiLCJwb3AiLCJpc0VxdWFsIiwiaXNFbXB0eSIsIkQiLCJjaGlsZE5vZGVzIiwiSW50OEFycmF5IiwiaXNGaW5pdGUiLCJpc1N5bWJvbCIsImlzTnVsbCIsImlzVW5kZWZpbmVkIiwiaGFzIiwibm9Db25mbGljdCIsImNvbnN0YW50Iiwibm9vcCIsInByb3BlcnR5T2YiLCJtYXRjaGVzIiwidGltZXMiLCJMIiwiUCIsIlciLCJ1bmVzY2FwZSIsIkMiLCJ1bmlxdWVJZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwiSiIsIlUiLCJWIiwiJCIsInRlbXBsYXRlIiwidmFyaWFibGUiLCJGdW5jdGlvbiIsImNoYWluIiwiX2NoYWluIiwiRyIsIm1peGluIiwidG9KU09OIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0Rhc2giLCJnZXRTY3JpcHRQYXRoIiwic2NyaXB0TmFtZSIsInNjcmlwdHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInNyYyIsIl9fVkVSU0lPTl9fIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0EsaURBQXlDLDBrQkFBMGtCO0FBQ25uQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EseUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBd0Isa0NBQWtDO0FBQzFELGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5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bGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdH07XG5cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwib3ZlbnBsYXllci5zZGtcIjogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHtcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCIsXCJ2dHRwYXJzZXJcIjpcInZ0dHBhcnNlclwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcignTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKScpO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanNcIik7XG4iLCIvKiBnbG9iYWxzIF9fd2VicGFja19hbWRfb3B0aW9uc19fICovXHJcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcbiIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2ggKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG4iLCJpbXBvcnQgQ2FwdGlvbk1hbmFnZXIgZnJvbSBcImFwaS9jYXB0aW9uL01hbmFnZXJcIjtcclxuaW1wb3J0IENvbmZpZ3VyYXRvciBmcm9tIFwiYXBpL0NvbmZpZ3VyYXRvclwiO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCBMYXp5Q29tbWFuZEV4ZWN1dG9yIGZyb20gXCJhcGkvTGF6eUNvbW1hbmRFeGVjdXRvclwiO1xyXG5pbXBvcnQgTG9nTWFuYWdlciBmcm9tIFwidXRpbHMvbG9nZ2VyXCI7XHJcbmltcG9ydCBQbGF5bGlzdE1hbmFnZXIgZnJvbSBcImFwaS9wbGF5bGlzdC9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlckNvbnRyb2xsZXIgZnJvbSBcImFwaS9wcm92aWRlci9Db250cm9sbGVyXCI7XHJcbmltcG9ydCB7UkVBRFksIEVSUk9SLCBJTklUX0VSUk9SLCBERVNUUk9ZLCBORVRXT1JLX1VOU1RBQkxFRCwgUExBWUVSX0ZJTEVfRVJST1IsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcclxuaW1wb3J0IHtBcGlSdG1wRXhwYW5zaW9ufSBmcm9tICdhcGkvQXBpRXhwYW5zaW9ucyc7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBvYmplY3QgY29ubmVjdHMgVUkgdG8gdGhlIHByb3ZpZGVyLlxyXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb250YWluZXIgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcblxyXG5jb25zdCBBcGkgPSBmdW5jdGlvbihjb250YWluZXIpe1xyXG4gICAgbGV0IGxvZ01hbmFnZXIgPSBMb2dNYW5hZ2VyKCk7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiW1tPdmVuUGxheWVyXV0gdi5cIisgdmVyc2lvbik7XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgbG9hZGVkLlwiKTtcclxuICAgIGxldCBjYXB0aW9uTWFuYWdlciA9IENhcHRpb25NYW5hZ2VyKHRoYXQpO1xyXG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcigpO1xyXG4gICAgbGV0IHByb3ZpZGVyQ29udHJvbGxlciA9IFByb3ZpZGVyQ29udHJvbGxlcigpO1xyXG4gICAgbGV0IGN1cnJlbnRQcm92aWRlciA9IFwiXCI7XHJcbiAgICBsZXQgcGxheWVyQ29uZmlnID0gXCJcIjtcclxuICAgIGxldCBsYXp5UXVldWUgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0IGluaXRQcm92aWRlciA9IGZ1bmN0aW9uKGxhc3RQbGF5UG9zaXRpb24pe1xyXG4gICAgICAgIGNvbnN0IHBpY2tRdWFsaXR5RnJvbVNvdXJjZSA9IChzb3VyY2VzKSA9PntcclxuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSAwO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpKS50aGVuKFByb3ZpZGVycyA9PiB7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tRdWFsaXR5RnJvbVNvdXJjZShwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyggXCJjdXJyZW50IHNvdXJjZSBpbmRleCA6IFwiKyBjdXJyZW50U291cmNlSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgLy9DYWxsIFByb3ZpZGVyLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XShjb250YWluZXIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpID09PSBQUk9WSURFUl9SVE1QKXtcclxuICAgICAgICAgICAgICAgIC8vSWYgcHJvdmlkZXIgdHlwZSBpcyBSVE1QLCB3ZSBhY2NlcHRzIFJ0bXBFeHBhbnNpb24uXHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoYXQsIEFwaVJ0bXBFeHBhbnNpb24oY3VycmVudFByb3ZpZGVyKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vVGhpcyBwYXNzZXMgdGhlIGV2ZW50IGNyZWF0ZWQgYnkgdGhlIFByb3ZpZGVyIHRvIEFQSS5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLm9uKFwiYWxsXCIsIGZ1bmN0aW9uKG5hbWUsIGRhdGEpe1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihuYW1lLCBkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0F1dG8gbmV4dCBzb3VyY2Ugd2hlbiBwbGF5ZXIgbG9hZCB3YXMgZmFpbCBieSBhbWlzcyBzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAvL2RhdGEuY29kZSA9PT0gUExBWUVSX0ZJTEVfRVJST1JcclxuICAgICAgICAgICAgICAgIGlmKCAobmFtZSA9PT0gRVJST1IgJiYgKHBhcnNlSW50KGRhdGEuY29kZS8xMDApID09PSAzIHx8IHBhcnNlSW50KGRhdGEuY29kZS8xMDApID09PSA1KSl8fCBuYW1lID09PSBORVRXT1JLX1VOU1RBQkxFRCApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50U291cmNlSW5kZXggPSB0aGF0LmdldEN1cnJlbnRTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjdXJyZW50U291cmNlSW5kZXgrMSA8IHRoYXQuZ2V0U291cmNlcygpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBzZXF1ZW50aWFsIGhhcyBhdmFpbGFibGUgc291cmNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UoY3VycmVudFNvdXJjZUluZGV4KzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pLnRoZW4oKCk9PntcclxuXHJcbiAgICAgICAgICAgIC8vcHJvdmlkZXIncyBwcmVsb2FkKCkgaGF2ZSB0byBtYWRlIFByb21pc2UuIEN1eiBpdCBvdmVyY29tZXMgJ2ZsYXNoIGxvYWRpbmcgdGltaW5nIHByb2JsZW0nLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIucHJlbG9hZChwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSwgbGFzdFBsYXlQb3NpdGlvbiApLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5mbHVzaCgpO1xyXG4gICAgICAgICAgICAgICAgLy9UaGlzIGlzIG5vIHJlYXNvbiB0byBleGlzdCBhbnltb3JlLlxyXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUkVBRFkpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yT2JqZWN0ID0ge2NvZGUgOiBJTklUX0VSUk9SLCByZWFzb24gOiBcImluaXQgZXJyb3IuXCIsIG1lc3NhZ2UgOiBcIlBsYXllciBpbml0IGVycm9yLlwiLCBlcnJvciA6IGVycm9yfTtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgZXJyb3JPYmplY3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3JPYmplY3QgPSB7Y29kZSA6IElOSVRfRVJST1IsIHJlYXNvbiA6IFwiaW5pdCBlcnJvci5cIiwgbWVzc2FnZSA6IFwiUGxheWVyIGluaXQgZXJyb3IuXCIsIGVycm9yIDogZXJyb3J9O1xyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIGVycm9yT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgIC8veHh4IDogSWYgeW91IGluaXQgZW1wdHkgc291cmNlcy4gKEkgdGhpbmsgdGhpcyBpcyBzdHJhbmdlIGNhc2UuKVxyXG4gICAgICAgICAgICAvL1RoaXMgd29ya3MgZm9yIHRoaXMgY2FzZS5cclxuICAgICAgICAgICAgLy9wbGF5ZXIgPSBPdmVuUGxheWVyLmNyZWF0ZShcImVsSWRcIiwge30pO1xyXG4gICAgICAgICAgICAvL3BsYXllci5sb2FkKHNvcnVjZXMpO1xyXG4gICAgICAgICAgICBsYXp5UXVldWUub2ZmKCk7XHJcbiAgICAgICAgICAgIC8vbGF6eVF1ZXVlLnJlbW92ZUFuZEV4Y3V0ZU9uY2UoXCJsb2FkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBUEkg7LSI6riw7ZmUIO2VqOyImFxyXG4gICAgICogaW5pdFxyXG4gICAgICogQHBhcmFtICAgICAge29iamVjdH0gb3B0aW9ucyBwbGF5ZXIgaW5pdGlhbCBvcHRpb24gdmFsdWUuXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICoqL1xyXG4gICAgdGhhdC5pbml0ID0gKG9wdGlvbnMpID0+e1xyXG4gICAgICAgIC8vSXQgY29sbGVjdHMgdGhlIGNvbW1hbmRzIGFuZCBleGVjdXRlcyB0aGVtIGF0IHRoZSB0aW1lIHdoZW4gdGhleSBhcmUgZXhlY3V0YWJsZS5cclxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFtcclxuICAgICAgICAgICAgJ2xvYWQnLCdwbGF5JywncGF1c2UnLCdzZWVrJywnc3RvcCcsICdnZXREdXJhdGlvbicsICdnZXRQb3NpdGlvbicsICdnZXRWb2x1bWUnXHJcbiAgICAgICAgICAgICwgJ2dldE11dGUnLCAnZ2V0QnVmZmVyJywgJ2dldFN0YXRlJyAsICdnZXRRdWFsaXR5TGV2ZWxzJ1xyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zKTtcclxuICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzRGVidWcoKSl7XHJcbiAgICAgICAgICAgIGxvZ01hbmFnZXIuZGlzYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KClcIik7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIGNvbmZpZyA6IFwiLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0UGxheWxpc3QocGxheWVyQ29uZmlnLmdldFBsYXlsaXN0KCkpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBzb3VyY2VzIDogXCIgLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XHJcbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qdGhhdC5nZXRDb250YWluZXJJZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXIuaWQ7XHJcbiAgICB9OyovXHJcblxyXG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q29uZmlnKClcIiwgcGxheWVyQ29uZmlnLmdldENvbmZpZygpKTtcclxuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldENvbmZpZygpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXREdXJhdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBvc2l0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFZvbHVtZSgpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFZvbHVtZSgpIFwiICsgdm9sdW1lKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRNdXRlKCkgXCIgKyBzdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRNdXRlKCkgXCIgKyBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAocGxheWxpc3QpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xyXG5cclxuICAgICAgICBpZihwbGF5bGlzdCl7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldFBsYXlsaXN0KHBsYXlsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluaXRQcm92aWRlcigpO1xyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwbGF5KCkgXCIpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wbGF5KCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGF1c2UoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrKCkgXCIrIHBvc2l0aW9uKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2Vlayhwb3NpdGlvbik7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFBsYXliYWNrUmF0ZSgpIFwiLCBwbGF5YmFja1JhdGUpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0UGxheWJhY2tSYXRlKHBsYXllckNvbmZpZy5zZXREZWZhdWx0UGxheWJhY2tSYXRlKHBsYXliYWNrUmF0ZSkpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQbGF5YmFja1JhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTb3VyY2VzKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFNvdXJjZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoc291cmNlSW5kZXgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFNvdXJjZSgpIFwiLCBzb3VyY2VJbmRleCk7XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2VzID0gY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKTtcclxuICAgICAgICBsZXQgY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKV07XHJcbiAgICAgICAgbGV0IG5ld1NvdXJjZSA9IHNvdXJjZXNbc291cmNlSW5kZXhdO1xyXG4gICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IGlzU2FtZVByb3ZpZGVyID0gcHJvdmlkZXJDb250cm9sbGVyLmlzU2FtZVByb3ZpZGVyKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSk7XHJcbiAgICAgICAgLy8gcHJvdmlkZXIuc2VyQ3VycmVudFF1YWxpdHkgLT4gcGxheWVyQ29uZmlnIHNldHRpbmcgLT4gbG9hZFxyXG4gICAgICAgIGxldCByZXN1bHRTb3VyY2VJbmRleCA9IGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50U291cmNlKHNvdXJjZUluZGV4LCBpc1NhbWVQcm92aWRlcik7XHJcblxyXG4gICAgICAgIGlmKCFuZXdTb3VyY2Upe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgaXNTYW1lUHJvdmlkZXJcIiwgaXNTYW1lUHJvdmlkZXIpO1xyXG5cclxuICAgICAgICBpZighaXNTYW1lUHJvdmlkZXIpe1xyXG4gICAgICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheSddKTtcclxuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKGxhc3RQbGF5UG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFNvdXJjZUluZGV4O1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UXVhbGl0eUxldmVscygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgXCIsIHF1YWxpdHlJbmRleCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkocXVhbGl0eUluZGV4KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpc0F1dG9RdWFsaXR5KClcIik7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5pc0F1dG9RdWFsaXR5KCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEF1dG9RdWFsaXR5KCkgXCIsIGlzQXV0byk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRBdXRvUXVhbGl0eShpc0F1dG8pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q2FwdGlvbkxpc3QoKSBcIiwgY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKSk7XHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRDYXB0aW9uKCkgXCIsIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpO1xyXG4gICAgfVxyXG4gICAgdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRDYXB0aW9uKCkgXCIsIGluZGV4KTtcclxuICAgICAgICBjYXB0aW9uTWFuYWdlci5zZXRDdXJyZW50Q2FwdGlvbihpbmRleCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBhZGRDYXB0aW9uKCkgXCIpXHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmFkZENhcHRpb24odHJhY2spO1xyXG4gICAgfVxyXG4gICAgdGhhdC5yZW1vdmVDYXB0aW9uID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlQ2FwdGlvbigpIFwiLCBpbmRleClcclxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIucmVtb3ZlQ2FwdGlvbihpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRCdWZmZXIoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFN0YXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zdG9wID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc3RvcCgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgXCIpO1xyXG4gICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XHJcbiAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdmlkZXJDb250cm9sbGVyID0gbnVsbDtcclxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIHBsYXllckNvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgbGF6eVF1ZXVlID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhhdC50cmlnZ2VyKERFU1RST1kpO1xyXG4gICAgICAgIHRoYXQub2ZmKCk7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIC0gbGF6eVF1ZXVlLCBjdXJyZW50UHJvdmlkZXIsIHByb3ZpZGVyQ29udHJvbGxlciwgcGxheWxpc3RNYW5hZ2VyLCBwbGF5ZXJDb25maWcsIGFwaSBldmVudCBkZXN0cm9lZC4gXCIpO1xyXG4gICAgICAgIGxvZ01hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIGxvZ01hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyKHRoYXQuZ2V0Q29udGFpbmVySWQoKSk7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwaTtcclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgQXBpUnRtcEV4cGFuc2lvbiA9IGZ1bmN0aW9uKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGV4dGVybmFsQ2FsbGJhY2tDcmVlcCA6IChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgaWYocmVzdWx0Lm5hbWUgJiYgcmVzdWx0LmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci50cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwocmVzdWx0Lm5hbWUsIHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBpbml0aWFsaXplcyB0aGUgaW5wdXQgb3B0aW9ucy5cclxuICogQHBhcmFtICAgb3B0aW9uc1xyXG4gKlxyXG4gKiAqL1xyXG5jb25zdCBDb25maWd1cmF0b3IgPSBmdW5jdGlvbihvcHRpb25zKXtcclxuXHJcbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBkZWZhdWx0UGxheWJhY2tSYXRlOiAxLFxyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVDb250cm9sczogZmFsc2UsXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFswLjI1LCAwLjUsIDEsIDEuNSwgMl0sXHJcbiAgICAgICAgICAgIG11dGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2b2x1bWU6IDkwLFxyXG4gICAgICAgICAgICB3aWR0aDogNjQwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDM2MFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJjYXNlVmFsID0gdmFsLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIodmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2lkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHNlcmlhbGl6ZShvcHRpb25zW2tleV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplU2l6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbC5zbGljZSAmJiB2YWwuc2xpY2UoLTIpID09PSAncHgnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWwuc2xpY2UoMCwgLTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGV2YWx1YXRlQXNwZWN0UmF0aW8gPSBmdW5jdGlvbiAoYXIsIHdpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aWR0aC50b1N0cmluZygpLmluZGV4T2YoJyUnKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXIgIT09ICdzdHJpbmcnIHx8ICFhcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKC9eXFxkKlxcLj9cXGQrJSQvLnRlc3QoYXIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhci5pbmRleE9mKCc6Jyk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHcgPSBwYXJzZUZsb2F0KGFyLnN1YnN0cigwLCBpbmRleCkpO1xyXG4gICAgICAgICAgICBjb25zdCBoID0gcGFyc2VGbG9hdChhci5zdWJzdHIoaW5kZXggKyAxKSk7XHJcbiAgICAgICAgICAgIGlmICh3IDw9IDAgfHwgaCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKGggLyB3ICogMTAwKSArICclJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVzZXJpYWxpemUob3B0aW9ucyk7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgICAgICBjb25maWcud2lkdGggPSBub3JtYWxpemVTaXplKGNvbmZpZy53aWR0aCk7XHJcbiAgICAgICAgY29uZmlnLmhlaWdodCA9IG5vcm1hbGl6ZVNpemUoY29uZmlnLmhlaWdodCk7XHJcbiAgICAgICAgY29uZmlnLmFzcGVjdHJhdGlvID0gZXZhbHVhdGVBc3BlY3RSYXRpbyhjb25maWcuYXNwZWN0cmF0aW8sIGNvbmZpZy53aWR0aCk7XHJcblxyXG4gICAgICAgIGxldCByYXRlQ29udHJvbHMgPSBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHM7XHJcbiAgICAgICAgaWYgKHJhdGVDb250cm9scykge1xyXG4gICAgICAgICAgICBsZXQgcmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcztcclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhdGVDb250cm9scykpIHtcclxuICAgICAgICAgICAgICAgIHJhdGVzID0gcmF0ZUNvbnRyb2xzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJhdGVzID0gcmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KVxyXG4gICAgICAgICAgICAgICAgLm1hcChyYXRlID0+IE1hdGgucm91bmQocmF0ZSAqIDQpIC8gNCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmF0ZXMuaW5kZXhPZigxKSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJhdGVzLnB1c2goMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmF0ZXMuc29ydCgpO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSByYXRlcztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyB8fCBjb25maWcucGxheWJhY2tSYXRlcy5pbmRleE9mKGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlKSA8IDApIHtcclxuICAgICAgICAgICAgY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZSA9IGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlO1xyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5hc3BlY3RyYXRpbykge1xyXG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLmFzcGVjdHJhdGlvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29uZmlnUGxheWxpc3QgPSBjb25maWcucGxheWxpc3Q7XHJcbiAgICAgICAgaWYgKCFjb25maWdQbGF5bGlzdCkge1xyXG4gICAgICAgICAgICBjb25zdCBvYmogPSBfLnBpY2soY29uZmlnLCBbXHJcbiAgICAgICAgICAgICAgICAndGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAgICAgICAgICd0eXBlJyxcclxuICAgICAgICAgICAgICAgICdtZWRpYWlkJyxcclxuICAgICAgICAgICAgICAgICdpbWFnZScsXHJcbiAgICAgICAgICAgICAgICAnZmlsZScsXHJcbiAgICAgICAgICAgICAgICAnc291cmNlcycsXHJcbiAgICAgICAgICAgICAgICAndHJhY2tzJyxcclxuICAgICAgICAgICAgICAgICdwcmVsb2FkJyxcclxuICAgICAgICAgICAgICAgICdkdXJhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnaG9zdCcsXHJcbiAgICAgICAgICAgICAgICAnYXBwbGljYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3N0cmVhbSdcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBbIG9iaiBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0KSkge1xyXG4gICAgICAgICAgICBjb25maWcuZmVlZERhdGEgPSBjb25maWdQbGF5bGlzdDtcclxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gY29uZmlnUGxheWxpc3QucGxheWxpc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWxldGUgY29uZmlnLmR1cmF0aW9uO1xyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ29uZmlndXJhdG9yIGxvYWRlZC5cIiwgb3B0aW9ucyk7XHJcbiAgICBsZXQgY29uZmlnID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgbGV0IGFzcGVjdHJhdGlvID0gY29uZmlnLmFzcGVjdHJhdGlvIHx8IFwiMTY6OVwiO1xyXG4gICAgbGV0IGRlYnVnID0gY29uZmlnLmRlYnVnO1xyXG4gICAgbGV0IGRlZmF1bHRQbGF5YmFja1JhdGUgPSBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSB8fCAxO1xyXG4gICAgbGV0IGltYWdlID0gY29uZmlnLmltYWdlO1xyXG4gICAgbGV0IHBsYXliYWNrUmF0ZUNvbnRyb2xzID0gY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzIHx8IHRydWU7XHJcbiAgICBsZXQgcGxheWJhY2tSYXRlcyA9IGNvbmZpZy5wbGF5YmFja1JhdGVzIHx8IFswLjUsIDEsIDEuMjUsIDEuNSwgMl07XHJcbiAgICBsZXQgcGxheWxpc3QgPSBjb25maWcucGxheWxpc3QgfHwgW107XHJcbiAgICBsZXQgcXVhbGl0eUxhYmVsID0gY29uZmlnLnF1YWxpdHlMYWJlbCB8fCBcIlwiO1xyXG4gICAgbGV0IHNvdXJjZUxhYmVsID0gY29uZmlnLnNvdXJjZUxhYmVsIHx8IFwiXCI7XHJcbiAgICBsZXQgcmVwZWF0ID0gY29uZmlnLnJlcGVhdCB8fCBmYWxzZTtcclxuICAgIGxldCBzdHJldGNoaW5nID0gY29uZmlnLnN0cmV0Y2hpbmcgfHwgJ3VuaWZvcm0nO1xyXG5cclxuXHJcblxyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7cmV0dXJuIGNvbmZpZzt9O1xyXG5cclxuICAgIHRoYXQuZ2V0QXNwZWN0cmF0aW8gPSgpPT57cmV0dXJuIGFzcGVjdHJhdGlvO307XHJcbiAgICB0aGF0LnNldEFzcGVjdHJhdGlvID0oYXNwZWN0cmF0aW9fKT0+e2FzcGVjdHJhdGlvID0gYXNwZWN0cmF0aW9fO307XHJcblxyXG4gICAgdGhhdC5pc0RlYnVnID0oKT0+e3JldHVybiBkZWJ1Zzt9O1xyXG5cclxuICAgIHRoYXQuZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KCk9PntyZXR1cm4gZGVmYXVsdFBsYXliYWNrUmF0ZTt9O1xyXG4gICAgdGhhdC5zZXREZWZhdWx0UGxheWJhY2tSYXRlID0ocGxheWJhY2tSYXRlKT0+e2RlZmF1bHRQbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7IHJldHVybiBwbGF5YmFja1JhdGU7fTtcclxuXHJcbiAgICB0aGF0LmdldFF1YWxpdHlMYWJlbCA9ICgpID0+IHtyZXR1cm4gcXVhbGl0eUxhYmVsO307XHJcbiAgICB0aGF0LnNldFF1YWxpdHlMYWJlbCA9IChuZXdMYWJlbCkgPT4ge3F1YWxpdHlMYWJlbCA9IG5ld0xhYmVsO307XHJcblxyXG4gICAgdGhhdC5nZXRTb3VyY2VMYWJlbCA9ICgpID0+IHtyZXR1cm4gc291cmNlTGFiZWw7fTtcclxuICAgIHRoYXQuc2V0U291cmNlTGFiZWwgPSAobmV3TGFiZWwpID0+IHtzb3VyY2VMYWJlbCA9IG5ld0xhYmVsO307XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGVzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVzO307XHJcbiAgICB0aGF0LmlzUGxheWJhY2tSYXRlQ29udHJvbHMgPSgpPT57cmV0dXJuIHBsYXliYWNrUmF0ZUNvbnRyb2xzO307XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9KCk9PntyZXR1cm4gcGxheWxpc3Q7fTtcclxuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdF8gKT0+e1xyXG4gICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdF8pKXtcclxuICAgICAgICAgICAgcGxheWxpc3QgPSBwbGF5bGlzdF87XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHBsYXlsaXN0ID0gW3BsYXlsaXN0X107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwbGF5bGlzdDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc1JlcGVhdCA9KCk9PntyZXR1cm4gcmVwZWF0O307XHJcblxyXG4gICAgdGhhdC5nZXRTdHJldGNoaW5nID0oKT0+e3JldHVybiBzdHJldGNoaW5nO307XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWd1cmF0b3I7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMy4uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbW9kdWxlIHByb3ZpZGUgY3VzdG9tIGV2ZW50cy5cclxuICogQHBhcmFtICAgb2JqZWN0ICAgIEFuIG9iamVjdCB0aGF0IHJlcXVpcmVzIGN1c3RvbSBldmVudHMuXHJcbiAqXHJcbiAqICovXHJcblxyXG5jb25zdCBFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbihvYmplY3Qpe1xyXG4gICAgbGV0IHRoYXQgPSBvYmplY3Q7XHJcbiAgICBsZXQgX2V2ZW50cyA9W107XHJcblxyXG4gICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgY29udGV4dCl7XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBldmVudHMubGVuZ3RoO1xyXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGxldCBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgZXZlbnQubGlzdGVuZXIuYXBwbHkoICggZXZlbnQuY29udGV4dCB8fCBjb250ZXh0ICksIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcclxuICAgICAgICAoX2V2ZW50c1tuYW1lXSB8fCAoX2V2ZW50c1tuYW1lXT1bXSkgKS5wdXNoKHsgbGlzdGVuZXI6IGxpc3RlbmVyICAsIGNvbnRleHQgOiBjb250ZXh0fSk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSl7XHJcbiAgICAgICAgaWYoIV9ldmVudHMpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcbiAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcclxuICAgICAgICBjb25zdCBhbGxFdmVudHMgPSBfZXZlbnRzLmFsbDtcclxuXHJcbiAgICAgICAgaWYoZXZlbnRzKXtcclxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MsIHRoYXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhbGxFdmVudHMpe1xyXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzLCB0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XHJcbiAgICAgICAgaWYoIV9ldmVudHMpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIW5hbWUgJiYgIWxpc3RlbmVyICYmICFjb250ZXh0KSAge1xyXG4gICAgICAgICAgICBfZXZlbnRzID0gW107XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogT2JqZWN0LmtleXMoX2V2ZW50cyk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmV0YWluID0gX2V2ZW50c1tuYW1lXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyICB8fCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIubGlzdGVuZXIgICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5fbGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2ZW50LmNvbnRleHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9ldmVudHNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5vbmNlID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgY29uc3Qgb25jZUNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudCsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5vZmYobmFtZSwgb25jZUNhbGxiYWNrKTtcclxuICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9uY2VDYWxsYmFjay5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICByZXR1cm4gdGhhdC5vbihuYW1lLCBvbmNlQ2FsbGJhY2ssIGNvbnRleHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnRFbWl0dGVyO1xyXG4iLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcbiAqICovXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XG4gICAgfVxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XG4gICAgfVxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICB9XG5cbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgIH07XG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxyXG4gKiBAcGFyYW1cclxuICogKi9cclxuXHJcbmNvbnN0IFN1cHBvcnRDaGVja2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XHJcbiAgICBjb25zdCBzdXBwb3J0TGlzdCA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgTWltZVR5cGVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbXA0OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBmNHY6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbW92OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtcDM6ICdhdWRpby9tcGVnJyxcclxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2d2OiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ2c6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgdm9yYmlzOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICB3ZWJtOiAndmlkZW8vd2VibScsXHJcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcclxuICAgICAgICAgICAgICAgICAgICBtM3U4OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxyXG4gICAgICAgICAgICAgICAgICAgIG0zdTogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcclxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmKCF0eXBlKXtyZXR1cm4gZmFsc2U7fVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWltZVR5cGUgPSBzb3VyY2UubWltZVR5cGUgfHwgTWltZVR5cGVzW3R5cGVdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW1pbWVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnd2VicnRjJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbXBkIGFwcGxpY2F0aW9uL2Rhc2greG1sXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXNoKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2hscycsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy90aGlzIG1ldGhvZCBmcm9tIGhscy5qc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1lZGlhU291cmNlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlciA9IHdpbmRvdy5Tb3VyY2VCdWZmZXIgfHwgd2luZG93LldlYktpdFNvdXJjZUJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNUeXBlU3VwcG9ydGVkID0gbWVkaWFTb3VyY2UgJiYgdHlwZW9mIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUUsbXA0YS40MC4yXCInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgU291cmNlQnVmZmVyIGlzIGV4cG9zZWQgZW5zdXJlIGl0cyBBUEkgaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAvLyBzYWZhcmkgYW5kIG9sZCB2ZXJzaW9uIG9mIENocm9tZSBkb2Ugbm90IGV4cG9zZSBTb3VyY2VCdWZmZXIgZ2xvYmFsbHkgc28gY2hlY2tpbmcgU291cmNlQnVmZmVyLnByb3RvdHlwZSBpcyBpbXBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhaXNUeXBlU3VwcG9ydGVkICYmICEhc291cmNlQnVmZmVyVmFsaWRBUEk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzSGxzU3VwcG9ydCgpICYmICEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3J0bXAnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UgPSAoc29ydWNlXykgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKClcIiwgc29ydWNlXyk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHN1cHBvcnRMaXN0Lmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGlmKHN1cHBvcnRMaXN0W2ldLmNoZWNrU3VwcG9ydChzb3VyY2UpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0ID0gKHBsYXlsaXN0XykgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KClcIiwgcGxheWxpc3RfKTtcclxuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHBsYXlsaXN0Xy5sZW5ndGg7IGktLTspIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHBsYXlsaXN0X1tpXTtcclxuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBpdGVtLnNvdXJjZXMubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIHNvdXJjZSA9IGl0ZW0uc291cmNlc1tqXTtcclxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnROYW1lcztcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN1cHBvcnRDaGVja2VyO1xyXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiA0Li5cbiAqL1xuaW1wb3J0IGFqYXggZnJvbSBcInV0aWxzL2FqYXgubWluXCI7XG5pbXBvcnQgU3J0UGFyc2VyIGZyb20gXCJhcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyXCI7XG5pbXBvcnQgU2FtaVBhcnNlciBmcm9tIFwiYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlclwiO1xuaW1wb3J0IFZUVEN1ZSBmcm9tICd1dGlscy9jYXB0aW9ucy92dHRDdWUnO1xuXG5cbmNvbnN0IExvYWRlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuXG4gICAgLy9mb3IgdGVzdC4gZHN0X3R5cGUgOiB3ZWJ2dHQsIHNydCwgc2FtaVxuICAgIGxldCBjb252ZXJ0VlRUVXJsID0gZnVuY3Rpb24odHJhY2tVcmwpe1xuXG4gICAgICAgIHJldHVybiBcImh0dHBzOi8vc3VidGl0bGVzLm92ZW5jbG91ZC5jb206ODQ1My92MS9zdWJ0aXRsZXM/dXJsPVwiK2VzY2FwZSh0cmFja1VybCkrXCImc3JjX3R5cGU9c3J0JmRzdF90eXBlPXdlYnZ0dCZmaWxlX25hbWU9b3ZlbnBsYXllcjIwMThcIjtcbiAgICB9O1xuICAgIGxldCBjb252ZXJ0VG9WVFRDdWVzID0gZnVuY3Rpb24gKGN1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGN1ZXMubWFwKGN1ZSA9PiBuZXcgVlRUQ3VlKGN1ZS5zdGFydCwgY3VlLmVuZCwgY3VlLnRleHQpKTtcbiAgICB9XG5cbiAgICB0aGF0LmxvYWQgPSAodHJhY2ssIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xuICAgICAgICBhamF4KCkuZ2V0KHRyYWNrLmZpbGUpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UsIHhocil7XG4gICAgICAgICAgICBsZXQgY3VlcyA9IFtdO1xuICAgICAgICAgICAgbGV0IHZ0dEN1ZXMgPSBbXTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFKQVhcIik7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coeGhyKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlVGV4dCA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlVGV4dC5pbmRleE9mKCdXRUJWVFQnKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlZUVCBMT0FERURcIik7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRWdHRQYXJzZXIoKS50aGVuKFdlYlZUVCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VyID0gbmV3IFdlYlZUVC5QYXJzZXIod2luZG93LCBXZWJWVFQuU3RyaW5nRGVjb2RlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5vbmN1ZSA9IGZ1bmN0aW9uKGN1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMucHVzaChjdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5vbmZsdXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZSBjYWxscyBvbmZsdXNoIGludGVybmFsbHlcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5wYXJzZShyZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzcG9uc2VUZXh0LmluZGV4T2YoJ1NBTUknKSA+PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU0FNSSBMT0FERURcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZWREYXRhID0gU2FtaVBhcnNlcihyZXNwb25zZVRleHQsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgdnR0Q3VlcyA9IGNvbnZlcnRUb1ZUVEN1ZXMocGFyc2VkRGF0YS5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNSVCBMT0FERURcIik7XG4gICAgICAgICAgICAgICAgICAgIGN1ZXMgPSBTcnRQYXJzZXIocmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgdnR0Q3VlcyA9IGNvbnZlcnRUb1ZUVEN1ZXMoY3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XG4gICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5mdW5jdGlvbiBsb2FkVnR0UGFyc2VyKCkge1xuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXInKS5kZWZhdWx0O1xuICAgIH0sIGZ1bmN0aW9uKGVycil7Y29uc29sZS5sb2coZXJyKTt9LCAndnR0cGFyc2VyJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvYWRlcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDE3Li5cbiAqL1xuaW1wb3J0IENhcHRpb25Mb2FkZXIgZnJvbSAnYXBpL2NhcHRpb24vTG9hZGVyJztcbmltcG9ydCB7UkVBRFksIEVSUk9SLCBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQsIFBMQVlFUl9DQVBUSU9OX0VSUk9SfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuY29uc3QgaXNTdXBwb3J0ID0gZnVuY3Rpb24oa2luZCl7XG4gICAgcmV0dXJuIGtpbmQgPT09ICdzdWJ0aXRsZXMnIHx8IGtpbmQgPT09ICdjYXB0aW9ucyc7XG59O1xuXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oYXBpKXtcblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgY2FwdGlvbkxpc3QgPSBbXTtcbiAgICBsZXQgY3VycmVudENhcHRpb25JbmRleCA9IC0xO1xuXG4gICAgbGV0IGNhcHRpb25Mb2FkZXIgPSBDYXB0aW9uTG9hZGVyKCk7XG4gICAgbGV0IGlzRmlzcnRMb2FkID0gdHJ1ZTtcbiAgICBsZXQgaXNTaG93aW5nID0gZmFsc2U7XG5cblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNhcHRpb24gTWFuYWdlciA+PiBcIik7XG5cblxuICAgIGxldCBiaW5kVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgdnR0Q3Vlcyl7XG4gICAgICAgIHRyYWNrLmRhdGEgPSB2dHRDdWVzIHx8IFtdO1xuICAgICAgICB0cmFjay5uYW1lID0gdHJhY2subGFiZWwgfHwgdHJhY2submFtZSB8fCB0cmFjay5sYW5ndWFnZTtcbiAgICAgICAgdHJhY2suaWQgPSAoZnVuY3Rpb24odHJhY2ssIHRyYWNrc0NvdW50KSB7XG4gICAgICAgICAgICB2YXIgdHJhY2tJZDtcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSB0cmFjay5raW5kIHx8ICdjYyc7XG4gICAgICAgICAgICBpZiAodHJhY2suZGVmYXVsdCB8fCB0cmFjay5kZWZhdWx0dHJhY2spIHtcbiAgICAgICAgICAgICAgICB0cmFja0lkID0gJ2RlZmF1bHQnO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyYWNrSWQgPSB0cmFjay5pZCB8fCAocHJlZml4ICsgdHJhY2tzQ291bnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaXNGaXNydExvYWQpe1xuICAgICAgICAgICAgICAgIC8vVGhpcyBleGVjdXRlIG9ubHkgb24uIGFuZCB0aGVuIHVzZSBmbHVzaENhcHRpb25MaXN0KGxhc3RDYXB0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKGNhcHRpb25MaXN0Lmxlbmd0aHx8MCk7XG4gICAgICAgICAgICAgICAgaXNGaXNydExvYWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRyYWNrSWQ7XG4gICAgICAgIH0pKHRyYWNrLCBjYXB0aW9uTGlzdC5sZW5ndGgpO1xuXG4gICAgICAgIGNhcHRpb25MaXN0LnB1c2godHJhY2spO1xuICAgICAgICByZXR1cm4gdHJhY2suaWQ7XG4gICAgfTtcbiAgICBsZXQgY2hhbmdlQ3VycmVudENhcHRpb24gPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgIGN1cnJlbnRDYXB0aW9uSW5kZXggPSBpbmRleDtcbiAgICAgICAgYXBpLnRyaWdnZXIoQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQsIGN1cnJlbnRDYXB0aW9uSW5kZXgpO1xuICAgIH07XG5cbiAgICBhcGkub24oUkVBRFksIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKGFwaS5nZXRDb25maWcoKS5wbGF5bGlzdCAmJiBhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3QubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBsZXQgcGxheWxpc3QgPSBhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3RbMF07XG4gICAgICAgICAgICBpZihwbGF5bGlzdCAmJiBwbGF5bGlzdC50cmFja3MgJiYgcGxheWxpc3QudHJhY2tzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3JpZ2luYWwgVHJhY2tzIDogXCIsICBwbGF5bGlzdC50cmFja3MgLCAgcGxheWxpc3QudHJhY2tzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0LnRyYWNrcy5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFjayA9IHBsYXlsaXN0LnRyYWNrc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGlzU3VwcG9ydCh0cmFjay5raW5kKSAmJiAhIF8uZmluZFdoZXJlKHRyYWNrLCB7ZmlsZSA6IHRyYWNrLmZpbGV9KSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uTG9hZGVyLmxvYWQodHJhY2ssIGZ1bmN0aW9uKHZ0dEN1ZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZ0dEN1ZXMgJiYgdnR0Q3Vlcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhcHRpb25JZCA9IGJpbmRUcmFjayh0cmFjaywgdnR0Q3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmluZWQgVHJhY2sgOiBcIiwgY2FwdGlvbklkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoRVJST1IsIHtjb2RlIDogUExBWUVSX0NBUFRJT05fRVJST1IsIHJlYXNvbiA6IFwiY2FwdGlvbiBsb2FkIGVycm9yLlwiLCBtZXNzYWdlIDogXCJjYXB0aW9uIGxvYWQgZXJyb3IuXCIsIGVycm9yIDogZXJyb3J9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBhcGkub24oQ09OVEVOVF9USU1FLCBmdW5jdGlvbihtZXRhKXtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gbWV0YS5wb3NpdGlvbjtcbiAgICAgICAgaWYoY3VycmVudENhcHRpb25JbmRleCA+IC0xICYmIGNhcHRpb25MaXN0W2N1cnJlbnRDYXB0aW9uSW5kZXhdKXtcbiAgICAgICAgICAgIGxldCBjdXJyZW50Q3VlcyA9IF8uZmlsdGVyKGNhcHRpb25MaXN0W2N1cnJlbnRDYXB0aW9uSW5kZXhdLmRhdGEsIGZ1bmN0aW9uIChjdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24gPj0gKGN1ZS5zdGFydFRpbWUpICYmICggKCFjdWUuZW5kVGltZSB8fCBwb3NpdGlvbikgPD0gY3VlLmVuZFRpbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZihjdXJyZW50Q3VlcyAmJiBjdXJyZW50Q3Vlcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBhcGkudHJpZ2dlcihDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIGN1cnJlbnRDdWVzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSk7XG4gICAgdGhhdC5mbHVzaENhcHRpb25MaXN0ID0gKGxhc3RDYXB0aW9uSW5kZXgpID0+e1xuICAgICAgICBjYXB0aW9uTGlzdCA9IFtdO1xuICAgICAgICBjaGFuZ2VDdXJyZW50Q2FwdGlvbihsYXN0Q2FwdGlvbkluZGV4KTtcbiAgICAgICAgLy9jdXJyZW50Q2FwdGlvbkluZGV4ID0gbGFzdENhcHRpb25JbmRleDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PntcbiAgICAgICAgY29uc29sZS5sb2coXCJjYXB0aW9uTGlzdCA6XCIsIGNhcHRpb25MaXN0LCBjYXB0aW9uTGlzdC5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gY2FwdGlvbkxpc3R8fFtdO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50Q2FwdGlvbiA9ICgpID0+e1xuICAgICAgICByZXR1cm4gY3VycmVudENhcHRpb25JbmRleDtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudENhcHRpb24gPSAoX2luZGV4KSA9PntcbiAgICAgICAgaWYoX2luZGV4ID4gLTIgJiYgX2luZGV4IDwgY2FwdGlvbkxpc3QubGVuZ3RoKXtcbiAgICAgICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKF9pbmRleCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT57XG4gICAgICAgIGlmKGlzU3VwcG9ydCh0cmFjay5raW5kKSAmJiAhIF8uZmluZFdoZXJlKGNhcHRpb25Mb2FkZXIsIHtmaWxlIDogdHJhY2suZmlsZX0pKXtcbiAgICAgICAgICAgIGNhcHRpb25Mb2FkZXIubG9hZCh0cmFjaywgZnVuY3Rpb24odnR0Q3Vlcyl7XG4gICAgICAgICAgICAgICAgaWYodnR0Q3VlcyAmJiB2dHRDdWVzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBiaW5kVHJhY2sodHJhY2ssIHZ0dEN1ZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICBhcGkudHJpZ2dlcihFUlJPUiwge2NvZGUgOiBQTEFZRVJfQ0FQVElPTl9FUlJPUiwgcmVhc29uIDogXCJjYXB0aW9uIGxvYWQgZXJyb3IuXCIsIG1lc3NhZ2UgOiBcImNhcHRpb24gbG9hZCBlcnJvci5cIiwgZXJyb3IgOiBlcnJvcn0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQucmVtb3ZlQ2FwdGlvbiA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZihpbmRleCA+IC0xICYmIGluZGV4IDwgY2FwdGlvbkxpc3QubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhcHRpb25MaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gY2FwdGlvbkxpc3Q7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xuIiwiXG4vKlxuICogIHNhbWktcGFyc2VyXG4gKiAgVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogIENvcHlyaWdodCAoYykgMjAxMyBDb25zdGFudGluZSBLaW0gPGVsZWdhbnRjb2RlckBnbWFpbC5jb20+XG4gKiAgaHR0cHM6Ly9naXRodWIuY29tL2VsZWdhbnRjb2Rlci9zYW1pLXBhcnNlclxuICpcbiAqL1xuXG5jb25zdCBsYW5nQ29kZXMgPSBbXCJhYlwiLFwiYWFcIixcImFmXCIsIFwiYWtcIiwgXCJzcVwiLCBcImFtXCIsIFwiYXJcIiwgXCJhblwiLCBcImh5XCIsIFwiYXNcIiwgXCJhdlwiLCBcImFlXCIsIFwiYXlcIiwgXCJhelwiLCBcImJtXCIsIFwiYmFcIiwgXCJldVwiLCBcImJlXCIsIFwiYm5cIiwgXCJiaFwiLCBcImJpXCIsIFwibmJcIixcImJzXCIsXCJiclwiLFwiYmdcIixcIm15XCIsXCJlc1wiLFwiY2FcIixcImttXCIsXCJjaFwiLFwiY2VcIixcIm55XCIsXCJueVwiLFwiemhcIixcInphXCIsXCJjdVwiLFwiY3VcIixcImN2XCIsXCJrd1wiLFxuICAgIFwiY29cIixcImNyXCIsXCJoclwiLFwiY3NcIixcImRhXCIsXCJkdlwiLFwiZHZcIixcIm5sXCIsXCJkelwiLFwiZW5cIixcImVvXCIsXCJldFwiLFwiZWVcIixcImZvXCIsXCJmalwiLFwiZmlcIixcIm5sXCIsXCJmclwiLFwiZmZcIixcImdkXCIsXCJnbFwiLFwibGdcIixcImthXCIsXCJkZVwiLFwia2lcIixcImVsXCIsXCJrbFwiLFwiZ25cIixcImd1XCIsXCJodFwiLFwiaHRcIixcImhhXCIsXCJoZVwiLFwiaHpcIixcImhpXCIsXCJob1wiLFwiaHVcIixcImlzXCIsXCJpb1wiLFwiaWdcIixcImlkXCIsXCJpYVwiLFwiaWVcIixcIml1XCIsXCJpa1wiLFwiZ2FcIixcbiAgICBcIml0XCIsXCJqYVwiLFwianZcIixcImtsXCIsXCJrblwiLFwia3JcIixcImtzXCIsXCJra1wiLFwia2lcIixcInJ3XCIsXCJreVwiLFwia3ZcIixcImtnXCIsXCJrb1wiLFwia2pcIixcImt1XCIsXCJralwiLFwia3lcIixcImxvXCIsXCJsYVwiLFwibHZcIixcImxiXCIsXCJsaVwiLFwibGlcIixcImxpXCIsXCJsblwiLFwibHRcIixcImx1XCIsXCJsYlwiLFwibWtcIixcIm1nXCIsXCJtc1wiLFwibWxcIixcImR2XCIsXCJtdFwiLFwiZ3ZcIixcIm1pXCIsXCJtclwiLFwibWhcIixcInJvXCIsXCJyb1wiLFwibW5cIixcIm5hXCIsXCJudlwiLFwibnZcIixcIm5kXCIsXG4gICAgXCJuclwiLFwibmdcIixcIm5lXCIsXCJuZFwiLFwic2VcIixcIm5vXCIsXCJuYlwiLFwibm5cIixcImlpXCIsXCJueVwiLFwibm5cIixcImllXCIsXCJvY1wiLFwib2pcIixcImN1XCIsXCJjdVwiLFwiY3VcIixcIm9yXCIsXCJvbVwiLFwib3NcIixcIm9zXCIsXCJwaVwiLFwicGFcIixcInBzXCIsXCJmYVwiLFwicGxcIixcInB0XCIsXCJwYVwiLFwicHNcIixcInF1XCIsXCJyb1wiLFwicm1cIixcInJuXCIsXCJydVwiLFwic21cIixcInNnXCIsXCJzYVwiLFwic2NcIixcImdkXCIsXCJzclwiLFwic25cIixcImlpXCIsXCJzZFwiLFwic2lcIixcInNpXCIsXCJza1wiLFxuICAgIFwic2xcIixcInNvXCIsXCJzdFwiLFwibnJcIixcImVzXCIsXCJzdVwiLFwic3dcIixcInNzXCIsXCJzdlwiLFwidGxcIixcInR5XCIsXCJ0Z1wiLFwidGFcIixcInR0XCIsXCJ0ZVwiLFwidGhcIixcImJvXCIsXCJ0aVwiLFwidG9cIixcInRzXCIsXCJ0blwiLFwidHJcIixcInRrXCIsXCJ0d1wiLFwidWdcIixcInVrXCIsXCJ1clwiLFwidWdcIixcInV6XCIsXCJjYVwiLFwidmVcIixcInZpXCIsXCJ2b1wiLFwid2FcIixcImN5XCIsXCJmeVwiLFwid29cIixcInhoXCIsXCJ5aVwiLFwieW9cIixcInphXCIsXCJ6dVwiXTtcblxuY29uc3QgcmVPcGVuU3luYyA9IC88c3luYy9pO1xuXG5jb25zdCByZUNsb3NlU3luYyA9IC88c3luY3w8XFwvYm9keXw8XFwvc2FtaS9pO1xuXG5jb25zdCByZUxpbmVFbmRpbmcgPSAvXFxyXFxuP3xcXG4vZztcblxuY29uc3QgcmVCcm9rZW5UYWcgPSAvPFthLXpdKltePl0qPFthLXpdKi9nO1xuXG5jb25zdCByZVN0YXJ0VGltZSA9IC88c3luY1tePl0rP3N0YXJ0W149XSo9W14wLTldKihbMC05XSopW1wiXjAtOVwiXSovaTtcblxuY29uc3QgcmVCciA9IC88YnJbXj5dKj4vaWc7XG5cbmNvbnN0IHJlU3R5bGUgPSAvPHN0eWxlW14+XSo+KFtcXHNcXFNdKj8pPFxcL3N0eWxlW14+XSo+L2k7XG5cbmNvbnN0IHJlQ29tbWVudCA9IC8oPCEtLXwtLT4pL2c7XG5cbmNvbnN0IGNsb25lID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGZsYWdzLCBrZXksIG5ld0luc3RhbmNlO1xuICAgIGlmICgob2JqID09IG51bGwpIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShvYmouZ2V0VGltZSgpKTtcbiAgICB9XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICBmbGFncyA9ICcnO1xuICAgICAgICBpZiAob2JqLmdsb2JhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICBmbGFncyArPSAnZyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iai5pZ25vcmVDYXNlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZsYWdzICs9ICdpJztcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqLm11bHRpbGluZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBmbGFncyArPSAnbSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iai5zdGlja3kgIT0gbnVsbCkge1xuICAgICAgICAgICAgZmxhZ3MgKz0gJ3knO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKG9iai5zb3VyY2UsIGZsYWdzKTtcbiAgICB9XG4gICAgbmV3SW5zdGFuY2UgPSBuZXcgb2JqLmNvbnN0cnVjdG9yKCk7XG4gICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIG5ld0luc3RhbmNlW2tleV0gPSBjbG9uZShvYmpba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdJbnN0YW5jZTtcbn07XG5cbmNvbnN0IHN0cmlwX3RhZ3MgPSBmdW5jdGlvbiAoaW5wdXQsIGFsbG93ZWQpIHtcbiAgICAvLyBodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldFxuICAgIC8vICsgICBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXG4gICAgLy8gKyAgIGltcHJvdmVkIGJ5OiBMdWtlIEdvZGZyZXlcbiAgICAvLyArICAgICAgaW5wdXQgYnk6IFB1bFxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBPbm5vIE1hcnNtYW5cbiAgICAvLyArICAgICAgaW5wdXQgYnk6IEFsZXhcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxuICAgIC8vICsgICAgICBpbnB1dCBieTogTWFyYyBQYWxhdVxuICAgIC8vICsgICBpbXByb3ZlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBFcmljIE5hZ2VsXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBCb2JieSBEcmFrZVxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBUb21hc3ogV2Vzb2xvd3NraVxuICAgIC8vICsgICAgICBpbnB1dCBieTogRXZlcnRqYW4gR2FycmV0c2VuXG4gICAgLy8gKyAgICByZXZpc2VkIGJ5OiBSYWZhxYIgS3VrYXdza2kgKGh0dHA6Ly9ibG9nLmt1a2F3c2tpLnBsLylcbiAgICAvLyAqICAgICBleGFtcGxlIDE6IHN0cmlwX3RhZ3MoJzxwPktldmluPC9wPiA8YnIgLz48Yj52YW48L2I+IDxpPlpvbm5ldmVsZDwvaT4nLCAnPGk+PGI+Jyk7XG4gICAgLy8gKiAgICAgcmV0dXJucyAxOiAnS2V2aW4gPGI+dmFuPC9iPiA8aT5ab25uZXZlbGQ8L2k+J1xuICAgIC8vICogICAgIGV4YW1wbGUgMjogc3RyaXBfdGFncygnPHA+S2V2aW4gPGltZyBzcmM9XCJzb21laW1hZ2UucG5nXCIgb25tb3VzZW92ZXI9XCJzb21lRnVuY3Rpb24oKVwiPnZhbiA8aT5ab25uZXZlbGQ8L2k+PC9wPicsICc8cD4nKTtcbiAgICAvLyAqICAgICByZXR1cm5zIDI6ICc8cD5LZXZpbiB2YW4gWm9ubmV2ZWxkPC9wPidcbiAgICAvLyAqICAgICBleGFtcGxlIDM6IHN0cmlwX3RhZ3MoXCI8YSBocmVmPSdodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldCc+S2V2aW4gdmFuIFpvbm5ldmVsZDwvYT5cIiwgXCI8YT5cIik7XG4gICAgLy8gKiAgICAgcmV0dXJucyAzOiAnPGEgaHJlZj0naHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQnPktldmluIHZhbiBab25uZXZlbGQ8L2E+J1xuICAgIC8vICogICAgIGV4YW1wbGUgNDogc3RyaXBfdGFncygnMSA8IDUgNSA+IDEnKTtcbiAgICAvLyAqICAgICByZXR1cm5zIDQ6ICcxIDwgNSA1ID4gMSdcbiAgICAvLyAqICAgICBleGFtcGxlIDU6IHN0cmlwX3RhZ3MoJzEgPGJyLz4gMScpO1xuICAgIC8vICogICAgIHJldHVybnMgNTogJzEgIDEnXG4gICAgLy8gKiAgICAgZXhhbXBsZSA2OiBzdHJpcF90YWdzKCcxIDxici8+IDEnLCAnPGJyPicpO1xuICAgIC8vICogICAgIHJldHVybnMgNjogJzEgIDEnXG4gICAgLy8gKiAgICAgZXhhbXBsZSA3OiBzdHJpcF90YWdzKCcxIDxici8+IDEnLCAnPGJyPjxici8+Jyk7XG4gICAgLy8gKiAgICAgcmV0dXJucyA3OiAnMSA8YnIvPiAxJ1xuICAgIGFsbG93ZWQgPSAoKChhbGxvd2VkIHx8IFwiXCIpICsgXCJcIikudG9Mb3dlckNhc2UoKS5tYXRjaCgvPFthLXpdW2EtejAtOV0qPi9nKSB8fCBbXSkuam9pbignJyk7IC8vIG1ha2luZyBzdXJlIHRoZSBhbGxvd2VkIGFyZyBpcyBhIHN0cmluZyBjb250YWluaW5nIG9ubHkgdGFncyBpbiBsb3dlcmNhc2UgKDxhPjxiPjxjPilcbiAgICB2YXIgdGFncyA9IC88XFwvPyhbYS16XVthLXowLTldKilcXGJbXj5dKj4vZ2ksXG4gICAgICAgIGNvbW1lbnRzQW5kUGhwVGFncyA9IC88IS0tW1xcc1xcU10qPy0tPnw8XFw/KD86cGhwKT9bXFxzXFxTXSo/XFw/Pi9naTtcbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZShjb21tZW50c0FuZFBocFRhZ3MsICcnKS5yZXBsYWNlKHRhZ3MsIGZ1bmN0aW9uKCQwLCAkMSkge1xuICAgICAgICByZXR1cm4gYWxsb3dlZC5pbmRleE9mKCc8JyArICQxLnRvTG93ZXJDYXNlKCkgKyAnPicpID4gLTEgPyAkMCA6ICcnO1xuICAgIH0pO1xufTtcblxuY29uc3QgX3NvcnQgPSBmdW5jdGlvbihsYW5nSXRlbSkge1xuICAgIHJldHVybiBsYW5nSXRlbS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgdmFyIHJlcztcbiAgICAgICAgaWYgKChyZXMgPSBhLnN0YXJ0IC0gYi5zdGFydCkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBhLmVuZCAtIGIuZW5kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuY29uc3QgX21lcmdlTXVsdGlMYW5ndWFnZXMgPSBmdW5jdGlvbihhcnIpIHtcbiAgICB2YXIgY29udGVudCwgZGljdCwgaSwgaWR4LCBrZXksIGxhbmcsIHJldCwgdmFsLCBfaSwgX2xlbiwgX3JlZjtcbiAgICBkaWN0ID0ge307XG4gICAgaSA9IGFyci5sZW5ndGg7XG4gICAgcmV0ID0gW107XG4gICAgZm9yIChpID0gX2kgPSAwLCBfbGVuID0gYXJyLmxlbmd0aDsgX2kgPCBfbGVuOyBpID0gKytfaSkge1xuICAgICAgICB2YWwgPSBhcnJbaV07XG4gICAgICAgIGtleSA9IHZhbC5zdGFydFRpbWUgKyAnLCcgKyB2YWwuZW5kVGltZTtcbiAgICAgICAgaWYgKChpZHggPSBkaWN0W2tleV0pICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIF9yZWYgPSB2YWwubGFuZ3VhZ2VzO1xuICAgICAgICAgICAgZm9yIChsYW5nIGluIF9yZWYpIHtcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gX3JlZltsYW5nXTtcbiAgICAgICAgICAgICAgICByZXRbaWR4XS5sYW5ndWFnZXNbbGFuZ10gPSBjb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0LnB1c2godmFsKTtcbiAgICAgICAgICAgIGRpY3Rba2V5XSA9IHJldC5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuXG5jb25zdCBTbWlQYXJzZXIgPSBmdW5jdGlvbihzYW1pLCBvcHRpb25zKSB7XG4gICAgdmFyIGRlZmluZWRMYW5ncywgZHVyYXRpb24sIGVycm9ycywgZ2V0RGVmaW5lZExhbmdzLCBnZXRMYW5ndWFnZSwga2V5LCBtYWtlRW5kVGltZSwgcGFyc2UsIHJlc3VsdCwgdmFsdWUsIF9yZWY7XG4gICAgcGFyc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQsIGVycm9yLCBpbm5lclRleHQsIGlzQnJva2VuLCBpdGVtLCBsYW5nLCBsYW5nSXRlbSwgbGluZU51bSwgbmV4dFN0YXJ0VGFnSWR4LCByZXQsIHN0YXJ0VGFnSWR4LCBzdGFydFRpbWUsIHN0ciwgdGVtcFJldCwgX3JlZiwgX3JlZjEsIF9yZWYyO1xuICAgICAgICBlcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICB2YXIgZTtcbiAgICAgICAgICAgIGUgPSBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgZS5saW5lID0gbGluZU51bTtcbiAgICAgICAgICAgIGUuY29udGV4dCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzLnB1c2goZSk7XG4gICAgICAgIH07XG4gICAgICAgIGxpbmVOdW0gPSAxO1xuICAgICAgICByZXQgPSBbXTtcbiAgICAgICAgdGVtcFJldCA9IHt9O1xuICAgICAgICBzdHIgPSBzYW1pO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgc3RhcnRUYWdJZHggPSBzdHIuc2VhcmNoKCk7XG4gICAgICAgICAgICBpZiAobmV4dFN0YXJ0VGFnSWR4IDw9IDAgfHwgc3RhcnRUYWdJZHggPCAwKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0U3RhcnRUYWdJZHggPSBzdHIuc2xpY2Uoc3RhcnRUYWdJZHggKyAxKS5zZWFyY2gocmVDbG9zZVN5bmMpICsgMTtcbiAgICAgICAgICAgIGlmIChuZXh0U3RhcnRUYWdJZHggPiAwKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHN0ci5zbGljZShzdGFydFRhZ0lkeCwgc3RhcnRUYWdJZHggKyBuZXh0U3RhcnRUYWdJZHgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpbmVOdW0gKz0gKChfcmVmID0gc3RyLnNsaWNlKDAsIHN0YXJ0VGFnSWR4KS5tYXRjaChyZUxpbmVFbmRpbmcpKSAhPSBudWxsID8gX3JlZi5sZW5ndGggOiB2b2lkIDApIHx8IDA7XG4gICAgICAgICAgICBpZiAoaXNCcm9rZW4gPSByZUJyb2tlblRhZy50ZXN0KGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IoJ0VSUk9SX0JST0tFTl9UQUdTJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2Uoc3RhcnRUYWdJZHggKyBuZXh0U3RhcnRUYWdJZHgpO1xuICAgICAgICAgICAgc3RhcnRUaW1lID0gKygoX3JlZjEgPSBlbGVtZW50Lm1hdGNoKHJlU3RhcnRUaW1lKSkgIT0gbnVsbCA/IF9yZWYxWzFdLzEwMDAgOiB2b2lkIDApOyAgLy9IU0xFRSBtcyAtPiBzIOuhnCDrs4Dqsr1cbiAgICAgICAgICAgIGlmIChzdGFydFRpbWUgPT09IG51bGwgfHwgc3RhcnRUaW1lIDwgMCkge1xuICAgICAgICAgICAgICAgIGVycm9yKCdFUlJPUl9JTlZBTElEX1RJTUUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vSFNMRUUgOiAyMDE4MDUzMCAtIOyasOumsCDrnq3quLDsp4Ag6rWs67aE7J20IO2VhOyalCDsl4bri6QuIOyeiOuKlOqxsCDqt7jrjIDroZwg67O07Jes7KSE67+QXG4gICAgICAgICAgICBsYW5nID0gZ2V0TGFuZ3VhZ2UoZWxlbWVudCk7XG4gICAgICAgICAgICAvKmlmICghbGFuZykge1xuICAgICAgICAgICAgICAgIGVycm9yKCdFUlJPUl9JTlZBTElEX0xBTkdVQUdFJyk7XG4gICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIGxpbmVOdW0gKz0gKChfcmVmMiA9IGVsZW1lbnQubWF0Y2gocmVMaW5lRW5kaW5nKSkgIT0gbnVsbCA/IF9yZWYyLmxlbmd0aCA6IHZvaWQgMCkgfHwgMDtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnJlcGxhY2UocmVMaW5lRW5kaW5nLCAnJyk7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5yZXBsYWNlKHJlQnIsIFwiXFxuXCIpO1xuICAgICAgICAgICAgaW5uZXJUZXh0ID0gc3RyaXBfdGFncyhlbGVtZW50KS50cmltKCk7XG4gICAgICAgICAgICAvL0hTTEVFIDogMjAxODA1MzAgLSDsmrDrprAg656t6riw7KeAIOq1rOu2hOydtCDtlYTsmpQg7JeG64ukLiDsnojripTqsbAg6re464yA66GcIOuztOyXrOykhOu/kFxuICAgICAgICAgICAgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgIC8vbGFuZ3VhZ2VzOiB7fSxcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSA6IGxhbmcsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJcIixcbiAgICAgICAgICAgICAgICBjb250ZW50czogaW5uZXJUZXh0XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy9IU0xFRSA6IDIwMTgwNTMwIC0g7Jqw66awIOuereq4sOyngCDqtazrtoTsnbQg7ZWE7JqUIOyXhuuLpC4g7J6I64qU6rGwIOq3uOuMgOuhnCDrs7Tsl6zspITrv5BcbiAgICAgICAgICAgIGlmIChsYW5nKSB7XG4gICAgICAgICAgICAgICAgLy9pdGVtLmxhbmd1YWdlc1tsYW5nXSA9IGlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICBpdGVtLnRleHQgPSBpbm5lclRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZW1wUmV0W2xhbmddIHx8ICh0ZW1wUmV0W2xhbmddID0gW10pO1xuICAgICAgICAgICAgaWYoaXRlbS5zdGFydCl7XG4gICAgICAgICAgICAgICAgdGVtcFJldFtsYW5nXS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgLy9IU0xFRSA6IDIwMTgwNTMwIC0g7Jqw66awIOuereq4sOyngCDqtazrtoTsnbQg7ZWE7JqUIOyXhuuLpC4g7J6I64qU6rGwIOq3uOuMgOuhnCDrs7Tsl6zspITrv5BcbiAgICAgICAgZm9yIChsYW5nIGluIHRlbXBSZXQpIHtcbiAgICAgICAgICAgIGxhbmdJdGVtID0gdGVtcFJldFtsYW5nXTtcbiAgICAgICAgICAgIGxhbmdJdGVtID0gX3NvcnQobGFuZ0l0ZW0pO1xuICAgICAgICAgICAgbGFuZ0l0ZW0gPSBtYWtlRW5kVGltZShsYW5nSXRlbSk7XG4gICAgICAgICAgICAvL0hTTEVFIDog7J207JmV7J2066m0IFNSVCDtjIzshJzsmYAg7Y+s66e37J2EIOunnuy2lOyekFxuICAgICAgICAgICAgLy9sYW5nSXRlbS5zdGFydCA9IGxhbmdJdGVtLnN0YXJ0IC8gMTAwMDtcbiAgICAgICAgICAgIC8vbGFuZ0l0ZW0uZW5kID0gbGFuZ0l0ZW0uZW5kIC8gMTAwMDtcbiAgICAgICAgICAgIHJldCA9IHJldC5jb25jYXQobGFuZ0l0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIC8vSFNMRUUgOiAyMDE4MDUzMCAtIOyasOumsCDrnq3quLDsp4Ag6rWs67aE7J20IO2VhOyalCDsl4bri6QuIOyeiOuKlOqxsCDqt7jrjIDroZwg67O07Jes7KSE67+QXG4gICAgICAgIC8vcmV0ID0gX21lcmdlTXVsdGlMYW5ndWFnZXMocmV0KTtcbiAgICAgICAgcmV0ID0gX3NvcnQocmV0KTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuICAgIGdldExhbmd1YWdlID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICB2YXIgY2xhc3NOYW1lLCBsYW5nO1xuICAgICAgICBpZighZWxlbWVudCl7cmV0dXJuIDt9XG4gICAgICAgIGZvciAoY2xhc3NOYW1lIGluIGRlZmluZWRMYW5ncykge1xuICAgICAgICAgICAgbGFuZyA9IGRlZmluZWRMYW5nc1tjbGFzc05hbWVdO1xuICAgICAgICAgICAgaWYgKGxhbmcucmVDbGFzc05hbWUudGVzdChlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsYW5nLmxhbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGdldERlZmluZWRMYW5ncyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2xhc3NOYW1lLCBkZWNsYXJhdGlvbiwgZSwgZXJyb3IsIGxhbmcsIG1hdGNoZWQsIHBhcnNlZCwgcnVsZSwgc2VsZWN0b3IsIF9pLCBfbGVuLCBfcmVmLCBfcmVmMSwgX3Jlc3VsdHM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBtYXRjaGVkID0gKChfcmVmID0gc2FtaS5tYXRjaChyZVN0eWxlKSkgIT0gbnVsbCA/IF9yZWZbMV0gOiB2b2lkIDApIHx8ICcnO1xuICAgICAgICAgICAgbWF0Y2hlZCA9IG1hdGNoZWQucmVwbGFjZShyZUNvbW1lbnQsICcnKTtcbiAgICAgICAgICAgIHBhcnNlZCA9IGNzc1BhcnNlKG1hdGNoZWQpO1xuICAgICAgICAgICAgX3JlZjEgPSBwYXJzZWQuc3R5bGVzaGVldC5ydWxlcztcbiAgICAgICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYxLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgcnVsZSA9IF9yZWYxW19pXTtcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHJ1bGUuc2VsZWN0b3JzWzBdO1xuICAgICAgICAgICAgICAgIGlmICgoc2VsZWN0b3IgIT0gbnVsbCA/IHNlbGVjdG9yWzBdIDogdm9pZCAwKSA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9qLCBfbGVuMSwgX3JlZjIsIF9yZXN1bHRzMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWYyID0gcnVsZS5kZWNsYXJhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0czEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uID0gX3JlZjJbX2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWNsYXJhdGlvbi5wcm9wZXJ0eS50b0xvd2VyQ2FzZSgpID09PSAnbGFuZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gc2VsZWN0b3Iuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmcgPSBkZWNsYXJhdGlvbi52YWx1ZS5zbGljZSgwLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKH5sYW5nQ29kZXMuaW5kZXhPZihsYW5nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMxLnB1c2goZGVmaW5lZExhbmdzW2NsYXNzTmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZzogbGFuZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKFwiICsgY2xhc3NOYW1lICsgXCIpWydcXFwiXFxTXT9cIiwgJ2knKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMxLnB1c2godm9pZCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Jlc3VsdHMxO1xuICAgICAgICAgICAgICAgICAgICB9KSgpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgICAgICAgIGUgPSBfZXJyb3I7XG4gICAgICAgICAgICBlcnJvcnMucHVzaChlcnJvciA9IG5ldyBFcnJvcignRVJST1JfSU5WQUxJRF9MQU5HVUFHRV9ERUZJTklUSU9OJykpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBtYWtlRW5kVGltZSA9IGZ1bmN0aW9uKGxhbmdJdGVtKSB7XG4gICAgICAgIHZhciBpLCBpdGVtLCBfcmVmO1xuICAgICAgICBpID0gbGFuZ0l0ZW0ubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICBpdGVtID0gbGFuZ0l0ZW1baV07XG4gICAgICAgICAgICBpZiAoKF9yZWYgPSBsYW5nSXRlbVtpIC0gMV0pICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvL0hTTEVFIDog7J207JmV7J2066m0IFNSVCDtjIzshJzsmYAg7Y+s66e37J2EIOunnuy2lOyekFxuICAgICAgICAgICAgICAgIF9yZWYuZW5kID0gaXRlbS5zdGFydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXRlbS5jb250ZW50cyB8fCBpdGVtLmNvbnRlbnRzID09PSAnJm5ic3A7Jykge1xuICAgICAgICAgICAgICAgIGxhbmdJdGVtLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGxhbmdJdGVtW2ldLmNvbnRlbnRzO1xuICAgICAgICAgICAgICAgIGlmICghaXRlbS5lbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5lbmQgPSBpdGVtLnN0YXJ0ICsgZHVyYXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsYW5nSXRlbTtcbiAgICB9O1xuICAgIGVycm9ycyA9IFtdO1xuICAgIGRlZmluZWRMYW5ncyA9IHtcbiAgICAgICAgS1JDQzoge1xuICAgICAgICAgICAgbGFuZzogJ2tvJyxcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooS1JDQylbJ1xcXCJcXFNdP1wiLCAnaScpXG4gICAgICAgIH0sXG4gICAgICAgIEtSOiB7XG4gICAgICAgICAgICBsYW5nOiAna28nLFxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihLUilbJ1xcXCJcXFNdP1wiLCAnaScpXG4gICAgICAgIH0sXG4gICAgICAgIEVOQ0M6IHtcbiAgICAgICAgICAgIGxhbmc6ICdlbicsXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEVOQ0MpWydcXFwiXFxTXT9cIiwgJ2knKVxuICAgICAgICB9LFxuICAgICAgICBFR0NDOiB7XG4gICAgICAgICAgICBsYW5nOiAnZW4nLFxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihFR0NDKVsnXFxcIlxcU10/XCIsICdpJylcbiAgICAgICAgfSxcbiAgICAgICAgRU46IHtcbiAgICAgICAgICAgIGxhbmc6ICdlbicsXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEVOKVsnXFxcIlxcU10/XCIsICdpJylcbiAgICAgICAgfSxcbiAgICAgICAgSlBDQzoge1xuICAgICAgICAgICAgbGFuZzogJ2phJyxcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooSlBDQylbJ1xcXCJcXFNdP1wiLCAnaScpXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmRlZmluZWRMYW5ncyA6IHZvaWQgMCkge1xuICAgICAgICBfcmVmID0gb3B0aW9ucy5kZWZpbmVkTGFuZ3M7XG4gICAgICAgIGZvciAoa2V5IGluIF9yZWYpIHtcbiAgICAgICAgICAgIHZhbHVlID0gX3JlZltrZXldO1xuICAgICAgICAgICAgZGVmaW5lZExhbmdzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkdXJhdGlvbiA9IChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmR1cmF0aW9uIDogdm9pZCAwKSB8fCAxMDsgLy9IU0xFRSBtcyAtPiBzIOuhnCDrs4Dqsr1cbiAgICBzYW1pID0gc2FtaS50cmltKCk7XG4gICAgLy9nZXREZWZpbmVkTGFuZ3MoKTtcbiAgICByZXN1bHQgPSBwYXJzZSgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICBlcnJvcnM6IGVycm9yc1xuICAgIH07XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFNtaVBhcnNlcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAyOS4uXG4gKi9cbmltcG9ydCB7IGhtc1RvU2Vjb25kLCB0cmltIH0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIlxuXG5mdW5jdGlvbiBfZW50cnkoZGF0YSkge1xuICAgIHZhciBlbnRyeSA9IHt9O1xuICAgIHZhciBhcnJheSA9IGRhdGEuc3BsaXQoJ1xcclxcbicpO1xuICAgIGlmIChhcnJheS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYXJyYXkgPSBkYXRhLnNwbGl0KCdcXG4nKTtcbiAgICB9XG4gICAgdmFyIGlkeCA9IDE7XG4gICAgaWYgKGFycmF5WzBdLmluZGV4T2YoJyAtLT4gJykgPiAwKSB7XG4gICAgICAgIGlkeCA9IDA7XG4gICAgfVxuICAgIGlmIChhcnJheS5sZW5ndGggPiBpZHggKyAxICYmIGFycmF5W2lkeCArIDFdKSB7XG4gICAgICAgIC8vIFRoaXMgbGluZSBjb250YWlucyB0aGUgc3RhcnQgYW5kIGVuZC5cbiAgICAgICAgdmFyIGxpbmUgPSBhcnJheVtpZHhdO1xuICAgICAgICB2YXIgaW5kZXggPSBsaW5lLmluZGV4T2YoJyAtLT4gJyk7XG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIGVudHJ5LnN0YXJ0ID0gaG1zVG9TZWNvbmQobGluZS5zdWJzdHIoMCwgaW5kZXgpKTtcbiAgICAgICAgICAgIGVudHJ5LmVuZCA9IGhtc1RvU2Vjb25kKGxpbmUuc3Vic3RyKGluZGV4ICsgNSkpO1xuICAgICAgICAgICAgZW50cnkudGV4dCA9IGFycmF5LnNsaWNlKGlkeCArIDEpLmpvaW4oJ1xcclxcbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbnRyeTtcblxufVxuXG5jb25zdCBTcnRQYXJzZXIgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIGNhcHRpb25zID0gW107XG5cbiAgICBkYXRhID0gdHJpbShkYXRhKTtcblxuICAgIHZhciBsaXN0ID0gZGF0YS5zcGxpdCgnXFxyXFxuXFxyXFxuJyk7XG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGxpc3QgPSBkYXRhLnNwbGl0KCdcXG5cXG4nKTtcbiAgICB9XG5cblxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsaXN0W2ldID09PSAnV0VCVlRUJykge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVudHJ5ID0gX2VudHJ5KGxpc3RbaV0pO1xuICAgICAgICBpZiAoZW50cnkudGV4dCkge1xuICAgICAgICAgICAgY2FwdGlvbnMucHVzaChlbnRyeSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2FwdGlvbnM7XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBTcnRQYXJzZXI7IiwiLy8gU1RBVEVcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9IFwiYnVmZmVyaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9JRExFID0gXCJpZGxlXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9DT01QTEVURSA9IFwiY29tcGxldGVcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9IFwicGF1c2VkXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9QTEFZSU5HID0gXCJwbGF5aW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9FUlJPUiA9IFwiZXJyb3JcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSBcImxvYWRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1NUQUxMRUQgPSBcInN0YWxsZWRcIjtcclxuXHJcblxyXG4vLyBQUk9WSURFUlxyXG5leHBvcnQgY29uc3QgUFJPVklERVJfSFRNTDUgPSBcImh0bWw1XCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9XRUJSVEMgPSBcIndlYnJ0Y1wiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9IFwiZGFzaFwiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfSExTID0gXCJobHNcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1JUTVAgPSBcInJ0bXBcIjtcclxuXHJcbi8vIEVWRU5UU1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xyXG5leHBvcnQgY29uc3QgUkVBRFkgPSBcInJlYWR5XCI7XHJcbmV4cG9ydCBjb25zdCBERVNUUk9ZID0gXCJkZXN0cm95XCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NFRUsgPSBcInNlZWtcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSX0ZVTEwgPSBcImJ1ZmZlckZ1bGxcIjtcclxuZXhwb3J0IGNvbnN0IERJU1BMQVlfQ0xJQ0sgPSBcImRpc3BsYXlDbGlja1wiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9MT0FERUQgPSBcImxvYWRlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLRUQgPSBcInNlZWtlZFwiO1xyXG5leHBvcnQgY29uc3QgTkVUV09SS19VTlNUQUJMRUQgPSBcInVuc3RhYmxlTmV0d29ya1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVSUk9SID0gXCJlcnJvclwiO1xyXG5cclxuLy8gU1RBVEUgT0YgUExBWUVSXHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfU1RBVEUgPSBcInN0YXRlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfUEFVU0UgPSBcInBhdXNlXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfUExBWSA9IFwicGxheVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSID0gXCJidWZmZXJDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUUgPSBcInRpbWVcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfUkFURV9DSEFOR0UgPSBcInJhdGVjaGFuZ2VcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVk9MVU1FID0gXCJ2b2x1bWVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX01VVEUgPSBcIm11dGVcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTUVUQSA9IFwibWV0YUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU09VUkNFX0NIQU5HRUQgPSBcInNvdXJjZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxfQ0hBTkdFRCA9IFwicXVhbGl0eUxldmVsQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUJBQ0tfUkFURV9DSEFOR0VEID0gXCJwbGF5YmFja1JhdGVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQgPSBcImN1ZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DSEFOR0VEID0gXCJjYXB0aW9uQ2hhbmdlZFwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBJTklUX0VSUk9SID0gMTAwO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fRVJST1IgPSAzMDA7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IgPSAzMDE7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SID0gMzAyO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SID0gMzAzO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0ZJTEVfRVJST1IgPSAzMDQ7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ0FQVElPTl9FUlJPUiA9IDMwNTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfRVJST1IgPSA1MDE7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCA9IDUwMjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiA9IDUwMztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SID0gNTA0O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SID0gNTA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiA9IDUwNjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XID0gNTEwO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5pbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaCB9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9uICx0cmltfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3RyaW5nc1wiO1xyXG5pbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcIi4uL1N1cHBvcnRDaGVja2VyXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIFBsYXlsaXN0IG9yIFNvdXJjZXMuXHJcbiAqIEBwYXJhbVxyXG4gKlxyXG4gKiAqL1xyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCBjdXJyZW50UGxheWxpc3QgPSBbXTtcclxuICAgIGxldCBzdXBwb3J0Q2hlY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGxvYWRlZC5cIik7XHJcblxyXG4gICAgY29uc3QgbWFrZVByZXR0eVNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZV8pe1xyXG4gICAgICAgIGlmICghc291cmNlXyB8fCAhc291cmNlXy5maWxlICYmICEoc291cmNlXy5ob3N0IHx8IHNvdXJjZV8uYXBwbGljYXRpb24gfHwgc291cmNlXy5zdHJlYW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2UgPSBPYmplY3QuYXNzaWduKHt9LCB7ICdkZWZhdWx0JzogZmFsc2UgfSwgc291cmNlXyk7XHJcbiAgICAgICAgc291cmNlLmZpbGUgPSB0cmltKCcnICsgc291cmNlLmZpbGUpO1xyXG5cclxuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS5maWxlID0gc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL3N0cmVhbS9cIiArIHNvdXJjZS5zdHJlYW07XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuaG9zdDtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5hcHBsaWNhdGlvbjtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5zdHJlYW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtaW1ldHlwZVJlZ0V4ID0gL15bXi9dK1xcLyg/OngtKT8oW14vXSspJC87XHJcblxyXG4gICAgICAgIGlmIChtaW1ldHlwZVJlZ0V4LnRlc3Qoc291cmNlLnR5cGUpKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHR5cGUgaXMgZ2l2ZW4gYXMgYSBtaW1ldHlwZVxyXG4gICAgICAgICAgICBzb3VyY2UubWltZVR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBzb3VyY2UudHlwZS5yZXBsYWNlKG1pbWV0eXBlUmVnRXgsICckMScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaXNSdG1wKHNvdXJjZS5maWxlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzV2ViUlRDKHNvdXJjZS5maWxlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3dlYnJ0Yyc7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNEYXNoKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdkYXNoJztcclxuICAgICAgICB9ZWxzZSBpZiAoIXNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gZXh0cmFjdEV4dGVuc2lvbihzb3VyY2UuZmlsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG5vcm1hbGl6ZSB0eXBlc1xyXG4gICAgICAgIHN3aXRjaCAoc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZuZC5hcHBsZS5tcGVndXJsJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2hscyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbTRhJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2FhYyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc21pbCc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZVtrZXldID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzb3VyY2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIHNldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBjb25zdCBwcmV0dGllZFBsYXlsaXN0ID0gKF8uaXNBcnJheShwbGF5bGlzdCkgPyBwbGF5bGlzdCA6IFtwbGF5bGlzdF0pLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShpdGVtLnRyYWNrcykpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RJdGVtID0gT2JqZWN0LmFzc2lnbih7fSx7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcclxuICAgICAgICAgICAgICAgIHRyYWNrczogW11cclxuICAgICAgICAgICAgfSwgaXRlbSApO1xyXG5cclxuICAgICAgICAgICAgaWYoKHBsYXlsaXN0SXRlbS5zb3VyY2VzID09PSBPYmplY3QocGxheWxpc3RJdGVtLnNvdXJjZXMpKSAmJiAhXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlcyldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gaXRlbS5sZXZlbHM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5U291cmNlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSAoZGVmYXVsdFNvdXJjZS50b1N0cmluZygpID09PSAndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzb3VyY2UgZG9lc24ndCBoYXZlIGEgbGFiZWwsIG51bWJlciBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKCFwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0udHlwZStcIi1cIitpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJldHR5U291cmNlID0gbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0Q2hlY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UocHJldHR5U291cmNlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBwcmV0dHlTb3VyY2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gcGxheWxpc3RJdGVtLnNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhIXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZhdWx0IOqwgCDsl4bsnYTrlYwgd2VicnRj6rCAIOyeiOuLpOuptCB3ZWJydGMgZGVmYXVsdCA6IHRydWXroZwg7J6Q64+ZIOyEpOyglVxyXG4gICAgICAgICAgICAvKmxldCBoYXZlRGVmYXVsdCA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLmRlZmF1bHQgPT0gdHJ1ZTt9KTtcclxuICAgICAgICAgICAgbGV0IHdlYnJ0Y1NvdXJjZSA9IFtdO1xyXG4gICAgICAgICAgICBpZighaGF2ZURlZmF1bHQpe1xyXG4gICAgICAgICAgICAgICAgd2VicnRjU291cmNlID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UudHlwZSA9PSBcIndlYnJ0Y1wiO30pO1xyXG4gICAgICAgICAgICAgICAgaWYod2VicnRjU291cmNlKXtcclxuICAgICAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UuZGVmYXVsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0qL1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS50cmFja3MpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RJdGVtLmNhcHRpb25zKSl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5jb25jYXQocGxheWxpc3RJdGVtLmNhcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBwbGF5bGlzdEl0ZW0uY2FwdGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLm1hcChmdW5jdGlvbih0cmFjayl7XHJcbiAgICAgICAgICAgICAgICBpZighdHJhY2sgfHwgIXRyYWNrLmZpbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2tpbmQnOiAnY2FwdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0JzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sIHRyYWNrKTtcclxuICAgICAgICAgICAgfSkuZmlsdGVyKHRyYWNrID0+ICEhdHJhY2spO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBsYXlsaXN0SXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjdXJyZW50UGxheWxpc3QgPSBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgICAgIHJldHVybiBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldFBsYXlsaXN0KCkgXCIsIGN1cnJlbnRQbGF5bGlzdCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5bGlzdDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIC8vV2UgZG8gbm90IHN1cHBvcnQgXCJQTEFZTElTVFwiIG5vdCB5ZXQuIFNvIHRoaXMgcmV0dXJucyBwbGF5bGlzdCBvZiAwLlxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRDdXJyZW50U291cmNlcygpIFwiLCBjdXJyZW50UGxheWxpc3RbMF0uc291cmNlcyk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5bGlzdFswXS5zb3VyY2VzO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJpbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcImFwaS9TdXBwb3J0Q2hlY2tlclwiO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXHJcbiAqIEBwYXJhbVxyXG4gKiAqL1xyXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBzdXBwb3J0Q2hhY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XHJcbiAgICBjb25zdCBQcm92aWRlcnMgPSB7fTtcclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCByZWdpc3RlUHJvdmlkZXIgPSAobmFtZSwgcHJvdmlkZXIpID0+e1xyXG4gICAgICAgIGlmKFByb3ZpZGVyc1tuYW1lXSl7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcclxuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPXtcclxuICAgICAgICBodG1sNTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSHRtbDUnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNScpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiaHRtbDVcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2VicnRjIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcIndlYnJ0Y1wiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXNoIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvRGFzaCcpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiZGFzaFwiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGxzIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcImhsc1wiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydG1wIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcCcpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwicnRtcFwiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQubG9hZFByb3ZpZGVycyA9IChwbGF5bGlzdCkgPT57XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdChwbGF5bGlzdCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRQcm92aWRlcnMoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxyXG4gICAgICAgICAgICBzdXBwb3J0ZWRQcm92aWRlck5hbWVzLmZpbHRlcihmdW5jdGlvbihwcm92aWRlck5hbWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXTtcclxuICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IFByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV0oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmZpbmRCeU5hbWUgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBmaW5kQnlOYW1lKCkgXCIsIG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBQcm92aWRlcnNbbmFtZV07XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UHJvdmlkZXJCeVNvdXJjZSA9IChzb3VyY2UpID0+IHtcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWUgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZ2V0UHJvdmlkZXJCeVNvdXJjZSgpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGF0LmZpbmRCeU5hbWUoc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc1NhbWVQcm92aWRlciA9IChjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgaXNTYW1lUHJvdmlkZXIoKSBcIiwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpICwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSkgKTtcclxuICAgICAgICByZXR1cm4gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpID09PSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjtcclxuIiwiaW1wb3J0IEFQSSBmcm9tICdhcGkvQXBpJztcclxuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSAndXRpbHMvdmFsaWRhdG9yJztcclxuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XHJcbmltcG9ydCBMYSQgZnJvbSAndXRpbHMvbGlrZUEkJztcclxuaW1wb3J0IHtnZXRTY3JpcHRQYXRofSBmcm9tICd1dGlscy93ZWJwYWNrJztcclxuXHJcblxyXG5fX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuc2RrLmpzJyk7XHJcblxyXG4vKipcclxuICogTWFpbiBPdmVuUGxheWVyU0RLIG9iamVjdFxyXG4gKi9cclxuY29uc3QgT3ZlblBsYXllclNESyA9IHdpbmRvdy5PdmVuUGxheWVyU0RLID0ge307XHJcblxyXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblxyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuXHJcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XHJcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSkge1xyXG5cclxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgcGxheWVyIGluc3RhbmNlIGFuZCByZXR1cm4gaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmcgfCBkb20gZWxlbWVudH0gY29udGFpbmVyICBJZCBvZiBjb250YWluZXIgZWxlbWVudCBvciBjb250YWluZXIgZWxlbWVudFxyXG4gKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zICBUaGUgb3B0aW9uc1xyXG4gKi9cclxuT3ZlblBsYXllclNESy5jcmVhdGUgPSBmdW5jdGlvbihjb250YWluZXIsIG9wdGlvbnMpIHtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudChjb250YWluZXIpO1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gQVBJKGNvbnRhaW5lckVsZW1lbnQpO1xyXG4gICAgcGxheWVySW5zdGFuY2UuaW5pdChvcHRpb25zKTtcclxuXHJcbiAgICBwbGF5ZXJMaXN0LnB1c2gocGxheWVySW5zdGFuY2UpO1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgbGlzdC5cclxuICpcclxuICogQHJldHVybiAgICAge2FycmF5fSAgVGhlIHBsYXllciBsaXN0LlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckxpc3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGNvbnRhaW5lciBpZC5cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZ30gIGNvbnRhaW5lcklkICBUaGUgY29udGFpbmVyIGlkZW50aWZpZXJcclxuICogQHJldHVybiAgICAge29iZWplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlDb250YWluZXJJZCA9IGZ1bmN0aW9uKGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBjb250YWluZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBsYXllckxpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBpbmRleC5cclxuICpcclxuICogQHBhcmFtICAgICAge251bWJlcn0gIGluZGV4ICAgVGhlIGluZGV4XHJcbiAqIEByZXR1cm4gICAgIHtvYmplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlJbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcblxyXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBwbGF5ZXJMaXN0W2luZGV4XTtcclxuXHJcbiAgICBpZiAocGxheWVySW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgcGxheWVySWQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtwbGF5ZXJJZH0gIGlkXHJcbiAqIEByZXR1cm4gICAgIHtudWxsfVxyXG4gKi9cclxuT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIgPSBmdW5jdGlvbihwbGF5ZXJJZCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBwbGF5ZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgcGxheWVyTGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSB3ZWJydGMgc291cmNlIGZvciBwbGF5ZXIgc291cmNlIHR5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtPYmplY3QgfCBBcnJheX0gIHNvdXJjZSAgIHdlYnJ0YyBzb3VyY2VcclxuICogQHJldHVybiAgICAge0FycmF5fSAgUGxheWVyIHNvdXJjZSBPYmVqY3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdlbmVyYXRlV2VicnRjVXJscyA9IGZ1bmN0aW9uKHNvdXJjZXMpIHtcclxuICAgIHJldHVybiAoXy5pc0FycmF5KHNvdXJjZXMpID8gc291cmNlcyA6IFtzb3VyY2VzXSkubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpe1xyXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIGlzV2ViUlRDKHNvdXJjZS5ob3N0KSAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XHJcbiAgICAgICAgICAgIHJldHVybiB7ZmlsZSA6IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9cIiArIHNvdXJjZS5zdHJlYW0sIHR5cGUgOiBcIndlYnJ0Y1wiLCBsYWJlbCA6IHNvdXJjZS5sYWJlbCA/IHNvdXJjZS5sYWJlbCA6IFwid2VicnRjLVwiKyhpbmRleCsxKSB9O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgT3ZlblBsYXllclNESztcclxuIiwiLyoqIVxuICogYWpheCAtIHYyLjMuMFxuICogQWpheCBtb2R1bGUgaW4gVmFuaWxsYSBKU1xuICogaHR0cHM6Ly9naXRodWIuY29tL2ZkYWNpdWsvYWpheFxuXG4gKiBTdW4gSnVsIDIzIDIwMTcgMTA6NTU6MDkgR01ULTAzMDAgKEJSVClcbiAqIE1JVCAoYykgRmVybmFuZG8gRGFjaXVrXG4gKi9cbiFmdW5jdGlvbihlLHQpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJhamF4XCIsdCk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz10KCk6ZS5hamF4PXQoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGUoZSl7dmFyIHI9W1wiZ2V0XCIsXCJwb3N0XCIsXCJwdXRcIixcImRlbGV0ZVwiXTtyZXR1cm4gZT1lfHx7fSxlLmJhc2VVcmw9ZS5iYXNlVXJsfHxcIlwiLGUubWV0aG9kJiZlLnVybD9uKGUubWV0aG9kLGUuYmFzZVVybCtlLnVybCx0KGUuZGF0YSksZSk6ci5yZWR1Y2UoZnVuY3Rpb24ocixvKXtyZXR1cm4gcltvXT1mdW5jdGlvbihyLHUpe3JldHVybiBuKG8sZS5iYXNlVXJsK3IsdCh1KSxlKX0scn0se30pfWZ1bmN0aW9uIHQoZSl7cmV0dXJuIGV8fG51bGx9ZnVuY3Rpb24gbihlLHQsbix1KXt2YXIgYz1bXCJ0aGVuXCIsXCJjYXRjaFwiLFwiYWx3YXlzXCJdLGk9Yy5yZWR1Y2UoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZVt0XT1mdW5jdGlvbihuKXtyZXR1cm4gZVt0XT1uLGV9LGV9LHt9KSxmPW5ldyBYTUxIdHRwUmVxdWVzdCxkPXIodCxuLGUpO3JldHVybiBmLm9wZW4oZSxkLCEwKSxmLndpdGhDcmVkZW50aWFscz11Lmhhc093blByb3BlcnR5KFwid2l0aENyZWRlbnRpYWxzXCIpLG8oZix1LmhlYWRlcnMpLGYuYWRkRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIixhKGksZiksITEpLGYuc2VuZChzKG4pKSxpLmFib3J0PWZ1bmN0aW9uKCl7cmV0dXJuIGYuYWJvcnQoKX0saX1mdW5jdGlvbiByKGUsdCxuKXtpZihcImdldFwiIT09bi50b0xvd2VyQ2FzZSgpfHwhdClyZXR1cm4gZTt2YXIgcj1zKHQpLG89ZS5pbmRleE9mKFwiP1wiKT4tMT9cIiZcIjpcIj9cIjtyZXR1cm4gZStvK3J9ZnVuY3Rpb24gbyhlLHQpe3Q9dHx8e30sdSh0KXx8KHRbXCJDb250ZW50LVR5cGVcIl09XCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIiksT2JqZWN0LmtleXModCkuZm9yRWFjaChmdW5jdGlvbihuKXt0W25dJiZlLnNldFJlcXVlc3RIZWFkZXIobix0W25dKX0pfWZ1bmN0aW9uIHUoZSl7cmV0dXJuIE9iamVjdC5rZXlzKGUpLnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuXCJjb250ZW50LXR5cGVcIj09PWUudG9Mb3dlckNhc2UoKX0pfWZ1bmN0aW9uIGEoZSx0KXtyZXR1cm4gZnVuY3Rpb24gbigpe3QucmVhZHlTdGF0ZT09PXQuRE9ORSYmKHQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIixuLCExKSxlLmFsd2F5cy5hcHBseShlLGModCkpLHQuc3RhdHVzPj0yMDAmJnQuc3RhdHVzPDMwMD9lLnRoZW4uYXBwbHkoZSxjKHQpKTplW1wiY2F0Y2hcIl0uYXBwbHkoZSxjKHQpKSl9fWZ1bmN0aW9uIGMoZSl7dmFyIHQ7dHJ5e3Q9SlNPTi5wYXJzZShlLnJlc3BvbnNlVGV4dCl9Y2F0Y2gobil7dD1lLnJlc3BvbnNlVGV4dH1yZXR1cm5bdCxlXX1mdW5jdGlvbiBzKGUpe3JldHVybiBpKGUpP2YoZSk6ZX1mdW5jdGlvbiBpKGUpe3JldHVyblwiW29iamVjdCBPYmplY3RdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSl9ZnVuY3Rpb24gZihlKXtyZXR1cm4gT2JqZWN0LmtleXMoZSkucmVkdWNlKGZ1bmN0aW9uKHQsbil7dmFyIHI9dD90K1wiJlwiOlwiXCI7cmV0dXJuIHIrZChuKStcIj1cIitkKGVbbl0pfSxcIlwiKX1mdW5jdGlvbiBkKGUpe3JldHVybiBlbmNvZGVVUklDb21wb25lbnQoZSl9cmV0dXJuIGV9KTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzIHZ0dC5qcyBDb250cmlidXRvcnNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5sZXQgVlRUQ3VlID0gd2luZG93LlZUVEN1ZTtcblxudmFyIGF1dG9LZXl3b3JkID0gXCJhdXRvXCI7XG52YXIgZGlyZWN0aW9uU2V0dGluZyA9IHtcbiAgICBcIlwiOiB0cnVlLFxuICAgIFwibHJcIjogdHJ1ZSxcbiAgICBcInJsXCI6IHRydWVcbn07XG52YXIgYWxpZ25TZXR0aW5nID0ge1xuICAgIFwic3RhcnRcIjogdHJ1ZSxcbiAgICBcIm1pZGRsZVwiOiB0cnVlLFxuICAgIFwiZW5kXCI6IHRydWUsXG4gICAgXCJsZWZ0XCI6IHRydWUsXG4gICAgXCJyaWdodFwiOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBmaW5kRGlyZWN0aW9uU2V0dGluZyh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgZGlyID0gZGlyZWN0aW9uU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXR1cm4gZGlyID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBhbGlnbiA9IGFsaWduU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXR1cm4gYWxpZ24gPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGV4dGVuZChvYmopIHtcbiAgICB2YXIgaSA9IDE7XG4gICAgZm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNvYmogPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gY29iaikge1xuICAgICAgICAgICAgb2JqW3BdID0gY29ialtwXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59XG5pZighVlRUQ3VlKXtcbiAgICBWVFRDdWUgPSBmdW5jdGlvbiAoc3RhcnRUaW1lLCBlbmRUaW1lLCB0ZXh0KSB7XG4gICAgICAgIHZhciBjdWUgPSB0aGlzO1xuICAgICAgICB2YXIgaXNJRTggPSAoL01TSUVcXHM4XFwuMC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIHZhciBiYXNlT2JqID0ge307XG5cbiAgICAgICAgaWYgKGlzSUU4KSB7XG4gICAgICAgICAgICBjdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjdXN0b20nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJhc2VPYmouZW51bWVyYWJsZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hpbSBpbXBsZW1lbnRhdGlvbiBzcGVjaWZpYyBwcm9wZXJ0aWVzLiBUaGVzZSBwcm9wZXJ0aWVzIGFyZSBub3QgaW5cbiAgICAgICAgICogdGhlIHNwZWMuXG4gICAgICAgICAqL1xuXG4gICAgICAgICAgICAvLyBMZXRzIHVzIGtub3cgd2hlbiB0aGUgVlRUQ3VlJ3MgZGF0YSBoYXMgY2hhbmdlZCBpbiBzdWNoIGEgd2F5IHRoYXQgd2UgbmVlZFxuICAgICAgICAgICAgLy8gdG8gcmVjb21wdXRlIGl0cyBkaXNwbGF5IHN0YXRlLiBUaGlzIGxldHMgdXMgY29tcHV0ZSBpdHMgZGlzcGxheSBzdGF0ZVxuICAgICAgICAgICAgLy8gbGF6aWx5LlxuICAgICAgICBjdWUuaGFzQmVlblJlc2V0ID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZUVEN1ZSBhbmQgVGV4dFRyYWNrQ3VlIHByb3BlcnRpZXNcbiAgICAgICAgICogaHR0cDovL2Rldi53My5vcmcvaHRtbDUvd2VidnR0LyN2dHRjdWUtaW50ZXJmYWNlXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBfaWQgPSBcIlwiO1xuICAgICAgICB2YXIgX3BhdXNlT25FeGl0ID0gZmFsc2U7XG4gICAgICAgIHZhciBfc3RhcnRUaW1lID0gc3RhcnRUaW1lO1xuICAgICAgICB2YXIgX2VuZFRpbWUgPSBlbmRUaW1lO1xuICAgICAgICB2YXIgX3RleHQgPSB0ZXh0O1xuICAgICAgICB2YXIgX3JlZ2lvbiA9IG51bGw7XG4gICAgICAgIHZhciBfdmVydGljYWwgPSBcIlwiO1xuICAgICAgICB2YXIgX3NuYXBUb0xpbmVzID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9saW5lID0gXCJhdXRvXCI7XG4gICAgICAgIHZhciBfbGluZUFsaWduID0gXCJzdGFydFwiO1xuICAgICAgICB2YXIgX3Bvc2l0aW9uID0gNTA7XG4gICAgICAgIHZhciBfcG9zaXRpb25BbGlnbiA9IFwibWlkZGxlXCI7XG4gICAgICAgIHZhciBfc2l6ZSA9IDUwO1xuICAgICAgICB2YXIgX2FsaWduID0gXCJtaWRkbGVcIjtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJpZFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2lkO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfaWQgPSBcIlwiICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInBhdXNlT25FeGl0XCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcGF1c2VPbkV4aXQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9wYXVzZU9uRXhpdCA9ICEhdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInN0YXJ0VGltZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN0YXJ0IHRpbWUgbXVzdCBiZSBzZXQgdG8gYSBudW1iZXIuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9zdGFydFRpbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJlbmRUaW1lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfZW5kVGltZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkVuZCB0aW1lIG11c3QgYmUgc2V0IHRvIGEgbnVtYmVyLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfZW5kVGltZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInRleHRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90ZXh0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfdGV4dCA9IFwiXCIgKyB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJyZWdpb25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdpb247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9yZWdpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJ2ZXJ0aWNhbFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZlcnRpY2FsO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmREaXJlY3Rpb25TZXR0aW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSGF2ZSB0byBjaGVjayBmb3IgZmFsc2UgYmVjYXVzZSB0aGUgc2V0dGluZyBhbiBiZSBhbiBlbXB0eSBzdHJpbmcuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfdmVydGljYWwgPSBzZXR0aW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInNuYXBUb0xpbmVzXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc25hcFRvTGluZXM7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9zbmFwVG9MaW5lcyA9ICEhdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwibGluZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgJiYgdmFsdWUgIT09IGF1dG9LZXl3b3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG51bWJlciBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfbGluZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcImxpbmVBbGlnblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmVBbGlnbjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9saW5lQWxpZ24gPSBzZXR0aW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInBvc2l0aW9uXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcG9zaXRpb247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBvc2l0aW9uIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9wb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInBvc2l0aW9uQWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wb3NpdGlvbkFsaWduO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3Bvc2l0aW9uQWxpZ24gPSBzZXR0aW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInNpemVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zaXplO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaXplIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9zaXplID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwiYWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9hbGlnbjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9hbGlnbiA9IHNldHRpbmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE90aGVyIDx0cmFjaz4gc3BlYyBkZWZpbmVkIHByb3BlcnRpZXNcbiAgICAgICAgICovXG5cbiAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3RoZS12aWRlby1lbGVtZW50Lmh0bWwjdGV4dC10cmFjay1jdWUtZGlzcGxheS1zdGF0ZVxuICAgICAgICBjdWUuZGlzcGxheVN0YXRlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChpc0lFOCkge1xuICAgICAgICAgICAgcmV0dXJuIGN1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZUVEN1ZSBtZXRob2RzXG4gICAgICovXG5cbiAgICBWVFRDdWUucHJvdG90eXBlLmdldEN1ZUFzSFRNTCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBBc3N1bWUgV2ViVlRULmNvbnZlcnRDdWVUb0RPTVRyZWUgaXMgb24gdGhlIGdsb2JhbC5cbiAgICAgICAgcmV0dXJuIFdlYlZUVC5jb252ZXJ0Q3VlVG9ET01UcmVlKHdpbmRvdywgdGhpcy50ZXh0KTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBWVFRDdWU7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIEl0IHdhcyByZXBsYWNlIGpxdWVyeSdzIHNlbGVjdG9yLiBJdCBPZnRlbiB1c2VkIGJ5IE92ZW5UZW1wbGF0ZS4gKC92aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUuanMpXHJcbiAqIEBwYXJhbSAgIHNlbGVjdG9yT3JFbGVtZW50ICBzdHJpbmcgb3IgZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IExhJCA9IGZ1bmN0aW9uKHNlbGVjdG9yT3JFbGVtZW50KXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGNvbnN0IHJldHVybk5vZGUgPSBmdW5jdGlvbigkZWxlbWVudCAsIHNlbGVjdG9yKXtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSAgJGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgaWYobm9kZUxpc3QubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCAkZWxlbWVudCA9IFwiXCI7XHJcblxyXG4gICAgaWYoIF8uZXZlcnkoc2VsZWN0b3JPckVsZW1lbnQsIGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBfLmlzRWxlbWVudChpdGVtKX0pKXtcclxuICAgICAgICAkZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xyXG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwiZG9jdW1lbnRcIil7XHJcbiAgICAgICAgJGVsZW1lbnQgPSBkb2N1bWVudDtcclxuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcIndpbmRvd1wiKXtcclxuICAgICAgICAkZWxlbWVudCA9IHdpbmRvdztcclxuICAgIH1lbHNle1xyXG4gICAgICAgICRlbGVtZW50ID0gcmV0dXJuTm9kZShkb2N1bWVudCwgc2VsZWN0b3JPckVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZighJGVsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZmluZCA9IChzZWxlY3RvcikgPT57XHJcbiAgICAgICAgcmV0dXJuIExhJChyZXR1cm5Ob2RlKCRlbGVtZW50LCBzZWxlY3RvcikpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNzcyA9IChuYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hZGRDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9ICRlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGlmKGNsYXNzTmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIFwiICsgbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2xhc3MgPSAobmFtZSkgPT57XHJcbiAgICAgICAgaWYgKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSA9ICRlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBuYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQXR0cmlidXRlID0gKGF0dHJOYW1lKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zaG93ID0gKCkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGlkZSA9ICgpID0+e1xyXG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWxDb2RlKSA9PntcclxuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgKz0gaHRtbENvZGU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQudGV4dCA9ICh0ZXh0KSA9PiB7IC8vSUU4K1xyXG4gICAgICAgIGlmKHRleHQgPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC50ZXh0Q29udGVudDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0Lmh0bWwgPSAodGV4dCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5oYXNDbGFzcyA9IChuYW1lKSA9PiB7IC8vSUU4K1xyXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBuYW1lICsgJyggfCQpJywgJ2dpJykudGVzdCgkZWxlbWVudC5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXMgPSAoJHRhcmdldEVsZW1lbnQpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQgPT09ICR0YXJnZXRFbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0Lm9mZnNldCA9ICgpID0+eyAgICAvL0lFOCtcclxuICAgICAgICB2YXIgcmVjdCA9ICRlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC53aWR0aCA9ICgpID0+IHsgICAgLy9JRTgrXHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmhlaWdodCA9ICgpID0+IHsgICAvL0lFOCtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmF0dHIgPSAoYXR0cikgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVwbGFjZSA9IChodG1sKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVwbGFjZVdpdGgoaHRtbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWwpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5hcHBlbmRDaGlsZChodG1sKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2hpbGQgPSAoKSA9PiB7XHJcbiAgICAgICAgd2hpbGUgKCRlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDaGlsZCgkZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jbG9zZXN0ID0gKHNlbGVjdG9yU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgbGV0IGNsb3Nlc3RFbGVtZW50ID0gJGVsZW1lbnQuY2xvc2VzdChzZWxlY3RvclN0cmluZyk7XHJcbiAgICAgICAgaWYoY2xvc2VzdEVsZW1lbnQpe1xyXG4gICAgICAgICAgICByZXR1cm4gTGEkKGNsb3Nlc3RFbGVtZW50KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhJDtcclxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMjQuLlxuICovXG5cbmNvbnN0IGxvZ2dlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBwcmV2Q29uc29sZUxvZyA9IG51bGw7XG5cbiAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogd2luZG93Wydjb25zb2xlJ11bJ2xvZyddfTtcblxuICAgIHRoYXQuZW5hYmxlID0gKCkgPT57XG4gICAgICAgIGlmKHByZXZDb25zb2xlTG9nID09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IHByZXZDb25zb2xlTG9nO1xuICAgIH07XG4gICAgdGhhdC5kaXNhYmxlID0gKCkgPT57XG4gICAgICAgIHByZXZDb25zb2xlTG9nID0gY29uc29sZS5sb2c7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IGZ1bmN0aW9uKCl7fTtcbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyOyIsImltcG9ydCBfIGZyb20gJy4vdW5kZXJzY29yZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdHJpbShzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0cmFjdEV4dGVuc2lvblxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSBwYXRoIGZvciB1cmxcclxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHRlbnNpb24gPSBmdW5jdGlvbihwYXRoKSB7XHJcbiAgICBpZighcGF0aCB8fCBwYXRoLnN1YnN0cigwLDQpPT0ncnRtcCcpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKSB7XHJcbiAgICAgICAgbGV0IGV4dGVuc2lvbiA9IFwiXCI7XHJcbiAgICAgICAgaWYgKCgvWygsXWZvcm1hdD1tcGQtL2kpLnRlc3QocGF0aCkpIHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ21wZCc7XHJcbiAgICAgICAgfWVsc2UgaWYgKCgvWygsXWZvcm1hdD1tM3U4LS9pKS50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtM3U4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYXp1cmVkRm9ybWF0ID0gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpO1xyXG4gICAgaWYoYXp1cmVkRm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIGF6dXJlZEZvcm1hdDtcclxuICAgIH1cclxuICAgIHBhdGggPSBwYXRoLnNwbGl0KCc/JylbMF0uc3BsaXQoJyMnKVswXTtcclxuICAgIGlmKHBhdGgubGFzdEluZGV4T2YoJy4nKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy4nKSArIDEsIHBhdGgubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIG5hdHVyYWxIbXNcclxuICpcclxuICogQHBhcmFtICAgICAge251bWJlciB8IHN0cmluZ30gIHNlY29uZCAgVGhlIHNlY29uZFxyXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgZm9ybWF0dGVkIFN0cmluZ1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5hdHVyYWxIbXMoc2Vjb25kKSB7XHJcbiAgICBsZXQgc2VjTnVtID0gcGFyc2VJbnQoc2Vjb25kLCAxMCk7XHJcbiAgICBpZighc2Vjb25kKXtcclxuICAgICAgICByZXR1cm4gXCItLTotLVwiO1xyXG4gICAgfVxyXG4gICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xyXG4gICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XHJcbiAgICBsZXQgc2Vjb25kcyA9IHNlY051bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XHJcblxyXG4gICAgaWYgKGhvdXJzID4gMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cclxuICAgIGlmIChzZWNvbmRzIDwgMTApIHtzZWNvbmRzID0gXCIwXCIrc2Vjb25kczt9XHJcblxyXG4gICAgaWYgKGhvdXJzID4gMCkge1xyXG4gICAgICAgIHJldHVybiBob3VycysnOicrbWludXRlcysnOicrc2Vjb25kcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG1pbnV0ZXMrJzonK3NlY29uZHM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaG1zVG9TZWNvbmQoc3RyLCBmcmFtZVJhdGUpIHtcclxuICAgIGlmKCFzdHIpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGlmKF8uaXNOdW1iZXIoc3RyKSAmJiAhXy5pc05hTihzdHIpKXtcclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoJywnLCAnLicpO1xyXG4gICAgbGV0IGFyciA9IHN0ci5zcGxpdCgnOicpO1xyXG4gICAgbGV0IGFyckxlbmd0aCA9IGFyci5sZW5ndGg7XHJcbiAgICBsZXQgc2VjID0gMDtcclxuICAgIGlmIChzdHIuc2xpY2UoLTEpID09PSAncycpe1xyXG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKTtcclxuICAgIH1lbHNlIGlmIChzdHIuc2xpY2UoLTEpID09PSAnbScpe1xyXG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKSAqIDYwO1xyXG4gICAgfWVsc2UgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdoJyl7XHJcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpICogMzYwMDtcclxuICAgIH1lbHNlIGlmIChhcnJMZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdmFyIHNlY0luZGV4ID0gYXJyTGVuZ3RoIC0gMTtcclxuICAgICAgICBpZiAoYXJyTGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgICAgIGlmIChmcmFtZVJhdGUpIHtcclxuICAgICAgICAgICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4XSkgLyBmcmFtZVJhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VjSW5kZXggLT0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4XSk7XHJcbiAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4IC0gMV0pICogNjA7XHJcbiAgICAgICAgaWYgKGFyckxlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleCAtIDJdKSAqIDM2MDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cik7XHJcbiAgICB9XHJcbiAgICBpZiAoXy5pc05hTihzZWMpKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VjO1xyXG59IiwiLy8gICAgIFVuZGVyc2NvcmUuanMgMS45LjFcclxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXHJcbi8vICAgICAoYykgMjAwOS0yMDE4IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXHJcbi8vICAgICBVbmRlcnNjb3JlIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG4hZnVuY3Rpb24oKXt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZiYmc2VsZnx8XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbCYmZ2xvYmFsfHx0aGlzfHx7fSxyPW4uXyxlPUFycmF5LnByb3RvdHlwZSxvPU9iamVjdC5wcm90b3R5cGUscz1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sP1N5bWJvbC5wcm90b3R5cGU6bnVsbCx1PWUucHVzaCxjPWUuc2xpY2UscD1vLnRvU3RyaW5nLGk9by5oYXNPd25Qcm9wZXJ0eSx0PUFycmF5LmlzQXJyYXksYT1PYmplY3Qua2V5cyxsPU9iamVjdC5jcmVhdGUsZj1mdW5jdGlvbigpe30saD1mdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIGg/bjp0aGlzIGluc3RhbmNlb2YgaD92b2lkKHRoaXMuX3dyYXBwZWQ9bik6bmV3IGgobil9O1widW5kZWZpbmVkXCI9PXR5cGVvZiBleHBvcnRzfHxleHBvcnRzLm5vZGVUeXBlP24uXz1oOihcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUuZXhwb3J0cyYmKGV4cG9ydHM9bW9kdWxlLmV4cG9ydHM9aCksZXhwb3J0cy5fPWgpLGguVkVSU0lPTj1cIjEuOS4xXCI7dmFyIHYseT1mdW5jdGlvbih1LGksbil7aWYodm9pZCAwPT09aSlyZXR1cm4gdTtzd2l0Y2gobnVsbD09bj8zOm4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHUuY2FsbChpLG4pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gdS5jYWxsKGksbixyLHQpfTtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB1LmNhbGwoaSxuLHIsdCxlKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHUuYXBwbHkoaSxhcmd1bWVudHMpfX0sZD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguaXRlcmF0ZWUhPT12P2guaXRlcmF0ZWUobixyKTpudWxsPT1uP2guaWRlbnRpdHk6aC5pc0Z1bmN0aW9uKG4pP3kobixyLHQpOmguaXNPYmplY3QobikmJiFoLmlzQXJyYXkobik/aC5tYXRjaGVyKG4pOmgucHJvcGVydHkobil9O2guaXRlcmF0ZWU9dj1mdW5jdGlvbihuLHIpe3JldHVybiBkKG4sciwxLzApfTt2YXIgZz1mdW5jdGlvbih1LGkpe3JldHVybiBpPW51bGw9PWk/dS5sZW5ndGgtMToraSxmdW5jdGlvbigpe2Zvcih2YXIgbj1NYXRoLm1heChhcmd1bWVudHMubGVuZ3RoLWksMCkscj1BcnJheShuKSx0PTA7dDxuO3QrKylyW3RdPWFyZ3VtZW50c1t0K2ldO3N3aXRjaChpKXtjYXNlIDA6cmV0dXJuIHUuY2FsbCh0aGlzLHIpO2Nhc2UgMTpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLHIpO2Nhc2UgMjpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLGFyZ3VtZW50c1sxXSxyKX12YXIgZT1BcnJheShpKzEpO2Zvcih0PTA7dDxpO3QrKyllW3RdPWFyZ3VtZW50c1t0XTtyZXR1cm4gZVtpXT1yLHUuYXBwbHkodGhpcyxlKX19LG09ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJue307aWYobClyZXR1cm4gbChuKTtmLnByb3RvdHlwZT1uO3ZhciByPW5ldyBmO3JldHVybiBmLnByb3RvdHlwZT1udWxsLHJ9LGI9ZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP3ZvaWQgMDpuW3JdfX0saj1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsIT1uJiZpLmNhbGwobixyKX0seD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7aWYobnVsbD09bilyZXR1cm47bj1uW3JbZV1dfXJldHVybiB0P246dm9pZCAwfSxfPU1hdGgucG93KDIsNTMpLTEsQT1iKFwibGVuZ3RoXCIpLHc9ZnVuY3Rpb24obil7dmFyIHI9QShuKTtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgciYmMDw9ciYmcjw9X307aC5lYWNoPWguZm9yRWFjaD1mdW5jdGlvbihuLHIsdCl7dmFyIGUsdTtpZihyPXkocix0KSx3KG4pKWZvcihlPTAsdT1uLmxlbmd0aDtlPHU7ZSsrKXIobltlXSxlLG4pO2Vsc2V7dmFyIGk9aC5rZXlzKG4pO2ZvcihlPTAsdT1pLmxlbmd0aDtlPHU7ZSsrKXIobltpW2VdXSxpW2VdLG4pfXJldHVybiBufSxoLm1hcD1oLmNvbGxlY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPUFycmF5KHUpLG89MDtvPHU7bysrKXt2YXIgYT1lP2Vbb106bztpW29dPXIoblthXSxhLG4pfXJldHVybiBpfTt2YXIgTz1mdW5jdGlvbihjKXtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9Mzw9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9IXcobikmJmgua2V5cyhuKSxpPSh1fHxuKS5sZW5ndGgsbz0wPGM/MDppLTE7Zm9yKGV8fCh0PW5bdT91W29dOm9dLG8rPWMpOzA8PW8mJm88aTtvKz1jKXt2YXIgYT11P3Vbb106bzt0PXIodCxuW2FdLGEsbil9cmV0dXJuIHR9KG4seShyLGUsNCksdCx1KX19O2gucmVkdWNlPWguZm9sZGw9aC5pbmplY3Q9TygxKSxoLnJlZHVjZVJpZ2h0PWguZm9sZHI9TygtMSksaC5maW5kPWguZGV0ZWN0PWZ1bmN0aW9uKG4scix0KXt2YXIgZT0odyhuKT9oLmZpbmRJbmRleDpoLmZpbmRLZXkpKG4scix0KTtpZih2b2lkIDAhPT1lJiYtMSE9PWUpcmV0dXJuIG5bZV19LGguZmlsdGVyPWguc2VsZWN0PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT1bXTtyZXR1cm4gZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe2UobixyLHQpJiZ1LnB1c2gobil9KSx1fSxoLnJlamVjdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguZmlsdGVyKG4saC5uZWdhdGUoZChyKSksdCl9LGguZXZlcnk9aC5hbGw9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYoIXIobltvXSxvLG4pKXJldHVybiExfXJldHVybiEwfSxoLnNvbWU9aC5hbnk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYocihuW29dLG8sbikpcmV0dXJuITB9cmV0dXJuITF9LGguY29udGFpbnM9aC5pbmNsdWRlcz1oLmluY2x1ZGU9ZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSwoXCJudW1iZXJcIiE9dHlwZW9mIHR8fGUpJiYodD0wKSwwPD1oLmluZGV4T2YobixyLHQpfSxoLmludm9rZT1nKGZ1bmN0aW9uKG4sdCxlKXt2YXIgdSxpO3JldHVybiBoLmlzRnVuY3Rpb24odCk/aT10OmguaXNBcnJheSh0KSYmKHU9dC5zbGljZSgwLC0xKSx0PXRbdC5sZW5ndGgtMV0pLGgubWFwKG4sZnVuY3Rpb24obil7dmFyIHI9aTtpZighcil7aWYodSYmdS5sZW5ndGgmJihuPXgobix1KSksbnVsbD09bilyZXR1cm47cj1uW3RdfXJldHVybiBudWxsPT1yP3I6ci5hcHBseShuLGUpfSl9KSxoLnBsdWNrPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgubWFwKG4saC5wcm9wZXJ0eShyKSl9LGgud2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maWx0ZXIobixoLm1hdGNoZXIocikpfSxoLmZpbmRXaGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbmQobixoLm1hdGNoZXIocikpfSxoLm1heD1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPS0xLzAsbz0tMS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJmk8dCYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7dT1lKG4scix0KSwobzx1fHx1PT09LTEvMCYmaT09PS0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5taW49ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0xLzAsbz0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmdDxpJiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXsoKHU9ZShuLHIsdCkpPG98fHU9PT0xLzAmJmk9PT0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5zaHVmZmxlPWZ1bmN0aW9uKG4pe3JldHVybiBoLnNhbXBsZShuLDEvMCl9LGguc2FtcGxlPWZ1bmN0aW9uKG4scix0KXtpZihudWxsPT1yfHx0KXJldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksbltoLnJhbmRvbShuLmxlbmd0aC0xKV07dmFyIGU9dyhuKT9oLmNsb25lKG4pOmgudmFsdWVzKG4pLHU9QShlKTtyPU1hdGgubWF4KE1hdGgubWluKHIsdSksMCk7Zm9yKHZhciBpPXUtMSxvPTA7bzxyO28rKyl7dmFyIGE9aC5yYW5kb20obyxpKSxjPWVbb107ZVtvXT1lW2FdLGVbYV09Y31yZXR1cm4gZS5zbGljZSgwLHIpfSxoLnNvcnRCeT1mdW5jdGlvbihuLGUscil7dmFyIHU9MDtyZXR1cm4gZT1kKGUsciksaC5wbHVjayhoLm1hcChuLGZ1bmN0aW9uKG4scix0KXtyZXR1cm57dmFsdWU6bixpbmRleDp1KyssY3JpdGVyaWE6ZShuLHIsdCl9fSkuc29ydChmdW5jdGlvbihuLHIpe3ZhciB0PW4uY3JpdGVyaWEsZT1yLmNyaXRlcmlhO2lmKHQhPT1lKXtpZihlPHR8fHZvaWQgMD09PXQpcmV0dXJuIDE7aWYodDxlfHx2b2lkIDA9PT1lKXJldHVybi0xfXJldHVybiBuLmluZGV4LXIuaW5kZXh9KSxcInZhbHVlXCIpfTt2YXIgaz1mdW5jdGlvbihvLHIpe3JldHVybiBmdW5jdGlvbihlLHUsbil7dmFyIGk9cj9bW10sW11dOnt9O3JldHVybiB1PWQodSxuKSxoLmVhY2goZSxmdW5jdGlvbihuLHIpe3ZhciB0PXUobixyLGUpO28oaSxuLHQpfSksaX19O2guZ3JvdXBCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSksaC5pbmRleEJ5PWsoZnVuY3Rpb24obixyLHQpe25bdF09cn0pLGguY291bnRCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XSsrOm5bdF09MX0pO3ZhciBTPS9bXlxcdWQ4MDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkZmZmXS9nO2gudG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbj9oLmlzQXJyYXkobik/Yy5jYWxsKG4pOmguaXNTdHJpbmcobik/bi5tYXRjaChTKTp3KG4pP2gubWFwKG4saC5pZGVudGl0eSk6aC52YWx1ZXMobik6W119LGguc2l6ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj8wOncobik/bi5sZW5ndGg6aC5rZXlzKG4pLmxlbmd0aH0saC5wYXJ0aXRpb249ayhmdW5jdGlvbihuLHIsdCl7blt0PzA6MV0ucHVzaChyKX0sITApLGguZmlyc3Q9aC5oZWFkPWgudGFrZT1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uWzBdOmguaW5pdGlhbChuLG4ubGVuZ3RoLXIpfSxoLmluaXRpYWw9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobiwwLE1hdGgubWF4KDAsbi5sZW5ndGgtKG51bGw9PXJ8fHQ/MTpyKSkpfSxoLmxhc3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/bltuLmxlbmd0aC0xXTpoLnJlc3QobixNYXRoLm1heCgwLG4ubGVuZ3RoLXIpKX0saC5yZXN0PWgudGFpbD1oLmRyb3A9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobixudWxsPT1yfHx0PzE6cil9LGguY29tcGFjdD1mdW5jdGlvbihuKXtyZXR1cm4gaC5maWx0ZXIobixCb29sZWFuKX07dmFyIE09ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PShlPWV8fFtdKS5sZW5ndGgsaT0wLG89QShuKTtpPG87aSsrKXt2YXIgYT1uW2ldO2lmKHcoYSkmJihoLmlzQXJyYXkoYSl8fGguaXNBcmd1bWVudHMoYSkpKWlmKHIpZm9yKHZhciBjPTAsbD1hLmxlbmd0aDtjPGw7KWVbdSsrXT1hW2MrK107ZWxzZSBNKGEscix0LGUpLHU9ZS5sZW5ndGg7ZWxzZSB0fHwoZVt1KytdPWEpfXJldHVybiBlfTtoLmZsYXR0ZW49ZnVuY3Rpb24obixyKXtyZXR1cm4gTShuLHIsITEpfSxoLndpdGhvdXQ9ZyhmdW5jdGlvbihuLHIpe3JldHVybiBoLmRpZmZlcmVuY2UobixyKX0pLGgudW5pcT1oLnVuaXF1ZT1mdW5jdGlvbihuLHIsdCxlKXtoLmlzQm9vbGVhbihyKXx8KGU9dCx0PXIscj0hMSksbnVsbCE9dCYmKHQ9ZCh0LGUpKTtmb3IodmFyIHU9W10saT1bXSxvPTAsYT1BKG4pO288YTtvKyspe3ZhciBjPW5bb10sbD10P3QoYyxvLG4pOmM7ciYmIXQ/KG8mJmk9PT1sfHx1LnB1c2goYyksaT1sKTp0P2guY29udGFpbnMoaSxsKXx8KGkucHVzaChsKSx1LnB1c2goYykpOmguY29udGFpbnModSxjKXx8dS5wdXNoKGMpfXJldHVybiB1fSxoLnVuaW9uPWcoZnVuY3Rpb24obil7cmV0dXJuIGgudW5pcShNKG4sITAsITApKX0pLGguaW50ZXJzZWN0aW9uPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1bXSx0PWFyZ3VtZW50cy5sZW5ndGgsZT0wLHU9QShuKTtlPHU7ZSsrKXt2YXIgaT1uW2VdO2lmKCFoLmNvbnRhaW5zKHIsaSkpe3ZhciBvO2ZvcihvPTE7bzx0JiZoLmNvbnRhaW5zKGFyZ3VtZW50c1tvXSxpKTtvKyspO289PT10JiZyLnB1c2goaSl9fXJldHVybiByfSxoLmRpZmZlcmVuY2U9ZyhmdW5jdGlvbihuLHIpe3JldHVybiByPU0ociwhMCwhMCksaC5maWx0ZXIobixmdW5jdGlvbihuKXtyZXR1cm4haC5jb250YWlucyhyLG4pfSl9KSxoLnVuemlwPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1uJiZoLm1heChuLEEpLmxlbmd0aHx8MCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aC5wbHVjayhuLGUpO3JldHVybiB0fSxoLnppcD1nKGgudW56aXApLGgub2JqZWN0PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXt9LGU9MCx1PUEobik7ZTx1O2UrKylyP3RbbltlXV09cltlXTp0W25bZV1bMF1dPW5bZV1bMV07cmV0dXJuIHR9O3ZhciBGPWZ1bmN0aW9uKGkpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPUEobiksdT0wPGk/MDplLTE7MDw9dSYmdTxlO3UrPWkpaWYocihuW3VdLHUsbikpcmV0dXJuIHU7cmV0dXJuLTF9fTtoLmZpbmRJbmRleD1GKDEpLGguZmluZExhc3RJbmRleD1GKC0xKSxoLnNvcnRlZEluZGV4PWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0odD1kKHQsZSwxKSkociksaT0wLG89QShuKTtpPG87KXt2YXIgYT1NYXRoLmZsb29yKChpK28pLzIpO3QoblthXSk8dT9pPWErMTpvPWF9cmV0dXJuIGl9O3ZhciBFPWZ1bmN0aW9uKGksbyxhKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3ZhciBlPTAsdT1BKG4pO2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KTA8aT9lPTA8PXQ/dDpNYXRoLm1heCh0K3UsZSk6dT0wPD10P01hdGgubWluKHQrMSx1KTp0K3UrMTtlbHNlIGlmKGEmJnQmJnUpcmV0dXJuIG5bdD1hKG4scildPT09cj90Oi0xO2lmKHIhPXIpcmV0dXJuIDA8PSh0PW8oYy5jYWxsKG4sZSx1KSxoLmlzTmFOKSk/dCtlOi0xO2Zvcih0PTA8aT9lOnUtMTswPD10JiZ0PHU7dCs9aSlpZihuW3RdPT09cilyZXR1cm4gdDtyZXR1cm4tMX19O2guaW5kZXhPZj1FKDEsaC5maW5kSW5kZXgsaC5zb3J0ZWRJbmRleCksaC5sYXN0SW5kZXhPZj1FKC0xLGguZmluZExhc3RJbmRleCksaC5yYW5nZT1mdW5jdGlvbihuLHIsdCl7bnVsbD09ciYmKHI9bnx8MCxuPTApLHR8fCh0PXI8bj8tMToxKTtmb3IodmFyIGU9TWF0aC5tYXgoTWF0aC5jZWlsKChyLW4pL3QpLDApLHU9QXJyYXkoZSksaT0wO2k8ZTtpKyssbis9dCl1W2ldPW47cmV0dXJuIHV9LGguY2h1bms9ZnVuY3Rpb24obixyKXtpZihudWxsPT1yfHxyPDEpcmV0dXJuW107Zm9yKHZhciB0PVtdLGU9MCx1PW4ubGVuZ3RoO2U8dTspdC5wdXNoKGMuY2FsbChuLGUsZSs9cikpO3JldHVybiB0fTt2YXIgTj1mdW5jdGlvbihuLHIsdCxlLHUpe2lmKCEoZSBpbnN0YW5jZW9mIHIpKXJldHVybiBuLmFwcGx5KHQsdSk7dmFyIGk9bShuLnByb3RvdHlwZSksbz1uLmFwcGx5KGksdSk7cmV0dXJuIGguaXNPYmplY3Qobyk/bzppfTtoLmJpbmQ9ZyhmdW5jdGlvbihyLHQsZSl7aWYoIWguaXNGdW5jdGlvbihyKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uXCIpO3ZhciB1PWcoZnVuY3Rpb24obil7cmV0dXJuIE4ocix1LHQsdGhpcyxlLmNvbmNhdChuKSl9KTtyZXR1cm4gdX0pLGgucGFydGlhbD1nKGZ1bmN0aW9uKHUsaSl7dmFyIG89aC5wYXJ0aWFsLnBsYWNlaG9sZGVyLGE9ZnVuY3Rpb24oKXtmb3IodmFyIG49MCxyPWkubGVuZ3RoLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1pW2VdPT09bz9hcmd1bWVudHNbbisrXTppW2VdO2Zvcig7bjxhcmd1bWVudHMubGVuZ3RoOyl0LnB1c2goYXJndW1lbnRzW24rK10pO3JldHVybiBOKHUsYSx0aGlzLHRoaXMsdCl9O3JldHVybiBhfSksKGgucGFydGlhbC5wbGFjZWhvbGRlcj1oKS5iaW5kQWxsPWcoZnVuY3Rpb24obixyKXt2YXIgdD0ocj1NKHIsITEsITEpKS5sZW5ndGg7aWYodDwxKXRocm93IG5ldyBFcnJvcihcImJpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXNcIik7Zm9yKDt0LS07KXt2YXIgZT1yW3RdO25bZV09aC5iaW5kKG5bZV0sbil9fSksaC5tZW1vaXplPWZ1bmN0aW9uKGUsdSl7dmFyIGk9ZnVuY3Rpb24obil7dmFyIHI9aS5jYWNoZSx0PVwiXCIrKHU/dS5hcHBseSh0aGlzLGFyZ3VtZW50cyk6bik7cmV0dXJuIGoocix0KXx8KHJbdF09ZS5hcHBseSh0aGlzLGFyZ3VtZW50cykpLHJbdF19O3JldHVybiBpLmNhY2hlPXt9LGl9LGguZGVsYXk9ZyhmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gbi5hcHBseShudWxsLHQpfSxyKX0pLGguZGVmZXI9aC5wYXJ0aWFsKGguZGVsYXksaCwxKSxoLnRocm90dGxlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGEsYyxsPTA7dXx8KHU9e30pO3ZhciBmPWZ1bmN0aW9uKCl7bD0hMT09PXUubGVhZGluZz8wOmgubm93KCksaT1udWxsLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCl9LG49ZnVuY3Rpb24oKXt2YXIgbj1oLm5vdygpO2x8fCExIT09dS5sZWFkaW5nfHwobD1uKTt2YXIgcj1lLShuLWwpO3JldHVybiBvPXRoaXMsYT1hcmd1bWVudHMscjw9MHx8ZTxyPyhpJiYoY2xlYXJUaW1lb3V0KGkpLGk9bnVsbCksbD1uLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCkpOml8fCExPT09dS50cmFpbGluZ3x8KGk9c2V0VGltZW91dChmLHIpKSxjfTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksbD0wLGk9bz1hPW51bGx9LG59LGguZGVib3VuY2U9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYT1mdW5jdGlvbihuLHIpe2k9bnVsbCxyJiYobz10LmFwcGx5KG4scikpfSxuPWcoZnVuY3Rpb24obil7aWYoaSYmY2xlYXJUaW1lb3V0KGkpLHUpe3ZhciByPSFpO2k9c2V0VGltZW91dChhLGUpLHImJihvPXQuYXBwbHkodGhpcyxuKSl9ZWxzZSBpPWguZGVsYXkoYSxlLHRoaXMsbik7cmV0dXJuIG99KTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksaT1udWxsfSxufSxoLndyYXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5wYXJ0aWFsKHIsbil9LGgubmVnYXRlPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiFuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguY29tcG9zZT1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxlPXQubGVuZ3RoLTE7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPWUscj10W2VdLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtuLS07KXI9dFtuXS5jYWxsKHRoaXMscik7cmV0dXJuIHJ9fSxoLmFmdGVyPWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKCl7aWYoLS1uPDEpcmV0dXJuIHIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5iZWZvcmU9ZnVuY3Rpb24obixyKXt2YXIgdDtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gMDwtLW4mJih0PXIuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxuPD0xJiYocj1udWxsKSx0fX0saC5vbmNlPWgucGFydGlhbChoLmJlZm9yZSwyKSxoLnJlc3RBcmd1bWVudHM9Zzt2YXIgST0he3RvU3RyaW5nOm51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIiksVD1bXCJ2YWx1ZU9mXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJ0b1N0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImhhc093blByb3BlcnR5XCIsXCJ0b0xvY2FsZVN0cmluZ1wiXSxCPWZ1bmN0aW9uKG4scil7dmFyIHQ9VC5sZW5ndGgsZT1uLmNvbnN0cnVjdG9yLHU9aC5pc0Z1bmN0aW9uKGUpJiZlLnByb3RvdHlwZXx8byxpPVwiY29uc3RydWN0b3JcIjtmb3IoaihuLGkpJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSk7dC0tOykoaT1UW3RdKWluIG4mJm5baV0hPT11W2ldJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSl9O2gua2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTtpZihhKXJldHVybiBhKG4pO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWoobix0KSYmci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC5hbGxLZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKXIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGgudmFsdWVzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09bltyW3VdXTtyZXR1cm4gZX0saC5tYXBPYmplY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1oLmtleXMobiksdT1lLmxlbmd0aCxpPXt9LG89MDtvPHU7bysrKXt2YXIgYT1lW29dO2lbYV09cihuW2FdLGEsbil9cmV0dXJuIGl9LGgucGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1bclt1XSxuW3JbdV1dXTtyZXR1cm4gZX0saC5pbnZlcnQ9ZnVuY3Rpb24obil7Zm9yKHZhciByPXt9LHQ9aC5rZXlzKG4pLGU9MCx1PXQubGVuZ3RoO2U8dTtlKyspcltuW3RbZV1dXT10W2VdO3JldHVybiByfSxoLmZ1bmN0aW9ucz1oLm1ldGhvZHM9ZnVuY3Rpb24obil7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paC5pc0Z1bmN0aW9uKG5bdF0pJiZyLnB1c2godCk7cmV0dXJuIHIuc29ydCgpfTt2YXIgUj1mdW5jdGlvbihjLGwpe3JldHVybiBmdW5jdGlvbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO2lmKGwmJihuPU9iamVjdChuKSkscjwyfHxudWxsPT1uKXJldHVybiBuO2Zvcih2YXIgdD0xO3Q8cjt0KyspZm9yKHZhciBlPWFyZ3VtZW50c1t0XSx1PWMoZSksaT11Lmxlbmd0aCxvPTA7bzxpO28rKyl7dmFyIGE9dVtvXTtsJiZ2b2lkIDAhPT1uW2FdfHwoblthXT1lW2FdKX1yZXR1cm4gbn19O2guZXh0ZW5kPVIoaC5hbGxLZXlzKSxoLmV4dGVuZE93bj1oLmFzc2lnbj1SKGgua2V5cyksaC5maW5kS2V5PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGUsdT1oLmtleXMobiksaT0wLG89dS5sZW5ndGg7aTxvO2krKylpZihyKG5bZT11W2ldXSxlLG4pKXJldHVybiBlfTt2YXIgcSxLLHo9ZnVuY3Rpb24obixyLHQpe3JldHVybiByIGluIHR9O2gucGljaz1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9e30sZT1yWzBdO2lmKG51bGw9PW4pcmV0dXJuIHQ7aC5pc0Z1bmN0aW9uKGUpPygxPHIubGVuZ3RoJiYoZT15KGUsclsxXSkpLHI9aC5hbGxLZXlzKG4pKTooZT16LHI9TShyLCExLCExKSxuPU9iamVjdChuKSk7Zm9yKHZhciB1PTAsaT1yLmxlbmd0aDt1PGk7dSsrKXt2YXIgbz1yW3VdLGE9bltvXTtlKGEsbyxuKSYmKHRbb109YSl9cmV0dXJuIHR9KSxoLm9taXQ9ZyhmdW5jdGlvbihuLHQpe3ZhciByLGU9dFswXTtyZXR1cm4gaC5pc0Z1bmN0aW9uKGUpPyhlPWgubmVnYXRlKGUpLDE8dC5sZW5ndGgmJihyPXRbMV0pKToodD1oLm1hcChNKHQsITEsITEpLFN0cmluZyksZT1mdW5jdGlvbihuLHIpe3JldHVybiFoLmNvbnRhaW5zKHQscil9KSxoLnBpY2sobixlLHIpfSksaC5kZWZhdWx0cz1SKGguYWxsS2V5cywhMCksaC5jcmVhdGU9ZnVuY3Rpb24obixyKXt2YXIgdD1tKG4pO3JldHVybiByJiZoLmV4dGVuZE93bih0LHIpLHR9LGguY2xvbmU9ZnVuY3Rpb24obil7cmV0dXJuIGguaXNPYmplY3Qobik/aC5pc0FycmF5KG4pP24uc2xpY2UoKTpoLmV4dGVuZCh7fSxuKTpufSxoLnRhcD1mdW5jdGlvbihuLHIpe3JldHVybiByKG4pLG59LGguaXNNYXRjaD1mdW5jdGlvbihuLHIpe3ZhciB0PWgua2V5cyhyKSxlPXQubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKHZhciB1PU9iamVjdChuKSxpPTA7aTxlO2krKyl7dmFyIG89dFtpXTtpZihyW29dIT09dVtvXXx8IShvIGluIHUpKXJldHVybiExfXJldHVybiEwfSxxPWZ1bmN0aW9uKG4scix0LGUpe2lmKG49PT1yKXJldHVybiAwIT09bnx8MS9uPT0xL3I7aWYobnVsbD09bnx8bnVsbD09cilyZXR1cm4hMTtpZihuIT1uKXJldHVybiByIT1yO3ZhciB1PXR5cGVvZiBuO3JldHVybihcImZ1bmN0aW9uXCI9PT11fHxcIm9iamVjdFwiPT09dXx8XCJvYmplY3RcIj09dHlwZW9mIHIpJiZLKG4scix0LGUpfSxLPWZ1bmN0aW9uKG4scix0LGUpe24gaW5zdGFuY2VvZiBoJiYobj1uLl93cmFwcGVkKSxyIGluc3RhbmNlb2YgaCYmKHI9ci5fd3JhcHBlZCk7dmFyIHU9cC5jYWxsKG4pO2lmKHUhPT1wLmNhbGwocikpcmV0dXJuITE7c3dpdGNoKHUpe2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVyblwiXCIrbj09XCJcIityO2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybituIT0rbj8rciE9K3I6MD09K24/MS8rbj09MS9yOituPT0rcjtjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOnJldHVybituPT0rcjtjYXNlXCJbb2JqZWN0IFN5bWJvbF1cIjpyZXR1cm4gcy52YWx1ZU9mLmNhbGwobik9PT1zLnZhbHVlT2YuY2FsbChyKX12YXIgaT1cIltvYmplY3QgQXJyYXldXCI9PT11O2lmKCFpKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygbnx8XCJvYmplY3RcIiE9dHlwZW9mIHIpcmV0dXJuITE7dmFyIG89bi5jb25zdHJ1Y3RvcixhPXIuY29uc3RydWN0b3I7aWYobyE9PWEmJiEoaC5pc0Z1bmN0aW9uKG8pJiZvIGluc3RhbmNlb2YgbyYmaC5pc0Z1bmN0aW9uKGEpJiZhIGluc3RhbmNlb2YgYSkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHIpcmV0dXJuITF9ZT1lfHxbXTtmb3IodmFyIGM9KHQ9dHx8W10pLmxlbmd0aDtjLS07KWlmKHRbY109PT1uKXJldHVybiBlW2NdPT09cjtpZih0LnB1c2gobiksZS5wdXNoKHIpLGkpe2lmKChjPW4ubGVuZ3RoKSE9PXIubGVuZ3RoKXJldHVybiExO2Zvcig7Yy0tOylpZighcShuW2NdLHJbY10sdCxlKSlyZXR1cm4hMX1lbHNle3ZhciBsLGY9aC5rZXlzKG4pO2lmKGM9Zi5sZW5ndGgsaC5rZXlzKHIpLmxlbmd0aCE9PWMpcmV0dXJuITE7Zm9yKDtjLS07KWlmKGw9ZltjXSwhaihyLGwpfHwhcShuW2xdLHJbbF0sdCxlKSlyZXR1cm4hMX1yZXR1cm4gdC5wb3AoKSxlLnBvcCgpLCEwfSxoLmlzRXF1YWw9ZnVuY3Rpb24obixyKXtyZXR1cm4gcShuLHIpfSxoLmlzRW1wdHk9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW58fCh3KG4pJiYoaC5pc0FycmF5KG4pfHxoLmlzU3RyaW5nKG4pfHxoLmlzQXJndW1lbnRzKG4pKT8wPT09bi5sZW5ndGg6MD09PWgua2V5cyhuKS5sZW5ndGgpfSxoLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4hKCFufHwxIT09bi5ub2RlVHlwZSl9LGguaXNBcnJheT10fHxmdW5jdGlvbihuKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1wLmNhbGwobil9LGguaXNPYmplY3Q9ZnVuY3Rpb24obil7dmFyIHI9dHlwZW9mIG47cmV0dXJuXCJmdW5jdGlvblwiPT09cnx8XCJvYmplY3RcIj09PXImJiEhbn0saC5lYWNoKFtcIkFyZ3VtZW50c1wiLFwiRnVuY3Rpb25cIixcIlN0cmluZ1wiLFwiTnVtYmVyXCIsXCJEYXRlXCIsXCJSZWdFeHBcIixcIkVycm9yXCIsXCJTeW1ib2xcIixcIk1hcFwiLFwiV2Vha01hcFwiLFwiU2V0XCIsXCJXZWFrU2V0XCJdLGZ1bmN0aW9uKHIpe2hbXCJpc1wiK3JdPWZ1bmN0aW9uKG4pe3JldHVybiBwLmNhbGwobik9PT1cIltvYmplY3QgXCIrcitcIl1cIn19KSxoLmlzQXJndW1lbnRzKGFyZ3VtZW50cyl8fChoLmlzQXJndW1lbnRzPWZ1bmN0aW9uKG4pe3JldHVybiBqKG4sXCJjYWxsZWVcIil9KTt2YXIgRD1uLmRvY3VtZW50JiZuLmRvY3VtZW50LmNoaWxkTm9kZXM7XCJmdW5jdGlvblwiIT10eXBlb2YvLi8mJlwib2JqZWN0XCIhPXR5cGVvZiBJbnQ4QXJyYXkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIEQmJihoLmlzRnVuY3Rpb249ZnVuY3Rpb24obil7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbnx8ITF9KSxoLmlzRmluaXRlPWZ1bmN0aW9uKG4pe3JldHVybiFoLmlzU3ltYm9sKG4pJiZpc0Zpbml0ZShuKSYmIWlzTmFOKHBhcnNlRmxvYXQobikpfSxoLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTnVtYmVyKG4pJiZpc05hTihuKX0saC5pc0Jvb2xlYW49ZnVuY3Rpb24obil7cmV0dXJuITA9PT1ufHwhMT09PW58fFwiW29iamVjdCBCb29sZWFuXVwiPT09cC5jYWxsKG4pfSxoLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LGguaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIHZvaWQgMD09PW59LGguaGFzPWZ1bmN0aW9uKG4scil7aWYoIWguaXNBcnJheShyKSlyZXR1cm4gaihuLHIpO2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7dmFyIHU9cltlXTtpZihudWxsPT1ufHwhaS5jYWxsKG4sdSkpcmV0dXJuITE7bj1uW3VdfXJldHVybiEhdH0saC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4uXz1yLHRoaXN9LGguaWRlbnRpdHk9ZnVuY3Rpb24obil7cmV0dXJuIG59LGguY29uc3RhbnQ9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG59fSxoLm5vb3A9ZnVuY3Rpb24oKXt9LGgucHJvcGVydHk9ZnVuY3Rpb24ocil7cmV0dXJuIGguaXNBcnJheShyKT9mdW5jdGlvbihuKXtyZXR1cm4geChuLHIpfTpiKHIpfSxoLnByb3BlcnR5T2Y9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGw9PXI/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKG4pe3JldHVybiBoLmlzQXJyYXkobik/eChyLG4pOnJbbl19fSxoLm1hdGNoZXI9aC5tYXRjaGVzPWZ1bmN0aW9uKHIpe3JldHVybiByPWguZXh0ZW5kT3duKHt9LHIpLGZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTWF0Y2gobixyKX19LGgudGltZXM9ZnVuY3Rpb24obixyLHQpe3ZhciBlPUFycmF5KE1hdGgubWF4KDAsbikpO3I9eShyLHQsMSk7Zm9yKHZhciB1PTA7dTxuO3UrKyllW3VdPXIodSk7cmV0dXJuIGV9LGgucmFuZG9tPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGw9PXImJihyPW4sbj0wKSxuK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooci1uKzEpKX0saC5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9O3ZhciBMPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiN4Mjc7XCIsXCJgXCI6XCImI3g2MDtcIn0sUD1oLmludmVydChMKSxXPWZ1bmN0aW9uKHIpe3ZhciB0PWZ1bmN0aW9uKG4pe3JldHVybiByW25dfSxuPVwiKD86XCIraC5rZXlzKHIpLmpvaW4oXCJ8XCIpK1wiKVwiLGU9UmVnRXhwKG4pLHU9UmVnRXhwKG4sXCJnXCIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbj1udWxsPT1uP1wiXCI6XCJcIituLGUudGVzdChuKT9uLnJlcGxhY2UodSx0KTpufX07aC5lc2NhcGU9VyhMKSxoLnVuZXNjYXBlPVcoUCksaC5yZXN1bHQ9ZnVuY3Rpb24obixyLHQpe2guaXNBcnJheShyKXx8KHI9W3JdKTt2YXIgZT1yLmxlbmd0aDtpZighZSlyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP3QuY2FsbChuKTp0O2Zvcih2YXIgdT0wO3U8ZTt1Kyspe3ZhciBpPW51bGw9PW4/dm9pZCAwOm5bclt1XV07dm9pZCAwPT09aSYmKGk9dCx1PWUpLG49aC5pc0Z1bmN0aW9uKGkpP2kuY2FsbChuKTppfXJldHVybiBufTt2YXIgQz0wO2gudW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHI9KytDK1wiXCI7cmV0dXJuIG4/bityOnJ9LGgudGVtcGxhdGVTZXR0aW5ncz17ZXZhbHVhdGU6LzwlKFtcXHNcXFNdKz8pJT4vZyxpbnRlcnBvbGF0ZTovPCU9KFtcXHNcXFNdKz8pJT4vZyxlc2NhcGU6LzwlLShbXFxzXFxTXSs/KSU+L2d9O3ZhciBKPS8oLileLyxVPXtcIidcIjpcIidcIixcIlxcXFxcIjpcIlxcXFxcIixcIlxcclwiOlwiclwiLFwiXFxuXCI6XCJuXCIsXCJcXHUyMDI4XCI6XCJ1MjAyOFwiLFwiXFx1MjAyOVwiOlwidTIwMjlcIn0sVj0vXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2csJD1mdW5jdGlvbihuKXtyZXR1cm5cIlxcXFxcIitVW25dfTtoLnRlbXBsYXRlPWZ1bmN0aW9uKGksbixyKXshbiYmciYmKG49ciksbj1oLmRlZmF1bHRzKHt9LG4saC50ZW1wbGF0ZVNldHRpbmdzKTt2YXIgdCxlPVJlZ0V4cChbKG4uZXNjYXBlfHxKKS5zb3VyY2UsKG4uaW50ZXJwb2xhdGV8fEopLnNvdXJjZSwobi5ldmFsdWF0ZXx8Sikuc291cmNlXS5qb2luKFwifFwiKStcInwkXCIsXCJnXCIpLG89MCxhPVwiX19wKz0nXCI7aS5yZXBsYWNlKGUsZnVuY3Rpb24obixyLHQsZSx1KXtyZXR1cm4gYSs9aS5zbGljZShvLHUpLnJlcGxhY2UoViwkKSxvPXUrbi5sZW5ndGgscj9hKz1cIicrXFxuKChfX3Q9KFwiK3IrXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI6dD9hKz1cIicrXFxuKChfX3Q9KFwiK3QrXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjplJiYoYSs9XCInO1xcblwiK2UrXCJcXG5fX3ArPSdcIiksbn0pLGErPVwiJztcXG5cIixuLnZhcmlhYmxlfHwoYT1cIndpdGgob2JqfHx7fSl7XFxuXCIrYStcIn1cXG5cIiksYT1cInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIitcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIrYStcInJldHVybiBfX3A7XFxuXCI7dHJ5e3Q9bmV3IEZ1bmN0aW9uKG4udmFyaWFibGV8fFwib2JqXCIsXCJfXCIsYSl9Y2F0Y2gobil7dGhyb3cgbi5zb3VyY2U9YSxufXZhciB1PWZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwodGhpcyxuLGgpfSxjPW4udmFyaWFibGV8fFwib2JqXCI7cmV0dXJuIHUuc291cmNlPVwiZnVuY3Rpb24oXCIrYytcIil7XFxuXCIrYStcIn1cIix1fSxoLmNoYWluPWZ1bmN0aW9uKG4pe3ZhciByPWgobik7cmV0dXJuIHIuX2NoYWluPSEwLHJ9O3ZhciBHPWZ1bmN0aW9uKG4scil7cmV0dXJuIG4uX2NoYWluP2gocikuY2hhaW4oKTpyfTtoLm1peGluPWZ1bmN0aW9uKHQpe3JldHVybiBoLmVhY2goaC5mdW5jdGlvbnModCksZnVuY3Rpb24obil7dmFyIHI9aFtuXT10W25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49W3RoaXMuX3dyYXBwZWRdO3JldHVybiB1LmFwcGx5KG4sYXJndW1lbnRzKSxHKHRoaXMsci5hcHBseShoLG4pKX19KSxofSxoLm1peGluKGgpLGguZWFjaChbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJzcGxpY2VcIixcInVuc2hpZnRcIl0sZnVuY3Rpb24ocil7dmFyIHQ9ZVtyXTtoLnByb3RvdHlwZVtyXT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX3dyYXBwZWQ7cmV0dXJuIHQuYXBwbHkobixhcmd1bWVudHMpLFwic2hpZnRcIiE9PXImJlwic3BsaWNlXCIhPT1yfHwwIT09bi5sZW5ndGh8fGRlbGV0ZSBuWzBdLEcodGhpcyxuKX19KSxoLmVhY2goW1wiY29uY2F0XCIsXCJqb2luXCIsXCJzbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgcj1lW25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIEcodGhpcyxyLmFwcGx5KHRoaXMuX3dyYXBwZWQsYXJndW1lbnRzKSl9fSksaC5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcHBlZH0saC5wcm90b3R5cGUudmFsdWVPZj1oLnByb3RvdHlwZS50b0pTT049aC5wcm90b3R5cGUudmFsdWUsaC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gU3RyaW5nKHRoaXMuX3dyYXBwZWQpfSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShcInVuZGVyc2NvcmVcIixbXSxmdW5jdGlvbigpe3JldHVybiBofSl9KCk7XHJcbiIsImltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbn0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1J0bXAgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3J0bXA6JykgPT0gMCB8fCB0eXBlID09ICdydG1wJyk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc1dlYlJUQyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICBpZihmaWxlKXtcclxuICAgICAgICByZXR1cm4gKGZpbGUuaW5kZXhPZignd3M6JykgPT09IDAgfHwgZmlsZS5pbmRleE9mKCd3c3M6JykgPT09IDAgfHwgdHlwZSA9PT0gJ3dlYnJ0YycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgaXNEYXNoID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIHJldHVybiAoIHR5cGUgPT09ICdtcGQnIHx8ICB0eXBlID09PSAnZGFzaCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2Rhc2greG1sJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtcGQnKTtcclxufTtcclxuIiwiLyoqXG4gKiB1dGlscyBmb3Igd2VicGFja1xuICovXG5cbmV4cG9ydCBjb25zdCBnZXRTY3JpcHRQYXRoID0gZnVuY3Rpb24oc2NyaXB0TmFtZSkge1xuICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHNjcmlwdHNbaV0uc3JjO1xuICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHNyYy5sYXN0SW5kZXhPZignLycgKyBzY3JpcHROYW1lKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHIoMCwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjkuLlxuICovXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IF9fVkVSU0lPTl9fO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==