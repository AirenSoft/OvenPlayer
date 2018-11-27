/*! OvenPlayerv0.7.79 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
    that.setTimecodeMode = function (isShow) {
        OvenPlayerConsole.log("API : setTimecodeMode()", isShow);
        return playerConfig.setTimecodeMode(isShow);
    };
    that.isTimecodeMode = function () {
        OvenPlayerConsole.log("API : isTimecodeMode()");
        return playerConfig.isTimecodeMode();
    };
    that.getFramerate = function () {
        OvenPlayerConsole.log("API : getFramerate()", currentProvider.getFramerate());
        return currentProvider.getFramerate();
    };
    that.setFramerate = function (framerate) {
        OvenPlayerConsole.log("API : setFramerate()", framerate);
        return currentProvider.setFramerate(framerate);
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
        isTimecodeMode = isShow;
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
var version = exports.version = '0.7.79-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaUV4cGFuc2lvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9Db25maWd1cmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvU3VwcG9ydENoZWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9jYXB0aW9uL0xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1NydFBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9vdmVucGxheWVyLnNkay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYWpheC5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2NhcHRpb25zL3Z0dEN1ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvbGlrZUEkLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3VuZGVyc2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVyc2lvbi5qcyJdLCJuYW1lcyI6WyJBcGkiLCJjb250YWluZXIiLCJsb2dNYW5hZ2VyIiwidGhhdCIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidmVyc2lvbiIsImNhcHRpb25NYW5hZ2VyIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiaW5pdFByb3ZpZGVyIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImdldFNvdXJjZUxhYmVsIiwibGFiZWwiLCJsb2FkUHJvdmlkZXJzIiwiZ2V0UGxheWxpc3QiLCJ0aGVuIiwiZGVzdHJveSIsImN1cnJlbnRTb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2VzIiwiUHJvdmlkZXJzIiwiZ2V0TmFtZSIsIlBST1ZJREVSX1JUTVAiLCJvbiIsIm5hbWUiLCJkYXRhIiwidHJpZ2dlciIsIkVSUk9SIiwicGFyc2VJbnQiLCJjb2RlIiwiTkVUV09SS19VTlNUQUJMRUQiLCJnZXRDdXJyZW50U291cmNlIiwiZ2V0U291cmNlcyIsInBhdXNlIiwic2V0Q3VycmVudFNvdXJjZSIsInByZWxvYWQiLCJmbHVzaCIsIlJFQURZIiwiZXJyb3IiLCJlcnJvck9iamVjdCIsIklOSVRfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwib2ZmIiwiaW5pdCIsIm9wdGlvbnMiLCJpc0RlYnVnIiwiZGlzYWJsZSIsInNldFBsYXlsaXN0IiwiZ2V0Q29uZmlnIiwic2V0VGltZWNvZGVNb2RlIiwiaXNTaG93IiwiaXNUaW1lY29kZU1vZGUiLCJnZXRGcmFtZXJhdGUiLCJzZXRGcmFtZXJhdGUiLCJmcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsImdldFZvbHVtZSIsInNldFZvbHVtZSIsInZvbHVtZSIsInNldE11dGUiLCJzdGF0ZSIsImdldE11dGUiLCJsb2FkIiwicGxheWxpc3QiLCJzZXRDdXJyZW50UXVhbGl0eSIsInBsYXkiLCJzZWVrIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJzZXREZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwic291cmNlSW5kZXgiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwiaXNTYW1lUHJvdmlkZXIiLCJyZXN1bHRTb3VyY2VJbmRleCIsImdldFF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldENhcHRpb25MaXN0IiwiZ2V0Q3VycmVudENhcHRpb24iLCJzZXRDdXJyZW50Q2FwdGlvbiIsImluZGV4IiwiYWRkQ2FwdGlvbiIsInRyYWNrIiwicmVtb3ZlQ2FwdGlvbiIsImdldEJ1ZmZlciIsImdldFN0YXRlIiwic3RvcCIsInJlbW92ZSIsIkRFU1RST1kiLCJPdmVuUGxheWVyU0RLIiwicmVtb3ZlUGxheWVyIiwiZ2V0Q29udGFpbmVySWQiLCJBcGlSdG1wRXhwYW5zaW9uIiwiZXh0ZXJuYWxDYWxsYmFja0NyZWVwIiwicmVzdWx0IiwidHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsIiwiQ29uZmlndXJhdG9yIiwiY29tcG9zZVNvdXJjZU9wdGlvbnMiLCJEZWZhdWx0cyIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGVDb250cm9scyIsInBsYXliYWNrUmF0ZXMiLCJtdXRlIiwic2VyaWFsaXplIiwidmFsIiwidW5kZWZpbmVkIiwibG93ZXJjYXNlVmFsIiwidG9Mb3dlckNhc2UiLCJpc05hTiIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJkZXNlcmlhbGl6ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwibm9ybWFsaXplU2l6ZSIsInNsaWNlIiwiZXZhbHVhdGVBc3BlY3RSYXRpbyIsImFyIiwid2lkdGgiLCJ0b1N0cmluZyIsImluZGV4T2YiLCJ0ZXN0IiwidyIsInN1YnN0ciIsImgiLCJjb25maWciLCJyYXRlQ29udHJvbHMiLCJyYXRlcyIsIkFycmF5IiwiaXNBcnJheSIsImZpbHRlciIsIl8iLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJwdXNoIiwic29ydCIsImNvbmZpZ1BsYXlsaXN0Iiwib2JqIiwicGljayIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJkZWJ1ZyIsImltYWdlIiwicXVhbGl0eUxhYmVsIiwic291cmNlTGFiZWwiLCJyZXBlYXQiLCJzdHJldGNoaW5nIiwiZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSIsImdldFF1YWxpdHlMYWJlbCIsInNldFF1YWxpdHlMYWJlbCIsIm5ld0xhYmVsIiwic2V0U291cmNlTGFiZWwiLCJnZXRQbGF5YmFja1JhdGVzIiwiaXNQbGF5YmFja1JhdGVDb250cm9scyIsInBsYXlsaXN0XyIsImlzUmVwZWF0IiwiZ2V0U3RyZXRjaGluZyIsIkV2ZW50RW1pdHRlciIsIm9iamVjdCIsIl9ldmVudHMiLCJ0cmlnZ2VyRXZlbnRzIiwiZXZlbnRzIiwiYXJncyIsImNvbnRleHQiLCJldmVudCIsImxpc3RlbmVyIiwiYXBwbHkiLCJjYWxsIiwiYXJndW1lbnRzIiwiYWxsRXZlbnRzIiwiYWxsIiwibmFtZXMiLCJsIiwicmV0YWluIiwiaiIsImsiLCJfbGlzdGVuZXIiLCJvbmNlIiwiY291bnQiLCJvbmNlQ2FsbGJhY2siLCJMYXp5Q29tbWFuZEV4ZWN1dG9yIiwiaW5zdGFuY2UiLCJxdWV1ZWRDb21tYW5kcyIsImNvbW1hbmRRdWV1ZSIsInVuZGVjb3JhdGVkTWV0aG9kcyIsImV4ZWN1dGVNb2RlIiwiY29tbWFuZCIsIm1ldGhvZCIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImNvbW1hbmRfIiwiY29tbWFuZFF1ZXVlSXRlbSIsImZpbmRXaGVyZSIsInNwbGljZSIsImZpbmRJbmRleCIsIlN1cHBvcnRDaGVja2VyIiwic3VwcG9ydExpc3QiLCJjaGVja1N1cHBvcnQiLCJzb3VyY2UiLCJNaW1lVHlwZXMiLCJhYWMiLCJtcDQiLCJmNHYiLCJtNHYiLCJtb3YiLCJtcDMiLCJtcGVnIiwib2d2Iiwib2dnIiwib2dhIiwidm9yYmlzIiwid2VibSIsImY0YSIsIm0zdTgiLCJtM3UiLCJobHMiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsImlzSGxzU3VwcG9ydCIsImdldE1lZGlhU291cmNlIiwid2luZG93IiwiTWVkaWFTb3VyY2UiLCJXZWJLaXRNZWRpYVNvdXJjZSIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVyIiwiU291cmNlQnVmZmVyIiwiV2ViS2l0U291cmNlQnVmZmVyIiwiaXNUeXBlU3VwcG9ydGVkIiwic291cmNlQnVmZmVyVmFsaWRBUEkiLCJhcHBlbmRCdWZmZXIiLCJmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UiLCJzb3J1Y2VfIiwiZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0Iiwic3VwcG9ydE5hbWVzIiwiaXRlbSIsInN1cHBvcnRlZCIsIkxvYWRlciIsImNvbnZlcnRWVFRVcmwiLCJ0cmFja1VybCIsImVzY2FwZSIsImNvbnZlcnRUb1ZUVEN1ZXMiLCJjdWVzIiwiVlRUQ3VlIiwiY3VlIiwic3RhcnQiLCJlbmQiLCJ0ZXh0Iiwic3VjY2Vzc0NhbGxiYWNrIiwiZXJyb3JDYWxsYmFjayIsImdldCIsInJlc3BvbnNlIiwieGhyIiwidnR0Q3VlcyIsInJlc3BvbnNlVGV4dCIsImxvYWRWdHRQYXJzZXIiLCJwYXJzZXIiLCJXZWJWVFQiLCJQYXJzZXIiLCJTdHJpbmdEZWNvZGVyIiwib25jdWUiLCJvbmZsdXNoIiwicGFyc2UiLCJwYXJzZWREYXRhIiwicmVxdWlyZSIsImVyciIsImNvbnNvbGUiLCJpc1N1cHBvcnQiLCJraW5kIiwiTWFuYWdlciIsImFwaSIsImNhcHRpb25MaXN0IiwiY3VycmVudENhcHRpb25JbmRleCIsImNhcHRpb25Mb2FkZXIiLCJpc0Zpc3J0TG9hZCIsImlzU2hvd2luZyIsImJpbmRUcmFjayIsImxhbmd1YWdlIiwiaWQiLCJ0cmFja3NDb3VudCIsInRyYWNrSWQiLCJwcmVmaXgiLCJkZWZhdWx0dHJhY2siLCJjaGFuZ2VDdXJyZW50Q2FwdGlvbiIsIkNPTlRFTlRfQ0FQVElPTl9DSEFOR0VEIiwidHJhY2tzIiwiY2FwdGlvbklkIiwiUExBWUVSX0NBUFRJT05fRVJST1IiLCJDT05URU5UX1RJTUUiLCJtZXRhIiwiY3VycmVudEN1ZXMiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEIiwiZmx1c2hDYXB0aW9uTGlzdCIsImxhc3RDYXB0aW9uSW5kZXgiLCJfaW5kZXgiLCJsYW5nQ29kZXMiLCJyZU9wZW5TeW5jIiwicmVDbG9zZVN5bmMiLCJyZUxpbmVFbmRpbmciLCJyZUJyb2tlblRhZyIsInJlU3RhcnRUaW1lIiwicmVCciIsInJlU3R5bGUiLCJyZUNvbW1lbnQiLCJjbG9uZSIsImZsYWdzIiwibmV3SW5zdGFuY2UiLCJEYXRlIiwiZ2V0VGltZSIsIlJlZ0V4cCIsImdsb2JhbCIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJzdGlja3kiLCJjb25zdHJ1Y3RvciIsInN0cmlwX3RhZ3MiLCJpbnB1dCIsImFsbG93ZWQiLCJtYXRjaCIsImpvaW4iLCJ0YWdzIiwiY29tbWVudHNBbmRQaHBUYWdzIiwicmVwbGFjZSIsIiQwIiwiJDEiLCJfc29ydCIsImxhbmdJdGVtIiwiYSIsImIiLCJyZXMiLCJfbWVyZ2VNdWx0aUxhbmd1YWdlcyIsImFyciIsImNvbnRlbnQiLCJkaWN0IiwiaWR4IiwibGFuZyIsInJldCIsIl9pIiwiX2xlbiIsIl9yZWYiLCJsYW5ndWFnZXMiLCJTbWlQYXJzZXIiLCJzYW1pIiwiZGVmaW5lZExhbmdzIiwiZXJyb3JzIiwiZ2V0RGVmaW5lZExhbmdzIiwiZ2V0TGFuZ3VhZ2UiLCJtYWtlRW5kVGltZSIsInZhbHVlIiwiZWxlbWVudCIsImlubmVyVGV4dCIsImlzQnJva2VuIiwibGluZU51bSIsIm5leHRTdGFydFRhZ0lkeCIsInN0YXJ0VGFnSWR4Iiwic3RyIiwidGVtcFJldCIsIl9yZWYxIiwiX3JlZjIiLCJlIiwiRXJyb3IiLCJsaW5lIiwic2VhcmNoIiwidHJpbSIsImNvbnRlbnRzIiwiY29uY2F0IiwiY2xhc3NOYW1lIiwicmVDbGFzc05hbWUiLCJkZWNsYXJhdGlvbiIsIm1hdGNoZWQiLCJwYXJzZWQiLCJydWxlIiwic2VsZWN0b3IiLCJfcmVzdWx0cyIsImNzc1BhcnNlIiwic3R5bGVzaGVldCIsInJ1bGVzIiwic2VsZWN0b3JzIiwiX2oiLCJfbGVuMSIsIl9yZXN1bHRzMSIsImRlY2xhcmF0aW9ucyIsInByb3BlcnR5IiwiX2Vycm9yIiwiS1JDQyIsIktSIiwiRU5DQyIsIkVHQ0MiLCJFTiIsIkpQQ0MiLCJfZW50cnkiLCJlbnRyeSIsImFycmF5Iiwic3BsaXQiLCJTcnRQYXJzZXIiLCJjYXB0aW9ucyIsImxpc3QiLCJTVEFURV9CVUZGRVJJTkciLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJTVEFURV9QQVVTRUQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfRVJST1IiLCJTVEFURV9MT0FESU5HIiwiU1RBVEVfU1RBTExFRCIsIlBST1ZJREVSX0hUTUw1IiwiUFJPVklERVJfV0VCUlRDIiwiUFJPVklERVJfREFTSCIsIlBST1ZJREVSX0hMUyIsIkNPTlRFTlRfQ09NUExFVEUiLCJDT05URU5UX1NFRUsiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiRElTUExBWV9DTElDSyIsIkNPTlRFTlRfTE9BREVEIiwiQ09OVEVOVF9TRUVLRUQiLCJQTEFZRVJfU1RBVEUiLCJQTEFZRVJfQ09NUExFVEUiLCJQTEFZRVJfUEFVU0UiLCJQTEFZRVJfUExBWSIsIkNPTlRFTlRfQlVGRkVSIiwiQ09OVEVOVF9SQVRFX0NIQU5HRSIsIkNPTlRFTlRfVk9MVU1FIiwiQ09OVEVOVF9NVVRFIiwiQ09OVEVOVF9NRVRBIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfQ0xPU0VEIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1ciLCJjdXJyZW50UGxheWxpc3QiLCJzdXBwb3J0Q2hlY2tlciIsIm1ha2VQcmV0dHlTb3VyY2UiLCJzb3VyY2VfIiwiaG9zdCIsImFwcGxpY2F0aW9uIiwic3RyZWFtIiwibWltZXR5cGVSZWdFeCIsInByZXR0aWVkUGxheWxpc3QiLCJwbGF5bGlzdEl0ZW0iLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwiQ29udHJvbGxlciIsInN1cHBvcnRDaGFja2VyIiwicmVnaXN0ZVByb3ZpZGVyIiwicHJvdmlkZXIiLCJQcm92aWRlckxvYWRlciIsImh0bWw1Iiwid2VicnRjIiwiZGFzaCIsInJ0bXAiLCJzdXBwb3J0ZWRQcm92aWRlck5hbWVzIiwiUHJvbWlzZSIsInByb3ZpZGVyTmFtZSIsImZpbmRCeU5hbWUiLCJnZXRQcm92aWRlckJ5U291cmNlIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lIiwiX193ZWJwYWNrX3B1YmxpY19wYXRoX18iLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiY29udGFpbmVyRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwibm9kZVR5cGUiLCJjcmVhdGUiLCJwbGF5ZXJJbnN0YW5jZSIsImdldFBsYXllckxpc3QiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJnZXRQbGF5ZXJCeUluZGV4IiwicGxheWVySWQiLCJnZW5lcmF0ZVdlYnJ0Y1VybHMiLCJ0IiwiZGVmaW5lIiwiciIsImJhc2VVcmwiLCJ1cmwiLCJuIiwicmVkdWNlIiwibyIsInUiLCJjIiwiZiIsIlhNTEh0dHBSZXF1ZXN0IiwiZCIsIm9wZW4iLCJ3aXRoQ3JlZGVudGlhbHMiLCJoYXNPd25Qcm9wZXJ0eSIsImhlYWRlcnMiLCJhZGRFdmVudExpc3RlbmVyIiwic2VuZCIsInMiLCJhYm9ydCIsInNldFJlcXVlc3RIZWFkZXIiLCJzb21lIiwicmVhZHlTdGF0ZSIsIkRPTkUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWx3YXlzIiwic3RhdHVzIiwiSlNPTiIsImVuY29kZVVSSUNvbXBvbmVudCIsImF1dG9LZXl3b3JkIiwiZGlyZWN0aW9uU2V0dGluZyIsImFsaWduU2V0dGluZyIsImZpbmREaXJlY3Rpb25TZXR0aW5nIiwiZGlyIiwiZmluZEFsaWduU2V0dGluZyIsImFsaWduIiwiZXh0ZW5kIiwiY29iaiIsInAiLCJpc0lFOCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImJhc2VPYmoiLCJlbnVtZXJhYmxlIiwiaGFzQmVlblJlc2V0IiwiX2lkIiwiX3BhdXNlT25FeGl0IiwiX3N0YXJ0VGltZSIsIl9lbmRUaW1lIiwiX3RleHQiLCJfcmVnaW9uIiwiX3ZlcnRpY2FsIiwiX3NuYXBUb0xpbmVzIiwiX2xpbmUiLCJfbGluZUFsaWduIiwiX3Bvc2l0aW9uIiwiX3Bvc2l0aW9uQWxpZ24iLCJfc2l6ZSIsIl9hbGlnbiIsImRlZmluZVByb3BlcnR5Iiwic2V0IiwiVHlwZUVycm9yIiwic2V0dGluZyIsIlN5bnRheEVycm9yIiwiZGlzcGxheVN0YXRlIiwiZ2V0Q3VlQXNIVE1MIiwiY29udmVydEN1ZVRvRE9NVHJlZSIsIkxhJCIsInNlbGVjdG9yT3JFbGVtZW50IiwicmV0dXJuTm9kZSIsIiRlbGVtZW50Iiwibm9kZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlcnkiLCJpc0VsZW1lbnQiLCJmaW5kIiwiY3NzIiwic3R5bGUiLCJhZGRDbGFzcyIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZXMiLCJyZW1vdmVDbGFzcyIsInJlbW92ZUF0dHJpYnV0ZSIsImF0dHJOYW1lIiwic2hvdyIsImRpc3BsYXkiLCJoaWRlIiwiYXBwZW5kIiwiaHRtbENvZGUiLCJpbm5lckhUTUwiLCJ0ZXh0Q29udGVudCIsImh0bWwiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiaXMiLCIkdGFyZ2V0RWxlbWVudCIsIm9mZnNldCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJib2R5Iiwic2Nyb2xsVG9wIiwibGVmdCIsInNjcm9sbExlZnQiLCJjbGllbnRXaWR0aCIsImhlaWdodCIsImNsaWVudEhlaWdodCIsImF0dHIiLCJnZXRBdHRyaWJ1dGUiLCJyZXBsYWNlV2l0aCIsImFwcGVuZENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJoYXNDaGlsZE5vZGVzIiwiZmlyc3RDaGlsZCIsImNsb3Nlc3QiLCJzZWxlY3RvclN0cmluZyIsImNsb3Nlc3RFbGVtZW50IiwibG9nZ2VyIiwicHJldkNvbnNvbGVMb2ciLCJlbmFibGUiLCJuYXR1cmFsSG1zIiwiaG1zVG9TZWNvbmQiLCJzdHJpbmciLCJleHRyYWN0RXh0ZW5zaW9uIiwicGF0aCIsImdldEF6dXJlRmlsZUZvcm1hdCIsImV4dGVuc2lvbiIsImF6dXJlZEZvcm1hdCIsImxhc3RJbmRleE9mIiwic2Vjb25kIiwic2VjTnVtIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiZnJhbWVSYXRlIiwiYXJyTGVuZ3RoIiwic2VjIiwic2VjSW5kZXgiLCJzZWxmIiwiU3ltYm9sIiwiX3dyYXBwZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiVkVSU0lPTiIsInYiLCJ5IiwiaXRlcmF0ZWUiLCJpZGVudGl0eSIsImlzRnVuY3Rpb24iLCJpc09iamVjdCIsIm1hdGNoZXIiLCJnIiwibWF4IiwibSIsIngiLCJwb3ciLCJBIiwiZWFjaCIsImNvbGxlY3QiLCJPIiwiZm9sZGwiLCJpbmplY3QiLCJyZWR1Y2VSaWdodCIsImZvbGRyIiwiZGV0ZWN0IiwiZmluZEtleSIsInNlbGVjdCIsInJlamVjdCIsIm5lZ2F0ZSIsImFueSIsImluY2x1ZGVzIiwiaW5jbHVkZSIsInZhbHVlcyIsImludm9rZSIsInBsdWNrIiwid2hlcmUiLCJtaW4iLCJzaHVmZmxlIiwic2FtcGxlIiwicmFuZG9tIiwic29ydEJ5IiwiY3JpdGVyaWEiLCJncm91cEJ5IiwiaW5kZXhCeSIsImNvdW50QnkiLCJTIiwidG9BcnJheSIsImlzU3RyaW5nIiwic2l6ZSIsInBhcnRpdGlvbiIsImZpcnN0IiwiaGVhZCIsInRha2UiLCJpbml0aWFsIiwibGFzdCIsInJlc3QiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJCb29sZWFuIiwiTSIsImlzQXJndW1lbnRzIiwiZmxhdHRlbiIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzQm9vbGVhbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwidW56aXAiLCJ6aXAiLCJGIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwiRSIsInJhbmdlIiwiY2VpbCIsImNodW5rIiwiTiIsImJpbmQiLCJwYXJ0aWFsIiwicGxhY2Vob2xkZXIiLCJiaW5kQWxsIiwibWVtb2l6ZSIsImNhY2hlIiwiZGVsYXkiLCJzZXRUaW1lb3V0IiwiZGVmZXIiLCJ0aHJvdHRsZSIsImxlYWRpbmciLCJub3ciLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsImNhbmNlbCIsImRlYm91bmNlIiwid3JhcCIsImNvbXBvc2UiLCJhZnRlciIsImJlZm9yZSIsInJlc3RBcmd1bWVudHMiLCJJIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJUIiwiQiIsImFsbEtleXMiLCJtYXBPYmplY3QiLCJwYWlycyIsImludmVydCIsImZ1bmN0aW9ucyIsIm1ldGhvZHMiLCJSIiwiZXh0ZW5kT3duIiwiYXNzaWduIiwicSIsIksiLCJ6Iiwib21pdCIsIlN0cmluZyIsImRlZmF1bHRzIiwidGFwIiwiaXNNYXRjaCIsInZhbHVlT2YiLCJwb3AiLCJpc0VxdWFsIiwiaXNFbXB0eSIsIkQiLCJjaGlsZE5vZGVzIiwiSW50OEFycmF5IiwiaXNGaW5pdGUiLCJpc1N5bWJvbCIsImlzTnVsbCIsImlzVW5kZWZpbmVkIiwiaGFzIiwibm9Db25mbGljdCIsImNvbnN0YW50Iiwibm9vcCIsInByb3BlcnR5T2YiLCJtYXRjaGVzIiwidGltZXMiLCJMIiwiUCIsIlciLCJ1bmVzY2FwZSIsIkMiLCJ1bmlxdWVJZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwiSiIsIlUiLCJWIiwiJCIsInRlbXBsYXRlIiwidmFyaWFibGUiLCJGdW5jdGlvbiIsImNoYWluIiwiX2NoYWluIiwiRyIsIm1peGluIiwidG9KU09OIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0Rhc2giLCJnZXRTY3JpcHRQYXRoIiwic2NyaXB0TmFtZSIsInNjcmlwdHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInNyYyIsIl9fVkVSU0lPTl9fIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0EsaURBQXlDLDBrQkFBMGtCO0FBQ25uQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EseUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBd0Isa0NBQWtDO0FBQzFELGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FB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QUlyTCxXQUFKLENBQWdCLE1BQU1rTCxVQUF0QixDQUFkO0FBQ0EsZ0JBQUl4dEIsU0FBUyxDQUFiLEVBQWdCO0FBQ1osdUJBQU8ydEIsSUFBSTlxQixNQUFKLENBQVcsQ0FBWCxFQUFjN0MsUUFBUSxDQUF0QixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsV0FBTyxFQUFQO0FBQ0gsQ0FaTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0pQOzs7QUFHTyxJQUFNNUYsNEJBQVV3ekIsbUJBQWhCLEMiLCJmaWxlIjoib3ZlbnBsYXllci5zZGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXIuc2RrXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiLFwidnR0cGFyc2VyXCI6XCJ2dHRwYXJzZXJcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknKTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzXCIpO1xuIiwiLyogZ2xvYmFscyBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXyAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19hbWRfb3B0aW9uc19fO1xyXG4iLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoIChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuIiwiaW1wb3J0IENhcHRpb25NYW5hZ2VyIGZyb20gXCJhcGkvY2FwdGlvbi9NYW5hZ2VyXCI7XHJcbmltcG9ydCBDb25maWd1cmF0b3IgZnJvbSBcImFwaS9Db25maWd1cmF0b3JcIjtcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgTGF6eUNvbW1hbmRFeGVjdXRvciBmcm9tIFwiYXBpL0xhenlDb21tYW5kRXhlY3V0b3JcIjtcclxuaW1wb3J0IExvZ01hbmFnZXIgZnJvbSBcInV0aWxzL2xvZ2dlclwiO1xyXG5pbXBvcnQgUGxheWxpc3RNYW5hZ2VyIGZyb20gXCJhcGkvcGxheWxpc3QvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXJDb250cm9sbGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvQ29udHJvbGxlclwiO1xyXG5pbXBvcnQge1JFQURZLCBFUlJPUiwgSU5JVF9FUlJPUiwgREVTVFJPWSwgTkVUV09SS19VTlNUQUJMRUQsIFBMQVlFUl9GSUxFX0VSUk9SLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAndmVyc2lvbic7XHJcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgb2JqZWN0IGNvbm5lY3RzIFVJIHRvIHRoZSBwcm92aWRlci5cclxuICogQHBhcmFtICAge29iamVjdH0gICAgY29udGFpbmVyICBkb20gZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuY29uc3QgQXBpID0gZnVuY3Rpb24oY29udGFpbmVyKXtcclxuICAgIGxldCBsb2dNYW5hZ2VyID0gTG9nTWFuYWdlcigpO1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltbT3ZlblBsYXllcl1dIHYuXCIrIHZlcnNpb24pO1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIGxvYWRlZC5cIik7XHJcbiAgICBsZXQgY2FwdGlvbk1hbmFnZXIgPSBDYXB0aW9uTWFuYWdlcih0aGF0KTtcclxuICAgIGxldCBwbGF5bGlzdE1hbmFnZXIgPSBQbGF5bGlzdE1hbmFnZXIoKTtcclxuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcclxuICAgIGxldCBjdXJyZW50UHJvdmlkZXIgPSBcIlwiO1xyXG4gICAgbGV0IHBsYXllckNvbmZpZyA9IFwiXCI7XHJcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcclxuXHJcbiAgICBjb25zdCBpbml0UHJvdmlkZXIgPSBmdW5jdGlvbihsYXN0UGxheVBvc2l0aW9uKXtcclxuICAgICAgICBjb25zdCBwaWNrUXVhbGl0eUZyb21Tb3VyY2UgPSAoc291cmNlcykgPT57XHJcbiAgICAgICAgICAgIHZhciBxdWFsaXR5ID0gMDtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBxdWFsaXR5O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBwcm92aWRlckNvbnRyb2xsZXIubG9hZFByb3ZpZGVycyhwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U291cmNlSW5kZXggPSBwaWNrUXVhbGl0eUZyb21Tb3VyY2UocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coIFwiY3VycmVudCBzb3VyY2UgaW5kZXggOiBcIisgY3VycmVudFNvdXJjZUluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIC8vQ2FsbCBQcm92aWRlci5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyLmdldE5hbWUoKSA9PT0gUFJPVklERVJfUlRNUCl7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHByb3ZpZGVyIHR5cGUgaXMgUlRNUCwgd2UgYWNjZXB0cyBSdG1wRXhwYW5zaW9uLlxyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGF0LCBBcGlSdG1wRXhwYW5zaW9uKGN1cnJlbnRQcm92aWRlcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1RoaXMgcGFzc2VzIHRoZSBldmVudCBjcmVhdGVkIGJ5IHRoZSBQcm92aWRlciB0byBBUEkuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5vbihcImFsbFwiLCBmdW5jdGlvbihuYW1lLCBkYXRhKXtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIobmFtZSwgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9BdXRvIG5leHQgc291cmNlIHdoZW4gcGxheWVyIGxvYWQgd2FzIGZhaWwgYnkgYW1pc3Mgc291cmNlLlxyXG4gICAgICAgICAgICAgICAgLy9kYXRhLmNvZGUgPT09IFBMQVlFUl9GSUxFX0VSUk9SXHJcbiAgICAgICAgICAgICAgICBpZiggKG5hbWUgPT09IEVSUk9SICYmIChwYXJzZUludChkYXRhLmNvZGUvMTAwKSA9PT0gMyB8fCBwYXJzZUludChkYXRhLmNvZGUvMTAwKSA9PT0gNSkpfHwgbmFtZSA9PT0gTkVUV09SS19VTlNUQUJMRUQgKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFNvdXJjZUluZGV4ID0gdGhhdC5nZXRDdXJyZW50U291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY3VycmVudFNvdXJjZUluZGV4KzEgPCB0aGF0LmdldFNvdXJjZXMoKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMgc2VxdWVudGlhbCBoYXMgYXZhaWxhYmxlIHNvdXJjZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXVzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50U291cmNlKGN1cnJlbnRTb3VyY2VJbmRleCsxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KS50aGVuKCgpPT57XHJcblxyXG4gICAgICAgICAgICAvL3Byb3ZpZGVyJ3MgcHJlbG9hZCgpIGhhdmUgdG8gbWFkZSBQcm9taXNlLiBDdXogaXQgb3ZlcmNvbWVzICdmbGFzaCBsb2FkaW5nIHRpbWluZyBwcm9ibGVtJy5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnByZWxvYWQocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCksIGxhc3RQbGF5UG9zaXRpb24gKS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZmx1c2goKTtcclxuICAgICAgICAgICAgICAgIC8vVGhpcyBpcyBubyByZWFzb24gdG8gZXhpc3QgYW55bW9yZS5cclxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFJFQURZKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvck9iamVjdCA9IHtjb2RlIDogSU5JVF9FUlJPUiwgcmVhc29uIDogXCJpbml0IGVycm9yLlwiLCBtZXNzYWdlIDogXCJQbGF5ZXIgaW5pdCBlcnJvci5cIiwgZXJyb3IgOiBlcnJvcn07XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIGVycm9yT2JqZWN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yT2JqZWN0ID0ge2NvZGUgOiBJTklUX0VSUk9SLCByZWFzb24gOiBcImluaXQgZXJyb3IuXCIsIG1lc3NhZ2UgOiBcIlBsYXllciBpbml0IGVycm9yLlwiLCBlcnJvciA6IGVycm9yfTtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBlcnJvck9iamVjdCk7XHJcblxyXG4gICAgICAgICAgICAvL3h4eCA6IElmIHlvdSBpbml0IGVtcHR5IHNvdXJjZXMuIChJIHRoaW5rIHRoaXMgaXMgc3RyYW5nZSBjYXNlLilcclxuICAgICAgICAgICAgLy9UaGlzIHdvcmtzIGZvciB0aGlzIGNhc2UuXHJcbiAgICAgICAgICAgIC8vcGxheWVyID0gT3ZlblBsYXllci5jcmVhdGUoXCJlbElkXCIsIHt9KTtcclxuICAgICAgICAgICAgLy9wbGF5ZXIubG9hZChzb3J1Y2VzKTtcclxuICAgICAgICAgICAgbGF6eVF1ZXVlLm9mZigpO1xyXG4gICAgICAgICAgICAvL2xhenlRdWV1ZS5yZW1vdmVBbmRFeGN1dGVPbmNlKFwibG9hZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIOy0iOq4sO2ZlCDtlajsiJhcclxuICAgICAqIGluaXRcclxuICAgICAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgcGxheWVyIGluaXRpYWwgb3B0aW9uIHZhbHVlLlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqKi9cclxuICAgIHRoYXQuaW5pdCA9IChvcHRpb25zKSA9PntcclxuICAgICAgICAvL0l0IGNvbGxlY3RzIHRoZSBjb21tYW5kcyBhbmQgZXhlY3V0ZXMgdGhlbSBhdCB0aGUgdGltZSB3aGVuIHRoZXkgYXJlIGV4ZWN1dGFibGUuXHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbXHJcbiAgICAgICAgICAgICdsb2FkJywncGxheScsJ3BhdXNlJywnc2VlaycsJ3N0b3AnLCAnZ2V0RHVyYXRpb24nLCAnZ2V0UG9zaXRpb24nLCAnZ2V0Vm9sdW1lJ1xyXG4gICAgICAgICAgICAsICdnZXRNdXRlJywgJ2dldEJ1ZmZlcicsICdnZXRTdGF0ZScgLCAnZ2V0UXVhbGl0eUxldmVscydcclxuICAgICAgICBdKTtcclxuICAgICAgICBwbGF5ZXJDb25maWcgPSBDb25maWd1cmF0b3Iob3B0aW9ucyk7XHJcbiAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0RlYnVnKCkpe1xyXG4gICAgICAgICAgICBsb2dNYW5hZ2VyLmRpc2FibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpXCIpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBjb25maWcgOiBcIiwgcGxheWVyQ29uZmlnKTtcclxuXHJcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldFBsYXlsaXN0KHBsYXllckNvbmZpZy5nZXRQbGF5bGlzdCgpKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgc291cmNlcyA6IFwiICwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xyXG4gICAgICAgIGluaXRQcm92aWRlcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKnRoYXQuZ2V0Q29udGFpbmVySWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyLmlkO1xyXG4gICAgfTsqL1xyXG5cclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENvbmZpZygpXCIsIHBsYXllckNvbmZpZy5nZXRDb25maWcoKSk7XHJcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRDb25maWcoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFRpbWVjb2RlTW9kZSA9IChpc1Nob3cpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFRpbWVjb2RlTW9kZSgpXCIsIGlzU2hvdyk7XHJcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5zZXRUaW1lY29kZU1vZGUoaXNTaG93KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGlzVGltZWNvZGVNb2RlKClcIik7XHJcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5pc1RpbWVjb2RlTW9kZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEZyYW1lcmF0ZSgpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRGcmFtZXJhdGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRGcmFtZXJhdGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEZyYW1lcmF0ZSA9IChmcmFtZXJhdGUpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRGcmFtZXJhdGUoKVwiLCBmcmFtZXJhdGUpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0RnJhbWVyYXRlKGZyYW1lcmF0ZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrRnJhbWUoKVwiLCBmcmFtZUNvdW50KTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNlZWtGcmFtZShmcmFtZUNvdW50KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RHVyYXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQb3NpdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRWb2x1bWUoKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRWb2x1bWUoKSBcIiArIHZvbHVtZSk7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldFZvbHVtZSh2b2x1bWUpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0TXV0ZSgpIFwiICsgc3RhdGUpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0TXV0ZShzdGF0ZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0TXV0ZSgpIFwiICsgY3VycmVudFByb3ZpZGVyLmdldE11dGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5sb2FkID0gKHBsYXlsaXN0KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogbG9hZCgpIFwiLCBwbGF5bGlzdCk7XHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcclxuXHJcbiAgICAgICAgaWYocGxheWxpc3Qpe1xyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5zZXRQbGF5bGlzdChwbGF5bGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGxheSgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGxheSgpO1xyXG4gICAgfVxyXG4gICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBhdXNlKCkgXCIpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wYXVzZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2VlaygpIFwiKyBwb3NpdGlvbik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNlZWsocG9zaXRpb24pO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRQbGF5YmFja1JhdGUoKSBcIiwgcGxheWJhY2tSYXRlKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldFBsYXliYWNrUmF0ZShwbGF5ZXJDb25maWcuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZShwbGF5YmFja1JhdGUpKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWJhY2tSYXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U291cmNlcygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRTb3VyY2UoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKHNvdXJjZUluZGV4KSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRTb3VyY2UoKSBcIiwgc291cmNlSW5kZXgpO1xyXG5cclxuICAgICAgICBsZXQgc291cmNlcyA9IGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW2N1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCldO1xyXG4gICAgICAgIGxldCBuZXdTb3VyY2UgPSBzb3VyY2VzW3NvdXJjZUluZGV4XTtcclxuICAgICAgICBsZXQgbGFzdFBsYXlQb3NpdGlvbiA9IGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBpc1NhbWVQcm92aWRlciA9IHByb3ZpZGVyQ29udHJvbGxlci5pc1NhbWVQcm92aWRlcihjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpO1xyXG4gICAgICAgIC8vIHByb3ZpZGVyLnNlckN1cnJlbnRRdWFsaXR5IC0+IHBsYXllckNvbmZpZyBzZXR0aW5nIC0+IGxvYWRcclxuICAgICAgICBsZXQgcmVzdWx0U291cmNlSW5kZXggPSBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFNvdXJjZShzb3VyY2VJbmRleCwgaXNTYW1lUHJvdmlkZXIpO1xyXG5cclxuICAgICAgICBpZighbmV3U291cmNlKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIGlzU2FtZVByb3ZpZGVyXCIsIGlzU2FtZVByb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgaWYoIWlzU2FtZVByb3ZpZGVyKXtcclxuICAgICAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknXSk7XHJcbiAgICAgICAgICAgIGluaXRQcm92aWRlcihsYXN0UGxheVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHRTb3VyY2VJbmRleDtcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFF1YWxpdHlMZXZlbHMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBxdWFsaXR5SW5kZXgpO1xyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KHF1YWxpdHlJbmRleCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaXNBdXRvUXVhbGl0eSgpXCIpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuaXNBdXRvUXVhbGl0eSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRBdXRvUXVhbGl0eSgpIFwiLCBpc0F1dG8pO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0QXV0b1F1YWxpdHkoaXNBdXRvKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENhcHRpb25MaXN0KCkgXCIsIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCkpO1xyXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xyXG4gICAgfVxyXG4gICAgdGhhdC5nZXRDdXJyZW50Q2FwdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50Q2FwdGlvbigpIFwiLCBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q3VycmVudENhcHRpb24oKTtcclxuICAgIH1cclxuICAgIHRoYXQuc2V0Q3VycmVudENhcHRpb24gPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50Q2FwdGlvbigpIFwiLCBpbmRleCk7XHJcbiAgICAgICAgY2FwdGlvbk1hbmFnZXIuc2V0Q3VycmVudENhcHRpb24oaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogYWRkQ2FwdGlvbigpIFwiKVxyXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5hZGRDYXB0aW9uKHRyYWNrKTtcclxuICAgIH1cclxuICAgIHRoYXQucmVtb3ZlQ2FwdGlvbiA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZUNhcHRpb24oKSBcIiwgaW5kZXgpXHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLnJlbW92ZUNhcHRpb24oaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0QnVmZmVyKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKSk7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTdGF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc3RvcCA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHN0b3AoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnN0b3AoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIFwiKTtcclxuICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xyXG4gICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3ZpZGVyQ29udHJvbGxlciA9IG51bGw7XHJcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBwbGF5ZXJDb25maWcgPSBudWxsO1xyXG4gICAgICAgIGxhenlRdWV1ZSA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoYXQudHJpZ2dlcihERVNUUk9ZKTtcclxuICAgICAgICB0aGF0Lm9mZigpO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSAtIGxhenlRdWV1ZSwgY3VycmVudFByb3ZpZGVyLCBwcm92aWRlckNvbnRyb2xsZXIsIHBsYXlsaXN0TWFuYWdlciwgcGxheWVyQ29uZmlnLCBhcGkgZXZlbnQgZGVzdHJvZWQuIFwiKTtcclxuICAgICAgICBsb2dNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICBsb2dNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBPdmVuUGxheWVyU0RLLnJlbW92ZVBsYXllcih0aGF0LmdldENvbnRhaW5lcklkKCkpO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcGk7XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwaVJ0bXBFeHBhbnNpb24gPSBmdW5jdGlvbihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBleHRlcm5hbENhbGxiYWNrQ3JlZXAgOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5uYW1lICYmIHJlc3VsdC5kYXRhKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsKHJlc3VsdC5uYW1lLCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgaW5pdGlhbGl6ZXMgdGhlIGlucHV0IG9wdGlvbnMuXHJcbiAqIEBwYXJhbSAgIG9wdGlvbnNcclxuICpcclxuICogKi9cclxuY29uc3QgQ29uZmlndXJhdG9yID0gZnVuY3Rpb24ob3B0aW9ucyl7XHJcblxyXG4gICAgY29uc3QgY29tcG9zZVNvdXJjZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKXtcclxuICAgICAgICBjb25zdCBEZWZhdWx0cyA9IHtcclxuICAgICAgICAgICAgZGVmYXVsdFBsYXliYWNrUmF0ZTogMSxcclxuICAgICAgICAgICAgcGxheWJhY2tSYXRlQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzOiBbMC4yNSwgMC41LCAxLCAxLjUsIDJdLFxyXG4gICAgICAgICAgICBtdXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgdm9sdW1lOiA5MFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJjYXNlVmFsID0gdmFsLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIodmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2lkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHNlcmlhbGl6ZShvcHRpb25zW2tleV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplU2l6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbC5zbGljZSAmJiB2YWwuc2xpY2UoLTIpID09PSAncHgnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWwuc2xpY2UoMCwgLTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGV2YWx1YXRlQXNwZWN0UmF0aW8gPSBmdW5jdGlvbiAoYXIsIHdpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aWR0aC50b1N0cmluZygpLmluZGV4T2YoJyUnKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXIgIT09ICdzdHJpbmcnIHx8ICFhcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKC9eXFxkKlxcLj9cXGQrJSQvLnRlc3QoYXIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhci5pbmRleE9mKCc6Jyk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHcgPSBwYXJzZUZsb2F0KGFyLnN1YnN0cigwLCBpbmRleCkpO1xyXG4gICAgICAgICAgICBjb25zdCBoID0gcGFyc2VGbG9hdChhci5zdWJzdHIoaW5kZXggKyAxKSk7XHJcbiAgICAgICAgICAgIGlmICh3IDw9IDAgfHwgaCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKGggLyB3ICogMTAwKSArICclJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVzZXJpYWxpemUob3B0aW9ucyk7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgbGV0IHJhdGVDb250cm9scyA9IGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scztcclxuICAgICAgICBpZiAocmF0ZUNvbnRyb2xzKSB7XHJcbiAgICAgICAgICAgIGxldCByYXRlcyA9IGNvbmZpZy5wbGF5YmFja1JhdGVzO1xyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmF0ZUNvbnRyb2xzKSkge1xyXG4gICAgICAgICAgICAgICAgcmF0ZXMgPSByYXRlQ29udHJvbHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmF0ZXMgPSByYXRlcy5maWx0ZXIocmF0ZSA9PiBfLmlzTnVtYmVyKHJhdGUpICYmIHJhdGUgPj0gMC4yNSAmJiByYXRlIDw9IDQpXHJcbiAgICAgICAgICAgICAgICAubWFwKHJhdGUgPT4gTWF0aC5yb3VuZChyYXRlICogNCkgLyA0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyYXRlcy5pbmRleE9mKDEpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmF0ZXMucHVzaCgxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByYXRlcy5zb3J0KCk7XHJcblxyXG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlcyA9IHJhdGVzO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICghY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzIHx8IGNvbmZpZy5wbGF5YmFja1JhdGVzLmluZGV4T2YoY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUpIDwgMCkge1xyXG4gICAgICAgICAgICBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25maWcucGxheWJhY2tSYXRlID0gY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGU7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZpZ1BsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0O1xyXG4gICAgICAgIGlmICghY29uZmlnUGxheWxpc3QpIHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqID0gXy5waWNrKGNvbmZpZywgW1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICAgICAgICAndHlwZScsXHJcbiAgICAgICAgICAgICAgICAnbWVkaWFpZCcsXHJcbiAgICAgICAgICAgICAgICAnaW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgJ3NvdXJjZXMnLFxyXG4gICAgICAgICAgICAgICAgJ3RyYWNrcycsXHJcbiAgICAgICAgICAgICAgICAncHJlbG9hZCcsXHJcbiAgICAgICAgICAgICAgICAnZHVyYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ2hvc3QnLFxyXG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyxcclxuICAgICAgICAgICAgICAgICdzdHJlYW0nXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gWyBvYmogXTtcclxuICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShjb25maWdQbGF5bGlzdC5wbGF5bGlzdCkpIHtcclxuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5kdXJhdGlvbjtcclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNvbmZpZ3VyYXRvciBsb2FkZWQuXCIsIG9wdGlvbnMpO1xyXG4gICAgbGV0IGNvbmZpZyA9IGNvbXBvc2VTb3VyY2VPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIGxldCBkZWJ1ZyA9IGNvbmZpZy5kZWJ1ZztcclxuICAgIGxldCBkZWZhdWx0UGxheWJhY2tSYXRlID0gY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgfHwgMTtcclxuICAgIGxldCBpbWFnZSA9IGNvbmZpZy5pbWFnZTtcclxuICAgIGxldCBwbGF5YmFja1JhdGVDb250cm9scyA9IGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyB8fCB0cnVlO1xyXG4gICAgbGV0IHBsYXliYWNrUmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcyB8fCBbMC41LCAxLCAxLjI1LCAxLjUsIDJdO1xyXG4gICAgbGV0IHBsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0IHx8IFtdO1xyXG4gICAgbGV0IHF1YWxpdHlMYWJlbCA9IGNvbmZpZy5xdWFsaXR5TGFiZWwgfHwgXCJcIjtcclxuICAgIGxldCBzb3VyY2VMYWJlbCA9IGNvbmZpZy5zb3VyY2VMYWJlbCB8fCBcIlwiO1xyXG4gICAgbGV0IHJlcGVhdCA9IGNvbmZpZy5yZXBlYXQgfHwgZmFsc2U7XHJcbiAgICBsZXQgc3RyZXRjaGluZyA9IGNvbmZpZy5zdHJldGNoaW5nIHx8ICd1bmlmb3JtJztcclxuICAgIGxldCBpc1RpbWVjb2RlTW9kZSA9IGNvbmZpZy5pc1RpbWVjb2RlTW9kZSB8fCB0cnVlO1xyXG5cclxuXHJcblxyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7cmV0dXJuIGNvbmZpZzt9O1xyXG5cclxuICAgIHRoYXQuaXNEZWJ1ZyA9KCk9PntyZXR1cm4gZGVidWc7fTtcclxuXHJcbiAgICB0aGF0LmdldERlZmF1bHRQbGF5YmFja1JhdGUgPSgpPT57cmV0dXJuIGRlZmF1bHRQbGF5YmFja1JhdGU7fTtcclxuICAgIHRoYXQuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KHBsYXliYWNrUmF0ZSk9PntkZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlOyByZXR1cm4gcGxheWJhY2tSYXRlO307XHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGFiZWwgPSAoKSA9PiB7cmV0dXJuIHF1YWxpdHlMYWJlbDt9O1xyXG4gICAgdGhhdC5zZXRRdWFsaXR5TGFiZWwgPSAobmV3TGFiZWwpID0+IHtxdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDt9O1xyXG5cclxuICAgIHRoYXQuZ2V0U291cmNlTGFiZWwgPSAoKSA9PiB7cmV0dXJuIHNvdXJjZUxhYmVsO307XHJcbiAgICB0aGF0LnNldFNvdXJjZUxhYmVsID0gKG5ld0xhYmVsKSA9PiB7c291cmNlTGFiZWwgPSBuZXdMYWJlbDt9O1xyXG5cclxuICAgIHRoYXQuc2V0VGltZWNvZGVNb2RlID0gKGlzU2hvdykgPT4ge1xyXG4gICAgICAgIGlzVGltZWNvZGVNb2RlID0gaXNTaG93O1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNUaW1lY29kZU1vZGUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGlzVGltZWNvZGVNb2RlO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGVzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVzO307XHJcbiAgICB0aGF0LmlzUGxheWJhY2tSYXRlQ29udHJvbHMgPSgpPT57cmV0dXJuIHBsYXliYWNrUmF0ZUNvbnRyb2xzO307XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9KCk9PntyZXR1cm4gcGxheWxpc3Q7fTtcclxuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdF8gKT0+e1xyXG4gICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdF8pKXtcclxuICAgICAgICAgICAgcGxheWxpc3QgPSBwbGF5bGlzdF87XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHBsYXlsaXN0ID0gW3BsYXlsaXN0X107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwbGF5bGlzdDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc1JlcGVhdCA9KCk9PntyZXR1cm4gcmVwZWF0O307XHJcblxyXG4gICAgdGhhdC5nZXRTdHJldGNoaW5nID0oKT0+e3JldHVybiBzdHJldGNoaW5nO307XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWd1cmF0b3I7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMy4uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbW9kdWxlIHByb3ZpZGUgY3VzdG9tIGV2ZW50cy5cclxuICogQHBhcmFtICAgb2JqZWN0ICAgIEFuIG9iamVjdCB0aGF0IHJlcXVpcmVzIGN1c3RvbSBldmVudHMuXHJcbiAqXHJcbiAqICovXHJcblxyXG5jb25zdCBFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbihvYmplY3Qpe1xyXG4gICAgbGV0IHRoYXQgPSBvYmplY3Q7XHJcbiAgICBsZXQgX2V2ZW50cyA9W107XHJcblxyXG4gICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgY29udGV4dCl7XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBldmVudHMubGVuZ3RoO1xyXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGxldCBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgZXZlbnQubGlzdGVuZXIuYXBwbHkoICggZXZlbnQuY29udGV4dCB8fCBjb250ZXh0ICksIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcclxuICAgICAgICAoX2V2ZW50c1tuYW1lXSB8fCAoX2V2ZW50c1tuYW1lXT1bXSkgKS5wdXNoKHsgbGlzdGVuZXI6IGxpc3RlbmVyICAsIGNvbnRleHQgOiBjb250ZXh0fSk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSl7XHJcbiAgICAgICAgaWYoIV9ldmVudHMpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcbiAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcclxuICAgICAgICBjb25zdCBhbGxFdmVudHMgPSBfZXZlbnRzLmFsbDtcclxuXHJcbiAgICAgICAgaWYoZXZlbnRzKXtcclxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MsIHRoYXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhbGxFdmVudHMpe1xyXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzLCB0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XHJcbiAgICAgICAgaWYoIV9ldmVudHMpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIW5hbWUgJiYgIWxpc3RlbmVyICYmICFjb250ZXh0KSAge1xyXG4gICAgICAgICAgICBfZXZlbnRzID0gW107XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogT2JqZWN0LmtleXMoX2V2ZW50cyk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmV0YWluID0gX2V2ZW50c1tuYW1lXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyICB8fCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIubGlzdGVuZXIgICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5fbGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2ZW50LmNvbnRleHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9ldmVudHNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5vbmNlID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgY29uc3Qgb25jZUNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudCsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5vZmYobmFtZSwgb25jZUNhbGxiYWNrKTtcclxuICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9uY2VDYWxsYmFjay5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICByZXR1cm4gdGhhdC5vbihuYW1lLCBvbmNlQ2FsbGJhY2ssIGNvbnRleHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXZlbnRFbWl0dGVyO1xyXG4iLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcbiAqICovXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XG4gICAgfVxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XG4gICAgfVxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICB9XG5cbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgIH07XG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxyXG4gKiBAcGFyYW1cclxuICogKi9cclxuXHJcbmNvbnN0IFN1cHBvcnRDaGVja2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XHJcbiAgICBjb25zdCBzdXBwb3J0TGlzdCA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgTWltZVR5cGVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbXA0OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBmNHY6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbW92OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtcDM6ICdhdWRpby9tcGVnJyxcclxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2d2OiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ2c6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgdm9yYmlzOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICB3ZWJtOiAndmlkZW8vd2VibScsXHJcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcclxuICAgICAgICAgICAgICAgICAgICBtM3U4OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxyXG4gICAgICAgICAgICAgICAgICAgIG0zdTogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcclxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmKCF0eXBlKXtyZXR1cm4gZmFsc2U7fVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWltZVR5cGUgPSBzb3VyY2UubWltZVR5cGUgfHwgTWltZVR5cGVzW3R5cGVdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW1pbWVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnd2VicnRjJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbXBkIGFwcGxpY2F0aW9uL2Rhc2greG1sXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXNoKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2hscycsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy90aGlzIG1ldGhvZCBmcm9tIGhscy5qc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1lZGlhU291cmNlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlciA9IHdpbmRvdy5Tb3VyY2VCdWZmZXIgfHwgd2luZG93LldlYktpdFNvdXJjZUJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNUeXBlU3VwcG9ydGVkID0gbWVkaWFTb3VyY2UgJiYgdHlwZW9mIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUUsbXA0YS40MC4yXCInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgU291cmNlQnVmZmVyIGlzIGV4cG9zZWQgZW5zdXJlIGl0cyBBUEkgaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAvLyBzYWZhcmkgYW5kIG9sZCB2ZXJzaW9uIG9mIENocm9tZSBkb2Ugbm90IGV4cG9zZSBTb3VyY2VCdWZmZXIgZ2xvYmFsbHkgc28gY2hlY2tpbmcgU291cmNlQnVmZmVyLnByb3RvdHlwZSBpcyBpbXBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhaXNUeXBlU3VwcG9ydGVkICYmICEhc291cmNlQnVmZmVyVmFsaWRBUEk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzSGxzU3VwcG9ydCgpICYmICEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3J0bXAnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UgPSAoc29ydWNlXykgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKClcIiwgc29ydWNlXyk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHN1cHBvcnRMaXN0Lmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGlmKHN1cHBvcnRMaXN0W2ldLmNoZWNrU3VwcG9ydChzb3VyY2UpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0ID0gKHBsYXlsaXN0XykgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KClcIiwgcGxheWxpc3RfKTtcclxuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHBsYXlsaXN0Xy5sZW5ndGg7IGktLTspIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHBsYXlsaXN0X1tpXTtcclxuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBpdGVtLnNvdXJjZXMubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIHNvdXJjZSA9IGl0ZW0uc291cmNlc1tqXTtcclxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnROYW1lcztcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN1cHBvcnRDaGVja2VyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDQuLlxyXG4gKi9cclxuaW1wb3J0IGFqYXggZnJvbSBcInV0aWxzL2FqYXgubWluXCI7XHJcbmltcG9ydCBTcnRQYXJzZXIgZnJvbSBcImFwaS9jYXB0aW9uL3BhcnNlci9TcnRQYXJzZXJcIjtcclxuaW1wb3J0IFNhbWlQYXJzZXIgZnJvbSBcImFwaS9jYXB0aW9uL3BhcnNlci9TbWlQYXJzZXJcIjtcclxuaW1wb3J0IFZUVEN1ZSBmcm9tICd1dGlscy9jYXB0aW9ucy92dHRDdWUnO1xyXG5cclxuXHJcbmNvbnN0IExvYWRlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcblxyXG4gICAgLy9mb3IgdGVzdC4gZHN0X3R5cGUgOiB3ZWJ2dHQsIHNydCwgc2FtaVxyXG4gICAgbGV0IGNvbnZlcnRWVFRVcmwgPSBmdW5jdGlvbih0cmFja1VybCl7XHJcblxyXG4gICAgICAgIHJldHVybiBcImh0dHBzOi8vc3VidGl0bGVzLm92ZW5jbG91ZC5jb206ODQ1My92MS9zdWJ0aXRsZXM/dXJsPVwiK2VzY2FwZSh0cmFja1VybCkrXCImc3JjX3R5cGU9c3J0JmRzdF90eXBlPXdlYnZ0dCZmaWxlX25hbWU9b3ZlbnBsYXllcjIwMThcIjtcclxuICAgIH07XHJcbiAgICBsZXQgY29udmVydFRvVlRUQ3VlcyA9IGZ1bmN0aW9uIChjdWVzKSB7XHJcbiAgICAgICAgcmV0dXJuIGN1ZXMubWFwKGN1ZSA9PiBuZXcgVlRUQ3VlKGN1ZS5zdGFydCwgY3VlLmVuZCwgY3VlLnRleHQpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmxvYWQgPSAodHJhY2ssIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xyXG4gICAgICAgIGFqYXgoKS5nZXQodHJhY2suZmlsZSkudGhlbihmdW5jdGlvbihyZXNwb25zZSwgeGhyKXtcclxuICAgICAgICAgICAgbGV0IGN1ZXMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IHZ0dEN1ZXMgPSBbXTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQUpBWFwiKTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKHhocik7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2VUZXh0ID0geGhyLnJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZVRleHQuaW5kZXhPZignV0VCVlRUJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlZUVCBMT0FERURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZFZ0dFBhcnNlcigpLnRoZW4oV2ViVlRUID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBXZWJWVFQuUGFyc2VyKHdpbmRvdywgV2ViVlRULlN0cmluZ0RlY29kZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLm9uY3VlID0gZnVuY3Rpb24oY3VlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzLnB1c2goY3VlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLm9uZmx1c2ggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgY2FsbHMgb25mbHVzaCBpbnRlcm5hbGx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5wYXJzZShyZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlc3BvbnNlVGV4dC5pbmRleE9mKCdTQU1JJykgPj0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU0FNSSBMT0FERURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnNlZERhdGEgPSBTYW1pUGFyc2VyKHJlc3BvbnNlVGV4dCwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBjb252ZXJ0VG9WVFRDdWVzKHBhcnNlZERhdGEucmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTUlQgTE9BREVEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1ZXMgPSBTcnRQYXJzZXIocmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gY29udmVydFRvVlRUQ3VlcyhjdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcclxuICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5mdW5jdGlvbiBsb2FkVnR0UGFyc2VyKCkge1xyXG4gICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlciddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgIHJldHVybiByZXF1aXJlKCdhcGkvY2FwdGlvbi9wYXJzZXIvVnR0UGFyc2VyJykuZGVmYXVsdDtcclxuICAgIH0sIGZ1bmN0aW9uKGVycil7Y29uc29sZS5sb2coZXJyKTt9LCAndnR0cGFyc2VyJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvYWRlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAxNy4uXHJcbiAqL1xyXG5pbXBvcnQgQ2FwdGlvbkxvYWRlciBmcm9tICdhcGkvY2FwdGlvbi9Mb2FkZXInO1xyXG5pbXBvcnQge1JFQURZLCBFUlJPUiwgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIENPTlRFTlRfQ0FQVElPTl9DSEFOR0VELCBQTEFZRVJfQ0FQVElPTl9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbmNvbnN0IGlzU3VwcG9ydCA9IGZ1bmN0aW9uKGtpbmQpe1xyXG4gICAgcmV0dXJuIGtpbmQgPT09ICdzdWJ0aXRsZXMnIHx8IGtpbmQgPT09ICdjYXB0aW9ucyc7XHJcbn07XHJcblxyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oYXBpKXtcclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBsZXQgY2FwdGlvbkxpc3QgPSBbXTtcclxuICAgIGxldCBjdXJyZW50Q2FwdGlvbkluZGV4ID0gLTE7XHJcblxyXG4gICAgbGV0IGNhcHRpb25Mb2FkZXIgPSBDYXB0aW9uTG9hZGVyKCk7XHJcbiAgICBsZXQgaXNGaXNydExvYWQgPSB0cnVlO1xyXG4gICAgbGV0IGlzU2hvd2luZyA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDYXB0aW9uIE1hbmFnZXIgPj4gXCIpO1xyXG5cclxuXHJcbiAgICBsZXQgYmluZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHZ0dEN1ZXMpe1xyXG4gICAgICAgIHRyYWNrLmRhdGEgPSB2dHRDdWVzIHx8IFtdO1xyXG4gICAgICAgIHRyYWNrLm5hbWUgPSB0cmFjay5sYWJlbCB8fCB0cmFjay5uYW1lIHx8IHRyYWNrLmxhbmd1YWdlO1xyXG4gICAgICAgIHRyYWNrLmlkID0gKGZ1bmN0aW9uKHRyYWNrLCB0cmFja3NDb3VudCkge1xyXG4gICAgICAgICAgICB2YXIgdHJhY2tJZDtcclxuICAgICAgICAgICAgdmFyIHByZWZpeCA9IHRyYWNrLmtpbmQgfHwgJ2NjJztcclxuICAgICAgICAgICAgaWYgKHRyYWNrLmRlZmF1bHQgfHwgdHJhY2suZGVmYXVsdHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFja0lkID0gJ2RlZmF1bHQnO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyYWNrSWQgPSB0cmFjay5pZCB8fCAocHJlZml4ICsgdHJhY2tzQ291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGlzRmlzcnRMb2FkKXtcclxuICAgICAgICAgICAgICAgIC8vVGhpcyBleGVjdXRlIG9ubHkgb24uIGFuZCB0aGVuIHVzZSBmbHVzaENhcHRpb25MaXN0KGxhc3RDYXB0aW9uSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24oY2FwdGlvbkxpc3QubGVuZ3RofHwwKTtcclxuICAgICAgICAgICAgICAgIGlzRmlzcnRMb2FkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cmFja0lkO1xyXG4gICAgICAgIH0pKHRyYWNrLCBjYXB0aW9uTGlzdC5sZW5ndGgpO1xyXG5cclxuICAgICAgICBjYXB0aW9uTGlzdC5wdXNoKHRyYWNrKTtcclxuICAgICAgICByZXR1cm4gdHJhY2suaWQ7XHJcbiAgICB9O1xyXG4gICAgbGV0IGNoYW5nZUN1cnJlbnRDYXB0aW9uID0gZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIGN1cnJlbnRDYXB0aW9uSW5kZXggPSBpbmRleDtcclxuICAgICAgICBhcGkudHJpZ2dlcihDT05URU5UX0NBUFRJT05fQ0hBTkdFRCwgY3VycmVudENhcHRpb25JbmRleCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFwaS5vbihSRUFEWSwgZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3QgJiYgYXBpLmdldENvbmZpZygpLnBsYXlsaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3QgPSBhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3RbMF07XHJcbiAgICAgICAgICAgIGlmKHBsYXlsaXN0ICYmIHBsYXlsaXN0LnRyYWNrcyAmJiBwbGF5bGlzdC50cmFja3MubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3QudHJhY2tzLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhY2sgPSBwbGF5bGlzdC50cmFja3NbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNTdXBwb3J0KHRyYWNrLmtpbmQpICYmICEgXy5maW5kV2hlcmUodHJhY2ssIHtmaWxlIDogdHJhY2suZmlsZX0pKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbkxvYWRlci5sb2FkKHRyYWNrLCBmdW5jdGlvbih2dHRDdWVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZ0dEN1ZXMgJiYgdnR0Q3Vlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FwdGlvbklkID0gYmluZFRyYWNrKHRyYWNrLCB2dHRDdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoRVJST1IsIHtjb2RlIDogUExBWUVSX0NBUFRJT05fRVJST1IsIHJlYXNvbiA6IFwiY2FwdGlvbiBsb2FkIGVycm9yLlwiLCBtZXNzYWdlIDogXCJjYXB0aW9uIGxvYWQgZXJyb3IuXCIsIGVycm9yIDogZXJyb3J9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYXBpLm9uKENPTlRFTlRfVElNRSwgZnVuY3Rpb24obWV0YSl7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gbWV0YS5wb3NpdGlvbjtcclxuICAgICAgICBpZihjdXJyZW50Q2FwdGlvbkluZGV4ID4gLTEgJiYgY2FwdGlvbkxpc3RbY3VycmVudENhcHRpb25JbmRleF0pe1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudEN1ZXMgPSBfLmZpbHRlcihjYXB0aW9uTGlzdFtjdXJyZW50Q2FwdGlvbkluZGV4XS5kYXRhLCBmdW5jdGlvbiAoY3VlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24gPj0gKGN1ZS5zdGFydFRpbWUpICYmICggKCFjdWUuZW5kVGltZSB8fCBwb3NpdGlvbikgPD0gY3VlLmVuZFRpbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYoY3VycmVudEN1ZXMgJiYgY3VycmVudEN1ZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICBhcGkudHJpZ2dlcihDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIGN1cnJlbnRDdWVzWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICAgIHRoYXQuZmx1c2hDYXB0aW9uTGlzdCA9IChsYXN0Q2FwdGlvbkluZGV4KSA9PntcclxuICAgICAgICBjYXB0aW9uTGlzdCA9IFtdO1xyXG4gICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKGxhc3RDYXB0aW9uSW5kZXgpO1xyXG4gICAgICAgIC8vY3VycmVudENhcHRpb25JbmRleCA9IGxhc3RDYXB0aW9uSW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBjYXB0aW9uTGlzdHx8W107XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50Q2FwdGlvbiA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50Q2FwdGlvbkluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudENhcHRpb24gPSAoX2luZGV4KSA9PntcclxuICAgICAgICBpZihfaW5kZXggPiAtMiAmJiBfaW5kZXggPCBjYXB0aW9uTGlzdC5sZW5ndGgpe1xyXG4gICAgICAgICAgICBjaGFuZ2VDdXJyZW50Q2FwdGlvbihfaW5kZXgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PntcclxuICAgICAgICBpZihpc1N1cHBvcnQodHJhY2sua2luZCkgJiYgISBfLmZpbmRXaGVyZShjYXB0aW9uTG9hZGVyLCB7ZmlsZSA6IHRyYWNrLmZpbGV9KSl7XHJcbiAgICAgICAgICAgIGNhcHRpb25Mb2FkZXIubG9hZCh0cmFjaywgZnVuY3Rpb24odnR0Q3Vlcyl7XHJcbiAgICAgICAgICAgICAgICBpZih2dHRDdWVzICYmIHZ0dEN1ZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluZFRyYWNrKHRyYWNrLCB2dHRDdWVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoRVJST1IsIHtjb2RlIDogUExBWUVSX0NBUFRJT05fRVJST1IsIHJlYXNvbiA6IFwiY2FwdGlvbiBsb2FkIGVycm9yLlwiLCBtZXNzYWdlIDogXCJjYXB0aW9uIGxvYWQgZXJyb3IuXCIsIGVycm9yIDogZXJyb3J9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQucmVtb3ZlQ2FwdGlvbiA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmKGluZGV4ID4gLTEgJiYgaW5kZXggPCBjYXB0aW9uTGlzdC5sZW5ndGgpe1xyXG4gICAgICAgICAgICBjYXB0aW9uTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2FwdGlvbkxpc3Q7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJcclxuLypcclxuICogIHNhbWktcGFyc2VyXHJcbiAqICBUaGUgTUlUIExpY2Vuc2UgKE1JVClcclxuICpcclxuICogIENvcHlyaWdodCAoYykgMjAxMyBDb25zdGFudGluZSBLaW0gPGVsZWdhbnRjb2RlckBnbWFpbC5jb20+XHJcbiAqICBodHRwczovL2dpdGh1Yi5jb20vZWxlZ2FudGNvZGVyL3NhbWktcGFyc2VyXHJcbiAqXHJcbiAqL1xyXG5cclxuY29uc3QgbGFuZ0NvZGVzID0gW1wiYWJcIixcImFhXCIsXCJhZlwiLCBcImFrXCIsIFwic3FcIiwgXCJhbVwiLCBcImFyXCIsIFwiYW5cIiwgXCJoeVwiLCBcImFzXCIsIFwiYXZcIiwgXCJhZVwiLCBcImF5XCIsIFwiYXpcIiwgXCJibVwiLCBcImJhXCIsIFwiZXVcIiwgXCJiZVwiLCBcImJuXCIsIFwiYmhcIiwgXCJiaVwiLCBcIm5iXCIsXCJic1wiLFwiYnJcIixcImJnXCIsXCJteVwiLFwiZXNcIixcImNhXCIsXCJrbVwiLFwiY2hcIixcImNlXCIsXCJueVwiLFwibnlcIixcInpoXCIsXCJ6YVwiLFwiY3VcIixcImN1XCIsXCJjdlwiLFwia3dcIixcclxuICAgIFwiY29cIixcImNyXCIsXCJoclwiLFwiY3NcIixcImRhXCIsXCJkdlwiLFwiZHZcIixcIm5sXCIsXCJkelwiLFwiZW5cIixcImVvXCIsXCJldFwiLFwiZWVcIixcImZvXCIsXCJmalwiLFwiZmlcIixcIm5sXCIsXCJmclwiLFwiZmZcIixcImdkXCIsXCJnbFwiLFwibGdcIixcImthXCIsXCJkZVwiLFwia2lcIixcImVsXCIsXCJrbFwiLFwiZ25cIixcImd1XCIsXCJodFwiLFwiaHRcIixcImhhXCIsXCJoZVwiLFwiaHpcIixcImhpXCIsXCJob1wiLFwiaHVcIixcImlzXCIsXCJpb1wiLFwiaWdcIixcImlkXCIsXCJpYVwiLFwiaWVcIixcIml1XCIsXCJpa1wiLFwiZ2FcIixcclxuICAgIFwiaXRcIixcImphXCIsXCJqdlwiLFwia2xcIixcImtuXCIsXCJrclwiLFwia3NcIixcImtrXCIsXCJraVwiLFwicndcIixcImt5XCIsXCJrdlwiLFwia2dcIixcImtvXCIsXCJralwiLFwia3VcIixcImtqXCIsXCJreVwiLFwibG9cIixcImxhXCIsXCJsdlwiLFwibGJcIixcImxpXCIsXCJsaVwiLFwibGlcIixcImxuXCIsXCJsdFwiLFwibHVcIixcImxiXCIsXCJta1wiLFwibWdcIixcIm1zXCIsXCJtbFwiLFwiZHZcIixcIm10XCIsXCJndlwiLFwibWlcIixcIm1yXCIsXCJtaFwiLFwicm9cIixcInJvXCIsXCJtblwiLFwibmFcIixcIm52XCIsXCJudlwiLFwibmRcIixcclxuICAgIFwibnJcIixcIm5nXCIsXCJuZVwiLFwibmRcIixcInNlXCIsXCJub1wiLFwibmJcIixcIm5uXCIsXCJpaVwiLFwibnlcIixcIm5uXCIsXCJpZVwiLFwib2NcIixcIm9qXCIsXCJjdVwiLFwiY3VcIixcImN1XCIsXCJvclwiLFwib21cIixcIm9zXCIsXCJvc1wiLFwicGlcIixcInBhXCIsXCJwc1wiLFwiZmFcIixcInBsXCIsXCJwdFwiLFwicGFcIixcInBzXCIsXCJxdVwiLFwicm9cIixcInJtXCIsXCJyblwiLFwicnVcIixcInNtXCIsXCJzZ1wiLFwic2FcIixcInNjXCIsXCJnZFwiLFwic3JcIixcInNuXCIsXCJpaVwiLFwic2RcIixcInNpXCIsXCJzaVwiLFwic2tcIixcclxuICAgIFwic2xcIixcInNvXCIsXCJzdFwiLFwibnJcIixcImVzXCIsXCJzdVwiLFwic3dcIixcInNzXCIsXCJzdlwiLFwidGxcIixcInR5XCIsXCJ0Z1wiLFwidGFcIixcInR0XCIsXCJ0ZVwiLFwidGhcIixcImJvXCIsXCJ0aVwiLFwidG9cIixcInRzXCIsXCJ0blwiLFwidHJcIixcInRrXCIsXCJ0d1wiLFwidWdcIixcInVrXCIsXCJ1clwiLFwidWdcIixcInV6XCIsXCJjYVwiLFwidmVcIixcInZpXCIsXCJ2b1wiLFwid2FcIixcImN5XCIsXCJmeVwiLFwid29cIixcInhoXCIsXCJ5aVwiLFwieW9cIixcInphXCIsXCJ6dVwiXTtcclxuXHJcbmNvbnN0IHJlT3BlblN5bmMgPSAvPHN5bmMvaTtcclxuXHJcbmNvbnN0IHJlQ2xvc2VTeW5jID0gLzxzeW5jfDxcXC9ib2R5fDxcXC9zYW1pL2k7XHJcblxyXG5jb25zdCByZUxpbmVFbmRpbmcgPSAvXFxyXFxuP3xcXG4vZztcclxuXHJcbmNvbnN0IHJlQnJva2VuVGFnID0gLzxbYS16XSpbXj5dKjxbYS16XSovZztcclxuXHJcbmNvbnN0IHJlU3RhcnRUaW1lID0gLzxzeW5jW14+XSs/c3RhcnRbXj1dKj1bXjAtOV0qKFswLTldKilbXCJeMC05XCJdKi9pO1xyXG5cclxuY29uc3QgcmVCciA9IC88YnJbXj5dKj4vaWc7XHJcblxyXG5jb25zdCByZVN0eWxlID0gLzxzdHlsZVtePl0qPihbXFxzXFxTXSo/KTxcXC9zdHlsZVtePl0qPi9pO1xyXG5cclxuY29uc3QgcmVDb21tZW50ID0gLyg8IS0tfC0tPikvZztcclxuXHJcbmNvbnN0IGNsb25lID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICB2YXIgZmxhZ3MsIGtleSwgbmV3SW5zdGFuY2U7XHJcbiAgICBpZiAoKG9iaiA9PSBudWxsKSB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShvYmouZ2V0VGltZSgpKTtcclxuICAgIH1cclxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBSZWdFeHApIHtcclxuICAgICAgICBmbGFncyA9ICcnO1xyXG4gICAgICAgIGlmIChvYmouZ2xvYmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZmxhZ3MgKz0gJ2cnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob2JqLmlnbm9yZUNhc2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmbGFncyArPSAnaSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmoubXVsdGlsaW5lICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZmxhZ3MgKz0gJ20nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob2JqLnN0aWNreSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZsYWdzICs9ICd5JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAob2JqLnNvdXJjZSwgZmxhZ3MpO1xyXG4gICAgfVxyXG4gICAgbmV3SW5zdGFuY2UgPSBuZXcgb2JqLmNvbnN0cnVjdG9yKCk7XHJcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgICBuZXdJbnN0YW5jZVtrZXldID0gY2xvbmUob2JqW2tleV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld0luc3RhbmNlO1xyXG59O1xyXG5cclxuY29uc3Qgc3RyaXBfdGFncyA9IGZ1bmN0aW9uIChpbnB1dCwgYWxsb3dlZCkge1xyXG4gICAgLy8gaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXRcclxuICAgIC8vICsgICBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXHJcbiAgICAvLyArICAgaW1wcm92ZWQgYnk6IEx1a2UgR29kZnJleVxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBQdWxcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IE9ubm8gTWFyc21hblxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBBbGV4XHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBNYXJjIFBhbGF1XHJcbiAgICAvLyArICAgaW1wcm92ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldClcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogRXJpYyBOYWdlbFxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBCb2JieSBEcmFrZVxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldClcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogVG9tYXN6IFdlc29sb3dza2lcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogRXZlcnRqYW4gR2FycmV0c2VuXHJcbiAgICAvLyArICAgIHJldmlzZWQgYnk6IFJhZmHFgiBLdWthd3NraSAoaHR0cDovL2Jsb2cua3VrYXdza2kucGwvKVxyXG4gICAgLy8gKiAgICAgZXhhbXBsZSAxOiBzdHJpcF90YWdzKCc8cD5LZXZpbjwvcD4gPGJyIC8+PGI+dmFuPC9iPiA8aT5ab25uZXZlbGQ8L2k+JywgJzxpPjxiPicpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyAxOiAnS2V2aW4gPGI+dmFuPC9iPiA8aT5ab25uZXZlbGQ8L2k+J1xyXG4gICAgLy8gKiAgICAgZXhhbXBsZSAyOiBzdHJpcF90YWdzKCc8cD5LZXZpbiA8aW1nIHNyYz1cInNvbWVpbWFnZS5wbmdcIiBvbm1vdXNlb3Zlcj1cInNvbWVGdW5jdGlvbigpXCI+dmFuIDxpPlpvbm5ldmVsZDwvaT48L3A+JywgJzxwPicpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyAyOiAnPHA+S2V2aW4gdmFuIFpvbm5ldmVsZDwvcD4nXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDM6IHN0cmlwX3RhZ3MoXCI8YSBocmVmPSdodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldCc+S2V2aW4gdmFuIFpvbm5ldmVsZDwvYT5cIiwgXCI8YT5cIik7XHJcbiAgICAvLyAqICAgICByZXR1cm5zIDM6ICc8YSBocmVmPSdodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldCc+S2V2aW4gdmFuIFpvbm5ldmVsZDwvYT4nXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDQ6IHN0cmlwX3RhZ3MoJzEgPCA1IDUgPiAxJyk7XHJcbiAgICAvLyAqICAgICByZXR1cm5zIDQ6ICcxIDwgNSA1ID4gMSdcclxuICAgIC8vICogICAgIGV4YW1wbGUgNTogc3RyaXBfdGFncygnMSA8YnIvPiAxJyk7XHJcbiAgICAvLyAqICAgICByZXR1cm5zIDU6ICcxICAxJ1xyXG4gICAgLy8gKiAgICAgZXhhbXBsZSA2OiBzdHJpcF90YWdzKCcxIDxici8+IDEnLCAnPGJyPicpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyA2OiAnMSAgMSdcclxuICAgIC8vICogICAgIGV4YW1wbGUgNzogc3RyaXBfdGFncygnMSA8YnIvPiAxJywgJzxicj48YnIvPicpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyA3OiAnMSA8YnIvPiAxJ1xyXG4gICAgYWxsb3dlZCA9ICgoKGFsbG93ZWQgfHwgXCJcIikgKyBcIlwiKS50b0xvd2VyQ2FzZSgpLm1hdGNoKC88W2Etel1bYS16MC05XSo+L2cpIHx8IFtdKS5qb2luKCcnKTsgLy8gbWFraW5nIHN1cmUgdGhlIGFsbG93ZWQgYXJnIGlzIGEgc3RyaW5nIGNvbnRhaW5pbmcgb25seSB0YWdzIGluIGxvd2VyY2FzZSAoPGE+PGI+PGM+KVxyXG4gICAgdmFyIHRhZ3MgPSAvPFxcLz8oW2Etel1bYS16MC05XSopXFxiW14+XSo+L2dpLFxyXG4gICAgICAgIGNvbW1lbnRzQW5kUGhwVGFncyA9IC88IS0tW1xcc1xcU10qPy0tPnw8XFw/KD86cGhwKT9bXFxzXFxTXSo/XFw/Pi9naTtcclxuICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKGNvbW1lbnRzQW5kUGhwVGFncywgJycpLnJlcGxhY2UodGFncywgZnVuY3Rpb24oJDAsICQxKSB7XHJcbiAgICAgICAgcmV0dXJuIGFsbG93ZWQuaW5kZXhPZignPCcgKyAkMS50b0xvd2VyQ2FzZSgpICsgJz4nKSA+IC0xID8gJDAgOiAnJztcclxuICAgIH0pO1xyXG59O1xyXG5cclxuY29uc3QgX3NvcnQgPSBmdW5jdGlvbihsYW5nSXRlbSkge1xyXG4gICAgcmV0dXJuIGxhbmdJdGVtLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHZhciByZXM7XHJcbiAgICAgICAgaWYgKChyZXMgPSBhLnN0YXJ0IC0gYi5zdGFydCkgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuZW5kIC0gYi5lbmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IF9tZXJnZU11bHRpTGFuZ3VhZ2VzID0gZnVuY3Rpb24oYXJyKSB7XHJcbiAgICB2YXIgY29udGVudCwgZGljdCwgaSwgaWR4LCBrZXksIGxhbmcsIHJldCwgdmFsLCBfaSwgX2xlbiwgX3JlZjtcclxuICAgIGRpY3QgPSB7fTtcclxuICAgIGkgPSBhcnIubGVuZ3RoO1xyXG4gICAgcmV0ID0gW107XHJcbiAgICBmb3IgKGkgPSBfaSA9IDAsIF9sZW4gPSBhcnIubGVuZ3RoOyBfaSA8IF9sZW47IGkgPSArK19pKSB7XHJcbiAgICAgICAgdmFsID0gYXJyW2ldO1xyXG4gICAgICAgIGtleSA9IHZhbC5zdGFydFRpbWUgKyAnLCcgKyB2YWwuZW5kVGltZTtcclxuICAgICAgICBpZiAoKGlkeCA9IGRpY3Rba2V5XSkgIT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBfcmVmID0gdmFsLmxhbmd1YWdlcztcclxuICAgICAgICAgICAgZm9yIChsYW5nIGluIF9yZWYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBfcmVmW2xhbmddO1xyXG4gICAgICAgICAgICAgICAgcmV0W2lkeF0ubGFuZ3VhZ2VzW2xhbmddID0gY29udGVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldC5wdXNoKHZhbCk7XHJcbiAgICAgICAgICAgIGRpY3Rba2V5XSA9IHJldC5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXQ7XHJcbn07XHJcblxyXG5jb25zdCBTbWlQYXJzZXIgPSBmdW5jdGlvbihzYW1pLCBvcHRpb25zKSB7XHJcbiAgICB2YXIgZGVmaW5lZExhbmdzLCBkdXJhdGlvbiwgZXJyb3JzLCBnZXREZWZpbmVkTGFuZ3MsIGdldExhbmd1YWdlLCBrZXksIG1ha2VFbmRUaW1lLCBwYXJzZSwgcmVzdWx0LCB2YWx1ZSwgX3JlZjtcclxuICAgIHBhcnNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQsIGVycm9yLCBpbm5lclRleHQsIGlzQnJva2VuLCBpdGVtLCBsYW5nLCBsYW5nSXRlbSwgbGluZU51bSwgbmV4dFN0YXJ0VGFnSWR4LCByZXQsIHN0YXJ0VGFnSWR4LCBzdGFydFRpbWUsIHN0ciwgdGVtcFJldCwgX3JlZiwgX3JlZjEsIF9yZWYyO1xyXG4gICAgICAgIGVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIGU7XHJcbiAgICAgICAgICAgIGUgPSBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICBlLmxpbmUgPSBsaW5lTnVtO1xyXG4gICAgICAgICAgICBlLmNvbnRleHQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzLnB1c2goZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsaW5lTnVtID0gMTtcclxuICAgICAgICByZXQgPSBbXTtcclxuICAgICAgICB0ZW1wUmV0ID0ge307XHJcbiAgICAgICAgc3RyID0gc2FtaTtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBzdGFydFRhZ0lkeCA9IHN0ci5zZWFyY2goKTtcclxuICAgICAgICAgICAgaWYgKG5leHRTdGFydFRhZ0lkeCA8PSAwIHx8IHN0YXJ0VGFnSWR4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV4dFN0YXJ0VGFnSWR4ID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4ICsgMSkuc2VhcmNoKHJlQ2xvc2VTeW5jKSArIDE7XHJcbiAgICAgICAgICAgIGlmIChuZXh0U3RhcnRUYWdJZHggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4LCBzdGFydFRhZ0lkeCArIG5leHRTdGFydFRhZ0lkeCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsaW5lTnVtICs9ICgoX3JlZiA9IHN0ci5zbGljZSgwLCBzdGFydFRhZ0lkeCkubWF0Y2gocmVMaW5lRW5kaW5nKSkgIT0gbnVsbCA/IF9yZWYubGVuZ3RoIDogdm9pZCAwKSB8fCAwO1xyXG4gICAgICAgICAgICBpZiAoaXNCcm9rZW4gPSByZUJyb2tlblRhZy50ZXN0KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcignRVJST1JfQlJPS0VOX1RBR1MnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2Uoc3RhcnRUYWdJZHggKyBuZXh0U3RhcnRUYWdJZHgpO1xyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSArKChfcmVmMSA9IGVsZW1lbnQubWF0Y2gocmVTdGFydFRpbWUpKSAhPSBudWxsID8gX3JlZjFbMV0vMTAwMCA6IHZvaWQgMCk7ICAvL0hTTEVFIG1zIC0+IHMg66GcIOuzgOqyvVxyXG4gICAgICAgICAgICBpZiAoc3RhcnRUaW1lID09PSBudWxsIHx8IHN0YXJ0VGltZSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGVycm9yKCdFUlJPUl9JTlZBTElEX1RJTUUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL0hTTEVFIDogMjAxODA1MzAgLSDsmrDrprAg656t6riw7KeAIOq1rOu2hOydtCDtlYTsmpQg7JeG64ukLiDsnojripTqsbAg6re464yA66GcIOuztOyXrOykhOu/kFxyXG4gICAgICAgICAgICBsYW5nID0gZ2V0TGFuZ3VhZ2UoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIC8qaWYgKCFsYW5nKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcignRVJST1JfSU5WQUxJRF9MQU5HVUFHRScpO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgbGluZU51bSArPSAoKF9yZWYyID0gZWxlbWVudC5tYXRjaChyZUxpbmVFbmRpbmcpKSAhPSBudWxsID8gX3JlZjIubGVuZ3RoIDogdm9pZCAwKSB8fCAwO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5yZXBsYWNlKHJlTGluZUVuZGluZywgJycpO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5yZXBsYWNlKHJlQnIsIFwiXFxuXCIpO1xyXG4gICAgICAgICAgICBpbm5lclRleHQgPSBzdHJpcF90YWdzKGVsZW1lbnQpLnRyaW0oKTtcclxuICAgICAgICAgICAgLy9IU0xFRSA6IDIwMTgwNTMwIC0g7Jqw66awIOuereq4sOyngCDqtazrtoTsnbQg7ZWE7JqUIOyXhuuLpC4g7J6I64qU6rGwIOq3uOuMgOuhnCDrs7Tsl6zspITrv5BcclxuICAgICAgICAgICAgaXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydFRpbWUsXHJcbiAgICAgICAgICAgICAgICAvL2xhbmd1YWdlczoge30sXHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSA6IGxhbmcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgY29udGVudHM6IGlubmVyVGV4dFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvL0hTTEVFIDogMjAxODA1MzAgLSDsmrDrprAg656t6riw7KeAIOq1rOu2hOydtCDtlYTsmpQg7JeG64ukLiDsnojripTqsbAg6re464yA66GcIOuztOyXrOykhOu/kFxyXG4gICAgICAgICAgICBpZiAobGFuZykge1xyXG4gICAgICAgICAgICAgICAgLy9pdGVtLmxhbmd1YWdlc1tsYW5nXSA9IGlubmVyVGV4dDtcclxuICAgICAgICAgICAgICAgIGl0ZW0udGV4dCA9IGlubmVyVGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wUmV0W2xhbmddIHx8ICh0ZW1wUmV0W2xhbmddID0gW10pO1xyXG4gICAgICAgICAgICBpZihpdGVtLnN0YXJ0KXtcclxuICAgICAgICAgICAgICAgIHRlbXBSZXRbbGFuZ10ucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9IU0xFRSA6IDIwMTgwNTMwIC0g7Jqw66awIOuereq4sOyngCDqtazrtoTsnbQg7ZWE7JqUIOyXhuuLpC4g7J6I64qU6rGwIOq3uOuMgOuhnCDrs7Tsl6zspITrv5BcclxuICAgICAgICBmb3IgKGxhbmcgaW4gdGVtcFJldCkge1xyXG4gICAgICAgICAgICBsYW5nSXRlbSA9IHRlbXBSZXRbbGFuZ107XHJcbiAgICAgICAgICAgIGxhbmdJdGVtID0gX3NvcnQobGFuZ0l0ZW0pO1xyXG4gICAgICAgICAgICBsYW5nSXRlbSA9IG1ha2VFbmRUaW1lKGxhbmdJdGVtKTtcclxuICAgICAgICAgICAgLy9IU0xFRSA6IOydtOyZleydtOuptCBTUlQg7YyM7ISc7JmAIO2PrOunt+ydhCDrp57stpTsnpBcclxuICAgICAgICAgICAgLy9sYW5nSXRlbS5zdGFydCA9IGxhbmdJdGVtLnN0YXJ0IC8gMTAwMDtcclxuICAgICAgICAgICAgLy9sYW5nSXRlbS5lbmQgPSBsYW5nSXRlbS5lbmQgLyAxMDAwO1xyXG4gICAgICAgICAgICByZXQgPSByZXQuY29uY2F0KGxhbmdJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9IU0xFRSA6IDIwMTgwNTMwIC0g7Jqw66awIOuereq4sOyngCDqtazrtoTsnbQg7ZWE7JqUIOyXhuuLpC4g7J6I64qU6rGwIOq3uOuMgOuhnCDrs7Tsl6zspITrv5BcclxuICAgICAgICAvL3JldCA9IF9tZXJnZU11bHRpTGFuZ3VhZ2VzKHJldCk7XHJcbiAgICAgICAgcmV0ID0gX3NvcnQocmV0KTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfTtcclxuICAgIGdldExhbmd1YWdlID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBjbGFzc05hbWUsIGxhbmc7XHJcbiAgICAgICAgaWYoIWVsZW1lbnQpe3JldHVybiA7fVxyXG4gICAgICAgIGZvciAoY2xhc3NOYW1lIGluIGRlZmluZWRMYW5ncykge1xyXG4gICAgICAgICAgICBsYW5nID0gZGVmaW5lZExhbmdzW2NsYXNzTmFtZV07XHJcbiAgICAgICAgICAgIGlmIChsYW5nLnJlQ2xhc3NOYW1lLnRlc3QoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsYW5nLmxhbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZ2V0RGVmaW5lZExhbmdzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSwgZGVjbGFyYXRpb24sIGUsIGVycm9yLCBsYW5nLCBtYXRjaGVkLCBwYXJzZWQsIHJ1bGUsIHNlbGVjdG9yLCBfaSwgX2xlbiwgX3JlZiwgX3JlZjEsIF9yZXN1bHRzO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG1hdGNoZWQgPSAoKF9yZWYgPSBzYW1pLm1hdGNoKHJlU3R5bGUpKSAhPSBudWxsID8gX3JlZlsxXSA6IHZvaWQgMCkgfHwgJyc7XHJcbiAgICAgICAgICAgIG1hdGNoZWQgPSBtYXRjaGVkLnJlcGxhY2UocmVDb21tZW50LCAnJyk7XHJcbiAgICAgICAgICAgIHBhcnNlZCA9IGNzc1BhcnNlKG1hdGNoZWQpO1xyXG4gICAgICAgICAgICBfcmVmMSA9IHBhcnNlZC5zdHlsZXNoZWV0LnJ1bGVzO1xyXG4gICAgICAgICAgICBfcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYxLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBydWxlID0gX3JlZjFbX2ldO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSBydWxlLnNlbGVjdG9yc1swXTtcclxuICAgICAgICAgICAgICAgIGlmICgoc2VsZWN0b3IgIT0gbnVsbCA/IHNlbGVjdG9yWzBdIDogdm9pZCAwKSA9PT0gJy4nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCgoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfaiwgX2xlbjEsIF9yZWYyLCBfcmVzdWx0czE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWYyID0gcnVsZS5kZWNsYXJhdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzMSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uID0gX3JlZjJbX2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlY2xhcmF0aW9uLnByb3BlcnR5LnRvTG93ZXJDYXNlKCkgPT09ICdsYW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IHNlbGVjdG9yLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmcgPSBkZWNsYXJhdGlvbi52YWx1ZS5zbGljZSgwLCAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAofmxhbmdDb2Rlcy5pbmRleE9mKGxhbmcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzMS5wdXNoKGRlZmluZWRMYW5nc1tjbGFzc05hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZzogbGFuZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooXCIgKyBjbGFzc05hbWUgKyBcIilbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0czEucHVzaCh2b2lkIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVzdWx0czE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godm9pZCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XHJcbiAgICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7XHJcbiAgICAgICAgICAgIGUgPSBfZXJyb3I7XHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycm9yID0gbmV3IEVycm9yKCdFUlJPUl9JTlZBTElEX0xBTkdVQUdFX0RFRklOSVRJT04nKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIG1ha2VFbmRUaW1lID0gZnVuY3Rpb24obGFuZ0l0ZW0pIHtcclxuICAgICAgICB2YXIgaSwgaXRlbSwgX3JlZjtcclxuICAgICAgICBpID0gbGFuZ0l0ZW0ubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgaXRlbSA9IGxhbmdJdGVtW2ldO1xyXG4gICAgICAgICAgICBpZiAoKF9yZWYgPSBsYW5nSXRlbVtpIC0gMV0pICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vSFNMRUUgOiDsnbTsmZXsnbTrqbQgU1JUIO2MjOyEnOyZgCDtj6zrp7fsnYQg66ee7LaU7J6QXHJcbiAgICAgICAgICAgICAgICBfcmVmLmVuZCA9IGl0ZW0uc3RhcnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpdGVtLmNvbnRlbnRzIHx8IGl0ZW0uY29udGVudHMgPT09ICcmbmJzcDsnKSB7XHJcbiAgICAgICAgICAgICAgICBsYW5nSXRlbS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbGFuZ0l0ZW1baV0uY29udGVudHM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5lbmQgPSBpdGVtLnN0YXJ0ICsgZHVyYXRpb247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhbmdJdGVtO1xyXG4gICAgfTtcclxuICAgIGVycm9ycyA9IFtdO1xyXG4gICAgZGVmaW5lZExhbmdzID0ge1xyXG4gICAgICAgIEtSQ0M6IHtcclxuICAgICAgICAgICAgbGFuZzogJ2tvJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihLUkNDKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEtSOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdrbycsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooS1IpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRU5DQzoge1xyXG4gICAgICAgICAgICBsYW5nOiAnZW4nLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEVOQ0MpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRUdDQzoge1xyXG4gICAgICAgICAgICBsYW5nOiAnZW4nLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEVHQ0MpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRU46IHtcclxuICAgICAgICAgICAgbGFuZzogJ2VuJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihFTilbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBKUENDOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdqYScsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooSlBDQylbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGlmIChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmRlZmluZWRMYW5ncyA6IHZvaWQgMCkge1xyXG4gICAgICAgIF9yZWYgPSBvcHRpb25zLmRlZmluZWRMYW5ncztcclxuICAgICAgICBmb3IgKGtleSBpbiBfcmVmKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gX3JlZltrZXldO1xyXG4gICAgICAgICAgICBkZWZpbmVkTGFuZ3Nba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGR1cmF0aW9uID0gKG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMuZHVyYXRpb24gOiB2b2lkIDApIHx8IDEwOyAvL0hTTEVFIG1zIC0+IHMg66GcIOuzgOqyvVxyXG4gICAgc2FtaSA9IHNhbWkudHJpbSgpO1xyXG4gICAgLy9nZXREZWZpbmVkTGFuZ3MoKTtcclxuICAgIHJlc3VsdCA9IHBhcnNlKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3VsdDogcmVzdWx0LFxyXG4gICAgICAgIGVycm9yczogZXJyb3JzXHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNtaVBhcnNlcjsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDI5Li5cclxuICovXHJcbmltcG9ydCB7IGhtc1RvU2Vjb25kLCB0cmltIH0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIlxyXG5cclxuZnVuY3Rpb24gX2VudHJ5KGRhdGEpIHtcclxuICAgIHZhciBlbnRyeSA9IHt9O1xyXG4gICAgdmFyIGFycmF5ID0gZGF0YS5zcGxpdCgnXFxyXFxuJyk7XHJcbiAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgYXJyYXkgPSBkYXRhLnNwbGl0KCdcXG4nKTtcclxuICAgIH1cclxuICAgIHZhciBpZHggPSAxO1xyXG4gICAgaWYgKGFycmF5WzBdLmluZGV4T2YoJyAtLT4gJykgPiAwKSB7XHJcbiAgICAgICAgaWR4ID0gMDtcclxuICAgIH1cclxuICAgIGlmIChhcnJheS5sZW5ndGggPiBpZHggKyAxICYmIGFycmF5W2lkeCArIDFdKSB7XHJcbiAgICAgICAgLy8gVGhpcyBsaW5lIGNvbnRhaW5zIHRoZSBzdGFydCBhbmQgZW5kLlxyXG4gICAgICAgIHZhciBsaW5lID0gYXJyYXlbaWR4XTtcclxuICAgICAgICB2YXIgaW5kZXggPSBsaW5lLmluZGV4T2YoJyAtLT4gJyk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICBlbnRyeS5zdGFydCA9IGhtc1RvU2Vjb25kKGxpbmUuc3Vic3RyKDAsIGluZGV4KSk7XHJcbiAgICAgICAgICAgIGVudHJ5LmVuZCA9IGhtc1RvU2Vjb25kKGxpbmUuc3Vic3RyKGluZGV4ICsgNSkpO1xyXG4gICAgICAgICAgICBlbnRyeS50ZXh0ID0gYXJyYXkuc2xpY2UoaWR4ICsgMSkuam9pbignXFxyXFxuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudHJ5O1xyXG5cclxufVxyXG5cclxuY29uc3QgU3J0UGFyc2VyID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgdmFyIGNhcHRpb25zID0gW107XHJcblxyXG4gICAgZGF0YSA9IHRyaW0oZGF0YSk7XHJcblxyXG4gICAgdmFyIGxpc3QgPSBkYXRhLnNwbGl0KCdcXHJcXG5cXHJcXG4nKTtcclxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIGxpc3QgPSBkYXRhLnNwbGl0KCdcXG5cXG4nKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChsaXN0W2ldID09PSAnV0VCVlRUJykge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGVudHJ5ID0gX2VudHJ5KGxpc3RbaV0pO1xyXG4gICAgICAgIGlmIChlbnRyeS50ZXh0KSB7XHJcbiAgICAgICAgICAgIGNhcHRpb25zLnB1c2goZW50cnkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2FwdGlvbnM7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3J0UGFyc2VyOyIsIi8vIFNUQVRFXHJcbmV4cG9ydCBjb25zdCBTVEFURV9CVUZGRVJJTkcgPSBcImJ1ZmZlcmluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfSURMRSA9IFwiaWRsZVwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSBcImNvbXBsZXRlXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9QQVVTRUQgPSBcInBhdXNlZFwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfUExBWUlORyA9IFwicGxheWluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSBcImVycm9yXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9MT0FESU5HID0gXCJsb2FkaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9TVEFMTEVEID0gXCJzdGFsbGVkXCI7XHJcblxyXG5cclxuLy8gUFJPVklERVJcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hUTUw1ID0gXCJodG1sNVwiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfV0VCUlRDID0gXCJ3ZWJydGNcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0RBU0ggPSBcImRhc2hcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hMUyA9IFwiaGxzXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9SVE1QID0gXCJydG1wXCI7XHJcblxyXG4vLyBFVkVOVFNcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcclxuZXhwb3J0IGNvbnN0IFJFQURZID0gXCJyZWFkeVwiO1xyXG5leHBvcnQgY29uc3QgREVTVFJPWSA9IFwiZGVzdHJveVwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLID0gXCJzZWVrXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUl9GVUxMID0gXCJidWZmZXJGdWxsXCI7XHJcbmV4cG9ydCBjb25zdCBESVNQTEFZX0NMSUNLID0gXCJkaXNwbGF5Q2xpY2tcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTE9BREVEID0gXCJsb2FkZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gXCJzZWVrZWRcIjtcclxuZXhwb3J0IGNvbnN0IE5FVFdPUktfVU5TVEFCTEVEID0gXCJ1bnN0YWJsZU5ldHdvcmtcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBFUlJPUiA9IFwiZXJyb3JcIjtcclxuXHJcbi8vIFNUQVRFIE9GIFBMQVlFUlxyXG5leHBvcnQgY29uc3QgUExBWUVSX1NUQVRFID0gXCJzdGF0ZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1BBVVNFID0gXCJwYXVzZVwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1BMQVkgPSBcInBsYXlcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9IFwiYnVmZmVyQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9USU1FID0gXCJ0aW1lXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1JBVEVfQ0hBTkdFID0gXCJyYXRlY2hhbmdlXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9IFwidm9sdW1lQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9NVVRFID0gXCJtdXRlXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX01FVEEgPSBcIm1ldGFDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NPVVJDRV9DSEFOR0VEID0gXCJzb3VyY2VDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMX0NIQU5HRUQgPSBcInF1YWxpdHlMZXZlbENoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCA9IFwicGxheWJhY2tSYXRlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEID0gXCJjdWVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRCA9IFwiY2FwdGlvbkNoYW5nZWRcIjtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgSU5JVF9FUlJPUiA9IDEwMDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0VSUk9SID0gMzAwO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SID0gMzAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiA9IDMwMjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiA9IDMwMztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9GSUxFX0VSUk9SID0gMzA0O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0NBUFRJT05fRVJST1IgPSAzMDU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SID0gNTAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19XU19DTE9TRUQgPSA1MDI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IgPSA1MDM7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiA9IDUwNDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiA9IDUwNTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IgPSA1MDY7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyA9IDUxMDtcclxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2ggfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XHJcbmltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbiAsdHJpbX0gZnJvbSBcIi4uLy4uL3V0aWxzL3N0cmluZ3NcIjtcclxuaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCIuLi9TdXBwb3J0Q2hlY2tlclwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBQbGF5bGlzdCBvciBTb3VyY2VzLlxyXG4gKiBAcGFyYW1cclxuICpcclxuICogKi9cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBsZXQgY3VycmVudFBsYXlsaXN0ID0gW107XHJcbiAgICBsZXQgc3VwcG9ydENoZWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xyXG5cclxuICAgIGNvbnN0IG1ha2VQcmV0dHlTb3VyY2UgPSBmdW5jdGlvbihzb3VyY2VfKXtcclxuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc291cmNlID0gT2JqZWN0LmFzc2lnbih7fSwgeyAnZGVmYXVsdCc6IGZhbHNlIH0sIHNvdXJjZV8pO1xyXG4gICAgICAgIHNvdXJjZS5maWxlID0gdHJpbSgnJyArIHNvdXJjZS5maWxlKTtcclxuXHJcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xyXG4gICAgICAgICAgICBzb3VyY2UuZmlsZSA9IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9zdHJlYW0vXCIgKyBzb3VyY2Uuc3RyZWFtO1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuYXBwbGljYXRpb247XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Uuc3RyZWFtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWltZXR5cGVSZWdFeCA9IC9eW14vXStcXC8oPzp4LSk/KFteL10rKSQvO1xyXG5cclxuICAgICAgICBpZiAobWltZXR5cGVSZWdFeC50ZXN0KHNvdXJjZS50eXBlKSkge1xyXG4gICAgICAgICAgICAvLyBpZiB0eXBlIGlzIGdpdmVuIGFzIGEgbWltZXR5cGVcclxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gc291cmNlLnR5cGUucmVwbGFjZShtaW1ldHlwZVJlZ0V4LCAnJDEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGlzUnRtcChzb3VyY2UuZmlsZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcclxuICAgICAgICB9ZWxzZSBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICd3ZWJydGMnO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzRGFzaChzb3VyY2UuZmlsZSwgc291cmNlLnR5cGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnZGFzaCc7XHJcbiAgICAgICAgfWVsc2UgaWYgKCFzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IGV4dHJhY3RFeHRlbnNpb24oc291cmNlLmZpbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBub3JtYWxpemUgdHlwZXNcclxuICAgICAgICBzd2l0Y2ggKHNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ20zdTgnOlxyXG4gICAgICAgICAgICBjYXNlICd2bmQuYXBwbGUubXBlZ3VybCc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdobHMnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ200YSc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdhYWMnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NtaWwnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlW2tleV0gPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgc291cmNlW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0KSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgc2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3QpO1xyXG4gICAgICAgIGNvbnN0IHByZXR0aWVkUGxheWxpc3QgPSAoXy5pc0FycmF5KHBsYXlsaXN0KSA/IHBsYXlsaXN0IDogW3BsYXlsaXN0XSkubWFwKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KGl0ZW0udHJhY2tzKSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0udHJhY2tzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwbGF5bGlzdEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tzOiBbXVxyXG4gICAgICAgICAgICB9LCBpdGVtICk7XHJcblxyXG4gICAgICAgICAgICBpZigocGxheWxpc3RJdGVtLnNvdXJjZXMgPT09IE9iamVjdChwbGF5bGlzdEl0ZW0uc291cmNlcykpICYmICFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzKV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBpdGVtLmxldmVscztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShpdGVtKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBwcmV0dHlTb3VyY2UgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdFNvdXJjZSA9IHNvdXJjZS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNvdXJjZSBkb2Vzbid0IGhhdmUgYSBsYWJlbCwgbnVtYmVyIGl0XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS50eXBlK1wiLVwiK2kudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlTb3VyY2UgPSBtYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmKHN1cHBvcnRDaGVja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShwcmV0dHlTb3VyY2UpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IHByZXR0eVNvdXJjZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBwbGF5bGlzdEl0ZW0uc291cmNlcy5maWx0ZXIoc291cmNlID0+ICEhc291cmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmF1bHQg6rCAIOyXhuydhOuVjCB3ZWJydGPqsIAg7J6I64uk66m0IHdlYnJ0YyBkZWZhdWx0IDogdHJ1ZeuhnCDsnpDrj5kg7ISk7KCVXHJcbiAgICAgICAgICAgIC8qbGV0IGhhdmVEZWZhdWx0ID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UuZGVmYXVsdCA9PSB0cnVlO30pO1xyXG4gICAgICAgICAgICBsZXQgd2VicnRjU291cmNlID0gW107XHJcbiAgICAgICAgICAgIGlmKCFoYXZlRGVmYXVsdCl7XHJcbiAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS50eXBlID09IFwid2VicnRjXCI7fSk7XHJcbiAgICAgICAgICAgICAgICBpZih3ZWJydGNTb3VyY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZS5kZWZhdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSovXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnRyYWNrcykpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLmNvbmNhdChwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHBsYXlsaXN0SXRlbS5jYXB0aW9ucztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MubWFwKGZ1bmN0aW9uKHRyYWNrKXtcclxuICAgICAgICAgICAgICAgIGlmKCF0cmFjayB8fCAhdHJhY2suZmlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHtcclxuICAgICAgICAgICAgICAgICAgICAna2luZCc6ICdjYXB0aW9ucycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgdHJhY2spO1xyXG4gICAgICAgICAgICB9KS5maWx0ZXIodHJhY2sgPT4gISF0cmFjayk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGxheWxpc3RJdGVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGN1cnJlbnRQbGF5bGlzdCA9IHByZXR0aWVkUGxheWxpc3Q7XHJcbiAgICAgICAgcmV0dXJuIHByZXR0aWVkUGxheWxpc3Q7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0UGxheWxpc3QoKSBcIiwgY3VycmVudFBsYXlsaXN0KTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9XZSBkbyBub3Qgc3VwcG9ydCBcIlBMQVlMSVNUXCIgbm90IHlldC4gU28gdGhpcyByZXR1cm5zIHBsYXlsaXN0IG9mIDAuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldEN1cnJlbnRTb3VyY2VzKCkgXCIsIGN1cnJlbnRQbGF5bGlzdFswXS5zb3VyY2VzKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFBsYXlsaXN0WzBdLnNvdXJjZXM7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsImltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiYXBpL1N1cHBvcnRDaGVja2VyXCI7XHJcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBwcm92aWRlci5cclxuICogQHBhcmFtXHJcbiAqICovXHJcbmNvbnN0IENvbnRyb2xsZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHN1cHBvcnRDaGFja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcclxuICAgIGNvbnN0IFByb3ZpZGVycyA9IHt9O1xyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkZWQuXCIpO1xyXG5cclxuICAgIGNvbnN0IHJlZ2lzdGVQcm92aWRlciA9IChuYW1lLCBwcm92aWRlcikgPT57XHJcbiAgICAgICAgaWYoUHJvdmlkZXJzW25hbWVdKXtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIF9yZWdpc3RlclByb3ZpZGVyKCkgXCIsIG5hbWUpO1xyXG4gICAgICAgIFByb3ZpZGVyc1tuYW1lXSA9IHByb3ZpZGVyO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBQcm92aWRlckxvYWRlciA9e1xyXG4gICAgICAgIGh0bWw1OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNSddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0h0bWw1JykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJodG1sNVwiLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDUnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB3ZWJydGMgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQycpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwid2VicnRjXCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhc2ggOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0Rhc2gnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJkYXNoXCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBobHMgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0hscyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0hscycpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiaGxzXCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ0bXAgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvZmxhc2gvcHJvdmlkZXJzL1J0bXAnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJydG1wXCIsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhhdC5sb2FkUHJvdmlkZXJzID0gKHBsYXlsaXN0KSA9PntcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KHBsYXlsaXN0KTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZFByb3ZpZGVycygpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzKTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXHJcbiAgICAgICAgICAgIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMuZmlsdGVyKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISFQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdO1xyXG4gICAgICAgICAgICB9KS5tYXAoZnVuY3Rpb24ocHJvdmlkZXJOYW1lKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZmluZEJ5TmFtZSA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGZpbmRCeU5hbWUoKSBcIiwgbmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZSA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBnZXRQcm92aWRlckJ5U291cmNlKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBpc1NhbWVQcm92aWRlcigpIFwiLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKSApO1xyXG4gICAgICAgIHJldHVybiBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgPT09IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xyXG4iLCJpbXBvcnQgQVBJIGZyb20gJ2FwaS9BcGknO1xyXG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tICd1dGlscy92YWxpZGF0b3InO1xyXG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcclxuaW1wb3J0IExhJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xyXG5cclxuXHJcbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5zZGsuanMnKTtcclxuXHJcbi8qKlxyXG4gKiBNYWluIE92ZW5QbGF5ZXJTREsgb2JqZWN0XHJcbiAqL1xyXG5jb25zdCBPdmVuUGxheWVyU0RLID0gd2luZG93Lk92ZW5QbGF5ZXJTREsgPSB7fTtcclxuXHJcbmNvbnN0IHBsYXllckxpc3QgPSBPdmVuUGxheWVyU0RLLnBsYXllckxpc3QgPSBbXTtcclxuXHJcbmV4cG9ydCBjb25zdCBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcclxuXHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG5cclxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xyXG5cclxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVyKTtcclxuICAgIH0gZWxzZSBpZiAoY29udGFpbmVyLm5vZGVUeXBlKSB7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyRWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBwbGF5ZXIgaW5zdGFuY2UgYW5kIHJldHVybiBpdC5cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZyB8IGRvbSBlbGVtZW50fSBjb250YWluZXIgIElkIG9mIGNvbnRhaW5lciBlbGVtZW50IG9yIGNvbnRhaW5lciBlbGVtZW50XHJcbiAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgIFRoZSBvcHRpb25zXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmNyZWF0ZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgb3B0aW9ucykge1xyXG5cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBBUEkoY29udGFpbmVyRWxlbWVudCk7XHJcbiAgICBwbGF5ZXJJbnN0YW5jZS5pbml0KG9wdGlvbnMpO1xyXG5cclxuICAgIHBsYXllckxpc3QucHVzaChwbGF5ZXJJbnN0YW5jZSk7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBsaXN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuICAgICB7YXJyYXl9ICBUaGUgcGxheWVyIGxpc3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4gcGxheWVyTGlzdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgY29udGFpbmVyIGlkLlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSAgY29udGFpbmVySWQgIFRoZSBjb250YWluZXIgaWRlbnRpZmllclxyXG4gKiBAcmV0dXJuICAgICB7b2JlamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUNvbnRhaW5lcklkID0gZnVuY3Rpb24oY29udGFpbmVySWQpIHtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGxheWVyTGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGluZGV4LlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcclxuICogQHJldHVybiAgICAge29iamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IHBsYXllckxpc3RbaW5kZXhdO1xyXG5cclxuICAgIGlmIChwbGF5ZXJJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIHBsYXllciBpbnN0YW5jZSBieSBwbGF5ZXJJZC5cclxuICpcclxuICogQHBhcmFtICAgICAge3BsYXllcklkfSAgaWRcclxuICogQHJldHVybiAgICAge251bGx9XHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLnJlbW92ZVBsYXllciA9IGZ1bmN0aW9uKHBsYXllcklkKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IHBsYXllcklkKSB7XHJcblxyXG4gICAgICAgICAgICBwbGF5ZXJMaXN0LnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIHdlYnJ0YyBzb3VyY2UgZm9yIHBsYXllciBzb3VyY2UgdHlwZS5cclxuICpcclxuICogQHBhcmFtICAgICAge09iamVjdCB8IEFycmF5fSAgc291cmNlICAgd2VicnRjIHNvdXJjZVxyXG4gKiBAcmV0dXJuICAgICB7QXJyYXl9ICBQbGF5ZXIgc291cmNlIE9iZWpjdC5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2VuZXJhdGVXZWJydGNVcmxzID0gZnVuY3Rpb24oc291cmNlcykge1xyXG4gICAgcmV0dXJuIChfLmlzQXJyYXkoc291cmNlcykgPyBzb3VyY2VzIDogW3NvdXJjZXNdKS5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCl7XHJcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgaXNXZWJSVEMoc291cmNlLmhvc3QpICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcclxuICAgICAgICAgICAgcmV0dXJuIHtmaWxlIDogc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL1wiICsgc291cmNlLnN0cmVhbSwgdHlwZSA6IFwid2VicnRjXCIsIGxhYmVsIDogc291cmNlLmxhYmVsID8gc291cmNlLmxhYmVsIDogXCJ3ZWJydGMtXCIrKGluZGV4KzEpIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPdmVuUGxheWVyU0RLO1xyXG4iLCIvKiohXHJcbiAqIGFqYXggLSB2Mi4zLjBcclxuICogQWpheCBtb2R1bGUgaW4gVmFuaWxsYSBKU1xyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZmRhY2l1ay9hamF4XHJcblxyXG4gKiBTdW4gSnVsIDIzIDIwMTcgMTA6NTU6MDkgR01ULTAzMDAgKEJSVClcclxuICogTUlUIChjKSBGZXJuYW5kbyBEYWNpdWtcclxuICovXHJcbiFmdW5jdGlvbihlLHQpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJhamF4XCIsdCk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz10KCk6ZS5hamF4PXQoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGUoZSl7dmFyIHI9W1wiZ2V0XCIsXCJwb3N0XCIsXCJwdXRcIixcImRlbGV0ZVwiXTtyZXR1cm4gZT1lfHx7fSxlLmJhc2VVcmw9ZS5iYXNlVXJsfHxcIlwiLGUubWV0aG9kJiZlLnVybD9uKGUubWV0aG9kLGUuYmFzZVVybCtlLnVybCx0KGUuZGF0YSksZSk6ci5yZWR1Y2UoZnVuY3Rpb24ocixvKXtyZXR1cm4gcltvXT1mdW5jdGlvbihyLHUpe3JldHVybiBuKG8sZS5iYXNlVXJsK3IsdCh1KSxlKX0scn0se30pfWZ1bmN0aW9uIHQoZSl7cmV0dXJuIGV8fG51bGx9ZnVuY3Rpb24gbihlLHQsbix1KXt2YXIgYz1bXCJ0aGVuXCIsXCJjYXRjaFwiLFwiYWx3YXlzXCJdLGk9Yy5yZWR1Y2UoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZVt0XT1mdW5jdGlvbihuKXtyZXR1cm4gZVt0XT1uLGV9LGV9LHt9KSxmPW5ldyBYTUxIdHRwUmVxdWVzdCxkPXIodCxuLGUpO3JldHVybiBmLm9wZW4oZSxkLCEwKSxmLndpdGhDcmVkZW50aWFscz11Lmhhc093blByb3BlcnR5KFwid2l0aENyZWRlbnRpYWxzXCIpLG8oZix1LmhlYWRlcnMpLGYuYWRkRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIixhKGksZiksITEpLGYuc2VuZChzKG4pKSxpLmFib3J0PWZ1bmN0aW9uKCl7cmV0dXJuIGYuYWJvcnQoKX0saX1mdW5jdGlvbiByKGUsdCxuKXtpZihcImdldFwiIT09bi50b0xvd2VyQ2FzZSgpfHwhdClyZXR1cm4gZTt2YXIgcj1zKHQpLG89ZS5pbmRleE9mKFwiP1wiKT4tMT9cIiZcIjpcIj9cIjtyZXR1cm4gZStvK3J9ZnVuY3Rpb24gbyhlLHQpe3Q9dHx8e30sdSh0KXx8KHRbXCJDb250ZW50LVR5cGVcIl09XCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIiksT2JqZWN0LmtleXModCkuZm9yRWFjaChmdW5jdGlvbihuKXt0W25dJiZlLnNldFJlcXVlc3RIZWFkZXIobix0W25dKX0pfWZ1bmN0aW9uIHUoZSl7cmV0dXJuIE9iamVjdC5rZXlzKGUpLnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuXCJjb250ZW50LXR5cGVcIj09PWUudG9Mb3dlckNhc2UoKX0pfWZ1bmN0aW9uIGEoZSx0KXtyZXR1cm4gZnVuY3Rpb24gbigpe3QucmVhZHlTdGF0ZT09PXQuRE9ORSYmKHQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIixuLCExKSxlLmFsd2F5cy5hcHBseShlLGModCkpLHQuc3RhdHVzPj0yMDAmJnQuc3RhdHVzPDMwMD9lLnRoZW4uYXBwbHkoZSxjKHQpKTplW1wiY2F0Y2hcIl0uYXBwbHkoZSxjKHQpKSl9fWZ1bmN0aW9uIGMoZSl7dmFyIHQ7dHJ5e3Q9SlNPTi5wYXJzZShlLnJlc3BvbnNlVGV4dCl9Y2F0Y2gobil7dD1lLnJlc3BvbnNlVGV4dH1yZXR1cm5bdCxlXX1mdW5jdGlvbiBzKGUpe3JldHVybiBpKGUpP2YoZSk6ZX1mdW5jdGlvbiBpKGUpe3JldHVyblwiW29iamVjdCBPYmplY3RdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSl9ZnVuY3Rpb24gZihlKXtyZXR1cm4gT2JqZWN0LmtleXMoZSkucmVkdWNlKGZ1bmN0aW9uKHQsbil7dmFyIHI9dD90K1wiJlwiOlwiXCI7cmV0dXJuIHIrZChuKStcIj1cIitkKGVbbl0pfSxcIlwiKX1mdW5jdGlvbiBkKGUpe3JldHVybiBlbmNvZGVVUklDb21wb25lbnQoZSl9cmV0dXJuIGV9KTsiLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTMgdnR0LmpzIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5sZXQgVlRUQ3VlID0gd2luZG93LlZUVEN1ZTtcclxuXHJcbnZhciBhdXRvS2V5d29yZCA9IFwiYXV0b1wiO1xyXG52YXIgZGlyZWN0aW9uU2V0dGluZyA9IHtcclxuICAgIFwiXCI6IHRydWUsXHJcbiAgICBcImxyXCI6IHRydWUsXHJcbiAgICBcInJsXCI6IHRydWVcclxufTtcclxudmFyIGFsaWduU2V0dGluZyA9IHtcclxuICAgIFwic3RhcnRcIjogdHJ1ZSxcclxuICAgIFwibWlkZGxlXCI6IHRydWUsXHJcbiAgICBcImVuZFwiOiB0cnVlLFxyXG4gICAgXCJsZWZ0XCI6IHRydWUsXHJcbiAgICBcInJpZ2h0XCI6IHRydWVcclxufTtcclxuXHJcbmZ1bmN0aW9uIGZpbmREaXJlY3Rpb25TZXR0aW5nKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIGRpciA9IGRpcmVjdGlvblNldHRpbmdbdmFsdWUudG9Mb3dlckNhc2UoKV07XHJcbiAgICByZXR1cm4gZGlyID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIGFsaWduID0gYWxpZ25TZXR0aW5nW3ZhbHVlLnRvTG93ZXJDYXNlKCldO1xyXG4gICAgcmV0dXJuIGFsaWduID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBleHRlbmQob2JqKSB7XHJcbiAgICB2YXIgaSA9IDE7XHJcbiAgICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBjb2JqID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29iaikge1xyXG4gICAgICAgICAgICBvYmpbcF0gPSBjb2JqW3BdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2JqO1xyXG59XHJcbmlmKCFWVFRDdWUpe1xyXG4gICAgVlRUQ3VlID0gZnVuY3Rpb24gKHN0YXJ0VGltZSwgZW5kVGltZSwgdGV4dCkge1xyXG4gICAgICAgIHZhciBjdWUgPSB0aGlzO1xyXG4gICAgICAgIHZhciBpc0lFOCA9ICgvTVNJRVxcczhcXC4wLykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgICAgICB2YXIgYmFzZU9iaiA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoaXNJRTgpIHtcclxuICAgICAgICAgICAgY3VlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY3VzdG9tJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYmFzZU9iai5lbnVtZXJhYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNoaW0gaW1wbGVtZW50YXRpb24gc3BlY2lmaWMgcHJvcGVydGllcy4gVGhlc2UgcHJvcGVydGllcyBhcmUgbm90IGluXHJcbiAgICAgICAgICogdGhlIHNwZWMuXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgICAgICAvLyBMZXRzIHVzIGtub3cgd2hlbiB0aGUgVlRUQ3VlJ3MgZGF0YSBoYXMgY2hhbmdlZCBpbiBzdWNoIGEgd2F5IHRoYXQgd2UgbmVlZFxyXG4gICAgICAgICAgICAvLyB0byByZWNvbXB1dGUgaXRzIGRpc3BsYXkgc3RhdGUuIFRoaXMgbGV0cyB1cyBjb21wdXRlIGl0cyBkaXNwbGF5IHN0YXRlXHJcbiAgICAgICAgICAgIC8vIGxhemlseS5cclxuICAgICAgICBjdWUuaGFzQmVlblJlc2V0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZUVEN1ZSBhbmQgVGV4dFRyYWNrQ3VlIHByb3BlcnRpZXNcclxuICAgICAgICAgKiBodHRwOi8vZGV2LnczLm9yZy9odG1sNS93ZWJ2dHQvI3Z0dGN1ZS1pbnRlcmZhY2VcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgdmFyIF9pZCA9IFwiXCI7XHJcbiAgICAgICAgdmFyIF9wYXVzZU9uRXhpdCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBfc3RhcnRUaW1lID0gc3RhcnRUaW1lO1xyXG4gICAgICAgIHZhciBfZW5kVGltZSA9IGVuZFRpbWU7XHJcbiAgICAgICAgdmFyIF90ZXh0ID0gdGV4dDtcclxuICAgICAgICB2YXIgX3JlZ2lvbiA9IG51bGw7XHJcbiAgICAgICAgdmFyIF92ZXJ0aWNhbCA9IFwiXCI7XHJcbiAgICAgICAgdmFyIF9zbmFwVG9MaW5lcyA9IHRydWU7XHJcbiAgICAgICAgdmFyIF9saW5lID0gXCJhdXRvXCI7XHJcbiAgICAgICAgdmFyIF9saW5lQWxpZ24gPSBcInN0YXJ0XCI7XHJcbiAgICAgICAgdmFyIF9wb3NpdGlvbiA9IDUwO1xyXG4gICAgICAgIHZhciBfcG9zaXRpb25BbGlnbiA9IFwibWlkZGxlXCI7XHJcbiAgICAgICAgdmFyIF9zaXplID0gNTA7XHJcbiAgICAgICAgdmFyIF9hbGlnbiA9IFwibWlkZGxlXCI7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwiaWRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfaWQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9pZCA9IFwiXCIgKyB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInBhdXNlT25FeGl0XCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3BhdXNlT25FeGl0O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfcGF1c2VPbkV4aXQgPSAhIXZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwic3RhcnRUaW1lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N0YXJ0VGltZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3RhcnQgdGltZSBtdXN0IGJlIHNldCB0byBhIG51bWJlci5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9zdGFydFRpbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJlbmRUaW1lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2VuZFRpbWU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkVuZCB0aW1lIG11c3QgYmUgc2V0IHRvIGEgbnVtYmVyLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX2VuZFRpbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJ0ZXh0XCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RleHQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90ZXh0ID0gXCJcIiArIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInJlZ2lvblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdpb247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9yZWdpb24gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJ2ZXJ0aWNhbFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92ZXJ0aWNhbDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kRGlyZWN0aW9uU2V0dGluZyh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSGF2ZSB0byBjaGVjayBmb3IgZmFsc2UgYmVjYXVzZSB0aGUgc2V0dGluZyBhbiBiZSBhbiBlbXB0eSBzdHJpbmcuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF92ZXJ0aWNhbCA9IHNldHRpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwic25hcFRvTGluZXNcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc25hcFRvTGluZXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zbmFwVG9MaW5lcyA9ICEhdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwibGluZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9saW5lO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiICYmIHZhbHVlICE9PSBhdXRvS2V5d29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG51bWJlciBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX2xpbmUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJsaW5lQWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfbGluZUFsaWduO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfbGluZUFsaWduID0gc2V0dGluZztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJwb3NpdGlvblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQb3NpdGlvbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3Bvc2l0aW9uID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwicG9zaXRpb25BbGlnblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wb3NpdGlvbkFsaWduO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfcG9zaXRpb25BbGlnbiA9IHNldHRpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwic2l6ZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zaXplO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNpemUgbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9zaXplID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwiYWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYWxpZ247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9hbGlnbiA9IHNldHRpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE90aGVyIDx0cmFjaz4gc3BlYyBkZWZpbmVkIHByb3BlcnRpZXNcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3RoZS12aWRlby1lbGVtZW50Lmh0bWwjdGV4dC10cmFjay1jdWUtZGlzcGxheS1zdGF0ZVxyXG4gICAgICAgIGN1ZS5kaXNwbGF5U3RhdGUgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGlmIChpc0lFOCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY3VlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZUVEN1ZSBtZXRob2RzXHJcbiAgICAgKi9cclxuXHJcbiAgICBWVFRDdWUucHJvdG90eXBlLmdldEN1ZUFzSFRNTCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIEFzc3VtZSBXZWJWVFQuY29udmVydEN1ZVRvRE9NVHJlZSBpcyBvbiB0aGUgZ2xvYmFsLlxyXG4gICAgICAgIHJldHVybiBXZWJWVFQuY29udmVydEN1ZVRvRE9NVHJlZSh3aW5kb3csIHRoaXMudGV4dCk7XHJcbiAgICB9O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZUVEN1ZTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIzLi5cclxuICovXHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgSXQgd2FzIHJlcGxhY2UganF1ZXJ5J3Mgc2VsZWN0b3IuIEl0IE9mdGVuIHVzZWQgYnkgT3ZlblRlbXBsYXRlLiAoL3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZS5qcylcclxuICogQHBhcmFtICAgc2VsZWN0b3JPckVsZW1lbnQgIHN0cmluZyBvciBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgTGEkID0gZnVuY3Rpb24oc2VsZWN0b3JPckVsZW1lbnQpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgY29uc3QgcmV0dXJuTm9kZSA9IGZ1bmN0aW9uKCRlbGVtZW50ICwgc2VsZWN0b3Ipe1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9ICAkZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICBpZihub2RlTGlzdC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3RbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgbGV0ICRlbGVtZW50ID0gXCJcIjtcclxuXHJcbiAgICBpZiggXy5ldmVyeShzZWxlY3Rvck9yRWxlbWVudCwgZnVuY3Rpb24oaXRlbSl7cmV0dXJuIF8uaXNFbGVtZW50KGl0ZW0pfSkpe1xyXG4gICAgICAgICRlbGVtZW50ID0gc2VsZWN0b3JPckVsZW1lbnQ7XHJcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJkb2N1bWVudFwiKXtcclxuICAgICAgICAkZWxlbWVudCA9IGRvY3VtZW50O1xyXG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwid2luZG93XCIpe1xyXG4gICAgICAgICRlbGVtZW50ID0gd2luZG93O1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgJGVsZW1lbnQgPSByZXR1cm5Ob2RlKGRvY3VtZW50LCBzZWxlY3Rvck9yRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmKCEkZWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5maW5kID0gKHNlbGVjdG9yKSA9PntcclxuICAgICAgICByZXR1cm4gTGEkKHJldHVybk5vZGUoJGVsZW1lbnQsIHNlbGVjdG9yKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY3NzID0gKG5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgaWYoJGVsZW1lbnQubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFkZENsYXNzID0gKG5hbWUpID0+e1xyXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWVzID0gJGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgaWYoY2xhc3NOYW1lcy5pbmRleE9mKG5hbWUpID09PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBuYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmVDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZiAoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lID0gJGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIG5hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmVBdHRyaWJ1dGUgPSAoYXR0ck5hbWUpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnNob3cgPSAoKSA9PntcclxuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5oaWRlID0gKCkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hcHBlbmQgPSAoaHRtbENvZGUpID0+e1xyXG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCArPSBodG1sQ29kZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC50ZXh0ID0gKHRleHQpID0+IHsgLy9JRTgrXHJcbiAgICAgICAgaWYodGV4dCA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LnRleHRDb250ZW50O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuaHRtbCA9ICh0ZXh0KSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dDtcclxuICAgIH07XHJcbiAgICB0aGF0Lmhhc0NsYXNzID0gKG5hbWUpID0+IHsgLy9JRTgrXHJcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIG5hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KCRlbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pcyA9ICgkdGFyZ2V0RWxlbWVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudCA9PT0gJHRhcmdldEVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQub2Zmc2V0ID0gKCkgPT57ICAgIC8vSUU4K1xyXG4gICAgICAgIHZhciByZWN0ID0gJGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcclxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LndpZHRoID0gKCkgPT4geyAgICAvL0lFOCtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGVpZ2h0ID0gKCkgPT4geyAgIC8vSUU4K1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXR0ciA9IChhdHRyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZXBsYWNlID0gKGh0bWwpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5yZXBsYWNlV2l0aChodG1sKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hcHBlbmQgPSAoaHRtbCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LmFwcGVuZENoaWxkKGh0bWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmVDaGlsZCA9ICgpID0+IHtcclxuICAgICAgICB3aGlsZSAoJGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNoaWxkKCRlbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNsb3Nlc3QgPSAoc2VsZWN0b3JTdHJpbmcpID0+IHtcclxuICAgICAgICBsZXQgY2xvc2VzdEVsZW1lbnQgPSAkZWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yU3RyaW5nKTtcclxuICAgICAgICBpZihjbG9zZXN0RWxlbWVudCl7XHJcbiAgICAgICAgICAgIHJldHVybiBMYSQoY2xvc2VzdEVsZW1lbnQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGEkO1xyXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAyNC4uXG4gKi9cblxuY29uc3QgbG9nZ2VyID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IHByZXZDb25zb2xlTG9nID0gbnVsbDtcblxuICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IHtsb2cgOiB3aW5kb3dbJ2NvbnNvbGUnXVsnbG9nJ119O1xuXG4gICAgdGhhdC5lbmFibGUgPSAoKSA9PntcbiAgICAgICAgaWYocHJldkNvbnNvbGVMb2cgPT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGVbJ2xvZyddID0gcHJldkNvbnNvbGVMb2c7XG4gICAgfTtcbiAgICB0aGF0LmRpc2FibGUgPSAoKSA9PntcbiAgICAgICAgcHJldkNvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGVbJ2xvZyddID0gZnVuY3Rpb24oKXt9O1xuICAgIH07XG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IG51bGw7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBsb2dnZXI7IiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmltKHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBleHRyYWN0RXh0ZW5zaW9uXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9IHBhdGggZm9yIHVybFxyXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgRXh0ZW5zaW9uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZXh0cmFjdEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHBhdGgpIHtcclxuICAgIGlmKCFwYXRoIHx8IHBhdGguc3Vic3RyKDAsNCk9PSdydG1wJykge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpIHtcclxuICAgICAgICBsZXQgZXh0ZW5zaW9uID0gXCJcIjtcclxuICAgICAgICBpZiAoKC9bKCxdZm9ybWF0PW1wZC0vaSkudGVzdChwYXRoKSkge1xyXG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbXBkJztcclxuICAgICAgICB9ZWxzZSBpZiAoKC9bKCxdZm9ybWF0PW0zdTgtL2kpLnRlc3QocGF0aCkpIHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ20zdTgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBhenVyZWRGb3JtYXQgPSBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCk7XHJcbiAgICBpZihhenVyZWRGb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gYXp1cmVkRm9ybWF0O1xyXG4gICAgfVxyXG4gICAgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xyXG4gICAgaWYocGF0aC5sYXN0SW5kZXhPZignLicpID4gLTEpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLicpICsgMSwgcGF0aC5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogbmF0dXJhbEhtc1xyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyIHwgc3RyaW5nfSAgc2Vjb25kICBUaGUgc2Vjb25kXHJcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBmb3JtYXR0ZWQgU3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbEhtcyhzZWNvbmQpIHtcclxuICAgIGxldCBzZWNOdW0gPSBwYXJzZUludChzZWNvbmQsIDEwKTtcclxuICAgIGlmKCFzZWNvbmQpe1xyXG4gICAgICAgIHJldHVybiBcIi0tOi0tXCI7XHJcbiAgICB9XHJcbiAgICBsZXQgaG91cnMgICA9IE1hdGguZmxvb3Ioc2VjTnVtIC8gMzYwMCk7XHJcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY051bSAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcclxuICAgIGxldCBzZWNvbmRzID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcclxuXHJcbiAgICBpZiAoaG91cnMgPiAwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxyXG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cclxuXHJcbiAgICBpZiAoaG91cnMgPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbWludXRlcysnOicrc2Vjb25kcztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBobXNUb1NlY29uZChzdHIsIGZyYW1lUmF0ZSkge1xyXG4gICAgaWYoIXN0cikge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgaWYoXy5pc051bWJlcihzdHIpICYmICFfLmlzTmFOKHN0cikpe1xyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgnLCcsICcuJyk7XHJcbiAgICBsZXQgYXJyID0gc3RyLnNwbGl0KCc6Jyk7XHJcbiAgICBsZXQgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aDtcclxuICAgIGxldCBzZWMgPSAwO1xyXG4gICAgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdzJyl7XHJcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpO1xyXG4gICAgfWVsc2UgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdtJyl7XHJcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpICogNjA7XHJcbiAgICB9ZWxzZSBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ2gnKXtcclxuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cikgKiAzNjAwO1xyXG4gICAgfWVsc2UgaWYgKGFyckxlbmd0aCA+IDEpIHtcclxuICAgICAgICB2YXIgc2VjSW5kZXggPSBhcnJMZW5ndGggLSAxO1xyXG4gICAgICAgIGlmIChhcnJMZW5ndGggPT09IDQpIHtcclxuICAgICAgICAgICAgaWYgKGZyYW1lUmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VjID0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXhdKSAvIGZyYW1lUmF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWNJbmRleCAtPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXhdKTtcclxuICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXggLSAxXSkgKiA2MDtcclxuICAgICAgICBpZiAoYXJyTGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4IC0gMl0pICogMzYwMDtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKTtcclxuICAgIH1cclxuICAgIGlmIChfLmlzTmFOKHNlYykpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWM7XHJcbn0iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjkuMVxyXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcclxuLy8gICAgIChjKSAyMDA5LTIwMTggSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcclxuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiFmdW5jdGlvbigpe3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmJiZzZWxmfHxcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsJiZnbG9iYWx8fHRoaXN8fHt9LHI9bi5fLGU9QXJyYXkucHJvdG90eXBlLG89T2JqZWN0LnByb3RvdHlwZSxzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2w/U3ltYm9sLnByb3RvdHlwZTpudWxsLHU9ZS5wdXNoLGM9ZS5zbGljZSxwPW8udG9TdHJpbmcsaT1vLmhhc093blByb3BlcnR5LHQ9QXJyYXkuaXNBcnJheSxhPU9iamVjdC5rZXlzLGw9T2JqZWN0LmNyZWF0ZSxmPWZ1bmN0aW9uKCl7fSxoPWZ1bmN0aW9uKG4pe3JldHVybiBuIGluc3RhbmNlb2YgaD9uOnRoaXMgaW5zdGFuY2VvZiBoP3ZvaWQodGhpcy5fd3JhcHBlZD1uKTpuZXcgaChuKX07XCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHN8fGV4cG9ydHMubm9kZVR5cGU/bi5fPWg6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGUmJm1vZHVsZS5leHBvcnRzJiYoZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1oKSxleHBvcnRzLl89aCksaC5WRVJTSU9OPVwiMS45LjFcIjt2YXIgdix5PWZ1bmN0aW9uKHUsaSxuKXtpZih2b2lkIDA9PT1pKXJldHVybiB1O3N3aXRjaChudWxsPT1uPzM6bil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdS5jYWxsKGksbil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLHQpe3JldHVybiB1LmNhbGwoaSxuLHIsdCl9O2Nhc2UgNDpyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHUuY2FsbChpLG4scix0LGUpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdS5hcHBseShpLGFyZ3VtZW50cyl9fSxkPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5pdGVyYXRlZSE9PXY/aC5pdGVyYXRlZShuLHIpOm51bGw9PW4/aC5pZGVudGl0eTpoLmlzRnVuY3Rpb24obik/eShuLHIsdCk6aC5pc09iamVjdChuKSYmIWguaXNBcnJheShuKT9oLm1hdGNoZXIobik6aC5wcm9wZXJ0eShuKX07aC5pdGVyYXRlZT12PWZ1bmN0aW9uKG4scil7cmV0dXJuIGQobixyLDEvMCl9O3ZhciBnPWZ1bmN0aW9uKHUsaSl7cmV0dXJuIGk9bnVsbD09aT91Lmxlbmd0aC0xOitpLGZ1bmN0aW9uKCl7Zm9yKHZhciBuPU1hdGgubWF4KGFyZ3VtZW50cy5sZW5ndGgtaSwwKSxyPUFycmF5KG4pLHQ9MDt0PG47dCsrKXJbdF09YXJndW1lbnRzW3QraV07c3dpdGNoKGkpe2Nhc2UgMDpyZXR1cm4gdS5jYWxsKHRoaXMscik7Y2FzZSAxOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0scik7Y2FzZSAyOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdLHIpfXZhciBlPUFycmF5KGkrMSk7Zm9yKHQ9MDt0PGk7dCsrKWVbdF09YXJndW1lbnRzW3RdO3JldHVybiBlW2ldPXIsdS5hcHBseSh0aGlzLGUpfX0sbT1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm57fTtpZihsKXJldHVybiBsKG4pO2YucHJvdG90eXBlPW47dmFyIHI9bmV3IGY7cmV0dXJuIGYucHJvdG90eXBlPW51bGwscn0sYj1mdW5jdGlvbihyKXtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/dm9pZCAwOm5bcl19fSxqPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGwhPW4mJmkuY2FsbChuLHIpfSx4PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXtpZihudWxsPT1uKXJldHVybjtuPW5bcltlXV19cmV0dXJuIHQ/bjp2b2lkIDB9LF89TWF0aC5wb3coMiw1MyktMSxBPWIoXCJsZW5ndGhcIiksdz1mdW5jdGlvbihuKXt2YXIgcj1BKG4pO3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiByJiYwPD1yJiZyPD1ffTtoLmVhY2g9aC5mb3JFYWNoPWZ1bmN0aW9uKG4scix0KXt2YXIgZSx1O2lmKHI9eShyLHQpLHcobikpZm9yKGU9MCx1PW4ubGVuZ3RoO2U8dTtlKyspcihuW2VdLGUsbik7ZWxzZXt2YXIgaT1oLmtleXMobik7Zm9yKGU9MCx1PWkubGVuZ3RoO2U8dTtlKyspcihuW2lbZV1dLGlbZV0sbil9cmV0dXJuIG59LGgubWFwPWguY29sbGVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9QXJyYXkodSksbz0wO288dTtvKyspe3ZhciBhPWU/ZVtvXTpvO2lbb109cihuW2FdLGEsbil9cmV0dXJuIGl9O3ZhciBPPWZ1bmN0aW9uKGMpe3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0zPD1hcmd1bWVudHMubGVuZ3RoO3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0hdyhuKSYmaC5rZXlzKG4pLGk9KHV8fG4pLmxlbmd0aCxvPTA8Yz8wOmktMTtmb3IoZXx8KHQ9blt1P3Vbb106b10sbys9Yyk7MDw9byYmbzxpO28rPWMpe3ZhciBhPXU/dVtvXTpvO3Q9cih0LG5bYV0sYSxuKX1yZXR1cm4gdH0obix5KHIsZSw0KSx0LHUpfX07aC5yZWR1Y2U9aC5mb2xkbD1oLmluamVjdD1PKDEpLGgucmVkdWNlUmlnaHQ9aC5mb2xkcj1PKC0xKSxoLmZpbmQ9aC5kZXRlY3Q9ZnVuY3Rpb24obixyLHQpe3ZhciBlPSh3KG4pP2guZmluZEluZGV4OmguZmluZEtleSkobixyLHQpO2lmKHZvaWQgMCE9PWUmJi0xIT09ZSlyZXR1cm4gbltlXX0saC5maWx0ZXI9aC5zZWxlY3Q9ZnVuY3Rpb24obixlLHIpe3ZhciB1PVtdO3JldHVybiBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7ZShuLHIsdCkmJnUucHVzaChuKX0pLHV9LGgucmVqZWN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5maWx0ZXIobixoLm5lZ2F0ZShkKHIpKSx0KX0saC5ldmVyeT1oLmFsbD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZighcihuW29dLG8sbikpcmV0dXJuITF9cmV0dXJuITB9LGguc29tZT1oLmFueT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZihyKG5bb10sbyxuKSlyZXR1cm4hMH1yZXR1cm4hMX0saC5jb250YWlucz1oLmluY2x1ZGVzPWguaW5jbHVkZT1mdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLChcIm51bWJlclwiIT10eXBlb2YgdHx8ZSkmJih0PTApLDA8PWguaW5kZXhPZihuLHIsdCl9LGguaW52b2tlPWcoZnVuY3Rpb24obix0LGUpe3ZhciB1LGk7cmV0dXJuIGguaXNGdW5jdGlvbih0KT9pPXQ6aC5pc0FycmF5KHQpJiYodT10LnNsaWNlKDAsLTEpLHQ9dFt0Lmxlbmd0aC0xXSksaC5tYXAobixmdW5jdGlvbihuKXt2YXIgcj1pO2lmKCFyKXtpZih1JiZ1Lmxlbmd0aCYmKG49eChuLHUpKSxudWxsPT1uKXJldHVybjtyPW5bdF19cmV0dXJuIG51bGw9PXI/cjpyLmFwcGx5KG4sZSl9KX0pLGgucGx1Y2s9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5tYXAobixoLnByb3BlcnR5KHIpKX0saC53aGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbHRlcihuLGgubWF0Y2hlcihyKSl9LGguZmluZFdoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmluZChuLGgubWF0Y2hlcihyKSl9LGgubWF4PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9LTEvMCxvPS0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmaTx0JiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXt1PWUobixyLHQpLChvPHV8fHU9PT0tMS8wJiZpPT09LTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLm1pbj1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPTEvMCxvPTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZ0PGkmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpeygodT1lKG4scix0KSk8b3x8dT09PTEvMCYmaT09PTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLnNodWZmbGU9ZnVuY3Rpb24obil7cmV0dXJuIGguc2FtcGxlKG4sMS8wKX0saC5zYW1wbGU9ZnVuY3Rpb24obixyLHQpe2lmKG51bGw9PXJ8fHQpcmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSxuW2gucmFuZG9tKG4ubGVuZ3RoLTEpXTt2YXIgZT13KG4pP2guY2xvbmUobik6aC52YWx1ZXMobiksdT1BKGUpO3I9TWF0aC5tYXgoTWF0aC5taW4ocix1KSwwKTtmb3IodmFyIGk9dS0xLG89MDtvPHI7bysrKXt2YXIgYT1oLnJhbmRvbShvLGkpLGM9ZVtvXTtlW29dPWVbYV0sZVthXT1jfXJldHVybiBlLnNsaWNlKDAscil9LGguc29ydEJ5PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT0wO3JldHVybiBlPWQoZSxyKSxoLnBsdWNrKGgubWFwKG4sZnVuY3Rpb24obixyLHQpe3JldHVybnt2YWx1ZTpuLGluZGV4OnUrKyxjcml0ZXJpYTplKG4scix0KX19KS5zb3J0KGZ1bmN0aW9uKG4scil7dmFyIHQ9bi5jcml0ZXJpYSxlPXIuY3JpdGVyaWE7aWYodCE9PWUpe2lmKGU8dHx8dm9pZCAwPT09dClyZXR1cm4gMTtpZih0PGV8fHZvaWQgMD09PWUpcmV0dXJuLTF9cmV0dXJuIG4uaW5kZXgtci5pbmRleH0pLFwidmFsdWVcIil9O3ZhciBrPWZ1bmN0aW9uKG8scil7cmV0dXJuIGZ1bmN0aW9uKGUsdSxuKXt2YXIgaT1yP1tbXSxbXV06e307cmV0dXJuIHU9ZCh1LG4pLGguZWFjaChlLGZ1bmN0aW9uKG4scil7dmFyIHQ9dShuLHIsZSk7byhpLG4sdCl9KSxpfX07aC5ncm91cEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdLnB1c2gocik6blt0XT1bcl19KSxoLmluZGV4Qnk9ayhmdW5jdGlvbihuLHIsdCl7blt0XT1yfSksaC5jb3VudEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdKys6blt0XT0xfSk7dmFyIFM9L1teXFx1ZDgwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkYmZmXVtcXHVkYzAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRmZmZdL2c7aC50b0FycmF5PWZ1bmN0aW9uKG4pe3JldHVybiBuP2guaXNBcnJheShuKT9jLmNhbGwobik6aC5pc1N0cmluZyhuKT9uLm1hdGNoKFMpOncobik/aC5tYXAobixoLmlkZW50aXR5KTpoLnZhbHVlcyhuKTpbXX0saC5zaXplPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPzA6dyhuKT9uLmxlbmd0aDpoLmtleXMobikubGVuZ3RofSxoLnBhcnRpdGlvbj1rKGZ1bmN0aW9uKG4scix0KXtuW3Q/MDoxXS5wdXNoKHIpfSwhMCksaC5maXJzdD1oLmhlYWQ9aC50YWtlPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bMF06aC5pbml0aWFsKG4sbi5sZW5ndGgtcil9LGguaW5pdGlhbD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLDAsTWF0aC5tYXgoMCxuLmxlbmd0aC0obnVsbD09cnx8dD8xOnIpKSl9LGgubGFzdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uW24ubGVuZ3RoLTFdOmgucmVzdChuLE1hdGgubWF4KDAsbi5sZW5ndGgtcikpfSxoLnJlc3Q9aC50YWlsPWguZHJvcD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLG51bGw9PXJ8fHQ/MTpyKX0saC5jb21wYWN0PWZ1bmN0aW9uKG4pe3JldHVybiBoLmZpbHRlcihuLEJvb2xlYW4pfTt2YXIgTT1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KGU9ZXx8W10pLmxlbmd0aCxpPTAsbz1BKG4pO2k8bztpKyspe3ZhciBhPW5baV07aWYodyhhKSYmKGguaXNBcnJheShhKXx8aC5pc0FyZ3VtZW50cyhhKSkpaWYocilmb3IodmFyIGM9MCxsPWEubGVuZ3RoO2M8bDspZVt1KytdPWFbYysrXTtlbHNlIE0oYSxyLHQsZSksdT1lLmxlbmd0aDtlbHNlIHR8fChlW3UrK109YSl9cmV0dXJuIGV9O2guZmxhdHRlbj1mdW5jdGlvbihuLHIpe3JldHVybiBNKG4sciwhMSl9LGgud2l0aG91dD1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIGguZGlmZmVyZW5jZShuLHIpfSksaC51bmlxPWgudW5pcXVlPWZ1bmN0aW9uKG4scix0LGUpe2guaXNCb29sZWFuKHIpfHwoZT10LHQ9cixyPSExKSxudWxsIT10JiYodD1kKHQsZSkpO2Zvcih2YXIgdT1bXSxpPVtdLG89MCxhPUEobik7bzxhO28rKyl7dmFyIGM9bltvXSxsPXQ/dChjLG8sbik6YztyJiYhdD8obyYmaT09PWx8fHUucHVzaChjKSxpPWwpOnQ/aC5jb250YWlucyhpLGwpfHwoaS5wdXNoKGwpLHUucHVzaChjKSk6aC5jb250YWlucyh1LGMpfHx1LnB1c2goYyl9cmV0dXJuIHV9LGgudW5pb249ZyhmdW5jdGlvbihuKXtyZXR1cm4gaC51bmlxKE0obiwhMCwhMCkpfSksaC5pbnRlcnNlY3Rpb249ZnVuY3Rpb24obil7Zm9yKHZhciByPVtdLHQ9YXJndW1lbnRzLmxlbmd0aCxlPTAsdT1BKG4pO2U8dTtlKyspe3ZhciBpPW5bZV07aWYoIWguY29udGFpbnMocixpKSl7dmFyIG87Zm9yKG89MTtvPHQmJmguY29udGFpbnMoYXJndW1lbnRzW29dLGkpO28rKyk7bz09PXQmJnIucHVzaChpKX19cmV0dXJuIHJ9LGguZGlmZmVyZW5jZT1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIHI9TShyLCEwLCEwKSxoLmZpbHRlcihuLGZ1bmN0aW9uKG4pe3JldHVybiFoLmNvbnRhaW5zKHIsbil9KX0pLGgudW56aXA9ZnVuY3Rpb24obil7Zm9yKHZhciByPW4mJmgubWF4KG4sQSkubGVuZ3RofHwwLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1oLnBsdWNrKG4sZSk7cmV0dXJuIHR9LGguemlwPWcoaC51bnppcCksaC5vYmplY3Q9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9e30sZT0wLHU9QShuKTtlPHU7ZSsrKXI/dFtuW2VdXT1yW2VdOnRbbltlXVswXV09bltlXVsxXTtyZXR1cm4gdH07dmFyIEY9ZnVuY3Rpb24oaSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9QShuKSx1PTA8aT8wOmUtMTswPD11JiZ1PGU7dSs9aSlpZihyKG5bdV0sdSxuKSlyZXR1cm4gdTtyZXR1cm4tMX19O2guZmluZEluZGV4PUYoMSksaC5maW5kTGFzdEluZGV4PUYoLTEpLGguc29ydGVkSW5kZXg9ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PSh0PWQodCxlLDEpKShyKSxpPTAsbz1BKG4pO2k8bzspe3ZhciBhPU1hdGguZmxvb3IoKGkrbykvMik7dChuW2FdKTx1P2k9YSsxOm89YX1yZXR1cm4gaX07dmFyIEU9ZnVuY3Rpb24oaSxvLGEpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7dmFyIGU9MCx1PUEobik7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpMDxpP2U9MDw9dD90Ok1hdGgubWF4KHQrdSxlKTp1PTA8PXQ/TWF0aC5taW4odCsxLHUpOnQrdSsxO2Vsc2UgaWYoYSYmdCYmdSlyZXR1cm4gblt0PWEobixyKV09PT1yP3Q6LTE7aWYociE9cilyZXR1cm4gMDw9KHQ9byhjLmNhbGwobixlLHUpLGguaXNOYU4pKT90K2U6LTE7Zm9yKHQ9MDxpP2U6dS0xOzA8PXQmJnQ8dTt0Kz1pKWlmKG5bdF09PT1yKXJldHVybiB0O3JldHVybi0xfX07aC5pbmRleE9mPUUoMSxoLmZpbmRJbmRleCxoLnNvcnRlZEluZGV4KSxoLmxhc3RJbmRleE9mPUUoLTEsaC5maW5kTGFzdEluZGV4KSxoLnJhbmdlPWZ1bmN0aW9uKG4scix0KXtudWxsPT1yJiYocj1ufHwwLG49MCksdHx8KHQ9cjxuPy0xOjEpO2Zvcih2YXIgZT1NYXRoLm1heChNYXRoLmNlaWwoKHItbikvdCksMCksdT1BcnJheShlKSxpPTA7aTxlO2krKyxuKz10KXVbaV09bjtyZXR1cm4gdX0saC5jaHVuaz1mdW5jdGlvbihuLHIpe2lmKG51bGw9PXJ8fHI8MSlyZXR1cm5bXTtmb3IodmFyIHQ9W10sZT0wLHU9bi5sZW5ndGg7ZTx1Oyl0LnB1c2goYy5jYWxsKG4sZSxlKz1yKSk7cmV0dXJuIHR9O3ZhciBOPWZ1bmN0aW9uKG4scix0LGUsdSl7aWYoIShlIGluc3RhbmNlb2YgcikpcmV0dXJuIG4uYXBwbHkodCx1KTt2YXIgaT1tKG4ucHJvdG90eXBlKSxvPW4uYXBwbHkoaSx1KTtyZXR1cm4gaC5pc09iamVjdChvKT9vOml9O2guYmluZD1nKGZ1bmN0aW9uKHIsdCxlKXtpZighaC5pc0Z1bmN0aW9uKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb25cIik7dmFyIHU9ZyhmdW5jdGlvbihuKXtyZXR1cm4gTihyLHUsdCx0aGlzLGUuY29uY2F0KG4pKX0pO3JldHVybiB1fSksaC5wYXJ0aWFsPWcoZnVuY3Rpb24odSxpKXt2YXIgbz1oLnBhcnRpYWwucGxhY2Vob2xkZXIsYT1mdW5jdGlvbigpe2Zvcih2YXIgbj0wLHI9aS5sZW5ndGgsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWlbZV09PT1vP2FyZ3VtZW50c1tuKytdOmlbZV07Zm9yKDtuPGFyZ3VtZW50cy5sZW5ndGg7KXQucHVzaChhcmd1bWVudHNbbisrXSk7cmV0dXJuIE4odSxhLHRoaXMsdGhpcyx0KX07cmV0dXJuIGF9KSwoaC5wYXJ0aWFsLnBsYWNlaG9sZGVyPWgpLmJpbmRBbGw9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PShyPU0ociwhMSwhMSkpLmxlbmd0aDtpZih0PDEpdGhyb3cgbmV3IEVycm9yKFwiYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lc1wiKTtmb3IoO3QtLTspe3ZhciBlPXJbdF07bltlXT1oLmJpbmQobltlXSxuKX19KSxoLm1lbW9pemU9ZnVuY3Rpb24oZSx1KXt2YXIgaT1mdW5jdGlvbihuKXt2YXIgcj1pLmNhY2hlLHQ9XCJcIisodT91LmFwcGx5KHRoaXMsYXJndW1lbnRzKTpuKTtyZXR1cm4gaihyLHQpfHwoclt0XT1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksclt0XX07cmV0dXJuIGkuY2FjaGU9e30saX0saC5kZWxheT1nKGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBuLmFwcGx5KG51bGwsdCl9LHIpfSksaC5kZWZlcj1oLnBhcnRpYWwoaC5kZWxheSxoLDEpLGgudGhyb3R0bGU9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYSxjLGw9MDt1fHwodT17fSk7dmFyIGY9ZnVuY3Rpb24oKXtsPSExPT09dS5sZWFkaW5nPzA6aC5ub3coKSxpPW51bGwsYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKX0sbj1mdW5jdGlvbigpe3ZhciBuPWgubm93KCk7bHx8ITEhPT11LmxlYWRpbmd8fChsPW4pO3ZhciByPWUtKG4tbCk7cmV0dXJuIG89dGhpcyxhPWFyZ3VtZW50cyxyPD0wfHxlPHI/KGkmJihjbGVhclRpbWVvdXQoaSksaT1udWxsKSxsPW4sYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKSk6aXx8ITE9PT11LnRyYWlsaW5nfHwoaT1zZXRUaW1lb3V0KGYscikpLGN9O3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxsPTAsaT1vPWE9bnVsbH0sbn0saC5kZWJvdW5jZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhPWZ1bmN0aW9uKG4scil7aT1udWxsLHImJihvPXQuYXBwbHkobixyKSl9LG49ZyhmdW5jdGlvbihuKXtpZihpJiZjbGVhclRpbWVvdXQoaSksdSl7dmFyIHI9IWk7aT1zZXRUaW1lb3V0KGEsZSksciYmKG89dC5hcHBseSh0aGlzLG4pKX1lbHNlIGk9aC5kZWxheShhLGUsdGhpcyxuKTtyZXR1cm4gb30pO3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxpPW51bGx9LG59LGgud3JhcD1mdW5jdGlvbihuLHIpe3JldHVybiBoLnBhcnRpYWwocixuKX0saC5uZWdhdGU9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5jb21wb3NlPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLGU9dC5sZW5ndGgtMTtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIG49ZSxyPXRbZV0uYXBwbHkodGhpcyxhcmd1bWVudHMpO24tLTspcj10W25dLmNhbGwodGhpcyxyKTtyZXR1cm4gcn19LGguYWZ0ZXI9ZnVuY3Rpb24obixyKXtyZXR1cm4gZnVuY3Rpb24oKXtpZigtLW48MSlyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmJlZm9yZT1mdW5jdGlvbihuLHIpe3ZhciB0O3JldHVybiBmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHQ9ci5hcHBseSh0aGlzLGFyZ3VtZW50cykpLG48PTEmJihyPW51bGwpLHR9fSxoLm9uY2U9aC5wYXJ0aWFsKGguYmVmb3JlLDIpLGgucmVzdEFyZ3VtZW50cz1nO3ZhciBJPSF7dG9TdHJpbmc6bnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoXCJ0b1N0cmluZ1wiKSxUPVtcInZhbHVlT2ZcIixcImlzUHJvdG90eXBlT2ZcIixcInRvU3RyaW5nXCIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFwiaGFzT3duUHJvcGVydHlcIixcInRvTG9jYWxlU3RyaW5nXCJdLEI9ZnVuY3Rpb24obixyKXt2YXIgdD1ULmxlbmd0aCxlPW4uY29uc3RydWN0b3IsdT1oLmlzRnVuY3Rpb24oZSkmJmUucHJvdG90eXBlfHxvLGk9XCJjb25zdHJ1Y3RvclwiO2ZvcihqKG4saSkmJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKTt0LS07KShpPVRbdF0paW4gbiYmbltpXSE9PXVbaV0mJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKX07aC5rZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO2lmKGEpcmV0dXJuIGEobik7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paihuLHQpJiZyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLmFsbEtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107dmFyIHI9W107Zm9yKHZhciB0IGluIG4pci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC52YWx1ZXM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1uW3JbdV1dO3JldHVybiBlfSxoLm1hcE9iamVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPWgua2V5cyhuKSx1PWUubGVuZ3RoLGk9e30sbz0wO288dTtvKyspe3ZhciBhPWVbb107aVthXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX0saC5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPVtyW3VdLG5bclt1XV1dO3JldHVybiBlfSxoLmludmVydD1mdW5jdGlvbihuKXtmb3IodmFyIHI9e30sdD1oLmtleXMobiksZT0wLHU9dC5sZW5ndGg7ZTx1O2UrKylyW25bdFtlXV1dPXRbZV07cmV0dXJuIHJ9LGguZnVuY3Rpb25zPWgubWV0aG9kcz1mdW5jdGlvbihuKXt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbiloLmlzRnVuY3Rpb24oblt0XSkmJnIucHVzaCh0KTtyZXR1cm4gci5zb3J0KCl9O3ZhciBSPWZ1bmN0aW9uKGMsbCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg7aWYobCYmKG49T2JqZWN0KG4pKSxyPDJ8fG51bGw9PW4pcmV0dXJuIG47Zm9yKHZhciB0PTE7dDxyO3QrKylmb3IodmFyIGU9YXJndW1lbnRzW3RdLHU9YyhlKSxpPXUubGVuZ3RoLG89MDtvPGk7bysrKXt2YXIgYT11W29dO2wmJnZvaWQgMCE9PW5bYV18fChuW2FdPWVbYV0pfXJldHVybiBufX07aC5leHRlbmQ9UihoLmFsbEtleXMpLGguZXh0ZW5kT3duPWguYXNzaWduPVIoaC5rZXlzKSxoLmZpbmRLZXk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZSx1PWgua2V5cyhuKSxpPTAsbz11Lmxlbmd0aDtpPG87aSsrKWlmKHIobltlPXVbaV1dLGUsbikpcmV0dXJuIGV9O3ZhciBxLEssej1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIHIgaW4gdH07aC5waWNrPWcoZnVuY3Rpb24obixyKXt2YXIgdD17fSxlPXJbMF07aWYobnVsbD09bilyZXR1cm4gdDtoLmlzRnVuY3Rpb24oZSk/KDE8ci5sZW5ndGgmJihlPXkoZSxyWzFdKSkscj1oLmFsbEtleXMobikpOihlPXoscj1NKHIsITEsITEpLG49T2JqZWN0KG4pKTtmb3IodmFyIHU9MCxpPXIubGVuZ3RoO3U8aTt1Kyspe3ZhciBvPXJbdV0sYT1uW29dO2UoYSxvLG4pJiYodFtvXT1hKX1yZXR1cm4gdH0pLGgub21pdD1nKGZ1bmN0aW9uKG4sdCl7dmFyIHIsZT10WzBdO3JldHVybiBoLmlzRnVuY3Rpb24oZSk/KGU9aC5uZWdhdGUoZSksMTx0Lmxlbmd0aCYmKHI9dFsxXSkpOih0PWgubWFwKE0odCwhMSwhMSksU3RyaW5nKSxlPWZ1bmN0aW9uKG4scil7cmV0dXJuIWguY29udGFpbnModCxyKX0pLGgucGljayhuLGUscil9KSxoLmRlZmF1bHRzPVIoaC5hbGxLZXlzLCEwKSxoLmNyZWF0ZT1mdW5jdGlvbihuLHIpe3ZhciB0PW0obik7cmV0dXJuIHImJmguZXh0ZW5kT3duKHQsciksdH0saC5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc09iamVjdChuKT9oLmlzQXJyYXkobik/bi5zbGljZSgpOmguZXh0ZW5kKHt9LG4pOm59LGgudGFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIHIobiksbn0saC5pc01hdGNoPWZ1bmN0aW9uKG4scil7dmFyIHQ9aC5rZXlzKHIpLGU9dC5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3IodmFyIHU9T2JqZWN0KG4pLGk9MDtpPGU7aSsrKXt2YXIgbz10W2ldO2lmKHJbb10hPT11W29dfHwhKG8gaW4gdSkpcmV0dXJuITF9cmV0dXJuITB9LHE9ZnVuY3Rpb24obixyLHQsZSl7aWYobj09PXIpcmV0dXJuIDAhPT1ufHwxL249PTEvcjtpZihudWxsPT1ufHxudWxsPT1yKXJldHVybiExO2lmKG4hPW4pcmV0dXJuIHIhPXI7dmFyIHU9dHlwZW9mIG47cmV0dXJuKFwiZnVuY3Rpb25cIj09PXV8fFwib2JqZWN0XCI9PT11fHxcIm9iamVjdFwiPT10eXBlb2YgcikmJksobixyLHQsZSl9LEs9ZnVuY3Rpb24obixyLHQsZSl7biBpbnN0YW5jZW9mIGgmJihuPW4uX3dyYXBwZWQpLHIgaW5zdGFuY2VvZiBoJiYocj1yLl93cmFwcGVkKTt2YXIgdT1wLmNhbGwobik7aWYodSE9PXAuY2FsbChyKSlyZXR1cm4hMTtzd2l0Y2godSl7Y2FzZVwiW29iamVjdCBSZWdFeHBdXCI6Y2FzZVwiW29iamVjdCBTdHJpbmddXCI6cmV0dXJuXCJcIituPT1cIlwiK3I7Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cmV0dXJuK24hPStuPytyIT0rcjowPT0rbj8xLytuPT0xL3I6K249PStyO2Nhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6cmV0dXJuK249PStyO2Nhc2VcIltvYmplY3QgU3ltYm9sXVwiOnJldHVybiBzLnZhbHVlT2YuY2FsbChuKT09PXMudmFsdWVPZi5jYWxsKHIpfXZhciBpPVwiW29iamVjdCBBcnJheV1cIj09PXU7aWYoIWkpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBufHxcIm9iamVjdFwiIT10eXBlb2YgcilyZXR1cm4hMTt2YXIgbz1uLmNvbnN0cnVjdG9yLGE9ci5jb25zdHJ1Y3RvcjtpZihvIT09YSYmIShoLmlzRnVuY3Rpb24obykmJm8gaW5zdGFuY2VvZiBvJiZoLmlzRnVuY3Rpb24oYSkmJmEgaW5zdGFuY2VvZiBhKSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gcilyZXR1cm4hMX1lPWV8fFtdO2Zvcih2YXIgYz0odD10fHxbXSkubGVuZ3RoO2MtLTspaWYodFtjXT09PW4pcmV0dXJuIGVbY109PT1yO2lmKHQucHVzaChuKSxlLnB1c2gociksaSl7aWYoKGM9bi5sZW5ndGgpIT09ci5sZW5ndGgpcmV0dXJuITE7Zm9yKDtjLS07KWlmKCFxKG5bY10scltjXSx0LGUpKXJldHVybiExfWVsc2V7dmFyIGwsZj1oLmtleXMobik7aWYoYz1mLmxlbmd0aCxoLmtleXMocikubGVuZ3RoIT09YylyZXR1cm4hMTtmb3IoO2MtLTspaWYobD1mW2NdLCFqKHIsbCl8fCFxKG5bbF0scltsXSx0LGUpKXJldHVybiExfXJldHVybiB0LnBvcCgpLGUucG9wKCksITB9LGguaXNFcXVhbD1mdW5jdGlvbihuLHIpe3JldHVybiBxKG4scil9LGguaXNFbXB0eT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bnx8KHcobikmJihoLmlzQXJyYXkobil8fGguaXNTdHJpbmcobil8fGguaXNBcmd1bWVudHMobikpPzA9PT1uLmxlbmd0aDowPT09aC5rZXlzKG4pLmxlbmd0aCl9LGguaXNFbGVtZW50PWZ1bmN0aW9uKG4pe3JldHVybiEoIW58fDEhPT1uLm5vZGVUeXBlKX0saC5pc0FycmF5PXR8fGZ1bmN0aW9uKG4pe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXAuY2FsbChuKX0saC5pc09iamVjdD1mdW5jdGlvbihuKXt2YXIgcj10eXBlb2YgbjtyZXR1cm5cImZ1bmN0aW9uXCI9PT1yfHxcIm9iamVjdFwiPT09ciYmISFufSxoLmVhY2goW1wiQXJndW1lbnRzXCIsXCJGdW5jdGlvblwiLFwiU3RyaW5nXCIsXCJOdW1iZXJcIixcIkRhdGVcIixcIlJlZ0V4cFwiLFwiRXJyb3JcIixcIlN5bWJvbFwiLFwiTWFwXCIsXCJXZWFrTWFwXCIsXCJTZXRcIixcIldlYWtTZXRcIl0sZnVuY3Rpb24ocil7aFtcImlzXCIrcl09ZnVuY3Rpb24obil7cmV0dXJuIHAuY2FsbChuKT09PVwiW29iamVjdCBcIityK1wiXVwifX0pLGguaXNBcmd1bWVudHMoYXJndW1lbnRzKXx8KGguaXNBcmd1bWVudHM9ZnVuY3Rpb24obil7cmV0dXJuIGoobixcImNhbGxlZVwiKX0pO3ZhciBEPW4uZG9jdW1lbnQmJm4uZG9jdW1lbnQuY2hpbGROb2RlcztcImZ1bmN0aW9uXCIhPXR5cGVvZi8uLyYmXCJvYmplY3RcIiE9dHlwZW9mIEludDhBcnJheSYmXCJmdW5jdGlvblwiIT10eXBlb2YgRCYmKGguaXNGdW5jdGlvbj1mdW5jdGlvbihuKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBufHwhMX0pLGguaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIWguaXNTeW1ib2wobikmJmlzRmluaXRlKG4pJiYhaXNOYU4ocGFyc2VGbG9hdChuKSl9LGguaXNOYU49ZnVuY3Rpb24obil7cmV0dXJuIGguaXNOdW1iZXIobikmJmlzTmFOKG4pfSxoLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4hMD09PW58fCExPT09bnx8XCJbb2JqZWN0IEJvb2xlYW5dXCI9PT1wLmNhbGwobil9LGguaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0saC5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gdm9pZCAwPT09bn0saC5oYXM9ZnVuY3Rpb24obixyKXtpZighaC5pc0FycmF5KHIpKXJldHVybiBqKG4scik7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXt2YXIgdT1yW2VdO2lmKG51bGw9PW58fCFpLmNhbGwobix1KSlyZXR1cm4hMTtuPW5bdV19cmV0dXJuISF0fSxoLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbi5fPXIsdGhpc30saC5pZGVudGl0eT1mdW5jdGlvbihuKXtyZXR1cm4gbn0saC5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LGgubm9vcD1mdW5jdGlvbigpe30saC5wcm9wZXJ0eT1mdW5jdGlvbihyKXtyZXR1cm4gaC5pc0FycmF5KHIpP2Z1bmN0aW9uKG4pe3JldHVybiB4KG4scil9OmIocil9LGgucHJvcGVydHlPZj1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbD09cj9mdW5jdGlvbigpe306ZnVuY3Rpb24obil7cmV0dXJuIGguaXNBcnJheShuKT94KHIsbik6cltuXX19LGgubWF0Y2hlcj1oLm1hdGNoZXM9ZnVuY3Rpb24ocil7cmV0dXJuIHI9aC5leHRlbmRPd24oe30sciksZnVuY3Rpb24obil7cmV0dXJuIGguaXNNYXRjaChuLHIpfX0saC50aW1lcz1mdW5jdGlvbihuLHIsdCl7dmFyIGU9QXJyYXkoTWF0aC5tYXgoMCxuKSk7cj15KHIsdCwxKTtmb3IodmFyIHU9MDt1PG47dSsrKWVbdV09cih1KTtyZXR1cm4gZX0saC5yYW5kb209ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbD09ciYmKHI9bixuPTApLG4rTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihyLW4rMSkpfSxoLm5vdz1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX07dmFyIEw9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImI3gyNztcIixcImBcIjpcIiYjeDYwO1wifSxQPWguaW52ZXJ0KEwpLFc9ZnVuY3Rpb24ocil7dmFyIHQ9ZnVuY3Rpb24obil7cmV0dXJuIHJbbl19LG49XCIoPzpcIitoLmtleXMocikuam9pbihcInxcIikrXCIpXCIsZT1SZWdFeHAobiksdT1SZWdFeHAobixcImdcIik7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBuPW51bGw9PW4/XCJcIjpcIlwiK24sZS50ZXN0KG4pP24ucmVwbGFjZSh1LHQpOm59fTtoLmVzY2FwZT1XKEwpLGgudW5lc2NhcGU9VyhQKSxoLnJlc3VsdD1mdW5jdGlvbihuLHIsdCl7aC5pc0FycmF5KHIpfHwocj1bcl0pO3ZhciBlPXIubGVuZ3RoO2lmKCFlKXJldHVybiBoLmlzRnVuY3Rpb24odCk/dC5jYWxsKG4pOnQ7Zm9yKHZhciB1PTA7dTxlO3UrKyl7dmFyIGk9bnVsbD09bj92b2lkIDA6bltyW3VdXTt2b2lkIDA9PT1pJiYoaT10LHU9ZSksbj1oLmlzRnVuY3Rpb24oaSk/aS5jYWxsKG4pOml9cmV0dXJuIG59O3ZhciBDPTA7aC51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgcj0rK0MrXCJcIjtyZXR1cm4gbj9uK3I6cn0saC50ZW1wbGF0ZVNldHRpbmdzPXtldmFsdWF0ZTovPCUoW1xcc1xcU10rPyklPi9nLGludGVycG9sYXRlOi88JT0oW1xcc1xcU10rPyklPi9nLGVzY2FwZTovPCUtKFtcXHNcXFNdKz8pJT4vZ307dmFyIEo9LyguKV4vLFU9e1wiJ1wiOlwiJ1wiLFwiXFxcXFwiOlwiXFxcXFwiLFwiXFxyXCI6XCJyXCIsXCJcXG5cIjpcIm5cIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSxWPS9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZywkPWZ1bmN0aW9uKG4pe3JldHVyblwiXFxcXFwiK1Vbbl19O2gudGVtcGxhdGU9ZnVuY3Rpb24oaSxuLHIpeyFuJiZyJiYobj1yKSxuPWguZGVmYXVsdHMoe30sbixoLnRlbXBsYXRlU2V0dGluZ3MpO3ZhciB0LGU9UmVnRXhwKFsobi5lc2NhcGV8fEopLnNvdXJjZSwobi5pbnRlcnBvbGF0ZXx8Sikuc291cmNlLChuLmV2YWx1YXRlfHxKKS5zb3VyY2VdLmpvaW4oXCJ8XCIpK1wifCRcIixcImdcIiksbz0wLGE9XCJfX3ArPSdcIjtpLnJlcGxhY2UoZSxmdW5jdGlvbihuLHIsdCxlLHUpe3JldHVybiBhKz1pLnNsaWNlKG8sdSkucmVwbGFjZShWLCQpLG89dStuLmxlbmd0aCxyP2ErPVwiJytcXG4oKF9fdD0oXCIrcitcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjp0P2ErPVwiJytcXG4oKF9fdD0oXCIrdCtcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiOmUmJihhKz1cIic7XFxuXCIrZStcIlxcbl9fcCs9J1wiKSxufSksYSs9XCInO1xcblwiLG4udmFyaWFibGV8fChhPVwid2l0aChvYmp8fHt9KXtcXG5cIithK1wifVxcblwiKSxhPVwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiK1wicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIithK1wicmV0dXJuIF9fcDtcXG5cIjt0cnl7dD1uZXcgRnVuY3Rpb24obi52YXJpYWJsZXx8XCJvYmpcIixcIl9cIixhKX1jYXRjaChuKXt0aHJvdyBuLnNvdXJjZT1hLG59dmFyIHU9ZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbCh0aGlzLG4saCl9LGM9bi52YXJpYWJsZXx8XCJvYmpcIjtyZXR1cm4gdS5zb3VyY2U9XCJmdW5jdGlvbihcIitjK1wiKXtcXG5cIithK1wifVwiLHV9LGguY2hhaW49ZnVuY3Rpb24obil7dmFyIHI9aChuKTtyZXR1cm4gci5fY2hhaW49ITAscn07dmFyIEc9ZnVuY3Rpb24obixyKXtyZXR1cm4gbi5fY2hhaW4/aChyKS5jaGFpbigpOnJ9O2gubWl4aW49ZnVuY3Rpb24odCl7cmV0dXJuIGguZWFjaChoLmZ1bmN0aW9ucyh0KSxmdW5jdGlvbihuKXt2YXIgcj1oW25dPXRbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1bdGhpcy5fd3JhcHBlZF07cmV0dXJuIHUuYXBwbHkobixhcmd1bWVudHMpLEcodGhpcyxyLmFwcGx5KGgsbikpfX0pLGh9LGgubWl4aW4oaCksaC5lYWNoKFtcInBvcFwiLFwicHVzaFwiLFwicmV2ZXJzZVwiLFwic2hpZnRcIixcInNvcnRcIixcInNwbGljZVwiLFwidW5zaGlmdFwiXSxmdW5jdGlvbihyKXt2YXIgdD1lW3JdO2gucHJvdG90eXBlW3JdPWZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fd3JhcHBlZDtyZXR1cm4gdC5hcHBseShuLGFyZ3VtZW50cyksXCJzaGlmdFwiIT09ciYmXCJzcGxpY2VcIiE9PXJ8fDAhPT1uLmxlbmd0aHx8ZGVsZXRlIG5bMF0sRyh0aGlzLG4pfX0pLGguZWFjaChbXCJjb25jYXRcIixcImpvaW5cIixcInNsaWNlXCJdLGZ1bmN0aW9uKG4pe3ZhciByPWVbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXtyZXR1cm4gRyh0aGlzLHIuYXBwbHkodGhpcy5fd3JhcHBlZCxhcmd1bWVudHMpKX19KSxoLnByb3RvdHlwZS52YWx1ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl93cmFwcGVkfSxoLnByb3RvdHlwZS52YWx1ZU9mPWgucHJvdG90eXBlLnRvSlNPTj1oLnByb3RvdHlwZS52YWx1ZSxoLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBTdHJpbmcodGhpcy5fd3JhcHBlZCl9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFwidW5kZXJzY29yZVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIGh9KX0oKTtcclxuIiwiaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9ufSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzUnRtcCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICByZXR1cm4gKGZpbGUuaW5kZXhPZigncnRtcDonKSA9PSAwIHx8IHR5cGUgPT0gJ3J0bXAnKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGlzV2ViUlRDID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIGlmKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCd3czonKSA9PT0gMCB8fCBmaWxlLmluZGV4T2YoJ3dzczonKSA9PT0gMCB8fCB0eXBlID09PSAnd2VicnRjJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc0Rhc2ggPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgcmV0dXJuICggdHlwZSA9PT0gJ21wZCcgfHwgIHR5cGUgPT09ICdkYXNoJyB8fCB0eXBlID09PSAnYXBwbGljYXRpb24vZGFzaCt4bWwnIHx8IGV4dHJhY3RFeHRlbnNpb24oZmlsZSkgPT0gJ21wZCcpO1xyXG59O1xyXG4iLCIvKipcbiAqIHV0aWxzIGZvciB3ZWJwYWNrXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldFNjcmlwdFBhdGggPSBmdW5jdGlvbihzY3JpcHROYW1lKSB7XG4gICAgY29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3JjID0gc2NyaXB0c1tpXS5zcmM7XG4gICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3JjLmxhc3RJbmRleE9mKCcvJyArIHNjcmlwdE5hbWUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cigwLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyOS4uXG4gKi9cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gX19WRVJTSU9OX187XG4iXSwic291cmNlUm9vdCI6IiJ9