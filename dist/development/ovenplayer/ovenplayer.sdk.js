/*! OvenPlayerv0.7.795 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        playerConfig = (0, _Configurator2["default"])(options, that);
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
    that.setTimecodeMode = function (isShow) {
        OvenPlayerConsole.log("API : setTimecodeMode()", isShow);
        playerConfig.setTimecodeMode(isShow);
    };
    that.isTimecodeMode = function () {
        OvenPlayerConsole.log("API : isTimecodeMode()");
        return playerConfig.isTimecodeMode();
    };
    that.getFramerate = function () {
        OvenPlayerConsole.log("API : getFramerate()", currentProvider.getFramerate());
        return currentProvider.getFramerate();
    };
    that.seekFrame = function (frameCount) {
        if (!currentProvider) {
            return null;
        }
        OvenPlayerConsole.log("API : seekFrame()", frameCount);
        return currentProvider.seekFrame(frameCount);
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

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This initializes the input options.
 * @param   options
 *
 * */
var Configurator = function Configurator(options, provider) {

    var composeSourceOptions = function composeSourceOptions(options) {
        var Defaults = {
            defaultPlaybackRate: 1,
            playbackRateControls: false,
            playbackRates: [0.25, 0.5, 1, 1.5, 2],
            mute: false,
            volume: 90
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

        var rateControls = config.playbackRateControls;
        if (rateControls) {
            var rates = config.playbackRates;

            if (Array.isArray(rateControls)) {
                rates = rateControls;
            }
            rates = rates.filter(function (rate) {
                return _underscore2["default"].isNumber(rate) && rate >= 0.25 && rate <= 4;
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

        var configPlaylist = config.playlist;
        if (!configPlaylist) {
            var obj = _underscore2["default"].pick(config, ['title', 'description', 'type', 'mediaid', 'image', 'file', 'sources', 'tracks', 'preload', 'duration', 'host', 'application', 'stream']);

            config.playlist = [obj];
        } else if (_underscore2["default"].isArray(configPlaylist.playlist)) {
            config.feedData = configPlaylist;
            config.playlist = configPlaylist.playlist;
        }

        delete config.duration;
        return config;
    };
    OvenPlayerConsole.log("Configurator loaded.", options);
    var config = composeSourceOptions(options);

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
    var isTimecodeMode = config.isTimecodeMode || true;

    var that = {};
    that.getConfig = function () {
        return config;
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

    that.setTimecodeMode = function (isShow) {
        if (isTimecodeMode !== isShow) {
            isTimecodeMode = isShow;
            console.log("CONTENT_TIME_MODE_CHANGEDCONTENT_TIME_MODE_CHANGEDCONTENT_TIME_MODE_CHANGEDCONTENT_TIME_MODE_CHANGED : ", isTimecodeMode);
            provider.trigger(_constants.CONTENT_TIME_MODE_CHANGED, isTimecodeMode);
        }
    };
    that.isTimecodeMode = function () {
        return isTimecodeMode;
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
        if (_underscore2["default"].isArray(playlist_)) {
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

exports["default"] = Configurator;

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
                var _loop = function _loop(i) {
                    var track = playlist.tracks[i];
                    if (isSupport(track.kind) && !_underscore2["default"].findWhere(track, { file: track.file })) {
                        captionLoader.load(track, function (vttCues) {
                            if (vttCues && vttCues.length > 0) {
                                var captionId = bindTrack(track, vttCues);
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
var CONTENT_TIME_MODE_CHANGED = exports.CONTENT_TIME_MODE_CHANGED = "timeDisplayModeChanged";

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
var version = exports.version = '0.7.795-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaUV4cGFuc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9Db25maWd1cmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvU3VwcG9ydENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9jYXB0aW9uL0xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1NydFBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9vdmVucGxheWVyLnNkay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYWpheC5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2NhcHRpb25zL3Z0dEN1ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvbGlrZUEkLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3VuZGVyc2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVyc2lvbi5qcyJdLCJuYW1lcyI6WyJBcGkiLCJjb250YWluZXIiLCJsb2dNYW5hZ2VyIiwidGhhdCIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidmVyc2lvbiIsImNhcHRpb25NYW5hZ2VyIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiaW5pdFByb3ZpZGVyIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImdldFNvdXJjZUxhYmVsIiwibGFiZWwiLCJsb2FkUHJvdmlkZXJzIiwiZ2V0UGxheWxpc3QiLCJ0aGVuIiwiZGVzdHJveSIsImN1cnJlbnRTb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2VzIiwiUHJvdmlkZXJzIiwiZ2V0TmFtZSIsIlBST1ZJREVSX1JUTVAiLCJvbiIsIm5hbWUiLCJkYXRhIiwidHJpZ2dlciIsIkVSUk9SIiwicGFyc2VJbnQiLCJjb2RlIiwiTkVUV09SS19VTlNUQUJMRUQiLCJnZXRDdXJyZW50U291cmNlIiwiZ2V0U291cmNlcyIsInBhdXNlIiwic2V0Q3VycmVudFNvdXJjZSIsInByZWxvYWQiLCJmbHVzaCIsIlJFQURZIiwiZXJyb3IiLCJlcnJvck9iamVjdCIsIklOSVRfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwib2ZmIiwiaW5pdCIsIm9wdGlvbnMiLCJpc0RlYnVnIiwiZGlzYWJsZSIsInNldFBsYXlsaXN0IiwiZ2V0Q29uZmlnIiwic2V0VGltZWNvZGVNb2RlIiwiaXNTaG93IiwiaXNUaW1lY29kZU1vZGUiLCJnZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsImdldFZvbHVtZSIsInNldFZvbHVtZSIsInZvbHVtZSIsInNldE11dGUiLCJzdGF0ZSIsImdldE11dGUiLCJsb2FkIiwicGxheWxpc3QiLCJzZXRDdXJyZW50UXVhbGl0eSIsInBsYXkiLCJzZWVrIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJzZXREZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwic291cmNlSW5kZXgiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwiaXNTYW1lUHJvdmlkZXIiLCJyZXN1bHRTb3VyY2VJbmRleCIsImdldFF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldENhcHRpb25MaXN0IiwiZ2V0Q3VycmVudENhcHRpb24iLCJzZXRDdXJyZW50Q2FwdGlvbiIsImluZGV4IiwiYWRkQ2FwdGlvbiIsInRyYWNrIiwicmVtb3ZlQ2FwdGlvbiIsImdldEJ1ZmZlciIsImdldFN0YXRlIiwic3RvcCIsInJlbW92ZSIsIkRFU1RST1kiLCJPdmVuUGxheWVyU0RLIiwicmVtb3ZlUGxheWVyIiwiZ2V0Q29udGFpbmVySWQiLCJBcGlSdG1wRXhwYW5zaW9uIiwiZXh0ZXJuYWxDYWxsYmFja0NyZWVwIiwicmVzdWx0IiwidHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsIiwiQ29uZmlndXJhdG9yIiwicHJvdmlkZXIiLCJjb21wb3NlU291cmNlT3B0aW9ucyIsIkRlZmF1bHRzIiwiZGVmYXVsdFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZUNvbnRyb2xzIiwicGxheWJhY2tSYXRlcyIsIm11dGUiLCJzZXJpYWxpemUiLCJ2YWwiLCJ1bmRlZmluZWQiLCJsb3dlcmNhc2VWYWwiLCJ0b0xvd2VyQ2FzZSIsImlzTmFOIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsImRlc2VyaWFsaXplIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJub3JtYWxpemVTaXplIiwic2xpY2UiLCJldmFsdWF0ZUFzcGVjdFJhdGlvIiwiYXIiLCJ3aWR0aCIsInRvU3RyaW5nIiwiaW5kZXhPZiIsInRlc3QiLCJ3Iiwic3Vic3RyIiwiaCIsImNvbmZpZyIsInJhdGVDb250cm9scyIsInJhdGVzIiwiQXJyYXkiLCJpc0FycmF5IiwiZmlsdGVyIiwiXyIsImlzTnVtYmVyIiwicmF0ZSIsIm1hcCIsIk1hdGgiLCJyb3VuZCIsInB1c2giLCJzb3J0IiwiY29uZmlnUGxheWxpc3QiLCJvYmoiLCJwaWNrIiwiZmVlZERhdGEiLCJkdXJhdGlvbiIsImRlYnVnIiwiaW1hZ2UiLCJxdWFsaXR5TGFiZWwiLCJzb3VyY2VMYWJlbCIsInJlcGVhdCIsInN0cmV0Y2hpbmciLCJnZXREZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UXVhbGl0eUxhYmVsIiwic2V0UXVhbGl0eUxhYmVsIiwibmV3TGFiZWwiLCJzZXRTb3VyY2VMYWJlbCIsImNvbnNvbGUiLCJDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VEIiwiZ2V0UGxheWJhY2tSYXRlcyIsImlzUGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5bGlzdF8iLCJpc1JlcGVhdCIsImdldFN0cmV0Y2hpbmciLCJFdmVudEVtaXR0ZXIiLCJvYmplY3QiLCJfZXZlbnRzIiwidHJpZ2dlckV2ZW50cyIsImV2ZW50cyIsImFyZ3MiLCJjb250ZXh0IiwiZXZlbnQiLCJsaXN0ZW5lciIsImFwcGx5IiwiY2FsbCIsImFyZ3VtZW50cyIsImFsbEV2ZW50cyIsImFsbCIsIm5hbWVzIiwibCIsInJldGFpbiIsImoiLCJrIiwiX2xpc3RlbmVyIiwib25jZSIsImNvdW50Iiwib25jZUNhbGxiYWNrIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJwcm90b3R5cGUiLCJhZGRRdWV1ZSIsImV4ZWN1dGVRdWV1ZWRDb21tYW5kcyIsInNoaWZ0Iiwic2V0RXhlY3V0ZU1vZGUiLCJtb2RlIiwiZ2V0VW5kZWNvcmF0ZWRNZXRob2RzIiwiZ2V0UXVldWUiLCJlbXB0eSIsInJlbW92ZUFuZEV4Y3V0ZU9uY2UiLCJjb21tYW5kXyIsImNvbW1hbmRRdWV1ZUl0ZW0iLCJmaW5kV2hlcmUiLCJzcGxpY2UiLCJmaW5kSW5kZXgiLCJTdXBwb3J0Q2hlY2tlciIsInN1cHBvcnRMaXN0IiwiY2hlY2tTdXBwb3J0Iiwic291cmNlIiwiTWltZVR5cGVzIiwiYWFjIiwibXA0IiwiZjR2IiwibTR2IiwibW92IiwibXAzIiwibXBlZyIsIm9ndiIsIm9nZyIsIm9nYSIsInZvcmJpcyIsIndlYm0iLCJmNGEiLCJtM3U4IiwibTN1IiwiaGxzIiwidmlkZW8iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjYW5QbGF5VHlwZSIsImZpbGUiLCJ0eXBlIiwibWltZVR5cGUiLCJpc0hsc1N1cHBvcnQiLCJnZXRNZWRpYVNvdXJjZSIsIndpbmRvdyIsIk1lZGlhU291cmNlIiwiV2ViS2l0TWVkaWFTb3VyY2UiLCJtZWRpYVNvdXJjZSIsInNvdXJjZUJ1ZmZlciIsIlNvdXJjZUJ1ZmZlciIsIldlYktpdFNvdXJjZUJ1ZmZlciIsImlzVHlwZVN1cHBvcnRlZCIsInNvdXJjZUJ1ZmZlclZhbGlkQVBJIiwiYXBwZW5kQnVmZmVyIiwiZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlIiwic29ydWNlXyIsImZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCIsInN1cHBvcnROYW1lcyIsIml0ZW0iLCJzdXBwb3J0ZWQiLCJMb2FkZXIiLCJjb252ZXJ0VlRUVXJsIiwidHJhY2tVcmwiLCJlc2NhcGUiLCJjb252ZXJ0VG9WVFRDdWVzIiwiY3VlcyIsIlZUVEN1ZSIsImN1ZSIsInN0YXJ0IiwiZW5kIiwidGV4dCIsInN1Y2Nlc3NDYWxsYmFjayIsImVycm9yQ2FsbGJhY2siLCJnZXQiLCJyZXNwb25zZSIsInhociIsInZ0dEN1ZXMiLCJyZXNwb25zZVRleHQiLCJsb2FkVnR0UGFyc2VyIiwicGFyc2VyIiwiV2ViVlRUIiwiUGFyc2VyIiwiU3RyaW5nRGVjb2RlciIsIm9uY3VlIiwib25mbHVzaCIsInBhcnNlIiwicGFyc2VkRGF0YSIsInJlcXVpcmUiLCJlcnIiLCJpc1N1cHBvcnQiLCJraW5kIiwiTWFuYWdlciIsImFwaSIsImNhcHRpb25MaXN0IiwiY3VycmVudENhcHRpb25JbmRleCIsImNhcHRpb25Mb2FkZXIiLCJpc0Zpc3J0TG9hZCIsImlzU2hvd2luZyIsImJpbmRUcmFjayIsImxhbmd1YWdlIiwiaWQiLCJ0cmFja3NDb3VudCIsInRyYWNrSWQiLCJwcmVmaXgiLCJkZWZhdWx0dHJhY2siLCJjaGFuZ2VDdXJyZW50Q2FwdGlvbiIsIkNPTlRFTlRfQ0FQVElPTl9DSEFOR0VEIiwidHJhY2tzIiwiY2FwdGlvbklkIiwiUExBWUVSX0NBUFRJT05fRVJST1IiLCJDT05URU5UX1RJTUUiLCJtZXRhIiwiY3VycmVudEN1ZXMiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEIiwiZmx1c2hDYXB0aW9uTGlzdCIsImxhc3RDYXB0aW9uSW5kZXgiLCJfaW5kZXgiLCJsYW5nQ29kZXMiLCJyZU9wZW5TeW5jIiwicmVDbG9zZVN5bmMiLCJyZUxpbmVFbmRpbmciLCJyZUJyb2tlblRhZyIsInJlU3RhcnRUaW1lIiwicmVCciIsInJlU3R5bGUiLCJyZUNvbW1lbnQiLCJjbG9uZSIsImZsYWdzIiwibmV3SW5zdGFuY2UiLCJEYXRlIiwiZ2V0VGltZSIsIlJlZ0V4cCIsImdsb2JhbCIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJzdGlja3kiLCJjb25zdHJ1Y3RvciIsInN0cmlwX3RhZ3MiLCJpbnB1dCIsImFsbG93ZWQiLCJtYXRjaCIsImpvaW4iLCJ0YWdzIiwiY29tbWVudHNBbmRQaHBUYWdzIiwicmVwbGFjZSIsIiQwIiwiJDEiLCJfc29ydCIsImxhbmdJdGVtIiwiYSIsImIiLCJyZXMiLCJfbWVyZ2VNdWx0aUxhbmd1YWdlcyIsImFyciIsImNvbnRlbnQiLCJkaWN0IiwiaWR4IiwibGFuZyIsInJldCIsIl9pIiwiX2xlbiIsIl9yZWYiLCJsYW5ndWFnZXMiLCJTbWlQYXJzZXIiLCJzYW1pIiwiZGVmaW5lZExhbmdzIiwiZXJyb3JzIiwiZ2V0RGVmaW5lZExhbmdzIiwiZ2V0TGFuZ3VhZ2UiLCJtYWtlRW5kVGltZSIsInZhbHVlIiwiZWxlbWVudCIsImlubmVyVGV4dCIsImlzQnJva2VuIiwibGluZU51bSIsIm5leHRTdGFydFRhZ0lkeCIsInN0YXJ0VGFnSWR4Iiwic3RyIiwidGVtcFJldCIsIl9yZWYxIiwiX3JlZjIiLCJlIiwiRXJyb3IiLCJsaW5lIiwic2VhcmNoIiwidHJpbSIsImNvbnRlbnRzIiwiY29uY2F0IiwiY2xhc3NOYW1lIiwicmVDbGFzc05hbWUiLCJkZWNsYXJhdGlvbiIsIm1hdGNoZWQiLCJwYXJzZWQiLCJydWxlIiwic2VsZWN0b3IiLCJfcmVzdWx0cyIsImNzc1BhcnNlIiwic3R5bGVzaGVldCIsInJ1bGVzIiwic2VsZWN0b3JzIiwiX2oiLCJfbGVuMSIsIl9yZXN1bHRzMSIsImRlY2xhcmF0aW9ucyIsInByb3BlcnR5IiwiX2Vycm9yIiwiS1JDQyIsIktSIiwiRU5DQyIsIkVHQ0MiLCJFTiIsIkpQQ0MiLCJfZW50cnkiLCJlbnRyeSIsImFycmF5Iiwic3BsaXQiLCJTcnRQYXJzZXIiLCJjYXB0aW9ucyIsImxpc3QiLCJTVEFURV9CVUZGRVJJTkciLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJTVEFURV9QQVVTRUQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfRVJST1IiLCJTVEFURV9MT0FESU5HIiwiU1RBVEVfU1RBTExFRCIsIlBST1ZJREVSX0hUTUw1IiwiUFJPVklERVJfV0VCUlRDIiwiUFJPVklERVJfREFTSCIsIlBST1ZJREVSX0hMUyIsIkNPTlRFTlRfQ09NUExFVEUiLCJDT05URU5UX1NFRUsiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiRElTUExBWV9DTElDSyIsIkNPTlRFTlRfTE9BREVEIiwiQ09OVEVOVF9TRUVLRUQiLCJQTEFZRVJfU1RBVEUiLCJQTEFZRVJfQ09NUExFVEUiLCJQTEFZRVJfUEFVU0UiLCJQTEFZRVJfUExBWSIsIkNPTlRFTlRfQlVGRkVSIiwiQ09OVEVOVF9SQVRFX0NIQU5HRSIsIkNPTlRFTlRfVk9MVU1FIiwiQ09OVEVOVF9NVVRFIiwiQ09OVEVOVF9NRVRBIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfQ0xPU0VEIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1ciLCJjdXJyZW50UGxheWxpc3QiLCJzdXBwb3J0Q2hlY2tlciIsIm1ha2VQcmV0dHlTb3VyY2UiLCJzb3VyY2VfIiwiaG9zdCIsImFwcGxpY2F0aW9uIiwic3RyZWFtIiwibWltZXR5cGVSZWdFeCIsInByZXR0aWVkUGxheWxpc3QiLCJwbGF5bGlzdEl0ZW0iLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwiQ29udHJvbGxlciIsInN1cHBvcnRDaGFja2VyIiwicmVnaXN0ZVByb3ZpZGVyIiwiUHJvdmlkZXJMb2FkZXIiLCJodG1sNSIsIndlYnJ0YyIsImRhc2giLCJydG1wIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJwcm92aWRlck5hbWUiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwicGxheWVyTGlzdCIsImNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudCIsImNvbnRhaW5lckVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm5vZGVUeXBlIiwiY3JlYXRlIiwicGxheWVySW5zdGFuY2UiLCJnZXRQbGF5ZXJMaXN0IiwiZ2V0UGxheWVyQnlDb250YWluZXJJZCIsImNvbnRhaW5lcklkIiwiZ2V0UGxheWVyQnlJbmRleCIsInBsYXllcklkIiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwidCIsImRlZmluZSIsInIiLCJiYXNlVXJsIiwidXJsIiwibiIsInJlZHVjZSIsIm8iLCJ1IiwiYyIsImYiLCJYTUxIdHRwUmVxdWVzdCIsImQiLCJvcGVuIiwid2l0aENyZWRlbnRpYWxzIiwiaGFzT3duUHJvcGVydHkiLCJoZWFkZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlbmQiLCJzIiwiYWJvcnQiLCJzZXRSZXF1ZXN0SGVhZGVyIiwic29tZSIsInJlYWR5U3RhdGUiLCJET05FIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFsd2F5cyIsInN0YXR1cyIsIkpTT04iLCJlbmNvZGVVUklDb21wb25lbnQiLCJhdXRvS2V5d29yZCIsImRpcmVjdGlvblNldHRpbmciLCJhbGlnblNldHRpbmciLCJmaW5kRGlyZWN0aW9uU2V0dGluZyIsImRpciIsImZpbmRBbGlnblNldHRpbmciLCJhbGlnbiIsImV4dGVuZCIsImNvYmoiLCJwIiwiaXNJRTgiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJiYXNlT2JqIiwiZW51bWVyYWJsZSIsImhhc0JlZW5SZXNldCIsIl9pZCIsIl9wYXVzZU9uRXhpdCIsIl9zdGFydFRpbWUiLCJfZW5kVGltZSIsIl90ZXh0IiwiX3JlZ2lvbiIsIl92ZXJ0aWNhbCIsIl9zbmFwVG9MaW5lcyIsIl9saW5lIiwiX2xpbmVBbGlnbiIsIl9wb3NpdGlvbiIsIl9wb3NpdGlvbkFsaWduIiwiX3NpemUiLCJfYWxpZ24iLCJkZWZpbmVQcm9wZXJ0eSIsInNldCIsIlR5cGVFcnJvciIsInNldHRpbmciLCJTeW50YXhFcnJvciIsImRpc3BsYXlTdGF0ZSIsImdldEN1ZUFzSFRNTCIsImNvbnZlcnRDdWVUb0RPTVRyZWUiLCJMYSQiLCJzZWxlY3Rvck9yRWxlbWVudCIsInJldHVybk5vZGUiLCIkZWxlbWVudCIsIm5vZGVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsImV2ZXJ5IiwiaXNFbGVtZW50IiwiZmluZCIsImNzcyIsInN0eWxlIiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGFzc05hbWVzIiwicmVtb3ZlQ2xhc3MiLCJyZW1vdmVBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInNob3ciLCJkaXNwbGF5IiwiaGlkZSIsImFwcGVuZCIsImh0bWxDb2RlIiwiaW5uZXJIVE1MIiwidGV4dENvbnRlbnQiLCJodG1sIiwiaGFzQ2xhc3MiLCJjb250YWlucyIsImlzIiwiJHRhcmdldEVsZW1lbnQiLCJvZmZzZXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwiYm9keSIsInNjcm9sbFRvcCIsImxlZnQiLCJzY3JvbGxMZWZ0IiwiY2xpZW50V2lkdGgiLCJoZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJhdHRyIiwiZ2V0QXR0cmlidXRlIiwicmVwbGFjZVdpdGgiLCJhcHBlbmRDaGlsZCIsInJlbW92ZUNoaWxkIiwiaGFzQ2hpbGROb2RlcyIsImZpcnN0Q2hpbGQiLCJjbG9zZXN0Iiwic2VsZWN0b3JTdHJpbmciLCJjbG9zZXN0RWxlbWVudCIsImxvZ2dlciIsInByZXZDb25zb2xlTG9nIiwiZW5hYmxlIiwibmF0dXJhbEhtcyIsImhtc1RvU2Vjb25kIiwic3RyaW5nIiwiZXh0cmFjdEV4dGVuc2lvbiIsInBhdGgiLCJnZXRBenVyZUZpbGVGb3JtYXQiLCJleHRlbnNpb24iLCJhenVyZWRGb3JtYXQiLCJsYXN0SW5kZXhPZiIsInNlY29uZCIsInNlY051bSIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsImZyYW1lUmF0ZSIsImFyckxlbmd0aCIsInNlYyIsInNlY0luZGV4Iiwic2VsZiIsIlN5bWJvbCIsIl93cmFwcGVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIlZFUlNJT04iLCJ2IiwieSIsIml0ZXJhdGVlIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwiZyIsIm1heCIsIm0iLCJ4IiwicG93IiwiQSIsImVhY2giLCJjb2xsZWN0IiwiTyIsImZvbGRsIiwiaW5qZWN0IiwicmVkdWNlUmlnaHQiLCJmb2xkciIsImRldGVjdCIsImZpbmRLZXkiLCJzZWxlY3QiLCJyZWplY3QiLCJuZWdhdGUiLCJhbnkiLCJpbmNsdWRlcyIsImluY2x1ZGUiLCJ2YWx1ZXMiLCJpbnZva2UiLCJwbHVjayIsIndoZXJlIiwibWluIiwic2h1ZmZsZSIsInNhbXBsZSIsInJhbmRvbSIsInNvcnRCeSIsImNyaXRlcmlhIiwiZ3JvdXBCeSIsImluZGV4QnkiLCJjb3VudEJ5IiwiUyIsInRvQXJyYXkiLCJpc1N0cmluZyIsInNpemUiLCJwYXJ0aXRpb24iLCJmaXJzdCIsImhlYWQiLCJ0YWtlIiwiaW5pdGlhbCIsImxhc3QiLCJyZXN0IiwidGFpbCIsImRyb3AiLCJjb21wYWN0IiwiQm9vbGVhbiIsIk0iLCJpc0FyZ3VtZW50cyIsImZsYXR0ZW4iLCJ3aXRob3V0IiwiZGlmZmVyZW5jZSIsInVuaXEiLCJ1bmlxdWUiLCJpc0Jvb2xlYW4iLCJ1bmlvbiIsImludGVyc2VjdGlvbiIsInVuemlwIiwiemlwIiwiRiIsImZpbmRMYXN0SW5kZXgiLCJzb3J0ZWRJbmRleCIsIkUiLCJyYW5nZSIsImNlaWwiLCJjaHVuayIsIk4iLCJiaW5kIiwicGFydGlhbCIsInBsYWNlaG9sZGVyIiwiYmluZEFsbCIsIm1lbW9pemUiLCJjYWNoZSIsImRlbGF5Iiwic2V0VGltZW91dCIsImRlZmVyIiwidGhyb3R0bGUiLCJsZWFkaW5nIiwibm93IiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJjYW5jZWwiLCJkZWJvdW5jZSIsIndyYXAiLCJjb21wb3NlIiwiYWZ0ZXIiLCJiZWZvcmUiLCJyZXN0QXJndW1lbnRzIiwiSSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiVCIsIkIiLCJhbGxLZXlzIiwibWFwT2JqZWN0IiwicGFpcnMiLCJpbnZlcnQiLCJmdW5jdGlvbnMiLCJtZXRob2RzIiwiUiIsImV4dGVuZE93biIsImFzc2lnbiIsInEiLCJLIiwieiIsIm9taXQiLCJTdHJpbmciLCJkZWZhdWx0cyIsInRhcCIsImlzTWF0Y2giLCJ2YWx1ZU9mIiwicG9wIiwiaXNFcXVhbCIsImlzRW1wdHkiLCJEIiwiY2hpbGROb2RlcyIsIkludDhBcnJheSIsImlzRmluaXRlIiwiaXNTeW1ib2wiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsImhhcyIsIm5vQ29uZmxpY3QiLCJjb25zdGFudCIsIm5vb3AiLCJwcm9wZXJ0eU9mIiwibWF0Y2hlcyIsInRpbWVzIiwiTCIsIlAiLCJXIiwidW5lc2NhcGUiLCJDIiwidW5pcXVlSWQiLCJ0ZW1wbGF0ZVNldHRpbmdzIiwiZXZhbHVhdGUiLCJpbnRlcnBvbGF0ZSIsIkoiLCJVIiwiViIsIiQiLCJ0ZW1wbGF0ZSIsInZhcmlhYmxlIiwiRnVuY3Rpb24iLCJjaGFpbiIsIl9jaGFpbiIsIkciLCJtaXhpbiIsInRvSlNPTiIsImlzUnRtcCIsImlzV2ViUlRDIiwiaXNEYXNoIiwiZ2V0U2NyaXB0UGF0aCIsInNjcmlwdE5hbWUiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzcmMiLCJfX1ZFUlNJT05fXyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBLGlEQUF5Qywwa0JBQTBrQjtBQUNubkI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBLHlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQXdCLGtDQUFrQztBQUMxRCxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtB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QUFDQSxZQUFJQSxHQUFKLEVBQVM7QUFDTCxnQkFBTTV0QixRQUFRNHRCLElBQUlyTCxXQUFKLENBQWdCLE1BQU1rTCxVQUF0QixDQUFkO0FBQ0EsZ0JBQUl6dEIsU0FBUyxDQUFiLEVBQWdCO0FBQ1osdUJBQU80dEIsSUFBSTlxQixNQUFKLENBQVcsQ0FBWCxFQUFjOUMsUUFBUSxDQUF0QixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsV0FBTyxFQUFQO0FBQ0gsQ0FaTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0pQOzs7QUFHTyxJQUFNMUYsNEJBQVV1ekIsb0JBQWhCLEMiLCJmaWxlIjoib3ZlbnBsYXllci5zZGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXIuc2RrXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiLFwidnR0cGFyc2VyXCI6XCJ2dHRwYXJzZXJcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknKTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzXCIpO1xuIiwiLyogZ2xvYmFscyBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXyAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19hbWRfb3B0aW9uc19fO1xyXG4iLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoIChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuIiwiaW1wb3J0IENhcHRpb25NYW5hZ2VyIGZyb20gXCJhcGkvY2FwdGlvbi9NYW5hZ2VyXCI7XHJcbmltcG9ydCBDb25maWd1cmF0b3IgZnJvbSBcImFwaS9Db25maWd1cmF0b3JcIjtcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgTGF6eUNvbW1hbmRFeGVjdXRvciBmcm9tIFwiYXBpL0xhenlDb21tYW5kRXhlY3V0b3JcIjtcclxuaW1wb3J0IExvZ01hbmFnZXIgZnJvbSBcInV0aWxzL2xvZ2dlclwiO1xyXG5pbXBvcnQgUGxheWxpc3RNYW5hZ2VyIGZyb20gXCJhcGkvcGxheWxpc3QvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXJDb250cm9sbGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvQ29udHJvbGxlclwiO1xyXG5pbXBvcnQge1JFQURZLCBFUlJPUiwgQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCwgSU5JVF9FUlJPUiwgREVTVFJPWSwgTkVUV09SS19VTlNUQUJMRUQsIFBMQVlFUl9GSUxFX0VSUk9SLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAndmVyc2lvbic7XHJcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgb2JqZWN0IGNvbm5lY3RzIFVJIHRvIHRoZSBwcm92aWRlci5cclxuICogQHBhcmFtICAge29iamVjdH0gICAgY29udGFpbmVyICBkb20gZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuY29uc3QgQXBpID0gZnVuY3Rpb24oY29udGFpbmVyKXtcclxuICAgIGxldCBsb2dNYW5hZ2VyID0gTG9nTWFuYWdlcigpO1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltbT3ZlblBsYXllcl1dIHYuXCIrIHZlcnNpb24pO1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIGxvYWRlZC5cIik7XHJcbiAgICBsZXQgY2FwdGlvbk1hbmFnZXIgPSBDYXB0aW9uTWFuYWdlcih0aGF0KTtcclxuICAgIGxldCBwbGF5bGlzdE1hbmFnZXIgPSBQbGF5bGlzdE1hbmFnZXIoKTtcclxuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcclxuICAgIGxldCBjdXJyZW50UHJvdmlkZXIgPSBcIlwiO1xyXG4gICAgbGV0IHBsYXllckNvbmZpZyA9IFwiXCI7XHJcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcclxuXHJcbiAgICBjb25zdCBpbml0UHJvdmlkZXIgPSBmdW5jdGlvbihsYXN0UGxheVBvc2l0aW9uKXtcclxuICAgICAgICBjb25zdCBwaWNrUXVhbGl0eUZyb21Tb3VyY2UgPSAoc291cmNlcykgPT57XHJcbiAgICAgICAgICAgIHZhciBxdWFsaXR5ID0gMDtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBxdWFsaXR5O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBwcm92aWRlckNvbnRyb2xsZXIubG9hZFByb3ZpZGVycyhwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U291cmNlSW5kZXggPSBwaWNrUXVhbGl0eUZyb21Tb3VyY2UocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coIFwiY3VycmVudCBzb3VyY2UgaW5kZXggOiBcIisgY3VycmVudFNvdXJjZUluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIC8vQ2FsbCBQcm92aWRlci5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyLmdldE5hbWUoKSA9PT0gUFJPVklERVJfUlRNUCl7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHByb3ZpZGVyIHR5cGUgaXMgUlRNUCwgd2UgYWNjZXB0cyBSdG1wRXhwYW5zaW9uLlxyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGF0LCBBcGlSdG1wRXhwYW5zaW9uKGN1cnJlbnRQcm92aWRlcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1RoaXMgcGFzc2VzIHRoZSBldmVudCBjcmVhdGVkIGJ5IHRoZSBQcm92aWRlciB0byBBUEkuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5vbihcImFsbFwiLCBmdW5jdGlvbihuYW1lLCBkYXRhKXtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIobmFtZSwgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9BdXRvIG5leHQgc291cmNlIHdoZW4gcGxheWVyIGxvYWQgd2FzIGZhaWwgYnkgYW1pc3Mgc291cmNlLlxyXG4gICAgICAgICAgICAgICAgLy9kYXRhLmNvZGUgPT09IFBMQVlFUl9GSUxFX0VSUk9SXHJcbiAgICAgICAgICAgICAgICBpZiggKG5hbWUgPT09IEVSUk9SICYmIChwYXJzZUludChkYXRhLmNvZGUvMTAwKSA9PT0gMyB8fCBwYXJzZUludChkYXRhLmNvZGUvMTAwKSA9PT0gNSkpfHwgbmFtZSA9PT0gTkVUV09SS19VTlNUQUJMRUQgKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFNvdXJjZUluZGV4ID0gdGhhdC5nZXRDdXJyZW50U291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY3VycmVudFNvdXJjZUluZGV4KzEgPCB0aGF0LmdldFNvdXJjZXMoKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMgc2VxdWVudGlhbCBoYXMgYXZhaWxhYmxlIHNvdXJjZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXVzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50U291cmNlKGN1cnJlbnRTb3VyY2VJbmRleCsxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KS50aGVuKCgpPT57XHJcblxyXG4gICAgICAgICAgICAvL3Byb3ZpZGVyJ3MgcHJlbG9hZCgpIGhhdmUgdG8gbWFkZSBQcm9taXNlLiBDdXogaXQgb3ZlcmNvbWVzICdmbGFzaCBsb2FkaW5nIHRpbWluZyBwcm9ibGVtJy5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnByZWxvYWQocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCksIGxhc3RQbGF5UG9zaXRpb24gKS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZmx1c2goKTtcclxuICAgICAgICAgICAgICAgIC8vVGhpcyBpcyBubyByZWFzb24gdG8gZXhpc3QgYW55bW9yZS5cclxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFJFQURZKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvck9iamVjdCA9IHtjb2RlIDogSU5JVF9FUlJPUiwgcmVhc29uIDogXCJpbml0IGVycm9yLlwiLCBtZXNzYWdlIDogXCJQbGF5ZXIgaW5pdCBlcnJvci5cIiwgZXJyb3IgOiBlcnJvcn07XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIGVycm9yT2JqZWN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yT2JqZWN0ID0ge2NvZGUgOiBJTklUX0VSUk9SLCByZWFzb24gOiBcImluaXQgZXJyb3IuXCIsIG1lc3NhZ2UgOiBcIlBsYXllciBpbml0IGVycm9yLlwiLCBlcnJvciA6IGVycm9yfTtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBlcnJvck9iamVjdCk7XHJcblxyXG4gICAgICAgICAgICAvL3h4eCA6IElmIHlvdSBpbml0IGVtcHR5IHNvdXJjZXMuIChJIHRoaW5rIHRoaXMgaXMgc3RyYW5nZSBjYXNlLilcclxuICAgICAgICAgICAgLy9UaGlzIHdvcmtzIGZvciB0aGlzIGNhc2UuXHJcbiAgICAgICAgICAgIC8vcGxheWVyID0gT3ZlblBsYXllci5jcmVhdGUoXCJlbElkXCIsIHt9KTtcclxuICAgICAgICAgICAgLy9wbGF5ZXIubG9hZChzb3J1Y2VzKTtcclxuICAgICAgICAgICAgbGF6eVF1ZXVlLm9mZigpO1xyXG4gICAgICAgICAgICAvL2xhenlRdWV1ZS5yZW1vdmVBbmRFeGN1dGVPbmNlKFwibG9hZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIOy0iOq4sO2ZlCDtlajsiJhcclxuICAgICAqIGluaXRcclxuICAgICAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgcGxheWVyIGluaXRpYWwgb3B0aW9uIHZhbHVlLlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqKi9cclxuICAgIHRoYXQuaW5pdCA9IChvcHRpb25zKSA9PntcclxuICAgICAgICAvL0l0IGNvbGxlY3RzIHRoZSBjb21tYW5kcyBhbmQgZXhlY3V0ZXMgdGhlbSBhdCB0aGUgdGltZSB3aGVuIHRoZXkgYXJlIGV4ZWN1dGFibGUuXHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbXHJcbiAgICAgICAgICAgICdsb2FkJywncGxheScsJ3BhdXNlJywnc2VlaycsJ3N0b3AnLCAnZ2V0RHVyYXRpb24nLCAnZ2V0UG9zaXRpb24nLCAnZ2V0Vm9sdW1lJ1xyXG4gICAgICAgICAgICAsICdnZXRNdXRlJywgJ2dldEJ1ZmZlcicsICdnZXRTdGF0ZScgLCAnZ2V0UXVhbGl0eUxldmVscydcclxuICAgICAgICBdKTtcclxuICAgICAgICBwbGF5ZXJDb25maWcgPSBDb25maWd1cmF0b3Iob3B0aW9ucywgdGhhdCk7XHJcbiAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0RlYnVnKCkpe1xyXG4gICAgICAgICAgICBsb2dNYW5hZ2VyLmRpc2FibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpXCIpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBjb25maWcgOiBcIiwgcGxheWVyQ29uZmlnKTtcclxuXHJcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldFBsYXlsaXN0KHBsYXllckNvbmZpZy5nZXRQbGF5bGlzdCgpKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgc291cmNlcyA6IFwiICwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xyXG4gICAgICAgIGluaXRQcm92aWRlcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKnRoYXQuZ2V0Q29udGFpbmVySWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyLmlkO1xyXG4gICAgfTsqL1xyXG5cclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENvbmZpZygpXCIsIHBsYXllckNvbmZpZy5nZXRDb25maWcoKSk7XHJcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRDb25maWcoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFRpbWVjb2RlTW9kZSA9IChpc1Nob3cpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFRpbWVjb2RlTW9kZSgpXCIsIGlzU2hvdyk7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnLnNldFRpbWVjb2RlTW9kZShpc1Nob3cpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNUaW1lY29kZU1vZGUgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaXNUaW1lY29kZU1vZGUoKVwiKTtcclxuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmlzVGltZWNvZGVNb2RlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RnJhbWVyYXRlKClcIiwgY3VycmVudFByb3ZpZGVyLmdldEZyYW1lcmF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEZyYW1lcmF0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2Vla0ZyYW1lKClcIiwgZnJhbWVDb3VudCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZWVrRnJhbWUoZnJhbWVDb3VudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldER1cmF0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UG9zaXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Vm9sdW1lKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Vm9sdW1lKCkgXCIgKyB2b2x1bWUpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRWb2x1bWUodm9sdW1lKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldE11dGUoKSBcIiArIHN0YXRlKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldE11dGUoc3RhdGUpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldE11dGUoKSBcIiArIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQubG9hZCA9IChwbGF5bGlzdCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGxvYWQoKSBcIiwgcGxheWxpc3QpO1xyXG4gICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlaycsJ3N0b3AnXSk7XHJcblxyXG4gICAgICAgIGlmKHBsYXlsaXN0KXtcclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eSgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0UGxheWxpc3QocGxheWxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5pdFByb3ZpZGVyKCk7XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQucGxheSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBsYXkoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBsYXkoKTtcclxuICAgIH1cclxuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGF1c2UoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNlZWsoKSBcIisgcG9zaXRpb24pO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZWVrKHBvc2l0aW9uKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRQbGF5YmFja1JhdGUocGxheWVyQ29uZmlnLnNldERlZmF1bHRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXliYWNrUmF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFNvdXJjZXMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50U291cmNlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChzb3VyY2VJbmRleCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50U291cmNlKCkgXCIsIHNvdXJjZUluZGV4KTtcclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xyXG4gICAgICAgIGxldCBjdXJyZW50U291cmNlID0gc291cmNlc1tjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpXTtcclxuICAgICAgICBsZXQgbmV3U291cmNlID0gc291cmNlc1tzb3VyY2VJbmRleF07XHJcbiAgICAgICAgbGV0IGxhc3RQbGF5UG9zaXRpb24gPSBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgaXNTYW1lUHJvdmlkZXIgPSBwcm92aWRlckNvbnRyb2xsZXIuaXNTYW1lUHJvdmlkZXIoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKTtcclxuICAgICAgICAvLyBwcm92aWRlci5zZXJDdXJyZW50UXVhbGl0eSAtPiBwbGF5ZXJDb25maWcgc2V0dGluZyAtPiBsb2FkXHJcbiAgICAgICAgbGV0IHJlc3VsdFNvdXJjZUluZGV4ID0gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRTb3VyY2Uoc291cmNlSW5kZXgsIGlzU2FtZVByb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgaWYoIW5ld1NvdXJjZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBpc1NhbWVQcm92aWRlclwiLCBpc1NhbWVQcm92aWRlcik7XHJcblxyXG4gICAgICAgIGlmKCFpc1NhbWVQcm92aWRlcil7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5J10pO1xyXG4gICAgICAgICAgICBpbml0UHJvdmlkZXIobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0U291cmNlSW5kZXg7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRRdWFsaXR5TGV2ZWxzKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRRdWFsaXR5KCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgcXVhbGl0eUluZGV4KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eShxdWFsaXR5SW5kZXgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGlzQXV0b1F1YWxpdHkoKVwiKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmlzQXV0b1F1YWxpdHkoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0QXV0b1F1YWxpdHkoKSBcIiwgaXNBdXRvKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldEF1dG9RdWFsaXR5KGlzQXV0byk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDYXB0aW9uTGlzdCgpIFwiLCBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpKTtcclxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKTtcclxuICAgIH1cclxuICAgIHRoYXQuZ2V0Q3VycmVudENhcHRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudENhcHRpb24oKSBcIiwgY2FwdGlvbk1hbmFnZXIuZ2V0Q3VycmVudENhcHRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LnNldEN1cnJlbnRDYXB0aW9uID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudENhcHRpb24oKSBcIiwgaW5kZXgpO1xyXG4gICAgICAgIGNhcHRpb25NYW5hZ2VyLnNldEN1cnJlbnRDYXB0aW9uKGluZGV4KTtcclxuICAgIH1cclxuICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGFkZENhcHRpb24oKSBcIilcclxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuYWRkQ2FwdGlvbih0cmFjayk7XHJcbiAgICB9XHJcbiAgICB0aGF0LnJlbW92ZUNhcHRpb24gPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmVDYXB0aW9uKCkgXCIsIGluZGV4KVxyXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5yZW1vdmVDYXB0aW9uKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEJ1ZmZlcigpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCkpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U3RhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnN0b3AgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzdG9wKCkgXCIpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zdG9wKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSBcIik7XHJcbiAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcclxuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm92aWRlckNvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgICAgIHBsYXlsaXN0TWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnID0gbnVsbDtcclxuICAgICAgICBsYXp5UXVldWUgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGF0LnRyaWdnZXIoREVTVFJPWSk7XHJcbiAgICAgICAgdGhhdC5vZmYoKTtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgLSBsYXp5UXVldWUsIGN1cnJlbnRQcm92aWRlciwgcHJvdmlkZXJDb250cm9sbGVyLCBwbGF5bGlzdE1hbmFnZXIsIHBsYXllckNvbmZpZywgYXBpIGV2ZW50IGRlc3Ryb2VkLiBcIik7XHJcbiAgICAgICAgbG9nTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgbG9nTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIodGhhdC5nZXRDb250YWluZXJJZCgpKTtcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBpO1xyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBBcGlSdG1wRXhwYW5zaW9uID0gZnVuY3Rpb24oY3VycmVudFByb3ZpZGVyKXtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZXh0ZXJuYWxDYWxsYmFja0NyZWVwIDogKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBpZihyZXN1bHQubmFtZSAmJiByZXN1bHQuZGF0YSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbChyZXN1bHQubmFtZSwgcmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuaW1wb3J0IHtcclxuICAgIENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRURcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgaW5pdGlhbGl6ZXMgdGhlIGlucHV0IG9wdGlvbnMuXHJcbiAqIEBwYXJhbSAgIG9wdGlvbnNcclxuICpcclxuICogKi9cclxuY29uc3QgQ29uZmlndXJhdG9yID0gZnVuY3Rpb24ob3B0aW9ucywgcHJvdmlkZXIpe1xyXG5cclxuICAgIGNvbnN0IGNvbXBvc2VTb3VyY2VPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucyl7XHJcbiAgICAgICAgY29uc3QgRGVmYXVsdHMgPSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRQbGF5YmFja1JhdGU6IDEsXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZUNvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgICAgICAgcGxheWJhY2tSYXRlczogWzAuMjUsIDAuNSwgMSwgMS41LCAyXSxcclxuICAgICAgICAgICAgbXV0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZvbHVtZTogOTBcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VyY2FzZVZhbCA9IHZhbC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIodmFsKSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdpZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBzZXJpYWxpemUob3B0aW9uc1trZXldKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZVNpemUgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWwuc2xpY2UgJiYgdmFsLnNsaWNlKC0yKSA9PT0gJ3B4Jykge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdmFsLnNsaWNlKDAsIC0yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBldmFsdWF0ZUFzcGVjdFJhdGlvID0gZnVuY3Rpb24gKGFyLCB3aWR0aCkge1xyXG4gICAgICAgICAgICBpZiAod2lkdGgudG9TdHJpbmcoKS5pbmRleE9mKCclJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyICE9PSAnc3RyaW5nJyB8fCAhYXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgvXlxcZCpcXC4/XFxkKyUkLy50ZXN0KGFyKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYXIuaW5kZXhPZignOicpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB3ID0gcGFyc2VGbG9hdChhci5zdWJzdHIoMCwgaW5kZXgpKTtcclxuICAgICAgICAgICAgY29uc3QgaCA9IHBhcnNlRmxvYXQoYXIuc3Vic3RyKGluZGV4ICsgMSkpO1xyXG4gICAgICAgICAgICBpZiAodyA8PSAwIHx8IGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChoIC8gdyAqIDEwMCkgKyAnJSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlc2VyaWFsaXplKG9wdGlvbnMpO1xyXG4gICAgICAgIGxldCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGxldCByYXRlQ29udHJvbHMgPSBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHM7XHJcbiAgICAgICAgaWYgKHJhdGVDb250cm9scykge1xyXG4gICAgICAgICAgICBsZXQgcmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcztcclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhdGVDb250cm9scykpIHtcclxuICAgICAgICAgICAgICAgIHJhdGVzID0gcmF0ZUNvbnRyb2xzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJhdGVzID0gcmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KVxyXG4gICAgICAgICAgICAgICAgLm1hcChyYXRlID0+IE1hdGgucm91bmQocmF0ZSAqIDQpIC8gNCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmF0ZXMuaW5kZXhPZigxKSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJhdGVzLnB1c2goMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmF0ZXMuc29ydCgpO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSByYXRlcztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyB8fCBjb25maWcucGxheWJhY2tSYXRlcy5pbmRleE9mKGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlKSA8IDApIHtcclxuICAgICAgICAgICAgY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZSA9IGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlO1xyXG5cclxuICAgICAgICBjb25zdCBjb25maWdQbGF5bGlzdCA9IGNvbmZpZy5wbGF5bGlzdDtcclxuICAgICAgICBpZiAoIWNvbmZpZ1BsYXlsaXN0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IF8ucGljayhjb25maWcsIFtcclxuICAgICAgICAgICAgICAgICd0aXRsZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3R5cGUnLFxyXG4gICAgICAgICAgICAgICAgJ21lZGlhaWQnLFxyXG4gICAgICAgICAgICAgICAgJ2ltYWdlJyxcclxuICAgICAgICAgICAgICAgICdmaWxlJyxcclxuICAgICAgICAgICAgICAgICdzb3VyY2VzJyxcclxuICAgICAgICAgICAgICAgICd0cmFja3MnLFxyXG4gICAgICAgICAgICAgICAgJ3ByZWxvYWQnLFxyXG4gICAgICAgICAgICAgICAgJ2R1cmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICdob3N0JyxcclxuICAgICAgICAgICAgICAgICdhcHBsaWNhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnc3RyZWFtJ1xyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IFsgb2JqIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoY29uZmlnUGxheWxpc3QucGxheWxpc3QpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5mZWVkRGF0YSA9IGNvbmZpZ1BsYXlsaXN0O1xyXG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBjb25maWdQbGF5bGlzdC5wbGF5bGlzdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlbGV0ZSBjb25maWcuZHVyYXRpb247XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH07XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDb25maWd1cmF0b3IgbG9hZGVkLlwiLCBvcHRpb25zKTtcclxuICAgIGxldCBjb25maWcgPSBjb21wb3NlU291cmNlT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICBsZXQgZGVidWcgPSBjb25maWcuZGVidWc7XHJcbiAgICBsZXQgZGVmYXVsdFBsYXliYWNrUmF0ZSA9IGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlIHx8IDE7XHJcbiAgICBsZXQgaW1hZ2UgPSBjb25maWcuaW1hZ2U7XHJcbiAgICBsZXQgcGxheWJhY2tSYXRlQ29udHJvbHMgPSBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgfHwgdHJ1ZTtcclxuICAgIGxldCBwbGF5YmFja1JhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXMgfHwgWzAuNSwgMSwgMS4yNSwgMS41LCAyXTtcclxuICAgIGxldCBwbGF5bGlzdCA9IGNvbmZpZy5wbGF5bGlzdCB8fCBbXTtcclxuICAgIGxldCBxdWFsaXR5TGFiZWwgPSBjb25maWcucXVhbGl0eUxhYmVsIHx8IFwiXCI7XHJcbiAgICBsZXQgc291cmNlTGFiZWwgPSBjb25maWcuc291cmNlTGFiZWwgfHwgXCJcIjtcclxuICAgIGxldCByZXBlYXQgPSBjb25maWcucmVwZWF0IHx8IGZhbHNlO1xyXG4gICAgbGV0IHN0cmV0Y2hpbmcgPSBjb25maWcuc3RyZXRjaGluZyB8fCAndW5pZm9ybSc7XHJcbiAgICBsZXQgaXNUaW1lY29kZU1vZGUgPSBjb25maWcuaXNUaW1lY29kZU1vZGUgfHwgdHJ1ZTtcclxuXHJcblxyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge3JldHVybiBjb25maWc7fTtcclxuXHJcbiAgICB0aGF0LmlzRGVidWcgPSgpPT57cmV0dXJuIGRlYnVnO307XHJcblxyXG4gICAgdGhhdC5nZXREZWZhdWx0UGxheWJhY2tSYXRlID0oKT0+e3JldHVybiBkZWZhdWx0UGxheWJhY2tSYXRlO307XHJcbiAgICB0aGF0LnNldERlZmF1bHRQbGF5YmFja1JhdGUgPShwbGF5YmFja1JhdGUpPT57ZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTsgcmV0dXJuIHBsYXliYWNrUmF0ZTt9O1xyXG5cclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxhYmVsID0gKCkgPT4ge3JldHVybiBxdWFsaXR5TGFiZWw7fTtcclxuICAgIHRoYXQuc2V0UXVhbGl0eUxhYmVsID0gKG5ld0xhYmVsKSA9PiB7cXVhbGl0eUxhYmVsID0gbmV3TGFiZWw7fTtcclxuXHJcbiAgICB0aGF0LmdldFNvdXJjZUxhYmVsID0gKCkgPT4ge3JldHVybiBzb3VyY2VMYWJlbDt9O1xyXG4gICAgdGhhdC5zZXRTb3VyY2VMYWJlbCA9IChuZXdMYWJlbCkgPT4ge3NvdXJjZUxhYmVsID0gbmV3TGFiZWw7fTtcclxuXHJcbiAgICB0aGF0LnNldFRpbWVjb2RlTW9kZSA9IChpc1Nob3cpID0+IHtcclxuICAgICAgICBpZihpc1RpbWVjb2RlTW9kZSAhPT0gaXNTaG93KXtcclxuICAgICAgICAgICAgaXNUaW1lY29kZU1vZGUgPSBpc1Nob3c7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRURDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VEQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCA6IFwiLCBpc1RpbWVjb2RlTW9kZSk7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCwgaXNUaW1lY29kZU1vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBpc1RpbWVjb2RlTW9kZTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlcyA9KCk9PntyZXR1cm4gcGxheWJhY2tSYXRlczt9O1xyXG4gICAgdGhhdC5pc1BsYXliYWNrUmF0ZUNvbnRyb2xzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVDb250cm9sczt9O1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSgpPT57cmV0dXJuIHBsYXlsaXN0O307XHJcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3RfICk9PntcclxuICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RfKSl7XHJcbiAgICAgICAgICAgIHBsYXlsaXN0ID0gcGxheWxpc3RfO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwbGF5bGlzdCA9IFtwbGF5bGlzdF9dO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGxheWxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXNSZXBlYXQgPSgpPT57cmV0dXJuIHJlcGVhdDt9O1xyXG5cclxuICAgIHRoYXQuZ2V0U3RyZXRjaGluZyA9KCk9PntyZXR1cm4gc3RyZXRjaGluZzt9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdG9yO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDMuLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1vZHVsZSBwcm92aWRlIGN1c3RvbSBldmVudHMuXHJcbiAqIEBwYXJhbSAgIG9iamVjdCAgICBBbiBvYmplY3QgdGhhdCByZXF1aXJlcyBjdXN0b20gZXZlbnRzLlxyXG4gKlxyXG4gKiAqL1xyXG5cclxuY29uc3QgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24ob2JqZWN0KXtcclxuICAgIGxldCB0aGF0ID0gb2JqZWN0O1xyXG4gICAgbGV0IF9ldmVudHMgPVtdO1xyXG5cclxuICAgIGNvbnN0IHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MsIGNvbnRleHQpe1xyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gZXZlbnRzLmxlbmd0aDtcclxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIGV2ZW50Lmxpc3RlbmVyLmFwcGx5KCAoIGV2ZW50LmNvbnRleHQgfHwgY29udGV4dCApLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQub24gPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XHJcbiAgICAgICAgKF9ldmVudHNbbmFtZV0gfHwgKF9ldmVudHNbbmFtZV09W10pICkucHVzaCh7IGxpc3RlbmVyOiBsaXN0ZW5lciAgLCBjb250ZXh0IDogY29udGV4dH0pO1xyXG4gICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgfTtcclxuICAgIHRoYXQudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgICAgIGlmKCFfZXZlbnRzKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XHJcbiAgICAgICAgY29uc3QgYWxsRXZlbnRzID0gX2V2ZW50cy5hbGw7XHJcblxyXG4gICAgICAgIGlmKGV2ZW50cyl7XHJcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzLCB0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYWxsRXZlbnRzKXtcclxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cywgdGhhdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xyXG4gICAgICAgIGlmKCFfZXZlbnRzKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFuYW1lICYmICFsaXN0ZW5lciAmJiAhY29udGV4dCkgIHtcclxuICAgICAgICAgICAgX2V2ZW50cyA9IFtdO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5hbWVzID0gbmFtZSA/IFtuYW1lXSA6IE9iamVjdC5rZXlzKF9ldmVudHMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IF9ldmVudHNbbmFtZV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciAgfHwgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChsaXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLmxpc3RlbmVyICAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIuX2xpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldmVudC5jb250ZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfZXZlbnRzW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgfTtcclxuICAgIHRoYXQub25jZSA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGNvbnN0IG9uY2VDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoY291bnQrKykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQub2ZmKG5hbWUsIG9uY2VDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvbmNlQ2FsbGJhY2suX2xpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQub24obmFtZSwgb25jZUNhbGxiYWNrLCBjb250ZXh0KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlcjtcclxuIiwiaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBleGVjdXRlcyB0aGUgaW5wdXQgY29tbWFuZHMgYXQgYSBzcGVjaWZpYyBwb2ludCBpbiB0aW1lLlxuICogQHBhcmFtICAgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHF1ZXVlZENvbW1hbmRzXG4gKiAqL1xuY29uc3QgTGF6eUNvbW1hbmRFeGVjdXRvciA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgcXVldWVkQ29tbWFuZHMpIHtcbiAgICBsZXQgY29tbWFuZFF1ZXVlID0gW107XG4gICAgbGV0IHVuZGVjb3JhdGVkTWV0aG9kcyA9IHt9O1xuICAgIGxldCBleGVjdXRlTW9kZSA9IGZhbHNlO1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciBsb2FkZWQuXCIpO1xuICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gaW5zdGFuY2VbY29tbWFuZF07XG4gICAgICAgIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSA9IG1ldGhvZCB8fCBmdW5jdGlvbigpe307XG5cbiAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICAgICAgICBpZiAoIWV4ZWN1dGVNb2RlKSB7XG4gICAgICAgICAgICAgICAgLy9jb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgICAgICAgICAgICAgdGhhdC5hZGRRdWV1ZShjb21tYW5kLCBhcmdzKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZC5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgdmFyIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2hpbGUgKGNvbW1hbmRRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNvbW1hbmQsIGFyZ3MgfSA9IGNvbW1hbmRRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgKHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSB8fCBpbnN0YW5jZVtjb21tYW5kXSkuYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhhdC5zZXRFeGVjdXRlTW9kZSA9IChtb2RlKSA9PiB7XG4gICAgICAgIGV4ZWN1dGVNb2RlID0gbW9kZTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHNldEV4ZWN1dGVNb2RlKClcIiwgbW9kZSk7XG4gICAgfTtcbiAgICB0aGF0LmdldFVuZGVjb3JhdGVkTWV0aG9kcyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRVbmRlY29yYXRlZE1ldGhvZHMoKVwiLCB1bmRlY29yYXRlZE1ldGhvZHMpO1xuICAgICAgICByZXR1cm4gdW5kZWNvcmF0ZWRNZXRob2RzO1xuICAgIH1cbiAgICB0aGF0LmdldFF1ZXVlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFF1ZXVlKClcIiwgZ2V0UXVldWUpO1xuICAgICAgICByZXR1cm4gY29tbWFuZFF1ZXVlO1xuICAgIH1cbiAgICB0aGF0LmFkZFF1ZXVlID0gZnVuY3Rpb24oY29tbWFuZCwgYXJncyl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBhZGRRdWV1ZSgpXCIsIGNvbW1hbmQsIGFyZ3MpO1xuICAgICAgICBjb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgfVxuXG4gICAgdGhhdC5mbHVzaCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBmbHVzaCgpXCIpO1xuICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcbiAgICB9O1xuICAgIHRoYXQuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGVtcHR5KClcIik7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5sZW5ndGggPSAwO1xuICAgIH07XG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IG9mZigpXCIpO1xuICAgICAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XG4gICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgLy9SdW4gb25jZSBhdCB0aGUgZW5kXG4gICAgdGhhdC5yZW1vdmVBbmRFeGN1dGVPbmNlID0gZnVuY3Rpb24oY29tbWFuZF8pe1xuICAgICAgICBsZXQgY29tbWFuZFF1ZXVlSXRlbSA9IF8uZmluZFdoZXJlKGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogcmVtb3ZlQW5kRXhjdXRlT25jZSgpXCIsIGNvbW1hbmRfKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLnNwbGljZShfLmZpbmRJbmRleChjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KSwgMSk7XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcbiAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicmVtb3ZlQ29tbWFuZCgpXCIpO1xuICAgICAgICAgICAgaWYoY29tbWFuZFF1ZXVlSXRlbSl7XG4gICAgICAgICAgICAgICAgKG1ldGhvZHx8IGluc3RhbmNlW2NvbW1hbmRfXSkuYXBwbHkoaW5zdGFuY2UsIGNvbW1hbmRRdWV1ZUl0ZW0uYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kX10gPSBtZXRob2Q7XG4gICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgdGhhdC5vZmYoKTtcbiAgICAgICAgdGhhdC5lbXB0eSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IExhenlDb21tYW5kRXhlY3V0b3I7IiwiaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2h9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGZpbmRzIHRoZSBwcm92aWRlciB0aGF0IG1hdGNoZXMgdGhlIGlucHV0IHNvdXJjZS5cclxuICogQHBhcmFtXHJcbiAqICovXHJcblxyXG5jb25zdCBTdXBwb3J0Q2hlY2tlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciBsb2FkZWQuXCIpO1xyXG4gICAgY29uc3Qgc3VwcG9ydExpc3QgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnaHRtbDUnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IE1pbWVUeXBlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhYWM6ICdhdWRpby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZjR2OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtNHY6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdjogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbXAzOiAnYXVkaW8vbXBlZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbXBlZzogJ2F1ZGlvL21wZWcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9ndjogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2dnOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ2E6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZvcmJpczogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgd2VibTogJ3ZpZGVvL3dlYm0nLFxyXG4gICAgICAgICAgICAgICAgICAgIGY0YTogJ3ZpZGVvL2FhYycsXHJcbiAgICAgICAgICAgICAgICAgICAgbTN1ODogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcclxuICAgICAgICAgICAgICAgICAgICBtM3U6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGxzOiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZighdHlwZSl7cmV0dXJuIGZhbHNlO31cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFtaW1lVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISF2aWRlby5jYW5QbGF5VHlwZShtaW1lVHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3dlYnJ0YycsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2Rhc2gnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL21wZCBhcHBsaWNhdGlvbi9kYXNoK3htbFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRGFzaChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdobHMnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdGhpcyBtZXRob2QgZnJvbSBobHMuanNcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzSGxzU3VwcG9ydCA9ICgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRNZWRpYVNvdXJjZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Lk1lZGlhU291cmNlIHx8IHdpbmRvdy5XZWJLaXRNZWRpYVNvdXJjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVkaWFTb3VyY2UgPSBnZXRNZWRpYVNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXIgPSB3aW5kb3cuU291cmNlQnVmZmVyIHx8IHdpbmRvdy5XZWJLaXRTb3VyY2VCdWZmZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzVHlwZVN1cHBvcnRlZCA9IG1lZGlhU291cmNlICYmIHR5cGVvZiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQgPT09ICdmdW5jdGlvbicgJiYgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFLG1wNGEuNDAuMlwiJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIFNvdXJjZUJ1ZmZlciBpcyBleHBvc2VkIGVuc3VyZSBpdHMgQVBJIGlzIHZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2FmYXJpIGFuZCBvbGQgdmVyc2lvbiBvZiBDaHJvbWUgZG9lIG5vdCBleHBvc2UgU291cmNlQnVmZmVyIGdsb2JhbGx5IHNvIGNoZWNraW5nIFNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgaXMgaW1wb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXJWYWxpZEFQSSA9ICFzb3VyY2VCdWZmZXIgfHwgc291cmNlQnVmZmVyLnByb3RvdHlwZSAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5hcHBlbmRCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUucmVtb3ZlID09PSAnZnVuY3Rpb24nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWlzVHlwZVN1cHBvcnRlZCAmJiAhIXNvdXJjZUJ1ZmZlclZhbGlkQVBJO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIHRoaXMgJyEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyknIGlmIHlvdSB3YW50IHRvIHVzZSBobHNqcy5cclxuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKSAmJiAhIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdydG1wJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBdO1xyXG5cclxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlID0gKHNvcnVjZV8pID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSgpXCIsIHNvcnVjZV8pO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IChzb3J1Y2VfID09PSBPYmplY3Qoc29ydWNlXykpID8gc29ydWNlXyA6IHt9O1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdXBwb3J0TGlzdC5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBpZihzdXBwb3J0TGlzdFtpXS5jaGVja1N1cHBvcnQoc291cmNlKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydExpc3RbaV0ubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCA9IChwbGF5bGlzdF8pID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCgpXCIsIHBsYXlsaXN0Xyk7XHJcbiAgICAgICAgbGV0IHN1cHBvcnROYW1lcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBwbGF5bGlzdF9baV07XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2UgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSBpdGVtLnNvdXJjZXNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnROYW1lcy5wdXNoKHN1cHBvcnRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdXBwb3J0TmFtZXM7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiA0Li5cclxuICovXHJcbmltcG9ydCBhamF4IGZyb20gXCJ1dGlscy9hamF4Lm1pblwiO1xyXG5pbXBvcnQgU3J0UGFyc2VyIGZyb20gXCJhcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyXCI7XHJcbmltcG9ydCBTYW1pUGFyc2VyIGZyb20gXCJhcGkvY2FwdGlvbi9wYXJzZXIvU21pUGFyc2VyXCI7XHJcbmltcG9ydCBWVFRDdWUgZnJvbSAndXRpbHMvY2FwdGlvbnMvdnR0Q3VlJztcclxuXHJcblxyXG5jb25zdCBMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG5cclxuICAgIC8vZm9yIHRlc3QuIGRzdF90eXBlIDogd2VidnR0LCBzcnQsIHNhbWlcclxuICAgIGxldCBjb252ZXJ0VlRUVXJsID0gZnVuY3Rpb24odHJhY2tVcmwpe1xyXG5cclxuICAgICAgICByZXR1cm4gXCJodHRwczovL3N1YnRpdGxlcy5vdmVuY2xvdWQuY29tOjg0NTMvdjEvc3VidGl0bGVzP3VybD1cIitlc2NhcGUodHJhY2tVcmwpK1wiJnNyY190eXBlPXNydCZkc3RfdHlwZT13ZWJ2dHQmZmlsZV9uYW1lPW92ZW5wbGF5ZXIyMDE4XCI7XHJcbiAgICB9O1xyXG4gICAgbGV0IGNvbnZlcnRUb1ZUVEN1ZXMgPSBmdW5jdGlvbiAoY3Vlcykge1xyXG4gICAgICAgIHJldHVybiBjdWVzLm1hcChjdWUgPT4gbmV3IFZUVEN1ZShjdWUuc3RhcnQsIGN1ZS5lbmQsIGN1ZS50ZXh0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5sb2FkID0gKHRyYWNrLCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spID0+IHtcclxuICAgICAgICBhamF4KCkuZ2V0KHRyYWNrLmZpbGUpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UsIHhocil7XHJcbiAgICAgICAgICAgIGxldCBjdWVzID0gW107XHJcbiAgICAgICAgICAgIGxldCB2dHRDdWVzID0gW107XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFKQVhcIik7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyh4aHIpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlVGV4dCA9IHhoci5yZXNwb25zZVRleHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VUZXh0LmluZGV4T2YoJ1dFQlZUVCcpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJWVFQgTE9BREVEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRWdHRQYXJzZXIoKS50aGVuKFdlYlZUVCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgV2ViVlRULlBhcnNlcih3aW5kb3csIFdlYlZUVC5TdHJpbmdEZWNvZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5vbmN1ZSA9IGZ1bmN0aW9uKGN1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3Vlcy5wdXNoKGN1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5vbmZsdXNoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIGNhbGxzIG9uZmx1c2ggaW50ZXJuYWxseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucGFyc2UocmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihyZXNwb25zZVRleHQuaW5kZXhPZignU0FNSScpID49IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNBTUkgTE9BREVEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZWREYXRhID0gU2FtaVBhcnNlcihyZXNwb25zZVRleHQsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gY29udmVydFRvVlRUQ3VlcyhwYXJzZWREYXRhLnJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKHZ0dEN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU1JUIExPQURFRFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjdWVzID0gU3J0UGFyc2VyKHJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdnR0Q3VlcyA9IGNvbnZlcnRUb1ZUVEN1ZXMoY3Vlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKHZ0dEN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XHJcbiAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuZnVuY3Rpb24gbG9hZFZ0dFBhcnNlcigpIHtcclxuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICByZXR1cm4gcmVxdWlyZSgnYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlcicpLmRlZmF1bHQ7XHJcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ3Z0dHBhcnNlcicpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb2FkZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMTcuLlxyXG4gKi9cclxuaW1wb3J0IENhcHRpb25Mb2FkZXIgZnJvbSAnYXBpL2NhcHRpb24vTG9hZGVyJztcclxuaW1wb3J0IHtSRUFEWSwgRVJST1IsIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRCwgUExBWUVSX0NBUFRJT05fRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG5jb25zdCBpc1N1cHBvcnQgPSBmdW5jdGlvbihraW5kKXtcclxuICAgIHJldHVybiBraW5kID09PSAnc3VidGl0bGVzJyB8fCBraW5kID09PSAnY2FwdGlvbnMnO1xyXG59O1xyXG5cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGFwaSl7XHJcblxyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGNhcHRpb25MaXN0ID0gW107XHJcbiAgICBsZXQgY3VycmVudENhcHRpb25JbmRleCA9IC0xO1xyXG5cclxuICAgIGxldCBjYXB0aW9uTG9hZGVyID0gQ2FwdGlvbkxvYWRlcigpO1xyXG4gICAgbGV0IGlzRmlzcnRMb2FkID0gdHJ1ZTtcclxuICAgIGxldCBpc1Nob3dpbmcgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ2FwdGlvbiBNYW5hZ2VyID4+IFwiKTtcclxuXHJcblxyXG4gICAgbGV0IGJpbmRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCB2dHRDdWVzKXtcclxuICAgICAgICB0cmFjay5kYXRhID0gdnR0Q3VlcyB8fCBbXTtcclxuICAgICAgICB0cmFjay5uYW1lID0gdHJhY2subGFiZWwgfHwgdHJhY2submFtZSB8fCB0cmFjay5sYW5ndWFnZTtcclxuICAgICAgICB0cmFjay5pZCA9IChmdW5jdGlvbih0cmFjaywgdHJhY2tzQ291bnQpIHtcclxuICAgICAgICAgICAgdmFyIHRyYWNrSWQ7XHJcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSB0cmFjay5raW5kIHx8ICdjYyc7XHJcbiAgICAgICAgICAgIGlmICh0cmFjay5kZWZhdWx0IHx8IHRyYWNrLmRlZmF1bHR0cmFjaykge1xyXG4gICAgICAgICAgICAgICAgdHJhY2tJZCA9ICdkZWZhdWx0JztcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cmFja0lkID0gdHJhY2suaWQgfHwgKHByZWZpeCArIHRyYWNrc0NvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpc0Zpc3J0TG9hZCl7XHJcbiAgICAgICAgICAgICAgICAvL1RoaXMgZXhlY3V0ZSBvbmx5IG9uLiBhbmQgdGhlbiB1c2UgZmx1c2hDYXB0aW9uTGlzdChsYXN0Q2FwdGlvbkluZGV4KTtcclxuICAgICAgICAgICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKGNhcHRpb25MaXN0Lmxlbmd0aHx8MCk7XHJcbiAgICAgICAgICAgICAgICBpc0Zpc3J0TG9hZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJhY2tJZDtcclxuICAgICAgICB9KSh0cmFjaywgY2FwdGlvbkxpc3QubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgY2FwdGlvbkxpc3QucHVzaCh0cmFjayk7XHJcbiAgICAgICAgcmV0dXJuIHRyYWNrLmlkO1xyXG4gICAgfTtcclxuICAgIGxldCBjaGFuZ2VDdXJyZW50Q2FwdGlvbiA9IGZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICBjdXJyZW50Q2FwdGlvbkluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYXBpLnRyaWdnZXIoQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQsIGN1cnJlbnRDYXB0aW9uSW5kZXgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBhcGkub24oUkVBRFksIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoYXBpLmdldENvbmZpZygpLnBsYXlsaXN0ICYmIGFwaS5nZXRDb25maWcoKS5wbGF5bGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0ID0gYXBpLmdldENvbmZpZygpLnBsYXlsaXN0WzBdO1xyXG4gICAgICAgICAgICBpZihwbGF5bGlzdCAmJiBwbGF5bGlzdC50cmFja3MgJiYgcGxheWxpc3QudHJhY2tzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0LnRyYWNrcy5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrID0gcGxheWxpc3QudHJhY2tzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlzU3VwcG9ydCh0cmFjay5raW5kKSAmJiAhIF8uZmluZFdoZXJlKHRyYWNrLCB7ZmlsZSA6IHRyYWNrLmZpbGV9KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb25Mb2FkZXIubG9hZCh0cmFjaywgZnVuY3Rpb24odnR0Q3Vlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2dHRDdWVzICYmIHZ0dEN1ZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhcHRpb25JZCA9IGJpbmRUcmFjayh0cmFjaywgdnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKEVSUk9SLCB7Y29kZSA6IFBMQVlFUl9DQVBUSU9OX0VSUk9SLCByZWFzb24gOiBcImNhcHRpb24gbG9hZCBlcnJvci5cIiwgbWVzc2FnZSA6IFwiY2FwdGlvbiBsb2FkIGVycm9yLlwiLCBlcnJvciA6IGVycm9yfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGFwaS5vbihDT05URU5UX1RJTUUsIGZ1bmN0aW9uKG1ldGEpe1xyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IG1ldGEucG9zaXRpb247XHJcbiAgICAgICAgaWYoY3VycmVudENhcHRpb25JbmRleCA+IC0xICYmIGNhcHRpb25MaXN0W2N1cnJlbnRDYXB0aW9uSW5kZXhdKXtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRDdWVzID0gXy5maWx0ZXIoY2FwdGlvbkxpc3RbY3VycmVudENhcHRpb25JbmRleF0uZGF0YSwgZnVuY3Rpb24gKGN1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uID49IChjdWUuc3RhcnRUaW1lKSAmJiAoICghY3VlLmVuZFRpbWUgfHwgcG9zaXRpb24pIDw9IGN1ZS5lbmRUaW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRDdWVzICYmIGN1cnJlbnRDdWVzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBjdXJyZW50Q3Vlc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbiAgICB0aGF0LmZsdXNoQ2FwdGlvbkxpc3QgPSAobGFzdENhcHRpb25JbmRleCkgPT57XHJcbiAgICAgICAgY2FwdGlvbkxpc3QgPSBbXTtcclxuICAgICAgICBjaGFuZ2VDdXJyZW50Q2FwdGlvbihsYXN0Q2FwdGlvbkluZGV4KTtcclxuICAgICAgICAvL2N1cnJlbnRDYXB0aW9uSW5kZXggPSBsYXN0Q2FwdGlvbkluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gY2FwdGlvbkxpc3R8fFtdO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudENhcHRpb24gPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gY3VycmVudENhcHRpb25JbmRleDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRDYXB0aW9uID0gKF9pbmRleCkgPT57XHJcbiAgICAgICAgaWYoX2luZGV4ID4gLTIgJiYgX2luZGV4IDwgY2FwdGlvbkxpc3QubGVuZ3RoKXtcclxuICAgICAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24oX2luZGV4KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT57XHJcbiAgICAgICAgaWYoaXNTdXBwb3J0KHRyYWNrLmtpbmQpICYmICEgXy5maW5kV2hlcmUoY2FwdGlvbkxvYWRlciwge2ZpbGUgOiB0cmFjay5maWxlfSkpe1xyXG4gICAgICAgICAgICBjYXB0aW9uTG9hZGVyLmxvYWQodHJhY2ssIGZ1bmN0aW9uKHZ0dEN1ZXMpe1xyXG4gICAgICAgICAgICAgICAgaWYodnR0Q3VlcyAmJiB2dHRDdWVzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmRUcmFjayh0cmFjaywgdnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKEVSUk9SLCB7Y29kZSA6IFBMQVlFUl9DQVBUSU9OX0VSUk9SLCByZWFzb24gOiBcImNhcHRpb24gbG9hZCBlcnJvci5cIiwgbWVzc2FnZSA6IFwiY2FwdGlvbiBsb2FkIGVycm9yLlwiLCBlcnJvciA6IGVycm9yfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LnJlbW92ZUNhcHRpb24gPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBpZihpbmRleCA+IC0xICYmIGluZGV4IDwgY2FwdGlvbkxpc3QubGVuZ3RoKXtcclxuICAgICAgICAgICAgY2FwdGlvbkxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhcHRpb25MaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcclxuIiwiXHJcbi8qXHJcbiAqICBzYW1pLXBhcnNlclxyXG4gKiAgVGhlIE1JVCBMaWNlbnNlIChNSVQpXHJcbiAqXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTMgQ29uc3RhbnRpbmUgS2ltIDxlbGVnYW50Y29kZXJAZ21haWwuY29tPlxyXG4gKiAgaHR0cHM6Ly9naXRodWIuY29tL2VsZWdhbnRjb2Rlci9zYW1pLXBhcnNlclxyXG4gKlxyXG4gKi9cclxuXHJcbmNvbnN0IGxhbmdDb2RlcyA9IFtcImFiXCIsXCJhYVwiLFwiYWZcIiwgXCJha1wiLCBcInNxXCIsIFwiYW1cIiwgXCJhclwiLCBcImFuXCIsIFwiaHlcIiwgXCJhc1wiLCBcImF2XCIsIFwiYWVcIiwgXCJheVwiLCBcImF6XCIsIFwiYm1cIiwgXCJiYVwiLCBcImV1XCIsIFwiYmVcIiwgXCJiblwiLCBcImJoXCIsIFwiYmlcIiwgXCJuYlwiLFwiYnNcIixcImJyXCIsXCJiZ1wiLFwibXlcIixcImVzXCIsXCJjYVwiLFwia21cIixcImNoXCIsXCJjZVwiLFwibnlcIixcIm55XCIsXCJ6aFwiLFwiemFcIixcImN1XCIsXCJjdVwiLFwiY3ZcIixcImt3XCIsXHJcbiAgICBcImNvXCIsXCJjclwiLFwiaHJcIixcImNzXCIsXCJkYVwiLFwiZHZcIixcImR2XCIsXCJubFwiLFwiZHpcIixcImVuXCIsXCJlb1wiLFwiZXRcIixcImVlXCIsXCJmb1wiLFwiZmpcIixcImZpXCIsXCJubFwiLFwiZnJcIixcImZmXCIsXCJnZFwiLFwiZ2xcIixcImxnXCIsXCJrYVwiLFwiZGVcIixcImtpXCIsXCJlbFwiLFwia2xcIixcImduXCIsXCJndVwiLFwiaHRcIixcImh0XCIsXCJoYVwiLFwiaGVcIixcImh6XCIsXCJoaVwiLFwiaG9cIixcImh1XCIsXCJpc1wiLFwiaW9cIixcImlnXCIsXCJpZFwiLFwiaWFcIixcImllXCIsXCJpdVwiLFwiaWtcIixcImdhXCIsXHJcbiAgICBcIml0XCIsXCJqYVwiLFwianZcIixcImtsXCIsXCJrblwiLFwia3JcIixcImtzXCIsXCJra1wiLFwia2lcIixcInJ3XCIsXCJreVwiLFwia3ZcIixcImtnXCIsXCJrb1wiLFwia2pcIixcImt1XCIsXCJralwiLFwia3lcIixcImxvXCIsXCJsYVwiLFwibHZcIixcImxiXCIsXCJsaVwiLFwibGlcIixcImxpXCIsXCJsblwiLFwibHRcIixcImx1XCIsXCJsYlwiLFwibWtcIixcIm1nXCIsXCJtc1wiLFwibWxcIixcImR2XCIsXCJtdFwiLFwiZ3ZcIixcIm1pXCIsXCJtclwiLFwibWhcIixcInJvXCIsXCJyb1wiLFwibW5cIixcIm5hXCIsXCJudlwiLFwibnZcIixcIm5kXCIsXHJcbiAgICBcIm5yXCIsXCJuZ1wiLFwibmVcIixcIm5kXCIsXCJzZVwiLFwibm9cIixcIm5iXCIsXCJublwiLFwiaWlcIixcIm55XCIsXCJublwiLFwiaWVcIixcIm9jXCIsXCJvalwiLFwiY3VcIixcImN1XCIsXCJjdVwiLFwib3JcIixcIm9tXCIsXCJvc1wiLFwib3NcIixcInBpXCIsXCJwYVwiLFwicHNcIixcImZhXCIsXCJwbFwiLFwicHRcIixcInBhXCIsXCJwc1wiLFwicXVcIixcInJvXCIsXCJybVwiLFwicm5cIixcInJ1XCIsXCJzbVwiLFwic2dcIixcInNhXCIsXCJzY1wiLFwiZ2RcIixcInNyXCIsXCJzblwiLFwiaWlcIixcInNkXCIsXCJzaVwiLFwic2lcIixcInNrXCIsXHJcbiAgICBcInNsXCIsXCJzb1wiLFwic3RcIixcIm5yXCIsXCJlc1wiLFwic3VcIixcInN3XCIsXCJzc1wiLFwic3ZcIixcInRsXCIsXCJ0eVwiLFwidGdcIixcInRhXCIsXCJ0dFwiLFwidGVcIixcInRoXCIsXCJib1wiLFwidGlcIixcInRvXCIsXCJ0c1wiLFwidG5cIixcInRyXCIsXCJ0a1wiLFwidHdcIixcInVnXCIsXCJ1a1wiLFwidXJcIixcInVnXCIsXCJ1elwiLFwiY2FcIixcInZlXCIsXCJ2aVwiLFwidm9cIixcIndhXCIsXCJjeVwiLFwiZnlcIixcIndvXCIsXCJ4aFwiLFwieWlcIixcInlvXCIsXCJ6YVwiLFwienVcIl07XHJcblxyXG5jb25zdCByZU9wZW5TeW5jID0gLzxzeW5jL2k7XHJcblxyXG5jb25zdCByZUNsb3NlU3luYyA9IC88c3luY3w8XFwvYm9keXw8XFwvc2FtaS9pO1xyXG5cclxuY29uc3QgcmVMaW5lRW5kaW5nID0gL1xcclxcbj98XFxuL2c7XHJcblxyXG5jb25zdCByZUJyb2tlblRhZyA9IC88W2Etel0qW14+XSo8W2Etel0qL2c7XHJcblxyXG5jb25zdCByZVN0YXJ0VGltZSA9IC88c3luY1tePl0rP3N0YXJ0W149XSo9W14wLTldKihbMC05XSopW1wiXjAtOVwiXSovaTtcclxuXHJcbmNvbnN0IHJlQnIgPSAvPGJyW14+XSo+L2lnO1xyXG5cclxuY29uc3QgcmVTdHlsZSA9IC88c3R5bGVbXj5dKj4oW1xcc1xcU10qPyk8XFwvc3R5bGVbXj5dKj4vaTtcclxuXHJcbmNvbnN0IHJlQ29tbWVudCA9IC8oPCEtLXwtLT4pL2c7XHJcblxyXG5jb25zdCBjbG9uZSA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgdmFyIGZsYWdzLCBrZXksIG5ld0luc3RhbmNlO1xyXG4gICAgaWYgKChvYmogPT0gbnVsbCkgfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUob2JqLmdldFRpbWUoKSk7XHJcbiAgICB9XHJcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgUmVnRXhwKSB7XHJcbiAgICAgICAgZmxhZ3MgPSAnJztcclxuICAgICAgICBpZiAob2JqLmdsb2JhbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZsYWdzICs9ICdnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9iai5pZ25vcmVDYXNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZmxhZ3MgKz0gJ2knO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob2JqLm11bHRpbGluZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZsYWdzICs9ICdtJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9iai5zdGlja3kgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmbGFncyArPSAneSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKG9iai5zb3VyY2UsIGZsYWdzKTtcclxuICAgIH1cclxuICAgIG5ld0luc3RhbmNlID0gbmV3IG9iai5jb25zdHJ1Y3RvcigpO1xyXG4gICAgZm9yIChrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgbmV3SW5zdGFuY2Vba2V5XSA9IGNsb25lKG9ialtrZXldKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdJbnN0YW5jZTtcclxufTtcclxuXHJcbmNvbnN0IHN0cmlwX3RhZ3MgPSBmdW5jdGlvbiAoaW5wdXQsIGFsbG93ZWQpIHtcclxuICAgIC8vIGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0XHJcbiAgICAvLyArICAgb3JpZ2luYWwgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxyXG4gICAgLy8gKyAgIGltcHJvdmVkIGJ5OiBMdWtlIEdvZGZyZXlcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogUHVsXHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBPbm5vIE1hcnNtYW5cclxuICAgIC8vICsgICAgICBpbnB1dCBieTogQWxleFxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldClcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogTWFyYyBQYWxhdVxyXG4gICAgLy8gKyAgIGltcHJvdmVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldClcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IEVyaWMgTmFnZWxcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogQm9iYnkgRHJha2VcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IFRvbWFzeiBXZXNvbG93c2tpXHJcbiAgICAvLyArICAgICAgaW5wdXQgYnk6IEV2ZXJ0amFuIEdhcnJldHNlblxyXG4gICAgLy8gKyAgICByZXZpc2VkIGJ5OiBSYWZhxYIgS3VrYXdza2kgKGh0dHA6Ly9ibG9nLmt1a2F3c2tpLnBsLylcclxuICAgIC8vICogICAgIGV4YW1wbGUgMTogc3RyaXBfdGFncygnPHA+S2V2aW48L3A+IDxiciAvPjxiPnZhbjwvYj4gPGk+Wm9ubmV2ZWxkPC9pPicsICc8aT48Yj4nKTtcclxuICAgIC8vICogICAgIHJldHVybnMgMTogJ0tldmluIDxiPnZhbjwvYj4gPGk+Wm9ubmV2ZWxkPC9pPidcclxuICAgIC8vICogICAgIGV4YW1wbGUgMjogc3RyaXBfdGFncygnPHA+S2V2aW4gPGltZyBzcmM9XCJzb21laW1hZ2UucG5nXCIgb25tb3VzZW92ZXI9XCJzb21lRnVuY3Rpb24oKVwiPnZhbiA8aT5ab25uZXZlbGQ8L2k+PC9wPicsICc8cD4nKTtcclxuICAgIC8vICogICAgIHJldHVybnMgMjogJzxwPktldmluIHZhbiBab25uZXZlbGQ8L3A+J1xyXG4gICAgLy8gKiAgICAgZXhhbXBsZSAzOiBzdHJpcF90YWdzKFwiPGEgaHJlZj0naHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQnPktldmluIHZhbiBab25uZXZlbGQ8L2E+XCIsIFwiPGE+XCIpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyAzOiAnPGEgaHJlZj0naHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQnPktldmluIHZhbiBab25uZXZlbGQ8L2E+J1xyXG4gICAgLy8gKiAgICAgZXhhbXBsZSA0OiBzdHJpcF90YWdzKCcxIDwgNSA1ID4gMScpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyA0OiAnMSA8IDUgNSA+IDEnXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDU6IHN0cmlwX3RhZ3MoJzEgPGJyLz4gMScpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyA1OiAnMSAgMSdcclxuICAgIC8vICogICAgIGV4YW1wbGUgNjogc3RyaXBfdGFncygnMSA8YnIvPiAxJywgJzxicj4nKTtcclxuICAgIC8vICogICAgIHJldHVybnMgNjogJzEgIDEnXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDc6IHN0cmlwX3RhZ3MoJzEgPGJyLz4gMScsICc8YnI+PGJyLz4nKTtcclxuICAgIC8vICogICAgIHJldHVybnMgNzogJzEgPGJyLz4gMSdcclxuICAgIGFsbG93ZWQgPSAoKChhbGxvd2VkIHx8IFwiXCIpICsgXCJcIikudG9Mb3dlckNhc2UoKS5tYXRjaCgvPFthLXpdW2EtejAtOV0qPi9nKSB8fCBbXSkuam9pbignJyk7IC8vIG1ha2luZyBzdXJlIHRoZSBhbGxvd2VkIGFyZyBpcyBhIHN0cmluZyBjb250YWluaW5nIG9ubHkgdGFncyBpbiBsb3dlcmNhc2UgKDxhPjxiPjxjPilcclxuICAgIHZhciB0YWdzID0gLzxcXC8/KFthLXpdW2EtejAtOV0qKVxcYltePl0qPi9naSxcclxuICAgICAgICBjb21tZW50c0FuZFBocFRhZ3MgPSAvPCEtLVtcXHNcXFNdKj8tLT58PFxcPyg/OnBocCk/W1xcc1xcU10qP1xcPz4vZ2k7XHJcbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZShjb21tZW50c0FuZFBocFRhZ3MsICcnKS5yZXBsYWNlKHRhZ3MsIGZ1bmN0aW9uKCQwLCAkMSkge1xyXG4gICAgICAgIHJldHVybiBhbGxvd2VkLmluZGV4T2YoJzwnICsgJDEudG9Mb3dlckNhc2UoKSArICc+JykgPiAtMSA/ICQwIDogJyc7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IF9zb3J0ID0gZnVuY3Rpb24obGFuZ0l0ZW0pIHtcclxuICAgIHJldHVybiBsYW5nSXRlbS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICB2YXIgcmVzO1xyXG4gICAgICAgIGlmICgocmVzID0gYS5zdGFydCAtIGIuc3RhcnQpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmVuZCAtIGIuZW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBfbWVyZ2VNdWx0aUxhbmd1YWdlcyA9IGZ1bmN0aW9uKGFycikge1xyXG4gICAgdmFyIGNvbnRlbnQsIGRpY3QsIGksIGlkeCwga2V5LCBsYW5nLCByZXQsIHZhbCwgX2ksIF9sZW4sIF9yZWY7XHJcbiAgICBkaWN0ID0ge307XHJcbiAgICBpID0gYXJyLmxlbmd0aDtcclxuICAgIHJldCA9IFtdO1xyXG4gICAgZm9yIChpID0gX2kgPSAwLCBfbGVuID0gYXJyLmxlbmd0aDsgX2kgPCBfbGVuOyBpID0gKytfaSkge1xyXG4gICAgICAgIHZhbCA9IGFycltpXTtcclxuICAgICAgICBrZXkgPSB2YWwuc3RhcnRUaW1lICsgJywnICsgdmFsLmVuZFRpbWU7XHJcbiAgICAgICAgaWYgKChpZHggPSBkaWN0W2tleV0pICE9PSB2b2lkIDApIHtcclxuICAgICAgICAgICAgX3JlZiA9IHZhbC5sYW5ndWFnZXM7XHJcbiAgICAgICAgICAgIGZvciAobGFuZyBpbiBfcmVmKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gX3JlZltsYW5nXTtcclxuICAgICAgICAgICAgICAgIHJldFtpZHhdLmxhbmd1YWdlc1tsYW5nXSA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXQucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICBkaWN0W2tleV0gPSByZXQubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0O1xyXG59O1xyXG5cclxuY29uc3QgU21pUGFyc2VyID0gZnVuY3Rpb24oc2FtaSwgb3B0aW9ucykge1xyXG4gICAgdmFyIGRlZmluZWRMYW5ncywgZHVyYXRpb24sIGVycm9ycywgZ2V0RGVmaW5lZExhbmdzLCBnZXRMYW5ndWFnZSwga2V5LCBtYWtlRW5kVGltZSwgcGFyc2UsIHJlc3VsdCwgdmFsdWUsIF9yZWY7XHJcbiAgICBwYXJzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50LCBlcnJvciwgaW5uZXJUZXh0LCBpc0Jyb2tlbiwgaXRlbSwgbGFuZywgbGFuZ0l0ZW0sIGxpbmVOdW0sIG5leHRTdGFydFRhZ0lkeCwgcmV0LCBzdGFydFRhZ0lkeCwgc3RhcnRUaW1lLCBzdHIsIHRlbXBSZXQsIF9yZWYsIF9yZWYxLCBfcmVmMjtcclxuICAgICAgICBlcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZhciBlO1xyXG4gICAgICAgICAgICBlID0gbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgZS5saW5lID0gbGluZU51bTtcclxuICAgICAgICAgICAgZS5jb250ZXh0ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgcmV0dXJuIGVycm9ycy5wdXNoKGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGluZU51bSA9IDE7XHJcbiAgICAgICAgcmV0ID0gW107XHJcbiAgICAgICAgdGVtcFJldCA9IHt9O1xyXG4gICAgICAgIHN0ciA9IHNhbWk7XHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgc3RhcnRUYWdJZHggPSBzdHIuc2VhcmNoKCk7XHJcbiAgICAgICAgICAgIGlmIChuZXh0U3RhcnRUYWdJZHggPD0gMCB8fCBzdGFydFRhZ0lkeCA8IDApIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5leHRTdGFydFRhZ0lkeCA9IHN0ci5zbGljZShzdGFydFRhZ0lkeCArIDEpLnNlYXJjaChyZUNsb3NlU3luYykgKyAxO1xyXG4gICAgICAgICAgICBpZiAobmV4dFN0YXJ0VGFnSWR4ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHN0ci5zbGljZShzdGFydFRhZ0lkeCwgc3RhcnRUYWdJZHggKyBuZXh0U3RhcnRUYWdJZHgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHN0ci5zbGljZShzdGFydFRhZ0lkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGluZU51bSArPSAoKF9yZWYgPSBzdHIuc2xpY2UoMCwgc3RhcnRUYWdJZHgpLm1hdGNoKHJlTGluZUVuZGluZykpICE9IG51bGwgPyBfcmVmLmxlbmd0aCA6IHZvaWQgMCkgfHwgMDtcclxuICAgICAgICAgICAgaWYgKGlzQnJva2VuID0gcmVCcm9rZW5UYWcudGVzdChlbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IoJ0VSUk9SX0JST0tFTl9UQUdTJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RyID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4ICsgbmV4dFN0YXJ0VGFnSWR4KTtcclxuICAgICAgICAgICAgc3RhcnRUaW1lID0gKygoX3JlZjEgPSBlbGVtZW50Lm1hdGNoKHJlU3RhcnRUaW1lKSkgIT0gbnVsbCA/IF9yZWYxWzFdLzEwMDAgOiB2b2lkIDApOyAgLy9IU0xFRSBtcyAtPiBzIOuhnCDrs4Dqsr1cclxuICAgICAgICAgICAgaWYgKHN0YXJ0VGltZSA9PT0gbnVsbCB8fCBzdGFydFRpbWUgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcignRVJST1JfSU5WQUxJRF9USU1FJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9IU0xFRSA6IDIwMTgwNTMwIC0g7Jqw66awIOuereq4sOyngCDqtazrtoTsnbQg7ZWE7JqUIOyXhuuLpC4g7J6I64qU6rGwIOq3uOuMgOuhnCDrs7Tsl6zspITrv5BcclxuICAgICAgICAgICAgbGFuZyA9IGdldExhbmd1YWdlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAvKmlmICghbGFuZykge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IoJ0VSUk9SX0lOVkFMSURfTEFOR1VBR0UnKTtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIGxpbmVOdW0gKz0gKChfcmVmMiA9IGVsZW1lbnQubWF0Y2gocmVMaW5lRW5kaW5nKSkgIT0gbnVsbCA/IF9yZWYyLmxlbmd0aCA6IHZvaWQgMCkgfHwgMDtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucmVwbGFjZShyZUxpbmVFbmRpbmcsICcnKTtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucmVwbGFjZShyZUJyLCBcIlxcblwiKTtcclxuICAgICAgICAgICAgaW5uZXJUZXh0ID0gc3RyaXBfdGFncyhlbGVtZW50KS50cmltKCk7XHJcbiAgICAgICAgICAgIC8vSFNMRUUgOiAyMDE4MDUzMCAtIOyasOumsCDrnq3quLDsp4Ag6rWs67aE7J20IO2VhOyalCDsl4bri6QuIOyeiOuKlOqxsCDqt7jrjIDroZwg67O07Jes7KSE67+QXHJcbiAgICAgICAgICAgIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgLy9sYW5ndWFnZXM6IHt9LFxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2UgOiBsYW5nLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJcIixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRzOiBpbm5lclRleHRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy9IU0xFRSA6IDIwMTgwNTMwIC0g7Jqw66awIOuereq4sOyngCDqtazrtoTsnbQg7ZWE7JqUIOyXhuuLpC4g7J6I64qU6rGwIOq3uOuMgOuhnCDrs7Tsl6zspITrv5BcclxuICAgICAgICAgICAgaWYgKGxhbmcpIHtcclxuICAgICAgICAgICAgICAgIC8vaXRlbS5sYW5ndWFnZXNbbGFuZ10gPSBpbm5lclRleHQ7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnRleHQgPSBpbm5lclRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGVtcFJldFtsYW5nXSB8fCAodGVtcFJldFtsYW5nXSA9IFtdKTtcclxuICAgICAgICAgICAgaWYoaXRlbS5zdGFydCl7XHJcbiAgICAgICAgICAgICAgICB0ZW1wUmV0W2xhbmddLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vSFNMRUUgOiAyMDE4MDUzMCAtIOyasOumsCDrnq3quLDsp4Ag6rWs67aE7J20IO2VhOyalCDsl4bri6QuIOyeiOuKlOqxsCDqt7jrjIDroZwg67O07Jes7KSE67+QXHJcbiAgICAgICAgZm9yIChsYW5nIGluIHRlbXBSZXQpIHtcclxuICAgICAgICAgICAgbGFuZ0l0ZW0gPSB0ZW1wUmV0W2xhbmddO1xyXG4gICAgICAgICAgICBsYW5nSXRlbSA9IF9zb3J0KGxhbmdJdGVtKTtcclxuICAgICAgICAgICAgbGFuZ0l0ZW0gPSBtYWtlRW5kVGltZShsYW5nSXRlbSk7XHJcbiAgICAgICAgICAgIC8vSFNMRUUgOiDsnbTsmZXsnbTrqbQgU1JUIO2MjOyEnOyZgCDtj6zrp7fsnYQg66ee7LaU7J6QXHJcbiAgICAgICAgICAgIC8vbGFuZ0l0ZW0uc3RhcnQgPSBsYW5nSXRlbS5zdGFydCAvIDEwMDA7XHJcbiAgICAgICAgICAgIC8vbGFuZ0l0ZW0uZW5kID0gbGFuZ0l0ZW0uZW5kIC8gMTAwMDtcclxuICAgICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChsYW5nSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vSFNMRUUgOiAyMDE4MDUzMCAtIOyasOumsCDrnq3quLDsp4Ag6rWs67aE7J20IO2VhOyalCDsl4bri6QuIOyeiOuKlOqxsCDqt7jrjIDroZwg67O07Jes7KSE67+QXHJcbiAgICAgICAgLy9yZXQgPSBfbWVyZ2VNdWx0aUxhbmd1YWdlcyhyZXQpO1xyXG4gICAgICAgIHJldCA9IF9zb3J0KHJldCk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH07XHJcbiAgICBnZXRMYW5ndWFnZSA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgY2xhc3NOYW1lLCBsYW5nO1xyXG4gICAgICAgIGlmKCFlbGVtZW50KXtyZXR1cm4gO31cclxuICAgICAgICBmb3IgKGNsYXNzTmFtZSBpbiBkZWZpbmVkTGFuZ3MpIHtcclxuICAgICAgICAgICAgbGFuZyA9IGRlZmluZWRMYW5nc1tjbGFzc05hbWVdO1xyXG4gICAgICAgICAgICBpZiAobGFuZy5yZUNsYXNzTmFtZS50ZXN0KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFuZy5sYW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGdldERlZmluZWRMYW5ncyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjbGFzc05hbWUsIGRlY2xhcmF0aW9uLCBlLCBlcnJvciwgbGFuZywgbWF0Y2hlZCwgcGFyc2VkLCBydWxlLCBzZWxlY3RvciwgX2ksIF9sZW4sIF9yZWYsIF9yZWYxLCBfcmVzdWx0cztcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBtYXRjaGVkID0gKChfcmVmID0gc2FtaS5tYXRjaChyZVN0eWxlKSkgIT0gbnVsbCA/IF9yZWZbMV0gOiB2b2lkIDApIHx8ICcnO1xyXG4gICAgICAgICAgICBtYXRjaGVkID0gbWF0Y2hlZC5yZXBsYWNlKHJlQ29tbWVudCwgJycpO1xyXG4gICAgICAgICAgICBwYXJzZWQgPSBjc3NQYXJzZShtYXRjaGVkKTtcclxuICAgICAgICAgICAgX3JlZjEgPSBwYXJzZWQuc3R5bGVzaGVldC5ydWxlcztcclxuICAgICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmMS5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgcnVsZSA9IF9yZWYxW19pXTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gcnVsZS5zZWxlY3RvcnNbMF07XHJcbiAgICAgICAgICAgICAgICBpZiAoKHNlbGVjdG9yICE9IG51bGwgPyBzZWxlY3RvclswXSA6IHZvaWQgMCkgPT09ICcuJykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2osIF9sZW4xLCBfcmVmMiwgX3Jlc3VsdHMxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVmMiA9IHJ1bGUuZGVjbGFyYXRpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0czEgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNsYXJhdGlvbiA9IF9yZWYyW19qXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWNsYXJhdGlvbi5wcm9wZXJ0eS50b0xvd2VyQ2FzZSgpID09PSAnbGFuZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBzZWxlY3Rvci5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5nID0gZGVjbGFyYXRpb24udmFsdWUuc2xpY2UoMCwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKH5sYW5nQ29kZXMuaW5kZXhPZihsYW5nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0czEucHVzaChkZWZpbmVkTGFuZ3NbY2xhc3NOYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmc6IGxhbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKFwiICsgY2xhc3NOYW1lICsgXCIpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMxLnB1c2godm9pZCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Jlc3VsdHMxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKCkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHZvaWQgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xyXG4gICAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xyXG4gICAgICAgICAgICBlID0gX2Vycm9yO1xyXG4gICAgICAgICAgICBlcnJvcnMucHVzaChlcnJvciA9IG5ldyBFcnJvcignRVJST1JfSU5WQUxJRF9MQU5HVUFHRV9ERUZJTklUSU9OJykpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBtYWtlRW5kVGltZSA9IGZ1bmN0aW9uKGxhbmdJdGVtKSB7XHJcbiAgICAgICAgdmFyIGksIGl0ZW0sIF9yZWY7XHJcbiAgICAgICAgaSA9IGxhbmdJdGVtLmxlbmd0aDtcclxuICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBsYW5nSXRlbVtpXTtcclxuICAgICAgICAgICAgaWYgKChfcmVmID0gbGFuZ0l0ZW1baSAtIDFdKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL0hTTEVFIDog7J207JmV7J2066m0IFNSVCDtjIzshJzsmYAg7Y+s66e37J2EIOunnuy2lOyekFxyXG4gICAgICAgICAgICAgICAgX3JlZi5lbmQgPSBpdGVtLnN0YXJ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXRlbS5jb250ZW50cyB8fCBpdGVtLmNvbnRlbnRzID09PSAnJm5ic3A7Jykge1xyXG4gICAgICAgICAgICAgICAgbGFuZ0l0ZW0uc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGxhbmdJdGVtW2ldLmNvbnRlbnRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLmVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZW5kID0gaXRlbS5zdGFydCArIGR1cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYW5nSXRlbTtcclxuICAgIH07XHJcbiAgICBlcnJvcnMgPSBbXTtcclxuICAgIGRlZmluZWRMYW5ncyA9IHtcclxuICAgICAgICBLUkNDOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdrbycsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooS1JDQylbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBLUjoge1xyXG4gICAgICAgICAgICBsYW5nOiAna28nLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEtSKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEVOQ0M6IHtcclxuICAgICAgICAgICAgbGFuZzogJ2VuJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihFTkNDKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEVHQ0M6IHtcclxuICAgICAgICAgICAgbGFuZzogJ2VuJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihFR0NDKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEVOOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdlbicsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooRU4pWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSlBDQzoge1xyXG4gICAgICAgICAgICBsYW5nOiAnamEnLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEpQQ0MpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBpZiAob3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucy5kZWZpbmVkTGFuZ3MgOiB2b2lkIDApIHtcclxuICAgICAgICBfcmVmID0gb3B0aW9ucy5kZWZpbmVkTGFuZ3M7XHJcbiAgICAgICAgZm9yIChrZXkgaW4gX3JlZikge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IF9yZWZba2V5XTtcclxuICAgICAgICAgICAgZGVmaW5lZExhbmdzW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkdXJhdGlvbiA9IChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmR1cmF0aW9uIDogdm9pZCAwKSB8fCAxMDsgLy9IU0xFRSBtcyAtPiBzIOuhnCDrs4Dqsr1cclxuICAgIHNhbWkgPSBzYW1pLnRyaW0oKTtcclxuICAgIC8vZ2V0RGVmaW5lZExhbmdzKCk7XHJcbiAgICByZXN1bHQgPSBwYXJzZSgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN1bHQ6IHJlc3VsdCxcclxuICAgICAgICBlcnJvcnM6IGVycm9yc1xyXG4gICAgfTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBTbWlQYXJzZXI7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAyOS4uXHJcbiAqL1xyXG5pbXBvcnQgeyBobXNUb1NlY29uZCwgdHJpbSB9IGZyb20gXCJ1dGlscy9zdHJpbmdzXCJcclxuXHJcbmZ1bmN0aW9uIF9lbnRyeShkYXRhKSB7XHJcbiAgICB2YXIgZW50cnkgPSB7fTtcclxuICAgIHZhciBhcnJheSA9IGRhdGEuc3BsaXQoJ1xcclxcbicpO1xyXG4gICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIGFycmF5ID0gZGF0YS5zcGxpdCgnXFxuJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgaWR4ID0gMTtcclxuICAgIGlmIChhcnJheVswXS5pbmRleE9mKCcgLS0+ICcpID4gMCkge1xyXG4gICAgICAgIGlkeCA9IDA7XHJcbiAgICB9XHJcbiAgICBpZiAoYXJyYXkubGVuZ3RoID4gaWR4ICsgMSAmJiBhcnJheVtpZHggKyAxXSkge1xyXG4gICAgICAgIC8vIFRoaXMgbGluZSBjb250YWlucyB0aGUgc3RhcnQgYW5kIGVuZC5cclxuICAgICAgICB2YXIgbGluZSA9IGFycmF5W2lkeF07XHJcbiAgICAgICAgdmFyIGluZGV4ID0gbGluZS5pbmRleE9mKCcgLS0+ICcpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcclxuICAgICAgICAgICAgZW50cnkuc3RhcnQgPSBobXNUb1NlY29uZChsaW5lLnN1YnN0cigwLCBpbmRleCkpO1xyXG4gICAgICAgICAgICBlbnRyeS5lbmQgPSBobXNUb1NlY29uZChsaW5lLnN1YnN0cihpbmRleCArIDUpKTtcclxuICAgICAgICAgICAgZW50cnkudGV4dCA9IGFycmF5LnNsaWNlKGlkeCArIDEpLmpvaW4oJ1xcclxcbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBlbnRyeTtcclxuXHJcbn1cclxuXHJcbmNvbnN0IFNydFBhcnNlciA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIHZhciBjYXB0aW9ucyA9IFtdO1xyXG5cclxuICAgIGRhdGEgPSB0cmltKGRhdGEpO1xyXG5cclxuICAgIHZhciBsaXN0ID0gZGF0YS5zcGxpdCgnXFxyXFxuXFxyXFxuJyk7XHJcbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBsaXN0ID0gZGF0YS5zcGxpdCgnXFxuXFxuJyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAobGlzdFtpXSA9PT0gJ1dFQlZUVCcpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBlbnRyeSA9IF9lbnRyeShsaXN0W2ldKTtcclxuICAgICAgICBpZiAoZW50cnkudGV4dCkge1xyXG4gICAgICAgICAgICBjYXB0aW9ucy5wdXNoKGVudHJ5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNhcHRpb25zO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNydFBhcnNlcjsiLCIvLyBTVEFURVxyXG5leHBvcnQgY29uc3QgU1RBVEVfQlVGRkVSSU5HID0gXCJidWZmZXJpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0lETEUgPSBcImlkbGVcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0NPTVBMRVRFID0gXCJjb21wbGV0ZVwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfUEFVU0VEID0gXCJwYXVzZWRcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1BMQVlJTkcgPSBcInBsYXlpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0VSUk9SID0gXCJlcnJvclwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfTE9BRElORyA9IFwibG9hZGluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfU1RBTExFRCA9IFwic3RhbGxlZFwiO1xyXG5cclxuXHJcbi8vIFBST1ZJREVSXHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9IFwiaHRtbDVcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1dFQlJUQyA9IFwid2VicnRjXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9EQVNIID0gXCJkYXNoXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9ITFMgPSBcImhsc1wiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfUlRNUCA9IFwicnRtcFwiO1xyXG5cclxuLy8gRVZFTlRTXHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XHJcbmV4cG9ydCBjb25zdCBSRUFEWSA9IFwicmVhZHlcIjtcclxuZXhwb3J0IGNvbnN0IERFU1RST1kgPSBcImRlc3Ryb3lcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9IFwic2Vla1wiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9CVUZGRVJfRlVMTCA9IFwiYnVmZmVyRnVsbFwiO1xyXG5leHBvcnQgY29uc3QgRElTUExBWV9DTElDSyA9IFwiZGlzcGxheUNsaWNrXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9IFwibG9hZGVkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NFRUtFRCA9IFwic2Vla2VkXCI7XHJcbmV4cG9ydCBjb25zdCBORVRXT1JLX1VOU1RBQkxFRCA9IFwidW5zdGFibGVOZXR3b3JrXCI7XHJcblxyXG5leHBvcnQgY29uc3QgRVJST1IgPSBcImVycm9yXCI7XHJcblxyXG4vLyBTVEFURSBPRiBQTEFZRVJcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9TVEFURSA9IFwic3RhdGVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9QQVVTRSA9IFwicGF1c2VcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9QTEFZID0gXCJwbGF5XCI7XHJcblxyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9CVUZGRVIgPSBcImJ1ZmZlckNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRSA9IFwidGltZVwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9SQVRFX0NIQU5HRSA9IFwicmF0ZWNoYW5nZVwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9WT0xVTUUgPSBcInZvbHVtZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTVVURSA9IFwibXV0ZVwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9NRVRBID0gXCJtZXRhQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCA9IFwic291cmNlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9MRVZFTF9DSEFOR0VEID0gXCJxdWFsaXR5TGV2ZWxDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZQkFDS19SQVRFX0NIQU5HRUQgPSBcInBsYXliYWNrUmF0ZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCA9IFwiY3VlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQgPSBcImNhcHRpb25DaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VEID0gXCJ0aW1lRGlzcGxheU1vZGVDaGFuZ2VkXCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IElOSVRfRVJST1IgPSAxMDA7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9FUlJPUiA9IDMwMDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiA9IDMwMTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IgPSAzMDI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IgPSAzMDM7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfRklMRV9FUlJPUiA9IDMwNDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DQVBUSU9OX0VSUk9SID0gMzA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19XU19FUlJPUiA9IDUwMTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfQ0xPU0VEID0gNTAyO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAzO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IgPSA1MDQ7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA2O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1cgPSA1MTA7XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2V4dHJhY3RFeHRlbnNpb24gLHRyaW19IGZyb20gXCIuLi8uLi91dGlscy9zdHJpbmdzXCI7XHJcbmltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiLi4vU3VwcG9ydENoZWNrZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgUGxheWxpc3Qgb3IgU291cmNlcy5cclxuICogQHBhcmFtXHJcbiAqXHJcbiAqICovXHJcbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGN1cnJlbnRQbGF5bGlzdCA9IFtdO1xyXG4gICAgbGV0IHN1cHBvcnRDaGVja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCBtYWtlUHJldHR5U291cmNlID0gZnVuY3Rpb24oc291cmNlXyl7XHJcbiAgICAgICAgaWYgKCFzb3VyY2VfIHx8ICFzb3VyY2VfLmZpbGUgJiYgIShzb3VyY2VfLmhvc3QgfHwgc291cmNlXy5hcHBsaWNhdGlvbiB8fCBzb3VyY2VfLnN0cmVhbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIHsgJ2RlZmF1bHQnOiBmYWxzZSB9LCBzb3VyY2VfKTtcclxuICAgICAgICBzb3VyY2UuZmlsZSA9IHRyaW0oJycgKyBzb3VyY2UuZmlsZSk7XHJcblxyXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcclxuICAgICAgICAgICAgc291cmNlLmZpbGUgPSBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvc3RyZWFtL1wiICsgc291cmNlLnN0cmVhbTtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5ob3N0O1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmFwcGxpY2F0aW9uO1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLnN0cmVhbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1pbWV0eXBlUmVnRXggPSAvXlteL10rXFwvKD86eC0pPyhbXi9dKykkLztcclxuXHJcbiAgICAgICAgaWYgKG1pbWV0eXBlUmVnRXgudGVzdChzb3VyY2UudHlwZSkpIHtcclxuICAgICAgICAgICAgLy8gaWYgdHlwZSBpcyBnaXZlbiBhcyBhIG1pbWV0eXBlXHJcbiAgICAgICAgICAgIHNvdXJjZS5taW1lVHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IHNvdXJjZS50eXBlLnJlcGxhY2UobWltZXR5cGVSZWdFeCwgJyQxJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihpc1J0bXAoc291cmNlLmZpbGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnd2VicnRjJztcclxuICAgICAgICB9ZWxzZSBpZihpc0Rhc2goc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2Rhc2gnO1xyXG4gICAgICAgIH1lbHNlIGlmICghc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBleHRyYWN0RXh0ZW5zaW9uKHNvdXJjZS5maWxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbm9ybWFsaXplIHR5cGVzXHJcbiAgICAgICAgc3dpdGNoIChzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdtM3U4JzpcclxuICAgICAgICAgICAgY2FzZSAndm5kLmFwcGxlLm1wZWd1cmwnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnaGxzJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtNGEnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnYWFjJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzbWlsJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZVtrZXldID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzb3VyY2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIHNldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBjb25zdCBwcmV0dGllZFBsYXlsaXN0ID0gKF8uaXNBcnJheShwbGF5bGlzdCkgPyBwbGF5bGlzdCA6IFtwbGF5bGlzdF0pLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShpdGVtLnRyYWNrcykpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RJdGVtID0gT2JqZWN0LmFzc2lnbih7fSx7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcclxuICAgICAgICAgICAgICAgIHRyYWNrczogW11cclxuICAgICAgICAgICAgfSwgaXRlbSApO1xyXG5cclxuICAgICAgICAgICAgaWYoKHBsYXlsaXN0SXRlbS5zb3VyY2VzID09PSBPYmplY3QocGxheWxpc3RJdGVtLnNvdXJjZXMpKSAmJiAhXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlcyldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gaXRlbS5sZXZlbHM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5U291cmNlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSAoZGVmYXVsdFNvdXJjZS50b1N0cmluZygpID09PSAndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzb3VyY2UgZG9lc24ndCBoYXZlIGEgbGFiZWwsIG51bWJlciBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKCFwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0udHlwZStcIi1cIitpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJldHR5U291cmNlID0gbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0Q2hlY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UocHJldHR5U291cmNlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBwcmV0dHlTb3VyY2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gcGxheWxpc3RJdGVtLnNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhIXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZhdWx0IOqwgCDsl4bsnYTrlYwgd2VicnRj6rCAIOyeiOuLpOuptCB3ZWJydGMgZGVmYXVsdCA6IHRydWXroZwg7J6Q64+ZIOyEpOyglVxyXG4gICAgICAgICAgICAvKmxldCBoYXZlRGVmYXVsdCA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLmRlZmF1bHQgPT0gdHJ1ZTt9KTtcclxuICAgICAgICAgICAgbGV0IHdlYnJ0Y1NvdXJjZSA9IFtdO1xyXG4gICAgICAgICAgICBpZighaGF2ZURlZmF1bHQpe1xyXG4gICAgICAgICAgICAgICAgd2VicnRjU291cmNlID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UudHlwZSA9PSBcIndlYnJ0Y1wiO30pO1xyXG4gICAgICAgICAgICAgICAgaWYod2VicnRjU291cmNlKXtcclxuICAgICAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UuZGVmYXVsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0qL1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS50cmFja3MpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RJdGVtLmNhcHRpb25zKSl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5jb25jYXQocGxheWxpc3RJdGVtLmNhcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBwbGF5bGlzdEl0ZW0uY2FwdGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLm1hcChmdW5jdGlvbih0cmFjayl7XHJcbiAgICAgICAgICAgICAgICBpZighdHJhY2sgfHwgIXRyYWNrLmZpbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2tpbmQnOiAnY2FwdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0JzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sIHRyYWNrKTtcclxuICAgICAgICAgICAgfSkuZmlsdGVyKHRyYWNrID0+ICEhdHJhY2spO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBsYXlsaXN0SXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjdXJyZW50UGxheWxpc3QgPSBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgICAgIHJldHVybiBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldFBsYXlsaXN0KCkgXCIsIGN1cnJlbnRQbGF5bGlzdCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5bGlzdDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIC8vV2UgZG8gbm90IHN1cHBvcnQgXCJQTEFZTElTVFwiIG5vdCB5ZXQuIFNvIHRoaXMgcmV0dXJucyBwbGF5bGlzdCBvZiAwLlxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRDdXJyZW50U291cmNlcygpIFwiLCBjdXJyZW50UGxheWxpc3RbMF0uc291cmNlcyk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5bGlzdFswXS5zb3VyY2VzO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJpbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcImFwaS9TdXBwb3J0Q2hlY2tlclwiO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXHJcbiAqIEBwYXJhbVxyXG4gKiAqL1xyXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBzdXBwb3J0Q2hhY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XHJcbiAgICBjb25zdCBQcm92aWRlcnMgPSB7fTtcclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCByZWdpc3RlUHJvdmlkZXIgPSAobmFtZSwgcHJvdmlkZXIpID0+e1xyXG4gICAgICAgIGlmKFByb3ZpZGVyc1tuYW1lXSl7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcclxuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPXtcclxuICAgICAgICBodG1sNTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSHRtbDUnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNScpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiaHRtbDVcIiwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2VicnRjIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcIndlYnJ0Y1wiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXNoIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvRGFzaCcpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiZGFzaFwiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGxzIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcImhsc1wiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydG1wIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcCcpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwicnRtcFwiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQubG9hZFByb3ZpZGVycyA9IChwbGF5bGlzdCkgPT57XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdChwbGF5bGlzdCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRQcm92aWRlcnMoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxyXG4gICAgICAgICAgICBzdXBwb3J0ZWRQcm92aWRlck5hbWVzLmZpbHRlcihmdW5jdGlvbihwcm92aWRlck5hbWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXTtcclxuICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IFByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV0oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmZpbmRCeU5hbWUgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBmaW5kQnlOYW1lKCkgXCIsIG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBQcm92aWRlcnNbbmFtZV07XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UHJvdmlkZXJCeVNvdXJjZSA9IChzb3VyY2UpID0+IHtcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWUgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZ2V0UHJvdmlkZXJCeVNvdXJjZSgpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGF0LmZpbmRCeU5hbWUoc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc1NhbWVQcm92aWRlciA9IChjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgaXNTYW1lUHJvdmlkZXIoKSBcIiwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpICwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSkgKTtcclxuICAgICAgICByZXR1cm4gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpID09PSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjtcclxuIiwiaW1wb3J0IEFQSSBmcm9tICdhcGkvQXBpJztcclxuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSAndXRpbHMvdmFsaWRhdG9yJztcclxuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XHJcbmltcG9ydCBMYSQgZnJvbSAndXRpbHMvbGlrZUEkJztcclxuaW1wb3J0IHtnZXRTY3JpcHRQYXRofSBmcm9tICd1dGlscy93ZWJwYWNrJztcclxuXHJcblxyXG5fX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuc2RrLmpzJyk7XHJcblxyXG4vKipcclxuICogTWFpbiBPdmVuUGxheWVyU0RLIG9iamVjdFxyXG4gKi9cclxuY29uc3QgT3ZlblBsYXllclNESyA9IHdpbmRvdy5PdmVuUGxheWVyU0RLID0ge307XHJcblxyXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcblxyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuXHJcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XHJcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSkge1xyXG5cclxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgcGxheWVyIGluc3RhbmNlIGFuZCByZXR1cm4gaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmcgfCBkb20gZWxlbWVudH0gY29udGFpbmVyICBJZCBvZiBjb250YWluZXIgZWxlbWVudCBvciBjb250YWluZXIgZWxlbWVudFxyXG4gKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zICBUaGUgb3B0aW9uc1xyXG4gKi9cclxuT3ZlblBsYXllclNESy5jcmVhdGUgPSBmdW5jdGlvbihjb250YWluZXIsIG9wdGlvbnMpIHtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudChjb250YWluZXIpO1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gQVBJKGNvbnRhaW5lckVsZW1lbnQpO1xyXG4gICAgcGxheWVySW5zdGFuY2UuaW5pdChvcHRpb25zKTtcclxuXHJcbiAgICBwbGF5ZXJMaXN0LnB1c2gocGxheWVySW5zdGFuY2UpO1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgbGlzdC5cclxuICpcclxuICogQHJldHVybiAgICAge2FycmF5fSAgVGhlIHBsYXllciBsaXN0LlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckxpc3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGNvbnRhaW5lciBpZC5cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZ30gIGNvbnRhaW5lcklkICBUaGUgY29udGFpbmVyIGlkZW50aWZpZXJcclxuICogQHJldHVybiAgICAge29iZWplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlDb250YWluZXJJZCA9IGZ1bmN0aW9uKGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBjb250YWluZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBsYXllckxpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBpbmRleC5cclxuICpcclxuICogQHBhcmFtICAgICAge251bWJlcn0gIGluZGV4ICAgVGhlIGluZGV4XHJcbiAqIEByZXR1cm4gICAgIHtvYmplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlJbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcblxyXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBwbGF5ZXJMaXN0W2luZGV4XTtcclxuXHJcbiAgICBpZiAocGxheWVySW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgcGxheWVySWQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtwbGF5ZXJJZH0gIGlkXHJcbiAqIEByZXR1cm4gICAgIHtudWxsfVxyXG4gKi9cclxuT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIgPSBmdW5jdGlvbihwbGF5ZXJJZCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBwbGF5ZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgcGxheWVyTGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSB3ZWJydGMgc291cmNlIGZvciBwbGF5ZXIgc291cmNlIHR5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtPYmplY3QgfCBBcnJheX0gIHNvdXJjZSAgIHdlYnJ0YyBzb3VyY2VcclxuICogQHJldHVybiAgICAge0FycmF5fSAgUGxheWVyIHNvdXJjZSBPYmVqY3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdlbmVyYXRlV2VicnRjVXJscyA9IGZ1bmN0aW9uKHNvdXJjZXMpIHtcclxuICAgIHJldHVybiAoXy5pc0FycmF5KHNvdXJjZXMpID8gc291cmNlcyA6IFtzb3VyY2VzXSkubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpe1xyXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIGlzV2ViUlRDKHNvdXJjZS5ob3N0KSAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XHJcbiAgICAgICAgICAgIHJldHVybiB7ZmlsZSA6IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9cIiArIHNvdXJjZS5zdHJlYW0sIHR5cGUgOiBcIndlYnJ0Y1wiLCBsYWJlbCA6IHNvdXJjZS5sYWJlbCA/IHNvdXJjZS5sYWJlbCA6IFwid2VicnRjLVwiKyhpbmRleCsxKSB9O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgT3ZlblBsYXllclNESztcclxuIiwiLyoqIVxyXG4gKiBhamF4IC0gdjIuMy4wXHJcbiAqIEFqYXggbW9kdWxlIGluIFZhbmlsbGEgSlNcclxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZkYWNpdWsvYWpheFxyXG5cclxuICogU3VuIEp1bCAyMyAyMDE3IDEwOjU1OjA5IEdNVC0wMzAwIChCUlQpXHJcbiAqIE1JVCAoYykgRmVybmFuZG8gRGFjaXVrXHJcbiAqL1xyXG4hZnVuY3Rpb24oZSx0KXtcInVzZSBzdHJpY3RcIjtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiYWpheFwiLHQpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHM9bW9kdWxlLmV4cG9ydHM9dCgpOmUuYWpheD10KCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKGUpe3ZhciByPVtcImdldFwiLFwicG9zdFwiLFwicHV0XCIsXCJkZWxldGVcIl07cmV0dXJuIGU9ZXx8e30sZS5iYXNlVXJsPWUuYmFzZVVybHx8XCJcIixlLm1ldGhvZCYmZS51cmw/bihlLm1ldGhvZCxlLmJhc2VVcmwrZS51cmwsdChlLmRhdGEpLGUpOnIucmVkdWNlKGZ1bmN0aW9uKHIsbyl7cmV0dXJuIHJbb109ZnVuY3Rpb24ocix1KXtyZXR1cm4gbihvLGUuYmFzZVVybCtyLHQodSksZSl9LHJ9LHt9KX1mdW5jdGlvbiB0KGUpe3JldHVybiBlfHxudWxsfWZ1bmN0aW9uIG4oZSx0LG4sdSl7dmFyIGM9W1widGhlblwiLFwiY2F0Y2hcIixcImFsd2F5c1wiXSxpPWMucmVkdWNlKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGVbdF09ZnVuY3Rpb24obil7cmV0dXJuIGVbdF09bixlfSxlfSx7fSksZj1uZXcgWE1MSHR0cFJlcXVlc3QsZD1yKHQsbixlKTtyZXR1cm4gZi5vcGVuKGUsZCwhMCksZi53aXRoQ3JlZGVudGlhbHM9dS5oYXNPd25Qcm9wZXJ0eShcIndpdGhDcmVkZW50aWFsc1wiKSxvKGYsdS5oZWFkZXJzKSxmLmFkZEV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsYShpLGYpLCExKSxmLnNlbmQocyhuKSksaS5hYm9ydD1mdW5jdGlvbigpe3JldHVybiBmLmFib3J0KCl9LGl9ZnVuY3Rpb24gcihlLHQsbil7aWYoXCJnZXRcIiE9PW4udG9Mb3dlckNhc2UoKXx8IXQpcmV0dXJuIGU7dmFyIHI9cyh0KSxvPWUuaW5kZXhPZihcIj9cIik+LTE/XCImXCI6XCI/XCI7cmV0dXJuIGUrbytyfWZ1bmN0aW9uIG8oZSx0KXt0PXR8fHt9LHUodCl8fCh0W1wiQ29udGVudC1UeXBlXCJdPVwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpLE9iamVjdC5rZXlzKHQpLmZvckVhY2goZnVuY3Rpb24obil7dFtuXSYmZS5zZXRSZXF1ZXN0SGVhZGVyKG4sdFtuXSl9KX1mdW5jdGlvbiB1KGUpe3JldHVybiBPYmplY3Qua2V5cyhlKS5zb21lKGZ1bmN0aW9uKGUpe3JldHVyblwiY29udGVudC10eXBlXCI9PT1lLnRvTG93ZXJDYXNlKCl9KX1mdW5jdGlvbiBhKGUsdCl7cmV0dXJuIGZ1bmN0aW9uIG4oKXt0LnJlYWR5U3RhdGU9PT10LkRPTkUmJih0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZWFkeXN0YXRlY2hhbmdlXCIsbiwhMSksZS5hbHdheXMuYXBwbHkoZSxjKHQpKSx0LnN0YXR1cz49MjAwJiZ0LnN0YXR1czwzMDA/ZS50aGVuLmFwcGx5KGUsYyh0KSk6ZVtcImNhdGNoXCJdLmFwcGx5KGUsYyh0KSkpfX1mdW5jdGlvbiBjKGUpe3ZhciB0O3RyeXt0PUpTT04ucGFyc2UoZS5yZXNwb25zZVRleHQpfWNhdGNoKG4pe3Q9ZS5yZXNwb25zZVRleHR9cmV0dXJuW3QsZV19ZnVuY3Rpb24gcyhlKXtyZXR1cm4gaShlKT9mKGUpOmV9ZnVuY3Rpb24gaShlKXtyZXR1cm5cIltvYmplY3QgT2JqZWN0XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpfWZ1bmN0aW9uIGYoZSl7cmV0dXJuIE9iamVjdC5rZXlzKGUpLnJlZHVjZShmdW5jdGlvbih0LG4pe3ZhciByPXQ/dCtcIiZcIjpcIlwiO3JldHVybiByK2QobikrXCI9XCIrZChlW25dKX0sXCJcIil9ZnVuY3Rpb24gZChlKXtyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGUpfXJldHVybiBlfSk7IiwiLyoqXHJcbiAqIENvcHlyaWdodCAyMDEzIHZ0dC5qcyBDb250cmlidXRvcnNcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxubGV0IFZUVEN1ZSA9IHdpbmRvdy5WVFRDdWU7XHJcblxyXG52YXIgYXV0b0tleXdvcmQgPSBcImF1dG9cIjtcclxudmFyIGRpcmVjdGlvblNldHRpbmcgPSB7XHJcbiAgICBcIlwiOiB0cnVlLFxyXG4gICAgXCJsclwiOiB0cnVlLFxyXG4gICAgXCJybFwiOiB0cnVlXHJcbn07XHJcbnZhciBhbGlnblNldHRpbmcgPSB7XHJcbiAgICBcInN0YXJ0XCI6IHRydWUsXHJcbiAgICBcIm1pZGRsZVwiOiB0cnVlLFxyXG4gICAgXCJlbmRcIjogdHJ1ZSxcclxuICAgIFwibGVmdFwiOiB0cnVlLFxyXG4gICAgXCJyaWdodFwiOiB0cnVlXHJcbn07XHJcblxyXG5mdW5jdGlvbiBmaW5kRGlyZWN0aW9uU2V0dGluZyh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciBkaXIgPSBkaXJlY3Rpb25TZXR0aW5nW3ZhbHVlLnRvTG93ZXJDYXNlKCldO1xyXG4gICAgcmV0dXJuIGRpciA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZEFsaWduU2V0dGluZyh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciBhbGlnbiA9IGFsaWduU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcclxuICAgIHJldHVybiBhbGlnbiA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZXh0ZW5kKG9iaikge1xyXG4gICAgdmFyIGkgPSAxO1xyXG4gICAgZm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgY29iaiA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvYmopIHtcclxuICAgICAgICAgICAgb2JqW3BdID0gY29ialtwXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9iajtcclxufVxyXG5pZighVlRUQ3VlKXtcclxuICAgIFZUVEN1ZSA9IGZ1bmN0aW9uIChzdGFydFRpbWUsIGVuZFRpbWUsIHRleHQpIHtcclxuICAgICAgICB2YXIgY3VlID0gdGhpcztcclxuICAgICAgICB2YXIgaXNJRTggPSAoL01TSUVcXHM4XFwuMC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICAgICAgdmFyIGJhc2VPYmogPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGlzSUU4KSB7XHJcbiAgICAgICAgICAgIGN1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2N1c3RvbScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJhc2VPYmouZW51bWVyYWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTaGltIGltcGxlbWVudGF0aW9uIHNwZWNpZmljIHByb3BlcnRpZXMuIFRoZXNlIHByb3BlcnRpZXMgYXJlIG5vdCBpblxyXG4gICAgICAgICAqIHRoZSBzcGVjLlxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAgICAgLy8gTGV0cyB1cyBrbm93IHdoZW4gdGhlIFZUVEN1ZSdzIGRhdGEgaGFzIGNoYW5nZWQgaW4gc3VjaCBhIHdheSB0aGF0IHdlIG5lZWRcclxuICAgICAgICAgICAgLy8gdG8gcmVjb21wdXRlIGl0cyBkaXNwbGF5IHN0YXRlLiBUaGlzIGxldHMgdXMgY29tcHV0ZSBpdHMgZGlzcGxheSBzdGF0ZVxyXG4gICAgICAgICAgICAvLyBsYXppbHkuXHJcbiAgICAgICAgY3VlLmhhc0JlZW5SZXNldCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWVFRDdWUgYW5kIFRleHRUcmFja0N1ZSBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICogaHR0cDovL2Rldi53My5vcmcvaHRtbDUvd2VidnR0LyN2dHRjdWUtaW50ZXJmYWNlXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIHZhciBfaWQgPSBcIlwiO1xyXG4gICAgICAgIHZhciBfcGF1c2VPbkV4aXQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgX3N0YXJ0VGltZSA9IHN0YXJ0VGltZTtcclxuICAgICAgICB2YXIgX2VuZFRpbWUgPSBlbmRUaW1lO1xyXG4gICAgICAgIHZhciBfdGV4dCA9IHRleHQ7XHJcbiAgICAgICAgdmFyIF9yZWdpb24gPSBudWxsO1xyXG4gICAgICAgIHZhciBfdmVydGljYWwgPSBcIlwiO1xyXG4gICAgICAgIHZhciBfc25hcFRvTGluZXMgPSB0cnVlO1xyXG4gICAgICAgIHZhciBfbGluZSA9IFwiYXV0b1wiO1xyXG4gICAgICAgIHZhciBfbGluZUFsaWduID0gXCJzdGFydFwiO1xyXG4gICAgICAgIHZhciBfcG9zaXRpb24gPSA1MDtcclxuICAgICAgICB2YXIgX3Bvc2l0aW9uQWxpZ24gPSBcIm1pZGRsZVwiO1xyXG4gICAgICAgIHZhciBfc2l6ZSA9IDUwO1xyXG4gICAgICAgIHZhciBfYWxpZ24gPSBcIm1pZGRsZVwiO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcImlkXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2lkO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfaWQgPSBcIlwiICsgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJwYXVzZU9uRXhpdFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wYXVzZU9uRXhpdDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3BhdXNlT25FeGl0ID0gISF2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInN0YXJ0VGltZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdGFydFRpbWU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN0YXJ0IHRpbWUgbXVzdCBiZSBzZXQgdG8gYSBudW1iZXIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfc3RhcnRUaW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwiZW5kVGltZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9lbmRUaW1lO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFbmQgdGltZSBtdXN0IGJlIHNldCB0byBhIG51bWJlci5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9lbmRUaW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwidGV4dFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90ZXh0O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGV4dCA9IFwiXCIgKyB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJyZWdpb25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnaW9uO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfcmVnaW9uID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwidmVydGljYWxcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdmVydGljYWw7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZERpcmVjdGlvblNldHRpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhhdmUgdG8gY2hlY2sgZm9yIGZhbHNlIGJlY2F1c2UgdGhlIHNldHRpbmcgYW4gYmUgYW4gZW1wdHkgc3RyaW5nLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfdmVydGljYWwgPSBzZXR0aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInNuYXBUb0xpbmVzXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NuYXBUb0xpbmVzO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc25hcFRvTGluZXMgPSAhIXZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcImxpbmVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfbGluZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB2YWx1ZSAhPT0gYXV0b0tleXdvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBudW1iZXIgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9saW5lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwibGluZUFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmVBbGlnbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX2xpbmVBbGlnbiA9IHNldHRpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwicG9zaXRpb25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUG9zaXRpb24gbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9wb3NpdGlvbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uQWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcG9zaXRpb25BbGlnbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3Bvc2l0aW9uQWxpZ24gPSBzZXR0aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInNpemVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc2l6ZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaXplIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfc2l6ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcImFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2FsaWduO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfYWxpZ24gPSBzZXR0aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdGhlciA8dHJhY2s+IHNwZWMgZGVmaW5lZCBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgICAgICAvLyBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS90aGUtdmlkZW8tZWxlbWVudC5odG1sI3RleHQtdHJhY2stY3VlLWRpc3BsYXktc3RhdGVcclxuICAgICAgICBjdWUuZGlzcGxheVN0YXRlID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBpZiAoaXNJRTgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGN1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWVFRDdWUgbWV0aG9kc1xyXG4gICAgICovXHJcblxyXG4gICAgVlRUQ3VlLnByb3RvdHlwZS5nZXRDdWVBc0hUTUwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBBc3N1bWUgV2ViVlRULmNvbnZlcnRDdWVUb0RPTVRyZWUgaXMgb24gdGhlIGdsb2JhbC5cclxuICAgICAgICByZXR1cm4gV2ViVlRULmNvbnZlcnRDdWVUb0RPTVRyZWUod2luZG93LCB0aGlzLnRleHQpO1xyXG4gICAgfTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWVFRDdWU7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIEl0IHdhcyByZXBsYWNlIGpxdWVyeSdzIHNlbGVjdG9yLiBJdCBPZnRlbiB1c2VkIGJ5IE92ZW5UZW1wbGF0ZS4gKC92aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUuanMpXHJcbiAqIEBwYXJhbSAgIHNlbGVjdG9yT3JFbGVtZW50ICBzdHJpbmcgb3IgZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IExhJCA9IGZ1bmN0aW9uKHNlbGVjdG9yT3JFbGVtZW50KXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGNvbnN0IHJldHVybk5vZGUgPSBmdW5jdGlvbigkZWxlbWVudCAsIHNlbGVjdG9yKXtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSAgJGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgaWYobm9kZUxpc3QubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCAkZWxlbWVudCA9IFwiXCI7XHJcblxyXG4gICAgaWYoIF8uZXZlcnkoc2VsZWN0b3JPckVsZW1lbnQsIGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBfLmlzRWxlbWVudChpdGVtKX0pKXtcclxuICAgICAgICAkZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xyXG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwiZG9jdW1lbnRcIil7XHJcbiAgICAgICAgJGVsZW1lbnQgPSBkb2N1bWVudDtcclxuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcIndpbmRvd1wiKXtcclxuICAgICAgICAkZWxlbWVudCA9IHdpbmRvdztcclxuICAgIH1lbHNle1xyXG4gICAgICAgICRlbGVtZW50ID0gcmV0dXJuTm9kZShkb2N1bWVudCwgc2VsZWN0b3JPckVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZighJGVsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZmluZCA9IChzZWxlY3RvcikgPT57XHJcbiAgICAgICAgcmV0dXJuIExhJChyZXR1cm5Ob2RlKCRlbGVtZW50LCBzZWxlY3RvcikpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNzcyA9IChuYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hZGRDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9ICRlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGlmKGNsYXNzTmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIFwiICsgbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2xhc3MgPSAobmFtZSkgPT57XHJcbiAgICAgICAgaWYgKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSA9ICRlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBuYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQXR0cmlidXRlID0gKGF0dHJOYW1lKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5zaG93ID0gKCkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGlkZSA9ICgpID0+e1xyXG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWxDb2RlKSA9PntcclxuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgKz0gaHRtbENvZGU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQudGV4dCA9ICh0ZXh0KSA9PiB7IC8vSUU4K1xyXG4gICAgICAgIGlmKHRleHQgPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC50ZXh0Q29udGVudDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0Lmh0bWwgPSAodGV4dCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5oYXNDbGFzcyA9IChuYW1lKSA9PiB7IC8vSUU4K1xyXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBuYW1lICsgJyggfCQpJywgJ2dpJykudGVzdCgkZWxlbWVudC5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXMgPSAoJHRhcmdldEVsZW1lbnQpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQgPT09ICR0YXJnZXRFbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0Lm9mZnNldCA9ICgpID0+eyAgICAvL0lFOCtcclxuICAgICAgICB2YXIgcmVjdCA9ICRlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC53aWR0aCA9ICgpID0+IHsgICAgLy9JRTgrXHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmhlaWdodCA9ICgpID0+IHsgICAvL0lFOCtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmF0dHIgPSAoYXR0cikgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVwbGFjZSA9IChodG1sKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVwbGFjZVdpdGgoaHRtbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWwpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5hcHBlbmRDaGlsZChodG1sKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2hpbGQgPSAoKSA9PiB7XHJcbiAgICAgICAgd2hpbGUgKCRlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDaGlsZCgkZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jbG9zZXN0ID0gKHNlbGVjdG9yU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgbGV0IGNsb3Nlc3RFbGVtZW50ID0gJGVsZW1lbnQuY2xvc2VzdChzZWxlY3RvclN0cmluZyk7XHJcbiAgICAgICAgaWYoY2xvc2VzdEVsZW1lbnQpe1xyXG4gICAgICAgICAgICByZXR1cm4gTGEkKGNsb3Nlc3RFbGVtZW50KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhJDtcclxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMjQuLlxuICovXG5cbmNvbnN0IGxvZ2dlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBwcmV2Q29uc29sZUxvZyA9IG51bGw7XG5cbiAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogd2luZG93Wydjb25zb2xlJ11bJ2xvZyddfTtcblxuICAgIHRoYXQuZW5hYmxlID0gKCkgPT57XG4gICAgICAgIGlmKHByZXZDb25zb2xlTG9nID09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IHByZXZDb25zb2xlTG9nO1xuICAgIH07XG4gICAgdGhhdC5kaXNhYmxlID0gKCkgPT57XG4gICAgICAgIHByZXZDb25zb2xlTG9nID0gY29uc29sZS5sb2c7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IGZ1bmN0aW9uKCl7fTtcbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyOyIsImltcG9ydCBfIGZyb20gJy4vdW5kZXJzY29yZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdHJpbShzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0cmFjdEV4dGVuc2lvblxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSBwYXRoIGZvciB1cmxcclxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHRlbnNpb24gPSBmdW5jdGlvbihwYXRoKSB7XHJcbiAgICBpZighcGF0aCB8fCBwYXRoLnN1YnN0cigwLDQpPT0ncnRtcCcpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKSB7XHJcbiAgICAgICAgbGV0IGV4dGVuc2lvbiA9IFwiXCI7XHJcbiAgICAgICAgaWYgKCgvWygsXWZvcm1hdD1tcGQtL2kpLnRlc3QocGF0aCkpIHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ21wZCc7XHJcbiAgICAgICAgfWVsc2UgaWYgKCgvWygsXWZvcm1hdD1tM3U4LS9pKS50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtM3U4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYXp1cmVkRm9ybWF0ID0gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpO1xyXG4gICAgaWYoYXp1cmVkRm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIGF6dXJlZEZvcm1hdDtcclxuICAgIH1cclxuICAgIHBhdGggPSBwYXRoLnNwbGl0KCc/JylbMF0uc3BsaXQoJyMnKVswXTtcclxuICAgIGlmKHBhdGgubGFzdEluZGV4T2YoJy4nKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy4nKSArIDEsIHBhdGgubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIG5hdHVyYWxIbXNcclxuICpcclxuICogQHBhcmFtICAgICAge251bWJlciB8IHN0cmluZ30gIHNlY29uZCAgVGhlIHNlY29uZFxyXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgZm9ybWF0dGVkIFN0cmluZ1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5hdHVyYWxIbXMoc2Vjb25kKSB7XHJcbiAgICBsZXQgc2VjTnVtID0gcGFyc2VJbnQoc2Vjb25kLCAxMCk7XHJcbiAgICBpZighc2Vjb25kKXtcclxuICAgICAgICByZXR1cm4gXCItLTotLVwiO1xyXG4gICAgfVxyXG4gICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xyXG4gICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XHJcbiAgICBsZXQgc2Vjb25kcyA9IHNlY051bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XHJcblxyXG4gICAgaWYgKGhvdXJzID4gMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cclxuICAgIGlmIChzZWNvbmRzIDwgMTApIHtzZWNvbmRzID0gXCIwXCIrc2Vjb25kczt9XHJcblxyXG4gICAgaWYgKGhvdXJzID4gMCkge1xyXG4gICAgICAgIHJldHVybiBob3VycysnOicrbWludXRlcysnOicrc2Vjb25kcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG1pbnV0ZXMrJzonK3NlY29uZHM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaG1zVG9TZWNvbmQoc3RyLCBmcmFtZVJhdGUpIHtcclxuICAgIGlmKCFzdHIpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGlmKF8uaXNOdW1iZXIoc3RyKSAmJiAhXy5pc05hTihzdHIpKXtcclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoJywnLCAnLicpO1xyXG4gICAgbGV0IGFyciA9IHN0ci5zcGxpdCgnOicpO1xyXG4gICAgbGV0IGFyckxlbmd0aCA9IGFyci5sZW5ndGg7XHJcbiAgICBsZXQgc2VjID0gMDtcclxuICAgIGlmIChzdHIuc2xpY2UoLTEpID09PSAncycpe1xyXG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKTtcclxuICAgIH1lbHNlIGlmIChzdHIuc2xpY2UoLTEpID09PSAnbScpe1xyXG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKSAqIDYwO1xyXG4gICAgfWVsc2UgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdoJyl7XHJcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpICogMzYwMDtcclxuICAgIH1lbHNlIGlmIChhcnJMZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdmFyIHNlY0luZGV4ID0gYXJyTGVuZ3RoIC0gMTtcclxuICAgICAgICBpZiAoYXJyTGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgICAgIGlmIChmcmFtZVJhdGUpIHtcclxuICAgICAgICAgICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4XSkgLyBmcmFtZVJhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VjSW5kZXggLT0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4XSk7XHJcbiAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4IC0gMV0pICogNjA7XHJcbiAgICAgICAgaWYgKGFyckxlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleCAtIDJdKSAqIDM2MDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cik7XHJcbiAgICB9XHJcbiAgICBpZiAoXy5pc05hTihzZWMpKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VjO1xyXG59IiwiLy8gICAgIFVuZGVyc2NvcmUuanMgMS45LjFcclxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXHJcbi8vICAgICAoYykgMjAwOS0yMDE4IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXHJcbi8vICAgICBVbmRlcnNjb3JlIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG4hZnVuY3Rpb24oKXt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZiYmc2VsZnx8XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbCYmZ2xvYmFsfHx0aGlzfHx7fSxyPW4uXyxlPUFycmF5LnByb3RvdHlwZSxvPU9iamVjdC5wcm90b3R5cGUscz1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sP1N5bWJvbC5wcm90b3R5cGU6bnVsbCx1PWUucHVzaCxjPWUuc2xpY2UscD1vLnRvU3RyaW5nLGk9by5oYXNPd25Qcm9wZXJ0eSx0PUFycmF5LmlzQXJyYXksYT1PYmplY3Qua2V5cyxsPU9iamVjdC5jcmVhdGUsZj1mdW5jdGlvbigpe30saD1mdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIGg/bjp0aGlzIGluc3RhbmNlb2YgaD92b2lkKHRoaXMuX3dyYXBwZWQ9bik6bmV3IGgobil9O1widW5kZWZpbmVkXCI9PXR5cGVvZiBleHBvcnRzfHxleHBvcnRzLm5vZGVUeXBlP24uXz1oOihcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUuZXhwb3J0cyYmKGV4cG9ydHM9bW9kdWxlLmV4cG9ydHM9aCksZXhwb3J0cy5fPWgpLGguVkVSU0lPTj1cIjEuOS4xXCI7dmFyIHYseT1mdW5jdGlvbih1LGksbil7aWYodm9pZCAwPT09aSlyZXR1cm4gdTtzd2l0Y2gobnVsbD09bj8zOm4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHUuY2FsbChpLG4pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gdS5jYWxsKGksbixyLHQpfTtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB1LmNhbGwoaSxuLHIsdCxlKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHUuYXBwbHkoaSxhcmd1bWVudHMpfX0sZD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguaXRlcmF0ZWUhPT12P2guaXRlcmF0ZWUobixyKTpudWxsPT1uP2guaWRlbnRpdHk6aC5pc0Z1bmN0aW9uKG4pP3kobixyLHQpOmguaXNPYmplY3QobikmJiFoLmlzQXJyYXkobik/aC5tYXRjaGVyKG4pOmgucHJvcGVydHkobil9O2guaXRlcmF0ZWU9dj1mdW5jdGlvbihuLHIpe3JldHVybiBkKG4sciwxLzApfTt2YXIgZz1mdW5jdGlvbih1LGkpe3JldHVybiBpPW51bGw9PWk/dS5sZW5ndGgtMToraSxmdW5jdGlvbigpe2Zvcih2YXIgbj1NYXRoLm1heChhcmd1bWVudHMubGVuZ3RoLWksMCkscj1BcnJheShuKSx0PTA7dDxuO3QrKylyW3RdPWFyZ3VtZW50c1t0K2ldO3N3aXRjaChpKXtjYXNlIDA6cmV0dXJuIHUuY2FsbCh0aGlzLHIpO2Nhc2UgMTpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLHIpO2Nhc2UgMjpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLGFyZ3VtZW50c1sxXSxyKX12YXIgZT1BcnJheShpKzEpO2Zvcih0PTA7dDxpO3QrKyllW3RdPWFyZ3VtZW50c1t0XTtyZXR1cm4gZVtpXT1yLHUuYXBwbHkodGhpcyxlKX19LG09ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJue307aWYobClyZXR1cm4gbChuKTtmLnByb3RvdHlwZT1uO3ZhciByPW5ldyBmO3JldHVybiBmLnByb3RvdHlwZT1udWxsLHJ9LGI9ZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP3ZvaWQgMDpuW3JdfX0saj1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsIT1uJiZpLmNhbGwobixyKX0seD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7aWYobnVsbD09bilyZXR1cm47bj1uW3JbZV1dfXJldHVybiB0P246dm9pZCAwfSxfPU1hdGgucG93KDIsNTMpLTEsQT1iKFwibGVuZ3RoXCIpLHc9ZnVuY3Rpb24obil7dmFyIHI9QShuKTtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgciYmMDw9ciYmcjw9X307aC5lYWNoPWguZm9yRWFjaD1mdW5jdGlvbihuLHIsdCl7dmFyIGUsdTtpZihyPXkocix0KSx3KG4pKWZvcihlPTAsdT1uLmxlbmd0aDtlPHU7ZSsrKXIobltlXSxlLG4pO2Vsc2V7dmFyIGk9aC5rZXlzKG4pO2ZvcihlPTAsdT1pLmxlbmd0aDtlPHU7ZSsrKXIobltpW2VdXSxpW2VdLG4pfXJldHVybiBufSxoLm1hcD1oLmNvbGxlY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPUFycmF5KHUpLG89MDtvPHU7bysrKXt2YXIgYT1lP2Vbb106bztpW29dPXIoblthXSxhLG4pfXJldHVybiBpfTt2YXIgTz1mdW5jdGlvbihjKXtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9Mzw9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9IXcobikmJmgua2V5cyhuKSxpPSh1fHxuKS5sZW5ndGgsbz0wPGM/MDppLTE7Zm9yKGV8fCh0PW5bdT91W29dOm9dLG8rPWMpOzA8PW8mJm88aTtvKz1jKXt2YXIgYT11P3Vbb106bzt0PXIodCxuW2FdLGEsbil9cmV0dXJuIHR9KG4seShyLGUsNCksdCx1KX19O2gucmVkdWNlPWguZm9sZGw9aC5pbmplY3Q9TygxKSxoLnJlZHVjZVJpZ2h0PWguZm9sZHI9TygtMSksaC5maW5kPWguZGV0ZWN0PWZ1bmN0aW9uKG4scix0KXt2YXIgZT0odyhuKT9oLmZpbmRJbmRleDpoLmZpbmRLZXkpKG4scix0KTtpZih2b2lkIDAhPT1lJiYtMSE9PWUpcmV0dXJuIG5bZV19LGguZmlsdGVyPWguc2VsZWN0PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT1bXTtyZXR1cm4gZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe2UobixyLHQpJiZ1LnB1c2gobil9KSx1fSxoLnJlamVjdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguZmlsdGVyKG4saC5uZWdhdGUoZChyKSksdCl9LGguZXZlcnk9aC5hbGw9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYoIXIobltvXSxvLG4pKXJldHVybiExfXJldHVybiEwfSxoLnNvbWU9aC5hbnk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYocihuW29dLG8sbikpcmV0dXJuITB9cmV0dXJuITF9LGguY29udGFpbnM9aC5pbmNsdWRlcz1oLmluY2x1ZGU9ZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSwoXCJudW1iZXJcIiE9dHlwZW9mIHR8fGUpJiYodD0wKSwwPD1oLmluZGV4T2YobixyLHQpfSxoLmludm9rZT1nKGZ1bmN0aW9uKG4sdCxlKXt2YXIgdSxpO3JldHVybiBoLmlzRnVuY3Rpb24odCk/aT10OmguaXNBcnJheSh0KSYmKHU9dC5zbGljZSgwLC0xKSx0PXRbdC5sZW5ndGgtMV0pLGgubWFwKG4sZnVuY3Rpb24obil7dmFyIHI9aTtpZighcil7aWYodSYmdS5sZW5ndGgmJihuPXgobix1KSksbnVsbD09bilyZXR1cm47cj1uW3RdfXJldHVybiBudWxsPT1yP3I6ci5hcHBseShuLGUpfSl9KSxoLnBsdWNrPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgubWFwKG4saC5wcm9wZXJ0eShyKSl9LGgud2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maWx0ZXIobixoLm1hdGNoZXIocikpfSxoLmZpbmRXaGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbmQobixoLm1hdGNoZXIocikpfSxoLm1heD1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPS0xLzAsbz0tMS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJmk8dCYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7dT1lKG4scix0KSwobzx1fHx1PT09LTEvMCYmaT09PS0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5taW49ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0xLzAsbz0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmdDxpJiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXsoKHU9ZShuLHIsdCkpPG98fHU9PT0xLzAmJmk9PT0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5zaHVmZmxlPWZ1bmN0aW9uKG4pe3JldHVybiBoLnNhbXBsZShuLDEvMCl9LGguc2FtcGxlPWZ1bmN0aW9uKG4scix0KXtpZihudWxsPT1yfHx0KXJldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksbltoLnJhbmRvbShuLmxlbmd0aC0xKV07dmFyIGU9dyhuKT9oLmNsb25lKG4pOmgudmFsdWVzKG4pLHU9QShlKTtyPU1hdGgubWF4KE1hdGgubWluKHIsdSksMCk7Zm9yKHZhciBpPXUtMSxvPTA7bzxyO28rKyl7dmFyIGE9aC5yYW5kb20obyxpKSxjPWVbb107ZVtvXT1lW2FdLGVbYV09Y31yZXR1cm4gZS5zbGljZSgwLHIpfSxoLnNvcnRCeT1mdW5jdGlvbihuLGUscil7dmFyIHU9MDtyZXR1cm4gZT1kKGUsciksaC5wbHVjayhoLm1hcChuLGZ1bmN0aW9uKG4scix0KXtyZXR1cm57dmFsdWU6bixpbmRleDp1KyssY3JpdGVyaWE6ZShuLHIsdCl9fSkuc29ydChmdW5jdGlvbihuLHIpe3ZhciB0PW4uY3JpdGVyaWEsZT1yLmNyaXRlcmlhO2lmKHQhPT1lKXtpZihlPHR8fHZvaWQgMD09PXQpcmV0dXJuIDE7aWYodDxlfHx2b2lkIDA9PT1lKXJldHVybi0xfXJldHVybiBuLmluZGV4LXIuaW5kZXh9KSxcInZhbHVlXCIpfTt2YXIgaz1mdW5jdGlvbihvLHIpe3JldHVybiBmdW5jdGlvbihlLHUsbil7dmFyIGk9cj9bW10sW11dOnt9O3JldHVybiB1PWQodSxuKSxoLmVhY2goZSxmdW5jdGlvbihuLHIpe3ZhciB0PXUobixyLGUpO28oaSxuLHQpfSksaX19O2guZ3JvdXBCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSksaC5pbmRleEJ5PWsoZnVuY3Rpb24obixyLHQpe25bdF09cn0pLGguY291bnRCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XSsrOm5bdF09MX0pO3ZhciBTPS9bXlxcdWQ4MDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkZmZmXS9nO2gudG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbj9oLmlzQXJyYXkobik/Yy5jYWxsKG4pOmguaXNTdHJpbmcobik/bi5tYXRjaChTKTp3KG4pP2gubWFwKG4saC5pZGVudGl0eSk6aC52YWx1ZXMobik6W119LGguc2l6ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj8wOncobik/bi5sZW5ndGg6aC5rZXlzKG4pLmxlbmd0aH0saC5wYXJ0aXRpb249ayhmdW5jdGlvbihuLHIsdCl7blt0PzA6MV0ucHVzaChyKX0sITApLGguZmlyc3Q9aC5oZWFkPWgudGFrZT1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uWzBdOmguaW5pdGlhbChuLG4ubGVuZ3RoLXIpfSxoLmluaXRpYWw9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobiwwLE1hdGgubWF4KDAsbi5sZW5ndGgtKG51bGw9PXJ8fHQ/MTpyKSkpfSxoLmxhc3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/bltuLmxlbmd0aC0xXTpoLnJlc3QobixNYXRoLm1heCgwLG4ubGVuZ3RoLXIpKX0saC5yZXN0PWgudGFpbD1oLmRyb3A9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobixudWxsPT1yfHx0PzE6cil9LGguY29tcGFjdD1mdW5jdGlvbihuKXtyZXR1cm4gaC5maWx0ZXIobixCb29sZWFuKX07dmFyIE09ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PShlPWV8fFtdKS5sZW5ndGgsaT0wLG89QShuKTtpPG87aSsrKXt2YXIgYT1uW2ldO2lmKHcoYSkmJihoLmlzQXJyYXkoYSl8fGguaXNBcmd1bWVudHMoYSkpKWlmKHIpZm9yKHZhciBjPTAsbD1hLmxlbmd0aDtjPGw7KWVbdSsrXT1hW2MrK107ZWxzZSBNKGEscix0LGUpLHU9ZS5sZW5ndGg7ZWxzZSB0fHwoZVt1KytdPWEpfXJldHVybiBlfTtoLmZsYXR0ZW49ZnVuY3Rpb24obixyKXtyZXR1cm4gTShuLHIsITEpfSxoLndpdGhvdXQ9ZyhmdW5jdGlvbihuLHIpe3JldHVybiBoLmRpZmZlcmVuY2UobixyKX0pLGgudW5pcT1oLnVuaXF1ZT1mdW5jdGlvbihuLHIsdCxlKXtoLmlzQm9vbGVhbihyKXx8KGU9dCx0PXIscj0hMSksbnVsbCE9dCYmKHQ9ZCh0LGUpKTtmb3IodmFyIHU9W10saT1bXSxvPTAsYT1BKG4pO288YTtvKyspe3ZhciBjPW5bb10sbD10P3QoYyxvLG4pOmM7ciYmIXQ/KG8mJmk9PT1sfHx1LnB1c2goYyksaT1sKTp0P2guY29udGFpbnMoaSxsKXx8KGkucHVzaChsKSx1LnB1c2goYykpOmguY29udGFpbnModSxjKXx8dS5wdXNoKGMpfXJldHVybiB1fSxoLnVuaW9uPWcoZnVuY3Rpb24obil7cmV0dXJuIGgudW5pcShNKG4sITAsITApKX0pLGguaW50ZXJzZWN0aW9uPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1bXSx0PWFyZ3VtZW50cy5sZW5ndGgsZT0wLHU9QShuKTtlPHU7ZSsrKXt2YXIgaT1uW2VdO2lmKCFoLmNvbnRhaW5zKHIsaSkpe3ZhciBvO2ZvcihvPTE7bzx0JiZoLmNvbnRhaW5zKGFyZ3VtZW50c1tvXSxpKTtvKyspO289PT10JiZyLnB1c2goaSl9fXJldHVybiByfSxoLmRpZmZlcmVuY2U9ZyhmdW5jdGlvbihuLHIpe3JldHVybiByPU0ociwhMCwhMCksaC5maWx0ZXIobixmdW5jdGlvbihuKXtyZXR1cm4haC5jb250YWlucyhyLG4pfSl9KSxoLnVuemlwPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1uJiZoLm1heChuLEEpLmxlbmd0aHx8MCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aC5wbHVjayhuLGUpO3JldHVybiB0fSxoLnppcD1nKGgudW56aXApLGgub2JqZWN0PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXt9LGU9MCx1PUEobik7ZTx1O2UrKylyP3RbbltlXV09cltlXTp0W25bZV1bMF1dPW5bZV1bMV07cmV0dXJuIHR9O3ZhciBGPWZ1bmN0aW9uKGkpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPUEobiksdT0wPGk/MDplLTE7MDw9dSYmdTxlO3UrPWkpaWYocihuW3VdLHUsbikpcmV0dXJuIHU7cmV0dXJuLTF9fTtoLmZpbmRJbmRleD1GKDEpLGguZmluZExhc3RJbmRleD1GKC0xKSxoLnNvcnRlZEluZGV4PWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0odD1kKHQsZSwxKSkociksaT0wLG89QShuKTtpPG87KXt2YXIgYT1NYXRoLmZsb29yKChpK28pLzIpO3QoblthXSk8dT9pPWErMTpvPWF9cmV0dXJuIGl9O3ZhciBFPWZ1bmN0aW9uKGksbyxhKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3ZhciBlPTAsdT1BKG4pO2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KTA8aT9lPTA8PXQ/dDpNYXRoLm1heCh0K3UsZSk6dT0wPD10P01hdGgubWluKHQrMSx1KTp0K3UrMTtlbHNlIGlmKGEmJnQmJnUpcmV0dXJuIG5bdD1hKG4scildPT09cj90Oi0xO2lmKHIhPXIpcmV0dXJuIDA8PSh0PW8oYy5jYWxsKG4sZSx1KSxoLmlzTmFOKSk/dCtlOi0xO2Zvcih0PTA8aT9lOnUtMTswPD10JiZ0PHU7dCs9aSlpZihuW3RdPT09cilyZXR1cm4gdDtyZXR1cm4tMX19O2guaW5kZXhPZj1FKDEsaC5maW5kSW5kZXgsaC5zb3J0ZWRJbmRleCksaC5sYXN0SW5kZXhPZj1FKC0xLGguZmluZExhc3RJbmRleCksaC5yYW5nZT1mdW5jdGlvbihuLHIsdCl7bnVsbD09ciYmKHI9bnx8MCxuPTApLHR8fCh0PXI8bj8tMToxKTtmb3IodmFyIGU9TWF0aC5tYXgoTWF0aC5jZWlsKChyLW4pL3QpLDApLHU9QXJyYXkoZSksaT0wO2k8ZTtpKyssbis9dCl1W2ldPW47cmV0dXJuIHV9LGguY2h1bms9ZnVuY3Rpb24obixyKXtpZihudWxsPT1yfHxyPDEpcmV0dXJuW107Zm9yKHZhciB0PVtdLGU9MCx1PW4ubGVuZ3RoO2U8dTspdC5wdXNoKGMuY2FsbChuLGUsZSs9cikpO3JldHVybiB0fTt2YXIgTj1mdW5jdGlvbihuLHIsdCxlLHUpe2lmKCEoZSBpbnN0YW5jZW9mIHIpKXJldHVybiBuLmFwcGx5KHQsdSk7dmFyIGk9bShuLnByb3RvdHlwZSksbz1uLmFwcGx5KGksdSk7cmV0dXJuIGguaXNPYmplY3Qobyk/bzppfTtoLmJpbmQ9ZyhmdW5jdGlvbihyLHQsZSl7aWYoIWguaXNGdW5jdGlvbihyKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uXCIpO3ZhciB1PWcoZnVuY3Rpb24obil7cmV0dXJuIE4ocix1LHQsdGhpcyxlLmNvbmNhdChuKSl9KTtyZXR1cm4gdX0pLGgucGFydGlhbD1nKGZ1bmN0aW9uKHUsaSl7dmFyIG89aC5wYXJ0aWFsLnBsYWNlaG9sZGVyLGE9ZnVuY3Rpb24oKXtmb3IodmFyIG49MCxyPWkubGVuZ3RoLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1pW2VdPT09bz9hcmd1bWVudHNbbisrXTppW2VdO2Zvcig7bjxhcmd1bWVudHMubGVuZ3RoOyl0LnB1c2goYXJndW1lbnRzW24rK10pO3JldHVybiBOKHUsYSx0aGlzLHRoaXMsdCl9O3JldHVybiBhfSksKGgucGFydGlhbC5wbGFjZWhvbGRlcj1oKS5iaW5kQWxsPWcoZnVuY3Rpb24obixyKXt2YXIgdD0ocj1NKHIsITEsITEpKS5sZW5ndGg7aWYodDwxKXRocm93IG5ldyBFcnJvcihcImJpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXNcIik7Zm9yKDt0LS07KXt2YXIgZT1yW3RdO25bZV09aC5iaW5kKG5bZV0sbil9fSksaC5tZW1vaXplPWZ1bmN0aW9uKGUsdSl7dmFyIGk9ZnVuY3Rpb24obil7dmFyIHI9aS5jYWNoZSx0PVwiXCIrKHU/dS5hcHBseSh0aGlzLGFyZ3VtZW50cyk6bik7cmV0dXJuIGoocix0KXx8KHJbdF09ZS5hcHBseSh0aGlzLGFyZ3VtZW50cykpLHJbdF19O3JldHVybiBpLmNhY2hlPXt9LGl9LGguZGVsYXk9ZyhmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gbi5hcHBseShudWxsLHQpfSxyKX0pLGguZGVmZXI9aC5wYXJ0aWFsKGguZGVsYXksaCwxKSxoLnRocm90dGxlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGEsYyxsPTA7dXx8KHU9e30pO3ZhciBmPWZ1bmN0aW9uKCl7bD0hMT09PXUubGVhZGluZz8wOmgubm93KCksaT1udWxsLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCl9LG49ZnVuY3Rpb24oKXt2YXIgbj1oLm5vdygpO2x8fCExIT09dS5sZWFkaW5nfHwobD1uKTt2YXIgcj1lLShuLWwpO3JldHVybiBvPXRoaXMsYT1hcmd1bWVudHMscjw9MHx8ZTxyPyhpJiYoY2xlYXJUaW1lb3V0KGkpLGk9bnVsbCksbD1uLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCkpOml8fCExPT09dS50cmFpbGluZ3x8KGk9c2V0VGltZW91dChmLHIpKSxjfTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksbD0wLGk9bz1hPW51bGx9LG59LGguZGVib3VuY2U9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYT1mdW5jdGlvbihuLHIpe2k9bnVsbCxyJiYobz10LmFwcGx5KG4scikpfSxuPWcoZnVuY3Rpb24obil7aWYoaSYmY2xlYXJUaW1lb3V0KGkpLHUpe3ZhciByPSFpO2k9c2V0VGltZW91dChhLGUpLHImJihvPXQuYXBwbHkodGhpcyxuKSl9ZWxzZSBpPWguZGVsYXkoYSxlLHRoaXMsbik7cmV0dXJuIG99KTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksaT1udWxsfSxufSxoLndyYXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5wYXJ0aWFsKHIsbil9LGgubmVnYXRlPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiFuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguY29tcG9zZT1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxlPXQubGVuZ3RoLTE7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPWUscj10W2VdLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtuLS07KXI9dFtuXS5jYWxsKHRoaXMscik7cmV0dXJuIHJ9fSxoLmFmdGVyPWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKCl7aWYoLS1uPDEpcmV0dXJuIHIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5iZWZvcmU9ZnVuY3Rpb24obixyKXt2YXIgdDtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gMDwtLW4mJih0PXIuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxuPD0xJiYocj1udWxsKSx0fX0saC5vbmNlPWgucGFydGlhbChoLmJlZm9yZSwyKSxoLnJlc3RBcmd1bWVudHM9Zzt2YXIgST0he3RvU3RyaW5nOm51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIiksVD1bXCJ2YWx1ZU9mXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJ0b1N0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImhhc093blByb3BlcnR5XCIsXCJ0b0xvY2FsZVN0cmluZ1wiXSxCPWZ1bmN0aW9uKG4scil7dmFyIHQ9VC5sZW5ndGgsZT1uLmNvbnN0cnVjdG9yLHU9aC5pc0Z1bmN0aW9uKGUpJiZlLnByb3RvdHlwZXx8byxpPVwiY29uc3RydWN0b3JcIjtmb3IoaihuLGkpJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSk7dC0tOykoaT1UW3RdKWluIG4mJm5baV0hPT11W2ldJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSl9O2gua2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTtpZihhKXJldHVybiBhKG4pO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWoobix0KSYmci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC5hbGxLZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKXIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGgudmFsdWVzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09bltyW3VdXTtyZXR1cm4gZX0saC5tYXBPYmplY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1oLmtleXMobiksdT1lLmxlbmd0aCxpPXt9LG89MDtvPHU7bysrKXt2YXIgYT1lW29dO2lbYV09cihuW2FdLGEsbil9cmV0dXJuIGl9LGgucGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1bclt1XSxuW3JbdV1dXTtyZXR1cm4gZX0saC5pbnZlcnQ9ZnVuY3Rpb24obil7Zm9yKHZhciByPXt9LHQ9aC5rZXlzKG4pLGU9MCx1PXQubGVuZ3RoO2U8dTtlKyspcltuW3RbZV1dXT10W2VdO3JldHVybiByfSxoLmZ1bmN0aW9ucz1oLm1ldGhvZHM9ZnVuY3Rpb24obil7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paC5pc0Z1bmN0aW9uKG5bdF0pJiZyLnB1c2godCk7cmV0dXJuIHIuc29ydCgpfTt2YXIgUj1mdW5jdGlvbihjLGwpe3JldHVybiBmdW5jdGlvbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO2lmKGwmJihuPU9iamVjdChuKSkscjwyfHxudWxsPT1uKXJldHVybiBuO2Zvcih2YXIgdD0xO3Q8cjt0KyspZm9yKHZhciBlPWFyZ3VtZW50c1t0XSx1PWMoZSksaT11Lmxlbmd0aCxvPTA7bzxpO28rKyl7dmFyIGE9dVtvXTtsJiZ2b2lkIDAhPT1uW2FdfHwoblthXT1lW2FdKX1yZXR1cm4gbn19O2guZXh0ZW5kPVIoaC5hbGxLZXlzKSxoLmV4dGVuZE93bj1oLmFzc2lnbj1SKGgua2V5cyksaC5maW5kS2V5PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGUsdT1oLmtleXMobiksaT0wLG89dS5sZW5ndGg7aTxvO2krKylpZihyKG5bZT11W2ldXSxlLG4pKXJldHVybiBlfTt2YXIgcSxLLHo9ZnVuY3Rpb24obixyLHQpe3JldHVybiByIGluIHR9O2gucGljaz1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9e30sZT1yWzBdO2lmKG51bGw9PW4pcmV0dXJuIHQ7aC5pc0Z1bmN0aW9uKGUpPygxPHIubGVuZ3RoJiYoZT15KGUsclsxXSkpLHI9aC5hbGxLZXlzKG4pKTooZT16LHI9TShyLCExLCExKSxuPU9iamVjdChuKSk7Zm9yKHZhciB1PTAsaT1yLmxlbmd0aDt1PGk7dSsrKXt2YXIgbz1yW3VdLGE9bltvXTtlKGEsbyxuKSYmKHRbb109YSl9cmV0dXJuIHR9KSxoLm9taXQ9ZyhmdW5jdGlvbihuLHQpe3ZhciByLGU9dFswXTtyZXR1cm4gaC5pc0Z1bmN0aW9uKGUpPyhlPWgubmVnYXRlKGUpLDE8dC5sZW5ndGgmJihyPXRbMV0pKToodD1oLm1hcChNKHQsITEsITEpLFN0cmluZyksZT1mdW5jdGlvbihuLHIpe3JldHVybiFoLmNvbnRhaW5zKHQscil9KSxoLnBpY2sobixlLHIpfSksaC5kZWZhdWx0cz1SKGguYWxsS2V5cywhMCksaC5jcmVhdGU9ZnVuY3Rpb24obixyKXt2YXIgdD1tKG4pO3JldHVybiByJiZoLmV4dGVuZE93bih0LHIpLHR9LGguY2xvbmU9ZnVuY3Rpb24obil7cmV0dXJuIGguaXNPYmplY3Qobik/aC5pc0FycmF5KG4pP24uc2xpY2UoKTpoLmV4dGVuZCh7fSxuKTpufSxoLnRhcD1mdW5jdGlvbihuLHIpe3JldHVybiByKG4pLG59LGguaXNNYXRjaD1mdW5jdGlvbihuLHIpe3ZhciB0PWgua2V5cyhyKSxlPXQubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKHZhciB1PU9iamVjdChuKSxpPTA7aTxlO2krKyl7dmFyIG89dFtpXTtpZihyW29dIT09dVtvXXx8IShvIGluIHUpKXJldHVybiExfXJldHVybiEwfSxxPWZ1bmN0aW9uKG4scix0LGUpe2lmKG49PT1yKXJldHVybiAwIT09bnx8MS9uPT0xL3I7aWYobnVsbD09bnx8bnVsbD09cilyZXR1cm4hMTtpZihuIT1uKXJldHVybiByIT1yO3ZhciB1PXR5cGVvZiBuO3JldHVybihcImZ1bmN0aW9uXCI9PT11fHxcIm9iamVjdFwiPT09dXx8XCJvYmplY3RcIj09dHlwZW9mIHIpJiZLKG4scix0LGUpfSxLPWZ1bmN0aW9uKG4scix0LGUpe24gaW5zdGFuY2VvZiBoJiYobj1uLl93cmFwcGVkKSxyIGluc3RhbmNlb2YgaCYmKHI9ci5fd3JhcHBlZCk7dmFyIHU9cC5jYWxsKG4pO2lmKHUhPT1wLmNhbGwocikpcmV0dXJuITE7c3dpdGNoKHUpe2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVyblwiXCIrbj09XCJcIityO2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybituIT0rbj8rciE9K3I6MD09K24/MS8rbj09MS9yOituPT0rcjtjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOnJldHVybituPT0rcjtjYXNlXCJbb2JqZWN0IFN5bWJvbF1cIjpyZXR1cm4gcy52YWx1ZU9mLmNhbGwobik9PT1zLnZhbHVlT2YuY2FsbChyKX12YXIgaT1cIltvYmplY3QgQXJyYXldXCI9PT11O2lmKCFpKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygbnx8XCJvYmplY3RcIiE9dHlwZW9mIHIpcmV0dXJuITE7dmFyIG89bi5jb25zdHJ1Y3RvcixhPXIuY29uc3RydWN0b3I7aWYobyE9PWEmJiEoaC5pc0Z1bmN0aW9uKG8pJiZvIGluc3RhbmNlb2YgbyYmaC5pc0Z1bmN0aW9uKGEpJiZhIGluc3RhbmNlb2YgYSkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHIpcmV0dXJuITF9ZT1lfHxbXTtmb3IodmFyIGM9KHQ9dHx8W10pLmxlbmd0aDtjLS07KWlmKHRbY109PT1uKXJldHVybiBlW2NdPT09cjtpZih0LnB1c2gobiksZS5wdXNoKHIpLGkpe2lmKChjPW4ubGVuZ3RoKSE9PXIubGVuZ3RoKXJldHVybiExO2Zvcig7Yy0tOylpZighcShuW2NdLHJbY10sdCxlKSlyZXR1cm4hMX1lbHNle3ZhciBsLGY9aC5rZXlzKG4pO2lmKGM9Zi5sZW5ndGgsaC5rZXlzKHIpLmxlbmd0aCE9PWMpcmV0dXJuITE7Zm9yKDtjLS07KWlmKGw9ZltjXSwhaihyLGwpfHwhcShuW2xdLHJbbF0sdCxlKSlyZXR1cm4hMX1yZXR1cm4gdC5wb3AoKSxlLnBvcCgpLCEwfSxoLmlzRXF1YWw9ZnVuY3Rpb24obixyKXtyZXR1cm4gcShuLHIpfSxoLmlzRW1wdHk9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW58fCh3KG4pJiYoaC5pc0FycmF5KG4pfHxoLmlzU3RyaW5nKG4pfHxoLmlzQXJndW1lbnRzKG4pKT8wPT09bi5sZW5ndGg6MD09PWgua2V5cyhuKS5sZW5ndGgpfSxoLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4hKCFufHwxIT09bi5ub2RlVHlwZSl9LGguaXNBcnJheT10fHxmdW5jdGlvbihuKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1wLmNhbGwobil9LGguaXNPYmplY3Q9ZnVuY3Rpb24obil7dmFyIHI9dHlwZW9mIG47cmV0dXJuXCJmdW5jdGlvblwiPT09cnx8XCJvYmplY3RcIj09PXImJiEhbn0saC5lYWNoKFtcIkFyZ3VtZW50c1wiLFwiRnVuY3Rpb25cIixcIlN0cmluZ1wiLFwiTnVtYmVyXCIsXCJEYXRlXCIsXCJSZWdFeHBcIixcIkVycm9yXCIsXCJTeW1ib2xcIixcIk1hcFwiLFwiV2Vha01hcFwiLFwiU2V0XCIsXCJXZWFrU2V0XCJdLGZ1bmN0aW9uKHIpe2hbXCJpc1wiK3JdPWZ1bmN0aW9uKG4pe3JldHVybiBwLmNhbGwobik9PT1cIltvYmplY3QgXCIrcitcIl1cIn19KSxoLmlzQXJndW1lbnRzKGFyZ3VtZW50cyl8fChoLmlzQXJndW1lbnRzPWZ1bmN0aW9uKG4pe3JldHVybiBqKG4sXCJjYWxsZWVcIil9KTt2YXIgRD1uLmRvY3VtZW50JiZuLmRvY3VtZW50LmNoaWxkTm9kZXM7XCJmdW5jdGlvblwiIT10eXBlb2YvLi8mJlwib2JqZWN0XCIhPXR5cGVvZiBJbnQ4QXJyYXkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIEQmJihoLmlzRnVuY3Rpb249ZnVuY3Rpb24obil7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbnx8ITF9KSxoLmlzRmluaXRlPWZ1bmN0aW9uKG4pe3JldHVybiFoLmlzU3ltYm9sKG4pJiZpc0Zpbml0ZShuKSYmIWlzTmFOKHBhcnNlRmxvYXQobikpfSxoLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTnVtYmVyKG4pJiZpc05hTihuKX0saC5pc0Jvb2xlYW49ZnVuY3Rpb24obil7cmV0dXJuITA9PT1ufHwhMT09PW58fFwiW29iamVjdCBCb29sZWFuXVwiPT09cC5jYWxsKG4pfSxoLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LGguaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIHZvaWQgMD09PW59LGguaGFzPWZ1bmN0aW9uKG4scil7aWYoIWguaXNBcnJheShyKSlyZXR1cm4gaihuLHIpO2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7dmFyIHU9cltlXTtpZihudWxsPT1ufHwhaS5jYWxsKG4sdSkpcmV0dXJuITE7bj1uW3VdfXJldHVybiEhdH0saC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4uXz1yLHRoaXN9LGguaWRlbnRpdHk9ZnVuY3Rpb24obil7cmV0dXJuIG59LGguY29uc3RhbnQ9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG59fSxoLm5vb3A9ZnVuY3Rpb24oKXt9LGgucHJvcGVydHk9ZnVuY3Rpb24ocil7cmV0dXJuIGguaXNBcnJheShyKT9mdW5jdGlvbihuKXtyZXR1cm4geChuLHIpfTpiKHIpfSxoLnByb3BlcnR5T2Y9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGw9PXI/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKG4pe3JldHVybiBoLmlzQXJyYXkobik/eChyLG4pOnJbbl19fSxoLm1hdGNoZXI9aC5tYXRjaGVzPWZ1bmN0aW9uKHIpe3JldHVybiByPWguZXh0ZW5kT3duKHt9LHIpLGZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTWF0Y2gobixyKX19LGgudGltZXM9ZnVuY3Rpb24obixyLHQpe3ZhciBlPUFycmF5KE1hdGgubWF4KDAsbikpO3I9eShyLHQsMSk7Zm9yKHZhciB1PTA7dTxuO3UrKyllW3VdPXIodSk7cmV0dXJuIGV9LGgucmFuZG9tPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGw9PXImJihyPW4sbj0wKSxuK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooci1uKzEpKX0saC5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9O3ZhciBMPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiN4Mjc7XCIsXCJgXCI6XCImI3g2MDtcIn0sUD1oLmludmVydChMKSxXPWZ1bmN0aW9uKHIpe3ZhciB0PWZ1bmN0aW9uKG4pe3JldHVybiByW25dfSxuPVwiKD86XCIraC5rZXlzKHIpLmpvaW4oXCJ8XCIpK1wiKVwiLGU9UmVnRXhwKG4pLHU9UmVnRXhwKG4sXCJnXCIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbj1udWxsPT1uP1wiXCI6XCJcIituLGUudGVzdChuKT9uLnJlcGxhY2UodSx0KTpufX07aC5lc2NhcGU9VyhMKSxoLnVuZXNjYXBlPVcoUCksaC5yZXN1bHQ9ZnVuY3Rpb24obixyLHQpe2guaXNBcnJheShyKXx8KHI9W3JdKTt2YXIgZT1yLmxlbmd0aDtpZighZSlyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP3QuY2FsbChuKTp0O2Zvcih2YXIgdT0wO3U8ZTt1Kyspe3ZhciBpPW51bGw9PW4/dm9pZCAwOm5bclt1XV07dm9pZCAwPT09aSYmKGk9dCx1PWUpLG49aC5pc0Z1bmN0aW9uKGkpP2kuY2FsbChuKTppfXJldHVybiBufTt2YXIgQz0wO2gudW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHI9KytDK1wiXCI7cmV0dXJuIG4/bityOnJ9LGgudGVtcGxhdGVTZXR0aW5ncz17ZXZhbHVhdGU6LzwlKFtcXHNcXFNdKz8pJT4vZyxpbnRlcnBvbGF0ZTovPCU9KFtcXHNcXFNdKz8pJT4vZyxlc2NhcGU6LzwlLShbXFxzXFxTXSs/KSU+L2d9O3ZhciBKPS8oLileLyxVPXtcIidcIjpcIidcIixcIlxcXFxcIjpcIlxcXFxcIixcIlxcclwiOlwiclwiLFwiXFxuXCI6XCJuXCIsXCJcXHUyMDI4XCI6XCJ1MjAyOFwiLFwiXFx1MjAyOVwiOlwidTIwMjlcIn0sVj0vXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2csJD1mdW5jdGlvbihuKXtyZXR1cm5cIlxcXFxcIitVW25dfTtoLnRlbXBsYXRlPWZ1bmN0aW9uKGksbixyKXshbiYmciYmKG49ciksbj1oLmRlZmF1bHRzKHt9LG4saC50ZW1wbGF0ZVNldHRpbmdzKTt2YXIgdCxlPVJlZ0V4cChbKG4uZXNjYXBlfHxKKS5zb3VyY2UsKG4uaW50ZXJwb2xhdGV8fEopLnNvdXJjZSwobi5ldmFsdWF0ZXx8Sikuc291cmNlXS5qb2luKFwifFwiKStcInwkXCIsXCJnXCIpLG89MCxhPVwiX19wKz0nXCI7aS5yZXBsYWNlKGUsZnVuY3Rpb24obixyLHQsZSx1KXtyZXR1cm4gYSs9aS5zbGljZShvLHUpLnJlcGxhY2UoViwkKSxvPXUrbi5sZW5ndGgscj9hKz1cIicrXFxuKChfX3Q9KFwiK3IrXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI6dD9hKz1cIicrXFxuKChfX3Q9KFwiK3QrXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjplJiYoYSs9XCInO1xcblwiK2UrXCJcXG5fX3ArPSdcIiksbn0pLGErPVwiJztcXG5cIixuLnZhcmlhYmxlfHwoYT1cIndpdGgob2JqfHx7fSl7XFxuXCIrYStcIn1cXG5cIiksYT1cInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIitcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIrYStcInJldHVybiBfX3A7XFxuXCI7dHJ5e3Q9bmV3IEZ1bmN0aW9uKG4udmFyaWFibGV8fFwib2JqXCIsXCJfXCIsYSl9Y2F0Y2gobil7dGhyb3cgbi5zb3VyY2U9YSxufXZhciB1PWZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwodGhpcyxuLGgpfSxjPW4udmFyaWFibGV8fFwib2JqXCI7cmV0dXJuIHUuc291cmNlPVwiZnVuY3Rpb24oXCIrYytcIil7XFxuXCIrYStcIn1cIix1fSxoLmNoYWluPWZ1bmN0aW9uKG4pe3ZhciByPWgobik7cmV0dXJuIHIuX2NoYWluPSEwLHJ9O3ZhciBHPWZ1bmN0aW9uKG4scil7cmV0dXJuIG4uX2NoYWluP2gocikuY2hhaW4oKTpyfTtoLm1peGluPWZ1bmN0aW9uKHQpe3JldHVybiBoLmVhY2goaC5mdW5jdGlvbnModCksZnVuY3Rpb24obil7dmFyIHI9aFtuXT10W25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49W3RoaXMuX3dyYXBwZWRdO3JldHVybiB1LmFwcGx5KG4sYXJndW1lbnRzKSxHKHRoaXMsci5hcHBseShoLG4pKX19KSxofSxoLm1peGluKGgpLGguZWFjaChbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJzcGxpY2VcIixcInVuc2hpZnRcIl0sZnVuY3Rpb24ocil7dmFyIHQ9ZVtyXTtoLnByb3RvdHlwZVtyXT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX3dyYXBwZWQ7cmV0dXJuIHQuYXBwbHkobixhcmd1bWVudHMpLFwic2hpZnRcIiE9PXImJlwic3BsaWNlXCIhPT1yfHwwIT09bi5sZW5ndGh8fGRlbGV0ZSBuWzBdLEcodGhpcyxuKX19KSxoLmVhY2goW1wiY29uY2F0XCIsXCJqb2luXCIsXCJzbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgcj1lW25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIEcodGhpcyxyLmFwcGx5KHRoaXMuX3dyYXBwZWQsYXJndW1lbnRzKSl9fSksaC5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcHBlZH0saC5wcm90b3R5cGUudmFsdWVPZj1oLnByb3RvdHlwZS50b0pTT049aC5wcm90b3R5cGUudmFsdWUsaC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gU3RyaW5nKHRoaXMuX3dyYXBwZWQpfSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShcInVuZGVyc2NvcmVcIixbXSxmdW5jdGlvbigpe3JldHVybiBofSl9KCk7XHJcbiIsImltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbn0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1J0bXAgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3J0bXA6JykgPT0gMCB8fCB0eXBlID09ICdydG1wJyk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc1dlYlJUQyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICBpZihmaWxlKXtcclxuICAgICAgICByZXR1cm4gKGZpbGUuaW5kZXhPZignd3M6JykgPT09IDAgfHwgZmlsZS5pbmRleE9mKCd3c3M6JykgPT09IDAgfHwgdHlwZSA9PT0gJ3dlYnJ0YycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgaXNEYXNoID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIHJldHVybiAoIHR5cGUgPT09ICdtcGQnIHx8ICB0eXBlID09PSAnZGFzaCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2Rhc2greG1sJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtcGQnKTtcclxufTtcclxuIiwiLyoqXG4gKiB1dGlscyBmb3Igd2VicGFja1xuICovXG5cbmV4cG9ydCBjb25zdCBnZXRTY3JpcHRQYXRoID0gZnVuY3Rpb24oc2NyaXB0TmFtZSkge1xuICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHNjcmlwdHNbaV0uc3JjO1xuICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHNyYy5sYXN0SW5kZXhPZignLycgKyBzY3JpcHROYW1lKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHIoMCwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjkuLlxuICovXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IF9fVkVSU0lPTl9fO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==